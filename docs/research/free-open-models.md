# Free and open models for video, voice, music and SFX (checked 2026-10-10)

Which open-weight models to run for the **local** tier (`npm run produce -- … --tier local`), chosen
by output quality and licence, **not by GitHub stars**. Evidence order:
1. Blind human-preference arenas: LMArena, Artificial Analysis (AA), Music Arena.
2. Published listening tests and benchmarks.
3. Repeated hands-on reports with samples.

Tags: [Certain] means a cited source states it, [Likely] is a strong inference, [Guessing] fills a gap.

**What these picks rest on:**
- They come from web research on 2026-10-10. Hugging Face, Artificial Analysis and arXiv were blocked from the research sandbox, so some numbers come from search snippets or secondary write-ups. Each one is marked.
- Nothing here was run in this repo's container, which has no GPU and no Hugging Face access.
- Listen to and watch samples before committing to a model. Re-check the licence on the model card before client work.

## The decision table

| Job | Free tier (Claude + CPU, this repo) | Local tier pick (open weights) | Runner-up | Paid MCP tier |
|---|---|---|---|---|
| Realistic text-to-video | not possible; code scenes instead | **MiniMax H3** (outside US/EU/UK/KR) | **LTX-2.5**, or **Wan 2.2 A14B** for an Apache licence | Magnific `bytedance-seedance-pro-2.5`, Higgsfield `seedance_2_5` / `kling3_0` |
| Image-to-video | — | **H3 FL2VA** | **Wan 2.2 I2V-A14B** | same |
| First-last frame | — | **Wan 2.2 FLF2V** (ComfyUI) | H3 FL2VA, LTX keyframes | Magnific `kling-25`, Higgsfield `minimax_h3` |
| Video with sound | — | **H3** (15 s, stereo) | **LTX-2.5** | Seedance 2.5 `withSoundEffects` |
| Lip-sync / talking head | — | **InfiniteTalk** (Apache-2.0) | LongCat-Video-Avatar 1.5 (MIT); LatentSync 1.6 to re-sync existing footage | Magnific `video_speak` |
| Fast drafts / low VRAM | — | **Wan 2.2 TI2V-5B** (~8 GB) | LTX-2.5 distilled (GGUF on 16 GB) | cheap model drafts (router `--budget low`) |
| Hindi / Hinglish voice | Kokoro `hf_alpha` / `hf_beta` (weak) via `tools/cast_voices.py` | **Chatterbox Multilingual V3** (MIT) | **VoxCPM2** (Apache-2.0), Veena, Indic Parler-TTS | Magnific `audio_tts`, Higgsfield `seed_audio` |
| Hindi voice, CPU only | Kokoro | **goonj-1-82M** (Kokoro fine-tune, Apache-2.0, no published evals) | Supertonic-3 (ONNX, OpenRAIL-M) | — |
| English narrator | **Kokoro** (AA open Elo 1065, top commercially usable) | Kokoro | Chatterbox | ElevenLabs / MCP TTS |
| Consistent character voice | one Kokoro voice per character | VoxCPM2 or Chatterbox with the same 10 s reference and a fixed seed | — | Higgsfield voice elements |
| Instrumental music bed | `tools/music_bed.py` (synth, 4 moods) | **Stable Audio 3 Medium** | **Stable Audio 3 Small** (CPU) | Magnific `audio_music_generate` |
| Song with vocals | — | **MiniMax Music 3** (credit "MiniMax-Music3" in the product) | ACE-Step 1.5 / XL (MIT) | Magnific `audio_music_generate` |
| Text-to-SFX | `tools/sfx_synth.py` (17 effects) | **Stable Audio 3 Medium** | Stable Audio 3 Small SFX (CPU) | Magnific `audio_sfx_generate` |
| Video-to-SFX (Foley) | — | **HunyuanVideo-Foley XL** (outside EU/UK/KR) | none commercial | Magnific `video_soundfx` |

## Video

**Arena standings (LMArena snapshot 2026-10-07; AA open-weights boards):**
- **MiniMax H3** is the highest open model on LMArena text-to-video: #8 overall, 1460 [Certain]. It is also #1 on AA open text-to-video (1137, against LTX-2.5 Fast at 946) [Certain, snippet]. On AA open image-to-video the order is H3 1181, MAGI-2 1093, LTX-2.5 Fast 1038 [Certain, snippet].
- **The older open models are roughly tied on LMArena text-to-video:** Kandinsky 5 Pro 1175, HunyuanVideo 1.5 1169, LTX-2 1154, Wan 2.2 1132. Their error bars (±8–21) overlap [Certain].
- **On LMArena image-to-video**, Wan 2.2 is at 1170 and LTX-2 at 1159 [Certain].
- **The H3 arena entry may be the hosted API version,** not the 768p local weights [Guessing].

