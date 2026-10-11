# CRED "CRED Money" reference, 0.000 to 17.000 s (640x360, 24 fps). Working files (scripts, per-frame diff and flow logs, montages, crops, spectrogram) are in /tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/shots-00-17/ (diff.txt, flow.txt/flow.json, m_000-m_009.png, p1/p2.png, crop_*.png, spec.png). Nothing was written to the repo.

Methods:
- Cuts: per-frame mean abs luma diff (MAD) and HSV-histogram Bhattacharyya on all 420 frames at 24 fps.
- Camera: Farneback flow (pyr 0.5, 4 levels, win 21) on 320x180, with a RANSAC similarity fit per frame pair (scale, roll, tx, ty; px are at 640 wide). Where line art or moving layers fooled the global fit, I tracked the paper layer separately with high-pass grain correlation (±30 px search) and phase correlation.
- Palette: k-means (k=6) on 6 frames per shot. Engraving: windowed FFT on 64x64 patches, sub-pixel line tracing, and column peak-finding for pitch and FWHM.
- Lens: fit a circle to the half-luminance edge on 72 rays, then take the radial L* profile.
- Text: white-pixel extents frame by frame. Audio: STFT spectral flux, a 30-150 Hz attack detector, and RMS relative to the film's peak.

Structure: 3 hard cuts (1.750, 3.000, 13.458). There are two long continuous takes: 3.000 to 13.458 (10.46 s) and 13.458 onward, still moving at 17.46. Beats inside the takes are camera and layer events, not cuts.

