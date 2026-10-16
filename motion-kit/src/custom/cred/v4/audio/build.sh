#!/usr/bin/env bash
# Build the CRED card v4 soundtrack -> public/custom/cred-v4/mix.wav   (from motion-kit/: bash src/custom/cred/v4/audio/build.sh)
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
v2="$here/../../v2/audio"
out="$here/../../../../../public/custom/cred-v4"
tmp="$(mktemp -d)"
mkdir -p "$out"
python3 -I "$v2/cred_score.py" --seconds 25.05 --sections "intro=1.0,grooveA=2.33,drop=5.17,break=12.42,drop2=15.42,outro=21.92,tail=23.5" --lufs -14 --out "$tmp/score.wav"
cp "$here/cues_v4.json" "$tmp/cues.json"
cp "$v2"/cred_sfx.py "$v2"/cred_score.py "$v2"/render_cues.py "$tmp/"
python3 -I "$tmp/render_cues.py" "$tmp/cues.json" --out "$out/mix.wav"
rm -rf "$tmp"