| Model | Released | Licence (commercial?) | Realistic VRAM | Output | Notes |
|---|---|---|---|---|---|
| MiniMax H3 (FL2VA / Ref2VA) | weights 2026-08 | H3 Community: commercial use under $20M revenue with attribution. **Local use is barred in the US, EU, UK and South Korea, including outputs** [Certain, 3rd-party] | 24 GB comfortable (26.9 GB peak with NVFP4 on a 5090) | 768p local (2K is API-only), 4–15 s, sound | Native ComfyUI support. Ref2VA takes 9 reference images, but quality is "noticeably worse" than FL2VA |
| LTX-2.5 (Lightricks, 22B) | 2026-08 | LTX-2.x Community: free under $10M revenue | official 32 GB; 4090 with int8; 16 GB with GGUF | up to 4K, sound, keyframes, Retake, Dub-It | Distilled is the fast path. One tester says it follows prompts worse than Wan 2.2 |
| Wan 2.2 (T2V/I2V-A14B, TI2V-5B, S2V, Animate) | 2025-07 to 09 | **Apache-2.0** | 5B: about 8 GB; 14B: 24 GB with offload | 480/720p, about 5 s | The safest licence. Mature first-last-frame workflows. Lightning LoRAs make it fast. Animate and S2V are for characters and speech |
| HunyuanVideo 1.5 (8.3B) | 2025-11 | Tencent Community; **excludes EU, UK and KR** | 14 GB with offload | 720p | Tied with LTX-2 and Wan 2.2 on the arena |
| Kandinsky 6 Pro 29B / Lite 3B | 2026-10-06 | MIT [Certain, 3rd-party] | Lite: about 437 s per clip on a 4090 | 5 s, sound with lip-sync | Too new for arena scores |
| InfiniteTalk | 2025-08 | Apache-2.0 | low-VRAM mode, Wan2GP | long clips, several speakers | Best open talking-head option. No arena exists for lip-sync |
| LongCat-Video-Avatar 1.5 | 2026-05 | MIT | INT8 option | minutes-long clips, several speakers | |
| LatentSync 1.6 | 2025-06 | Apache-2.0 [Likely] | about 18 GB | re-syncs a 512 px face crop | Fixes the mouth on existing footage |

**Avoid:**
- **Wan 2.5–3.0 and FLUX 3 Video:** not open weights.
- **MAGI-2:** needs 8 Hopper GPUs.
- **Mochi 1:** last on the arena (1007).
- **Wav2Lip:** its training data is non-commercial.
- **FramePack:** about 56 minutes for 5 s on an 8 GB laptop.
- **CogVideoX, Open-Sora 2, Step-Video, SkyReels, MAGI-1, Hallo3:** not on current arena boards, so treat them as superseded [Likely].

**Consistent characters:** H3 Ref2VA, or Wan 2.2 with a character LoRA or Wan2.2-Animate [Likely].

### The `hugging-apps/t3-video-4k` Space (asked about by the user)

**What it is:** a ZeroGPU demo of **T3-Video**, an ICML 2026 research method by Jiangning Zhang et al. (weights under APRIL-AIGC) [Certain].
- The method is an attention trick that makes native 4K (2176×3840) generation about 10× faster without retraining [Certain].
- It runs on **Wan2.1-T2V-1.3B**, Wan's smallest model (a Wan2.2-5B variant also exists) [Certain].
- The only quality numbers are on the authors' own "4K-VBench". It has no arena scores [Certain].
- The repo's to-do list still shows text-to-video weights as unreleased [Certain].
- **Licence:** Apache-2.0 plus the Wan licence [Certain].
- **Usage limit:** free ZeroGPU accounts get about 5 GPU-minutes a day [Certain], so one 4K render probably uses most of that [Likely].
- I couldn't confirm who runs the `hugging-apps` account.

**Verdict:** the pixels are sharp, but motion, faces and prompt-following are at the level of a 1.3B model [Likely]. For ads, generate with H3, LTX-2.5 or Wan 2.2 and upscale afterwards.

## Voice (TTS)

