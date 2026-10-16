# Teardown: Lottieicon ("Animated icons library"): dark neon-green launch promo for an animated Lottie/AEP icon library

- File: `refs/1ccYWJ6nQXdqt1UQrpz2mE0ODScG_hU0K.mp4`. Runs 44.27 s at 30 fps, 1138x640 (16:9, sub-HD delivery). The audio is music plus SFX (no voice-over [inferred]). Integrated loudness is -16.6 LUFS.
- Method: I viewed every timeline, overview, hook, shots and transitions sheet. I then made 21 frame-by-frame zoom sheets (30/20/15 fps, two of them cropped) covering all 25 corrected shots, ran a per-frame luminance-difference pass to place every cut to the exact frame, and tracked objects per frame on half-resolution frames (white-pixel bboxes for type and UI, BFS-labelled green blobs for the highlighted icon tiles, rim rows for the dome, tile rows for the ribbon). I sampled pixel colours, measured type bboxes on full-resolution frames, computed a 100 ms audio RMS / spectral-centroid / low-band (<150 Hz) / high-band (>4 kHz) envelope, and fitted cuts to the onsets and to a 112.3 BPM grid. Numbers are measured unless marked [inferred]. Pixel distances are native 1138x640 unless a 1080p equivalent is given (x1.6875).

---

## 1. Summary

