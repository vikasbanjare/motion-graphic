# Scene catalog

Every scene accepts these common fields:

| Field | Meaning |
|---|---|
| `say` | Narration for this beat. Drives timing (voice-over or estimated speech). |
| `duration` | Seconds. Omit it — the engine times from words or voice. Ignored when narrated. |
| `bg` | `"accent"` = full-colour emphasis beat, `"inverse"` = flipped light/dark. |
| `sfx` | `false` silences this scene's sound effects. |

Rich text fields accept `*accent*`, `==highlight box==`, `~~strike~~`. Use one per scene.
`\n` forces a line break.

## Openers

**hook** — scroll-stopper: setup line, a value struck out, then the punchline.
```json
{ "type": "hook", "say": "Agency ka quote? Fifty thousand. Ab? Bas ek prompt.",
  "setup": "Agency ka quote:", "strike": "₹50,000", "punch": "Ab? *Ek prompt.*" }
```
**kinetic** — 1-8 short phrases, one per beat, each filling the frame.
```json
{ "type": "kinetic", "say": "Stop scrolling. Your skin deserves better.",
  "lines": ["Stop scrolling.", "Your skin", "deserves *better*."] }
```
**orb** — calm hero: a soft orb that breathes with the voice, optional headline. Launch-film opener.
```json
{ "type": "orb", "say": "Meet Lumen. A voice that sounds like you.",
  "headline": "Meet *Lumen*.", "sub": "A voice that sounds like you." }
```
**title** — kicker + headline + optional sub.
```json
{ "type": "title", "kicker": "New launch", "headline": "Glow serum ==2.0==", "sub": "Made for Indian summers." }
```

## Proof & explanation

**stat** — one number that counts up with a meter (`87%`, `₹50,000`, `3.5x`, `10M+`, `75ms`).
```json
{ "type": "stat", "kicker": "Latency", "value": "75ms", "label": "from text to *sound*" }
```
**list** — 1-5 items. `style`: `numbers` | `bullets` | `checks` | `crosses` | `lines`
(`lines` = big kinetic lines, earlier ones dim; best for feature lists in calm themes).
```json
{ "type": "list", "title": "How to use", "items": ["Cleanse", "2 drops", "Sunscreen"], "style": "numbers" }
```
**compare** — old way (left, muted, ✕) vs new way (right, hero, ✓). 1-4 rows each, 1-5 words per row.
```json
{ "type": "compare", "title": "Why switch?",
  "left": { "label": "Before", "items": ["2 weeks", "₹15k+"] },
  "right": { "label": "Now", "items": ["10 minutes", "Free"] } }
```
**bars** — 2-6 horizontal bars; `highlight` index (defaults to largest), `unit`.
**grid** — 2-6 tiles: `{ "icon": "🧪", "label": "Parabens", "sub": "optional" }`.
**quote** — testimonial: `quote`, `author`, `role`, `rating` (1-5). Only real reviews.

## Product demo

**prompt** — floating card: prompt typed into an input, cursor clicks the button,
"Generating…" shimmers, result appears. `resultKind`: `"text"` or `"audio"` (plays a waveform).
```json
{ "type": "prompt", "label": "Describe a voice", "prompt": "Warm Indian English narrator, calm",
  "button": "Generate", "result": "Aarav · warm narrator", "resultKind": "audio" }
```
**chat** — messenger style: prompt typed in a box, reply bubble.
**wave** — waveform that plays with the narration; words light up as spoken (karaoke).
`text` defaults to `say`. `tags` = up to 4 chips like `"[whispers]"`.
```json
{ "type": "wave", "say": "Every word lands exactly where you want it.", "label": "Voice · Aarav", "tags": ["[calm]", "Hinglish"] }
```

## Media

**image** — file in `public/` (or https URL). `fit`: `cover` (full bleed + scrim) | `contain` (card).
`move`: `in` | `out` | `left` | `right` | `none`. `caption`, `kicker`.
**clip** — video in `public/` (muted, full frame). `trim` (seconds to skip), `caption`, `kicker`,
`area`: `top` | `center` | `bottom` (keep text off the subject), `scrim` 0-1 (default 0.6),
`generated: true` adds a small "AI-generated" tag.

## Endings

**cta** — `kicker`, `action` (1-3 words), `sub`, `handle`. `style`: `button` (big pulsing pill)
or `link` (quiet "Try X →" with a drawn underline). Defaults to the theme.
**logo** — `name`, `tagline`, optional `src` (logo file). Usually silent, after the CTA.

## Video-level fields

```json
{
  "format": "reel | portrait | square | landscape",
  "theme": "midnight | clean | neon | editorial | pop | desi | corporate | mono | studio | studio-dark",
  "motion": "snappy | smooth | bouncy | calm",      // optional, theme default
  "pace": "relaxed | normal | fast",               // reading pace when not narrated
  "transition": "auto | push | whip | fade | zoom | blur | cut",
  "brand": { "name": "", "accent": "#RRGGBB", "accent2": "#RRGGBB", "handle": "@x", "watermark": true },
  "audio": { "sfx": true, "music": "music/track.mp3", "musicVolume": 0.2,
             "musicStart": 20.3, "beats": "music/track.beats.json",   // both written by npm run music
             "voiceover": "voice/x.mp3", "timing": "voice/x.timing.json" },
  "progressBar": false,
  "scenes": [ ... ]
}
```
