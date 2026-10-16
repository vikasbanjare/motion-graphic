# Specialised Guideline 02: UI Product Demo

A film that proves what software does by showing it being used: a real input, a real state change, a readable result. It is built from rebuilt product UI, a cursor or voice that acts, and short claim cards between proofs.

This guideline condenses the Master SaaS Motion Design System (Parts 01-11 in `research/master/`) and the eight frame-measured teardowns in `research/videos/` into one working spec. Every number is in frames at 30 fps (f) unless stated. 1 f = 33.3 ms. "% W" and "% H" mean percent of frame width and height. Tags used below:

| Tag | Reference (file in `research/videos/`) | Why it matters for UI demos |
|---|---|---|
| [V:1CSXtQ] | OpenAI x HubSpot connector spot, 16:9, 30 s (`1CSXtQSs2jM0WBQP6LPDVpDgkt8JLdUkw.md`) | Best measured prompt-native demo. Real UI, typed headline becomes the composer, real-speed toggle and dropdown, one 3D hero beat |
| [V:15VhHR] | Wix AI site builder, 16:9, 53.9 s (`15VhHRcisoHSPWY0VA06PzA3u_y-4qJY_.md`) | Real product UI in an editorial frame. Ballistic native cursor, locked prompt bar across 6 shots, 3.4x cut-ins, 12 f scrolls |
| [V:1-6l8S] | kivi voice-AI launch, 16:9, 77.8 s (`1-6l8SV5NXZQotrYoV8KqKV7SJPvtssso.md`) | "Say, then see" loop run 4 times. Glass cards, empty hold then cascade |
| [V:19NRDv] | Bumper PRO payments, 16:9, 67.2 s (`19NRDvazRJFCFcAfehavceGsUMV64qBRv.md`) | Claim/proof alternation. Tilted 3D UI planes, extraction push-through, before/after toggle, 100 BPM grid |
| [V:126cpH] | Chowdeck delivery-app ad, 9:16, ~18 s (`126cpH-FXL4FxTwRwoJvt9M4FNwBB7peq.md`) | The only native vertical reference. Single-transaction story, card-to-notification morph |
| [V:1ccYWJ] | Lottieicon icon library, 16:9, 44.3 s (`1ccYWJ6nQXdqt1UQrpz2mE0ODScG_hU0K.md`) | Product animating inside believable UI. Hop-and-hold tour, and its strobing flaw |
| [V:1i2L14] | NOSTRA studio promo, 16:9 inset, 35 s (`1i2L14p-cvnLcIl6XY7mUQEiTYZy_OWUA.md`) | Click-caused transitions, CTA button press, design-tool chrome |
| [V:1Hcg3X] | Solar panels explainer, 16:9, 35.8 s (`1Hcg3X8G_q34iS-RqcAQ2pMHpGkIhxu3j.md`) | No software UI; UI grammar (gauges, highlight states). Legibility floor rule |

Master cross-references use the Part and rule IDs (for example Part 06 UI-C4 means cursor rule C4 in `master/06-ui-animation-system.md`).

---

## 1. Purpose and audience

**Purpose.** Make one claim believable without a narrator: "this product does X, this fast, with this little effort." The film's evidence is causality. An actor (cursor, keystroke, voice, AI, system event) causes a state change, and the viewer reads the result. 7 of 8 references change UI only when an actor causes it (Part 06 §0.5). None of the 8 is a raw screen recording; even the two with real UI rebuild it as clean layers.

**Audience.**
- Prospects in a feed or on a landing page who have 3 s of attention and no context. They need the job named by 3-6 s (Part 01 H6).
- Evaluators (product managers, team leads, developers) who will pause on the UI. They need real data, consistent strings and the true product flow (Part 06 UI-B7, UI-K7).
- Existing users discovering a new feature. They need the entry point (which button, which menu) to be recognisable.

**The promise the film makes.** "What you see is what the product does." Breaking it (fake data, a flow in the wrong order, text that changes between a wide and a cut-in, UI drawn by a video model) costs more than any visual polish earns.

---

## 2. When to choose this format

Choose a UI Product Demo when **all three** are true:
1. The product has a visible input → output (type a prompt, click a toggle, upload, ask a question, connect a source).
2. The output can be read on a phone in 1-2 s (a number, a short answer, a chart with one highlighted value, a status).
3. The core flow takes 5 or fewer user actions.

| Situation | Use this format? | Better alternative |
|---|---|---|
| AI feature, prompt tool, connector, integration | Yes: template T4 Prompt-native [V:1CSXtQ] | — |
| Voice or dictation product | Yes: template T1 Say → See [V:1-6l8S] | — |
| Data, payments, ops ("reconcile", "unify") | Yes: T2 Claim → Proof with extraction shots [V:19NRDv] | — |
| Consumer app, one transaction (order, book, pay) | Yes, 15 s vertical: T3 Single-transaction [V:126cpH] | — |
| Platform with several use cases | Yes, 45-60 s: T5 Brand-bookended montage [V:15VhHR] | — |
| The value is invisible (security, infrastructure, latency) | Only as a short insert | Guideline: explainer (T6 Energy chain [V:1Hcg3X]) |
| The UI is not ready or changes weekly | No | Kinetic-type launch or brand film; add UI later |
| Brand awareness, no product yet | No | Brand/manifesto film |
| Asset library or marketplace | Partly: T8 Asset reel [V:1ccYWJ] | — |

---

## 3. Platforms, aspect ratios and length

### 3.1 Formats

| Format | Size | Use | Text-safe box (strict) | motion-kit `format` |
|---|---|---|---|---|
| 16:9 master | 1920x1080 | Website hero, YouTube, Product Hunt, LinkedIn video, sales decks | x 96-1824, y 54-1026; keep CTA and URL above y 918 (player controls) | `landscape` |
| 9:16 | 1080x1920 | Reels, Shorts, TikTok, Stories, app-install ads | **x 120-840, y 270-1210** (union of Reels-ads, TikTok and Shorts) | `reel` |
| 1:1 | 1080x1080 | Feed ads | x 135-945 | `square` |
| 4:5 | 1080x1350 | Instagram / LinkedIn feed | x 88-992 | `portrait` |

Sources: Part 02 §4.7; Part 06 §8.12. 9:16 is a **re-layout, not a crop**: cropping a 9:16 window out of a 1920x1080 master leaves 608 px of width (Part 02 CO-U18). Stack side-by-side panels vertically, move flank labels above and below, and cut in on the one value.

### 3.2 Length

| Runtime | When | Story template | Proof budget |
|---|---|---|---|
| 15 s (450 f) | Performance or app-install ad, vertical cutdown | T3 Single-transaction [V:126cpH] | One transaction, 6 s (40%) |
| **30 s (900 f), default** | AI feature, connector, single use case | T4 Prompt-native [V:1CSXtQ] | One use case end to end, 12.5 s (41.7%) |
| 45 s (1350 f) | Multi-feature launch, 3 demos | T1 Say → See ×3, or T8 | 3 x 8 s (53%) |
| 60 s (1800 f) | Platform launch, 4 features | T2 or T5 | 4 blocks of 10 / 9 / 8 / 7 s (56.7%; P08 DU-U3) |
| 90 s (2700 f) | VO-led walkthrough | T9 VO explainer | 5 blocks, 12.5 → 8.5 s |

Rules: in films of 30 s or less, tell **one use case end to end** (Part 01 TS3; HubSpot does one query → answer in 8.44 s [V:1CSXtQ]). In films of 45 s or more, run the demo loop **at least 3 times** with the same grammar (Part 01 TS2; kivi 4x, Bumper 5x). Proof blocks get shorter as the film goes on (kivi 14.75 → 11.03 → 6.69 s [V:1-6l8S]).

