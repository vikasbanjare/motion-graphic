"""Last-resort downloader: plays a video in headless Chromium and records the stream it requests.

Used by fetch.sh when yt-dlp and the Vimeo player config are refused. Vimeo's "embed only on
this site" privacy checks the real parent page, not just a Referer header, so this first
opens the page the video was found on (where the player is an iframe) and plays it there;
if that page has no player, it opens the player URL directly.
Prints the first HLS/MP4 URL the player requests; on failure prints what the page showed.

    python3 research/browser_grab.py <player-url> [page-url]  -> prints a stream URL, exit 1 if none

Needs: pip install playwright && python -m playwright install --with-deps chromium
"""
import os
import re
import sys

from playwright.sync_api import sync_playwright

STREAM = re.compile(r"\.(m3u8|mp4)(\?|$)|/playlist\.json|/master\.json|/manifest/video\.m3u8", re.I)
PLAY = ["button[aria-label*='Play' i]", ".vp-big-play-button", "button.play", "[data-play-button]", "video"]
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36"


def click_play(frame):
    for sel in PLAY:
        try:
            frame.click(sel, timeout=2500)
            return True
        except Exception:
            continue
    return False


def best(hits):
    for want in (".m3u8", ".mp4", "playlist.json", "master.json"):
        for h in hits:
            if want in h:
                return h
    return None


def grab(url, page_url):
    hits, notes = [], []
    vid = re.search(r"/video/(\d+)", url)
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=os.environ.get("CHROMIUM_PATH") or None,
                                    args=["--autoplay-policy=no-user-gesture-required", "--mute-audio"])
        ctx = browser.new_context(user_agent=UA, viewport={"width": 1280, "height": 800})
        ctx.on("request", lambda r: hits.append(r.url) if STREAM.search(r.url) else None)
        page = ctx.new_page()
        # 1) The page the video lives on: play the embedded player in place.
        if page_url and page_url != url:
            try:
                page.goto(page_url, wait_until="domcontentloaded", timeout=45000)
                page.wait_for_timeout(2500)
                frames = [f for f in page.frames if vid and vid.group(1) in f.url] or [f for f in page.frames if "player" in f.url]
                if frames:
                    try:
                        frames[0].frame_element().scroll_into_view_if_needed(timeout=3000)
                    except Exception:
                        pass
                    click_play(frames[0])
                else:
                    click_play(page)
                page.wait_for_timeout(7000)
                notes.append(f"page {page_url}: {len(frames)} player frame(s)")
            except Exception as e:
                notes.append(f"page {page_url}: {e}")
        # 2) The player URL on its own.
        if not best(hits):
            try:
                page.goto(url, referer=page_url or None, wait_until="domcontentloaded", timeout=45000)
                click_play(page)
                page.wait_for_timeout(6000)
                text = page.inner_text("body", timeout=3000)[:160].replace("\n", " ")
                notes.append(f"player said: {text!r}")
            except Exception as e:
                notes.append(f"player {url}: {e}")
        browser.close()
    return best(hits), notes


def main():
    url = sys.argv[1]
    page_url = sys.argv[2] if len(sys.argv) > 2 else ""
    try:
        found, notes = grab(url, page_url)
    except Exception as e:
        print(f"browser grab: {e}", file=sys.stderr)
        sys.exit(1)
    if not found:
        print("browser grab: no stream; " + " | ".join(notes), file=sys.stderr)
        sys.exit(1)
    print(found)


if __name__ == "__main__":
    main()
