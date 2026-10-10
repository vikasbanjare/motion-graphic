"""Brand scout: from a company's website (and channels) to a brand dossier for a video.

    python3 research/scout/scout.py --company "Sarvam AI" --site https://www.sarvam.ai \
        [--channel https://www.youtube.com/@SarvamAI] [--out brands/sarvam-ai] [--max-videos 12]

Runs where the internet is open: GitHub's runners (.github/workflows/brand-scout.yml) or your
own machine (npm run scout). It collects, without a person:
  1. the site: up to --max-pages pages, brand / press / blog / product pages first;
  2. brand assets: logo candidates (inline SVG, <img> logos, icons, og:image), colours and font
     families from the site's own CSS, brand-guideline page text;
  3. news: recent launch / blog posts with dates (what to make the film about);
  4. videos: embeds on the site plus the channels' uploads (yt-dlp), kept to 8-130 s, ranked
     toward product / launch films; the best are downloaded and scored for motion graphics
     (flat colour, type and UI) versus live action / talking heads;
  5. measurements: tools/film_qa.py metrics (motion, stills, loudness, SFX prominence), a colour
     palette and contact sheets of each kept video.
Writes OUT/dossier.json + OUT/dossier.md (facts and numbers: safe to publish) and OUT/private/
(logo files, contact sheets: other people's material, encrypted before it is published).
Fonts are recorded by name only: brand fonts are usually licensed, never downloaded.
"""

import argparse
import html
import json
import os
import re
import subprocess
import sys
import time
import urllib.parse
import urllib.request
from collections import Counter

import numpy as np

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36"
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(ROOT, "motion-kit", "tools"))


def log(*a):
    print(*a, file=sys.stderr, flush=True)


def fetch(url, binary=False, timeout=20):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
        with urllib.request.urlopen(req, timeout=timeout) as r:
            data = r.read(8_000_000)
            ctype = r.headers.get("Content-Type", "")
            return data if binary else data.decode("utf-8", "replace"), ctype, r.geturl()
    except Exception as e:
        log(f"  ✖ {url}: {type(e).__name__}")
        return None, "", url


PRIORITY = re.compile(r"brand|press|media|newsroom|about|blog|news|launch|product|changelog|announc|platform|solutions", re.I)
SOCIAL = {
    "youtube": re.compile(r"https?://(?:www\.)?youtube\.com/(?:@[\w.-]+|channel/[\w-]+|c/[\w.-]+|user/[\w.-]+)", re.I),
    "x": re.compile(r"https?://(?:www\.)?(?:x|twitter)\.com/(?!intent|share|home)[\w]{2,}", re.I),
    "linkedin": re.compile(r"https?://(?:www\.)?linkedin\.com/company/[\w.-]+", re.I),
    "vimeo": re.compile(r"https?://(?:www\.)?vimeo\.com/(?!\d)[\w.-]+", re.I),
    "instagram": re.compile(r"https?://(?:www\.)?instagram\.com/[\w.-]+", re.I),
}
VIDEO = re.compile(
    r"(https?://(?:www\.)?youtube(?:-nocookie)?\.com/(?:embed/|watch\?v=)[\w-]{11}|https?://youtu\.be/[\w-]{11}|"
    r"https?://player\.vimeo\.com/video/\d+(?:\?h=\w+)?|https?://vimeo\.com/\d+|"
    r"https?://[\w.-]+\.(?:cloudflarestream|videodelivery)\.(?:com|net)/[\w/.-]+|"
    r"https?://[^\s\"'<>]+?\.(?:mp4|webm|m3u8)(?:\?[^\s\"'<>]*)?)",
    re.I,
)
HEX = re.compile(r"#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b")
RGB = re.compile(r"rgba?\(\s*(\d{1,3})[,\s]+(\d{1,3})[,\s]+(\d{1,3})")
FONT_FAMILY = re.compile(r"font-family\s*:\s*([^;}{]+)", re.I)
FONT_FACE = re.compile(r"@font-face\s*{[^}]*font-family\s*:\s*['\"]?([^;'\"}]+)", re.I)
# Fonts that are not the brand's type: icon, math, video-player and fallback faces.
NOT_BRAND_FONT = re.compile(r"videojs|katex|icon|awesome|material symbols|glyph|emoji|fallback|swiper|slick", re.I)
# Colours of other companies' logos (social icons on the page), not the brand's palette.
SOCIAL_COLORS = {"#0a66c2", "#0077b5", "#ff0000", "#5865f2", "#e4405f", "#1da1f2", "#1877f2", "#25d366", "#ff4500", "#bd081c", "#000000", "#c13584", "#833ab4", "#fd1d1d", "#fcaf45", "#6441a5", "#1db954", "#ea4335", "#4285f4", "#34a853", "#fbbc05"}
GENERIC = {"sans-serif", "serif", "monospace", "system-ui", "inherit", "initial", "-apple-system", "blinkmacsystemfont", "segoe ui", "roboto", "helvetica", "arial", "ui-sans-serif", "ui-serif", "ui-monospace", "apple color emoji", "segoe ui emoji", "segoe ui symbol", "noto color emoji", "var", "cursive", "fantasy", "emoji", "math", "fangsong", "menlo", "monaco", "consolas", "courier new", "liberation mono", "sfmono-regular", "helvetica neue", "noto sans", "ubuntu", "cantarell", "fira sans", "droid sans", "oxygen"}


