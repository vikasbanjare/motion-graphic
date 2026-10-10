# Motion style playbook: 13 styles from 251 reference videos

This playbook is built from the reference links in `research/links.txt`. GitHub runners downloaded each video, measured it and made contact sheets (`.github/workflows/research.yml`, with the results on the `research-results` branch). Every unique video was then reviewed frame by frame at 2 frames per second. The per-video notes are in [`reference-notes.md`](reference-notes.md).

The companion file [`motion-techniques.md`](motion-techniques.md) holds the technique library: signature moves with Remotion code, colour and gradient recipes, type, timing, transitions, a glossary, and how to brief Claude.

## Read this first: the uncomfortable part

- **About 40% of what the best reference videos do is not 2D motion graphics.** It is 3D product CGI, live action, real photography and hand-made collage (28 videos tagged 3D CGI, 16 archival or live action, 13 collage). motion-kit renders type, UI, charts, orbs and transitions, which is the other 60%. Shots that need a 3D render, a filmed shot or a cut-out photo need a plate, meaning an image or clip made somewhere else and dropped into an `image` or `clip` scene. The plate can come from an AI image or video tool, a 3D tool or a camera. Every style below says which parts the kit does and which need a plate.
- **The top 1% are not fancier, they are more disciplined.** The measured difference between a premium launch film and an amateur one is fewer colours (2 or 3 per scene), smaller type, longer holds and one idea per beat. It is not more effects. Most of the work in a good film is deciding what to leave out.
- **"Style" is mostly two numbers: average shot length and background brightness.** Get those right for the family you are copying and the rest follows. The table below gives both.

## 1. The numbers (measured, not guessed)

### All 347 measured videos

| Measure | Value |
|---|---|
| Median length | 31 s |
| Median average shot length | 4.8 s (p25 2.4 s, p75 12 s) |
| Videos with no hard cut at all | 25% (everything happens inside one moving frame) |
| Showreels (agency reels) | 2.9 s median shot; the fastest cut every 0.7–1.1 s |
| Aspect | 87% are 16:9 |
| Music tempo | median 112 BPM (n=160 with a detectable beat) |
| Brightness | light 140 · dark 112 · mixed 95 |

### By style family

Taken from the 251 unique videos after tagging; a video can belong to more than one family. "One shot" means the video has two or fewer hard cuts.

| Family | n | Median length | Median shot | Shot p25–p75 | One shot | Dark / light / mixed |
|---|---|---|---|---|---|---|
| Kinetic typography | 44 | 47 s | 4.4 s | 2.9–9.4 s | 23% | 11 / 19 / 14 |
| Whitespace UI | 39 | 46 s | 5.5 s | 2.8–20.8 s | 31% | 6 / 25 / 8 |
| 3D product CGI | 28 | 47 s | 4.1 s | 2.0–6.0 s | 14% | 9 / 12 / 7 |
| Dark premium UI | 26 | 49 s | **16.7 s** | 3.3–35.4 s | **46%** | 20 / 2 / 4 |
| Agency showreel | 24 | 52 s | **1.5 s** | 1.2–2.0 s | 0% | 6 / 2 / 16 |
| Gradient orb / blob | 22 | 47 s | 11.7 s | 6.2–28.7 s | **68%** | 5 / 16 / 1 |
| Logo sting | 17 | 8 s | 4.4 s | 2.8–8.0 s | 71% | 9 / 5 / 3 |
| Archival / documentary | 16 | 55 s | 2.2 s | 1.3–4.2 s | 6% | 5 / 3 / 8 |
| Paper collage | 13 | 14 s | 4.3 s | 3.2–6.0 s | 31% | 3 / 6 / 4 |
| Flat illustration / maps | 12 | 19 s | 7.5 s | 3.3–17.2 s | 58% | 3 / 5 / 4 |
| Data storytelling | 8 | 30 s | 9.0 s | 7.9–34.3 s | 50% | 4 / 3 / 1 |
| Talking head + captions | 8 | 128 s | 3.9 s | 3.6–6.0 s | 25% | 1 / 2 / 5 |
| Editorial / Swiss | 8 | 23 s | 4.3 s | 1.2–10.0 s | 25% | 0 / 5 / 3 |