## Rules
- CUT BUDGET: 3 hard cuts in 17 s (1.750, 3.000, 13.458 s) [Certain, frame diff]. Everything else is camera or layer beats inside 2 continuous takes, the first lasting 10.46 s (3.0-13.458). Average shot 5.7 s; longest take 10.46 s.
- OPENING = SCALE-STEP CUTS that build a pattern from one line [Certain]. Line pitch 32.5 → 21 → 8 px (×0.65, ×0.38 = 9.0% → 5.8% → 2.2% H). Stroke FWHM 4.2 → 2.1 → about 2 px (1.16% → 0.57% → 0.55% H). Line count 3 → 8 → 43. Steps last 1.75 s then 1.25 s. Ink gets LIGHTER as density rises (#29282c → #2b2b2b → #646464) so the overall tone stays even.
- THE BIRTH-OF-A-LINE SHOT: the camera trucks with the pen. The paper moves 0 → 86% W/s (ease-in over about 1.3 s) while the tip eases out to rest at about 56% W on screen [Certain, grain correlation]. After that, one locked-off step (0 camera motion, 11% W/s draw-on) gives contrast.
- GUILLOCHE FIELD NUMBERS [Certain, sub-pixel trace]: horizontal in-phase sinusoids, pitch 2.2% H (H/45), p-p amplitude ≈ 1 pitch, wavelength ≈ 10 pitches (12.5% W), stroke ≈ 0.25 pitch. The pattern flows left at 8.8 → 2 px/frame (expo-out over 1.75 s) over a paper layer drifting at 15% W/s, giving a 2:1 pseudo-parallax. Line ends are ragged, then clipped by a huge circle mask (R ≈ 77-80% W).
- ENGRAVING = UNIFORM LINE SCREEN, NOT CONTOUR HATCHING [Certain, patch FFT orientation spread 11-25°]. All flora share one straight screen angle of about 135° with perpendicular pitch about H/130 at establishing scale (about H/26 when magnified in the loupe). Tone comes from line thickness plus 2-3 posterized fill levels plus a 2 px dark outline. Inks are per-object duotones on cream paper: violet #cea3ee / #b588d6 / #75539b and olive #d8dab1 / #6c7e47 / #495a22.
- LIVE FOOTAGE INSIDE THE PRINT WORLD [Likely]: the animal is real footage, posterized to 3 tones of the scene ink (#c7a0e9 / #a67ec9 / #5b3e90), with no line screen (orientation spread 31-69°). It keeps animating even after the world becomes a printed object and is viewed small in perspective.
- LAYERED ASSEMBLY: 5 cut-out layers enter from 3 frame corners or edges with 0.02-0.30 s stagger (4.75 → 5.40 s). Each covers about 80% of its travel in 6-10 frames, then settles on a 1.2-1.7 s expo tail, while the camera pulls back ×0.80 (-13.9%/s average, peak -25%/s). A 0.33 s near-hold follows before the next actor enters.
- CAMERA CURVES [Certain unless noted]: every big move is asymmetric, with ease-in acceleration of 0.87-1.9 s and a longer expo-out settle of 0.85-1.2+ s.
- Peaks: truck 86% W/s (S1); pull-back -60%/s scale with +61°/s roll (S6, ±30% [Likely]); push +8.3%/frame scale with -128% W/s pan (S9).
- Holds still move: S7 drifts 0.45% W/s; S8 is a linear +3.7%/s push. Fully static only for frames 0-7.
- WORLD-INTO-OBJECT REVEAL (9.5-11.125 s): pull-back ×0.57 + roll about +30° + 3D tilt (estimated 40-55°) shows the scene printed on a document lying on a dark table.
- Simultaneously: hue-rotate the cool inks -85° in 0.6 s (268° → 184°), saturate the greens (S 84 → 122), fade in the darkness over 0.7 s (V<50 share 0 → 31%), and cross-dissolve the object's security details (thread, numerals, rotunda, deckle border).
- Motion blur at peak speed (sharpness drops about 50%).
- LOUPE / LENS SPEC [Certain]: screen-locked circle. Centre (51% W, 53% H), R = 46.3% W (82% H), so only the left and right edges and the corners go black.
- Feather from 0.85 R to 1.08 R: L* 75 → 62 (0.9 R) → 29 (R) → 3.7 (1.1 R).
- Outside near-black #060606, with a faint grey rim at R. NO barrel distortion (straight band edges ±1 px).
- The wide variant (S6-S7) is darker and wider-feathered with a defocused bright barrel reflection ring [Likely].
- TEXT IS DIEGETIC AND RARE: one line in 17 s, 'TAKE A GOOD LOOK AT YOUR MONEY', all caps, geometric sans, white, tracking about 0.3 em, cap height 2.8% H, inside an 8.9% H iridescent band centred at 49% H.
- Staging: first seen tiny and diagonal on the object (about 1% H cap, 10-13.4 s), then cut to frontal macro for 2.0 s of reading, then the camera pushes through it (cap 2.8% → 8.6% H in 2.0 s), exiting left through the lens edge over about 1.5 s.
- No per-letter animation. No lowercase serif headline in 0-17 s.
- HOLOGRAPHIC FOIL RECIPE [Certain]: a translucent band (substrate visible) with an 11-12 stop pearl gradient: slate #8796b5, sea glass #99baba, white #e6e6e6, blush #f5d9c8, apricot #ffd9a8, cream #e2dab8, mint #c7e3d4, periwinkle #c1c6f3, lavender #a49cd7, steel #85a1c9. Overprint wavy guilloche lines and add one circular dotted emblem. A specular glint sweeps left to right at about 50% W/s [Likely].
- PALETTE ARC [Certain, k-means]: neutral grey paper and black ink (0-3 s) → white paper with grey ink (3-4 s) → cream-to-mint wash #dbdcb6 → #b3cc96 with violet and olive inks (4-9.5 s) → mint duotone #60cb93 / #98d6a3 on dark slate #0e1816 (10.2 s+).
- One colour family per world. The palette only changes through a camera-driven reveal or a wipe, never on a cut.
- SOUND DESIGN [Certain timings, STFT]:
- 0.55 s of silence, then Foley first: a nib scratch with centroid about 5.5 kHz while lines draw.
- The first cut lands on a low hit (1.753 s).
- A 0.2 s total dropout (4.05-4.25 s, -75 to -80 dB) exactly under the colour wipe.
- A low swell under the layer assembly peaks at 5.5 s, then bright ambience or birdsong.
- A soft pulse from about 7.0 s; the music beat grid is about 125 BPM (0.479 s) from 10.733 s.
- Later edits LEAD the beat: the cut at 13.458 is 0.15 s early and the push at 15.458 is 0.07 s early. The velocity peak (16.33 s) falls between beats.
- MOTION DENSITY: per-frame MAD sits around 0.01-0.09 during moves. Near-still runs (MAD < 0.005) occur only at 0-0.33 s and 11.1-13.4 s, and in the latter the subject still animates. The longest near-still run is 2.33 s, so a premium hold of this style is at most about 2.3 s, with drift.

## Shots

### 0–1.75 s
- **subject**: Macro of blank grey paper. From 0.375 s, three thick ink lines are drawn on from the left edge like an engraver's burin or pen nib: gentle low-frequency sine curves, with the middle one longest. There is no object yet. This is the 'birth of a line' that later becomes the guilloche field. Frames 0-7 (0-0.29 s) are pixel-identical: a static blank paper open.
- **render_look**: Neutral grey paper with coarse low-frequency fibre mottling. HP grain std about 1 grey level at sigma 2, so the texture is mostly mottling, not fine noise.
- Vignette: centre L* 87.5, corners L* 76.0, a drop of 11.6 L* [Certain, measured with 12 px Gaussian-blurred L*].
- Ink: near-black #29282c (darkest 1%) with soft, slightly bled edges.
- Strokes: 3 lines, pitch 32.5 px = 9.0% H, stroke FWHM 4.2 px = 1.16% H [Certain, column peak-finding f40].
- Wave shape: wavelength about 372 px = 58% W, p-p amplitude about 30 px = 8% H [Likely, line trace].
- Lines are free curves, not contour-following. Monochrome: no duotone yet, no foil.
- **camera**: Fast lateral truck right (content moves left), ease-in, no zoom, no roll.
- Paper-grain correlation shift per frame [Certain; best corr 0.69-0.97 vs 0.02-0.11 at zero shift]: 0 px until 0.33 s, -3.9 at 0.375, -7.7 at 0.5, -14.3 at 0.75, -19.3 at 1.0, -22.3 at 1.25, -23.5 at 1.5, -23.1 px at 1.63 s.
- So 0 to about 555 px/s = 0 to 86% W/s, roughly quadratic ease-in, reaching cruise at about 1.3 s. Vertical drift is about 0.
- The pen tip's screen x eases out while the camera catches up: 6% W at 0.42 s, 41% W at 1.0 s, 56% W at 1.67 s. Tip speed relative to the paper therefore rises from about 13 to 25 px/frame.
- The global Farneback fit missed this move (the lines dominate it). Grain correlation is the reliable measure.
- **transition_in**: Film opens directly on paper (no fade from black): 8 frames (0.33 s) of a fully static frame, then the first stroke enters from the left at 0.375 s.
- **transition_out**: Hard cut at 1.750 s (f41 to f42, MAD 0.029, hist 0.193). It is a scale-step cut to a finer, wider drawing: pitch 32.5 to 21 px, stroke 4.2 to 2.1 px, 3 to 8 lines, new smoother paper. It is not a zoom, because pitch and stroke shrink by different ratios (0.65 vs 0.5) [Certain]. The cut lands exactly on a low-frequency audio attack at 1.753 s [Certain].
- **typography**: None.
- **rebuild_in_code**: Remotion, 1920x1080 (multiply all 360p px by 3).
- Paper: AbsoluteFill with an SVG feTurbulence (baseFrequency about 0.012 for mottling plus about 0.6 at low opacity for grain), multiplied over #d0d0d0, plus a radial-gradient vignette dropping about 11 L* to the corners.
- Ink: our own ORIGINAL first strokes, e.g. the first three lines of the guilloche that will later fill our card face, as 3 SVG paths. Stroke #29282c, width 1.16% H (12.5 px at 1080p), a feGaussianBlur 0.6 px plus a light feDisplacementMap for ink bleed.
- Draw-on: strokeDasharray = path length, strokeDashoffset driven by penX(t).
- Camera: wrap paper and ink in a world <div> with translateX(-pan(t)). Pan velocity ramps 0 to 86% W/s over 0.33-1.3 s (easeInQuad on velocity, integrate per frame), so the tip settles at about 56% W on screen with expo-out.
- Hold frames 0-7 completely static. Cut at 1.75 s on a low thump.
- **layers**: Back to front:
1. Paper texture and grain (moves with the camera, -23 px/frame at cruise).
2. Ink strokes (attached to the paper; their tips advance faster than the paper scrolls).
3. Screen-locked vignette.
No parallax between paper and ink.
- **palette_hex**: ['#d8d8d8', '#d0d0d0', '#c8c8c8', '#bfbfbf', '#3a393b', '#29282c']
- **foil_and_effects**: No foil. Ink bleed and soft edges, paper mottling, an 11.6 L* vignette.
- **sound_cues**: Total silence 0-0.55 s (below -60 dB relative). Low-band attacks at 0.551 and 0.755 s start the nib-scratch Foley: broadband noise, spectral centroid about 5.4-5.7 kHz, RMS about -34 dB relative to the film's peak. A low hit at 1.753 s marks the cut [Certain, STFT].
- **ui_elements**: None.

### 1.75–3 s
- **subject**: A second, finer drawing step: about 8 thinner parallel wavy lines (7 long ones in the middle band plus short starts lower left), all drawn from the left edge and slowly extending right. A camera-locked study of the lines growing.
- **render_look**: Smoother grey paper with a soft radial vignette: centre L* 82.7, corners L* 76.8, a drop of 6.0 L*. Grain HP std 0.59.
- Ink: #2b2b2b.
- Lines: pitch 21 px = 5.8% H (H/17), FWHM 2.1 px = 0.57% H [Certain]. FFT gives 21.3 px, line angle 0 deg, coherence 0.96.
- Wave shape: wavelength about 228 px = 36% W, p-p about 19 px = 5.3% H [Likely]. Straight parallel sinusoids, not contour-following.
- Fully desaturated: the S-V histogram is identical frame to frame (Bhattacharyya 0.000), i.e. pure grey.
- **camera**: Locked off. Paper-grain shift is 0.0 ± 0.1 px/frame over every sampled frame pair (best correlation at zero shift, 0.65-0.81) [Certain]. Farneback: scale 1.0000, roll 0.
- The only motion is draw-on: the rightmost line tip moves from x=350 to x=429 px over 1.13 s, linear at 0.8 px/frame = 70 px/s = 11% W/s [Certain, dark-pixel extent].
- MAD per frame is 0.015-0.021.
- **transition_in**: Hard cut (scale step) from S1 at 1.750 s, on a low audio hit.
- **transition_out**: Hard cut at 3.000 s (f71 to f72, MAD 0.119, the largest diff in 0-13 s) [Certain]. Third scale step: pitch 21 to 8 px, 8 to 43 lines, paper switches to a brighter, whiter, rougher stock. No audio hit at this cut [Likely].
- **typography**: None.
- **rebuild_in_code**: Separate Remotion <Sequence> (hard cut).
- 8 SVG sine paths: y = y0 + i*5.8% H + 2.65% H·sin(2πx/(36% W)). Stroke 0.57% H, #2b2b2b.
- strokeDashoffset driven linearly (11% W/s reveal) with staggered start offsets so the line ends are ragged.
- Static camera. Paper: same turbulence but a lower-contrast mottle and a 6 L* vignette.
- Use ORIGINAL curve families (e.g. the wave profile of our own card's guilloche), not CRED's.
- **layers**: Back to front: paper (static), ink lines (draw-on), vignette.
- **palette_hex**: ['#d9d9d9', '#d1d1d1', '#c9c9c9', '#c0c0c0', '#808080', '#2b2b2b']
- **foil_and_effects**: None.
- **sound_cues**: Continuous nib-scratch texture, RMS about -37 dB relative, centroid about 5.3-5.7 kHz. No accents.
- **ui_elements**: None.

### 3–4.75 s
- **subject**: A full guilloche wave field: about 43 fine horizontal sinusoidal lines fill the left two-thirds of the frame. They end in a ragged right edge (line lengths vary like a torn fringe). The pattern flows leftward.
- At 4.00 s a pale cream-to-mint colour wash wipes in over the right side from the top, with a curved front. Its boundary becomes a huge circle that clips the line field into a round 'watermark' disc, so the ragged ends get cut off by the circle edge.
- **render_look**: Bright white paper #e7e7e7 (53% of pixels) with visible fibre texture.
- Ink is deliberately lighter as the density rises: darkest 1% is #646464 (vs #2b2b2b in S2).
- Lines [Certain]: pitch 8.0 px = 2.2% H (H/45), FWHM about 2 px = 0.55% H. Sub-pixel trace: wavelength 80 px = 12.5% W (about 10 pitches), p-p amplitude 7.8 px, i.e. amplitude ≈ 1 pitch.
- All lines are in phase: straight parallel sinusoids, not contour-following (FFT coherence 0.97-0.98).
- Circle mask: radius about 490-512 px = 136-142% H (77-80% W), centre off-frame lower left (about -150, 350) [Likely, boundary fit error 0.6-0.8 px at 4.25-4.75 s].
- Wash colours: #dbdcb6 (warm cream, near the circle) to #c9d7ab / #cfdabc (mint) on the right.
- **camera**: Two layers move at different rates (high-pass correlation per frame) [Certain]:
- The paper grain drifts left at a constant 4 px/frame = 96 px/s = 15% W/s from 3.0 to 4.0 s, then 2-4 px/frame.
- The wave pattern flows left faster and decelerates: 8.8 px/frame at 3.0, 7.5 at 3.46, 5 at 4.0, 3 at 4.5, 2 at 4.75 (expo-out). Because the lines are periodic, this reads as the wave phase travelling relative to the paper, about 2.7 wave-cycles/s at the start [Likely].
- Zoom: line pitch 8.06 to 7.84 px over 1.75 s, so only a slight pull-back (about -2%/s) [Likely]. Farneback's +1%/frame 'zoom' in this window is an artefact of the travelling wave.
- No roll.
- The rightmost ink edge recedes from 427 to 395 px (3.0-3.83 s): lines still grow right at about 2.7 px/frame relative to the paper.
- **transition_in**: Hard cut (third scale step) at 3.000 s.
- **transition_out**: No cut. Colour-wash wipe [Certain, saturation mask]: 4.00 to 4.25 s (6 frames) the coloured area sweeps top to bottom with a curved front (coloured share 0 → 34% → 55% by 4.71). Saturation keeps ramping (mean S 25 → 49) until about 4.7 s. Then the first flora layer (branch) enters from the bottom-right corner at 4.75 s inside the same continuous take.
- **typography**: None.
- **rebuild_in_code**: Generate the field procedurally in SVG (or a fragment shader):
- 45 paths y_i(x) = y0 + i·p + (p/2)·sin(2π·x/(10p) + φ(t)), with p = 2.2% H (24 px at 1080p). Stroke 0.55% H, colour #646464.
- Per-line end x = random 45-70% W, growing slowly with dashoffset.
- φ(t) advances so the pattern flows left at 8.8 → 2 px/frame (360p; ×3 at 1080p) on an expo-out curve over 1.75 s.
- Separate paper layer translating at -15% W/s.
- At 4.0 s: wrap the field in clipPath circle(r ≈ 78% W at about (-23% W, 97% H)). Add a wash <div> (linear-gradient #dbdcb6 → #c9d7ab → #b3cc96) revealed by an animated mask-image linear-gradient sweeping top to bottom in 6 frames (40-60 px feather), then animate CSS saturate 0.5 → 1 over 0.5 s.
- Mute all audio 4.05-4.25 s.
- Original twist for our film: the disc can become the rosette guilloche on our card.
- **layers**: Back to front:
1. Paper (drifts -15% W/s).
2. Colour wash (enters 4.0 s, sits outside the circle).
3. Wave-line field (flows faster than the paper; clipped to the circle after 4.0 s).
There is relative motion between paper and lines: a pseudo-parallax of about 2:1.
- **palette_hex**: ['#e7e7e7', '#dadad8', '#cbcbcb', '#bcbcbc', '#646464', '#dbdcb6', '#d7dab7', '#c9d5ab']
- **foil_and_effects**: None. The colour arrives as a flat wash with paper texture showing through (multiply).
- **sound_cues**: Scratch texture continues, decaying (-39 to -42 dB relative) until 4.0 s. A hard audio drop to near-silence 4.05-4.25 s (-75 to -80 dB relative) lines up exactly with the colour wipe [Certain]. A low attack at 4.185 s, then a low swell starts (centroid falls to about 640 Hz at 4.5-5.0 s).
- **ui_elements**: None.

### 4.75–7 s
- **subject**: A botanical world assembles over the wash and wave-disc. A thick engraved olive leaf or branch sweeps in from the bottom right. Violet flower clusters fly in from the bottom-left and top-right corners. A thin violet twig (a perch) slides in from the right, and more violet blooms enter at the bottom right. Everything settles into a composed vignette, then holds for about 0.33 s.
- **render_look**: Duotone engraving per element, all on paper [Certain, patch FFT + crops]:
- Flowers: violet ink, light #cea3ee, mid #b588d6, dark #75539b, with a 2 px darker outline.
- Branch: olive ink #495a22 / #6c7e47 on pale cream #d8dab1 highlights.
- Hatching: one uniform straight line screen at about 135° (diagonal) across ALL flora. Perpendicular pitch about 2.7-3.1 px = 0.75-0.85% H (about H/130); orientation spread 11-25°, so the lines do NOT follow the contour.
- Tone comes from line thickness plus 2-3-level posterized fills (darker olive patches for shadow).
- Background: wave-line disc (radius about 420 px ≈ 66% W by 6.25 s) and the cream-to-mint wash (#d8dab1 at the disc edge → #b3cc96 at the right).
- Frame-edge vignette about 10 L* (centre 86.4 vs corners 76.4).
- **camera**: Continuous pull-back (zoom out), expo-out, from Farneback with inliers 0.5-1.0 [Likely]:
- Scale per frame 0.988 at 5.29-5.46 s (≈ -25%/s peak), 0.992 at 5.75, 0.996 at 6.2, 0.9988 at 6.6, 0.9993 by 6.7.
- Integrated 5.25-6.70: ×0.804 (-13.9%/s average), roll +1.3° total, drift up 12 px (3% H), x drift -9 px.
- 6.67-7.0 s: near-still (MAD 0.013-0.014), only a -1.7%/s slow pull continues.

Layer motions (colour-mask centroids) [Certain]:
- Branch: enters 4.75 at (622,347). 6 frames later (5.0) it is at (514,271), 6.6% of frame. It keeps sliding left (514 → 379 px) on a 1.6 s expo tail and settles about 6.6 s.
- Left flower cluster: enters 5.08 at (13,324), reaches (95,222) by 5.42 (8 frames), then settles at (125,186) by 6.6.
- Top-right flower: enters from the top at 5.0, y 9 → 173 by 5.42.
- Twig: enters from the right at about 5.38, settles about 5.9.
- Entrance stagger: 0.25, 0.08, 0.30 and 0.02 s.
- **transition_in**: Continuous: the first layer (branch) breaks in from the corner at 4.75 s while the colour saturation is still ramping.
- **transition_out**: Continuous: after a 0.33 s near-hold (6.67-7.0 s) the hummingbird enters from the right edge at about 7.04 s.
- **typography**: None.
- **rebuild_in_code**: Use ORIGINAL subjects, e.g. a marigold or lotus sprig and leaves (or other motifs relevant to our card story).
- Source each from our own drawing, 3D model or generated photo with alpha. Run it through a WebGL 'line-screen engraving' fragment shader in @remotion/three or a <canvas> pass:
  - L = luminance
  - d = fract(dot(uv·res, vec2(cos135°, sin135°)) / pitch), pitch = H/130 (8 px at 1080p)
  - ink = smoothstep(L - 0.08, L + 0.08, abs(d - 0.5)·2)
  - posterize L to 3 levels for flat shadow patches
  - mix(paperColor, inkColor, ink) per element (violet pair #cea3ee / #75539b, olive pair #d8dab1 / #495a22)
  - add a 2 px outline from an alpha-edge dilation
- Export each as a cut-out layer.
- Motion: translate each layer from its off-screen corner using interpolate with Easing.bezier(0.16, 1, 0.3, 1) over 1.6-1.8 s, so 80% of the travel happens in the first 6-8 frames. Start times 4.75 / 5.00 / 5.08 / 5.38 / 5.40 s.
- Wrap everything in a camera <div>: scale 1 → 0.80 from 5.25 to 6.7 s (expo-out), rotate +1.3°.
- **layers**: Back to front:
1. Paper + colour wash.
2. Wave-line disc.
3. Big leaf/branch.
4. Left flower cluster and top-right flower.
5. Violet twig.
6. Bottom-right flowers.

All layers ride the same camera pull-back; their own entrance motions overlay it. There is no measured depth parallax once settled [Likely].
- **palette_hex**: ['#d1d7af', '#e2e1e2', '#b187d2', '#adb98d', '#909c70', '#6c7e47', '#cea3ee', '#75539b', '#495a22', '#b3cc96']
- **foil_and_effects**: None. Paper texture shows through all inks (multiply look).
- **sound_cues**: Low swell or whoosh under the fly-ins: RMS rises from -44 dB (4.5 s) to a peak of about -19 dB relative at 5.5 s, centroid 640-690 Hz at 4.5-5.0 s. Then brighter ambience or birdsong-like high band: centroid 3.3-4.6 kHz at 5.5-7 s.
- **ui_elements**: None.

### 7–9.5 s
- **subject**: A hummingbird flies in from the right edge (7.04 s), lands on the violet twig at about 7.5 s, and keeps beating its wings and shifting posture among the engraved flowers.
- It is real live-action footage converted into the print look, not an illustration [Likely: natural wing blur, feather texture, continuous organic motion].
- The visible wing position flips about every 2 frames, so the flap reads at about 12 Hz. The footage is probably slowed high-speed footage [Guessing].
- **render_look**: The bird is posterized to 3 violet tones: light #c7a0e9, mid #a67ec9, dark #5b3e90 / #745da6.
- The dark tone breaks into ragged flecks that follow the feather texture. There is NO regular line screen on the bird: FFT orientation spread 31-69°, coherence 0.40 vs 0.5-0.57 on the engraved flora [Certain].
- So it is 'threshold or posterize footage + duotone', which sits stylistically between photo and engraving.
- Flora as in S4 (135° hatching, H/130 pitch).
- **camera**: Slow pull-back, then an ease-in acceleration that turns into S6 (Farneback, inliers 0.7-0.87) [Likely]:
- 6.7-8.2 s: scale 0.9993-0.9995/frame ≈ -1.5%/s, no pan, roll about 0.
- 8.2-9.5 s: accelerating. Scale per frame 0.9989 at 8.25, 0.996 at 8.9, 0.993 at 9.25, 0.990 at 9.5. Roll grows +0.02 → +0.31°/frame. Content drifts up and left (ty -0.3 → -2.4 px/frame).
- Integrated 8.2-9.5: ×0.889, roll +2.9°, pan -4% W, -9% H.
- Easing: ease-in (accelerate).
- **transition_in**: Continuous: the bird enters from frame right at 7.04 s (a low-band audio hit at 7.001 s) after a 0.33 s held composition.
- **transition_out**: Continuous, accelerating pull-back with growing roll leads straight into the S6 reveal. No cut.
- **typography**: None.
- **rebuild_in_code**: Use an ORIGINAL animated subject: a clip with alpha (our own stock licence, an AI-generated clip with alpha via the AI-plate route, or a rigged 3D animal or object rendered with @remotion/three). For our card film this could be e.g. a paper plane or a bird of our choosing that ties to 'redeem on flights'.
- Play it with <OffthreadVideo> (transparent WebM/ProRes 4444).
- Pass it through a 3-level posterize + gradient-map shader (#c7a0e9 / #a67ec9 / #5b3e90), adding slight threshold noise for flecks.
- Composite it on the twig layer. Animate a fly-in from x = 110% W with expo-out over about 0.45 s, landing at 7.5 s.
- Camera: scale(t) = exp(∫ v), with v = -1.5%/s until 8.2 s, then easeInCubic to -1%/frame at 9.5 s. Add rotate ramping to +0.3°/frame.
- **layers**: Back to front: paper + wash, wave disc, branch, flowers, twig, bird footage (top). The bird is the only layer with internal animation. All layers share the camera.
- **palette_hex**: ['#b291d1', '#cdd4ac', '#e4e3e4', '#a2af83', '#778952', '#745da6', '#c7a0e9', '#5b3e90']
- **foil_and_effects**: None.
- **sound_cues**: Low-band attacks at 7.001 (bird entrance), 7.692, 8.324, 8.812, 9.282 and 9.776 s: a soft pulse of about 0.48-0.5 s intervals begins. Spectral-flux onsets at 7.25 and 7.71 s around the landing. A descending chirp near 3.1 kHz about 7.8 s (spectrogram). Centroid about 3.0-3.5 kHz, RMS -31 to -35 dB relative.
- **ui_elements**: None.

### 9.5–11.125 s
- **subject**: Reveal transition. The camera pulls back fast and rolls, revealing that the whole bird-and-flora world is printed on a banknote-like security document lying on a dark table, seen through a loupe.
- As it shrinks, the world hue-rotates from violet to blue to cyan and the greens saturate to mint.
- A large round white disc with a guilloche-mesh rosette, a dark ring and a pale-green centre slides in from the left as a foreground element (reads as a coin or loupe glass resting on the note) [Guessing on identity].
- A classical rotunda engraving cross-dissolves in at the lower right.
- An iridescent security thread printed with text appears diagonally.
- The note's white deckled border, a column of rotated outline numerals, and a dark tabletop appear.
- The bird keeps moving throughout.
- **render_look**: Measured on blue-violet pixels [Certain]: hue rotation 268° (9.0-9.5 s) → 232° (9.625) → 210° (9.875) → 194° (10.0) → 184° (10.125). That is about -85° in 0.6 s.
- Green saturation rises from 84 to 122 (OpenCV S) and the greens move from olive #8fa16c to mint #4e906a / #63c485.
- Darkness fades in 10.2-10.9 s: frame share with V<50 goes 0% → 31%, mean V 204 → 135 (lens rim and dark slate table #0e1816 / #15231f).
- Sharpness (Laplacian variance in the centre crop) drops from about 3000 to about 1450 at 9.83 s (motion blur at peak speed), then to about 300-450 once the note is small, as the fine engraving goes sub-pixel and soft [Certain].
- Note-face engraving: building pitch 7.8 px = 2.2% H at this distance.
- **camera**: Pull-back + roll + 3D tilt. Farneback similarity fit, inliers only 0.2-0.5 at the peak, so treat values as ±30% [Likely]:
- Peak at 10.08 s: scale 0.962/frame (≈ -60%/s), roll +2.55°/frame (≈ +61°/s), translation (-12, -13) px/frame.
- Integrated 9.5-10.25: ×0.667, roll +19.8°, pan -18% W, -33% H.
- Integrated 10.25-11.125: ×0.858, roll +10.2°, pan -9% W, -14% H.
- Whole move 9.5-11.125: ×0.57, roll ≈ +30°, pan -27% W, -47% H.
- Easing: ease-in from 8.2 s to a peak at 10.08 s, then expo-out. Velocity halves by about 10.4 s and is almost nil by 11.1 s.
- Perspective: the note ends up seen obliquely. Its 90° corner images at about 116°, implying a camera tilt of very roughly 40-55° from face-on [Guessing].
- **transition_in**: Continuous from S5 (the pull-back simply keeps accelerating).
- **transition_out**: Continuous: decelerates into the S7 hold at about 11.125 s, when per-frame MAD falls below 0.005.
- **typography**: 'TAKE A GOOD LOOK AT YOUR MONEY': all caps, geometric sans, white, printed along the iridescent thread, running diagonally up-right at about 55-60° on the note.
- Partial at 9.96 s ('...GOOD L'), mostly visible by 10.25 s, complete by about 10.33 s. It reveals because the thread scrolls into frame with the camera, not by type animation.
- Cap height about 1% H, so it is tiny and only just legible.
- Rotated outline numerals sit at the note's right edge, about 4-5% H tall. The digits are unclear at 360p, so they are not transcribed.
- **rebuild_in_code**: Render the S4/S5 world as a nested composition. Place it as the face of an ORIGINAL printed object: for our film, the card face itself or a reward voucher, not a banknote.
- CSS 3D: parent perspective 1400px. Child transform: translate → rotateZ(0 → 30°) → rotateX(0 → ~45°) → scale(1 → 0.57), with easeInCubic to 10.08 s and Easing.bezier(0.16, 1, 0.3, 1) after.
- Or in @remotion/three: a PlaneGeometry with the world as a texture, camera dolly-out + roll.
- Add a 2-3% white deckled border (SVG turbulence-displaced rect) and a mint edge glow (box-shadow 0 0 12px #63c485).
- filter: hue-rotate(0 → -85deg) on the cool layers over 9.5-10.125 s; saturate 1 → 1.4 on the greens.
- Fade in the dark backdrop #0e1816 and the loupe vignette over 10.2-10.9 s.
- Wrap the move in @remotion/motion-blur <CameraMotionBlur shutterAngle={180} samples={8}> from 9.6 to 10.4 s.
- Cross-dissolve the object's own security elements (our rosette, the iridescent strip) in over 9.6-10.2 s.
- **layers**: Back to front:
1. Dark tabletop #0e1816.
2. The printed object (note) plane carrying the paper, wave disc, flora, bird footage (still animating), rotunda engraving, numerals and iridescent thread.
3. Foreground round guilloche disc (enters from the left, overlaps the note's top-left) [Likely: a separate foreground layer].
4. Screen-locked loupe vignette with a defocused rim.
- **palette_hex**: ['#a4ce9d', '#dae2db', '#63c485', '#15231f', '#9ea1c0', '#648a69', '#82babf', '#0e1816']
- **foil_and_effects**: Holographic iridescent security thread: a pearl gradient of cyan, pink, peach and lavender with fine wavy lines. White deckled paper border with a mint edge glow. Motion blur at peak speed. A dark loupe vignette fades in.
- **sound_cues**: Centroid drops from about 2.7 kHz (9.5 s) to about 1.45 kHz (10.0 s) as the music body takes over; RMS about -29 dB relative at 10.0 s. Spectral onsets at 10.497 and 10.747 s; the low-band beat grid starts at 10.733 s.
- **ui_elements**: None (the thread is diegetic print, not UI).

### 11.125–13.458 s
- **subject**: A hold on the security note in perspective on a dark surface, viewed through a loupe. Visible elements:
- the corner with its white deckled border;
- the mint-green rotunda engraving;
- the cyan bird still animating on its branch (top centre);
- hibiscus-like blooms;
- the diagonal iridescent thread with 'TAKE A GOOD LOOK AT YOUR MONEY';
- the rotated numerals;
- the foreground round guilloche disc at the top left.
- **render_look**: Mint duotone on a dark slate ground: #60cb93 / #98d6a3 / #4da579 on #0e1816 / #2c433c.
- Engraving pitch on the building is 7.8 px = 2.2% H. Trees are coarser (about 13 px clusters).
- The note's far edge is slightly soft, a shallow-DOF feel [Likely].
- Loupe vignette: inner bright disc centred about (277-283, 97-110) px ≈ (44% W, 29% H), R about 229-265 px = 36-41% W [Likely; circle-fit residual 19 px because the dark table confounds the edge].
- L* inside about 74-81 with a slightly brighter rim at 0.8 R (L* 80-81). Falls to about 41-46 at R, about 27 at 1.1 R, 6-11 at 1.3-1.4 R. Outside L* about 12-14.
- A blurred lighter barrel-reflection band shows bottom-left and right.
- No measurable barrel distortion.
- **camera**: Near-still hold of 2.33 s with micro-drift (Farneback, inliers 0.98-1.0) [Certain]:
- tx -0.12, ty +0.11 px/frame ≈ (-2.9, +2.6) px/s = 0.45% W/s diagonal drift.
- Scale +0.1%/s total over the hold, roll +0.2°/s. Linear.
- MAD 0.0035-0.006 per frame, mostly the bird animating.
- **transition_in**: Continuous: the expo-out settle of the S6 pull-back.
- **transition_out**: Hard cut at 13.458 s (f322 to f323, MAD 0.225, the largest in the segment, Farneback inlier ratio 0.10) [Certain]. The cut is to a macro view inside the lens, with the band re-staged horizontally (a cheat cut). It lands about 0.15 s BEFORE the 13.609 s beat, not on it [Certain, measured].
- **typography**: The same diagonal thread text, 'TAKE A GOOD LOOK AT YOUR MONEY', white geometric sans caps. Cap height about 1% H, running from about (28% W, 75% H) to about (65% W, 15% H). It does not animate; it rides the note.
- **rebuild_in_code**: Keep the S6 3D plane static at its end transform. Add a sine drift of about 0.45% W/s and a +0.1%/s push so the hold never freezes, as our pro-film rules require.
- Keep the subject footage playing.
- Loupe: a screen-locked overlay. radial-gradient(circle at 44% 29%, transparent 0 78%, rgba(255,255,255,0.08) 80%, rgba(5,9,8,0.55) 100%, #0b1110 120%) plus a 40 px blurred ring highlight (border 3% W, rgba(180,220,200,0.18), filter blur 18px) for the barrel reflection.
- Use our own printed object (card face or voucher), our own rosette, and our own line on the strip, e.g. a factual card line such as '5% REWARDS ON ONLINE SHOPPING'.
- **layers**: Back to front: dark table, printed object plane (with live footage inside), foreground round disc, loupe vignette and rim. No parallax beyond the slight drift.
- **palette_hex**: ['#0e1816', '#60cb93', '#98d6a3', '#dbe5e0', '#2c433c', '#4da579', '#51d293', '#8ed788']
- **foil_and_effects**: Iridescent thread with a pearl gradient. Mint edge glow on the note. Dark loupe vignette with a soft bright rim.
- **sound_cues**: Steady low-band beat: 10.733, 11.209, 11.691, 12.173, (12.527), 12.649 and 13.108 s. Interval about 0.479 s ≈ 125 BPM [Likely]. RMS -28 to -31 dB relative, rising to -19 dB at 13.0 s just before the cut.
- **ui_elements**: None.

### 13.458–15.458 s
- **subject**: Macro inside the loupe. A frontal close-up of the note face fills the lens circle: the rotunda engraving on the left, a branch running diagonally, a hibiscus-like bloom at the right. A horizontal iridescent band crosses the whole lens with the readable line 'TAKE A GOOD LOOK AT YOUR MONEY'. The bird is out of frame.
- **render_look**: Mint duotone [Certain, k-means]: #5ccb90 / #8ecf91 / #57a572 / #b4d5b4 on ink #386049; black #111714 outside the lens.
- Engraving at macro scale: hatch pitch 13.3-13.9 px = 3.7-3.9% H, about 1.75× the S7 building pitch. Angled parallel lines at about 103-118° plus contour line-work on the architecture; the lines are straight screens, not contour-following.
- Soft focus (Laplacian var about 1150-1450).
- Band: y 159-191 px = 8.9% H tall, spanning the lens. A translucent iridescent gradient (cyan #88c2cd, periwinkle #9dafe3, pearl #c8c7c9, blush #c9beb7) overprinted with fine wavy guilloche lines. The engraving faintly shows through.

Lens [Certain, 72-ray edge fit, residual 2-4 px]:
- Centre (326, 190) = (51% W, 53% H). R = 296 px = 46.3% W = 82% H (diameter 93% W, so top and bottom of the circle fall outside the frame).
- Radial L*: 75-79 out to 0.8 R, 62 at 0.9 R, 29 at 1.0 R, 3.7 at 1.1 R, 3 beyond. Soft edge about 0.85-1.08 R (about 65 px ≈ 18% H); outside is near black #060606 with a faint grey rim #514a49 at R.
- No barrel distortion: the band edges stay at y=159-160 and 190-191 from x=40 to 600 px (±1 px).
- **camera**: Slow linear push-in [Certain, inliers 1.0]: scale 1.0014-1.0017/frame = +3.7%/s, integrated ×1.076 over 1.96 s. No pan (±0.02 px/frame), no roll. Constant velocity (linear).
- The lens vignette is screen-locked: its centre moves less than 3 px and R stays 296 px throughout.
- Content moves under it.
- **transition_in**: Hard cut at 13.458 s from the S7 wide.
- **transition_out**: Continuous: at 15.458 s the push starts accelerating and adds a lateral pan (S9). No cut.
- **typography**: 'TAKE A GOOD LOOK AT YOUR MONEY'.
- Style: all caps, geometric sans (Futura/Gilroy class), semibold, pure white #ffffff with a faint glow. Tracking wide, about 0.3 em [Guessing: 30 characters over about 408 px at about 10 px cap height].
- Size and position [Certain, white-pixel extents]: cap height 10 px = 2.8% H. Text line spans about x 18% to 82% W (about 64% W), centred horizontally. Vertical centre y about 176 px = 49% H, inside the 8.9% H band.
- Entrance: none. It is already fully present on the first frame of the cut (frame 323).
- Over the shot it scales with the push: right end 511 → 533 px; cap height 10 → 11 px.
- No exit within the shot.
- **rebuild_in_code**: A separate composition from the S7 wide.
- Content group: the same ORIGINAL engraved artwork rendered at about 1.75× (shader pitch about 3.8% H), with filter blur(0.5px). Animate scale 1 → 1.076 linearly over 48 frames.
- Band <div>: height 8.9% H, width 100%, top 44.2% H. Background linear-gradient(90deg, #8796b5, #99baba, #e6e6e6, #f5d9c8, #ffd9a8, #f9ddab, #e2dab8, #c7e3d4, #c1c6f3, #a49cd7, #85a1c9, #6c7994) at opacity 0.85.
- Overlay an SVG <pattern> of sine lines (pitch about 1% H, about 12 lines across the band) with mix-blend-mode soft-light.
- Glint: a white radial-gradient blob 20% W wide translating left to right at 50% W/s, mix-blend screen, opacity 0.35.
- Text: our licensed geometric sans (e.g. the brand's own face), uppercase, letterSpacing 0.3em, cap height 2.8% H, white, textShadow 0 0 8px rgba(255,255,255,0.35). Copy must be our own factual line.
- Lens: a screen-locked overlay. radial-gradient(circle 46.3vw at 51% 53%, transparent 0 85%, rgba(0,0,0,0.6) 100%, #050505 108%) plus a 1 px rgba(120,110,110,0.5) ring at R.
- **layers**: Back to front:
1. Engraved note face (slow push).
2. Iridescent band with text, printed on the note so it scales with it. Its slightly faster growth hints it may be a separate layer [Guessing].
3. Moving glint.
4. Screen-locked lens mask.
- **palette_hex**: ['#5ccb90', '#8ecf91', '#57a572', '#b4d5b4', '#386049', '#111714', '#88c2cd', '#9dafe3', '#c8c7c9', '#ffffff']
- **foil_and_effects**: The hologram band is the key foil.
- Iridescent pearl gradient with guilloche moire lines; translucent.
- A specular glint travels left to right about 13.9-15.3 s: localized cyan, then blue, flares at x≈120 (13.96 s) → x≈360-420 (14.6-15.0 s) → x≈540 (15.3 s), so about 50% W/s [Likely, sampled band row colours].
- The band stops are otherwise stable over time.
- **sound_cues**: The cut sits 0.15 s before the 13.609 s beat. Beats at 13.613, 14.095, 14.576 and 15.052 s (≈125 BPM). RMS -23 to -29 dB relative with a spectral onset at 14.579 s. Mid-range centroid about 1.1-1.5 kHz.
- **ui_elements**: None (the band is diegetic print); no translucent UI cards in 0-17 s.

### 15.458–17 s
- **subject**: Push-through: the camera, still inside the same screen-locked lens, accelerates into the band and pans left along it. The text grows until only 'MONEY' remains, then 'ONEY' and 'NEY'. The hologram band's orange dotted circular emblem, the rainbow stops and the wavy guilloche lines become large. The micro-print circles ('o o o') on the note substrate and the branch hatching become visible. The move continues into the next segment, still decelerating at 17.46 s.
- **render_look**: Same mint world and lens as S8.
- The band at full magnification shows these stops [Certain, sampled at f410 row 180]: slate blue #6c7994 / #8796b5, sea glass #99baba, white #e6e6e6, blush #e1cac9 / #f5d9c8, apricot #ffd9a8 / #f9ddab, cream #e9dfb4, mint #c7e3d4, periwinkle #c1c6f3 / #9fc5e1, lavender #a49cd7 / #998fc4, steel #85a1c9.
- A dotted orange circular emblem appears about 1/2 to 2/3 along the band, with wavy guilloche lines throughout.
- Defocus and motion blur at peak speed: sharpness about 1500 at 16.17-16.33 s, falling to about 420-680 at 16.5-16.8 s.
- Branch hatching at 17 s about 6 px pitch with wave-line cross texture.
- Lens unchanged: centre (323-326, 190-195), R 296 px.
- **camera**: Accelerating push-in + lateral pan (content moves left) on an asymmetric ease-in/ease-out [Certain, Farneback inliers 0.5-0.9, cross-checked by text cap height 10 → 31 px ≈ ×3.0 vs integrated ×2.85].
- Per frame: scale 1.0017 / tx -0.86 px at 15.46 s; 1.0074 / -2.9 at 15.83; 1.0128 / -5.2 at 16.0; 1.030 / -12.1 at 16.17.
- Peak at 16.33 s: 1.083 / -34.3 px per frame (≈ +8.3%/frame scale, -128% W/s pan).
- Decelerating: 1.047 / -18.9 at 16.5; 1.024 / -9.5 at 16.75; 1.015 / -5.8 at 17.0; 1.006 / -2.35 at 17.46.
- Integrated 15.458-17.46: ×2.85, pan -429 px = -67% W. Roll about -0.5° total, vertical drift about 0.
- Accel phase 0.87 s, decel more than 1.13 s.
- **transition_in**: Continuous from the S8 linear push (the velocity curve bends upward at 15.458 s, about 0.07 s before the 15.526 s beat).
- **transition_out**: Continues into the 17-34 s segment, still moving (s 1.006/frame, tx -2.35 px/frame at 17.46 s). No cut at 17.0.
- **typography**: Same line, magnified by the camera [Certain, white-pixel extents]:
- Cap height 2.8% H (15.2 s), 3.1% (15.46-15.96), 3.3% (16.21), 5.3% (16.46), 6.7% (16.71), 7.5% (16.96), 8.1% (17.21), 8.6% H (17.46).
- Exit: the words leave frame-left through the lens edge. 'TAKE' is clipped by about 15.96 s; by 16.42 s the visible text reads '...AT YOUR MONEY'; by 16.58 s '...OUR MONEY'; by 16.92 s 'MONEY'; by 17.46 s only 'NEY' is visible.
- Exit duration about 1.5 s, driven purely by the camera. No per-letter animation.
- **rebuild_in_code**: Animate the S8 content group with one camera curve: scale 1 → 2.85 and translateX 0 → -67% W.
- Use a custom asymmetric curve: easeInCubic over 0.87 s to the peak velocity frame, then Easing.bezier(0.16, 1, 0.3, 1) over 1.2-1.4 s. Sample the curve as cumulative distance so the velocity is continuous.
- Transform origin near the band's right third, so the text slides left out of the lens.
- Wrap it in <CameraMotionBlur shutterAngle={180} samples={10}>. Add a focus-breathing blur 0 → 1.2 px → 0.4 px peaking at the velocity peak.
- The lens mask stays screen-locked.
- Build the hologram band at 3× texture resolution (or as vector) so it stays crisp at ×3.
- Use our ORIGINAL emblem in place of the orange dotted circle (e.g. a rosette derived from our card's guilloche). Land the velocity peak between beats and start the push about 2 frames before a beat.
- **layers**: Back to front: note face, hologram band with text and emblem (moves with the note), screen-locked lens mask. The motion blur hits the content layers only; the lens stays sharp.
- **palette_hex**: ['#67d194', '#9bcb99', '#6aa471', '#cbdabe', '#121714', '#3f5e49', '#8796b5', '#f5d9c8', '#ffd9a8', '#c7e3d4', '#a49cd7', '#85a1c9']
- **foil_and_effects**: Iridescent band at large scale: rainbow pearl stops, wavy guilloche lines and an orange dotted emblem. Motion blur and defocus at peak velocity. Lens mask unchanged.
- **sound_cues**: Push start 15.458 s ≈ 0.07 s before the beat at 15.526 s. Low-band beats at 16.004, 16.974 and 17.444 s. Spectral onsets at 16.371 (as the velocity peaks at 16.33), 16.995 and 17.245 s. RMS -21 to -29 dB relative.
- **ui_elements**: None.