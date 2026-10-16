# Motion-graphics rules brief: Remotion, 30fps, 9:16 / 1:1 / 16:9 (researched 7 Oct 2026)

This environment's network proxy blocked many primary sites: m3.material.io, carbondesignsystem.com, remotion.dev, Netflix, BBC, Meta, TikTok Ads, support.google.com and schoolofmotion.com. Where I could, I read the same data from the official source repos on GitHub (Material, androidx, Carbon, Remotion docs and source, Google Fonts, W3C WCAG) or from Apple's developer JSON.

**How to read the tags:**
- **(P)**: I read it directly from the primary source or its repo.
- **(S)**: the primary page is cited, but the value came from a search-engine extract.
- **[unverified]**: from a secondary or practitioner source.
- **[derived]**: my own calculation, with the inputs shown.

At 30fps, 1 frame = 33.3 ms.

---

## 1. Motion tokens from mature design systems

**Easing curves (exact cubic-bezier values)**

| Role | Material 3 (web tokens) (P) | Carbon productive (P) | Carbon expressive (P) |
|---|---|---|---|
| Standard (starts and ends on screen) | standard `(0.2, 0, 0, 1)`; emphasized, CSS version `(0.2, 0, 0, 1)` | `(0.2, 0, 0.38, 0.9)` | `(0.4, 0.14, 0.3, 1)` |
| Entrance (decelerate) | emphasized-decelerate `(0.05, 0.7, 0.1, 1)`; standard-decelerate `(0, 0, 0, 1)` | `(0, 0, 0.38, 0.9)` | `(0, 0, 0.3, 1)` |
| Exit (accelerate) | emphasized-accelerate `(0.3, 0, 0.8, 0.15)`; standard-accelerate `(0.3, 0, 1, 1)` | `(0.2, 0, 1, 0.9)` | `(0.4, 0.14, 1, 1)` |
| Legacy (Material 2) | `(0.4, 0, 0.2, 1)` / decelerate `(0, 0, 0.2, 1)` / accelerate `(0.4, 0, 1, 1)` | | |