How to read it:
- **Dark premium and orb films barely cut.** Half of them are one continuous take: the camera glides across one UI, the orb grows and shrinks, text fades in and out. In the kit, use `transition: "fade"` or `"blur"`, `motion: "calm"` or `"smooth"`, and five to eight scenes rather than fifteen.
- **Agency reels cut every 1.5 s**, always on the beat. Use `pace: "fast"`, `transition: "cut"` and a music track with a beat grid (`npm run music`).
- **Whitespace UI is light (25 of 39).** Dark premium is dark (20 of 26). Editorial is never dark (0 of 8). Mixing those up is the most common reason a "premium" film looks wrong.

## 2. Ten rules the top 1% follow

These come from the review notes. Each rule was seen in at least 10 videos.

1. **One idea per beat.** One sentence, one number or one UI action is on screen at a time. When there are two, the second is muted (grey, smaller or out of focus).
2. **Small type on a big empty frame.** Whitespace and dark launches set body text at 2–4% of frame height and rarely put a headline above 8–10%. A tiny line on black reads as confidence (Cosmos, ElevenLabs, Opacity, Codex Micro).
3. **2–3 colours per scene, one accent per film.** The accent touches one word, one button or one bar per beat. Every ElevenLabs film is greys plus one gradient.
4. **Contrast in scale beats contrast in colour.** Huge word, tiny word, huge word (Jitter, Lime Studio, Base44, Brew). The kit's `kinetic` scene does this; vary line length so the scale varies.
5. **The cursor is the editor.** In UI films a large cursor (about 1.5× system size) clicks, and the click is the cut. The camera pushes into what was clicked. In 7 of the 39 UI films the cursor drives every transition.
6. **Count, don't state.** Numbers roll or count up, and latency counts down (500 → 75 ms). A gauge or meter fills with the number. Seen in 30+ videos.
7. **Logo last, mark before wordmark.** The logo arrives in the final 2–3 s. The symbol comes first, then the name slides out from behind it. 15 of 17 logo stings do this.
8. **Bookend the film.** The shape or object that opens the film closes it: Figma Motion's primitives, Capacity's dial, Spotify's play button.
9. **Grain and glow, never flat.** Even "flat" films add film grain, a soft radial glow behind the hero or a slight blur on background layers. Set `look.grain: true` and a `spotlight` or `aurora` background.
10. **Real stuff over stock.** Real UI, real numbers, real founders, real archival footage. What reads as "AI-generic" in the references is the stock-gradient-plus-stock-icon look, so ground every film in something specific.

## 3. The 13 styles

Every style has the same six parts:
- **Look**: background, palette (hex), gradient, type and texture.
- **Motion**: its signature moves and easing.
- **Edit**: shot length and transitions.
- **Seen in**: index numbers in `reference-notes.md`.
- **Build it**: what the kit does, the closest recipe, and what needs a plate or custom code.
- **Variations** and **Pitfalls**.

Kit fields: `theme`, `motion`, `pace`, `transition`, `look.*` and `brand.*` (all in `skills/motion-director/references/scenes.md`). Moves marked **M01**, **M02** and so on are in `motion-techniques.md` §1.

---

### Style 1: Dark gradient AI launch (the "ElevenLabs look")

**Look**
- Pure black `#000`–`#0B0710`.
- One two-stop gradient used on type and the orb, for example blue→violet `#3FB6FF→#7C6CFF`, pink→orange `#FF4FA3→#FF9A3C`, or fire `#FFB000→#C8102E`.
- UI panels in charcoal `#141414–#1E1E1E`, with a 1 px border at 8–10% white.
- Light or regular weight sans (Inter 300–500).
- Big numerals in chrome or gradient ("V3", "3.0").
- Heavy bloom behind the hero, plus grain.

**Motion**
- Light out of darkness: a streak, bar or rim light grows into the logo (M17).
- Gradient words fade in left to right (M02 with a gradient fill).
- An iridescent orb breathes, shrinks to an icon and expands into a card (M21).
- Slot-machine number rolls (M09).
- A UI tilted in 3D with backlight bloom (M26).
- Easing is slow out-cubic. Nothing bounces.

