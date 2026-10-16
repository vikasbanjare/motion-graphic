# summary
I built and calibrated an engraving renderer two ways. Both use the same algorithm, so tuned parameters carry over between them unchanged:
- a Python/numpy offline filter: src/engrave.py
- a GLSL post-process for three.js / @remotion/three: shader/engraving.frag.glsl, wrapped by web/engravingPass.js
- an optional per-object material that has its own lighting and can make lines follow UV or object space: shader/engravingMaterial.{vert,frag}.glsl

**What the reference actually does (measured, not guessed):**
- **One straight line screen at about 45°** ("/" direction; measured range 38-52°).
- **Period 2.0-2.9 px at 360p**, which is 0.55-0.80% of frame height, or 6-8.7 px at 1080p. Under the magnifier lens it is 3.8 px (1.05% of height).
- **Line thickness grows with darkness.** Lines vanish in highlights (above tone 0.75) and never fully close in shadow. There is no systematic crosshatch.
- **In the column and lighthouse shots the screen is fixed in screen space.** The line phase stays still (|dphi| ≤ 0.04 rad) while objects drift 0.25 px per frame.
- **The flower collage uses pre-engraved artwork layers.** Their line period shrinks exactly with the layer's zoom (0.921 vs 0.919). That also rules out aliasing, so the measured periods are real.
- **Each scene is a 2-4 stop gradient map.** The main colour axis explains 93-99.7% of colour variance.
- **The lines are irregular.** Line-position noise is 0.19-0.25 periods, against our first version's 0.008.
- **Paper texture is measurable.** At 360p it has std 3.3 levels and a 1/f^2.2 spectrum, with a 13% darker vignette at the corners.

**Results:**
- **Our first renderer was far too clean.** Its lines were 10x too regular, and its fill and tone were wrong.
- **For clean 3D renders, I calibrated end to end.** Each test render went 1080p → 640x360 and was compared with the reference column. The error score (sum of log-ratio errors across all metrics) dropped from 5.47 to about 1.4.
- **The final 3D column now matches the reference column on 12 of 13 measures:**
  - line period 2.47 vs 2.48 px
  - edge density 1.08x
  - fine-texture strength (high-pass std) 28.3 vs 25.3
  - line-position noise 0.145 vs 0.160 periods; line regularity 0.64 vs 0.62
  - local line direction consistency 0.56 vs 0.55
  - colour difference (ΔE) 4.2; mean luma 117.7 vs 122.7
  - line contrast vs tone, shape correlation 0.83
  - The one gap: line contrast is 0.66x the reference.
- **The coin under the lens preset matches the lens close-up:** period 3.79 vs 3.79 px, histogram intersection 0.81, edges 0.97x, ΔE 5.7.
- **A 24-frame camera move reproduces the reference's screen-locked behaviour:** the line phase moves 0.016 rad while objects move 0.74 px.

**Two caveats:**
- **At native 1080p the tuned lines look rougher and more brush-like than a classic engraving.** The match is only proven at 360p, the only resolution we have the reference in.
- **Some reference scenes do not use a line screen.** The turtle and seabed scenes use a grainy photocopy look instead.

Everything is in /tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/. Nothing was written to the repo; `git status` is clean.

