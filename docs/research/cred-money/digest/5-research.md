# summary
I couldn't find a public credits list or making-of for the reference. It is CRED's own launch film for CRED Money, "The more you know | CRED money", posted 25 Jul 2024 (YouTube itmN_N2Hh7U). LinkedIn posts point to CRED's in-house design and motion team ("Design Mafia", led by Harish Sivaramakrishnan). Abhinav Verma and Akash Malya, both CRED motion designers, wrote "pull this off as a team ... for CRED Money launch". Akash Malya's own published work is made in Blender + After Effects (+ Embergen). A commenter linked the Farzi opening titles (Plexus Motion + Improper) as a likely inspiration.

Measuring the frames shows how the look was built:
- **Line screen:** the engraved look is a single-angle halftone line screen at about 45°, applied to photo or 3D cut-outs. It is not hand-drawn engraving.
- **It is attached to the artwork:** the screen scales with the camera. During the zoom-out at 5.3–8.7 s the camera scaled ×0.785 and the line period ×0.766. So each layer was treated before the camera move (2.5D plates), not filtered once over the whole frame.
- **Line spacing:** 2.0–2.5 px at 640 px wide, so about 6–7.5 px if the master was 1920×1080.
- **Hummingbird:** treated differently, with posterised mezzotint-like grain and no line screen. The heavy wing motion-blur suggests real flying-bird footage (inferred).
- **Lens:** a black round lens frame, radius about 0.466 of frame width, soft edge about 0.0625 of frame width.
- **Colour and foil:** each scene is a gradient-map duotone. Foil is a pastel rainbow mapped onto selected objects. The end banknote curl and phone are 3D.

The best code-only match is the published recipe ("Hard Mix" line screen: Texturelabs / Spoon Graphics / the MIT Godot shader, which is the real-time halftoning method of Freudenberg 2002). It goes in a three.js material (via @remotion/three) with the screen anchored to each object, followed by one post pass for duotone, paper, grain and lens.

I built a working prototype and tested it on a Shopify shoe model (CC-BY), a public-domain rocket photo and a CC0 coffee photo, plus a foil card. Its line spacing came out at 7.5 px and 41° (target 7 px and 45°). The screen scaled ×1.45 for a ×1.5 zoom, matching how the reference behaves.

