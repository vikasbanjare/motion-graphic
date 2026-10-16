#!/usr/bin/env bash
# Two-pass loudness master to -14 LUFS / -1.5 dBTP (single-pass loudnorm can miss by ~1 LU).
#   bash tools/master.sh in.mp4 out.mp4
set -euo pipefail
in="$1"; out="$2"
j=$(ffmpeg -hide_banner -i "$in" -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
get() { echo "$j" | python3 -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
ffmpeg -v error -y -i "$in" -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(get input_i):measured_TP=$(get input_tp):measured_LRA=$(get input_lra):measured_thresh=$(get input_thresh):offset=$(get target_offset):linear=true" -ar 48000 -c:a aac -b:a 192k "$out"