**Edit:** median shot 16.7 s. Half the films are one take. Transitions are fades, blur dissolves or a light sweep.

**Seen in:** 014, 015, 029, 035, 165, 176, 195, 215, 221, 262, 313, 315, 334.

**Build it**
- The `style-dark-gradient-launch` recipe uses `theme: studio-dark`, `motion: smooth`, `transition: fade`, the two brand accents as the gradient, `look.background: spotlight` and `grain: true`.
- Scenes: `orb` → `kinetic` → `prompt` → `bars` (benchmark) → `stat` → `list(lines)` → `cta(link)` → `logo`.
- **Needs custom code:** the tilted-UI camera glide (M26), chrome numerals with a light sweep (M18) and conic-gradient discs (M21b). Each is a small Remotion component; the code is in `motion-techniques.md`.

**Variations**
1. **Fire.** The orb ramp runs orange→red on black (ElevenLabs v3 with its lava background, 215). Set the brand accents to `#FF9A3C` / `#C8102E`.
2. **Aurora.** A green/blue aurora light sits behind a tilted UI (Sound Effects v2, 262), with `look.background: aurora`.
3. **Neon rim.** Electric blue edge light reveals UI panels (Framer 3, 221). Needs custom code: a moving light bar that masks the UI (M17).

**Pitfalls**
- More than one gradient.
- Gradients on body text: they belong on the hero word and the orb only.
- Cutting every 2 s, which turns it into a reel.
- Pure-white type at full size. The references use 85–90% white for body text and pure white only for the hero.

---

### Style 2: Whitespace UI film (the "Apple / Claude / Linear-light look")

**Look**
- Warm off-white `#F4F2EE`, `#F3F0EA` or `#F4F4F4`. Never pure `#FFF` for the canvas; pure white is for cards.
- Cards are white with a soft shadow: y 8–24 px, blur 40–80 px, 6–10% black.
- One warm accent: coral `#E8735A`, brand blue `#3B82F6` or orange `#FF6A3D`.
- An optional soft blurred colour glow behind the hero card (coral or pink, 236; blue, 224).
- Type: small sans for UI, plus a serif for the greeting or headline ("Good afternoon", Tavus "Magic Canvas").

**Motion**
- Cursor-driven micro-interactions: type in a field, click, a dropdown opens, a result appears (M23).
- The camera pushes in on whatever was clicked.
- Cards float in from a slight offset with fade and blur (M03).
- Named multiplayer cursors (M25).
- The text caret is a motif (M06): the cursor bar "wipes" one word into the next (ElevenLabs Speech Engine, 014).

**Edit:** median shot 5.5 s, and 31% are one take. Cuts happen on clicks. Transitions are blur dissolves or a push-through-the-clicked-element (M30).

**Seen in:** 013, 017, 047, pilot "AI meeting agent", 154, 164, 187, 189, 194, 204, 216, 219, 224, 236, 246, 247, 301, 339, 345.

**Build it**
- The `style-whitespace-ui` recipe uses `theme: studio`, `look.bg: #F4F2EE`, `displayFont: Instrument Serif`, `background: plain`, `grain`, `corners: round`, `ctaStyle: link` and `kicker: plain`.
- Scenes: `title` (tiny "Introducing") → `title` (name) → `prompt` → `chat` → `list(lines)` → `stat` → `cta(link)` → `logo`.
- **Needs a plate:** real app screens, as `image` with `fit: contain` and `move: in`. Capture them at 2× and crop to one panel.
- **Needs custom code:** dropdowns, toggles, model pickers and multiplayer cursors (M23–M25).

**Variations**
1. **Serif greeting.** A big serif line zooms then settles under a sans UI ("Good afternoon, John", 236).
2. **Photographic canvas.** A soft-focus photo (sky, flowers) sits behind a glass prompt pill (Codex intro, 224). Use an `image` scene with `fit: cover` and a light scrim, then `prompt`.
3. **Node canvas.** Zoom out from a UI to a flow map of connected pages (Commas, 219; Wix-style sitemap). Needs custom code: nodes and connector lines (M14).

