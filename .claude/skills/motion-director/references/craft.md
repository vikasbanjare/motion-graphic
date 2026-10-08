# Craft rules

These are encoded in the engine and the checker; knowing them lets you write specs
that pass first time.

## Timing
- Reading: ~3 words/s (pace normal; relaxed 2.4, fast 3.6) or 17 characters/s, whichever is slower; Hindi +15 %.
- Narrated videos cut on the spoken beat; words reveal ~0.1 s before they are spoken, never after.
- A scene on screen past ~7 s loses viewers: split it. Fewer than ~1.3 s cannot be read.
- Hook: something on screen at frame 0 (it is the thumbnail), payoff inside 3 s.
- Reels: 15-35 s. Launch films (16:9, ElevenLabs/Apple style): 35-50 s, 10-14 beats.

## Copy
- One idea per beat. Big type ≤ 7 words / ~32 characters. Body ≤ 16-20 words.
- Kickers are labels (≤ 26 chars), not sentences.
- One accent (`*word*` or `==word==`) per scene: the keyword, the number, or the CTA.
- `say` = how it is spoken ("fifty thousand rupees"); `show` = how it reads ("₹50,000").
- No invented results, reviews, discounts or statistics.

## Hooks that work
- Price/time shock with strike-through (`hook` with `strike`).
- Question the viewer silently asks ("Motion video chahiye?").
- Demonstration first (`prompt`/`chat` typing in the first beat).
- Common mistake ("You're editing reels the hard way").
- "Meet X." + orb for launches.

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

### Brand colours (they always match, and always read)
- **From a logo**: put it in `public/brand/`, then
  `npm run brand -- public/brand/logo.png --spec specs/<name>.json` (PNG, JPG, WebP, GIF, SVG; `--json` for data).
  The logo is decoded in memory (nothing written but the spec; SVG is rasterised by a system
  ffmpeg built with librsvg, else read as text and its colours weighted by shape area — the tool
  says so). Transparent, near-white and near-black pixels (background, lettering) and
  anti-aliased blends are ignored; the rest is clustered (k-means, k=5, OKLab). It writes
  `brand.accent` (the most saturated colour covering ≥ 5 % of the logo's colour), `brand.accent2`
  (the next clearly different one; dropped for one-colour logos) and `brand.logo` (`logo` scenes
  without `src` show it). It prints every colour's contrast, light vs dark base, and ranks the 10
  themes with each one's accent contrast. Choose among the top 3 by vibe.
  - **The logo file must read on the theme — a rule, not a score**: `logo` scenes draw the file as
    is, straight on the theme background (no plate). The tool judges each opaque part of the logo
    (each connected shape: a letter, a mark, a tile with its glyph) by its rim, the ink that meets
    the background (pixels next to transparency), against each theme. Ink vanishes below ~2.5:1
    contrast unless its colour differs strongly (a vivid yellow mark reads on white at 1.5:1; navy
    or #333 lettering on near-black at 1.6:1 does not).
    - A part whose rim vanishes but which holds ink of another colour that reads there — a tile or
      badge with a glyph (a navy or black app tile's white glyph on a dark theme), an outline around
      a body (an orange mascot's #111 outline), a ring around a glyph, black text on a yellow badge on
      `pop` — still reads: only its edge blends in. That is an ℹ note, never a warning and never a
      reason to rule out a base.
    - A part with nothing readable inside — wordmark strokes, a plain mark, a tile with its glyph cut
      out to transparency — is lost with its rim. When that is ≥ 10 % of the logo's rim, the theme is
      listed last under "Not with this logo file", and messages name the part for what it is
      (lettering, mark, tile, outline).
    - The logo's own frame — its biggest part when it spans ≥ 85 % of the image both ways as a solid
      square (full bleed, rounded corners or a few % of transparent padding: app icons are exported
      all three ways, and all three get the same verdict) — is a backdrop when it is light or dark
      paper (white, cream, pale grey, black; a JPG, an SVG artboard rect): it shows as a box wherever
      it stands out ("use a transparent PNG or SVG"), and decides the base. A full-bleed *colour* is
      not a backdrop but the mark itself (an app tile), judged as a part like any other.
    - When most themes of one base fail, the other base comes first. So a yellow mark with a black,
      charcoal or navy wordmark gets `clean` / `studio` / `corporate` (yellow darkened to read), not
      `midnight` or `pop`; a violet, red, navy or yellow app tile with a white glyph fits every theme
      (navy's edge blends into near-black, yellow's into `pop`: a note); a black tile with a white
      glyph is a dark box on light themes and fits the dark ones, `midnight` included; a white one is
      the mirror case. To keep yellow on dark, get a light-on-dark version of the logo from the brand
      and run the tool on that file.
  - With `--spec`, a spec theme the logo does not read on gets a ⚠ and alternatives (an edge that only
    blends in, an ℹ); `npm run check` gives the same warning or note for any `logo` scene's file
    (path in public/ or data: URL).
  - Then keeping the brand colours true counts most, then the accent's lightness (a mild hint),
    then a theme built around a similar hue.
  - A monochrome logo writes no accent: the theme keeps its own (mono, clean, studio suit it).
- **From hex codes** the user gives: write them to `brand.accent` / `brand.accent2` directly.
- **Never rejected, never unreadable** (`withBrand` in `src/engine/themes.ts`):
  - accent stays exactly as given if it reaches 3:1 on the background and on cards (surface: kicker pills,
    the `compare` hero label) and some button text reaches 4.5:1 on it; otherwise only its lightness moves
    (OKLCH, hue and chroma kept) to the nearest value that passes;
  - button text: the theme's own if it reads, else white or the theme's dark ink, whichever reads better;
  - accent2: the brand's, held to 3:1 on the background and under button-text glyphs; if missing it is
    derived with the theme's own pairing — analogous (desi, corporate), a quarter turn (midnight, clean, pop),
    complementary (neon, editorial, studio, studio-dark), grey (mono);
  - highlighter (`==mark==`, text on it ≥ 4.5:1) and orb colours: the theme's tints re-aimed at the brand hue,
    at the theme's lightness and as strong as the brand is vivid (a yellow brand on `clean` gets a pale butter
    highlighter, not beige and not neon; a muted brand gets muted tints);
  - text, background, surface, lines and muted text never change.
- `npm run check` prints an ℹ line per adjustment, e.g. "brand accent #FFE14D darkened to #A48D00 for
  contrast … To keep it exactly, use theme midnight / neon / desi …" (only themes `brand.logo` reads on).
  Light brand colours (yellow, lime, pastels) belong on dark themes; deep ones (navy, maroon) on light
  themes — unless the logo file itself only reads on the other base (above): a readable logo beats an
  exact accent.

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
- Music must be licensed (YouTube Audio Library, Pixabay, Mixkit, bought). Business accounts can't use trending sounds.