def norm_hex(h):
    h = h.lower()
    if len(h) == 4:
        h = "#" + "".join(c * 2 for c in h[1:])
    return h


def hsl_info(h):
    r, g, b = (int(h[i: i + 2], 16) / 255 for i in (1, 3, 5))
    mx, mn = max(r, g, b), min(r, g, b)
    light = (mx + mn) / 2
    sat = 0 if mx == mn else (mx - mn) / (1 - abs(2 * light - 1) + 1e-9)
    return sat, light


def text_of(page):
    page = re.sub(r"(?is)<(script|style|noscript|svg).*?</\1>", " ", page)
    page = re.sub(r"(?s)<[^>]+>", " ", page)
    return re.sub(r"\s+", " ", html.unescape(page)).strip()


# ---- 1-3: crawl the site ---------------------------------------------------------------------

def crawl(site, max_pages, delay):
    host = urllib.parse.urlparse(site).netloc
    seen, queue, pages = set(), [site], {}
    while queue and len(pages) < max_pages:
        queue.sort(key=lambda u: (not PRIORITY.search(u), len(u)))
        url = queue.pop(0)
        if url in seen:
            continue
        seen.add(url)
        body, ctype, final = fetch(url)
        if not body or "html" not in ctype:
            continue
        pages[final] = body
        for href in re.findall(r"""href\s*=\s*["']([^"'#]+)""", body):
            u = urllib.parse.urljoin(final, html.unescape(href)).split("#")[0]
            p = urllib.parse.urlparse(u)
            if p.netloc == host and p.scheme in ("http", "https") and not re.search(r"\.(png|jpe?g|gif|svg|webp|pdf|zip|mp4|css|js|ico|xml|json)$", p.path, re.I):
                if u not in seen and u not in queue:
                    queue.append(u)
        time.sleep(delay)
    log(f"  crawled {len(pages)} pages on {host}")
    return pages