**Pitfalls**
- Filling the frame. The UI should cover 20–40% of the frame width (Tavus, 189).
- Small cursors.
- Stock UI kits. Fake UI reads instantly as fake, so use real screens.

---

### Style 3: Kinetic typography (one phrase per beat)

**Look:** this style runs either light or dark.
- **Light:** black `#111` on off-white.
- **Dark:** white on black or charcoal `#1A1A1A`.
- Type is a heavy sans (Inter 800, Archivo Black or Anton for posters) mixed with **serif italic for the emphasis word**. Serif-italic emphasis was seen in 12+ films (Orbix 028, Klar 252, World Cup 258, Polsia 266).
- The accent is one colour on the emphasis word. Common choices: lime `#D9F95A`, orange `#FF6A3D` or yellow `#FFD400`.

**Motion**
- Word-by-word build where earlier words stay in place (M01).
- Scale jumps: a huge word, then a small line (M04).
- A media object sits inside the sentence (M07). This was the most-copied device in the set: Brew, Edtech, Willow, Zaro, Klar, QuickTables, Brymstudio.
- Caret typing with mistakes (Base44: "Re|ener|").
- A struck-out word replaced by the right one (M08).
- Highlighter boxes (M10).
- Words scattered across the frame that build into a sentence (004, 261).

**Edit:** median shot 4.4 s. Fast versions cut on every beat at 120–130 BPM. Transitions are hard cuts or a scale-through-a-letter (M31).

**Seen in:** 004, 006, 017, 037, 041, 044, 047, 161, 162, 174, 193, 207, 209, 252, 258, 261, 278, 334, 345.

**Build it**
- The `style-kinetic-manifesto` recipe uses `theme: mono`, `motion: snappy`, `pace: fast` and `transition: cut`.
- The `hook` scene does the strike-through, `kinetic` does a phrase per beat, and `title` with `==mark==` does the highlighter.
- **Needs custom code:** inline media inside a sentence (M07), serif-italic swaps inside a sans sentence (M05), scattered layouts and caret typing with deletions (M06).

**Variations**
1. **Editorial mix.** Sans plus serif italic, cream background, small (Klar on dark: 252).
2. **Creator hype.** Rounded heavy sans with gradient fills, glow and scribble underlines at 0.5 s beats (Ozone, 041).
3. **Rebus captions.** Photos and objects replace nouns (QuickTables 206/230, Willow 227). These need cut-out PNG plates.

**Pitfalls**
- More than 4 words per beat.
- Centring everything. Strong films anchor the sentence left or spread it across the frame.
- Animating every letter. Animate words; animate letters only for the hero word.

---

### Style 4: Editorial / Swiss (research brand)

**Look**
- Cream `#F2EDE4`, bone `#ECE4D8` or off-white with a faint grid.
- Exactly one red or orange accent: `#E8402A`, `#F04A1A` or `#DE351F`.
- Ink `#111`.
- A serif display face (Instrument Serif, Tiempos-like) set beside tiny tracked sans labels and monospace numbers.
- Thin 1 px rules, crop marks and dot grids.

**Motion**
- A floating constellation of mono numbers around one icon (Memoir, 332).
- Concentric dashed rings spinning at different speeds (Conveo, 205; M15).
- A dot grid streaming into a square (M16).
- Outline-to-fill logo (M20).
- Words placed far apart across the frame, so time is shown as spacing (Conveo).

**Edit:** median shot 4.3 s, with fades. The p25 is 1.2 s, because some editorial films cut fast between still compositions.

**Seen in:** 002, 032, 044, 159, 205, 217, 220, 223, 268, 311, 332.

**Build it**
- The `style-editorial-serif` recipe uses `theme: editorial`, `look.bg: #F2EDE4`, `background: paper`, Instrument Serif, `corners: sharp`, `kicker: plain` and `ctaStyle: link`.
- Scenes: `title`, `list(lines)`, `stat` with a source in the kicker, `compare`, `quote`, `cta(link)`, `logo`.
- **Needs custom code:** the dashed rings, the number constellation and the dot-grid particles (M15, M16).

