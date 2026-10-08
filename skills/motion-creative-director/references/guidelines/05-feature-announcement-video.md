# Specialised Guideline 05: Feature Announcement Video

A short film that tells people who already know the product (and the market watching it) that **one new capability exists**, shows the difference it makes in one real interaction, and tells them **where to find it, who gets it and when**. It is not a product launch (Guideline 01: a new product, a new brand) and not a full UI walkthrough (Guideline 02: how the product works). It is the delta: before → now → here's where.

This guideline condenses the Master SaaS Motion Design System (Parts 01-11 in `research/master/`) and the eight frame-measured teardowns in `research/videos/` into one working spec for this format. Every number is in frames at 30 fps (f) unless stated; 1 f = 33.3 ms. "% W" and "% H" are percent of frame width and height. Numbers are measured in the references unless marked [inferred] (derived by this guideline from measured rules, not observed directly).

| Tag | Reference (file in `research/videos/`) | What it teaches a feature announcement |
|---|---|---|
| [V:1CSXtQ] | OpenAI x HubSpot connector, 16:9, 30 s (`1CSXtQSs2jM0WBQP6LPDVpDgkt8JLdUkw.md`) | The best measured *feature* announcement: "For the first time ever" event hook on black, typed promise becomes the UI, one query → answer, one 3D hero beat, CTA + reprised lockup |
| [V:1ccYWJ] | Lottieicon library launch, 16:9, 44.3 s (`1ccYWJ6nQXdqt1UQrpz2mE0ODScG_hU0K.md`) | The "something new" grammar: notification-bell zero-copy hook, "Introducing" scale-pop and suck-in, audience slot machine, peak-velocity SFX; and its weak ending |
| [V:19NRDv] | Bumper PRO payments, 16:9, 67.2 s (`19NRDvazRJFCFcAfehavceGsUMV64qBRv.md`) | The "Without / With" toggle: the cleanest way to show a delta. Claim/proof alternation, polarity-flip cuts |
| [V:126cpH] | Chowdeck delivery app, 9:16, ≈18 s (`126cpH-FXL4FxTwRwoJvt9M4FNwBB7peq.md`) | The only native vertical: one transaction told end to end in ≈8.4 s, card → notification morph |
| [V:15VhHR] | Wix AI site builder, 16:9, 53.9 s (`15VhHRcisoHSPWY0VA06PzA3u_y-4qJY_.md`) | The entry point as hero: the brand CTA icon becomes the UI; anchored-element slot machine; 3.4x cut-ins |
| [V:1-6l8S] | kivi voice AI, 16:9, 77.8 s (`1-6l8SV5NXZQotrYoV8KqKV7SJPvtssso.md`) | Say → see loop; empty-container hold then cascade; colour bloom as "on" |
| [V:1i2L14] | NOSTRA studio promo, 16:9 inset, 35 s (`1i2L14p-cvnLcIl6XY7mUQEiTYZy_OWUA.md`) | Click-caused transitions; CTA button press; the cost of a player wrapper |
| [V:1Hcg3X] | Solar explainer, 16:9, 35.8 s (`1Hcg3X8G_q34iS-RqcAQ2pMHpGkIhxu3j.md`) | State-change-by-colour; recap triptych; legibility floor |

Master cross-references use Part and rule IDs (for example Part 06 UI-C4 is cursor rule C4 in `master/06-ui-animation-system.md`; Part 08 PL-10 is the 10 s timing plan in `master/08-editing-rhythm-durations.md`).

---

## 1. Purpose and audience

**Purpose.** Move one feature from "shipped" to "used". The film has four jobs, in this order:

1. **Flag it as new** within the first 2 s, so existing users stop scrolling ("this is about the tool I already pay for").
2. **Show the delta**: the old way and the new way, side by side or one after the other, so the value is obvious without explanation.
3. **Prove it once**: one real interaction with an actor, a state change and a readable result (the proof-block grammar of Guideline 02 §4.2).
4. **Route the viewer**: where it lives in the product (the entry point), who has it (plan), on which platforms, and from when. A feature announcement that doesn't say where to find the feature fails its main job, even if the film looks good.

**Audience.**

| Viewer | Where they meet it | What they need | Design consequence |
|---|---|---|---|
| Existing users | In-app modal, changelog page, release email GIF, product's own social | Recognise their own UI; find the button | Real UI (tier T1/T2), the entry point shown on screen, product chrome they know |
| Admins and buyers on paid plans | LinkedIn, email, the help centre | "Is it on my plan? Do I need to switch it on?" | Availability chips: plan, platform, date; "On by default" or "Turn on in Settings" |
| Prospects and press | X, LinkedIn, Product Hunt, YouTube | Why this matters versus competitors | The delta in one picture; a sourced number |
| Internal teams (sales, support) | Slack, enablement decks | A clip they can drop into a demo | A clean 16:9 master with no burned-in offer, plus a 6-10 s loop |

**The promise the film makes.** "This is real, it is in your product now (or on a stated date), and this is exactly what it does." Showing a flow the product cannot yet do, a plan that does not include it, or a date that slips costs more trust than the film earns.

---

## 2. When to choose this format

Choose a Feature Announcement when **all** of these are true:

1. The product already exists and has users or a known brand (otherwise use Guideline 01, SaaS Product Launch Film).
2. The news is **one feature** (or a release of 2-4 related features, see the release-week variant in §4.5).
3. The feature has a **visible before/after**: a toggle, a new button, a new panel, a result that used to take steps.
4. There is a concrete **availability statement**: plans, platforms, and "today", a date or "rolling out".

| Situation | This format? | Better alternative |
|---|---|---|
| One new feature in an existing product | **Yes**, 15-30 s | — |
| A new AI capability inside an existing product (assistant, generator, connector) | Yes, with the prompt-native proof (T4) [V:1CSXtQ] | Guideline 03 (AI Technology Launch) if the AI *is* the product |
| Integration or partner connector | Yes: co-brand event hook + screen-to-world beat [V:1CSXtQ] | — |
| Release week / quarterly drop of 3-6 features | Yes, release-week variant (§4.5), or the Launch Recap Sizzle style (Part 10 ST-C3) | — |
| Small fix, UI polish, performance tweak with no visible delta | No | A changelog GIF (§3.3 loop) or a static post |
| A brand-new product or company | No | Guideline 01 |
| "How do I use it?" for existing users, step by step | No (too long for this format) | Guideline 02, or a 45-90 s feature-demo-series film (Part 10 ST-C2) |
| Feature not yet shipped, date unknown | Only as a teaser (§4.4, 6-10 s, "Coming soon" + waitlist) | — |
| Invisible value (security, latency, infra) | Only with a visible proxy (a gauge, a colour state, a before/after number) [V:1Hcg3X] | Explainer |

**Story template.** A feature announcement is Part 01's **T4 Prompt-native** (for AI features) or **T3 Single-transaction** (for everything else), plus one stage the master templates do not have: **Access** (where, who, when). The signature structure of this guideline is therefore:

> **New → Before → Reveal → Proof → Delta → Access → Climax → CTA → Lockup**

---

## 3. Platforms, aspect ratios and length

### 3.1 Formats

| Format | Size | Typical placement | Text-safe box | motion-kit `format` |
|---|---|---|---|---|
| **16:9 master** | 1920x1080 | Blog/changelog post, YouTube, LinkedIn, X, sales enablement, Product Hunt | x 96-1824, y 54-1026; CTA and URL above y 918 (player controls) | `landscape` |
| 9:16 | 1080x1920 | Reels, Shorts, TikTok, Stories, in-app full-screen story | **x 120-840, y 270-1210** (union of Reels-ads, TikTok and Shorts) | `reel` |
| 1:1 | 1080x1080 | Feed, release email, in-app modal | x 135-945 | `square` |
| 4:5 | 1080x1350 | Instagram / LinkedIn feed | x 88-992 | `portrait` |
| In-app / changelog loop | Usually 16:10 or 4:3 at 1600x1000 or 1440x1080, silent | "What's new" modal, help-centre embed, docs | 8% margin on all sides [inferred] | Render `landscape` and crop in delivery, or build a custom composition |

Sources: Part 02 §4.7; Part 06 §8.12; Guideline 02 §3.1. 9:16 is a **re-layout, not a crop**: a 9:16 window cut from a 1920x1080 master is 608 px wide (Part 02 CO-U18). Stack panels, put the feature name above the UI and the availability chips below it.

### 3.2 Length

| Runtime | Use | Plan to start from | What fits |
|---|---|---|---|
| **6 s (180 f)** | Bumper, in-feed teaser, "it's live" social post | Part 08 PL-05, stretched | New flag + feature name 1.5 s, one state change 2.5 s, lockup with "Now in [Product]" 2.0 s |
| **10 s (300 f)** | Teaser / micro-demo, story ad, "coming soon" | PL-10 | Hook, reveal, one take of the proof, payoff, lockup |
| **15 s (450 f), vertical default** | Social cutdown, app-install style | PL-15 / T3 | One transaction end to end (≈6 s of proof, 40%), availability in the CTA kicker |
| **30 s (900 f), 16:9 default** | The master for a meaningful feature | §4.1 (this guideline) | Before, reveal, one proof (two micro-blocks), delta, access, CTA, lockup |
| 45 s (1350 f) | Release week: 3 features | §4.5 / Part 01 T8 + Part 10 ST-C3 | Chapter card + 9-10 s per feature, shared access card |
| 60-90 s | A big platform feature with VO | Guideline 02 T9, Part 01 T10 | Only when the feature needs 3+ steps to understand; otherwise cut to 30 s |

Rules:
- **≤30 s tells one use case end to end** (Part 01 TS3). HubSpot proves its connector with one query → answer in 8.44 s [V:1CSXtQ]; Chowdeck proves its app with one order in 8.43 s [V:126cpH].
- **Make the hero film plus cutdowns, not separate films** (Part 08 §17.5): one 16:9 30 s master, then a 15 s 9:16 and a 6 s bumper made by removing whole blocks, never by trimming every shot.
- **Frame rate:** render natively at 30 fps (60 fps only for UI-heavy web heroes). Never convert 24/25 → 30 by duplicating frames: 3 of 8 references judder on scrolls and cursor glides because of it (Part 11 MK-06).

