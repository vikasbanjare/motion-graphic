# summary
I measured the reference film's four supporting effects (foil, lens, paper/grain/duotone grading, band/sheen/type) and built Remotion prototypes for each. Each prototype was checked with the same measurement code used on the reference, after re-encoding to 640x360 H.264 so the comparison is like-for-like.

**Prototype vs reference**
- **Lens:** matches. 50% radius is 293 px in both (0.814 of frame height), outside darkness is 10 vs 10-13 out of 255, edge profile RMSE is 0.006, and the iris in/out radius ratios are within 0.01-0.02.
- **Holographic band:** matches. Median saturation 0.26 vs 0.27, median value 0.86 vs 0.89.
- **Paper:** per-octave texture energy is within 0.87-1.28x of the intro paper.
- **Duotone grading:** single-ink scenes reproduce at median ΔE 2.3-4.1 from luminance plus a 16-stop gradient map. The SVG filter and the exported `.cube` LUTs agree within median ΔE 3.96.
- **WebGL foil:** statistically close. The pearl preset against the turtle scores hue-histogram overlap 0.87 and chroma-vs-luminance RMSE 0.066. The shell preset against the shell scores 0.63 and 0.041. The shell's warm ring is still under-represented.

**Main findings**
- **Foil** is an overlay-type colour layer fixed to the object. Overlay is clearly the best fit on the cards and only marginally on the shell. In a static hold the colour changes 0°, so it only moves when the object or camera moves. Shell and turtle are blue-dominant; the bank cards are warm-dominant glints with a measured timing cycle.
- **Lens** is a pure vignette mask, not a magnifier: no measurable barrel distortion or chromatic aberration. The edge is soft and asymmetric, and a little blur sits near the rim. Magnification comes from camera push-ins under a fixed lens.
- **Grain:** the film has no animated grain; paper texture is static.
- **Headlines** carry a slowly drifting two-colour sheen.
- **Fonts:** the kit's Instrument Serif is a poor match (about half the stroke weight, 18% too narrow). The best free stand-ins are Newsreader (optical size 72, weight 600) for headlines, with Frank Ruhl Libre 700 as alternative, and Lexend 500 for sublines (Poppins 500, already in the kit, is close). Band caps need about 0.43 em tracking in Lexend.

Nothing was written to the repo (`git status` is clean). Everything is under `research-cred/fx`.

