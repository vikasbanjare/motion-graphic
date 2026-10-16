# Voice-sync pipeline research brief (checked 2026-10-07)

**How this was checked.** WebFetch was blocked for elevenlabs.io, google.dev and most vendor sites. ElevenLabs API shapes were read from the official `elevenlabs-js` SDK source, which is generated from their OpenAPI spec. Remotion signatures were read from `remotion-dev/remotion@main`, whose package.json is **4.0.534**, so they match your version. Prices and plan details come from web search snippets that quote vendor pages. Anything marked [unverified] could not be confirmed from a primary source.

---

## 1. ElevenLabs Text-to-Speech with timestamps

**Endpoint.** `POST /v1/text-to-speech/{voice_id}/with-timestamps`. `output_format` is a query parameter ([Client.ts](https://github.com/elevenlabs/elevenlabs-js/blob/main/src/api/resources/textToSpeech/client/Client.ts)). There is also a streaming version at `/stream/with-timestamps` and a dialogue version at `/v1/text-to-dialogue/with-timestamps` ([docs](https://elevenlabs.io/docs/api-reference/streaming-with-timestamps)).

**Request body** ([BodyTextToSpeechFullWithTimestamps.ts](https://github.com/elevenlabs/elevenlabs-js/blob/main/src/api/resources/textToSpeech/client/requests/BodyTextToSpeechFullWithTimestamps.ts)):
- `text` (required), `model_id`, `voice_settings`, `seed` (0–4294967295, determinism not guaranteed).
- `language_code` (ISO 639-1). The SDK says verbatim: "If the model does not support the provided language code, it will be ignored. **This parameter is not supported for multilingual_v2 models.**"
- `previous_text` / `next_text`, and `previous_request_ids` / `next_request_ids` (max 3 each). If both `previous_text` and `previous_request_ids` are sent, `previous_text` is ignored.
- `apply_text_normalization`: `auto` | `on` | `off`. `apply_language_text_normalization` currently only helps Japanese and can add a lot of latency.
- `pronunciation_dictionary_locators` (max 3), `use_pvc_as_ivc`, `enable_logging`.
- Output format restrictions: `mp3_44100_192` needs Creator or above; 44.1 kHz PCM/WAV needs Pro or above.

**Response** ([AudioWithTimestampsResponse.ts](https://github.com/elevenlabs/elevenlabs-js/blob/main/src/api/types/AudioWithTimestampsResponse.ts), [CharacterAlignmentResponseModel.ts](https://github.com/elevenlabs/elevenlabs-js/blob/main/src/api/types/CharacterAlignmentResponseModel.ts)):
```
{ audio_base64: string,
  alignment?:            { characters: string[], character_start_times_seconds: number[], character_end_times_seconds: number[] },  // original text
  normalized_alignment?: { …same… } }  // normalized text (e.g. digits spelled out)
```
Use `alignment` when the timings must map back to your own on-screen characters, such as "50,000". How digits are timed inside `alignment` once normalization expands them is [unverified]. Test it.

**Models (as of 2026-10):**

| model_id | Chars/request | Hindi | Audio tags | Notes |
|---|---|---|---|---|
| `eleven_v4` (launched 2026-09-28) | 10,000 | yes (90+ languages) | yes | Only `stability` and `similarity_boost` work; no `style`/`speed`, no SSML ([skills/SKILL.md](https://github.com/elevenlabs/skills/blob/main/text-to-speech/SKILL.md), [changelog](https://elevenlabs.io/docs/changelog/2026/9/28), [eesel](https://www.eesel.ai/blog/eleven-v4)) |
| `eleven_v4_turbo` | [unverified] | yes | yes | about 100 ms latency |
| `eleven_v3` | 5,000 | yes (70+ languages) | **yes**: `[excited]`, `[whispers]`, `[sighs]`… | Now listed as "previous generation" ([models](https://elevenlabs.io/docs/overview/models), [audio tags blog](https://elevenlabs.io/blog/v3-audiotags)) |
| `eleven_multilingual_v2` | 10,000 | yes (29 languages incl. `hi`) | no | Stable for long-form narration ([models](https://elevenlabs.io/docs/overview/models.md)) |
| `eleven_flash_v2_5` / `eleven_turbo_v2_5` | 40,000 | yes (v2 languages + hu, no, vi) | no | About 75 ms latency, half the price ([models](https://elevenlabs.io/docs/overview/models)) |

- v4 supports convert/stream with timestamps according to a third-party gateway doc ([Bifrost](https://docs.getbifrost.ai/providers/supported-providers/elevenlabs)) [unverified on ElevenLabs' own docs].
- v3 has a stability setting with three modes: Creative, Natural and Robust. Robust makes the voice less responsive to audio tags ([prompting guide](https://elevenlabs.io/docs/best-practices/prompting)). The exact API values 0.0 / 0.5 / 1.0 are [unverified].
- Audio tags are part of your input text, so they will probably appear in `alignment.characters` [unverified]. Strip them from the display-word mapping.

**Pricing:**
- API pay-as-you-go: v2/v3 cost **$0.10 per 1K characters**; Flash/Turbo cost **$0.05 per 1K** ([puter, Jul 2026](https://developer.puter.com/tutorials/elevenlabs-api-pricing/)).
- v4 list price is $0.08 per 1K and v4 Turbo is $0.04 per 1K. Until **2026-10-12** there is a launch promo of $0.022 / $0.011 per 1K ([ElevenLabs on X](https://x.com/ElevenLabs/status/2104572138347004161), [eesel](https://www.eesel.ai/blog/eleven-v4)).
- Plan credits: multilingual v2/v3 cost **1 credit per character**; Flash/Turbo cost **0.5 credit per character** ([happyrobot](https://www.happyrobot.ai/hub/elevenlabs-pricing)). v4 credits per character are [unverified]. v4 does not use credits for Creator plans and above until Oct 12 ([ElevenCreative on X](https://x.com/ElevenCreative/status/2105674217484374286)).
- Plan tiers: Free $0 / 10k credits; **Starter $6 / 30k**; **Creator $22 (first month $11) / 121k**; Pro $99 / 600k; Scale $299 / 1.8M; Business $990 / 6M ([eesel v4](https://www.eesel.ai/blog/eleven-v4), [flexprice](https://flexprice.io/blog/elevenlabs-pricing-breakdown)).
- Free-plan limits (no commercial licence, library voices restricted over the API) are [unverified]. One integration doc reports `402 paid_plan_required` for some premade voices on the free tier ([langwatch](https://scenario-docs.langwatch.ai/reference/javascript/scenario/variables/voice.ELEVENLABS_DEFAULT_VOICE_ID.html)).

**Voice settings** ([voice-settings.md](https://github.com/elevenlabs/skills/blob/main/text-to-speech/references/voice-settings.md)):
- Defaults: stability 0.5, similarity_boost 0.75, style 0, speed 1.0 (range 0.25–4.0 per the skills doc; [unverified] for v2), speaker_boost on.
- For narration: **stability 0.7, similarity 0.5**. For a "news" read: 0.8 / 0.6.
- Keep `style` at 0. It adds latency and instability ([VoiceSettings.ts](https://github.com/elevenlabs/elevenlabs-js/blob/main/src/api/types/VoiceSettings.ts)).

**Voices:**
- Default voices listed by ElevenLabs: George `JBFqnCBsd6RMkjVDRZzb`, Sarah `EXAVITQu4vr4xnSDxMaL`, Daniel `onwK4e9ZLuTAKqWW03F9`, Charlotte `XB0fDUnXU5powFXDhCwa` ([SKILL.md](https://github.com/elevenlabs/skills/blob/main/text-to-speech/SKILL.md)). None of them is Indian.
- Indian voices from the **voice library**. These IDs come from a third-party catalog, so verify them in your account:
  - Raj, Indian English: `wJ5MX7uuKXZwFqGdWM4N` ([json2video](https://json2video.com/ai-voices/elevenlabs/voices/wJ5MX7uuKXZwFqGdWM4N/))
  - Gaurav, Indian English: `SXuKWBhKoIoAHKlf6Gt3` ([json2video](https://json2video.com/ai-voices/elevenlabs/voices/SXuKWBhKoIoAHKlf6Gt3/))
  - Sonal, Indian English: `NyZqLdjqUb8SpOUKIlWT` ([json2video](https://json2video.com/ai-voices/elevenlabs/voices/NyZqLdjqUb8SpOUKIlWT/))
  - Niraj, Hindi narrator: `7UUQ7nKkAFuNp9HpqSDh` ([json2video](https://json2video.com/ai-voices/elevenlabs/voices/7UUQ7nKkAFuNp9HpqSDh/))
  - Monika Sogam, Hindi: `2zRM7PkgwBPiau2jvVXc` ([json2video](https://json2video.com/ai-voices/elevenlabs/voices/2zRM7PkgwBPiau2jvVXc/))
  - Muskaan: `nutrBX1pApRaSpLJobvb` ([json2video](https://json2video.com/ai-voices/elevenlabs/voices/nutrBX1pApRaSpLJobvb/))
- For numbers: either write them out in words yourself or set `apply_text_normalization: "on"` ([help article](https://elevenlabs.io/docs/help-center/product/core-capabilities/text-to-speech/why-are-numbers-dates-symbols-and-acronyms-not-properly-pronounced-or-spoken-in-the-correct-language)).

## 2. ElevenLabs Forced Alignment (your audio + transcript → word timings)

- **Endpoint:** `POST /v1/forced-alignment`, multipart with fields `file` and `text` ([Client.ts](https://github.com/elevenlabs/elevenlabs-js/blob/main/src/api/resources/forcedAlignment/client/Client.ts), [request](https://github.com/elevenlabs/elevenlabs-js/blob/main/src/api/resources/forcedAlignment/client/requests/BodyCreateForcedAlignmentV1ForcedAlignmentPost.ts)).
- The text "can be in any format"; **diarization is not supported**.
- **Response:** `{ characters: [{text,start,end}], words: [{text, start, end, loss}], loss }`, with times in seconds and `loss` as a per-word alignment score ([response model](https://github.com/elevenlabs/elevenlabs-js/blob/main/src/api/types/ForcedAlignmentResponseModel.ts), [word model](https://github.com/elevenlabs/elevenlabs-js/blob/main/src/api/types/ForcedAlignmentWordResponseModel.ts)).
- **Limits:** the docs give 3 GB, 10 hours and 675k characters ([fal llms.txt](https://fal.ai/models/fal-ai/elevenlabs/forced-alignment/llms.txt)). The SDK comment says the file must be under 1 GB.
- **Cost:** the same rate as Speech-to-Text ([docs](https://elevenlabs.io/docs/overview/capabilities/forced-alignment)), about **$0.22 per audio hour** ([fal](https://fal.ai/models/fal-ai/elevenlabs/forced-alignment/llms.txt)).
- **Languages:** the 29 multilingual-v2 languages, **including Hindi** ([fal](https://fal.ai/models/fal-ai/elevenlabs/forced-alignment/llms.txt)).
- Mixed-script Hinglish text (Latin and Devanagari in one transcript) is [unverified]. Test it.
- This is the cleanest way to sync a user's own recording when you already have their script.

## 3. ElevenLabs Speech-to-Text ("Scribe")

- **Endpoint:** `POST /v1/speech-to-text`.
- **Model IDs:** `scribe_v2` (plus `scribe_v2_realtime*`). v1 is superseded ([Client.ts](https://github.com/elevenlabs/elevenlabs-js/blob/main/src/api/resources/speechToText/client/Client.ts), [skills STT](https://github.com/elevenlabs/skills/blob/main/speech-to-text/SKILL.md)).
- **Useful fields:**
  - `timestamps_granularity: "word" | "character"`, `language_code` (ISO 639-1 or 639-3).
  - `keyterms`: up to 1,000 terms, +20% cost.
  - `no_verbatim` (v2 only), `tag_audio_events`, `diarize`.
  - `source_url` accepts YouTube and TikTok links. The file must be at least 100 ms and under 5 GB.
  - Source: [request body](https://github.com/elevenlabs/elevenlabs-js/blob/main/src/api/resources/speechToText/client/requests/BodySpeechToTextV1SpeechToTextPost.ts).
- **Response words:** `{text, start, end, type: word|spacing|audio_event, speaker_id, logprob}`.
- **Price:** $0.22/hr; realtime $0.39/hr ([pricing via search](https://elevenlabs.io/pricing/api)).
- **Hindi accuracy:** FLEURS Hindi WER 5.5% ([EL Hindi page](https://elevenlabs.io/speech-to-text/hindi)); Voice of India Hindi OI-WER 5.9% ([Josh Talks report](https://elevenlabsreport.ai.joshtalks.com/)).

## 4. Remotion 4.0.534 packages (read from source)

**@remotion/captions** ([caption.ts](https://github.com/remotion-dev/remotion/blob/main/packages/captions/src/caption.ts), [create-tiktok-style-captions.ts](https://github.com/remotion-dev/remotion/blob/main/packages/captions/src/create-tiktok-style-captions.ts)):
```ts
type Caption = { text: string; startMs: number; endMs: number; timestampMs: number|null; confidence: number|null; pageBreakAfter?: boolean };
createTikTokStyleCaptions({ captions, combineTokensWithinMilliseconds, breakOnSilenceAfterMilliseconds? })
  : { pages: { text; startMs; durationMs; tokens: { text; fromMs; toMs; pageBreakAfter? }[] }[] }
```
- `text` **must start with a space** for every word after the first. Spaces are how words are split.
- `breakOnSilenceAfterMilliseconds` exists from v4.0.514; `pageBreakAfter` from v4.0.517 ([docs](https://github.com/remotion-dev/remotion/blob/main/packages/docs/docs/captions/create-tiktok-style-captions.mdx)).
- The package also exports SRT parse and serialize helpers.

**@remotion/elevenlabs** ([index.ts](https://github.com/remotion-dev/remotion/blob/main/packages/elevenlabs/src/index.ts)) exports `elevenLabsTranscriptToCaptions({transcript: unknown}): {captions}`, `detectElevenLabsTranscriptFormat()`, and the types `ElevenLabsTranscript` and `ElevenLabsTranscriptWord`.
- It handles **only Scribe STT output** (`words` with `type`) and the ElevenLabs JSON export with `segments` (export support added in v4.0.530).
- A word's `startMs` is pulled back to the start of the preceding `spacing` entry. `confidence` is always `null` ([converter source](https://github.com/remotion-dev/remotion/blob/main/packages/elevenlabs/src/elevenlabs-transcript-to-captions.ts), [format detector](https://github.com/remotion-dev/remotion/blob/main/packages/elevenlabs/src/detect-elevenlabs-transcript-format.ts)).
- **It does not accept the TTS `alignment` output or the Forced Alignment response.** The FA response has no `language_code`/`transcription_id` and no `type`, so detection would return null (read from source, not tested). You need your own character-to-word grouping.

**@remotion/openai-whisper** ([source](https://github.com/remotion-dev/remotion/blob/main/packages/openai-whisper/src/openai-whisper-api-to-captions.ts)):
```ts
openAiWhisperApiToCaptions({ transcription }): { captions }
```
- Needs `response_format: verbose_json` and `timestamp_granularities: ["word"]`. It also exports `isOpenAiWhisperTranscript` and `OpenAiVerboseTranscription`.

**@remotion/install-whisper-cpp** ([transcribe.ts](https://github.com/remotion-dev/remotion/blob/main/packages/install-whisper-cpp/src/transcribe.ts), [download](https://github.com/remotion-dev/remotion/blob/main/packages/install-whisper-cpp/src/download-whisper-model.ts), [install](https://github.com/remotion-dev/remotion/blob/main/packages/install-whisper-cpp/src/install-whisper-cpp.ts), [toCaptions](https://github.com/remotion-dev/remotion/blob/main/packages/install-whisper-cpp/src/to-captions.ts)):
```ts
installWhisperCpp({ version, to, printOutput?, signal? }): Promise<{alreadyExisted}>
downloadWhisperModel({ model, folder, printOutput?, onProgress?, signal? }): Promise<{alreadyExisted}>
transcribe<T extends boolean>({ inputPath, whisperPath, whisperCppVersion, model, tokenLevelTimestamps: T,
  modelFolder?, translateToEnglish?=false, printOutput?=true, tokensPerItem?, language?, splitOnWord?,
  signal?, onProgress?, flashAttention?, additionalArgs? }): Promise<TranscriptionJson<T>>
toCaptions({ whisperCppOutput }): { captions }
```
- **Models:** `tiny`, `base`, `small` and `medium` (each also as `.en`), `large-v1`, `large-v2`, `large-v3`, `large-v3-turbo`. `large-v3-turbo` needs whisper.cpp 1.7.2 or newer ([template-tiktok config](https://github.com/remotion-dev/template-tiktok/blob/main/whisper-config.mjs)).
- **Language:** `Language` includes `'hi'`/`'Hindi'` and `'auto'` ([languages.ts](https://github.com/remotion-dev/remotion/blob/main/packages/install-whisper-cpp/src/languages.ts)).
- **Input:** a 16 kHz WAV is required. The template converts with `npx remotion ffmpeg -i in -ar 16000 out.wav -y` ([sub.mjs](https://github.com/remotion-dev/template-tiktok/blob/main/sub.mjs)).
- **What `tokenLevelTimestamps` does:** it passes `--dtw large.v3.turbo` (hyphens become dots). whisper.cpp has that preset ([cli.cpp](https://github.com/ggml-org/whisper.cpp/blob/master/examples/cli/cli.cpp)). It also sets `tokensPerItem` to 1.
- **A trap in `toCaptions`:** `startMs`/`endMs` come from `offsets`. The DTW time only fills `timestampMs` (`t_dtw*10`). If you want DTW-based onsets, use `timestampMs`.

## 5. Whisper on Hindi and Hinglish

- **Script:** large-v3 transliterates English words in Hinglish speech into **Devanagari** ("next quarter" becomes "नेक्स्ट क्वार्टर"). There is no flag for mixed-script output ([convertaudiototext](https://convertaudiototext.com/blog/hindi-transcription-code-switching)). Fine-tunes add a mixed-code mode ([Trelis Whisper-Hinglish](https://trelis.substack.com/p/whisper-hinglish)).
- Turbo keeps 4 of the 32 decoder layers. A third-party comparison says Hindi degrades the most ([vexascribe](https://vexascribe.com/whisper-large-v3-vs-turbo)) [third-party].
- **Timing problems:**
  - Plain Whisper timestamps are imprecise and drift on long audio ([WhisperX paper](https://arxiv.org/abs/2303.00747)).
  - whisper.cpp's DTW is labelled EXPERIMENTAL, and `t_dtw` "roughly" marks when a token was emitted ([Remotion docs](https://www.remotion.dev/docs/install-whisper-cpp/transcribe)).
  - Hindi words split into several BPE tokens, so use `splitOnWord`.
- **Normalizer pitfall:** Whisper's `BasicTextNormalizer` replaces every Unicode **Mark** character (`category[0] in "MSP"`) with a space. That **deletes Devanagari matras and viramas** ([basic.py](https://github.com/openai/whisper/blob/main/whisper/normalizers/basic.py), [arXiv 2409.02449](https://arxiv.org/abs/2409.02449)). Do not reuse it for matching.
- **Mitigations:**
  - WhisperX: it uses `theainerd/Wav2Vec2-large-xlsr-hindi` for `hi` and interpolates times for words it cannot align ([alignment.py](https://github.com/m-bain/whisperX/blob/main/whisperx/alignment.py)).
  - MMS-based CTC aligners romanize the text with uroman: [ctc-forced-aligner](https://github.com/MahmoudAshraf97/ctc-forced-aligner) (its default model is CC-BY-NC) and the [torchaudio MMS_FA tutorial](https://docs.pytorch.org/audio/main/tutorials/forced_alignment_for_multilingual_data_tutorial.html), which includes a Hindi example.
  - stable-ts `model.align(audio, text, language)` ([repo](https://github.com/jianfch/stable-ts)).
  - Filtering attention heads gives 20–100 ms accuracy ([arXiv 2509.09987](https://arxiv.org/abs/2509.09987)).
  - The simplest fix: **you already have the script**, so use ElevenLabs Forced Alignment (section 2), or align the script to the ASR output (section 6).

## 6. Aligning a known script to ASR word timestamps

**Recommended approach (about 100 lines of code):**
1. **Tokenize** the script into display words, keeping the original strings.
2. **Build a match key for each word** (a design recommendation):
   - Apply NFC, lowercase Latin, and strip Unicode **P/S only, not M**.
   - Map Devanagari digits ०–९ to 0–9 and drop ZWJ/ZWNJ.
   - Fold nukta and chandrabindu, following the [Lucene HindiNormalizer](https://code.yawk.at/org.apache.lucene/lucene-analyzers-common/8.7.0/org/apache/lucene/analysis/hi/HindiNormalizer.java) or [IndicNLP's DevanagariNormalizer](https://indic-nlp-library.readthedocs.io/en/latest/_modules/indicnlp/normalize/indic_normalize.html).
   - For Hinglish, romanize Devanagari keys with [@indic-transliteration/sanscript](https://unpkg.com/@indic-transliteration/sanscript@1.3.3/README.md), then compare consonant skeletons. This makes "launch" match "लॉन्च".
3. **Handle numbers:** expand script numbers into spoken tokens with [to-words](https://github.com/mastermunj/to-words), which supports `en-IN` (lakh/crore) and `hi-IN`. One display token such as "50,000" maps to a group of spoken tokens. Whisper writes Hindi numbers as words ([dev.to](https://dev.to/tushar9802/whisper-transcribes-spoken-hindi-numbers-as-words-not-digits-so-i-made-a-library-to-convert-them-3m95); Python: [indic-num2words](https://pypi.org/project/indic-num2words)).
4. **Align with Needleman–Wunsch / Levenshtein:**
   - Match cost 0.
   - Substitution cost = normalized character edit distance between keys (0–1).
   - Gap cost about 0.6.
   - O(n·m) is fine for each scene. A quicker alternative: jsdiff `diffArrays(a, b, {comparator})`, which is Myers/LCS ([jsdiff](https://github.com/kpdecker/jsdiff)). In Python, `difflib.SequenceMatcher` or `rapidfuzz` opcodes.
5. **Assign times:**
   - Matched word: use the ASR times.
   - Group (e.g. a number): first word's start, last word's end.
   - Unmatched word: interpolate between its neighbours, weighted by character length (WhisperX does the same).
   - Then force times to be monotonic and enforce a minimum duration.
6. **Gate on quality:** if fewer than about 70% of words match, fall back to Forced Alignment.

**Related tools:** [lyric-align](https://pypi.org/project/lyric-align/0.3.0/) does fuzzy anchoring of known lines onto ASR word times.

## 7. Sync craft: when should a word appear?

- **Netflix:** set in-time on the **first frame of audio**; 1–2 frames either side is acceptable. Out-time can run up to 0.5 s after the audio ends. The gap between events is at least 2 frames ([timing guide](https://backlothelp.netflix.com/hc/en-us/articles/360051554394-Timed-Text-Style-Guide-Subtitle-Timing-Guidelines)). Minimum event length is 5/6 s ([general requirements](https://backlothelp.netflix.com/hc/en-us/articles/215758617)). Snap to a shot change if it falls within 12 frames at 24 fps.
- **BBC:** subtitles should coincide with speech onset and should not anticipate speech, or stay up after it, by more than 1.5 s ([BBC guidelines](https://bbc.github.io/subtitle-guidelines/), via search).
- **Perception:** ITU-R BT.1359 puts detectability at +45 ms when sound is early and −125 ms when sound is late. Viewers tolerate the picture leading the sound far more than the reverse ([BT.1359](https://itu.int/dms_pubrec/itu-r/rec/bt/R-REC-BT.1359-0-199802-S!!PDF-E.pdf)). Applying this to text is my inference: **a word should never appear after its sound; appearing up to about 100 ms early reads as in sync.**
- **Caption tools:** I found no published offset values for Submagic or CapCut. They expose only manual retiming or a global offset ([CapCut](https://www.capcut.com/create/subtitle-sync-audio-video-misalignment)).
- **Practical rule (inference):**
  - Make the word *legible* at onset. Start a pop-in about 2 frames (~67 ms at 30 fps) before the onset, so most of the entrance happens before the sound.
  - Karaoke highlight colour should switch at onset, or 1 frame early.

## 8. Google Flow and Veo

**What Flow offers now:**
- Models: Veo 3.1 Quality, Fast and Lite; **Gemini Omni Flash** (I/O, May 2026; up to 10 s clips, plus editing); Nano Banana Pro for images ([decrypt](https://decrypt.co/368393/google-unveils-gemini-omni-next-gen-ai-video-builder-simulate-world)).
- Features: Text-, Frames- and Ingredients-to-Video (up to 3 ingredients), Extend, Scenebuilder, and audio on all of these ([Google blog](https://blog.google/innovation-and-ai/products/veo-updates-flow/)).
- Native **9:16** arrived January 2026, along with 1080p/4K upscaling ([TechCrunch](https://www.techcrunch.com/2026/01/13/googles-update-for-veo-3-1-lets-users-create-vertical-videos-through-reference-images/)).
- Veo 3.1 clips are 4, 6 or 8 s at 24 fps.

**Flow credits per generation** ([Flow help](https://support.google.com/flow/answer/16526234)):

| Model | Pro / other plans | Ultra |
|---|---|---|
| Veo 3.1 Lite | 10 | 5 |
| Veo 3.1 Fast | 20 | 10 |
| Veo 3.1 Quality | 100 | 100 |
| Omni Flash | 15 / 20 / 25 / 30 for 4 / 6 / 8 / 10 s | same |

- AI Pro gets 1,000 credits a month. Ultra gets 10k–25k ([diyai](https://diyai.io/ai-tools/video-generation/google-veo-pricing/)).
- Non-subscribers get **50 credits a day**, usable for Veo only.
- A single request can produce 2 generations.

**Gemini API (paid tier only):**
- Model IDs: `veo-3.1-generate-preview`, `veo-3.1-fast-generate-preview`, `veo-3.1-lite-generate-preview`.
- Config: `aspect_ratio` 16:9 or 9:16, `resolution`, `duration_seconds` (4/6/8), `negative_prompt`, `seed`, `reference_images` (up to 3), `last_frame`. Extension adds 7 s per step ([cookbook](https://github.com/google-gemini/cookbook/blob/main/quickstarts/Get_started_Veo.ipynb)).
- **Price per second, audio always on:** Standard $0.40 (4K $0.60); Fast $0.10 at 720p, $0.12 at 1080p; Lite $0.05 at 720p, $0.08 at 1080p ([benchlm, 2026-09-11](https://benchlm.ai/media-pricing/veo)).
- `gemini-omni-flash-preview` costs about $0.10/s at 720p ([eesel](https://www.eesel.ai/blog/gemini-omni-flash-pricing)) [third-party].

**Prompting for b-roll that will carry text:**
- Structure: **Cinematography → Subject → Action → Context → Style/Ambiance** ([Google Cloud guide](https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1)).
- One camera move per clip: "slow dolly-in", "locked-off static", "slow pan", "crane up", "handheld tracking", "rack focus". Veo defaults to static or subtle movement if you don't specify.
- Veo 3 adds gibberish **subtitles when the prompt implies dialogue** ([MIT Tech Review](https://www.technologyreview.com/2025/07/15/1120156/googles-generative-video-model-veo-3-has-a-subtitles-problem)). Use no speech, and put only noun lists in `negative_prompt`: "text, subtitles, captions, letters, watermark, logo".
- Describe the empty space you need, for example "subject in lower third, large clean empty sky in upper half, shallow depth of field". This positive-constraint advice is from third-party guides ([artlist](https://artlist.io/blog/negative-prompts-ai-video/)).

---

## Implementation defaults
- **TTS:** `POST /v1/text-to-speech/{id}/with-timestamps?output_format=mp3_44100_128`. Model: `eleven_multilingual_v2` for Hindi and Hinglish narration (no `language_code`); `eleven_v3`/`eleven_v4` when you need `[tags]`; `eleven_flash_v2_5` for cheap drafts. Settings: `{stability:0.7, similarity_boost:0.5, style:0, use_speaker_boost:true}`.
- **Chunking:** one request per scene. Pass `previous_request_ids` (up to 3) for continuity. Store `audio.mp3` and `alignment.json` for each scene.
- **Character to word conversion:** your own function. Split `alignment.characters` on whitespace: word start = first character's start, end = last character's end. Strip `[tags]`. Emit `Caption{ text:" "+word, startMs, endMs, timestampMs:startMs, confidence:null }`.
- **When `show` differs from `say`:** align show-tokens to say-tokens with the section 6 aligner, using Indian-locale number expansion and Devanagari-safe keys. Interpolate anything left unmatched.
- **User's own recording:** ElevenLabs Forced Alignment with the script, first choice. Fallbacks: Scribe v2 (`timestamps_granularity:"word"`, `language_code:"hi"`) then the aligner, or whisper.cpp `large-v3-turbo` (`language:'hi'`, `tokenLevelTimestamps:true`, `splitOnWord:true`) then the aligner. Use Whisper output only for timing, never as display text.
- **Reveal timing:** `frame = Math.round((startMs − 67)/1000·fps)`. Clamp so the gap between words is at least 1 frame. Hold a phrase at least 5/6 s. Let a line stay up to 500 ms after its last word ends. Never reveal after onset.
- **Paging:** `createTikTokStyleCaptions({captions, combineTokensWithinMilliseconds: 1200, breakOnSilenceAfterMilliseconds: 400})`, and set `pageBreakAfter` at scene boundaries.
- **B-roll:** Veo 3.1 Fast (or Lite for drafts), 9:16, 8 s, 1080p, a negative-prompt noun list, no dialogue, mute the audio in Remotion. Scripted path: `veo-3.1-fast-generate-preview` at about $0.12/s for 1080p.

**What couldn't be confirmed:** the v4 Turbo character limit, v4 credit cost on plans, how digits and audio tags appear in `alignment`, Forced Alignment on mixed-script Hinglish, the exact v3 stability values, and free-plan API voice restrictions.