Lottieicon sells a library of animated line icons, delivered as Lottie JSON and After Effects (AEP) files. The film is a **44 s dark-mode "asset-library launch reel"**. Everything sits on a black canvas lit by drifting deep-green radial blobs, with **one neon accent green (#38D037)** and white. It works in two registers that alternate:

1. **Kinetic statement cards** (13 of 25 shots; 15 if the two number-counter cards, shots 10 and 12, are counted as text). These are centred geometric-sans lines on the moving gradient: "Introducing", "Animated icons library", "For *Designer* / *Developers* / *Video Editor* / *Creator*" (italic serif swap), "Available 5+ variations", "Premium quality animation", "Easy to use", "Make your project more interactive", "with our animations.", "So", "Why wait?", "Let's go!". Every card uses one of three reveal mechanics: a staggered word fade, a type-on that **auto-shrinks to fit width**, or a hard text swap. Most also end on an **ease-in shrink that "sucks" into the cut**.
2. **Product-as-motion demos** (8 shots: 9, 11, 13-16, 18, 25; the remaining 4 are the bell hook, the logo and the two counters). These show the icons themselves animating: a full-screen icon wall revealed by a **lens-distortion zoom-out**, a white toolbar pill and an app tab bar whose icons play their micro-animations under a **green emissive under-glow**, a **3D extruded card carousel** of 50+ categories, a "planet-horizon" dome with "Get both AEP + JSON", a two-row ribbon of style variations, and the hero moment: a **"hop-and-hold" virtual-camera tour** across the icon grid, gliding from one green-highlighted animated icon to the next.

The film opens on a notification bell that zooms through camera (x1.36 scale per frame for 10 frames, on the loudest sub boom of the intro). It closes on a circle-to-search-pill morph that types "www.lottieicon.com", surrounded by floating icon bubbles that **rack-focus** in. Its strongest craft signature is **SFX locked to motion rather than cuts**: sub booms land at the *peak velocity* of each camera move (within about 3 frames), and a high-band whoosh sits on the ribbon's peak velocity (the role-word swaps carry only faint high-band accents). The music itself is only loosely beat-cut. Its biggest weaknesses are a **sub-HD, compression-blocked delivery**, unreadable micro-text, **music that ends 3.7 s before the picture**, and **no final logo lockup**.

## 2. Creative Direction

| Aspect | Observation |
|---|---|
| Concept | "The motion is the product." Each product shot is a stage on which the icons perform their own Lottie animations. The pitch moves through who it's for, how many, how many categories, which formats, how many styles, how good, how easy and where to get it. |
| Visual language | Black void plus a slow green "aurora" mesh gradient. White line icons (2 px-style strokes). One emissive brand green used for glow, highlight tiles, extruded card edges, chips and bubbles. Bright white/grey UI surfaces (toolbar pill, app panel, category cards, search pill) that read like light sources on black. |
| Personality | Energetic, confident, "creator-tool" friendly. It is punchy rather than serene, closer to a startup hype reel than an Apple-style film. |
| Tone | Imperative, salesy, short copy ("Why wait?", "Let's go!"). Numbers as proof ("4,863+", "50 + Categories", "5+ variations"). |
| Positioning | About 40% playful/energetic, 30% technical (UI components, file formats, grids), 25% premium (restraint in colour, glow, eases) and 5% cinematic (dome horizon, DOF bubbles, zoom-through). |
| Consistency | High in colour and type: one accent and one sans family across all 25 shots. The background gradient persists through every cut and works as the continuity glue. The italic serif appears only on the four role words, a deliberate accent that is never reused. |
| Art-direction rule | **Green = the product's "life".** Anything animated, selected or "on" gets the accent: highlighted tiles, glow, card edges, chips, bubbles. White = UI surfaces and type. Black = space. |

## 3. Story Structure

| Stage | Start-end (s) | Dur (s) | Purpose |
|---|---|---|---|
| Hook | 0.00-1.20 | 1.20 | A notification bell fades up, rings, then zooms through camera on a sub boom. It says "something new" with zero copy. |
| Announcement | 1.20-2.63 | 1.43 | "Introducing" travels along an arc, snaps up in scale, then shrinks into the cut. |
| Brand reveal | 2.63-4.57 | 1.93 | The green app tile pops in and the glyph draws in. The "Lottieicon" wordmark wipes in left to right, steps up in scale on two beats, then whips out to the right. |
| Category definition | 4.57-5.43 | 0.87 | "Animated icons library". The words fade in and the word spacing opens up. |
| Audience | 5.43-7.30 | 1.87 | "For Designer / Developers / Video Editor / Creator". The variable word swaps every 15 frames (0.5 s); the first card holds 11 f. |
| Proof by volume | 7.30-12.17 | 4.87 | The icon wall is revealed by a lens-distortion zoom-out, dims to a texture, and a linear counter runs 43 → **4,863+**. |
| Product in context 1 | 12.17-14.73 | 2.57 | A white toolbar pill slides in with an animated icon set and a green under-glow. |
| Breadth | 14.73-18.83 | 4.10 | "0 → 50 + Categories" counter, then a 3D card wipes through the text and 12 category cards flip up in a carousel. |
| Product in context 2 | 18.83-21.00 | 2.17 | An app panel's tab bar with animated icons. The glow area builds ≈x9.5 into the cut. |
| Format benefit | 21.00-22.33 | 1.33 | An icon-covered dome rises like a planet horizon: "Get both / AEP + JSON". |
| Variety | 22.33-25.50 | 3.17 | "Available 5+ variations", a two-row variation ribbon and six style chips (Fill, Two Color, Two Tone, Regular, Light, Gradient). |
| Quality (hero) | 25.50-33.20 | 7.70 | "Premium quality animation", then a 6.07 s camera tour that zooms in, makes 3 hop-and-hold pans across highlighted animated icons, and pulls back. |
| Benefit statement | 33.20-38.00 | 4.80 | "Easy to use" → "Make your project more interactive" → "with our animations." |
| Climax / urgency | 38.00-39.07 | 1.07 | "So" (≈44% H em hero word) → "Why wait?" → "Let's go!" at 10-12 frames each. |
| CTA / end | 39.07-44.27 | 5.20 | A circle morphs into a search pill, "www.lottieicon.com" types on, a loading spinner appears, icon bubbles float in with DOF, then a ≈33-frame fade to black. |

Proportions: hook plus brand is 10% (4.6 s). Positioning is 6% (2.7 s). Feature and proof blocks are 58% (25.9 s). The benefit statement is 11%. The climax is 2.4%. The CTA is 12%. There is **no closing logo lockup**: the brand mark is on screen for only 1.9 s, at 2.6-4.6 s.

## 4. Shot-by-Shot

The detector found 14 segments (10 hard cuts and 4 seamless changes). Because the gradient background persists, it missed every text-only change on the same background: 2.633, 4.567, 5.433, 5.80, 6.30, 6.80, 9.833 (crossfade), 16.10 (object wipe), 34.333, 36.367, 38.00, 38.333, 38.667 and 39.067. Its 18.63 "seamless" change is really the card stack's exit, and the actual cut is at 18.833. Its 23.57 change is the peak velocity of the ribbon rise, not a cut. Its 42.67 and 43.9 changes are the fade-out. I placed every cut to the exact frame with a per-frame difference pass. **Corrected list: 25 shots.**

| # | Time (s) | Dur | Composition / framing | Camera | Object / UI / text movement | Depth & layering | Lighting / background | Palette | Typography | Transition out | Ease | Blur / glow / shadow / grain / DOF / parallax / 2D-3D |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0.00-1.20 | 1.20 | Single icon dead centre, bell 77-78 px tall (12% H) | Locked, then a zoom-through (object scale, not camera) | f0 black. The bell fades in over f1-f7 (opacity ≈17% → 100%) while rising ≈95 px (≈15% H, ease-out; centre-y deltas 35, 27, 16, 10, 5, 2 px). It sits slightly high, then drops 27 px (4% H) to exact frame centre over f12-f15. Through f7-f25 it sways ±12 px horizontally (≈9-10 f period), the "ring" wobble. **Zoom: f26-f36. Height 79→93→119→158→215→293→400→549 px over f26-f33 (x1.36/frame); the bell fills the frame height at f34 and the full width by f36.** Strokes exit as giant white bars by f37-f38. | 1 layer over bg | Pure black; the green aurora fades up over 0.63-1.00 s (11 f) | #000, white, green #0B2E0B | none | Zoom-through into the bell's hollow interior. The white strokes act as a 2-3 f wipe. | Fade/rise ease-out. Zoom ease-in for 3 f, then constant-ratio exponential. | No motion blur on the zoom. 2D vector. |
| 2 | 1.20-2.633 | 1.43 | Centred word | Locked | "Introducing" builds letter by letter along a downward arc that flattens (1.20-1.73, ≈22 letters/s). At small size (280 px wide) it then **snaps +52% in 6 f** (288→437 px; deltas 21, 62, 37, 17, 8, 4). Hold 8 f. **Ease-in shrink -28% in 8 f** (436→312; deltas ≈4, 4, 8, 12, 12, 20, 28, 36), then cut. | Text over gradient | Green blobs drifting | Deep greens #061C07-#123E12, white | Geometric sans Medium, peak 13.6% H em (≈147 px @1080) | Suck-in hard cut to the logo tile | Snap: fast ease-out with peak on frame 2. Exit: ease-in (expo). | Flat. Gradient continuity. |
| 3 | 2.633-4.567 | 1.93 | Logo lockup centred, 41% W, tile 9.2% H | Locked; virtual scale bumps | Green tile (no glyph) at f0. The glyph draws in over ~10 f. Wordmark wipes in L→R (2.73-2.97, 7 f). Settles, with a slight shrink of -3% over 0.4 s. **Beat step +15% in 4 f at 3.47** (onset 3.46) and **+5% in 3 f at 4.03** (next beat). **Whip exit right: x deltas 2, 3, 5, 8, 11, 17, 25, 42 px (half-res) over 8 f.** | Tile plus wordmark | Same aurora | Accent #2EC130 tile, white | Wordmark same sans, ≈+3% tracking | Hard cut on the onset at 4.55 (Δ0.5 f) | Steps: ease-out. Exit: ease-in. | Flat 2D |
| 4 | 4.567-5.433 | 0.87 | Centred line | Locked | 1 blank frame. "Animated", "icons" and "library" fade in with a 3-4 f stagger, starting with **zero word spacing**. The spacing opens to normal over ~12 f (4.93-5.27). | Text | Aurora | Greens, white | Sans Regular/Medium, ≈6% H em | Hard text swap | Ease-out | Flat |
| 5 | 5.433-5.80 | 0.37 | "For *Designer*" centred, 32% W | Locked | "For *Designer*" first appears ≈20% large and settles in ≈7 f. On each later swap the role word enters tilted about -6° and ≈4 px low, then settles in 3-4 f. In the last 2-3 f before each swap the outgoing role word lifts and tilts out. | Text | Aurora (blob moves visibly frame to frame) | White on green | "For" sans plus **serif italic** role word. Em ≈8.9% H (≈96 px @1080). | Swap (2-3 f tilt-out, then cut) with a faint high-band accent [weak] | Ease-out settle | Flat |
| 6 | 5.80-6.30 | 0.50 | "For *Developers*" | Locked | Same tilt-drop settle | Text | Aurora | same | same | Swap plus faint high-band accent (5.85 s) [weak] | Ease-out | Flat |
| 7 | 6.30-6.80 | 0.50 | "For *Video Editor*" | Locked | Same | Text | Aurora | same | same | Swap plus faint high-band accent (6.30 s) [weak] | Ease-out | Flat |
| 8 | 6.80-7.30 | 0.50 | "For *Creator*" | Locked; text slowly grows ≈+10% | Same | Text | Aurora | same | same | Hard cut on the onset at 7.24 (Δ1.8 f) | Linear push | Flat |
| 9 | 7.30-9.833 | 2.53 | Full-bleed icon wall, white line icons (≈13 cols x 7 rows at rest) | **Lens-distortion zoom-out**: about 6 columns visible at f0 with a strong barrel bulge, 9 cols at 7.47, 12 at 7.73, 13 at 8.0. Then a slow drift until 9.8. | Every icon loops its own Lottie animation | 1 plane plus barrel warp | Black, with green showing through around the icons 7.5-8.5 s | White on black, green tint | none | **Dim-to-texture crossfade**: the grid drops to ~15% opacity in 3 f behind the counter | Expo-out zoom (≈20 f). The bulge relaxes in ≈6 f. | Optics-compensation style warp [inferred AE]. No blur. |
| 10 | 9.833-12.167 | 2.33 | Two centred lines over the dimmed grid | Locked | **Count-up 43 → 4,863 at ≈2,600/s (linear, ≈87 per frame) over 9.933-11.800.** "Free & premium / animated lottie icons" words fade and drift in (10.07-10.40). Block height 62→50 px (ease-out), hold, then an **ease-in shrink 11.9-12.1** into the cut. | Text over 15% grid texture | Dim aurora | Greens, white | 2 lines, em ≈8.2% H (≈89 px @1080), leading ≈1.2 | Suck-in hard cut (2.0 f after onset 12.10) | Linear count. Ease-in exit. | Texture layer reads as depth |
| 11 | 12.167-14.733 | 2.57 | White toolbar pill, left-cropped by frame edge, at y≈50%, 4 square icon buttons | Locked | **Cut into motion.** The pill is already sliding right. Right edge (half-res) 282, 292, 300, 307, 312, 316, 320, 323, 325, 328, 330... settles at 343 by 13.0 (**25 f expo-out, half the travel in 4 f, total 122 px = 10.7% W**). The icons play micro-animations in sequence (pin drop, pen scribble, hand, book), each ≈10-15 f, looping. | Pill plus under-glow | **Pure black bg.** The green glow under and right of the pill builds and sweeps. | #F5F7F5 pill, #E8EAE8 buttons, glow #38D037 | none | Hard cut (Δ2.3 f to onset 14.81) | Expo-out | **Emissive glow** ≈10% H falloff. Soft shadow. 2D. |
| 12 | 14.733-16.10 | 1.37 | Centred line | Slow push ≈+10% (15.7-16.07) | **Count 0 → 50 linear, 1.72/frame, 29 f**, ending hard. Then hold and push. | Text | Aurora | Greens, white | "50 + Categories", em ≈10% H (≈109 px @1080) | **Object wipe:** a 3D card flips in through the text | Linear | Flat |
| 13 | 16.10-18.833 | 2.73 | Vertical stack of white cards, centred | Constant upward scroll (crane-up feel) | **Card 1 enters edge-on (green sliver) between letters and rotates 90°→0° on Y in 8 f (16.10-16.37)** while growing to ≈45% W and occluding the text. Cards 2-12 follow, each flipping up from the bottom edge-on, on a **variable stagger: ≈9-10 f for cards 2-4, tightening to 2-4 f for cards 5-9, then 5-7 f for the last three (average ≈5.5 f)**. At 18.2-18.8 the bg dims (mean G 71→37) and the last two cards exit up. | **2.5D extruded slabs** (white face, green 6-8%-thick edge), perspective tilt ≈10-15° | Aurora → black | White, #38D037 edges | Card labels in sans SemiBold, ≈3% H | Hard cut on the black-out (18.833) | Ease-out flip, linear scroll, ease-in exit | Real 3D layers. No blur. |
| 14 | 18.833-21.00 | 2.17 | Grey app panel (55% W) cropped at the top. White screen plus a 5-icon tab bar. | Locked | The panel slides up 7.5% H (deltas 13, 5, 3, 2 px half-res, ~6 f ease-out) and holds. Tab icons animate one after another. **Glow area grows ≈x9.5 (2.5k→23.9k px half-res on the last frame, 20.967) over 2.1 s, accelerating after 19.9 s.** | Panel plus halo | Black | #CACACA bezel, white, glow #2B9D2A→#38D037 | none | **Light-build into hard cut** on the frame with the largest glow area | Ease-out entry. Ease-in light ramp. | Emissive halo. 2D. |
| 15 | 21.00-22.333 | 1.33 | Icon field wrapped on a curved surface. A black dome rises from bottom centre. | Low "horizon" angle [inferred]; slow rotation of the field [inferred] | **Dome rim rises from 88% H to 58% H: deltas 23, 12, 9, 8, 6, 7, 3, 4... (half-res), 22 f expo-out, 30% H travel.** "Get both" plus a green pill "AEP + JSON" ride on the dome. | Fore dome, background icon sphere | Black, green rim glow | White icons, #38D037 rim/pill | "Get both" ≈3.5% H, pill ≈1.5% H | Hard cut (22.333, Δ0.8 f to onset) | Expo-out | Rim glow. 2.5D curvature. |
| 16 | 22.333-25.50 | 3.17 | Line in the upper third, two-row tile ribbon below, chip row | Locked | ≈9 f empty bg. "Available", "5+" and "variations" fade in with a 2-4 f stagger. **The ribbon rises from the bottom: top row 319→115 px half-res in 32 f, S-curve, peak 21 px/f (6.6% H/f) at 23.53-23.57.** The text is pushed up. Six green chips pop in L→R at a 2-3 f stagger (23.7-24.1). The rows marquee slowly and tiles cycle styles. The block whips up in 3-4 f (25.33-25.47). | 3 layers (text, ribbon, chips) | Aurora | White tiles #E8EAE8, green fills, chips #39CD39 | Line em ≈7% H. Chips ≈1.5% H (unreadable). | Whip-up, then a blank-frame hard cut | Ease-in-out (rise), ease-out (chips), ease-in (exit) | Whoosh at peak velocity. Flat. |
| 17 | 25.50-27.133 | 1.63 | Centred line, 53% W | Locked | "Premium" fades in (3 f), then "quality" (+3 f) and "animation" (+5 f), each sliding in from slightly low-right. Hold 0.5 s. **Ease-in shrink -24% over 18 f (301→229; deltas 2→22)** into the cut. | Text | Aurora | Greens, white | em ≈7.8% H (≈84 px @1080) | Suck-in hard cut → lens-distortion grid | Ease-out in, ease-in out | Scale continuity into the next zoom-out |
| 18 | 27.133-33.20 | 6.07 | Icon grid; 1-3 icons sit in glowing green rounded tiles | **Virtual camera tour.** Lens zoom-out settle (≈7 f), then a **zoom-in plus pan S-curve 27.40-28.47 (32 f, tile 37→84 px = 2.27x, ease-in 14 f then expo-out 18 f)**. Hold ≈9 f. **Pan 1 28.80-29.87 (≈32 f)**, hold ≈20 f, **pan 2 30.57-31.30 (≈22 f)**, hold ≈20 f, **pan 3 32.03-32.57 (≈17 f)**, hold ≈7 f, **pull-back 32.80-33.17 (tile 88→54, ease-in 11 f)**. (Phase-correlation pan tracking; move = speed >2 half-px/f.) | The selected icon loops (refresh arrows, eraser, trophy, camera). Neighbours loop too. | 1 plane. Tiles have glow. | Black | White, #38D037 tiles | none | Pull-back, then a hard cut into "Easy to use" entering at ≈2.1x and ≈25% opacity (scale match) | Symmetric expo in-out S-curves (peak ≈4-5x the average speed). Peak speed rises move by move: ≈8%, ≈10%, ≈27% and ≈22% W per frame. | **No motion blur**, even at 22-27% W/f (pans 2-3 are effectively whip-pans). Tile glow ≈20% of tile size. |
| 19 | 33.20-34.333 | 1.13 | Centred phrase, 26% W at rest | Locked | Enters on the cut frame at **≈2.1x and ≈25% opacity** (width 636 px) and decelerates to 1.0x (296 px) over ≈18 f (full-res widths 636, 565, 513, 475, 443, 417, 397, 379, 363, 351...; it passes 1.45x at 33.33 and is fully opaque by ≈33.37). Hold ≈8 f (33.83-34.07), then an 8 f ease-in rise of ≈19 px (3% H) with a fade-out (34.07-34.30), then cut to blank. | Text | Aurora | Greens, white | "Easy to use", em ≈8.7% H (≈94 px @1080) | Rise-and-fade exit, then 2 blank frames (34.333-34.40), then type-on | Expo/cubic ease-out in, ease-in out | Opacity ramp only |
| 20 | 34.333-36.367 | 2.03 | One line, grows to 69% W | Locked | **Type-on at 51 chars/s** ("Make your project", 17 chars in 10 f). **Auto-fit: the line height (ascender-to-descender bbox) shrinks 41→31 half-px as the width hits ≈50% W.** Pause ≈15 f. "more interactive" types at 40 chars/s (12 f) while the height shrinks 31→21 (x0.68). The width overshoots to 407 and settles at 395 in ~5 f. Hold 15 f. | Text | Aurora | Greens, white | Starts em ≈10.8% H (≈116 px), ends ≈7.3% H (≈79 px @1080) | 2 blank frames, then type-on | Fit-to-width ease-out | Flat |
| 21 | 36.367-38.00 | 1.63 | One line, 40% W final | Locked | "with our animations." types at ≈55 chars/s while shrinking from 40 to 16 half-px tall (-60%) over 0.9 s, then holds 20 f | Text | Aurora | Greens, white | Final em ≈6.7% H (≈72 px @1080) | Hard cut on the onset at 38.01 (Δ0.3 f) | Ease-out shrink | Flat |
| 22 | 38.00-38.333 | 0.33 | **"So": cap height 31% H, em ≈44% H (≈470 px @1080)** | Locked | Static hero word, 10 f | Text | Aurora | White | Sans Medium | Hard swap | n/a | Flat |
| 23 | 38.333-38.667 | 0.33 | "Why wait?", 44% W | Locked | Static, 10 f | Text | Aurora | White | em ≈16.7% H (≈180 px) | Hard swap | n/a | Flat |
| 24 | 38.667-39.067 | 0.40 | "Let's go!", 24% W | Locked; slight shrink | 12 f | Text | Aurora | White | em ≈11.6% H (≈125 px) | Hard cut to shape | n/a | Flat |
| 25 | 39.067-44.267 | 5.20 | Search pill centred. Six to eight green icon bubbles around it. | Locked; the bubbles float | **The white circle (32.5% H) shrinks to 16.6% H in 6 f (deltas 22, 9, 7, 5, 4, 4: expo-out).** The glyph animates magnifier → loading arc → magnifier. **It morphs to a pill in ~7 f (39.47-39.70)**, auto-width. "www.lottieicon.com" types on at ≈23 chars/s (39.73-40.53). The left icon becomes a **spinner** (≈40.40+). Bubbles enter large and **defocused** from the bottom corners and shrink and sharpen as they settle (39.2-40.5), then drift. **Fade to black ≈43.10-44.20 (≈33 f, ≈linear).** | Pill fore, bubbles in 2-3 depth bands | Aurora, brighter green blobs | #38D037 bubbles, white pill | URL ≈2% H (barely legible at 640p) | Fade to black | Expo-out shrink, ease-out morph, linear fade | **DOF rack-focus on the bubbles.** Mild parallax float [inferred]. |

**Phase-2 attributes not carried by a table column (film-wide answers)**

| Attribute | Observation |
|---|---|
| Angle | Frontal/eye-level on every 2D card and UI shot. Shot 13 views the card column from slightly below with ≈10-15° perspective tilt. Shot 15 reads as a low "horizon" angle [inferred]. Shots 9 and 18 view a flat grid plane head-on. |
| Scale | Given per shot in the movement column (bell x20 zoom, "Introducing" +52%/-28%, logo +15%/+5%, tour 2.27x zoom-in and -38% pull-back, "Easy to use" ≈2.1x → 1x, auto-fit shrink x0.68, CTA circle 32.5% → 16.6% H). |
| Perspective | Flat/orthographic except shot 13 (true 3D card slabs), shot 15 (curved dome and icon field) and the barrel lens warp at the starts of shots 9 and 18. |
| Motion rhythm / speed changes | No time-remaps or speed ramps on footage (everything is vector animation). Speed changes come from eases. Within the tour, peak speed escalates ≈8 → 10 → 27 → 22% W per frame. |
| Reflections | None observed (n/a). |
| Grain / texture | No grain or dither; only compression banding and macro-blocking in the dark gradients (see Visual Quality). |
| Motion trails | None (no echo, trails or motion blur anywhere) (n/a). |
| UI-to-3D transitions | 12→13: flat headline → 3D card slab (object wipe). 14→15: flat app panel → curved 3D dome (light-build hard cut). |
| Match cuts | Scale/motion matches only: 2→3 (word shrinks into the logo tile) and 18→19 (pull-back → shrinking title). No graphic shape-match cuts; 24→25 (text → circle) is a hard cut to a shape. |
| Morphing | Circle → search pill (25). Glyph-level Lottie morphs (magnifier ↔ arc ↔ spinner) in 25. No object-to-object morphs. |
| Mask transitions | None as such; the bell's hollow interior acts as a portal revealing shot 2 (1→2). |
| Camera wipes | None (n/a). |
| Object wipes | 12→13 (card through text); 1→2 (bell strokes sweep off as white bars). |
| Zoom / perspective transitions | 1→2 zoom-through; 8→9 and 17→18 lens-distortion zoom-out reveals; 18→19 pull-back hand-off. |
| Scene continuity | The drifting green aurora persists through every text card; UI and grid shots switch to pure black. One accent green and one sans family throughout. |
| Shadows / DOF / parallax | Soft shadow and under-glow only on the toolbar pill (11). DOF only on the CTA bubbles (25). Parallax only as the bubbles' float [inferred]. |

**Why the important shots work**
- **Shot 1 (bell zoom-through).** The bell is a universal "new notification" sign, so the hook needs no text. Constant-ratio scaling (x1.36 per frame) reads as a dolly *into* the object. The sub boom peaks at 1.1 s, the exact frames the bell fills the screen, so the zoom feels physical.
- **Shots 2-3 (snap, shrink, cut, then the logo).** The word shrinks into the frame where the logo tile appears, which is a scale handoff. The logo then "breathes" up in two beat-locked steps, so a static lockup feels alive and musical.
- **Shots 5-8 (role swaps).** The serif italic is the only serif in the film. It marks the variable and makes four near-identical cards feel designed rather than templated. The 15-frame cadence is close to the 112 BPM beat (16 f), so the swaps feel rhythmic even though they are not onset-locked.
- **Shots 9-10 (wall, then dim, then counter).** The audience sees the proof (thousands of animating icons) *before* they read the number. Dimming the wall to 15% keeps it as evidence behind the stat instead of cutting it away.
- **Shot 13 (card wipe and carousel).** The first card physically pushes through the "50 + Categories" text, which is an object wipe that converts the claim into the content. The green extruded edges make flat UI cards read as 3D at very little cost.
- **Shot 14 → 15 (light build → dome).** The glow keeps intensifying (≈x9.5 in area) until the cut, so the hard cut feels like a release of built-up energy.
- **Shot 18 (camera tour).** This is the hero. The product's quality is demonstrated, not claimed: the camera parks on one animated icon at a time, lets it play for ≈7-20 f, then glides on. Each glide gets a sub boom at peak velocity.
- **Shots 20-21 (auto-fit type-on).** Text that shrinks as it grows keeps the line inside a constant visual "box" (≈50-70% W). That gives typing energy without layout jumps.
- **Shots 22-24 → 25.** Three 10-12 f cards accelerate the edit into the CTA. Then the circle-to-pill morph turns "Let's go!" into a literal action (search, type, load).

## 5. Frame-by-Frame Studies

### Study A: Hook bell and zoom-through, 0.00-1.47 s (30 fps)
- f0: pure black (one frame only; the bell is already faintly visible at f1).
- f1-f7: the bell fades from ≈17% to 100% opacity and rises ≈95 px (≈15% H) with an ease-out (centre-y 386 → 351 → 325 → 309 → 299 → 294 → 292 px). Size is constant at ≈60x78 px.
- f8-f25 (≈0.6 s): the bell sways ±12 px horizontally (the "ring", period ≈9-10 f) and, over f12-f15, drops 27 px to exact frame centre (y 320), where it stays. The green aurora fades in from black over f19-f30 (0.63-1.00 s).
- **f26-f36 zoom.** Height goes 75 → 79 → 93 → 119 → 158 → 215 → 293 → 400 → 549 px, then the bell is wider than the frame (1137 px) by f36. The frame-to-frame ratio is 1.05, 1.18, 1.28, 1.33, 1.36, 1.36, 1.37, 1.37. That is **3 frames of ease-in, then a pure exponential at x1.36/frame**: about a 20x scale in 10 f (333 ms).
- f34-f38: the bell's stroke is now ≈100 px thick and sweeps off both sides like a split wipe. "Intr..." is already starting inside the hollow at f36.
- Audio: low-band energy is 0.79-1.00 from 0.8-1.3 s, with RMS peaking at **-6.2 dB at 1.1 s**, the loudest moment of the first 27 s.
- Why it works: an exponential zoom has constant *perceived* speed (log-scale linear), so it reads like the camera flying into the icon. The boom's peak sits in the 2-3 frames when the frame is "filled", which sells the impact.

### Study B: "Introducing" → logo, 1.00-4.87 s (30 fps)
- Arc type-on (1.20-1.73): letters appear one by one, each placed lower and rotated along a downward arc that progressively flattens into a straight baseline. About 22 letters/s.
- **Scale snap (1.867-2.067):** width 288 → 309 → 371 → 408 → 425 → 433 → 437 px (+52%). The deltas are 21, 62, 37, 17, 8, 4, so velocity peaks on the 2nd frame and then decays. It is a 6-frame "pop" with no overshoot.
- Hold 2.07-2.33 (8 f) at 437 px wide (38% W, em ≈13.6% H).
- **Shrink (2.333-2.600, 8 f):** deltas ≈4, 4, 8, 12, 12, 20, 28, 36 px (re-measured from half-res bboxes; the earlier 9-delta list did not fit the 8-frame span), which is a classic expo-in. The width falls to 312 px (-28%). **Hard cut at 2.633** to the green tile, on a sub hit (-8.2 dB, low-band 0.95 at 2.6 s).
- Logo: the empty tile at f1 (2.633). The glyph animates in ≈10 f. "Lottieicon" letters fade and wipe left to right in **7 f**. The lockup is 185 px (half-res) wide at 3.0 s and creeps to 180 by 3.43 (-3%). **Step at 3.47-3.60: 180 → 207 px (+15%, 4 f ease-out)** on onset 3.46. Creep to 220. **Step at 4.03-4.10: 220 → 231 (+5%, 3 f).**
- **Exit (4.30-4.53):** the left edge moves 176 → 179 → 184 → 192 → 203 → 220 → 245 → 287 half-px (deltas 3, 5, 8, 11, 17, 25, 42). That is an 8-frame ease-in whip to the right (the logo is still on screen at 4.533), then a cut at 4.567 to one blank frame, on a sub (-9.3 dB at 4.5 s) and onset 4.55.
- Why it works: the logo is never static, but every move is either *on a beat* (steps) or *into a cut* (whip). The motion has a reason each time.

### Study C: "Animated icons library" and the role swaps, 4.60-7.40 s (15 fps)
- The three words fade up with a 3-4 f stagger, starting **jammed together with no word spaces**. The spacing opens to normal over 4.93-5.27 (~12 f, ease-out). It is a tracking/word-space reveal.
- Role swaps are hard cuts at 5.433, 5.800, 6.300 and 6.800. Durations are 11, 15, 15 and 15 frames (≈0.94 of a 112.3 BPM beat). On each swap the outgoing italic word lifts and tilts out over the last 2-3 f, the new one appears ≈-6° tilted and ≈4 px low and settles in 3-4 f, while "For" stays fixed. (The first card, "For Designer", instead enters ≈20% large and settles in ≈7 f.)
- The >4 kHz *share* spikes (0.30-0.69) at 5.9-6.0, 6.4 and 6.8 s fall in level dips (-25 to -31 dB) where the music's low end drops out, so they are not swishes by themselves. The absolute >4 kHz level shows only small local peaks (+2-5 dB) at 5.85, 6.30 and 6.85 s, 0-2 f after each swap. That is consistent with a faint swish or simply hi-hats [weak evidence].
- Why it works: the fixed anchor word plus the swapping variable makes a "slot machine" list. Four audiences cost 1.9 s.

### Study D: Icon-wall reveal and counter, 7.20-12.30 s (30/15 fps)
- 7.300 hard cut into a heavily barrel-distorted close grid (about 6 columns visible, edge icons smeared into arcs). The bulge relaxes in ≈6 f while the grid zooms out: 9 columns at 7.47, 12 at 7.73, 13 at 8.0. That is an **expo-out of ≈20 f**, then a ~5% creep to 9.8 s.
- 9.833: a 3-frame dim of the grid to ≈15% opacity (diff peak 8.6). "43 +" appears.
- **Counter:** 43 → 130 → 217 → 304 → 391 → 478 → 564... in steps of ≈87 every frame (≈2,600/s), from 9.933 to 11.800 (1.87 s, 56 f). It is perfectly linear (4,733 → 4,820 → 4,863: the last step is clamped) and stops dead at 4,863. "Free & premium" and "animated lottie icons" words fade and slide in at 10.07-10.40.
- Text block height 62 → 50 px (half-res) over 10.3-11.0 (ease-out settle). Hold. Shrink 50 → 46 px over 12.0-12.1 into the cut.
- Why it works: a linear count reads as "machine tally" (honest), and the hard stop gives the number weight. The dimmed wall makes the number concrete.

### Study E: Toolbar pill with under-glow, 12.10-14.80 s (15 fps plus per-frame tracking)
- The cut lands **mid-move**: the pill's right edge is at 282 px (half-res) on the first frame. The sequence is 282, 292, 300, 307, 312, 316, 320, 323, 325, 328, 330, 332, 333, 335, 336, 337, 338, 339, 340, 340, 341, 341, 342..., settling at 343 by 13.0 s. That is **expo-out, 25 f, 122 px (10.7% W) total**, with 50% of the travel done in 4 f.
- Icons animate one at a time (pin, then pen, then hand, then book), each loop ≈10-15 f, and the set repeats at ≈13.5 s.
- The green glow bleeds from under the pill's bottom-right and grows over ~1 s, so the pill reads as lit from below by the brand colour.
- Why it works: cutting *into* an ease-out hides the start of the move and makes the edit feel faster than it is. The icons demonstrate themselves inside a believable UI component.

### Study F: Categories counter, card wipe and carousel, 14.70-19.00 s (30 fps, cropped wipe)
- Count 0 → 50 at a constant 1.72/frame over 29 f (14.733-15.700), then a slow push.
- **Card wipe (16.10-16.37):** a green vertical sliver (the card's edge, ≈4% crop width) appears *between* "Ca" and "tegories". Over 8 f it rotates on Y to face camera, grows to ≈45% W and rises slightly. The text is occluded progressively and is gone by f11 (16.37).
- Carousel: 12 cards (User Interface, Sales and Marketing, Virtual reality, Online Shopping, Home Decoration, Food and Restaurant, Archives & folders, Grid & alignment, Network & Servers, Random Misc, Random Misc again (a duplicated label), Transportation). Entries start at 16.10, 16.40, 16.73 and ≈17.03 (≈9-10 f apart), then bunch up at 2-4 f (≈17.13-17.53) and spread again to 5-7 f (≈17.70, 17.93); the average stagger is ≈5.5 f. Each flips from edge-on at the bottom while the whole column scrolls up at a near-constant speed. Card faces show the label; the green slab edge shows the extrusion.
- 18.2-18.8: the bg green dims by half (mean G 71 → 37, 18 f) and the last two cards slide up out of frame (ease-in). Cut at 18.833 into the panel.
- Why it works: the flip makes each card a micro-event (on/off light change from green edge to white face). The constant scroll gives it a "list that never ends" feeling, which is the message (50+).

### Study G: Panel glow build and dome rise, 18.90-22.50 s (30 fps)
- Panel: the bottom edge rises 236 → 223 → 218 → 215 → 213 → 212 px (half-res): a ~6 f ease-out slide-up of 7.5% H. The width stays constant at 55% W.
- **Glow area** (pixels with G-R > 60): 2,497 → 3,052 → 3,653 → 4,336 → 4,800 → 5,324 → 5,732 → 6,188 → 7,081 → 9,316 → 11,148 → 13,450 → 14,547 → 15,181 → 16,512 → 19,464 between 18.87 and 20.87 s, then 23,850 on the last frame (20.967). That is x7.8 by 20.87 and ≈x9.5 by the cut, accelerating after 19.9 s. The cut lands on the frame with the largest glow area (21.000, diff 94.3, the largest frame change in the film); overall frame luma does not peak there, because the bright panel dominates it.
- **Dome:** the rim appears at 21.13 at y = 88% H and rises to 58% H by 21.87 (deltas 23, 12, 9, 8, 6, 7, 3, 4, 3, 5, 3, 3, 1, 2, 1...). That is a 22 f expo-out with 70% of the travel in 8 f. A sub hit (-8 dB) lands at 21.2 s, at the dome's first fast frames.
- Why it works: build, then release. The glow ramp is an *anticipation* for the cut, and the dome rising like a horizon gives the format message ("Get both") a cinematic, planetary scale.

### Study H: Variations ribbon, 22.30-25.60 s (15 fps plus tracking)
- About 9 f of empty gradient (22.333-22.63) form a breath before the words. "Available", "5+" and "variations" fade in with a 2-4 f stagger.
- **Ribbon rise:** the top row of tiles goes 319 → 315 → 311 → 306 → 300 → 293 → 285 → 276 → 265 → 251 → 235 → 215 → 194 → 176 → 163 → 153 → 146 → 140 → 136 → 132 → 129 → 127 → 124... → 115 (half-res) over 23.17-24.23. The velocity ramps 4 → 21 px/f and then decays. It is an **S-curve of 32 f**, with peak velocity at 23.53-23.57. The peak sits at ≈37% of the move (12 f accelerating, ≈20 f decelerating; full-res top edge 638 → 229 px, peak 42 px/f). That is exactly where the detector logged a "seamless change" and where the absolute >4 kHz level peaks (+5-6 dB at 23.54-23.59 s, a whoosh).
- Chips pop L→R with a 2-3 f stagger at 23.7-24.1. Each rises about 10 px with a fade over ~6 f.
- The exit is a 3-4 f whip up (25.33-25.47), then 1 blank frame.
- Why it works: the whoosh is placed at max velocity, not at the start or end, which is where the ear expects air movement. The style chips name the variations right after the viewer sees them.

### Study I: Grid camera tour, 27.10-33.40 s (30/15 fps, green-tile tracking)
- Entry: the same lens-distortion zoom-out as 7.30, settling in ≈7 f.
- **Move 1 (27.40-28.47, 32 f):** the target tile's centre accelerates (x deltas 3, 5, 7, 10, 16 per 2 f) and the camera re-targets to the "refresh" tile. That tile then decelerates into centre (deltas 44, 32, 23, 17, 14, 10, 7, 5, 3, 1 per 2 f) while its size goes 62 → 84 px (half-res). The zoom is 2.27x overall. **Sub hit -2.6 dB at 27.9-28.0 s**, the loudest moment in the film, sits at the move's peak velocity (27.87-27.93).
- Hold 28.47-28.73 (8 f). The refresh arrows spin.
- **Move 2 (28.80-29.87, ≈32 f):** per-frame speed (phase correlation, half-res px) runs 1, 2, 3, 3, 4, 5, 6, 7, 9, 10, 12, 15, 19, 24, 30, 41, 54, **58**, 47, 35, 26, 20, 16, 14, 11, 9, 8, 6... (diagonal, up-left). The peak ≈58 half-px/f is ≈116 px/f full-res = **≈10% W per frame** (visually confirmed: the headphones icon moves ≈42 px left and ≈30 px down per half-res frame), then the "eraser" tile decelerates in. Sub hit -4.1 dB at 29.4 s (peak velocity at 29.30-29.33).
- Hold ≈20 f. **Move 3 (30.57-31.30, ≈22 f)** to the "trophy" tile: a near-perfectly symmetric expo in-out (speeds 1, 2, 5, 7, 10, 13, 18, 24, 33, 47, 70, 115, **155**, 114, 70, 47, 33, 24, 18, 14, 11, 8, 5, 3, 1 half-px/f), peak ≈27% W per frame at 30.93, sub at 30.8-30.9 s. Hold ≈20 f. **Move 4 (32.03-32.57, ≈17 f)** to the "camera" tile, peak ≈125 half-px/f (≈22% W/f) at 32.30, sub at 32.3 s. Hold ≈7 f.
- **Pull-back (32.80-33.17):** tile 88 → 87 → 85 → 82 → 76 → 67 → 54 px (ease-in, -38%). Hard cut at 33.200.
- Rhythm: moves shorten ≈32 → 32 → 22 → 17 f while peak speed climbs ≈8 → 10 → 27 → 22% W/f, and holds run ≈9 → 20 → 20 → 7 f, so the tour accelerates toward the exit.
- No motion blur on any move. Icons stay crisp even at ≈310 px/f (move 3), so moves 3-4 read as strobing whip-pans on playback [inferred from frames].
- Why it works: "hop-and-hold" gives each hero icon a spotlight moment (glow tile plus centre plus stillness) and makes the camera feel motivated, because it always travels *to* something. Booms at peak velocity give the moves weight without needing blur.

### Study J: Kinetic statements, 33.10-39.00 s (20 fps plus bbox tracking)
- "Easy to use": appears on the cut frame (33.200) at ≈2.1x and ≈25% opacity (low-threshold bbox 636 px wide). Full-res widths are 636, 565, 513, 475, 443, 417, 397, 379, 363, 351 ... 296 px: an **≈18 f expo/cubic ease-out** to rest (a white-threshold track only picks it up from 33.33, by which point it is at 1.45x). It holds ≈8 f, then exits with an 8 f ease-in rise (≈19 px) and fade (34.07-34.30), followed by 2 blank frames (34.333-34.40). The incoming shrink continues the *outgoing* pull-back's shrink (Study I), which is a scale-motion match across a hard cut.
- **"Make your project" type-on:** 17 chars in 10 f (≈51 chars/s). The height falls 41 → 31 px as the width saturates at ≈290 px (51% W). A ≈15 f pause follows (last character of "project" at 34.733, first "m" at 35.267). "more interactive" (16 chars, 12 f, 40 chars/s) pushes the width to 407 and the height to 21 px, and the width settles at 395 px (69% W) in ≈5 f. Hold 15 f.
- Blank 2 f. "with our animations." types at ≈55 chars/s while shrinking 40 → 16 px tall (-60%), then holds 20 f.
- Climax swaps: "So" (38.000, 10 f, cap height 201 px = 31% H), "Why wait?" (38.333, 10 f) and "Let's go!" (38.667, 12 f). "So" lands on onset 38.01 (Δ0.3 f).
- Why it works: the auto-fit keeps the composition stable while the content changes. The scale contrast from the tiny 6.7% H line to the 44% H "So" is the punctuation that resets attention before the CTA.

### Study K: CTA morph, 38.90-44.27 s (30/15 fps, cropped)
- 39.067 hard cut from "Let's go!" to a white circle 208 px across (32.5% H) holding a magnifier glyph.
- Shrink: 104 → 82 → 73 → 66 → 61 → 57 → 53 px (half-res). The deltas 22, 9, 7, 5, 4, 4 make it a **6 f expo-out** to 16.6% H, which then eases to ≈14% H. Meanwhile the glyph morphs magnifier → open arc → magnifier (a Lottie loop).
- **Pill morph (39.47-39.70, ~7 f):** the circle stretches horizontally into a pill. Its width then follows the URL as it types (first character at 39.73, last at 40.53: 18 chars, ≈23 chars/s). At ≈40.40 the magnifier becomes a **loading spinner**. There is no distinct audio tick here: the absolute >4 kHz level does not rise at 40.4 s; only its share rises because the music's low end drops out.
- Bubbles: large, soft-focus green discs enter from the bottom corners (39.2-39.7) and shrink, sharpen and drift into a loose ring (rack focus, foreground to midground). They carry animated glyphs (eye, tag, refresh, book, mail, speaker).
- Music: the level drops from -14 dB (40.0-40.5) to -39 dB (41.0-41.5) and reaches -56 to -62 dB by 43-44 s. **The music is effectively over 3.7 s before the picture ends.** The picture fades ≈linearly (mean luma 34 → 1) over ≈43.10-44.20 (≈33 f).
- Why it works: the CTA is shown as a *real action* (search, type, load) instead of a static URL card. The weakness is that it ends in silence, with no logo.

## 6. Motion Language observed

| Pattern | Where | Measured | Reads as |
|---|---|---|---|
| Exponential zoom-through | Bell (1) | x1.36/frame, 10 f, ≈20x | Energetic, "dive in" |
| Snap pop (no overshoot) | "Introducing" (2) | +52% in 6 f, velocity peak on frame 2 | Snappy, confident |
| Ease-in shrink into the cut ("suck-in") | 2, 10, 17, 18 (pull-back) | -24 to -38% over 8-19 f, per-frame deltas roughly doubling | Momentum carried across cuts |
| Beat-step scale bumps | Logo (3) | +15%/4 f, then +5%/3 f, on consecutive beats | Musical "breathing" lockup |
| Whip exits | Logo (3), ribbon (16), cards (13) | 3-8 f expo-in | Clean, decisive exits |
| Cut into motion | Toolbar (11) | 25 f expo-out; the cut lands mid-move | Faster-feeling edit |
| Tilt-drop settle | Role words (5-8) | -6°, +4 px → 0 in 3-4 f | Playful, handwritten energy |
| Word-space opening | (4) | 0 → normal spacing in 12 f | Elegant "assembling" |
| Linear count-up with a hard stop | (10, 12) | ≈2,600/s (87/frame) and 1.72/frame | Honest tally, emphatic stop |
| Edge-on flip-in of 3D cards | (13) | 90° → 0° in 8 f; stagger 9-10 f → 2-4 f → 5-7 f (avg ≈5.5 f) | Tactile, physical UI |
| S-curve rise / camera glide | Ribbon (16), tour (18) | 17-32 f; ribbon peak at ≈37% of the move, tour peaks at mid-move | Cinematic, weighty (the late tour moves read as whip-pans) |
| Light build | Panel (14) | glow area ≈x9.5 over 2.1 s | Anticipation |
| Auto-fit type-on | (20, 21) | 40-55 chars/s; width capped at 50-70% W | Live, kinetic, stable layout |
| Shape morph | CTA (25) | circle → pill in ~7 f | Product-UI realism |
| Ambient constant motion | Background on all shots | The aurora blobs reposition continuously [inferred ~1 major reconfiguration per 2-3 s] | Never a dead frame |
| Micro-interaction loops | Every icon in 9, 11, 13-16, 18, 25 | 10-15 f per loop | The product itself as motion |

Premium signals: entrances are almost always **expo-out** and exits **expo-in**. There are no bounces or elastic overshoots anywhere: the only "spring" is the 3-4 f tilt settle on the role words. Amateur signals: none in the eases. The risk is density. The film alternates 13 text cards with demos, and some text cards (4-8, 19-24) are shorter than reading time would comfortably allow.

## 7. Camera Language observed

- **Locked-off 2D frames dominate** (19 of 25 shots). Life comes from object scale (push or shrink) and the moving gradient, not from the camera.
- **Lens-distortion zoom-out reveal** (shots 9 and 18): it starts ≈2x with a strong barrel bulge and relaxes in ≈6 f while zooming out over ≈20 f (expo-out). Use it to open a dense field.
- **Hop-and-hold virtual-camera tour** (shot 18): symmetric expo in-out glides of ≈17-32 f (peak at mid-move, ≈4-5x the average speed), peak speed ≈8-10% W per frame on the first two moves and ≈22-27% W per frame on the last two, holds of ≈7-20 f on a highlighted target, and a 2.27x zoom-in to start. It ends with an 11 f ease-in pull-back that cuts into a scale-matched text entrance.
- **Crane-up scroll** (shot 13): a constant upward travel through a 3D card column [inferred as camera; it could be a layer scroll].
- **Horizon rise** (shot 15): a dome rising from below, so the viewpoint reads as low-angle on a planet. The move is the object's, not the camera's.
- **Zoom-through** (shot 1): an object scale-through that plays as a dolly-in.
- No pans or tilts outside the grid tour, no orbit, no roll, no handheld. No motion blur on any camera move.

## 8. Typography

| Property | Observed |
|---|---|
| Families | (1) A geometric/humanist rounded sans (Gilroy/Gordita-like [inferred]) for everything. (2) A **serif italic** (Playfair-italic-like [inferred]) only for the four audience words. The wordmark uses the same sans with slightly open tracking (≈+3%). |
| Weights | Medium (≈500) for statements and Regular for small lines. SemiBold on card labels. No bold display weights. |
| Case | Sentence case throughout ("Make your project more interactive"). Lowercase "lottie" in the counter line. |
| Tracking / leading | Default tracking (≈0). "Animated icons library" animates its word spacing 0 → normal. Two-line leading ≈1.2. |
| Alignment / placement | Always centred horizontally, at y ≈ 47-52% H. Exception: shot 16 pushes the line to the upper third (y ≈ 32%) to make room for the ribbon. |
| Sizes (em, % of frame height → px @1080p) | Small statements 6.7-7.8% (72-84 px). Standard 8.2-10.8% (89-116 px). "Introducing" peak 13.6% (147 px). "Why wait?" 16.7% (180 px). **"So" ≈44% (≈470 px; cap height 31% H).** UI: card labels ≈3%, "Get both" ≈3.5%, URL ≈2%, chips ≈1.5% (too small at 640p). |
| Width envelope | Statement lines occupy 24-53% W. The auto-fit type-on caps at ≈51% W mid-type and ≈69% W final. |
| Reveal types | Letter-on-arc type-on (2). L→R letter wipe (logo). Staggered word fade with a 2-5 f offset (4, 16, 17). Word-space open (4). Variable-word swap with a tilt-out and tilt-in settle (5-8). Count-up (10, 12). Scale-in from ≈2.1x plus opacity (19). Auto-fit type-on at 40-55 chars/s (20, 21). Hard swap of hero words (22-24). URL type-on at ≈23 chars/s (25). |
| Kinetic behaviour | Almost every line keeps scaling after it lands: shrinking into the cut (2, 10, 17), a slow push (8, 12) or a fit-to-width shrink (20, 21). |
| Max words on screen | 7 (counter: "4,863+ Free & premium / animated lottie icons"). Typically 1-5. Single-word hero cards ("So"). |
| Read time vs hold | "Make your project more interactive" (5 words) is fully readable for ≈0.6 s plus typing time. "For *Designer*" is up for 11 f. Hero words get 10-12 f, which is fine for 1-2 words. |

## 9. UI Animation observed

- **Toolbar pill (11):** white pill with 4 light-grey square buttons (#E8EAE8) and 1 px borders. Icons play one after another, so attention moves left to right like a cursor. The green under-glow makes the component feel "powered". The left edge is cropped by the frame: it reads as part of a bigger UI, but slightly unmotivated.
- **App panel (14):** grey bezel (#CACACA) with a white screen and a white tab bar holding 5 icons. Tab icons animate in sequence. A ~6 f ease-out slide-up, then stillness, so the only motion is the icons and the glow. That is a believable "product in context" with no random floating.
- **3D category cards (13):** white faces with black SemiBold labels and green extruded edges. Edge-on flip-ins on an accelerating-then-relaxing stagger (≈10 f → 2-4 f → 5-7 f) make a cascading list.
- **Variation ribbon (16):** two rows of white rounded tiles. Tiles cycle between style variants (some fill green) while the rows marquee slowly. Chips label the styles.
- **Highlight state (18):** the selected icon sits on a #38D037 rounded tile with an outer glow (≈20% of tile size). Unselected icons are bare white strokes. Highlight state, camera target and boom all coincide.
- **Search flow (25):** circle → pill → typing → spinner. It is a 3-state microinteraction rendered as UI truth (magnifier → loading arc).
- Principles at work: **one animated element at a time inside a component**, **the component is still while its content moves**, **glow equals active**, and **every UI shot shows the product doing its job** (icons animating inside real UI patterns).

## 10. Transitions observed

| # | Type | Where | Duration | Mechanics | Sound |
|---|---|---|---|---|---|
| 1 | Zoom-through (object) | 1→2 at 1.13-1.27 | 10 f zoom plus 3 f stroke wipe | x1.36/frame scale. The thick strokes sweep off as split white bars. The next scene is already inside the hollow. | Sub boom, -6.2 dB peak |
| 2 | Suck-in shrink → hard cut | 2→3, 10→11, 17→18 | 8-19 f pre-roll | Ease-in scale -24 to -28% (deltas doubling), cutting on the smallest frame | Sub (2.6 s) on 2→3 |
| 3 | Whip exit → cut | 3→4, 16→17, 13→14 | 3-8 f | Expo-in slide out of frame (right or up), then the cut | Sub at 4.5 s |
| 4 | Variable-word swap | 4→5→6→7→8 | 2-3 f tilt-out, then cut; every 11-15 f | Fixed anchor word with the variable swapped | Faint high-band accent [weak] |
| 5 | Lens-distortion zoom-out reveal | 8→9, 17→18 | ≈20 f | Barrel bulge plus scale ~2x → 1x, expo-out | (onset at 7.24) |
| 6 | Dim-to-texture crossfade | 9→10 | 3 f | The previous shot stays as a 15% background under the new text | n/a |
| 7 | Cut into motion | 10→11 | 0 f cut, 25 f settle | The incoming object is already mid-ease-out | onset ±2 f |
| 8 | 3D object wipe | 12→13 | 8 f | An edge-on card rotates to face camera through the text and occludes it | No clear swish: the >4 kHz level stays below the body median during the flip; only a small blip at 15.99 s, 3 f before it |
| 9 | Dim-to-black → cut | 13→14 | 18 f | BG brightness -48% while the elements exit up | n/a |
| 10 | Light-build → hard cut | 14→15 | 2 s ramp | Glow area ≈x9.5, cut on the frame with the largest glow (largest frame diff in the film) | Sub at 21.2 s |
| 11 | Blank-frame breath cut | 15→16, 16→17, 19→20, 20→21 | 1-9 f of empty gradient | Cut to the empty bg, then words fade in | n/a |
| 12 | Pull-back → scale-matched entrance | 18→19 | 11 f + ≈18 f | The outgoing view shrinks (ease-in) and the incoming text shrinks from ≈2.1x at ≈25% opacity (ease-out). The motion vector carries across the cut. | onset 33.16 |
| 13 | Rapid hero-word cuts | 21→22→23→24 | 10-12 f each | Big-small-mid scale contrast | onset at 38.01 |
| 14 | Hard cut to shape → morph | 24→25 | 6 f shrink + 7 f morph | Circle expo-out shrink, then horizontal stretch to a pill | n/a |
| 15 | Fade to black | end | ≈33 f | ≈linear luminance ramp | Music already gone |

Transition density: 24 transitions in 44.3 s (one every 1.8 s). About 15 of them are motivated by motion (zoom, shrink, whip, wipe, light build, pull-back, morph) and 9 are plain swaps or breaths. None are generic plug-in transitions (no glitches, no luma wipes, no spins).

## 11. Editing Rhythm

- **ASL 1.77 s, median 1.43 s** (25 corrected shots; min 0.33, max 6.07). The detector reported 3.16 s / 2.15 s because it could not see text swaps on a shared background.
- By section:

| Section | Time | Shots | ASL |
|---|---|---|---|
| Hook, brand, audience | 0-7.3 s | 8 | 0.91 s |
| Feature proof blocks | 7.3-22.3 s | 7 | 2.15 s |
| Variations and hero tour | 22.3-33.2 s | 3 | 3.62 s |
| Statements and climax | 33.2-39.1 s | 6 | 0.98 s |
| CTA | 39.1-44.3 s | 1 | 5.2 s |

- Shape: **fast → medium → slow (hero) → fast → long hold**. The hero tour (6.07 s) is the longest shot and sits at 61-75% of the runtime. The 3 shortest shots (0.33-0.40 s) are the climax.
- Breathing room: blank-gradient breaths of 1 f (4.567), ≈9 f (22.33-22.63), 1 f (25.5), 2 f (34.33-34.40) and 2 f (36.37-36.43). Dead holds of ≈7-20 f in the tour.
- Hero moments: 1.13 (bell zoom-through, -6.2 dB sub), 2.63 (logo), 21.0 (light-build release into the dome), 27.9 (tour zoom-in, **-2.6 dB, the loudest frame in the film**) and 38.0 ("So").
- **Beat sync (music 112.3 BPM, beat = 0.534 s = 16.0 f; onset IOI median 0.54 s):**
  - Detector hard cuts: **4/10 within ±2 f of an onset** using exact frame times (7.300 Δ1.8 f, 12.167 Δ2.0 f [borderline], 22.333 Δ0.8 f, 33.200 Δ1.2 f; 3/10 with the detector's rounded times), against a 21% random baseline. **5/10 are within ±2 f of a fitted beat grid.** Onsets are only weakly periodic (vector strength 0.16), so the grid fit is loose.
  - All 24 corrected edit events: 6/24 within ±2 f of an onset and 9/24 within ±2 f of the grid. Notable hits: logo exit 4.567 (Δ0.5 f), "So" 38.00 (Δ0.3 f), logo beat-step 3.47 (onset 3.46).
  - Role swaps run at 15 f (≈0.94 beat), which is beat-*paced* but drifts against the onsets.
- **The real sync is SFX-to-motion.** Using 100 ms audio windows, so ±3 f precision:

| Picture event | Time | Audio | Δ |
|---|---|---|---|
| Bell fills frame (zoom-through) | 1.13-1.20 | Sub, -6.2 dB, low-band 1.00 | 0-2 f |
| Logo tile cut | 2.633 | Sub, -8.2 dB | ≤1 f |
| Logo whip / cut | 4.567 | Sub, -9.3 dB | ≤2 f |
| Role swaps | 5.80 / 6.30 / 6.80 | Faint >4 kHz peaks (+2-5 dB) at 5.85 / 6.30 / 6.85 [weak] | 0-2 f |
| Dome first fast frames | 21.13-21.2 | Sub, -8.0 dB | ≤2 f |
| Ribbon peak velocity | 23.53-23.57 | >4 kHz peak (+5-6 dB) at 23.54-23.59 | ≤1 f |
| Tour move 1 peak velocity | 27.87-27.93 | **Sub, -2.6 dB** | ≤2 f |
| Tour move 2 peak velocity | 29.30-29.33 | Sub, -4.1 dB at 29.4 | ≈3 f |
| Tour move 3 peak velocity | 30.90-30.93 | Sub, -8.1 dB at 30.8-30.9 | ≤2 f |
| Tour move 4 peak velocity | 32.27-32.30 | Sub, -8.7 dB at 32.3 | ≤1 f |
| Spinner state | ≈40.40 | None: the >4 kHz share rises only because the bed's low end drops out | n/a |

  9 of 11 key motion events carry a clear SFX within ±3 f (the role swaps have only faint high-band accents and the spinner has none). **This is a feature/SFX-driven edit over a music bed**, not a music-cut edit.

## 12. Sound Design

- **Loudness:** -16.6 LUFS integrated, which is quiet for social (typical targets are -14 or louder). The level per 0.5 s sits at -15 to -24 dB during the body. Sub hits peak at -2.6 to -9 dB.
- **Music:** about 112 BPM with a steady pulse (onset IOI median 0.54 s). It runs as a bed from about 1.4 s to **≈40.5 s**, then drops 25 dB within 1 s. From 41-44.3 s the track is a tail and near-silence (-40 to -62 dB). There is no final sting under the URL or the fade [measured]. The style is a light electronic/pop pulse [inferred: centroid 2-3 kHz, regular onsets, no vocal formants].
- **Intro 0-0.7 s:** quiet high-band content (-32 to -50 dB, centroid 3-4 kHz) under the bell fade-in, probably a bell "ding" or shimmer [inferred]. Then the 0.8-1.3 s sub boom.
- **SFX layer** (see the table above): **sub booms** (energy <150 Hz at 0.8-1.0 of the frame) on the zoom-through, logo in and out, dome and each tour move. A **high-band whoosh** (absolute >4 kHz level +5-6 dB) on the ribbon's peak velocity, and only faint high-band accents (+2-5 dB, possibly hi-hats) near the role-word swaps. The impacts are placed at **peak velocity**, not at move start or end.
- **Voice:** none. The speech-likelihood metric averages 0.46 (only 12% of half-seconds are above 0.6). That is consistent with music only, and the on-screen copy carries the narrative.
- **No UI typing clicks** are detectable during the type-ons at 34.4-37.2 or the URL type (no onsets beyond the bed) [measured: no transients]. That is a missed opportunity for the 23-55 chars/s typing.
- **Implications:**
  1. Low-end impacts at peak velocity make 2D/2.5D moves feel heavy and expensive without motion blur.
  2. A quiet bed plus loud transients gives punch, but the low integrated loudness undersells it on phones.
  3. Ending the music 3.7 s early makes the CTA feel like the film has already finished. Hold the bed and end on a resolved hit or logo sting.

## 13. Visual Quality

**What makes it premium**
- **Colour discipline:** black, one deep-green gradient family and a single neon accent (#38D037), plus white and one UI grey. Every green means "alive or selected".
- **The product is the motion:** every demo shot shows the icons animating inside believable contexts (toolbar, tab bar, highlight tile, bubbles). Nothing floats without purpose.
- **Consistent physics:** expo-out entrances, expo-in exits, S-curve camera glides and linear counters. No bounces or elastic. The single playful exception (the role-word tilt) is contained.
- **Light as material:** emissive under-glows, the rim-lit dome and the glowing highlight tiles give 2D vector work a lit, 3D feel.
- **Transitions are motivated** by motion (zoom-through, suck-in, object wipe, light build, scale-matched pull-back) rather than plug-in effects.
- **SFX at peak velocity** gives weight.
- The background never stops moving, so there are no dead frames.

**Flaws**
- **Delivery quality:** 1138x640 with visible macro-blocking and banding in the dark green gradients (1:1 crop at 26.0 s). There is no grain or dither to mask it.
- **Unreadable micro-text:** style chips ≈1.5% H, URL ≈2% H, "AEP + JSON" pill ≈1.5% H.
- **No motion blur** on pans reaching 10% W per frame (move 2) and 22-27% W per frame (moves 3-4), so the grid strobes visibly.
- **Audio ends at about 40.5 s.** There are 3.7 s of near-silence under the CTA and fade.
- **No end logo lockup.** The brand appears for only 1.9 s, at 2.6-4.6 s.
- **Copy and format inconsistencies:** "For Designer" is singular and "Developers" plural. Number formatting mixes "4,863+" and "50 + Categories" (spaced plus). The filler "So" / "Why wait?" adds little. The category carousel shows the "Random Misc" card twice in a row (≈17.9-18.1 s).
- **Text-card fatigue:** 13 text-only cards on the same gradient. Shots 19-24 are 6 text cards in a row (5.9 s).
- The toolbar crop at the left frame edge looks accidental rather than designed.

## 14. Style Category

**Fast Startup Launch × UI-Focused Demo.** A useful sub-label is **"Dark Neon-Accent Asset-Library Reel"**: black canvas with a moving green aurora, one emissive accent, geometric sans plus a one-off serif italic, kinetic statements alternating with product-as-motion demos, and 2.5D touches (extruded cards, dome, lens warp). It fits icon packs, UI kits, Lottie/AE template libraries, design-tool plugins and dev-tool component libraries. The best length for the format is 30-45 s.

## 15. Transferable Rules (concrete, numeric)

1. **Iconic zero-copy hook.** One symbolic icon (≈12% H) fades in and rises ≈15% H in 6-7 f (ease-out), drops ≈4% H to dead centre, holds ≈0.6 s with a ±12 px sway, then **zooms through at x1.3-1.4 per frame for 8-10 f** (3 f ease-in, then exponential). Put a sub boom at the frames where it fills the screen.
2. **Snap-hold-suck word card.** Pop +40-55% in 6 f (velocity peak on frame 2, no overshoot), hold 6-10 f, then an **ease-in shrink of -24 to -30% over 8-18 f**, and hard cut on the smallest frame into the next object.
3. **Breathing logo.** After the wordmark wipe (L→R, 7 f), add beat-locked **scale steps of +15% (4 f) and then +5% (3 f)**. Exit with an 8 f expo-in whip and cut on an onset.
4. **Audience slot machine.** Use a fixed anchor word plus a variable word set in a contrasting italic serif. Swap every **15 f (≈1 beat at 112 BPM)**: tilt the outgoing word out over 2-3 f, enter the new one at about -6° and +4 px, settle in 3-4 f, and add a high swish on each swap (the reference's are faint; make them audible). Use 3-5 items.
5. **Proof before number.** Show the full asset wall first (lens-distortion zoom-out: ≈2x → 1x, expo-out ≈20 f, bulge gone in 6 f). Then **dim it to 15% in 3 f** and run a **linear count-up** (≈1.9 s for 4 digits, ≈1 s for 2 digits) that stops dead.
6. **Cut into motion.** Start UI components mid-ease-out: expo-out over 25 f, 50% of the travel within 4 f, total travel ≈10-11% W.
7. **One animated element at a time** inside a still component. Sequence micro-animations left to right at ≈10-15 f each and loop.
8. **Brand light.** Give hero UI an emissive under-glow in the accent colour (falloff ≈10% H). For a transition, ramp the glow area **x8-10 over ≈2 s** and cut on the frame where the glow is largest.
9. **3D object wipe.** Bring a card in edge-on (90°) and rotate it to 0° in **8 f** *through* the outgoing headline. Grow it to ≈45% W. Stagger the following cards on a constant scroll, starting at ≈10 f and tightening to 2-4 f (average ≈5-6 f). Give flat cards a 6-8%-thick accent-coloured extrusion.
10. **Peak-velocity sound.** Place whooshes and sub booms at the *peak velocity* of S-curve moves (±2-3 f), not at the start or landing.
11. **Hop-and-hold tour** for galleries: open with a ≈2.3x zoom-in, then symmetric expo in-out glides of **17-32 f** with **holds of 7-20 f** on an accent-highlighted target, shortening the moves toward the exit. The reference peaks at 8-10% W per frame and then 22-27% W per frame with no blur; keep peaks ≤8-10% W per frame, or add 180° motion blur above ≈5% W per frame.
12. **Scale-matched hand-off.** End a shot with an 11 f ease-in pull-back (-38%). Start the next title on the cut frame at **≈2x and ≈25% opacity**, decelerating to 1.0x over **≈18 f** (expo/cubic-out, full opacity within ≈5 f).
13. **Auto-fit type-on.** Type at **40-55 chars/s**. Once the line exceeds ≈50% W, scale it down so the final width is ≤70% W. Leave a **≈15 f pause** between phrases and hold 15-20 f after the last character. Add soft key ticks (this reference does not, and should).
14. **Climax triplet.** Run 3 cards of 10-12 f each before the CTA: hero word at ≈44% H em, question at ≈17% H, imperative at ≈12% H.
15. **Action CTA.** Hard cut to a big circle (≈32% H) that shrinks expo-out to ≈15% H in 6 f, morphs to a pill in 7 f, types the URL at ≈23 chars/s, then switches to a spinner. Bring brand bubbles in defocused and sharpen them as they settle. **Then add the logo plus URL lockup and keep the music to the last frame.**
16. **Palette recipe (dark neon):** bg #000000 → #061506 → #0B2B0B → #114110 (moving radial blobs), accent #38D037, white #F5F7F5, UI grey #CACACA, tiles #E8EAE8. Add a 1-2% grain or dither to stop the banding.

## 16. What to Avoid (as observed here)

- Ending the music before the picture. Keep the bed and finish on a resolved hit synced to the logo or URL lockup.
- Ending without a logo lockup when the brand has appeared for only 2 s.
- Micro-labels under ~2.5% H on deliverables at or below 1080p (chips, format pill, URL).
- Fast virtual-camera pans (≥5% W per frame; this reference hits 27%) with no motion blur. Add 180° shutter blur or slow the peak.
- Dark gradients with no grain at low bitrate (banding and blocking). Deliver at 1080p or above with dither.
- More than 4-5 consecutive text-only cards on one background.
- Inconsistent copy grammar (singular vs plural lists) and number formatting ("4,863+" vs "50 + Categories").
- Cropping a UI component at the frame edge without a reason. Either frame it fully or crop decisively (≥30% off-frame) so it reads as intentional.

## 17. Verification (adversarial frame check)

**Method.** I decoded every frame (1,328 frames, exact frame indexing) and re-measured with independent tooling: per-frame luma differences and white-pixel masks/bboxes at 569x320, low-threshold bboxes at full resolution for faint or fading elements, phase-correlation pan tracking for the grid tour, a G-R>60 glow count, and my own 100 ms / 50 ms-hop audio envelope with *absolute* <150 Hz and >4 kHz band levels (not band shares). I checked these against analysis.json (cuts, onsets, BPM, LUFS, speech likelihood) and 15 new frames.py sheets (zoom/v01-v15, 10-30 fps, some cropped). I also re-read the whole file for internal consistency, since an earlier check may have been interrupted. No earlier Verification section existed.

**Claims re-measured**

| # | Claim | Result | Change made |
|---|---|---|---|
| 1 | Bell zoom-through, x1.36/frame, f26-f36 | **Confirmed.** Heights 78 → 82 → 96 → 122 → 160 → 216 px (f25-f30); ratio 1.05 → 1.35, frame height filled at f34. | The intro was wrong. Only f0 is black (not f0-f4). The bell rises ≈95 px (≈15% H), not ≈50 px (8% H), then drops 27 px to centre over f12-f15. The "ring" is a ±12 px sway. Fixed shot 1, Study A and rule 1. |
| 2 | "Introducing" snap +52% in 6 f and suck-in shrink | **Snap confirmed** (288 → 308 → 368 → 408 → 424 → 432 → 436 px). The shrink is 8 f, not 9 f (436 → 312, deltas ≈4, 4, 8, 12, 12, 20, 28, 36). | Fixed shot 2, Study B and the shrink ranges (8-19 f) in sections 6, 10 and 15. |
| 3 | Corrected cut list (25 shots, gap-free) | **The table is gap-free** (0-44.267 s, 25 rows, 13 columns each). ASL 1.77 s and median 1.43 s re-computed. Two text cuts were one frame off. The logo is still on screen at 4.533, so its cut is **4.567**. "Easy to use" ends at **34.333**, followed by 2 blank frames, not 1. | Shots 3, 4, 19 and 20, the story table, the missed-cut list, breathing room, the sync table and the proportions were all updated. Section ASLs are unchanged. |
| 4 | "Easy to use" enters at 1.45x / 30% opacity and settles in 14 f, then a 15 f dead hold | **Wrong.** On the cut frame it is ≈2.1x and ≈25% opacity (636 px wide vs 296 at rest). It decelerates over ≈18 f, holds only ≈8 f, then exits with an 8 f ease-in rise and fade. The 1.45x figure is the 4th frame. | Fixed shots 18-19, Study J, transitions 11-12, the reveal list and rule 12. |
| 5 | Grid tour: peak pan speed ≈64 px/f (5.6% W/f), moves 32/34/21/14 f, holds 8/22/23/8 f | **Peak speed badly underestimated.** Phase correlation gives move 2 at ≈58 half-px/f (≈10% W/f). I confirmed this by tracking the headphones icon, which moves ≈42 px left and 30 px down per half-res frame. Moves 3 and 4 peak at ≈155 and ≈125 half-px/f (≈27% and ≈22% W/f), also confirmed on frames. All moves are symmetric expo in-out. Durations and holds re-measured: ≈32/32/22/17 f and ≈9/20/20/7 f. Peak-velocity times (27.90, 29.33, 30.93, 32.30) confirm the sub-at-peak-velocity claim. | Fixed shot 18, Study I, camera language, the motion table, the flaws, rule 11 and "What to avoid". The tour now reads as escalating to whip-pans with no blur. |
| 6 | SFX: HF swish on each role swap, whoosh at 23.6-23.7, HF tick at 40.4, "11/11 events have SFX" | **Partly unsupported.** The cited ">4 kHz share" spikes sit in level dips where the low end drops out. In absolute terms there are only faint +2-5 dB peaks at the role swaps, a real +5-6 dB whoosh at 23.54-23.59 (≤1 f from peak velocity), and nothing at the spinner or the card flip. The sub booms (27.94-27.99 at -2.7 dB the loudest, then 29.44, 1.10, 30.89, 4.60) are confirmed. | Changed to 9/11. Rewrote the summary sentence, shots 5-7, Study C, Study H, Study K, the transitions table, the sync table and the SFX paragraph. |
| 7 | Beat sync: 3/10 detector cuts within ±2 f of an onset (7.30, 12.17, 22.33) | With exact frame times it is **4/10** (7.300, 12.167 borderline at 2.0 f, 22.333, 33.200). The 21% baseline, 5/10 on the grid, 6/24 and 9/24 for corrected events, vector strength 0.16 and IOI median 0.54 s are all confirmed. | Fixed the beat-sync bullet. |
| 8 | Toolbar pill cut-into-motion: 25 f expo-out, 122 px, half the travel in 4 f | **Confirmed.** Right edge 564 → 585 → 601 → 614 → 624 → 633 ... 686 (13.0 s) → 687 full-res; 123 px = 10.8% W. | None. |
| 9 | Ribbon S-curve: 32 f, peak 21 half-px/f at 23.53-23.57 | **Confirmed.** Full-res top edge 638 → 229 px, peak 42 px/f at 23.533-23.567. The curve is not symmetric: the peak is at ≈37% of the move. | Removed "symmetric-ish". |
| 10 | Counter 43 → 4,863, linear, 9.93-11.80 | **Confirmed.** It steps by ≈87 every frame (not 174 every 2 f), ≈2,600/s, and the last step is clamped (4,820 → 4,863 at 11.800). | Wording fixed. |
| 11 | Glow build x7.8, cut on the brightest frame | Glow area is 2,510 → 23,850 on the last frame (20.967), so **≈x9.5**; x7.8 was the value at 20.87. Overall frame luma does not peak at the cut. | Fixed the story table, shot 14, Study G, the motion and transitions tables and rule 8. |
| 12 | Category carousel: 11 cards at a 6-8 f stagger | **Wrong.** There are 12 cards; "Random Misc" appears twice in a row. The stagger varies: ≈9-10 f for the first cards, 2-4 f in the middle, 5-7 f at the end (average ≈5.5 f). The card-1 flip of 8 f (16.10-16.37) is confirmed. | Fixed the story table, shot 13, Study F, the motion table, UI section and rule 9. Added the duplicate label to Flaws. |
| 13 | Climax and type sizes | **Confirmed.** "So" cap height 200 px (31.3% H); "Why wait?" 44% W; "Let's go!" 24% W; durations 10/10/12 f. "Make your project" types 17 chars in 10 f. The pause is ≈15 f, not 14 f. Final width 394 half-px (69% W). | Pause corrected. The height figures in shot 20 were made consistent (41 → 31 half-px). |
| 14 | CTA: circle 32.5% H → 16.6% in 6 f; URL at ≈26 chars/s 39.70-40.40; fade 43.07-44.13 (32 f) | **Circle confirmed** (105 → 83 → 74 → 67 → 61 → 57 → 53 half-px). The URL types 39.73-40.53, so ≈23 chars/s. The fade runs ≈43.10-44.20 (≈33 f, luma 34 → 1). | Fixed shot 25, Study K, the story table, the transitions table and rule 15. |
| 15 | Music ends ≈40.5 s (3.7 s early) | **Confirmed.** Absolute level goes -13.7 dB at 40.1 s, -32 dB at 40.45 s, then below -40 dB after 41.5 s. | None. |
| 16 | Dome rim 88% → 58% H, 22 f expo-out | **Roughly consistent** on a 15 fps sheet (≈93% → ≈62% H, fast early). It was not re-tracked per frame. | None. |

**Also fixed for consistency.** Shot-type counts in the Summary (13 text-only shots, 8 demo shots; the other 4 are the hook, the logo and the two counters). Proportions are now 4.6 s / 2.7 s. The "So" size in the story table is now ≈44% H em. The brand-on-screen span is 2.6-4.6 s. The onset delta for shot 10's cut is stated correctly. I added an explicit **Phase-2 attribute coverage** table under section 4 (angle, scale, perspective, speed changes, reflections, grain/texture, motion trails, UI-to-3D, match cuts, morphing, mask/camera/object wipes, zoom transitions, continuity, shadows/DOF/parallax), with n/a where the attribute is absent.

**Not re-measured (left as the analyst's).** Lens-distortion column counts (shot 9), the logo tile/glyph timings, the "Free & premium" block heights, dome deltas, card-stack exit G values, the zoom-in tile sizes (37 → 84 px) and pull-back (88 → 54 px), the palette hex values, the bubble glyph list, and the 0 → 50 counter rate.

**Stale values in the structured summary** (workflows/master-args.json, not edited here). These need the same corrections: "Easy to use entering at 1.45x and settling in 14 f" → ≈2.1x over ≈18 f; "peak 5.6% W per frame" and "holds of 8-23 f" → 8-10% then 22-27% W/f, holds ≈7-20 f; "glow x7.8" → ≈x9.5; "6-8 f stagger" and "11 cards" → variable stagger (avg ≈5.5 f), 12 cards; "11/11 key motion events" and the role-swap/spinner swishes → 9/11, faint or absent; "3/10 hard cuts" → 4/10 with exact frame times; URL "≈26 chars/s" → ≈23; "-28% over 9 f" → 8 f; and "4.53" boundaries → 4.567.