Frame rate: render natively at 30 fps (or 60 for UI-heavy web heroes). Never convert 24/25 → 30 by duplicating frames; scrolls and cursor glides judder (3 of 8 references show it) (Part 04 #22; Part 11 MK-06).

---

## 4. Story structure with exact beat timings

### 4.1 The seven stages (30 s default)

| Stage | Seconds | Frames | % | Job in a UI demo |
|---|---|---|---|---|
| 1 Hook | 0.0-2.0 | 0-60 | 6.7 | Pain question or announcement, on screen on f0, first change by f3. Already shows the mechanic (a caret, a typing dot) |
| 2 Setup | 2.0-4.0 | 60-120 | 6.7 | The old way, or the promise typed as a prompt |
| 3 Reveal | 4.0-7.5 | 120-225 | 11.7 | The text becomes the product UI (text → UI build); product name |
| 4 Proof | 7.5-20.0 | 225-600 | 41.7 | One real flow: input → action → result. One continuous take of up to 5 s, then a cut-in on the value |
| 5 Benefit / breather | 20.0-23.5 | 600-705 | 11.7 | One benefit line over calm product; motion ≤1/10 of the peaks |
| 6 Climax | 23.5-25.0 | 705-750 | 5 | Thesis line, last word on the beat |
| 7 Resolution | 25.0-30.0 | 750-900 | 16.7 | CTA card 2.0 s + lockup 3.0 s (≥2.0 s dead still) |

Source: Part 01 §2.3 and Part 08 PL-30. For 15 s: hook 0-1.5, setup 1.5-2.5, reveal 2.5-4.5, proof 4.5-10.5, climax 10.5-12.0, resolution 12.0-15.0 (CTA 1.0 s + lockup 2.0 s). For 60 s: hook 0-2.4, setup 2.4-5.0, reveal 5.0-9.5, proof 9.5-44.0, breather 44-49, climax 49-53.5, resolution 53.5-60.

### 4.2 The proof block: the micro-structure every demo beat follows

One proof block is a fixed sequence. Measured numbers come from the six cursor references (Part 06 §8.4.1):

| Micro-beat | Frames | Spec | Evidence |
|---|---|---|---|
| a. Context lands | 6-12 f | Card enters, E-OUT, rise 5-8% H, opacity over 6-8 f | Part 06 #4 |
| b. Input | 30-90 f | Typing at 15-20 chars/s; key noun phrase 7-9 chars/s; filler 28-35 | [V:15VhHR t=4.2-8.6s] [V:1CSXtQ t=2.53-7.2s] |
| c. Read hold on the input | ≥18 f | Line complete and still ≥0.6 s | [V:1CSXtQ t=7.20-7.80s] |
| d. Cursor approach + dwell | **18-30 f total** | Fast travel 6-8 f + dwell 10-22 f, or slow travel 25-27 f + dwell 2-3 f | Part 06 UI-C4 (6/8) |
| e. Press | 0 f | Target state change **on the press frame** (≤1 f); press −15-20% scale over 3 f | UI-C6 |
| f. Consequence | 3-8 f after the press (max 15) | Toggle fills +2 f; chart reacts +0-7 f; cut +5-8 f | [V:1CSXtQ t=10.200-10.367s] [V:15VhHR t=12.20-12.47s] |
| g. AI "acting" state (if any) | 8-15 f | One AI colour, transitional only, settles in 6-8 f | [V:15VhHR t=18.73-19.13s] |
| h. Empty result container | 8-9 f | Holds empty before content | [V:1-6l8S t=22.87-23.10s] |
| i. Result cascade | 13-22 f | Elements every 3-4 f in reading order, each fading 4-6 f | [V:1-6l8S t=23.13-23.87s] [V:15VhHR t=12.47-12.83s] |
| j. Cut-in on the value | instant, 2-3.5x | The must-read value reaches cap ≥4% H | [V:15VhHR t=6.57s] 3.4x; [V:19NRDv t=13.13s] 2.5x |
| k. Payoff hold | ≥30 f | max(1.0 s, 0.33 s × words + 0.4 s) | Part 06 UI-L2 |

Total for one complete block: about 4.5-6.5 s. That is why a 30 s film fits one use case and a 60 s film fits four.

### 4.3 Energy and music arc (30 s)

- Feature-led first 40%: let the product show its real speed. HubSpot's ASL falls from 4.45 s to 2.04 s across its drop at 43% [V:1CSXtQ §11].
- **Drop on the first product moment**, 0-8 f after its cut (Part 09 defaults).
- Hero moments at about 13%, 55% and 82% of runtime; at least 30 f of calmer picture after each (Part 08 #12-14).
- One breather of 10-15% of runtime, or a music breakdown under the densest reading (Part 08 ER-U11; defaults card #11).

---

## 5. Shot list template

Fill one row per shot before animating anything. Every row must pass the five-question test (Part 06 §8.0): who acted, what changed, would the real product do this, where was the eye one frame before, what is the one thing to read.

| # | Stage | In-out (s) | Frames | Dur (f) | Shot type | UI source tier | Actor + cause | State A → B | Must-read string (cap px) | Camera | Transition out | Music event | SFX (frame) | Anchor kept across cut |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Hook | 0.00-2.00 | 0-60 | 60 | Type card | — | Caret | empty → typed | "…" (≥70 px cap) | Locked + breathe +6% | Polarity flip cut | Sub impact f0 | — | Caret position |
| 2 | … | | | | | T1-T4 | cursor / key / voice / AI / system | | | | | | | |

**Shot types:** type card · UI wide (context) · UI macro (cut-in) · continuous take (cursor + state changes) · extraction / push-through · screen-to-world (3D) · result hold · CTA card · lockup.

**UI source tiers** (Part 06 §8.2): T1 real UI captured at ≥ max zoom × delivery width; T2 vector rebuild of the real product; T3 stylised recreation with real data; T4 UI grammar only (no product). Use T1/T2 for the proof; T3 for claim illustrations; never let a video model draw readable UI.

**Per-shot spec block** (copy for every UI shot; from Part 06 §8.17.1):

```
SHOT <n> · <name> · <aspect> <W×H> · 30 fps · <duration f>
UI SOURCE   : <tier>; <component names>; vector or ≥ <zoom × width> px
UI BIBLE    : bg <hex>; surface <hex>; text <hex>; accent <hex>; AI colour <hex>;
              radius <px>; shadow y24/blur48/7% + 1 px hairline 6%; font <family, weights>; cursor <type, px>
LAYOUT      : <element: x, y, w, h px> (text rows inside the safe box)
STATE TIMELINE:
  f<a>-f<b>  <element> <A → B>  ease <token>  cause <actor>
CURSOR PATH : f<a> enter <edge> → f<b> <target> E-GLIDE · dwell f<b>-f<c> · press f<c> · consequence f<d>
CAMERA      : locked | breathe +x% linear | cut-in ×n | pull-back ×n f<a>-f<b> E-INOUT
MUST-READ   : "<string>" cap <px>, landed by f<x>, held to f<y>
MUST STAY UNCHANGED : <strings, values, positions, colours, radius, cursor>
SOUND       : click f<c>; keystrokes −22 dB under music; whoosh peak f<…>
NEGATIVES   : no overshoot on UI; no blur below 5% W/f; no generated text; no plane intersections
```

---

## 6. Style direction

### 6.1 Visual

- **Frameless rounded cards by default.** 0 of 8 references show browser chrome; 7 of 8 are frameless. A device frame only when "this is the mobile app" must be explained (Part 06 UI-E01).
- **Hero UI card width:** 65-80% W in 16:9; ≈75% W (810 px) in 9:16.
- **Corner radius:** 24-32 px at 1080p (1.2-1.7% W); glass cards up to 2-3% W.
- **Card shadow at 1080p:** y-offset 24 px, blur 48 px, black 6-8%, plus a 1 px hairline at ≈6%.
- **Depth:** 3 planes (background / UI / accent), 4 only in a hero beat. Glass only over a textured or photographic plate; glass over flat colour reads as a grey box (Part 06 UI-A17).
- **One readable item per UI beat, at most three** (Part 06 UI-L5). Floating annotation cards around a subject: ≤3, one fact each, 4 f stagger, anchored to what they describe.
- **Real data in every visible row.** Bumper uses real merchant IDs, GBP amounts and July 2025 dates [V:19NRDv]. No lorem ipsum, no duplicate rows (Lottieicon's duplicate card is flagged [V:1ccYWJ t=17.9-18.1s]).

### 6.2 Color

Pick one preset (Part 02 §11.13, contrast computed):

| Preset | Canvas | Ink | Accent | AI / state colour | Fits |
|---|---|---|---|---|---|
| Prompt-native minimal [V:1CSXtQ] | #FFFFFF | #1A1A1A (17.4:1) | Brand accent on icon only, e.g. #F65542 | System blue #3585E4 for "on" (non-text, 3.73:1) | AI features, connectors |
| Editorial frame [V:15VhHR] | #F9F5F2 / #02003E | #1B1A55 / white | #DB2C36 (object) | Cyan #43D8F9 as a transient fill only | Platforms, builders |
| Night claim / Day proof [V:19NRDv] | #06004E claims / #FCFCFC proofs | #FCFCFC / #04043C | #F4643C | Mint = matched, red = fail, teal = success, inside UI only | Payments, ops, data |
| Airy Aurora [V:1-6l8S] | #F9FAFC | #0B0B0B | Mint #8EE1B2 for glow only (never on text) | Colour bloom = "listening" | Voice, AI writing |
| Dark neon [V:1ccYWJ] | #0A0F0A + green blobs | #F5F7F5 | #38D037 | Green tile + glow = selected | Dev tools, asset libraries |

Rules:
- **One accent, one meaning.** Colour semantics stay fixed for the whole film: Wix uses cream/navy = brand voice, cyan = AI acting [V:15VhHR]; Lottieicon uses green = alive/selected [V:1ccYWJ].
- **AI colour is a transition, not a resting state:** on for 8-15 f, settled to final colours in 6-8 f; never held >15 f (Part 06 UI-A16).
- Text contrast ≥4.5:1; data marks and state colours ≥3:1 (Bumper's violet-on-navy bars are flagged [V:19NRDv t=11-14s]).

### 6.3 Typography

| Role | 16:9 @1080 | 9:16 @1920 | Rule |
|---|---|---|---|
| Hook line | cap ≥6.5% H (≥70 px cap) | 230-250 px hero word | Part 01 H5 |
| Statement / claim card | 90 px font (cap 63 px) | 128 px font | Part 07 #2 |
| Must-read UI text (query, value, status) | cap ≥3% H (≥32 px cap, ≈46 px font); ≥4% H when the shot exists to show it | font ≥52 px | Part 06 UI-L1 |
| Should-read UI labels | cap 2.5-3% H | ≥36 px | texture if smaller |
| Texture (micro-copy) | <2.5% H, may never carry meaning | <36 px | 8/8 references flag this failure |
| KPI value after cut-in | cap ≈6% H (≈65 px) | ≥96 px | [V:19NRDv t=23.85s] |
| CTA | cap ≥5% H (≥54 px) | ≥64 px font | Part 01 L5 |
| URL | ≥3.5% H | ≥52 px | Lottieicon's 2% H URL flagged [V:1ccYWJ] |

- One sans family for everything, plus at most one accent face with exactly one role. Weight 400 calm premium, 500-600 launch.
- Sentence case. Tracking 0 on lines; −1 to −3% on lowercase display.
- UI body leading 1.4-1.6; display 0.95-1.1.
- ≤6 words per claim card; typed prompts ≤9-10 words visible at once.
- **0% overshoot on type and UI** (8/8 references at 0% on type).

---

## 6b. Technique classes for this format

Each row cites master IDs; the class of an ID is the master's (U universal, S style-specific, X experimental, A avoid, SaaS). The format column says how this format uses it. Assignments to this format are [inferred] from the guideline's own sections unless an evidence tag is given.

| Class | Techniques for this format (master IDs) |
|---|---|
| Universal | Real UI states in order, every change caused (ML-18 cursor, ML-24 microinteractions, ML-07 cascading UI); edit-camera cut-ins CM-20 and macro CM-13; breathing holds CM-02; hard cuts TR-01 and UI morphs TR-07 |
| Format-specific | Prompt-native minimal look; continuous takes of 3.7-8.2 s (DU-S prompt-native row) [V:1CSXtQ]; one pull-back reveal CM-05 from the field to the full UI |
| Experimental | Continuous takes over 6.3 s (DU-X1) [V:1CSXtQ]; cursor as a cue UI-C9 [X]; scroll-whip travel through the UI CM-17 used as the main move |
| Avoid | Generated or redrawn UI (P11 AA-U1); fake progress bars; uncaused UI motion; overshoot on UI (ML-03 [A]); crossfades on UI (TR-24); greeked text in a shot that must be read |
| Especially good for SaaS | Diegetic typing (RV-10) and streaming answers (UI-E04); interaction-triggered transitions TR-20; anchored-element cuts TR-23; dropdowns and menus UI-E07; counters with a parked pointer (UI-E13 [S, SaaS]) |

## 7. Motion language with numbers

### 7.1 Ease tokens to use (Part 03 §19.3)

| Token | cubic-bezier | Use in a UI demo |
|---|---|---|
| E-OUT | (0.33, 1, 0.68, 1) | Card, panel, toolbar and word entrances (23% of travel on f1, 90% by f7 of 12 f) |
| E-SNAP | (0.05, 0.7, 0.1, 1) | Popovers, small pops, hero-word slam |
| E-SNAP-L | (0, 0, 0, 1) | Counters landing on a final value |
| E-GLIDE | (0.25, 0.1, 0.25, 1) | Cursor travel, caret-follow truck, panel slides |
| E-INOUT | (0.65, 0, 0.35, 1) | Reveal pull-back, deliberate cursor travel |
| E-EXIT | (0.3, 0, 0.8, 0.15) | Anything that ends on a cut (send, shrink, punch) |
| E-LERP | k = 0.2-0.25 per frame | Re-centring a growing line; caret-follow |
| E-LINEAR | (0, 0, 1, 1) | Breathing pushes, route draws, colour ramps |
| E-CRIT | spring stiffness 179, damping 26.8 | When a spring API is required but overshoot is not allowed |

Never use Remotion's default spring (damping 10 → 16.3% overshoot) or After Effects' default Easy Ease for entrances (26-39% error).

### 7.2 UI speeds (real software speed inside a slow camera)

| Element | Duration | Stagger | Evidence |
|---|---|---|---|
| Label swap, pressed state, toggle fill | 1-3 f | — | [V:1CSXtQ t=10.200-10.333s] |
| Popover | 1-2 f | — | [V:15VhHR t=24.23s] |
| Dropdown open | 6 f | rows 2 f apart | [V:1CSXtQ t=8.867s] |
| Card entrance | 12 f E-OUT, rise 5-8% H | cards 4 f | Part 06 #4, #8 |
| Result cascade | 8-9 f empty, then 13-22 f | elements 3-4 f, each 4-6 f fade | Part 06 #7 |
| Chips, rows, dots | — | 2 f | Part 03 #15 |
| Words, cells | — | 2-4 f | Part 06 #8 |
| Large objects | — | 5-7 f | [V:15VhHR] |
| Page scroll | ≈1 FH in 12 f E-OUT, blur on f2-4, then land and hold | — | [V:15VhHR t=34.47s] |
| Shared-element morph (card → toast) | 7-13 f; background re-focus 11-12 f | — | [V:126cpH t=11.03-11.43s] |
| Counter | 84 → 95 by f10, → 100 by f33, E-SNAP-L | — | [V:19NRDv t=23.85-24.93s] |
| Text exit | 4-8 f, E-EXIT | — | Part 03 #12 |

### 7.3 Cursor

| Parameter | Default | Evidence |
|---|---|---|
| Type | Native OS arrow → pointer hand on hover (real UI, T1/T2); brand cursor in accent colour with soft shadow (stylised T3/T4) | Part 06 UI-C2 |
| Size | Native ≈2% H (≈22 px @1080p); brand 3-4% H; 9:16 phone UI: a tap ripple, not a desktop arrow | UI-C3, §8.12 |
| Entry | From the bottom, bottom-right or right edge (5/6 refs), or already resting on the first target | UI-C8 |
| Travel | Short hop <20% W: 8-12 f E-OUT. Across UI 20-50% W: 15-20 f E-GLIDE, peak ≈4% W/f on f3-4. Deliberate: 25-27 f E-INOUT | UI-C5; Wix per-frame deltas 3, 10, 13, 11, 8, 5, 4, 3, 3, 3, 2, 2, 2 [V:15VhHR t=2.5-3.07s] |
| Path | Gentle arc or slight lateral drift; never ruler-straight at constant speed; no overshoot, no corrective wiggle | UI-C5 |
| Hover | Arrow → hand + target hover state 3-15 f before the press | UI-C7 |
| Anticipation (travel + dwell) | 18-30 f; up to 44 f when the target is new | UI-C4 |
| Press | Target changes on the press frame; button −15-20% in 3 f, release 6 f, no overshoot | [V:1i2L14 t=33.80s] |
| After | Park beside the result, pointing at it, not covering it; never moves during a reading hold | UI-C8 [V:19NRDv t=24.60s] |
| Count | One cursor, one style, for the whole film | UI-C1 |

### 7.4 Typing and caret

- Prompt the viewer must read (wide): **15-20 chars/s**. Key noun phrase or any ECU: **7-9 chars/s** (first letters ≈4). Filler or already-read text: 25-35 chars/s, bursts to 50 (Part 06 UI-K1).
- Human rhythm: 170-200 ms between words, 0.9-1.1 s pauses at phrase breaks (UI-K2).
- Caret blink 9 f on / 9 f off; hide it when the UI builds around the finished text (UI-K3).
- Caret-lock at ≈65% W once the line passes the centre; long lines overflow the left edge (UI-K4) [V:1CSXtQ t=4.5-7.2s].
- Lock the string: identical characters in every shot of the scene (Wix's "make" vs "create" across a cut-in is flagged [V:15VhHR t=6.57s]).

### 7.5 Holds and life

- Every hold breathes: push +5-15% across the hold (linear), or drift 0.1-0.5% of frame per frame. While text is read: **≤0.2% W/f** (Part 04 #1-3).
- Only the end lockup is fully still (0.8-2.2 s; default 2.2 s).
- One primary UI motion per frame (a cascade counts as one gesture) plus ambient drift (Part 06 #22).
- Overshoot on UI chrome, data and type: **0%**. Playful consumer styles only: ≤25% of the swing, one cycle, settled ≤22 f, on tossed cards and props, never on type (Part 03 #22).

---

## 8. Camera language

| Move | Numbers | Use in a UI demo | Evidence |
|---|---|---|---|
| **Cut-in (default for detail)** | 2-3.5x, instant; target text reaches cap 4-7.5% H | Make a typed line or value readable | [V:15VhHR t=6.57s] 3.4x; [V:19NRDv t=13.13s] 2.5x; [V:1-6l8S t=35.47s] 2x |
| Breathing push | +10% across a 1.5-2 s hold, linear | Every hold | Part 04 #1 |
| Reveal pull-back | x0.75-0.80 over 21-31 f, E-INOUT | Text → UI build, macro → context | [V:1CSXtQ t=8.0-9.03s] |
| Caret-follow truck | Caret held at ≈65% W, or E-INOUT truck, peak ≈22-34 px/f | Long typed queries | [V:1CSXtQ t=13.6-17.3s]; [V:15VhHR t=6.57-8.6s] |
| Extraction push-through | Context flies in 12 f E-OUT; columns extrude ≈0.6 s; push 9 f, x2-2.5; context blurs and falls back | Data, tables, "find the one value" | [V:19NRDv t=16.73-21.55s] |
| Screen-to-world (3D hero) | x0.57 in 10 f, then further x0.56 decelerating over 18-20 f (≈x0.32 in 1 s); environment fades in 6 f | Integrations, "where your data goes" | [V:1CSXtQ t=17.80-19.03s] |
| Hop-and-hold tour | Hops 17-32 f E-HOP, holds 7-20 f; peak ≤8-10% W/f, 180° blur above 5% W/f | Galleries, dashboards | [V:1ccYWJ t=27.13-33.20s], flaw fixed |
| Short animated push into an action | ≈130% in ≈15 f, or 3 f x1.5 accelerating push into a cut-in; ≤2 per film | Draw the eye to the button about to be pressed | [V:15VhHR t=28.0-28.5s] |
| Focus by subtraction | Dim context to 15% (texture) or 50% (secondary) in 3-6 f; or rack focus 8-12 f | Point without moving the frame | [V:1ccYWJ t=9.833s]; [V:126cpH t=11.07-11.43s] |

Rules:
- **Land, then read.** No zoom, pan or scroll while the viewer reads (Part 06 UI-Z5).
- Unblurred speed ≤5% W/f; 5-10% W/f needs 180° blur; above 10% only as a whip into a cut (Part 04 #7). Lottieicon's 22-27% W/f unblurred pans strobe [V:1ccYWJ t=30.57-32.57s].
- Roll 0°, camera overshoot 0% (all 8 references).
- UI plane tilt while read: 0-15°; flatten to 0° in 7-8 f before reading. In transit up to 35°.
- True 3D / DOF budget in minimal styles: **one hero beat, ≈10-15% of runtime** (HubSpot: 3.67 s of 30 s).

---

## 9. Transitions

Defaults (Part 05 §0.3): one scene change every ≈2 s; ≥70% hard cuts; one signature device used 3-12 times; 2-4 hero one-off transitions per film.

| Transition | Spec | Use in a UI demo | Evidence |
|---|---|---|---|
| **Click-caused cut** (signature) | Cut 3-8 f after the press; or white bloom from the clicked tile over ≈6 f | At least 2 per film should be visibly triggered by an interaction | Part 06 UI-P8; [V:1CSXtQ t=10.267-10.367s]; [V:1-6l8S t=36.85-37.15s] |
| UI morph / shared element | 7-13 f; background re-focus 11-12 f | Brand icon → prompt pill; card → notification; headline → composer | [V:15VhHR t=3.97-4.23s]; [V:126cpH t=11.03-11.27s]; [V:1CSXtQ t=7.80-9.03s] |
| Motion match cut (velocity hand-off) | Exit accelerates 3, 3, 5, 7 px/f; enter continues 34, 34, 31, 7, 4 px/f | Send → sent bubble | [V:1CSXtQ t=17.60-17.80s] |
| Anchored-element cut | Anchor holds identical position and size; holds lengthen 21 → 29 → 38 f to land on the hero use case | "Works for every use case" slot machine | [V:15VhHR t=8.63-12.83s] |
| Continuity cut-in / pull-out cut | Same UI, 2-3.5x scale change | Detail ↔ context | Part 04 CM-20 |
| Blur / defocus dissolve | 6 f (4-8) | Into a benefit card | [V:1CSXtQ t=21.47s] |
| Polarity flip cut | Background flips dark ↔ light on a hit | Claim world → proof world | [V:19NRDv]; [V:1CSXtQ t=2.13s] |
| Punch into a cut | +18-33% scale over the last 3-8 f, expo-in; ≤1 per 15-20 s | Climax line → CTA | [V:1-6l8S t=7.83s] |
| Scroll as exit | Accelerate ≈12 → 36 px/f into the cut | Leave a results table | [V:1CSXtQ t=20.40-21.47s] |

Hand-off grammar: the last 6-10 f before a cut accelerate (expo-in); the first frames after it settle (40-64% of travel on f1). Matched elements within ±5% W. Music-led sections: cut 0-2 f **before** the beat, never after. Overshoot on transition elements: 0%.

Avoid: crossfades between UI states (state changes are instant in software), spins, page-curls, glitch transitions, more than 2 mask wipes per film, and a 1 f dip to black between UI shots (Bumper's flaw [V:19NRDv t=25.60s]).

---

## 10. UI treatment

### 10.1 Believability laws (Part 06 §8.1)

1. **Cause:** every state change has an actor visible within the previous 30 f.
2. **Order:** states follow the real product flow.
3. **Speed:** microinteractions at real UI speed (1-6 f) inside a slow camera.
4. **Focus:** one thing changes at a time; the container is still while its content changes.
5. **Payoff:** every action ends on a readable result that is held ≥1.0 s.

### 10.2 Choreography patterns to drop into a storyboard

| Pattern | What happens | Best for | Source |
|---|---|---|---|
| UI-P1 Say → See | Voice card fades in 8 f; words stream at ≈6.9 words/s, each 30% → 100% opacity in 3-4 f; continuity cut; empty hold 8 f; cascade 3-4 f stagger | Voice, AI writing, automation | [V:1-6l8S t=17.03-25.47s] |
| UI-P2 Text → UI build | Headline typed (35 cps filler, ≈9 cps key phrase); 0.6 s hold; bar border 1-3 f, icon pop 3 f, toolbar 4-5 f; pull-back x0.75; dropdown 6 f, rows 2 f; toggle 1-3 f | AI features, connectors | [V:1CSXtQ t=2.13-10.367s] |
| UI-P3 Brand icon becomes UI | Cursor ≈17 f, hover 1.0 s on the icon in the brand sentence, click; icon stretches into the prompt pill in 6 f; cut; drop 8 f after | Brand-led launches | [V:15VhHR t=2.5-4.5s] |
| UI-P4 Locked-anchor slot machine | Prompt bar fixed; backgrounds swap use cases; holds 21 → 29 → 38 f; send; suck-out −35 dB; result builds in 12 f | Multi-use-case platforms | [V:15VhHR t=8.63-12.83s] |
| UI-P5 Context → extraction → focus | Tables fly in 12 f; columns extrude; push-through 9 f; labels drop 5 f; mint fill wipe 4 f = "matched" | Data, finance, ops | [V:19NRDv t=16.73-21.55s] |
| UI-P6 Card → notification morph | Cursor 8 f, dwell 10 f, press, hold 10 f, card collapses into a pill ≈7 f, rack focus 11 f; status cycles, each ≥1.0 s | Workflows, delivery, alerts | [V:126cpH t=9.27-13.60s], flaws fixed |
| UI-P9 Before / after toggle | Cursor flies in ≈6 f, parks; "Without / With" toggle knob ≈4 f; "after" bar rises ≈7 f beside a ghost; 2.5x cut-in to a tooltip | Savings and performance claims | [V:19NRDv t=11.00-14.33s] |
| UI-P11 Collection climax | All outputs gather into one object (3D deck fan ≈11 f, cruise 7 f, accelerate 21 f), collapse into the brand mark in 6 f | Generators, builders | [V:15VhHR t=48.27-49.83s] |

### 10.3 Legibility contract (Part 06 UI-L1)

| Tier | Contents | 16:9 minimum | 9:16 minimum | If smaller |
|---|---|---|---|---|
| Must-read | The one value, the typed query, the status, the CTA | cap ≥3% H; ≥4% H when the shot exists for it | font ≥52 px | Cut in 2-3.5x |
| Should-read | Column headers, tab names | cap 2.5-3% H | ≥36 px | Treat as texture |
| Texture | Everything else | <2.5% H | <36 px | Must still be real content |

If a 16:9 master will be watched inline on phones, must-read body needs ≈84 px: reach it with a cut-in (Wix's ECU input is 81 px cap), not by enlarging the whole UI. All 8 references contain meaning-carrying micro-text and all 8 teardowns flag it: this is the single most common failure (Part 11 MK-01).

### 10.4 Resolution

Rebuild UI as vector, or supply rasters at ≥ max zoom × delivery width. A 3.4x cut-in on a 1920 px delivery needs a ≥6528 px-wide source. HubSpot's greeked, low-resolution page at its hero beat is its main flaw [V:1CSXtQ t=18.4-19.0s].

---

## 11. Sound and music

### 11.1 Music

- **Tempo: 100 BPM default** (beat 18 f, eighth 9 f, bar 2.4 s at 30 fps); stay inside 83-128. Six of eight references sit at 83-113 BPM; median ≈100 (Part 09 §16.3). Whole-frame tempos at 30 fps: 90 (20 f), 100 (18 f), 112.5 (16 f), 120 (15 f).
- Style: minimal electronic or organic pulse with plucks; sparse in the feature-led half, groove after the drop.
- Arc: near-silence or soft plucks under the typed hook → riser (≈4 s) under the UI build cresting 0-2 f before the reveal → **drop on the first product moment** → breakdown (−7 to −17 dB or low-passed) under the densest reading → build into the climax → sting on the lockup, tail 1.2-2.2 s to the last frame.
- Music never ends before the picture (Lottieicon's music is gone 3.7 s early [V:1ccYWJ]).
- Under VO: duck 10-12 dB, attack 30-80 ms, release 250-700 ms.

### 11.2 SFX map (Part 09 §16.7)

| Family | Use in a UI demo | Place at | Level | Budget / 30 s |
|---|---|---|---|---|
| F01 UI click | Send, select, buy: a state change the story depends on | **Press frame (0 f)** | Clear inside a dip; ≥15 dB music dip 0.3-0.5 s before | 1-3 |
| F02 Keystrokes | Typed prompts and headlines | Each burst; single keys only ≤12 chars/s | **20-25 dB under the full music level** | 1 passage |
| F03 Toggle / latch | Toggles, checkboxes, connect | Press frame; optional tick on settle +1-3 f | As F01 | 0-2 |
| F04 Soft tone (ping, success) | Toast, "done", AI result | First full-opacity frame of the toast or result | Blended, +0-4 dB in band, 3-6 kHz | 0-2 |
| F06 Counter ticks | Count-ups | ≤15 ticks/s, one lock accent on the final value | Low | 0-1 |
| F07 Whoosh | The send, one big move | **Peak on the fastest frame** | +3 to +6 dB above 4 kHz | 0-1 (0-2 per film) |
| F09 Riser | Into the reveal and into the lockup | Crest 0-2 f before the hit | Crest ≈ −12 dB | 0-1 |
| F11 Impact | Reveal, result landing, lockup | Event frame ±2 f, after a 70-350 ms gap | +8 to +15 dB over the bed | 3-5 |
| F14 Data shimmer | AI generating | ≤10-15 f under the effect, or silence instead | −6 to −10 dB under bed | 0-1 |
| F16 Ambient floor | Every "silence" mid-film | Continuous | −40 to −45 dB | always |
| F17 Sting | Lockup | ±2 f of the lockup's first full frame | Loudest sustained moment | 1 |

Rules: one click per state change; sound 15-65% of transitions, never all; suck-out ≥15 dB on the decisive click, cut ≈8 f later, hit ≈4 f after the result appears [V:15VhHR t=12.2-12.6s]. Mix to **−14 LUFS ±1, true peak ≤ −1 dBTP** (−16 LUFS for VO-led landing-page embeds; −18 only for speech-dominant how-to content; P09 §16.11.1). Mute and discard any audio a video model returns.

---

## 12. Copy rules

- **Hook ≤7 words (median 4), one idea, on screen at f0.** It shows the product mechanic (a caret for a prompt product, a waveform for voice).
- **Name the job or product by 3-6 s.**
- **Claim cards ≤6 words, one line;** ≥0.3 s per word and ≥1.0 s total for 3+ words. ≤3 same-treatment text cards in a row.
- **UI copy is product copy:** the real query, the real answer, real labels. Never invent output: copy it from the product (motion-kit recipe `app-demo` copy tip).
- **Numbers only with a source** the client gives ("4.8 on the App Store", "from 1,200 beta teams, Sept 2026").
- **Sentence case, no exclamation marks, no hype adjectives** in premium styles. HubSpot uses one hype phrase only ("For the first time ever") [V:1CSXtQ].
- **CTA = verb + destination**, ≤16 characters and 1-3 words on the button; offer or platform in the kicker.
- Close the loop: the lockup repeats the hook's line, colour or motif (6/8 references).

**Hook examples** (pattern → example):

| Pattern | Example |
|---|---|
| Pain question, live-typed | "Still waiting on the data team?" |
| Promise, typed as a prompt | "Ask your data anything." |
| Announcement on black + moving dot | "Now in your inbox." |
| Objection flip | "SQL? Not needed." |
| Dialect / local question (9:16) | "Report kab tak?" |

**CTA examples by funnel stage:**

| Stage | Form | Example |
|---|---|---|
| Awareness | Tagline + logo, soft URL | "Ask. Know." · quarry.app |
| Launch / consideration | Quiet link | "Try Quarry free →" |
| Performance | Button + offer kicker | Kicker "Free for teams of 5" · button "Start free" |
| Feature announcement | Next step | "Open Quarry → Ask" |
| App install | Store button | Kicker "Free on iOS & Android" · button "Download now" |

---

## 12b. Typography

One place for this format's type decisions; sizes are P07 §9.2 tokens (font px at 1920×1080 / 1080×1920), entrances and exits follow P03 SP-T0, word budgets and holds follow P01 H2 and P07 §9.11.

| Item | This format |
|---|---|
| Families and weights | The product's own UI face inside the UI; one sans for supers, 400 calm / 500-600 launch (§6); no second display face |
| Size tokens | T-UI-READ cap 2.8-4.2 % H (43-64 px font at 16:9; ≥52 px at 9:16), ECU 64-115 px after a CM-20 cut-in; T-STATEMENT 90 / 128 px for the few supers; T-LABEL 56-62 / 60-72 px for callouts |
| Reveals | RV-10 diegetic typing (wide 18-20 cps; key phrase 7-9 cps), RV-03 blur-fade labels, RV-14 staggered line fade for answers, RV-25 count-up, RV-28 inline object chip |
| Exits | EX-13 status swap, EX-14 dim when superseded, EX-02 blur dissolve for supers |
| Word budget | Hook ≤7 words (≤5 in 9:16); supers ≤6 words; one must-read string per shot; typed prompts ≤ the line the camera can hold (rewrite, never shrink) |
| Holds | Punch word 10-15 f; kinetic line of ≤3 words ≥10-14 f landed; statement of 4-6 words ≥0.8 s landed; payoff, result or status ≥1.0 s still; no text event under 25 f except SD-03 punch cards in a run (P07 §9.11.2, P08 §17.8 #3-4); lockup ≥1.5 s still (2.2 s premium) |
| Floors | Must-read text inside the safe area (16:9 x 96-1824, y 54-1026; 9:16 x 120-840, y 270-1210); 9:16 body font ≥52 px; contrast ≥4.5:1 (3:1 large), ≥7:1 or a ≥60 % scrim over footage (P07 §9.21, P11 G-27, G-37) |

## 13. Worked example storyboard: "Quarry", 30 s, 16:9 master

**Fictional product.** Quarry: ask your company data a question in plain English, get a chart and share it to a team channel. No SQL.
**Format:** 1920x1080, 30 fps, 900 f. **Template:** T4 Prompt-native. **Style:** prompt-native minimal (canvas #FFFFFF, ink #1A1A1A, accent #5B4BFF used on the Quarry icon and the highlighted bar only, AI shimmer #43C6F9 transitional, system "on" #3585E4). **Type:** one grotesk (Inter-like), 400 / 600. **Music:** 100 BPM (beat 18 f), cuts placed 0-2 f before beats. **Claims:** "40 seconds" is a placeholder; replace it with a measured figure from the client before release.

Cut frames: 0 · 70 · 124 · 232 · 358 · 430 · 502 · 610 · 718 · 754 · 808 · 900 (each 2 f before a beat at 72, 126, 234, 360, 432, 504, 612, 720, 756, 810). Climax at 79.8% of runtime.

| Scene | Timestamp | Duration | Visual | UI / product action | Camera | Object motion | Text | Transition (out) | Lighting | Sound | Music | Motion notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 Hook | 0:00.00-0:02.33 (f0-70) | 2.33 s (70 f) | White canvas, caret blinking at frame centre on f0 | Question types itself: "Still waiting on" at 30 cps, "the data team?" at 9 cps | Locked; breathe +6% linear | Line re-centres with E-LERP k 0.22 as words append; caret 9 f on / 9 f off | "Still waiting on the *data team*?" cap 76 px (7% H); accent word in #5B4BFF | Hard cut f70 (2 f before beat) | Flat, no shadow | Quiet keystrokes −22 dB under bed; soft tick f0 | Plucks, sparse, from f0 | First character on f2; text and caret on the thumbnail frame |
| 2 Setup | 0:02.33-0:04.13 (f70-124) | 1.80 s (54 f) | A grey chat thread card, 65% W, centred | Three "bump" messages stack: "Any update on Q3 churn?" Mon / Wed / Fri, 4 f stagger, each 12 f E-OUT | Locked; slow push +4% | Messages rise 6% H, opacity 8 f; older messages dim to 50% | Must-read: "Any update on Q3 churn?" cap 36 px; timestamps are texture | Hard cut f124 on a hit; colour field flips grey → white | Desaturated (card #F2F2F2, ink #6B6B6B) = the "problem world" | Three soft F04 pings on each message's first full frame, −6 dB | Plucks thin out; 300 ms gap f115-124 | Problem told in UI, not with a stock photo of a frustrated person |
| 3 Reveal | 0:04.13-0:07.73 (f124-232) | 3.60 s (108 f) | "Just ask *Quarry*." typed on white; then a composer builds around the line | f124-150 typing at 28 cps; f150-168 hold 0.6 s; f168 border + shadow (2 f); f171 Quarry icon pops in the bar (3 f, E-SNAP); f174-179 toolbar chips "Sources · Charts" slide up (5 f, 2 f stagger) | f180-208 pull-back x1.00 → x0.75, E-INOUT | Composer 1240x140 px, radius 28 px, shadow y24/b48/7% + 1 px hairline | "Just ask *Quarry*." cap 63 px (5.8% H) → becomes the composer placeholder at 46 px | Hard cut f232 into a 2.5x cut-in on the composer (continuity cut) | White, soft top light; first appearance of the card shadow | Riser f112-230, crest f230 (0-2 f before the cut); F11 impact on f232 at +10 dB | Riser into **drop at f234** | UI-P2 text → UI build [V:1CSXtQ t=7.80-9.03s]; headline literally becomes the product |
| 4 Proof: query | 0:07.73-0:11.93 (f232-358) | 4.20 s (126 f) | Macro on the composer, input text cap 4.2% H (45 px cap) | f238-288 types "Churn by region" at 9 cps (key phrase); f288-300 pause; f300-315 types ", Q3 vs Q2" at 20 cps; f315-333 hold; cursor enters bottom-right f316, glides 17 f E-GLIDE to Send (peak ≈4% W/f on f3-4), hovers (arrow → hand, button tint) f333-343; **press f343**: button darkens on f343, −18% in 3 f | Caret-follow truck: caret held at ≈65% W, E-LERP; locked after typing ends | Cursor arc with slight lateral drift; no overshoot; f346-356 composer content rises 3, 3, 5, 7, 9 px/f (E-EXIT) | Typed query (must-read) | Motion match cut f358: velocity hand-off to the sent bubble | Same white set | Keystrokes −22 dB; music dips 15 dB f328-343; F01 click on f343 (0 f) | Groove arrives at the drop f234; dip before the click | Anticipation 27 f (17 travel + 10 dwell); consequence 3 f after the press [UI-C4, UI-C6] |
| 5a Proof: result | 0:11.93-0:14.33 (f358-430) | 2.40 s (72 f) | Answer card under the sent bubble: title + 4-bar chart (NA, EMEA, APAC, LATAM) | f358-366 sent bubble continues up 34, 34, 31, 7, 4 px/f (E-OUT); f366-378 "Querying 3 sources…" shimmer in #43C6F9 (12 f) settles to ink in 6 f; f378-386 empty card holds 8 f; f386 title; f389, 392, 395, 398 bars grow 12 f E-OUT each (3 f stagger) | Locked; breathe +5% linear | Bars grow from baseline; values count up E-SNAP-L; APAC bar fills #5B4BFF, others #C9CCD3 | Title "Churn by region · Q3 vs Q2" cap 36 px; bar labels 32 px cap | Hard cut f430: 2.5x cut-in on the APAC bar | Flat; one soft shadow under the card | F14 shimmer ≤12 f at −8 dB; F04 success tone on f386 | Groove continues | Cascade total 24 f in reading order (UI-P1 grammar); one primary motion at a time |
| 5b Proof: the value | 0:14.33-0:16.73 (f430-502) | 2.40 s (72 f) | Cut-in 2.5x on the APAC bar and its tooltip | f436 tooltip pops (2 f): "APAC +2.1 pts · driven by annual plans"; other bars dim to 15% over 4 f; f440-450 cursor drifts in 10 f and parks 40 px right of the value | Locked, then breathe +4% | Tooltip E-SNAP, 0% overshoot; cursor parked, still during the read | Must-read "APAC +2.1 pts" cap 65 px (6% H), held f440-500 (2.0 s) | Hard cut f502 back to 1x (pull-out cut) | Same | Soft tick on the tooltip pop (F05, −8 dB) | Groove | Focus by subtraction; nothing moves while the value is read |
| 6 Proof: share | 0:16.73-0:20.33 (f502-610) | 3.60 s (108 f) | Answer card at 1x with a "Share" button top-right | Cursor travels 15 f to "Share", hover 8 f, **press f527**; menu opens 6 f, rows 2 f apart; cursor hops 10 f to "#revenue", **press f551**; f556-565 card collapses bottom-anchored into a toast pill (9 f), background racks from 40 px blur to sharp channel view (11 f); toast "Posted to #revenue" holds f566-600 | Locked; rack focus on the background | Shared-element morph, width −20%, E-OUT; no bounce | Must-read "Posted to #revenue" cap 40 px, held 34 f + | Hard cut f610 on a beat; blur-dissolve 6 f into the benefit card | Same; channel view lit evenly | F01 click on f527 and f551; F04 soft chime on f566 | Groove; starts thinning f590 | UI-P6 morph [V:126cpH t=11.03-11.43s] with its 2 f status flaw fixed |
| 7 Benefit / breather | 0:20.33-0:23.93 (f610-718) | 3.60 s (108 f) | Claim card on white; faint ghost of the chart at 8% opacity behind | Three short lines build: "No SQL." f612, "No ticket." f648, "No waiting." f684 (one per 2 beats), each 6 f E-OUT from 4% W offset; earlier lines dim to 40% | Card shrinks −15% across the shot, linear | Word entrances only; one primary motion at a time | "No SQL. No ticket. No *waiting*." cap 63 px | Word-spacing exit (gaps x1.5 over 18 f) → hard cut f718 | Flat | No SFX (breather) | Breakdown −9 dB, low-passed | Motion ≤1/10 of the proof peaks; the energy dip is deliberate (Part 08 #11) |
| 8 Climax | 0:23.93-0:25.13 (f718-754) | 1.20 s (36 f) | Tagline on white | "Ask." lands f720 on the beat; "*Know.*" lands f738 on the next beat | Punch +20% scale over the last 6 f (E-EXIT, per-frame growth ≈x1.5) | Words E-SNAP from 1.4x, 8 f | "Ask. *Know.*" cap 130 px (12% H) | Punch into a hard cut f754 | Flat | F11 impact on f738 (+12 dB) | Build f700-738, hit f738 | Hero moment 3 at 82%; hook's accent colour returns on "Know." |
| 9 CTA | 0:25.13-0:26.93 (f754-808) | 1.80 s (54 f) | CTA card | Link enters spaced and tightens over 9 f; underline draws 12 f, E-OUT | Locked; shrink x0.85 on the way out (last 8 f, E-EXIT) | No pulsing; 0% overshoot | "Try Quarry free →" cap 58 px (5.4% H); kicker "Free for teams of 5" cap 32 px | Hard cut f808 on the beat | Flat | — | Pad under the CTA | CTA above y 918 (player controls) |
| 10 Lockup | 0:26.93-0:30.00 (f808-900) | 3.07 s (92 f) | Quarry icon + wordmark, 22% W, centred; URL below | Halves converge 8 px per side over 9 f, then dead still from f834 (2.2 s) | Locked | None after f834 | "Quarry" wordmark (official SVG); "quarry.app" cap 40 px | End on the last frame; no fade (hard end after the sting tail) | Flat | 100 ms gap f808-811, F17 sting f811, decays to f900 | Resolves on the lockup; music lasts to the last frame | The only fully still frame in the film |

**Rhythm check.** 11 shots, ASL 2.73 s, median 2.40 s, longest 4.20 s (14% of runtime). Hero moments at f124 (14%), f343-358 (38-40%) and f738 (82%). Proof blocks shrink 4.2 → 2.4 → 2.4 → 3.6 s. Interaction-triggered transitions: 3 (send f343 → f358, share → toast, click → morph). Every state change has an actor.

**9:16 cutdown (15 s, 450 f), re-laid out, not cropped.** Hook 0-45 ("Still waiting on the *data team*?" 3 lines, 128 px); setup merged into the hook; reveal 45-135 (composer 810 px wide at y 600); proof 135-315 (query typed 9 cps → tap ripple on Send → result card 810x845 px with the APAC value cut in to 96 px font, held 1.0 s); climax 315-360 ("Ask. *Know.*" 240 px); CTA 360-390 (button "Try free", 64 px); lockup 390-450. All text inside x 120-840, y 270-1210; the toast pill sits ≤ y 1210.

---

## 14. Building it with motion-kit vs generative video vs 3D

### 14.1 What motion-kit can build directly

Scene types available: hook, kinetic, orb, title, stat, list, compare, bars, grid, quote, prompt, chat, wave, image, clip, cta, logo. Themes: midnight, clean, neon, editorial, pop, desi, corporate, mono, studio, studio-dark. Formats: reel, portrait, square, landscape.

| Storyboard scene | motion-kit scene | Notes |
|---|---|---|
| 1 Hook (pain question) | `hook` (setup + punch) or `kinetic` | `hook` lands the punch with an impact; for a typed-question feel use `chat` with no reply |
| 2 Setup (bumped thread) | `chat` (prompt = the bump message) or `list` with `style: "crosses"` | The thread stack itself needs a custom scene |
| 3 Reveal | `title` (kicker = product, headline = promise) | Text → UI build morph is not in the kit |
| 4 + 5a Query → result | `prompt` (label, prompt, button, result) | Built-in: card, typing, cursor glide to the button, click, "Generating…" shimmer, result |
| 5a Chart | `bars` with `highlight` | 2-6 bars, accent on the highlighted one, values grow |
| 5b The value | `stat` (value "+2.1 pts", label "APAC churn, Q3") | Count-up with a meter; stands in for the cut-in |
| 6 Share → toast | `chat` (prompt "Share to #revenue", reply "Posted ✓") | The shared-element morph needs a custom scene |
| 7 Benefit | `list` with `style: "lines"` or `kinetic` | `lines` dims earlier lines, matching the spec |
| 8 Climax | `kinetic` (lines ["Ask.", "*Know.*"]) | |
| 9 CTA | `cta` with `style: "link"` (launch) or `"button"` (performance) | |
| 10 Lockup | `logo` (name, tagline, src) | |
| Real product screenshots | `image` (`fit: "contain"`, `move: "in"`) | Supply ≥2x delivery width; the move is slow, so treat it as a read hold |
| Real screen recording | `clip` with `area` and `scrim` | Recordings must be re-captured at the delivery frame rate and cleaned (no notifications, real data) |

Video settings for a UI demo: `format: "landscape"` master plus `reel` cutdown; `theme`: `clean` (light Apple-like UI), `corporate` (B2B, finance), `studio` / `studio-dark` (AI launch, calm), `neon` (developer tools), `mono` (Swiss minimal); `motion: "smooth"` or `"calm"` (**never `bouncy`** on UI: it adds overshoot); `transition: "cut"` or `"blur"`; `pace: "normal"`. Run `npm run brand` for accent colours, `npm run music -- specs/x.json --track ...` to snap cuts to the beat, `npm run check`, `npm run preview`, `npm run qa`, then `npm run make`. Start from the `app-demo` recipe (`motion-kit/specs/recipes/app-demo.json`).

Example spec for the Quarry master (fits the schema in `skills/motion-director/references/scenes.md`):

```json
{
  "format": "landscape",
  "theme": "clean",
  "motion": "smooth",
  "pace": "normal",
  "transition": "cut",
  "brand": { "name": "Quarry", "accent": "#5B4BFF", "logo": "brand/quarry.svg", "handle": "quarry.app" },
  "audio": { "sfx": true, "music": "music/pulse-100bpm.mp3" },
  "scenes": [
    { "type": "hook", "setup": "Q3 churn report:", "punch": "Still waiting on the *data team*?" },
    { "type": "chat", "label": "#revenue", "prompt": "Any update on Q3 churn? (3rd ask)" },
    { "type": "title", "kicker": "Quarry", "headline": "Just ask *Quarry*.", "sub": "Plain English in. Charts out." },
    { "type": "prompt", "label": "Ask your data", "prompt": "Churn by region, Q3 vs Q2", "button": "Ask", "result": "APAC churn *+2.1 pts*", "resultKind": "text" },
    { "type": "bars", "title": "Churn by region, Q3", "unit": "%", "bars": [
      { "label": "NA", "value": 3.1 }, { "label": "EMEA", "value": 3.4 },
      { "label": "APAC", "value": 5.6 }, { "label": "LATAM", "value": 2.8 } ], "highlight": 2 },
    { "type": "chat", "label": "Share", "prompt": "Share to #revenue", "reply": "Posted to *#revenue* ✓" },
    { "type": "list", "items": ["No SQL.", "No ticket.", "No *waiting*."], "style": "lines" },
    { "type": "kinetic", "lines": ["Ask.", "*Know.*"] },
    { "type": "cta", "kicker": "Free for teams of 5", "action": "Try Quarry free", "style": "link", "handle": "quarry.app" },
    { "type": "logo", "name": "Quarry", "tagline": "Ask. Know." }
  ]
}
```

(Chart values are illustrative. Replace them with the client's real figures before release.) This spec passes `npm run check` (with a real logo file and music track in `public/`). Timed from its words at `pace: "normal"` it runs 32.3 s; to land exactly on 30.0 s, set `duration` on scenes 1-3 (2.3 / 1.8 / 3.6 s) or add `audio.beats` with `npm run music` so cuts snap to the 100 BPM grid.

### 14.2 Where the kit falls short of this guideline (and the fix)

| Gap | Guideline target | Kit behaviour today | Fix |
|---|---|---|---|
| Typing speed | 15-20 cps readable, 7-9 cps key phrase, human pauses | `prompt` types linearly at ≈60 cps (length/2 frames, 18-60 f); `chat` at ≈30 cps (24-75 f) | Keep prompts ≤40 characters so the typing is readable; for key-phrase pacing, write a custom scene or patch the planner in `motion-kit/src/engine/plan.ts` |
| Cursor anticipation | 18-30 f travel + dwell, hover state, press on frame | `prompt` cursor: 22 f in-out glide, click on arrival, no dwell or hover | Acceptable for reels; for the 16:9 master, add a 10 f dwell + hover in a custom scene |
| Consequence timing | 3-8 f after the press (shimmer allowed 8-15 f) | Result ≥24-28 f after the click | Fine when the AI step is real; shorten for instant actions |
| Real product UI | T1/T2 rebuilt UI with must-read text ≥3% H | Kit cards are generic | Rebuild the product's key screen as a custom Remotion scene (`docs/ADDING-SCENES.md`), or use `image` with a ≥2x screenshot |
| Cut-in on a UI region | 2-3.5x instant | No region cut-in | Use `stat` for the value; or a custom scene with a scale-cut |
| Shared-element morph, toast, text → UI build, extraction push-through | 7-13 f morphs | Not available | Custom scene |
| Overshoot | 0% on UI | `bouncy` springs overshoot ≈3% on text, ≈10% on buttons | Use `smooth` or `calm` |
| Breathing on holds | +5-15% push | Theme-dependent | Check in `npm run preview` |

### 14.3 What needs generative video (Flow / Veo / Sora / Runway / Kling / Higgsfield)

Rule (Part 11 AA-U1): **generate atmosphere, compose meaning.** A video model may produce only layers whose exact content does not matter.

| Layer | Generate? | Tool notes |
|---|---|---|
| Defocused lifestyle plate behind glass UI (desk, office, café) | Yes | Veo 3.1 / Flow: clips of 4, 6 or 8 s at 24 fps; Runway, Kling, Sora, Higgsfield similar. One slow move or locked-off; extra 40-60 px blur in compositing; no faces in focus |
| Abstract light, gradient fields, texture | Yes | Or build in-engine (orb, gradients) |
| Product UI, dashboards, charts, cursor, type, numbers, logo | **Never** | Deterministic layers only (UI-A14: warped glyphs, changing text, identity drift) |
| Real customers, founders | **Never** | Real footage with releases, or a quote card |
| Generated audio | **Discard** | Rebuild from the cue sheet |

Plate prompt pattern: "Locked-off medium-wide shot of a sunlit desk by a window, warm morning light from the upper right, very shallow depth of field so the scene is softly out of focus, gentle movement of leaves only, no people, large clean empty area across the top two thirds of the frame. 8 seconds." Negative: "text, letters, captions, subtitles, user interface, screen, watermark, logo, numbers, faces, hands" (Part 06 §8.17.3). Generate 1.5-2 s longer than the edit length, 2-4 takes, same model and seed per look, conform 24 → 30 fps with optical flow (never frame duplication), grade all plates in one pass, and log model, prompt, seed and date for every kept take.

### 14.4 What needs 3D

Use 3D for at most one hero beat (≈10-15% of runtime) in minimal styles:
- **Screen-to-world pull-back** for connectors and integrations (x0.32 in ≈1 s; blue-grey studio #C8D4DF → #F4F5F8) [V:1CSXtQ t=17.80-19.03s].
- **Tilted UI planes and extraction push-throughs** for data products [V:19NRDv t=16.77-20.50s].
- **Collection climax** (3D deck of generated outputs) [V:15VhHR t=48.27-49.83s].
- **3D brand cursor** (glossy arrow) in stylised T3 films [V:19NRDv].

Build in Remotion with `@remotion/three` (UI textures rendered as vector or at ≥ max zoom × width), After Effects 3D layers, Blender, or a 3D scene builder. Keep planes from intersecting (HubSpot's flaw), roll 0°, one key light, DOF only on what is not read.

---

## 15. QC checklist (UI Product Demo)

Run per shot (frame by frame), then on the locked cut, then on every delivered file.

**Story and copy**
- [ ] Hook text is on frame 0, first change by f3, ≤7 words, shows the mechanic.
- [ ] Product or job named by 3-6 s.
- [ ] One use case end to end (≤30 s) or the same demo grammar ≥3 times (≥45 s).
- [ ] Every number has a client-supplied source; no placeholder ("40 seconds", "[4.8]") remains.
- [ ] CTA is a verb + destination, cap ≥5% H, above y 918 (16:9) or inside y 270-1210 (9:16).

**UI believability (Part 06 §8.18)**
- [ ] Every state change has an actor visible within the previous 30 f.
- [ ] State order matches the real product flow (checked with the product team).
- [ ] Every string identical in every shot of a scene; no lorem, no duplicate rows, no unknown app icons.
- [ ] Must-read text: cap ≥3% H (16:9) / font ≥52 px (9:16); after a cut-in ≥4% H.
- [ ] Every must-read state held ≥ max(1.0 s, 0.33 s × words + 0.4 s); statuses ≥30 f.
- [ ] One primary UI motion per frame.
- [ ] 0% overshoot on UI chrome, type and data.
- [ ] Cursor: one style; anticipation 18-30 f; target changes ≤1 f after the press; consequence 3-8 f; no teleports; parked during reads.
- [ ] Microinteractions 1-6 f; cards ≈12 f; nothing faster than 5% W/f unblurred.
- [ ] AI colour settles within 6-8 f; never held >15 f.
- [ ] ≤3 depth planes (4 in the hero beat); no plane intersections; glass only over texture.
- [ ] Text sharp at maximum zoom (source ≥ zoom × delivery width).
- [ ] Contrast: text ≥4.5:1; data marks and state colours ≥3:1.
- [ ] No accidental crops; deliberate crops ≥30% off-frame.
- [ ] No readable UI or text produced by a video model.

**Rhythm and sound**
- [ ] ASL 1.8-3.0 s; a discrete event at least every 1.5 s except the designed breather and the end hold.
- [ ] Music-led cuts land 0-2 f before the beat, never after.
- [ ] Drop on the first product moment, 0-8 f after its cut.
- [ ] Click on the press frame; keystrokes 20-25 dB under the music; ≤2 whooshes per film.
- [ ] Final lockup dead still ≥1.5 s (default 2.2 s); music lasts to the last frame.
- [ ] −14 LUFS ±1, true peak ≤ −1 dBTP, measured on the final MP4.

**Delivery (Part 11 §22.4)**
- [ ] Exact size per format; constant 30 fps; zero duplicated frames inside moves.
- [ ] H.264 High, yuv420p, BT.709 tagged; ≥12 Mb/s at 1080p for UI-heavy films (never below 8); CRF 16-18.
- [ ] Frame 0 works as the thumbnail; no unplanned black frame; `+faststart`.
- [ ] 9:16 cutdown re-laid out (not cropped), safe-box checked; sidecar captions if there is VO.
- [ ] Private test upload played at 1:1 on a phone.

---

## 16. Common mistakes

| Mistake | Seen in | Why it hurts | Fix |
|---|---|---|---|
| Meaning carried by micro-text (1-2% H) | 8/8 references, e.g. Bumper ≈1% H [V:19NRDv], Wix 1-1.5% H [V:15VhHR] | The message is lost on phones | Cut in 2-3.5x on the one value; everything else is texture |
| Raw screen recording, browser chrome, or a device/player wrapper | NOSTRA's wrapper uses 21% of height [V:1i2L14] | Wastes resolution, reads as unproduced | Frameless rebuilt UI |
| Random floating screens: tilted UI drifting and glowing with no actor | (the anti-pattern every teardown names) | Reads as a stock template; proves nothing | Five-question test; an actor for every change |
| A key state on screen for under 1 s | Chowdeck's "Order delivered" for 2 f [V:126cpH t=13.53s] | Subliminal payoff | Hold ≥30 f |
| Copy changing between a wide shot and its cut-in | Wix "make" vs "create" [V:15VhHR t=6.57s] | Breaks the "real product" contract | One string table |
| Greeked or low-res UI in the hero beat | HubSpot [V:1CSXtQ t=18.4-19.0s] | Fails exactly where viewers look | Vector or ≥ zoom × width rasters |
| Fast unblurred pans over UI | Lottieicon 22-27% W/f [V:1ccYWJ t=30.57-32.57s] | Strobing | Cap at 8-10% W/f, blur above 5% W/f |
| Cursor that teleports, wanders through a read, or moves at constant speed | (generic failure; UI-C12) | Reads as a macro or a capture artefact | E-GLIDE travel, dwell, park |
| Prompt typed at machine speed (60 cps) | Generic templates; kit default | Viewer cannot read the input that justifies the output | 15-20 cps; key phrase 7-9 cps |
| Bounce or elastic on buttons and cards | Remotion default spring (16.3% overshoot) | Toy-like; undermines "precise software" | E-OUT / E-CRIT; `motion: "smooth"` |
| AI shimmer left on resting UI | [V:15VhHR §Avoid] | Reads as a glitch | 8-15 f, then settle |
| Fake progress bars for AI work | [V:15VhHR rule 5] | Dishonest and dull | Show the real "acting" state ≤15 f, then the result |
| Too many readable items on one frame | (UI-L5) | Becomes a screenshot to pause | One readable item per beat, ≤3 |
| Text-card fatigue between demos | kivi 5 cards in a row, Lottieicon 6 in a row [V:1ccYWJ] | Mid-film energy dip | ≤3 same-treatment cards; alternate claim and proof |
| Weak ending: bare URL, no lockup, music ends early | Lottieicon music gone 3.7 s early [V:1ccYWJ]; kivi bare URL [V:1-6l8S] | The ask is lost | CTA card + still lockup + sting tail to the last frame |
| 25 → 30 fps conversion by frame duplication | Wix, HubSpot, Solar | Judder on every scroll and glide | Render natively at 30 fps |
| Delivered under 1080p or at low bit rate | 8/8 as received; HubSpot ≈175 kb/s video | Blocky small text | 1080p+, ≥12 Mb/s |
| Desktop arrow on a phone UI in 9:16 | (inferred, Part 06 §8.12) | Fidelity error | Tap ripple and press state |
| Status pill below y 1210 in 9:16 | Chowdeck's pill at ≈70% H [V:126cpH t=11.20s] | Covered by captions and buttons | Keep text-bearing UI inside y 270-1210 |
