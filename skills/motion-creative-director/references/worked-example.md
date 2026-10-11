# Worked example: "Lumen" AI voice studio, 45 s launch film (16:9) + 20 s cut-down (9:16)

A complete Phase 14-18 run of the motion-creative-director prompt system, from the questions to the
QC record. Use it to match the **depth and format** of a real package. Never copy its content: Lumen,
its voices, its numbers and its UI are fictional, invented only to make this example concrete.

**Sources this package follows.** Master parts P01-P11 (`research/master/01-11`), and the format guide that
fits a voice/audio AI product, **Guideline 03 AI / Technology Launch Video** (`research/guidelines/03-ai-technology-launch-video.md`):
the 8-stage AI launch arc and 45 s timing column (§4.1), the Ask → Think → Answer → Detail proof grammar (§4.3), the
sub-type row "Voice, speech, audio model → T1 Say → See, ST-A1 or ST-A3" (§2), the motion numbers card (§7.2), camera
budget (§8), transition budget (§9), UI rules (§10), music arc and SFX map (§11), copy rules (§12) and the
motion-kit mapping (§14). Guideline 01 (SaaS launch film) is the secondary reference for the lockup and cut-down
rules. Rule IDs (CM-, TR-, E-, G-, F-, P0x) point back into those files. Reference films are cited by the user's
analysed video IDs, e.g. [V:1-6l8S] (`research/videos/<id>.md`).

**How the facts work in this example.** Every product fact (features, voice names, numbers, availability) is an
*assumed answer* to a Phase-14 question, listed in §0. In a real job each one comes from the user and every
number goes on a signed claims sheet before the edit locks (G-02). Here they stand in for user-supplied facts
so the package can be complete; none of them describes a real product.

Frame convention: 30 fps, frames counted from f0. "f60-119" means the shot's first frame is f60 and its last
frame is f119. Seconds are frame ÷ 30. Music grid 120 BPM: beat = 15 f, bar = 60 f, beat n sits at n × 15 f.

---

## Contents

0. Phase 14: the questions asked, and the assumed answers
1. Part A: Concept
2. Part B: Creative direction (Direction Card + reference films)
3. Part C: Structure (stage table)
4. Part D: Scene-by-scene storyboard (16:9 master), rhythm check, 9:16 cut-down
5. Part E: Per-shot production prompts (all 16 shots)
6. Part F: Continuity bible and Scene N → N+1 notes
7. Part G: Sound cue sheet, string table, claims sheet, data sheet
8. Part H: Delivery and format plan
9. Phase 18: QC gate results, the revisions it triggered, open items, QC record
10. Motion-kit spec (JSON) for the parts the template engine renders directly
11. Next step

---

## 0. Phase 14: the questions asked, and the assumed answers

The request arrived as: *"Launch video for Lumen, our AI voice studio. 45 seconds, 16:9, plus a vertical
cut-down."* That message already answers duration (#6) and aspect (#5). A 45 s multi-feature launch with a
cut-down counts as a **flagship brief** under the selection logic, so the remaining questions go out **in one
message**, grouped and numbered, each with a suggested default so the user can reply "defaults are fine".

