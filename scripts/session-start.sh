#!/usr/bin/env bash
# SessionStart hook (.claude/settings.json): makes a fresh checkout ready to make videos,
# so someone can open this repo in Claude Code (web, desktop or CLI) and just type.
#
#   - installs motion-kit's packages when they are missing (npm ci, quiet)
#   - finds a Chromium for Remotion and exports REMOTION_BROWSER_EXECUTABLE for the session
#   - checks ffmpeg (voice alignment, music, loudness)
#   - prints ONE status line, which Claude Code adds to the session context
#
# Idempotent and fast once installed (no network). Never fails the session: always exits 0.
# Run it by hand any time:  bash scripts/session-start.sh

ROOT="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
KIT="$ROOT/motion-kit"
LOG="${TMPDIR:-/tmp}/motion-kit-setup.log"
STAMP="$KIT/node_modules/.motion-kit-lock"
STATUS=""
PROBLEM=""

say() { STATUS="${STATUS:+$STATUS; }$1"; }

finish() {
  if [ -z "$PROBLEM" ]; then
    echo "motion-kit ready: $STATUS. Describe a video to start (motion-director skill)."
  else
    echo "motion-kit setup incomplete: $STATUS."
  fi
  exit 0
}
trap finish EXIT

if [ ! -f "$KIT/package.json" ]; then
  say "no motion-kit/ folder in $ROOT"
  PROBLEM=1
  exit 0
fi

# --- Node.js --------------------------------------------------------------------
if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  say "Node.js not found (install Node.js 22.18+ from nodejs.org, then restart)"
  PROBLEM=1
  exit 0
fi
NODE_OK=$(node -e 'const [a, b] = process.versions.node.split(".").map(Number); process.stdout.write(a > 22 || (a === 22 && b >= 18) ? "1" : "0")' 2>/dev/null)
if [ "$NODE_OK" != "1" ]; then
  say "Node.js $(node -v 2>/dev/null) is too old (needs 22.18+)"
  PROBLEM=1
fi

# --- packages -------------------------------------------------------------------
# Install when node_modules is missing or incomplete, or when this hook installed it from
# an older package-lock.json. A node_modules set up by hand (or a symlink) is left alone.
LOCK_SUM=$(cksum < "$KIT/package-lock.json" 2>/dev/null | tr -s ' ' '-')
NEED=""
if [ -L "$KIT/node_modules" ]; then
  NEED=""
elif [ ! -f "$KIT/node_modules/remotion/package.json" ]; then
  NEED="missing"
elif [ -f "$STAMP" ] && [ "$(cat "$STAMP" 2>/dev/null)" != "$LOCK_SUM" ]; then
  NEED="outdated"
fi

if [ -n "$NEED" ]; then
  if (cd "$KIT" && npm ci --no-audit --no-fund --loglevel=error) > "$LOG" 2>&1 \
    || (cd "$KIT" && npm install --no-audit --no-fund --loglevel=error) >> "$LOG" 2>&1; then
    printf '%s' "$LOCK_SUM" > "$STAMP" 2>/dev/null
    say "packages installed"
  else
    say "npm install failed (log: $LOG; needs network access to registry.npmjs.org)"
    PROBLEM=1
  fi
else
  say "packages ok"
fi

# --- browser for Remotion -------------------------------------------------------
# Remotion downloads its own Chrome Headless Shell on the first render. Where that
# download is blocked (cloud sandboxes), point it at a Playwright Chromium already on disk.
BROWSER=""
if [ -n "$REMOTION_BROWSER_EXECUTABLE" ] && [ -x "$REMOTION_BROWSER_EXECUTABLE" ]; then
  say "browser from REMOTION_BROWSER_EXECUTABLE"
elif [ -n "$(find "$KIT/node_modules/.remotion" -name chrome-headless-shell -type f -perm -u+x 2>/dev/null | head -n 1)" ]; then
  say "browser: Remotion's own"
else
  for DIR in "$PLAYWRIGHT_BROWSERS_PATH" /opt/pw-browsers "$HOME/.cache/ms-playwright"; do
    [ -n "$DIR" ] && [ -d "$DIR" ] || continue
    # Headless shell first (what Remotion expects), then full Chromium; the newest
    # revision sorts last in each glob.
    for PATTERN in \
      'chromium_headless_shell-*/chrome-linux/headless_shell' \
      'chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell' \
      'chromium-*/chrome-linux/chrome' \
      'chromium-*/chrome-linux64/chrome'; do
      for CANDIDATE in "$DIR"/$PATTERN; do
        [ -x "$CANDIDATE" ] && BROWSER="$CANDIDATE"
      done
      [ -n "$BROWSER" ] && break 2
    done
  done
  if [ -z "$BROWSER" ]; then
    say "browser: Remotion will download one on the first render"
  elif [ -n "$CLAUDE_ENV_FILE" ]; then
    printf 'export REMOTION_BROWSER_EXECUTABLE=%q\n' "$BROWSER" >> "$CLAUDE_ENV_FILE"
    say "browser $(basename "$(dirname "$(dirname "$BROWSER")")")"
  else
    say "browser found, run: export REMOTION_BROWSER_EXECUTABLE=$BROWSER"
  fi
fi

# --- ffmpeg ---------------------------------------------------------------------
if command -v ffmpeg >/dev/null 2>&1; then
  say "ffmpeg ok"
else
  say "ffmpeg missing (only needed for voice alignment, music and loudness)"
fi

# --- skill ----------------------------------------------------------------------
# .claude/skills/motion-director is a symlink to skills/motion-director. Checkouts without
# symlink support (Git on Windows by default) turn it into a small text file.
if [ -f "$ROOT/skills/motion-director/SKILL.md" ] && [ ! -f "$ROOT/.claude/skills/motion-director/SKILL.md" ]; then
  say "skill link not checked out as a symlink: for video requests follow skills/motion-director/SKILL.md"
fi

exit 0