def assets(pages, out):
    socials, videos, logos, css_urls, brand_text, news = {}, {}, [], set(), [], []
    inline_css = []
    for url, page in pages.items():
        for k, rx in SOCIAL.items():
            for m in rx.findall(page):
                socials.setdefault(k, Counter())[m.rstrip("/")] += 1
        for m in VIDEO.findall(page):
            videos.setdefault(html.unescape(m), url)
        for m in re.findall(r"""<(?:video|source)[^>]+src=["']([^"']+)""", page, re.I):
            if re.search(r"\.(mp4|webm|m3u8|mov)(\?|$)", m, re.I):
                videos.setdefault(urllib.parse.urljoin(url, html.unescape(m)), url)
        for m in re.findall(r"""<link[^>]+rel=["'][^"']*stylesheet[^"']*["'][^>]*>""", page, re.I):
            h = re.search(r"""href=["']([^"']+)""", m)
            if h:
                css_urls.add(urllib.parse.urljoin(url, html.unescape(h.group(1))))
        inline_css += re.findall(r"(?is)<style[^>]*>(.*?)</style>", page)
        inline_css += re.findall(r"""style=["']([^"']*(?:color|background|font-family)[^"']*)["']""", page, re.I)
        # logos: inline <svg> marked as a logo, <img> logos, icons, og:image
        for svg in re.findall(r"(?is)<svg[^>]*(?:logo|brand)[^>]*>.*?</svg>", page)[:3]:
            logos.append(("inline-svg", url, svg))
        for tag in re.findall(r"(?is)<img[^>]+>", page):
            if re.search(r"logo|brand|wordmark", tag, re.I):
                s = re.search(r"""src=["']([^"']+)""", tag)
                if s:
                    logos.append(("img", url, urllib.parse.urljoin(url, html.unescape(s.group(1)))))
        for tag in re.findall(r"""(?is)<link[^>]+rel=["'][^"']*(?:icon|apple-touch-icon|mask-icon)[^"']*["'][^>]*>""", page):
            s = re.search(r"""href=["']([^"']+)""", tag)
            if s:
                logos.append(("icon", url, urllib.parse.urljoin(url, html.unescape(s.group(1)))))
        og = re.search(r"""<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)""", page, re.I)
        if og:
            logos.append(("og-image", url, urllib.parse.urljoin(url, html.unescape(og.group(1)))))
        if re.search(r"brand|press-?kit|media-?kit|guideline", url, re.I):
            brand_text.append((url, text_of(page)[:6000]))
        # dated posts (blog / news / launch)
        date = re.search(r"""(?:article:published_time|datePublished)["']?\s*(?:content=|:)\s*["']([0-9]{4}-[0-9]{2}-[0-9]{2})""", page) or re.search(r"""<time[^>]+datetime=["']([0-9]{4}-[0-9]{2}-[0-9]{2})""", page)
        title = re.search(r"(?is)<title[^>]*>(.*?)</title>", page)
        if date and title and re.search(r"blog|news|launch|announc|post|release|changelog", url, re.I):
            desc = re.search(r"""<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)""", page, re.I)
            news.append({"date": date.group(1), "title": html.unescape(title.group(1).strip())[:160], "url": url, "summary": html.unescape(desc.group(1))[:300] if desc else ""})
    # CSS: colours and fonts from the site's own stylesheets
    css_text = "\n".join(inline_css)
    for cu in list(css_urls)[:14]:
        body, _, _ = fetch(cu)
        if body:
            css_text += "\n" + body
    colors = Counter(norm_hex(h) for h in HEX.findall(css_text))
    for r, g, b in RGB.findall(css_text):
        if max(int(r), int(g), int(b)) <= 255:
            colors["#%02x%02x%02x" % (int(r), int(g), int(b))] += 1
    custom_props = Counter()
    for name, val in re.findall(r"--([\w-]*(?:color|brand|primary|accent|secondary)[\w-]*)\s*:\s*([^;}{]+)", css_text, re.I):
        h = HEX.search(val)
        if h:
            custom_props[(name, norm_hex(h.group(0)))] += 1
    families = Counter()
    for decl in FONT_FAMILY.findall(css_text) + FONT_FACE.findall(css_text):
        for fam in decl.split(","):
            fam = fam.strip().strip("'\"").strip()
            fam = re.sub(r"^_+|_[0-9a-f]{5,}$", "", fam).replace("_", " ").strip()  # next/font hashed names
            if fam and fam.lower() not in GENERIC and not fam.startswith("var(") and len(fam) < 40 and not NOT_BRAND_FONT.search(fam):
                families[fam] += 1
    brand_colors = [(c, n) for c, n in colors.most_common(80) if c not in SOCIAL_COLORS and hsl_info(c)[0] > 0.25 and 0.12 < hsl_info(c)[1] < 0.9][:10]
    neutrals = [(c, n) for c, n in colors.most_common(60) if hsl_info(c)[0] <= 0.25][:6]
    # save logo files (private)
    os.makedirs(os.path.join(out, "private", "logos"), exist_ok=True)
    saved = []
    for i, (kind, page_url, src) in enumerate(dict.fromkeys(logos)):
        if len(saved) >= 12:
            break
        if kind == "inline-svg":
            path = os.path.join(out, "private", "logos", f"inline-{i}.svg")
            open(path, "w").write(src)
        else:
            data, ctype, _ = fetch(src, binary=True)
            if not data or len(data) < 200:
                continue
            ext = os.path.splitext(urllib.parse.urlparse(src).path)[1][:5] or (".svg" if "svg" in ctype else ".png")
            path = os.path.join(out, "private", "logos", f"{kind}-{i}{ext}")
            open(path, "wb").write(data)
        saved.append({"kind": kind, "file": os.path.relpath(path, out), "found_on": page_url, "src": src if kind != "inline-svg" else None})
    news.sort(key=lambda n: n["date"], reverse=True)
    return {
        "socials": {k: [u for u, _ in v.most_common(3)] for k, v in socials.items()},
        "site_videos": [{"url": u, "found_on": p} for u, p in videos.items()],
        "logos": saved,
        "colors": {"brand": brand_colors, "neutral": neutrals, "css_custom_properties": [[n, h, c] for (n, h), c in custom_props.most_common(20)]},
        "fonts": families.most_common(8),
        "brand_pages": [{"url": u, "text": t} for u, t in brand_text[:4]],
        "news": news[:12],
    }


