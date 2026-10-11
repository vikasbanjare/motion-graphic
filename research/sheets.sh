#!/usr/bin/env bash
# Contact sheets for frame-by-frame review: 2 frames per second, 240 px wide, 8x4 tiles
# (16 s per sheet), read in order left to right, top to bottom.
#
#   bash research/sheets.sh <videos-dir> <out-dir>
set -u
mkdir -p "$2"
for f in "$1"/*.mp4; do
  [ -e "$f" ] || continue
  name=$(basename "$f" .mp4)
  mkdir -p "$2/$name"
  ffmpeg -v error -nostdin -i "$f" -vf "fps=2,scale=240:-2,tile=8x4" -q:v 5 "$2/$name/sheet%02d.jpg" || echo "sheets failed: $name"
done
