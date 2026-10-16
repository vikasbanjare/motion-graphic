# BUILD SPEC: CRED IndusInd Bank RuPay credit card film, in the visual language of "CRED Money"

**Status:** synthesis of 8 research tracks (4 shot-by-shot segment studies, plus making-of, engraving shader, FX, audio and tech/assets), plus one new measurement pass done for this spec (`scorecard/score.py`).
**Output:** a ~30 s film (30.000 s, 720 frames at 24 fps, 1920x1080) for the CRED IndusInd Bank RuPay credit card.
**Goal:** it should read as the same visual language as the reference without reusing any of its subjects or compositions.

**Paths.** All are under `/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/`, written `RC/` below.

**Tags.** [Certain] measured and repeatable · [Likely] strong evidence, but inferred · [Guessing] untested.

**Units.**
- `% W` / `% H` are fractions of frame width and height.
- `px@640` means pixels measured on the 640x360 reference. Multiply by 3 for 1080p.
- Times in the reference are in seconds of the 69.06 s film. Times in our plan are seconds of our film, with frames at 24 fps.

**Facts allowed on screen.** These are the only claims the film may make. They come from the brief; v1's source header cites the IndusInd press release, Storyboard18 and inc42.
- CRED IndusInd Bank RuPay credit card
- launched 15 Sep 2025 (not used on screen)
- 5% rewards on online shopping
- zero joining fee
- redeem on flights, hotels and 2,000+ products on CRED store

No other product claim, number, balance or name may appear.

---

## 0. Where we are, in numbers

I measured both films with the same tool: `RC/scorecard/score.py` plus the repo's `tools/film_qa.py`.

| | Reference "CRED Money" | Our v1 (`out/cred-card-test.mp4`) |
|---|---|---|
| Still frames / median motion (film_qa) | 17.8 % / **0.0182** | 14.7 % / **0.0045** |
| Picture events per 10 s (score.py spike detector) | **2.75** | 0.67 |
| Line screen on engraved shots | 2.0–2.7 px@640 at **44–46°** | 2.2 px@640 at **0°** (horizontal guilloche, wrong angle) |
| Ink / paper vs reference mint loupe scene, ΔE00 | — | **28.1 / 17.2** |
| Saturated pixel share (foil, UI) | 0.11–0.79 per scene | 0.01–0.015 (no foil) |
| Loupe vignette (R50 / W) | 0.457–0.465 | none (a 0.14 W blob) |
| Camera zoom p90 on moving shots | 17.8–101 %/s | 3.3 %/s |
| Loudness range (LRA) | 11.9 LU | 1.4 LU |

v1 differed on every axis: render look, angle, palette, foil, lens, camera speed and dynamics. This spec closes each gap with a measured number.

---

## A. The visual grammar of the reference (numbered rules)

### A1. Render look
1. **Every world is an engraved print of real-looking objects.** Each one is photo or 3D cut-outs run through a straight line screen, gradient-mapped to one ink and one paper (plus one mid stop), on paper texture [Certain].
   - Per scene, the first principal component of Lab colour holds 89–99.7 % of the variance on object pixels [Certain: PCA by 4 shot agents and the engraving study].
   - On full frames (score.py) it is 0.60–1.00, lower where foil, UI, lens black or headline ink are present.
2. **Colour is rationed.** Saturated pixels (OpenCV S > 90) come only from foil, UI, pearl/hero and headline ink: 3–15 % of the frame in the 34–51 s worlds [Certain].
   - Full-frame saturated share by score.py: grey worlds 0.00–0.04; lavender 0.13; mint lighthouse 0.11; crimson hero 0.53; mint loupe with band 0.48.
3. **One live, animated hero per world gets a different treatment** [Likely]. The bird is posterised to 3 tones of the scene ink with mezzotint-like flecks, and has no line screen.
   - FFT orientation spread is 31–69° with coherence 0.40, against 0.5–0.57 on engraved flora.
   - Its luma peaks are 114 / 174 / 218 [Likely].
4. **Product and end-card worlds are clean CG.** There is no grain (frame noise std 0.33/255), black is a true #000000, and the only chroma is a violet rim (hue about 248°) [Certain].
5. **Motion blur appears only on fast moves.** Sharpness drops about 50 % at the velocity peaks of the reveal, the push-through and the whip [Certain: Laplacian variance].

### A2. Engraving line screen (the core of the look)
1. **Geometry:** straight, uniform parallel lines at one angle, about **45° "/"** (range 38–52°). They are **not contour-following**: patch orientation spread is 11–25° [Certain: FFT plus directional autocorrelation, three independent studies].
   - score.py reproduces this: flora 2.58 px at 44.5°, tilt/hero/morph 2.50–2.73 px at 45–46°, lighthouse 2.01 px at 44.9°.
2. **Period at establishing scale:** 2.0–2.74 px@640 = **0.55–0.77 % H**, i.e. 6.0–8.2 px at 1080p.
   - Lighthouse 0.55 % H, columns 0.69 %, flora 0.73–0.77 % [Certain].
   - Under the loupe: 3.78–3.83 px@640 = **1.05 % H** (11 px at 1080p).
   - In the loupe macro: 13.3–13.9 px@640 = **3.7–3.9 % H** [Certain].
3. **Tone = line thickness.**
   - Lines vanish above tone 0.6–0.8 (clean highlights).
   - They never fully close in shadow: amplitude at tone 0.05 is still 55–73 % of the peak.
   - Maximum ink coverage is 0.6–0.8 [Certain: demodulation].
4. **Crosshatch:** none systematically [Likely]. In the darkest quartile, cross-angle energy is 0.24–0.44, no higher than in midtones.
   - Exception: banknote close-ups show a second orientation (49° / 137° at about 1.0 % H) [Likely].
   - So add a second screen at 135° only below tone 0.35–0.42, and only in loupe macros of printed art.
5. **Irregularity matters** [Certain]:
   - line-phase RMS 0.19–0.22 periods;
   - coherence 0.38–0.53;
   - correlation length 4–6 px@640.
   - Our v1 had phase RMS 0.008 (10x too clean).
6. **Attachment** [Certain/Likely]:
   - The line period scales with the object or layer: flora layer ×0.919 vs period ×0.921; push-in ×1.146 vs ×1.157; pull-back ×0.785 vs ×0.766.
   - In near-still holds the carrier phase stays fixed (|dphi| ≤ 0.04 rad).
   - **Build rule:** the screen is anchored to each object (it scales and moves with it) but oriented in screen space (always 45° on screen). This satisfies every measurement.
7. **Background guilloche** [Certain]:
   - in-phase horizontal sinusoids;
   - pitch 2.2 % H;
   - peak-to-peak amplitude ≈ 1 pitch;
   - wavelength ≈ 10 pitches (12.5 % W);
   - stroke ≈ 0.25 pitch.
   - On dark voids, rosettes have period 4.0–4.3 % H at ≤ 13 % brightness. Paper rosette meshes have period 2.5–3 % H at loupe zoom.

### A3. Duotone palettes per scene type
Measured by k-means, PCA and 16-stop gradient-map LUTs [Certain]. Each world has one colour family, and the palette changes only through a reveal, wipe or cut-to-new-world, never inside a held shot.

| Scene type | Shadow → mid → highlight (LUT) | Paper / ground | Extra inks | Source |
|---|---|---|---|---|
| Intro grey paper | #5f5f5f → #ababab → #ebebeb | #d0d0d0–#d8d8d8, vignette −11.6 L* | ink #29282c / #2b2b2b / #646464 as density rises | fx LUT, shots-00-17 |
| Cream-to-mint wash | — | #dbdcb6 → #c9d7ab → #b3cc96 | — | shots-00-17 |
| Violet objects | #5f4095 → #b288d6 → #d7b3f4 (flowers/bird); #75539b / #b588d6 / #cea3ee | on the wash | posterised hero #5b3e90 / #a67ec9 / #c7a0e9 | fx, shots |
| Olive objects | #5a6b34 → #c4d0a2 → #dbddb6; #495a22 / #6c7e47 / #d8dab1 | on the wash | — | fx, shots |
| Mint on dark slate (object reveal) | #4da579 / #60cb93 / #98d6a3 | table #0e1816 / #15231f / #2c433c | edge glow #63c485 | shots |
| Mint loupe macro | #63985a → #63cd91 → #cffcc6 | lens outside #060606 | ink #386049 | fx LUT |
| Peach security print | #97634d → #cea580 → #fbe6b9 | #fae9bb + 15 % wash (pink #f2c9bd, yellow #f6e2a8, mint #d8efcf) | ink #3b3634 | fx LUT, shots-17-34 |
| Crimson / peach hero (tritone, hue split) | crimson4: #7c2537@0, #ae5669@0.45, #dea688@0.83, #fbc4a7@1 | cream #d2c0ad / #dbcdb9 | headline core #741739, subline #5d2e2b | engraving, shots |
| Lavender | lavender4: #3b316c@0, #615788@0.45, #bcafcb@0.83, #fdf4fd@1; LUT #41366c → #847db3 → #dcd5f0 | backdrop #c2b4d7 → #b3b2ce | headline #49298c with sheen #4fb6c8 | fx, engraving |
| Mint landscape | mint4: #395a2d@0, #7b9e6f@0.45, #b9dda8@0.83, #cdf0bc@1 | #c9f3ba | — | engraving |
| Grey sea | #111615 → #67706e → #dce6dd | — | navy title #26256f | fx |
| Green bill (loupe) | #0c2a14 → #e3f3cb; letter sides #075529 | — | — | shots-34-51 |
| Seal / end paper | #1e532e → #7b9d76 → #f7f3db; seal fill #c5d3a4 | #e0dac0 / #f0e9d2 | — | fx, shots |
| Product studio | #303031 / #5e5e5e / #8c8c8c / #bcbcbc / #fafafa | floor glow (radial) | rim #3d3b4b | shots-51-69 |

The **16-stop LUTs** are in `RC/fx/out/duotone_luts.json` and `RC/fx/proto/remotion/src/fx/measured.ts`. There are also `.cube` 33³ files in `RC/fx/proto/luts/`, which agree with the SVG filter within median ΔE 3.96.