# parameters
{
  "files": {
    "glsl_postprocess": "<E>/shader/engraving.frag.glsl",
    "glsl_material_frag": "<E>/shader/engravingMaterial.frag.glsl",
    "glsl_material_vert": "<E>/shader/engravingMaterial.vert.glsl",
    "threejs_wrapper": "<E>/web/engravingPass.js (createEngravingPass, createEngravingMaterial, PALETTES, DEFAULT_PARAMS, CG_PRESET, LENS_PRESET, SMOOTH_INPUT_PRESET)",
    "python_filter": "<E>/src/engrave.py (engrave, prepare_fields, match_levels, DEFAULTS, LENS_PRESET, SMOOTH_INPUT_PRESET, REF_TONE_Q)",
    "json": "<E>/params/calibrated.json",
    "root_<E>": "/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving"
  },
  "default_shader_uniforms": {
    "periodFrac": 0.0065,
    "angleDeg": 45,
    "toneGamma": 1.2,
    "toneGamma_note": "use 1.05 with the 4-stop palettes; applied after black/white/gamma levels matched to the reference tone quantiles",
    "dmax": 0.8,
    "tHi": 0.75,
    "covGamma": 1.6,
    "fill": 0.4,
    "wobble": 0.7,
    "wobbleScale_periods": 2.77,
    "widthJitter": 0.1,
    "segLen": 4.0,
    "segJitter": 0.35,
    "segWidth": 0.3,
    "segGap": 0.2,
    "skew": 0.0,
    "detail": 0.25,
    "cross": 0.0,
    "outline": 0.0,
    "aa": 1.0,
    "grain": 0.015,
    "mottle": 0.04,
    "mottleScale": 0.012,
    "vignette": 0.13,
    "mode": 0,
    "inputLinear": 1
  },
  "per_scene_periodFrac": {
    "lighthouse": 0.0056,
    "columns": 0.0069,
    "flowers": 0.0077,
    "lens_closeup": 0.0105
  },
  "lens_preset": {
    "periodFrac": 0.0105,
    "fill": 0.65,
    "aa": 2.0,
    "covGamma": 1.0
  },
  "smooth_input_preset_360p_only": {
    "wobble": 0.9,
    "detail": 0.4,
    "segLen": 0,
    "fill": 0.55,
    "toneGamma": 1.15
  },
  "cg_materials": {
    "albedoNoise": 0.35,
    "bumpMultiplier": 2,
    "key_light": "directional (-4.5, 6, 5) intensity 3.2",
    "hemisphere": 0.55,
    "rim": 1.4,
    "shadow_catcher_opacity": 0.55
  },
  "column_levels_used": {
    "black": 0.298,
    "white": 0.913,
    "toneGamma": 1.05
  },
  "palettes_sRGB": {
    "crimson4": [["#7c2537", 0], ["#ae5669", 0.45], ["#dea688", 0.83], ["#fbc4a7", 1]],
    "mint4": [["#395a2d", 0], ["#7b9e6f", 0.45], ["#b9dda8", 0.83], ["#cdf0bc", 1]],
    "lavender4": [["#3b316c", 0], ["#615788", 0.45], ["#bcafcb", 0.83], ["#fdf4fd", 1]],
    "crimson3": [["#782b31", 0], ["#c1876e", 0.5], ["#e2d0bc", 1]],
    "violet3": [["#69458f", 0], ["#b280d4", 0.5], ["#f6e1fb", 1]],
    "forest": [["#112812", 0], ["#def3d0", 1]],
    "mint": [["#3b5a2e", 0], ["#caf1b8", 1]],
    "olive": [["#51692c", 0], ["#e5f3c8", 1]],
    "graphite": [["#101715", 0], ["#c2cbc7", 1]]
  },
  "reference_tone_quantiles_5_50_95": {
    "columns": [0.034, 0.484, 0.927],
    "lighthouse": [0.235, 0.671, 0.998],
    "green_rock": [0.104, 0.555, 0.94],
    "flowers": [0.181, 0.399, 0.983]
  }
}

# code_paths
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/shader/engraving.frag.glsl
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/shader/engravingMaterial.frag.glsl
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/shader/engravingMaterial.vert.glsl
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/web/engravingPass.js
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/web/scene.html
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/web/run.mjs
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/params/calibrated.json
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/src/engrave.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/src/metrics.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/src/cg_levels.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/src/cg_score.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/src/final_renders.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/src/compare_final.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/src/procedural_test.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/src/temporal_test.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/src/measure_lines2.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/src/phase_test.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/src/alias_test.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/src/modulation.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/src/phase_wobble.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/src/palette.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/src/paper.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/compare/column_shaft_vs_ref.png
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/compare/final_stilllife_crimson4_vs_ref.png
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/compare/final_coin_forest_vs_ref.png
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/compare/final_metrics.json
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/compare/resynth_metrics.json
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/compare/stilllife_crimson4_motion_test.mp4
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/compare/screen_post_vs_uv_material.png
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/compare/numpy_procedural_shaded_vs_engraved.png

