# Scene catalog

The 17 scene types and every field the schema accepts (`motion-kit/src/engine/schema.ts`).
Do not invent fields: unknown keys are silently dropped, so the text would never appear.

**Rich** fields accept three inline marks; use at most one per scene:
`*word*` accent colour · `==word==` highlighter box · `~~word~~` animated strike-through.
`\n` forces a line break. Plain fields show text exactly as written.

## Common fields (every scene)

| Field | Type | Meaning |
|---|---|---|
| `say` | string | Narration for this beat. Drives timing (voice-over or estimated speech). Numbers as words. |
| `duration` | 0.8-20 s | Omit it: the engine times from words or voice. Ignored when narrated. |
| `bg` | `default` \| `accent` \| `inverse` | `accent` = full-colour emphasis beat, `inverse` = flipped light/dark. Max 1-2 per video. |
| `sfx` | boolean | `false` silences this scene's sound effects (and its incoming whoosh). |

## Openers

**hook**: scroll-stopper. Setup line, a value struck out, then the punchline.

| Field | Type | Notes |
|---|---|---|
| `setup` | plain, optional | Small line above, e.g. `"Agency ka quote:"` |
| `strike` | plain, optional | One number or word (≤ 14 chars) that gets crossed out, e.g. `"₹50,000"` |
| `punch` | rich, **required** | Lands last with an impact sound. ≤ 6 words. |

```json
{ "type": "hook", "say": "Agency ka quote? Fifty thousand. Ab? Bas ek prompt.",
  "setup": "Agency ka quote:", "strike": "₹50,000", "punch": "Ab? *Ek prompt.*" }
```

**kinetic**: short phrases slammed in one at a time, each filling the frame.

| Field | Type | Notes |
|---|---|---|
| `lines` | rich[], 1-8, **required** | 1-5 words / ≤ 28 chars each. Each appears as it is spoken. |

```json
{ "type": "kinetic", "say": "Stop scrolling. Your skin deserves better.",
  "lines": ["Stop scrolling.", "Your skin", "deserves *better*."] }
```

**orb**: calm hero. A soft orb that breathes with the voice, optional headline. Launch-film opener.

| Field | Type | Notes |
|---|---|---|
| `kicker` | plain, optional | Label ≤ 26 chars |
| `headline` | rich, optional | ≤ 6 words |
| `sub` | rich, optional | ≤ 12 words |
| `colors` | `["#hex", "#hex"]`, optional | Orb colour ramp. Defaults to the theme's. |

```json
{ "type": "orb", "say": "Meet Lumen. A voice that sounds like you.",
  "headline": "Meet *Lumen*.", "sub": "A voice that sounds like you." }
```

**title**: kicker + headline + optional sub. The workhorse.

| Field | Type | Notes |
|---|---|---|
| `kicker` | plain, optional | Label ≤ 26 chars (pill or tracked caps, per theme) |
| `headline` | rich, **required** | ≤ 8 words / 44 chars |
| `sub` | rich, optional | ≤ 16 words |

```json
{ "type": "title", "kicker": "New launch", "headline": "Glow serum ==2.0==", "sub": "Made for Indian summers." }
```

## Proof & explanation

**stat**: one number that counts up, with a meter (fills to the % for `87%`, full otherwise).

| Field | Type | Notes |
|---|---|---|
| `kicker` | plain, optional | Label ≤ 26 chars, e.g. the source or period |
| `value` | plain, 1-12 chars, **required** | `87%`, `₹50,000`, `3.5x`, `10M+`, `75ms`, `4.8★`. The first number counts up; text around it stays. Indian grouping (`50,00,000`) is kept. |
| `label` | rich, **required** | ≤ 10 words |

```json
{ "type": "stat", "kicker": "Latency", "value": "75ms", "label": "from text to *sound*" }
```

**list**: 1-5 rows revealed at reading pace.

| Field | Type | Notes |
|---|---|---|
| `title` | rich, optional | ≤ 7 words |
| `items` | rich[], 1-5, **required** | 2-6 words each |
| `style` | `numbers` \| `bullets` \| `checks` \| `crosses` \| `lines`, optional | `lines` = big kinetic lines, earlier ones dim (no cards); best for feature lists in calm themes |

