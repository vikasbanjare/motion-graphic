# CRED IndusInd Bank RuPay credit card: 30-second launch film
## A build brief for recreating the v6.3 film in Claude Design

UNOFFICIAL SPEC WORK. Not affiliated with or approved by CRED, IndusInd Bank or NPCI.

---

## 0. Read this first: what carries over and what doesn't

| Part of the film | In Claude Design | What to do |
|---|---|---|
| Timing, cuts, transitions, camera moves | Yes | Follow sections 4 and 5 frame by frame |
| Palettes, type, copy, layout | Yes | Use sections 2 and 3 exactly |
| Phone mockup, card face, ₹0, headlines, strip text | Yes | All of these are plain 2D HTML, CSS or SVG |
| Engraved 3D subjects (fox, fish, abalone shell, plants, lantern, columns, hotel, products) | No | v6.3 renders licensed 3D models through a custom engraving shader (WebGL). Claude Design can't do that. Use flat engraved illustrations (SVG or PNG cut-outs) and animate them in 2D: parallax, slow scale, small rotation. See section 6 |
| Music bed and cuts on the beat | Partly | Claude Design has no audio timeline. Export the animation, then lay the music in an editor. The cut frames below already sit on the music's beats |

The honest expectation: the 2D version keeps the structure, the type and every transition. It loses the depth of the engraved 3D worlds. If those worlds are what sells the film, keep them as rendered plates from the Remotion build and do only the type and UI layers in Claude Design.

---

## 1. Format

- 1920 × 1080, **24 fps**, 720 frames = **30.0 s**.
- Times below are given as `frame (seconds)`. Seconds = frame ÷ 24.
- Every move eases. Use expo-out for arrivals, cubic in-out for camera pushes, and no linear starts or stops. Something must always be moving: a hold is a slow drift (a 2–8 % scale change over the hold), never a freeze. This was the main fix in v6.3.

---

## 2. Design system

### Type (open-licence stand-ins; swap in CRED's own fonts if you have the licence)

| Role | Font | Weight | Size | Notes |
|---|---|---|---|---|
| Scene headline | Newsreader (serif) | 600 | 92 px (60–76 on some scenes) | letter-spacing −2 px, line-height 1.02, centred near the top, **gradient ink** (see palettes) |
| Headline sub-line | Lexend | 500 | 28 px | colour = first gradient stop |
| Foil strip copy | Lexend | 500 | 30 px on the card (≈ 90 px on screen in close-up) | ALL CAPS, letter-spacing 0.28 em, white 97 % |
| "JOINING FEE" label | Lexend | 500 | 26 px | letter-spacing 0.42 em, #3a4452 |
| ₹0 | Newsreader | 700 | 280 px | letter-spacing −10 px, foil gradient fill |
| Outro words | Lexend | 500 | 46 px | #17171b, one line each, no wrapping |
| Lockup line | Lexend | 500 | 40 px | letter-spacing 0.06 em, white 86 % |

**Gradient text warning.** Never use CSS `background-clip: text` on an element that also has `transform` or `filter`. The headless renderer paints the gradient as a solid box (this is exactly the ₹0 bug from v6.2). Use SVG `<text fill="url(#gradient)">` for any gradient text that scales or moves.

### Palettes, one duotone per world

| World | Paper | Line / ink | Headline gradient (3 stops, 90°) |
|---|---|---|---|
| Opening + rewards | #ebebe7, then a green disc #d3e0a8 | #3a3a3e, lightening to #b4b6ad | #3b23a0 → #6a4fd0 → #2f7a4a |
| Card | dark surround #0a0c0b; print tinted #2c8c62 (multiply, 55 %) | violet/green engraving | #d9f6e4 → #ffffff → #b8f0d0 |
| Travel | #d6d0ea | #4a50a6; lines #b7b0d6; land #c3bce4 | #26238a → #5a4fc0 → #2a6aa0 |
| Products | #f1d9c6 | terra #ad503a / cream #b98536; lines #e2b9a2 | #8a2a1e → #c2553c → #7a3a8a |
| Zero fee | #dfe4e0 | slate #58636a; lines #c3cbc8 | label #3a4452; ₹0 in foil |
| Outro | white set: radial #ffffff → #ececea → #e2e2df | 120 px grid of 1 px lines, black at 4.5 % | text #17171b |
| Lockup | #000 | — | — |