### 3.3 The in-app / changelog loop (silent)

The most-watched copy of a feature announcement is often the silent autoplay in the product's "What's new" panel [inferred]. Build it as a separate deliverable:

- 6-12 s, **no sound dependency**, no hook text (the panel already has a headline), no logo lockup (the viewer is inside the product).
- Content = the proof block only (§4.2 micro-beats a-k), on the product's real background.
- **Seamless loop:** last frame equals first frame. End with the UI returning to state A over 12-18 f E-INOUT, then hold 15 f; the first frame is that same state A.
- Size: ≤2.5 MB for an in-app MP4 or WebM at 1440 px wide [inferred]; never a GIF above 256 colours for UI with gradients (banding).

---

## 4. Story structure with exact beat timings

### 4.1 The nine stages (30 s default, 16:9, music at 120 BPM)

120 BPM gives a whole-frame grid at 30 fps: beat = 15 f, bar = 60 f = 2.0 s. Cuts land **2 f before** a beat (Part 08 #15). Use 100 BPM (beat 18 f) for a calmer premium feature; the stage percentages stay the same.

| Stage | Seconds | Frames | % | Job in a feature announcement | Evidence |
|---|---|---|---|---|---|
| 1 **New** (hook) | 0.00-1.93 | 0-58 | 6.4 | Flag novelty and state the pain or promise. Text on f0, first change by f3. A "New" pill or event line, plus the mechanic already visible | Part 01 H1-H4; [V:1CSXtQ t=0.00s] "For the first time ever"; [V:1ccYWJ t=0.03-1.20s] bell |
| 2 **Before** | 1.93-3.93 | 58-118 | 6.7 | The old way *in the product's own UI* (desaturated, cramped, slow). One readable fact | Part 01 setup stage; [V:19NRDv t=11.00-13.13s] the violet "without" bar |
| 3 **Reveal** | 3.93-6.93 | 118-208 | 10.0 | Feature name + one-line promise. The reveal is an audio event (Part 01 R2) | [V:1ccYWJ t=1.87-2.60s] "Introducing" pop; [V:1CSXtQ t=7.80-10.63s] |
| 4 **Proof** | 6.93-15.43 | 208-463 | 28.3 | One real flow: actor → state change → readable result. Two micro-blocks (turn on, then it works) | Guideline 02 §4.2; Part 06 UI-C4/C6 |
| 5 **Delta** | 15.43-18.43 | 463-553 | 10.0 | The before/after as a number or a side-by-side; doubles as the breather (motion ≤1/10 of the proof peaks) | [V:19NRDv t=11.00-14.33s] toggle + ghost bar |
| 6 **Access** | 18.43-22.43 | 553-673 | 13.3 | Where it lives (entry point highlighted), who gets it (plan), where (platforms), when (date) | This guideline; Part 06 focus by subtraction; [V:15VhHR t=2.5-4.5s] entry point as hero |
| 7 **Climax** | 22.43-24.43 | 673-733 | 6.7 | Thesis line, last word on the beat; callback to the hook | Part 01 C1-C2, L3 |
| 8 **CTA** | 24.43-26.93 | 733-808 | 8.3 | Verb + where: "Turn on X", "Try X in Settings" | Part 01 L5 |
| 9 **Lockup** | 26.93-30.00 | 808-900 | 10.2 | Logo + "New: [Feature]" or URL, ≥2.0 s dead still (default 2.2 s) | Part 08 #20; [V:1CSXtQ t=27.37-30.03s] |

Climax starts at 74.8% of runtime, inside the master's 70-82% window for short films (Part 01 §2.3). Proof (stages 4-5) is 38.3% of runtime, below the master's 41.7% for a 30 s product demo, because the Access stage (13.3%) is the price of this format and the delta stage carries proof too (proof + delta = 38.3%; with access, product UI is on screen ≈52% of runtime).

**Hero moments** (Part 08 #12: first at 10-25%, last at 76-91%, ≥30 f calmer picture after each):
- H1 the reveal landing, ≈f130 (14%).
- H2 the proof's consequence (the feature visibly doing its thing), ≈f295-f401 (33-45%).
- H3 the climax word, ≈f733 (81%).

### 4.2 The proof block (micro-structure)

Use Guideline 02 §4.2 unchanged (context lands 6-12 f → input 30-90 f → read hold ≥18 f → cursor approach + dwell 18-30 f → press on the frame → consequence 3-8 f → AI "acting" state 8-15 f if any → empty container 8-9 f → cascade 13-22 f → cut-in 2-3.5x on the value → payoff hold ≥30 f). One complete block is 4.5-6.5 s; a 30 s announcement fits **one block split into two micro-blocks**:

| Micro-block | Duration | What it proves | Example |
|---|---|---|---|
| A. **Switch it on** (or invoke it) | 3.5-4.5 s | The entry point is real and the action is one step | Cursor → toggle → week fills with focus blocks |
| B. **It works on its own** (or on a real case) | 3.5-4.0 s | The feature changes something the user cares about | An invite lands on a focus block and moves itself |

For features with no switch (automatic features), micro-block A is "the moment it appears": a badge, a suggestion chip or a notification arriving with a system actor (Part 06 believability law 1: every change has an actor visible within the previous 30 f; a system event counts if its source is on screen, such as a sender avatar or a sync icon).

### 4.3 Energy and music arc (30 s)

- 0-58 f: sparse plucks or a pulse, a sub impact or kick on f0 [V:1CSXtQ t=0.00s].
- 58-118 f (Before): music thins, 70-350 ms near-silence before the reveal (Part 08 #13).
- f118-f208: riser cresting 0-2 f before the first product moment; **drop on the first product moment**, 0-8 f after its cut (Part 09 defaults). HubSpot's ASL falls from 4.45 s to 2.04 s across its drop at 43% [V:1CSXtQ §11]; here the drop sits earlier (23%) because the announcement has less runway.
- Delta stage: breakdown −7 to −17 dB or low-passed (the breather, Part 08 #11).
- Climax: build into a hit on the last word; sting on the lockup; music lasts to the last frame (Lottieicon's ends 3.7 s early [V:1ccYWJ]).

### 4.4 Short versions

**15 s, 9:16 (450 f, 120 BPM; cuts 2 f before beats)**

| Stage | Seconds | Frames | Content |
|---|---|---|---|
| New + reveal | 0.0-2.43 | 0-73 | "New in [Product]" pill on f0 + feature name at 230-250 px hero size; the old way is a one-line strike ("40 min" struck → "2 h") |
| Proof A | 2.43-6.43 | 73-193 | Tap ripple on the switch → the result cascades |
| Proof B | 6.43-9.43 | 193-283 | The feature acting on a real case; result held ≥1.0 s |
| Access + climax | 9.43-11.93 | 283-358 | Three availability chips (≤3 words each), then the thesis line |
| CTA + lockup | 11.93-15.0 | 358-450 | Button 1.0 s ("Turn it on"), lockup 2.0 s, still ≥1.5 s |

**10 s teaser (300 f)**: New flag + name 0-1.5 s; reveal 1.5-3.0; one take of the proof 3.0-6.0 (click at ≈4.6 s, consequence 6-8 f later); payoff still 6.0-7.5; lockup "Now in [Product]" or "Coming [date]" 7.5-10.0, still from 8.2 s (Part 08 PL-10).

**6 s bumper (180 f)**: 0-45 f "New: [Feature]" with the mechanic moving from f0; 45-120 f one state change (press at ≈f60, consequence by f66, result still f75-120); 120-180 f lockup + "Now in [Product]", still from f132 (Part 08 PL-05 with the proof stretched).

### 4.5 Release-week variant (45 s, 3 features)

Part 01 T8 plus Part 10 ST-C3 (Launch Recap Sizzle) [S:Figma]:

| Stage | Seconds | Content |
|---|---|---|
| Hook | 0.0-2.0 | "New in [Product]: [Month/Event]" or a zero-copy icon (bell, sparkle) zooming through [V:1ccYWJ t=0.87-1.20s] |
| Chapter card 1 + proof | 2.0-12.0 | Card "01 / 03 · [Feature]" 1.0 s, then a 9 s proof block |
| Chapter card 2 + proof | 12.0-21.5 | Card 1.0 s + 8.5 s proof |
| Chapter card 3 + proof | 21.5-30.0 | Card 1.0 s + 7.5 s proof (blocks shrink: 9 → 8.5 → 7.5 s, Part 01 P-rule; kivi 14.75 → 11.03 → 6.69 s [V:1-6l8S]) |
| Recap triptych | 30.0-34.0 | All three features as three tiles, 4 f stagger [V:1Hcg3X recap] |
| Access (shared) | 34.0-38.0 | "Live today on all plans" + platforms |
| CTA + lockup | 38.0-45.0 | CTA 2.0 s, lockup 3.0 s still ≥2.2 s, URL to the changelog |

Same proof grammar three times (Part 01 TS2); chapter cards use the same treatment, so ≤3 same-treatment cards in a row is never broken.

---

## 5. Shot list template

Fill one row per shot before animating anything. Each row must pass the five-question test (Part 06 §8.0: who acted, what changed, would the real product do this, where was the eye one frame before, what is the one thing to read) **plus the announcement question: does the viewer know this is new and where it lives?**

| # | Stage | In-out (s) | Frames | Dur (f) | Shot type | UI tier | Actor + cause | State A → B | Must-read string (cap px) | "New" signal | Camera | Transition out | Music event | SFX (frame) | Anchor kept across cut |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | New | 0.00-1.93 | 0-58 | 58 | Type over dimmed UI | T2 | — / caret | — | "…" (≥70 px cap) | Pill "New in X" | Locked + push +6% linear | Polarity flip cut | Sub f0 | — | Pill position |
| 2 | Before | | | | UI wide, desaturated | T1/T2 | system | | | — | | | | | |
| … | | | | | | | | | | | | | | | |

**Shot types for this format:** "New" card (pill + line) · before-state UI wide · feature reveal (name card or UI morph) · continuous take (actor + state changes) · UI macro (cut-in) · delta (toggle, ghost bar, side-by-side) · **entry-point shot** (menu or settings with the new row highlighted) · availability card · climax line · CTA card · lockup.

**UI source tiers** (Part 06 §8.2): T1 real UI captured at ≥ max zoom × delivery width; T2 vector rebuild of the real product; T3 stylised recreation with real data; T4 UI grammar only. **Feature announcements use T1/T2 for every proof and entry-point shot**: existing users must recognise their own product. T3 only for the "before" metaphor or a claim card. Never let a video model draw UI.

**Per-shot spec block** (copy for each UI shot; Part 06 §8.17.1, Guideline 02 §5):

```
SHOT <n> · <name> · <aspect> <W×H> · 30 fps · <duration f>
UI SOURCE   : <tier>; <screens/components>; vector or ≥ <zoom × width> px; product build/version <x.y>
UI BIBLE    : bg <hex>; surface <hex>; text <hex>; accent <hex>; NEW colour <hex>; state colour <hex>;
              radius <px>; shadow y24/blur48/7% + 1 px hairline 6%; font <family, weights>; cursor <type, px>
NEW SIGNAL  : <pill/badge text>, <hex>, appears f<a>, held to f<b>
LAYOUT      : <element: x, y, w, h px>
STATE TIMELINE:
  f<a>-f<b>  <element> <A → B>  ease <token>  cause <actor>
CURSOR PATH : f<a> enter <edge> → f<b> <target> E-GLIDE · dwell f<b>-f<c> · press f<c> · consequence f<d>
CAMERA      : locked | breathe +x% | cut-in ×n | pull-back ×n f<a>-f<b> E-INOUT
MUST-READ   : "<string>" cap <px>, landed by f<x>, held to f<y>
AVAILABILITY: <plans> · <platforms> · <date / rollout wording approved by PM>
MUST STAY UNCHANGED : <strings, values, positions, colours, radius, cursor>
SOUND       : click f<c>; whoosh peak f<…>; tone f<…>
NEGATIVES   : no overshoot on UI; no blur below 5% W/f; no generated text; no unreleased UI
```

---

## 6. Style direction

### 6.1 Visual

- **Match the product, not a trend.** A feature announcement inherits the product's own design system (colours, radius, type, icon set). Existing users must see *their* UI. Brand-film flourishes go on the canvas around the UI, never on the UI.
- **Frameless rounded UI cards** by default (7/8 references are frameless; 0/8 show browser chrome). Device frame only when "this is on mobile" is the news (Part 06 UI-E01).
- **Hero UI card width:** 65-80% W in 16:9; ≈75% W (810 px) in 9:16.
- **Card radius 24-32 px at 1080p; shadow y 24 px, blur 48 px, black 6-8%, plus a 1 px hairline at ≈6%** (Guideline 02 §6.1).
- **Before vs after worlds.** The "before" is shown in the same UI, desaturated (saturation −60 to −80%, ink at #6B6B6B-ish), denser and slightly smaller (scale 0.94-0.97); the "after" is full colour at 1.0. Bumper's world flip (navy claims, white proofs) is the strongest measured version [V:19NRDv]; HubSpot's black → white polarity flip on a hit is the light version [V:1CSXtQ t=2.13s].
- **One readable item per UI beat, three at most** (Part 06 UI-L5).
- **Real data in every visible row**: names, dates, values that a user would believe (Bumper uses real merchant IDs and July 2025 dates [V:19NRDv]). No lorem, no duplicate rows (Lottieicon's duplicate card is flagged [V:1ccYWJ t=17.9-18.1s]).
- **Depth:** 3 planes (background / UI / accent), 4 only in one hero beat.

### 6.2 Color

Colour has three jobs in this format, each with one fixed meaning for the whole film (Part 02 "one accent, one meaning"):

| Role | Rule | Example |
|---|---|---|
| **Brand accent** | The product's own accent; on the logo, the CTA and the feature's key UI element | Cadence violet #6B4EFF |
| **"New" colour** | Usually the brand accent at full saturation; used only on the New pill, the feature's UI element and the entry-point highlight. Never on body text | Pill #6B4EFF bg, white text (contrast ≥4.5:1) |
| **State / AI colour** | Transitional only: on 8-15 f, settled to final colours in 6-8 f, never held >15 f (Part 06 UI-A16) | Teal #14A38B flash when the system moves something |

Presets that fit (contrast computed in Part 02 §11.13, from Guideline 02 §6.2):

| Preset | Canvas | Ink | Accent | Fits |
|---|---|---|---|---|
| Prompt-native minimal [V:1CSXtQ] | #FFFFFF | #1A1A1A (17.4:1) | Brand accent on the icon only; system blue #3585E4 for "on" | AI features, connectors |
| Night claim / day proof [V:19NRDv] | #06004E / #FCFCFC | #FCFCFC / #04043C | #F4643C | Finance, ops, "before/after" money claims |
| Airy aurora [V:1-6l8S] | #F9FAFC | #0B0B0B | Mint #8EE1B2 for glow only | Calm productivity, voice, writing |
| Dark neon [V:1ccYWJ] | #000000 → #114110 blobs | #F5F7F5 | #38D037 | Dev tools, asset libraries, "drops" |
| Product-native | The product's own light or dark theme | The product's text colour | The product's accent | **Default for existing-user audiences** |

Text contrast ≥4.5:1; UI state colours and data marks ≥3:1 (Bumper's violet-on-navy bars are flagged [V:19NRDv t=11-14s]).

### 6.3 Typography

| Role | 16:9 @1080 | 9:16 @1920 | Rule |
|---|---|---|---|
| Hook line | cap ≥6.5% H (≥70 px cap) | hero word 230-250 px | Part 01 H5 |
| "New" pill | cap ≈2.5-3% H (28-32 px cap), weight 600, tracking +2-4% if uppercase, pill height ≈5.5% H | font ≥40 px | Part 07; must still be readable, it is a must-read |
| **Feature name** (reveal) | cap 8-12% H (86-130 px cap) | 160-250 px font | The feature name is the hero word of the film |
| Promise / claim line | 90 px font (cap ≈63 px) | 128 px font | Part 07 #2 |
| Must-read UI text | cap ≥3% H (≥32 px cap); ≥4% H when the shot exists for it | font ≥52 px | Part 06 UI-L1 |
| Availability chips | cap ≥3% H (≥32 px cap) | font ≥48 px | Must-read: these are the routing information |
| Delta value | cap ≈6% H (≈65 px) | ≥96 px | [V:19NRDv t=23.85s] |
| CTA | cap ≥5% H (≥54 px) | ≥64 px | Part 01 L5 |
| URL | ≥3.5% H | ≥52 px | Lottieicon's 2% H URL is flagged [V:1ccYWJ] |

- One sans family, plus at most one accent face with exactly one role (Lottieicon's italic serif only on role words [V:1ccYWJ]).
- Write the feature name exactly as the product writes it (capitalisation included) in every shot; everything else sentence case.
- Weight 400 for calm premium, 500-600 for launch energy. Tracking 0 on lines; −1 to −3% on display.
- ≤6 words per claim card; ≤3 words per availability chip.
- **0% overshoot on type and UI** (8/8 references).

---

## 6b. Technique classes for this format

Each row cites master IDs; the class of an ID is the master's (U universal, S style-specific, X experimental, A avoid, SaaS). The format column says how this format uses it. Assignments to this format are [inferred] from the guideline's own sections unless an evidence tag is given.

| Class | Techniques for this format (master IDs) |
|---|---|
| Universal | One transaction shown before it is labelled (P01); cursor-caused UI ML-18, ML-24; cut-ins CM-20; breathing holds CM-02; UI morph TR-07; hard cuts TR-01 |
| Format-specific | The "New" pill and a before/after compare in the product-native light look (§6) [S]; scale pop RV-08 on the feature name; one pull-back reveal CM-05 |
| Experimental | Inline object chip inside the sentence RV-28 as the transition into the feature; cursor as a cue UI-C9 [X] |
| Avoid | Feature lists read out as text cards (ER-07, >3 in a row); generated UI (AA-U1); overshoot on UI (ML-03 [A]); a second feature squeezed into a 15-30 s announcement [inferred] |
| Especially good for SaaS | Interaction-triggered transitions TR-20; anchored-element cuts TR-23; toggles and chips UI-E06; notifications and status UI-E09 [S, SaaS] for the result |

## 7. Motion language with numbers

### 7.1 Ease tokens (Part 03 §19.3)

| Token | cubic-bezier | Use here |
|---|---|---|
| E-OUT | (0.33, 1, 0.68, 1) | Cards, panels, chips, word entrances (12 f) |
| E-SNAP | (0.05, 0.7, 0.1, 1) | The New pill pop, popovers, hero-word slam |
| E-SNAP-L | (0, 0, 0, 1) | Counters landing on the delta value |
| E-GLIDE | (0.25, 0.1, 0.25, 1) | Cursor travel, UI elements moving to a new slot |
| E-INOUT | (0.65, 0, 0.35, 1) | Reveal pull-backs, loop returns |
| E-EXIT | (0.3, 0, 0.8, 0.15) | Anything that ends on a cut (suck-in, punch) |
| E-LINEAR | (0, 0, 1, 1) | Breathing pushes, colour ramps |
| E-CRIT | spring stiffness 179, damping 26.8 | Spring API without overshoot |

Never Remotion's default spring (damping 10 → 16.3% overshoot) or After Effects' default Easy Ease for entrances.

### 7.2 Signature moves for "new"

| Move | Numbers | Source |
|---|---|---|
| **"New" pill pop** | Scale 0.6 → 1.0 in 6 f E-SNAP, opacity 0 → 1 in 4 f; velocity peak on f2; 0% overshoot; one soft tick on the first full frame | Adapted from RV-08 scale pop, Part 07 [V:1ccYWJ t=1.87-2.07s] |
| **"Introducing" / feature-name pop** | Word grows +40-55% in 6 f (deltas ≈21, 62, 37, 17, 8, 4 px), holds 6-10 f, then **suck-in −24 to −30% over 8-18 f E-EXIT** and a hard cut on the smallest frame | [V:1ccYWJ t=1.87-2.60s], rule 2 |
| **Zero-copy icon hook** | Icon ≈12% H rises ≈15% H in 6-7 f E-OUT, sways ±12 px for ≈0.6 s, then zooms through at **x1.3-1.4 per frame for 8-10 f** (3 f ease-in, then exponential); sub boom when it fills the frame | [V:1ccYWJ t=0.03-1.20s], rule 1 |
| **Event dot hook** | A dot at exact frame centre on f0 with a sub impact; bold word tracks in at −17% | [V:1CSXtQ t=0.00s] |
| **Pill → title morph** (shared element) | The New pill from shot 1 expands into the feature-name card in 7-13 f; background re-focuses in 11-12 f | Part 05 UI morph; [V:126cpH t=11.03-11.43s] |
| **Before → after toggle** | Cursor flies in ≈6 f and parks; knob slides ≈4 f; the "after" element reacts in the next 6-8 f beside a ghost of the "before" at 30-40% opacity | [V:19NRDv t=11.00-14.33s] |
| **Entry-point highlight** | Context dims to 40% (secondary) or 15% (texture) in 4-6 f; the new row stays at 100% with its New badge; no ring, no pulse loop (rings read as tutorial software, Part 06 UI-X11) | Part 06 focus by subtraction; [V:1ccYWJ t=9.833s] |
| **Availability chips** | 3 chips, each 12 f E-OUT, rise 5% H, 4 f stagger, in reading order | Part 06 #4, #8 |

### 7.3 UI speeds

Use Guideline 02 §7.2 unchanged. The ones this format leans on:

| Element | Duration | Stagger |
|---|---|---|
| Toggle fill, pressed state, label swap | 1-3 f | — |
| Popover / menu | 1-2 f (popover), 6 f (dropdown) | rows 2 f |
| Card entrance | 12 f E-OUT, rise 5-8% H | 4 f |
| Result cascade | 8-9 f empty, then 13-22 f | 3-4 f, each fading 4-6 f |
| Element moving to a new slot (auto-arrange, reschedule) | 12-18 f E-GLIDE, ≤5% W/f unblurred | — |
| Shared-element morph (card → toast) | 7-13 f | background re-focus 11-12 f |
| Counter (delta value) | Reaches ≈95% by f10, final by f33, E-SNAP-L | — |
| Text exit | 4-8 f E-EXIT | — |

### 7.4 Cursor and typing

Guideline 02 §7.3-7.4 applies in full. The short version:
- One cursor style for the film. Native arrow → hand on hover for T1/T2 UI, ≈2% H (≈22 px at 1080p). Tap ripple, not an arrow, in 9:16 phone UI.
- Approach + dwell **18-30 f** (up to 44 f if the target is new to the viewer, which in this format it usually is: use 30-40 f on the first press of the new control).
- Target changes **on the press frame**; button −15-20% scale in 3 f, release 6 f; consequence 3-8 f after.
- Park beside the result; never move during a read.
- Typing: 15-20 chars/s for a prompt the viewer must read; 7-9 chars/s on the key noun phrase; 170-200 ms between words.

### 7.5 Holds and life

- Every hold breathes, and scale and translation are separate rules:
  - **Scale (CM-02):** a linear push of +8-12% across the hold (+3-8% in calm/minimal looks), i.e. ≈0.15-0.9% scale per frame.
  - **Translation:** ≤0.2% W/f while any text is being read (CM-U7, UI-U13, QC-1.21); 0.3-0.5% of frame per frame only on text-free illustration (Solar's scroll drift [V:1Hcg3X t=0.37-0.97s]) (Part 04 #1-3).
- **Only the lockup is fully still** (default 2.2 s).
- One primary UI motion per frame plus ambient drift (Part 06 #22).
- Overshoot on UI, data and type: **0%**.

---

## 8. Camera language

| Move | Numbers | Use here | Evidence |
|---|---|---|---|
| **Cut-in (default for the new control and the result)** | 2-3.5x, instant; target text reaches cap 4-7.5% H | Show the new toggle, button or value large enough for phones | [V:15VhHR t=6.57s] 3.4x; [V:19NRDv t=13.13s] 2.5x |
| Breathing push | +5-10% across a 1.5-2 s hold, linear | Every hold | Part 04 #1 |
| **Reveal pull-back** | x0.75-0.80 over 21-31 f, E-INOUT | From the new control out to the screen it changed (the week, the dashboard) | [V:1CSXtQ t=8.0-9.03s] |
| Short push into the action | ≈130% in ≈15 f, ≤2 per film | Draw the eye to the new button just before the press | [V:15VhHR t=28.0-28.5s] |
| **Focus by subtraction** | Context to 40% or 15% in 3-6 f, or rack focus 8-12 f | Entry-point shot; "this row is new" | Part 06; [V:126cpH t=11.07-11.43s] |
| Screen-to-world (3D hero) | x0.57 in 10 f, then ≈x0.56 decelerating over 18-20 f | Integrations: "your data now flows here" | [V:1CSXtQ t=17.80-19.03s] |
| Caret-follow truck | Caret held at ≈65% W, E-LERP k 0.2-0.25 | Typed prompts for AI features | [V:1CSXtQ t=13.6-17.3s] |

Rules:
- **Land, then read**: no zoom, pan or scroll during a read (Part 06 UI-Z5).
- Unblurred speed ≤5% W/f; 5-10% W/f needs 180° motion blur; above 10% only as a whip into a cut (Part 04 #7). Lottieicon's 22-27% W/f unblurred pans strobe [V:1ccYWJ t=30.57-32.57s].
- Roll 0°; camera overshoot 0% (8/8 references).
- UI plane tilt while read: 0-15°, flattened to 0° in 7-8 f before reading.
- 3D / DOF budget: one hero beat, ≈10-15% of runtime (HubSpot: 3.67 s of 30 s).

---

## 9. Transitions

Defaults (Part 05 §0.3): one scene change every ≈2-3 s; ≥70% hard cuts; one signature device used 3-12 times; 2-4 hero one-off transitions per film.

| Transition | Spec | Where in this format | Evidence |
|---|---|---|---|
| **Polarity flip cut** | Background flips dark ↔ light (or desaturated ↔ colour) on a hit; text keeps its exact position | Before → reveal: "the old world" → "the new world" | [V:19NRDv] inverted match cut; [V:1CSXtQ t=2.13s] |
| **Pill → title morph** | 7-13 f shared element | New flag → feature name | [V:126cpH t=11.03-11.27s]; [V:15VhHR t=3.97-4.23s] |
| **Suck-in into a cut** | −24 to −30% scale over 8-18 f, expo-in; cut on the smallest frame | Out of the feature-name card | [V:1ccYWJ t=2.33-2.60s] |
| **Click-caused cut** (signature) | Cut 3-8 f after the press | ≥2 per film: the switch-on, the share/confirm | Part 06 UI-P8; [V:1CSXtQ t=10.267-10.367s] |
| Continuity cut-in / pull-out | Same UI, 2-3.5x scale change | Detail ↔ context | Part 04 CM-20 |
| Card → toast morph | 7-13 f; background rack 11-12 f | The feature confirming it acted | [V:126cpH t=11.03-11.43s] |
| Blur / defocus dissolve | 6 f (4-8) | Into the delta or climax card | [V:1CSXtQ t=21.47s] |
| Punch into a cut | +18-33% scale over the last 3-8 f, expo-in; ≤1 per 15-20 s | Climax line → CTA | [V:1-6l8S t=7.83s] |

Hand-off grammar: the last 6-10 f before a cut accelerate; the first frames after settle (40-64% of travel on f1). Music-led cuts land 0-2 f **before** the beat.

Avoid: crossfades between UI states (software changes instantly), spins, page curls, glitch transitions as decoration, more than 2 mask wipes per film, a 1 f dip to black between UI shots (Bumper's flaw [V:19NRDv t=25.60s]), and "reveal" wipes that unveil UI with no actor.

---

## 10. UI treatment

### 10.1 Believability laws for an announcement

Guideline 02's five laws (cause, order, speed, focus, payoff; Part 06 §8.1), plus three that are specific to announcing:

6. **Shipped state only.** Every frame shows the UI as it ships on the announcement date, from the release build or the final design file. No roadmap features, no "coming later" settings visible in the background.
7. **The entry point is the real path.** If users find the feature at Settings → Calendar → Focus Time, the film shows that row in that menu, with the same label. The New badge in the film is the badge the product shows (or none, if the product has none).
8. **One feature per frame.** Other unreleased or recently changed features must not appear in the shots; they create "what is that?" questions and support tickets [inferred].

### 10.2 Choreography patterns

| Pattern | What happens | Best for | Source |
|---|---|---|---|
| **FA-1 Switch → world changes** | Cursor 17 f to the toggle, dwell 10 f, press; knob 2 f; pull-back x0.8 over 25 f; result cascades 4 f stagger | Settings-based features (modes, automations, protections) | UI-P9 [V:19NRDv t=11.00-14.33s] + UI-P2 pull-back [V:1CSXtQ] |
| **FA-2 New button → result** | Short push ≈130% in 15 f onto the new button; press; empty container 8 f; cascade 13-22 f | New actions (export, summarise, share) | Part 06 UI-P1 grammar [V:1-6l8S t=22.87-23.87s] |
| **FA-3 Prompt-native** | Typed promise → becomes the composer → query → answer | AI features, assistants | UI-P2 [V:1CSXtQ t=2.13-10.367s] |
| **FA-4 It acts on its own** | A system event arrives (invite, alert, file); a state colour flashes 8-15 f; the element moves to a new slot 12-18 f E-GLIDE; a toast confirms, held ≥30 f | Automations, smart defaults | UI-P6 [V:126cpH t=9.27-13.60s], flaws fixed |
| **FA-5 Before / after toggle** | "Without / With [Feature]" pill; the "after" element rises ≈7 f beside a 30-40% ghost of the "before" | Savings, speed, accuracy claims | UI-P9 [V:19NRDv t=11.00-14.33s] |
| **FA-6 Brand icon → UI** | The feature's icon in a sentence is clicked and stretches into the UI in 6 f | Features with a strong icon | UI-P3 [V:15VhHR t=2.5-4.5s] |
| **FA-7 Entry-point reveal** | Menu opens 6 f, rows 2 f apart; the new row lands last with its badge; context dims to 40% in 4 f | The Access stage | Part 06 focus by subtraction |

### 10.3 Legibility contract

| Tier | Contents in this format | 16:9 minimum | 9:16 minimum |
|---|---|---|---|
| Must-read | New pill, feature name, the result value, the entry-point label, availability chips, CTA | cap ≥3% H; ≥4% H when the shot exists for it | font ≥52 px (pill ≥40 px) |
| Should-read | Column headers, neighbouring menu items | cap 2.5-3% H | ≥36 px |
| Texture | Everything else (still real content) | <2.5% H | <36 px |

All 8 references put meaning in micro-text and all 8 teardowns flag it (Part 11 MK-01). In this format the most common victim is the availability line: "Available on Pro and Business plans" set at 1.5% H under the logo. Make it chips at ≥3% H, or say it in the CTA kicker.

### 10.4 Resolution

Vector rebuild, or rasters at ≥ max zoom × delivery width: a 3x cut-in on a 1920 px delivery needs a ≥5760 px source. HubSpot's greeked hero beat is its main flaw [V:1CSXtQ t=18.4-19.0s].

---

## 11. Sound and music

### 11.1 Music

- **Tempo: 120 BPM default for 6-30 s announcements** (beat 15 f, bar 2.0 s: every stage boundary lands on a whole frame); **100 BPM** (beat 18 f) for calm premium; stay inside 83-128 BPM. Six of eight references sit at 83-113 BPM, median ≈100; Lottieicon, the "new drop" reference, is at 112.3 BPM [V:1ccYWJ] (Part 09 §16.3).
- Style: minimal electronic pulse or plucks for productivity; brighter synth-pop or bass-forward electronic for dev tools and "drop" films.
- Arc: f0 hit → sparse → near-silence 70-350 ms before the reveal → riser crest 0-2 f before the first product moment → **drop on the first product moment** → breakdown under the delta → build → hit on the climax word → sting on the lockup, tail 1.2-2.2 s to the last frame.
- Under VO: duck 10-12 dB, attack 30-80 ms, release 250-700 ms; VO 150-170 wpm.
- **The film must work muted** (feeds and in-app autoplay): every claim is on screen; sound only reinforces.

### 11.2 SFX map (Part 09 §16.7)

| Family | Use in a feature announcement | Place at | Level | Budget / 30 s |
|---|---|---|---|---|
| F11 Impact / sub | f0 hook; the reveal; the climax word | Event frame ±2 f, after a 70-350 ms gap | +8 to +15 dB over the bed | 3-4 |
| F05 Soft tick | New pill pop; chip landings (one tick for the group, not per chip) | First full-opacity frame | −8 dB | 1-2 |
| F01 UI click | The switch-on, the new button | **Press frame (0 f)**, ≥15 dB music dip 0.3-0.5 s before | Clear inside the dip | 1-2 |
| F03 Toggle / latch | Toggles | Press frame; optional settle tick +1-3 f | As F01 | 0-1 |
| F04 Soft tone (success) | Toast, "done", feature acted | First full frame of the toast | +0-4 dB in band, 3-6 kHz | 1-2 |
| F07 Whoosh | One big move (zoom-through, pill morph) | **Peak velocity frame (±2-3 f)** | +3 to +6 dB above 4 kHz | 0-2 per film |
| F09 Riser | Into the reveal | Crest 0-2 f before the hit | Crest ≈ −12 dB | 1 |
| F06 Counter ticks | Delta count-up | ≤15 ticks/s, lock accent on the final value | Low | 0-1 |
| F02 Keystrokes | AI-feature prompts | Each burst | 20-25 dB under the music | 0-1 passage |
| F16 Ambient floor | Every "silence" | Continuous | −40 to −45 dB | always |
| F17 Sting | Lockup | ±2 f of the first full lockup frame | Loudest sustained moment | 1 |

Rules: one click per state change; sound on 15-65% of transitions, never all; place whooshes and booms at **peak velocity**, not at the start or landing of a move (Lottieicon's strongest craft signature [V:1ccYWJ rule 10]). Mix to **−14 LUFS ±1, true peak ≤ −1 dBTP** (−16 LUFS for VO-led landing-page embeds; −18 only for speech-dominant how-to content; P09 §16.11.1). Discard any audio a video model returns.

---

## 12. Copy rules

- **Flag it once, clearly.** The word "New" (or "Introducing", "Now in", "Meet") appears once as a pill or kicker in the first 2 s and once in the lockup. Not in every line.
- **Hook ≤7 words (median 4), on screen at f0**, showing the mechanic (Part 01 H1-H4).
- **Name the feature by 4 s** (default 3.9-4.3 s in this guideline; 6 s at the latest). Spell it exactly as the product does.
- **Promise = outcome, not mechanism**: "Meetings move around your focus time", not "AI-powered scheduling engine".
- **Claim cards ≤6 words, one line; ≥0.3 s per word and ≥1.0 s total.** ≤3 same-treatment cards in a row.
- **UI copy is product copy**: real labels, real result text; never invented output.
- **Numbers only with a source** the client gives, with its scope ("in beta, 1,200 teams, Aug 2026"). Placeholder numbers never ship.
- **Availability triplet**: *who* (plans), *where* (platforms), *when* (date or "rolling out"). ≤3 chips, ≤3 words each. Use "Rolling out today" when the release is gradual; "Available today" only if every eligible user has it. "Beta" if it is beta.
- **CTA = verb + where**, ≤16 characters on the button: the next action in the product, not "Learn more".
- Sentence case; no exclamation marks; at most one hype phrase (HubSpot's only one is "For the first time ever" [V:1CSXtQ]).
- **Close the loop**: the climax or lockup repeats the hook's word, number or colour (6/8 references).

**Hook examples**

| Pattern | Example | Pairs with |
|---|---|---|
| New pill + pain question | Pill "New in Cadence" + "Where did your week go?" | FA-1, FA-4 |
| Strike → new value (kit `hook`) | "Longest focus block: ~~40 min~~ → *2 hours a day.*" | FA-5 |
| Event line on black + moving dot | "Now in your calendar." [V:1CSXtQ pattern] | Integrations |
| Zero-copy icon zoom-through | A bell or sparkle icon → "Introducing Focus Time" [V:1ccYWJ] | Release weeks, asset drops |
| Typed request | "Protect my mornings." typed into the product's own command bar | FA-3 |
| Objection flip | "Another setting? Just one." | Performance cutdowns |
| Dialect / local (9:16) | "Meetings ne din kha liya?" | Indian-market reels (`desi` theme) |

**CTA examples**

| Situation | Kicker | Button / link |
|---|---|---|
| Live for everyone, on by default | "Live now on all plans" | "Open Cadence" |
| Needs switching on | "Settings → Focus Time" | "Turn it on" |
| Paid-plan feature | "On Pro and Business" | "Upgrade to Pro" |
| Mobile release | "Update to 4.2" | "Get the update" |
| Gradual rollout | "Rolling out this week" | "See what's new" |
| Beta / waitlist | "Beta · limited spots" | "Join the beta" |
| Integration | "[Product] × [Partner]" | "Connect [Partner]" |

---

## 12b. Typography

One place for this format's type decisions; sizes are P07 §9.2 tokens (font px at 1920×1080 / 1080×1920), entrances and exits follow P03 SP-T0, word budgets and holds follow P01 H2 and P07 §9.11.

| Item | This format |
|---|---|
| Families and weights | One sans, at most one accent face with one role (Lottieicon's italic serif only on role words [V:1ccYWJ]); 400 calm, 500-600 launch; tracking 0 on lines, −1 to −3 % on display (§6) |
| Size tokens | T-STATEMENT 90 / 128 px; T-HERO 185 / 240 px for the feature name; "New" pill cap 2.5-3 % H, weight 600 (font ≥40 px; must-read); T-UI-READ 43-64 / ≥52 px |
| Reveals | RV-08 scale pop on the feature name (+40-55 % in 6 f, no overshoot), RV-05 word slide-in, RV-10 diegetic typing, RV-28 inline chip |
| Exits | EX-04 shrink into the cut, EX-13 status swap, EX-02 blur dissolve |
| Word budget | Hook ≤7 words (≤5 in 9:16 and ≤15 s cuts); claim cards ≤6 words; feature name ≤3 words; CTA 1-3 words |
| Holds | Punch word 10-15 f; kinetic line of ≤3 words ≥10-14 f landed; statement of 4-6 words ≥0.8 s landed; payoff, result or status ≥1.0 s still; no text event under 25 f except SD-03 punch cards in a run (P07 §9.11.2, P08 §17.8 #3-4); lockup ≥1.5 s still (2.2 s premium) |
| Floors | Must-read text inside the safe area (16:9 x 96-1824, y 54-1026; 9:16 x 120-840, y 270-1210); 9:16 body font ≥52 px; contrast ≥4.5:1 (3:1 large), ≥7:1 or a ≥60 % scrim over footage (P07 §9.21, P11 G-27, G-37) |

## 13. Worked example storyboard: "Cadence · Focus Time", 30 s, 16:9 master

**Fictional product.** Cadence is a team calendar app. **New feature:** *Focus Time*: you set how many hours of deep work you want per day; Cadence blocks them on your calendar and automatically moves new meeting invites that land on them to the next free slot, asking the organiser.
**Format:** 1920x1080, 30 fps, 900 f. **Template:** this guideline's nine stages (T3 single-transaction proof). **Style:** product-native light. Canvas #FAFAF7, ink #16181D (17.6:1), meeting blocks #DADDE3 with ink #4A4F5A, accent and New colour Cadence violet #6B4EFF (focus blocks, pill, CTA), state colour teal #14A38B (transitional only, ≤15 f). **Type:** one grotesk (Inter-like), 400 / 600. **Music:** 120 BPM (beat 15 f), cuts 2 f before beats. **Claims:** "1.5 h → 8 h of focus a week" is a **placeholder**; replace it with the client's measured beta figure (with its scope) before release, or delete shot 6's numbers and keep the visual delta only.

Cut frames: 0 · 58 · 118 · 208 · 343 · 463 · 553 · 673 · 733 · 808 · 900 (beats at 60, 120, 210, 345, 465, 555, 675, 735, 810).

| Scene | Timestamp | Duration | Visual | UI / product action | Camera | Object motion | Text | Transition (out) | Lighting | Sound | Music | Motion notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 New (hook) | 0:00.00-0:01.93 (f0-58) | 1.93 s (58 f) | A real Cadence week view (Mon-Fri, 8 AM-6 PM) packed with 23 grey meeting blocks, dimmed to 15%; type centred over it | None in the UI; the line builds over it | Locked; push +6% linear | f0 "Where did" already on screen; "your week" +4 f, "go?" +8 f, each 6 f E-OUT from 3% H below; f12 New pill pops above the line (0.6 → 1.0 in 6 f, E-SNAP, 0% overshoot) | Pill "New in Cadence" (cap 30 px, white on #6B4EFF); line "Where did your week go?" cap 76 px (7% H) | Hard cut f58 with polarity flip: dim overlay off, the week returns to full opacity but desaturated | Flat, even; no shadows on the overlay | Sub impact f0 (+10 dB); soft tick f18 on the pill | Sparse plucks from f0 | Text on f0 = thumbnail. Pill is the "new" signal and the anchor for the reveal morph |
| 2 Before | 0:01.93-0:03.93 (f58-118) | 2.00 s (60 f) | The same week at 100% opacity, desaturated (−70%), scale 0.96 | Three new invites drop into the last free gaps (Tue 10:00, Wed 9:30, Thu 11:00), 4 f stagger, each 12 f E-OUT rise 5% H; a chip "Longest free block" updates "40 min" → "15 min" on f96 (label swap 2 f) | Locked; push +4% linear | Invites land and settle; nothing else moves | Must-read chip "Longest free block: 15 min" cap 34 px, top-right of the grid, held f98-118 | Hard cut f118 on a hit; colour returns (saturation 30% → 100% over the first 6 f of shot 3) | Cooler white, slightly grey (#F2F2F0 canvas) = "old world" | Three soft F04 pings, −6 dB, on each invite's first full frame; 250 ms near-silence f110-118 | Plucks thin out | The problem shown in the product's own UI, not stock footage. One readable fact |
| 3 Reveal | 0:03.93-0:06.93 (f118-208) | 3.00 s (90 f) | The New pill from shot 1 sits at the same screen position on a clean #FAFAF7 canvas, then expands into the feature-name card | f118-128 pill → card shared-element morph (10 f E-OUT, width 220 → 1100 px); f128 "Focus Time" lands with a +45% pop in 6 f; f140-152 sub line fades in word by word (3 f stagger) | Locked; breathe +5% linear | Name pop: deltas peak on frame 2, 0% overshoot; f190-206 suck-in −26% over 16 f (E-EXIT) | Kicker "New in Cadence" (pill, 30 px cap); headline "Focus Time" cap 118 px (11% H), #6B4EFF; sub "Cadence guards your deep work." cap 44 px | Suck-in → hard cut on the smallest frame, f208 | Clean, soft top light; first appearance of card shadows | F09 riser f150-206, crest f206; F11 impact f128 (+12 dB) on the name; F07 whoosh at the morph's peak velocity ≈f122 | Riser into **drop at f210** | Hero 1 at f128 (14%). The pill-to-name morph ties "new" to the feature [V:1ccYWJ t=1.87-2.60s] |
| 4a Proof: switch on | 0:06.93-0:11.43 (f208-343) | 4.50 s (135 f) | Settings sheet card 1180x520 px centred over the blurred week: row "Focus Time" with a toggle, fields "2 h a day" and "Mornings" | f214 cursor enters from bottom-right; 17 f E-GLIDE to the toggle (peak ≈4% W/f on f3-4); hover f231-251 (20 f: new control, longer dwell; arrow → hand, row tint); **press f251**: knob slides and fills #6B4EFF in 2 f; f256-268 sheet collapses down into the toolbar's new Focus icon (12 f E-EXIT); f268-293 pull-back x1.00 → x0.80 reveals the full week (E-INOUT 25 f); f295-319 five violet focus blocks grow Mon-Fri 9-11 AM, 4 f stagger, each 8 f from the top edge (E-OUT) | Locked on the sheet; then pull-back x0.80; breathe +3% after f319 | Cursor arc with lateral drift, no overshoot; parks right of Friday's block f300 | Must-read row "Focus Time" cap 40 px; field "2 h a day" cap 34 px; blocks labelled "Focus" cap 32 px | Hard cut f343 on the beat to a 2.4x cut-in on Tuesday | Same set; violet blocks carry a 6% soft inner glow | 15 dB music dip f236-251; F03 toggle click on **f251 (0 f)**; F04 success tone f319 on the last block | Groove from the f210 drop; dip before the press | Anticipation 37 f (17 travel + 20 dwell) for a first-time control (Part 06 UI-C4); consequence 5 f after the press. Hero 2 begins (f295, 33%) |
| 4b Proof: it acts | 0:11.43-0:15.43 (f343-463) | 4.00 s (120 f) | Cut-in 2.4x on Tuesday's column: focus block 9-11 AM, free slot at 2:00 PM | f350 an invite "Roadmap sync · Priya" lands at 9:30 overlapping the block (12 f E-OUT, Priya's avatar on the card); f366 the focus block's shield icon flashes teal #14A38B (10 f), settles to violet by f382; f372-388 the invite glides to 2:00 PM (16 f E-GLIDE, ≈3% W/f, no blur needed); f392 toast slides up 9 f: "Moved to 2:00 PM · Priya accepted", held f401-455 (54 f) | Locked at 2.4x; breathe +4% linear | One primary motion at a time: land → flash → move → toast | Must-read toast cap 42 px (3.9% H); invite title cap 36 px | Blur-dissolve 6 f into shot 5 (f457-463) | Same | F04 ping f350 (−6 dB, invite arrives); F07 soft whoosh at the glide's peak ≈f380; F04 chime f401 | Groove | FA-4 pattern [V:126cpH t=9.27-13.60s] with its 2 f status flaw fixed (toast ≥30 f). Actor = Priya's invite + the Focus shield (system), both on screen |
| 5 Delta | 0:15.43-0:18.43 (f463-553) | 3.00 s (90 f) | Two horizontal bars on canvas, the "Before" bar a 35% grey ghost | f467-481 "Before 1.5 h" bar grows (14 f E-OUT, #C9CCD3); f477-510 "With Focus Time" bar grows to 8 h (E-SNAP-L, value counts 0 → 8 by f510) in #6B4EFF; f514 label "focus hours a week" fades 6 f | Locked; push +3% linear | Bars grow from the baseline only; nothing else moves (breather) | Title "Focus hours per week" cap 40 px; values "1.5 h" cap 44 px, **"8 h" cap 65 px (6% H)**, held f510-553 (43 f); source line "Beta teams, Aug 2026" cap 24 px (texture, client to confirm) | Hard cut f553 on the beat | Flat | F06 ticks under the count (≤15/s), lock accent f510 | **Breakdown −9 dB, low-passed** | FA-5 delta [V:19NRDv t=11.00-14.33s]. Placeholder numbers: replace or remove before release |
| 6 Access | 0:18.43-0:22.43 (f553-673) | 4.00 s (120 f) | Cadence's real Settings sidebar at 1x, left 40% of frame; chips build on the right | f559 sidebar slides in 12 f E-OUT; f565-577 rows land 2 f apart; the last row "Focus Time" carries the product's New badge; f583 everything but that row dims to 40% in 4 f; f595, 599, 603 chips land (12 f E-OUT, 4 f stagger) | Locked; push +5% linear | Cursor already parked beside the Focus Time row from f559 (no travel, no read conflict) | Row "Focus Time · New" cap 38 px; chips "All plans" / "Web, Mac, iOS" / "Rolling out today" cap 34 px each, held f615-667 (52 f) | Hard cut f673 | Flat | One F05 tick f595 for the chip group (−8 dB) | Build begins f640 | FA-7 entry-point reveal. All three availability facts must be approved by the PM |
| 7 Climax | 0:22.43-0:24.43 (f673-733) | 2.00 s (60 f) | Tagline on #FAFAF7; faint ghost of the violet week at 8% behind | "Fewer interruptions." lands f675 (words 3 f apart, E-OUT); "More *making*." lands f705 on the beat, "making" in #6B4EFF | Punch +20% scale over the last 6 f (f727-733, E-EXIT) | Words E-SNAP from 1.3x in 8 f; 0% overshoot | "Fewer interruptions. More *making*." cap 96 px (8.9% H) on two lines | Punch → hard cut f733 | Flat | F11 impact f705 (+12 dB) | Build f640-705, hit f705 | Hero 3 at f705 (78%). Violet returns on one word: the colour callback |
| 8 CTA | 0:24.43-0:26.93 (f733-808) | 2.50 s (75 f) | CTA card centred | Link enters spaced and tightens over 9 f; underline draws 12 f E-OUT; kicker above | Locked; shrink x0.92 over the last 8 f (E-EXIT) | No pulsing; 0% overshoot | Kicker "Settings → Focus Time" cap 34 px; link "Turn on Focus Time →" cap 58 px (5.4% H); URL "cadence.app/focus" cap 38 px | Hard cut f808 on the beat | Flat | — (100 ms gap f805-808) | Pad under the CTA | CTA and URL above y 918 (player controls) |
| 9 Lockup | 0:26.93-0:30.00 (f808-900) | 3.07 s (92 f) | Cadence mark + wordmark, 22% W, centred; "New: Focus Time" line under it | Halves converge 8 px per side over 9 f; line fades 6 f; dead still from f834 (2.2 s) | Locked | None after f834 | "Cadence" (official SVG); "New: Focus Time" cap 34 px | End on the last frame, no fade | Flat | F17 sting f811, tail to f900 | Resolves on the lockup; music to the last frame | The only fully still frame. "New" appears for the second and last time (bookend with shot 1) |

**Rhythm check.** 10 shots, ASL 3.0 s (90 f), median 3.0 s, longest 4.5 s (15% of runtime). Calm/premium band 2.3-3.0 s (Part 08 #1). Hero moments at f128 (14%), f295-f401 (33-45%) and f705 (78%), each followed by ≥30 f of calmer picture. Click-caused transitions: 2 (toggle → sheet collapse → week; invite → toast). Every state change has an actor. "New" on screen twice (f12-118 as a pill, then the lockup). Feature named at 4.3 s (f128).

**9:16 cutdown (15 s, 450 f), re-laid out, not cropped.** f0-73: pill "New in Cadence" at y 300, "Focus Time" 200 px font at y 420-620, strike chip "~~40 min~~ → 2 h a day" at y 700. f73-193: Settings sheet 810 px wide at y 760-1180, tap ripple on the toggle (f120), sheet collapses, a single-day column (Tue) builds two violet blocks. f193-283: Priya's invite lands and glides to 2:00 PM; toast at y 1100 (≤ y 1210), held 1.2 s. f283-358: three chips stacked at y 500-800, then "More *making*." 160 px. f358-388: button "Turn it on" 64 px font, kicker "All plans · Web, Mac, iOS". f388-450: lockup, still from f405. All text inside x 120-840, y 270-1210.

**6 s bumper (180 f).** f0-45 pill + "Focus Time" (pop on f8); f45-120 toggle press at f60 → five blocks cascade f66-90, held to f120; f120-180 lockup "Cadence · New: Focus Time", still from f132.

**Silent changelog loop (8 s, 240 f, 1440x900).** Week view (state A) → cursor → toggle → blocks cascade → invite lands and moves → toast held 40 f → blocks retract 15 f E-INOUT → state A held 15 f = frame 0.

---

## 14. Building it with motion-kit vs generative video vs 3D

### 14.1 What motion-kit can build directly

Scene types: hook, kinetic, orb, title, stat, list, compare, bars, grid, quote, prompt, chat, wave, image, clip, cta, logo. Themes: midnight, clean, neon, editorial, pop, desi, corporate, mono, studio, studio-dark. Formats: reel, portrait, square, landscape. Field reference: `skills/motion-director/references/scenes.md`.

| Storyboard stage | motion-kit scene | How |
|---|---|---|
| 1 New + 2 Before (merged) | `hook` | `setup` = the old fact, `strike` = the old value (≤14 chars), `punch` = the new promise (≤6 words). The strike-through *is* the before/after |
| 2 Before (separate) | `compare` | `left` = "Before" rows, `right` = feature rows (1-5 words each) |
| 3 Reveal | `title` | `kicker: "New in [Product]"` renders as a pill or tracked caps per theme; `headline: "*[Feature]*"`; `sub` = the promise |
| 3 Reveal, calm AI films | `orb` | `kicker` "New", `headline` = feature; open with a `hook` first if silent |
| 4a Switch on / invoke | `prompt` | `label` = feature name, `prompt` = the setting or request (keep ≤40 chars), `button` = the real button label, `result` = what appears |
| 4b It acts | `chat` | `label` = who triggered it, `prompt` = the incoming event, `reply` = the confirmation toast text |
| 4 Real product UI | `image` (`fit: "contain"`, `move: "in"`) or `clip` (`area`, `scrim`) | Screenshots ≥2x delivery width; recordings re-captured at 30 fps on clean demo data |
| 5 Delta | `bars` (2 bars, `highlight: 1`) or `stat` (`value` "8 h", `kicker` = source) or `compare` | `bars` gives the ghost-vs-hero read; `stat` counts up |
| 6 Access | `list` with `style: "checks"`, `title: "Available today"`, items = plan / platforms / path | Or put the availability in the `cta` `kicker` for reels |
| 6 Several features (release week) | `grid` (2-6 tiles) | Recap triptych; chapter cards via `title` with `kicker: "01 / 03"` |
| 7 Climax | `kinetic` | 1-2 lines, ≤28 chars each |
| 8 CTA | `cta` | `style: "link"` for launch/existing users ("Turn on Focus Time →"); `"button"` for performance cutdowns |
| 9 Lockup | `logo` | `name`, `tagline`, `src` |

**Video settings.** `format: "landscape"` master plus `reel` (and `square` for email/in-app). Theme by product: `clean` (light productivity UI, the default), `corporate` (B2B, finance), `studio` / `studio-dark` (AI features, calm), `neon` (dev tools, "drops"), `mono` (Swiss minimal), `editorial` (premium consumer), `pop` (consumer apps), `desi` (Indian-market reels). `motion: "smooth"` (or `"calm"`); **never `bouncy`** on UI (it overshoots). `transition: "cut"` (or `"blur"`). `pace: "normal"` for 16:9, `"fast"` for reels. Start from the `product-launch-reel` recipe (reel) or `app-demo` / `launch-film-16x9` (16:9) in `motion-kit/specs/recipes/`, then `npm run brand`, `npm run music -- specs/x.json --track ...` (snaps cuts to the beat), `npm run check`, `npm run preview`, `npm run qa`, `npm run make`.

**Example spec: Cadence Focus Time, 16:9** (validated with `npm run check`: valid, no warnings, 33.2 s at `pace: "normal"`):

```json
{
  "format": "landscape",
  "theme": "clean",
  "motion": "smooth",
  "pace": "normal",
  "transition": "cut",
  "brand": { "name": "Cadence", "accent": "#6B4EFF", "handle": "cadence.app/focus" },
  "audio": { "sfx": true },
  "scenes": [
    { "type": "hook", "setup": "Longest focus block:", "strike": "40 min", "punch": "Now? *2 hours a day.*" },
    { "type": "title", "kicker": "New in Cadence", "headline": "*Focus Time*", "sub": "Cadence guards your deep work." },
    { "type": "prompt", "label": "Focus Time", "prompt": "Protect 2 hours a day, mornings", "button": "Turn on", "result": "*5 focus blocks* added this week", "resultKind": "text" },
    { "type": "chat", "label": "Invite from Priya", "prompt": "Roadmap sync, Tue 9:30 AM", "reply": "Moved to *2:00 PM* · Priya accepted" },
    { "type": "bars", "title": "Focus hours per week", "unit": " h",
      "bars": [ { "label": "Before", "value": 1.5 }, { "label": "With Focus Time", "value": 8 } ], "highlight": 1 },
    { "type": "list", "title": "Available today", "items": ["All plans", "Web, Mac, iOS", "Settings → *Focus Time*"], "style": "checks" },
    { "type": "kinetic", "lines": ["Fewer interruptions.", "More *making*."] },
    { "type": "cta", "kicker": "Turn on *Focus Time*", "action": "Open Cadence", "style": "link", "handle": "cadence.app/focus" },
    { "type": "logo", "name": "Cadence", "tagline": "Your time, protected." }
  ]
}
```

Timeline at `pace: "normal"`: hook 0.0-3.5 · title 3.5-7.4 · prompt 7.4-12.7 · chat 12.7-16.7 · bars 16.7-20.0 · list 20.0-23.6 · kinetic 23.6-26.7 · cta 26.7-30.1 · logo 30.1-33.2 s. The kit merges stages 1-2 into the `hook` (the strike *is* the before). Forcing 30.0 s with `duration` on every scene makes `npm run check` warn that 8 of 10 scenes are too short to read, so prefer the 33 s cut, or drop one scene (the `list`, moving availability into the `cta` kicker) to land near 30 s. Add `brand.logo` and a music track (`npm run music`) before rendering. The bar values are placeholders.

**Example spec: 15 s reel cutdown** (validated: 15.5 s at `pace: "fast"`):

```json
{
  "format": "reel", "theme": "clean", "motion": "smooth", "pace": "fast", "transition": "cut",
  "brand": { "name": "Cadence", "accent": "#6B4EFF", "handle": "cadence.app/focus" },
  "audio": { "sfx": true },
  "scenes": [
    { "type": "title", "kicker": "New in Cadence", "headline": "*Focus Time*", "sub": "2 protected hours, every day." },
    { "type": "prompt", "label": "Focus Time", "prompt": "Protect 2 hours a day", "button": "Turn on", "result": "*5 focus blocks* added" },
    { "type": "chat", "label": "Invite from Priya", "prompt": "Tue 9:30 AM sync", "reply": "Moved to *2:00 PM* ✓" },
    { "type": "cta", "kicker": "All plans · Web, Mac, iOS", "action": "Turn it on", "style": "button", "handle": "cadence.app/focus" },
    { "type": "logo", "name": "Cadence", "tagline": "Your time, protected." }
  ]
}
```

### 14.2 Where the kit falls short of this guideline (and the fix)

| Gap | Guideline target | Kit behaviour today | Fix |
|---|---|---|---|
| Real product UI | T1/T2 rebuilt UI that users recognise | `prompt` / `chat` draw generic cards | Rebuild the key screen as a custom Remotion scene (`docs/ADDING-SCENES.md`) or use `image` with a ≥2x screenshot |
| Toggle / switch interaction | Cursor → toggle, knob 2 f, world changes | `prompt` only has a button click | Use `prompt` with `button` = the toggle label as a stand-in; build a custom "toggle" scene for the master |
| Pill → title morph, sheet → icon collapse, card → toast | 7-13 f shared-element morphs | Not available (scenes cut or use the global transition) | Custom scene; or accept a hard cut with the pill kept in the same position (anchor cut) |
| Entry-point highlight (menu with New badge, dimmed context) | Focus by subtraction 4-6 f | No menu scene | `image` of the real menu with the row pre-highlighted, `move: "in"`; or a custom scene |
| Typing speed | 15-20 cps readable, 7-9 cps key phrase | `prompt` types ≈2 chars/frame (≈60 cps, 18-60 f); `chat` ≈1 char/frame (≈30 cps, 24-75 f) | Keep prompts ≤40 chars; patch `motion-kit/src/engine/plan.ts` or write a custom scene for key-phrase pacing |
| Cursor anticipation | 18-30 f travel + dwell (30-40 f on a new control), hover state | `prompt`: 22 f glide, click on arrival, no dwell | Fine for reels; custom scene for the master |
| Consequence timing | 3-8 f after the press | Result ≥24-28 f after the click | Acceptable when the step is genuinely async; otherwise custom |
| Cut-in on a UI region | 2-3.5x instant | None | `stat` for a value, or a custom scale-cut |
| Exact 120 BPM stage grid | Cuts 2 f before beats | Reading-time planner; `npm run music` snaps cuts to the track's beats | Run `npm run music`; avoid forcing `duration` below the reading time |
| Overshoot | 0% on UI | `bouncy` overshoots ≈3% on text, ≈10% on buttons | `smooth` or `calm` |
| Silent loop deliverable | Last frame = first frame | No loop mode | Custom composition, or edit the render in post |

### 14.3 What needs generative video (Flow / Veo / Sora / Runway / Kling / Higgsfield)

Rule (Part 11 AA-U1): **generate atmosphere, compose meaning.** In a feature announcement almost everything that matters is product truth, so generated footage is optional and small.

| Layer | Generate? | Notes |
|---|---|---|
| Defocused context plate for the "before" or the climax (a desk at 7 PM, a busy office, a phone buzzing on a table) | Yes, optional | Veo 3.1 / Flow: 4, 6 or 8 s clips at 24 fps; Runway, Kling, Sora, Higgsfield similar. One slow move or locked-off; add 40-60 px blur in compositing; no faces in focus; use as `clip` with `generated: true` and `scrim` 0.5-0.7 |
| Abstract light, gradient or texture behind type | Yes, or build in-engine (`orb`, theme gradients) | Grade all plates in one pass; 1-2% grain against banding |
| Product UI, the New badge, menus, toggles, cursor, numbers, logo, feature name | **Never** | Warped glyphs, changing labels and identity drift (Part 11 UI-A14) break the "this is shipped" promise |
| Real customers or team members | **Never** | Real footage with releases, or a `quote` card |
| Generated audio | **Discard** | Rebuild from the SFX map |

Plate prompt pattern: "Locked-off medium shot of a laptop on a wooden desk at dusk, warm lamp light from the left, very shallow depth of field so everything is softly out of focus, a phone on the desk lights up twice, no people, large empty area in the upper two thirds. 6 seconds." Negative: "text, letters, captions, user interface, screen content, watermark, logo, numbers, faces, hands". Generate 1.5-2 s longer than the edit length, 2-4 takes, same model and seed per look; conform 24 → 30 fps with optical flow (never frame duplication); log model, prompt, seed and date.

### 14.4 What needs 3D

At most one hero beat, ≈10-15% of runtime (3-4.5 s of 30 s), and only when it explains the feature better than flat UI:

- **Screen-to-world pull-back** for integrations and connectors ("your data now flows here"): x0.57 in 10 f, then ≈x0.56 over 18-20 f; studio #C8D4DF → #F4F5F8 [V:1CSXtQ t=17.80-19.03s].
- **Tilted UI plane with extrusion** for the delta: the week view tilted ≤35° in transit, focus blocks extruding 6-8% of their height in the accent colour, flattened to 0° in 7-8 f before reading [V:19NRDv t=16.73-21.55s]; [V:1ccYWJ rule 9].
- **Collection climax** for release weeks: the three feature cards fan into a 3D deck (≈11 f), cruise 7 f, accelerate 21 f and collapse into the logo in 6 f [V:15VhHR t=48.27-49.83s].

Build with `@remotion/three` (UI textures as vector or ≥ max zoom × width), After Effects 3D layers, Blender, or a 3D scene builder. Roll 0°, one key light, no intersecting planes (HubSpot's flaw), DOF only on what is not read.

---

## 15. QC checklist (Feature Announcement)

Run per shot (frame by frame), then on the locked cut, then on every delivered file.

**Announcement-specific**
- [ ] "New" (or "Introducing" / "Now in") is on screen by f15 and readable (pill cap ≥2.5% H / ≥40 px in 9:16).
- [ ] Feature name on screen by 4-6 s, spelled and capitalised exactly as in the product, identical in every shot.
- [ ] The before state is shown in the product's own UI (or as a struck value), not as stock footage.
- [ ] The delta is readable in ≤2 s: one number, one toggle or one side-by-side.
- [ ] Availability triplet present and approved by the PM: plans, platforms, date/rollout wording ("Rolling out" if gradual; "Beta" if beta).
- [ ] The entry point shown matches the shipped path and label.
- [ ] Every UI frame comes from the release build or final design; no unreleased features visible anywhere in frame.
- [ ] The CTA names the next in-product action (verb + where), not "Learn more".
- [ ] The silent version (muted autoplay) still communicates new + name + delta + access.

**Story and copy**
- [ ] Hook on f0, first change by f3, ≤7 words, shows the mechanic.
- [ ] One use case end to end (≤30 s); release-week films repeat one proof grammar per feature.
- [ ] Every number has a client-supplied source and scope; no placeholder remains.
- [ ] ≤3 same-treatment text cards in a row; claim cards ≤6 words.
- [ ] The lockup closes the loop with the hook (word, colour or "New").

**UI believability (Part 06 §8.18)**
- [ ] Every state change has an actor visible within the previous 30 f (a system event counts if its source is on screen).
- [ ] Must-read text cap ≥3% H (16:9) / font ≥52 px (9:16); ≥4% H after a cut-in.
- [ ] Every must-read state held ≥ max(1.0 s, 0.33 s × words + 0.4 s); toasts and statuses ≥30 f.
- [ ] One primary UI motion per frame; 0% overshoot on UI, type and data.
- [ ] Cursor: one style; approach + dwell 18-30 f (30-40 f on the new control); change on the press frame; consequence 3-8 f; parked during reads.
- [ ] State/AI colour on ≤15 f, settled in 6-8 f.
- [ ] Text sharp at maximum zoom (source ≥ zoom × delivery width).
- [ ] Contrast: text ≥4.5:1; UI states and data ≥3:1.
- [ ] No readable UI or text produced by a video model; generated clips tagged (`generated: true`).

**Rhythm and sound**
- [ ] ASL 2.3-3.0 s (16:9 calm) or 1.6-2.0 s (9:16); a discrete event at least every 1.5 s except the breather and the end hold.
- [ ] Music-led cuts land 0-2 f before the beat; drop on the first product moment (0-8 f after its cut).
- [ ] Click on the press frame; whooshes and booms at peak velocity; ≤2 whooshes per film.
- [ ] Lockup dead still ≥1.5 s (default 2.2 s); music lasts to the last frame.
- [ ] −14 LUFS ±1, true peak ≤ −1 dBTP on the final file.

**Delivery (Part 11 §22.4)**
- [ ] Exact size per format; constant 30 fps; no duplicated frames inside moves.
- [ ] H.264 High, yuv420p, BT.709 tagged; ≥12 Mb/s at 1080p (never below 8); `+faststart`.
- [ ] Frame 0 works as the thumbnail (New pill + hook visible).
- [ ] 9:16 re-laid out (not cropped); all text in x 120-840, y 270-1210.
- [ ] In-app loop: first frame = last frame; ≤2.5 MB; no audio dependency.
- [ ] Captions or a sidecar file if there is VO; test upload watched at 1:1 on a phone.

---

## 16. Common mistakes

| Mistake | Seen in / source | Why it hurts | Fix |
|---|---|---|---|
| No "where to find it" | Generic changelog videos [inferred]; the master has no Access stage | Users like the film and never find the feature | Access stage: entry-point shot + availability chips (§4.1 stage 6) |
| Availability in 1.5% H micro-text under the logo | 8/8 references put meaning in micro-text (Part 11 MK-01) | Unreadable on phones; buyers can't tell if it's on their plan | Chips at cap ≥3% H, or the CTA kicker |
| Feature named late (after 8-10 s) | VO-led films name at ≈9.3-10 s [S:Superside] | Feed viewers leave before the news | Name by 4-6 s; pill on f0-15 |
| Brand-film styling over the product UI (new colours, new type, glow on UI) | — | Existing users don't recognise their product | Product-native UI; style the canvas around it |
| Showing unreleased or roadmap UI | — | Support tickets and broken trust | Release build only; QC with the PM |
| Proof with no actor: UI "reveals" itself, screens float and glow | The anti-pattern every teardown names | Reads as a template; proves nothing | FA-1 to FA-7 patterns, each with an actor |
| Before state missing, so the delta is invisible | — | The viewer can't tell what changed | Struck value, desaturated before shot or a Without/With toggle [V:19NRDv] |
| Key state held under 1 s | Chowdeck's "Order delivered" for 2 f [V:126cpH t=13.53s] | Subliminal payoff | Toasts and results ≥30 f |
| "New" or "Introducing" on every card | Lottieicon's 13 text cards of 25 shots [V:1ccYWJ] (text-card fatigue) | Novelty stops meaning anything; energy dips | "New" twice: hook and lockup |
| Weak ending: bare URL, no lockup, music ends early | Lottieicon: music gone 3.7 s early, no logo lockup [V:1ccYWJ]; kivi bare URL [V:1-6l8S] | The ask is lost | CTA card + still lockup + sting tail to the last frame |
| Typed prompts at machine speed | Kit `prompt` ≈60 cps; generic templates | The viewer can't read the input that justifies the output | ≤40-char prompts; 15-20 cps in custom scenes |
| Bounce on buttons, cards and the New pill | Remotion default spring (16.3% overshoot) | Toy-like; undermines "precise software" | E-SNAP / E-OUT, `motion: "smooth"` |
| Fast unblurred pans across UI | Lottieicon 22-27% W/f [V:1ccYWJ t=30.57-32.57s] | Strobing | ≤5% W/f unblurred; blur above |
| Sub-HD or low-bit-rate delivery | 8/8 references as received; HubSpot ≈175 kb/s | Blocky UI text, banding on gradients | 1080p+, ≥12 Mb/s, 1-2% grain on gradients |
| 9:16 made by cropping the 16:9 master | Part 02 CO-U18 | A 608 px-wide window; UI unreadable | Re-layout: stack, enlarge, cut in |
| Unsourced or placeholder numbers shipped | — | Legal and trust risk | Client-supplied figure with scope, or no number |
| Desktop arrow cursor on phone UI in 9:16 | Part 06 §8.12 [inferred] | Fidelity error | Tap ripple and press state |
| Status pill or toast below y 1210 in 9:16 | Chowdeck's pill at ≈70% H [V:126cpH t=11.20s] | Covered by captions and buttons | Keep text-bearing UI inside y 270-1210 |