# parameters
{"units":"fractions of frame W/H unless noted; px@360 = measured on the 640x360 reference; x3 for 1080p","foil":{"blend":"overlay (cards decisive: err 0.249 vs 0.519 next; shell marginal 0.209 vs softlight 0.222)","motion":"colour attached to object; 0.0 deg hue change in a static hold (17.9-18.7 s). Drive phase from object/camera motion, never from time alone","palettes_hue_share":{"turtle_pearl":{"180-210":0.117,"210-240":0.64,"240-270":0.238},"shell":{"0-30":0.109,"30-60":0.149,"150-180":0.078,"180-210":0.24,"210-240":0.304,"240-270":0.096},"card_glint":{"0-30":0.475,"30-60":0.114,"150-180":0.028,"180-210":0.108,"210-240":0.105,"270-300":0.045,"300-330":0.047,"330-360":0.079}},"measured_sat_p50_p90":{"shell":[0.35,0.47],"turtle":[0.46,0.6],"cards":[0.62,0.72]},"base_luma_p2_p50_p98":{"shell":[0.15,0.45,0.75],"turtle":[0.23,0.43,0.9]},"spatial":"1-1.5 hue cycles across object; shell: coherent blue (hue 200-222) near hinge, mixed rainbow ring at 0.5-0.6R, pale cyan rim","shader_presets":{"pearl":{"sat":0.82,"val":0.55,"alpha":1.0,"levels":[0.2,0.85,1.4],"cycles":1.25,"viewGain":0.9,"result_vs_turtle":"hue-hist intersection 0.87, chroma|luma RMSE 0.066"},"shell":{"sat":0.66,"val":0.5,"alpha":0.95,"levels":[0.15,0.75,1.5],"cycles":2.2,"viewGain":1.1,"ribs":24,"ribDepth":0.35,"result_vs_shell":"hue-hist intersection 0.63, chroma|luma RMSE 0.041"}},"card_glint":{"fade_in_s":0.25,"hold_s":[0.4,0.6],"fade_out_s":0.12,"drift_W_per_s":{"range":[0.009,0.058],"typical":0.04},"hue_turn_deg_during_hold":{"range":[5,100],"median_approx":40},"sigma_x_W":[0.017,0.039],"peak_sat":[0.6,0.7],"repeat_s":[1.0,1.2],"stagger":"never in sync across cards","blend":"overlay"}},"lens":{"R50_over_H":0.814,"diameter_over_H":1.63,"centre_offset":{"x_W":"0..+0.013","y_H":"0..+0.055"},"edge_alpha_by_offset_from_R50_in_H":[[-0.1667,0.001],[-0.1389,0.017],[-0.1111,0.037],[-0.0833,0.093],[-0.0556,0.173],[-0.0278,0.307],[-0.0139,0.395],[0.0,0.486],[0.0139,0.584],[0.0278,0.686],[0.0417,0.779],[0.0556,0.871],[0.0694,0.941],[0.0833,0.987],[0.0972,1.0]],"edge_10_90_width_H":0.139,"outside_colour":"#0b0d0c (luma 10-13/255)","barrel_k_norm":"<0.025 (none)","chromatic_aberration":"none systematic","rim_softening":{"blur_sigma_px_1080":2.2,"ramp_r_over_R":[0.45,0.85],"sat_scale":0.75},"iris_in":{"keys_t_s_radius_rel":[[0,1.33],[0.083,1.21],[0.125,1.15],[0.208,1.098],[0.375,1.04],[0.625,1.0]],"ease":"fast-out"},"iris_out":{"duration_s":[0.33,0.95],"curve":"r=1+0.24*u^2.6 (accelerating)"},"blink_cut":"single near-black frame at 18.75 s and 20.375 s","magnification":"camera push under a fixed lens"},"paper_grain":{"animated_grain":"none (static-hold frame diff 0.02-0.17 levels)","intro_paper_dog_std_levels_by_sigma_px@360":{"0.7":1.1,"1.4":0.94,"2.8":0.94,"5.6":0.87,"11.2":0.66,"22.4":0.51},"paper_component_defaults_1080":{"mottle":0.035,"mottleFreq":0.015,"grain":0.1,"grainFreq":0.1,"blend":"soft-light","fit":"per-octave ratio 0.87-1.28, RMS log err 0.17"},"banknote_paper":"scale mottle ~x5"},"duotone_luts_shadow_mid_highlight":{"intro_grey_paper":["#5f5f5f","#ababab","#ebebeb"],"lens_peach":["#97634d","#cea580","#fbe6b9"],"columns_terracotta":["#84353a","#b87c69","#e3cdb3"],"turtle_lavender":["#41366c","#847db3","#dcd5f0"],"lighthouse_mint":["#3e5a34","#7f9f79","#c6e8b3"],"seabed_grey":["#111615","#67706e","#dce6dd"],"lens_grey_shell":["#1f2125","#656c6d","#c0c9c4"],"lens_green_rock":["#122314","#667d5f","#d8ebc2"],"money_seal_lens":["#1e532e","#7b9d76","#f7f3db"],"lens_green_closeup":["#63985a","#63cd91","#cffcc6"],"hummingbird_two_inks":{"leaves":["#5a6b34","#c4d0a2","#dbddb6"],"flowers_bird":["#5f4095","#b288d6","#d7b3f4"]},"full_16_stop_luts":"fx/out/duotone_luts.json, fx/proto/remotion/src/fx/measured.ts, fx/proto/luts/*.cube"},"duotone_roundtrip_median_dE":{"turtle_lavender":2.3,"seabed_grey":2.4,"lighthouse_mint":4.1,"columns_terracotta":8.4},"band":{"height_H":{"far":0.055,"close":0.27},"stops_close":["#f1caca","#fbd8b9","#fcd8a3","#fadba3","#ebdbaf","#c7e5d2","#a3c8e4","#8daad3","#89a0c8","#889bbc"],"sat_p50":0.27,"val_p50":0.89,"cycles_along_band":2,"wavy_lines":{"pitch_bh":0.124,"period_bh":2.0,"amplitude_bh":0.17,"stroke":"white ~40% opacity"},"text":{"case":"UPPERCASE white","cap_height_bh":0.5,"tracking_em":{"Lexend 500":0.43,"Poppins 500/600":0.46,"Montserrat 600":0.41}},"hue_sweep":"none in static hold"},"headline_sheen":{"speed_W_per_s":0.025,"sigma_W":0.047,"share_of_ink":0.26,"colours":{"turtle":["#49298c","#4fb6c8"],"columns":["#8e2d4a","#b5737b"]}},"type":{"serif":{"reference_metrics":{"xheight_over_ascender":0.683,"stem_over_xheight":0.304},"pick":"Newsreader variable, font-variation-settings 'opsz' 72, weight 600, letter-spacing -0.03em","alt":["Frank Ruhl Libre 700 (-0.03..-0.05em)","Source Serif 4 700 (-0.03em)"],"avoid":"Instrument Serif (IoU 0.541, half stem weight, -18% width)"},"sans":{"pick":"Lexend 500, letter-spacing -0.02em (IoU 0.792, width -1.5%)","alt":"Poppins 500 -0.01em (IoU 0.764, already in kit)"},"npm":["@fontsource-variable/newsreader","@fontsource/lexend","@fontsource/frank-ruhl-libre"]},"render":"Remotion stills/renders with --gl=swangle (CPU WebGL) for FoilGL; everything else is CSS/SVG"}

