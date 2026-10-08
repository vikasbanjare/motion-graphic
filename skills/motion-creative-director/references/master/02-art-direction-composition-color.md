# Master SaaS Motion Design System, Part 02
## Master §3 Art Direction Rules · §4 Composition Rules · §11 Color & Lighting Principles

Draft v1, 2026-10-08. Built from eight frame-measured teardowns of the user's own reference folder, plus text-only research. A senior motion designer, an editor or an AI video system should be able to follow every rule here without guessing.

---

## 0. How to read this section

**Units**
- **% W / % H**: percent of frame width / height.
- **px @1080p**: a 16:9 frame of 1920×1080. **px @1920p**: a 9:16 frame of 1080×1920.
- **f**: frames at 30 fps (1 f = 33.3 ms).

**Evidence tags**
- **[V:xxxxxx t=..s]**: the user's reference videos (frame-level measurement, the strongest evidence). The six characters are the start of the file id.
- **[S:brand]** / **[S:playbook]**: Superside text research (style intent only, never frame timing).
- **[E]**: ElevenLabs style brief (brand pages and open-source orb/waveform code; video motion there is mostly inferred).
- **[N]**: design-system tokens, WCAG and broadcast/platform safe-zone research.
- **[P]**: voice and footage pipeline facts (Veo/Flow prompting).
- **[W:site]**: inspiration-site catalogues (titles and descriptions only).
- **[inferred]**: my judgement, not directly observed or sourced.
- **(computed)**: a contrast ratio I calculated from sourced hex values with the WCAG 2.x relative-luminance formula. The inputs are cited next to it.

**Priority.** The user's references outrank generic advice. Where they disagree, a **"References win"** note says so and explains why. Text-only sources support intent and structure, never frame-level timing.

**Rule IDs.** AD = art direction (§3), CO = composition (§4), CL = colour and lighting (§11). U = universal, S = style-specific, X = experimental, A = avoid, SaaS = especially good for SaaS. Use the IDs in prompts and in the QC gate.

### 0.1 Reference roster

| Tag | Reference | Frame / length | Dominant canvas | Style label (from its teardown) |
|---|---|---|---|---|
| [V:1-6l8S] | kivi, voice-AI dictation launch film | 16:9, 77.8 s | Light: white #F9FAFC plus a moving mint aurora | Minimal Premium × Soft-Cinematic UI demo ("Airy Aurora / Calm-Tech") |
| [V:126cpH] | Chowdeck food-delivery app ad (measured through a crop of an After Effects screen capture) | 9:16, ~18 s | Mid-tone colour fields (teal, cream) | Playful illustrated collage + UI demo |
| [V:15VhHR] | Wix AI website builder, brand + product film | 16:9, 53.9 s | Cream / navy brand frames; full-bleed editorial photography for the product | UI-focused AI demo inside an editorial brand frame |
| [V:19NRDv] | Bumper PRO payments launch | 16:9, 67.2 s | Alternating: navy claims, lavender-white proof | Kinetic-type SaaS launch with 3D UI proof ("Night claim / Day proof") |
| [V:1CSXtQ] | OpenAI × HubSpot ChatGPT-connector launch spot | 16:9, 30 s | White (after a 2 s black teaser) | Minimal Premium × UI demo with one 3D beat ("Prompt-native launch") |
| [V:1Hcg3X] | "How do solar panels work?" explainer | 16:9, 35.8 s | Flat colour fields (cyan, vermilion, cream, oxblood) | Editorial 2.5D "risograph" explainer |
| [V:1ccYWJ] | Lottieicon animated-icon library promo | 16:9, 44.3 s | Black lit by a moving deep-green aurora | Fast Startup Launch × UI demo ("Dark neon-accent asset reel") |
| [V:1i2L14] | NOSTRA motion-studio promo | 16:9 inset inside a 3:2 player wrapper, 35 s | Alternating emerald / off-white | Monochrome brand-system explainer |

**Measurement caveat.** All eight files are sub-HD at low bitrates: six are 1138×640 or 1280×720, Chowdeck was measured through a ≈256×470 crop of a 640×1138 phone capture, and NOSTRA's content is a 1011×567 inset. Treat sampled hex values as ±3-5 levels of encode noise [inferred]. Four teardowns flag their palette hex as "not re-measured" in verification ([V:1-6l8S], [V:15VhHR], [V:19NRDv], [V:1ccYWJ]). The ratios and roles are reliable; the last digit of a hex value is not.

### 0.2 Defaults card: the twenty numbers to encode first

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

---

# Master §3. Art Direction Rules

## 3.0 What art direction means here, and why it matters

Art direction is the set of decisions that make 30 to 80 shots read as one object. In all eight references the premium read comes less from any single effect than from a **small, closed vocabulary repeated with discipline**:

- kivi runs 33 shots on one sans, one serif wordmark, a three-colour accent family (mint, lime, aqua), one glass card and one punch device [V:1-6l8S].
- Bumper repeats one type behaviour (oversize slam → word build → pull-back) about 12 times, with one orange [V:19NRDv].
- Lottieicon keeps "one accent and one sans family across all 25 shots" [V:1ccYWJ].
- HubSpot keeps about 92-95% of every 2D frame white, with one accent colour that carries meaning [V:1CSXtQ].

**Why it works.** The viewer learns the grammar in the first 5-10 s. After that, each new shot reads as "more of the same product", and every change is free to carry information instead of novelty. A closed vocabulary also makes an AI-generated film far easier to keep consistent, because every shot prompt can restate the same few tokens [inferred].

## 3.1 Universal principles

**AD-U1. Close the material budget before production.**
Per film:
- 1 primary sans family in 2-3 weights.
- At most 1 contrast face, used for exactly one role.
- 1 brand accent hue (see CL-U3).
- ≤3 rendering idioms film-wide (for example flat vector, real UI, photography). Default ≤2 in any single frame, never more than 3.
- Each special material (frosted glass, glossy 3D, refraction, grain) introduced once and reused for the same meaning. Never one new material per section.

Evidence:
- kivi uses a single serif against an all-sans system for the wordmark only [V:1-6l8S].
- Lottieicon uses its serif italic only on the four audience words, "a deliberate accent that is never reused" [V:1ccYWJ t=5.4-7.3s].
- NOSTRA uses its grain-gradient 3D, glossy phone and glass tiles "once each" and warns against "a new texture or material per section" [V:1i2L14].
- Wix limits 3D to three moments: heart, ice bottle, card deck [V:15VhHR].
- Chowdeck's mosaic briefly mixes flat illustration, photo cut-outs, a wordmark tile and blobs. Its teardown flags the collision and caps idioms at 3 per frame [V:126cpH t=5.9-8.4s].

Why: every new material is one more rule the viewer has to learn, and attention spent on the look is attention taken from the product.

**AD-U2. Give every colour, material and effect exactly one meaning, and declare it in a semantic table before any shot is made.**
Observed semantic systems:

| Meaning | Treatment | References |
|---|---|---|
| Solution, "alive", on | The brand accent family; colour floods in | kivi: light, mint and aurora mean "kivi" [V:1-6l8S]. Lottieicon: "Green = the product's life", so anything animated, selected or on gets #38D037 [V:1ccYWJ]. |
| Problem, before, human friction | Grey, desaturated or black-and-white, dimmed | kivi's life scenes start in B&W and bloom into colour when the voice starts [V:1-6l8S t=18.57-19.33s, 54.0-55.4s]; a desaturated "chore" card [S:Duolingo, inferred]; desaturated friction steps [S:Bolt, inferred] |
| AI is working | One reserved gradient family, transient (8-15 f), always settling to final colours | Wix: cyan→indigo gradient text, iridescent pastel field, thermal duotone, pixel mosaic, violet halo, used about 9 times [V:15VhHR]. kivi: a gloss sweep marks AI-enhanced text [V:1-6l8S t=15.0-15.8s]. |
| Claim vs proof | Dark canvas vs light canvas | Bumper navy claims vs lavender-white proof [V:19NRDv] |
| Chapter | Background colour per chapter | Chowdeck: teal = brand and promise, cream = product and order, light grey = map [V:126cpH] |
| System status | Status hues only inside UI | Bumper: fail red #EC243C, success teal #34ACB4, matched mint #D4F4EC, chargeback yellow #ECDC9C, fraud pink #E48494 [V:19NRDv] |
| User agency, selection | 1 px selection box with square handles | Wix [V:15VhHR]; NOSTRA [V:1i2L14] |
| Key word | Accent on one word or phrase per line | Bumper [V:19NRDv], NOSTRA [V:1i2L14], kivi's sage second phrase [V:1-6l8S] |

Why: once a colour has a learned meaning you can delete labels. Bumper tells "provider fails, reroutes, succeeds" with red, red, teal and no labels [V:19NRDv t=39.9-46.1s]. Wix's tone rewrite needs no caption because cyan already means "AI" [V:15VhHR t=36.6s].

**AD-U3. Build two visual worlds and signal which one the viewer is in by the canvas, not by labels.**
World A is the brand / claim / problem world. World B is the product / proof / solution world. They are separated by polarity, colour or texture:
- Wix: cream or navy brand frames with small type vs full-bleed editorial product world [V:15VhHR].
- Bumper: navy claims vs lavender-white proof. This is mostly but not strictly kept: the chart, network and chip ring are proof on navy [V:19NRDv].
- kivi: white and aurora for kivi vs grey and desaturated plates for "before" [V:1-6l8S].
- HubSpot: a 2 s black "announcement", then the white product world [V:1CSXtQ t=0-2.13s].
- Lottieicon: aurora gradient behind every text card vs pure black behind UI and grid shots [V:1ccYWJ].

Why: the canvas switch tells the viewer whether to *read* or to *watch* before any element appears, so dense proof shots never get confused with claims [V:19NRDv rule 4].

