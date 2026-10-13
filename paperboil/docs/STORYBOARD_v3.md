# MAPS Global Markets · US Stocks · 30 s — Storyboard v3

**Format:** 16:9 master (1920×1080) + 9:16 cut, 30 fps, 900 frames.
**Music:** V1, 150 BPM, B major, cut beat-exact to 30 s. One beat = 12 frames; one bar = 48 frames.
**Copy:** Open Sans only, typeset in the engine.

---

## 1. What the reference actually does

I viewed all 1,375 frames of the CRED × Kuvera film and measured them.

| Measure | Reference | Our v2 cut | Rule for v3 |
|---|---|---|---|
| Drawing rate | **12 drawings/s.** 48% of drawings are held 2 frames and 46% are held 3 (animated on twos). | 30/s (smooth) | Picture steps at 12/s; camera and type stay on ones |
| Cuts | 67 in 45.8 s; median shot 0.17 s | 23 in 30 s | Fast substitution bursts (5-frame swaps) inside 1–2 s hero holds |
| Longest still moment | 51 frames, on the end card only | 45 frames, mid-film | Nothing is static for more than 12 frames before the end card |
| Transitions | Push into the object, 3–5-frame shape morph, carry-through ribbon, ring wipe, echo-burst on the drop, speed lines, card land | Clip-path wipes | Every cut is motivated by an object |
| Payoff | Calm grey desk, certificates land one per beat, an engraved text card, then the end card | Same idea, weak art | Kept and rebuilt properly |

**What made v2 look amateur:**
- **Geometry:** clip-art objects with uniform outlines and no lighting, set on generic ray backgrounds.
- **Hierarchy:** no focal hierarchy in the frame.
- **Type:** text was dropped on top of the frame instead of being designed in.
- **Copy:** placeholder brackets left on screen.
- **Door scene:** the door drifted on screen for 4 s with nothing happening.

---

## 2. Concept: "From customer to owner, on paper"

**Logline:** Your whole day already runs on American companies, and the receipt proves it. MAPS turns that receipt into a share certificate.

**Visual metaphor:** paper that changes what it says.
- **Before the drop:** the paper is a **receipt**, so you are a customer.
- **After the drop:** the paper is a **share certificate**, so you are an owner.

Everything is drawn in the language of security printing: guilloche rosettes, engraving, microtext, serial numbers and one MAPS-orange ink stamp. That ties the craft to money and ownership, which is how a broker should look, without borrowing any third-party logos.

**Arc:** you spend → total: 0 shares → the paper locks → the stamp unlocks it → the drop: the receipt re-prints as a certificate → pick a name → the stack → "Customer by habit. Shareholder by choice." → MAPS.

---

## 3. Style frames: pick one

All three style frames are built in code and render in this engine today.

| | Style | Frame | Pitch |
|---|---|---|---|
| **A** | **Engraved Security Print** *(recommended)* | `styleframes/SF-A-Hero.png`, `SF-A-Hook.png`, `SF-A-End.png` | Cream paper and navy hairline guilloche, with MAPS orange as the only ink. Premium and trustworthy, and specific to finance. Motion is linework drawing on, rosettes blooming, stamps landing. |
| **B** | Painterly Collage (v2 engine, improved) | `styleframes/SF-B-Hero.png` | The closest to CRED's painterly look. It needs real painted assets to reach their quality; code-drawn objects cap it. |
| **C** | Bold Cut-Paper Graphic | `styleframes/SF-C-Hero.png` | Flat cut paper, halftone, oversized type bleeding off frame. Loud, poster-like, very "social". |

---

## 4. Shot by shot (built for Style A)

Times are in seconds on the music grid. "B" means a beat (0.4 s). Every shot keeps moving: either the camera drifts or linework is drawing on.

### Act 1 · The receipt (0.0–8.4)

| # | Time | Picture | Motion | Type on screen | SFX |
|---|---|---|---|---|---|
| 1 | 0.0–1.2 | Black. A thermal printer slot glows at the top of frame. The receipt feeds down on navy: "YOUR DAY · MADE IN THE USA · SPENT IN INDIA". | Paper feeds in 2-frame steps; slight curl; camera tilts down with it | **SCROLL** · 07:12 · 48 min (line prints, word hits big at right) | Printer motor + tear ticks on 8ths |
| 2 | 1.2–2.0 | Same receipt, the next line prints. Behind it, a TV-glow rectangle washes the paper blue. | Print-head line + word pop with overshoot | **STREAM** · 22:10 · 2 hrs | Printer tick, soft TV thunk |
| 3 | 2.0–2.8 | The line prints; a magnifier glyph stamps into the margin | Stamp lands with a squash | **SEARCH** · 13:30 · 31 times | Rubber tap + key ticks |
| 4 | 2.8–3.6 | The line prints; a tiny route map is stamped, with an orange route drawing on | Route draws on over 8 frames | **RIDE** · 18:05 · 2 trips | Pin pop, car pass |
| 5 | 3.6–4.4 | The line prints; a contactless wave icon pulses | Ripple rings at 12 fps | **PAY** · 20:41 · 6 taps | NFC chime (in key) |
| 6 | 4.4–8.4 | The receipt tears off (perforation snap) and swings to centre. A dotted rule prints, then the total line types: "US SHARES OWNED …" The **0** stamps in orange on the hole in the music (7.2). | Pendulum swing settles; typing at 2-frame steps; the 0 slams at 160% → 100% with a paper shake | "How many do you own?" (caption) → **0** | Tear, typing, then the sub drop + cardboard slam on the 0 |