# code_paths
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/proto/foil.frag.glsl
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/proto/remotion/src/fx/FoilGL.tsx
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/proto/remotion/src/fx/foilShader.ts
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/proto/remotion/src/fx/FoilCSS.tsx
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/proto/remotion/src/fx/Lens.tsx
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/proto/remotion/src/fx/Duotone.tsx
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/proto/remotion/src/fx/Paper.tsx
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/proto/remotion/src/fx/HoloBand.tsx
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/proto/remotion/src/fx/Sheen.tsx
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/proto/remotion/src/fx/measured.ts
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/proto/remotion/src/Root.tsx
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/proto/remotion/src/index.ts
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/proto/remotion/render.sh
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/proto/luts/
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/params.json
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/common.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/foil_attach.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/foil_stats.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/blend_fit.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/foil_palette.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/cards_foil.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/kymo.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/lens_fit2.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/lens_profile.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/grain.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/duotone.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/export_cube.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/band.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/band_stops.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/band_tracking.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/type_refs.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/font_match.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/font_board.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/font_xh.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/compare_foil.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/make_compare.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src/make_test_engraving.py
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/compare/cmp_lens.jpg
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/compare/cmp_band.jpg
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/compare/cmp_foil.jpg
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/compare/cmp_duotone_roundtrip.jpg
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/compare/cmp_paper.jpg
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/compare/cmp_sheen.jpg
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/compare/font_board_serif.png
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/compare/font_board_sans.png
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/renders/FxLens.mp4
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/renders/FxFoil.mp4
/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/renders/duotone_grid.png