**AD-U4. Show the real product, art-directed, not decorated.** UI must show real states with believable data. Every abstraction (particles, light, morphs) must be made *from* the product's own colours and objects.
- HubSpot's data-transfer particles are made of the HubSpot window's own colours: navy dots from the dark sidebar, white dots from the canvas [V:1CSXtQ t=19.0-19.95s].
- Bumper's tables carry merchant IDs, GBP amounts and believable decimals [V:19NRDv].
- Wix uses real Wix UI and art-directs each generated site as a recurring sub-brand [V:15VhHR].
- Chowdeck's UI segment follows real app states [V:126cpH].
- Text sources agree: "no stock footage, no fake UI, no generic neon technology visuals" [W:motion.so]; app UI outperformed shots of the physical card [S:PointCard].
Why: the hero moments are the ones viewers scrutinise, and that is exactly where greeked or low-res UI gets caught (HubSpot's greeked window at 18.4-19.0 s is its own listed flaw [V:1CSXtQ]).

**AD-U5. Spend depth, 3D and effects on one idea.** Reserve the richest treatment (true 3D, DOF, particles, motion blur) for the beat that most needs explaining, and keep the rest flat.
- HubSpot's only 3D, DOF and particle beat (17.8-21.5 s, 3.7 s of 30 s) explains data moving from HubSpot into ChatGPT [V:1CSXtQ].
- Wix uses 3D three times [V:15VhHR].
- kivi's only 3D object is a glossy cursor [V:1-6l8S t=36.2s].
- Bumper is the counterexample: 3D glass UI in every proof scene. That works only because "3D UI proof" *is* its style (see AD-S3).
Why: contrast makes the hero beat unmistakable, and keeps render or generation cost where it pays.

**AD-U6. Lock the plate style and the light.** Every background plate, illustration and generated footage clip in a film shares one rendering style, one key-light direction and one grade.
- kivi's plates switch between gouache (desk), watercolour (courtyard) and flat illustration (office), and the teardown's fix is "lock one rendering style and one light direction for all plates, or use real photography" [V:1-6l8S].
- The solar film mixes rightward battery shadows with down-left token shadows [V:1Hcg3X].
- Wix's page-in-world composite shows a slight horizon and light mismatch between the page photo and the world photo [V:15VhHR, inferred, low-res].
For AI video this is the most common identity-drift failure. Restate the plate-style token, light direction and grade in every shot prompt [inferred], and pin the look with the generator's own references: Veo accepts up to 3 `reference_images` per call and Flow up to 3 "ingredients" [P], so pass the same 1-3 approved plate frames to every shot instead of re-describing them. Check the result by comparing cast-shadow direction and the brightest-plate tone shot to shot (CL-U19, CL-U11) [inferred].

**AD-U7. Bookend the colour world.** Open and close in the same canvas, colour and position.
- Chowdeck: teal bookends [V:126cpH].
- Wix: the opening sentence's heart slot returns and fills the frame for the logo [V:15VhHR t=49.63-51.37s].
- HubSpot: the lockup is reprised at x = 328 px vs 327 px [V:1CSXtQ].
- kivi: the aurora returns for the climax tagline [V:1-6l8S t=69.62s].
- Bumper: the hook line returns for the finale [V:19NRDv t=56.67s].
Why: closure. The last frame inherits everything the film taught.

**AD-U8. Treat absence as part of the look.**
- None of the eight references uses chrome, decorative lens flares or random particle fields.
- The only glints are motivated by an object: a star glint on a solar panel's corner [V:1Hcg3X t=0.03-1.5s], and a specular streak across refractive ice on one cut frame [V:15VhHR t=31.40s].
- Wix: "no particles, lens flares or chrome" [V:15VhHR]. kivi: "no particles, bounces or 3D gimmicks" [V:1-6l8S]. HubSpot: "no glows or light leaks" [V:1CSXtQ].
- Particles appear only where they *are* the content: HubSpot's data, the solar film's electrons, Bumper's ≤12 sparks used once [V:19NRDv t=55.27-55.6s].
- Overshoot on UI appears in only one, playful reference: Chowdeck's tossed card overshoots about 4° [V:126cpH t=9.43-9.60s]. kivi, Bumper, HubSpot, Wix and Lottieicon use none.
Why: decoration that carries no meaning reads as template, and template reads as cheap.

**AD-U9. Make the transitions and light belong to the brand.** Pick one or two "connective materials" and route most changes through them:
- kivi: white light. 12 of its 32 transitions are white blooms or washes, and "white is the neutral room of the film" [V:1-6l8S].
- NOSTRA: polarity flips, on 11 of 13 hard cuts [V:1i2L14].
- Lottieicon: the persistent green aurora [V:1ccYWJ].
- Solar: a colour-field change on almost every cut [V:1Hcg3X].
Why: a consistent connective material turns many cuts into one continuous breath (detail in §11.8).

## 3.2 Style-specific art direction

Choose one row per film. Mixing rows breaks AD-U1.

| ID | Style | Canvas and accent logic | Materials and depth | Light and texture | Best for | Evidence |
|---|---|---|---|---|---|---|
| AD-S1 | **Airy Aurora / Calm-Tech** | White #F9FAFC with drifting mint #E0F5EB, green #8EE1B2 / #5FE7A0, lime #E1F3BA and aqua blobs. Text: near-black #0B0B0B plus a deep sage text tone (#556962 / #396454) on the benefit phrase. | Frosted glass cards (≈80-85% W) over heavily defocused painterly life plates: a three-plane stack | White blooms as transitions; B&W → colour bloom on "before" plates; no grain; no motion blur | Voice/AI assistants, consumer-friendly SaaS, wellness tech | [V:1-6l8S] |
| AD-S2 | **Prompt-native minimal** | Pure white #FFFFFF (92-95% of every frame), ink #1A1A1A, one brand accent (#F65542) as an icon, one system blue (#3585E4) for toggles. Optional 2 s black cold open. | Flat 2D UI with soft drop shadows; one 3D studio beat with real DOF and particles | No glow, no leaks; soft diffuse studio light in the 3D beat (#C8D4DF → #F4F5F8 radial, gentle vignette) | AI/LLM features, integrations, connectors | [V:1CSXtQ] |
| AD-S3 | **Night claim / Day proof** | Claims on navy #020047-#06004E with a coral glow top-right and violet light at the floor; proof on lavender-white #F4F4FC with a periwinkle #C4C4EC corner vignette; one orange accent (#F4643C large, #E46C54 small) | Glassy translucent 3D UI planes, soft contact shadows, shallow DOF, directional motion blur, orbit rings | Bloom on white type over dark, so the look feels "lit" rather than flat. Observed ≈15-20 px @1080 on a hero word; keep it ≤3% of cap height (see §11.7) | Fintech, payments, B2B ops; any "unify / automate" product | [V:19NRDv] |
| AD-S4 | **Editorial brand frame + product montage** | Brand frames: warm off-white #F9F5F2 or navy #02003E, small regular type, one saturated accent (red heart #DB2C36). Product world: real UI over art-directed photography with its own bold palettes. One reserved AI colour family. | Real UI; page windows floating over matching photography; 3D only for 2-3 hero objects | Hard sunlight in the photography; no grain | AI builders, creative tools, platforms with customer content | [V:15VhHR] |
| AD-S5 | **Dark neon-accent library** | Black #000 lit by deep-green radial blobs (#061506 → #114110); one neon accent #38D037 = alive / selected; white #F5F7F5 type; UI greys #E8EAE8 / #CACACA | 2.5D extruded cards (accent edge 6-8% thick), dome horizon, DOF bubbles | Emissive under-glows (falloff ≈10% H), highlight-tile glow ≈20% of tile size, glow ramps as anticipation | Icon/UI kits, Lottie/template libraries, dev and creator tools | [V:1ccYWJ] |
| AD-S6 | **Monochrome brand system** | One saturated hue #2FC06C, off-white #F4F5F4 (never #FFFFFF), near-black #161616, a 30%-tint mint only for gradients; background polarity flips on ≥75% of hard cuts | Flat 2D shapes and type, plus single accents: grain-gradient 3D characters, one glossy inflated 3D object, frosted glass tiles | Depth from fog and scale; faint mint corner glow top-right | Agency and service promos, LinkedIn ads, brand-system showcases | [V:1i2L14] |
| AD-S7 | **Retro-editorial risograph** | A strict 5-colour flat palette: cyan #4DD9E5, vermilion #E12E16, cream #F6F1ED, oxblood #1D0B0A, mustard #F3C64E. The background colour changes on almost every cut. | 2.5D: rim thickness, isometric panels, long hard cast shadows, parallax layers | Fine monochrome grain on every frame; halation **only** on emitters | Explaining an invisible mechanism: data flow, security, AI pipelines, energy | [V:1Hcg3X] |
| AD-S8 | **Playful illustrated collage + UI** | 6 colours, ≤4 per frame: teal #006965-#007B6E, mustard #D8C21A, orange #F36A05, cream #E0C15D, pale blue #87C0ED, pink #F7B0A3, plus dark brown type | Flat vector + photo cut-outs with soft drop shadows + light UI cards with an offset solid backing card (4-6% offset) | No lighting model; animated on twos for the illustration layers | Consumer apps, delivery, fintech, "warm" SaaS | [V:126cpH] |
| AD-S9 | **Calm editorial AI (ElevenLabs-like)** | Light #f5f5f5 or dark #0c0a09; ink #0c0a09; muted #777169; pastel atmosphere stops (#a7e5d3 mint, #f4c5a8 peach, #c8b8e0 lavender, #a8c8e8 sky, #e8b8c4 rose) "used only as atmosphere"; one platform hue per sub-brand | Floating rounded cards (radius 16-24 px on web), a slow orb (drift period ≈251 s), Chladni line patterns | Very soft layered shadows; Chladni layers at 3% grain [inferred] | AI audio and voice, model and API launches | [E] (brand page, extraction, code; motion inferred) |

**Style-choice rule [inferred from the table].** Choose by the product's promise:
- Calm / trustworthy / AI-assistant → AD-S1, S2 or S9.
- Speed / energy / developer audience → AD-S5.
- Financial "unify / automate" → AD-S3.
- Explaining a mechanism → AD-S7.
- Warm consumer → AD-S8.
- Agency or service self-promo → AD-S6.

This matches the text-source mapping of motion to promise [S:playbook rule 12] and the dominance of Minimal/Clean among SaaS launch films (10 of 21 launch films tagged Minimal/Clean, 6 Bold/Vibrant) [W:showreel.design].

## 3.3 Experimental (works in one reference; validate before using as a default)

- **AD-X1. Colour-bloom metaphor.** Start "human world" plates in B&W and bloom to full colour over 22-42 f as the product engages [V:1-6l8S t=18.57-19.33s, 54.0-55.4s]. The reference itself applies this to only some matching scenes, which is a listed flaw. If you use it, use it on **every** matching scene.
- **AD-X2. False-colour generation "develop".** A thermal cyan/violet duotone held for 7-11 f, then either a 1 f switch to the true image with a 6-12 f tint clean-up, or a 15-20 f dissolve [V:15VhHR t=8.63-12.47s, 25.77-26.43s]. A held duotone (more than ~15 f) reads as a glitch.
- **AD-X3. Grain-gradient 3D characters.** Dithered white→green→black shading on a 3D prop gives a tactile, print-like 3D accent without a full render look [V:1i2L14 t=0.70-1.43s].
- **AD-X4. Watercolour ink-bloom mask** for an emotional scene: a peach blot grows over ≈20 f, overexposes to white, then resolves [V:1-6l8S t=38.85-39.75s]. The transition material matches the content's emotion.
- **AD-X5. Light-build release.** Ramp an emissive glow's area ×8-10 over ≈2 s and hard-cut on the brightest frame [V:1ccYWJ t=18.87-21.0s].
- **AD-X6. Chladni / orb atmosphere** for audio products: line patterns that morph (n, m) over 120 f, sharp white lines at 35% plus a 32 px blurred copy at 70% [E, inferred numbers]; or the open-source orb with its colour ramp black → c1 → c2 → white [E, sourced code].
- **AD-X7. Halation "risograph" finish** (grain plus bloom only on emitters) applied to a SaaS UI film [inferred transfer of [V:1Hcg3X]; untested on UI].

## 3.4 Avoid

| ID | Avoid | Seen in | Prevention |
|---|---|---|---|
| AD-A1 | Background plates in mismatched illustration styles | [V:1-6l8S t=18-69s] | One plate style token, one light direction, one grade, restated in every shot prompt |
| AD-A2 | A signature device applied to only some matching scenes | [V:1-6l8S] (B&W→colour on 2 of 4 life scenes) | Write the rule ("every voice-start scene blooms") into the shot list and check it in QC |
| AD-A3 | More than 3 rendering idioms in one frame | [V:126cpH t=5.9-8.4s] | Default 2 per frame, never more than 3; 3 per film |
| AD-A4 | Dated flourishes on type: 45° long shadows | [V:126cpH t=0.73s] | Use flat type, a soft drop shadow or an offset backing plate |
| AD-A5 | A one-off stock lifestyle photo with no continuity to the rest of the system | [V:19NRDv t=29.97-35.93s] | Either a recurring cast or no people |
| AD-A6 | A new texture or material in every section | Warned in [V:1i2L14] | Introduce each material once and reuse it for the same meaning |
| AD-A7 | Greeked, placeholder or low-res UI in the hero 3D beat | [V:1CSXtQ t=18.4-19.0s] | Hero UI textures at ≥1.5× the output size; real strings |
| AD-A8 | Generic "neon tech" visuals, random particles, lens flares, chrome | Not used decoratively in any of the 8 references; named in [W:motion.so] | AD-U8 |
| AD-A9 | Delivering inside a wrapper (fake player plus chapter bar) when the film is the ad | [V:1i2L14] (the wrapper takes 21% of the height) | Deliver the bare frame; put chapter labels in the post copy |
| AD-A10 | Unlabelled abstract feature metaphors (pinwheel = "attention"?) | [V:1i2L14 t=20.3-30.6s] | Add a 1-2 word label, or use real UI |

## 3.5 Especially good for SaaS

- **AD-SaaS1. The semantic AI colour (AD-U2 row 3).** Every AI product needs a way to show "the model is working" without a progress bar. One reserved, transient gradient family does that and can be learned in one use [V:15VhHR].
- **AD-SaaS2. A brand frame around a real product world (AD-U3).** It lets the film use real UI, which is the proof [S:playbook rule 5], without the film looking like a screen recording [V:15VhHR] [V:19NRDv].
- **AD-SaaS3. Abstractions made from the UI's own pixels (AD-U4).** Integrations, data flow and sync stay honest and on-brand [V:1CSXtQ].
- **AD-SaaS4. Status colours as narrative (AD-U2 row 6).** Reliability, failover and reconciliation stories can be told without labels [V:19NRDv].
- **AD-SaaS5. One plate style for "life" scenes.** B2B buyers forgive a stylised world; they do not forgive an inconsistent one [V:1-6l8S, inferred].

## 3.6 Do / Don't pairs

| Do | Don't | Why | Evidence |
|---|---|---|---|
| Declare a semantic colour table (meaning → hex) before the first frame | Pick colours shot by shot | Colour can replace labels only when it is consistent | AD-U2 |
| Use one contrast face for exactly one role (role words, wordmark) | Mix in a second display face "for variety" | The single exception becomes the signature | [V:1ccYWJ] [V:1-6l8S] |
| Make particles and light out of the product's own colours | Add generic glowing particles to make it feel "techy" | Abstraction stays honest | [V:1CSXtQ] |
| Spend 3D/DOF on the one beat that needs explaining | Put 3D on every shot "for polish" (unless 3D *is* the style) | Contrast makes the hero beat unmistakable | [V:1CSXtQ] [V:15VhHR] |
| Restate the plate style, light direction and grade in every AI shot prompt | Let each generated plate find its own look | Identity drift across plates | [V:1-6l8S] |
| Close on the opening canvas and position | End in a new colour world | Closure | [V:126cpH] [V:1CSXtQ] |

---

# Master §4. Composition Rules

## 4.0 Why composition carries so much weight in motion

A feed viewer gives an item about 1.7 s on mobile [N]. Reference shots run 0.23-6.3 s (ASL 1.58 s for Wix up to 2.49 s for Bumper; [V:15VhHR] [V:19NRDv] [V:1-6l8S] 2.36 s), and type cards hold only 0.33-1.9 s ([V:1-6l8S] 1.17-1.87 s; [V:1ccYWJ] 10-12 f climax cards). The focal point therefore has to be **findable before it can be read**. The references achieve this in three ways:
1. They put the focal element in a few predictable places: the centre band, the thirds, the editorial column.
2. They clear everything else from the frame: 85-95% negative space on statement frames.
3. They keep those places stable across cuts, so the eye never has to search.

## 4.1 The reference grid: measured anchor lines

These lines recur across the eight references. Snap focal elements to them. The px columns are anchor positions (left edge or centre-line as stated).

**Vertical lines (x)**

| Anchor | % W | px @1080p | px @1920p (9:16) | Used for | Evidence |
|---|---|---|---|---|---|
| Centre axis | 50% | 960 | 540 | Statements, logos, hero objects, single icons | [V:1-6l8S] [V:19NRDv] [V:1ccYWJ] [V:1i2L14] [V:1CSXtQ] [V:15VhHR] |
| Thirds | 33.3% / 66.7% | 640 / 1280 | 360 / 720 | Hero on a third; typing caret lock (65-66% W); triptych boundaries (33.2 / 66.8%) | [V:1Hcg3X t=34.87s] [V:1CSXtQ t=4.5-7.2s] [V:15VhHR t=6.57s] |
| Flank lines | ≈15% / ≈81% (label centres) | 288 / 1555 | (stack vertically instead) | Labels flanking a centred hero, aligned to its mid-line | [V:1Hcg3X t=3.43-5.43s] |
| Editorial left edge | ≈13% | 250 | 140 | Left-aligned headline blocks | [V:126cpH t=13.6s] |
| Editorial right column | 67-84% | 1286-1613 | n/a | A left-aligned message block in the top-right quadrant | [V:1Hcg3X t=28.97s] |

**Horizontal lines (y)**

| Anchor | % H | px @1080p | px @1920p (9:16) | Used for | Evidence |
|---|---|---|---|---|---|
| Top text line | ≈10-12% | 108-130 | 204-230 (still above the 270 px safe line, so not for text in 9:16) | Top of an editorial message block | [V:1Hcg3X t=28.97s] |
| Supertitle / top lockup | ≈18-20% | 194-216 | 345-384 | Supertitle above a giant word; wordmark in a stacked end card | [V:19NRDv t=56.67s, 61.47s] |
| Upper third | 25-33% | 270-356 | 480-634 | Title stacks (15-25% H), chat headline (30%), a line pushed up to make room (32%) | [V:1Hcg3X t=0-1.53s] [V:15VhHR t=4.23s] [V:1ccYWJ t=22.33s] |
| **Statement band** | **47-52%** | **508-562** | **902-998** | Centre-line of every single-line statement | [V:1-6l8S] 49-51%; [V:19NRDv] 47-52%; [V:1ccYWJ] 47-52%; [V:1i2L14] 50 ± 3%; [V:1CSXtQ] ink 46-54% |
| Hero-word line | ≈55% | 594 | 1056 | A giant word under a supertitle | [V:19NRDv t=57.6-61.47s] |
| Lower UI band | 67-70% | 724-756 | 1286-1344 (**outside 9:16 text-safe**) | Waveform card, notification pill | [V:1-6l8S t=18.37s] [V:126cpH t=11.07s] |
| Ground line | ≈75% | 810 | 1440 | Top of a landscape, floor or horizon | [V:126cpH t=16.2s] |

**Grid rule (CO-U0).** Every frame states which anchor its focal element sits on. Use at most two anchors per frame, for example statement band + centre axis, or thirds + upper third [inferred]. Why: an element on an anchor reads as placed. An element off every anchor reads as floating, which is the "random floating screen" problem the brief calls amateur.

## 4.2 Focal hierarchy

**CO-U1. One focal point per frame, and one text level per statement frame.** "Each frame has one text level" [V:1CSXtQ]. "One hero object per frame, centred or on a thirds line" [V:1Hcg3X]. Hierarchy is created *between* frames by scale jumps, not inside them [V:1CSXtQ §8].

**CO-U2. When two text levels must share a frame, keep their size ratio at least 1 : 2.5.**

| Reference | Level 1 | Level 2 | Ratio |
|---|---|---|---|
| [V:126cpH] | "chow?" / "busy?" / "seconds", ascender 9.6-14% H | "You don" / "been" / "order in", ≈4-5.5% H | ≈1:2.4-1:3.3 (computed) |
| [V:1Hcg3X] | "SOLAR", cap 11.6% H | "How Do" / "work?", cap 2.8% H | ≈1:4 |
| [V:19NRDv] | Hero word, cap 15-23% H | Phrase line, cap 4.5-5.5% H | ≈1:2.7-1:5 (computed from the size table) |
| [V:1ccYWJ] (across consecutive cards, not one frame) | "So", em ≈44% H | Statements, em 6.7-10.8% H | ≈1:4-1:6.6 (computed) |

Why: below about 1:1.5 the two levels compete and the eye ping-pongs between them [inferred]. At about 1:2.5 and above the order of reading is fixed; Chowdeck's "order in / seconds" pair at 1:2.4 still reads in order because the small line is white and the large one mustard [V:126cpH t=3.07s].

**CO-U3. Inside one line, emphasise with colour or weight before size.**
- One accent word or phrase per line: [V:19NRDv], [V:1i2L14], and kivi's sage second phrase [V:1-6l8S].
- Bold on the single announcement word only, with no size change [V:1CSXtQ t=0.07s].
- Function words lighter, at about 60% [V:19NRDv rule 3].

**CO-U4. Dim the context; don't delete it.** Choose the level by whether the context must still be read:

| Purpose | Level | Evidence |
|---|---|---|
| Superseded content still readable (the raw transcript under the AI version) | ≈50% | [V:1-6l8S t=13.77-17.03s] |
| Function words inside a line | ≈60% | [V:19NRDv] |
| Context becomes texture behind a number | ≈15% (in 3 f) | [V:1ccYWJ t=9.833s] |
| Isolate one signal among many | 20% plus desaturate; target turns accent | [S:TradeLens] (transfer, inferred) |
| Orient across panes | Other panes at 40% | [S:Asana] (transfer, inferred) |

Why: the dimmed layer keeps the claim tied to its evidence. The thousands of icons stay visible behind "4,863+" [V:1ccYWJ].

**CO-U5. Two readability classes. Decide which one every string belongs to.**
- **Read class**: anything the viewer must understand. Cap height ≥2.5% H (≥27 px @1080p), the floor three teardowns set after finding their own 1-2% H text illegible [V:1-6l8S] [V:126cpH] [V:1ccYWJ]; in 9:16, ≥36 px absolute floor and ≥52 px body [N]. Held still long enough to read (see the typography section).
- **Texture class**: UI micro-copy, prop paragraphs, axis labels. Make it obviously abstract and never let meaning depend on it.

Evidence: six of the eight references show 1-2% H UI micro-text that is unreadable at delivery and each lists it as a flaw ([V:1-6l8S], [V:126cpH], [V:15VhHR], [V:19NRDv], [V:1ccYWJ], and [V:1i2L14] where it is intentional). The fix the references *do* use well is to enlarge the one value that matters (Bumper's "100%" at ≈6% H cap [V:19NRDv t=23.9-24.95s]) or to cut in 2-3.4× on the relevant row [V:15VhHR t=6.57s].

**CO-U6. Decoration never crosses the claim.** Chowdeck's starburst rays pass *over* "seconds" for about 0.5 s and cover the key word [V:126cpH t=3.9-4.4s]. Mask decorative layers behind type, or clear the type's bounding box plus 10% padding [inferred padding].

## 4.3 Negative space

**CO-U7. Statement frames are at least 85% empty; 90-95% is typical.**
- Wix brand frames use about 85% empty canvas; its 56% W sentence has about 45% of the height empty above and below [V:15VhHR t=0.63-4.23s].
- HubSpot is 92-95% white [V:1CSXtQ].
- kivi's statement bbox (7-10% H × 37-84% W) covers ≤8.5% of the frame area (computed from the measured bbox) [V:1-6l8S].

Why: large empty fields make small, regular-weight type read as confidence, not as an ad. "A small, quiet sentence reads as confidence" [V:15VhHR]. They also leave room for drift, push-in and an incoming element without re-layout.

**CO-U8. UI frames: the hero UI covers about 15-35% of the frame area and 55-85% of the width, with at least 7.5% clear margin each side.**

| Reference | Hero UI | Width | Placement |
|---|---|---|---|
| [V:1-6l8S] | Glass prompt card / message card / email / code / sheet | 83-85% / 85% / 65% / 75% / 80% W | Top-centre or centre; the email card sits centre-right |
| [V:126cpH] | Order card | 75% W × 44% H | Centred at ≈50% H |
| [V:1CSXtQ] | Prompt bar after pull-back | 77% W | Centre band |
| [V:1ccYWJ] | App panel | 55% W | Centred, cropped at the top |
| [V:15VhHR] | Page as a window over its own photo | ≈85% scale | Centred |

The area figure is computed from these widths and their measured or estimated heights [inferred].

**CO-U9. Use scale contrast on purpose.** A small subject in a huge field means "establishing / one of many / far away". A frame-filling subject means "detail / this one".
- Establishing: house ≈25% W in about 95% negative space [V:1Hcg3X t=5.43s].
- Macro: a jug at 69% H [V:126cpH t=5.17s]; a phone starting at about 3× its final size [V:1Hcg3X t=14.30s]; hook type at 49% H bleeding off the frame [V:15VhHR t=0-0.63s].
- The cut *between* the extremes is itself a device: 49% H → 6.6% H (≈7.4×) on the same words [V:15VhHR t=0.633s]; 3.4× cut-ins for detail [V:15VhHR t=6.57s]; a 2× cut-in on an icon row [V:1-6l8S t=35.47s].

**CO-U10. Reserve the space where the next element will arrive, and say so in generation prompts.**
- Lottieicon pushes its line up to y ≈32% so the ribbon can rise beneath it [V:1ccYWJ t=22.33-25.5s].
- For generated b-roll that will carry text, describe the empty area explicitly, e.g. "subject in lower third, large clean empty sky in upper half, shallow depth of field" [P].

## 4.4 Line width and alignment

**CO-U11. Statement lines are centred.** Typical width is 35-70% W (672-1344 px @1080p), with a hard cap of 85% W for single lines of ≤6 words.

> **References win (over generic line-length advice).** Broadcast guidance keeps lines within 68% of a 16:9 frame [N, BBC]. The references run single-line statements wider: kivi at 77.5-78% W [V:1-6l8S t=37.15s, 69.62s], NOSTRA at 74% [V:1i2L14 t=9.7-10.6s], Bumper's "Champion" at 74% [V:19NRDv t=59.07s], Chowdeck's hero words at 80-84% W in 9:16 [V:126cpH]. Allow up to 85% W **for one line of ≤6 words**. The 68% limit still applies to multi-line copy and captions, where the eye has to sweep back to the start of the next line [inferred reason].

**CO-U12. Editorial and explainer blocks are left-aligned on a column edge** (≈13% W, or the 67% W column for a top-right block), ragged right, leading about 1.0 [V:126cpH t=13.6s] [V:1Hcg3X t=28.97s]. UI text keeps the UI's own alignment, which is left inside cards [V:1-6l8S].

**CO-U13. While a line grows (typing or word-append), keep its composition stable.** Either let it re-centre with smoothing [V:1-6l8S t=0.1-1.0s], scale it to stay within ≤70% W [V:1ccYWJ t=34.33-38.0s], or let the camera follow so the newest character sits at 65-66% W (the two-thirds line) [V:1CSXtQ t=4.5-7.2s] or in the right third [V:15VhHR t=6.57-8.6s].

## 4.5 Scale table for recurring elements

| Element | 16:9: % W (px @1080p) | 9:16: % W (px @1920p) | Vertical position | Evidence |
|---|---|---|---|---|
| Single statement line | 35-70% W (672-1344), cap 85% | ≤67% W inside the text-safe band (≤720 px); hero words up to 84% (see §4.7) | Statement band | §4.4 |
| Hero object (illustration or product) | 30-45% W (576-864) | 55-75% W [inferred: same visual mass] | Centre or a third | [V:1Hcg3X] |
| Hero UI card | 55-85% W (1056-1632) | ≈75% W (810) | Centre band; voice/prompt cards top-centre | CO-U8; [V:126cpH] |
| Single app icon as hero | ≈8% W (154) up to 12% H | ≈12% H | Dead centre | [V:1-6l8S t=17.03s] [V:1ccYWJ t=0-1.2s] |
| Single wordmark lockup | 17-26% W (326-499); cap 7-12% H for caps wordmarks, up to 15-21% H ascender-to-baseline for a lowercase serif mark | 56-62% W (605-670) | 42-50% H | [V:15VhHR] 17% W / 12.2% H; [V:1-6l8S] 17-23% W, 15.4-21% H (asc.-baseline, growing with a +29% push); [V:1i2L14] 26% W / 7.2% H; [V:126cpH] |
| Co-brand or wordmark + product name | 50-57% W (960-1094) | [inferred] ≤67% W | Centre; or y ≈18% in a stacked end card | [V:1CSXtQ] 50% W; [V:19NRDv] 57% W |
| CTA pill under a logo | ≈37% W × 11% H (710 × 119) | [inferred] 60-67% W | Directly under the logo | [V:1i2L14 t=32.73s] |
| URL alone | ≈15% W, 5.8% H bbox (288 × 63) | [inferred] ≥52 px type | Centre | [V:1-6l8S t=75.53s] |
| Logo symbol with halo | ≈15% W (288) | [inferred] 30% W | Centre | [V:1-6l8S t=72.27s] |

## 4.6 Edges, crops and bleed

**CO-U14. Crop decisively or not at all.** Either keep an element at least 5% inside the safe line, or push it at least 30% off-frame so the crop reads as intentional. Avoid "kiss" crops of 0-10%: Lottieicon's toolbar, left-cropped by the frame edge, "looks accidental rather than designed" [V:1ccYWJ t=12.17s].

**CO-U15. Deliberate bleed is allowed for display type and for UI that implies a larger surface. It is never allowed for information.**

> **References win (over the generic "keep all graphics inside the safe area" rule [N]).**
> - Wix opens with macro type at 49% H bleeding off both edges, jump-reframing on each new word, for 0.63 s [V:15VhHR t=0-0.63s].
> - HubSpot lets its prompt bar overflow the left edge "to imply this is a bigger UI" [V:1CSXtQ t=7.2s].
> - Wix crops generated-site display type edge to edge [V:15VhHR].
>
> Allow bleed for (a) hook display type held ≤0.7 s, (b) UI overflow that a pull-back later resolves, and (c) editorial display type inside a product's own content.

**CO-U16. Informational text never touches or crosses the frame edge.** Bumper's caption was clipped by the top edge for 5 s [V:19NRDv t=30.9-35.9s]. The fix: keep captions at least 5% H inside title-safe [V:19NRDv].

## 4.7 Safe areas per aspect ratio

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

## 4.8 Depth and layering

**CO-U19. Use three planes by default and at most four in a hero 3D beat:** background (defocused or flat), focal (sharp), foreground accent (small, may be defocused).

| Reference | Background | Focal | Foreground | Evidence |
|---|---|---|---|---|
| kivi | Painterly plate, heavily defocused | Frosted glass card | Waveform card / app badge overlapping the card edge | [V:1-6l8S t=18.37s, 39.75s] |
| Wix | Matching beach photograph | Page window with soft shadow | Grass in focus; a palm leaf blurred in the foreground | [V:15VhHR t=19.73s, 43.07s] |
| HubSpot (hero beat) | Blue-grey back wall | Chat pane with a glass edge | HubSpot window, then particles going to bokeh | [V:1CSXtQ t=17.8-21.5s] |
| Bumper | Navy / ring plane | Logo or chart plane | Near chips defocused; tooltip bubble with parallax | [V:19NRDv t=3.67-7.2s, 13.13s] |
| Lottieicon | Aurora | Search pill | Large green bubbles entering defocused from the bottom corners, then shrinking and sharpening into a ring (foreground → midground rack focus) | [V:1ccYWJ t=39.2-39.7s] |
| Solar | Flat colour | Hero object | Long cast shadow; overlapping rows (no blur at all) | [V:1Hcg3X] |

Depth recipes, choose one per film:
- (a) **Focus**: sharp UI over a strongly defocused plate. Cheap and cinematic [V:1-6l8S]. A rack-focus reveal starts from a blur radius of ≈8-10% W [V:126cpH t=1.60-1.83s].
- (b) **Overlap and offset**: a badge over a card edge [V:1-6l8S]; a solid backing card offset 4-6% in flat styles [V:126cpH].
- (c) **Fog and scale**: far rows fade into the background colour [V:1i2L14 t=19.43-20.30s].
- (d) **Shadows and parallax**: foreground moves 1.3-2× the background speed [V:1Hcg3X].

Mixing recipes inside one shot reads as fake depth [inferred].

**CO-U20. No ambiguous plane intersections.** HubSpot's window pokes through the chat pane's glass edge for several frames and the layering becomes unreadable [V:1CSXtQ t=18.4-19.0s]. Every plane is wholly in front of or wholly behind its neighbour.

## 4.9 Positional continuity across cuts

**CO-U21. Anchor one element across rapid cuts.** When ASL drops below about 0.8 s, lock one element to identical screen coordinates and change only its context.
- Wix's prompt bar keeps the same x, y and size across 6 shots (8.63-12.47 s), and the ice bottle stays in the same screen region across 4 background swaps [V:15VhHR].
- Lockups reprise at ±1 px [V:1CSXtQ].

**CO-U22. Shape and light matches hold position to within ±5% W.**
- NOSTRA's dot becomes the creature's eye within about 5% W [V:1i2L14 t=1.433s].
- Solar's outgoing sun shrinks to a point *at the position* where the lamp appears [V:1Hcg3X t=3.30-3.43s].
- Wix cuts orange court to orange site, a colour match on the same field [V:15VhHR t=12.47s].

**CO-U23. A prompt → result pair is a continuity cut on the same plate, reframed.** kivi cuts from the voice card to the email or sheet over the same desk or office plate, moved right and closer [V:1-6l8S t=22.87s, 67.70s]. The viewer reads "same moment, new state".

**CO-U24. Fix a screen-direction grammar and keep it.**
- Solar: "vertical = progression, horizontal = context", and every move is continued by the next shot [V:1Hcg3X].
- Chowdeck: bottom-to-top reads as forward [V:126cpH t=2.53s].
- HubSpot: "send" moves up, and the sent bubble continues up after the cut [V:1CSXtQ t=17.8s].

Solar's single diagonal (a 65° token conveyor) breaks this grammar exactly at the money payoff, which is why it lands [V:1Hcg3X t=28.43-30.63s].

## 4.10 Frame recipes (composition templates)

Coordinates are given for 16:9 (1920×1080) and 9:16 (1080×1920). 9:16 values are [inferred] re-layouts unless a reference is cited.

| ID | Recipe | 16:9 layout | 9:16 layout | Evidence |
|---|---|---|---|---|
| T1 | **Statement card** | One line, centre-line y 540, width 672-1344 px (≤1632), font ≈68-95 px; one accent glow in a single corner; ≥85% empty | Centre-line y 902-998; width ≤720 px (x 120-840); headline 96-160 px | [V:1-6l8S] [V:15VhHR] [N] |
| T2 | **Supertitle + hero word** | Supertitle centred at y ≈216 (20%); hero word centred at y ≈594 (55%), cap 162-356 px | Setup word directly above the hero; hero centred at y ≈960; ratio 1:2.5-1:3 | [V:19NRDv] [V:126cpH] |
| T3 | **Voice / prompt card over a life plate** | Glass card ≈1600 px wide, top-centre (roughly y 160-500 [inferred y-range]); waveform card centred at y ≈756 (70%); plate fully defocused; card text ≈43 px, leading 1.6 | Card 720 px wide (x 120-840) at y ≈300-800; waveform at y ≈950-1150 | [V:1-6l8S t=18.37s] |
| T4 | **UI hero card** | Card 1056-1632 px wide, centred or on a third; 1 px rim plus soft shadow; context dimmed to 15-50% | Card ≈810 px (x 135-945), centred at y ≈960; text-bearing rows inside x 120-840 | CO-U8; [V:126cpH] |
| T5 | **Flanked hero** | Hero 576-864 px centred; label centres at x ≈288 and ≈1555 on the hero's mid-line | Labels stacked above and below the hero | [V:1Hcg3X t=3.43s, 32.87s] |
| T6 | **Split screen** | 50/50, divider settles at ≈50.8% W; one concept per colour field | Top / bottom halves | [V:1Hcg3X t=17.0-19.4s] [V:1i2L14 t=25.07s] |
| T7 | **Wall with one highlight** | Full-bleed grid; one tile in the accent with a glow ≈20% of tile size; others white, dimmed or fogged; camera centres the tile | Same, with fewer columns | [V:1ccYWJ t=27.13-33.2s] [V:1i2L14 t=19.13s] |
| T8 | **Triptych recap** | Three strips at exactly 33.2 / 66.8% W; labels re-laid for the narrow strips | Three stacked bands [inferred] | [V:1Hcg3X t=34.87s] |
| T9 | **Lockup + CTA** | Single wordmark 326-499 px wide at y ≈486-540, CTA pill ≈710 px wide directly beneath; or stacked: wordmark y ≈194, CTA/QR centred at y ≈518, URL near the bottom safe line | Wordmark 605-670 px wide at y ≈806; CTA beneath, inside y ≤1210 | [V:1i2L14] [V:19NRDv] [V:126cpH] |
| T10 | **Macro crop** | Type 45-50% H bleeding (≤0.7 s), or UI overflowing one edge with the typing kept at x ≈1250-1270 (65-66% W) | Same principle; keep the typing point inside x ≤840 | [V:15VhHR] [V:1CSXtQ] |

## 4.11 Style-specific composition

| Style | Composition signature | Evidence |
|---|---|---|
| AD-S1 Airy Aurora | Centred single lines with auto-recentring; wide glass cards top-centre; continuity reframes on one plate | [V:1-6l8S] |
| AD-S2 Prompt-native | Caret lock at 65-66% W; a macro bar overflowing an edge; one text level per frame; a lockup reprised at the identical position | [V:1CSXtQ] |
| AD-S3 Night/Day | Centred type at the optical centre with a continuous pull-back; tilted 3D planes left-centre; an orbit ring around a pivot | [V:19NRDv] |
| AD-S4 Editorial frame | Small centred sentence in huge negative space; product world full-bleed; anchored prompt bar | [V:15VhHR] |
| AD-S5 Dark neon | Centred kinetic statements at 24-53% W (auto-fit type-on lines up to ≈69% W); full-bleed walls; hop-and-hold highlight tiles | [V:1ccYWJ] |
| AD-S6 Monochrome system | Small type (cap 5.5-6.5% H) on the centre band; shape chains within ±5%; polarity flip on every cut | [V:1i2L14] |
| AD-S7 Risograph | One hero, flanking labels, exact thirds, world-space labels that move with the scene | [V:1Hcg3X] |
| AD-S8 Collage | Setup word over punch word (1:2.5-1:3); left-aligned payoff at 13% W; a mosaic grid of tiles | [V:126cpH] |

## 4.12 Experimental composition

- **CO-X1. Staircase type.** Words placed on a descending diagonal (step ≈5% H) that collapses to the baseline in 7-10 f [V:1CSXtQ t=0-2.1s, 21.6s] [V:1i2L14 t=8.30s].
- **CO-X2. Camera inside a ring of cards** to make "too much text" feel oppressive by design [V:1i2L14 t=10.63-13.97s].
- **CO-X3. UI in its own world.** The page shrinks into a window floating over the same photograph extended full-bleed [V:15VhHR t=19.73s]. Match the horizon and light (AD-U6).
- **CO-X4. Frames-in-frame recap strips** that travel as one train and lock to exact thirds [V:1Hcg3X t=32.53-34.87s].
- **CO-X5. Lens-distorted wall reveal.** A barrel bulge relaxes in ≈6 f while the grid zooms out [V:1ccYWJ t=7.30s, 27.13s].

## 4.13 Avoid

| ID | Avoid | Seen in | Fix |
|---|---|---|---|
| CO-A1 | Text clipped by the frame edge | [V:19NRDv t=30.9-35.9s] | Text-safe check on every frame |
| CO-A2 | 0-10% accidental crops | [V:1ccYWJ t=12.17s] | CO-U14 |
| CO-A3 | Decorative layers over the key word | [V:126cpH t=3.9-4.4s] | CO-U6 |
| CO-A4 | Read-class text at 1-2% H | 6 of 8 references | CO-U5; enlarge or cut in |
| CO-A5 | Four or more consecutive centred, same-size text cards | [V:1CSXtQ t=21.5-27.4s]; [V:1ccYWJ t=33.2-39.1s]; kivi's 5 text-only cards [V:1-6l8S t=25.5-34.2s] | Vary scale, add an icon or UI tie-in, or merge into one kinetic sequence |
| CO-A6 | Ambiguous plane intersections | [V:1CSXtQ t=18.4-19.0s] | CO-U20 |
| CO-A7 | Text-bearing UI below y 1210 in 9:16 | [V:126cpH t=11.07-13.6s] | CO-U17 |
| CO-A8 | Words overlapping mid-exit ("spreadsheetpowered") | [V:1-6l8S t=64.27-64.33s] | Check exits frame by frame |
| CO-A9 | A wrapper that shrinks the content | [V:1i2L14] | AD-A9 |
| CO-A10 | Mixing depth recipes in one shot | [inferred] | CO-U19 |

## 4.14 Especially good for SaaS

- **CO-SaaS1. Context → extraction → focus.** Show the whole table, lift the relevant column out, push through it, then show the state change [V:19NRDv t=16.77-20.5s]. For dashboards, reverse it: one chart in macro first, then pull back to the whole screen [V:19NRDv t=27.57-28.8s].
- **CO-SaaS2. Anchor the UI and swap the world** (the slot-machine montage) [V:15VhHR].
- **CO-SaaS3. Locus lock for typing** at 65-66% W or in the right third [V:1CSXtQ] [V:15VhHR].
- **CO-SaaS4. Prompt → result continuity reframe** on the same plate [V:1-6l8S].
- **CO-SaaS5. Dim to texture behind a number**, so proof stays visible behind the stat [V:1ccYWJ].
- **CO-SaaS6. A left translucent panel** carrying the headline over product imagery [S:PointCard]. The "semi-transparent overlay on the far left" layout is sourced; the 30-40% width is the researcher's estimate, and timing was not observed.

## 4.15 Do / Don't pairs

| Do | Don't | Why | Evidence |
|---|---|---|---|
| Put statement centre-lines in the 47-52% H band | Centre type at random heights per card | A stable reading position across cuts | §4.1 |
| Keep one text level per statement frame; ≥1:2.5 when there are two | Three similar sizes in one frame | A fixed reading order | CO-U1/U2 |
| Dim superseded context to 50%, or to 15% when it becomes texture | Cut the context away or leave it at full strength | The claim stays tied to its proof | CO-U4 |
| Crop ≥30% off-frame, or keep 5% inside the safe line | Kiss the frame edge | Intent vs accident | [V:1ccYWJ] |
| Bleed display type only in a ≤0.7 s hook | Bleed captions or numbers | Information must be complete | CO-U15/16 |
| Re-lay out 9:16 (stack pairs; labels above and below) | Centre-crop the 16:9 master | 608 px of width survives | CO-U18 |
| Hold anchors to ±5% W across cuts | Re-place the anchor element each cut | The eye never searches | [V:15VhHR] [V:1i2L14] |
| Describe the empty space in AI shot prompts | Hope the generator leaves room for type | Generators fill space by default | [P] |

---

# Master §11. Color & Lighting Principles

## 11.0 Why colour and light decide the premium read

Across the eight references, colour does three jobs at once:
1. **Identity**: one accent recognisable in a single frame.
2. **Meaning**: a semantic table that replaces labels (AD-U2).
3. **Rhythm**: canvas flips, blooms and washes as the connective tissue of the edit.

Light does two jobs: it builds depth without 3D (glass, glow on emitters, soft shadows), and it acts as a transition material (blooms, washes, light-source matches). Films that look cheap fail on one of a few points: an off-meaning colour, a held effect colour, glow on things that don't emit light, banding, mismatched light across plates, or illegible accent text. Every one of these failures appears at least once in the references and is listed under §11.14.

## 11.1 Palettes observed (hex)

Values are as sampled from sub-HD encodes; treat them as ±3-5 levels (see §0.1).

| Ref | Canvas | Ink | Accent: field tone | Accent: text tone | Atmosphere / secondary | Semantic / special | Darks |
|---|---|---|---|---|---|---|---|
| [V:1-6l8S] kivi | #F9FAFC, #FFFFFF | #000-#0B0B0B | Mint #E0F5EB, green #8EE1B2 / #5FE7A0, lime #E1F3BA, mint #B5ECB7 / #9AE6B0 | Sage #556962, teal-green #396454; URL #398461; wordmark forest #2D4123 + lime tittles | Demo field yellow #F5F966 → aqua #9CF7F7; sky #92CCF6-#C3E3F9; Kannada card #A2FCB6 / #ECFADF | Peach selection (typo fix); white bloom = interaction; B&W = before | Code card #121212; night plate #383022 / #1C170C / #594B34 |
| [V:126cpH] Chowdeck | Teal #006965-#007B6E; cream #E0C15D / #DBC466; map grey #E4E0D8 | Dark brown #2F1001-#4A2313 (tone-on-tone on orange); white | Orange #F36A05-#EB7607 | Mustard #C6B61B-#D8C21A (display type) | Pale blue #87C0ED, blue #5FA7E4, pink #F7B0A3, deep teal #024F46 | Background colour = chapter | — |
| [V:15VhHR] Wix | Off-white #F9F5F2; navy #02003E | Navy #1B1A55 [inferred]; white on navy | Red heart #DB2C36 (the only saturated brand accent) | — | Customer-site palettes (court orange #CE4511, cornflower #507DD1, sage #B2B18E, lime #DCF000, purple #6D6297) | **AI**: cyan #43D8F9 → indigo text gradient; thermal duotone #5F9CEB / #6CC6F6 / #6980E5 / violet #5D33F2; iridescent pastel field; violet halo. UI blue #1F6BFF | Logo dissolve #28023E → #000040 |
| [V:19NRDv] Bumper | Navy #020047-#06004E (claims); lavender-white #F4F4FC / #FCFCFC (proof) | White #FCFCFC on navy; navy #04043C on light | Orange #F4643C (large) | Orange #E46C54 (small) | Coral glow top-right, violet floor; periwinkle vignette #C4C4EC; peach blush | Status: fail #EC243C, success #34ACB4, matched mint #D4F4EC / #B4ECDC, chargeback #ECDC9C, fraud #E48494 | Navy #04044C |
| [V:1CSXtQ] HubSpot | #FFFFFF (92-95% of 2D frames); teaser #000000 | #1A1A1A | HubSpot orange #F65542 (icon only) | — (no accent text) | 3D studio radial #C8D4DF → #D3DCE6 → #F4F5F8 with vignette | System blue #3585E4 (toggle on); particles #192530-#45515C + white; bubble #EEEEEE | Shadow falloff ≈#F0F0F0 |
| [V:1Hcg3X] Solar | Cyan #4DD9E5, vermilion #E12E16, cream #F6F1ED, oxblood #1D0B0A, mustard #F3C64E (each scene one flat field) | Inverted against the field (white, oxblood, maroon multiply) | Cyan / vermilion complementary pair | Labels in red or cyan with glow | Sunset ramp red → orange → mustard (#D4321A → #EC8046 → #F3C64E); pale cyan #A7E5EA / #B9DFE1 | Bloom only on emitters | Oxblood #1D0B0A, #291312, #6C1811 |
| [V:1ccYWJ] Lottieicon | Black #000 + deep-green radial blobs #061506 / #0B2B0B / #114110 (text cards); pure black (UI shots) | White #F5F7F5 | Neon green #38D037 (tile #2EC130, chips #39CD39, glow #2B9D2A → #38D037) | White (accent never used as small text) | — | Green = alive / selected / on | UI greys #E8EAE8, #CACACA |
| [V:1i2L14] NOSTRA | Emerald #2FC06C / #31BA69 and off-white #F4F5F4, alternating | Near-black #161616; white on green | Emerald (also used as the full background field) | Emerald key word (fails contrast, see §11.3) | Mint tints #A4DEBC / #B6E3C9 / #E7F2EC (gradients only); mint corner glow top-right | Grain-gradient 3D; frosted glass tiles | #161616 |
| [E] ElevenLabs (text) | #f5f5f5 / #ffffff / warm #f5f2ef; dark #0c0a09 / #1c1917 | #0c0a09; body #4e4e4e | Per platform: Agents blue, Creative orange, API monochrome (no hex published) | Muted #777169; dimmed #a8a29e | Pastel stops #a7e5d3, #f4c5a8, #c8b8e0, #a8c8e8, #e8b8c4 ("atmosphere only"); orb #CADCFC / #A0B9D1 | Shimmer sweep for "generating" | Hairline #e7e5e4 |

Text-only palettes, useful for brand-fit reasoning but not observed in frames:
- Superside: Pine #0A211F, Leaf #2A4E45, Spark #D8FF85, Cloud #F7F9F2 [S:Superside].
- Bolt: Lightning Yellow #E1FF00, Bolt Black #11190C [S:Bolt, unverified hex].
- TradeLens: "high-contrast neutral palette accented with safety-orange notifications" [S:TradeLens].

## 11.2 Palette architecture: universal principles

**CL-U1. Count your colours.** Use ≤5 named colours per film and ≤4 in any frame, excluding real product UI content, customer photography and status colours that live inside UI.
- Chowdeck uses 6 but "every frame uses ≤4 of these" [V:126cpH].
- Solar uses 5 [V:1Hcg3X]; Bumper 3 plus status inside UI [V:19NRDv]; NOSTRA 2 plus ink plus one tint [V:1i2L14].
- Lottieicon: black, a green family, white and one grey [V:1ccYWJ]. HubSpot: white, ink, one accent and one system blue [V:1CSXtQ].

Why: every extra hue dilutes the one that means "the product".

**CL-U2. Tint the neutrals.**

| Role | Observed values | Rule |
|---|---|---|
| Light canvas | #F9FAFC (cool), #F4F5F4 (green-grey), #F9F5F2 (warm), #F4F4FC (lavender), #f5f5f5 / #f5f2ef [E] | Default to an off-white tinted toward the brand hue. NOSTRA: "never #FFFFFF" [V:1i2L14]. |
| Dark canvas | Navy #020047-#06004E, warm #0c0a09 [E], neutral #161616 / #1A1A1A, oxblood #1D0B0A | A dark tinted toward the brand hue. Pure #000 only with a moving glow and dither. |
| Ink | #0B0B0B, #161616, #1A1A1A, #04043C, #0c0a09 | Near-black, never a mid grey for primary text. |

Exception: pure #FFFFFF works when the product world is itself a flat, shadow-only UI and the canvas *is* the UI [V:1CSXtQ].

Why: tinted neutrals carry the brand even in frames with no accent, and pure black under gradients bands at delivery bitrates [V:1ccYWJ].

**CL-U3. Split every accent into a field tone and a text tone.**
- The **field tone** is bright and saturated. Use it for areas, glows, fills, icons and large shapes. Contrast does not apply.
- The **text tone** is darkened or desaturated until it reaches ≥4.5:1 on the canvas.

Evidence (computed ratios):

| Ref | Field tone | Text tone | Ratio (computed) |
|---|---|---|---|
| kivi | #8EE1B2 / #5FE7A0 (1.48:1 on #F9FAFC; 1.55-1.56:1 on #FFF) | Sage #556962 / teal-green #396454 | 5.61 / 6.43:1 on #F9FAFC [V:1-6l8S] |
| Lottieicon | #38D037 (1.90:1 under its #F5F7F5 type; 2.05:1 for pure #FFF) | Text stays white #F5F7F5 | 19.5:1 on #000 [V:1ccYWJ] |
| HubSpot | #F65542 (3.34:1, icon only) | No accent text | — [V:1CSXtQ] |
| Bumper | #F4643C (6.03:1 on #06004E) | #E46C54 | 5.88:1 on #06004E [V:19NRDv] |

The one reference that sets the field tone *as* text, NOSTRA's emerald key words on off-white, lands at 2.16:1, and white on its emerald pill at 2.37:1 [V:1i2L14] (computed). This is the majority pattern (4 of 5 references with an accent) and it agrees with [N].

Why: saturated brand hues sit near mid-luminance, so they fail as text on both white and dark. Splitting the tones keeps the identity *and* the legibility.

**CL-U4. Status colours live only inside UI.** Bumper's red, teal, mint, yellow and pink appear only inside product UI, never as brand or background colours [V:19NRDv].

**CL-U5. The AI colour is transient.** One reserved gradient family appears for 8-15 f while the AI acts, then settles to final colours. Held for more than ≈15 f it "reads as a glitch" [V:15VhHR]. It is never left on resting UI.

**CL-U6. Accent area depends on the accent's role.**
- **Accent as highlight** (premium default): ≤5% of the frame. HubSpot is 92-95% white with the accent only on a small icon [V:1CSXtQ]; Wix uses one red heart [V:15VhHR].
- **Accent as field** (brand-system / playful styles): the accent may fill the whole background on alternating cuts. NOSTRA flips green ↔ off-white on 11 of 13 cuts [V:1i2L14]; Chowdeck's teal opens and closes the film [V:126cpH].

> **References win (over 60/30/10).** The generic 60/30/10 split (dominant / secondary / accent) [N, unverified] does not describe either pattern. Premium SaaS frames in the references run nearer **90-95 / 3-8 / ≤5**, while brand-system films alternate a **100% accent field** with a 100% neutral field. Use the references' two modes, not 60/30/10.

**CL-U7. Test colour by changing only the accent.** A/B colour tests change the brand accent and nothing else [S:playbook]. In a sourced campaign case study, orange beat yellow on CTR, and orange-and-white beat orange-and-black [S:PointCard]. That is campaign-level evidence, not frame-level.

## 11.3 Contrast

Computed with WCAG relative luminance from the sourced hex values.

| Pair | Ratio | Verdict for text | Ref |
|---|---|---|---|
| #0B0B0B on #F9FAFC | 18.85 | Pass AAA | [V:1-6l8S] |
| Sage #556962 on #F9FAFC | 5.61 | Pass AA | [V:1-6l8S] |
| URL #398461 on #FFFFFF | 4.52 | Pass AA (just) | [V:1-6l8S] |
| Feature teal ≈#5FB8A8 on white | 2.36 | **Fail** (hex is approximate) | [V:1-6l8S] |
| White on teal #006965 | 6.55 | Pass AA | [V:126cpH] |
| Mustard #C6B61B on teal #006965 | 3.15 | Large display type only | [V:126cpH] |
| Dark brown #2F1001 on orange #EB7607 | 5.96 | Pass AA (dark text on a warm accent) | [V:126cpH] |
| Navy #1B1A55 on cream #F9F5F2 | 14.61 | Pass AAA | [V:15VhHR] |
| Red #DB2C36 on cream | 4.38 | Large only; darken to #C42630 (5.28) for text | [V:15VhHR] |
| AI cyan #43D8F9 on white | 1.69 | **Never as text**: transient fill only | [V:15VhHR] |
| #FCFCFC (the film's white) on navy #06004E | 18.31 (pure #FFF: 18.79) | Pass AAA | [V:19NRDv] |
| Orange #F4643C on navy | 6.03 | Pass AA | [V:19NRDv] |
| Orange #F4643C on #FCFCFC | 3.04 | Large only; use #C14A2B (4.78) for text on light | [V:19NRDv] |
| Fail red #EC243C on navy | 4.37 | Fine for non-text marks (≥3:1) | [V:19NRDv] |
| #1A1A1A on #FFFFFF | 17.40 | Pass AAA | [V:1CSXtQ] |
| HubSpot orange #F65542 on white | 3.34 | Non-text only (icon); text needs #CE4737 (4.58) | [V:1CSXtQ] |
| Oxblood #1D0B0A on cyan #4DD9E5 | 11.20 | Pass AAA | [V:1Hcg3X] |
| White on vermilion #E12E16 | 4.56 | Pass AA (just) | [V:1Hcg3X] |
| Maroon message on red #E12F17 | 4.18 | Large only (the message cap is 5.6% H) | [V:1Hcg3X] |
| Neon #38D037 on black | 10.25 | Pass AAA: on dark the field tone can be text | [V:1ccYWJ] |
| #F5F7F5 (the film's white) on neon #38D037 | 1.90 (pure #FFF: 2.05) | **Fail**; use #161616 (8.83) | [V:1ccYWJ] |
| #161616 on #F4F5F4 | 16.56 | Pass AAA | [V:1i2L14] |
| Emerald #2FC06C key word on #F4F5F4 | 2.16 | **Fail**; use #1D7A44 (4.90) | [V:1i2L14] |
| White "BOOK NOW" on #2FC06C | 2.37 | **Fail**; use #161616 text (7.65) or a #20864B fill (4.59) | [V:1i2L14] |
| Muted #777169 on #f5f5f5 | 4.43 | Borderline; it is the secondary tone | [E] |
| Dimmed #a8a29e on #f5f5f5 | 2.31 | Texture class only (earlier lines, by design) | [E] |

**CL-U8. Text contrast floors.**
- ≥4.5:1 by default.
- 3:1 only for "large" text: ≥66 px on a 1080-wide 9:16 frame, or ≈117 px on a 16:9 frame watched inline on a phone [N, derived].
- Target 7:1 for text over moving footage [N].

Most 16:9 statement text in the references (≈68-95 px @1080p) is *not* "large" on a phone, so it needs 4.5:1. The references that read best already exceed this: kivi 5.6-18.9:1, Bumper 6-18:1, HubSpot 17:1.

**CL-U9. Non-text UI marks (icons, chart strokes, toggles) need ≥3:1** [N]. Bumper's violet glass bars on navy are flagged as low contrast [V:19NRDv t=11-14s]; the fix is "≥3:1 against the background". HubSpot's orange icon (3.34) and blue toggle (3.73) pass.

**CL-U10. Put dark text on bright or warm accent fills.** Examples: Chowdeck brown on orange 5.96 [V:126cpH]; #161616 on emerald 7.65 (computed). This agrees with [N]: "Text on warm accent chips should be dark, not white".

**CL-U11. Over plates and footage, prefer frosted glass or a blur plate to a flat scrim.**
- kivi sets all voice text on frosted glass with a 1 px light rim over defocused plates [V:1-6l8S].
- Wix puts its modal over a blurred copy of the image [V:15VhHR t=23.97s].
- Check contrast against the *brightest* plate pixel behind the glass [inferred]. On kivi's desk plate, white would get 4.97:1 against the mid olive #657555 but only 2.36:1 against its light tone #A9AC83, and 2.28:1 on the courtyard's #BFA981 (computed from the sampled plate hex [V:1-6l8S]). That gap is why the glass card is needed, not optional.

> **References win (over scrim guidance).** No reference uses a flat dark scrim. Use glass or blur plates by default. If a flat scrim is unavoidable, use ≥60% opacity (5.74:1 worst case) [N], not the "40% ideal" sometimes quoted [N].

**CL-U12. Thin, saturated text bleeds under 4:2:0 chroma subsampling** [N]. Set accent text at medium weight or heavier, and slightly desaturate the small-size tone. Bumper uses #E46C54 for small orange text vs #F4643C for large [V:19NRDv] [inferred reason].

## 11.4 Accent usage

**What gets the accent.** Only these four things:
1. The benefit or key word in a line [V:19NRDv] [V:1i2L14] [V:1-6l8S].
2. The live / selected / active state [V:1ccYWJ].
3. The brand mark and CTA [V:1CSXtQ] [V:1i2L14].
4. The single object that carries the film's meaning (Wix's heart) [V:15VhHR].

One accent element per scene [N, unverified]. Bumper confirms it: "a single brand accent marks the key word or element in every frame" [V:19NRDv].

**When the accent appears.** Accent elements arrive slightly after the neutral ones, so the accent lands as the payoff:
- kivi's sage phrase lands 3-8 f after the dark subject [V:1-6l8S t=0.1s, 37.25s].
- Wix's red heart is the only colour in its sentence and spins in as a separate object [V:15VhHR t=0.87-1.03s].
Timing details belong to the typography section; the colour rule is "neutral first, accent last" [inferred from these two].

**Accent saturation by style.**
- Calm / premium styles set their *text* tone desaturated (kivi sage) and keep saturation for fields and glows [V:1-6l8S].
- Energetic styles run a saturated accent on dark (Bumper orange, Lottieicon neon), where saturation keeps contrast [V:19NRDv] [V:1ccYWJ].

## 11.5 Light vs dark canvases

| Choose | When | Why it works | Evidence |
|---|---|---|---|
| **Light, off-white** | Product UI is light; the promise is calm, trust or "assistant"; long demos; explainers | No luminance jump when real UI appears; regular-weight type looks elegant; long demos stay comfortable | [V:1-6l8S] [V:1CSXtQ] [V:15VhHR] cream frames; [E] |
| **Dark, tinted** | Visual or creative assets; developer tools; claims that need energy; logo resolves | Emissive accents and glows only read on dark; white UI surfaces become light sources | [V:1ccYWJ] [V:19NRDv] claims; [V:15VhHR] navy logo field |
| **Alternating polarity** | Binary stories (claim/proof, problem/solution) or brand-system promos | The flip is both the cut's accent and a structural signal | [V:19NRDv] (7 flips in 67 s); [V:1i2L14] (11 of 13 cuts) |
| **Flat colour fields** | Editorial or playful explainers | Each scene becomes a distinct "page"; cuts never look like jump cuts | [V:1Hcg3X]; [V:126cpH] (its teardown's rule: ≤4 chapter backgrounds per 18 s, teal bookends) |

**Polarity-flip frequency by style.**
- Monochrome brand system: ≥75% of hard cuts [V:1i2L14].
- Night / Day: at the claim ↔ proof boundary, about once every 9-10 s [V:19NRDv] (computed from 7 flips in 67 s).
- Prompt-native: once, as a 2 s black cold open into white, landing on the first audio hit [V:1CSXtQ t=2.133s].
- Airy Aurora: none; light throughout, with white blooms instead [V:1-6l8S].
- Editorial: change the background colour on almost every cut and never repeat a flat background on consecutive scenes [V:1Hcg3X].

**UI on dark canvases.** Keep UI surfaces slightly below white: tiles #E8EAE8, bezel #CACACA, pill #F5F7F5 [V:1ccYWJ]. Or move proof into a light world [V:19NRDv]. A pure-white card on black "reads like a light source" [V:1ccYWJ]. That is useful once and glaring as a default [inferred].

## 11.6 Gradients and atmosphere

**CL-U13. The background is never dead.** Either the atmosphere keeps moving slowly, or the background is flat and still while the foreground drifts.
- Moving atmosphere: kivi's aurora is "always moving" [V:1-6l8S]; Lottieicon's blobs reposition continuously, about one major reconfiguration every 2-3 s [V:1ccYWJ, inferred].
- Flat background, drifting foreground: HubSpot's cards keep scaling 13-24% [V:1CSXtQ]; the solar film's scenes drift 0.3-0.5% of frame per frame [V:1Hcg3X].
- Speed: slow. ElevenLabs' orb drifts with a period of about 251 s [E, code].
- Measured atmosphere changes, for when the background itself must move:
  - Fade the atmosphere up from black over ≈11 f at the open [V:1ccYWJ t=0.63-1.00s].
  - Dim it by about half over 18 f to clear the stage before a cut [V:1ccYWJ t=18.2-18.83s].
  - Retire an "AI input" field to near-white over ≈15 f [V:15VhHR t=4.93-5.4s].
  - Cycle the field white → saturated green → white as 1.4-1.65 s "breaths" instead of cutting [V:1-6l8S t=0-4.45s].
  - Fade a 3D studio environment in over ≈6 f under a pull-back [V:1CSXtQ, rule 5].
  - Anything faster than these (a field that changes in under ≈6 f without a cut) reads as a flash, so count it against the flash budget in CL-U18 [inferred].

**CL-U14. Keep atmosphere gradients in one family.** Either 2-3 analogous stops (kivi mint / lime / aqua; Lottieicon deep greens) for calm, or one warm-cool pair (Bumper's coral glow on navy and violet) for energy [V:1-6l8S] [V:1ccYWJ] [V:19NRDv] [inferred classification]. Blob scale: kivi's aurora blobs are ≈13% W gaussians, about 250 px @1080p [V:1-6l8S] (converted from native px).

**CL-U15. Put the ambient light source in one corner and keep it there.**
- Two references place theirs top-right: Bumper's coral glow [V:19NRDv]; NOSTRA's mint corner glow (t=7.57-10.63 s) and the lighter top-right rim on its glass tiles (t=25.93-30.63 s) [V:1i2L14]. A third agrees on the side only: HubSpot's studio wall runs from #C8D4DF-#D3DCE6 on the left to #F4F5F8 on the right, i.e. lit from the right [V:1CSXtQ t=17.8-21.5s; direction inferred from the gradient].
- Default: upper-right [inferred majority]. Shadows, glass rims and corner glows must agree with it (CL-U19).

**CL-U16. Dither every gradient.** Four of eight references band visibly: kivi's aurora [V:1-6l8S], Lottieicon's dark greens [V:1ccYWJ], Bumper's navy [V:19NRDv], Wix at about 650 kb/s [V:15VhHR].
- Add 1-2% grain or dither [V:1ccYWJ rule 16].
- Render bt709 from PNG frames or JPEG ≥95, CRF 18 [N].
- Deliver at ≥8-12 Mb/s at 1080p for UI-heavy films [V:1CSXtQ].

## 11.7 Glow and bloom

**CL-U17. Glow means light emission or an active state. It is never decoration.**
- "Emissive objects get bloom; nothing else does" [V:1Hcg3X].
- "Green = alive or selected" carries the glow [V:1ccYWJ].
- kivi's halos mark the "listening" state and the logo symbol [V:1-6l8S t=1.55s, 31.85s, 72.27s]. Its only other glow is a soft outer glow on the app-icon glass tiles [V:1-6l8S t=34.15s].
- HubSpot uses **no glow at all** [V:1CSXtQ].
So glow is style-specific. Universally, glow must have a reason.

| Use | Measured size | Evidence |
|---|---|---|
| Halation on emitters (lamp, screen, light ring, neon label) | Radius ≈1-2% of frame | [V:1Hcg3X] |
| Bloom on white type on dark | Observed ≈15-20 px @1080p on the hero word "One" (cap ≈250 px, so ≈6-8% of cap). At that strength the oversize "Save" smears its letter edges for 3-4 f, and the teardown's correction is to cap glow radius at ≈2-3% of cap height. Use the corrected cap. | [V:19NRDv t=2.40s, 7.2s] |
| Under-glow beneath a hero UI component | Falloff ≈10% H (≈108 px @1080p) | [V:1ccYWJ t=12.17s] |
| Highlight tile glow | ≈20% of tile size | [V:1ccYWJ t=27.13s] |
| Map pin | Soft orange radial halo | [V:126cpH t=11.6s] |
| Logo symbol halo | Soft circular halo around a ≈15% W symbol | [V:1-6l8S t=72.27s] |
| Orb halo | 1.4× radius, 80 px blur, 25% alpha | [E] (inferred recipe) |
| Glow as anticipation | Glow area ramps ×9.5 over 2.1 s; cut on the brightest frame | [V:1ccYWJ t=18.87-21.0s] |

## 11.8 Light as a transition material

| Device | Duration | Mechanics | Evidence |
|---|---|---|---|
| White radial bloom from a UI element | 3-4 f (100-133 ms) | The next title is already visible through the bloom | [V:1-6l8S t=62.90-63.00s] |
| Click → light bloom → white | ≈6 f | Motivated by a cursor click on the tile | [V:1-6l8S t=36.95-37.15s] |
| Colour / aurora wash | ≈7 f | A green blob sweeps across and dissolves the text | [V:1-6l8S t=1.50-1.73s] |
| Bottom-up white wash | ≈18 f (600 ms) | Covers the plate while the card scales away | [V:1-6l8S t=46.0-46.6s] |
| Single white frame | 1 f | Between an expo punch and a burst | [V:1-6l8S t=7.967s] |
| Violet halo bloom (AI invoked) | 3 f | Behind the selected image, then cut-in | [V:15VhHR t=23.83-23.93s] |
| Exponential colour dissolve into the logo field | Strong colour gone in 8 f, settled at 25 f | Red heart field → navy | [V:15VhHR t=51.37-52.20s] |
| Light-source match | 2 f shrink + 2 f hold + cut | The sun shrinks to a ≈4% W point where the lamp will appear | [V:1Hcg3X t=3.30-3.43s] |
| Glow build → hard cut | ≈2.1 s ramp | Cut on the frame with the largest glow area | [V:1ccYWJ t=18.87-21.0s] |
| Polarity flip on a hard cut | 0 f | Same text position, colours inverted | [V:19NRDv t=1.167s] [V:1CSXtQ t=2.133s] [V:1i2L14] |
| Flash frames | 3 f + 2 f, once per film | Full-frame colour flip at the conceptual peak | [V:1Hcg3X t=12.83-12.97s] |
| Dim-to-black before a cut | 18 f, background −48% | Elements exit up while the background dims | [V:1ccYWJ t=18.2-18.83s] |
| **Avoid:** 1-frame dip to black | 1 f | "Reads as a render glitch" | [V:19NRDv t=25.60s] |

**CL-U18. Route changes between materials (UI ↔ type card ↔ scene) through light or polarity rather than plug-in transitions.**
- kivi routes 12 of 32 transitions through white [V:1-6l8S].
- Lottieicon: "None are generic plug-in transitions (no glitches, no luma wipes, no spins)" [V:1ccYWJ].
- Keep flashes ≤3 f, ≤1 per film, and ≤3 flashes per second [N, WCAG 2.3.1] [V:1Hcg3X].

## 11.9 Lighting consistency

**CL-U19. One key-light direction per film.** Cast shadows, glass rims, specular highlights and ambient corner glows all agree. The solar film breaks this: battery shadows fall right (light from the left) while token shadows fall down-left (light from the upper right). The teardown's own rule is "pick one light direction and keep it" [V:1Hcg3X]. Default: soft top light for UI shadows (y-offset only) plus an ambient glow from the upper right (CL-U15) [inferred].

**CL-U20. Use one shadow recipe per style.**

| Recipe | Spec | Evidence |
|---|---|---|
| Soft UI shadow (default) | Y-offset only, large blur, low opacity. At 1080p for a 960-1280 px card: offset ≈24 px (2.2% H), blur ≈48 px (4.4% H), black at 6-8%, plus a 1 px hairline at ≈6% | Observed qualitatively in [V:1CSXtQ] (falloff to ≈#F0F0F0 on white, i.e. ≈6% darkening), [V:1-6l8S], [V:15VhHR]; numbers from [E] (inferred for video) |
| Light rim on glass or cards | 1 px light rim; on glass a lighter rim on the light side | [V:1-6l8S] [V:1i2L14] |
| Flat-style depth | A solid offset backing card, 4-6% offset, no blur | [V:126cpH t=9.27s] |
| Editorial hard shadow | A long, hard cast shadow in one direction | [V:1Hcg3X] |
| Floating object contact | A shadow ellipse or a glowing pad under the object | [V:1Hcg3X t=6.83s, 14.30s] |
| **Avoid** | A 45° long shadow on type (dated) | [V:126cpH] |

**CL-U21. Glass recipe.**
- Heavy backdrop blur with a tint sampled from the scene behind.
- A 1 px light rim and a soft inner glow; corner radius ≈2-3% W.
- On entry, the card goes from opaque white to frosted over ≈8 f [V:1-6l8S t=39.75-40.2s].
- The rim is lighter on the key-light side [V:1i2L14].
Glass is a material, so it falls under AD-U1: one glass recipe per film.

**CL-U22. Lock the plate lighting and change it only for story.**
- Every plate shares one time-of-day logic, key direction, contrast and grade (AD-U6).
- Temperature changes must be narrative. kivi's coder scene moves to "low-key warm practicals" because it is night [V:1-6l8S t=53.57s]; its hook cycles white → saturated green → white as three "breaths" [V:1-6l8S t=0-4.45s].
- An unmotivated change in light between two shots of the same place reads as an AI or continuity error [inferred].

**CL-U23. 3D studio lighting for the hero beat.**
- Soft diffuse light; one radial gradient back wall (#C8D4DF, darker side → #F4F5F8); a gentle vignette; DOF reserved for this beat [V:1CSXtQ t=18.0-21.5s].
- Moderate-telephoto feel: about 10° yaw and little perspective convergence [V:1CSXtQ]. Bumper's UI has a similar mid-telephoto feel [V:19NRDv, inferred].
- Why: a telephoto feel keeps UI planes undistorted, so text stays legible in 3D.

## 11.10 Colour as narrative

| Device | Spec | Evidence |
|---|---|---|
| **Desaturated → colour bloom** (problem → product) | Plate starts B&W; saturation ramps linearly over 22-42 f (0.73-1.4 s), starting as the product engages; the background defocuses at the same time. At kivi's 4-7 VO words/s that spans roughly the first 3-10 spoken words (computed; the bloom durations are flagged "not re-measured" in the teardown). | [V:1-6l8S t=18.57-19.33s, 54.0-55.4s]; text-only corroboration: [S:Duolingo] grey "chore" card → brand colour; [S:Bolt] desaturated friction → full-saturation yellow |
| **AI-acting colour** | Gradient sweep or thermal / pixel state for 8-15 f, then settle | [V:15VhHR] |
| **Status narrative** | Fail red → fail red → success teal tells failover with no labels | [V:19NRDv t=39.87-46.13s] |
| **Matched / done** | A mint fill wipes left to right in 4 f with a feathered edge | [V:19NRDv t=20.37-20.50s] |
| **Chapter coding** | One background colour per chapter; brand colour bookends | [V:126cpH] |
| **Colour-match cut** | The outgoing dominant colour equals the incoming one (orange court → orange site) | [V:15VhHR t=12.47s] |
| **Materialise the wordmark** | Silver ghost → brand colour over ≈42 f, finishing with a left-to-right tonal sweep | [V:1-6l8S t=6.2-7.6s] |
| **Dim to texture for focus** | Context drops to 15% while the number counts | [V:1ccYWJ t=9.833s] |
| **Signal isolation** | Everything at 20%, desaturated; the target turns the accent with a pulse ring | [S:TradeLens] (inferred transfer) |

## 11.11 Backgrounds

| Background type | Recipe | Motion rule | Best for | Evidence |
|---|---|---|---|---|
| Off-white + faint corner glow | #F4F5F4 with a mint glow top-right | Still; the foreground drifts | Type cards in brand-system films | [V:1i2L14] |
| White + moving aurora | #F9FAFC with mint, lime and aqua blobs ≈13% W | Always drifting | Calm-tech, voice/AI | [V:1-6l8S] |
| Pure white flat | #FFFFFF | Still; cards drift 13-24% | Prompt-native UI films | [V:1CSXtQ] |
| Tinted dark + glow blobs | Navy #06004E, coral top-right, violet floor | Slow drift | Claims, fintech energy | [V:19NRDv] |
| Black + aurora | #000 with deep-green blobs | Reconfigures about every 2-3 s | Dark neon libraries | [V:1ccYWJ] |
| Black void | #000, no atmosphere | — | Carousels, decks and walls of *content*, so the content's colour dominates | [V:15VhHR t=14.13s, 48.27s] [V:1ccYWJ] |
| Flat field per scene | One palette colour, changed on each cut | Scene drift | Editorial explainers, playful ads | [V:1Hcg3X] [V:126cpH] |
| Defocused lifestyle plate | One illustration or photo style, one light, heavy defocus | Near-static | Life scenes behind glass UI | [V:1-6l8S] |
| Matching photography (UI in world) | The site photo extended full-bleed, horizon and light matched | Micro-drift | Creative tools, site builders | [V:15VhHR t=19.73s] |
| 3D studio sweep | #C8D4DF → #F4F5F8 radial with vignette | Camera moves | The single hero 3D beat | [V:1CSXtQ] |
| Floor grid with fog | A perspective plane fading into the brand colour | Slow drift | "One among many" stories | [V:1i2L14 t=19.13-20.33s] |
| Iridescent pastel field | Pink / lilac / mint blob field | Fades to near-white over ≈15 f | AI-input states only | [V:15VhHR t=4.23-5.4s] |

## 11.12 Texture, grain and the delivery colour pipeline

- **Grain is a style choice, not a default.**
  - Measured absent in six references: kivi (high-pass σ 0.0-0.1), Bumper (σ ≤0.15), HubSpot, Wix, Chowdeck, Lottieicon.
  - Present only in the editorial explainer (fine monochrome grain, ≈3-5% opacity [inferred]) [V:1Hcg3X] and as grain-gradient shading on NOSTRA's 3D props [V:1i2L14]. ElevenLabs' Chladni recipe suggests 3% [E, inferred].
  - Use grain only with AD-S6 / AD-S7. Dither (CL-U16) is universal.
- **Pipeline**:
  - bt709; PNG frames or JPEG ≥95; H.264 CRF 18 [N].
  - ≥8-12 Mb/s at 1080p for UI-heavy films [V:1CSXtQ]; never under about 2 Mb/s for 720p gradients [V:15VhHR].
  - Deliver at ≥1080p. Every reference is sub-HD (§0.1); blocking in gradients and illegible micro-text are listed as flaws in [V:1ccYWJ] [V:1CSXtQ] [V:15VhHR] and banding in [V:1-6l8S] [V:19NRDv].
- **Colour of text under compression**: see CL-U12.

## 11.13 Palette presets (contrast-verified)

Ready-to-use sets derived from the references. Every text pair is computed.

| Preset (style) | Canvas | Ink (ratio) | Accent field | Accent text tone (ratio) | Notes |
|---|---|---|---|---|---|
| Airy Aurora (AD-S1) | #F9FAFC | #0B0B0B (18.85) | #8EE1B2 / #5FE7A0 / #E1F3BA (glow and wash only) | #396454 (6.43) or #556962 (5.61) | Never put #8EE1B2 on text (1.48) |
| Prompt-native (AD-S2) | #FFFFFF | #1A1A1A (17.40) | #F65542 (icon only, 3.34) | #CE4737 (4.58) if accent text is needed | System blue #3585E4 for "on" states (3.73, non-text) |
| Night / Day (AD-S3) | #06004E / #FCFCFC | #FCFCFC (18.31) / #04043C (18.82) | #F4643C | #F4643C on navy (6.03); #C14A2B on light (4.78) | Status hues inside UI only |
| Editorial frame (AD-S4) | #F9F5F2 / #02003E | #1B1A55 (14.61) / white (19.59) | #DB2C36 (object) | #C42630 (5.28) | AI cyan #43D8F9 as a transient fill only (1.69) |
| Dark neon (AD-S5) | #0A0F0A + green blobs (dithered) | #F5F7F5 (17.97) | #38D037 | #38D037 itself (9.44 on #0A0F0A) | Text on green fills: #161616 (8.83), never white (1.90-2.05) |
| Monochrome system (AD-S6) | #F4F5F4 ↔ #2FC06C | #161616 (16.56; 7.65 on green) | #2FC06C (field) | #1D7A44 on off-white (4.90) | White text needs a #20864B fill (4.59) |
| Risograph (AD-S7) | Cycle #4DD9E5 / #E12E16 / #F6F1ED / #1D0B0A / #F3C64E | Oxblood on cyan (11.20) or mustard (11.77); white on oxblood (19.01) | Cyan ↔ vermilion | White on vermilion (4.56) | Cream on vermilion is only 4.07: large type only |

## 11.14 Style-specific, experimental, avoid, SaaS

**Style-specific (CL-S).**
- **CL-S1.** Bloom on type only in dark, energetic styles (AD-S3). Never in prompt-native (AD-S2).
- **CL-S2.** Polarity flips on most cuts only in the monochrome brand system (AD-S6).
- **CL-S3.** Grain only in risograph / tactile styles (AD-S6, AD-S7).
- **CL-S4.** A full-field accent only in brand-system and playful styles (CL-U6).
- **CL-S5.** Emissive under-glow and glow ramps only in dark neon (AD-S5).

**Experimental (CL-X).**
- **CL-X1.** B&W → colour bloom as the film's master metaphor (AD-X1).
- **CL-X2.** Thermal / false-colour generation develop (AD-X2).
- **CL-X3.** Grain-gradient 3D (AD-X3).
- **CL-X4.** Glow-build cut (AD-X5).
- **CL-X5.** Watercolour ink-bloom mask (AD-X4).
- **CL-X6.** Chladni / orb atmospheres driven by voice loudness [E].

**Avoid (CL-A).**

| ID | Avoid | Seen in | Fix |
|---|---|---|---|
| CL-A1 | Accent field tone used as text (2.2-2.4:1) | [V:1i2L14]; [V:1-6l8S] feature teal (approx.) | CL-U3 text tone |
| CL-A2 | White text on bright accent fills | [V:1i2L14] (2.37) | Dark text (CL-U10) or a darkened fill |
| CL-A3 | Low-contrast data marks (violet glass bars on navy) | [V:19NRDv t=11-14s] | ≥3:1 (CL-U9) |
| CL-A4 | Bloom that smears letter edges | [V:19NRDv t=7.2s] | Cap at ≈2-3% of cap height |
| CL-A5 | Glow on non-emitters | Warned in [V:1Hcg3X] | CL-U17 |
| CL-A6 | Pure-black dark gradients without dither at low bitrate | [V:1ccYWJ] (also [V:1-6l8S] [V:19NRDv] [V:15VhHR] banding) | CL-U16 |
| CL-A7 | AI / duotone colour held for more than ≈15 f | [V:15VhHR] | CL-U5 |
| CL-A8 | Mixed light directions across scenes | [V:1Hcg3X] | CL-U19 |
| CL-A9 | Plates in different rendering and light styles | [V:1-6l8S] | AD-U6, CL-U22 |
| CL-A10 | 1-frame dip to black between light and dark scenes | [V:19NRDv t=25.60s] | Clean cut, or a 2-4 f luma dip [V:19NRDv] |
| CL-A11 | More than one flash, or flashes longer than 3 f | [V:1Hcg3X] guidance; WCAG [N] | CL-U18 |
| CL-A12 | Muddy duotone tints on "problem" cards | [V:1i2L14 t=10.63-13.97s] | Use desaturation (CL-X1) rather than a hue tint |
| CL-A13 | A one-frame light-leak artefact at a cut | [V:1-6l8S t=59.73-59.77s] | 1-frame stepping QC |
| CL-A14 | "Generic neon technology visuals" | [W:motion.so] | AD-U8 |

**Especially good for SaaS (CL-SaaS).**
- **CL-SaaS1.** The field / text accent split keeps brand colour visible while UI copy stays legible (CL-U3).
- **CL-SaaS2.** Reserved AI colour, transient (CL-U5) [V:15VhHR].
- **CL-SaaS3.** Status colours as narrative, inside UI only (CL-U4) [V:19NRDv].
- **CL-SaaS4.** Desaturated problem → colour solution [V:1-6l8S].
- **CL-SaaS5.** Light canvas when the product UI is light: no jump when the UI appears [V:1CSXtQ].
- **CL-SaaS6.** Dim-to-texture behind proof numbers [V:1ccYWJ].
- **CL-SaaS7.** White light as the bridge between brand world and product world [V:1-6l8S].

## 11.15 Do / Don't pairs

| Do | Don't | Why | Evidence |
|---|---|---|---|
| Use an off-white tinted to the brand (#F4F5F4, #F9FAFC) | Default to #FFFFFF / #000000 | Tinted neutrals carry the brand and don't band | CL-U2 |
| Keep the bright accent for fills and glows, with a darker text tone ≥4.5:1 | Set the bright accent as small text | 2.2:1 is unreadable on phones | CL-U3 |
| Put #161616 on bright green / orange chips | Put white on bright chips | 7.6-8.8:1 vs 1.9-2.4:1 | CL-U10 |
| Glow only things that emit light or are "active" | Glow everything for "premium" | The glow becomes a meaningless filter | CL-U17 |
| Show AI colour for 8-15 f, then settle | Leave UI tinted "AI blue" | A held effect reads as a glitch | CL-U5 |
| Light from one corner; shadows agree | Let each shot choose its own light | Identity drift | CL-U19 |
| Dither gradients and deliver ≥8 Mb/s at 1080p | Ship dark gradients at <2 Mb/s | Banding cheapens premium work | CL-U16 |
| Route material changes through white light or polarity flips | Use plug-in transitions | Brand-owned connective tissue | CL-U18 |
| Bloom a B&W "before" plate to colour on the product's first action, in every matching scene | Apply the device in only some scenes | Inconsistency reads as an error | AD-X1 |
| Specify hex, key-light direction and grade in every AI shot prompt | Write "cinematic lighting" | Vague prompts drift | AD-U6 [inferred] |

---

## Appendix A. Where the references overrule generic advice

| # | Generic advice | What the references do | Ruling |
|---|---|---|---|
| 1 | Lines ≤68% of 16:9 width [N, BBC] | Single-line statements at 74-84% W ([V:1-6l8S] [V:1i2L14] [V:19NRDv] [V:126cpH]) | **References win** for one line of ≤6 words (cap 85% W). Keep 68% for multi-line copy (CO-U11). |
| 2 | Keep all graphics inside the 5% safe area [N] | Macro hook type bleeds off both edges; UI overflows to imply a larger interface ([V:15VhHR] [V:1CSXtQ]) | **References win** for ≤0.7 s hook display type and resolved UI overflow; never for information (CO-U15/16) |
| 3 | 60 / 30 / 10 colour split [N, unverified] | ≈90-95 / 3-8 / ≤5 in premium frames; a 100% accent field alternating in brand-system films ([V:1CSXtQ] [V:1i2L14]) | **References win** (CL-U6) |
| 4 | Text over imagery: a flat scrim (≥60% [N]; "40% ideal" elsewhere [N]) | Frosted glass cards or blur plates, never a flat scrim ([V:1-6l8S] [V:15VhHR]) | **References win**: glass or blur first; a scrim ≥60% only as a fallback (CL-U11) |
| 5 | Pure white / pure black canvases as neutral defaults [inferred common practice] | 5 of 8 use tinted off-white; tinted darks; pure #000 bands ([V:1ccYWJ]) | **References win** (CL-U2), with the HubSpot pure-white exception |
| 6 | 9:16 strict text-safe union (x 120-840) [N] | Chowdeck hero words at 80-84% W ([V:126cpH]) | **Generic wins here**, as an explicit exception: physical occlusion by platform UI, and the reference's overlay could not be checked. Compromise in §4.7. |
| 7 | Accent contrast ≥4.5:1 / 3:1 [N] | 4 of 5 accent references comply by splitting tones; NOSTRA does not | **No conflict**: the majority of references agree with [N]. The outlier is listed under Avoid. |

## Appendix B. Evidence strength and gaps (read before relying on a number)

- **Strong (confirmed in 3 or more references, frame-measured):**
  - The statement band at 47-52% H.
  - Off-white or tinted neutrals.
  - One brand accent.
  - Negative space ≥85% on statement frames.
  - Glow tied to emitters or state.
  - Banding at low bitrate.
  - UI micro-text illegible at 1-2% H.
  - Bookending.
  - Dim-to-focus.
  - Anchored elements across cuts.
- **Medium (1-2 references):**
  - Ambient light top-right (2 references top-right, a third right-side only; inferred from glows, rims and one gradient, not lit 3D).
  - The polarity-flip frequency rules.
  - The 1:2.5 hierarchy ratio (4 references, but one is a different world).
  - Hero-object 30-45% W (one reference).
  - Glass recipe numbers (one reference).
- **Weak / inferred:**
  - **All 9:16 composition values** rest on one reference ([V:126cpH], measured through a crop of a screen capture) plus [N] platform data.
  - **1:1 and 4:5 have no reference at all** ([N] only).
  - Soft-shadow pixel recipes come from [E] web tokens, not measured video.
  - Hex values carry ±3-5 levels of encode error, and three teardowns list their palettes as not re-measured.
  - No reference provides measured colour temperature (Kelvin) or 3D key/fill ratios, so plate-lighting specs for AI generation (CL-U22) are [inferred].
  - Grain opacity (≈3-5%) is inferred.

## Appendix C. Premium vs amateur, item by item (QC checklist)

One line per scope item. "Premium" is what the references do; "Amateur" is the failure a reference shows or its teardown warns against.

| Item | Premium tell | Amateur tell | Evidence |
|---|---|---|---|
| Grid | Focal element on a named anchor (statement band 47-52% H, thirds, 13% W column) and held there across cuts | Elements placed by eye, a new height on every card | §4.1; [V:15VhHR] [V:1CSXtQ] |
| Negative space | ≥85% empty on statement frames; small regular-weight type | A large, long headline filling the frame ("reads as an ad") | [V:15VhHR] [V:1CSXtQ] |
| Focal hierarchy | One text level per frame, or ≥1:2.5 between two | Three similar sizes; 4+ same-size centred cards in a row | [V:1CSXtQ] [V:1ccYWJ] |
| Safe areas | Information inside 5% (16:9) or x 120-840 / y 270-1210 (9:16); bleed only for ≤0.7 s hook type | Caption clipped by the frame edge for 5 s; text-bearing UI below y 1210 in 9:16 | [V:19NRDv t=30.9-35.9s] [V:126cpH t=11.07s] [N] |
| Palette | ≤5 named colours, one accent split into field and text tones, tinted neutrals | Accent field tone used as text (2.2-2.4:1); pure #000 gradients | [V:1i2L14] [V:1ccYWJ] |
| Contrast | Body text 5.6-18.9:1; dark text on bright chips | White on bright green (1.9-2.4:1); violet bars on navy | [V:1-6l8S] [V:1i2L14] [V:19NRDv] |
| Light / dark canvas | Polarity chosen per world (claim vs proof) and flipped on a cut | 1-frame dip to black between worlds | [V:19NRDv t=25.60s] |
| Accent usage | One accent element per frame, arriving after the neutral words | Accent on several things at once, or on decoration | [V:19NRDv] [V:1-6l8S] |
| Glow / gradients | Glow only on emitters or "active" states, radius ≤3% of cap; dithered gradients | Bloom smearing letter edges for 3-4 f; visible banding | [V:19NRDv t=7.2s] [V:1ccYWJ] |
| Lighting consistency | One key direction, one plate style and grade, restated or referenced in every AI shot | Mixed shadow directions; plates in three illustration styles | [V:1Hcg3X] [V:1-6l8S] |
| Backgrounds | Never dead: slow atmosphere or a drifting foreground; flat fields change per scene | Static flat plates with static content ("slideshow") | [V:1-6l8S] [V:1Hcg3X] |

---

## Audit (2026-10-08, adversarial pass against the per-video teardowns and web briefs)

Method: I re-read the eight teardowns (shot tables, typography, visual quality, rules and verification sections) and the [N], [E], [P], [S] and [W] briefs, then checked every cited number. I recomputed all WCAG ratios with a script from the cited hex values.

Changes made (24):
1. §0.1: the caveat said six files are sub-HD; all eight are (Chowdeck is a phone-capture crop, NOSTRA a 1011×567 inset). Added [V:1ccYWJ] to the list of teardowns whose palette hex was not re-measured.
2. §0.2 and CL-U8 context: the "≈117 px on 16:9" large-text threshold is not in [N]. It is now tagged as my own derivation.
3. §0.2: the text-level ratio range is corrected to the computed ≈1:2.4-1:5 (one frame) and up to 1:6.6 (across cards).
4. §4.0: "a reference shot lasts 1.2-6 s" was wrong. Shots run 0.23-6.3 s with ASLs of 1.58-2.49 s.
5. CO-U2 Chowdeck row: the ascender range now includes "seconds" (9.6% H) and the ratio is computed as ≈1:2.4-1:3.3, not 1:2.5-1:3.
6. CO-U2 Bumper row: the ratio is computed from the size table as ≈1:2.7-1:5, not 1:3.5-1:4.
7. CO-U2 Lottieicon row: statement em sizes are 6.7-10.8% H per the typography table, so the ratio is ≈1:4-1:6.6, not ≈1:5.
8. CO-U2 "why": the rule is now reconciled with Chowdeck's 1:2.4 pair (colour also separates the levels).
9. CO-U5: the 2.5% H read-class floor had no citation. It now cites the three teardowns that set it.
10. §4.5 wordmark row: kivi's lowercase serif wordmark is 15.4-21% H ascender-to-baseline, outside the stated "cap 7-12% H". The row now says so.
11. CO-U18: "ElevenLabs ships vertical only as adaptations of a 16:9 master" was cited as [E] fact. The brief marks it [inferred]; only the Shorts-only observation is sourced.
12. CL-U3 table: kivi's field-tone ratios were labelled "on white" but 1.48 is on #F9FAFC (1.55-1.56 on #FFF). Corrected.
13. CL-U3 table: Lottieicon's 1.90:1 is for its #F5F7F5 type; pure white is 2.05:1. Corrected, and the 19.5:1 is labelled "on #000".
14. CL-U3 table: Bumper's small-text tone #E46C54 is 5.88:1 on navy, not "≈6:1". The large tone is 6.03:1.
15. §11.3: "White on navy 18.31" is actually #FCFCFC; pure white is 18.79. Relabelled.
16. §11.3 and §11.13: "White on neon 1.90" is #F5F7F5; pure white is 2.05. Relabelled.
17. CL-U11: "white on kivi's olive desk would already be 4.97:1" used the mid olive. The plate's light tone #A9AC83 gives 2.36:1 and the courtyard's #BFA981 2.28:1. The claim is reversed: glass is needed.
18. CL-U15 and Appendix B: "three references place the ambient light top-right" overstated HubSpot. Its studio gradient is darker left, lighter right, with no top component. It now reads two top-right plus one right-side, with timestamps added for NOSTRA.
19. CO-U19 depth table: "bubbles in 2-3 depth bands" is not in the teardown. Replaced with the measured foreground-to-midground rack focus (t=39.2-39.7 s).
20. §11.10: "the bloom lasts about as long as the first 2-3 spoken words" was unsourced and inconsistent with kivi's 4-7 words/s. It is now computed (≈3-10 words) and flagged as resting on non-re-measured durations.
21. §4.11 AD-S5: the statement width range now notes the auto-fit lines reach ≈69% W.
22. §11.5: Chowdeck's "≤4 backgrounds per 18 s" is the teardown's prescriptive rule, not a count. Relabelled.
23. §11.12: the "six sub-HD references" bullet cited three. Rewritten against §0.1 with the correct flaw citations.
24. Coverage added: AD-U6 now gives a concrete AI plate-lock mechanism ([P] reference images and ingredients, up to 3) plus a QC check. CL-U13 now gives measured atmosphere speeds (≈6-18 f fades and dims, 1.4-1.65 s breaths). Appendix C adds a premium-vs-amateur checklist for every scope item.

Verified and left unchanged: the reference roster; the statement-band, thirds, flank, column and ground-line anchors; the negative-space and hero-UI widths; the safe-area numbers against [N]; all palette hex against the teardown tables; the remaining contrast ratios (they match the recomputation to ±0.01); the glow sizes, transition durations, polarity-flip counts, grain measurements and shadow recipe; and the [S], [W] and [P] quotations.

Remaining known gaps:
- Every 9:16 composition value still rests on one reference measured through a screen-capture crop ([V:126cpH]), plus [N]. 1:1 and 4:5 have no reference at all.
- Palette hex for kivi, Wix, Bumper and Lottieicon was never re-measured; kivi's bloom durations and Bumper's particle count likewise.
- There is no measured colour temperature, key/fill ratio or atmosphere drift speed (px/s) for any reference. Aurora and blob motion speeds remain qualitative or inferred.
- The soft-shadow pixel recipe comes from [E] web tokens, not from video.
- The 16:9 "large text on a phone" threshold (≈117 px) and the bottom-overlay keep-out (y ≈918) are my derivations.
