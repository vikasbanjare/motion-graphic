"""What this machine can run, and what to install next.

    python3 tools/local/doctor.py          (or: npm run local:doctor)

Reads the platform, unified memory / RAM, GPU backend (Apple MPS / MLX, NVIDIA CUDA) and which
generators are installed, then prints the local-tier plan for this machine. Model picks and
memory figures come from docs/research/local-mac-colab.md (checked 2026-10-10).
"""

import importlib.util
import os
import platform
import shutil
import subprocess
import sys

HOME = os.path.expanduser("~/.motion-kit")
VENV_PY = os.path.join(HOME, "venv", "bin", "python")


def mem_gb():
    try:
        if sys.platform == "darwin":
            return int(subprocess.check_output(["sysctl", "-n", "hw.memsize"]).strip()) / 2**30
        with open("/proc/meminfo") as f:
            return int(f.readline().split()[1]) / 2**20
    except Exception:
        return 0.0


def has(mod, python=sys.executable):
    if python == sys.executable:
        return importlib.util.find_spec(mod) is not None
    return subprocess.run([python, "-c", f"import {mod}"], capture_output=True).returncode == 0


def main():
    apple = sys.platform == "darwin" and platform.machine() == "arm64"
    ram = mem_gb()
    chip = ""
    if apple:
        try:
            chip = subprocess.check_output(["sysctl", "-n", "machdep.cpu.brand_string"], text=True).strip()
        except Exception:
            pass
    cuda = shutil.which("nvidia-smi") is not None
    py = VENV_PY if os.path.exists(VENV_PY) else sys.executable

    print(f"Machine   {chip or platform.machine()} · {ram:.0f} GB · {'Apple Silicon (Metal)' if apple else 'NVIDIA CUDA' if cuda else 'CPU only'}")
    print(f"Python    {py}{'  (motion-kit venv)' if py == VENV_PY else '  (no venv yet: run tools/local/setup_mac.sh)'}")
    print()

    checks = [
        ("node", shutil.which("node") is not None, "brew install node  (22+)"),
        ("ffmpeg", shutil.which("ffmpeg") is not None, "brew install ffmpeg"),
        ("espeak-ng", shutil.which("espeak-ng") is not None, "brew install espeak-ng  (Hindi G2P for goonj / Kokoro Hindi)"),
        ("kokoro-onnx (free tier voices)", has("kokoro_onnx", py), "pip install kokoro-onnx soundfile"),
        ("chatterbox-tts (Hindi + cloning)", has("chatterbox", py), "setup_mac.sh"),
        ("supertonic (fast Hindi, CPU)", has("supertonic", py), "setup_mac.sh"),
        ("Stable Audio 3 MLX (music + SFX)", os.path.exists(os.path.join(HOME, "stable-audio-3", "optimized", "mlx", "sa3")), "setup_mac.sh"),
        ("FastVideo / FastMetal (Wan 2.2 5B video)", os.path.isdir(os.path.join(HOME, "FastMetal-5B-QAD")), "setup_mac.sh --video  (16 GB+)"),
    ]
    for label, ok, fix in checks:
        print(f"  {'✔' if ok else '○'} {label:44s}{'' if ok else '→ ' + fix}")

    print("\nWhat this machine should run (local tier):")
    if apple:
        print("  Voice   Chatterbox Multilingual v3 on MPS (Hindi, voice cloning); Supertonic 3 for fast drafts")
        print("  Music   Stable Audio 3 MLX: medium (fits 8 GB, ~5 s per 10 s clip on an M1), small-music for drafts")
        print("  SFX     Stable Audio 3 MLX small-sfx")
        if ram >= 16:
            print("  Video   FastMetal Wan 2.2 5B (text-to-video, 720p, ~3-8 min per clip on M3 [estimate])")
            print("          or Draw Things (free app, Wan 2.2 5B 6-bit, also image-to-video)")
        else:
            print("  Video   too little memory for local video: use the Colab notebook (colab/motion_kit_video.ipynb)")
            print("          or a Hugging Face ZeroGPU Space (5 GPU-minutes a day free)")
        if ram >= 36:
            print("          36 GB+: Wan 2.2 14B / LTX-2.3 in Draw Things or mlx-video are within reach")
    elif cuda:
        print("  NVIDIA GPU: see docs/research/free-open-models.md (Wan 2.2, LTX-2.5, H3 by VRAM)")
    else:
        print("  CPU only: free tier, Supertonic 3 voices, Stable Audio 3 small; video via Colab")
    print("\nNext: npm run produce -- specs/productions/<name>.json --tier local --run")


if __name__ == "__main__":
    main()
