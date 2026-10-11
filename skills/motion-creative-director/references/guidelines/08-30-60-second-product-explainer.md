# Specialised Guideline 08: 30-60 Second Product Explainer

A 30, 45 or 60 second film that answers one question a prospect actually has: **"What is this, how does it work, and why should I care?"** It names a problem, introduces the product, walks through how it works in **three steps** (rarely two, never more than four), shows one result with a number, and ends on an action. It is usually **narrated** (voice-over) and always **sound-off safe** (every spoken claim is echoed on screen).

It is not a UI Product Demo (Guideline 02), which proves one flow with no narrator and lets the product's own speed carry the film. It is not a launch film (Guideline 01), which sells a moment and a feeling. It is not a 5-15 s ad (Guideline 07), which can afford only one action. The explainer spends its time on **understanding**: the mechanism, in order, at a pace a stranger can follow.

This guideline condenses the Master SaaS Motion Design System (Parts 01-11 in `research/master/`) and the eight frame-measured teardowns in `research/videos/` into one working spec. Every number is in frames at 30 fps (f) unless stated; 1 f = 33.3 ms. "% W" and "% H" are percent of frame width and height; pixel values are for 1920×1080 (16:9) unless marked "@1920" (9:16 at 1080×1920). Numbers are measured in the references unless marked [inferred] (derived by the master or by this guideline from measured rules, not observed directly) or [S] (second-level text sources such as caption timings, not frame-measured).

**Evidence warning, read first.** None of the eight references is a confirmed narrated SaaS explainer. Solar is a VO-shaped editorial explainer whose narrator could not be confirmed from the mix [V:1Hcg3X §12]; NOSTRA is a copy-led promo with the same "problem → solution → features" spine [V:1i2L14]. The VO rules (words per minute, caption timing, duck depth) therefore rest on caption timings of narrated SaaS films (Superspace, Airtable, Luminate, Thomson Reuters) and on subtitle standards, as recorded in Part 01 §2.3, Part 08 BS-11 and Part 09 §16.10. All picture micro-timings (eases, holds, cursor, cut-ins, transitions) are measured.

| Tag | Reference (file in `research/videos/`) | What it teaches an explainer |
|---|---|---|
| [V:1Hcg3X] | "How do solar panels work?", 16:9, 35.8 s (`1Hcg3X8G_q34iS-RqcAQ2pMHpGkIhxu3j.md`) | **The mechanism template (T6 "energy chain").** Question hook, a "But how?" beat, one 4.7 s hero hold for the key concept, a carrier that is handed from scene to scene, keyword supers that echo a VO, a recap triptych. Flaws: 0.4 s readable payoff, 2.2% H recap labels, no logo or CTA, 24 → 30 fps judder |
| [V:1i2L14] | NOSTRA studio promo, 16:9 inset, 35 s (`1i2L14p-cvnLcIl6XY7mUQEiTYZy_OWUA.md`) | **The copy-framework spine (T7):** dream 14% → pain 23% → benefits 16% → features 30% (with a 13% breather) → reassurance 4% → brand + CTA 8%. Click-caused CTA. Flaws: −7.9 LUFS clipped mix, 0.8 s end hold |
| [V:1CSXtQ] | OpenAI × HubSpot connector, 16:9, 30 s (`1CSXtQSs2jM0WBQP6LPDVpDgkt8JLdUkw.md`) | One use case end to end in 30 s; text → UI build; the 3D "where your data goes" hero beat; CTA card + reprised lockup with a 2.2 s still |
| [V:15VhHR] | Wix AI site builder, 16:9, 53.9 s (`15VhHRcisoHSPWY0VA06PzA3u_y-4qJY_.md`) | 3.4× cut-ins on the one string; anchored montage for "works for every case"; the cost of copy changing between wide and cut-in |
| [V:1-6l8S] | kivi voice AI, 16:9, 77.8 s (`1-6l8SV5NXZQotrYoV8KqKV7SJPvtssso.md`) | "Say → see" repeated 4 times with shrinking blocks (14.75 → 11.03 → 6.69 s); empty hold then result cascade; words that stream at the voice's pace |
| [V:19NRDv] | Bumper PRO payments, 16:9, 67.2 s (`19NRDvazRJFCFcAfehavceGsUMV64qBRv.md`) | Before/after toggle, the counter that parks ≥ 1 s, context → extraction → focus on the one value, 100 BPM claim/proof pulse |
| [V:126cpH] | Chowdeck delivery app, 9:16, ≈18 s (`126cpH-FXL4FxTwRwoJvt9M4FNwBB7peq.md`) | The only native vertical: single-transaction story, card → notification morph, status that must be held ≥ 1 s (its "Order delivered" lasts 2 f) |
| [V:1ccYWJ] | Lottieicon library launch, 16:9, 44.3 s (`1ccYWJ6nQXdqt1UQrpz2mE0ODScG_hU0K.md`) | Volume proof and a hop-and-hold tour; the failures of 6 text cards in a row, a 2% H URL and music that ends 3.7 s early |

Master cross-references use Part and rule IDs (for example Part 01 T6 is the "energy chain" story template in `master/01-creative-direction-and-storytelling.md`; Part 08 PL-90E is the VO explainer timing plan in `master/08-editing-rhythm-durations.md`; Part 09 SD-V3 is the caption-sync rule in `master/09-sound-design.md`).

---

## 1. Purpose and audience

**Purpose.** Turn a stranger into someone who can explain the product to a colleague in one sentence. The test after one viewing: the viewer can say (1) what problem it solves, (2) the three steps of how it works, and (3) one result with a number. If any of the three is missing, the film failed, however good it looks.

**What makes it different from the other formats.**

| Dimension | Explainer (this guideline) | UI demo (G02) | Launch film (G01) |
|---|---|---|---|
| Question it answers | "How does it work and why should I care?" | "Does it really do X?" | "Why is today special?" |
| Driver | VO sentences, or caption cues if silent | The product's real speed | Music and type |
| Problem stage | 10-17% of runtime (VO lets it stretch) | 0-7% | 0-7% |
| Product named by | ≤ 10 s with VO; ≤ 6 s without [Part 01 §2.3] | 3-6 s | 2-4 s |
| Proof | Three mechanism steps + one number | One continuous flow | Spectacle + one claim |
| ASL | 2.2-3.0 s (VO cadence) [Part 08 ER-S9] | 1.8-3.0 s | 1.6-2.5 s |
| Text on screen | Keyword echo of the VO, 1 cue per shot | Product copy only | Kinetic claims |

**Audience.**
- **Cold prospects** on a landing page, in a LinkedIn or YouTube pre-roll, in a sales email. They know the category vaguely or not at all. They need the problem named in their words by 3 s and the product named by 10 s.
- **Evaluators** (the person who will be asked "what does it do?"). They need the steps in the order of real use and one honest number with a source.
- **Non-native or second-language viewers** (common for Indian, SEA and EU audiences). They need slower VO (150-155 wpm, not 170), captions that appear 0-2 f before each spoken word, and ×1.15 read time for Hindi or Hinglish text (Part 01 §2.12).
- **Sound-off scrollers.** 7-8 of 8 references work fully muted; social autoplay is muted (Part 09 SD-V1). Every spoken claim must have an on-screen echo (Part 09 SD-V6).

**The promise the film makes.** "After 60 seconds you will understand this." Breaking it (jargon in the hook, four-plus features, steps out of real order, a number with no source, a mechanism that is shown as random floating screens) costs more than any visual polish earns.

---

## 2. When to choose this format

Choose the 30-60 s explainer when **at least two** are true:
1. The category is new, or the product's mechanism is not obvious from one screenshot (automation, AI pipelines, payments, security, data sync, "it works in the background").
2. The buyer needs to understand a sequence before trusting it (connect → set up → result).
3. The film will live where people choose to watch (landing page hero, product page, sales deck, onboarding email, YouTube pre-roll, help centre), not only in a feed.
4. A narrator (human or licensed TTS) is available, or the copy can be written as one caption cue per 2.5-3.5 s.

| Situation | Use this format? | Better alternative |
|---|---|---|
| New category, invisible mechanism (automation, sync, AI agent, payments) | **Yes**, T6 energy chain + three steps | — |
| Product with one visible input → output (prompt, upload, toggle) | Partly: the explainer works, but a UI demo is stronger | G02 UI Product Demo (T4 prompt-native) |
| Landing page hero for a B2B SaaS with 3 steps of setup | **Yes**, 60 s master | — |
| "How it works" section of a pitch or sales deck | **Yes**, 45-60 s, 16:9, VO-led | — |
| Paid social, cold audience, conversion goal | Only the 30 s 9:16 cutdown, hook ≤ 2 s | G07 for 15 s; G06 for social |
| Platform with 5+ features | No; pick the 3 that make the story | 90 s VO tour (Part 08 PL-90E) or a feature series (ST-C2) |
| Brand awareness, no product story yet | No | G04 Premium brand film |
| A single new feature for existing users | No | G05 Feature announcement |
| Physical-world mechanism (energy, logistics, hardware) | **Yes**, editorial 2.5D look [V:1Hcg3X] | — |

---

## 3. Platforms, aspect ratios and length

### 3.1 Formats

| Format | Size | Use | Text-safe box | motion-kit `format` |
|---|---|---|---|---|
| **16:9 master** | 1920×1080 | Landing page hero, YouTube, LinkedIn video, sales decks, help centre, Product Hunt | Strict: x 96-1824, y 54-1026; CTA and URL above y 918 (player controls). Kit safe inset: 160 px left/right, 100 top, 110 bottom | `landscape` |
| 9:16 | 1080×1920 | Reels, Shorts, TikTok, Stories, WhatsApp Status | Strict union of platforms: **x 120-840, y 270-1210**. Kit inset: top 260, bottom 580, left 96, right 150 (x 96-930, y 260-1340); use the stricter box for must-read text | `reel` |
| 4:5 | 1080×1350 | Instagram and LinkedIn feed | x 88-992 (kit inset 96 px sides, 110 top, 130 bottom) | `portrait` |
| 1:1 | 1080×1080 | Feed ads, WhatsApp forwards | x 135-945 (profile-grid crop) | `square` |

Sources: Part 02 §4.7; Part 06 §8.12; kit `motion-kit/src/engine/formats.ts`. **9:16 is a re-layout, not a crop.** A 9:16 window cut from a 1920×1080 master is 608 px wide (Part 02 CO-U18). Stack side-by-side panels vertically, move flanking labels above and below the hero, and cut in on the one value instead of shrinking the UI.

### 3.2 Length

| Runtime | When | Steps | VO words (150-170 wpm minus a 3-5 s silent tail) | Shots (ASL 2.5-2.8 s) | Template |
|---|---|---|---|---|---|
| **30 s (900 f)** | Paid social cutdown, product page, email embed | 3 steps × 4 s | **65-75** | 11-13 | T6 compressed, or T4 with VO |
| **45 s (1350 f)** | Sales deck, YouTube pre-roll, onboarding email | 3 steps × 7 s | **100-115** | 16-18 | T6 / T7 |
| **60 s (1800 f), default master** | Landing page hero, "how it works" section | 3 steps × 8 s | **135-150** | 21-24 | T6 + VO variant of Part 01 §2.3 |

Sources: Part 01 §2.12 (VO 150-170 wpm), Part 08 §17.3 (VO words per runtime: 30 s ≈65-75, 45 s ≈100-115, 60 s ≈135-155), the kit's own narration estimate (2.6 words/s Latin script, 2.3 words/s Devanagari; `motion-kit/src/engine/voice.ts`).

Rules:
- **Three steps is the default.** Two if the product truly has two; four only in the 60 s film and only if each step gets ≥ 6 s. Five features belong in a 90 s tour (Part 08 PL-90E variant notes: "60 s: drop feature 3 and the benefit triad").
- **Cut down by removing whole blocks, never by trimming every shot** (Part 08 §17.5 rule 1). From 60 → 30 s remove the "what it is" title, the step chapter cards, the breather and the second proof shot; keep all three steps at 4 s each.
- **Over 60 s in 9:16** the kit's checker warns (short-form retention drops past 60 s; `check.mjs` limit 60 s for non-landscape). Keep vertical cuts ≤ 35 s.
- **Frame rate:** render natively at 30 fps. Never convert 24 or 25 → 30 by duplicating frames; Solar judders every 5th frame on its slides [V:1Hcg3X tech note], Wix and HubSpot every 6th [V:15VhHR] [V:1CSXtQ].

---

## 4. Story structure with exact beat timings

### 4.1 The eight stages

The explainer spine merges Part 01's seven-stage model with its VO-led variant ("hook and pain stretch to about 9-10 s and the product is named at about 9.3-10 s", Part 01 §2.3) and Solar's mechanism structure (hook 4% / setup 15% / mechanism 21% / use + definition 17% / features 28% / climax 5% / outro 9%) [V:1Hcg3X §3].

| Stage | Job | Must contain |
|---|---|---|
| 1 Hook | Stop the scroll with the problem in the viewer's words | Text on f0, first change by f3, ≤ 7 words (median 4) (Part 01 H2) |
| 2 Problem | Make the cost of the problem concrete | One visual pain per VO sentence; one sourced number if you have one; a "But how?" or release beat at the end [V:1Hcg3X t=4.0-5.4s] |
| 3 Reveal | Name the product on its spoken word | Name lands 0-2 f before the VO says it; music lift; hero 1 |
| 4 What it is | One-sentence definition: category + benefit | ≤ 8 words on screen; product UI wide, calm |
| 5 How it works (3 steps) | The mechanism, in the order of real use | Per step: chapter label → one actor → one state change → result held ≥ 1.0 s |
| 6 Proof / result | One number with a source, or a before/after | Counter parks ≥ 1.0 s still [V:19NRDv t=23.85-24.93s] |
| 7 Breather + climax | Let it land, then restate the promise as a line | Breather ≤ 1/10 of peak motion, 10-15% of runtime (Part 08 ER-U11, §17.3); climax line ≤ 5 words, last word on a beat |
| 8 Resolution | CTA spoken and shown, then a silent lockup | CTA verb + destination; lockup still ≥ 2.0 s (30 s) or ≥ 3.5 s (60 s); explainer tails run 4-7 s with no speech (Part 08 §17.3) |

