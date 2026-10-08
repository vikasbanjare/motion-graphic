# Master SaaS Motion Design System, Part 10
## Master §12 2D Motion Guidelines · §13 3D Motion Guidelines · §14 2D+3D Combination Rules · Phase 11 Style Categories

Draft v1, 2026-10-08. Built from frame-measured teardowns of the eight reference videos in the user's folder, plus text-only research. Use it to decide how flat or how dimensional a film should be, to specify every 2D layer move and every 3D object or camera move, to join the two without the seams showing, and to pick and execute one style category. A senior motion designer, an editor or an AI video system should be able to follow it without guessing.

This part leans on numbers already set in other parts and cross-references them instead of repeating them in full:
- Ease tokens (E-SNAP, E-OUT, E-GLIDE, E-INOUT, E-HOP, E-SETTLE, E-EXIT, E-WHIP, E-GRAVITY, E-PUNCH, E-ZOOM, E-LERP, E-LINEAR, E-SPRING-P, E-CRIT): Part 03 §19.3.
- Camera moves (CM-01 to CM-20) and depth rules (DP-01 to DP-20): Part 04.
- Transitions (TR-01 to TR-24): Part 05.
- UI elements and choreography (UI-E, UI-P): Part 06.
- Kinetic-type systems (KT-01 to KT-11): Part 07.
- Art-direction styles (AD-S1 to AD-S9): Part 02 §3.2. Rhythm by style: Part 08 §15.2. Music by style: Part 09 §16.2.2.

---

## 0. How to read this part

### 0.1 Units and tags

**Units**
- **% W / % H**: percent of frame width / height. Speeds are **% W/f** (percent of width per frame). This transfers between resolutions because perceived speed scales with the frame.
  - 1% W = 19.2 px at 1920×1080 (**@1080p**). 1% H = 10.8 px @1080p.
  - On a 9:16 frame of 1080×1920 (**@1920p**): 1% W = 10.8 px, 1% H = 19.2 px.
- **f** = one frame at 30 fps (33.3 ms). **Unique fps** = new drawings per second (a film "on twos" at 30 fps has ≈12-15 unique fps).
- Values measured at a reference's native width (1138, 1280 or 1011 px) and converted to 1080p are marked **(computed)**.

**Evidence tags** (same as Parts 01-09)
- **[V:xxxxxx t=..s]**: the user's own reference videos, measured frame by frame. Strongest evidence. Where they disagree with generic advice, **the references win**, and a "References win" note says so.
- **[S:brand]** / **[S:playbook]**: Superside text research (20 SaaS videos, text only).
- **[E]**: ElevenLabs style brief (brand system and open-source orb/waveform code are sourced; motion values in it are mostly inferences).
- **[N]**: design-system tokens, standards and platform data.
- **[P]**: voice/footage pipeline brief (ElevenLabs, Veo, Flow).
- **[W:site]**: inspiration-site catalogues (raivcoo, showreel.design, motion.so), titles and descriptions only.
- **[inferred]**: my judgement, not directly observed or sourced.

Text-only sources ([S], [E], [W], [P]) support intent, vocabulary and structure. They never support frame-level timing.

**Rule IDs and classes**
- **2D-** = Master §12. **3D-** = Master §13. **HY-** = Master §14 (hybrid). **ST-** = style categories (Phase 11).
- Class suffixes, as in Parts 03-09:
  - **U** = universal (three or more references agree).
  - **S** = style-specific.
  - **X** = experimental (one reference, or untested; validate before using as a default).
  - **A** = avoid.
  - **SaaS** = especially good for SaaS.

### 0.2 Reference roster

