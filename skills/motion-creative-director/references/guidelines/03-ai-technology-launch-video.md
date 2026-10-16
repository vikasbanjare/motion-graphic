# Specialised Guideline 03: AI / Technology Launch Video

A format guide for the film that announces an AI model, an AI agent, an AI feature inside an existing product, a voice or audio model, an API, or a piece of developer or infrastructure technology. It applies the Master SaaS Motion Design System (Parts 01-11, `research/master/`) to this one format. Guideline 01 (SaaS Product Launch Film) covers the general launch film; this guide adds what is specific to AI and technology: how to show a model *working* (input, thinking, output), how to show evidence (latency, evals, citations) honestly, how to show trust (data, controls), and where the abstract "intelligence" visuals (orb, particles, gradients) are allowed. Every number traces to a master section or a reference teardown (`research/videos/`). Where this guide adds a rule that no source measures, it is tagged **[inferred]**.

**Reference key** (same tags as the master):

| Tag | Reference | Runtime / format | Why it matters for AI / tech launches |
|---|---|---|---|
| [V:1-6l8S] | kivi, voice-AI dictation launch ("Everything. Powered by Your Voice.") | 77.8 s, 16:9, ≈127 BPM | Say → See loop ×4; human-pace vs machine-pace streaming; empty-hold-then-cascade; in-world voice as the only VO; AI-looking plates that do not match (flaw) |
| [V:1CSXtQ] | OpenAI × HubSpot ChatGPT connector | 30.0 s, 16:9, ≈86 BPM | Prompt-native story; typed headline becomes UI; one 3D data-transfer beat with particles made of the UI's colours; drop at 43% |
| [V:15VhHR] | Wix AI site builder ("Build a website you ♥ love") | 53.9 s, 16:9, 112 BPM | The reserved "AI colour" family; generation shown as a develop, not a progress bar; suck-out on the send click |
| [V:19NRDv] | Bumper PRO payments launch | 67.2 s, 16:9, 100 BPM | Stepped orbit; implosion climax with ≤12 sparks; status colours as narrative |
| [V:1ccYWJ] | Lottieicon asset-library launch | 44.3 s, 16:9, 112 BPM | Dark neon tech look; zoom-through hook; glow as anticipation; weak ending (flaw) |
| [V:1Hcg3X] | Solar explainer | 35.8 s, 16:9 | Explaining an invisible mechanism; particles with a direction and an end state |
| [V:126cpH] | Chowdeck app ad | 18 s, 9:16 | The only vertical reference; state switches instead of generated morphs |
| [V:1i2L14] | NOSTRA studio promo | 35.1 s, 16:9 | Typing-indicator dots; over-loud mix (flaw) |
| [E] | ElevenLabs style brief (brand page + open-source orb, waveform and shimmer code) | text + code | The calm editorial AI look (ST-A3); orb maths; shimmer status line. Motion timings are inferred, not measured |
| [S:Airtable] | Airtable AI launch (YouTube chapters measured) | 55-60 s, VO-led | Five-chapter AI launch template T10 |

Master parts are cited as **P01-P11** (P06 UI-E17 = Part 06, AI-generation states). Other tags: [N] platform and standards data, [P] model-provider docs, [W] web text sources, [kit] the motion-kit source.

---

## 1. Purpose and audience

**What the film does.** It names the model or product, shows it doing one real job end to end (input → thinking → output), proves the output is good with one or two pieces of evidence, says why it is safe to adopt, and ends on a lockup with an availability line and a verb CTA. The emotional target is *calm competence*: the AI is shown as fast, precise and controllable, never as magic or as a threat (P09 F14 "a premium SaaS film shows AI as calm and competent"; P10 3E-10 "a near-still living object reads as calm intelligence").

| Audience | Where they meet it | What they need in the first 10 s | Implication |
|---|---|---|---|
| Builders and developers (API, model, infra launches) | X/Twitter, YouTube, the launch blog post, dev-day keynote | What the model does and how fast, in one example | Real input and real output by 8 s; a number (latency, eval) in the evidence stage; a code or API beat if it is an API |
| Buyers and team leads (AI feature, agent) | LinkedIn, website hero, Product Hunt, sales follow-up | The job it removes and whether they can trust it | One end-to-end task; a trust beat (data use, controls, citations) |
| Existing users | In-app modal, changelog, email | What is new and where the button is | Lead with the new UI state; 20-30 s; no brand preamble |
| Press, investors, the team | Launch post, embeds in coverage | Category, ambition, polish | One hero moment; a version name that is spelled the same everywhere |

**Job of the format:** awareness → consideration, plus *trial* for self-serve AI ("Try it", "Get API access"). Most AI launches live in muted feeds first, so the story must work with sound off (P11 QC-SaaS3; P10 §11.1 "sound-off feed placement").

---

## 2. When to choose this format (and when not)

Choose an **AI / Technology Launch Video** when all of these are true:

1. There is a **real, repeatable run** of the AI you can capture: a prompt and the output the shipped model actually returned (P06 UI-R; P11 MK-P10 "letting an LLM invent values").
2. The value is visible as a transformation: input → output, question → answer, request → finished work.
3. There is at least one fact you can sign on a claims sheet (latency, eval score, beta result, number of sources, languages) (P11 QC-SaaS2).

Pick something else when:

| Situation | Better format | Why |
|---|---|---|
| No working build to capture yet | Teaser / brand sting, 5-15 s (PL-05, PL-10) with an orb or wordmark | A launch film with faked output breaks trust permanently; AI output must be real (P06 UI-R) |
| You must explain *how* it works (RAG pipeline, on-device inference, safety system) | Mechanism explainer, template T6 / style ST-F1 (P01 §2.4, P10 §11.1) | The mechanism needs one hero per frame and 45-90 s |
| The feature is a small update to a known product | UI Product Demo (Guideline 02) | No category to introduce; show the button |
| Proof comes from customers, not the model | Testimonial spine T11 | Borrowed credibility |
| The product is a whole SaaS platform where AI is one part | SaaS Product Launch Film (Guideline 01) | AI is a proof block, not the story |

**Sub-type → template and style** (P01 §2.4, P10 §11.1):

| AI / tech sub-type | Story template | Style card | Demo grammar |
|---|---|---|---|
| AI feature inside an existing tool (copilot, connector, LLM feature) | **T4 Prompt-native** [V:1CSXtQ] | ST-A2 (white, flat, one 3D beat) | Typed prompt → UI builds around it → send → answer |
| AI agent (does multi-step work) | **Ask → Plan → Act → Deliver** loop, a synthesis of T1 + T4 [inferred] | ST-A2 or ST-A3 | Prompt → plan rows → step states → finished artefact |
| Voice, speech, audio model | **T1 Say → See** [V:1-6l8S] | ST-A1 (Airy Aurora) or ST-A3 | In-world voice → live waveform → streamed text or audio output |
| Model / API launch | T4 + an evidence stage; **T10 Five-chapter** if VO-led [S:Airtable] | ST-A3 (Calm editorial AI) [E] | Prompt → output; code snippet; stat and bars |
| Generative media (image, video, site builder) | **T5 Brand-bookended montage** [V:15VhHR] | ST-C1 | Prompt pill locked; outputs swap behind it (slot machine) |
| Dev tools, infra, chips, hardware-adjacent | T8 Asset / volume reel or a single-reveal cinematic | ST-E2 (dark neon) or ST-B (cinematic) | Product-as-motion; 3D renders for hardware |

Rule TS1 still applies: one template for the whole film (8/8 references).

---

## 3. Platforms, aspect ratios and length

### 3.1 Deliverables matrix

| Placement | Aspect | Frame | Length | Timing plan (P08 §17.4) | Notes |
|---|---|---|---|---|---|
| Launch post on X, YouTube, blog embed, website hero | 16:9 | 1920×1080 (3840×2160 for a flagship) | **45 s master** (30-60 s) | PL-45 windows, calm pacing | Autoplays muted in feeds and on websites |
| AI feature / integration spot, co-brand | 16:9 | 1920×1080 | **30 s** | **PL-30** (prompt-native, drop ≈42%) | The HubSpot structure [V:1CSXtQ] |
| VO-led model or platform launch | 16:9 | 1920×1080 | 55-60 s | T10 chapters [S:Airtable] or PL-60 | 150-170 wpm narration, 65-75 words per 30 s |
| LinkedIn / X feed square or portrait | 1:1, 4:5 | 1080×1080, 1080×1350 | 20-30 s | PL-30 | Re-layout, not a crop (P02 CO-U18) |
| Reels, Shorts, TikTok | 9:16 | 1080×1920 | 15-30 s | PL-15 | One task end to end (P01 TS3). Text-safe x 120-840, y 270-1210 (P02 §4.7) |
| Docs page, API page, changelog loop | 16:9 or 4:3 | 1600×1200 or 1920×1080 | 8-20 s, seamless loop | No hook, no music | One prompt → output cycle; first and last frames identical |
| Bumper / pre-roll | 16:9 | 1920×1080 | 6 s | PL-05 | Orb or wordmark + one claim + URL |
| Keynote / dev-day opener | 16:9 | 3840×2160 | 60-90 s | PL-90L | Can be slower; still obey the hold and type rules |

Flagship "cinematic" AI films run 2.5-4 min (Eleven v3 234 s, Eleven Music 254 s) [E]; treat them as tone references only (P10 ST-B).

### 3.2 Technical delivery (P11 §0.5, P09 §16.11)