- **M3 "emphasized" is really a two-segment curve:** `M 0,0 C 0.05,0 0.133333,0.06 0.166666,0.4 C 0.208333,0.82 0.25,1 1,1`. Android ships slightly different decelerate `(0.1, 0.7, 0.1, 1)` and accelerate `(0.3, 0, 0.8, 0.2)` values. Use the web values. (P)
- **Remotion's own agent skill** uses `Easing.bezier(0.16, 1, 0.3, 1)` for entrances. (P)
- **Sources:** [material-web tokens](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-sys-motion.scss), [Android tokens.xml](https://github.com/material-components/material-components-android/blob/master/lib/java/com/google/android/material/motion/res/values/tokens.xml), [Carbon tokens.ts](https://github.com/carbon-design-system/carbon/blob/main/packages/motion/src/tokens.ts)

**Durations**
- **Material 3 (P):**
  - short1–4: 50 / 100 / 150 / 200 ms
  - medium1–4: 250 / 300 / 350 / 400 ms
  - long1–4: 450 / 500 / 550 / 600 ms
  - extra-long1–4: 700 / 800 / 900 / 1000 ms
- **Material 3 pairings (S):**
  - Entering: 400 ms, emphasized-decelerate.
  - Exiting: 200 ms, emphasized-accelerate.
  - Starts and ends on screen: 500 ms, emphasized.
  - Source: [m3.material.io tokens](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs)
- **Carbon (P)** ([motion.json](https://github.com/carbon-design-system/carbon/blob/main/packages/motion/src/dtcg/motion.json)):

  | Token | Duration | Intended use |
  |---|---|---|
  | fast-01 | 70 ms | buttons, toggles |
  | fast-02 | 110 ms | fades of small elements |
  | moderate-01 | 150 ms | default; short-distance moves |
  | moderate-02 | 240 ms | expansions, toasts |
  | slow-01 | 400 ms | large expansions |
  | slow-02 | 700 ms | hero transitions, background dim |

  Productive mode is for task focus. Expressive mode is for "significant moments."
- **Duration by distance, Material 1 (S)** ([m1.material.io](https://m1.material.io/motion/duration-easing.html)):
  - Mobile typical: 300 ms.
  - Large full-screen moves: 375 ms.
  - Entering: 225 ms. Exiting: 195 ms.
  - Tablet: 30% longer. Wearables: 30% shorter.
- **Springs (P):** [Material Motion.md](https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md), [androidx ExpressiveMotionTokens.kt](https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExpressiveMotionTokens.kt). Overshoot, settle time and the Remotion `damping` equivalent are [derived], assuming mass = 1.

| Spring | ζ (damping ratio) | Stiffness | Overshoot | Settles in | Remotion `damping` |
|---|---|---|---|---|---|
| M3 standard, fast / default / slow spatial | 0.9 | 1400 / 700 / 300 | 0.15% | 4 / 5 / 8 f | 67 / 48 / 31 |
| M3 expressive, fast spatial | 0.6 | 800 | 9.5% | 7 f | 34 |
| M3 expressive, default / slow spatial | 0.8 | 380 / 200 | 1.5% | 8 / 11 f | 31 / 23 |
| M3 "effects" springs (opacity, colour) | 1.0 | 3800 / 1600 / 800 | 0% (never overshoot) | | |
| **Remotion `spring()` default** (mass 1, damping 10, stiffness 100) (P) | 0.5 | 100 | **16.3%** | 24 f | 10 |

- **Apple (P):**
  - `Spring(duration: 0.5, bounce: 0)` is the default.
  - `.snappy` has a base bounce of 0.15; `.bouncy` has 0.3. Both default to 0.5 s.
  - The HIG says to "aim for brevity and precision" and to make motion optional.
  - Sources: [snappy](https://developer.apple.com/documentation/swiftui/animation/snappy(duration:extrabounce:)), [HIG Motion](https://developer.apple.com/design/human-interface-guidelines/motion)
- **Converting UI timing to video [derived]:** these tokens are tuned for responding to a tap. Video beats should sit in the long / extra-long band:
  - Entrance: 400–600 ms (12–18 f).
  - Exit: 200–300 ms (6–9 f), about 50% of the entrance (M3 uses 400/200).
  - Full-frame transitions: 500–700 ms (15–21 f).
  - Small accents: 150–250 ms (5–8 f).

## 2. Craft rules that separate amateur from pro

**Easing and overshoot**
- Entrances decelerate and exits accelerate. Never use linear motion for movement; linear is only for opacity cross-fades and continuous drifts.
- **Overshoot budget [derived from the springs above]:**
  - Opacity and colour: 0%.
  - Type: 0–3%. In Remotion: damping 15, stiffness 100 gives 2.8% and settles in 16 f.
  - Playful accents: 10% maximum (damping 12 gives 9.5%).
  - Ban Remotion's default damping of 10 (16% overshoot) on text.
  - Remotion's own skill uses `damping: 200` for "push with no bounce" (P).
- **Stagger [unverified, practitioner]:**
  - 2–4 f (67–133 ms) between words, 1–2 f between letters, 4–6 f between lines.
  - Keep the whole group's reveal under about 600 ms and stagger at most about 8 items. Set the total time budget first and divide it across items.
- **Anticipation [unverified]:** a 3–6 f pull-back of 2–5%, used only on objects and logos. Text entrances should just decelerate.
- **Motion blur:** Remotion `<CameraMotionBlur>` defaults to a 180° shutter, the film-standard angle (P).

**Reading time**
- **Subtitle standards:**
  - BBC: 160–180 wpm, which is 0.33–0.375 s per word, with a floor of 0.3 s per word. (S, [BBC](https://www.bbc.co.uk/accessibility/forproducts/guides/subtitles/))
  - Netflix English: 20 characters/s for adult content, 17 for children's. Minimum 5/6 s per subtitle (833 ms = 25 f), maximum 7 s, minimum gap 2 frames, 42 characters per line, 2 lines. (S, [Netflix TTSG](https://backlothelp.netflix.com/hc/en-us/articles/215758617))
  - Netflix Hindi: 22 characters/s for adults. (S, [Hindi TTSG](https://backlothelp.netflix.com/hc/en-us/articles/115003196707))
  - Silent reading of plain text averages 238 wpm (about 4 words/s), so that is the absolute ceiling. ([Brysbaert 2019](https://doi.org/10.1016/j.jml.2019.104047), S)
- **Read time once text has landed [derived]:** take the larger of these:
  - 1.0 s
  - words × 0.33 s + 0.4 s
  - characters ÷ 17

  Multiply by 1.15 for Hindi or Hinglish [unverified]. The exit starts only after this hold.
- **Words per screen:**
  - Absolute cap: 84 characters, about 12–14 words (2 × 42) [derived].
  - Kinetic headline beats: 1–7 words, at most 32 characters [unverified].
- **Minimum scene length [derived]:** entrance (0.5 s) + read time + exit (0.25 s). That is at least 1.8 s for a 3-word beat. Netflix's floor is 25 f.

**Pacing**
- Hollywood average shot length fell from about 13 s (1945) to about 4 s (1985–2005). (S, [Cutting et al.](https://journals.sagepub.com/doi/reader/10.1068/i0441aap))
- Short-form claims of 1.5–3 s per clip are [unverified]. Working rule: some visual change every 1.5–3 s, a new scene every 2–4 s [unverified].

**Hook and retention data**
- Meta/Nielsen: 47% of a video campaign's value is delivered in the first 3 s, 74% in the first 10 s. ([Marketing Dive](https://www.marketingdive.com/news/facebook-offers-tips-for-converting-tv-ads-to-mobile/448510/), S)
- On mobile feeds, people spend an average of 1.7 s per item (2.5 s on desktop). (S, [Axios](https://www.axios.com/people-scroll-past-content-a-lot-faster-on-fb-mobile-1513302854-c1ef6b3e-9ce1-4110-a156-979d11749534.html))
- TikTok: more than 63% of the highest-CTR ads show their key message within 3 s [unverified, secondary].
- TikTok: 93% of top-performing videos use audio, and 21–34 s is the sweet spot for In-Feed ads. ([TikTok PDF](https://ads.tiktok.com/business/library/7TopCreativeTips.pdf), S)
- YouTube Shorts: "Viewed vs. swiped away" is the hook metric. A 70–80% viewed rate is a good target [unverified]. ([Buffer](https://buffer.com/resources/the-creators-guide-to-youtube-shorts-analytics))
- **Rule [derived]:** frame 0 must already contain the hook text, since it is effectively the thumbnail. No fade up from black.
- **Flashing:** no more than 3 flashes per second, with a stricter limit for saturated red. ([WCAG 2.3.1](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html), P)

## 3. Safe zones

Pixel insets on a 1080×1920 frame:

| Platform | Top | Bottom | Left | Right | Source |
|---|---|---|---|---|---|
| IG/FB Reels (ads) | 14% = 269 | 35% = 672 | 6% = 65 | 6% = 65 | Meta, via [secondary](https://houseofmarketers.com/guide-to-safe-zones-tiktok-facebook-instagram-stories-reels/) (S) |
| IG/FB Stories | 14% = 250 | 20% = 340 | — | — | Meta (S) |
| TikTok In-Feed | 240–254 | 660–707 | 120 | 120–242 | [TikTok Ads help](https://ads.tiktok.com/help/article/tiktok-auction-in-feed-ads) (S); sources conflict |
| YouTube Shorts | 241 | 381 | 60 | 201 | [Google Ads specs](https://support.google.com/google-ads/answer/13547298) / [secondary](https://reap.video/blog/short-form-video-safe-zones) [unverified] |
| **Strict cross-platform union** [derived] | **270** | **710** | **120** | **240** | Text area is x 120–840 (720 wide), y 270–1210 |

**Crops**
- **Instagram profile grid:** crops every post to 3:4 (1080×1440), removing 240 px from the top and bottom of a 9:16 video. ([PetaPixel](https://petapixel.com/2025/01/23/instagram-swaps-square-profile-grids-for-rectangles/), S)
- **4:5 posts (1080×1350):** the grid crop leaves about 1012 px of width, so keep text within x ≈ 88–992 [derived].
- **1:1 posts:** the grid crop leaves only 810 px of width (x 135–945) [derived]. The feed itself has no persistent UI overlay.
- **Reels shown in the feed:** cropped to 4:5, i.e. y 285–1635 [unverified]. The strict text band above survives this crop and the grid crop.
- **16:9:** keep graphics inside 5% on each side, i.e. 96 px left/right and 54 px top/bottom. ([EBU R95](https://tech.ebu.ch/docs/r/r095.pdf), S; SMPTE title-safe is 90%.)

## 4. Typography for motion

**Minimum sizes [derived]**
- Apple's iOS text minimum is 11 pt and the default body size is 17 pt. (P, [HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography))
- A 1080 px-wide video shown full width on a 393 pt phone gives 1 video px ≈ 0.364 pt. So 11 pt ≈ 30 px and 17 pt ≈ 47 px.
- **Vertical and 1:1 video:**
  - Absolute floor: 36 px. Body and captions: 52 px or more. Subheads: 64–80 px.
  - Headlines: 96–160 px. Single-word "mega" type: 180–280 px.
  - Creator consensus for captions is 60–75 px [unverified].
- **16:9 watched inline on a phone held upright:** 1 px ≈ 0.205 pt, so body text needs at least 84 px.

**Line length**
- BBC: lines no wider than 68% of a 16:9 frame (S). Netflix: 42 characters per line (S).
- In a 720 px column, assuming about 0.55 em average glyph width [derived]:
  - 64 px gives about 20 characters per line.
  - 96 px gives about 14.
  - 120 px gives about 11.

**Tracking and leading**
- All caps: add 5–12% letter-spacing, i.e. 0.05–0.12 em. ([Butterick](https://practicaltypography.com/letterspacing.html), S)
- Large lowercase display type: -0.01 to -0.03 em [unverified].
- Latin display leading: 0.95–1.1.
- Devanagari leading: 1.5–1.6 for body and 1.2–1.3 for headlines. Never copy Latin leading values, because the vowel marks above and below get clipped. ([Alphabettes](https://www.alphabettes.org/devanagari-typography-101-a-guide-for-typesetting-with-latin/), S; [indiafont](https://indiafont.com/blog/indian-typography-tips) [unverified])

**Latin fonts:** all OFL; axes checked in [google/fonts METADATA](https://github.com/google/fonts/tree/main/ofl) (P).
- Inter: optical size (opsz) 14–32, weight (wght) 100–900. Inter Tight: weight 100–900.
- Bricolage Grotesque: opsz 12–96, width (wdth) 75–100, weight 200–800.
- Fraunces: opsz 9–144, plus its SOFT and WONK axes.
- Archivo: width 62–125.
- Also: Instrument Serif (400 only), Space Grotesk, Unbounded, Syne, Manrope, Sora, Anton, Bebas Neue (caps only), DM Serif Display.
- **Suggested pairs [unverified, taste]:** Instrument Serif + Inter Tight; Fraunces + Inter; Bricolage Grotesque + Inter; Archivo condensed caps + Archivo; Anton + Inter.

**Devanagari + Latin fonts:** both scripts confirmed in METADATA (P).
- **Sans:** Poppins (100–900), Mukta (200–800), Anek Devanagari (width 75–125, weight 100–800, ideal for kinetic type), Hind, Gotu, Palanquin, Biryani, Noto Sans Devanagari.
- **Display:** Baloo 2 (400–800), Teko, Rajdhani, Khand (condensed), Yatra One, Jaini.
- **Serif:** Rozha One, Tiro Devanagari Hindi, Eczar, Martel, Laila, Karma.
- **Suggested pairs [unverified]:** Poppins + Mukta; Rozha One + Hind; Teko + Mukta.
- In Hind, the Devanagari base sits at 94% of the Latin cap height. In Poppins, the Devanagari base equals the Latin ascender height. (S, Alphabettes)
- **Rule:** animate Devanagari by word or by orthographic syllable, never by code point. Splitting by code point breaks conjuncts such as क्ष. ([W3C ilreq](https://www.w3.org/International/ilreq/devanagari/), S)

## 5. Colour

**Contrast requirements** ([WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), P)
- 4.5:1 for normal text. 3:1 for large text, meaning 24 CSS px or more, or 18.5 px or more if bold. AAA is 7:1 and 4.5:1.
- In 1080-wide vertical video, 24 CSS px is about 66 video px [derived]. So text under 66 px needs 4.5:1.
- Target 7:1 for any text over moving footage.
- Icons and chart strokes need 3:1 (WCAG 1.4.11).

**Scrims [derived]:** worst case is white text over a black scrim on top of white footage.

| Scrim opacity | Contrast |
|---|---|
| 40% | 2.85:1 (fails) |
| 50% | 3.95:1 |
| 60% | 5.74:1 |
| 70% | 8.45:1 |

So use a scrim of at least 60%, or a solid plate. Material's own guidance of "40% ideal" is too weak for text on video ([m2 text legibility](https://m2.material.io/design/color/text-legibility.html), S).

**Accent rule**
- 60/30/10 split for dominant / secondary / accent colour ([UX Planet](https://uxplanet.org/the-60-30-10-rule-a-foolproof-way-to-choose-colors-for-your-ui-design-d15625e56d25) [unverified]).
- One accent colour per video, applied to one element per scene: the keyword, number or call to action [unverified].
- Text on warm accent chips should be dark, not white [derived from the table below].

**Example palettes [derived contrast ratios; taste unverified]**

| Palette | Background / text / accent | Text:bg | Accent:bg | White on accent |
|---|---|---|---|---|
| Ink & Bone | #0E0E10 / #F4F1EA / #FF5A1F | 17.1 | 6.2 | 3.1 (use dark text) |
| Midnight Electric | #0A1020 / #EAF0FF / #5B8CFF | 16.6 | 6.0 | 3.2 |
| Forest Luxe | #0F1A15 / #EDE6D6 / #C9A45C | 14.3 | 7.6 | 2.3 |
| Saffron Night | #14100C / #FFF7E8 / #FF9933 | 17.8 | 8.9 | 2.1 |
| Editorial Paper | #F4F1EA / #111111 / #D7263D | 16.7 | 4.4 (large text only) | 5.0 |

**Render settings that affect colour** ([color space](https://www.remotion.dev/docs/options/color-space), [image format](https://www.remotion.dev/docs/options/video-image-format), [encoding](https://www.remotion.dev/docs/encoding); P)
- Remotion renders `yuv420p` video from JPEG frames at quality 80 by default. Thin, saturated coloured text bleeds and dark gradients band.
- Use `bt709` with PNG frames for accurate colour, or raise JPEG quality to at least 95. The H.264 CRF default is 18.

## 6. AI motion-graphics landscape (2025–26)

| Tool | Strength | Pricing |
|---|---|---|
| **Remotion** | React, deterministic frames. Agent Skills (Jan 2026, `npx skills add remotion-dev/skills`) and a Prompt-to-Motion-Graphics SaaS template (Next.js + OpenAI, compiled in the browser, with input validation and output sanitising) | Free for individuals, organisations of **up to 3 people**, non-profits, and evaluation. Otherwise: **$25 per seat/month** (Creators), **$0.01 per render with a $100/month minimum** (Automators), Enterprise **$500/month minimum** (P) |
| HyperFrames (HeyGen) | HTML + GSAP rendered through headless Chrome and FFmpeg; deterministic | Apache-2.0, free (P) |
| Motion Canvas / Revideo | TypeScript generators. Revideo adds a headless render API and a React player; it is the engine behind Midrender | MIT (P) |
| Jitter | Figma-like browser motion design; exports MP4, GIF, Lottie | Pro ~$19 per editor/month (S) |
| Rive | Interactive state-machine animations for apps | $0 / $9 / $32 / $120 per seat [unverified] |
| LottieFiles | Motion Copilot (prompt to keyframes or state machines) | $19.99/month billed annually, 300 AI credits (S) |
| Hera | Prompt to on-brand, editable motion graphics | $20 / $40 / $100 [unverified] |
| Canva / Adobe Express | One-click "Magic Animate" / character animation from audio | Canva Pro $15/month [unverified] |
| HeyGen / Higgsfield | Avatar and localisation video / generative video (Sora 2, Veo 3.1) | $29/month / $15–99 [unverified] |
| Creatomate / Shotstack / Plainly | JSON- or template-driven render APIs | ~$49–54/month [unverified] |

**What a "JSON storyboard → tested templates → MP4" system adds**
- Generative video cannot set exact typography.
- Template APIs are rigid and have no motion taste or planning.
- Prompt-to-code produces unvalidated, non-deterministic code that breaks.
- Your system lets the LLM write only data. Every number in this brief can be enforced at validation time, before rendering. That covers reading time, safe zones, text fit, contrast and Devanagari handling.
- It also fits Remotion's licence. "Users render personalized videos from your template" is an explicitly accepted use. "Users submit any Remotion project for rendering" is not. ([License FAQ](https://www.remotion.dev/docs/license/faq), P)

## 7. Common failures when an LLM writes Remotion code

All (P) from Remotion docs and source unless tagged.

**Flicker and determinism**
- CSS `animation`, `transition` or `@keyframes`, Tailwind `animate-*`, and `setTimeout` all cause flicker or wrong frames. Frames render out of order across several browser tabs. Drive everything from `useCurrentFrame()`. ([css-animations](https://www.remotion.dev/docs/troubleshooting/css-animations), [flickering](https://www.remotion.dev/docs/flickering))
- `--concurrency=1` is not a real fix.
- `Math.random()` gives different values in each tab. Use `random(seed)`.
- CSS `background-image` and `mask-image` cause flicker. Use `<Img>` inside `<AbsoluteFill>`.

**Fonts and text fitting**
- Fonts must be loaded before render. With `@remotion/google-fonts`, v5 throws unless `weights` and `subsets` are passed. Leaving out the `devanagari` subset means Hindi silently falls back to another font.
- Call `fitText`, `measureText` or `fillTextBox` only after fonts load. Pass them `letterSpacing` and `textTransform`. Borders shrink the measured box.
- `validateFontIsLoaded` defaults to `true` in v5.
- Text overflow happens because nothing shrinks text automatically, so fit text at validation time.

**Timing bugs**
- A `delayRender` handle not cleared within 30 s fails the render ("not cleared after 28000ms"). Common causes are network fonts or assets blocked in the cloud.
- `interpolate` does not clamp by default, so values drift past the last keyframe.
- `interpolate` throws "inputRange must be strictly monotonically increasing" when a stagger offset or duration of 0 creates duplicate keyframes. ([interpolate.ts](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/interpolate.ts))
- `durationInFrames` must be an integer.
- `spring` damping must be greater than 0.
- `TransitionSeries` length is the sum of the scenes minus the transitions.
- Wrap every `<Sequence>` in `premountFor`.

**Other**
- Raw LLM output often includes markdown code fences that must be stripped. ([ai/generate](https://www.remotion.dev/docs/ai/generate))
- Transparent WebM can flicker at chunk boundaries.
- Timing that is too fast and inconsistent easing come from the LLM inventing values [unverified]. The fix is token-only easing and the reading-time validator.

## 8. Sound

**Loudness**
- YouTube normalises playback to -14 LUFS (since 2019) and turns loud audio down. ([Production Advice](https://productionadvice.co.uk/youtube-loudness/) [unverified, secondary])
- The AES TD1008 recommendation, now the AES77 standard: speech or mixed content at -18 LUFS, music at -16 to -14 LUFS, and true peak at or below -1 dBTP. ([AES](https://aes2.org/publications/elibrary-page/?id=20641), S)
- Instagram and TikTok publish no official target. The community uses -14 LUFS [unverified].
- **Default:** master to -14 LUFS integrated, -1 dBTP.

**Mix**
- Duck music 6–12 dB under voice-over, with 30–80 ms attack and 250–700 ms release [unverified].

**Sync with picture [unverified]**
- Start whooshes 4–8 f before the cut, with the peak on the first frame of the new shot.
- Risers should crest exactly on the hit.
- Put a pop or tick on the frame where the text settles.
- No more than one SFX per beat, sitting 6–10 dB under voice-over.

**Licences**
- **Freesound:** filter to CC0. CC-BY needs credit; avoid CC-BY-NC.
- **Kenney:** CC0.
- **Sonniss GDC bundles:** royalty-free, commercial use allowed, no attribution, no AI training.
- **Pixabay:** no attribution, but no reselling the files unaltered. ([terms](https://pixabay.com/service/terms/))
- **Mixkit:** free licence, no attribution. ([info](https://mixkit.co/llm-info/))
- **YouTube Audio Library:** cleared for YouTube; check before using elsewhere.
- **Remotion's built-in remotion.media SFX:** the licence is unstated [unverified].
- **Business accounts** on TikTok and Instagram may only use the platforms' commercial music libraries, so trending sounds are not cleared.

---

## Defaults to encode

| Parameter | Default |
|---|---|
| Entrance easing | `bezier(0.05, 0.7, 0.1, 1)`, 12–18 f |
| Exit easing | `bezier(0.3, 0, 0.8, 0.15)`, 6–9 f (about 50% of entrance) |
| On-screen move | `bezier(0.2, 0, 0, 1)`, 15–21 f |
| Text spring | stiffness 100, damping 15 (2.8% overshoot) |
| Accent spring | stiffness 100, damping 12 (9.5% overshoot) |
| Opacity / colour | no overshoot (damping 200) |
| Stagger | words 3 f, letters 1–2 f, lines 5 f; group at most 18 f and 8 items |
| Read time after text lands | max(1.0 s, 0.33 s × words + 0.4 s, characters ÷ 17); ×1.15 for Hindi |
| Scene length | at least 1.8 s and at least 25 f; max 7 s per text event |
| Words per beat | 1–7 words, at most 32 characters; absolute cap 84 characters |
| Hook | text visible at frame 0; key message within 3 s |
| Visual change cadence | every 1.5–3 s |
| 9:16 text area (strict) | x 120–840, y 270–1210 |
| 1:1 text area | x 135–945 |
| 4:5 text area | x 88–992 |
| 16:9 insets | 96 px left/right, 54 px top/bottom |
| Minimum text size (9:16, 1:1) | 36 px floor; body 52 px; headline 96–160 px |
| Minimum text size (16:9) | body 84 px |
| All-caps tracking | +0.08 em |
| Leading | Latin 1.0; Devanagari 1.25 headline / 1.5 body |
| Contrast | at least 4.5:1 below 66 px; target 7:1 over video; scrim at least 60% |
| Accent colour | one hue, about 10% of the frame, one element per scene |
| Flashes | at most 3 per second |
| Fonts | Inter Tight / Instrument Serif / Bricolage Grotesque; Hindi: Poppins + Mukta, Anek Devanagari |
| Render | H.264 CRF 18, `bt709`, PNG frames or JPEG quality ≥95, motion-blur shutter 180° |
| Audio | -14 LUFS, -1 dBTP; duck music 6–12 dB; whoosh peak on the cut |

I only searched and read sources. No files were created or changed.