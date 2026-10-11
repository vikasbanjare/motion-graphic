# CRITIQUE of BUILD-SPEC.md (completeness critic)

Working files: `RC/critic/` (`lens.py`, `screen2.py`, `screen3.py`, montages `m1..m5.jpg`, `z1.jpg`, `hl.png`). Everything stays in scratch.
Tags: [Certain] = measured here and repeatable; [Likely] = seen on frames or strongly implied; [Guessing] = untested.

## 0. Verdict in one paragraph

The numbers in the spec are mostly right. I re-measured 5 of them and they hold. The spec has three bigger problems:
1. **The plan is a scene-by-scene remake of the reference.** It follows the same order, uses the same palette per slot and the same compositions, with only the nouns swapped. Table D2 even scores each of our shots for ΔE against "its" reference shot. That breaks the brief's "no 1:1 compositions" rule.
2. **Several of its grammar rules are wrong or incomplete when checked against the frames.** These are the headline period, the headline colour, copy always sitting above the world, and the fixed 45° screen.
3. **Several builds are not in the prototype code** even though the spec says "models2.ts". Some effects (foil on 3D objects, motion blur around WebGL, the card-face texture) are not feasible as written.

## 1. Spot-checks against `ref1/f6` frames (15 claims)

| # | Spec claim | Frames looked at (t s) | Result |
|---|---|---|---|
| 1 | The opening is a single line, then 8 hand-drawn sinusoids with ragged ends, then a guilloche field | 0.5, 2.5, 3.5 | ✓ [Certain] |
| 2 | The field is clipped by a big pale disc, with a cream→mint wash revealed | 4.0–4.83 | ✓ [Certain] |
| 3 | The hero bird is posterised, with no 45° screen | 8.0. FFT on the bird patch gives 5.7 px at 80°, not the 2.6 px / 45° screen | ✓ [Likely] |
| 4 | The world-into-object reveal hue-rotates the inks (violet→blue→cyan) | 9.5, 9.83, 10.17 | ✓ [Certain] |
| 5 | The object sits on a dark slate under a wide loupe, top-left | 10.5, 12.0 | ✓ [Certain] |
| 6 | The macro loupe has R50 ≈ 0.46 W and sits centred | 15, 16, 19.5, 50.5 (see §2) | ✓ [Certain] |
| 7 | The holo band carries white uppercase, widely tracked text | 15.0 | ✓ [Certain] |
| 8 | The headline is a lowercase serif "**with a period at the end**" | 22–59 | ✗ **Only 1 of 7 headlines has periods.** These have none: "monitor your cash flow", "view all your dues", "get reminders & updates", "dive deep into your money", "keep the findings to yourself", "ignorance to bliss" [Certain] |
| 9 | "Headline colour = the scene's ink" | 39.3–46.5 | ✗ In the grey reef world the headline is a saturated violet→blue gradient, i.e. an accent and not the ink. A1.2 already counts headline ink as a saturated source, so A1.2 and A7.1 contradict each other [Certain] |
| 10 | "Copy sits **above** the world" (A12.4) | 41.0, 43.0 | ✗ The shell rises in front of "…your money", and the koi and clownfish swim in front of "keep" and "yourself". **Type is depth-layered inside the world** [Certain] |
| 11 | The glass card has one sharp active row and smeared rows; it is lavender | 27.3–32.3 | ✓ [Certain] |
| 12 | Object-matte wipe by a foreground pillar | 27.33 (textured crimson bar at the right edge while lavender is already composed) | ✓ [Likely] |
| 13 | Saturated colour comes only from foil, UI, hero and headline | 34–38.8 | ✗ partial: the **light beams** are saturated green gradient cones and are not listed [Likely] |
| 14 | The product shot has a grey headline on the left at x-height 3.8 % H, with a floor glow | 57.5, 59 | ✓ (re-measured 3.9 % H) |
| 15 | Lights-out, then black, then emblem plus wordmark | 59.67, 60.5, 64 | ✓ [Certain] |

## 2. Re-measured numbers (5)

