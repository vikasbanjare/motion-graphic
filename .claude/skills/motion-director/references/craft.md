# Craft rules

These are encoded in the engine and the checker; knowing them lets you write specs
that pass first time.

## Timing
- Reading: ~3 words/s (pace normal; relaxed 2.4, fast 3.6) or 17 characters/s, whichever is slower; Hindi +15 %.
- Narrated videos cut on the spoken beat; words reveal ~0.1 s before they are spoken, never after.
- A scene on screen past ~7 s loses viewers: split it. Fewer than ~1.3 s cannot be read.
- Hook: something on screen at frame 0 (it is the thumbnail), payoff inside 3 s.
- Reels: 15-35 s, 5-9 beats. Launch films (16:9, ElevenLabs/Apple style): 35-50 s, ~9 beats
  (recipe `launch-film-16x9`). Per-platform guide: `copy.md` → Length by platform.

## Copy
- One idea per beat. Big type ≤ 7 words / ~32 characters. Body ≤ 16-20 words.
- Kickers are labels (≤ 26 chars), not sentences.
- One accent (`*word*` or `==word==`) per scene: the keyword, the number, or the CTA.
- `say` = how it is spoken ("fifty thousand rupees"); `show` = how it reads ("₹50,000").
- No invented results, reviews, discounts or statistics.

## Hooks that work
- Price/time shock with strike-through (`hook` with `strike`).
- Question the viewer silently asks ("Motion video chahiye?").
- Demonstration right after a one-line hook (`title`, then `prompt`/`chat`).
- Common mistake ("You're editing reels the hard way").
- "Meet X." + orb for launches.
- 25 formulas with English and Hinglish examples: `copy.md`.

## Themes (pick by vibe, then let the theme decide fonts, colours, motion)
| Theme | Use for |
|---|---|
| `midnight` | creator reels, bold claims (navy, saffron, condensed caps) |
| `clean` | calm product launch, Apple-like (off-white, ink, blue) |
| `neon` | AI / tech / gaming (black, acid lime, violet) |
| `editorial` | luxury, fashion, food, real estate (cream, serif, terracotta) |
| `pop` | playful D2C, food, kids (yellow, black, pink) |
| `desi` | festive India, weddings, local business (indigo, marigold; Hindi display face) |
| `corporate` | B2B, SaaS, finance, hiring (white, slate, indigo) |
| `mono` | Swiss minimal (black, white, one red) |
| `studio` / `studio-dark` | launch films in the calm ElevenLabs-style: light type, orb, blur dissolves, "Try X →" endings |

Brand accent overrides the theme accent. Got a logo? `npm run brand -- <logo> --spec specs/x.json`
extracts the palette, writes `brand.accent` / `brand.accent2` / `brand.logo` and recommends a theme;
an accent that would be unreadable on the theme is adjusted automatically.

## Motion personalities
- `snappy` — mask reveals, 2-frame stagger, push transitions. Creator energy.
- `smooth` — rise + soft blur, longer eases. Product/corporate.
- `bouncy` — springs with ≤ 3 % overshoot on text, ~10 % on buttons. Playful.
- `calm` — word blur-in, no overshoot, blur-dissolve cuts. Launch films.

## Formats & safe zones
- `reel` 1080×1920: content stays inside x 96-930, y 260-1340 (Reels/TikTok/Shorts UI).
- `square` and `portrait` keep text inside the Instagram 3:4 profile-grid crop.
- `landscape` 1920×1080 for YouTube/X/LinkedIn/web.

## Hindi / Hinglish
- Hinglish in Latin script is fine on screen; Hindi on screen in Devanagari.
- Every theme falls back to Poppins/Teko for Devanagari and loosens line height automatically.
- For alignment of Hinglish recordings prefer ElevenLabs forced alignment (Whisper writes Hinglish in Devanagari).

## Sound
- Synthesised whooshes on cuts, pops/clicks on reveals, impact on hook punches — automatic.
- With a voice-over, SFX drop ~4 dB and music to 0.08; final mix is normalised to −14 LUFS.
- Music is never generated: only tracks the user supplies and has a licence for (YouTube Audio Library,
  Pixabay, Mixkit, bought). Business accounts can't use trending sounds.
- `npm run music` finds the beats: cuts snap to them and the music ducks under narration automatically.