# ---- 4: videos -------------------------------------------------------------------------------

NEG = re.compile(r"podcast|interview|webinar|panel|keynote|live|episode|talk|fireside|q&a|ama|testimonial|customer story|hiring|culture|event recap|conference|session|stream", re.I)
POS = re.compile(r"introduc|launch|announc|new|meet|demo|product|feature|explainer|how it works|now available|v\d|\d\.\d|teaser|trailer", re.I)


def channel_videos(urls, cookies):
    out = []
    for ch in urls:
        tabs = [ch.rstrip("/") + t for t in ("/videos", "/shorts")] if "youtube.com" in ch else [ch]
        for tab in tabs:
            cmd = ["yt-dlp", "--flat-playlist", "-J", "--playlist-end", "60", tab]
            if cookies:
                cmd[1:1] = ["--cookies", cookies]
            r = subprocess.run(cmd, capture_output=True, text=True, timeout=240)
            if r.returncode != 0:
                log(f"  ✖ {tab}: {r.stderr.strip().splitlines()[-1][:160] if r.stderr.strip() else 'failed'}")
                continue
            try:
                data = json.loads(r.stdout)
            except Exception:
                continue
            for rank, e in enumerate(data.get("entries") or []):
                url = e.get("url") or e.get("webpage_url") or ""
                if url and not url.startswith("http"):
                    url = f"https://www.youtube.com/watch?v={e.get('id')}"
                out.append({"url": url, "title": e.get("title") or "", "duration": e.get("duration"), "rank": rank, "source": tab})
    return out


def pick(cands, n):
    def score(c):
        d = c.get("duration")
        s = 0.0
        if d is not None and not (8 <= d <= 130):
            return -99
        if NEG.search(c.get("title", "")):
            return -99  # talks, podcasts, webinars: never product films
        s += 2 if POS.search(c.get("title", "")) else 0
        s -= 0.05 * c.get("rank", 0)  # newer first
        s += 0.5 if c.get("from_site") else 0
        return s
    ranked = sorted((c for c in cands if score(c) > -50), key=score, reverse=True)
    seen, outl = set(), []
    for c in ranked:
        if c["url"] in seen:
            continue
        seen.add(c["url"])
        outl.append(c)
    return outl[:n]


def download(url, dest, cookies, referer=None):
    cmd = ["yt-dlp", "-q", "--no-warnings", "-f", "bv*[height<=720][ext=mp4]+ba[ext=m4a]/b[height<=720]/b", "--merge-output-format", "mp4", "-o", dest, url]
    if cookies:
        cmd[1:1] = ["--cookies", cookies]
    if referer:
        cmd[1:1] = ["--referer", referer]
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=600)
    return r.returncode == 0 and os.path.exists(dest)


def frames(path, fps=2, w=192, h=108):
    r = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-vf", f"fps={fps},scale={w}:{h}", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True)
    a = np.frombuffer(r.stdout, np.uint8)
    return a.reshape(-1, h, w, 3).astype(np.float32) / 255 if a.size else np.zeros((0, h, w, 3), np.float32)


def mg_score(a):
    """Motion-graphics likelihood: flat colour areas + crisp edges (type, UI), little skin / texture."""
    if not len(a):
        return 0.0, {}
    g = a.mean(3)
    gx = np.abs(np.diff(g, axis=2))[:, :-1, :]
    gy = np.abs(np.diff(g, axis=1))[:, :, :-1]
    grad = gx + gy
    flat = (grad < 0.015).mean()
    crisp = (grad > 0.25).mean()
    texture = ((grad > 0.04) & (grad < 0.2)).mean()  # photographic mid-detail
    r, gch, b = a[..., 0], a[..., 1], a[..., 2]
    skin = ((r > 0.35) & (r > gch + 0.06) & (gch > b) & (r - b > 0.1) & (r - b < 0.5)).mean()
    s = 1.6 * flat + 3.0 * crisp - 2.2 * texture - 1.8 * skin
    return float(s), {"flat": round(float(flat), 3), "crisp": round(float(crisp), 4), "texture": round(float(texture), 3), "skin": round(float(skin), 3)}