# open_risks
- The reference is only 640x360 H.264 with 4:2:0 chroma. Fine grain, chroma detail and lines under about 2 px are lost, so the grain, saturation and paper-texture numbers describe the delivered file and are lower bounds for the master.
- The overlay blend is decisive only on the cards. On the shell it barely beats soft-light and multiply (0.209 vs 0.222 vs 0.223), and the turtle fit used a seabed base instead of a true pre-foil base.
- Whether the foil hue shifts with viewing angle during camera moves is unproven. ECC alignment failed on the 16.5-17.7 s push-in (the static lens ring confuses it) and on the self-moving turtle. Only 'no change in a static hold' is certain.
- The shell preset still under-represents the warm ring: about 1% warm pixels in my render vs 26% in the reference. The palette phase offset needs one more tuning pass, ideally on our real engraved objects.
- Foil only reads well on mid-tone bases (luminance p50 about 0.45) with fine lines. Dense black engraving or bright paper under the foil kills the overlay colour. The engraving pipeline must render foil objects in that range.
- The CSS foil fallback is clearly weaker than WebGL (hue overlap 0.77, chroma RMSE 0.14). FoilGL needs --gl=swangle or --gl=angle; swangle CPU rendering is slow (about 1-2 min for 96 frames at half scale), and Lambda/cloud renderers may behave differently.
- The band's wavy-line amplitude (0.17 of band height) comes from a ridge tracker that may jump between lines [Guessing]. The thin-band colour stops at 15 s are contaminated by the green bill, so the 18 s close-up stops were used.
- Font matching ran on text with an x-height of about 8 px. Letterform detail is not resolvable, so Newsreader vs Frank Ruhl Libre is a judgement call between metric matches and IoU. The real CRED typefaces are probably commercial; these are free stand-ins.
- Sheen.tsx uses background-attachment: fixed for frame-space gradients. Inside transformed ancestors (camera pushes), Chrome may anchor it to the element instead, so the sheen must be verified inside the real camera rig.
- Lens.tsx renders its children twice (blurred rim copy plus sharp copy), doubling render cost for heavy scenes.
- Some global LUTs mix several inks and must not be used as one gradient map (hummingbird, banknote_tilted_lens, bill_on_black); use the per-ink tritones from SCENE_INKS. Lens-scene LUTs were fitted inside the lens only, so apply the LUT before the lens vignette.
- Paper defaults were calibrated only against the intro paper. Scene-specific paper (banknote/seal, mottle about 5x stronger) is from the sibling engraving study, not my own fit.
- Originality: do not reproduce CRED's band emblem (ring of circles), its 'take a good look at your money' wording, or its compositions. The prototypes use only original subjects (sphere, card, plinth) and the given facts (5% rewards on online shopping, zero joining fee).
- fx/frames/all24.npy is a 1.1 GB decode of the reference in scratch. It must never be copied into the public repo.

# findings
# FX research: foil, lens, paper/grain/duotone, band and type

All numbers come from the 640x360, 24 fps reference: 1656 frames decoded with OpenCV to `fx/frames/all24.npy`. "px@360" means pixels at that size; multiply by 3 for 1080p.

**How I checked the prototypes:** each prototype was rendered in Remotion 4.0.534 (headless shell, `--gl=swangle`), downscaled to 640x360, H.264 round-tripped (crf 23, 4:2:0), then measured with the same scripts used on the reference.

## 1. Foil (iridescence)

Where the foil appears:
- **Bank cards** (22.5-25.5 s): soft colour blobs in the card's top half.
- **Turtle shell** (27-32 s).
- **Scallop shell and pearl** (39.5-46.8 s).
- **Holographic security thread / band** (10-21 s; see section 4).

**Static hold = 0 change [Certain].**
- Method: ECC affine alignment between frames.
- In the band hold at 17.9-18.7 s the camera moves under 0.5 px and the hue is identical (median difference 0.0°).
- So the foil does **not** animate on its own. Colour changes only through object or camera motion.
- The push-in at 16.5-17.7 s and the self-moving turtle could not be aligned (ECC cc 0.64-0.91), so view-dependence there is [Likely], not proven.

**Hue distribution** (share of foil pixels, saturation > 0.25, weighted by saturation, 30° bins) [Certain]:

| Surface | Hue shares |
|---|---|
| Turtle | 210-240°: 64%, 240-270°: 24%, 180-210°: 12% |
| Shell | 210-240°: 30%, 180-210°: 24%, 30-60°: 15%, 0-30°: 11%, 240-270°: 10%, 150-180°: 8% |
| Cards | 0-30°: 47%, 30-60°: 11%, 180-240°: 21%, 270-360°: 17% |

**Saturation p50/p90:** shell 0.35/0.47, turtle 0.46/0.60, cards 0.62/0.72.

**Base luminance under the foil is mid-tone** (p2/p50/p98): shell 0.15/0.45/0.75, turtle 0.23/0.43/0.90. This matters: overlay cannot tint black lines or bright paper, so foil objects need mid-tone bases with fine lines.