| Spec | Value |
|---|---|
| Frame rate | **30 fps native.** If generated footage dominates, finish at 24 fps. Never pad 24/25 → 30 by duplicating frames (judder measured in [V:15VhHR], [V:1CSXtQ], [V:1Hcg3X]) |
| Codec | H.264, yuv420p, BT.709 tagged, **CRF 16-18**, **12-20 Mb/s** at 1080p30. UI text, code and gradients are what low bit rates destroy first ([V:1CSXtQ] ran at ≈176 kb/s at 720p and macro-blocked its UI) |
| Dither | 1-2% noise on every gradient, orb and aurora before the 8-bit encode (banding in 4/8 references; kivi's aurora bands) |
| Audio | **−14 LUFS ±1**, **≤ −1 dBTP**; −16 LUFS for VO-led landing-page embeds (P09 §16.11.1). AAC-LC 48 kHz 256-320 kb/s |
| Captions | Burned in for social; SRT for YouTube and the website. In-world voice is captioned by the on-screen transcript itself |
| Thumbnail | Frame 0 carries the hook text (P01 H1) |
| AI disclosure | Any generated footage carries an "AI-generated" tag (kit `clip.generated: true`) and the platform's synthetic-media setting where required [inferred; check current platform policy] |

### 3.3 Length rules

- **AI feature: 30 s.** One use case end to end (P01 TS3; [V:1CSXtQ]).
- **Model, agent or API launch: 45 s.** ElevenLabs-style short spots run 39-51 s, median ≈44 s [E]; this guide's master is 45 s.
- **VO-led or multi-capability: 55-60 s**, with the demo loop run ≥3 times (P01 TS2).
- Proof blocks shorten through the film where possible: kivi 14.75 → 11.03 → 6.69 s [V:1-6l8S]; PL-30 runs 5.0 → 3.0 → 3.0 → 1.5 s (P08 PL-30).

---

## 4. Story structure with exact beat timings

### 4.1 The AI launch arc (eight stages)

The general launch arc (hook → reveal → proof → benefit → climax → resolution, P01 §2.2) gains one stage for AI: **Evidence and trust** sits between proof and climax, where the music breaks down. Its job is to answer the two questions every AI viewer has: *is it good?* (a number) and *is it safe to use?* (data and control).

Grid: **120 BPM** for the 45 s master (beat = 15 f = 0.5 s, bar = 60 f = 2.0 s; a whole-frame tempo, P09 SD-T4; calm AI may also run 85-100 BPM, P09 SD-T3). Section turns land on bar lines; cuts land 0-2 f before a beat.

| Stage | Job | 30 s (PL-30) | **45 s master, 120 BPM (1350 f)** | 60 s (T10 / PL-60) | 90 s (PL-90L) |
|---|---|---|---|---|---|
| 1. Hook | Stop the scroll; show the mechanic (typing, a caret, a voice, the orb) | 0.0-2.0 | **0.0-2.0 · f0-60 · 1 bar** | 0.0-2.4 | 0.0-3.0 |
| 2. Setup / input | The pain, or the question typed as a prompt | 2.0-4.0 | **2.0-4.0 · f60-120 · 1 bar** | 2.4-6.0 (era line if VO) | 3.0-8.0 |
| 3. Reveal | Name + first real UI; the drop | 4.0-7.5 | **4.0-8.0 · f120-240 · 2 bars**, drop at f122 (9%) | 6.0-12.0 | 8.0-14.0 |
| 4. Proof (Ask → Think → Answer) | 1-3 real runs, one demo grammar | 7.5-20.0 (1 run) | **8.0-28.0 · f240-840 · 10 bars**: 3 blocks of 8.0 / 7.0 / 5.0 s (block 2 holds the 3D hero; each block 10-40 % shorter than the one before, P08 DU-U3) | 12.0-40.0 (3-4 runs) | 14.0-62.0 (4-5 runs) |
| 5. Evidence + trust (breather) | One number, one eval, one trust line; music breakdown | 20.0-23.5 | **28.0-36.0 · f840-1080 · 4 bars**; breakdown 30.0-36.0 (13% RT) | 40.0-48.0 | 62.0-72.0 |
| 6. Climax | Collect every output into the brand object; escalate; stop | 23.5-25.0 | **36.0-39.0 · f1080-1170** (starts at 80% RT) | 48.0-52.8 | 72.0-80.0 |
| 7. Bookend | The hook line returns, resolved | (in climax) | **39.0-40.5 · f1170-1215** | 52.8-54.0 | 80.0-82.0 |
| 8. Resolution | Tagline → lockup → availability + CTA | 25.0-30.0 | **40.5-45.0 · f1215-1350**, still from 42.0 s | 54.0-60.0 | 82.0-90.0 |

### 4.2 Timing landmarks (hard requirements)

| Landmark | Target | Source |
|---|---|---|
| First visible change | **≤ f3**; hook text on f0 | P01 H1 (7/8 refs) |
| Hook | **1.2-2.4 s**, ≤7 words, already showing the mechanic (typing for a prompt product, a "thinking" dot for a chat product, a voice for a voice product) | P01 H2-H4 [V:1-6l8S] [V:1CSXtQ] |
| Product or model name | **≤ 2.4 s**; ≤5 s when a typed setup comes first; VO-led ≈9-10 s | P01 §2.1, R1 |
| First real input → output | **≤ 8 s** to the first real UI; the first complete answer by ≈12-20 s | 6/6 product refs; [V:1CSXtQ] answer at 20.0 s of 30 s |
| Drop | On the first product moment, **0-8 f** after its cut; in a 30 s prompt-native film at **40-45% RT** | P09 SD-AR1; [V:1CSXtQ] 43% |
| "Thinking" on screen | **8-9 f empty hold**; any typing indicator or shimmer **≤ 1 s** with nothing else happening | P06 UI-E04, UI-E22 |
| AI-colour state | **8-15 f**, then final colours within **6-8 f** | P06 UI-E17 [V:15VhHR] |
| Every output | Held **≥ 1.0 s** still, plus reading time: max(1.0 s, 0.33 s × words + 0.4 s, characters ÷ 17) | P06 #13, P01 §2.12 |
| Hero moments | 1 per 9-20 s; first at 10-25% RT, last at 76-91% RT | P08 #12 |
| 3D | One hero beat, **10-15% of runtime** at most | P10 #1-2 ([V:1CSXtQ] 3.67 s of 30 s) |
| Climax start | 78-86% RT | P01 §2.3 |
| Final still lockup | **≥ 2.2 s**; ≥ 4 s if a QR must be read; URL on screen ≥ 2 s | P08 #20, P01 L1 |

### 4.3 The proof micro-structure: Ask → Think → Answer → Detail

Every proof block in this format follows one grammar (TS1-TS2) so the viewer learns it once. Timings are in frames at 30 fps.

| Step | What happens | Duration | Source |
|---|---|---|---|
| **Ask** | The real prompt is typed (15-20 chars/s to be read; key phrase 7-9 chars/s; filler 28-35 chars/s) or spoken (words stream at 4-7 words/s) | 1.5-2.5 s | P06 #19, P07 #18 [V:1CSXtQ] [V:1-6l8S] |
| **Send** | Cursor travel 15-20 f E-GLIDE, dwell 10 f, press 3 f; state change on the press frame | 28-33 f | P06 #9-12 |
| **Think** | Cut or state change 6-8 f after the press; **8-9 f empty hold** on the result container; music suck-out ≥15 dB | 0.3-0.6 s | P06 UI-E22, [V:15VhHR t=12.2-12.6s] |
| **Answer** | Result develops: AI-colour write 12 f + settle 6 f, cascade 3-4 f stagger, 13-22 f total; or machine-pace stream at 1 word / 2 f | 0.5-2.0 s | P06 #7, UI-E04, UI-E17 |
| **Hold** | Output still ≥1.0 s plus reading time; slow push 1.05-1.15× | ≥ 1.0 s | P06 #13, P03 #20 |
| **Detail** | Cut-in 2-3.5× on the one value that proves quality (a citation, a corrected word, a number) | 1.0-2.0 s | P04 #5, P06 #16 |

**Speed contrast is the AI proof.** Human input runs at human speed (typing 15-20 chars/s, speech 4-7 words/s); the AI's output runs at machine speed (≈15 words/s, 2 f per word). The difference itself reads as "AI" (P03 SP-X3, P06 UI-E04 [V:1-6l8S t=14.3-14.6s]).

**Honest time.** If the real run takes longer than the shot, compress it with a visible, labelled time cut ("4 min later" chip, 3% H cap) rather than implying the model is faster than it is [inferred; follows P11 QC-SaaS2 claims rule].

---

## 5. Shot list template

The master beat-sheet fields (P01 §2.13) and per-shot spec fields (P11 §22.1-D), plus the fields an AI launch adds (marked ★). A shot is not ready to animate or generate until every field is filled.

| Field | Fill with | Example |
|---|---|---|
| `id` · `stage` | S01… · 1-8 (§4.1) | S08 · 4 (Proof B) |
| `t_in → t_out` | Seconds and frames @30 | 19.50-22.98 s · f585-689 |
| `purpose` | One verb phrase | "Show the brief writing itself with citations" |
| `copy` | ≤6 words; accent word marked `*word*` | "Every claim, *cited*." |
| ★ `input` | The exact prompt string from the string table, with its character count and typing speed | "Brief me on EU battery rules." (29 ch, 36 / 17 cps) |
| ★ `AI state` | none / listening / thinking / generating / develop / stream; token and frames | Empty hold 8 f → gradient write 12 f + settle 6 f |
| ★ `output` | The real output and its capture reference (run ID, date, model version) | Brief v1, run 2026-09-30-17, model `orrin-2` |
| ★ `claim ID` | Claims-sheet row for any number, eval or promise in the shot | C04 "citation accuracy 94%" |
| `UI action` | Cursor / typing / state change with frame numbers | Cursor 18 f → dwell 10 f → press 3 f at f658 |
| `camera` | One CM move + speed + ease token | CM-02 breathe +6% linear |
| `object motion` | Entrance / exit tokens and durations | Sections cascade 3 f stagger, 5 f fades |
| `entry → exit device` | TR card (P05) | Hard cut 0-2 f before the beat |
| `continuity anchor` | What stays fixed across the cut (±1 px) | Prompt bar x/y/size |
| `world / colour` | Light proof world / dark claim world; semantic token | Light #F5F5F5; AI family #C8B8E0 → #A8C8E8 only during the develop |
| `lighting` | Key direction, glow, shadow | Top-left key; card shadow y 24 / blur 48 / 7% |
| `sound` · `music event` | SFX family (F01-F18) and frame · none / riser / hit / drop / suck-out / breakdown / sting | F11 hit f597 (4 f after the result appears) · suck-out f585-596 |
| `production route` | motion-kit scene / custom Remotion or AE / generative plate / 3D | Kit `image` + custom citation popover |
| ★ `disclosure` | Is any pixel generated? Tag and log | No (real UI) |
| `QC notes` | Read floor, hold, safe area | Citation text cap ≥4% H after the cut-in |

---

## 6. Style direction

### 6.1 Visual concept

- **2D-first, real UI, one abstract object.** All 8 references build on flat layers and a 2D virtual camera. The AI may have one abstract "face" (an orb, a waveform, a Chladni pattern) that is code-driven and reacts only to product states (P10 3E-10, §14.5). True 3D is spent on one beat that explains something (P02 AD-U5; [V:1CSXtQ] 17.8-21.5 s).
- **No AI clichés.** No glowing brains, robots, circuit boards, binary rain, holographic HUDs, random particle fields, lens flares or chrome. None of the 8 references uses them decoratively; they are named as amateur tells (P02 AD-A8, P03 ML-31, P11 AA-12).
- **Abstractions are made of the product.** Particles, light and morphs are built from the UI's own colours and objects: HubSpot's data particles are navy and white because the HubSpot window is navy and white (P02 AD-U4, AD-SaaS3 [V:1CSXtQ t=19.0-19.95s]).
- **Negative space.** ≥85% of a statement frame is empty (P02 defaults; HubSpot's frames are 92-95% white).

### 6.2 Colour and the semantic AI colour

Declare a semantic table before any shot is made (P02 AD-U2). For AI, the row that matters most is **"AI is working"**: one reserved, transient gradient family, used only while the model acts, and never on resting UI (P02 AD-SaaS1, P06 UI-E17 [V:15VhHR]).

| Meaning | Token | Rule | Source |
|---|---|---|---|
| Canvas (proof world) | #F5F5F5 light editorial, #FFFFFF prompt-native, #F9FAFC airy | Off-white unless prompt-native | P02 AD-S1/S2/S9 |
| Canvas (claim / brand world) | Hue-tinted near-black #0C0A09 (warm) or navy #06004E | Dither; never banding | P02 AD-S3/S9 |
| Ink | #0C0A09 on light (18.12:1 on #F5F5F5, computed); #F5F5F5 on dark | ≥4.5:1 always | P02 §11 |
| Muted text | #777169 | **4.43:1 on #F5F5F5 (computed): large text only (≥3:1 rule), never body** | [E] palette; WCAG |
| Brand accent (text tone) | One hue, e.g. indigo #4338CA (7.25:1 on #F5F5F5, computed) | ≤5% of the frame; one accent word per frame | P02 accent rule |
| **AI is working** | One gradient family, e.g. lavender #C8B8E0 → sky #A8C8E8 (on dark use #A5B4FC, 9.91:1) | **8-15 f**, settles in 6-8 f; never text colour on light (#C8B8E0 is 1.69:1 on #F5F5F5) | P06 UI-E17 [V:15VhHR] |
| AI "face" (orb) | The same AI family, ramp black → c1 → c2 → white | The orb shares the AI colour so the viewer learns one meaning | [E] orb code |
| Problem / before | Grey, desaturated, B&W | Colour floods in when the AI engages (22-42 f), on **every** matching scene | P02 AD-X1, AD-A2 [V:1-6l8S] |
| System status | Success / warning / error hues inside UI only | Status hues never decorate | P02 AD-U2 [V:19NRDv] |
| Glow | Emitters and active states only; ≤2-3% of cap height on type; orb halo 1.4× radius, 80 px blur, 25% alpha | HubSpot uses none | P02 §11.7 |

**Palette presets for this format** (contrast computed in P02 §11.13 unless marked):
- *Calm editorial AI* (models, APIs, agents, audio) [E]: #F5F5F5 / ink #0C0A09 / pastel atmosphere stops #a7e5d3, #f4c5a8, #c8b8e0, #a8c8e8, #e8b8c4 used **only** as atmosphere / one platform hue.
- *Prompt-native* (AI features, connectors) [V:1CSXtQ]: #FFFFFF / #1A1A1A (17.40:1) / accent #F65542 on icons only.
- *Airy Aurora* (voice, assistants) [V:1-6l8S]: #F9FAFC / #0B0B0B (18.85:1) / accent text #396454 (6.43:1); mint #8EE1B2 never on text (1.48:1).
- *Dark neon* (dev tools, infra) [V:1ccYWJ]: #0A0F0A dithered / #F5F7F5 / #38D037 (9.44:1); text on green fills is #161616.

### 6.3 Typography (P07 §9, P10 ST-A3)

| Role | Size @1080p (16:9) | 9:16 @1920 | Weight | Notes |
|---|---|---|---|---|
| T-STATEMENT | Cap 5.8% H ≈ **90 px font** | 128 px | 300-400 calm (ST-A3 uses a grotesque at 300, tracking −0.02 to −0.03 em), 500 for launch energy | Centred, ≤6 words |
| T-HERO (model name) | Cap 12% H ≈ **185 px font** | 240 px | 400-600 | Version number in the same face; never a fake "v2" badge in a second face |
| Hook | Cap **≥6.5% H** (≥70 px); never HubSpot's 3.6% | ≥ 96 px | 400-500 | P01 H5 |
| Prompt text in a bar | Cap ≥3% H (≈46 px font) wide; macro shots ≈64 px | ≥ 52 px | UI native | P07 #11 (9-10 words allowed for a typed prompt) |
| Code (API launches) | Cap ≥3% H; ≤6 lines visible; mono face | ≥ 52 px | 400 | Tokens appear one per 3-4 f; identifiers in outlined chips [V:1-6l8S t=59.73-62.9s] |
| Eval footnote / source line | Cap **≥3% H** if it must be read; never below 2.5% H | ≥ 46 px | 400 | It carries the claim's meaning, so it is must-read text [inferred from P06 #2.5% rule] |
| CTA | Cap ≥5% H; URL ≥3.5% H | ≥ 52 px | 500 | P01 L4 |

- **Families:** one sans for everything + at most one accent face with one role. In AI films the natural accent role is **mono for code, model IDs and tags** [E: Geist Mono]. Do not use a serif and a mono both.
- **Overshoot on type: 0%** (8/8 refs). Emphasis by weight or the accent colour, not size jumps (P07 [V:1CSXtQ rule 8]).
- **One string table.** Model names and version strings ("Orrin 2", not "Orrin-2" in one shot and "Orrin v2" in another) come from one table (P11 AA-T, copy inconsistency [V:15VhHR]).

---

## 6b. Technique classes for this format

Each row cites master IDs; the class of an ID is the master's (U universal, S style-specific, X experimental, A avoid, SaaS). The format column says how this format uses it. Assignments to this format are [inferred] from the guideline's own sections unless an evidence tag is given.

| Class | Techniques for this format (master IDs) |
|---|---|
| Universal | Live-append kinetic lines (ML-16, RV-06); stagger ML-06; shared-element continuity ML-26 and TR-07; breathing holds CM-02; cut-ins CM-20 on the AI result |
| Format-specific | The reserved "AI is working" colour family UI-E17 [S, SaaS] and generation-state transitions TR-22 [SaaS · S]; voice orb or waveform UI-E20 [S]; stepped orbit CM-10 [S] for a model or hardware hero; Calm-Tech style ST-A3 |
| Experimental | Particle data transfer as the hero (ML-31 is S, A when decorative; the fly-through ML-12 [X]); decode/scramble reveal RV-20 used more than once; animating on twos ML-30 [X] for a hand-made feel |
| Avoid | Holograms, neon HUDs, lens flares and chrome type (P11 AA-12, AD-A8); fully generated readable UI (AA-U1); AI colour on resting UI; synthetic faces for real people (G-03) |
| Especially good for SaaS | Prompt bar → answer loop (UI-E03, UI-E04); interaction-triggered transitions TR-20 on the send click; develop-style generation TR-22 instead of a progress bar; one verified number as proof (RV-25) |

## 7. Motion language (with numbers)

Use only the P03 §19.3 ease tokens. Every value is a frame count at 30 fps.

### 7.1 Ease tokens for this format

| Token | cubic-bezier | Use here |
|---|---|---|
| E-OUT | (0.33, 1, 0.68, 1) | Default entrance: cards, plan rows, chips, words |
| E-SNAP | (0.05, 0.7, 0.1, 1) | Hook slam, arcs into the climax ring, popovers |
| E-EXIT | (0.3, 0, 0.8, 0.15) | Anything that ends on a cut (shrink, punch, implosion) |
| E-GLIDE | (0.25, 0.1, 0.25, 1) | Cursor travel; truck that follows a typed line |
| E-INOUT | (0.65, 0, 0.35, 1) | Pull-backs; prompt bar → orb morph; orb docking |
| E-HOP | (0.76, 0, 0.24, 1) | Stepped orbit steps |
| E-LERP | k = 0.20-0.25 per frame | A live-typed line re-centring (13-14 f) |
| E-LINEAR | (0, 0, 1, 1) | Breathing pushes, counters, shimmer sweeps, particle sweep |
| E-CRIT | spring m 1, k 179, c 26.8 | Only when a spring API is required; 0% overshoot |

**Banned:** Remotion's default `spring()` (16.3% overshoot), After Effects Easy Ease on entrances, any bounce on UI, type, logo, orb or camera (P03 §19.3, P11 AA-T4); kit `motion: "bouncy"`.

### 7.2 Motion numbers card

| Element | Value | Source |
|---|---|---|
| Word entrance in a line | **6 f** from a 4% W offset, E-OUT; words **3-8 f** apart | P03 #9-10, [V:1-6l8S rule 1] |
| Live-append re-centre | E-LERP k 0.22, settles in 13-14 f, travel 10-15% W | P07 RV-06 |
| Typing (to be read) | **15-20 chars/s**; key phrase 7-9; filler 28-35; phrase pauses 0.9-1.1 s; caret blink 9 f on / 9 f off; caret locks at 65-66% W | P06 #19, P07 #19 [V:1CSXtQ rule 1] |
| Human-pace stream | **4-7 words/s**; each word 30-40% → 100% opacity in 3-4 f | P06 UI-E04 [V:1-6l8S] |
| Machine-pace stream | **1 word per 2 f (≈15 words/s)**; code tokens 1 per 3-4 f | P06 UI-E04 |
| Empty "thinking" hold | **8-9 f** | P06 UI-E22 |
| Shimmer status line ("Thinking…") | Sweep 2 s linear + 0.5 s pause, 2 px spread per character; on screen ≤ 1 s in a film | [E] code; P06 UI-E04 mistakes |
| Typing-indicator dots | 3 dots, 2 f stagger, each from ≈2× to 1× in 3-4 f; ≤1 s total | P06 UI-E04 [V:1i2L14] |
| AI-colour write of text | **12 f write + 6 f settle** | P06 UI-E17 [V:15VhHR t=36.6-37.0s] |
| AI rewrite of a block | Gradient sweep 12 f across it, then a 1 f state switch | P06 UI-E17, P03 MP-SaaS7 |
| Image generation develop | Duotone 7-11 f → 1 f switch → 6-12 f clean-up (montage); hero image ≈80% in 15 f, settled 20 f; mosaic de-pixelate ≈8 f | P06 UI-E17 |
| "AI invoked" halo | Violet halo bloom **3 f** behind the selected element | P02 §11.8 [V:15VhHR t=23.83s] |
| Result cascade | 8-9 f empty hold → 3-4 f stagger, 4-6 f per element, **13-22 f total** | P06 #7 |
| Agent step rows | Row in 6 f E-OUT, 4 f stagger; active step shimmer ≤12 f; check pops 2 f; steps **0.6-1.0 s apart** (an event every 0.8-1.5 s) | P06 #8, P01 P5 [inferred spacing] |
| Counter (sources, tokens, ms) | KPI 24-31 f; tally linear ≈1 s per 2 digits; ≤15 ticks/s audio | P03 ML-data |
| Orb | Drift period **≈251 s** (barely moves); listening `0.55 + 0.35·sin(3.2t)`, talking `0.65 + 0.22·sin(4.8t)`; reacts only to product states, never to the edit | P10 3E-10 [E code] |
| Data-transfer particles | **200-300 discs** in the source UI's colours, Ø ≈12-22 px @1080; sweep L→R in **0.95 s (28 f)**; end in a state (cloud, card, logo) | P10 3E-08 [V:1CSXtQ] |
| Climax sparks | ≤12, radial, over 10 f, brand or AI colour | P10 3E-08 [V:19NRDv t=55.27s] |
| Card entrance | 12 f E-OUT, rise 5-8% H | P06 #4 |
| Hold life | Push 1.05-1.15× per hold or drift 0.1-0.5% of frame per frame | P03 #20 |
| Punch into a cut | +18-33% in the last 3-8 f; ≤1 per 15-20 s | P03 #23 |
| UI state change | 1-3 f; toggle 3 f; dropdown 6 f (rows 2 f apart); popover 1-2 f | P06 #5 |
| Simultaneous primary motions | **1** (a cascade or a particle sweep counts as one) | P06 #22 |
| Overshoot | **0%** on type, UI, logo, orb, camera | P03 #21 |

### 7.3 Signature device

Pick one and use it **3-12 times** (P05 #3). Best fits for AI:
- **Send → develop** (this guide's default): every input ends on a press; the cut or state change lands 6-8 f later; 8 f empty hold; 12 f AI-colour develop; settle 6 f. The viewer learns "press = the AI acts" in one use [V:15VhHR] [V:1-6l8S].
- **The prompt bar is the anchor:** locked to ±1 px while the world behind it changes (slot machine, holds 21 → 29 → 38 f) [V:15VhHR t=8.63-12.83s].
- **Typed headline becomes the UI** [V:1CSXtQ t=2.13-10.37s].
- **The orb as the AI's face**: it appears at the reveal, docks in the UI as the thinking indicator, returns in the climax and becomes the logo symbol [inferred; built from [E] and [V:1-6l8S] logo halo].

---

## 8. Camera language

The AI is calm; the camera is calmer. Breathe on every hold, move only with motivation (P04 §6.0).

| Parameter | Default | Source |
|---|---|---|
| Breathing on every hold | **+5 to +10% over 1.5-2 s, linear**; ST-A3 push 1.00 → 1.05-1.08 per shot | P04 #1; P10 ST-A3 |
| Camera speed while text or output is read | **≤0.2% W/f** | P04 #3 |
| Typed line in macro | Truck follows the caret so the newest characters stay in frame; caret drifts from ≈19% to ≈75% W; ease-in-out, peak 15-23 px/f | [V:1CSXtQ shot 4] |
| Reveal pull-back (2D) | **×0.75-0.80 over 21-31 f**, E-INOUT | P04 #4 [V:1CSXtQ t=8.0-9.03s] |
| Cut-in to a citation, value or corrected word | **2-3.5×, instant** | P04 #5 |
| Screen-to-world pull-back (hero) | **×0.57 in 10 f, then ×0.56 over 18-20 f** (≈×0.32 in ≈1 s) | P04 #11 [V:1CSXtQ t=18.00-19.03s] |
| Dolly through particles | **×2.2-2.5 in ≈15 f**, E-OUT; near discs 30-40 px @720 → bokeh | P04 #10 [V:1CSXtQ t=19.95-20.47s] |
| Stepped orbit (climax ring) | 9-12 f per step, steps ≈2 beats apart; never a continuous 360° | P04 #12 [V:19NRDv t=29.97-35.93s] |
| Orb shots | Locked; push 1.00 → 1.06; parallax only between a UI card and its background | P10 ST-A3 [E] |
| UI plane tilt | ≤35° in transit, **0-15° while read**, flattened to 0° in 7-8 f before reading | P06 #19 |
| Depth planes | 3, at most 4 in the hero beat | P04 #16 |
| Roll / shake / overshoot | **0° / none / 0%** | 8/8 refs |

**Camera budget for the 45 s master:** breathing on every shot, **6-10 motivated moves**, **1 3D/DOF beat**, **≤3 punches or whips**, 1 stepped orbit (climax only) (scaled from P04 §6.4).

**9:16:** prefer vertical and scale moves; lateral ≤50% W; end every move inside x 120-840, y 270-1210 (P04 §6.5).

---

## 9. Transitions

**Grammar:** ≥70% hard cuts; one signature device; one hero one-off per 15-20 s (P05 #1-4).

| Budget (P05 §7.5) | 30 s | **45 s** | 60 s |
|---|---|---|---|
| Scene changes | 10-16 | **16-25** | 22-33 |
| Signature uses | 3-7 | **4-8** | 5-10 |
| Hero one-off transitions | 1-2 | **2-3** | 3 |
| Shape / mask wipes | ≤1 | **≤1** | ≤2 |
| Flash moments | ≤1 | **≤1** | ≤1 |

**Transitions that suit AI** (P05 defaults):

| Transition | Spec | Best stage |
|---|---|---|
| Polarity-flip cold open | Black brand world → white product world on a hard cut on the first audio hit (≈2 s) | Hook → setup [V:1CSXtQ t=2.13s] |
| Interaction-triggered cut ("send") | Cut or state change **3-15 f** after the press, median **6-8 f** | Every Ask → Think |
| Generation develop (TR-22) | 8-15 f AI-colour state → final in 6-8 f; replaces spinners and fake progress | Think → Answer (P05 §TR-22) |
| UI morph (shared element) | **7-13 f**; prompt bar → orb, orb → dock icon | Reveal |
| Match cut on motion | Exit ≈7 px/f ease-in, enter 30-35 px/f ease-out, same direction (prompt → sent bubble) | Send → hero [V:1CSXtQ rule 4] |
| Particle disintegration | Source UI breaks into its own colours, 28 f sweep; 70 ms gap → hit 1.5 f after it starts | Hero 3D beat |
| White bloom / AI halo | White bloom 3-6 f from a clicked element; violet halo 3 f for "AI invoked" | Activation moments |
| Blur / defocus dissolve | **6 f** (4-8 f) | Into the evidence breather |
| Word-spacing match | Exit by widening gaps ×1.5 over ≈18 f to 60% opacity; enter with gaps 25% open, tighten 8-10 f | Card → card [V:1CSXtQ rule 10] |
| Logo resolve | Converge 8 px/side over 9 f; still ≥2.2 s | Resolution |
| End fade | 14 f to white (light) / up to 33 f to black (dark); music outlasts picture | Last frame |

Never: crossfade 2D ↔ 3D (P10 #24); a held duotone longer than ≈15 f (reads as a glitch, [V:15VhHR]); 1-frame dips to black or light-leak patches at cuts [V:19NRDv] [V:1-6l8S].

---

## 10. UI treatment

AI films are judged on whether the output is real. Run the P06 §8.0 five-question test on every UI shot (real? readable? visible cause? believable timing? one focus?), plus three AI questions: **Is this the model's real output? Can the viewer read the part that proves quality? Is the AI-colour state transitional?**

### 10.1 Rules

| Rule | Value | Source |
|---|---|---|
| UI and output source | **Real product UI and real model output**, captured from a logged run and rebuilt as vector layers; never generated by a video model, never written by an LLM for the film | P06 UI-R, P11 AA-G9, MK-P10 |
| Hero UI card | 65-80% W (16:9); ≈75% W = 810 px (9:16); radius 24-32 px; shadow y 24 / blur 48 / 6-8% + 1 px hairline | P06 #2-3, #20 |
| Prompt bar | ≈72% W, centred; caret blink 9/9 f; shadow and border appear 1-3 f after the last character when the UI builds around text | P06 UI-E03 [V:1CSXtQ] |
| Prompt length | ≤100 characters (kit hard limit 140); one sentence; the exact string a user would type | kit `prompt` schema |
| Streaming answers | Stream at machine pace only as **texture**; anything the viewer must read is held still and cut into (HubSpot's ≈60-word answer scrolled past in ≈1.5 s works only as texture) | P06 UI-E04 [V:1CSXtQ §8] |
| Raw → polished | Raw input dims to ≈50% when the polished output arrives; the polished line gets one ≈0.8 s L→R shimmer | P06 UI-E04 [V:1-6l8S t=13.77-15.8s] |
| AI colour | One family; transitional 8-15 f; never on resting UI | P06 UI-E17 |
| Progress | Never a fake progress bar or a long spinner; a one-step spinner swap or the shimmer line ≤1 s | P06 UI-E22, P05 TR-22 |
| Agent steps | Real step names from the product; ≤5 rows visible; one active row at a time; completed rows get a check (2 f) and dim to 50% | P06 #8, #17 [inferred row cap from kit `list` 1-5] |
| Citations and sources | Real sources from the captured run; superscripts pop 2 f stagger; a source popover opens in 1-2 f and holds ≥1.0 s; no third-party logos without permission | P06 #5, P11 brief rules |
| Code | ≤6 lines; tokens 1 per 3-4 f; cap ≥3% H; real, runnable snippet with the real model ID | P06 UI-E04, P07 |
| Voice | Waveform driven by the real signal; words follow the voice word for word (4-7 words/s) | P09 F18 [E] [V:1-6l8S] |
| Cursor | Native arrow ≈2% H; travel 15-20 f E-GLIDE; dwell 10 f; press 3 f; consequence 3-8 f later | P06 #9-12 |
| Must-read text | Cap ≥3% H; ≥4% H after a cut-in; below 2.5% H = texture only | P06 #2 |
| Floating callouts | ≤3, one fact each, 4 f stagger, anchored to what they describe | P06 #23 |
| UI raster | Vector, or ≥ max zoom × delivery size; hero 3D textures ≥1.5× output (HubSpot's greeked window was its flaw) | P06 #25, P02 AD-A7 |

### 10.2 Choreography patterns to reuse

- **Say → See** (UI-P1) [V:1-6l8S t=17.03-25.47s]: name card → input card with live waveform or typed prompt → continuity cut → 8 f empty hold → cascade in reading order → hold with a slow push.
- **Text → UI build** (UI-P2) [V:1CSXtQ t=2.13-10.37s]: headline typed on an empty canvas → 0.6 s hold → border and shadow 1-3 f → brand icon pop 3 f → toolbar slides up 4-5 f → pull-back ×0.75 → cursor toggles a source → cut on the riser crest.
- **Locked-anchor slot machine** (UI-P4) [V:15VhHR t=8.63-12.83s]: prompt fixed to ±1 px; use cases swap behind it, holds 21 → 29 → 38 f; music sucks out ≥15 dB on the send click; result cut 8 f later; hit 4 f after the result appears.
- **Ask → Plan → Act → Deliver** (agents) [inferred]: prompt → plan card with 3-5 rows (6 f each, 4 f stagger) → active row shimmer ≤12 f → check 2 f → artefact develops → cut-in on the proof detail.
- **Data moves between systems** (UI-E17 last row) [V:1CSXtQ t=19.00-19.95s]: the source window disintegrates into 200-300 discs in its own colours, sweeps L→R in 0.95 s, dolly ×2.3 through them.

---

## 11. Sound and music

### 11.1 Music brief

| Parameter | Value | Source |
|---|---|---|
| Tempo | **120 BPM** pad-led for the 45 s master (beat 15 f, bar 2.0 s); 85-100 BPM for calm or prompt-native spots (HubSpot ≈86); 100-120 for AI audio / model brands; 80-95 for a cinematic single-reveal | P09 SD-T3, SD-T4; P10 ST-A3, ST-B |
| Style | Restrained electronic or ambient: soft plucks, pads, a sparse kick after the drop; no trailer drums or choirs | P09 §16.2, SD-MU3 |
| One tempo | Change energy by arrangement, not tempo | P09 SD-T6 |
| Voice mode | **No narrator** for most AI launches (the type narrates); **in-world product voice** for voice and audio products; narrator only for VO explainers and T10 | P09 §16.10.1 |
| Product audio is the hero | If the product outputs sound, let the real output be heard over a live waveform; music thins or ducks 10-12 dB under it | P09 F18 [E] |
| Sourcing | Licensed tracks only; if the product makes music, score the film with it (ElevenLabs scores with Eleven Music) | kit check warning; [E] |

### 11.2 Music arc for the 45 s master

| Time | Stage | Audio state | Level (short-term) |
|---|---|---|---|
| f0 | Hook | Sub impact on f0 (never a fade from silence); soft pluck per hook word | Impact ≈ −6 dB |
| 2.0-3.8 s | Setup (typing) | Near-silence floor with quiet keystrokes, 20-25 dB under full music | −40 to −45 dB floor |
| 2.9-3.83 s | Pre-reveal | Riser, crest at f115; gap f116-121 (≈200 ms) | Crest ≈ −12 dB |
| 4.07 s (f122) | Reveal | **Hit + drop**, 2 f after the reveal picture | Hit +8 to +15 dB over the bed |
| 8.0-28.0 s | Proof | Steady pulse; a **suck-out ≥15 dB** on each send click (the "thinking"), a hit 4 f after each result appears | Body −12 to −18 dB |
| 30.0-36.0 s | Evidence + trust | **Low-pass breakdown**, −10 dB, under the densest reading (13% RT) | −20 to −30 dB |
| 36.0-39.0 s | Climax | Re-entry, densest rhythm, swish per orbit step, hit on the implosion | Brightest |
| 40.35-40.5 s | Into the lockup | 150 ms gap | ≤ −35 dB |
| 40.5-45.0 s | Lockup | Sting ±2 f of the lockup's first full frame; tail 1.8 s; ≤ −60 dB in the last 0.5 s; music ends with the picture | Sting ≈ −7 dB |

### 11.3 SFX map (families from P09 §16.7, budgets per 45 s)

| AI event | Family | Placement | Level | Budget |
|---|---|---|---|---|
| Hook accent | F12 sub hit (+100-300 Hz harmonic for phones) | f0 | −2.6 to −9 dB peak | 1 |
| Typed prompt | F02 keystrokes | Per burst; single keys only when typing ≤12 chars/s | 20-25 dB under full music; quiet sections only | 2 passages |
| Send / click / toggle | F01 click / F03 toggle | **Press frame, 0 f**; one per state change | Clear inside the dip | 4-6 |
| **AI thinking** | **Silence** (music suck-out), not a sound | From the press frame to the result | ≥15 dB down | Every run |
| AI generating | F14 shimmer **or nothing** | Under the visual only, ≤10-15 f | −6 to −10 dB under the bed | 0-1 |
| Result appears | F11 hit or F04 soft tone | **≈4 f after the result first appears** (early in its build, not at its end) | Hit +8 to +15 dB; tone +0-4 dB in band | 2-3 hits (≥1.4 s apart) |
| Plan rows, chips, citations | F05 settle ticks | First moving frame of each arrival | −6 to −10 dB under F01 | 1-2 sequences |
| Source / token counter | F06 data ticks | ≤15 ticks/s + one lock accent on the final value | Low | 0-1 |
| Data transfer (particles) | 70 ms gap → F11 hit | 1.5 f after the dissolve starts | +8 to +15 dB | 1 |
| Dolly / biggest move | F07 whoosh | **Peak on the fastest frame** | +3 to +6 dB above 4 kHz | **0-2 per film** |
| Orbit steps | F08 swish | Outgoing frame of each step | +2 to +5 dB above 4 kHz | 1 sequence ≤5 |
| In-world voice / generated audio | F18 product audio | Where the product makes it; text follows word for word | The hero layer; music ducked 10-12 dB | As needed |
| Lockup | F17 sting | ±2 f of the lockup | Loudest sustained moment | 1 |
| Every "silence" | F16 room tone | Continuous | −40 to −45 dB floor | Always |

**Do not** put glitch, bleep, data-stream or "computer" textures under AI moments; they read as dated sci-fi. Let silence carry "the AI is working", then hit the result (P09 F14 [V:15VhHR t=12.2-12.6s]). Mute and discard any audio a video model returns (P11 AA-G10). Never put a hit under a spoken word (P09 §16.1 priority).

---

## 12. Copy rules

### 12.1 Budget (P01 §2.12)

| Stage | Words on screen | Minimum time |
|---|---|---|
| Hook | ≤7 (median 4), one idea | 1.2 s |
| Typed prompt | ≤100 characters; 9-10 words allowed | Typing time + ≥0.6 s still after the last character [V:1CSXtQ rule 1] |
| Statement / label | ≤6 words, one line | ≥0.3 s per word, ≥1.0 s |
| Evidence line | Number + ≤6-word label + a source line | Source line: characters ÷ 17 s |
| Output text meant to be read | ≤14 words visible at once (kit `chat.reply` cap) | Reading time + 1.0 s still |
| Whole film without VO | As few as 11 words in 54 s [V:15VhHR]; keep statement copy (outside UI and outputs) to ≈40-70 words in 45 s [inferred] | — |

Hold formula for non-built lines: **max(1.0 s, 0.33 s × words + 0.4 s, characters ÷ 17)**, ×1.15 for Hindi or Hinglish [unverified factor] (P01 §2.12).

### 12.2 Hook patterns that fit AI / tech launches (P01 §2.5)

| Pattern | Example (measured or fictional) | Spec |
|---|---|---|
| Pain question, live-typed | "Still typing?" [V:1-6l8S] / "Still reading 40 tabs?" | Text by f3; words 7 f apart; re-centre over 13 f; light-wash exit 7 f |
| Event announcement + "thinking" dot | "For the first time ever" [V:1CSXtQ] | Dot at frame centre on f0 with a sub impact; polarity-flip cut at ≈2.1 s |
| Prompt as hook | The user's question typed on f0: "Brief me on EU battery rules." | Caret on f0; 15-20 chars/s; the send click is the hook's exit |
| Time shock with a strike | "A cited brief: ~~3 days~~ 12 minutes." | Kit `hook`: setup, strike ≤14 chars, punch; the number must be on the claims sheet |
| Era shift (VO) | "As AI reshapes every industry, you don't need another chatbot…" [S:Airtable] | ≈10 s chapter; only with a narrator |
| Zero-copy object | The orb waking up on f0, or a waveform starting with a voice | Object moves by f1; name by ≤2.4 s |

Hook rules: in motion by f3 (H1), ≤7 words (H2), 1.2-2.4 s with an energetic exit (H3), and the mechanic already visible (H4).

### 12.3 Claims, evidence and naming

- **Show first, then label** (P01 §2.8): the run comes before the caption that names it.
- **Verbs and outcomes, not adjectives.** "Every claim, cited." beats "Powerful AI research assistant." Avoid hype words that promise without showing ("revolutionary", "magic", "unleash", "supercharge", "the future of…") [inferred; follows the master's verbs-over-adjectives rule].
- **Every number on the claims sheet** with its source, date and sample size, signed before the edit locks (P11 QC-SaaS2). Never let an LLM fill a number (P11 MK-P10).
- **Evals and benchmarks** [inferred, applying P02 honesty rules to charts]: bars start at zero; the same eval and settings for every bar; name the eval, date and n on screen (≥3% H) and link the full method in the post; compare version to version (Orrin 1 → Orrin 2) unless legal has approved a named competitor; one chart per film.
- **Latency claims** are shown with a real counter or a labelled time cut, never by speeding up footage (§4.3).
- **Trust line** (data use, privacy, controls) must be true of the shipping product and approved by its owner; show it as a real setting or real document where possible.
- **Close the loop (L3):** the bookend repeats the hook's line or number, resolved (6/8 refs).
- Numbers: digits on screen, words in a VO ("twelve minutes") (kit rule).

### 12.4 CTA examples (P01 §2.11 L4-L5)

| Launch type | CTA | Availability line |
|---|---|---|
| Self-serve AI product (default) | "Try Orrin 2 →" | "Available today · app and API" |
| API / model | "Get API access →", "Read the docs →" | "Model ID `orrin-2` · today" (mono) |
| Model with safety material | "Read the model card →" | Secondary line only; the primary CTA stays the trial |
| Waitlist / beta | "Join the waitlist", "Request access" (button ≤16 characters) | "Rolling out to Pro this week" |
| AI feature in an existing product | "Update to 4.2", "Turn on [Feature] →" | "Now in [Product]" |
| Integration / connector | "Connect ChatGPT + HubSpot" [V:1CSXtQ] | Co-brand lockup reprised |
| Brand awareness | Tagline + logo; URL in the post copy | No button |

CTA cap ≥5% H; URL ≥3.5% H and on screen ≥2 s; a QR needs ≥4 s still [V:19NRDv].

---

## 12b. Typography

One place for this format's type decisions; sizes are P07 §9.2 tokens (font px at 1920×1080 / 1080×1920), entrances and exits follow P03 SP-T0, word budgets and holds follow P01 H2 and P07 §9.11.

| Item | This format |
|---|---|
| Families and weights | One sans + one mono with one role (code, model IDs, tags) [E: Geist Mono]; statements 300-400 calm, 500 for launch energy; never serif and mono together (§6) |
| Size tokens | T-STATEMENT 90 / 128 px; T-HERO 185 / 240 px for the model name (version in the same face); code cap ≥3 % H, ≥52 px font at 9:16; T-UI-READ 43-64 / ≥52 px |
| Reveals | RV-06 live-append with re-centre (E-LERP k 0.22), RV-11 ghost-word streaming, RV-22 AI colour settle (8-15 f), RV-19 blur → sharp resolve, RV-09 display typewriter |
| Exits | EX-02 blur dissolve, EX-12 gap split, EX-03 whip; AI colour never left on resting text |
| Word budget | Hook ≤7 words (≤5 in 9:16); statements ≤6 words; thesis ≤5; streamed answers show only the must-read line in full |
| Holds | Punch word 10-15 f; kinetic line of ≤3 words ≥10-14 f landed; statement of 4-6 words ≥0.8 s landed; payoff, result or status ≥1.0 s still; no text event under 25 f except SD-03 punch cards in a run (P07 §9.11.2, P08 §17.8 #3-4); lockup ≥1.5 s still (2.2 s premium) |
| Floors | Must-read text inside the safe area (16:9 x 96-1824, y 54-1026; 9:16 x 120-840, y 270-1210); 9:16 body font ≥52 px; contrast ≥4.5:1 (3:1 large), ≥7:1 or a ≥60 % scrim over footage (P07 §9.21, P11 G-27, G-37) |

## 13. Worked example storyboard: "Orrin 2", 45 s launch film

**Brief (fictional).** Orrin 2 is an AI research agent: you ask a question; it plans, searches and reads sources, and returns a written brief in which every claim is cited. Audience: policy, strategy and research leads. Template: **Ask → Plan → Act → Deliver** (T1 + T4 synthesis), style **ST-A3 Calm editorial AI** with one ST-A2 depth beat. 16:9, 1920×1080, 30 fps, **45 s (1350 f)**, music-led at **120 BPM** (beat 15 f, bar 60 f), no VO. Palette: canvas #F5F5F5, ink #0C0A09, accent text #4338CA (7.25:1), AI family lavender #C8B8E0 → sky #A8C8E8 (on dark #A5B4FC, 9.91:1), dark world #0C0A09 for the hook and climax only. One sans (grotesque, display weight 300-400) + mono for model IDs and tags. Signature device: **Send → develop** (4 uses). Hero 3D beat: sources → brief particle transfer (4.0 s = 8.9% RT). **All numbers (40 tabs, 3 days, 12 minutes, 112 / 38 sources, 81% / 94%, n = 1,200) are placeholders that must be replaced by signed claims-sheet values.**

Cut times are the frame **before** a beat (picture leads 0-2 f). Beat n sits at n × 15 f.

| # | Scene | Timestamp (s · f) | Dur | Visual | UI / product action | Camera | Object motion | Text | Transition (out) | Lighting | Sound | Music | Motion notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Hook | 0.00-1.98 · 0-59 | 2.0 s | Dark #0C0A09 field; one line at centre, y 50% | Words append live like typing: "40" on f0, then a word every 7 f; done by f42 | Locked; breathe +4% linear; **punch +22% in last 6 f** (E-PUNCH) | Each word 6 f E-OUT from 4% W; line re-centres E-LERP k 0.22 (13 f) | "40 tabs. 3 days. One *brief*." (cap 7% H; accent #A5B4FC) | Polarity-flip hard cut f59 | Faint lavender radial glow top-right, ≤2% of frame | F12 sub hit f0; soft pluck per word | Pad + plucks | Hook text on f0 (thumbnail). 6 words, 2.0 s (H1-H3). Shows the pain before the mechanic |
| 2 | Setup / input | 2.00-3.98 · 60-119 | 2.0 s | Light #F5F5F5; prompt bar 72% W at y 50%, empty, caret blinking | Types "Brief me on " at 36 cps (10 f), "EU battery rules." at 17 cps (30 f), done f100; cursor travels 10 f to Send, press f110-112 | Locked | Caret blink 9/9 f; bar shadow appears 2 f after the last character | Prompt text cap 3.2% H | **Signature 1/4:** interaction-triggered cut f119 (7 f after the press) | Flat, soft card shadow y 24 / blur 48 / 7% | F02 keys −22 dB; F01 click on f110; F09 riser 2.9-3.83 s, crest f115; gap f116-121 | Near-silence floor | Prompt still ≥0.6 s after the last character (f100-110 + cut) |
| 3 | Reveal | 4.00-5.98 · 120-179 | 2.0 s | The prompt bar collapses into a 22% W orb at centre; wordmark "Orrin 2" builds to its right | Orb in "listening" state `0.55 + 0.35·sin(3.2t)` | Locked; breathe +5% | **UI morph** bar → orb 10 f E-INOUT; halo 1.4× radius, 80 px blur, 25% alpha; letters 2 f stagger, 6 f each; sub line at f150 | "Orrin 2" (T-HERO 185 px) · "A research agent that cites its work." (54 px cap) | Orb shrinks and docks (continuous into #4) | Orb is the only emitter | F11 hit f122, +10 dB | **Drop f122** (2 f after picture) | Hero 1 at 4.07 s (9% RT). Name at 4.0 s (≤5 s after a typed setup). Hero one-off 1/3 |
| 4 | Reveal: first UI | 6.00-7.98 · 180-239 | 2.0 s | Frameless workspace card 76% W, radius 28 px; question as the title; "Plan" panel | Orb docks top-left at 4% W (12 f E-INOUT) as the status icon; plan rows "Search · Read · Cross-check · Write" write in the AI gradient 12 f, settle 6 f | Breathe +6% | Rows 6 f E-OUT, 4 f stagger; orb pulse switches to "talking" | Title = the prompt string (identical) | Hard cut f239 | Card shadow default | F05 ticks on rows, −8 dB | Groove | **First real UI at 6.0 s** (≤8 s). Plan before action = believable agent |
| 5 | Proof A: reads | 8.00-11.98 · 240-359 | 4.0 s | Workspace: source column on the right fills | "Search" active: shimmer status line 2 s sweep; source chips (domain + title, from the captured run) stream in 2 f stagger; counter 0 → 112 over 30 f linear; at 10.7 s 74 chips dim to 15% in 4 f, 38 stay; "Search" checks (2 f) | Slow truck right 0.15% W/f following the column | Chips 4 f fades; counter locks f294 | Label "It reads *everything*." enters at 10.7 s, top-left, 54 px cap | Hard cut f359 | — | F06 ticks ≤15/s, lock accent f294; F05 on the check | Groove | Events at 8.0, 8.9, 9.8, 10.7, 11.5 s (every ≈0.9 s, P5). Show first, label second |
| 6 | Proof A: detail | 12.00-15.98 · 360-479 | 4.0 s | **Cut-in ×2.5** on one source card | Passage highlighted by a highlighter wipe 8 f L→R; chip "✓ Confirmed by 3 sources" pops 2 f at 12.6 s | Instant cut-in, then breathe +5% | Two sibling cards slide behind, 3 f stagger; the chip then holds still ≥1.0 s while two more passages highlight at 13.6 s and 14.6 s | Passage cap 4.2% H; chip 3.5% H | Shrink −25% over 10 f E-EXIT, hard cut f479 | — | F04 soft tone on the chip's first full frame | Groove | Quality is proven by one readable detail, not by volume |
| 7 | Proof B: hero 3D | 16.00-19.48 · 480-584 | 3.5 s | 38 source cards hang on a tilted plane left; an empty brief page on the focal plane right; soft studio radial #ECE9F4 → #F5F5F5 [inferred] | At 17.3 s the highlighted passages detach as ≈240 discs in the cards' own colours (white, ink, lavender highlight) and sweep L→R into the brief in 28 f | **Screen-to-world pull-back ×0.57 in 10 f, then ×0.56 over 19 f**; near-static during the sweep; **dolly ×2.2 in 15 f** E-OUT through the stream at 18.3 s | Cards tilt ≤35° in transit; the brief flattens to 0° in 8 f by 19.2 s | None during the transfer | Hard cut f584 | 3 planes, foreground bokeh; one key top-left shared with every 2D shadow | 70 ms gap → F11 hit at 17.35 s; F07 whoosh peak on the dolly's fastest frame (≈18.4 s) | Groove; fill on the hit | **Hero 2 at 17.3 s (38% RT).** Only 3D beat (7.8% RT). 180° motion blur on the dolly. Hero one-off 2/3 |
| 8 | Proof B: answer | 19.50-22.98 · 585-689 | 3.5 s | Brief page flat, 76% W | **Signature 2/4:** 8 f empty hold → title writes in AI gradient 12 f + settle 6 f → 3 section heads cascade 3 f stagger → body streams at 1 word / 2 f (texture) → citation superscripts [1]-[6] pop 2 f stagger; cursor travels 18 f to [3], dwell 10 f, press f658; source popover opens in 2 f | Breathe +6% | Cascade 20 f total; popover holds 1.0 s still to the cut (f660-689) | Caption "Every claim, *cited*." at 20.5 s, bottom, 54 px cap; popover text 3.5% H | Hard cut f689 | — | Suck-out −15 dB f585-596; F11 hit f597 (4 f after the title appears); F01 on f658 | Groove returns at f597 | Body text is texture; the readable proof is the popover |
| 9 | Proof C: follow-up | 23.00-25.98 · 690-779 | 3.0 s | Composer bar under the brief | User types "Make it a one-pager for the board." at 30 cps (34 f, filler pace; P06 typing speeds); **Signature 3/4:** press Send f726; brief state-switches in 1 f to a one-pager after a 12 f AI-gradient sweep, settles 6 f; chip "1 page · 12 citations" | Locked while typing; breathe +5% after | **State switch, not a morph** (P03 MP-SaaS7) | Prompt cap 3.2% H; chip 3.5% H | Hard cut f779 | — | F02 keys −22 dB; F01 f726; suck-out f726-741; F04 on the chip (≈f746, held ≥1.0 s to the cut) | Groove | Speed contrast: 1.1 s of human typing vs a 0.6 s AI rewrite |
| 10 | Proof C: deliver | 26.00-27.98 · 780-839 | 2.0 s | One-pager with a Share menu | Cursor → "Share" press 3 f; menu 6 f, rows 2 f stagger (Docs · Slides · Email, generic icons); press "Docs"; **Signature 4/4:** toast "Exported to Docs" 6 f E-OUT at 27.1 s | Breathe +5% | Toast 6 f | Toast cap 3.5% H | Hard cut on the beat f839 | — | F01 ×2 on press frames; F04 on the toast | Groove | Hold the toast 0.9 s to the cut (state already read in the menu) |
| 11 | Evidence: number | 28.00-29.98 · 840-899 | 2.0 s | Light canvas, stat card | "12 min" counts 0 → 12 over 24 f; meter fills | Breathe +6% | Counter E-OUT; meter 18 f | Kicker "Beta · median, n = 1,200 briefs" (3% H) · "12 min" (T-HERO) · "to a *cited* brief" | Hard cut f899 | Flat | F06 ticks + lock accent at f864 | Groove thins | Still 35 f (1.17 s) after the lock. Claim C01 |
| 12 | Evidence: eval | 30.00-33.98 · 900-1019 | 4.0 s | Two horizontal bars from a zero baseline | Bars grow 18 f E-OUT, 6 f stagger; values count up; Orrin 2 bar in accent | Locked, breathe +4% | — | Title "Citation accuracy" · "Orrin 1 81% · Orrin 2 94%" · source line "Internal eval, 500 questions, Sep 2026 · orrin.example/eval" (3% H cap) | 6 f blur dissolve f1013-1019 | — | — | **Breakdown from 30.0 s**: low-pass, −10 dB | Source line needs 59 ÷ 17 ≈ 3.5 s: met. Version vs version, no competitor. Claim C02 |
| 13 | Trust (breather) | 34.00-35.98 · 1020-1079 | 2.0 s | Statement at top; settings card 60% W below | Cursor presses toggle "Use my files to train models" → Off (3 f) at 34.6 s | Breathe +8% | Card 12 f E-OUT | "Your files stay *yours*." (90 px font) | Polarity flip to dark, hard cut f1079 | Flat | F03 toggle on the press frame; 100 ms gap at the end | Pad / filtered | Real setting, owner-approved (claim C03). Low motion = breather |
| 14 | Climax | 36.00-38.98 · 1080-1169 | 3.0 s | Dark world. Orb centre at 18% W | Film objects (a source chip, the brief, the one-pager, the "12 min" card) fly in on arcs and ring the orb, then step-orbit 3 times and implode into it | Push +10% linear, then **punch +25% in last 6 f** | Arcs 18 f E-SNAP, 4 f stagger (f1080-1110); orbit steps 10 f E-HOP at f1110, f1132, f1150 (gaps shrink 22 → 18 f: accelerando); implosion 8 f E-EXIT f1158-1165; ≤12 lavender sparks over 10 f | — | Hard cut f1169 | Orb glows (the only emitter, halo 25%) | F08 swish per step; F11 hit + F12 sub on the implosion (f1160) | **Re-entry at 36.0 s**, densest rhythm | **Hero 3 at 38.7 s (86% RT).** Hero one-off 3/3. Collects every output (HR-08) |
| 15 | Bookend | 39.00-40.48 · 1170-1214 | 1.5 s | Light world; hook line returns | "3 days" struck through (8 f linear) at 39.3 s; "12 minutes." types at 2 f per letter | Breathe +5% | — | "A cited brief: ~~3 days~~ *12 minutes.*" | Hard cut f1214 after a 150 ms gap | Flat | Pluck on the landing | Gap 40.35-40.5 s | Closes the loop with the hook (L3). Claim C01 again |
| 16 | Lockup + CTA | 40.50-45.00 · 1215-1350 | 4.5 s | Orb mark (8% W) + "Orrin" wordmark centred; tagline; CTA link; availability + URL | Lockup converges 8 px per side over 9 f; CTA underline draws 12 f at 41.0 s | **Dead still from 42.0 s (3.0 s)** | Lines 8 f E-OUT, 4 f stagger | "Research, answered." · "Try Orrin 2 →" (cap 5.4% H) · "orrin.example · Available today in app and API" (3.6% H) | End: 14 f fade to white from 44.53 s | Flat; orb halo off | F17 sting f1215 ±2, tail 1.8 s | Decay to ≤ −60 dB at 45.0 s; music ends with the picture | Only still frame of the film. URL on screen 4.0 s |

**Rhythm check (computed):** 16 shots · ASL 2.8 s (ER-S2 prompt-native 2.6-3.0 s) · longest shots 4.5 s (lockup) and 4.0 s (proofs) · hero moments at 9%, 38%, 86% RT · 15 scene changes, 12 hard cuts (80%) · signature "Send → develop" used 4 times · hero one-offs: UI morph (#3), screen-to-world (#7), implosion (#14) · 1 true 3D beat (8.9% RT) · 1 whoosh, 1 swish sequence · F11 hits at 4.07, 15.35, 18.4, 38.67 s (all ≥1.4 s apart) · one breakdown (13% RT).

**Cutdowns from this master** (remove whole blocks, then re-time; P08 §17.5):
- **30 s (16:9 / 1:1, PL-30):** #1 hook (2.0) → #2 setup (2.0) → #3 reveal (2.0) → #4 (1.5) → #5 trimmed (3.5) → #7 hero (3.5) → #8 answer (3.5) → #11 stat (2.0) → #13 trust (2.0) → #14 climax (2.0) → #15 bookend (1.5) → #16 lockup (4.5). Total 30.0 s; climax at 22.0 s (73%, within the 70-80% band for ≤30 s films).
- **15 s (9:16, PL-15):** "40 tabs. 3 days." (1.5) → prompt typed (2.5) → orb + name (1.5) → answer develop with the citation popover (4.0) → "12 min" (2.0) → CTA + lockup (3.5). Re-layout: prompt bar and brief 75% W = 810 px; all text inside x 120-840, y 270-1210; orb at y 40%.
- **6 s bumper (PL-05):** orb wakes on f0 → "Orrin 2. Research, answered." → URL, still ≥2.0 s.
- **12 s docs loop:** #2 → #8 → back to an empty prompt bar; first and last frames identical; no music.

---

## 14. Building it: motion-kit versus custom, generative video and 3D

### 14.1 What the motion-kit template engine covers

The kit (`motion-kit/`, Remotion 4, 30 fps) builds a film from a JSON spec of scenes. Scene types: `hook, kinetic, orb, title, stat, list, compare, bars, grid, quote, prompt, chat, wave, image, clip, cta, logo`. Themes: `midnight, clean, neon, editorial, pop, desi, corporate, mono, studio, studio-dark`. Formats: `reel` 1080×1920, `portrait` 1080×1350, `square` 1080×1080, `landscape` 1920×1080. The nearest ready-made recipe is `motion-kit/specs/recipes/launch-film-16x9.json` (orb → kinetic → prompt → wave → stat → list → title → cta → logo), described as a calm ElevenLabs / Apple-style launch for an AI, audio, SaaS or design product.

**The AI-native scenes and what they give you:**

| Kit scene | AI use | What it renders | Limits |
|---|---|---|---|
| `orb` | Reveal; the AI's face | A soft orb that breathes with the voice + headline ≤6 words + sub ≤12 words; `colors` sets the ramp | As scene 1 it needs narration to show text on f0, so open silent films with `kinetic` or `hook` first |
| `prompt` | Ask → Think → Answer in one scene | Prompt typed into an input, cursor clicks the button, "Generating…" shimmer, result (`resultKind: text` or `audio`) | One shimmer style; no AI-colour develop on the result; no cut-in |
| `chat` | Follow-up, assistant reply | Prompt typed letter by letter, then a reply bubble (≤14 words) | No streaming at machine pace; one exchange |
| `wave` | Voice and audio products | Waveform playing with the narration; words light up karaoke-style; tags such as `"[calm]"` | Driven by `say`; not by the product's real output audio |
| `stat` | Latency, scale, beta results | One number counting up with a meter | One number per scene; no source line field: put the source in `kicker` |
| `bars` | Evals, version vs version | 2-6 bars growing, one highlighted | No footnote field: the eval name and date go in `title` (≤7 words) |
| `list` (`checks`) | Agent steps, capabilities | 1-5 rows at reading pace | Rows reveal; no active-step shimmer or progress state |
| `compare` | Old way vs with AI | Muted left ✕ vs hero right ✓ | — |
| `grid` | Capabilities, integrations, languages | 2-6 emoji tiles | Emoji only; licensed logos need `image` |
| `kinetic`, `hook`, `title` | Hook, bookend with strike, trust line | Slammed lines; struck value + punch; kicker + headline | — |
| `image`, `clip` | Real UI captures; custom renders; generated plates | Slow camera move; muted footage with overlaid words; `clip.generated: true` adds the "AI-generated" tag | Bring all real UI choreography in here |
| `cta`, `logo` | Close | `style: "link"` = quiet "Try X →" with a drawn underline; logo + name + tagline | Check the lockup holds ≥2.2 s still |

**Theme and motion by AI sub-type:**

| Sub-type | Theme | `motion` | `transition` | Master style |
|---|---|---|---|---|
| Model / API / agent, calm premium | `studio` (light) or `studio-dark` | `calm` (0% overshoot, blur word-in) | `auto` or `blur` | ST-A3 |
| AI feature in an existing tool, connector | `clean` or `corporate` | `smooth` | `cut` / `push` | ST-A2 |
| Voice / audio product | `studio` | `calm` | `blur` | ST-A1 / ST-A3 |
| Dev tools, infra, chips | `midnight` or `neon` | `snappy` | `whip` / `cut` | ST-E2 |
| Editorial / research brand | `editorial` or `mono` | `smooth` | `fade` / `cut` | ST-A3 |

Never `motion: "bouncy"` (spring overshoot; the master requires 0% on type, UI, logo and orb).

**Storyboard → kit mapping (Orrin 2):**

| Storyboard beat | Kit scene | Fidelity |
|---|---|---|
| #1 hook | `kinetic` `["40 tabs.", "3 days.", "One *brief*."]` | Good. Lines slam one at a time instead of live-appending; punch approximated by `transition` |
| #2 typed prompt + #3 reveal | `orb` then `prompt` (the kit's prompt scene contains typing, click and "Generating…") | Partial. No bar → orb morph; the order becomes reveal → prompt |
| #4-5 plan and reading | `list` with `style: "checks"` | Partial. No streaming chips, counter or active-step shimmer |
| #6 citation cut-in | `image` (`fit: "contain"`, `move: "in"`) of the real highlighted source | Acceptable if the capture is real; or fold into the custom clip |
| #7 hero 3D transfer | **Not in kit** → custom render as `clip` | Custom Remotion + three.js or AE |
| #8 answer with citations | `clip` (custom) or `image` of the real brief | Partial; the develop and popover need custom work |
| #9 follow-up | `chat` | Good |
| #10 share | **Not in kit** (cursor + menu + toast) | Custom, or drop it |
| #11 number | `stat` | Good |
| #12 eval | `bars` with the source in `title` | Good; footnote size depends on the theme's title size |
| #13 trust | `title` (kicker "Your data") | Good, but no real toggle |
| #14 climax | **Not in kit** | Custom, or replace with `kinetic` |
| #15 bookend | `hook` (`setup`, `strike: "3 days"`, `punch`) | Good |
| #16 lockup | `cta` (`style: "link"`) → `logo` | Good |

**Kit spec for the Orrin 2 film** (fictional; every number is a placeholder). `npm run check` validated this schema and timed it at **48.9 s** (12 scenes, `pace: normal`, no `duration` overrides). Its only errors are the two missing asset files (music and logo); its warnings are the music-licence reminder and a long `bars` title (6 words / 43 characters, still inside the 7-word cap). Note: the checker verifies `image`, `logo`, music and logo paths but **not `clip` paths**, so confirm `public/clips/orrin-sources-to-brief.mp4` exists before rendering (kit `scripts/check.mjs` media list). Forcing shorter `duration` values to reach 45.0 s triggered the kit's reading-time warnings on 8 scenes, so keep the kit cut at ≈49 s, or remove the `stat` scene (≈3.7 s) rather than shortening every scene (P08 §17.5: cut whole blocks).

```json
{
  "_note": "Orrin 2 is fictional. Every number is a placeholder until it is on the signed claims sheet. Hero transfer comes from a custom render in clips/.",
  "format": "landscape",
  "theme": "studio",
  "motion": "calm",
  "pace": "normal",
  "transition": "auto",
  "brand": { "name": "Orrin", "accent": "#4338CA", "logo": "brand/orrin.png" },
  "audio": { "sfx": true, "music": "music/orrin-120bpm.mp3" },
  "scenes": [
    { "type": "kinetic", "lines": ["40 tabs.", "3 days.", "One *brief*."] },
    { "type": "orb", "headline": "Meet *Orrin 2*.", "sub": "A research agent that cites its work.", "colors": ["#C8B8E0", "#A8C8E8"] },
    { "type": "prompt", "label": "Ask Orrin", "prompt": "Brief me on EU battery rules.", "button": "Research", "result": "Brief ready · 38 sources", "resultKind": "text" },
    { "type": "list", "title": "It reads *everything*", "style": "checks", "items": ["Searched 112 sources", "Read the 38 that matter", "Cross-checked every claim"] },
    { "type": "clip", "src": "clips/orrin-sources-to-brief.mp4", "caption": "Every claim, *cited*.", "area": "bottom", "scrim": 0.3, "duration": 4.2 },
    { "type": "chat", "label": "You → Orrin", "prompt": "Make it a one-pager for the board.", "reply": "Done. One page, 12 *citations*." },
    { "type": "stat", "kicker": "Beta · median", "value": "12 min", "label": "to a *cited* brief" },
    { "type": "bars", "title": "Citation accuracy · internal eval, Sep 2026", "unit": "%", "bars": [ { "label": "Orrin 1", "value": 81 }, { "label": "Orrin 2", "value": 94 } ], "highlight": 1 },
    { "type": "title", "kicker": "Your data", "headline": "Your files stay *yours*.", "sub": "Never used for training." },
    { "type": "hook", "setup": "A cited brief:", "strike": "3 days", "punch": "*12 minutes.*" },
    { "type": "cta", "style": "link", "kicker": "Research, *answered*.", "action": "Try Orrin 2", "sub": "Available today · app and API", "handle": "orrin.example" },
    { "type": "logo", "name": "Orrin", "tagline": "Research, answered." }
  ]
}
```

Silent, music-led film: no scene has `say`. For a narrated version give every scene a `say` (numbers as words: "twelve minutes") and the engine times scenes from the voice; the checker warns on a mix.

**Workflow** (`skills/motion-director/references/production.md`): `npm run check -- specs/orrin.json` → `npm run qa` → `npm run brand -- <logo> --spec specs/orrin.json` → `npm run music -- specs/orrin.json --track music/orrin-120bpm.mp3` (snaps cuts to beats, writes `audio.beats`) → `npm run make -- specs/orrin.json --crf 18`. Pass `--crf 16-18` (not the default 20) for UI-, code- and gradient-heavy AI films (P11 AA-T8). Vertical cut: `format: "reel"`, keep 5-7 scenes (hook → orb → prompt → stat → cta → logo).

**Known kit gaps for AI launches** (build outside the kit, bring in as `clip`):
1. The AI-colour develop (gradient write 12 f + settle 6 f, duotone, mosaic) and machine-pace streaming.
2. Agent step states (active shimmer, check, dim) and live source chips with counters.
3. Real UI choreography: cursor paths, popovers, menus, toasts, locked-anchor slot machines (P06 UI-P1 to P5).
4. Morphs: prompt bar → orb, orb docking into the UI.
5. 3D: screen-to-world pull-back, particle transfer, dolly, stepped orbit, implosion.
6. The orb reacting to the *product's* output audio (the kit orb breathes with `say` narration).
7. Code blocks (use `image` of real code, or a custom clip with tokens 1 per 3-4 f).
8. Frame-exact SFX on press frames and peak velocity, and the suck-out on send (the kit places SFX per scene).

### 14.2 Custom Remotion or After Effects (deterministic: all UI, output, type, numbers)

P11 AA-T rules: drive every value from the frame number; clamp every `interpolate`; ease tokens only (`Easing.bezier(0.33, 1, 0.68, 1)` and the rest of §7.1); `spring` only as E-CRIT (stiffness 179, damping 26.8); zoom in log space; fonts loaded with explicit weights before measuring; one string table for prompts, outputs and model names; the cue sheet generated from the scene event list (press frames, result-appear frames, peak-velocity frames); ProRes 4444 (`yuva444p10le`) for transparent overlays. **The orb is code** (three.js / shader: radius 3.5, 64 segments, 7 drifting ovals, ramp black → c1 → c2 → white, the listening/talking functions in §7.2), deterministic per frame and loopable (P10 §14.5 [E]). Never ship raw LLM output as a spec or as on-screen copy (P11 AA-T11).

### 14.3 What needs generative video (Flow / Veo / Sora / Runway / Kling / Higgsfield)

Generate **only what is allowed to vary** (P11 §21.1, P10 §14.5): atmosphere, place, people using the product without readable screens. Never the UI, the model's output, text, numbers, charts, code, the logo, the orb, or hardware geometry (P11 AA-G9, P10 3D-AI1).

| AI-launch need | Generate? | How |
|---|---|---|
| Blurred "life" plate behind a glass prompt card (desk, office, field) | Yes | One slow move ≤0.2% W/f; defocus 2-4% W (≈40-75 px @1080) in compositing; one plate style for every plate (kivi's mismatched gouache / watercolour / flat plates are its biggest flaw) [V:1-6l8S] |
| Person speaking to a voice product | Yes, faces small or cast with consent | Lip-sync is not needed if the face is soft; the voice track comes from the real product |
| Abstract material for a hero (liquid glass, light through fabric) | Possible | Clean background, one camera move; composite the orb and type later |
| The orb, aurora, gradients | **Prefer code** | Deterministic, loopable, brand-exact, audio-reactive [E] |
| Data-center / server-room B-roll for infra launches | Avoid (cliché) | If used, one plate, defocused, no signage |
| Chips, devices, hardware | **No** | 3D render or supplied renders; generators drift on product geometry (P10 §14.5) |
| UI, outputs, code, eval charts, logos, any text | **No** | Deterministic layers only |

**Operating rules (P11 AA-G, P10 §13.9):** Veo 3.1 clips are 4, 6 or 8 s at 24 fps (extension adds 7 s; native 9:16 since Jan 2026) [P]; generate 1.5-2 s longer than the edit and use the middle; one named camera move per clip; prompt order Cinematography → Subject → Action → Context → Style; repeat the continuity block (palette hex, key direction, lens, grade, grain) verbatim; describe the empty space the 2D layer needs; negative noun list "text, subtitles, captions, letters, watermark, logo, numbers, signage, screen content, user interface"; ≤3 reference images and a fixed seed per look; 2-4 takes per shot; mute generated audio; upscale before compositing; grade all plates together; keep a generation log; tag the shot `generated: true` in the kit.

**Example plate prompt (Veo / Flow):** "Slow dolly-in, 35 mm, from medium-wide to medium over 6 seconds, roll 0°. A quiet research office with a pale oak desk and a closed laptop, nobody in frame. Soft morning daylight from the top left. Large clean empty area in the upper half for graphics. Calm, airy, low contrast; off-white #F5F5F5 highlights, lavender #C8B8E0 shadows; fine grain 1%." Negative: "text, letters, logo, numbers, signage, screen content, user interface, people's faces, hands, lens flare".

**Example abstract prompt (Kling / Higgsfield / Runway):** "Locked-off static, 85 mm look. A soft sphere of frosted glass on a seamless off-white set, lit from the upper left; inside it lavender and sky-blue light moves very slowly, like ink in water. No camera movement. Minimal, calm, product-photography lighting, shallow depth of field." Use it only as a background plate under the code-driven orb or as a texture; never as the logo.

### 14.4 What needs 3D

| Shot | Why 3D | Spec |
|---|---|---|
| Sources → brief transfer (#7) | Real parallax and DOF sell "the agent reads and synthesises" | ×0.32 pull-back in ≈1 s; 200-300 discs from the cards' colours; 0.95 s sweep; ×2.2 dolly in 15 f; 3 planes; one key light matching the 2D shadows; real textures ≥1.5× output |
| Climax ring + stepped orbit + implosion (#14) | Rotation around a hub; many → one | 10 f steps, gaps shrinking (accelerando); ≤12 sparks; text faces camera on the focal plane |
| Hardware or chip hero (infra launches) | Generators drift on geometry | Blender / C4D from CAD; slow push 1.05-1.10 over 3-6 s holds; bloom on emitters only (P10 ST-B) |
| Orb | Shader-based "3D-like" object | Code (three.js), not a render farm job |

Tools: Remotion + `@remotion/three` for UI planes and particles; Blender or Cinema 4D for materials and hardware; the Higgsfield 3D scene builder for blockouts. Hand off 2D ↔ 3D only through a motivated move (tilt onto a plane, screen-to-world pull-back), never a crossfade (P10 #24). One hero 3D beat, 10-15% of runtime at most (P10 #2).

---

## 15. QC checklist for this format

Run per shot (Gate 1), on the locked cut (Gate 2) and on the final MP4 (Gate 3) (P11 §22). **S1** blocks release; **S2** must be fixed or signed off.

**Truth and claims (AI-specific)**
- [ ] Every prompt and output on screen is from a logged run of the shipping model; run IDs recorded in the shot list (S1).
- [ ] Prompt, output and model-name strings are identical across shots, cutdowns and the post copy (one string table) (S1).
- [ ] Claims sheet signed before the edit locks: every number with source, date and n; eval name, date and n on screen ≥3% H (S1).
- [ ] Eval bars start at zero, use one eval and one setting, and compare version to version unless legal approved a named competitor (S1).
- [ ] No footage is sped up to imply latency; any compressed wait carries a visible time label (S1).
- [ ] Trust lines (data use, privacy, controls) approved by the product owner and true at launch (S1).
- [ ] Generated footage tagged ("AI-generated" / `generated: true`) and logged; no generated UI, text, logo, numbers or hardware (S1).

**Story and copy**
- [ ] Hook text on f0, motion by f3; 1.2-2.4 s; ≤7 words; the mechanic visible (S1).
- [ ] Name ≤2.4 s (≤5 s after a typed setup); first real UI ≤8 s (S2).
- [ ] One demo grammar (Ask → Think → Answer → Detail) repeated in every proof block (S2).
- [ ] Bookend returns the hook's line or number (S2).
- [ ] CTA = verb + destination + availability line; cap ≥5% H; URL ≥3.5% H, ≥2 s (S1 for performance cuts).

**AI states and UI**
- [ ] AI colour appears only during transitional states, 8-15 f, settling in 6-8 f; never on resting UI; duotone never >15 f (S2).
- [ ] "Thinking" is an 8-9 f empty hold plus a music dip; no fake progress bar; no indicator or shimmer >1 s with nothing else happening (S2).
- [ ] Machine-pace streams are texture only; every output that proves quality is held still ≥1.0 s + reading time and cut into at 2-3.5× (S2).
- [ ] Must-read text cap ≥3% H (≥4% after a cut-in; ≥52 px at 9:16); nothing that carries meaning below 2.5% H (S2).
- [ ] Every click has a visible cause and a consequence 3-8 f later (S2).
- [ ] Orb moves only with product states; drift barely visible; no spin (S2).
- [ ] Particles are made of on-screen colours, move from a source to a destination and end in a state; ≤12 sparks in the climax (S2).
- [ ] 0% overshoot on type, UI, orb, logo and camera; one primary motion at a time (S2).

**Look**
- [ ] One accent hue ≤5% of the frame; ≤5 named colours; semantic table followed (S2).
- [ ] No AI clichés (brains, robots, circuit boards, binary rain, HUDs, lens flares, random particles) (S2).
- [ ] One key-light direction for 2D shadows, 3D light and plates; one plate style (S2).
- [ ] Contrast ≥4.5:1 (muted #777169-class greys only on large text) (S1).
- [ ] Gradients, orb and aurora dithered; no banding at CRF 16-18 (S2).
- [ ] At most 1 flash; ≤3 flashes per second (S1, photosensitivity). Every cut stepped ±10 f at 1-frame steps (S1).

**Sound**
- [ ] −14 LUFS ±1 (−16 for VO-led landing-page embeds; P09 §16.11.1), ≤ −1 dBTP, measured on the final MP4 (S1 for overs).
- [ ] Clicks on press frames; result hits ≈4 f after the result appears; no glitch or bleep "AI" textures; ≤2 whooshes (S2).
- [ ] Product audio (voice, generated sound) is the hero layer where it exists; music ducked 10-12 dB under it (S2).
- [ ] Sting on the lockup ±2 f; music ends with or after the last frame (S1).
- [ ] The film works muted (muted phone test with someone outside the team) (S2).

**Delivery**
- [ ] 1920×1080+, 30 fps native (or 24 fps if generated plates dominate), 0 duplicated frames (S2).
- [ ] H.264 CRF 16-18, 12-20 Mb/s, yuv420p, BT.709 tagged (S2).
- [ ] 9:16 and 1:1 are re-layouts; text inside x 120-840, y 270-1210 on 9:16 (S1 for clipped text).
- [ ] Kit builds: `npm run check` passes with no errors; `clip` files confirmed by hand (the checker does not test them) (S1).

---

## 16. Common mistakes in AI / technology launches (and fixes)

| # | Mistake | Seen in / source | Fix |
|---|---|---|---|
| 1 | Long AI answer streamed past too fast to read, carrying the proof | HubSpot's ≈60-word answer scrolled in ≈1.5 s [V:1CSXtQ §8] | Stream as texture, then hold and cut in on one proof line ≥1.0 s |
| 2 | AI effect colour or duotone held on resting UI | Wix teardown: duotone >≈15 f reads as a glitch [V:15VhHR] | 8-15 f, then settle to final colours in 6-8 f |
| 3 | Fake progress bars, long spinners, "thinking" with nothing happening | P06 UI-E22, UI-E04 | 8-9 f empty hold + music suck-out; shimmer ≤1 s |
| 4 | Generated "life" plates in mismatched styles, mushy faces | kivi's gouache / watercolour / flat plates; crowd faces at 64-69 s [V:1-6l8S] | One plate style, one light, one grade, restated in every prompt; defocus 2-4% W; or no people |
| 5 | Greeked, low-res or placeholder UI in the 3D hero beat | HubSpot 18.4-19.0 s [V:1CSXtQ] | Real strings; textures ≥1.5× output |
| 6 | Hook type too small for phones | HubSpot cap 3.6% H [V:1CSXtQ] | Cap ≥6.5% H |
| 7 | Generic "neon tech" visuals, random particles, glowing brains and robots | Named in P02 AD-A8, P11 AA-12; no reference uses them | Abstractions made of the product's own colours and objects; one abstract face (orb) at most |
| 8 | Glitch, bleep and "computer" SFX under AI moments | P09 F14 | Silence (suck-out), then a hit ≈4 f after the result appears |
| 9 | Invented or unsourced numbers; LLM-written copy and values | P11 MK-P10, QC-SaaS2 | Claims sheet signed before lock; one string table |
| 10 | Misleading benchmark charts (truncated axis, cherry-picked competitor) | [inferred] | Zero baseline, one eval, source line on screen, version vs version |
| 11 | Speed-ups that imply latency the model does not have | [inferred] | Real-time capture or a labelled time cut |
| 12 | Fast-spinning or edit-synced orb ("screensaver") | P10 3E-10 [E] | Drift period of minutes; react only to listen / talk / generate states |
| 13 | Text-card fatigue: claims with no runs between them | kivi 5 text cards in a row; HubSpot 4 same-size end cards [V:1-6l8S] [V:1CSXtQ] | ≤3 cards in a row; put a real run between claims |
| 14 | Weak ending: bare URL, no availability, music gone before the picture | kivi, Lottieicon (music ended 3.7 s early) [V:1-6l8S] [V:1ccYWJ] | Tagline → lockup → "Try X →" + availability; still ≥2.2 s; sting on the lockup |
| 15 | Delivery judder and low bit rate that smear UI text and code | 25 → 30 fps duplicates in 3/8; HubSpot ≈176 kb/s at 720p | 30 fps native (24 if generated-led); CRF 16-18, 12-20 Mb/s |
| 16 | Loudness off target | kivi −10.7 LUFS; NOSTRA −7.9 LUFS / +1.6 dBTP | −14 LUFS ±1, ≤ −1 dBTP |
| 17 | Bounce and overshoot on UI, type or orb | Kit `bouncy`; Remotion default spring (16.3%) | E-OUT / E-CRIT; kit `motion: "calm"` or `"smooth"` |
| 18 | Morphing generated geometry between two states | P03 MP-SaaS7; HR-06 [V:126cpH] | Switch states on one frame and add a physical or colour reaction |
| 19 | Model name and version spelled differently across shots | Copy drift class, P11 AA-T [V:15VhHR] "make" vs "create" | One string table; QC every string |

---

*Sources: master parts P01 (§2.1-2.14, templates T1/T4/T5/T6/T10, hook library), P02 (AD-U2, AD-U4, AD-S1-S9, AD-A8, AD-SaaS1-3, §11.7-11.8, §11.13), P03 (§19.3 eases, SP-X3, ML-31, MP-SaaS7, streaming rows), P04 (defaults, CM-04, CM-10, §6.4-6.5), P05 (defaults, §7.5, TR-22), P06 (UI-E03, UI-E04, UI-E17, UI-E22, UI-P1-P5, UI-R), P07 (RV-06, TY-SaaS2, TY-SaaS13), P08 (ER-S2, PL-05/15/30/45/60/90L, §17.5), P09 (SD-T, SD-AR, F01-F18, §16.10), P10 (3E-08, 3E-10, §13.9, HR-01, HR-04, HR-08, HR-11, §14.5, ST-A1/A2/A3/B, §11.1), P11 (AA-G, AA-T, MK-P10, QC-SaaS1-3, §21-22); teardowns [V:1-6l8S], [V:1CSXtQ], [V:15VhHR], [V:19NRDv], [V:1ccYWJ], [V:1Hcg3X], [V:126cpH], [V:1i2L14]; [E] ElevenLabs style brief; [S:Airtable]; motion-kit `specs/recipes/launch-film-16x9.json`, `scripts/check.mjs`, `skills/motion-director/references/scenes.md`. The Orrin 2 kit spec was validated with `npm run check` (48.9 s, 12 scenes). Contrast values marked "computed" were calculated with the WCAG 2.x formula for this guide.*
