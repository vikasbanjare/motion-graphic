# Local tier on an Apple Silicon Mac and free Colab (checked 2026-10-10)

How to run the open models from `free-open-models.md` on a **MacBook (M-series)**, and on **free Google Colab** for what a Mac can't do.
- **Install:** `tools/local/setup_mac.sh` installs these.
- **Run:** `tools/local/run_jobs.py` runs them, and `npm run produce -- … --tier local --run` drives both.

**Tags:**
- [C] means quoted from the official README, model card or source file.
- [L] is likely.
- [G] is a guess.
- UNVERIFIED means I could not confirm it.

**Nothing below has been run on a Mac by the author.** The dev container has no Mac, no GPU and no Hugging Face access, so the first run on the user's machine is the test.

## What runs where

| Model | Mac 8 GB | Mac 16–18 GB | Mac 36 GB+ | Colab T4 | Verdict |
|---|---|---|---|---|---|
| Chatterbox Multilingual v3 (MIT) | slow, OK | ✅ MPS | ✅ | ✅ | Main Hindi voice + cloning engine |
| Kokoro / kokoro-onnx (Apache-2.0) | ✅ | ✅ | ✅ | ✅ | Free tier, fastest |
| goonj-1-82M (Kokoro Hindi fine-tune) | ✅ CPU | ✅ | ✅ | ✅ | Hindi/Hinglish personas; needs espeak-ng; repo may be gated |
| Supertonic 3 (OpenRAIL-M) | ✅ | ✅ | ✅ | ✅ | Fast Hindi on CPU, 10 voices |
| VoxCPM2 (Apache-2.0) | ❌ | ⚠️ slower than real time | ✅ | ✅ | Best Hindi cloning reputation; slow on Mac |
| Stable Audio 3 small music/SFX | ✅ MLX | ✅ | ✅ | ✅ | SFX and draft music |
| Stable Audio 3 medium | ✅ MLX (3.8 GB peak) | ✅ | ✅ | ✅ (flash-attn) | Music beds; on Mac only via MLX |
| ACE-Step 1.5 (MIT) | ⚠️ | ✅ MLX | ✅ (XL) | ✅ | Instrumentals 10–600 s, Indian-style LoRA base |
| Wan 2.2 5B (FastMetal / mlx-video) | ❌ | ✅ ~3–8 min/clip [G] | ✅ ~2.5 min | ⚠️ slow | Mac text-to-video |
| Wan 2.2 I2V-A14B | ❌ | ❌ | ⚠️ 6-bit in Draw Things | ⚠️ Q4 GGUF | Needs 36 GB+ or an L4 |
| LTX-2.x / 2.5 | ❌ | ❌ | ⚠️ [G] | ❌ (older LTX-Video ✅) | Not a Mac route below 36 GB |
| Draw Things (Mac app) | ⚠️ images [L] | ✅ Wan 5B 6-bit | ✅ Wan 14B, LTX-2.3, H3 | n/a | Easiest free offline Mac video, with a GUI |
| LatentSync 1.5 | ❌ | ⚠️ | ⚠️ | ✅ (8 GB) | Lip-sync on Colab |
| InfiniteTalk | ❌ | ❌ | ❌ | ⚠️ marginal | Needs a paid GPU |
| HF ZeroGPU Spaces | — | — | — | — | 5 free GPU-minutes a day (free account) [C] |

## Voice

**Chatterbox Multilingual v3:** `pip install chatterbox-tts` (tested on Python 3.11) [C].
```python
from chatterbox.mtl_tts import ChatterboxMultilingualTTS
m = ChatterboxMultilingualTTS.from_pretrained(device="mps", t3_model="v3")   # omit t3_model -> legacy v2
wav = m.generate("नमस्ते, आप कैसे हैं?", language_id="hi", audio_prompt_path="ref_10s.wav",
                 exaggeration=0.5, cfg_weight=0.5)                             # m.sr = 24000
```
- **Device:** `"mps"` falls back to CPU when MPS is missing [C]. The repo's `example_for_mac.py` patches `torch.load` to `map_location="mps"`, and `run_jobs.py` copies that patch.
- **Cross-language references:** set `cfg_weight=0` when the reference clip is in another language [C].
- **Hindi pack:** `ResembleAI/Chatterbox-Multilingual-hi` has no documented loader in the pip package. `run_jobs.py` uses the main v3 model with `language_id="hi"`.
- **Free web demo:** the Space `ResembleAI/Chatterbox-Multilingual-TTS-hi`.