**Use per-object tritones, not a global LUT, in multi-ink worlds.** Single-ink scenes reproduce at median ΔE 2.3–4.1 through one LUT. The columns scene, with foil, headline and UI on top, reproduces at 8.4. The hummingbird scene has two inks on separate objects, so one global LUT cannot reproduce it.

### A4. Paper and grain
1. **Grain is static, never animated** [Certain]. Frame-to-frame noise in static holds is 0.02–0.17 levels.
2. **Intro paper texture** (DoG std in 8-bit levels at sigma 0.7 / 1.4 / 2.8 / 5.6 / 11.2 / 22.4 px@360): 1.10 / 0.94 / 0.94 / 0.87 / 0.66 / 0.51.
   - Spectrum slope is −2.18.
   - Radial luma falls 219.9 → 190.5 from centre to corner (−13 %) [Certain].
3. **Banknote and seal paper** is about 5x stronger [Certain]:
   - std 14–15;
   - blob size about 9–10 px@360;
   - spectrum slope −3.1 to −3.3.
4. **Vignettes:**
   - S1 paper −11.6 L*;
   - S2 −6.0 L*;
   - flora world about −10 L* [Certain].

### A5. Foil
1. **Blend mode: overlay** [Certain on cards, error 0.249 vs 0.519 for the next mode; Likely on shell and turtle].
   - Dark lines stay neutral (chroma → 0 below luma 0.2).
   - The base under foil must be mid-tone (luma p50 about 0.45), with fine lines.
2. **Foil is attached to the object.** Hue change in a static hold is 0.0° [Certain]. It moves only when the object or camera moves.
3. **Hue mix (share of foil pixels)** [Certain]:
   - Pearl/turtle: 210–240° 64 %, 240–270° 24 %, 180–210° 12 %.
   - Shell: blue 54 %, warm 26 %.
   - Card glints: 0–30° 47 %, 30–60° 11 %, 180–240° 21 %, 270–360° 17 %.
   - Saturation p50/p90: 0.35/0.47 (shell), 0.46/0.60 (turtle), 0.62/0.72 (cards).
4. **Card glint timing** [Certain]:
   - fade in 0.25 s, hold 0.4–0.6 s, fade out 0.12 s;
   - drift about 0.04 W/s;
   - hue turns about 40° during the hold;
   - sigma 0.017–0.039 W;
   - repeats every 1.0–1.2 s, staggered between objects (never in sync).
   - Sweeps run 1.0–1.5 s per object, staggered about 0.5 s.
5. **One foil element per shot** [Certain]. Examples: the band, card faces, turtle shell, shell fan, cave door.
6. **Holographic band (security thread)** [Certain]:
   - Opaque pastel ramp: #f1caca → #fbd8b9 → #fcd8a3 → #fadba3 → #ebdbaf → #c7e5d2 → #a3c8e4 → #8daad3 → #89a0c8 → #889bbc.
   - Saturation p50 0.27; value p50 0.89; about 2 colour cycles along the band.
   - Height 0.055 H when seen far away, 8.9 % H in the frontal macro, 28 % H at full push.
   - Overprinted with white wavy lines at 40 % opacity: pitch 0.124 band heights, period 2 band heights, amplitude 0.17 band heights [Guessing on amplitude].
   - One circular emblem sits in the band.
   - A specular glint travels left to right at about 50 % W/s [Likely].

### A6. Lens / loupe
1. **Macro loupe** [Certain]:
   - A screen-locked true circle with R50 = **0.457–0.465 W** (score.py: 0.457 / 0.461 / 0.462 / 0.465 in four lens scenes), which is 0.81–0.83 H.
   - Centre (50.8–51.1 % W, 53–54 % H).
   - Only the sides and corners go dark.
2. **Edge profile**, as brightness relative to inside at offsets from R50 in px@360 [Certain, fx]:

   | Offset | −60 | −40 | −20 | −10 | 0 | +10 | +20 | +30 |
   |---|---|---|---|---|---|---|---|---|
   | Brightness | 0.999 | 0.963 | 0.827 | 0.693 | 0.514 | 0.314 | 0.129 | 0.013 |

   - The 10–90 % width is 0.139 H by the fx method, or 0.158–0.167 H by score.py's azimuthal method. **Use score.py on both films.**
   - Outside colour is #0b0d0c (luma 9–13).
3. **No barrel distortion** (k < 0.025) and **no chromatic aberration** [Certain].
   - The rim softens with blur σ 2.2 px at 1080p, ramping from r/R 0.45 to 0.85, with saturation ×0.75 [Likely].
   - Late scenes show radial smear in the outer 8 % [Likely].
4. **Wide loupe variant** (object on a table) [Likely]:
   - R 0.36–0.41 W, centred at (44 % W, 29 % H);
   - darker, with a wider feather;
   - a defocused bright barrel-reflection band.
5. **Magnification always comes from a camera push under a fixed lens** [Likely].
6. **Iris** [Certain]:
   - **Iris-in** (relative radius vs time): 1.33 at 0 s, 1.21 at 0.083 s, 1.15 at 0.125 s, 1.098 at 0.208 s, 1.04 at 0.375 s, 1.0 at 0.625 s. Fast-out; corners fall 207 → 9 in about 0.2 s.
   - **Iris-out:** R 47.6 → 54 % W over 7 frames, ease-in; or `r = 1 + 0.24·u^2.6` over 0.33–0.96 s.

### A7. Type system
1. **Headline:**
   - lowercase, high-contrast semibold serif with a period at the end ("multiple banks." style) [Certain];
   - x-height **4.2–5.0 % H** (font size about 9–10 % H);
   - ascender 6.1–7.2 % H;
   - two-line leading 7.5 % H;
   - width 31–52 % W;
   - colour = the scene's ink.
2. **Headline sheen:** a highlight band travels through the letters at **2.5–17 % W/s**, typically 6–11 % W/s.
   - Width σ about 5 % W, lifting brightness by about +33 %.
   - It runs the whole time the headline is on screen and loops [Certain].
3. **Subline:**
   - lowercase geometric sans, medium weight;
   - x-height **1.4–1.9 % H**;
   - 1.4–4.7 % H below the headline baseline;
   - a darker or brighter variant of the ink [Certain].