**Variations**
1. **Monochrome essay.** Black and white only, with engraving collage (Alchemy → AI, 044).
2. **Stipple illustration.** B&W stipple drawings with one tiny yellow accent (Vox "The Mind, Explained", 220). Needs illustration plates.
3. **Arch masks.** Images sit in arch-shaped windows with serif caps sliding in behind (217). Needs custom code: a clip-path arch (M27).

**Pitfalls**
- A second accent.
- Bouncy easing.
- Pure white paper, which looks like a slide deck.

---

### Style 5: Gradient mesh, orb and blob

**Look**
- Soft multi-stop mesh gradients: lavender→peach `#C9C0F5→#FFD8C2`, sky `#BFE3FF→#FFFFFF`, peach-orange `#FFB38A→#FF6A3D`, hot pink to blush `#FF3D8B→#FFE1EC`.
- Iridescent orbs with thin-film rainbow rims.
- Conic "pie" discs.
- Grain on top always, to stop banding and the plastic look.

**Motion**
- Blobs drift slowly, at about 1 cycle per 6–10 s.
- The orb breathes with the voice: scale ±3% plus a hue shift (M21).
- Metaball merges: circles that fuse (Figma Motion (pilot), Wednesday 234; M22).
- Logo born from a dot (M19).
- Venn overlaps with additive blend (ElevenLabs Image & Video, 204).

**Edit:** median shot 11.7 s, and 68% are one take. The gradient is the set and never cuts.

**Seen in:** 006, 023, 052, 109, 159, 176, 195, 204, 209, 215, 219, 224, 264, 271, 334.

**Build it**
- The kit's `orb` scene plus `look.background: aurora`. The orb ramp is `brand.accent` and `accent2`, or the scene's `colors`.
- Use the `launch-film-16x9` recipe (studio theme) or `style-dark-gradient-launch`.
- **Needs custom code:** full-frame mesh gradients that move (M33, a CSS radial-gradient stack whose stop positions are driven by `frame`), metaball merges (M22, an SVG goo filter) and conic discs (M21b).

**Variations**
1. **Peach heat.** Warm blurred orange glow fields behind black type (Brew, 209).
2. **Holographic.** A conic iridescent orb on white (ElevenLabs Conversational, 176).
3. **Blob sticker.** An organic gradient shape that resizes around a quote (271; M35).

**Pitfalls**
- Saturated gradients behind small text, which kills contrast.
- Gradients without grain, which band on YouTube compression.
- Four or more hues.

---

### Style 6: Neon, rim light and glow UI

**Look**
- Near-black `#05060A`–`#0A0D24`.
- One neon hue: electric blue `#2F6BFF`, Spotify green `#1ED760`, violet `#7C4DFF` or magenta `#FF2EC4`.
- Glow is two layers: a sharp 1–2 px rim plus a 40–120 px blurred copy at 40–60% opacity.
- Glass buttons with a specular highlight.

**Motion**
- A light bar sweeps open to reveal panels (M17).
- A glow ring rotates around a card border, which is a conic border (M28).
- Light streaks whoosh across as transitions.
- The button presses, then a bloom flares upward (Crypto, 045).

**Edit:** long takes with a tracking camera. The cuts are light flashes.

**Seen in:** 016, 029, 045, 051, 221, 229, 262, 313, 315.

**Build it**
- `theme: neon` or `studio-dark` with a single brand accent, `background: spotlight` and `grain`.
- Scenes: `prompt`, `chat`, `stat`.
- **Needs custom code:** the rim-light sweep, the rotating conic border and light-streak transitions (M17, M28, M32).

**Variations**
1. **Trading terminal.** Mono type, red and green numbers and a candlestick chart (JTX 027, Hypernova 029).
2. **Spotify tunnel.** Nested rotating squares with a play button (315).
3. **Neon creator.** Pink and orange gradient Send button with neon streaks (229).

**Pitfalls**
- Glow on everything. Glow belongs on the one thing being clicked.

---

### Style 7: 3D product CGI (clay, glass, chrome, hardware)