# parameters
{
  "engraving_screen": {
    "method": "hard-mix line screen (real-time halftoning, Freudenberg 2002) in a three.js material via onBeforeCompile, applied at the end of the fragment shader",
    "space": "camera-space x,y relative to each object's origin (vRel = (MV*pos).xyz - (MV*origin).xyz); screen-oriented, object-anchored, scales with zoom",
    "line_angle_deg": 45,
    "wave_vector": [0.7071, -0.7071],
    "period_px_at_1080p_hero_framing": 7,
    "period_px_range_at_1080p": [6, 7.5],
    "freq_lines_per_world_unit": "(H / (2 * dist0 * tan(fov/2))) / period_px",
    "line_width": "half-width = (1 - tone) * period; ink = 1 - smoothstep(th - aa, th + aa, d) * clamp(th/aa, 0, 1); d = |fract(phase) - 0.5| * 2; aa = clamp(1.5 * fwidth(phase), 0.002, 0.5)",
    "wave_amplitude_periods": 0.25,
    "wave_amplitude_periods_plates": 0.5,
    "wave_length_periods": 22,
    "wave_length_periods_plates": 26,
    "crosshatch": {
      "lines_angle_deg": 165,
      "wave_vector_angle_rad": 1.31,
      "appears_below_tone": [0.35, 0.42],
      "tone_mapping": "clamp(tone / cross, 0, 1)"
    },
    "tone": "L = luma(linear rgb)^(1/2.2); tone = min(pow(clamp((L - lo)/(hi - lo), 0, 1), gamma), 0.84)",
    "levels_3d_textured": {"lo": 0.10, "hi": 0.90, "gamma": 1.0},
    "levels_lowpoly": {"lo": 0.40, "hi": 0.95, "gamma": 2.0},
    "levels_photo_plate": {"lo": 0.06, "hi": 0.92, "gamma": 1.1},
    "tone_max_hairline": 0.84,
    "engrave_mix_over_gradient_map": 0.88,
    "godot_reference_values_MIT": {"fill_size": 100, "wavelength": 34, "amplitude": 0.025, "ripple_wavelength": 10, "ripple_angle_deg": 5, "levels": [0.1, 0.9], "opacity": 0.88, "gradient": ["#1C2B28", "#F0F2D8"]},
    "spoon_layers": {"thresholds_0_255": [80, 100, 120, 140, 160, 180], "stroke_pt": [1, 2, 3, 4, 5, 6], "angles_deg": {"shadows_dark": 90, "light": 0, "highlights": 45}}
  },
  "duotone_palettes_measured_rgb_640p": {
    "note": "mean of darkest / middle / lightest 20% of pixels inside objects; lines blur into paper at 640p, so use slightly darker ink",
    "purple": {"dark": [104, 75, 146], "mid": [154, 143, 167], "prototype_hex": {"ink": "#3a2385", "mid": "#8f7fc4", "paper": "#e6e2ec", "bg": "#dfe6c8"}},
    "green": {"dark": [97, 128, 83], "mid": [161, 194, 146], "light": [192, 229, 174], "prototype_hex": {"ink": "#2c4a26", "mid": "#7fa86f", "paper": "#cfe9bd"}},
    "peach_red": {"dark": [135, 52, 65], "mid": [172, 97, 97], "light": [227, 169, 145], "prototype_hex": {"ink": "#7d1634", "mid": "#b4636a", "paper": "#ecc0a2", "bg": "#ead9c4"}},
    "grey": {"dark": [38, 46, 53], "mid": [140, 152, 147], "light": [183, 205, 196], "prototype_hex": {"ink": "#1f272d", "mid": "#8a9893", "paper": "#d3ddd8"}}
  },
  "mezzotint_for_footage_like_hummingbird": {
    "tone_levels": 3,
    "measured_luma_peaks_0_255": [114, 174, 218],
    "grain_cell_px_1080p": [2, 3],
    "line_screen": false
  },
  "foil": {
    "procedural": "rainbow = 0.78 + 0.22 * cos(2*pi*(phase + [0, 0.33, 0.67])); phase = bands * dot(objP.xy, [0.55, 0.83]) + 2.2 * (1 - N.V) + 0.18 * t_seconds; colour = rainbow * (0.55 + 0.55 * tone); multiplied by a constant thin line screen: ink at tone <= 0.72, darkening to 0.55 at 0.7 strength",
    "bands_card": 0.45,
    "physical_option": {"material": "MeshPhysicalMaterial", "iridescence": 1, "iridescenceIOR": 1.3, "iridescenceThicknessRange_nm": [120, 900], "metalness": 1, "roughness": 0.22, "envMapIntensity_max": 0.45, "note": "needs exposure control, otherwise it clips to white"},
    "css_2d_option": "repeating-linear-gradient 110deg rainbow + 1px scanlines; background-blend overlay; mix-blend color-dodge; brightness 1.1, contrast 1.1, saturate 1.2 (re-implement, the source is GPL)",
    "to_do": "lower saturation to match the reference pastels"
  },
  "lens_loupe": {
    "shape": "circle centred on frame",
    "radius_frac_of_width": 0.466,
    "radius_px_640": [288, 312],
    "soft_edge_frac_of_width": 0.0625,
    "outside_rgb": [0.02, 0.025, 0.022],
    "barrel": "k = 1 - 0.12 * (r/R)^2 [Guessing]",
    "chromatic_offset_frac_width": 0.004,
    "chromatic_ramp": "from 0.6R to R [Guessing]",
    "rim_glow": 0.08,
    "extras": ["faint graduated tick ring inside rim", "radial zoom blur during push-ins"]
  },
  "paper_and_grain": {
    "paper_multiply_amp": 0.07,
    "mottle": {"fbm_scale_px": 180, "weight": 0.75},
    "fibres": {"fbm_scale_px": [60, 14], "weight": 0.25},
    "grain_amp": 0.035,
    "grain_reseed": "per frame",
    "note": "paper is in screen space (fixed to the frame); values are guesses, take the measured paper from the shots agents"
  },
  "render": {
    "remotion_packages": ["@remotion/three@4.0.534", "three@0.176.0", "@react-three/fiber"],
    "gl_flag": "--gl=swangle (or angle)",
    "determinism": "mixer.setTime(frame/fps); grain seeded by frame; no Math.random"
  },
  "typography": {
    "sans": "Gilroy (CRED web @font-face weights 400/500/600/700)",
    "serif_headline": "high-contrast lowercase display serif with gradient fill, name unknown",
    "caps_tracking_px": 2,
    "serif_heading_tracking_px": 0.2,
    "line_height_headings": 1.25
  },
  "asset_sources_reachable": [
    "KhronosGroup/glTF-Sample-Assets via raw.githubusercontent.com (check licence per model; e.g. MaterialsVariantsShoe CC-BY 4.0 Shopify, IridescenceLamp CC-BY 4.0 Wayfair)",
    "three.js examples/models/gltf (Flamingo/Stork/Parrot animated birds; licence not stated)",
    "scikit-image bundled photos: rocket (SpaceX public domain), coffee (CC0)"
  ]
}