def palette(a, k=8):
    if not len(a):
        return []
    px = (a.reshape(-1, 3) * 255).astype(np.int32)
    q = (px // 24) * 24 + 12
    keys, counts = np.unique(q[:, 0] * 65536 + q[:, 1] * 256 + q[:, 2], return_counts=True)
    order = np.argsort(-counts)
    total = counts.sum()
    out = []
    for i in order[:k]:
        v = int(keys[i])
        out.append(["#%02x%02x%02x" % (v >> 16, (v >> 8) & 255, v & 255), round(float(counts[i] / total), 3)])
    return out


def contact_sheet(path, dest):
    d = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path], capture_output=True, text=True).stdout or 0)
    fps = min(2.0, 40 / max(d, 1))
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", path, "-vf", f"fps={fps:.3f},scale=320:-1,tile=8x5", "-frames:v", "1", dest], check=False)


# ---- main ----------------------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--company", required=True)
    ap.add_argument("--site", required=True)
    ap.add_argument("--channel", action="append", default=[])
    ap.add_argument("--video", action="append", default=[], help="extra video URLs to consider")
    ap.add_argument("--out", default=None)
    ap.add_argument("--max-pages", type=int, default=60)
    ap.add_argument("--max-videos", type=int, default=12)
    ap.add_argument("--keep", type=int, default=10)
    ap.add_argument("--delay", type=float, default=0.3)
    a = ap.parse_args()
    slug = re.sub(r"[^a-z0-9]+", "-", a.company.lower()).strip("-")
    out = a.out or os.path.join(ROOT, "brands", slug)
    os.makedirs(os.path.join(out, "private", "sheets"), exist_ok=True)
    cookies = os.environ.get("YT_COOKIES_FILE")

    log(f"Scouting {a.company} · {a.site}")
    pages = crawl(a.site, a.max_pages, a.delay)
    info = assets(pages, out)
    channels = list(dict.fromkeys(a.channel + info["socials"].get("youtube", [])[:1] + info["socials"].get("vimeo", [])[:1]))
    log(f"  channels: {channels}")
    cands = channel_videos(channels, cookies)
    cands += [{"url": v["url"], "title": "", "duration": None, "rank": 0, "from_site": True, "referer": v["found_on"]} for v in info["site_videos"]]
    cands += [{"url": u, "title": "", "duration": None, "rank": 0, "from_site": True} for u in a.video]
    chosen = pick(cands, a.max_videos)
    log(f"  {len(cands)} candidate videos, downloading {len(chosen)}")

    from film_qa import measure  # motion-kit/tools/film_qa.py

    vids = []
    tmp = os.path.join(out, "private", "tmp")
    os.makedirs(tmp, exist_ok=True)
    for i, c in enumerate(chosen):
        dest = os.path.join(tmp, f"v{i:02d}.mp4")
        if not download(c["url"], dest, cookies, c.get("referer")):
            vids.append({**c, "status": "download failed"})
            continue
        fr = frames(dest)
        score, parts = mg_score(fr)
        try:
            m = measure(dest)
        except Exception as e:
            m = {"error": str(e)[:120]}
        vids.append({**c, "status": "ok", "mg_score": round(score, 3), "mg_parts": parts, "palette": palette(fr), "metrics": m, "file": dest})
        log(f"  · {c['url']}  mg {score:.2f}  {m.get('duration', '?')} s")
    ok = [v for v in vids if v.get("status") == "ok"]
    ok.sort(key=lambda v: v["mg_score"], reverse=True)
    kept = [v for v in ok if v["mg_score"] > 0.4][: a.keep] or ok[:3]
    for j, v in enumerate(kept):
        sheet = os.path.join(out, "private", "sheets", f"{j:02d}.jpg")
        contact_sheet(v["file"], sheet)
        v["sheet"] = os.path.relpath(sheet, out)
        v["kept"] = True
    for v in vids:
        if "file" in v:
            os.remove(v["file"])
            del v["file"]
    try:
        os.rmdir(tmp)
    except OSError:
        pass

    # house style from the kept motion-graphics films
    def med(key):
        vals = [v["metrics"].get(key) for v in kept if isinstance(v.get("metrics"), dict) and v["metrics"].get(key) is not None]
        return round(float(np.median(vals)), 4) if vals else None

    style = {k: med(k) for k in ("still_pct", "longest_still_s", "motion_median", "lufs", "hit_prominence_db", "onsets_per_s", "duration")}
    film_palette = Counter()
    for v in kept:
        for c, share in v.get("palette", []):
            film_palette[c] += share
    dossier = {
        "company": a.company,
        "site": a.site,
        "scouted": time.strftime("%Y-%m-%d"),
        **info,
        "channels": channels,
        "videos": vids,
        "house_style": style,
        "film_palette": [[c, round(s / max(1, len(kept)), 3)] for c, s in film_palette.most_common(10)],
    }
    json.dump(dossier, open(os.path.join(out, "dossier.json"), "w"), indent=1, ensure_ascii=False)
    open(os.path.join(out, "dossier.md"), "w").write(render_md(dossier))
    log(f"✔ dossier → {out}/dossier.md · {len(kept)} motion-graphics films kept of {len(ok)} downloaded")


