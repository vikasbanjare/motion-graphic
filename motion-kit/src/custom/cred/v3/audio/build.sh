#!/usr/bin/env bash
# Build the CRED card v3 soundtrack: original score (125 BPM) + motivated SFX -> public/custom/cred-v3/mix.wav
#   bash src/custom/cred/v3/audio/build.sh        (from motion-kit/)
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
v2="$here/../../v2/audio"
out="$here/../../../../../public/custom/cred-v3"
tmp="$(mktemp -d)"
mkdir -p "$out"
python3 -I "$v2/cred_score.py" --seconds 30 --sections "intro=3.84,grooveA=7.68,drop=11.52,break=19.2,drop2=21.12,outro=26.88,tail=28.8" --lufs -14 --out "$tmp/score.wav"
cp "$here/cues_v3.json" "$tmp/cues.json"
cp "$v2"/cred_sfx.py "$v2"/cred_score.py "$v2"/render_cues.py "$tmp/"
python3 -I "$tmp/render_cues.py" "$tmp/cues.json" --out "$out/mix.wav"
rm -rf "$tmp"