# open_risks
- Our only reference is 640x360. Our 1080p frames match it after downscaling, but at native 1080p the tuned lines (wobble 0.7 plus dash breakup) look like rough woodcut strokes rather than a fine banknote engraving. For full-resolution hero shots, try wobble 0.3-0.4 and accept a looser 360p match; the motion designer should judge this by eye. [Likely]
- The calibration fits about 10 statistics, not appearance. It was tuned mainly on one reference column and one lens close-up. The still-life frames still score lower (histogram intersection 0.65-0.68, edge density 0.5x), mostly because our frames have more empty paper than the densely filled reference frames.
- Levels matching depends on which reference crop supplies the tone quantiles. The mint still life came out too light because the lighthouse crop is mostly bright sky. Use object-only reference crops, or the columns quantiles, as the default.
- Line contrast is still about 0.66x the reference on the column. Lowering fill toward 0.3 raises it to 0.74x but pushes high-pass texture to 1.24x; this trade-off is unresolved.
- Line thickness depends on luminance only, so flat dark materials engrave badly. The dark card came out flat (its 5th-95th percentile spread was under 0.15, so levels fell back to identity). Every subject needs real shading range and micro-texture before engraving.
- Several reference looks are out of scope for this renderer: the photocopy/threshold grain (turtle, grey seabed, hummingbird body), holographic foil, the lens vignette, the rainbow text band and guilloche backgrounds.
- The Python and GLSL noise use the same hash, but GPU float precision differs, so the patterns match statistically, not pixel for pixel. The parameter parity itself is exact.
- The UV-following material (phase mode 1) is implemented and rendered, but it is not calibrated. The reference's 3D shots use screen-fixed lines; layer-attached lines appear only in the 2D collage.
- No WebGL check has been done inside @remotion/three's ThreeCanvas yet; all tests ran in headless Chromium (SwiftShader) with three 0.169.0. The pass renders to its own targets, so wire it inside useFrame and verify deterministic frame-by-frame output in Remotion. [Guessing]

# findings
# Engraving renderer: measurements, calibration and comparison

All numbers below were measured on the 640x360 H.264 reference (24 fps, 520 kb/s), using f6 frames or ffmpeg 24 fps extracts. Our renders were made at 1920x1080 and downscaled to 640x360 with `cv2.INTER_AREA` before comparing.

Tags: **[Certain]** = directly measured and repeatable; **[Likely]** = strong evidence but an inference; **[Guessing]** = untested.

Root folder (called `<E>` below): `/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/engraving/`

## 1. What the reference engraving is

### 1.1 Line screen period and angle
Measured by FFT peak on a 48-96 px window, high-passed with σ=3, period band 1.95-6.5 px (`src/measure_lines2.py`, `src/timeseries.py`). Angle convention: degrees counter-clockwise from +x with y pointing up, so 45° = "/". The convention was checked on synthetic lines.

| Scene (time) | Period @360p | % of frame height | Angle | Tag |
|---|---|---|---|---|
| Lighthouse (32.5-35.5 s) | 2.00 px, constant over 3 s | 0.55% | 45-49° | [Certain] |
| Columns (22.5-25 s) | 2.48 px, constant over 2.5 s | 0.69% | 39-52° | [Certain] |
| Flowers (6-9 s) | 2.64-2.78 px | 0.73-0.77% | 38-52°, mode 51° | [Certain] |
| Green rock under lens (47-48 s) | 3.78-3.83 px | 1.05% | 41-45° | [Certain] |
| Paper guilloche (wavy background lines) | 6.9 px | 1.9% | ~166° | [Certain] |

### 1.2 Screen-space vs object-space
Method (`src/phase_test.py`): measure object shift by phase correlation on a low-passed image (σ=3), and compare it with the change in line-carrier phase at a fixed screen box.

- **Columns:** objects drift 0.14-0.28 px per frame; carrier phase changes ≤ 0.04 rad. If the lines were attached to objects, the change would be 0.34-0.77 rad. **The screen is fixed in screen space** [Certain for this shot].
- **Lighthouse:** 0.21-0.36 px per frame drift, carrier |dphi| ≤ 0.01 rad. Same conclusion [Certain].
- **Flower collage:** the line period follows the layer's zoom one-for-one (`src/alias_test.py`, ORB features plus similarity fit). Layer scale vs t=6.5 s against period ratio:

  | Time | Layer scale | Period ratio |
  |---|---|---|
  | 7.0 s | 0.987 | 0.989 |
  | 7.5 s | 0.982 | 0.982 |
  | 8.0 s | 0.969 | 0.975 |
  | 8.5 s | 0.960 | 0.961 |
  | 9.0 s | 0.919 | 0.921 |

  So these are pre-engraved artwork layers whose lines live on the layer [Certain]. Aliasing would make the period move in the *opposite* direction to the zoom, so the measured periods are true periods [Certain].

### 1.3 Line thickness vs tone
Method (`src/modulation.py`): demodulate at the measured carrier frequency and plot carrier amplitude against local tone (0 = darkest, 1 = brightest, normalised between ink and paper).

- Amplitude falls to about 0 above tone 0.6-0.8 (columns, flowers, lighthouse): **highlights are clean** [Certain].
- Amplitude peaks at tone 0.15-0.35 (dark midtones).
- At tone 0.05 it is still 55-73% of the peak, so **lines never fully close in deep shadow** [Certain].
- This fits a thickness-modulated screen with maximum ink coverage around 0.6-0.8 [Likely].

