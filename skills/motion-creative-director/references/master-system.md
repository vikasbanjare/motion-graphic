# Master SaaS Motion Design System: condensed digest

This file is the always-read digest for the motion-creative-director skill. Every section below is copied verbatim from the master part named in its source line, so the numbers match the full parts in `references/master/` (evidence, measurements and audits live there). It is regenerated from the master parts after any master edit (the build script copies the listed sections and refreshes the copies of `guidelines/`, `prompt-templates.md`, `worked-example.md` and `master/` in this folder); never edit it by hand.

Tag key: [V:id t=..s] frame-measured reference teardown; [S:..] Superside text research; [E] ElevenLabs style brief; [N] motion-numbers brief; [P] voice/footage pipeline brief; [W:..] inspiration-site catalogues; [inferred] not directly observed or sourced.

## Contents

- 1. Story and direction
- 2. Composition, colour, safe areas
- 3. Motion: ease tokens and speeds
- 4. Camera library
- 5. Transition library
- 6. UI animation
- 7. Typography
- 8. Editing rhythm and durations
- 9. Sound
- 10. Styles
- 11. Anti-AI look and QC

---

## 1. Story and direction

### 1.1 The Direction Card: decide these before the first frame

*Source: P01 `master/01-creative-direction-and-storytelling.md`*

Every reference makes these 15 decisions explicitly and keeps them for the whole film. That is the main reason they read as art-directed rather than assembled [inferred from 8/8].

| # | Decision | What to write down | SaaS default | Evidence |
|---|---|---|---|---|
| 1 | **Concept sentence** | One sentence in which the product's mechanic becomes the film's grammar: "[input] becomes [output], shown as [visual mechanic]". | "You type or say it, and the product makes it real, shown as text that turns into UI." | kivi: every line builds itself like live dictation [V:1-6l8S t=0.10s]. HubSpot: "the ad is a prompt" [V:1CSXtQ t=2.13s]. Lottieicon: "the motion is the product" [V:1ccYWJ t=7.30s]. [S:playbook] rule 12, "make the motion feel like the product". |
| 2 | **Archetype** | One of A-G in §1.2 | A (mechanic-as-grammar) | §1.2 |
| 3 | **Positioning dial** | Premium / playful / technical / cinematic, summing to 100 % | 45 / 20 / 20 / 15 | §1.3 |
| 4 | **World rule** | Which colour or world means "problem", "product", "AI is acting" | Problem world desaturated or dense; product world light with one accent | §1.4 |
| 5 | **Accent** | One hue, one meaning | Brand hue = "the product is acting / the benefit word" | 8/8 (§1.4) |
| 6 | **Recurring motif** | One object with at least 3 story roles | The product's input element (prompt bar, record pill, cursor, logo glyph) | §1.6 |
| 7 | **Signature device and budget** | One repeatable "edited" move and its maximum count | 3-5 uses per 60-80 s | kivi punch-in ×4 in 78 s [V:1-6l8S t=7.83s] |
| 8 | **Depth budget** | Which 1-3 beats get 3D, DOF or other "cinematic" treatment | 1 hero beat ≤ 15 % of runtime | HubSpot: a single 3.67 s 3D section in 30 s [V:1CSXtQ t=17.80-21.47s] |
| 9 | **Copy voice** | Person, case, weight, max words per card, emphasis rule | Second person, sentence case, Regular/Medium, ≤ 6 words, benefit word in the accent | §1.5 |
| 10 | **Demo grammar** | The loop that every feature block repeats | label → action → result | §2.8 |
| 11 | **Hook type** | §2.5 | Question or promise, in motion by f3 | §2.5 |
| 12 | **Reveal mechanism** | §2.7 | The opening line or icon becomes the product UI | §2.7 |
| 13 | **Climax type** | §2.10 | Collection or escalation, then rest | §2.10 |
| 14 | **Ending** | Lockup mechanism + CTA funnel stage + audio resolve | Callback lockup, verb CTA, music resolving on the logo frame | §2.11 |
| 15 | **Narration** | Type-led (no VO), VO-led, or in-world audio | Type-led, sound-off safe | 6/8 have no narrator (§1.7 CD-U6) |

### 2.3 Stage timing by runtime (seconds, frames at 30 fps, % of runtime)

*Source: P01 `master/01-creative-direction-and-storytelling.md`*

These are derived from the medians in §2.1, then adjusted by two constraints: the hook stays at 1.2 s or more, and the resolution stays at 2.8 s or more [inferred]. The 15 s row is anchored on Chowdeck (17.97 s) and [S:PointCard] (18 s, beats [inferred]). The 30 s row is anchored on HubSpot, NOSTRA and Solar. The 45 s row is anchored on Lottieicon. The 60 s row is anchored on Wix and Bumper, and [S:Airtable] (58 s, chapters measured). **The 90 s row is extrapolated** from kivi (77.78 s) and Bumper (67.2 s) [inferred]. **The 5 s and 10 s columns** are copied from P08 PL-05 and PL-10; no reference is shorter than 17.97 s, so they are extrapolated [inferred]. Two system rules shape every column of 30 s or more: one breather of 10-15 % of runtime (P08 ER-U11), and over the last three proof blocks each block is 10-40 % shorter than the one before, never longer (P08 DU-U3).

| Stage | 5 s (150 f) | 10 s (300 f) | 15 s (450 f) | 30 s (900 f) | 45 s (1350 f) | 60 s (1800 f) | 90 s launch film (2700 f) |
|---|---|---|---|---|---|---|---|
| 1. Hook | 0.0-1.5 · 0-45 · 30 % | 0.0-1.5 · 0-45 · 15 % | 0.0-1.5 s · 0-45 f · 10 % | 0.0-2.0 · 0-60 · 6.7 % | 0.0-2.0 · 0-60 · 4.4 % | 0.0-2.4 · 0-72 · 4 % | 0.0-3.0 · 0-90 · 3.3 % |
| 2. Setup / problem | none (merged into the hook) | none (merged into the hook) | 1.5-2.5 · 45-75 · 6.7 % (or merged into the hook) | 2.0-4.0 · 60-120 · 6.7 % | 2.0-4.0 · 60-120 · 4.4 % | 2.4-5.0 · 72-150 · 4.3 % | 3.0-7.0 · 90-210 · 4.4 % |
| 3. Reveal | none (the hook names the product) | 1.5-3.0 · 45-90 · 15 % | 2.5-4.5 · 75-135 · 13.3 % | 4.0-7.5 · 120-225 · 11.7 % | 4.0-8.0 · 120-240 · 8.9 % | 5.0-9.5 · 150-285 · 7.5 % | 7.0-13.0 · 210-390 · 6.7 % |
| 4. Proof | 1.5-3.0 · 45-90 · 30 % (one state change) | 3.0-6.0 · 90-180 · 30 % (one action) | 4.5-10.5 · 135-315 · 40 % (1 transaction or 2 × 3 s) | 7.5-20.0 · 225-600 · 41.7 % (1 use case or 2 × 6.25 s) | 8.0-32.0 · 240-960 · 53.3 % (3 blocks: 9 / 8 / 7 s) | 9.5-43.5 · 285-1305 · 56.7 % (4 blocks: 10 / 9 / 8 / 7 s) | 13.0-63.0 · 390-1890 · 55.6 % (5 blocks: 12.5 / 11 / 10 / 9 / 7.5 s) |
| 5. Benefit / breather | none | none | none | 20.0-23.5 · 600-705 · 11.7 % | 32.0-37.0 · 960-1110 · 11.1 % | 43.5-49.5 · 1305-1485 · 10 % | 63.0-72.0 · 1890-2160 · 10 % |
| 6. Climax | none | 6.0-7.5 · 180-225 · 15 % (payoff) | 10.5-12.0 · 315-360 · 10 % | 23.5-25.0 · 705-750 · 5 % | 37.0-39.5 · 1110-1185 · 5.6 % | 49.5-53.5 · 1485-1605 · 6.7 % | 72.0-80.0 · 2160-2400 · 8.9 % |
| 7. Resolution | 3.0-5.0 · 90-150 · 40 % (lockup) | 7.5-10.0 · 225-300 · 25 % | 12.0-15.0 · 360-450 · 20 % | 25.0-30.0 · 750-900 · 16.7 % | 39.5-45.0 · 1185-1350 · 12.2 % | 53.5-60.0 · 1605-1800 · 10.8 % | 80.0-90.0 · 2400-2700 · 11.1 % |

**Climax position in this table.** The climax starts at 60 % (10 s), 70 % (15 s), 78 % (30 s), 82 % (45 s), 82.5 % (60 s) and 80 % (90 s); the 5 s spot has no separate climax. That is earlier than the reference median of about 86 % because the table gives the resolution 10.8-20 % (reference median 8.9 %) to respect the 2.8 s resolution floor and a ≥ 1.5 s logo hold [inferred]. The short-film values match the short references: Chowdeck's climax starts at 75.7 % of 17.97 s [V:126cpH t=13.60s]. If a film has no breather, move the climax later toward 85-90 %.

**How to use the table**
- **Resolution split:**
  - 15 s: 1.0 s CTA + 2.0 s still logo.
  - 30 s: 2.0 s CTA card + 3.0 s lockup (≥ 2.0 s still) [V:1CSXtQ t=24.77-30.03s].
  - 5 s: 2.0 s still lockup (P08 PL-05).
  - 10 s: payoff 1.5 s + 2.5 s lockup (P08 PL-10).
  - 60 s: tagline 1.5 s + logo 3.0 s + CTA 2.0 s.
  - 90 s: tagline 2.0 s + wordmark 1.2 s + symbol or CTA 3.3 s + URL 2.0 s + fade 0.5-1.5 s, modelled on kivi's 71.10-77.78 s end [V:1-6l8S].
- **Proof blocks get shorter as the film goes on.** Over the last three blocks each is 10-40 % shorter than the one before and none grows (P08 DU-U3). kivi's last three demos run 14.75 s → 11.03 s → 6.69 s (−25 %, −39 %), which compresses rhythm toward the end [V:1-6l8S].
- **VO-led variant.** If a narrator explains, as in [S:Superside] (Superspace) or [S:Airtable], the hook and pain stretch to about 9-10 s and the product is named at about 9.3-10 s. Superspace's pain triad runs 0.16-9.28 s and "That's why we built Superspace" lands at 9.28 s. Airtable's "Introducing Omni" chapter starts at 0:10. Narration runs at 150-170 wpm [S:playbook].
- **Vertical 9:16.** Only one reference is vertical (Chowdeck). Use the 15 s column, and keep text in the strict safe band x 120-840, y 270-1210 at 1920p [N].
- **AI-generated footage.** Veo 3.1 clips are 4, 6 or 8 s at 24 fps; Gemini Omni Flash clips run up to 10 s [P]. Build any proof block longer than 8 s from 2 or more clips, and treat every stage boundary as a cut point [inferred].

### 2.4 Story templates (pick one per film)

*Source: P01 `master/01-creative-direction-and-storytelling.md`*

| ID | Template | Beat map (% of runtime) | Use when | Evidence |
|---|---|---|---|---|
| **T1** | **Say → See loop** | Hook question 2-6 % → name and reveal 6-13 % → (title card 1.2-1.9 s → input card 4.5-6.3 s → output UI 2.6-3.3 s) × 4 → statement cards about 11 % → bookend tagline about 2 % → wordmark, symbol, URL about 9 % | AI, voice, generation: anything where an input turns into an output | [V:1-6l8S] |
| **T2** | **Claim → Proof alternation** | Hook slam about 4 % → logo and orbit reveal about 7 % → (dark claim card 1-2 s → light 3D proof 2-6 s, with an in-shot camera beat every 0.8-1.5 s) × 5, about 58 % → positioning climax with a shape wipe and implosion about 16 % → callback word-swap about 7 % → lockup with QR about 8.5 % | B2B ops, payments, "unify / automate" products | [V:19NRDv] |
| **T3** | **Single-transaction story** | Hook 1.6 s → problem 0.9 s → promise 2.6 s → range 4.1 s → UI action 1.8 s → progress or tracking 2.5 s → payoff 1.6 s → seamless move 1.0 s → lockup with CTA 2.5 s or more | 15-20 s consumer or workflow ads | [V:126cpH]; transferable rule 2 in that teardown |
| **T4** | **Prompt-native** | Cold open on black about 7 % → typed promise about 19 % → UI builds around the text, then pull-back about 9 % → co-brand lockup on the riser crest about 9 % → macro query, send, 3D data transfer, answer about 28 % (beat drop at about 43 %) → 2 benefit cards about 11 % → CTA card + reprised lockup about 17.5 % | LLM features, connectors, integrations | [V:1CSXtQ] |
| **T5** | **Brand-bookended montage** | Macro → small sentence about 4 % → the CTA icon becomes UI about 4 % → setup about 8 % → slot machine about 7 % → payoff about 8 % → 2 feature runs about 37 % → range montage about 9 % → business tools about 12 % → 3D collection climax about 2.5 % → sentence echo about 3 % → logo about 4.6 % | Platforms with several use cases or customer stories | [V:15VhHR] |
| **T6** | **Energy chain (explainer)** | Question title about 4 % → setup with the "But how?" beat about 15 % → mechanism stage about 21 % (its hero shot alone 13 %, ending in a particle burst) → use, naming and features about 46 % → wide calm climax about 5 % → recap triptych about 9 % → (add a logo and CTA, which the reference lacks) | Explaining an invisible mechanism: data flow, security, AI pipelines | [V:1Hcg3X] |
| **T7** | **Copy-framework promo** | Dream outcome 18 % → pain 23 % → benefits 16 % → features 30 % (including a breather of about 13 %) → reassurance 4 % → brand + CTA 8 % | Services, agencies, positioning | [V:1i2L14] (stage bars measured) |
| **T8** | **Asset / volume reel** | Iconic hook about 3 % → "Introducing" + brand + category + audience about 14 % → proof by volume → context demos → hero tour, about 58 % in total (tour at 58-75 %) → statements about 11 % → urgency triplet about 2.4 % → action CTA about 12 % (+ a logo lockup, which the reference lacks) | Libraries, templates, marketplaces | [V:1ccYWJ] |
| **T9** | **VO explainer with a pain triad** | 3 pains 0-9.3 s → "That's why we built X" 9.3-20.7 s → benefit triad about 3 s each (20.7-30.2 s) → features in lifecycle order, 7-16 s each → differentiation and trust → tagline | 2-minute platform tour or onboarding overview | [S:Superside] (Superspace caption timings measured) |
| **T10** | **Five-chapter AI launch** | Era hook 0-10 s → reveal 10-22 s → demo "build" 22-31 s → demo "agents and insights" 31-45 s → vision + close 45-58 s | 55-60 s VO-led AI launch | [S:Airtable] (YouTube chapters measured) |
| **T11** | **Testimonial spine** | No-speech open 0-2.9 s → proof claim about 10 s → before/after about 13 s → vision line about 8 s (slowest delivery) → 4.2 s sign-off with no speech | Customer-story cutdown, 30-40 s | [S:Thomson Reuters] (captions measured) |
| **T12** | **Objection flip** | Objection question about 3 s → blunt answer → 3 perks → product UI → mirrored question and answer → offer + arrow CTA | 15-20 s performance ad | [S:PointCard] (all beats [inferred] in source) |

**Template rules**
- **TS1. Pick one template and keep it.** No reference changes story grammar mid-film [inferred from 8/8].
- **TS2. Run the demo loop at least 3 times in films of 45 s or more.** kivi runs it 4 times, Bumper 5 times, Wix runs 3 recurring sub-brand stories [V:1-6l8S], [V:19NRDv], [V:15VhHR]. *Why:* repetition teaches the grammar, and each new loop then costs the viewer nothing to decode.
- **TS3. In films of 30 s or less, tell one use case end to end.** HubSpot does one query → answer in 8.44 s [V:1CSXtQ]. Chowdeck does one order in 8.43 s of proof [V:126cpH].

### 2.16 Story QC gate (run before generating or animating any shot)

*Source: P01 `master/01-creative-direction-and-storytelling.md`*

