# Teardown: "How Do Solar Panels Work?" (flat 2.5D editorial explainer)

Reference: `1Hcg3X8G_q34iS-RqcAQ2pMHpGkIhxu3j.mp4`, 35.84 s, 1138x640 (16:9), delivered at 30 fps, with audio.
Method: viewed every contact sheet (timeline, overview, hook, shots, transitions), made 15 frame-by-frame zoom sheets (30 fps, 15 fps for long spans), extracted full-res stills with measurement grids, tracked colour masks per frame (centroid, edges, area) with numpy, ran a duplicate-frame scan, and compared cuts against audio onsets and a fitted beat grid. Frame counts are at 30 fps (1 f = 33.3 ms) unless stated. Guesses are marked [inferred].

> **Technical note.** A duplicate-frame scan shows that every frame at index ≡ 2 (mod 5) repeats the frame before it: 215 of 1075 frames, with a mean difference ≤ 0.7/255 against a median of 5.6 for all other frames. Four new frames out of every five gives **24 unique frames per second**: 860 unique frames ÷ 24 = 35.83 s, the exact running time. The film was animated at **24 fps** and converted to 30 fps by repeating every fifth frame. All motion therefore has a small judder every 167 ms, which you can see on the horizontal slides. In the frame lists below, "(dup)" marks these repeated frames.

---

## 1. Summary

- **What it is:** a short animated explainer (unbranded in this cut) answering the question "How do solar panels work?". It moves sunlight → household electricity → silicon wafer and electrons → a lightning-bolt "electricity" icon → phone charging → the word "photo|voltaic cells" → battery storage → exporting "back to the grid" → "earning credits on your electric bill" → a solar field → a three-strip recap montage. No logo or CTA appears. The piece looks like an excerpt or portfolio cut [inferred].
- **Look:** flat vector illustration with 2.5D tricks (rim thickness, long cast shadows, perspective panels) and a strict five-colour palette: cyan `#4DD9E5`, vermilion `#E12E16`, warm cream `#F6F1ED`, oxblood-black `#1D0B0A` and mustard `#F3C64E`. Fine film grain and halation bloom sit only on light-emitting objects. Each scene background is one flat colour, and consecutive scenes almost always change background colour.
- **Motion signature:** almost every shot follows the same envelope. The subject enters with a strong exponential ease-out (about 0.85–0.9× speed decay per frame), drifts slowly (0.3–0.5 % of frame per frame), then leaves with an exponential ease-in whip (8–11 f, reaching 15–20 % of frame per frame). The cut lands on the first frame after the subject has gone, often after a 1-frame empty plate. The motion almost never fully stops. True holds last at most 5 frames (the house), and the longest near-still moments (the phone's last ~8 f, the credit tokens' ~0.3 s) still carry slight drift or rotation.
- **Editing:** 23 detected segments, which I corrected to **17 real scenes**. Corrected ASL is **2.1 s** and corrected median 1.9 s (detected ASL 1.56 s, median 1.4 s). Four detector cut times were 1–5 frames early and are corrected here: 20.47→20.53, 22.93→22.97, 26.37→26.53 and 30.53→30.63 s. Long "hero" beats of 3.3–4.7 s alternate with bursts of 0.4–1.3 s inserts and flash frames.
- **Audio:** music bed at **64.6 BPM** (a 0.93 s pulse, probably 129 BPM in half-time [inferred]). Integrated loudness is −16.6 LUFS with a flat level (σ 1.7 dB). Speech likelihood is ambiguous (mean 0.50). The on-screen keyword captions suggest a voice-over [inferred]. 5 of the 16 real hard cuts (31 %) fall within ±2 f of an onset, against about 20 % at random. 4 of the 5 cuts in the middle act (6.8–16.2 s) land within about 1 f of an onset.

---

## 2. Creative Direction

| Dimension | Observation |
|---|---|
| Concept | "Follow the energy." Each scene hands the energy to the next carrier: sun → light → lamp → wafer → electrons → bolt → phone → word → battery → grid → money. Shape and light-source matches carry the narrative across cuts. |
| Visual language | Mid-century editorial illustration crossed with contemporary flat vector. Geometric primitives (circle sun, trapezoid lamp shade, rectangles), line-icon inserts (sun star, bolt), pictograms (⚠), simple data-viz bars. Everything is built from a small kit of shapes. |
| Personality | Curious, warm, confident and slightly retro. Playful physics (bouncing wafer, wobbling phone, tipping lamp shade and batteries) is held in check by a disciplined palette and type. |
| Tone | Educational but premium. It reads like a magazine spread or museum-exhibit motion piece, not a corporate explainer. |
| Positioning | **Premium-playful editorial.** About 45 % editorial/premium, 35 % playful, 15 % technical (wafer, electrons, gauge chart), 5 % cinematic (light-source matches, halation). |
| Consistency | Very high. The same five colours appear in every frame, with the same grain and bloom. Two type families keep fixed roles (serif = concept words, grotesk = labels). Shadows are always hard and long, but their direction is not fixed: the batteries' shadows fall to the right (light from the left), while the credit tokens' shadows fall down-left (light from the upper right). Grotesk cap heights range from about 2.2 % H (recap strips) to 5.6 % H (message block). |
| Art-direction "rules" visible | 1) One hero object per frame, centred or on a thirds line. 2) Labels sit in negative space flanking the hero. 3) Background colour changes on every cut. 4) Emissive objects (lamp, sun-as-light, screen, rings, bolt) get bloom; nothing else does. 5) Depth comes from shadows and overlap, never from blur or DOF. |

---

## 3. Story Structure

| Stage | Time (s) | Duration | Purpose |
|---|---|---|---|
| Hook / title question | 0.00–1.53 | 1.53 s | Pose the question "How Do SOLAR PANELS work?" over a hero panel rising into frame. The first object appears on frame 1 (33 ms), so there is no dead lead-in. |
| Setup (problem framing) | 1.53–6.83 | 5.30 s | Sunlight hits a house. A lamp gives "Electricity", followed by "But how?" (the explicit question beat). The house is shown small in a big world (establishing). |
| Mechanism reveal (product core) | 6.83–14.30 | 7.47 s | Silicon wafer hero (4.7 s, the longest shot). Electrons get excited, rain as particles, and coalesce into a bolt. Flash frames mark the "energy is created" moment. |
| Benefit / use case | 14.30–16.17 | 1.87 s | A phone charges, making the concept concrete. |
| Naming / definition | 16.17–20.53 | 4.37 s | The term is built visually: "photo" (sun) \| "voltaic" (bolt) → "Cells". |
| Feature 2: storage | 20.53–26.53 | 6.00 s | Battery-gauge data viz (fill / empty / full + overflow ⚠), then batteries accumulating 1 → 4 floor by floor. |
| Feature 3: grid / net metering | 26.53–30.63 | 4.10 s | "Back to the Grid", then the money payoff "Earning credits on your Electric Bill". |
| Climax / scale | 30.63–32.53 | 1.90 s | A whole solar field under the rising sun: the widest, calmest shot. |
| Recap / outro | 32.53–35.83 | 3.30 s | Previous scenes return as vertical strips that slide in and lock into an exact thirds triptych. No logo or CTA (truncated or portfolio cut [inferred]). |

Ratio: hook 4 %, setup 15 %, mechanism 21 %, use/definition 17 %, features 28 %, climax 5 %, outro 9 %.

---

## 4. Shot-by-Shot

The detector's 23 segments are kept as rows. Rows marked **(merge)** are not real cuts. Corrected real scenes: 1, 2+3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13+14+15, 16+17, 18+19, 20, 21+22(part), 22(part)+23. Row times use frame-accurate cut times: the detector placed four cuts 1–5 frames early (20.47, 22.93, 26.37 and 30.53 s). The real cuts are at 20.53, 22.97, 26.53 and 30.63 s, and the table uses those.

