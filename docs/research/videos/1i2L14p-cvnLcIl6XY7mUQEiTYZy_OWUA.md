# Teardown: NOSTRA motion-design studio promo ("Imagine a way… No stress, no bad surprise. Book now"), presented in a chapter-bar player frame

Source: `1i2L14p-cvnLcIl6XY7mUQEiTYZy_OWUA.mp4`, 35.07 s, 30 fps, 1056x720 (about 3:2), audio present.
The 1056x720 file is a wrapper. The animation is a 16:9 inset of 1011x567 px at x 23-1033, y 23-590, with rounded corners of about 10 px, on a near-black surround (a dark gradient from about #0B0B0B on the left to #2F2F2F on the right; about #1A1A1A on average). A 65 px chapter bar sits below it (y 623-687) with five chips: Dream outcome / Pain point / Benefits / Features / CTA, plus a linear playhead tick (about 0.96 px per frame). All percentages below are relative to the 1011x567 content frame unless stated. "f" = frames at 30 fps (1 f = 33.3 ms).
Measurements come from per-frame colour bounding boxes (custom numpy script) and 30 fps contact sheets in `analysis/1i2L14p-cvnLcIl6XY7mUQEiTYZy_OWUA/zoom/`. Anything marked [inferred] is a judgement and was not measured.

---

## 1. Summary

- **What it is:** a 35 s self-promo for **NOSTRA**, a motion-design studio. Clues say it is French: an on-screen French paragraph and "FORMULAIRE". Its job is to sell "motion design video" as the fix for wordy, static marketing. It ends on the logo and a **BOOK NOW** button that a cursor clicks.
- **Framing device:** the creator wraps the film in a fake video player. Its chapter bar names the copy framework, and each chip's width is proportional to its section length. **Dream outcome 0-6.26 s, Pain point 6.26-14.22 s, Benefits 14.22-19.95 s, Features 19.95-32.75 s, CTA 32.75-35.07 s** (chip gaps at x 203 / 432 / 598 / 967 map to 6.24 / 14.19 / 19.93 / 32.73 s, within 1 f of these values). Each chip starts lighting up 2-3 f after the playhead crosses its boundary, through a 5-6 f linear cross-fade. The piece doubles as a lesson in structure, which suits a LinkedIn post. [inferred]
- **Look:** a strict **two-colour brand system**: emerald #2FC06C / #31BA69 and off-white #F4F5F4, plus near-black #161616 for type, and mint (#A4DEBC / #B6E3C9) for gradients. Almost every cut flips the background between green and white (11 of the 13 hard cuts; the exceptions are the whip hand-off at 6.13 and the tile → arrows swap at 20.33). 3D accents use a **grain-gradient** look: dithered white→green→black shading on a hand puppet and a creature. There is also one glossy "inflated" 3D phone and two frosted-glass icon tiles.
- **Motion signature:** snappy expo-out arrivals (about 40-45% of the travel on the first moving frame, about 88-95% by frame 6). Exits accelerate (ease-in; the whip's velocity grows 1.5-3× per frame, the gravity drop's about 1.2× per frame). Small UI pops enter oversized (typing dots at about 2×) and settle in 3-4 f. After landing, almost nothing stops: elements keep drifting at 0.3-1 px/f. **Shape-match chains** carry a single circle across four setups (dot → creature eye → circle chain → green dot → typing dots). One kinetic-type routine is the hero: three words **scatter, swap, converge**, three sentences in 3.07 s.
- **Rhythm:** 24 detected shots (ASL 1.46 s). After correction, **19 setups (ASL 1.85 s)** with about 41 significant motion events, one every 0.85 s. It is fast and morph-heavy up to 25.9 s, then has a deliberate 4.7 s low-motion breather and a 4.4 s calm CTA.
- **Audio:** very loud (**−7.9 LUFS**, decoded peaks above 0 dBFS) and narrow (side/mid −14.6 dB), at 83.4 BPM as estimated. Only 3 of 14 hard cuts land within ±2 f of an onset, which is chance level, so the **edit is not cut to the beat**. Whether there is a voice-over is unclear (speech likelihood 0.19-0.67, mean about 0.45). [inferred]

## 2. Creative Direction

- **Concept:** "Text loses attention, motion explains instantly." The film enacts its own argument. The pain section buries the viewer in a curved wall of real but unreadable French copy, which says *"the human brain processes visuals 60,000× faster than text… motion design chews the cognitive work"*. Then it throws that wall away and answers with pure shapes and three-word lines.
- **Visual language:** minimal flat 2D (type, dots, arrows, blocks) punctuated by 2.5D/3D props: a grain-gradient hand, a creature, a carousel of 3D cards, a bent text ribbon, a floor grid, an unfolding form, an inflated phone and glass tiles. Design-tool UI motifs (selection boxes with corner handles, a cursor, typing dots, a progress bar) signal "we are designers".
- **Personality and tone:** playful-confident, witty and modern. Examples are the hand-shadow puppet whose eye is the dot it just grabbed, and the brand-name pun "NO STRess / NO BAD SURPRISE → NOSTRA". It is never loud in colour, because a single hue does all the work.
- **Positioning:** about 45% playful, 35% premium, 15% technical and 5% cinematic. It reads premium through restraint: one hue, off-white instead of pure white, small type, grain texture and smooth eases. It reads playful through its metaphors and morphs.
- **Consistency:** palette, type family (Montserrat-style geometric sans, all caps) and the green accent on one key word per line hold across all 35 s. Weaker points: the metaphors jump around a lot (hand, circles, ribbon, pinwheel, phone, glass), the language mixes French and English, and no real client work or UI is shown.

## 3. Story Structure

| Stage | Start-end (s) | Duration | Purpose / content |
|---|---|---|---|
| Hook (inside "Dream outcome") | 0.00-1.43 | 1.43 s | Starts mid-motion: "IMAGINE" flies back through a cloud layer, a liquid "?" splits and dissolves, "A WAY" sits in a selection box. Curiosity with no product yet. |
| Dream outcome (continued) | 1.43-6.26 | 4.83 s | Hand-puppet creature (the dot becomes its eye) → circles spiral into a ring → green dot → chat "typing…" dots → a pull-back reveals a card, and a cursor arrow rotates to point right. The promise: an idea taking shape. |
| Pain point | 6.26-14.22 | 7.96 s | "MOTION DESIGN VIDEO" (the category), then "YOU TEST ADS / POST ON LINKEDIN / YOU OVERCOMPLICATE THINGS" (3.07 s), then a smash-in to a wall of text: a 3D carousel of copy cards (3.3 s). The last card sinks from 13.3 and falls out of frame (13.5-13.93). |
| Benefits / solution reveal | 14.22-19.95 | 5.73 s | "MOTION DESIGN" pops → vertical panel wipe → banner → 3D text ribbon (push-in, twist, S-curve) → pixel-build "SOLUTION" label → the label expands to a square → snaps into one tile of a 3D grid that glows while the others fade into fog ("stand out among sameness"). |
| Features / process | 19.95-30.63 | 10.68 s | Collapse arrows (simplify) → hypnotic pinwheel (grab attention) → hex iris to white → brief form ("FORMULAIRE") → split screen with a 3D phone (call) → light strands braid (production) → particle swirl → glass check ✓ (validation) → glass download ↓ (delivery). Includes a 4.7 s low-motion breather (25.93-30.63). |
| Reassurance (still labelled "Features") | 30.63-32.17 | 1.54 s | "NO STRESS" → "NO BAD SURPRISE". A cursor clicks "NO". |
| Brand reveal + CTA | 32.17-35.07 | 2.90 s | The text morphs in place into the "⊓□STRA." logo (the brand name hides inside "NO STR(ess)") → a green dash flies in as the full stop → a pill button pushes the logo up → "BOOK NOW" → cursor approach, press and release → about 0.8 s static end hold. |

Proportions: hook 4% / dream 14% / pain 23% / benefits 16% / features 30% / reassurance 4% / brand and CTA 8%. The CTA chip starts at 32.75 s, but the logo arrives 0.6 s earlier, at 32.17 s.

## 4. Shot-by-Shot

Corrected list: detected shots that were one continuous move are merged, and hidden cuts are added. 19 setups.

| # | Time (s) | Dur | Composition / framing | Camera | Object / UI / text movement | Depth & layering | Lighting / background | Palette | Typography | Transition out | Ease | Blur / glow / shadow / grain / DOF / parallax / 2D-3D |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0.00-0.70 | 0.70 | Centred word, clouds framing the top-left and bottom-right | Fly-through: clouds stream outward past the lens [inferred push-in] | "IMAGINE" scales from about 2.5-3× (cropped) to about 1.05× in 8 f, then keeps shrinking slowly (1-2 px/f per edge) until it fades. A liquid "?" (dot plus hook) lands from the right, wobbles, splits into 2-3 echo copies and shrinks | 3 layers: near cloud, word, far cloud | Overexposed white haze at f0 → emerald with white clouds | #47BF78, #E1F2E9, white | White caps, settled width about 40% of frame, cap about 10% (58-60 px of 567) | Blur-dissolve: clouds defocus and fade, "IMAGINE" fades, "A WAY" fades in (0.63-0.77, 4 f) | Expo-out on the type scale | Cloud parallax (near layer faster) [inferred]. Gooey/liquid "?" with echo trails. 2D |
| 2 | 0.70-1.43 | 0.73 | Small centred label inside a design-tool selection box (about 29% wide); a hand enters from the right (1.00) | Static, slight drift | The label drops about 45 px into place as it fades in (f22-f24) and settles back about 10 px; the box then contracts slowly (310 → 278 px wide, 0.80-1.00) and stretches taller for 1 f (1.033). At 1.067 the box and text collapse in 1 f to an 8 px dot in a 44 px mini box. The hand curls and pinches the dot, which grows (accelerating) from about 8 to about 125 px (1.07-1.40) | Hand over dot over green | Flat emerald with soft white haze | #35B368, white | "A WAY", white caps, cap about 5.5% (30-33 px), text 17% wide, light tracking | **Match cut** on the white circle: the dot in the hand becomes the creature's eye (1.43). Background flips green → mint-white | Ease-out grow | **Grain-gradient** 3D hand (dithered white→green→black). Thin 1 px selection lines with square handles |
| 3 | 1.43-2.63 | 1.20 | Creature (hand-shadow "bird") bottom-centre; the eye sits at the frame's golden-ish upper third; a selection box tracks the eye | Slow drift, then a 6 f push-in as the head swings toward the lens (2.43-2.6) | Selection box re-sizes around the head. The creature bobs; the head glows. At the end the figure tilts and enlarges about 2× | Creature, then box, then mint gradient | Mint-white radial gradient. The eye is a **bloom** sphere | #BDE7CE, #E8F2ED, black pupil | none | Hard cut on the bloom-white head → white circles on green (2.63). Shape match plus polarity flip | Ease-in into the push | Glow/bloom on the eye, grain shading. 2.5D |
| 4 | 2.63-3.57 | 0.93 | Full-frame circles | Static, but the circles' scale grows (implied push) | A chain of about 6 white circles of decreasing size snakes from top-left to bottom-right (2.63-2.93), then re-forms into a rotating double ring of about 18 circles that expands outward (2.97-3.53). Thin white constellation lines connect them | Big near circles over smaller far ones (scale-depth) | Flat emerald | #30BD6B, white | none | Hard cut to a single green dot on white (3.567): colour-inverted shape match, from many to one | Ease-in-out spin | 2D, pseudo-depth by scale |
| 5 | 3.57-6.13 | 2.57 | Centred dot → three dots → white "screen" card at 76% → 63% of frame | **Pull-back in two steps**: scale 1.0 → 0.79 in 6 f (4.10-4.30), slow drift to 0.75 (4.3-5.3), a second 6 f step 0.75 → 0.63 (5.30-5.50), then the card holds its size while drifting down-left until the whip | Dot shrinks 60 → 36 px in 1 f and settles at 24 px. Dots 2 and 3 appear at about 2× (50 and 46 px) and shrink to 24 px in 3-4 f, stagger 2 f (3.633, 3.700). Typing-wave bounce. White corner-bracket guide lines on the green surround. A cursor arrow enters from the bottom (4.73), rises, rotates ↖ → ↑ (about 5.5) → ↗ (5.77) → → (5.87) | Card over green, plus thin guide lines | White card, green surround with a white gradient haze on the left | #F4F4F4, #3DB870 | none | **Whip pan right**: the card exits in an ease-in over 8 f (5.87-6.10, last on-screen frame 6.10) with blur on the last 2 f; the cut to shot 6 (6.13) is hidden behind it | Expo in-out on the pull-back; expo-in on the whip | Motion blur on the whip; the haze reads as a light leak. 2D |
| 6 | 6.13-7.57 | 1.43 | Single centred text line | Continues the whip's momentum, then a very slow push (about +1% scale, 7.0-7.5) | The whip's momentum carries into the line: "VIDEO" drifts right with a decelerating ease (Δ 21, 10, 6, 4, 4, 2 px/f from 6.13) and grows slightly, while a feathered mask erases the nearly static "MOTION DESIGN" left→right at about 1 letter/f (6.17-6.57, 12 f). "MOTION DESIGN" then re-reveals left→right through a feathered mask (6.67-7.00, 10-11 f) and lands one word-space before "VIDEO". A faint translucent band (about 5-10% white) fades in behind the line over about 8 f (6.80-7.07) | Text over a faint translucent band over green | Emerald, white haze left | #31B567, white | White caps, cap about 6.4% (36-37 px), line width 64% | Hard cut with polarity flip → white (7.567) | Linear mask, ease-out on the drift | Feathered mask edge about 1 letter wide. 2D. Chapter chip changes Dream → Pain (6.33-6.50, 5-6 f linear cross-fade) |
| 7 | 7.57-10.63 | 3.07 | Centred 3-word line, frequently broken into a staircase | Static | **Scatter, swap, converge** ×3: "YOU" drops in, then "TEST" (+3 f), then "ADS" (+2 f), each at its final x; the line settles vertically over about 14 f (expo-out). Hold about 14 f. Scatter (8.30; upper word 8.30-8.53, lower word 4 f later, 8.43-8.60). Words swap in place while scattered (8.70). Converge "POST ON LINKEDIN" (8.77-9.00, 7 f). Hold 10 f. Scatter (9.33), "POST" slides right (9.60-9.67). Swap (9.70) to "YOU OVERCOMPLICATE THINGS": its letters spread on an arc wave (9.70-9.87), then "YOU" drops into the line (9.97-10.13). Hold about 10 f, then a 4 f leftward drift (10.47-10.57) and a 1 f jump right (10.60) into the cut | Flat | Off-white #F5F5F5 with a faint mint corner glow (top-right) | Black text, one green key word per line | Montserrat-like SemiBold caps, cap 5.6% (32 px), 34-74% width | Hard cut, **smash-in** to a macro of bold text (10.633) | Expo-out moves (scatter Δ 23, 15, 10, 6, 4, 2 px/f; converge Δ 23, 13, 8, 4, 3, 1 px/f) | 2D kinetic type |
| 8 | 10.63-13.97 | 3.33 | Macro → curved cards filling the frame → a single centred card (about 90% → 43% width) | Extreme close-up and defocus (2 f) → **camera inside a ring of about 8-10 cards**, orbiting [inferred about 120-180°] over 1.5 s → settles frontal → pull-back 12.87-13.10 (tail to 13.33) | Cards bend (cylindrical) with design-tool corner handles. The final card sinks from 13.30 (2-4 px/f), then **falls**: Δy per frame 5 → 32+ px over 13.50-13.87 (accelerating ease-in, about 1.2× per frame) and rotates to about 20°, leaving frame by 13.93 | True 3D layout with perspective, near and far cards | Green with grain/noise; cards tinted mint-white | #33BD6C, #E7F2EC | French body copy in black, about 2% cap, unreadable on purpose | Hard cut on white "MOTION" (13.967) | Ease-in-out orbit, ease-in drop | Defocus at entry, grain texture, duotone green tint. 3D |
| 9 | 13.97-15.60 | 1.63 | Centred 2-word headline → horizontal banner → diagonal ribbon | Static → push into the ribbon (14.8-15.5) | "MOTION" appears, then "DESIGN" (+2 f, drops 3 f). Hold about 12 f. 4 vertical green gradient panels wipe in left→right, 1 f stagger (14.5-14.63). Text becomes a white banner (14.67), which bends into a 3D ribbon carrying repeating "MOTION DESIGN" that scrolls along it | Panels behind the banner, then a single ribbon plane | White with a mint gradient; panels in green gradient | #F4F5F4, #78D09D, black | Caps, cap 8.5% (48 px), width 56% | Ribbon twist hides a background polarity swap white → green (15.567 → 15.6, hidden cut) | Ease-out panels, ease-in-out twist | Soft gradient panels, 3D ribbon, text-on-path. Chip Pain → Benefits (14.27-14.47) |
| 10 | 15.60-16.63 | 1.03 | Full-frame S-curve white ribbon with small text | Pull-back from huge type to wide (15.6-16.0), then lateral drift | Ribbon undulates as a travelling sine wave and flattens to near-horizontal; text keeps scrolling along the path | One 3D plane over flat green | Emerald with a white haze | #31BA69, white, black | Repeating "MOTION DESIGN", cap 2-15% (shrinks with the pull) | Hard cut to a centred pixel cluster on white (16.633) | Ease-out pull | Joint motion-energy peak of the film (32.8 in the 15.6 s bin; only the pinwheel burst bin at 22.0 s is higher, 33.2). 3D |
| 11 | 16.63-19.13 | 2.50 | Centred label (53% × 23% of frame) → square block (533 × 536 px: 53% of frame width × 95% of frame height) | Static | Green **pixel blocks** grow outward from a small cluster (solid core about 7% wide) to about 70-87% of the width (16.63-17.40, 23 f) and resolve into the "SOLUTION" knock-out label (letters from 17.20, clean by 17.50). The label resolves at about 1.25× (66% wide) and scales down to 1.0 (53%) in 4 f (17.50-17.63). Hold about 22 f. Label **expands vertically** into a big square: top edge Δ 88, 36, 20, 14, 12, 8, 8 px/f (18.37-18.57), bottom edge mirrored | Flat | White with a mint corner gradient; the square gets an inner gradient | #F1F5F3, #33BD6C | White ExtraBold caps knocked out of green, cap about 11% | Snap-shrink to a small square (19.13, 1 f) | Expo-out | Glitch/pixel build. 2D |
| 12 | 19.13-20.33 | 1.20 | Single tile → full grid of tiles in perspective, with the hero tile centre-left | **Tilt** onto a floor plane (19.23-19.43, 6 f), then a slow pull-back/drift | Neighbouring tiles appear (column, then grid). The hero tile turns white and glows; the other rows fade into green fog | 3D plane with distance fog | Green; the far rows dissolve | #2FC06C, white | "SOLUTION" shrinks to illegible | Object swap: the tile becomes collapse-arrows ↙↗ (20.33) | Ease-out tilt | Depth fog (DOF substitute), glow on the hero tile. 3D. Chip Benefits → Features 20.00-20.17 |
| 13 | 20.33-20.53 | 0.20 | Two white arrows converging on centre | Static | Arrows move inward 5 f | Flat | Green | white | none | Hard cut with colour inversion mid-motion (20.533); the arrows keep converging | Linear | 2D |
| 14 | 20.53-21.83 | 1.30 | Two black arrows at centre | Static | Arrows converge, then rotate about 45° from diagonal to vertical over about 38 f. A dot appears at centre (21.6) | Flat | Off-white | #F4F5F5, black | none | Dot bursts into a pinwheel (21.83) | Ease-in-out rotation | 2D |
| 15 | 21.83-24.50 | 2.67 | Full-frame kaleidoscope of curved green and white triangles around a black dot | 2D rotation continuous; zoom out 23.4-24.1 | Green area 0.1 → 1.7 → 4.6 → 9.6 → 23.7 → 49% in 6 f (accelerating). The pattern spins; arrows orbit the dot. The pattern contracts, then a **white hexagon iris** opens from the centre (24.27-24.48, 7 f) and the arrows diverge | Flat 2D pattern | Green and white halves | #2FC06C, #F4F9F6 | none | Iris/portal wipe to white | Expo-in burst, linear iris | **Feathered blade edges** (soft blur, 3-5% of width). Motion-blur look on the spin. 2D |
| 16 | 24.50-25.93 | 1.43 | Document centre-left; then split screen: form on the left half, mint panel with phone on the right half | Static | A white triangle shard unfolds into a 3D "FORMULAIRE" sheet from edge-on (24.53-24.73, 6 f). Mint panel slides in from the right (Δ 76, 61, 30, 13 px/f, 25.07-25.23). Glossy 3D phone handset pops in with squash and rotation wobble (about 9 f), then bobs. White light streaks shoot in from the left through the phone (25.73-25.9) | Form, panel and phone: 3 planes | White / mint | #EFF3F1, #A4DEBC, #84D1A3 | "FORMULAIRE" small black caps on the doc | Hard cut; the light strands continue onto green (25.933): **element-continuity cut** | Ease-out slide, overshoot pop | Only fully-shaded glossy 3D object (specular highlights). Y-rotation on the doc. 2D+3D |
| 17 | 25.93-30.63 | 4.70 | Full-frame strands → off-centre particle loop → two glass tiles side by side | Static (breather) | 4-5 thin white strands braid (25.93-27.2), merge to one line, retract left (27.5-27.7). A dotted particle trail draws a loop (27.8-28.6). A frosted-glass cube condenses from the trail, rotates frontal and shows a ✓ (28.7-29.2), slides left as a second tile enters from the right with a ↓ (29.5-29.8). Both bob, drift down and scale gently | Glass tiles over a particle haze | Green with a large white haze gradient | #35C26F, #76D29C, white | none | Hard cut to white "NO" (30.633) | Slow ease-in-out | Glassmorphism (frosted fill, lighter top-right rim), particle sparkle. Longest, calmest shot (motion mean 1.08) |
| 18 | 30.63-32.17 | 1.54 | Centred 2-3 word line | Static | "NO" cut-in. "STRESS" reveals left→right through a soft mask, landing slightly high, then drops (in place by 30.77). Hold about 15 f. The line slides left (31.27-31.47) and "STRESS" is swapped in place for "BAD" (31.50); "SURPRISE" slides in from the right with expo-out (Δx 32, 12, 8, 6, 4 px/f from 31.60) while the whole line drifts left to re-centre. Cursor arrow drops in from the top (31.90, 4 f) and **clicks "NO"** (32.0) | Flat | Off-white with a mint top glow | black, green | Caps, cap 5.6% (32 px); "NO STRESS" 24% wide, "NO BAD SURPRISE" 42% wide | Click-triggered in-place swap to the logo (32.167) | Ease-out | 2D |
| 19 | 32.17-35.07 | 2.90 | Logo (about 26% wide, cap 7.2% = 41 px) above a pill button (37% × 10.9% = 372 × 62 px), centred | Static | "⊓□STRA" appears; a green dash runs right through the wordmark and out (32.17-32.40), then flies back in from the right and lands as the full stop (32.43-32.60). The pill enters blurred from below (32.73), rises about 72 px in 3 f and shoves the logo up 48 px in 4 f (32.77-32.93); both then settle back down about 25 px over about 10 f (to 33.27). "BOOK NOW" rises in through the pill's mask (32.87). Cursor travels in about 25 f. **Press**: width 363 → 291 px (−20%) in 3 f (33.8-33.9). **Release**: back to 361 in 6 f with no overshoot. The cursor wiggles; static from about 34.2 | Flat | Off-white with a mint top gradient | #F4F5F4, #2FC06C, black | Custom geometric bold-italic wordmark with square "O"s; "BOOK NOW" white Bold caps | End (static hold of about 0.8 s) | Ease-out | Button carries a lighter right-end gradient ("shine"). 2D. Chip Features → CTA (32.77-32.97) |

### WHY notes on the important shots

- **#1-#5 (shape-match chain):** one primitive (a white or green circle) survives five setups: the "?" dot, the "A WAY" dot, the eye, the circle chain, the green dot and the typing dots. The eye tracks a single object, so 5 setups in 4.1 s feel like one thought rather than five cuts. Flipping background polarity at each cut adds punch without adding colours.
- **#2 → #3 (hand grabs dot → dot becomes eye):** the cut has a cause. The hand picks something up, then we see what it became. This is "imagine a way" made literal: an abstraction (a dot) turns into a character (an idea).
- **#5 (cursor rotates to point right before the whip):** this is anticipation by pointing. The arrow starts turning from ↖ towards the right about 11 f before the whip (↑ at about 5.5, ↗ at 5.77) and reaches → on the whip's first frame (5.87), so the fast move reads as intended and not as random.
- **#7 (scatter-swap-converge):** swapping words while they are displaced hides the edit. The brain sees one object (the line) breathing in and out, not three title cards. It delivers 9 words in 3 s with zero cuts.
- **#8 (carousel of real copy, then the card is dropped):** it shows "too much text" instead of saying it, and the 3D wall feels oppressive by design. The gravity drop (ease-in, rotation) gives a clear "throw it away" verb before the solution.
- **#9-#10 (headline becomes a ribbon):** the brand's service, "MOTION DESIGN", turns into motion itself. Text-as-object is the proof of craft. The twist hides the background swap.
- **#11-#12 (SOLUTION label → square → one tile in a grid):** a scale chain (label → block → tile) followed by a reveal of many identical tiles tells the "stand out from the crowd" story in 2.5 s without words.
- **#17 (4.7 s breather):** after 25 s of dense morphing, motion energy drops to about 1/30 of the peaks (mean 1.08 against peaks of about 33). This is the "relief" beat. Calm glass check and download icons equal "it's handled", which sets up "NO STRESS".
- **#18-#19 (pun → logo, click-triggered):** the cursor clicks "NO" and that click causes the logo. Because the transition is driven by an interaction, it feels like UI cause-and-effect. Hiding the brand name in the benefit ("NO STRess") makes the logo the punchline.

## 5. Frame-by-Frame Studies

### Study A: Hook, 0.00-1.00 s (30 fps, `zoom/a_hook.jpg`)
- f0 is already mid-motion: an overexposed white cloud with giant "IMA…" cropped at about 3× scale. **No black frame and no fade from black.**
- The type covers about 93% of its scale-down in **8 f (267 ms)**. Width as a fraction of the frame (from the left edge of the "I", line centred at x≈512): f1 about 0.89, f2 0.71, f3 0.60, f4 0.53, f5 0.48, f8 0.41; left-edge Δ = 92, 54, 36, 24, 18, 10, 8 px/f. The largest step is at the start, so expo-out. It never fully stops: about 0.40 at f12 and 0.38 at f17, then it shrinks a little more as it fades (f18-f21).
- The "?" arrives f4-f6 as a liquid blob (dot plus hook), splits into 2-3 echo copies f9-f12 (a smear trail) and shrinks and fades f16-f21.
- Clouds stream outward the whole time (fly-through). At f20-f23 the clouds **defocus and fade** while "A WAY" fades in inside its selection box: a 4 f blur-dissolve.
- Why it works: a viewer scrolling past meets motion and a single readable word within 0.27 s. The question mark makes it a question, which asks for an answer.

### Study B: Dot → hand → eye match cut, 0.80-1.77 s (30 fps, `b_away.jpg`)
- "A WAY" box holds 6 f while contracting slightly (310 → 278 px wide). A hand enters from the right at f6 (1.000). At f7 (1.033) the box stretches taller for 1 f (anticipation), and at f8 (1.067) the box and text collapse **in 1 f** into an 8 px dot inside a 44 px mini selection box.
- The hand pinches the dot over f8-f18 while the dot grows, accelerating, from about 8 px to about 125 px (about 14 → 25 → 39 → 62 → 84 → 104 → 125 px at 1.10-1.37).
- At f19 (1.433) there is a hard cut: the dot is now the creature's eye at about the same screen position (within about 5% of frame width). The background flips green → mint-white.
- Why it works: the circle carries continuity, while the luminance flip and the new scale give the cut energy. A 1 f collapse reads as "snap", which suits a UI and design-tool vocabulary.

### Study C: Creature → circles → ring → dot → typing dots, 2.40-3.85 s (30 fps, `c_circles.jpg`, `d_dots.jpg`)
- Push into the creature's glowing head over 2.43-2.60 (6 f, head about 2×, bloom grows). Hard cut at 2.633 to a chain of white circles on green.
- The chain snakes over 2.63-2.93 (9 f), then curls into a ring of about 18 circles that expands and spins over 2.97-3.53 (17 f).
- Hard cut at 3.567 to one green dot (60 px) on white. Dot sizes measured per frame: dot 1 60 → 36 → 28 → 28 → 24 px; dot 2 appears at 3.633 at 50 px → 34 → 28 → 26 → 24; dot 3 appears at 3.700 at 46 px → 32 → 28 → 26 → 24. All three rest at 24 px by 3.83.
- **Stagger 2 f (67 ms)**. Each dot enters at about 2× its final size and settles in 3-4 f (expo-out scale-down, no undershoot), followed by a 3-dot "typing" wave.
- Why it works: it goes from many to one (a ring of circles to a single dot) with an inverted colour. The cut feels like a "zoom into one idea". The typing dots are a universally known UI microinteraction meaning "a message is being written".

### Study D: Pull-back, cursor cue, whip, 4.00-6.25 s (30 fps and 15 fps, `d_dots.jpg`, `e_cursor.jpg`, measured)
- Card width (white bbox, out of 1011 px): 1009 (4.067) → 990 → 941 → 872 → 832 → 810 → 795 → 788 → 784 … → 766 at 4.667. Per-frame Δ: 19, 49, 69, 40, 22, 15, 7, 4, 2.
- That is an **expo in-out with a 2 f ease-in, a velocity peak at f3 (4.167) and an exponential tail**. About 88% of the move happens in 6 f (200 ms).
- Then a very slow drift (766 → 754 px over 4.67-5.30, about 0.05% scale per frame), then a **second, smaller step-back**: 754 → 726 → 686 → 666 → 654 → 644 → 638 px (5.30-5.50, Δ 28, 40, 20, 12, 10, 6). The card then keeps its size (about 636 px, 0.63) while drifting down-left (cx −46 px, cy +20 px over 5.50-5.87), so the shot never fully freezes.
- Cursor: enters at 4.73 and rises about 8 f; it scales down with the card in the second step-back. It turns ↖ → ↑ around 5.50-5.53, then ↑ → ↗ → → over 5.73-5.87 (about 4 f).
- Whip: card centre-x per frame from 5.867 is 460, 464, 469, 476, 491, 513, 558, 694 (6.10, last on-screen frame), then about 900 as it leaves. Δ = 4, 5, 7, 15, 22, 45, 136, then about 204 px/f, so each frame is about 1.3-3× faster than the last. **Expo-in, 8-9 f (about 280 ms)**, with a slight dip-then-rise arc (cy +12 px, then −20 px on the last frame). The cut to shot 6 (6.133) happens behind the exiting card.
- Why it works: anticipation (the arrow turns to point right), acceleration (an expo-in exit) and a hand-off (shot 6 opens with rightward momentum). The fast move is motivated and continuous.

### Study E: "MOTION DESIGN VIDEO" wipe-off-and-retype mask, 6.10-7.10 s (30 fps cropped band, `w_mdv_crop.jpg`; re-measured on letter positions)
- The whip's momentum is carried by the line, not by a slide: "VIDEO" (left edge 594 → 659 px) drifts right with a decelerating ease (Δ 21, 10, 6, 4, 4, 2, 2, 2, 1 … px/f from 6.13) and grows slightly (about 1 px/f).
- Over 6.17-6.57 (12 f), the nearly static "MOTION DESIGN" (letters drift about 1 px/f) is erased left→right by a feathered mask at about 1 letter per frame ("OTION DE" → "N DESIG" → "DESIGN" → "SIGN" → "N" → gone); the right end of "DESIGN" is also clipped by a mask just left of "VIDEO" at first. Empty gap 6.60-6.63.
- Over 6.67-7.00 (10-11 f), "MOTION DESIGN" re-appears from the left through a soft-edged mask at about 40 px (about 1.2 letters) per frame and lands one word-space before "VIDEO" (x 185-636 vs 659).
- A faint translucent band (about 5-10% white, not a strong bar) fades in behind the line over about 8 f (6.80-7.07). A very slow push (about +1% scale, line 647 → 653 px) follows over 7.0-7.5.
- Why it works: the drift uses up the whip's leftover momentum, the left→right wipe-off and re-type give a clean reading order, and "VIDEO" never disappears, so the eye has a fixed point.

### Study F: Kinetic scatter-swap-converge, 7.50-10.63 s (30 fps, `g_youtest.jpg`, `h_overcomp.jpg`, measured on dark-pixel centroid)
- **Entrance:** "YOU" cut-in at 7.567, already moving down. Word stagger: "TEST" +3 f, "ADS" +2 f.
- The line centroid settles from y 241 → 262 → 267 → … → 280 over 13 f: a big first step and a long ease-out tail.
- **Scatter** at 8.30: the upper word's top edge moves Δy = 23, 15, 10, 6, 4, 2 px/f (8.33-8.50, expo-out); the lower word starts 4 f later (8.43) with Δy 16, 26, 14, 8, 6 px/f, settling by 8.60. "TEST" rises, "ADS" drops and "YOU" shifts left into a diagonal staircase. Hold about 3 f.
- **Swap** at 8.70: in 1 f each word is replaced at its own position (TEST → LINKEDIN, YOU → POST, ADS → ON).
- **Converge** over 8.77-9.00: left edge Δx = 23, 13, 8, 4, 3, 1 px/f while the vertical spread closes by Δ 16, 22, 13, 8, 4, 1 px/f, about 7 f to settle. Hold 10 f (9.00-9.33). Second scatter at 9.33 (staircase, about 7 f), "POST" slides right (9.60-9.67), swap at 9.70.
- "OVERCOMPLICATE" enters as letters on an arc ("ᶜOMP", "ERCOMPLICA"), each letter rotated and offset in a wave, and spreads flat over 9.70-9.87; then "YOU" drops into the line (9.97-10.13), so the re-assembly takes about 13 f. Final hold about 10 f (10.13-10.43), then the line drifts about 25 px left over 4 f (10.47-10.57) and jumps about 90 px right in 1 f (10.60) just before the smash cut (10.633).
- Cycle per sentence: about 1.0 s (7-14 f settle, 10-14 f hold, 6-7 f scatter, 1 f swap).
- Why it works: perceptual masking. The swap happens while the words are mid-move and displaced, so the viewer never sees text "change". The arc on "OVERCOMPLICATE" makes the word act out its meaning.

### Study G: Text-wall carousel and drop exit, 10.60-13.97 s (30 fps and 15 fps, `i_cyl1.jpg`, `j_cyl2.jpg`, measured)
- 10.633: a hard cut to a macro of bold black text. 10.667-10.73: 3 f of pure green defocus (the camera is "inside" the page).
- 10.77-10.87: white card edges sweep down from the top. 10.9-11.0: a full card in perspective. 11.0-12.0: the camera sits inside a ring of curved cards with corner handles, which orbit past (a cylinder).
- 12.0-12.8: the camera settles frontal on one card, with cards streaking past laterally. 12.87-13.10: pull-back, card width about 90% → 48% in about 7 f (65% at 13.00), easing to 43% by 13.33.
- The card starts sinking at 13.30 (2-4 px/f). Drop over 13.50-13.93: centroid Δy = 4.9, 5.8, 7.1, 7.8, 9.4, 10.2, 12.7, 15.1, 17.6, 20.8, 28, 32 px/f (later frames clipped by the frame edge), an **accelerating ease-in (gravity)**: velocity grows about 1.2× per frame, between quadratic and cubic. Rotation builds to about 20°. Exit in about 13 f (433 ms) after 6 f of slow sinking.
- Why it works: the gravity exit is the clearest "discard" gesture in the film, and it uses real physics-like acceleration, not a linear slide.

### Study H: Panel wipe → banner → ribbon, 13.90-16.63 s (30 fps, `k_panels.jpg`, `l_ribbon.jpg`)
- "MOTION" cut-in at 13.967; "DESIGN" lands at 14.033 (+2 f) from about 6 px above and settles in 3 f. Hold about 12 f (until the panels at 14.50).
- Four vertical green-gradient panels enter left→right at 14.50, 14.53, 14.57 and 14.60 (**1 f stagger**). Each panel is about 25% of frame width with a differently angled gradient, so the strips read as separate.
- 14.67: the line becomes a white horizontal banner. 14.80-14.93: the banner bends into a 3D ribbon and duplicates "MOTION DESIGN" along its length (text-on-path). 15.0-15.47: push-in; the type is about 15% cap height at 15.0-15.2 and about 40% by 15.47.
- 15.4-15.57: ribbon twist. 15.6: the background flips white → green inside the twist. 15.6-16.0: pull-back to a full-frame S-curve, which then flows as a travelling wave and flattens by 16.6.
- Why it works: the scale journey (word → banner → ribbon → wave) makes a single phrase carry 2.7 s of motion. The twist is a natural place to hide a background swap.

### Study I: Pixel build → SOLUTION → square → grid, 16.60-20.33 s (30 fps, `m_pixel.jpg`, `m2_hold.jpg`, `n_grid.jpg`, measured)
- Pixel build: 16.633-17.40 (23 f). Green blocks spread from a small cluster (solid core about 7% wide, about 14% with stray pixels) to about 70-87% of the width. The text starts resolving at 17.20 and is clean by 17.50 (residual glitches at 17.40-17.47).
- Label settle: label width 672 → 660 → 603 → 538 → 533 px and top edge y 205 → 206 → 213 → 221 over 17.50-17.63. The label resolves at about 1.25× and scales down to 1.0 in 4 f (ease-out). Hold about 22 f.
- Vertical expand: top edge Δ = 88, 36, 20, 14, 12, 8, 8, 4, 4, 4, 2, 2 px/f over 18.37-18.73 (the bottom edge mirrors it), from 23% to 95% of frame height. That is 44% of the 202 px travel in the first frame and 88% by f6, **expo-out over 7-12 f**.
- Snap-shrink at 19.13 (1 f) to a small square, which keeps shrinking for 3 f. Neighbouring tiles appear 19.23-19.30. The plane tilts into perspective in 6 f (19.23-19.43).
- Over 19.43-20.30 there is a slow drift: the hero tile goes white and glows while the far rows fade into fog over about 26 f.
- Why it works: it reads as a 1 → many reveal. The label is the brand idea, the grid is the market, and the glowing tile shows the outcome. Fog creates depth without any lighting simulation.

### Study J: Arrows → pinwheel → iris → form → phone, 20.40-25.93 s (30 fps and 15 fps, `o_arrows.jpg`, `p_pinwheel.jpg`, `q_form.jpg`, measured)
- Collapse arrows converge 5 f on green, then hard cut with colour inversion at 20.533 while still converging. That is **continuity of motion across an inverted cut**.
- Slow rotation of about 45° over about 38 f. A dot appears at 21.6.
- Burst, as green area % per frame from 21.85: 0.1, 1.7, 4.6, 9.6, 23.7, 49.3. Exponential growth over 6 f (200 ms). The blades have feathered edges.
- The pinwheel spins for 2.3 s, contracts (23.4-24.1), then a white **hexagonal iris** opens over 24.25-24.48. White area % per frame: 39.8, 48.7, 52, 62, 75, 77, 86.5, 97.3 (about 7 f, roughly linear).
- The form unfolds from edge-on in 6 f (24.53-24.73). The mint panel slides in, with its centroid Δ = 76, 61, 30, 13 px/f (expo-out over 4-5 f).
- The 3D phone pops with squash and stretch plus rotation over about 9 f, then idles with a bob.
- Light streaks enter over 25.73-25.90 and continue across the hard cut at 25.933.
- Why it works: every transition is a shape doing something: arrows collapse into a dot, the dot bursts, the burst irises open. No generic cross-dissolves.

### Study K: Strands → particles → glass icons, 26.0-30.6 s (10 fps, `r_lines.jpg`)
- Strands braid with low amplitude for about 1.3 s, merge into a single line (27.2) and retract left (27.5-27.7). Empty green for about 3 f.
- A particle "comet" draws a loop (27.8-28.6, about 24 f). A glass cube condenses on the loop (28.7-28.9), rotates to frontal (29.0-29.2) and the ✓ strokes on.
- The second tile enters from the right (29.5-29.8) and shows ↓. Both drift and bob at about 0.5 px/f until 30.6.
- Why it works: this is the longest and calmest shot, giving 4.7 s of relief before the reassurance and CTA. Glass and particles add a premium material change without new colours.

### Study L: Pun → logo → button press, 30.6-35.07 s (10 fps and 30 fps, `s_end.jpg`, `t_logo.jpg`, `u_click.jpg`, measured)
- "STRESS" mask-reveals left→right and is in place by 30.77 (about 4 f), then holds about 15 f. The line slides left over 6 f (31.27-31.47) and "STRESS" swaps to "BAD" in 1 f (31.50). "SURPRISE" then slides in from the right from 31.60 with expo-out (Δx 32, 12, 8, 6, 4, 4 px/f) while the whole line keeps drifting left to re-centre ("NO" 391 → 303 px over 31.27-31.97).
- The cursor drops in from the top (31.9, 4 f) and taps "NO" (32.0-32.03). The text swaps to the logo in 1 f at 32.167.
- A green dash runs right through the wordmark and out of it (32.17-32.40), then flies back in from the right (32.43-32.60) and becomes the full stop. The pill appears blurred from below (32.73) and rises about 72 px in 3 f; it shoves the logo up 48 px in 4 f (logo top 261 → 213 px, 32.77-32.93), then both settle back about 25 px over about 10 f (logo at 240 by 33.27). "BOOK NOW" rises inside the pill (32.87-32.93, 3 f).
- Cursor approach: about 25 f (from about 32.9 to 33.73), slow start, faster middle, decelerating finish. Press: width 363 → 343 → 307 → 293 → 291 px (3 f, −20%, ease-out; re-measured 371 → 351 → 319 → 295 → 292 with the shine end included). Release: 297 → 309 → 333 → 347 → 359 → 361 px (6 f, ease-out, no overshoot; re-measured 304 → 320 → 342 → 358 → 370 → 372).
- Static end hold from about 34.2 s (motion curve 0.0 for the last 4 bins).
- Why it works: the click turns the CTA into a demonstration of the action we want from the viewer. A 3 f press and 6 f release is a believable button physic. Ending on stillness lets the logo register.

## 6. Motion Language observed

- **Snap arrivals (expo-out):** about 40-45% of the travel on the first moving frame (SOLUTION expand 44%, panel slide 42%), about 88-95% by frame 6 (200 ms). Used for the label expand, the panel slide, the converging words and the card pull-back (which adds a 2 f ease-in before its peak). This is the dominant ease.
- **Accelerating exits (expo-in / gravity):** the whip (Δ per frame 4 → 136 px over 8 on-screen frames, then about 204 px as it leaves; 1.3-3× per frame) and the drop (Δ per frame 5 → 32+ px over 13 f after a slow 6 f sink, about 1.2× per frame, with 20° rotation). Exits are never ease-out.
- **Oversize-and-settle pops:** typing dots enter at about 2× and shrink to 1.0 in 3-4 f; the SOLUTION label resolves at about 1.25× and settles in 4 f; the logo is shoved up 48 px by the pill and settles back about 25 px over 10 f. Phone squash wobble over about 9 f. The press-release of the CTA button has no overshoot.
- **Continuous drift after landing:** 0.3-1 px/f (or about 0.05-0.1% scale per frame) on nearly every hold. This prevents "dead" frames: the motion curve reaches exactly 0.0 only in the final hold (34.4-35.07), although a few holds dip to 0.02-0.07 (3.8, 8.0, 10.2, 31.0-31.2 s bins).
- **Stagger:** 1 f for wipe panels, 2 f for dots and word pairs, 3 f for the first word pair in kinetic type.
- **Morph and shape chains:** dot ↔ eye ↔ circles ↔ dot, label → square → tile → grid, arrows → dot → pinwheel, line → particles → glass cube, words → logo.
- **Kinetic typography:** scatter, swap, converge. Arc-wave letters on a single emotive word. Wipe-off-and-retype mask. Text-on-path ribbon. Click-triggered word-to-logo swap.
- **Interaction cues:** a stroke-drawn arrow cursor that rotates to point the next direction, and clicks that trigger transitions. Design-tool selection boxes track objects.
- **Reads premium here:** a one-hue palette, small type, consistent eases, motion that always has a cause (grab, point, click, gravity), grain and glass textures used sparingly.
- **Reads amateur or busy here:** the 23-26 f pixel-glitch build (long and illegible), the parade of unrelated metaphors in the Features section, and a few tracked elements jittering in the selection box (1.5-2.0 s) [inferred].

## 7. Camera Language observed

| Move | When | Duration | Speed / measured | Feel | Next-shot handling |
|---|---|---|---|---|---|
| Fly-through (clouds past lens) | 0.0-0.7 | 21 f | Clouds outward, type 3× → 1× | Dreamy and airy, wide lens [inferred] | Blur-dissolve |
| Static plus micro drift | Most type shots | 0.5-3 s | 0.3-1 px/f | Calm and graphic | Hard cut or polarity flip |
| Push-in on subject | 2.43-2.60 (creature), 6.97-7.53 (text), 14.8-15.5 (ribbon) | 6-21 f | About 2× in 6 f (hero push), about +1% in 17 f (barely visible) | Builds into a cut | Cut on maximum scale or bloom |
| Pull-back reveal | 4.10-4.30 and 5.30-5.50 (two steps), 12.87-13.10 (tail to 13.33), 15.6-16.0 | 6-12 f | 1.0 → 0.79 in 6 f, then 0.75 → 0.63 in 6 f; card about 90% → 48% wide in 7 f | Reveals context (screen, card, ribbon) | Whip, drop or hard cut |
| Whip pan right | 5.87-6.13 | 8 f | Expo-in to about 13% of frame width per frame on the last on-screen frame (about 20% as it leaves), blur on the last 2 f | Energetic, directional | Next shot opens with rightward momentum |
| Orbit inside a 3D ring | 10.9-12.4 | 45 f | Cards pass at about 25-60 px/f [inferred] | Immersive, slightly overwhelming (on purpose) | Settle frontal → pull-back |
| Tilt onto a floor plane | 19.23-19.43 | 6 f | 0° → about 45-55° [inferred] | Screen-to-world, from 2D to 3D | Slow drift with fog, then object swap |
| 2D rotation (pattern spin) | 22.0-24.3 | 69 f | Continuous | Hypnotic | Contract → hex iris |
| Locked-off end frame | 34.2-35.07 | about 26 f | 0 | Stable for logo read | End |

Camera mistakes avoided: no random handheld wobble, no continuous meaningless drift on 3D, and every fast move has a cue.

## 8. Typography

| Element | Cap height (% of frame h) | Approx. at 1080p (cap / font-size) | Weight | Case | Width | Notes |
|---|---|---|---|---|---|---|
| "IMAGINE" | about 10.3% (58-60 px) | about 111 / 160 px | SemiBold | Caps | about 40% (still shrinking slowly) | White on green |
| "A WAY" | about 5.5% (30-33 px) | about 59 / 85 px | Medium/SemiBold | Caps | 17% (box 28-29%) | In a 1 px selection box |
| "MOTION DESIGN VIDEO" | 6.4% (36-37 px) | 69 / about 99 px | SemiBold | Caps | 64% | White over a faint translucent band |
| Kinetic lines (YOU TEST ADS, POST ON LINKEDIN, YOU OVERCOMPLICATE THINGS) | 5.6% (32 px) | 61 / about 87 px | SemiBold | Caps | 34% / 44% / 74% | Black plus one green key word |
| "MOTION DESIGN" (headline) | 8.5% (48 px) | 91 / about 130 px | SemiBold | Caps | 56% | Black on white |
| "SOLUTION" label | about 11% (62 px; block 22% h × 53% w) | about 118 / 170 px | ExtraBold | Caps | 46% text, 53% block | White knocked out of a green block |
| "NO STRESS / NO BAD SURPRISE" | 5.6% (32 px) | 61 / about 87 px | SemiBold | Caps | 24% / 42% | Green on the last word (STRESS, SURPRISE) |
| NOSTRA wordmark | 7.2% (41 px) | about 78 px cap | Bold italic geometric, square "O"s | Caps | about 26% | Green full stop |
| "BOOK NOW" | about 5.3% (30 px) (pill 10.9% h × 37% w = 62 × 372 px) | about 57 / 81 px | Bold | Caps | 37% pill | White on a green pill |
| French paragraph (prop) | 1.5-2% | 16-22 px | Regular | Sentence | Card width | Unreadable by design |
| Chapter bar labels | 1.8% of full 720 canvas | about 13 px | Regular (Inter/Roboto-like) | Sentence | Chip | UI chrome |

- **Family:** geometric wide sans, Montserrat-like (round "O", wide "M"). [inferred]
- **Tracking:** about 0 to +3%, leading n/a (single lines). Always centre-aligned at the optical centre, at about 50% ± 3% of frame height.
- **Max words on screen:** 3 for headlines. The only exception is the ~80-word prop paragraph, which is meant to be unreadable.
- **Colour rule:** one key word per line in brand green (ADS, LINKEDIN, OVERCOMPLICATE, STRESS, SURPRISE). Everything else is near-black or white.
- **Reveal types:** scale fly-in (z-space), blur-dissolve, collapse-to-dot, mask wipe-off-and-retype, word-by-word drop (2-3 f stagger), scatter-swap-converge, arc-wave letters, pixel/glitch build, panel wipe behind text, text-on-path ribbon, in-place word swap, click-triggered morph to wordmark.
- **Readability in motion:** each final line holds 10-23 f (0.33-0.77 s) at rest. That works for 2-3 words; it would be too short for 5 or more. Moving states are never read; only the settled line carries meaning.

## 9. UI Animation observed

- **Chapter progress bar (meta UI):**
  - A linear playhead tick moves at 1011 px / 35.07 s.
  - The active chip (#F2F2F2 with dark text) hands over to the next one through a 5-6 f linear cross-fade (the old chip dims as the new one brightens), starting 2-3 f after the playhead crosses the boundary.
  - Chip widths are proportional to section length.
  - A great device for case-study or "how we structure videos" posts.
- **Design-tool selection boxes:** 1 px white or green lines with square corner handles. They track an object ("A WAY", the creature's eye, carousel cards). This signals "made in a design tool" and adds a technical layer.
- **Chat typing indicator:** 3 dots, 2 f stagger, each entering at about 2× and settling to 24 px in 3-4 f, then a bounce wave.
- **Card/screen:** a white rounded card revealed by a pull-back with corner-bracket guide lines. It is not a browser frame.
- **Cursor:** a thick stroke-drawn arrow, not an OS cursor.
  - It rotates to point the next motion direction (↖ → ↑ → ↗ → →).
  - It taps text to trigger a transition.
  - It approaches the CTA in about 25 f.
  - Press: about 20% width shrink in 3 f; release in 6 f; no overshoot.
- **Form document:** "FORMULAIRE" with field bars and green accents, unfolding in 3D from edge-on in 6 f.
- **Glass icon tiles:** frosted squares with a lighter rim, white ✓ and ↓ glyphs, particle sparkle. They behave like app or feature icons.
- **Not present:** dashboards, charts, real product UI, tooltips and notifications. This is a service promo with no software product.

## 10. Transitions observed

| # | Type | When | Duration | Mechanics |
|---|---|---|---|---|
| 1 | Blur-dissolve | 0.63-0.77 | 4 f | Clouds defocus and fade while the new label fades in |
| 2 | Collapse-to-dot (shape reduction) | 1.033→1.067 | 1 f | Text box becomes a dot |
| 3 | Match cut (circle) plus polarity flip | 1.433 | 0 f | Dot in hand becomes the eye at the same screen position |
| 4 | Push-in to bloom, then shape-match hard cut | 2.43-2.633 | 6 f + cut | Glowing head → white circles |
| 5 | Inverted shape-match cut (many → one) | 3.567 | 0 f | White ring on green → green dot on white |
| 6 | Zoom-out reveal (frame becomes card) | 4.10-4.30, second step 5.30-5.50 | 6 f + 6 f | Expo in-out, slow drift, then a smaller expo-out step |
| 7 | Whip pan with blur, cued by an arrow | 5.87-6.13 | 8 f | Expo-in; the cut hides behind the exiting card and the momentum carries into the next shot |
| 8 | Mask wipe-off and re-type | 6.17-7.00 | 25 f | Feathered mask erases MOTION DESIGN left→right (12 f), 1-2 f gap, re-reveals it left→right (10-11 f) |
| 9 | Hard cut plus polarity flip | 7.567, 13.967, 30.633 | 0 f | Green ↔ white |
| 10 | Scatter-swap-converge (in-shot) | 8.30-10.13 | about 20-25 f per cycle | Swap hidden in the displaced state |
| 11 | Smash-in to macro plus defocus | 10.633 | 0 + 3 f | Extreme close-up of text, then fog |
| 12 | Gravity drop exit | 13.30-13.93 | 6 f sink + 13 f fall | Accelerating ease-in plus rotation |
| 13 | Vertical panel/blinds wipe | 14.50-14.63 | 4 f, 1 f stagger | 4 gradient strips |
| 14 | Text → banner → ribbon morph | 14.67-15.2 | 16 f | 2D → 3D |
| 15 | Twist-hidden background swap | 15.567→15.6 | 1 f | Polarity flip inside a ribbon twist |
| 16 | Pixel/glitch build | 16.63-17.50 | 26 f | Blocks resolve into a label at about 1.25×, which settles to 1.0 in 4 f |
| 17 | Scale chain (label → square → tile → grid) | 18.37-19.43 | about 32 f | Expo-out expand, 1 f snap shrink, 6 f tilt |
| 18 | Object swap (tile → arrows) | 20.333 | 0 f | Arrows point to where the tile was |
| 19 | Inverted cut mid-motion | 20.533 | 0 f | Arrows keep converging |
| 20 | Dot burst to full frame | 21.83-22.03 | 6 f | Exponential area growth |
| 21 | Hexagon iris/portal | 24.25-24.48 | 7 f | Roughly linear |
| 22 | 3D unfold from edge-on | 24.53-24.73 | 6 f | Y-rotation |
| 23 | Split-screen panel slide | 25.07-25.23 | 5 f | Expo-out |
| 24 | Element-continuity cut (light strands) | 25.73-25.933 | 6 f + cut | Strands cross the cut |
| 25 | Particle trail → object materialise | 27.8-29.2 | about 42 f | Trail condenses into a glass tile |
| 26 | In-place word swap | 31.47 | 1 f | STRESS → BAD |
| 27 | Click-triggered morph to logo | 32.0-32.167 | 5 f | Cursor tap → wordmark |
| 28 | Push-up (button pushes logo) | 32.73-32.93 | 6 f | Pill rises about 72 px in 3 f and shoves the logo up 48 px; both settle back about 25 px over about 10 f |

There are no generic cross-dissolves (except #1) and no plug-in-style light-leak transitions. **11 of the 13 hard cuts flip the background polarity** green ↔ white (exceptions: the whip hand-off at 6.13 and the tile → arrows swap at 20.33). Across all 18 setup changes, 11 are clean flips and 3 more are partial (6.13, 19.13, 24.50).

## 11. Editing Rhythm

- **Shot counts:**
  - Detected: 24 shots, ASL 1.46 s, median 1.06 s, 14 hard cuts plus 9 seamless changes (39.3 changes/min).
  - Corrected: **19 setups, ASL 1.85 s**, separated by 18 changes. 13 of them are cuts: 12 of the 14 detected hard cuts are real (6.13 is hidden behind the whip and 15.6 inside the ribbon twist; 14.6 and 19.3 are in-shot panel/tile events, not cuts), plus 1 undetected cut at 20.33. The other 5 changes are a blur-dissolve (0.70), a snap-shrink (19.13), a burst (21.83), an iris (24.50) and an in-place swap (32.17). On top of that there are about 25 in-shot morphs.
  - About 41 significant motion events, **one every 0.85 s**.
- **By section:**
  - Dream outcome: 5 setups in 6.26 s (ASL 1.25 s; the first 4.1 s average 0.8 s).
  - Pain point: 3 setups in 7.96 s (ASL 2.65 s, but kinetic events every about 0.5 s).
  - Benefits: 4 setups in 5.73 s (1.43 s).
  - Features: setups 13-18 plus the first 0.6 s of setup 19 in 12.8 s (about 1.9 s each).
  - CTA: the last 2.3 s of setup 19.
- **Fast versus slow:** 0-4.1 s and 13.97-24.5 s are the dense morph zones. Motion-curve peaks (0.2 s bins, start times): 33.2 at 22.0 s, 32.8 at 15.6 s, 25.2 at 15.4 s, 24.7 at 3.4 s and 24.4 at 12.0 s. Slow zones: 4.3-5.8 s (cursor hold), 25.93-30.63 s (motion mean 1.08, the breather) and 30.63-35.07 s (mean 0.45).
- **Pauses:** text holds of 10-23 f. Final static hold of about 0.8 s.
- **Hero moments:** the kinetic scatter-swap (7.57-10.63), the 3D text-card carousel (10.63-13.97), the ribbon (14.8-16.6) and the click → logo pun (32.0-32.2).
- **Beat sync:** at 83.4 BPM, 3 of 14 detected hard cuts fall within ±2 f of an audio onset (21%). Random chance at this onset density (1.63/s) is 19.6%. Within ±4 f it is 5 of 14. My 41 corrected motion events give 7 of 41 (17%) within ±2 f, also chance.
- **Conclusion:** the edit is **copy- or story-driven, not music-cut**. Rhythm comes from the 2-3 f staggers and the polarity flips, not from the soundtrack.
- **Acceleration curve:** fast (0-4 s) → readable (7-10 s) → dense (14-24 s) → breather (26-30.6 s) → calm CTA. This is a good template for a 30-35 s promo.

## 12. Sound Design

- **Measured:**
  - Integrated −7.9 LUFS (LRA 1.2 LU). ffmpeg re-measure: sample peak +1.2 dBFS, true peak +1.6 dBTP (so clipped or inter-sample overs), overall RMS −10.9 dBFS. (The analyst's first pass gave RMS −8.3 dBFS and a decoded peak of 1.47; those two values were not reproduced.)
  - Half-second levels stay within −10.8 to −16 dB (about 5 dB of dynamic range, with no build or drop).
  - Spectral energy: 44% in 300-3400 Hz, 27% in 4-8 kHz, 11% below 150 Hz (a light low end).
  - Side/mid −14.6 dB (narrow stereo). Spectral flatness 0.025 (tonal).
  - 57 onsets (1.63/s). Estimated BPM 83.4, possibly half-time of about 167. [inferred]
- **Speech:** the likelihood per 0.5 s ranges 0.19-0.67 (mean about 0.45). 20% of 10 ms frames sit more than 10 dB below the median in the voice band, at syllable-like spacing.
- **Implies:** a dense, mid-forward and heavily limited mix. Possibly a VO with on-screen words acting as kinetic captions ("imagine a way… you test ads, post on LinkedIn…"), but this is unconfirmed. [inferred]
- No clear hits: there are no isolated sub-impacts or whoosh peaks lined up with the whip (6.1) or the bursts (21.8), because the onsets do not cluster at transitions.
- **Takeaways for the system:**
  - Master to about −14 LUFS integrated with a −1 dBTP ceiling. At −7.9 LUFS, platforms will turn this down and the overs may distort.
  - Put soft UI ticks on the dot pops (3.57/3.63/3.70), the button press (33.8) and the cursor taps (32.0).
  - Use a whoosh that ends exactly on the whip's fastest frame (6.10-6.13), and a filtered riser into the pinwheel burst (21.8).
  - Leave a −6 dB "breath" in the music for the 26-30.6 s calm section.

## 13. Visual Quality

**Why it looks premium:**
1. A strict palette of one hue plus off-white plus near-black. Pure #FFFFFF is never used (#F4F5F4 instead).
2. Small, confident type (most lines 5.5-6.5% cap height, heroes 8.5-11%) with generous negative space.
3. Consistent ease families: expo-out arrivals, expo-in exits, oversize-and-settle pops on small elements.
4. Every transition is motivated by a shape, an interaction or physics.
5. Tactile textures (grain gradient, frosted glass, glossy inflated 3D) used once each, not everywhere.
6. Polarity flips create contrast rhythm without colour noise.
7. Depth is made from fog and scale, not heavy rendering.

**Flaws:**
- The wrapper (charcoal surround plus chapter bar) uses 21% of canvas height. The content is only 1011x567 inside a 1056x720 file, which is low resolution for 2026.
- Mixed languages (English headlines with a French paragraph and "FORMULAIRE").
- Too many unrelated metaphors in Features (arrows, pinwheel, form, phone, strands, glass) with no labels, so the feature meanings are guesswork.
- The 23-26 f pixel build is long and noisy.
- The pain cards' green duotone tint looks slightly muddy.
- The audio is over-limited.
- The chip timing labels "NO STRESS" as a Feature.
- No real work samples or client proof.

## 14. Style Category

**Editorial Motion / "Monochrome Brand-System Explainer"** (a discovered category): 2D-first kinetic typography and shape morphs in a single brand hue, with sparing 2.5D/3D accents (grain-gradient characters, a text ribbon, a 3D card carousel, glass icons). It suits agency self-promos, service explainers, LinkedIn and paid-social ads and brand-system showcases. Typical length is 20-40 s, edited from the copy or VO rather than to the beat.

## 15. Transferable Rules (concrete, numeric)

1. **Two-colour system:** use one saturated brand hue (here #2FC06C), off-white #F4F5F4 (never #FFFFFF) and near-black #161616 for type, plus a 30%-tint mint for gradients only. Flip the background polarity on at least 75% of hard cuts.
2. **Arrival ease:** use expo-out with about 40-45% of the travel on the first moving frame and about 88-95% by frame 6 (200 ms at 30 fps). After landing, keep a 0.3-1 px/f (or about 0.05-0.1% scale per frame) drift until the next event.
3. **Exit ease:** use expo-in or gravity. For a whip, velocity grows about 1.5-3× per frame over 8-9 f (about 280 ms); for a gravity drop, about 1.2× per frame over about 13 f (433 ms) after a short slow sink. Add 10-20° of rotation to "discard" exits.
4. **Oversize-and-settle on small objects:** dots and icons enter at about 2× and settle to 1.0 in 3-4 f (expo-out); labels resolve at about 1.25× and settle in 4 f; no overshoot on large cards or on button release.
5. **Stagger:** 1 f for strip or panel wipes, 2 f for dots or icons, 2-3 f for words in a line.
6. **Kinetic sentence cycle (about 1 s):** settle 7-14 f, hold 10-14 f, scatter 6-7 f, swap in 1 f while displaced, converge about 7 f. Use at most 3 words per line and colour one key word in the brand hue.
7. **Shape-match chain:** carry one primitive (circle, square or line) across at least 3 consecutive setups. Keep it within ±5% of its screen position across the cut, and change scale and/or polarity at the cut.
8. **Cue fast moves:** start turning an arrow or cursor towards the direction of a whip about 10 f before it starts, so that it points that way by the whip's first frame. The incoming shot must open already moving the same way.
9. **Whip spec:** 8-9 f expo-in reaching about 13-20% of frame width per frame on the last 2 f, with motion blur on those frames only. Hide the cut behind the exiting element.
10. **Pull-back reveal:** scale 1.0 → about 0.8 in 6 f (expo in-out with a 2 f ease-in), keep a slow 0.05-0.1%/f drift, and optionally add a second, smaller 6 f step (here 0.75 → 0.63) about 1 s later.
11. **Burst/iris transitions:** grow the covering area exponentially over 6-7 f (about ×2-2.5 per frame), with feathered edges of 3-5% of frame width.
12. **Typography scale (1080p):** body headlines about 61 px cap (about 87 px font, about 5.6% of frame height); hero words 91-111 px cap (8.5-10%); block labels about 118 px cap inside a block of 22% height; logo cap about 78 px (7.2%); CTA pill 37% × 11% of frame with 57 px cap text. Hold every settled line for at least 10 f.
13. **CTA click:** cursor approach about 25 f decelerating, press −15 to −20% scale in 3 f, release in 6 f with no overshoot, then a static hold of at least 0.8 s.
14. **Breather:** give 12-15% of the runtime (here 4.7 s of 35 s) to a low-motion section right before the reassurance and CTA. Keep its motion energy under 10% of the peaks.
15. **Interaction-caused transitions:** at least 2 transitions per film should be visibly triggered by something (a hand grab, a cursor click, a gravity drop).
16. **Structure for 30-35 s promos (measured here):** hook 1.4 s / dream 4.8 s / pain 8 s / benefit 5.7 s / features 10.7 s / reassurance 1.5 s / brand plus CTA 2.9 s.
17. **Hide swaps in motion:** do background swaps inside a twist, spin or burst, and word swaps inside a scatter, never on a static frame.

## 16. What to Avoid (as observed here)

- Over-loud masters: −7.9 LUFS with overs above 0 dBFS (true peak +1.6 dBTP). Deliver at about −14 LUFS and −1 dBTP.
- Glitch or pixel builds longer than about 12 f. Here it is 23-26 f of illegible noise.
- Mixing languages within one film (English headlines with French body copy) unless that is intentional and localised.
- Unlabelled abstract feature metaphors. If a pinwheel means "attention", add a 1-2 word label.
- Presenting the deliverable inside a wrapper (player frame plus chapter bar) when it will be used as the actual ad. It wastes 21% of the height and caps the resolution.
- Assuming beat sync. This film's cuts land on onsets only at chance rate, so if music is the driver, place hard cuts within ±2 f of onsets on purpose.
- Introducing a new texture or material per section without a reason. Grain, glossy 3D and glass all appear once; adding more would read as a template collage.

## Verification

An adversarial frame check re-measured this file on 2026-10-08. No earlier checker edits were found (the file had no Verification section and still held the analyst's original numbers), so the whole file was re-checked. Method: exact frame-indexed decoding (ffmpeg `select=n`, full 1011x567 content crop) with numpy colour masks for edges, widths and centroids; 30 fps contact sheets (`zoom/ck_*.jpg|png`); `analysis.json` for the motion curve, onsets, cut list and audio; and ffmpeg `ebur128`/`astats` for loudness. Caveat found along the way: `frames.py` duplicates the first frame when the start time is rounded up past a frame time (for example 0.967 > 29/30), and at low fps its labels can be off by up to half the sample interval. Start sheets slightly before a frame time (for example 0.966). Some of the analyst's 1 f offsets (dot pops at 3.65/3.717 instead of 3.633/3.700) probably come from this.

**The 8 key claims re-measured**

| # | Claim | Result | Change |
|---|---|---|---|
| 1 | Chapter-bar boundaries 6.26 / 14.22 / 19.95 / 32.75 s; chips light within about 3 f; "4 f grey" hand-over | Chip gaps map to 6.24 / 14.19 / 19.93 / 32.73 s (within 1 f). Light-up starts 2-3 f after the playhead crosses. The hand-over is a 5-6 f linear cross-fade. | Boundaries confirmed. Cross-fade and chip timings corrected (6.33-6.50, 14.27-14.47, 20.00-20.17, 32.77-32.97). |
| 2 | Hook: IMAGINE width f1 0.92 / f3 0.8 / f5 0.6 / f8 0.43, then static; cap about 7% | f1 0.89, f2 0.71, f3 0.60, f5 0.48, f8 0.41, then still shrinking (0.38 at f17). Cap 58-60 px = 10.3%, settled width about 40%. | Corrected (study A, shot 1, typography table). |
| 3 | Collapse at 1.067, dot grows 8 → 40 px, match cut 1.433; A WAY box 15% wide, cap 3% | Collapse at 1.067 and cut at 1.433 confirmed (the background flips on frame 43). The dot grows to about 125 px. The box is 28-29% wide and the cap is 30-33 px (5.5%). The hand enters at 1.000 and the box stretches for 1 f at 1.033. | Corrected (shot 2, study B, typography table). |
| 4 | Pull-back 1.0 → 0.79 in 6 f, then a "constant drift" 768 → 636 px over 34 f at 0.4%/f; whip 9 f expo-in | First step confirmed (Δ 19, 49, 69, 40, 22, 15, 7, 4, 2 px/f). The "drift" is really a slow 0.05%/f drift followed by a **second 6 f step** (754 → 638 px, 5.30-5.50). The whip is confirmed as expo-in (Δ 4, 5, 7, 15, 22, 45, 136, then about 204 px/f), 8 f on screen. The last on-screen frame is 6.10 and the cut at 6.133 is hidden behind the card. The cursor turns ↑ about 5.5, ↗ at 5.77 and → at 5.87. | Corrected (shot 5 and 6 boundary moved to 6.13, study D, camera table, transitions, rules 8-10). |
| 5 | Kinetic type: stagger +3 f/+2 f, scatter 8.30, swap 8.70, converge Δ 45, 30, 10, 6, 2, holds 15/12/17 f, arc 9.70-10.03 | Stagger, scatter start, swap and converge timing confirmed. Measured Δ: scatter 23, 15, 10, 6, 4, 2; converge 23, 13, 8, 4, 3, 1. Holds about 14/10/10 f. The second scatter is at 9.33. Not documented before: POST slides right at 9.60, YOU drops into line at 9.97-10.13, and there is a 4 f leftward drift plus a 1 f jump right (10.60) before the smash cut. Line widths are 34/44/74%. | Corrected (shot 7, study F). |
| 6 | Gravity drop 13.50-13.95, Δy 5 → 36, near-quadratic; pull-back 0.78 → 0.45 in 21 f | Drop confirmed (Δy 4.9 … 32 px/f, about 1.2× per frame), but the card already sinks from 13.30. The pull-back is about 90% → 48% card width in about 7 f (12.87-13.10), easing to 43% by 13.33. | Corrected (shot 8, study G, camera table, transitions). |
| 7 | SOLUTION expand Δ 87, 36, 20, 14, 13, 9, 6 (38% on f1); label settle 1.08 → 1.0; pinwheel burst area; hex iris area | Expand confirmed (Δ 88, 36, 20, 14, 12, 8, 8 …), which is 44% on f1 and 88% by f6, to a 533 × 536 px square (95% of the height). The label settles from about **1.25×**, not 1.08× (width 672 → 533 px in 4 f). Burst area 0.1, 1.7, 4.6, 9.6, 23.6, 49.2% and iris white area 39.7 → 97.1% (7 f) both confirmed. | Corrected (shot 11, study I, motion language, rule 4). |
| 8 | CTA: logo cap 4.6%, pill 37% × 8.3%, BOOK NOW 3.5%, pill rises 46 px in 4 f, dash flies in 32.4-32.6, press 363 → 291 in 3 f, release 6 f, static from 34.2 | Press and release shapes confirmed (371 → 351 → 319 → 295 → 292, then 304 → … → 372, no overshoot), and the end is static from about 34.13. **Sizes were wrong:** logo cap 41 px = 7.2%, pill 62 px = 10.9% high, BOOK NOW cap 30 px = 5.3%. The pill rises about 72 px in 3 f and shoves the logo up 48 px, then both settle back about 25 px over 10 f. The dash first runs right through the wordmark (32.17-32.40) before flying back in as the full stop. | Corrected (shot 19, study L, typography table, rule 12). |

**Other checks and fixes**
- MOTION DESIGN VIDEO (6.13-7.07): "MOTION DESIGN" does not slide right. It stays nearly static while a feathered mask erases it left→right (about 1 letter/f), and it is "VIDEO" that drifts right with a decelerating ease. Also: there is no "50% white bar", only a faint 5-10% band over about 8 f; the push is about +1%, not +3%; and VIDEO does not slide left. Fixed in shot 6, study E, the camera table and transition 8.
- Typing dots: each dot enters at about 2× (50 and 46 px) and settles to 24 px in 3-4 f. This is not a "1.35-1.4× 1 f overshoot". Dot times are 3.567 / 3.633 / 3.700. Fixed in shot 5, study C, UI section, motion language and rule 4.
- NO STRESS → NO BAD SURPRISE: the swap is at 31.50 (not 31.47), after a 6 f leftward slide of the line. SURPRISE slides in from the right with expo-out. The cap is 5.6%. Fixed in shot 18 and study L.
- Polarity: "13 of 16 major transitions" was not reproducible. Re-counted on all 18 setup changes, 11 of the 13 hard cuts flip green ↔ white. Fixed in summary, section 10 and rule 1 context.
- Cut accounting: the "12 true hard cuts plus 2 hidden cuts (15.6, 20.33)" double-counted 15.6. Restated as 12 real detected cuts plus 1 undetected cut (20.33), plus 5 non-cut setup changes.
- Motion-curve peaks: these were 22.0 s and 12.0 s, not 22.2 s and 11.6 s. The 15.6 s ribbon bin (32.8) is the second-highest, behind the 22.0 s burst bin (33.2). Breather energy is about 1/30 of the peaks, not 1/20. Fixed.
- Ribbon push: it runs to about 15.47 (type about 40% cap), not just to 15.2. Fixed in shot 9, study H and the camera table.
- Audio: −7.9 LUFS confirmed. True peak is +1.6 dBTP and sample peak +1.2 dBFS. RMS re-measured at −10.9 dBFS; the −8.3 dBFS RMS and 1.47 peak were not reproduced. Beat-sync numbers (3/14 within ±2 f, 5/14 within ±4 f, chance 19.6%) re-computed from `analysis.json` and confirmed. Speech likelihood range confirmed.
- Confirmed unchanged: inset geometry (x 23-1033, y 23-590) and chapter bar (y 623-687); creature push and cut at 2.633; circle chain and ring 2.63-3.53; pinwheel burst and hex iris; SOLUTION block 53% × 22% with an 11% cap; MOTION DESIGN headline 8.5% cap at 56% width; kinetic caps 5.6%; story-stage proportions; the drop's 20° rotation (visual).
- Shot table: 19 rows, contiguous 0.00-35.07 with no gaps or overlaps (durations sum to 35.06 s with rounding). All 10 Phase-2 attribute columns (composition, camera, movement, depth, lighting/background, palette, typography, transition, ease, blur/glow/grain/DOF/parallax/2D-3D) are filled in every row, with typography marked "none" where there is no text.
- Not re-measured (left as the analyst's): the orbit angle and card count in the carousel, the cloud parallax, the strands/particles/glass timings (study K), the phone squash, side/mid and spectral split, and the chapter-label font.
- The structured summary in `workflows/master-args.json` still carries several of the corrected values (typing-dot overshoot 1.35-1.4×, "38% on frame 1 / 95% by f6", "0.4%/f drift for 34 f", logo cap 4.6%, pill 8.3%, BOOK NOW 3.5%, "+3% push", card 0.78 → 0.45 in 21 f, "MOTION DESIGN slides into a mask", 13 of 16 polarity flips). It was not edited here.