Pass only if **every** line is true.
1. A muted viewer can say what the product does by 3-6 s and its name by 8 s (or the film is deliberately a punchline brand film).
2. Frame 3 differs from frame 0. The hook is ≤ 7 words (≤ 5 in 9:16 and spots ≤ 15 s) and ≤ 2.4 s.
3. Stage shares fall inside the §2.3 column for this runtime, ±3 percentage points.
4. There is one concept sentence, one world rule, one accent meaning and one recurring motif with ≥ 3 roles.
5. Proof blocks reuse one grammar, follow lifecycle or story order, and get shorter later. Each block shows before it labels.
6. No more than 4 consecutive text-only cards. No meaningful line holds below the §2.12 floors.
7. Every stage boundary has ≥ 2 markers (world change, music event, action).
8. The climax starts where the §2.3 column puts it (70 % at 15 s, about 78 % at 30 s, 80-90 % at 45 s or more), or it is a declared exception (a mid-film hero beat like C-H, or an extended finale like Bumper's from about 69 %). It restates the thesis in ≤ 5 words.
9. There is a still logo hold of ≥ 1.5 s, the music resolves on it, and a CTA matches the funnel stage.
10. Every claim, number, offer and quote is supplied by the user. Nothing is invented [S:playbook].


---

## 2. Composition, colour, safe areas

### 0.2 Defaults card: the twenty numbers to encode first

*Source: P02 `master/02-art-direction-composition-color.md`*

| Parameter | Default | Range seen in the references | Evidence |
|---|---|---|---|
| Light canvas | Off-white #F5F5F5-#F9FAFC (warm variants #F4F5F4, #F9F5F2) | Pure #FFFFFF in one flat-UI film | [V:1-6l8S] [V:15VhHR] [V:1i2L14] [V:19NRDv] [E]; #FFFFFF in [V:1CSXtQ] |
| Dark canvas | Hue-tinted near-black: navy #06004E, warm #0C0A09, neutral #161616 | Pure #000 only with dither | [V:19NRDv] [V:15VhHR] [E] [V:1i2L14]; #000 banding in [V:1ccYWJ] |
| Ink | #0B0B0B-#1A1A1A on light; #F5F7F5-#FCFCFC on dark | — | [V:1-6l8S] [V:1CSXtQ] [V:1ccYWJ] [V:19NRDv] |
| Brand accents per film | **1** hue, split into a field tone and a text tone | 1 (premium) to 6 (playful) | §11.2, CL-U3 |
| Named colours | ≤5 per film, ≤4 per frame (excluding real product UI and photos) | 3-6 | [V:126cpH] [V:1Hcg3X] [V:19NRDv] [V:1i2L14] |
| Accent area (as highlight) | ≤5% of frame | ≤5% premium; a full field in brand-system styles | [V:1CSXtQ] 92-95% white; [V:1i2L14] |
| Statement-frame negative space | ≥85% of the frame empty | 85-95% | [V:15VhHR] [V:1CSXtQ] |
| Statement line | Centred, centre-line y 47-52% H, width 35-70% W (hard cap 85% W) | 24-84% W | §4.4 |
| Hero UI card | 55-85% W | 55-85% W | [V:1-6l8S] [V:126cpH] [V:1CSXtQ] [V:1ccYWJ] [V:15VhHR] |
| Hero object (illustration or product) | 30-45% W | 25-45% W | [V:1Hcg3X] |
| Text-level ratio inside one frame | ≥1 : 2.5 | ≈1:2.4 to 1:5 in one frame; up to 1:6.6 across consecutive cards (computed, §4.2) | [V:126cpH] [V:1Hcg3X] [V:19NRDv] [V:1ccYWJ] |
| Dimmed context | 50% (still readable) or 15-20% (texture) | 15-60% | [V:1-6l8S] [V:1ccYWJ] [V:19NRDv] [S:TradeLens] |
| Text contrast | ≥4.5:1 by default. 3:1 only for "large" text: ≥66 px on a 1080-wide 9:16 frame [N, derived]; ≈117 px on a 16:9 frame watched inline on a phone [inferred: my scaling of WCAG's 24 CSS px, not in [N]]. 7:1 over footage [N]. | — | [N]; most references comply (computed) |
| Glow | Only on emitters and "active" states. Text glow radius ≤3% of cap height; emitter halo ≈1-2% of frame | 0 (HubSpot) to emissive (Lottieicon) | [V:1Hcg3X] [V:19NRDv] [V:1ccYWJ] |
| Light transition | White bloom 3-7 f; wash ≈18 f; flash ≤3 f, once per film | — | [V:1-6l8S] [V:1Hcg3X] |
| Grain | None by default; 1-2% dither on every gradient | Grain only in editorial / tactile styles | [V:1ccYWJ] [V:1Hcg3X] |
| 16:9 text-safe | x 96-1824, y 54-1026 px (5% insets) | — | [N] |
| 9:16 text-safe | x 120-840, y 270-1210 px (strict cross-platform union) | — | [N] |
| Render | bt709; PNG frames or JPEG ≥95; H.264 CRF 18; ≥8-12 Mb/s at 1080p for UI-heavy films | — | [N] [V:1CSXtQ] |
| Plate / footage lock | One rendering style, one key-light direction, one grade for every plate | — | [V:1-6l8S] [V:1Hcg3X] |

### 4.7 Safe areas per aspect ratio

*Source: P02 `master/02-art-direction-composition-color.md`*

| Format | Frame | Text-safe area (strict) | Graphic / bleed area | Crops to survive | Source |
|---|---|---|---|---|---|
| **16:9** landscape | 1920×1080 | x 96-1824, y 54-1026 (5% insets; SMPTE title-safe is 90%) | Full frame, under CO-U15 | Platform players overlay the bottom ≈10-15% with controls and captions [inferred]: keep CTA and URL above y ≈ 918 | [N] (EBU R95) |
| **9:16** vertical | 1080×1920 | **x 120-840, y 270-1210** (the strict union of Reels-ads, TikTok and Shorts) | Reels ads: insets 65 left/right, 269 top, 672 bottom. Looser box used by [E]: 960×1400 with 220 top and 380 bottom [inferred] | Profile grid shows 3:4 (y 240-1680); Reels in feed are cut to 4:5 (y 285-1635) | [N]; [E] |
| **1:1** square | 1080×1080 | x 135-945 (survives the grid crop) | Full frame | Grid crop to 810 px wide | [N] (derived) |
| **4:5** portrait | 1080×1350 | x 88-992 | Full frame | Grid crop to ≈1012 px wide | [N] (derived) |

> **Conflict: Chowdeck's 9:16 hero words vs platform overlays.** Chowdeck runs 1-2-word hero words at 80-84% W, centred at 45-58% H [V:126cpH t=0.73s, 3.07s]. That extends past the strict union's right line (x 840), where TikTok and Shorts place their right-side buttons [N]. Here the platform data wins over the reference, because the conflict is physical occlusion, not taste, and the reference was measured inside a screen capture, so its real platform overlay could not be checked.
>
> **Resolution [inferred]:**
> - Body text, CTA, URL and captions always stay inside x 120-840, y 270-1210.
> - A hero display word may run to 84% W only when it is ≥8% H and stays readable even if its last ≈10% is covered. Otherwise render a platform-specific cut.

**CO-U17. Lower UI bands in 9:16 sit outside text-safe.** Chowdeck's status notification at ≈70% H (y ≈1344) carries 2.7% H text [V:126cpH t=11.07-13.6s], and that y falls below the 1210 px line, where captions and CTA buttons sit [N]. In vertical, move text-bearing UI into y 270-1210. The lower band (1210-1640) is for non-text graphics only [inferred].

**CO-U18. Design 9:16 as a re-layout, not a crop.** Cropping a full-height 9:16 window out of a 1920×1080 frame leaves only 608 px of width (computed), which loses most layouts. The available evidence points to re-layout instead:
- Solar re-composes the lamp scene with "Electricity" above and "But how?" below when it becomes a narrow strip, rather than cropping it [V:1Hcg3X t=32.87s].
- ElevenLabs' vertical cuts exist only as YouTube Shorts [E, sourced]; that they are adaptations of a 16:9 master is the brief's own inference [E, inferred].

Re-layout rules [inferred]:
- Horizontal pairs become vertical stacks.
- Flank labels move above and below the hero.
- Split screens go top/bottom.
- Statement type grows from ≈7-9% H (16:9) to ≈12-13% H on 1-2-word hero words [V:126cpH], or 96-160 px for full headlines [N].


---

## 3. Motion: ease tokens and speeds

### 0.3 Defaults card: the 25 motion numbers to encode first

*Source: P03 `master/03-motion-principles-ease-speed.md`*

| # | Parameter | Default | Range in the references | Evidence |
|---|---|---|---|---|
| 1 | Standard entrance ease (UI, objects, cards, line recentre) | **cubic-bezier(0.33, 1, 0.68, 1)** ("easeOutCubic"): 23% of travel in frame 1 of a 12 f move, 90% by f7 | First-frame share 16-37% | (fitted) on [V:1-6l8S t=0.10s], [V:1Hcg3X t=5.43s], [V:1ccYWJ t=12.17s]; RMSE 4.0-5.7% |
| 2 | Hero-word / label "snap" entrance ease | **cubic-bezier(0.05, 0.7, 0.1, 1)** (Material 3 emphasized-decelerate) or (0, 0, 0, 1) | First-frame share 37-64% | (fitted) on [V:19NRDv t=0.00s], [V:1i2L14 t=0.03s, 18.37s]; RMSE 1.7-3.5% |
| 3 | Exit that ends on a cut (shrink, punch, push) | **cubic-bezier(0.3, 0, 0.8, 0.15)** (M3 emphasized-accelerate) | g = 1.4-2.0 per frame | Best standard token on 6 of 9 measured exits (fitted, Appendix A) |
| 4 | Whip that leaves the frame | **cubic-bezier(0.64, 0, 0.78, 0)** ("easeInQuint"), 6-9 f | Peak 13-20% W per frame on the last frame | [V:1i2L14 t=5.87s], [V:1Hcg3X t=6.47s] (fitted, RMSE 3.7-3.8%) |
| 5 | Cursor, truck, re-centre pan, panel slide (asymmetric glide) | **cubic-bezier(0.25, 0.1, 0.25, 1)** (CSS `ease`): velocity peak at ≈20-30% of the move, long tail | Peak at 21-37% of the move | Best standard token on 4 measured glides (cursor, truck, re-centre, ribbon) and second-best on a panel wipe (fitted, RMSE 3.8-8%) |
| 6 | Symmetric glide (pull-back, camera hop) | **cubic-bezier(0.65, 0, 0.35, 1)**; gallery hops **(0.76, 0, 0.24, 1)** | Peak at 50% | [V:1CSXtQ t=8.0s] RMSE 1.8%; [V:1ccYWJ t=30.57s] RMSE 0.7% (fitted) |
| 7 | Long reading settle (panel wipe, recap strips, big reveals) | **cubic-bezier(0.45, 0, 0, 1)**, 1.5-2.4 s | 0.5-0.7 s acceleration, ≈1.7 s tail | [V:1Hcg3X t=17.0-19.4s] (fitted, RMSE 1.5-2.0%) |
| 8 | Gravity fall / discard | **cubic-bezier(0.11, 0, 0.5, 0)** ("easeInQuad"), velocity ×1.2 per frame | 12-42 f | [V:1i2L14 t=13.50s] (fitted, RMSE 2.9%); [V:1CSXtQ t=0.70-2.10s] dot fall, 1 → 24 px/f, consistent with constant acceleration |
| 9 | Word entrance inside a line | **6 f** (4-7 f) from a ≈4% W offset, ease #1 | 3-7 f | [V:19NRDv t=0.30s], [V:1-6l8S t=0.33s] (46 px native = 4% W), [V:15VhHR t=0.00s] |
| 10 | Word start interval in a built line | **8 f** (≈ one eighth note at 110 BPM) | 3-10 f | [V:19NRDv] 7-10 f, [V:1-6l8S] 3-8 f, [V:15VhHR] 7 f |
| 11 | Hero-word slam | **3-4× → 1×** in **8-13 f** (≈18 f when it also fades in from ≈25%), ease #2 | 2.1-4.05×; 8-18 f | [V:19NRDv t=0.00s, 7.20s, 46.13s], [V:1ccYWJ t=33.20s], [V:1i2L14 t=0.00s] |
| 12 | Text exit | **4-8 f**, ease #3 or #4 | 2-8 f | [V:1-6l8S] 4-6 f, [V:19NRDv] 2-7 f, [V:1ccYWJ] 8 f |
| 13 | UI state change (toggle, fill, label swap, pressed state) | **1-3 f** | 1-6 f | [V:1CSXtQ t=10.20s], [V:15VhHR t=8.53s], [V:1i2L14 t=33.8s] |
| 14 | Menu / dropdown / popup open | **6 f** (dropdown), **1-2 f** (popover pop) | 1-6 f | [V:1CSXtQ t=8.867s], [V:15VhHR t=16.8s, 24.23s] |
| 15 | Stagger: UI chips / rows / dots | **2 f** | 1-4 f | [V:1CSXtQ], [V:1i2L14], [V:15VhHR], [V:1ccYWJ] |
| 16 | Stagger: cards / words / content blocks | **3-4 f** | 3-5 f | [V:1-6l8S t=23.13s], [V:15VhHR t=41.67s], [V:19NRDv t=13.13s] |
| 17 | Result cascade | **8-9 f** empty hold, then 3-4 f stagger, 4-6 f per element, **13-22 f** total | 12-22 f | [V:1-6l8S t=22.87s, 67.73s], [V:15VhHR t=12.47s] |
| 18 | Cursor | Travel **15-20 f**, dwell **10 f**, press **3 f**, release **6 f**, consequence within **3-8 f** | Travel 8-27 f; dwell 10 f-1.0 s; consequence 3-10 f | [V:126cpH], [V:15VhHR], [V:1CSXtQ], [V:1i2L14] |
| 19 | Typing that must be read | **15-20 chars/s**; key phrase **7-9 chars/s**; known filler 28-35 chars/s | 4-55 chars/s | [V:15VhHR], [V:1CSXtQ], [V:126cpH]; [N] 17-20 chars/s reading |
| 20 | Hold life | Push **1.05-1.15×** over the hold (≈6-12%/s), or drift **0.1-0.5% of frame per frame** | 1.07-1.29× | [V:1-6l8S], [V:1CSXtQ], [V:1Hcg3X], [V:19NRDv], [V:1i2L14] |
| 21 | Overshoot on type and UI chrome | **0%** | 0% in 7/8 | References win over [N]'s 2.8% text spring (§19.6) |
| 22 | Overshoot on playful physical objects | **≤25% of the swing, one cycle, settled ≤22 f** | 3-42% | [V:126cpH t=9.37s], [V:1Hcg3X t=14.67s] |
| 23 | Punch into a cut | **+18-33% scale in the last 3-8 f**, per-frame growth ×1.4-2 | Used 4× in 78 s | [V:1-6l8S t=7.83s, 18.23s, 70.83s] |
| 24 | Motion blur | **Off** below ≈5% W per frame; **180° shutter** above; always on whips | 3/8 never blur | [V:1ccYWJ] strobe flaw; [V:19NRDv]; [N] 180° |
| 25 | Stillness | Only the end card (**0.8-2.2 s**) is fully still; a static-layout reading hold (camera and line locked, ≤1.0 s) is allowed on a near-empty frame if one small inline element keeps moving | ≤5 f elsewhere | [V:15VhHR t=0.63-1.43s] (line locked, inline heart spins, "love" rises 3 f), [V:1CSXtQ t=27.87s], [V:1Hcg3X] |

### 19.3 The ease token set

*Source: P03 `master/03-motion-principles-ease-speed.md`*

Use these names in specs, prompts and QC. Each token is defined once and applied by role (MP-U15).

| Token | Definition | Behaviour on a 12 f move (unless noted) | Use for | Never use for | Evidence |
|---|---|---|---|---|---|
| **E-SNAP** | cubic-bezier(0.05, 0.7, 0.1, 1) | 58% of travel on f1, 90% by f5, 98% by f8 | Hero-word slam from 3-4×; oversize label settles; popover and block expands; small pops entering at 1.25-2× | Large camera moves; anything the viewer must track while it moves | Atlas A, C, D; [N] M3 token |
| **E-SNAP-L** (long) | cubic-bezier(0, 0, 0, 1) | 41% on f1, 90% by f7, 98% by f10; on 50 f: 90% by f27 | Counters to a final value; slow "rising sun" reveals; any snap that must keep settling for 1-2 s | Text that must be read during the move | Atlas D, G, O |
| **E-OUT** | cubic-bezier(0.33, 1, 0.68, 1) | 23% on f1, 90% by f7, 98% by f9 | The default entrance: cards, objects, toolbars, panels, line re-centres, words in a line | Exits; anything that should feel heavy or sudden | Atlas B, F, K |
| **E-GLIDE** | cubic-bezier(0.25, 0.1, 0.25, 1) | 7% on f1, velocity peak at f3, 90% by f8, 98% by f10 | Cursor travel; lateral trucks; re-centring pans; rising ribbons and panels; any A → B travel | Entrances from off-screen with a cut on the first frame (they need E-OUT) | Atlas J, M, P, R |
| **E-INOUT** | cubic-bezier(0.65, 0, 0.35, 1) | Velocity peak at f6-7 (50%), 90% by f9, 98% by f11 | Pull-backs and push-ins that start and end on screen; shape unfolds; scale chains | Entrances; exits into a cut | Atlas I, N |
| **E-HOP** | cubic-bezier(0.76, 0, 0.24, 1) | Sharper middle: peak velocity ≈1.25× E-INOUT's (computed) | Camera hops between highlighted targets; orbit steps; carousel advances | Text moves | Atlas L |
| **E-SETTLE** | cubic-bezier(0.45, 0, 0, 1), 45-72 f | On 24 f: velocity peak at f7, 90% by f14, 98% by f19 | Wipes and panels that carry *new* text (the long tail is reading time); recap strips; big horizon reveals | Anything under ≈20 f (it degenerates into a jerk) | Atlas H; [V:1Hcg3X rule 8] |
| **E-EXIT** | cubic-bezier(0.3, 0, 0.8, 0.15) | On 8 f: last frame carries ≈37% of travel | Any move that ends on a cut: shrink into the cut, punch, push, converge, rise-and-fade | Entrances; moves that stop on screen | Atlas X2, X3, X4, X6, X7, X9; [N] M3 token |
| **E-WHIP** | cubic-bezier(0.64, 0, 0.78, 0) | On 8 f: last frame carries ≈48% | Objects or the camera leaving the frame entirely | Anything that stays on screen | Atlas X1, X5 |
| **E-GRAVITY** | cubic-bezier(0.11, 0, 0.5, 0), or velocity ×1.2 per frame | Constant acceleration | Falls, drops, "discard" exits (add 10-20° rotation) | UI that is meant to feel weightless | Atlas X8; [V:126cpH t=5.03s, 7.27s] |
| **E-PUNCH** | Exponential scale: s(n) = s0 · gⁿ, g chosen so the total is +18-33% in 3-8 f | Per-frame growth roughly doubling (7 → 10 → 17 → 24 px) | The last 3-8 f before a major cut or a single white frame | Mid-shot emphasis (it reads as a glitch if no cut follows) | [V:1-6l8S t=7.83s, 18.23s, 70.83s] |
| **E-ZOOM** | Constant ratio per frame (interpolate scale in log space) | ×1.36 per frame ≈ 20× in 10 f; or ×0.87 per frame for an exponential pull-back | Fly-throughs into an object; exponential pull-backs | Small scale changes under ≈1.5× (use E-OUT) | [V:1ccYWJ t=0.87-1.20s], [V:19NRDv t=50.97-51.40s] |
| **E-LERP** | Exponential smoothing: x(n+1) = x(n) + k·(target − x(n)), k = 0.2-0.25 | Settles in 13-14 f; follows a moving target without restarting | Anything that *tracks*: a line re-centring as words are added, a caret-follow camera, a cursor-follow | Fixed A → B moves (use a bezier) | [V:1-6l8S rule 1] |
| **E-LINEAR** | (0, 0, 1, 1) | Constant speed | Drifts and pushes that span a whole hold; constant scrolls; tally counters; opacity cross-fades; colour ramps; route and line draws; iris wipes | Any move that visibly starts and stops on screen | [V:1-6l8S §7], [V:1ccYWJ t=9.93s], [V:126cpH t=6.53s] |
| **E-SPRING-P** (playful only) | spring: mass 1, stiffness 186, damping 10.9 (ζ ≈ 0.4) | 25% overshoot, one visible cycle, settled ≈22 f | Tossed cards, props landing, character-ish objects in playful styles (MP-S8) | Type, UI chrome, logos, anything in premium styles | [V:126cpH t=9.27-10.00s] (derived spring) |
| **E-CRIT** (spring form of E-OUT) | spring: mass 1, stiffness 179, damping 26.8 (ζ = 1.0) | 0% overshoot, settled ≈13 f | When a spring API is required but no bounce is allowed | Remotion's default spring (stiffness 100, damping 10): 16.3% overshoot [N] | [V:1-6l8S t=0.10-0.53s] (13 f settle) |

**Implementation notes**
- Remotion: `interpolate(frame, [start, start + dur], [from, to], { easing: Easing.bezier(0.33, 1, 0.68, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })`. Always clamp: `interpolate` does not clamp by default and values drift past the last keyframe [N].
- After Effects: paste the bezier with a curve tool, or set it by hand. An approximation of E-OUT is a fast outgoing speed on the first key (≈4× the average speed) and 75% incoming influence at speed 0 on the last key; that is cubic-bezier(0, 0, 0.25, 1), which scores 2.6-5.3% on the OUT family (fitted). Do **not** use the default Easy Ease for entrances (26-39% error).
- Interpolate scale in log space (`Math.exp(interpolate(frame, r, [Math.log(a), Math.log(b)]))`). An exponential zoom has constant *perceived* speed; a linear one appears to slow down as it grows [V:1ccYWJ Study A].
- Apply eases per property, not per layer group, when one property must move differently (for example scale on E-SNAP and opacity linear over 4 f).

### 18.1 Typography motion speeds (SP-T)

*Source: P03 `master/03-motion-principles-ease-speed.md`*

**SP-T0 · The text entrance/exit token (cite this ID; do not restate other numbers).**

| Role | Frames @30 fps | Ease | Evidence |
|---|---|---|---|
| Word entrance (word sliding into a line) | **4-7 f** (default 6) | E-OUT | [V:19NRDv t=0.30-0.97s] [V:1-6l8S t=0.33s] |
| Statement / line entrance (rise with blur) | **8-14 f** (default 10) | E-OUT | kivi 8-14 f [V:1-6l8S §6]; [V:1-6l8S t=4.45s, 25.47s, 31.85s] |
| Hero-word slam | 8-13 f | E-SNAP | [V:19NRDv t=0.00s, 7.20s] |
| Line or word exit | **4-6 f** (≈half the entrance) | E-EXIT or E-WHIP | kivi 4-6 f [V:1-6l8S §6]; whip 4-6 f [V:1-6l8S t=38.70s] |
| Whole-card exit (blur dissolve, rise-and-fade of a full card) | 4-8 f, only for whole cards | linear opacity + blur, or E-EXIT | [V:1-6l8S t=3.83s, 5.83s, 16.90s] [V:1ccYWJ t=34.07-34.30s] |

A shrink-into-the-cut (8-18 f) is a transition hand-off (TR-), not a text exit, and is timed by Part 05. Parts 07, 08 and 11, the SKILL and the worked example cite SP-T0.

| Action | Default | Range seen | Ease | Evidence |
|---|---|---|---|---|
| Hook word that "pops" on a beat (no tween) | 1 f | 0-1 f | none (step) | [V:126cpH t=0.733s]. Reserve for one hook; "pop-ons for every element" is an avoid [V:126cpH §What to avoid] |
| Word sliding into a line | **6 f** (200 ms) from ≈4% W right, defocus clearing in 4-5 f | 4-7 f | E-OUT | [V:19NRDv t=0.30-0.97s] (7, 5, 4 f settles), [V:1-6l8S t=0.33s] (6 f, 46 px native) |
| Interval between word starts | **8 f** (≈ an eighth note at 110 BPM) | 7-10 f (launch kinetic), 3-8 f (dictation), 7 f (macro type), 2 f (fast cards) | — | [V:19NRDv t=0.30s], [V:1-6l8S t=0.33s, 28.60s], [V:15VhHR t=0.00-0.63s], [V:19NRDv t=9.63s] |
| Second phrase of a two-tone line | **+3 f** after the first | 1-8 f | E-OUT | [V:1-6l8S t=28.60s, 37.35s, 62.93s] |
| Letter-by-letter blur-in | 3-4 f per letter, 1-4 f stagger | 1-4 f | E-OUT + opacity | [V:19NRDv t=2.45s] (4 f stagger), [V:19NRDv t=61.47s] (2 f), [V:19NRDv t=14.33s] (1-2 f) |
| Statement rise with blur | **10 f**, rise 2-10% H, blur → sharp | 8-14 f (SP-T0) | E-OUT | [V:1-6l8S t=4.45s, 25.47s, 31.85s] |
| Label blur-fade in place | **4 f** | 2-5 f | linear opacity + blur | [V:1Hcg3X t=0.10s, 2.27s, 27.27s] |
| Title-line stagger | **6 f** | 5-9 f | — | [V:1Hcg3X t=0.10-0.83s] (5, 8, 9 f) |
| Payoff headline fade-up | 15 f per line, 3 f line stagger | 15-16 f | E-OUT | [V:126cpH t=13.60-14.23s] |
| Hero-word slam from 3-4× | **9 f** | 8-13 f (18 f from 2.1× with a fade from ≈25%) | E-SNAP | [V:19NRDv t=0.00s, 7.20s, 46.13s], [V:1ccYWJ t=33.20s] |
| Scale pop on a word (no overshoot) | +45% in 6 f, velocity peak on frame 2 | +40-55% | E-SNAP | [V:1ccYWJ t=1.87-2.07s] |
| Live-append re-centre | 13 f, k = 0.22 per frame, travel 10-15% W | 8-14 f | E-LERP | [V:1-6l8S t=0.10-0.53s, 28.50s, 37.25s] |
| Line pull-back while it builds | Drift −1.5 to −3.5% scale per frame; snap −40-55% in 3 f when room is needed | — | E-LINEAR drift, E-INOUT snap | [V:19NRDv t=2.45-3.25s, 9.28s] |
| Hold drift after a line lands | 1.4 px/f native ≈ 2.4 px/f @1080 (≈3.7% W per second) | 0.1-0.5% of frame per frame | E-LINEAR | [V:1-6l8S t=0.53-1.50s] |
| Staircase → baseline collapse | 9 f | 7-10 f | E-OUT or E-INOUT | [V:1CSXtQ t=1.50s, 21.60s] |
| Tracking-in on one hero word | −17% width in 4 f | −15 to −20% | E-OUT | [V:1CSXtQ t=0.067-0.20s] |
| Word-spacing open (assemble) | 0 → normal spacing in 12 f | — | E-OUT | [V:1ccYWJ t=4.93-5.27s] |
| Word-spacing exit / next-card entry | Gaps ×1.5 and fade to ≈60% over ≈18 f; next card enters with gaps ≈1.25× and tightens in 8-10 f | — | E-EXIT / E-OUT | [V:1CSXtQ t=24.13-25.43s] |
| Scatter → swap → converge (one sentence) | ≈1.0 s: settle 7-14 f, hold 10-14 f, scatter 6-7 f, swap 1 f, converge 7 f | — | E-OUT for every move | [V:1i2L14 t=7.57-10.63s] |
| Variable-word swap ("slot machine") | **15 f** per word (≈1 beat at 112 BPM); outgoing tilts out 2-3 f; incoming settles 3-4 f | 11-16 f | E-OUT | [V:1ccYWJ t=5.43-7.30s], [V:19NRDv t=57.60-59.90s] |
| Climax punch cards | 10-12 f each, 3 in a row | 10-12 f | hard swaps | [V:1ccYWJ t=38.0-39.07s] |
| Mask wipe-off and re-type | ≈1 letter per frame out (12 f for 13 letters); 10-11 f back in | — | E-LINEAR mask | [V:1i2L14 t=6.17-7.00s] |
| Glitch decode / semantic scramble | 10 f / 12 f, once per film | — | stepped | [V:19NRDv t=1.17-1.50s, 7.68-8.08s] |
| Self-assembling letters | Letters 1-2 f apart at ±0.5 cap random offsets, settle over ≈20 f; strays snap last | — | E-OUT per letter | [V:19NRDv t=14.33-15.37s] |
| Gloss / shimmer sweep across text | 0.8 s L → R | 12 f (AI sweep) to 0.8 s | E-LINEAR | [V:1-6l8S t=15.0-15.8s], [V:15VhHR t=18.73-19.13s]; UI shimmer component 2 s + 0.5 s pause [E, code] |
| Blur → sharp "result resolving" | ≈20 f | — | E-OUT | [V:1-6l8S t=49.25-49.90s] |
| Text exit, blur dissolve | **6 f** | 4-8 f | linear opacity + blur | [V:1-6l8S t=3.83s, 5.83s, 16.90s] |
| Text exit, whip | 5-6 f | 2-7 f | E-WHIP | [V:1-6l8S t=38.70s, 64.2s], [V:19NRDv t=8.55s, 47.83s] |
| Text exit, rise and fade | 8 f, rise ≈3% H | — | E-EXIT | [V:1ccYWJ t=34.07-34.30s] |
| Text exit, shrink into the cut | −24 to −30% over 8-18 f | 8-19 f | E-EXIT | [V:1ccYWJ t=2.33s, 26.53s], [V:1CSXtQ t=21.93s] |

### 18.9 Velocity limits (SP-V)

*Source: P03 `master/03-motion-principles-ease-speed.md`*

| Limit | Value @1080p | Evidence |
|---|---|---|
| Text drift while being read | ≤0.5% of the frame dimension per frame (≤5 px/f vertical, ≤10 px/f horizontal); typical 2-3 px/f | [V:1CSXtQ §8] (≤2 px/f @720), [V:1-6l8S t=0.53s] (≈2.4 px/f), [V:1Hcg3X t=0.37-0.97s] (0.34-0.51% H/f) |
| Peak speed of a word entering a line | ≈45-50 px/f in its first frame | [V:1-6l8S t=0.10s] (28 px native ≈ 47 px @1080) |
| Cursor peak | ≈80 px/f (≈4.3% W/f) | [V:15VhHR t=2.5-3.07s] |
| Page-scroll peak | ≈20-25% H in the first frame of a 12 f scroll, with blur on frames 2-4 | [V:15VhHR t=34.47s] (computed from E-OUT) |
| Unblurred motion ceiling | ≈5% W per frame (≈96 px/f); above it use 180° motion blur | Analyst recommendation in [V:1ccYWJ rule 11] (observed: 10% W/f borderline, 22-27% W/f strobes); [N] 180°. Threshold itself [inferred] |
| Strobing zone without blur | 10-27% W per frame | [V:1ccYWJ t=29.3-32.3s] (flaw) |
| Whip peak (with blur) | 13-20% of the frame dimension per frame (250-385 px/f horizontally) on the last frames | [V:1i2L14 t=6.10s], [V:1Hcg3X t=1.47s, 6.80s] |
| Camera pan peak (default) | ≤8-10% W per frame | [V:1ccYWJ rule 11] |


---

## 4. Camera library

### 0.2 Defaults card: the numbers to encode first

*Source: P04 `master/04-camera-depth-hero.md`*

| # | Parameter | Default | Range seen | Evidence |
|---|---|---|---|---|
| 1 | Breathing on every hold | **+10% scale across a 1.5-2 s hold, linear** (≈0.16-0.21%/f, computed) | +7-29% over 0.5-2.5 s (push), or −13 to −24% per card (shrink) | [V:1-6l8S] [V:1CSXtQ t=21.9-27.3s] [V:19NRDv t=60.10-61.20s] [V:1ccYWJ t=6.80-7.30s] |
| 2 | Translation drift on holds | **0.1-0.2% W/f** (2-4 px/f @1080p) | 0.03-0.5% | [V:1-6l8S] 0.12% W/f; [V:1i2L14] 0.03-0.1%; [V:1Hcg3X] 0.3-0.5% H/f (computed) |
| 3 | Read-safe camera speed while text is read | **≤0.2% W/f** | 0.03-0.16% W/f measured | [V:1CSXtQ] ≤2 px/f @720 = 0.16% (computed); [V:19NRDv]; [V:1-6l8S] |
| 4 | Reveal pull-back (2D) | **×0.75-0.80 over 6-31 f** | ×0.63-0.79 | [V:1CSXtQ t=8.0-9.03s] [V:1i2L14 t=4.10-5.50s] |
| 5 | Cut-in magnification | **2-3.5×**, instant | 1.65-3.4× | [V:1-6l8S t=35.47s] [V:19NRDv t=13.13s] [V:15VhHR t=6.57s] [V:1CSXtQ t=13.03s] |
| 6 | Glide peak speed (follow or travel) | **1-4% W/f** over 20-32 f | 1.2-10% W/f | [V:1CSXtQ] 1.2-1.8; [V:1-6l8S] ≈4 (computed); [V:1ccYWJ] 8-10 (upper limit) |
| 7 | Unblurred speed cap | **≤5% W/f**. 5-10% W/f needs 180° blur. Above 10% W/f, only as a whip into a cut, with blur | — | [V:1ccYWJ] (flaw); [V:1i2L14]; [N] 180° shutter |
| 8 | Whip into a cut | **6-9 f expo-in**, speed ×1.3-1.9 per frame, peak 13-20% W/f, blur on the last 2 f | 4-11 f | [V:1i2L14 t=5.87-6.13s] [V:1Hcg3X] |
| 9 | Punch into a cut | **+18-33% scale over 3-8 f, expo-in**. At most 1 per 15-20 s | — | [V:1-6l8S t=7.83, 18.23, 70.85s] |
| 10 | Hero 3D dolly | **×2-2.5 in ≈15 f, ease-out**, foreground going to bokeh | — | [V:1CSXtQ t=19.95-20.47s] |
| 11 | Screen-to-world pull-back | **×0.57 in 10 f, then a further ×0.56 decelerating over 18-20 f** (≈×0.32 in ≈1 s) | — | [V:1CSXtQ t=18.00-19.03s] |
| 12 | Orbit | **Stepped: 9-12 f per step, steps ≈1.2-1.3 s apart** (2 beats at 100 BPM) | — | [V:19NRDv t=29.97-35.93s] |
| 13 | Camera roll | **0°** (≤1° incidental drift inside a 3D dolly) | 0-1° | All 8 |
| 14 | Camera overshoot | **0%** (critically damped) | 0% | All 8 |
| 15 | Tilt of a UI plane while it is read | **0-15°**. In transit, up to 35-45° [inferred angles] | — | [V:15VhHR t=33.33s] [V:1ccYWJ t=16.10s] [V:19NRDv t=16.77s] |
| 16 | Depth planes | **3**, at most 4 in a hero beat | 2-4 | Part 02 CO-U19 |
| 17 | Parallax, foreground : background speed | **1.3-2×** | — | [V:1Hcg3X t=1.53-3.17s, 30.63s] |
| 18 | Rack focus | **8-12 f ease-out**, starting from a blur radius of ≈8-10% W | 4-12 f | [V:126cpH t=1.60-1.83s, 11.07-11.43s] |
| 19 | True 3D / DOF budget (minimal styles) | **One hero beat, ≈10-15% of runtime** | 12% measured | [V:1CSXtQ] 3.67 s of 30 s (computed) |
| 20 | Hero hold | **The film's longest shot: 4-6 s, ≈13-14% of runtime** | 4.7-6.1 s | [V:1Hcg3X t=6.83-11.53s] [V:1ccYWJ t=27.13-33.20s] (computed) |
| 21 | Final lockup | **Dead still for 1.5-2.2 s** (never under 0.8 s) | 0.8-2.2 s | [V:1CSXtQ] 2.2; [V:15VhHR] 1.7; [V:126cpH] 1.4; [V:1i2L14] 0.8 |
| 22 | Frame rate | **Render natively at the delivery rate.** Never 24/25 → 30 fps by frame duplication | — | Judder on moves in [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X] |

### 6.1 The library at a glance

*Source: P04 `master/04-camera-depth-hero.md`*

| ID | Move | Use it to | Speed | Duration | Ease | Focal feel | Into the next shot | Class | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| CM-01 | Locked-off (still) | Hold the final lockup (still ≥1.5 s, 2.2 s premium); a mid-film reading hold ≤1 s | 0 | ≥1.5 s (lockup); ≤1 s (mid-film) | — | Orthographic | End, or a hard cut | U | [V:1CSXtQ] [V:15VhHR] [V:126cpH] [V:1i2L14] |
| CM-02 | Breathing push / drift | Keep every hold alive | 0.15-0.9%/f scale; 0.03-0.2% W/f | The whole hold, 0.5-2.5 s | BREATHE | Orthographic | Continues through the cut, or accelerates into it | U | 6 refs |
| CM-03 | Punch-in into a cut | Anticipate a hero cut or a beat drop | +18-33% in 3-8 f; or +10.6% over 1.7 s, accelerating | 3-8 f / 1-1.7 s | INTO-CUT | Orthographic | Hard cut on an onset ±1 f, or 1 white frame; momentum carries over | U | [V:1-6l8S] [V:1CSXtQ] [V:15VhHR] [V:1i2L14] |
| CM-04 | Hero dolly through foreground | The one 3D hero beat | ×2-2.5 in 15 f | ≈0.5 s | SETTLE | Moderate telephoto, shallow DOF | Lateral settle, then an accelerating tilt into the cut | S / X | [V:1CSXtQ] [V:19NRDv] |
| CM-05 | Pull-back reveal | Detail → context | ×0.75-0.8 (2D); ×0.25-0.33 (ECU → system) | 6-31 f | GLIDE or SETTLE | Orthographic | Breathe; optionally a smaller second step ≈1 s later | U | 7 refs |
| CM-06 | Truck / follow | Follow typing; travel along rows | Peak 1-4% W/f | 0.85-3.7 s | ATTACK / ease-in follow | Orthographic or telephoto | A cursor action, or a cut | U | [V:1-6l8S] [V:1CSXtQ] [V:15VhHR] [V:19NRDv] |
| CM-07 | Pan / whip pan | Energetic hand-off (whip); motivated reframe (slow pan) | Whip peak 13-20% W/f; slow pan ≤0.2% W/f while text is read, otherwise 1-4% W/f | Whip 6-9 f; slow pan the whole hold | INTO-CUT (whip); E-GLIDE (slow pan) | Any | The cut hides behind the exiting element; the next shot opens moving the same way, decelerating | U (= TR-08) | [V:1i2L14] [V:1Hcg3X] [V:15VhHR] [V:19NRDv] |
| CM-08 | Tilt / pedestal | Progression; world change; vertical scroll | S-curve peak ≈11% H/f; drift 0.3-0.5% H/f | 11-30 f + a 10 f settle | S-curve; INTO-CUT for exits | — | A layer acts as the wipe; the logo rides up into place | U | 6 refs |
| CM-09 | Crane (an arc with perspective change) | Establish a world from above | Not measured | — | — | Wide to normal | — | X | [inferred]; nearest is [V:1i2L14 t=19.23s] |
| CM-10 | Stepped orbit | Several features around one pivot | 9-12 f per step, one step per ≈1.25 s | 3-6 s | GLIDE steps | Normal to telephoto, with DOF | Hard cut | S | [V:19NRDv] [V:1i2L14] |
| CM-11 | Parallax (multi-plane) | Depth in 2D / 2.5D | Foreground 1.3-2× background | The whole shot | Follows the main move | — | — | U | [V:1Hcg3X] [V:19NRDv] [V:1CSXtQ] |
| CM-12 | Roll | Nothing | 0° | — | — | — | — | A | All 8 |
| CM-13 | Macro / cut-in | Detail, typing, the one value | 1.65-3.5×, instant | 1.2-4.8 s | — | Macro; optional shallow DOF | A 2-3 f pull-back snap, or a pull-out cut | U | 5 refs |
| CM-14 | Overhead / top-down | Maps, grids, boards | Pan 5-8% H/s | 1-2.5 s | SETTLE rotate-to-upright, then a linear pan | Flat | Hard cut | S | [V:126cpH] [V:15VhHR] [V:1i2L14] |
| CM-15 | Fly-through / zoom-through / portal | Enter an object or a world | ×1.3-1.4 per frame after a 3 f ease-in; or 3× → 1× in 8 f | 8-21 f | Constant-ratio exponential | Wide | The next scene is already inside the object | S / X | [V:1ccYWJ] [V:1i2L14] [V:1CSXtQ] |
| CM-16 | Screen-to-world | Integrations; "where does it go" | ×0.57 in 10 f, then ×0.56 over 18-20 f | ≈1 s | Front-loaded in-out | Telephoto, real DOF | A near-static hold for the event | SaaS | [V:1CSXtQ] [V:15VhHR] [V:1i2L14] [V:19NRDv] |
| CM-17 | Travelling through UI | Scroll, push-through, hop-and-hold tour, carousel bridge | Scroll 1 FH in 12 f; hops of 17-32 f | 0.4-6 s | SETTLE / GLIDE / BRIDGE | Orthographic or a tilted plane | Cut at peak speed, or land and then cut in | SaaS | [V:15VhHR] [V:19NRDv] [V:1ccYWJ] [V:1CSXtQ] |
| CM-18 | Rack focus | Move attention between planes; hide a swap | 8-12 f | — | SETTLE | Shallow DOF | A morph or a cut | U | 5 refs |
| CM-19 | Lens-distortion zoom-out | Open a dense field fast | ≈2× → 1× in 20 f; the bulge is gone in 6 f | — | SETTLE | Wide / fisheye | — | X | [V:1ccYWJ]; [S:Bolt] |
| CM-20 | Edit-camera: cut-in, pull-out cut, angle-change cut, continuity reframe | Change scale without animating | Instant | — | — | — | — | U / SaaS | [V:15VhHR] [V:19NRDv] [V:1-6l8S] |

### 6.4 Camera budget by runtime

*Source: P04 `master/04-camera-depth-hero.md`*

What was measured:

| Reference | Runtime | Motivated moves (reveal / follow / hand-off) | Signature move | 3D / DOF beats |
|---|---|---|---|---|
| Chowdeck | 18 s | 5 (pull-out, push + pan, vertical push, map rotate + pan, tilt) | Tilt through clouds | 0 |
| HubSpot | 30 s | 8 (re-centre, caret follow, pull-back, logo push, macro truck, 3D pull-back, dolly, tilt) | Screen-to-world + dolly | 1 (3.67 s) |
| NOSTRA | 35 s | ≈9 | Cue-led whip | 3 (ring, ribbon, floor) |
| Solar | 36 s | A whip exit on most of its 17 scenes, plus 1 pull-out | Light-source match (not a camera move) | 0 |
| Lottieicon | 44 s | ≈8 | Hop-and-hold tour | 2 (cards, dome) |
| Wix | 54 s | ≈10 (follow, carousel, 2 pushes, 3 rotations, deck, scrolls) | Deck climax | 3-4 |
| Bumper | 67 s | ≈20 (type pull-backs, fly-ins, push-through, orbit) | Push-through | Most proof shots |
| kivi | 78 s | 1 truck + 4 punches + 1 cut-in | Punch into the wordmark | 0 |

Derived budget [computed from the table; 5-10 s and 90 s are extrapolated, marked inferred]:

| Runtime | Breathing | Motivated moves | Signature moves | 3D / DOF beats (minimal styles) | Punches / whips |
|---|---|---|---|---|---|
| 5-6 s bumper | Every shot | 1 | 0-1 | 0 | 1 [inferred] |
| 10 s | Every shot | 1-2 | 1 | 0 | 1-2 [inferred] |
| 15 s | Every shot | 2-4 | 1 | 0-1 | 2 |
| 30 s | Every shot | 4-8 (one per 3.5-8 s) | 1 | 1 (≈10-15% of runtime) | 2-3 |
| 45 s | Every shot | 6-10 | 1-2 | 1-2 | 3-4 |
| 60 s | Every shot | 8-14 | 2 | 1-2 | 4 |
| 90 s launch film | Every shot | 12-20 | 2-3 (one per act) [inferred] | 2-3 | 4-6 [inferred] |

Style changes the rate:
- Minimal Premium: one motivated move per 8-13 s (kivi 1 per 13 s).
- UI demo: one per 3.5-5 s (Chowdeck 3.6 s, HubSpot 3.75 s).
- Kinetic-type × 3D: one per ≈3 s (Bumper).

**CM-U10. One signature move per film (or per act).** [U] Each reference has one move it is remembered for: HubSpot's screen-to-world, Lottieicon's tour, Wix's deck, kivi's punch, Bumper's push-through. Repeating a signature dilutes it.


---

## 5. Transition library

### 0.3 Defaults card: the numbers to encode first

*Source: P05 `master/05-transition-library.md`*

| # | Parameter | Default | Range seen | Evidence |
|---|---|---|---|---|
| 1 | Scene-change density | **1 change every ≈2 s** (30-60 s films) | 1.6-3.3 s | §0.1, all 8 |
| 2 | Hard-cut share | **≥70% of scene changes are hard cuts** (plain or with a designed hand-off) | 28-100% | 6 of 8 at 69-100% |
| 3 | Signature device | **One per film, used 3-12 times** | 3-12 | 8 of 8 |
| 4 | Hero one-off transitions | **1 per 15-20 s, 2-4 per film** | 2-4 | 8 of 8 |
| 5 | Pre-roll into a cut | **Last 6-10 f accelerate** (expo-in, g ≈1.3-1.9 per frame) | 2-19 f | [V:1CSXtQ] [V:1Hcg3X] [V:1i2L14] [V:1ccYWJ] [V:1-6l8S] |
| 6 | Settle out of a cut | **Expo-out: 40-64% of travel on frame 1, 86-95% by frame 3-6** | — | [V:19NRDv t=0.00s] [V:1i2L14] [V:1Hcg3X] (Part 04 SETTLE) |
| 7 | Whip into a cut | **6-9 f expo-in, peak 13-20% W/f, blur on the last 2 f, or bury the cut behind the exiting element** | 2-11 f | [V:1i2L14 t=5.87-6.13s] [V:1Hcg3X] [V:19NRDv t=47.83s] |
| 8 | Punch into a cut | **+18-33% scale over 3-8 f, expo-in** | — | [V:1-6l8S t=7.83, 18.23, 70.83s] |
| 9 | Shrink ("suck-in") into a cut | **−20 to −30% over 8-18 f, expo-in** | −8 to −38% | [V:1ccYWJ t=2.33, 26.53, 32.80s] [V:1CSXtQ t=21.93, 25.53s] |
| 10 | Blur / defocus dissolve | **6 f** (blur grows over the first 4 f; 6 f is the midpoint of the measured range [inferred]) | 4-8 f | [V:1CSXtQ t=21.47s] [V:1i2L14 t=0.63s] [V:1-6l8S] [V:19NRDv t=21.43s] |
| 11 | Light bridge | **White bloom 3-6 f; colour wash 7-18 f** | 3-18 f | [V:1-6l8S] |
| 12 | Covering mask / shape wipe | **6-12 f, expo-out or near-linear** | 4-12 f | [V:19NRDv t=47.97s] [V:1i2L14 t=14.50, 21.83, 24.25s] |
| 13 | Match tolerance | **Matched element within ±5% W of its position**, same or deliberately changed scale | ±5% W | [V:1i2L14 t=1.433s] [V:1Hcg3X t=3.30-3.43s] [V:19NRDv t=1.167s] |
| 14 | Empty plate / breath frame | **1 f**, in the colour of the incoming world or the film's neutral | 0-10 f | [V:1Hcg3X] [V:19NRDv] [V:1ccYWJ] [V:1-6l8S] |
| 15 | UI morph (shared element) | **≈7-13 f, background re-focused over 11-12 f** | 6-13 f | [V:126cpH t=11.03-11.43s] [V:1-6l8S t=9.50-9.93s] [V:15VhHR t=4.0-4.23s] |
| 16 | Zoom-through | **3 f ease-in, then ×1.36 per frame for ≈7 f (≈20× in 10 f)** | — | [V:1ccYWJ t=0.87-1.20s] |
| 17 | Push-through / dolly through a foreground layer | **9-15 f, ×2-2.5** | — | [V:19NRDv t=18.25s] [V:1CSXtQ t=19.95s] |
| 18 | Seamless camera transition | **30 f S-curve + ≈10 f settle** | 30-40 f | [V:126cpH t=15.20-16.53s] [V:1CSXtQ t=18.00-19.03s] |
| 19 | Logo resolve | **Strong colour gone in 8 f, settled in 25 f**; crossfade halves 9-10 f with ≤2 f overlap | — | [V:15VhHR t=51.37s] [V:1-6l8S t=72.27s] |
| 20 | End fade | **14 f to white (light films), up to 33 f to black**; music outlasts the picture | 14-33 f | [V:1-6l8S t=76.80s] [V:1ccYWJ t=43.10s] |
| 21 | Flash frames | **Once per film, ≤3 f per colour**, ≤3 flashes per second | 3 f + 2 f | [V:1Hcg3X t=12.83s] [N WCAG 2.3.1] |
| 22 | Beat offset (music-led films only) | **Cut 0-2 f before the beat**; never after it | 0-2 f early | [V:19NRDv] (11 of 18) [V:1-6l8S t=8.03-8.28s] |
| 23 | Silence before a hit | **70-300 ms (2-9 f)**; a suck-out of ≥15 dB on a decisive click | 70-500 ms | [V:1CSXtQ] [V:15VhHR t=12.20s] [V:126cpH t=10.0-10.5s] |
| 24 | Overshoot on transition elements | **0%** in premium styles | 0-25% of a swing | 7 of 8 at 0%; Chowdeck's card overshoots ≈¼ of its swing |

### 7.1 The library at a glance

*Source: P05 `master/05-transition-library.md`*

| ID | Transition | Family | Class | Default duration | Observed in (measured durations) |
|---|---|---|---|---|---|
| TR-01 | Hard cut | Cut | U | 0 f | 8 of 8 |
| TR-02 | Beat cut | Cut | S | 0 f, 0-2 f before the beat | Bumper (11 of 18 cuts); kivi back half (5 of 6); HubSpot (6-7 of 8 on transients) |
| TR-03 | Match cut (graphic, position, colour, inverted) | Cut | U | 0 f | Bumper inverted match; NOSTRA dot → eye; Solar light point → lamp; Wix orange → orange; HubSpot dot → caret; Chowdeck match-on-action; Lottieicon word → logo tile (7 of 8) |
| TR-04 | Motion match cut (velocity hand-off, screen direction) | Cut | U | 0 f; 3-10 f pre-roll + 5-20 f settle | HubSpot send → bubble; Solar ×6; NOSTRA whip; Lottieicon pull-back → title; kivi punch → push (6 of 8) |
| TR-05 | Shape match (and shape-match chains) | Cut or SNAP | U | 0-4 f | NOSTRA circle chain; Solar point; Chowdeck flat → real (×3); Lottieicon circle → pill (4 of 8) |
| TR-06 | Object morph (incl. many → one, particles) | Morph | U | 6-18 f | kivi pill → card 13 f; Solar particles → bolt 6 f; Bumper chips → B 8 f + 10 f; Wix deck → heart 6 f; NOSTRA label → square → tile ≈32 f; Lottieicon circle → pill 7 f (6 of 8) |
| TR-07 | UI morph (shared element; icon → UI; text → UI) | Morph | U · SaaS | 6-13 f | Chowdeck card → notification ≈7 f + 11 f rack; Wix sparkle → prompt 6 f; HubSpot text → prompt bar ≈37 f incl. pull-back; kivi pill → card ≈13 f; Lottieicon circle → search pill 7 f (5 of 8) |
| TR-08 | Camera wipe (whip pan, whip tilt, whip scroll) | Camera | U | 6-9 f + cut | Solar 6-11 f (×6); NOSTRA 8 f; Bumper 2-7 f; Lottieicon 3-8 f; kivi ≈6 f; Wix carousel (6 of 8) |
| TR-09 | Object wipe | Wipe | U (rare: once each) | 8-10 f | Solar house wall ≈10 f; Lottieicon 3D card 8 f; Chowdeck cloud band (3 of 8) |
| TR-10 | Mask wipe (shape mask, blinds, split panel, band push, matte, ink bloom) | Wipe | U as a family, ≤2 per film | 4-12 f cover; 20-72 f reading wipes | Bumper chevron 12 f; NOSTRA blinds 4 f, mask retype 25 f; Solar split panel 72 f, band push 20-32 f; kivi ink bloom ≈20 f; Chowdeck colour matte ≈10 f (5 of 8) |
| TR-11 | Zoom transitions (punch, suck-in, zoom-through, cut-in / pull-out cut, scale-matched hand-off, lens-distortion reveal) | Zoom | U | 3-20 f | 8 of 8 |
| TR-12 | Depth transition (push-through, dolly through a foreground, rack focus) | Depth | U (rack/defocus) · S (true 3D) | 9-15 f | Bumper push-through 9 f; HubSpot dolly ≈15 f; Chowdeck rack 8-12 f; NOSTRA smash-in + 3 f defocus (4 of 8) |
| TR-13 | Blur transition (defocus dissolve, defocus-out cut, blur-to-sharp resolve) | Blur | U | 4-8 f | HubSpot 8 f; NOSTRA 4 f; kivi 4-8 f; Bumper 1-2 f defocus-out; Wix 1-2 f blur-out; Chowdeck 8 f defocus reveal (6 of 8) |
| TR-14 | Light transition (bloom, wash, click bloom, light build, flash frames, fade to white) | Light | U as a family; S as the default bridge | 3-18 f; light build up to 2 s | kivi (12 of 32); Bumper 4 f to white; Wix 3 f glow-bloom; Lottieicon light build; Solar flash; NOSTRA iris to white (6 of 8) |
| TR-15 | Perspective transition (angle-change cut, flatten, shrink-rotate, tilt onto a plane, screen-to-world) | Perspective | U | 0-30 f | Bumper angle cut; Wix flatten 7 f, shrink-rotate 6 f; NOSTRA tilt 6 f; HubSpot screen-to-world ≈30 f; Lottieicon dome (5 of 8) |
| TR-16 | Portal (iris, zoom into a hollow, bloom portal) | Portal | X | 7-13 f | Lottieicon bell interior; NOSTRA hex iris 7 f (2 of 8) |
| TR-17 | Seamless camera move | Camera | U | 30-40 f | Chowdeck tilt; HubSpot continuous takes; Solar crane-scroll; Bumper (8 seamless boundaries); Wix carousel; NOSTRA two-step pull-back (6 of 8) |
| TR-18 | Polarity / colour-field flip cut | Cut | U | 0 f | NOSTRA 11 of 13; Bumper 7 flips; Solar nearly every cut; HubSpot black → white; Chowdeck chapter colours; kivi white ↔ colour (6 of 8) |
| TR-19 | Empty-plate cut (exit to clean background, breath frame, drop-out, recede) | Cut | U | 1 f gap (0-10 f) | Solar; Bumper; Lottieicon; kivi; NOSTRA (5 of 8) |
| TR-20 | Interaction-triggered transition (click, send, tap, toggle) | Motivated | U · SaaS | 3-8 f from the action to the change | kivi click bloom; HubSpot toggle and send; Wix sparkle, send, Create; Chowdeck order click; NOSTRA "NO" click (6 of 8) |
| TR-21 | Type-carried transition (word swap, scatter-swap-converge, word-spacing match, text split, scale-contrast type cut) | Type | U | 0-25 f | Bumper; HubSpot; NOSTRA; Lottieicon; kivi; Wix (6 of 8) |
| TR-22 | Generation-state transition (develop, de-pixelate, mono → colour, shimmer, promise → proof swap) | State | SaaS · S | 1-42 f | Wix thermal / pixel / shimmer; kivi B&W → colour, blur-to-sharp; Chowdeck flat → real (3 of 8) |
| TR-23 | Anchored-element cut (locked overlay over changing context) | Cut | U · SaaS | 0 f | Wix bar ×6 shots, ice bottle ×4; Chowdeck notification; Lottieicon "For"; NOSTRA "VIDEO"; HubSpot lockup reprise ±1 px (5 of 8) |
| TR-24 | Dissolves and fades (crossfade, dim-to-texture, fade to end) | Dissolve | S, sparing | 3-33 f | kivi crossfade 17 f, fade 14 f; Lottieicon dim 3 f, fade 33 f; Wix colour dissolve 25 f (3 of 8) |


---

## 6. UI animation

### 8.1 Believability laws (UI-B)

*Source: P06 `master/06-ui-animation-system.md`*

**UI-B1. Causality: every state change has a visible or audible cause. [U, 7/8]**
- Rule: before any UI state changes, show the cause in the same shot or the shot before: a cursor press, a keystroke, a voice phrase, an AI "acting" state, or a system event (a notification, a failed provider).
- Evidence: kivi's cards change only while dictation audio plays or the AI writes [V:1-6l8S §9]. Chowdeck's click at 10.53 s precedes the morph at 11.03 s [V:126cpH]. Bumper's toggle is clicked at 12.03 s and the bar rises on the same frame [V:19NRDv t=12.03-12.27s]. HubSpot's toggle fills 2 f after the click [V:1CSXtQ t=10.200-10.267s]. Wix's send click triggers the page build [V:15VhHR t=12.20-12.83s]. NOSTRA's cursor taps "NO" and the logo appears 5 f later [V:1i2L14 t=32.0-32.17s]. Lottieicon's search glyph turns into a spinner only after the URL is typed [V:1ccYWJ t=40.40s].
- Why it works: viewers read cause → effect as "the product responded". Without a cause, the same animation reads as "someone animated this".
- Entrances are exempt. A card arriving on screen is presentation, not a state change. It still needs a reason to arrive (a cut, a hand-off, a cue), see UI-B6.

**UI-B2. Real product order: show states in the order the product produces them. [U, 6/8]**
- Rule: script the UI as a state machine first (state list, trigger per transition), then animate it. Never skip a state the viewer needs to understand the next one; never show a state the product cannot reach.
- Evidence: Chowdeck runs order → confirm → preparing → ready → rider on the way → delivered [V:126cpH t=9.27-13.60s]. HubSpot runs add source → toggle on → type query → send → answer [V:1CSXtQ t=8.87-21.47s]. kivi runs speak → raw transcript → correction → polished text → output artefact [V:1-6l8S §9]. Wix runs prompt → generate → result → edit [V:15VhHR]. Bumper's failover runs provider 1 fails → provider 2 fails → provider 3 succeeds [V:19NRDv t=40.8-45.0s]. Lottieicon's search runs magnifier → typing → spinner [V:1ccYWJ t=39.07-40.40s].
- Text: the strongest product overviews order features "the way a customer meets them" [S:playbook rule 8].
- Why it works: a correct sequence doubles as onboarding. A wrong order makes knowledgeable viewers (buyers who have seen the product) distrust everything else.

**UI-B3. The container is still while its content changes. [U, 4/8]**
- Rule: when content changes inside a component (status text, a typed query, an animating icon, generated output), hold the component's frame, position and size still, or let it drift at ≤0.2% W/f. Move the container only between content changes.
- Evidence: Chowdeck cycles three statuses inside one fixed notification pill [V:126cpH t=11.20-13.57s]. Wix locks the prompt bar at identical x/y/size across 6 shots (3.8 s) while three worlds swap behind it [V:15VhHR t=8.63-12.47s]. Lottieicon: "one animated element at a time inside a still component" [V:1ccYWJ §9]. kivi grows the card for new content rather than popping a new card in [V:1-6l8S t=13.77s].
- Why it works: the eye can only track one change. A moving container plus changing content splits attention, and the viewer misses the content.

**UI-B4. Two speeds: slow camera, real-speed UI. [U, 4/8]**
- Rule: microinteractions run at the speed of the real product (1-6 f). Camera moves, reveals and card entrances run at film speed (12-31 f). Never slow a toggle or dropdown to "cinematic" speed; give it anticipation (a cursor dwell) and a hold afterwards instead.
- Evidence: HubSpot: "real UI timings (100-200 ms) sit inside a slow camera, so the product feels responsive and the film feels unhurried" [V:1CSXtQ Study C]. Wix: "Brand frame: slow and precise… Product world: fast but physical (12 f scrolls, 6 f morphs, 1-2 f pops)" [V:15VhHR §Motion]. kivi's hover lift (≈3 f) and click bloom (≈6 f) follow a slow 0.85 s truck and a held, slowly pushing desktop [V:1-6l8S t=35.47-37.15s]. Bumper's toggle (≈4 f) sits inside a slow pull-back drift [V:19NRDv t=11.00-13.13s].
- **References win** over the generic conversion "video beats should sit in 400-600 ms" [N]. That conversion is right for cards and camera, wrong for microinteractions: no reference slows a toggle, label swap or dropdown to film speed.
- Why it works: speed is a product claim. A 3 f toggle says "instant". A 15 f toggle says "laggy", however beautiful it looks.

**UI-B5. One primary change at a time. [U, 5/8]**
- Rule: at any frame, one UI element is the primary motion. Everything else is still, drifting below 0.2% W/f, or dimmed. A staggered cascade counts as one gesture.
- Evidence: Lottieicon's toolbar and tab bar play their icons one after another, left to right, each loop 10-15 f [V:1ccYWJ t=12.17-14.73s, 18.83-21.00s]. Wix's theme-change shot runs popup → typing → cursor → click → shimmer strictly in sequence, about one event every 0.5 s [V:15VhHR t=16.63-19.20s, §Rhythm]. HubSpot's dropdown, cursor travel, click and toggle run strictly in sequence [V:1CSXtQ t=8.867-10.333s]. kivi dims the raw transcript to ≈50% while the polished line streams [V:1-6l8S t=13.77-17.03s]. Bumper's orbit brings one badge forward per step [V:19NRDv t=30.9-33.4s]. Newsela-style highlights steer attention to one region at a time [S:Newsela].
- Why it works: sequence is how a viewer reads a process. Simultaneity reads as noise.

**UI-B6. Anchor something across every change of context. [U, 5/8]**
- Rule: when the background, the screen or the scene changes, keep one UI element fixed in screen position (within ±5% W), or carry it through the change as a shared element.
- Evidence: Wix's prompt bar across 6 shots [V:15VhHR t=8.63-12.47s] and its ice-bottle asset across 4 layouts with the editor selection box visible [V:15VhHR t=30.83-32.83s]. Chowdeck's order card becomes the notification and "stays on screen through the scene change" [V:126cpH t=11.03-11.43s]. HubSpot's send bubble continues the prompt's upward motion across a cut [V:1CSXtQ t=17.80s]. kivi reframes the same plate across the prompt → result cut [V:1-6l8S t=22.87s, 67.70s]. NOSTRA keeps "VIDEO" fixed while the rest of the line is wiped and retyped [V:1i2L14 t=6.13-7.00s].
- Why it works: the anchor tells the viewer "same product, new context", so fast cutting (ASL below 0.8 s in Wix's montage) never disorients.

**UI-B7. Data and copy look real, and stay identical across cuts. [U, 5/8]**
- Rule: fill UI with plausible, consistent, approved content: real-looking names, dates, amounts with believable decimals, real feature labels. Lock every string once written; a word must not change between a wide shot and its cut-in.
- Evidence: Bumper's merchant IDs, July 2025 dates, GBP amounts (108.50, 92.40): "it never reads as lorem ipsum" [V:19NRDv §9]. Wix's generated sites are art-directed sub-brands (Baseline, Soleu, Bowy) that recur across demos [V:15VhHR §Creative]. kivi's named contacts and Kannada output [V:1-6l8S]. Failures: Wix's "make" becomes "create" across the 6.57 s cut-in [V:15VhHR t=6.57s]; Lottieicon shows the "Random Misc" card twice in a row [V:1ccYWJ t=17.9-18.1s]; HubSpot's window texture is greeked [V:1CSXtQ §13].
- Why it works: buyers read UI fluently. One placeholder row or one changed word breaks the "this is real" contract.
- Never invent metrics, prices, customers or offers. Numbers come only from the client [S:playbook rule 9].

**UI-B8. Build the UI around text the viewer has already read. [SaaS, X → strong]**
- Rule: when a UI element carries a message, let the viewer read the message first (as type), then build the component around it: border and shadow (1-3 f), brand icon pop (≈3 f), secondary controls (4-5 f), then pull back ×0.75.
- Evidence: HubSpot types the headline into an empty canvas, then the prompt bar materialises around it [V:1CSXtQ t=2.13-9.03s]. Wix animates the brand sentence's sparkle icon into the prompt bar [V:15VhHR t=3.97-4.23s]. kivi's "Just speak" pill unfolds into the transcript card [V:1-6l8S t=9.50-9.93s].
- Why it works: "the viewer has already read the content, so the UI arrives as context, not clutter" [V:1CSXtQ Study B].

**UI-B9. Show the feature, then name it. [S]**
- Rule: show a micro-proof of a feature in the UI before a title card names it.
- Evidence: kivi auto-corrects "Shitij" → "Kshitij" inside the voice card (peach selection box, 4-5 f) at 20.43 s; the "Custom Dictionary" card appears at 25.47 s [V:1-6l8S].
- Why it works: the label confirms something the viewer has just seen, so it lands as recognition rather than a claim.

**UI-B10. No bounce, no elastic, no wobble on UI. [U, 6/8]**
- Rule: UI settles critically damped (E-OUT or E-CRIT). Overshoot is allowed only on props in playful styles (E-SPRING-P), never on UI chrome, type or data.
- Evidence: kivi, Wix, Bumper, HubSpot, Lottieicon and NOSTRA show no UI overshoot; NOSTRA's CTA releases "with no overshoot" [V:1i2L14 t=33.9-34.0s]. Wix: "This film's credibility comes from damped, single-direction ease-outs" [V:15VhHR §Avoid]. The one exception, Chowdeck's tossed card (+15° → −4° → 0°), belongs to a playful collage style [V:126cpH t=9.27-10.00s].
- Why it works: real interfaces do not wobble (modern OS springs settle with 0-15% bounce, and premium UI defaults to 0) [N: Apple default bounce 0, M3 standard ζ 0.9]. Bounce reads as "toy".

**UI-B11. The product shows itself doing its job. [U, 6/8]**
- Rule: every UI shot must show an outcome of the product (a generated page, a matched column, a delivered order, a typed email), not just a screen existing.
- Evidence: kivi's email, translation, code and sheet outputs [V:1-6l8S]; Wix's built sites [V:15VhHR]; Bumper's 100% reconciliation [V:19NRDv t=24.93s]; HubSpot's answer table [V:1CSXtQ t=20.0-21.47s]; Chowdeck's route reaching the pin [V:126cpH t=13.23s]; Lottieicon's icons animating in toolbars [V:1ccYWJ]. Text: "the interface does the talking" [S:Figma]; value "shown as outcomes appearing on screen, not as a feature list" [S:Airtable].
- Why it works: an outcome is proof; a screen is only a claim.

**UI-B12. Floating UI is allowed only when it is anchored. [S, 3/8]**
- Rule: free-floating cards are legitimate when (1) each is attached to the subject it describes, (2) each carries one fact, (3) they enter in reading order with a 3-4 f stagger, (4) they drift at ≤0.2% W/f, and (5) there are at most 3.
- Evidence: Wix's commerce cards pop near the portrait at a 4 f stagger, each whole in 1 f, "always anchored near the thing they affect" [V:15VhHR t=41.67-41.93s, §UI]. Bumper's three hex badges sit on an orbit ring around one hero photo [V:19NRDv t=29.97-35.93s]. kivi's WhatsApp badge overlaps the voice card's corner to tie the card to an app [V:1-6l8S t=39.75s].
- Why it works: an anchor turns "floating" into "annotation". Without one, floating cards are the random-screens cliché.


---

## 7. Typography

### 0.3 Defaults card: the 25 typography numbers to encode first

*Source: P07 `master/07-typography-system.md`*

| # | Parameter | Default | Range seen | Evidence |
|---|---|---|---|---|
| 1 | Families | 1 sans for all copy + ≤1 accent face with exactly one role | 1-2 faces | 8/8 refs (§9.1) |
| 2 | Statement size (T-STATEMENT) | Cap 5.8% H = 63 px cap, **90 px font @1080**; 9:16 **128 px font @1920** [inferred: a pick inside [N]'s 96-160 px headline range; [E] uses 112 px] | Cap 4.4-6.6% H (68-101 px font) | [V:1CSXtQ] [V:1-6l8S] [V:15VhHR] [V:1i2L14] [V:1Hcg3X]; 9:16 [N] [E] |
| 3 | Hero word (T-HERO) | Cap 12% H = 130 px cap, **185 px font @1080**; **240 px @1920** [inferred; the only 9:16 reference sets "busy?" at ≈260 px and "chow?" ascender ≈240 px [V:126cpH §Typography]] | Cap 10-23% H | [V:19NRDv] [V:1Hcg3X] [V:1i2L14] [V:1ccYWJ] [V:126cpH] |
| 4 | Climax word (T-MEGA) | Cap 31-33% H (460-510 px font @1080) | — | [V:1ccYWJ t=38.00s] [V:19NRDv t=59.90s] |
| 5 | Setup : hero size ratio | **1 : 2.5-3** | 1:2.1 to 1:6 ("order in" 4% over "seconds" 8.4% H is 1:2.1 [V:126cpH §Typography]) | [V:126cpH] [V:1Hcg3X] [V:19NRDv] |
| 6 | Readability floors | Cap ≥2.5% H (read class); **cap ≥3.6% H mobile-safe**; sentences for phone-inline 16:9 ≥84 px font; 9:16 body ≥52 px, floor 36 px | — | Part 02 CO-U5; [V:1Hcg3X §8]; [N] |
| 7 | Weight | 400 calm premium / 500-600 launch / 800-900 playful | 300-900 | §9.4 |
| 8 | Tracking | 0 on lines; −1 to −3% on lowercase display; 0 to +3% on display caps | −4% to +3% | §9.4 |
| 9 | Leading | 0.95-1.1 on display multi-line; 1.4-1.6 in UI body | 0.9-1.6 | [V:19NRDv] [V:126cpH] [V:1Hcg3X] [V:1-6l8S] |
| 10 | Statement placement | Centred; centre-line y 47-52% H; width 35-70% W, ≤85% W for one line of ≤6 words | 24-84% W | Part 02 CO-U11; 6/8 refs |
| 11 | Words per read frame | **≤6**; typed prompt ≤9-10; 2-4 typical | 1-9 | 7/8 refs |
| 12 | Word interval in a build | **8 f** (an eighth note at ≈110 BPM); 2-3 f in fast cards; 3-8 f in dictation streams | 2-10 f | [V:19NRDv] [V:1-6l8S] [V:15VhHR] [V:1i2L14] |
| 13 | Word or line entrance | Slide 4-7 f; rise + blur 9-12 f; label blur-fade 2-5 f | 1-18 f | §9.6 |
| 14 | Exit | 4-8 f, about half the entrance, E-EXIT or E-WHIP | 1-18 f | [V:1-6l8S §6] [V:1ccYWJ] [V:19NRDv] |
| 15 | Holds | Punch word 10-15 f; ≤3-word kinetic line ≥10-14 f landed; 4-6-word statement ≥0.8 s landed (1.2-1.9 s total); messages, captions and busy plates: [N] formula; payoff ≥1.0 s; end lockup ≥1.5 s still (2.2 s premium) | — | §9.11 |
| 16 | Motion while the text is read | Translation ≤0.2% W/f; scale drift about the text's own centre ≤0.6%/f (calm) or ≤1.5%/f (kinetic launch) | Translation 0.12-0.25% W/f; scale 0.3-3.5%/f measured | [V:1-6l8S] [V:1CSXtQ] [V:1Hcg3X] [V:19NRDv]; Part 04 |
| 17 | Overshoot on type | **0%** | 0% in 8/8 | §9.13 TY-U5 |
| 18 | Typing (display or prompt) | Filler 28-35 cps, key phrase ≈9 cps, 0.9-1.1 s phrase pauses; ECU 7-8 cps | 4-55 cps | [V:1CSXtQ] [V:15VhHR] [V:126cpH] [V:1ccYWJ] |
| 19 | Caret | Blink 9 f on / 9 f off; locked at 65-66% W once the line passes centre | — | [V:1CSXtQ t=4.5-7.67s] |
| 20 | Streaming | Speech pace 4-7 wps, each word 30-40% → 100% opacity in 3-4 f; machine pace 1 word per 2 f | — | [V:1-6l8S t=9.55-20.45s] |
| 21 | AI-written text colour | Gradient for 4-12 f, settled to the final colour within 6-8 f | 4-18 f | [V:15VhHR t=7.87s, 12.53s, 36.6s] |
| 22 | Contrast | ≥4.5:1; 3:1 only for large text; 7:1 over footage; scrim ≥60% | — | [N]; Part 02 §11.3 |
| 23 | Glow on type | Dark energetic styles only; radius ≤2-3% of cap height | 0 to ≈6-8% (flagged) | [V:19NRDv t=7.2s]; Part 02 CL-A4 |
| 24 | Repetition | Semantic letter tricks ≤3 per film (9-30 f each); one reveal grammar ≤6 uses before it varies; ≤3 consecutive text-only cards | — | [V:19NRDv rule 5, avoid]; [V:1-6l8S] [V:1ccYWJ] [V:1CSXtQ] |
| 25 | Sync | A word never appears after its sound; it may lead by ≤2 f (≈67 ms) | Picture leads the beat 0-2 f | [P]; [V:19NRDv §11] |

### 9.2.2 The size ladder (tokens)

*Source: P07 `master/07-typography-system.md`*

| Token | Role | 16:9 cap % H | 16:9 px @1080 (cap / font) | 9:16 font px @1920 (% H) | Max width | Weight band | Evidence |
|---|---|---|---|---|---|---|---|
| **T-MEGA** | One climax word or product name, ≤0.5 s; or a bleeding macro hook ≤0.7 s | 31-33% (macro hook 45-50%, bleeding) | 335-356 / 480-510 (macro cap ≈530) | 280-380 (14.6-19.8%) | 16:9 ≤74% W; 9:16 ≤84% W only if ≥8% H (Part 02 §4.7) | 500-900 | "So" cap 31% [V:1ccYWJ t=38.00s]; PRO cap ≈33% [V:19NRDv t=60.1s]; macro 49% [V:15VhHR t=0-0.63s] |
| **T-HERO** | 1-2-word hero word | 10-23%, default **12%** | 108-248 / 155-355; default **130 / 185** | 200-280 (10.4-14.6%), default **240** | ≤60% W [inferred] | 500-600 (400 in calm films) | Bumper 15-23% [V:19NRDv §8]; "SOLAR" 11.6% [V:1Hcg3X t=0.37s]; "IMAGINE" 10.3%, "SOLUTION" 11% [V:1i2L14 §8]; Lottieicon em 13.6-16.7% [V:1ccYWJ §8]; "chow?" asc 12-13% of 1920 [V:126cpH t=0.73s] |
| **T-STAT** | A number that is the claim | Font 10-22% standalone; inside UI, cap ≥6% | — / 108-240 | 220-320 (11.5-16.7%) [inferred] | — | 300-600 | "50 + Categories" em ≈10% [V:1ccYWJ t=14.73s]; "100%" cap ≈6% inside a card [V:19NRDv t=24.93s]; stat card 240 px @1080 [E, inferred] |
| **T-DISPLAY** | 2-4-word headline, two-line headline, payoff block | 7.9-11% | 85-119 / 122-170 | 140-200 (7.3-10.4%) | ≤70% W | 500-800 | Bumper headline cap 8-9% [V:19NRDv t=25.6s]; "MOTION DESIGN" 8.5% [V:1i2L14 t=13.97s]; "PANELS" 7.9% [V:1Hcg3X]; Chowdeck payoff cap 7-7.5% of 1920 [V:126cpH t=13.60s] |
| **T-STATEMENT** | Default single-line claim, 3-6 words | 4.4-6.6%, default **5.8%** | 48-71 / 68-101; default **63 / 90** | 96-190 (5-9.9%), default **128** (6.7%) on 2-3 lines | 35-70% W, ≤85% W for one line ≤6 words | 300-500 | HubSpot cap 5.8% [V:1CSXtQ t=21.47-27.37s]; Wix 6.6% [V:15VhHR t=0.63s]; NOSTRA 5.6% [V:1i2L14 t=7.57s]; Solar message 5.6% [V:1Hcg3X t=28.97s]; kivi font 6.3-8.8% [V:1-6l8S §8]; 9:16 headlines 96-160 px [N], [E] 112 px (128 px is [E]'s 16:9 value) |
| **T-SUPER** | Setup word, supertitle, kicker, connector | 3.6-5.5%, default **4.5%** | 39-59 / 56-85; default **49 / 70** | 72-106 (3.8-5.5%) | ≤60% W | 400-600 | Bumper phrase/supertitle 4.5-5.5% [V:19NRDv §8]; "A WAY" 5.5% [V:1i2L14 t=0.70s]; Chowdeck setup words 4-5.5% of 1920 [V:126cpH]; HubSpot hook 3.6-3.9% (flagged as weak on phones) [V:1CSXtQ §13] |
| **T-LABEL** | World-space or flank label, chip label, card label (1-3 words) | 3.6-4% | 39-43 / 56-62 | 60-72 (3.1-3.75%) | Fits its object | 600-700 | Solar labels 3.6-4% [V:1Hcg3X §8]; card labels ≈3% SemiBold [V:1ccYWJ t=16.10s] |
| **T-UI-READ** | UI text that must be read: prompt, typed field, notification, status, result | Cap 2.8-4.2% (font 4-6%); at ECU cap 4.2-7.5% | 30-45 / 43-64; ECU 64-115 font | ≥52 (2.7%) | Inside the UI | 400 | kivi card body font 3.5-4%, leading 1.6 [V:1-6l8S t=18.37s]; HubSpot typed font 4.8%, ECU 6.0% [V:1CSXtQ §8]; Wix ECU input cap ≈7.5% [V:15VhHR t=6.57s]; Chowdeck notification 52 px @1920 [V:126cpH t=11.07s] |
| **T-CAPTION** | VO caption, 1-2 lines | ≈3.6-4% (font 4.8-5.6%) | 39-43 / 52-60 | 60-75 (≥52) | Lines ≤68% W, ≤42 characters | 500 | [N] (BBC 68% width; Netflix 42 characters per line; creator consensus 60-75 px, unverified); 2-line cues of 2-4 s [S:Thomson Reuters] |
| **T-WORDMARK** | Logo alone or with product name | Cap 7-12% | 76-130 cap | Cap ≈77 px (4%) at 56-62% W | Alone 17-26% W; with product or co-brand 50-57% W | Brand | Wix 12.2% / 17% W [V:15VhHR t=51.37s]; NOSTRA 7.2% / 26% W [V:1i2L14 t=32.17s]; Bumper 11% / 57% W [V:19NRDv t=61.47s]; HubSpot box 9.6% / 50% W [V:1CSXtQ t=10.37s]; kivi asc 15.4-21% [V:1-6l8S t=71.10s]; Chowdeck [V:126cpH t=16.20s] |
| **T-URL** | URL, handle | Font ≥5% (bbox ≈5.8%) | ≥54 font | ≥52 | — | 400-500 | kivi 54 px works [V:1-6l8S t=75.53s]; Bumper ≈24 px cap and Lottieicon ≈2% are flagged [V:19NRDv §8] [V:1ccYWJ §13] |
| **T-CTA** | Button label in a pill | Cap ≈5.3% in a pill 37% W × 11% H | 57 / 81 | 56-64 [inferred] | Pill ≤67% W in 9:16 [inferred] | 700 | "BOOK NOW" [V:1i2L14 t=32.87s] |
| **T-TEXTURE** | UI micro-copy, prop paragraphs, axis labels | ≤2% | ≤22 | <36 | — | any | Unreadable by design in 6/8 (Part 02 CO-U5) |

> **Evidence note on the 9:16 column.** Only Chowdeck [V:126cpH] is measured in 9:16, and it is measured through a ≈256×470 px crop of a phone-filmed monitor, assuming a 1080×1920 comp [V:126cpH header, inferred]. Every 9:16 px value in this table that does not cite [V:126cpH] or [N] (T-MEGA, T-STAT, T-LABEL, T-CTA and the upper ends of T-HERO and T-DISPLAY) is **[inferred]**: the 16:9 role re-laid into the 720 px text column and checked against [N]'s floors (36 / 52 px) and headline range (96-160 px).

**Floors (one table, so a validator can enforce them).**

| Class | 16:9 @1080 | 9:16 @1920 | Why | Evidence |
|---|---|---|---|---|
| Texture (meaning must not depend on it) | Any size below the read floor | Below 36 px | Unreadable is acceptable only if obviously decorative | Part 02 CO-U5 |
| Read floor (anything that carries meaning) | Cap ≥2.5% H (27 px cap) | ≥36 px font | Below this the references themselves call the text illegible | [V:1-6l8S §13] [V:1ccYWJ §13] [N] |
| Mobile-safe label (≤3 bold words next to a hero) | Cap ≥3.6% H (39 px cap ≈ 56 px font) | ≥60 px | Solar's labels at 3.6% read in every main scene; its 2.2-2.5% recap labels are the only ones flagged | [V:1Hcg3X §8] |
| Sentence for phone-inline 16:9 delivery | Font ≥84 px | — | Physical pt size on an upright phone | [N] |
| 9:16 body / caption | — | ≥52 px (captions 60-75) | Physical pt size | [N] |

> **Generic advice wins here (physical limit).** kivi sets some statements at 68-80 px font in 16:9 [V:1-6l8S §8] and they read on a desktop or X player. For a 16:9 master that will play inline on phones, the [N] floor of 84 px for sentences wins, because it is a pixel-density limit, not a taste choice. The default T-STATEMENT (90 px) already clears it. Labels of ≤3 bold words may stay at the reference value of cap 3.6% H (≈56 px font), because Solar shows them reading cleanly next to a hero [V:1Hcg3X §8].

### 9.11 How much text at once: word budgets and reading time

*Source: P07 `master/07-typography-system.md`*

### 9.11.1 Word budget per frame

| Beat | Max words on screen | Max characters | Lines (16:9 / 9:16) | Evidence |
|---|---|---|---|---|
| Hook | ≤7 in total (≤5 in 9:16 and spots ≤15 s; ≤3 for a dialect question), 1-2 visible at any instant while it builds (P01 H2) | ≤24 (16:9 ≤40) | 1 / 1-3 | "Still typing?" [V:1-6l8S t=0.10s]; "You don chow?" [V:126cpH]; "For the first time ever" [V:1CSXtQ]; "Take payments like a PRO" [V:19NRDv]; 1-2 macro words visible [V:15VhHR] |
| Hero / punch word | 1-2 | ≤10 | 1 / 1-2 | "So", "One", "Save", "PRO" [V:1ccYWJ] [V:19NRDv] |
| Kinetic line (brand system) | ≤3 | ≤26 | 1 / 2-3 | [V:1i2L14 §8] |
| Statement | **≤6** | ≤32 [N] | 1 / 2-3 | 7/8 refs max 5-7; [N] 1-7 words, ≤32 characters |
| Payoff / message block | 2-6 | ≤40 | 2-4 / 3-5 | "Order Delivered" [V:126cpH]; "Earning credits on your Electric Bill" [V:1Hcg3X] |
| Typed prompt or query | ≤9-12 (read during typing) | ≤70 | 1, overflowing / 2-3 | 9-10 words [V:1CSXtQ t=2.13s, 13.03s]; ≈10 [V:15VhHR] |
| UI status text | ≤5 | ≤24 | 1 | "Rider on his way to you" [V:126cpH rule 9] |
| Caption under a VO | 2 lines × ≤42 characters | 84 | 2 / 2 | [N] Netflix/BBC; 2-line cues [S:Thomson Reuters] |
| CTA button | 1-3 | ≤16 | 1 | [S:playbook §4]; "BOOK NOW" [V:1i2L14] |
| Lockup | Logo + 1 line (tagline ≤4 words or a URL) | — | — | [V:1CSXtQ] [V:19NRDv] [V:1-6l8S] |
| UI texture | Unlimited, if nothing depends on it | — | — | ≈60-word answer scrolled past in ≈1.5 s [V:1CSXtQ t=20.0-21.47s] |
| **Absolute cap per frame (read class)** | — | **84** | — | [N] |

> **References and generic advice agree here.** [N]'s kinetic headline beat of 1-7 words and ≤32 characters matches the references' median maximum of 6 words. Use ≤6 as the hard default and allow 7 only when one word is an inline object or the line is a bookend sentence the viewer will see twice (Wix's "Build a website you ♥ love… with WIX" [V:15VhHR t=0.63s]).

### 9.11.2 Reading-time tiers

Reading starts when the first word is legible, not when the last one lands, because sequential reveals let the eye read during the build [inferred from the references' short landed holds]. So each tier has two numbers: the **landed hold** (last word settled → exit starts) and the **total visible time** (first word legible → exit starts).

| Tier | Applies to | Landed hold (minimum) | Total visible (minimum) | Measured | Evidence |
|---|---|---|---|---|---|
| **Punch** | 1-2 words, cap ≥10% H, alone in frame, in a run of ≥2 rhythmic cards | — | **10-15 f** | 10-12 f [V:1ccYWJ t=38.0-39.07s]; 11-15 f swaps [V:1ccYWJ t=5.43-7.30s]; 11-16 f swaps [V:19NRDv t=57.60-59.90s] | Part 03 SP-H |
| **Kinetic** | ≤3 words revealed word by word, cap ≥5.5% H, near-empty frame | **10-14 f** (≥15 f over a busy background) | ≈0.9-1.0 s | 10-23 f landed, ≈1.0 s per sentence [V:1i2L14 §8]; 3-word cards 0.87-1.63 s [V:1ccYWJ]; 1.0-1.3 s [V:1CSXtQ t=21.47-27.37s] | |
| **Statement** | 4-6 words on a ≥85% empty frame, built in ≤2 chunks | **≥0.8 s** | **0.25 s × words + 0.25 s** (5 words → 1.5 s; 6 → 1.75 s) [inferred: a conservative fit just above kivi's 1.2-1.45 s for 5 words] | kivi 5-word cards ≈0.6-1.1 s landed, 1.2-1.45 s visible [V:1-6l8S t=37.25-38.70s, 52.25-53.5s, 62.95-64.2s, 69.65-70.83s]; Bumper 0.6-1.6 s legible [V:19NRDv §8]; HubSpot 5 words 2.17 s [V:1CSXtQ t=22.60s] | |
| **Message** | 5+ words with new information; any text over footage, a photo or a busy UI; captions | **max(1.0 s, 0.33 s × words + 0.4 s, characters ÷ 17)**; ×1.15 for Hindi or Hinglish [N, unverified] | — | The references' failures sit here: a 6-word block complete for 0.4 s [V:1Hcg3X t=29.80-30.2s]; a 2-word question over footage for 0.45 s [V:126cpH t=2.07-2.50s] | [N] |
| **Typed** | Prompts and display type-ons | ≥0.6 s after the last character (display type-on 15-20 f) | Typing time counts as reading | 0.6 s [V:1CSXtQ t=7.2-7.8s]; 15-20 f [V:1ccYWJ t=34.73-38.0s] | |
| **Payoff** | The line the viewer must remember | **≥1.0 s fully still** | — | ≈1.0 s [V:126cpH t=14.2-15.2s]; 1.0 s [V:15VhHR t=0.63-1.43s] | [V:126cpH rule 14] |
| **UI status** | Text that tells the story inside the UI | **≥1.0 s** per status (≤5 words) | — | 0.33 / 0.5 / 1.1 s / 2 f, of which only 1.1 s works [V:126cpH t=11.2-13.6s] | [V:126cpH rule 9] |
| **Lockup** | Logo, tagline, URL, CTA | ≥1.5 s; the final frame ≥2.0-2.2 s still | — | 2.2 s [V:1CSXtQ t=27.87-30.03s]; ≈1.7 s [V:15VhHR t=52.20-53.87s]; 1.4 s [V:126cpH t=16.53-17.97s]; ≥4 s with a QR [V:19NRDv rule 15] | |

> **References win (statement tier, refining Part 03 §18.8).** [N]'s subtitle-derived formula asks a 5-word line to hold ≥2.05 s after it lands. kivi holds its 5-word statements ≈0.6-1.1 s after landing (1.2-1.45 s in total) and its teardown flags no readability problem; Bumper's lines are fully legible for 0.6-1.6 s. The difference is the context: a subtitle is read while the eye also watches action, but a statement card is the only thing in an otherwise empty frame and arrives in one or two chunks the eye reads during the build. So for a 4-6-word statement alone on a ≥85% empty frame, use the statement tier. Part 03 §18.8's "any message of 5+ words: never below the [N] formula" still applies to messages, captions, busy plates and new information, which is where every reference failure sits. Do not go below kivi's 0.24 s per word of total visible time; kivi reaches it only on a repeated template ("Your X, Y by voice") that the viewer has learned [inferred].

> **References win (punch tier).** Netflix's minimum event of 5/6 s (25 f) [N] and [N]'s 1.0 s floor do not apply to 1-2-word punch words in a rhythmic run: the references use 10-15 f with no flagged problem (Part 03 SP-H says the same).

### 9.11.3 Density across a film

- **Text change cadence.** Narrated SaaS films change on-screen text every ≈2.5-3.5 s and the idea every 7-14 s [S:playbook §1.6]; caption lines average 2.4-3.5 s (Superspace) and 3.2 s (Luminate) [S:Superside] [S:Snowflake]. Kinetic sections in the references change cards every 0.33-2.2 s [V:1ccYWJ §11] [V:1CSXtQ §11]. Use the faster cadence only for 1-3-word beats.
- **Words per film.** A brand-frame film can say everything in ≈11 words of ad copy (Wix, 54 s) [V:15VhHR §Typography]. A kinetic launch carries ≈50% of its runtime as type (Bumper) [V:19NRDv §3]. Choose the end of the range by style, not by habit.
- **Text-only runs.** ≤3 consecutive text-only cards; the teardowns flag 4 (HubSpot), 5 (kivi, over an ambient bed) and 6 (Lottieicon) [V:1CSXtQ §16] [V:1-6l8S §16] [V:1ccYWJ §16]. Break a run with a UI beat, a scale change or a music lift.

### 9.11.4 Text and voice sync

When a voice speaks the words (VO, in-world dictation, or a customer soundbite):
- **A word never appears after its sound.** Picture leading sound is tolerated far more than the reverse (ITU-R BT.1359: +45 ms early vs −125 ms late is the detectability threshold) [P].
- **Reveal frame = round((word start ms − 67) ÷ 1000 × fps)**, i.e. start the pop-in ≈2 f before the onset so the word is legible on it; switch a karaoke highlight at the onset or 1 f early [P].
- **Hold a phrase ≥5/6 s (25 f); a line may stay up to 500 ms after its last word; keep ≥2 f between caption events** [P] (Netflix timing guide).
- **Page captions** by combining tokens within 1,200 ms and breaking on silences of 400 ms, with a forced page break at scene boundaries [P].
- **Stream in-world speech at its own rate.** kivi's transcript streams at 4-7 wps exactly where the voice's formants appear [V:1-6l8S §12].
- **Music-led type** lands on the grid 0-2 f before the beat [V:19NRDv §11]; never after it [V:19NRDv §16].

### 9.12 Readability-in-motion rules (the RM checklist)

*Source: P07 `master/07-typography-system.md`*

Each rule is pass/fail with a number, so a validator or a QC editor can apply it.

| ID | Rule | Threshold | Evidence |
|---|---|---|---|
| **RM-01** | Text is slow while it is read; fast motion only at the edges | Translation ≤0.2% W/f; scale ≤0.6%/f (calm) or ≤1.5%/f (kinetic); fast motion only in the first 4-8 f and the last 2-8 f of the text's life | [V:19NRDv §8] [V:1CSXtQ §8]; TC-01/02 |
| **RM-02** | Legible early in its entrance | Blur gone and opacity ≥90% by frame 4 (labels), 8 (word slides), 12 (statement rises), 20 (soft slams) | RV-03 … RV-07 |
| **RM-03** | No spring on read text | Overshoot 0%; no bounce, no per-letter rotation. A ≤3% width correction after an auto-fit is the only exception | 8/8 refs; auto-fit 407 → 395 px [V:1ccYWJ t=35.27-35.8s] |
| **RM-04** | Size floors | §9.2 floors (cap ≥2.5% read; ≥3.6% mobile-safe; 84 px sentences for phone-inline 16:9; 9:16 ≥52 px body) | §9.2.2 |
| **RM-05** | Contrast | ≥4.5:1; 3:1 only for large text (≥66 px in 9:16 [N]; ≈117 px in phone-inline 16:9, computed from [N]'s 0.205 pt/px); 7:1 over footage; scrim ≥60% or a frosted card over a defocused plate | [N]; Part 02 §11.3; frosted cards over defocused plates [V:1-6l8S t=18.37s] |
| **RM-06** | Holds by tier | §9.11.2 | §9.11.2 |
| **RM-07** | Blur policy | Motion blur only on entrance frames and whip exits; never during a hold; one policy per film | TC-12 |
| **RM-08** | Nothing crosses the claim | Decorative layers masked behind the text's bbox + ≈10% padding | [V:126cpH t=3.9-4.4s]; Part 02 CO-U6 |
| **RM-09** | Words never collide | No overlapping glyphs during any exit or swap | [V:1-6l8S t=64.27-64.33s] |
| **RM-10** | Glow is subtle | Radius ≤2-3% of cap height; dark energetic styles only; never in prompt-native films | [V:19NRDv t=7.2s]; Part 02 CL-S1, CL-A4 |
| **RM-11** | Information stays inside safe areas | ≥5% H inside title-safe in 16:9; x 120-840, y 270-1210 in 9:16; display bleed ≤0.7 s only | [V:19NRDv t=30.9-35.9s]; Part 02 §4.7 |
| **RM-12** | One reading position | Statements return to the same centre-line (y 47-52% H); successive words appear where the eye already is | TY-P1, TY-P5 |
| **RM-13** | Text levels per frame | 1 (premium) or 2 at ≥1:2.5; 3 only in a title stack, adjacent levels ≥×1.45 | TY-H1 |
| **RM-14** | Copy is locked | Identical strings across cut-ins and versions; consistent grammar and number formats; one language unless localised on purpose | "make" vs "create" [V:15VhHR t=6.57s]; "Designer" vs "Developers", "4,863+" vs "50 + Categories" [V:1ccYWJ §13]; French + English [V:1i2L14 §13] |
| **RM-15** | Transitional colour states settle | AI gradients settle within 6-8 f; never >15 f | [V:15VhHR §Typography, §What to avoid] |
| **RM-16** | Glitch and decode are short | ≤10-12 f, once per film | [V:19NRDv t=1.17-1.50s]; [V:1i2L14 §16] |
| **RM-17** | UI text that tells the story is readable | ≥1.0 s per status; the final status is never a 2 f flash | [V:126cpH t=13.53s] |
| **RM-18** | Repetition limits | ≤3 consecutive text-only cards; one reveal grammar ≤6 uses | §9.8 budget |
| **RM-19** | No dead open | Type or a moving object on frame 0-1; the first change ≤0.5 s | [V:19NRDv t=0.00s] [V:1i2L14 t=0.00s] [V:1Hcg3X t=0.03s]; flaw at 0.73 s [V:126cpH]; [N] hook rule |
| **RM-20** | Photosensitivity | ≤3 flashes per second; flash frames ≤3 f, once per film; never strobe text colours | [N] WCAG 2.3.1; [V:1Hcg3X t=12.83-12.97s] |
| **RM-21** | No read text on a strobing move | Text is not on screen during camera moves above ≈5% W/f unless motion-blurred (Part 04's unblurred speed cap) | The measured strobe is Lottieicon's unblurred icon grid at 22-27% W/f [V:1ccYWJ t=28.8-32.57s §13]; applying it to text is [inferred]; Part 04 |
| **RM-22** | Frame cadence | Type and UI animate on ones; stepped "on twos" only on illustration layers | [V:126cpH rule 13, inferred] |
| **RM-23** | Delivery protects thin type | Native frame rate (no 24/25 → 30 pulldown), H.264 CRF 18 [N] (a ≥8-12 Mb/s floor at 1080p for UI-heavy films is [inferred]), PNG or JPEG ≥95 frames, bt709 | [N]; pulldown in [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X]; low bitrate in [V:1CSXtQ §13] |
| **RM-24** | Type is composited, never generated | Every visible word comes from the compositor with a locked font file and string | §9.20 |


---

## 8. Editing rhythm and durations

### 0.3 Defaults card: the rhythm numbers to encode first

*Source: P08 `master/08-editing-rhythm-durations.md`*

| # | Parameter | Default | Evidence |
|---|---|---|---|
| 1 | Target ASL by style | Calm / premium 2.3-3.0 s · balanced 1.8-2.3 s · fast / montage-led 1.5-1.8 s | §0.1 |
| 2 | Median shot | 0.70-0.95 × ASL | §0.1 |
| 3 | Long holds | 1-3 per film at 2-3.5 × ASL; the longest = 8-15 % of runtime | §0.1 |
| 4 | Claim / type card | 0.9-2.3 s (1.2-1.9 s typical) | [V:1-6l8S rule 11] [V:19NRDv rule 4] [V:1CSXtQ] |
| 5 | Proof / UI shot | 1.8-6.3 s; continuous take up to 8.2 s | [V:126cpH rule 15] [V:19NRDv] [V:1CSXtQ] |
| 6 | Event interval | 0.5-1.5 s; never more than 1.5 s without a discrete event except a designed still | [V:15VhHR] [V:19NRDv rule 12] [V:126cpH rule 15] |
| 7 | First visible change | By f3 (100 ms); hook text on f0 | 7/8 refs; [N] |
| 8 | Montage insert | 0.5-1.3 s; down to 0.23 s only with an anchored element | [V:15VhHR rule 6] |
| 9 | Punch card in a climax | 10-16 f (0.33-0.53 s), 3-6 in a row | [V:1ccYWJ rule 14] [V:19NRDv rule 14] |
| 10 | Burst-and-breathe cycle | 2-4 s | [V:126cpH] [V:1Hcg3X] |
| 11 | Breather | One per film ≥ 30 s: 10-15 % of runtime of low motion, or a music breakdown under the densest reading | [V:1i2L14 rule 14] [V:19NRDv] |
| 12 | Hero moments | 1 per 9-20 s; ≥ 2 per film ≥ 15 s; first at 10-25 %, last at 76-91 % | §15.9 |
| 13 | Load before a hero | 70-500 ms of near-silence, a riser, a light build or an accelerating push | [V:1CSXtQ rule 13] [V:15VhHR rule 8] [V:1ccYWJ t=18.83-21.0s] |
| 14 | After a hero | ≥ 30 f of calmer picture before the next dense beat | §15.9 [derived] |
| 15 | Beat-locked cut | Picture 0-2 f before the beat; never after | [V:19NRDv rule 17] |
| 16 | Music-led sync rate | ≥ 60 % of hard cuts within 0-2 f before a quarter beat, or ≥ 80 % within ±2 f of a transient | [V:19NRDv] [V:1CSXtQ rule 13] [V:126cpH avoid] |
| 17 | Action → consequence | Cut or state change 3-15 f after a click (median ≈6-8 f) | [V:1CSXtQ t=10.267-10.367s] [V:15VhHR rule 8] [V:126cpH rule 7] [V:1i2L14 t=32.0-32.17s] |
| 18 | Accelerando into the climax | Each successive unit 15-40 % shorter over the last 3-6 units | §15.5 |
| 19 | Same-treatment text cards in a row | ≤ 3 | [V:1-6l8S avoid] [V:1CSXtQ avoid] [V:1ccYWJ avoid] |
| 20 | Final still | ≥ 1.5 s; 2.2 s for a premium end; ≥ 4 s if a QR/URL must be read | [V:1CSXtQ] [V:19NRDv rule 15] |
| 21 | Music end | Resolves on the logo; ends with or after the last frame | [V:1ccYWJ avoid] |
| 22 | Section boundaries | Copy decides the order; the music decides the frame (snap within ±1 beat) | [V:19NRDv §12 takeaway] |

### 15.12 Universal principles (ER-U)

*Source: P08 `master/08-editing-rhythm-durations.md`*

Measured in 3 or more references, none contradicting.

1. **ER-U1 · ASL 1.6-3.0 s, set by style; median 0.70-0.95 × ASL; 1-3 long holds at 2-3.5 × ASL** (§0.1, §15.2). Why: a skewed distribution gives both pace and emphasis.
2. **ER-U2 · Two tempos: claim shots 0.9-2.3 s, proof shots 1.8-6.3 s** (§15.3). Why: tempo change signals "read" versus "watch".
3. **ER-U3 · A discrete event every 0.5-1.5 s; ambient motion never stops until the final still** (§15.6, §15.10). Why: perceived pace without disorientation.
4. **ER-U4 · First visible change by f3, hook text on f0** (7/8; Chowdeck's 0.73 s static open is flagged) [N] [V:126cpH avoid]. Why: the first frame is the thumbnail, and mobile dwell is 1.7 s [N].
5. **ER-U5 · Sync section turns and hero hits to an audio event in every film** (8/8, §15.7). Why: structural moments must feel decided.
6. **ER-U6 · Picture leads the beat by 0-2 f, never trails** (§15.7, BS-02). Why: sound-late is tolerated, sound-early is detectable at 45 ms [P].
7. **ER-U7 · Slow-fast-slow cycles, 2-3 per film, burst-and-breathe period 2-4 s** (§15.4). Why: arousal converts to understanding only during holds.
8. **ER-U8 · Pull the music back under the densest picture** (§15.4 ER-10). Why: total intensity has a ceiling.
9. **ER-U9 · Accelerate into the climax (each unit 15-40 % shorter), then stop dead on a still ≥ 1.5 s** (§15.5). Why: the trend builds tension that the still releases onto the logo.
10. **ER-U10 · Hero moments every 9-20 s, loaded and followed by ≥ 30 f of calm; last one at 76-91 %** (§15.9).
11. **ER-U11 · One breather per film of 30 s or more** (a visual breather of 10-15 % of runtime at ≤1/10 of the peak motion, or a music breakdown of 6-15 % under the densest reading per P09 SD-U7; NOSTRA 13 %, kivi's pad section 11 %) [V:1i2L14] [V:19NRDv] [V:1CSXtQ] [V:15VhHR].
12. **ER-U12 · ≤ 3 same-treatment text cards in a row** [V:1-6l8S] [V:1CSXtQ] [V:1ccYWJ].
13. **ER-U13 · Accelerate into the cut, decelerate out of it.** The last 6-10 f before a hard cut ease in (shrink, push, scroll); the first 6-20 f after it ease out [V:1CSXtQ rule 3]. The same envelope appears as Lottieicon's suck-in shrinks, Solar's whip exits and NOSTRA's whip [V:1ccYWJ] [V:1Hcg3X rule 1] [V:1i2L14 rule 9]. Why: the cut hides at peak velocity, so the energy carries across.
14. **ER-U14 · Copy decides the order; the music decides the frame** [V:19NRDv §12]. Section turns snap to bar lines within ±1 beat of the plan.
15. **ER-U15 · Payoffs readable ≥ 1.0 s; no final state shown for less than 25 f** [V:1Hcg3X] [V:126cpH] [N].
16. **ER-U16 · The music ends with the picture** (BS-10).

### 15.18 Rhythm QC gate (run on the locked cut)

*Source: P08 `master/08-editing-rhythm-durations.md`*

1. Shot count taken from the timeline, not a detector. ASL in the style band (§15.2); median 0.70-0.95 × ASL.
2. 1-3 long holds of ≥ 2 × ASL in films of 30 s or more; none longer than 8.5 s unless it is a continuous take with a beat every ≤ 1.5 s.
3. No gap longer than 1.5 s without a discrete event, except a dwell (≤ 1.0 s), the breather, or the final still.
4. Hook text on f0; first visible change by f3.
5. Hero moments: runtime ÷ 9-20 s, at least 2 (films ≥ 15 s); last one at 76-91 %; each preceded by a load and followed by ≥ 30 f of calm.
6. A breather (10-15 % of runtime low-motion, or a music breakdown) in films of 30 s or more (ER-U11).
7. No more than 3 same-treatment text cards in a row.
8. Sync: music-led films ≥ 60 % of hard cuts 0-2 f before a quarter beat (or ≥ 80 % within ±2 f of a transient); every film: 100 % of section turns and hero hits within ±2 f of an audio event; no cut 3-8 f ahead of a kick or after it.
9. Accelerando over the last 3-6 units into the climax; then a still ≥ 1.5 s (2.2 s premium).
10. Every payoff readable ≥ 1.0 s still; no text event under 25 f.
11. Music ends with or after the last frame; the last musical event lands on the logo ±2 f.
12. Delivery frame rate native; no duplicate-frame cadence in a frame-difference scan.
13. For template engines: total frames = sum of scene frames − transition overlaps, checked against the plan.

### 17.1 Shot-duration tokens (SD-01 … SD-20)

*Source: P08 `master/08-editing-rhythm-durations.md`*

Default frames are at 30 fps. "Range" is the usable band; going outside it needs a reason written into the storyboard.

| ID | Shot type | Job | Range (s) | Default s (f) | What fills it | Measured in the references | Why this length |
|---|---|---|---|---|---|---|---|
| **SD-01** | Hook shot | Read | 1.2-2.4 | 1.5 (45) | ≤ 5 words; text on f0; first change by f3; a new word or change every ≤ 0.5 s while it builds | kivi 1.55 s [V:1-6l8S t=0.00-1.55s]; Solar 1.53 s [V:1Hcg3X]; Chowdeck 1.60 s [V:126cpH]; NOSTRA 0.70 + 0.73 s (a 1.43 s hook built from two SD-02 micro-shots) [V:1i2L14 §4]; Bumper 1.17 + 1.23 s [V:19NRDv]; Lottieicon 1.20 s [V:1ccYWJ]; HubSpot 2.13 s [V:1CSXtQ] | One read of 2-5 words plus an exit, inside a 1.7 s mobile dwell [N] |
| **SD-02** | Hook micro-shot | Recognise | 0.5-1.0 | 0.7 (21) | 1-2 macro words or one iconic object, then a jump re-frame, zoom-through or slam | Wix macro type 0.63 s [V:15VhHR t=0.00-0.63s]; NOSTRA 0.70 and 0.73 s [V:1i2L14]; Lottieicon hook section ASL 0.91 s [V:1ccYWJ §11] | Pure attention-grab; must be followed by a readable shot |
| **SD-03** | Punch card / word swap | Recognise | 0.33-0.53 (10-16 f) | 0.4 (12) | 1-2 words ≥ 10 % H alone in frame, in runs of 3-6, intervals shrinking | 10, 10, 12 f [V:1ccYWJ t=38.0-39.07s]; swaps 16 → 15 → 13 → 11 f [V:19NRDv t=57.60-59.90s] | The viewer reads the pattern, not each card (Part 07 punch tier) |
| **SD-04** | Kinetic card (≤ 3 words) | Read | 0.9-1.6 | 1.2 (36) | Build ≤ 12 f, landed hold 10-14 f (≥ 15 f over a busy plate), exit 4-8 f | HubSpot cards 1.13-1.30 s [V:1CSXtQ §4]; NOSTRA lines rest 10-23 f [V:1i2L14 §8]; Lottieicon cards 0.87-1.63 s [V:1ccYWJ §4] | About 1 s per short sentence (Part 07 kinetic tier) |
| **SD-05** | Statement / claim card (4-6 words) | Read | 1.2-2.3 | 1.5 (45) | Built in ≤ 2 chunks; landed hold ≥ 0.8 s; ambient drift 3-4 % W/s | kivi 15 cards at 1.17-1.87 s [V:1-6l8S §11]; Bumper claims 0.93-1.97 s [V:19NRDv §4]; HubSpot 5-word card 2.17 s [V:1CSXtQ t=22.60s] | Total visible ≥ 0.25 s × words + 0.25 s (Part 07 statement tier) |
| **SD-06** | Message / caption shot (VO-led) | Read | 2.0-3.5 | 2.5 (75) | One caption cue (≤ 2 lines × 42 characters) and one UI focus | Caption lines 2.4-3.5 s (Superspace), ≈3.2 s (Luminate) [S:Superside] [S:Snowflake]; second-level, not frame-level | Hold ≥ max(1.0 s, 0.33 s × words + 0.4 s, characters ÷ 17) [N]; caption cadence becomes the cut cadence (BS-11) |
| **SD-07** | Typed prompt shot | Read | 2.0-5.0 (to 8.2 as a continuous take) | typing time + 0.6 s | Characters ÷ speed (filler 28-35 cps, key phrase 7-9 cps in close-up, wide shots 18-20 cps) + 0.9-1.1 s phrase pauses + ≥ 0.6 s still after the last character | HubSpot typed setup 5.67 s, macro query 4.77 s [V:1CSXtQ §3-4]; Wix chat 2.34 s and close-up 2.06 s [V:15VhHR rule 11] | Typing time is reading time: the eye reads as the line types |
| **SD-08** | Logo / name reveal (opening or mid-film) | Read + register | 1.5-3.5 | 2.0 (60) | 2-3 micro-stages of 0.15-0.5 s each (stroke 5 f → fill 8 f → sheen 14 f), then ≥ 0.5 s legible before the exit | kivi wordmark 1.87 s [V:1-6l8S shot 5]; Lottieicon logo 1.93 s [V:1ccYWJ §3]; HubSpot lockup 2.67 s [V:1CSXtQ shot 3]; Bumper logo + orbit 3.53 s [V:19NRDv t=3.62-4.10s] | Enough for a staged build and one legible beat; the long end carries an orbit of product objects |
| **SD-09** | UI proof shot (must be read) | Follow | 1.8-3.0 | 2.5 (75) | One state change and its readable result (≥ 1.0 s still); 3-6 UI events | Chowdeck 1.80 and 2.53 s [V:126cpH rule 15]; Wix demo ASL 2.1-2.4 s [V:15VhHR §Editing Rhythm]; kivi outputs 2.6-3.3 s [V:1-6l8S §4] | UI that must be read needs ≥ 1.8 s [V:126cpH rule 15] |
| **SD-10** | Long proof / continuous take | Follow | 3.5-6.3 (to 8.2) | 4.5 (135) | A camera or UI beat every 0.8-1.5 s; 1-3 per film | HubSpot takes 8.23, 4.77, 3.67 s [V:1CSXtQ §4]; Bumper orbit 5.96 s and network 6.26 s (flagged slow) [V:19NRDv]; Lottieicon tour 6.07 s [V:1ccYWJ]; kivi input cards 4.2-6.25 s [V:1-6l8S] | Spatial continuity reads as a real product; without internal beats the shot dies (ER-23) |
| **SD-11** | Montage insert | Recognise | 0.5-1.3 (down to 0.23 with an anchor) | 0.7 → 1.0 → 1.3 (21 → 30 → 39 f) | The context changes behind a locked anchor; holds lengthen onto the hero use case | Colour holds 21 → 29 → 38 f; inserts 0.23-0.97 s [V:15VhHR t=8.63-12.47s]; anchored ice montage 0.47-0.96 s [V:15VhHR t=30.83-32.83s] | Recognition only; the lengthening marks the hero (ER-14) |
| **SD-12** | Action → consequence shot | Follow | 1.5-3.0 | 2.0 (60) | Settle + cursor travel + dwell + press + consequence + ≥ 1.0 s result (formula C, §17.2) | Chowdeck card + click 1.80 s [V:126cpH t=9.27-11.07s]; kivi truck + hover + click 1.68 s [V:1-6l8S shot 18]; Wix theme request 2.57 s [V:15VhHR shot 12] | Built from the micro-timings in Part 06; the click is the edit point (ER-18) |
| **SD-13** | Detail cut-in | Read | 1.2-2.5 | 1.5 (45) | A 3-3.5× scale cut-in on the one value or control; that value held ≥ 1.0 s | Wix 3.4× cut-in, 2.06 s [V:15VhHR t=6.57s]; Bumper tooltip 1.20 s [V:19NRDv shot 9]; kivi icon cut-in 1.68 s [V:1-6l8S shot 18] | A cut-in is faster and crisper than an animated zoom [V:15VhHR rule 13] |
| **SD-14** | Hero depth / 3D move | Follow + peak | 1.4-4.0 | 2.5 (75) | One designed peak of 4-20 f inside it; a load before it; ≥ 30 f of calm after it | Wix 3D deck 1.36 s [V:15VhHR shot 31]; kivi pill burst 1.58 s [V:1-6l8S shot 6]; HubSpot 3D take 3.67 s [V:1CSXtQ shot 5]; Bumper merge ring 3.92 s [V:19NRDv shot 25] | The peak is short; the shot around it supplies the load and the aftermath (ER-20) |
| **SD-15** | Transition bridge shot | Recognise | 0.4-1.0 | 0.9 (27) | An ink or light bloom, a tilt through a layer, or a single flash insert; no content to read | kivi ink bloom 0.90 s [V:1-6l8S shot 20]; Chowdeck tilt 1.00 s [V:126cpH shot 10]; Solar flash insert 0.43 s [V:1Hcg3X §11]; NOSTRA arrows 0.20 s [V:1i2L14 shot 13] | Exists only to carry motion between two worlds |
| **SD-16** | Breather shot | Rest | 2.5-6.3 | 4.0 (120) | Motion ≤ 1/10 of the film's peaks; one line of ≤ 6 words or none | NOSTRA 4.7 s [V:1i2L14 t=25.93-30.63s]; Lottieicon slow section ASL 3.62 s [V:1ccYWJ §11] | Relief after density; one per film of 30 s or more (ER-U11) |
| **SD-17** | Payoff / result shot | Read | 1.5-2.5 | 1.5 (45) | The outcome fully still for ≥ 1.0 s | Chowdeck "Order Delivered" 1.60 s with a 1.0 s hold [V:126cpH t=13.60-15.20s]; Wix BASELINE build 1.66 s [V:15VhHR shot 10]; Solar's 0.4 s readable payoff is a flaw [V:1Hcg3X] | What the viewer must remember needs one still second (ER-16) |
| **SD-18** | Tagline / bookend | Read | 1.5-2.0 | 1.5 (45) | Echo of the hook, ≤ 4 words; often an accelerating push into a punch | kivi 1.48 s [V:1-6l8S shot 30]; Wix 1.74 s [V:15VhHR shot 32] | Rhymes with the hook; the push loads the logo |
| **SD-19** | CTA card | Read | 1.0-2.6 | 2.0 (60) | Verb + product or offer, 1-5 words; URL or button | HubSpot 1.30 + 1.30 s [V:1CSXtQ shots 8-9]; kivi URL 2.25 s [V:1-6l8S shot 33]; Lottieicon action CTA 5.2 s including typing [V:1ccYWJ]; [S:PointCard] arrow CTA | Read once, act; in music-led films the CTA sits on a pad [V:1CSXtQ §12] |
| **SD-20** | Final lockup | Register | 2.2-5.7 | 3.0 (90) | Logo settles in ≤ 0.5 s, then dead still ≥ 1.5 s (2.2 s premium; ≥ 4 s with a QR) | HubSpot 2.67 s (2.2 s still) [V:1CSXtQ]; Wix 2.50 s (≈1.7 s still) [V:15VhHR]; Bumper 5.73 s (≈4.6 s still) [V:19NRDv]; Chowdeck 1.77 s shot with a 1.4 s hold and one wobbling rider [V:126cpH §4, §Editing Rhythm]; NOSTRA ≈0.8 s still (too short) [V:1i2L14] | The only still frame of the film; the brand registers (ER-13) |

Pauses inside shots (the breath frame of 1-10 f, the dwell of 7-30 f, the silence gap of 70-500 ms) are not shots. They are listed in §15.6.

**Token rules**
- **DU-R1 · Pick the token by the job, not by the content type [U].** The same UI screen is SD-11 (0.7 s) when it only needs recognising inside an anchored montage and SD-09 (2.5 s) when its result must be read [V:15VhHR] [V:126cpH rule 15].
- **DU-R2 · Every "Read" or "Follow" token is a minimum, not a target [U].** If the content needs more time than the default, use the top of the range. If it needs more than the range allows, split it into two shots with a cut-in (SD-13) rather than stretching it [inferred].
- **DU-R3 · Only "Recognise" tokens may go under 0.9 s [U].** Below 0.8 s an anchor or a continuing motion vector is required (ER-05).
- **DU-R4 · The longest shot of the film is a proof, a tour or a hero visual, not a text card [U, 7/8].** kivi 6.25 s card over the courtyard, Wix 3.73 s page, Bumper 6.26 s network, HubSpot 8.23 s take, Solar 4.7 s wafer, Lottieicon 6.07 s tour, NOSTRA 4.7 s breather visual. The exception is Chowdeck, whose longest shot (2.63 s) is the promise card with its starburst [V:126cpH].
- **DU-R5 · Do not shorten a read hold to hit a beat [inferred].** Move the cut to the next beat. At 120 BPM that costs 15 f at most.

> **References win (shot length).** [E] infers that a 40-50 s ElevenLabs spot has 10-14 shots averaging 3-4 s, with title cards at 1.5-2.5 s and UI demos at 4-6 s. These are its author's guesses; no ElevenLabs film was measured. The references cut about twice as fast (ASL 1.58-3.00 s, claim cards 0.9-2.3 s, UI 1.8-6.3 s). Use [E] only for the end card, where it agrees (≈2.5 s hold, final hit on the logo frame) [E §6.12].

> **References win (minimum scene length).** [N] derives a minimum scene of 1.8 s and 25 f. That is right for anything the viewer must read (SD-04 … SD-10, SD-12, SD-13, SD-17), and the references' flaws are exactly the shots that broke it. It is wrong for recognition shots: SD-02, SD-03, SD-11 and SD-15 run 0.33-1.0 s in five references with no flagged problem [V:1ccYWJ] [V:19NRDv] [V:15VhHR] [V:1Hcg3X] [V:126cpH].

### 17.4.1 Plan summary

*Source: P08 `master/08-editing-rhythm-durations.md`*

| Plan | Use for | Style / template (Part 01 §2.4) | Edit driver | Shots | ASL | Median | Longest | Heroes | Breather | Grid |
|---|---|---|---|---|---|---|---|---|---|---|
| **PL-05** | Bumper, sting, end slate, pre-roll, the opening of an app-store preview | Any; on-screen copy only | Music (sting) | 3 | 1.67 s | 1.50 s | 2.0 s | 1 + sting | none | 120 BPM, 10 beats |
| **PL-10** | Social teaser, single-feature micro-demo, story ad | Balanced | Music | 5 | 2.00 s | 1.50 s | 3.0 s | 2 + sting | none | 120 BPM, 5 bars |
| **PL-15** | 9:16 performance ad, one transaction | Playful collage or fast startup; T3 / T12 | Narrative; sync at section turns and on the click | 9 | 1.67 s | 1.50 s | 2.5 s | 2 + sting | none | 120 BPM, 7.5 bars |
| **PL-30** | AI-feature or integration spot, co-brand launch | Minimal Premium, prompt-native; T4 | Feature-led, then music-led from 42 % | 12 | 2.50 s | 2.00 s | 5.0 s | 3 | 3.5 s | 120 BPM, 15 bars |
| **PL-45** | Launch reel, asset library, multi-feature launch | Fast startup; T8 / T2 | Music, plus SFX on motion peaks | 22 | 2.05 s | 1.75 s | 6.0 s | 4 | 5.0 s | 120 BPM, 22.5 bars |
| **PL-60** | B2B platform launch film | Fast startup "claim / proof"; T2 | Beat-locked; copy decides the order | 28 | 2.14 s | 1.50 s | 5.0 s | 6 | breakdown 19.5-36.5 s | 120 BPM, 30 bars |
| **PL-90E** | VO explainer, platform overview, onboarding film | VO explainer; T9 | VO sentences; bed flat | 32 | 2.81 s | 2.50 s | 6.0 s | 6 | 9.0 s | VO-led |
| **PL-90L** | Flagship launch film | Calm-Tech; T1 "say → see" | Speech-led, then music-led from 52 % | 40 | 2.25 s | 2.00 s | 5.5 s | 7 | 9.0 s | 120 BPM, 45 bars |

All eight sit inside the reference bands: ASL 1.67-2.81 s (references 1.58-3.00 s), median 0.70-0.90 × ASL (references 0.71-0.98), first change by f3, a still lockup of at least 1.5 s, and the last hero at 82-91 % of runtime in films of 30 s or more. In films of 15 s or less the logo sting is the last hero (60-87 %) [derived from the rhythm checks below].

### 17.6 Duration principles by class

*Source: P08 `master/08-editing-rhythm-durations.md`*

**Universal (DU-U), measured in 3 or more references**
1. **DU-U1 · Durations follow the job.** Recognise 0.33-1.0 s, read 0.9-2.3 s, follow 1.8-6.3 s, register ≥ 1.5 s still (§17.0).
2. **DU-U2 · Read and follow tokens are minimums;** lengthen to the next beat, never shorten to it (DU-R5).
3. **DU-U3 · Over the last 3 proof blocks, each is 10-40 % shorter than the one before, and no block grows** (kivi 14.75 → 11.03 → 6.69 s, −25 % and −39 % [V:1-6l8S §3]; PL-45 9 → 8 → 7 s, PL-60 9 → 8 → 7 s, PL-90L 10 → 9 → 7.5 s). A single use case counts as one block; its shots do not grow. Moves *inside* one tour may hold equal (Lottieicon tour moves 32 → 32 → 22 → 17 f, 0 %, −31 %, −23 % [V:1ccYWJ §5 Study I]).
4. **DU-U4 · The longest shot is a proof, tour or hero visual** (7/8) (DU-R4).
5. **DU-U5 · The final lockup holds ≥ 1.5 s still, 2.2 s for premium** (§15.6).
6. **DU-U6 · No text event under 25 f except punch cards in a rhythmic run** (ER-16; Part 07 punch tier).

**Style-specific (DU-S)**

| Style | Duration signature | Evidence |
|---|---|---|
| Calm-Tech | Cards 1.2-1.9 s; input cards 4.2-6.3 s; outputs 2.6-3.3 s; three-stage end of about 6.7 s (wordmark 1.2 s → symbol 3.3 s → URL 2.25 s) | [V:1-6l8S rules 11, 13] |
| Prompt-native | Two continuous takes of 3.7-8.2 s; cards 1.1-2.2 s; lockup 2.7 s with a 2.2 s still | [V:1CSXtQ §11] |
| Brand-bookended montage | Montage inserts 0.23-1.3 s with an anchor; demo shots 1.3-3.7 s; brand frames ≥ 1.0 s still | [V:15VhHR §Editing Rhythm] |
| Claim / proof launch | Claims 0.9-2.0 s; proof 2-6.3 s; lockup 5.7 s with QR | [V:19NRDv rules 4, 15] |
| Dark neon reel | Punch cards 10-12 f; hero tour about 6 s at 60-75 % of runtime; CTA 5.2 s | [V:1ccYWJ rules 11, 14] |
| Editorial explainer | Bursts of 1.5-2.5 s, one hero hold of 4-5 s (13 % of runtime) | [V:1Hcg3X rule 7] |
| Monochrome brand system | Kinetic sentences of about 1 s; breather ≈13 % of runtime (inside ER-U11's 10-15 %) | [V:1i2L14 rules 6, 14] |
| Playful collage | Phrases ≥ 0.7 s still; UI shots ≥ 1.8 s; payoff 1.0 s still | [V:126cpH rules 14-15] |
| VO explainer | One caption cue per shot, 2.0-3.5 s; an idea every 7-14 s | [S:playbook] |

**Experimental (DU-X): validate before using as a default**
1. **Continuous takes over 6.3 s.** Only HubSpot does it (8.23 s, an event every ≈0.9 s) [V:1CSXtQ].
2. **Un-anchored shots under 0.5 s.** Only with a continuing motion vector or as a single flash [V:1i2L14 t=20.33-20.53s] [V:1Hcg3X].
3. **The 5 s and 10 s plans.** No reference covers them [inferred].
4. **A three-stage end of 6.7 s** (wordmark → symbol → URL) [V:1-6l8S]. It suits a brand with a separate symbol; it is too long for a cutdown.

**Avoid (DU-A)**

| Avoid | Observed | Fix |
|---|---|---|
| Payoffs or results readable for under 1.0 s | Solar 0.4 s; Chowdeck 2 f [V:1Hcg3X] [V:126cpH] | SD-17: ≥ 1.0 s still |
| A lockup still under 1.5 s, or no lockup | NOSTRA ≈0.8 s; Lottieicon and Solar none [V:1i2L14] [V:1ccYWJ] [V:1Hcg3X] | SD-20 |
| Uniform 2.5-3 s shots | None of the references [inferred] | Token mix with a skewed distribution |
| Holds over 5 s with no internal beat | Bumper 6.3 s network [V:19NRDv] | SD-10 beats every 0.8-1.5 s |
| A typed line cut before 0.6 s of rest | — | SD-07 post-hold ≥ 18 f [V:1CSXtQ] |
| A montage with no readable claim | Wix's anchored ice montage reads "semantically vague" [V:15VhHR avoid] | Give each montage one readable claim or UI label |
| An un-anchored montage below 0.8 s | — [inferred from ER-05] | Lock an anchor at identical screen coordinates |
| Shortening a read hold to land a beat | — [inferred] | DU-R5 |
| Trimming every shot to make a cutdown | — [inferred] | §17.5 rule 1 |

**Especially good for SaaS (DU-SaaS)**
1. **The UI action formula** (§17.2 C), with the result handed to the next shot through a shared-element morph when the shot must stay under 2 s [V:126cpH].
2. **One continuous take per film** as the "real product" proof (SD-10) [V:1CSXtQ] [V:1ccYWJ] [V:19NRDv].
3. **Shrinking demo blocks** once the viewer has learned the grammar (DU-U3).
4. **A counter that parks ≥ 1.0 s on its final value** (§17.2 D) [V:19NRDv rule 8].
5. **A QR lockup of ≥ 4 s** for event and keynote films [V:19NRDv rule 15].

### 17.8 Duration QC gate (run on the storyboard, then on the locked cut)

*Source: P08 `master/08-editing-rhythm-durations.md`*

1. Every shot has a token, and its length sits inside the token's range, or the storyboard says why.
2. Every read or follow shot passes its §17.2 formula with the real copy and the real UI.
3. No text event under 25 f except SD-03 punch cards in a run of 3 or more.
4. Every payoff, result and status is fully still for ≥ 1.0 s; every typed line rests ≥ 0.6 s.
5. The longest shot is a proof, tour or hero visual; long takes have a beat every ≤ 1.5 s.
6. Over the last three proof blocks before the climax, each is 10-40 % shorter than the one before and none grows (DU-U3); early blocks may grow while the grammar is taught, as in kivi. A single use case counts as one block; its shots do not grow.
7. Stage windows match the plan within ±1 beat; the hook is 1.2-2.4 s; the product is shown by 8 s.
8. The lockup is still for ≥ 1.5 s (2.2 s premium, ≥ 4 s with a QR) and the music resolves on it.
9. Shot count, ASL and median match the plan's rhythm check within ±10 %.
10. AI footage was generated with 1.5-2 s of handles, and no SD-10 take is longer than its source clip minus the handles.
11. For cutdowns: whole blocks removed, ASL within ±10 % of the hero film's.


---

## 9. Sound

### 0.3 Defaults card: the sound numbers to encode first

*Source: P09 `master/09-sound-design.md`*

| Parameter | Default | Range seen in references | Evidence |
|---|---|---|---|
| Integrated loudness (social, YouTube, X, web hero) | **−14 LUFS ±1** | −16.6 to −7.9 (both extremes flagged) | [N] + [V:19NRDv] [V:1CSXtQ] |
| Integrated loudness (VO-led landing-page or help-centre embed) | −16 LUFS [inferred compromise between AES77's music −16 to −14 and speech −18]; social and web uploads stay at −14 even when VO-led; −18 only for speech-dominant webinar or how-to content (§16.11.1) | — | [N] (AES77: speech or mixed −18, music −16 to −14) |
| True peak | **≤ −1 dBTP** | +1.6 dBTP fails [V:1i2L14] | [N] |
| Tempo | **100 BPM** (beat = 18 f, eighth = 9 f, bar = 2.4 s) | 83-127 | [V] |
| Locked-cut offset | **picture 0-2 f before the beat**; never after | 0-3 f | [V:19NRDv] [V:1-6l8S] [P] |
| Locked share (music-led modes) | ≥60% of hard cuts within ±2 f of the grid | 61-88% in locked films | [V:19NRDv] [V:1CSXtQ] |
| Gap before a hero hit | **70-350 ms at ≤ −35 dB, or ≥15 dB under the running bed** | 70 ms-0.5 s, −29 to −64 dB (kivi's pre-drop dropout is the shallow end, −29 dB) | [V:1CSXtQ] [V:1-6l8S] [V:126cpH] |
| Suck-out on a decisive click | ≥15 dB down on the press frame; cut ≈8 f later; hit ≈4 f after the result appears | −15 → −35 dB | [V:15VhHR t=12.2-12.6s] |
| Mid-film "silence" floor | −40 to −45 dB; digital silence only in the last 0.3 s | −41 to −45 dB | [V:1CSXtQ] [V:15VhHR] |
| Drop / groove-in | **on the first product moment**, 0-8 f after its cut | 7-11% RT (50-80 s films); 43% RT (30 s film) | [V:15VhHR] [V:19NRDv] [V:1-6l8S] [V:1CSXtQ] |
| Breakdown | Low-pass or −7 to −17 dB, 6-15% RT, under the densest reading | 6-21% RT | [V:19NRDv] [V:15VhHR] [V:1CSXtQ] [V:1-6l8S] |
| Hero hit level | **8-15 dB over the running bed** (50-100 ms RMS); one loudest moment per film | −2.6 to −8 dB peaks | [V:1ccYWJ] [V:1-6l8S] [V:1CSXtQ] |
| Hero hit spacing | ≥1.4 s | 1.4-1.6 s (camera tour) | [V:1ccYWJ] |
| UI click | On the **press frame (0 f)**; one per state change | 0-1 f | [V:126cpH] [V:1CSXtQ] |
| Keystrokes | 20-25 dB under the full music level; only in a quiet section | — | [V:1CSXtQ] |
| Whooshes | **0-2 per film**; peak on the fastest frame | 0-1 | [V] |
| Sounded transitions | 15-65% of transitions; never all | 17-64% | [V:1ccYWJ] [V:1CSXtQ] (computed) |
| SFX per beat | ≤1 (a ceiling inside a cluster, not the working density) | — | [N, unverified] |
| Riser | Crest 0-2 f before its hit | 1 s (logo), ≈4 s (UI build), 28 s (arrangement build) | [V:1-6l8S] [V:1CSXtQ] [V:19NRDv] |
| Music under VO | Ducked 10-12 dB (range 6-12); attack 30-80 ms; release 250-700 ms | no reference VO | [N] [E] (both unverified) |
| On-screen word vs its spoken onset | 0-2 f early; never late | — | [P] |
| Ending | Hit or swell on the lockup ±2 f; tail 1.2-2.2 s; music never absent while the CTA is animating | — | [V:1CSXtQ] [V:15VhHR]; failure [V:1ccYWJ] |
| Audio master | 48 kHz / 24-bit WAV + stems (music, VO, SFX, ambience); AAC ≥ 256 kb/s in the MP4 | refs delivered AAC 44.1-48 kHz stereo | [inferred]; [V:1CSXtQ] [S:Thomson Reuters] |

### 16.1 The sound stack: five layers and their jobs

*Source: P09 `master/09-sound-design.md`*

| Layer | Job | Level relative to the music bed | Frequency home | Evidence |
|---|---|---|---|---|
| **L0 Silence and floor** | Contrast; resets the ear before a hero hit | Floor −40 to −45 dB; designed gaps −29 to −64 dB | — | [V:1CSXtQ] [V:1-6l8S] [V:15VhHR] |
| **L1 Music bed** | Emotion, energy arc, the tempo grid | The reference: body −12 to −18 dB short-term | Full band | All 8 |
| **L2 Structural hits** (drops, impacts, sub booms, stings, riser crests) | Mark section boundaries and the hero beat | +8 to +15 dB over the bed at the hit | Sub (<100 Hz) + full band | [V:1-6l8S] [V:1CSXtQ] [V:1ccYWJ] [V:15VhHR] |
| **L3 Motion accents** (whooshes, swishes, pitch glides) | Weight for the one or two biggest moves | +3 to +6 dB in their band | >4 kHz (air), tonal | [V:1CSXtQ t=17.80s] (≈3 dB); [V:1ccYWJ t=23.54s] (+5-6 dB >4 kHz) |
| **L4 Interface sounds** (clicks, keystrokes, ticks, pings) | Prove the product is responding in real time | Keystrokes 20-25 dB under the full bed; clicks clear only inside a dip | 2-6 kHz [inferred] | [V:1CSXtQ] [V:126cpH] [V:15VhHR] |
| **L5 Voice and product audio** (VO, in-world dictation, generated output) | Proof and explanation | Music ducked 10-12 dB under it | 300-3400 Hz | [V:1-6l8S]; [N] [E] |

**Priority when layers collide** [inferred, consistent with every reference]: L5 voice > L2 hero hit > L4 interface > L3 accents > L1 bed. Never put an L2 hit under a spoken word; schedule hits in voice gaps. If an interface click and a whoosh fall on the same frame, keep the click.

**Frequency map (where each layer lives in the references)**

| Band | What lives there | Measured examples |
|---|---|---|
| 20-100 Hz | Sub booms, kick fundamentals | HubSpot impact 20-100 Hz [V:1CSXtQ t=0.00s]; Lottieicon booms with 80-100% of frame energy below 150 Hz [V:1ccYWJ]; Bumper 55-80% of all energy below 120 Hz [V:19NRDv] |
| 100-400 Hz | Bass body, warm pads, Foley thuds | HubSpot breakdown pad 100-330 Hz; riser low-mid swell 190-330 Hz [V:1CSXtQ] |
| 400-1000 Hz | Pads, tonal risers, groove centroid | Wix pad 700-800 Hz [V:15VhHR]; kivi riser ≈900 Hz [V:1-6l8S]; Bumper groove centroid 440-630 Hz [V:19NRDv] |
| 1-3 kHz | Plucks, vocal chops, riser harmonics | HubSpot plucks 1.8 kHz → 580 Hz, riser harmonics 1-1.8 kHz [V:1CSXtQ]; Wix vocal-chop glides 0.9-3 kHz [V:15VhHR] |
| 300-3400 Hz | Voice intelligibility band | 44% of NOSTRA's energy sits here [V:1i2L14] |
| 3-6 kHz | Interface chimes, sparkle, riser tops | kivi sparkle blips 4.4-5 kHz [V:1-6l8S]; HubSpot riser harmonics 3-5.4 kHz [V:1CSXtQ] |
| >4 kHz | Whoosh air, hi-hats | Lottieicon whoosh +5-6 dB above 4 kHz [V:1ccYWJ]; 27% of NOSTRA's energy at 4-8 kHz [V:1i2L14] |

**SD-M0 (layer separation).** Give each layer its own band so none of them needs level to be heard: clicks above 2 kHz, sub hits below 100 Hz plus a harmonic layer at 100-300 Hz for phones, voice in 300-3400 Hz, and carve 2-4 dB out of the bed at 1-4 kHz while a voice speaks [inferred].
*Why:* masking is frequency-specific. A click that shares the voice band must be loud to cut through; the same click above 2 kHz is clear at a low level.

### 16.9 Density limits

*Source: P09 `master/09-sound-design.md`*

### 16.9.1 What the references measure

| Ref | Runtime | Designed SFX (excluding music) | Per second | One sound every | Hero-class hits (≥ 8 dB over bed) | Designed gaps | Whooshes | Visual events per designed sound (computed) |
|---|---|---|---|---|---|---|---|---|
| HubSpot [V:1CSXtQ] | 30.0 s | 8 (impact, 2.10 hit, toggle click, send whoosh, 19.05 hit, 21.43 hit, lockup hit, sting) + a keystroke passage | 0.27 | 3.75 s | 4-5 | 4 | 1 | ≈2 (≈15 beats incl. seamless moves) |
| Lottieicon [V:1ccYWJ] | 44.3 s | 9 clear (8 subs, 1 whoosh) + 3 faint | 0.20 | 4.9 s | 8 | 0 | 1 | ≈3-4 (24 transitions plus in-shot events) |
| Wix [V:15VhHR] | 53.9 s | ≈6-7 (≈4 click accents, 12.6 hit, ≈13.7 transient) + suck-out + stab | 0.12 | ≈8 s | 2-3 | 3 (suck-out, two dips) | 0 | ≈10+ (one UI event every ≈0.5 s inside long shots) |
| Chowdeck [V:126cpH] | 18.0 s | 1 [inferred] | 0.06 | 18 s | 1 | 1 | 0 | ≈25 |
| kivi [V:1-6l8S] | 77.8 s | none isolatable (blips and ticks blended into the bed) | — | — | 1 measured (the −4 dB drop); the 18.37 and 71.10 punch-cuts land on onsets whose level over the bed was not measured [inferred hero-class] | 2 | 0 | — |
| Bumper, Solar, NOSTRA | — | none isolatable | — | — | Bumper: the kicks | 0 | 0 | — |

**Reading.** Even the most SFX-forward film in the set places a designed sound about every 4-5 s, and the visual event rate in these films is one every 0.5-1.5 s (Part 08 ER-U3). So sound marks at most one visual event in two, and usually one in four or fewer (computed). The amateur pattern, a sound on every visual event, is absent from all eight. [U]

### 16.9.2 Rules

**SD-D1. Average one designed SFX every 3-5 s in SFX-forward styles, and one every 8 s or more in music-led UI demos.** [U: 0.06-0.27 per second measured] Never more than one per beat (≈0.5-0.6 s), even inside a cluster [N, unverified]; the tightest measured cluster is Lottieicon's tour, four subs 1.45-1.5 s apart (≈2.7 beats) [V:1ccYWJ t=27.9-32.3s].
*Why:* each sound claims attention; past about one every 3 s they stop marking importance and become texture.

**SD-D2. Sound at most one visual event in two; aim for one in three.** [U, computed]
*Why:* sound is the hierarchy layer. If everything is sounded, nothing is emphasised.

**SD-D3. Hero-class hits (≥8 dB over the bed): at most one per 5 s of runtime averaged over the film, at least 1.4 s apart, and one loudest moment per film.** A single hero sequence may cluster them at the 1.4 s minimum (Lottieicon: 4 in 4.4 s) as long as the film average holds. [U: HubSpot 4-5 in 30 s; Lottieicon 8 in 44 s (the measured maximum, one per 5.5 s), closest 1.4 s apart; one loudest moment in 3/3 measurable films]

**SD-D4. Whooshes: 0-2 per film.** [U: 0-1 in every resolvable reference]

**SD-D5. Designed gaps: 2-4 per 30 s, never closer than about 2 s.** [U: HubSpot 4 in 30 s is the measured maximum; Wix 3 in 54 s]
*Why:* a gap only works when the ear has had time to re-adapt to the bed.

**SD-D6. Risers: at most 2 per film, plus one arrangement build.** [U: kivi 1, HubSpot 1, Bumper's 28 s build is arrangement]

**SD-D7. At most three non-music layers at any instant** (for example voice + one SFX + ambience), and never two unrelated transients on the same frame. [inferred] If a click and a whoosh collide, keep the click (§16.1 priority).

**SD-D8. Sounded transitions: 15-65% of all transitions, never all.** [U: Lottieicon 4 of 24 (17%) carry a designed SFX; HubSpot 7-9 of 14 (50-64%) coincide with a designed audio event (computed from the transition tables; §16.8.1)]

### 16.9.3 Sound budget by runtime

Computed from the densities above (0.2-0.27 designed sounds per second at the busiest) and the arc template (§16.4.2). The edit structure for each runtime is in Part 08 §17.4.

| Runtime | Music arc | Hero hits (incl. drop and lockup) | Designed gaps | Risers | Whooshes | UI clicks | Total designed SFX | Drop position | Tail after the lockup hit |
|---|---|---|---|---|---|---|---|---|---|
| 5 s (bumper / pre-roll) | One state + sting | 1 (lockup) | 0-1 | 0 | 0-1 | 0-1 | 1-2 | none; hook accent on f0 | 1.2-1.5 s |
| 10 s | Intro → groove → sting | 1-2 | 1 | 0-1 | 0-1 | 0-1 | 2-3 | 1.0-1.5 s (first product frame) | 1.2-1.5 s |
| 15 s (vertical ad) | Sparse → drop → sting | 2-3 | 1-2 | 0-1 | 0-1 | 1-2 | 3-4 | 1.5-3 s | 1.2-1.8 s |
| 30 s | Sparse → riser → drop → groove → breakdown → sting | 3-5 | 2-4 | 1 | 0-1 | 1-3 | 5-8 | 7-11% RT if it opens on brand type; 40-45% RT if it opens on an intimate typed setup | 1.2-2.2 s |
| 45 s | + breakdown under the densest reading | 4-7 | 3-5 | 1-2 | 1 | 2-4 | 7-11 | 7-11% RT | 1.5-2.2 s |
| 60 s | + build into the finale | 5-9 | 3-6 | 1-2 | 1-2 | 2-5 | 9-15 | 7-11% RT | 1.5-2.2 s |
| 90 s (launch film) | Two demo blocks, two breakdowns, one long build | 7-12 | 4-8 | 2 | 1-2 | 3-6 | 13-22 | 7-11% RT; a second lift at 55-67% RT | 1.5-2.2 s |

The 90 s row is extrapolated: the longest reference is 77.8 s (kivi), which switches to its eighth-note climax at 67% RT [V:1-6l8S]. [inferred] The 5, 10 and 15 s rows are also [inferred]: the shortest reference is Chowdeck (≈18 s, one designed sound, phone-mic audio) [V:126cpH], so they scale the 30 s densities down rather than reproduce a measured short film.

### 16.11.1 Delivery targets

*Source: P09 `master/09-sound-design.md`*

| Destination | Integrated | True peak | Loudness range (LRA) | Evidence |
|---|---|---|---|---|
| YouTube, X, LinkedIn, website hero, Product Hunt | **−14 LUFS ±1** | **≤ −1 dBTP** | 5-10 LU [inferred] | [N] (YouTube normalises to −14 since 2019 [unverified, secondary source]; AES77: music −16 to −14, ≤ −1 dBTP); best-mixed references −14.1 to −15.9 [V:19NRDv] [V:1CSXtQ] [V:15VhHR] |
| TikTok, Instagram Reels, Shorts | −14 LUFS (no official target; community norm) | ≤ −1 dBTP | 5-10 LU [inferred] | [N] |
| VO-led explainer as a landing-page or help-centre embed, tutorial with music | −16 LUFS [inferred compromise: AES77 puts music at −16 to −14 and speech or mixed content at −18]. A VO-led film uploaded to a social or web platform above stays at −14 | ≤ −1 dBTP | — | [N] (AES77) |
| Speech-dominant (webinar promo, how-to; little or no music) | −18 LUFS | ≤ −1 dBTP | — | [N] (AES77: speech) |

**This is the one loudness table for the whole system.** P11 §24.5 and QC-S, every guideline and the worked example cite it rather than restating other numbers.
| Broadcast TV | −23 LUFS (EBU R128) / −24 LKFS (ATSC A/85) | −1 / −2 dBTP | — | [inferred: general broadcast standards, not in the research sources] |

**Measured failures.** kivi −10.7 LUFS (platforms will turn it down about 3 dB) [V:1-6l8S]. NOSTRA −7.9 LUFS, true peak +1.6 dBTP, LRA 1.2 LU, about 5 dB of short-term range: over-limited and clipping [V:1i2L14]. Lottieicon −16.6 LUFS, quiet on phones [V:1ccYWJ]. Chowdeck's −16.3 is a phone-mic room capture and says nothing about its mix [V:126cpH].

**References win, and agree with the standard.** The two loudest references are flagged flaws by their own teardowns, and the three best-mixed sit within 2 dB of −14. This is the one place where a physical limit (platform normalisation) and the references say the same thing.

### 16.14 Universal principles (SD-U)

*Source: P09 `master/09-sound-design.md`*

Measured in 3 or more references, none contradicting.

1. **SD-U1 · Contrast beats density.** Hits are loud because the moment before them was quiet; impact comes from gaps and dips, not from level (§16.0, §16.5). [5/8 use designed gaps or dips; 3/3 measurable films spend one loudest moment on the hero beat] Why: platforms normalise integrated loudness, so only the difference between moments is left to design.
2. **SD-U2 · The type narrates, the music carries emotion, the product's sound carries proof.** No reference relies on a narrator; all eight work muted (§16.10). Why: most launch films are first seen muted, and a narrator duplicates the type.
3. **SD-U3 · Sync the structure in every film; sync the cuts only in music-led modes** (SD-B1). [8/8 sync drop, suck-out, hero hit, decisive click or lockup; 3/8 lock cuts]
4. **SD-U4 · Picture first: 0-2 f ahead of the beat or hit (≤3 f into a drop with a pre-gap); never more than 1 f behind (measured maximum 1.2 f, 40 ms)** (SD-B2). [Bumper, kivi, HubSpot; ITU-R BT.1359 [P]]
5. **SD-U5 · A gap of 70-350 ms at ≤ −35 dB (or ≥15 dB under the bed) before every hero hit; mid-film silence keeps a −40 to −45 dB floor** (SD-SI1, SD-SI3). [kivi, Chowdeck, Wix, HubSpot]
6. **SD-U6 · The drop lands on the first product moment, picture 0-3 f first** (SD-AR1, SD-AR2). [4/4 films with a drop]
7. **SD-U7 · Thin the bed under the densest reading: low-pass, pad-only or 7-17 dB down for 6-15% of the runtime** (SD-AR4). [4/8]
8. **SD-U8 · One tempo per film; energy changes by arrangement and brightness, not by tempo or level** (SD-T1, SD-T6, SD-AR5). [8/8 single tempo; Bumper and kivi builds]
   - **Default 100 BPM; 83-128 BPM for music-led product films** (references 83.4-127 BPM [V:1i2L14] [V:1-6l8S]).
   - **Exception, VO-led beds:** a felt pulse of 60-90 BPM, usually the half-time of 120-130 (Solar 64.6/129 [V:1Hcg3X]) (SD-S6).
   - **Exception, premium brand film and cinematic 3D:** 70-100 BPM, or free time with tempo-mapped hits (SD-S10) [inferred: no reference in this style].
   - **Exception, creator-led reels:** 110-128 BPM, default 120 (guideline 12) [inferred from the kit's theme ranges, clamped to this rule's ceiling].
   - Guidelines that name a tempo cite this rule and one of its exceptions.
9. **SD-U9 · Whooshes are rare (0-2 per film) and peak on the fastest frame** (F07). [0-1 in every resolvable reference]
10. **SD-U10 · Designed SFX are sparse: one every 3-5 s at most, on at most one visual event in two** (SD-D1, SD-D2). [0.06-0.27 per second measured]
11. **SD-U11 · Click on the press frame; one click per meaningful state change, never on hover or travel** (F01). [Chowdeck and HubSpot at 0-0.2 f; Wix's click accents only within ±3 f, and its decisive press gets a suck-out instead]
12. **SD-U12 · Hit or sting within ±2 f of the lockup; tail 1.2-2.2 s; music never stops while the CTA animates** (SD-AR7, SD-AR8). [HubSpot, Wix, kivi; Lottieicon is the failure]
13. **SD-U13 · Master −14 LUFS ±1, ≤ −1 dBTP; the two loudest references are flagged flaws** (SD-M1). [N + 3 best-mixed references at −14.1 to −15.9]
14. **SD-U14 · Warm-digital music with an organic element; no trailer percussion, no sung lyrics under copy** (SD-MU3, SD-MU4). [0/8 use trailer music; no intelligible lyric under text in any teardown, though Wix's vocal glides could be sung hooks [inferred]]
15. **SD-U15 · Measure sync against chance with a sub-band kick envelope, never trust a generic onset list** (SD-B3, SD-B4). [Bumper, HubSpot and three half-time errors]


---

## 10. Styles

### 11.1 Style selector

*Source: P10 `master/10-2d-3d-and-style-categories.md`*

**ST-U1 · Choose the style from the product's promise first, then check audience, assets and runtime.** [U]
This mapping follows the motion-to-promise principle in [S:playbook rule 12] and the art-direction rule in Part 02 §3.2, and is checked against what each reference sells.

| If the product's promise is… | Primary style | Why it fits | Second choice |
|---|---|---|---|
| Calm, human, "it just listens" (voice, assistants, wellness tech) | ST-A1 | Breathing motion, light as material, in-world voice as proof | ST-A3 |
| "AI inside the tool you already use" (connectors, copilots, LLM features) | ST-A2 | The film is a prompt; one depth beat explains the integration | ST-C1 |
| AI audio / model / API launch with a strong brand system | ST-A3 | Slow orb, light display type, the voice demo is the hero | ST-A1 |
| One flagship product with a single big reveal (platform launch, v2.0, hardware-adjacent) | ST-B | Long holds, depth, light, silence before the reveal | ST-D |
| Breadth of output (builders, creative tools, anything that makes things for users) | ST-C1 | Real UI + art-directed outputs + anchored continuity | ST-C3 |
| "How do I do X" (consideration, onboarding) | ST-C2 | One feature per film, real UI, narrated | ST-J |
| Many launches at once (conference, release week) | ST-C3 | ≈1 shot per second of real UI on the beat | ST-E2 |
| Physical or deep-tech product; infrastructure that needs volume and scale | ST-D | 3D carries volume and place | ST-B |
| "Unify / automate" (payments, ops, B2B platforms) | ST-E1 | Claim world vs proof world; many → one climax | ST-A2 |
| Asset libraries, kits, dev tools, creator tools | ST-E2 | The product is the motion; dark neon energy | ST-C3 |
| Explaining an invisible mechanism (data flow, security, AI pipelines, energy) | ST-F1 | One hero per frame, labels in negative space, expo envelope | ST-J |
| Agency, service or brand-system promo; LinkedIn ads | ST-F2 | Shape chains and three-word lines in one hue | ST-G |
| Founder story, opinion, thought leadership | ST-F3 | Editorial overlays on real speech | ST-H |
| Warm consumer app (delivery, fintech for consumers), performance social | ST-G | Pops, gravity, dialect, chapter colours | ST-E2 |
| Proof from a real customer | ST-H | Borrowed credibility; real voices | ST-F3 |
| Playful brand with a mascot | ST-I | Characters carry the product's personality | ST-G |

**Hard constraints that override the promise:**
- **No real UI available** → avoid ST-C1/C2/C3/A2; use ST-F1, ST-F2, ST-E1 claim cards with abstract proof, or ST-A3 [inferred].
- **Sound-off feed placement** → styles whose story is carried by on-screen type (ST-A1, A2, E1, E2, F2, G) [S:playbook rule 11]; not ST-H or narrated ST-C2 without captions.
- **Runtime ≤15 s** → see §11.6; ST-B, ST-C2 and ST-H do not compress well.
- **9:16 primary** → ST-G was the only measured vertical style; others are 16:9 masters adapted to 9:16 [V:126cpH]; [E] (verticals are adaptations).

### 11.7 Style tokens for the prompt system

*Source: P10 `master/10-2d-3d-and-style-categories.md`*

Use one block per film. Every value is a number or a named token from Parts 03-09; nothing is an adjective.

```yaml
style_token:            # example: ST-E1, filled from its card
  id: ST-E1
  canvas: { claim: "#06004E", proof: "#F4F4FC", accent: "#F4643C", glow: "coral top-right, violet floor" }
  dimensional_level: { claim: D0, proof: D2-D4, three_d_share: 0.5 }
  ease: { arrive: E-SNAP, travel: E-GLIDE, exit: E-EXIT, whip: E-WHIP }
  overshoot: 0
  motion_blur: { two_d: "off <=5%W/f", three_d: "180deg" }
  cadence: ones
  camera: { hold: "drift 2%W/s", beat_every_s: [0.8, 1.5], orbit: "stepped 10f / 1.25s", roll_deg: 0 }
  transitions: [TR-02 beat cut, TR-18 world flip, TR-10 chevron mask (once), TR-12 push-through]
  type: { family: "geometric grotesk", hero_cap_px_1080: [160, 355], line_cap_pct_h: [4.5, 5.5], max_words: 6, hold_s: [0.6, 1.6] }
  music: { bpm: 100, intro: "sub kick every 1.2 s", groove_in: "before first big graphic move", breakdown: "low-pass under densest UI", cut_offset_frames: [-2, 0] }
  rhythm: { asl_s: 2.5, claim_s: [1, 2], proof_s: [2, 6] }
  runtime_s: 60
  avoid: [overshoot, "text on planes >15deg", "1f dip to black", "bloom > 3% cap"]
```

For each style, fill the same fields from its card in §11.2-11.3. Validation rules a checker can enforce [inferred]:
- `overshoot` must be 0 for type and UI in every style except ST-G and ST-I props.
- `three_d_share` must not exceed the style's budget in §13.2.
- `asl_s` must be within ±25% of the style's measured ASL.
- `max_words` × 0.33 s + 0.4 s ≤ the shortest text hold (reading-time rule [N]).


---

## 11. Anti-AI look and QC

### 21.1 The master rule: generate only what is allowed to vary; compose everything that must not

*Source: P11 `master/11-quality-anti-ai-qc-export.md`*

**AA-U1 · Generate atmosphere, compose meaning.** [U (refs + standard)]
- **Rule.** A video model may produce only layers whose exact content does not matter: atmospheric plates, abstract light, textures, defocused lifestyle backgrounds, non-hero b-roll. Everything the viewer must read, recognise or trust is a deterministic layer: UI, type, numbers, logos, product geometry, cursor, charts, and the face or voice of any real person.
- **Evidence.**
  - All eight references composite their UI and type as crisp 2D or vector layers. Not one lets a renderer improvise readable content.
  - The one reference with apparently generated plates uses them only as heavily defocused, static or near-static backgrounds behind sharp glass UI, and they never carry text [V:1-6l8S]. Even there, the teardown flags mismatched styles and mushy faces.
  - Veo adds gibberish subtitles when a prompt implies dialogue [P]. "Generative video cannot set exact typography" [N §6].
  - Real people's testimonials "must not be faked with synthetic VO or AI likenesses" [S:Thomson Reuters]; never TTS a customer's words [S:playbook].
- **Why it works.** Variation is the one thing a generative model does well and the one thing a product shot cannot afford. Splitting the frame by "may vary / must not vary" uses each tool where it is strong.

**Layer allocation table**

| Layer | Generate? | How to make it | Rule |
|---|---|---|---|
| Atmospheric plate (sky, gradient field, abstract light, texture) | Yes | Video model or shader; locked-off or one slow move; defocus allowed | AA-G1-G6 |
| Lifestyle background behind UI | Yes, with care | Video model; heavy defocus; no faces in focus; same style and light in every plate | AA-06, AA-09, AA-23 |
| Hero product object (hardware, packaging) | Only from a real 3D model or real photography | Render or composite; never let a model redraw it | HS-07, AA-07 |
| Product UI, dashboards, charts | **No** | Real screenshots (≥1.5× output width) or vector rebuilds from the design system | UI-R5, [S:playbook] |
| Type, captions, numbers, URLs | **No** | Deterministic text layers from a string table | TY-U21, CD-T9 |
| Logo and wordmark | **No** | Official SVG; never retyped in a font | TY-W3, [E] |
| Cursor, highlights, selection boxes | **No** | One shared component | UI-C |
| Particles, light streaks | Rarely | Built from the product's own colours/shapes in compositing | AA-12 |
| Real people (customers, founders) | **No** | Real footage with releases, or a quote card | AA-23, [S] |
| Audio | **No** (generated clip audio) | Mute generated audio; rebuild from the cue sheet | SD-AI1, SD-A14 |

### 21.4 The anti-AI-look checklist (Phase 10, one page)

*Source: P11 `master/11-quality-anti-ai-qc-export.md`*

Run this on every shot before it enters the edit, and on the locked cut. Each row maps to a card above.

| # | Problem | Pass condition (measurable) | Quick test | Pipeline most at risk | Card |
|---|---|---|---|---|---|
| 1 | Morphing objects | Every frame of a shape change is a designed shape; generated morphs: 0 | Step at 1 f | Generative | AA-01 |
| 2 | Warped UI | Edges straight within 1 px; one radius token; one transform per plane | Straight-edge overlay | Generative | AA-02 |
| 3 | Changing text | 100% string match across shots and formats; 0 generated glyphs | String diff; 1:1 crop | Both | AA-05 |
| 4 | Inconsistent geometry | Counts match the continuity sheet; anchors ±1 px | Count; onion-skin | Both | AA-03 |
| 5 | Random camera motion | One named move per shot; roll 0°; one direction | Track a background point | Generative | AA-14 |
| 6 | Purposeless floating objects | Every move has an actor; ≤3 anchored floats per frame | "Who moved it?" per element | Both | AA-15 |
| 7 | Over-animation | 1 primary + ≤2 secondary motions; ≤0.2% W/f while reading | Freeze every 0.5 s | Template | AA-16 |
| 8 | Wrong reflections | Sheens follow the key light; reflections show only what exists | Freeze on each reflection | Generative | AA-10 |
| 9 | Lighting changes | Shadows within ±15° of the declared key; no unmotivated luma jump >5 levels | Shadow vectors on first frames | Generative | AA-09 |
| 10 | Broken perspective | One vanishing point per plane set; no intersections; read tilt ≤15° | Converging-line overlay | Both | AA-04 |
| 11 | Fake depth | Three named planes; read text sharp; blur consistent with distance | Part 04 §20.8 | Both | AA-11 |
| 12 | Excess particles and glow | Particle events ≤1 per film, made of the product; glow on emitters only, ≤2-3% of cap height | Count; 1:1 crop of brightest word | Both | AA-12 |
| 13 | Unnecessary transitions | Every transition has an ID, role and cause; within budget | Part 05 §7.15 | Template | AA-18 |
| 14 | Identity drift | Brand patches ΔE00 ≤2; same cursor, icon set, font, plate style | Side-by-side contact sheet | Generative | AA-06 |
| 15 | Inconsistent product design | Real states, real order, real labels; source ≥ zoom × delivery | Product-owner frame list | Both | AA-07 |
| 16 | Texture boil and flicker | Static regions ≤1 level/frame (≤0.2 on flat fields) unless grain is declared | Frame-difference on a static region | Generative | AA-13 |
| 17 | Weightless motion | No constant-speed start/stop on screen; 0% overshoot on type/UI | Displacement plot | Template | AA-17 |
| 18 | Cadence errors | 0 duplicated frames in moves; blur above 5% W/f | Frame-difference scan | Both | AA-19 |
| 19 | Clip seams and loops | First/last 15 f of every generated shot clean; loops desynchronised | Step the edges | Generative | AA-20 |
| 20 | Continuity breaks | Anchors ±1 px across cuts; strings and states continuous | Onion-skin each cut | Both | AA-21 |
| 21 | Audio mismatch | Generated audio muted; cue-sheet sound; music to the last frame | Part 09 §16.20 | Both | AA-22 |
| 22 | Human figures | No generated face in focus; every person and voice released | 1:1 freeze; rights sheet | Generative | AA-23 |
| 23 | Placeholder content | No lorem, duplicates or unapproved numbers | Search and read | Both | AA-08 |
| 24 | Template sameness | Same reveal ≤6×; ≤3 same cards in a row; ≥3 semantic animations | Sort shot list by treatment | Template | AA-24 |
| 25 | Compression artefacts | No visible banding or blocking at 1:1 on the final encode | 1:1 crop after a test upload | Both | AA-25 |

### 21.4b Premium vs amateur read, with timing, for the 15 Phase-10 problems

Added in audit. "Premium" is what the references measurably do; "Amateur" is the failure as the teardowns or §21.3 describe it. Timings are from the cited references; anything else is marked.

| Problem | When it bites | Premium read (measured) | Amateur read | How fast |
|---|---|---|---|---|
| Morphing (AA-01) | Any A→B shape change | Declared vector interpolation, or a one-pose swap then a physical reaction [V:1-6l8S t=9.50-9.93s] [V:126cpH t=6.70-7.73s] | Melting in-betweens that are no designed shape | Interpolation 7-13 f; swap 0 f + fall 14 f |
| Warped UI (AA-02) | Perspective or camera moves on UI | One planar transform per UI plane [V:19NRDv t=16.77-18.30s] | Bowing edges, crawling hairlines | Read tilt ≤15° (UI-D6) |
| Changing text (AA-05) | Cut-ins, reformats, localisation | Identical strings across cuts | "make" → "create" across a cut-in [V:15VhHR t=6.57s] | 0 f tolerance: 100% match |
| Inconsistent geometry (AA-03) | Recurring objects and counts | Bar locked across 6 shots [V:15VhHR t=8.63-12.47s] | Duplicated card [V:1ccYWJ t=17.9-18.1s] | Anchors ±1 px @1080p [inferred tolerance] |
| Random camera (AA-14) | Holds and ambient life | One-axis drift toward a target, ≈0.03-0.5% of frame per frame (§21.9 #6) | Multi-axis wander, roll, handheld | Pushes 1.07-1.29× over 0.5-2.5 s [V:1-6l8S rule 5] |
| Floating objects (AA-15) | UI showcases | Every move has an actor; idle bob only on 1-2 anchored tiles, ≈0.5 px/f [V:1i2L14 t=29.5-30.6s] | Screens drifting with no cause | — |
| Over-animation (AA-16) | Dense demos | Serial events, ≈1 per 0.7-0.85 s [V:126cpH] [V:1i2L14]; breather 10-15% of runtime at <10% energy [V:1i2L14 rule 14] [V:1-6l8S §12] | Everything moving at once | Real UI responses 100-200 ms inside a slow camera [V:1CSXtQ] |
| Wrong reflections (AA-10) | Glass, gloss, chrome | Reflective materials once per film, sheen along the key light [V:15VhHR] [V:19NRDv] [V:1i2L14] | Sheens sweeping in different directions | B-logo sheen sweep 14 f, after the 5 f stroke and 8 f fill [V:19NRDv shot 4, t≈4.1s] |
| Lighting changes (AA-09) | Multi-plate and illustrated films | One light direction declared | Solar's right-falling vs down-left shadows [V:1Hcg3X rule 11] | Shadow vectors within ±15° [inferred] |
| Broken perspective (AA-04) | 3D UI stages | Consistent tilt and DOF [V:19NRDv t=16.77-18.55s] | Plane intersection seam sliding x 229 → 484 px for ≈0.6 s [V:1CSXtQ t=18.4-19.0s] | — |
| Fake depth (AA-11) | "Cinematic" requests | Depth spent on one 3.7 s hero beat [V:1CSXtQ t=17.8-21.47s], or from shadows only [V:1Hcg3X] | DOF on every shot | Dolly ×2.3 in ≈15 f through bokeh [V:1CSXtQ t=19.95-20.47s] |
| Excess glow/particles (AA-12) | Tech and AI products | Glow ≈1-2% of frame on emitters only [V:1Hcg3X rule 10]; particles once [§21.9 #2] | Bloom smearing letters for 3-4 f [V:19NRDv t=7.20s] | Climax burst ≈12 sparks over 10 f [V:19NRDv t=55.27-55.60s] |
| Unnecessary transitions (AA-18) | Every cut | Hard cut default; effect transition ≤1 (a 3 + 2 f flash) [V:1Hcg3X t=12.83s] | Plug-in glitch/luma/spin packs (0/8 refs) | Glitch decode once, ≈10 f [V:19NRDv t=1.17-1.50s]; 23-26 f reads amateur [V:1i2L14 t=16.63-17.50s] |
| Identity drift (AA-06) | Generated or multi-source plates | One accent, one cursor, one sans per film [V:19NRDv] [V:15VhHR] [V:1ccYWJ] | Three plate styles in one film [V:1-6l8S] | ΔE00 ≤2 per token [inferred] |
| Inconsistent product (AA-07) | Hero UI shots | Real states in real order [V:126cpH t=9.27-13.60s] | Greeked low-res window in the 3D hero [V:1CSXtQ t=18.4-19.0s] | Statuses held ≥1.0 s; "Order delivered" shown for 2 f is flagged too short [V:126cpH t=13.5s] |

### 22.1 The Phase-18 QC gate

*Source: P11 `master/11-quality-anti-ai-qc-export.md`*

The prompt system (Master Phases 14-18) ends in this gate. It is a list of yes/no questions. Every "no" either gets fixed or gets a written exception signed by the owner. **Pass A** (G-01 to G-39) runs on the production package before any pixel is made. **Pass B** (G-40 to G-45) runs on the outputs.

### A. Brief, claims and rights (Phase-14 answers)

| # | Question | Pass condition | Source |
|---|---|---|---|
| G-01 | Are the Phase-14 answers complete? | Product, audience, the film's one job (awareness, consideration, performance, launch, onboarding), runtime, aspect ratios, platforms, brand assets (logo SVG, fonts, palette hex, UI screenshots or design files), VO yes/no, music source, deadline. Every must-know item (product, features, every fact that appears on screen, and the logo SVG when a lockup is planned) is supplied; every other item is either answered or listed as a stated default in the package's Assumptions block (SKILL Phase 14). | [S:playbook]; Part 01 |
| G-02 | Is every claim, number, offer, price and quote supplied by the user, with a source? | 100%. Nothing invented. | Part 01 §2.16 #10; [S:playbook] |
| G-03 | Is every real person seen or heard backed by a release, with no synthetic customers, faces or voices? | 100% | AA-23; [S:Thomson Reuters] |
| G-04 | Are all rights cleared for each destination? | Music licensed for the platform (business accounts on TikTok and Instagram may use only the platforms' commercial libraries); SFX CC0 or royalty-free; fonts licensed for video; logos and app icons supplied by their owners; stock licensed; the render engine licensed for the organisation size (Remotion's free tier covers individuals and very small companies; larger organisations need a company licence [inferred: licence terms not in the sources; [N] covers only its template-rendering use cases]) | [N]; [S:playbook] |
| G-05 | Does the CTA match the funnel stage, and is button text ≤16 characters and 1-3 words? | Yes | [S:playbook] |
| G-06 | Is the film free of another real brand's UI, logo or identity, unless that brand is a named partner who supplied the assets? | Yes | [S:Airbnb]; [W:raivcoo] spec ads |

### B. Story and structure

| # | Question | Pass condition | Source |
|---|---|---|---|
| G-07 | Does the package pass the Story QC gate? | All 10 lines of Part 01 §2.16 | Part 01 |
| G-08 | Is the hook on frame 0, with the first change by f3 and the key message within 3 s? | f0 / ≤f3 / ≤3 s | [N]; [V:126cpH] flaw (0.73 s) |
| G-09 | Is the product shown or named early enough? | ≤8 s in type-led films (reference median 2.2 s); ≤10 s in VO-led explainers | Part 01 §2.17 |
| G-10 | Do the shot lengths, in whole frames, sum exactly to the runtime (minus transition overlaps in template engines)? | Exact | P08 §15.18 #13; [N] |
| G-11 | Does the ending work? | Still logo hold ≥1.5 s (2.2 s premium); CTA on screen; last musical event on the lockup ±2 f; music runs to the last frame | Part 08; Part 09; [V:1ccYWJ] [V:1-6l8S] [V:1Hcg3X] flaws |
| G-12 | Is there breathing room and no text-card fatigue? | One breather in films ≥30 s: 10-15% of runtime at low motion (≤1/10 of the peaks), or a 6-15% music breakdown under the densest reading (P08 ER-U11); ≤3 same-treatment text cards in a row | [V:1i2L14] (13%); [V:1-6l8S §12] (11%); P08 §15.18 #6-7 |

### C. Style and continuity bible (Phase 17)

| # | Question | Pass condition | Source |
|---|---|---|---|
| G-13 | Is one style category declared with its numbers? | ASL band, ease family, blur rule, grain rule, depth recipe, overshoot policy, music mode | Part 10; Parts 03, 04, 08, 09 |
| G-14 | Does the continuity bible define every identity token? | Palette hex with one meaning per colour; type families, weights and size tokens; UI kit (radius, stroke, shadow, glass); cursor; icon set; logo SVG and clear space; key-light direction and colour temperature; lens feel; grade; grain or dither level; depth recipe; motion tokens; SFX families | AA-06; AD-U6; DP-20 |
| G-15 | Is there a string table and a data sheet? | Every visible string has an ID; spelling, grammar, number format and language are fixed per version; UI values are unique and realistic | AA-05, AA-08; [V:15VhHR] [V:1ccYWJ] flaws |
| G-16 | Is every UI flow a state machine in the product's real order, with real labels? | Yes | UI-B2; [S:playbook] |
| G-17 | Are anchors declared? | Which element stays locked across which cuts, with its coordinates (±1 px @1080p) | AA-21; [V:15VhHR rule 6] |
| G-18 | Is every signature device listed with its trigger rule? | e.g. "black-and-white → colour bloom whenever a voice starts, in every scene" | [V:1-6l8S §16] |
| G-19 | Is the frame rate decided, and are all sources at that rate? | 30 fps native for motion graphics; 24 fps if generated footage dominates; no mixed 25/29.97/30 sources without a plan | AA-19; Part 03 §18.12 |

### D. Per-shot spec and prompt completeness (Phase 16)

| # | Question | Pass condition | Source |
|---|---|---|---|
| G-20 | Does every shot spec fill every field? | Aspect; resolution; fps; duration in frames; composition in % coordinates; product placement; angle; lens feel; camera (CM- ID, start and end framing, duration, ease token, peak % W/f, roll 0°); foreground / midground / background; lighting (key direction, colour temperature); materials; UI (state IDs); typography (string IDs, size tokens); timing (event list in frames); object movement (ease tokens); transitions in and out (TR- IDs); motion blur (on/off, shutter); DOF (focal plane); continuity references; palette tokens; sound cue (family, frame, anchor, level); must-stay-unchanged list; negatives | Master Phase 16 |
| G-21 | Is the package free of vague words? | 0 words from the banned list below, unless followed by the measurable parameters that replace them | Phase-16 brief; Part 03 §L.3; Part 09 SD-AI4 |
| G-22 | Does every generation prompt follow the model's order and carry the continuity block and negatives? | Cinematography → Subject → Action → Context → Style; continuity block verbatim; negative noun list | [P]; AA-G3, AA-G4 |
| G-23 | Does every generated shot have exactly one camera move and a generation length 1.5-2 s longer than its edit length? | Yes | AA-G1, AA-G2; ER-24 |
| G-24 | Does every transition have a TR- ID, a role and a cause, within the film's budget? | Yes | Part 05 §7.5, §7.15 |
| G-25 | Are all motion values tokens? | Every ease and duration is a token ID; no free-typed curve or spring | AA-T3, AA-T4 |
| G-26 | Does every text event meet its hold? | Its Part 07 tier and the read-time rule; payoffs and statuses ≥1.0 s; no text event under 25 f (except SD-03 punch cards in a rhythmic run) | Part 07 §9.11; P08 §15.18 #10 and §17.8 #3-4; [N] |
| G-27 | Does every format meet the size and safe-area floors? | Must-read cap ≥3% H at 16:9 (≥84 px for phone-bound sentences); ≥52 px body at 9:16; 16:9 text inside x 96-1824, y 54-1026; 9:16 meaning inside x 120-840, y 270-1210 | Part 07 §9.21; [N] |

**The banned vague words, and what to write instead (G-21).** These words are allowed only if the measurable parameters follow them in the same line.

| Vague | Write instead (example) | Rule |
|---|---|---|
| "make it cinematic" | "One CM-02 push-in 1.00 → 1.10 over 60 f, E-LINEAR (no visible start or stop); key light from upper right, ≈4300 K; far plane blurred ≈12 px @1080p; foreground plane moves 1.5× the focal plane; 0° roll" | Part 04 CM-02; Part 03 §L.3; DP- |
| "premium", "expensive", "high-end", "sleek" | "Palette #0C0A09 / #F5F5F5 + one accent #F4643C on the benefit word only; ≈85% empty canvas; Regular 400 sans; 0% overshoot; text entrances and exits per SP-T0 (statements 8-14 f E-OUT, exits 4-6 f E-EXIT)" | Parts 02, 03 §18.1 SP-T0, 07 |
| "dynamic", "energetic", "fast-paced" | "ASL 1.6-2.0 s; one visual event per ≈0.7 s; music-led cuts 0-2 f before the quarter beat at 100 BPM" | Part 08 |
| "smooth" | "E-INOUT over 21 f, peak 3% W/f, no motion blur (below 5% W/f)" | Part 03 |
| "modern", "clean", "minimal" | "2 colours + 1 accent; 1 type family; 1 radius token (24 px); depth from focus only" | Parts 02, 06 |
| "make it pop", "punchy" | "Scale +18% over the last 3 f (per-frame growth ×1.5-2) into a hard cut on a music onset ±1 f" | Part 03 #23 |
| "futuristic", "AI look", "hi-tech" | "Cyan → indigo gradient on AI-written words only, for 8-15 f, then settle to #1A1A1A" | AA-SaaS5 |
| "floating UI", "UI in 3D space" | "Card anchored to the prompt bar, 12 px contact shadow from upper right, enters on the send click, ≤3 cards per frame" | UI-B12 |
| "subtle" | "CM-02 push 1.00 → 1.05 over 2.0 s, E-LINEAR (CM-02 calm/minimal band +3-8 %)" or "drift 0.2% W/f on x only" | Part 03 #20; Part 04 CM-02 |
| "nice transition", "seamless" | "TR-05 match cut on the circle: outgoing ease-in 7 px/f, incoming 34 px/f ease-out, same direction, element within ±5% W" | Part 05 |
| "epic music", "cinematic sound design" | "100 BPM warm-digital, sparse kicks to 4.8 s, drop at f144; sub boom −6 dB on f34" | Part 09 SD-AI4 |
| "4K quality", "high quality" | "Master 3840×2160 ProRes 422 HQ; delivery 1920×1080 H.264 High, CRF 16, ≥12 Mb/s, yuv420p, BT.709 tagged" | §24 |
| "Apple-style", "Linear-style", "ElevenLabs-style" | The measured parameters of that style (Part 10 style rows), never the brand name alone | Part 10; [W:motion-so] "taste and rhythm, not copying" |

### E. Division of labour (anti-AI)

| # | Question | Pass condition | Source |
|---|---|---|---|
| G-28 | Is every layer allocated to "generate" or "compose" per §21.1? | 0 generated text, UI, logo, product or real people | AA-U1 |
| G-29 | Is every shape change either a declared two-shape interpolation or a one-frame swap? | Yes | AA-01 |
| G-30 | Are the effect budgets declared and within limits? | Particles ≤1 event per film; glow on emitters only; one depth hero beat (minimal styles); flash ≤1, ≤3 f | AA-11, AA-12; defaults #10-13 |
| G-31 | Is generated audio set to be muted, with the cue sheet derived from the event list? | Yes | AA-22; SD-AI1 |
| G-32 | Is a generation log template ready for every generated shot? | Model, tier, prompt, negative prompt, seed, references, duration, resolution, date | AA-G14 |

### F. Sound

| # | Question | Pass condition | Source |
|---|---|---|---|
| G-33 | Is the music chosen and edited before SFX are placed? | Mode and tempo chosen; edited to the runtime on bar lines; drop, gaps, breakdown and ending marked; licence confirmed | SD-AI2 |
| G-34 | Is every SFX anchored and within density limits? | Each cue on a press, fill, peak velocity, cut or lockup frame; ≤1 designed SFX per 3 s on average; whooshes ≤2; hero hits ≤1 per 5 s | Part 09 §16.9 |
| G-35 | If there is a VO, is it mixed and mirrored on screen? | Music ducked 10-12 dB; supers 0-2 f before the spoken onset; everything said is also on screen for muted viewers | Part 09; [S:Thomson Reuters] muted-autoplay rule; [P] |

### G. Formats, accessibility and delivery

| # | Question | Pass condition | Source |
|---|---|---|---|
| G-36 | Is there a format plan? | Master aspect plus cut-downs (9:16, 1:1, 4:5) re-laid out, not cropped; durations kept identical in ms; strings identical | §24.8; Part 03 §18.11 |
| G-37 | Does the film meet accessibility floors? | ≤3 flashes per second, flash frames ≤3 f, ≤1 flash moment; text contrast ≥4.5:1 (3:1 for large text), 7:1 over footage; data marks ≥3:1; a caption file for every spoken word; the point survives with sound off | [N] WCAG 2.3.1, 1.4.3, 1.4.11; [S:playbook] |
| G-38 | Is the export spec declared per destination? | §24.7 row chosen per file; loudness target per destination | §24 |
| G-39 | Are the QC owner, sign-off order and severity policy agreed? | Yes | §22.0, §22.5 |

### H. Pass B: outputs

| # | Question | Pass condition |
|---|---|---|
| G-40 | Did every generated take pass the §21.4 checklist, and is its generation log filed? | 25/25 rows |
| G-41 | Did every shot pass Gate 1 (§22.2) at final render settings? | 0 S1, 0 S2 |
| G-42 | Did the locked cut pass Gate 2 (§22.3), including the Part 05, 07, 08 and 09 gates? | 0 S1, 0 S2 |
| G-43 | Did every delivered file pass Gate 3 (§22.4), measured on the files actually uploaded? | All rows |
| G-44 | After a private test upload to each platform, do the 1:1 crops of the darkest gradient and the smallest read text still pass, and does the platform play it at the expected loudness? | Yes |
| G-45 | Can a fresh viewer, watching muted on a phone once, say what the product does, why it matters and what to do next? | Yes [inferred test, consistent with Part 01 §2.16 #1] |