def render_md(d):
    L = [f"# Brand dossier: {d['company']}", "", f"Scouted {d['scouted']} from {d['site']} by research/scout/scout.py. Facts and measurements only; logo files and contact sheets are in the encrypted bundle.", ""]
    L += ["## Latest launches / news", ""] + ([f"- {n['date']} · [{n['title']}]({n['url']}): {n['summary']}" for n in d["news"][:8]] or ["- none found on the site (search the web)"]) + [""]
    L += ["## Colours", "", "Brand colours from the site's CSS (count = uses):", ""] + [f"- `{c}` × {n}" for c, n in d["colors"]["brand"]] + ["", "Neutrals:", ""] + [f"- `{c}` × {n}" for c, n in d["colors"]["neutral"]]
    if d["colors"]["css_custom_properties"]:
        L += ["", "Named CSS colour tokens:", ""] + [f"- `--{n}`: `{h}`" for n, h, _ in d["colors"]["css_custom_properties"][:12]]
    L += ["", "Colours measured in their own films (share of pixels):", ""] + [f"- `{c}` {s:.0%}" for c, s in d["film_palette"]] + [""]
    L += ["## Type", "", "Font families named in the site's CSS (licensed fonts: names only; pick the closest free match):", ""] + [f"- {f} × {n}" for f, n in d["fonts"]] + [""]
    L += ["## Logos found", ""] + [f"- {l['kind']}: `{l['file']}` (on {l['found_on']})" for l in d["logos"]] + [""]
    if d["brand_pages"]:
        L += ["## Brand / press pages", ""] + [f"### {p['url']}\n\n{p['text'][:1500]}…\n" for p in d["brand_pages"]]
    hs = d["house_style"]
    L += ["## House style (median of their kept motion-graphics films)", "", f"- still frames {hs.get('still_pct')}% · longest still {hs.get('longest_still_s')} s · motion {hs.get('motion_median')}", f"- loudness {hs.get('lufs')} LUFS · SFX/hit prominence {hs.get('hit_prominence_db')} dB over the bed · {hs.get('onsets_per_s')} sound events/s · typical length {hs.get('duration')} s", ""]
    L += ["## Videos", "", "| kept | title | length | mg score | still % | motion | source |", "|---|---|---|---|---|---|---|"]
    for v in d["videos"]:
        m = v.get("metrics") or {}
        L.append(f"| {'✔' if v.get('kept') else ''} | {(v.get('title') or '')[:60]} | {m.get('duration', v.get('duration') or '')} | {v.get('mg_score', v.get('status', ''))} | {m.get('still_pct', '')} | {m.get('motion_median', '')} | {v['url']} |")
    L += ["", "## Channels", ""] + [f"- {c}" for c in d["channels"]] + ["", "Socials found on the site: " + ", ".join(f"{k}: {v[0]}" for k, v in d["socials"].items()), ""]
    return "\n".join(L)


if __name__ == "__main__":
    main()