**Blend mode: overlay.**
- Method: simulate 9 blend modes on a grey base with the measured hues, then compare the chroma-vs-luminance curve plus the luminance histogram.
- Cards (base taken from the same card before the glint): overlay error 0.249 vs 0.519 for the next mode [Certain-ish].
- Shell: overlay 0.209 vs soft-light 0.222 vs multiply 0.223 [Likely].
- Turtle: overlay 0.363 vs multiply 0.428 [Likely].
- Supporting evidence: chroma goes to 0 for the darkest pixels (luminance < 0.2), so dark lines stay neutral. That rules out screen, dodge and add.

**Spatial structure of the shell** (hue sampled on arcs around the pearl/hinge) [Likely]:
- Coherent blue (hue 200-222°, coherence 0.9+) for r up to about 80 px.
- A mixed rainbow ring at 90-110 px.
- Pale cyan at the rim.
- About 1-1.5 hue cycles across the object.
- The turtle shows a broad blue gradient with one orange-magenta streak that shifts as it swims (median hue change 15-27° per 0.25-1 s, not motion-compensated).

**Card glints** (centroid of saturation > 0.45 pixels per card, 24 fps) [Certain for this clip]:
- Fade in about 0.25 s, hold 0.4-0.6 s, fade out about 0.12 s.
- Drift 0.009-0.058 W/s (typically about 0.04).
- Hue turns 5-100° during the hold (median about 40°).
- Horizontal sigma 0.017-0.039 W; peak saturation 0.6-0.7.
- Repeats every 1.0-1.2 s, staggered between cards.

**Shader:** `proto/foil.frag.glsl` (GLSL ES 1.0).
- Two-beam thin-film (650/532/450 nm) or a measured hue ramp.
- Phase driven by radial cycles, fbm, and view/normal from object tilt; optional ribs; base-levels remap; overlay blend.

Results after tuning:

| Preset | Compared with | Hue-histogram overlap | Chroma-vs-luminance RMSE | Saturation p50/p90 |
|---|---|---|---|---|
| Pearl | Turtle | 0.87 (0.94 in the first pass) | 0.066 | 0.35/0.62 vs 0.46/0.60 |
| Shell | Shell | 0.63 | 0.041 | 0.37/0.54 vs 0.35/0.47 |

- The shell gap is the warm ring: about 1% in mine vs 26% in the reference.
- In the 4 s clip (`renders/FxFoil.mp4`), hue on the card changes 5.6-21° as the view angle moves.

**CSS fallback** (`FoilCSS.tsx`): measured gradient + SVG turbulence displacement + overlay, masked to the object. It is weaker: hue overlap 0.77 vs turtle, chroma RMSE 0.14 (too uniform). Use it only when WebGL is unavailable.

## 2. Lens / magnifier

**Circle fit** (ray-cast to the dark edge plus RANSAC, 277 of 492 frames valid in 10-21.5 s and 45-54 s) [Certain]:
- Centre 0 to +1.3% W and 0 to +5.5% H off frame centre.
- 50% radius = 293 px = **0.814 H**; diameter about 1.63 H, so the circle is clipped at the top and bottom and is dark only at the sides and corners.
- Fitted radius stays between 298 and 312 px across scenes.

**Edge profile** [Certain] (mean of 4 scenes, spread ≤ 0.03; brightness relative to inside):

| Offset from 50% radius (px@360) | -60 | -40 | -20 | -10 | 0 | +10 | +20 | +30 |
|---|---|---|---|---|---|---|---|---|
| Brightness | 0.999 | 0.963 | 0.827 | 0.693 | 0.514 | 0.314 | 0.129 | 0.013 |