**Kokoro:**
- kokoro-onnx runs on CPU and is near real time on M1 [C]. This is the free tier.
- mlx-audio runs it on the Metal GPU (`mlx-community/Kokoro-82M-bf16`) [C].

**goonj-1-82M** (`BH-Builds/goonj-1-82M`) [C]:
- Files: PyTorch `kokoro_hindi_final.pth` (not ONNX) and 15 voicepacks: `hi_atul`, `hi_meera`, `hi_ravi`, `hi_shivani`, plus 10 Indian-English voices and `bed_hindi`.
- Text goes through `misaki` espeak G2P (`brew install espeak-ng`).
- Probably loadable with `KPipeline(lang_code='h', model=KModel(...))` [L]. Not wired into `run_jobs.py` yet; it's the next Hindi voice to try by ear.

**Supertonic 3:** `pip install supertonic` [C].
```python
from supertonic import TTS
tts = TTS(auto_download=True); style = tts.get_voice_style(voice_name="F1")   # M1-M5, F1-F5
wav, dur = tts.synthesize("नमस्ते दुनिया", voice_style=style, lang="hi", total_steps=8); tts.save_audio(wav, "out.wav")
```

**VoxCPM2:** `pip install voxcpm`, then `VoxCPM.from_pretrained("openbmb/VoxCPM2", device="mps", optimize=False)` [C].
- On an M4 Pro the GGUF route runs at RTF ≈ 1.76, slower than real time [C].
- Use it on Colab or on 36 GB+ Macs.

## Music and SFX

**Stable Audio 3** comes from a new repo, `Stability-AI/stable-audio-3`, not diffusers [C].
- **Mac route:** the official **MLX runtime**.
  - On an M1 with 8 GB, 10 s of audio takes about 1 s on the small models (1.6 GB peak) and about 5 s on medium (3.8 GB peak).
  - "8 GB M1 is fine for everything." An M3 is estimated at 1.5–2× faster [C].
```bash
curl -LsSf https://raw.githubusercontent.com/Stability-AI/stable-audio-3/main/optimized/mlx/bootstrap.sh | bash
./sa3 --prompt "footsteps on gravel" --dit sm-sfx  --decoder same-s --seconds 7  --out steps.wav
./sa3 --prompt "lofi house loop"     --dit sm-music --decoder same-s --seconds 30 --out lofi.wav
./sa3 --prompt "cinematic piano"     --dit medium  --decoder same-l --seconds 30 --out piano.wav
```
- **Output:** stereo, 44.1 kHz.
- **Licence:** Stability Community License, free under $1M yearly revenue [L]. The Hugging Face repos are gated (accept the terms once), and the bundled T5Gemma encoder is under the Gemma terms [C].
- **`setup_mac.sh`:** clones the repo and runs `optimized/mlx/bootstrap.sh` inside it. If that bootstrap expects to be piped from curl instead, run the curl line above by hand [UNVERIFIED].

**ACE-Step 1.5:** `git clone https://github.com/ACE-Step/ACE-Step-1.5 && uv sync && ./start_api_server_macos.sh` [C].
- The MLX backend is chosen automatically.
- **API:** `POST :8001/release_task` with `{"prompt", "lyrics": "[Instrumental]", "audio_duration": 10-600, "inference_steps": 8}`, then `/query_result`.
- **Memory:** 4–6 GB.
- Not wired into `run_jobs.py` yet.

## Video on the Mac

**FastMetal-5B-QAD** (FastVideo, MLX, INT8, 3 steps) [C]:
- Speed for 1280×704 at 81 frames: **151 s on an M4 Max 36 GB (9.3 GiB peak), or 47 s with `--fast`**; 200 s on an M5 Air 24 GB.
- Needs 16 GB+.
- **Text-to-video only for now**; image-to-video is "next".
- `setup_mac.sh --video` installs it, and `run_jobs.py` runs it.
- The script's output location isn't documented, so the runner takes the newest MP4 it writes.

