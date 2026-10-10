#!/usr/bin/env bash
# Build one overnight film's soundtrack: original score + motivated SFX from <name>.json -> public/custom/cred-night/<name>.wav
#   bash src/custom/cred/night/audio/build.sh <name> <seconds> "<sections>" [key]      (from motion-kit/)
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
v2="$here/../../v2/audio"
out="$here/../../../../../public/custom/cred-night"
name="$1"; secs="$2"; sections="$3"; key="${4:-Eb}"
tmp="$(mktemp -d)"
mkdir -p "$out"
python3 -I "$v2/cred_score.py" --seconds "$secs" --key "$key" --sections "$sections" --lufs -14 --out "$tmp/score.wav"
cp "$here/$name.json" "$tmp/cues.json"
cp "$v2"/cred_sfx.py "$v2"/cred_score.py "$v2"/render_cues.py "$tmp/"
python3 -I "$tmp/render_cues.py" "$tmp/cues.json" --out "$out/$name.wav"
rm -rf "$tmp"