| Tag | Reference | Frame / length | Style (this part's name) |
|---|---|---|---|
| [V:1-6l8S] | kivi, voice-AI dictation launch | 16:9, 77.8 s | Minimal Premium, "Airy Aurora / Calm-Tech" |
| [V:126cpH] | Chowdeck delivery-app ad (measured through a crop of an AE screen capture) | 9:16, ≈18 s | Playful Illustrated Collage + UI |
| [V:15VhHR] | Wix AI site builder | 16:9, 53.9 s | UI-Focused Demo in an Editorial Brand Frame |
| [V:19NRDv] | Bumper PRO payments launch | 16:9, 67.2 s | Fast Startup Launch, "Night claim / Day proof" (kinetic type × 3D UI) |
| [V:1CSXtQ] | OpenAI × HubSpot connector spot | 16:9, 30.0 s | Minimal Premium, "Prompt-Native Launch", one 3D beat |
| [V:1Hcg3X] | "How do solar panels work?" | 16:9, 35.8 s | Editorial Motion, "Retro-Editorial 2.5D Explainer" |
| [V:1ccYWJ] | Lottieicon icon-library promo | 16:9, 44.3 s | Fast Startup Launch, "Dark Neon Asset Reel" |
| [V:1i2L14] | NOSTRA studio promo | 16:9 inset, 35.1 s | Editorial Motion, "Monochrome Brand-System Explainer" |

### 0.3 Dimensionality census: what the eight references actually do

"Share" figures are seconds of runtime in which the element is the shot's subject, summed from each teardown's shot table (computed, ±1 s).

| Ref | Base world | 3D used | 3D share of runtime | Motion blur | Cadence | Grain / texture | Depth recipe |
|---|---|---|---|---|---|---|---|
| kivi [V:1-6l8S] | Flat 2D type cards; frosted glass UI over flat painted plates | One glossy purple-gradient 3D cursor over 2D icons (t=36.2-37.15s) | ≈1 s (≈1%) | None, even on whips and the truck | Native 30 fps | None (flat areas σ 0.0-0.1) | Focus: sharp glass over defocused plate; no parallax |
| Chowdeck [V:126cpH] | Flat vector illustration + photo cut-outs + light UI cards | None. 2D Z-rotation only; no perspective | 0 | Directional, vertical push only | Graphics **on twos (≈12 unique fps)**; live action on ones | None | Overlap: offset backing card, drop-shadowed cut-outs, fake rack focus |
| Wix [V:15VhHR] | Real 2D UI over full-bleed photography; flat cream/navy brand frames | Inline spinning 3D heart, refractive ice bottle, carousel/deck of 3D cards, tilted card wall | ≈9 s as subject (≈17%); ≈14 s incl. the inline heart (≈27%) | Only the carousel whip and page scrolls | 25 → 30 pulldown (distribution flaw) | None | Blur plates; UI-in-world window; one blurred foreground leaf |
| Bumper [V:19NRDv] | 2D kinetic type on navy (claims) | Tilted 3D UI planes, extruded columns, chip and badge rings, 3D network, glossy 3D paper-plane cursor | ≈34 s, all proof shots (≈51%); 0% of claim cards | On every move (≈180° shutter) [inferred angle] | Native 30 fps | None | Shadows + DOF + parallax as one optical model |
| HubSpot [V:1CSXtQ] | Flat white 2D UI with soft shadows, orthographic | One blue-grey 3D studio beat: screen-to-world pull-back, particles, dolly with bokeh (t=17.80-21.47s) | 3.67 s (12%) | None on 2D (even at 75 px/f @720); bokeh only in the 3D beat | 25 → 30 pulldown | None | Flat everywhere; real DOF + parallax only in the beat |
| Solar [V:1Hcg3X] | Flat vector illustration | None. 2.5D only: rim thickness, isometric panels, long hard shadows, perspective rows, planet-curve horizon | 0 (100% 2.5D) | One blurred frame on the hook exit | Animated at 24 fps, 24 → 30 pulldown | Fine monochrome grain on every frame; dust specks | Shadows + overlap + parallax 1.3-2×, zero blur |
| Lottieicon [V:1ccYWJ] | Black canvas, green aurora, white 2D line icons | Extruded 3D category cards, icon dome horizon, barrel lens warp, DOF bubbles | ≈4 s as subject (≈9%) + 5.2 s DOF bubbles in the CTA | None, even at 22-27% W/f (flaw: strobing) | Native 30 fps | None (banding flaw) | Light: emissive under-glow, extrusion, dim-to-texture |
| NOSTRA [V:1i2L14] | Flat 2D shapes and type, two-colour system | Grain-gradient 3D hand and creature, 3D ring of copy cards, text ribbon, tilted floor grid, unfolding 3D form, glossy inflated phone, glass tiles | ≈12 s (≈34%), as short accents | Whip's last 2 f only | Native 30 fps | Grain-gradient (dithered) shading on 3D props; grain on the pain cards | Fog + scale + glass |

### 0.4 What the census says

1. **All eight are 2D-first.** None is a "3D film". The base world is always flat 2D layers moved by a 2D virtual camera (scale and position). 3D is an accent or a proof layer.
2. **3D is spent as contrast.** Three patterns, and only three:
   - **One hero beat** of ≈10-15% of runtime in minimal styles (HubSpot 12%).
   - **A few hero objects** (1-3 moments) in brand-frame styles (Wix heart, ice, deck; NOSTRA accents).
   - **A whole register**: 3D is the "proof world" and 2D is the "claim world" (Bumper: ≈51% of runtime, but never on a claim card).
3. **Two of eight use no 3D at all and still read premium** (kivi apart from its cursor, Solar). Solar gets all its dimensionality from 2.5D tricks.
4. **Motion blur follows the world, not the speed.** 2D worlds leave moves unblurred (kivi, HubSpot, Solar, Lottieicon, mostly NOSTRA). The one optical 3D world (Bumper) blurs every move. Lottieicon's unblurred 22-27% W/f pans are the flagged failure that sets the speed cap (the teardown reads them as strobing "on playback [inferred from frames]"; its unblurred 8-10% W/f moves are not flagged) [V:1ccYWJ t=27.40-32.57s].
5. **Texture is rare.** Only the two Editorial references (Solar, NOSTRA) add grain, and both on purpose. The dark gradients with no grain or dither (Lottieicon, Bumper) band at delivery bitrates.
6. **Frame cadence is a style lever.** Chowdeck animates its illustration on twos and keeps live action on ones. Three references were judder-damaged by 24/25 → 30 fps pulldown, which is a delivery flaw, not a style.

### 0.5 Defaults card: the 25 numbers to encode first

| # | Parameter | Default | Range seen | Evidence |
|---|---|---|---|---|
| 1 | Base world | **2D-first.** Flat layers + 2D virtual camera | 8 of 8 | Census |
| 2 | 3D budget, minimal styles | **One hero beat, 10-15% of runtime** | 0-12% | [V:1CSXtQ] 3.67/30 s (computed) |
| 3 | 3D budget, kinetic-type × proof styles | **Proof shots only (≈40-55% of runtime), never on claim cards** | 51% | [V:19NRDv] (computed) |
| 4 | 3D budget, brand-frame / editorial styles | **2-6 short accents, each 1-3.5 s** | 1.1-3.4 s each | [V:15VhHR] [V:1i2L14] |
| 5 | 2D arrival | **E-SNAP or E-OUT**: 40-64% of travel on the first moving frame, 86-95% by f3-f6, settled by f8-f14 | — | [V:19NRDv t=0.00-0.30s] [V:1i2L14 t=18.37s] [V:1Hcg3X t=5.43s] |
| 6 | 2D exit into a cut | **E-EXIT / E-WHIP, 6-11 f**, speed ×1.3-1.9 per frame, peak 13-20% W/f | 3-11 f | [V:1Hcg3X] [V:1i2L14 t=5.87-6.10s] |
| 7 | Life on holds | **Drift 0.1-0.5% of frame per frame or push 1.05-1.15× over the hold** | 0.03-0.5%/f; 1.07-1.29× | [V:1-6l8S] [V:1Hcg3X] [V:1CSXtQ] |
| 8 | 2D rotation | **Physical objects only, 6-15°, settle in 3-15 f** | 4-20° | [V:126cpH t=9.27s] [V:1Hcg3X t=3.43s] [V:1ccYWJ t=5.43s] |
| 9 | Overshoot | **0% on type, UI chrome, logos, camera.** Playful physical objects ≤25% of the swing, one cycle | 0-25% | 7 of 8 references at 0% |
| 10 | Motion blur, 2D | **Off below ≈5% W/f** [inferred, conservative threshold]; 180° shutter above; always on whips | Unblurred: ≈4% (fine), 8-10% (not flagged), 22-27% W/f (flagged) | [V:1-6l8S t=35.47-36.4s]; [V:1ccYWJ t=27.40-32.57s] (flaw); [V:1CSXtQ]; [N] 180° |
| 11 | Motion blur, optical 3D register | **On, ≈180°, on every move** | — | [V:19NRDv] |
| 12 | Cadence | **Ones (native 30 fps)** for UI, type, camera and 3D. **Twos** only for illustration/collage layers, as a declared style | 12-30 unique fps | [V:126cpH]; [S:Figma] 15 fps opening film |
| 13 | Tilted UI plane while read | **≤15°**; 30-45° only in transit [inferred angles] | 0-45° | [V:15VhHR t=33.33s] [V:19NRDv t=16.77s] |
| 14 | 3D fly-in | **12-22 f, E-SNAP, with motion blur** | 12-22 f | [V:19NRDv t=4.97-5.70s, 16.77-17.17s] |
| 15 | Card flip from edge-on | **90° → 0° in 8 f** (E-OUT) | 6-8 f | [V:1ccYWJ t=16.10-16.37s] [V:1i2L14 t=24.53-24.73s] |
| 16 | Hero 3D dolly | **×2-2.5 in ≈15 f, E-OUT; foreground to bokeh** | — | [V:1CSXtQ t=19.95-20.47s] |
| 17 | Screen-to-world pull-back | **×0.57 in 10 f, then ×0.56 decelerating over 18-20 f** | ×0.32 total | [V:1CSXtQ t=18.00-19.03s] |
| 18 | Orbit | **Stepped, 9-12 f per step, steps ≈1.2-1.3 s apart**; never a continuous 360° | — | [V:19NRDv t=29.97-35.93s] |
| 19 | Camera roll | **0°** (≤1° incidental drift inside a 3D dolly) | 0-1° | 8 of 8 |
| 20 | Particles | **Made from the scene's own colours**: 200-300 discs for a data transfer, ≈60 for a field, ≤12 sparks for a burst | 12-300 | [V:1CSXtQ] [V:1Hcg3X] [V:19NRDv] |
| 21 | Light direction | **One per film**, shared by 2D shadows and 3D lighting | — | [V:1Hcg3X] (two-direction flaw) |
| 22 | Glow | **Emitters only**; radius ≈1-2% of frame; on text ≤2-3% of cap height | — | [V:1Hcg3X] [V:19NRDv t=7.2s] (flaw) |
| 23 | Grain / dither | **1-2% dither on every dark or gradient frame**; visible grain (3-5%) only as an Editorial style choice [inferred %] | 0-5% | [V:1ccYWJ rule 16] [V:1Hcg3X] |
| 24 | 2D ↔ 3D handover | **Through a motivated move** (tilt onto a plane, screen-to-world pull-back, edge-on flip through text, collapse into an inline slot), never a crossfade between dimensions | — | [V:1CSXtQ] [V:1ccYWJ] [V:15VhHR] [V:1i2L14] |
| 25 | Text in 3D | **Always on the focal plane, facing camera, sharp.** Text-on-path only as a showpiece | — | 8 of 8; [V:1i2L14 t=14.67-16.63s] |

### 0.6 The dimensional ladder (vocabulary used in this part)

Name the level in every brief. A film normally lives on one base level and visits one level above it.

| Level | Name | What it is | References | Cost / risk |
|---|---|---|---|---|
| **D0** | Flat 2D | Vector shapes, type, UI and photos on flat planes. 2D camera (scale, position). No perspective. | kivi, Chowdeck, HubSpot (outside its beat), NOSTRA (most of it) | Cheapest; highest control; can look like a slideshow if nothing drifts |
| **D1** | Lit 2D / 2.5D | Flat art with volume cues: rim thickness, extrusion, offset backing cards, long cast shadows, isometric drawing, emissive glow, parallax planes | Solar (all), Lottieicon (glow, extrusion), Chowdeck (offset card) | Cheap; reads as "crafted"; needs one consistent light direction |
| **D2** | Planar 3D | 2D UI or type placed on planes in a 3D space: tilted tables, card rings, carousels, decks, floor grids, text ribbons | Bumper, Wix (carousel, deck), NOSTRA (ring, grid, ribbon), Lottieicon (card column) | Moderate; text legibility drops with tilt; plane intersections appear mid-move |
| **D3** | Volumetric objects in a 2D world | Modelled objects with real shading inside a flat world: a glossy heart, a refractive bottle, an inflated phone, a 3D cursor, grain-gradient characters | Wix, NOSTRA, kivi (cursor), Bumper (cursor) | Moderate; material and light must match the flat world or the object looks pasted on |
| **D4** | Full 3D environment | A lit 3D set with an optical camera: DOF, bokeh, foreground parallax, environment light | HubSpot (one beat), Bumper (network, chart) | Highest; most AI-look risk (warping, intersections, identity drift) |

**Why a ladder.** Each level up adds cues the viewer checks for consistency: perspective, light, focus, material. Every added cue is another place a seam can show. Premium references climb only one level above their base, and only where the extra dimension carries meaning (HubSpot's data transfer, Bumper's "dive into the reconciliation"). [inferred from the census]

---
# Master §12. 2D Motion Guidelines

## 12.0 Why 2D carries premium SaaS films

Every reference is built on flat layers (census §0.3). 2D is not the cheap option. It is the controllable option:
- **Exact typography and UI.** Every glyph and every pixel of UI stays exactly where the designer put it. Generative video still "cannot set exact typography" [N], and SaaS films live on readable product truth.
- **Exact timing.** A 2D layer hits a frame-accurate pose on a beat, a click or a word.
- **Meaning per property.** In 2D, each property (position, scale, rotation, opacity, mask, colour) can be given one job, so motion reads as language rather than decoration.

The premium read in 2D comes from three things measured across the set: a **small, strict ease vocabulary**, **no dead frames**, and **continuity carried by shapes and position** across cuts. Flat art without these three looks like a slideshow; with them it looks directed [V:1Hcg3X] [V:1-6l8S] [V:1i2L14].

## 12.1 The 2D property palette: what each property says

Give each property one job per film. The table lists the job the references give it.

| Property | Job (what the viewer reads) | Measured speeds / sizes | Ease token | Reads premium | Reads amateur | Evidence |
|---|---|---|---|---|---|---|
| **Position** | Arrival, departure, direction of story ("forward") | Arrival 50% in 3-5 f, 90% by 10-14 f; drift 0.1-0.5%/f; whip peak 13-20% W/f | E-SNAP / E-OUT in, E-WHIP out | Asymmetric: long soft arrival, short fast exit | Linear slides; same speed in and out | [V:1Hcg3X t=5.43-6.83s] [V:1i2L14 t=5.87s] |
| **Scale** | The 2D camera (push, pull, punch), importance, depth | Push 1.05-1.29× per hold; punch +18-33% in 3-8 f; pull-out ×0.63-0.80 or ×4.1 in 2 stages | E-LINEAR (push), E-PUNCH, E-INOUT, E-ZOOM | Interpolated in log space for >1.5× | Linear scale on big zooms (appears to slow down) | [V:1-6l8S] [V:126cpH t=5.20-6.20s] [V:1ccYWJ t=0.87-1.20s] |
| **Rotation** | Physical life of an object (tilt, toss, fall) | 6-15° tilts, settle 3-15 f; discards 10-20° (up to 70-90° on falling props) | 1 f snap + E-OUT; E-GRAVITY | Only on objects, small, one settle | Rotating text or UI chrome; spins for flair | [V:126cpH t=9.27-10.0s] [V:1Hcg3X t=3.43-3.83s] [V:1i2L14 t=13.50-13.93s] |
| **Opacity** | Entrance softening, hierarchy (dimming), handover | Words ghost 30% → 100% in 3-4 f; superseded content to ≈50%; proof dimmed to 15% in 3 f | E-LINEAR | Paired with a blur or a move | Opacity-only crossfades between scenes | [V:1-6l8S t=18.70-20.45s, 13.77s] [V:1ccYWJ t=9.833s] |
| **Blur (2D)** | Focus pull on entry/exit; a plate that stays behind | Entry blur → sharp 3-5 f; exit defocus 1-2 f; plate blur ≥2-4% W | E-LINEAR | Short, at edges of a text's life | Text blurred while it must be read | [V:19NRDv t=2.40-3.25s] [V:1-6l8S t=4.45s]; DP-04 |
| **Mask / matte** | Reveal in reading order; one surface becoming another | Feather ≈1 letter (≈4% W); blades 3-5% W; L→R erase ≈1 letter/f | E-LINEAR or E-OUT | Feathered edge, reading direction | Hard-edged wipes for no reason | [V:1i2L14 t=6.17-7.00s, 21.85-22.03s] |
| **Trim path / stroke** | Drawing: routes, logos, charts, outlines | Logo stroke 5 f → fill 8 f → sheen 14 f; route legs 28 f + 16 f; chart lines 26 f | E-OUT (stroke); E-LINEAR (routes, charts) | Stroke then fill; easing into corners | One long linear draw with no pauses | [V:19NRDv t=3.62-4.70s, 27.63-28.50s] [V:126cpH t=11.6-13.23s] |
| **Path / shape morph** | One object becoming another (continuity) | Pill → slabs → line → card in ≈13 f; circle → pill in ≈7 f; card → notification in ≈7 f | E-INOUT / E-OUT | Same object, same position, one clear job change | Morphing unrelated shapes (blob soup) | [V:1-6l8S t=9.50-9.93s] [V:1ccYWJ t=39.47-39.70s] [V:126cpH t=11.03-11.27s] |
| **Colour / fill** | State (on, matched, failed, AI-acting), chapter, polarity | State fills 1-5 f; colour-settle 6-8 f; full-frame flips 0 f | E-LINEAR / snap | Colours with fixed meanings | Colour changes with no state behind them | [V:19NRDv t=20.37s] [V:15VhHR t=12.53-12.83s] [V:1i2L14] |
| **Z-order / overlap** | Hierarchy and depth without 3D | Offset backing card 6% → 3% as it lands | snap | One overlap logic per film | Random stacking | [V:126cpH t=9.27-10.0s]; DP-15 |

## 12.2 Universal 2D principles (2D-U)

**2D-U1 · One 2D world, one virtual camera. Text and labels live in world space.** [U]
- Every layer that belongs to the scene moves with the shared camera. Solar's labels ride the scene drift and leave with it; "Sunlight" stays fixed relative to the sun [V:1Hcg3X t=2.27-2.40s]. kivi's lines recentre as one unit [V:1-6l8S]. Bumper's line rescales as if the camera pulls back [V:19NRDv].
- Exception: a deliberately screen-locked **anchor** (Wix's prompt bar held at identical x/y/size across 6 shots [V:15VhHR t=8.63-12.47s]; the ice bottle over 4 layouts [V:15VhHR t=29.47-32.83s]). Declare it as an anchor in the brief.
- Why: the viewer infers a camera from shared motion. A layer that ignores the shared motion without being an anchor reads as a sticker pasted on top.

**2D-U2 · Scale is the 2D camera. Interpolate it in log space.** [U]
- Push on holds 1.05-1.29× [V:1-6l8S]; punch +18-33% in 3-8 f [V:1-6l8S t=7.83s, 18.23s, 70.83s]; pull-back ×0.75 [V:1CSXtQ t=8.0-9.03s]; two-stage pull-out ×4.1 in 1.0 s [V:126cpH t=5.20-6.20s]; 3× → 1× device reveal in 24 f [V:1Hcg3X t=14.30-15.10s]; zoom-through ×1.36/f [V:1ccYWJ t=0.87-1.20s].
- For anything above ≈1.5×, interpolate `log(scale)` (E-ZOOM). A linear 20× zoom spends almost all its frames near the end and appears to slow down [V:1ccYWJ Study A].
- Why: on flat art, scale is the only cue that says "closer/further". Constant-ratio scaling reads as constant camera speed.

**2D-U3 · The asymmetric envelope: snap in, drift, whip out.** [U]
- Measured on Solar, almost every shot [V:1Hcg3X]:
  - **Arrival**: E-SNAP-like, speed decays ×0.85-0.92 per frame; 50% of travel in 3-5 f; 90% settled by 10-14 f (house: 90% by f12, full by f25).
  - **Body**: drift 0.3-0.5% of frame per frame.
  - **Exit**: E-WHIP, 6-11 f, speed grows ×1.35-1.9 per frame to 15-20% of frame per frame. The cut lands on the first clean frame after the subject leaves.
- Same shape elsewhere: kivi entrances 8-14 f, exits 4-6 f (≈2:1) [V:1-6l8S rule 4]; Bumper "Take" 64% of the delta on frame 1, 86% by f3 [V:19NRDv t=0.00-0.30s]; NOSTRA 40-45% on the first moving frame, 88-95% by f6 [V:1i2L14].
- Why: a fast settle says "decided"; an accelerating exit carries energy into the next shot so no transition effect is needed.

**2D-U4 · No dead frames on flat art.** [U]
- True holds ≤5 f [V:1Hcg3X]. Drift on every hold: kivi 1.4 px/f native (0.12% W/f, ≈2.4 px/f @1080p, computed) [V:1-6l8S t=0.53-1.50s]; NOSTRA 0.3-1 px/f [V:1i2L14]; HubSpot cards always shrinking 13-24% [V:1CSXtQ t=21.9-27.3s]; Chowdeck boil on held blobs and props [V:126cpH]; Lottieicon's aurora repositions continuously [V:1ccYWJ].
- Allowed stillness: a reading hold of ≤1.0 s with strong negative space (Wix holds its brand sentence 1.0 s still [V:15VhHR t=0.63-1.43s]) and the final lockup (0.8-2.2 s).
- Speed bands, by what they read as: ≈0.1%/f (kivi, ≈3.7% W/s) is barely noticed and reads as "breathing"; 0.3-0.5%/f (Solar, ≈9-15% of frame per second, ≈136 px/s @1080p on the hook title) is a visible slow drift that reads as a crane or scroll [V:1Hcg3X t=0.37-0.97s]. Pick the low band for calm styles and the high band for editorial "chain" styles [inferred mapping].
- Why: vector art has no film noise, so a still vector frame is perceived as "paused" [inferred]. A low-speed drift keeps the frame alive without pulling the eye off the copy.

**2D-U5 · A small ease vocabulary, applied by role.** [U]
- Solar uses essentially four curves (expo-out arrivals, expo-in whips, one long-settle in-out for wipes, one snap-and-settle for objects) [V:1Hcg3X §13]. Bumper: "every settle is a critically damped expo-out" [V:19NRDv §6]. Lottieicon: expo-out entrances, expo-in exits, S-curve glides, linear counters [V:1ccYWJ §13].
- Map: arrivals E-SNAP/E-OUT; travel E-GLIDE/E-INOUT; reading wipes E-SETTLE; exits E-EXIT/E-WHIP; falls E-GRAVITY; drifts, counters, draws E-LINEAR (Part 03 §19.3).
- Why: consistency of acceleration is perceived as one hand directing the film. Mixed curves read as a template collage.

**2D-U6 · Zero overshoot on type, UI chrome, logos and the camera. Bounce only on physical props, and only in playful styles.** [U]
- 0% overshoot in kivi, HubSpot, Bumper, Wix UI, Lottieicon, NOSTRA large cards and button release [V:1i2L14 t=33.8-34.0s]. (Wix's teardown notes one inline photo-chip pop "with a slight overshoot [inferred]" at 0.63-4.23 s; it is not measured and is a chip, not type [V:15VhHR].)
- Allowed props: Chowdeck's tossed card (+15° → −4°, ≈25% of the swing, one cycle, settled in 16-22 f) [V:126cpH t=9.27-10.0s]; Solar's phone (−12° snap, +5° overshoot, settled ≈15 f) [V:1Hcg3X t=14.50-15.17s]; NOSTRA's inflated phone pops with squash and a rotation wobble over ≈9 f [V:1i2L14 t=24.50-25.93s].
- Why: overshoot is a mass cue. Type and UI have no mass; giving them bounce reads as a template preset (see Part 03 §19.6).

**2D-U7 · Rotation belongs to objects, never to layouts.** [U]
- Small and settled: role words −6° → 0 in 3-4 f [V:1ccYWJ t=5.43-7.30s]; lamp shade 11-14° snap, E-OUT return by f12 with no overshoot [V:1Hcg3X t=3.43-3.83s]; tossed card 15° → 0 in 16-22 f [V:126cpH]; discard drop 10-20° [V:1i2L14 t=13.50-13.93s]; falling produce 70-90° [V:126cpH t=7.27-7.73s].
- kivi: "kinetic type never rotates or scales per letter" [V:1-6l8S §8]. Bumper rotates nothing in 2D [V:19NRDv].
- Why: rotation implies a pivot and gravity, which only physical things have. A rotating headline reads as a gimmick.

**2D-U8 · Stagger by object size, with a total budget.** [U]

| Group | Stagger | Evidence |
|---|---|---|
| Panels / blinds / strips | 1 f | [V:1i2L14 t=14.50-14.60s] |
| Chips, dots, dropdown rows, letters | 2 f | [V:1CSXtQ t=8.867-9.033s] [V:1i2L14 t=3.567-3.700s] [V:19NRDv t=61.47-61.80s] |
| Words in a line | 2-3 f (fast) to 7-10 f (paced to music) | [V:1ccYWJ] [V:19NRDv t=0.30-0.87s] |
| Cards, content blocks, cascade rows | 3-4 f | [V:15VhHR t=41.67-41.93s] [V:1-6l8S t=23.13-23.80s] |
| Large objects (calendar, sticker) | 5-7 f | [V:15VhHR t=44.60-44.83s] |

- Keep a group's whole reveal ≤ ≈18-20 f and ≤ ≈8 items [N, unverified practitioner guidance] (consistent with the 13-22 f cascades measured [V:1-6l8S t=22.87-23.87s, 67.87-68.50s]).
- Never zero stagger on a row of like items: kivi's four app icons appearing together is the film's "least crafted moment" [V:1-6l8S t=34.50-34.95s].
- Why: stagger converts a group into a reading order. Uniform simultaneous pops read as a single slide change.

**2D-U9 · Draw and reveal in reading order.** [U]
- Masks run left → right or top → bottom with a feathered edge ≈1 letter wide (≈4% W, ≈76 px @1080p, computed) [V:1i2L14 t=6.17-7.00s].
- Trim paths: stroke first, then fill (Bumper B: stroke 5 f, fill from a dot 8 f E-OUT, sheen 14 f) [V:19NRDv t=3.62-4.70s].
- Routes draw leg by leg, easing into each corner, with a ≈5 f pause, and reach the destination ≈0.35 s before the cut [V:126cpH t=11.6-13.23s].
- State fills wipe L → R with a feathered edge in 4 f (Bumper "matched" mint) [V:19NRDv t=20.37-20.50s]. Chart lines draw L → R, 26 f, staggered 4-8 f [V:19NRDv t=27.63-28.50s].
- Why: the eye is already scanning left to right; a reveal in the same direction is read for free.

**2D-U10 · Shapes carry continuity across cuts.** [U]
- Carry one primitive (circle, pill, line, square, card) across ≥2-3 setups, within ±5% of its screen position, changing scale and/or polarity at the cut [V:1i2L14 rule 7].
- Evidence: NOSTRA's dot → eye → circle chain → dot → typing dots over 5 setups in 4.1 s [V:1i2L14 t=1.07-3.83s]; kivi's pill → slabs → line → card [V:1-6l8S t=9.50-9.93s]; Chowdeck's card → notification [V:126cpH t=11.03-11.27s]; Wix's sparkle → prompt pill [V:15VhHR t=3.97-4.23s]; HubSpot's dot → caret concept match [V:1CSXtQ t=2.133s].
- Why: the eye tracks one object, so five setups read as one thought instead of five cuts. In 2D this costs nothing, because the shape is just a path.

**2D-U11 · Flat colour fields are a transition material.** [U]
- Polarity flips on 11 of 13 hard cuts (green ↔ off-white) [V:1i2L14]; the background colour changes on nearly every cut [V:1Hcg3X]; teal bookends and chapter colours [V:126cpH]; white as the "neutral room" for 12 of 32 transitions [V:1-6l8S]; navy claims vs light proof [V:19NRDv].
- Why: a full-frame colour change is the strongest "new beat" signal available in flat art, and it costs no motion. It also prevents two consecutive flat frames from reading as a jump cut.

**2D-U12 · 2D motion-blur policy: off by default, on only where speed demands it.** [U]

| Speed | Policy | Evidence |
|---|---|---|
| ≤5% W/f | No blur. Crisp vector edges are part of the flat look | [V:1-6l8S t=35.47-36.4s] none even on the truck (≈4% W/f peak, computed); [V:1CSXtQ] none on 2D moves |
| 5-10% W/f sustained | 180° shutter blur (safe default) [inferred threshold] | [N] 180° default; [V:15VhHR t=15.27s] blur on the carousel whip. Note: Lottieicon's tour moves 1-2 peak at ≈8-10% W/f unblurred and are not flagged [V:1ccYWJ t=27.40-29.87s], so blur here is insurance, not a measured necessity |
| >10% W/f | Only as a whip into a cut: blur on the last 2 f, or ≤2 unblurred frames that land on the cut | [V:1i2L14 t=6.07-6.10s]; [V:1CSXtQ t=1.93-2.10s] (the hook line's width shrinks by up to 74 px/f @720 ≈5.8% W, computed, so each edge moves ≈37 px/f; unblurred on the last frame before the cut) |

- Failure: Lottieicon's tour moves 3-4 peak at 22-27% W/f with no blur; the teardown reads them as strobing whip-pans "on playback [inferred from frames]" [V:1ccYWJ t=30.57-32.57s].
- Why [inferred]: at 30 fps a crisp edge that jumps a large fraction of the frame between frames is seen as discrete copies, which reads as stutter, not speed. The ≈5% line is a conservative cut-off between the unflagged ≈4% and the flagged 22-27%; the measured references tolerate up to ≈10% unblurred.

**2D-U13 · Weight is shown with physics, not with bounce.** [U]
- Falls and discards: E-GRAVITY, velocity ×1.2 per frame, with 10-20° rotation (NOSTRA's discarded card, 6 f slow sink then 13 f fall) [V:1i2L14 t=13.30-13.93s]; Chowdeck's produce falls (6-14 f, 70-90°) [V:126cpH]; HubSpot's dot falls 1 → 24 px/f [V:1CSXtQ t=0.70-2.10s].
- Landings: a decaying bounce with contact ripple rings, intervals 0.47, 0.47, 0.37, 0.37 s, then rest [V:1Hcg3X t=6.87-8.70s].
- Why: acceleration is the cue the visual system uses for mass. A constant-speed fall reads as a slide.

**2D-U14 · Ground every floating 2D object with one contact cue, from one shadow model.** [U]
- Models: soft drop (floating UI), hard long cast (editorial), solid offset backing card (playful), emissive under-glow (dark neon). One per film; one light direction per film. Details: Part 04 DP-10, DP-11.
- Why: a flat object without a contact cue reads as pasted on. With one, it reads as "at this height above that surface".

**2D-U15 · Two counter modes, chosen by meaning.** [U]
- **Earned result**: E-SNAP-L, ≈1 s, 70% of the range in the first 25% of the time, park a cursor or highlight on the final value. Bumper 84 → 100% in 31 f [V:19NRDv t=23.90-24.93s].
- **Honest tally**: E-LINEAR with a hard stop. Lottieicon 43 → 4,863 at ≈87 per frame over 56 f; 0 → 50 at 1.72 per frame over 29 f [V:1ccYWJ t=9.933-11.800s, 14.733-15.700s].
- Why: deceleration makes a final value feel arrived at; a linear count reads as a machine counting real items. Pick the one that matches the claim.

**2D-U16 · Continuous values ease; discrete states snap.** [U]
- Solar's battery gauge eases its fill (40% then drain to 20%) and snaps empty/full/alert in 0 f [V:1Hcg3X t=20.53-21.53s]. UI states change in 1-3 f [V:1CSXtQ t=10.20-10.333s] [V:15VhHR t=8.53s].
- Put the snap on a beat or a VO word: Solar's off-beat snaps "feel slightly arbitrary" [V:1Hcg3X Study H].
- Why: animating a binary state implies it passed through in-between states that do not exist.

**2D-U17 · Dither every gradient.** [U]
- Add 1-2% noise or dither to dark or smooth gradients before encoding [V:1ccYWJ rule 16]. Banding and macro-blocking are measured flaws in Lottieicon, Bumper and kivi's aurora [V:1ccYWJ] [V:19NRDv] [V:1-6l8S].
- Visible grain (≈3-5% [inferred]) is a separate, Editorial style choice [V:1Hcg3X].
- Why: an 8-bit, low-bitrate encode cannot represent a slow gradient without steps; dither breaks the steps up below the threshold of notice.

## 12.3 2D move library (measured recipes)

Each row is a recipe that can be keyed by hand or generated by a template. Numbers are from the cited teardown.

| ID | Recipe | Numbers (30 fps) | Ease | Use for | Evidence |
|---|---|---|---|---|---|
| 2M-01 | **Live-append line with auto-recentre** | Words 3-8 f apart, each entering ≈4% W offset; line recentres with k = 0.2-0.25 per frame, settles in 13-14 f, travel 10-15% W; then drift 3-4% W/s | E-LERP, then E-LINEAR | Dictation, chat, "live" statements | [V:1-6l8S t=0.10-1.50s, 28.50s] |
| 2M-02 | **Oversize slam** | Hero word from 3-4× to 1× in 8-13 f; 64% of the delta on frame 1, 86% by f3; 3-4 ghost copies on f0-f1 | E-SNAP | The first frame of a hook; single power words | [V:19NRDv t=0.00-0.30s, 7.20s, 46.13s] |
| 2M-03 | **Snap-hold-suck card** | Pop +40-55% in 6 f (velocity peak on f2), hold 6-10 f, shrink −24 to −30% over 8-18 f, cut on the smallest frame | E-SNAP, E-EXIT | Fast statement cards that hand scale into the next object | [V:1ccYWJ t=1.867-2.633s, 25.50-27.133s] |
| 2M-04 | **Rise + blur entrance** | 9-12 f, rise 2-10% H, blur → sharp | E-OUT | Calm single words or short lines | [V:1-6l8S t=4.45s, 25.47s, 31.85s] |
| 2M-05 | **Unfold (line → card)** | Bar height 3 → 40 px (tile scale) as an S-curve in 8 f; width +7%; content fades in 2 f after landing | E-INOUT | An input becoming the output surface | [V:1-6l8S t=9.63-9.93s] |
| 2M-06 | **Tossed card** | Enters at +15° on a held pose, ≈90% upright 3 f later, overshoots to −4°, upright by 16-22 f; offset backing card shrinks 6% → 3% | 1 f snap, E-SPRING-P | Playful UI cards only | [V:126cpH t=9.27-10.0s] |
| 2M-07 | **Shared-element collapse** | Card collapses bottom-anchored 100% → 37% height (width −18%) over ≈7 f into a notification pill; background racks focus over 11-12 f | E-OUT | Action → status hand-off | [V:126cpH t=11.03-11.43s] |
| 2M-08 | **Two-stage pull-out** | ×4.1 over 1.0 s: stage 1 E-SNAP (≈40% of its change on the first pose, ≈90% within 8 f), near-hold ≈0.25 s, stage 2 E-INOUT over ≈13 f | E-SNAP, E-INOUT | "One item, then everything" reveals | [V:126cpH t=5.20-6.20s] |
| 2M-09 | **Flat → real swap** | Same silhouette, position and angle, swapped in 0 f on a pose boundary; then a gravity fall of 6-14 f with 70-90° rotation within ≈0.6 s | snap, E-GRAVITY | Promise → proof; replaces AI morphing | [V:126cpH t=6.77s, 7.70s, 8.43s] |
| 2M-10 | **Expo envelope (arrive, hold, whip)** | Enters at 4% W/f decaying ×0.85/f, 90% by f12, settled by f25; holds 5 f; exits in 11 f at ×1.6/f to 19% W/f; cut on the clean plate | E-SNAP, E-WHIP | Any hero object in a flat world | [V:1Hcg3X t=5.43-6.83s] |
| 2M-11 | **Snap-tilt settle** | 1 f snap to 10-14°, E-OUT return over 12-15 f; ≤1 small overshoot (+5°) on objects, none on words | snap, E-OUT | Life on a held object | [V:1Hcg3X t=3.43-3.83s, 14.50-15.17s] [V:1ccYWJ t=5.43s] |
| 2M-12 | **Gravity bounce with contact rings** | Landing intervals 0.47, 0.47, 0.37, 0.37 s, then rest; concentric ripple rings from the shadow on each landing | E-GRAVITY in, E-OUT out | Introducing a hero object with weight | [V:1Hcg3X t=6.87-8.70s] |
| 2M-13 | **Long-settle split-panel wipe** | 49% W in ≈2.4 s: creep from 99.8% W, 15-20 f acceleration, peak 3.5-4% W/f, ≈50 f tail | E-SETTLE = cubic-bezier(0.45, 0, 0, 1) | Introducing a new word or comparison | [V:1Hcg3X t=16.83-19.60s] |
| 2M-14 | **Band push** | A new colour band rises from below carrying content (top edge 97% → 6% H), accelerating over 20-32 f; full new colour for 1 f; cut | E-INOUT → E-EXIT | Chapter changes in flat worlds | [V:1Hcg3X t=19.47-20.53s] |
| 2M-15 | **Particle coalescence + flash** | ≈60 particles converge into a column in 4 f, fuse into an icon in 2 f; full-frame flash 3 f + 2 f; echo outlines offset ≈5% W fade to 20% over ≈0.6 s | E-EXIT, snap, E-LINEAR | The single transformation peak of a film | [V:1Hcg3X t=12.60-14.25s] |
| 2M-16 | **Leg-by-leg route draw** | Pre-drawn grey path; red trim path fills legs of ≈28 f and ≈16 f, easing into corners, ≈5 f corner pause; arrives ≈0.35 s before the cut | E-OUT per leg | Progress, tracking, journeys | [V:126cpH t=11.5-13.23s] |
| 2M-17 | **Stroke → fill → sheen** | Outline stroke 5 f; fill grows from a dot 8 f; sheen sweep 14 f | E-OUT, E-OUT, E-LINEAR | Logos and hero icons | [V:19NRDv t=3.62-4.70s] |
| 2M-18 | **Oversize-and-settle pops** | Dots and icons enter at ≈2×, settle to 1.0 in 3-4 f, stagger 2 f; labels resolve at ≈1.25× and settle in 4 f; no undershoot | E-SNAP | Typing indicators, chips, labels | [V:1i2L14 t=3.567-3.83s, 17.50-17.63s] |
| 2M-19 | **Scatter → swap → converge** | ≈1 s per sentence: settle 7-14 f, hold 10-14 f, scatter 6-7 f, swap words in 1 f while displaced, converge ≈7 f | E-SNAP | Three short sentences without a cut | [V:1i2L14 t=7.57-10.63s] |
| 2M-20 | **Exponential zoom-through** | 3 f ease-in, then ×1.3-1.4 per frame for 8-10 f (≈20×); the next scene already sits inside the hollow | E-ZOOM | Diving into an icon or object | [V:1ccYWJ t=0.87-1.27s] |
| 2M-21 | **Light build into a cut** | Emissive glow area grows ×8-10 over ≈2 s, accelerating in the last third; cut on the frame of maximum glow | E-EXIT on glow | Anticipation without movement | [V:1ccYWJ t=18.87-21.00s] |
| 2M-22 | **Count-up** | Earned: 31 f E-SNAP-L. Tally: E-LINEAR, hard stop | per 2D-U15 | Stats, KPIs | [V:19NRDv t=23.90s] [V:1ccYWJ t=9.933s] |
| 2M-23 | **Boil / wobble on holds** | Background blobs reshape each pose; props wobble ±10° per pose; a tiny character wobbles on the final lockup | on twos | Keeping held illustration alive | [V:126cpH t=0.0-1.6s, 16.53-17.97s] |
| 2M-24 | **Dim-to-texture** | Previous shot dimmed to ≈15% in 3 f and kept as a texture behind the new content | E-LINEAR | Number in front of its proof | [V:1ccYWJ t=9.833s] |

## 12.4 2D surface and rendering rules

| Topic | Rule | Why | Evidence |
|---|---|---|---|
| Fills | Flat fills for objects; gradients only as atmosphere (soft radial blobs) or as a declared material (dark neon radial, sunset sky) | Gradients on every object fight the flat read and band at low bitrates | [V:1-6l8S] aurora blobs ≈150 px gaussian at 1138 W (≈13% W, computed); [V:1ccYWJ]; [V:1Hcg3X] |
| Strokes | One stroke weight per icon family, per film | Mixed weights read as assets from different sources | [V:1Hcg3X §9] 1-weight line icons; [V:1ccYWJ] 2 px-style strokes |
| Corner radius | One radius family (cards, pills, chips), taken from the brand UI | Radii are a brand signature; ILLO treats corner radii "as intentional parts of the story" | [W:showreel DoorDash]; [E] 16-24 px web, 32 px in video [inferred] |
| Shadows | One model per film (soft drop / hard long / offset backing / under-glow); one light direction | Two models or two directions read as two composited worlds | DP-10; [V:1Hcg3X] flaw |
| Glow | Emitters only (lamp, screen, light ring, bolt, neon label, active state); radius ≈1-2% of frame; on type ≤2-3% of cap height | A glow says "light source" and "nearest/most important"; on a non-emitter it reads as a filter | [V:1Hcg3X §13]; [V:19NRDv t=7.2s] smeared bloom |
| Photo cut-outs in flat art | Same silhouette as the flat icon they replace; soft drop shadow; never more than 3 rendering idioms in one frame | The silhouette carries continuity; the shadow seats the photo in the flat world | [V:126cpH t=6.77s] and flaw 6 |
| Illustration style lock | All illustrated or generated plates share one rendering style and one light direction | kivi's gouache desk, watercolour courtyard and flat office plates "do not match each other in style": the film's biggest flaw | [V:1-6l8S §13] |
| Long shadows at 45° | Avoid in modern SaaS | "Reads slightly dated" | [V:126cpH flaw 5] |
| Crispness | 2D type and UI stay pixel-sharp except during 3-5 f entry blur or 1-2 f exit defocus | Crisp edges are the flat style's quality signal | DP-04 |

## 12.5 Cadence: ones, twos and pulldown

**2D-U18 · Animate UI, type and camera on ones at the delivery frame rate. Use twos only for illustration or collage layers, as a declared style.** [U, with S for twos]
- Chowdeck animates every graphic pose for 2-3 capture frames (≈12 unique fps) and keeps its live-action insert on ones [V:126cpH caveat]. It gives a tactile, hand-made, stop-motion feel that unifies flat art, photo cut-outs and UI, and hides cheap tweening.
- Figma's Config 2025 opening film "was dropped from 60 to 15 fps to feel handmade" [S:Figma] (text source; consistent with Chowdeck).
- Keep UI scrolls, cursors and camera moves on ones in SaaS work: stepped UI motion reads as lag [V:126cpH rule 13, inferred].
- Render natively at the delivery rate. Wix and HubSpot (25 → 30) and Solar (24 → 30) show a duplicated frame every 5-6 frames, which judders on slides, whips and scrolls [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X].
- Why: on twos, the eye accepts discontinuity as a drawing style; on a UI element the same discontinuity reads as a slow computer.

## 12.6 2D in 9:16 (vertical)

Only one vertical reference (Chowdeck) was measured, so these rules are a single-reference spec plus the safe-zone data in [N].
- **Stack vertically, read upward.** A small setup word over a huge punch word at a ratio of ≈1:2.5-1:3 ("been" over "busy?", "order in" over "seconds") [V:126cpH §8]. Hero word ascender 12-13% H, ≈84% of width.
- **Vertical moves are the story axis.** A vertical push of 1 frame-height in ≈11 f (E-INOUT, peak ≈4.2 frame-heights/s, ≈10% H directional blur at peak) reads as "forward" [V:126cpH t=2.53-2.90s]; a tilt down through a cloud band lands the lockup [V:126cpH t=15.20-16.53s].
- **Keep text inside the strict cross-platform band** x 120-840, y 270-1210 @1920p [N].
- Why: in vertical frames there is no horizontal room for travel, so the frame height carries direction and hierarchy.

## 12.7 Style-specific 2D (2D-S)

| ID | Style | 2D signature | Numbers | Evidence |
|---|---|---|---|---|
| 2D-S1 | Calm-Tech / Airy Aurora | Line-level kinetic type only (no per-letter motion); auto-recentre; breathing pushes; light washes as transitions | Pushes 1.07-1.29×; washes 4-7 f (blooms) to ≈18 f (washes) | [V:1-6l8S] |
| 2D-S2 | Prompt-Native | Typing is the motion; caret held at 65-66% W; staircase → baseline collapse; word-spacing match cuts | Typing 9-35 cps; collapse 7-10 f; spacing ×1.5 out, ×1.25 in | [V:1CSXtQ] |
| 2D-S3 | Kinetic-type launch | Slam → word build → pull-back; semantic letter animation ("$$$$" decodes to "thousands", self-assembling "Automatically", kicked letters) | Slam 8-13 f; words 7-10 f apart; semantic moves 9-30 f | [V:19NRDv] |
| 2D-S4 | Dark neon reel | Snap-hold-suck cards; zoom-through; glow builds; auto-fit type-on | Type-on 40-55 cps with width capped at 50-70% W | [V:1ccYWJ] |
| 2D-S5 | Retro-editorial 2.5D | Expo envelope on every shot; whip carriers; background colour flip per cut; grain; bloom on emitters | §12.2 2D-U3 numbers | [V:1Hcg3X] |
| 2D-S6 | Monochrome brand system | Shape-match chains; polarity flips on ≥75% of cuts; scatter-swap-converge type | Stagger 1-3 f; cycle ≈1 s | [V:1i2L14] |
| 2D-S7 | Playful collage | On twos; pops (0-4 f); boil; gravity; flat-to-real swaps; offset backing cards | ≈12 unique fps; pops 1 f; settles ≤22 f | [V:126cpH] |
| 2D-S8 | Editorial brand frame | Small type held ≥1.0 s still; inline chips and objects inside a sentence; scale-contrast cut from macro type (49% H cap) to small (6.6% H) | Word rises 6 f, new word every 7 f | [V:15VhHR t=0.00-4.23s] |

## 12.8 Experimental 2D (2D-X)

- **2D-X1. Black-and-white → colour bloom** on "before" plates as the voice or product arrives: saturation 0 → 100% over 22-42 f, linear [V:1-6l8S t=18.57-19.33s, 54.0-55.4s]. kivi applies it to only two of four matching scenes; define the rule before using it.
- **2D-X2. Semantic letter animation** (letters act out the word) [V:19NRDv t=7.68-8.08s, 14.33-15.37s, 46.13s]. 9-30 f per word. Bumper uses exactly three and its teardown recommends "at least 3 times per film" in a kinetic-type launch [V:19NRDv rule 5]; keep it to ≈3-4 so each one stays an event [inferred cap]. In calmer styles, one is enough [inferred].
- **2D-X3. Shimmer / gloss sweep** across AI-polished text, ≈0.8 s L → R [V:1-6l8S t=15.0-15.8s]; ElevenLabs' open-source ShimmeringText uses a 2 s linear sweep with a 0.5 s pause [E].
- **2D-X4. Polarity-flip cold open**: ≈2 s on black, then hard cut to the white product world on the first hit [V:1CSXtQ t=0.00-2.133s].
- **2D-X5. Split-screen etymology / comparison wipe** with E-SETTLE [V:1Hcg3X t=17.0-19.4s].
- **2D-X6. Liquid / gooey shapes with echo trails** ("?" that splits into 2-3 echo copies) [V:1i2L14 t=0.13-0.70s]. Once per film.

## 12.9 Avoid (2D-A)

| ID | Avoid | Fix | Evidence |
|---|---|---|---|
| 2D-A1 | Holds longer than ≈5 f with nothing moving on flat art | Drift 0.1-0.5%/f or push 1.05-1.15× | [V:1Hcg3X] (rule); slideshow read |
| 2D-A2 | Linear position moves that start and stop on screen | E-OUT / E-GLIDE; linear only for drifts, draws, counters | [N]; Part 03 |
| 2D-A3 | One ease on everything (Easy Ease everywhere) | Role-based tokens (2D-U5) | Part 03 §19.3 (26-39% error vs measured) |
| 2D-A4 | Bounce or elastic on text, UI chrome or logos | 0% overshoot | 7 of 8 references |
| 2D-A5 | Sustained unblurred moves above ≈5% W/f (hard limit ≈10%) | Blur at 180°, slow the peak, or bury it in a cut | [V:1ccYWJ t=30.57-32.57s] (22-27% W/f flagged); threshold [inferred] |
| 2D-A6 | Pixel or glitch builds longer than ≈12 f | ≤12 f, or a clean blur-in | [V:1i2L14 t=16.63-17.50s] (23-26 f "illegible noise") |
| 2D-A7 | Mixed illustration styles across plates | Lock one rendering style and light direction | [V:1-6l8S] |
| 2D-A8 | Zero-stagger rows of like items | 2-3 f stagger | [V:1-6l8S t=34.50s] |
| 2D-A9 | Decorative rays or bursts crossing the claim word | Mask rays behind the type | [V:126cpH t=3.90-4.43s] |
| 2D-A10 | More than one flash, or a flash longer than 3 f | One flash per film, 3 f + 2 f; ≤3 flashes/s | [V:1Hcg3X]; [N] WCAG 2.3.1 |
| 2D-A11 | A 1-frame dip to black between worlds | A clean cut or a 2-4 f luma dip | [V:19NRDv t=25.60s] |
| 2D-A12 | Stepped (twos) UI, scrolls or cursors | UI on ones | [V:126cpH rule 13, inferred] |
| 2D-A13 | Frame-rate conversion by duplication | Render natively | [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X] |
| 2D-A14 | Transition artefacts left in (stray previous-frame patches, overlapping words mid-exit) | QC every cut at 1-frame stepping | [V:1-6l8S t=59.73s, 64.27-64.33s] |

## 12.10 Especially good for SaaS (2D-SaaS)

1. **Text → UI build.** The headline is typed, then the component builds around it (shadow/border 1-3 f, brand icon pop ≈3 f, toolbar 4-5 f), then a ×0.75 pull-back [V:1CSXtQ t=7.80-9.03s].
2. **Icon → UI morph.** The brand line's sparkle stretches into the prompt pill in 6 f while everything else fades in 6 f [V:15VhHR t=3.97-4.23s].
3. **Line → card unfold** (2M-05) and **shared-element collapse** (2M-07): the UI object survives the scene change.
4. **Cascades in reading order** after an 8-9 f empty hold: 3-4 f stagger, 4-6 f per element, 13-22 f total [V:1-6l8S t=22.87-23.87s].
5. **Discrete UI states snap, continuous values ease** (2D-U16).
6. **Dim-to-texture** behind a stat (2M-24).
7. **Route or progress draws** for tracking and workflow stories (2M-16).

## 12.11 Do / Don't (2D)

| Do | Don't |
|---|---|
| Enter with 40-64% of the travel on the first frame and leave with an accelerating 6-11 f whip | Ease in and out symmetrically on every element |
| Drift 2-4 px/f @1080p on a held card | Freeze a vector card for a full second "so it can be read" |
| Tilt a dropped prop 10-20° as it falls with ×1.2/f acceleration | Spin a headline 360° to make it dynamic |
| Swap a flat icon for its photo in 0 f on a pose boundary, same silhouette | Ask a generator to morph the icon into the photo |
| Carry one circle from the hook into the next three setups | Introduce a new shape vocabulary on every cut |
| Stagger four icons 2-3 f apart | Pop four icons on the same frame |
| Keep UI on ones even when the illustration runs on twos | Posterize the whole comp, cursor and scrolls included |
| Dither the dark gradient at 1-2% | Ship a smooth navy gradient at web bitrates and accept the banding |

## 12.12 Where the references overrule generic advice (2D)

| Generic advice | What the references do | Ruling |
|---|---|---|
| Use 180° motion blur on motion [N] | 5 of 8 leave 2D moves unblurred; blur only on whips and fast scrolls | **References win** below ≈5% W/f. Above it, [N] applies (2D-U12) |
| Springs for text: ≈2.8% overshoot; Remotion's default spring has 16.3% [N] | 0% on all type and UI in 7 of 8 | **References win**: 0% (2D-U6) |
| Anticipation: a 3-6 f pull-back of 2-5% before objects move [N, unverified] | No cartoon anticipation measured; Chowdeck's card morph has none on re-measurement. Anticipation is narrative: a cursor dwell of 10 f, an arrow turning ≈10 f before a whip, a card drifting up ≈5 px before a cut | **References win**: anticipate with intent, not with squash [V:126cpH] [V:1i2L14 t=5.50-5.87s] [V:1-6l8S t=67.50s] |
| "Motion should be snappy/bouncy/calm/smooth by product promise" [S:playbook] | Agreed, but "bouncy" appears only on physical props in the one playful consumer reference | **Narrowed**: bounce never on type or UI, even in playful styles |
| Linear only for opacity and drifts [N] | Agreed, plus linear counters (tally), route draws, iris wipes and colour ramps | **Extended** (2D-U15, 2M-16) |

---
# Master §13. 3D Motion Guidelines

## 13.0 Why 3D is a contrast effect in SaaS films

In the references, 3D is never the medium; it is a **punctuation mark** inside a 2D film (census §0.3). That is why it works:
- **It is rare.** HubSpot spends its only depth, DOF and parallax on 3.67 s of 30 s (12%), "on the one idea that needs explaining: data moving from HubSpot into ChatGPT" [V:1CSXtQ t=17.80-21.47s]. Wix keeps 3D to "three moments only (heart, ice, card deck)", "so the 3D moments read as special" [V:15VhHR §6].
- **It carries a fact the flat world cannot.** Going *inside* the data (Bumper's push-through into two columns [V:19NRDv t=18.25-18.55s]), *many becoming one* (Bumper's chips imploding into the logo [V:19NRDv t=55.00-55.60s]; Wix's deck folding into the heart [V:15VhHR t=48.27-49.83s]), *one standing out among many* (NOSTRA's glowing tile in a fogged grid [V:1i2L14 t=19.13-20.33s]), *a place* (Lottieicon's planet-horizon dome [V:1ccYWJ t=21.00-22.33s]).
- **It is the riskiest layer.** True 3D adds perspective, light, focus and material, and each is another cue the viewer checks. Every 3D flaw in the set is a consistency flaw: a plane intersection [V:1CSXtQ t=18.4-19.0s], unblurred strobing pans [V:1ccYWJ], low-contrast glass bars on navy [V:19NRDv t=11-14s], heavy bloom smearing letters [V:19NRDv t=7.2s].

Two references use no 3D at all (kivi apart from a cursor; Solar) and still read premium. **3D is optional; consistency is not.**

## 13.1 The meaning test: when to go 3D (3D-U1)

**3D-U1 · Add a dimension only when the third axis carries a story fact. Write the fact in the brief.** [U]

| Story fact | 3D device | Reference | Flat alternative if 3D is not justified |
|---|---|---|---|
| "We go deeper into the same thing" | Push-through a UI layer; dolly through a foreground | [V:19NRDv t=18.25s] [V:1CSXtQ t=19.95s] | Cut-in 2-3.5× (CM-13) |
| "Your message/data travels to another system" | Screen-to-world pull-back revealing both systems; particles made of the source UI | [V:1CSXtQ t=17.80-19.95s] | Route draw between two cards (2M-16) |
| "Many become one" / "unification" | Ring of items imploding into a logo; deck collapsing into a slot | [V:19NRDv t=55.0s] [V:15VhHR t=49.63s] | Chaos-to-order snap of chips into one card [S:Slack, inferred] |
| "One stands out among many" | Tilt onto a grid plane, hero tile glows, the rest fog out | [V:1i2L14 t=19.13-20.33s] | Dim all but one to 20% [S:TradeLens, inferred] |
| "There are many of these, and they are real objects" | Extruded card column flipping up; card deck fan | [V:1ccYWJ t=16.10-18.83s] [V:15VhHR t=48.27s] | Staggered grid (2D-U8) |
| "This is a place / a scale" | Horizon dome rising; floor plane; studio | [V:1ccYWJ t=21.13-21.87s] [V:1CSXtQ] | Colour-field horizon in 2.5D [V:1Hcg3X t=26.53s] |
| "This product has volume" (hardware, a tangible artefact) | Volumetric hero object with real material | [V:15VhHR t=29.47-33.33s] (ice bottle); [W:showreel] hardware "full 3D/CGI hero treatment" | 2.5D rim thickness and a contact shadow (DP-15) |
| "The system is a network" | Nodes in depth with a travelling pulse | [V:19NRDv t=39.87-46.13s] | Flat node diagram with dashed edges [S:playbook gap 13] |

- Why: 3D costs reading time (tilt, focus) and adds failure modes. When the extra axis says something, the cost buys meaning; when it does not, it is decoration, and decoration is what reads as template or AI.

## 13.2 3D budget by style

| Style | 3D register | Budget | Never in 3D | Evidence |
|---|---|---|---|---|
| Minimal Premium (prompt-native) | One hero beat at D4 | 10-15% of runtime, placed after the setup (HubSpot: 59-72% of runtime) | Text cards, logo, typing | [V:1CSXtQ] (computed) |
| Minimal Premium (calm-tech) | At most one small D3 object (a cursor) | ≈1% | Everything else | [V:1-6l8S t=36.2-37.15s] |
| UI-Focused Demo in a brand frame | 2-4 D2/D3 moments: inline hero object, carousel, deck, anchored object | ≈15-25% | The brand sentence, the logo, UI being read | [V:15VhHR] |
| Kinetic-type launch × 3D proof | D2/D4 on every proof shot | ≈40-55% (Bumper ≈51%) | Every claim card | [V:19NRDv] |
| Dark neon asset reel | D1-D2 accents | ≈10% + DOF in the CTA | Statement cards | [V:1ccYWJ] |
| Monochrome brand system | Short D2/D3 accents, one material each | ≈30-35% as 1-3.5 s accents | Kinetic sentences | [V:1i2L14] |
| Editorial 2.5D explainer | D1 only | 0% true 3D | — | [V:1Hcg3X] |
| Playful collage | D0-D1 | 0% | — | [V:126cpH] |
| Cinematic Product Launch / 3D Technology Film | D3-D4 as the main register | 50-90% [inferred] | Text (always composited flat on the focal plane) | No measured reference; [S:Bolt]; [W:showreel] (text only) |

## 13.3 3D element cards (3E)

Each card: what it is, measured motion, material and light, the rule, and why.

### 3E-01 Tilted UI planes (tables, dashboards, charts) [S: kinetic × 3D; SaaS]
- **Measured.** Tables fly in from bottom-right at ≈35° Y / 20° X [inferred angles] with heavy motion blur and settle in 12 f (E-SNAP), then the perspective slowly flattens [V:19NRDv t=16.77-17.17s]. A dashboard is shown macro, tilted, with shallow DOF at the panel edges; a 2-3 f pull-back snap reveals the whole screen; it then yaws away and recedes over ≈32 f as a soft exit [V:19NRDv t=27.57-29.97s]. A 3D bar chart sits in perspective with translucent glass bars [V:19NRDv t=11.00-13.13s].
- **Rule.** Fly in at 30-45°, settle in 12-22 f, and flatten to ≤15° before anything on the plane is read (DP-19). Exit by yaw-and-recede or by a push-through, not by a fade.
- **Why.** The tilt in transit says "this is an object in a space"; flattening before reading respects legibility. Foreshortening compresses glyphs, so text on a 35° plane reads slower [inferred].

### 3E-02 Rings, carousels, decks and walls of cards [U across 4 refs]
- **Rings.** Payment chips fly in along curved arcs (22 f, heavy blur) into a ring with DOF (near chips soft, ring-plane chips sharp), which rotates slowly clockwise for ≈36 f [V:19NRDv t=4.97-6.90s]. A second ring builds chip by chip at a 4-6 f (@15 fps) stagger, then implodes (3E-08) [V:19NRDv t=52.75-55.60s]. NOSTRA puts the camera *inside* a ring of ≈8-10 curved copy cards with design-tool handles and orbits [≈120-180°, inferred] over ≈1.5 s, settles frontal, then pulls back ≈90% → 48% card width in ≈7 f [V:1i2L14 t=10.77-13.10s].
- **Carousels.** The page shrinks 100 → 85% and rotates on Y as its neighbour slides in (6 f, E-EXIT), cut; the strip then runs the BRIDGE shape: decelerate ≈14 f → dwell ≈6 f → accelerate ≈13 f to a whip peak → land with a ≈16 f ease-out [V:15VhHR t=13.93-15.87s].
- **Decks.** ≈10 site cards rotated on Y [≈35-45°, inferred] fan out (≈11 f ease-out), cruise (≈7 f), then accelerate (≈21 f) and cut at peak velocity [V:15VhHR t=48.27-49.63s].
- **Walls.** A card in a wall rotates from ≈15° to 0° in 7 f before its inner page scrolls [V:15VhHR t=33.33-34.47s].
- **Rule.** Use a ring or deck when the message is "the set". Move it with BRIDGE or stepped motion, never a constant spin. Flatten the one card that will be read.
- **Why.** A collection in depth reads as quantity and system at once; the dwell gives the eye one beat to read before the next acceleration.

### 3E-03 Extrusions and slabs [S; cheapest 3D]
- **Measured.** Lottieicon's flat category cards get an accent-green extruded edge 6-8% thick and flip up from edge-on: card 1 rotates 90° → 0° on Y in 8 f *through* the headline, growing to ≈45% W; the rest follow on a constant upward scroll with a stagger of ≈10 f → 2-4 f → 5-7 f (average ≈5.5 f) [V:1ccYWJ t=16.10-18.83s]. Bumper's "Amount" columns extrude forward out of their tables before the push-through [V:19NRDv t=17.6-18.2s].
- **Rule.** An extrusion is the default way to give a flat card volume. Colour the side face with the accent so the edge doubles as a highlight.
- **Why.** A visible side face is the simplest proof of volume and needs no lighting model or DOF (DP-15).

### 3E-04 Volumetric hero objects [S]
- **Measured.**
  - A glossy red 3D heart with a specular highlight spins on Y inside a flat sentence (edge-on at 1.03 s), pulses, and at the end the deck collapses into it [V:15VhHR t=0.63-4.23s, 49.63-51.37s].
  - A refractive 3D ice bottle with caustics rotates slowly and is held in one screen region over 4 layout swaps of 0.47-0.96 s; a specular streak flares across it on one cut frame; a 2D editor selection box tracks it [V:15VhHR t=29.47-32.83s].
  - A glossy "inflated" phone pops with squash and a rotation wobble over ≈9 f, then bobs; it is the film's only fully shaded glossy object [V:1i2L14 t=24.50-25.93s].
  - A form unfolds into a 3D sheet from edge-on in 6 f (Y-rotation) [V:1i2L14 t=24.53-24.73s].
  - A frosted glass cube condenses from a particle trail (≈6 f), rotates to frontal (≈6 f), and a ✓ strokes on [V:1i2L14 t=28.7-29.2s].
- **Rule.** One material per object family and one object per idea. Introduce it with a physical verb (unfold, condense, pop, rotate to frontal), let it idle with a slow spin or bob (≤0.5 px/f bob [V:1i2L14]), and hand it back to 2D with a collapse, swap or cut.
- **Why.** A modelled object in a flat world is the most "expensive"-looking element per second, and the most fragile; one clean verb in and out keeps it from becoming a floating screensaver.

### 3E-05 3D cursors [S; SaaS]
- **Measured.** kivi's glossy purple-gradient 3D arrow rises in from the bottom (≈6 f), the hovered tile lifts ≈5 px, and the click blooms into white over ≈6 f [V:1-6l8S t=36.20-37.15s]. Bumper's glossy orange 3D paper-plane cursor with a soft shadow flies in with motion blur over ≈12 f, parks, and each click gets a visible reaction within 6-8 f [V:19NRDv t=11.10-12.27s, 24.20-24.60s].
- **Rule.** A 3D cursor is allowed over 2D UI if it has a contact shadow and the brand colour, and if it is the same cursor in every UI scene. Wix and HubSpot instead use native-size OS arrows (≈2% FH) for "honest" product truth [V:15VhHR] [V:1CSXtQ].
- **Why.** The cursor is the viewer's proxy; a branded 3D cursor makes interactions feel designed, while an OS arrow makes them feel real. Pick one per film.

### 3E-06 Characters with dimensional shading [X]
- **Measured.** NOSTRA's hand puppet and hand-shadow "bird" use grain-gradient shading (dithered white → green → black); the bird's eye is a bloom sphere that becomes the next shot's circle [V:1i2L14 t=0.70-2.63s].
- **Rule.** Use dithered or grain-gradient shading to give a character volume while keeping it in the flat palette. Once per film (DP-X4).
- **Why.** Dither shading says "3D" without importing a render look that clashes with flat colour.

### 3E-07 Environments and studios [S]
- **Measured.** HubSpot's studio: a blue-grey radial (#C8D4DF → #F4F5F8), soft diffuse light, gentle vignette, the white chat pane as a glass-edged plane, a second app window behind it; it fades in over ≈6 f during the pull-back [V:1CSXtQ t=18.00-19.03s]. Lottieicon's horizon: a black dome covered in icons rises like a planet from 88% to 58% H in 22 f (E-SNAP, 70% of the travel in 8 f) with a rim glow, carrying the line "Get both / AEP + JSON" [V:1ccYWJ t=21.13-21.87s]. NOSTRA's floor: a single tile becomes a grid that tilts onto a floor plane in 6 f [≈45-55°, inferred]; the hero tile turns white and glows while far rows fade into green fog over ≈26 f [V:1i2L14 t=19.13-20.30s].
- **Rule.** The environment takes its colours from the 2D palette, has one light direction, and has a horizon or fog falloff instead of modelled detail.
- **Why.** The environment's only job is to make the focal plane read as "in a place". Detail behind the focal plane competes with it (DP-05); fog and a horizon give place without detail.

### 3E-08 Particles and data fields [S; SaaS]

| Use | Count and size | Motion | Colour | Evidence |
|---|---|---|---|---|
| **Data transfer** (one system's data into another) | ≈200-300 discs, Ø ≈8-15 px @720 (≈1.1-2.1% H, ≈12-22 px @1080p, computed) [count estimated] | Disintegration sweeps L → R in ≈0.95 s (≈350 px/s @720); released discs drift toward the destination and hang as a cloud; foreground discs grow to 30-40 px @720 and go to bokeh during the dolly | Two tones sampled from the source UI (navy sidebar → navy discs; white canvas → white discs) | [V:1CSXtQ t=19.00-20.47s] |
| **Energy field** (invisible physics made visible) | ≈50-60 particles, varied size as a depth cue | Rain, colour flicker in 3-4 f bursts, converge into a column in 4 f, fuse into an icon in 2 f | Palette white/cyan | [V:1Hcg3X t=11.53-12.80s] |
| **Climax burst** | ≤12 sparks | Radial burst and fade over 10 f, with a soft halo behind the logo | Brand accent | [V:19NRDv t=55.27-55.60s] |
| **Trail → object** | One comet trail | Draws a loop over ≈24 f, then condenses into an object | White on brand hue | [V:1i2L14 t=27.8-28.9s] |
| **Orbiting electrons** | A ramping count over ≈2 s | Thin arc trails; density increases toward the transformation | White | [V:1Hcg3X t=9.20-11.30s] |

- **Rule (3D-U8).** Particles are made of something already on screen (its colours, its pixels, its idea), have a direction (from source to destination), and end in a state (a cloud that hangs, an icon, a logo). Never ambient sparkle.
- **Why.** Particles made of the UI "keep the abstraction honest (no random sci-fi particles)" [V:1CSXtQ Study F]. Undirected particles are an AI-look tell (excess particles, purposeless motion).

### 3E-09 Text in 3D [S, showpiece only]
- **Measured.** NOSTRA bends a white banner into a 3D ribbon carrying repeated "MOTION DESIGN" as text-on-path (4 f), pushes in until the type is ≈40% cap height, twists it to hide a background polarity swap, pulls back to a full-frame S-curve, and lets it flow as a travelling sine wave that flattens [V:1i2L14 t=14.67-16.63s]. Bumper's tooltip types its words on a foreground plane with parallax against the defocused chart plane [V:19NRDv t=13.13-14.33s].
- **Rule (3D-U9).** Copy that must be read stays on the focal plane, facing camera (≤15°), sharp. Text-on-path and 3D type are for words the viewer already knows (the brand's own name, a repeated phrase).
- **Why.** In 3D, text gains perspective, occlusion and focus, all of which cost reading time.

### 3E-10 Abstract hero objects (orbs, glass spheres, waveforms) [S for AI/voice brands; text-sourced]
- **Sourced (code).** ElevenLabs' open-source orb: a three.js circle (radius 3.5, 64 segments) with a fragment shader; 7 soft ovals in polar layout drifting by `0.5·sin(uTime/20 + offset)` with `uTime` advancing 0.5/s, so the drift period is ≈251 s ("the orb barely moves"); Perlin flow distortion; two noisy white rings; a ramp black → colour 1 → colour 2 → white; listening state `0.55 + 0.35·sin(3.2t)`, talking `0.65 + 0.22·sin(4.8t)` [E].
- **Text.** "Glassy gradient sphere", "space sphere", "3D shapes", "2D-3D motion" titles are "brand-hero object loops used in AI launches" [W:raivcoo]. ElevenLabs' rebrand uses Chladni sound-wave patterns "layered with blur" [E].
- **Rule.** An abstract hero object moves *very* slowly (a drift period of minutes) and reacts only to a product state (listening, talking, generating), never to the edit.
- **Why.** A near-still living object reads as calm intelligence; a fast-spinning one reads as a screensaver [inferred, consistent with [E]'s code].

### 3E-11 Hardware and physical-product renders [text only]
- **Text.** Hardware launches (Surface Laptop, Figure, Codex Micro) get "full 3D/CGI hero treatment" [W:showreel]; 3D product showcases (Switch 2, Galaxy S24, Lenovo) and a "3D car portal to another world" [W:raivcoo]. PointCard's "hyper-real" card render is listed as not reproducible without 3D rendering [S:PointCard].
- **Rule.** For a SaaS film that must show a device, use a generic, untextured device frame (UI-E01) or a 2.5D card with a specular sweep [S:playbook gap 6, inferred]. Reserve modelled hardware for hardware products.
- **Why.** A photoreal device draws attention to itself and away from the UI, and trademarked silhouettes are a legal risk [S:playbook].

## 13.4 3D camera rules (3D-U)

Part 04 (CM-04, CM-09, CM-10, CM-15, CM-16, CM-17, CM-18) holds the full move cards. These are the rules that apply whenever the camera is a real 3D camera.

**3D-U2 · A critically damped camera: 0% overshoot, 0° roll.** [U]
- No reference rolls the camera or lets it overshoot; HubSpot's dolly carries ≤1° incidental roll drift [V:1CSXtQ t=20.25s]; the camera never bounces [Part 04 0.4 NO SPRING].
- Why: a real camera has mass and an operator; overshoot or roll on a virtual camera reads as "keyframes", not as a camera.

**3D-U3 · Lens feel: moderate telephoto for UI; wide only as a declared surreal style.** [U for UI; S for wide]
- HubSpot's 3D beat has "a moderate-telephoto feel: little perspective convergence on the window (left edge 272 px vs right edge 260 px tall, ≈10° yaw [inferred])" [V:1CSXtQ §7]; the edge heights are measured, the yaw angle is the teardown's estimate. Bumper's UI reads mid-telephoto, "flattened perspective with shallow DOF at the panel edges" [V:19NRDv §7, inferred].
- Bolt's brief asked for "wide-angle lenses", a "slightly surreal" narrative and "fluid camera movements" that mirror checkout speed [S:Bolt]; Lottieicon's barrel-distorted zoom-out (bulge relaxes in ≈6 f while zooming ≈2× → 1× over ≈20 f) is the measured wide-lens device [V:1ccYWJ t=7.30-8.00s, 27.13s].
- Prompt words: "≈50-85 mm look, low distortion" for UI; "≈18-24 mm look, foreground rushing past" only for the surreal style [inferred mapping].
- Why: a long lens keeps UI rectangles rectangular and text undistorted; a wide lens exaggerates speed and depth, which is energy, not legibility.

**3D-U4 · Move in steps and bridges, not continuous spins.** [U]
- Stepped orbit: 9-12 f per step, motion-blurred, steps ≈1.2-1.3 s apart (≈2 beats at 100 BPM) [V:19NRDv t=29.97-35.93s].
- BRIDGE for strips and decks: decelerate 11-14 f → dwell 6-7 f below 15% of peak → accelerate 13-21 f [V:15VhHR].
- Hop-and-hold between targets: symmetric E-HOP glides of 17-32 f with holds of 7-20 f [V:1ccYWJ t=27.40-33.17s] (keep peaks ≤8-10% W/f, the reference's unflagged moves 1-2, or add blur; its 22-27% W/f moves 3-4 read as strobing [inferred in the teardown]).
- No reference uses a continuous 360° orbit [Part 04 census].
- Why: each step lands on something to read. A continuous spin never lands, so nothing is read, and it is the most common "3D demo reel" cliché [inferred].

**3D-U5 · The hero dolly: ×2-2.5 in ≈15 f, E-OUT, through a foreground layer that goes to bokeh.** [S/SaaS]
- HubSpot's dolly through the particle field: a reference icon grows ×2.3 in ≈15 f; foreground particles grow to 30-40 px @720 and defocus as they leave frame left; then a lateral settle (E-OUT) and an accelerating tilt down the result table [V:1CSXtQ t=19.95-21.47s].
- Why: the foreground passing the lens is the strongest depth cue there is (DP-07); one dolly is enough to make a whole film feel dimensional.

**3D-U6 · Screen-to-world: ×0.57 in 10 f, environment fades in over ≈6 f, then a further ×0.56 decelerating over 18-20 f.** [SaaS]
- [V:1CSXtQ t=18.00-19.03s]. Hand the velocity across the cut first: the sent bubble exits upward at 7 px/f (E-EXIT) and enters the next shot at 34 px/f (E-OUT) [V:1CSXtQ t=17.60-17.93s].
- Why: the pull-back answers "where did my message go?" by revealing the world in one gesture (CM-16).

**3D-U7 · Push-through: 9 f, the foreground blurs and falls away while the target stays sharp and rotates face-on.** [S/SaaS]
- [V:19NRDv t=18.25-18.55s]. Prepare it with an extraction (the target lifts forward 0.5 s before) [V:19NRDv t=17.6-18.2s].
- Why: context → extraction → focus tells the viewer exactly which data matters (UI-P5).

**3D-U8 is in 3E-08 (particles). 3D-U9 is in 3E-09 (text).**

**3D-U10 · Between beats, the 3D camera never stops; it drifts at ≈1-3% of frame per second.** [S for 3D registers]
- Bumper: "the camera is never static on UI" [V:19NRDv §7]. The network shot drifts and orbits for 6.26 s with beats every 0.8-1.4 s [V:19NRDv t=39.87-46.13s].
- A long 3D shot (>3 s) needs an in-shot camera beat (snap, step, push-through, punch-in cut) every 0.8-1.5 s [V:19NRDv rule 12].
- Why: a frozen 3D frame reads as a still render; a drift proves the space is real.

## 13.5 3D object motion rules

**3D-U11 · Fly-ins land with E-SNAP in 12-22 f, with motion blur in transit and none at rest.** [U in 3D registers]
- Tables 12 f [V:19NRDv t=16.77-17.17s]; chips 22 f along curved arcs [V:19NRDv t=4.97-5.70s]; cursor ≈12 f [V:19NRDv t=11.10s]; Lottieicon's dome 22 f (unblurred, a slower move) [V:1ccYWJ t=21.13-21.87s].
- Why: a fast landing reads as weight and decision; blur in transit and crispness at rest is how a real camera shutter behaves.

**3D-U12 · Turn objects to face the camera through edge-on flips and Y-rotations of 6-8 f.** [U]
- Card flip 90° → 0° in 8 f [V:1ccYWJ t=16.10-16.37s]; form unfold from edge-on in 6 f [V:1i2L14 t=24.53-24.73s]; glass cube rotates to frontal in ≈6 f [V:1i2L14 t=29.0-29.2s]; card in a wall flattens 15° → 0° in 7 f [V:15VhHR t=33.33s].
- Why: an edge-on start hides the face, so the turn becomes the reveal: a light change (accent edge → white face) that reads as "on".

**3D-U13 · Exits recede: scale toward ≈50% and dim, or yaw away, over ≈8-32 f, then cut.** [U in 3D registers]
- Chip group scales to ≈50% and dims over 8 f (E-EXIT) [V:19NRDv t=6.90-7.17s]; dashboard yaws and recedes over ≈32 f [V:19NRDv t=28.9-29.95s]; failed provider nodes shrink and recede [V:19NRDv t=40.8-43.9s].
- Why: receding in depth is the 3D equivalent of an expo-in whip: the object leaves the space instead of fading out of existence.

**3D-U14 · Collapse many into one with an ≈8 f implosion, then ≤12 sparks over 10 f and a soft halo.** [S/SaaS]
- [V:19NRDv t=55.00-55.60s]; the 2D equivalent is the deck → inline slot collapse in 6 f [V:15VhHR t=49.63-49.83s].
- Why: it is the visual thesis of every "one platform" product. The sparks mark the climax once; more sparks would be decoration.

**3D-U15 · Idle motion is slow and single-axis: a Y-spin, a ≤0.5 px/f bob, or a slow ring rotation.** [U]
- Wix's heart spins on Y [V:15VhHR]; NOSTRA's glass tiles bob ≈0.5 px/f [V:1i2L14 t=29.5-30.6s]; Bumper's chip ring rotates slowly clockwise [V:19NRDv t=5.7-6.9s]; [E]'s orb drifts with a ≈251 s period.
- Why: one axis of idle motion reads as alive; several axes at once read as floating, which is the "purposeless floating object" tell.

**3D-U16 · Squash, wobble and pop only on soft-material objects in playful or brand-system styles.** [S]
- NOSTRA's inflated phone squashes and wobbles over ≈9 f [V:1i2L14]; nothing in the premium SaaS references squashes.
- Why: squash says "soft"; on a glass card or a UI plane it contradicts the material.

## 13.6 Materials

| Material | Spec | Use | Evidence | AI-video risk |
|---|---|---|---|---|
| **Matte UI plane** | White or brand-tinted surface, soft large shadow, no specular | Every UI card in 3D | [V:19NRDv] [V:1CSXtQ] | Low, if the UI is composited flat on the plane |
| **Frosted glass** | Backdrop blur of what is behind, 1 px light rim, soft inner glow, tint from the scene, lighter top-right rim | Voice/AI cards, icon tiles, QR card | [V:1-6l8S t=18.37s, 39.75s] [V:1i2L14 t=28.7-30.6s] [V:19NRDv t=62.27s] | Medium: glass over flat colour reads as a grey box (DP-13) |
| **Glossy / inflated** | Saturated colour, specular highlight, soft body | One hero object (heart, phone, cursor) | [V:15VhHR] [V:1i2L14] [V:1-6l8S] [V:19NRDv] | Medium: specular must follow the film's light direction |
| **Refractive (ice, crystal)** | Refraction, caustics, specular streak | One showpiece object | [V:15VhHR t=29.47-33.33s] | High: refraction is where generated objects warp first [inferred] |
| **Grain-gradient / dithered** | Dithered ramp across the palette (white → hue → black) | Characters and props in flat-palette films | [V:1i2L14 t=0.70-2.63s] | Low (it is a 2D shading trick) |
| **Extruded accent edge** | Side face 6-8% of the card in the accent colour | Card stacks, columns | [V:1ccYWJ] [V:19NRDv] | Low |
| **Translucent glass bars** | Gradient glass for data marks | Charts in 3D | [V:19NRDv t=11-14s] | Medium: violet glass on navy fails ≥3:1 contrast (DP-A7) |
| **Emissive** | Self-lit accent with falloff ≈10% H; tile glow ≈20% of tile size | Active, selected, "powered" | [V:1ccYWJ] | Low |

**3D-U17 · One material per object family per film; at most three materials in a film.** [U]
- NOSTRA introduces grain-gradient, glossy 3D and glass "once each, not everywhere", and its teardown warns that adding more "would read as a template collage" [V:1i2L14 §13, §16].
- Why: materials are part of the world's physics. Each new material is a new world rule the viewer must learn.

## 13.7 Light in 3D

**3D-U18 · One key-light direction for the whole film, shared by 3D speculars, 2D shadows and glows.** [U]
- Solar's two shadow directions (batteries to the right, tokens down-left) are a measured flaw [V:1Hcg3X]. HubSpot's studio is "soft diffuse light", one cool blue-grey radial with a gentle vignette [V:1CSXtQ].
- Why: speculars and shadows are read as the light. A highlight on the left of a 3D object next to a 2D shadow falling left is two suns: two composited worlds.

**3D-U19 · Light the environment with the palette, not with a sky.** [U]
- Environments take a radial or fog in brand tones: blue-grey (#C8D4DF → #F4F5F8) [V:1CSXtQ], green fog [V:1i2L14], coral and violet blobs on navy [V:19NRDv], deep-green aurora on black [V:1ccYWJ].
- No reference uses HDRI-style realistic environments, glossy floors or mirror reflections; reflections are limited to specular sweeps [census; V:15VhHR §4; V:19NRDv §4].
- Why: a palette-lit environment stays inside the brand system; a realistic sky imports a photographic world that the flat 2D shots cannot match.

**3D-U20 · Light can be a transition and a depth cue: glow builds, rim light, bloom on the 3D object that is "on".** [S]
- Lottieicon ramps a glow area ≈×9.5 over 2.1 s into a hard cut [V:1ccYWJ t=18.87-21.00s]; its dome has a rim glow [V:1ccYWJ t=21.13s]; NOSTRA's hero tile glows white while the rest fog out [V:1i2L14 t=19.43-20.30s].
- Why: the brightest element is read first; using light for "active" costs no motion.

## 13.8 DOF and motion blur in 3D

**3D-U21 · DOF only inside the 3D register; the focal plane is always sharp; background blur ≥2-4% W; foreground goes to bokeh as it exits.** [U]
- HubSpot: bokeh only in the beat [V:1CSXtQ]; Bumper: DOF fall-off at panel edges and on near ring chips [V:19NRDv t=5.7s]; Lottieicon: DOF only on the CTA bubbles, which enter defocused and sharpen as they settle, in 2-3 depth bands [V:1ccYWJ t=39.2-40.5s]. Rack focus 8-12 f E-OUT (DP-06).
- Why: DOF is a camera property. Applying it inside a flat 2D shot imports a camera that does not exist there.

**3D-U22 · Motion blur on every 3D camera and object move, ≈180° shutter; off on 2D.** [S → U for D4]
- Bumper blurs every move, including fly-ins, whips, and the chip implosion [V:19NRDv §13]. HubSpot's 3D beat shows bokeh but the analysis notes no 2D motion blur [V:1CSXtQ]. Lottieicon's unblurred 3D-ish pans strobe [V:1ccYWJ]. [N]: Remotion `<CameraMotionBlur>` defaults to 180°.
- Why: an optical 3D world implies a shutter. Without blur, fast 3D moves look like a stepped render.

## 13.9 3D in AI-generated footage (Veo / Flow and similar)

These rules translate the above into generation constraints. Facts are from [P]; the consistency rules are [inferred] from the census and from the AI-look failures measured in kivi's generated-looking plates [V:1-6l8S §13].

| ID | Rule | Numbers / words to use | Why | Evidence |
|---|---|---|---|---|
| 3D-AI1 | Generate plates and hero objects, never UI or copy | Negative prompt as a noun list: "text, subtitles, captions, letters, watermark, logo"; no dialogue in the prompt | Veo adds gibberish subtitles when dialogue is implied; generative video cannot set exact typography | [P]; [N] |
| 3D-AI2 | One camera move per clip, named exactly | "slow dolly-in", "locked-off static", "slow pan", "crane up", "rack focus" | Veo defaults to static or subtle movement if unspecified; one move per clip stays controllable | [P] |
| 3D-AI3 | Plan clip length to the generator's units | Veo 3.1: 4, 6 or 8 s at 24 fps; extension adds 7 s; native 9:16 since Jan 2026 | A 6.26 s hero shot (Bumper's network) needs an 8 s generation trimmed, not two clips stitched | [P]; [V:19NRDv] |
| 3D-AI4 | Lock identity with references | Up to 3 `reference_images`; `last_frame` for continuity; repeat the same lens, aperture and light words in every prompt ("≈85 mm look, background softly out of focus, soft key from upper right") | Identity drift and lighting changes between shots are the top AI-look failures | [P]; DP-20 |
| 3D-AI5 | Describe the empty space the 2D layer will need | "subject in lower third, large clean empty area in upper half, shallow depth of field" | The generated plate is a background for composited UI and type | [P] (third-party advice) |
| 3D-AI6 | Use generated footage as a defocused plate, at ≥2-4% W blur | Plate blur radius ≈40-75 px @1080p | Blur hides generation flaws, though not all: kivi's crowd faces stay "mushy" | [V:1-6l8S t=64.4-69.62s]; DP-05 |
| 3D-AI7 | Match the frame rate | Either deliver the film at 24 fps, or conform 24 fps clips by optical-flow retiming rather than frame duplication | Duplicated-frame pulldown judders (measured in 3 references) | [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X]; retime method [inferred] |
| 3D-AI8 | One style per set of plates | Same rendering style, palette, lens and light words in every plate prompt | kivi's mismatched gouache/watercolour/flat plates are its biggest flaw | [V:1-6l8S] |
| 3D-AI9 | Mute generated audio | Mute in the edit; sound comes from the designed mix | Generated audio fights the music arc | [P] (audio always on) |

## 13.10 Style-specific 3D (3D-S)

| ID | Style | 3D signature | Evidence |
|---|---|---|---|
| 3D-S1 | Prompt-native minimal | One D4 beat: screen-to-world pull-back, UI-colour particles, ×2.3 dolly with bokeh, tilt down the result | [V:1CSXtQ] |
| 3D-S2 | Kinetic-type × 3D proof | Tilted glass UI planes, extruded columns, push-through, stepped orbits, chip rings, implosion; blur on every move | [V:19NRDv] |
| 3D-S3 | Editorial brand frame + UI demo | 2-4 hero objects (heart, ice, deck) used as story devices; 3D card carousel with BRIDGE motion | [V:15VhHR] |
| 3D-S4 | Dark neon reel | Extruded accent-edge cards, horizon dome with rim glow, barrel lens warp, DOF bubbles | [V:1ccYWJ] |
| 3D-S5 | Monochrome brand system | Short accents, each a different verb (orbit inside a ring, ribbon, floor tilt, unfold, inflate, condense) and each in the brand hue | [V:1i2L14] |
| 3D-S6 | Cinematic / 3D technology film | Wide-angle surreal camera, structured 3D scenes for volumes with organic 2D on top, fluid continuous camera travel (brief language) | [S:Bolt] (text only); no measured reference |

## 13.11 Experimental 3D (3D-X)

- **3D-X1. Camera inside a ring of content cards** as the "overwhelmed" metaphor (deliberately oppressive) [V:1i2L14 t=10.77-12.8s].
- **3D-X2. Text ribbon with a twist that hides a background swap** [V:1i2L14 t=15.4-15.6s].
- **3D-X3. Anchored refractive object across layout swaps** [V:15VhHR t=29.47-32.83s]; give it a label, since the teardown calls the montage "semantically vague".
- **3D-X4. Barrel lens-distortion zoom-out** to open a dense grid [V:1ccYWJ t=7.30-8.00s].
- **3D-X5. Code-driven abstract orb that reacts to VO loudness** (port [E]'s shader deterministically: `uTime = frame/30·0.5`).
- **3D-X6. Planet-horizon dome as a "scale" beat** [V:1ccYWJ t=21.13-21.87s].

## 13.12 Avoid (3D-A)

| ID | Avoid | Fix | Evidence |
|---|---|---|---|
| 3D-A1 | 3D on every shot "to make it cinematic" | Spend 3D on the beats that pass the meaning test (3D-U1) | DP-A1; no reference does it |
| 3D-A2 | Plane intersections, especially mid-move | QC at 1-frame stepping across the whole move | [V:1CSXtQ t=18.4-19.0s] |
| 3D-A3 | Reading text on planes tilted >15° | Flatten first (3E-01) | DP-19 |
| 3D-A4 | Continuous 360° turntables and spins | Stepped orbits, BRIDGE | Census; Part 04 |
| 3D-A5 | Unblurred fast 3D camera moves | 180° blur or slower peaks | [V:1ccYWJ] |
| 3D-A6 | Low-contrast translucent data marks | ≥3:1 against the background | [V:19NRDv t=11-14s]; [N] WCAG 1.4.11 |
| 3D-A7 | Bloom that smears letter edges on hero type | Glow ≤2-3% of cap height | [V:19NRDv t=7.2s] |
| 3D-A8 | Random ambient particles, lens flares, chrome | Particles with a source, direction and end state | [V:15VhHR §13] ("no particles, lens flares or chrome"); 3E-08 |
| 3D-A9 | Greeked or low-resolution UI textures on 3D hero planes | Real, high-resolution UI at ≥1.5× output size on the plane | [V:1CSXtQ §13] (greeked HubSpot rows at 18.4-19.0 s); [S:playbook] |
| 3D-A10 | A one-off stock or generated photo object with no continuity to the system | Tie it to the palette and the story, or drop it | [V:19NRDv flaw 6] |
| 3D-A11 | Glossy floors, mirror reflections, HDRI skies | Palette-lit fog or radial environments | Census (none use them) [inferred as an avoid] |

## 13.13 Especially good for SaaS (3D-SaaS)

1. **Screen-to-world pull-back** to show an integration or where data goes [V:1CSXtQ].
2. **Extraction → push-through** into the exact data that matters [V:19NRDv].
3. **Many → one implosion** into the logo for "one platform" products [V:19NRDv].
4. **Deck or ring of real customer outputs** as the collection climax [V:15VhHR].
5. **Extruded cards** to make a feature list or category list feel like real objects for almost no cost [V:1ccYWJ].
6. **Branded 3D cursor** with a contact shadow, consistent across all UI scenes [V:19NRDv] [V:1-6l8S].

## 13.14 Do / Don't (3D)

| Do | Don't |
|---|---|
| Fly a table in at ≈35° and flatten it to ≤15° before the viewer reads a row | Leave the table at 35° while the numbers count up |
| Orbit in 9-12 f steps that each land on a badge | Spin the badge ring continuously for 6 s |
| Make the transfer particles from the source window's own two colours | Add a sparkle field "for magic" |
| Spend one 3-4 s dolly with foreground bokeh on the core idea | Put DOF and parallax on all 20 shots |
| Light every 3D object from the same upper-right key as the 2D shadows | Let each generated object bring its own lighting |
| Keep the copy flat on the focal plane and composite it in 2D | Ask the generator to render the headline on a 3D surface |
| Recede an exiting group to ≈50% scale and dim it over 8 f | Fade a 3D group out in place |

## 13.15 Where the references overrule generic advice (3D)

| Generic belief | What the references do | Ruling |
|---|---|---|
| "3D makes a launch film premium/cinematic" | 0-12% true 3D in the minimal references; 2 of 8 use none and read premium; Wix keeps 3D "special" by rarity | **References win**: 3D is a contrast effect with a budget (§13.2) |
| "Add parallax and DOF for depth" | kivi and Chowdeck use no parallax; Solar uses parallax and zero blur; HubSpot spends DOF on one beat | **References win**: one depth recipe per film (DP-01), true optical depth only where it carries meaning |
| "Orbit around the product" | No continuous orbit anywhere; stepped orbits only | **References win** (3D-U4) |
| "Generate cinematic shots with AI video" | The one reference with generated-looking plates (kivi) keeps them heavily defocused and they still show mismatched styles and mushy faces | **References win**: generated imagery only as a defocused plate or a locked hero object, never as UI or copy (§13.9) |
| "24 fps feels cinematic" [common practice] | All eight deliver at 30 fps; the 24/25 fps sources judder after pulldown | **References win** for delivery: match the source rate or retime properly; never duplicate frames |

---
# Master §14. 2D + 3D Combination Rules

## 14.0 Why hybrids work, and how they fail

Six of the eight references mix dimensional levels (§0.3). A hybrid gives the control of 2D (exact type, exact UI, exact timing) and the weight of 3D (volume, place, depth) in one film. It fails in one way only: **the viewer sees two worlds pasted together**. The measured seams:
- a 3D window poking through a 2D glass pane during a camera settle [V:1CSXtQ t=18.4-19.0s];
- a page photo and a world photo whose horizon and light do not match [V:15VhHR flaw, inferred at low resolution];
- shadows from two light directions [V:1Hcg3X];
- too many rendering idioms in one frame (flat + photo + wordmark + blobs) [V:126cpH flaw 6];
- generated plates in mismatched rendering styles behind identical glass UI [V:1-6l8S].

Every rule below is a way to make the levels share one world.

## 14.1 Hybrid census: how each reference joins its levels

| Ref | Base | Visits | Entry into the higher level | Exit back | Shared constants that hold it together |
|---|---|---|---|---|---|
| kivi [V:1-6l8S] | D0 | D3 cursor | Cursor rises from the frame bottom (≈6 f) over 2D icons | Click bloom to white (≈6 f) | Brand gradient on the cursor; white as the transition room |
| Chowdeck [V:126cpH] | D0 | D1 (offset cards, drop-shadowed photos); live action | Flat yellow matte over the photo subject while the background sharpens (8 f), matte off in 1 f; flat → real swaps in 0 f | Vertical push (11 f); falls out of frame | 6-colour palette; on-twos tempo for all graphics |
| Wix [V:15VhHR] | D0 (real UI over photos) | D2 carousel/deck/wall, D3 heart and ice | Page shrink-rotates into the carousel (6 f); last card joins the deck (cut); object pops inside the sentence | Card flattens and cuts in (7 f + cut); deck → inline slot → heart (6 f) | One cursor, one AI colour, one sentence type size, recurring sub-brands |
| Bumper [V:19NRDv] | D0 claims | D2/D4 proof | Hard cut on the beat with a world flip (navy → lavender-white); fly-ins with blur | Recede or yaw away, then a hard cut | One orange accent, one cursor, orbit-ring motif ×3, motion blur on everything that moves fast |
| HubSpot [V:1CSXtQ] | D0 | D4 one beat | Match cut on upward motion (sent bubble), then a screen-to-world pull-back | Defocus dissolve into a flat kinetic card (8 f) | White UI planes inside the studio; particles from the UI's own colours |
| Solar [V:1Hcg3X] | D1 | — | — | — | Five colours, grain, one bloom rule |
| Lottieicon [V:1ccYWJ] | D0 | D1/D2 extrusions, dome, lens warp | Edge-on card flips *through* the headline (8 f); glow build into a hard cut | Dim to black (18 f) and cut | One neon accent for all glows and edges |
| NOSTRA [V:1i2L14] | D0 | D2/D3 accents | Smash-in to macro text, then the camera is inside a card ring; banner bends into a ribbon (4 f); tile tilts onto a floor (6 f); shard unfolds into a form (6 f) | Gravity drop out of frame; twist hides a swap; object swap to flat arrows | One hue, polarity flips, selection-box chrome on 2D and 3D alike |

## 14.2 Universal combination rules (HY-U)

**HY-U1 · One base level per film; visit at most one level above it, and only on beats that pass the meaning test.** [U]
- kivi D0 → D3 for one cursor; Lottieicon D0 → D1/D2; NOSTRA D0 → D2/D3 accents; Wix D0 → D2/D3; HubSpot D0 → D4 for one beat. Only Bumper lives in two registers by design (claims D0, proof D2/D4), and it separates them by world colour (§14.4 HR-02).
- Why: each level up adds cues (perspective, light, focus, material) that must agree with the base world. One level of distance keeps the number of cues to reconcile small.

**HY-U2 · Lock the shared world contract before production. These constants are identical across every 2D and 3D layer.** [U]

| Constant | Set once as | What breaks if it differs | Evidence |
|---|---|---|---|
| Palette | 3-6 hex values; 3D materials, particles and environment lights sample them | A 3D object in off-palette colour reads as a stock asset | [V:1CSXtQ] particles in UI colours; [V:1ccYWJ] extrusions in the accent |
| Key-light direction | One direction (e.g. upper right) for 2D shadows, 3D speculars and glows | Two suns = two worlds | [V:1Hcg3X] flaw |
| Shadow model | Soft drop / hard long / offset / under-glow | Mixed models read as mixed sources | DP-10 |
| Texture | Dither level everywhere; grain level if the style uses it | A grainy 2D layer next to a clean 3D render separates instantly | [V:1Hcg3X]; DP-20 |
| Blur policy | 2D unblurred ≤5% W/f; 3D blurred at ≈180°; DOF only in 3D | A blurred 2D layer reads as a mistake; an unblurred fast 3D move strobes | [V:19NRDv] [V:1ccYWJ] |
| Cadence | Ones for UI, type, camera, 3D; twos only for declared illustration | Stepped 3D or UI reads as lag | [V:126cpH] |
| Corner radius and stroke weight | One radius family; one icon stroke | 3D cards with different radii from the 2D UI read as a different product | [W:showreel DoorDash] (radii as story elements) |
| Type | 2D, on the focal plane, one family system | Rendered 3D type in a different face breaks the brand | §13 3D-U9 |

- Why: the eye accepts a dimensional jump if the physics stays the same. These eight constants are the physics.

**HY-U3 · Enter and leave a higher level through a motivated move, never through a crossfade between dimensions.** [U]
- Measured entries: match cut on motion then pull-back [V:1CSXtQ t=17.80-19.03s]; edge-on flip through text [V:1ccYWJ t=16.10s]; banner bends into ribbon [V:1i2L14 t=14.80s]; tile tilts onto a plane [V:1i2L14 t=19.23s]; page shrink-rotates into a strip [V:15VhHR t=13.93s]; beat cut with a world flip [V:19NRDv t=16.77s].
- Measured exits: collapse into an inline slot [V:15VhHR t=49.63s]; implosion into a flat logo [V:19NRDv t=55.0s]; defocus dissolve into flat type [V:1CSXtQ t=21.47s]; gravity drop [V:1i2L14 t=13.50s]; recede and cut [V:19NRDv t=6.90s].
- No reference crossfades a 2D shot into a 3D shot.
- Why: a crossfade shows both worlds at once at half opacity, which is exactly the "two worlds pasted" read. A move says "the camera went somewhere" or "this object changed state".

**HY-U4 · The same object survives the change of dimension.** [U]
- NOSTRA: label → square → one tile → a tilted grid of tiles [V:1i2L14 t=18.37-19.43s]; headline → banner → 3D ribbon [V:1i2L14 t=14.67-15.2s]; the dot in a 2D selection box → the eye of a grain-gradient creature [V:1i2L14 t=1.07-1.43s].
- Wix: the last 2D class list → a card in the 3D deck → the inline slot in the 2D sentence → the heart [V:15VhHR t=48.27-49.83s].
- HubSpot: the 2D prompt → the sent bubble → a plane inside the 3D studio [V:1CSXtQ t=17.60-18.33s].
- Chowdeck: flat jug → real milk jug with the same silhouette [V:126cpH t=7.70s].
- Why: identity continuity is what lets the eye cross the seam. If the object the viewer was tracking is still there, the change of dimension reads as a change of view, not a change of world.

**HY-U5 · 3D elements inherit the 2D palette; nothing in 3D gets its own colour.** [U]
- Particles sampled from the source UI [V:1CSXtQ]; extruded edges and dome rim in the accent [V:1ccYWJ]; the 3D heart in the brand red #DB2C36 [V:15VhHR]; the glossy cursor in the brand orange [V:19NRDv] or brand gradient [V:1-6l8S]; grain-gradient props from white → brand green → black [V:1i2L14].
- Why: colour is the cheapest shared constant and the first thing the eye compares.

**HY-U6 · Text stays 2D.** [U]
- All copy in all eight references is composited flat and faces the camera; the one text-on-path ribbon is a showpiece of a phrase already read [V:1i2L14]. Status pills and labels slide in *beside* 3D badges as flat elements [V:19NRDv t=30.9-33.4s].
- Why: 2D text keeps the exact font, size and timing (and generators cannot set exact typography [N]); 3D text gains perspective and focus that cost reading time.

**HY-U7 · Hold position, scale and velocity across the handover.** [U]
- Position: keep the tracked object within ±5% of frame at the cut [V:1i2L14 rule 7].
- Velocity: exit at ≈7 px/f (E-EXIT) and enter at ≈30-35 px/f (E-OUT) in the same direction [V:1CSXtQ t=17.60-17.93s]; Lottieicon's 11 f pull-back (−38%) hands over to text entering at ≈2.1× and shrinking [V:1ccYWJ t=32.80-33.83s].
- Why: the eye follows motion vectors across a cut; a continuous vector bridges a dimensional jump the same way it bridges an ordinary cut.

**HY-U8 · Each layer keeps its blur and cadence policy; a camera move applies to all layers equally.** [U]
- In one frame, 2D UI stays crisp and the 3D plate may carry DOF (kivi's sharp glass over defocused plates) [V:1-6l8S]. Chowdeck keeps live action on ones and graphics on twos [V:126cpH].
- When the shared camera moves fast, every layer gets the same motion blur, otherwise sharp layers appear to float off the blurred ones [inferred, consistent with Bumper's universal blur].
- Why: blur is how the eye reads the camera. Different blur on different layers during one camera move says the layers are not on the same camera.

**HY-U9 · A 3D object resting on 2D UI casts the 2D film's shadow model.** [U]
- Bumper's 3D cursor carries the same soft shadow as the UI cards [V:19NRDv t=11.10s]; Lottieicon's 2D pill is lit from below by the same emissive glow used on 3D slabs [V:1ccYWJ].
- Why: the contact cue tells the viewer which surface the 3D object belongs to (DP-11).

**HY-U10 · 2D annotations on 3D objects stay screen-aligned and track the object.** [U]
- Wix's editor selection box stays on the rotating ice bottle across four layouts [V:15VhHR t=30.83-32.83s]; NOSTRA's selection box tracks the creature's head [V:1i2L14 t=1.43-2.63s]; Bumper's status pills slide in next to each badge as it rotates forward [V:19NRDv t=30.9-33.4s].
- Why: a screen-aligned annotation reads as "the interface is pointing at this", which keeps the product UI as the frame of reference.

**HY-U11 · Join live action or photography to flat graphics with a matte, a grade or a focus pull, never with a cut alone.** [U]
- Matte reveal: the subject is held as a flat silhouette in the type colour while the background sharpens over 8 f, then the matte drops in 1 f [V:126cpH t=1.60-1.87s].
- Grade: plates start black-and-white and bloom to colour over 22-42 f as the product starts [V:1-6l8S t=18.57s, 54.0s].
- Focus: generated or photographic plates sit heavily defocused behind sharp UI [V:1-6l8S]; the page photo extends into the world photo behind a window with a soft shadow [V:15VhHR t=19.73s] (match horizon and light).
- Why: each device lets one property (shape, colour, focus) carry over from the flat world while the image changes underneath.

**HY-U12 · The dimensional layers share one level of detail.** [U]
- Flat worlds get flat-shaded volume (extrusion, dither, rim thickness) rather than photoreal renders: Lottieicon's extrusions, NOSTRA's grain-gradient props, Solar's rim thickness [V:1ccYWJ] [V:1i2L14] [V:1Hcg3X]. A photoreal object enters a flat world only as one declared showpiece (Wix's ice) [V:15VhHR].
- Why: detail level is read as "how real" a world is. A photoreal object next to flat vector is a collage, which is a style; doing it by accident is a seam.

**HY-U13 · At most three rendering idioms in one frame.** [U]
- Chowdeck's mosaic briefly mixes flat illustration, photo cut-outs, a wordmark tile and blobs; the teardown flags it [V:126cpH flaw 6, rule "Avoid"].
- Why: each idiom is a separate world; beyond three, the frame reads as a collage of sources.

**HY-U14 · Land the logo in 2D.** [U]
- Every lockup in the set is flat and frontal: Bumper's wordmark and QR (the QR on a frosted glass card) [V:19NRDv t=61.47-67.20s], HubSpot's lockup [V:1CSXtQ], Wix's logo after the heart fill [V:15VhHR], kivi's wordmark and symbol [V:1-6l8S], NOSTRA's wordmark and pill [V:1i2L14], Lottieicon's search pill with DOF bubbles around it [V:1ccYWJ].
- Why: the logo must be read and remembered; it is the one element that must not be distorted by perspective or focus.

## 14.3 2D ↔ 3D handover library

| ID | Handover | Direction | Numbers (30 fps) | Ease | Evidence |
|---|---|---|---|---|---|
| HO-01 | **Tilt onto a plane** (one 2D tile becomes a grid on a floor) | 2D → 3D | Snap-shrink 1 f; neighbours appear in ≈2 f; tilt 6 f [≈45-55°, inferred]; far rows fog out over ≈26 f | E-OUT; E-LINEAR fog | [V:1i2L14 t=19.13-20.30s] |
| HO-02 | **Screen-to-world pull-back** | 2D → 3D | ×0.57 in 10 f; environment fades in ≈6 f; ×0.56 more over 18-20 f | E-INOUT (front-loaded) | [V:1CSXtQ t=18.00-19.03s] |
| HO-03 | **Edge-on card flip through text** | 2D → 3D | 90° → 0° on Y in 8 f while growing to ≈45% W, occluding the headline by f11 | E-OUT | [V:1ccYWJ t=16.10-16.37s] |
| HO-04 | **Banner bends into a ribbon** | 2D → 3D | Bend 4 f; push-in 15-16 f to ≈40% cap; twist ≈5 f | E-INOUT | [V:1i2L14 t=14.80-15.57s] |
| HO-05 | **Shrink-rotate into a carousel** | 2D → 3D | Page 100 → 85% plus Y-rotation, neighbour slides in, 6 f, then cut | E-EXIT | [V:15VhHR t=13.93-14.13s] |
| HO-06 | **Extraction → push-through** | 3D → deeper 3D → face-on 2D | Columns lift forward ≈18 f; push-through 9 f; columns rotate face-on; labels drop in 5 f | E-OUT, E-INOUT | [V:19NRDv t=17.6-18.75s] |
| HO-07 | **Card flattens, then cut-in** | 3D → 2D | 15° → 0° in 7 f, inner scroll, cut-in to full frame | E-OUT | [V:15VhHR t=33.33-34.47s] |
| HO-08 | **Deck → inline slot** | 3D → 2D | Deck exit accelerates ≈21 f into the cut; the slot flips thumbnails every ≈2 f, then collapses to the heart in 6 f; words close the gap (87% in the same 6 f) | E-EXIT, E-OUT | [V:15VhHR t=48.93-50.03s] |
| HO-09 | **Implosion into a flat logo** | 3D → 2D | Ring collapses into a small logo that grows in 8 f; ≤12 sparks over 10 f; soft halo; slow pull-back | E-EXIT, E-OUT | [V:19NRDv t=55.00-56.6s] |
| HO-10 | **Defocus dissolve into flat type** | 3D → 2D | Table blur grows over 4 f inside an 8 f fade; the new type cuts in crisp mid-dissolve and collapses its staircase in 7-10 f | E-LINEAR | [V:1CSXtQ t=21.47-21.93s] |
| HO-11 | **Lens-distortion zoom-out** | 2D field → pseudo-3D → 2D | Starts ≈2× with a barrel bulge, bulge relaxes in ≈6 f, zoom-out over ≈20 f | E-SNAP | [V:1ccYWJ t=7.30-8.00s, 27.13s] |
| HO-12 | **Light build → hard cut into a 3D horizon** | 2D → 3D | Glow area ×8-10 over ≈2 s; cut on the brightest frame; dome rises 30% H in 22 f | E-EXIT on glow; E-SNAP | [V:1ccYWJ t=18.87-21.87s] |
| HO-13 | **Unfold from edge-on** | 2D shard → 3D sheet | 6 f Y-rotation | E-OUT | [V:1i2L14 t=24.53-24.73s] |
| HO-14 | **Condense from a particle trail** | 2D trail → 3D object | Trail loop ≈24 f; condense ≈6 f; rotate to frontal ≈6 f; glyph strokes on | E-OUT | [V:1i2L14 t=27.8-29.2s] |
| HO-15 | **Beat cut with a world flip** | 2D claim → 3D proof | Hard cut 0-2 f ahead of a quarter-note beat; background flips navy → lavender-white; the proof object flies in with blur over 12 f | Cut; E-SNAP | [V:19NRDv t=16.767s] |
| HO-16 | **Flat → real swap** | 2D icon → photo | 0 f on a pose boundary; same silhouette and angle; gravity fall within ≈0.6 s | snap; E-GRAVITY | [V:126cpH t=6.77s, 7.70s, 8.43s] |
| HO-17 | **Matte reveal into live action** | 2D → photo/video | 1 f silhouette mix; background sharpens 8 f; matte off in 1 f | E-OUT on focus | [V:126cpH t=1.57-1.87s] |

## 14.4 Hybrid recipes (frame-accurate, from the references)

### HR-01 · The prompt-native depth beat (HubSpot) [SaaS]
A flat film that spends one 3.67 s beat in 3D to explain an integration.

| Time (s) | Event | Numbers |
|---|---|---|
| 17.60-17.80 | Prompt content moves up (send) | 3, 3, 5, 7 px/f @720, E-EXIT |
| 17.80 | Match cut on upward motion | Small hit on the cut |
| 17.80-17.97 | Sent bubble continues up | 34, 34, 31, 7, 4 px/f, E-OUT |
| 18.00-18.33 | Pull-back ×0.57 while moving up-right | 10 f |
| 18.17-18.37 | Blue-grey studio and HubSpot window fade in | ≈6 f; radial #C8D4DF → #F4F5F8 |
| 18.33-19.03 | Further pull-back ×0.56, decelerating | ≈20 f |
| 18.95-19.05 | 70 ms near-silence, then hit at 19.05 | Sound marks the transformation |
| 19.00-19.95 | HubSpot window disintegrates L → R into ≈200-300 two-tone discs | ≈0.95 s, ≈350 px/s @720 |
| 19.95-20.47 | Dolly-in ×2.3 through the particle field; foreground to bokeh | ≈15 f, E-OUT |
| 20.00 | Answer text fades in on the chat pane | ≈2 f |
| 20.27-20.80 | Lateral settle | E-OUT |
| 20.40-21.47 | Tilt/scroll down the generated table, accelerating | 8 → 24 px/f @720, E-EXIT |
| 21.47-21.73 | Defocus dissolve into a flat kinetic card | 8 f |

Source: [V:1CSXtQ Studies E, F]. Why it works: the depth beat starts and ends on flat UI the viewer already understands, and every 3D element is made of that UI.

### HR-02 · Night claim / Day proof (Bumper) [S; SaaS for fintech and ops]
- **Claim (2D, D0):** navy #020047-#06004E with a coral glow top-right and violet floor light; one hero word slams from 3-4× in 8-13 f; the line builds word by word (7-10 f apart) while the camera pulls back 1-3.5%/f with 3 f snaps of ≈40-55%; 1-2 s per card [V:19NRDv].
- **Cut:** hard cut 0-2 f ahead of a 100 BPM quarter-note beat; often a world flip to lavender-white [V:19NRDv §11].
- **Proof (D2/D4):** tilted glass UI planes fly in (12-22 f, blurred), DOF at panel edges, soft contact shadows; an in-shot camera beat (snap, orbit step, push-through, punch-in cut) every 0.8-1.5 s; 2-6 s per shot; one orange 3D cursor [V:19NRDv].
- **Rule:** claims never contain 3D; proof never contains a headline card. The world colour tells the viewer whether to read or to watch.
- Why it works: two registers with opposite rules double the contrast available, and the strict separation stops either from contaminating the other.

### HR-03 · Inline 3D object inside a 2D sentence (Wix) [S]
- Sentence at cap ≈6.6% H, regular weight, centred, ≈56% W, held still ≥1.0 s [V:15VhHR t=0.63-1.43s].
- A gap opens in the line (left anchor shifts in 7 f) and a chip or object scales from a sliver to full in ≈5-6 f; a glossy 3D heart spins on Y between words [V:15VhHR t=1.43-2.20s].
- At the end, the same slot receives the collapsing deck (6 f) and becomes the heart again; then a hard cut to a frame-filling heart that dissolves to the logo colour (strong colour gone in 8 f, settled in ≈25 f) [V:15VhHR t=49.63-52.20s].
- Object height ≈ the line's cap-to-descender height [inferred; not measured].
- Why it works: the 3D object is grammatically part of the sentence, so it reads as meaning ("love") rather than decoration, and it bookends the film.

### HR-04 · Glass UI over a defocused generated or painted plate (kivi) [S; SaaS for voice/AI]
- Three planes: plate (heavily defocused, B&W at first), frosted glass prompt card (≈80-85% W, top-centre, 1 px light rim, scene-tinted backdrop blur), live waveform card (≈70% H) [V:1-6l8S rule 6].
- The plate blooms from grey to colour over 22-42 f as the voice starts; words stream at 4-7 words/s, each 30% → 100% in 3-4 f [V:1-6l8S t=18.37-20.60s].
- Continuity cut to the result on the same plate, reframed; result card cascades after an 8-9 f empty hold [V:1-6l8S t=22.87-23.87s].
- Lock one rendering style and light direction for all plates (the reference does not, and it shows) [V:1-6l8S §13].
- Why it works: the human world stays soft and the product stays sharp; defocus hides most plate flaws and turns the plate into colour and mood.

### HR-05 · Extruded card wipe through a headline (Lottieicon) [S]
- "50 + Categories" counts 0 → 50 linearly in 29 f, then holds with a ≈10% push [V:1ccYWJ t=14.733-16.10s].
- A green vertical sliver (the edge-on card) appears between two letters, rotates 90° → 0° in 8 f, grows to ≈45% W and occludes the text by f11 [V:1ccYWJ t=16.10-16.37s].
- 11 more cards flip up on a constant upward scroll (stagger ≈10 f → 2-4 f → 5-7 f), then the background dims by half over 18 f while the last cards exit up; cut [V:1ccYWJ t=16.40-18.83s].
- Why it works: the claim turns into its content through an object that physically pushes through it.

### HR-06 · Flat icon → real object (Chowdeck) [S; playful]
- Mosaic of flat tiles; two-stage pull-out ×4.1 in 1.0 s; slow push + pan ≈1.3× [V:126cpH t=5.20-8.4s].
- On one 12 fps pose change the flat silhouette is replaced by the real photo cut-out with a soft drop shadow, same position and angle; within ≈0.6 s it falls with gravity and rotates 70-90° [V:126cpH t=6.77-7.73s].
- Why it works: flat = promise, photo = proof. The silhouette carries continuity, and the instant swap never warps geometry (a model for AI pipelines: switch between two stable states instead of generating a morph).

### HR-07 · A 3D object anchored over 2D layout swaps (Wix) [X]
- A refractive ice bottle stays in one screen region while the page behind it cuts every 0.47-0.96 s across 4 layouts; a 2D selection box stays on it; a specular streak flares on one cut frame [V:15VhHR t=29.47-32.83s]; music is in a quieter breakdown under it [V:15VhHR §12].
- Add a label that states the claim (the reference's montage is "semantically vague").
- Why it works: the anchor gives the eye a fixed point, so very fast cuts behind it feel calm (ER-05).

### HR-08 · Collection climax, then fold back to 2D (Wix; Bumper) [SaaS]
- Wix: every generated site in one 3D deck: fan ≈11 f → cruise ≈7 f → accelerate ≈21 f → cut into the inline slot → 6 f collapse to the heart [V:15VhHR t=48.27-49.83s].
- Bumper: chips fly in one by one along arcs into a rotating ring, implode into the logo in 8 f, ≤12 sparks over 10 f, halo, slow pull-back [V:19NRDv t=52.75-56.67s].
- Why it works: the climax collects every story into one object and returns it to the opening motif, so the logo inherits the whole film.

### HR-09 · A shape chain across dimensions (NOSTRA) [X]
- "SOLUTION" label (2D) → vertical expand into a square (E-SNAP, 44% of the 202 px travel on frame 1, 88% by f6) → 1 f snap-shrink to a tile → neighbours appear → the plane tilts in 6 f → the hero tile glows while far rows fog [V:1i2L14 t=17.50-20.30s].
- Why it works: the scale chain makes one shape carry the idea from "our solution" to "you stand out in the market" without a single word.

### HR-10 · 2.5D instead of 3D (Solar) [S; the cheapest dimensional look]
Ingredients, all measured [V:1Hcg3X]:
- rim thickness visible as an object tumbles;
- isometric drawing for structures (panels on posts);
- long hard cast shadows (one direction per film; the reference breaks this once);
- perspective rows (panel field) and a planet-curve horizon;
- parallax: foreground 1.3-2× the background;
- bloom only on emitters; fine monochrome grain over everything;
- a specular sheen sweep across a surface.
- Why it works: every cue is drawn, so it is perfectly consistent and cannot warp; the film reads dimensional with zero 3D risk. TradeLens' isometric "3D-looking" 2D is the same idea in a SaaS feature series [S:TradeLens].

### HR-11 · Generated plate + deterministic 2D overlay (AI pipeline) [SaaS]
- Generate: one camera move per clip, 4/6/8 s, a negative noun list against text, the empty space described, 3 reference images and the same lens/light words in every prompt [P] (§13.9).
- Composite in 2D: defocus the plate ≥2-4% W, grade it to the palette, add dither; place UI and type as crisp 2D layers on the focal plane with the film's shadow model; drive all timing from the 2D layer [inferred, from HR-04 and §13.9].
- Why it works: the generator supplies mood, light and place, where small errors are forgiven after defocus; the deterministic layer supplies everything that must be exact.

## 14.5 Who owns what in an AI or template pipeline

| Element | Owner | Why | Evidence |
|---|---|---|---|
| Copy, numbers, logos, UI | Deterministic 2D renderer (Remotion, AE, a template engine) | Exactness; generators "cannot set exact typography" | [N]; [P] |
| Cursor, clicks, typing, state changes | Deterministic 2D | Frame-accurate cause and effect | Part 06 |
| Camera on flat layers (pushes, punches, pull-backs) | Deterministic 2D | Exact speeds and eases | Part 04 |
| Planar 3D (tilted UI planes, rings, decks) | Deterministic 3D in the renderer (CSS 3D / three.js / AE 3D layers) with real UI textures | UI must stay legible and exact on the plane | [V:19NRDv] [V:15VhHR]; [inferred tooling] |
| Abstract hero objects (orb, Chladni) | Code (shader), deterministic per frame | Brand-exact, loopable, audio-reactive | [E] |
| Atmospheric plates, lifestyle scenes, b-roll | Generator (Veo/Flow), then defocused and graded | Mood is forgiving; exact detail is not needed | [P]; [V:1-6l8S] |
| Hardware hero renders | 3D render (C4D/Blender) or supplied renders | Generators drift on product geometry [inferred] | [W:showreel] |
| Sound | Designed mix; generated audio muted | Arc control | [P]; Part 09 |

## 14.6 Style-specific, experimental, avoid, SaaS

**Style-specific (HY-S)**
- **HY-S1. Claim/proof world split** (HR-02) for kinetic-type launches [V:19NRDv].
- **HY-S2. One D4 beat** (HR-01) for prompt-native minimal films [V:1CSXtQ].
- **HY-S3. Inline objects in a sentence** (HR-03) for editorial brand frames [V:15VhHR].
- **HY-S4. Twos for illustration, ones for UI and live action** for playful collage [V:126cpH].
- **HY-S5. 2.5D only** (HR-10) for editorial explainers [V:1Hcg3X].

**Experimental (HY-X)**
- **HY-X1. B&W → colour plate bloom** as the product arrives [V:1-6l8S].
- **HY-X2. Anchored 3D object over layout swaps** (HR-07) [V:15VhHR].
- **HY-X3. Shape chain across dimensions** (HR-09) [V:1i2L14].
- **HY-X4. Grain-gradient characters inside a flat brand world** [V:1i2L14].
- **HY-X5. Surreal wide-lens 2D/3D hybrid** with organic 2D animation on structured 3D scenes [S:Bolt] (text only; untested here).

**Avoid (HY-A)**

| ID | Avoid | Fix | Evidence |
|---|---|---|---|
| HY-A1 | Crossfading a 2D shot into a 3D shot | A motivated handover (§14.3) | Census |
| HY-A2 | Ambiguous plane intersections between 2D panes and 3D windows | Separate depths; QC at 1-frame steps | [V:1CSXtQ t=18.4-19.0s] |
| HY-A3 | Mismatched horizon/light between a UI photo and the world photo around it | Extend the same photo, or match horizon line and key direction | [V:15VhHR] (flaw, inferred at low res) |
| HY-A4 | More than 3 rendering idioms in a frame | Cut one | [V:126cpH] |
| HY-A5 | A 3D object in its own colours or light | Inherit palette and key (HY-U2, HY-U5) | [V:1Hcg3X] (light) |
| HY-A6 | Different motion blur on layers moving with the same camera | One blur per camera move | HY-U8 [inferred] |
| HY-A7 | Rendering copy inside generated footage | Composite copy in 2D | [P] (gibberish subtitles) |
| HY-A8 | A logo lockup in perspective or out of focus | Flat, frontal, sharp | HY-U14 |
| HY-A9 | Applying a signature cross-dimensional device to only some matching scenes | Use it every time or define the rule | [V:1-6l8S] (B&W bloom on 2 of 4 scenes) |

**Especially good for SaaS (HY-SaaS)**
1. HR-01 depth beat for integrations and data flow.
2. HR-02 claim/proof split for multi-feature platforms.
3. HR-08 collection climax for "one platform" and "everything you made" messages.
4. HR-11 generated plate + deterministic UI for lifestyle context without fake UI.
5. HO-06 extraction → push-through for "this exact number".

## 14.7 Do / Don't (2D + 3D)

| Do | Don't |
|---|---|
| Hand the sent message's upward motion across the cut, then pull back into the 3D studio | Cut from the flat prompt to an unrelated 3D fly-over |
| Sample the particle colours from the window that disintegrates | Use generic blue "data" particles |
| Keep the status pill flat and screen-aligned next to the rotating 3D badge | Map the status text onto the badge's curved surface |
| Fold the 3D deck back into the 2D sentence before the logo | End the film on the 3D deck spinning |
| Give the 3D cursor the same soft shadow as the UI cards | Let the cursor float with no contact cue |
| Defocus the generated office plate and grade it to the palette | Leave the generated plate sharp behind the UI |
| Swap the flat jug for the real jug in 0 f | Ask a model to morph the flat jug into the photo over 12 f |

## 14.8 Where the references overrule generic advice (2D + 3D)

| Generic advice | What the references do | Ruling |
|---|---|---|
| "Mix 2D and 3D freely for a rich look" | Each film has one base level and visits one level above it on chosen beats | **References win** (HY-U1) |
| "Transition between styles with a dissolve" | No 2D → 3D crossfade in any reference; every handover is a move | **References win** (HY-U3) |
| "Use 3D type for impact" | All copy is 2D in all eight | **References win** (HY-U6) |
| "Morph objects to show transformation" (common in AI tools) | Morphs keep one object (pill → card, card → notification); object-to-object changes are instant shape-matched swaps | **References win**: swap between two stable states (HO-16); morph only shapes that stay the same object |

## 14.9 2D + 3D QC gate (step through every hybrid shot frame by frame)

1. **Base level and visit level named** in the brief, and the visit passes the meaning test (3D-U1).
2. **Shared constants identical** across layers: palette, key direction, shadow model, texture/dither, blur policy, cadence, radii, type (HY-U2).
3. **Handover is a move** from §14.3, not a crossfade; the tracked object stays within ±5% of frame at the cut; velocity continues in the same direction (HY-U3, HY-U7).
4. **No plane intersections** at any frame of any camera move (DP-17).
5. **Every 3D object has a contact cue** and takes the film's shadow model (HY-U9).
6. **All copy is 2D**, sharp, ≤15° from camera-facing while read (HY-U6, DP-19).
7. **Blur:** 2D layers crisp unless the shared camera moves >5% W/f; 3D moves blurred at ≈180°; DOF only in the 3D register.
8. **Idioms per frame ≤3** (HY-U13).
9. **Logo lands flat** (HY-U14).
10. **Generated plates:** defocused ≥2-4% W, graded to palette, dithered, identical style/lens/light words across the set; no text in the footage; generated audio muted (§13.9).

---
# Phase 11. Style Categories

## 11.0 What a style category is, and how to use this chapter

A style category is a **bundle of decisions that only work together**: canvas and palette, dimensional level, ease family, overshoot policy, blur policy, camera vocabulary, transition set, type system, music and tempo, cutting rate and runtime. The references show that a film reads as premium when every one of those decisions comes from the same bundle, and as a template when they are mixed (kivi's calm cards next to a playful pill burst work only because the burst is used once, as the drop) [V:1-6l8S].

How to use it:
1. Pick **one primary style** with the selector (§11.1).
2. Optionally pick **one secondary register** from the allowed pairs (§11.5).
3. Copy the style's card values into the brief and the prompt system (tokens in §11.7).
4. Do not change a single parameter of a card without checking the "Avoid" line of that card.

The brief named six categories (A-F). The references add eight measured sub-styles and the text sources add four more. Each card states its **evidence level**:
- **Measured**: one or more of the user's references, frame by frame.
- **Text**: Superside, ElevenLabs, inspiration-site descriptions only (intent and structure, not timing).
- **Inferred**: assembled from measured components of other styles plus text; validate before relying on the numbers.

| ID | Style | Parent (brief) | Evidence level | Exemplars |
|---|---|---|---|---|
| ST-A1 | Airy Aurora / Calm-Tech | A Minimal Premium SaaS | Measured | kivi [V:1-6l8S] |
| ST-A2 | Prompt-Native Launch | A Minimal Premium SaaS (with one C-style demo and one D-style beat) | Measured | HubSpot [V:1CSXtQ] |
| ST-A3 | Calm Editorial AI | A Minimal Premium SaaS | Text + code | ElevenLabs [E] |
| ST-B | Cinematic Product Launch | B | Inferred (assembled) | Components from [V:1CSXtQ] [V:1-6l8S] [V:15VhHR]; [E] flagships; [W:motion-so]; [S:Bolt] |
| ST-C1 | Brand-Bookended Product Montage ("generative slot machine") | C UI-Focused Demo | Measured | Wix [V:15VhHR] |
| ST-C2 | Feature Demo / How-To Series | C UI-Focused Demo | Text | Airtable, Newsela, Asana, Slack, Superspace [S] |
| ST-C3 | Launch Recap Sizzle | C UI-Focused Demo | Text | Figma Config [S:Figma] |
| ST-D | 3D Technology Film | D | Inferred (assembled) | Components from [V:19NRDv] [V:1ccYWJ] [V:1i2L14]; [W:showreel] [W:raivcoo]; [S:Bolt] |
| ST-E1 | Night Claim / Day Proof (kinetic type × 3D UI) | E Fast Startup Launch | Measured | Bumper [V:19NRDv] |
| ST-E2 | Dark Neon Asset Reel | E Fast Startup Launch | Measured | Lottieicon [V:1ccYWJ] |
| ST-F1 | Retro-Editorial 2.5D Explainer | F Editorial Motion | Measured | Solar [V:1Hcg3X] |
| ST-F2 | Monochrome Brand-System Explainer | F Editorial Motion | Measured | NOSTRA [V:1i2L14] |
| ST-F3 | Documentary Overlay / Founder Story | F Editorial Motion | Text | motion.so Naval/Vox demos [W:motion-so]; Lovable cluster [W:raivcoo]; Thomson Reuters [S] |
| ST-G | Playful Illustrated Collage + UI (discovered) | between E and F | Measured | Chowdeck [V:126cpH]; PointCard [S] |
| ST-H | Live-Action Customer Story + Motion Overlay (discovered) | — | Text | Thomson Reuters, Snowflake, Imperfect Foods [S] |
| ST-I | Character-Led 2D Brand Explainer (discovered) | — | Text | Duolingo [S]; Animade, Conveo [W:showreel] |
| ST-J | Isometric Feature-Series Explainer (discovered) | between C and F | Text | TradeLens [S] |

## 11.1 Style selector

**ST-U1 · Choose the style from the product's promise first, then check audience, assets and runtime.** [U]
This mapping follows the motion-to-promise principle in [S:playbook rule 12] and the art-direction rule in Part 02 §3.2, and is checked against what each reference sells.

| If the product's promise is… | Primary style | Why it fits | Second choice |
|---|---|---|---|
| Calm, human, "it just listens" (voice, assistants, wellness tech) | ST-A1 | Breathing motion, light as material, in-world voice as proof | ST-A3 |
| "AI inside the tool you already use" (connectors, copilots, LLM features) | ST-A2 | The film is a prompt; one depth beat explains the integration | ST-C1 |
| AI audio / model / API launch with a strong brand system | ST-A3 | Slow orb, light display type, the voice demo is the hero | ST-A1 |
| One flagship product with a single big reveal (platform launch, v2.0, hardware-adjacent) | ST-B | Long holds, depth, light, silence before the reveal | ST-D |
| Breadth of output (builders, creative tools, anything that makes things for users) | ST-C1 | Real UI + art-directed outputs + anchored continuity | ST-C3 |
| "How do I do X" (consideration, onboarding) | ST-C2 | One feature per film, real UI, narrated | ST-J |
| Many launches at once (conference, release week) | ST-C3 | ≈1 shot per second of real UI on the beat | ST-E2 |
| Physical or deep-tech product; infrastructure that needs volume and scale | ST-D | 3D carries volume and place | ST-B |
| "Unify / automate" (payments, ops, B2B platforms) | ST-E1 | Claim world vs proof world; many → one climax | ST-A2 |
| Asset libraries, kits, dev tools, creator tools | ST-E2 | The product is the motion; dark neon energy | ST-C3 |
| Explaining an invisible mechanism (data flow, security, AI pipelines, energy) | ST-F1 | One hero per frame, labels in negative space, expo envelope | ST-J |
| Agency, service or brand-system promo; LinkedIn ads | ST-F2 | Shape chains and three-word lines in one hue | ST-G |
| Founder story, opinion, thought leadership | ST-F3 | Editorial overlays on real speech | ST-H |
| Warm consumer app (delivery, fintech for consumers), performance social | ST-G | Pops, gravity, dialect, chapter colours | ST-E2 |
| Proof from a real customer | ST-H | Borrowed credibility; real voices | ST-F3 |
| Playful brand with a mascot | ST-I | Characters carry the product's personality | ST-G |

**Hard constraints that override the promise:**
- **No real UI available** → avoid ST-C1/C2/C3/A2; use ST-F1, ST-F2, ST-E1 claim cards with abstract proof, or ST-A3 [inferred].
- **Sound-off feed placement** → styles whose story is carried by on-screen type (ST-A1, A2, E1, E2, F2, G) [S:playbook rule 11]; not ST-H or narrated ST-C2 without captions.
- **Runtime ≤15 s** → see §11.6; ST-B, ST-C2 and ST-H do not compress well.
- **9:16 primary** → ST-G was the only measured vertical style; others are 16:9 masters adapted to 9:16 [V:126cpH]; [E] (verticals are adaptations).

## 11.2 Style cards (A, B, C)

### ST-A1 · Airy Aurora / Calm-Tech [Measured: kivi, 77.8 s]

**Definition.** Light-mode minimal premium film for a voice or AI assistant: white canvas with slowly drifting pastel aurora, frosted-glass UI over soft "life" plates, line-level kinetic type in two tones, in-world voice as proof. Everything breathes; nothing bounces.

| Facet | Specification | Evidence |
|---|---|---|
| **Visual** | Canvas #F9FAFC / #FFFFFF; aurora mint #E0F5EB, green #8EE1B2 / #5FE7A0, lime #E1F3BA, aqua; text near-black #0B0B0B with the benefit phrase in deep sage #556962 / #396454; one serif wordmark in deep forest #2D4123 against an all-sans system. Frosted glass cards (≈80-85% W, radius ≈2-3% W, 1 px light rim, scene-tinted backdrop blur) over heavily defocused painted plates. White is the transition "room". No grain. | [V:1-6l8S §2, §8, §9] |
| **Dimensionality** | D0 + glass; one D3 cursor (≈1% of runtime). No parallax. | §0.3 |
| **Motion** | Live-append lines with E-LERP recentre (words 3-8 f apart; recentre 13-14 f; travel 10-15% W; drift ≈3-4% W/s). Rise + blur entrances 9-12 f. Blur-dissolve exits 4-8 f. Exits ≈2× faster than entrances. Exponential punch +18-33% in 3-8 f into a cut, ≤4 per 78 s. Every hold pushes 1.07-1.29× over 0.5-2.5 s. **No overshoot, no rotation, no particles, no motion blur.** | [V:1-6l8S §6, rules 1-5] |
| **Camera** | Locked frame + drift; breathing push on every hold; one truck (≈40% W in ≈0.85 s, ≈4% W/f peak (computed), no blur); one 2× cut-in; continuity reframes between prompt and result. | [V:1-6l8S §7] |
| **Transitions** | Light-based (12 of 32): white blooms 4-7 f, washes ≈18 f, click bloom ≈6 f; punch → 1 white frame → burst; shape morph pill → card (≈13 f); watercolour ink-bloom mask (≈27 f) for the emotional scene; continuity hard cuts; beat cuts in the back half. One transition per ≈2.4 s. | [V:1-6l8S §10] |
| **Typography** | Humanist-geometric sans, Regular (≈400), sentence case, centred at y≈50%. Statements: glyph bbox 7.2-10.2% H (font ≈68-95 px @1080p), ≤6 words, 1.2-1.7 s each; two-tone split (subject dark, benefit sage). UI text ≈4% H with ≈1.6 leading. | [V:1-6l8S §8] |
| **Music & sound** | ≈127 BPM soft plucks and pads; near-silence (≈0.15-0.3 s) before the logo, tonal riser, full-band drop ≈3 f after the visual burst; pad-only section under text cards; eighth-note grid in the back half. No narrator: the VO is in-world dictation that the UI transcribes. | [V:1-6l8S §12]; Part 09 |
| **Rhythm** | ASL 2.36 s, median 1.70 s. Type cards 1.17-1.87 s; demo shots 2.6-6.25 s. First half cut on speech, back half on eighth notes (5 of 6 cuts within 1.1 f of the grid). | [V:1-6l8S §11] |
| **Duration / format** | 60-80 s hero at 16:9; a 30 s cut keeps hook → reveal → one demo → tagline → logo [inferred]. | [V:1-6l8S] |
| **Suitable products** | Voice and dictation tools, AI assistants, consumer-friendly SaaS, wellness tech. | Part 02 AD-S1 |
| **Signature recipes** | 2M-01, 2M-04, E-PUNCH, HR-04, B&W → colour bloom (2D-X1), "say → see" (UI-P1), logo reveal formula (riser + tonal wordmark + punch + white frame + burst). | — |
| **Avoid** | Mismatched plate styles; micro text <2.5% H; >3 text-only cards in a row over an ambient bed; a bare URL end card; −10.7 LUFS loudness (master to −14). | [V:1-6l8S §13, §16] |

**Why it works.** The medium is the message from frame 3: the line types itself like dictation, so the film demonstrates the product before naming it. Restraint (one sans, one serif, a three-tint accent family, no bounce) makes the few energetic moments (pill burst, punches) land.

**Prompt seed.** `style=A1 calm-tech; canvas #F9FAFC with drifting mint/aqua aurora blobs; frosted glass card 82% W over a heavily defocused painted plate (blur ≥3% W), one light direction; type: humanist sans Regular, sentence case, 80 px @1080p, two-tone (#0B0B0B / #556962), ≤6 words; motion: words append 5 f apart with lerp recentre k=0.22, push 1.10× per hold, no overshoot, no motion blur; transitions: white bloom 5 f; music 120-128 BPM plucks and pads, silence 0.2 s before the logo.`

### ST-A2 · Prompt-Native Launch [Measured: HubSpot, 30.0 s]

**Definition.** A white, flat, typing-driven film in which the headline is a prompt, the UI builds around it, and a single 3D beat explains the integration. Calm camera, real UI speeds, cut on transients after the drop.

| Facet | Specification | Evidence |
|---|---|---|
| **Visual** | Pure white #FFFFFF fills 92-95% of every 2D frame; ink #1A1A1A; one brand accent (#F65542) used as a meaning-bearing icon; one system blue (#3585E4) for toggles; a 2 s black cold open; one blue-grey 3D studio (#C8D4DF → #F4F5F8 radial, gentle vignette). Soft drop shadows only. No glow, no grain. | [V:1CSXtQ §2, §13] |
| **Dimensionality** | D0 orthographic; one D4 beat of 3.67 s (12%) with real DOF, particles and parallax. | [V:1CSXtQ] |
| **Motion** | "Ease out of the cut, ease in toward the next cut." Every card drifts in scale (−13 to −24% per card). Typing at 9-35 cps with 0.95-1.1 s phrase pauses; caret held at 65-66% W. UI micro-interactions at real speeds (dropdown 6 f, row stagger 2 f, toggle 1-3 f, label swap 1 f). Staircase → baseline collapses (7-10 f); tracking-in on one hero word (−17% width in 4 f). **No overshoot; no 2D blur.** | [V:1CSXtQ §6, rules 1-11] |
| **Camera** | Re-centre pan (fast attack, long tail); caret-follow truck; ×0.75 pull-back reveal (cubic in-out, ≈21-31 f); accelerating logo push (+10.6% in ≈1.7 s) into the drop; macro close-up; 3D: screen-to-world pull-back ×0.32 in ≈1 s, dolly ×2.3 in ≈15 f through particles, tilt-scroll down the result. | [V:1CSXtQ §7] |
| **Transitions** | 8 hard cuts and 1 blur dissolve, no crossfades: cut on motion with a polarity flip (black → white), text → UI build, cut on a click, cut on the beat drop, match cut on upward motion, particle disintegration, defocus dissolve, word-spacing match cuts. | [V:1CSXtQ §10] |
| **Typography** | Geometric/humanist sans (HubSpot brand face [inferred]). Typed headline cap 3.3% H (font ≈4.8% H, ≈51 px @1080p); macro query cap 4.2% H (≈64 px); end cards cap 5.8% H (font ≈8.3% H, ≈90 px), Medium, sentence case with a terminal period, 2-5 words, one card per 1.1-2.2 s. Emphasis by weight, not size. | [V:1CSXtQ §8] |
| **Music & sound** | ≈86 BPM minimal electronic/plucks; near-silence under intimate typing with soft key ticks; riser into the co-brand lockup; 300 ms silence; drop at 13.05 s (43% of runtime) on the first macro shot; 70-300 ms silences before key hits; breakdown under the CTA; full-band sting on the final lockup. No VO. 6-7 of 8 hard cuts on transients. −14.2 LUFS. | [V:1CSXtQ §11, §12] |
| **Rhythm** | ASL 3.00 s, median 2.42 s; first half 4 shots (ASL 4.45 s), second half 6 shots (ASL 2.04 s). Final 2.2 s dead still. | [V:1CSXtQ §11] |
| **Duration / format** | 20-45 s at 16:9 [V:1CSXtQ §14]. | — |
| **Suitable products** | AI/LLM features, integrations, connectors, copilots, chat-based tools. | [V:1CSXtQ §14] |
| **Signature recipes** | KT-03 typed headline → UI; UI-P2 text → UI build; HR-01 depth beat; 2D-X4 polarity cold open; word-spacing match (TR-21). | Parts 05-07 |
| **Avoid** | Hook type with cap <5% H on phones (the reference's 3.6% is too small); greeked UI on 3D planes; plane intersections; 4+ same-size centred end cards in a row; cutting a few frames ahead of a kick. | [V:1CSXtQ §16] |

**Why it works.** The viewer reads the claim as it is typed, then sees it become the product. The two speeds (slow camera, 100-200 ms UI) read as "premium calm + responsive product", and the only depth in the film is spent on the one idea that needs it.

**Prompt seed.** `style=A2 prompt-native; white #FFFFFF canvas, ink #1A1A1A, one brand accent icon, system blue toggles; flat orthographic UI with soft drop shadows (no glow); headline typed at 28-35 cps with the key phrase at 9 cps, caret held at 65% W; UI builds around the text then camera pulls back to 0.75× over 24 f (cubic in-out); one 3.7 s 3D beat: blue-grey studio #C8D4DF→#F4F5F8, particles sampled from the source window, dolly 2.3× in 15 f with foreground bokeh; end cards Medium 90 px @1080p, 2-5 words, scale drift −15%; music 86 BPM, drop at 43% of runtime, 100 ms silence before each hit.`

### ST-A3 · Calm Editorial AI (ElevenLabs-like) [Text + open-source code; motion inferred]

**Definition.** A restrained, editorial launch spot for an AI audio/model/API brand: light or dark neutral canvas, light-weight display type, atmospheric pastel or Chladni-pattern backgrounds, a near-still orb or live waveform as the product's face, and the product's own voice as the hero.

| Facet | Specification | Evidence |
|---|---|---|
| **Visual** | Light #f5f5f5 / #ffffff or dark #0c0a09 / #1c1917; ink #0c0a09; muted #777169; pastel stops (#a7e5d3, #f4c5a8, #c8b8e0, #a8c8e8, #e8b8c4) used only as atmosphere; one platform hue per sub-brand (Agents blue, Creative orange, API monochrome). Very soft layered shadows; radii 16-24 px on web (32 px in video [inferred]). Chladni sound-wave patterns "layered with blur". | [E] (brand page, third-party extraction, basement.studio) |
| **Dimensionality** | D0 + a code-driven orb (D3-like shader) | [E] orb.tsx |
| **Motion** | Inferred: expo-out (cubic-bezier(0.16, 1, 0.3, 1)), no overshoot; words blur-in 8 → 0 px with a 0.35 em rise over 14 f, 3 f stagger; floating card enters y +60 → 0, scale 0.96 → 1 over 20 f; orb drift period ≈251 s; orb states listening `0.55 + 0.35·sin(3.2t)`, talking `0.65 + 0.22·sin(4.8t)`; shimmer status text 2 s sweep + 0.5 s pause; waveform bars 4 px wide, 2 px gap, opacity `0.3 + 0.7·v`. | [E] (code sourced; timings inferred) |
| **Camera** | Inferred: slow push 1.00 → 1.05-1.08 per shot; parallax only between a UI card and its background. | [E] |
| **Transitions** | Inferred: hard cut on the beat, or a 10 f blur dissolve. | [E] |
| **Typography** | Display Waldenburg (a grotesque) at weight 300, tracking −0.02 to −0.03 em, line-height 1.05-1.17; body Inter 400/500; caps accents WaldenburgFH 700 at +0.05 em; code/tags Geist Mono. Headlines 3-6 words [inferred]. Use the official SVG logo, never typed "II" characters. | [E] |
| **Music & sound** | Scored with the brand's own tools ("Background music … created with Eleven Music"); restrained electronic/ambient ≈100-120 BPM, riser into the end card [inferred]; the voice demo plays over a waveform; −14 LUFS / −1 dBTP, music ducked 10-12 dB under voice [inferred]. | [E] |
| **Rhythm** | Inferred: 10-14 shots, 3-4 s average; title cards 1.5-2.5 s; UI demos 4-6 s; end card 2.5-3.5 s. | [E] |
| **Duration / format** | Short spots 39-51 s (median ≈44 s); 16:9 masters (4K through 2024, 1080p in 2025-26); verticals exist only as adaptations. CTA wording "Try [Product] →". | [E] (sourced durations) |
| **Suitable products** | AI audio, voice, model and API launches; developer platforms with a strong brand system. | [E] |
| **Signature recipes** | Orb hero; Chladni atmosphere; waveform playback with karaoke captions; stat card count-up; shimmer status line; 3E-10. | [E] |
| **Avoid** | Typed-character logos; the unsourced "lime accent" variant; fast orb motion; treating inferred timings as measured. | [E] |

**Why it works [inferred].** A near-still, softly lit object and light-weight type say "calm intelligence"; letting the product's real voice carry the demo turns the spot into a proof rather than a claim.

**Evidence warning.** No ElevenLabs film was watched. Scrub two or three before locking timings ([E] §7 checklist).

**Prompt seed.** `style=A3 calm editorial AI; canvas #f5f5f5 (or #0c0a09); ink #0c0a09, muted #777169; pastel atmosphere only; display grotesque weight 300, tracking −0.03 em, line-height 1.05, 112 px @1080p, 3-6 words; words blur 8→0 px + rise 0.35 em over 14 f, stagger 3 f, no overshoot; near-still orb (drift period ≈4 min) reacting to VO loudness; push 1.00→1.06 per shot; cuts on the beat or 10 f blur dissolve; restrained electronic 100-120 BPM, voice demo is the hero.`

### ST-B · Cinematic Product Launch [Inferred: assembled from measured components + text]

**Definition.** A launch film built around **one product reveal**: longer holds, depth and light as the main materials, a dark or deep canvas, music-led structure with silence before the reveal, and a logo that lands after a breath. It sells a moment ("it's here"), not a feature list.

**What is measured and what is not.** None of the eight references is a full cinematic launch film. The card combines measured components (each cited) with text descriptions. The structure and numbers marked [inferred] must be validated on real examples before they become defaults.

| Facet | Specification | Evidence |
|---|---|---|
| **Visual** | Dark or deep canvas (navy, near-black) or a single photographic world; one accent; depth from DOF, light and fog; bloom only on emitters; light as the transition material (blooms, washes, light builds); dither on every gradient. "No stock footage, no fake UI, no generic neon technology visuals." | Light transitions [V:1-6l8S]; light build [V:1ccYWJ t=18.87-21.0s]; depth beat [V:1CSXtQ]; [W:motion-so] (Apple-style guide wording) |
| **Dimensionality** | D3-D4 for the product reveal and hero shots; D0 for type. 3D share 30-60% [inferred]. | §13.2 |
| **Motion** | Slow: holds of 3-6 s with 1.05-1.10× pushes; reveals by light, focus or tonal change rather than by movement (kivi's wordmark darkens from silver to brand green over ≈42 f with an L → R tonal sweep); one punch into the reveal cut (+18-33% in 3-8 f); no overshoot anywhere. | [V:1-6l8S t=6.2-7.97s]; Part 03 |
| **Camera** | Hero dolly through a foreground (×2-2.5 in ≈15 f); slow push-ins; screen-to-world pull-back; stepped orbits; wide-angle "surreal" lens only if the brand promise is speed. | [V:1CSXtQ]; [V:19NRDv]; [S:Bolt] |
| **Transitions** | Light blooms and washes, dissolves through defocus, seamless camera moves, hard cuts on the downbeat; one flash at most. | Part 05 TR-13, TR-14, TR-17 |
| **Typography** | Few words, large, light or regular weight, high tracking control; "restrained typography", "crisp typography" [W:motion-so]; headlines ≤6 words; text never over moving 3D without a clean area. | [W:motion-so]; Part 07 |
| **Music & sound** | Hybrid orchestral-electronic or dark ambient, 70-100 BPM or free time with tempo-mapped hits [inferred, Part 09 §16.2.2]; long build to one reveal; 0.15-0.3 s near-silence before it; drop or hit ≈3 f after the visual peak; sustained sting under the logo; a "confident voiceover" is optional. | [V:1-6l8S t=6.65-8.30s]; [V:1CSXtQ t=12.85-13.05s, 27.65-27.85s]; [W:motion-so] |
| **Rhythm** | ASL 2.5-3.5 s; hero shots 4-8 s; end still ≥2.5 s [inferred, Part 08 §15.2]. Reveal at ≈45-60% of runtime: motion.so's 30 s cinematic storyboard puts the product reveal at 0:14-0:24 (47-80%) and the logo at 0:24-0:30; HubSpot's drop lands at 43%. | [W:motion-so]; [V:1CSXtQ] |
| **Duration / format** | 30 s cut and 45-90 s hero at 16:9 [inferred]; flagship "cinematic launch" films run 2.5-4 min (Eleven v3 234 s, Eleven Music 254 s), useful only as tone references. | [E] (sourced durations) |
| **Suitable products** | Platform launches, major versions, AI model launches, hardware-adjacent SaaS, anything with a single "it's here" moment. | [E]; [W:showreel] |
| **Signature recipes** | Logo reveal formula (§11.2 ST-A1); HR-01 depth beat as the reveal; light build into a hard cut (2M-21); black → product polarity cold open (2D-X4). | — |
| **Avoid** | DOF and parallax on every shot (DP-A1); trailer drums and choirs (none in the set; Part 09 SD-MU3); spinning hero objects; generated footage with visible identity drift; a reveal with no silence before it. | Parts 04, 09 |

**Why it works [inferred].** Cinema reads as cinema because of restraint in cutting and control of light, not because of 3D. One reveal, prepared by silence and paid off by a held image, is the measured mechanism (kivi, HubSpot); the rest is the same mechanism stretched over a longer film.

**Prompt seed.** `style=B cinematic launch; deep navy #06004E (or near-black) canvas, one accent, dithered gradients; one product reveal at 50% of runtime prepared by 0.25 s near-silence and a riser, paid off by a light bloom and a held 5 s hero shot with a 1.06× push; hero dolly 2.2× in 15 f through foreground particles with bokeh; 180° motion blur on 3D moves; type light weight, ≤6 words, composited flat; hybrid orchestral-electronic 80-95 BPM; logo held still ≥2.5 s under a sustained sting.`

### ST-C1 · Brand-Bookended Product Montage ("generative slot machine") [Measured: Wix, 53.9 s]

**Definition.** A quiet editorial brand frame (one short sentence, small type, lots of space) bookends a fast, real-UI demo montage of art-directed customer outputs, with anchored elements that keep very fast cuts calm and one reserved "AI colour".

| Facet | Specification | Evidence |
|---|---|---|
| **Visual** | Brand frames: warm off-white #F9F5F2 or navy #02003E, ≈85% empty canvas, one saturated accent (red heart #DB2C36). Product world: real UI (white pills, 1 px hairlines) over full-bleed editorial photography; generated sites art-directed as distinct sub-brands that recur. AI = cyan → indigo gradients, thermal duotone, pixel mosaic, violet halo, and nothing else. | [V:15VhHR §2, §13] |
| **Dimensionality** | D0 base; 2-4 D2/D3 moments (inline 3D heart, refractive ice bottle, carousel, deck), ≈17% as subject. | §0.3 |
| **Motion** | Two speed families: brand frame slow and precise (holds 1.0-1.7 s, single moves 3-6 f); product world fast but physical (12 f scrolls, 6 f morphs, 1-2 f pops). Ease-out entrances with an exponential tail (displacement halves about every 2 f). Decel → dwell → accel bridges. Stagger ladder 2-3 f / 4 f / 5-7 f. No bounce on UI. | [V:15VhHR §6] |
| **Camera** | Jump-reframes on macro type; caret-follow truck (6 → 18 px/f @1138, ease-in); ≈3.4× cut-ins; pull-out cuts to 85/55/44%; carousel BRIDGE whip; 3D rotations of cards 6-7 f; page scrolls ≈1 FH in 12 f with blur. | [V:15VhHR §7] |
| **Transitions** | Hard cuts only between shots; icon → UI morph (6 f); locked-overlay cuts; thermal → colour switches; colour-match cut; anchored-object background swaps; deck → inline slot; heart-fill cut + exponential colour dissolve. | [V:15VhHR transitions] |
| **Typography** | Geometric humanist grotesk (Wix Madefor Display [inferred]), Regular, sentence case; hook macro type cap 49% H (≈530 px @1080p), word every 7 f; brand sentence cap 6.6% H (≈71 px), centred, ≈56% W, ≤7 words, ≥1.0 s still; tagline ≤3 words; logo cap 12.2% H. Only 11 words of ad copy in the film; everything else is diegetic UI. | [V:15VhHR §8] |
| **Music & sound** | ≈112 BPM pop-electronic with vocal chops; section-level sync: drop 8 f after the first UI, suck-out to −35 dB exactly on the decisive click, re-entries within ±2 f of section cuts; cuts not beat-locked (chance level). No VO. Click accents on ≈4 clicks. −15.9 LUFS. | [V:15VhHR §11, §12] |
| **Rhythm** | ASL 1.58 s, median 1.50 s; generation montage ASL 0.64 s and ice montage 0.83 s, both with an anchored element; slow → fast → slow ×3. | [V:15VhHR §11] |
| **Duration / format** | 45-60 s at 16:9 [V:15VhHR]; a 15-20 s cut = macro hook → sentence → slot machine → payoff → logo [inferred]. | — |
| **Suitable products** | AI site/app builders, creative tools, platforms whose output is the customer's content. | Part 02 AD-S4 |
| **Signature recipes** | KT-07 bookend sentence with inline objects; UI-P3 brand icon becomes the UI; UI-P4 locked anchor with swapping worlds; HR-03; HR-07; HR-08; generation-state transitions (TR-22). | Parts 05-07 |
| **Avoid** | Changing on-screen copy between a wide shot and its cut-in ("make" vs "create"); unlabelled asset montages; AI colours held >15 f; whooshes on every whip; 25 → 30 fps pulldown; bitrates <2 Mb/s for 720p gradients. | [V:15VhHR §16] |

**Why it works.** The brand frame is quiet so the product world can be loud. Anchors (prompt bar, ice bottle, sentence position) make 0.23-1.27 s shots feel calm, and recurring sub-brands turn a montage into three customer stories.

**Prompt seed.** `style=C1 brand-bookended montage; brand frame #F9F5F2 with 85% empty space, one sentence in a regular grotesk at 71 px @1080p held 1.0 s still, one inline 3D object in the brand red; product world: real UI over editorial photography; AI acting = cyan→indigo gradient for 8-15 f then final colours; prompt bar locked at identical x/y/size while backgrounds cut every 0.3-1.3 s (lengthening); cursor native 2% FH, 15-20 f ballistic moves, 0.3-1.0 s hover; music 112 BPM, suck-out ≈20 dB (RMS −15 → −35 dB) exactly on the decisive click, cut 8 f after the click, result built in 12 f from the cut.`

### ST-C2 · Feature Demo / How-To Series [Text: Superside]

**Definition.** One feature per film, real product UI as the proof, narrated or captioned, in the order the customer meets the feature; made as a series with one template.

| Facet | Specification | Evidence |
|---|---|---|
| **Visual** | Clean/corporate; real UI framed as floating cards on brand backgrounds; highlight one area at a time, dim the rest ("certain parts of the screen recording are highlighted"); logo bookends. | [S:Newsela] [S:Slack] [S:playbook rule 5] |
| **Dimensionality** | D0, occasionally isometric D1 for concept beats. | [S:TradeLens] |
| **Motion** | Calm, `smooth` motion; zoom-to-callout (≈0.6 s camera ease to make the focus area ≈45% W; spotlight dims the rest to the `dim` value over 0.3 s; ring stroke 0.35 s) [proposal values]. | [S:playbook gap 1] (proposal, [inferred]) |
| **Camera** | Push-ins to the element being named; slow 1.00 → 1.04 push between focuses [inferred]. | [S:playbook] |
| **Transitions** | Simple cuts and slides on VO sentence boundaries [inferred]. | [S:Newsela] |
| **Typography** | Series naming "How to [Brand]: [Task]"; kicker chapter cards "01 / 04"; captions change every ≈2.5-3.5 s. | [S:Asana] [S:Superspace] [S:Luminate] |
| **Music & sound** | VO at ≈150-170 wpm (Superspace ≈154, Luminate ≈160, Thomson Reuters ≈170); light bed; UI click SFX [inferred]. | [S:playbook rule 7] |
| **Rhythm** | Text change every 2.5-3.5 s; a new idea every 7-14 s (Airtable chapters 9-14 s). | [S:playbook rule 6] |
| **Duration / format** | 45-90 s per feature (Newsela 57, Airtable 58, TradeLens series 78-87, Asana ≈83); platform tours ≈2 min; 20-30 s vertical cut of the single "aha". | [S] |
| **Suitable products** | Consideration and onboarding for any SaaS; help-centre embeds. | [S:Asana] |
| **Avoid** | Click-by-click screen recordings with no focus; micro UI text <2.5% H; inventing UI or numbers. | [S:playbook]; Part 06 |

**Why it works.** The viewer's question is practical ("how?"), so the film answers it in the order of use, with one highlighted region per sentence.

**Prompt seed.** `style=C2 feature demo series; clean light canvas, real UI screenshot in a floating card (radius 24 px, soft shadow), one focus rectangle per VO sentence: camera eases 18 f to fill 45% W, outside dims to 40% over 9 f, ring draws 10 f; narration 155 wpm; chapter kicker "02 / 04"; logo bookends.`

### ST-C3 · Launch Recap Sizzle [Text: Figma Config]

**Definition.** A fast montage of many product launches as real UI clips, cut on the music, with no voice-over.

| Facet | Specification | Evidence |
|---|---|---|
| **Visual** | ≈71% real screen capture, ≈29% branded graphics (chapter cards, glyph transitions, end card); clips cropped tight on the action area [inferred]; brand glyph system (primitive shapes with inner/outer elements, alternating round and sharp corners). | [S:Figma] |
| **Motion / camera** | Zoom-to-action ≈0.4 s ease-out; floating-card clips with a 1.0 → 1.08 push over ≈1 s [inferred]. | [S:Figma] (transferable, inferred) |
| **Transitions** | Hard cuts on music beats [inferred]; glyph wipes between chapters [inferred]. | [S:Figma] |
| **Typography** | Product-name chapter cards 0.8-1.2 s in a bold condensed sans [inferred]. | [S:Figma] |
| **Music & sound** | Upbeat, no VO; launch series scored with a shared sonic palette ("digital, while still staying warm and organic"). | [S:Figma] |
| **Rhythm** | ≈57.7 scenes/min (≈1 shot per second); ≈75-80 shots in ≈82 s. | [S:Figma] (videngineer snippet) |
| **Duration / format** | 60-90 s recap; 15-30 s teaser. | [S:playbook H] |
| **Suitable products** | Conference launches, release weeks, changelog videos. | [S:Figma] |
| **Avoid** | Cutting faster than ≈1 s on UI that must be understood; montage without chapter cards. | ER-05 (Part 08) |

**Why it works.** Density sells momentum; the interface "does the talking", so it feels like "watching a master designer at work" [S:Figma].

**Prompt seed.** `style=C3 recap sizzle; 1.0 s per shot locked to a 120 BPM grid (every 2 beats), 70% real UI clips in floating cards with a 1.08× push, 30% chapter cards (product name, condensed bold sans, 0.8-1.2 s) with a shape-glyph pop; no VO; arrow-list recap at the end.`

---
## 11.3 Style cards (D, E, F and discovered styles)

### ST-D · 3D Technology Film [Inferred: assembled from measured 3D components + text]

**Definition.** A film whose main register is lit 3D: UI planes, objects and data structures in a designed space, an optical camera with DOF and motion blur, and 2D type composited on top. It shows a system's *structure* (layers, networks, data flowing) or a product's *volume*.

**What is measured and what is not.** No reference is a 3D-first film. The closest measured material is Bumper's proof register (≈51% of its runtime), HubSpot's 3.67 s studio beat, Lottieicon's extrusions and dome, and NOSTRA's ring, ribbon and floor. Text sources describe the genre: "3D / CGI" is 40 of 243 reels on showreel.design, hardware launches get "full 3D/CGI hero treatment", and AI brands use glass-sphere and abstract-shape "hero object" loops [W:showreel] [W:raivcoo]. Bolt's brief asked for structured 3D scenes for "control over shapes and volumes" with organic 2D on top [S:Bolt].

| Facet | Specification | Evidence |
|---|---|---|
| **Visual** | Deep canvas (navy, black, or a palette-lit studio radial); UI as matte or glass planes; one accent for state and light; extrusions and rim light for volume; fog or a horizon for place; dither; no HDRI skies, glossy floors or chrome. | [V:19NRDv] [V:1CSXtQ] [V:1ccYWJ]; 3D-U19 |
| **Dimensionality** | D2-D4 as the main register (50-90% [inferred]); D0 for type and the logo. | §13.2 |
| **Motion** | Fly-ins 12-22 f E-SNAP with blur; edge-on flips 6-8 f; extraction → push-through 9 f; implosion 8 f + ≤12 sparks; recede exits (≈50% + dim over 8 f); idle motion on one axis; no overshoot. | §13.5 |
| **Camera** | Never static (drift ≈1-3% of frame per second); stepped orbits (9-12 f steps, ≈1.2-1.3 s apart); hero dolly ×2-2.5 in ≈15 f; screen-to-world pull-backs; moderate-telephoto feel for UI planes; 0° roll; a camera beat every 0.8-1.5 s in shots longer than 3 s. | §13.4; [V:19NRDv rule 12] |
| **Transitions** | Push-through, dolly through a foreground, rack focus 8-12 f, recede-and-cut, beat cuts with world flips, implosion into the logo. | Part 05 TR-12, TR-17 |
| **Typography** | 2D, frontal, sharp; sizes as ST-E1 (hero words cap 15-33% H; lines 4.5-5.5% H); bloom ≤2-3% of cap height. | [V:19NRDv]; DP-14 |
| **Music & sound** | Bass-forward electronic (100-112 BPM) or hybrid cinematic (70-100 BPM) [inferred]; sub booms at the *peak velocity* of camera moves (±2-3 f) [V:1ccYWJ]; whooshes on push-throughs; low-pass breakdown under dense 3D UI [V:19NRDv]. | Part 09 |
| **Rhythm** | ASL 2.5-3.5 s; long proof shots 3-6 s held together by in-shot camera beats [inferred from [V:19NRDv]]. | Part 08 §15.2 |
| **Duration / format** | 30-60 s at 16:9 [inferred]; 3D renders need a 16:9 master with a planned 9:16 recomposition, not a crop [inferred]. | — |
| **Suitable products** | Infrastructure, data platforms, networks and security, AI systems explained as structures, developer platforms, hardware-adjacent products. | [W:showreel]; [S:TradeLens] |
| **Signature recipes** | 3E-01 tilted planes; 3E-02 rings/decks; 3D-U5 hero dolly; 3D-U7 push-through; 3D-U14 implosion; HR-01; HR-08. | §13 |
| **Avoid** | Turntables; DOF everywhere; ambient particles; unblurred fast moves; reading text on tilted planes; a 3D logo. | §13.12 |

**Why it works [inferred].** 3D earns its cost when the product is a structure. Showing layers, flows and networks in depth makes an invisible system legible; everything else in the film must stay as disciplined as a 2D film, or the 3D reads as a demo reel.

**Prompt seed.** `style=D 3D technology film; navy #06004E studio with a soft coral key from upper right and violet floor fill; UI as matte white planes with soft contact shadows, flown in at 35° and flattened to ≤15° before reading; camera always drifting 2% W/s, stepped orbit 10 f per step every 1.25 s, push-through 9 f; 180° motion blur on all 3D moves; DOF only on foreground objects; type composited flat; sub boom on each move's peak velocity; 100 BPM.`

### ST-E1 · Night Claim / Day Proof (kinetic type × 3D UI) [Measured: Bumper, 67.2 s]

**Definition.** A swaggering, beat-locked launch that alternates two worlds: a dark navy world of glowing kinetic type for claims and a bright lavender-white world of tilted 3D product UI for proof, bookended by a callback of the opening line.

| Facet | Specification | Evidence |
|---|---|---|
| **Visual** | Claims on navy #020047-#06004E with a coral glow top-right and violet at the floor; proof on lavender-white #F4F4FC / #FCFCFC with a periwinkle #C4C4EC corner vignette; one orange accent (#F4643C large, #E46C54 small) on the benefit word of every line; status colours only inside UI (mint #D4F4EC, teal #34ACB4, red #EC243C, yellow #ECDC9C). Glow on white type over dark (≈15-20 px @1080p on hero words). | [V:19NRDv §2, §13] |
| **Dimensionality** | Claims D0 (0% 3D); proof D2/D4 (≈51% of runtime). | §0.3 |
| **Motion** | Oversize slam 3-4× → 1× in 8-13 f (64% on f1); words built from the right with blur and defocus 7-10 f apart (≈an eighth note at 100 BPM); continuous pull-back 1-3.5%/f with 3 f snaps of ≈40-55%; semantic letter animation 9-30 f, ≥3 per film (the reference has exactly 3: 7.68, 14.33, 46.13 s); counters expo-out ≈1 s; implosion + sparks; **no overshoot anywhere; motion blur on every move.** | [V:19NRDv §6, rules 1-6] |
| **Camera** | Never static on UI (≈1-3% of frame per second); push-through 9 f; punch-in cut ≈2.5×; angle-change cut; dolly along rows; stepped orbit (9-12 f, ≈1.25 s apart); drift-orbit; yaw recede. | [V:19NRDv §7] |
| **Transitions** | Hard cuts (18); 7 light/dark world flips (6 on hard cuts, 1 through the chevron wipe at 48.00 s); inverted match cut (same text, colours inverted); whip-smear exits; 3 f scale snaps; chevron shape-mask wipe motivated by the copy ("up a gear", ≈20 f total); push-through; implode/merge. | [V:19NRDv §10] |
| **Typography** | One geometric grotesk (Satoshi/General Sans-like [inferred]) at Medium for lines and Semibold for hero words; a heavy rounded display face for the product name. Hero word cap 15-23% H (160-250 px @1080p); final hero "PRO" cap ≈33% H (≈355 px); two-line headline cap 8-9% H with ≈1.1× leading; phrase lines cap 4.5-5.5% H; ≤6 words on screen; every line legible and still for 0.6-1.6 s. Function words ("like a") at ≈60% opacity. | [V:19NRDv §8] |
| **Music & sound** | 100.0 BPM bass-heavy electronic (55-80% of energy below 120 Hz); sparse sub kicks every 1.2 s under the hook; full groove on the kick before the first big graphic move; low-pass breakdown under the densest UI; long build into the finale; fade under the CTA. 11 of 18 cuts land 0-2 f **before** a quarter-note beat. No VO. −14.1 LUFS. | [V:19NRDv §11, §12] |
| **Rhythm** | ASL 2.49 s, median 1.78 s; claim cards 1-2 s; proof shots 2-6 s with an in-shot beat every 0.8-1.5 s; finale word swap every 11-16 f (0.46 s); a 5.7 s lockup shot, static for its last ≈4.6 s. | [V:19NRDv §11] |
| **Duration / format** | 60-70 s homepage hero / launch post at 16:9 [V:19NRDv §14]; 30 s and 15 s cuts keep the bookend line and one proof [inferred]. | — |
| **Suitable products** | Fintech, payments, B2B ops; any "unify / automate" platform. | [V:19NRDv §14] |
| **Signature recipes** | KT-02 slam + build + pull-back; KT-09 escalating swap; HR-02; UI-P5 context → extraction → focus; UI-P9 before/after toggle; HR-08 implosion. | Parts 06-07 |
| **Avoid** | Captions clipped by the frame edge; 1-frame dips to black; repeating the slam grammar >6 times without a semantic variant; low-contrast glass bars on navy; bloom that smears letters; a one-off stock lifestyle photo; cutting late on the beat. | [V:19NRDv §16] |

**Why it works.** The background world tells the viewer whether to read or to watch, which doubles the contrast available. Motion acts out the copy (dollar-sign decode, self-assembling letters, chevron "up a gear"), so the type is the narrator without a voice-over.

**Prompt seed.** `style=E1 night claim / day proof; claims on navy #06004E with a coral glow top-right, white type Medium with the benefit word in #F4643C, hero word slams from 3.5× to 1× in 10 f (E-SNAP), words enter from the right with blur 8 f apart, camera pulls back 2%/f with 3 f snaps; proof on lavender-white #F4F4FC: tilted glass UI planes, soft contact shadows, DOF at panel edges, 180° motion blur, one orange 3D cursor; hard cuts 0-2 f before 100 BPM quarter beats; no overshoot.`

### ST-E2 · Dark Neon Asset Reel [Measured: Lottieicon, 44.3 s]

**Definition.** An energetic dark-mode reel in which the product's own animations are the stars: black canvas with a moving green aurora, one emissive neon accent meaning "alive/selected", punchy statement cards that suck into each cut, and a hop-and-hold camera tour across the asset grid.

| Facet | Specification | Evidence |
|---|---|---|
| **Visual** | Black #000 lit by deep-green radial blobs (#061506 → #0B2B0B → #114110); one neon accent #38D037 for glow, highlight tiles, extruded card edges, chips and bubbles; white #F5F7F5 type and UI surfaces; UI greys #E8EAE8 / #CACACA. Emissive under-glow (falloff ≈10% H); highlight-tile glow ≈20% of tile size. Add 1-2% dither (the reference bands). | [V:1ccYWJ §2, rule 16] |
| **Dimensionality** | D0 base with D1/D2 accents (extruded cards, dome, lens warp), ≈9% + DOF bubbles in the CTA. | §0.3 |
| **Motion** | Snap pop +40-55% in 6 f (velocity peak on f2), hold 6-10 f, suck-in shrink −24 to −30% over 8-18 f into the cut; beat-step logo bumps (+15% in 4 f, then +5% in 3 f); whip exits 3-8 f; cut into motion (25 f expo-out already in progress); edge-on card flips 8 f; auto-fit type-on 40-55 cps; linear tally counters with a hard stop; one animated element at a time inside a still component. No overshoot (only a 3-4 f tilt settle on role words). | [V:1ccYWJ §6, rules 1-13] |
| **Camera** | 19 of 25 shots locked; exponential zoom-through ×1.36/f; lens-distortion zoom-out (≈2× → 1×, ≈20 f); hop-and-hold tour (17-32 f glides, 7-20 f holds). Keep tour peaks ≤8-10% W/f or add blur: the reference's 22-27% W/f unblurred pans strobe. | [V:1ccYWJ §7, flaws] |
| **Transitions** | Zoom-through, suck-in shrink → cut, whip exit → cut, variable-word swaps, lens-distortion zoom-out, dim-to-texture (15% in 3 f), 3D object wipe, light build → cut, scale-matched pull-back hand-off, circle → pill morph. No plug-in transitions. One transition per ≈1.8 s. | [V:1ccYWJ §10] |
| **Typography** | Rounded geometric sans (Gilroy/Gordita-like [inferred]) Medium; one serif italic used only for the variable word in a slot-machine line. Statements em 6.7-10.8% H (≈72-116 px @1080p); "Why wait?" ≈16.7% H; hero "So" em ≈44% H (cap 31% H). Sentence case. Typically 1-5 words; max 7. | [V:1ccYWJ §8] |
| **Music & sound** | ≈112 BPM light electronic bed; **SFX locked to motion**: sub booms at the peak velocity of each zoom and camera move (within ≈2-3 f), a high whoosh at the ribbon's peak velocity; cuts only loosely beat-cut. Keep the bed to the last frame and add typing ticks (the reference ends music 3.7 s early and has none). −16.6 LUFS (raise to −14). | [V:1ccYWJ §11, §12] |
| **Rhythm** | ASL 1.77 s, median 1.43 s; fast (0.91 s) → medium (2.15 s) → slow hero tour (3.62 s) → fast (0.98 s) → long CTA hold; climax triplet of 10-12 f cards. | [V:1ccYWJ §11] |
| **Duration / format** | 30-45 s at 16:9 [V:1ccYWJ §14]; 15 s cut = bell hook → wall + counter → tour → CTA [inferred]. | — |
| **Suitable products** | Icon packs, UI kits, Lottie/AE template libraries, design-tool plugins, dev-tool component libraries. | [V:1ccYWJ §14] |
| **Signature recipes** | KT-04 snap-hold-suck; KT-09 slot machine; KT-10 climax triplet → action CTA; UI-P7 hop-and-hold tour; 2M-20; 2M-21; HR-05. | Parts 06-07 |
| **Avoid** | Music ending before the picture; no final logo lockup (the brand appears for only 1.9 s); micro labels <2.5% H; fast unblurred pans; >4-5 text-only cards in a row; inconsistent copy grammar and number formats. | [V:1ccYWJ §16] |

**Why it works.** The product demonstrates itself; light (the neon accent) means "alive", so every highlight is also a story beat; sub booms at peak velocity give flat moves weight without blur.

**Prompt seed.** `style=E2 dark neon reel; black canvas with slow deep-green radial blobs #061506→#114110, one neon accent #38D037 for glow and selection only, white #F5F7F5 type in a rounded geometric sans Medium 90-116 px @1080p; statement cards pop +50% in 6 f, hold 8 f, shrink −27% over 10 f (E-EXIT) and cut on the smallest frame; asset grid revealed by a 2×→1× barrel-warp zoom-out over 20 f; hop-and-hold tour 24 f glides (E-HOP, peak ≤8% W/f) with 15 f holds on accent-glow tiles; sub boom at each move's peak velocity; 112 BPM; 1-2% dither.`

### ST-F1 · Retro-Editorial 2.5D Explainer [Measured: Solar, 35.8 s]

**Definition.** A warm, magazine-like explainer in flat illustration with 2.5D tricks, a strict five-colour palette, fine grain and bloom on light sources only, told as a chain in which each scene hands the energy to the next carrier.

| Facet | Specification | Evidence |
|---|---|---|
| **Visual** | Five colours: cyan #4DD9E5, vermilion #E12E16, cream #F6F1ED, oxblood #1D0B0A, mustard #F3C64E; one flat background colour per scene, changing on almost every cut; fine monochrome grain on every frame; halation only on emitters (lamp, sun as light, screen, bolt, neon labels). One hero per frame, labels in negative space at x ≈15-20% / 80-85% W on the hero's mid-line. | [V:1Hcg3X §2, §13] |
| **Dimensionality** | D1 only: rim thickness, isometric panels, long hard shadows, perspective rows, planet-curve horizon, parallax 1.3-2×. Zero blur, zero DOF. | [V:1Hcg3X] |
| **Motion** | The expo envelope on every shot (2D-U3); perpetual drift 0.3-0.5%/f, true holds ≤5 f; long-settle E-SETTLE wipes for new words (≈2.4 s); snap-tilt settles on objects (10-14°, one +5° overshoot at most, objects only); gravity bounce with contact rings; particle coalescence + one flash (3 f + 2 f). | [V:1Hcg3X §6, rules 1-15] |
| **Camera** | 2D only: vertical crane-scroll (drift 0.3-0.5% H/f), whip tilts (6-8 f, up to 20% H/f) as transition carriers, a 3× → 1× device pull-out in 24 f, parallax. Screen direction continues across cuts (vertical = progression, horizontal = context). | [V:1Hcg3X §7] |
| **Transitions** | Directional whip + hard cut on the clean plate (0-1 empty frame); object wipe; light-source match cut (shrink to a ≈4% W point in 2 f, hold 2 f); band push; split-panel wipe; state jump-cuts; strip carousel recap. One effect transition (the flash). ≈0.6 changes per second. | [V:1Hcg3X §10] |
| **Typography** | Two families with fixed roles: high-contrast serif for concept words (title cap 11.6% H ≈125 px @1080p; concept words font 12.5-13% H) and bold grotesk for labels (cap 3.6-4% H ≈39-43 px) and messages (cap 5.6% H ≈61 px, leading ≈1.0). Text is world-space, revealed by opacity + defocus in 2-5 f, stagger 4-10 f. ≤6 words. | [V:1Hcg3X §8] |
| **Music & sound** | 64.6 BPM pulse (≈129 half-time), flat compressed bed (σ 1.7 dB) under a probable VO [inferred]; 5 of 16 hard cuts within ±2 f of an onset (≈20% expected by chance), but 4 of the 5 mid-act cuts (6.8-16.2 s) within ≈1 f of an onset, so beat-cutting is a mid-act device only; SFX hooks on bounces, wobbles, flash and whips [inferred]. −16.6 LUFS. | [V:1Hcg3X §11, §12] |
| **Rhythm** | ASL 2.1 s, median 1.9 s; bursts of 1.5-2.5 s, then hero holds of 3.5-4.7 s; the longest shot (4.7 s, ≈13% of runtime) goes to the core concept. | [V:1Hcg3X §11] |
| **Duration / format** | 30-60 s at 16:9 [V:1Hcg3X §14]; render natively (the reference is 24 → 30 pulldown). | — |
| **Suitable products** | Explaining an invisible mechanism: data flow, security, AI pipelines, energy, fintech, climate, infrastructure SaaS. | [V:1Hcg3X §14] |
| **Signature recipes** | KT-06 editorial title stack and world-space labels; 2M-10 to 2M-15; HR-10; recap triptych locked to exact thirds. | Part 07 |
| **Avoid** | Two light directions; labels <2.5% H; a payoff readable <0.5 s; off-beat unexplained state snaps; ending without a logo; more than one flash; mixing whip directions without a rule. | [V:1Hcg3X §16] |

**Why it works.** Every cut is a hand-off of energy with a shape or light match, so the explanation reads as one continuous thought. Palette discipline, grain and emitter-only bloom give flat art the finish of print.

**Prompt seed.** `style=F1 retro-editorial 2.5D; 5-colour flat palette (#4DD9E5 #E12E16 #F6F1ED #1D0B0A #F3C64E), one flat background per scene changing every cut, fine mono grain 3%, bloom only on light sources; 2.5D: rim thickness, long hard shadows from upper left, parallax 1.5×; every shot: arrive E-SNAP (90% by f12), drift 0.4% H/f, exit E-WHIP 8 f to 20% H/f, hard cut on the clean plate; serif concept words 130 px @1080p, grotesk labels 40 px flanking the hero; 64 BPM bed under VO, scene changes on downbeats.`

### ST-F2 · Monochrome Brand-System Explainer [Measured: NOSTRA, 35.1 s]

**Definition.** A two-colour brand film in which shapes and three-word lines carry the argument: one saturated hue, off-white, near-black, polarity flips on most cuts, shape-match chains, and short 3D accents, each in a different material, used once.

| Facet | Specification | Evidence |
|---|---|---|
| **Visual** | Emerald #2FC06C / #31BA69, off-white #F4F5F4 (never #FFFFFF), near-black #161616 for type, mint #A4DEBC / #B6E3C9 for gradients only; ≥75% of hard cuts flip polarity green ↔ white; depth from fog and scale; grain-gradient on 3D props, frosted glass tiles, one glossy inflated object. Design-tool chrome (1 px selection boxes with square handles, a stroke-drawn cursor). | [V:1i2L14 §2, §13] |
| **Dimensionality** | D0 with D2/D3 accents of 1-3.5 s (≈34% of runtime in total), each a different verb. | §0.3 |
| **Motion** | Snap arrivals (40-45% of travel on the first moving frame, 88-95% by f6); accelerating exits (whip ×1.5-3 per frame; gravity ×1.2 per frame with 10-20° rotation); oversize-and-settle pops (≈2× → 1 in 3-4 f; labels 1.25× → 1 in 4 f); drift 0.3-1 px/f after landing; stagger 1 f / 2 f / 2-3 f; scatter → swap → converge (≈1 s per sentence); shape-match chains; cue fast moves (cursor turns toward the whip ≈10 f before). | [V:1i2L14 §6, rules 2-8] |
| **Camera** | Static + micro drift; fly-through clouds; push into bloom (≈2× in 6 f); two-step pull-back (1.0 → 0.79 in 6 f, later 0.75 → 0.63 in 6 f); cue-led whip pan (8-9 f expo-in); orbit inside a card ring; tilt onto a floor plane (6 f). | [V:1i2L14 §7] |
| **Transitions** | 28 measured: shape-match cuts with polarity flips, collapse-to-dot, whip hiding the cut, mask wipe-off and re-type, smash-in to macro, gravity drop, blinds wipe (1 f stagger), twist-hidden background swap, pixel build (keep ≤12 f), scale chains, dot burst (6 f exponential), hexagon iris (7 f), click-triggered morph to the logo. No generic dissolves except one blur-dissolve. | [V:1i2L14 §10] |
| **Typography** | Montserrat-like wide geometric sans, SemiBold caps, tracking 0 to +3%; lines cap 5.6% H (≈61 px @1080p); heroes 8.5-11% H (≈91-118 px); logo cap 7.2% H; ≤3 words per line with one key word in the brand green; each settled line held ≥10 f (10-23 f measured). | [V:1i2L14 §8] |
| **Music & sound** | 83.4 BPM; copy-driven, not beat-cut (3 of 14 cuts on onsets = chance); ticks on dot pops, button press and cursor taps; a whoosh ending on the whip's fastest frame; a filtered riser into the burst; leave a −6 dB breath under the calm section [teardown recommendations]. Master to −14 LUFS (the reference is −7.9 LUFS with overs). | [V:1i2L14 §11, §12] |
| **Rhythm** | ASL 1.85 s (19 setups), ≈41 motion events (one per 0.85 s); fast (0-4 s) → readable (7-10 s) → dense (14-24 s) → 4.7 s breather (13% of runtime, inside the P08 ER-U11 band of 10-15%; energy <10% of peaks) → calm CTA. | [V:1i2L14 §11, rule 14] |
| **Duration / format** | 20-40 s at 16:9 or 1:1 [V:1i2L14 §14]; measured structure for 30-35 s: hook 1.4 / dream 4.8 / pain 8 / benefit 5.7 / features 10.7 / reassurance 1.5 / brand + CTA 2.9 s. | [V:1i2L14 rule 16] |
| **Suitable products** | Agency and service self-promos, LinkedIn and paid-social ads, brand-system showcases. | [V:1i2L14 §14] |
| **Signature recipes** | KT-05 scatter → swap → converge; 2M-18; 2M-19; HR-09; click-caused CTA (press −20% in 3 f, release 6 f, no overshoot). | Parts 06-07 |
| **Avoid** | Over-loud masters; pixel builds >12 f; unlabelled abstract feature metaphors; a new material per section; mixed languages; delivering inside a player wrapper. | [V:1i2L14 §16] |

**Why it works.** One hue removes colour noise, so polarity flips and shape continuity can carry the rhythm. Swaps hidden inside motion (scatter, twist, burst) make many small edits read as one breathing object.

**Prompt seed.** `style=F2 monochrome brand system; emerald #2FC06C / off-white #F4F5F4 / ink #161616, flip background polarity on 80% of cuts; one white circle carried across 4 setups within ±5% of position; SemiBold caps 61 px @1080p, ≤3 words, one key word in emerald; arrivals 45% of travel on frame 1, exits accelerate ×2/frame; small dots enter at 2× and settle in 3 f, stagger 2 f; one 3D accent per material (grain-gradient prop, frosted glass tile, inflated glossy object); 4.5 s low-motion breather before the CTA; 84 BPM, cut on the copy.`

### ST-F3 · Documentary Overlay / Founder Story [Text]

**Definition.** Editorial motion graphics laid over real speech (an interview, a founder, a talking head) or an archival/photo narrative: the graphics pull out the core idea, frame it editorially and keep motion crisp.

| Facet | Specification | Evidence |
|---|---|---|
| **Visual / motion** | "Add documentary-style motion graphics… pull out the core idea, keep the framing editorial, and keep the motion crisp"; Vox-style explainer structure; photo slides, text slides, vintage and gradient maps, page turns, blurred-zoom transitions, 2.5D parallax transitions | [W:motion-so] (Naval, documentary explainer demos); [W:raivcoo] (Lovable "documentary-style" founder films cut into technique clips) |
| **Camera** | Footage carries its own camera; graphics inserts get one 2.5D parallax move each (foreground 1.3-2× the background, as measured in [V:1Hcg3X]) or a slow 1.00 → 1.05 push over a soundbite [inferred]; no camera moves on the speaker shot beyond the footage's own | [W:motion-so] ("2.5D parallax transitions"); [S:playbook proposal]; numbers [inferred] |
| **Transitions** | Hard cuts on speech; page turns, blurred-zoom transitions and 2.5D parallax transitions into editorial inserts (text names only, no timings); never a dissolve over a face | [W:motion-so]; durations [inferred] |
| **Typography** | Captions in 2-line cues of 2-4 s; lower thirds held ≈3.5 s on first appearance [S:playbook proposal]; keyword emphasis in kinetic type | [S:Thomson Reuters] (11 caption cues of 2-4 s, from the caption track) |
| **Sound** | Real speech carries the story (≈160-170 wpm); music bed swells in silent head and tail; never synthesise a real person's testimonial | [S:Thomson Reuters] [S:Luminate]; [S:playbook] |
| **Rhythm** | Cut on speech; captions change every ≈3.2 s | [S:Luminate] |
| **Duration** | 30-120 s [S]; teaser cuts 30-45 s | [S:playbook] |
| **Products** | Founder-led startups, thought leadership, mission and brand stories | [W:raivcoo]; [S:GitHub] |
| **Avoid** | Graphics that compete with the speaker's face; fake footage of real people | [S:playbook] |

**Prompt seed.** `style=F3 documentary overlay; real interview footage, 2-line captions every 3 s at 52 px @1920p, keyword in the accent colour, lower third 3.5 s on first appearance, one editorial insert (photo slide or map) per idea with a 2.5D parallax move; crisp motion, no bounce; music bed under silent head and tail.`

### ST-G · Playful Illustrated Collage + UI [Measured: Chowdeck, ≈18 s, 9:16; discovered]

**Definition.** A cheeky, warm consumer-app ad in flat vector illustration collaged with real photo cut-outs and light UI cards, animated on twos, told as the life of a single transaction, with chapter colours and a dialect hook.

| Facet | Specification | Evidence |
|---|---|---|
| **Visual** | Six colours, ≤4 per frame: teal #006965-#007B6E (anchor and bookends), mustard ≈#D8C21A (type), orange #F36A05 (energy), cream/yellow #E0C15D (product chapter), pale blue #87C0ED, pink #F7B0A3, plus dark brown type; background colour per chapter; photo cut-outs with soft drop shadows; UI cards with an offset solid backing card (≈6% → 3%). No grain, no lighting model. | [V:126cpH §2, rules 3-4] |
| **Dimensionality** | D0-D1; live action on ones in one 0.93 s insert. | [V:126cpH] |
| **Motion** | **On twos (≈12 unique fps)** for all graphics; pops of 0-4 f; boil on held shapes; gravity falls with rotation; flat → real swaps in 0 f; two-stage pull-out ×4.1 in 1.0 s; tossed card with one rotational overshoot (≈25% of the swing); typewriter question ≈15 cps; payoff headline fades ≈15 f per line with a 3 f line stagger. | [V:126cpH §6, rules 4-12] |
| **Camera** | 2D comp camera: locked title cards (≈42% of runtime), two-stage pull-out, push + pan over a mosaic (≈1.3×, linear), vertical push (1 frame-height in ≈11 f), rotate-to-upright + slow pan on a map, tilt down through clouds to the lockup (≈30 f S-curve + 10 f settle), two rack focuses. | [V:126cpH §7] |
| **Transitions** | Colour-matte + defocus reveal into live action; vertical push with directional blur; shape-match swaps; match-on-action across a hard cut (a falling melon); shared-element UI morph + rack focus; seamless tilt through a cloud layer. ≈1 visual event per 0.7 s. | [V:126cpH §10] |
| **Typography** | Extra-bold rounded geometric sans, lowercase, tight tracking; hero word ascender 12-13% H (≈240 px @1920p), ≈84% of width, with a setup word at ≈1/3 size above it; UI text must be ≥2.5% H (the reference's 1% is illegible); payoff Title Case, tone-on-tone, leading ≈1.0. Max 5 words. | [V:126cpH §8] |
| **Music & sound** | 95-110 BPM groove (95.7 measured), regional where the audience is; the groove runs under the picture (not beat-cut); one deliberate sync: a 0.5 s dip, then the click on an onset (0 f). Sound-off safe; no VO. | [V:126cpH §11, §12] |
| **Rhythm** | ASL 1.63 s, median 1.6 s; burst-and-breathe cycles of 2-4 s; UI shots ≥1.8 s; payoff hold ≥1.0 s; lockup ≥1.5 s with one tiny ambient motion. | [V:126cpH rules 14-15] |
| **Duration / format** | 15-20 s at 9:16 (structure: hook 1.6 / problem 0.9 / promise 2.6 / range 4 / UI action 1.8 / tracking 2.5 / payoff 1.6 / transition 1.0 / lockup ≥2.5 s with CTA). PointCard's 18 s pricing ad is the same length class. | [V:126cpH rule 2]; [S:PointCard] |
| **Suitable products** | Consumer apps (delivery, fintech, social), warm SaaS, performance social ads. | [V:126cpH §Style] |
| **Signature recipes** | KT-08 setup/punch hook + typewriter question; 2M-06; 2M-07; 2M-08; 2M-09; 2M-16; HR-06; UI-P6. | Parts 06-07 |
| **Avoid** | Static first 0.73 s; rays over the claim word; illegible UI micro text; no CTA; 45° long shadows; more than 3 idioms in a frame; stepped UI. | [V:126cpH flaws, Avoid] |

**Why it works.** On-twos tempo unifies three rendering idioms (flat, photo, UI) under one hand-made feel; flat icons promise and real photos prove; one transaction gives the whole ad a single, easy story.

**Prompt seed.** `style=G playful collage; 9:16, flat vector + photo cut-outs (soft drop shadow) + light UI cards with a 5% solid offset backing card; teal #006965 bookends, chapter background colours, ≤4 colours per frame; graphics animated on twos (12 fps poses), UI scroll and cursor on ones; lowercase extra-bold rounded sans, hero word 240 px @1920p at 84% width with a 1/3-size setup word above; pops 1-4 f, gravity falls with 70° rotation, flat→real swaps in 0 f; 100 BPM groove, one synced click after a 0.5 s dip.`

### ST-H · Live-Action Customer Story + Motion Overlay [Text; discovered]

- **Definition.** Real customers in documentary style, with restrained motion graphics (lower thirds, captions, stat supers, logo cards); borrowed credibility for buyers who must justify spend.
- **Measured from text (captions and metadata).** Thomson Reuters cutdown 38.97 s: silent head 2.9 s, three soundbites of ≈10 / 13 / 8 s, speech 82% of runtime at ≈170 wpm, silent tail 4.2 s, 11 caption cues of 2-4 s [S:Thomson Reuters]. Luminate 96 s: speech from 5.2 s to 90.7 s at ≈160 wpm; captions ≈3.2 s each; silent intro 5.2 s and outro 5.4 s [S:Luminate]. Imperfect Foods 30 s UGC with motion text overlays, A/B-tested first half, adapted to TV [S:Imperfect Foods].
- **Motion rules [inferred from the text].** Lower third masks up in ≈0.3 s, holds ≈3.5 s, exits ≈0.25 s, only on each speaker's first appearance; captions rise in 6-8 f; optional 1.00 → 1.05 push over a bite [S:playbook proposal].
- **Visual.** Live-action documentary shot on location with professional grading ("like a documentary, not a talking-head-behind-a-desk testimonial"); Imperfect Foods is phone-shot UGC with "motion-based text overlays" built as a reusable, localizable template [S:Thomson Reuters] [S:Imperfect Foods]. Graphics stay to lower thirds, captions, one stat super per act and a logo card [inferred].
- **Camera.** The footage's own (handheld or tripod interview, B-roll); the only added move is an optional 1.00 → 1.05 push over a bite [S:playbook proposal, inferred].
- **Transitions.** Hard cuts on sentence ends; B-roll cutaways cover jump cuts inside a bite [inferred]; silent head and tail as the bookends [S:Thomson Reuters, measured from captions].
- **Typography.** Captions in 2-line cues of 2-4 s (Thomson Reuters 11 cues), ≈3.2 s each (Luminate) [S]; lower third "Name | Title, Org" on first appearance only [inferred].
- **Music.** Understated underscore that carries the silent head and tail and swells under the closing line [S:Thomson Reuters, inferred].
- **Duration.** 30-40 s cutdowns (Thomson Reuters 38.97 s, Imperfect Foods 30 s) and 90-100 s full stories (Luminate 96 s) [S].
- **Products.** Any B2B SaaS with referenceable customers.
- **Premium vs amateur [inferred from the sources].** Premium: opens on the outcome ("we're not really missing issues"), lets the slowest, most emotional bite land last, and keeps graphics off faces. Amateur: a talking head behind a desk, scripted lines read by a customer, or stat supers covering the speaker.
- **Avoid.** Synthesising or TTS-ing a real person's words [S:playbook]; graphics that cover faces.
- **Evidence note.** All timings here come from caption tracks and file metadata, not frame-level viewing; treat them as structure, not motion timing.
- **Prompt seed.** `style=H customer story; real interview footage; silent 3 s establishing open with a 1.06× push; soundbites cut on speech, captions 2-line cues every 3 s; lower third (name | title, org) masks up 9 f, holds 3.5 s; one stat super per act; logo card 4 s with no speech.`

### ST-I · Character-Led 2D Brand Explainer [Text; discovered]

- **Definition.** Flat 2D character animation in which product mechanics become in-world game objects (hearts, streaks, notifications) and a mascot carries the personality.
- **Text evidence.** Duolingo's TV spot by Nexus Studios: fast-paced 2D, a character leaping through game levels, app mechanics as game objects, "Free, Fun & Effective" three-word spine, probably :30 [S:Duolingo]. Animade (Duolingo Design Studio) and James Boorman reels: "playful character with functional clarity" [W:showreel]. Conveo is the only hand-drawn SaaS launch among 21 launch films [W:showreel].
- **Motion [inferred].** Squash-and-stretch and overshoot belong to the characters only; UI-derived objects pop with E-SPRING-P; type and logo still follow 0% overshoot.
- **Visual.** Flat 2D characters in a game-world of levels and platforms; app mechanics (hearts, streaks, push notifications) drawn as in-world objects, not device screenshots; one dominant saturated brand hue, flat fills, large corner radii, heavy rounded sans [S:Duolingo] (palette and type from the brand system, [inferred] for this spot).
- **Camera [inferred].** A 2D side-scrolling camera that follows the character from level to level; no 3D camera.
- **Transitions [inferred].** Level-to-level travel as the transition (the character leaps into the next scene); a three-word tagline card at the end.
- **Typography.** A three-word spine ("Free, Fun & Effective") as the end tagline [S:Duolingo]; rounded bold sans [inferred].
- **Music [inferred].** Upbeat, game-like score; SFX for the game objects (heart loss, streak).
- **Duration.** Probably :30 TV with social cut-downs [S:Duolingo, runtime unconfirmed].
- **Not reproducible without character animation** [S:Duolingo]. In a template engine, substitute a mascot shape or orb.
- **Products.** Consumer and prosumer apps with a mascot; education; gamified SaaS.
- **Premium vs amateur [inferred].** Premium: the character's motion has weight (squash, overshoot) while type and UI stay at 0% overshoot, so the two read as separate physics. Amateur: everything bounces, including the logo; stock mascot rigs with no brand shape language.
- **Evidence note.** No frame of this style was measured; every motion number above is [inferred].
- **Prompt seed.** `style=I character-led 2D; flat character with 2-tone shading, one brand green, three-word spine (one word per 2.5 s beat with its proof), product mechanics shown as game objects that pop with one overshoot; type and logo with no overshoot.`

### ST-J · Isometric Feature-Series Explainer [Text; discovered]

- **Definition.** A modular series of single-feature explainers in clean isometric 2D that looks 3D, moving from a wide "noise" overview to one isolated signal, with confident narration.
- **Text evidence.** TradeLens Core: six feature videos of 78-87 s plus a 4:51 overview; "minimalist", "clean grid-based" isometric graphics with "simplified UI dashboards featuring toggle switches"; "clean linear transitions and pulsing spatial alerts"; wide → specific ("zeroes in" on one targeted alert); stock music ("Let Me Know in Time", Tomas Skyldeberg); confident narration [S:TradeLens] (secondary write-ups, medium confidence).
- **Motion [inferred].** Noise grid of 200+ pulsing tiles → push to one tile; everything else dims to 20% and desaturates while the chosen tile turns the accent with a radial pulse ring [S:TradeLens transferable, inferred].
- **Dimensionality.** D1 isometric (cheap 3D look with no 3D risk; see HR-10).
- **Visual.** Minimalist, "clean grid-based" isometric graphics on a neutral ground; "simplified UI dashboards featuring toggle switches"; one alert accent [S:TradeLens] (accent colour [inferred]).
- **Camera [inferred].** Orthographic isometric camera only: pushes from the wide grid to one tile and pull-backs to context, no perspective change, so the isometric drawing never breaks.
- **Transitions.** "Clean linear transitions and pulsing spatial alerts" [S:TradeLens]; wide → specific ("zeroes in") as the structural transition [S:TradeLens]; durations [inferred].
- **Typography [inferred].** Small UI sans inside the dashboards; short feature-name titles; narration carries the copy.
- **Music.** Stock bed ("Let Me Know in Time", Tomas Skyldeberg) under confident narration [S:TradeLens].
- **Duration.** 78-87 s per feature film, plus a 4:51 overview [S:TradeLens]; all beat timings in the source are [inferred] by the researcher (no transcript was reachable).
- **Products.** Logistics, data platforms, B2B infrastructure; any product sold feature by feature.
- **Premium vs amateur [inferred].** Premium: one isometric angle and one light direction across the whole series, and a clear noise → signal move in every film. Amateur: mixing isometric and perspective views, or an isometric grid with no story focus.
- **Avoid [inferred].** Isometric UI so small it cannot be read (apply the ≥2.5% H rule); changing the series template between episodes.
- **Prompt seed.** `style=J isometric series; clean isometric grid of event tiles on a neutral ground with one safety-orange accent; open on 200 tiles pulsing at random opacity 0.3-1, push in to one tile while the rest dim to 20% over 12 f; simplified UI card with toggles rises on a soft shadow; one feature per 80 s film, narration 155 wpm.`

## 11.4 Comparison matrix (the numbers that differ most between styles)

| Style | Canvas | Dimensional level / 3D share | ASL (s) | BPM | Edit driver | Overshoot | 2D blur | Hero type size (@1080p) | Max words | Typical length |
|---|---|---|---|---|---|---|---|---|---|---|
| ST-A1 | Light + aurora | D0 + glass / ≈1% | 2.36 | ≈127 | Speech → eighth-note grid | 0 | None | ≈68-95 px font | 6 | 60-80 s |
| ST-A2 | White | D0 + one D4 beat / 12% | 3.00 | ≈86 | Typing → transients | 0 | None | ≈90 px font (cards) | 5 (cards), 9 typed | 20-45 s |
| ST-A3 | Neutral light/dark | D0 + orb | 3-4 [inferred] | 100-120 [inferred] | Beat / VO [inferred] | 0 | — | ≈112-128 px [E, inferred] | 6 | 39-51 s |
| ST-B | Deep / photographic | D3-D4 / 30-60% [inferred] | 2.5-3.5 [inferred] | 70-100 [inferred] | Music, one reveal | 0 | n/a (3D blurred) | Large, light weight | 6 | 30-90 s |
| ST-C1 | Cream/navy frame + photography | D0 + accents / ≈17% | 1.58 | ≈112 | UI; section-level music | 0 on UI | Whips/scrolls only | ≈71 px cap (sentence); 530 px macro | 7 | 45-60 s |
| ST-C2 | Clean light | D0-D1 | ≈2.5-3.5 per caption [S] | Light bed | VO sentences | 0 | — | Kicker/caption sizes | 6-8 | 45-90 s |
| ST-C3 | Brand fields + UI | D0 | ≈1.0 [S] | Upbeat | Beat [inferred] | — | — | Chapter cards | 3 | 60-90 s |
| ST-D | Deep studio | D2-D4 / 50-90% [inferred] | 2.5-3.5 [inferred] | 70-112 [inferred] | Music + camera beats | 0 | n/a (3D blurred) | As E1 | 6 | 30-60 s |
| ST-E1 | Navy claims / light proof | D0 claims, D2/D4 proof / 51% | 2.49 | 100 | Copy + beat grid (0-2 f early) | 0 | Blur on all moves | 160-355 px cap | 6 | 60-70 s |
| ST-E2 | Black + green aurora | D0 + D1/D2 / ≈9% | 1.77 | ≈112 | Feature / SFX at peak velocity | 0 (3-4 f word tilt) | None (flaw at speed) | 72-180 px em; "So" ≈470 px | 7 | 30-45 s |
| ST-F1 | 5-colour flats + grain | D1 / 0% | 2.1 | 64.6 (129) | Story/VO + downbeats | Objects only (+5°) | None | ≈125 px cap serif | 6 | 30-60 s |
| ST-F2 | Emerald / off-white flips | D0 + accents / ≈34% | 1.85 | 83.4 | Copy | Objects only | Whip last 2 f | 61-118 px cap | 3 | 20-40 s |
| ST-F3 | Footage | D0-D1 | Speech | Bed | Speech | 0 | — | Captions | 2 lines | 30-120 s |
| ST-G | 6-colour chapters | D0-D1 / 0% | 1.63 | 95.7 | Narrative; one synced click | Props ≤25% | Push only | ≈240 px ascender @1920p | 5 | 15-20 s |
| ST-H | Footage | D0 | Speech | Underscore | Speech | 0 | — | Captions, lower thirds | 2 lines | 30-120 s |
| ST-I | Flat characters | D0-D1 | [unknown] | Upbeat | VO / action | Characters only | — | Rounded bold | 3 | ≈30 s |
| ST-J | Isometric neutrals | D1 | [unknown] | Stock bed | VO | 0 | — | UI sans | 6 | 78-87 s |

## 11.5 Style mixing rules

**ST-U2 · One primary style per film. A second style is allowed only as a declared register with its own job and its own world cue.** [U]

| Allowed pair | Primary | Register | How the references separate them | Evidence |
|---|---|---|---|---|
| Editorial frame + UI demo | ST-F (brand sentence) | ST-C (product montage) | Bookend structure; brand frames cream/navy vs product photography; type size 6.6% H vs diegetic UI | [V:15VhHR] |
| Kinetic claims + 3D proof | ST-E1 | ST-D | World colour flip on the cut (navy ↔ lavender-white) | [V:19NRDv] |
| Minimal prompt film + one depth beat | ST-A2 | ST-D / ST-B | One continuous 3.67 s take entered by a match cut, left by a defocus dissolve | [V:1CSXtQ] |
| Calm-tech + one energetic burst | ST-A1 | ST-E (one pill burst as the drop) | Used once, on the music drop | [V:1-6l8S t=7.97-9.55s] |
| Playful collage + UI demo act | ST-G | ST-C | Chapter background colour (cream product chapter, grey map) | [V:126cpH] |
| Monochrome system + 3D accents | ST-F2 | ST-D accents | Each accent is one material, used once | [V:1i2L14] |

**ST-U3 · Pairs that fail [inferred from the measured rules].**
- ST-A (0% overshoot, breathing calm) with ST-G's springs or on-twos UI: contradicts the premium read (2D-U6, 2D-U18).
- ST-E2's sub booms and suck-in cuts with ST-A1's in-world voice demos: the SFX layer masks the proof audio (Part 09 density limits).
- ST-F1's grain and 2.5D with ST-D's photoreal 3D in the same shot: two detail levels (HY-U12).
- ST-B's long holds inside ST-C3's 1 s montage: the hold reads as a stall.

**ST-U4 · A style is a bundle: changing one parameter changes the style.** [U]
- Adding bounce to type turns ST-A into a template; adding motion blur to ST-F1's flat whips turns it toward ST-E1; lengthening ST-G's shots past 2.5 s turns it into an explainer.
- Why: viewers do not read individual parameters; they read the agreement between them (Part 01 consistency system).

## 11.6 Styles by runtime

| Runtime | Works | Struggles | What to keep (measured structures) |
|---|---|---|---|
| **5-6 s** (bumper, logo sting) | ST-E2 (snap-hold-suck + logo), ST-A2 (typed line → lockup), ST-F2 (one shape chain → logo) | ST-B, ST-C2, ST-H | One idea, one motion device, logo still ≥1.5 s [inferred] |
| **10 s** | ST-E2, ST-G, ST-A2, ST-C1 (macro hook → sentence → logo) | ST-B, ST-D, ST-H | Hook ≤2 s, one proof, lockup ≥2 s [inferred] |
| **15 s** | ST-G (15-20 s measured), ST-E2, ST-C1 cut, ST-E1 cut | ST-C2, ST-H | Hook, promise, one UI action, payoff, lockup |
| **30 s** | ST-A2 (30 s measured), ST-F2 (35 s), ST-F1 (36 s), ST-E2, ST-B cut, ST-H cutdown (39 s) | ST-C3 | Drop or reveal at 43-50%; one hero/depth beat 10-15%; breather 10-15% before the CTA (P08 ER-U11) |
| **45 s** | ST-E2 (44 s), ST-A3 (39-51 s), ST-C1, ST-D, ST-B | ST-G | 3 proof blocks; slow hero section in the middle third (ST-E2 tour at 61-75%) |
| **60 s** | ST-C1 (54 s), ST-E1 (67 s), ST-C2, ST-B, ST-D | ST-G, ST-F2 | Claim/proof ×4-5 or 3 customer stories; collection climax |
| **90 s launch film** | ST-A1 (78 s), ST-C2, ST-C3, ST-B, ST-H | ST-G, ST-E2 (fatigue) | 4-5 demo loops on one template; pad breakdown under text; bookend tagline; ≥4 s end card |

The runtime → shot count rule (shots = runtime ÷ the style's ASL; never shorten ASL because the film is short) is in Part 08 ER-04.

## 11.7 Style tokens for the prompt system

Use one block per film. Every value is a number or a named token from Parts 03-09; nothing is an adjective.

```yaml
style_token:            # example: ST-E1, filled from its card
  id: ST-E1
  canvas: { claim: "#06004E", proof: "#F4F4FC", accent: "#F4643C", glow: "coral top-right, violet floor" }
  dimensional_level: { claim: D0, proof: D2-D4, three_d_share: 0.5 }
  ease: { arrive: E-SNAP, travel: E-GLIDE, exit: E-EXIT, whip: E-WHIP }
  overshoot: 0
  motion_blur: { two_d: "off <=5%W/f", three_d: "180deg" }
  cadence: ones
  camera: { hold: "drift 2%W/s", beat_every_s: [0.8, 1.5], orbit: "stepped 10f / 1.25s", roll_deg: 0 }
  transitions: [TR-02 beat cut, TR-18 world flip, TR-10 chevron mask (once), TR-12 push-through]
  type: { family: "geometric grotesk", hero_cap_px_1080: [160, 355], line_cap_pct_h: [4.5, 5.5], max_words: 6, hold_s: [0.6, 1.6] }
  music: { bpm: 100, intro: "sub kick every 1.2 s", groove_in: "before first big graphic move", breakdown: "low-pass under densest UI", cut_offset_frames: [-2, 0] }
  rhythm: { asl_s: 2.5, claim_s: [1, 2], proof_s: [2, 6] }
  runtime_s: 60
  avoid: [overshoot, "text on planes >15deg", "1f dip to black", "bloom > 3% cap"]
```

For each style, fill the same fields from its card in §11.2-11.3. Validation rules a checker can enforce [inferred]:
- `overshoot` must be 0 for type and UI in every style except ST-G and ST-I props.
- `three_d_share` must not exceed the style's budget in §13.2.
- `asl_s` must be within ±25% of the style's measured ASL.
- `max_words` × 0.33 s + 0.4 s ≤ the shortest text hold (reading-time rule [N]).

## 11.8 Universal, style-specific, experimental, avoid, SaaS (style system)

**Universal across every style (ST-U5 to ST-U10)** [U]
- **ST-U5.** 0% overshoot on type, UI chrome, logos and camera (7 of 8 references; the eighth limits bounce to props).
- **ST-U6.** No dead frames except reading holds ≤1 s and the end card (8 of 8).
- **ST-U7.** Colour has fixed meanings. Seven of eight give one accent family the key word, state or "alive" role (kivi's sage benefit phrase, HubSpot's orange data icon, Wix's AI cyan, Bumper's orange benefit word, Lottieicon's neon, NOSTRA's emerald key word, Chowdeck's teal bookends); Solar instead gives a strict five-colour palette fixed roles.
- **ST-U8.** The logo lands flat and frontal and holds **≥1.5 s still (2.2 s premium)**, the system floor (P01 §2.16 #9, P08 DU-U5, P11 G-11). Measured: HubSpot 2.2 s, Wix ≈1.7 s and Bumper ≈4.6 s after the QR lands pass; Chowdeck's 1.4 s and NOSTRA's ≈0.8 s are flagged short [V:126cpH] [V:1i2L14]. kivi holds with a slow push of ≤+12-29% instead of a still [V:1-6l8S]. Solar and Lottieicon have no final lockup, and both teardowns flag it as a flaw.
- **ST-U9.** Real or faithfully rebuilt product truth: real UI states, believable data, no random floating screens (all SaaS references).
- **ST-U10.** Render natively at the delivery frame rate and master to ≈−14 LUFS / −1 dBTP. Three references judder from pulldown (Wix, HubSpot, Solar); two are over-loud (kivi −10.7, NOSTRA −7.9 LUFS with overs) and two quiet (Lottieicon, Solar −16.6 LUFS).

**Style-specific** — the cards themselves (ST-A1 to ST-J).

**Experimental (validate before using as a default)**
- ST-A3, ST-B and ST-D numbers marked [inferred].
- "Generative slot machine" with lengthening holds (9/7/11 f thermal, 21/29/38 f colour) [V:15VhHR].
- Polarity-flip cold open [V:1CSXtQ]; dialect hook [V:126cpH]; copy-framework chapter bar [V:1i2L14].

**Avoid (style system)**
- Mixing more than two styles; mixing within a shot.
- Choosing a style by taste instead of by the product's promise (§11.1).
- Using an inferred style card (B, D, A3) without checking real examples.

**Especially good for SaaS**
- ST-A2 for AI features and integrations; ST-C1 for builders; ST-E1 for platforms; ST-F1 for mechanisms; ST-C2 for consideration; ST-G for consumer acquisition.
- Text-source confirmation: of the 21 launch films on showreel.design (14 tagged Tech & SaaS), 10 are tagged Minimal/Clean and 6 Bold/Vibrant; about 12 of 21 are AI products [W:showreel]; "Introducing X" launch films for AI and dev tools dominate recent uploads on raivcoo, mostly posted on X [W:raivcoo].

## 11.9 Where the references overrule generic advice (styles)

| Generic belief | What the references do | Ruling |
|---|---|---|
| "Cinematic" and "3D" are the premium styles | The two minimal references (one with zero 3D) and the flat 2.5D explainer read as premium as the 3D-heavy one | **References win**: premium comes from bundle consistency, not from dimension |
| A launch film needs a voice-over | 6 of 8 have no narrator (Solar probably has one; NOSTRA is unclear); type, in-world voice or UI carries the story; "Voiceover Heavy" tags only 7 of 243 reels [W:showreel] | **References win** for launch films; VO belongs to ST-C2, ST-F1, ST-H |
| Cut every style to the beat | Only ST-E1 (11/18) and the back halves of ST-A1/A2 are beat-locked; ST-C1, ST-F2, ST-G cut at chance level and still read rhythmic | **References win**: the edit driver is part of the style (Part 08, Part 09) |
| Playful means bouncy | Only one reference bounces, and only its props | **References win** (2D-U6) |
| Short films must cut faster | Chowdeck (18 s) and Wix (54 s) cut at almost the same rate (1.63 vs 1.58 s) | **References win** (Part 08 ER-04) |

---

## Appendix A. Evidence strength and gaps (read before relying on a number)

**Strong (measured in ≥3 references, frame-accurate)**
- 2D ease envelope (snap in, drift, whip out), zero overshoot on type/UI, no dead frames, stagger ladder, shape continuity, light/colour transitions, 3D as a contrast effect, logo landing flat.

**Medium (measured in 1-2 references)**
- On-twos cadence for collage (Chowdeck only); 3D fly-in, orbit-step and push-through numbers (Bumper only); screen-to-world and dolly numbers (HubSpot only); extruded card flips and dome (Lottieicon only); 3D accent verbs (NOSTRA only); inline 3D object in a sentence and anchored 3D object (Wix only); 2.5D recipe (Solar only).
- Several 3D angles (35° Y / 20° X, 35-45° deck, 45-55° floor, 120-180° ring orbit) are marked [inferred] in the teardowns themselves.

**Weak (text or inferred) — the weakest areas of this part**
1. **ST-B Cinematic Product Launch and ST-D 3D Technology Film have no measured reference.** Their cards are assembled from measured components of other films and from text descriptions. Their ASL, BPM, 3D share and durations are [inferred].
2. **ST-A3 (ElevenLabs-like)** motion values are the brief's own inferences; only the brand system, durations and the orb/waveform code are sourced.
3. **ST-C2, ST-C3, ST-F3, ST-H, ST-I, ST-J** rest on Superside and inspiration-site text: structure and durations are sourced, motion timings are not.
4. **Materials and lighting for full 3D** (refraction, glossy objects, studio light) are observed in a few seconds of footage at sub-HD resolution; no reference shows a full lit 3D environment for more than 6.3 s.
5. **Vertical (9:16) styles**: only one measured reference (Chowdeck, captured through an AE screen crop at ≈256×470 px usable).
6. **AI-generated footage rules (§13.9)** combine [P] product facts with inferences; no reference was made with generated video except possibly kivi's plates (style mismatch suggests it, unconfirmed).

**To close the gaps** (from the catalogues' own top picks): frame-measure 2-3 cinematic launch films (Eleven v3 cinematic launch [E], Figma Motion, OpenAI Codex/"Cordex" [W:showreel]), 2-3 3D-first SaaS/hardware films (Microsoft Surface, Codex Micro [W:showreel]; Nintendo/Samsung 3D showcases [W:raivcoo]), and 2-3 vertical SaaS cutdowns.

## Appendix B. Where the references overrule generic advice (all rulings in this part)

| # | Topic | Ruling | Section |
|---|---|---|---|
| B1 | Motion blur on 2D | Off below ≈5% W/f; [N]'s 180° applies above | 12.12 |
| B2 | Springs on text | 0% overshoot, not 2.8% or 16.3% | 12.12 |
| B3 | Anticipation | Narrative cues (dwell, pointing, drift), not squash | 12.12 |
| B4 | 3D as "premium" | 3D is a contrast effect with a budget | 13.15 |
| B5 | Parallax/DOF everywhere | One depth recipe per film; optical depth on one beat | 13.15 |
| B6 | Orbits | Stepped only | 13.15 |
| B7 | AI-generated cinematic shots | Only as defocused plates or locked hero objects | 13.15 |
| B8 | 24 fps "cinematic" | Deliver at the source rate or retime; never duplicate frames | 13.15 |
| B9 | Free 2D/3D mixing | One base level, one level above | 14.8 |
| B10 | Dissolves between dimensions | Every handover is a move | 14.8 |
| B11 | 3D type | All copy 2D | 14.8 |
| B12 | Generated morphs | Swap between stable states | 14.8 |
| B13 | Voice-over for launches | Optional; type and UI carry the story | 11.9 |
| B14 | Beat-cutting every style | The edit driver is part of the style | 11.9 |
| B15 | Shorter film, faster cuts | ASL comes from the style | 11.9 |

---

## Audit (adversarial pass, 2026-10-08)

Every numeric claim in §12, §13, §14 and Phase 11 was spot-checked against the eight per-video teardowns (studies, motion/camera tables, rhythm, sound, rules, verification tables) and against the text briefs. Most values matched. 21 fixes were made:

1. **§0.4 point 4, defaults row 10, 2D-U12, 2D-A5, 3D-U4:** the Lottieicon "strobing" is the teardown's own *inference from frames*, not a measured artefact. Its unblurred 8-10% W/f tour moves 1-2 are not flagged. The ≈5% W/f blur threshold is now tagged [inferred, conservative], and the measured range is stated: ≈4% fine, 8-10% unflagged, 22-27% flagged.
2. **2D-U12 table:** the HubSpot "75 px/f" was presented as a position speed. It is the hook line's *width* shrinking (74 px/f max), so each edge moves ≈37 px/f. Corrected and re-timed to t=1.93-2.10 s.
3. **2D-U3:** whip growth ×1.4-1.9 → ×1.35-1.9 per frame, to match [V:1Hcg3X §6].
4. **2D-U4:** removed the unsupported claim that a 0.1-0.5%/f drift is "below conscious notice". Solar's 0.3-0.5%/f is ≈9-15% of the frame per second, which is visible. It is now split into two speed bands (kivi's breathing drift vs Solar's crane drift), and the perception rationale is tagged [inferred].
5. **2D-U6:** added that Wix's teardown notes an inferred slight overshoot on one inline photo-chip pop, so the "0% on Wix UI" claim is not overstated.
6. **2D-U8:** the [N] group-stagger budget is marked as unverified practitioner guidance (18 f / 600 ms in the source).
7. **2D-X2 vs ST-E1 contradiction:** 2D-X2 said "use ≤3 per film". Bumper's rule 5 says "at least 3 times per film", and it uses exactly 3. Both entries are now aligned, with a cap of ≈3-4 tagged [inferred].
8. **3D-U3:** the ≈10° yaw is tagged [inferred], as in the source. The edge heights stay measured.
9. **ST-A1 camera:** the ≈4% W/f truck peak is marked (computed).
10. **ST-C1 prompt seed:** "suck-out −15 dB" contradicted the measurement. The RMS falls from −15 to −35.5 dB, a drop of ≈20 dB, exactly on the click. The seed also implied the build begins 8 f after the click. In fact the cut comes 8 f after the click and the 12 f build runs from the cut. Both are corrected.
11. **ST-E1 transitions:** the 7 light/dark flips were described as all on hard cuts. In fact 6 are on hard cuts and 1 goes through the chevron wipe at 48.00 s.
12. **ST-E1 motion:** the semantic-animation count is now stated as measured (3, at 7.68, 14.33 and 46.13 s).
13. **ST-F1 music:** "scene changes on downbeats" overstated the sync. The teardown has 5 of 16 cuts on onsets (about chance level), with only the mid act (4 of 5) locked within ≈1 f of an onset. It also says nothing about downbeats. The VO is tagged [inferred].
14. **§11.8 showreel statistic:** the original said "10 of 21 SaaS launch films". Only 14 of the 21 launch films are tagged Tech & SaaS, and the 10 Minimal/Clean and 6 Bold/Vibrant counts are across all 21. Corrected.
15. **ST-F3:** added the missing Camera and Transitions facets (text-sourced vocabulary; numbers tagged [inferred]). Lower-third timing is attributed to the playbook proposal, and caption timings to the caption track.
16. **ST-H:** added Visual, Camera, Transitions, Typography, Duration, a premium-vs-amateur line and an evidence note. These come from [S:Thomson Reuters], [S:Imperfect Foods] and [S:Luminate]. Caption-track timings are labelled as structure, not frame timing.
17. **ST-I:** added Visual, Camera, Transitions, Typography, Music, Duration and premium-vs-amateur, plus an evidence note that every motion value is [inferred].
18. **ST-J:** added Visual, Camera, Transitions, Typography, Music, Duration, premium-vs-amateur and Avoid. The source says all its beat timings are inferred, and the card now says so too.
19. **§12.2 2D-U12 "Why":** tagged [inferred], and it now states that the references tolerate up to ≈10% W/f unblurred.
20. **Defaults row 10:** added the measured "range seen" column values and evidence timestamps.
21. **2D-A5:** added a hard limit of ≈10% W/f, consistent with the unflagged measured moves.

**Checked and confirmed (no change):** kivi ASL/BPM/LUFS/punch/push/transition counts; HubSpot pull-backs (×0.75, ×0.57, ×0.56, ×0.32), dolly ×2.3, particle counts (estimated), 70 ms silence, drop at 43%, −14.2 LUFS; Bumper ASL 2.49, 100.0 BPM, 11/18 cuts 0-2 f early, 51% proof share, slam/orbit/implosion/lockup timings; Wix ASL 1.58, 112 BPM, −15.9 LUFS, deck/carousel/heart timings, "three moments only"; Lottieicon ASL 1.77, zoom ×1.36/f, tour timings, counters, −16.6 LUFS, no lockup; Solar 24→30 pulldown, expo envelope, E-SETTLE fit, wobble, pull-out, −16.6 LUFS; NOSTRA polarity 11/13, ASL 1.85, −7.9 LUFS, arrival and whip ratios, ±5% shape rule; Chowdeck on twos (≈12 unique fps), tossed card, two-stage pull-out, ASL 1.63, 95.7 BPM; text claims for [S:Bolt], [S:Figma], [S:Duolingo], [W:showreel], [W:motion-so] and the [E] orb code.

**Remaining known gaps**
- ST-B (Cinematic Launch) and ST-D (3D Technology Film) still have no frame-measured exemplar. Their ASL, BPM, 3D share and durations are [inferred] composites.
- ST-A3, ST-C2, ST-C3, ST-F3, ST-H, ST-I and ST-J motion timings are inferred or proposal values from text sources. Only their structure and durations are sourced.
- The 2D motion-blur threshold (≈5% W/f) is inferred. The references bracket it only loosely (fine at ≈4%, unflagged at 8-10%, flagged at 22-27%), and no blurred-vs-unblurred A/B test exists.
- 3D angles (tilts of 35° Y / 20° X, deck 35-45°, floor 45-55°, ring orbit 120-180°) and HubSpot's 10° yaw are estimates in the teardowns.
- Vertical (9:16) rules rest on one reference (Chowdeck), measured through an AE screen-capture crop at ≈256×470 px usable.
- Several prompt seeds use inferred values (grain 3%, dither 1-2%, offset card 5%, orb drift in minutes as an exact period) that no reference measured directly.
- AI-footage rules (§13.9) combine [P] product facts with inference; no reference was confirmed as made with generated video.
