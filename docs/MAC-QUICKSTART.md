# Make videos on a MacBook (M1–M4), step by step

## 1. Once: get the kit

```bash
brew install node ffmpeg python@3.11          # Homebrew: https://brew.sh
git clone https://github.com/vikasbanjare/motion-graphic && cd motion-graphic/motion-kit
npm install
pip3 install kokoro-onnx soundfile numpy      # free voices
npm run local:doctor                          # what this Mac can run
```

## 2. Free tier (needs nothing else)

```bash
npm run produce -- specs/productions/sarvam-samvaad.json --tier free
open out/sarvam-samvaad.mp4
```

Everything here is made on your Mac:
- the text, UI and logo scenes are drawn in code;
- every character gets its own Kokoro voice;
- the phone sounds and the music bed are synthesized.

There are no realistic people in this tier.

## 3. Local tier: better voices, music and SFX on your Mac (free, open models)

```bash
npm run local:setup                           # ~10 min once: Chatterbox, Supertonic, Stable Audio 3 (MLX)
npm run produce -- specs/productions/sarvam-samvaad.json --tier local --run
```

- **What `--run` does:** it writes `out/<name>.jobs.json` (each missing voice take, music track and shot), makes what your Mac can make, then renders.
- **Hindi lines:** made with Chatterbox. The first line of each character becomes that character's voice for the rest.
- **Music:** made with Stable Audio 3.
- **If an engine fails:** the runner says why and uses the next engine, ending with the free one.

Listen to the result. If a voice sounds worse than Kokoro, say so; your ear decides, not the leaderboard. To try another engine:
```bash
npm run produce -- specs/productions/sarvam-samvaad.json --tier local --run --voice supertonic
```

**Gated models:** if a download stops with 401 or 403, run `~/.motion-kit/venv/bin/hf auth login`, then accept the terms once on huggingface.co (Stable Audio 3).

## 4. Realistic shots (the grandmother clips)

Pick one way:

| Your Mac | Easiest | Also |
|---|---|---|
| 8 GB | **Colab:** open `motion-kit/colab/motion_kit_video.ipynb` in Google Colab, set the T4 GPU, upload `out/<name>.jobs.json`, download the zip, unzip it into `motion-kit/public/` | Hugging Face Space `Wan-AI/Wan-2.2-5B` (5 free GPU-minutes a day) |
| 16–24 GB | **Draw Things** (free Mac app): Wan 2.2 5B. Paste each prompt from `out/<name>.jobs.md` and save the clip at the path it gives | `npm run local:setup -- --video`, then `--run` makes clips with FastMetal (text-to-video, a few minutes each) |
| 36 GB+ | Draw Things with Wan 2.2 14B or LTX-2.3 | same |

Then run `npm run produce -- specs/productions/<name>.json --tier local`. Each clip replaces its code scene and is tagged "AI-generated".

## 5. Paid tools instead (optional)

To use **Higgsfield or Magnific**, connect them in Claude and use `--tier mcp`. Claude prices every job first and asks you before spending credits.
