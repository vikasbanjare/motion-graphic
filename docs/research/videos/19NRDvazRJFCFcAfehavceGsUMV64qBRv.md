# Teardown: Bumper "BUMPER PRO" ("Take payments like a PRO"), a payment-unification launch film

- File: `refs/19NRDvazRJFCFcAfehavceGsUMV64qBRv.mp4`. Runs 67.2 s at 30 fps, 1138x640 (16:9). Audio is a music bed with no clear voice-over. Integrated loudness is -14.1 LUFS.
- Method: I viewed both timeline sheets, the overview, the hook, all four shots sheets and all five transitions sheets. I then made 23 frame-by-frame zoom sheets (30, 20, 15, 12 and 10 fps) covering every section. I measured per-frame text bounding boxes on full-resolution frames to get the ease curves, sampled brand colours in pixels, and ran band-energy, spectral-centroid and onset-autocorrelation analysis on the audio. Numbers are measured unless marked [inferred]. Frame counts are at 30 fps (1 f = 33.3 ms). Pixel sizes are native 640p unless a 1080p equivalent is given.

---

## 1. Summary

Bumper (bumper.co) is a UK payments company. This film launches **Bumper Pro**, a "one platform, every payment" layer for merchants. Its features are intelligent or AI payment routing, automatic reconciliation, reporting, refunds/chargebacks/fraud handling, and multi-provider failover. The film is a **kinetic-typography-led SaaS launch**. It alternates two worlds:

1. **The claim world.** A deep ultramarine-navy field (#020047 to #06004E) with a drifting coral glow at the top right and violet light at the bottom. Glowing white and orange sans type is built word by word. A constant "camera pull-back" shrinks each line as more words arrive.
2. **The proof world.** Bright lavender-white (#F4F4FC/#FCFCFC) with a periwinkle corner vignette. It holds tilted 3D product UI: tables, columns, a dashboard, a hero photo with icon badges, and payment-method chips. An orange 3D "paper-plane" cursor acts in this world. Three proof scenes break the rule and sit on navy: the logo/chip ring (#4), the fee chart and tooltip (#8-9) and the provider network (#21).

The skeleton is **claim (navy type) → proof (light UI)**, repeated five times. It is bracketed by a bookend: "Take payments like a PRO" opens the film. At the end the same line returns with a rapid word swap: Boss / Master / Hero / Champion / Legend / PRO. Then the BUMPER PRO wordmark and a QR code close the film.

Signature techniques:

- An **exponential "slam-down" scale entrance** for single hero words. "Take", "Save", "like" and "Kick" start 3-4x oversized and motion-blurred, and settle in 8-13 frames.
- **Word-by-word line building with motion-blurred slide-ins from the right**, which keeps the whole line centred.
- **Semantic letter animation.** "Thousands" decodes from "$$$$". "Automatically" assembles its own misaligned letters. "Kick" letters bounce up as if kicked.
- A **chevron shape-mask wipe**, driven by the copy "up a gear", that flips navy to white.
- A **push-through camera move** that goes through a 3D table into two extracted columns.

The edit is cut to a strict 100 BPM grid. 11 of the 18 hard cuts land 0-2 f before a quarter-note beat (chance is about 17 %), so the picture runs slightly ahead of the music. The `analysis.json` onset list hides this. It misses the intro kicks and the kicks under the filtered breakdown, and on that list only 4 of 17 detected cuts fall within ±2 f of an onset.

## 2. Creative Direction

| Aspect | Observation |
|---|---|
| Concept | "Take payments like a PRO". One platform unifies every payment method and automates the painful back-office work: fees, reconciliation, reporting, disputes and downtime. The product name is the punchline ("PRO" = Bumper Pro). |
| Visual language | Two-world system. Navy/violet "night" for claims and glowing type; lavender-white "day" for product proof. A single brand accent (coral-orange #F4643C) marks the key word or element in every frame. Glassy translucent 3D panels, soft shadows, shallow depth of field, heavy directional motion blur. |
| Style | Kinetic typography plus 3D UI proof. Fast startup launch energy with premium SaaS polish. |
| Personality | Confident, cheeky and sporty ("like a Boss", "Kick your payments up a gear", "like you've never seen it"). It is fintech, but it never reads corporate. |
| Tone | Upbeat and swaggering. Rhythmic and punchy in the type sections, calm and explanatory in the UI sections. |
| Positioning | About 45 % premium, 30 % playful, 15 % technical, 10 % cinematic [inferred estimate]. |
| Consistency | Very high. One sans family for all copy plus one heavy rounded display face for the wordmark/PRO. One accent colour. The same 3-stage type behaviour (oversize slam → word build → pull-back) appears about 12 times. The orange cursor appears in three UI scenes. The orbit-ring motif appears three times: payment chips, provider network and merge ring. Light/dark alternation mostly means claim vs proof. The exceptions are the light hook and the light "payment unification" line, plus three proof scenes on navy: the logo/chip ring, the fee chart and the network. |
| What makes it feel expensive | Restraint in palette (navy, white, one orange). Generous glow and DOF that suggest a 3D render pipeline. Every move carries motion blur. Typography is large and centred with air around it. UI is shown as real-looking product data (merchant rows, GBP amounts, dates) rather than placeholder blocks. |

## 3. Story Structure

| Stage | Start-end (s) | Duration | Purpose |
|---|---|---|---|
| Hook / promise | 0.00-2.40 | 2.4 s | "Take payments like a PRO". It starts on frame 0 with an oversized motion-blurred "Take". It flips light to navy at 1.17 s, and the orange "PRO" decodes from glitch glyphs. The product name is planted in the first 2 s. |
| Product reveal | 2.40-7.20 | 4.8 s | "One platform / Every payment". The B logo draws in stroke, then fills (3.62-4.10). A ring of payment-method chips (Visa, Mastercard, Apple Pay, GPay, Amex, Pay by Bank) flies in and orbits. The logo stroke (3.62) lands on the fourth intro kick (3.60). The full groove enters on the next kick (4.80), 5 f before the chips fly in (4.97). |
| Feature 1: savings / routing | 7.20-14.33 | 7.1 s | Claim: "Save thousands with intelligent payment routing". Proof: a 3D fee bar chart. The cursor flips a "Without Pro → With Pro" toggle and the orange bar is tiny next to the violet one. A punch-in to an "AI-powered routing / automatic savings" tooltip follows. |
| Feature 2: reconciliation | 14.33-25.60 | 11.3 s | Claim: "Automatically reconcile transactions". Proof: 3D tables fly in. The camera pushes through into the BUMPER vs DMS "Amount" columns, which turn mint (matched). The camera then travels along transaction rows. A reconciliation rate counts 84 % → 100 % with the cursor. This is the longest and most detailed proof. |
| Feature 3: reporting | 25.60-29.97 | 4.4 s | Claim: "Access reporting on one platform". Proof: a dashboard close-up with line charts drawing on, then a pull-back to the full "After Sales Performance - Retail" dashboard. |
| Feature 4: disputes | 29.97-35.93 | 6.0 s | A hero lifestyle photo tile with three hexagon badges on an orbit ring. The camera orbits to each in turn: Refunds processed (mint), Chargebacks resolved (yellow), Fraud blocked (pink). The caption is "Streamline refunds and chargebacks / and reduce fraud". |
| Feature 5: uptime | 35.93-46.13 | 10.2 s | Claim: "Eliminate payment downtime with multiple providers". Proof: a 3D network diagram. The B hub connects to Provider 1, which fails red, then Provider 2, which fails red. It reroutes to Provider 3, and both turn teal (success). |
| Climax / unification | 46.13-56.67 | 10.5 s | "Kick your payments up a gear" leads into a chevron wipe to white. Then "This is payment unification … like you've never seen it" plays, and the payment chips orbit and implode into the B logo with a spark burst. Three cuts here land on onsets. |
| Finale callback | 56.67-61.47 | 4.8 s | "Take payments like a" builds again. Under it the words swap every 11-16 f: Boss → Master → Hero → Champion → Legend → PRO, with escalating size. PRO switches to the heavy display face with strong glow. |
| CTA / logo lockup | 61.47-67.20 | 5.7 s | The BUMPER letters are revealed right to left next to PRO. The wordmark rises, a QR code scales up from a dot with an orange scan line, and "bumper.co" appears below. The music fades out from 63.5 s. |

Notes:

- There is **no explicit problem stage**. Pains (fees, manual reconciliation, downtime, fraud) are implied only by each benefit claim.
- Typography takes about 33 s (49 %) of the runtime and UI/graphic proof about 34 s (51 %).
- Each feature block lasts 4.4-11.3 s. The block with the most visual proof (reconciliation) gets the most time.

## 4. Shot-by-Shot

The detector found 24 shots. I corrected this to **27 shots** by eye:

- Added hard cuts at 13.13 (punch-in), 14.33 (the detector placed it at 14.63, 9 f late) and 22.70 (an angle-change cut the detector called seamless).
- Added seamless shot boundaries at 18.30, 21.50, 23.85 and 52.75. The 28.80 pull-back snap is an in-shot beat inside #18, not a boundary.
- Dropped the detector's seamless changes at 22.9 (replaced by the 22.70 cut), 46.93 and 48.47, which fall inside #22 and #23.
- Recognised that 47.83-48.33 is a shape wipe, not a cut at 48.03.
- Moved the 11.03 boundary to 11.00. Frame differencing puts the first chart frame at f330 (11.000).

"S" means a seamless change within one continuous move.

| # | Time (s) | Dur | Composition / framing | Camera | Object / UI / text movement | Depth & layering | Light / background | Palette | Typography | Transition out | Ease | Blur / glow / shadow / grain / DOF / parallax / 2D-3D |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0.00-1.17 | 1.17 | Centred single line, optical centre y≈50 % | Continuous pull-back (scale-down) with re-centring pan as words add | "Take" slams from 4.05x to 1x in 8 f. "payments", "like" and "a" slide in from the right with blur at 9-10 f intervals | Flat 2D text over gradient | White #FCFCFC with periwinkle #C4C4EC vignette at the bottom-right and left corners | Navy text #04043C. "like a" in lighter lavender-grey | Medium sans, sentence case, cap ≈8.5 % H | Hard cut on the same line position (colour-inverted match) | Expo-out scale, slide ease-out | Heavy motion blur and ghosting on f0-f2. Defocus on entering words |
| 2 | 1.17-2.40 | 1.23 | Same line, now smaller, centred | Slow linear pull-back (line shrinks about 32 % in 26 f) | "PRO" decodes from scrambled outline glyphs with chromatic fringes to solid orange in about 10 f (1.17-1.50). "RO" is solid by 1.27, and the "P" stays an outline until about 1.50 | 2D | Navy #06004E with a coral glow blob at the top right and violet at the bottom left | White/lavender + orange #F4643C | "PRO" in the same sans, bold, orange with glow | Hard cut to 1 empty navy "breath" frame | Linear drift | Outer glow on the orange glyphs. Glitch decode |
| 3 | 2.40-3.67 | 1.27 | Huge centred word "One" (cap 23 % H ≈ 250 px@1080) | Pull-back in two phases: slow drift (-3.5 %→-1.5 %/f), then accelerating snap (-10 %/f) at 3.05-3.25 | O, n and e blur in letter by letter at a 4 f stagger, each resolving in 3-4 f. Then "p-l-a-t" types in | 2D | Navy with a violet floor glow | White with lavender glow | Semibold sans | S: the line rises, "Every payment" (orange) appears below, and the logo stroke starts above | Ease-out, then ease-in snap | Bloom on white type (about 15-20 px at 1080). Per-letter blur-to-sharp |
| 4 | 3.67-7.20 | 3.53 | Logo above a 2-line title, centred. Chips ring the group | Slow push/drift, then a pull-back recede at the end (6.9-7.17) | B outline stroke-draws in 5 f, then the fill grows from a dot in 8 f, then a sheen sweeps across in 14 f. Chips fly in on curved paths from off-frame (4.97-5.70, 22 f) and orbit clockwise | 3D ring: near chips defocused, far chips sharp | Navy with a coral blob behind the logo | Orange B, white/orange type, multi-brand chip colours | "One platform" white semibold. "Every payment" orange medium | Group shrinks and darkens into a hard cut | Ease-out fly-in, ease-in recede | Real DOF on chips, motion trails on fly-in, logo gloss pass |
| 5 | 7.20-8.70 | 1.50 | Huge centred "Save", then a small line | Pull-back: 2.9x→1x in 13 f, then a cut-step to 0.4x | "thou$$$$$" decodes to "thousands" (7.68-8.08, 12 f). The line exits left with a 2 f whip smear | 2D | Navy, violet floor | White | Semibold to medium | Hard cut (text whips out on the cut) | Double ease (out, then re-accelerate) | Heavy bloom at the oversize scale. Whip motion blur |
| 6 | 8.70-9.63 | 0.93 | "with intelligent" centred | Slight pull-back | "with" blurs in. "intelligent" (orange) slides from the right with blur in about 4 f | 2D | Background shifts to a magenta/coral gradient at the right | Lavender + orange | Medium sans | S: scale snap (zoom out about 40 % in 3 f with blur) | Ease-in-out snap | Directional blur on the snap |
| 7 | 9.63-11.00 | 1.37 | Full line "with intelligent payment routing" (59 % W) | Slow pull-back | "payment" and "routing" slide in from the right at a 2 f stagger, then the line holds | 2D | Navy + coral | White / orange / white | Cap ≈4.5 % H (≈49 px@1080) | Text defocuses for 1-2 f, then a hard cut | Ease-out | Rack defocus out |
| 8 | 11.00-13.13 | 2.13 | 3D bar chart in perspective, left-centre. Toggle at the top right | Pull-back + tilt drift | The orange 3D cursor flies in from the right with blur (11.10-11.30) and clicks the "Without/With Pro" toggle (12.03). The orange bar rises (12.03-12.27) beside the tall violet ghost bar | 3D plane with axes. Bars are translucent glass | Navy | Violet glass bars, orange bar/toggle | Tiny axis labels (£10s-£1000s) about 1.3 % H | Hard punch-in cut | Ease-out | Glass gradient bars, soft shadow under the cursor, DOF on the far axis |
| 9 | 13.13-14.33 | 1.20 | Close on the tooltip bubble, centre-right. The orange bar is at the bottom | Slow lateral drift, then a 3D swing-out left with blur (14.03-14.30) | The outlined speech bubble's text types in: "AI-powered routing" (white), then "automatic savings" (orange), about a 4 f stagger per word | Foreground bubble, defocused bar plane behind | Navy | Outline white, orange sparkle icon | Italic-feel light sans [inferred] | Hard cut | Ease-in exit | Bubble outline stroke. Parallax between the bubble and the chart plane |
| 10 | 14.33-15.37 | 1.04 | "Automatically" in orange, centred, letters scattered vertically | Static, then a slight pull | The letters arrive at a 1-2 f stagger with random ±0.5 cap y-offsets. Strays "a" and "lly" hover, then snap to the baseline (14.97, 15.37) | 2D | Navy | Orange #E46C54 | Medium sans, cap ≈9 % H | S: scale snap to 0.45x | Ease-out per letter | Per-letter defocus |
| 11 | 15.37-16.77 | 1.40 | 2-line stack: orange line 1, white line 2 | Slow pull-back | "reconcile" slides in from the bottom-left and "transactions" from the bottom-right, 4 f each | 2D | Navy | Orange + white | Two weights of the same sans. Leading ≈1.1x | Text blurs 1 f, then a hard cut on an onset (16.76) | Ease-out | Blur in and out |
| 12 | 16.77-18.30 | 1.53 | Two tilted data tables, bottom-right to centre | Fly-in (12 f), then a slow rotate-towards-camera | Tables enter from the bottom-right with heavy blur and settle. The "Amount" columns lift out of the tables (17.6-18.2) | True 3D: two overlapping panels, columns extruded forward | White/lavender with peach blush | White panels, navy text, orange BUMPER and navy DMS pills | UI micro text about 1 % H | S: push-through | Expo-out | Strong soft shadows, motion blur, DOF fall-off at the panel edges |
| 13 | 18.30-21.50 | 3.20 | Two column cards face-on, side by side, centred | Push-through (18.25-18.55, 9 f), then a slow push-in | The tables fall away defocused. Labels "BUMPER" and "DMS" drop on top (5 f). A mint fill wipes left to right across both columns with a feathered edge (20.37-20.50, 4 f) = matched | Foreground columns, defocused table ghosts | Light | White + mint #D4F4EC/#B4ECDC + orange/navy pills | Numbers about 2 % H | 4 f dissolve to white | Ease-out | DOF rack as the tables drop out. Soft drop shadows |
| 14 | 21.50-22.70 | 1.20 | Diagonal strips of transaction rows in steep perspective | Dolly along the rows (lateral, right to left) | Rows slide in diagonally from the top-right (21.63 onwards) | Steep 3D, layered rows | Light | White rows, navy text | Row text about 1.5 % H | Hard angle-change cut (22.67→22.70) | Linear travel | Motion blur along the travel, DOF on near and far rows |
| 15 | 22.70-23.85 | 1.15 | Face-on list of 5 reconciliation rows, centred | Pull-back (rows shrink and stack) | Status dots: "Reconciled" in green, one "Conflicts" in orange | Flat card stack | Light | White + green/orange dots | Micro text | S: fast tilt/whip down with vertical blur (23.80-23.88) | Ease-in-out | Vertical motion blur on the whip |
| 16 | 23.85-25.60 | 1.75 | Rate card on top, table below | Slow push-in | Counter 84→100 % (23.90-24.95, 32 f). The cursor flies in from the bottom (24.20-24.60) and parks by "%". A row-hover highlight sweeps | 2.5D: card above table, soft shadow | Light | Navy number, orange cursor | Number cap ≈6 % H | 1 f dip to black, then an empty navy frame | Expo-out count | 1-frame luma dip (reads as a glitch) |
| 17 | 25.60-27.57 | 1.97 | 2-line headline, centred | Slow pull-back with a scale snap at 26.13 | "Access reporting" types in per character (1-2 f per char, blur). "on one platform" (orange) types below | 2D | Navy | White + orange | Cap ≈8-9 % H. Baselines 14.8 % H apart | Hard cut | Linear typing | Glow |
| 18 | 27.57-29.97 | 2.40 | Dashboard close-up (macro), tilted | Slow drift, then a 2-3 f pull-back snap at 28.80, then a slow Y-rotation recede | Red, green and black lines draw left to right (27.63-28.50) at a 4-8 f stagger. The cursor flies in (27.77). Then the full dashboard: navy sidebar, orange/navy bar charts | 3D tilted screen, shallow DOF at the edges | Light | White UI, orange/navy bars | UI title about 1.5 % H | Hard cut | Ease-out | Shallow DOF, soft shadow, motion blur on the snap |
| 19 | 29.97-35.93 | 5.96 | Hero photo tile (woman in an orange puffer in a car), centre-right. Hex badges on an orbit ring | Push-in, then orbit steps at 30.9, 32.2 and 33.4 (each 9-12 f, motion-blurred) | Each badge rotates to the front, turns from grey to colour, and a status pill slides in. The caption types at the top | 3D ring around the photo: badges in front of and behind it | Light | Mint, yellow #ECDC9C, pink #E48494 + orange jacket | The caption is **clipped by the top frame edge** | Hard cut | Ease-in-out steps | Badge DOF, parallax of the ring vs the photo |
| 20 | 35.93-39.87 | 3.94 | Centred line | Slow pull-back with a snap | "Eliminate payment downtime" types per letter. Then it swaps to "with multiple providers" (multiple in orange) | 2D | Navy | White + orange | Cap ≈5 % H | Hard cut | Linear typing | Glow |
| 21 | 39.87-46.13 | 6.26 | Network: B hub disc with orbit rings and provider nodes | Continuous 3D orbit and drift (the hub travels from bottom-centre to centre-right) | A data pulse travels the link line. Provider 1 turns red (40.8), shrinks and recedes (41.6). Provider 2 arrives, turns red (42.5) and recedes (43.9). An arc sweeps round, then Provider 3 and the hub turn teal (45.0) | 3D space, concentric rings, DOF | Navy | Navy glass discs, red #EC243C, teal #34ACB4 | Node labels "1 Provider" about 3 % H | Hard cut on an onset (46.16) | Ease-in-out | Node glow, ring strokes, depth recession |
| 22 | 46.13-48.00 | 1.87 | "Kick", then the line "Kick your payments up a gear" | Pull-back: 3.9x→1x in 10 f | K-i-c-k pop up from below the baseline at a 2 f stagger. The remaining words slide in from the right. A soft violet chevron fades in at the left/right | 2D + large soft chevron shape | Navy | White + orange | Medium sans | Chevron shape-mask wipe (47.83-48.33) | Ease-in exit, ease-out wipe | Whip streak on the text exit. Feathered chevron edge |
| 23 | 48.00-50.97 | 2.97 | "This is payment unification", centred | Rides in on the wipe's momentum, then a slow pull-back | "This" and "is" ride in from the right with blur and DOF (48.17-48.50). "payment unification" (orange) builds | 2D | White with lavender/peach | Navy + orange | Cap ≈5 % H | Hard cut on an onset (50.97) | Ease-out | Defocus-to-focus on entry |
| 24 | 50.97-52.75 | 1.78 | Huge "like", then the line "like you've never seen it" | Pull-back: exponential, about 0.87x per frame for 13 f | Words slide in from the right with blur at a 4 f stagger | 2D | White/lavender | Navy | Medium sans | S: the line shrinks away and the ring appears | Expo-out | Motion blur |
| 25 | 52.75-56.67 | 3.92 | A ring of payment chips around the centre, then the B logo alone | Slow rotation, then a slow pull-back on the logo | Chips fly in one by one along arcs (about 4-6 f stagger) and the ring rotates clockwise. At 55.0 a small B grows in 8 f as the chips implode into it. An orange spark burst follows (55.27-55.6) | 3D ring, chip DOF | White/lavender with a peach blush | Multi-brand chips + orange B with a soft halo | None | Hard cut | Ease-out fly-in, ease-in implode | Particle sparks, glow halo, motion blur on the implosion |
| 26 | 56.67-61.47 | 4.80 | Supertitle at the top (y≈20 %) + giant word centre (y≈55 %) | Slow push-in on the hero word (PRO +8.9 % width in 33 f, 60.10-61.20, linear) | "Take payments like a" builds per letter, then moves up. Words swap every 11-16 f with escalating height: Boss (57.60) → Master (58.13) → Hero (58.63) → Champion (59.07) → Legend (59.43) → PRO (P 59.90, R 59.97, O 60.03) | 2D | Navy with a coral blob at the top right | White + orange #F4643C | PRO in a heavy rounded display face, cap ≈33 % H (≈355 px@1080) | Hard cut (PRO already sliding right) | Linear push | Heavy orange bloom on PRO |
| 27 | 61.47-67.20 | 5.73 | Wordmark at the top (cap ≈11 % H, 57 % W), QR card centre (48 % H), URL at the bottom | Static, slight drift | BUMPER letters appear right to left (R, E, P, M, U, B) at a 2 f stagger. The wordmark rises. The QR scales from a dot in 8 f, then an orange scan line sweeps across | Frosted glass QR card | Navy + coral glow | Lavender-white BUMPER, orange PRO | Heavy rounded display | End (audio fade 63.5-66) | Ease-out | Glass card border, glow |

Phase-2 attributes the table does not repeat per row:

- **Grain / texture:** n/a. A flat-patch check at 21.3, 37.7 and 65.0 s finds no designed grain: high-pass σ is 0.02-0.15 levels and frame-to-frame noise is 0.0-0.13 levels. The only texture is encode banding in the navy gradients.
- **Reflections:** only specular gloss. This covers the sheen pass on the B logo (#4), the glossy orange cursor (#8, #16, #18) and the frosted QR card edge (#27). n/a elsewhere.
- **Motion trails:** none designed. The streaks are native motion blur on fly-ins, whips and the chip implosion (#4, #5, #22, #25).
- **Angle:** type cards are straight-on. UI scenes are oblique 3D planes (#8, #12, #14, #18, #21) or face-on cards (#13, #15, #16). There is no camera roll.
- **Coverage:** rows run contiguously from 0.00 to 67.20 s, with no gaps or overlaps across 27 rows.

### WHY notes for the important shots

- **#1 Hook.** Frame 0 is already mid-motion: a 4x-oversized, smeared "Take". There is no fade-in and no logo. The eye gets a bold object and a verb within 33 ms. Building the sentence word by word at 300 ms per word makes the viewer read along. The sentence ends on an incomplete "like a…". This creates a cliff-hanger that the cut at 1.17 s pays off.
- **#2 Inverted match cut.** The text stays in exactly the same place while the world flips from white to navy. That continuity makes the cut feel like a "lights-out" reveal, not a scene change. The glitch decode on PRO says "tech product" without any UI.
- **#4 Logo plus chip ring.** The logo arrives as a drawn stroke, then a liquid fill, then a gloss sweep. Three micro-stages in 1.1 s make a flat glyph feel crafted. The chips orbiting in a DOF'd 3D ring visualise "every payment" literally, and the depth makes a flat icon set feel physical.
- **#8-9 Chart and toggle.** A single binary toggle (Without/With Pro) is the most legible way to show a cost saving. The tall violet "before" bar stays as a ghost, so the comparison is instant. The punch-in cut to the tooltip delivers the "why" (AI routing) as a second beat.
- **#12-13 Push-through.** The camera dives through the tables into the two "Amount" columns. This is the core story of reconciliation (two systems' numbers side by side) told by camera. It isolates the exact data that matters. The mint fill then shows "matched" with zero words.
- **#16 Counter.** 84 → 100 % with expo-out counting (84→95 in 0.27 s, then 95→100 in 0.77 s). The deceleration makes "100 %" feel earned and final. The cursor parking next to the number acts as an emphasis arrow.
- **#19 Orbit carousel.** One hero image stays as the pivot while the camera orbits to three badges. That gives three feature beats in 6 s without three cuts, so continuity reads as "one platform handles all of these".
- **#21 Failover network.** The narrative is told by colour states only: red, red, then teal. A non-technical viewer understands "if one provider fails, it reroutes" without labels.
- **#22-23 Chevron wipe.** The copy says "up a gear" and the transition is a gear-shift chevron. The motion device is motivated by the words. Incoming text rides the wipe's momentum, so the two scenes feel like one move.
- **#25 Implosion into the B.** This is the visual thesis "payment unification": every brand's chip collapses into one logo. The spark burst marks it as the climax.
- **#26 Word swap.** Rapid, escalating replacements are a comedic crescendo. They end on PRO in a new, heavier display face, which visually becomes the product name, and hand off directly to the lockup.

## 5. Frame-by-Frame Studies

### 5.1 Hook "Take" slam-down (0.00-0.30 s, zoom z01)
- Measured text width per frame (f0→f8, px at 640p): 891, 460, 364, 313, 280, 258, 242, 230, 220. Frame-to-frame ratio: 0.52, 0.79, 0.86, 0.89, 0.92, 0.94, 0.95, 0.96. This is a clean **exponential ease-out** (expo-out).
- About 64 % of the total width change happens in frame 1 and about 86 % within 3 frames (100 ms). After that, each frame removes about 35-40 % of the remaining delta, and the word settles by f8 (267 ms). The 0.52 figure is the f0→f1 width ratio, not the share of the change.
- f0-f1 show 3-4 ghost copies (multi-sample motion blur, shutter about 180° equivalent [inferred]).
- Word builds: "payments" enters at f9 (0.30 s) and settles at f16 (7 f, 233 ms). "like" enters at f19 and settles at f23 (5 f). "a" enters at f26 and settles at f29 (4 f). Word-start interval: 10 f, 10 f, 7 f. The cadence accelerates.
- Words enter from the right with horizontal motion blur and a defocus that clears over 4-5 f. "like a" is rendered in a lighter lavender-grey, a hierarchy cue.
- f30-f34: the whole line slowly shrinks (about 1 %/f linear), then a hard cut at f35 (1.167 s).
- Why it works: an object in motion on frame 0 removes any "loading" feel. The expo-out lands the word fast, then it calms.

### 5.2 "PRO" glitch decode across the inverted cut (1.10-2.43 s, z02)
- The cut at 1.167 keeps "Take payments like a" at an identical size and position. Only the colours invert (navy-on-white becomes white-on-navy).
- "PRO" shows scrambled outline glyphs with RGB fringing for 3 f (1.167-1.233). "RO" turns solid orange at 1.267, while the "P" stays an outlined glyph until it fills at about 1.50 s. Decode total is about 10 f (333 ms).
- Hold and slow pull-back from 1.50 to 2.37 s: the line width drops 170 → 115 (of 300) in 26 f, about 1.5 %/f, nearly linear.
- The cut to "One" has **one empty navy breath frame** (2.40).

### 5.3 "One": per-letter blur-in and a two-phase pull-back (2.35-3.75 s, z03)
- Letters O (f3), n (f7) and e (f11) arrive at a **4-frame (133 ms) stagger**. Each goes from about 40 % opacity and heavy blur to sharp in 3-4 f. The word recentres as letters are added.
- Measured height: 273 → 154 px over 16 f (-3.5 %/f decaying to -1.5 %/f, ease-out). Then it accelerates (146→92 px over 6 f, about -10 %/f) as "p" is typed. This is a "breathing" camera: drift, then snap.
- At 3.58 the line moves up and "Every" (orange) appears beneath. At 3.62 the orange B outline begins to stroke-draw above.

### 5.4 Logo build and chip orbit (3.70-7.17 s, z07)
- Stroke draw: 3.62-3.80 (about 5 f). Fill grows from a dot at the bottom of the glyph: dot (3.83), half-disc (3.90), blob (3.97), full B (4.10). That is 8 f, ease-out.
- A pink-white gloss sheen sweeps across the B from 4.23 to 4.70 (14 f).
- Chips fly in from off-frame along curved arcs with heavy blur, 4.97-5.70 (22 f). They settle into an arc ring with **DOF**: near chips are soft, ring-plane chips are sharp. The ring rotates clockwise slowly, 5.7-6.9.
- Exit: the whole group scales to about 50 % and dims over 8 f (6.90-7.17, ease-in), then a hard cut.

### 5.5 "Save thousands" with the $-scramble (7.15-9.55 s, z08)
- "Save" height per frame: 300, 254, 229, 211, 196, 185, 175, 167, 159, 149, 137, 123, 111, 104. The first 7 f ease out (-15 %, -10 %, -8 %…), then it **re-accelerates** (-6 %, -8 %, -10 %, -10 %) into a cut-step that drops the scale a further 0.4x. This is a double-ease snap.
- "thousands" types as "thou$$$$$". The trailing placeholders are dollar signs that resolve into letters over 12 f (7.68-8.08). It is a scramble-decode whose glyph set is semantic (money).
- Exit: at 8.55-8.62 the line smears left in 2 f (whip). A hard cut to "with" follows at 8.70.
- "intelligent" (orange) slides from the right in about 4 f. At 9.28-9.48 there is a whole-line scale snap (about 3 f, blurred), and "payment routing" enters from the right at a 2 f stagger.

### 5.6 "Automatically": self-assembling letters (14.30-15.97 s, z10)
- The hard cut is at **14.333**. The detector had 14.63, 9 frames late.
- Letters appear at a 1-2 f stagger, each at a random vertical offset of up to ±0.5 cap height ("Autom" low, "a" high, "t" low, "ic" high…).
- Over 20 f they settle onto the baseline. Two deliberately stray "a" glyphs hover until 14.97 and 15.37, then snap in. This is the metaphor of data reconciling itself.
- At 15.37: scale snap to 0.45x. "reconcile" (white) enters from the bottom-left (4 f) and "transactions" from the bottom-right (4 f), both with blur.

### 5.7 Tables fly-in and push-through (16.60-18.85 s, z05 + z18)
- At 16.73 the text defocuses for 1 f. The hard cut at 16.767 is **on an onset (16.76)**.
- The tables enter from the bottom-right at about 35° Y / 20° X tilt [inferred], with heavy blur, settling 16.77-17.17 (12 f, expo-out). The perspective then slowly flattens.
- 17.6-18.2: the "Amount" columns extrude forward out of the tables.
- 18.25-18.55 (9 f): the camera pushes through. The tables blur and drop back while the columns stay sharp and rotate face-on.
- 18.58-18.75: the "BUMPER" (orange #F4643C) and "DMS" (navy #04044C) pills drop onto the column tops in 5 f.
- Mint fill wipe across both columns, left to right with a feathered leading edge: 20.37-20.50 (4 f).
- Exit: a 4 f opacity-and-blur dissolve to white (21.43-21.55). Then the rows travel diagonally (dolly).
- At 22.67→22.70 there is a 1-frame **angle-change cut** from the steep diagonal rows to a face-on list. It is a hard cut, not the seamless move the detector reported.

### 5.8 Reconciliation counter (22.90-25.70 s, z12, 20 fps)
- 22.9-23.75: the list pulls back with ease-in-out (rows shrink and stack). 23.80-23.88: a fast vertical whip (vertical blur) re-frames to the rate card.
- Counter values by time (re-measured frame by frame): 84 (23.90), 87 (23.93), 89 (23.97), 90 (24.00), 92 (24.03), 93 (24.07), 94 (24.13), 95 (24.17), 96 (24.23), 97 (24.30), 98 (24.40), 99 (24.63), 100 (24.93). That is 31 f in total. The first 11 points take 8 f (0.27 s) and the last 5 take 23 f (0.77 s), so the count is expo-out.
- The orange cursor rises from the bottom 24.20-24.60 (12 f, ease-out) and parks to the right of "%". A light purple row-highlight sweeps across the table.
- Exit at 25.60: one frame with a black background and a desaturated card (a dip to black), one empty navy frame, then "Acc" blurs in. The 1-frame dip reads as a glitch rather than a design choice.

### 5.9 Dashboard draw-on and pull-back (27.50-30.00 s, z13)
- Hard cut into a tilted macro view of a chart card with shallow DOF.
- The red line draws first (27.63), then green (+8 f) and black (+4 f). All complete by 28.50 (26 f, linear-ish).
- The cursor flies in from the bottom-right (27.77-28.0).
- 28.77-28.83: a 2-3 f pull-back snap with blur reveals the full dashboard. 28.9-29.95: the dashboard yaws slowly away (increasing Y-rotation) and recedes. Hard cut.

### 5.10 Chevron shape-mask wipe (47.60-48.67 s, z04)
- A large soft violet chevron is already present at the right edge from about 46.9 (pre-loaded motif).
- Text exit: from 47.83 the line accelerates left (ease-in). It becomes a horizontal light streak by 47.93-47.97 and leaves the frame by 48.07. That is 7 f (233 ms).
- Mask wipe: a double chevron (">>") sweeps right to left and reveals the white/lavender world behind it. The light boundary enters at the right edge at 47.97-48.00 and reaches the left edge at about 48.37-48.40, so about 12 f (400 ms). The dark chevron tip leaves the left edge at 48.33. It is **ease-out**. The boundary moves about 185 px/f at first and about 30-35 px/f at the end, and the frame is 50 % light by 48.10 (4 f in). A soft periwinkle feathered band trails at the left edge until about 48.6.
- Incoming text rides the same direction: "This" 48.17-48.40 (7 f) and "is" 48.37-48.50. Both are defocused and resolve sharp by 48.50.
- Total from first exit motion to a clean frame: about 20 f (667 ms). The wipe start (47.97) sits on an onset.

### 5.11 Chips orbit and implosion into the logo (53.00-56.80 s, z16)
- Chips enter one at a time along arcs: Apple Pay, then Amex, GPay, Mastercard and Visa, at about a 4-6 f (@15 fps, 270-400 ms) stagger. They settle on a faint circular guide ring that rotates clockwise.
- 55.00-55.27 (8 f): a small B appears at the centre and grows while the chips collapse inward into it with blur.
- 55.27-55.60 (10 f): about 12 orange spark particles burst radially and fade. A soft circular halo appears behind the B.
- 55.6-56.6: slow pull-back on the logo (ease-in-out). Hard cut to navy "T" at 56.67.

### 5.12 Finale word swap and PRO hero (56.60-61.47 s, z17)
- "Take payments like a" builds letter by letter (56.68-57.43) and rises to y≈20 %.
- Swap times (first frame of each word): Boss 57.60, Master 58.13, Hero 58.63, Champion 59.07, Legend 59.43, PRO 59.90. Intervals are 16, 15, 13, 11 and 14 f, so the cadence tightens toward Legend. Boss lands on the 57.60 beat.
- Boss rises in from below with blur (57.60-57.70). Master, Hero, Champion and Legend are hard swaps with a 2-3 f blur-in and no exit animation, and each drifts upward slowly, about 0.2 %H per frame. PRO is different: it types in per letter, P (59.90), R (59.97) and O (60.03), at a 2 f stagger.
- The size crescendo is in height. Orange bboxes (including glow edges and descenders) measure 10 → 13 → 18 → 27 → 34 → 33 % H. Widths go 17 → 32 → 30 → 74 → 67 → 47 % W, so Champion is the widest word and PRO is narrower but the tallest caps.
- PRO switches to the heavy rounded display face. Its width grows linearly by 8.9 % over 33 f (531→578 px, 60.10-61.20, about 8 %/s push-in). From 61.3 it slides right as the supertitle fades.

### 5.13 Lockup (61.40-62.60 s, z06)
- PRO slides right 1 f before the cut. After the hard cut (61.467), "BUMPER" is revealed **right to left**, R, E, P, M, U, B, at a 2 f stagger (61.47-61.80, 10 f). Each letter blurs in. The group recentres as letters are added.
- Hold: 14 f.
- The wordmark rises and the QR code scales from a 1 px dot to full size in 8 f (62.27-62.53, ease-out). An orange scan line sweeps the QR (62.43-62.60).
- Static hold until 67.2. The audio fades from about 63.5 to 66 s.

## 6. Motion Language observed

| Pattern | Where | Speed | Ease | Read |
|---|---|---|---|---|
| Oversize slam-down of a hero word (3-4x → 1x) | 0.0, 2.45, 7.2, 46.13, 50.97 | 8-13 f | Expo-out (frame 1 removes about 64 % of the delta, then about 35-40 % of what remains per frame) | Premium-energetic. It is the film's signature. |
| Word-by-word line build, words sliding from the right with blur | Every type card | 4-7 f per word, 7-10 f apart (fast cards 2-4 f apart) | Ease-out | Reads as speech rhythm without a VO |
| Continuous pull-back on type (line shrinks while building) | Every type card | 1-3.5 %/f, then snaps of about -10 %/f | Drift ease-out + snap ease-in-out | Gives the type a sense of camera depth |
| Per-letter blur-in | "One", "Access…", "Eliminate…", "BUMPER" | 1-4 f per letter | Blur→sharp | Polished, soft "focus pulling" |
| Semantic letter animation ($-scramble, self-assembling letters, kick bounce) | 7.68, 14.33, 46.13 | 12-30 f | Per-letter ease-out | The best idea in the film: the motion acts out the word |
| Glitch/scramble decode | PRO at 1.17 | about 10 f | Stepwise | Tech flavour. Used once, so it doesn't feel cheap. |
| 3D fly-in of UI planes with motion blur | Tables 16.77, chips 4.97, chart 11.00 | 12-22 f | Expo-out | Weighty, rendered feel |
| State change by colour fill | Mint columns 20.37 (left→right), badges 31.0-33.6, providers red/teal | 4-5 f fills | Linear wipe | Explains without words |
| Data counting | 84→100 % | 31 f | Expo-out | Satisfying arrival |
| Line-chart draw-on | 27.63-28.50 | 26 f | Linear, staggered 4-8 f | Standard dashboard proof |
| Orbit / carousel around a pivot | Chip ring, badges, providers, merge ring | 9-12 f steps, slow drift between | Ease-in-out | Continuity, "one platform" metaphor |
| Implode/merge plus particle burst | 55.0-55.6 | 8 f + 10 f | Ease-in → burst out | Climax punctuation |
| Escalating word swap | 57.60-59.90 | 11-16 f per word | Hard swap + 2-3 f blur-in (PRO per letter at a 2 f stagger) | Comedic crescendo |

There is **no overshoot or elastic bounce** anywhere. Every settle is a critically damped expo-out. Combined with directional motion blur, this is the main reason the film reads premium rather than "template-y".

## 7. Camera Language observed

- **Virtual pull-back on type** (dominant): about 12 occurrences. A slow scale-down drift of 1-3.5 %/f punctuated by a fast "snap" zoom-out (3 f, about 40 %) whenever the line needs more room.
- **Push-through a UI layer** (18.25-18.55, 9 f). It moves forward through foreground tables into extracted elements, with DOF rack as the tables pass.
- **Punch-in cut** (13.13). A hard cut from the wide chart to a close tooltip, the same scene at about 2.5x magnification.
- **Angle-change cut** (22.70). From a steep 3D perspective straight to face-on.
- **Dolly / travel along rows** (21.6-22.7). Lateral camera travel along diagonal 3D strips.
- **Whip tilt** (23.80-23.88) and **whip-smear exits** of text (8.55, 47.83).
- **Orbit** around a hero subject (29.97-35.93), in 9-12 f eased steps at about 1.25 s intervals (about 2 beats at 100 BPM).
- **Drift-orbit in 3D space** (39.87-46.13). The hub travels across the frame while nodes recede in depth.
- **Pull-back reveal** (28.80). A macro chart detail opens to the full dashboard in 2-3 f.
- **Slow linear push-in** on the final hero word (PRO, +8.9 % in 1.1 s).
- **Yaw recede** (dashboard 28.9-29.95). The screen rotates away as a soft exit.

The camera is **never static on UI**. It is always drifting at a low speed (estimated 1-3 % of the frame per second) between the fast beats. Focal feel is mid-telephoto [inferred] for UI: flattened perspective with shallow DOF at the panel edges.

## 8. Typography

- **Families.**
  - Copy uses one geometric-grotesk sans with a double-storey "a" and a single-storey "g" (Satoshi/General Sans/Manrope family [inferred]).
  - Weights: medium (about 500) for phrase lines, semibold (about 600) for hero single words.
  - The brand display face is heavy and rounded, about 900 weight with soft corners ("PRO", "BUMPER").
- **Case:** sentence case for all copy and all-caps for the wordmark.
- **Tracking:** about default for lines and slightly tight on hero words (-1 to -2 % [inferred]).
- **Alignment:** always centred, at optical centre (y≈47-52 %). The finale uses a supertitle at y≈20 % above a giant word at y≈55 %. The lockup puts the wordmark at y≈18 %.
- **Sizes** (cap height as % of frame height, then px at 1080p):

| Role | Example | Cap % H | 1080p cap px | Font size @1080p (≈cap/0.7) |
|---|---|---|---|---|
| Hero single word (settled) | "One", "Save" | 15-23 % | 160-250 | 230-360 |
| Final hero word | "PRO" | about 33 % (32-34 %, P stem 241-451 px at 61.0 s) | about 355 | about 505 |
| Wordmark | "BUMPER PRO" (57 % W) | about 11 % | about 120 | about 170 |
| Two-line headline | "Access reporting / on one platform" | 8-9 % | 90-97 | about 130 |
| Hook line (when complete) | "Take payments like a" | about 8.5 % (then shrinks) | about 92 | about 130 |
| Supertitle / phrase line | "with intelligent payment routing" | 4.5-5.5 % | 49-60 | 70-85 |
| UI numbers / labels | Amount values, rate card | 1.3-6 % | 14-65 | n/a |
| URL | "bumper.co" | about 2.2 % | about 24 | about 34 |

- **Leading:** baseline-to-baseline 14.8 % H for a cap of 8.5-9 %, about 1.1x the font size (tight).
- **Colour hierarchy within a line:**
  - On navy: white/lavender for neutral words and orange (#E46C54 small, #F4643C large) for the benefit word ("intelligent", "on one platform", "your payments up", "multiple", "payment unification", "PRO").
  - On white: navy #04043C, with function words ("like a") in lighter lavender-grey.
- **Reveal types:**
  - oversize slam-down (5x)
  - word slide-in from the right with blur (about 10 cards)
  - per-letter blur-in typing (4x)
  - glitch decode (1x)
  - $-scramble (1x)
  - self-assembling letters (1x)
  - bounce-up letters (1x)
  - hard word swap (6 words)
  - right-to-left letter reveal (wordmark)
- **Max words on screen:** 6 ("Kick your payments up a gear"). Typical is 2-4 at once. Reveals are always 1 word at a time.
- **Readability in motion:** every line holds fully legible for 0.6-1.6 s before exiting. Text is never moving fast while it needs to be read. Fast moves happen only during entrance (first 4-8 f) or exit.
- **Text-camera interaction:** the line rescales and recentres continuously, as if the camera were pulling back. Text exits by whip-smear, defocus, or riding into a wipe.

## 9. UI Animation observed

- **UI is flat product art rendered as 3D planes.** It has soft shadows, rounded 16-24 px corners [inferred], a white surface on a lavender ground, and orange and navy only as accents. It is never shown in a browser chrome or device frame.
- **One custom brand cursor.** A glossy orange 3D arrowhead with a soft shadow. It flies in with motion blur in about 12 f, parks, and "clicks" (chart toggle, rate card, chart line). This makes interactions feel human without a literal mouse pointer.
- **Toggle microinteraction:** "Without Pro → With Pro" pill, knob slides in about 4 f, and the chart reacts in the next 6-8 f (cause then effect).
- **Isolation by extraction:** the relevant column lifts out of the table, then the camera pushes into it. Context comes first, then focus.
- **Status colour language:** mint = reconciled/processed, yellow = chargeback, pink/red = fraud or failure, teal = success. A green dot means "Reconciled" and an orange dot means "Conflicts".
- **Data realism:** merchant IDs, July 2025 dates, Visa/Mastercard, GBP amounts and believable decimals (108.50, 92.40). The data looks real, so it never reads as lorem ipsum.
- **Dashboards:** shown macro first (one chart drawing), then pulled back to the whole screen. Detail before context, the inverse of the table scene.
- **Speech-bubble tooltip** with a sparkle icon for the AI claim. The AI is explained as a callout on the data, not as a separate scene.
- **The network diagram is abstract UI.** Glass discs, ring guides and a travelling pulse dot on the link line show data flow.
- **Weakness:** the UI micro-text is about 1 % H (about 11 px at 1080p) and illegible at the 640p delivery. Legibility relies on shape and colour, not reading.

## 10. Transitions observed

| Type | Where | Duration | Mechanics | Sound [inferred] |
|---|---|---|---|---|
| Hard cut with breath frame | 2.40, 25.63, 35.93 | 1 empty bg frame | The previous text exits, 1 f of empty gradient, then new text blurs in | Kick/impact on the hit |
| Inverted match cut | 1.17 | 0 f | Same text, same position, colours inverted (white→navy) | Drop/whoosh |
| Defocus-out → cut | 10.97, 16.73 | 1-2 f blur + cut | Text loses focus just before the cut | none |
| Whip-smear exit → cut | 8.55, 47.83 | 2-7 f | Text accelerates sideways into a streak | Whoosh |
| Scale snap (in-shot "cut") | 3.05, 9.35, 15.37, 26.13, about 36.5 [inferred] | 3 f | Fast zoom-out with blur, about 40-55 % scale step | Tick/whoosh |
| Chevron shape-mask wipe | 47.83-48.50 | about 20 f total (wipe about 12 f, 47.97-48.37) | Ease-in exit + ease-out chevron mask, dark→light, incoming text rides the momentum | On an onset |
| Push-through | 18.25-18.55 | 9 f | Camera moves forward through UI, foreground blurs away | Whoosh |
| Punch-in cut | 13.13 | 0 f | Same scene, about 2.5x tighter | Click |
| Angle-change cut | 22.70 | 0 f | Steep perspective → face-on | none |
| Dissolve to white | 21.43-21.55 | 4 f | Opacity + blur to an empty light frame | none |
| Dip to black | 25.60 | 1 f | One near-black frame between light and navy | Reads as a glitch |
| Orbit step | 30.9, 32.2, 33.4 | 9-12 f | Camera orbits a pivot so the next element comes forward | Soft swish |
| Implode/merge | 55.0-55.6 | 18 f | Chips collapse into the logo + particle burst | Riser → hit [inferred] |
| Scale-down recede → cut | 6.9-7.2, 52.5-52.75 | 8 f | Group shrinks and dims, then a cut | none |
| Callback bookend | 56.67 | n/a | Restates the hook line for the finale | n/a |

Counts:

- **18 hard cuts.** These include the corrected 11.00, 13.13, 14.33 and 22.70. The detector's 0.03 (a ghosted "Take" frame) and 48.03 (the wipe) are not cuts.
- **8 seamless shot boundaries:** 3.67, 9.63, 15.37, 18.30, 21.50, 23.85, 48.00 (the wipe) and 52.75. The 28.80 pull-back snap is an in-shot beat inside #18. That gives 18 + 8 = 26 boundaries and 27 shots.
- **Light/dark flips:** 7, at 1.17, 16.77, 25.60, 27.57, 35.93, 48.00 and 56.67.

## 11. Editing Rhythm

- **Corrected shots:** 27. ASL **2.49 s**, median **1.78 s**. Shortest is 0.93 s (#6), longest 6.26 s (#21). Cuts per minute: 16.1 (hard cuts only). Shot changes per minute: 23.2 (26 boundaries).
- **Fast sections:**
  - Hook 0-3.67 (motion mean 5.19, 3 shots)
  - Reporting 25.6-29.97 (6.28, the highest)
  - Finale 56.67-61.47 (4.09, plus 6 word swaps in 2.3 s)
- **Slow sections:**
  - Platform logo 3.67-7.2 (1.66)
  - Uptime network 35.93-46.13 (1.82, two shots of 3.9 s and 6.3 s)
  - Lockup 61.47-67.2 (1.33)
- **Breathing pattern:** claim cards are 1-2 s each, cut fast. Proof shots are 2-6 s and rely on in-shot camera beats (snaps, push-throughs, orbit steps) every 0.8-1.5 s instead of cuts. Something changes about every 1.0-1.5 s even in long shots.
- **Hero moments:** PRO reveal (1.17-1.50), logo draw (3.62-4.10), 100 % (24.93), chevron wipe (47.97), B implosion (55.0-55.6), PRO final (59.90).
- **Beat sync (re-measured, see Verification):** the music sits on an exact 100.0 BPM grid. Sub-150 Hz kicks fall every 1.200 s from the kick on frame 0 (rise points 0.03, 1.24, 2.43, 3.64, 4.83, 7.24 … 57.64 s). Against the quarter-note grid t = 0.6k s:
  - **11 of 18 hard cuts land 0-2 f before a beat:** 1.17, 2.40, 7.20, 13.13, 14.33, 16.77, 27.57, 29.97, 35.93, 46.13 and 50.97. 22.70 is 3 f early. Chance for a 3 f window is about 17 %, and the binomial p is below 0.001.
  - **4 of the other 7 sit within 1 f of an eighth-note off-beat:** 8.70, 39.87, 56.67 (on a syncopated kick at about 56.70) and 61.47. The rest are 11.00 (-3 f) and 25.60 (+3 f), which falls in the breakdown.
  - **In-shot beats also hit the grid:** the logo stroke (3.62), the "payment routing" snap (9.63), the dashboard pull-back snap (28.80), the wipe (47.97-48.00), the merge ring (52.75) and "Boss" (57.60).
  - So the edit is **beat-locked, with the picture leading the beat by 0-2 f**. The earlier "copy-driven" reading came from the `analysis.json` onset list. That list misses the intro kicks before 3.55 s and the low-passed kicks at 25-38 s, and its timestamps run about 2 f early. Measured against it, only 4 of 17 detected cuts (16.77, 46.13, 48.03, 50.97) and 5 of the 26 corrected boundaries fall within ±2 f.
- Word reveal cadence of 7-10 f (233-333 ms) is about an eighth note at 100 BPM (300 ms). The orbit steps at about 1.25 s are about 2 beats.
- **Acceleration:** the climax (46-57 s) has 4 changes in 10.5 s plus a wipe. The finale (56.67-61.47) puts 6 words in 2.30 s (57.60-59.90, one every 0.46 s), the fastest moment, before a 5.7 s still lockup. That is a classic crescendo then rest.

## 12. Sound Design

- **Measured:**
  - LUFS -14.1, a streaming-normalised, moderate level.
  - BPM about 99-100. Onset autocorrelation peaks at 98.7-101.4, with 50 = half time and 197 = double time. The kick grid measures exactly 100.0 BPM: 1.200 s per kick pair from 0.03 to 57.64 s.
  - 93 onsets, median interval 0.44 s.
- **No clear voice-over.** Speech likelihood averages 0.42 and peaks at 0.65, with no sustained speech. The typography is the narrator. A rhythmic 4-6 Hz modulation (0.16-0.45 ratio) is consistent with music, not speech [inferred].
- **Spectral shape:** sub-bass dominant, with 55-80 % of energy below 120 Hz across the film. It is a bass-heavy modern electronic/hip-hop-leaning bed [inferred].
- **Structure:**
  - 0-4.8 s: sparse intro. A sub-bass kick hits every 1.2 s, at 0.0, 1.2, 2.4 and 3.6 s. Each peaks at about -13.5 dB in 100 ms windows, with near-silence (-22 to -30 dB, no sub) between hits. The `analysis.json` onset list misses the first three. The hook cut (1.17), the "One" cut (2.40) and the logo stroke (3.62) each land on one of these kicks.
  - 4.8 s: the full groove enters on the next kick, with continuous -12 to -19 dB. That is 5 f before the chips fly in (4.97) and after the logo fill (4.10).
  - 4.8-25 s: steady groove (about -17 to -18 dB, centroid 440-630 Hz).
  - 24-32 s: **low-pass breakdown**. Centroid falls to 255-286 Hz and sub is 73-80 %. The onset list is empty from 25.08 to 32.37 and from 32.81 to 38.36, but a sub-150 Hz check still finds kicks (26.4, 28.8, 30.5, 31.2, 33.6, 34.8, 36.0, 37.2). So it is a filtered breakdown, not a drop-out. This happens under the reporting/dashboard and refunds sections, where the eye has the most to read.
  - 32-60 s: long build. Hi-band energy rises 3.4 % → 6.2 % and the centroid rises 749 → 1114 Hz toward the PRO finale.
  - 63.5-67 s: fade-out (-25 dB → -77 dB).
- **Implied SFX** [inferred, cannot be isolated with this tooling]: whooshes on the whip exits and wipe, ticks or clicks on the cursor and toggle, a hit on the B implosion. The onset density suggests percussive accents, not a dense SFX layer.
- **Takeaway:** music provides energy and an arc (sparse kick intro under the hook → groove in under the chip fly-in → breakdown under dense UI → build into the finale → fade on the CTA). Copy decides the order of events, and the 100 BPM grid decides where each cut lands, 0-2 f ahead of the beat.

## 13. Visual Quality

**What makes it premium**

- A strict three-colour system: navy #04044C/#020047, white #FCFCFC, orange #F4643C. Secondary status colours appear only inside UI.
- Glow and bloom on type on dark, plus large soft gradient blobs, give it a "lit" look rather than flat vector art.
- Universal directional motion blur and critically damped expo-out settles. There is no bounce or wobble.
- Real 3D depth in the UI scenes: perspective planes, DOF on foreground and background, soft contact shadows, parallax between layers.
- Ideas are visualised, not decorated: dollar-sign scramble, self-reconciling letters, a chevron for "up a gear", chips imploding into the logo, failover colours.
- Data realism in the UI. Consistent cursor and orbit-ring motifs.

**Flaws**

1. The caption "Streamline refunds and chargebacks / and reduce fraud" is **clipped by the top frame edge** for 5 s (30.9-35.9).
2. A 1-frame **dip to black** at 25.60 looks like a render glitch.
3. UI micro-text and the chart axis labels are illegible at 640p, and the violet glass bars on navy have low contrast (11-14 s).
4. Heavy bloom on oversize white words (for example "Save" at 7.2) muddies the letter edges for the first 3-4 f.
5. Repetitive type grammar (slam → build → pull-back about 12 times) risks monotony in the middle third.
6. The single lifestyle photo (29.97-35.93) is the only human element. It feels like a stock insert with no continuity to the rest.
7. The 6.3 s network shot drops energy (motion mean 1.82) at the midpoint.

## 14. Style Category

**Kinetic-Type SaaS Launch (Fast Startup Launch × Minimal Premium SaaS)** with **2.5D/3D UI proof inserts**. It could be called the **"Night claim / Day proof"** split-world style: a dark glowing type world for promises and a bright 3D UI world for evidence. The duration of 60-70 s suits a homepage hero or launch post. It fits fintech, payments, B2B ops and any product whose value is "unify / automate".

## 15. Transferable Rules (concrete, numeric)

1. **Start in motion on frame 0.** The first hero word should already be at 3-4x scale with motion blur and land via expo-out: about 65 % of the delta in frame 1, about 85 % by frame 3, settled by frames 8-10.
2. **Build lines one word at a time.** Words start 7-10 f apart (233-333 ms, about an eighth note at 90-110 BPM). Each enters from the right in 4-7 f with horizontal motion blur and defocus. Keep the line centred, and let the camera pull back as words accumulate. Drift at 1-3.5 %/f, then snap about 40-55 % in 3 f when more room is needed.
3. **Use one accent colour for the benefit word in every line.** Here it is #F4643C or #E46C54 on navy, with neutral words in white or lavender. Lower the opacity of function words ("like a") to about 60 %.
4. **Alternate dark claim cards (1-2 s) with light proof shots (2-6 s).** The background world signals whether the viewer should read or watch.
5. **Animate the meaning of the word at least 3 times per film.** For example a currency scramble for "thousands", self-assembling letters for "automatically", bounce letters for "kick", or a chevron wipe for "up a gear". Keep each to 9-30 f.
6. **Never use overshoot for premium SaaS type or UI.** Settles are critically damped expo-out. Exits are ease-in with motion blur (2-7 f).
7. **For UI, give context, then extraction, then focus.** Show the whole table, lift the relevant column 0.5 s, push the camera through in about 9 f, then show the state change with a 5 f colour fill.
8. **Counters run about 1 s with expo-out.** Cover 70 % of the range in the first 25 % of the time. Park a cursor or highlight on the final value.
9. **Keep one custom cursor consistent across all UI scenes.** Use the brand colour and a soft shadow. Fly in for about 12 f, then park. Each "click" should trigger a visible reaction within 6-8 f.
10. **Explain system behaviour with colour states only** (fail red #EC243C, success teal #34ACB4, matched mint #D4F4EC), not labels.
11. **A shape-mask wipe needs a motivated shape.** Pre-load the shape about 1 s before. Exit with ease-in for about 7 f, wipe with ease-out for about 12 f, and have incoming elements ride the same direction. The total is 18-22 f.
12. **A long proof shot (more than 3 s) needs an in-shot camera beat every 0.8-1.5 s** (snap, orbit step, push-through, punch-in cut).
13. **The climax collapses the "many" into the logo.** The implosion takes about 8 f, followed by a 10 f particle burst of no more than 12 particles and a soft halo.
14. **Bookend the film:** repeat the hook line in the finale, escalate with a word swap every 11-16 f with growing size, and land on the product name in the display face, typed in per letter at a 2 f stagger.
15. **Lockup:** reveal the wordmark letters at a 2 f stagger (direction toward the product word), hold 14 f, then reveal the CTA (QR/URL) with an 8 f scale-up. Hold the end card at least 4 s while the music fades.
16. **Type sizes at 1080p:**
    - hero word cap 160-355 px
    - two-line headline cap about 95 px with 1.1x leading
    - phrase line cap about 50-60 px
    - URL about 24 px cap
    - no more than 6 words on screen, with 0.6-1.6 s of fully legible hold
17. **Lock the edit to the tempo grid, 0-2 f ahead of the beat.** Here 11 of 18 cuts sit on 100 BPM quarter notes. Cut the hook on the sparse intro kicks (every 1.2 s), and land the logo stroke on a kick. Bring the full groove in just before the first big graphic move (the chip fly-in). Put a low-pass breakdown under the densest UI section and build into the finale.

## 16. What to Avoid (as observed here)

- **Text touching or clipped by the frame edge.** Keep captions at least 5 % H inside the title-safe area.
- **Single-frame dips to black** between light and dark scenes. Use a 2-4 f luma dip or a clean cut instead.
- **UI micro-text below about 2 % H** if the viewer must read it. Either make it decorative on purpose or scale up the one value that matters (the film does this right with "100 %").
- **Low-contrast glass bars on navy** (violet on #06004E). Give data marks at least 3:1 contrast against the background.
- **Bloom so strong that letter edges smear** at large sizes. Cap the glow radius at about 2-3 % of cap height.
- **Repeating the same type-reveal grammar more than about 6 times** without variation. Swap in the semantic variants.
- **Long low-energy diagram holds of more than 5 s** without a narrative beat. Here the 6.3 s network shot has beats at 0.8-1.4 s intervals, but slow camera drift between them.
- **A one-off stock lifestyle photo** that has no visual continuity with the rest of the system.
- **Cutting late on the beat.** This film's on-grid cuts land 0-2 f before the beat, never after it. A cut that trails the kick reads as sluggish [inferred].

## Verification

An independent re-measurement on 2026-10-07 used:

- frame-exact decodes of native 1138x640 frames, checked against an `n`-select decode
- a whole-film per-frame difference trace (284x160)
- per-frame ink and orange bounding boxes
- column-luma traces of the wipe boundary
- 30 fps zoom sheets (`zoom/v01`-`v09`)
- 100 ms RMS and sub-120 Hz share, plus a 5 ms sub-150 Hz kick envelope from `zoom/a.wav`

The edits above are already applied.

| # | Claim checked | Result | Change made |
|---|---|---|---|
| 1 | Hook "Take" slam: 891→220 px in 8 f, expo-out, "52 % in frame 1, about 90 % in 3 f"; word starts f9/f19/f26 | **The curve is confirmed** (863, 458, 363, 313, 280, 259, 243, 231, 221 px, which is 3.9-4.05x depending on threshold). Word entries are confirmed ("payments" f8-9, "like" f19, "a" f26). **The share is wrong:** frame 1 removes about 64 % of the delta (0.52 is the width ratio) and 3 f remove about 86 %. | Fixed 5.1, the motion table and rule 1. |
| 2 | Inverted match cut at 1.167 and PRO decode in 9 f (1.17-1.47) | **The cut is confirmed** at f35 (diff 179, luma 223→46), with the same text position. The decode runs **about 10 f**: "RO" is solid at 1.267, but the "P" stays an outline until about 1.50. The empty breath frame at 2.400 is confirmed. | Fixed shot 2, 5.2, the motion table and hero moments. |
| 3 | Corrected cut list (13.13, 14.33, 22.70), stage boundaries and shot-table coverage | **The cuts are confirmed** by frame diff: 13.133 (11.6 vs about 0.4 baseline), 14.333 (18.3), 22.700 (10.0). Every stage boundary sits on a measured cut. **11.03 is wrong.** The cut is at 11.000 (f330), and the 13.12/13.13 rows left a 1-frame gap. The intro claimed "9 seamless" changes including 28.80, but the table has 8 seamless boundaries (28.80 is in-shot). Light/dark flips are 7, not 9. Shot changes per minute are 23.2, not 24. | Fixed shots 7-8, the corrections list, the counts, the rhythm stats and the flip count. ASL 2.49 and median 1.78 are unchanged. |
| 4 | Counter 84→100 % at 23.90-24.95 (32 f), expo-out | **Confirmed within 1 f:** 84 at 23.90, 95 at 24.17 and 100 at 24.93 (31 f). The cursor rise, the 1-frame black dip at 25.600 and the empty navy frame at 25.633 are confirmed. | Updated 5.8, the WHY note and the motion table. |
| 5 | Chevron wipe 47.97-48.30, 10 f, ease-out with about 60 % in 3 f; text exit 47.83-48.07; "This"/"is" ride-in | **Partly wrong.** The light boundary runs from the right edge at 47.97-48.00 to the left edge at about 48.37-48.40, so **about 12 f**. Per-frame travel is 187, 184, 156, 125, 100, 82, 68, 51 … px (ease-out confirmed), and the frame is 50 % light at 48.10 (4 f in), not 60 % after 3 f. The text exit and the "This"/"is" timings are confirmed. | Fixed 5.10, the transitions table and rule 11. |
| 6 | Finale swaps at 57.60/58.10/58.60/59.10/59.43/59.93 (15/15/15/10/15 f); widths 17→20→20→45→40→47 % W; PRO cap ≈27 % H; PRO +8.9 % over 36 f | **Times are off by 1-2 f.** The measured times are 57.60, 58.13, 58.63, 59.07, 59.43 and 59.90, so the intervals are 16/15/13/11/14 f. **PRO types in per letter** (P 59.90, R 59.97, O 60.03), so it is not a single blur-in swap. **The widths were wrong:** 17→32→30→74→67→47 % W. The size crescendo is in height (10→13→18→27→34→33 % H). **PRO cap is about 33 % H** (P stem 241-451 px, ≈355 px@1080), not 27 %. The +8.9 % push is confirmed (531→578 px) over 33 f, 60.10-61.20. | Fixed the stage table, shot 26, 5.12, the motion table, the camera list, the typography table and rules 14 and 16. |
| 7 | Lockup: BUMPER right to left at a 2 f stagger (61.47-61.80), 14 f hold, QR dot→full in 8 f (62.27-62.53), scan line 62.43-62.60 | **Confirmed.** R 61.467, E 61.533, P 61.600, M 61.667, U 61.733, B 61.800. The QR dot appears at 62.27, fills by about 62.50, and the scan line shows from 62.43. | None. |
| 8 | Audio: "0-3.55 s quiet intro, no onsets", "music drops in 3.55-4.5 s on the logo", "copy-driven, not beat-driven", "4 of 17 cuts on onsets ≈ random" | **Wrong.** Sub-bass kicks land at 0.0, 1.2, 2.4 and 3.6 s (about -13.5 dB peaks in 100 ms windows). The full groove enters at 4.8 s, before the chip fly-in (4.97). The kick grid is exactly 100.0 BPM (1.200 s per kick pair, 0.03→57.64 s). Against the quarter-note grid, **11 of 18 hard cuts land 0-2 f before a beat** (binomial p < 0.001 vs about 17 % chance), and 4 more sit within 1 f of an eighth-note off-beat. The `analysis.json` onset list misses the intro and breakdown kicks and runs about 2 f early, which caused the original reading. The "4 of 17" figure is reproducible against that list; the "5 of 22" figure was not (the corrected list gives 5 of 26 boundaries). The breakdown (25-38 s) still has low-passed kicks. | Rewrote section 1's last line, the product-reveal stage, 11 (beat sync), 12 (structure, takeaway), rule 17 and the last "avoid" bullet. Removed flaw 8 ("cuts mostly off-beat"). |
| 9 | Mint "matched" fill wipes top-down, 20.38-20.55 (5 f) | **Wrong direction.** The fill wipes **left to right** across each column with a feathered edge, 20.37-20.50 (4 f). | Fixed shot 13, 5.7 and the motion table. |
| 10 | Claim/proof colour worlds are used "strictly" | **Overstated.** The fee chart and tooltip (#8-9, brightness 19), the network (#21, brightness 11) and the logo/chip ring (#4) are proof on navy. | Fixed section 1 and the Consistency row. |

Coverage checks:

- **Shot table:** it now runs 0.00-67.20 s with no gaps or overlaps across 27 rows. Hard cuts (18) and seamless boundaries (8) add up to the 26 boundaries the table implies.
- **Phase-2 columns:** all 13 columns are filled for every row. Grain was named in the header but never stated, so it is now measured and marked n/a (high-pass σ ≤ 0.15 levels, temporal noise ≤ 0.13). Notes for reflections, motion trails, angle and coverage are added under the table.

Not re-measured, so these stay as the original analyst's values:

- the palette hex values
- the "Save" double-ease series
- the "One" letter stagger
- the logo stroke/fill/sheen timings
- the chip-implosion and particle counts
- the orbit-step times
- the LUFS, centroid and band-share figures
- the 4-6 Hz speech-modulation note
