"""Run a production's job file on this machine with open models (the local tier).

    ~/.motion-kit/venv/bin/python tools/local/run_jobs.py out/<name>.jobs.json [--only voice,music,video]
                                                         [--voice chatterbox|supertonic|kokoro]
                                                         [--music sa3|sa3-small|music_bed] [--force]

`npm run produce -- … --tier local` writes the job file; `--run` on produce calls this script, then
renders. Each finished job is saved at its `out` path under public/, which is where produce looks.

Engines (picks and setup: docs/research/local-mac-colab.md, installed by tools/local/setup_mac.sh):
  voice  chatterbox  Chatterbox Multilingual v3 (MIT): Hindi + 22 languages, MPS/CUDA/CPU. The first
                     take of each character becomes that character's reference voice, so every later
                     line is cloned from it: one consistent voice per character.
         supertonic  Supertonic 3 (OpenRAIL-M): fast ONNX on CPU, Hindi, 10 built-in voices.
         kokoro      Kokoro (Apache-2.0): the free-tier voices, always available as a fallback.
  music  sa3         Stable Audio 3 medium via the official MLX runtime (Mac), stereo 44.1 kHz.
         sa3-small   Stable Audio 3 small-music (faster drafts).
         music_bed   tools/music_bed.py, synthesized here (fallback, no model).
  video  fastmetal   Wan 2.2 5B (FastMetal, MLX, text-to-video) on a 16 GB+ Mac.
         otherwise   prints the Draw Things / Colab / ZeroGPU route for each clip.

Nothing here has been run on a Mac by its author (the dev container has no Mac and no Hugging Face
access): the first run is the test. Failures fall back to the next engine and say why.
"""

import argparse
import glob
import json
import os
import subprocess
import sys
import time

KIT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PUB = os.path.join(KIT, "public")
HOME = os.path.expanduser("~/.motion-kit")
SA3_DIR = os.path.join(HOME, "stable-audio-3", "optimized", "mlx")
FASTVIDEO = os.path.join(HOME, "FastVideo")
FASTMETAL = os.path.join(HOME, "FastMetal-5B-QAD")


def log(msg):
    print(msg, flush=True)


def device():
    try:
        import torch

        if torch.backends.mps.is_available():
            return "mps"
        if torch.cuda.is_available():
            return "cuda"
    except Exception:
        pass
    return "cpu"


def write_wav(path, audio, sr):
    import numpy as np
    import soundfile as sf

    os.makedirs(os.path.dirname(path), exist_ok=True)
    sf.write(path, np.asarray(audio, dtype="float32").reshape(-1), sr)


# ---- voice ----------------------------------------------------------------------------------

class Chatterbox:
    name = "chatterbox"

    def __init__(self):
        import torch
        from chatterbox.mtl_tts import ChatterboxMultilingualTTS

        dev = device()
        if dev == "mps":
            # The repo's example_for_mac.py: checkpoints saved on CUDA must load onto MPS.
            _load = torch.load
            torch.load = lambda *a, **k: _load(*a, **{**k, "map_location": k.get("map_location", torch.device("mps"))})
        try:
            self.m = ChatterboxMultilingualTTS.from_pretrained(device=dev, t3_model="v3")
        except TypeError:  # older package without the v3 switch
            self.m = ChatterboxMultilingualTTS.from_pretrained(device=dev)
        self.torch = torch
        log(f"  chatterbox loaded on {dev}")

    def say(self, job, out, ref):
        self.torch.manual_seed(job.get("seed", 7))
        kw = dict(language_id=job.get("lang", "hi"), exaggeration=job.get("exaggeration", 0.5), cfg_weight=job.get("cfg_weight", 0.5))
        if ref:
            kw["audio_prompt_path"] = ref
        wav = self.m.generate(job["text"], **kw)
        write_wav(out, wav.squeeze().cpu().numpy(), self.m.sr)


