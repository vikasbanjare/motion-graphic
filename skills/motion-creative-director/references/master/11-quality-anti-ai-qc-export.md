# Master SaaS Motion Design System, Part 11
## Master §21 Anti-AI-Look Guidelines · §22 Quality-Control Checklist (with the Phase-18 QC gate) · §23 Common Mistakes · §24 Final Export Recommendations

Draft v1, 2026-10-08. Built from the frame-level teardowns of the eight reference films in the user's folder, including their adversarial verification passes, plus the text-only research briefs. This part is the last line of defence. Parts 01-10 say how to design, animate, cut and score a premium SaaS film. This part says how to stop it looking generated, how to prove it is right before anyone sees it, which mistakes to expect, and how to ship it without losing quality in the encode.

It is written for three readers:
- a senior motion designer or editor who signs off a film;
- an AI video system that generates plates or renders templates and must check its own output;
- a producer who needs pass/fail criteria rather than taste arguments.

This part leans on numbers already set in other parts and cross-references them instead of repeating them in full:
- Story QC gate: Part 01 §2.16. Art direction, composition and colour (AD-, CO-, CL-): Part 02.
- Ease tokens (E-OUT, E-INOUT, E-EXIT, E-WHIP, E-GRAVITY …): Part 03 §19.3. Speeds (SP-) and frame-rate rules: Part 03 §18, §18.12.
- Camera moves (CM-01 to CM-20), the camera block template, depth rules (DP-) and hero shots (HS-): Part 04.
- Transitions (TR-) and the transition QC gate: Part 05 §7.15.
- UI rules (UI-), the UI anti-AI table and the UI QC gate: Part 06 §8.14, §8.18.
- Typography (TY-, RM-) and the typography QC gate: Part 07 §9.21.
- Rhythm (ER-), shot durations and the rhythm QC gate: Part 08 §15.18.
- Sound (SD-), loudness targets and the sound QC gate: Part 09 §16.11, §16.20.
- 2D, 3D and hybrid rules and style categories: Part 10.

---

## 0. How to read this part

### 0.1 Units and tags

**Units**
- **f**: one frame at 30 fps (33.3 ms). 30 f = 1 s.
- **% W / % H**: percent of frame width / height. **% W/f**: percent of frame width per frame (a speed). 1% W = 19.2 px at 1920×1080 (**@1080p**); 1% H = 10.8 px @1080p. On 1080×1920 (**@1920p**), 1% W = 10.8 px and 1% H = 19.2 px.
- **Levels**: 8-bit code values (0-255). "≤1 level per frame" means the mean absolute frame-to-frame difference on a region is at most 1 code value.
- **ΔE00**: CIEDE2000 colour difference. ΔE00 ≈ 1 is a just-noticeable difference side by side; ≈ 2-3 is noticeable in a cut [inferred: standard colour-science rule of thumb, not in the research sources].
- **LUFS / dBTP / LU**: integrated loudness, true peak, loudness range (EBU R128 / ITU-R BS.1770 meters).
- **Mb/s, kb/s**: video or audio bit rate.

**Evidence tags** (same as Parts 01-10)

| Tag | Source | What it may support here |
|---|---|---|
| `[V:<id6> t=..s]` | Frame-level teardowns of the user's 8 reference films, including their verification passes | Everything, including frame timing, file properties and measured flaws. Strongest evidence. |
| `[N]` | Motion-numbers brief: Material 3, Carbon, Apple, Remotion docs/source, WCAG, Netflix/BBC, EBU, AES, platform safe zones | Standards, platform behaviour, renderer behaviour |
| `[P]` | Voice and footage pipeline brief: ElevenLabs, Veo 3.1, Flow, Gemini API, Whisper | Generative-video and voice-pipeline facts |
| `[E]` | ElevenLabs style brief | Brand rules, master formats and open-source orb/waveform code are sourced; its motion timings are its author's inference |
| `[S:<brand>]`, `[S:playbook]`, `[S:critic]` | Superside text research (20 SaaS videos) and its audit | Intent, copy, structure, delivery metadata from Wistia JSON. Never frame timing. |
| `[W:motion-so]`, `[W:showreel-design]`, `[W:raivcoo]` | Inspiration-site catalogues, text only | Vocabulary, intent, style labels. Never timing. |
| `[kit]` | This repository's `motion-kit` (Remotion 4.0.534), read from its config, scripts and installed renderer | What the template engine in this repo currently does |
| `[inferred]` | My synthesis, or general professional knowledge not present in the sources | Not directly observed or sourced. Verify before relying on it. |

Text-only sources ([S], [E], [W], [P]) support intent, vocabulary and structure. They never support frame-level timing claims.

**Conflict policy.** Where the user's references disagree with generic advice, **the references win**, and the place is flagged "References win". There is one important exception in this part. On **delivery quality** (frame rate, bit rate, loudness, banding), the references are mostly counter-examples: their own teardowns flag those failures. There the physical or platform standard wins, and the references *confirm* it. Those places are flagged "Standard wins, references confirm".

### 0.2 Rule IDs and classes

| Prefix | Section | Meaning |
|---|---|---|
| **AA-** | §21 | Anti-AI-look rules. AA-01 … AA-25 are problem cards; AA-G are generative-video operating rules; AA-T are template/code-engine operating rules. |
| **QC-** | §22 | Individual quality checks, grouped by gate (QC-1.x per shot, QC-2.x locked cut, QC-3.x master). |
| **G-** | §22.1 | Phase-18 gate questions, answered yes/no on the production package and again on the outputs. |
| **MK-** | §23 | Common mistakes, ranked by how many references show them. |
| **EX-** | §24 | Export and delivery rules. |

Class suffixes, as in Parts 03-10:
- **U** = universal. Either seen in ≥3 of the 8 references with none contradicting it, or a physical/platform limit that no reference contradicts (marked "U (standard)").
- **S** = style-specific (named style). **X** = experimental (one reference, or untested). **A** = avoid. **SaaS** = especially good for SaaS films.

"n/8" counts the references that show a pattern or a flaw.

### 0.3 Reference roster as quality evidence: what the eight files actually are

| Tag | Film | File as received | Cadence | Video quality notes | Loudness | Generated content? |
|---|---|---|---|---|---|---|
| [V:1-6l8S] | kivi voice-AI launch, 77.8 s | 1138×640, 16:9 | Native 30 fps | No grain (flat-area high-pass σ 0.0-0.1); no motion blur anywhere; aurora gradients **band**; a 1-frame light-leak patch at 59.73 s | **−10.7 LUFS** (hot) | **Yes, probably**: background plates "look AI-illustrated", in three different styles, with mushy crowd faces at 64-69 s |
| [V:126cpH] | Chowdeck delivery-app ad, 18.1 s | 640×1138 phone video of an After Effects monitor (ad ≈256×470 px usable) | Ad authored **on twos** (≈12 unique fps); capture at 30 | Capture ghosting, moiré and keystone belong to the phone capture, not the ad | −16.3 LUFS (room mic; not the real mix) | No |
| [V:15VhHR] | Wix AI site builder, 53.9 s | 1138×640, H.264 at **≈652 kb/s** | **25 fps master pulled to 30** (every 6th frame duplicated) | Banding on gradients and blocking (distribution, per its teardown); judder on whips and the deck | −15.9 LUFS | No (the "generated sites" are art-directed content, not AI video) |
| [V:19NRDv] | Bumper PRO payments launch, 67.2 s | 1138×640 | Native 30 fps | No designed grain (high-pass σ 0.02-0.15, temporal noise ≤0.13 levels); navy gradients **band**; motion blur on every move | −14.1 LUFS | No |
| [V:1CSXtQ] | OpenAI × HubSpot connector, 30.0 s | 1280×720, video at **≈175.5 kb/s**, AAC stereo 44.1 kHz | **25 fps master pulled to 30** | **Macro-blocking** on small UI text and soft particles; greeked low-res UI texture in the 3D hero | −14.2 LUFS | No |
| [V:1Hcg3X] | "How do solar panels work?", 35.8 s | 1138×640 | **Animated at 24, delivered at 30** (every 5th frame duplicated) | The only reference with **designed fine grain** on every frame; bloom only on emitters | −16.6 LUFS (VO-led bed, probably) | No |
| [V:1ccYWJ] | Lottieicon icon library, 44.3 s | 1138×640 | Native 30 fps | **Banding and macro-blocking** in dark green gradients; no grain or dither; unblurred camera hops of 22-27% W/f **strobe** | **−16.6 LUFS** (quiet for social); music ends 3.7 s early | No |
| [V:1i2L14] | NOSTRA studio promo, 35.1 s | 1056×720 wrapper; the film is a 1011×567 inset with a fake player bar | Native 30 fps | Wrapper wastes 21% of the height; a 23-26 f pixel-glitch build | **−7.9 LUFS, +1.6 dBTP**, LRA 1.2 LU (over-limited, clipping) | No |

**What the census says**
1. **0/8 files are at 1080p or above as received.** Whether that is the masters or platform re-encodes is unknown [inferred]. The text sources show what the masters of comparable films look like: Superside's Wistia originals are 1920×1080 H.264 at 30 fps CFR (Superspace, PointCard, Imperfect Foods) or 29.97 fps (Thomson Reuters), one is 1920×1080 at 23.976 fps (Snowflake Luminate) and one is 3840×2160 at 29.97 fps (Nissan) [S]. ElevenLabs mastered its launch spots at 3840×2160 through 2024 and mostly 1920×1080 in 2025-26 [E].
2. **3/8 show duplicate-frame judder** from frame-rate conversion (25 → 30 twice, 24 → 30 once). Each teardown flags it as visible on slides, whips or scrolls [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X].
3. **5/8 show compression artefacts**: banding in 4 (kivi, Wix, Bumper, Lottieicon), macro-blocking in 3 (Wix, HubSpot, Lottieicon).
4. **3/8 are off the loudness target** for their use: two too hot (kivi, NOSTRA, which also clips) and one too quiet (Lottieicon). Chowdeck is a room recording and says nothing.
5. **1/8 contains apparently generated imagery** (kivi's plates), and it is the one place in the eight films where the teardown complains about identity drift and mushy detail.
6. **8/8 never morph geometry through invented in-between shapes and never use plug-in transitions, and none shows uncaused floating UI.** These are the habits that keep them from looking generated, and they are the core of §21.

Why this matters: the references are the user's taste. They are also a census of where premium films lose quality. Most of the losses happen after the design is finished, in frame rate, encode and mix. The design-side "AI look" appears only where pixels were invented (kivi's plates).

### 0.4 The quality ladder: where the premium read is won and lost

Each stage can only lose quality that the earlier stages built. A film is only as premium as its weakest stage.

| Stage | Typical loss | How often in the references | Covered in |
|---|---|---|---|
| 1. Concept and copy | Unlabelled metaphors, invented claims, inconsistent copy | 4/8 (NOSTRA, Wix, Lottieicon copy; kivi bare-URL ending) | Part 01; §23 |
| 2. Design and art direction | Mismatched plate styles, two light directions, bloom that smears type, dated flourishes | 4/8 (kivi plates, Solar shadows, Bumper bloom and stock photo, Chowdeck long shadow) | Part 02; §21 |
| 3. Generation (AI plates/clips) | Identity drift, mushy faces, boiling texture, gibberish text | 1/8 (kivi) | §21 |
| 4. Animation | Uncaused motion, overshoot on type, linear moves, unblurred fast pans, over-long glitch builds | 3/8 (Lottieicon strobe, NOSTRA's 23-26 f glitch build, Chowdeck's static open) | Parts 03-07; §21 |
| 5. Edit | Text-card fatigue, short payoff holds, cut a few frames off the kick, 1-frame artefacts | 6/8 | Part 08; §23 |
| 6. Mix | Hot or quiet masters, music ending early, silent typing | 3/8 (kivi, NOSTRA, Lottieicon) | Part 09; §24.5 |
| 7. Encode and delivery | Duplicate-frame judder, sub-HD, low bit rate, banding, wrapper | 8/8 show at least one | §24 |

### 0.5 Defaults card: the 25 numbers to encode first

| # | Parameter | Default | Evidence |
|---|---|---|---|
| 1 | Readable glyphs, UI or logos produced by a video model | **0**, in every frame | [P] [N]; CD-T9, TY-U21, UI-R5 |
| 2 | Generated clip length vs edit length | Generate **1.5-2 s longer**, use the middle | ER-24 [inferred from [P]] |
| 3 | Camera moves per generated clip | **1**, named, with start/end framing and peak speed | [P]; Part 04 §6.12 |
| 4 | Continuity block in every generation prompt | Palette hex, key-light direction, lens feel, grade, grain, materials, **repeated verbatim** | AD-U6, DP-20; flaw in [V:1-6l8S] |
| 5 | Brand-colour drift between shots | **ΔE00 ≤ 2** on the same token (allow ±3-5 levels of encode noise at sub-HD) | [inferred]; Part 02 §0 caveat |
| 6 | Locked anchors across cuts (logo, prompt bar, hero asset) | **±1 px @1080p** | [V:15VhHR t=8.63-12.47s] bar identical x/y/size across 6 shots; [V:1CSXtQ t=10.63s/27.67s] reprised lockup: OpenAI half x 328 vs 327 px, HubSpot half 696 vs 700 px @1280 w (so ±1-4 px, ≈±6 px @1080p, in the looser reference) |
| 7 | Strings across shots and formats | **100% character match** | [V:15VhHR t=6.57s] flaw |
| 8 | Overshoot on type, UI chrome and camera (premium styles) | **0%** | 7/8 refs; Part 03 §19.6 |
| 9 | Static-region temporal noise (no grain declared) | **≤1 level/frame** on painted plates, **≤0.2** on flat vector fields | [V:1-6l8S] plates <1 level; [V:19NRDv] ≤0.13 |
| 10 | Particle events per film | **≤1**, made of the product's own colours or shapes, or of the film's subject; a climax burst of **≤12** particles over ≈10 f; a data-flow event may use hundreds if they are the source UI broken apart | 4/8 use particles, each exactly once: [V:19NRDv t=55.27s] ≈12 sparks; [V:1CSXtQ t=19.0s] ≈200-300 UI discs; [V:1Hcg3X t=11.53s] ≈60 electrons; [V:1i2L14 t=27.8s] one particle comet |
| 11 | Glow | Emitters and "active" states only; **≤2-3% of cap height** on type | [V:1Hcg3X]; [V:19NRDv] flaw |
| 12 | True depth (DOF, parallax, 3D camera) in minimal styles | **One hero beat** (≤3 brief 3D moments in a 50-60 s film) | [V:1CSXtQ t=17.8-21.47s]; [V:15VhHR] |
| 13 | Flash moments | **≤1 per film, ≤3 f per colour, ≤3 flashes per second** | [V:1Hcg3X t=12.83s]; [N] WCAG 2.3.1 |
| 14 | Motion blur | **Off** below 5% W/f; **180° shutter** at 5-10% W/f; above 10% W/f only into a cut | Part 05 QC; [V:1ccYWJ] strobes unblurred at 10% and 22-27% W/f; [N] 180° shutter default; the 5% W/f threshold is [inferred] |
| 15 | Delivery frame rate | **Native**: 0 duplicated frames in any move | [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X] flaws |
| 16 | Master resolution | **≥1920×1080** (16:9) or **1080×1920** (9:16); 3840×2160 for flagship launches | [S] Wistia originals; [E] |
| 17 | H.264 delivery bit rate @1080p30 | **12-20 Mb/s** (never below 8) for UI- and gradient-heavy films; CRF **16-18** | [V:1CSXtQ §16] ≥8-12 Mb/s; [N] CRF 18; [inferred] upper band |
| 18 | Low-resolution floor | Never below **≈2 Mb/s for 720p gradients** (prefer ≥5) | [V:15VhHR §16]; [inferred] |
| 19 | Pixel format and colour | **yuv420p, BT.709** primaries/transfer/matrix tagged, limited range; render frames as PNG or JPEG ≥95 | [N]; [kit] |
| 20 | Dither | **1-2% grain or noise on every gradient** before the 8-bit encode | [V:1ccYWJ rule 16]; CL-U16 |
| 21 | Audio master | **−14 LUFS ±1**, **≤ −1 dBTP**, LRA 5-10 LU; AAC-LC 48 kHz stereo 256-320 kb/s; WAV 48 kHz/24-bit + stems | Part 09 SD-M1, SD-M9; [N] |
| 22 | Read floors | Must-read cap **≥3% H** (16:9); **≥52 px** body at 9:16; nothing that carries meaning below **2.5% H** | 7/8 refs flag text too small for a phone; [N] |
| 23 | Holds | Payoffs and statuses **≥1.0 s** still; final lockup still **≥1.5 s (2.2 s premium)** with the music resolving on it | [V:1Hcg3X] [V:126cpH] flaws; [V:1CSXtQ] |
| 24 | Frame 0 | Hook visible on **f0**; first change by **f3**, never later than 0.5 s | [N]; [V:126cpH] flaw (0.73 s) |
| 25 | QC stepping | Every cut **±10 f at 1-frame steps**; every must-read string at a **1:1 crop of the final encode**; loudness measured **on the final MP4** | §22; Part 05 QC-12 |

---

# Master §21. Anti-AI-Look Guidelines

## 21.0 What "the AI look" is, and why it reads cheap

**Definition.** The AI look is visible evidence that pixels were *invented* rather than *designed*. It has four signatures, and every problem in this section is one of them:
1. **No permanence.** Things stop being themselves between frames or between shots: a shape melts, a word changes, a colour drifts, a face goes soft.
2. **No cause.** Things move, glow or float with no actor, no reason and no destination.
3. **No physics.** Motion has no weight (constant speed, floaty drift, uniform easing), light has no single source, depth has no planes.
4. **No restraint.** Everything is decorated: particles, flares, chrome, neon, a transition on every cut, motion on every layer.