### 1.4 Crosshatch
Method (`src/crosshatch.py`): energy at the best angle at least 25° away from the main one, relative to the main angle. In the darkest quartile it is 0.24-0.44 — no higher than in midtones. **No systematic crosshatch** [Likely].

### 1.5 Line irregularity
Method (`src/phase_wobble.py`, `src/straightness.py`): local carrier phase, its correlation length, and structure-tensor orientation statistics.

| | Phase RMS | Regularity (coherence) | Correlation length | Local direction consistency | Angle spread |
|---|---|---|---|---|---|
| Reference | 0.19-0.22 periods (1.19-1.37 rad) | 0.38-0.53 | 4-6 px (~1.6-2 periods) | 0.43-0.57 | 15-41° |
| Our first version | 0.008 periods | 0.999 | — | — | — |

- An x264 round-trip at crf 30 does not lower our regularity (0.998), so **compression is not the cause** [Certain].
- Notching out the carrier frequency only lowers the reference's fine-texture std from 21.7 to 20.5 (lighthouse) and 24.0 to 23.0 (columns). So at 360p **most fine texture is photographic detail, not the screen** [Likely].

### 1.6 Duotone colours
Method (`src/palette.py`): principal-component analysis of object pixels in sRGB. The first component explains 0.93-0.997 of colour variance [Certain].

| Scene | Ink | Mid | Paper | Notes |
|---|---|---|---|---|
| Lighthouse | #3b5a2e | — | #caf1b8 | |
| Columns | #782b31 | #c1876e | #e2d0bc | Mid bends warm by 21 levels, so 3 stops |
| Flowers | #69458f | #b280d4 | #f6e1fb | Mid bends by 23 levels |
| Bird | #4c2e7c | — | #d0b8eb | |
| Leaves | #51692c | — | #e5f3c8 | |
| Turtle / seabed | #52466c | — | #e6ddf8 | |
| Grey seabed | #101715 | — | #c2cbc7 | |
| Green rock (lens) | #112812 | — | #def3d0 | |
| Money note | #1e592b | — | #e6e5cc | |

- Column luminance quantiles (darkest 5% / 20-40% / 70-90% / top 2%) show a **hue split**: ink #7c2537, shadow fill #ae5669 (pink-magenta), lit fill #dea688 (peach), highlight #fbc4a7 [Certain].
- In the calibration, the measured ink colours were already correct (best ink scale 0.9-1.1).

### 1.7 Paper
Method (`src/paper.py`).

- **Intro paper:** #d2d2d2. Fine-texture std 3.34, grain (<3 px) 1.83, mottle 2.28, spectrum slope -2.18. Radial luma 219.9 at the centre → 190.5 at the corners (about -13.4%) [Certain].
- **Money-note cream paper:** #e0dbc1, std 14-15, blob size about 9-10 px at 360p, spectrum slope -3.1 to -3.3 (a crumpled-paper look).

### 1.8 Other techniques in the film
The turtle, grey seabed and hummingbird body show **no line screen** (only 0.015-0.024 of band energy in the carrier). They use a threshold / photocopy grain look, which this renderer does not reproduce [Certain].

## 2. Calibration path

1. **Re-synthesis.** I estimated each reference crop's tone (low-pass), re-engraved it at 3x, downscaled, and grid-searched about 2,900 combos per scene (`src/calibrate.py`, `src/calibrate2.py`, `src/consensus.py`).
   - Fixing the line irregularity (wobble 0.9 periods at a 2.77-period feature size) cut the error score from about 2.0 to 0.37-0.71 per scene.
   - Line-energy ratio went from about 10x to about 1x.
   - Consensus for detail-poor input judged at 360p: fill 0.55, coverage curve 1.6, max coverage 0.8, tone gamma 1.15, detail 0.4, lines vanish above 0.75 (`out/consensus.json`; worst scene error 1.03).
   - A balanced final search confirmed this as the best re-synthesis setting (total 9.06 vs 14-18 for the alternatives).
2. **Visual check at 1080p** showed that wobble 0.9 makes "wormy" fingerprint lines. It works at 360p only because it stands in for missing photographic detail.
3. **I added line breakup and a CG calibration.** Breakup splits each line into short straight dashes with their own small offset, width and occasional gap. The CG calibration rendered three.js frames through Playwright with materials carrying albedo noise and bump micro-texture, plus levels matched to the reference tone quantiles.
   - Two grids of 48 renders each (`src/cg_score.py`). Error score: 5.47 → 2.60 → 1.34.
   - Best: wobble 0.7, detail 0.25, dash length 4 periods, jitter 0.35, width variation 0.3, gap 0.2, albedo noise 0.35.
   - With the 4-stop palette, a further sweep picked fill 0.4 and tone gamma 1.05 (error 1.447).