- Asymmetric: a long inner falloff (0.15 H) and a short outer one (0.083 H). The 10-90% width is 0.139 H.
- Outside is near-black, luminance 10-13 out of 255 (#0b0d0c).

**No barrel distortion** [Certain for this shot]: the band's straight top edge stays flat within ±1 px from x=30 to 610 (r/R ≈ 1.0), so normalised k < 0.025.

**No systematic chromatic aberration** [Likely]: per-channel 50% radii differ by under 4 px with inconsistent sign across scenes.

**Rim softening** [Likely]: high-frequency energy falls to 0.45x by r/R 0.8. Calibrated against Gaussian blur, that is σ ≈ 0.75 px@360 (2.2 px at 1080p). Saturation drops 0.36 to 0.21 at the rim in the peach scene.

**Magnification comes from camera pushes under a fixed lens** [Likely].

**Timing** (median radius along the diagonals) [Certain]:
- **Iris-in at 10.1 s:** radius 367 → 335 → 318 → 303 → 287 → 276 px at +0 / 0.083 / 0.125 / 0.208 / 0.375 / 0.625 s (fast-out). Corner luminance drops 207 → 9 in about 0.2 s.
- **Iris-in at 45.1 s:** about 0.15 s; the interior also darkens 176 → 81.
- **Iris-out at 21.38 s:** 290 → 367 px in 0.33 s, accelerating.
- **Iris-out at 52.0 s:** 296 → 300 → 308 → 329 → 367 px over 0.96 s (≈ 1 + 0.24·u^2.6), then a cut.
- **Blink cuts:** single near-black frames at 18.75 s and 20.375 s between lens scenes.

**Prototype** (`Lens.tsx`, CSS masks only, no WebGL):
- Blurred, desaturated copy for the rim, sharp masked copy in the centre, radial-gradient body from the measured table.
- Measured result: 50% radius 293 vs 293, dark 10, edge-profile RMSE **0.006**.
- Iris ratios: 1.205/1.148/1.094/1.037 vs reference 1.214/1.152/1.098/1.040.

## 3. Paper, grain and duotone grading

**Grain is not animated** [Certain for the delivered file]: frame-to-frame noise in static holds is 0.02-0.17 levels (intro paper, green hold, peach hold). Phase correlation shows no jitter.

**Intro paper texture** (difference-of-Gaussians std, 8-bit levels, by sigma px@360) [Certain]:

| Sigma | 0.7 | 1.4 | 2.8 | 5.6 | 11.2 | 22.4 |
|---|---|---|---|---|---|---|
| Std | 1.10 | 0.94 | 0.94 | 0.87 | 0.66 | 0.51 |

That is a flat, subtle spectrum (total about 2.3 levels). The banknote/seal paper is about 5x stronger (from the sibling engraving study).

**Paper prototype** (`Paper.tsx`): static SVG turbulence, soft-light. Defaults (mottle 0.035 @ 0.015, grain 0.10 @ 0.10, 1080p) give per-octave ratios **0.87-1.28** vs the reference (RMS log error 0.17), chosen from a 7-setting sweep.

**Gradient maps per scene** (`out/duotone_luts.json`, `src/fx/measured.ts`) [Certain]:
- Method: 16 equal L* bins between p1 and p99, median Lab per bin. Ink clusters from k-means on a*b*.

| Scene | Shadow → mid → highlight | Notes |
|---|---|---|
| Intro grey | #5f5f5f → #ababab → #ebebeb | |
| Peach (lens) | #97634d → #cea580 → #fbe6b9 | |
| Columns | #84353a → #b87c69 → #e3cdb3 | 3-stop with hue rotation crimson → orange → cream |
| Turtle | #41366c → #847db3 → #dcd5f0 | |
| Lighthouse | #3e5a34 → #7f9f79 → #c6e8b3 | |
| Seabed | #111615 → #67706e → #dce6dd | |
| Green rock (lens) | #122314 → #667d5f → #d8ebc2 | |
| Seal | #1e532e → #7b9d76 → #f7f3db | |

- The hummingbird scene is two inks on separate objects (leaves #5a6b34 / #c4d0a2 / #dbddb6; flowers and bird #5f4095 / #b288d6 / #d7b3f4). Its global LUT should not be used.
- **Round trip** (reference → luminance → LUT → ΔE vs original): turtle 2.3, seabed 2.4, lighthouse 4.1, columns 8.4 median. What the LUT misses is exactly the extra layers: foil, coloured headline ink, UI chips and the lens surround. That confirms the pipeline: one gradient map for the engraved world, colour layers on top [Certain].
- **Code:**
  - `Duotone.tsx` (SVG feColorMatrix to Rec.709 luma, then a 16-value feComponentTransfer table).
  - `tritone()` helper for per-object inks.
  - 14 `.cube` 33³ LUTs in `proto/luts/` for ffmpeg `lut3d` or other grading tools. They agree with the SVG filter within median ΔE 3.96.
- **Background mosaic:** translucent squares about 60 px@640 wide in the lighthouse scene [Guessing on exact size].

## 4. Holographic band, headline sheen and type

**Band (security thread)** [Certain]:
- Opaque pastel ramp, measured on the close view at 18 s: #f1caca pink → #fbd8b9 → #fcd8a3 apricot → #ebdbaf cream → #c7e5d2 mint → #a3c8e4 sky → #8daad3 → #889bbc periwinkle.
- Saturation p10/50/90 = 0.06/0.27/0.37; value 0.75/0.89/1.0.
- About 2 colour cycles along the band at the far view.
- Height 0.055 H far, 0.27 H close.
- Fine white wavy lines: pitch 0.124 of band height, period about 2 band heights [Likely]; amplitude 0.17 band height [Guessing].
- No hue sweep in the hold.
- **Text:** white uppercase geometric sans, cap height ≈ 0.5 of band height. Letter-spacing solved from the measured ink span (509.8 px at cap height 11.38, and 484.2 at 10.75): **Lexend 500 0.43 em, Poppins 0.46 em, Montserrat 600 0.41 em** (the two frames agree within ±0.003 em).
- **Prototype:** `HoloBand.tsx`; my version measures saturation median 0.26 and value 0.86 vs 0.27 / 0.89.
- I deliberately did not copy CRED's ring emblem or band wording.

**Headline sheen** (centroid of teal pixels, 27.5-32.3 s) [Certain]:
- Drifts at 0.025 W/s (16 px/s@640), sigma 0.047 W, covering about 26% of the ink. A slow travelling gradient, not a glint.
- Ink colours: indigo #49298c with teal sheen; crimson #8e2d4a with a light pink #b5737b.
- Headlines also have a faint engraved line texture in the fill.
- **Prototype:** `Sheen.tsx`.

**Fonts.** Method: Chromium renders with real shaping, degraded to the reference's resolution, Otsu masks, IoU plus width error over 239 weights, then x-height and stem measurements.

*Serif* (reference x-height/ascender 0.683, stem/x-height 0.304) [Likely]:

| Font | x-height | Stem | Width | IoU |
|---|---|---|---|---|
| Newsreader opsz 72 w600 (letter-spacing -0.03 em) | 0.696 | 0.309 | +1.8% | 0.632 |
| Frank Ruhl Libre 700 | 0.696 | 0.309 | +8% (tighten) | 0.731 |
| Source Serif 4 700 | 0.671 | 0.358 | +8.6% | 0.748 |
| Merriweather 700 | 0.692 | 0.278 | +1.3% | 0.738 (lower contrast) |
| Instrument Serif (current kit font) | — | 0.161 | -18% | 0.541 |

The kit font has about half the reference stroke weight and is 18% too narrow, which helps explain the "5% close" verdict.

*Sans* (single-storey a, straight-tailed y) [Likely]:
- **Lexend 500**: IoU 0.792, width -1.5%, letter-spacing -0.02 em.
- Poppins 500 (in the kit): IoU 0.764.

## Files
- Comparison sheets (reference vs prototype): `fx/compare/cmp_lens.jpg`, `cmp_band.jpg`, `cmp_foil.jpg`, `cmp_duotone_roundtrip.jpg`, `cmp_paper.jpg`, `cmp_sheen.jpg`, `font_board_serif.png`, `font_board_sans.png`.
- Clips: `fx/renders/FxLens.mp4`, `fx/renders/FxFoil.mp4`.
- Duotone grid: `fx/renders/duotone_grid.png`.
- All measured parameters: `fx/params.json`.