# code_paths
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/making-of/proto/engrave.js
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/making-of/proto/index.html
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/making-of/scripts/render_proto.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/making-of/scripts/linescreen_fft.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/making-of/scripts/screen_vs_time.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/making-of/scripts/lens_avg.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/making-of/scripts/lens_profile.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/making-of/scripts/tone_levels.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/making-of/renders/proto_sheet.png
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/making-of/renders/proto_sheet2.png
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/making-of/renders/clip_strip.png
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/making-of/renders/proto_pushin_lens.mp4
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/making-of/lens_mean_A_t13-16.png
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/making-of/sources.txt
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/making-of/dl/godot/shader_money_engraving.shader

# open_risks
- Who made the film is inferred from LinkedIn posts: CRED's in-house team with Abhinav Verma and Akash Malya. No official credits list exists, and Abhinav's post may refer to the website rather than the film. The music credit was not found.
- Blender + After Effects as the film's toolchain is inferred from Akash Malya's personal work, not stated for this film.
- Line period at 640x360 (2.0-2.5 px) is near the limit of what that resolution can show. The true master period could be finer than the inferred 6-7.5 px at 1080p; check against a higher-resolution copy if one is obtained.
- 'Screen attached to the artwork' rests on one zoom (camera x0.785 vs period x0.766) plus constant periods in static shots. Strong, but a single measurement.
- Palette values are 640p means that mix ink and paper. Final ink/paper colours should come from the palette agents' measurements.
- Paper, grain, barrel distortion and colour-fringe values in the prototype are guesses tuned by eye. Paper texture was not measured here.
- The prototype is a standalone three.js page, not yet ported to Remotion. Rendering needs @remotion/three + @react-three/fiber and --gl=swangle/angle; SwiftShader rendering is slow, about 3 s per 960x540 frame in this container.
- Licences: pokemon-cards-css is GPL-3.0 and 4rknova's foil code is all-rights-reserved, so use both as concepts only. The Godot shader is MIT, so keep attribution if code is adapted. The three.js bird models (ro.me / mirada) state no licence. Khronos models are mostly CC-BY 4.0 and need attribution.
- Source plates decide quality. Low-poly untextured models read as stripes, dark photos turn into mostly ink, and cut-outs need alpha. The reference uses bright, detailed cut-out photos or 3D renders, and we must find original equivalents (only GitHub/npm/PyPI are reachable).
- Hummingbird-style footage (posterise + mezzotint) and the block-mosaic transitions were not prototyped.
- The foil prototype is more saturated than the reference pastels and needs tuning.

# findings
# How the CRED Money film was made, and how we reproduce it in code

All reference-derived files are under `/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/making-of/`. The full URL log is in `sources.txt` in that folder. Tags: [Certain] / [Likely] / [Guessing].

---

## 1. Which film this is and who made it

**The film**
- **Title:** "The more you know | CRED money", https://www.youtube.com/watch?v=itmN_N2Hh7U [Certain]
  - YouTube description starts "Good financial habits don't thrive in a vacuum. They grow with awareness, analysis, and reflection…"
  - CRED posted it on LinkedIn on 2024-07-25 05:23 UTC: https://www.linkedin.com/posts/credapp_the-more-you-know-cred-money-activity-7222109244546768896-za5O [Certain]
