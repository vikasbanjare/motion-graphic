#!/usr/bin/env bash
# Render one ten-film in chunks (fresh browser per chunk; long WebGL renders stall), join, add its mix, master.
#   bash src/custom/cred/ten/render.sh <letter> <CompositionId> <frames> "<chunk ranges>"
#   e.g. bash src/custom/cred/ten/render.sh b TenB 720 "0-191 192-311 312-527 528-719"
set -euo pipefail
L="$1"; COMP="$2"; N="$3"; RANGES="$4"
cd /home/user/motion-graphic/motion-kit
D=/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/ten/$L/chunks
mkdir -p "$D"; : > "$D/list.txt"
for r in $RANGES; do
  [ -s "$D/c$r.mp4" ] || npx remotion render "$COMP" "$D/c$r.mp4" --frames="$r" --gl=swangle --concurrency=2 --timeout=300000 --muted --codec=h264 --crf=14 --log=error
  echo "file '$D/c$r.mp4'" >> "$D/list.txt"
done
ffmpeg -v error -y -f concat -safe 0 -i "$D/list.txt" -c copy "$D/video.mp4"
ffmpeg -v error -y -i "$D/video.mp4" -i "public/custom/cred-ten/$L.wav" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest "out/ten-$L.raw.mp4"
bash tools/master.sh "out/ten-$L.raw.mp4" "out/ten-$L.mp4"
echo RENDERED out/ten-$L.mp4