**There is no blind arena for Hindi.**
- The AA and Hugging Face boards are mostly English.
- The Hindi evidence comes from model cards and one 30-sentence Hinglish test by Harshal Singh (May 2026).
- Automatic scores mislead for Hindi: IndicF5 scored 3.2–3.8 on UTMOS but 1.7–2.4 with native listeners [Certain].
- **Pick by ear:** run a 10-line Hindi/Hinglish ad script through Chatterbox-hi, VoxCPM2, Veena, Supertonic-3 and goonj.

**Hinglish tip:** convert Roman Hinglish to Devanagari (IndicXlit) before synthesis. In the Hinglish test this lifted IndicF5 from 2.13 to 4.70 out of 5 [Certain]. Expecting the same gain for other models is [Likely]. The kit's cast file already separates `speak` (Devanagari for the voice) from `say` (what is shown on screen).

| Model | Licence | Hindi? | Cloning | Hardware | Evidence |
|---|---|---|---|---|---|
| Kokoro-82M | Apache-2.0 | weak (about C grade) | no | CPU | AA open Elo 1065, the top commercially usable English model |
| Chatterbox Multilingual V3 | MIT, outputs watermarked | yes, plus a Hindi pack | 10 s reference | GPU (about 4 GB [Likely]) | AA 1028 (English). Exaggeration control. Set `cfg_weight=0` to stop accent bleed across languages |
| VoxCPM2 | Apache-2.0 | yes | yes, plus voice design from a text description | about 8 GB (RTF 0.3 on a 4090) | Hindi cloning called "strong" by one reviewer |
| Indic Parler-TTS | Apache-2.0 | 21 Indian languages | no (voice described in text) | CPU, slow | Hindi NSS 84.8; scored 3.40 in the Hinglish test |
| Veena | Apache-2.0 | Hindi, English, code-mixed | no (4 voices) | GPU, 3B | self-reported MOS 4.2 |
| Supertonic-3 | OpenRAIL-M | yes | voice builder | CPU, ONNX | self-reported WER |
| goonj-1-82M | Apache-2.0 | Hindi, Indian English, Hinglish (15 voices) | no | CPU | no evals. A Kokoro fine-tune, so possibly close to a drop-in [Guessing] |
| MOSS-TTSD | Apache-2.0 [Likely] | yes | yes | 7–8B | generates whole dialogues; prosody uneven |

**Licence traps:**
- Non-commercial: Fish Audio S2 Pro (AA 1116), Voxtral TTS, Breeze TTS 2, OmniVoice, Rumik-OSS-1 and F5-TTS (CC-BY-NC). XTTS-v2 is under the Coqui Public Model License, also non-commercial.
- Higgs TTS 3: its creator grant covers only your own channels and requires a visible credit, so client ads are probably not covered [Likely].
- IndicF5: no licence is stated, and 21 of 30 Hinglish lines came out truncated or silent.
- No Hindi: Qwen3-TTS, VibeVoice (also research-only), Dia, Kyutai.
- Sarvam's Bulbul is API-only.

## Music and SFX