### 4.2 Stage windows by runtime (seconds · frames @30 · % of runtime)

All boundaries sit on a 120 BPM planning grid (1 beat = 0.5 s = 15 f; 1 bar = 2.0 s = 60 f), the one common tempo that is frame-exact at 24 and 30 fps (Part 08 §17.4.0). Re-snap to the real track with `npm run music` or by hand (cuts 0-2 f before the beat).

| Stage | 30 s (900 f) | 45 s (1350 f) | 60 s (1800 f) |
|---|---|---|---|
| 1 Hook | 0.0-2.0 · 0-60 · 6.7% | 0.0-2.5 · 0-75 · 5.6% | 0.0-2.5 · 0-75 · 4.2% |
| 2 Problem | 2.0-5.5 · 60-165 · 11.7% | 2.5-7.0 · 75-210 · 10.0% | 2.5-9.5 · 75-285 · 11.7% |
| 3 Reveal | 5.5-7.0 · 165-210 · 5.0% | 7.0-9.0 · 210-270 · 4.4% | 9.5-11.5 · 285-345 · 3.3% |
| 4 What it is (+ "how it works" overview in 60 s) | 7.0-8.5 · 210-255 · 5.0% | 9.0-12.0 · 270-360 · 6.7% | 11.5-17.5 · 345-525 · 10.0% |
| 5 How it works | 8.5-20.5 · 255-615 · **40%** (3 × 4.0 s) | 12.0-33.0 · 360-990 · **46.7%** (3 × 7.0 s) | 17.5-41.5 · 525-1245 · **40%** (3 × 8.0 s) |
| 6 Proof / result | 20.5-23.5 · 615-705 · 10.0% | 33.0-37.5 · 990-1125 · 10.0% | 41.5-47.0 · 1245-1410 · 9.2% |
| 7a Breather | merged into proof hold | 37.5-40.0 · 1125-1200 · 5.6% | 47.0-51.0 · 1410-1530 · 6.7% |
| 7b Climax | 23.5-25.0 · 705-750 · 5.0% | 40.0-41.5 · 1200-1245 · 3.3% | 51.0-53.5 · 1530-1605 · 4.2% |
| 8 Resolution | 25.0-30.0 · 750-900 · 16.7% (CTA 2.0 + lockup 3.0, ≥ 2.0 still) | 41.5-45.0 · 1245-1350 · 7.8% (CTA 1.5 + lockup 2.0, ≥ 1.5 still) | 53.5-60.0 · 1605-1800 · 10.8% (CTA 2.5 + lockup 4.0, ≥ 3.5 still) |

Checks against the master: product named at 5.5 s (30 s), 7.0 s (45 s), 9.5 s (60 s), inside the VO-led ceiling of ≈10 s (Part 01 §2.17 item 4). The mechanism block is 40-47% of runtime, inside the 40-57.5% proof band of Part 01 §2.3. The climax starts at 78%, 89% and 85%, inside the 78-90% band (Part 01 §2.3 "climax position"). Breather 6.7-12% (with the 7a merge at 30 s the proof hold is the breather), inside 9-15% when the proof hold is counted (Part 08 §17.3) [inferred for the merge].

### 4.3 The step block: micro-structure every "how it works" step follows

One step = one VO sentence pair = one actor causing one change. Same grammar three times so the viewer learns it once (Part 01 TS2: kivi repeats its loop 4×, Bumper 5× [V:1-6l8S] [V:19NRDv]).