**Look:** four sub-looks.
- **Clay pastel:** matte pastel primitives with soft shadows, as in Microsoft Fluent (240), Notion-style icons (pilot "Organize everything") and Iconly (020).
- **Glass and chrome:** iridescent rims (Equals 210, Framer logo 300).
- **Hardware:** a black void with rim light (Surface 228, Figure 324, peripherals 317, Codex Micro 216).
- **Surreal:** Flow Studio (021), Cinema 4D reel (308).

**Motion**
- Slow orbits and dolly-ins with shallow depth of field.
- Exploded views where parts float apart.
- Macro slides across surfaces.
- Light sweeps across a logo (M18).
- Tunnels of nested frames.

**Edit:** median shot 4.1 s, one hero per shot, and the camera never stops.

**Seen in:** 003, 007, 020, 021, 031, 158, 166, 182, 210, 216, 227, 228, 240, 245, 308, 317, 324.

**Build it**
- **This is a plate job.** Render or generate the 3D shots: Blender, Spline, Cinema 4D, or an AI image or video tool for stills and short clips. Then put them in `clip` scenes (with `generated: true` for AI footage) or `image` scenes with `move: in`, and let the kit add titles, stats and the CTA.
- The `motion-creative-director` skill writes the per-shot plate prompts (`references/prompt-templates.md`).
- **Kit-native fake 3D:** `look.corners: round` cards with `transform: perspective(1200px) rotateX(...)` (M26) and a CSS radial shadow. This gets close to clay UI cards, but not to rendered objects.

**Variations**
1. **Low-key to high-key.** Black rim-lit macros, then a fade to a bright misty set (317).
2. **Exploded view.** Components fly into place (Surface 228).
3. **Clay world.** A pastel 3D icon scene with a search bar typing (Microsoft 240).

**Pitfalls**
- AI-generated 3D with melting edges or wrong logos.
- Mixing render styles: pick clay or glass or chrome per film.

---

### Style 8: Paper collage and founder story

**Look**
- Paper textures: teal construction paper `#3E8E9A`, kraft `#C9A86B`, crumpled white or marble.
- B&W cut-out photos with a white sticker outline (4–8 px).
- Polaroids with handwritten captions.
- Condensed white caps captions in a hand-cut or label-maker feel.
- Red accents: torn hearts, stamps, marker circles.

**Motion**
- Elements slide in with a slight random rotation of ±3–8° and a stepped 12 fps feel (M36, on twos).
- Torn-paper split (M37).
- A marker circle or underline draws on (M11).
- Highlighter sweeps across article lines (M10).
- Photos and objects inserted into the caption (M07).

**Edit:** median shot 4.3 s. Collage per sentence, then interview A-roll with captions.

**Seen in:** 005, 018, 019, 039, 068, 073, 119, 167, 193, 206, 212, 230, 244, 252, 291, 309.

**Build it**
- Captions, highlighter boxes and underlines are kit-native: `kinetic`, `title` with `==mark==`, and `look.background: paper` with `grain: true` and `displayFont: Anton` (condensed caps).
- **Needs plates:** cut-out PNG photos (remove backgrounds), paper textures and article screenshots, as `image` scenes with `fit: contain`.
- **Needs custom code:** rotated sticker cards, torn edges (an SVG mask) and stepped motion (M36).

**Variations**
1. **Teal founder story** (QuickTables 206).
2. **Retro magazine** with halftone and pink/yellow print (Rolling Stone 068).
3. **Hand-drawn editorial,** green with boiling ink lines (Vox × Qatar Foundation 005).

**Pitfalls**
- Perfectly aligned elements. Collage needs imperfection: rotation, overlaps and shadows.

---

### Style 9: Archival and documentary montage

**Look**
- B&W or tinted archival footage (sepia, duotone green or magenta).
- Film grain, light leaks and a CRT vignette.
- Tiny centred subtitles, either serif or small white sans, plus occasional big words.
- Headline screenshots with a red box drawn around the key phrase (M12).

**Motion:** cut on every phrase, so one sentence spreads across 3–6 shots (163). Holds, slow push-ins and HUD tracking boxes over footage (M38).

**Edit:** median shot 2.2 s (p25 1.3 s).

**Seen in:** 004, 012, 129, 139, 160, 163, 168, 207, 238, 257, 258, 259, 266, 292, 335.

