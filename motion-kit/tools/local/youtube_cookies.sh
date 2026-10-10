#!/usr/bin/env bash
# Option B: let GitHub's servers download YouTube too, by giving the repo your YouTube cookies.
#
#   bash tools/local/youtube_cookies.sh [chrome|safari|firefox|edge|brave]
#
# Exports your browser's YouTube cookies with yt-dlp into a cookies.txt and, if the GitHub CLI
# (gh) is installed and logged in, stores it as the repository secret YT_COOKIES (used by the
# brand-scout and research workflows). Cookies expire after a few weeks; run it again then.
# Tip: use a spare Google account, not your main one: YouTube can flag accounts used by bots.
set -euo pipefail
BROWSER="${1:-chrome}"
OUT="$(mktemp -d)/cookies.txt"
yt-dlp --cookies-from-browser "$BROWSER" --cookies "$OUT" --skip-download --quiet "https://www.youtube.com/watch?v=jNQXAC9IVRw" || true
if ! grep -q "youtube.com" "$OUT" 2>/dev/null; then
  echo "No YouTube cookies found in $BROWSER. Open youtube.com in $BROWSER, sign in, and run this again." >&2
  exit 1
fi
grep -E "youtube\.com|google\.com" "$OUT" > "$OUT.yt" && mv "$OUT.yt" "$OUT"
if command -v gh >/dev/null && gh auth status >/dev/null 2>&1; then
  REPO=$(git -C "$(dirname "$0")" remote get-url origin | sed -E 's#(git@github.com:|https://github.com/)##; s#\.git$##')
  gh secret set YT_COOKIES --repo "$REPO" < "$OUT"
  echo "✔ YT_COOKIES secret set on $REPO. GitHub runs can now download YouTube videos."
else
  echo "cookies.txt written to $OUT"
  echo "Add it as a repository secret named YT_COOKIES: GitHub → repo → Settings → Secrets and variables → Actions → New secret (paste the file's contents)."
fi
rm -f "$OUT"
