# MASTER SAAS MOTION DESIGN SYSTEM
# Part 01: Creative Direction Principles (Master §1) and Storytelling Framework (Master §2)

Scope: what a SaaS / product-launch / UI-motion film is *about*, how it should *feel*, and how its time is *spent*. This part covers concept, positioning, visual-language intent, tone, consistency, story stages and their durations, hooks, product reveals, proof blocks, climaxes, endings, CTAs and logo lockups. Shot-level craft (easing curves, camera library, typography specs, transitions, sound mix) belongs to later parts. It is referenced here only where it changes a story decision.

---

## 0. How to read and use this part

**Order of work for a designer, editor or AI video system**
1. Fill the Direction Card (§1.1).
2. Pick a concept archetype (§1.2) and set the positioning dial (§1.3).
3. Choose a story template (§2.4).
4. Time the stages with the runtime table (§2.3).
5. Pick a hook (§2.5), a reveal (§2.7), a climax (§2.10) and an ending (§2.11).
6. Write the beat sheet (§2.13).
7. Run the Story QC gate (§2.16) before any shot is generated or animated.

**Evidence tags**

| Tag | Source | What it can support |
|---|---|---|
| `[V:<id6> t=..s]` | Frame-level teardowns of the user's own 8 reference videos | Everything, including frame timing. This is the strongest evidence. |
| `[S:<brand>]` | Superside's 20 text-researched SaaS videos | Story, copy and structure. Most beat timings in that set were guessed by its researcher. Only Superspace, Thomson Reuters, Luminate and Nissan (caption tracks), Airtable (YouTube chapters) and Figma (cut rate) carry measured timing. |
| `[S:playbook]` | The audited playbook distilled from those 20 videos | Structure and copy patterns |
| `[E]` | ElevenLabs launch-film style brief | Durations, formats, CTA wording and brand rules are sourced. Almost all motion claims in it are inferred by its author. |
| `[N]` | Motion-numbers brief (design-system tokens, reading speed, attention data) | Generic numeric norms |
| `[P]` | Voice and footage pipeline brief (ElevenLabs, Veo, Flow) | Production constraints |
| `[W:motion.so]`, `[W:showreel.design]`, `[W:raivcoo]` | Inspiration-site catalogues, text only | Intent, naming and structure. Never frame timing. |
| `[inferred]` | My synthesis | Not directly observed or sourced |

**Conventions**
- "5/8" means 5 of the user's 8 references show the pattern.
- Frames are at 30 fps: 1 f = 33.3 ms, 30 f = 1 s.
- "FH" and "FW" mean frame height and frame width. Pixel values are for 1920×1080 ("1080p") unless "1920p" (1080×1920, 9:16) is stated.
- Positioning percentages are the per-video analysts' judgements, not measurements.

**The user's reference set**

| Tag | Film | Runtime, aspect | Style (analyst label) | Edit driver |
|---|---|---|---|---|
| `1-6l8S` | kivi voice-AI launch, "Everything. Powered by Your Voice." | 77.78 s, 16:9 | Minimal Premium SaaS × soft-cinematic UI demo ("Airy Aurora / Calm-Tech") | Speech-led first half, beat-cut back half at 127 BPM |
| `126cpH` | Chowdeck food-delivery app ad (TikTok capture of an After Effects comp) | 17.97 s (may be truncated), 9:16 | Playful illustrated collage + UI demo | Narrative. One deliberate sync point. |
| `15VhHR` | Wix AI site builder, "Build a website you ♥ love" | 53.87 s, 16:9 | UI-focused demo in an editorial brand frame | Feature/UI-led. Music syncs at section level. |
| `19NRDv` | Bumper PRO payments launch | 67.2 s, 16:9 | Kinetic-type SaaS launch, "night claim / day proof" | Beat-locked to 100 BPM, picture 0-2 f ahead |
| `1CSXtQ` | OpenAI × HubSpot ChatGPT connector | 30.03 s, 16:9 | Minimal Premium + one cinematic 3D beat ("Prompt-Native Launch") | Typing-led first half, transient-cut second half |
| `1Hcg3X` | "How Do Solar Panels Work?" | 35.83 s, 16:9 | Editorial flat 2.5D explainer | Story/VO-led, major changes on downbeats |
| `1ccYWJ` | Lottieicon animated-icon library | 44.27 s, 16:9 | Fast startup launch × UI demo ("dark neon-accent asset reel") | SFX locked to motion |
| `1i2L14` | NOSTRA motion-studio promo, shown inside a chapter-bar player | 35.07 s, 16:9 inset in a ~3:2 wrapper | Editorial "monochrome brand-system explainer" | Copy-led |

Caveats that affect story conclusions:
- Chowdeck's missing CTA may be the TikTok cut, not the ad [V:126cpH t=17.97s] [inferred].
- The solar film is an unbranded excerpt or portfolio cut, so its missing logo is not a design choice [V:1Hcg3X] [inferred].
- NOSTRA is an agency self-promo, not a SaaS product.

**Conflict policy.** Where the user's references disagree with generic or web advice, **the references win**. Every such case is listed in §1.12 and §2.17.

---

# 1. CREATIVE DIRECTION PRINCIPLES

## 1.1 The Direction Card: decide these before the first frame

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

## 1.2 Concept archetypes (Phase-1 aggregate)

| Archetype | Definition | Evidence | Best for | Main risk |
|---|---|---|---|---|
| **A. Mechanic-as-grammar** | The film behaves like the product. Its editing, type and transitions perform the product's core action. | kivi: words append and re-centre like a dictation cursor (stagger 3-8 f, re-centre in 13-14 f) [V:1-6l8S t=0.10-0.53s]. HubSpot: headline typed into an empty canvas, prompt bar builds around it, message is sent [V:1CSXtQ t=2.13-17.80s]. Lottieicon: every demo shot is the icons performing their own Lottie loops [V:1ccYWJ t=7.30s]. Wix: AI generation shown as a thermal render that "develops" into the photo [V:15VhHR t=8.93s]. Bolt "makes you feel the speed" [S:Bolt] (Superside's comment; the techniques themselves are [inferred]). | AI, voice, prompt, dev-tool and creative-tool products | Becomes a gimmick if the mechanic is not the product's real value |
| **B. One-object journey** | A single transaction, signal or object travels through every scene. Each shot hands it to the next. | Chowdeck follows one order: question → need → promise → choice → order → tracking → delivered → brand [V:126cpH t=0-17.97s]. The solar film "follows the energy": sun → light → lamp → wafer → electrons → bolt → phone → grid → money [V:1Hcg3X]. Clever Devices uses one journey as its spine [S:Clever Devices] (order [inferred]). | Workflow, logistics, fintech, infra, anything with a pipeline | Shots feel like a list if the hand-off is not visible |
| **C. Two-world contrast** | Two visual worlds stand for before/after or claim/proof. Crossing between them is the story. | kivi: grey or desaturated = the human problem world, mint/white = kivi; colour blooms in when the voice starts (22-42 f) [V:1-6l8S t=18.57s]. Bumper: navy "night" for claims, lavender-white "day" for proof, 7 flips [V:19NRDv t=1.17s]. Wix: cream/navy brand frame vs real UI over editorial photography [V:15VhHR]. | Transformation products: automation, AI clean-up, consolidation | The rule must hold every time (kivi breaks it on 2 of 4 scenes, §1.10) |
| **D. Bookended thesis** | The opening line, or its motif, returns at the end and resolves into the logo. | Wix: "Build a website you ♥ love" → "Easy to ♥ love" → WIX [V:15VhHR t=0.63s, 49.63s]. Bumper: "Take payments like a PRO" opens and closes [V:19NRDv t=0.00s, 56.67s]. HubSpot reprises its lockup at an identical position (x 328 vs 327 px) [V:1CSXtQ t=10.37s, 27.37s]. Chowdeck opens and closes on brand teal [V:126cpH]. | Every launch film; combine with A-C | None measured |
| **E. Argument enacted** | The film performs its own claim. | NOSTRA buries the viewer in an unreadable 3D wall of copy, throws it away with a gravity drop, then answers in three-word lines [V:1i2L14 t=10.63-13.93s]. | Agencies, positioning films, "why X beats Y" | Abstract metaphors read as guesswork without labels (§1.10) |
| **F. Proof-by-volume showcase** | The product's breadth is the story: count it, tour it, highlight one item at a time. | Lottieicon: icon wall → linear counter to 4,863+ → hop-and-hold tour [V:1ccYWJ t=7.30-33.20s]. Figma Config recap: about 1 shot per second, 71 % UI, no VO [S:Figma] (measured cut rate). | Libraries, marketplaces, templates, launch recaps | Fatigue, and text cards repeating (§1.10) |
| **G. Customer voice** | Real customers carry every spoken line. Graphics only support. | Thomson Reuters (proof → before/after → vision) [S:Thomson Reuters], Snowflake / Luminate [S:Snowflake]. **Not present in the user's references.** | Consideration-stage B2B | Never TTS a real person [S:playbook] |

**Why A is the SaaS default.** When the grammar *is* the value, the viewer learns the product without being told. Wix says it all in 11 words of on-screen copy across 54 s with no voice-over [V:15VhHR]. kivi needs no narrator because "the demo explains itself" [V:1-6l8S].

## 1.3 Positioning dial: premium / playful / technical / cinematic

**What the references chose (per-video analyst estimates)**

| Ref | Premium | Playful | Technical | Cinematic |
|---|---|---|---|---|
| kivi [V:1-6l8S] | 50 | 5 | 20 | 25 |
| Chowdeck [V:126cpH] | 20 | 60 | 15 | 5 |
| Wix [V:15VhHR] | 40 | 30 | 20 | 10 |
| Bumper [V:19NRDv] | 45 | 30 | 15 | 10 |
| HubSpot [V:1CSXtQ] | 50 | 5 | 25 | 20 |
| Solar [V:1Hcg3X] | 45 | 35 | 15 | 5 |
| Lottieicon [V:1ccYWJ] | 25 | 40 | 30 | 5 |
| NOSTRA [V:1i2L14] | 35 | 45 | 15 | 5 |
| **Mean** | **39** | **31** | **19** | **11** |

**Direction rules from the table**
- **CD-P1. Cinematic is a seasoning, never the base: 8/8 keep it ≤ 25 %.** In these films "cinematic" means one or two hero beats: the 3D data-transfer move [V:1CSXtQ t=17.80-21.47s], the B&W→colour blooms [V:1-6l8S t=18.57s], the 3D deck [V:15VhHR t=48.27s]. *Why:* depth on every shot flattens contrast. Depth on one beat makes that beat the memory.
- **CD-P2. Premium comes from restraint, not effects.** §1.7 lists the markers.
- **CD-P3. Playful is allowed at high premium.** Wix (40/30) and Bumper (45/30) are both read as premium. Playfulness lives in copy and metaphor (a pun, a heart that becomes a UI slot, "Kick your payments up a gear"), not in bouncy UI. In Bumper the playfulness lives in the copy and in semantic letter animation [V:19NRDv t=46.13s], and the film still has no overshoot anywhere.

**Measurable markers of each register (observed)**