Engraving duotone ramps, dark → light (for colouring illustrations):

- violet #2a1670 / #6247c9 / #b3a0ee / #ece6fb
- green #2b4512 / #6c8b2b / #c3d596 / #eef3dc
- indigo #181c5a / #4a50a6 / #aeb1e2 / #eeeaf7
- lilac #3d2f7a / #8676c4 / #cfc6ec / #f2eefa
- terra #561c14 / #ad503a / #eeb59c / #f9e6da
- cream #6a4413 / #b98536 / #e8cf96 / #f6ebcb
- slate #1b2126 / #58636a / #b5bdc0 / #eceeec

### Holographic foil (the film's recurring hero material)

```css
background: linear-gradient(100deg,
  #f4c4ff calc(-40% + P), #9fe8ff calc(-10% + P), #c6ffb8 calc(20% + P),
  #fff2a8 calc(45% + P), #ffc2d6 calc(75% + P), #b7c4ff calc(110% + P));
/* P = phase × 100 %, advancing about 1/70 per frame, so the foil always shimmers */
```

The ₹0 foil uses stops #8f7cff, #6fd6ea, #b4f2c2, #ffeea0, #ffb2d4, #8f7cff at 110°.

### Background texture ("Field")

Every world sits on fine, near-horizontal wavy engraving lines: pitch about 12 px, wavelength 130–180 px, amplitude 3–4 px, line width 1.1 px, in the world's line colour. The lines scroll slowly sideways (phase advances every frame). The opening uses a coarser version: pitch 25.5 px, amplitude 6 px, width 2.2 px, tilted −3°, with ragged ends.

### Lens vignette