- **Product launch:** CRED Money launched 24 Jul 2024 (TechCrunch, https://techcrunch.com/2024/07/24/cred-launches-personal-finance-manager-for-indias-affluent/). It is a personal-finance tracker built on India's Account Aggregator framework [Certain].
- **Tagline in the film:** "take a good look at your money" [Certain, seen in the frames].

**Who made it: no studio or agency credit found** [Certain that none turned up]. I searched Behance, Vimeo, Motionographer-type sites, trade press, LinkedIn and Instagram. Everything points to CRED's in-house team:
- **Harish Sivaramakrishnan**, "Head of Design and Marketing at CRED", posted the film: "Proud to have been a part of the team that built this" [Certain].
  - https://www.linkedin.com/posts/hsivaramakrishnan_we-set-out-to-build-the-most-beautifully-activity-7222167011739496448-82FS
  - He calls the in-house group "Design Mafia", made of "brand design, creative and motion design teams" (CRED garage post) [Certain].
- **Abhinav Verma** (Motion Design, CRED), on 2024-07-25: "Work of Art. Really delighted to pull this off as a team with Akash Malya, for CRED Money launch. Website is insane. cred.club/money" [Certain the post exists].
  - It is ambiguous whether this credits the film, the website, or both. I read it as covering the launch film too [Likely].
- **Akash Malya**, "3D and Motion Design at CRED" (Behance be.net/skyslash, Instagram @akash.aep) [Certain on role].
  - On a personal film he wrote: "Animated and rendered in Blender. Simulations done in Embergen. 2D motion / post-work done in After Effects." [Certain for that project]
  - So **Blender + After Effects** is the likely toolchain for this film [Likely, not stated for the film itself].
- **Anoop Kumar** posted the film ("take a good look at your money with CRED money."). A commenter asked "What effect did you apply on the money?" and no answer is visible [Certain].
- **Music: not found** [Certain that it was not found]. No composer or library credit appeared anywhere.

**Inspiration**
- On Saptarshi Prakash's appreciation post, a commenter linked the **Farzi opening titles** (Amazon Prime 2023) as "the inspiration" [Certain the comment exists; Guessing whether it really was].
  - Farzi credits: concept/direction Yashoda Parthasarthy (Plexus Motion); design/animation Mehr Chatterjee and Aditya Dutta (Improper Design & Animation).
  - Method: "Monuments, patterns and emblems from real notes were faithfully redrawn by hand", plus a 3D "note burning" team (https://improper.tv/work/farzi/, https://www.motiondesignawards.com/project/1177/farzi-opening-title-sequence).
  - Another commenter said it "reminded me of Scam 2003 title sequence".
- **What Prakash's post says about the art direction:** "wavy line patterns… paper texture… hologram-like security thread… keeps zooming into the currency note… turtle swimming underwater… lighthouse scanning the horizon" [Certain, quote].
- **A comparable studio film:** Varo Bank "It's Your Money" by Scholar (CG supervisor, 3D generalists, Flame compositing): "reimagining communities… in the engraving style of currency" (https://helloscholar.com/project/varo-bank-its-your-money). Top studios build this look as a 3D + compositing pipeline [Certain about Scholar's credits].
- **Same-style CRED films:** none found. The cred.club/money page has since been relaunched as "YOUR WEALTH, IN FOCUS"; its images are not reachable from here.

**Brand type**
- The CRED web CSS declares `@font-face gilroy` (400/500/600/700) [Certain].
- CRED's open-source NeoPOP system has the type roles heading / body / **serif-heading** / caps [Certain]:
  - caps letter-spacing 2 px (size > 8)
  - serif-heading letter-spacing 0.2 px
  - line-height ×1.25 for headings and caps
- In the film, headlines are a lowercase high-contrast serif with a gradient fill; sublines are a Gilroy-like geometric sans. The serif's name was not identified [Guessing].

---

## 2. What the frames prove about the method (measured)

Scripts are in `making-of/scripts/`. Frames are the 640×360, 6 fps set.

| Measurement | Result | How measured | Tag |
|---|---|---|---|
| Engraving is a **line screen** at one angle | Lines at ~45° in every engraved scene: lighthouse 44.8°, rock 45–49°, flowers/bill 44.8–45.2°, columns 45–52° (+90° crosshatch) | 2-D FFT peak, periods 1.6–10 px (`linescreen_fft.py`, `screen_vs_time.py`) | Certain |
| Line period | 2.0–2.5 px at 640 wide (lighthouse 2.01, columns 2.48, bill late 2.49) → ~6–7.5 px at 1920 | FFT | Likely: 2.0 px is near the limit of what 640 px can show |
| **Screen is attached to the artwork, not the frame** | Camera scaled ×0.785 over 5.33→8.67 s; line period went 3.25 → 2.49 px (×0.766) | Cumulative scale from `shots-00-17/flow.txt` vs FFT period | Likely |
| Each layer is treated before the camera move (2.5D plates) | Follows from the row above, and the angle stays 45° everywhere (layers aren't rotated) | inference | Likely |
| Hummingbird uses a different treatment | No fine screen (FFT share ≤ 0.003, only ≥ 9 px texture); ~3 tone levels (L peaks 114 / 174 / 218); smooth flat wings | FFT + histogram (`tone_levels.py`) | Likely: posterise + mezzotint on video footage |
| Duotone ink / mid / paper (mean of darkest / middle / lightest 20% inside objects) | purple [104,75,146] / [154,143,167]; green [97,128,83] / [161,194,146] / [192,229,174]; peach-red [135,52,65] / [172,97,97] / [227,169,145]; grey [38,46,53] / [140,152,147] / [183,205,196] | `tone_levels.py` | Likely: at 640 px lines blur into paper, so true ink is darker |
| Lens frame | Centred circle, radius at 50% brightness = 288–312 px of 640 (≈0.466 W); fall-off from 90% to 50% over ~40 px (≈0.0625 W); outside ≈ black (min L 0.007–0.045); wider than the frame is tall, so only left/right edges show | Mean of frames 81–100 (content moves, lens fixed), radial profile per 30° (`lens_avg.py`) | Certain (geometry) |
| Lens extras | Faint graduated tick ring inside the rim; radial zoom blur during the push | Visual, `lens_mean_A_t13-16.png` | Likely |
| 3D elements | Banknote with paper thickness tilted under the lens (10–13 s); bill curling into a phone; 3D serif "MONEY" roundel; phone render (51–55 s) | Visual | Likely: 3D, probably Blender |
| Foil | Pastel rainbow on turtle, shell, cards and the security thread; a line screen still shows through the foil | Visual + crops | Likely |

**Likely production pipeline:**
1. Gather cut-out photo/stock plates (columns, lighthouse, rock, fish) and 3D renders (banknote, shell, phone).
2. In After Effects or Photoshop, treat each plate: grey → 45° line screen (Hard Mix/threshold) → gradient-map duotone.
3. Assemble as 2.5D layers in an AE 3D camera with continuous pushes.
4. Add paper overlay, foil gradient maps (Colorama-type), a loupe matte with zoom blur, and block/mosaic transitions.
5. Treat the hummingbird footage separately (posterise/mezzotint).

---

## 3. Known production recipes for the engraving look

**Photoshop / After Effects**
- **Spoon Graphics "money effect"** (https://blog.spoongraphics.co.uk/tutorials/create-realistic-money-effect-photoshop):
  - Six wavy line screens drawn in Illustrator (Zig Zag 4 mm, 11 ridges, smooth; blend 220 steps) at stroke 1–6 pt.
  - Directions: shadows / dark at 90°, light at 0°, highlights at 45°.
  - Each screen is masked by a Threshold copy of the photo at 80 / 100 / 120 / 140 / 160 / 180, then a colour fill in Color mode for the tint.
  - Key quote: two layers in the same direction 1 pt apart add tone.
- **Texturelabs "Engraved Money Effect"** uses a Hard Mix texture. Its bonus sun rays = Halftone Pattern (Line, size 12, contrast 50) → rotate 90° → Polar Coordinates (https://texturelabs.org/tutorials/engraved-money-effect/).
- **Workbench Tutorial 90 (AE):** Venetian Blinds lines layer + image both at ~50% → blur → Brightness/Contrast crush. Line width then follows tone; a halftone noise layer is optional (https://workbench.tv/tutorials/2017-09-29_Engraving/).
- **Vayce engraving tool:** line density, contour flow (lines warp to follow shading), edge etching, jitter, ink/paper colour (https://vayce.app/tools/engraving-effect/).

**GLSL**
- **sjvnnings/godot-money-engraving-shader** (MIT, "adapted from Texturelabs").
  - Sine-wavy sawtooth fill `fract((1-y + ((sin(x·λ)+1)/2)·A)·N)`, plus a 90° copy mixed in for crosshatch.
  - A "ripple" rotation warp, then Hard Mix with the levelled grey image.
  - Mixed back at 0.88 opacity, then a gradient map.
  - Values: N 100, λ 34, A 0.025, ripple 10 / 5°, levels 0.1–0.9, gradient #1C2B28 → #F0F2D8.
- **Blender:** Ocean Quigley's Eevee engraving/hatching shaders (lesterbanks 2020).
- **Cinema 4D / Redshift:** no reliable engraving-shader source found.

**Academic**
- Ostromoukhov 1999 *Digital Facial Engraving*: layered engraving screens over a photo, merged by rules and masks.
- Freudenberg, Masuch & Strothotte 2002 *Real-time halftoning*: a threshold screen in texture space with smooth anti-aliasing, giving "engraving with lighting-dependent line width". This is the method we use.
- Praun et al. 2001 *Real-time hatching* (tonal art maps).
- Leister 1994 *Computer generated copper plates*: an object-space line texture in a ray tracer.

## 4. Foil

- **pokemon-cards-css** (GPL-3.0, concept only, do not copy into our repo):
  - Rainbow `repeating-linear-gradient(110deg)` with 1 px scanlines, `background-blend-mode: overlay`, `mix-blend-mode: color-dodge`, brightness 1.1 / contrast 1.1 / saturate 1.2, position driven by a pointer.
  - Its six hues: hsl(2,100%,73%), (53,100%,69%), (93,100%,69%), (176,100%,76%), (228,100%,74%), (283,100%,73%).
- **three.js `iridescence`** (MIT) implements Belcour & Barla 2017 thin-film: `iridescence`, `iridescenceIOR`, `iridescenceThicknessRange`.
- **Faster look-alike** (BlendSwap CC0 node; 4rknova foil-sticker write-up, whose code is all-rights-reserved): hue = offset RGB sines driven by thickness + (1 − N·V).
- **After Effects:** Fractal Noise → Colorama, used as an overlay or track matte.

## 5. Lens / loupe

- **After Effects options:**
  - Mattrunks: shape-layer loupe over a zoomed precomp, with a position expression.
  - Magnify on an adjustment layer.
  - Optics Compensation or CC Lens for the bulge.
- **Reference values:** see §2.
- **In our prototype:** barrel factor `1 − 0.12·(r/R)²`, chromatic offset 0.004 W fading in from 0.6 R, and a faint rim glow. These are guesses tuned by eye [Guessing].

## 6. Recommended code-only approach (decision)

Use the **Hard-Mix / real-time-halftone line screen inside a three.js material** (`@remotion/three`, render with `--gl=swangle` or `angle`; Remotion 4.0.534 offers angle / angle-egl / egl / swangle / swiftshader / vulkan).
- **Anchor the screen to each object but keep it screen-oriented:** lines run along the object's camera-space x,y relative to its own origin. The screen then:
  - moves and scales with the object or camera (as measured: ratio ≈ 1);
  - stays at 45° (as measured).
- **Line width** = (1 − tone) × period, with an anti-aliasing term from `fwidth`.
- **Crosshatch** is a second layer at a rotated angle, used only for tone below about 0.4 (Spoon / Ostromoukhov layering).
- **Then:** a 3-stop gradient map (ink / mid / paper), mixed 0.88 with the lines.
- **One post pass:** paper (fbm mottling + short fibres, multiplied, fixed to the frame), per-frame grain, optional loupe.
- **Sources:**
  - textured or normal-mapped glTF models;
  - 2.5D photo plates on planes, cut out with alpha;
  - **bright, high-key plates** (the reference is mostly paper). A dark night photo fails (rocket test). Low-poly untextured models read as stripes (flamingo test).
- **Foil:** a separate material branch (pastel cosine rainbow driven by position, view angle and time), multiplied by a thin constant line screen. Use three.js `iridescence` when a physical look is wanted.
- **Hummingbird-type shots:** posterise to 3 tones + noise-threshold mezzotint, no line screen.

## 7. Prototype results (`proto/`)

| Test | Result |
|---|---|
| Shoe (Shopify CC-BY 4.0) at zoom 1 | period 7.53 px, angle 41.2° (target 7 px / 45°; the gap comes from the wavy-line term and the object's depth) |
| Zoom 1.6 | period 12.74 px |
| 36-frame push 1→1.5 | period 7.53 → 9.26 → 10.94 px: the screen scales with the zoom like the reference |
| Coffee photo (CC0) in peach-red | Close to the reference's column scene |
| Loupe on green shoe | Reads like the 13–16 s reference |
| Foil card | Pastel rainbow + thin screen; more saturated than the reference, so lower saturation (or raise `a` to ~0.85) |

Bugs I fixed along the way:
- A ghost line appeared at pure white (anti-aliasing centred on threshold 0); now gated by `th/aa`.
- Flamingo GLBs have no normals, so they need `flatShading`.

Outputs:
- `renders/proto_sheet.png`, `renders/proto_sheet2.png`, `renders/clip_strip.png`
- `renders/proto_pushin_lens.mp4`

