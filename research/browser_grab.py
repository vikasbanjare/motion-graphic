"""Last-resort downloader: opens a video player in headless Chromium and records the stream it plays.

Used by fetch.sh when yt-dlp and the Vimeo player config are refused (Vimeo answers 401/403
to plain requests from datacenter IPs, but serves a real browser that loads the embed with
the page it lives on as referer). Prints the first HLS/MP4/DASH URL the player requests.

    python3 research/browser_grab.py <player-url> [referer]  -> prints a stream URL, exit 1 if none

Needs: pip install playwright && python -m playwright install --with-deps chromium
"""
import os
import re
import sys

from playwright.sync_api import sync_playwright

STREAM = re.compile(r"\.(m3u8|mp4)(\?|$)|/playlist\.json|/master\.json|/manifest/video\.m3u8", re.I)
PLAY = ["button[aria-label*='Play' i]", ".vp-big-play-button", "button.play", "[data-play-button]", "video"]


def grab(url, referer):
    hits = []
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=os.environ.get("CHROMIUM_PATH") or None, args=["--autoplay-policy=no-user-gesture-required", "--mute-audio"])
        page = browser.new_page(user_agent=(
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36"))
        page.on("request", lambda r: hits.append(r.url) if STREAM.search(r.url) else None)
        page.goto(url, referer=referer, wait_until="domcontentloaded", timeout=45000)
        for sel in PLAY:
            try:
                page.click(sel, timeout=2500)
                break
            except Exception:
                continue
        page.wait_for_timeout(6000)
        browser.close()
    # Prefer HLS (yt-dlp/ffmpeg read it directly), then MP4, then Vimeo's JSON playlists.
    for want in (".m3u8", ".mp4", "playlist.json", "master.json"):
        for h in hits:
            if want in h:
                return h
    return None


def main():
    url = sys.argv[1]
    referer = sys.argv[2] if len(sys.argv) > 2 else "https://vimeo.com/"
    try:
        found = grab(url, referer)
    except Exception as e:
        print(f"browser grab: {e}", file=sys.stderr)
        sys.exit(1)
    if not found:
        print("browser grab: player requested no stream", file=sys.stderr)
        sys.exit(1)
    print(found)


if __name__ == "__main__":
    main()