4. **Placements** [Certain]:
   - top-centre (cap top 7–8 % H);
   - right lower third (centre 68 % W, 68–75 % H);
   - bottom-left (x = 5 % W, 75–84 % H);
   - product left (x = 19.4 % W, baseline 48.6 % H, headline in grey #a0a0a0–#afafaf with x-height 3.8 % H, subline #c6c6c6–#fafafa).
5. **Diegetic band text:**
   - white uppercase geometric sans, cap height = 0.5 band heights (2.8 % H frontal);
   - tracking **0.43 em in Lexend 500** (0.46 em in Poppins, 0.41 em in Montserrat) [Certain, solved from the measured ink span].
6. **Fonts** (free stand-ins; the real CRED serif is unknown) [Likely]:
   - Headline: **Newsreader** variable, opsz 72, weight 600, −0.03 em. x-height/ascender 0.696 vs 0.683 in the reference; stem/x-height 0.309 vs 0.304.
   - Sans: **Lexend 500**, −0.02 em (IoU 0.792).
   - **Avoid Instrument Serif:** about half the stem weight and 18 % too narrow; it was v1's font.
7. **End lockup:** wordmark cap height 3.6 % H, emblem 10.8 % H, 1.9 % H gap, optically centred at 49.6 % H [Certain].

### A8. UI cards
1. **UI lives in the world** (a balance carved into a monument, a card born inside a light beam) or **on frosted glass** [Certain].
2. **Glass card** [Certain]:
   - 37 % W × 40 % H (lavender) or 35 % W × 18 % H (mint);
   - `backdrop-filter: blur(6–8px)`;
   - background rgba(150,130,210,0.35) or rgba(140,240,170,0.45);
   - row pitch 7–12 % H;
   - text 1.4–1.9 % H.
3. **One sharp active row** with a teal → lavender gradient bar (#57c1c9 → #9b8fd0); the other rows are pixel-smeared.
   - The active row advances **once per bar (1.92 s at 125 BPM)**.
   - Values count up in about 0.5 s (12 frames) [Likely].
4. **A card born from the world:** it appears on the exact frame of a light peak, then makes an exponential ease-out over about 24 frames.
   - Measured left-edge keyframes, as a fraction of width every 2 frames: 0.228, 0.159, 0.125, 0.109, 0.094, 0.081, 0.075, 0.072, 0.066 [Certain].

### A9. Camera language (measured)
Every big move is **asymmetric**: an ease-in acceleration of 0.4–1.9 s, a short peak, then a longer expo-out settle of 0.85–1.2 s or more. Holds still drift. Fully static frames occur only at frames 0–7 and inside holds where only light moves [Certain].

| Move | Peak / total | Easing / duration | Source |
|---|---|---|---|
| Opening truck with pen | 0 → **86 % W/s** | easeInQuad on velocity, cruise reached at 1.3 s | grain correlation [Certain] |
| Guilloche field flow | 8.8 → 2 px/frame@640 over a paper drift of 15 % W/s | expo-out, 1.75 s | [Certain] |
| Assembly pull-back | ×0.80, peak −25 %/s, roll +1.3° | expo-out, 1.45 s | Farneback [Likely] |
| Object reveal pull-back | ×0.57, **peak −60 %/s (−3.8 %/frame), roll +61°/s**, pan −27 % W / −47 % H, tilt about 45° | ease-in from 8.2 s to the 10.08 s peak, expo-out to 11.1 s | [Likely ±30 %] |
| Holds | 0.45 % W/s drift, +0.1 %/s scale, +0.2°/s roll; or a linear +3.7 %/s push | linear | [Certain] |
| Push-through | ×2.85 and −67 % W pan; **peak +8.3 %/frame, −128 % W/s** | ease-in 0.87 s, decel 1.13 s or more | [Certain] |
| Decel push tail | flow halves every 0.28 s | pure expo-out | [Certain] |
| Tilt-up reveal | pitch −90 → 0°, peak flow 7.2 px/frame@320 (about 54 % W/s), FOV about 75° | in 0.4 s, plateau 0.3 s, out 1.2 s | [Likely] |
| Dolly-in finish | 1.011 → 1.000 per frame | expo-out, 0.75 s | [Certain] |
| Morph push | ×1.146 | symmetric in-out, 0.85 s | [Certain] |
| Orbit | background moves left, accelerating; foreground pillar moves right | ease-in | [Certain] |
| Crane-over | peak 14.8 % W/s | quadratic ease-in 0.67 s, plateau, ease-out 0.38 s | [Certain] |
| Loupe-to-whole-object pull-back | **×0.451 over 2.67 s in log scale** | **cubic-bezier(0.75,0,0.3,1)** (rmse 0.012); peak −5.1 %/frame at the reveal frame, on a beat | [Certain] |
| Whip-out | +1.8 → +48 px/frame@640 along 22° up-right | ease-in (power 2.5), +1.1°/frame roll, +2.6 %/frame scale | [Certain] |
| Product entrance | +24.5 % W in 0.8 s (70 % in the first 0.25 s), ×1.25 push | expo-out | [Certain] |
| Exit (lights-out) | mirror of the entrance | ease-in, 0.8 s | [Certain] |
| Living stills | 0.2–1.5°/s roll, ≤ 0.6 %/s scale, ≤ 0.4 % W/s pan | linear | [Likely] |

**score.py zoom p90 on the reference's moving shots:**

| Shot | Zoom p90 |
|---|---|
| Assembly (R04) | 17.8 %/s |
| Loupe push (R07) | 34.6 %/s |
| Tilt (R10) | 101 %/s |
| Morph (R12) | 30.4 %/s |
| Pull-back (R21) | 82.2 %/s |
| Holds | 0.0–2.8 %/s |

### A10. Transitions
| Type | Numbers | Source |
|---|---|---|
| **Scale-step hard cut** (opening) | Pitch 9.0 → 5.8 → 2.2 % H; stroke 1.16 → 0.57 → 0.55 % H; line count 3 → 8 → 43; ink lightens as density rises; steps last 1.75 s then 1.25 s | [Certain] |
| **Colour-wash wipe** inside a take | Curved front, top to bottom in 6 frames; saturation keeps ramping 0.5 s; **audio drops to −75/−80 dB for 0.2 s exactly under it** | [Certain] |
| **Layered fly-in assembly** | 5 layers from 3 corners/edges, stagger 0.25 / 0.08 / 0.30 / 0.02 s, 80 % of travel in 6–8 frames, 1.2–1.7 s expo tail, then a 0.33 s near-hold | [Certain] |
| **World-into-object reveal** | Pull-back + roll + tilt; at the same time hue-rotate the cool inks −85° in 0.6 s, saturate greens (S 84 → 122), fade in darkness over 0.7 s (V < 50 share 0 → 31 %), cross-dissolve the object's security details | [Certain] |
| **Lens-swap drop** | New lens from (65.6 % W, −2.8 % H); step sizes ×0.62 per frame; overshoot to 75.7 % H, hold 2–3 frames, spring back to (50.7 %, 52.5 %); **16 frames**; radius constant 47.5 % W. Picture fully replaced by frame 3. Each swap goes to a higher magnification (about ×2.3) | [Certain] |
| **Loupe-swap rig** (late) | Relative to landing frame L: dip +20–25 % H at L−17..L−10, hold L−10..L−8, return L−7..L−5, fling up-right L−4..L−2 (through y ≈ −35 % H), new lens enters from (46 % W, 80 % H) at L−1, settled at L. Content then relaxes with an exponential pull-back of 2.6–7 % (τ 10–12 frames). Used 3× at 1.33 s spacing | [Certain] |
| **Iris-out + 90° tilt-up** ("pattern becomes world") | Iris 7 frames ease-in; pitch −90 → 0° mostly within 0.4 s; backdrop fades in within 5 frames after reaching eye level | [Certain / Likely] |
| **Object-matte wipe** | Foreground pillar about 22 % W wide; its left edge is the matte edge. Edge % W per frame: 0, 7.2, 16.2, 28.4, 42.2, 55.6, 67.2, 76.9, 84.7, 90.9, 95.6, 100 (**11 frames**, peak 13.8 % W/frame). The next scene is already composed; no crossfade, no blur | [Certain] |
| **Vertical hard wipe** | Right to left, % W per frame: 100, 97, 89, 81, 73, 65, 53, 35, 23, 13, 4, 0. Both plates static. Peak frame on the bass hit | [Certain] |
| **Cut-in** | 1.6–2.5× on the same subject; mirrors the hero to the other third or re-centres it; the copy block flips sides or persists | [Certain] |
| **Whip + hidden cut** | Last frame ≥ 98.8 % black; cut on the 16th-note grid; match on action (exits top-right, re-enters bottom-right) | [Certain] |
| **Lights-out + cut from black** | Screen fades first (10 frames), background 3 frames later (14 frames), rim last; 2 black frames; cut on the beat | [Certain] |
| **End** | Linear fade about 165 lum/s (1.5 s), then 2.3 s of black | [Certain] |

### A11. Cut rhythm and shot length
[Certain: hand-verified list from the 4 shot studies]

- **8 hard cuts in 69.06 s:** 1.750, 3.000, 13.458, 32.542, 35.750, 40.583, 54.75 (hidden), 60.458 (from black). That is 1.16 per 10 s; hard-cut ASL 7.7 s.
- **15 picture changes in total:** 8 cuts + 5 lens swaps (18.742, 20.383, 47.0, 48.333, 49.667) + 2 wipes. That is 2.2 per 10 s.
  - Picture-state length: mean 4.2 s, median 4.2 s, range 1.25–10.46 s.
  - Longest continuous take 10.46 s.
- score.py spike detector (the same algorithm runs on our film): **2.75 events per 10 s**.
- **Rhythm accelerates into the end:** the loupe trio is spaced 1.33 s apart, then the 2.67 s pull-back.
- Holds ≤ 2.33 s inside the picture. The longest still run is 5.4 s, all of it the end fade and black.

### A12. Text timing
1. **One copy block per scene**, holding 3.2–4.0 s [Certain]. A frontal read of diegetic text lasts 2.0 s, followed by a 1.5 s push-through exit.
2. **Entrances** [Certain]:
   - Drop from above the frame: 28 % H in 18 frames (7 frames linear at 2.6 % H per frame, then 11 frames of ease-out), no fade.
   - Centre-out mask reveal in 4–5 frames, synced to an action, plus a 2.5 % H rise over 24 frames; the subline follows 3 frames later.
   - 16-frame fade with a 3 % W counter-slide (product shot).
   - Already in place when a cut or wipe reveals it.
3. **Exits** [Certain]:
   - Fade over 12 frames while scaling with the camera push.
   - Left-to-right staggered dissolve over 26 frames.
   - 5-frame fade during a lens move.
   - Cut or wipe away.
   - Never per-letter typing; never overshoot.
4. Copy sits **above the world and under the lens vignette**, screen-locked (≤ 2 px drift) during camera moves [Certain].

### A13. Motion density
film_qa: still 17.8 %, median motion **0.0182** [Certain]. Per-frame MAD is 0.01–0.09 during moves. Near-still runs (MAD < 0.005) occur only in deliberate holds where something still lives (the bird, a light sweep, a foil sweep).

### A14. Sound
[Certain timings from STFT; Likely on identities]

1. **No voiceover.** VAD peak 0.31; a positive control was detected at −9 dB.
2. **Score:** 125.00 BPM (beat 0.480 s, bar 1.920 s), Eb major with borrowed Eb-minor chords.
   - 808 with pitch-drop tails, 2-bar pattern at beats 0 / 1.5 / 4.5.
   - Eb1 sub drone in the drops.
   - 16th-note plucks at about 7.5 notes/s, centroid 1.1 kHz.
   - Very dark top end: > 6 kHz is −31 to −36 dB of the total.
3. **Structure:**
   - 0.54 s of digital silence;
   - pen-scribble Foley solo (1–15 kHz noise, mono, hard stop);
   - 0.15 s dead gap under the colour wipe;
   - reverse swell peaking +0.2 s after the first pop-in;
   - plucks;
   - groove starting 0.2 s before the first hard cut into the new world;
   - drop **mid-shot**;
   - breakdown entering the loupe section;
   - drop 2 just before the pull-back;
   - outro hit at the wordmark (+0.13 s);
   - bell chord with 8th-note echoes, ringing 2.1 s.
4. **Loudness:**
   - integrated −16.9 LUFS, **LRA 11.9 LU**, true peak −0.5 dBTP;
   - short-term −33 → −13.8 → −26 → −15;
   - hit prominence 3.3 dB; 2.68 onsets/s.
5. **SFX follow the picture** (about 28 in 69 s = 0.41/s, ≤ 2 starts per 1 s window):
   - **No SFX on text or UI.**
   - One world sound per object.
   - **Whooshes:** a mono 20–30 ms tick, a 30–50 ms gap, then a flat 0.24–0.26 s 3–15 kHz noise block that **ends 25–75 ms before the cut**. An answer block starts +0.08 s after.
   - Air-band SFX sit 11–27 LU under the bed and still read; mid/low SFX sit −6 to +2 LU around it.
   - 6 of 10 hard cuts land 64–97 ms after a strong onset.

---

## B. Shot-by-shot plan: ORIGINAL ~30 s film

### Timing and story
**Timing:** 30.000 s = **720 frames at 24 fps**, 1920x1080.

**Music grid:** 125 BPM, beat k at t = 0.48·k s, bars every 1.92 s from t = 0. Score sections (all on bar lines):

| Section | Time (s) |
|---|---|
| intro (plucks) | 3.84 |
| grooveA | 5.76 |
| drop | 17.28 |
| break | 19.20 |
| drop2 | 21.12 |
| outro | 26.88 |
| tail (bell) | 28.80 |

The picture events below are placed on that grid. After rendering the score, nudge each event ≤ 1 frame to `score.wav.beats.json`.

**Story** (only sourced facts):
1. A single engraved line becomes the guilloche of a card.
2. Its printed world ("online shopping" parcels) is revealed to be the card's own face, seen under a loupe.
3. The foil strip reads **5% REWARDS ON ONLINE SHOPPING**.
4. A lens swap shows a rosette that becomes a 3D globe: **redeem on flights and hotels**.
5. A wipe opens the products world: **2,000+ products on CRED store**.
6. The loupe goes to giant "5%" letters, then to the card's seal.
7. A pull-back shows the whole card; a whip lands on the 3D card: **zero joining fee**.
8. The film ends on the lockup.

**Originality:** no hummingbird or flowers, turtle, lighthouse, shell/pearl/koi, colonnade with bank cards, banknote/"MONEY", orange dot-ring emblem, or the reference's tagline. Every technique slot gets a different subject.

### Overview

| # | Time (s) | Frames | Subject | World / duotone | Transition out |
|---|---|---|---|---|---|
| S01 | 0.000–1.208 | 0–29 | Birth of a line | grey paper | scale-step cut |
| S02 | 1.208–1.917 | 29–46 | 8 lines drawing, locked | grey | scale-step cut |
| S03 | 1.917–2.875 | 46–69 | 45-line guilloche field + colour wash + circle clip | grey → cream/mint | continuous |
| S04 | 2.875–4.208 | 69–101 | Parcels fly in from corners; paper crane lands | violet + olive on wash | continuous |
| S05 | 4.208–5.458 | 101–131 | Print-into-card reveal | hue → mint on slate | continuous |
| S06 | 5.458–5.958 | 131–143 | Card on slate under wide loupe (hold) | mint/dark | **hard cut** |
| S07 | 5.958–8.083 | 143–194 | Loupe macro: foil strip "5% REWARDS ON ONLINE SHOPPING" | mint + foil | continuous |
| S08 | 8.083–9.417 | 194–226 | Push-through, text exits left | mint + foil | **lens-swap drop** |
| S09 | 9.417–10.542 | 226–253 | Pole view of the globe: graticule rosette + micro-planes | peach | iris-out |
| S10 | 10.542–11.667 | 253–280 | Iris-out + 90° tilt-up: the rosette becomes a 3D globe | crimson/peach | continuous |
| S11 | 11.667–14.083 | 280–338 | Hero: globe on plinth, bell and suitcase; headline drop | crimson/peach | continuous |
| S12 | 14.083–15.333 | 338–368 | Orbit; foreground card-slab matte wipe | crimson → lavender | **matte wipe** |
| S13 | 15.333–18.250 | 368–438 | Products world, parallax + glass card | lavender + pearl foil | **hard cut** |
| S14 | 18.250–19.667 | 438–472 | Loupe: giant 3D "5%" on the card surface | green | **loupe swap** |
| S15 | 19.667–21.125 | 472–507 | Loupe: the card's seal (guilloche medallion + chip) | cream/green | continuous |
| S16 | 21.125–23.375 | 507–561 | Pull-back to the whole card on black, then whip-out | green on black | **hidden cut** |
| S17 | 23.375–26.875 | 561–645 | 3D card in the studio; "zero joining fee."; lights-out | neutral greys | **cut from black** |
| S18 | 26.875–30.000 | 645–720 | Lockup, fade, black | white on black | end |

**Rhythm check:**
- 6 hard cuts (1.208, 1.917, 5.958, 18.25, 23.375 hidden, 26.875 from black) plus 2 lens swaps and 1 matte wipe = **9 picture changes in 30 s**, i.e. 3.0 per 10 s (reference 2.2).
- Longest continuous takes are 5.46 s (S09–S12) and 4.04 s (S03–S06); the reference's 10.46 s scales to about 4.5 s.
- Shot density is about 35 % higher than the reference. That is the cost of compressing 69 s into 30 s; see E.

### Per-shot spec
All camera values are for 1080p. "Engrave" means the object-anchored, screen-oriented line-screen material (C3), at period 0.0069 H (7.5 px) and 45° unless stated.

**S01 — birth of a line (0.000–1.208, f0–29)**
- **Subject / build (SVG):**
  - 3 ink strokes: the first three lines of *our* card guilloche family, y = A·sin(2πx/λ + φᵢ). λ = 58 % W, peak-to-peak 8 % H, pitch 9.0 % H, stroke 1.16 % H (12.5 px), ink #29282c.
  - Ink bleed: feGaussianBlur 0.6 px plus a light feDisplacementMap.
  - Draw-on via `strokeDashoffset` driven by the pen tip.
- **Paper:**
  - #d0d0d0 base;
  - feTurbulence 0.012 for mottle plus 0.6 for grain at low opacity, static;
  - vignette −11.6 L* to the corners;
  - this is `Paper.tsx` defaults (mottle 0.035 @ 0.015, grain 0.10 @ 0.10).
- **Camera:**
  - frames 0–6 pixel-static;
  - world translateX velocity ramps 0 → 86 % W/s with easeInQuad from f7 to f24, then cruises;
  - integrate per frame;
  - pen tip on screen at 6 % W (f10), 41 % W (f24), 56 % W (f29), expo-out.
- **Transition out:** hard cut at f29, a scale step (not a zoom).
- **Text:** none.
- **SFX:** silence 0–0.50; `pen_scribble` from 0.50 (mono, −12 LU vs film integrated).

**S02 — locked lines (1.208–1.917, f29–46)**
- **Subject:** 8 sinusoids. Pitch 5.8 % H, stroke 0.57 % H (6 px), λ 36 % W, peak-to-peak 5.3 % H, ink #2b2b2b, on smoother paper (vignette −6 L*).
- **Motion:** draw-on linear at 11 % W/s with staggered starts, giving ragged ends.
- **Camera:** locked, 0 px/frame.
- **Transition out:** hard cut at f46 (≈ beat 4), to a brighter paper stock.
- **SFX:** scribble continues.

**S03 — guilloche field and colour wash (1.917–2.875, f46–69)**
- **Subject (SVG or fragment shader):**
  - 45 paths with pitch p = 2.2 % H (24 px), peak-to-peak = p, λ = 10p, stroke 0.55 % H, ink #646464 on #e7e7e7;
  - line ends randomised at 45–70 % W.
- **Camera / motion:**
  - the wave phase flows left 26 → 6 px/frame, expo-out over 23 frames;
  - the paper layer drifts −15 % W/s (2:1 pseudo-parallax);
  - slow pull-back −2 %/s.
- **f63–69 colour wipe:**
  - a wash (#dbdcb6 → #c9d7ab → #b3cc96, multiply) revealed top to bottom by an animated `mask-image` with a curved front and 40–60 px feather;
  - `saturate` 0.5 → 1 over 12 frames;
  - the field is then clipped by a circle of R 78 % W centred at (−23 % W, 97 % H). This disc is our card rosette.
- **Transition out:** continuous.
- **SFX:** scribble hard-stops at 2.62. **All audio < −80 dBFS from 2.625 to 2.775** (dead gap). `reverse_swell` starts 2.78.

**S04 — online-shopping parcel world (2.875–4.208, f69–101)**
- **Subject / build (procedural 3D in one `ThreeCanvas` over the DOM paper and wash):**
  - L1 big kraft parcel with twine (box + tube rope) from bottom-right, f69;
  - L2 shopping bag (panels + tube handles; `models2.ts`) from bottom-left, f75;
  - L3 gift box with bow from top-right, f77;
  - L4 thin ribbon streamer (perch) from right, f84;
  - L5 small-parcel cluster from bottom-right, f85.
  - Stagger reproduces 0.25 / 0.08 / 0.30 / 0.02 s.
- **Material:** engrave at period 0.0075 H, 45°, with albedo noise 0.35.
- **Inks:**
  - parcels and gift box: violet tritone #5f4095 / #b288d6 / #d7b3f4;
  - bag, twine and ribbon: olive #5a6b34 / #c4d0a2 / #dbddb6;
  - 2 px dark outline from alpha dilation.
- **Motion:**
  - each layer translates from off-screen with `Easing.bezier(0.16,1,0.3,1)` over 28 frames, so 80 % of travel happens in 6–8 frames;
  - camera wrapper scale 1 → 0.85 over f75–101, expo-out (peak about −25 %/s), roll +1.0°.
- **Hero (posterised, NOT line-screened):**
  - an origami paper crane from flat facets;
  - wings hinge ±35° with a 12-frame cycle;
  - 3-level posterise #5b3e90 / #a67ec9 / #c7a0e9, plus threshold-noise flecks (2–3 px cells);
  - enters from x = 110 % W at f96 with expo-out over 10 frames and perches on the gift-box lid at f106;
  - it keeps flapping for the rest of the take.
- **Transition out:** continuous.
- **Text:** none.
- **SFX:**
  - `reverse_swell` peak at 3.33 (+0.2 s after L2);
  - `air_bed` 3.30–6.0 (4.3–6.3 kHz, wide, −25 LU);
  - music intro plucks at 3.84;
  - `wing_flutter` 4.07–4.47 (−6 LU vs bed).

**S05 — the print is the card (4.208–5.458, f101–131)**
- **Build:**
  - Render S03–S04 into a texture of at least 4096 px; this is the card-face art.
  - Map it onto a card mesh (`ExtrudeGeometry`, rounded rect 8.56 × 5.398, depth 0.06, bevel 0.012; `models2.ts`) lying on a dark slate plane (#0e1816 with low-contrast mottle).
  - The card's own security elements cross-dissolve in over f106–121:
    - a diagonal holographic strip at 55–60° (`HoloBand`) with tiny tracked text "5% REWARDS ON ONLINE SHOPPING" (cap about 1 % H);
    - our rosette;
    - an engraved EMV chip;
    - a column of small rotated outline "5%" glyphs at the right edge.
- **Grade:**
  - hue-rotate the cool inks −85° over f106–121 (violet → cyan → mint);
  - greens saturate ×1.4 → #63c485 / #4e906a;
  - darkness fades in over f118–131 (V < 50 share 0 → about 30 %);
  - mint edge glow 0 0 12px #63c485.
- **Camera (3D):**
  - scale velocity −1.5 %/s, then easeInCubic to a peak of −75 %/s and +70°/s roll at f118;
  - then `Easing.bezier(0.16,1,0.3,1)` to rest at f131;
  - total ×0.55, roll +30°, rotateX 0 → 45°, pan −27 % W / −47 % H;
  - sample as cumulative distance so velocity is continuous;
  - `<CameraMotionBlur shutterAngle={180} samples={8}>` over f110–126.
- **Loupe:** the wide variant (R 0.38 W at 44 % W, 29 % H, rim ring rgba(180,220,200,0.18) blur 18 px) fades in over f118–131.
- **SFX:** `lens_swell` 4.97–5.47 (+0.02 s after the lens edge enters; 0 LU vs bed).

**S06 — hold on the card (5.458–5.958, f131–143)**
- Diagonal drift (0.45 % W/s), scale +0.1 %/s, roll +0.2°/s; never frozen.
- The crane keeps flapping inside the card art.
- **Transition out:** **hard cut at f143 (5.958)**, 0.198 s after the groove starts (grooveA at 5.76).
- **SFX:** music grooveA at 5.76.

**S07 — loupe macro on the foil strip (5.958–8.083, f143–194)**
- **Build:**
  - The card-face art is re-rendered frontal and magnified, so the object-anchored screen reads 3.7–3.9 % H. Content gets blur 0.5 px.
  - `HoloBand` across the full width: height 8.9 % H, top 44.2 % H; band stops as A5.6.
  - Emblem: *our* small guilloche rosette (not a dot ring).
  - Text **"5% REWARDS ON ONLINE SHOPPING"**: Lexend 500 caps, tracking 0.43 em, cap 2.8 % H (30 px), white, `text-shadow 0 0 8px rgba(255,255,255,.35)`, line centred at 49 % H spanning about 64 % W.
  - Glint: a white radial blob 20 % W wide, `screen` at 0.35, travelling left to right at 50 % W/s from 6.2 to 7.9 s.
- **Duotone:** mint LUT #63985a / #63cd91 / #cffcc6, ink #386049.
- **Lens:** macro loupe, screen-locked: R50 0.46 W, centre (51 % W, 53 % H), edge table A6.2, outside #0b0d0c (`Lens.tsx`, r50 0.814 H).
- **Camera:** linear push +3.7 %/s (scale 1 → 1.079 over 51 frames), no pan, no roll.
- **Transition in:** a hard cut from S06, with the text already present (no entrance).
- **SFX:** `glass_shimmer` at 6.62 (+0.66 s after the cut). Use key-matched partials Eb7 / G7 / Bb7 / Eb8 = 2489 / 3136 / 3729 / 4978 Hz, at −10 LU vs bed.

**S08 — push-through (8.083–9.417, f194–226)**
- **Camera (same content group, one curve):**
  - scale 1 → 2.85 and translateX 0 → −67 % W;
  - easeInCubic over f194–212 to a peak of +8.3 %/frame and −128 % W/s;
  - then `Easing.bezier(0.16,1,0.3,1)`, still decelerating under the swap;
  - transform-origin at the band's right third;
  - starts 2 frames before beat 17 (8.16); the peak falls between beats.
- **Effects:**
  - `<CameraMotionBlur shutterAngle={180} samples={10}>` over f205–220;
  - focus-breathing blur 0 → 1.2 → 0.4 px.
- **Text:** exits left through the lens edge by camera motion only. "5% REWARDS" leaves first; "…PING" is the last fragment.
- **Transition out:** **lens-swap drop** f226–241 (16 frames). Per frame:
  - centre X % = 65.6, 56.6, 51.8, 49.6, 48.4, 47.7, 47.5, 47.4, 47.4, 47.5, 47.8, 48.5, 49.5, 50.1, 50.4, 50.6;
  - centre Y % = −2.8, 24.9, 46.0, 59.1, 67.7, 72.8, 75.3, 75.7, 75.1, 72.9, 67.2, 59.8, 56.1, 54.1, 53.0, 52.5;
  - linear between keys;
  - incoming layer = `clip-path: circle(47.5vw at X% Y%)` plus a black ring;
  - the lens passes centre at about f230 (≈ beat 20 = 9.60).
- **SFX:** `whip_pair` (mono, −13 LU vs bed): tick 9.33; block 1 9.40–9.63 straddling the swap; block 2 9.79–10.01.

**S09 — pole rosette (9.417–10.542, f226–253)**
- **Subject (3D, the same scene as S10):**
  - Our engraved globe seen straight down over the North Pole.
  - 24 meridians + 8 latitude circles form a guilloche-like rosette, with a central diamond pole marker.
  - 8 micro airliner icons (2.3 % H) in an elliptical ring.
- **Palette:** peach paper #fae9bb, ink #3b3634, wash pink / yellow / mint at 15 % multiply.
- **Lens:** under the lens, at higher magnification than S08 (the swap rule).
- **Camera:** settle from the swap, then **dead still f241–253** (0.5 s).
- **Text:** none.

**S10 — pattern becomes world (10.542–11.667, f253–280)**
- **Build (`@remotion/three`):**
  - PerspectiveCamera with FOV 75°.
  - Iris-out f253–260: R 47.6 → 54 % W, `Easing.in(Easing.quad)`; drop the overlay once off-frame.
  - Pitch −90° → −2° over f253–279 with `Easing.bezier(0.6,0,0.2,1)`; height 14 → 1.7 units on the same curve, delayed 3 frames.
  - The graticule extrudes into a 3D globe: sphere plus world-atlas 1:50m land as raised relief (`models2.ts` globe).
  - The diamond becomes a stepped plinth.
  - An airliner orbits at 1.4 R, one revolution per 4 s.
  - Backdrop: a plane at z −30 with our engraved cloud-bank horizon (procedural fbm iso-lines), opacity 0 → 1 over f271–276.
  - Side objects slide in over f276–285 with `Easing.out(Easing.cubic)`, x ±6 → ±2.8 units, yaw ±28°: an engraved hotel bell from the left, a suitcase from the right.
- **Duotone:** crimson4 on objects; cream paper #dbcdb9.
- **Camera:** the tilt starts on beat 22 (10.56); peak screen flow about 54 % W/s.
- **SFX:**
  - `air_riser` 10.40–11.16, peak 10.83 at maximum tilt speed (−26 LU);
  - `jet_pass` 11.0–13.4 as the airliner's world sound (−9 LU) [Guessing level].

**S11 — hero composition (11.667–14.083, f280–338)**
- **Composition:**
  - globe on plinth, centre-bottom;
  - bell on the left third, yawed toward centre;
  - suitcase on the right third;
  - faint grey engraved wire-globe and arch drawings in the paper sky at 2.2 % H spacing.
- **Camera:**
  - dolly-in finish: zoom per frame 1.011 → 1.000, `Easing.out(Easing.exp)`, ends f297;
  - **locked hold f297–338 (1.7 s)**: flow ≤ 0.02 px/frame; only foil moves.
- **Foil (`FoilGL`, overlay):**
  - globe oceans, glint sweep 12.4–13.6 s;
  - suitcase tag, 12.9–14.0 s (stagger 0.5 s);
  - card-glint timing from A5.4.
- **Text:**
  - Headline, two lines, top-centre: **"redeem on flights." / "and hotels."**
    - Newsreader opsz 72 / 600 / −0.03 em, lowercase;
    - x-height 4.4 % H, leading 7.5 % H, cap top 7.2 % H;
    - ink core #741739, sheen #b5737b at 6 % W/s.
  - Subline: **"with the CRED IndusInd Bank RuPay credit card"**, Lexend 500, x-height 1.4 % H, #5d2e2b, at 24–27 % H.
  - **Entrance:** drop from above the frame over f283–301 (7 frames linear at 2.6 % H/frame, then 11 frames `Easing.out(Easing.cubic)`), no fade.
- **SFX:** `desk_bell` (Eb, root 1244.5 Hz) at 11.87 when the bell lands (−7 LU) [Guessing level]. No SFX on the headline.

**S12 — orbit and card-slab matte wipe (14.083–15.333, f338–368)**
- **Camera:**
  - azimuth 0 → +18° around the plinth pivot, `Easing.in(Easing.quad)` over f338–368;
  - background objects drift left, accelerating.
- **Headline:** fades out over f338–350 while scaling ×1.15, reading as world-space.
- **Foreground matte object:**
  - a giant card standing on its long edge near camera, with an engraved crimson face and a foil edge stripe;
  - enters from the left at f350 and sweeps right;
  - about 22 % W wide on screen.
- **Matte wipe f357–368** (beats 31 → 32): the next scene sits below, `clipPath: inset(0 0 0 ${edge}%)` on the old one, with edge % = 0, 7.2, 16.2, 28.4, 42.2, 55.6, 67.2, 76.9, 84.7, 90.9, 95.6, 100.
  - The slab's left edge sits exactly on the edge.
  - No crossfade, no blur.
- **SFX:** `low_wash` 14.82–15.9 (−0.06 s before the wipe, centroid about 850 Hz, −5.5 LU).

**S13 — the products world (15.333–18.250, f368–438)**
- **Layers** (parallax recipe A9 "living stills"):
  1. Backdrop: locked lavender gradient #c2b4d7 → #b3b2ce.
  2. Far layer: engraved hills of stacked parcels, drifting at 0.7× the midground.
  3. Midground: engraved shelves and parcels drifting +8 → +0.4 % W/s, `Easing.out(Easing.quad)` over the shot.
  4. Secondary life: 6–8 small engraved hot-air balloons carrying gift boxes, moving left at −6 % W/s with a sin bob of 0.6 % H and 1.1 s period, phase-offset per sprite.
  5. Hero: a large gift box, 3D engraved lavender4, moving +8 % W/s and scaling 1 → 1.25 (approach), yaw +10°/s.
     - **Foil:** pearl thin-film on its ribbon only (`FoilGL` RAMP_PEARL, overlay).
- **Text (locked, revealed by the wipe, no entrance):**
  - Headline, top-centre: **"2,000+ products."** Indigo #49298c with a teal sheen #4fb6c8 travelling 6 % W/s; x-height 4.7 % H; cap top 8 % H.
  - Subline: **"redeem on CRED store"**, Lexend, x-height 1.9 % H, #2d155a.
- **Glass card** (37 % W × 40 % H, centred under the subline, `backdrop-filter: blur(6px)`, rgba(150,130,210,0.35)):
  - label "redeem on" in tracked caps at 1.1 % H;
  - rows "flights", "hotels", "2,000+ products" at a 12 % H pitch;
  - the "hotels" row is active (teal → lavender bar #57c1c9 → #9b8fd0); the others are pixel-smeared (feMorphology + horizontal feGaussianBlur stdDeviation "12 0");
  - **at f415 (17.28, the music drop and one bar after the reveal)** the active bar steps to "2,000+ products", and "2,000+" counts up over 12 frames.
- **Transition out:** **hard cut at f438** (≈ beat 38) on a music transient.
- **SFX:** the music drop at 17.28 (mid-shot, as in the reference). No UI SFX.

**S14 — giant "5%" under the loupe (18.250–19.667, f438–472)**
- **Build (`@remotion/three`):**
  - "5%" as `TextGeometry` from a wide slab serif (Alfa Slab One or Ultra, OFL TTF fetched from github.com/google/fonts and converted via `TTFLoader`), depth 0.35 em;
  - faces cream #efe6cf with a horizontal hatch (period 1.8 % H);
  - sides flat #075529 / #17683b;
  - standing on the card's engraved face, green #0c2a14 → #e3f3cb at 40 % contrast so it reads as aerial distance;
  - camera elevation about 5°, framing only the lower third of the letters.
- **Lens:** macro loupe R 0.465 W.
- **Camera:** content pull-back, scale = 1 + 0.06·exp(−(f − 438)/11).
- **Loupe-swap rig, L = f472** (≈ beat 41):
  - dip +24 % H at f455–462 (`Easing.inOut(Easing.sin)`);
  - hold to f464;
  - back by f467;
  - fling translate(+24 % W, −90 % H) over f468–470 (`Easing.in(Easing.quad)`, motion blur 4 samples);
  - new lens at translate(−5 % W, +25 % H) on f471, in place on f472.
- **SFX:**
  - break at 19.20 (mid-shot; the bed drains: sub −19 → −27 dB, RMS −23 → −30 dB);
  - whip with tick for the swap (−5 LU, breakdown level): tick 19.30, block 19.37–19.58 ending 2 frames before f471; answer block 19.75–19.95.

**S15 — the seal (19.667–21.125, f472–507)**
- **Subject (SVG):**
  - Our medallion: 60 concentric rose-curve strokes r = R + a·sin(kθ + φ) (1 px), on a disc of radius 40 % H;
  - double outline #12130f / #2e5233;
  - fill radial #c5d3a4 → mint;
  - an engraved chip at the centre;
  - ring text along a circle path: **"CRED · INDUSIND BANK · RUPAY CREDIT CARD ·"**, tracked caps at 2.4 % H.
- **Paper:** cream laid paper #e0dac0 / #f0e9d2 with mottle ×5 (A4.3).
- **Camera:** settle-back, scale = 1 + 0.07·exp(−(f − 472)/12).
- **SFX:** `sparkle` at 20.17 (+0.5 s after the settle; −1.5 LU, breakdown level). Pre-drop sub gap 20.62–21.12.

**S16 — whole card, then whip (21.125–23.375, f507–561)**
- **Pull-back** f510–548, starting on the 16th after drop 2:
  - log-scale `scale = exp(lerp(ln 2.22, 0, B(p)))` with B = cubic-bezier(0.75,0,0.3,1);
  - the peak (about −5 %/frame) lands on f530 = beat 46, the frame where the card edges enter;
  - the card ends at 60 % W × 67 % H on a black void.
- **Background:**
  - a faint violet-grey guilloche rosette (period 4 % H, rgba(175,165,195,0.13)) fades out over f580–590;
  - the lens radius grows ×1.11 and fades over f520–540 (the iris opens by camera).
- **Duotone:** #304a32 → #e5dac2.
- **Foil:** the card shows its vertical holographic strip at 84 % of its width (2 % of width).
- **Whip-out** f551–561:
  - translate along 22° up-right to (+110 % W, −45 % H) with `Easing.in(Easing.poly(2.5))`;
  - rotateZ 0 → 4°, rotateY 0 → −25° (perspective 1200px), scale 1 → 1.15;
  - `CameraMotionBlur` 180° / 8;
  - the last frame must be ≥ 99 % black.
- **Transition out:** **hidden cut at f561** (≈ 1 frame before the 16th at 23.40), a match on action.
- **SFX:** none on the pull-back or whip (as in the reference). Music drop 2 at 21.12.

**S17 — the card, in the studio (23.375–26.875, f561–645)**
- **Build:**
  - The same card mesh (C3), body graphite, in a black studio.
  - Two `RectAreaLight` strip softboxes behind-left and behind-right give rim lines; no fill.
  - Violet rim #3d3b4b on the right edge.
  - Floor glow: `radial-gradient(ellipse 60% 45% at 56% 100%, #d6d6d6, #6a6a6a 45%, #0a0a0a 85%)`, opacity 0 → 1 over f572–620.
- **Entrance sequence:**
  - **f561–572:** the card enters carrying the whip's energy (roll 12° → 0 in 5 frames, spring stiffness 158, damping 25), and the flat engraved print from S16 flies in as a curved sheet.
    - Sheet: `PlaneGeometry` 64×16 segments bent along a `CatmullRomCurve3`, with sin flutter; deterministic, no physics; emissive #3f8f4a at 0.6.
    - It arcs over the card and laminates onto its face.
  - **f572–582:** the face "powers on" from the bottom up (clip inset 100 → 0 %, expo-out) with a green edge flare #70c37a.
  - **f572–592:** the card glides from 44 % to **68.4 % W**, scale 0.8 → 1, `Easing.bezier(0.16,1,0.3,1)`, ending portrait, 72 % H tall, yaw about 25°.
- **Copy** (sits behind the card in z, so the card's edge wipes it on):
  - Headline **"zero joining fee."**: Newsreader, x-height 3.8 % H, **grey #a8a8a8**, left-aligned at 19.4 % W, baseline 48.6 % H.
  - Subline **"5% rewards" / "on online shopping"**: Lexend, x-height 1.6 % H, leading 4.2 % H, #d0d0d0, 5.3 % H below the headline.
  - Opacity 0 → 1 over f572–588 with a +3 % W → 0 counter-slide (same easing).
  - Readable from about 24.5 to 26.08 (1.6 s).
- **Hold f592–626:**
  - camera locked;
  - specular sheen crosses the headline at 6 % W/s (width 5 % W, +33 % brightness);
  - the floor glow keeps rising.
- **Lights-out f626–643** (starts 2 frames before the 8th at 26.16):
  - card face brightness 1 → 0.06 and saturate → 0 over 10 frames, `Easing.in(Easing.cubic)`;
  - glow opacity → 0 over frames 3–17;
  - copy +5 % W and fade over 16 frames, ease-in;
  - card −10 % W and rotateY → −70° over 18 frames, ease-in;
  - the rim fades last;
  - **2 frames of pure #000 at f643–645.**
- **SFX:**
  - whoosh (3–15 kHz) at 23.84 for the face-on (−15 LU);
  - no SFX on the copy.

**S18 — lockup and end (26.875–30.000, f645–720)**
- **Cut from black on the bar** (outro at 26.88).
- **Default (no official files):** a type-only lockup, white #ffffff on #000000.
  - "CRED IndusInd Bank" / "RuPay credit card" in Lexend 700 caps, tracking 0.2 em, cap height 3.0 % H, two lines, 1.9 % H gap, block centred at 49.6 % H.
  - Rises 2.8 % H over f645–657 with `Easing.bezier(0.16,1,0.3,1)`.
  - Hold f657–680.
  - Linear fade f680–694.
  - Black f694–720.
- **If official logo files are supplied** (brand scout or the user; "official files or nothing"):
  - the emblem swings in edge-on → face over 6 frames (rotateY 90 → 0°, hinge at 90 % x, perspective 700px);
  - brushed-metal gradient (#4d4d4d / #bdbdbd / #8f8f8f / #e0e0e0);
  - crossfade to flat white over 10 frames;
  - then the wordmark rises (cap 3.6 % H, emblem 10.8 % H).
- **SFX:**
  - `chord_bloom` at 26.93 (+0.05 s after the cut, +2 LU);
  - `end_riser` 27.9–28.85 (−27 LU);
  - `end_bell` at 28.80 (Eb-key chord, 0.24 s echoes, −11.6 dB/s decay), ringing to 30.0 with a 100 ms final fade (no hard stop).

### Sound plan (summary)
- **Score command:**

  ```
  python3 -I cred_score.py --seconds 30 --sections "intro=3.84,grooveA=5.76,drop=17.28,break=19.2,drop2=21.12,outro=26.88,tail=28.8" --lufs -14 --out score.wav
  ```

- **Cue count:** 15 cues in 30 s, 0.5/s (the reference has 0.41/s; ours is denser because the film is compressed), ≤ 2 starts per 1 s window.
- **Cue list:** pen_scribble, reverse_swell, wing_flutter, lens_swell, glass_shimmer, whip_pair, air_riser, jet_pass, desk_bell, low_wash, whip, sparkle, whoosh, chord_bloom, end_bell; plus the `air_bed` ambience.
- **Departures from the reference** (our rules, deliberate):
  - −14 LUFS integrated (reference −16.9), ≤ −1 dBTP;
  - target LRA ≥ 9 LU (reference 11.9);
  - a deliberate 0.50 s silent head and a 0.15 s dead gap (film_qa needs a style exception for both).

---

## C. Production pipeline

### C1. Packages (exact; proven in a scratch copy of motion-kit unless marked)
Installed in the repo already: remotion and all @remotion/* **4.0.534**, react / react-dom **19.2.3**, Node 22.22.0.

```
npm install --save-exact @remotion/three@4.0.534 three@0.178.0 @react-three/fiber@9.2.0 @types/three@0.178.1 \
  world-atlas@2.0.2 topojson-client@3.1.0 @remotion/motion-blur@4.0.534 \
  @fontsource-variable/newsreader@5.3.0 @fontsource/lexend@5.3.0
```

- **Proven:** three, fiber and @remotion/three render headless at 1080p, bit-identical across runs (tech study). world-atlas and topojson are proven too.
- **Exists on npm, MIT, not yet rendered here:** @remotion/motion-blur.
- **Exist, OFL-1.1, not yet rendered in Remotion:** both @fontsource packages.
- **Avoid:** fiber 9.8.1 and three 0.186.1 (untested), and @react-three/postprocessing (not needed; do bloom with CSS).

### C2. Render
```
npx remotion render src/index.ts CredCardV2 out/cred-card-v2.mp4 --gl=swangle --concurrency=2 \
  --browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
```

- **GL flag:** every `--gl` value gives WebGL2 on SwiftShader here; `--gl=default` is invalid in 4.0.534. Use `swangle`, or `Config.setChromiumOpenGlRenderer('swangle')`.
- **Cost:** 0.19 s/frame (empty paper) to 0.70 s/frame (254k triangles with antialiasing); tabs don't help on 4 CPUs.
- **Estimate** [Likely]: 720 frames ≈ 5–9 min base, plus 2–4 min for about 41 motion-blurred frames at ×8–10 samples, plus `Lens.tsx` double-rendering in lens shots.
- **Turn antialiasing off** above 150k triangles (−40 % cost).
- **Determinism:**
  - drive the camera and all animation from `useCurrentFrame()`, never R3F's clock;
  - `THREE.ColorManagement.enabled = false`, textures `NoColorSpace`;
  - `mixer.setTime(frame/fps)`;
  - seed all noise by frame;
  - load glTF with `useLoader` inside the canvas (not `useEffect` + `delayRender`, which renders blank frames).
- **Delivery fps:** 24 fps to match the reference cadence and all per-frame keyframe lists. If 30 fps is mandated, resample every keyframe list by time, not by index.

### C3. Shaders and effect code (copy into `motion-kit/src/custom/cred/v2/`; all original code, no reference pixels)
| Need | Use | Location | Key parameters |
|---|---|---|---|
| Engraving material (per object, Remotion-proven) | `engrave2()` ShaderMaterial | `RC/tech/mk/src/lab/engrave2.ts` (+ `models2.ts`, `Subjects.tsx`) | periodFrac 0.0065–0.0077 (scene-dependent: lighthouse 0.0056, columns 0.0069, flowers 0.0077, lens 0.0105), angle 45, wobble 0.7 (0.3–0.4 for 1080p hero shots), fill 0.4, toneGamma 1.05 (4-stop) / 1.2, dmax 0.8, tHi 0.75, covGamma 1.6, detail 0.25, albedoNoise 0.35, grain 0.015, mottle 0.04 |
| Calibrated GLSL (reference implementation) | post-pass and material | `RC/engraving/shader/engraving.frag.glsl`, `engravingMaterial.{vert,frag}.glsl`, `RC/engraving/web/engravingPass.js` | `uPhaseMode` 0 = screen-locked, 1 = UV, 2 = object plane. **Add mode 3 = object-anchored, screen-oriented**: phase from `vRel = (MV·pos) − (MV·origin)` in view space (formula in `RC/making-of/proto/engrave.js`). Params JSON in `RC/engraving/params/calibrated.json`; lens preset periodFrac 0.0105, fill 0.65, aa 2.0, covGamma 1.0 |
| Level matching | `match_levels` / `cg_levels.py` | `RC/engraving/src/engrave.py`, `src/cg_levels.py` | reference tone quantiles 5/50/95: columns 0.034 / 0.484 / 0.927; use object-only crops |
| Posterised hero (crane) | new: 3-level posterise + threshold-noise mezzotint | — (new) | luma peaks 114 / 174 / 218; cell 2–3 px; no line screen |
| Duotone / tritone | `Duotone.tsx`, `tritone()`, LUTs | `RC/fx/proto/remotion/src/fx/Duotone.tsx`, `measured.ts`, `RC/fx/proto/luts/*.cube` | feColorMatrix (Rec.709) + 16-value feComponentTransfer |
| Paper | `Paper.tsx` | `RC/fx/proto/remotion/src/fx/Paper.tsx` | mottle 0.035 @ 0.015, grain 0.10 @ 0.10, soft-light, static; ×5 mottle for the seal paper |
| Foil (WebGL) | `FoilGL.tsx` + `foil.frag.glsl` | `RC/fx/proto/remotion/src/fx/FoilGL.tsx`, `foilShader.ts`, `RC/fx/proto/foil.frag.glsl` | overlay; presets pearl (sat 0.82, val 0.55, cycles 1.25) / shell; RAMP_CARD for glints; phase driven by object/camera motion, never by time alone |
| Foil (fallback) | `FoilCSS.tsx` | same folder | weaker (hue overlap 0.77) |
| Lens | `Lens.tsx` (`LENS_EDGE`, `irisIn`, `irisOut`) | same folder | r50 0.814 H, cx 0.505, cy 0.52, rim blur 2.2 px, rimSat 0.75. Widen the feather if score.py measures < 0.15 H (prototype measures 0.092 H by score.py vs 0.158–0.167 H in the reference) |
| Holographic band | `HoloBand.tsx` | same folder | stops from A5.6, tracking 0.43 em (Lexend). Replace any emblem with our rosette |
| Headline sheen | `Sheen.tsx` (`SheenText`) | same folder | speedW 0.025–0.11, sigmaW 0.047. Verify inside transformed parents (it uses `background-attachment: fixed`) |
| Subjects | `models2.ts`: card (85.60×53.98, bevel, chip), globe (world-atlas), hotel bell, suitcase, gift box, shopping bag, balloon, origami crane, "5%" TextGeometry | `RC/tech/mk/src/lab/` | card `ExtrudeGeometry(roundRect(8.56,5.398,r .32), depth .06, bevel .012)` |
| Motion blur | `@remotion/motion-blur` `<CameraMotionBlur>` | npm | shutter 180°, samples 8–10, only around velocity peaks |

### C4. Sound tools (port as new tools at 44.1 kHz; `sfx_synth.py` runs at 24 kHz and cannot make the 12–15 kHz air)
| Tool | Location |
|---|---|
| Score | `RC/audio/proto2/cred_score.py` (125 BPM, Eb, sections snap to bars, writes `.beats.json`) |
| SFX (25 recipes) | `RC/audio/proto2/cred_sfx.py` |
| Cue rules → cue sheet → mix | `RC/audio/proto2/cue_rules.json` → `make_cues.py` → `render_cues.py` (one mixed WAV + stems; use a single `<Audio>` in Remotion) |
| Level calibration | `calibrate.py --hybrid` |

Calibrated levels vs bed (LU): whip −13 (groove) / −5 (breakdown), air_riser −26, low_wash −5.5, glass_shimmer −10, sparkle −1.5 (breakdown), wing_flutter −6, lens_swell 0, chord_bloom +2, end_bell −12.5, end_riser −27. Pen scribble −12 and reverse swell −8.6 are relative to the film's integrated loudness.

### C5. Assets and licences
| Asset | Source | Licence | Reachable here? |
|---|---|---|---|
| All subjects in the plan | procedural three.js (`models2.ts`) | ours | yes |
| Continents | world-atlas 2.0.2 (Natural Earth) | ISC / public domain | yes (npm) |
| Headline / sans fonts | @fontsource-variable/newsreader 5.3.0, @fontsource/lexend 5.3.0 | OFL-1.1 | yes (npm) |
| TTF for 3D "5%" (Alfa Slab One / Ultra / Newsreader) | github.com/google/fonts `ofl/...` via raw.githubusercontent.com | OFL-1.1 (conversion allowed) | yes |
| Droid Serif typeface JSON (fallback for 3D text) | three@0.178.0 `examples/fonts` | Apache-2.0 | yes |
| Optional richer props: Poly Haven vintage_suitcase, brass items, vintage_pocket_watch | api.polyhaven.com via **GitHub runner** (`RC/tech/workflow-draft/assets-cc0.yml` + `fetch_cc0.py`) | CC0 | runner only |
| Khronos CC0 models (not needed) | KhronosGroup/glTF-Sample-Assets | 62 of 150 fully CC0 (`RC/tech/assets/khronos/licences.json`) | yes |
| **Do not use** | three.js Parrot / Flamingo / Stork / Horse (no licence), Khronos Duck / DamagedHelmet / Fox parts, pokemon-cards-css (GPL; concept only), 4rknova foil code (all rights reserved) | — | — |

### C6. What is not feasible code-only, and the best alternative
| Gap | Why | Best alternative |
|---|---|---|
| Live animal footage like the hummingbird | No CC0 animated-bird glTF or video reachable with a clear licence | Our origami crane (code, posterised), as planned. Optional: AI video clip with alpha (Higgsfield / Kling via MCP); **needs the user's approval of the credit cost**. Quaternius CC0 animal packs via the GitHub runner (unverified mirror) |
| Photographic richness of the reference plates (cut-out photos / renders) | Clean CG reads as stripes without texture | Albedo noise 0.35 + bump micro-texture (calibrated). CC0 Poly Haven models via the runner (free). Optional AI-generated stills as tone plates through our engraving pass; **cost approval required** |
| Official logos and the real card design | Not in the repo; "official files or nothing" | Brand scout (GitHub runner) or files from the user. Until then: type-only lockup, and a stylised card with no logos, marked as spec work |
| Produced, mixed music | numpy synthesis matches levels and shapes, not polish; nobody has listened yet | A/B listen to `RC/audio/proto2/example46/mix46.wav`. Alternatives: licensed track or AI music (Magnific / Higgsfield audio), **cost approval required** |
| CRED's real typefaces | Commercial, unknown | Newsreader / Lexend stand-ins (metric matches) |
| Physical cloth simulation | Non-deterministic in parallel tabs | Spline-bent plane (deterministic), as planned |

---

## D. Similarity scorecard (run on our render)

**Command:**

```
python3 -I RC/scorecard/score.py out/cred-card-v2.mp4 --shots RC/scorecard/v2_shots.json --json v2.json
```

**What the tool computes:**
- film_qa flow and sound;
- ebur128 loudness, LRA and true peak;
- spike-event cut detector;
- per shot:
  - Lab PCA axis-1 share;
  - ink (darkest 5 %) and paper (lightest 5 %);
  - CIEDE2000 against the mapped reference shot;
  - saturated share;
  - line-screen period and angle (whitened 64x64 FFT at 640x360);
  - loupe circle fit and 10–90 feather;
  - Farneback + RANSAC camera zoom, pan and roll at 12 fps.

The reference values below were measured **with this same tool** (`RC/scorecard/ref_scorecard.json`; windows in `ref_shots.json`). It was validated on synthetic screens: 45° / 3.0 px reads as 45.0° / 3.02 px.

### D1. Global
| Metric | Reference | v1 | v2 target |
|---|---|---|---|
| Still frames (film_qa) | 17.8 % | 14.7 % | 15–24 % |
| Longest still, inside the picture | 2.33 s (5.4 s incl. end black) | 0.6 s | ≤ 1.7 s inside the picture |
| Median motion (film_qa) | **0.0182** | 0.0045 | ≥ 0.015 |
| Spike events / 10 s (score.py) | 2.75 | 0.67 | 2.3–3.3 |
| Hard cuts / 10 s (hand list) | 1.16 | about 0.7 | ≤ 2.0 (we plan 2.0) |
| Picture changes / 10 s | 2.2 | — | ≤ 3.0 |
| Longest continuous take | 10.46 s | 11.5 s | ≥ 4.5 s |
| Integrated loudness | −16.9 LUFS | −13.8 | −14 ± 1 (our rule) |
| LRA | 11.9 LU | 1.4 | ≥ 9 |
| True peak | −0.5 dBTP | −2.7 | ≤ −1.0 |
| Hit prominence | 3.3 dB | 3.8 | 2–6 |
| Onsets / s | 2.68 | 2.66 | 2.4–3.0 |
| Longest silence | 710 ms | 90 ms | ≤ 600 ms (0.50 s head is deliberate) |

### D2. Per shot (target ΔE00 ink ≤ 6, paper ≤ 5; screen angle 45 ± 5°; period within ±10 %; axis-1 within ±0.10)
| Our shot | Mapped ref shot | Ref ink / paper | Ref axis-1 | Ref saturated share | Ref screen (px@640 / °) | Ref lens R50/W | Ref zoom p90 (%/s) |
|---|---|---|---|---|---|---|---|
| S01 | R01 | #a5a5a6 / #dcdcdc | 0.996 | 0.00 | — (thick strokes) | — | 1.0 (truck: pan p90 0.9) |
| S02 | R02 | #969696 / #dcdcdc | 1.00 | 0.00 | — | — | 0.1 |
| S03 | R03 | #919191 / #eeeeee | 1.00 | 0.00 | 4.12 / 174 (guilloche) | — | 1.0 (pan p90 31.8 = wave flow) |
| S04 | R04 | #625975 / #eae9e9 | 0.80 | 0.22 | **2.58 / 44.5** | — | **17.8** |
| S05 | R05 | #162420 / #e7f0ed | 0.59 | 0.37 | (mixed) | 0.37 (wide) | 8.1 |
| S06 | R06 | #12201e / #e6f1ee | 0.72 | 0.36 | (mixed) | 0.36 (wide) | 0.1 |
| S07–S08 | R07 | #27352c / #ccf5c2 | 0.60 | 0.48 | 2.30 / 136 (weak) | **0.457** | **34.6** |
| S09 | R09 | #3b322a / #f8daa2 | 0.93 | 0.79 | — | 0.462 | 2.8 |
| S10 | R10 | #954a4e / #eacda6 | 0.74 | 0.74 | **2.50 / 45.5** | — | **101** |
| S11 | R11 | #8f424a / #ddccb6 | 0.63 | 0.53 | **2.50 / 46.0** | — | 2.5 |
| S12 | R12 | #97444c / #dfcebb | 0.83 | 0.53 | **2.73 / 45.0** | — | 30.4 |
| S13 | R13 | #4b437b / #d7d2ec | 0.82 | 0.13 | (weak) | — | 1.1 (moving share 0.88) |
| S14 | R19 | #193020 / #e4edca | 0.87 | 0.14 | 2.0 / 179 (face hatch) | 0.465 | 7.9 |
| S15 | R20 | #2b3427 / #f6f2db | 0.81 | 0.07 | — | (fit unstable) | 5.1 |
| S16 | R21 | #2a462c / #ebdec8 | 0.68 | 0.17 | — | (dissolving) | **82.2** |
| S17 | R23 | #1f1f1f / #fdfdfd | 0.999 | 0.00 | none (clean CG) | — | 0.0 (locked) |

**Prototype checks already run with this tool:**
- `RC/engraving/compare/stilllife_crimson4_motion_test.mp4`: 2.32 px at 44.7°; ink ΔE00 3.1 vs R11.
  - Paper ΔE00 is **11.3**, because the prototype used the 4-stop highlight #fbc4a7 as background.
  - **Rule:** objects take the tritone; the scene background stays the cream paper #dbcdb9.
- `RC/fx/renders/FxLens.mp4`: R50 0.469 W, centre (50.5, 51.8), outside luma 12 ✓, but feather 0.092 H against 0.158–0.167 H in the reference, so widen the feather. Peach paper ΔE00 3.3, ink 4.8 ✓.
- v1: ink / paper ΔE00 28.1 / 17.2 against the mint loupe scene.

### D3. Checks not in score.py (do by hand on stills)
- **Headline x-height:** 4.2–5.0 % H (product shot 3.8 %); subline 1.4–1.9 % H; band caps 2.8 % H with tracking 0.43 em. Measure ink-pixel extents on a frame.
- **Sync** (cue sheet vs EDL):
  - whip blocks end 1–3 frames before the swap;
  - groove 0.2 s before cut 3;
  - drop mid-shot;
  - wordmark ≤ 0.5 s after the outro hit;
  - the wipe edge passes 50 % on a beat.
- **Originality:** no subject from the reference list (B) appears; no reference copy line; no reference emblem.

---

## E. How close can this plan get (honest estimate)

"Closeness" here means how a motion designer would rate the frame and motion language side by side. The basis is the measured matches above, not taste. Overall: **about 65–72 %**, weighted by screen time (v1 was judged "5 %").

| Shot type | Estimate | Why |
|---|---|---|
| Opening line → scale steps → guilloche field → wash wipe (S01–S03) | **85–90 %** | Pure 2D, every number measured (pitch, stroke, speeds, wipe, audio gap). Only the paper texture is a calibrated stand-in |
| Loupe macro + holo band + push-through (S07–S08) | **80–88 %** | Lens matches (R50 0.469 vs 0.457–0.462; edge RMSE 0.006 by the fx method), band stats match (sat 0.26 vs 0.27), camera curve measured. Risk: the feather width and font stand-in |
| Lens swaps, seal, pull-back, whip (S08→S09, S14–S16) | **75–85 %** | Keyframe-exact rigs from the reference. Seal and rosette are simple SVG. The 3D "5%" is a strong code subject |
| Matte wipe (S12) | **80–85 %** | Edge path is exact; the slab is a simple object |
| World-into-object reveal + hold (S05–S06) | **65–75 %** | Camera, grade and darkness numbers are known, but they come from a ±30 % flow fit; the 3D tilt angle is a guess (40–55°) |
| Parcel assembly + crane (S04) | **50–60 %** | Choreography exact, but the reference used rich photo plates; ours are code-modelled parcels (good/passable subjects). The crane is a stylised stand-in for real animal footage |
| Pattern-to-world tilt + hero comp (S09–S11) | **60–70 %** | Globe and bell are strong code subjects; tilt and headline drop measured. Less architectural depth than the colonnade; the airliner model is only "passable" |
| Products world + glass UI (S13) | **55–65 %** | Parallax and UI grammar measured; balloons and gift boxes are simpler than the reference's photographic sea life. Foil on the ribbon is ok (pearl preset, hue overlap 0.87) |
| 3D card product shot (S17) | **60–70 %** | Lighting and choreography measured; the CG polish of a SwiftShader render is below a Blender render. No official card art |
| Lockup (S18) | **45 %** type-only / **85 %** with official logo files | The reference's metal emblem and deco plate need the real mark |
| Sound | **60–75 %** | Structure, tempo, loudness curve (correlation 0.958) and SFX shapes are measured, but it is numpy synthesis, unheard by a human. Mids in the drops are 2–3.5 dB light |
| Engraving at native 1080p | caps every engraved shot at about 85 % | Calibration was done at 360p (the only reference resolution). At 1080p, wobble 0.7 looks woodcut-like. Plan: wobble 0.3–0.4 for hero shots, judged by eye |

**Structural cost of 30 s:** the reference breathes (2.33 s holds, 3.2–4.0 s copy holds, a 10.46 s take). Our 30 s cut has 0.5–1.7 s holds and about 1.6–2.8 s of copy reading, so it will feel about 35 % busier.

**Raising the ceiling:**
- A 45 s cut (the audio prototype `example46` already exists) would restore the reference's pacing and should add about 5–8 points.
- CC0 or AI-generated photographic plates for S04 and S13 could add about 10 points on those shots.

---

## F. Guardrails
- Nothing derived from the reference (frames, crops, audio) goes into `/home/user/motion-graphic`. Only numbers and original code go there. `RC/fx/frames/all24.npy` (1.1 GB) stays in scratch.
- Do not copy CRED's illustrations, compositions, tagline ("take a good look at your money"), dot-ring emblem, banknote / "MONEY" lettering, or subject list.
- On-screen copy uses the sourced facts only. The card shown is a stylised spec design, not the real card; keep the "UNOFFICIAL SPEC WORK" header in the source, and draw logos only from official files.
