#!/usr/bin/env bash
# Build the CRED card v2 soundtrack: original score (125 BPM, Eb) + SFX cue sheet -> public/custom/cred-v2/mix.wav
#   bash src/custom/cred/v2/audio/build.sh        (from motion-kit/)
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
out="$here/../../../../../public/custom/cred-v2"
tmp="$(mktemp -d)"
python3 -I "$here/cred_score.py" --seconds 30 --sections "intro=3.84,grooveA=5.76,drop=17.28,break=19.2,drop2=21.12,outro=26.88,tail=28.8" --lufs -14 --out "$tmp/score.wav"
cp "$here/cues_v2.json" "$tmp/cues.json"
cp "$here"/cred_sfx.py "$here"/cred_score.py "$here"/render_cues.py "$tmp/"
python3 -I "$tmp/render_cues.py" "$tmp/cues.json" --out "$out/mix.wav"
cp "$tmp/score.wav.beats.json" "$out/mix.beats.json"
rm -rf "$tmp"