```json
{ "type": "list", "title": "How to use", "items": ["Cleanse", "2 drops", "Sunscreen"], "style": "numbers" }
```

**compare**: old way (left: muted, ✕) vs new way (right: hero, ✓).

| Field | Type | Notes |
|---|---|---|
| `title` | rich, optional | |
| `left` | `{ "label", "items": [1-4] }`, **required** | The worse option. Plain strings, 1-5 words per row. |
| `right` | `{ "label", "items": [1-4] }`, **required** | The better option. |

```json
{ "type": "compare", "title": "Why switch?",
  "left": { "label": "Before", "items": ["2 weeks", "₹15k+"] },
  "right": { "label": "Now", "items": ["10 minutes", "Free"] } }
```

**bars**: 2-6 horizontal bars that grow.

| Field | Type | Notes |
|---|---|---|
| `title` | rich, optional | ≤ 7 words |
| `unit` | plain, optional | Suffix after each value: `"%"`, `"M"`, `" Cr"` |
| `bars` | `[{ "label", "value": number ≥ 0 }]`, 2-6, **required** | One unit per chart |
| `highlight` | integer index, optional | Bar painted in the accent. Defaults to the largest. |

```json
{ "type": "bars", "title": "Customer rating", "unit": "%",
  "bars": [{ "label": "Us", "value": 96 }, { "label": "Brand X", "value": 71 }] }
```

**grid**: 2-6 feature tiles.

| Field | Type | Notes |
|---|---|---|
| `title` | rich, optional | ≤ 7 words |
| `items` | `[{ "icon", "label", "sub"? }]`, 2-6, **required** | `icon` = one emoji (≤ 4 chars). `label` 1-3 words. `sub` = optional detail line. |

```json
{ "type": "grid", "title": "Made without",
  "items": [{ "icon": "🧪", "label": "Parabens" }, { "icon": "🌸", "label": "Fragrance", "sub": "Gentle on skin" }] }
```

**quote**: testimonial / review. Only real reviews, with permission.

| Field | Type | Notes |
|---|---|---|
| `quote` | rich, **required** | ≤ 24 words |
| `author` | plain, **required** | `"Priya S."` |
| `role` | plain, optional | `"Customer, Pune"` |
| `rating` | integer 1-5, optional | Stars appear after the author. Only if the review had them. |

```json
{ "type": "quote", "quote": "My dark spots faded in *three weeks*.", "author": "Priya S.", "role": "Customer, Pune", "rating": 5 }
```

## Product demo

**prompt**: floating card. The prompt is typed into an input, the cursor clicks the button,
"Generating…" shimmers, the result appears.

| Field | Type | Notes |
|---|---|---|
| `label` | plain, optional | Over the input, e.g. `"Describe a voice"` |
| `prompt` | plain, ≤ 140 chars, **required** | Keep it under ~100 so typing never drags |
| `button` | plain, ≤ 18 chars, optional | The button the cursor clicks |
| `result` | rich, optional | What comes back |
| `resultKind` | `text` \| `audio`, optional | `audio` plays a waveform under the result |

```json
{ "type": "prompt", "label": "Describe a voice", "prompt": "Warm Indian English narrator, calm",
  "button": "Generate", "result": "Aarav · warm narrator", "resultKind": "audio" }
```

**chat**: messenger style. The prompt is typed in a box, then a reply bubble.

| Field | Type | Notes |
|---|---|---|
| `label` | plain, optional | Over the box, e.g. `"You → Claude"` |
| `prompt` | plain, ≤ 160 chars, **required** | Typed letter by letter; keep it under ~120 |
| `reply` | rich, optional | ≤ 14 words |

```json
{ "type": "chat", "label": "DM us", "prompt": "Kya yeh oily skin ke liye theek hai?", "reply": "Haan! Oil-free formula ✅" }
```

**wave**: a waveform that plays with the narration; words light up as they are spoken (karaoke).

| Field | Type | Notes |
|---|---|---|
| `label` | plain, optional | `"Voice · Aarav"`, `"Hindi · warm"` |
| `text` | plain, optional | Words under the waveform. Defaults to this scene's `say`. ≤ 16 words. |
| `tags` | string[], ≤ 4, each ≤ 20 chars, optional | Chips like `"[whispers]"`, `"Hinglish"` |