1. **Loupe circle** [Certain]
   - Method (`critic/lens.py`):
     - threshold luma at the midpoint between the inside median and the outside 5th percentile;
     - take the largest component;
     - Kasa circle fit, dropping points on the frame edge.
   - R50/W:
     - 0.458 (t15)
     - 0.460 (t16)
     - 0.458 (t19.5)
     - 0.465 (t50.5)
     - Fit rms is 3.5–4.7 px.
   - Centre: 50.8–51.2 % W, **52.4–53.1 % H**.
   - Spec: R50 0.457–0.465 ✓; centre 53–54 % H, about 1 % H too low. Use cy 0.525–0.53, which is what `Lens.tsx` cy 0.52 and the swap landing at 52.5 already do.
2. **Hard cuts** [Certain]
   - Method: whole-film 24 fps grey 160x90 frame difference (MAD), checked at the spec's times.
   - 3.000, 13.458, 32.542, 35.750 and 40.583 are exact: MAD 22–58 against neighbours below 5.
   - 1.750 is weak (7.2 against 5.1). It is a thin-line-on-paper scale step, so this is plausible but not provable from MAD.
   - 54.75 (whip into black) and 60.458 (cut from black) can't be seen by MAD, as expected.
3. **Line screen** [Certain on the median, Likely on the spread]
   - Method (`critic/screen2.py`, `screen3.py`):
     - Hann-windowed 64 px patches, FFT zero-padded to 512, on a grid every 24–48 px;
     - validated on synthetic screens at 40 / 45 / 50° → 40.1 / 45.0 / 49.9°;
     - lines are "/", rising to the right.
   - Medians:
     - flora: 2.57–2.75 px at 44.6–45.0°;
     - columns: 2.48 px;
     - lighthouse: 2.00 px at 45.2–45.6°.
   - These agree with the spec.
   - **But the per-patch angle histogram is multimodal:** about 38° / 45° / 52° on flora (t6.5, 8.0) and columns (t24), and 41° / 45° / 49° on the lighthouse.
   - So individual plates or objects carry **their own screen angle, offset ±4–7° from 45°**. This is consistent with plates engraved and then rotated in comp.
   - The spec's build rule "always 45° on screen" will look more mechanical than the reference.
4. **Headline metrics** [Certain]
   - Method: row ink profile on 640x360 crops.
   - "multiple banks.": x-height 15 px = **4.17 % H**, ascender 6.1 % H, line pitch 7.8 % H.
   - "ignorance to bliss": 3.9 % H.
   - Spec: 4.2–5.0 / 6.1–7.2 / 7.5 / 3.8. ✓ within about 0.3 % H.
5. **Audio gaps** [Certain]
   - Method: 10 ms RMS on `ref.wav`, below −70 dBFS.
   - 0.00–0.63 s, then **4.06–4.29 s (230 ms)** under the wash wipe.
   - The spec plans a 0.15 s gap and says "0.2 s". The reference gap is 0.23 s; use 0.21–0.23 s if we copy the device.

## 3. Wrong or internally inconsistent items in the spec

1. **A7.1, the headline period** is wrong; see check 8. The plan puts periods on all three headlines ("redeem on flights." / "and hotels.", "2,000+ products.", "zero joining fee.").
   - Fix: no period by default. Allow at most one two-part "x. y." line in the film, and not in the reference's own "multiple banks. single view." form.
2. **A7.1, the headline colour.** In neutral or grey worlds the headline is a saturated accent gradient (violet→blue, hue spread about 40°). It is the ink only in coloured worlds.
3. **A12.4, copy above the world.** It must say: copy sits in the world's depth stack, and foreground objects or creatures may pass in front of it. The lens vignette stays on top.
4. **A2.6, "always 45° on screen."** Change it to 45° ± a per-object offset drawn from {−7, 0, +7}°, fixed per object (see §2.3).
5. **The B rhythm check** says the longest take is "5.46 s (S09–S12)". S09 starts at 9.417 and the S12 wipe is at 15.333, so it is **5.92 s**.
6. **S16:** "rosette fades out over f580–590", but S16 ends at f561. Wrong frame range; probably f540–550.
7. **S13, "2,000+" counts up over 12 frames.** This puts invented numbers on screen (e.g. "1,437+"), which breaks "no other number may appear".
   - Fix: a mask or roll reveal of the final "2,000+" only.