| Micro-beat | 60 s step (8.0 s = 240 f) | 30 s step (4.0 s = 120 f) | Spec | Evidence |
|---|---|---|---|---|
| a. Chapter label | 0-30 f (1.0 s) | none (label lives in the shot's kicker) | "01 Connect": number ≥ 8% H cap, word ≥ 5% H cap; enters 6-8 f E-OUT; background flips polarity | Part 08 PL-90E shots 12, 16, 20 (1.5 s labels); ST-C2 kicker "01 / 04" |
| b. Context lands | 30-42 f | 0-12 f | Product card enters 12 f E-OUT, rise 5-8% H | Part 06 #4 |
| c. Actor approaches | 42-70 f (cursor travel 15-20 f + dwell 10 f) | 12-34 f (travel 12 f + dwell 10 f) | Anticipation 18-30 f total; arrow → hand on hover 3-15 f before the press | Part 06 UI-C4 (6/8 refs) |
| d. Press / trigger | f70 | f34 | Target changes on the press frame (≤ 1 f); button −15-20% scale over 3 f, release 6 f, 0% overshoot | [V:1i2L14 t=33.80s]; Part 06 UI-C6 |
| e. Consequence | f73-78 | f37-42 | First visible change 3-8 f after the press (≤ 15 f) | [V:1CSXtQ t=10.200-10.367s] |
| f. Working state (optional) | ≤ 15 f | ≤ 9 f | One "working" colour, settles in 6-8 f; never a fake progress bar | [V:15VhHR t=18.73-19.13s]; Part 06 UI-A16 |
| g. Empty container | 8 f | 6 f | Holds empty before content | [V:1-6l8S t=22.87-23.10s] |
| h. Result cascade | 13-22 f | 12 f | Elements every 3-4 f in reading order, each fading 4-6 f | [V:1-6l8S t=23.13-23.87s] |
| i. Cut-in on the value | instant 2-3.5×, holds 60-90 f | optional | The must-read value reaches cap ≥ 4% H (≥ 6% H in 9:16 terms: ≥ 96 px font) | [V:15VhHR t=6.57s] 3.4×; [V:19NRDv t=13.13s] 2.5× |
| j. Payoff hold | ≥ 30 f | ≥ 30 f | max(1.0 s, 0.33 s × words + 0.4 s); ×1.15 for Hindi/Hinglish | Part 06 UI-L2; Part 01 §2.12 |

Steps shrink slightly as the film goes on (kivi 14.75 → 11.03 → 6.69 s [V:1-6l8S]); at 60 s keep them equal at 8.0 s because each carries a VO sentence pair, but shorten the chapter label from 30 f to 24 f on step 3 if the VO runs long [inferred].

### 4.4 The carrier: one object that travels through the mechanism

Solar's concept is "follow the energy": sun → light → lamp → wafer → electrons → bolt → phone → word → battery → grid → money, each hand-off a shape or light-source match [V:1Hcg3X §2]. An explainer needs the same spine. Choose **one carrier object** (an invoice, a ticket, a data row, a message, a parcel, a coin) and hand it from step to step:
- It is the subject of the hook, the thing that changes state in every step, and the thing that resolves in the proof.
- It keeps one shape, one colour and one label in every shot (identity lock; Part 11 AA-06).
- Hand-offs are match cuts on its position (±5% W) or scale (Part 05 TR-03, TR-05), or a shared-element morph of 7-13 f (Part 05 TR-07; [V:126cpH t=11.03-11.43s]).

### 4.5 Energy and music arc (60 s)

| Time | Picture energy | Music | VO |
|---|---|---|---|
| 0-2.5 s hook | Medium: one moving element from f0 | Sparse (plucks, soft pulse) | First line starts ≤ 0.2 s after f0 (Part 08 PL-90E shot 1) |
| 2.5-9.5 s problem | Medium, cooler and denser; ends in a release (empty plate) | Sparse; 0.3-0.5 s gap before the reveal | Pause 0.3-0.5 s before the name |
| 9.5 s reveal | **Hero 1** | Lift (groove enters 0-2 f before the name) | Name on the hit |
| 17.5-41.5 s steps | Steady; a UI or camera beat every 0.8-1.5 s | Groove, flat, ducked −10 to −12 dB under VO | Two sentences per step |
| ≈38 s step-3 payoff | **Hero 2** (the "paid / done / sent" moment) | Accent hit in a VO gap ≥ 250 ms | Short pause |
| 41.5-47 s proof | Counter / before-after, then still | Groove | Sourced number |
| 47-51 s breather | ≤ 1/10 of peak motion | Low-passed or −7 to −9 dB breakdown | Slowest delivery of the film |
| 51-53.5 s climax | **Hero 3** at ≈86% | Build → hit on the last word | Thesis line |
| 53.5-60 s resolution | CTA, then dead still | Sting on the lockup ±2 f, tail to the last frame | CTA spoken; silence from 56 s |

Source: Part 08 BS-09 (three energy states and a build), PL-90E (VO pauses load each hero instead of music gaps), Part 09 SD-V5 (hits only in VO gaps).

---

## 5. Shot list template

Fill one row per shot before animating anything. Every UI row must pass the five-question test (Part 06 §8.0): who acted, what changed, would the real product do this, where was the eye one frame before, what is the one thing to read. Every row must also pass the **VO echo test**: what key word of this VO sentence is on screen, and does it appear 0-2 f before it is spoken?

| # | Stage | In-out (s) | Frames | Dur (f) | Shot type | VO line (words) | On-screen echo (cap px) | Carrier state | Actor + cause | UI source tier | Camera | Transition out | Music event | SFX (frame) | Anchor kept across cut |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Hook | 0.00-2.50 | 0-75 | 75 | Type + carrier | "…" (≤ 7) | "…" (≥ 70 px cap) | Unpaid / broken / waiting | — | T3 | Locked, breathe +6% | Empty-plate cut | Soft pulse f0 | Tick f0 | Carrier position |
| 2 | … | | | | | | | | cursor / tap / system / AI | T1-T4 | | | | | |

**Shot types:** problem vignette · stat card · reveal (name/logo) · definition title · steps overview · chapter label · UI wide (context) · UI continuous take · UI cut-in · mechanism diagram (2.5D) · result hold · before/after · breather · climax line · CTA card · lockup.

**UI source tiers** (Part 06 §8.2): T1 real UI captured at ≥ max zoom × delivery width; T2 vector rebuild of the real product; T3 stylised recreation with real data; T4 UI grammar only (gauges, chips, timelines, no product). Use T1/T2 for steps; T3/T4 for problem vignettes and mechanism diagrams. **Never** let a video model draw readable UI (Part 11 AA-02, AA-05).

**Per-shot spec block** (from Part 06 §8.17.1, with VO fields added):

```
SHOT <n> · <name> · <aspect> <W×H> · 30 fps · <duration f>
VO          : "<sentence>" in f<a> out f<b>; key word "<w>" onset f<k>
ECHO        : "<on-screen words>" reveal f<k-2>; cap <px>; hold to ≥ f<k + max(30, 10×words+12)>
CARRIER     : <object> <state A → state B>, position <x,y px>, kept within ±5% W across the cut
UI SOURCE   : <tier>; <components>; vector or ≥ <zoom × width> px
UI BIBLE    : bg <hex>; surface <hex>; ink <hex>; accent <hex>; alert <hex>; radius <px>;
              shadow y24/b48/7% + 1 px hairline 6%; font <family, weights>; cursor <type, px>
STATE TIMELINE:
  f<a>-f<b>  <element> <A → B>  ease <token>  cause <actor>
CAMERA      : locked | breathe +x% linear | callout ease 18 f to 45% W | cut-in ×n | pull-out 3×→1× in 24 f
SOUND       : VO; bed −10 to −12 dB under VO; SFX f<…> at −6 to −10 dB under VO; hit only in VO gap f<…>
MUST STAY UNCHANGED : <strings, values, carrier label, colours, cursor>
NEGATIVES   : no overshoot on UI/type; no text after its spoken word; no blur below 5% W/f; no generated text
```

**VO and caption cue sheet** (one row per caption cue; Part 09 SD-V3, Part 07 §9.11.4):

| Cue | VO text | Start (ms) | End (ms) | Reveal frame = round((start − 67) ÷ 1000 × 30) | Lines × chars (≤ 2 × 42) | Hold ≥ 25 f; ≤ 500 ms after last word | Shot # |
|---|---|---|---|---|---|---|---|

---

## 6. Style direction

### 6.1 Visual: pick one of three looks

| Look | Use when | Recipe | Evidence |
|---|---|---|---|
| **A. Clean product explainer (default)** | SaaS with a real UI; B2B; landing page | Light off-white canvas, frameless rounded UI cards (radius 24-32 px), one accent, real data, one carrier object; 2D with one optional 2.5D hero | [V:1CSXtQ] [V:1-6l8S]; ST-C2 |
| **B. Editorial 2.5D mechanism** | Invisible mechanism (energy, data flow, security, logistics); consumer or climate/fintech | 4-6 flat colours, background flips colour on every cut, one hero object per frame centred or on a third at 30-45% W, labels in negative space at x ≈ 15-20% / 80-85%, long hard shadows from one light direction, bloom only on emitters (1-2% of frame), monochrome grain 3-5% | [V:1Hcg3X §2, rules 3-4, 10-11] |
| **C. Hybrid (recommended for 60 s)** | Product with a UI *and* an invisible mechanism | Look B for hook, problem and the mechanism diagram; Look A for the three steps; the carrier object crosses between them | [inferred from V:1Hcg3X + V:1CSXtQ] |

Common rules:
- **One hero per frame; ≤ 3 readable items** (Part 06 UI-L5). Floating callouts ≤ 3, one fact each, 4 f stagger, anchored to what they describe.
- **Frameless UI**, 65-80% W in 16:9, ≈75% W (810 px) in 9:16. A phone frame only when "this happens on the client's phone" must be read [V:126cpH].
- **Card shadow @1080:** y 24 px, blur 48 px, black 6-8%, plus a 1 px hairline at ≈6%.
- **Depth:** 3 planes (background / UI / accent); 4 only in the hero beat. Depth from shadows and overlap, not blur, in Look B [V:1Hcg3X rule 11].
- **Real data in every visible row**; no lorem ipsum, no duplicate rows (Lottieicon's duplicate card is flagged [V:1ccYWJ t=17.9-18.1s]).
- **No stock "frustrated person" footage** for the problem. Show the problem in the product's world (a chat thread, a calendar, an overdue stamp), as HubSpot and kivi do [V:1CSXtQ] [V:1-6l8S].

### 6.2 Color

Build a five-role palette and keep the roles fixed for the whole film (Part 02 §11.2: one accent, one meaning).

| Role | Look A example (Nudgebill, §13) | Contrast on canvas | Look B example (Solar) [V:1Hcg3X] |
|---|---|---|---|
| Canvas | #F7F5F0 warm off-white (never pure #FFFFFF behind long reads) | — | Cream #F6F1ED, cyan #4DD9E5, vermilion #E12E16 alternating per cut |
| Ink | #16181D | 16.3:1 | Oxblood-black #1D0B0A |
| Accent = **resolved / the product's result** | Text #157A52 (4.89:1); fills #1F9D6B (3.16:1, graphics only) | ≥ 4.5:1 for text, ≥ 3:1 for marks | Mustard #F3C64E on emitters |
| Alert = **the problem** (inside UI only) | #C93A2E (4.67:1) | ≥ 4.5:1 | Vermilion |
| Muted (secondary text, the "before" bar) | #6B7079 (4.57:1); #8A8F98 (2.98:1) only for non-text marks | | — |

Rules:
- **Colour tells the story.** Problem shots desaturated and cool (surface #E9EBEE, ink #6B7079); the first accent colour appears on the reveal; the resolved state is the only large accent fill in the film (Part 02 §11.10 colour as narrative).
- **"Working" colour is a transition, not a state:** on 8-15 f, settled in 6-8 f, never held > 15 f (Part 06 UI-A16).
- **Text ≥ 4.5:1; data marks and state colours ≥ 3:1** (Bumper's violet-on-navy bars flagged [V:19NRDv t=11-14s]).
- **Look B:** never the same flat background on two consecutive scenes (exception: state changes in one set-up) [V:1Hcg3X rule 3].
- **Flash frames:** at most one per film, ≤ 3 f, at the conceptual peak only (photosensitivity) [V:1Hcg3X rule 13, §13 flaws].

### 6.3 Typography

| Role | 16:9 @1080 | 9:16 @1920 | Rule / evidence |
|---|---|---|---|
| Hook line | cap ≥ 6.5% H (≥ 70 px cap) | 128 px font min; hero word 230-250 px | Part 01 H5 |
| Problem / claim card | 90 px font (cap ≈ 63 px), ≤ 6 words | 128 px font | Part 07 #2 |
| Product name at the reveal | cap 9-12% H (100-130 px) | 200-240 px font | Part 07 §9.2.2 |
| Definition sub-line | cap 3.6-4% H (≈ 40 px), ≤ 12 words | ≥ 56 px font | [V:1Hcg3X rule 6] |
| Chapter number "01" | cap ≥ 8% H (≥ 86 px) | ≥ 160 px font | [inferred] from Part 07 label tier |
| Must-read UI text (the value, status, typed line) | cap ≥ 3% H (≥ 32 px cap, ≈ 46 px font); ≥ 4% H when the shot exists to show it | font ≥ 52 px | Part 06 UI-L1 |
| KPI after cut-in / proof counter | cap ≈ 6% H (≈ 65 px) or larger | ≥ 96 px font | [V:19NRDv t=23.85s] |
| Labels next to a mechanism object | cap 3.6-4% H; **never below 2.5% H** | ≥ 44 px font | [V:1Hcg3X rule 6]; its 2.2% H recap labels are flagged |
| Burned-in caption (optional, 9:16 only) | — | 52-60 px font, ≤ 2 lines × 32 chars, inside y 270-1210 | Part 07 §9.11; [inferred] for the 32-char 9:16 width |
| CTA | cap ≥ 5% H (≥ 54 px) | ≥ 64 px font | Part 01 L5 |
| URL | ≥ 3.5% H | ≥ 52 px font | Lottieicon's 2% H URL flagged [V:1ccYWJ] |

- **Two families max, fixed roles.** One grotesk for everything (Inter-like, 400 calm / 600 emphasis). Optional serif accent for **concept words only** (the product name, "how", the chapter word), as Solar uses serif for "SOLAR", "photo", "voltaic" [V:1Hcg3X §8]. Kit fonts: Inter + Instrument Serif.
- **Sentence case**, tracking 0 on lines, −1 to −3% on lowercase display; UI body leading 1.4-1.6, display 0.95-1.1.
- **Left-align editorial text blocks** on a column edge (≈13% W) in Look B; centre single lines (Part 02 CO-U12).
- **Echo, don't transcribe.** On-screen text is the VO's key noun phrase (2-6 words), not the full sentence. Full captions go in a sidecar file (SRT/VTT), or burned-in only for the 9:16 cut.
- **0% overshoot on type and UI** (8/8 references at 0% on type; Part 03 #22).

---

## 6b. Technique classes for this format

Each row cites master IDs; the class of an ID is the master's (U universal, S style-specific, X experimental, A avoid, SaaS). The format column says how this format uses it. Assignments to this format are [inferred] from the guideline's own sections unless an evidence tag is given.

| Class | Techniques for this format (master IDs) |
|---|---|
| Universal | One carrier object through the whole explanation (P01 T6); staggered reveals ML-08; match cuts TR-03, shape matches TR-05; breathing holds CM-02 (scale) with ≤0.2 % W/f translation while reading |
| Format-specific | VO-led explainer pacing (P08 PL-90E; DU-S VO explainer row); editorial 2.5D look with world labels (ST-F1) or the how-to series look (ST-C2) [S]; long-settle wipes with E-SETTLE for text-carrying panels; vertical scroll for progression |
| Experimental | Integrations hub as the mechanism shot (UI-E21 [S, SaaS]); text-to-object transitions TP-04 / TP-12 [X]; a continuous take over 6.3 s (DU-X1) |
| Avoid | Captions and supers fighting each other; text events under 25 f; VO over a structural hit (P09 SD-V5); greeked UI in a shot that must be read |
| Especially good for SaaS | UI morph from the concept to the product (TR-07); progress and empty states UI-E22; a recap triptych before the CTA (T6) |

## 7. Motion language with numbers

### 7.1 Ease tokens (Part 03 §19.3)

| Token | cubic-bezier | Use in an explainer |
|---|---|---|
| E-OUT | (0.33, 1, 0.68, 1) | Cards, labels, chapter cards, words (23% of travel on f1, 90% by f7 of 12 f) |
| E-SNAP | (0.05, 0.7, 0.1, 1) | Small pops (chips, check marks), the reveal name |
| E-SNAP-L | (0, 0, 0, 1) | Counters landing on a final value |
| E-GLIDE | (0.25, 0.1, 0.25, 1) | Cursor travel, panel slides, callout camera |
| E-INOUT | (0.65, 0, 0.35, 1) | Pull-backs, deliberate cursor travel |
| E-SETTLE | cubic-bezier(0.45, 0, 0, 1), 45-72 f (P03 §19.3) | Long-settle wipes that introduce text: 2.3-2.4 s, ≈ 0.5-0.7 s acceleration, ≈ 1.7 s deceleration [V:1Hcg3X rule 8] |
| E-EXIT | (0.3, 0, 0.8, 0.15) | Anything that leaves on a cut; whip exits |
| E-LINEAR | (0, 0, 1, 1) | Breathing pushes, line draws, colour ramps |
| E-CRIT | spring stiffness 179, damping 26.8 | When a spring API is required but overshoot is not allowed |

Never Remotion's default spring (damping 10 → 16.3% overshoot) or After Effects' default Easy Ease for entrances.

### 7.2 Speeds

| Element | Duration / rate | Stagger | Evidence |
|---|---|---|---|
| Text reveal (Look B) | Opacity + blur 8 px → 0 over 2-5 f; optional rise 10-15% H over 5-8 f E-OUT | Words or lines 4-10 f | [V:1Hcg3X rule 5] |
| Text reveal (Look A) | 12 f E-OUT, rise 5-8% H, opacity over 6-8 f | Words 2-4 f | Part 06 #4, #8 |
| Echo word timed to VO | Reveal starts 2 f (67 ms) before the spoken onset | — | Part 09 SD-V3 |
| Chapter card | Enter 6-8 f E-OUT; hold ≥ 18 f; exit 4-6 f E-EXIT | Number then word, 4 f | [inferred] from Part 07 kinetic tier (build ≤ 12 f, hold 10-14 f, exit 4-8 f) |
| Card entrance | 12 f E-OUT | Cards 4 f | Part 06 #4 |
| Microinteractions (toggle, label swap, pressed) | 1-3 f | — | [V:1CSXtQ t=10.200-10.333s] |
| Dropdown | 6 f | Rows 2 f | [V:1CSXtQ t=8.867s] |
| Result cascade | 8-9 f empty, then 13-22 f | Elements 3-4 f, each fading 4-6 f | Part 06 #7 |
| Counter | 1.0 s E-SNAP-L: ≈ 70% of the range in the first 25% of the time; then still ≥ 1.0 s | — | [V:19NRDv t=23.85-24.93s] |
| Line / route draw (mechanism arrows) | 12-20 f E-LINEAR or E-OUT | Segments 3-4 f | Part 03 §18.4 |
| Discrete states (empty / full / paid / alert) | **0 f snap**, ideally on a VO word or beat | — | [V:1Hcg3X rule 15] |
| Shared-element morph (card → toast) | 7-13 f; background re-focus 11-12 f | — | [V:126cpH t=11.03-11.43s] |
| Physical-object accent (Look B only) | Tilt 10-14° snapped in 1 f, ≤ 1 small overshoot (+5°), settled 12-15 f | — | [V:1Hcg3X rule 9] |

### 7.3 The shot envelope

Every shot breathes; nothing freezes except the end lockup.
- **Arrival:** expo-out, 50% of travel in 3-5 f, ×0.85-0.9 speed per frame, 90% settled by 10-14 f [V:1Hcg3X rule 1].
- **Body:** scale and translation are separate rules. **Scale (CM-02):** a linear push of +8-12% across the hold (+3-8% in calm looks). **Translation:** **≤ 0.2% W/f while text is being read**; a drift of 0.3-0.5% of frame per frame only on text-free flat illustration (Look B, Solar [V:1Hcg3X t=0.37-0.97s]) (Part 04 #1-3).
- **Exit:** E-EXIT over 6-11 f, accelerating ×1.4-1.9 per frame to 15-20% of frame per frame; cut on the first empty frame (0-1 f of clean plate) [V:1Hcg3X rules 1-2].
- **Holds:** a fully still frame lasts ≤ 5 f anywhere except the end lockup (0.8-2.2 s measured; default ≥ 2.0 s in 30 s, ≥ 3.5 s in 60 s) [V:1Hcg3X rule 1]; [V:1CSXtQ t=27.37-30.03s].
- **One primary motion per frame** (a cascade counts as one gesture) plus ambient drift (Part 06 #22).
- **Motion is quieter while the VO explains.** Peak motion goes in VO gaps and on transitions; during a spoken sentence, only the element being named moves (Part 09 SD-V5 applied to picture [inferred]).

### 7.4 Cursor and typing (step blocks)

- **Cursor:** native OS arrow → hand on hover, ≈ 2% H (≈ 22 px) for real UI; brand cursor 3-4% H for stylised UI. Enters from the bottom or right edge (5/6 refs). Short hop < 20% W: 8-12 f E-OUT; across UI 20-50% W: 15-20 f E-GLIDE (peak ≈ 4% W/f on f3-4); deliberate: 25-27 f E-INOUT. Gentle arc, no overshoot, no wiggle. Parks beside the result during reads. One cursor style for the film (Part 06 UI-C1-C8).
- **9:16 phone UI:** a tap ripple (12-16 px ring expanding to ≈ 80 px over 8 f, fading) and a pressed state, not a desktop arrow (Part 06 §8.12) [inferred ripple size].
- **Typing:** a line the viewer must read 15-20 chars/s; key noun 7-9 chars/s; filler 28-35 chars/s. Human gaps 170-200 ms between words, 0.9-1.1 s at phrase breaks; caret 9 f on / 9 f off (Part 06 UI-K1-K3). **Machine output streams faster** (≈ 2 f per word) than human input, which is itself the claim (Part 09 SD-V4; [V:1-6l8S rule 6]).

---

## 8. Camera language

| Move | Numbers | Use in an explainer | Evidence |
|---|---|---|---|
| **Locked + breathe (default)** | Push +5-10% across a 1.5-4 s hold, linear | Every VO sentence | Part 04 CM-02 |
| **Zoom-to-callout** | Camera eases 18 f (≈ 0.6 s) to make the focus area ≈ 45% W; outside dims to 40% over 9 f; focus ring draws 10 f | "This is the part I'm talking about" on a VO clause | ST-C2 prompt seed (proposal values, [inferred]) |
| **Cut-in** | 2-3.5×, instant; target cap reaches 4-7.5% H | The one value or control a step depends on | [V:15VhHR t=6.57s] 3.4×; [V:19NRDv t=13.13s] 2.5× |
| **Pull-out reveal** | Start ≈ 3× on the meaningful icon; reach 1× in ≈ 24 f E-OUT (first frame removes ≈ 22% of size) | Device or UI appears from its key icon ("it lands on your client's phone") | [V:1Hcg3X rule 14, t=14.30-15.30s] |
| **Reveal pull-back** | ×0.75-0.80 over 21-31 f, E-INOUT | Definition → full product UI | [V:1CSXtQ t=8.0-9.03s] |
| **Vertical scroll / pedestal** | Drift 0.3-0.5% H/f; whip tilt 6 f expo-in into the cut | Look B progression ("next, the energy goes…"); vertical = progression, horizontal = context | [V:1Hcg3X rule list; §16 "whip direction rule"] |
| **Focus by subtraction** | Dim context to 15% (texture) or 40-50% (secondary) in 3-9 f; or rack focus 8-12 f | Point without moving the frame | [V:1ccYWJ t=9.833s]; [V:126cpH t=11.07-11.43s] |
| **Hero depth move (≤ 1 per film)** | Pull back ×0.57 in 10 f, then ×0.56 decelerating over 18-20 f; or tilted UI planes 15-35° in transit, flattened to 0° in 7-8 f before reading | Mechanism hero: "where the data goes", "how the money moves" | [V:1CSXtQ t=17.80-19.03s]; [V:19NRDv t=16.77-20.50s] |

Rules:
- **Land, then read.** No zoom, pan or scroll while the viewer reads a must-read value (Part 06 UI-Z5).
- **Unblurred speed ≤ 5% W/f;** 5-10% W/f needs 180° blur; above 10% W/f only as a whip into a cut (Part 04 #7). Lottieicon's 22-27% W/f unblurred pans strobe [V:1ccYWJ t=30.57-32.57s].
- **Roll 0°, camera overshoot 0%** (8/8 references).
- **True 3D / DOF budget:** one hero beat, ≈ 10-15% of runtime (HubSpot 3.67 s of 30 s [V:1CSXtQ]). Look B: 0% true 3D, 2.5D only (Part 10 HY-S5).
- **Camera budget by runtime:** ≤ 1 camera move per shot; at 60 s ≈ 8-12 authored moves, the rest locked + breathe (Part 04 §6.4) [inferred count from 22 shots].

---

## 9. Transitions

Defaults (Part 05 §0.3, §7.5): one scene change every ≈ 2.5-3 s in a VO film (on sentence boundaries, Part 08 BS-11); **≥ 70% hard cuts**; one signature device used 3-12 times; 2-4 hero one-offs per film.

| Transition | Spec | Where in the explainer | Evidence |
|---|---|---|---|
| **Hard cut on a VO sentence end** (default) | Picture leads: cut 0-2 f before the next sentence's first syllable; never mid-word | Most cuts | Part 08 BS-11 |
| **Empty-plate cut** (signature, Look B) | Subject exits E-EXIT 6-11 f; 0-1 f clean background; hard cut; incoming motion continues the same screen direction | Problem → reveal; between steps | [V:1Hcg3X rules 1-2] |
| **Carrier match cut** (signature, Look A/C) | Carrier keeps position ±5% W and/or scale across the cut; state changes at the cut | Step → step; problem → product | [V:1Hcg3X rule 12]; Part 05 TR-03, TR-05 |
| **Polarity / colour-field flip** | Background flips dark ↔ light (or to the next palette colour) on the cut | Into each chapter label; problem world → product world | [V:19NRDv]; [V:1Hcg3X rule 3] |
| **Click- or tap-caused cut** | Cut 3-8 f after the press; or a bloom from the pressed element over ≈ 6 f | ≥ 2 per film (the connect click, the pay tap) | Part 06 UI-P8; [V:1CSXtQ t=10.267-10.367s] |
| **UI morph / shared element** | 7-13 f | Card → notification; message → paid toast | [V:126cpH t=11.03-11.43s]; [V:15VhHR t=3.97-4.23s] |
| **Light-source match** | Shrink the outgoing light to a ≈ 4% W point in 2 f, hold 2 f, reveal the incoming light at the same position | Look B mechanism hops | [V:1Hcg3X rule 12, t=3.17-3.43s] |
| **Blur / defocus dissolve** | 6-8 f (4-8) | Into the breather | [V:1CSXtQ t=21.47s] |
| **Recap strips** (optional, 45-60 s) | Previous step shots slide in as strips that travel as one train (expo-out ×0.92/f, second strip 0.33 s behind) and lock into exact thirds | Climax recap of the three steps, then logo/CTA | [V:1Hcg3X rule 16] |
| **Punch into a cut** | +18-33% scale over the last 3-8 f, expo-in; ≤ 1 per 15-20 s | Climax line → CTA | [V:1-6l8S t=7.83s] |

Hand-off grammar: last 6-10 f before a cut accelerate (expo-in); the first frames after settle (40-64% of travel on f1). Matched elements within ±5% W. **Section turns land within ±2 f of an audio event** (a VO onset, a beat or a hit) (Part 08 BS-12, story-led target 100%). Overshoot on transition elements 0%.

Avoid: crossfades between UI states (software changes instantly), spins, page curls, glitch transitions, > 2 mask wipes per film, a 1 f dip to black (Bumper's flaw [V:19NRDv t=25.60s]), more than one flash moment, and whips in random directions (fix a rule: vertical = next step, horizontal = context) [V:1Hcg3X §16].

---

## 10. UI treatment

### 10.1 Believability laws (Part 06 §8.1)

1. **Cause:** every state change has an actor visible within the previous 30 f (cursor, tap, the system on a schedule shown as a clock/timeline node, an incoming message).
2. **Order:** steps follow the real product flow and the order the customer meets them (ST-C2).
3. **Speed:** microinteractions at real UI speed (1-6 f) inside a slow camera.
4. **Focus:** one thing changes at a time; the container is still while its content changes.
5. **Payoff:** every step ends on a readable result held ≥ 1.0 s.

**Explainer-specific laws:**
6. **Automation needs a visible clock.** If the product acts "on its own", show the trigger as a schedule node, timestamp or calendar tick lighting up 3-8 f before the action, so the cause is still on screen [inferred from law 1].
7. **Both sides of the transaction, once.** If the mechanism involves another person (client, customer, teammate), show their side exactly once, in its native device (a phone for WhatsApp/UPI), then return to the user's side for the result [V:126cpH single-transaction story].
8. **The mechanism diagram is UI grammar, not decoration.** Nodes, arrows and chips must correspond to real system parts; every arrow draws in the direction data or money moves, 12-20 f, while the VO names it (Part 06 UI-E21, UI-E22).

### 10.2 Choreography patterns for the three steps

| Pattern | What happens | Best for | Source |
|---|---|---|---|
| UI-P1 Say → See | Input card 8 f; words stream ≈ 6.9 words/s, each 30% → 100% opacity in 3-4 f; continuity cut; empty hold 8 f; cascade 3-4 f stagger | AI, voice, "describe what you want" | [V:1-6l8S t=17.03-25.47s] |
| UI-P2 Text → UI build | Headline typed; 0.6 s hold; bar border 1-3 f, icon 3 f, toolbar 4-5 f; pull-back ×0.75 | "What it is" stage: the definition becomes the product | [V:1CSXtQ t=2.13-10.367s] |
| UI-P5 Context → extraction → focus | Tables fly in 12 f; relevant column lifts 0.5 s; push-through 9 f; state-change fill 4-5 f = "matched" | "It finds every X" (step 1 of most sync/automation products) | [V:19NRDv t=16.73-21.55s] |
| UI-P6 Card → notification morph | Cursor 8 f, dwell 10 f, press, hold 10 f, card collapses into a pill ≈ 7 f, rack focus 11 f; status cycles, each ≥ 1.0 s | "It sends / notifies / delivers" | [V:126cpH t=9.27-13.60s], 2 f status flaw fixed |
| UI-P9 Before / after toggle | Cursor parks; "Without / With" toggle knob ≈ 4 f; "after" bar rises ≈ 7 f beside a ghost; 2.5× cut-in to a tooltip | Proof stage | [V:19NRDv t=11.00-14.33s] |
| Data-viz state snap | Continuous values ease; discrete states (empty / full / alert) snap in 0 f on a VO word; alert icon rides the value line | Mechanism with a level (storage, budget, quota) | [V:1Hcg3X rule 15] |
| Locked-anchor montage | Anchor fixed; context swaps behind it at 21 → 30 → 39 f; the last is the hero case | "Works with every …" in the proof stage | [V:15VhHR t=8.63-12.83s] |

### 10.3 Legibility contract (Part 06 UI-L1)

| Tier | Contents | 16:9 minimum | 9:16 minimum | If smaller |
|---|---|---|---|---|
| Must-read | The value, the status, the step's one string, the CTA | cap ≥ 3% H; ≥ 4% H when the shot exists for it | font ≥ 52 px | Cut in 2-3.5× |
| Should-read | Column headers, tab names, labels next to diagram nodes | cap 2.5-3% H | ≥ 36 px | Treat as texture |
| Texture | Everything else | < 2.5% H | < 36 px | Must still be real content |

All 8 references put meaning in micro-text and all 8 teardowns flag it (Part 11 MK-01). In an explainer the VO can name a value the eye cannot read; that is not enough. If the VO says it, the screen must show it at must-read size.

### 10.4 Resolution

Rebuild UI as vector, or supply rasters at ≥ max zoom × delivery width: a 3× cut-in on a 1920 px delivery needs a ≥ 5760 px-wide source. HubSpot's greeked, low-res page at its hero beat is its main flaw [V:1CSXtQ t=18.4-19.0s].

---

## 11. Sound and music

### 11.1 Voice-over

| Parameter | Value | Evidence |
|---|---|---|
| Mode | Narrator (explainer default); "no voice, type narrates" for the 9:16 cutdown if the VO is cut | Part 09 §16.10.1 |
| Pace | **150-170 wpm (2.5-2.8 words/s)**; 150-155 for second-language audiences; kit estimate 2.6 w/s (Latin), 2.3 w/s (Devanagari) | Part 09 SD-V2; `voice.ts` |
| Delivery | Calm, warm, conversational; slowest on the breather / vision line; no "announcer" lift | Part 09 SD-V2 [S:Thomson Reuters] |
| First word | Within 0.2 s of f0 | Part 08 PL-90E shot 1 |
| Sentence length | ≤ 12 words; one idea; a 0.3-0.5 s pause before each hero moment | Part 08 PL-90E notes [inferred] |
| Silent tail | 3-5 s (30-45 s), 4-7 s (60 s) of no speech over the lockup | Part 08 §17.3 |
| On-screen sync | Echo word reveal 2 f before the spoken onset: `frame = round((startMs − 67) / 1000 × 30)`; never after | Part 09 SD-V3 |
| Captions | ≤ 2 lines × 42 chars per cue, 2.4-3.5 s per cue, hold ≥ 25 f, ≤ 500 ms after the last word, ≥ 2 f between cues; sidecar SRT/VTT for every delivery | Part 07 §9.11.4; Part 08 SD-06 |
| TTS | Request word timestamps and align reveals to them; ElevenLabs `eleven_multilingual_v2` for Hindi/Hinglish; `{stability 0.7, similarity_boost 0.5, style 0, use_speaker_boost true}`; one request per scene with `previous_request_ids` (≤ 3) | Part 09 SD-V7 |
| Never | A real customer's words through TTS; generated-video audio left in | Part 09 SD-V8, SD-V9 |

### 11.2 Music

- **Tempo (P09 SD-U8):** VO-led, a bed with a **felt pulse of 60-90 BPM** (SD-U8 VO-led exception); type-led or music-led, **83-110 BPM** (inside SD-U8's 83-128 band). Safe defaults: **120 BPM in half-time feel** (beat 15 f, bar 60 f, felt 60) for calm and editorial explainers, as Solar's 64.6/129 bed [V:1Hcg3X §12]; **100 BPM** (beat 18 f) for product-led SaaS, the reference median (Part 09 §16.3). Whole-frame tempos at 30 fps: 90 (20 f), 100 (18 f), 112.5 (16 f), 120 (15 f).
- **Shape:** flat and compressed under the VO (Solar σ 1.7 dB) — drama comes from the picture (Part 08 ER-10 exception) — but still three energy states and a build: sparse under the hook and problem, groove from the reveal, a low-passed breakdown (−7 to −9 dB) in the breather, a build into the climax, a sting on the lockup (Part 08 BS-09).
- **Ducking:** music −10 to −12 dB under the narrator, attack 30-80 ms, release 250-700 ms; carve 2-4 dB at 1-4 kHz while the voice speaks (Part 09 §16.10.3).
- **Music never ends before the picture.** Last musical event on the lockup frame ±2 f, tail to the last frame (Lottieicon's music is gone 3.7 s early [V:1ccYWJ]; Part 08 BS-10).
- **Genre:** minimal electronic or organic pulse with plucks and pads; no lead melody under the VO (a melody competes with speech) [inferred from Part 09 SD-V4 "no new melodic material while the product speaks"].

### 11.3 SFX map (Part 09 §16.7, adjusted for VO)

| Family | Use in an explainer | Place at | Level | Budget / 60 s |
|---|---|---|---|---|
| F01 UI click | The press that triggers each step | **Press frame (0 f)** | 6-10 dB under the VO; clear in a VO gap | 2-4 |
| F03 Toggle / latch | Tone toggle, connect switch | Press frame; tick on settle +1-3 f | As F01 | 0-2 |
| F04 Soft tone (ping, success) | "Paid", "sent", "done" | First full-opacity frame of the result | Blended, 3-6 kHz, +0-4 dB in band | 1-3 |
| F05 Tick / pop | Chapter labels, chips, check marks | First frame of the element | −8 dB | 3-6 |
| F06 Counter ticks | Proof counter | ≤ 15 ticks/s, one lock accent on the final value | Low | 0-1 |
| F07 Whoosh | One big move (whip or hero depth move) | **Peak on the fastest frame** | +3 to +6 dB above 4 kHz | 0-2 |
| F09 Riser | Into the reveal and into the climax | Crest 0-2 f before the hit | ≈ −12 dB at crest | 1-2 |
| F11 Impact / hit | Reveal, step-3 payoff, climax | Event frame ±2 f, **only in a VO gap ≥ 250 ms** | +8 to +15 dB over the bed | 2-3 |
| F16 Ambient floor | Every "silence" | Continuous | −40 to −45 dB | always |
| F17 Sting | Lockup | ±2 f of its first full frame | Loudest sustained moment | 1 |

Rules: one click per state change; sound on 15-65% of transitions, never all; never put a structural hit under a stressed word (Part 09 SD-V5).

### 11.4 Loudness

- Social (Reels, Shorts, TikTok, YouTube, LinkedIn): **−14 LUFS ±1, true peak ≤ −1 dBTP**.
- Landing page / help centre embed, VO-led with music: **−16 LUFS** [inferred compromise]; speech-dominant how-to with little or no music: **−18 LUFS** (AES77); ≤ −1 dBTP (Part 09 §16.11.1).
- Measured failures to avoid: NOSTRA −7.9 LUFS with +1.6 dBTP clipping [V:1i2L14]; kivi −10.7 LUFS [V:1-6l8S].

---

## 12. Copy rules

### 12.1 Structure of the script

Write the VO first, then the on-screen echo, then the picture. One sentence per shot, one idea per sentence.

| Stage | VO (60 s) | On-screen echo | Rule |
|---|---|---|---|
| Hook | 4-7 words, a question or a blunt statement in the viewer's words | Same words, or the key 2-4 | No product name, no jargon, no "Introducing" |
| Problem | 2-3 sentences, 15-20 words; one sourced number | One phrase per sentence + the number | Concrete, not abstract ("41 days", not "slow cash flow") |
| Reveal | "Meet X." / "That's why we built X." | The name | Name lands on its spoken word |
| What it is | 6-10 words: category + benefit | ≤ 8 words | "X does Y for you", not features |
| Steps (×3) | Sentence 1: what you do (imperative, ≤ 8 words). Sentence 2: what it does (≤ 12 words) | Chapter label: number + one verb ("01 Connect") + the step's one value | Verbs in the order of use: Connect / Set / Get |
| Proof | One number with its source and period | The number at ≥ 6% H + source line | Never unsourced; never "up to" |
| Breather | Three short negations or a vision line, slowest delivery | ≤ 3 lines, earlier ones dim | ≤ 3 same-treatment cards in a row (Part 01 §2.12) |
| Climax | ≤ 8 words, the thesis; often "You do A. X does B." | ≤ 5 words | Closes the hook's loop (6/8 refs repeat the hook's line, colour or motif) |
| CTA | Verb + destination, spoken URL | Button/link ≤ 16 chars, 1-3 words; URL ≥ 3.5% H | One action only |

### 12.2 Word budgets

- **On-screen:** hook ≤ 7 words (median 4); claim cards ≤ 6 words, ≥ 0.3 s per word, ≥ 1.0 s total for 3+ words; payoff ≥ 1.0 s still (Part 01 §2.12).
- **Spoken:** 30 s ≈ 65-75 words; 45 s ≈ 100-115; 60 s ≈ 135-150 (Part 08 §17.3).
- **Sound-off check:** read only the on-screen text in order. It must still tell problem → product → three steps → number → action.
- **Numbers on screen as digits, spoken as words** ("41 days" on screen, "forty-one days" in `say`; kit recipe copy tips).
- **Sentence case, no exclamation marks, no hype adjectives** ("revolutionary", "seamless", "next-gen"). One hype phrase per film at most [V:1CSXtQ "For the first time ever"].
- **Every number needs a client-supplied source** printed as a kicker ("Beta, 212 users, Jun-Aug 2026"). No source → cut the number and use a before/after state instead.

### 12.3 Hook examples (pattern → example)

| Pattern | Example | Best for |
|---|---|---|
| Pain question, live-typed | "Still chasing invoices?" | Productivity, finance tools [V:1-6l8S "Still typing?"] |
| Curiosity question title | "How does Nudgebill get you paid?" | Explainers with a known brand [V:1Hcg3X "How Do SOLAR PANELS work?"] |
| Cost statement | "41 days. That's how long you wait." | Problem with a sourced number |
| Objection flip | "Awkward follow-ups? Not your job anymore." | Social cutdown (T12) |
| Before/after in one line | "From 'Seen' to 'Paid'." | Products with a visible state change |
| Hinglish (9:16, Indian audience) | "Invoice bheja. Paisa aaya?" / "Client ne 'Seen' kiya, pay nahi?" | Indian freelancers, SMBs; ×1.15 read time |

### 12.4 CTA examples by placement

| Placement | Form | Example |
|---|---|---|
| Landing page hero (visitor already on site) | Quiet link | "Start free →" (no URL) |
| YouTube / LinkedIn pre-roll | Link + spoken URL | "Try it free" · nudgebill.in |
| Paid social 9:16 | Button + offer kicker | Kicker "Free for 30 days" · button "Try free" |
| Sales deck | Next step | "Book a 15-min walkthrough" |
| Onboarding email | Action in product | "Connect your invoices →" |
| Hinglish social | Comment keyword or button | "Comment karo NUDGE" (only if someone will reply) · "Free mein try karo" |

---

## 12b. Typography

One place for this format's type decisions; sizes are P07 §9.2 tokens (font px at 1920×1080 / 1080×1920), entrances and exits follow P03 SP-T0, word budgets and holds follow P01 H2 and P07 §9.11.

| Item | This format |
|---|---|
| Families and weights | Two families max, fixed roles: one grotesk (400 calm / 600 emphasis), optional serif accent for concept words only (§6) |
| Size tokens | T-STATEMENT 90 / 128 px; T-LABEL 56-62 / 60-72 px for world labels; T-CAPTION 52-60 px font, ≤2 lines (9:16 burned-in captions ≤32 characters per line [inferred]); T-UI-READ 43-64 / ≥52 px |
| Reveals | RV-14 staggered line fade, RV-12 mask / line wipe (E-SETTLE 45-72 f for text-carrying panels), RV-03 blur-fade labels, RV-25 count-up |
| Exits | EX-02 blur dissolve, EX-14 dim when superseded, EX-13 status swap |
| Word budget | Hook ≤7 words (≤5 in 9:16); claim cards ≤6 words; supers appear 0-2 f before the word is spoken, never after (P07 §9.11.4) |
| Holds | Punch word 10-15 f; kinetic line of ≤3 words ≥10-14 f landed; statement of 4-6 words ≥0.8 s landed; payoff, result or status ≥1.0 s still; no text event under 25 f except SD-03 punch cards in a run (P07 §9.11.2, P08 §17.8 #3-4); lockup ≥1.5 s still (2.2 s premium) |
| Floors | Must-read text inside the safe area (16:9 x 96-1824, y 54-1026; 9:16 x 120-840, y 270-1210); 9:16 body font ≥52 px; contrast ≥4.5:1 (3:1 large), ≥7:1 or a ≥60 % scrim over footage (P07 §9.21, P11 G-27, G-37) |

## 13. Worked example: "Nudgebill", 60 s, 16:9 master (Look C, VO-led)

**Fictional product.** Nudgebill chases unpaid invoices for Indian freelancers and small agencies. It connects to the user's invoicing tool, finds unpaid invoices, sends polite reminders on WhatsApp and email on a schedule, and puts a UPI pay link in every reminder. When the client pays, the invoice is marked paid and the reminders stop.
**Format:** 1920×1080, 30 fps, 1800 f. **Template:** T6 energy chain (carrier = invoice #0412, ₹48,000, client "Rhea") with three T4-style step blocks. **Look:** C hybrid. Problem shots desaturated (surface #E9EBEE, ink #6B7079); product world canvas #F7F5F0, ink #16181D, accent text #157A52 / fill #1F9D6B (= paid / resolved only), alert #C93A2E (= overdue, inside UI only). One key light from the upper left; all shadows fall down-right (y 24, blur 48, 7%). **Type:** Inter 400/600 + Instrument Serif for "Nudgebill" and the chapter words. **Music:** 120 BPM half-time feel (beat 15 f, bar 60 f), flat bed ducked −11 dB under the VO. **VO:** warm, calm, Indian-English, ≈ 165 wpm inside sentences, 130 words, speech ends 55.9 s.
**Claims are placeholders:** "41 days" and "9 days" must be replaced by sourced client figures (or the shots replaced by a before/after state) before release.

### 13.1 VO script and cue sheet

| Cue | VO | In-out (s) | Words | On-screen echo | Shot |
|---|---|---|---|---|---|
| 1 | "Sent the invoice. Still not paid?" | 0.20-2.40 | 6 | "Still *not paid*?" | 1 |
| 2 | "So you chase. A WhatsApp," | 2.55-4.45 | 5 | chat bubble 1 | 2 |
| 3 | "then an email, then another." | 4.55-6.45 | 5 | bubbles 2-3 + email | 3 |
| 4 | "Freelancers wait forty-one days to get paid." | 6.60-9.20 | 7 | "41 days" | 4 |
| 5 | "Meet Nudgebill." | 9.60-10.40 | 2 | "Nudgebill" | 5 |
| 6 | "It chases unpaid invoices for you. Politely. Automatically." | 11.00-14.60 | 8 | "Chases unpaid invoices *for you*." | 6 |
| 7 | "Here's how it works, in three simple steps." | 15.00-17.40 | 8 | "Connect · Schedule · Get paid" | 7 |
| 8 | "Connect your invoicing tool once." | 17.70-19.50 | 5 | "01 Connect" | 8-9 |
| 9 | "Nudgebill finds every unpaid invoice." | 20.00-22.00 | 5 | invoice list | 9 |
| 10 | "Fourteen, in this case." | 22.60-24.10 | 4 | "14 unpaid · ₹3,12,000" | 10 |
| 11 | "Pick a tone and a schedule." | 25.70-27.90 | 6 | "02 Schedule" · "Friendly" | 11-12 |
| 12 | "It sends friendly reminders on WhatsApp and email," | 28.10-31.10 | 8 | timeline nodes | 12-13 |
| 13 | "so you don't have to." | 31.20-32.80 | 5 | reminder bubble | 13 |
| 14 | "Every reminder carries a UPI pay link." | 33.60-35.90 | 7 | "03 Get paid" · "Pay via UPI" | 14-15 |
| 15 | "Your client taps, pays," | 36.00-37.30 | 4 | tap → ✓ | 15 |
| 16 | "and the reminders stop on their own." | 37.90-40.30 | 7 | "*Paid* · reminders stopped" | 16 |
| 17 | "Beta users got paid in nine days, not forty-one." | 41.60-44.40 | 9 | "9 days" vs "41 days" | 17 |
| 18 | "Works with WhatsApp, email and UPI." | 44.60-46.80 | 6 | three chips | 18 |
| 19 | "No awkward follow-ups. No spreadsheets. Just paid invoices." | 47.20-50.80 | 8 | three lines | 19 |
| 20 | "You do the work. Nudgebill does the chasing." | 51.00-53.20 | 8 | "You work. *It chases.*" | 20 |
| 21 | "Try it free at nudgebill dot in." | 53.60-55.90 | 7 | "Try it free" · nudgebill.in | 21 |
| — | (no speech) | 55.40-60.00 | 0 | lockup | 22 |

Total 130 words in ≈ 47 s of spoken sentences (2.77 words/s, 166 wpm inside sentences; 140 wpm averaged over 0.2-55.9 s including pauses). That sits at the lower edge of the 135-150-word budget on purpose: the pauses load the heroes. Hero hits sit in VO gaps: 9.20-9.60 (reveal), 37.30-37.90 (paid), 53.20-53.60 (climax) and after 55.9 (sting).

### 13.2 Storyboard

Cut frames: 0 · 75 · 135 · 195 · 285 · 345 · 450 · 525 · 555 · 675 · 765 · 795 · 900 · 1005 · 1035 · 1125 · 1245 · 1335 · 1410 · 1530 · 1605 · 1680 · 1800. All on the 15 f beat grid; each cut lands 0-2 f before the next VO sentence or on a beat.

| Scene | Timestamp | Duration | Visual | UI / product action | Camera | Object motion | Text | Transition (out) | Lighting | Sound | Music | Motion notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 Hook | 0:00.00-0:02.50 (f0-75) | 2.50 s (75 f) | Invoice #0412 card (34% W, centred-left) on cool grey #E9EBEE; red "OVERDUE · 27 days" stamp | Stamp is already on at f0; at f9 "Due 12 Sep" is struck through in 10 f (line draws E-LINEAR) | Locked; breathe +6% linear | Card arrived mid-entrance at f0 (kit lead-in), settles by f10; stamp tilt −6° static | Setup "Invoice #0412 · ₹48,000" cap 32 px; punch "Still *not paid*?" cap 76 px (7% H), reveal f4 (VO onset 0.20 s → f4) word by word 3 f apart | Card exits up E-EXIT 8 f (f66-74); empty-plate cut f75 | Flat, cool, no shadow (problem world) | VO cue 1 from 0.20 s; soft tick f9 on the strike | Sparse plucks from f0 | Text on f0 (thumbnail); first change by f3; carrier introduced |
| 2 Problem A | 0:02.50-0:04.50 (f75-135) | 2.00 s (60 f) | WhatsApp-style thread, 60% W, grey | Bubble "Hi Rhea, just following up on #0412 🙏" types at 28 cps (filler); "Seen" ticks appear 10 f after sending | Locked; push +4% | Bubble rises 6% H, 12 f E-OUT; ticks 2 f | Must-read bubble text cap 34 px; "Seen" texture-plus (cap 26 px) | Hard cut f135 on "then" (VO comma) | Desaturated | VO cue 2; quiet keystrokes −24 dB; F04 soft "sent" blip f112 at −10 dB | Plucks | Problem shown inside the product world, not stock footage |
| 3 Problem B | 0:04.50-0:06.50 (f135-195) | 2.00 s (60 f) | Same thread; two more bubbles stack + an email card slides in behind at 50% opacity | Bubbles 2 and 3 ("Gentle reminder…", "Any update?") at 4 f stagger, 12 f E-OUT each; email card from right 14 f E-GLIDE | Locked; continue push to +8% | Earlier bubbles dim to 50% in 6 f; all "Seen" | Timestamps "Mon / Wed / Fri" cap 26 px (texture); bubble 3 must-read cap 34 px | Everything exits down E-EXIT 9 f (f186-194); empty plate f194; cut f195 | Desaturated | VO cue 3; two soft blips −12 dB | Plucks thin | Escalation by repetition; 3 items max on screen |
| 4 Problem C (stat) | 0:06.50-0:09.50 (f195-285) | 3.00 s (90 f) | Calendar page stack centred; "41 days" counter | Pages flip 12 → 41 days: counter E-SNAP-L f201-231 (≈ 70% of range in first 8 f); parks f231 | Locked; push +5% linear | Calendar pages peel 2 f each (31 flips, motion-blurred); stop on f231 | "41 days" cap 120 px (11% H), reveal f199 (VO "forty-one" ≈ 7.6 s → counter starts before, lands f231 ≈ 7.7 s); kicker "[SOURCE, YEAR]" cap 28 px; label "average wait to get paid" cap 40 px | Release: card shrinks ×0.9 and fades 10 f (f268-278); 7 f empty plate (VO pause 9.2-9.6 s); hard cut f285 | Cool grey, slight vignette 6% | VO cue 4; F06 ticks ≤ 15/s f201-231; lock tick f231 | Riser f240-283, crest f283 (0-2 f before the cut) | The cost made concrete; payoff still ≥ 1.0 s (f231-268) |
| 5 Reveal | 0:09.50-0:11.50 (f285-345) | 2.00 s (60 f) | Warm canvas #F7F5F0 floods in (polarity flip); Nudgebill mark + serif wordmark centred | Mark: stroke 5 f → fill 8 f → sheen 14 f; wordmark letters 2 f stagger | Locked; accelerating push +10% over the last 8 f (E-EXIT) | Halves converge 20 px over 8 f; 0% overshoot | "Nudgebill" serif cap 118 px (11% H), first letter f291 (VO "Nudgebill" onset ≈ 9.85 s = f295 → reveal starts f291-293) | Push into hard cut f345 | Warm, soft top-left key; first card shadow appears | VO cue 5; F11 impact f287 (9.57 s, inside the 9.2-9.6 s VO gap) | **Groove enters f285 (drop)** | **Hero 1 at 9.5 s (16%)**; first accent colour of the film |
| 6 What it is | 0:11.50-0:15.00 (f345-450) | 3.50 s (105 f) | Definition line above a calm product dashboard (75% W) at 40% opacity | Dashboard rows (invoices) visible as texture; nothing changes state yet | Reveal pull-back ×1.25 → ×1.00 over 27 f E-INOUT (f348-375); then breathe +4% | Line builds in 2 chunks (f348, f360), 12 f E-OUT each | "Chases unpaid invoices *for you*." 90 px font (cap 63 px); sub "Politely. Automatically." cap 40 px reveals f411 (VO 13.7 s) | Hard cut f450 on the VO sentence end | Warm; card shadow y24/b48/7% | VO cue 6 | Groove, ducked −11 dB | One-sentence definition; UI-P2 grammar (text above the product it defines) |
| 7 Steps overview | 0:15.00-0:17.50 (f450-525) | 2.50 s (75 f) | Three numbered chips in a row, 18% W each | Chips pop 01 → 02 → 03 at 6 f stagger (f455, 461, 467), E-SNAP | Locked | Connector line draws between chips 12 f E-LINEAR (f470-482); chip 03 fill turns accent | "Connect · Schedule · *Get paid*" cap 44 px | Chip 01 scales up to fill the frame (×4 in 10 f, E-EXIT) → match cut f525 | Warm | VO cue 7; F05 pops f455/461/467 −8 dB | Groove | Teaches the structure once; the next 24 s fulfil it |
| 8 Ch 01 | 0:17.50-0:18.50 (f525-555) | 1.00 s (30 f) | Chapter card on ink #16181D (polarity flip) | — | Locked | "01" then "Connect" 4 f later, each 7 f E-OUT; exit 5 f E-EXIT | "01" cap 96 px (8.9% H) in accent #3FCB8E (9.1:1 on ink); "Connect" serif cap 64 px white | Hard cut f555 | Dark, flat | F05 pop f527 | Groove | Chapter label; VO cue 8 starts at 17.7 s (f531) over the card |
| 9 Step 1 take | 0:18.50-0:22.50 (f555-675) | 4.00 s (120 f) | Settings card "Invoicing app" (70% W) with a Connect button | Card enters 12 f E-OUT (f555-567); cursor enters bottom-right f570, glides 17 f E-GLIDE to Connect, hover (arrow → hand, button tint) f587-597; **press f597**: button −18% in 3 f; f600 "Syncing…" in working colour #1F9D6B at 60% for 12 f, settles; f612-620 empty list container; f620-642 14 invoice rows cascade 3 f apart, overdue ones get red chips 2 f after their row | Locked; breathe +5% | Cursor arc, no overshoot; parks 40 px right of the list after f605 | Must-read: "Connect" button label cap 34 px; row amounts cap 30 px (should-read); invoice #0412 row outlined in accent at f645 (ring draws 10 f) | Hard cut f675 into a 2.8× cut-in on the summary bar (continuity cut) | Warm; card shadow | VO cues 8-9; **F01 click f597** (VO gap 19.5-20.0 s); F04 soft success f620 −8 dB | Groove | Step micro-structure §4.3 (anticipation 27 f; consequence 3 f; cascade 22 f); carrier #0412 picked out |
| 10 Step 1 value | 0:22.50-0:25.50 (f675-765) | 3.00 s (90 f) | Cut-in 2.8× on the summary bar above the list | f681 counter "14 unpaid" counts 0 → 14 in 18 f (E-SNAP-L) and "₹3,12,000" lands with it; other UI dims to 15% in 4 f | Locked, then breathe +4% | #0412 row (visible at the bottom edge, 30% off-frame) lifts 8 px and gains shadow at f735 (the carrier "picked up") | "*14 unpaid* · ₹3,12,000" cap 64 px (6% H), held f699-760 (2.0 s); reveal f677 (VO "Fourteen" 22.6 s = f678) | Carrier match cut f765: #0412 card keeps x/y ±5% W into the next set-up | Same | VO cue 10; F06 ticks f681-699, lock accent f699 | Groove | Must-read at 6% H; nothing moves during the read |
| 11 Ch 02 | 0:25.50-0:26.50 (f765-795) | 1.00 s (30 f) | Chapter card on ink | — | Locked | "02" / "Schedule" as scene 8 | "02" cap 96 px accent; "Schedule" serif cap 64 px | Hard cut f795 | Dark | F05 pop f767 | Groove | Same grammar as step 1 (taught once, reused) |
| 12 Step 2 schedule | 0:26.50-0:30.00 (f795-900) | 3.50 s (105 f) | Rule card: tone toggle (Friendly / Firm) + a horizontal timeline Day 0 · Day 3 · Day 7, with #0412 card docked at left | Cursor from right 15 f to "Friendly" (f800-815), dwell 10 f, **press f825**: knob slides 4 f, label swaps 2 f; f835-871 timeline nodes draw left → right (12 f per segment, E-LINEAR) and each node pops (E-SNAP, 3 f) with its channel icon (email, WhatsApp, WhatsApp-firm) as the VO names it | Locked; zoom-to-callout on the timeline at f840: ease 18 f to ≈ 45% W, outside dims to 40% in 9 f | Nodes 0% overshoot; cursor parks under the toggle | "Friendly" cap 34 px; node labels "Day 0 · Day 3 · Day 7" cap 36 px; channel names cap 30 px | Day-0 node expands (shared-element morph, 9 f) into a message bubble → seamless into 13 | Warm | VO cues 11-12; **F03 toggle f825**; F05 ticks on nodes f847/859/871 at −10 dB | Groove | The automation's "clock" is visible (law 6); one primary motion at a time |
| 13 Step 2 message | 0:30.00-0:33.50 (f900-1005) | 3.50 s (105 f) | The reminder as Rhea will see it: WhatsApp bubble (60% W) with a "Pay ₹48,000 via UPI" button | Message streams at ≈ 2 f per word (machine speed) f903-951; button fades in f954 (6 f); "9:00 am · sent ✓✓" f966 | Locked; breathe +4% | Bubble rises 6% H, 12 f E-OUT; button E-SNAP | Must-read bubble text cap 34 px (2 lines × 38 chars); "Pay via UPI" button cap 36 px; "sent" texture | Bubble shrinks into the bottom-right corner as a phone notification (7 f) → hard cut f1005 | Warm | VO cue 13; F04 "sent" blip f966 −8 dB | Groove | Machine-speed streaming vs human typing in scene 2 is itself the claim |
| 14 Ch 03 | 0:33.50-0:34.50 (f1005-1035) | 1.00 s (30 f) | Chapter card on ink | — | Locked | "03" / "Get paid" | "03" cap 96 px; "Get paid" serif cap 64 px, "paid" in accent | Hard cut f1035 | Dark | F05 pop f1007 | Groove | Step 3 label shortened to 24 f if VO runs long |
| 15 Step 3 client pays | 0:34.50-0:37.50 (f1035-1125) | 3.00 s (90 f) | Rhea's phone (device frame, 30% W, 70% H), the same WhatsApp bubble | Pull-out from 3× on the "Pay via UPI" button to 1× in 24 f E-OUT (f1035-1059); tap ripple on the button f1089 (VO "taps" 36.4 s = f1092); pressed state 3 f; UPI sheet slides up 10 f; green ✓ draws 12 f (f1105-1117) | Pull-out then locked | Phone tilts −8° in 1 f at f1062 and settles in 12 f (single physical accent, ≤ 1 overshoot of +3°) | Button "Pay ₹48,000 via UPI" cap 36 px; "₹48,000 paid" cap 44 px held f1117-1124 then carried | Click-caused cut f1125 (8 f after the ✓ completes) | Warm; phone screen glow 1.5% of frame (emitter only) | VO cues 14-15; tap F01 f1089; F04 success f1105 | Groove; **dip −6 dB f1110-1125** | Both sides of the transaction, shown once (law 7) |
| 16 Step 3 paid | 0:37.50-0:41.50 (f1125-1245) | 4.00 s (120 f) | Back on the dashboard: #0412 row, wide | f1128 status chip snaps "Overdue" (red) → "**Paid**" (accent fill) in 0 f; f1131 row amount strikes to ₹0 due; f1140-1170 Day 3 and Day 7 nodes on the docked timeline grey out one by one (6 f each) and "reminders stopped" toast slides in 9 f (f1170); f1185 #0412 row slides off the unpaid list, list re-flows (rows move up 12 f E-OUT), counter 14 → 13 | Locked; breathe +5% | Toast 0% overshoot | "*Paid*" chip cap 40 px; toast "Paid · reminders stopped" cap 36 px, held f1179-1240 (2.0 s) | Hard cut f1245 on the beat | Warm; the only large accent fill so far | VO cue 16 (37.9 s); **F11 hit f1128 in the VO gap 37.6-37.9 s**; F04 soft chime f1170 | Groove; accent hit | **Hero 2 at 37.6 s (63%)**: the carrier resolves; the result is held ≥ 1.0 s |
| 17 Proof | 0:41.50-0:44.50 (f1245-1335) | 3.00 s (90 f) | Before/after: two horizontal bars "Chasing by hand" vs "With Nudgebill" | Ghost bar 41 days in muted #8A8F98 present from f1248; accent bar grows 0 → 9 days in 14 f (f1263-1277); "9 days" counter E-SNAP-L parks f1277 | Locked; then 2.5× cut-in at f1300 on "9 days" (hard, in-shot) | Bars E-OUT; 0% overshoot | "41 days" cap 44 px muted; "**9 days**" cap 72 px (6.7% H) accent; source kicker "Beta, [N] users, [period]" cap 28 px | Hard cut f1335 | Warm | VO cue 17; F06 ticks f1263-1277; lock tick f1277 | Groove | Before/after toggle grammar (UI-P9); number held still 1.9 s |
| 18 Works with | 0:44.50-0:47.00 (f1335-1410) | 2.50 s (75 f) | Three chips: WhatsApp · Email · UPI around the Nudgebill mark | Chips pop at 4 f stagger on the spoken words (f1352, 1364, 1378), connector lines draw 10 f each toward the mark | Locked; breathe +4% | 0% overshoot | Chip labels cap 36 px (product names as text only; no third-party logos without permission) | Blur dissolve 7 f (f1403-1410) into the breather | Warm | VO cue 18; F05 pops −10 dB | Groove begins to thin at f1395 | Integration hub grammar (UI-E21) |
| 19 Breather | 0:47.00-0:51.00 (f1410-1530) | 4.00 s (120 f) | Three lines on canvas over the dashboard ghosted at 8% | Lines enter at f1419, f1455, f1494 (each 8 f E-OUT, 4% W offset); earlier lines dim to 40% | Card scale drifts ×1.00 → ×0.88 linear across the shot | ≤ 1/10 of peak motion | "No awkward follow-ups." / "No spreadsheets." / "Just *paid*." 90 px font | Word-spacing exit (gaps ×1.5 over 18 f) → hard cut f1530 | Warm; flat | VO cue 19 (slowest delivery); no SFX | **Breakdown: low-pass, −8 dB** f1410-1500; build f1500-1550 | Breather 6.7% of runtime; the energy dip is deliberate (Part 08 #11) |
| 20 Climax | 0:51.00-0:53.50 (f1530-1605) | 2.50 s (75 f) | Two-line thesis | "You work." lands f1531 (VO "You do the work" onset 51.0 s); "*It chases.*" lands f1558, 2 f before "Nudgebill does the chasing" (≈ 52.0 s = f1560) | Punch +20% over the last 6 f (E-EXIT) | Words E-SNAP from 1.3×, 8 f; 0% overshoot | "You work. *It chases.*" cap 120 px (11% H); the echo paraphrases the VO, the only shot where it does | Punch into a hard cut f1605 | Warm | VO cue 20; **F11 hit f1596 (53.2 s, in the 53.2-53.6 s VO gap)** | Build f1500-1596 → hit f1596 | **Hero 3 at 53.2 s (89%)**; closes the hook loop ("not paid" → "It chases") |
| 21 CTA | 0:53.50-0:56.00 (f1605-1680) | 2.50 s (75 f) | CTA card | Kicker f1607; link enters spaced and tightens over 9 f; underline draws 12 f E-OUT; URL reveal f1645 (VO "nudgebill dot in" onset ≈ 54.9 s = f1647) | Locked; shrink ×0.85 on the way out (last 8 f E-EXIT) | No pulsing; 0% overshoot | Kicker "Free for 30 days" cap 34 px; "Try it free →" cap 58 px (5.4% H); "nudgebill.in" cap 40 px (3.7% H), above y 918 | Hard cut f1680 on the beat | Warm | VO cue 21 | Pad under the CTA | CTA spoken and shown |
| 22 Lockup | 0:56.00-1:00.00 (f1680-1800) | 4.00 s (120 f) | Nudgebill mark + serif wordmark, 22% W, centred; tagline below | Halves converge 8 px per side over 9 f; tagline fades 8 f at f1690; **dead still from f1698 (3.4 s)** | Locked | None after f1698 | "Nudgebill" wordmark (official SVG); "You work. It chases." cap 40 px | End on the last frame; no fade | Warm | No VO; 100 ms gap f1680-1683; **F17 sting f1683**, decays to f1800 | Resolves on the lockup; tail to the last frame | The only fully still frames in the film |

**Rhythm check.** 22 shots · ASL 2.73 s · median 2.75 s · longest 4.0 s (6.7% of runtime) · 3 chapter cards of 1.0 s · hero moments at 9.5 s (16%), 37.6 s (63%) and 53.2 s (89%), plus the proof lock at 42.6 s (71%) · hard cuts 17 of 21 (81%) · interaction-caused transitions 3 (connect click → list, pay tap → paid, chip 01 → chapter) · every state change has an actor (cursor, tap, schedule node, incoming payment) · speech 130 words at 166 wpm inside sentences, silent tail 4.1 s.

### 13.3 30 s cutdown (900 f) and 9:16 re-layout

Remove whole blocks: scenes 3, 6, 7, 8, 11, 14, 18 and 19. Keep the carrier and all three steps at 4.0 s each.

| # | Window (s) | Frames | Content | VO (64 words total) |
|---|---|---|---|---|
| 1 | 0.0-2.0 | 0-60 | Hook card + "Still *not paid*?" | "Sent the invoice. Still not paid?" |
| 2 | 2.0-5.5 | 60-165 | Thread bubble → "41 days" counter, parks by f130 | "Freelancers wait forty-one days to get paid." |
| 3 | 5.5-8.5 | 165-255 | Reveal + definition in one shot (name f169, sub f210) | "Meet Nudgebill. It chases unpaid invoices for you." |
| 4 | 8.5-12.5 | 255-375 | Step 1: Connect → 14 unpaid (kicker "01 · Connect") | "Connect your invoicing tool. It finds every unpaid invoice." |
| 5 | 12.5-16.5 | 375-495 | Step 2: Day 0/3/7 → WhatsApp bubble with UPI button (kicker "02 · Schedule") | "It sends polite reminders on WhatsApp and email." |
| 6 | 16.5-20.5 | 495-615 | Step 3: tap ripple → "Paid · reminders stopped" (kicker "03 · Get paid") | "Your client taps the UPI link, pays, and the reminders stop." |
| 7 | 20.5-23.5 | 615-705 | "9 days" vs "41 days", held still ≥ 1.5 s (doubles as breather) | (VO pause, bed only) |
| 8 | 23.5-25.0 | 705-750 | "You work. *It chases.*" | "You do the work. It does the chasing." |
| 9 | 25.0-27.0 | 750-810 | CTA "Try it free" + URL | "Try it free at nudgebill dot in." |
| 10 | 27.0-30.0 | 810-900 | Lockup, still from f828 (2.4 s) | — |

**9:16 rules for this cut (1080×1920):** all text inside x 120-840, y 270-1210. Hook punch 3 lines at 128 px font. UI cards 810 px wide, top edge at y 320, so the must-read row sits ≤ y 1100. Steps 1 and 2 stack the card above its value (value at 96 px font) instead of side by side. The phone in step 3 becomes full-frame (the vertical frame *is* the phone): drop the device frame and show the WhatsApp screen at 1:1, tap ripple instead of a cursor. Optional burned-in captions at 56 px font, 2 lines × 32 chars, centred at y 1120-1200. No cursor anywhere in 9:16.

---

## 14. Building it with motion-kit vs generative video vs 3D

### 14.1 What motion-kit can build directly

Scene types: hook, kinetic, orb, title, stat, list, compare, bars, grid, quote, prompt, chat, wave, image, clip, cta, logo. Themes: midnight, clean, neon, editorial, pop, desi, corporate, mono, studio, studio-dark. Formats: reel, portrait, square, landscape. Every scene takes `say` (narration that drives timing), `duration` (0.8-20 s, ignored when narrated), `bg` (`default` / `accent` / `inverse`, max 1-2 per video) and `sfx`.

| Explainer stage | motion-kit scene | Notes |
|---|---|---|
| Hook (problem + carrier) | `hook` (`setup` = the carrier, `strike` = the broken promise ≤ 14 chars, `punch` = the question) | The strike-through is a built-in "what went wrong" device |
| Hook (question title) | `kinetic` (1-3 lines) or `title` | Curiosity-question pattern [V:1Hcg3X] |
| Problem vignette | `chat` (the unanswered message), `list` with `style: "crosses"`, or `compare` (old way vs new way) | Put the pain in the product's world |
| Problem number | `stat` (`kicker` = source, `value` counts up, `label`) | Counter + meter built in; source in the kicker |
| Reveal | `orb` (calm, AI/voice) or `title` (`kicker` "Meet", `headline` = name) or `logo` mid-film | Start `say` with the name so it lands on its word |
| What it is | `title` (`headline` ≤ 8 words, `sub` ≤ 16) | |
| Steps overview | `list` with `style: "numbers"` (3 items, 2-6 words each) | Teaches the structure once |
| Step with a typed input + button | `prompt` (`label` = "01 · Connect", `prompt`, `button`, `result`) | Card, typing, cursor glide, click, "Generating…" shimmer, result |
| Step with a message / notification | `chat` (`label` = "02 · Schedule", `prompt` = the message, `reply` = the outcome) | |
| Step result as a number | `stat` | Stands in for the 2-3.5× cut-in |
| Mechanism with levels or comparisons | `bars` (2-6 bars, `highlight`) | |
| Integrations / features at a glance | `grid` (2-6 tiles, emoji icon + label) | Emoji icons read as playful; avoid in `corporate` |
| Voice / audio product step | `wave` (karaoke words lit as spoken) | |
| Proof (before/after) | `compare` or `bars` | |
| Testimonial | `quote` (real, permissioned quotes only) | |
| Breather | `list` with `style: "lines"` | Earlier lines dim, matching §13 scene 19 |
| Climax | `kinetic` | |
| CTA | `cta` (`style: "link"` for web, `"button"` for paid social) | Action ≤ 16 chars (checker warns above) |
| Lockup | `logo` (`name`, `tagline`, `src`) | |
| Real product screenshot | `image` (`fit: "contain"`, `move: "in"`) | Supply ≥ 2× delivery width |
| Real screen recording / generated plate | `clip` (`area`, `scrim`, `generated: true` for AI footage) | Re-capture at 30 fps; clean data |

**Video settings for an explainer:** `format: "landscape"` master, `reel` cutdown; `theme`: `clean` (light SaaS), `corporate` (B2B, finance), `editorial` (Look B feel), `studio` / `studio-dark` (AI, calm), `desi` (Indian consumer / Hinglish), `mono` (Swiss minimal); `motion: "smooth"` or `"calm"` (**never `bouncy`**: overshoot on UI and type); `pace: "normal"` (`relaxed` for second-language audiences: 2.4 words/s read rate); `transition: "cut"` (or `"blur"` for calmer films). Use `bg: "inverse"` on at most 1-2 scenes (the reveal, or the climax).

**Pipeline** (from `skills/motion-director/SKILL.md`): `npm run new -- <name> --recipe creator-explainer-hinglish` or `launch-film-16x9` → edit `specs/<name>.json` → `npm run brand -- public/brand/<logo> --spec specs/<name>.json` → `npm run check -- specs/<name>.json` (fix every ✖ and ⚠) → `npm run qa` → `npm run voice -- specs/<name>.json` (prints the narration; `--tts --voice <id>` for ElevenLabs, or `--align voice/<file>.mp3` for a human recording) → `npm run music -- specs/<name>.json --track music/<song>.mp3` (snaps cuts to the beat and ducks the music under the voice) → `npm run preview` (contact sheet) → `npm run make`. Re-run `npm run music` if the length changes by more than a few seconds.

**Kit spec for the Nudgebill 60 s master.** This exact spec passes `npm run check` with no warnings (tested against `motion-kit/scripts/check.mjs`). With estimated narration timing (2.6 words/s) it plans to **57.8 s** across 14 scenes; recording the real VO and running `npm run voice -- --align` sets the final timing.

```json
{
  "format": "landscape",
  "theme": "clean",
  "motion": "smooth",
  "pace": "normal",
  "transition": "cut",
  "brand": { "name": "Nudgebill", "accent": "#157A52", "handle": "nudgebill.in" },
  "audio": { "sfx": true },
  "scenes": [
    { "type": "hook", "say": "Sent the invoice. Still not paid?",
      "setup": "Invoice #0412 · ₹48,000", "strike": "Due 12 Sep", "punch": "Still *not paid*?" },
    { "type": "chat", "say": "So you chase. A WhatsApp, then an email, then another.",
      "label": "You → Rhea (client)", "prompt": "Hi Rhea, just following up on invoice #0412 🙏", "reply": "Seen · no reply" },
    { "type": "stat", "say": "Freelancers wait forty-one days to get paid.",
      "kicker": "[SOURCE, YEAR]", "value": "41 days", "label": "average wait to get *paid*" },
    { "type": "title", "say": "Meet Nudgebill. It chases unpaid invoices for you. Politely. Automatically.",
      "kicker": "Meet", "headline": "*Nudgebill*", "sub": "It chases unpaid invoices for you." },
    { "type": "list", "say": "Here is how it works, in three simple steps.",
      "title": "How it works", "items": ["Connect", "Schedule", "*Get paid*"], "style": "numbers" },
    { "type": "prompt", "say": "Connect your invoicing tool once. Nudgebill finds every unpaid invoice. Fourteen, in this case.",
      "label": "01 · Connect", "prompt": "Connect invoicing app", "button": "Connect",
      "result": "*14 unpaid* · ₹3,12,000", "resultKind": "text" },
    { "type": "title", "say": "Pick a tone and a schedule.",
      "kicker": "02 · Schedule", "headline": "Day 0 · Day 3 · *Day 7*", "sub": "Tone: Friendly" },
    { "type": "chat", "say": "It sends friendly reminders on WhatsApp and email, so you don't have to.",
      "label": "WhatsApp · to Rhea",
      "prompt": "Hi Rhea, a gentle reminder: invoice #0412 (₹48,000) was due on 12 Sep.",
      "reply": "Pay in one tap → *UPI*" },
    { "type": "chat", "say": "Every reminder carries a UPI pay link. Your client taps, pays, and the reminders stop on their own.",
      "label": "03 · Get paid", "prompt": "Pay ₹48,000 via UPI", "reply": "*Paid* · reminders stopped" },
    { "type": "compare", "say": "Beta users got paid in nine days, not forty-one.",
      "title": "Days to get paid",
      "left": { "label": "Chasing by hand", "items": ["41 days"] },
      "right": { "label": "With Nudgebill", "items": ["9 days"] } },
    { "type": "list", "say": "No awkward follow-ups. No spreadsheets. Just paid invoices.",
      "items": ["No awkward follow-ups.", "No spreadsheets.", "Just *paid*."], "style": "lines" },
    { "type": "kinetic", "say": "You do the work. Nudgebill does the chasing.",
      "lines": ["You do the work.", "*It chases.*"] },
    { "type": "cta", "say": "Try it free at nudgebill dot in.",
      "kicker": "Free for 30 days", "action": "Try it free", "style": "link", "handle": "nudgebill.in" },
    { "type": "logo", "name": "Nudgebill", "tagline": "You work. It chases." }
  ]
}
```

What the checker taught while building it (useful for any explainer spec):
- A 2-word `say` on a 3-item `list` ("Here is how it works.") is flagged: "narration too short for its animation". Give overview scenes ≥ 8 spoken words.
- A single `chat` carrying two VO sentences ran 7.3 s and was flagged ("past ~7 s viewers swipe — split it"). **One VO sentence pair per scene, ≤ 7 s.** This is why step 2 is split into a `title` (the schedule) and a `chat` (the message).
- `cta.action` "Try Nudgebill free" (18 chars) was flagged; keep it to 1-3 words / ≤ 16 chars.
- `duration` on the `logo` is reported as ignored when narration drives timing; in our test the planner still lengthened the end (by ≈ 2 s). Check the end hold in `npm run preview` rather than relying on `duration`.
- The 30 s 9:16 variant (9 scenes, `"format": "reel"`, shortened `say` lines) plans to 32.3 s; trim 2-3 VO words per step or set `pace: "fast"` to land on 30 s.
- `[SOURCE, YEAR]` is a deliberate placeholder; the motion-director skill's grep (`grep -n '\[[A-Z0-9]' specs/<name>.json`) catches it before render.

### 14.2 Where the kit falls short of this guideline (and the fix)

| Gap | Guideline target | Kit behaviour today | Fix |
|---|---|---|---|
| Chapter cards on a flipped background | 1.0 s "01 Connect" cards, polarity flip each step | No chapter scene; `bg: "inverse"` allowed on 1-2 scenes only | Put "01 · Connect" in the step scene's `label`/`kicker`; or add a custom `chapter` scene (`docs/ADDING-SCENES.md`) |
| Carrier object across scenes | Same card, same position ±5% W, match cuts | Each scene builds its own card; transitions are generic | Custom scene with a persistent layer, or keep the carrier's label identical in every scene's text so it reads as one object |
| Zoom-to-callout / focus ring | Ease 18 f to 45% W, dim outside to 40% in 9 f, ring 10 f | Not available | `image` with `move: "in"` on a pre-cropped screenshot, or a custom scene |
| Cut-in on a UI region | 2-3.5× instant | Not available | `stat` scene for the value (as in §14.1), or a custom scale-cut |
| Typing speed | Readable input 15-20 cps; key phrase 7-9 cps | `prompt` types ≈ 60 cps (length/2 frames, 18-60 f); `chat` ≈ 30 cps | Keep typed strings ≤ 40 chars; patch `motion-kit/src/engine/plan.ts` for slower typing |
| Cursor anticipation | 18-30 f travel + dwell + hover | `prompt` cursor: 22 f glide, click on arrival, no dwell | Fine for reels; custom scene for the 16:9 master |
| Tap ripple / phone UI | 9:16 tap, no arrow | Desktop cursor in `prompt` | Use `chat` (no cursor) for phone steps |
| Mechanism diagram (nodes + arrows, Look B) | 2.5D objects, colour-flip backgrounds, hard shadows | Not available | Custom Remotion scene, or After Effects; import as `clip` |
| Hits in VO gaps | Structural hits only in gaps ≥ 250 ms | `npm run music` snaps cuts to beats and ducks under VO; hit placement is per scene | Review in `npm run preview`; set `sfx: false` on scenes whose hit lands on a word |
| Overshoot | 0% on UI and type | `bouncy` overshoots ≈ 3% on text, ≈ 10% on buttons | `smooth` or `calm` |
| Caption sidecar | SRT/VTT per delivery | Timing JSON from `npm run voice` | Convert `voice/<name>.timing.json` to SRT (page on 1,200 ms / 400 ms silences, Part 07 §9.11.4) |

### 14.3 What needs generative video (Flow / Veo / Sora / Runway / Kling / Higgsfield)

Rule (Part 11 AA-U1): **generate atmosphere, compose meaning.** A video model may produce only layers whose exact content does not matter.

| Layer | Generate? | Notes |
|---|---|---|
| Problem-world plate (a desk at night with a phone face-down, a café table, an office window) behind the UI cards | **Yes** | Locked-off or one slow move; extra 40-60 px blur in compositing; no faces in focus; no screens with content |
| Lifestyle "after" plate (relaxed freelancer, sunlit studio) behind the climax line | Yes, defocused | Same rules; one per film |
| Abstract light, gradient fields, paper texture, grain | Yes, or in-engine | Kit `orb` and themes cover most of this |
| Product UI, chat bubbles, invoice, numbers, cursor, type, logo, UPI sheet, WhatsApp chrome | **Never** | Warped glyphs, changing text, identity drift (Part 11 AA-02, AA-05, AA-06) |
| Mechanism diagram (nodes, arrows) | Never | Must match the real system |
| Real customers, founders | Never | Real footage with releases, or a `quote` card |
| Generated audio | **Discard** | Rebuild from the cue sheet (Part 09 SD-V9) |

Tool notes: Veo 3.1 / Flow clips are 4, 6 or 8 s at 24 fps; build any plate longer than 8 s from 2+ clips and cut on a stage boundary (Part 01 §2.3). Generate 1.5-2 s longer than the edit length, 2-4 takes, same model and seed per look; conform 24 → 30 fps with optical flow (never frame duplication); grade all plates in one pass; log model, prompt, seed and date for every kept take. Mark AI footage in the kit with `clip.generated: true`.

Plate prompt pattern: "Locked-off medium-wide shot of a small home office at dusk, a laptop closed on a wooden desk, a phone lying face-down beside a cup of chai, warm practical lamp light from the upper left, very shallow depth of field so everything is softly out of focus, no people, large clean empty area across the centre of the frame. 8 seconds." Negative: "text, letters, captions, subtitles, user interface, screen content, watermark, logo, numbers, faces, hands".

### 14.4 What needs 3D (or 2.5D)

Budget: one hero beat, ≈ 10-15% of runtime, in Look A/C; 0% true 3D in Look B (2.5D only).
- **"Where the money / data goes" pull-back** — the invoice card in the product UI pulls back ×0.32 in ≈ 1 s into a simple 3D set where reminder envelopes travel to a phone and a coin returns [V:1CSXtQ t=17.80-19.03s]. Optional replacement for §13 scenes 12-13 in a premium version.
- **Tilted UI planes** for the steps overview (cards at 15-35° in transit, flat to 0° in 7-8 f before reading) [V:19NRDv t=16.77-20.50s].
- **Collection climax**: all three step cards gather into the logo (3D deck fan ≈ 11 f, cruise 7 f, accelerate 21 f, collapse 6 f) [V:15VhHR t=48.27-49.83s].
- **2.5D mechanism objects** (Look B): rim thickness, long hard shadows, parallax 1.3-2× [V:1Hcg3X rule 11]; build in After Effects or Remotion with SVG, not a 3D engine.

Build in Remotion with `@remotion/three` (UI textures as vector or ≥ max zoom × width), After Effects 3D layers, Blender, or a 3D scene builder. Keep planes from intersecting (HubSpot's flaw), roll 0°, one key light matching the film's light direction, DOF only on what is not read.

---

## 15. QC checklist (30-60 s Product Explainer)

Run per shot, then on the locked cut with sound off, then with sound on, then on every delivered file.

**Comprehension (run with someone who has not seen the brief)**
- [ ] After one viewing they can state the problem, the three steps in order, and the number.
- [ ] Sound off: the on-screen text alone tells problem → product → three steps → number → action.
- [ ] Product named by 5.5 s (30 s), 7 s (45 s) or 10 s (60 s).
- [ ] ≤ 3 steps (4 only at 60 s with ≥ 6 s each); steps in the real order of use.
- [ ] One carrier object, identical label and look in every shot it appears.

**Script and VO**
- [ ] Hook ≤ 7 words, on frame 0, first change by f3; no product name or jargon in it.
- [ ] VO words: 30 s 65-75, 45 s 100-115, 60 s 135-150; pace 150-170 wpm (≤ 155 for second-language audiences).
- [ ] Each sentence ≤ 12 words; 0.3-0.5 s pause before each hero moment.
- [ ] Every number on screen has a client-supplied source in a kicker; no `[PLACEHOLDER]` remains (`grep -n '\[[A-Z0-9]'`).
- [ ] Numbers spoken as words, shown as digits.
- [ ] Silent tail: 3-5 s (30-45 s) or 4-7 s (60 s); lockup still ≥ 2.0 s (30 s) / ≥ 3.5 s (60 s).

**Sync**
- [ ] Every echo word reveals 0-2 f before its spoken onset; none after.
- [ ] Every cut on a VO sentence or clause boundary; none mid-word.
- [ ] Section turns and hero hits within ±2 f of an audio event (100%).
- [ ] Structural hits only in VO gaps ≥ 250 ms; none under a stressed word.
- [ ] Caption cues ≤ 2 × 42 chars, 2.4-3.5 s, hold ≥ 25 f, ≥ 2 f apart; sidecar SRT/VTT delivered.

**Picture**
- [ ] Every state change has an actor visible in the previous 30 f (automation shows its clock).
- [ ] Must-read text cap ≥ 3% H (16:9) / font ≥ 52 px (9:16); after a cut-in ≥ 4% H; labels never < 2.5% H.
- [ ] Every must-read state held ≥ max(1.0 s, 0.33 s × words + 0.4 s), ×1.15 for Hindi/Hinglish.
- [ ] One primary motion per frame; motion quieter during VO sentences than in gaps.
- [ ] 0% overshoot on UI, type and data; physical-object accents ≤ 1 overshoot, settled ≤ 15 f.
- [ ] No full freeze > 5 f before the lockup; reading drift ≤ 0.2% W/f.
- [ ] Unblurred motion ≤ 5% W/f; whips only into cuts.
- [ ] ≥ 70% hard cuts; ≤ 2 mask wipes; ≤ 1 flash moment (≤ 3 f); no crossfades between UI states.
- [ ] Contrast: text ≥ 4.5:1, marks ≥ 3:1; accent used for "resolved" only, alert for "problem" only.
- [ ] One light direction; shadows consistent across all shots (Solar mixes two [V:1Hcg3X §2]).
- [ ] No readable UI or text produced by a video model; generated clips tagged.
- [ ] Text sharp at maximum zoom (source ≥ zoom × delivery width).

**Sound and delivery**
- [ ] Music ducked −10 to −12 dB under VO; music lasts to the last frame; sting on the lockup ±2 f.
- [ ] Social files −14 LUFS ±1; landing-page embeds −16 LUFS (−18 only if speech-dominant); true peak ≤ −1 dBTP (measured on the final MP4).
- [ ] Exact size per format; constant 30 fps; zero duplicated frames inside moves.
- [ ] H.264 High, yuv420p, BT.709 tagged; ≥ 12 Mb/s at 1080p for UI-heavy films (never below 8); `+faststart`.
- [ ] Frame 0 works as the thumbnail (hook text and carrier visible).
- [ ] 9:16 cut re-laid out (not cropped): text in x 120-840, y 270-1210; no cursor; ≤ 35 s.
- [ ] Private test upload played at 1:1 on a phone, muted and unmuted.

---

## 16. Common mistakes

| Mistake | Seen in / source | Why it hurts | Fix |
|---|---|---|---|
| Five features in 60 s | (the generic explainer failure; Part 01 TS3) | Nothing is understood; it becomes a feature list | Three steps; move the rest to a 90 s tour or a series |
| Steps in the order of the menu, not the order of use | ST-C2 avoid list | Viewer cannot rebuild the workflow | Order by the customer's first session |
| Problem shown with stock footage of a frustrated person | Teardowns' "anti-pattern" lists; Part 11 AA-24 | Template sameness; proves nothing | Show the problem in the product's world (thread, calendar, overdue stamp) |
| Product named after 15 s | Part 01 §2.17 (VO-led ceiling ≈ 10 s) | Cold viewers leave before they know what it is | Name by 10 s (60 s) / 5.5 s (30 s) |
| On-screen text appears after the word is spoken | Part 09 SD-V3; Part 07 §9.11.4 | Reads as out of sync, cheap | Reveal 2 f before the onset; never after |
| Full VO transcribed on screen as the design | (common "caption-first" template failure) | Walls of text; nothing to look at | Echo the key 2-6 words; full captions in a sidecar |
| Text that only works with sound | Part 09 SD-V6 (7-8/8 references work muted) | Muted autoplay loses the story | Run the sound-off check |
| Payoff readable for under 1 s | Solar's message block ≈ 0.4 s [V:1Hcg3X §13]; Chowdeck's "Order delivered" 2 f [V:126cpH t=13.53s] | The point of the film is subliminal | Hold ≥ max(1.0 s, 0.33 s × words + 0.4 s) |
| Meaning in micro-text | 8/8 references; Solar recap labels 2.2% H [V:1Hcg3X] | Lost on phones | ≥ 3% H must-read; cut in 2-3.5× |
| Automation shown as UI changing by itself | Part 06 law 1 | Looks like a glitch or a fake | Show the trigger: schedule node, clock, incoming event |
| Number with no source, or "up to 10×" | Part 01 copy rules; Part 11 §22.1 A | Kills trust with evaluators | Sourced kicker or no number |
| Music bed with a lead melody under the VO | Part 09 SD-V4 [inferred] | Melody fights speech intelligibility | Pads and pulses; melody only in VO gaps and the tail |
| Hits under stressed words | Part 09 SD-V5 | The key word is masked | Hits only in VO gaps ≥ 250 ms |
| Over-loud, clipped mix | NOSTRA −7.9 LUFS, +1.6 dBTP [V:1i2L14] | Fatiguing; platforms turn it down | −14 social and web / −16 landing-page embed (P09 §16.11.1); ≤ −1 dBTP |
| Text-card fatigue | kivi 5, Lottieicon 6 cards in a row [V:1ccYWJ] | Mid-film energy dip | ≤ 3 same-treatment cards; alternate words and product |
| No logo or CTA; ends mid-motion | Solar [V:1Hcg3X §16]; Lottieicon music ends 3.7 s early [V:1ccYWJ] | The ask is lost | CTA spoken + shown, then a still lockup with a sting and a tail |
| Random whip directions | Solar's mixed whips [V:1Hcg3X §16] | Spatial confusion | Vertical = next step, horizontal = context |
| Mixed light directions | Solar's batteries vs tokens [V:1Hcg3X §2] | Breaks the "one world" read | One key light for the whole film |
| Bouncy UI and type | Remotion default spring (16.3% overshoot); kit `bouncy` | Toy-like; undermines "reliable product" | E-OUT / E-CRIT; `motion: "smooth"` |
| 24/25 → 30 fps by duplicating frames | Solar, Wix, HubSpot | Judder on every slide and scroll | Render natively at 30 fps |
| 60 s master cropped to 9:16 | Part 02 CO-U18 (608 px window) | Unreadable, chopped UI | Re-lay out; 30 s vertical cut by removing blocks |
| A real customer's words through TTS | Part 09 SD-V8 | Ethical and legal risk | Real recording or a permissioned `quote` card |
| Placeholder text shipped (`[SOURCE]`, "41 days") | — | Fabricated claim in a published ad | Placeholder grep in QC; replace or cut before render |