class Supertonic:
    name = "supertonic"

    def __init__(self):
        from supertonic import TTS

        self.tts = TTS(auto_download=True)

    def say(self, job, out, ref):
        style = self.tts.get_voice_style(voice_name=job.get("supertonicVoice", "F1"))
        wav, _ = self.tts.synthesize(job["text"], voice_style=style, lang=job.get("lang", "hi"), total_steps=10, speed=1.0)
        os.makedirs(os.path.dirname(out), exist_ok=True)
        self.tts.save_audio(wav, out)


class KokoroVoice:
    name = "kokoro"

    def __init__(self):
        from kokoro_onnx import Kokoro

        d = os.path.join(os.path.expanduser("~"), ".cache", "motion-kit", "kokoro")
        self.k = Kokoro(os.path.join(d, "kokoro-v1.0.int8.onnx"), os.path.join(d, "voices-v1.0.bin"))

    def say(self, job, out, ref):
        hi = job.get("lang", "en") == "hi"
        voice = job.get("kokoroVoice") or ("hf_alpha" if hi else "af_heart")
        audio, sr = self.k.create(job["text"], voice=voice, speed=1.0, lang="hi" if hi else "en-us")
        write_wav(out, audio, sr)


VOICES = {"chatterbox": Chatterbox, "supertonic": Supertonic, "kokoro": KokoroVoice}


def run_voices(jobs, video, prefer, force):
    order = [prefer] + [v for v in ("chatterbox", "supertonic", "kokoro") if v != prefer]
    engine = None
    for name in order:
        try:
            engine = VOICES[name]()
            break
        except Exception as e:
            log(f"  {name} unavailable ({type(e).__name__}: {str(e)[:120]}), trying the next engine")
    if not engine:
        log("  ✖ no voice engine available")
        return
    refs = {}
    for job in jobs:
        out = os.path.join(PUB, job["out"])
        if os.path.exists(out) and not force:
            log(f"  · {job['id']} exists")
            if job.get("character"):
                refs.setdefault(job["character"], out)
            continue
        ch = job.get("character")
        ref = os.path.join(PUB, job["ref"]) if job.get("ref") else refs.get(ch)
        t = time.time()
        engine.say(job, out, ref)
        if ch and ch not in refs:
            refs[ch] = out  # first take of a character = its voice from now on
        log(f"  ✔ {job['id']} ({engine.name}{', cloned from ' + os.path.basename(ref) if ref and engine.name == 'chatterbox' else ''}) {time.time() - t:.1f}s → public/{job['out']}")


# ---- music ----------------------------------------------------------------------------------

def run_music(jobs, prefer, force):
    for job in jobs:
        out = os.path.join(PUB, job["out"])
        if os.path.exists(out) and not force:
            log(f"  · {job['id']} exists")
            continue
        secs = int(job.get("seconds") or 30)
        os.makedirs(os.path.dirname(out), exist_ok=True)
        tried = []
        for eng in [prefer] + [e for e in ("sa3", "sa3-small", "music_bed") if e != prefer]:
            tried.append(eng)
            if eng.startswith("sa3"):
                if not os.path.exists(os.path.join(SA3_DIR, "sa3")):
                    continue
                dit, dec = ("medium", "same-l") if eng == "sa3" else ("sm-music", "same-s")
                r = subprocess.run(["./sa3", "--prompt", job["prompt"], "--dit", dit, "--decoder", dec, "--seconds", str(secs), "--out", out], cwd=SA3_DIR)
                if r.returncode == 0 and os.path.exists(out):
                    log(f"  ✔ music ({eng}, {secs}s) → public/{job['out']}")
                    break
                log(f"  {eng} failed (exit {r.returncode}), trying the next engine")
            else:
                mood = next((m for m in ("warm", "tech", "tense", "calm") if m in job["prompt"].lower()), "calm")
                if "indian" in job["prompt"].lower() or "tabla" in job["prompt"].lower():
                    mood = "warm"
                subprocess.run([sys.executable, "-I", os.path.join(KIT, "tools", "music_bed.py"), "--mood", mood, "--seconds", str(secs), "--out", out], check=True)
                log(f"  ✔ music (music_bed {mood}, synthesized stand-in) → public/{job['out']}")
                break
        else:
            log(f"  ✖ music: no engine worked ({', '.join(tried)})")


