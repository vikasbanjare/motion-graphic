#!/usr/bin/env bash
# Render both compositions to out/. WebGL (angle) is required by paper() and p5.brush.
# If Remotion can't download its browser, set REMOTION_BROWSER_EXECUTABLE to a
# local Chrome / chrome-headless-shell binary.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p out
args=(--gl=angle --timeout=240000 --concurrency="${CONCURRENCY:-4}")
if [[ -n "${REMOTION_BROWSER_EXECUTABLE:-}" ]]; then args+=(--browser-executable="$REMOTION_BROWSER_EXECUTABLE"); fi
for comp in "${@:-Master16x9 Cut9x16}"; do
  for c in $comp; do
    npx remotion render "$c" "out/${c}.mp4" "${args[@]}"
  done
done