**The message sent (18 questions; #5 and #6 were not re-asked):**

> Before I storyboard Lumen, a few answers change the film. Reply "defaults" to any item to accept my suggestion.
>
> **Product and goal**
> 1. In one sentence, what does Lumen do, and who makes it? *(must know)*
> 2. What is this film's one job: launch awareness, sign-ups, or feature adoption? *(default: launch awareness with a sign-up CTA)*
> 3. Who watches, and what do they already know? *(default: creators and content teams who have never used an AI voice tool)*
> 4. Where will it run? *(default: website hero, YouTube, LinkedIn, X for 16:9; Reels/Shorts/TikTok for 9:16)*
> 8. The one sentence a viewer must remember? *(I'll draft it from your answers to #1 and #9)*
>
> **Proof**
> 9. Which 1-5 features, in order of importance? *(must know: they become the proof blocks)*
> 10-11. Can you share the real UI (Figma file or screen recordings at ≥ 2880 px wide) and logged runs (the exact script, the voice, the returned audio)? *(must know: I never generate UI or invent output)*
> — Which numbers can you sign (latency, languages, users)? Source, date and sample size for each. *(must know for the evidence beat; otherwise I cut it)*
> — Is there a trust line you can stand behind (consent for cloning, data use)? *(default: none; I won't write one you haven't approved)*
>
> **Look and sound**
> 12. Is there a video whose feel you want? What exactly do you like in it? *(default: none; I use the guideline's style row)*
> 13. 2D/UI-led, 3D, or hybrid? *(default: 2D/UI-led with one 3D hero beat)*
> 14. Tone mix: positioning dial (premium / playful / technical / cinematic as named dial positions), summing to 100. *(default: 45 / 20 / 20 / 15)*
> 15-16. Brand palette (hex) and fonts licensed for video? *(default: taken from the UI; one neutral grotesque)*
> 17. Should people appear? *(default: none)*
> 19-21. Type-led or voice-over? Music: do you have a licensed track? *(default: no narrator, Lumen's own voices are the audio hero; I write a music brief)*
>
> **Close and build**
> 24. What should the viewer do at the end (exact words and URL)? *(default: "Try Lumen" + your URL)*
> 25. Which tool makes it: motion-kit/Remotion, After Effects, Google Flow/Veo, Sora, Runway, Kling, Higgsfield, or "you decide"? *(default: hybrid: real UI and type composited, AI video only for backgrounds)*

**Assumed answers (the brief for this example).** Items marked *default* were accepted as suggested.

| # | Topic | Assumed answer | Consequence in the package |
|---|---|---|---|
| 1 | Product | Lumen is a browser-based AI voice studio by Lumen Labs: type a script, pick or design a voice, direct the read, dub it into other languages | Voice/audio sub-type → Guideline 03, template T1 |
| 2 | Objective | Launch awareness with a free-plan sign-up CTA | CTA "Try Lumen" + availability line (G-05) |
| 3 | Audience | Solo creators, podcasters, course and content teams; new to AI voice | One script followed end to end; no jargon |
| 4 | Platform | 16:9: website hero, YouTube, LinkedIn, X. 9:16: Reels, Shorts, TikTok | Sound-off safe; captions burned in 9:16 |
| 5 | Aspect | 16:9 master + 9:16 cut-down (given) | Re-layout, not crop (G-36) |
| 6 | Duration | 45 s (given); cut-down 20 s (default for one task end to end) | PL-45 column; 1350 f |
| 7 | Type | AI / technology launch, voice sub-type | Guideline 03 |
| 8 | Main message | "Type a line, and Lumen speaks it in any voice and language you direct." | Concept sentence, thesis "Type it. Hear it." |
| 9 | Features, in order | (1) Speak: script → voice; (2) Design a voice from a text description; (3) Dub into other languages in the same voice; (4) Direct the read with inline tags such as `[whispers]` | Proof A = design, B = dub, C = direct (order changed by QC, see R2) |
| 10-11 | Real UI | Figma file of the editor + screen recordings at 2880×1620; five logged runs R-01..R-05 (§G.6) | All UI rebuilt as vector layers; no generated UI |
| — | Numbers | C01: median 400 ms from pressing Speak to first audio (internal test, n = 1,000 runs, Sep 2026). C02: 29 dubbing languages at launch | Evidence beat S11-S12 |
| — | Trust line | C03: cloning a voice requires a verified consent recording from the voice's owner (approved by Lumen's product lead) | Trust beat S13 |
| 12 | Reference video | **[V:1-6l8S] kivi**: "the calm, airy feel and how each line builds itself; but ours should end better and not look like four different films" | Style ST-A1 base; kivi's flaws listed as don'ts |
| 13 | Dimension | *default*: 2D/UI-led, one 3D hero beat | Depth budget 1 beat (S08, 8.9 % RT) |
| 14 | Tone | 40 premium / 15 playful / 25 technical / 20 cinematic | Calm motion, real UI timings, one hero move per 9-20 s |
| 15 | Brand colours | Ink #121110, canvas #F7F5F2, brand brick #A63D2A; the waveform in the product glows amber → coral while generating | Palette and AI-colour family (§B) |
| 16 | Fonts | Inter (OFL, licensed for video), weights 300/400/500 | One family; no accent face |
| 17 | People | None on screen; the consent recording in S13 is from a Lumen team member with a signed release | G-03 |
| 18 | UI dominance | *default*: ≈60 % of proof time is UI | 2D editor carries S02-S10 |
| 19-20 | Text vs VO | *default*: no narrator; type-led; Lumen's own output voices are the audio | In-world product audio (F18), captioned by on-screen karaoke text |
| 21 | Music | No track yet; licence budget approved | Music brief, 120 BPM (§G.1) |
| 22 | Pacing | Calm, spacious | ASL ≈2.8 s; breather 13 % |
| 23 | Camera | *default*: breathing holds + motivated moves, one 3D hero move | Camera budget §B.8 |
| 24 | CTA | "Try Lumen" → lumen.example; "Free plan · available today" (C04) | Lockup S16 |
| 25 | Target tool | *default*: hybrid. motion-kit/Remotion for type and UI, custom Remotion + `@remotion/three` for the 3D beat and climax, **Google Flow / Veo 3.1** for two background plates | Layer split in every shot (AA-U1) |

Assumptions stated back to the user in one line: *"Assuming no narrator, Lumen's own voices as the audio,
Inter only, and a 20 s vertical cut; tell me if not."*

---

## 1. Part A: Concept

| Decision | Choice |
|---|---|
| **Concept sentence** (Direction Card #1) | **A typed line becomes a voice, shown as the flat grey line under the text rising into a living waveform the moment Lumen speaks it.** |
| Archetype | **A. Mechanic-as-grammar** (P01 §1.2): the film behaves like the product. Every shot that matters is "type → press Speak → the line lifts and speaks". |
| Positioning dial | 40 premium / 15 playful / 25 technical / 20 cinematic |
| Hook type | Pain question, live-typed (Guideline 03 §12.2): "Still booking a studio?" on dark, with a silent flat line under it |
| Reveal mechanism | The script line typed in the real editor is spoken; its waveform compresses into the Lumen mark (UI morph, TR-07) |
| Climax type | Collection (P01 §2.10): every waveform the film produced flies in, rings the centre, steps round twice and implodes into the mark |
| Ending | Callback lockup: the hook line returns struck through and resolves into the thesis, which stays on screen as the tagline above the mark, CTA link and URL |
| Main message | "Type a line, and Lumen speaks it in any voice and language you direct." |
| **Thesis line** (climax/bookend, ≤ 5 words) | **"Type it. Hear it."** (4 words) |

**Alternatives considered** (the brief was open on concept; one line each):
- **B. One-object journey:** one script line travels through every feature (voice, language, direction) as a paper strip that is passed between scenes. Strong spine, but the strip is a prop the product does not have, so the mechanic would be told, not shown.
- **C. Two-world contrast:** a grey "booked studio" world (mic stands, retake counters) against the warm Lumen world. Clear before/after, but it spends 15-20 % of runtime on a problem stage the references keep to ≤ 5 % (P01 §2.17 #1).
- **Recommended: A**, because Lumen's real value is the moment text becomes sound, and that moment can be the film's grammar four times without a prop.

---

## 2. Part B: Creative direction

### B.1 The Direction Card (15 decisions)

| # | Decision | Lumen |
|---|---|---|
| 1 | Concept sentence | As Part A |
| 2 | Archetype | A. Mechanic-as-grammar |
| 3 | Positioning dial | 40 / 15 / 25 / 20 |
| 4 | **World rule** | **Dark warm near-black #0E0D0C = the world without Lumen (hook) and the brand world (climax).** Warm off-white #F7F5F2 = the product world. **"Lumen is speaking"** = the AI-colour family amber #F6B26B → coral #EE7F6D, shown only while a waveform is being generated (12 f write + 6 f settle), never on resting UI and never as text colour on light (1.68:1 and 2.45:1 on canvas). A silent line is grey #8A847E (3.40:1 on canvas, 5.25:1 on dark: passes the 3:1 non-text floor). |
| 5 | **Accent** | One hue, one meaning: brick **#A63D2A = a word that is heard** (spoken words lighting up as Lumen says them, and the words "voice"/"hear"). 5.81:1 on canvas. Footage variant **#7A2A1C** (7.34:1 on the plate floor #E4E0DA) for any accent text over a generated plate. On dark: #F4A78F (9.96:1). ≤ 1 accent word per frame. |
| 6 | **Recurring motif** | **The line.** Roles: (1) hook: flat and grey under the typed question = silence; (2) every proof: it rises into a waveform when Lumen speaks; (3) Proof B: it lifts off the screen as a 3D ribbon and becomes three languages; (4) climax: every waveform collapses back into one line; (5) lockup: the line with one peak *is* the Lumen mark. 5 roles (≥ 3 required). |
| 7 | **Signature device** | **Speak → develop** (Guideline 03 §7.3 "Send → develop"): a press on Speak / Design voices / Dub → cut or state change 6-8 f later → **8 f empty hold** with a music suck-out ≥ 15 dB → the flat line writes in the AI gradient over **12 f**, settles to ink in **6 f** → the voice plays. Trigger rule: every press that makes Lumen generate audio, and nothing else. Budget 4 uses (S02→S03, S05→S06, S07→S08, S10); 45 s band 4-8. |
| 8 | **Depth budget** | One 3D beat: S08 (f570-689, 4.0 s = **8.9 % RT**; cap 10-15 %). Max 3 planes. Everything else orthographic 2D. |
| 9 | **Copy voice** | Second person, sentence case, Inter 300 for statements / 400 UI / 500 CTA, ≤ 6 words per card, the heard word in the accent, no exclamation marks, digits on screen |
| 10 | **Demo grammar** | Ask (type or pick) → Think (8 f empty hold + suck-out) → Answer (develop + the voice plays) → Detail (held ≥ 1.0 s, read at ≥ 4 % H) → Label after the result ("show, then label") |
| 11 | Hook type | Pain question, live-typed, mechanic visible (caret + silent line), ≤ 7 words, text on f0 |
| 12 | Reveal mechanism | Spoken line → waveform → TR-07 UI morph into the mark + wordmark |
| 13 | Climax type | Collection → stepped orbit → implosion (many → one) |
| 14 | Ending | Bookend callback → anchored tagline → lockup + "Try Lumen →" link + availability + URL; music resolves on the lockup frame ±2 f |
| 15 | Narration | In-world product audio: Lumen's output voices only (F18), music ducked 10-12 dB under them. No narrator. Muted viewers read every spoken line as on-screen karaoke text |

### B.2 Style category, with its numbers (G-13)

**ST-A1 Airy Calm-Tech** (P10 §ST-A1, measured on kivi [V:1-6l8S]) as the base, with **ST-A3 calm-editorial
type** (light-weight grotesque, P10 ST-A3) and **one ST-A2 depth beat** (P10 ST-A2, measured on HubSpot [V:1CSXtQ]).
Aurora is dropped: Lumen's brand has no aurora, and the warm off-white canvas carries the "air" instead.

| Facet | Value |
|---|---|
| ASL band | 2.6-3.0 s (ER-S2 prompt-native band; ST-A1 measured 2.36 s). Planned: 16 shots, **ASL 2.81 s** |
| Ease family | E-OUT entrances, E-EXIT exits into cuts, E-GLIDE cursor, E-INOUT pull-backs and morphs, E-LERP line re-centre, E-LINEAR breathing/strikes/counters/fades, E-SNAP climax arcs, E-SNAP-L counter, E-HOP orbit steps, E-ZOOM log-space pull-back, E-PUNCH into two cuts (P03 §19.3). Banned: Remotion default `spring()`, kit `motion: "bouncy"` |
| Overshoot policy | **0 %** on type, UI, waveform, mark, camera |
| Durations | Text entrances and exits per P03 SP-T0 (words 4-7 f, statements 8-14 f; exits 4-6 f, whole cards 4-8 f); UI state changes 1-3 f; dropdown 6 f, rows 2 f apart; popover 2 f |
| Motion-blur rule | Only where an element exceeds 5 % W/f: S08 dolly, S14 arcs and implosion. 180° shutter. Never on UI or type that is being read |
| Grain rule | Generated plates: 1 % film grain baked in the prompt and matched in the grade. 2D layers: no grain; 1-2 % dither noise on the AI-gradient waveform and the S08 background radial before 8-bit encode |
| Depth recipe | 2D shots: depth from the card shadow only (y 24 px, blur 48 px, 7 % ink, + 1 px hairline #E6E2DD). S08: 3 planes (foreground ribbon, focal ribbon group, background radial), far plane blurred ≈12 px @1080 |
| Music mode | Restrained electronic, pad-led, soft plucks, sparse kick after the drop, 120 BPM, no trailer drums (§G.1) |

### B.3 Copy voice and type (summary; full tokens in §F)

One family, **Inter**. Statements Inter 300, tracking −0.02 em; UI Inter 400; CTA Inter 500. Sentence case.
≤ 6 words per card. The heard word in brick. Hook cap 6.8 % H (≥ 6.5 % floor, never HubSpot's 3.6 % [V:1CSXtQ]).
Every must-read string ≥ 3 % H cap; ≥ 4 % H after a cut-in.

### B.4 Sound direction (summary; cue sheet in §G)

120 BPM pad-led bed, edited on bar lines. Sub hit on f0; near-silence under the typed setup; riser crest f115,
gap, **drop on f122**. On every Speak press, music sucks out ≥ 15 dB ("Lumen is thinking" is silence, not a
sound, Guideline 03 §11.3); result hits ≈4 f after a result appears **only when no voice starts there**; under
Lumen's voices the music ducks 10-12 dB and nothing transient plays. Low-pass breakdown 30.0-36.0 s; densest
re-entry at the climax; 150 ms gap; sting on the lockup ±2 f; the music ends with the picture. −14 LUFS ±1,
≤ −1 dBTP. SFX families F01, F02, F03, F06, F07, F08, F09, F11, F12, F16, F17, F18 (P09 §16.7).

### B.5 Reference films: what we take, what we avoid (by analysed video ID)

| ID | Film | We take (measured) | We avoid (measured flaw) |
|---|---|---|---|
| **[V:1-6l8S]** | kivi voice-AI launch, 77.8 s (the user's named reference) | The Say → See loop, inverted here to Type → Hear; word-append lines that re-centre with E-LERP k 0.22 in 13-14 f; breathing pushes on every hold; E-PUNCH +18-33 % into a cut (≤ 4 per film); the grey → colour bloom rule, re-cast as grey line → AI-colour waveform on **every** Speak; in-world voice as the only voice | Three different plate styles (gouache / watercolour / flat) → we generate **one** location in two lights with one seed; 5 text cards in a row → max 2; UI text 1.2-2 % H → ≥ 3 % H; bare-URL ending → full lockup; −10.7 LUFS → −14 LUFS |
| **[V:15VhHR]** | Wix AI site builder, 53.9 s | A reserved "AI is working" colour family that is transitional (8-15 f); generation shown as a develop, not a progress bar; music suck-out on the send click (t = 12.2-12.6 s) | "make" vs "create" copy drift → one string table; duotone held > 15 f |
| **[V:1CSXtQ]** | OpenAI × HubSpot connector, 30.0 s | One 3D beat (3.67 s = 12 %) built from a screen-to-world pull-back ×0.57 in 10 f then ×0.56 over ≈19 f and a ×2.3 dolly in ≈15 f; polarity-flip cold open | Hook cap 3.6 % H; greeked low-res UI on the 3D plane → our textures are the real vector UI at ≥ 1.5× output |
| **[V:19NRDv]** | Bumper PRO, 67.2 s | Stepped orbit (9-12 f steps) and an implosion climax with ≤ 12 sparks (t = 55.27 s) | 1-frame dips to black at cuts |
| **[V:1ccYWJ]** | Lottieicon, 44.3 s | Nothing structural | Music ending 3.7 s before the picture; no end lockup |
| **[V:126cpH]** | Chowdeck, 18 s, the only 9:16 reference | State switches on one frame instead of generated morphs (our `[whispers]` chip insert, the "Verified" status) | Key message too late in the hook |
| **[V:1i2L14]** | NOSTRA, 35.1 s | Typing-indicator timing only | −7.9 LUFS / +1.6 dBTP mix |
| **[V:1Hcg3X]** | Solar explainer, 35.8 s | Particles with a direction and an end state → every flying waveform in S08 and S14 ends in a state (a language lane, the mark) | Ending mid-motion with no logo |

### B.6 What this film will not contain

No glowing brains, robots, circuit boards, binary rain, HUDs, lens flares, random particles, glitch or bleep
"AI" sounds (Guideline 03 §6.1, §11.3). No generated UI, text, numbers, logo, waveform, or people (AA-U1).
No competitor names. No sped-up footage implying latency.

---

## 3. Part C: Structure

**Template: T1 Say → See** (P01 §2.4, [V:1-6l8S]), inverted to **Type → Hear**, in Guideline 03's **8-stage AI
launch arc**. Why it fits: Lumen turns an input (a typed line) into an output (a voice), which is exactly the
T1 loop; the AI arc adds the Evidence + trust stage every AI viewer needs. One template for the whole film (TS1).

**Stage table, 45 s master, 120 BPM, 1350 f** (Guideline 03 §4.1 column; shares identical to the column, so
inside ±3 points):

| Stage | Start-end (s) | Frames | % RT | Shots | Job | Music event |
|---|---|---|---|---|---|---|
| 1. Hook | 0.0-2.0 | f0-59 | 4.4 | S01 | Stop the scroll; the silent line shows what is missing | Sub hit f0; pluck per word; pad |
| 2. Setup / input | 2.0-4.0 | f60-119 | 4.4 | S02 | The real editor; a script line is typed; Speak is pressed. Name visible in the editor header from f60 | Near-silence floor + keystrokes; riser crest f115; gap f116-121 |
| 3. Reveal | 4.0-8.0 | f120-239 | 8.9 | S03-S04 | Lumen speaks the line; the waveform becomes the mark + wordmark | **Drop f122** (2 f after the cut); duck under the voice f126-178; groove from f180 |
| 4. Proof (3 blocks) | 8.0-28.0 | f240-839 | 44.4 | S05-S10 | A: design a voice (8.0 s); B: dub it (7.0 s, holds the 3D hero); C: direct the read (5.0 s). Blocks shorten | Steady pulse; suck-out on each press; hits 4 f after results that carry no voice |
| 5. Evidence + trust | 28.0-36.0 | f840-1079 | 17.8 | S11-S13 | One number, one scope line, one trust line | Groove thins f840; **low-pass breakdown f900-1076** (6.0 s = 13.3 % RT, the breather); 100 ms gap f1077-1079 |
| 6. Climax | 36.0-39.0 | f1080-1169 | 6.7 | S14 | Collect every waveform into the mark (starts at 80 % RT) | Re-entry, densest; swish per orbit step; hit + sub on the implosion f1160 |
| 7. Bookend | 39.0-40.5 | f1170-1214 | 3.3 | S15 | The hook returns, struck, resolved: "Type it. Hear it." (thesis) | Pluck on the landing f1197; 150 ms gap f1210-1214 |
| 8. Resolution | 40.5-45.0 | f1215-1349 | 10.0 | S16 | Lockup + CTA + availability + URL; still from 41.6 s | **Sting f1215**; tail 1.8 s; ≤ −60 dB at f1349 |

**Timing landmarks (Guideline 03 §4.2), planned values:**

| Landmark | Target | Planned |
|---|---|---|
| Hook text on f0, first change ≤ f3 | f0 / ≤ f3 | "Still booking" on f0; "a" enters f3 |
| Hook length and words | 1.2-2.4 s, ≤ 7 words | 2.0 s, 4 words |
| Product name | ≤ 8 s type-led (G-09); ≤ 5 s after a typed setup (Guideline 03) | 2.0 s (editor header, cap 3 % H); T-HERO wordmark 6.0 s |
| First real UI and input → output | ≤ 8 s | UI f60 (2.0 s); first voice f128 (4.27 s) |
| Drop | 0-8 f after the first product moment's cut | f122, 2 f after the f120 cut |
| Hero moments | 1 per 9-20 s; first at 10-25 % RT; last 76-91 % | H1 f180 (6.0 s, 13.3 %), H2 f588 (19.6 s, 43.6 %), H3 f1160 (38.67 s, 85.9 %). Gaps 13.6 s and 19.1 s |
| 3D | ≤ 10-15 % RT | 4.0 s = 8.9 % |
| Climax start | 78-86 % RT | 36.0 s = 80 % |
| Breather | 10-15 % RT in films ≥ 30 s (P08 ER-U11) | 6.0 s breakdown = 13.3 % |
| Final still lockup | ≥ 2.2 s; URL ≥ 2 s | Still f1248-1335 = 2.9 s (+ 14 f fade); URL on screen f1240-1349 = 3.7 s |

**Proof blocks** share one grammar (Ask → Think → Answer → Detail → Label), follow the user's real workflow
order (choose a voice → reach more languages → refine a line), show before they label, and shorten: **8.0 → 7.0 →
5.0 s**. A 45 s film runs the demo loop 4 times (S02-S04 counts as the first run), above the ≥ 3 rule (P01 TS2).

---

## 4. Part D: Scene-by-scene storyboard (16:9 master)

1920×1080, 30 fps, 1350 f. Coordinates are % of frame (x from the left, y from the top). String IDs (STR-xx) are
in §G.4; claims (Cxx) in §G.5; runs (R-xx) in §G.6. "Make with" sits in the Motion notes column.
Cuts land on the frame before a beat (picture leads the beat by 0-1 f).

| Scene | Timestamp (s · f) | Duration | Visual | UI / product action | Camera | Object movement | Text | Transition (out) | Lighting | Sound design | Music behaviour | Motion notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **S01** Hook | 0.00-2.00 · f0-59 | 2.0 s · 60 f | Dark world. Generated plate P-01 (night window, rain on glass, street light far outside, deep defocus) under a scrim that caps the text band at #2A2724. One line of type centred at y 47 %; a flat grey line #8A847E, 38 % W, 2 px, at y 60 % (silent) | Words append like typing: "Still booking" set on f0; "a" enters f3-8; "studio?" f9-14; caret blinks 9 f on / 9 f off from f15 | CM-02 breathe 1.00 → 1.04 linear f0-53, then E-PUNCH +22 % f54-59 into the cut. Roll 0 | Each word 6 f E-OUT from a 4 % W offset; line re-centres E-LERP k 0.22 f3-27. Plate drops run (generated motion, locked-off camera) | STR-01 "Still booking a studio?" Inter 400, T-HOOK cap 6.8 % H, #F7F5F2 (13.65:1 on the scrim ceiling). Disclosure tag STR-23 "AI-generated background" bottom-left x 5 % y 93 %, 2.5 % H | **TR-18** polarity-flip hard cut f59 → f60, on beat 4; cause: the punch peak + downbeat | Plate: one practical street light outside, 3400 K, upper left beyond the glass; room unlit. Type unlit (graphic) | F12 sub hit f0 (−6 dB peak) | Pad + one soft pluck per word (f0, f3, f9) | Hook text on f0 = thumbnail. 4 words, 2.0 s, mechanic visible (caret + silent line). Make: Veo 3.1 plate (generate) + Remotion type/line (composite) |
| **S02** Setup | 2.00-4.00 · f60-119 | 2.0 s · 60 f | Light world #F7F5F2. Editor card #FFFFFF, 72 % W × 46 % H, centred (x 14-86 %, y 27-73 %), radius 28 px, shadow y 24 / blur 48 / 7 % + 1 px hairline #E6E2DD. Header: Lumen mark + wordmark (x 17 %, y 31 %), voice chip "Ember ▾" (x 80 %, y 31 %), "Dub" button (x 72 %, y 31 %). Script field centred, y 47 %. Grey flat line 56 % W at y 58 %. "Speak" pill (ink fill, white label) x 78 %, y 66 % | UI state ED-01 (empty script) → ED-02 (typed). Typing "The rain came " f60-71 (14 ch, 35 cps), "at midnight." f72-91 (12 ch, 18 cps). Cursor (native arrow 2 % H) from x 70 % y 80 %: travel f92-103 E-GLIDE (12 f, 216 px), dwell f104-111, press f112-114 (button darkens 1 f, scale 0.97 over 3 f, no rebound) | CM-01 locked (text being typed is read) | Caret blink 9/9 f; cursor only. One primary motion at a time: typing ends f91 before the cursor moves f92 | STR-03 wordmark in header (cap 3 % H); STR-02 script text Inter 400, T-UI cap 3.2 % H, ink; "Ember", "Dub", "Speak" UI labels T-UI-S cap 3 % H | **TR-20** interaction-triggered cut f119 → f120, 7 f after the press (signature 1/4); cause: the Speak press | Flat 2D; card shadow implies key from upper left | F02 keystrokes f60-91 at −22 dB under full music; F01 click f112 (press frame) | Near-silence floor −42 dB; F09 riser f87-115, crest f115; suck-out/gap f116-121 | Script still 28 f (0.93 s) after its last character (≥ 0.6 s). Name visible from f60 (2.0 s). Make: Remotion, UI from Figma frame ED-01/02 (vector) |
| **S03** Reveal: hear it | 4.00-6.00 · f120-179 | 2.0 s · 60 f | CM-20 cut-in ×1.4 about the script line centre (x 50 %, y 47 %): the line now cap 4.5 % H, the grey line spans x 11-89 % at y 62.4 %; card white fills the frame | **Think:** f120-127 empty hold (line grey). **Answer:** f128-139 the flat line writes into a waveform in the AI gradient #F6B26B → #EE7F6D, left to right, amplitude from R-01 audio (max 14 % H); f140-145 settles to ink #121110. Playhead (2 px ink) travels f128-178 with the audio. Words turn brick #A63D2A at their spoken onsets (from R-01 alignment) | CM-02 breathe 1.00 → 1.05 linear f120-179 | Waveform develop = TR-22 generation state (12 f write + 6 f settle). Karaoke colour switch 2 f per word | STR-02 at T-UI-L (cap 4.5 % H); accent per spoken word (one accent word visible at a time: the current word) | **TR-23** anchored cut f179 → f180: the waveform keeps position and size (±1 px); card chrome disappears | Flat | F11 hit f122 (+10 dB, 6 f before the voice). **F18** Ember voice f128-178 (R-01, 1.7 s) | **Drop f122**; music ducked −10 dB f126-178 | Signature 1/4 completes. No hit under the voice (P09 §16.1). Make: Remotion (deterministic waveform from R-01 RMS) |
| **S04** Reveal: name | 6.00-8.00 · f180-239 | 2.0 s · 60 f | Canvas #F7F5F2. The waveform alone at y 62.4 %, then the Lumen mark (6 % W ink line with one centred peak 3 % H tall) at x 37 %, y 50 %; wordmark "Lumen" x 41-63 %, y 50 %; sub at y 64 % | Brand state, no UI | CM-02 breathe 1.00 → 1.05 linear f190-239 | **TR-07 UI morph** f180-189 E-INOUT: waveform (78 % W) compresses to the mark and travels to x 37 % y 50 % (declared two-shape interpolation, waveform → mark). Wordmark letters f186-199: 2 f stagger, 6 f each, E-OUT, rise 2 % H. Sub f188-195 E-OUT as the cascade's last element | STR-03 "Lumen" T-HERO cap 12 % H (Inter 400, −0.02 em). STR-04 "The AI voice studio." cap 3.6 % H, ink | **TR-01** hard cut f239 → f240 on bar 4 | Flat | None (R5 removed the soft tone) | Full groove from f180 | **Hero H1 at 6.0 s (13.3 % RT).** Hero one-off 1/3. Sub held 52 f (1.73 s ≥ 1.72 s formula). Make: Remotion |
| **S05** Proof A: ask | 8.00-12.00 · f240-359 | 4.0 s · 120 f | Editor card as S02 (anchored ±1 px), script STR-02 with its ink waveform (Ember). A "Describe a voice" panel 60 % W × 34 % H (x 20-80 %, y 35-69 %) opens over the card; card behind dims to 50 % | Cursor from x 50 % y 75 % to chip "Ember ▾": travel f241-255 (15 f E-GLIDE), dwell f256-265, press f266-268. Panel pops f269-270 (2 f). Typing STR-06: "Warm, low, a little tired. " f276-302 (27 ch, 30 cps); "Late-night radio." f303-330 (17 ch, 18 cps). Travel to "Design voices" (x 66 %, y 64 %) f331-345, dwell f346-351, press f352-354 | CM-01 locked (typing read) | Panel: 2 f popover, no scale. Card dim 2 f E-LINEAR | STR-05 "Describe a voice" (cap 3 % H); STR-06 typed (cap 3.2 % H); STR-07 button "Design voices" (cap 3 % H) | **TR-20** cut f359 → f360, 7 f after the press (signature 2/4) | Flat | F01 click f352 only (row/chip presses are silent, R5) | Groove; suck-out begins f352 (−15 dB) | Description still 29 f after its last character. Make: Remotion, Figma frame VD-01 |
| **S06** Proof A: answer + detail | 12.00-16.00 · f360-479 | 4.0 s · 120 f | Same panel (anchored). Three voice-card slots 17 % W × 22 % H at x 27 / 50 / 73 %, y 50 %. Each card: name, descriptor, a small waveform, ▶. Script line at panel bottom y 72 % | **Think:** f360-367 empty hold (hairline outlines only). **Answer:** cards develop f368-385 (12 f AI-gradient write each, 3 f stagger) and settle to white/ink by f391 (R-02 names and descriptors). Cursor travel f392-406 to Nightline ▶ (x 27 %, y 58 %), dwell f407-416, press f417-419; Nightline card outline 2 px ink (1 f). **Detail:** Nightline reads STR-02 f420-479, playhead on its card, script words turn brick as spoken | CM-02 breathe 1.00 → 1.06 linear f360-479, centred on the cards | Writes start 3 f apart (cascade); each card follows the develop rule (12 f write + 6 f settle), so the set completes in 24 f. Karaoke 2 f per word | STR-08 card names "Nightline", "Harbor", "Dusk" (cap 3.2 % H); descriptors STR-08a-c (cap 3 % H); caption STR-09 "Describe any *voice*." cap 4 % H at y 88 %, in f437-445 E-OUT, held to f479 (1.43 s) | **TR-01** hard cut f479 → f480 on bar 8 | Flat | F11 hit f372 (4 f after the first card appears). F18 Nightline f420-479 (R-02, 2.0 s) | Groove returns f368; ducked −10 dB f418-479 | Show first (f368), label second (f437). Make: Remotion |
| **S07** Proof B: ask | 16.00-19.00 · f480-569 | 3.0 s · 90 f | Editor card (anchored). Chip now "Nightline ▾"; waveform = Nightline's (ink). Language menu (x 62-82 %, y 35-62 %), 5 rows in the product's alphabetical order: French, German, Hindi, Japanese, Spanish | Cursor to "Dub" (x 72 %, y 31 %): travel f481-495, dwell f496-505, press f506-508. Menu opens 6 f f509-514, rows 2 f apart. Checks: Hindi press f522-524 (hop f515-521), Japanese f533-535 (hop f525-532), Spanish f544-546 (hop f536-543); each checkbox fills in 2 f. Button label switches "Dub" → "Dub 3 languages" in 1 f at f545. Travel f547-555, dwell f556-561, press f562-564 | CM-02 breathe 1.00 → 1.03 linear (menu being read: ≤ 0.2 % W/f) | Menu 6 f; rows 2 f stagger; checks 2 f | STR-10 menu rows (cap 3.2 % H); STR-10a "Dub 3 languages" (cap 3 % H) | **TR-20** cut f569 → f570 (7 f after the press; signature 3/4) into the 3D shot | Flat | F01 click f562 only | Groove; suck-out f562-601 | Fast hops (7-8 f) are a deliberate exception to the 15-20 f travel band: targets are 1 row (3.5 % H) apart. Make: Remotion, Figma frame DB-01 |
| **S08** Proof B: answer (3D hero) | 19.00-23.00 · f570-689 | 4.0 s · 120 f | 3D: the editor card as a textured plane (real vector UI rasterised at 2× output), first framed to match S07 to ±1 px. It pulls back and tilts away 25°; the waveform lifts off as a matte ink ribbon and becomes three ribbons stacked in depth (Hindi front, Japanese middle, Spanish back); background radial #F7F5F2 → #ECE8E3 | **Think:** f570-577 empty hold. **Answer:** pull-back + ribbon lift; ribbons develop in the AI gradient (Hindi f602-613, Japanese f606-617, Spanish f610-621) and settle to ink 6 f each. Labels with each translated line (R-03) appear beside each ribbon f612 / f616 / f620. **Detail:** Hindi plays f612-656; dolly to the Japanese ribbon; Japanese plays from f662 | **CM-16** screen-to-world pull-back ×0.57 in 10 f (f578-587, E-ZOOM log space) then ×0.56 over 19 f (f588-606, E-INOUT); drift 0.1 % W/f f607-644; **CM-04** dolly ×2.2 in 15 f (f645-659, E-OUT) through the Hindi ribbon (foreground bokeh) to the Japanese ribbon; near-still f660-689. Roll 0 | Card tilt 0° → 25° f578-606 E-INOUT (≤ 35° in transit). Ribbon lift 6 % H f588-601 E-OUT; **TR-06** declared one → three duplication along z (−0.6 / 0 / +0.6 units) f592-605 E-OUT. Labels 6 f E-OUT, camera-facing | STR-11 language names + translated lines (Inter 400, cap 3 % H; Japanese label 4.2 % H after the dolly). Hindi words turn brick as spoken | **TR-01** hard cut f689 → f690 to 2D on beat 46 (never a 2D ↔ 3D crossfade) | Key upper left 5200 K, fill 1:4 from right, no rim; matches every 2D shadow | F11 hit f606 (4 f after the first ribbon develops, 6 f before Hindi). F07 whoosh peak f646 (fastest dolly frame). F18 Hindi f612-656, Japanese f662-709 (L-cut 20 f into S09) | Ducked −10 dB under each voice; no whoosh under a word | **Hero H2 at f588 (19.6 s, 43.6 % RT).** Only 3D beat (8.9 % RT). Motion blur 180° on the dolly only. Hero one-off 2/3. Make: Remotion + `@remotion/three` (custom), rendered to `clips/lumen-dub-ribbons.mp4` |
| **S09** Proof C: ask | 23.00-25.00 · f690-749 | 2.0 s · 60 f | Editor card 2D (anchored). Script STR-02 with the Nightline waveform | Cursor drag-selects "at midnight" f708-722 (selection fill #E6E2DD grows L→R 15 f E-LINEAR). "Direct" popover (3 rows: `[calm]`, `[whispers]`, `[excited]`) opens 2 f f724-725 above the selection. Travel f726-735, dwell f736-739, press `[whispers]` f740-742. f743: chip `[whispers]` inserts before "at midnight" in 1 f (state switch, not a morph); following text shifts right 6 f E-OUT f743-748. Popover stays open to the cut | CM-02 breathe 1.00 → 1.03 linear | Selection 15 f; popover 2 f; chip 1 f + 6 f shift | Popover rows STR-13 (cap 3.2 % H); chip STR-13b `[whispers]` (cap 3.2 % H, ink on #E6E2DD pill) | **TR-23** anchored cut f749 → f750 with a CM-20 reframe ×1.4 (line centre held at x 50 %, y 47 %) | Flat | Silent presses (R5). Japanese voice tail ends f709 | Groove under the tail, ducked to f709 | Popover text held 26 f (≥ 25 f floor, R11). Make: Remotion, Figma frame DR-01 |
| **S10** Proof C: answer + detail | 25.00-28.00 · f750-839 | 3.0 s · 90 f | ×1.4 reframe on the script line (cap 4.5 % H) with the chip; Speak pill at x 89 %, y 74 % | Cursor travel f750-757, dwell f758-764, press Speak f765-767. f765: waveform drops to a flat grey line in 1 f (re-generating). **Think:** f768-775 empty hold. **Answer:** develop f776-787 (AI gradient) + settle f788-793. **Detail:** Nightline whispered read f778-837 (R-04): the waveform's amplitude falls to ≈35 % under "at midnight"; words turn brick as spoken | CM-02 breathe 1.00 → 1.06 linear f768-839, centre drifting 4 % W toward the chip (0.06 % W/f) | TR-22 generation state; karaoke 2 f per word | STR-02 + chip at cap 4.5 % H; caption STR-12 "Direct every *line*." cap 4 % H, y 88 %, in f796-804, held to f839 (1.47 s) | **TR-02** beat cut f839 → f840 on bar 14 | Flat | F01 click f765 (signature 4/4). F18 whisper f778-837 | Suck-out f765-775; ducked −12 dB f776-839 (whisper is quiet) | Speed contrast: 15 f of selecting and tagging vs a 0.6 s regeneration. No hit (the voice is the payoff). Make: Remotion |
| **S11** Evidence: number | 28.00-30.00 · f840-899 | 2.0 s · 60 f | Canvas; stat composition centred: kicker y 34 %, value y 50 %, label y 63 %, source y 71 % | Value counts 0 → 400 over 24 f (E-SNAP-L) f846-869 and locks f870; "ms" static | CM-02 breathe 1.00 → 1.06 linear | Kicker, label, source 9 f E-OUT f840-848 | STR-14 kicker "Median · internal test" (cap 3 % H); STR-15 "400ms" T-HERO cap 12 % H; STR-16 "from Speak to *sound*" cap 4 % H; STR-17 "n = 1,000 · Sep 2026" cap 3 % H, #6E6862 (5.05:1) | **TR-02** beat cut f899 → f900 on bar 15 | Flat | F06 lock accent f870 (no tick run) | Groove thins f840 | Claim C01. Value still 30 f after lock; source line 1.18 s needed, on screen 1.8 s. Make: motion-kit `stat` |
| **S12** Evidence: scope (Proof B's label) | 30.00-33.00 · f900-989 | 3.0 s · 90 f | Canvas; kicker y 38 %; statement centred y 50 %; under it the Nightline waveform as a thin still ink line, 40 % W, y 62 % | None | CM-02 breathe 1.00 → 1.04 linear | Kicker 9 f E-OUT f900-908; words 6 f E-OUT, 5 f apart: f903, f908, f913, f918; motif line draws L→R 12 f E-LINEAR f924-935 | STR-18 kicker "Dubbing" (cap 3 % H); STR-19 "29 languages, one *voice*." T-STATEMENT cap 5.8 % H, Inter 300 | **TR-13** defocus dissolve 6 f f984-989 | Flat | None | **Breakdown starts f900**: low-pass, −10 dB | Claim C02. Labels Proof B after it was shown (show → label). Make: motion-kit `title` (or a merge into the S08 clip caption in the kit draft, §10) |
| **S13** Trust (breather) | 33.00-36.00 · f990-1079 | 3.0 s · 90 f | Statement at y 26 %; settings card 60 % W (x 20-80 %, y 42-80 %) titled "Voice cloning" with the consent recording (ink waveform of the team member's read, R-05), the consent sentence, a status pill and a "Verify" button | Statement words f990/995/1000/1005 (6 f each); card in f1008-1019 (12 f E-OUT, rise 6 % H); cursor travel f1020-1031, dwell f1032-1037, press "Verify" f1038-1040; status pill switches in 1 f at f1043 from "Not verified" to "✓ Verified" (ink, no status colour) | CM-02 breathe 1.00 → 1.08 linear | Card 12 f; pill 1 f state switch | STR-20 "Your *voice*. Your consent." T-STATEMENT; STR-21 consent sentence (cap 3 % H); STR-22 "✓ Verified" (cap 3 % H) held 36 f | **TR-18** polarity-flip hard cut f1079 → f1080 to dark | Flat | F03 toggle f1038 | Breakdown pad; **100 ms gap f1077-1079** | Claim C03 (owner-approved). Low motion = breather. No audio from the recording (it is shown, not played). Make: Remotion, Figma frame VC-01 |
| **S14** Climax | 36.00-39.00 · f1080-1169 | 3.0 s · 90 f | Dark world #0E0D0C. Six waveforms from the film (Ember S03, Nightline S06, Hindi / Japanese / Spanish S08, whisper S10) as 2 px #F7F5F2 lines, 14 % W each | Brand state | CM-02 push 1.00 → 1.10 linear f1080-1163, then E-PUNCH +25 % f1164-1169 | Arcs in from the frame edges 18 f E-SNAP, 4 f stagger (f1080 … f1100), landing on a ring of radius 24 % H at 60° spacing by f1117. Stepped orbit 60° per step, 10 f E-HOP: f1118-1127, f1136-1145. Implosion to centre 8 f E-EXIT f1152-1159. f1160 one-frame swap to the Lumen mark (#F7F5F2, 6 % W). 10 sparks (≤ 12) radial in the AI family, 10 f E-OUT then fade f1160-1169 | None | **TR-18** polarity-flip hard cut f1169 → f1170 to light | The waveforms are the only emitters; no glow on type | F08 swish f1118 and f1136 (outgoing frame of each step); F11 hit + F12 sub f1160 | **Re-entry f1080**, densest arrangement | **Hero H3 at f1160 (38.67 s, 85.9 % RT).** Hero one-off 3/3 (many → one, TR-06). Motion blur 180° on arcs and implosion (> 5 % W/f); none on the orbit steps (≈2.5 % W/f peak). Make: custom Remotion → `clips/lumen-climax.mp4` |
| **S15** Bookend | 39.00-40.50 · f1170-1214 | 1.5 s · 45 f | Light world over generated plate P-02 (the same window and framing as P-01, at overcast dawn, graded so the text band never falls below #E4E0DA) | None | CM-02 breathe 1.00 → 1.05 linear | Strike line 2 px ink through "a studio?" f1172-1179 E-LINEAR; "a studio?" dims to 50 % f1180-1183. Punch words 6 f E-OUT, 5 f apart: f1182, f1187, f1192, f1197 | STR-01 at cap 4.5 % H, y 42 % (ink); STR-24 "Type it. *Hear it.*" T-PUNCH cap 5 % H, y 54 %; "Hear it." in the footage accent #7A2A1C (7.34:1). Disclosure tag STR-23 | **TR-23** anchored cut f1214 → f1215: STR-24 stays pixel-identical; the plate cuts out to canvas | Plate: overcast dawn 5600 K through the window, upper left; high key | Soft pluck f1197 (music stem) | **150 ms gap f1210-1214** | Closes the loop with the hook (L3). Thesis on screen at 39.4 s. Make: Veo 3.1 plate + Remotion type |
| **S16** Lockup + CTA | 40.50-45.00 · f1215-1349 | 4.5 s · 135 f | Canvas #F7F5F2. Mark + wordmark centred y 38 %; tagline y 54 % (anchored from S15); CTA link y 68 %; footer y 80 % | Link "Try Lumen →" underline draws (the only "interaction"; no cursor) | **Dead still** (CM-01) from f1248 | Mark from the left and wordmark from the right converge 8 px per side over 9 f E-OUT f1215-1223, opacity 0 → 1 over 6 f. CTA f1228-1236 E-OUT rise 2 % H; underline f1236-1247 E-LINEAR; footer f1240-1247 E-OUT. End fade to #F7F5F2 14 f E-LINEAR f1336-1349 | STR-03 wordmark cap 7 % H; STR-24 tagline (unchanged, #7A2A1C on "Hear it."); STR-25 "Try Lumen →" T-CTA cap 5.4 % H, Inter 500, ink; STR-26 "Free plan · available today · lumen.example" T-URL cap 3.6 % H | **TR-24** end fade to canvas 14 f | Flat | **F17 sting f1215** (±2 f), tail 1.8 s | Music resolves on the lockup; decays to ≤ −60 dB by f1349; ends with the picture | Still 2.9 s (≥ 2.2 s). URL on screen 3.7 s. Claim C04. Make: motion-kit `cta` + `logo` or Remotion |

**Rhythm check (computed from the table):** 16 shots, durations 60/60/60/60/120/120/90/120/60/90/60/90/90/90/45/135 f =
**1350 f exactly**. ASL 2.81 s (band 2.6-3.0). 15 scene changes: 14 hard cuts (TR-01/02/18/20/23) = 93 % (≥ 70 %),
1 defocus dissolve (TR-13), plus the end fade. Signature "Speak → develop" used 4 times (band 4-8). Hero one-offs 3
(TR-07 morph S04, CM-16 screen-to-world S08, TR-06 implosion S14; band 2-3). Flashes 0. Mask wipes 0. Punches 2 (S01, S14;
≤ 3). Whooshes 1 (≤ 2). F11 hits at f122, f372, f606, f1160: 8.3 s, 7.8 s and 18.5 s apart (≥ 1.4 s; ≤ 1 per 5 s).
Text cards in a row: max 2 (S11-S12; S13 carries UI). Longest shots: lockup 4.5 s and proofs 4.0 s.

### D.2 9:16 cut-down storyboard (20.0 s, 600 f)

1080×1920, 30 fps. **Re-layout, not a crop** (G-36). Meaning inside x 120-840 px, y 270-1210 px (P02 §4.7).
One use case end to end: type → hear → name → direct → number → lockup (P01 TS3). Strings and claims identical to the master.
Plates P-01v and P-02v are generated natively at 9:16 (same continuity block, same seed).

| Scene | Timestamp (s · f) | Dur | Visual (9:16 layout, px) | UI / product action | Camera | Object movement | Text | Transition | Lighting | Sound design | Music | Motion notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| C01 Hook | 0.0-1.5 · f0-44 | 45 f | P-01v; two stacked lines centred x 540, y 760 / 900; flat grey line 560 px at y 1040 | "Still booking" on f0; "a" f3-8; "studio?" f9-14 | Breathe +4 % f0-39; E-PUNCH +22 % f40-44 | As S01 | STR-01 split after "booking", 128 px font (cap ≈ 4.8 % H = 93 px) | TR-18 f44 → f45 | As S01 | F12 f0 | Pad + plucks | Thumbnail = f0 |
| C02 Setup | 1.5-3.5 · f45-104 | 60 f | Editor card 810 px wide (75 % W), x 135-945, y 600-1200; Speak pill x 780 y 1130 | Typing f45-56 + f57-76 (same speeds); cursor travel f77-88, dwell f89-96, press f97-99 | CM-01 | As S02 | STR-02 at 52 px font | TR-20 f104 → f105 | Flat | F02 f45-76; F01 f97 | Riser crest f100; gap f101-106 | Still 28 f after the last char |
| C03 Hear | 3.5-5.5 · f105-164 | 60 f | Cut-in ×1.4 on the line; waveform 760 px wide at y 1000 | Hold f105-112; develop f113-124; settle f125-130; Ember f113-163 | Breathe +5 % | TR-22 | STR-02 at 73 px cap | TR-23 f164 → f165 | Flat | F11 f107; F18 Ember | Drop f107; duck under voice | Signature 1/2 |
| C04 Name | 5.5-7.0 · f165-209 | 45 f | Mark + "Lumen" centred y 900 (no sub line in the vertical) | Morph f165-174; letters f171-184 | Breathe +5 % | TR-07 | STR-03 at 240 px font | TR-01 f209 → f210 | Flat | None | Groove | The sub is dropped: a 4-word line needs 52 f and the shot is 45 f (G-26), so the vertical names the product only |
| C05 Direct | 7.0-11.5 · f210-344 | 135 f | Editor card (C02 layout); popover above the selection; then ×1.4 reframe | Drag-select f220-234; popover f236-237; press `[whispers]` f252; chip f255; reframe cut f270; press Speak f285; hold f288-295; develop f296-313; whisper f298-357 (L-cut into C06 13 f) | Breathe +3 % then +6 % | As S09-S10 | Caption STR-12 at y 1180, 62 px cap, in f300, held to f344 | TR-02 f344 → f345 | Flat | F01 f285; F18 whisper | Suck-out f285-295; duck −12 dB | Signature 2/2. Proof grammar as master |
| C06 Number | 11.5-13.5 · f345-404 | 60 f | Stat stacked: kicker y 700, value y 900 (240 px font), label y 1080, source y 1160 | Count f351-374, lock f375 | Breathe +6 % | As S11 | STR-14-17 | TR-02 beat cut f404 → f405 | Flat | F06 f375 | Groove thins | Claim C01 |
| C07 Bookend → lockup | 13.5-20.0 · f405-599 | 195 f | f405-449 P-02v with STR-01 struck + STR-24 (y 860 / 1000); f450 plate cuts out (anchored STR-24); mark + wordmark y 700; CTA y 1120; footer y 1190 | Strike f407-414; punch words f417-432; converge f450-458; CTA f463-471; underline f471-482; footer f475-482; still f483-585; fade f586-599 | Breathe +5 % to f449, then dead still | As S15-S16 | STR-24 at 74 px cap; STR-25 at 80 px cap; STR-26 at 52 px font (two lines: "Free plan · available today" / "lumen.example") | TR-23 at f450; TR-24 end fade | As S15 then flat | Pluck f432; F17 sting f450 | Gap f445-449; resolve on f450; ≤ −60 dB at f599 | Still 3.4 s; URL 3.9 s on screen |

The 9:16 cut drops Proof A, Proof B (the 3D beat), the trust line and the climax: a 20 s vertical keeps one task end
to end, and the 3D beat does not re-lay out to 9:16 without a new render (open item O4).

---

## 5. Part E: Per-shot production prompts

One block per shot, all 16 shots. Every Phase-16 field is filled; "n/a" carries its reason. Two shots use a
generated plate (S01, S15: **Google Flow / Veo 3.1**); the other layers are deterministic (Remotion, motion-kit,
`@remotion/three`), so their "prompt" is a build spec in the same field order. Generated-shot prompts follow
Veo's order **Cinematography → Subject → Action → Context → Style**, then the continuity block, verbatim.

### E.0 Shared settings and continuity blocks (pasted, never paraphrased)

| Setting | Value |
|---|---|
| Master | 1920×1080, 16:9, **30 fps** CFR, 1350 f. Generated plates are made at 24 fps and retimed to 30 fps with optical-flow interpolation (locked-off plates whose only motion is rain on glass; Gate 1 checks 0 duplicated frames) |
| Generation tool and tier | Google Flow, **Veo 3.1 (Quality)**, 1080p, fixed for the whole film; clip unit 4 s; 4 takes per plate; generated audio muted and discarded |
| Look ID and seed | Look **L1** (the window), seed **41730** for every plate and every aspect |
| References per look | ≤ 3: **REF-1** the selected P-01 take, frame 48 (after approval it anchors P-02 and the 9:16 plates); **REF-2** a palette swatch frame (#0E0D0C / #8A847E / #F7F5F2 bands); **REF-3** none |
| 2D build | Remotion 4 at 30 fps; all values driven by frame number, every `interpolate` clamped, ease tokens only (`Easing.bezier` per P03 §19.3), scale interpolated in log space; UI from Figma frames exported as SVG; waveforms drawn from the logged runs' audio (RMS per frame) |
| 3D build | `@remotion/three` (three.js r16x), orthographic-matched start camera; UI textures rasterised at 2× output (3840 px); ribbons as extruded geometry from the R-02/R-03 waveforms |

**CB-L1 (generated plates, pasted at the end of every plate prompt):**

```
Continuity L1: interior of a quiet home recording corner, nobody in frame. A tall four-pane window with a thin
off-white painted wooden frame fills the left 55 % of the frame, seen at a 30-degree angle; a plain warm
off-white plaster wall fills the right; the window sill sits 22 % above the bottom edge. Rain beads and a few
slow running drops on the glass. Light enters only through the window, from the upper left. 50 mm lens look,
camera at sill height, level horizon, roll 0, locked-off camera. Very shallow depth of field: focus on the
raindrops on the glass, everything beyond the glass soft. Palette near-black #0E0D0C, warm grey #8A847E,
off-white #F7F5F2; no saturated colour. Fine film grain 1 %.
```

**CB-2D (every composited 2D shot):**

```
Continuity 2D: canvas #F7F5F2 (light) or #0E0D0C (dark); ink #121110; accent #A63D2A only on heard words
(#7A2A1C over footage, #F4A78F on dark); AI-colour family #F6B26B -> #EE7F6D only during a 12 f write + 6 f
settle; silent line #8A847E. Inter 300/400/500, sentence case. Editor card #FFFFFF 72 % W x 46 % H centred,
radius 28 px, shadow y 24 / blur 48 / 7 % ink + 1 px #E6E2DD hairline (key upper left). Native arrow cursor
2 % H: travel E-GLIDE, dwell, press 3 f, consequence 3-8 f later. 0 % overshoot. Roll 0. Breathing push on
every hold, <= 0.2 % W/f while text is read.
```

**CB-3D (S08, S14):**

```
Continuity 3D: same palette and tokens as Continuity 2D. One key light upper left 5200 K, fill 1:4 from the
right, no rim, matching every 2D card shadow. Matte ink ribbons (roughness 0.85, specular 2 %). 35 mm look in
S08, 50 mm look in S14. Max 3 depth planes. Motion blur 180 deg only above 5 % W/f. Roll 0.
```

**Generation log template (filled for every kept take, G-32):**

```json
{ "shot": "S01", "plate": "P-01", "take": 3, "model": "veo-3.1", "tier": "quality", "mode": "text-to-video",
  "prompt_id": "P-01/v4", "negative_id": "NEG-L1", "seed": 41730, "refs": ["REF-2"], "duration_s": 4,
  "fps": 24, "resolution": "1920x1080", "aspect": "16:9", "date": "YYYY-MM-DD", "used_source_frames": "24-71",
  "qc_21_4": "25/25", "audio": "muted, discarded", "disclosure": "AI-generated background tag on screen" }
```

**NEG-L1 (negative prompt for every plate):** `text, subtitles, captions, letters, watermark, logo, numbers,
signage, screen content, user interface, people, faces, hands, reflections of people, microphone brand marks,
lens flare, light leaks, coloured bokeh, neon, lightning, camera movement, zoom`

---

### S01 · Hook (generated plate + composited type)

| Field | Value |
|---|---|
| Shot · stage · duration | S01 · 1 Hook · 2.0 s · **60 f (f0-59)** · 16:9 · 1920×1080 · 30 fps (plate 24 fps → 30) · Veo 3.1 Quality (plate) + Remotion (type, line) |
| Purpose | Stop the scroll with the pain question while showing what is missing: a line that types, with a silent flat line beneath it |
| Layer split | **Generate:** P-01 plate (window, rain, night). **Composite:** scrim, STR-01 type, caret, flat line, disclosure tag. Nothing readable is generated |
| Composition | Window in the left 55 % (plate); text band y 40-66 % centred; line of type centred x 50 %, y 47 %; flat line x 31-69 %, y 60 %; disclosure tag x 5 %, y 93 %. Safe area x 96-1824, y 54-1026 px. Reserved empty space: the full text band, which the plate keeps free of highlights (prompt asks for a dark wall there) |
| Subject placement · angle · lens | Window at 30° to camera, sill 22 % from the bottom; eye level at sill height; 50 mm look |
| Foreground / midground / background | FG: rain beads on glass (in focus); MG: window frame (slightly soft); BG: night street beyond, one light, blurred ≈ 60 px @1080 (3 % W). 2D type sits above all planes, unblurred |
| Lighting | One practical street light outside, 3400 K, upper left beyond the glass; room unlit; plaster wall falls to near-black. Scrim (#0E0D0C at 70 %, feathered) caps the text band at #2A2724 |
| Materials | Window glass with rain beads (fixed words: "clear glass, beaded rain"); off-white painted wood, matte; plaster, matte |
| Camera block | **CM-01** locked-off in the plate. In compositing: **CM-02** breathe 1.00 → 1.04 linear over f0-53 (peak 0.04 % W/f, focus n/a, roll 0), then **E-PUNCH** +22 % over f54-59 (per-frame growth doubling) into the cut. One move (breathe) plus the punch as the cut device (P03 EA-C6) |
| Action and object motion | "Still booking" fully set on f0. "a" 6 f E-OUT from +4 % W offset f3-8; "studio?" same f9-14 (6 f apart, within 3-8 f). Line re-centres E-LERP k 0.22 f3-27. Caret 9 f on / 9 f off from f15. Cause of each word: the typing rhythm (pluck per word) |
| UI states and timeline | n/a: no product UI in the hook (the problem world) |
| Typography | STR-01 Inter 400, T-HOOK cap 6.8 % H (≈101 px font), #F7F5F2, tracking −0.01 em; entrance per word as above; exit = the punch into the cut; hold 2.0 s (≥ 1.72 s for 4 words). STR-23 Inter 400 2.5 % H #8A847E (disclosure, texture tier) |
| Transition in / out | In: **f0 cold open** (no fade from silence; sub hit on f0). Out: **TR-18** polarity flip; last frames of S01: dark field at +22 % scale, words largest on f59; first frame of S02: light canvas with the editor card, full brightness, on beat f60 |
| Motion blur · DOF · grade · grain | Blur off (type < 5 % W/f; the punch peaks ≈1.4 % W/f). DOF in the plate: focal plane on the glass. Grade: plate to the L1 palette, blacks lifted to #0E0D0C, highlights capped at #8A847E except the street light; grain 1 % (plate only) |
| Sound cue | F12 sub hit f0 (anchor: first frame), −6 dB peak, + 100-300 Hz harmonic for phones; music pad and plucks f0/f3/f9 |
| Continuity | CB-L1 (plate) + CB-2D (type). **Must stay unchanged:** window framing and angle (P-02 and 9:16 plates repeat it), STR-01 spelling and case, flat line colour #8A847E and y 60 % position relative to the type |
| Negatives | NEG-L1 for the plate; for the composite: no glow on type, no particles, no caret colour, no second typeface |

**Generation prompt (P-01, Veo 3.1 Quality, text-to-video):**

```
Locked-off static camera, 50 mm lens look, eye level at the window sill, level horizon, no camera movement.
A tall four-pane window with a thin off-white painted wooden frame, seen at a 30-degree angle, filling the left
half of the frame; a plain plaster wall on the right, in deep shadow. Rain beads cling to the glass and a few
drops run slowly down it. Night: far outside, one warm street light glows out of focus at the upper left; the
room is unlit and quiet; the wall and the right half of the frame stay almost black, an empty dark area for
graphics. Calm, still, low contrast, fine film grain.
Continuity L1: interior of a quiet home recording corner, nobody in frame. A tall four-pane window with a thin
off-white painted wooden frame fills the left 55 % of the frame, seen at a 30-degree angle; a plain warm
off-white plaster wall fills the right; the window sill sits 22 % above the bottom edge. Rain beads and a few
slow running drops on the glass. Light enters only through the window, from the upper left. 50 mm lens look,
camera at sill height, level horizon, roll 0, locked-off camera. Very shallow depth of field: focus on the
raindrops on the glass, everything beyond the glass soft. Palette near-black #0E0D0C, warm grey #8A847E,
off-white #F7F5F2; no saturated colour. Fine film grain 1 %.
```

Negative prompt: NEG-L1. References: REF-2 (palette). Seed 41730. Start/end frame: none (text-to-video; this take becomes REF-1). Generation length **4 s** for a 2.0 s edit; use source frames 24-71 (the middle 2.0 s). 4 takes; pick by the §21.4 anti-AI checklist (drops fall downward only, no new panes, frame lines straight, no text-like shapes).

**Build spec (composite, Remotion):**

```
S01 | comp Lumen/S01 | 1920x1080 | 30 fps | f0-59
layers back->front: P-01 plate (retimed 30p) | scrim #0E0D0C 70 % feathered over y 34-72 % | flat line 2 px #8A847E x 31-69 % y 60 % | STR-01 words | caret | STR-23 tag
f0     "Still booking" at 100 %, caret after "booking"
f3-8   "a"       translateX +4 % W -> 0, opacity 0 -> 1, E-OUT 6 f
f9-14  "studio?" same
f3-27  line centre x: E-LERP k 0.22 toward the new centre
f15+   caret blink 9 on / 9 off
f0-53  scale 1.00 -> 1.04 E-LINEAR (whole comp, anchor centre)
f54-59 scale x1.04 -> x1.27 E-PUNCH (exponential)
cut at f59 (TR-18)
Continuity 2D: [CB-2D pasted verbatim]
```

---

### S02 · Setup (composited UI)

| Field | Value |
|---|---|
| Shot · stage · duration | S02 · 2 Setup · 2.0 s · **60 f (f60-119)** · 16:9 · 1920×1080 · 30 fps · Remotion (deterministic) |
| Purpose | Show the real editor, name the product (header wordmark), and type the script line that every later shot uses |
| Layer split | **Composite only:** Figma frames ED-01 → ED-02 as SVG, typed text, cursor. Generated: nothing (UI is never generated, AA-U1) |
| Composition | Card x 14-86 %, y 27-73 %; header wordmark x 17 % y 31 %; Dub x 72 % y 31 %; chip x 80 % y 31 %; script centred x 50 % y 47 %; flat line x 22-78 % y 58 %; Speak x 78 % y 66 %. ≈ 54 % of the frame is the canvas outside the card |
| Subject placement · angle · lens | Card frontal, orthographic (no perspective) |
| Foreground / midground / background | FG: cursor; MG: card and its contents; BG: canvas #F7F5F2. No blur on any plane |
| Lighting | Graphic; the card shadow (y 24, blur 48, 7 %) implies a key from the upper left, shared with every shot |
| Materials | "Satin white card" (#FFFFFF, no gradient, no gloss); "matte paper canvas" |
| Camera block | **CM-01** locked-off for the whole shot (text being typed is read). Peak 0 % W/f. Roll 0. Exit: the cut |
| Action and object motion | Typing: "The rain came " f60-71 (35 cps), "at midnight." f72-91 (18 cps); characters appear in 1 f each, no fade. Cursor: f92-103 travel E-GLIDE from (1344, 864) to (1498, 713); dwell f104-111; press f112-114 (button fill #121110 → #2A2724 on f112, scale 1.00 → 0.97 → 1.00 over 3 f, linear, no rebound past 1.00). Cause chain: typing → cursor → press → cut |
| UI states and timeline | ED-01 (empty, placeholder "Type your script…" in #6E6862) on f60 → first character f60 (placeholder removed same frame) → ED-02 (typed) f91 → Speak pressed f112 (state SP-1 "Speaking", label unchanged until the cut) |
| Typography | STR-03 wordmark (vector logo, cap 3 % H); STR-02 Inter 400 T-UI cap 3.2 % H, ink, centred; labels "Ember", "Dub", "Speak" Inter 500 cap 3 % H. Hold: the script stays still 28 f after its last character |
| Transition in / out | In: TR-18 (dark → light on beat f60). Out: **TR-20** interaction-triggered cut; last frames of S02: Speak pressed f112-114, card static f115-119; first frame of S03 (f120): the same line cut in ×1.4, same centre |
| Motion blur · DOF · grade · grain | Off (cursor peak 1.0 % W/f). DOF n/a (orthographic 2D, no depth planes). Grade: none (graphic values are final). Grain: none |
| Sound cue | F02 keystroke passage f60-91, −22 dB under full music; F01 click on press frame f112; F09 riser f87-115, crest f115; gap f116-121; F16 room tone −42 dB |
| Continuity | CB-2D. **Must stay unchanged:** card geometry (S05, S07, S09 reuse it to ±1 px), STR-02 exact string, header wordmark, chip position |
| Negatives | No fake progress bar, no spinner, no second cursor, no typing sound per character above 12 cps, no glow |

**Build spec:**

```
S02 | comp Lumen/S02 | 1920x1080 | 30 fps | f60-119
layers: canvas #F7F5F2 | card ED-01/ED-02 (Figma SVG) | STR-02 text | flat line #8A847E | cursor
f60-71  type "The rain came "  (1 char per 0.86 f; reveal per char, no fade)
f72-91  type "at midnight."    (1 char per 1.67 f)
f92-103 cursor (1344,864) -> (1498,713) E-GLIDE
f104-111 dwell
f112-114 press Speak: fill #121110 -> #2A2724 (1 f), scale 1.00 -> 0.97 -> 1.00 linear
cut at f119 (TR-20, 7 f after press)
Continuity 2D: [CB-2D pasted verbatim]
```

---

### S03 · Reveal: hear it (composited, driven by run R-01)

| Field | Value |
|---|---|
| Shot · stage · duration | S03 · 3 Reveal · 2.0 s · **60 f (f120-179)** · 16:9 · 1920×1080 · 30 fps · Remotion |
| Purpose | The first answer: Lumen speaks the typed line; the flat line becomes a waveform |
| Layer split | **Composite:** card (×1.4), STR-02, waveform drawn from R-01 audio, playhead, karaoke colour. **Audio:** R-01 (real product output). Generated: nothing |
| Composition | Script centred x 50 %, y 47 % (cap 4.5 % H); waveform x 11-89 %, y 62.4 %, max height 14 % H; white card fills the frame |
| Subject placement · angle · lens | Frontal, orthographic, cut-in ×1.4 about (960, 508) |
| Foreground / midground / background | FG: playhead; MG: text + waveform; BG: card white. No blur |
| Lighting | Graphic; no shadow visible at this scale |
| Materials | "Satin white card"; waveform as a 3 px ink stroke |
| Camera block | **CM-02** breathe 1.00 → 1.05 linear over f120-179 (peak 0.04 % W/f, centre fixed at the line centre, roll 0). Exit: anchored cut |
| Action and object motion | f120-127 hold (8 f, nothing moves but the breathe). f128-139 waveform writes left to right in the AI gradient (#F6B26B at the write head → #EE7F6D behind it), amplitude = R-01 RMS per frame, E-LINEAR head travel. f140-145 gradient settles to ink, E-LINEAR colour. Playhead x from 11 % to 89 % f128-178 E-LINEAR (audio-locked). Words switch ink → #A63D2A in 2 f at their R-01 onsets ("The" f128, "rain" f134, "came" f141, "at" f150, "midnight." f155). Cause: the Speak press in S02 |
| UI states and timeline | SP-1 "Speaking" → SP-2 "Playing" (f128) → SP-3 "Done" (f178, no visible label change) |
| Typography | STR-02 at T-UI-L cap 4.5 % H (Inter 400 scaled ×1.4 = 67 px font effective); one accent word lit at a time (the current word); words that have been spoken return to ink after the next word lights |
| Transition in / out | In: TR-20 from S02 (same line centre). Out: **TR-23** anchored cut: last frame f179 shows the settled ink waveform at y 62.4 %; first frame f180 shows the same waveform at the same pixels on bare canvas (card chrome and text removed) |
| Motion blur · DOF · grade · grain | Off. DOF n/a. Grade none. Dither 1 % on the gradient during f128-145 (banding guard) |
| Sound cue | F11 hit f122 (+10 dB over the bed; anchor: drop, 2 f after the cut). F18 Ember voice f128-178 (R-01), the hero layer; music ducked −10 dB f126-178 |
| Continuity | CB-2D. **Must stay unchanged:** waveform shape = R-01 (it re-appears in S14), STR-02 string, line centre (960, 508) |
| Negatives | No hit or whoosh under the voice; no bars-style equaliser; no glow; no AI colour after f145 |

**Build spec:**

```
S03 | comp Lumen/S03 | 1920x1080 | 30 fps | f120-179 | audio R-01.wav at f128
camera: scale 1.40 (cut-in) * (1.00 -> 1.05 E-LINEAR f120-179), anchor (960,508)
f120-127 hold: flat line #8A847E
f128-139 waveform write: head x 11% -> 89% E-LINEAR, colour #F6B26B (head) -> #EE7F6D (body), amplitude = rms(R-01, frame)
f140-145 colour -> #121110 E-LINEAR
f128-178 playhead x E-LINEAR, locked to audio time
word onsets from R-01 alignment: colour #121110 -> #A63D2A over 2 f
Continuity 2D: [CB-2D pasted verbatim]
```

---

### S04 · Reveal: name (composited)

| Field | Value |
|---|---|
| Shot · stage · duration | S04 · 3 Reveal · 2.0 s · **60 f (f180-239)** · 16:9 · 1920×1080 · 30 fps · Remotion |
| Purpose | Name the product at hero size: the waveform that just spoke becomes the Lumen mark |
| Layer split | **Composite:** waveform → mark morph, wordmark (logo SVG supplied by Lumen), STR-04. Generated: nothing |
| Composition | Mark x 34-40 %, y 50 %; wordmark x 41-63 %, y 50 % (cap 12 % H); sub centred y 64 %. ≈ 88 % of the frame empty |
| Subject placement · angle · lens | Frontal, orthographic |
| Foreground / midground / background | Single plane on canvas; no blur |
| Lighting | Graphic, none |
| Materials | Ink on matte paper canvas |
| Camera block | **CM-02** breathe 1.00 → 1.05 linear f190-239 (starts after the morph so only one primary motion runs at a time); peak 0.05 % W/f; roll 0 |
| Action and object motion | **TR-07** f180-189 E-INOUT: waveform path interpolates to the mark path (both paths resampled to 256 points; declared two-shape interpolation, AA-01), and its bounding box moves from (x 11-89 %, y 62.4 %) to (x 34-40 %, y 50 %). Letters L-u-m-e-n: start f186, 188, 190, 192, 194; each 6 f E-OUT, rise 2 % H, opacity 0 → 1. STR-04 f188-195 E-OUT, rise 1.5 % H. Cause: the voice ending (f178) |
| UI states and timeline | n/a: brand frame, no UI |
| Typography | STR-03 wordmark (logo SVG, cap 12 % H). STR-04 "The AI voice studio." Inter 300, cap 3.6 % H, ink; held f188-239 = 52 f (formula: 0.33 × 4 + 0.4 = 1.72 s) |
| Transition in / out | In: TR-23 anchored (waveform identical pixels on f179/f180). Out: **TR-01** hard cut on bar 4; last frame f239 the full lockup at 1.05×; first frame f240 the editor card (S02 layout) |
| Motion blur · DOF · grade · grain | Off (morph peak ≈3 % W/f). DOF n/a. Grade none. Grain none |
| Sound cue | No designed SFX (R5). Music full groove from f180 |
| Continuity | CB-2D. **Must stay unchanged:** mark geometry (re-used in S14 and S16), wordmark from the supplied SVG only, clear space ≥ the mark's height on all sides |
| Negatives | No logo glow, no shine sweep, no letter bounce, no 3D extrusion of the logo |

**Build spec:**

```
S04 | comp Lumen/S04 | f180-239
f180-189 path morph waveform(R-01, 256 pts) -> mark(256 pts) E-INOUT; bbox move to (653..768, 540)
f186+2n  letter n (n = 0..4): y +2%H -> 0, opacity 0 -> 1, E-OUT 6 f
f188-195 STR-04: y +1.5%H -> 0, opacity 0 -> 1, E-OUT 8 f
f190-239 scale 1.00 -> 1.05 E-LINEAR
cut f239 (TR-01)
Continuity 2D: [CB-2D pasted verbatim]
```

---

### S05 · Proof A: ask (composited UI)

| Field | Value |
|---|---|
| Shot · stage · duration | S05 · 4 Proof A · 4.0 s · **120 f (f240-359)** · 16:9 · 1920×1080 · 30 fps · Remotion |
| Purpose | Ask for a new voice in plain words |
| Layer split | **Composite:** card ED-03 (script + Ember waveform), panel VD-01, typed STR-06, cursor. Generated: nothing |
| Composition | Card as S02 (dimmed 50 % from f269); panel x 20-80 %, y 35-69 %; input field centred y 48 %; "Design voices" x 66 % y 64 % |
| Subject placement · angle · lens | Frontal, orthographic |
| Foreground / midground / background | FG: cursor; MG: panel; BG: dimmed card and canvas. No blur (dimming by opacity only) |
| Lighting | Graphic; panel shadow y 24 / blur 48 / 7 % |
| Materials | Satin white card and panel |
| Camera block | **CM-01** locked (typing is read). Roll 0 |
| Action and object motion | Cursor (960, 810) → chip (1536, 335): f241-255 E-GLIDE; dwell f256-265; press f266-268. Panel popover f269-270 (opacity 0 → 1 in 2 f, no scale); card opacity 1 → 0.5 f269-270. Typing f276-302 (30 cps) and f303-330 (18 cps). Cursor → (1267, 691) f331-345 E-GLIDE; dwell f346-351; press f352-354 |
| UI states and timeline | ED-03 → chip pressed f266 → VD-01 empty f269 → VD-02 typed f330 → "Design voices" pressed f352 (state VD-03 "Designing", label unchanged to the cut) |
| Typography | STR-05 Inter 500 cap 3 % H; STR-06 Inter 400 cap 3.2 % H; STR-07 Inter 500 cap 3 % H. STR-06 still 29 f after its last character |
| Transition in / out | In: TR-01 from S04 (lockup → editor on bar 4). Out: **TR-20**: last frames f352-359 the button pressed, panel static; first frame f360 the same panel (anchored) with three empty card outlines |
| Motion blur · DOF · grade · grain | Off · n/a · none · none |
| Sound cue | F01 click f352 (signature press). Chip press f266 silent. Suck-out −15 dB from f352 |
| Continuity | CB-2D. **Must stay unchanged:** card position (S02), panel position (S06), STR-06 exact string |
| Negatives | No keystroke sounds (R5), no text cursor glow, no autocomplete suggestions (not in the product capture) |

**Build spec:**

```
S05 | comp Lumen/S05 | f240-359
f241-255 cursor (960,810)->(1536,335) E-GLIDE | f256-265 dwell | f266-268 press chip
f269-270 panel VD-01 opacity 0->1; card opacity 1->0.5
f276-302 type "Warm, low, a little tired. " | f303-330 type "Late-night radio."
f331-345 cursor ->(1267,691) E-GLIDE | f346-351 dwell | f352-354 press "Design voices"
cut f359 (TR-20)
Continuity 2D: [CB-2D pasted verbatim]
```

---

### S06 · Proof A: answer + detail (composited, runs R-02)

| Field | Value |
|---|---|
| Shot · stage · duration | S06 · 4 Proof A · 4.0 s · **120 f (f360-479)** · 16:9 · 1920×1080 · 30 fps · Remotion |
| Purpose | Lumen returns three designed voices; the viewer hears one (Nightline) read the script |
| Layer split | **Composite:** panel VD-04, three cards (R-02 names, descriptors, waveform previews), cursor, karaoke script line, caption. **Audio:** R-02 Nightline read. Generated: nothing |
| Composition | Cards 17 % W × 22 % H centred at x 27 / 50 / 73 %, y 50 %; script line y 72 %; caption y 88 %. Panel anchored to S05 |
| Subject placement · angle · lens | Frontal, orthographic |
| Foreground / midground / background | FG: cursor; MG: cards; BG: panel and dimmed card |
| Lighting | Graphic; each card shadow y 12 / blur 24 / 6 % (half the hero card's) |
| Materials | Satin white cards |
| Camera block | **CM-02** breathe 1.00 → 1.06 linear f360-479, anchor (960, 540); peak 0.05 % W/f; roll 0 |
| Action and object motion | f360-367 hold. Develop cascade: card k (k = 0, 1, 2) writes f368+3k to f379+3k (AI gradient fill sweep L→R), settles f380+3k to f385+3k... last settle ends f391. Cursor (1267, 691) → Nightline ▶ (518, 626): f392-406 E-GLIDE; dwell f407-416; press f417-419; card outline 2 px ink at f417. Playhead on Nightline's card waveform f420-479; script words turn brick at R-02 onsets. Caption f437-445 E-OUT rise 1.5 % H |
| UI states and timeline | VD-03 Designing → VD-04 Results (f368-391) → Nightline selected f417 → Playing f420 → Done f479 |
| Typography | STR-08 names Inter 500 cap 3.2 % H; STR-08a-c descriptors Inter 400 cap 3 % H #6E6862; script line Inter 400 cap 3.2 % H; STR-09 caption Inter 300 cap 4 % H, "voice" in #A63D2A; caption held 43 f (≥ 42 f formula) |
| Transition in / out | In: TR-20 (anchored panel). Out: **TR-01** hard cut on bar 8; last frame f479 caption + cards; first frame f480 the editor card with the chip now reading "Nightline ▾" |
| Motion blur · DOF · grade · grain | Off · n/a · none · dither 1 % on the gradient f368-391 |
| Sound cue | F11 hit f372 (4 f after the first card appears). F18 Nightline f420-479; music ducked −10 dB f418-479 |
| Continuity | CB-2D. **Must stay unchanged:** names and descriptors exactly as R-02 returned them; Nightline's waveform (re-used in S07-S10, S12, S14) |
| Negatives | No star ratings, no "recommended" badge (not in the capture), no confetti, no card flip |

**Build spec:**

```
S06 | comp Lumen/S06 | f360-479 | audio R-02-nightline.wav at f420
f360-367 hold: 3 hairline outlines #E6E2DD
for k in 0..2: f(368+3k)-(379+3k) gradient fill sweep L->R #F6B26B->#EE7F6D; f(380+3k)-(385+3k) settle -> #FFFFFF card, ink text
f392-406 cursor (1267,691)->(518,626) E-GLIDE | f407-416 dwell | f417-419 press play
f420-479 playhead E-LINEAR (audio-locked); karaoke onsets from R-02
f437-445 caption STR-09 E-OUT
f360-479 scale 1.00->1.06 E-LINEAR
Continuity 2D: [CB-2D pasted verbatim]
```

---

### S07 · Proof B: ask (composited UI)

| Field | Value |
|---|---|
| Shot · stage · duration | S07 · 4 Proof B · 3.0 s · **90 f (f480-569)** · 16:9 · 1920×1080 · 30 fps · Remotion |
| Purpose | Choose three languages to dub the Nightline read into |
| Layer split | **Composite:** card ED-04 (Nightline), menu DB-01, cursor. Generated: nothing |
| Composition | Card as S02; menu x 62-82 %, y 35-62 %; button "Dub 3 languages" x 72 % y 66 % |
| Subject placement · angle · lens | Frontal, orthographic |
| Foreground / midground / background | FG: cursor; MG: menu; BG: card, canvas |
| Lighting | Graphic; menu shadow y 12 / blur 24 / 6 % |
| Materials | Satin white |
| Camera block | **CM-02** breathe 1.00 → 1.03 linear f480-569 (menu being read: peak 0.02 % W/f); roll 0 |
| Action and object motion | As the storyboard row: Dub press f506-508; menu opens 6 f (rows at f509, 511, 513, 515, 517, each 2 f opacity + 2 % H rise E-OUT); checks f522, f533, f544 (2 f fill); label switch f545 (1 f); press f562-564 |
| UI states and timeline | ED-04 → DB-01 open f509 → Hindi ✓ f522 → Japanese ✓ f533 → Spanish ✓ f544 → DB-02 "Dub 3 languages" f545 → pressed f562 (DB-03 "Dubbing") |
| Typography | STR-10 rows Inter 400 cap 3.2 % H; STR-10a button Inter 500 cap 3 % H. Menu on screen f509-569 = 60 f |
| Transition in / out | In: TR-01 (bar 8). Out: **TR-20** into S08: last frame f569 the pressed button and open menu; first frame f570 the same card as a 3D plane at identical pixels (±1 px), menu closed (it closes on the press, as the product does) |
| Motion blur · DOF · grade · grain | Off · n/a · none · none |
| Sound cue | F01 click f562 only; suck-out −15 dB from f562 |
| Continuity | CB-2D. **Must stay unchanged:** language order and names as in the product; Nightline waveform |
| Negatives | No flags as language icons, no globe icon, no country names |

**Build spec:**

```
S07 | comp Lumen/S07 | f480-569
f481-495 cursor -> Dub (1382,335) E-GLIDE | f496-505 dwell | f506-508 press
f509-517 menu rows 2 f stagger, E-OUT 2 f each
f515-521 hop -> Hindi | f522-524 press, check fill 2 f
f525-532 hop -> Japanese | f533-535 press | f536-543 hop -> Spanish | f544-546 press
f545 button label "Dub" -> "Dub 3 languages" (1 f)
f547-555 cursor -> button | f556-561 dwell | f562-564 press
cut f569 (TR-20)
Continuity 2D: [CB-2D pasted verbatim]
```

---

### S08 · Proof B: answer, 3D hero (custom 3D render)

| Field | Value |
|---|---|
| Shot · stage · duration | S08 · 4 Proof B · 4.0 s · **120 f (f570-689)** · 16:9 · 1920×1080 · 30 fps · Remotion + `@remotion/three`, rendered to `clips/lumen-dub-ribbons.mp4` (ProRes 4444 master, H.264 proxy for the kit) |
| Purpose | One voice becomes three languages: the waveform leaves the screen and splits into three ribbons, each speaking its language |
| Layer split | **3D render:** card plane (real UI texture), ribbons (geometry from R-02/R-03 waveforms), background radial. **Composite (2D, camera-facing):** language labels and translated lines (R-03 strings). **Audio:** R-03 reads. Generated: nothing |
| Composition | Start: card fills x 14-86 %, y 27-73 % (matches S07 ±1 px). After the pull-back (f606): card plane occupies x 30-70 %, tilted 25°; ribbons stacked at y 40 / 50 / 60 % (Hindi front, Japanese middle, Spanish back), labels right of each ribbon at x 66 %. After the dolly (f659): Japanese ribbon x 15-85 %, y 52 %; its label at x 50 %, y 70 % (cap 4.2 % H) |
| Subject placement · angle · lens | Camera 35 mm look, eye line 5° above the card plane after the pull-back |
| Foreground / midground / background | FG: Hindi ribbon (after f645: passes the lens, bokeh ≈ 30 px); MG: Japanese ribbon (focal plane after f645); BG: Spanish ribbon, tilted card plane, radial #F7F5F2 → #ECE8E3 blurred ≈ 12 px |
| Lighting | CB-3D: key upper left 5200 K, fill 1:4 from the right, no rim; contact shadows on the card plane only |
| Materials | Card: "satin white card" (texture-mapped UI, roughness 0.9). Ribbons: "matte ink ribbon", roughness 0.85, specular 2 %, colour #121110 at rest |
| Camera block | **CM-16** f578-587 ×0.57 (E-ZOOM, log space; peak ≈ 4.5 % W/f) then f588-606 ×0.56 (E-INOUT); **drift** f607-644 0.1 % W/f; **CM-04** f645-659 dolly ×2.2 E-OUT (peak on f645-647, ≈ 9 % W/f) through the Hindi ribbon; f660-689 near-still (0.05 % W/f). Focus: on the ribbon group until f644, then follows the dolly target to the Japanese ribbon (linked focus, not a separate rack). Roll 0. Moves counted: one composite camera path (pull-back → dolly) planned as a single spline; CM-16 and CM-04 are its two segments |
| Action and object motion | Card tilt 0 → 25° f578-606 E-INOUT. Ribbon lift: waveform extrudes 0.04 units deep and rises 6 % H f588-601 E-OUT. **TR-06** one → three: two copies translate on z to −0.6 / +0.6 units f592-605 E-OUT (declared duplication, not a morph). Develop: each ribbon's colour writes L→R in the AI gradient 12 f (Hindi f602, Japanese f606, Spanish f610) then settles to ink 6 f. Each ribbon's amplitude = its language's R-03 RMS envelope. Labels f612 / f616 / f620, 6 f E-OUT. Cause: the Dub press (S07 f562) |
| UI states and timeline | DB-03 Dubbing (f570) → three outputs ready (f602-627) → Hindi playing f612-656 → Japanese playing f662-709 |
| Typography | STR-11a-c labels: language name Inter 500 cap 3 % H + translated line Inter 400 cap 3 % H (Hindi in Noto Sans Devanagari 400, Japanese in Noto Sans JP 400: the two script fallbacks are the only non-Inter faces, metrics matched to Inter's cap height). Japanese label at 4.2 % H after the dolly. Hindi words switch to #A63D2A at R-03 onsets |
| Transition in / out | In: **TR-20** from S07 (first frame matched to S07's last at ±1 px; the switch to 3D is invisible until f578). Out: **TR-01** hard cut on beat 46 to the flat 2D editor (no crossfade 2D ↔ 3D) |
| Motion blur · DOF · grade · grain | Motion blur **on, 180° shutter**, f578-587 and f645-659 only. DOF: focal plane on the ribbon group (f-number equivalent giving ≈ 12 px far-plane blur @1080), then on the Japanese ribbon. Grade: match the 2D canvas (#F7F5F2 must render as #F7F5F2 at the focal plane). Dither 1 % on the radial |
| Sound cue | F11 hit f606 (4 f after the first develop, 6 f before Hindi). F07 whoosh, peak on f646 (fastest dolly frame), +4 dB above 4 kHz. F18 Hindi f612-656, Japanese f662-709 (L-cut into S09). Music ducked −10 dB under each read |
| Continuity | CB-3D. **Must stay unchanged:** UI texture = the S07 frame (vector, 2×); ribbon shapes = R-03 envelopes; language order Hindi / Japanese / Spanish front to back; translated strings exactly as R-03 returned them |
| Negatives | No particles, no light streaks, no glow on ribbons, no lens flare, no flags, no globe, no chromatic aberration, no rotation of the camera around the ribbons |

**Build spec (custom 3D):**

```
S08 | @remotion/three | 1920x1080 | 30 fps | f570-689 | out: clips/lumen-dub-ribbons.mp4
scene: plane "card" with texture S07_last_frame@3840 | ribbons from R-03 envelopes (hi, ja, es) | radial bg
camera: start = ortho-matched to S07 (+-1 px); 35 mm
f578-587 dolly back x0.57 (log-space, E-ZOOM) | f588-606 x0.56 E-INOUT | card rot.x 0 -> 25 deg E-INOUT f578-606
f588-601 ribbon extrude + rise 6 %H E-OUT | f592-605 copies z -0.6/+0.6 E-OUT
develop: hi f602-613, ja f606-617, es f610-621 gradient #F6B26B->#EE7F6D, settle 6 f -> #121110
labels (2D overlay, camera-facing): f612 / f616 / f620, E-OUT 6 f
f607-644 drift 0.1 %W/f | f645-659 dolly x2.2 E-OUT through hi ribbon, focus -> ja | f660-689 near-still
motion blur 180 deg on f578-587, f645-659
Continuity 3D: [CB-3D pasted verbatim]
```

---

### S09 · Proof C: ask (composited UI)

| Field | Value |
|---|---|
| Shot · stage · duration | S09 · 4 Proof C · 2.0 s · **60 f (f690-749)** · 16:9 · 1920×1080 · 30 fps · Remotion |
| Purpose | Direct the read: tag "at midnight" with `[whispers]` |
| Layer split | **Composite:** card ED-04, selection, popover DR-01, chip, cursor. Generated: nothing |
| Composition | Card as S02; selection over "at midnight" (x 52-63 %, y 47 %); popover above it x 50-66 %, y 33-43 %; chip inserted at x 52 % |
| Subject placement · angle · lens | Frontal, orthographic |
| Foreground / midground / background | FG: cursor, popover; MG: card text; BG: canvas |
| Lighting | Graphic; popover shadow y 12 / blur 24 / 6 % |
| Materials | Satin white; chip pill #E6E2DD |
| Camera block | **CM-02** breathe 1.00 → 1.03 linear; peak 0.02 % W/f; roll 0 |
| Action and object motion | As the storyboard row (drag f708-722 E-LINEAR selection growth; popover 2 f; press f740-742; chip 1 f state switch f743; text shift 6 f E-OUT f743-748) |
| UI states and timeline | ED-04 → selection f708-722 → DR-01 open f724 → `[whispers]` pressed f740 → ED-05 (tagged) f743; popover open to f749 |
| Typography | STR-13 popover rows Inter 400 cap 3.2 % H, held 26 f; chip STR-13b Inter 500 cap 3.2 % H |
| Transition in / out | In: TR-01 from S08 (3D → 2D hard cut). Out: **TR-23** anchored + **CM-20** ×1.4 reframe: last frame f749 the tagged line at 1.03×; first frame f750 the same line at 1.4×, its centre at the same pixels (960, 508) |
| Motion blur · DOF · grade · grain | Off · n/a · none · none |
| Sound cue | Silent presses. F18 Japanese tail ends f709; music ducked to f709 then back to groove |
| Continuity | CB-2D. **Must stay unchanged:** STR-02 string; tag syntax exactly as the product shows it (`[whispers]`, square brackets, lower case) |
| Negatives | No sparkle on insert, no chip bounce, no tooltip text that is not in the capture |

**Build spec:**

```
S09 | comp Lumen/S09 | f690-749
f708-722 selection rect width 0 -> "at midnight" E-LINEAR (#E6E2DD)
f724-725 popover DR-01 opacity 0->1
f726-735 cursor -> [whispers] E-GLIDE | f736-739 dwell | f740-742 press
f743 chip insert (1 f) | f743-748 following text x shift E-OUT 6 f
f690-749 scale 1.00->1.03 E-LINEAR
Continuity 2D: [CB-2D pasted verbatim]
```

---

### S10 · Proof C: answer + detail (composited, run R-04)

| Field | Value |
|---|---|
| Shot · stage · duration | S10 · 4 Proof C · 3.0 s · **90 f (f750-839)** · 16:9 · 1920×1080 · 30 fps · Remotion |
| Purpose | Hear the direction: Nightline re-reads the line and whispers the tagged words; the waveform shows the drop |
| Layer split | **Composite:** ×1.4 card, waveform from R-04, karaoke, caption. **Audio:** R-04. Generated: nothing |
| Composition | Line centred (960, 508) at cap 4.5 % H; waveform x 11-89 %, y 62.4 %; Speak x 89 %, y 74 %; caption y 88 % |
| Subject placement · angle · lens | Frontal, orthographic ×1.4 |
| Foreground / midground / background | FG: cursor, playhead; MG: line + waveform; BG: card white |
| Lighting | Graphic |
| Materials | Satin white; ink stroke |
| Camera block | **CM-02** breathe 1.00 → 1.06 linear f768-839, anchor drifting 4 % W toward the chip (0.06 % W/f); roll 0 |
| Action and object motion | Cursor f750-757 E-GLIDE to Speak; dwell f758-764; press f765-767; waveform → flat grey in 1 f at f765; hold f768-775; write f776-787 AI gradient; settle f788-793; playhead f778-837; amplitude from R-04 (≈35 % under "at midnight"); karaoke onsets from R-04. Caption f796-804 E-OUT |
| UI states and timeline | ED-05 → SP-1 Speaking f765 → SP-2 Playing f778 → Done f837 |
| Typography | STR-02 + chip at 4.5 % H (Inter 400); STR-12 caption Inter 300 cap 4 % H, "line" in #A63D2A, held 44 f |
| Transition in / out | In: TR-23 + CM-20 (from S09). Out: **TR-02** beat cut on bar 14 (f840): last frame f839 caption over the settled waveform; first frame f840 the stat composition |
| Motion blur · DOF · grade · grain | Off · n/a · none · dither 1 % f776-793 |
| Sound cue | F01 click f765 (signature 4/4); suck-out f765-775; F18 whisper read f778-837; music ducked −12 dB f776-839; no hit |
| Continuity | CB-2D. **Must stay unchanged:** R-04 waveform shape (it reappears in S14 as the "whisper" waveform) |
| Negatives | No "AI" label on the waveform, no level meters, no loudness numbers |

**Build spec:**

```
S10 | comp Lumen/S10 | f750-839 | audio R-04.wav at f778
camera scale 1.40 * (1.00 -> 1.06 E-LINEAR f768-839), anchor (960,508) -> (1037,508)
f750-757 cursor -> Speak (1709,799) | f758-764 dwell | f765-767 press | f765 waveform -> flat #8A847E (1 f)
f776-787 write gradient | f788-793 settle #121110 | f778-837 playhead + karaoke (R-04 onsets)
f796-804 caption STR-12 E-OUT
Continuity 2D: [CB-2D pasted verbatim]
```

---

### S11 · Evidence: number (motion-kit `stat` or Remotion)

| Field | Value |
|---|---|
| Shot · stage · duration | S11 · 5 Evidence · 2.0 s · **60 f (f840-899)** · 16:9 · 1920×1080 · 30 fps · motion-kit `stat` (theme `studio`, motion `calm`) or the same layout in Remotion |
| Purpose | One signed number: time from Speak to sound |
| Layer split | Composite only (type and meter). Generated: nothing |
| Composition | Kicker y 34 %, value y 50 %, label y 63 %, source y 71 %, all centred; ≈ 85 % empty |
| Subject placement · angle · lens | Frontal, orthographic |
| Foreground / midground / background | Single plane |
| Lighting | Graphic |
| Materials | Ink on matte paper canvas |
| Camera block | **CM-02** breathe 1.00 → 1.06 linear; peak 0.05 % W/f; roll 0 |
| Action and object motion | Kicker, label, source 9 f E-OUT f840-848; value counter 0 → 400 E-SNAP-L f846-869 (integer steps), lock f870 |
| UI states and timeline | n/a: evidence card, no product UI |
| Typography | STR-14 Inter 500 cap 3 % H; STR-15 Inter 300 T-HERO cap 12 % H, tabular figures; STR-16 Inter 300 cap 4 % H ("sound" in #A63D2A); STR-17 Inter 400 cap 3 % H #6E6862, on screen 1.8 s (needs 1.18 s) |
| Transition in / out | In: TR-02 (bar 14). Out: **TR-02** beat cut on bar 15 (f900) to S12 |
| Motion blur · DOF · grade · grain | Off · n/a · none · none |
| Sound cue | F06 lock accent f870 (anchor: final value), low level; groove thins f840 |
| Continuity | CB-2D. **Must stay unchanged:** C01 wording and value exactly as signed |
| Negatives | No "up to", no "fastest", no comparison to another product |

**Build spec:** motion-kit scene `{ "type": "stat", "kicker": "Median · internal test", "value": "400ms", "label": "from Speak to *sound*" }`; the source line STR-17 is added in the custom pass (the kit `stat` has no footnote field, Guideline 03 §14.1). Continuity 2D: [CB-2D pasted verbatim].

---

### S12 · Evidence: scope (motion-kit `title` or Remotion)

| Field | Value |
|---|---|
| Shot · stage · duration | S12 · 5 Evidence · 3.0 s · **90 f (f900-989)** · 16:9 · 1920×1080 · 30 fps · motion-kit `title` or Remotion |
| Purpose | Label Proof B with its signed scope: 29 languages, one voice |
| Layer split | Composite only |
| Composition | Kicker y 38 %; statement y 50 %; motif line x 30-70 %, y 62 % |
| Subject placement · angle · lens | Frontal, orthographic |
| Foreground / midground / background | Single plane |
| Lighting | Graphic |
| Materials | Ink on matte paper canvas |
| Camera block | **CM-02** breathe 1.00 → 1.04 linear; roll 0 |
| Action and object motion | Kicker f900-908 E-OUT; words f903 / f908 / f913 / f918 6 f E-OUT; motif line (Nightline waveform, 1.5 px ink) draws L→R f924-935 E-LINEAR |
| UI states and timeline | n/a |
| Typography | STR-18 Inter 500 cap 3 % H; STR-19 Inter 300 T-STATEMENT cap 5.8 % H, "voice" in #A63D2A; on screen from f918 to f989 = 72 f (needs 52 f) |
| Transition in / out | In: TR-02. Out: **TR-13** defocus dissolve 6 f f984-989: S12 blurs 0 → 12 px while S13's first frame resolves 12 → 0 px |
| Motion blur · DOF · grade · grain | Off · n/a · none · none |
| Sound cue | No SFX. **Breakdown starts f900** (low-pass, −10 dB) |
| Continuity | CB-2D. **Must stay unchanged:** C02 wording |
| Negatives | No flags, no world map, no list of 29 names |

**Build spec:** motion-kit `{ "type": "title", "kicker": "Dubbing", "headline": "29 languages, one *voice*." }` + custom motif line. Continuity 2D: [CB-2D pasted verbatim].

---

### S13 · Trust (composited UI)

| Field | Value |
|---|---|
| Shot · stage · duration | S13 · 5 Trust · 3.0 s · **90 f (f990-1079)** · 16:9 · 1920×1080 · 30 fps · Remotion |
| Purpose | Show the consent gate on cloning as a real setting (C03) |
| Layer split | **Composite:** statement, card VC-01, consent waveform (from R-05, the released team member's recording, shown not played), status pill, cursor. Generated: nothing |
| Composition | Statement y 26 %; card x 20-80 %, y 42-80 %; Verify button x 72 % y 72 %; status pill x 30 % y 72 % |
| Subject placement · angle · lens | Frontal, orthographic |
| Foreground / midground / background | FG: cursor; MG: card; BG: canvas |
| Lighting | Graphic; card shadow y 24 / blur 48 / 7 % |
| Materials | Satin white card; pill outline 1 px ink |
| Camera block | **CM-02** breathe 1.00 → 1.08 linear; peak 0.06 % W/f; roll 0 |
| Action and object motion | Statement words f990/995/1000/1005, 6 f E-OUT each; card f1008-1019 E-OUT rise 6 % H; cursor f1020-1031 E-GLIDE, dwell f1032-1037, press f1038-1040; pill 1 f switch f1043 |
| UI states and timeline | VC-01 "Not verified" → Verify pressed f1038 → VC-02 "✓ Verified" f1043 |
| Typography | STR-20 Inter 300 T-STATEMENT ("voice" in #A63D2A); STR-21 Inter 400 cap 3 % H; STR-22 Inter 500 cap 3 % H, held 36 f (≥ 1.0 s floor) |
| Transition in / out | In: TR-13 (from S12). Out: **TR-18** polarity flip hard cut to dark at f1080 |
| Motion blur · DOF · grade · grain | Off · n/a · none · none |
| Sound cue | F03 toggle f1038; breakdown pad; 100 ms gap f1077-1079 |
| Continuity | CB-2D. **Must stay unchanged:** C03 wording as approved by Lumen's product lead |
| Negatives | No padlock or shield icons, no "100 % secure", no faces, no ID cards |

**Build spec:**

```
S13 | comp Lumen/S13 | f990-1079
f990/995/1000/1005 statement words E-OUT 6 f
f1008-1019 card VC-01 y +6%H -> 0, E-OUT 12 f
f1020-1031 cursor -> Verify E-GLIDE | f1032-1037 dwell | f1038-1040 press | f1043 pill "Not verified" -> "✓ Verified"
f990-1079 scale 1.00->1.08 E-LINEAR
Continuity 2D: [CB-2D pasted verbatim]
```

---

### S14 · Climax (custom render)

| Field | Value |
|---|---|
| Shot · stage · duration | S14 · 6 Climax · 3.0 s · **90 f (f1080-1169)** · 16:9 · 1920×1080 · 30 fps · custom Remotion (2D, with depth-free orbit) → `clips/lumen-climax.mp4` |
| Purpose | Collect every voice the film made into one line: the Lumen mark |
| Layer split | Composite only: six waveform paths re-used from S03, S06, S08 (×3), S10; the mark SVG; sparks. Generated: nothing |
| Composition | Ring centred (960, 540), radius 24 % H (259 px); each waveform 14 % W; mark 6 % W at centre |
| Subject placement · angle · lens | Frontal; 50 mm look implied (no perspective: CB-3D lens note applies only if rendered in 3D) |
| Foreground / midground / background | Single plane on dark #0E0D0C |
| Lighting | Waveforms are the only emitters (#F7F5F2); no glow on the mark |
| Materials | Light lines on dark matte field |
| Camera block | **CM-02** push 1.00 → 1.10 linear f1080-1163; **E-PUNCH** +25 % f1164-1169 into the cut; roll 0 |
| Action and object motion | Arcs from the frame edges to the ring, 18 f E-SNAP, starts f1080/1084/1088/1092/1096/1100. Stepped orbit 60° per step, 10 f E-HOP: f1118-1127, f1136-1145. Implosion to centre 8 f E-EXIT f1152-1159 (scale 1 → 0). One-frame swap to the mark at f1160. 10 sparks radial, 10 f E-OUT, then opacity → 0 by f1169, colours #F6B26B / #F4A78F |
| UI states and timeline | n/a: brand world |
| Typography | None |
| Transition in / out | In: **TR-18** from S13 (light → dark on f1080, music re-entry). Out: **TR-18** to light on f1170; last frame f1169 mark at punch peak with sparks fading; first frame f1170 the S15 plate with STR-01 |
| Motion blur · DOF · grade · grain | Blur 180° on arcs (peak ≈ 22 % W on f1) and implosion (≈ 5 % W/f on its last frame); off on orbit steps (≈ 2.5 % W/f). DOF n/a. Dither 1 % on sparks |
| Sound cue | Re-entry f1080 (densest). F08 swish f1118, f1136 (+3 dB above 4 kHz). F11 hit + F12 sub f1160 |
| Continuity | CB-2D (dark variant) + CB-3D lens rule. **Must stay unchanged:** each waveform's shape from its source shot; mark geometry |
| Negatives | No continuous 360° spin, no lens flare, no more than 12 sparks, no white flash frame |

**Build spec:**

```
S14 | comp Lumen/S14 | f1080-1169 | bg #0E0D0C
paths: wf_ember(S03), wf_nightline(S06), wf_hi, wf_ja, wf_es (S08), wf_whisper(S10); stroke 2 px #F7F5F2, 14 %W
arcs: start f1080+4k (k=0..5), 18 f E-SNAP, from edge points to ring angle 60k deg, r = 259 px
orbit: rotate ring +60 deg f1118-1127 E-HOP; +60 deg f1136-1145 E-HOP
implode: f1152-1159 all paths -> centre, scale 1 -> 0, E-EXIT
f1160: swap to mark SVG #F7F5F2 (1 f); sparks n=10 radial 10 f E-OUT
camera: f1080-1163 scale 1.00->1.10 E-LINEAR; f1164-1169 E-PUNCH +25 %
motion blur 180 deg on arcs + implosion only
Continuity 2D: [CB-2D pasted verbatim]
```

---

### S15 · Bookend (generated plate + composited type)

| Field | Value |
|---|---|
| Shot · stage · duration | S15 · 7 Bookend · 1.5 s · **45 f (f1170-1214)** · 16:9 · 1920×1080 · 30 fps (plate 24 → 30) · Veo 3.1 Quality (P-02) + Remotion |
| Purpose | Return the hook, struck, and resolve it into the thesis "Type it. Hear it." in the same room, now at dawn |
| Layer split | **Generate:** P-02 plate (same window, dawn). **Composite:** STR-01, strike, STR-24, disclosure tag |
| Composition | Window left 55 % (same framing as P-01, ±2 % W); STR-01 y 42 %; STR-24 y 54 %; both centred; text band y 36-60 % graded so no plate pixel is darker than #E4E0DA |
| Subject placement · angle · lens | As P-01: 30° to the window, sill height, 50 mm look |
| Foreground / midground / background | FG: rain beads (fewer, drying); MG: frame; BG: pale sky, soft |
| Lighting | Overcast dawn 5600 K through the window from the upper left; room high-key; wall near #F7F5F2 |
| Materials | As CB-L1 |
| Camera block | **CM-01** locked-off in the plate; composite **CM-02** breathe 1.00 → 1.05 linear f1170-1214; roll 0 |
| Action and object motion | Strike f1172-1179 E-LINEAR; dim f1180-1183; punch words f1182 / f1187 / f1192 / f1197, 6 f E-OUT. Cause: the climax's resolution (the mark has formed) |
| UI states and timeline | n/a |
| Typography | STR-01 Inter 400 cap 4.5 % H ink; STR-24 Inter 300 T-PUNCH cap 5 % H, "Hear it." in **#7A2A1C** (7.34:1 on #E4E0DA); STR-23 tag |
| Transition in / out | In: TR-18 (dark → light). Out: **TR-23** anchored: STR-24 identical pixels f1214/f1215; the plate is replaced by canvas on f1215 |
| Motion blur · DOF · grade · grain | Off (type). DOF: plate focus on the glass. Grade to L1 with the text-band luma floor #E4E0DA; grain 1 % plate only |
| Sound cue | Soft pluck f1197 (music stem); 150 ms gap f1210-1214 |
| Continuity | CB-L1 + CB-2D. **Must stay unchanged:** P-01 framing (REF-1), STR-01 position relative to S01 (moved up 5 % H to make room; same size ratio) |
| Negatives | NEG-L1 + no sun disc, no warm golden-hour colour, no birds |

**Generation prompt (P-02, Veo 3.1 Quality, reference-guided with REF-1):**

```
Locked-off static camera, 50 mm lens look, eye level at the window sill, level horizon, no camera movement.
The same tall four-pane window as the reference image, same framing and angle, filling the left half of the
frame; the plain plaster wall on the right is bright and almost white. A few rain beads remain on the glass;
one drop runs slowly down. Early overcast dawn: soft even daylight comes through the window from the upper
left; the room is bright, quiet and high-key, with a large pale empty area across the middle of the frame for
graphics. Calm, airy, low contrast, fine film grain.
Continuity L1: interior of a quiet home recording corner, nobody in frame. A tall four-pane window with a thin
off-white painted wooden frame fills the left 55 % of the frame, seen at a 30-degree angle; a plain warm
off-white plaster wall fills the right; the window sill sits 22 % above the bottom edge. Rain beads and a few
slow running drops on the glass. Light enters only through the window, from the upper left. 50 mm lens look,
camera at sill height, level horizon, roll 0, locked-off camera. Very shallow depth of field: focus on the
raindrops on the glass, everything beyond the glass soft. Palette near-black #0E0D0C, warm grey #8A847E,
off-white #F7F5F2; no saturated colour. Fine film grain 1 %.
```

Negative prompt: NEG-L1 + `sun, golden hour, orange light, birds`. References: REF-1 (P-01 take, frame 48) as the subject/framing ingredient, REF-2 palette. Seed 41730. Start/end frame: none (ingredient-guided; never a morph from P-01). Generation length **4 s** for a 1.5 s edit (minimum clip unit); use source frames 30-65. 4 takes.

**Build spec:**

```
S15 | comp Lumen/S15 | f1170-1214
layers: P-02 (graded, luma floor #E4E0DA in y 36-60 %) | STR-01 | strike | STR-24 | STR-23 tag
f1172-1179 strike width 0 -> "a studio?" E-LINEAR | f1180-1183 "a studio?" opacity 1 -> 0.5
f1182/1187/1192/1197 STR-24 words E-OUT 6 f ("Hear it." #7A2A1C)
f1170-1214 scale 1.00->1.05 E-LINEAR (plate and type together)
Continuity 2D: [CB-2D pasted verbatim]
```

---

### S16 · Lockup + CTA (motion-kit `cta` + `logo`, or Remotion)

| Field | Value |
|---|---|
| Shot · stage · duration | S16 · 8 Resolution · 4.5 s · **135 f (f1215-1349)** · 16:9 · 1920×1080 · 30 fps · Remotion (exact layout); the kit draft uses `cta` (`style: "link"`) → `logo` |
| Purpose | Brand lockup with the thesis, a verb CTA, availability and URL; the only still frame |
| Layer split | Composite only: logo SVG (supplied), STR-24 (anchored), STR-25, STR-26 |
| Composition | Mark + wordmark centred y 38 % (wordmark cap 7 % H); tagline y 54 %; CTA y 68 %; footer y 80 %. Clear space around the mark ≥ its height. ≈ 86 % empty |
| Subject placement · angle · lens | Frontal, orthographic |
| Foreground / midground / background | Single plane |
| Lighting | Graphic |
| Materials | Ink on matte paper canvas |
| Camera block | **CM-01** dead still from f1248 (no breathe on the lockup by design); roll 0 |
| Action and object motion | Converge f1215-1223 (8 px per side, E-OUT; opacity 0 → 1 in 6 f); CTA f1228-1236 E-OUT rise 2 % H; underline f1236-1247 E-LINEAR; footer f1240-1247 E-OUT; end fade f1336-1349 E-LINEAR to #F7F5F2 |
| UI states and timeline | n/a |
| Typography | STR-03 logo; STR-24 unchanged from S15; STR-25 "Try Lumen →" Inter 500 T-CTA cap 5.4 % H ink; STR-26 Inter 400 T-URL cap 3.6 % H (needs 2.6 s; on screen 3.7 s) |
| Transition in / out | In: TR-23 anchored (from S15). Out: **TR-24** 14 f fade to canvas; music outlasts the last visible change |
| Motion blur · DOF · grade · grain | Off · n/a · none · none |
| Sound cue | F17 sting f1215 (±2 f), loudest sustained moment; tail 1.8 s; ≤ −60 dB by f1349 |
| Continuity | CB-2D. **Must stay unchanged:** logo SVG and clear space; CTA string ≤ 16 characters ("Try Lumen" = 9); URL spelling |
| Negatives | No button pulse, no QR code (no need to scan from a launch film), no social icons, no "Download now" |

**Build spec:**

```
S16 | comp Lumen/S16 | f1215-1349
f1215-1223 mark x -8 px -> 0, wordmark x +8 px -> 0, E-OUT; opacity 0->1 over 6 f
f1228-1236 STR-25 E-OUT | f1236-1247 underline E-LINEAR | f1240-1247 STR-26 E-OUT
f1248-1335 still | f1336-1349 fade to #F7F5F2 E-LINEAR
Continuity 2D: [CB-2D pasted verbatim]
```

---

## 6. Part F: Continuity bible and Scene N → N+1 notes

### F.1 Continuity bible (Phase 17)

| Token | Locked value |
|---|---|
| **Product design** | Lumen is software; its "object" is the mark (a 2 px line with one centred peak, 6 % W in the lockup) and the wordmark, both from the supplied SVG. Never redrawn, never generated, never extruded |
| **UI** | Figma frames ED-01..05 (editor), VD-01..04 (voice design), DB-01..03 (dub), DR-01 (direct popover), VC-01..02 (cloning consent). Editor card #FFFFFF, 72 % W × 46 % H, centred, radius 28 px, shadow y 24 / blur 48 / 7 % ink + 1 px #E6E2DD hairline. Secondary surfaces (panel, menu, popover, voice cards): shadow y 12 / blur 24 / 6 %. Buttons: ink fill, white Inter 500 label, radius 999 px. Chips: #E6E2DD pill, ink label. Icon set: the product's own line icons (1.5 px stroke). Cursor: native macOS arrow, 2 % H, black with white outline. Real labels only (STR table). Data: §G.6 |
| **Colours** | #F7F5F2 canvas (product world) · #0E0D0C dark (no-Lumen world, brand world) · #121110 ink · #A63D2A accent = a heard word (#7A2A1C over footage, #F4A78F on dark) · #F6B26B → #EE7F6D AI family = Lumen is generating (12 f write + 6 f settle only) · #8A847E silent line · #6E6862 muted text (body-safe, 5.05:1) · #E6E2DD hairlines, selections, chip fills. One meaning per colour; ≤ 1 accent word per frame |
| **Typography** | Inter 300 statements (tracking −0.02 em), 400 UI/body, 500 labels/CTA; Noto Sans Devanagari 400 and Noto Sans JP 400 only for the R-03 lines. Sentence case. Size tokens (cap % H @1080 → font px): T-HOOK 6.8 % (101 px), T-HERO 12 % (178 px), T-STATEMENT 5.8 % (86 px), T-PUNCH 5.0 % (74 px), T-CTA 5.4 % (80 px), T-UI-L 4.5 % (67 px, ×1.4 views), T-CAPTION 4.0 % (59 px), T-URL 3.6 % (53 px), T-UI 3.2 % (48 px), T-META 3.0 % (45 px), T-TAG 2.5 % (37 px, disclosure only). 9:16: body font ≥ 52 px (font size, not cap height; P07, G-27). String table §G.4 |
| **Lighting direction** | Upper left, always: 2D card shadows fall down-right; 3D key upper left 5200 K, fill 1:4 right, no rim; plates lit only through the window from the upper left (night 3400 K street light; dawn 5600 K overcast) |
| **Materials** | "Satin white card" (UI surfaces), "matte paper canvas", "matte ink ribbon" (roughness 0.85, specular 2 %), plates: "clear glass, beaded rain", "off-white painted wood, matte", "plaster, matte". Same words in every prompt |
| **Camera physics** | 2D: orthographic; breathing push +3 to +8 % per hold (CM-02 calm/minimal band; default +8-12 %), E-LINEAR, ≤ 0.2 % W/f while text is read; cut-ins ×1.4 only. 3D: 35 mm look (S08); max 3 planes. Roll 0, shake none, overshoot 0 %. Motion blur 180° only above 5 % W/f |
| **Geography** | Product world: the editor card is always centred at the same pixels when shown flat (S02, S05, S07, S09 ±1 px). Header left = brand, header right = voice chip and Dub. Script line centre (960, 508). Plate world: window on the left, wall on the right, sill at 22 % from the bottom, the same in P-01, P-02 and both 9:16 plates |
| **Objects / motif** | The line: flat #8A847E 2 px = silent; waveform = speaking; ribbon = a voice in another language; the mark = all voices in one. Waveform shapes come only from logged audio (R-01..R-04) |
| **Characters** | None on screen. The S13 consent waveform comes from a Lumen team member's real recording (release on file, G-03); it is shown, not played. No synthetic people |
| **Scale** | Hero card 72 % W; voice cards 17 % W; ribbons 70 % W after the dolly; mark 6 % W (S04, S14, S16); hook type cap 6.8 % H; must-read UI text ≥ 3 % H, ≥ 4 % H after a cut-in |
| **Animation language** | Text per SP-T0: entrances E-OUT (words 4-7 f, statements 8-14 f); exits E-EXIT 4-6 f (whole cards 4-8 f); cursor E-GLIDE 12-15 f, dwell 6-10 f, press 3 f; UI state changes 1-2 f; menus 6 f, rows 2 f apart; line re-centre E-LERP k 0.22; counters E-SNAP-L; morph E-INOUT 10 f; orbit E-HOP 10 f; punch E-PUNCH 6 f. **Signature device:** Speak → develop (press → 6-8 f → 8 f empty hold → 12 f AI write → 6 f settle → voice), 4 uses, only on presses that make Lumen generate audio |
| **Transition logic** | Allowed families: TR-01 hard cut, TR-02 beat cut, TR-18 polarity flip (stage-world changes only: S01→02, S13→14, S14→15), TR-20 interaction cut (signature presses), TR-22 generation state (inside shots), TR-23 anchored cut, TR-07 UI morph (1, S04), TR-06 many → one (1, S14), TR-13 defocus dissolve (1, into the trust breather), TR-24 end fade (1). Never: crossfade on UI or text, 2D ↔ 3D crossfade, flash frames, whip pans, light leaks |
| **Generated-plate identity** | Look L1 · seed 41730 · Veo 3.1 Quality 1080p · REF-1/REF-2 · CB-L1 pasted verbatim · plates graded together against P-01 frame 48 · all plates tagged "AI-generated background" on screen and logged |

### F.2 Anchors (G-17)

| Anchor | Coordinates @1080 | Locked across |
|---|---|---|
| Editor card | x 269-1651, y 292-788 (±1 px) | S02 ↔ S05 ↔ S07 ↔ S09, and S07 → S08 first frame |
| Script line centre | (960, 508) | S02 → S03 (×1.4 about it), S09 → S10 (×1.4 about it) |
| Waveform | x 211-1709, y 674 (after ×1.4) | S03 → S04 (f179/f180, ±1 px) |
| Voice-design panel | x 384-1536, y 378-745 | S05 → S06 |
| Thesis line STR-24 | centred, y 583 | S15 → S16 (f1214/f1215, pixel-identical incl. colour #7A2A1C) |

### F.3 Scene N → N+1 connection notes (every cut)

| Cut | Frame | End of N (last frame, motion, speed) | Start of N+1 | Matched element and position | Identical across the cut | Cause |
|---|---|---|---|---|---|---|
| S01 → S02 | f59/f60 | Dark field at the E-PUNCH peak (+22 %), words and flat line largest, growth ≈1.4 % W/f outward | Light canvas, editor card static, empty script field with caret | Centre of attention: the hook line at (960, 508) → the script field at (960, 508): within ±0 % W | Flat line concept (grey, horizontal, under the text): S01 y 60 % ↔ S02 y 58 % | TR-18 on the downbeat f60 (bar 1) after the punch |
| S02 → S03 | f119/f120 | Speak pressed f112-114, everything static f115-119 | ×1.4 cut-in on the same line, flat line under it, 8 f hold | Script line centre (960, 508), same | STR-02, flat line colour, card white | The Speak press (TR-20, 7 f later) |
| S03 → S04 | f179/f180 | Settled ink waveform, playhead at its end, voice ended f178; breathe at 1.05× | Same waveform at identical pixels on bare canvas; morph starts f180 | Waveform, ±1 px | Waveform shape and colour (ink) | The voice ending (TR-23) |
| S04 → S05 | f239/f240 | Lockup at 1.05× (still breathing, 0.05 % W/f) | Editor card at S02 position, now with Ember's ink waveform | None needed: hard cut back into the product world on bar 4 | Canvas colour; Lumen wordmark (hero → header) | Bar line (TR-01), new proof block |
| S05 → S06 | f359/f360 | "Design voices" pressed f352-354; panel static | Same panel, three empty outlines, 8 f hold | Panel x 384-1536, y 378-745 | Panel frame, STR-06 (still visible at the panel top) | The press (TR-20, signature 2/4) |
| S06 → S07 | f479/f480 | Nightline read ended f479, caption fully in, cards static, 1.06× | Editor card, chip now "Nightline ▾", Nightline waveform | Editor card at its anchor | The Nightline waveform shape (panel card → editor) | Bar 8 (TR-01), next block |
| S07 → S08 | f569/f570 | Button pressed f562-564; static f565-569 (menu closes with the press) | The same card as a textured 3D plane, ortho-matched | Whole card, ±1 px | Every UI pixel (texture = S07's last frame at 2×) | The Dub press (TR-20, signature 3/4) |
| S08 → S09 | f689/f690 | Japanese ribbon near-still at 0.05 % W/f; Japanese voice mid-word (continues as an L-cut to f709) | Flat 2D editor at its anchor; Nightline waveform | Nightline waveform (ribbon → flat waveform), centre within ±5 % W | Waveform shape; Japanese audio continues | Beat 46 (TR-01); a 2D ↔ 3D change is always a hard cut |
| S09 → S10 | f749/f750 | Tagged line at 1.03×, popover open, text shift settled f748 | Line at 1.4× (reframe), popover closed | Line centre (960, 508) | STR-02 + `[whispers]` chip | Reframe on the tagged words (TR-23 + CM-20) |
| S10 → S11 | f839/f840 | Whisper ended f837; caption and settled waveform, 1.06× | Stat composition, kicker entering | Centre of attention (960, 540) → value (960, 540) | Canvas, ink | Bar 14 (TR-02 beat cut) |
| S11 → S12 | f899/f900 | Value locked since f870, still breathing | Kicker entering; statement words follow | Value (y 50 %) → statement (y 50 %) | Canvas, type family, centre line | Bar 15 (TR-02) + breakdown start |
| S12 → S13 | f984-989 | Statement + motif line, blurring 0 → 12 px | S13 resolving 12 → 0 px, statement words entering | Statement y 50 % → statement y 26 % (moves up: the card below needs room) | Canvas, type style T-STATEMENT | TR-13 into the breather (6 f) |
| S13 → S14 | f1079/f1080 | "✓ Verified" held 36 f; 100 ms audio gap | Dark field; first arc entering from the edge | Centre (960, 540) | Waveform family (the consent waveform's stroke style = the climax lines) | TR-18 on music re-entry f1080 |
| S14 → S15 | f1169/f1170 | Mark at the punch peak (+25 %), sparks fading | Dawn plate, STR-01 at y 42 %, strike beginning | Mark at centre → the hook line at centre | Thesis world change dark → light | TR-18 on f1170, after the implosion hit (f1160) |
| S15 → S16 | f1214/f1215 | STR-24 complete since f1202; 150 ms audio gap | Canvas; STR-24 unchanged; mark and wordmark converging | STR-24, pixel-identical | STR-24 string, size, colour (#7A2A1C) | TR-23 + F17 sting on f1215 |

---

## 7. Part G: Sound cue sheet, strings, claims, data

### G.1 Music brief

Licensed track (open item O6), **120 BPM** (beat 15 f, bar 60 f), one tempo, edited on bar lines to exactly 45.0 s:
pad-led restrained electronic, soft plucks, warm keys, sparse kick and shaker only after the drop, no trailer drums,
no choirs, no risers longer than 1 s. Stems needed: pad, plucks, keys, drums, sub, riser, sting. Mixed under
Lumen's voices (the hero layer) with a 10-12 dB duck and 3-5 f fades so no duck pumps on a word.

### G.2 Cue sheet (event list in frames; levels short-term)

| Frame | Shot | Layer | Family / event | Anchor | Level |
|---|---|---|---|---|---|
| f0 | S01 | SFX | F12 sub hit (+ 100-300 Hz harmonic) | First frame | −6 dB peak |
| f0, f3, f9 | S01 | Music | Pluck per hook word | Word entrance | In bed |
| f0-1350 | all | Bed | F16 room tone | Continuous | −42 dB |
| f60-91 | S02 | SFX | F02 keystroke passage | Typing | −22 dB under full music |
| f60-115 | S02 | Music | Near-silence floor | Setup | −40 to −45 dB |
| f87-115 | S02 | Music | F09 riser, crest f115 | Pre-reveal | Crest −12 dB |
| f112 | S02 | SFX | F01 click | Speak press (signature 1) | Clear inside the dip |
| f116-121 | S02/S03 | Music | Gap | Before the drop | ≤ −35 dB |
| f122 | S03 | Music + SFX | **Drop** + F11 hit | 2 f after the reveal cut | Hit +10 dB over the bed |
| f126-178 | S03 | Music | Duck −10 dB | Under Ember | Body −22 to −28 dB |
| f128-178 | S03 | Product audio | **F18 Ember** (R-01) | Speak result | Hero layer, −16 LUFS short-term |
| f180 | S04 | Music | Full groove | Reveal lockup | Body −12 to −18 dB |
| f352 | S05 | SFX | F01 click | "Design voices" (signature 2) | Clear |
| f352-367 | S05/S06 | Music | Suck-out | Thinking | ≥ 15 dB down |
| f372 | S06 | SFX | F11 hit | 4 f after the first voice card appears | +8 dB |
| f418-479 | S06 | Music | Duck −10 dB | Under Nightline | — |
| f420-479 | S06 | Product audio | **F18 Nightline** (R-02) | Play press | Hero layer |
| f562 | S07 | SFX | F01 click | "Dub 3 languages" (signature 3) | Clear |
| f562-601 | S07/S08 | Music | Suck-out | Thinking + pull-back | ≥ 15 dB down |
| f606 | S08 | SFX | F11 hit | 4 f after the first ribbon develops | +8 dB |
| f610-656 | S08 | Music | Duck −10 dB | Under Hindi | — |
| f612-656 | S08 | Product audio | **F18 Hindi** (R-03) | Ribbon 1 | Hero layer |
| f646 | S08 | SFX | F07 whoosh (peak) | Fastest dolly frame | +4 dB above 4 kHz |
| f662-709 | S08/S09 | Product audio | **F18 Japanese** (R-03), L-cut | Ribbon 2 | Hero layer |
| f765 | S10 | SFX | F01 click | Speak (signature 4) | Clear |
| f765-775 | S10 | Music | Suck-out | Thinking | ≥ 15 dB down |
| f776-839 | S10 | Music | Duck −12 dB | Under the whisper | — |
| f778-837 | S10 | Product audio | **F18 Nightline whisper** (R-04) | Speak result | Hero layer (quiet read, no compression added) |
| f840 | S11 | Music | Groove thins (drums out) | Evidence | −15 to −20 dB |
| f870 | S11 | SFX | F06 lock accent | Counter final value | Low |
| f900-1076 | S12-S13 | Music | **Breakdown**: low-pass, −10 dB | Breather | −20 to −30 dB |
| f1038 | S13 | SFX | F03 toggle | Verify press | Clear in the breakdown |
| f1077-1079 | S13 | Music | 100 ms gap | Before the climax | ≤ −35 dB |
| f1080 | S14 | Music | **Re-entry**, densest arrangement | Climax start | Brightest |
| f1118, f1136 | S14 | SFX | F08 swish | Outgoing frame of each orbit step | +3 dB above 4 kHz |
| f1160 | S14 | SFX | F11 hit + F12 sub | Implosion → mark | +12 dB |
| f1197 | S15 | Music | Pluck on the landing | Last punch word | In bed |
| f1210-1214 | S15 | Music | 150 ms gap | Into the lockup | ≤ −35 dB |
| f1215 | S16 | Music | **F17 sting** (±2 f) | Lockup first frame | ≈ −7 dB, loudest sustained |
| f1215-1349 | S16 | Music | Tail 1.8 s, then decay | Lockup | ≤ −60 dB by f1349 |

**Density:** 15 designed SFX in 45 s (F12 ×1, F02 ×1 passage, F01 ×4, F11 ×4, F07 ×1, F06 ×1, F03 ×1, F08 ×1 sequence, F17 ×1;
the F12 at f1160 rides with its F11) = 1 per 3.0 s (G-34 limit). Whooshes 1. Hero hits ≤ 1 per 5 s. No transient
under any spoken word. Mix target −14 LUFS ±1 integrated, ≤ −1 dBTP; mono fold-down checked.

### G.3 VO script

None. The film has no narrator. The only voices are Lumen's outputs (R-01..R-04), each mirrored on screen word
for word (karaoke text, translated labels), so a muted viewer reads every spoken line (G-35).

### G.4 String table (G-15)

| ID | String | Where | Notes |
|---|---|---|---|
| STR-01 | Still booking a studio? | S01, S15 | 4 words |
| STR-02 | The rain came at midnight. | S02-S10 | 26 characters; the script in every run |
| STR-03 | Lumen | Header, S04, S16 | Logo SVG, never typeset |
| STR-04 | The AI voice studio. | S04, kit `logo` tagline | |
| STR-05 | Describe a voice | S05 | UI label (capture) |
| STR-06 | Warm, low, a little tired. Late-night radio. | S05 | 44 characters (≤ 100) |
| STR-07 | Design voices | S05 | UI label (capture) |
| STR-08 | Nightline · Harbor · Dusk | S06 | Voice names from R-02 |
| STR-08a-c | low · warm · slow / deep · steady / soft · breathy | S06 | Descriptors from R-02 |
| STR-09 | Describe any *voice*. | S06 | Caption |
| STR-10 | French · German · Hindi · Japanese · Spanish | S07 | Menu rows, product order |
| STR-10a | Dub 3 languages | S07 | Button state (capture) |
| STR-11a | Hindi · बारिश आधी रात को आई। | S08 | R-03 output; native-speaker check (O7) |
| STR-11b | Japanese · 雨は真夜中に降ってきた。 | S08 | R-03 output; native-speaker check (O7) |
| STR-11c | Spanish · La lluvia llegó a medianoche. | S08 | R-03 output; native-speaker check (O7) |
| STR-12 | Direct every *line*. | S10 | Caption |
| STR-13 | [calm] · [whispers] · [excited] | S09 | Popover rows (capture) |
| STR-13b | [whispers] | S09-S10 | Tag chip |
| STR-14 | Median · internal test | S11 | Kicker (C01) |
| STR-15 | 400ms | S11 | Value (C01) |
| STR-16 | from Speak to *sound* | S11 | Label |
| STR-17 | n = 1,000 · Sep 2026 | S11 | Source line (C01) |
| STR-18 | Dubbing | S12 | Kicker |
| STR-19 | 29 languages, one *voice*. | S12 | C02 |
| STR-20 | Your *voice*. Your consent. | S13 | C03 |
| STR-21 | I agree to create a voice from my recording. | S13 | Consent sentence (capture) |
| STR-22 | ✓ Verified | S13 | Status (capture) |
| STR-23 | AI-generated background | S01, S15 | Disclosure tag |
| STR-24 | Type it. *Hear it.* | S15-S16 | Thesis / tagline |
| STR-25 | Try Lumen → | S16 | CTA, 9 characters + arrow |
| STR-26 | Free plan · available today · lumen.example | S16 | C04 + URL |

### G.5 Claims sheet (G-02; every value fictional in this example, to be signed in a real job)

| ID | Claim on screen | Source, date, n | Owner sign-off |
|---|---|---|---|
| C01 | "400ms from Speak to sound", "Median · internal test", "n = 1,000 · Sep 2026" | Lumen internal latency test, 1,000 runs, Lumen v1.0, Sep 2026; median time from Speak press to first audio sample | Head of engineering (pending) |
| C02 | "29 languages, one voice" | Lumen launch language list, v1.0 | Product lead (pending) |
| C03 | "Your voice. Your consent." + the verification flow | Cloning requires a verified consent recording (product behaviour at launch) | Product lead (approved in brief) |
| C04 | "Free plan · available today" | Pricing page at launch | Marketing lead (pending) |

### G.6 Data sheet: logged runs (the only source of on-screen output)

| Run | Input | Output used | Duration | Shots |
|---|---|---|---|---|
| R-01 | STR-02, voice Ember (library) | Audio + word onsets | 1.7 s | S03 |
| R-02 | STR-06 → Design voices | 3 voices (names, descriptors, previews); Nightline read of STR-02 | 2.0 s | S06 |
| R-03 | Nightline read → Dub (Hindi, Japanese, Spanish) | 3 audio files + translated text | 1.5 / 1.6 / 1.4 s | S08 |
| R-04 | STR-02 with `[whispers]` on "at midnight", Nightline | Audio + onsets | 2.0 s | S10 |
| R-05 | Consent flow, team member (release on file) | Recording waveform + "✓ Verified" state | — | S13 |

Each run is logged with run ID, date, app version and account; the film never shows output that is not in this table.

---

## 8. Part H: Delivery and format plan

| File | Aspect / size | Length | fps | Codec | Loudness | Notes |
|---|---|---|---|---|---|---|
| Master | 16:9, 3840×2160 ProRes 422 HQ (UI vectors re-rendered at 4K) | 45.0 s / 1350 f | 30 CFR | ProRes | −14 LUFS, ≤ −1 dBTP | Archive and platform re-encodes |
| Web / YouTube / LinkedIn / X | 16:9, 1920×1080 | 45.0 s | 30 | H.264 High, CRF 16-18, 12-20 Mb/s, yuv420p, BT.709 tagged, faststart | −14 LUFS (web hero embed: −16) | SRT captions for the voice lines; thumbnail = f0 |
| Reels / Shorts / TikTok | 9:16, 1080×1920 | 20.0 s / 600 f | 30 | H.264 as above | −14 LUFS | Re-layout per §D.2; captions burned in by design (karaoke text); platform synthetic-media label set for the plates |
| Kit draft (animatic) | 16:9 and 9:16 | 46.8 s / 21.5 s | 30 | `npm run make -- <spec> --crf 18` | kit default | For review only; see §10 |

Dither 1-2 % on every gradient before the 8-bit encode. Disclosure: plates carry STR-23 on screen and the kit's
`clip.generated: true` tag where plates enter the kit. Product voices are Lumen's own synthetic voices and are the
product being demonstrated; no voice imitates a real person.

---

## 9. Phase 18: QC gate results, revisions, open items

The gate ran on draft v0 of this package. Every "no" was fixed in v1 (the version above) or is listed as an open
item. **Pass A** (G-01..G-39) is complete; **Pass B** (G-40..G-45) runs on outputs and has not run yet, because
nothing has been generated or rendered.

### 9.1 Gate results (Pass A)

| # | Check | v0 result | v1 result | Revision |
|---|---|---|---|---|
| G-01 | Phase-14 answers complete | Pass (assumed answers listed, §0) | Pass | — |
| G-02 | Every claim supplied, with source | **Fail**: v0 used "7 voices in 10 seconds" in S06 caption, never supplied | Pass (C01-C04 only; caption now a capability, not a number) | R0 |
| G-03 | Real people released; no synthetic people | Pass (team-member release for R-05) | Pass | — |
| G-04 | Rights cleared | Open: music not licensed yet; Remotion company licence to confirm | Open | O6, O8 |
| G-05 | CTA matches funnel, ≤ 16 chars, 1-3 words | Pass ("Try Lumen", 9 chars) | Pass | — |
| G-06 | No other brand's UI or logo | Pass (no flags, no third-party logos) | Pass | — |
| G-07 | Story QC gate (P01 §2.16, 10 lines) | **Fail** on line 5 (proof blocks 6.0 / 8.0 / 6.0 s did not get shorter) | Pass: 8.0 / 7.0 / 5.0 s | R1 |
| G-08 | Hook on f0, change by f3, key message ≤ 3 s | **Fail**: v0 typed letter by letter, so f0 showed only "S" (blank thumbnail) | Pass: "Still booking" on f0, "a" from f3 | R4 |
| G-09 | Product named ≤ 8 s (Guideline 03: ≤ 5 s after a typed setup) | **Fail** against the guideline: first name at 6.0 s (S04) | Pass: wordmark in the editor header from 2.0 s (cap 3 % H), hero name 6.0 s | R13 |
| G-10 | Frames sum exactly | Pass after R1/R2 re-timing: 1350 f (16:9), 600 f (9:16) | Pass | — |
| G-11 | Ending works | Pass: still 2.9 s, CTA, sting f1215, music to the last frame | Pass | — |
| G-12 | Breather 10-15 %; ≤ 3 same text cards in a row | Pass (breakdown 13.3 %; max 2 cards in a row) | Pass | — |
| G-13 | Style declared with numbers | Pass (§B.2) | Pass | — |
| G-14 | Bible defines every identity token | **Fail**: v0 used a success green #2E7D4F for "Verified", a sixth named colour with no meaning in the world rule | Pass: ink check, no status hue | R10 |
| G-15 | String table and data sheet | Pass (§G.4, §G.6) | Pass | — |
| G-16 | UI flows as state machines, real order | Pass (state IDs in every UI shot) | Pass | — |
| G-17 | Anchors declared | Pass (§F.2) | Pass | — |
| G-18 | Signature device + trigger rule | Pass (Speak → develop, 4 uses) | Pass | — |
| G-19 | fps decided; sources at that rate | **Fail**: v0 dropped 24 fps plates into a 30 fps timeline with no plan | Pass: locked-off plates, optical-flow retime, 0-duplicate check at Gate 1 | R12 |
| G-20 | Every shot spec field filled | **Fail**: v0 had 9 of 16 blocks; S11, S12, S15 lacked DOF/grade lines | Pass: 16 full blocks | R15 |
| G-21 | No vague words | **Fail**: v0 prompts said "cinematic rain window", "smooth pull-back", "premium lockup", "subtle breathing" | Pass: replaced by measured parameters (e.g. "smooth pull-back" → "×0.57 in 10 f E-ZOOM then ×0.56 over 19 f E-INOUT") | R8 |
| G-22 | Prompt order + continuity block + negatives | Pass after R8 (CB-L1 verbatim in P-01 and P-02) | Pass | — |
| G-23 | One camera move per generated shot; generation 1.5-2 s longer | v0 asked for "slow push-in" in P-01 while the composite also breathed (two moves) | Pass: plates locked-off (CM-01); 4 s generated for 2.0 s and 1.5 s edits (S15 is 2.5 s longer because 4 s is Veo's minimum unit: logged exception) | R12 |
| G-24 | Every transition has a TR- ID, cause, budget | **Fail**: v0's S12 → S13 had no ID ("soft blend") | Pass: TR-13 defocus dissolve 6 f, cause = entering the breather | R8 |
| G-25 | All motion values are tokens | Pass | Pass | — |
| G-26 | Every text event meets its hold; none < 25 f | **Fail** ×4: (a) v0 script "The rain started just after midnight." (37 ch) left 0.47 s of still after typing; (b) S04 sub entered f206 (34 f held, needs 52 f); (c) S09 popover closed on press (19 f); (d) S08 caption "One voice. Every language." held 30 f during the dolly | Pass: (a) script shortened to 26 ch and re-captured (R-01), still 0.93 s; (b) sub enters f188 with the cascade (52 f); (c) popover held to the cut (26 f); (d) caption moved to S12 as Proof B's label | R3, R7, R11, R9 |
| G-27 | Size and safe-area floors | Pass (hook 6.8 % H; must-read ≥ 3 % H; 9:16 inside x 120-840, y 270-1210) | Pass | — |
| G-28 | Generate/compose split | Pass: only P-01/P-02 generated | Pass | — |
| G-29 | Shape changes declared or one-frame swaps | Pass (waveform → mark interpolation; implosion → mark swap; one → three duplication) | Pass | — |
| G-30 | Effect budgets | Pass: 1 particle event (sparks ≤ 12), no glow on type, 1 depth beat 8.9 %, 0 flashes | Pass | — |
| G-31 | Generated audio muted; cue sheet from the event list | Pass | Pass | — |
| G-32 | Generation log template ready | Pass (§E.0) | Pass | — |
| G-33 | Music chosen and edited before SFX | Open: brief written, track not chosen | Open | O6 |
| G-34 | SFX anchored and within density | **Fail**: v0 had 12 F01 clicks, 3 F04 tones and a keystroke passage in S05: 27 designed SFX (1 per 1.7 s) | Pass: clicks only on the 4 signature presses + 1 toggle; 15 SFX (1 per 3.0 s) | R5 |
| G-35 | VO mixed and mirrored | Pass (no VO; product voices mirrored by karaoke text) | Pass | — |
| G-36 | Format plan; re-layout not crop | Pass (§D.2) | Pass | — |
| G-37 | Accessibility floors | **Fail**: accent #A63D2A over P-02 measured 4.81:1 against the plate's text band (≥ 7:1 over footage required) | Pass: plate luma floor #E4E0DA in the text band + footage accent #7A2A1C (7.34:1); the anchored tagline keeps #7A2A1C into S16 | R6 |
| G-38 | Export spec per destination | Pass (§H) | Pass | — |
| G-39 | QC owner, sign-off order, severity policy | Pass: maker self-check → second reviewer runs Gates 1-3 → product owner signs UI frames and claims → audio pass signs the mix; S1 blocks release, S2 fixed or signed | Pass | — |

**Story QC gate (P01 §2.16), line by line on v1:** (1) a muted viewer sees "type → it speaks" at 4.3 s and the name at
2.0 s ✓; (2) f3 ≠ f0, hook 4 words, 2.0 s ✓; (3) stage shares equal the 45 s column ✓; (4) one concept, one world rule,
one accent meaning, one motif with 5 roles ✓; (5) one grammar, real workflow order, 8.0 → 7.0 → 5.0 s, show before label ✓;
(6) max 2 text-only cards in a row; holds met ✓; (7) every stage boundary has ≥ 2 markers (world flip + music event, or
cut + action) ✓; (8) climax starts at 80 %; the thesis "Type it. Hear it." lands at 39.4 s in the bookend that resolves it ✓;
(9) still lockup 2.9 s, sting on it, verb CTA ✓; (10) all claims from the brief (assumed) ✓.

**Hero spacing (P08 #12), found while re-timing for R1:** v0's proof order was design → direct → dub, which put the
3D hero at 25.4 s: gap from H1 = 21.3 s (> 20 s). **R2** swapped Proof B and C (design → dub → direct): H2 moved to
19.6 s, gaps 13.6 s and 19.1 s.

### 9.2 Revision log

| ID | Gate | v0 | v1 |
|---|---|---|---|
| R0 | G-02 | Caption "7 voices in 10 seconds" (unsupplied number) | "Describe any *voice*." (capability, no number) |
| R1 | G-07 #5 | Proof blocks 6.0 / 8.0 / 6.0 s (Guideline 03 default) | 8.0 / 7.0 / 5.0 s; Proof A gained the detail playback |
| R2 | P08 #12 | Order design → direct → dub; 3D hero at 25.4 s | Design → dub → direct; 3D hero at 19.6 s |
| R3 | G-26 | Script "The rain started just after midnight." (37 ch) | "The rain came at midnight." (26 ch); runs R-01..R-04 re-captured with it |
| R4 | G-08 | Letter-by-letter typing from f0 | Word append, "Still booking" on f0 |
| R5 | G-34 | 27 designed SFX | 15 designed SFX; silent presses except the signature presses and Verify |
| R6 | G-37 | #A63D2A over the dawn plate (4.81:1) | Luma floor #E4E0DA + #7A2A1C (7.34:1) |
| R7 | G-26 | S04 sub held 34 f | Sub in the wordmark cascade, held 52 f |
| R8 | G-21, G-24 | "cinematic", "smooth", "premium", "subtle", "soft blend" | Measured camera, ease and frame values; TR-13 named |
| R9 | G-26, P04 #3 | S08 caption during the dolly (30 f, camera > 0.2 % W/f) | Caption moved to S12 (label after the show) |
| R10 | G-14 | Success green on "Verified" | Ink check; palette stays one accent + one AI family |
| R11 | G-26 | Popover closed on press (19 f on screen) | Popover open to the cut (26 f) |
| R12 | G-19, G-23 | 24 fps plates with a generated push + composite breathe | Locked-off plates, optical-flow retime to 30 fps, composite breathe only |
| R13 | G-09 | Name first at 6.0 s | Header wordmark from 2.0 s |
| R14 | Kit timing | Kit draft 51.0 s with a separate "29 languages" title | 46.8 s: that block merged into the dub clip's caption (cut whole blocks, P08 §17.5) |
| R15 | G-20 | 9 shot blocks | 16 shot blocks |

### 9.3 Comparison with the user's reference video [V:1-6l8S] (final-polish check)

| Dimension | kivi (measured) | Lumen v1 (planned) | Why the difference |
|---|---|---|---|
| Pace | ASL 2.36 s, median 1.70 s; one transition per ≈2.4 s | ASL 2.81 s; one scene change per 3.0 s | 45 s, not 78 s: fewer, longer proofs; the user asked for calm |
| Density | 4 Say → See loops; up to 5 text cards in a row | 4 Type → Hear loops; max 2 cards in a row | kivi's card run is a listed flaw |
| Palette | White + mint aurora, sage accent text | Warm off-white + brick accent; amber → coral only while generating | Lumen's brand colours; one AI colour family with one meaning |
| Type scale | Statements 7.2-10.2 % H glyph box; UI text 1.2-2 % H | Hook cap 6.8 % H; statements cap 5.8 % H; UI ≥ 3.2 % H | kivi's UI text fails the phone floor |
| Camera energy | Breathing pushes 1.07-1.29× per hold; one truck ≈4 % W/f; 4 punches | Breathing +3 to +8 % per hold (CM-02 calm/minimal band); one 3D move (dolly ×2.2); 2 punches | Calmer, plus the one depth beat the user allowed |
| Plates | Three mismatched painted styles | One window, two lights, one seed, one grade | The user's "not four different films" |
| Ending | Bare URL | Thesis + lockup + "Try Lumen →" + availability, still 2.9 s | kivi's weak ending is a listed flaw |
| Loudness | −10.7 LUFS | −14 LUFS ±1 | Platform target |

### 9.4 Open items (cannot be fixed inside the package)

| ID | Item | Blocks | Owner |
|---|---|---|---|
| O1 | All facts in §0 are assumed for this example; a real job replaces them with the user's answers and signed claims C01, C02, C04 | Edit lock | User / product owner |
| O2 | Figma frames ED, VD, DB, DR, VC and runs R-01..R-05 (re-captured with the 26-character script) | S02-S13 build | Lumen design + product |
| O3 | Logo SVG with clear-space rule (the kit draft needs `public/brand/lumen-mark.png`) | S04, S16; kit render | Lumen brand |
| O4 | 9:16 has no 3D beat; a vertical re-render of S08 would be a new shot | Optional | Decide at review |
| O5 | Plates P-01/P-02 (and 9:16 versions) to generate: 4 takes each, logged | S01, S15 | Production |
| O6 | Music track licensed and edited to 45.0 s / 20.0 s on bar lines (the kit draft needs `public/music/lumen-120bpm.mp3`) | Mix, G-33 | Production |
| O7 | Native-speaker check of the Hindi, Japanese and Spanish lines (they must also be exactly what R-03 returned) | S08 | Lumen localisation |
| O8 | Remotion company licence confirmed for Lumen Labs' size | Render | Lumen legal |
| O9 | Pass B (G-40..G-45) after generation and render | Release | Second reviewer |

### 9.5 QC record

```json
{
  "film": "Lumen_launch", "version": "package-v1", "files": ["Lumen_launch_16x9_1920x1080_30p", "Lumen_launch_9x16_1080x1920_30p"],
  "gates": {
    "G0_phase18_passA": { "passed": true, "checks": 39, "failed_in_v0": ["G-02", "G-07", "G-08", "G-09", "G-14", "G-19", "G-20", "G-21", "G-23", "G-24", "G-26", "G-34", "G-37"],
      "revisions": ["R0", "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10", "R11", "R12", "R13", "R14", "R15"],
      "exceptions": [
        { "rule": "G-23", "note": "S15 plate generated 2.5 s longer than its 1.5 s edit: 4 s is the minimum Veo clip unit", "status": "accepted" },
        { "rule": "P06 cursor travel 15-20 f", "note": "S07 row hops 7-8 f between adjacent menu rows", "status": "accepted" }
      ],
      "open": ["O1", "O2", "O3", "O4", "O5", "O6", "O7", "O8", "O9"] },
    "G1_per_shot": "not run (no outputs)",
    "G2_locked_cut": "not run",
    "G3_master": "not run",
    "kit_check": { "16x9": { "duration_s": 46.8, "errors": ["audio.music missing file", "brand.logo missing file"], "warnings": ["music licence reminder"] },
                   "9x16": { "duration_s": 21.5, "errors": ["audio.music missing file", "brand.logo missing file"], "warnings": ["music licence reminder"] } }
  },
  "signed": { "maker": "motion-creative-director", "reviewer": "pending", "product_owner": "pending", "audio": "pending", "date": "pending" }
}
```

---

## 10. Motion-kit spec (JSON) for the parts the template engine renders directly

The motion-kit engine (`motion-kit/`, Remotion 4, 30 fps) renders type-led and template UI scenes from a JSON spec.
It cannot render the custom moments of this film, so the kit build is a **reviewable draft** of the master: the same
strings, order and palette, with the custom shots brought in as pre-rendered clips. In production the hand-off goes
through the **motion-director** skill (concept, stage table, storyboard rows, strings, palette, CTA, music decision);
the JSON below is what that hand-off produces, shown here so the example is complete.

### 10.1 Storyboard → kit mapping

| Storyboard | Kit scene | Fidelity |
|---|---|---|
| S01 hook | `kinetic` `["Still booking", "a studio?"]` | Partial: lines slam rather than append word by word; no plate (the kit `kinetic` has no background footage) |
| S04 name (moved before the demo) | `title` "Meet Lumen." / "The AI voice studio." | Partial: no waveform → mark morph; name arrives at ≈2.1 s instead of 6.0 s |
| S02-S03 type → hear | `prompt` (`resultKind: "audio"`) | Good: typing, cursor click on "Speak", "Generating…" shimmer, audio result. The shimmer replaces the 8 f empty hold + AI-colour develop |
| S05-S06 design a voice | `prompt` (`resultKind: "audio"`) | Partial: one result line instead of three developing cards; no Nightline playback |
| S07-S08 dub, 3D | `clip` `clips/lumen-dub-ribbons.mp4` (custom render of S08) with caption = STR-19 | Good if the clip exists (the checker does not test clip paths) |
| S09-S10 direct | `wave` with `text` = STR-02 and `tags: ["[whispers]"]` | Partial: words light karaoke-style; no tag insertion, no amplitude drop; silent (no `say`) |
| S11 number | `stat` | Good; source line STR-17 not available (no footnote field) |
| S12 scope | merged into the dub clip caption | Moved (R14) |
| S13 trust | `title` (kicker "Voice cloning") | Partial: statement + sub line; no Verify interaction |
| S14 climax | `clip` `clips/lumen-climax.mp4` | Good if the clip exists |
| S15 bookend | `hook` (`setup`, `strike`, `punch`) | Good; no plate |
| S16 lockup | `cta` (`style: "link"`) → `logo` | Good |

**Not in the kit (custom Remotion / `@remotion/three` / generated, then supplied as clips):** the AI-colour develop and
8 f empty hold; the waveform → mark morph; real UI choreography (chip, panel, menu, popover, Verify); the 3D dub beat;
the climax; Lumen's real output audio (the kit's `wave` and `orb` follow `say` narration, not product audio, so the
voices are laid in the finishing mix from R-01..R-04); frame-exact SFX on press frames and the suck-outs; generated plates.

### 10.2 Validation

Both specs were run through `npm run check` in `motion-kit/`. **16:9: 46.8 s, 12 scenes. 9:16: 21.5 s, 6 scenes.** The
only errors are the two asset files that do not exist yet (`public/music/lumen-120bpm.mp3`, `public/brand/lumen-mark.png`,
open items O3 and O6); the only warning is the music-licence reminder. Notes: the kit derived `accent2` from #EE7F6D to
#DB6E5D to reach 3:1 on the `studio` background (it is used for non-text marks only). The kit draft is 1.8 s longer than
the 45.0 s master and 1.5 s longer than the 20.0 s vertical: the master's exact timing comes from the custom build, and
forcing kit `duration` values shorter triggers its reading-time warnings, so whole blocks were cut instead (R14).

### 10.3 Spec: 16:9 master draft (`specs/lumen.json`)

```json
{
  "_note": "Lumen is fictional. Strings come from the Lumen string table (STR-xx); numbers from claims C01-C04. clips/ are custom Remotion renders (S08 dub ribbons, S14 climax); confirm they exist before rendering, the checker does not test clip paths.",
  "format": "landscape",
  "theme": "studio",
  "motion": "calm",
  "pace": "normal",
  "transition": "blur",
  "brand": { "name": "Lumen", "accent": "#A63D2A", "accent2": "#EE7F6D", "logo": "brand/lumen-mark.png" },
  "audio": { "sfx": true, "music": "music/lumen-120bpm.mp3", "musicVolume": 0.2 },
  "scenes": [
    { "type": "kinetic", "lines": ["Still booking", "a studio?"] },
    { "type": "title", "kicker": "Introducing", "headline": "Meet Lumen.", "sub": "The AI voice studio." },
    { "type": "prompt", "label": "Script", "prompt": "The rain came at midnight.", "button": "Speak", "result": "Ember · 1.7 s", "resultKind": "audio" },
    { "type": "prompt", "label": "Describe a voice", "prompt": "Warm, low, a little tired. Late-night radio.", "button": "Design voices", "result": "Nightline · Harbor · Dusk", "resultKind": "audio" },
    { "type": "clip", "src": "clips/lumen-dub-ribbons.mp4", "caption": "29 languages, one *voice*.", "area": "bottom", "scrim": 0.25, "duration": 4.0 },
    { "type": "wave", "label": "Nightline · directed", "text": "The rain came at midnight.", "tags": ["[whispers]"] },
    { "type": "stat", "kicker": "Median · internal test", "value": "400ms", "label": "from Speak to *sound*" },
    { "type": "title", "kicker": "Voice cloning", "headline": "Your *voice*. Your consent.", "sub": "Cloning starts only after you verify it is you." },
    { "type": "clip", "src": "clips/lumen-climax.mp4", "duration": 3.0, "sfx": false },
    { "type": "hook", "setup": "Still booking", "strike": "a studio?", "punch": "Type it. *Hear it.*" },
    { "type": "cta", "style": "link", "kicker": "The AI *voice* studio.", "action": "Try Lumen", "sub": "Free plan · available today", "handle": "lumen.example" },
    { "type": "logo", "name": "Lumen", "tagline": "The AI voice studio." }
  ]
}
```

### 10.4 Spec: 9:16 cut-down draft (`specs/lumen-reel.json`)

```json
{
  "_note": "9:16 cut-down (20 s target): one use case end to end. Same strings and claims as the 16:9 master.",
  "format": "reel",
  "theme": "studio",
  "motion": "calm",
  "pace": "normal",
  "transition": "blur",
  "brand": { "name": "Lumen", "accent": "#A63D2A", "accent2": "#EE7F6D", "logo": "brand/lumen-mark.png" },
  "audio": { "sfx": true, "music": "music/lumen-120bpm.mp3", "musicVolume": 0.2 },
  "scenes": [
    { "type": "kinetic", "lines": ["Still booking", "a studio?"] },
    { "type": "title", "kicker": "Introducing", "headline": "Meet Lumen." },
    { "type": "prompt", "label": "Script", "prompt": "The rain came at midnight.", "button": "Speak", "result": "Ember · 1.7 s", "resultKind": "audio" },
    { "type": "wave", "label": "Nightline · directed", "text": "The rain came at midnight.", "tags": ["[whispers]"] },
    { "type": "stat", "kicker": "Median · internal test", "value": "400ms", "label": "from Speak to *sound*" },
    { "type": "cta", "style": "link", "kicker": "Type it. *Hear it.*", "action": "Try Lumen", "sub": "Free plan · available today", "handle": "lumen.example" }
  ]
}
```

No scene has `say`: the film is music-led with product audio, and a mix of narrated and silent scenes makes the
checker warn. Kit workflow once O3 and O6 are in place (`skills/motion-director/references/production.md`):
`npm run check -- specs/lumen.json` → `npm run qa` → `npm run brand -- public/brand/lumen-mark.svg --spec specs/lumen.json`
→ `npm run music -- specs/lumen.json --track music/lumen-120bpm.mp3` (snaps cuts to the beat, writes `audio.beats`)
→ `npm run make -- specs/lumen.json --crf 18`. Use CRF 16-18 for UI- and gradient-heavy films.

---

## 11. Next step

"Want me to generate the two window plates, adjust the storyboard, or render the draft with the motion-kit engine?"
