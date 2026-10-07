# Production: voice, music, footage, budgets, delivery

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

## Music (the user's licensed track; never generated)

The kit never makes music. The user brings an instrumental track they hold a licence
for; the engine fits it to the video.

1. Get the track (sources below) and put it in `public/music/` (any path works; it is copied there).
2. Run it after the voice step, so the video's final length is known:
   ```bash
   npm run music -- specs/x.json --track music/song.mp3               # analyse + pick the start
   npm run music -- specs/x.json --track music/song.mp3 --start 12.5  # start at 12.5 s instead
   npm run music -- specs/x.json --track music/song.mp3 --volume 0.2  # also set the level (0-1)
   ```
   It measures tempo, beats, bars (downbeats) and loudness (EBU R128), picks the start (the
   bar that opens the most energetic stretch long enough for the whole video, eased in by up to
   one beat so most cuts fall on the grid), writes `public/music/<track>.beats.json` and sets
   `audio.music`, `audio.musicStart` (seconds) and `audio.beats` in the spec. It prints the BPM,
   the start, and whether the track covers the video (otherwise it loops from the start point).
3. `npm run check` prints `Music: ~120 BPM from 20.3s · 5/6 cuts on the beat`.

What the engine then does, automatically:
- **Cuts on the beat**: each transition's midpoint (where the whoosh peaks) moves onto the
  nearest beat within ±7 frames, or a downbeat within ±10 (preferred). Scene 1 never moves,
  order and minimum reading time are kept. Narrated cuts move at most ±4 frames (speech sync wins).
- **Trim, fades, loop**: plays from `musicStart`, fades in over 0.4 s and out over the last
  1.5 s; a short track loops from the start point (the beat grid loops with it).
- **Level**: matched to −14 LUFS (±6 dB at most), then `musicVolume` (0.2 alone, 0.15 under
  narration, 0.08 for a voice-over without `say` lines).
- **Ducking**: with a voice-over and `say` lines, music drops to 35 % while words are spoken
  (120 ms attack, 450 ms release; pauses shorter than that stay down, so it never pumps).

No steady beat found (ambient, drones, rubato piano)? The music still plays; cuts follow the
voice / reading time. Re-run `npm run music` when the length changes by more than a few
seconds (a new start may fit better) or to try another `--start`.

**Licensed sources** (instrumental, no vocals under narration):
| Source | Cost | Notes |
|---|---|---|
| YouTube Audio Library (Studio → Audio Library) | free | Some tracks need attribution (shown per track): put it in the description. Check the terms before using outside YouTube. |
| Pixabay Music | free | Pixabay Content License, no attribution. Some tracks are registered for Content ID: keep the download page link to clear a claim. |
| Mixkit | free | Mixkit licence, no attribution. Use in videos only, never redistribute the track itself. |
| Artlist / Epidemic Sound | paid | Only if the user has bought a plan. Connect the channel(s) in the account to avoid Content ID claims. Artlist: videos made while subscribed stay licensed; Epidemic: covers what is published while subscribed. |

Never: chart songs or "no copyright music" re-uploads, trending sounds on business accounts,
tracks ripped from other videos, or AI-generated music from this kit. Keep a note of each
track's source page and licence next to the spec; platforms ask for it on a claim.

**BPM guide** (search terms + tempo by look; at 30 fps a beat lasts 1800 / BPM frames):
| Theme / mood | BPM | Search for |
|---|---|---|
| `midnight` — creator reels, bold claims | 120-140 | trap, hip-hop, phonk-lite, punchy bass |
| `neon` — AI, tech, gaming | 120-130 (or 140-150 half-time) | synthwave, cyberpunk, electronic, future bass |
| `pop` — playful D2C, food, kids | 110-128 | upbeat, quirky, claps, ukulele, funk-pop |
| `desi` — festive India, weddings, local business | 95-125 | dhol, Bollywood, Indian fusion, tabla, festive |
| `corporate` — B2B, SaaS, hiring | 100-120 | corporate, inspiring, light electronic, motivational |
| `clean` — calm Apple-like launch | 90-110 | minimal, uplifting, piano pulse, light electronic |
| `editorial` — luxury, fashion, food | 85-100 (fashion: deep house 118-124) | lounge, jazzy, chic, deep house |
| `mono` — Swiss minimal | 100-120 | minimal techno, percussive, glitch, sparse |
| `studio` / `studio-dark` — launch films | 70-95, or no beat | ambient, cinematic, soft piano, airy pads |

Fast pace or under 20 s: top of the range. Voice-led: bottom of the range, sparse arrangement.
At 120 BPM a beat is 15 frames and a bar 2 s, so 2-bar (4 s) scenes feel natural; at 90 BPM
a beat is 20 frames.

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
- Music licensed (source noted), instrumental under narration, sits under the voice, ends on the fade.
- MP4 reaches the final card, has audio, `check` is clean.
- Only confirmed facts. Keep `specs/x.json`, `public/voice/x.*`, clips — they re-render any fix.

## Common fixes
| Problem | Fix |
|---|---|
| ⚠ narration too short for animation | add words to that `say`, or trim on-screen text |
| ⚠ text too long / dashed outline | split the beat or move detail to `sub` |
| words drift from speech | `say` must match the recording; re-align |
| Hindi glyphs look wrong | keep Hindi on screen in Devanagari; Latin-script Hinglish is fine too |
| clip has unwanted words | regenerate "no text", overlay words with the engine |
| music fights the voice | `--volume 0.12` on `npm run music`, or a sparser track (no vocals, no lead melody) |
| cuts don't feel on the beat | re-run `npm run music` (after the voice); try `--start` on a clear bar; check prints the hits |
| "audio.musicStart … track is only …s long" | re-run `npm run music` on the track, or pick an earlier `--start` |
| file too large | `npm run make -- specs/x.json --crf 23` (default 20; higher = smaller) |