8. **Text hold violates the repo rule** (`pro-film-rules.md`: text held at least 0.4 s per word, and A12.1 says 3.2–4.0 s):
   - S11: 13 words readable for about 2.0 s (f301–350). It needs at least 5 s, or shorter copy.
   - S17: 8 words for 1.6 s. It needs at least 3.2 s.
   - Fix: cut the sublines (e.g. drop "with the CRED IndusInd Bank RuPay credit card" from S11; the lockup says it) and give each copy block at least 2.4 s readable.
9. **Locked holds** (S09 dead still f241–253, S11 f297–338, S17 f592–626) break the repo rule "no static holds over 12 frames". A9 itself says the reference's holds drift.
   - Fix: give every hold the "living still" drift (0.45 % W/s, +0.1 %/s scale, 0.2°/s roll).
10. **D2 ΔE targets "vs the mapped reference shot"** turn the scorecard into a copy-enforcer. They force our palette sequence to equal theirs. See §5.
11. **C3/C5 claim the subjects already exist in `models2.ts`.** What actually exists (checked by grep in `RC/tech/mk/src/lab/`):
    - card body, chip, giftBox, hotelBell, suitcase, airplane, balloon, shoppingBag, crane, text3d, globeAlbedo and lighthouse exist.
    - **No** kraft parcel or twine, no shelves, no stepped plinth, no raised-relief globe (only an albedo texture), no card slab, no Alfa Slab "5%" (text3d only).
    - The crane is **one merged geometry**, so its wings cannot hinge as S04 needs.
12. **The E closeness estimate (65–72 %)** is untested; nothing in v2 has been rendered. Tag it [Guessing], not "basis is the measured matches".
13. **Minor:**
    - The intro digital silence is 0.63 s by the −70 dB measure, not 0.54 s.
    - The context said "~10 hard cuts", while A11 says 8. A11's list is right by MAD for the 5 cuts I tested.

## 4. Visual traits of the reference that no rule covers

1. **Depth-layered type with occlusion** (41.0, 43.0). Creatures and objects pass in front of the headline.
2. **Secondary life density.** Every world has 2–6 small ambient movers besides the hero: fish schools, single fish crossing, tiny birds over the lighthouse (35.8), the turtle's school. The spec only gives S13 balloons. S04, S10–S11 and S16 have none.
   - Rule: 1 hero plus at least 2 ambient movers per world, each on its own linear path and period.
3. **Light-beam treatment** (34–39 s). Gradient cones with:
   - concentric ripple arcs;
   - a **pixel-mosaic / block-glitch** on the lamp (36.8–37.3);
   - tiny red square "pixels";
   - a UI card emerging from the beam.
   - Only "pixel-smeared UI rows" are covered. Mosaic and blocks as a "data" motif is a separate device.
4. **Atmospheric depth.** Background plates are lower contrast and lighter: the sea behind the colonnade, the far reef. Only S14 uses this. Make it a rule: far layers at 40–60 % contrast plus a lift toward paper.
5. **Per-object screen-angle offsets** (§2.3).
6. **Security-print margin on the object.** The note in 10.5–12 has an off-white border with a fine mesh pattern before the dark slate. Our card has no equivalent edge treatment.
7. **Grain strength per world.** The grey reef world carries visibly heavier photographic grain than the intro paper. A4 measures only intro and banknote paper; measure the reef with the same DoG method before building any grey world.
8. **The headline's internal colour gradient.** This is a multi-hue gradient across the words (40.0 magenta → violet → blue), which is different from the moving sheen.
9. **The light beam as a saturated source** (A1.2 rationing list).

## 5. Planned shots that risk reading as copies (highest risk first)

Overall, the 18 shots map 1:1 onto R01–R23 **in the same order**, with the same palette per slot (grey → cream/mint violet+olive → mint slate → mint loupe → peach top-down → crimson hero → lavender → green loupe → green seal → black studio) and mostly the same framing. A motion designer will read it as "the CRED Money ad with a card in it".