4. **Paper grid** (`src/calib_paper.py`): grain 0.015, mottle 0.04, mottle scale 0.012 of frame height. This gives 360p stats [3.55, 1.82, 2.36, -2.21] against the reference's [3.34, 1.83, 2.28, -2.18].

## 3. Our results vs the reference

All comparisons are at 360p (`compare/final_metrics.json`, `compare/resynth_metrics.json`, `compare/numpy_procedural_metrics.json`).

### 3.1 3D column shaft vs reference left column, t=23 s (`compare/column_shaft_vs_ref.png`)

| Measure | Ours | Reference |
|---|---|---|
| Line period | 2.47 px (ratio 0.996) | 2.48 px |
| Angle | 44.8° | 38.7° |
| Luma histogram intersection / EMD | 0.771 / 6.8 levels | — |
| Mean luma | 117.7 | 122.7 |
| Edge density (Canny 60/140) | 0.343 (ratio 1.08) | 0.318 |
| Fine-texture strength (high-pass std) | 28.3 | 25.3 |
| Carrier share of band energy | 0.059 | 0.070 |
| Line-position noise (phase RMS) | 0.145 periods | 0.160 periods |
| Line regularity (coherence) | 0.641 | 0.617 |
| Local direction consistency | 0.558 | 0.554 |
| Angle spread | 12.9° | 14.8° |
| Line contrast vs tone: shape correlation | 0.83 | — |
| Line contrast vs tone: amplitude ratio | 0.66 | — |
| Colour difference (ΔE, matched quantiles) | 4.2 | — |

### 3.2 Other 3D subjects

| Subject vs reference | Period (ours / ref) | Hist. intersection | Edges | Fine texture (ours / ref) | Carrier share (ours / ref) | ΔE | Other |
|---|---|---|---|---|---|---|---|
| Coin (lens preset) vs green rock 47.5 s | 3.79 / 3.79 | 0.815 | 0.97x | 38.1 / 36.0 | 0.094 / 0.137 | 5.7 | |
| Card (violet) vs flowers 6 s | 2.76 / 2.78 | 0.81 | 1.10x | — | — | 16.6 | Curve shape correlation 0.98 |
| Still life (crimson4), region | 2.34 / 2.48 | 0.68 | 0.50x | 15.4 / 21.1 | — | 15 | Our frame has more empty paper |
| Still life (mint4), region | 2.34 / 2.00 | 0.65 | — | — | — | 8.2 | Comes out too light, see risks |

The sphere vs turtle pairing is not valid: the turtle scene has no line screen (its period reading of 6.05 px is noise).

### 3.3 Re-synthesis with the smooth-input preset (`compare/resynth_*.png`)

| Scene | Period ratio | Carrier share (ours / ref) | Regularity (ours / ref) | Edges | Curve shape correlation |
|---|---|---|---|---|---|
| Lighthouse | 1.000 | 0.059 / 0.058 | 0.52 / 0.53 | 1.07x | 0.96 |
| Columns | 1.006 | — | — | 0.94x | 0.95 |
| Flowers | 1.002 | — | — | 1.21x | 0.95 |

### 3.4 Other tests
- **Temporal test** (`src/temporal_test.py`, `compare/stilllife_crimson4_motion_test.mp4`): objects move 0.74 px per step, the carrier moves 0.016 rad. This matches the reference's screen-locked behaviour [Certain].
- **Numpy offline path** (`compare/numpy_procedural_shaded_vs_engraved.png`) is a cruder analytic shading test:
  - column: period 2.67 vs 2.48 px, edges 0.97x, fine texture 23.3 vs 25.3, ΔE 9.6, EMD 26
  - coin: period 3.79 vs 3.79 px, histogram intersection 0.71, ΔE 8.0

## 4. Practical rules for the CRED card film
- Render 3D objects on transparent alpha with real shading, a shadow-catcher floor, and micro-texture in the materials (albedo noise ~0.35, bump). Run the post-process at 45°, period 0.0065-0.0069 of frame height.
- Match levels to a reference scene's tone quantiles with `src/cg_levels.py` or `engrave.match_levels`. Use the object-only reference crop, not a crop with lots of sky.
- Choose one palette per scene. The 4-stop palettes carry the hue split.
- Use the lens preset (period 0.0105 of frame height) for magnifier close-ups.
- For collage-style 2D layers, use the material with phase mode 2, or engrave each layer once offline, so the lines scale with the layer like the reference flowers.