| Model | Released | Licence | Max length | Hardware | Evidence |
|---|---|---|---|---|---|
| Stable Audio 3 Medium | 2026-05 | Stability Community: free under $1M yearly revenue [Likely] | 6 min 20 s | 6.5 GB | Paper's listening test: music quality 4.20 against ACE-Step 1.5 XL-turbo at 3.35. SFX FAD 0.369, best among open models. Trained on licensed AudioSparx and CC Freesound audio. ComfyUI day 0 |
| Stable Audio 3 Small / Small SFX (459M) | 2026-05 | same | 2 min | **CPU**: 30 s of audio in 1.7 s on an M4 | Quality 3.20 (music), FAD 0.395 (SFX) |
| MiniMax Music 3 (about 11B) | 2026-08 | Community licence: commercial use allowed, but "MiniMax-Music3" must be displayed prominently; written authorisation above $20M revenue | 5 min | under 24 GB, about 8 GB with streaming | Reported as the top open model on AA Music Arena v1.1 [Likely]. One Hindi rap test worked [Guessing] |
| ACE-Step 1.5 / XL | 2026 | MIT; training data reportedly licensed or synthetic | 10 min | under 4 GB (16 GB+ for XL's planner) | Quality 3.35. Audible "metallic shimmer". Best base for an Indian-style LoRA [Likely] |
| HunyuanVideo-Foley XL | 2025-09 | Tencent Community; **excludes EU, UK and KR**; outputs may not train other models | clip length | 16 GB (8 GB with offload) | Self-reported quality 4.14 against MMAudio's 3.58 |

**Caveats:**
- Stable Audio 3's lead comes from Stability's own paper.
- No independent blind test compares Stable Audio 3, ACE-Step 1.5 and MiniMax Music 3.

**Avoid:**
- **Non-commercial:** MusicGen, AudioCraft and MAGNeT (CC-BY-NC weights); LeVo 2 (best-sounding, but non-commercial); Khala; MMAudio (CC-BY-NC weights); ControlFoley; Sony Woosh; PrismAudio/ThinkSound; TangoFlux.
- **YuE:** about 12× slower than real time.
- **HeartMuLa:** every style comes out as generic pop.
- **Stable Audio Open 1.0:** superseded.
- **Magenta RT:** follows prompts poorly.

## How this maps onto the kit

- **Free tier:** Kokoro voices (`npm run voice --engine kokoro`, `tools/cast_voices.py`), synthesized SFX (`tools/sfx_synth.py`), synthesized music (`tools/music_bed.py`) and code scenes for every shot. Runs anywhere with Node and Python.
- **Local tier:** `npm run produce -- specs/x.json --tier local` writes a job sheet with the pick above for each missing plate, voice line and music bed. Run the models in ComfyUI, Wan2GP or a Colab notebook, save the files where the sheet says, and run `produce` again.
  - The cast file takes any external take per beat: `{"file": "voice/takes/agent-1.wav"}`.
  - SFX events take `{"file": "sfx/x.wav"}`.
- **MCP tier:** the same job sheet names the Higgsfield or Magnific tool to use. Claude generates each item only after a cost preflight and the user's yes, and the result URL goes into the production file.

## Sources

**Video:**
- arena.ai snapshot: github.com/oolong-tea-2026/arena-ai-leaderboards (data/2026-10-07)
- artificialanalysis.ai/video/leaderboard/text-to-video/open-weights · …/image-to-video/open-weights
- comfyui-wiki.com/en/models/minimax/minimax-h3 · techtimes.com/articles/322904 (H3 territory exclusion) · ai-muninn.com/en/blog/minimax-h3-nvfp4-rtx5090
- github.com/Lightricks/LTX-2 · ltxworkflow.com/guide/ltx-2-5-vram-requirements · innfactory.ai/en/ai-models/lightricks-ltx
- github.com/Wan-Video/Wan2.2 · huggingface.co/Kijai/LTX2.3_comfy/discussions/17
- chatforest.com/reviews/hunyuanvideo-tencent-open-source-video-generation · comfyui-wiki.com/en/news/2026-10-06-kandinsky-6-0
- github.com/MeiGen-AI/InfiniteTalk · github.com/meituan-longcat/LongCat-Video · github.com/bytedance/LatentSync
- github.com/zhangzjn/T3-Video · arxiv.org/html/2512.13492v1 · huggingface.co/docs/hub/spaces-zerogpu
- github.com/SandAI-org/MAGI-2-preview

**Voice:**
- artificialanalysis.ai/text-to-speech/leaderboard/provider-voice/open-weights · huggingface.co/blog/open-tts-leaderboard
- harrrshall.github.io/hinglish-tts (Hinglish test)
- Model cards: huggingface.co/ResembleAI/chatterbox · openbmb/VoxCPM2 · ai4bharat/indic-parler-tts · ai4bharat/IndicF5 · maya-research/Veena · Supertone/supertonic-3 · BH-Builds/goonj-1-82M · nvidia/magpie_tts_multilingual_357m · OpenMOSS-Team/MOSS-TTS-v1.5 · bosonai/higgs-tts-3-4b · fishaudio/s2-pro · mistralai/Voxtral-4B-TTS-2603
- offlinetts.com/voice/hf-alpha (Kokoro Hindi grade)

**Music / SFX:**
- arxiv.org/pdf/2605.17991 (Stable Audio 3 paper) · stability.ai/news-updates/meet-stable-audio-3… · huggingface.co/stabilityai/stable-audio-3-small-sfx · blog.comfy.org/p/stable-audio-3-day-0-support
- huggingface.co/MiniMaxAI/MiniMax-Music3/blob/main/LICENSE · alphasignal.ai/news/artificial-analysis-music-arena-v1-1…
- github.com/ace-step/ACE-Step-1.5 · it-jim.com/blog/best-open-source-ai-music-generator · gclef-cmu.org/blog/posts/250919_MusicArena
- github.com/Tencent-Hunyuan/HunyuanVideo-Foley · github.com/hkchengrex/MMAudio · arxiv.org/html/2511.13219v2 (FoleyBench)
- github.com/tencent-ailab/SongGeneration (LeVo licence) · huggingface.co/declare-lab/TangoFlux-base