| Shot | What is copied | Risk | Fix |
|---|---|---|---|
| S01–S03 | Same opening beat for beat: same pitches 9.0→5.8→2.2 % H, same strokes, ragged ends, wash wipe, **same disc clip at (−23 % W, 97 % H), R 78 % W** | High | Keep the *technique* (scale-step cuts, density rising, wash wipe). Change the *drawing*: concentric or spiral rosette strokes or a vertical warp. Mirror the disc to top-right. Use a different line count, e.g. 1 → 5 → 30 |
| S04 | Layered fly-in of engraved still-life plus a posterised flying hero that perches, in violet+olive on the wash | Med-High | Change the palette pair (e.g. teal + ochre). The hero should not be a bird-like flier landing on a perch; use e.g. a parcel ribbon unfurling. Assemble from 2 sides, not 3 corners |
| S05–S07 | Print→object reveal on a mint slate under a top-left wide loupe, a diagonal holo strip with tracked text, then a hard cut to a centred loupe macro with a **horizontal foil band of tracked caps across 44 % H** | **Very high** (the reference's signature) | Change the slate colour (e.g. ink-blue). Put the wide loupe at bottom-right. In the macro, make the band **vertical or diagonal** and read it by a camera *pan along the band*, not a frontal centred read. Change the band text style (e.g. mixed-case sans with an engraved "5%" numeral) |
| S09–S11 | Peach top-down rosette with **a ring of small icons around a central diamond** → iris-out → tilt-up → **diamond becomes a plinth**, hero centred on the plinth with **one object on each third**, crimson, two-line top-centre headline with periods | **Very high** | Drop the diamond and plinth. Use a top-down *flight path or route map* that tilts up into an asymmetric landscape (globe at the left third, horizon low). Use a non-crimson palette (e.g. indigo/cream) and a one-line headline at the bottom-left |
| S12 | Orbit plus a foreground vertical-object matte wipe out of the crimson world into lavender | Medium | The technique is fine. Change the destination palette order and use a horizontal-moving *non-vertical* object (e.g. a sliding card) |
| S13 | Lavender world, foil hero drifting right, a school (balloons) drifting left, a top-centre headline and a centred glass card | High | Change the palette, put the glass card off-axis (right third) beside the hero, put the headline at the bottom-left, and replace the "school" with a different motion pattern (vertical rise) |
| S14 | **Giant 3D slab-serif letters with green sides standing on engraved paper under the loupe**, in the same greens (#075529) | **Very high** | Remove it, or make "5%" a *debossed / foil-stamped* numeral in the card surface under raking light, in a non-green palette, with no loupe |
| S15 | Circular seal with ring text, cream/green, under the loupe | High | Use a different emblem shape (hexagonal or rectangular guilloche cartouche) and leave out the ring text |
| S16 | Pull-back to the whole object on a black void, a vertical holo strip at the right, then a whip up-right | High | Pull back to the card *in hand-free perspective* on a coloured paper ground, and whip in another direction (down-left) |
| S17 | Flying curved sheet lands on a device in a black studio; headline grey at the left 19.4 % W, baseline 48.6 % H; floor glow; lights-out | Med-High | Change the studio to a light or coloured seamless. Put the copy on the right. Exit by a different device (card flips to its back, cut on the flip) |
| S18 | Cut from black → white lockup on black, then fade | Low (generic) | OK |

**Process fix:**
- Re-sequence. Pick at most about 6 of the 12 reference devices, put them in a different order and assign palettes freshly (e.g. ink-blue, ochre/teal, indigo/cream, terracotta; keep grey for the intro only).
- In D2, score ink and paper ΔE against the **palette family rules** (one ink plus paper, PCA axis-1 ≥ 0.8, saturation rationing), not against "the mapped ref shot".
- Add a **composition-similarity gate:**
  - For every 0.5 s of our render, find the max SSIM of 64x36 Sobel-edge maps against all reference frames at 6 fps.
  - Flag any shot with max SSIM > 0.45.
  - Also flag a palette sequence whose Lab path correlates > 0.8 with the reference's.
  - [Guessing on the thresholds; calibrate on v1, which should pass.]

## 6. Infeasible or unproven code-only items

| Item | Problem | Fix |
|---|---|---|
| S05 "render S03–S04 into a ≥4096 px texture", with the crane still flapping inside the card in S06 | DOM/SVG can't be drawn into a WebGL texture inside a Remotion frame. Needs a pre-render pass, then an animated texture (`useOffthreadVideoTexture` / image sequence) at 4096 px under SwiftShader, which is slow and memory-heavy | Build S03–S04 directly inside the same ThreeCanvas (guilloche as a shader plane, objects as meshes) and render to a `WebGLRenderTarget` at 2048–3072 px, used as the card map. No DOM rasterisation |
| Foil (`FoilGL`, a 2D overlay) on 3D surfaces: globe oceans, suitcase tag, gift ribbon, card edge | The overlay has no per-object mask from the 3D scene | Put foil inside the engrave shader as an overlay term per material (thin-film hue from view angle and normal), or render an object-ID mask pass |
| `<CameraMotionBlur>` around ThreeCanvas and `Lens.tsx` (double render) | Each sample re-mounts the children, so 8–10 WebGL contexts per frame. Chromium caps at about 16 live contexts; SwiftShader cost ×10. Never rendered here [Likely risk] | Do blur in-scene: accumulate N sub-frame camera poses into one render target (one context), or use 2D-only motion blur for DOM layers. Prototype one 10-frame shot before committing |
| S10 raised-relief globe from world-atlas 1:50m | Not built. Polygon triangulation on a sphere is needed; 1:50m has more than 100k vertices | Use 1:110m plus displacement from `landTexture()` on a subdivided sphere (already have the texture) |
| S04 crane wing hinge | Merged geometry | Split the wings into separate meshes with pivots (a small job) |
| S04 kraft parcel with twine, S13 shelves and "hills of stacked parcels", S10 stepped plinth, S12 card slab | Not modelled | Boxes, tubes and extrusions are easy, but plan 1–2 days of modelling and look-dev. The "photographic richness" gap stays (spec C6) |
| S14 Alfa Slab via `TTFLoader` | Needs opentype.js and is untested | Convert the TTF to typeface JSON offline with facetype-style code, or use three's Droid Serif JSON (if S14 is kept at all; see §5) |
| S17 curved sheet laminating onto the card, RectAreaLight rims | Feasible but untested under SwiftShader. A bent-plane hand-off easily reads cheap | Simplify to a hard match-cut, or a face "print-on" wipe |
| `Sheen.tsx` uses `background-attachment: fixed` | Breaks inside transformed parents (the spec flags it but leaves it) | Animate `background-position` in local coordinates |
| Fonts and motion-blur packages | Not rendered in Remotion yet | Make a 1-frame smoke render before the build |
| Sound | Synthesised and never listened to | Do a human A/B before locking the picture to it |

## 7. Concrete fixes (ordered)

1. Re-structure the film so it is not shot-for-shot. Use at most about 6 reference devices, in a new order with new palette assignments. Re-stage S05–S07, S09–S11, S14, S15 and S16 per §5. Replace the per-shot ΔE-vs-mapped-ref targets with palette-family rules and add the composition-similarity gate.
2. Fix the grammar rules:
   - headlines without periods by default;
   - accent-colour headlines in neutral worlds;
   - depth-layered type with occlusion;
   - per-object screen-angle offsets of ±4–7°;
   - an atmospheric-depth rule;
   - an ambient-movers rule (2–6 per world);
   - a light-beam / mosaic device (optional; use it on one original subject only).
3. Respect the repo text and hold rules:
   - at least 0.4 s per word: shorten the sublines and give each copy block at least 2.4 s;
   - drift on every hold;
   - no count-up of "2,000+".
4. Fix the arithmetic: longest take 5.92 s; the S16 rosette frames; the wash-gap length 0.21–0.23 s; lens cy about 0.525–0.53.
5. Prove the risky tech on a 2-second test before the build:
   - one ThreeCanvas with a render-target card face;
   - in-shader foil;
   - in-scene motion blur;
   - fonts.
   Measure s/frame.
6. Model the missing subjects (parcel and twine, plinth or replacement, slab, shelves) and split the crane wings; or replace these subjects with ones already modelled (giftBox, bag, balloon, airplane, suitcase, bell, globe).
7. Re-tag the E estimate as [Guessing] until v2 is rendered and scored.