### Act 2 · The lock (8.4–16.0)

| # | Time | Picture | Motion | Type on screen | SFX |
|---|---|---|---|---|---|
| 7 | 8.4–9.6 | The "0" becomes a **guilloche seal**: rosette rings draw outward around it in navy hairline, until the receipt is locked under a security seal. | Rings draw on, staggered 2 frames apart; slow push | "Owning a piece of them always felt like somebody else's game." | Fine scratching engraving + drone |
| 8 | 9.6–11.2 | On the bass return, the **MAPS stamp** comes down from above, slams onto the seal and rotates 15°. The seal cracks open, and orange ink floods the rosette from the centre. | Anticipation lift of 4 frames, slam, impact squash, ink spreading in 12-fps steps | **NOT ANYMORE.** | Stamp wind-up air, heavy stamp thunk, lock clack tuned to B |
| 9 | 11.2–12.8 | The camera dives into the rosette's eye; the hairlines become a tunnel of engraved rings rushing past. | Fly-through with accelerating ring scale | "We opened the door." | Whoosh in + riser |
| 10 | 12.8–16.0 | Engraving tunnel, faster; microtext rings fly past ("US EQUITY · NOW ON MAPS"). At 15.2 everything freezes and pulls back (the vacuum); a ghost of the certificate rosette flickers at 15.8. | Speed ramps with the build; freeze; 5% pull-back; desaturate | none | Riser → reverse cymbal → **0.5 s of silence** |

### Act 3 · The certificate (16.0–30.0)

| # | Time | Picture | Motion | Type on screen | SFX |
|---|---|---|---|---|---|
| 11 | 16.0–18.4 | **DROP.** The full certificate (style frame A hero) blooms: the orange rosette explodes outward from the centre and the navy field draws on behind it. US STOCKS is printed in the eye; the "NOW OPEN" stamp hits on beat 3. | Rosette scales 0.2 → 1.0 with overshoot over 10 frames, then breathes; stamp at 16.8 | NOW YOU CAN OWN / **US STOCKS** / FROM INDIA · ON MAPS | Sub boom + paint splash + crash; stamp thunk |
| 12 | 18.4–20.0 | Push into the certificate's name panel. A phone slides up into the panel showing a carousel of engraved company cards. A thumb swipes twice, picks a card on 19.2 and taps **Buy** on 19.6; the card flips into a certificate. | Swipe smears; Buy squash; flip in 8 frames | "Pick a name you know." / **BUY FROM INDIA** | Card slides, tap, button thunk, chime |
| 13 | 20.0–21.6 | Grey-blue desk (the reference's calm payoff). Certificates land one per beat, each with its own guilloche colour (navy, blue, orange, slate) and a serial number counting up: Nº 000 001 → 000 004. | Tilt-in arcs, impact squash, messy stack | serial numbers only | Card flicks pitched +0 / +2 / +4 / +5 |
| 14 | 21.6–23.2 | The top certificate lifts to camera and reads the proof line. | Lift on a heavy spring | **Own a slice of the brands you use every day.** | Paper lift + soft ping |
| 15 | 23.2–28.4 | An engraved floral frame card lands on the stack: "Customer by habit." At 24.8 the music breaks; the camera leans in. On the downbeat (25.6) "**Shareholder by choice.**" stamps in with an orange brush underline. | Land, lean (anticipation), stamp + shake + sparkles | Customer by habit. / **Shareholder by choice.** | Card slap; break; rubber stamp + tonal hit |
| 16 | 28.4–30.0 | End card (style frame A end): MAPS Global Markets lock-up on the song's final hit, "US STOCKS · NOW OPEN" with the underline drawing on, and the risk disclaimer. The receipt's printer slot ghosts in at 29.4, so the loop restarts the film. | Logo pop with overshoot; bar reveal; underline draw | US STOCKS · NOW OPEN + disclaimer | Logo motif (B–D#–F#), paper swoosh, final tail |

---

## 5. Copy now on screen (no blanks)

| Slot | Copy | Status |
|---|---|---|
| Proof line (S14) | "Own a slice of the brands you use every day." | Needs a compliance OK. It makes no numeric claim. |
| Footer, S14–S16 | "Investments in the securities market are subject to market risks. Read all related documents carefully before investing. Overseas investments are subject to RBI LRS limits, foreign-exchange risk and applicable taxes." | Standard wording; MAPS compliance must confirm. |
| Receipt lines | Times and quantities are illustrative ("48 min", "31 times") | Fictional; no brand names. |
| Serial numbers | Nº 000 001–000 004 | Decorative. |

---

## 6. Research rules applied (summary)

- **Timing:** springs with 8–15% overshoot; 3–6 frames of anticipation before every slam; staggered parts (2–4 frames); arcs on travel; squash on impact; moving holds.
- **Visual hits:** they lead the audio by 0–2 frames.
- **Pre-drop silence:** before the drop, picture freezes and pulls back while the audio holds true silence.
- **SFX:** every hit is layered (transient + body + tail), tonal layers are tuned to B major, the music is ducked under hero hits, and the mix is loudness-normalised (−14 LUFS, −1 dBTP).
