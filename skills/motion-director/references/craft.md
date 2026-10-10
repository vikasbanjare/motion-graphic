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
- Shape of the film, measured frame by frame on 496 reference videos (`docs/research/dataset.md`):
  - Calm opening: the median first cut comes at 4.1 s. Reels still need the hook on screen at frame 0, but open on one held frame, not a flurry of cuts.
  - Busiest beats about a third of the way in: the demo or features montage.
  - The last tenth moves at a third of the average. End on a still logo or card held at least 1.5 s.
  - About a quarter of frames are still. Don't animate everything all the time.

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

### Look (change one part of a theme)
`look` overrides parts of the theme one by one; anything not set stays the theme's:
- `displayFont`: Anton · Inter · Space Grotesk · Instrument Serif · Archivo Black · Teko ·
  Plus Jakarta Sans · Poppins (each gets the weight, case and tracking it looks best at;
  `displayWeight` and `uppercase` override). `bodyFont`: Inter · Poppins · Plus Jakarta Sans · Space Grotesk.
  Hindi falls back to Teko / Poppins automatically.
- `bg` / `text`: a custom canvas. Text is kept at 7:1 or better (lightness moves if needed),
  muted text at 4.5:1, surface and lines are derived, the accents are re-checked on the new
  canvas. A mid-tone canvas no text can read on is moved lighter or darker. `check` says what moved.
- `background` (aurora · grid · spotlight · paper · dots · plain · canvas), `grain`,
  `corners` (sharp · soft · round), `ctaStyle` (button · link), `kicker` (pill · plain).

Prefer a theme first and change one or two things; a look that overrides everything is
usually a sign another theme fits better.

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
      all three ways, and all three get the same verdict) — is a backdrop when its rim is mostly
      paper (white, cream, grey, black; a JPG, an SVG artboard rect): it shows as a box wherever it
      stands out ("use a transparent PNG or SVG"), and a light or dark one decides the base (a
      mid-grey one is a box on both). The backdrop is never judged as lettering, and its colour is
      the page's own, never a blend with the ink: a JPG wordmark cropped tight to the ink meets the
      edge with its letters too, so the paper is whichever of light / dark covers more of the rim —
      unless nothing is enclosed (no counters), no long side is all page and the rim is split, where
      the page is the tone cut into more pieces (gaps, notches) than the lettering (one per letter),
      so a bold HELM whose stems cover 65 % of the edge still reads as black on a white page. Its
      mirror (white on black) gets the mirrored verdict. A full-bleed *colour* is not a backdrop
      but the mark itself (an app tile), judged as a part like any other.
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
- Readable type: ≥ 36 px on vertical/square (30 px hard floor), ≥ 48 px on landscape
  (40 px floor) — landscape plays at about half size on a phone. `npm run qa` measures it.

## Hindi / Hinglish
- Hinglish in Latin script is fine on screen; Hindi on screen in Devanagari.
- Every theme falls back to Poppins/Teko for Devanagari and loosens line height automatically.
- For alignment of Hinglish recordings prefer ElevenLabs forced alignment (Whisper writes Hinglish in Devanagari).

## Sound
- Synthesised whooshes on cuts, pops/clicks on reveals, impact on hook punches — automatic.
- With a voice-over, SFX drop ~4 dB; final mix is normalised to −14 LUFS.
- Music (`npm run music`) is level-matched, fades in 0.4 s / out 1.5 s, and with narration
  sits at 0.15 and ducks to 35 % while words are spoken. Cuts land on its beats (±7 frames,
  downbeats ±10; narrated ±4), with the whoosh on the beat.
- `audio.sfxPack` sets the character of every effect: `classic` (default), `soft` (calm launch
  films, editorial), `punchy` (creator reels, offers), `digital` (AI, tech, gaming).
  `audio.sfxVolume` scales them (1 = as designed). Match the pack to the theme's motion.
- Music: a licensed track (YouTube Audio Library, Pixabay, Mixkit, bought) or one generated in
  Motion Studio with ElevenLabs Music (paid; ask before spending; the prompt is saved next to
  the file as its provenance). Business accounts can't use trending sounds.
