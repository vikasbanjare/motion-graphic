# Motion techniques: moves, colour, type, timing, terms

This is the technique library behind [`style-playbook.md`](style-playbook.md). Every move was seen in the reference videos; the index numbers point to [`reference-notes.md`](reference-notes.md).

**Kit support** tells you how much of a move motion-kit already does:
- ✅ **Built in:** a scene or field does it today.
- ◐ **Close:** a scene gets near it.
- ✖ **Custom code:** it needs a new component.

The code is plain Remotion (`remotion` 4.x) and drops into a new scene file under `motion-kit/src/scenes/`. See `docs/ADDING-SCENES.md` for wiring a scene into the schema, check and QA. All examples assume 30 fps.

Contents: [1 Moves](#1-signature-moves) · [2 Colour and gradients](#2-colour-and-gradients) · [3 Type](#3-type) · [4 Timing and easing](#4-timing-and-easing) · [5 Transitions](#5-transitions) · [6 Camera](#6-camera) · [7 Sound](#7-sound) · [8 Glossary](#8-glossary) · [9 Briefing Claude](#9-briefing-claude)

Shared helpers used below:

```tsx
import { AbsoluteFill, Easing, Img, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const outExpo = Easing.bezier(0.16, 1, 0.3, 1);      // fast start, long settle: the premium default
const inOut = Easing.bezier(0.65, 0, 0.35, 1);       // camera moves and morphs
const p = (f: number, start: number, len: number, e = outExpo) => interpolate(f, [start, start + len], [0, 1], { ...clamp, easing: e });
```

## 1. Signature moves

### Type

**M01 Word-by-word build** ✅ (`kinetic`, `title`, and spoken-word timing with a voice-over)
- Words appear one at a time and earlier words stay where they are.
- Each word: opacity 0→1, `translateY` 0.25em→0 and blur 8px→0 over 8–12 frames, staggered 3–5 frames, or on the spoken word.
- Seen in 004, 037, 189, 209, 252, 345.

```tsx
const words = text.split(" ");
{words.map((w, i) => { const t = p(f, i * 4, 12); return (
  <span key={i} style={{ display: "inline-block", marginRight: "0.25em", opacity: t,
    transform: `translateY(${(1 - t) * 0.25}em)`, filter: `blur(${(1 - t) * 8}px)` }}>{w}</span>); })}
```

**M01b Spatial captions beside a subject** ✖
- The caption block is absolutely positioned left or right of the speaker's head and grows line by line.
- The key number is set 2–3× bigger.
- Seen in 174, 214, 328.

**M02 Gradient word fade, left to right** ◐ (an accent word gets the colour, but not a moving gradient)
- Use `background: linear-gradient(90deg, #3FB6FF, #7C6CFF)` with `background-clip: text`.
- Animate a `mask-image: linear-gradient(90deg, #000 X%, transparent X+15%)` with X going from -15 to 100.
- Seen in 014, 176, 334.

**M03 Card float-in** ✅ (`prompt`, `chat` and `grid` cards)
- Translate 24–40 px, scale 0.96→1, blur 10→0 and opacity, over 14–18 frames with out-expo easing.

**M04 Scale jump**: huge, then small ◐ (`kinetic` varies size by line length)
- One word fills about 60% of the frame width, then a hard cut to a small full sentence.
- Or keep the shot and scale the word down with `inOut` over 12 frames.
- Seen in 001, 161, 278.

**M05 Serif-italic emphasis in a sans sentence** ✖
- Render the emphasis word in Instrument Serif Italic at about 1.08× size.
- It can arrive by crossfading from the sans version over 6 frames.
- Seen in 028, 252, 258, 266.
- Proposed kit mark: `_word_` → serif italic.

**M06 Caret typing, with deletions** ◐ (`prompt` and `chat` type letter by letter; no deletions)
- Type about 18–25 characters per second.
- The caret blinks every 16 frames (on 8, off 8).
- A deletion is a backwards run at double speed.
- The caret can also act as a wipe: the bar slides across and the text behind it changes (ElevenLabs, 014).
- Seen in 047, 207, 278, 339, 345.

```tsx
const cps = 22, shown = Math.floor(Math.max(0, f - start) * cps / 30);
const caretOn = Math.floor(f / 8) % 2 === 0;
<span>{full.slice(0, shown)}<span style={{ opacity: caretOn ? 1 : 0 }}>|</span></span>
```

**M07 Inline media inside a sentence** ✖, the most copied device in the set
- A rounded image chip, emoji or 3D object takes a word slot. The words to its right push over as it scales in, which is a layout animation.
- Build it as a flex row. Animate the chip's `width` from 0 to its target, together with `scale` and `opacity`.
- Seen in 037, 209, 227, 252, 289, 345, 206/230 (rebus).

```tsx
<div style={{ display: "flex", alignItems: "center", gap: "0.3em" }}>
  <span>Apps</span>
  <span style={{ width: 1.4 * t + "em", height: "1em", borderRadius: "0.25em", overflow: "hidden",
    transform: `scale(${0.6 + 0.4 * t})`, opacity: t }}><Img src={chip} style={{ width: "1.4em" }} /></span>
  <span>and agents</span>
</div>
```

**M08 Strike and replace** ✅ (`hook.strike` and the `~~word~~` mark)
- A line draws across the wrong word over 8 frames. The word fades to 40% and the correct word rises in beside it or replaces it.
- Seen in 006, 209.

**M09 Count up and count down** ✅ (`stat` counts up)
- Ease the value with out-expo over 30–45 frames and format every frame.
- Latency counts **down** (500 → 75 ms) as the "win" (164).

**M09b Odometer digit roll** ✖
- Each digit is a vertical strip from 0 to 9 translated by `-digit × 1em` inside a 1em-tall mask.
- Digits stagger 2 frames from the right.
- Seen in 029, 262, 265.

**M10 Highlighter sweep** ✅ (`==word==`)
- A box behind the word scales on X from 0 to 1, origin left, over 10 frames.
- Yellow `#FFE45C` on paper, accent at 30% on dark.
- Seen in 241, 244, 309.

**M11 Marker circle or underline, drawn on** ✖
- Draw an SVG path (a hand-drawn ellipse or swoosh) by animating `strokeDashoffset` from the path length to 0 over 12–18 frames.
- Seen in 162, 196, 238, 310, 335.

```tsx
<path d={ellipse} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p(f, 6, 16)} stroke="#E8402A" strokeWidth={4} fill="none" strokeLinecap="round" />
```

**M12 Box drawn around a phrase on a screenshot** ✖
- The same draw-on as M11, but on a rectangle `rect` placed over an article image.
- Push the camera in 1.05× at the same time.
- Seen in 257.

**M13 Text scramble decode** ✖
- Each character cycles through random glyphs, then settles from left to right.
- Seed the glyphs from the frame number (`random(seed + f)` from Remotion) so every render is the same.
- Seen in 198, 269, Figma Motion (pilot).

### Shapes, lines and particles

**M14 Connector lines and node graphs** ✖
- Draw lines from node to node with `strokeDashoffset`, and pop each node in with a spring when its line arrives.
- Seen in 022, 027, 219.

**M14b Line chart that draws** ✖
- A polyline is revealed by `strokeDashoffset`. A glowing head dot rides the tip, and a tooltip with a counting value follows it.
- Seen in 051, 246, 266.

**M15 Concentric dashed rings** ✖
- 4–6 circles with different `strokeDasharray` values, each rotating at its own speed: `rotate(f * k_i)` with k between -0.6 and 0.9 degrees per frame.
- Seen in 205, 223.

**M16 Particles converge and re-form** ✖
- N dots with seeded start positions interpolate to target points sampled from a logo or shape, with an out-expo ease and a 0–10 frame random delay.
- To re-form, interpolate to a second set of targets.
- Seen in 223, 286, 332.

**M17 Light out of darkness / light-bar reveal** ✖
- A thin bright bar (2–6 px with an 80 px blurred copy) grows or sweeps across.
- The content behind it is revealed by a `clip-path: inset()` that follows the bar.
- Seen in 031, 221, 313, 324.

**M18 Specular sweep across a logo or numerals** ✖
- A diagonal white band (`linear-gradient(110deg, transparent 40%, rgba(255,255,255,.8) 50%, transparent 60%)`) moves across the shape, masked by it with `background-clip: text` or `mask-image`.
- Over 20–30 frames.
- Seen in 036, 269, 313.

**M19 Logo from primitives, or born from a dot** ✖
- Squares, circles and slashes start scattered, rotated or scaled down, then spring into their final positions.
- Or: one dot scales up, splits into 2–3 circles that merge (M22), and resolves to the mark.
- Seen in Figma Motion (pilot), 034, 190, 210, 297, 300.

**M20 Outline to fill** ✖
- Draw the logo's SVG paths as strokes (M11), then fade the fill from 0 to 1 over 10 frames while the stroke fades out.
- Seen in 196, 268, 332.

**M21 Breathing orb** ✅ (`orb`)
- A radial-gradient sphere with an inner highlight. Scale is `1 + 0.03 * sin(f / 12)` plus the audio level.
- It can shrink to an icon and grow into a card (ElevenLabs).

**M21b Conic iridescent disc** ✖
- `background: conic-gradient(from ${f}deg, #FF6AD5, #6AC8FF, #B6FF6A, #FFD36A, #FF6AD5)` on a circle, with a soft radial white overlay and `filter: blur(0.5px)`.
- Seen in 176, 204, 334.

**M22 Metaball merge (goo)** ✖
- Use an SVG filter, `feGaussianBlur stdDeviation=12` then `feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"`, on a group of circles moving together.
- Seen in Figma Motion (pilot), 234.

### UI

**M23 Cursor click** ◐ (`prompt` has a cursor and button click)
- The cursor travels on a gentle arc with `inOut` easing over 12–20 frames.
- On click, scale it to 0.85 and back over 6 frames, and show a ring pulse at the click point.
- Draw the cursor about 1.5× system size.

**M24 Dropdowns, toggles and model pickers** ✖
- Height animates from 0 to auto (measure first), items stagger 2 frames, and the selected row gets a highlight.
- Toggle: the knob translates with a spring and the track colour crossfades.
- Seen in 164, 236, 301, 339.

**M25 Multiplayer named cursors** ✖
- 2–3 coloured cursors with name flags drift on independent sine paths and occasionally "grab" an element.
- Seen in Figma Motion (pilot), 053, 190.

**M26 Tilted 3D UI glide** ✖
- Wrap the screenshot in `perspective: 1600px` with `rotateX(18–30deg) rotateZ(-6deg)`.
- Translate slowly over 3–6 s and add a radial vignette for depth of field.
- Seen in 045, 192, 262, 313.

```tsx
<AbsoluteFill style={{ perspective: 1600 }}>
  <Img src={ui} style={{ transform: `rotateX(24deg) rotateZ(-6deg) translateY(${interpolate(f, [0, 150], [60, -120])}px) scale(1.15)`,
    borderRadius: 24, boxShadow: "0 60px 120px rgba(0,0,0,.5)" }} />
</AbsoluteFill>
```

**M27 Shaped image masks (arch, circle, blob)** ✖
- `clip-path: path(...)` or `inset(0 round 999px 999px 0 0)` for an arch. Animate the inset to reveal.
- Seen in 217, 258.

**M28 Rotating conic glow border** ✖
- An outer div with `background: conic-gradient(from ${f * 3}deg, transparent 70%, #FF4FA3, #FFB000)` and 2 px padding, an inner div with the card background, plus a blurred copy behind for glow.
- Seen in 229.

### Edit-level

**M29 Echo / stutter trail** ✖
- Render 4–6 copies of the moving element at earlier frames (f-2, f-4, …) with falling opacity (0.5, 0.3, …).
- Seen in 001, 258.

**M30 Push through the clicked element** ✖
- After the click, scale the whole UI 1→6 around the button's centre with `inOut` over 12 frames. The next scene starts inside that colour.

**M31 Zoom out of a mark, or into a letter** ✖
- Start at scale 20 on one letter or the symbol, then go to 1 over 24 frames with `inOut`. Reverse it to transition into a letter's counter.
- Seen in 195, 203.

**M32 Light-streak transition** ✖
- 3–6 thin gradient bars whip diagonally across, 8 frames, with additive blend. Cut under the brightest frame.
- Seen in 229, 314.

**M33 Moving mesh gradient** ✖ (`aurora` is close)
- Stack 3–4 `radial-gradient(circle at X% Y%, color, transparent 60%)` layers whose X and Y follow slow sines (1 cycle per 8 s). Add grain.

**M34 Word cycling and glyph swap** ✖
- One word slot cycles through variants (languages, synonyms) every 6–10 frames, each with a vertical slide and blur.
- Seen in 334 (99 languages), 289, 011.

**M35 Container that resizes around text** ✖
- A pill or blob whose width follows the measured text width with a spring, so text can change inside it.
- Seen in 271, pilot "Organize everything" ("Work smart → Work smarter").

**M36 On twos (stepped motion)** ✖
- Quantise the frame: `const fs = Math.floor(f / 2) * 2`, then animate with `fs`. This gives collage and stop-motion a hand-made feel. Add ±2° jitter per step.
- Seen in 005, 291.

**M37 Torn-paper split** ✖
- Two halves of an image, each clipped by a jagged `polygon()`, translate and rotate apart.
- Seen in 018, 309.

**M38 HUD tracking boxes** ✖
- Thin corner-bracket boxes with tiny mono labels snap onto subjects in footage, appear for 6–10 frames and jitter by 1–2 px.
- Seen in 160, 163, 266.

**M39 Sticker cut-out** ✖ (needs a background-removed PNG plate)
- The subject PNG gets a white outline: a `drop-shadow(0 0 0 white)` stack or an SVG `feMorphology dilate`, plus a soft shadow. It pops in with a spring.
- Seen in 206, 214.

## 2. Colour and gradients

### Palettes taken from the references

| Name | Background | Ink | Accent(s) | Used by (examples) | Kit settings |
|---|---|---|---|---|---|
| Studio black | `#000000` | `#F2F2F2` | gradient `#3FB6FF→#7C6CFF` | ElevenLabs 176, 334 | `studio-dark`, `brand.accent/accent2` |
| Fire on black | `#0A0605` | `#FFFFFF` | `#FFB000→#C8102E` | ElevenLabs v3 215 | `studio-dark`, accents |
| Warm paper | `#F4F2EE` | `#141414` | coral `#E8735A` | Claude 236, Tavus 189 | `studio`, `look.bg` |
| Editorial cream | `#F2EDE4` | `#111111` | red `#DE351F` | Memoir 332, Conveo 205 (dark variant) | `editorial`, `look.bg` |
| Blueprint off-white | `#F5F5F2` + grid | `#111111` | orange-red `#F04A1A` | dev tool 002 | `clean`, `background: grid` |
| Acid lime | `#7CEB2E` | `#0A0A0A` | grey `#DADADA` | Lime Studio 162 | `pop`, `look.bg` |
| Lime on black | `#000000` | `#FFFFFF` | `#D9F95A` | Figma 013, Jitter 161 | `mono`, `brand.accent` |
| Cobalt | `#1F6BE6` | `#FFFFFF` | lime sparkle `#B8F35A` | Sanctum 033, 265 | `neon`, accents |
| Electric blue | `#0D47FF` | `#FFFFFF` | black / `#0099FF` | Framer 300 | `pop`, `look.bg` |
| Deep teal | `#0B5A50` | `#FFFFFF` | mint `#3ED6B0` | UKG 286 | `corporate`, `look.bg` |
| Violet night | `#0B0710` | `#FFFFFF` | `#9B7CFF` | Nova Score 001, Hypernova 029 | `studio-dark`, accent |
| Coral pop | `#F04050` | `#FFFFFF` | pink `#F7C6D0` | Animade 171 | `pop`, `look.bg` |
| Teal paper | `#3E8E9A` | `#FFFFFF` | red `#D7263D` | QuickTables 206 | `clean`, `look.bg`, `background: paper` |
| Peach glow | `#FFE7D6` | `#141414` | orange `#FF6A2B` | Brew 209 | `studio`, accent, `aurora` |

Rules:
1. Pick the background first, then **one** accent. A second accent is only allowed as the other end of the same gradient.
2. Body text on dark: 85–92% white (`#E8E8E8`–`#EDEDED`). On light: `#141414`, not `#000`.
3. Muted labels are 50–60% of the ink colour, never a new hue.
4. The kit already enforces readable contrast (it moves `look.text` until it reaches 7:1 and brand accents until they reach 4.5:1), so set the colour you want and read the check output.

### Gradient recipes (CSS)

```css
/* Mesh / aurora (M33): animate the % positions with frame */
background:
  radial-gradient(circle at 20% 30%, #C9C0F5 0, transparent 55%),
  radial-gradient(circle at 80% 20%, #FFD8C2 0, transparent 50%),
  radial-gradient(circle at 60% 85%, #BFE3FF 0, transparent 55%),
  #F7F4FF;

/* Glow halo behind a hero card or orb */
box-shadow: 0 0 0 1px rgba(255,255,255,.08), 0 0 80px 10px rgba(124,108,255,.35);

/* Gradient text */
background: linear-gradient(90deg, #3FB6FF, #7C6CFF); -webkit-background-clip: text; color: transparent;

/* Bloom on type (dark) */
text-shadow: 0 0 12px rgba(255,255,255,.35), 0 0 48px rgba(124,108,255,.45);

/* Conic iridescent disc (M21b) */
background: conic-gradient(from 0deg, #FF6AD5, #6AC8FF, #B6FF6A, #FFD36A, #FF6AD5);

/* Stepped bar gradient wall (Jurni 023): N columns, hue interpolated, heights driven by frame */
background: linear-gradient(90deg, #FF7A1A, #C04CFF);

/* Spotlight vignette */
background: radial-gradient(ellipse at 50% 40%, #1A1A1F 0, #000 70%);
```

Always add grain over gradients (`look.grain: true`, or an SVG `feTurbulence` noise overlay at 4–8% opacity). It stops banding after YouTube and Instagram compression, and was present in nearly every premium gradient film reviewed.

## 3. Type

### Pairings seen most

| Role | Seen in the references | Kit face (free) | Paid look-alike |
|---|---|---|---|
| Neutral product sans | Apple, Linear, ElevenLabs | **Inter** (300 for dark launches, 800 for kinetic) | SF Pro, Söhne |
| Editorial serif | Claude, Tavus, Memoir, Conveo, Klar | **Instrument Serif** | Tiempos, GT Super |
| Tech grotesk | AI, dev tools, gaming | **Space Grotesk** | GT America, Neue Machina |
| Condensed poster caps | founder collage, true-crime, sport | **Anton**, **Teko** | Druk, Knockout |
| Heavy friendly caps | D2C, events | **Archivo Black** | Cooper, Obviously |
| Rounded geometric | fintech, B2B | **Plus Jakarta Sans** | Circular, Gilroy |
| Monospace labels and numbers | dev, data, editorial labels | none yet: propose JetBrains Mono / IBM Plex Mono | Berkeley Mono |

Proven combinations:
- Inter 300 headline + Inter 500 labels (dark launch).
- Instrument Serif headline + Inter labels (whitespace and editorial).
- Inter 800 sentence + Instrument Serif Italic emphasis (kinetic, M05).
- Anton caps + handwritten marker (collage).
- Space Grotesk + mono (dev).

### Sizes and spacing, as a share of frame height

| Element | Size | Tracking | Line height |
|---|---|---|---|
| Kinetic hero word | 14–25% | -0.04em | 0.95 |
| Headline (launch) | 6–9% | -0.03em | 1.0–1.05 |
| Body / subtitle line | 2.5–4% | -0.01em | 1.3 |
| Kicker / label | 1.5–2.2% | +0.08em to +0.14em, caps | 1 |
| Tiny "Introducing" | 2–3% | 0 | 1 |

Rules:
1. Negative tracking on big sans, positive on small caps.
2. Never more than 2 families plus mono.
3. Weight contrast (300 vs 800) is more premium than colour contrast.
4. Line breaks follow meaning, not width: "Build an app. / With a sentence."

## 4. Timing and easing

| Thing | Frames at 30 fps | Seconds |
|---|---|---|
| Word stagger | 3–5 | 0.10–0.17 |
| Element enter | 12–18 | 0.4–0.6 |
| Element exit (faster than enter) | 8–12 | 0.27–0.4 |
| Typing | 18–25 chars/s | |
| Cursor travel | 12–20 | 0.4–0.67 |
| Count-up | 30–45 | 1–1.5 |
| Logo hold at end | ≥ 30 | ≥ 1 |
| Read time | ~0.3 s per word + 0.6 s | |

| Curve | Bezier | Use |
|---|---|---|
| Out-expo (premium default) | `0.16, 1, 0.3, 1` | entrances, text, cards |
| In-out (camera) | `0.65, 0, 0.35, 1` | pushes, morphs, scale-throughs |
| In-quad (exits) | `0.5, 0, 0.75, 0` | elements leaving |
| Spring, no overshoot | `damping 200` | UI and icons (calm) |
| Spring, playful | `damping 10–12, stiffness 120` | mascots, stickers, pop brands |

The kit maps these to `motion: calm | smooth | snappy | bouncy` (`motion-kit/src/engine/motion.ts`).

## 5. Transitions

| Transition | Kit | Feel | Best for |
|---|---|---|---|
| Hard cut on the beat | `cut` | energy, honesty | reels, kinetic, archival |
| Fade / dissolve | `fade` | calm, premium | dark launch, editorial |
| Blur dissolve | `blur` | soft, modern | whitespace UI |
| Push | `push` | continuity | lists, step-by-step |
| Whip pan | `whip` | speed | agency reels |
| Zoom | `zoom` | arrival | recaps, reveals |
| Push through a clicked element (M30) | ✖ | causality | UI films |
| Match cut on shape | ✖ (plan it in copy) | cleverness | brand films (156) |
| Light streak / flash (M32) | ✖ | tech, launch | dark and neon films |
| Pixel or block dissolve | ✖ | digital, retro | 162, 261 |
| Circle wipe / iris | ✖ | playful | 220, 237 |
| Object wipe (a ship or car crosses the frame) | ✖ | narrative | 213 |

Rule: one transition family per film, plus at most one special transition for the reveal.

## 6. Camera

| Move | What it is | Typical numbers |
|---|---|---|
| Push-in | slow scale-up on a still or UI | 1.00 → 1.08 over 3–5 s |
| Pull-back reveal | start tight, end wide | 1.6 → 1.0 with in-out over 1–1.5 s |
| Glide on a tilted plane (M26) | translate across perspective UI | 120–200 px over 3–6 s |
| Rack focus | blur swaps between foreground and background | 0 ↔ 8–12 px over 12 frames |
| Orbit | rotateY a card or object | ±12–20° over 3 s |
| Dolly zoom-through | scale through an element into the next scene | ×6–20 over 12–24 frames |
| Drift | idle sine movement on hero elements | ±4–8 px, 4–6 s period |

The kit gives `image` and `clip` scenes `move: in | out | left | right` and drifts every hero. The tilted glide and the zoom-through need custom code (M26, M30, M31).

## 7. Sound

The review was visual; the only audio measured was tempo (median 112 BPM). These are the recommended defaults per style, set with the kit's sound fields:
- **Dark launch:** almost silent, low pads and the product's own audio. Use `sfxPack: digital` at `sfxVolume` 0.5–0.7.
- **Whitespace UI:** soft clicks on cursor actions and a light airy bed. Use `sfxPack: soft`.
- **Kinetic and reels:** a hit on every cut at 112–130 BPM. Use `sfxPack: punchy` and `npm run music` with a beat grid.
- **Editorial:** piano or strings with no whooshes. Use `sfx: false` on most scenes.

## 8. Glossary

| Term | Meaning |
|---|---|
| Beat | One unit of message on screen, usually one scene |
| Hold | Time a finished frame stays still so it can be read |
| ASL | Average shot length: total time ÷ number of shots |
| Cut on action | Cutting in the middle of a movement (a click, a swipe) so the edit feels invisible |
| Match cut | Cut between two shots that share a shape, position or motion |
| J-cut / L-cut | Sound of the next shot starts before (J) or continues after (L) the picture cut |
| Stagger | Delaying each item in a group by a few frames |
| Overshoot | Moving past the target and settling back (springs) |
| Ease-out / ease-in | Decelerating into rest / accelerating out of rest |
| Bezier curve | Four-number curve that defines an easing |
| Spring | Physics easing defined by stiffness, damping and mass |
| Keyframe | A value at a time; the software interpolates between keyframes |
| Interpolation | Computing in-between values |
| Mask / matte | Shape that hides or reveals a layer; track matte = a layer used as another's mask |
| Clip-path | CSS mask defined by a shape |
| Stroke draw-on | Revealing a line by animating its dash offset |
| Morph | One shape smoothly becoming another |
| Metaball / goo | Blobs that visually fuse when close |
| Parallax | Layers moving at different speeds to suggest depth |
| Depth of field (DoF) | Blur on things outside the focus plane |
| Rack focus | Shifting focus from one subject to another |
| Bloom / glow | Light bleeding around bright areas |
| Rim light | Light on the edges of an object against a dark background |
| Specular highlight | The bright reflection on a glossy surface |
| Grain | Fine noise overlay that adds texture and hides banding |
| Banding | Visible steps in a gradient after compression |
| Mesh gradient | Gradient built from several colour points |
| Conic gradient | Gradient that sweeps around a centre point |
| Iridescence / thin-film | Rainbow sheen that shifts with angle |
| Duotone | Image mapped to two colours |
| Halftone / dither | Image made of dots or pixel patterns |
| Glassmorphism | Frosted translucent panels with blur behind |
| Claymorphism / clay render | Matte, soft-shadowed 3D look |
| Kinetic typography | Type as the main animated element |
| Lower third | Caption or name strip in the lower part of the frame |
| Kicker | Small label above a headline |
| Lock-up | Fixed arrangement of logo symbol and wordmark |
| Logo sting | Short animated logo, 2–10 s |
| Bookend | Ending on the same image or idea as the opening |
| Plate | An image or clip produced elsewhere and composited in |
| Mockup | A product screen placed in a device or scene |
| Safe zone | Area kept free of text for platform UI (Reels buttons and captions) |
| Beat grid | Times of musical beats used to place cuts |
| On twos | Animating every second frame for a hand-made feel |
| Odometer roll | Digits scrolling vertically to the new value |
| Scramble / decode | Random characters settling into real text |
| Whip pan | Very fast pan with motion blur, used as a transition |
| Iris / circle wipe | Transition through a growing or shrinking circle |
| Echo / stutter | Trailing copies of a moving element |
| HUD | Heads-up display overlays: brackets, labels, tracking boxes |

## 9. Briefing Claude

Claude works best when the brief names **the style family, the facts and the length**. Name the look; don't describe effects. In this repo, the `motion-director` skill renders with motion-kit, and `motion-creative-director` writes storyboards and plate prompts for AI image and video tools.

### Template

```
Make a [length]s [format: 16:9 / 9:16] video in the [style name from style-playbook.md] style.
Product: [name] — [one-line promise].
Real facts I can use: [numbers with sources, the real prompt and result, quotes with names].
Brand: accent [#hex], logo at [path], handle [@x].
Mood: [calm / punchy / playful]. Voice: [engine + voice, or none]. Music: [file or none].
Must not: [claims to avoid, competitor names, etc.].
```

### Examples

- **Dark launch:** "Make a 30 s 16:9 video in the *dark gradient AI launch* style for Lumen v2, a voice model. Real facts: 75 ms latency (our docs), 32 languages. Demo prompt: 'Warm Indian English narrator, calm' → result 'Aarav · warm narrator'. Accent #7C6CFF→#3FB6FF. Calm, almost silent, Kokoro voice af_heart."
  - Claude starts from `npm run new -- lumen --recipe style-dark-gradient-launch` and fills the slots.
- **Whitespace UI:** "Use the *whitespace UI* style, warm paper, coral accent, serif headline. Show the real prompt and answer from our app (pasted below). 25 s. No music, soft clicks."
- **Kinetic:** "A 15 s 9:16 *kinetic manifesto*: 'They told you design takes weeks. Wrong.' then four short phrases and our name. Punchy, on the beat of music/track.mp3."
- **Editorial:** "A 20 s *editorial serif* film for our 2026 report: one thesis, one stat (64%, Survey of 2,000 teams, 2026), old vs new, a real quote from Priya S., link to the report."
- **3D or archival (plates):** "Use motion-creative-director to storyboard a 40 s *3D product CGI* film for our keyboard and write the plate prompts, then hand back to motion-director for titles and the CTA."

What to avoid in briefs:
- "Make it pop" or "add effects": name a style instead.
- Asking for numbers or quotes you don't have: the skills will refuse to invent them.
- Mixing styles: one family per film. The playbook's variations are the safe ways to bend a style.