| # | Time (s) | Dur | Composition / framing | Camera | Object / text movement | Depth & layering | Lighting / background | Palette | Typography | Transition out | Ease | FX notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0.00–1.53 | 1.53 | Low-angle hero. Two red panels on posts rise from bottom-centre; title stack centred in the top third. | Continuous vertical crane-down (scene translates up). | Panel rises (top edge 96.5→77.3 % H over f1–f10, expo-out). Title lines blur-fade in on a stagger: "How Do" f3, "SOLAR" f8, "PANELS" f16, "work?" f25. A star glint rides the panel's top-left corner. | Title (rides the camera), front panel, back panel with dark gap, posts. | Flat cyan, star lens glint, light bloom. | `#4DD9E5` `#D14835` white | Serif caps title, "SOLAR" cap ≈ 11.6 % H, "PANELS" ≈ 7.9 % H; white grotesk sub-lines ~2.8 % H. | Whip up into the posts (1 frame of motion-blurred white stripes at 1.50 s), then a hard cut to cream with the sun **continuing the upward motion** (direction match). | Expo-out in → linear drift 0.4 % H/f → expo-in out (8 f). | Grain, glint, motion blur on the exit frame, isometric 2.5D panels. |
| 2 | 1.53–3.17 | 1.63 | Sun centred in the upper third; roof silhouette as a lower-left diagonal; graded horizon band (red→cyan). | Same upward scroll continues. | Sun rises (17.5 % H on the first frame, then ×0.9 decay per frame). The roof follows ~4 f later. "Sunlight" blur-fades in at 2.27–2.40 s. | Sun (back), horizon band (mid), house silhouette (front): parallax, since the house travels faster. | Cream paper; the sunset gradient implies a light source. | `#F6F1ED` `#291312` `#DE3E23` `#58C8D3` | Red bold grotesk label "Sunlight", cap ≈ 3.6 % H. | Object wipe: from 2.93 s the house wall accelerates up and fills the frame. | Expo-out → drift → expo-in. | Parallax, grain. |
| 3 | 3.17–3.43 | 0.27 | **(merge with 2; false cut from a brightness drop.)** Dark wall fills the frame; the sun inverts to a white disc and shrinks to a point. | None (scale only). | The white disc (~11 % W) shrinks to a ~4 % W point (≈40 % of its diameter, ≈15 % of its area) in 2 f (3.30–3.37) while dropping to frame centre, then is held 2 f (3.37–3.40) as a glowing point. | Single element on dark. | Oxblood `#1D0B0A`, white bloom. | dark, white | n/a (no text) | **Light-source match cut**: point of light → lamp at 3.43. | Ease-in shrink. | Iris-like point transition. |
| 4 | 3.43–5.43 | 2.00 | Centred floor lamp with a cyan light cone. "Electricity" flanks left (centre x≈15 %), "But how?" right (centre x≈81 %). Wall switch right of centre. | Slow rise: the lamp drifts up ~10 % H over the first ~15 f (continuing the upward camera of #1–#2). Then static, then pans right (scene moves left) and accelerates in the last 4 f. | The shade and light cone tilt ~10–14° (cone base swings left) by f1–f3 while the pole stays vertical, then ease back to upright by ~f12 (3.83 s) with no overshoot. The pull-chain swings as secondary motion. "Electricity" fades in over f1–f4. The switch box flares with a red glow at 4.00 s (onset 4.02) that decays over ~0.6 s. "But how?" blur-fades over 4 f. | Lamp and cone, switch, labels, cord line. | Dark room. Emissive white shade and floor pool carry strong halation; red neon glow on the switch box and "But how?". | dark, cyan, white, red | Bold grotesk, cap ≈ 3.6 % H, coloured (cyan / red) with glow. | Pan-whip right, hard cut. | Expo-out return from the tilt (no overshoot), then expo-in exit. | Halation, neon glow. |
| 5 | 5.43–6.83 | 1.40 | Small house with solar panels on its roof (~25 % W including the shed, ~21 % H) on a vast cyan field; ~95 % negative space. | None; the object slides. | Enters from the right moving left at 4 % W/f, decays ×0.85/f and settles at x 53.6 % after 25 f. Holds 5 f, then exits right in 11 f, reaching 19 % W/f. Diagonal light rays drift across. | House, ground line, translucent god-rays. | Flat cyan with soft white diagonal rays. | `#4CDAE5` red white dark | n/a (no text) | Exits right, hard cut. The wafer is seen moving right at the cut (direction continuity). | Expo-out / 5 f hold / expo-in. | Light rays; small scale = establishing. |
| 6 | 6.83–11.53 | 4.70 | **Hero:** silicon wafer (~40 % W) floating over an elliptical shadow, centred. | Static frame; the object does all the motion. | Decaying bounce: landings at 6.87, 7.33, 7.80, 8.17 and 8.53 s (intervals 0.47, 0.47, 0.37, 0.37 s); each landing emits concentric shadow ripple rings. The first landing coincides with the cut and the wafer lifts off moving right. From ~8.7 s it rests and tumbles in place in pseudo-3D (stripe angle rotates, rim thickness shows). From 9.20 s, white capsule "electrons" with thin arc trails orbit, densifying until 11.3 s. Exit: wafer and floor drop out of the bottom together (a tilt-up, expo-in, 11.30–11.47 s), then 1 empty red-gradient frame (11.50). | Wafer with rim (2.5D), shadow ellipse, ripple rings, particles in front of and behind it. | Vertical sunset gradient (red→orange→mustard), dust specks. | `#F3C64E` `#D4321A` `#6C1811` `#EC8046` | n/a (no text; "Silicon" appears only in the recap) | Hard cut on the beat (11.53 vs onset 11.49) to dark particles. | Decaying gravity bounce; expo-in exit. | Specular sheen sweeps across the stripes; motion trails; grain specks. |
| 7 | 11.53–12.83 | 1.30 | Full-frame field of ~60 glowing particles on dark. | None. | Particles rain down. Colour flickers white↔cyan in 3–4 f bursts (11.63–11.73, 12.10–12.17). They converge into a vertical column (12.60–12.73) and coalesce into a bolt (12.77–12.80). | Particle sizes vary (depth cue). | Dark, bloom. | dark, white, cyan | n/a (no text) | Coalesce into a flash cut. | Fall, then ease-in convergence (4 f). | Strobe colour flicker, bloom. |
| 8 | 12.83–13.27 | 0.43 | Bolt centred. | Static. | **Flash frames**: background cyan for 3 f (12.83–12.90, one of them a repeat), cream for 2 f (12.93–12.97), then dark from 13.00. The bolt's outline offsets expand within 2 f. | Bolt fill + double outline. | Flashing background. | cyan, cream, dark | n/a (no text) | Seamless into the echo outlines. | Snap (no ease). | Highest motion peak in the film (205). |
| 9 | 13.27–14.30 | 1.03 | Outlined bolt: thick cyan stroke + thin inner red bolt. | Static. | Outline copies split sideways (offset ~5 % W) and fade to ~20 % over ~0.6 s. | 3 stroke layers. | Dark. | cyan, red | n/a (no text) | Hard cut exactly on the beat (14.30 = onset 14.30). | Linear fade. | Line art, glow. |
| 10 | 14.30–16.17 | 1.87 | Red phone centred, hovering over a glowing white ellipse. | **Scale pull-out** 3.0× → 1.0× in 24 f. | Width drops 22 % on the first frame (expo-out). Wobble: snaps to an ~11° tilt in 1 f (14.50), holds ~4 f, snaps back with a +5° overshoot and settles by ~15.17. The identical wobble repeats exactly 1.00 s later (15.50–16.13), so it is a looped cycle. Battery bolt icon flips cyan→dark on the second frame. No exit move: the phone is nearly still for the last ~8 f, then a hard cut. | Phone, glow pad (hover light). | Flat cyan. | cyan, red, white | n/a (only the battery-bolt icon) | Hard cut on the beat (16.17 vs 16.18). | Expo-out scale; snap tilt + damped return with one overshoot. | Screen glow, hover light. |
| 11 | 16.17–19.77 | 3.60 | Line-art sun icon centred, becoming a **red \| cyan split screen**. | Content slides left as the cyan panel enters. | Inner circle lifts out of the star while the star shrinks 100→60 % (16.20–16.65). A cream disc pops in (16.68), expands into a thick ring (16.78–16.90), then the ring thins and fades (17.2–17.75). "photo" fades and rises from below over 5 f (16.85–17.00). Cyan panel creeps in at the right edge from 16.83, then slides in over 17.0–19.4 (2.4 s, asymmetric ease) carrying a bolt icon. "voltaic" rises in over 8 f at 18.5. | Two flat fields, line icons. | Flat red / flat cyan. | `#E22E16` `#4CD8E3` white dark | Lowercase serif, x-height ≈ 5.7 % H, font ≈ 12.5–13 % H; white with glow vs dark. | Seamless push: a cream "Cells" band rises from below. | Expo-out; asymmetric ease-in-out on the wipe. | Glow on white strokes and text. |
| 12 | 19.77–20.53 | 0.77 | **(seamless)** Cream bottom band rises carrying the "Cells" label and horizontal red busbar lines. | Vertical push (scene scrolls up), accelerating. | Lines slide across the band; the band top goes 74 % H (19.77) → 39 % (20.37) → 6 % (20.47), and cream fills the frame at 20.50. | 3 bands. | Cream rising. | red cyan cream | "Cells" red grotesk, cap ≈ 4 % H | Full cream plate (1 empty frame at 20.50), then a hard cut at 20.53. | Expo-in. | Flat; grain only. |
| 13 | 20.53–21.03 | 0.50 | Extreme close-up of a giant dark battery as a level gauge (left 35 %), tick ruler, stepped bar chart (right). | Static. | The battery opens empty; the cream fill rises to ~40 % (20.60–20.80), then drains to ~20 % (20.83–21.00); bars rise. | Gauge, ticks, chart. | Flat red. | red, oxblood, cream, yellow gradient | n/a (no text) | **State jump-cut** (instant snap to empty at 21.03). | Ease-out fill, slow drain. | Gradient bars (yellow→red). |
| 14 | 21.03–21.53 | 0.50 | **(merge with 13/15)** Same set-up, battery empty (a cream sliver returns at 21.50). | Static. | Bars keep growing. | As #13 (gauge, ticks, chart). | Flat red. | red, oxblood, yellow gradient | n/a (no text) | State snap to full. | n/a (0 f snap); bars ease continuously. | As #13. |
| 15 | 21.53–22.97 | 1.43 | **(merge)** Battery full (cream with cyan tint at the bottom); ⚠ icon pops; overflow bar. | Slow push-in from 21.6; 1-frame push-left at 22.93. | ⚠ rides the level line; bars rise and fall; ticks flicker. | Gauge, ⚠, overflow bar, chart. | Flat red. | red cream cyan yellow | ⚠ pictogram | Push-left, hard cut at 22.97 (off-beat). | Snap (0 f) state change; continuous bar easing. | Data-viz storytelling. |
| 16 | 22.97–23.93 | 0.97 | Single red battery (~5 % W) with a **very long horizontal cast shadow** on cream. | Static, then a vertical scroll starts ~23.5 s. | Battery rocks ±~20°. A second battery appears. The scroll reveals a red band from below. | Battery + cast shadow. | Cream. | cream red oxblood | n/a (no text) | Seamless band push. | Ease-in-out. | Long hard shadow to the right = low light from the left. |
| 17 | 23.93–26.53 | 2.60 | **(seamless)** Batteries on a red "floor"; the next row sits on a cyan floor below. | Continuous slow scroll (~0.5 % H/f), accelerating at the end. | Batteries pop in one at a time from the right, about one per 0.5 s; each lands with a tip-and-settle wobble of ~0.3–0.4 s; count goes 1→4. | Horizontal bands as floors, shadows. | Red / cyan bands. | red cyan white oxblood | n/a (no text) | Whip-scroll up until the cyan floor fills the frame (26.50; its batteries are still visible at the top), then a hard cut at 26.53. | Expo-in. | Cumulative stagger; long shadows to the right. |
| 18 | 26.53–26.83 | 0.30 | Cream with a blue-gradient planet curve and the top of a red transmission tower. | Tilt and push: the tower grows, the dome rises. | Wires enter from the top. | Tower, dome, wires. | Cream + pale-cyan gradient dome. | cream `#A7E5EA` red | n/a (no text yet) | Seamless. | Expo-out. | Soft gradient on the dome; grain. |
| 19 | 26.83–28.43 | 1.60 | **(seamless)** Tower centred on the planet curve; labels flank it ("Back to" \| "the Grid"). | Slow downward drift, then a whip tilt-up (28.25–28.43, 6 f expo-in) into wires and sky. | "Back to" pops at 27.27 and "the Grid" at 27.60 (10 f / 0.33 s stagger), each blur-fading in over ~2 f. | Tower, dome, wires. | Cream, pale-cyan horizon gradient. | cream cyan red | Red grotesk, cap ≈ 3.6 % H | Whip up, hard cut at 28.43; the next shot opens on 1 empty red frame. | Expo-in. | Grain; no blur. |
| 20 | 28.43–30.63 | 2.20 | Diagonal composition: white-ringed credit tokens (bolt icon) arrive along a steep diagonal (~65° from horizontal, moving down-right); their long dark shadows fall down-left at ~30°; text block top-right. | Tokens enter from the top and decelerate (expo-out, 28.47–29.8), nearly hold for ~0.3 s, then the whole scene whips up-left and out (expo-in, 30.1–30.57). | Text lines blur-fade in over ~2–3 f each: "Earning" 28.97, "credits" 29.10, "on your" 29.37, "Electric" 29.67, "Bill" 29.80 (4 / 8 / 9 / 4 f stagger). The block drifts down ~2.5 % H, then leaves upward with the scene. | Tokens with hard cast shadows; text multiplied over red. | Flat red. | `#E12F17` oxblood, white ring, cyan inner gradient | Bold grotesk, cap ≈ 5.6 % H, dark maroon, leading ≈ 1.0, left-aligned. | Last token exits the top, 1 empty red frame (30.60), hard cut at 30.63 (onset 30.60). | Expo-out arrival; expo-in exit. | Hard shadows. |
| 21 | 30.63–31.00 | 0.37 | Cream with a red sun (diameter ≈ 25 % H); panels start sweeping in from the bottom-left. | Sun rises: top edge 62.5 % H at the cut → 35.5 % (30.83) → 26.9 % (31.00) → 7.7 % H by ~32.3 s. Expo-out: 11 % H on the first frame, half the travel in 6 f, 90 % in ~27 f. | Panels cascade in. | Sun behind, panel rows in front. | Cream. | cream cyan red | n/a (no text) | Seamless. | Expo-out. | Parallax (sun vs panels). |
| 22 | 31.00–34.53 | 3.53 | **Wide climax:** field of pale-cyan tilted panels on red posts in overlapping rows; sun upper-left (centre x≈28 % W, drifting to ≈21 % from ~32 s; y≈20 % H). | Panels drift left slowly. | At 32.53 s a vertical strip (wafer on mustard/red, label "Silicon") slides in from the right (5.5 % W/f, ×0.92 decay per frame). A second strip (lamp on dark) follows directly behind it from 32.87 s, so the two travel as one train. | Overlapping rows = depth; strips as frames-in-frame. | Cream. | cream `#B9DFE1` red `#F0BC56` | Recap labels, cap ≈ 2.2–2.5 % H ("Silicon"; "Electricity" / "But how?" re-laid above and below the lamp) | Strip content swap (34.53). | Expo-out. | Panel gradient (cyan→white). |
| 23 | 34.53–35.83 | 1.30 | Triptych in exact thirds (boundaries settle at 33.2 % / 66.8 % W by ~34.87): panel field \| wafer with electrons \| house on cyan. | Strips locked. | The middle strip loops its content vertically (35.6–35.8: wafer exits up, a new one enters from below), and the outer strips scroll up too. | Three frames-in-frame. | Mixed. | full palette | Recap labels as #22 | End of file (no logo, level falls to −34.6 dB). | n/a (locked); internal loop expo-in. | Recap montage. |

### Phase-2 attributes not covered by a table column

| Attribute | Observation (shots) |
|---|---|
| Angle | Mostly a flat front-on 2D view. Low-angle hero on the panels (#1), near-eye-level side views (#2, #5, #16–17), a slight top-down look at the wafer and the panel field (#6, #22). |
| Scale | Scale contrast carries meaning: macro (wafer ~40 % W, the phone opens at 3×, the battery gauge at extreme close-up) against micro (the house ~25 % W in ~95 % negative space, a single battery ~5 % W). |
| Perspective | Pseudo-3D only: wafer rim thickness and tumble (#6), isometric panels (#1), perspective panel rows (#21–22), the planet-curve horizon (#18–19). There is no vanishing-point camera. |
| Motion rhythm / speed changes | Each shot goes expo-out arrival → slow drift → expo-in whip. Speed jumps happen only at entries and exits. The wafer bounce decays from a 0.47 s to a 0.37 s interval. |
| Blur | A single motion-blurred frame on the hook exit (f45, the posts). Blur-to-sharp on text reveals. No other blur. |
| Glow | On emitters only: lamp shade and floor pool, the light point, neon labels, the phone hover pad, white line icons, the bolt. |
| Shadows | Hard and long. To the right for the batteries, down-left for the tokens, a floor ellipse under the wafer and the phone. |
| Reflections | n/a. None observed, apart from a specular sheen sweeping across the wafer stripes (#6). |
| Grain / texture | Fine monochrome grain on every frame, plus dust specks on the wafer gradient. |
| Motion trails | Thin arc trails on the electrons (#6). Echo outlines after the bolt (#9). |
| Depth of field | n/a (none). |
| Parallax | Sun vs roof (#2), sun vs panel rows (#21), colour floors (#17). |
| 2D/3D integration, UI-to-3D | n/a. The whole piece is 2D with 2.5D shading, and there is no software UI. |
| Match cuts | Sun → light point → lamp (#2→#4), shape and position match. Hook panel whip → rising sun (direction match). |
| Morphing | Particles coalesce into the bolt (#7→#8). The sun-icon circle becomes a cream ring (#11). |
| Mask transitions | The split-screen panel wipe (#11), the band push (#12, #16→#17). |
| Camera wipes | Whip tilts and scrolls to an empty plate (#1, #17, #19, #20). |
| Object wipes | The house wall rises to fill the frame (#2→#3). |
| Zoom / perspective transitions | The phone scale pull-out 3×→1× (#10). The tower push (#18). |
| Scene continuity | Screen direction carries across cuts (up: #1→#2→#4; left/right: #4→#5→#6), and every shot hands the energy to the next carrier. |

### WHY notes (important shots)

- **#1 Hook.** The first object appears on frame 1. The last title line starts at frame 25 and is crisp by frame 27 (0.90 s). The question is the title, so curiosity is set before the first second ends. The slow drift keeps the frame alive while it is read. The expo-in whip out of frame pulls the viewer into the next shot, and the sun keeps moving the same way, so the hard cut feels like one camera move.
- **#2→#4 Sun → point → lamp.** Two light sources are matched by shape and position (a white circle shrinks to a point, then the lamp appears). The cut explains the idea (sunlight becomes household light) instead of just changing the picture. The dark object-wipe resets colour so the lamp's bloom reads strongly.
- **#4 Lamp + "But how?"** Labels in the negative space left and right of a centred hero give a symmetrical, poster-like layout. The shade tilt adds physical life for only ~12 f. "But how?" is the explicit question beat, and the switch glow flares on a music onset (4.00 vs 4.02).
- **#6 Wafer hero (4.7 s).** It is the longest hold, given to the most important concept. Motion is internal (a decaying bounce, then tumble and electrons) so the frame never goes dead without a cut. Electrons ramp up in density from 9.20 s, so energy builds towards the transformation.
- **#7–#9 Particles → bolt → flash.** This is the film's peak (motion 205). It turns invisible physics (electrons) into the icon everyone knows (a bolt). Flash frames of 3 + 2 f give an "electric" hit without a long effect.
- **#11 photo \| voltaic.** The split screen is the word's etymology made visual: sun = photo, bolt = voltaic, each in its own colour field. A slow 2.4 s wipe gives reading time for one new word.
- **#13–15 Battery gauge.** A fill, then instant state snaps (empty / full + overflow ⚠), reads like UI states and says "storage fills and overflows" in about 2.4 s with no words.
- **#16–17 Batteries accumulating.** Count-up by stagger (1→4) plus floor-by-floor scrolling shows "more storage over time" without a chart.
- **#20 Credits conveyor.** The diagonal motion breaks the film's horizontal/vertical grammar exactly at the money message, which is the emotional payoff. The message block is the largest grotesk text in the film (cap 5.6 % H). "Earning" is fully on screen from 28.97 to ~30.3 s, but the complete five-line block is readable for only ~0.4 s (29.80–30.2) before the exit whip.
- **#22–23 Field + triptych recap.** The widest, calmest frame acts as the climax. The recap strips lock into exact thirds, which reads as "designed", and quietly summarises the story without text.

---

## 5. Frame-by-Frame Studies

### Study A: Hook, first 1.53 s (0.00–1.53, 46 f)
- f0: empty cyan plate (33 ms). f1 (and its repeat f2): star glint + panel edge enter at the bottom (top edge at 96.5 % H).
- **Panel entry:** top edge 96.5→(dup f2)→91.9→88.4→85.5→83.1→(dup f7)→80.9→79.1→77.3 % H over f1–f10. Deltas per new frame 4.6, 3.5, 2.9, 2.4, 2.2, 1.8, 1.8: **expo ease-out**. It keeps decelerating to ~1.1 % H/f by f14 and ~0.6–0.7 % H/f by f20–f29.
- **Title reveal:** opacity + defocus (blur → sharp), with no positional offset relative to the moving group. "How Do" f3–f5 (3 f / 100 ms). "SOLAR" f8–f11 (4 f; grey/blurred at f8–9, crisp red at f11). "PANELS" f16–f20 (5 f). "work?" f25–f27 (3 f). **Line stagger: 5 f, 8 f (267 ms) and 9 f (300 ms).**
- **Drift:** the top of "SOLAR" moves 22.5→18.4 % H (f11–f19), then 18.4→15.0 % (f19–f29): **0.34–0.51 % H per frame, about 0.42 on average** (≈ 12.6 % H/s, ≈ 136 px/s at 1080p). From f30 the title accelerates up into the exit.
- **Exit whip:** the panel's bottom edge moves 99.2→(dup f37)→97.3→95.2→91.4→84.2→(dup f42)→72.3→51.7 % H over f36–f44. Deltas per new frame 1.9, 2.1, 3.8, 7.2, 11.9, 20.6: after the first step each delta is ×1.7–1.9 the one before, a **pure expo-in over 8 f (267 ms)** with peak ≈ 20 % H/f (≈ 222 px/f at 1080p). f45: only the posts remain, rendered as vertical motion-blurred white bars. f46 (1.533 s): hard cut.
- Why it works: there are three motion phases in 1.5 s. Nothing is static, and the exit's direction and speed are picked up by the next shot.

### Study B: Sun rise → object wipe → point → lamp (1.53–3.60)
- Sun top edge: 83.1→(dup f47)→65.6→56.9→50.3→45.3→(dup)→40.6→36.2→32.6→29.4 % H (re-measured: 82.5, 64.7, 55.8 for the first three values). Deltas per new frame 17.5, 8.7, 6.6, 5.0, 4.7, 4.4, 3.6, 3.2: **expo-out, roughly ×0.9 per frame after a big first jump.** 50 % of travel is done in ~4 f.
- The roof enters 4 f after the sun and travels faster (parallax).
- "Sunlight" fades in over 2.27–2.40 s (4 f). Its position is fixed relative to the sun (world-space label).
- Exit: sun bottom 54.7→52.8→50.3→46.9→(dup)→42.2→35.6→26.9 % H (2.93–3.16): deltas 1.9, 2.5, 3.4, 4.7, 6.6, 8.7, ×1.35/f expo-in. The dark wall rises to fill the frame (**object wipe**, ~10 f: dark covers 39 % of the frame at 3.07, 68 % at 3.20 and 94 % at 3.30).
- Sun inversion: red disc → white disc on dark (colour swap hidden inside the wipe, 3.17–3.27). The full disc (~11 % W) sits alone on dark at 3.30. It shrinks to a ~4 % W point (≈40 % of its diameter, ≈15 % of its area) over 3.30–3.37 s (2 f) while dropping from y ≈ 27 % to ≈ 45 % H. It is held as a point for 2 f (3.37–3.40), then the lamp appears at 3.43 s (**light-source match cut**).
- Why it works: the colour change (red sun → white light) is motivated by the lighting change (day exterior → night interior), and the shrinking point carries the eye to the exact spot where the lamp appears.

### Study C: Lamp tilt and switch highlight (3.43–4.37)
- Lamp appears upright at f0 (3.433). The shade and light cone tilt (cone base swinging left) while the pole and its red base stay vertical. The floor-pool centre moves 45.6 → 39.1 → 37.8 → 37.5 % W over f0–f3, a skew of ≈ 11–14°. It then returns 40.8 → 42.2 → 43.3 → 44.0 → 44.5 → 44.9 → 45.3 % W (f5–f12) and is upright within 1° by f11–f12 (3.80–3.83). This is a **snap-tilt with an expo-out return and no overshoot**, not a pendulum. Over the same ~15 f the whole lamp drifts up ~10 % H (shade top 28 → 18 % H).
- "Electricity" blur-fades over f1–f4 (4 f).
- Switch: the switch box flares with a red glow at 4.000 s (onset 4.02 s), peaking at 4.03–4.07; the glow decays over ~0.6 s (to 4.63). "But how?" blur-fades over 4.10–4.20 s (4 f).
- Exit: scene pans left 5.30→5.40 s, accelerating (the "Electricity" label leaves the left edge).
- Why it works: a short physical settle (~12 f) gives life without stealing time. The switch flare works like a UI focus highlight that points at the cause (the switch) before the question appears.

### Study D: House slide-in / hold / slide-out + directional cut (5.43–6.90)
- House x-centroid: 69.9→65.8→63.8→62.3→(dup)→61.1→60.1→59.2→58.4→(dup)→57.7→57.1→56.6→56.1 … 53.6 % W at f25. Deltas 4.1, 2.0, 1.5, 1.2, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5: **expo-out, ~×0.85/f.** 90 % settled by f12 (400 ms), fully by f25 (833 ms).
- Hold: f25–f30 (5 f, 167 ms). This is the only near-hold in the shot.
- Exit: 53.7→54.0→54.4→55.1→(dup)→56.0→57.5→60.1→64.2→(dup)→71.3→90.7 % W. Deltas 0.3, 0.4, 0.7, 0.9, 1.5, 2.6, 4.1, 7.1, 19.4: **expo-in over 11 f (367 ms), ×1.6/f**, peak 19 % W/f.
- Cut at 6.83 s (onset 6.80 s, 1 f off). On the next shot's first frame the wafer is left of centre and moving right, so screen direction is preserved.
- Why it works: an asymmetric envelope (long soft arrival, short fast departure) feels deliberate and expensive. The whip exit doubles as the transition, so no transition effect is needed.

### Study E: Particles → bolt → flash frames → echo outlines (11.20–14.30)
- Wafer exit: the wafer and its mustard floor drop down out of frame together over 11.30–11.47 s (a tilt-up, expo-in, 6 f). 11.50 s is an empty red-gradient plate (1 f). Hard cut at 11.53 s (onset 11.49 s).
- Particles: ~60 dots rain down. Colour flickers cyan for 3–4 f at 11.63–11.73 and 12.10–12.17 (white otherwise). They converge into a vertical column over 12.60–12.73 (4 f) and fuse into a white bolt by 12.80 s.
- Flash: 12.83–12.90 cyan background (3 f = 100 ms, of which 12.90 is a repeated frame), 12.93–12.97 cream background (2 f = 67 ms), with the bolt's cyan outlines blooming outward. From 13.00 s: dark background, thick cyan outline + thin red inner bolt.
- Echo: from 13.3 s the outline copies split horizontally by ~5 % W, then fade to ~20 % opacity by 14.25 s. Hard cut at 14.30 s, exactly on an onset.
- Why it works: abstraction ramps from a physical object to a cloud of particles to an icon. Flash frames under 4 f read as "energy", not as a strobe. The echo outlines let the peak decay smoothly before the next scene.

### Study F: Phone pull-out (14.30–15.30)
- Phone width (bbox, re-measured): 50.4→39.5→34.5→(dup)→31.4→28.6 % W over f0–f5. From f6 the tilt inflates the bbox, so the phone height is the better scale cue: 96 % H (14.60) → 76 % (14.80) → 67.5 % (15.00) → 64.4 % (15.30) → 63.3 % H (16.0). The final width is 16.4 % W. **Scale ≈ 3.1× → 1.0×, within ~5 % of final by ~f24 (0.8 s) and fully settled by ~15.3 s.** The first frame removes 22 % of the width, about a third of the total change: **expo-out (≈ easeOutExpo)**.
- Rotation wobble: the phone snaps to −10° in one frame at 14.50, reaches −12° by 14.63, snaps back to ≈ 0 at 14.67, overshoots to +5° at 14.83 and settles by ~15.17. Exactly the same curve repeats 1.00 s later (15.50–16.13), so it is a looped wobble cycle. A glowing hover ellipse below acts as a "floating object" contact light.
- Why it works: starting inside the icon (battery symbol at full frame) and pulling out reveals the context (it's a phone). This is the same "zoom-out reveal" product films use on UI.

### Study G: "photo | voltaic" split-screen wipe (16.15–20.50)
- Icon choreography: inner circle rises out of the star (16.22–16.62); star scales 100 % → ~60 % (ease-out); cream disc pop (16.68) → ring expands 4 f → ring thins and fades over ~17 f (17.20–17.75).
- "photo": fade + 10–15 % H rise + blur over 5 f (16.85–17.00).
- **Cyan panel left edge** (% W): 98.1 (17.10) → 93.8 (17.37) → 89.8 (17.50) → 84.7 (17.60) → 77.3 (17.67) → 71.0 (17.77) → 65.4 (17.87) → 61.7 (18.00) → 58.0 (18.20) → 55.2 (18.47) → 53.4 (18.70) → 52.0 (18.97) → 51.0 (19.40) → 50.8 (19.60).
  - The edge first creeps in from 99.8 % at 16.80 (0.2–0.4 % W/f). Acceleration ~15–20 f (500–670 ms). Peak velocity 3.5–4.0 % W/f at 17.63–17.70 (≈ 70–77 px/f at 1920 wide). Deceleration tail ~50 f (1.7 s).
  - Total 49 % W in ~2.4 s. Profile: an **asymmetric "slow-in, fast, very long settle" ease**. A least-squares fit over 17.0–19.4 s (19 samples) gives **cubic-bezier(0.45, 0, 0, 1)**, with an RMSE of 1.5 % of the travel. The earlier estimate, cubic-bezier(0.55, 0, 0.1, 1), lags the measured move in the middle (progress 0.19 vs a measured 0.45 at 17.67 s; RMSE 12 %).
- "voltaic" rises from ~90 % to ~72 % H over 8 f (18.50–18.77), expo-out.
- "Cells" band: rises from the bottom at 19.47 s and pushes the whole frame up, accelerating (band top 96.7 % H at 19.47 → 74 % at 19.77 → 39 % at 20.37 → 6 % at 20.47). The frame is full cream at 20.50 s (one empty plate frame), then a hard cut at 20.53 s.
- Why it works: a long-settle ease gives the eye ~1.5 s of almost-still frame to read a new word while the composition is still technically moving. The colour split teaches the word's two halves.

### Study H: Battery gauge state snaps (20.53–22.97)
- The battery opens empty at 20.53. The cream fill rises to ~40 % over 20.60–20.80 (ease-out), then drains to ~20 % over 20.83–21.00. Snap to empty at 21.03 (0 f transition). A cream sliver returns at 21.50, then a snap to full + ⚠ + overflow bar at 21.53. ⚠ slides with the level line; bar chart heights animate continuously (yellow→red gradient bars), and a slow push-in starts at ~21.6.
- 22.93: the frame jumps left for 1 frame, then a hard cut at 22.97 to the single battery on cream.
- Why it works (and limits): instant state changes read as "system states", which suits a data-viz moment. But the snaps are not on the beat (21.03 is 0.18 s from the nearest onset, 21.53 is 0.23 s), so they feel slightly arbitrary.

### Study I: Grid whip → credits conveyor + text reveal (27.20–30.63)
- "Back to" pops at 27.27 and "the Grid" at 27.60 (10 f stagger), each reaching full ink in ~2 f.
- Tower holds with slow downward drift until 28.25 s, then whips over 6 f (28.25–28.42) as the dome drops out and wires sweep. Hard cut at 28.43 onto **1 empty red frame**. From 28.47 the first token enters at the top edge.
- Token ring path (first token): (38.0, 8.8) at 28.47 → (40.0, 15.8) → (42.1, 26.4) → (dup) → (44.2, 35.3) → (46.2, 43.0) → (48.0, 50.9) → (49.5, 56.6) % (W, H) at 28.70. It travels down-right along a steep ~65° diagonal and decelerates expo-out. Per-frame steps are 7.0, 10.6, 8.9 (over a repeated frame), 7.7, 7.9 and 5.7 % H, falling to ~1 % H by 29.3. Further tokens follow at ~0.2–0.4 s intervals, and all of them nearly stop by 29.7–30.0. Then everything whips back up-left (expo-in, 30.1–30.57) and exits the top. 30.60 is an empty red frame and the hard cut is at 30.63 (onset 30.60).
- The long dark shadows fall down-left at ~30° from horizontal, so they are not aligned with the token path.
- Text lines (dark maroon on red) blur-fade in over ~2–3 f each: "Earning" 28.97, "credits" 29.10, "on your" 29.37, "Electric" 29.67, "Bill" 29.80. **Stagger 4 / 8 / 9 / 4 f (mean ≈ 0.21 s).** "Earning" sits fully inside the frame (cap top at y ≈ 10.6 % H). The block drifts down ~2.5 % H (29.0–29.8), then leaves upward with the scene from ~30.1.
- Why it works: the diagonal conveyor plus long shadows create "flow of value" without an arrow. Text is world-anchored, so it moves with the scene.

### Study J: Solar field climax → triptych recap (30.63–34.87)
- Sun top edge (diameter ≈ 25 % H): 62.5 (cut, 30.63) → 51.4 → 45.9 → (dup) → 41.9 → 38.4 → 35.5 (30.83) → 32.8 → (dup) → 30.6 → 28.6 → 26.9 (31.00) → 19.7 (31.20) → 15.8 (31.37) → 13.0 (31.53) → 10.9 (31.70) → 9.4 (31.87) → 8.8 (32.00) → 7.7 % H (32.3, held). First-frame step 11.1 % H, then 5.5, 4.0, 3.5, 2.9: **expo-out; half the travel in 6 f (0.2 s), 90 % by ~31.53 (0.9 s), settled by ~32.3 (1.7 s).** Its centre then sits at y ≈ 20 % H and drifts left (x 28 → 21 % W, 31.9–32.6) with the field. Panels cascade in from the bottom-left from 30.67 with row-to-row stagger ≈ 2–3 f.
- Recap strip 1 (wafer/"Silicon") left edge, re-measured on the mustard floor: 98.6 (32.53) → (dup) → 93.1 → 88.0 → 83.5 → 79.4 → (dup) → 75.7 → 72.4 → 69.6 (32.83) … 60.3 (33.00) … 52.2 (33.20) … 44.8 (33.50) … 39.9 (33.80) … 37.4 (34.00) … 34.4 (34.47) → 33.2 % W (34.87, then locked). Deltas 5.5, 5.1, 4.6, 4.0, 3.7, 3.3, 2.8 …: **expo-out, ~×0.92/f, 2.3 s to settle.**
- Final lock: strip boundaries at 33.2 % and ≈ 66.8 % W (mustard edge 66.7, cyan edge 67.1), an exact thirds triptych. Strip 2 (lamp on dark) enters at 32.87 s, butted directly behind strip 1 (≈ 0.33 s after it), so the two travel as one train. It swaps to the house on cyan at 34.53 s (hard content swap inside the strip). The lamp strip is a re-composed vertical layout ("Electricity" above the lamp, "But how?" below), not a crop of shot #4.
- Why it works: the recap reuses established scenes (no new information) and locks into a mathematically clean grid, which signals "end" and "system".

---

## 6. Motion Language Observed

| Pattern | Where | Speed / numbers | Read |
|---|---|---|---|
| **Expo-out entrances** | Panels, sun (#2, #21), house, phone scale, recap strips, credit tokens, "voltaic" | 50 % of travel in 3–6 f; ×0.85–0.92 decay per frame; 90 % settled in 10–27 f | Premium. Objects "arrive" and are decisive. |
| **Expo-in whip exits as transitions** | #1, #2, #5, #6, #17, #19, #20 | 6–11 f; ×1.35–1.9 growth per frame; last frame 15–20 % of frame per frame | Energetic, motivates the cut. No transition effect is needed. |
| **Perpetual drift** (no dead holds) | Every shot | 0.3–0.5 % of frame per frame; true holds ≤ 5 f, near-still moments ≤ ~9 f with residual drift | Keeps flat art feeling alive and filmic. |
| **Asymmetric long-settle ease** | photo\|voltaic wipe, recap strips | 15–20 f accel / ~50 f decel; 2.3–2.4 s total; wipe ≈ cubic-bezier(0.45, 0, 0, 1) | Calm, editorial and readable. |
| **Snap-tilt + settle** | Phone wobble (−12° snap, one +5° overshoot, settled in ~15 f, looped every 1.0 s); lamp-shade tilt (11–14°, no overshoot, ~12 f); battery tips (±~20°, not re-measured) | 1-frame snap into the tilt, expo-out return | Playful physicality; small amplitude keeps it adult. |
| **Gravity bounce + impact rings** | Wafer | Decaying bounce: landing intervals 0.47, 0.47, 0.37, 0.37 s, then rest from ~8.7 s; concentric ripple rings on each contact | Weight and settling. Only the 7.80 s landing falls on a music onset, so the bounce is not beat-locked. |
| **Stagger / cascade** | Title lines (5, 8, 9 f), "Back to"→"the Grid" (10 f), "Earning…Bill" (4 / 8 / 9 / 4 f), batteries (~0.5 s each), panel rows (2–3 f) | 2–10 f for elements of one group; 0.13–0.33 s for text lines | Sequential reading order; feels designed. |
| **Particle abstraction** | Electrons on the wafer, particle rain | 50–60 particles; colour flicker 3–4 f | Makes invisible physics visible. |
| **Coalescence / morph-by-particles** | Particles → bolt | Converge 4 f, fuse 2 f | Concept transformation. |
| **Flash frames** | Bolt birth | 3 f + 2 f | Impact; use once per film. |
| **Echo / offset outlines** | Bolt aftermath | Copies offset ~5 % W, fade ~0.6 s | Controlled decay after a peak. |
| **State snaps (data viz)** | Battery gauge | 0 f transitions | UI-state language; reads technical. |
| **Highlight flare** | Wall switch | Red glow flares in 1–2 f at 4.00 s and decays over ~0.6 s | Points attention to the cause; UI-like microinteraction. |

What reads premium here: strict ease families (mostly expo-out / expo-in, one long-settle in-out, one small snap-and-settle), small amplitudes, perpetual slow drift, and motion that always explains something. What would read amateur (absent here): linear slides, uniform ease on everything, bounce on text, holds longer than ~0.3 s with nothing moving.

---

## 7. Camera Language Observed

All "camera" work is 2D layer translation or scale. There is no true 3D camera, lens or DOF.

| Move | Where | Speed / duration | Purpose | Next-shot link |
|---|---|---|---|---|
| Vertical crane-down (scene scrolls up) | #1, #2, #12, #16–17, #22 | Drift 0.3–0.5 % H/f, ending in a 6–8 f expo-in whip | Continuity "down the energy chain" | Next shot continues the same direction (sun rising, band pushing). |
| Whip tilt (expo-in) | #1 end, #2 end, #6 end (tilt-up), #17 end, #19 end, #20 end | 6–8 f, up to 20 % H/f, 1 f motion-blurred | Transition carrier | Hard cut on the empty plate. |
| Horizontal pan-whip | #4 end | 4 f accelerating | Exit | Next shot's object moves in a compatible direction. |
| Scale pull-out (zoom-out reveal) | #10 | 3.0× → 1.0× in 24 f, expo-out | Reveal context from detail | — |
| Push-in / tilt combo | #18 (tower grows, dome rises) | ~10 f, expo-out | Arrive at a new location | — |
| Static locked-off | #4 (most of it), #6, #7–9, #13–15 | 1–4.7 s | Let object-internal motion carry the shot | — |
| Parallax pseudo-depth | #2 (sun vs roof), #21–22 (sun vs panels), #17 (floors) | Foreground ≈ 1.3–2× background speed | Depth in flat art | — |
| Diagonal conveyor | #20 | Expo-out arrival along a ~65° diagonal, ~0.3 s near-hold, expo-in whip back up-left | Value flow | Empty red frame, then a cut to the rising sun. |

Mistakes avoided: no random floating camera, no wobble-cam, no rotation roll. Every move has a direction that the next shot continues.

---

## 8. Typography

| Role | Example | Size (measured on 640 px, scaled to 1080p) | Weight / family | Case | Tracking | Leading | Alignment / placement | Reveal |
|---|---|---|---|---|---|---|---|---|
| Hero title | "SOLAR" | Cap ≈ 74 px/640 = **11.6 % H** → ~125 px cap (~175 px font) at 1080p; word width ≈ 33 % W | High-contrast transitional serif, bold (Caslon/Tiempos-like [inferred]) | ALL CAPS | Normal / slightly open (~+20) | n/a (single line) | Centred, top third (y ≈ 15–25 % H) | Blur + opacity, 4 f |
| Title line 2 | "PANELS" | Cap ≈ 50–52 px = **7.9 % H** (≈ 68 % of "SOLAR"; ~85 px at 1080p); width ≈ 25 % W | Same serif | CAPS | Slightly open | ~1.0 | Centred under the title | Blur + opacity, 5 f, +8 f stagger |
| Title connectors | "How Do", "work?" | Cap ≈ **2.8 % H** (~30 px at 1080p) | White geometric/grotesk sans, semibold, soft glow | Title case / lower | Normal | n/a | Centred above/below the title | Blur + opacity, 3 f |
| Concept words | "photo", "voltaic" | x-height ≈ 36–37 px = **5.7 % H**, ascender ("l") 8.9 % H; font ≈ **12.5–13 % H** (~135–140 px at 1080p) | Serif regular (Times-like) | lowercase | Normal | n/a (single line) | Centred in each half of the split, below the icon (y ≈ 65–75 % H) | Fade + rise 10–18 % H + blur, 5–8 f, expo-out |
| Labels | "Electricity", "But how?" | Cap ≈ 23 px = **3.6 % H** (~39 px at 1080p) | Bold grotesk (Helvetica/Haas-like [inferred]), coloured, neon glow | Title case | Tight-normal | n/a | Flanking the hero in negative space (word centres x ≈ 15 % / 81 % W), vertically on the hero's mid-line | Blur + opacity, 4 f |
| Object labels | "Sunlight", "Cells", "Back to / the Grid" | Cap ≈ **3.6–4 % H** (23–26 px; ~39–43 px at 1080p) | Bold grotesk, red | Title case | Normal | n/a | Attached to the object they name (world-space) | Blur + opacity, 2–4 f; 10 f stagger ("Back to" → "the Grid") |
| Recap micro labels | "Silicon"; strip copies of "Electricity" / "But how?" | Cap ≈ **2.2–2.5 % H** (~24–27 px at 1080p) | Bold grotesk, red / cyan | Title case | Normal | n/a | Re-laid out for the vertical strips (above and below the hero) | Ride in with the strip |
| Message block | "Earning credits on your Electric Bill" | Cap ≈ 36 px = **5.6 % H** (~61 px at 1080p; font ≈ 84 px); line pitch 7.6 % H | Bold grotesk, dark maroon (multiply over red) | Title/lower mix | Tight (≈ −10) | **≈ 1.0** | Left-aligned, ragged right, top-right quadrant (x ≈ 67–84 % W, top line at y ≈ 10.6 % H) | Line-by-line blur-fade in 2–3 f each, 4–9 f stagger; the block drifts down, then whips up with the scene |

Rules seen:
- **Two families with fixed roles.** Serif = the concept or vocabulary word. Grotesk = labels and narration fragments.
- **Max words on screen:** 6 ("Earning credits on your Electric Bill"); the title has 5 words over 4 lines (How Do / SOLAR / PANELS / work?). Typical: 1–2 words per scene.
- Text is **world-space**: it rides the scene's camera drift and leaves with the scene. It never sits on a separate static overlay.
- Reveals are always opacity + defocus over 2–5 f, sometimes with a short rise. Never letter-by-letter, never bounce.
- Text colour is always taken from the palette, inverted against the background (white or cyan on dark/red; dark on cyan; dark maroon or red on cream/red).
- Readability: every main-scene label is 3.6 % H cap or larger. Only the recap-strip labels (~2.2–2.5 % H) fall below a ~3 % H mobile floor. The full message block is on screen for only ~0.4 s before it whips away.

---

## 9. UI Animation Observed

There is no real software UI, but several UI-grammar devices transfer directly to SaaS:
- **Focus highlight** (switch, 4.00 s): the outlined switch box flares with a red glow in 1–2 f, and the glow decays over ~0.6 s. This is a direct analogue of a "click target" highlight before a cursor action.
- **Gauge / level indicator with ticks** (battery chart): the fill level eases up and then drains, states snap (empty / full / overflow), a ⚠ alert icon rides the level line, and a bar chart grows beside it. This is a dashboard KPI grammar.
- **Device-in-context zoom-out** (phone): start full-frame on the icon, scale ≈ 3× → 1× in ~800 ms with expo-out, then a snap-tilt wobble (−12°, +5° overshoot) that loops every 1.0 s. Product-reveal grammar.
- **Icon system:** consistent 1-weight line icons (sun star, bolt) and filled pictograms (battery, ⚠) that keep one stroke width and colour per scene.
- **Split-screen comparison panel:** a coloured panel slides in to pair two concepts (photo | voltaic). The same mechanic works for "before | after" or "you | competitor".
- **Recap carousel:** previous scenes as cards/strips sliding into an exact-thirds grid. A "feature recap" end-card pattern.

---

## 10. Transitions Observed

| Type | Where | Duration | Mechanics | Ease | Sound (implied) |
|---|---|---|---|---|---|
| **Directional whip + hard cut** | 1.53, 5.43, 6.83, 26.53, 28.43, 30.63 | 6–11 f exit, 0 f cut, optional 1 empty frame | Subject accelerates out; the next shot's subject continues the same direction | Expo-in, then the next shot's expo-out | Whoosh into soft impact [inferred] |
| **Object wipe** (silhouette fills frame) | 2.93–3.30 | ~10 f | House wall rises and covers the frame; colour reset to dark | Expo-in | n/a (no SFX implied) |
| **Light-source match cut** (shape match) | 3.30–3.43 | 2 f shrink + 2 f hold + cut | Sun → white point → lamp | Ease-in | Tonal "ting" [inferred] |
| **Drop-out exit to empty plate** | 11.30–11.53 | 6 f + 1 f empty | Object and floor fall out of frame (tilt-up); cut on the clean background | Expo-in | Whoosh [inferred] |
| **Particle coalescence morph** | 12.60–12.80 | 6 f | Particles converge into an icon | Ease-in | Rising zap [inferred] |
| **Flash frames** | 12.83–12.97 | 3 f + 2 f | Full background colour flips cyan → cream → dark | Snap | Electric hit [inferred] |
| **Split-screen panel wipe** | 17.0–19.4 | 72 f | Coloured panel slides from the right while existing content shifts left | Asymmetric in-out ≈ cubic-bezier(0.45, 0, 0, 1) | Soft swell [inferred] |
| **Band push** (bottom panel pushes the frame up) | 19.47–20.53, 23.5–24.2 | 20–32 f | A new colour band rises from below carrying content; the frame becomes the new colour | Ease-in-out → expo-in | Whoosh [inferred] |
| **State jump-cuts** | 21.03, 21.53 | 0 f | Same framing, data state changes instantly | None | UI tick [inferred] |
| **Push-left exit** | 22.93 | 1 f | Small horizontal jump before the cut at 22.97 | Snap | n/a |
| **Vertical whip-scroll between floors** | 26.27–26.50 | ~7 f | Scroll accelerates until the cyan floor fills the frame, then cut at 26.53 | Expo-in | Whoosh [inferred] |
| **Strip carousel (frames-in-frame)** | 32.53–34.87 | ~70 f | Previous scenes slide in as vertical strips (two strips as one train) and lock into thirds | Expo-out ×0.92/f | n/a |

Transition density: the detector found 17 hard cuts and 5 seamless changes in 35.8 s. One detector cut (3.17) is the object wipe, so there are 16 real hard cuts, including two state snaps and the strip content swap. That makes ≈ 0.6 changes per second. Only one "effect" transition (the flash). Everything else is choreography.

---

## 11. Editing Rhythm

- **ASL:** detected 1.56 s (23 segments, median 1.4 s). **Corrected 2.1 s (17 scenes), corrected median 1.9 s.** Shortest real scene 0.43 s (the flash insert; the detector's 0.27 s segment is a false cut), longest 4.7 s (wafer).
- **Shape:**
  - 0–6.8 s brisk (1.4–2.0 s scenes).
  - 6.8–11.5 slow hero (4.7 s).
  - 11.5–14.3 **burst** (1.3 / 0.43 / 1.03 s; flash frames).
  - 14.3–20.5 medium (1.9 / 3.6 / 0.77 s).
  - 20.5–26.5 **state-change burst** (0.5 / 0.5 / 1.43 s), then a 3.6 s accumulation.
  - 26.5–30.6 medium (1.9 / 2.2 s).
  - 30.6–35.8 slow outro (1.9 / 3.3 s).
- **Breathing room:** the long holds (#6, #11, #22) come right after or right before the densest bursts. Pattern: **burst ≈ 1.5–2.5 s, then hero 3.5–4.7 s.**
- **Hero moments:** the wafer (6.8 s), particle → bolt flash (12.8 s), "photo | voltaic" (17–19 s), solar field (31 s).
- **Beat sync:**
  - Music pulse period 0.93 s (64.6 BPM).
  - Hard cuts within ±2 f of an onset: with the detector's times, 4 / 17 (24 %). With frame-accurate cut times, **5 / 16 real cuts (31 %)**, because the cut moved from 30.53 to 30.63 lands on the 30.60 onset. The random baseline is about 20 %. Overall, only loosely beat-cut.
  - In the mid act (6.8–16.2 s), where the pulse is steady, **4 / 5 cuts land within about 1 f of an onset** (6.83/6.80, 11.53/11.49, 14.30/14.30, 16.17/16.18).
  - Object-internal events sync only partly. The first two wafer bounce intervals (0.47 s) equal a half-beat, but the bounce then speeds up to 0.37 s, and only the 7.80 s landing is on an onset. The switch flare is at 4.00 vs onset 4.02.
  - Conclusion: **story/VO-driven editing with selected downbeat landings** for major scene changes [inferred].
- **Transitions per 10 s:** ≈ 6 shot changes; one flash moment.

---

## 12. Sound Design

What the analysis shows:
- Tempo 64.6 BPM (0.93 s pulse). Probably 129 BPM felt in half-time [inferred]. The pulse is regular over 9.6–16.2 s, 19.0–22.7 s and 28.3–30.1 s.
- 55 onsets (1.5 per second), irregular in the first 9 s and at 23–28 s, consistent with a voice or SFX layer on top of the music.
- Integrated **−16.6 LUFS**. Half-second level −18.3 to −27.6 dB (σ 1.7 dB): a dense, compressed, continuous bed with no dramatic drops. Final 0.5 s at −34.6 dB (cut-off or fade).
- Speech likelihood: mean 0.50, median 0.49, > 0.6 in only 19 % of windows. Mid band (300–3400 Hz) holds 51 % of energy and the syllabic (3–7 Hz) modulation ratio is 0.24–0.50 (the analyst's own audio measurements, not in analysis.json and not re-checked). **Inconclusive.** The keyword captions ("Sunlight", "Electricity — But how?", "photo voltaic Cells", "Back to the Grid", "Earning credits…") are exactly what VO-echo supers look like, so a narrator is likely [inferred].

What it implies for picture:
- The picture assumes a VO-led edit: one caption keyword per VO phrase, with major scene changes on downbeats when the VO allows.
- Physical micro-motions (bounces, wobbles, the switch flare) are natural SFX hooks: soft thuds, ticks, a zap on the flash, whooshes on the expo-in whips [inferred].
- The flat loudness means the mix is a bed under narration. No big risers or silences are used for drama. The drama comes from the picture (flash, colour flips).

---

## 13. Visual Quality

What makes it premium:
1. **Palette discipline.** Five colours, used in every frame, with high-saturation cyan/vermilion complements balanced by cream and oxblood neutrals.
2. **Colour-blocked scene changes.** The background changes on nearly every cut (cyan → cream → dark → cyan → gradient → dark → cyan → red → red|cyan → cream → red → cream/red/cyan → cream → red → cream). Each cut feels deliberate and the hard cuts never look like jump cuts.
3. **Lighting by suggestion.** Long hard cast shadows (batteries to the right, tokens down-left), sunset gradients, and bloom **only** on emissive objects (lamp shade, sun as light, phone hover pad, rings, bolt, neon labels).
4. **Texture.** Fine monochrome grain over everything plus slight edge softness gives a print-like, non-vector-sterile finish.
5. **2.5D without 3D.** Rim thickness on the wafer, isometric panels with red edge "thickness", perspective panel rows, and parallax layers.
6. **A small ease vocabulary** applied everywhere: expo-out arrivals, expo-in whips, one long-settle in-out for the big wipes and the recap, and a snap-tilt settle on physical objects.
7. **Compositional clarity.** One hero per frame, labels in negative space, a final exact-thirds grid.

Flaws:
- 24→30 fps repeated frames create a judder every 5th frame, visible on the slides (house, cyan wipe, recap strips).
- Recap-strip labels (~2.2–2.5 % H cap) are too small for phones.
- The full payoff message block is readable for only ~0.4 s (29.80–30.2) before the exit whip.
- The battery-gauge state snaps are off-beat and unexplained, so they feel abrupt.
- No logo, CTA or end card. The recap ends mid-motion.
- Flash frames (cyan/cream strobe) are a photosensitivity consideration. Keep them to ≤ 3 frames and only once.

---

## 14. Style Category

**Editorial Motion: flat 2.5D illustrated explainer** (sub-type "Retro-Editorial Risograph Explainer"). Close to Minimal Premium SaaS in discipline, but warmer, more illustrative and playful.
- Visual: flat geometry, 5-colour palette, grain, selective bloom, long shadows.
- Motion: expo-out / expo-in envelope with perpetual drift.
- Camera: 2D scrolls and whips.
- Transitions: choreographed (whip, object wipe, match, band push).
- Type: serif concept words plus grotesk labels.
- Music: mid-tempo bed (64.6 / 129 BPM) under probable VO.
- Duration: 30–60 s.
- Fits: explaining an invisible mechanism (energy, data flow, security, AI pipelines), fintech/climate/infra SaaS.

---

## 15. Transferable Rules (concrete, numeric)

1. **Shot envelope.**
   - Entrance: expo-out, 50 % of travel in 3–5 f, about ×0.85–0.9 speed per frame, 90 % settled by 10–14 f.
   - Body: drift 0.3–0.5 % of frame per frame.
   - Exit: expo-in over 6–11 f, accelerating ×1.4–1.9 per frame to 15–20 % of frame per frame.
   - Never hold completely still for more than 5 f (167 ms).
2. **Cut on the empty plate.** Let the subject fully leave, show 0–1 frame of clean background (measured: 1 frame at 11.50, 20.50, 28.43 and 30.60), then hard-cut. The next shot's first motion continues the same screen direction.
3. **Background colour flips on every cut.** Choose from a 4–6 colour palette and never put the same flat background on two consecutive scenes (exceptions: state changes within one set-up).
4. **One hero, flanking labels.** Hero centred or on a third at 30–45 % W. Labels in negative space at x ≈ 15–20 % / 80–85 %, aligned to the hero's mid-line.
5. **Text reveal = opacity + blur (≈ 8 px → 0 at 1080p [inferred]) over 2–5 f.** Optional rise of 10–15 % H with expo-out over 5–8 f. Line or word stagger 4–10 f (133–333 ms). Text lives in world space and moves with the scene.
6. **Two type families with fixed roles.** Serif for concept/vocabulary words (title cap ≈ 11.5 % H; concept words ≈ 12.5–13 % H font). Grotesk for labels (cap ≈ 3.6–4 % H; never below 2.5 % H for mobile) and messages (cap ≈ 5.6 % H, leading 1.0). ≤ 6 words on screen.
7. **Hero hold budget.** Give the single most important concept the longest shot: 4–5 s in a 36 s film (13 % of runtime). Keep it alive with internal motion (a decaying bounce, then particles ramping up over the last 2 s).
8. **Long-settle reading ease** for anything that introduces new text: 2.3–2.4 s moves with ~0.5–0.7 s acceleration and ~1.7 s deceleration (≈ cubic-bezier(0.45, 0, 0, 1), fitted to the cyan wipe).
9. **Spring accents are small.** A 10–14° tilt that snaps in within 1 f, with at most one small overshoot (+5° after a −12° tilt on the phone), settled in 12–15 f. Use for physical objects only, never for text.
10. **Bloom only on emitters.** Glow radius ~1–2 % of frame on lamps, screens, light rings and neon labels. Everything else stays crisp. Add fine monochrome grain at low opacity [inferred ~3–5 %].
11. **Depth from shadows and overlap, not blur.** Hard long cast shadows. Pick one light direction and keep it: this film mixes rightward battery shadows with down-left token shadows. Parallax foreground ≈ 1.3–2× background speed.
12. **Match cuts on light or shape.** Shrink the outgoing light source to a ~4 % W point (≈ 40 % of its diameter) in 2 f, hold it 2 f, then reveal the incoming light source at the same position.
13. **One flash per film.** Full-frame colour flip of 3 f + 2 f at the conceptual peak (the transformation moment).
14. **Zoom-out reveal for devices/UI.** Start at ≈ 3× on the meaningful icon; reach 1× in ~24 f with expo-out (the first frame removes ~22 % of the size, about a third of the total change); then a small snap-tilt settle.
15. **Data-viz states.** Ease continuous values; snap discrete states (empty / full / alert) in 0 f, ideally on a beat. Alert icons ride the value line.
16. **Recap end-card.** Previous scenes slide in as strips that travel as one train (expo-out ×0.92/f; the second strip enters ~0.33 s after the first) and lock into exact thirds. Re-lay labels for the narrow strip rather than cropping. Then add the logo/CTA (missing here).
17. **Beat policy.** Put major scene changes on downbeats (±1 f) when the music pulse is steady. Let caption and VO beats govern inserts. If you want object rhythms (bounces) to read as musical, lock them to half- or full-beat periods (here they drift off the beat).
18. **Render natively at the delivery frame rate** (or deliver at 24 fps). Avoid 24→30 duplicate-frame judder.

---

## 16. What to Avoid (seen or implied)

- Pulldown or duplicate-frame judder from frame-rate conversion (here, every 5th frame).
- Labels under 2.5 % H (here only the recap strips); a payoff message that is fully readable for under half a second.
- Unexplained instant state jumps that do not land on a beat or a VO word.
- Ending without a logo/CTA lockup, or ending mid-motion.
- More than one flash/strobe moment, or flashes longer than 3 f.
- Mixing too many whip directions without a rule. This piece mostly keeps vertical = progression and horizontal = context; keep such a rule explicit.
- Glow on non-emissive objects, or grain heavy enough to crawl. Restraint is what makes it premium.
- Long static holds on flat illustration: without the drift, flat vector art looks like a slideshow.

---

## Verification (adversarial frame check)

Method: I decoded all 1075 frames to numpy (frame-accurate `select` filter rather than seeking) and tracked colour masks per frame (bbox, centroid, edges, glyph heights). I made frame-accurate contact sheets of the hook, the light-point→lamp cut, the phone, the gauge, the wafer exit, the credits and the recap (scratch, under `analysis/<id>/zoom/c*`), and re-checked the beat statistics against `analysis.json`. An earlier checker left zoom images (v01–v07) but no edits in this file, so the whole file was re-checked.

**Eight key claims re-measured**

| # | Claim | Result | Change |
|---|---|---|---|
| 1 | "220 duplicates, all at index ≡ 2 (mod 5); animated at 25 fps" | **Wrong.** All 215 frames at index ≡ 2 (mod 5) repeat the previous frame (diff ≤ 0.7 vs median 5.6). That is 4 new frames per 5, so **24 fps**: 860 unique frames ÷ 24 = 35.83 s. "220, all ≡ 2" was arithmetically impossible (only 215 such indices exist). | Technical note, Flaws, Rule 18 and §16 changed to 24→30 fps. The "European pipeline" inference was removed. |
| 2 | Hook: panel expo-out f1–f10, title stagger, 8 f expo-in whip, cut at 1.533 | **Confirmed** (panel 96.5→77.3 % H; exit deltas 1.9 / 2.1 / 3.8 / 7.2 / 11.9 / 20.6 exactly; cut at frame 46). "How Do" appears at f3–f5, not f1–f4. The stagger is 5 / 8 / 9 f. The drift is 0.34–0.51 % H/f. The listed values omitted the repeated frames f2 / f37 / f42. | Study A corrected; dup frames marked; WHY #1 timing fixed (crisp by f27 = 0.90 s). |
| 3 | House slide (Study D): ×0.85 expo-out, 5 f hold, 11 f expo-in exit, peak 19 % W/f, cut 6.83 | **Confirmed** to ±0.3 % W on every value. House size "~12 % W" is **wrong**: it is ~25 % W including the shed (~21 % H), with ~95 % negative space. The wafer does enter left of centre moving right. | Row 5 size and direction wording fixed. |
| 4 | Flash frames cyan 3 f (12.83–12.90) + cream 2 f (12.93–12.97), dark from 13.00 | **Confirmed** (one of the 3 cyan frames is a cadence repeat). | Note added. |
| 5 | Phone pull-out 3.0×→1.0× in ~24 f; "first frame covers 22 % of the total change"; ±10° wobble; "rises over the last 3 f" | Scale ≈ 3.07× (50.4→16.4 % W) confirmed; the first frame removes 22 % of the *width*, which is ~32 % of the total change. The wobble is a 1-frame snap to −10/−12°, a snap back, a +5° overshoot and a settle by ~15.17, and it **repeats identically 1.00 s later**. There is **no exit rise**: the phone is still for the last ~8 f. | Row 10, Study F, §9 and Rule 14 rewritten. |
| 6 | photo\|voltaic wipe 17.0–19.4, 49 % W, peak 3.3–4.1 % W/f, ≈ cubic-bezier(0.55,0,0.1,1) | Edge values confirmed within 0.5 % W; peak 4.0 % W/f at 17.67; the edge creeps from 16.83. The bezier fit was poor (RMSE 12 % of travel). A least-squares fit gives **cubic-bezier(0.45, 0, 0, 1)** (RMSE 1.5 %). | Study G, §6, §10 and Rule 8 updated. |
| 7 | Recap: strip 1 at 32.55, ×0.92/f, lock at 33.4 / 66.4 % W; strip 2 at 33.05 ("0.5 s apart"); swap at 34.53 | Strip 1 confirmed (98.6 % W at 32.53, deltas 5.5 / 5.1 / 4.6 …, locked 33.2 % W at 34.87); right boundary 66.7–67.1 % W. **Strip 2 enters at 32.87, butted directly behind strip 1 (~0.33 s), not 0.5 s.** The swap at 34.53 is confirmed. The lamp strip is a re-composed layout. | Rows 22–23, Study J and Rule 16 fixed. |
| 8 | Typography: SOLAR 11.2 % H, PANELS ~6.5 %, concept font ~10 % H, labels 3.4 %, micro labels 1.5–2 %, message cap 4.7 %, "Earning" cropped for its whole life | SOLAR ≈ 11.6 % H (ok). **PANELS ≈ 7.9 % H** (68 % of SOLAR). **Concept words x-height 5.7 % H → font ≈ 12.5–13 % H.** Labels 3.6 % H (ok). **"Sunlight" / "Back to" / "the Grid" ≈ 3.6 % H and "Cells" ≈ 4 % H, not 1.5–2 %**; only the recap-strip labels are ≈ 2.2–2.5 %. **Message cap ≈ 5.6 % H** (pitch 7.6 % H, leading ≈ 1.0). **"Earning" is fully inside the frame** (top at y ≈ 10.6 % H, from 28.97). The earlier reading was an artefact of the contact-sheet label bar covering the top ~13 % of each thumbnail. | §8 table and rules, rows 1 / 2 / 11 / 12 / 19 / 20 / 22, Creative-direction consistency, Flaws, Rule 6 and §16 fixed. The "Earning cropped" flaw was removed everywhere. |

**Other corrections found while re-checking the whole file**

- **Cut times.** Frame differencing shows four detector cuts 1–5 frames early. The battery gauge starts at **20.53** (20.50 is the full-cream plate), the single battery at **22.97**, the tower at **26.53** (26.37 was mid-whip-scroll), and the solar field at **30.63** (30.60 is an empty red frame). Story stages, rows 12–21, editing rhythm, transitions and ratios were updated (climax now 1.90 s, 5 %).
- **Beat sync.** With the corrected times, **5 / 16** real hard cuts (31 %) sit within ±2 f of an onset (30.63 vs onset 30.60), against a ~20 % baseline. The mid-act 4 / 5 figure is confirmed. LUFS, level σ (1.70 dB excluding the last window), speech mean / median / > 0.6 share and 55 onsets are confirmed from `analysis.json`.
- **Lamp (#4).** It is not a pendulum with overshoot. The shade and cone tilt ~11–14° while the pole stays vertical, then return with no overshoot by ~f12. The whole lamp also drifts up ~10 % H. The switch "box pop +10 %" is really a red glow flare at 4.00 that decays over ~0.6 s.
- **Light-point match (#3).** The shrink takes 2 f (3.30–3.37) to ≈ 40 % of the diameter (≈ 15 % of the area), then a 2 f hold. It is not a 4 f shrink to 15 % scale.
- **Wafer (#6).** The bounce decays (landings 6.87 / 7.33 / 7.80 / 8.17 / 8.53 s, intervals 0.47→0.37 s) and stops at ~8.7 s. Only one landing is on an onset, so the claims of a fixed "0.40–0.47 s period, synced to music" were removed. Electrons start at 9.20 s.
- **Battery gauge (#13).** It opens empty, fills to ~40 %, then drains to ~20 % before the snap. It does not "drain linearly from 55 %". The push-left is 1 frame at 22.93, not 3 f.
- **Credits (#20).** Tokens arrive *down-right* along a ~65° path (not "up-left on a ~30° diagonal"), decelerate expo-out, then whip back up-left. The shadows fall down-left, so the light direction is not "always from the left". The text reveal times are 28.97 / 29.10 / 29.37 / 29.67 / 29.80 (stagger 4 / 8 / 9 / 4 f). There is 1 empty red frame after the 28.43 cut, not 2. "Back to" → "the Grid" is a 10 f stagger, not 8 f.
- **Climax sun (#21).** The previous track (94→36 % H over 1.5 s) did not match the footage. Measured: top edge 62.5 % H at the cut → 7.7 % H, half the travel in 6 f and 90 % in ~0.9 s.
- **Consistency.** The title is 4 lines, not 3. Reveals take 2–5 f. The empty plate before a cut is 0–1 frame. The "exactly three curves" ease claim was softened to the measured vocabulary.
- **Shot table.** It covers 0.00–35.83 s with no gaps or overlaps (23 rows, durations recomputed). All empty "—" cells now hold a value or "n/a". A "Phase-2 attributes" table was added that covers angle, scale, perspective, rhythm, blur, glow, shadows, reflections, grain, trails, DOF, parallax, 2D/3D, match cuts, morphing, mask transitions, camera and object wipes, zoom transitions and continuity.

Not re-measured (left as the analyst wrote them): battery tip angles (±~20°), the particle colour-flicker windows, the "voltaic" rise timing, and the mid-band / syllabic audio ratios (now tagged as unverified).
