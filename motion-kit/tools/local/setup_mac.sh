#!/usr/bin/env bash
# One-time setup of the local tier on an Apple Silicon Mac.
#
#   bash tools/local/setup_mac.sh            voice (Chatterbox, Supertonic, Kokoro) + music/SFX (Stable Audio 3 MLX)
#   bash tools/local/setup_mac.sh --video    + FastMetal Wan 2.2 5B text-to-video (needs 16 GB+, ~10 GB download)
#
# Everything goes into ~/.motion-kit (a Python venv and the model repos), nothing system-wide
# except Homebrew packages. Stable Audio 3 and some voices are gated on Hugging Face: you will be
# asked to log in (`hf auth login`) and accept the model terms on the website once.
# Sources and licences: docs/research/local-mac-colab.md.
set -euo pipefail

HOME_DIR="$HOME/.motion-kit"
VIDEO=0
[ "${1:-}" = "--video" ] && VIDEO=1

if [ "$(uname -s)" != "Darwin" ] || [ "$(uname -m)" != "arm64" ]; then
  echo "This script is for Apple Silicon Macs. On other machines see docs/research/free-open-models.md." >&2
  exit 1
fi
command -v brew >/dev/null || { echo "Install Homebrew first: https://brew.sh" >&2; exit 1; }

echo "== Homebrew packages (ffmpeg, espeak-ng, python 3.11, uv)"
brew install ffmpeg espeak-ng python@3.11 uv >/dev/null

mkdir -p "$HOME_DIR"
PY311="$(brew --prefix python@3.11)/bin/python3.11"
if [ ! -x "$HOME_DIR/venv/bin/python" ]; then
  echo "== Python venv at $HOME_DIR/venv"
  "$PY311" -m venv "$HOME_DIR/venv"
fi
PIP="$HOME_DIR/venv/bin/pip"
"$PIP" install -q --upgrade pip

echo "== Voices: Chatterbox Multilingual (MIT), Supertonic 3 (OpenRAIL-M), Kokoro (Apache-2.0)"
"$PIP" install -q chatterbox-tts supertonic kokoro-onnx soundfile numpy "huggingface_hub[cli]"

echo "== Music + SFX: Stable Audio 3, official MLX runtime"
if [ ! -d "$HOME_DIR/stable-audio-3" ]; then
  git clone -q https://github.com/Stability-AI/stable-audio-3.git "$HOME_DIR/stable-audio-3"
fi
( cd "$HOME_DIR/stable-audio-3/optimized/mlx" && bash bootstrap.sh )

if [ "$VIDEO" = 1 ]; then
  MEM=$(( $(sysctl -n hw.memsize) / 1073741824 ))
  if [ "$MEM" -lt 16 ]; then
    echo "Skipping local video: $MEM GB is below the 16 GB FastMetal needs. Use colab/motion_kit_video.ipynb." >&2
  else
    echo "== Video: FastVideo + FastMetal-5B-QAD (Wan 2.2 5B, Apache-2.0)"
    [ -d "$HOME_DIR/FastVideo" ] || git clone -q https://github.com/hao-ai-lab/FastVideo.git "$HOME_DIR/FastVideo"
    ( cd "$HOME_DIR/FastVideo" && uv venv -q .venv && uv pip install -q --python .venv/bin/python -e '.[mlx]' )
    "$HOME_DIR/venv/bin/hf" download FastVideo/FastMetal-5B-QAD --local-dir "$HOME_DIR/FastMetal-5B-QAD"
  fi
fi

echo
echo "Gated models: if a download fails with 401/403, run  $HOME_DIR/venv/bin/hf auth login"
echo "and accept the terms on huggingface.co for stabilityai/stable-audio-3-* once."
echo
"$HOME_DIR/venv/bin/python" "$(dirname "$0")/doctor.py"
