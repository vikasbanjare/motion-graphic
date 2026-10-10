"""Prints a playable stream URL for a Vimeo player link, the way the embedded player gets it.

yt-dlp's Vimeo API route answers 401 from GitHub's runners for many embed-only videos.
The player itself reads https://player.vimeo.com/video/<id>/config (with the page that
embeds it as referer); that JSON lists HLS / DASH / progressive files.

    python3 research/vimeo_config.py <player-url> <referer>   -> prints one URL, exit 1 if none
"""
import json
import re
import sys
import urllib.request

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15"


def main():
    url, ref = sys.argv[1], (sys.argv[2] if len(sys.argv) > 2 else "https://vimeo.com/")
    m = re.search(r"/video/(\d+)(?:\?h=([0-9a-f]+))?", url)
    if not m:
        sys.exit(1)
    cfg = f"https://player.vimeo.com/video/{m.group(1)}/config" + (f"?h={m.group(2)}" if m.group(2) else "")
    req = urllib.request.Request(cfg, headers={"User-Agent": UA, "Referer": ref})
    data = json.load(urllib.request.urlopen(req, timeout=30))
    files = data.get("request", {}).get("files", {})
    prog = sorted((p for p in files.get("progressive", []) if p.get("height", 0) <= 720), key=lambda p: -p.get("height", 0))
    if prog:
        print(prog[0]["url"])
        return
    for kind in ("hls", "dash"):
        cdns = files.get(kind, {}).get("cdns", {})
        default = files.get(kind, {}).get("default_cdn")
        for name in [default, *cdns]:
            if name in cdns and cdns[name].get("url"):
                print(cdns[name]["url"])
                return
    sys.exit(1)


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"vimeo config: {e}", file=sys.stderr)
        sys.exit(1)