**Build it**
- **This is a plate job.** Use licensed archival footage or footage you own, in `clip` scenes with the narration as `caption` (use `area` to avoid faces and `scrim` 0.3–0.5).
- `look.grain: true`, `theme: mono`, `transition: cut`, `pace: fast`.
- Headline evidence: an `image` scene of the article plus a `title` with `==highlighted phrase==`.
- **Needs custom code:** the drawn box around a phrase (M12) and tracking boxes (M38).

**Variations**
1. **Manifesto film** with a tiny serif subtitle per shot (160/163).
2. **True-crime title:** map line-art, red stencil and a handwritten calendar (The Vault 335).
3. **History timeline:** a CRT-framed archive and year counters (012, 168).

**Pitfalls**
- Footage you don't have rights to.
- Subtitles too big. The references set them at 2–3% of height.

---

### Style 10: Agency showreel

**Look:** a black or white "type card" system between case snippets.
- Tiny four-corner metadata ("Studio · Reel · 2026") or huge display type ("SHOW REEL" pixel or outlined).
- Each case keeps its own palette.

**Motion**
- Whip transitions and glitch letter scrambles (M13).
- Type layered over type.
- Fisheye walls of thumbnails.
- Tilted mosaic scroll.

**Edit:** median shot **1.5 s** (p25 1.15 s; Lukas Mascher 0.74 s). Every cut lands on a beat.

**Seen in:** 007, 008, 021, 024, 025, 123, 134, 162, 170, 171, 180, 190, 198, 218, 234, 237, 289, 306, 308, 310, 311, 314, 326, 329, 333.

**Build it**
- `pace: fast`, `transition: cut` or `whip`, and `npm run music -- specs/x.json --track <song>` so cuts snap to the beat grid.
- Use `image` and `clip` scenes for case work, with `kinetic` type cards between them.
- **Needs plates:** your actual work. There is no reel without it.

**Variations**
1. **Brand-system reel:** grid → mark → mockups → type specimen → merch (Wednesday 234).
2. **Bold colour reel:** one word per cut on flat colour fields (Animade 171).
3. **Creator-economy neon:** dense neon UI and influencer edits (Lukas Mascher 306).

**Pitfalls**
- Shots longer than 2.5 s, which kills the energy.
- Starting with the logo. Strong reels earn the logo by the end.

---

### Style 11: Logo sting (2–10 s)

**Look:** flat brand colour field and white mark. Examples: Yahoo purple `#7B1CF6`, UKG teal `#0B5A50`, Otter green `#10A56E`, Bynder navy `#1E2A5E`.

**Motion:** the 17 stings split into 8 patterns.

| Pattern | Seen in | What happens |
|---|---|---|
| Assemble from primitives | Figma Motion (pilot), 034, 190, 300 | Squares, circles and slashes snap into the mark |
| Zoom out of the mark | 203 | Start inside a giant letter, then pull back to reveal the lock-up |
| Born from a dot | 210, 219, 297 | A dot grows, splits and becomes the symbol |
| Ribbons braid into it | 267 | Coloured strokes whip in and weave into the mark, then confetti exits |
| Particles re-form | 286 | Dots fly into the logo, dissolve, then re-form into other icons |
| Construction lines | 082, 196, 223, 268 | A bezier and grid drawing, outline, then fill |
| Subtract to the symbol | 304 | The wordmark drops away and leaves the icon |
| Letter personality | 274, 282 | One letter pair hops, or each glyph flips in 3D |

**Edit:** 71% are a single shot. Hold the final lock-up for at least 1 s.

**Build it**
- The kit's `logo` scene does name plus drawn line plus tagline with the logo file.
- **Needs custom code (high value):** primitives assembling (M19), outline-to-fill (M20), zoom-out-of-mark (M31), dot particles re-forming (M16). These are the cheapest premium upgrade to the kit, because every video ends on a logo.

**Pitfalls**
- Spinning or bouncing logos. Premium stings are 80% stillness with one clever move.

---

### Style 12: Data storytelling (counters, charts, recaps)

