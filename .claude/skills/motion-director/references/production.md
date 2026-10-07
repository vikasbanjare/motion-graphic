# Production: voice, footage, budgets, delivery

## Voice-over

1. `npm run voice -- specs/x.json` → paste-ready narration (one paragraph per beat), character count.
2. Choose a path:
   - **ElevenLabs API**: `ELEVENLABS_API_KEY=… npm run voice -- specs/x.json --tts --voice <voice_id>`
     - Model default `eleven_multilingual_v2` (Hindi/Hinglish/English, ~1 credit/char).
       `--model eleven_flash_v2_5` for cheap drafts (~0.5 credit/char). `eleven_v3`/`eleven_v4` only if you use `[audio tags]`.
     - Narration defaults: stability 0.7, similarity 0.5, style 0. `--speed 1.05` for punchier reels.
     - `--budget <chars>` refuses scripts over the cap; it always asks before spending (`--yes` skips).
     - Returns exact character timings — no transcription needed.
   - **ElevenLabs website / own recording**: save the full MP3 as `public/voice/x.mp3`, then
     `npm run voice -- specs/x.json --align voice/x.mp3`
     (uses ElevenLabs forced alignment if a key is set, otherwise local whisper.cpp).
     Check the duration first — a 1-second file is a partial download.
   - **Subtitles you already have**: `--import file.srt` (or a captions/Scribe JSON).
3. Re-run `npm run check`. Coverage under 70 % means the audio and `say` lines differ.

Voice-prep prompt for the user's own tools:
> Prepare narration for [PROJECT] in [LANGUAGE] for [AUDIENCE]. Use the approved storyboard
> exactly, [CALM / WARM / ENERGETIC] tone, natural [ACCENT], about [N] seconds. Numbers as
> spoken words. Flag pronunciation risks (brand names, Hindi words) and give a 1-line test first.

## Footage (Google Flow / Veo)

Use real assets first. Generate only the shots the words can't explain. Per shot, one line:

> [PHOTOREAL LIFESTYLE FILM / PREMIUM 3D ANIMATION], vertical 9:16. [Camera move, e.g. slow
> dolly-in / locked-off]. Show [precise subject] in [environment]; during this [4/6/8]-second
> shot, [one clear action]. Lighting: [description]. Palette: [brand colours]. Keep [object]
> fully visible and leave clean empty space in the [top/bottom] third for text. No speech.

Negative prompt (nouns only): `text, subtitles, captions, letters, watermark, logo`.
Veo adds gibberish subtitles when a prompt implies dialogue — keep prompts speechless.
Save chosen takes to `public/clips/`, note usable seconds, use `clip` scenes with `trim`,
`area` (where the text goes) and `"generated": true`.

Budget worksheet (fill before generating):
```
Shots × takes × visible credits per take = estimated credits   (cap: [BRIEF CAP])
Narration characters × credits per char  = voice credits       (cap: [BRIEF CAP])
Revision allowance: [N] retries inside the cap
```

## Delivery checklist
- Frame 0 shows the topic; hook payoff inside 3 s.
- Every on-screen line matches the narration and sits outside the red UI zones.
- No clipped text, Devanagari marks or logos; handoffs between beats are clean.
- Voice complete and clear; listen for pronunciation and abrupt ends.
- MP4 reaches the final card, has audio, `check` and `qa` are clean.
- Only confirmed facts. Keep `specs/x.json`, `public/voice/x.*`, clips — they re-render any fix.

## Common fixes
| Problem | Fix |
|---|---|
| ⚠ narration too short for animation | add words to that `say`, or trim on-screen text |
| ⚠ text too long / dashed outline | split the beat or move detail to `sub` |
| QA ✖ safe-zone / overflow / spill | shorten the named field (the → hint gives a word budget) or split the scene |
| QA ⚠ type too small | fewer words in that field so it can be set larger; landscape needs bigger type than reels |
| QA ✖ contrast | another theme, a darker/brighter `brand.accent`, or drop the scene's `bg` override |
| QA ✖ blank thumbnail | open with a hook, title or kinetic scene whose words are on screen at 0.0s |
| words drift from speech | `say` must match the recording; re-align |
| Hindi glyphs look wrong | keep Hindi on screen in Devanagari; Latin-script Hinglish is fine too |
| clip has unwanted words | regenerate "no text", overlay words with the engine |
| file too large | `npm run make -- specs/x.json --crf 23` (default 20; higher = smaller) |
