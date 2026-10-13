#!/usr/bin/env bash
# Cut the supplied track (assets/audio/source/V1.mp3, 150 BPM, B major) to the
# 30.0 s film. Beat-exact edit, measured with librosa (see docs/REFERENCE_STUDY.md):
#   film 0.0–24.8  ← music 36.007–60.807  (film 16.0 = the song's drop at 52.007)
#   film 24.8–30.0 ← music 86.407–91.607  (the song's own half-bar break, then its
#                                          final hit at 90.0 → film 28.4)
# 15 ms crossfade at the splice, 0.4 s fade-out at the end. Output: assets/audio/music.wav
set -euo pipefail
cd "$(dirname "$0")/.."
SRC=${1:-assets/audio/source/V1.mp3}
A_IN=36.007; A_LEN=24.8
B_IN=86.392; B_LEN=5.215   # starts 15 ms early to feed the crossfade
ffmpeg -hide_banner -loglevel error -y -i "$SRC" -filter_complex "
  [0:a]atrim=start=${A_IN}:duration=${A_LEN},asetpts=PTS-STARTPTS[a];
  [0:a]atrim=start=${B_IN}:duration=${B_LEN},asetpts=PTS-STARTPTS[b];
  [a][b]acrossfade=d=0.015:c1=tri:c2=tri,atrim=duration=30,afade=t=out:st=29.6:d=0.4,aresample=48000[out]" \
  -map "[out]" -ac 2 -c:a pcm_s16le assets/audio/music.wav
ffprobe -v error -show_entries format=duration -of csv=p=0 assets/audio/music.wav
