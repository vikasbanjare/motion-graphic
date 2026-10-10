"""Finds video links on websites for the research workflow.

Reads research/sites.txt (one start URL per line), walks each site's own pages (same host,
breadth first, polite delay) and prints every video it finds as "url<TAB>referer":
Vimeo and YouTube embeds or links, direct .mp4/.webm/.m3u8 files, and Vimeo CDN files.
The referer is the page the video was found on; Vimeo's privacy setting "embed only on
this site" needs it.

    python3 research/crawl.py research/sites.txt [--max-pages 400] > found.tsv

Standard library only. Static HTML only: a site that builds its pages with JavaScript
yields few or no videos, which the summary on stderr makes visible.
"""

import argparse
import html
import re
import sys
import time
import urllib.parse
import urllib.request
from collections import deque

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15"
SKIP_EXT = re.compile(r"\.(jpe?g|png|gif|webp|avif|svg|ico|css|js|json|xml|pdf|zip|woff2?|ttf|mp3|wav|mp4|webm|m3u8|mov)(\?|$)", re.I)
VIDEO_EXT = re.compile(r"\.(mp4|webm|m3u8)$", re.I)
HREF = re.compile(r"""(?:href|src|data-src|data-video|data-url|content)\s*=\s*["']([^"'<>]+)["']""", re.I)
VIDEO_PATTERNS = [
    (re.compile(r"(?:https?:)?//(?:player\.)?vimeo\.com/(?:video/)?(\d{5,})(?:/|\?h=|#)?([0-9a-f]{6,})?", re.I),
     lambda m: f"https://player.vimeo.com/video/{m.group(1)}" + (f"?h={m.group(2)}" if m.group(2) else "")),
    (re.compile(r"(?:https?:)?//(?:www\.)?youtube(?:-nocookie)?\.com/(?:embed/|watch\?v=|shorts/)([\w-]{11})", re.I),
     lambda m: f"https://www.youtube.com/watch?v={m.group(1)}"),
    (re.compile(r"(?:https?:)?//youtu\.be/([\w-]{11})", re.I),
     lambda m: f"https://www.youtube.com/watch?v={m.group(1)}"),
    (re.compile(r"(?:https?:)?//[^\s\"'<>()]+?\.(?:mp4|webm|m3u8)(?:\?[^\s\"'<>()]*)?", re.I),
     lambda m: ("https:" + m.group(0)) if m.group(0).startswith("//") else m.group(0)),
]


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html,*/*"})
    with urllib.request.urlopen(req, timeout=30) as r:
        if "html" not in r.headers.get("Content-Type", "html"):
            return ""
        return r.read(4_000_000).decode("utf-8", "replace")


def crawl(start, max_pages, delay):
    host = urllib.parse.urlsplit(start).netloc.lower().removeprefix("www.")
    seen, queue, found, pages, errors = {start}, deque([start]), {}, 0, 0
    while queue and pages < max_pages:
        url = queue.popleft()
        try:
            text = html.unescape(get(url))
        except Exception as e:  # one bad page never stops the crawl
            errors += 1
            print(f"  ! {url}: {e}", file=sys.stderr)
            continue
        pages += 1
        for rx, norm in VIDEO_PATTERNS:
            for m in rx.finditer(text):
                found.setdefault(norm(m), url)
        for link in HREF.findall(text):
            nxt = urllib.parse.urljoin(url, link.strip()).split("#")[0]
            parts = urllib.parse.urlsplit(nxt)
            if VIDEO_EXT.search(parts.path):
                found.setdefault(nxt, url)
                continue
            if parts.scheme not in ("http", "https") or SKIP_EXT.search(parts.path):
                continue
            if parts.netloc.lower().removeprefix("www.") != host or nxt in seen:
                continue
            seen.add(nxt)
            queue.append(nxt)
        time.sleep(delay)
    print(f"{start}: {pages} pages read, {errors} failed, {len(found)} videos, {len(queue)} pages left unread", file=sys.stderr)
    return found


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("sites")
    ap.add_argument("--max-pages", type=int, default=400)
    ap.add_argument("--delay", type=float, default=0.5)
    a = ap.parse_args()
    starts = [l.strip() for l in open(a.sites) if l.strip() and not l.startswith("#")]
    out = {}
    for s in starts:
        for v, ref in crawl(s, a.max_pages, a.delay).items():
            out.setdefault(v, ref)
    for v, ref in sorted(out.items()):
        print(f"{v}\t{ref}")


if __name__ == "__main__":
    main()
