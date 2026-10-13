#!/usr/bin/env bash
# Two-pass EBU R128 loudnorm to −14 LUFS integrated, ≤ −1 dBTP true peak.
# Writes out/<name>.norm.mp4 next to each render; video is stream-copied.
set -euo pipefail
cd "$(dirname "$0")/.."
TARGET_I=-14
TARGET_TP=-1.5   # a little headroom so the measured true peak lands ≤ −1
TARGET_LRA=11
shopt -s nullglob
files=(out/*.mp4)
for f in "${files[@]}"; do
  [[ "$f" == *.norm.mp4 ]] && continue
  out="${f%.mp4}.norm.mp4"
  stats=$(ffmpeg -hide_banner -nostats -i "$f" -af "loudnorm=I=${TARGET_I}:TP=${TARGET_TP}:LRA=${TARGET_LRA}:print_format=json" -f null - 2>&1 | sed -n '/^{/,/^}/p')
  get() { echo "$stats" | sed -n "s/.*\"$1\" : \"\\(.*\\)\".*/\\1/p"; }
  ffmpeg -hide_banner -y -loglevel error -i "$f" -c:v copy \
    -af "loudnorm=I=${TARGET_I}:TP=${TARGET_TP}:LRA=${TARGET_LRA}:measured_I=$(get input_i):measured_TP=$(get input_tp):measured_LRA=$(get input_lra):measured_thresh=$(get input_thresh):offset=$(get target_offset):linear=true" \
    -ar 48000 -c:a aac -b:a 256k "$out"
  echo "→ $out"
done