| Register | What produces it (measured) | Evidence |
|---|---|---|
| Premium | No overshoot or elastic on UI or type. One accent hue. Regular/Medium type in sentence case. Off-white canvases (#F9FAFC, #F9F5F2, #F4F5F4). About 85 % negative space in brand frames. Every hold has a 1.07-1.29× push or a drift. | kivi "Not used: overshoot, spring, rotation, particles" [V:1-6l8S]. Bumper "no overshoot or elastic bounce anywhere" [V:19NRDv]. HubSpot: 92-95 % of every 2D frame is white [V:1CSXtQ]. Wix brand frames about 85 % empty [V:15VhHR]. NOSTRA never uses #FFFFFF [V:1i2L14]. |
| Playful | Animation on twos (12 fps). One rotational overshoot of about a quarter of the swing (card 15° → -4° → 0°). Gravity falls (ease-in, ×1.2 per frame). Boil or wobble on holds. Puns and dialect. Lowercase heavy rounded type. | [V:126cpH t=9.27-10.00s]. NOSTRA gravity drop [V:1i2L14 t=13.50s]. Solar snap-tilt with one +5° overshoot [V:1Hcg3X t=14.50s]. |
| Technical | Real UI states. Believable data (merchant IDs, GBP amounts, dates). Counters (84 → 100 % in 31 f expo-out; 43 → 4,863 linear). Code cards. System-state colours (fail red #EC243C, success teal #34ACB4). | [V:19NRDv t=23.90s, 39.87-45.0s], [V:1ccYWJ t=9.93s], [V:1-6l8S t=59.73s] |
| Cinematic | Depth of field and bokeh. Black-and-white → colour grade. Light blooms. Screen-to-world 3D pull-back (×0.32 in about 1 s). A camera tilt through a cloud layer. A rim-lit horizon. 180° motion blur. | [V:1CSXtQ t=18.00-20.47s], [V:1-6l8S t=18.57s], [V:126cpH t=15.20s], [V:1ccYWJ t=21.00s], [V:19NRDv] |

**Recommended dials by product type** (mapped from each reference's analyst "fits" note; the mapping is [inferred])

| Product type | Premium / Playful / Technical / Cinematic | Nearest reference |
|---|---|---|
| AI assistant, voice, LLM feature, connector | 50 / 5 / 25 / 20 | kivi, HubSpot. Also [E] "editorial and calm" [inferred in source]. |
| Fintech, payments, B2B ops | 45 / 30 / 15 / 10 | Bumper |
| Website builder, creative tool | 40 / 30 / 20 / 10 | Wix |
| Asset library, UI kit, dev components | 25 / 40 / 30 / 5 | Lottieicon |
| Consumer app (delivery, commerce, social) | 20 / 60 / 15 / 5 | Chowdeck |
| Infra or mechanism explainer | 45 / 35 / 15 / 5 | Solar |
| Agency or service promo | 35 / 45 / 15 / 5 | NOSTRA |

## 1.4 Visual language and colour semantics

**CD-C1. Colour is a sentence, not decoration: 8/8 give colour an explicit meaning.**

| Ref | World / colour rule | Accent (hex) and its single meaning |
|---|---|---|
| kivi | Grey or desaturated = the human problem world. White/mint aurora = kivi. Colour floods in when the voice starts. | Sage/green #556962 (benefit phrase), wordmark #2D4123, aurora #5FE7A0 / #8EE1B2 [V:1-6l8S] |
| Chowdeck | Background colour marks the chapter: teal = brand/promise, cream = product/order, grey = map, back to teal | Orange #F36A05 = energy and action. At most 4 colours per frame from a 6-colour set. [V:126cpH] |
| Wix | Cream #F9F5F2 / navy #02003E = brand voice. Cyan/iridescent = "AI is acting". Each generated site keeps its own palette. | Red heart #DB2C36 = love/brand. Cyan #43D8F9 = AI, used only while the AI acts. [V:15VhHR] |
| Bumper | Navy #020047-#06004E "night" = claims. Lavender-white #F4F4FC / #FCFCFC "day" = proof. | Orange #F4643C = the benefit word in every line [V:19NRDv] |
| HubSpot | Black = announcement. White #FFFFFF = the product world. Blue-grey #C8D4DF → #F4F5F8 = the one 3D "studio". | Orange #F65542 sprocket = "your CRM data". Toggle blue #3585E4 = system state. [V:1CSXtQ] |
| Solar | Background changes on almost every cut | Five colours: cyan #4DD9E5, vermilion #E12E16, cream #F6F1ED, oxblood #1D0B0A, mustard #F3C64E. Bloom only on emitters. [V:1Hcg3X] |
| Lottieicon | Black + green aurora = space. White = UI. | Neon #38D037 = "alive, selected, on" [V:1ccYWJ] |
| NOSTRA | Emerald #2FC06C ↔ off-white #F4F5F4 polarity flips on 11 of 13 hard cuts | One green key word per line [V:1i2L14] |

**Rules**
- **CD-C2. One accent hue and one meaning per film (8/8).** [N] gives the same norm: one accent, about 10 % of the frame, one element per scene. *Why:* once the meaning is taught, the colour explains later scenes with no caption. Wix's cyan "AI" rewrite needs no label by 36.6 s [V:15VhHR t=36.6s].
- **CD-C3. Either polarity works; consistency is the rule.** kivi puts the product in light and the problem in grey [V:1-6l8S]. Bumper puts claims in dark and proof in light [V:19NRDv]. Pick one mapping and never invert it without a story reason [inferred].
- **CD-C4. Emissive glow only on things that emit, act or are "alive".** Solar blooms only the lamp, sun, screens and bolt [V:1Hcg3X]. Lottieicon glows only the active or selected icon [V:1ccYWJ t=27.13s]. *Why:* glow then carries meaning instead of polish.
- **CD-C5. Light as connective tissue in light-canvas films.** In kivi, 12 of 32 transitions pass through white (blooms, washes, white frames), and white is "the neutral room" [V:1-6l8S]. Use this in Minimal Premium. In dark kinetic styles the equivalent is a single empty background "breath" frame [V:19NRDv t=2.40s]. A 1-frame dip to black between a light and a dark scene reads as a render glitch [V:19NRDv t=25.60s].

## 1.5 Personality and tone of voice (copy direction)

| Rule | Numbers | Evidence |
|---|---|---|
| **CD-T1. Short cards.** One line per card. | ≤ 6 words in 7/8; ≤ 7 in Wix's promise line. Typical 2-4. | kivi max 6 [V:1-6l8S]; Bumper max 6 [V:19NRDv]; NOSTRA ≤ 3 per headline [V:1i2L14]; Chowdeck max 5 [V:126cpH]. [N] gives 1-7 words and ≤ 32 characters per kinetic beat (marked [unverified] in [N] itself). |
| **CD-T2. Second person, questions and imperatives.** | "Still typing?", "Your spreadsheet, powered by voice.", "Why wait?", "You don chow?" | [V:1-6l8S t=0.10s], [V:1ccYWJ t=38.33s], [V:126cpH t=0.73s] |
| **CD-T3. Sentence case (or lowercase) is the default (6/8: kivi, Wix, Bumper, HubSpot, Lottieicon, and Chowdeck in lowercase).** ALL CAPS is a style choice (NOSTRA). Serif caps for concept words are a style choice (Solar). | Regular 400 to Medium 500 for lines; a heavier display face only for the product word or wordmark | kivi Regular [V:1-6l8S]; HubSpot Medium end cards [V:1CSXtQ]; Bumper medium lines with a ~900 display face only on "PRO"/"BUMPER" [V:19NRDv] |
| **CD-T4. Two-tone statements.** Subject or setup words neutral, benefit phrase in the accent. | kivi: #0B0B0B + #556962. Bumper: white + #F4643C, with function words ("like a") at about 60 % opacity. NOSTRA: black + one green word. | 3/8 explicit [V:1-6l8S], [V:19NRDv], [V:1i2L14] |
| **CD-T5. Calm premium uses no exclamation marks.** Exclamation marks signal playful or fast-startup. | HubSpot: "No exclamation marks, no hype words except 'For the first time ever'". Lottieicon: "Let's go!" | [V:1CSXtQ], [V:1ccYWJ t=38.67s] |
| **CD-T6. Setup word small, punch word huge.** | Size ratio 1:2.5 to 1:3 ("been" over "busy?", "order in" over "seconds") | [V:126cpH t=1.73s, 3.07s] |
| **CD-T7. Local idiom targets the audience in 3 words.** | Pidgin "You don chow?" | [V:126cpH t=0.73s] (single reference, so experimental) |
| **CD-T8. Keep copy formats consistent.** Do not mix singular/plural lists or number formats. | "For Designer" vs "Developers"; "4,863+" vs "50 + Categories" were flagged | [V:1ccYWJ] |
| **CD-T9. Generated footage never carries type.** All copy lives in the motion-graphics layer. | Veo adds gibberish subtitles when a prompt implies dialogue. Generative video cannot set exact typography. | [P], [N] |

## 1.6 Consistency system

- **CD-K1. One recurring motif with 3 or more story roles (8/8).** *Why:* a returning object turns a montage into one story and makes the ending feel inevitable.
  - Wix's heart: emoji in the sentence → inline image slot → keychain chip → the field the logo sits on [V:15VhHR t=1.03s, 49.63s, 51.37s].
  - HubSpot's sprocket: appended to the headline → moves into the "Sources" chip → pops after "All powered by your data." [V:1CSXtQ t=7.83s, 10.20s, 23.33s].
  - Bumper's orbit ring: chips, then badges, then providers, then the merge [V:19NRDv t=4.97s, 29.97s, 39.87s, 52.75s].
  - NOSTRA's circle survives five setups [V:1i2L14 t=0.0-3.83s].
  - Chowdeck's gravity falls: clock, banana, jug, melon [V:126cpH t=5.03-9.50s].
- **CD-K2. Signature-device budget: 3-5 uses per 60-80 s.**
  - kivi uses its exponential punch-in (+18-33 % in 3-8 f) 4 times in 78 s [V:1-6l8S].
  - Bumper repeats one type grammar (slam → build → pull-back) about 12 times, and its analyst flags monotony past about 6 [V:19NRDv].
  - Vary the device after the 4th use: Bumper's semantic variants ($-scramble, self-assembling letters, kicked letters, chevron wipe) are the fix [V:19NRDv t=7.68s, 14.33s, 46.13s, 47.97s].
- **CD-K3. One-off effects exactly once, at the conceptual peak.**
  - Solar: one flash, 3 f + 2 f, at the energy-creation moment [V:1Hcg3X t=12.83s].
  - Bumper: one glitch decode [V:19NRDv t=1.17s] and one spark burst of about 12 particles [V:19NRDv t=55.27s].
  - NOSTRA: grain, glossy 3D and glass appear once each [V:1i2L14].
  - [N] caps flashes at 3 per second (WCAG).
- **CD-K4. Depth budget: 1-3 hero beats.**
  - HubSpot: 1 beat of 3.67 s, 12 % of runtime [V:1CSXtQ].
  - Wix: 3 short 3D moments (heart, ice object, card deck) [V:15VhHR].
  - kivi: none in 3D; depth comes only from DOF plates [V:1-6l8S].
- **CD-K5. Mixing rendering idioms needs one unifier.** Chowdeck mixes flat illustration, photo cut-outs and light UI, held together by a strict palette (≤ 4 colours per frame) and one cadence (animation on twos) [V:126cpH]. kivi's background plates change illustration style from scene to scene and the analyst flags the break [V:1-6l8S]. Lock one rendering style and one light direction for all generated plates [inferred from that flaw].

## 1.7 Universal creative-direction principles (confirmed across 3 or more references)

**CD-U1. Build the film on one idea that the motion itself performs (8/8).**
- *Numbers:* the concept fits in ≤ 12 words. Wix delivers its whole message in 11 words of on-screen copy [V:15VhHR].
- *Why:* the viewer reads one grammar once and then enjoys variations ("the viewer learns it once") [V:1-6l8S].
- *Do / don't:* make every line type itself because the product is dictation [V:1-6l8S t=0.10s]. Don't float dashboards while a narrator lists features [inferred].

**CD-U2. One accent hue with one meaning (8/8).** See CD-C2.

**CD-U3. Colour or world changes carry story (8/8).** See CD-C1.
- *Why:* scene changes read as chapters, not jump cuts. Solar's cuts "never look like jump cuts" because the background colour changes on each one [V:1Hcg3X].

**CD-U4. Premium restraint.**
- No overshoot on UI or type in premium registers (5/8 state "none"): [V:1-6l8S], [V:19NRDv], [V:1CSXtQ], [V:15VhHR] (none on UI; a subtle overshoot on the chip and heart pops is possible, [inferred] by its analyst), and [V:1ccYWJ] apart from the 3-4 f role-word tilt settle.
- One main type family (8/8), plus at most one contrasting face with a single job (5/8): kivi's serif wordmark, Lottieicon's italic serif role words, Bumper's display "PRO", Solar's serif concept words, NOSTRA's custom wordmark.
- *Why:* every element that does not move or change style makes the ones that do read as intentional.

**CD-U5. A recurring motif with 3 or more roles (8/8).** See CD-K1.

**CD-U6. Type is the narrator; sound-off is the default.**
- 6/8 have no narrator VO: kivi uses in-world dictation only [V:1-6l8S]; none in [V:126cpH], [V:15VhHR], [V:19NRDv], [V:1CSXtQ], [V:1ccYWJ]. For Solar and NOSTRA it is inconclusive [V:1Hcg3X], [V:1i2L14].
- [W:showreel.design] tags only 7 of 243 reels "Voiceover Heavy". Figma's recap has no VO [S:Figma].
- *Why:* feed viewing is sound-off, and type gives exact timing control.

**CD-U7. Real, believable product states (6/6 UI films).**
- UI moves only when an action causes it; each card has one job [V:1-6l8S].
- Every UI state is a real app state [V:126cpH]. The film uses real Wix UI [V:15VhHR] and a real ChatGPT composer [V:1CSXtQ].
- Data looks real (GBP amounts, merchant IDs, dates) [V:19NRDv].
- [S:playbook] rule 5: real UI is the proof.

**CD-U8. Depth and cinema on 1-3 hero beats only (8/8 keep cinematic ≤ 25 %).** See CD-P1 and CD-K4.

**CD-U9. Nothing is dead except the final logo (7/8).** Holds keep a push or drift: 1.07-1.29× [V:1-6l8S], −13 to −24 % scale per card [V:1CSXtQ], 0.3-0.5 % of the frame per frame [V:1Hcg3X], 0.3-1 px per frame [V:1i2L14], a moving aurora [V:1ccYWJ], boil and wobble [V:126cpH]. Wix holds its brand sentence still for 1.0 s on purpose, so the line can be read [V:15VhHR t=0.63s]. Exact numbers belong to the motion part.

**CD-U10. Signature device repeated, one-off effects used once.** See CD-K2 and CD-K3.

## 1.8 Style-specific direction

| Style | Canvas and colour | Copy and type | Story shape | Motion and sound character | Evidence |
|---|---|---|---|---|---|
| **Minimal Premium SaaS** | Light (#F9FAFC / #FFFFFF), one accent family, white as the transition room | Regular weight, sentence case, centred, ≤ 6 words, cards 1.2-2.2 s | Hook → name → one repeatable demo loop ×4 → statement → bookend tagline → wordmark → URL | Slow pushes, punch-ins into cuts, no overshoot. Plucks and pads, riser + drop at the reveal, no VO. | [V:1-6l8S], [V:1CSXtQ] |
| **Kinetic-type launch ("night claim / day proof")** | Dark navy claims with coral and violet glow; light 3D UI proof | Medium/semibold; hero words 15-33 % FH cap; benefit word in orange | Claim (1-2 s) / proof (2-6 s) ×5 → positioning climax → escalating callback → lockup | Oversize slam (3-4× → 1× in 8-10 f), semantic letter animation, beat-locked at 100 BPM | [V:19NRDv] |
| **Fast startup / dark neon asset reel** | Black with a moving green aurora, one neon accent #38D037 | Geometric sans plus one italic-serif accent; numbers as proof | Statement cards alternating with product-as-motion demos → hero tour → climax triplet → action CTA | Snap pops, suck-in shrinks into cuts, sub booms at peak velocity | [V:1ccYWJ] |
| **UI-focused demo in an editorial brand frame** | Cream/navy brand world vs full-bleed editorial photography under real UI | ≤ 7-word promise, ≤ 3-word echo | Sentence → the CTA icon becomes UI → 3 recurring customer stories → collection climax → sentence echo → logo | Honest cursor physics, one AI colour, anchored elements during fast cuts | [V:15VhHR] |
| **Playful illustrated collage + UI** | 6-colour flat palette, chapter colours | Lowercase heavy rounded type, dialect | One transaction, hook to lockup | Animated on twos, pops, gravity, shared-element UI morph | [V:126cpH] |
| **Editorial 2.5D explainer** | 5-colour palette, grain, bloom on emitters only | Serif for concept words, grotesk for labels | Energy chain → definition → features → wide calm climax → recap triptych | Expo-out arrival, drift, expo-in whip exit | [V:1Hcg3X] |
| **Monochrome brand-system explainer** | One hue + off-white + near-black, polarity flips | ALL CAPS, ≤ 3 words, one green key word | Dream → pain → solution → features → breather → reassurance pun → click CTA | Shape-match chains, scatter-swap-converge type | [V:1i2L14] |
| **Prompt-native launch** | White canvas, one orange accent, one blue-grey 3D studio | Typed headline at 9-35 characters/s | Typed promise → UI builds around it → co-brand lockup on riser → macro query → send → 3D data transfer → answer → 4 cards → reprised lockup | Two speeds (slow camera, 100-200 ms UI), one depth beat | [V:1CSXtQ] |

## 1.9 Experimental (single-reference or risky; use deliberately)

- **On-screen copy-framework chapter bar.** NOSTRA labels its stages (Dream outcome / Pain point / Benefits / Features / CTA) with chip widths proportional to section length [V:1i2L14]. It works for case-study or LinkedIn "how we structure videos" posts. As an ad it wastes 21 % of frame height and caps resolution.
- **Brand name hidden in the benefit.** "NO STR(ess)" turns into "NOSTRA." on a cursor click [V:1i2L14 t=32.0-32.17s]. The logo becomes the punchline, but the name appears only at 92 % of runtime.
- **Dialect hook** [V:126cpH t=0.73s].
- **Black-and-white → colour "listening" bloom**, 22-42 f, as the emotional turn [V:1-6l8S t=18.57s, 54.0s].
- **Generative slot machine.** One UI element stays locked while use cases rotate behind it. Thermal holds of 9/7/11 f, colour holds of 21/29/38 f (lengthening, landing on the hero case) [V:15VhHR t=8.63-12.47s].
- **Escalating word swap that lands on the product name** (Boss → Master → Hero → Champion → Legend → PRO, every 11-16 f, height 10 → 34 % FH) [V:19NRDv t=57.60-59.90s].
- **Recap triptych end card** that locks to exact thirds [V:1Hcg3X t=32.53-34.87s].
- **Polarity-flip cold open** (2.13 s on black, then a hard cut to the white product world on the first hit) [V:1CSXtQ t=2.13s].
- **Animation on twos** for collage layers only. Keep UI and camera on ones [V:126cpH] (the restriction is [inferred]).

## 1.10 Avoid (observed failures)

| Avoid | Observed where | Instead |
|---|---|---|
| A static opening of more than 0.5 s | Chowdeck: 20 static frames, a 1.5-2 % FH pill nudge at f20-f22, and the first real event ("chow?" pop) at 0.73 s [V:126cpH t=0.00-0.73s] | First change by f3, i.e. 100 ms (§2.5) |
| No logo or no CTA at the end; music ending before the picture | Lottieicon: brand on screen only at 2.6-4.6 s, music gone 3.7 s before the end [V:1ccYWJ t=40.5s]. Chowdeck: no CTA [V:126cpH]. | §2.11 |
| A bare URL with no verb or lockup | kivi [V:1-6l8S t=75.53s] | Verb CTA + lockup |
| 4-5 or more consecutive text-only cards | kivi energy dip at 22-31 s (5 text-only cards over a pad-only bed) [V:1-6l8S]; Lottieicon 6 cards in 5.9 s [V:1ccYWJ t=33.2-39.1s]; HubSpot 4 same-size cards [V:1CSXtQ t=21.5-27.4s] | Insert a UI beat, change scale, or merge into one kinetic sequence. Note: Lottieicon's last 3 cards are the 1.07 s climax triplet (C-E), which is fine on its own; the failure is the 3 statement cards (4.8 s) in front of it with no UI beat, so the run totals 6 [inferred reading of the teardown]. |
| Unlabelled abstract metaphors | NOSTRA's feature parade (arrows, pinwheel, phone, strands, glass) [V:1i2L14 t=19.95-30.63s]; Wix's ice-bottle montage [V:15VhHR t=29.47-33.33s] | A 1-2 word label per metaphor |
| A signature device used on only some matching scenes | kivi's B&W → colour on 2 of 4 lifestyle scenes [V:1-6l8S] | Apply it every time or define the rule |
| Mismatched plate styles; a one-off stock photo | kivi plates [V:1-6l8S]; Bumper's lifestyle photo [V:19NRDv t=29.97s] | One rendering style and one light direction |
| Copy that changes between a wide shot and its cut-in | "make" vs "create" [V:15VhHR t=6.57s] | Lock strings per scene |
| A payoff message readable for less than 0.5 s | Solar's message block about 0.4 s [V:1Hcg3X t=29.80s]; Chowdeck's "Order delivered" 2 f [V:126cpH t=13.53s] | §2.12 hold floors |
| Mixed languages without a reason | NOSTRA [V:1i2L14] | Localise per cut |
| A pixel or glitch build longer than 12 f | NOSTRA 23-26 f [V:1i2L14 t=16.63s] | ≤ 12 f |
| Delivering inside a wrapper frame | NOSTRA's player frame [V:1i2L14] | Native frame |

## 1.11 Especially good for SaaS

- **The CTA icon becomes the UI.** The sparkle in the brand line stretches into the prompt bar in 6 f while the context fades over the same 6 f [V:15VhHR t=3.97-4.23s].
- **Text becomes UI.** The headline the viewer has already read gains a border, shadow and icon, then the camera pulls back ×0.75 [V:1CSXtQ t=7.80-9.03s].
- **One colour = "AI is acting."** It is a transitional state that always settles to final colours: the autocomplete turns cyan→blue in 4 f [V:15VhHR t=6.57-8.63s], the thermal "render" holds 7-11 f before a 1-frame switch to the photo [V:15VhHR t=8.63-11.20s], and the headline rewrite runs 12 f plus a 6 f settle to grey [V:15VhHR t=36.6-37.0s]. Budget 4-18 f.
- **Integrations explained by particles made of the UI's own colours,** followed by a ×2.3 dolly through them [V:1CSXtQ t=19.00-20.47s].
- **Proof before number:** show the wall, dim it to 15 %, then count [V:1ccYWJ t=7.30-9.93s].
- **Feature before label:** the auto-correct shows at 20.43 s, and "Custom Dictionary" is named at 25.47 s [V:1-6l8S].
- **Context → extraction → focus:** whole table, then the column lifts out, then the camera pushes through, then a 4 f colour fill [V:19NRDv t=16.77-20.50s].
- **System behaviour told only in colour states:** red, red, teal [V:19NRDv t=39.87-45.0s].
- **A shared-element UI morph across a scene change:** the card becomes the notification while the map rack-focuses in [V:126cpH t=11.03-11.43s].
- **Lifecycle feature order, threes, and named, verified numbers** [S:playbook] rules 4, 8, 9.

## 1.12 Where the references overrule generic advice (creative direction)

1. **"Dark, bold type, kinetic, confident VO" as the default premium launch look** ([W:motion.so] house style). In the references, 5/8 use light or off-white canvases (kivi, Wix, HubSpot, NOSTRA, Solar), 5/8 set statement lines in Regular/Medium rather than bold (kivi, Wix, HubSpot, Bumper, Lottieicon), and 6/8 have no narrator. **References win:** dark and bold is a style option (Bumper, Lottieicon), not the default.
2. **Wide-angle, surreal "cinematic" brand films** ([S:Bolt], techniques [inferred] there). The references keep cinematic ≤ 25 % and spend depth on 1-3 beats. **References win.**
3. **Device frames as standard** ([S:playbook] gap #6 proposes browser and phone frames). The references show UI frameless as floating cards or full-bleed (Wix: "no browser chrome or device mockups"; Bumper: "never shown in a browser chrome or device frame") [V:15VhHR], [V:19NRDv]. [W:motion.so] and [W:raivcoo] also describe "designed UI moments" and animated UI recreations rather than screen recordings. **References win:** frameless is the default, and a device frame is used only when the device is the product.
4. **Agreements, kept as universal:** one accent [N]; no overshoot in calm styles ([E], inferred there); motion that feels like the product [S:playbook].

---

# 2. STORYTELLING FRAMEWORK

## 2.1 What the eight references actually do (measured stage map)

The stages below are mapped onto a canonical 7-stage model. Shares are % of runtime.

| Ref (runtime) | Hook | Setup / problem | Reveal | Proof (demos) | Benefit / breather | Climax | Resolution (tagline, logo, CTA) |
|---|---|---|---|---|---|---|---|
| kivi (77.78 s) | 2.0 % (1.55 s) | 3.7 % (2.90 s) | 6.6 % (5.10 s) | 66.1 % (51.4 s) | 11.2 % (8.7 s) | 1.9 % (1.48 s) | 8.6 % (6.68 s) |
| Chowdeck (17.97 s) | 8.9 % (1.60 s) | 5.2 % (0.93 s) | 14.6 % (2.63 s) | 46.9 % (8.43 s) | none | 8.9 % (1.60 s) | 15.4 % (2.77 s) |
| Wix (53.87 s) | 4.1 % (2.23 s) | none | 3.7 % (2.00 s) | 81.8 % (44.0 s) | none (folded into proof) | 2.5 % (1.36 s) | 7.9 % (4.24 s) |
| Bumper (67.2 s) | 3.6 % (2.40 s) | none | 7.1 % (4.80 s) | 57.9 % (38.9 s) | (inside the climax) | 22.8 % (15.3 s, incl. callback) | 8.5 % (5.73 s) |
| HubSpot (30.03 s) | 7.1 % (2.13 s) | 18.9 % (5.67 s, typed promise) | 17.5 % (5.24 s, incl. co-brand card) | 28.1 % (8.44 s) | 11.0 % (3.30 s) | (hero beat inside proof) | 17.5 % (5.26 s) |
| Solar (35.83 s) | 4.3 % (1.53 s) | 14.8 % (5.30 s) | (naming mid-film) | 66.4 % (23.8 s) | none | 5.3 % (1.90 s) | 9.2 % (3.30 s, recap, no logo) |
| Lottieicon (44.27 s) | 2.7 % (1.20 s) | none | 13.8 % (6.10 s) | 58.5 % (25.9 s) | 10.8 % (4.80 s) | 2.4 % (1.07 s) | 11.7 % (5.20 s) |
| NOSTRA (35.07 s) | 4.1 % (1.43 s) | 36.5 % (12.8 s, dream + pain) | 16.3 % (5.73 s) | 30.5 % (10.7 s, incl. 4.7 s breather) | 4.4 % (1.54 s) | (pun → logo) | 8.3 % (2.90 s) |
| **Median** | **4.1 % / 1.58 s** | **0-5 %** (absent in 3/8) | **13.8 % / 5.1 s** | **58 %** | **about 11 %** when present (4/8) | **about 2.5 % / about 1.5 s** (Bumper's extended 15 s is the exception) | **8.9 % / 4.7 s** |

Sources for the stage boundaries: each reference's Story Structure table [V:1-6l8S], [V:126cpH], [V:15VhHR], [V:19NRDv], [V:1CSXtQ], [V:1Hcg3X], [V:1ccYWJ], [V:1i2L14]. The mapping onto 7 stages is mine [inferred].

**Timing landmarks (measured)**

| Landmark | Values | Rule it supports |
|---|---|---|
| First visual change | f0-f3 in 7/8. Chowdeck at 0.73 s is flagged. | H1 |
| Brand or product name first on screen | Bumper 1.17 s ("PRO"), Chowdeck 1.60 s (app splash on the phone), Wix about 1.7-2.2 s ("with WIX" chips; timing [inferred] from the 1.73 s ticker swap), Lottieicon 2.63 s, kivi 6.10 s, HubSpot 7.83 s (sprocket) / 10.37 s (lockup). NOSTRA at 32.17 s is a deliberate punchline. **Median of the six product films: about 2.2-2.4 s** (it depends on the inferred Wix time). | R1 |
| Product UI or mechanic first on screen | Chowdeck 1.60 s, Bumper 3.62 s (logo) / 4.97 s (payment chips), Wix 4.23 s, Lottieicon 7.30 s, HubSpot 7.80 s (UI) / 2.13 s (typed prompt), kivi 7.97 s (record pill). **≤ 8 s in 6/6.** | R1 |
| Music "turn" (drop or groove entry) | Bumper 4.8 s (7 %), Wix 4.5 s (8 %), kivi 8.28 s (11 %), HubSpot 13.05 s (43 %, after a typed prologue). Always at the first product beat. | E4 |
| Climax start | Median **≈ 86 %** of runtime (range 59-90 %). Per film: Wix 89.6 %, kivi 89.5 %, NOSTRA 87.3 % (pun), Lottieicon 85.8 %, Solar 85.5 %, Chowdeck 75.7 %, Bumper 68.6 % (extended 15 s finale; its callback starts at 84.3 %), HubSpot 59.3 % (mid-film hero beat) | C1 |
| Final hold on the end card | 0.8 s (NOSTRA), about 1.3 s (kivi URL, which keeps a +12 % push, so it is not truly still), 1.4 s (Chowdeck, rider still moving), about 1.7 s (Wix), 2.2 s (HubSpot), about 4.6 s (Bumper, static with slight drift from 62.60 s). Lottieicon has no logo end card. | L1 |

## 2.2 The canonical stage model

| Stage | Job | Share of runtime (refs) | Absolute range | Must contain | Typical entry → exit |
|---|---|---|---|---|---|
| **1. Hook** | Stop the scroll and pose the question or promise | 2.7-8.9 %, median 4.1 % | **1.2-2.4 s** (36-72 f) | Motion by f3. ≤ 7 words. The concept mechanic is already visible. | In motion on frame 0 → energetic exit (whip, punch, zoom-through, polarity flip) |
| **2. Setup / problem** (optional) | Name the pain or the dream in one beat | 0-19 % in product films; up to 37 % in explainers and agency promos | 0-5.7 s | One visual pain (dense, grey, chaotic), or a single question | Continues the hook's world → exits into the reveal through a "release" (silence, white, click) |
| **3. Reveal** | Name the product and show its first real UI or mechanic | 3.7-17.5 %, median 13.8 % | **2.0-6.1 s** | Name + first product state + a sound event | Silence or riser in → hit or drop out |
| **4. Proof** | Demonstrate 1-5 value blocks with real states | 28-82 %, median 58 % | 8-51 s | One repeatable demo grammar. Show first, then label. | Block to block through world or colour flips and motivated actions |
| **5. Benefit / breather** | Restate the value in 1-3 cards, or let the eye rest | about 11 % when present | 1.5-8.7 s | ≤ 6 words per card, or a low-motion section at about 1/30 of peak energy | Calmer music (pad or breakdown) |
| **6. Climax** | Collect or escalate into the thesis line | about 2.5 % (1-2 s) or an extended 10-15 s kinetic finale | 1.0-15.3 s | The densest edit of the film, then a hard stop | Fastest cuts → hard cut into stillness |
| **7. Resolution** | Tagline → logo lockup → CTA, with the music resolving | 7.9-17.5 %, median 8.9 % | **2.8-6.7 s** (median 4.7 s) | A still logo hold of at least 1.5 s, a verb CTA, audio resolving on the logo | Lockup in → fade or hard end |

**Why this shape works**
- Attention is front-loaded: 47 % of a video campaign's value lands in the first 3 s and 74 % in the first 10 s (Meta/Nielsen), and mobile feed dwell is about 1.7 s per item [N]. That is why the hook and reveal sit inside the first 10-15 % of runtime.
- The long middle is where SaaS value is proven. The references give it a median of 58 %.
- The climax-then-stillness ending gives the logo the only truly still frame in the film, so it registers [V:126cpH], [V:1CSXtQ].

## 2.3 Stage timing by runtime (seconds, frames at 30 fps, % of runtime)

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

## 2.4 Story templates (pick one per film)

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

## 2.5 Hook library

| Hook type | Measured example | First event | Copy | Duration | Exit device | Use when |
|---|---|---|---|---|---|---|
| **Pain question, live-typed** | "Still typing?" [V:1-6l8S t=0.10s] | Text at f3 (100 ms); second word +7 f; the line re-centres over 13 f | 2 words | 1.55 s | Aurora colour wash wipes it (7 f) | AI, voice, productivity |
| **Curiosity question title** | "How Do SOLAR PANELS work?" [V:1Hcg3X t=0.03s] | Hero object rises from f1; title lines staggered 5 / 8 / 9 f; crisp by 0.90 s | 5 words | 1.53 s | Expo-in whip out (8 f), direction carried into the next shot | Explainers |
| **Dialect question** | "You don chow?" [V:126cpH t=0.73s] | Pop-on in 1 f (but the first 0.73 s are static, a flaw) | 3 words | 1.60 s | 1-frame silhouette, then a hard cut | Local consumer apps |
| **Promise, macro to micro** | "Build a website you ♥ love" [V:15VhHR t=0.00-0.63s] | Macro words at 49 % FH cap, a new word every 7 f, hard cut to the same words at 6.6 % FH | 7 words | 2.23 s with the sentence | The CTA icon becomes the UI | Brand + product films |
| **Promise slam** | "Take payments like a PRO" [V:19NRDv t=0.00s] | "Take" at 4.05× on frame 0, smeared, settles in 8 f (expo-out; frame 1 removes about 64 % of the scale change) | 5 words, ending on an open "like a…" | 2.40 s | Inverted match cut (same text, colours flip) | Kinetic launch |
| **Event announcement** | "For the first time ever" on black [V:1CSXtQ t=0.00s] | Dot at the exact frame centre on f0, with a sub impact; the bold word tracks in −17 % | 5 words | 2.13 s | Hard cut on motion to the white world, on an audio hit | Co-brand or big launches |
| **Zero-copy icon** | Notification bell [V:1ccYWJ t=0.03-1.20s] | Bell on f1, rises about 15 % FH in 6-7 f, sways ±12 px | 0 words | 1.20 s | Zoom-through: 3 f of ease-in, then ×1.36 per frame (about 20× in 10 f), sub boom when it fills the frame | Asset libraries, "something new" |
| **Fly-through question** | "IMAGINE…?" [V:1i2L14 t=0.00s] | f0 already mid-motion at about 3× scale; 93 % of the scale-down in 8 f | 1-3 words | 1.43 s | 4 f blur-dissolve | Agency or brand promos |
| Pain triad (VO) | "Creative requests from every direction." / … [S:Superside] | VO line 1 at 0.16 s | 3 short lines | 9.1 s | "That's why we built X" | VO explainers |
| Era shift + contrast | "As AI reshapes every industry, you don't need another chatbot…" [S:Airtable] | Chapter 0:00-0:10 | 1-2 lines | about 10 s | Reveal | AI launches |
| Objection flip | "Free? Nope." [S:PointCard] [inferred beats] | about 0-3 s | 2 words | about 3-5 s | Hard cut stamp | Performance ads |
| Category first | "Introduce the category before the output" [W:motion.so] | n/a | 1 line | n/a | Promise | New categories |

Tally across the user's references: questions 4/8, promises 2/8, announcement or icon 2/8.

**Hook rules**
- **H1. In motion by f3; never fade up from black or a logo (7/8).** [N] gives the same rule: frame 0 is the thumbnail, so the hook text should already be on it. A black open is fine only if something moves and hits on f0 (HubSpot's dot and sub impact).
  - *Do:* the first word is already oversized and moving on frame 0 [V:19NRDv].
  - *Don't:* hold a static title for 0.73 s before the first change [V:126cpH].
- **H2. ≤ 7 words, median 4, and one idea** (8/8; counts 0, 2, 3, 3, 5, 5, 5, 7). **≤ 5 words in 9:16 and in spots of 15 s or less, ≤ 3 for a dialect question; 1-2 words visible at any instant while it builds.** This is the one hook budget for the whole system (P07 §9.11.1, SKILL, all guidelines). The only native 9:16 reference hooks with 3 words [V:126cpH t=0.73s]; the ≤ 5 cap for short and vertical spots is [inferred] from the narrower line length and the 1.2-1.5 s hook window. *Why:* the median hook is 1.58 s long, enough for about 4 words at the 150-170 wpm speech pace in [S:playbook] [inferred arithmetic].
- **H3. 1.2-2.4 s long, ending in an energetic exit** (a whip, punch, zoom-through or polarity flip). That exit is the first "edit" the viewer feels [V:1Hcg3X t=1.53s], [V:1ccYWJ t=1.13s], [V:1CSXtQ t=2.13s].
- **H4. The hook already shows the concept mechanic.** Typing for a dictation product [V:1-6l8S]. A typing "thinking" dot for a ChatGPT connector [V:1CSXtQ]. A notification bell for a product that is "new" [V:1ccYWJ]. Macro type for a website builder [V:15VhHR].
- **H5. Hook type size: cap ≥ 6.5 % FH (≥ 70 px at 1080p)** [threshold inferred from the values below; no reference states it]. Observed values: kivi 6.3-8.8 % FH font; Wix 6.6 % after the macro; Bumper hook line 8.5 % cap and hero words 15-23 %; Solar title 11.6 %; NOSTRA "IMAGINE" 10.3 %. HubSpot's 3.6 % FH cap was flagged as weak on phones [V:1CSXtQ]. [N] asks for body text ≥ 84 px in 16:9 watched upright on a phone.
- **H6. Land the answer or the name within about 3-6 s.** kivi resolves "Still typing?" with "Just… Think out loud… Meet kivi" by 6.1 s; Chowdeck says "order in seconds" at 2.53 s; Bumper says "PRO" at 1.17 s. [N] gives the key message within 3 s for feeds (its TikTok statistic is marked [unverified, secondary] in [N]; the Meta/Nielsen 47 %-in-3 s figure is sourced).
- **H7. The first 5 s double as the thumbnail and autoplay preview.** Superside's Wistia previews loop 0-5 s (PointCard, Imperfect Foods) [S:playbook]. Make frames 0-150 thumbnail-worthy [inferred].

## 2.6 Setup / problem

- **S1. In launch films, compress the problem into the hook or skip it.**
  - An explicit problem stage appears in only 2 of the 6 SaaS/app films (kivi 3.7 %, Chowdeck 5.2 %). Bumper has none: its pains are "implied only by each benefit claim" [V:19NRDv]. Wix and Lottieicon have none.
  - The problem gets more time only in the explainer (Solar 14.8 %) [V:1Hcg3X], the agency promo (NOSTRA 36.5 % for dream + pain) [V:1i2L14] and VO overviews (Superspace about 8 % of 115 s) [S:Superside].
  - *Why:* a premium launch sells the outcome. A long problem stage delays the reveal past the 10 s attention window [N].
- **S2. If you show the problem, make it a visual state, not a sentence.**
  - kivi shows a grey world that blooms into colour [V:1-6l8S t=18.57s].
  - NOSTRA shows a 3D carousel of unreadable copy (3.3 s) that is then dropped with gravity, accelerating about ×1.2 per frame with a 20° rotation [V:1i2L14 t=10.63-13.93s].
  - TradeLens shows a noise grid, then isolates one signal [S:TradeLens] (secondary source, [inferred]).
- **S3. Seed the product inside the problem shot.** In Chowdeck the phone in the "been busy?" shot already shows the app's splash screen [V:126cpH t=1.60s].
- **S4. Pains come as one question or a triad.** One question in 4/8 hooks; a 3-pain triad in [S:Superside] (Superspace, measured).

## 2.7 Product-reveal patterns

| ID | Pattern | Frame-level spec (measured) | Audio | Evidence |
|---|---|---|---|---|
| **R-A** | **Tonal materialise, then punch** | 3-4 white frames of rest. Aurora up over 4 f. Wordmark goes from a silver ghost to brand green over about 42 f, ending in a left→right tonal sweep. Accelerating push, then a +18 % punch in the last 3 f. 1 pure-white frame. The next graphic bursts to fill the frame in 4 f. | Near-silence for about 0.15 s (6.65-6.80 s), bass re-enters, tonal riser about 1 s. The burst fills the frame about 3 f before the full-band drop at 8.28 s. | [V:1-6l8S t=6.00-8.30s] |
| **R-B** | **Stroke → fill → sheen, on a kick** | Logo outline draws in 5 f, fill grows from a dot in 8 f, gloss sheen in 14 f. Then related objects (payment chips) fly in on arcs over 22 f and orbit. | The stroke lands on the 4th intro kick (3.62 s vs 3.60 s). The full groove enters 5 f before the fly-in. | [V:19NRDv t=3.62-5.70s] |
| **R-C** | **Scale hand-off into a logo tile** | The previous word shrinks −28 % in 8 f (expo-in). Hard cut on its smallest frame. Green tile; glyph draws in about 10 f; wordmark wipes left→right in 7 f; beat-locked size steps of +15 % (4 f) and +5 % (3 f); 8 f whip exit. | Sub hits on the cut (−8.2 dB) and on the exit | [V:1ccYWJ t=2.33-4.57s] |
| **R-D** | **The brand line becomes the UI** | The cursor enters, hovers 1.0 s, clicks the sparkle. The sparkle stretches into a pill over 6 f while everything else fades over 6 f. Near-hard cut to the AI field with the prompt bar at 57 % FW. | The music drops 8 f after the cut, as the headline starts typing | [V:15VhHR t=2.50-4.50s] |
| **R-E** | **Text becomes UI, then pull back** | Border and shadow in 1-3 f, brand icon pop in 3 f, toolbar slides in over 4-5 f. Then a pull-back ×1.00 → 0.75 over 21-31 f (cubic ease-in-out, peak speed at about 50 %). | Riser starting about 6.4 s | [V:1CSXtQ t=7.80-9.03s] |
| **R-F** | **Co-brand lockup on the riser crest** | Wordmarks converge 20-39 px while fading in from about 50-80 % opacity over 8 f. Accelerating push-in of +10.6 % over about 1.7 s into the drop. | Crest on the cut, about 300 ms of near-silence, plucks, a 100 ms gap, then the beat drop at 13.05 s | [V:1CSXtQ t=10.37-13.03s] |
| **R-G** | **Click-triggered punchline** | A cursor taps "NO"; the line swaps to the wordmark in 1 f. A green dash runs through the wordmark and flies back in as the full stop (32.17-32.60 s). A pill rises about 72 px in 3 f and pushes the logo up 48 px. | n/a (the mix is over-limited) | [V:1i2L14 t=32.00-32.93s] |
| **R-H** | **Product seeded in the problem** | The app splash is visible on the phone in the problem shot. The yellow matte comes off in 1 f after an 8 f background focus pull. | n/a | [V:126cpH t=1.60-1.87s] |
| **R-I** | **Silence on the decisive click, then the build** | The send click turns the button cyan for 6 f. Hard cut 8 f later. The result builds in 12 f: container → headline → badge → nav → body, each 2-4 f apart. | The music drops ≥ 15 dB (to −35 dB) exactly on the click for 0.3-0.5 s, then a hit | [V:15VhHR t=12.20-12.83s] |
| R-J | "That's why we built X" (spoken) | n/a | VO | [S:Superside] (at 9.28 s) |
| R-K | Category before product | n/a | n/a | [W:motion.so]; Lottieicon puts "Animated icons library" right after the logo [V:1ccYWJ t=4.57s] |

**Reveal rules**
- **R1. Name and product (or its mechanic) on screen by ≤ 8 s, and by ≤ 12 % of runtime in films of 45 s or more.** The median name time in the six product films is 2.2 s; the product or mechanic is visible by 8 s in 6/6 (§2.1). Exceptions are deliberate: a punchline brand [V:1i2L14], or a co-brand film whose concept is visible from 2.13 s [V:1CSXtQ]. [S:playbook] says "by about 10 s"; the references are stricter (§2.17).
- **R2. The reveal is an audio event.** Use near-silence of 0.1-0.35 s, then a riser, then a hit or drop within 0-8 f of the reveal (4/8: R-A, R-B, R-F, R-I).
  - *Why:* a sudden absence of sound makes the next frame an event without adding any graphic.
  - *Do:* drop the music by ≥ 15 dB on the decisive click [V:15VhHR t=12.20s].
  - *Don't:* let the logo arrive mid-groove with no change in the mix [inferred].
- **R3. Prefer transformation reveals to "logo, then screen recording" (3/8: R-D, R-E, kivi's pill → line → card in about 13 f).** *Why:* the viewer never leaves the brand world, so the product reads as part of the idea [V:15VhHR], [V:1-6l8S t=9.50-9.93s].
- **R4. A logo reveal is a 3-stage micro-sequence: form → fill/colour → finish. It runs 0.9-1.9 s.** Bumper: 5 + 8 + 14 f. kivi: about 42 f of colour, then a 3 f punch. Lottieicon: tile, then about 10 f of glyph, then a 7 f wipe.

## 2.8 Proof blocks (feature demos)

- **P1. One demo grammar, repeated (§2.4 TS2).**
  - kivi: title card → voice card (live waveform, words streaming at 4-7 words/s) → output UI [V:1-6l8S].
  - Bumper: claim card → proof [V:19NRDv].
- **P2. Block length 4.4-14.75 s, median about 8 s.**
  - Measured blocks: kivi 7.48 / 8.44 / 14.75 / 11.03 / 6.69 s; Bumper 7.1 / 11.3 / 4.4 / 6.0 / 10.2 s.
  - [S:playbook] (from VO films): ideas change every 7-14 s; Airtable's chapters run 9-14 s.
  - Give the most visually provable feature the longest block: Bumper's reconciliation is its longest at 11.3 s [V:19NRDv t=14.33-25.60s].
- **P3. Later blocks run shorter.** kivi 14.75 → 11.03 → 6.69 s [V:1-6l8S]. Lottieicon's tour moves shorten 32 → 32 → 22 → 17 f [V:1ccYWJ t=27.40-32.57s]. *Why:* the viewer already knows the grammar, so you can spend less time explaining and more on momentum.
- **P4. Show first, label second.**
  - kivi shows the auto-correct for about 5 f at 20.43 s; the "Custom Dictionary" card appears at 25.47 s [V:1-6l8S].
  - Lottieicon shows the icon wall, then dims it to 15 % in 3 f, then counts [V:1ccYWJ t=7.30-9.93s].
  - Wix teaches cyan = AI, then uses it with no caption [V:15VhHR t=36.6s].
- **P5. Inside a long proof shot, something changes every 0.5-1.5 s.** Wix shot 12 (2.57 s) holds a popup, typing, a cursor, a click and a shimmer, about one event per 0.5 s [V:15VhHR t=16.63s]. Bumper puts an in-shot camera beat every 0.8-1.5 s on any proof longer than 3 s [V:19NRDv].
- **P6. Context → extraction → focus** for data UIs [V:19NRDv t=16.77-20.50s]. Dashboards can run the other way (detail → context), from one macro chart to the full screen in a 2-3 f pull-back snap [V:19NRDv t=27.57-28.83s].
- **P7. Real states, real data, a real flow order.** Chowdeck runs order → confirm → preparing → ready → rider → delivered [V:126cpH]. Bumper uses merchant IDs and GBP decimals [V:19NRDv]. [S:playbook] says to order features the way a customer meets them.
- **P8. Group in threes.**
  - Superspace: 3 pains, then a benefit triad of about 3 s each [S:Superside].
  - Wix's slot machine shows 3 use cases [V:15VhHR t=8.63-12.47s].
  - Bumper's orbit visits 3 badges [V:19NRDv t=29.97-35.93s].
- **P9. Recurring customer stories beat random screens.** Wix's generated sub-brands (Baseline, Soleu, Bowy, the basketball club) return across demos, so the montage reads as 3 coherent customer stories [V:15VhHR].
- **P10. Anchor one element when the average shot drops below 0.8 s.** The prompt bar stays locked for 3.8 s across 6 shots [V:15VhHR t=8.63-12.47s].

## 2.9 Stage transitions and the energy curve

- **E1. Mark every stage boundary with at least 2 of: a world or colour change, a music event, a motivated action (click, send, tap).** [inferred synthesis]
  - Wix's stage boundaries coincide with a drop (4.5 s), a suck-out (12.2 s), a re-entry (14.9 s) and a re-entry (33.4 s) [V:15VhHR].
  - Bumper flips between light and dark 7 times at claim/proof boundaries [V:19NRDv].
  - kivi's click blooms into the next chapter [V:1-6l8S t=36.95s]; HubSpot's send click is a match cut [V:1CSXtQ t=17.80s].
- **E2. Burst, then breathe.**
  - Chowdeck's energy runs in 2-4 s cycles [V:126cpH].
  - Solar alternates bursts of about 1.5-2.5 s with hero holds of 3.5-4.7 s [V:1Hcg3X].
  - Lottieicon runs fast → medium → slow (hero) → fast → long hold [V:1ccYWJ].
- **E3. Put one breather in films of 30 s or more.** Choose one:
  - A low-motion section at about 1/30 of peak motion energy (mean 1.08 vs peaks of about 33), right before the reassurance and CTA. NOSTRA's runs 4.7 s of 35 s, i.e. 13.4 % [V:1i2L14 t=25.93-30.63s]. The 12-15 % band is a single-reference rule [inferred]; kivi, HubSpot and Lottieicon spend about 11 % on their (non-low-motion) benefit sections (§2.1).
  - A filtered music breakdown under the densest UI. Bumper filters the bed at 24-32 s [V:19NRDv]; HubSpot drops to a pad under its CTA at 25.5-27.3 s [V:1CSXtQ].
  - **Don't** put a breather under 5 or more text-only cards. kivi's ambient section there reads as an energy dip [V:1-6l8S t=21.7-30.6s].
- **E4. Map the music arc to the story stages.**
  - Drop or groove entry at the first product beat (§2.1: 7-11 % of runtime, or about 43 % after a typed prologue).
  - Breakdown under the heaviest reading.
  - Build into the climax: Bumper's hi-band energy rises 3.4 → 6.2 % over 32-60 s [V:19NRDv].
  - Resolve on the logo (§2.11).
- **E5. The edit driver may switch halfway.** Speech- or feature-led in the first half, music-led in the second. This raises perceived pace without shortening shots [V:1-6l8S], [V:1CSXtQ]. HubSpot's beat drop sits at 43 % of runtime: everything before it is "intimate typing", everything after is "momentum" [V:1CSXtQ].

## 2.10 Climax patterns

| ID | Pattern | Spec (measured) | Evidence |
|---|---|---|---|
| **C-A** | **Collection fold** | Every output in one 3D deck: fan out with an ease-out over about 11 f, cruise about 7 f, accelerate out over about 21 f. Cut at peak speed into the opening motif's slot. The slot collapses to the heart in 6 f and the words close the gap in the same 6 f. | [V:15VhHR t=48.27-49.83s] |
| **C-B** | **Implosion into the logo** | Chips enter one by one on arcs (4-6 f stagger at 15 fps) onto a rotating ring. A small B grows over 8 f while the chips collapse into it. About 12 orange spark particles burst over 10 f, with a soft halo. | [V:19NRDv t=52.75-55.60s] |
| **C-C** | **Escalating word swap → product name** | A new word every 11-16 f with escalating height (10 → 13 → 18 → 27 → 34 % FH). The last word switches to the display face and types per letter at a 2 f stagger. Then a +8.9 % linear push over 33 f. | [V:19NRDv t=57.60-61.20s] |
| **C-D** | **Tagline punch** | The bookend tagline darkens from about 30 % to 100 % over about 0.6 s, pushes +7 % over 0.5 s, then punches +18 % in 8 f (expo-in). Hard cut on the beat (Δ1.5 f) to the wordmark, which carries the momentum as a decelerating +29 % push. | [V:1-6l8S t=69.62-72.27s] |
| **C-E** | **Climax triplet** | Three cards of 10-12 f each: hero word at about 44 % FH em ("So"), question at about 16.7 % ("Why wait?"), imperative at about 11.6 % ("Let's go!"). | [V:1ccYWJ t=38.00-39.07s] |
| **C-F** | **Emotional payoff, then a seamless move into the brand world** | "Order Delivered" fades in over about 15 f per line (3 f stagger) and holds 1.0 s. Then a 30 f S-curve camera tilt through a cloud layer into the lockup. | [V:126cpH t=13.60-16.53s] |
| **C-G** | **Wide calm + recap** | The widest, calmest shot of the film, then the earlier scenes return as strips that lock into exact thirds | [V:1Hcg3X t=30.63-34.87s] |
| **C-H** | **Mid-film hero beat** (when the end is all cards) | The film's only depth: 3D pull-back ×0.32 in about 1 s, particle disintegration over 0.95 s, ×2.3 dolly | [V:1CSXtQ t=17.80-20.47s] (59-68 % of runtime) |

**Climax rules**
- **C1. The climax starts at about 86 % of runtime (median; range 59-90 %; per-film values in §2.1).** Three films start earlier on purpose: HubSpot's hero beat sits at 59-68 % and is followed by card-only benefits; Bumper's extended 15.3 s finale starts at 68.6 %; Chowdeck's payoff starts at 75.7 % of an 18 s ad. *Why:* the last 10-15 % must hold the resolution (§2.3). Short films (≤ 30 s) start the climax at 70-80 % because the resolution floor of about 2.8-3 s is a bigger share of runtime [inferred].
- **C2. Crescendo, then rest.** The densest edit comes right before the stillest frame.
  - Bumper: 6 words in 2.3 s, then a 5.7 s still lockup [V:19NRDv].
  - Lottieicon: 3 cards in 1.07 s, then the CTA [V:1ccYWJ].
  - kivi: a punch, then a decelerating wordmark [V:1-6l8S].
  - *Why:* contrast in pace is what makes the end read as an end.
- **C3. The climax line restates the thesis in ≤ 5 words.** "Everything. Powered by Your Voice." / "Easy to ♥ love" / "Take payments like a PRO" [V:1-6l8S], [V:15VhHR], [V:19NRDv].
- **C4. The climax holds the film's one-off effects** (particles ≤ 12, the one flash, the spark burst) (CD-K3).
- **C5. Collect the "many" into the "one" (3/8: C-A, C-B, C-G).** *Why:* it is the visual form of "one platform", and it hands the meaning of every shot to the logo.

## 2.11 Ending: tagline, logo lockup, CTA

**Lockup patterns**

| ID | Lockup mechanism | Spec (measured) | Still hold | Audio | Evidence |
|---|---|---|---|---|---|
| L-A | Momentum carry → wordmark → symbol → URL | Hard cut on the beat. Wordmark 1.17 s with a decelerating +29 % push. Cross-fade to the symbol (9-10 f each way, 2 f overlap) for 3.26 s with a slow push. URL for 2.25 s (+12 % push). 14 f fade to white. | about 1.3 s on the URL, then the fade | Music fades −15 → −49 dB over the last 1.5 s | [V:1-6l8S t=71.10-77.78s] |
| L-B | Motif fills the frame → colour dissolve | The heart fills the frame (hard cut). An exponential red → navy dissolve: strong red gone in 8 f, settled in 25 f. Logo cap 12.2 % FH, 17 % FW. | about 1.7 s after it settles | Fade −29 → −78 dB over about 2.2 s | [V:15VhHR t=51.37-53.87s] |
| L-C | Letters toward the product word + QR | BUMPER revealed right→left at a 2 f stagger (10 f). Hold 14 f. The wordmark rises; the QR grows from a 1 px dot in 8 f; a scan line sweeps it. | about 4.6 s | Fade 63.5-66 s | [V:19NRDv t=61.47-67.20s] |
| L-D | Reprise at the identical position | Same lockup as mid-film (x 328 vs 327 px). Converges 8 px per side over about 9 f, then locked. | 2.2 s | 100 ms gap, then a full-band sting (−7 dB) held about 1.2 s and decaying | [V:1CSXtQ t=27.37-30.03s] |
| L-E | Seamless camera move into the brand world | 30 f S-curve tilt with a 10 f settle. The logo fades in during the last 8 f while riding up about 23 % FH to rest. | 1.4 s, with one tiny moving element (the rider) | n/a | [V:126cpH t=15.20-17.97s] |
| L-F | Click → logo → button press | The word swaps to the logo in 1 f. The pill pushes the logo up. The cursor approaches over about 25 f; press −20 % in 3 f; release in 6 f with no overshoot. | about 0.8 s (short) | n/a | [V:1i2L14 t=32.17-35.07s] |
| L-G | Action CTA with no logo (anti-pattern) | Circle → pill in about 7 f; the URL types at about 23 characters/s; a spinner; 33 f fade to black | n/a | Music ended 3.7 s earlier (flaw) | [V:1ccYWJ t=39.07-44.27s] |

**Ending rules**
- **L1. The final logo is the only fully still frame. Hold it 1.5-2.5 s (45-75 f) and let the music resolve on it.**
  - Measured holds are 0.8-4.6 s, median about 1.55 s (§2.1).
  - "Only still frame" is true for Wix, HubSpot, Bumper and NOSTRA. Chowdeck keeps one tiny moving element (the rider) [V:126cpH t=16.53-17.97s]. kivi never fully stills: the wordmark, symbol and URL all carry a slow push [V:1-6l8S t=71.10-77.78s]. Both read as finished, so "still, or still except one small ambient element" is the working rule.
  - The analysts' own rules ask for ≥ 1.5 s [V:126cpH], ≥ 2.2 s [V:1CSXtQ] and ≥ 4 s while the music fades [V:19NRDv].
  - [E] suggests a 75 f hold with the final hit on the logo frame (inferred in that source).
  - **Never** end the music before the picture [V:1ccYWJ].
- **L2. Logo size.** A single wordmark is 17-26 % FW. Caps wordmarks run cap 7-12 % FH, about 78-132 px at 1080p: Wix 12.2 % FH / 17 % FW [V:15VhHR], NOSTRA 7.2 % FH / 26 % FW [V:1i2L14]. kivi's lowercase serif runs 15-21 % FH ascender-to-baseline at 17-23 % FW [V:1-6l8S]. A wordmark + product name or a co-brand lockup is 50-57 % FW: [V:19NRDv], [V:1CSXtQ].
- **L3. Close the loop.** Repeat the hook's line, colour or motif in the lockup (6/8: kivi, Chowdeck, Wix, Bumper, HubSpot, and Solar's recap). *Why:* structural rhyme makes the film feel designed and finished.
- **L4. CTA = verb + destination, chosen by funnel stage.**

| Funnel stage | CTA form | Evidence |
|---|---|---|
| Awareness / brand | Tagline + logo, with the URL in the description or a soft URL | Wix (logo only) [V:15VhHR]; Superspace (tagline, no spoken CTA) [S:Superside]; Slack "LEARN MORE: slack.com" (YouTube description) [S:Slack] |
| Launch / consideration | "Try [Product] →", or a verb line naming the action | HubSpot's "Connect ChatGPT + HubSpot" / "and start growing better." [V:1CSXtQ t=24.77s]; [E] "Try Eleven v4 →" (sourced from descriptions) |
| Performance | Button with a verb, ≤ 16 characters and 1-3 words, plus an arrow and a verified offer | NOSTRA's BOOK NOW pill with a press [V:1i2L14 t=33.80s]; [S:PointCard] arrows (campaign level); [S:playbook] |
| Event / long form | The next step ("full list on our blog") | [S:Stripe] |
| Testimonial | 4-7 s tail with no speech | TR 4.2 s, Luminate 5.4 s, Nissan 6.8 s [S:playbook] |

- **L5. CTA text is readable: cap ≥ 5 % FH (≥ 54 px at 1080p).** HubSpot's CTA cards are 5.8 % FH cap [V:1CSXtQ]; NOSTRA's BOOK NOW is 5.3 % [V:1i2L14]. A URL at about 2 % FH was flagged as barely legible [V:1ccYWJ]. Keep URLs ≥ 3.5 % FH [inferred].
- **L6. Exit:** fade to white over 14 f on light films [V:1-6l8S], fade to black over about 33 f on dark films [V:1ccYWJ], or a hard end on silence after the sting tail [V:1CSXtQ].

## 2.12 Copy budget and reading time per stage

| Stage | Words on screen | Minimum screen time | Evidence |
|---|---|---|---|
| Hook | ≤ 7 (median 4); ≤ 5 in 9:16 and spots ≤ 15 s | 1.2 s for the whole hook | §2.5 (H2) |
| Statement / claim card | ≤ 6, one line | **≥ 0.3 s per word and ≥ 1.0 s in total for 3 or more words, counted from the first word's appearance on progressively built lines** | kivi 5-word lines on screen about 1.45 s (0.29 s/word) [V:1-6l8S t=37.25s, 69.65s]; HubSpot 3 words 1.0 s, 5 words 2.17 s [V:1CSXtQ t=21.60s, 22.60s]; Bumper lines legible 0.6-1.6 s [V:19NRDv] |
| Punch card (1-2 words) | 1-2 | 10-12 f, **only inside a climax run** | [V:1ccYWJ t=38.00-39.07s] |
| Payoff message | ≤ 6 | ≥ 1.0 s fully still after the reveal | Chowdeck's payoff holds 1.0 s [V:126cpH t=14.2s]; Solar's 0.4 s was flagged [V:1Hcg3X] |
| UI micro-copy | Any amount | Treat it as texture unless it is at least 2.5 % FH | 1-2 % FH was flagged as illegible in 5/8 |
| Whole film (no VO) | As few as 11 words in 54 s | n/a | [V:15VhHR] |
| VO-led film | 150-170 wpm, so 60 s of narration holds about 150-170 words | n/a | [S:playbook] |

For any line that is not progressively built, or for audiences reading in a second language, use the [N] formula: hold after landing = max(1.0 s, 0.33 s × words + 0.4 s, characters ÷ 17), × 1.15 for Hindi/Hinglish (the 0.33 s/word term is sourced to BBC subtitle guidance; the ×1.15 factor is marked [unverified] in [N]).

## 2.13 Beat-sheet template (one row per beat) and a worked 30 s example

**Fields an AI system must fill per beat**

`id` · `stage` (1-7) · `t_in`/`t_out` (s) and frames · `purpose` (one verb phrase) · `copy` (≤ 6 words; the accent word marked) · `proof object` (which real UI state or object) · `motif role` · `entry device` · `exit device` · `music event` (none, riser, hit, drop, suck-out, breakdown, sting) · `continuity anchor` (what stays fixed across the cut) · `world/colour` (which side of the world rule).

**Worked example: 30 s AI-feature launch, Minimal Premium, type-led, no VO.** This is a synthesis of [V:1CSXtQ] and [V:1-6l8S]; specific numbers are cited per row.

| # | Stage | Time · frames | Beat | Copy | Entry → exit | Music | Evidence |
|---|---|---|---|---|---|---|---|
| 1 | Hook | 0.00-2.00 · 0-60 | Question typed live on the light canvas | "Still writing reports?" (3 words) | Text by f3; words +7 f apart, re-centring over 13 f → 7 f light-wash wipe | Soft plucks | [V:1-6l8S t=0.10-1.73s] |
| 2 | Setup | 2.00-4.00 · 60-120 | The answer starts typing as a prompt | "Just ask." | Caret blink 0.3 s on / 0.3 s off; typing at 28-35 characters/s → hold | Near-silence | [V:1CSXtQ t=2.53-3.97s] |
| 3 | Reveal | 4.00-7.50 · 120-225 | The prompt line becomes the product UI; name lockup | Product name | Border and shadow 1-3 f, icon 3 f, toolbar 4-5 f → pull-back ×0.75 over about 25 f → lockup converges in 8 f | 0.3 s near-silence → riser crest on the lockup | [V:1CSXtQ t=7.80-10.63s] |
| 4 | Proof | 7.50-14.00 · 225-420 | Macro query, typing slows on the key noun | (UI text only) | Bar slides in 54 px over 6 f → send: the move accelerates into the cut | **Drop at about 7.6 s** | [V:1CSXtQ t=13.03-17.80s] |
| 5 | Proof (hero) | 14.00-20.00 · 420-600 | The only depth beat: data from the source UI turns into particles and flows into the answer; dolly through | (UI text only) | Match cut on upward motion → 3D pull-back ×0.32 in about 1 s → particles over 0.95 s → ×2.3 dolly → table builds | 70 ms of silence + a hit on the dissolve | [V:1CSXtQ t=17.80-21.47s] |
| 6 | Benefit | 20.00-23.50 · 600-705 | Two benefit cards, each shrinking 13-24 % | "No setup." / "Your data, *answered*." | Blur-dissolve in (8 f) → word-spacing match cut | Kick | [V:1CSXtQ t=21.47-24.77s] |
| 7 | Climax | 23.50-25.00 · 705-750 | Bookend tagline; expo punch +18 % in the last 8 f | "Ask. *Done.*" | Line darkens over about 0.6 s → hard cut on the beat | Build to a hit | [V:1-6l8S t=69.62-71.10s] |
| 8 | Resolution | 25.00-27.00 · 750-810 | CTA card | "Try [Product] →" | Enters spaced and tightens over 8-10 f → shrink + fade | Pad breakdown | [V:1CSXtQ t=24.77-27.37s]; [E] |
| 9 | Resolution | 27.00-30.00 · 810-900 | Lockup reprised at the beat-3 position; still ≥ 2.2 s | Logo | Converge 8 px per side over about 9 f → still | 100 ms gap → sting on the logo | [V:1CSXtQ t=27.37-30.03s] |

## 2.14 Storytelling principles by class

**Universal (confirmed in 3 or more references)**
1. In motion by f3; hook 1.2-2.4 s; ≤ 7 words, ≤ 5 in 9:16 and spots ≤ 15 s (H1-H3).
2. Name by about 2-8 s, and the product or its mechanic visible by 8 s (R1).
3. The reveal is an audio event (R2).
4. Proof takes about 50-65 % of runtime and repeats one demo grammar (P1, TS2).
5. Show first, label second (P4).
6. The climax starts at about 86 % and is the densest edit before the stillest frame (C1, C2).
7. Bookend: the end rhymes with the beginning (L3).
8. The logo hold is the only still frame; the music resolves on it (L1).
9. Every stage boundary is marked by a world change, a music event or an action (E1).

**Style-specific**
- Claim/proof alternation with a light/dark flip: kinetic launch [V:19NRDv].
- Say → see loop with a colour bloom: calm AI [V:1-6l8S].
- Typed-prompt prologue with the beat drop at about 43 %: prompt-native [V:1CSXtQ].
- Copy-framework stages and a breather: editorial promo [V:1i2L14].
- Single transaction animated on twos: playful consumer [V:126cpH].
- Energy chain with a recap triptych: editorial explainer [V:1Hcg3X].

**Experimental:** see §1.9. The story-relevant ones are the visible chapter bar, the brand-in-pun reveal, the escalating word swap, the slot machine and the recap triptych.

**Avoid:** see §1.10. The story-specific ones:
- a static open,
- a long problem stage in launch films,
- 5 or more text-only cards in a row,
- a payoff readable for under 0.5 s,
- a missing or verb-less CTA,
- music ending early,
- a brand that appears only once, early.

**Especially good for SaaS:**
- T4 prompt-native for LLM features.
- T1 say → see for input → output products.
- T2 claim → proof for ops/fintech.
- R-D / R-E transformation reveals.
- P6 context → extraction → focus.
- P9 recurring customer stories.
- C-B implosion for "one platform".
- L-D reprised co-brand lockup for partner launches.

## 2.14b Premium vs amateur, per story element (when, why, how fast)

| Element | When to use it | How fast (measured) | Reads premium (observed) | Reads amateur (observed) | Why |
|---|---|---|---|---|---|
| **Hook** | Always; it is frame 0 and the autoplay preview | 1.2-2.4 s total; first event f0-f3; hero word settles in 6-13 f with expo-out; exit in 7-10 f at peak velocity | Motion on f0 and an expo-out landing ("Take" 4.05× → 1× in 8 f [V:19NRDv t=0.00s]); a cut at peak velocity before the settle [V:1CSXtQ t=2.13s]; an 8 f expo-in whip whose direction the next shot continues [V:1Hcg3X t=1.53s] | 20 static frames before the first event [V:126cpH t=0.00-0.73s]; hook cap 3.6 % FH, weak on phones [V:1CSXtQ] | The first 3 s carry 47 % of campaign value [N]; a moving frame 0 removes the "loading" feel [V:19NRDv] |
| **Reveal** | First product beat, by ≤ 8 s | Logo micro-sequence 0.9-1.9 s (form → fill → finish); near-silence 0.1-0.35 s before; hit or drop within 0-8 f | The opening line or icon turns into the UI (6 f stretch + 6 f fade [V:15VhHR t=3.97-4.23s]); the music drops on the decisive click (−15 → −35.5 dB [V:15VhHR t=12.20s]) | The brand shown once, early, and never again (1.9 s at 2.6-4.6 s [V:1ccYWJ]); a logo landing mid-groove with no mix change [inferred] | The viewer never leaves the brand world, and silence makes the next frame an event (R2, R3) |
| **Proof block** | 28-82 % of runtime; one grammar, 3-5 loops in films ≥ 45 s | Blocks 4.4-14.75 s, median about 8 s, shorter later; an event every 0.5-1.5 s inside long shots; UI micro-interactions at 100-200 ms | Real states and data (GBP amounts, merchant IDs [V:19NRDv]); show, then label [V:1-6l8S t=20.43s, 25.47s]; one anchored element through fast cuts [V:15VhHR t=8.63-12.47s] | Unlabelled metaphor parades [V:1i2L14 t=19.95-30.63s]; UI micro-text of 1-2 % FH (5/8); greeked or low-res UI in the 3D hero shot [V:1CSXtQ t=18.4-19.0s]; a one-off stock photo [V:19NRDv t=29.97s] | Repetition teaches the grammar, so later loops cost the viewer nothing (TS2) |
| **Climax** | At about 86 % (70-80 % in ≤ 30 s films), or as a declared mid-film hero beat | 1.0-1.9 s for a short climax (cards of 10-16 f each), or 10-15 s for an extended kinetic finale; then a hard stop | The fastest edit right before the stillest frame (6 words in 2.3 s, then a still lockup [V:19NRDv t=57.60-61.47s]); one-off effects only here (≤ 12 particles over 10 f [V:19NRDv t=55.27s]) | A payoff readable for 0.4 s [V:1Hcg3X t=29.80s] or a status shown for 2 f [V:126cpH t=13.53s]; the same cutting pace through the lockup [inferred] | Contrast in pace is what makes the end read as an end (C2) |
| **Lockup + CTA** | Last 7.9-17.5 % of runtime (median 8.9 %) | Letters at a 2 f stagger, CTA scale-up in 8 f, lockup converge in 8-9 f; hold 1.5-2.5 s (up to 4.6 s while the music fades) | A callback lockup at the identical mid-film position (x 328 vs 327 px [V:1CSXtQ t=27.37s]); the music resolving on the logo (sting −7 dB held about 1.2 s [V:1CSXtQ t=27.85s]; fade −29 → −78 dB over 2.2 s [V:15VhHR t=51.2-53.4s]); a verb CTA at cap ≥ 5 % FH | Music ending 3.7 s before the picture [V:1ccYWJ t=40.5s]; a bare URL [V:1-6l8S t=75.53s]; no CTA [V:126cpH]; a URL at about 2 % FH [V:1ccYWJ]; a 1-frame dip to black [V:19NRDv t=25.60s] | The logo inherits the meaning of every earlier shot only if the end rhymes with the start and the audio closes on it (L1, L3) |

## 2.15 Do / Don't pairs

| Do | Don't | Evidence |
|---|---|---|
| Put an oversized, moving hero word on frame 0 | Fade up from black to a centred logo | [V:19NRDv t=0.00s]; [N] |
| Ask one 2-5 word question the product answers | Open with a 9 s problem monologue in a launch film | [V:1-6l8S t=0.10s]; §2.6 S1 |
| Turn the opening line or icon into the product UI | Cut from a brand title to a cold screen recording | [V:15VhHR t=3.97s] |
| Drop the music ≥ 15 dB on the decisive click, then build the result in 12 f | Reveal mid-groove with nothing changing in the mix | [V:15VhHR t=12.20s] |
| Repeat one demo loop 3-5 times and shorten it each time | Give each feature a new layout, a new metaphor and a new transition | [V:1-6l8S]; [V:1i2L14] (flaw) |
| Show the auto-correct first, then name the feature | Put a feature-name card before any proof | [V:1-6l8S t=20.43s, 25.47s] |
| Count only after the viewer has seen the wall of assets | Open a proof block on a bare number | [V:1ccYWJ t=7.30-9.93s] |
| Colour-code states (red, red, teal) so the story reads without labels | Annotate every state with a caption | [V:19NRDv t=39.87-45.0s] |
| Collect every output into one object, then fold it into the logo | End the demos and cut straight to a static logo | [V:15VhHR t=48.27-51.37s]; [V:19NRDv t=55.0s] |
| Make the climax the fastest edit, then hold the logo still for 1.5-2.5 s | Keep cutting at the same pace through the lockup | [V:19NRDv t=57.60-67.20s] |
| Resolve the music on the logo frame (sting or fade) | Let the bed end 3.7 s before the picture | [V:1CSXtQ t=27.85s]; [V:1ccYWJ] (flaw) |
| End with a verb CTA ≥ 5 % FH plus the lockup | End on a bare URL, or with no CTA | [V:1CSXtQ t=24.77s]; [V:1-6l8S] (flaw) |
| Insert a UI beat after at most 4 text cards | Run 6 text-only cards in 5.9 s | [V:1ccYWJ] (flaw) |
| Keep the payoff fully still for ≥ 1.0 s | Whip the payoff message away 0.4 s after it completes | [V:126cpH t=14.2s]; [V:1Hcg3X] (flaw) |

## 2.16 Story QC gate (run before generating or animating any shot)

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

## 2.17 Where the references overrule generic advice (story)

1. **Problem-agitate-solve with a long problem stage** (common generic advice; the Superspace pain triad runs 9.3 s [S:Superside]). Only 2 of the 6 SaaS/app references have an explicit problem stage, and it is ≤ 5.2 % of runtime. **References win** for launch and promo films. Keep the longer problem for VO explainers and agency promos.
2. **A "confident voiceover"** ([W:motion.so]) and narration at 150-170 wpm ([S:playbook]). 6/8 references are type-led with no narrator. **References win** for launch films; VO is a style option for explainers, onboarding and testimonials.
3. **The 30 s storyboard with the product reveal at 0:14-0:24 and a 6 s lockup (20 %)** ([W:motion.so], the homepage sample). The references show the product or its mechanic by ≤ 8 s, and the resolution has a median of 8.9 % (about 4.7 s). In 30 s films the resolution runs 8.3-17.5 %. **References win:** reveal earlier, and give the lockup with CTA 2.9-5.3 s.
4. **"Name the product by about 10 s"** ([S:playbook]). This is consistent, but the references are stricter (median 2.2 s). **References win** for type-led films; 9-10 s is acceptable only for VO-led explainers.
5. **"Average shot 3-4 s, title cards 1.5-2.5 s, UI demos 4-6 s"** ([E], inferred there). The references' ASLs are 1.58-3.00 s and their title cards hold 1.0-2.3 s. **References win.**
6. **Reading-time formula** ([N]: 0.33 s/word + 0.4 s after landing, so 2.4 s for 6 words). The references hold progressively built 5-6 word lines on screen for about 1.45-2.2 s in total (0.29-0.45 s/word), because reading starts during the build. **References win** for progressively built lines of ≤ 6 words. The [N] floor of 1.0 s and the formula still apply to lines that land all at once.
7. **On-screen text changes every 2.5-3.5 s** ([S:playbook], measured on VO caption tracks). Type-led references change cards every 1.0-2.3 s. **References win** for type-led films.
8. **"Cut on the beat" as a universal rule.** Only Bumper is beat-locked throughout (11 of 18 cuts land 0-2 f ahead of a beat), and kivi and HubSpot cut to the music only in their back halves. The rest sync at section level or lock SFX to motion. At story level, **align stage boundaries with music events (E1, E4)**, and treat cut-level beat-locking as a style choice (covered in the editing part).

## 2.18 Evidence gaps and confidence

- **90 s structure:** extrapolated from 67-78 s references. The longer Superside tours (115-169 s) are VO-led and mostly have inferred timing. *Confidence: medium-low.*
- **Vertical 9:16:** one reference (Chowdeck), which is a phone capture of an After Effects comp and may be truncated. *Confidence: low.*
- **CTA and endings:** only 3/8 references show an explicit verb or action CTA (HubSpot, NOSTRA, Lottieicon), and two endings may be truncated (Chowdeck, Solar). The CTA rules rest partly on [S:playbook] text evidence. *Confidence: medium.*
- **Positioning dial:** these are per-video analyst judgements, not measurements. *Confidence: medium.*
- **Customer voice, testimonials, long-form and event recaps:** text-only evidence ([S]). *Confidence: low for timing, medium for structure.*
- **3D hardware or "3D technology film" storytelling:** none of the user's references is a hardware or full-3D product hero film. *Confidence: low.*
- **Strongest evidence:** hooks, reveal mechanics, proof-block grammar, climax and lockup specs, and colour semantics, all measured frame by frame in 5-8 references.

---

## Audit (adversarial pass, 2026-10-08)

Method: every row of §2.1 was recomputed from the Story Structure tables in the eight per-video analyses (row sums, medians and shares all reproduce within 0.1 s / 0.1 pp). Hook, reveal, climax and lockup specs were spot-checked against the frame studies, and web-sourced claims against superside-playbook.md, superside.json, motion-numbers-brief.md, voice-footage-pipeline-brief.md, elevenlabs-style-brief.md, motion-so.md and showreel-design.md. The §2.3 arithmetic (seconds, frames and % per column) was re-added.

Fixes made (18):
1. **QC gate #8 contradicted §2.3 and three references.** It required the climax at 80-90 %, but the §2.3 table puts it at 70 % (15 s) and 78 % (30 s), and Chowdeck (75.7 %), Bumper (68.6 %) and HubSpot (59.3 %) start earlier. The gate now follows the §2.3 column and allows declared exceptions.
2. §2.3: added a note on where the table puts the climax (70-82 %) and why that is earlier than the 86 % reference median [inferred].
3. C1: named the three early-climax references and added the short-film rule [inferred].
4. §2.1: added the per-film climax-start values behind the "≈ 86 %" median.
5. §2.1 final-hold row: kivi's "hold" is a URL with a +12 % push (not still), Chowdeck keeps a moving rider, and Lottieicon has no logo card. These are now stated.
6. L1: "the logo is the only still frame" is now qualified (true in 4/8; kivi never fully stills).
7. §2.1: the median brand-name time is restated as about 2.2-2.4 s, because the Wix value is itself inferred.
8. §1.11: "AI is acting" lasted "8-15 f", which no analysis measured. Replaced with the measured 4 f, 7-11 f and 12 + 6 f values [V:15VhHR].
9. §1.10: Chowdeck's opening is now described precisely: 20 static frames, a pill nudge at f20-f22, then the pop at 0.73 s.
10. §1.10: the Lottieicon "6 text cards" failure now explains that 3 of them are the C-E climax triplet that §2.10 recommends, which removes an apparent contradiction.
11. CD-U4: Wix's "no overshoot" is limited to UI; its analyst allows a subtle overshoot on the chip and heart pops [inferred].
12. Hook table: the Lottieicon zoom-through is 3 f of ease-in, then ×1.36 per frame (about 20× in 10 f), not ×1.36 for all 10 frames.
13. H2: listed the per-film word counts behind "median 4" and tagged the speech-pace rationale [inferred].
14. H5: the 6.5 % FH threshold is tagged as inferred from the observed values.
15. H6 and CD-T1: [N] figures that [N] itself marks [unverified] (key message within 3 s on TikTok; 1-7 words / ≤ 32 characters) are now tagged that way.
16. §2.12: the reading-time formula now separates the sourced term (BBC, 0.33 s/word) from the unverified ×1.15 Hindi factor.
17. E3: the 12-15 % breather band rests only on NOSTRA (13.4 %), so it is tagged [inferred]. Added the measured energy ratio (mean 1.08 vs peaks of about 33).
18. **Coverage added: §2.14b "Premium vs amateur, per story element".** It gives when, how fast, premium markers, amateur markers and why for the hook, reveal, proof, climax and lockup/CTA, each with a [V] citation.

Verified with no change needed: all §2.1 stage durations and medians; the §2.3 sums; hook specs (kivi f3 / +7 f / 13 f; Bumper 4.05× in 8 f; HubSpot −17 % tracking; Solar 5/8/9 f stagger and 8 f whip; NOSTRA 93 % in 8 f; Lottieicon bell); reveal specs R-A to R-I; climax specs C-A to C-H; lockup specs L-A to L-G; the music-turn times; proof-block lengths; the kivi white-transition count (12 of 32); Superspace (9.28 s), Airtable chapters (0:10, 9-14 s), the 150-170 wpm figure, the showreel.design VO count (7 of 243), the motion.so storyboard (reveal 0:14-0:24, lockup 0:24-0:30), the Veo 3.1 clip lengths, and the [E] "Try Eleven v4 →" / 75 f hold (marked inferred in [E]).

Remaining known gaps:
- The 90 s column is extrapolated from 67-78 s films, and the §2.3 table as a whole is a synthesis, not a measured template.
- 9:16 rests on a single, possibly truncated phone capture (Chowdeck).
- Only 3/8 references show a verb CTA, and two endings may be truncated, so the CTA and funnel-stage rules lean on text sources.
- No hardware or full-3D product hero film is among the references.
- The positioning-dial percentages are analyst judgements.
- Superside beat timings are mostly inferred except Superspace, TR, Luminate, Nissan, Airtable and Figma. Testimonial and long-form timing is text-only.
- The audit spot-checked about 70 % of the frame-level numbers in §§1.3-1.11 and §2.5-2.11. It did not re-derive every pixel or dB value (for example the colour hexes in §1.4 and the CD-K1 motif timestamps).