**Why it reads cheap, and why it hurts a SaaS film in particular** [inferred, consistent with every reference]:
- The eye checks *consistency across time* faster than detail within one frame. A small inconsistency between frames (a letter that changes, an edge that wobbles) is noticed even when the single frame looks fine.
- A SaaS film sells precision, reliability and control. A frame that is visibly imprecise contradicts the product promise on screen. The references sell the opposite: identical strings across cuts, a bar locked to the pixel across six shots [V:15VhHR t=8.63-12.47s], a co-brand lockup reprised at the same position to within 1-4 px @1280 w (OpenAI half 328 vs 327 px, HubSpot half 696 vs 700 px) [V:1CSXtQ Verification #6].
- Decoration without cause reads as a stock template. The motion.so guidance for Apple-style launches says it outright: "no stock footage, no fake UI, no generic neon technology visuals" [W:motion-so].

**Two pipelines, two failure families.** The same symptom can come from different causes, so each card in §21.3 gives both.

| Pipeline | Root cause of the AI look | Typical tells | Where the fix lives |
|---|---|---|---|
| **Generative video** (Veo 3.1 / Flow, Gemini Omni Flash, Runway, Pika, Sora-class models) | The model synthesises every pixel of every frame and has no persistent object, string, light or camera model across frames or clips | Morphing, gibberish text and subtitles, identity drift, boiling texture, mushy faces and hands, random drift, lighting changes at extension seams | Division of labour (§21.1), prompt discipline (AA-G), selection by QC rather than by first take |
| **Template / code engines** (Remotion, After Effects templates, Lottie, LLM-written motion specs) | The pixels are exact, but the *decisions* are defaults: linear interpolation, default springs, one reveal for everything, everything animating at once, random seeds, placeholder data | Weightless or bouncy motion, over-animation, template sameness, duplicated rows, flicker from non-deterministic code, font fallback | Token-only motion, validators, a string table and a data sheet (AA-T) |
| **Human editor** (for completeness) | Fatigue and late changes | Copy that changes between a wide and its cut-in, 1-frame artefacts at cuts, music ending early | QC gates (§22) |

The references contain almost no generated imagery (1/8), so most of the generative-video causes below are [inferred] from [P] and general knowledge. The *preventions* are anchored in what the eight films do instead.

## 21.1 The master rule: generate only what is allowed to vary; compose everything that must not

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

## 21.2 How to read the problem cards

Each card in §21.3 has the same fields:
- **Looks like**: the symptom, in terms you can check frame by frame.
- **In the references**: what the eight films show (usually the *opposite* habit, measured).
- **Cause (generative)** and **Cause (template/code)**.
- **Prevent (generative)** and **Prevent (template/code)**.
- **Detect**: the QC test and its pass threshold.
- **Why it matters**.

The 15 problems named in the research brief are AA-01 to AA-12, AA-14 to AA-16 and AA-18. Cards AA-13, AA-17 and AA-19 to AA-25 are additional failure modes found in the teardowns or in the pipeline research.

## 21.3 Problem cards

### A. Shape and geometry

#### AA-01 · Morphing objects
- **Looks like.** An object melts through shapes nobody designed on its way from A to B: a button liquefies into a card, a logo smears into a product, a hand grows a sixth finger mid-gesture.
- **In the references.** None of the eight morphs geometry through invented intermediates. Every shape change is either:
  - a clean interpolation between two defined vector shapes: pill → horizontal slabs → line → card in ≈13 f [V:1-6l8S t=9.50-9.93s]; circle → search pill in ≈7 f [V:1ccYWJ t=39.47-39.70s]; order card → notification, bottom-anchored, ≈7 f [V:126cpH t=11.03-11.27s]; or
  - an instant swap between two shape-matched stable states on one frame, followed by a physical reaction: flat banana → real banana on one 12 fps pose, then a 14 f fall [V:126cpH t=6.77-7.73s]. That teardown calls it "a cheap, robust morph that never warps geometry", and a model for AI pipelines.
- **Cause (generative).** The model interpolates between two concepts in its latent space. The in-between frames are plausible *textures*, not plausible *objects*. It is worst when a prompt says "transforms into", "morphs" or asks for a transition between two scenes [inferred].
- **Cause (template/code).** Path morphs between shapes with different point counts or vertex order (the shape twists), or a bitmap stretched and skewed instead of swapped [inferred].
- **Prevent (generative).** Never prompt a morph. Generate both end states separately and join them with a cut, a covering element or a shape-matched swap (MP-SaaS7, TR-A12). If a model must bridge two frames, use first/last-frame conditioning only between two near-identical stills, and reject any take whose in-betweens show a third shape (TR-X10) [P supports `last_frame`; the rest is inferred].
- **Prevent (template/code).** Morph only between two declared shapes with an explicit start, end and duration (6-13 f, E-INOUT or E-OUT; Part 03 ML-26) and matched point counts. Otherwise swap on one frame and add a 6-14 f fall or rotation [V:126cpH rule 4].
- **Detect.** Step the change at 1 f. Every frame must be a shape a designer could have drawn on purpose. Any frame showing an unplanned third shape fails.
- **Why it matters.** The visual system tracks objects across frames. An object that stops being itself for even 2-3 frames breaks object permanence, the strongest "this was invented" signal [inferred].

#### AA-02 · Warped UI
- **Looks like.** Edges bow, corners wobble, radii differ between cards, text baselines bend, a button changes width while nothing touches it, a 1 px hairline shimmers.
- **In the references.** UI is always crisp vector or real product UI. Perspective is applied to whole planes, never per element: Bumper's tilted tables and dashboard [V:19NRDv t=16.77-18.55s], Wix's site deck [V:15VhHR t=48.27s], HubSpot's 3D studio [V:1CSXtQ t=18.0-19.0s].
- **Cause (generative).** A video model draws UI as texture. It has no concept of a straight line, a grid or a radius token, and a camera move makes it re-draw the whole surface each frame [inferred].
- **Cause (template/code).** Per-element perspective instead of one plane transform; non-uniform scaling; sub-pixel positions on static UI during a slow push, which makes thin lines crawl; mixed radius values [inferred].
- **Prevent (generative).** Do not generate UI (UI-R5). If a screen appears in a generated plate, make it blank, softly lit, off-axis or out of focus, then composite the real UI onto it with one planar transform [inferred].
- **Prevent (template/code).** One radius token and one shadow token per UI kit (Part 06 UI-D); one transform per plane; tilt ≤15° while text is read (UI-D6); hairlines ≥2 px @1080p when they will be scaled slowly [inferred].
- **Detect.** Hold a straight-edge guide on the UI in a held frame and step through the shot: edges stay within 1 px of straight; corner radius constant within 1 px; card widths constant unless an actor changes them.
- **Why it matters.** UI is the product. A warped interface says "this is not our real software", which is the one thing a demo must not say.

#### AA-03 · Inconsistent geometry and counts
- **Looks like.** Proportions or counts change: a chart has five bars, then six; a nav bar loses a tab across a cut; a bottle changes shape between shots; a list repeats an item; a hand has the wrong number of fingers.
- **In the references.**
  - Locked: the ice-bottle asset stays in the same screen region across 4 page swaps, with the editor selection box visible [V:15VhHR t=30.83-32.83s]; the prompt bar keeps identical x/y/size across 6 shots [V:15VhHR t=8.63-12.47s]; the co-brand lockup is reprised within 1-4 px @1280 w (OpenAI half 327 vs 328 px, HubSpot half 700 vs 696 px) [V:1CSXtQ Verification #6].
  - Looser by design: Wix's pump bottle is re-laid-out across a theme swap (moved from ≈72% to ≈54% W and scaled ≈1.5-2×). The teardown notes it reads weaker than a pixel-locked anchor [V:15VhHR t=19.20s].
  - Failure: the "Random Misc" category card appears twice in a row [V:1ccYWJ t=17.9-18.1s].
- **Cause (generative).** No object persistence across frames or clips; each clip re-imagines the object from the prompt [inferred].
- **Cause (template/code).** Data arrays edited per scene with no single source; layouts that repeat items to fill space; copy-paste [inferred].
- **Prevent (generative).** Keep recurring objects out of generated layers. If a non-product object must recur, reuse up to 3 reference images, the same seed and the same description verbatim [P: `reference_images` ≤3, `seed`], and keep it defocused or small.
- **Prevent (template/code).** One data file per film drives every UI and chart; the continuity sheet lists counts ("5 tabs, 4 cards, 12 rows, 6 chips"); the validator rejects duplicate labels.
- **Detect.** Count check per shot against the continuity sheet. Onion-skin the last frame of shot *n* over the first frame of shot *n+1* at 50%: anchored items within ±1 px @1080p.
- **Why it matters.** Counting is something viewers do without trying, especially in data and UI. A changed count reads as a mistake in the product, not in the film.

#### AA-04 · Broken perspective
- **Looks like.** Planes with different vanishing points in one shot; text on steep planes; one plane passing through another; floors that slide under objects; foreground parallax moving the wrong way.
- **In the references.**
  - Failure: in HubSpot's 3D hero, the HubSpot window intersects the glass edge of the chat pane. A hard vertical seam slides from x ≈ 230 to ≈ 485 px as the camera settles, so the layering is ambiguous for about 0.6 s [V:1CSXtQ t=18.4-19.0s].
  - Correct: Bumper's tables enter at one consistent tilt, flatten towards camera and are pushed through with consistent DOF [V:19NRDv t=16.77-18.55s].
- **Cause (generative).** The model keeps no single camera or vanishing point; objects drift relative to the ground; generated parallax does not match depth [inferred].
- **Cause (template/code).** Layers given independent perspective; z-order changes mid-move; 2D layers composited over a 3D or generated plate without a matched track [inferred].
- **Prevent (generative).** One named camera move per clip [P]. Do not composite UI onto moving surfaces of generated footage; composite onto a locked plate or a planar-tracked surface [inferred].
- **Prevent (template/code).** One camera per 3D shot; planes never intersect (DP-17, UI-A6); text read at ≤15° tilt (UI-D6); during moves, foreground travels 1.3-2× the focal plane in the same direction (DP-09).
- **Detect.** Part 04 depth QC gate (§20.8). Draw the converging lines of every plane on the first and last frame: one vanishing point per set of parallel edges.
- **Why it matters.** Perspective errors are read as "physically impossible", which pushes the frame from "rendered" to "generated".

### B. Text, identity and product truth

#### AA-05 · Changing or gibberish text
- **Looks like.** Letters mutate between frames; numbers flicker; words differ between a wide shot and its cut-in; pseudo-letters appear on signs, screens or as subtitles; a watermark ghosts in.
- **In the references.**
  - Copy changed between a wide and its cut-in: "I want to *make* a website" vs "want to *create* a website" [V:15VhHR t=6.57s].
  - Inconsistent copy grammar and number formatting: "For Designer" vs "Developers"; "4,863+" vs "50 + Categories" [V:1ccYWJ].
  - Every reference composites its type; none lets a renderer produce text.
- **Cause (generative).** Text is rendered as texture. Dialogue in a prompt triggers gibberish subtitles in Veo [P]. Screens, signage and packaging in a scene invite pseudo-text [inferred].
- **Cause (template/code).** Strings typed per scene instead of referenced from one table; an LLM paraphrasing copy between scenes; auto-fit truncation; font fallback (Remotion silently falls back if the `devanagari` subset is not loaded) [N].
- **Prevent (generative).** No text, speech or dialogue in the prompt. `negative_prompt` as a noun list: "text, subtitles, captions, letters, watermark, logo" [P], extended with "numbers, signage, screen content" [inferred]. Frame screens blank, off-axis or out of focus.
- **Prevent (template/code).** One string table for the film; every visible string references an ID; fonts loaded with explicit weights and subsets before render [N]; text fitted at validation, not at render; LLMs never rewrite strings at render time (UI-K7, TY-A9).
- **Detect.** String diff of every visible string across shots and formats (100% match). 1:1 crop of the smallest read text on the final encode. Scan every generated plate frame for glyph-like shapes (0 allowed).
- **Why it matters.** Text is the one element every viewer reads closely. A changed or fake letter is noticed by almost everyone and is the most widely recognised AI tell [inferred].

#### AA-06 · Identity drift
- **Looks like.** Across shots, the brand colour shifts, the icon style changes, the font weight differs, the cursor changes, a recurring character's face changes, or the background plates switch rendering style.
- **In the references.**
  - Failure: kivi's lifestyle plates come in three illustration styles (gouache desk, watercolour courtyard, flat-illustration office). The teardown's rule: "Lock one rendering style and one light direction for all plates, or use real photography" [V:1-6l8S §16].
  - Consistency elsewhere: one accent, one sans family and one cursor through a whole film (Bumper's orange 3D cursor in three UI scenes [V:19NRDv]; Wix's single native-size cursor [V:15VhHR]; Lottieicon's single neon green #38D037 [V:1ccYWJ]).
  - Part 04 already names this failure for depth cues: a change in lens feel or light direction between shots "reads as a different world" (DP-20).
- **Cause (generative).** Each clip re-samples style; prompt wording drifts between shots; different models or quality tiers (Veo 3.1 Lite / Fast / Quality [P]) render differently; upscaling changes texture [inferred].
- **Cause (template/code).** Style tokens copied and edited locally; two icon libraries; per-scene theme overrides [inferred].
- **Prevent (generative).**
  - A continuity block, repeated verbatim in every prompt: palette hex values, key-light direction, lens feel, grade, grain level, materials (AD-U6, DP-20; Part 04 camera block).
  - The same model, tier, resolution and settings for every plate; up to 3 reference images as style anchors [P].
  - Generate all plates in one session, review them side by side, and grade them together. Reject outliers instead of fixing them in the grade [inferred].
- **Prevent (template/code).** One theme object; one icon set; one shared cursor component; the official logo SVG (TY-W3; [E] forbids typed logo substitutes).
- **Detect.** A contact sheet of the first and last frame of every shot, side by side (drift is visible only in comparison). Sample the same brand-colour patch in each shot: ΔE00 ≤ 2 [inferred]. Allow ±3-5 levels of encode noise on sub-HD files (Part 02 §0).
- **Why it matters.** A brand is a promise of sameness. Drift reads as "assembled from different sources", which is exactly what a generated film is.

#### AA-07 · Inconsistent product design and impossible states
- **Looks like.** The product's UI or hardware changes details between shots; UI shows states the product cannot produce, or in the wrong order; a low-resolution or half-invented interface appears in the hero shot.
- **In the references.**
  - Real flows, in order: order → preparing → ready → rider on the way → delivered [V:126cpH t=9.27-13.60s]; Add sources → dropdown → toggle on → chip label swap [V:1CSXtQ t=8.87-10.33s]; real Wix editor tools [V:15VhHR].
  - Failure: HubSpot's "Target accounts" window is low-resolution and partly greeked exactly where the viewer looks, in the 3D hero beat [V:1CSXtQ t=18.4-19.0s].
- **Cause (generative).** The model redraws the product every frame and cannot know what the real product looks like [inferred].
- **Cause (template/code).** Mock UI invented per scene; states out of order; LLM-invented labels that do not exist in the product [inferred].
- **Prevent (both).** Never generate the product (HS-07). Composite real screenshots at ≥1.5× the output width [S:playbook] or vector rebuilds from the product's design system. Define a state machine before animating (UI-B2). Name UI labels exactly as they appear in the product [S:playbook].
- **Detect.** Product-owner sign-off on a frame list of every UI state. Source resolution ≥ zoom × delivery (UI-Z4): a 2× push on 1080p needs a ≥3840 px wide source.
- **Why it matters.** The hero shot is the most scrutinised frame of the film (HS-07). Any fake detail there costs more credibility than anywhere else.

#### AA-08 · Placeholder, duplicated or invented content
- **Looks like.** Lorem ipsum, repeated rows, identical avatars, round fake numbers, invented customer quotes, invented offers.
- **In the references.**
  - Failure: the duplicated "Random Misc" card [V:1ccYWJ t=17.9-18.1s]; the greeked HubSpot rows [V:1CSXtQ t=18.4-19.0s].
  - Correct: believable data (merchant IDs, July 2025 dates, GBP amounts such as 108.50 and 92.40) "so it never reads as lorem ipsum" [V:19NRDv §9].
  - [S:playbook]: never invent offers, prices or customer quotes; numbers come only from the user.
- **Cause (generative).** The model hallucinates plausible-looking data [inferred].
- **Cause (template/code).** Placeholders left in; arrays repeated to fill a layout; an LLM filling gaps with invented numbers [inferred].
- **Prevent (both).** A data sheet with approved or realistic sample data and unique rows; a claims list supplied by the user; the validator rejects lorem ipsum, duplicate rows and unapproved numbers; never TTS or synthesise a real person's words [S].
- **Detect.** Search the spec and every in-focus frame for "lorem", repeated strings and unapproved numbers. Read every row that is in focus.
- **Why it matters.** Viewers who know the product category spot fake data instantly, and invented claims are a legal risk, not only a style risk.

### C. Light, material and depth

#### AA-09 · Lighting changes
- **Looks like.** The key-light direction or colour temperature jumps between shots, or drifts within an 8 s clip; shadows point different ways in consecutive shots; a UI window and its background photo disagree about the sun.
- **In the references.**
  - Solar mixes two light directions: battery shadows fall right (light from the left), credit-token shadows fall down-left (light from the upper right). Its rule: "Pick one light direction and keep it" [V:1Hcg3X rule 11].
  - Wix's page window over a matching beach photo shows a slight horizon and light mismatch [V:15VhHR t=19.73s, inferred at low resolution].
  - kivi's plates disagree in light as well as in style [V:1-6l8S].
- **Cause (generative).** Each clip chooses its own lighting; time-of-day drifts inside a clip; an `Extend` step (+7 s [P]) can re-light the continuation [inferred].
- **Cause (template/code).** Shadow tokens with different angles per component; glows in different colours [inferred].
- **Prevent (both).** Write one key-light direction and colour into every prompt and every shadow token ("soft key from upper right", DP-10, CL-U19). Composite UI shadows from the plate's light direction. Grade all plates together.
- **Detect.** Draw the shadow vector on the first frame of each shot: all within ±15° of the declared key [inferred threshold]. Within a generated clip, a mean-luma shift of more than ≈5 levels with no motivated cause is a fail [inferred].
- **Why it matters.** One light source is how the eye decides that everything in a frame shares one world. Two sources read as a collage.

#### AA-10 · Wrong reflections and speculars
- **Looks like.** Reflections that show things not in the scene; glass refracting nothing; a specular highlight on the unlit side; mirrored text inside a reflection; every glossy element sweeping its sheen in a different direction.
- **In the references.** Reflective materials are rare and deliberate: the glossy 3D heart and refractive ice object (Wix), the sheen pass on the B logo and the glossy cursor (Bumper), the inflated glossy phone and two frosted-glass tiles (NOSTRA). Each appears once or in one sequence [V:15VhHR] [V:19NRDv] [V:1i2L14]. Glass rims sit on the key side only (UI-D9).
- **Cause (generative).** Reflections are hallucinated from the prompt, not computed from an environment [inferred].
- **Cause (template/code).** Sheen sweeps animated in different directions; fake reflection layers flipped without regard to text [inferred].
- **Prevent (both).** Reflections only where a declared material needs them (glass, gloss); every sheen sweep travels in the key-light direction; never mirror type; keep reflective surfaces out of generated plates or defocused [inferred].
- **Detect.** List every reflective element and its sweep direction; all agree. Freeze on each reflection: it contains nothing absent from the scene.
- **Why it matters.** Reflections are a check the eye runs automatically on "is this a real object?". A wrong one flips a premium render into a fake one.

#### AA-11 · Fake depth
- **Looks like.** Gaussian blur on random flat layers with no plane logic; DOF on every shot; bokeh sizes that do not match distance; parallax in the wrong direction; blurred text that must be read.
- **In the references.**
  - Depth is spent on one idea: HubSpot uses true DOF, parallax and motion only in its 3.7 s data-transfer beat [V:1CSXtQ t=17.8-21.47s].
  - Depth from focus, consistently: sharp glass UI over strongly defocused plates [V:1-6l8S].
  - Depth without blur: Solar builds depth "from shadows and overlap, never from blur or DOF" [V:1Hcg3X §2].
  - True, consistent DOF on 3D UI planes [V:19NRDv].
- **Cause (generative).** "Cinematic" in a prompt pulls in shallow DOF everywhere, often with inconsistent focus breathing [inferred].
- **Cause (template/code).** A blur filter used as a "premium" effect on arbitrary layers [inferred].
- **Prevent (both).** Declare the film's depth recipe (DP-01) and each shot's focal plane. Blur only layers that are not read (DP-A4). Keep blur size consistent with plane distance. Save true DOF and parallax for the hero beat in minimal styles (DP-03).
- **Detect.** Part 04 §20.8: name the three planes; is the read on the focal plane and sharp; does every blurred layer sit consistently in front or behind?
- **Why it matters.** Depth without plane logic is decoration. The eye tries to build a space from it, fails, and reads the frame as artificial.

#### AA-12 · Excess glow, particles, flares and chrome ("generic neon tech")
- **Looks like.** Neon edges on inert UI, sparkles with no source, lens flares, holographic HUDs, chrome type, bloom that smears letters, a particle field behind every scene.
- **In the references.**
  - Restraint is the norm: "no particles, bounces or 3D gimmicks" [V:1-6l8S §13]; "no particles, lens flares or chrome" [V:15VhHR §13].
  - Particles appear in 4/8, exactly once each, and always *are* something: ≈200-300 discs in HubSpot's own UI colours [V:1CSXtQ t=19.00-19.95s]; one burst of ≈12 sparks for the climax [V:19NRDv t=55.27-55.60s]; ≈60 glowing dots that are the explainer's electrons [V:1Hcg3X t=11.53-12.83s]; one particle comet that draws the loop a glass tile condenses on [V:1i2L14 t=27.8-28.6s].
  - Glow only on emitters (lamp, screen, bolt, neon labels), radius ≈1-2% of the frame [V:1Hcg3X rule 10].
  - Failure: bloom on oversize white words "muddies the letter edges for the first 3-4 f"; the rule is "cap the glow radius at about 2-3% of cap height" [V:19NRDv §16].
  - [W:motion-so]: "no generic neon technology visuals".
- **Cause (generative).** Words like "futuristic", "AI", "tech", "cinematic" pull stock sci-fi aesthetics: holograms, neon, particles, flares [inferred].
- **Cause (template/code).** Effect presets applied globally; glow added to "make it pop" [inferred].
- **Prevent (both).** Ban those words in prompts and specs; specify materials instead (§22.1, G-21). Glow = active or emitting only (UI-D5). Particles only if made of the product's colours and shapes, at most once per film. Flares: none.
- **Detect.** Count particle events (≤1 per film). Count glows on non-emitters (0). 1:1 crop of the brightest word: letter edges sharp after the first 2 f.
- **Why it matters.** These effects are the visual vocabulary of generic AI and stock templates. A premium SaaS film earns its look from layout, type and timing, which effects can only blur.

#### AA-13 · Texture boil and flicker
- **Looks like.** Areas that should be still shimmer: foliage, skin, fabric, painted backgrounds or flat fields re-draw slightly every frame; grain crawls in patches; thin lines twinkle; a whole frame flickers once.
- **In the references.**
  - Clean stillness is measurable. kivi's flat areas have a high-pass σ of 0.0-0.1 and its painted plates change by less than 1 luma level frame to frame [V:1-6l8S §4]. Bumper's flat patches: σ 0.02-0.15, temporal noise 0.0-0.13 levels [V:19NRDv §4].
  - Designed exceptions: Chowdeck's background blobs "boil" on twos as a hand-made style [V:126cpH t=0.73-1.57s]; Solar adds fine monochrome grain on purpose and warns against "grain heavy enough to crawl" [V:1Hcg3X §16].
- **Cause (generative).** A diffusion model re-samples fine texture every frame, so high-frequency detail boils even on a locked camera [inferred].
- **Cause (template/code).** `Math.random()` per frame (different values in each render tab), CSS animations or `@keyframes`, unseeded noise, transparent WebM flicker at chunk boundaries [N]; 1 px lines aliasing during slow scale [inferred].
- **Prevent (generative).** Keep generated plates simple, defocused or static (kivi's heavy blur hides texture [V:1-6l8S]). If a plate boils, use one clean frame as a still and add the motion in compositing (a 1.05-1.15× push, Part 03 #20) [inferred].
- **Prevent (template/code).** Drive everything from the frame number (`useCurrentFrame()`), `random(seed)` for any variation [N]. Grain is a declared, seeded layer: 1-2% as dither on every gradient (CL-U16), 3-5% only as an Editorial style [V:1Hcg3X] [inferred %].
- **Detect.** Frame-difference on a region declared static: ≤1 level/frame on painted or photographic plates, ≤0.2 on flat vector fields, unless grain is declared in the style sheet.
- **Why it matters.** Stillness is a sign of control. Boiling texture is the most common giveaway of generated footage that otherwise looks plausible [inferred].

### D. Motion and camera

#### AA-14 · Random camera motion
- **Looks like.** The view drifts with no target, wobbles on several axes, rolls, breathes like handheld, or pushes and pulls without a reason.
- **In the references.**
  - Solar: "no random floating camera, no wobble-cam, no rotation roll. Every move has a direction that the next shot continues" [V:1Hcg3X §7].
  - NOSTRA: "no random handheld wobble, no continuous meaningless drift on 3D, and every fast move has a cue" [V:1i2L14 §7].
  - Even the "never static" films drift on one axis, toward something: kivi's line drift of ≈1.4 px/f to the left [V:1-6l8S t=0.10s]; Bumper's 1-3%/s drift between beats [V:19NRDv §7]; HubSpot's caret-following trucks [V:1CSXtQ t=4.5-7.2s].
- **Cause (generative).** Models add subtle drift or handheld motion, especially when a prompt asks for "cinematic". Veo defaults to static or subtle movement if no move is named [P].
- **Cause (template/code).** Wiggle or random-walk expressions on the camera; every layer drifting on a different vector [inferred].
- **Prevent (generative).** One named move per clip, with start and end framing, duration, ease, peak speed, roll 0° and "no handheld shake" (Part 04 §6.12 camera block) [P]. For UI shots, do the camera in compositing.
- **Prevent (template/code).** Camera moves from the CM- library only; ambient drift on one axis, continuing the previous shot's direction; roll 0.
- **Detect.** Track one background point through the shot: its path is one smooth curve in one direction; roll 0°; no reversal without a cut.
- **Why it matters.** A camera that moves without looking at anything tells the viewer nobody is directing.

#### AA-15 · Purposeless floating objects
- **Looks like.** Cards, phones and panels hovering and bobbing in space with no anchor, no contact cue and no reason; several tilted screens drifting and glowing with no actor (Part 06 UI-A1).
- **In the references.**
  - kivi: "UI moves only when an action causes it (voice, click, AI write)… No random floating screens" [V:1-6l8S §9].
  - Lottieicon: "Nothing floats without purpose" [V:1ccYWJ §13].
  - Wix keeps the editor selection box visible on the anchored asset "to show user agency" [V:15VhHR t=30.83s].
  - None of the eight shows the floating-screens montage (Part 06 UI-A1).
  - Allowed floats are anchored and small: NOSTRA's two glass tiles bob at ≈0.5 px/f in its breather [V:1i2L14 t=29.5-30.6s]; Chowdeck's tiny rider wobbles in the lockup so the end frame is not dead [V:126cpH t=16.53-17.97s].
- **Cause (generative).** Prompts such as "floating UI cards in 3D space" produce exactly this [inferred].
- **Cause (template/code).** An idle bob added to every element as "life" [inferred].
- **Prevent (both).** Every element has an anchor (a container, a surface, a contact shadow or a named relation) and every move has a cause (UI-B1, UI-B12). Ambient life comes from one layer (a camera push of 1.05-1.15× or a moving background), not from every object bobbing (Part 03 #20).
- **Detect.** For each moving element, answer "who or what moved it?". ≤3 floating elements per frame, each carrying one fact (UI-B12).
- **Why it matters.** "A caused movement is information. An uncaused one is noise the viewer must filter. It is also the single best defence against the AI-generated look" (Part 03 §5.1).

#### AA-16 · Over-animation
- **Looks like.** Everything moves at once: the camera, every card, the background, particles, the text; no hierarchy, no stillness to read in.
- **In the references.**
  - One primary change at a time: "one animated element at a time inside a still component" [V:1ccYWJ §9]; real UI timings of 100-200 ms "inside a slow camera" [V:1CSXtQ §9].
  - Event density is high but serial: about one visual event every 0.7 s in Chowdeck [V:126cpH] and every 0.85 s in NOSTRA [V:1i2L14], in burst-and-breathe cycles of 2-4 s.
  - A deliberate breather: NOSTRA drops motion energy to ≈1/30 of its peaks for 4.7 s (13% of runtime) before the CTA [V:1i2L14 t=25.93-30.63s].
- **Cause (generative).** Models animate the whole frame (wind, particles, camera and subject together) [inferred].
- **Cause (template/code).** Every layer gets an entrance, an idle loop and an exit; an LLM adds effects to make it "dynamic" [inferred].
- **Prevent (both).** A motion budget per shot: 1 primary motion plus ≤2 secondary ones (Part 06 UI-B5). Translation ≤0.2% W/f while text is read (Part 07 RM). A breather of 10-15% of the runtime with energy below 10% of the peaks, or a music breakdown (P08 ER-U11) [V:1i2L14 rule 14].
- **Detect.** Freeze every 0.5 s and name the one thing moving with purpose. Two primaries overlapping is a fail.
- **Why it matters.** Attention is serial. A frame where everything moves forces the viewer to choose, and most viewers choose to stop watching.

#### AA-17 · Weightless or uncanny motion
- **Looks like.** Constant-speed slides that start and stop on screen; every element using the same ease; "floaty" slow motion with no acceleration; bouncy text from a default spring; objects that never settle or never touch anything.
- **In the references.**
  - Entrances decelerate and exits accelerate in all eight (Part 03 §19).
  - 0% overshoot on type and UI chrome in 7/8; the eighth (Chowdeck) overshoots only a tossed card, by a quarter of its swing [V:126cpH t=9.37-10.0s].
  - Falls use gravity-like acceleration (velocity ≈1.2× per frame) [V:1i2L14 t=13.50s].
  - What reads amateur, per the Solar teardown: "linear slides, uniform ease on everything, bounce on text, holds longer than ~0.3 s with nothing moving" [V:1Hcg3X §6].
- **Cause (generative).** Generated motion tends toward smooth, even drift with no acceleration events or settles [inferred].
- **Cause (template/code).** `interpolate` is linear and unclamped by default; Remotion's default `spring()` overshoots 16.3%; one ease on every property; LLM-invented timings that are "too fast and inconsistent" [N].
- **Prevent (generative).** Name the speed profile in plain words: "accelerates out of frame over the last 0.3 s", "settles and stops" (Part 03 §L.3 plain-language column). Do fast or precise moves in compositing.
- **Prevent (template/code).** Ease tokens only (Part 03 §19.3), validated; entrance ≈2× the exit duration [V:1-6l8S rule 4]; gravity curve for falls; no default spring on type (damping ≥15 for 2.8% maximum, or none) [N]; clamp every interpolation.
- **Detect.** Plot per-frame displacement of each hero move. Entrances front-loaded (16-64% of travel in frame 1, by token); exits growing ×1.4-2 per frame; nothing starts or stops at constant speed on screen.
- **Why it matters.** Acceleration is how the eye infers mass. Motion without it reads as computer-made in the bad sense: weightless, unauthored.

#### AA-18 · Unnecessary transitions
- **Looks like.** A different effect on every cut; glitches, luma wipes, spins, light leaks and page curls; crossfades as the default; a "metaphor parade"; a model asked to invent the transition between two scenes.
- **In the references.**
  - "None are generic plug-in transitions (no glitches, no luma wipes, no spins)" [V:1ccYWJ §10].
  - "No generic cross-dissolves (except #1) and no plug-in-style light-leak transitions" [V:1i2L14 §10].
  - "There are no crossfades between scenes. The only dissolve is a blur-dissolve" [V:1CSXtQ §10].
  - "Only one 'effect' transition (the flash). Everything else is choreography" [V:1Hcg3X §10].
  - Failure: NOSTRA's features section runs arrows → pinwheel → iris → form → phone → strands → glass with no labels; the teardown calls it guesswork [V:1i2L14 §13].
- **Cause (generative).** Asking a model to go from scene A to scene B produces morph soup (TR-X10) [inferred].
- **Cause (template/code).** Transition presets assigned per cut, often randomly "for variety" [inferred].
- **Prevent (both).** Every transition has a TR ID, a role (signature / hero / plain) and a cause (Part 05 TR-U3, TR-U7). Budget per film: signature 3-12 uses, hero one-offs ≤4, decorative wipes ≤2, flash ≤1 (Part 05 §7.5). The hard cut is the default.
- **Detect.** Part 05 §7.15 transition QC gate.
- **Why it matters.** A transition is a sentence connector. Too many of them, or ones with no logic, make the film sound like it is talking for the sake of it.

#### AA-19 · Cadence errors: judder, strobing and mixed frame rates
- **Looks like.** A tiny hitch every 5th or 6th frame on slides and scrolls; fast pans that strobe into separate images; UI that steps like lag; generated footage that stutters next to smooth graphics.
- **In the references.**
  - Duplicate-frame judder: Wix and HubSpot (25 → 30 fps, every 6th frame repeated) and Solar (24 → 30, every 5th) [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X].
  - Strobing: Lottieicon's grid tour hits 22-27% W/f with no motion blur, so "the grid strobes visibly" [V:1ccYWJ §13].
  - On twos by design: Chowdeck animates illustration at ≈12 unique fps, keeps live action on ones, and its teardown warns that stepped UI motion reads as lag [V:126cpH rule 13, itself marked inferred there].
- **Cause (generative).** Veo 3.1 delivers 24 fps clips [P]. Dropped into a 30 fps timeline without care, they get pulled down by duplication. Poor optical-flow retiming warps edges [inferred].
- **Cause (template/code).** A composition fps that differs from the delivery fps; assets at 25 or 29.97 mixed into 30; `--every-nth-frame` or posterise-time used by accident [N] [inferred].
- **Prevent (both).** Render at the delivery frame rate (EX-U3). If most footage is generated at 24 fps, deliver at 24 fps; otherwise keep AI-plate camera moves at ≤0.2% W/f, where pulldown judder is assumed to be invisible [inferred threshold; no reference measures it], and do faster moves in compositing at 30 (Part 04 §6.12; Part 08 ER-24). Motion blur thresholds from the defaults card (#14). On twos only for illustration layers (UI-A13).
- **Detect.** Frame-difference scan of the whole film: no zero-difference frames inside moves, and no periodic pattern (every 5th or 6th frame) [method of the teardowns; §22.6 commands].
- **Why it matters.** Judder and strobing are felt before they are seen. They make smooth design look cheap, and they hit hardest on exactly the moves meant to impress.

### E. Continuity, sound, people and sameness

#### AA-20 · Clip-edge drift, extension seams and visible loops
- **Looks like.** The first or last half-second of a generated clip settles, warps or drifts; a 7 s extension changes the light or the subject's details at the join; a looping idle animation is visibly identical every second, or every element bobs in sync.
- **In the references.**
  - None of the eight contains generated clips with seams to measure. Part 08 ER-24 already plans around clip limits: Veo 3.1 clips are 4, 6 or 8 s, Omni Flash up to 10 s, and Extend adds 7 s per step [P].
  - A designed loop: Solar's phone wobble repeats identically exactly 1.00 s later [V:1Hcg3X t=14.50-16.13s]. It works because it repeats only twice and on one object.
- **Cause (generative).** The model eases into and out of its own motion at clip boundaries, and an extension re-interprets the last frame [inferred].
- **Cause (template/code).** Idle loops with identical periods and phases on many elements [inferred].
- **Prevent (generative).** Generate each shot 1.5-2 s longer than its edit length and cut from the middle (ER-24). Hide extension seams behind a cut or inside fast motion; never cross-dissolve two generations of the same move (ER-24) [inferred].
- **Prevent (template/code).** Desynchronise idle loops (different phases, periods varied by 10-20%) [inferred]; at most one visible loop per shot; show a loop at most twice.
- **Detect.** Step through the first and last 15 f of every generated shot and across every extension seam. For loops, compare the frame at t and t + period: identical frames on more than one element at once is a fail.
- **Why it matters.** Seams and synchronised loops reveal the machinery. The viewer stops watching the product and starts noticing the process.

#### AA-21 · Continuity breaks across cuts
- **Looks like.** A UI state resets across a cut-in; an anchored element jumps; copy changes; a signature effect appears in some scenes and not in matching ones.
- **In the references.**
  - Pixel-locked anchors: Wix's prompt bar across 6 shots and its ice bottle across 4 swaps [V:15VhHR]; HubSpot's logo reprised at the same position [V:1CSXtQ t=27.37s]; NOSTRA carries one circle primitive across 5 setups in 4.1 s, and its rule 7 prescribes keeping such a primitive within ±5% of its screen position across the cut (a prescription, not a measured tolerance) [V:1i2L14 t=0.0-4.1s, rule 7].
  - Failures: "make" vs "create" across a cut-in [V:15VhHR t=6.57s]; kivi's black-and-white → colour bloom used on the desk and coder scenes but not on the courtyard or office: "Use it every time or define the rule" [V:1-6l8S §16].
- **Cause (generative).** Every clip is generated independently of the last [inferred].
- **Cause (template/code).** Values set per scene instead of in a shared continuity sheet [inferred].
- **Prevent (both).** A continuity sheet (the Phase-17 continuity system): strings, UI states, anchor coordinates, colour tokens, light, lens, grade and cursor, referenced by every shot. When the ASL drops below 0.8 s, lock one UI element or product to identical screen coordinates [V:15VhHR rule 6]. Apply a signature device every time its trigger occurs, or write down the rule that says when it does not.
- **Detect.** Onion-skin the last frame of each shot over the first frame of the next at 50%: anchored elements within ±1 px @1080p, strings identical, states continuous.
- **Why it matters.** Continuity is what turns 30 shots into one film. A break says the shots were made separately, which is the generated film's defining property.

#### AA-22 · Audio-picture mismatch
- **Looks like.** Generated ambient audio left under the graphics; a different whoosh on every cut; sound on every word and icon; silent typing; music that ends before the logo.
- **In the references.**
  - Lottieicon's music is gone 3.7 s before the picture ends, under the URL type-on and spinner, and its 23-55 chars/s typing has no key sound [V:1ccYWJ §12].
  - Wix relies on the music arrangement plus a few click accents and adds no whooshes to its whips [V:15VhHR §12].
  - Veo returns audio with every API generation [P]; Part 09 SD-A14 says to mute it.
- **Cause (generative).** Per-clip audio cannot know where the edit puts the cut [inferred].
- **Cause (template/code).** SFX auto-attached to every event; random sample variants [inferred].
- **Prevent (both).** Mute generated audio. Build all sound from a cue sheet derived from the animation's event list (SD-AI1). One sample per SFX family, reused (SD-AI3). Sound at most 1 in 2 visual events (SD-D2). Music runs to the last frame and resolves on the lockup (SD-AR7).
- **Detect.** Part 09 §16.20 sound QC gate.
- **Why it matters.** Sound that does not belong to the picture is noticed even by viewers who never notice good sound.

#### AA-23 · Human figures and likeness
- **Looks like.** Mushy faces in a crowd, hands with wrong fingers, plastic skin, a "customer" who never existed saying words nobody said, a voice clone of a real person.
- **In the references.**
  - kivi's illustrated office crowd has "mushy" faces (64-69 s); the heavy blur "hides some of this but not all" [V:1-6l8S §13].
  - Chowdeck uses real live-action hands and a real phone for its only human shot [V:126cpH t=1.60-2.53s].
  - Customer voices must be real: "must not be faked with synthetic VO or AI likenesses" [S:Thomson Reuters]; never TTS a customer's words [S:playbook].
  - Impersonation risk: the Airbnb 2.0 example is probably an unofficial fan video, and its breakdown warns not to replicate Airbnb's interface or logo in published work [S:Airbnb]. Many inspiration-site pieces are spec ads for famous brands [W:raivcoo].
- **Cause (generative).** Faces and hands are high-detail, high-scrutiny features that models render least consistently, especially small and in crowds [inferred].
- **Prevent (generative).** No generated faces in focus. Show people as silhouettes, back views, hands-only from real footage, or out of focus. Never generate a real person's likeness or voice without written consent; never present generated people as customers [S] [inferred].
- **Prevent (template/code).** No stock avatars standing in for real customers; quote cards only for approved, real quotes [S:playbook].
- **Detect.** Freeze on every human at 1:1. A rights sheet lists every person, voice and brand mark on screen with its release or licence.
- **Why it matters.** Faces are where viewers are most sensitive to fakery, and a fake person in a B2B film is a trust and legal failure, not only an aesthetic one.

#### AA-24 · Template sameness
- **Looks like.** The same reveal on every line; the same stagger; the same centred card repeated; every scene built from the same block; the film feels generated by a template even though nothing is technically wrong.
- **In the references.**
  - Bumper repeats one type grammar (slam → build → pull-back) about 12 times, which "risks monotony in the middle third" [V:19NRDv §13]. Its rule: no more than about 6 uses without variation.
  - Text-card runs flagged in three films: 13 text-only cards, 6 in a row (5.9 s) [V:1ccYWJ]; 4 consecutive centred, same-size cards [V:1CSXtQ t=21.5-27.4s]; 5 text-only cards on an ambient bed [V:1-6l8S t=22-31s].
  - The antidote, measured: semantic letter animation that acts out the word ($-scramble for "thousands", self-assembling letters for "automatically", kicked letters for "kick"), used at least 3 times per film [V:19NRDv rule 5].
- **Cause (generative).** One prompt skeleton reused for every shot without changing the composition or scale [inferred].
- **Cause (template/code).** One scene type repeated; an LLM picking the same default each time [inferred].
- **Prevent (both).** The same reveal ≤6 times per film (MP-A6, TY-A11); ≤3 same-treatment text cards in a row (P08 §15.18 #7); vary scale and hierarchy between consecutive cards; plan ≥3 semantic animations per film.
- **Detect.** Sort the shot list by treatment and look for runs.
- **Why it matters.** Sameness is the template's signature. Variety inside a strict grammar is the designer's.

#### AA-25 · Compression artefacts that read as cheap rendering
- **Looks like.** Banding rings in gradients and glows, blocky dark areas, colour bleeding around small saturated text, smeared particles.
- **In the references.** Banding in 4/8 (kivi aurora, Wix, Bumper navy, Lottieicon dark greens) and macro-blocking in 3/8 (Wix, HubSpot small UI text and particles, Lottieicon) (§0.3).
- **Cause.** Low bit rate; 8-bit gradients with no dither; render frames saved as JPEG at quality 80 (Remotion's default) through `yuv420p`, which bleeds thin saturated text and bands dark gradients [N].
- **Prevent.** §24: dither 1-2% (EX-U6), CRF ≤18 and ≥12 Mb/s at 1080p for gradient and UI films (EX-U4), PNG or JPEG ≥95 frames, BT.709 tagged (EX-U5), accent text at medium weight or heavier (CL-U12).
- **Detect.** 1:1 crop of the darkest gradient and the smallest read text on the *final* encode, and again after a test upload to the target platform.
- **Why it matters.** Viewers cannot tell an encode artefact from a render artefact. Either way, the film looks cheap.

## 21.4 The anti-AI-look checklist (Phase 10, one page)

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

## 21.5 Generative-video operating rules (AA-G)

These apply to Veo 3.1 / Flow and similar models. Facts about Veo and Flow are from [P]; the rest is [inferred] unless tagged.

**AA-G1 · Plan inside the model's clip lengths.** Veo 3.1 clips are 4, 6 or 8 s at 24 fps; Gemini Omni Flash clips run up to 10 s; Extend adds 7 s per step [P]. With the references' ASLs of 1.58-3.00 s, most generated shots will be trims of 4-6 s clips. Generate 1.5-2 s longer than the edit length and use the middle (ER-24).

**AA-G2 · One shot = one camera move, fully specified.** Name one move from the CM- library, with start and end framing, duration, ease, peak speed, roll 0° and focus plane (Part 04 §6.12). Veo defaults to static or subtle motion if no move is named [P]; never leave it to the model.

**AA-G3 · Prompt in the order the model reads best.** Cinematography → Subject → Action → Context → Style [P]. Put the continuity block (palette hex, key-light direction, lens feel, grade, grain, materials) at the end of every prompt, verbatim (AA-06).

**AA-G4 · No words, no speech, no screens.** No dialogue or spoken lines in a prompt (Veo adds gibberish subtitles when a prompt implies dialogue) [P]. `negative_prompt` is a noun list: "text, subtitles, captions, letters, watermark, logo" [P], plus "numbers, signage, screen content, user interface, people's faces, hands, crowd, lens flare, particles" where relevant [inferred]. Describe the empty space you need for type instead ("subject in lower third, large clean empty sky in upper half") [P].

**AA-G5 · Anchor identity with references, seeds and one model.** Use up to 3 reference images (`reference_images`) or Flow's Ingredients-to-Video (up to 3 ingredients), a fixed `seed` per look, and the same model tier and resolution for every plate [P]. Changing tiers mid-film is identity drift by construction (AA-06) [inferred].

**AA-G6 · Use frame conditioning, not invented transitions.** Frames-to-Video and `last_frame` exist [P]. Use them to make a clip *end* on a frame you designed (so a composited element can take over), not to ask the model to invent the bridge between two different scenes (TR-X10, TR-A12).

**AA-G7 · Generate variants and select by QC, not by first take.** A Flow request can return 2 generations [P]. Generate 2-4 takes per shot and run the §21.4 checklist on each; keep the take that passes, not the one that impresses at first glance [inferred].

**AA-G8 · Keep generated plates calm.** Static or one slow move (≤0.2% W/f when the film is delivered at 30 fps from 24 fps sources; Part 04 §6.12). Defocus lifestyle backgrounds behind UI [V:1-6l8S]. Do fast or precise motion in compositing, where it is deterministic.

**AA-G9 · Never generate the product, the UI, the logo, type or a real person.** (AA-U1, HS-07, UI-R5, TY-U21, AA-23.)

**AA-G10 · Mute and discard generated audio.** Veo returns audio with every API generation [P]. Build the soundtrack from the cue sheet (SD-AI1, SD-A14).

**AA-G11 · Frame rate decided before generation.** If generated footage dominates, finish at 24 fps; otherwise conform with care and keep plate motion in the band where pulldown is invisible. Never pad to 30 by duplicating frames (Part 03 §18.12; AA-19).

**AA-G12 · Upscale before compositing, then check again.** Flow offers 1080p/4K upscaling [P]. Upscale the plate before UI and type are composited over it, then re-run the texture-boil test (AA-13), because upscalers add their own detail [inferred].

**AA-G13 · Grade all plates together, in one pass.** Match black level, white point, saturation and grain before compositing, against a single reference frame of the film [inferred].

**AA-G14 · Keep a generation log.** For every kept take: model and tier, prompt, negative prompt, seed, reference images, duration, aspect ratio, resolution and date. This makes a shot reproducible and an identity drift traceable [inferred].

## 21.6 Template and code-engine operating rules (AA-T)

These apply to Remotion and similar engines, After Effects templates, Lottie and LLM-written motion specs. Remotion facts are from [N] and the installed renderer [kit].

**AA-T1 · Determinism first.** Drive every value from the frame number. No CSS `animation`, `transition` or `@keyframes`, no Tailwind `animate-*`, no `setTimeout`; use `random(seed)` instead of `Math.random()`; use `<Img>` rather than CSS `background-image` or `mask-image` [N]. Compute ambient loops (an orb, a waveform) from the frame, not from per-frame smoothing state [E].

**AA-T2 · Fonts and text are validated, not hoped for.** Load fonts with explicit weights and subsets before render (Remotion v5 throws otherwise; without the `devanagari` subset Hindi silently falls back); measure and fit text only after fonts load [N]. Overflow is a validation error, not a render-time surprise.

**AA-T3 · Token-only motion.** Every ease and duration comes from Part 03's token set; the validator rejects anything else. Clamp every `interpolate` (it does not clamp by default); keep keyframe input ranges strictly increasing; `durationInFrames` is an integer; spring damping >0 [N].

**AA-T4 · Ban the engine's default springs on type.** Remotion's default `spring()` (damping 10) overshoots 16.3% and takes 24 f to settle. Use damping 200 for "no bounce", or ≤2.8% for type only where a style allows it [N]. Premium styles: 0% (Part 03 #21).

**AA-T5 · One string table, one data file, one theme.** Every visible string, number, label and colour references an ID (AA-05, AA-06, AA-08). The validator rejects lorem ipsum, duplicate rows and unapproved numbers.

**AA-T6 · A motion budget per scene.** The validator counts simultaneous primary motions (≤1) and secondary motions (≤2) per frame window (AA-16).

**AA-T7 · Variety rules.** The validator warns when the same reveal is used more than 6 times, or the same scene treatment appears more than 3 times in a row (AA-24).

**AA-T8 · Render settings that protect quality.** Frames as PNG, or JPEG at quality ≥95 (Remotion's default is 80); `--color-space=bt709` (in Remotion v4 the default is `default`, not `bt709` [kit]); `yuv420p`; CRF ≤18 for gradients and UI [N]. This repository's motion-kit already sets JPEG 95, BT.709, H.264 and yuv420p, with CRF 20 [kit]; §24 recommends CRF 16-18 for gradient-heavy or UI-heavy films.

**AA-T9 · Timeline arithmetic.** In a `TransitionSeries` the film is the sum of the scenes minus the transition overlaps, so overlapping transitions shorten the film [N]. Check the total against the plan (P08 §15.18 #13).

**AA-T10 · Premount and asset readiness.** Wrap every `<Sequence>` with `premountFor`; clear every `delayRender` handle within 30 s (network fonts and blocked assets are the usual cause) [N].

**AA-T11 · Never ship raw LLM output.** Strip markdown fences from generated code or specs; validate the schema; never render a spec that failed validation [N].

**AA-T12 · Sound from the timeline.** Generate the cue sheet from the scene event list, not by hand and not per clip (SD-AI1).

**AA-T13 · Transparent overlays.** Transparent WebM can flicker at chunk boundaries [N]. For overlays use ProRes 4444 with `yuva444p10le` (the repository's Remotion render notes use exactly this), or render the overlay into the final composition instead [kit] [inferred].

**AA-T14 · Preview is not QC.** A fast preview (for example the kit's QA stills at JPEG quality 10 [kit]) is for layout only. Every QC decision about texture, banding, sharpness and cadence is made on the final-settings render.

## 21.7 Universal, style-specific, experimental, avoid, and especially good for SaaS

**Universal (AA-U)**
- **AA-U1** Generate atmosphere, compose meaning (§21.1). [U (refs + standard)]
- **AA-U2** Permanence: strings, counts, anchors and brand tokens are identical across frames, shots and formats (AA-03, AA-05, AA-06, AA-21). [U; 6/8 clean, and the flaws in 2/8 (Wix, Lottieicon) show the cost]
- **AA-U3** Cause: every move, glow and state change has an actor (AA-15). [U, 8/8]
- **AA-U4** Physics: entrances decelerate, exits accelerate, falls accelerate, nothing starts or stops at constant speed on screen (AA-17). [U, 8/8]
- **AA-U5** One light, one camera, one depth recipe per shot (AA-04, AA-09, AA-11). [U; the flaws in 3/8 (kivi's plates, Solar's shadows, HubSpot's plane intersection) show the cost]
- **AA-U6** Restraint: particles ≤1 event per film, glow on emitters only, plug-in transitions 0 (AA-12, AA-18). [U, 8/8 have no plug-in transitions]
- **AA-U7** Native cadence and blur thresholds (AA-19). [U (standard); 3/8 judder and 1/8 strobe flaws confirm]

**Style-specific (AA-S)**

| Style (Part 10 / Part 02) | What changes | Evidence |
|---|---|---|
| Playful illustrated collage | Animating on twos and "boiling" held shapes are *features*, not flaws, on illustration layers only; UI and camera stay on ones | [V:126cpH] |
| Editorial / risograph explainer | Designed fine grain on every frame (≈3-5%, seeded, not crawling) and bloom on emitters are part of the look | [V:1Hcg3X] |
| Fast startup launch (kinetic type) | Motion blur on every move is part of the look; a glitch decode is allowed once | [V:19NRDv] |
| Dark neon accent | Glow is a material, but only on "active" elements; under-glow ramps are allowed into a cut | [V:1ccYWJ] |
| Minimal premium / calm tech | No grain, no motion blur below 5% W/f, depth from focus only (one true-DOF hero beat allowed), no decorative particles; at most one particle event made of the product's own UI (HubSpot) | [V:1-6l8S] [V:1CSXtQ] |
| Cinematic 3D / hardware | True DOF and reflections are expected, but from one real 3D model and one lighting setup per sequence [inferred; no reference is a full 3D hardware film] | — |

**Experimental (AA-X)**
- **AA-X1 · Generated painterly plates behind glass UI.** kivi's approach (defocused, static, colour-bloomed plates) works at a glance but drifts in style and detail [V:1-6l8S]. Use only with AA-G5 and AA-G13 and a side-by-side contact-sheet review.
- **AA-X2 · First/last-frame conditioned bridges** between two near-identical designed stills [P supports the feature; untested here]. Reject any take whose in-betweens contain a third shape.
- **AA-X3 · Lower frame rate on purpose.** Figma's Config 2025 opening keynote film was dropped to 15 fps for a hand-made feel [S:Figma]; Chowdeck animates on twos [V:126cpH]. Done deliberately and consistently, stepped motion reads as craft, not as error. Never on UI.
- **AA-X4 · Optical-flow conforming of 24 fps generated plates to 30 fps** [inferred]. Acceptable only on slow, low-detail plates; check edges for warping frame by frame.

**Avoid (AA-A)**

| ID | Avoid | Evidence | Instead |
|---|---|---|---|
| AA-A1 | Any readable text, UI or logo produced by a video model | [P] [N] | AA-U1 |
| AA-A2 | Prompting "morph", "transform into" or a model-invented scene transition | Part 05 TR-A12 | Generate end states; cut or swap |
| AA-A3 | "Cinematic", "futuristic", "epic", "hi-tech" and similar words in prompts | [W:motion-so]; §22.1 G-21 | Measurable specs |
| AA-A4 | Mixed plate styles or light directions | [V:1-6l8S] [V:1Hcg3X] | Continuity block; grade together |
| AA-A5 | Generated faces in focus; synthetic customers or voices | [V:1-6l8S]; [S] | Real footage with releases, or none |
| AA-A6 | Leaving generated audio in the mix | [P]; SD-A14 | Cue-sheet sound |
| AA-A7 | Duplicate-frame pulldown of generated 24 fps clips | [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X] | Native 24 delivery or careful conform |
| AA-A8 | Default springs, linear interpolation and one ease everywhere | [N]; [V:1Hcg3X §6] | Token-only motion |
| AA-A9 | Lorem ipsum, duplicates and invented numbers | [V:1ccYWJ]; [S:playbook] | Data sheet |
| AA-A10 | Using a fast preview render for quality decisions | [kit] | Final-settings QC renders |

**Especially good for SaaS (AA-SaaS)**
- **AA-SaaS1 · Composite the real product over calm plates.** It keeps the one thing a SaaS film sells (the product) exact, and uses generation only for mood [V:1-6l8S] [V:1CSXtQ].
- **AA-SaaS2 · Shape-matched state swaps instead of morphs.** Two stable states, one frame, then a physical reaction [V:126cpH rule 4]. It is also the best way to show "before / after" with generated material.
- **AA-SaaS3 · Particles made of the UI.** When data must visibly "flow", break the source UI into discs of its own colours [V:1CSXtQ t=19.0s]. It keeps the abstraction honest.
- **AA-SaaS4 · One locked anchor across rapid cuts** (a prompt bar, a selection box) while use cases change behind it [V:15VhHR t=8.63-12.47s]. It turns a montage of generated variety into one product story.
- **AA-SaaS5 · A colour that means "AI is working"**, used as a short transitional state (8-15 f) that always settles to final colours [V:15VhHR rule 4]. It shows generation honestly without fake progress bars (UI-A18).

## 21.8 Do / Don't

| Do | Don't | Why |
|---|---|---|
| Generate a calm, defocused plate and composite the real UI over it | Ask the model for "a dashboard floating in a futuristic office" | The model will invent the dashboard, and invented UI is the clearest AI tell |
| Swap between two stable shapes on one frame, then let the object fall 6-14 f | Prompt "the card morphs into a phone" | In-between frames of a generated morph are not objects |
| Write "soft key from upper right, 85 mm look, background softly out of focus" in every prompt | Let each plate find its own light | Identity drift across plates [V:1-6l8S] |
| Name one camera move with start, end, duration and peak speed | Write "cinematic camera movement" | Unnamed motion becomes random drift |
| Use particles once, made of the product's own colours | Put a particle field behind every scene | Decoration without cause reads as a stock template |
| Lock the prompt bar to the pixel across the montage | Let each shot re-frame the UI freely | Anchors make fast cuts read as one story |
| Mute generated audio and score from the cue sheet | Keep the model's ambience "because it fits" | It cannot know where the cuts are |
| Generate 2-4 takes and keep the one that passes the checklist | Keep the first impressive take | The first take is chosen by surprise, not by quality |
| Seed every random value and drive it from the frame | Use `Math.random()` in a render | Different render tabs give different values, so frames flicker [N] |
| Keep the same reveal to ≤6 uses and plan ≥3 semantic animations | Run one template for every line | Sameness is the template's signature [V:19NRDv] |

## 21.9 Where the references overrule generic "make it look cinematic" advice

1. **"Add DOF and parallax to everything to make it cinematic."** The references spend depth on one hero beat (HubSpot), build depth from focus layers (kivi) or from shadows and overlap with no blur at all (Solar). **References win.** DOF everywhere is listed as an avoid (DP-A1).
2. **"Add particles, light leaks and lens flares for a premium feel."** 8/8 have no plug-in transitions or flares; particles appear in 4/8, once each, and each time they are the product (HubSpot's UI discs), the subject (Solar's electrons) or a single climax/production beat (Bumper's ≈12 sparks, NOSTRA's comet). **References win.**
3. **"Add film grain to make digital footage look organic."** 6/8 use no grain; Solar adds designed fine grain to every frame and NOSTRA uses a grain gradient on its 3D props only [V:1Hcg3X] [V:1i2L14]. But all gradients need 1-2% dither (CL-U16). **References win** on grain as a look; **standard wins, references confirm** on dither.
4. **"Use spring physics so motion feels natural."** 7/8 use 0% overshoot on type and UI; the default Remotion spring overshoots 16.3% [N]. **References win.**
5. **"Always add motion blur."** kivi and Wix use no motion blur and read clean at their speeds (kivi's only truck is ≈40% W over ≈0.85 s, a mean ≈1.6% W/f [V:1-6l8S t=35.5-36.4s]); Lottieicon also uses none and strobes at 10% and 22-27% W/f [V:1ccYWJ t=27.1-33.2s]; Bumper blurs every move [V:19NRDv]; NOSTRA and Solar blur only the last 1-2 f of whips [V:1i2L14 t=5.87-6.13s] [V:1Hcg3X t=1.50s]. **Neither wins outright**: blur above 5% W/f, none below (defaults #14; the 5% threshold itself is [inferred] from Part 05, bracketed by kivi's clean ≈1.6% W/f and Lottieicon's strobing 10%).
6. **"Keep the camera moving so the shot feels alive."** The references keep holds alive with a single-axis push or drift (1.07-1.29× pushes [V:1-6l8S rule 5]; drifts of ≈0.03-0.5% of the frame per frame: Bumper 1-3%/s, NOSTRA 0.05-0.1%/f, kivi ≈0.12% W/f, Solar ≈0.5% H/f [V:19NRDv] [V:1i2L14] [V:1-6l8S] [V:1Hcg3X]) and never with wandering multi-axis motion. **References win.**
7. **"AI video can replace the product shoot."** No reference generates its product, UI or type; the only generated-looking material is a background, and it is the film's weakest element [V:1-6l8S]. **References win**, and [P] [N] agree.

---

# Master §22. Quality-Control Checklist

## 22.0 How QC is organised

**Four gates, in order.** A film passes each gate before work moves on. A defect found late costs more than the same defect found early: a wrong string caught in the package costs one edit; caught after generation it costs a re-render; caught after upload it costs the launch.

| Gate | When | Checked on | What it protects | Section |
|---|---|---|---|---|
| **G0 · Phase-18 gate, pass A** | Before anything is generated, animated or recorded | The production package: brief answers, storyboard, per-shot specs and prompts, continuity bible, cue sheet, export plan | Truth, completeness, division of labour, budgets | §22.1 |
| **G1 · Per-shot QC** | After each shot is generated or animated, before it enters the edit | Each shot at final render settings | Picture integrity, anti-AI checklist, motion, type, UI | §22.2 |
| **G2 · Locked-cut QC** | After picture lock and the final mix | The full edit with sound | Continuity across cuts, rhythm, sync, story timing, repetition | §22.3 |
| **G3 · Master and delivery QC** | After export, on the files that will be uploaded | Every delivered file and a private test upload | Cadence, resolution, colour tags, bit rate, loudness, captions | §22.4 |
| **Phase-18 gate, pass B** | At sign-off | The gate records of G1-G3 | That every gate actually ran and passed | §22.1 |

**Who signs.** The maker self-checks; a second reviewer who did not make the film runs the gates; the product owner signs the UI frame list and the claims sheet; an audio pass signs the mix [inferred: standard production practice]. An AI system runs every measurable check automatically, then routes the flagged frames to a human [inferred].

**Viewing conditions** (run all five; each catches different defects) [inferred unless tagged]:
1. **Frame stepping** at 1 f around every cut (±10 f) and through every hero move (Part 05 QC 12).
2. **Quarter speed** for motion quality: eases, settles, overshoot, cadence.
3. **Full screen at 1:1 pixels** on a display set to Rec.709 (gamma 2.4 in a dark room, 2.2 in an office) for banding, sharpness and colour.
4. **On a phone, muted first**, at medium brightness: 7/8 references carry some meaning in text too small for a phone (micro-text, a small hook), and a phone is where most viewers will meet the film.
5. **Sound on headphones and on a phone speaker, plus a mono fold-down** (Part 09 SD-M4, SD-M5).

**Record everything.** Each defect is logged with frame number, gate, severity (§22.5) and rule ID. The QC record (§22.10) travels with the file.

## 22.1 The Phase-18 QC gate

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

## 22.2 Gate 1: per-shot QC

Run on every shot at final render settings. Step the shot at 1 f, then watch it at quarter speed, then at full speed.

| ID | Check | Method | Pass threshold | Rules |
|---|---|---|---|---|
| **Picture integrity** |||||
| QC-1.1 | Strings | Diff every visible string against the string table | 100% match | AA-05, UI-K7, TY-A9 |
| QC-1.2 | Counts | Count items against the continuity sheet | Exact | AA-03 |
| QC-1.3 | Anchors | Onion-skin against the neighbouring shots at 50% | ±1 px @1080p | AA-21 |
| QC-1.4 | Geometry | Straight-edge overlay on held UI; corner radii | ≤1 px deviation | AA-02 |
| QC-1.5 | Generated glyphs | Scan every generated plate frame for letter-like shapes, signage, screens with content, watermarks | 0 | AA-05, TY-U21 |
| QC-1.6 | Identity tokens | Sample brand patches; compare cursor, icons, font with the bible | ΔE00 ≤2; exact components | AA-06 |
| QC-1.7 | Product truth | Compare every UI frame with the product-owner frame list | Real states, order and labels | AA-07, UI-B2 |
| QC-1.8 | People | Freeze on every human at 1:1; check the rights sheet | No generated face in focus; every person released | AA-23 |
| **Light, depth and effects** |||||
| QC-1.9 | Light direction | Shadow vectors on the first and last frame | Within ±15° of the declared key | AA-09, DP-10 |
| QC-1.10 | Depth | Name the planes; check focus and parallax ratio | Read plane sharp; foreground 1.3-2× focal plane | AA-11, Part 04 §20.8 |
| QC-1.11 | Glow and particles | Count; 1:1 crop of the brightest word | Emitters only; ≤2-3% of cap height; particles within budget | AA-12 |
| QC-1.12 | Reflections | Freeze on each reflective element | Sheen along the key direction; nothing reflected that is not in the scene | AA-10 |
| **Motion** |||||
| QC-1.13 | Cause | For each moving element, name the actor | 100% caused | AA-15, UI-B1 |
| QC-1.14 | Motion budget | Freeze every 0.5 s | 1 primary + ≤2 secondary motions | AA-16, UI-B5 |
| QC-1.15 | Eases | Per-frame displacement of each hero move | Matches its token; no constant-speed start or stop on screen | AA-17, Part 03 §19 |
| QC-1.16 | Overshoot | Measure the peak past rest | 0% on type, UI chrome and camera in premium styles; ≤25% of the swing on playful objects | Part 03 #21-22 |
| QC-1.17 | Cadence and blur | Frame-difference in moves; peak speed per frame | 0 duplicated frames; blur on above 5% W/f | AA-19 |
| QC-1.18 | Texture boil | Frame-difference on a static region | ≤1 level/frame (≤0.2 on flat fields) unless grain is declared | AA-13 |
| QC-1.19 | Generated clip edges | Step the first and last 15 f, and every extension seam | No settle, warp or re-light | AA-20 |
| **Camera** |||||
| QC-1.20 | Move | Track one background point | One named move, one direction, roll 0° | AA-14, CM- |
| QC-1.21 | Camera during reading | Translation speed while text is read | ≤0.2% W/f | Part 07 §9.21 #10 |
| **Typography and UI** |||||
| QC-1.22 | Size floors | Measure cap height of every must-read string | ≥3% H (16:9); ≥52 px body (9:16); nothing meaningful <2.5% H | TY-A1, UI-L1 |
| QC-1.23 | Safe area and edges | Overlay the safe-area guide | Inside; nothing informational touching an edge; deliberate crops ≥30% off-frame | CO-A1, UI-A10 |
| QC-1.24 | Contrast | Measure text and data marks against their local background | ≥4.5:1 (3:1 large), 7:1 over footage; data marks ≥3:1 | [N]; CL-A3 |
| QC-1.25 | Holds | Time from "landed" to exit | Meets the Part 07 tier; payoffs and statuses ≥1.0 s | TY-A2, UI-A3 |
| QC-1.26 | Legibility during entrance | Frame at which the string becomes readable | By its RM-02 frame; never soft while read | Part 07 |
| QC-1.27 | Collisions and clipping | Step the exit | No overlapping words, no clipped glyphs on the last frame | CO-A8, TY-A8 |
| QC-1.28 | UI behaviour | Part 06 §8.18 items 1-12 | All pass | Part 06 |
| **Edges of the shot** |||||
| QC-1.29 | Cut frame | Where the cut lands | Peak velocity, empty plate, full cover, behind an exiting element, 1-8 f after a state change, or 0-2 f before a beat | Part 05 §7.3.1 |
| QC-1.30 | One-frame artefacts | Step ±10 f around each cut | No stray patches, foreign dips, light leaks, overlapping words | TR-A3; [V:1-6l8S t=59.73s, 64.27s]; [V:19NRDv t=25.60s] |
| **Accessibility and technical** |||||
| QC-1.31 | Flashes | Count luminance flips per second | ≤3 per second; ≤3 f per flash colour | [N]; CL-A11 |
| QC-1.32 | Render settings | Read the render log | Final settings: PNG or JPEG ≥95 frames, BT.709, yuv420p, native fps | AA-T8, AA-T14 |
| QC-1.33 | Source resolution | Compare source pixels with zoom × delivery | Source ≥ zoom × delivery width | UI-Z4 |

## 22.3 Gate 2: locked-cut QC

Run on the full film with its final mix. It includes the specialised gates of other parts by reference.

| ID | Check | Pass threshold | Rules |
|---|---|---|---|
| QC-2.1 | Story timing | Stage shares within the Part 01 §2.3 band ±3 points; product by ≤8 s (type-led) | Part 01 |
| QC-2.2 | Rhythm | Part 08 §15.18, all 13 items (shot count from the timeline, ASL band, holds, hook on f0, hero moments, breather, sync, accelerando, payoff holds, music ending, native cadence) | Part 08 |
| QC-2.3 | Transitions | Part 05 §7.15, all 17 items | Part 05 |
| QC-2.4 | Typography | Part 07 §9.21, all 20 items | Part 07 |
| QC-2.5 | Sound | Part 09 §16.20, all 15 items | Part 09 |
| QC-2.6 | Continuity across every cut | Onion-skin each cut: anchors ±1 px; strings identical; states continuous; signature devices applied by their rule | AA-21 |
| QC-2.7 | Repetition | Same reveal ≤6 uses; ≤3 same-treatment cards in a row; ≥3 semantic animations in films ≥45 s | AA-24 |
| QC-2.8 | Identity across the film | Contact sheet of the first frame of every shot: one plate style, one light, one grade | AA-06, AA-09 |
| QC-2.9 | Frame 0 and the ending | Hook on f0, change by f3; still lockup ≥1.5 s (2.2 s premium); last musical event on the lockup ±2 f; ≤0.5 s of digital silence at the very end | Part 08, Part 09 |
| QC-2.10 | Muted phone test | A fresh viewer states product, benefit and CTA after one muted viewing | Part 01 §2.16 #1; G-45 |
| QC-2.11 | Effect budgets | Particles, flashes, depth beats and whooshes within the declared budgets | AA-12, AA-18, Part 09 |
| QC-2.12 | Total length | Total frames = plan (template engines: sum of scenes minus overlaps) | P08 §15.18 #13 |

## 22.4 Gate 3: master and delivery QC

Run on **every delivered file**, not on the project or the session. Commands for each check are in §22.6.

| ID | Check | Pass threshold | Why |
|---|---|---|---|
| QC-3.1 | Container and codecs | MP4 (or MOV for a mezzanine); H.264 High profile video (or the codec in the §24.7 row); AAC-LC audio | Plays everywhere; predictable re-encode |
| QC-3.2 | Resolution and aspect | Exactly the row's size (1920×1080, 1080×1920, 1080×1080, 1080×1350, 3840×2160); square pixels (SAR 1:1) | 0/8 references reach 1080p as received (§0.3) |
| QC-3.3 | Frame rate | Constant frame rate at the planned value (30/1, or 24/1); `r_frame_rate` = `avg_frame_rate` | VFR or mismatched rates cause stutter [inferred] |
| QC-3.4 | Frame count and duration | Frame count = plan; duration = frames ÷ fps exactly | Catches dropped or padded frames |
| QC-3.5 | Cadence | 0 duplicated frames inside moves; no periodic zero-difference pattern (every 5th or 6th frame) | [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X] |
| QC-3.6 | Pixel format and colour tags | `yuv420p`; `color_primaries`, `color_transfer` and `color_space` = `bt709`; `color_range` = `tv` | Untagged or mis-tagged files shift colour in browsers and players [inferred] |
| QC-3.7 | Video bit rate | Meets the §24.2 row (1080p30 UI/gradient films ≥12 Mb/s; never below 8) | [V:1CSXtQ §16]; [V:15VhHR §16] |
| QC-3.8 | Banding and blocking | 1:1 crop of the darkest gradient and smallest text, also with contrast boosted ×3 to expose steps | AA-25; CL-U16 |
| QC-3.9 | Black and frozen frames | No unplanned black frame (catches 1-frame dips); no unplanned freeze ≥0.5 s | [V:19NRDv t=25.60s]; TR-A2 |
| QC-3.10 | First and last frames | Frame 0 shows the hook (it is the thumbnail and the autoplay preview); the last frames show the lockup | [N]; [S:playbook] Wistia previews loop the first 5 s |
| QC-3.11 | Audio format | 48 kHz, stereo, AAC-LC 256-320 kb/s; audio and video start together; duration matches video ±1 f | Part 09 SD-M9 |
| QC-3.12 | Loudness | Integrated −14 LUFS ±1 (or the destination's target), true peak ≤ −1 dBTP, LRA 5-10 LU, measured on the final MP4 | Part 09 §16.11 |
| QC-3.13 | Silence | Digital silence only in the last ≤0.5 s (same as QC-2.9); no gap below −45 dB mid-film unless designed (designed gaps in the references reach −61 dB for 0.15-0.35 s) | Part 09 SD-SI3; [V:1CSXtQ t=10.6-10.95s]; [V:1-6l8S t=6.65-6.80s]; Wix's file goes digitally silent 0.3 s before its end [V:15VhHR t=53.6s] |
| QC-3.14 | Streaming layout | `moov` atom at the front (`+faststart`); keyframe at least every 2 s | Fast start in web players [inferred] |
| QC-3.15 | Captions | Sidecar SRT/VTT for every spoken word, cues 0-2 f before speech onset, ≥5/6 s each, ≤42 characters per line; burned-in captions for social cut-downs | [N]; [P]; [S:Thomson Reuters] |
| QC-3.16 | Cut-downs | Every format passes QC-3.1 to 3.15 and its own safe-area check | §24.8 |
| QC-3.17 | Test upload | Private upload to each platform; the platform's playback re-checked at 1:1 and for loudness | Platforms re-encode (Wistia serves PointCard's ≈1209 kb/s 1080p original as a ≈401 kb/s 1080p rendition [S:PointCard]) and normalise loudness (YouTube to −14 LUFS [N]) |
| QC-3.18 | Naming and package | File names and the deliverables package follow §24.10 | Traceability |

## 22.5 Severity classes and sign-off

| Class | Definition | Examples | Ship rule |
|---|---|---|---|
| **S1 · Blocker** | Wrong, illegal, unsafe or brand-damaging | Wrong or changed string; invented number or quote; generated glyphs; wrong or retyped logo; a person without a release; a flash violation; unlicensed music; true-peak overs; a 1-frame black dip; text clipped by the frame edge | 0 allowed |
| **S2 · Major** | Visibly cheapens the film for most viewers | Duplicate-frame judder; strobing pans; visible banding; identity drift; payoff held <1.0 s; music ending early; a cut 3-8 f off the kick; micro-text carrying meaning | 0 in the hook, the hero beat and the lockup; ≤2 elsewhere, each with a signed exception |
| **S3 · Minor** | Noticeable to a professional on a second viewing | A 1 f stagger difference; a slightly long hold; a single off-token ease on a secondary element | ≤3, logged for the next version |

## 22.6 QC tooling: measurement commands

These are standard ffmpeg/ffprobe usages [inferred: verify the exact filter options on your ffmpeg build]. The teardowns used the same families of methods: exact frame indexing, per-frame difference scans, colour masks and short-window audio measurements.

**Stream properties (QC-3.1 to 3.4, 3.6, 3.7, 3.11)**
```
ffprobe -v error -select_streams v:0 \
  -show_entries stream=codec_name,profile,width,height,sample_aspect_ratio,pix_fmt,r_frame_rate,avg_frame_rate,nb_frames,bit_rate,color_range,color_space,color_primaries,color_transfer \
  -show_entries format=duration,bit_rate -of json film.mp4
ffprobe -v error -select_streams a:0 -show_entries stream=codec_name,profile,sample_rate,channels,bit_rate,duration -of json film.mp4
```

**Cadence and duplicate frames (QC-1.17, QC-3.5).** Print a per-frame change score, then look for zero scores inside moves and for a period of 5 or 6 frames:
```
ffmpeg -i film.mp4 -vf "select='gte(scene,0)',metadata=print:file=scene_scores.txt" -an -f null -
```
- Static holds also score zero. The HubSpot teardown found 277 near-zero frames in 901, of which only ≈126 were cadence repeats (every frame ≡ 3 mod 6); the rest were holds [V:1CSXtQ]. Test the periodicity, not just the count.

**Black and frozen frames (QC-3.9)**
```
ffmpeg -i film.mp4 -vf "blackdetect=d=0.03:pix_th=0.10" -an -f null -     # d=0.03 s catches a single frame at 30 fps
ffmpeg -i film.mp4 -vf "freezedetect=n=-60dB:d=0.5" -an -f null -
```
- A dip that still shows part of the image (Bumper's 1-frame dip kept a desaturated card on black [V:19NRDv t=25.60s]) can escape the default picture threshold; also run `blackdetect` with `pic_th=0.80`, and review every hit by eye.

**Loudness, peaks and silence (QC-3.12, 3.13)**
```
ffmpeg -i film.mp4 -af ebur128=peak=true -f null -
ffmpeg -i film.mp4 -af silencedetect=noise=-45dB:d=0.3 -f null -
```

**Exact frames for 1:1 crops (QC-1.x, QC-3.8).** Index by frame number, not by seek time. The teardowns switched to `select=n` "so labels cannot drift" [V:126cpH Verification]:
```
ffmpeg -i film.mp4 -vf "select='eq(n\,374)',crop=480:270:720:405" -frames:v 1 -vsync 0 f374_crop.png
ffmpeg -i film.mp4 -vf "select='eq(n\,374)',crop=480:270:720:405,eq=contrast=3" -frames:v 1 -vsync 0 f374_bandcheck.png
```
The second command triples contrast on the crop so 8-bit steps in a gradient become visible [inferred technique].

**Contact sheets (QC-2.8)**
```
ffmpeg -i film.mp4 -vf "select='not(mod(n\,15))',scale=320:-1,tile=8x6" -frames:v 1 -vsync 0 sheet.png
```
Do not overlay labels on the top of each thumbnail: the Solar teardown's "text cropped" flaw was an artefact of a label bar covering the top ≈13% of each thumbnail [V:1Hcg3X Verification].

**String and colour checks (QC-1.1, QC-1.6).** OCR every must-read string on the final encode and diff it against the string table; sample fixed brand patches per shot and compute ΔE00 [inferred; automate where possible].

## 22.7 QC of the QC: measurement pitfalls found in the references' own verification passes

Every reference teardown was re-measured adversarially, and those passes found that the *tools* were often wrong. These are the traps a QC process must avoid.

| # | Pitfall | What happened | Rule |
|---|---|---|---|
| 1 | Shot detectors miss cuts between similar frames | HubSpot: the detector found 3 shots, the film has 10 (white-to-white cuts) [V:1CSXtQ]. Lottieicon: 14 detected vs 25 real (text swaps on one shared gradient) [V:1ccYWJ]. Bumper: one cut placed 9 f late (14.63 vs 14.333 s) [V:19NRDv]. Solar: four cuts 1-5 f early and a false cut from a brightness drop [V:1Hcg3X]. | Take shot lists from the edit timeline, or from a per-frame difference scan with a low threshold and manual review. Never QC rhythm from a detector (ER-A12). |
| 2 | Onset lists miss kicks and run early | Bumper's onset list missed the intro and the low-passed breakdown kicks and ran ≈2 f early, so the film was first misread as "copy-driven"; a sub-150 Hz kick envelope showed it is beat-locked [V:19NRDv]. kivi's analysis reported 63 BPM for a 127 BPM track (half time) [V:1-6l8S]. | Verify sync with a sub-band kick envelope and a chance test (SD-A11); resolve half and double time. |
| 3 | Capture artefacts read as design | Chowdeck's double-exposed frames are phone/monitor refresh ghosts, not designed echoes [V:126cpH]. | Reverse-engineer from the original file whenever possible; flag capture artefacts. |
| 4 | Tool artefacts | NOSTRA: the frame-sheet tool duplicated the first frame when a start time rounded past a frame boundary, and labels drifted by up to half a sample interval at low fps [V:1i2L14 Verification]. | Exact frame indexing (`select=n`); start sheets just before a frame time. |
| 5 | Overlays hiding content | Solar: a contact-sheet label bar hid the top ≈13% of each thumbnail and produced a false "cropped text" flaw [V:1Hcg3X]. | Never print labels over the image in QC sheets. |
| 6 | Thresholds that miss faint elements | Lottieicon: a white-threshold track picked up "Easy to use" only from its 4th frame (1.45×), not on the cut frame (≈2.1× at ≈25% opacity) [V:1ccYWJ]. | Measure entrances with low thresholds at full resolution. |
| 7 | Levels disagree between passes | HubSpot: a summary's "−5.4 dB whoosh" at 17.80 s re-measured as only a ≈3 dB bump over the music in 50 ms mono RMS [V:1CSXtQ Verification]. NOSTRA: a first-pass RMS of −8.3 dBFS and peak of 1.47 were not reproduced (re-measured −10.9 dBFS RMS, +1.6 dBTP) [V:1i2L14 Verification]. | Copy relative levels, not absolute dB, between meters (SD-A18); measure the final file with one meter. |
| 8 | Stale summaries | Several teardowns found their own structured summaries out of date (for example a pull-back of ×0.795 that measures ×0.75) [V:1CSXtQ] [V:1ccYWJ] [V:1i2L14]. | Regenerate the QC record from the final measurement; never copy values from a draft. |
| 9 | Holds counted as duplicates | Near-zero frame differences include static holds as well as pulldown repeats [V:1CSXtQ]. | Test periodicity (mod 5 or mod 6) inside moves only. |

## 22.8 Universal, style-specific, experimental, avoid, and especially good for SaaS (QC)

**Universal (QC-U)**
- **QC-U1 · QC the final files at final settings.** Previews hide banding, boil and cadence (AA-T14). [U (standard)]
- **QC-U2 · Step every cut at 1 f, ±10 f.** Two references shipped 1-frame artefacts that only stepping finds: a light-leak patch and an overlapping exit [V:1-6l8S t=59.73s, 64.27s], and a 1-frame dip to black [V:19NRDv t=25.60s]. [U, 2/8 flaws + Part 05]
- **QC-U3 · Measure, don't eyeball,** the five things that are numbers: loudness, cadence, sizes, contrast and sync. Every one of them was misjudged by eye or by a default tool in at least one teardown (§22.7). [U]
- **QC-U4 · Watch muted on a phone.** 7/8 references carry meaning in text that is too small for a phone. [U]
- **QC-U5 · Log every defect with frame, severity and rule ID,** so a fix can be verified and a pattern can be found across films. [inferred]

**Style-specific (QC-S)**
- **On-twos styles** (playful collage): duplicate frames are expected on illustration layers. Run the cadence check on the UI, camera and live-action layers only [V:126cpH].
- **Grain styles** (Editorial): exclude the declared grain from the boil test; check instead that it does not crawl in patches [V:1Hcg3X].
- **VO-led films**: loudness per the P09 §16.11.1 table: −14 LUFS ±1 for social and web uploads, −16 for landing-page or help-centre embeds [inferred compromise], −18 only for speech-dominant webinar or how-to content (AES77 [N]); sync check on supers versus speech onsets (0-2 f early) rather than on beats (Part 09).
- **Beat-locked styles** (fast startup launch): the stricter sync test (≥60% of hard cuts 0-2 f before a quarter beat) [V:19NRDv].

**Experimental (QC-X)**
- **QC-X1 · Automated perceptual checks**: OCR string diffs, ΔE00 sampling of brand patches, optical-flow warp detection on generated plates [inferred; untested here].
- **QC-X2 · A model-assisted review of contact sheets** for identity drift, against the continuity bible [inferred]. Use it to flag, never to pass.

**Avoid (QC-A)**

| ID | Avoid | Evidence | Instead |
|---|---|---|---|
| QC-A1 | QC on a preview or proxy render | [kit] preview stills are JPEG quality 10 | QC-U1 |
| QC-A2 | Watching only at full speed | 1-frame artefacts in 2/8 | QC-U2 |
| QC-A3 | Trusting a shot detector or an onset list | §22.7 #1-2 | Timeline and kick envelope |
| QC-A4 | Measuring loudness on the session instead of the MP4 | Part 09 QC 12 | Measure the delivered file |
| QC-A5 | One person makes and signs off the film | [inferred] | A second reviewer runs the gates |
| QC-A6 | Skipping the platform test upload | Platforms re-encode [S:PointCard] and normalise [N] | QC-3.17 |

**Especially good for SaaS (QC-SaaS)**
- **QC-SaaS1 · Product-owner sign-off on a UI frame list** (every state shown, in order, with its label). The product is what a SaaS film sells; the person who owns it is the only one who can certify it [inferred; supports AA-07].
- **QC-SaaS2 · A claims sheet signed before the edit locks** (every number, offer and quote with its source) [S:playbook].
- **QC-SaaS3 · The muted phone test with someone outside the team** (G-45). SaaS buyers often meet the film in a feed, muted [N] [S:playbook].

## 22.9 Do / Don't (QC)

| Do | Don't | Why |
|---|---|---|
| Step every cut ±10 f at 1 f | Approve a cut at full speed | 1-frame artefacts are invisible at speed and visible to every viewer who pauses |
| Measure the delivered MP4 with `ebur128` | Trust the meter in the session | The encode and the limiter change the result |
| Take the shot list from the timeline | Count cuts with a detector | A detector found 3 of the 10 shots in one reference [V:1CSXtQ] |
| Crop the darkest gradient at 1:1 and boost contrast | Judge banding from a thumbnail | Banding shows only at full size, and worse after the platform re-encode |
| Diff every string against the string table | Proofread by watching | The eye fills in expected words; "make" vs "create" slipped through [V:15VhHR] |
| Test-upload privately and re-check | Assume the platform will keep the quality | The platform's encode is the version people see |
| Log defects with frame numbers and rule IDs | Write "looks a bit off at the end" | A defect without a frame cannot be fixed or verified |

## 22.10 QC record template

One record per delivered file. It is generated from the measurements, never typed from memory.

```json
{
  "film": "BRAND_PRODUCT_launch", "version": "v07", "file": "BRAND_PRODUCT_launch_16x9_1920x1080_30p_v07.mp4",
  "gates": {
    "G0_phase18_passA": { "passed": true, "exceptions": [] },
    "G1_per_shot": { "shots": 27, "S1": 0, "S2": 0, "S3": 2 },
    "G2_locked_cut": { "part05": "pass", "part07": "pass", "part08": "pass", "part09": "pass", "continuity_onion_skin": "pass" },
    "G3_master": {
      "codec": "h264 High", "size": "1920x1080", "sar": "1:1", "fps": "30/1", "cfr": true,
      "frames": 2016, "duration_s": 67.2, "pix_fmt": "yuv420p",
      "color": { "primaries": "bt709", "transfer": "bt709", "matrix": "bt709", "range": "tv" },
      "video_mbps": 14.2, "dup_frames_in_moves": 0, "black_frames_unplanned": 0, "freezes_unplanned": 0,
      "audio": { "codec": "aac", "rate_hz": 48000, "channels": 2, "kbps": 320 },
      "loudness": { "integrated_lufs": -14.1, "true_peak_dbtp": -1.4, "lra_lu": 7.2 },
      "faststart": true, "captions": "BRAND_PRODUCT_launch_en.vtt",
      "test_upload": { "youtube": "pass", "linkedin": "pass", "x": "pass" }
    }
  },
  "defects": [
    { "frame": 1544, "gate": "G1", "severity": "S3", "rule": "QC-1.25", "note": "lockup hold 1.6 s, target 2.2 s premium", "status": "accepted" }
  ],
  "signed": { "maker": "…", "reviewer": "…", "product_owner": "…", "audio": "…", "date": "2026-10-08" }
}
```

---

# Master §23. Common Mistakes

## 23.0 How this list was built

Every reference teardown ends with a "What to avoid" list and a "Flaws" list, and every one was re-measured in a verification pass. This section pools those measured flaws, counts how many of the eight films show each one (n/8), and ranks them by frequency, then by severity (§22.5). It adds two lists the teardowns imply but do not rank: the mistakes **none** of the references make (they are what generated and template films usually get wrong), and the **process** mistakes that produce the visible ones.

Read the ranking with one caveat: the references are good films. The most common mistakes in them are therefore the ones that survive good taste, which is exactly why they need a checklist.

## 23.1 The census: mistakes ranked by frequency

| ID | Mistake | n/8 | Where (measured) | Severity | Fix |
|---|---|---|---|---|---|
| MK-01 | Meaning carried by text too small for a phone | **7/8** (6/8 against this part's 3% H floor; HubSpot counts only under its teardown's stricter ≈5% H floor for phone hooks) | kivi UI text 1.2-2% H; Chowdeck line items ≈1% H; Wix micro-copy 1-1.5% H; Bumper UI text ≈1% H; HubSpot hook cap 3.6% H on black; Solar recap labels 2.2-2.5% H; Lottieicon chips and format pill ≈1.5% H, URL ≈2% H | S2 | §23.2 |
| MK-02 | Delivered below 1080p, at low bit rate, or inside a wrapper | **8/8** | All eight below 1080p as received (masters unknown); Wix ≈652 kb/s; HubSpot ≈175 kb/s video; NOSTRA inside a wrapper | S2 | §24 |
| MK-03 | Visible compression artefacts (banding, blocking) | **5/8** | Banding: kivi, Wix, Bumper, Lottieicon. Blocking: Wix, HubSpot, Lottieicon | S2 | AA-25, EX-U4-U6 |
| MK-04 | A weak or missing ending (no lockup, no CTA, bare URL, music ending early, ending mid-motion) | **4/8** | kivi bare URL; Chowdeck no CTA; Lottieicon no end lockup and music gone 3.7 s early; Solar no logo or CTA, ends mid-motion | S1 for performance films; S2 otherwise | §23.2 |
| MK-05 | Text-card fatigue and one reveal grammar repeated | **4/8** | kivi 5 text-only cards on an ambient bed (22-31 s); HubSpot 4 same-size centred cards (21.5-27.4 s); Lottieicon 13 text-only cards, 6 in a row (33.2-39.1 s); Bumper one type grammar ≈12 times | S2 | §23.2 |
| MK-06 | Duplicate-frame judder from frame-rate conversion | **3/8** | Wix and HubSpot 25 → 30; Solar 24 → 30 | S2 | AA-19, EX-U3 |
| MK-07 | Loudness off target or over-limited | **3/8** | kivi −10.7 LUFS; NOSTRA −7.9 LUFS with +1.6 dBTP and LRA 1.2 LU; Lottieicon −16.6 LUFS (quiet for social) | S1 for overs; S2 otherwise | Part 09 §16.11; EX-U8 |
| MK-08 | A payoff or state not held long enough to read | **3/8** | Solar's payoff block readable ≈0.4 s; Chowdeck's "Order delivered" 2 f and "been busy?" ≈0.45 s; Lottieicon cards shorter than reading time (shots 4-8, 19-24) | S2 | §23.2 |
| MK-09 | Inconsistent plate style or light, or a one-off stock insert | **3/8** | kivi's three illustration styles; Solar's two light directions; Bumper's one stock lifestyle photo with no continuity | S2 | AA-06, AA-09 |
| MK-10 | Copy, grammar, format or language inconsistencies | **3/8** | Wix "make" vs "create" across a cut-in; Lottieicon singular/plural, "4,863+" vs "50 + Categories", duplicate card; NOSTRA English headlines with French body copy | S1 for a changed string; S2 otherwise | AA-05, AA-08 |
| MK-11 | One-frame artefacts at cuts | **2/8** | kivi light-leak patch (59.73-59.77 s) and "spreadsheetpowered" overlap (64.27-64.33 s); Bumper 1-frame dip to black (25.60 s) | S1 | QC-1.30 |
| MK-12 | Unlabelled metaphors or a montage with no stated claim | **2/8** | NOSTRA's feature parade (19.95-30.63 s); Wix's ice-bottle montage (29.47-33.33 s) | S2 | §23.2 |
| MK-13 | A mid-film energy dip | **2/8** | kivi 22-31 s (ambient pads under 5 text cards); Bumper's 6.3 s network shot with slow drift between beats | S2 | §23.2 |
| MK-14 | Text clipped, or a component cropped by accident | **2/8** | Bumper's caption clipped by the top edge for 5 s (30.9-35.9 s); Lottieicon's toolbar cropped at the left edge | S1 for clipped text | §23.2 |

## 23.2 The top mistakes in detail

### MK-01 · Meaning carried by text too small for a phone (7/8)
- **Symptom.** UI labels, chart axes, chips, URLs and sometimes the hook itself sit at 1-2.5% H. They are legible on a desktop monitor during editing and unreadable on a phone.
- **Measured.** See the census row. The worst cases: Chowdeck's order line items at ≈1% H [V:126cpH]; Bumper's UI text at ≈1% H (≈11 px @1080p) [V:19NRDv]; HubSpot's hook at a cap height of 3.6% H, which its teardown says "will be weak on phones" [V:1CSXtQ].
- **Why it hurts.** A 1080-wide video on a phone shows 1 video px at ≈0.36 pt, so 11 pt (the iOS text minimum) is ≈30 px [N]. Text below that is not "small", it is invisible, and if it carries meaning the viewer misses the point.
- **Fix.** Decide the class of every string before animating it:
  - **Read class:** cap ≥3% H at 16:9 (≥84 px for sentences in phone-bound 16:9), ≥52 px body at 9:16 [N]; held for its read time (Part 07).
  - **Texture class:** accepted as unreadable and never carrying meaning (Part 06 UI-L).
  - To make one value readable inside dense UI, scale up that value and leave the rest as texture (Bumper's "100%" counter does this right [V:19NRDv]), or cut in at ≈3-3.5× rather than shrinking the UI [V:15VhHR rule 13].
- **Rules.** TY-A1, TY-A13, UI-A2, CO-A4; QC-1.22.

### MK-02 · Delivered below 1080p, at a low bit rate, or inside a wrapper (8/8 as received)
- **Symptom.** A sub-HD file, a bit rate that blocks small text, or the film shown inside a fake player frame.
- **Measured.** All eight files are below 1080p as received; Wix runs at ≈652 kb/s and HubSpot at ≈175 kb/s of video [V:15VhHR] [V:1CSXtQ]. NOSTRA wraps a 1011×567 film inside a 1056×720 file with a chapter bar, wasting 21% of the height [V:1i2L14].
- **Caveat.** These are the files as received. Some may be platform re-encodes of better masters [inferred]. The text sources show that comparable SaaS films are mastered at 1920×1080 or 3840×2160 [S] [E].
- **Why it hurts.** Every later stage (the platform's re-encode, the viewer's scaling) can only lose detail. Text and gradients are the first to go.
- **Fix.** §24: master at ≥1920×1080 (16:9) or 1080×1920 (9:16), H.264 at ≥12 Mb/s for 1080p30 UI or gradient films, never a wrapper around the actual ad (AD-A9, UI-A11).

### MK-04 · A weak or missing ending (4/8)
- **Symptom.** The film ends on a bare URL, on no logo at all, on silence, or mid-motion.
- **Measured.**
  - kivi ends on "heykivi.ai" alone, with no lockup and no verb [V:1-6l8S t=75.53s].
  - Chowdeck shows a lockup but no CTA (the TikTok may be truncated) [V:126cpH].
  - Lottieicon has no end lockup (the brand is on screen only 2.6-4.6 s in a 44 s film) and its music is gone 3.7 s before the picture ends [V:1ccYWJ].
  - Solar has no logo or CTA and ends mid-motion (probably a portfolio cut) [V:1Hcg3X].
- **Why it hurts.** The end frame is the one people act on. A film that does not say what to do next, or whose sound has already finished, ends twice: once in the ear, once in the eye.
- **Fix.** Verb-led CTA matched to the funnel stage [S:playbook]; logo lockup held still ≥1.5 s (2.2 s premium) [V:1CSXtQ]; the last musical event on the lockup ±2 f and the music tail running to the last frame (Part 09 SD-AR7); ≤0.5 s of digital silence at the very end.
- **Rules.** HS-A6, HS-A7, ER-A5, ER-A14, SD-A1, TY-A14.

### MK-05 · Text-card fatigue and one reveal grammar repeated (4/8)
- **Symptom.** Several centred text-only cards in a row with the same size and the same reveal; the middle third feels like slides.
- **Measured.** kivi's 22-31 s stretch (ambient pads under 5 text-only cards) is its flagged energy dip [V:1-6l8S]; HubSpot's 4 same-size cards "differ only in micro-animation" [V:1CSXtQ]; Lottieicon has 13 text-only cards and 6 in a row [V:1ccYWJ]; Bumper repeats slam → build → pull-back about 12 times [V:19NRDv].
- **Why it hurts.** Novelty drives attention in short-form film. Repetition without variation lets the viewer predict the next 10 seconds, which is when they leave.
- **Fix.** ≤3 same-treatment text cards in a row; the same reveal ≤6 times; between cards, change scale, hierarchy or treatment, or insert a UI beat or a music lift; plan ≥3 semantic animations that act out the word (≈9-30 f each) [V:19NRDv rule 5].
- **Rules.** AA-24, TY-A11, ER-A3, MP-A6, SD-A9.

### MK-08 · A payoff or state not held long enough to read (3/8)
- **Symptom.** The most important line is on screen, fully formed, for less time than it takes to read.
- **Measured.** Solar's "Earning credits on your Electric Bill" is readable as a whole block for ≈0.4 s before the exit whip [V:1Hcg3X t=29.80-30.2s]. Chowdeck shows "Order delivered" for 2 f before the cut and holds "been busy?" ≈0.45 s [V:126cpH]. Lottieicon runs some cards shorter than comfortable reading time [V:1ccYWJ §6].
- **Why it hurts.** The payoff is the reason the film exists. Cutting it short is like ending a sentence before its verb.
- **Fix.** Payoffs and statuses ≥1.0 s fully still after landing (P08 §15.18 #10 and §17.8 #4; Part 06 UI-H7); the read-time rule from Part 07; no text event under 25 f [N].
- **Rules.** ER-A2, TY-A2, UI-A3, MP-A9.

### MK-12 · Unlabelled metaphors, or a montage with no stated claim (2/8)
- **Symptom.** A sequence of abstract images whose meaning the viewer has to guess.
- **Measured.** NOSTRA's features section (arrows, pinwheel, iris, form, phone, strands, glass) has no labels, "so the feature meanings are guesswork" [V:1i2L14 §13]. Wix's ice-bottle montage is "visually rich but semantically vague" [V:15VhHR §13].
- **Fix.** A 1-2 word label per metaphor (Part 01 §1.10); one readable claim per montage; "show first, then label" is fine when the label arrives within the same beat [V:1-6l8S t=20.43s → 25.47s].
- **Rules.** AD-A10, UI-A19, HS-A8, TR-A11.

### MK-13 · A mid-film energy dip (2/8)
- **Symptom.** The middle third slows to slides or a long diagram with little happening.
- **Measured.** kivi 22-31 s [V:1-6l8S]; Bumper's 6.3 s network shot drops motion energy to 1.82 at the midpoint, with slow drift between its beats [V:19NRDv].
- **Fix.** In any proof shot longer than 3 s, an in-shot camera beat every 0.8-1.5 s (snap, orbit step, push-through, punch-in cut) [V:19NRDv rule 12]; no hold over 5 s without a beat (ER-A4); put a breather where it is earned, right before the reassurance and CTA, not in the middle of the proof [V:1i2L14 rule 14].
- **Rules.** ER-A4, ER-A10, CM-A2.

### MK-14 · Text clipped, or a component cropped by accident (2/8)
- **Symptom.** A caption touches or crosses the frame edge; a UI component is cut by the edge in a way that looks unplanned.
- **Measured.** Bumper's caption "Streamline refunds and chargebacks / and reduce fraud" is clipped by the top edge for 5 s [V:19NRDv t=30.9-35.9s]. Lottieicon's toolbar pill is cropped at the left edge and "looks accidental rather than designed" [V:1ccYWJ t=12.17s].
- **Fix.** Keep captions at least 5% H inside the title-safe area [V:19NRDv §16]; 16:9 text inside x 96-1824, y 54-1026 [N]; either frame a component fully or crop it decisively (≥30% off-frame) [V:1ccYWJ §16].
- **Rules.** CO-A1, CO-A2, TY-A7, UI-A10, CM-A5.

## 23.3 The long tail: mistakes seen in one reference

Each of these is measured once. They are still worth a rule, because each one is cheap to prevent and costly when it reaches the viewer.

| ID | Mistake | Where | Severity | Fix | Rules |
|---|---|---|---|---|---|
| MK-15 | Static opening of 0.73 s | [V:126cpH t=0-0.73s] | S2 | First change by f3 | ER-A1, CM-A12, TY-A4 |
| MK-16 | Decorative rays crossing the claim word for ≈0.5 s | [V:126cpH t=4.03-4.57s] | S2 | Mask decoration behind the type | TR-A18, CO-A3, HS-A4 |
| MK-17 | Unblurred camera hops at 22-27% W/f that strobe | [V:1ccYWJ t=30.57-32.57s] | S2 | Peak ≤5% W/f unblurred, or 180° blur above 5% W/f (the teardown flags the 10% W/f move as strobing too) | MP-A1, CM-A1, UI-A7 |
| MK-18 | Bloom that smears letter edges for 3-4 f | [V:19NRDv t=7.20s] | S2 | Glow ≤2-3% of cap height | CL-A4, TY-A6, DP-A5 |
| MK-19 | Low-contrast data marks (violet glass bars on navy) | [V:19NRDv t=11-14s] | S2 | Data marks ≥3:1 | CL-A3, UI-A15, DP-A7 |
| MK-20 | Greeked, low-resolution UI in the hero 3D beat, plus a plane intersection | [V:1CSXtQ t=18.4-19.0s] | S2 | Real UI at ≥ zoom × delivery; no intersecting planes | AD-A7, UI-A5, UI-A6, HS-A2 |
| MK-21 | A cut 5 f ahead of the kick | [V:1CSXtQ t=22.60s] | S2 | Lead the beat by 0-2 f, or move the cut into a gap | ER-A6, SD-A6, TR-A8 |
| MK-22 | A pixel or glitch build of 23-26 f | [V:1i2L14 t=16.63-17.50s] | S2 | ≤12 f | MP-A4, TR-A6, TY-A10 |
| MK-23 | An over-limited, clipping master (−7.9 LUFS, +1.6 dBTP, LRA 1.2 LU) | [V:1i2L14] | S1 | −14 LUFS ±1, ≤ −1 dBTP, LRA 5-10 LU | SD-A2 |
| MK-24 | A signature device applied in only some matching scenes | [V:1-6l8S] | S3 | Every time, or write the rule | AD-A2 |
| MK-25 | An icon row with zero stagger and an unidentifiable app icon | [V:1-6l8S t=34.5s] | S3 | 2-3 f stagger; recognisable, licensed marks | MP-A3, UI-A8 |
| MK-26 | Muddy duotone tints on "problem" cards | [V:1i2L14 t=10.63-13.97s] | S3 | A lighter, cleaner tint; check that neutrals stay neutral [inferred] | CL-A12 |
| MK-27 | Silent typing at 23-55 chars/s | [V:1ccYWJ t=34.4-37.2s] | S3 | Soft keystroke texture ≈20-25 dB under the music (HubSpot's typing ticks sit at that level [V:1CSXtQ t=2.5-7.2s]) | TY-A17, SD-A10 |
| MK-28 | Off-beat, unexplained state snaps | [V:1Hcg3X t=21.03s, 21.53s] | S3 | Snap on a beat or a VO word | ER-A9, TR-A15 |
| MK-29 | "AI" thermal duotone holds of 7-11 f that can read as a glitch on first viewing (the teardown's flaw list); its avoid list puts the glitch risk above ≈15 f | [V:15VhHR t=8.63-11.20s] | S3 | 7-15 f, always followed by a visible 6-12 f clean-up to final colours so the state reads as "generating"; never longer than ≈15 f | CL-A7, UI-A16 |
| MK-30 | A before/after hero object that is moved instead of pixel-locked | [V:15VhHR t=19.20s] | S3 | Pixel-lock the recurring object across the swap | AA-21 |
| MK-31 | A brand on screen for under 2 s in the whole film | [V:1ccYWJ] | S2 | Lockup at the end, ≥1.5 s | HS-A1 |
| MK-32 | A dated flourish (45° long shadow on type) | [V:126cpH t=0.73s] | S3 | No long shadows, bevels or drop shadows on type | AD-A4, TY-A12 |
| MK-33 | More than 3 rendering idioms in one frame | [V:126cpH t=5.87-8.43s] | S3 | ≤3 idioms per frame, one unifier (palette, cadence) | AD-A3 |
| MK-34 | Delivering inside a fake player frame | [V:1i2L14] | S2 | Deliver the film full-frame | AD-A9, UI-A11 |

## 23.4 Mistakes the references never make

These are absent from all eight films (0/8), and they are the habits of generated and template-driven films. Their absence is part of why the references read as designed.

| Mistake | n/8 that show it | Where it appears in generic output [inferred] | Rule |
|---|---|---|---|
| Overshoot, bounce or elastic on type | 0/8 | Default springs in code engines (Remotion's default overshoots 16.3% [N]) | TY-A3, AA-T4 |
| Plug-in transitions (glitch packs, luma wipes, spins, page curls, light-leak presets) | 0/8 | Template packs, "variety" randomisation | TR-A1 |
| A montage of random floating screens | 0/8 | "Floating UI in 3D space" prompts and stock templates | UI-A1, AA-15 |
| Lens flares, chrome type, holographic HUDs | 0/8 | "Futuristic", "AI", "cinematic" prompts | AA-12, AD-A8 |
| A whoosh on every transition | 0/8 | SFX auto-attached per cut | SD-A4, TR-A9 |
| A sound on every visual event | 0/8 | Per-event SFX in templates | SD-A5 |
| Trailer percussion, choirs, "epic" stock music | 0/8 | Stock-library defaults | SD-A12 |
| Sung lyrics under on-screen copy | 0/8 | Trending-sound reuse | SD-A13 |
| Digital silence mid-film | 0/8 (designed drops go to −41 to −61 dB for 0.15-0.35 s before a reveal, never to digital zero [V:1CSXtQ t=10.6-10.95s] [V:1-6l8S t=6.65-6.80s]) | Hard-cut sound edits | SD-A7 |
| Camera roll, Dutch angles, handheld shake on UI | 0/8 | Generative "cinematic" drift; wiggle expressions | CM-A3, AA-14 |
| A crossfade as the default scene transition | 0/8 | Editor defaults | TR-A17 |
| Linear moves that start and stop on screen | 0/8 | Code defaults (`interpolate` is linear) | MP-A13, AA-17 |
| Fake progress bars for AI work | 0/8 (Wix shows generation as a develop or a gradient state) | Template "loading" scenes | UI-A18 |
| Generated text, UI or logos | 0/8 | Video-model output | AA-A1 |

## 23.5 Context-dependent mistakes: a fault in one style, a tool in another

Several "mistakes" are correct in the right style. The rule is never "don't use X"; it is "use X only where its job is".

| Technique | A mistake when… | Correct when… | Evidence |
|---|---|---|---|
| Animating on twos | It touches UI, camera moves or live action (reads as lag) | It is limited to illustration and collage layers in a playful style | [V:126cpH rule 13] |
| Overshoot | On type, UI chrome, the camera or a premium hero | On a tossed physical object or a device wobble, ≤25% of the swing, one cycle | [V:126cpH t=9.37s]; [V:1Hcg3X t=14.50s] |
| Grain | In minimal and calm styles as a look; any grain that crawls | Fine, seeded grain in Editorial styles; 1-2% dither everywhere | [V:1Hcg3X]; CL-U16 |
| Motion blur | On holds or on text being read | Above 5% W/f; on every move in fast kinetic-type films | [V:19NRDv]; Part 05 QC 11 |
| Unreadable text | It carries meaning | It is a deliberate "too much text" metaphor (NOSTRA's curved wall of French copy, discarded with a gravity drop) | [V:1i2L14 t=10.63-13.97s] |
| Glitch or scramble decode | Longer than ≈12 f, or used more than once | Once, ≈10 f, as a "tech" accent | [V:19NRDv t=1.17-1.50s] |
| Flash frames | Longer than 3 f, more than one moment, or more than 3 per second | Once, at the conceptual peak (3 + 2 f) | [V:1Hcg3X t=12.83s]; [N] |
| Stillness | An opening over 0.5 s; holds longer than ≈0.3 s (9 f) with nothing moving in flat illustration [V:1Hcg3X §6] | The final lockup (0.8-2.2 s); reading holds in strong negative space (≤1.0 s) | [V:1CSXtQ t=27.87s]; [V:1Hcg3X] |
| 1-frame pop-on | On every element | For the hook word, UI state changes and shape-matched swaps | [V:126cpH]; [V:15VhHR] |
| Pure black backgrounds | Under gradients or glows at web bit rates | Solid, or dithered | [V:1ccYWJ]; CL-A6 |
| A coloured "AI is working" state | Held longer than ≈15 f, or left on resting UI | 7-15 f, always settling to final colours | [V:15VhHR rule 4] |
| A 3D or DOF moment | On every shot "to make it cinematic" | Once, on the one idea that needs depth to be understood | [V:1CSXtQ]; DP-A1 |

## 23.6 Process mistakes: how the visible mistakes get made

| ID | Process mistake | What it causes | Evidence | Prevention |
|---|---|---|---|---|
| MK-P1 | Editing copy per shot, with no string table | Strings that change across cuts and formats | [V:15VhHR t=6.57s] | String table (G-15) |
| MK-P2 | Generating or animating before the package passes the Phase-18 gate | Re-renders, invented claims, missing assets | [inferred] | G0 first |
| MK-P3 | QC on previews and proxies | Banding, boil and cadence slip through | [kit] preview stills at JPEG 10 | AA-T14, QC-U1 |
| MK-P4 | Trusting shot detectors and onset lists | Wrong rhythm and sync conclusions | §22.7 #1-2 | Timeline and kick envelope |
| MK-P5 | Exporting with engine defaults | JPEG 80 frames, untagged colour (`default` colour space in Remotion v4), bouncy default springs | [N]; [kit] | AA-T4, AA-T8, §24.11 |
| MK-P6 | Converting the frame rate at the end | Duplicate-frame judder | 3/8 | Decide the rate at G-19 |
| MK-P7 | Making the mix loud with a limiter instead of with contrast | Flat, clipping masters | [V:1i2L14]; SD-M2 | −14 LUFS by gain and arrangement |
| MK-P8 | Choosing music without editing it to the runtime | Music ending before the picture, or a mid-phrase cut | [V:1ccYWJ] | SD-AI2 |
| MK-P9 | Uploading a low bit-rate file that the platform re-encodes again | Two generations of compression loss | [V:15VhHR] ≈652 kb/s; [V:1CSXtQ] ≈175 kb/s; [inferred] mechanism | EX-U4 |
| MK-P10 | Letting an LLM invent values (timings, data, claims) | Inconsistent eases, too-fast timings, fake numbers | [N]; [S:playbook] | Token-only motion; data and claims sheets |
| MK-P11 | No product-owner review of UI frames | Greeked or impossible UI in the hero shot | [V:1CSXtQ] | QC-SaaS1 |
| MK-P12 | Making the vertical version by cropping the horizontal one | Text outside safe zones; meaning cropped out | [E] vertical cuts exist only as Shorts ("adaptation" is [E]'s inference); [V:1Hcg3X] re-lays labels for strips | Re-layout (§24.8) |
| MK-P13 | Copying absolute dB or hex values between meters and encodes | False corrections | SD-A18; Part 02 (±3-5 levels at sub-HD) | Compare relative values; measure your own file |
| MK-P14 | Reading capture artefacts as design when studying a reference | Copying ghosts and judder as "style" | [V:126cpH] | Work from original files; flag capture artefacts |

## 23.7 Mistakes by pipeline

| Pipeline | The mistakes it makes most | First defence |
|---|---|---|
| Generative video | AA-01 morphing, AA-05 gibberish text, AA-06 identity drift, AA-09 lighting changes, AA-13 boil, AA-14 random drift, AA-20 clip seams, AA-23 faces, AA-22 audio left in | AA-U1 and the AA-G rules; select takes by the §21.4 checklist |
| Template or code engine | AA-17 default motion, AA-16 over-animation, AA-24 sameness, AA-08 placeholders, AA-13 flicker from non-deterministic code, MK-P5 default export | AA-T rules; validators; token-only motion |
| Human editor | MK-10 copy drift, MK-11 1-frame artefacts, MK-04 ending, MK-07 loudness, MK-06 late frame-rate conversion | The gates in §22, run by a second person |

## 23.8 Universal, style-specific, experimental, avoid, and especially costly for SaaS

**Universal (MK-U)**
- **MK-U1 · The most common mistakes show up at delivery.** Two of the three most frequent (MK-02 resolution and bit rate, MK-03 compression) happen after the design is finished, and the third (MK-01 read size) is only visible at the size the viewer actually watches. Put the most QC time where the losses are (§0.4) and check on a phone. [U, 5-8/8]
- **MK-U2 · Endings are where good films fail.** 4/8 end weakly. Build the ending first in the edit, not last. [U, 4/8]
- **MK-U3 · Repetition is the mid-film risk.** 4/8 have text-card fatigue or a repeated grammar. Plan variety into the middle third. [U, 4/8]

**Style-specific (MK-S)**
- Kinetic-type launches are most at risk of MK-05 (repeated grammar) [V:19NRDv] [V:1ccYWJ].
- UI-focused demos are most at risk of MK-01 (micro-text) and MK-20 (greeked UI) [V:15VhHR] [V:1CSXtQ].
- Editorial and illustrated films are most at risk of MK-09 (light and style consistency) and MK-08 (short payoffs) [V:1Hcg3X] [V:1-6l8S].
- Agency self-promos are most at risk of MK-12 (metaphor parade) and MK-34 (wrapper) [V:1i2L14].

**Experimental (MK-X)**
- **MK-X1 · A pre-mortem.** Before the edit locks, list the three mistakes this style is most at risk of (above) and check them first [inferred].

**Avoid (MK-A)**: every row of §23.1 and §23.3.

**Especially costly for SaaS (MK-SaaS)**
- **MK-SaaS1 · Anything that makes the product look unreal**: greeked UI, changed strings, impossible states (MK-20, MK-10, AA-07). A SaaS film's whole argument is "this software is real and good".
- **MK-SaaS2 · An ending with no verb.** B2B films are bought by people who need a next step; a bare URL or a silent logo wastes the most expensive second of the film (MK-04) [S:playbook].
- **MK-SaaS3 · Invented numbers.** A fake statistic in a B2B film is a sales and legal liability, not only a style problem (AA-08) [S:playbook].

## 23.9 Do / Don't (common mistakes)

| Do | Don't | Why |
|---|---|---|
| Classify every string as "read" or "texture" before animating | Shrink UI until it fits and hope | 7/8 references lose meaning to micro-text |
| End on a still lockup with a verb CTA and a musical resolution | End on a URL, or let the music run out early | 4/8 references end weakly |
| Hold every payoff ≥1.0 s still | Whip the payoff out after 0.4 s | The payoff is the point of the film [V:1Hcg3X] |
| Break text-card runs at 3 with a UI beat or a scale change | Run 6 same-size cards in a row | Predictability ends attention [V:1ccYWJ] |
| Label every metaphor in 1-2 words | Trust the viewer to decode a pinwheel | Unlabelled metaphors read as guesswork [V:1i2L14] |
| Keep text ≥5% H inside the title-safe area | Let a caption touch the frame edge | A clipped caption reads as an error for its whole duration [V:19NRDv] |
| Step every cut at 1 f before sign-off | Find 1-frame artefacts in the published film | Two references shipped them [V:1-6l8S] [V:19NRDv] |

---

# Master §24. Final Export Recommendations

## 24.0 Why export decides the premium read

The census in §0.3 is the argument for this section. Every one of the eight films, as received, loses something in delivery: all are below 1080p, three judder from frame-rate conversion, five show banding or blocking, three are off their loudness target. None of those defects is visible in the design files. All of them are visible to the viewer.

**Standard wins, references confirm.** On delivery quality the references are counter-examples, and their own teardowns say so: "deliver at a mismatched frame rate … or under ~2 Mb/s for 720p gradients. Banding and judder cheapen premium work" [V:15VhHR §16]; "Render natively at the delivery frame rate"; "use ≥8-12 Mb/s at 1080p for UI-heavy films" [V:1CSXtQ §16]; "Deliver at about −14 LUFS and −1 dBTP" [V:1i2L14 §16]; "Deliver at 1080p or above with dither" [V:1ccYWJ §16].

**The principle.** Render once, at the highest quality, to a master. Derive every delivery file from that master in a single encode. Then the only further loss is the platform's own re-encode, which you cannot avoid but can feed with the cleanest possible input [inferred: standard post-production practice].

## 24.1 The delivery pipeline

| Stage | Output | Settings | Why |
|---|---|---|---|
| 1. Picture render | Image sequence or mezzanine video | Native resolution and frame rate; frames as PNG (or JPEG ≥95); BT.709 | Renderer defaults lose quality first: Remotion renders JPEG frames at quality 80 by default, which bleeds thin saturated text and bands dark gradients [N] |
| 2. Mezzanine master | MOV, ProRes 422 HQ (10-bit 4:2:2), or ProRes 4444 with alpha for overlays; or a PNG sequence | Full resolution, native CFR, BT.709 | One high-quality source for every later encode [inferred] |
| 3. Audio master | WAV, 48 kHz / 24-bit, plus stems (music, voice/product, SFX, ambience) | −14 LUFS ±1, ≤ −1 dBTP (or the destination target) | Part 09 SD-M9 |
| 4. Delivery encodes | MP4: H.264 High + AAC-LC | One encode per destination from the master (§24.2, §24.7) | One lossy generation before the platform's |
| 5. QC | QC record per file | Gate 3 (§22.4) on each delivered file | The delivered file is the only one that matters |
| 6. Test upload | Private upload per platform | Re-check 1:1 crops and loudness after the platform's encode | Platforms re-encode [S:PointCard: ≈1209 → ≈401 kb/s at 1080p] and normalise [N] |

**Template-engine note.** This repository's motion-kit renders JPEG frames at quality 95, BT.709, H.264, `yuv420p`, CRF 20, and normalises audio to −14 LUFS / −1 dBTP with AAC at 192 kb/s [kit]. That is a sound web default. For UI- or gradient-heavy films, §24.2 recommends CRF 16-18 and AAC at 256-320 kb/s.

## 24.2 Video codec and bit rate

Bit rates are for 30 fps; scale ×0.8 for 24 fps and ×1.6-2 for 60 fps [inferred]. "UI / gradient" means films with small UI text, dark or smooth gradients, glows or fine grain. "Flat" means large flat colour fields and big type only.

| Deliverable | Size | Codec / profile | Rate control | Video bit rate | Evidence |
|---|---|---|---|---|---|
| Web master for YouTube, LinkedIn, X, landing pages (16:9) | 1920×1080 | H.264 High, level 4.1-4.2 | CRF 16-18, `preset slow`, or 2-pass VBR | **UI / gradient: 12-20 Mb/s. Flat: 8-12 Mb/s. Never below 8.** | [V:1CSXtQ §16] ≥8-12 Mb/s; [N] CRF 18; upper band [inferred] |
| Vertical (Reels, TikTok, Shorts) | 1080×1920 | H.264 High | CRF 16-18 | 12-20 Mb/s | Same pixel count as 1080p [inferred] |
| Square / portrait feed | 1080×1080 / 1080×1350 | H.264 High | CRF 16-18 | 10-16 Mb/s | [inferred] |
| Flagship launch master | 3840×2160 | H.264 High (level 5.1) or HEVC Main | CRF 16-18 or 2-pass VBR | H.264 35-50 Mb/s; HEVC 20-30 Mb/s | [E] 4K masters through 2024; Nissan 4K [S]; rates [inferred] |
| 720p fallback (only if required) | 1280×720 | H.264 High | CRF 18 | ≥5 Mb/s; **never below ≈2 Mb/s with gradients** | [V:15VhHR §16]; [inferred] |
| Mezzanine | Native | ProRes 422 HQ (or 4444 for alpha) | Constant quality | ≈180-220 Mb/s at 1080p30 [inferred] | [kit] Remotion supports ProRes profiles including `hq` and `4444` |
| Website hero loop (muted autoplay) | 1920×1080 or 1280×720 | H.264 MP4 (optional VP9/AV1 WebM alongside) | CRF 20-23 with a size budget | 3-8 Mb/s; aim for ≤3-5 MB for a 10-15 s loop | [inferred] |
| UI micro-animation on a product page | Vector | Lottie JSON | — | — | [V:1ccYWJ] is a Lottie product; [N] LottieFiles |

**Counter-evidence on the floor.** Superside's PointCard ad, a professional flat-colour 1080p30 film, was uploaded at ≈1209 kb/s and is streamed at ≈401 kb/s [S:PointCard]. So "never below 8 Mb/s" is not an industry norm; it is this part's safety margin for UI text, gradients, glows and grain, the content that broke in 5/8 references [inferred]. A truly flat film (large solid fields, big type, no gradients) can go lower; verify with the QC-3.8 crops rather than by bit rate alone.

**Encoder settings that matter** [inferred: standard x264 practice]:
- `-pix_fmt yuv420p`, `-profile:v high`, `-preset slow` (better quality per bit than `medium`).
- Keyframe interval 2 s (`-g 60` at 30 fps), closed GOP, 2-3 B-frames.
- `-movflags +faststart` so web players start before the whole file loads.
- Cap peaks in VBR at ≈1.5× the target (`-maxrate`, `-bufsize`) only when a platform or player needs it; otherwise let CRF work.
- **Avoid**: hardware encoders at default quality for final masters (they spend more bits for the same quality), and GIF for anything with gradients (256 colours band, and files are large).

**Why the high bit rates.** Motion graphics look easy to compress, but the hardest content for H.264 is exactly what premium SaaS films use: slow gradients, glows, thin text and fine grain. The platform re-encodes again; a clean, high-rate upload gives its encoder the best start (MK-P9) [inferred mechanism; flaws measured in 5/8].

## 24.3 Frame rate

| Rule | Detail | Evidence |
|---|---|---|
| **EX-U3a · 30 fps CFR is the default** for SaaS motion graphics | All eight references are delivered in 30 fps containers; four are native 30 fps animations, three are 24/25 fps animations pulled up to 30, and one is a 30 fps phone capture of a comp animated on twos | §0.3 |
| **EX-U3b · Render at the delivery rate** | Never convert by duplicating frames; that is how 3/8 got their judder | [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X] |
| **EX-U3c · 24 fps when generated footage dominates** | Veo 3.1 clips are 24 fps [P]; finish the film at 24 rather than pull it down | Part 03 §18.12; Part 08 ER-24 |
| **EX-U3d · Constant frame rate only** | `r_frame_rate` = `avg_frame_rate`; the Superside masters are CFR (30 or 29.97) [S] | QC-3.3 |
| **EX-U3e · Integer 30 vs 29.97** | Use 30/1 for web; use 30000/1001 only if a broadcast or partner pipeline requires it, and then for every source | Thomson Reuters and Nissan were delivered at 29.97 [S]; the rule is [inferred] |
| **EX-X1 · 60 fps** | Only for screen-recorded UI captured at 60 that must stay smooth; doubles render cost and bit rate | [inferred; no reference] |
| **EX-S1 · On twos inside a 24/30 film** | Illustration layers only, authored deliberately | [V:126cpH]; [S:Figma] 15 fps keynote film |

Design every timing in milliseconds and convert per frame rate (Part 03 §18.12): at 24 fps, frames × 0.8; at 60 fps, × 2. A 1 f state change at 30 fps stays ≈33 ms (2 f at 60).

## 24.4 Colour

| Rule | Detail | Evidence |
|---|---|---|
| **EX-U5a · SDR BT.709, tagged** | `color_primaries=bt709`, `color_trc=bt709`, `colorspace=bt709`, `color_range=tv` on every delivery file | [N]; untagged files are interpreted differently by browsers and players [inferred] |
| **EX-U5b · Set the colour space explicitly in the engine** | Remotion v4's default colour space is `default`, not `bt709`; pass `--color-space=bt709` or `Config.setColorSpace("bt709")` | [kit] (installed renderer source) |
| **EX-U5c · 8-bit 4:2:0 for delivery** | `yuv420p`; it is what every platform plays | [N]; [kit] |
| **EX-U5d · Convert RGB → YUV with the 709 matrix** | Some converters default to the 601 matrix for some sizes, which shifts hues (greens and reds most) [inferred] | — |
| **EX-U6 · Dither before quantising to 8 bits** | 1-2% grain or noise on every gradient and glow, in the comp, before the encode | [V:1ccYWJ rule 16]; CL-U16 |
| **EX-U5e · Protect thin saturated text from 4:2:0** | Accent text at medium weight or heavier; slightly desaturate small accent text | CL-U12; [V:19NRDv] uses #E46C54 for small accent words and #F4643C for large ones (that this is chroma protection is [inferred]) |
| **EX-U5f · No pure-black gradients** | Use a hue-tinted near-black (#06004E navy, #0C0A09 warm, #161616 neutral) and dither | Part 02 CL; [V:1ccYWJ] |
| **EX-A1 · No HDR versions of SDR graphics** | SaaS motion graphics are SDR; HDR tagging of SDR content looks wrong on many displays [inferred] | — |
| **EX-X2 · 10-bit HEVC** | Removes banding at the source for platforms that accept it; verify each platform's handling [inferred] | — |

**Viewing check.** Before sign-off, view the delivery file on a Rec.709 display (gamma 2.4 dark room or 2.2 office), on a phone at medium brightness, and on a laptop browser. A gradient that bands on only one of them still bands for part of the audience [inferred].

## 24.5 Audio

This summarises Part 09 §16.11 for delivery. Part 09 is the authority.

| Destination | Integrated | True peak | LRA | Evidence |
|---|---|---|---|---|
| YouTube, X, LinkedIn, website, Product Hunt | **−14 LUFS ±1** | **≤ −1 dBTP** | 5-10 LU [inferred] | [N] YouTube normalises to −14; best-mixed refs −14.1 to −15.9 [V:19NRDv] [V:1CSXtQ] [V:15VhHR] |
| TikTok, Instagram Reels, Shorts | −14 LUFS (community norm; no official target) | ≤ −1 dBTP | 5-10 LU | [N] |
| VO-led explainer or tutorial (music under a voice) as a landing-page or help-centre embed | −16 LUFS (a compromise between the music and speech targets) [inferred]; the same film uploaded to a social or web platform stays at −14 (P09 §16.11.1) | ≤ −1 dBTP | — | [N] AES77: speech or mixed content −18, music −16 to −14 |
| Speech-dominant (webinar promo, how-to; little or no music) | −18 LUFS | ≤ −1 dBTP | — | [N] AES77 (speech or mixed content). Canonical table: P09 §16.11.1 |
| Broadcast TV | −23 LUFS (EBU R128) / −24 LKFS (ATSC A/85) | −1 / −2 dBTP | — | [inferred: broadcast standards, not in the sources] |

**Format.** AAC-LC, 48 kHz, stereo, 256-320 kb/s in the MP4 (Part 09 SD-M9). The kit currently encodes 192 kb/s [kit]; raise it to 256-320 kb/s for final delivery. Master as WAV 48 kHz / 24-bit from the mix session, plus stems. Remotion's own PCM output is 16-bit [kit], so mux the session's mixed WAV rather than re-rendering audio in the engine when the 24-bit master matters.

**Rules** (Part 09): measure loudness on the final MP4, not the session; normalise with two-pass `loudnorm` as a trim, not as the limiter; music runs to the last frame and resolves on the lockup; ≤0.5 s of digital silence at the very end; no generated audio left in; a mono fold-down keeps voice, clicks and hits.

**Captions.** A sidecar SRT or WebVTT file for every spoken word [inferred format], timed per Netflix and BBC rules: in-time on the first frame of speech (supers may lead by up to ≈2 f), at least 5/6 s per cue, at most 42 characters per line and 2 lines, at least 2 f between cues [N] [P]. Burn captions into social cut-downs, which autoplay muted; "keep 100% of the spoken copy as on-screen captions" [S:Thomson Reuters]. Remotion's `@remotion/captions` package exports SRT [P].

## 24.6 Container, metadata and thumbnails

- **Container**: MP4 for delivery, MOV for the ProRes mezzanine [inferred].
- **Fast start**: `moov` atom at the front (`-movflags +faststart`) for every web file [inferred].
- **Frame 0 is the thumbnail.** On mobile feeds frame 0 is effectively the thumbnail, so the hook text must already be on it, with no fade up from black [N]. Superside's Wistia embeds use short animated previews (the first 5 s of PointCard and Imperfect Foods), so the opening frames double as the thumbnail [S:playbook].
- **Poster image**: export a still of the hook frame at the delivery size. Note that the kit's cover is not frame 0: `make` renders `out/<name>-cover.jpg` (JPEG 92) from the frame where the first scene's hook has fully landed (6 f before its exit transition) [kit]. Frame 0 still has to carry the hook for feeds that use it as the auto-thumbnail [N]; for YouTube, a custom thumbnail made from the same frame with no extra text that the film itself lacks [inferred].
- **Metadata**: title, language and the copyright holder in the file; strip editing-software metadata that leaks project paths [inferred].
- **Soft subtitles in MP4**: `mov_text` track, in addition to (not instead of) the sidecar file [inferred].

## 24.7 Platform delivery table

Platforms change their limits often. File-size caps, maximum lengths and upload bit-rate ceilings are **not** in the research sources; check the current platform documentation before a launch [inferred]. What follows is a safe upload profile per destination plus the sourced constraints.

| Destination | Aspect and size | fps | Length guidance | Safe area for text | Loudness | Notes |
|---|---|---|---|---|---|---|
| **YouTube (16:9)** | 1920×1080 (3840×2160 for flagships) | 30 (24 if AI-led) | Launch spots 39-51 s, median ≈44 s [E]; explainers 57-83 s [S:playbook] | 96 px left/right, 54 px top/bottom (EBU R95 5%) [N] | −14 LUFS, normalised by YouTube [N] | Frame 0 = hook; custom thumbnail from the hook frame |
| **X / Twitter** | 1920×1080, 16:9 | 30 | All 20 ElevenLabs X launch videos checked are 16:9 [E] | As 16:9 | −14 LUFS | Muted autoplay: burn in captions or make the type carry the message |
| **LinkedIn** | 1920×1080 (16:9) or 1080×1350 (4:5) | 30 | 30-45 s cut for LinkedIn [S:playbook] | As 16:9; 4:5 text inside x 88-992 [N] | −14 LUFS | Muted autoplay; captions |
| **Instagram Reels / Facebook Reels** | 1080×1920 | 30 | 15-35 s (the kit's reel norm [S:playbook]) | Top 14% (269 px), bottom 35% (672 px), sides 6% (65 px) [N]; strict cross-platform text area x 120-840, y 270-1210 [N] | −14 LUFS (community) | Shown in the profile grid cropped to 3:4 (240 px off top and bottom) [N]; in the feed possibly cropped to 4:5 [N, unverified] |
| **Instagram / Facebook feed** | 1080×1350 (4:5) or 1080×1080 (1:1) | 30 | 15-30 s [inferred; PointCard's feed ad is 18 s, Imperfect Foods' 30 s [S]] | 4:5 text inside x 88-992; 1:1 grid crop leaves x 135-945 [N] | −14 LUFS | — |
| **TikTok In-Feed** | 1080×1920 | 30 | 21-34 s is the stated sweet spot for In-Feed ads [N] | Top 240-254, bottom 660-707, left 120, right 120-242 px (sources conflict) [N] | −14 LUFS (community) | Business accounts: commercial music library only [N] |
| **YouTube Shorts** | 1080×1920 | 30 | Keep ≤60 s (the kit's checker warns past 60 s for vertical [S:playbook]); check the platform's current maximum | Top 241, bottom 381, left 60, right 201 px [N, unverified] | −14 LUFS | Hook metric is "viewed vs swiped away" [N] |
| **Website hero (muted autoplay loop)** | 1920×1080 or 1280×720 | 30 | 10-20 s loop [inferred] | As 16:9 | No audio track | Seamless loop point; poster image = first frame; ≤3-5 MB [inferred] |
| **Landing-page player (Wistia, etc.)** | 1920×1080 | 30 or 29.97 | 45-90 s explainer [S:playbook] | As 16:9 | −14 LUFS (−16 if VO-led; P09 §16.11.1) | Click-for-sound autoplay previews: PointCard and Imperfect Foods loop their first 5 s, Superspace loops its reveal [S:playbook] |
| **Product Hunt / launch post** | 16:9 hero film plus 9:16, 1:1 or 4:5 cut-downs | 30 | Hero 30-60 s; feed teasers 30 s [W:motion-so] | Per format | −14 LUFS | One hero film for site, Product Hunt and X; shorter social cuts [W:motion-so] |

## 24.8 Versions and cut-downs

**EX-U10 · Re-lay out every format; never crop the master.** [U]
- The vertical version is an adaptation of the 16:9 master, not a native vertical film [E: ElevenLabs posts are all 16:9 and vertical cuts exist only as Shorts (sourced); "adaptation" is the brief's inference].
- Solar's recap strips re-lay their labels for the narrow strip instead of cropping the original shot [V:1Hcg3X t=32.87s].
- Rules:
  - keep every duration identical in milliseconds across formats; scale travel distances as % of the frame in the direction of travel (Part 03 §18.11);
  - re-place every string inside the format's safe area (§24.7) and re-check its size floor (≥52 px body at 9:16 [N]);
  - keep strings, colours and anchors identical across formats (QC-1.1);
  - re-edit the music on bar lines for each length (Part 09 SD-AI2), never fade it out early.
- Why: cropping a 16:9 layout to 9:16 removes 68% of the width; every element that was composed for the wide frame lands in the wrong place or outside the safe zone [inferred arithmetic].

**Cut-down lengths.** Use the Part 08 §17.4 timing plans for 5, 10, 15, 30, 45 and 60 s and the 90 s films. A 20-30 s reel cut of an explainer keeps hook, reveal, triad and CTA [S:playbook].

**Variants.** For A/B tests, change scene 1 only; for colour tests, change only the accent [S:playbook: PointCard tested orange against yellow]. Name each variant explicitly (§24.10).

**Localisation.** One language per version (MK-10). For Devanagari, load the correct font subset, leading ≥1.25 for headlines and ≥1.5 for body, and animate by word or orthographic syllable, never by code point [N]. Captions per language.

## 24.9 Website loops and embedded animation

- **Loop point.** The last frame must lead into the first without a jump: match position, colour and motion direction, or end on the same still the loop starts on [inferred].
- **No audio track** in autoplay loops (smaller file, no policy blocks) [inferred].
- **Size budget.** Keep a 10-15 s hero loop around 3-5 MB at 1080p, using CRF 20-23 and a poster frame; offer a full-quality version on click [inferred].
- **Micro-animations inside the product page** (icons, toggles, small UI demos) are better as Lottie JSON or a Rive state machine than as video: vector, sharp at any size, tiny [V:1ccYWJ] (a Lottie icon product); [N] (LottieFiles, Rive).

## 24.10 Deliverables package and naming

**Naming convention** [inferred, consistent with the delivery names in [S:Thomson Reuters] "16x9 Cutdown" and "FinalMix"]:

```
BRAND_PRODUCT_TITLE_<aspect>_<width>x<height>_<fps>p_<lang>_<variant>_v<NN>_<YYYYMMDD>.<ext>
e.g. ACME_FLOW_LAUNCH_16x9_1920x1080_30p_en_A_v07_20261008.mp4
     ACME_FLOW_LAUNCH_9x16_1080x1920_30p_en_A_v07_20261008.mp4
     ACME_FLOW_LAUNCH_MASTER_16x9_3840x2160_30p_ProResHQ_v07_20261008.mov
     ACME_FLOW_LAUNCH_FinalMix_48k24b_-14LUFS_v07.wav
```

**The package** (one folder per version):
1. The mezzanine master (ProRes 422 HQ or PNG sequence) and the WAV master.
2. Every delivery encode, each with its QC record (§22.10).
3. Stems: music, voice/product, SFX, ambience (Part 09 SD-M9).
4. Captions per language (SRT and WebVTT).
5. Poster and thumbnail stills.
6. The project, the spec or storyboard, the string table, the data sheet, the continuity bible and the cue sheet.
7. The generation log for every generated shot (AA-G14).
8. A rights sheet: music licence and destination scope, SFX sources, fonts, logos, stock, footage releases, voice licences, engine licence.

## 24.11 Export recipes

Flags below were checked against the Remotion renderer installed in this repository (4.0.534) [kit]. The ffmpeg lines are standard usage [inferred: verify on your build].

**1. Remotion: high-quality master (ProRes, PNG frames, BT.709)**
```
npx remotion render src/index.ts Video out/ACME_FLOW_LAUNCH_MASTER_16x9_1920x1080_30p_ProResHQ_v07.mov \
  --codec=prores --prores-profile=hq --image-format=png --color-space=bt709 --audio-codec=pcm-16
```

**2. Remotion: direct web delivery (when no mezzanine step is used)**
```
npx remotion render src/index.ts Video out/ACME_FLOW_LAUNCH_16x9_1920x1080_30p_en_A_v07.mp4 \
  --codec=h264 --crf=16 --x264-preset=slow --pixel-format=yuv420p --color-space=bt709 \
  --image-format=jpeg --jpeg-quality=95 --audio-codec=aac --audio-bitrate=320k
```
Use `--image-format=png` instead of JPEG for gradient-heavy films.

**3. ffmpeg: H.264 web delivery from the ProRes master, with the mixed WAV**
```
ffmpeg -i master.mov -i FinalMix_48k24b.wav -map 0:v:0 -map 1:a:0 \
  -c:v libx264 -preset slow -crf 16 -profile:v high -level 4.2 -pix_fmt yuv420p \
  -vf "scale=out_color_matrix=bt709:out_range=tv" \
  -color_primaries bt709 -color_trc bt709 -colorspace bt709 -color_range tv \
  -g 60 -bf 2 -movflags +faststart \
  -c:a aac -b:a 320k -ar 48000 -ac 2 -shortest \
  ACME_FLOW_LAUNCH_16x9_1920x1080_30p_en_A_v07.mp4
```

**4. Two-pass loudness normalisation of the mix (trim, not limiter)**
```
ffmpeg -i mix.wav -af loudnorm=I=-14:TP=-1:LRA=11:print_format=json -f null -
# then feed the measured values back:
ffmpeg -i mix.wav -af loudnorm=I=-14:TP=-1:LRA=11:measured_I=<..>:measured_TP=<..>:measured_LRA=<..>:measured_thresh=<..>:offset=<..>:linear=true -ar 48000 mix_-14.wav
```
(Part 09 §16.11.4.)

**5. Soft subtitles into the MP4 (in addition to the sidecar)**
```
ffmpeg -i film.mp4 -i captions_en.srt -map 0 -map 1 -c copy -c:s mov_text -metadata:s:s:0 language=eng film_cc.mp4
```

**6. Poster frame from the exact hook frame**
```
ffmpeg -i film.mp4 -vf "select='eq(n\,0)'" -frames:v 1 -vsync 0 poster.png
```

Then run Gate 3 (§22.4, commands in §22.6) on every output.

## 24.12 Universal, style-specific, experimental, avoid, and especially good for SaaS (export)

**Universal (EX-U)**
- **EX-U1 · Master first, one lossy generation before the platform.** [U (standard)]
- **EX-U2 · Resolution ≥1920×1080 (16:9) or 1080×1920 (9:16); 3840×2160 for flagship launches.** [U (standard); 8/8 sub-HD as received; [S] [E] masters]
- **EX-U3 · Native, constant frame rate; 30 fps default, 24 when generated footage dominates.** [U (standard); 3/8 judder]
- **EX-U4 · H.264 High at CRF 16-18, ≥12 Mb/s at 1080p30 for UI and gradient films, never below 8.** [U (standard); 5/8 artefacts; [V:1CSXtQ §16]. The 8 Mb/s floor is a safety margin [inferred]: a flat-colour agency ad was uploaded at ≈1.2 Mb/s [S:PointCard]; see §24.2.]
- **EX-U5 · BT.709 SDR, tagged; `yuv420p`; frames as PNG or JPEG ≥95.** [U (standard); [N]]
- **EX-U6 · Dither every gradient (1-2%).** [U; 4/8 band]
- **EX-U7 · Frame 0 carries the hook; the poster is the hook frame.** [U; [N] [S]]
- **EX-U8 · −14 LUFS ±1 integrated, ≤ −1 dBTP, LRA 5-10 LU, measured on the delivered file.** [U (standard); 3/8 off target]
- **EX-U9 · Captions for every spoken word; burned in for muted social cuts.** [U (standard); [N] [S]]
- **EX-U10 · Re-lay out cut-downs; never crop.** [U]
- **EX-U11 · Test-upload and re-check.** [U (standard)]
- **EX-U12 · Name, package and log every deliverable.** [inferred]

**Style-specific (EX-S)**
- **Editorial and grain styles**: raise the bit rate to the top of the band (grain is expensive to encode) and check that the platform's encode does not smear it into blotches [inferred].
- **Dark neon and dark gradient styles**: the highest banding risk; tinted near-black plus dither plus ≥16 Mb/s at 1080p [V:1ccYWJ] [inferred rate].
- **On-twos styles**: export at 24 or 30 fps with the stepping authored in the comp; never with `--every-nth-frame` [V:126cpH] [kit flag exists].
- **AI-footage-led films**: deliver at 24 fps [P]; upscale plates before compositing (AA-G12).

**Experimental (EX-X)**
- **EX-X1 · 60 fps** for screen-recorded UI captured at 60 [inferred; no reference].
- **EX-X2 · 10-bit HEVC** where a platform accepts it, to remove banding at the source [inferred].
- **EX-X3 · Uploading a 4K file for a 1080p film to YouTube** is a practitioner belief for getting a higher-quality stream; unverified in the sources [inferred].

**Avoid (EX-A)**

| ID | Avoid | Evidence | Instead |
|---|---|---|---|
| EX-A1 | HDR-tagged versions of SDR graphics | [inferred] | SDR BT.709 |
| EX-A2 | Frame-rate conversion by duplicating frames | [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X] | EX-U3 |
| EX-A3 | Video below 8 Mb/s at 1080p (below ≈2 Mb/s at 720p) for gradient or UI films | [V:15VhHR] ≈652 kb/s; [V:1CSXtQ] ≈175 kb/s | EX-U4 |
| EX-A4 | Engine defaults left in place (JPEG 80 frames; colour space `default`) | [N]; [kit] | EX-U5 |
| EX-A5 | Over-limited masters (−7.9 LUFS, +1.6 dBTP) or quiet masters (−16.6 LUFS) for social | [V:1i2L14] [V:1ccYWJ] | EX-U8 |
| EX-A6 | Delivering inside a wrapper or player frame | [V:1i2L14] | Full-frame film |
| EX-A7 | GIF for anything with gradients | [inferred] | Muted MP4 or Lottie |
| EX-A8 | Re-encoding a delivery file to make another delivery file | [inferred] | Always encode from the master |
| EX-A9 | Cropping the 16:9 master into 9:16 | [E]; [V:1Hcg3X] | EX-U10 |

**Especially good for SaaS (EX-SaaS)**
- **EX-SaaS1 · Bit rate for the UI.** SaaS films carry small UI text; protect it with the top of the bit-rate band and a 1:1 crop check of the smallest read string (QC-3.8). HubSpot's ≈175 kb/s encode macro-blocks exactly its UI text [V:1CSXtQ].
- **EX-SaaS2 · A muted-first social package.** Burned-in captions, frame-0 hook, safe-area-checked vertical and 4:5 cuts: B2B films are mostly met in muted feeds [N] [S:playbook].
- **EX-SaaS3 · Lottie for product-page micro-animations.** Sharper and lighter than video for UI-scale motion [V:1ccYWJ] [N].

## 24.13 Do / Don't (export)

| Do | Don't | Why |
|---|---|---|
| Render a ProRes or PNG master and encode each delivery once from it | Export an MP4, then re-export that MP4 for each platform | Each lossy generation adds banding and blocking |
| Deliver 1080p at 12-20 Mb/s for UI films | Ship 720p at under 1 Mb/s | Small UI text and gradients break first [V:1CSXtQ] [V:15VhHR] |
| Pass `--color-space=bt709` and tag the file | Trust the engine default | Remotion v4's default is not BT.709 [kit] |
| Add 1-2% dither before the encode | Ship a smooth navy gradient and accept the bands | 4/8 references band [V:19NRDv] [V:1ccYWJ] |
| Finish an AI-footage film at 24 fps | Pull 24 fps clips up to 30 by duplicating frames | Judder every 5th frame [V:1Hcg3X] |
| Measure −14 LUFS on the final MP4 | Limit the mix to sound "loud" | Platforms turn it down and the overs distort [V:1i2L14] |
| Re-lay out the 9:16 version with its own safe area | Crop the 16:9 frame | The meaning falls outside the safe zone |
| Make frame 0 the hook and the poster | Fade up from black | Frame 0 is the thumbnail [N] |
| Test-upload privately and check the platform's version | Assume the upload looks like the master | The viewer sees the platform's encode |

## 24.14 Where the references overrule, or confirm, generic advice (export)

1. **"Platforms re-encode anyway, so the upload quality does not matter."** (This is also the reasoning in the kit's CRF comment [kit].) The references with the lowest bit rates show the most visible artefacts [V:15VhHR] [V:1CSXtQ]. **Standard wins, references confirm**: upload high quality so the platform's encode starts clean.
2. **"Deliver at 60 fps for smoothness."** No reference does; all are 30 fps containers. **References win**: 30 fps native is the default; 60 only by exception.
3. **"Add grain to every export for a filmic finish."** 6/8 have no grain; only dither is universal. **References win** on grain; **standard wins** on dither.
4. **"−14 LUFS for everything."** It is the right target for social and web, and the best-mixed references sit within 2 dB of it; AES77 puts speech or mixed content at −18 and music at −16 to −14 [N]; −16 for VO-led landing-page embeds is this system's compromise [inferred]; VO-led social and web uploads stay at −14 (P09 §16.11.1). **Standard wins, references confirm.**
5. **"Make vertical by reframing the master."** No reference ships both a 16:9 and a 9:16 version, so there is no direct evidence. [E] shows ElevenLabs posts 16:9 and has vertical only as Shorts; that those Shorts are re-laid-out adaptations is the brief's inference. The closest measured evidence is Solar's recap strips, which re-lay their labels for the narrow strip instead of cropping [V:1Hcg3X t=32.53-34.87s]. **Standard wins [inferred]**: re-layout, never crop.

---

## Appendix A. Where the references overrule generic advice (all four sections)

| # | Generic advice | What the references do | Verdict | Section |
|---|---|---|---|---|
| 1 | Add DOF and parallax everywhere for a cinematic look | Depth for one hero beat, or depth from focus or from shadows only | References win | §21.9 |
| 2 | Add particles, flares, light leaks | 0/8 flares or plug-in transitions; particles in 4/8, once each, made of the product or the subject | References win | §21.9 |
| 3 | Add film grain for an organic look | 6/8 no grain (Solar grain on every frame; NOSTRA on props only); dither everywhere | References win (grain); standard wins (dither) | §21.9, §24.14 |
| 4 | Use spring physics for natural motion | 0% overshoot on type and UI in 7/8 | References win | §21.9 |
| 5 | Always use motion blur | 2/8 never blur and read clean at their speeds; 1/8 never blurs and strobes; 1/8 blurs everything; 2/8 blur whips only | Threshold rule (blur above 5% W/f) | §21.9 |
| 6 | Keep the camera moving | Single-axis push or drift with a target; never wandering | References win | §21.9 |
| 7 | Generate the product with AI video | 0/8 generate product, UI or type | References win, [P] [N] agree | §21.9 |
| 8 | QC rhythm with a shot detector and sync with an onset list | Detectors and onset lists were wrong in 5 teardowns | References' verification wins | §22.7 |
| 9 | Platforms re-encode, so upload quality does not matter | The lowest-bit-rate references look worst | Standard wins, references confirm | §24.14 |
| 10 | 60 fps for smoothness | 30 fps native in all | References win | §24.14 |
| 11 | Reframe the master for vertical | No reference ships both formats; Solar re-lays labels for narrow strips | Standard wins [inferred] | §24.8 |

## Appendix B. Evidence strength and gaps (read before relying on a number)

**Strong (measured in the references, often in several):**
- The delivery census: resolutions, frame cadences (duplicate-frame patterns found by frame-difference scans), stated bit rates, loudness, banding and blocking locations (§0.3).
- Every measured flaw in §23 (each verified in the teardowns' adversarial passes).
- The anti-AI habits of the references: no invented morphs, no uncaused floats, no plug-in transitions, composited type and UI, restraint with particles and depth.
- The QC pitfalls in §22.7, which come straight from the verification passes.

**Medium (standards and documented tool behaviour):**
- Loudness targets, WCAG flash and contrast limits, caption timing, safe zones [N]; Veo and Flow clip lengths, frame rate, negative prompts and the subtitle problem [P]; Remotion defaults and flags [N] [kit].

**Weak or inferred (verify before a launch):**
- **Generative-video failure modes.** Only 1/8 references contains apparently generated imagery (kivi's plates), and it was not generated under observation. Every generative *cause* in §21.3 and most AA-G rules are inferred from [P] and general knowledge. No Veo or Flow output was measured. *Confidence: medium-low for causes, medium for preventions (which are anchored in what the references do instead).*
- **Numeric thresholds invented for QC** (ΔE00 ≤2 between shots, shadow vectors within ±15°, ≤5-level unmotivated luma shifts, ≤3-5 MB hero loops). They are reasonable engineering thresholds, not measured from the references. *Confidence: medium; tune on real projects.*
- **Bit rates above the sourced floor** (12-20 Mb/s at 1080p, 4K and HEVC rates, mezzanine rates). The sources give "≥8-12 Mb/s at 1080p for UI-heavy films" [V:1CSXtQ] and "never under ≈2 Mb/s for 720p gradients" [V:15VhHR]; the higher bands are inferred. PointCard's ≈1.2 Mb/s 1080p upload [S:PointCard] shows that flat films are shipped far below this band, so the band is a margin for UI, gradients and grain, not a norm. *Confidence: medium.*
- **Platform file-size caps, maximum lengths and upload ceilings** are not in the sources and change often. *Check current platform documentation.*
- **Whether the references' masters were sub-HD** or only the received files are. The census describes the files in the user's folder. *Confidence: unknown.*
- **ffmpeg command syntax** is standard usage, not tested here on the user's ffmpeg build. Remotion flags were checked against the installed 4.0.534 renderer.

---

## Audit (adversarial pass, 2026-10-08)

Every numeric claim in §0 and §21-§24 was checked against the eight per-video teardowns (including their verification sections), the text briefs ([N], [P], [E], [S], [W]) and this repository's motion-kit config and installed Remotion 4.0.534 renderer. 31 fixes; one coverage addition.

**Corrected against the per-video analyses**
1. HubSpot lockup reprise: the "within 1 px" claim used only the OpenAI half (328 vs 327 px); the HubSpot half moves 696 → 700 px @1280 w. Fixed in defaults #6, §21.0 and AA-03 (±1-4 px, ≈±6 px @1080p).
2. NOSTRA "±5% across 5 setups" was a prescription (its rule 7), not a measurement. Reworded in AA-21.
3. Particle census: 2/8 → 4/8 (Solar's ≈60 electrons and NOSTRA's particle comet were missed). Fixed in defaults #10, AA-12, §21.9 #2, AA-S (minimal premium wrongly said "no particles" while citing HubSpot, which has one particle event), Appendix A #2.
4. Grain: "two Editorial films" → Solar (every frame) plus NOSTRA (grain gradient on props only). §21.9 #3, Appendix A #3.
5. Motion blur census rewritten per film (kivi and Wix none and clean; Lottieicon none and strobing at 10% and 22-27% W/f; Bumper everything; NOSTRA and Solar whips only). §21.9 #5, Appendix A #5; the 5% W/f threshold tagged [inferred]; MK-17 fix changed from "peak ≤8-10% W/f" to "≤5% W/f unblurred", because the teardown also flags the 10% move as strobing.
6. Ambient drift speeds: "0.1-0.5% of frame per frame" → ≈0.03-0.5% with per-film sources (Bumper's 1-3%/s is below 0.1%/f); push range given as kivi's 1.07-1.29×.
7. Digital silence: "a −40 to −45 dB floor is kept" contradicted HubSpot's designed gap to −61 dB (10.6-10.95 s) and kivi's −41 to −61 dB (6.65-6.80 s). §23.4 row rewritten.
8. QC-3.13 allowed 0.3 s of end silence while QC-2.9 and §24.5 allow 0.5 s. Aligned to ≤0.5 s, with sources.
9. §22.7 #7: "mono 50 ms RMS reads 2-4 dB lower than other meters" has no source in the HubSpot teardown. Replaced with two sourced level discrepancies (HubSpot's "−5.4 dB whoosh" re-measured as ≈3 dB; NOSTRA's unreproduced −8.3 dBFS RMS).
10. MK-29: reconciled with the Wix teardown, whose flaw list says 7-11 f thermal holds can read as a glitch while its avoid list puts the risk above ≈15 f.
11. MK-01: noted that HubSpot (hook cap 3.6% H) fails only its teardown's ≈5% H phone-hook floor and passes this part's 3% H floor (6/8 strict).
12. §23.5 stillness: "holds over ≈5 f" → Solar's actual threshold, ≈0.3 s (9 f).
13. MK-27: keystroke level now cites HubSpot's measured ticks (≈20-25 dB under the music).
14. Chowdeck's "stepped UI reads as lag" flagged as inferred in its own teardown.
15. EX-U5e: Bumper's two accent hexes are measured; reading them as chroma protection is now tagged [inferred].

**Corrected against the text sources and the kit**
16. AES77 (per [N]) puts speech *or mixed content* at −18 LUFS and music at −16 to −14. The table had labelled −16 as AES77 "mixed content". Fixed in §24.5, §22.8 QC-S and §24.14 #4; −16 for VO-led films is now tagged as this part's compromise.
17. Remotion licence "free up to 3 people" is not in the sources. Tagged [inferred] in G-04.
18. "Platforms re-encode [N]": [N] sources normalisation only. Re-encoding is now sourced to Wistia's PointCard rendition (≈1209 → ≈401 kb/s at 1080p) [S:PointCard] in QC-3.17, QC-A6 and §24.1.
19. Added counter-evidence to the bit-rate floor (PointCard was uploaded at ≈1.2 Mb/s) in §24.2, EX-U4 and Appendix B; "never below 8 Mb/s" is now explicitly a safety margin for UI and gradient films.
20. The kit's cover is not frame 0: `make` renders `out/<name>-cover.jpg` at JPEG 92 from the frame where the hook has landed. §24.6 corrected.
21. §0.3 census: added Snowflake Luminate (1920×1080, 23.976 fps) and Nissan's 29.97 fps to the Wistia master list.
22. Vertical re-layout: no reference ships both 16:9 and 9:16, and [E]'s "adaptation" is that brief's own inference. §24.8, §24.14 #5, MK-P12 and Appendix A #11 changed from "References win" to "Standard wins [inferred]", with Solar's re-laid recap labels as the closest evidence.
23. Instagram/Facebook feed length (15-30 s) tagged [inferred], with the two Superside feed ads as context.
24-31. Pulldown visibility threshold (≤0.2% W/f) tagged [inferred] in AA-19; blur-threshold source note added to defaults #14; the 4/8 particle list and blur list now carry timecodes; the HubSpot bit rate (≈175.5 kb/s) was checked against its verification table and kept.

**Coverage added**
- §21.4b: a premium-vs-amateur table for the 15 Phase-10 problems, with when it bites, the measured premium habit, the amateur failure and the timing, each cited.

**Checked and left as written**: every loudness, resolution, cadence and bit-rate figure in §0.3; all MK-01 to MK-34 timecodes; Chowdeck swap, fall and status timings; Bumper detector and onset-list errors; Lottieicon read-time, music-end and strobe figures; NOSTRA loudness (+1.6 dBTP, LRA 1.2 LU), breather and glitch-build figures; Solar flash, payoff and wobble-loop timings; [N] spring, safe-zone, caption and render-default numbers; [P] Veo and Flow facts; Remotion flag names and defaults (`--x264-preset`, `--audio-bitrate`, `--prores-profile=hq`, colour space `default` in v4).

**Known gaps that remain**
- Generative-video failure causes are still [inferred]: only kivi's plates look generated, and no Veo or Flow output was measured. The AA-G rules are anchored in [P] facts and in what the references do instead, not in measured generations.
- QC thresholds without reference measurements: ΔE00 ≤2, shadow vectors ±15°, the ≤5-level luma-shift rule, the 5% W/f blur threshold, the ≤0.2% W/f pulldown-invisibility band and the ±1 px anchor tolerance (only Wix's bar is measured as identical).
- Bit rates above the sourced floor (12-20 Mb/s, 4K, HEVC and mezzanine rates), the website-loop size budget and platform file-size and length caps remain unsourced.
- No reference ships multiple aspect ratios, so all cut-down and re-layout rules are standards-based.
- ffmpeg command syntax was not executed here; Remotion flags were checked against the installed renderer.
- Cross-referenced rule IDs from Parts 01-10 (TY-, UI-, SD-, ER- and others) were not re-audited in this pass.