# ---- video ----------------------------------------------------------------------------------

def size_for(aspect):
    # FastMetal's documented size is 1280x704 (16:9); portrait swaps it, square uses 704x704.
    return {"16:9": (704, 1280), "9:16": (1280, 704), "1:1": (704, 704), "4:5": (880, 704)}.get(aspect, (704, 1280))


def run_video(jobs, force):
    ok = os.path.isdir(FASTMETAL) and os.path.isdir(FASTVIDEO)
    for job in jobs:
        out = os.path.join(PUB, job["out"])
        if os.path.exists(out) and not force:
            log(f"  · {job['id']} exists")
            continue
        if job["type"] != "video" or not ok or job.get("from"):
            why = "image plate" if job["type"] != "video" else "starts from a still (FastMetal is text-to-video only)" if job.get("from") else "FastMetal not installed (setup_mac.sh --video, 16 GB+)"
            log(f"  ○ {job['id']}: {why}. Make it in Draw Things (Wan 2.2 5B) or colab/motion_kit_video.ipynb, save as public/{job['out']}")
            continue
        h, w = size_for(job.get("aspect", "9:16"))
        frames = min(121, int(job.get("seconds", 5) * 24) // 4 * 4 + 1)
        start = time.time()
        py = os.path.join(FASTVIDEO, ".venv", "bin", "python")
        cmd = [py, "examples/inference/basic/mlx_wan22_generate.py", "--mlx-checkpoint", FASTMETAL, "--text-encoder-root", FASTMETAL,
               "--vae-root", os.path.join(FASTMETAL, "vae"), "--height", str(h), "--width", str(w), "--num-frames", str(frames), "--prompt", job["prompt"]]
        log(f"  … {job['id']}: Wan 2.2 5B {w}x{h}, {frames} frames (several minutes)")
        r = subprocess.run(cmd, cwd=FASTVIDEO)
        # The script's output location is not documented: take the newest video it wrote.
        made = [p for p in glob.glob(os.path.join(FASTVIDEO, "**", "*.mp4"), recursive=True) if os.path.getmtime(p) > start]
        if r.returncode == 0 and made:
            os.makedirs(os.path.dirname(out), exist_ok=True)
            os.replace(max(made, key=os.path.getmtime), out)
            log(f"  ✔ {job['id']} {time.time() - start:.0f}s → public/{job['out']}")
        else:
            log(f"  ✖ {job['id']}: FastMetal exit {r.returncode}, no video found. Use Draw Things or Colab for this clip.")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("jobs")
    ap.add_argument("--only", default="voice,music,video")
    ap.add_argument("--voice", default="chatterbox", choices=list(VOICES))
    ap.add_argument("--music", default="sa3", choices=["sa3", "sa3-small", "music_bed"])
    ap.add_argument("--force", action="store_true")
    a = ap.parse_args()
    doc = json.load(open(a.jobs))
    jobs, only = doc["jobs"], set(a.only.split(","))
    log(f"Local jobs for {doc['video']}: {len(jobs)}")
    by = lambda *t: [j for j in jobs if j["type"] in t]
    if "voice" in only and by("voice"):
        log("Voice")
        run_voices(by("voice"), doc["video"], a.voice, a.force)
    if "music" in only and by("music"):
        log("Music")
        run_music(by("music"), a.music, a.force)
    if "video" in only and by("video", "image"):
        log("Video")
        run_video(by("video", "image"), a.force)


if __name__ == "__main__":
    main()