During the card scene the frame sits inside a soft circular loupe: black (#080a09 at 92 %) outside a circle of about 0.62 × frame height. The circle opens wider as the card settles, then fades out between frames 252 and 272.

---

## 3. Copy (the only claims allowed on screen)

1. "5% rewards" / "on online shopping"
2. "the CRED IndusInd Bank" / "RuPay credit card"
3. "redeem on flights, hotels"
4. "2,000+ products" / "on CRED store"
5. "JOINING FEE" + "₹0"; strip copy "ZERO JOINING FEE" and "5% REWARDS ON ONLINE SHOPPING"
6. Phone screen: "your card", "CRED IndusInd Bank RuPay credit card", "5% rewards on online shopping", "zero joining fee", "redeem on flights, hotels and 2,000+ products on CRED store"
7. Lockup: official CRED logo + "IndusInd Bank RuPay credit card"

Rules:
- Never show a full card number.
- Draw no IndusInd, RuPay or other third-party logos.
- Use the CRED logo only as the official file, unmodified: no redrawing, retyping or recolouring.

---

## 4. Shot-by-shot timeline

### Shot 1: opening lines → rewards world · 0–150 (0.0–6.25 s)

| Frames | What happens |
|---|---|
| 0–22 (0–0.9 s) | Warm paper #ebebe7. Hand-drawn pen strokes draw on one after another: 6–8 wavy horizontal lines around 45 % frame height, wave amplitude 13 px, wavelength 460 px. Each line draws left→right with expo-out over about 18 frames, tapered ends, ink #3a3a3e |
| 22, 40 (0.9 s, 1.7 s) | **Scale-step cuts** on the beat: the framing jumps in scale (the reference cuts by jumping scale, not position) |
| 40 → | The pen lines become the full Field of engraving lines, revealed raggedly (40–66) |
| 58–96 (2.4–4.0 s) | A **green disc** #d3e0a8 grows in from the right: centre at x = 112 % of width, y = 42 % of height, radius 0 → 1120 px, expo-out, soft 10 % edge. Line ink lightens to #b4b6ad (70–104) |
| 70–130 | Plants grow up from their bases in a wave from right to left, each one height first, then width, unfurling from a lean. Foreground branches sweep in from the frame edges, staggered. A fox walks through the hedge and **never stops walking**, at about 0.04 world units per frame |
| 98–112 (4.1–4.7 s) | Headline "5% rewards" / "on online shopping" rises 22 px and fades in (top 86 px) |
| 121 (5.0 s) | A beat cut (scale step) |

### Shot 2: the world becomes the card · 150–276 (6.25–11.5 s)

| Frames | What happens |
|---|---|
| 150–172 (6.25–7.2 s) | The whole rewards world **becomes the card's print**: the frame shrinks to about 45 % scale and tilts back (rotateX 38°, rotateZ −9°) into a card with 64 px corner radius and a 10 px cream inner border (#f2f6e8). Green multiply tint over the print. Official CRED logo top-left on the card (height ≈ 170 px at card scale). The world keeps moving inside the print: the fox keeps walking |
| on the card | A **holographic foil strip** 96 px wide crosses the card diagonally at 68°. Its copy slides along it at 3 px per frame, with a white dot between phrases. Nine fine white guilloche waves run inside the strip, blended soft-light |
| 168–195 | Headline "the CRED IndusInd Bank" / "RuPay credit card", 60 px, pale mint gradient, top 70 px |
| 150–207 | The card breathes: slow scale +3.5 % per second, rotateX ±4° on a sine, rotateZ drifting +3° per second. **No still frame** |
| 189–266 (7.9–11.1 s) | **One continuous camera push** into the foil strip (cubic in-out): card scale → 3.0, rotateX → 0, rotateZ → −68° (so the strip ends up **level**), and the strip's centre line is brought to frame centre. Meanwhile the strip copy slows smoothly from 3 to 0.9 px per frame |
| 266–276 (11.1–11.5 s) | Close-up hold, still drifting: the phrase **"ZERO JOINING FEE" sits whole and centred** in the strip (about 90 px letters on screen). Nothing covers it: no magnifier, no props |

### Transition A: the strip splits open · 274–300 (11.4–12.5 s)

1. Strip copy fades out over 274–282.
2. From frame 276 the strip **splits along its centre line**. A band opens vertically from 0 to the full frame height over 24 frames (cubic in-out). Through the band you see the travel world, **already composed and in focus**: the globe fully drawn, lantern and hotel in place.
3. Two foil edges (the torn strip) ride outward on the band's top and bottom edges. They start 44 px thick and thin to 14 px, with soft shadows of 24 px blur at 25 %.
4. Outside the band the card keeps drifting until the band covers the frame.

**Do not** use a magnifying glass, an iris or a dissolve here.

### Shot 3: travel · 276–384 (11.5–16.0 s)

| Frames | What happens |
|---|---|
| Layout | Lilac paper #d6d0ea with its Field lines. An orthographic **line globe** centred at (70 % W, 60 % H), radius 340 px, latitude tilt 18°, rotating slowly (longitude 40° → 62° across the shot). Land fill #c3bce4, graticule at 45 % opacity. On the left: an engraved **hotel** (tower, two wings, crown, spire, canopy, window grid), a lantern on a post, a toy car rolling in, the fox running past, foreground leaves |
| 236–270 | The globe draws on (land outlines and graticule), finished before the band opens |
| 276–340 | Dotted flight arcs leave **Mumbai** for several cities, staggered on the beat, with small plane icons riding the arcs. The whole scene pushes in gently (scale 1.04 → 1.09) |
| 296–322 | The hotel **rises** from the ground (expo-out) |
| 331–345 (13.8–14.4 s) | Headline "redeem on flights, hotels", 76 px, top 130 px |
| ~334 | A beat cut to a slightly closer framing, with the camera still drifting |

### Transition B: the globe becomes the colonnade floor · 354–406 (14.75–16.9 s)

1. 354–366: the headline fades out.
2. 354–384: the globe **glides to frame centre and grows**. Its radius goes from 340 to 941 px, which is exactly the size of the colonnade's round floor seen from directly above. Cubic in-out; everything else in the travel scene scales with it.
3. 382–390: inside the globe's circle, the overhead products shot takes over (a short 8-frame blend, nothing longer).
4. 390–406: that circle **opens outward** to fill the frame (cubic in-out) while the products camera starts to crane down.

The idea is a **shape match**: globe circle = floor circle. Don't dissolve the two whole frames into each other; that was the muddy double exposure in v6.2.

### Shot 4: products, the colonnade · 384–484 (16.0–20.2 s)

| Frames | What happens |
|---|---|
| Layout | Peach paper #f1d9c6. A round floor with a **sunburst** engraving. A ring of **10 fluted classical columns** (base mouldings, fluted shaft, capital), a **torus ring beam** across their tops, and 4 round **plinths** in the middle |
| 384–396 | Directly overhead: the ring of capitals reads as a circle, which matches the globe |
| 396–432 | The camera **cranes down** to eye level while slowly orbiting. It swings outward first, so it never passes through the ring beam |
| on beats from ~426 | Four products drop onto the plinths one per beat: a boombox, a water bottle, a shoe (foil highlight) and an avocado. Each lands with a soft pop and keeps rotating slowly |
| 434–448 (18.1–18.7 s) | Headline "2,000+ products" / "on CRED store" (top 140 px), on a soft paper-coloured oval plate so no column cuts through the words |
| ~446 | A beat cut to a closer three-quarter view that keeps drifting sideways |

### Shot 5: zero joining fee · 484–561 (20.2–23.4 s)

| Frames | What happens |
|---|---|
| 484–504 | An **iris opens** from a point at (50 %, 60 %) to full frame: a pale sea-grey world #dfe4e0 with slow-moving Field lines |
| scene | Engraved **fish** (7 of them) swim natural curves: each faces where it is going, sways its body and bobs gently. An iridescent **abalone shell** in the centre-bottom rotates slowly, its inside shimmering in foil. Leaves on the left. The camera drifts slowly the whole time |
| 506–528 (21.1–22.0 s) | **"₹0" rises** like a pearl from the shell: it scales 0.7 → 1.0 and climbs 220 px into place (expo-out), in **foil gradient SVG text**. A blurred shadow copy sits 14 px below at 18 %, and a thin 1.5 px violet stroke holds the edge |
| 514–528 | Label "JOINING FEE" fades in above, and a 240 px hairline draws in below |
| ~520 | A beat cut to a closer framing |
| 536–561 | The camera **dives into the shell's iridescence** (scale 1 → 10, accelerating). The ₹0 fades out at 536–546, and the holographic foil floods the whole frame at 544–559 |

### Shot 6: outro, card to phone · 561–645 (23.4–26.9 s)

**Card face** (inspired by the "clarity meets craft" reference; it is not the real card):
- Brushed silver: gradient #f3f4f5 / #d9dbde / #eceef0 / #cfd2d6 plus fine horizontal brushing.
- Two triple-line **circuit traces** in #7c8088 run from the left edge, step down and end at the chip.
- A **milled chip** at upper right: radial #fbfbfc → #b9bcc2 → #8d9097, with an engraved four-point star pattern.
- A **red block** at bottom right (#ee4a30 → #c9321f). The official white CRED logo sits centred on it.
- A small **black square** (#121214) beside the red block.
- Tiny grey micro text along the bottom edge.
- No card number.
- Card proportions 1.585:1, corner radius ≈ 4.5 % of width, inset light edge, a gloss sweep crossing at 568–592.

| Frames | What happens |
|---|---|
| 561–571 | The foil flood fades away and reveals a macro of the card's **chip** (match cut: shell iridescence → card) |
| 561–579 | **Pull back** from 6× to 1×, centred on the chip, onto the white grid set. The card floats with a slight tilt (rotateX 10°, rotateY −14°) and bobs ±6 px |
| 570–592 | **Red laser scan lines** (3 px, #ff3b22, with a red glow) sweep across the card: one horizontal top→bottom, one vertical left→right |
| 586–606 | A **phone** rises from below (expo-out): titanium frame gradient #d9d9dd / #8d8d93 / #e6e6ea / #a6a6ac, side buttons, black bezel, Dynamic Island, screen #f5f5f3. Phone 430 × 880 px, corner radius 74 |
| 590–606 | The card **tilts back and drops into the phone's card slot** (flips up to 55° at mid-drop and shrinks to slot width) |
| 606 → | Screen content: "9:41"; "your card" (Newsreader 600, 30 px); the card; the title "CRED IndusInd Bank RuPay credit card" (Lexend 600, 19 px); a divider; three claim rows whose green check circles (#1f7a55) **tick on at 612, 618 and 624** |
| 606 / 614 | Words arrive word by word with a blur-in: "the CRED IndusInd Bank" right-aligned left of the phone, then "RuPay credit card." left-aligned on the right (Lexend 500, 46 px, vertically centred) |
| 590–640 | A **slow continuous push** (scale +8 %), so the frame never freezes after the phone lands |
| 630–638 | The phone screen dims to dark |
| 634–645 | The camera **pushes into the dark screen** (scale 1 → 10, accelerating), which becomes the lockup's black |

### Shot 7: lockup · 645–720 (26.9–30.0 s)

- Black frame. The **official CRED logo file** sits centred at 43 % height. Below it: "IndusInd Bank RuPay credit card" (Lexend 500, 40 px, white 86 %), fading in after the logo.
- The whole lockup drifts very slowly (scale +0.06 % per frame) so the last 3 seconds aren't frozen.
- Known weakness: on a mostly black frame that drift barely reads. If it still feels static, add one slow light sweep across the lockup background. Don't change the logo.

---

## 5. Transition rules (from the director's notes; don't break these)

1. **Card → travel:** a continuous push into the strip, then the strip splits open. No magnifying glass; it makes no sense in a close-up.
2. **Travel → products:** the globe circle matches the floor circle, then irises out. No whole-frame dissolves.
3. **Close-up text:** at the close-up, a whole phrase ("ZERO JOINING FEE") must be readable. Never let a frame edge or a prop cut a word so a "0" reads as a "5".
4. **No stalls:** every hold has a drift, and animals never stop mid-move before a zoom.
5. **₹0** is always real text in foil, never a box. Render it as SVG text.
6. **One hero material per world:** the foil appears on one thing at a time (strip, shoe, shell, card).
7. **Cut on the beat:** the scale-step cuts at 22, 40, 121, ~334, ~446 and ~520 sit on music onsets. If you change the music, re-time them to its onsets.

---

## 6. Rebuilding the 3D subjects in 2D (Claude Design)

| Subject | 2D substitute | How to animate it |
|---|---|---|
| Fox walking / running | An engraved-style fox walk cycle: 6–8 SVG frames, or a licensed sprite sheet | Swap frames every 2–3 frames and translate across; keep it moving until the card push completes |
| Plants / hedge | SVG leaves in the green or indigo engraving duotone | Scale Y from the base (0 → 1) on a right-to-left stagger, then a small rotate sway |
| Hotel | A flat engraved facade (window grid, crown, spire) | Rise from a mask at the ground line |
| Globe | **SVG orthographic globe** (d3-geo `geoOrthographic` + world-110m) | Rotate longitude; draw paths with `stroke-dashoffset` |
| Columns, ring, floor | Overhead: a 10-column ring and a sunburst floor as one SVG; eye level: a second illustration | Swap from overhead to eye level during the crane with a scale and blur cross, or keep it overhead and rotate |
| Products | Four engraved product cut-outs | Drop with an overshoot pop on the beats; slow rotate |
| Fish, shell | Engraved fish cut-outs; a shell with a foil gradient masked inside | Fish on sine paths with heading-aligned rotation; the foil gradient phase animates |
| Phone, card | Build in HTML/CSS exactly as specified in section 6 (outro) | As timed above |

Engraving look in 2D: fill each illustration with the duotone ramp, then overlay horizontal wavy line hatching (pitch 4–6 px, angle about 12°) masked by the illustration's shading. The hatch should get denser in the shadows.

---

## 7. Assets checklist

- [ ] Official CRED logo file, white on transparent, used unmodified
- [ ] Newsreader and Lexend (Google Fonts, OFL), or CRED's licensed brand fonts
- [ ] Engraved illustrations for section 6 (licensed or drawn; credit any CC-BY sources)
- [ ] Music bed, 30 s, with onsets near frames 22, 40, 121, 150, 334, 446, 520 and 561
- [ ] "UNOFFICIAL SPEC WORK" on any shared copy

## 8. QA before export

- [ ] Every 6-frame window has visible motion; there is no frozen hold anywhere
- [ ] At frame 272 (11.3 s), "ZERO JOINING FEE" is fully readable
- [ ] At frame 384 (16.0 s), the globe is centred with radius ≈ 941 px
- [ ] At frame 528 (22.0 s), ₹0 shows as foil text, not a box
- [ ] At frame 626 (26.1 s), the phone shows three ticked claims and the outro words are on one line each
- [ ] Check these on the **exported video**, not in the editor preview (the ₹0 bug only showed up in the export)