**mlx-video (Blaizzy)** [C]:
- Runs Wan 2.2 T2V-14B, TI2V-5B and I2V-14B (with `--image`), and LTX-2/2.3.
- Install: `pip install git+https://github.com/Blaizzy/mlx-video.git`.

**Avoid:**
- **ComfyUI on MPS:** open bug #16644 corrupts every frame after the first for Wan 2.2 5B [C].
- **Diffusers on MPS:** works in principle, but 20 GB of F32 weights makes it very slow [L].

**Draw Things** (free on the Mac App Store, offline) [C]:
- Video models: Wan 2.2 14B/5B (6-bit SVDQuant), LTX-2/2.3 and MiniMax H3.
- On 8/16/18 GB Macs it loads weights on demand.
- It has an HTTP/gRPC API ("Bridge Mode").
- This is the **easiest Mac video route** and also does **image-to-video**, which FastMetal can't yet.

## Free Colab (T4 16 GB, 12.7 GB RAM)

**Wan 2.2 TI2V-5B** (`colab/motion_kit_video.ipynb`):
- Settings: diffusers, fp16, CPU offload, 480p.
- About 15–40 minutes per 5 s clip [G]. The model card asks for 24 GB [C].
- Community notebooks: `Isi-dev/Google-Colab_Notebooks` (Wan 2.2 Lightx2v text-to-video, image-to-video and first-last-frame; Wan2.1 GGUF on a free T4) and `theelderemo/wan2.2-google-colab`.

**LTX-Video:**
- The older 2B and 13B-distilled GGUF models run on a T4 [C].
- LTX-2.5 (22B) does not.

**Lip-sync:**
- **LatentSync 1.5** needs 8 GB, so it fits a T4. Version 1.6 needs 18 GB [C].
- **InfiniteTalk** on a free T4 is marginal [L].

**ZeroGPU Spaces** (5 free minutes a day):
- `KingNish/wan2-2-fast`
- `Wan-AI/Wan-2.2-5B`
- `zerogpu-aoti/wan2-2-fp8da-aoti-faster` (14B image-to-video)
- `stabilityai/stable-audio-3`

Whether each Space is up today is UNVERIFIED.

## Open questions (resolve on first real run)

- Whether the Chatterbox Hindi pack can be loaded through the pip package.
- The return type of `stable_audio_3`'s `generate()` (the runner uses the MLX CLI instead).
- Whether the ACE-Step Python API runs on MPS.
- Real M3 timings (only M1, M4 and M5 numbers are published).
- Wan 5B time on a T4.
- FastMetal's output path.

## Sources

- github.com/resemble-ai/chatterbox (`src/chatterbox/mtl_tts.py`, `example_for_mac.py`) · huggingface.co/ResembleAI/Chatterbox-Multilingual-hi
- github.com/thewh1teagle/kokoro-onnx · github.com/Blaizzy/mlx-audio · github.com/hexgrad/kokoro · huggingface.co/BH-Builds/goonj-1-82M
- huggingface.co/Supertone/supertonic-3 · github.com/supertone-inc/supertonic-py · github.com/OpenBMB/VoxCPM
- github.com/Stability-AI/stable-audio-3 (`optimized/mlx/README.md`, `docs/workflows/inference.md`) · huggingface.co/stabilityai/stable-audio-3-small-sfx
- github.com/ace-step/ACE-Step-1.5 (`docs/en/INSTALL.md`, `API.md`, `INFERENCE.md`)
- haoailab.com/blogs/fastmetal · github.com/hao-ai-lab/FastVideo · github.com/Blaizzy/mlx-video · github.com/comfy-org/ComfyUI/issues/16644
- drawthings.ai/downloads · wiki.drawthings.ai/wiki/Wan_2.2
- huggingface.co/Wan-AI/Wan2.2-TI2V-5B-Diffusers · github.com/Isi-dev/Google-Colab_Notebooks · github.com/theelderemo/wan2.2-google-colab
- huggingface.co/ByteDance/LatentSync-1.6 · github.com/sruckh/InfiniteTalk-Google-Collab · huggingface.co/docs/hub/spaces-zerogpu
