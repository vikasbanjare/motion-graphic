#!/usr/bin/env bash
# Render QC stills: scripts/stills.sh <composition> <outdir> <frame> [frame...]
set -euo pipefail
cd "$(dirname "$0")/.."
comp="$1"; out="$2"; shift 2
mkdir -p "$out"
bundle="$out/.bundle"
npx remotion bundle --out-dir "$bundle" >/dev/null
browser_args=()
if [[ -n "${REMOTION_BROWSER_EXECUTABLE:-}" ]]; then browser_args=(--browser-executable="$REMOTION_BROWSER_EXECUTABLE"); fi
for f in "$@"; do
  npx remotion still "$bundle" "$comp" "$out/${comp}-f$(printf %03d "$f").png" --frame="$f" "${browser_args[@]}" --log=error --timeout=240000
done