**Look:** dark or bright brand colour.
- Huge thin or medium numerals.
- Tiny labels.
- Gauges, rings and bar races.
- A glowing chart line with a head dot.

**Motion**
- Count up, or count down for latency (M09).
- A gauge sweeps (Nova Score 001).
- Odometer digits roll (Sound Effects 262).
- A line chart draws with a tooltip riding the tip (Polsia 266).
- Bars grow with a light pulse running along the winning bar (Scribe 334).
- Treemaps (Lukas 306).

**Edit:** median shot 9 s, because numbers need time to finish counting and be read.

**Seen in:** 001, 033, 051, 158, 164, 205, 246, 262, 265, 266, 328, 334.

**Build it**
- `stat` (count-up with a meter), `bars` (grow, with a highlight) and the `style-year-recap` recipe (`theme: neon`, `motion: bouncy`, `transition: zoom`, `background: aurora`).
- **Needs custom code:** line charts that draw (M14b), odometer digit columns (M09b) and countdowns.

**Pitfalls**
- Two numbers in one beat.
- Numbers without a source or period.

---

### Style 13: Talking head with spatial captions (creator and founder)

**Look:** a filmed interview, B&W or warm grade.
- Captions are not bottom subtitles. Bold white words sit **beside the head** and build word by word.
- The key number is huge ("€130,000 ARR", "€1.3 million for charity").

**Motion:** words appear on the beat of speech. The keyword scales past the camera. Insert UI cut-aways and a sticker cut-out of the speaker (214).

**Edit:** 3.9 s median. Cut-aways every 2–4 sentences.

**Seen in:** 018, 103, 174, 206, 214, 278, 328.

**Build it**
- A `clip` scene with your interview, `caption` placed with `area`, and `npm run voice` timings for word sync.
- The Hinglish creator recipe `creator-explainer-hinglish` covers the reel version.
- **Needs custom code:** words positioned beside the subject (M01b, absolute-positioned caption blocks driven by word timings) and sticker cut-out (M39).

**Pitfalls**
- Captions covering the face.
- Every word the same size. Only the number or the key word goes big.

---

## 4. Choosing a style

| You have | Use |
|---|---|
| An AI model, API or voice product with a real demo | 1 Dark gradient launch, or 2 Whitespace UI for a friendlier brand |
| A SaaS UI and calm brand | 2 Whitespace UI |
| No product footage, a strong message | 3 Kinetic typography |
| A report, research or premium B2B brand | 4 Editorial serif |
| An abstract AI / audio / creative product | 5 Gradient orb |
| A dev tool, trading or gaming product | 6 Neon glow |
| A physical product or hardware | 7 3D CGI (plates required) |
| A founder story or small business | 8 Collage, or 13 Talking head |
| A big idea or brand manifesto | 9 Archival montage |
| A portfolio | 10 Agency reel |
| A new logo or rebrand | 11 Logo sting |
| Milestones or a year recap | 12 Data storytelling |

## 5. What the kit cannot do yet (ranked by how often the references use it)

| Gap | How often seen | Cost to build | Notes |
|---|---|---|---|
| Inline media inside a sentence (M07) | 15+ films | Medium | New `kinetic` option: `{text, image}` tokens |
| Logo build moves (M19, M20, M31) | 17 stings | Medium | New `logo.reveal: assemble \| outline \| zoom \| dot` |
| Cursor UI micro-interactions (dropdown, toggle) (M23–M25) | 20+ UI films | High | A `ui` scene with a list of steps |
| Tilted 3D UI glide (M26) | 12 films | Low | `image.move: "tilt"` |
| Line chart that draws (M14b) | 8 films | Low | New `line` scene |
| Moving mesh gradient background (M33) | 15 films | Low | New `look.background: "mesh"` |
| Spatial captions beside a subject (M01b) | 6 films | Medium | `clip.captionStyle: "beside"` |
| Highlighter or box drawn on a screenshot (M10, M12) | 8 films | Low | `image.mark: {x, y, w, h}` |
| Odometer digit roll (M09b) | 6 films | Low | `stat.roll: true` |

These are proposals, not built. Each needs the usual schema → scene → check → qa → test cycle described in `docs/ADDING-SCENES.md`.