```json
{ "type": "wave", "say": "Every word lands exactly where you want it.", "label": "Voice · Aarav", "tags": ["[calm]", "Hinglish"] }
```

## Media

**image**: a photo, product shot or screenshot with a slow camera move.

| Field | Type | Notes |
|---|---|---|
| `src` | plain, **required** | File inside `motion-kit/public/` (`"images/product.jpg"`) or an https URL. The checker errors if a local file is missing. |
| `caption` | rich, optional | ≤ 8 words |
| `kicker` | plain, optional | Label ≤ 26 chars |
| `fit` | `cover` \| `contain`, optional | `cover` = full bleed + scrim, `contain` = card |
| `move` | `in` \| `out` \| `left` \| `right` \| `none`, optional | Slow camera move |

**clip**: video footage, muted, full frame; the engine overlays the words.

| Field | Type | Notes |
|---|---|---|
| `src` | plain, **required** | File inside `public/` (`"clips/desk.mp4"`) or an https URL |
| `trim` | seconds ≥ 0, optional | Skip the start of the take |
| `caption` | rich, optional | |
| `kicker` | plain, optional | |
| `area` | `top` \| `center` \| `bottom`, optional | Where the text sits, so it doesn't cover the subject |
| `generated` | boolean, optional | `true` adds a small "AI-generated" tag (required for AI footage) |
| `scrim` | 0-1, optional | Darkening behind the text. Default 0.6 (keeps contrast on bright footage). |

## Endings

**cta**: the ask.

| Field | Type | Notes |
|---|---|---|
| `kicker` | plain, optional | Line above the action. With `style: "link"` it becomes the headline (rich marks work there). |
| `action` | plain, ≤ 24 chars, **required** | 1-3 words / ≤ 16 chars reads best: `"Shop now"`, `"Book a visit"` |
| `sub` | rich, optional | ≤ 12 words: offer, code, "Link in bio" |
| `handle` | plain, optional | `@handle` or URL at the bottom |
| `style` | `button` \| `link`, optional | `button` = big pulsing pill, `link` = quiet "Try X →" with a drawn underline. Defaults to the theme. |

**logo**: brand sign-off: logo, name, a drawn line, tagline. Usually silent, after the CTA.

| Field | Type | Notes |
|---|---|---|
| `name` | plain, ≤ 32 chars, **required** | |
| `tagline` | plain, optional | |
| `src` | plain, optional | Logo file inside `public/` (e.g. `"brand/logo.png"`) |

## Video-level fields

```json
{
  "format": "reel | portrait | square | landscape",
  "theme": "midnight | clean | neon | editorial | pop | desi | corporate | mono | studio | studio-dark",
  "motion": "snappy | smooth | bouncy | calm",      // optional, theme default
  "pace": "relaxed | normal | fast",               // reading pace when not narrated (default normal)
  "transition": "auto | push | whip | fade | zoom | blur | cut",
  "brand": { "name": "", "accent": "#RRGGBB", "accent2": "#RRGGBB", "handle": "@x", "watermark": true },
  "audio": { "sfx": true, "music": "music/track.mp3", "musicVolume": 0.2,
             "voiceover": "voice/x.mp3", "timing": "voice/x.timing.json" },
  "progressBar": false,
  "scenes": [ ... ]                                 // 1-30 scenes; 5-9 is the sweet spot
}
```

- `brand.accent` / `brand.accent2` (and `brand.logo`) are written by `npm run brand -- <logo> --spec specs/x.json`.
  An accent that would be unreadable on the theme is adjusted automatically.
- `audio.music`, `audio.musicStart` and `audio.beats` are written by
  `npm run music -- specs/x.json --track music/song.mp3`; cuts then snap to the beat and the
  music ducks under narration. Don't hand-edit `audio.beats`.
- `audio.voiceover` / `audio.timing` are written by `npm run voice` (`audio.words` is the inline form).
- `_recipe` and `_note` are documentation only; the engine ignores them. Recipes use `_recipe`
  for the beat plan and copy tips.
