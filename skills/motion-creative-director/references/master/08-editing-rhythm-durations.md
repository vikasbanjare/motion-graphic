# Master SaaS Motion Design System, Part 08
## Master §15 Editing Rhythm and Master §17 Recommended Shot Durations

Draft v2, 2026-10-08 (v1 covered §15; v2 adds §17, Appendix A and Appendix B). Built from the corrected shot lists, beat-grid fits and audio analyses of the eight reference videos in the user's folder, plus text-only research. It covers the full Phase-8 brief. Master §15 covers average shot length (ASL) and shot-length distribution, fast and slow sections, acceleration, pauses and breathing room, beat sync, music-driven versus feature-driven editing, hero moments and transition density. Master §17 covers duration tokens per shot type and concrete timing plans for 5, 10, 15, 30, 45 and 60 s films, a 90 s VO-led explainer and a 90 s music-led launch film, with beats, seconds, frames and shot counts. An editor, a senior motion designer or an AI-video pipeline should be able to place every cut from this part.

Scope. The story-stage windows (hook, setup, reveal, proof, benefit, climax, resolution) come from Part 01 §2.3 and are reused here unchanged. This part turns them into shot counts, shot lengths and cut grids. Ease and speed tokens are in Part 03 (Master §5, §18, §19). Transition mechanics and the per-runtime transition budget are in Part 05 (§7.3, §7.5). Reading holds are in Part 07 (§9.11-9.12) and Part 01 (§2.12). Cursor, typing and click micro-timing are in Part 06 (§8.4-8.5). Sound design is Master §16. A number from another part is repeated here only where a cut decision depends on it.

---

## 0. How to read this part

**Units and definitions**
- **f**: one frame at 30 fps (33.3 ms); 30 f = 1 s. For a 24 fps delivery, convert through seconds (1 s = 24 f, 1 f = 41.7 ms). Frame counts in this part do not transfer directly to 24 fps.
- **Shot**: one setup between two shot boundaries. A boundary is a hard cut, or a seamless change that replaces the setup (whip hand-off, morph into a new scene, mask wipe, polarity flip). A text swap on the same background counts as a new shot when the line changes. That is how the teardowns corrected the automatic detectors.
- **ASL** (average shot length) = runtime ÷ shots. The **median** shot length is always given beside it, because every reference's distribution is skewed.
- **Event**: any discrete visible change: a cut, an entrance, a UI state change, a camera beat (snap, punch, orbit step), a word swap, a click. **Event interval** = time between events.
- **Ambient motion**: drift, slow push, a moving gradient, a looping icon. It is not an event. It is what keeps frames alive between events.
- **Hero moment**: a designed peak of picture and sound, as listed in each teardown's Editing Rhythm section.
- **Beat** = one quarter note; **eighth** = half a beat; **bar** = 4 beats. Beat length in frames = 1800 ÷ BPM at 30 fps.
- **% runtime**: position or share of the total running time.
- **@1080p**: px on a 1920×1080 frame. **@1920p**: px on a 1080×1920 frame. **% W / % H**: percent of frame width or height.

**Evidence tags** (the same as Parts 01-07)
- **[V:xxxxxx t=..s]**: the user's reference videos, measured frame by frame. The strongest evidence.
- **[S:brand]** / **[S:playbook]**: Superside text research (captions, chapters, transcripts, metadata). **[E]**: ElevenLabs style brief; its motion timings are its author's inferences. **[N]**: design-system tokens, reading-speed, platform and retention data. **[P]**: voice and footage pipeline brief (caption sync, Veo/Flow facts). **[W:site]**: inspiration-site catalogues (titles and descriptions only).
- **[inferred]**: my own judgement, not directly observed or sourced. **[derived]**: a calculation from tagged inputs, with the inputs shown.
- Text-only sources ([S], [E], [W], [P]) support intent, structure and runtime. They never support frame-level timing. Two exceptions are sourced timings that come from caption tracks and chapter markers ([S:Superside], [S:Thomson Reuters], [S:Airtable]); these are second-level, not frame-level.

**Priority.** The user's references outrank generic advice. Where they disagree, a **"References win"** note says so in place and explains why. The exceptions are physical or perceptual limits (photosensitivity, audio-visual sync detectability, platform overlays), where the generic data wins and the note says so. Appendix A collects every ruling.

**Rule IDs used in this part**
- **ER-01 … ER-24**: editing-rhythm rules (§15.1-15.10).
- **BS-01 … BS-12**: beat-sync rules (§15.7).
- **SD-01 … SD-20**: shot-duration tokens; **DU-R1 … DU-R5**: token rules (§17.1).
- **PL-05, PL-10, PL-15, PL-30, PL-45, PL-60, PL-90E, PL-90L**: timing plans (§17.4).
- **ER-U / ER-S / ER-X / ER-A / ER-SaaS**: universal principles, style-specific rhythm, experimental techniques, techniques to avoid, techniques especially good for SaaS (§15.12-15.16). **DU-U / DU-S / DU-X / DU-A / DU-SaaS** (renamed from SD-* on 2026-10-08 so they no longer collide with Part 09's sound-design IDs SD-U1..U15; the shot-duration tokens keep the names SD-01 … SD-20): the same five classes for durations (§17.6).
- **Appendix A**: every place where the references overrule generic advice. **Appendix B**: evidence strength and gaps for this part.
- Class tags: **U** = measured in 3 or more references, none contradicting. **S** = style-specific. **X** = experimental (one reference, or untested). **A** = avoid. **SaaS** = especially good for SaaS.

### Reference roster

| Tag | Reference | Frame / length | Style | Rhythm nickname |
|---|---|---|---|---|
| [V:1-6l8S] | kivi, voice-AI dictation launch | 16:9, 77.78 s | Minimal Premium × soft-cinematic UI demo | Speech-led → beat-led |
| [V:126cpH] | Chowdeck delivery-app ad (measured through a crop of an AE screen capture; animated on twos) | 9:16, 17.97 s | Playful illustrated collage + UI demo | Burst and breathe |
| [V:15VhHR] | Wix AI site builder | 16:9, 53.87 s | UI demo inside an editorial brand frame | Slow-fast-slow ×3, section-synced |
| [V:19NRDv] | Bumper PRO payments launch | 16:9, 67.2 s | Kinetic-type launch with 3D UI proof | Beat-locked claim/proof |
| [V:1CSXtQ] | OpenAI × HubSpot connector spot | 16:9, 30.03 s | Minimal Premium, prompt-native, one 3D beat | Intimate typing → drop → momentum |
| [V:1Hcg3X] | "How do solar panels work?" | 16:9, 35.83 s | Editorial 2.5D explainer | Burst → hero hold, downbeat landings |
| [V:1ccYWJ] | Lottieicon icon-library promo | 16:9, 44.27 s | Fast startup launch, dark neon | Fast-medium-slow-fast-hold, SFX on motion peaks |
| [V:1i2L14] | NOSTRA studio promo | 16:9 inset, 35.07 s | Monochrome brand-system explainer | Copy-led morph chain + breather |

### 0.1 Rhythm census: what the eight references actually do

All shot counts are the teardowns' corrected counts, not the detectors'. "Shots/min" counts shot boundaries per minute. Durations in seconds.

| Ref | Detector → corrected shots | ASL | Median | Median ÷ ASL | Shortest | Longest (s · % runtime · × ASL) | Shots/min | Event interval | BPM | Beat-sync result | Edit driver | Hero moments | Final still |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| kivi [V:1-6l8S] | 31 → 33 | 2.36 | 1.70 | 0.72 | 0.90 (ink-bloom bridge) | 6.25 · 8.0 % · 2.6× | 25.5 | Ambient push on every hold; 32 transitions, one per 2.4 s | ≈127 | First half speech-led; back half 5/6 hard cuts within 1.1 f of the eighth-note grid | Speech → music | 4 | Wordmark 1.17 s + symbol 3.26 s + URL 2.25 s, each with a slow push |
| Chowdeck [V:126cpH] | 14 → 11 | 1.63 | 1.60 | 0.98 | 0.70 | 2.63 · 14.6 % · 1.6× | 36.7 | ≈0.7 s | 95.7 | 0/5 hard cuts on onsets (chance level); the click lands on an onset at 0 f | Narrative | 2 | 1.4 s (one wobbling rider) |
| Wix [V:15VhHR] | 39 → 34 | 1.58 | 1.50 | 0.95 | 0.23 | 3.73 · 6.9 % · 2.4× | 37.9 | ≈0.5 s inside UI shots | 112.3 | 7/33 cuts within ±2 f of an onset vs 5.8 by chance; sync at section level only | UI / feature | 3 | ≈1.7 s |
| Bumper [V:19NRDv] | 24 → 27 | 2.49 | 1.78 | 0.71 | 0.93 | 6.26 · 9.3 % · 2.5× | 24.1 (16.1 hard cuts/min) | 1.0-1.5 s, even in long shots | 100.0 | 11/18 hard cuts land 0-2 f before a quarter beat (chance ≈17 %, p < 0.001) | Copy order + beat grid | 6 | ≈4.6 s on a 5.73 s lockup shot |
| HubSpot [V:1CSXtQ] | 3 → 10 | 3.00 | 2.42 | 0.81 | 1.13 | 8.23 · 27.4 % · 2.7× | 20.0 (15 beats incl. seamless moves) | Camera beat every 0.7-2.0 s plus 1-6 f UI ticks | ≈86 | 6/8 hard cuts on an RMS transient within ±2 f (7/8 with spectral onsets) | Feature → music; drop at 43 % | 2 | 2.2 s dead still |
| Solar [V:1Hcg3X] | 23 → 17 | 2.1 | 1.9 | 0.90 | 0.43 (flash insert) | 4.7 · 13.1 % · 2.2× | 28.5 | Never still > 5 f | 64.6 (≈129 half-time [inferred there]) | 5/16 (31 % vs 20 % chance); mid act 4/5 within ≈1 f | Story / VO + downbeats | 4 | None (ends mid-motion, flagged) |
| Lottieicon [V:1ccYWJ] | 14 → 25 | 1.77 | 1.43 | 0.81 | 0.33 | 6.07 · 13.7 % · 3.4× | 33.9 | One transition per 1.8 s; SFX on 9/11 motion peaks | 112.3 | 4/10 hard cuts within ±2 f (chance 21 %) | Feature / SFX | 5 | CTA shot 5.2 s, no logo; music gone 3.7 s early (flagged) |
| NOSTRA [V:1i2L14] | 24 → 19 | 1.85 | 1.43 [derived from its shot table] | 0.77 | 0.20 | 4.7 · 13.4 % · 2.5× | 32.5 | 0.85 s (≈41 motion events) | 83.4 | 3/14 (chance 19.6 %) | Copy | 4 | ≈0.8 s |
| **Median** | — | **1.98** (mean 2.10; pooled 176 shots in 362.02 s = 2.06) | **1.65** | **0.81** | **0.57** | **2.5× ASL · 13 % runtime** | **30.5** | **0.5-1.5 s** | **≈98** (median of the 8 tempos) | **3/8 beat-locked for at least half the film; 8/8 sync section turns and hero hits** | — | **4** | **≈1.5 s** |

Sources: each reference's Editing Rhythm, Shot-by-Shot, Sound Design and Verification sections. NOSTRA's median is computed from the 19 corrected shot durations in its table. All other numbers are the teardowns' own.

**Detector warning.** The automatic shot detectors were wrong in every reference, by −70 % to +79 % of the true count: HubSpot 3 → 10 (white-to-white cuts are invisible to luma detection), Lottieicon 14 → 25 (text swaps on a shared gradient), Wix 39 → 34 (colour-only changes counted as cuts) [V:1CSXtQ §1] [V:1ccYWJ §4] [V:15VhHR §4]. **Never measure your own film's rhythm from a scene detector. Count shots from the edit decision list or the timeline.**

### 0.2 What the census says

1. **ASL sits between 1.58 and 3.00 s, median 1.98 s.** The median shot is shorter, 1.65 s. That is about 30 shots per minute (range 20-38). These films cut roughly twice as fast as the [E] guess for ElevenLabs spots (3-4 s) and well below the Hollywood 1985-2005 average of about 4 s [N].
2. **ASL is set by style, not by runtime.** Sorted by ASL: Wix 1.58 (54 s), Chowdeck 1.63 (18 s), Lottieicon 1.77 (44 s), NOSTRA 1.85 (35 s), Solar 2.1 (36 s), kivi 2.36 (78 s), Bumper 2.49 (67 s), HubSpot 3.00 (30 s). The 30 s film has the longest ASL and the 54 s film the shortest. Montage-led and playful films run 1.6-1.9 s. Calm, prompt-native and premium films run 2.36-3.0 s.
3. **Perceived pace comes from the event interval, not the ASL.** Every reference keeps a discrete event every 0.5-1.5 s. Wix's 2.57 s theme shot holds a popup, typing, a cursor move, a click and a shimmer, about one event every 0.5 s [V:15VhHR §Editing Rhythm]. Bumper keeps 6 s proof shots alive with a camera beat every 0.8-1.5 s [V:19NRDv rule 12].
4. **Every film pulses between two tempos.** Claim and type cards run 0.9-2.3 s. Proof and demo shots run 2.6-6.3 s, or up to 8.2 s as a continuous take.
5. **The distribution is right-skewed.** In 7 of 8 films, 1-3 long holds run 2× ASL or more, and the median is 0.71-0.98 of the ASL. In kivi and Bumper, two-thirds of shots are shorter than the ASL [derived from their shot tables].
6. **Beat sync is a style choice, not a law.** Three references lock cuts to the grid for at least half the film (Bumper throughout; kivi's back half; HubSpot's second half). Four cut at chance level against onsets (Wix, Chowdeck, NOSTRA, and Lottieicon loosely). **All eight** sync their section turns and hero hits to an audio event: a drop, a suck-out, a click, a sub boom.
7. **The picture never trails the music.** Where cuts are beat-locked, the picture leads by 0-2 f (Bumper) or by about 3 f (kivi's drop) [V:19NRDv §11] [V:1-6l8S t=8.03-8.28s].
8. **Every film accelerates into its climax and then stops.** The last demo blocks shorten (kivi 14.75 → 11.03 → 6.69 s; its first two demos run 7.48 and 8.44 s, so the shrink is a back-half pattern) [V:1-6l8S §3], word swaps tighten (Bumper 16 → 11 f), cards drop to 10-12 f (Lottieicon). Then a still lockup of 0.8-5.7 s ends the film.
9. **Hero moments come every 8.8-19.4 s (runtime ÷ hero count; median ≈10 s), 2-6 per film.** 7 of 8 films place their last hero at 76-91 % of runtime. Every hero is prepared by a short "load": silence, a riser, a light build or an accelerating push.
10. **One breather in 6 of the 7 films of 30 s or more, or the film reads as one long shout.** NOSTRA gives 4.7 s (13 % of runtime) at about 1/30 of peak motion [V:1i2L14 t=25.93-30.63s]; Lottieicon a slow hero section (ASL 3.62 s) [V:1ccYWJ §11]; kivi a pad-only stretch (21.7-30.6 s) [V:1-6l8S §12]. Bumper, Wix and HubSpot drop the music to a filtered breakdown or pad instead. The exception is Solar (35.8 s), which runs a flat bed (σ 1.7 dB) and breathes only through 3.5-4.7 s hero holds after each burst [V:1Hcg3X §11-12].

### 0.3 Defaults card: the rhythm numbers to encode first

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

---

# Master §15. Editing Rhythm

## 15.0 Why rhythm decides "expensive"

A premium film feels *inevitable*: each cut comes exactly when the eye has finished, and the next shot is already moving. Three things create that feeling in the references.

1. **Short shots, long attention.** Cuts every 1.6-3.0 s with an event every 0.5-1.5 s keep the eye busy without making it search. The anchoring and continuity devices (Part 05) keep fast cutting calm.
2. **Contrast in time.** A long hold only reads as "important" next to short shots. A fast burst only reads as energy next to a breath. Every reference alternates the two.
3. **Agreement between picture and sound.** The decisive moments (the reveal, the click, the climax) land on an audio event. Cheap edits either ignore the music or put every cut on a beat with no shape.

Amateur rhythm shows up as a uniform shot length (every shot 3 s), dead holds with nothing moving, a climax that is no faster than the middle, cuts that trail the beat, and a film that ends while the music is still playing, or after the music has already stopped [inferred synthesis of the references' flaw lists].

## 15.1 Measuring rhythm

**ER-01 · Count shots from the timeline, never from a detector [U].** Corrected counts differed from detector counts in every reference (§0.1). Text swaps on a shared background, white-to-white cuts and seamless morphs are invisible to luma detection.
- Why: the rhythm rules below are calibrated on corrected counts. A detector count will tell you HubSpot's ASL is 10 s when it is 3 s.

**ER-02 · Report four numbers for every cut, not one [U].** ASL, median, longest shot (s, % runtime, × ASL) and event interval. ASL alone hides the shape: Wix (1.58 / 1.50) and Lottieicon (1.77 / 1.43) have similar ASLs but opposite shapes. Wix is even and montage-like; Lottieicon is bimodal, with 0.33 s punch cards and a 6.07 s tour.

**ER-03 · Measure the energy curve in 0.2-0.5 s bins [U].** Plot per-frame difference (motion energy) against time. The references show three shapes that should be visible on that plot:
- burst-and-breathe peaks every 2-4 s (Chowdeck peaks at 1.6, 2.6, 5.2, 9.2 and 15.6 s with lows of 0.6-1.3 between) [V:126cpH §Editing Rhythm];
- one low plateau (the breather) at about 1/30 of the peaks (NOSTRA mean 1.08 vs peaks of about 33) [V:1i2L14 §11];
- the highest peaks clustered in the last quarter (climax).

A flat energy curve is the measurable signature of a monotonous edit.

**How to compute sync rate for QC [derived].** Sync rate = cuts within the window ÷ cuts. Chance = window length × onset density (onsets per second). For a ±2 f window (5 frames = 0.167 s) and 1.2 onsets/s, chance is 20 %. A deliberately beat-cut film should be at least 3× chance and at least 60 % absolute. Bumper's 11/18 against a 17 % chance window gives p < 0.001 [V:19NRDv §11]; Wix's 7/33 against 5.8 expected is chance [V:15VhHR §Editing Rhythm].

## 15.2 ASL targets by style

| Style (Master §11) | Reference | ASL | Median | Card hold | Proof shot | Montage inserts | Edit driver | Beat policy | BPM | Breather | End still |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Minimal Premium SaaS, "Calm-Tech" | kivi [V:1-6l8S] | 2.36 | 1.70 | 1.17-1.87 s | 2.6-6.25 s | none | Speech first half → music | Back half on the eighth-note grid, ±1 f | 127 | Pad-only section (21.7-30.6 s) | 1.17 + 3.26 + 2.25 s, with pushes |
| Minimal Premium × UI-Focused Demo, "Prompt-native" | HubSpot [V:1CSXtQ] | 3.00 | 2.42 | 1.13-2.17 s | 3.67-8.23 s continuous takes | none | Feature → music, drop at 43 % | Hard cuts on transients, 6-7/8 | ≈86 | Pad under the CTA | 2.2 s dead still |
| UI-Focused Demo, "Brand-bookended montage" | Wix [V:15VhHR] | 1.58 | 1.50 | ≥ 1.0 s still | 1.27-3.73 s | 0.64 s and 0.83 s ASL bursts | UI / feature | Section level only | 112.3 | Breakdown under the ice montage | ≈1.7 s |
| Fast Startup Launch, "Night claim / Day proof" | Bumper [V:19NRDv] | 2.49 | 1.78 | 0.93-1.97 s | 2-6.3 s, camera beat every 0.8-1.5 s | Finale swaps every 0.46 s | Copy order + beat grid | 11/18 on quarter beats | 100 | Low-pass breakdown under dense UI | ≈4.6 s |
| Fast Startup Launch, "Dark neon reel" | Lottieicon [V:1ccYWJ] | 1.77 | 1.43 | 0.87-2.03 s; punch 10-12 f | 2.17-6.07 s | Role swaps every 15 f | Feature / SFX | SFX on motion peaks | 112.3 | Slow hero section 22.3-33.2 s (ASL 3.62) | None (flagged) |
| Editorial Motion, "2.5D explainer" | Solar [V:1Hcg3X] | 2.1 | 1.9 | (labels inside scenes) | Hero 4.7 s | 0.43-0.5 s bursts | Story / VO + downbeats | Mid act 4/5 on downbeats | 64.6 / 129 | Hero holds after bursts | None (flagged) |
| Editorial Motion, "Monochrome brand-system" | NOSTRA [V:1i2L14] | 1.85 | 1.43 | Lines rest 10-23 f | 0.7-4.7 s | First 4.1 s average 0.8 s | Copy | Chance level | 83.4 | 4.7 s visual breather | ≈0.8 s |
| Playful consumer collage | Chowdeck [V:126cpH] | 1.63 | 1.60 | ≥ 0.7 s still | 1.8-2.53 s | 0.70-0.83 s | Narrative | Chance; click synced | 95.7 | Payoff hold 1.0 s | 1.4 s |
| Cinematic Product Launch / 3D Technology Film | none direct | 2.5-3.5 s [inferred] | — | 1.5-2.5 s [inferred] | Hero shots 4-8 s [inferred] | rare | Music | Bar lines and downbeats [inferred] | 90-110 [inferred] | Long hero hold | ≥ 2.5 s [inferred] |

The last row has no measured reference. It extrapolates from the references' 3D hero beats (HubSpot's 3.67 s depth take, Bumper's 5.96-6.26 s orbits, Wix's 1.36 s deck) and from text-only catalogue entries for hardware hero films (a Surface Laptop Ultra hero film, an AI-controller launch, a 40-entry 3D/CGI category) [W:showreel] and hardware launch examples [W:motion.so]. Those entries carry no timing, so every number in the row is [inferred].

**ER-04 · Pick the ASL from the style, then derive the shot count from the runtime [U].** Shots = runtime ÷ ASL, rounded. Do not shorten the ASL because a film is short. Chowdeck (18 s) and Wix (54 s) cut at almost the same rate, 1.63 and 1.58 s.
- Why: ASL encodes the film's temperament (calm vs. urgent). Runtime changes how many beats the story gets, not how fast each beat plays.

**ER-05 · Below an ASL of about 0.8 s, anchor one element [U · SaaS].** Lock a UI element or product to identical screen coordinates across the burst and change only the context [V:15VhHR rule 6, t=8.63-12.47s]. Solar and NOSTRA reach sub-0.5 s shots only with a continuing motion vector (arrows still converging across an inverted cut) or a single flash insert [V:1i2L14 t=20.33-20.53s] [V:1Hcg3X t=12.83-13.27s].
- Why: the eye tracks the anchor, so six cuts in 3.8 s read as one continuous thought (Part 05 TR-23).

## 15.3 The two-tempo pulse: claim cards vs. proof shots

**ER-06 · Alternate short claim shots with long proof shots [U].**

| Reference | Claim / type shots | Proof / demo shots | Evidence |
|---|---|---|---|
| kivi | 15 shots at 1.17-1.87 s | 10 shots at 2.6-6.25 s (mean ≈3.9 s) | [V:1-6l8S §11] |
| Bumper | 1-2 s | 2-6 s with in-shot beats | [V:19NRDv §11, rule 4] |
| HubSpot | 1.13-2.17 s end cards | 3.67-8.23 s continuous takes | [V:1CSXtQ §4] |
| Lottieicon | 0.33-2.03 s | 2.17-6.07 s | [V:1ccYWJ §4] |
| Solar | Bursts of 0.43-1.43 s | Hero holds 3.5-4.7 s | [V:1Hcg3X §11] |
| Wix | Brand frames 1.7-3.6 s, montage 0.23-1.27 s | UI demos 1.27-3.73 s | [V:15VhHR §4] |

- **Numbers.** Claim shot = 0.9-2.3 s. Proof shot = 1.8-6.3 s, or up to 8.2 s if it is one continuous camera take. The ratio of proof to claim length is about 2-3:1.
- **Why it works.** The short shot asks a question or makes a claim; the long shot pays it off with evidence. The change of tempo itself tells the viewer "now read" versus "now watch". Bumper reinforces this with a world flip: navy for claims, light for proof [V:19NRDv rule 4].
- **Do:** claim 1.4 s → proof 3.6 s → claim 1.2 s → proof 4.2 s. **Don't:** five 2.5 s shots in a row with alternating content; the content changes but the rhythm doesn't.

**ER-07 · Never run more than 3 same-treatment text-only cards in a row [U].** The teardowns' own thresholds are "more than about 4" (kivi), "4+" (HubSpot) and "more than 4-5" (Lottieicon); ≤ 3 is the strictest value that satisfies all three. kivi's 5 consecutive title cards over an ambient bed read as an energy dip (22-31 s) [V:1-6l8S flaws]. HubSpot's 4 centred same-size cards read as repetitive [V:1CSXtQ avoid]. Lottieicon's 6 text cards in a row (33.2-39.1 s) caused "text-card fatigue" [V:1ccYWJ flaws].
- Fix: after 3 cards, insert a UI beat, a scale change, an icon tie-in, a music lift, or merge the cards into one kinetic sequence (Part 07 KT systems).

## 15.4 Fast vs. slow sections: what goes where

**ER-08 · Fast sections carry recognition; slow sections carry comprehension [U].** Content the eye only has to *recognise* (an icon, 1-2 words, a context swap behind an anchor, a binary state flip) can cut at 0.3-0.9 s. Content the eye has to *read or follow* (a UI sequence, a cause and effect, a number, a sentence) needs 1.8 s or more [V:126cpH rule 15].

| Section type | Shot ASL | Event interval | Music state | Measured examples |
|---|---|---|---|---|
| Hook | 0.8-1.6 s (one shot of 1.2-1.6 s, or 2-5 micro-shots) | First change ≤ f3, then 0.2-0.5 s | Impact on f0 or sparse kicks | kivi 0-8 s ASL 1.6 (5 shots); Lottieicon 0-7.3 s ASL 0.91 (8 shots); NOSTRA first 4.1 s ≈0.8; Bumper 0-2.4 s two shots of 1.17-1.23 |
| Reveal | 1-3 shots of 1.6-3.5 s | 0.3-0.6 s micro-stages (stroke → fill → sheen) | Silence → riser → hit or drop | kivi 1.87 + 1.58 s; Lottieicon logo 1.93 s; Bumper logo 3.53 s; HubSpot lockup 2.67 s |
| Proof (UI that must be read) | 1.8-3.0 s; holds up to 6.3 s | 0.5-1.5 s | Full groove; filtered breakdown when densest | kivi demos ASL 2.1-3.0; Wix demos 2.1-2.4; Chowdeck UI 1.8 and 2.53 s; Bumper 2-6 s |
| Montage burst (recognition) | 0.5-0.9 s | One per cut | Groove, or deliberately quiet (counterpoint) | Wix 0.64 s (6 shots) and 0.83 s; Solar 0.5 / 0.5 s state changes (in-shot states, merged into one corrected scene); Lottieicon swaps 0.5 s |
| Breather | One shot of 3.6-6.3 s, or 2-3 slow shots | ≥ 1.5 s between events; motion ≤ 1/10 of peaks | Pad or breakdown, at least 6 dB under the full mix [inferred: NOSTRA's teardown recommends a −6 dB breath; measured breakdowns sit about 7-17 dB under the full mix (HubSpot pad −22 to −32 dB vs ≈−15 dB; Wix −15 to −34 dB vs −11 to −14 dB)] | NOSTRA 4.7 s; Lottieicon section ASL 3.62 |
| Climax | 0.33-1.4 s, accelerating | 0.3-0.5 s | Build → peak hit | Lottieicon 0.98 s ASL with 10-12 f cards; Bumper one word per 0.46 s |
| Resolution | 1-3 shots of 1.2-5.7 s | One still ≥ 1.5 s | Sting or resolve; fade with the picture | Bumper 5.73 s; HubSpot 2.67 s; kivi 1.17 + 3.26 + 2.25 s |

Sources per row: [V:1-6l8S §11] [V:1ccYWJ §11] [V:1i2L14 §11] [V:19NRDv §11] [V:1CSXtQ §11] [V:15VhHR §Editing Rhythm] [V:126cpH §Editing Rhythm] [V:1Hcg3X §11].

**ER-09 · Run the film as slow-fast-slow cycles, two or three times [U].** Wix runs slow → fast → slow three times: setup → slot-machine montage → payoff; demos A → ice montage → demos B; business → deck whip → tagline [V:15VhHR §Editing Rhythm]. Solar alternates bursts of 1.5-2.5 s with hero holds of 3.5-4.7 s [V:1Hcg3X §11]. Lottieicon runs fast → medium → slow (hero) → fast → long hold [V:1ccYWJ §11]. Chowdeck breathes on a 2-4 s period [V:126cpH].
- **Why:** a burst raises arousal and a hold lets it convert into understanding. Without the hold the burst is noise; without the burst the hold is a slideshow.

**ER-10 · Do not max out picture density and music density together, except at the climax [U].** When the picture is densest, the references pull the music back:
- Bumper puts a low-pass breakdown (centroid 255-286 Hz) under its reporting and refunds sections, "where the eye has the most to read" [V:19NRDv §12].
- Wix's quietest music (28.7-33.3 s) sits under the ice-bottle montage, one of its fastest picture sections (ASL 0.83 s) [V:15VhHR §Sound Design].
- kivi drops to pads under text-heavy stretches [V:1-6l8S rule 11]; HubSpot drops to a pad under its CTA [V:1CSXtQ §12].
- **Why:** perceived intensity is roughly the sum of picture load and audio load [inferred]. Holding the total below a ceiling keeps reading possible; releasing both at once marks the climax.
- **Exception (S):** VO-led explainers run a flat, compressed bed (Solar σ 1.7 dB) and take all drama from the picture [V:1Hcg3X §12].

**ER-11 · Put the first product beat inside the first 8 s and make it a tempo change [U].** Product UI or the product mechanic is on screen by 8 s in 6/6 product films, at 5-26 % of runtime (Bumper 3.62 s = 5 %, Wix 4.23 s = 8 %, Chowdeck 1.60 s = 9 %, kivi 7.97 s = 10 %, Lottieicon 7.30 s = 16 %, HubSpot 7.80 s = 26 %) [Part 01 §2.1] [derived percentages]. Four films have a distinct drop or groove entry; in three of them it lands at that first product beat: Bumper 4.8 s (7 %), Wix 4.5 s (8 %), kivi 8.28 s (11 %) [V:19NRDv §12] [V:15VhHR §Sound Design] [V:1-6l8S §12]. HubSpot is the exception that proves the rule: its typed prologue *is* the product (a prompt), so the full drop waits until 13.05 s (43 %) [Part 01 §2.1]. The edit tempo changes with the turn: HubSpot's ASL drops from 4.45 s before the drop to 2.04 s after [V:1CSXtQ §11].
- **Rule:** first product beat by 8 s and by 25 % of runtime, whichever comes first; the music turn on it (7-11 % in films of 45 s or more), or at 40-45 % only when a typed or teaser prologue already shows the product.

## 15.5 Acceleration and deceleration

**ER-12 · Accelerate into the climax: each successive unit 15-40 % shorter over the last 3-6 units [U].**

| Reference | What shortens | Measured sequence | Evidence |
|---|---|---|---|
| kivi | Demo blocks (last three of five; demos 1-2 run 7.48 and 8.44 s) | 14.75 → 11.03 → 6.69 s (−25 %, −39 %) | [V:1-6l8S §3] |
| Bumper | Word-swap interval in the finale | 16 → 15 → 13 → 11 f, then 14 f to PRO (a one-step ritard onto the hero word), which types per letter at 2 f; 6 words in 2.30 s | [V:19NRDv §5.12, t=57.60-59.90s] |
| Lottieicon | Tour moves, then cards | Moves 32 → 32 → 22 → 17 f; then three cards of 10, 10, 12 f after 1.1-2.0 s statement cards | [V:1ccYWJ t=27.4-39.07s] |
| HubSpot | Shot length across the drop | ASL 4.45 s → 2.04 s | [V:1CSXtQ §11] |
| Solar | Object rhythm inside the hero | Bounce intervals 0.47 → 0.47 → 0.37 → 0.37 s | [V:1Hcg3X t=6.87-8.53s] |

- **Why:** a shrinking interval is the visual equivalent of a drum roll. The brain extrapolates the trend and expects the next event sooner, which builds tension that the hard stop then releases [inferred].
- **Do:** 1.6 s → 1.2 s → 0.8 s → 0.5 s → 0.4 s → still. **Don't:** speed up shots with time-remaps to "add energy". No reference uses speed ramps on any element; all speed change comes from cut placement and easing [V:1ccYWJ §4 Phase-2 table].

**ER-13 · Then stop dead: crescendo → still [U].** Every climax ends in the stillest frame of the film. Bumper's fastest moment (one word per 0.46 s) runs straight into a 5.7 s lockup [V:19NRDv §11]. Lottieicon's 10-12 f cards run into a 5.2 s CTA [V:1ccYWJ §11]. HubSpot's cards run into a 2.2 s dead hold [V:1CSXtQ §11]. kivi's punch (+18 % in 8 f) cuts to a wordmark that only decelerates [V:1-6l8S t=70.83-72.27s].
- **Why:** the contrast makes the logo the only thing the eye can settle on, so it registers.

**ER-14 · Use a ritardando (lengthening units) to land on the hero use case [S · SaaS].** Wix's slot-machine montage lengthens its colour holds 21 → 29 → 38 f (+38 %, +31 %), so the last use case gets the most time and the payoff follows on it [V:15VhHR t=8.63-12.47s, rule 7]. Wix's carousel and deck run decelerate → dwell → accelerate [V:15VhHR rule 9].
- **Rule:** 3 items at about 1.0 / 1.2 / 1.6 s, then the payoff on the third.
- **Why:** lengthening tells the viewer "this is the one", the opposite signal to an accelerando.

## 15.6 Pauses and breathing room

Pauses in the references come in six sizes. None of them is a dead frame: the breath frame is the only truly empty frame, and it lasts 1-10 f.

| Pause | Duration | What it is | When | Evidence | Why |
|---|---|---|---|---|---|
| **Breath frame** (empty plate) | 1-10 f | The background alone, no subject, between two claims or after a whip | Between claims; after an exit whip; before a logo | Bumper 1 empty navy (#06004E) frame at 2.40, 25.63, 35.93 s [V:19NRDv]; Solar 0-1 empty frame before cuts (e.g. red #E12F17 at 30.60 s) [V:1Hcg3X rule 2]; Lottieicon 1-9 f blank gradient [V:1ccYWJ]; kivi 10 f empty aurora (4.1-4.45 s) and 3-4 white frames (6.0-6.1 s) [V:1-6l8S] | Resets the eye so the next entrance reads as new; acts like a comma |
| **Dwell** | 7-30 f (0.23-1.0 s) | A hold before an action: cursor hover, a hop-and-hold stop | Before every click and on every tour target | Wix hover 0.3-1.0 s [V:15VhHR rule 10]; Chowdeck cursor dwell 10 f [V:126cpH rule 7]; Lottieicon tour holds 7-20 f [V:1ccYWJ] | Anticipation: the viewer predicts the action, so the action satisfies |
| **Reading hold** | ≥ 1.0 s still for a 3-6 word line; ≥ 0.7 s for 2-3 words | The landed line holds before its exit | Every claim and payoff | Wix ≥ 1.0 s before any motion [V:15VhHR]; Chowdeck ≥ 0.7 s, payoff 1.0 s [V:126cpH rule 14]; full rules in Part 07 §9.11 | Text must be read once, at rest |
| **Silence gap** (audio) | 70-500 ms of near-silence | Music drops 15-30 dB just before a hit | Before the reveal, the drop, the click payoff, the sting | HubSpot ≈350 ms after the crest (10.60-10.95 s), 100 ms pre-drop, 70 ms before the dissolve hit, 100 ms before the sting [V:1CSXtQ §12]; Wix suck-out to −35 dB on the click [V:15VhHR t=12.2s]; kivi near-silence 6.65-6.80 s before the wordmark [V:1-6l8S]; Chowdeck −35.2 dB dip before the click [V:126cpH] | Contrast: the hit is louder because the ear has just reset |
| **Breather section** | 10-15 % of runtime (≈3-13.5 s), motion ≤ 1/10 of peaks | One slow, low-motion stretch, often with a calm material change (glass, particles) | Before the reassurance and CTA, after the densest stretch | NOSTRA 4.7 s of 35 s at about 1/30 of peak energy [V:1i2L14 rule 14]; Bumper low-pass breakdown 24-32 s (kicks kept; onsets sparse to ≈38 s) [V:19NRDv §12]; HubSpot pad under the CTA [V:1CSXtQ] | Relief after density; sets up "it's handled" before the ask |
| **Final still** | ≥ 1.5 s; 2.2 s premium; ≥ 4 s with QR/URL | The logo or lockup with no movement except one tiny ambient element | The last shot | HubSpot 2.2 s [V:1CSXtQ]; Chowdeck 1.4 s with a wobbling rider [V:126cpH rule 14]; Bumper ≈4.6 s with a QR card [V:19NRDv rule 15]; NOSTRA ≈0.8 s (too short) [V:1i2L14] | The only true stillness in the film; it signals the end and lets the brand register |

**ER-15 · Keep ambient motion on everything except the final still [U].** kivi pushes 1.07-1.29× on every hold [V:1-6l8S rule 5]. HubSpot drifts every card by 13-24 % [V:1CSXtQ rule 9]. Solar never holds completely still for more than 5 f [V:1Hcg3X rule 1]. Lottieicon's aurora never stops [V:1ccYWJ §13].
- **Why:** a pause in *events* reads as breathing; a pause in *all* motion reads as a frozen render.
- **Do:** hold a reading line for 1.2 s while it drifts 3-4 % W per second (≈58-77 px/s @1080p) [V:1-6l8S rule 1]. **Don't:** hold a frozen frame mid-film. The only dead-still frame belongs at the end.

**ER-16 · Never cut before a payoff has been readable for ≥ 1.0 s, and never show a final state for less than 25 f [U].** Solar's money message is fully readable for only 0.4 s [V:1Hcg3X flaws]. Chowdeck shows "Order delivered" for 2 f and "been busy?" for 0.45 s [V:126cpH flaws]. Netflix's minimum subtitle event is 5/6 s (25 f) [N].
- **References and [N] agree here.** The reference flaws are exactly the cases the 25 f floor would have caught.

## 15.7 Beat sync

### 15.7.1 What the references do

| Reference | Policy | Measured |
|---|---|---|
| Bumper | **Beat-locked throughout** | Exact 100.0 BPM kick grid; 11/18 hard cuts land 0-2 f before a quarter beat and 4 more within 1 f of an eighth off-beat. In-shot beats (logo stroke, snaps, wipe, swaps) also hit the grid [V:19NRDv §11] |
| kivi | **Speech-led first half, beat-locked back half** | 127 BPM; back half 5/6 hard cuts within 1.1 f of the eighth-note grid. The 59.73 s cut sits on the grid, 3.6 f from the nearest onset [V:1-6l8S §11] |
| HubSpot | **Feature-led first half, transient-locked second half** | 6/8 hard cuts on an RMS transient within ±2 f; the one miss (22.60 s) is 5 f ahead of a kick and is flagged [V:1CSXtQ §11] |
| Solar | **Story-led, downbeat landings for major scene changes** | Mid act 4/5 within about 1 f of an onset; overall 5/16 [V:1Hcg3X §11] |
| Lottieicon | **SFX-to-motion, loose against the music** | 4/10 hard cuts ±2 f; 9/11 key motion peaks carry a sub boom or whoosh within ±3 f [V:1ccYWJ §11] |
| Wix | **Section-level sync only** | Cuts at chance; drop 8 f after the prompt cut, suck-out exactly on the send click, re-entries within 0-2 f of section cuts [V:15VhHR §Editing Rhythm] |
| Chowdeck | **Narrative, one deliberate sync** | 0/5 hard cuts on onsets; the click lands on an onset at 0 f after a −35 dB dip [V:126cpH §Editing Rhythm] |
| NOSTRA | **Copy-led, no sync** | 3/14 at chance [V:1i2L14 §11] |

### 15.7.2 Rules

**BS-01 · Sync the structure in every film, the cuts only in music-led films [U].** All 8 references sync their section turns and hero hits (drop, suck-out, click, sub boom, sting). Only 3 lock most cuts to the grid. Wix's rule: "Don't force every cut onto a beat in UI-driven films" [V:15VhHR rule 17].
- **Why:** UI timing is dictated by the product (a typing speed, a click response). Forcing it onto a grid makes it feel mechanical. Section turns are the edit's own decisions, so they can and should land on the music.

**BS-02 · Picture leads the beat by 0-2 f; never trails it [U].** Bumper's on-grid cuts sit 0-2 f before the beat, never after [V:19NRDv rule 17]. kivi's shockwave fills the frame about 3 f before the drop's full-band hit [V:1-6l8S t=8.17-8.28s]. HubSpot's sprocket pops 3-4 f ahead of its hit [V:1CSXtQ §11].
- **Physical limit (generic data wins here, and agrees):** ITU-R BT.1359 puts the detectability threshold at +45 ms when sound is early and −125 ms when sound is late [P]. A picture leading by 0-3 f (0-100 ms) is under the threshold; sound leading by more than about 1 f (45 ms) is detectable.
- **Don't:** cut late on the beat. Bumper's teardown notes it "reads as sluggish" [inferred there].

**BS-03 · If a cut cannot sit on the transient, move it into a gap, not a few frames ahead [U].** HubSpot's 22.60 s cut lands 5 f before a kick and is flagged [V:1CSXtQ avoid]. A cut 3-8 f off the beat reads as a mistake; a cut in a silence gap reads as intentional.

**BS-04 · Compute beat times, do not count frames [U].** At 30 fps most tempos are not a whole number of frames per beat. Lottieicon swaps its role words every 15 f against a 16.0 f beat, so the swaps are "beat-paced but drift against the onsets" [V:1ccYWJ §11]. Compute each beat's time as `t = t0 + n × 60 / BPM` and round each cut to the nearest frame, minus 0-2 f of lead.

**Beat-to-frame table at 30 fps [derived].** Frame-exact tempos (whole frames per beat) are marked ✓.

| BPM | Beat (s) | Beat (f) | Eighth (f) | Bar (s) | Bar (f) | Notes |
|---|---|---|---|---|---|---|
| 81.82 ✓ | 0.733 | 22 | 11 | 2.93 | 88 | |
| 85.71 ✓ | 0.700 | 21 | 10.5 | 2.80 | 84 | HubSpot ≈86 |
| 90 ✓ | 0.667 | 20 | 10 | 2.67 | 80 | |
| 96 | 0.625 | 18.75 | 9.4 | 2.50 | 75 | Every runtime in this part is a whole number of bars (5 s = 2 bars … 90 s = 36 bars) |
| 100 ✓ | 0.600 | 18 | 9 | 2.40 | 72 | Bumper (exact) |
| 112.5 ✓ | 0.533 | 16 | 8 | 2.13 | 64 | Wix and Lottieicon ≈112.3 |
| 120 ✓ | 0.500 | 15 | 7.5 | 2.00 | 60 | |
| 127 | 0.472 | 14.17 | 7.09 | 1.89 | 56.7 | kivi; drifts 0.17 f per beat if counted |
| 128 | 0.469 | 14.06 | 7.03 | 1.875 | 56.25 | 15 s = 8 bars; 30 s = 16 bars; 60 s = 32 bars |
| 128.57 ✓ | 0.467 | 14 | 7 | 1.87 | 56 | |

At 24 fps the frame-exact tempos are 80 (18 f), 90 (16 f), 96 (15 f), 120 (12 f) and 144 (10 f) BPM [derived].

**BS-05 · Use the rhythm ladder: map each unit of picture to one musical value [U as a pattern].**

| Picture unit | Musical value | @100 BPM | @120 BPM | Evidence |
|---|---|---|---|---|
| Letter in a type-on | — | 1-2 f | 1-2 f | Part 07 |
| Word start in a line build | 1 eighth | 9 f | 7.5 f | Bumper word starts 7-10 f, "about an eighth note at 100 BPM" [V:19NRDv §11]; kivi word stagger 3-8 f ≈ an eighth at 127 BPM [V:1-6l8S] |
| Punch-card or word swap | 1 beat | 18 f | 15 f | Lottieicon swaps 15 f ≈ 0.94 beat [V:1ccYWJ]; Bumper swaps 11-16 f [V:19NRDv] |
| In-shot camera beat / orbit step | 2 beats | 36 f (1.2 s) | 30 f (1.0 s) | Bumper orbit steps ≈1.25 s ≈ 2 beats; sparse intro kick every 1.2 s [V:19NRDv] |
| Claim card | 2-4 beats | 1.2-2.4 s | 1.0-2.0 s | Claim cards 1-2 s [V:19NRDv rule 4] |
| Proof shot | 1-2 bars | 2.4-4.8 s | 2.0-4.0 s | Proof shots 2-6 s [V:19NRDv] |
| Section / feature block | 4-8 bars | 9.6-19.2 s | 8-16 s | [S:Airtable] chapters 9-14 s; kivi demo blocks 6.7-14.75 s [V:1-6l8S] |

- **Why:** when every level of the picture subdivides the same pulse, the film feels "musical" even where individual cuts are not on a beat [inferred].

**BS-06 · Choose the tempo by style [S].** The references run 64.6-127 BPM as measured (median ≈98): NOSTRA 83.4, HubSpot ≈86, Chowdeck 95.7, Bumper 100, Wix and Lottieicon 112.3, kivi 127, Solar 64.6 (≈129 felt in half-time, [inferred there]). [E] infers 100-120 BPM for ElevenLabs spots.
- Calm-Tech and prompt-native: 85-100 BPM, or 120-130 in half-time feel [inferred from HubSpot, kivi].
- Fast startup launch: 100-115 BPM with a hard kick [V:19NRDv] [V:1ccYWJ].
- Playful consumer: 95-110 BPM, syncopated (Afrobeats/amapiano-adjacent in Chowdeck [inferred there]).
- Editorial explainer under VO: 60-70 BPM measured, possibly felt as 120-130 in half-time [V:1Hcg3X §12; half-time reading inferred there].

**BS-07 · Fit the track to the runtime before the edit locks [inferred].** Pick a tempo where the runtime is a whole number of bars (96 BPM gives every runtime in this part; 128 BPM gives 15/30/45/60/90 s; 120 BPM gives 10/30/60/90 s), or edit the track to length. Place stage boundaries on bar lines within ±1 beat of the plan in §17.4. The §17.4 plans are drawn on a 120 BPM planning grid because it is the only common tempo that is frame-exact at both 30 fps (15 f per beat) and 24 fps (12 f per beat), and because every stage boundary in Part 01 §2.3 except one (60 s, 2.4 s) already falls on its 0.5 s beat [derived]. For a different track, re-snap each grid cut with BS-04; no boundary moves more than one beat.
- **Why:** Bumper's takeaway is "copy decides the order of events, and the 100 BPM grid decides where each cut lands" [V:19NRDv §12]. A plan that ignores the bar grid forces either a late cut or a cut off the beat at every section turn.

**BS-08 · Sync motion peaks, not just cuts [S · X for SaaS].** Lottieicon puts its sub booms and whooshes at the *peak velocity* of each move, within ±2-3 f, not at the start or the landing (9/11 events) [V:1ccYWJ §11]. Use it for camera glides, tours and rises that happen inside a shot. For whips into a cut, put the whoosh peak on the last outgoing frame (Part 05 §7.6).

**BS-09 · Use the music's arc as the film's macro-rhythm: at least three energy states and a build [U].** Bumper: sparse kick intro under the hook → full groove 5 f before the chip fly-in (4.8 s) → low-pass breakdown under the densest UI (24-32 s) → build from 32 s (hi-band 3.4 → 6.2 %) → fade on the CTA [V:19NRDv §12]. Wix: loud intro → sparse → drop at 4.5 s → suck-out at 12.2 s → re-entry → breakdown 28.7-33.3 s → re-entry 33.4 s → stab → fade [V:15VhHR §Sound Design]. kivi and HubSpot follow the same arc.
- **Avoid:** a flat, over-limited bed with about 5 dB of range and no build or drop (NOSTRA, −7.9 LUFS); it removes the music's contribution to rhythm entirely [V:1i2L14 §12].

**BS-10 · End the music with the picture [U].** kivi fades its music −15 → −49 dB with the fade to white [V:1-6l8S t=76-77.8s]. Wix fades −29 → −78 dB over 2.2 s under the held logo [V:15VhHR]. HubSpot's sting decays to about −65 dB by the last frame [V:1CSXtQ]. Lottieicon's music is gone 3.7 s before the picture, and the CTA "feels like the film has already finished" [V:1ccYWJ §12].
- **Rule:** the last musical event (sting or resolved chord) lands on the logo frame ±2 f, and the tail runs to or past the last frame. Never leave more than about 0.5 s of silence at the end [inferred from the Lottieicon flaw].

**BS-11 · VO-led films cut on sentence boundaries and place supers 0-2 f before the spoken word [S].** Narration runs at 150-170 wpm [S:playbook]. Caption lines in VO-led explainers last 2.4-3.5 s (Superspace) and about 3.2 s (Luminate) [S:playbook], which is the natural cut cadence for one UI focus per line [inferred]. Caption in-time belongs on the first frame of audio, never after it; Netflix accepts 1-2 f either side [P]. "Up to about 100 ms early reads as in sync" is the brief's own inference from BT.1359 [P, inferred there]. kivi streams words at the voice's pace (4-7 words/s), each reaching full opacity within 3-4 f [V:1-6l8S rule 6].

**BS-12 · Check sync numerically before export [U].** Use the formula in §15.1. Targets: music-led ≥ 60 % of hard cuts within 0-2 f before a quarter beat, or ≥ 80 % within ±2 f of a transient [V:19NRDv] [V:1CSXtQ rule 13] [V:126cpH avoid]. Story-led: 100 % of section turns and hero hits within ±2 f of an audio event; no cut 3-8 f ahead of a kick.

## 15.8 Music-driven vs. feature-driven editing

**ER-17 · Decide the edit driver per half of the film, not once for the whole film [U].**

| Driver | What decides each cut | Use when | Measured examples |
|---|---|---|---|
| **Feature / speech-driven** | The product's own timing: typing speed, click response, a dictated sentence ending | Setup and early proof, where the viewer must understand the mechanic | kivi first half ("cuts wait for the dictated sentence to finish") [V:1-6l8S §11]; HubSpot 0-13 s, ASL 4.45 s [V:1CSXtQ §11]; Wix throughout [V:15VhHR] |
| **Music-driven** | The beat grid; picture leads by 0-2 f | Montage, climax, kinetic-type claims, the back half of a launch film | Bumper throughout [V:19NRDv]; kivi back half (52-70 s) [V:1-6l8S]; HubSpot 13-30 s [V:1CSXtQ] |
| **Copy / story-driven** | The script's beat order; music syncs only at section turns | Explainers, agency promos, VO-led films | NOSTRA [V:1i2L14 §11]; Solar [V:1Hcg3X §11]; Chowdeck [V:126cpH] |
| **SFX-driven** | Motion peaks carry their own sound; music is a bed | Asset-library reels, tours, demos of motion products | Lottieicon [V:1ccYWJ §11] |

**The hybrid switch.** In kivi and HubSpot the driver switches from feature- to music-led at the first product payoff or the drop: 43 % of runtime in HubSpot, about 67 % in kivi (52 s of 78) [V:1CSXtQ §11] [V:1-6l8S §11]. This "raises perceived pace toward the climax without making shots shorter" [V:1-6l8S WHY shots 25-29].
- **Rule:** switch at 40-67 % of runtime, at a music turn, and never back.
- **Why:** the first half earns comprehension at the product's speed; the second half converts it into momentum at the music's speed.
- **Premium vs amateur [inferred from the flaw lists].** Premium: the driver is a decision you can name for each half, and the measured sync rate matches it (≥ 60 % beat-locked in the music-led half; section turns synced in the feature-led half). Amateur: a driver nobody chose, which measures as chance-level sync everywhere *and* unsynced section turns; Chowdeck's and NOSTRA's teardowns both flag "assuming beat sync" for exactly this [V:126cpH avoid] [V:1i2L14 avoid].

**ER-18 · In a feature-driven stretch, the click is the edit point [U · SaaS].** The consequence (state change, cut or morph) comes 3-15 f after the click: HubSpot cuts 3 f after the toggle fills [V:1CSXtQ t=10.267-10.367s]; NOSTRA swaps to the logo 5 f after the tap [V:1i2L14 t=32.0-32.167s]; kivi's click bloom fills the frame in about 6 f [V:1-6l8S t=36.85-37.10s]; Wix cuts to the result about 8 f after the send click [V:15VhHR rule 8]; Chowdeck holds 10 f before the consequence [V:126cpH rule 7].
- **Rule:** fast UI (toggle, chip) 3-5 f; a reveal with a suck-out 8 f; a physical, playful press 10-15 f.

## 15.9 Hero moments

| Reference | Hero moments (time, % runtime) | Count | Runtime ÷ count | Load before | After |
|---|---|---|---|---|---|
| kivi [V:1-6l8S] | Pill burst into the drop 7.97-8.28 s (10 %); Gmail punch into B&W 18.37 s (24 %); click bloom 36.95 s (48 %); tagline punch → wordmark 71.10 s (91 %) | 4 | 19.4 s | Near-silence 6.65-6.80 s + riser; accelerating pushes | Slow card unfold; decelerating wordmark push |
| Chowdeck [V:126cpH] | Starburst 3.90-4.60 s (22-26 %); "Order Delivered" 13.60-15.20 s (76-85 %) | 2 | 9.0 s | Claim hold 0.7 s; −35 dB dip before the click | 1.0 s payoff hold |
| Wix [V:15VhHR] | BASELINE build 12.47 s (23 %); theme regen 19.2 s (36 %); 3D deck 48.3 s (90 %) | 3 | 18.0 s | Suck-out on the click; shimmer 12 f; decelerating deck | Carousel dwell; tagline on cream |
| Bumper [V:19NRDv] | PRO decode 1.17 s (2 %); logo draw 3.62 s (5 %); 100 % counter 24.93 s (37 %); chevron wipe 47.97 s (71 %); B implosion 55.0 s (82 %); PRO final 59.90 s (89 %) | 6 | 11.2 s | Chevron pre-loaded ≈1 s; chip orbit | 5.7 s still lockup |
| HubSpot [V:1CSXtQ] | Beat drop to macro prompt 13.03 s (43 %); particle transfer and fly-through 19.0-20.5 s (63-68 %) | 2 | 15.0 s | 100 ms gap + accelerating push-in; 70 ms gap before the dissolve hit | Macro typing (calm); benefit cards |
| Solar [V:1Hcg3X] | Wafer hero 6.83 s (19 %); particle → bolt flash 12.8 s (36 %); photo \| voltaic 17-19 s (47-53 %); solar field 30.6 s (86 %) | 4 | 9.0 s | Electrons ramp up for 2 s | Echo outlines decay 0.6 s; triptych recap |
| Lottieicon [V:1ccYWJ] | Bell zoom-through 1.13 s (3 %); logo 2.63 s (6 %); light-build release 21.0 s (47 %); tour zoom-in 27.9 s (63 %); "So" 38.0 s (86 %) | 5 | 8.9 s | Glow area ×9.5 over 2.1 s; suck-in shrinks | Hop-and-hold dwell; CTA |
| NOSTRA [V:1i2L14] | Scatter-swap-converge 7.57-10.63 s (22-30 %); text-wall carousel 10.63-13.97 s (30-40 %); ribbon 14.8-16.6 s (42-47 %); click → logo pun 32.0 s (91 %) | 4 | 8.8 s | 4.7 s breather before the pun | 0.8 s still |

Totals: 30 hero moments in 362.02 s, one per 12.1 s pooled; per film 2-6, median 4; median runtime ÷ count ≈10 s (range 8.8-19.4 s) [derived].

**ER-19 · Plan one hero moment per 9-20 s, at least 2 per film of 15 s or more [U].**
- **Placement:** the first in the first 10-25 % of runtime (median ≈20 %; Bumper and Lottieicon put one in the first 3 s); one near the middle (45-65 %); the last at 76-91 % (7/8 films; HubSpot's last is at 68 % and its end is a sting).
- **Why:** spaced peaks give the viewer something to wait for at every point in a feed-length attention span (mobile dwell is 1.7 s per item, and 74 % of a campaign's value lands in the first 10 s [N]); the end-weighted peak gives the brand its loudest moment just before the lockup.

**ER-20 · Load every hero moment, then let it breathe [U].**
- **Load:** 70-500 ms of near-silence (HubSpot, Wix, kivi, Chowdeck), a riser or light build of 1-2 s (kivi, Lottieicon), an accelerating push or punch of 3-8 f (kivi, HubSpot), or a pre-loaded shape about 1 s ahead (Bumper's chevron) [sources in the table].
- **The peak instant is short:** 4-20 f (kivi's burst completes in 4 f; Wix's build takes 12 f; Bumper's implosion 8 f + 10 f burst). The hero *shot* around it is 1-6 s.
- **Aftermath:** at least 30 f of calmer picture before the next dense beat [derived: every reference follows a hero with a hold, a slow move or a still].
- **Do:** riser 1.0 s → 100 ms gap → punch +18 % in 3 f → white frame → burst on the drop → slow push for 1.3 s [V:1-6l8S t=6.65-9.47s]. **Don't:** stack two hero moments back to back with no load between; the second one cancels the first.

## 15.10 Transition density and in-shot event density

Full transition budgets by runtime are in Part 05 §7.5; this section covers only how density relates to rhythm.

| Reference | Scene changes | Interval | Effect transitions | In-shot events |
|---|---|---|---|---|
| kivi | 32 in 77.8 s | 2.4 s | 12 light-based, 4 punch-ins, 9 hard cuts, rest morphs and masks | Word appends, pushes |
| Chowdeck | 10 in 18 s | 1.8 s | 1 seamless tilt; the rest cuts and swaps | ≈6 more events → one event per 0.7 s |
| Wix | 33 cuts in 53.9 s | 1.6 s | Hard cuts only; grade dissolves inside shots | 3-6 UI events per long shot |
| Bumper | 26 boundaries in 67.2 s | 2.6 s | 1 shape wipe, 1 push-through; 7 light/dark flips | Camera beat every 0.8-1.5 s |
| HubSpot | 9 changes (+6 seamless beats) in 30 s | 3.3 s (2.0 s with beats) | 1 blur dissolve; 2 continuous takes | UI ticks of 1-6 f |
| Solar | ≈21 changes in 35.8 s | 1.7 s | 1 effect (the flash); the rest choreography | Perpetual drift |
| Lottieicon | 24 in 44.3 s | 1.8 s | 15 motion-motivated, 9 swaps or breaths, 0 plug-in | Icon loops of 10-15 f |
| NOSTRA | 18 changes in 35 s | 1.9 s | Iris, burst, blinds, mask wipe | ≈25 in-shot morphs → one event per 0.85 s |

Sources: each reference's Transitions section.

**ER-21 · Scene changes every 1.6-3.3 s; discrete events every 0.5-1.5 s [U].** The median scene-change interval is ≈1.9 s. A shot longer than 3 s needs an in-shot event (camera beat, UI action, state change) every 0.8-1.5 s [V:19NRDv rule 12].
- **References win over [N].** [N] advises "some visual change every 1.5-3 s, a new scene every 2-4 s" [unverified there]. The references change scene faster (median 1.9 s) and add events far more often (0.5-1.5 s). Use [N]'s numbers only as the slow limit for VO-led explainers.

**ER-22 · Effect transitions: 0-2 per film [U].** Solar uses one effect transition (the flash). Lottieicon uses none. The rest is choreography: whips, motion matches, object wipes, light (Part 05). Rhythm comes from cut placement, not from transition effects.

**ER-23 · Long continuous takes are allowed when the camera keeps beating [S].** HubSpot's 8.23 s opening take contains a re-centre pan, caret follow, UI build, pull-back, dropdown, cursor travel and toggle: about one camera or UI event per 0.9 s [V:1CSXtQ shot 2]. Bumper's 5.96 s orbit steps every 1.25 s [V:19NRDv shot 19]. Lottieicon's 6.07 s tour holds 7-20 f between 17-32 f moves [V:1ccYWJ shot 18].
- **Avoid:** a hold over 5 s with slow drift and no beat. Bumper's uptime section (a 3.9 s and a 6.3 s network shot) drops to a motion mean of 1.82, and the 6.3 s shot is flagged: its beats come every 0.8-1.4 s, but the camera only drifts between them [V:19NRDv §11, avoid].

**ER-23a · Premium vs amateur transition density [U].** Premium: scene changes every 1.6-3.3 s, 0-2 effect transitions per film, and every other change motivated by motion (whip, match, object wipe, light) (ER-21, ER-22; table above). Amateur: a new effect on every cut, or long shots with no in-shot event; the reference flaws that trend this way are Lottieicon's unblurred 22-27 % W/f strobe pans [V:1ccYWJ shot 18] and Bumper's 1 f dip to black that "reads as a glitch" [V:19NRDv avoid]. No reference uses a plug-in transition preset (Lottieicon: 0 of 24) [V:1ccYWJ §10].

## 15.11 Rhythm for AI-generated footage and template engines

**ER-24 · Plan shots inside the generator's clip lengths, with trim handles [inferred from [P]].**
- Veo 3.1 clips are 4, 6 or 8 s at 24 fps; Gemini Omni Flash clips run up to 10 s; Veo extension adds 7 s per step [P]. With an ASL of about 2 s, most AI shots will be trimmed from 4 s clips.
- Generate each planned shot 1.5-2 s longer than its edit length and cut from the middle. This keeps the start and end of the clip (where generated motion tends to settle or drift) out of the film [inferred].
- A continuous take longer than about 6 s should be either one 8-10 s clip or a seamless join on motion (Part 05 TR-17); never a cross-dissolve between two generations of the same move [inferred].

**Frame rate.** Three references show duplicate-frame judder from frame-rate conversion: Wix and HubSpot (25 → 30 fps, every 6th frame repeated) and Solar (24 → 30 fps, every 5th frame repeated). All three teardowns flag it as visible on slides, whips and scrolls [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X].
- **Rule:** if most footage is Veo at 24 fps, deliver the whole film at 24 fps and re-time the frame plan through seconds. Otherwise generate or render at the delivery rate. Never convert by duplicating frames.

**Template engines (Remotion and similar).** `durationInFrames` must be an integer, and a `TransitionSeries` runs for the sum of the scenes minus the transitions [N]. So overlapping transitions shorten the film. Plan cut points as frames on the master timeline, and write each scene's length as its plan length plus its share of the overlap.

---

## 15.12 Universal principles (ER-U)

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

## 15.13 Style-specific rhythm (ER-S)

| ID | Style | Rhythm signature | Evidence |
|---|---|---|---|
| ER-S1 | Calm-Tech (Minimal Premium) | ASL 2.2-2.6 s; type cards 1.2-1.9 s with a live-append build; demo shots 2.6-6.3 s; a punch (+18-33 % in 3-8 f) into at most 4 cuts per 78 s; speech-led first half, eighth-note grid in the back half; pads under text-heavy stretches | [V:1-6l8S rules 3, 11] |
| ER-S2 | Prompt-native (AI feature launch) | ASL 2.6-3.0 s; 2 continuous takes of 3.7-8.2 s; typed prologue at 9-35 chars/s with 0.9-1.1 s phrase pauses; drop at about 40-45 % of runtime; then 1.1-2.2 s cards on transients | [V:1CSXtQ rules 1, 3, 13] |
| ER-S3 | Brand-bookended montage (UI-focused demo) | ASL 1.5-1.7 s; brand frames still ≥ 1.0 s; anchored montage bursts at 0.6-0.9 s ASL with lengthening holds; cuts not on beats; music arranged to the section turns | [V:15VhHR rules 6, 7, 17] |
| ER-S4 | Night claim / Day proof (fast startup launch) | ASL 2.3-2.6 s; claim cards 1-2 s on quarter beats; proof shots 2-6 s with a camera beat every 0.8-1.5 s; escalating word-swap finale every 11-16 f; lockup ≥ 4 s | [V:19NRDv rules 4, 12, 14, 15, 17] |
| ER-S5 | Dark neon reel (asset library) | ASL 1.7-1.9 s; hook section ASL ≈0.9 s; hop-and-hold hero tour of about 6 s at 60-75 % of runtime; climax triplet of 10-12 f cards; SFX at motion peaks | [V:1ccYWJ rules 10, 11, 14] |
| ER-S6 | Editorial 2.5D explainer | ASL 2.0-2.2 s; one hero hold of 4-5 s (13 % of runtime) for the key concept; bursts of 1.5-2.5 s with 0.4-0.5 s inserts; cut on the empty plate; major scene changes on downbeats | [V:1Hcg3X rules 1, 2, 7, 17] |
| ER-S7 | Monochrome brand-system explainer | ASL 1.8-1.9 s; kinetic sentence cycle of about 1 s; dense morph zones, then a ≈13 % breather before the CTA (inside ER-U11's 10-15 %); copy-led cuts | [V:1i2L14 rules 6, 14, 16] |
| ER-S8 | Playful consumer collage | ASL 1.6-1.7 s; event every ≈0.7 s; burst-and-breathe 2-4 s; graphic layers on twos (12 fps) with live action on ones; one deliberate click sync | [V:126cpH rules 13, 15] |
| ER-S9 | VO-led explainer or feature tour | ASL 2.2-3.0 s [inferred]; cut on VO sentence boundaries; one UI focus per caption line of 2.4-3.5 s; idea every 7-14 s; 150-170 wpm | [S:playbook] [S:Superside] [V:1Hcg3X] |
| ER-S10 | Event recap / launch sizzle | Up to about 1 shot per second (57.7 scenes/min), 71 % screen capture, no VO; cuts on the music beats is [inferred] in the source | [S:Figma] (from a third-party teardown snippet; frame timing not verified) |

## 15.14 Experimental (ER-X): validate before using as a default

1. **ER-X1 · Picture leads the drop by about 3 f with a frame-filling graphic** (kivi's shockwave fills the frame at 8.17-8.20 s; the full-band hit lands at ≈8.28 s) [V:1-6l8S]. One reference. It works because the burst completes during a 100 ms pre-drop dropout. Test on your track: if the drop has no pre-gap, lead by 0-2 f instead.
2. **ER-X2 · Counterpoint: fast picture over quiet music** (Wix's 0.83 s ASL ice montage over its breakdown) [V:15VhHR]. Risky: the montage was also flagged as "semantically vague". Use it only with an anchor and one readable claim.
3. **ER-X3 · Animating graphic layers on twos (12 fps) as a rhythm texture** [V:126cpH]. Reads hand-made; reads as lag on UI. Keep UI, live action and camera moves on ones [V:126cpH rule 13].
4. **ER-X4 · Strobing whip-pans with no motion blur** at 22-27 % W per frame [V:1ccYWJ shot 18]. The teardown flags the strobe. Keep peaks ≤ 8-10 % W per frame (≤ 154-192 px/f @1080p), or add 180° motion blur above about 5 % W per frame [V:1ccYWJ rule 11].
5. **ER-X5 · A chapter rail as a visible rhythm device** (NOSTRA's player-frame chapter bar with chips proportional to section length) [V:1i2L14 §9]. Useful for case-study and long-form posts; untested as an ad.
6. **ER-X6 · Recap montage at about 1 shot per second** [S:Figma]. Text-only evidence; use for event recaps only, never as the default for a launch film.

## 15.15 Avoid (ER-A)

| ID | Avoid | Observed in | Fix |
|---|---|---|---|
| ER-A1 | A static opening longer than 0.5 s | Chowdeck: nothing changes for 0.73 s [V:126cpH avoid] | First change by f3 |
| ER-A2 | Payoffs readable for under 1.0 s; a final state shown for 2 f | Solar 0.4 s; Chowdeck 2 f and 0.45 s [V:1Hcg3X] [V:126cpH] | ≥ 1.0 s still; ≥ 25 f for any text event |
| ER-A3 | 4 or more same-treatment text cards in a row | kivi (5), HubSpot (4), Lottieicon (6) | Break after 3 with a UI beat, scale change or music lift |
| ER-A4 | A hold over 5 s with no in-shot beat | Bumper's 6.3 s network shot [V:19NRDv] | Camera or state beat every 0.8-1.5 s |
| ER-A5 | Music that ends before the picture | Lottieicon, 3.7 s early [V:1ccYWJ] | Sting on the logo; tail to the last frame |
| ER-A6 | A cut 3-8 f ahead of the kick, or any cut after it | HubSpot 22.60 s (5 f early) [V:1CSXtQ] | Lead by 0-2 f, or move the cut into a gap |
| ER-A7 | A single-frame dip to black between scenes | Bumper 25.60 s "reads as a glitch" [V:19NRDv] | A clean cut, or a 2-4 f luma dip |
| ER-A8 | Frame-rate conversion by duplicate frames | Wix, HubSpot, Solar | Render natively at the delivery rate |
| ER-A9 | Instant state snaps that land on neither a beat nor a VO word | Solar's battery gauge [V:1Hcg3X] | Snap on the beat or the spoken word |
| ER-A10 | A mid-film energy dip: ambient bed under 5 text cards | kivi 22-31 s [V:1-6l8S] | Insert a UI beat or a music lift |
| ER-A11 | Flat, over-limited audio with no build | NOSTRA, −7.9 LUFS, 5 dB range [V:1i2L14] | ≥ 3 energy states and a build (BS-09) |
| ER-A12 | Measuring rhythm with a shot detector | Every reference (§0.1) | Count from the timeline |
| ER-A13 | Counting frames for beats at non-integer tempos | Lottieicon swaps drift against a 16 f beat [V:1ccYWJ] | Compute beat times (BS-04) |
| ER-A14 | Ending on a still shorter than 1.5 s, or with no logo at all | NOSTRA 0.8 s; Lottieicon and Solar no logo | Lockup still ≥ 1.5-2.2 s |
| ER-A15 | Uniform shot lengths (every shot 2.5-3 s) | None of the references does this [inferred as the amateur default] | Skewed distribution (ER-U1) |
| ER-A16 | More than one flash moment, or flash frames longer than 3 f | Solar uses exactly one (3 f + 2 f) and flags the limit [V:1Hcg3X avoid]; WCAG: ≤ 3 flashes per second [N] | One flash per film at the conceptual peak |

## 15.16 Especially good for SaaS (ER-SaaS)

1. **Cut on the click.** Interaction-triggered edit points with a 3-15 f consequence and a suck-out before the payoff (ER-18) [V:1CSXtQ] [V:15VhHR] [V:126cpH] [V:1i2L14] [V:1-6l8S].
2. **Feature-led first half, music-led second half,** switching at the drop or first payoff (ER-17). This lets the product show its real speed and then lets the film carry momentum.
3. **Claims fast, UI proof slow** (ER-06), with the world or colour flip that tells the viewer which mode they are in [V:19NRDv rule 4].
4. **Demo blocks get shorter in the back half** (kivi's last three demos 14.75 → 11.03 → 6.69 s): the viewer has learned the "say it, see it" grammar, so later demos need less time [V:1-6l8S §3]. kivi's first two demos (7.48, 8.44 s) are shorter than its third, so the shrink starts once the grammar is established, not from block 1 [inferred reading].
5. **Anchored slot-machine montage** for "one input, many outputs" at 0.6-0.9 s ASL, lengthening onto the hero use case (ER-05, ER-14) [V:15VhHR].
6. **In-shot UI events instead of cuts.** A long UI shot with a state change every 0.5-1.0 s feels faster than cutting, and keeps spatial continuity [V:15VhHR] [V:1CSXtQ].
7. **Breakdown under the densest UI reading** (ER-10) [V:19NRDv].
8. **Section-level music sync for UI-heavy films** instead of beat-cutting every UI action (BS-01) [V:15VhHR rule 17].

## 15.17 Do / Don't

| Do | Don't | Why |
|---|---|---|
| Set the ASL from the style (e.g. 2.4 s for Calm-Tech) and derive the shot count | Shorten every shot because the film is only 15 s | ASL is temperament; runtime is story length (ER-04) |
| Alternate 1.2-1.8 s claims with 3-5 s proof shots | Run every shot at 2.5 s | Tempo contrast signals read vs. watch (ER-06) |
| Give a 6 s proof shot a camera or UI beat every 1-1.5 s | Hold 6 s on a slow drift | Long holds need internal events (ER-23) |
| Shorten the last 4 units by 20-30 % each, then cut to a 2.2 s still | Keep the climax at the same pace as the middle | The trend builds tension; the still releases it (ER-12, ER-13) |
| Lead the beat by 1-2 f | Cut on or after the kick, or 5 f early | Sound-late is tolerated; picture-late reads as sluggish (BS-02, BS-03) |
| Compute beat times and round to frames | Count 16 f per beat at 112.3 BPM | Counting drifts (BS-04) |
| Sync the reveal, the click and the climax in a UI-led film; let UI actions keep their own timing | Force every typing step onto the grid | UI timing is product truth (BS-01) |
| Drop the music by ≥ 15 dB for 0.3-0.5 s before the reveal | Keep the bed at full level through the payoff | Silence makes the hit land (§15.6) |
| Put a 1-frame empty plate between two claim cards | Cut claim to claim with the second already moving over the first | The breath frame resets the eye |
| Keep the music to the last frame, resolving on the logo | Let the music finish 3 s early | The film must not "end" before the CTA (BS-10) |
| Count shots from the timeline | Trust a scene detector | Detectors miss 30-70 % of text and white cuts (ER-01) |
| Break text runs after 3 cards with a UI beat | Stack 5 title cards over an ambient pad | Text-card fatigue (ER-07) |
| Load each hero with a gap, riser or push, then calm down for ≥ 1 s | Fire two hero moments back to back | The second cancels the first (ER-20) |

## 15.18 Rhythm QC gate (run on the locked cut)

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

---

# Master §17. Recommended Shot Durations

## 17.0 How a shot's duration is decided

A shot is as long as the job it does, then rounded to the music. The references show four jobs, and each has its own time scale [derived from §0.1 and §15.4]:

| Job | What the eye does | Time scale | Measured examples |
|---|---|---|---|
| **Recognise** | Identify an icon, 1-2 words, a context swap behind an anchor, a binary state | 0.33-1.0 s | Punch cards 10-12 f [V:1ccYWJ t=38.0-39.07s]; montage inserts 0.23-0.97 s [V:15VhHR t=8.63-12.47s]; bridge shots 0.43-1.0 s [V:1Hcg3X] [V:126cpH] |
| **Read** | Read a line of 2-6 words once | 0.9-2.3 s | Type cards 1.17-1.87 s [V:1-6l8S §11]; claim cards 1-2 s [V:19NRDv rule 4]; end cards 1.13-2.17 s [V:1CSXtQ §11] |
| **Follow** | Watch a UI action and its consequence, or a cause and effect | 1.8-6.3 s (8.2 s as one continuous take) | UI shots 1.8 and 2.53 s [V:126cpH rule 15]; demos 2.6-6.25 s [V:1-6l8S §11]; proof shots 2-6 s [V:19NRDv]; 8.23 s take [V:1CSXtQ shot 2] |
| **Register** | Let the brand sink in | ≥ 1.5 s dead still (2.2 s premium; ≥ 4 s with a QR code) | §15.6 final still |

**Order of decisions** [inferred, from ER-04 and BS-07]:
1. Choose the style, which fixes the ASL band (§15.2).
2. Choose the runtime plan (§17.4), which fixes the stage windows and the shot count.
3. Give each shot a duration token (§17.1) by its job.
4. Check the token against the shot's actual content with the formulas in §17.2. If the content needs longer, take time from a neighbouring shot of the same stage, never from a read hold.
5. Snap cuts to the music (BS-01, BS-07). When a cut moves to a beat, lengthen the shot to the next beat rather than cutting a read hold short.

**Why tokens rather than free choice.** The references' durations cluster tightly by job across eight different studios and styles (§0.1). A token system reproduces that clustering, which is what makes the edit feel "inevitable" (§15.0), and it lets an AI pipeline plan a film before any footage exists [inferred].

## 17.1 Shot-duration tokens (SD-01 … SD-20)

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

## 17.2 Computing a shot's length from its contents

Use these formulas to check a token against the real content. All values are frames at 30 fps.

**A. Text shot**

`L = entrance + (words − 1) × stagger + landed hold + exit`

- Entrance 8-14 f ease-out; exit 4-6 f ease-in, about half the entrance (Part 03 SP-T0) [V:1-6l8S rule 4].
- Word stagger 3-8 f [V:1-6l8S rule 1]; 7-10 f when word starts sit on eighth notes [V:19NRDv rule 2].
- Landed hold by Part 07 tier: kinetic 10-14 f, statement ≥ 24 f, message by the [N] formula, payoff ≥ 30 f still.

| Example | Entrance | Stagger | Hold | Exit | Total |
|---|---|---|---|---|---|
| 2-word kinetic card | 12 | 1 × 4 | 12 | 5 | **33 f (1.10 s)**, inside SD-04 |
| 5-word statement | 12 | 4 × 5 | 24 | 5 | **61 f (2.03 s)**; first word legible by ≈f6, so 50 f are visible before the exit, over the statement tier's 45 f |
| 6-word message over footage | 12 | 5 × 4 | max(30, 0.33 × 6 × 30 + 12 = 71) = 71 | 6 | **109 f (3.63 s)**, so split it or cut the copy |

**B. Typed shot**

`L = in + Σ(characters ÷ speed) + phrase pauses + post-hold + exit`

- Speeds: filler 28-35 cps, key phrase ≈9 cps [V:1CSXtQ rule 1]; wide 18-20 cps, close-up 7-8 cps [V:15VhHR rule 11]; display type-on 40-55 cps [V:1ccYWJ rule 13]. Phrase pause 0.9-1.1 s [V:1CSXtQ rule 1]. Post-hold ≥ 18 f [V:1CSXtQ t=7.2-7.8s].
- Worked example, "Get the power of ChatGPT, fueled by your CRM data." [V:1CSXtQ t=2.13-7.80s]: in 6 f + 25 characters at 30 cps (25 f) + pause 30 f + "fueled by your " at 30 cps (15 f) + "CRM data." at 9 cps (30 f) + post-hold 18 f = **124 f (4.1 s)**. The measured stage is 5.67 s, because the reference also re-centres and pauses twice [V:1CSXtQ §11]. Plan 4-6 s for a 9-10-word typed promise.

**C. UI action shot**

`L = settle + cursor travel + dwell + press + consequence delay + result read + exit`

| Variant | Settle | Travel | Dwell | Press | Consequence | Result | Exit | Total |
|---|---|---|---|---|---|---|---|---|
| Fast UI (toggle, chip) | 8 | 15 | 7 | 2 | 3 | 30 | 6 | **71 f (2.37 s)** |
| Calm premium (prompt send) | 12 | 25 | 10 | 1 | 6 | 30 | 8 | **92 f (3.07 s)** |
| Reveal with a suck-out | 12 | 18 | 15 | 1 | 8 | 30 | 8 | **92 f (3.07 s)** |
| Playful press | 16 | 8 | 10 | 5 | 10 | (in the next shot) | 0 | **49 f (1.63 s)** + a morph |

Sources: cursor moves 15-20 f with a 10-12 f tail and hovers of 0.3-1.0 s [V:15VhHR rule 10]; cursor travel 800-900 ms and a payoff cut 3 f after the state change [V:1CSXtQ rule 7]; 8 f approach, 10 f dwell, 5 f press, 10 f hold [V:126cpH rule 7]; consequence 3-15 f (ER-18); result ≥ 1.0 s (ER-16). Chowdeck's shot is 54 f because its result happens in the next shot through a shared-element morph [V:126cpH t=9.27-11.07s]. That is the way to keep an action shot under 2 s.

**D. Counter or number shot**

`L = entrance (6-12 f) + count + park (≥ 30 f still)`. Count ≈1 s expo-out covering 70 % of the range in the first 25 % [V:19NRDv rule 8], or a linear count of ≈1.9 s for 4 digits and ≈1 s for 2 digits [V:1ccYWJ rule 5]. Example: 8 + 30 + 30 = **68 f (2.27 s)**.

**E. Long take**

`L = beats × (0.8-1.5 s)`. Cap it at about 6.3 s unless the camera and the UI both change at least every 1.5 s. HubSpot's 8.23 s take carries about one camera or UI event per 0.9 s [V:1CSXtQ shot 2]; Bumper's 6.26 s network shot, with slow drift between its beats, is flagged [V:19NRDv avoid].

**F. Logo reveal and lockup**

- Mid-film reveal: stages + ≥ 15 f legible + exit. Bumper: stroke 5 f + fill 8 f + sheen 14 f = 27 f of build inside a 3.53 s shot that also carries the chip orbit [V:19NRDv shot 4].
- End lockup: settle 9-15 f + still ≥ 45 f (66 f premium, ≥ 120 f with a QR) [V:1CSXtQ shot 10] [V:19NRDv rule 15].

**G. Snapping a computed length to the grid**

Round **up** to the next beat (15 f at 120 BPM, 18 f at 100 BPM) when the formula's length falls between beats and the cut is a grid cut [inferred, DU-R5]. Free cuts (UI-led, anchored montage) keep the formula's length.

**H. AI-generated footage**

Generate each shot 1.5-2 s longer than its edit length and cut from the middle (ER-24). With Veo 3.1 clip lengths of 4, 6 and 8 s [P], that gives edit lengths of ≤ 2.5 s from a 4 s clip, ≤ 4.5 s from a 6 s clip and ≤ 6.5 s from an 8 s clip [derived]. An SD-10 take longer than 6.5 s needs an 8-10 s generation (Gemini Omni Flash runs to 10 s [P]) or a seamless join on motion (Part 05 TR-17).

## 17.3 Runtime budgets

Shot counts are `runtime ÷ ASL`, rounded, at the three style bands of §0.3 (calm 2.6 s, balanced 2.1 s, fast 1.7 s). Narration words assume 150-170 wpm [S:playbook] over the runtime minus a 2-7 s no-speech tail (testimonial and explainer tails run 4-7 s with no speech [S:playbook]).

| Runtime | Frames @30 | Shots: calm / balanced / fast | Hero moments | Long holds (≥ 2 × ASL) | Breather | Proof blocks | Scene changes (Part 05 §7.5) | Bars at 120 BPM | VO words (if VO-led) | Basis |
|---|---|---|---|---|---|---|---|---|---|---|
| 5 s | 150 | 2 / 2 / 3 | 1 + the logo sting | 0 | none | 0-1 action | 2-3 | 2.5 | ≤ 10 (not recommended) | [inferred] |
| 10 s | 300 | 4 / 5 / 6 | 1-2 + the sting | 0 | none | 1 action | 4-6 | 5 | ≈ 20 | [inferred] |
| 15 s | 450 | 6 / 7 / 9 | 2 + the sting | 0-1 | none | 1 transaction | 6-9 | 7.5 | ≈ 30-37 | Chowdeck 18 s [V:126cpH]; [S:PointCard] 18 s |
| 30 s | 900 | 12 / 14 / 18 | 2-3 | 1 | 1 (≈ 3.5 s) | 1 use case, or 2 | 10-16 | 15 | ≈ 65-75 | HubSpot, NOSTRA, Solar |
| 45 s | 1350 | 17 / 21 / 26 | 3-4 | 1-2 | 1 (≈ 5 s) | 3 | 16-25 | 22.5 | ≈ 100-115 | Lottieicon; [E] spots 39-51 s |
| 60 s | 1800 | 23 / 29 / 35 | 4-6 | 2-3 | 1 (≈ 6 s, or a breakdown) | 4 | 22-33 | 30 | ≈ 135-155 | Wix, Bumper; [S:Airtable] 58 s |
| 90 s | 2700 | 35 / 43 / (53, avoid) | 5-7 | 2-3 | 1 (9-13.5 s) | 5 | 30-45 | 45 | ≈ 210-240 | kivi 78 s, extrapolated |

- **The fast band at 90 s is marked "avoid".** No reference sustains an ASL under 2 s for longer than 54 s (Wix), and 53 shots would exceed Part 05's 30-45 change budget [inferred].
- **5 s is too short for narration.** Ten spoken words leave no time for the lockup; use on-screen copy only [inferred].
- **The breather grows with runtime but stays at 10-15 % of it** (ER-U11; NOSTRA 13 %, kivi's pad section 11 %) [V:1i2L14] [V:1-6l8S §12].

## 17.4 Timing plans: 5, 10, 15, 30, 45, 60 s, a 90 s VO explainer and a 90 s launch film

### 17.4.0 How to read the plans

- **Stage windows.** The 15, 30, 45, 60 and 90 s (launch) plans use Part 01 §2.3's stage windows unchanged, with one exception: the 60 s hook ends at 2.5 s instead of 2.4 s so that it falls on a beat (3 f later). The 5 and 10 s plans have no reference under 17.97 s and are extrapolated [inferred]. The 90 s VO explainer is built on the VO-led variant in Part 01 §2.3 and template T9, from second-level caption timings [S:Superside] [S:playbook]; no frame-measured VO explainer exists among the references.
- **Planning grid.** Every plan is drawn on a 120 BPM grid: 1 beat = 0.5 s = 15 f at 30 fps (12 f at 24 fps), 1 bar = 2.0 s = 60 f. It is the one common tempo that is frame-exact at both 30 and 24 fps, and all Part 01 boundaries except one already sit on it (BS-07) [derived]. It is a scaffold, not a tempo recommendation: choose the real tempo by style (BS-06) and re-snap the grid cuts with BS-04. No section boundary moves more than one beat.
- **Beat numbers.** Beat 0 is f0; beat *n* is at *n* × 0.5 s (so "beat 6" is 3.0 s, f90). Bar lines are the even seconds.
- **Grid cuts and free cuts.** "On the beat" in the *Out* column marks a grid cut. On a grid cut the incoming shot starts 0-2 f before the listed frame (picture leads, BS-02). Cuts marked "free" follow the product's own timing or an anchored montage, and they do not move (BS-01).
- **Frames.** `In-out` frames give the first frame of the shot and the first frame of the next shot at 30 fps, so `45-90` is 45 frames. At 24 fps multiply seconds by 24. Every grid time becomes an integer frame; the 21/30/39 f montage holds become 17/24/31 f.
- **Tokens.** The `Token` column refers to §17.1. Micro-timings in the *Picture* column come from the cited teardown rules and Parts 03, 06 and 07.
- **Rhythm check.** Each plan ends with its computed numbers (shots, ASL, median, longest, long holds, heroes), so you can see it against the §15 rules before you build it.

### 17.4.1 Plan summary

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

### PL-05 · 5 s bumper or sting (150 f)

**Use for:** a bumper ad, a channel or event sting, an end slate, the first 5 s of a longer preview. **Not for:** explaining a product. **Evidence:** extrapolated [inferred]. No reference is shorter than 17.97 s. The plan applies the hook rules (text on f0, first change by f3), the read tiers (Part 07), the lockup still of at least 1.5 s (ER-U9) and Part 05's 5 s budget of 2-3 scene changes. [W:motion.so] lists "under 10 s" as a delivery bucket, which confirms the format exists but not its timing.

| Stage | Window (s) | Frames | % |
|---|---|---|---|
| Hook | 0.0-1.5 | 0-45 | 30 % |
| Proof (one state change) | 1.5-3.0 | 45-90 | 30 % |
| Resolution (lockup) | 3.0-5.0 | 90-150 | 40 % |

| # | In-out (s) | Frames @30 | Dur s (f) | Stage | Token | Picture: content and in-shot events | Out | Audio / sync |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.0-1.5 | 0-45 | 1.5 (45) | Hook | SD-01 | Claim or question of 4 words or fewer, on screen at f0; words build at a 4-6 f stagger; first change by f3; line drifts 3-4 % W/s | Ease-in push +10 % over the last 8 f, hard cut on beat 3 | Kick or sub impact on f0 |
| 2 | 1.5-3.0 | 45-90 | 1.5 (45) | Proof | SD-12 | One product state change. Open mid-motion with the cursor already near the target; press at 1.8 s; consequence by 2.0 s (6 f); result fully still 2.0-3.0 s (1.0 s) | Hard cut, or the result element scales into the logo position (shape match) | 100-200 ms dip of at least 15 dB before the press; click SFX on the press frame; **hero 1 at 2.0 s (40 %)** |
| 3 | 3.0-5.0 | 90-150 | 2.0 (60) | Resolution | SD-20 | Logo builds in 8-12 f, then a URL or CTA line of 4 words or fewer by 3.4 s; dead still from 3.5 s (1.5 s); one tiny ambient element allowed | End on the last frame; no fade to black before the sting tail ends | Sting on the cut at 3.0 s (beat 6), tail to the last frame; **hero 2 at 3.0 s (60 %)** |

**Rhythm check [derived].** 3 shots · ASL 1.67 s · median 1.50 s (0.90 × ASL) · longest 2.0 s (40 % of runtime, 1.2 × ASL) · long holds of ≥ 2 × ASL: 0 · heroes at 2.0 s (40 %) and 3.0 s (60 %).

**Why it works.** Five seconds holds one claim, one proof and one brand registration: three jobs, three shots. The lockup takes 40 % of the runtime because a bumper's job is recall, and the still must be at least 1.5 s to register (ER-U9) [inferred]. The main hero is the state change, loaded by a 100-200 ms dip (§15.6); the logo sting is the closing peak.

**Variant B: single-shot sting (1 shot).** 0.0-0.5 s a motif in motion from f0; 0.5-2.0 s it transforms into the mark (morph, implosion or a shape match, Part 05); 2.0-5.0 s the lockup, dead still from 2.8 s (2.2 s). Sting on the transformation's peak at about 1.6 s and a resolve on the lockup. Use it when there is no product UI to show [inferred].

### PL-10 · 10 s teaser or micro-demo (300 f)

**Use for:** a social teaser, a single-feature micro-demo, a story ad, a pre-launch "coming soon". **Evidence:** extrapolated from the 15 s row and Chowdeck's proportions [inferred]; Part 05 allows 4-6 scene changes; TikTok's 21-34 s in-feed sweet spot [N] means 10 s is a teaser, not a full ad. 120 BPM gives exactly 5 bars.

| Stage | Window (s) | Frames | % |
|---|---|---|---|
| Hook | 0.0-1.5 | 0-45 | 15 % |
| Reveal | 1.5-3.0 | 45-90 | 15 % |
| Proof | 3.0-6.0 | 90-180 | 30 % |
| Climax (payoff) | 6.0-7.5 | 180-225 | 15 % |
| Resolution | 7.5-10.0 | 225-300 | 25 % |

| # | In-out (s) | Frames @30 | Dur s (f) | Stage | Token | Picture: content and in-shot events | Out | Audio / sync |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.0-1.5 | 0-45 | 1.5 (45) | Hook | SD-01 | 5 words or fewer, on screen at f0 (macro-to-micro type or a typed question); a new word or change every 0.5 s or less while the line builds | Accelerate into the cut (6-10 f ease-in) | Sparse kick on f0 and on beat 2 (1.0 s) |
| 2 | 1.5-3.0 | 45-90 | 1.5 (45) | Reveal | SD-08 | Product name plus first UI or mechanic; name legible by 1.8 s; logo micro-stages of 0.3-0.6 s each (stroke, fill, sheen) | Hard cut on beat 6 | 100-200 ms of near-silence before 1.5 s; groove enters on the cut (15 %); **hero 1 at 1.5 s (15 %)** |
| 3 | 3.0-6.0 | 90-180 | 3.0 (90) | Proof | SD-12 | One use case as one take: UI settles in 12 f, cursor travels 15-20 f, dwells 10 f, clicks at about 4.6 s; consequence 6-8 f later; result readable from about 5.0 s; slow push 1.00 to 1.06; one event every 0.5-1.0 s | Hard cut on beat 12 at the end of a settle | Soft UI click under the bed |
| 4 | 6.0-7.5 | 180-225 | 1.5 (45) | Climax | SD-17 | Payoff: the result close-up or outcome number, fully still 6.4-7.5 s (1.1 s) | Expo punch +18 % in the last 3-8 f, hard cut | Hit on the cut at 6.0 s; **hero 2 at 6.0 s (60 %)** |
| 5 | 7.5-10.0 | 225-300 | 2.5 (75) | Resolution | SD-20 | Lockup: logo plus a verb CTA line and URL; logo settles by 7.9 s, CTA by 8.2 s; dead still 8.2-10.0 s (1.8 s) | End | Sting on the cut at 7.5 s (beat 15), tail to the last frame; **hero 3 at 7.5 s (75 %)** |

**Rhythm check [derived].** 5 shots · ASL 2.00 s · median 1.50 s (0.75 × ASL) · longest 3.0 s (30 % of runtime, 1.5 × ASL) · long holds of ≥ 2 × ASL: 0 · heroes at 1.5 s (15 %), 6.0 s (60 %) and 7.5 s (75 %).

**Why it works.** The music turn at 15 % follows ER-11, and the one long shot is the proof (DU-R4). The payoff has its own shot so the outcome is still for a full second (ER-16). There is no setup stage: at 10 s, the hook carries the problem.

**Variants.**
- **Fast (6 shots, ASL 1.67 s):** split shot 3 into the action (3.0-4.5) and a cut-in on the result (4.5-6.0).
- **Calm (4 shots, ASL 2.5 s):** merge shots 3 and 4 into one 4.5 s take with the result held still from 6.4 s.
- **9:16:** keep all times. Keep text inside x 120-840, y 270-1210 @1920p [N].

### PL-15 · 15 s single-transaction ad (450 f, 9:16 default)

**Use for:** a performance ad, an app-install ad, a vertical cutdown of a launch. **Evidence:** Chowdeck's measured structure (17.97 s, 11 shots, ASL 1.63 s) [V:126cpH rule 2] and [S:PointCard] (18 s, beats [inferred] in the source). Part 01 §2.3 windows, used unchanged.

| Stage | Window (s) | Frames | % |
|---|---|---|---|
| Hook | 0.0-1.5 | 0-45 | 10 % |
| Setup / problem | 1.5-2.5 | 45-75 | 6.7 % |
| Reveal (promise) | 2.5-4.5 | 75-135 | 13.3 % |
| Proof (one transaction) | 4.5-10.5 | 135-315 | 40 % |
| Climax (payoff) | 10.5-12.0 | 315-360 | 10 % |
| Resolution (CTA 1.0 s + lockup 2.0 s) | 12.0-15.0 | 360-450 | 20 % |

| # | In-out (s) | Frames @30 | Dur s (f) | Stage | Token | Picture: content and in-shot events | Out | Audio / sync |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.0-1.5 | 0-45 | 1.5 (45) | Hook | SD-01 | Question or objection of 3 words or fewer in the audience's own idiom; hero word about 12-13 % H (230-250 px @1920p), about 85 % W; on screen at f0, first change by f3 [V:126cpH rule 1] | 1 f graphic match or hard cut | Kick on f0 |
| 2 | 1.5-2.5 | 45-75 | 1.0 (30) | Setup | SD-04 | One visual pain or the user in context, with the product already in frame; 3 words or fewer, fully readable for at least 0.7 s (the reference's 0.45 s is a flaw) [V:126cpH t=1.60-2.53s] | Vertical push up in 11 f with about 10 % H directional blur [V:126cpH rule 10] | None |
| 3 | 2.5-4.5 | 75-135 | 2.0 (60) | Reveal | SD-08 | Brand plus promise: claim legible by 3.0 s and still for at least 0.7 s; then one burst accent that must not cover the claim word (3.3-3.8 s) [V:126cpH t=2.53-5.17s] | Hard cut | Music turn on the cut at 2.5 s (17 %); pop on the burst; **hero 1 at 3.3 s (22 %)** |
| 4 | 4.5-6.0 | 135-180 | 1.5 (45) | Proof | SD-11 | Range or 'before' context: two-stage pull-out from an ECU of one element to the whole system, about 4x in about 1 s (stage 1 expo-out, about 0.25 s near-hold, stage 2 ease-in-out 13 f) [V:126cpH rule 5] | Seamless (camera keeps moving) or a match-on-action cut | None |
| 5 | 6.0-8.0 | 180-240 | 2.0 (60) | Proof | SD-12 | UI action: card enters tilted about 15 deg and settles in 16-22 f; cursor 8 f ease-out, dwell 10 f, press at about 7.3 s (5 f press), 10 f hold before the consequence [V:126cpH rules 6-7] | Shared-element morph into the next UI over about 7 f plus an 11 f rack focus [V:126cpH rule 8] | At least 0.3 s dip of 15 dB or more, press on an onset at 0 f |
| 6 | 8.0-10.5 | 240-315 | 2.5 (75) | Proof | SD-09 | Progress: at most 2 statuses, each 5 words or fewer and held at least 1.0 s; the progress line draws leg by leg and reaches its end about 0.35 s before the cut [V:126cpH rule 9] | Hard cut | None |
| 7 | 10.5-12.0 | 315-360 | 1.5 (45) | Climax | SD-17 | Payoff state ('Done', the result number): each line fades up over about 15 f with a 3 f stagger; fully still 11.0-12.0 s [V:126cpH rules 12, 14] | Hard cut, or the start of a seamless tilt | Hit on the cut at 10.5 s; **hero 2 at 10.5 s (70 %)** |
| 8 | 12.0-13.0 | 360-390 | 1.0 (30) | Resolution | SD-19 | CTA card: verb plus offer, 4 words or fewer, with an arrow or button [S:PointCard] [S:playbook] | Seamless 30 f S-curve tilt through a horizontal layer into the lockup [V:126cpH rule 11] | Music lifts |
| 9 | 13.0-15.0 | 390-450 | 2.0 (60) | Resolution | SD-20 | Lockup plus CTA handle; logo lands by 13.3 s; still 13.3-15.0 s (1.7 s) with one tiny ambient element [V:126cpH rule 14] | End | Sting at 13.0 s, tail to the last frame; **hero 3 at 13.0 s (87 %)** |

**Rhythm check [derived].** 9 shots · ASL 1.67 s · median 1.50 s (0.90 × ASL) · longest 2.5 s (17 % of runtime, 1.5 × ASL) · long holds of ≥ 2 × ASL: 0 · heroes at 3.3 s (22 %), 10.5 s (70 %) and 13.0 s (87 %).

**Why it works.** One transaction, told end to end, is the whole proof (Part 01 TS3) [V:126cpH]. The ASL equals Chowdeck's 1.63-1.67 s, and the edit is narrative-led: only the section turns, the click and the sting sync to the music, which is what Chowdeck does (0/5 hard cuts on onsets; the click on an onset at 0 f) [V:126cpH §Editing Rhythm]. The plan fixes Chowdeck's three timing flaws: the 0.73 s static open (now text and motion from f0), the 0.45 s "been busy?" hold (now ≥ 0.7 s) and the 2 f final status (now ≥ 1.0 s per status) [V:126cpH flaws].

**Variants.**
- **Objection flip (T12):** shot 1 is the objection, shot 2 a blunt answer, shots 4-6 three perks plus one app screen, shot 7 the mirrored payoff, shot 8 an offer with an arrow [S:PointCard]. Keep the times.
- **Music-led:** put shots 3-9 on the beat; they already sit on the 0.5 s grid.
- **16:9:** keep the times; the hero word drops from 12-13 % H to about 8-10 % H [V:1-6l8S rule 2].

### PL-30 · 30 s prompt-native or Minimal Premium spot (900 f)

**Use for:** an AI feature, a connector or integration, a co-brand launch, the 30 s feed version of a launch [W:motion.so] ("30 s for feeds, 60 s for the website"). **Evidence:** HubSpot's measured structure (30.03 s, 10 shots, ASL 3.00 s; drop at 43 %) [V:1CSXtQ §3, §11], NOSTRA's breather [V:1i2L14 rule 14] and Bumper's accelerating swaps [V:19NRDv]. Part 01 §2.3 windows, used unchanged.

| Stage | Window (s) | Frames | % |
|---|---|---|---|
| Hook | 0.0-2.0 | 0-60 | 6.7 % |
| Setup | 2.0-4.0 | 60-120 | 6.7 % |
| Reveal | 4.0-7.5 | 120-225 | 11.7 % |
| Proof (one use case) | 7.5-20.0 | 225-600 | 41.7 % |
| Benefit / breather | 20.0-23.5 | 600-705 | 11.7 % |
| Climax | 23.5-25.0 | 705-750 | 5 % |
| Resolution (CTA 2.0 s + lockup 3.0 s) | 25.0-30.0 | 750-900 | 16.7 % |

| # | In-out (s) | Frames @30 | Dur s (f) | Stage | Token | Picture: content and in-shot events | Out | Audio / sync |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.0-2.0 | 0-60 | 2.0 (60) | Hook | SD-01 | Cold open: 3-5-word announcement on black or the brand field, text at f0; one moving element (dot or caret) from f0 [V:1CSXtQ t=0.00-2.13s] | Polarity-flip hard cut on the first audio hit | Sub impact on f0; pitch glide follows the moving element |
| 2 | 2.0-4.0 | 60-120 | 2.0 (60) | Setup | SD-07 | Typed promise of 6 words or fewer: filler at 28-35 cps, key noun phrase at about 9 cps, caret locked at 65 % W once past centre; still at least 0.6 s after the last character [V:1CSXtQ rule 1] | Seamless: the UI starts building around the text | Near-silence with quiet key ticks |
| 3 | 4.0-5.5 | 120-165 | 1.5 (45) | Reveal | SD-08 | Name or co-brand lockup: halves converge 20-40 px over 8 f while fading in, then an accelerating push +10 % [V:1CSXtQ rule 12] | Accelerating push into a hard cut | Riser crests on the cut at 4.0 s (13 %), 300 ms gap, then plucks; **hero 1 at 4.0 s (13 %)** |
| 4 | 5.5-7.5 | 165-225 | 2.0 (60) | Reveal | SD-09 | First UI state: border and shadow 1-3 f, brand icon pop 3 f, controls slide in 4-5 f, then pull back x0.75 over 21-31 f [V:1CSXtQ rule 2] | Hard cut 3 f after a state change | Light groove |
| 5 | 7.5-12.5 | 225-375 | 5.0 (150) | Proof | SD-10 | Continuous take, feature-led: one set-up action (add a source, toggle, upload); cursor travel 0.8-0.9 s, dropdown 6 f with 2 f row stagger, toggle 1-3 f; a camera or UI event every 0.7-1.0 s [V:1CSXtQ rule 7] | Cut 3 f after the toggle fills (free cut, product timing) | One click per state change; riser from about 10.5 s |
| 6 | 12.5-15.5 | 375-465 | 3.0 (90) | Proof | SD-07 | Macro on the real query typed at 7-9 cps; a slow truck keeps the line in frame [V:1CSXtQ shot 4] [V:15VhHR rule 11] | Send, then a match cut on the direction of motion (exit about 7 px/f ease-in, enter 30-35 px/f ease-out) [V:1CSXtQ rule 4] | 100 ms gap, then the drop on the cut at 12.5 s (42 %): the edit switches to music-led |
| 7 | 15.5-18.5 | 465-555 | 3.0 (90) | Proof | SD-14 | Hero depth move: pull back x0.55-0.6 in about 10 f (ease-in) into a 3D set, then a further x0.55 decelerating over 18-20 f; 0.9-1.0 s data transfer; dolly x2-2.5 through it [V:1CSXtQ rules 5-6] | Blur dissolve of 6-8 f on a hit | Whoosh on send; 70 ms gap before the dissolve hit; **hero 2 at 16.5 s (55 %)** |
| 8 | 18.5-20.0 | 555-600 | 1.5 (45) | Proof | SD-17 | Result: the answer or table with one value highlighted, fully still for at least 1.0 s | Hard cut on the beat | Groove |
| 9 | 20.0-23.5 | 600-705 | 3.5 (105) | Breather | SD-16 | Benefit line of 6 words or fewer over a calm product visual; motion at most 1/10 of the peaks; the card drifts -13 to -24 % in scale [V:1CSXtQ rule 9] [V:1i2L14 rule 14] | Word-spacing exit (gaps x1.5 over about 18 f), hard cut [V:1CSXtQ rule 10] | Pad or breakdown about 6 dB down |
| 10 | 23.5-25.0 | 705-750 | 1.5 (45) | Climax | SD-03 | Kinetic thesis line: the key word swaps at 16, 13, then 11 f; the last word lands on the beat at 24.5 s and holds 15 f [V:19NRDv t=57.60-59.90s] | Hard cut on the beat | Build; hit at 24.5 s; **hero 3 at 24.5 s (82 %)** |
| 11 | 25.0-27.0 | 750-810 | 2.0 (60) | Resolution | SD-19 | CTA card: verb plus product, 2-5 words on one centred line; settle 8-10 f, shrink x0.81-0.87 on the way out [V:1CSXtQ rules 10-11] | Hard cut on the audio peak | Pad under the CTA [V:1CSXtQ §12] |
| 12 | 27.0-30.0 | 810-900 | 3.0 (90) | Resolution | SD-20 | Reprised lockup in the identical position as shot 3; converge about 9 f; dead still from about 27.6 s (2.4 s) [V:1CSXtQ t=27.37-30.03s] | End | Hit on the cut at 27.0 s, 100 ms gap, sting at about 27.4 s, held about 1.2 s, decaying to the last frame |

**Rhythm check [derived].** 12 shots · ASL 2.50 s · median 2.00 s (0.80 × ASL) · longest 5.0 s (17 % of runtime, 2.0 × ASL) · long holds of ≥ 2 × ASL: 1 · heroes at 4.0 s (13 %), 16.5 s (55 %) and 24.5 s (82 %).

**Why it works.**
- **Intimate first, momentum second.** The feature-led first 12.5 s lets the product show its real speed, and the drop at 42 % turns comprehension into momentum (ER-17). HubSpot's ASL falls from 4.45 s to 2.04 s across its drop at 43 % [V:1CSXtQ §11].
- **One use case = one proof block,** so DU-U3's block-to-block shrink does not apply; its shots never grow: 5.0 → 3.0 → 3.0 → 1.5 s (§15.16 SaaS 4).
- **One long take** (5.0 s, 2.0 × ASL) is the "real product" proof (SD-10).
- **The breather sits under a single benefit line.** That keeps the text-only run at the end to 2 cards (climax and CTA) before the logo (ER-07).

**Variants.**
- **Explainer (Solar-style, ASL 2.1 s):** replace shots 2-8 with a slow-fast pattern: 1.5-2.5 s bursts of 0.4-1.4 s inserts alternating with one 4-5 s hero hold (13 % of runtime) for the key concept [V:1Hcg3X rule 7].
- **Copy-framework promo (NOSTRA T7):** dream 0-5.5 s, pain 5.5-12.5 s, benefits 12.5-17.5 s, features 17.5-26 s including a 4 s breather, reassurance 26-27.5 s, brand + CTA 27.5-30 s. Copy-led cuts at ASL 1.85 s, about 16 shots [V:1i2L14 rule 16] [derived].
- **With VO:** turn on BS-11. Cut on sentence ends, budget 65-75 words (§17.3).

### PL-45 · 45 s launch reel (1350 f)

**Use for:** a multi-feature launch, an asset or template library, a dev-tool launch, the length ElevenLabs' short launch spots cluster around (39-51 s, median ≈44 s) [E]. **Evidence:** Lottieicon's measured rhythm (44.27 s, 25 shots, ASL 1.77 s; fast → medium → slow hero → fast → hold) [V:1ccYWJ §11], Wix's anchored montage [V:15VhHR rules 6-9]. Part 01 §2.3 windows, used unchanged.

| Stage | Window (s) | Frames | % |
|---|---|---|---|
| Hook | 0.0-2.0 | 0-60 | 4.4 % |
| Setup | 2.0-4.0 | 60-120 | 4.4 % |
| Reveal | 4.0-8.0 | 120-240 | 8.9 % |
| Proof (3 blocks: 9.0 / 8.0 / 7.0 s) | 8.0-32.0 | 240-960 | 53.3 % |
| Benefit / breather | 32.0-37.0 | 960-1110 | 11.1 % |
| Climax | 37.0-39.5 | 1110-1185 | 5.6 % |
| Resolution (CTA 2.0 s + lockup 3.5 s) | 39.5-45.0 | 1185-1350 | 12.2 % |

The three proof blocks run 9.0, 8.0 and 7.0 s, as in Part 01 §2.3, so they shrink as the film goes on (§15.16 SaaS 4); the proof window itself is unchanged.

| # | In-out (s) | Frames @30 | Dur s (f) | Stage | Token | Picture: content and in-shot events | Out | Audio / sync |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.0-1.0 | 0-30 | 1.0 (30) | Hook | SD-02 | Zero-copy iconic hook: the symbol (about 12 % H) rises about 15 % H in 6-7 f and holds about 0.6 s [V:1ccYWJ rule 1] | Zoom-through at x1.3-1.4 per frame for 8-10 f | Sub boom on the frames where it fills the screen |
| 2 | 1.0-2.0 | 30-60 | 1.0 (30) | Hook | SD-04 | One- or two-word announcement: snap +40-55 % in 6 f with no overshoot, hold 6-10 f [V:1ccYWJ rule 2] | Ease-in shrink of -24 to -30 % over 8-18 f, cut on the smallest frame | None |
| 3 | 2.0-4.0 | 60-120 | 2.0 (60) | Setup | SD-05 | Category or pain line of 6 words or fewer, or an audience slot machine (fixed anchor word, 3-4 swaps every 15 f) [V:1ccYWJ rule 4] | Hard cut on the beat | Audible high swish on each swap |
| 4 | 4.0-6.0 | 120-180 | 2.0 (60) | Reveal | SD-08 | Logo: tile pops, glyph draws in, wordmark wipes left to right in 7 f, then beat-locked scale steps of +15 % (4 f) and +5 % (3 f) [V:1ccYWJ rule 3] | 8 f expo-in whip, cut on an onset | Sub on the cut at 4.0 s; **hero 1 at 4.0 s (9 %)** |
| 5 | 6.0-8.0 | 180-240 | 2.0 (60) | Reveal | SD-09 | Product in context: hero UI cut in mid-ease (50 % of travel in 4 f); one animated element at a time, 10-15 f each [V:1ccYWJ rules 6-7] | Hard cut on the beat | Full groove |
| 6 | 8.0-9.5 | 240-285 | 1.5 (45) | Proof A | SD-05 | Claim A, 6 words or fewer | Hard cut on the beat | None |
| 7 | 9.5-12.5 | 285-375 | 3.0 (90) | Proof A | SD-10 | Proof by volume or context: full view first (zoom-out about 2x to 1x over about 20 f), then dim to 15 % in 3 f and run a linear count-up that stops dead [V:1ccYWJ rule 5] | Hard cut | Counter ticks |
| 8 | 12.5-14.0 | 375-420 | 1.5 (45) | Proof A | SD-13 | Cut-in at about 3-3.5x on the one value or component that proves the claim [V:15VhHR rule 13] | Hard cut | None |
| 9 | 14.0-17.0 | 420-510 | 3.0 (90) | Proof A | SD-09 | Component in use with an accent under-glow of about 10 % H falloff [V:1ccYWJ rule 8] | Glow area x8-10 over the last 2 s, cut on its largest frame | Riser into 17.0 s |
| 10 | 17.0-18.0 | 510-540 | 1.0 (30) | Proof B | SD-04 | Claim B, 3 words or fewer | Hard cut on the beat | None |
| 11 | 18.0-18.7 | 540-561 | 0.7 (21) | Proof B | SD-11 | Anchored montage 1 of 3 (21 f): one UI element locked at identical screen coordinates; context 1 [V:15VhHR rules 6-7] | Hard cut (free, not beat-locked) | None |
| 12 | 18.7-19.7 | 561-591 | 1.0 (30) | Proof B | SD-11 | Montage 2 of 3 (30 f, +43 %): context 2 | Hard cut (free) | None |
| 13 | 19.7-21.0 | 591-630 | 1.3 (39) | Proof B | SD-11 | Montage 3 of 3 (39 f, +30 %): the hero use case; the user triggers it, click at about 20.7 s | Cut about 8 f after the click [V:15VhHR rule 8] | Music drops at least 15 dB on the click for 0.3-0.5 s |
| 14 | 21.0-25.0 | 630-750 | 4.0 (120) | Proof B | SD-10 | Payoff build: container, headline, badge, nav, body 2-4 f apart over 12 f; then pull back into the collection; a camera beat every 0.8-1.5 s [V:15VhHR rule 8] | Decelerate, dwell 6-7 f, accelerate into the cut [V:15VhHR rule 9] | Music re-enters on the build at 21.0 s; **hero 2 at 21.0 s (47 %)** |
| 15 | 25.0-26.0 | 750-780 | 1.0 (30) | Proof C | SD-04 | Claim C, 3 words or fewer | Scale-matched hand-off: 11 f pull-back -38 %, next shot opens at about 2x and 25 % opacity [V:1ccYWJ rule 12] | None |
| 16 | 26.0-32.0 | 780-960 | 6.0 (180) | Proof C | SD-10 | Hero tour (the long hold): zoom in about 2.3x, then 3-4 hop-and-hold glides of 17-32 f with 7-20 f holds on highlighted targets, glides shortening toward the exit; pan peak at most 8-10 % W per frame or add 180 deg blur [V:1ccYWJ rule 11] | Pull back, hard cut | Sub on each glide's peak velocity (within 2-3 f); zoom-in at about 27.0 s; **hero 3 at 27.0 s (60 %)** |
| 17 | 32.0-34.5 | 960-1035 | 2.5 (75) | Breather | SD-16 | Benefit line over the calm product field; motion at most 1/10 of the peaks | Hard cut or 2-4 f luma dip | Breakdown about 6 dB down |
| 18 | 34.5-37.0 | 1035-1110 | 2.5 (75) | Breather | SD-16 | Reassurance or format visual with one slow rise | Hard cut on the beat | Build starts at 35.5 s |
| 19 | 37.0-38.0 | 1110-1140 | 1.0 (30) | Climax | SD-04 | Thesis line, 6 words or fewer | Hard cut | Build |
| 20 | 38.0-39.5 | 1140-1185 | 1.5 (45) | Climax | SD-03 | Urgency triplet as one kinetic run: hero word about 44 % H, question about 17 % H, imperative about 12 % H, 10-12 f each, then hold [V:1ccYWJ rule 14] | Hard cut into the CTA | Hit at 38.0 s; **hero 4 at 38.0 s (84 %)** |
| 21 | 39.5-41.5 | 1185-1245 | 2.0 (60) | Resolution | SD-19 | Action CTA: circle shrinks expo-out in 6 f, morphs to a pill in 7 f, URL types at about 23 cps [V:1ccYWJ rule 15] | Hard cut | Music continues; it must not end before the picture [V:1ccYWJ §12] |
| 22 | 41.5-45.0 | 1245-1350 | 3.5 (105) | Resolution | SD-20 | Logo plus URL lockup; logo settles by 42.0 s; still 42.3-45.0 s (2.7 s) | End | Sting on the cut at 41.5 s, tail to the last frame |

**Rhythm check [derived].** 22 shots · ASL 2.05 s · median 1.75 s (0.86 × ASL) · longest 6.0 s (13 % of runtime, 2.9 × ASL) · long holds of ≥ 2 × ASL: 1 · heroes at 4.0 s (9 %), 21.0 s (47 %), 27.0 s (60 %) and 38.0 s (84 %).

**Why it works.**
- **Lottieicon's shape:** a quick opening (3 shots in the first 4 s; Lottieicon's opening runs faster, 0.91 s ASL over 7.3 s, because it cuts on every word swap), medium proof blocks, the slow hero tour at 58-71 % (Lottieicon 61-75 %), then fast statements and a held CTA [V:1ccYWJ §11].
- **The anchored montage lengthens onto the hero use case** (21 → 30 → 39 f, the Wix ratios) and pays off after a suck-out [V:15VhHR rules 7-8].
- **Fixes Lottieicon's flaws:** six text cards in a row (now at most 3 with a UI beat between), the music ending 3.7 s early (now running to the last frame) and no closing logo (now a 3.5 s lockup) [V:1ccYWJ avoid].

**Variant: claim / proof (Bumper grammar).** Keep the windows and replace each block's shots with one dark claim card (1.0-1.5 s, on the beat) followed by light proof shots of 2-6 s with a camera beat every 0.8-1.5 s [V:19NRDv rule 4].

### PL-60 · 60 s launch film (1800 f)

**Use for:** a B2B platform launch, the website hero film [W:motion.so] ("60 s for the website"), a payments, ops or data product with several features. **Evidence:** Bumper's measured structure (67.2 s, 27 shots, ASL 2.49 s; 11/18 hard cuts 0-2 f before a quarter beat) [V:19NRDv §3, §11], Wix's section-synced montage (53.87 s) [V:15VhHR] and [S:Airtable] (58 s, five chapters of 9-14 s). Part 01 §2.3 windows, used unchanged except the hook end (2.4 → 2.5 s).

| Stage | Window (s) | Frames | % |
|---|---|---|---|
| Hook | 0.0-2.5 | 0-75 | 4.2 % |
| Setup | 2.5-5.0 | 75-150 | 4.2 % |
| Reveal | 5.0-9.5 | 150-285 | 7.5 % |
| Proof (4 blocks: 10 / 9 / 8 / 7 s) | 9.5-43.5 | 285-1305 | 56.7 % |
| Benefit / breather | 43.5-49.5 | 1305-1485 | 10 % |
| Climax | 49.5-53.5 | 1485-1605 | 6.7 % |
| Resolution (tagline 1.5 s + lockup with CTA 5.0 s) | 53.5-60.0 | 1605-1800 | 10.8 % |

| # | In-out (s) | Frames @30 | Dur s (f) | Stage | Token | Picture: content and in-shot events | Out | Audio / sync |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.0-1.0 | 0-30 | 1.0 (30) | Hook | SD-02 | Hero word slams from 3-4x to 1x in 8-10 f (about 65 % of the change in frame 1) with motion blur; on screen at f0 [V:19NRDv rule 1] | Polarity-flip hard cut as the line continues | Sparse kick on f0, then one per bar |
| 2 | 1.0-2.5 | 30-75 | 1.5 (45) | Hook | SD-05 | The line completes word by word (starts 7-10 f apart); product name lands in the accent colour; the camera pulls back as words accumulate [V:19NRDv rules 2-3] | Hard cut on a kick | Kick |
| 3 | 2.5-5.0 | 75-150 | 2.5 (75) | Setup | SD-05 | One big word, then the category or pain line; letters blur in at a 4 f stagger [V:19NRDv shot 3] | Accelerating pull-back snap (-10 % per frame), hard cut | Sparse kicks continue |
| 4 | 5.0-8.5 | 150-255 | 3.5 (105) | Reveal | SD-08 | Logo: stroke 5 f, fill 8 f, sheen 14 f; then product objects fly in on arcs (22 f) and orbit [V:19NRDv t=3.62-5.70s] | Pull-back recede, hard cut | Logo stroke on the kick at 5.0 s; full groove enters about 5 f before the fly-in; **hero 1 at 5.0 s (8 %)** |
| 5 | 8.5-9.5 | 255-285 | 1.0 (30) | Reveal | SD-04 | Category line, 4 words or fewer | Hard cut on the beat | Groove |
| 6 | 9.5-11.0 | 285-330 | 1.5 (45) | Proof 1 | SD-05 | Claim 1 on the dark (claim) world: slam word plus line, benefit word in the accent | 2 f whip smear, hard cut | On the beat |
| 7 | 11.0-14.0 | 330-420 | 3.0 (90) | Proof 1 | SD-10 | Proof 1 on the light (proof) world: tilted 3D UI; the brand cursor flies in over 12 f and parks; click with a visible reaction within 6-8 f; a camera beat every 0.8-1.5 s [V:19NRDv rules 9, 12] | Punch-in cut | Click SFX |
| 8 | 14.0-15.5 | 420-465 | 1.5 (45) | Proof 1 | SD-13 | Cut-in on the one value; a tooltip types in at about 4 f per word | 3D swing-out with blur over about 8 f | None |
| 9 | 15.5-19.5 | 465-585 | 4.0 (120) | Proof 1 | SD-10 | Context, extraction, focus: whole table, lift the relevant column 0.5 s, push through in about 9 f, 5 f state-change fill; counter about 1 s expo-out (70 % of the range in the first 25 %) parks on the final value [V:19NRDv rules 7-8] | Hard cut | Hit as the counter lands at about 18.5 s; **hero 2 at 18.5 s (31 %)** |
| 10 | 19.5-20.5 | 585-615 | 1.0 (30) | Proof 2 | SD-04 | Claim 2a, 3 words or fewer, with a semantic letter animation (9-30 f) [V:19NRDv rule 5] | Scale snap | Music low-passes into the breakdown |
| 11 | 20.5-21.5 | 615-645 | 1.0 (30) | Proof 2 | SD-04 | Claim 2b completes the line (a different scale from 2a) | Hard cut on the beat | Breakdown |
| 12 | 21.5-25.5 | 645-765 | 4.0 (120) | Proof 2 | SD-10 | Dashboard: chart lines draw left to right at a 4-8 f stagger; a 2-3 f pull-back snap mid-shot; slow Y-rotation recede [V:19NRDv shot 18] | Hard cut | Breakdown: low end and kicks kept, highs filtered |
| 13 | 25.5-27.0 | 765-810 | 1.5 (45) | Proof 2 | SD-13 | Cut-in on the KPI; the one value enlarged to at least 5 % H | Hard cut | None |
| 14 | 27.0-28.5 | 810-855 | 1.5 (45) | Proof 2 | SD-09 | System state shown by colour only (fail red, success teal), no labels [V:19NRDv rule 10] | Hard cut on the beat | None |
| 15 | 28.5-30.0 | 855-900 | 1.5 (45) | Proof 3 | SD-05 | Claim 3 types in per letter (1-2 f per character) | Hard cut on the beat | None |
| 16 | 30.0-35.0 | 900-1050 | 5.0 (150) | Proof 3 | SD-10 | Orbit take (long hold): push-in, then orbit steps of 9-12 f with motion blur every 1.0-1.5 s; each target turns grey to colour and a status pill slides in [V:19NRDv shot 19] | Hard cut | Orbit steps on 2-beat units (1.0 s); **hero 3 at 30.0 s (50 %)** |
| 17 | 35.0-36.5 | 1050-1095 | 1.5 (45) | Proof 3 | SD-17 | Payoff line or resolved state, fully still for at least 1.0 s | Hard cut on the beat | Build begins (high band rising) |
| 18 | 36.5-37.5 | 1095-1125 | 1.0 (30) | Proof 4 | SD-04 | Claim 4, 3 words or fewer | Hard cut on the beat | None |
| 19 | 37.5-38.2 | 1125-1146 | 0.7 (21) | Proof 4 | SD-11 | Anchored montage 1 of 3 (21 f) [V:15VhHR rules 6-7] | Hard cut (free) | None |
| 20 | 38.2-39.2 | 1146-1176 | 1.0 (30) | Proof 4 | SD-11 | Montage 2 of 3 (30 f) | Hard cut (free) | None |
| 21 | 39.2-40.5 | 1176-1215 | 1.3 (39) | Proof 4 | SD-11 | Montage 3 of 3 (39 f): the hero use case | Hard cut on the beat at 40.5 s | At least 15 dB dip for 0.3-0.5 s before 40.5 s |
| 22 | 40.5-43.5 | 1215-1305 | 3.0 (90) | Proof 4 | SD-10 | Payoff build with a camera beat every 0.8-1.5 s | Hard cut on the beat | Re-entry at 40.5 s; **hero 4 at 40.5 s (68 %)** |
| 23 | 43.5-46.5 | 1305-1395 | 3.0 (90) | Benefit | SD-05 | Positioning line; the wipe's motivating shape is pre-loaded about 1 s before it moves [V:19NRDv rule 11] | Shape-mask wipe: exit ease-in 7 f plus wipe ease-out 12 f (18-22 f total) | Whoosh on the wipe at 46.5 s |
| 24 | 46.5-49.5 | 1395-1485 | 3.0 (90) | Benefit | SD-05 | Unification line on the flipped (light) world; words ride in on the wipe's momentum | Hard cut on the beat | Build |
| 25 | 49.5-51.5 | 1485-1545 | 2.0 (60) | Climax | SD-14 | The many collapse into the one: objects orbit, implode into the logo in about 8 f at about 50.2 s, then a burst of 12 particles or fewer over 10 f and at least 30 f of calm [V:19NRDv rule 13] | Hard cut | Hit on the implosion; **hero 5 at 50.2 s (84 %)** |
| 26 | 51.5-53.5 | 1545-1605 | 2.0 (60) | Climax | SD-03 | Callback: the hook line returns; its last word swaps every 16, 13, then 11 f with growing size; the product word types per letter at a 2 f stagger, lands on the beat at 53.0 s and holds 15 f [V:19NRDv rule 14] | Hard cut | Build peaks at 53.0 s; **hero 6 at 53.0 s (88 %)** |
| 27 | 53.5-55.0 | 1605-1650 | 1.5 (45) | Resolution | SD-18 | Tagline, 4 words or fewer | Hard cut on the beat | None |
| 28 | 55.0-60.0 | 1650-1800 | 5.0 (150) | Resolution | SD-20 | Lockup: wordmark letters at a 2 f stagger toward the product word, hold 14 f, then the CTA (URL or QR) scales in over 8 f by about 56.0 s; still from about 56.3 s (3.7 s; bring a QR in by 55.5 s so it holds 4 s or more) [V:19NRDv rule 15] | End | Sting on the cut at 55.0 s; music fades with the picture to the last frame |

**Rhythm check [derived].** 28 shots · ASL 2.14 s · median 1.50 s (0.70 × ASL) · longest 5.0 s (8 % of runtime, 2.3 × ASL) · long holds of ≥ 2 × ASL: 2 · heroes at 5.0 s (8 %), 18.5 s (31 %), 30.0 s (50 %), 40.5 s (68 %), 50.2 s (84 %) and 53.0 s (88 %).

**Why it works.**
- **Night claim / day proof:** short claims on the beat and long proof shots with internal camera beats give Bumper's two-tempo pulse (ASL 2.14 s vs Bumper's 2.49 s; median 0.70 × ASL vs 0.71) [V:19NRDv].
- **The breather is musical, not visual:** a low-pass breakdown under blocks 2-3, where the eye has the most to read (ER-10) [V:19NRDv §12].
- **The finale escalates and then stops:** implosion, accelerating word swaps, then a 5.0 s lockup (crescendo → still, ER-13).
- **Fixes Bumper's flaws:** the 1-frame dip to black (none here; use a clean cut or a 2-4 f luma dip), the 6.3 s low-energy diagram (the longest proof shot here is 5.0 s with orbit steps every 1.0-1.5 s) and repeating one type grammar about 12 times (claims vary between slam, semantic letters and per-letter typing) [V:19NRDv avoid].

**Variant: brand-bookended montage (Wix grammar, ASL ≈1.6 s, about 37 shots).** Keep the windows, cut on section turns only (BS-01), use two anchored montages at 0.6-0.9 s ASL (one in the reveal-to-proof turn, one in block 3), close on a 3D collection shot of every output, and bookend the same sentence at 6.5 % FH [V:15VhHR rules 1, 6, 15, 17].

### PL-90E · 90 s VO-led explainer (2700 f)

**Use for:** a platform overview, a "what is X" explainer, an onboarding overview, a single-feature deep dive in a series. **Evidence:** second-level only. Superspace's captions (pain triad 0.16-9.28 s, "That's why we built Superspace" at 9.28 s, a benefit triad of about 3 s each at 20.7-30.2 s, features of 7-16 s each) [S:Superside]; Airtable's chapters (9-14 s) [S:Airtable]; narration at 150-170 wpm [S:playbook]; a vision line delivered slowest before a 4-7 s no-speech tail [S:Thomson Reuters] [S:playbook]. The picture micro-timings come from the references. **The stage windows are [inferred]** from those sources; Part 01 §2.3 has no VO row at 90 s.

| Stage | Window (s) | Frames | % |
|---|---|---|---|
| Hook + pain triad | 0.0-9.5 | 0-285 | 10.6 % |
| Reveal ("That's why we built X") | 9.5-20.5 | 285-615 | 12.2 % |
| Benefit triad | 20.5-30.0 | 615-900 | 10.6 % |
| Features (3 blocks: 14 / 12 / 10 s; each 14-17 % shorter, DU-U3) | 30.0-66.0 | 900-1980 | 40 % |
| Trust / proof | 66.0-71.5 | 1980-2145 | 6.1 % |
| Breather (trust visual + vision line) | 71.5-80.5 | 2145-2415 | 10 % |
| Climax (collection) | 80.5-82.5 | 2415-2475 | 2.2 % |
| Resolution (CTA 2.5 s + silent lockup 5.0 s) | 82.5-90.0 | 2475-2700 | 8.3 % |

| # | In-out (s) | Frames @30 | Dur s (f) | Stage | Token | Picture: content and in-shot events | Out | Audio / sync |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.0-1.5 | 0-45 | 1.5 (45) | Hook | SD-01 | Question title of 5 words or fewer on screen at f0; first VO line starts within 0.2 s [S:Superside] | Accelerating exit, hard cut | Bed plus VO; bed ducked 10-12 dB under the voice (P09 §16.10) |
| 2 | 1.5-3.5 | 45-105 | 2.0 (60) | Pain | SD-06 | Pain 1: one visual pain; caption at most 2 lines of 42 characters; an event at least every 1.5 s | Hard cut at the VO sentence end | VO |
| 3 | 3.5-6.0 | 105-180 | 2.5 (75) | Pain | SD-06 | Pain 2: a different treatment from pain 1 (scale or colour) | Hard cut at the VO sentence end | VO |
| 4 | 6.0-9.5 | 180-285 | 3.5 (105) | Pain | SD-06 | Pain 3, the worst case; ends in a release (empty plate, white or a hush) | Hard cut | VO pause 0.3-0.5 s before the cut |
| 5 | 9.5-11.5 | 285-345 | 2.0 (60) | Reveal | SD-08 | 'That's why we built X': the name lands on its spoken word; logo micro-stages of 0.3-0.6 s [S:Superside, product named at 9.28 s] | Hard cut | Music lift on the name; **hero 1 at 9.5 s (11 %)** |
| 6 | 11.5-16.5 | 345-495 | 5.0 (150) | Reveal | SD-10 | Product overview UI, wide; one region highlighted per VO clause (a highlight every 1.0-1.5 s); slow push 1.00 to 1.06 | Cut-in | VO |
| 7 | 16.5-18.5 | 495-555 | 2.0 (60) | Reveal | SD-06 | Positioning line (category plus audience) over the UI | Hard cut | VO |
| 8 | 18.5-20.5 | 555-615 | 2.0 (60) | Reveal | SD-09 | The promise shown as one UI state change | Hard cut | VO |
| 9 | 20.5-23.0 | 615-690 | 2.5 (75) | Benefits | SD-06 | Benefit 1: text plus icon | Hard cut | VO |
| 10 | 23.0-26.0 | 690-780 | 3.0 (90) | Benefits | SD-09 | Benefit 2 as a UI glimpse with one state change | Hard cut | SFX accent on the state change; **hero 2 at 23.0 s (26 %)** |
| 11 | 26.0-30.0 | 780-900 | 4.0 (120) | Benefits | SD-17 | Benefit 3 as a verified number: counter about 1 s expo-out, then fully still for at least 1.0 s | Hard cut | VO |
| 12 | 30.0-31.5 | 900-945 | 1.5 (45) | Feature 1 | SD-04 | Chapter label '01 / 03' plus the feature name | Hard cut | VO |
| 13 | 31.5-35.5 | 945-1065 | 4.0 (120) | Feature 1 | SD-10 | UI step: one cursor action, one highlighted region at a time | Cut-in | Soft UI clicks |
| 14 | 35.5-38.0 | 1065-1140 | 2.5 (75) | Feature 1 | SD-13 | Cut-in at 3-3.5x on the control that matters | Hard cut | VO |
| 15 | 38.0-44.0 | 1140-1320 | 6.0 (180) | Feature 1 | SD-10 | Result in context (the longest hold of the film): the outcome builds, one value is highlighted, then a slow push with a camera or UI beat every 1.0-1.5 s | Hard cut | SFX accent on the result; **hero 3 at 38.0 s (42 %)** |
| 16 | 44.0-45.5 | 1320-1365 | 1.5 (45) | Feature 2 | SD-04 | Chapter label '02 / 03' | Hard cut | VO |
| 17 | 45.5-48.5 | 1365-1455 | 3.0 (90) | Feature 2 | SD-10 | UI step | Cut-in | Soft UI clicks |
| 18 | 48.5-50.5 | 1455-1515 | 2.0 (60) | Feature 2 | SD-13 | Cut-in on the control that matters | Hard cut | VO |
| 19 | 50.5-56.0 | 1515-1680 | 5.5 (165) | Feature 2 | SD-10 | Result in context, with a beat every 1.0-1.5 s | Hard cut | SFX accent on the result; **hero 4 at 50.5 s (56 %)** |
| 20 | 56.0-57.5 | 1680-1725 | 1.5 (45) | Feature 3 | SD-04 | Chapter label '03 / 03' | Hard cut | VO |
| 21 | 57.5-59.5 | 1725-1785 | 2.0 (60) | Feature 3 | SD-10 | UI step | Hard cut | Soft UI clicks |
| 22 | 59.5-60.2 | 1785-1806 | 0.7 (21) | Feature 3 | SD-11 | Integrations montage 1 of 3 (21 f), anchored element fixed | Hard cut (free) | VO lists the integrations |
| 23 | 60.2-61.2 | 1806-1836 | 1.0 (30) | Feature 3 | SD-11 | Montage 2 of 3 (30 f) | Hard cut (free) | VO |
| 24 | 61.2-62.5 | 1836-1875 | 1.3 (39) | Feature 3 | SD-11 | Montage 3 of 3 (39 f) | Hard cut | VO |
| 25 | 62.5-66.0 | 1875-1980 | 3.5 (105) | Feature 3 | SD-10 | Result in context | Hard cut | VO |
| 26 | 66.0-69.5 | 1980-2085 | 3.5 (105) | Trust | SD-09 | Before/after compare; the flip happens at about 67.0 s | Hard cut | SFX accent on the flip; **hero 5 at 67.0 s (74 %)** |
| 27 | 69.5-71.5 | 2085-2145 | 2.0 (60) | Trust | SD-17 | Verified stat, fully still for at least 1.0 s | Hard cut | VO |
| 28 | 71.5-75.5 | 2145-2265 | 4.0 (120) | Breather | SD-16 | Trust or security visual, low motion (at most 1/10 of the peaks) | Slow dissolve 8-12 f | Bed only under a VO pause, then VO |
| 29 | 75.5-80.5 | 2265-2415 | 5.0 (150) | Breather | SD-16 | Vision line: the slowest VO delivery of the film, decelerating push [S:Thomson Reuters] | Hard cut | VO |
| 30 | 80.5-82.5 | 2415-2475 | 2.0 (60) | Climax | SD-14 | Collection: the three features collapse into the product mark | Hard cut | Riser into a hit at 80.5 s; **hero 6 at 80.5 s (89 %)** |
| 31 | 82.5-85.0 | 2475-2550 | 2.5 (75) | Resolution | SD-19 | CTA card with the URL as it is spoken; VO ends by about 84.5 s | Hard cut | VO |
| 32 | 85.0-90.0 | 2550-2700 | 5.0 (150) | Resolution | SD-20 | Logo lockup with no narration (testimonial and explainer tails run 4-7 s [S:playbook]); still from about 85.5 s (4.5 s) | End | Music resolves on the logo; tail to the last frame |

**Rhythm check [derived].** 32 shots · ASL 2.81 s · median 2.50 s (0.89 × ASL) · longest 6.0 s (7 % of runtime, 2.1 × ASL) · long holds of ≥ 2 × ASL: 1 · heroes at 9.5 s (11 %), 23.0 s (26 %), 38.0 s (42 %), 50.5 s (56 %), 67.0 s (74 %) and 80.5 s (89 %).

**Why it works.**
- **One caption cue, one shot.** Shots run 2.0-3.5 s for most VO lines, the natural cut cadence of narrated SaaS films (BS-11) [S:playbook].
- **An idea every 11-13 s**, inside the 7-14 s band of narrated SaaS [S:playbook].
- **Same skew as the references.** The median sits at 0.89 × ASL; the longest hold is a feature result, not a talking-head text card (DU-R4).
- **Drama from the picture.** The bed stays flat under the VO (the ER-10 exception, [V:1Hcg3X §12]), so each hero is loaded by a 0.3-0.5 s pause in the VO instead of a music gap [inferred].
- **Narration budget:** about 84 s of speech at 150-170 wpm is 210-240 words (§17.3).

**Variants.**
- **60 s:** drop feature 3 and the benefit triad; keep the pain triad, reveal, two features, trust, CTA and lockup [S:playbook Recipe 1] [inferred].
- **Single-feature deep dive (≈80 s):** replace the benefit triad and features with set-up → result → delivery channels → trust → benefit triplet, as in the TradeLens pattern [S:playbook §2.C].

### PL-90L · 90 s music-led launch film (2700 f)

**Use for:** a flagship launch film, a keynote opener, the hero film of a launch page. **Evidence:** kivi's measured structure (77.78 s, 33 shots, ASL 2.36 s; demo blocks 14.75 → 11.03 → 6.69 s; speech-led first half, eighth-note grid in the back half) [V:1-6l8S §3, §11], Bumper's climax mechanics [V:19NRDv]. Part 01 §2.3's 90 s windows, used unchanged; that row is extrapolated from kivi and Bumper [inferred].

| Stage | Window (s) | Frames | % |
|---|---|---|---|
| Hook | 0.0-3.0 | 0-90 | 3.3 % |
| Setup | 3.0-7.0 | 90-210 | 4.4 % |
| Reveal | 7.0-13.0 | 210-390 | 6.7 % |
| Proof (5 blocks: 12.5 / 11 / 10 / 9 / 7.5 s) | 13.0-63.0 | 390-1890 | 55.6 % |
| Benefit / breather | 63.0-72.0 | 1890-2160 | 10 % |
| Climax (accelerating recap + collection) | 72.0-80.0 | 2160-2400 | 8.9 % |
| Resolution (tagline 2.0 + wordmark 1.2 + symbol and CTA 3.3 + URL and fade 3.5 s) | 80.0-90.0 | 2400-2700 | 11.1 % |

| # | In-out (s) | Frames @30 | Dur s (f) | Stage | Token | Picture: content and in-shot events | Out | Audio / sync |
|---|---|---|---|---|---|---|---|---|
| 1 | 0.0-1.5 | 0-45 | 1.5 (45) | Hook | SD-01 | Pain question of 2 words, live-typed: first word at f3, second +7 f, the line re-centres over 13 f, then drifts 3-4 % W/s [V:1-6l8S t=0.00-1.55s] | Colour wash wipe in 7 f | Soft plucks, no transients |
| 2 | 1.5-3.0 | 45-90 | 1.5 (45) | Hook | SD-04 | One-word answer inside the product's listening halo (a product visual, not a plain card; the field turns saturated) [V:1-6l8S shot 2] | Word-swap cut | None |
| 3 | 3.0-4.5 | 90-135 | 1.5 (45) | Setup | SD-04 | The alternative in 3 words or fewer; the field fades back toward white | Blur dissolve about 8 f, then a 10 f empty plate | None |
| 4 | 4.5-7.0 | 135-210 | 2.5 (75) | Setup | SD-04 | 'Meet' on pure white: rises 12 px with blur over 10 f, holds about 1.2 s, blur-out 4 f, then 3-4 white frames [V:1-6l8S shot 4] | White breath frames, cut | Near-silence of 0.15-0.3 s at about 6.6-6.9 s |
| 5 | 7.0-9.0 | 210-270 | 2.0 (60) | Reveal | SD-08 | Wordmark materialises from silver to brand colour over about 40 f with a left-to-right tonal sweep; accelerating push, then expo punch +18 % in the last 3 f [V:1-6l8S rule 10] | Punch, 1 white frame, cut on the pre-drop transient | 1 s tonal riser under the wordmark |
| 6 | 9.0-10.5 | 270-315 | 1.5 (45) | Reveal | SD-14 | The core-mechanic object (record pill, prompt button) bursts: echo rings fill the frame in 4 f; slow push x1.27 over 1.3 s [V:1-6l8S shot 6] | Melts into the first UI | Full-band drop at 9.25 s, about 3 f after the frame is full [V:1-6l8S t=8.03-8.28s]; **hero 1 at 9.0 s (10 %)** |
| 7 | 10.5-13.0 | 315-390 | 2.5 (75) | Reveal | SD-09 | First before/after in the UI: raw input dimmed, polished output streams at machine pace (about 2 f per word) [V:1-6l8S rule 6] | Seamless card relayout | Rhythmic pulses plus in-world voice |
| 8 | 13.0-14.5 | 390-435 | 1.5 (45) | Demo 1 | SD-05 | Demo title card: 6 words or fewer, two-tone, live-append build (3-8 f word stagger) [V:1-6l8S rules 1-2] | Icon punch +33 % in 3 f, hard cut on an onset | None |
| 9 | 14.5-19.5 | 435-585 | 5.0 (150) | Demo 1 | SD-10 | Input card over a B&W plate that blooms to colour over 22-42 f as the voice starts; words stream at the voice's pace (4-7 words/s) [V:1-6l8S rules 6, 8] | Continuity hard cut on the same plate, reframed | In-world voice; the cut waits for the sentence to end |
| 10 | 19.5-22.0 | 585-660 | 2.5 (75) | Demo 1 | SD-09 | Output UI: the empty card holds 8-9 f, then content cascades in reading order (3-4 f stagger, about 20 f total) [V:1-6l8S rule 7] | Hard cut | Tick on the cascade start at 19.5 s; **hero 2 at 19.5 s (22 %)** |
| 11 | 22.0-25.5 | 660-765 | 3.5 (105) | Demo 1 | SD-13 | Detail: the corrected word or value highlighted for about 5 f, then held [V:1-6l8S rule 12] | Light bloom 4-7 f | None |
| 12 | 25.5-27.0 | 765-810 | 1.5 (45) | Demo 2 | SD-05 | Demo title card (a different scale or colour field from demo 1) | Whip-left exit 4-6 f | None |
| 13 | 27.0-32.5 | 810-975 | 5.5 (165) | Demo 2 | SD-10 | Input card (the longest hold of the film); stream at the voice's pace | Continuity hard cut | In-world voice |
| 14 | 32.5-35.5 | 975-1065 | 3.0 (90) | Demo 2 | SD-09 | Output UI resolves (blur to sharp over about 20 f) | Hard cut | Accent at 32.5 s; **hero 3 at 32.5 s (36 %)** |
| 15 | 35.5-36.5 | 1065-1095 | 1.0 (30) | Demo 2 | SD-15 | Bridge: ink or light bloom grows from the result over about 20 f and overexposes to white [V:1-6l8S shot 20] | White, cut | None |
| 16 | 36.5-38.0 | 1095-1140 | 1.5 (45) | Demo 3 | SD-05 | Demo title card | Hard cut | None |
| 17 | 38.0-40.5 | 1140-1215 | 2.5 (75) | Demo 3 | SD-12 | Integrations desktop: cut-in, truck about 40 % W over about 0.85 s, cursor hover (tile lifts about 5 px), click at about 39.8 s; a white bloom fills the frame in about 6 f [V:1-6l8S shots 17-18] | Click-bloom to white | Click on the press; **hero 4 at 40.0 s (44 %)** |
| 18 | 40.5-44.0 | 1215-1320 | 3.5 (105) | Demo 3 | SD-10 | Input card | Continuity hard cut | In-world voice |
| 19 | 44.0-46.5 | 1320-1395 | 2.5 (75) | Demo 3 | SD-09 | Output UI | Fade to white | The eighth-note grid becomes audible: the edit switches to music-led at 46.5 s (52 %) |
| 20 | 46.5-48.0 | 1395-1440 | 1.5 (45) | Demo 4 | SD-05 | Demo title card | Text split plus 3 f dissolve, on the beat | Grid |
| 21 | 48.0-51.0 | 1440-1530 | 3.0 (90) | Demo 4 | SD-10 | Input card; colour bloom about 1.4 s | Hard cut on the beat | Grid |
| 22 | 51.0-53.5 | 1530-1605 | 2.5 (75) | Demo 4 | SD-09 | Output UI: tokens type in, about one every 3-4 f | Hard cut on the beat | Grid |
| 23 | 53.5-55.5 | 1605-1665 | 2.0 (60) | Demo 4 | SD-13 | Output detail | Radial bloom 3-4 f | Grid |
| 24 | 55.5-57.0 | 1665-1710 | 1.5 (45) | Demo 5 | SD-05 | Demo title card; second phrase +8 f | Whip-left 5 f, 1 white frame, cut on the beat | Grid |
| 25 | 57.0-59.0 | 1710-1770 | 2.0 (60) | Demo 5 | SD-10 | Input card | Hard cut on the beat | Grid |
| 26 | 59.0-61.5 | 1770-1845 | 2.5 (75) | Demo 5 | SD-09 | Output UI: cells cascade by column with a 2-3 f lag (about 13 f for 5x5) [V:1-6l8S rule 7] | Hard cut on the beat | Grid; **hero 5 at 59.0 s (66 %)** |
| 27 | 61.5-63.0 | 1845-1890 | 1.5 (45) | Demo 5 | SD-13 | Punch-in on the filled result | Fog or white dissolve | Grid |
| 28 | 63.0-66.0 | 1890-1980 | 3.0 (90) | Breather | SD-05 | Positioning line 1, two-tone | Hard swap with 2 white frames | Pad or breakdown about 6 dB down |
| 29 | 66.0-68.5 | 1980-2055 | 2.5 (75) | Breather | SD-05 | Positioning line 2 with a UI tie-in (product chips) | Fade to the product field | Pad |
| 30 | 68.5-72.0 | 2055-2160 | 3.5 (105) | Breather | SD-16 | Calm visual: the product's listening state (halo or orb); motion at most 1/10 of the peaks | Dissolve to white | Pad; build starts at about 71 s |
| 31 | 72.0-74.0 | 2160-2220 | 2.0 (60) | Climax | SD-09 | Recap output 1 | Hard cut on the beat | Build |
| 32 | 74.0-75.5 | 2220-2265 | 1.5 (45) | Climax | SD-09 | Recap output 2 (-25 %) | Hard cut on the beat | Build |
| 33 | 75.5-76.5 | 2265-2295 | 1.0 (30) | Climax | SD-11 | Recap output 3 (-33 %) | Hard cut on the beat | Build |
| 34 | 76.5-77.2 | 2295-2316 | 0.7 (21) | Climax | SD-11 | Recap output 4 (21 f, -30 %) | Hard cut (free) | Build |
| 35 | 77.2-77.7 | 2316-2331 | 0.5 (15) | Climax | SD-03 | Recap output 5 (15 f, -29 %) | Hard cut | Build peaks |
| 36 | 77.7-80.0 | 2331-2400 | 2.3 (69) | Climax | SD-14 | Collection: every output collapses into the product mark; implosion about 8 f at about 78.5 s, then 30 f or more of calm | Hard cut on the beat | Hit on the implosion; **hero 6 at 78.5 s (87 %)** |
| 37 | 80.0-82.0 | 2400-2460 | 2.0 (60) | Resolution | SD-18 | Bookend tagline: the hook's colour field returns with the same live-append build; steady push +7 %, then expo punch +18 % in the last 8 f [V:1-6l8S shot 30] | Punch, hard cut on the beat | Hit at 82.0 s |
| 38 | 82.0-83.2 | 2460-2496 | 1.2 (36) | Resolution | SD-20 | Wordmark; the punch's momentum carries into a decelerating push (+29 % over the hold) [V:1-6l8S shot 31] | Crossfade 9-10 f each way | None; **hero 7 at 82.0 s (91 %)** |
| 39 | 83.2-86.5 | 2496-2595 | 3.3 (99) | Resolution | SD-20 | Symbol plus CTA line; slow push x1.15 | Hard cut | Resolve begins |
| 40 | 86.5-90.0 | 2595-2700 | 3.5 (105) | Resolution | SD-20 | URL near-still (push of 3 % or less) 86.5-88.6 s; fade to white over about 14 f; white tail of 0.5 s or less | End | Music fades from about -15 to -49 dB with the picture, to the last frame [V:1-6l8S t=76-77.8s] |

**Rhythm check [derived].** 40 shots · ASL 2.25 s · median 2.00 s (0.89 × ASL) · longest 5.5 s (6 % of runtime, 2.4 × ASL) · long holds of ≥ 2 × ASL: 2 · heroes at 9.0 s (10 %), 19.5 s (22 %), 32.5 s (36 %), 40.0 s (44 %), 59.0 s (66 %), 78.5 s (87 %) and 82.0 s (91 %).

**Why it works.**
- **"Say it, see it" five times.** Each block is title → input → output, and the viewer learns the grammar once, so each block can be shorter than the last: 12.5 → 11 → 10 → 9 → 7.5 s; the last three shrink 10 % and 17 %, inside DU-U3's 10-40 % (TS2, §15.16 SaaS 4). This is a design choice [inferred]: kivi's five demo blocks actually run 7.48 → 8.44 → 14.75 → 11.03 → 6.69 s, so only its last three shrink [V:1-6l8S §3]. A monotonic shrink from block 1 is untested.
- **The driver switches at 52 %,** inside the 40-67 % band (ER-17). kivi's back half raises perceived pace without making shots shorter [V:1-6l8S §4 WHY 25-29].
- **The climax is a measured accelerando:** recap units of 2.0 → 1.5 → 1.0 → 0.7 → 0.5 s, each 25-33 % shorter (ER-12), then a collection shot, then the bookend tagline punches into the wordmark (ER-13) [V:1-6l8S t=69.62-71.10s].
- **Seven heroes, about 13 s apart**, the last at 91 % (ER-19).

**Fixes kivi's flaws:**
- the 5-card text run over an ambient bed (here the breather alternates text, text + UI and a visual);
- a signature device applied only sometimes (here the B&W → colour bloom is used on every input card, or on none);
- ending on a bare URL (here the URL follows the wordmark and symbol + CTA lockup) [V:1-6l8S avoid].

**Variant: 3D technology film (Cinematic Product Launch, no direct reference).** Keep the windows but run ASL 2.5-3.5 s (about 30 shots), make each proof block one 4-8 s hero shot plus 1-2 cut-ins, cut on bar lines and give the lockup ≥ 2.5 s of still [inferred from §15.2's last row].

## 17.5 Cutdowns, versions and conversions

1. **Cut down by removing whole blocks, never by trimming every shot [inferred from ER-04].** ASL is the film's temperament; a 60 s film cut to 30 s by shaving each shot becomes a different, more frantic film. From PL-60, a 30 s cutdown keeps the hook, reveal, the strongest proof block, the climax and the lockup, then re-times them to PL-30's windows. [S:playbook]'s reel cut of its explainer recipe keeps the hook, reveal, benefit, proof stat and CTA in the same way.
2. **Ship a hero film plus cutdowns.** One 16:9 hero film (site, launch page, X) followed by 9:16, 1:1 and 4:5 cuts, in buckets of under 10 s, 10-30 s and 30-60 s [W:motion.so]. ElevenLabs' vertical cuts exist as YouTube Shorts [E]; that they are adaptations of the 16:9 master, not native vertical edits, is [E, inferred there].
3. **Aspect changes keep the times; text reflows.** Keep text inside x 120-840, y 270-1210 @1920p (9:16), x 135-945 (1:1) or x 88-992 (4:5) [N]. A statement that breaks onto more lines moves up a reading tier (statement → message), so add 0.3-0.5 s to that shot and take it from the neighbouring proof shot [inferred].
4. **A/B versions change shot 1 only** and keep it inside the 1.2-2.4 s hook window, so the rest of the grid stays valid [S:playbook].
5. **24 fps delivery.** Seconds are unchanged; the 120 BPM grid is 12 f per beat; 21/30/39 f montage holds become 17/24/31 f; never convert a finished 30 fps cut by dropping or duplicating frames (§15.11).
6. **A different track.** Re-snap grid cuts with BS-04 (t = t0 + n × 60 / BPM, then round and lead by 0-2 f); free cuts stay where they are; no section boundary moves more than one beat.
7. **Template engines.** Write each scene's `durationInFrames` as its plan length plus its share of any transition overlap, because a transition series runs for the sum of the scenes minus the transitions [N] (§15.11).

## 17.6 Duration principles by class

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

## 17.7 Do / Don't (durations)

| Do | Don't | Why |
|---|---|---|
| Give a 5-word claim 1.5 s and a UI result 2.5 s | Give every shot 2.5 s | The job sets the time (DU-U1) |
| Hand a click's consequence to the next shot through a morph | Hold one 4 s shot for cursor, click, wait and result | Keeps the action shot under 2 s with no dead wait [V:126cpH] |
| Hold the result still ≥ 1.0 s before the cut | Cut as the number lands | The payoff is what the viewer must remember (ER-16) |
| Lengthen a shot to the next beat | Clip 4 f off a statement to hit the kick | Reading beats sync (DU-R5) |
| Make the 6 s shot the product tour | Make the 6 s shot a paragraph card | Long shots are for watching (DU-R4) |
| Shrink each demo block by 10-30 % | Keep all demo blocks the same length | Learned grammar needs less time [V:1-6l8S] |
| Cut a 30 s version by dropping two blocks | Cut it by trimming every shot by 50 % | ASL is temperament (§17.5) |
| Generate an 8 s Veo clip for a 6 s take | Stretch a 4 s clip to 6 s | Handles at both ends (§17.2 H) |
| End on 2.2 s of still logo with the music resolving on it | End on 0.8 s of logo, or after the music has stopped | Registration and closure (SD-20, BS-10) |

## 17.8 Duration QC gate (run on the storyboard, then on the locked cut)

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

## Appendix A. Where the references overrule generic advice (all rulings in Part 08)

| # | Topic | Generic advice | What the references do | Ruling | Why |
|---|---|---|---|---|---|
| A1 | Average shot length | ElevenLabs spots: 10-14 shots of 3-4 s; titles 1.5-2.5 s, UI demos 4-6 s [E] (inferred there) | ASL 1.58-3.00 s; claims 0.9-2.3 s; UI 1.8-6.3 s (§0.1) | **References win** | Measured against guessed |
| A2 | Visual change cadence | Some change every 1.5-3 s, a new scene every 2-4 s [N] (unverified there) | Scene change median 1.9 s; an event every 0.5-1.5 s (ER-21) | **References win**; [N] is the slow limit for VO-led films | Perceived pace comes from the event interval (§0.2) |
| A3 | Minimum scene length | ≥ 1.8 s and ≥ 25 f [N] | Recognition shots of 0.33-1.0 s in 5 references with no flagged problem | **References win for recognition shots;** [N] stands for anything read (§17.1) | Nothing in a recognition shot needs reading |
| A4 | Statement read time | Hold ≥ max(1.0 s, 0.33 s × words + 0.4 s) after landing [N] | 5-word statements held 0.6-1.1 s after landing [V:1-6l8S]; 0.6-1.6 s legible [V:19NRDv] | **References win** for 4-6 words on an empty frame (Part 07 statement tier); [N] stands for messages and busy plates | A lone card is read during its build |
| A5 | Punch words | 1.0 s and 25 f floors [N] | 10-16 f in rhythmic runs [V:1ccYWJ] [V:19NRDv] | **References win** for 1-2 words in runs of 3 or more | The pattern is read, not each card |
| A6 | Payoff and minimum text event | Netflix minimum event 25 f [N] | The references' flaws are payoffs readable for 0.4 s and 2 f | **They agree** (ER-16) | — |
| A7 | Cutting on the beat | "Hard cuts on the beat" [E] (inferred there) | 3/8 lock cuts to the grid; 8/8 sync section turns and heroes | **References win:** sync the structure always, the cuts only in music-led films (BS-01) | UI timing is product truth |
| A8 | Picture vs. sound offset | Detectability +45 ms sound-early, −125 ms sound-late (ITU-R BT.1359) [P] | Picture leads by 0-3 f (Bumper, kivi, HubSpot) | **They agree;** this is a perceptual limit, so the generic data would win if they disagreed (BS-02) | — |
| A9 | When the product appears in a 30 s film | Sample storyboard: reveal at 14-24 s, lockup at 24-30 s [W:motion.so] | Product UI by 8 s in 6/6; the reveal stage at a median of 13.8 % of runtime (Part 01 §2.1) | **References win** for the reveal; the 6 s lockup (20 %) is just above the references' 7.9-17.5 % | Attention is front-loaded: 74 % of a campaign's value lands in the first 10 s [N] |
| A10 | On-screen text cadence | Change text every 2.5-3.5 s [S:playbook] | Kinetic sections change cards every 0.33-2.2 s (§15.4) | **Both, by driver:** [S] for VO-led films, the references for kinetic and music-led films | Caption cadence follows speech; kinetic cadence follows the beat |
| A11 | Flashes | ≤ 3 flashes per second [N] (WCAG 2.3.1) | One flash moment of 3 + 2 f in one film [V:1Hcg3X] | **They agree;** a safety limit, so the generic rule wins outright (ER-A16) | — |
| A12 | Feature length in narrated films | Idea every 7-14 s [S:playbook] | Demo blocks 6.7-14.75 s [V:1-6l8S]; feature blocks 4.4-11.3 s [V:19NRDv] | **They agree** | — |
| A13 | End card hold | 75 f (2.5 s), final hit on the logo frame [E] | 2.2-5.7 s lockup shots; the sting on the logo (§15.6, BS-10) | **They agree** | — |
| A14 | Typical SaaS ASL vs. film | Hollywood ASL about 4 s (1985-2005) [N] | ≈2 s | **Not a conflict:** a different medium; use the references | — |

## Appendix B. Evidence strength for this part

| Area | Strength | Basis |
|---|---|---|
| ASL bands, median skew, two-tempo pulse, event interval | **Strong** | 8 references, corrected shot lists (§0.1) |
| Accelerando → still, hero spacing, breather, section sync | **Strong** | 7-8 references each (§15.5-15.9) |
| Beat-sync percentages and lead | **Medium** | 3 beat-locked references; onsets fitted from spectrograms, so ±1-2 f |
| Shot tokens SD-01 … SD-20 | **Strong to medium** | Each from 3 or more references, except SD-06 (text-only [S], second-level) and SD-15 (bridges vary in kind) |
| 15, 30, 45, 60 s plans | **Medium** | Anchored on measured references of 18, 30, 35, 36, 44, 54 and 67 s; the shot lists are designs, not measurements |
| 5 s and 10 s plans | **Weak** | No reference under 17.97 s [inferred] |
| 90 s VO explainer | **Weak** | Structure from [S] caption timings only; none of the eight references is a confirmed VO-led SaaS film (Solar's VO is unconfirmed) |
| 90 s launch film | **Medium-weak** | Extrapolated from kivi (78 s) and Bumper (67 s) |
| Cinematic Product Launch / 3D Technology Film rhythm | **Weak** | No direct reference (§15.2 last row) |
| 9:16 timing | **Weak** | One vertical reference (Chowdeck), measured through a crop of a screen capture |
| 120 BPM planning grid | **Design choice** | Not observed; the references measure 64.6-127 BPM (83.4-127 excluding Solar's half-time reading; median ≈98) |
| AI-clip mapping (§17.2 H) | **Inferred** | From [P] clip lengths; untested |

**Measurement caveats.**
- Chowdeck was measured through a crop of an After Effects screen capture, animated on twos [V:126cpH].
- Wix, HubSpot and Solar carry duplicate-frame judder from frame-rate conversion, which adds ±1 f of uncertainty to their cut times [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X].
- NOSTRA is delivered inside a player frame [V:1i2L14].
- Lottieicon is sub-HD and compression-blocked [V:1ccYWJ].

---

## Audit (adversarial pass, 2026-10-08)

Method: I re-opened all eight per-video teardowns (Editing Rhythm, Sound Design, Shot-by-Shot, Transferable Rules, What to Avoid and Verification sections) and the cited web briefs, then checked every census value, rule citation and recomputed median against them. Census arithmetic (ASL, median, median ÷ ASL, shots/min, longest % runtime, × ASL, hero totals) was recomputed from the teardowns and matches, except where noted below.

**Fixes made (22)**
1. §0.1 census: Solar's "≈129 half-time" tagged [inferred there]; the teardown measures 64.6 BPM only.
2. §0.1 census: pooled runtime corrected 361.95 → 362.02 s (sum of the 8 runtimes); the pooled ASL of 2.06 s is unchanged.
3. §0.1 census and BS-06: median tempo corrected ≈100 → ≈98 (median of 64.6, 83.4, 86, 95.7, 100, 112.3, 112.3, 127). BS-06's range "83-129" corrected to the measured 64.6-127.
4. §0.2 point 2: calm/premium ASL band 2.4-3.0 → 2.36-3.0 s (kivi is 2.36).
5. §0.2 point 8, ER-12 table, §15.16 SaaS 4, DU-U3, QC 17.8 #6 and PL-90L "Why it works": kivi's demo blocks only shrink over the **last three** (14.75 → 11.03 → 6.69 s); demos 1-2 are 7.48 and 8.44 s [V:1-6l8S §3]. The earlier text implied a monotonic shrink. DU-U3 was reclassified from U to S (2 references), its "6-40 %" range corrected to the measured 0 % / −23 % to −39 % steps, and PL-90L's 12.5 → 8.5 s ladder tagged as a design choice [inferred].
6. §0.2 point 9 and §15.9: the "mean spacing" column is runtime ÷ hero count; relabelled, and the range given as measured (8.8-19.4 s) [derived].
7. §0.2 point 10: "one breather in every film of 30 s or more" was false for Solar (flat σ 1.7 dB bed, no low-motion section). Now 6 of 7, with Solar named as the exception and the per-film evidence cited.
8. §15.2: the quoted phrase "full 3D/CGI hero treatment" [W:showreel] does not appear in the source. Replaced with what the catalogue actually lists (hardware hero film entries, a 40-entry 3D/CGI category) and stated that the row's numbers are [inferred].
9. ER-07: added the teardowns' own thresholds (more than about 4, 4+, more than 4-5) so the ≤ 3 rule shows it is the strictest common value.
10. §15.4 table: Solar's "0.5 / 0.5 s" montage values are in-shot state changes inside one corrected scene, not shots; now labelled as such.
11. §15.4 table: the breather's "about −6 dB" is NOSTRA's recommendation, not a measurement. Tagged [inferred], with the measured breakdown depths added (about 7-17 dB under the full mix in HubSpot and Wix).
12. ER-11: the product-first range "9-26 %" was wrong (Bumper 3.62 s is 5 %, Wix 8 %); corrected to 5-26 % with each percentage shown. "All four films that have one" listed three, and the fourth (HubSpot) is the exception; reworded to "three of the four".
13. ER-12 table: Bumper's swap ladder now includes the final 14 f interval to PRO (16, 15, 13, 11, then 14 f) [V:19NRDv §5.12].
14. §15.6 silence gap: HubSpot's post-crest gap is ≈350 ms (10.60-10.95 s), not 300 ms.
15. §15.6 breather row and BS-09: Bumper's low-pass breakdown is 24-32 s (the build starts at 32 s), not 24-38 s; the earlier text contradicted itself.
16. BS-06: the "60-70 BPM felt as 120-130 half-time" style rule now marks the half-time reading as inferred in the teardown.
17. BS-11: "up to about 100 ms early reads as in sync" is the [P] brief's own inference; tagged, and the sourced Netflix tolerance (1-2 f either side) added.
18. ER-23: Bumper's motion mean of 1.82 belongs to the whole uptime section (3.9 s + 6.3 s shots), not the 6.3 s shot alone; reworded with the teardown's own flaw wording.
19. ER-S10: "cut to the music" for the Figma recap is [inferred] in [S:Figma]; tagged.
20. SD-01: NOSTRA's "1.43 s" hook is two micro-shots (0.70 + 0.73 s); now stated.
21. SD-20: "Chowdeck 1.4 s still (cut by the platform)" — nothing in the teardown says the platform cut it. Replaced with the measured 1.77 s shot and 1.4 s hold.
22. §17.5 rule 2: "ElevenLabs' vertical versions are adaptations of the 16:9 master" is [inferred] in [E]; tagged, keeping the sourced fact (vertical cuts exist as Shorts).

**Coverage added (2, counted in the fixes above as separate items 23-24)**
23. §15.8: premium-vs-amateur criteria for the edit driver (measured sync rate must match the chosen driver), citing the two teardowns that flag "assuming beat sync".
24. §15.10 ER-23a: premium-vs-amateur criteria for transition density (0-2 effect transitions, motion-motivated changes, no plug-in presets: Lottieicon 0 of 24), citing the strobe-pan and dip-to-black flaws.

Total changes: **24** (22 corrections or tags, 2 coverage additions).

**Checked and left unchanged.** All 22 rows of the §0.3 defaults card; the eight §15.7.1 sync policies and percentages; every rule number cited from the teardowns' Transferable Rules and Avoid lists (kivi 1-13, Chowdeck 1-15, Wix 1-17, Bumper 1-17, HubSpot 1-15, Solar 1-18, Lottieicon 1-16, NOSTRA 1-17); Wix's 21 → 29 → 38 f holds (confirmed in its Verification row 5); Bumper's 11/18 grid hits, breath frames and 4.6 s QR still; the [N], [P], [E] and [S] numbers (Hollywood ASL, 1.7 s dwell, 74 % in 10 s, Netflix 25 f, BT.1359, Veo 4/6/8 s, Omni Flash 10 s, [E] 39-51 s and 10-14 shots, Superspace 2.4-3.5 s captions, 150-170 wpm, 4-7 s tails, Airtable 9-14 s chapters, Figma 57.7 scenes/min). No frame-level claim rests on a text-only source; the only text-sourced timings are second-level caption and chapter times, already declared in §0.

**Remaining known gaps**
- The 5 s and 10 s plans, the 90 s VO explainer and the Cinematic / 3D row have no frame-measured reference; they stay [inferred] or second-level [S].
- 9:16 timing rests on one vertical reference (Chowdeck), measured through a crop of an After Effects screen capture animated on twos.
- Beat-sync percentages depend on onsets fitted from spectrograms (±1-2 f); Wix, HubSpot and Solar add ±1 f of frame-rate-conversion judder.
- No reference is a confirmed narrated SaaS film (Solar's and NOSTRA's VO are unconfirmed), so the VO-led rules (BS-11, SD-06, PL-90E) rest on [S] caption timings.
- Part 01 §2.1/§2.3 values (product-first times, stage windows, the "all boundaries but one on the 0.5 s grid" claim in BS-07) were not re-verified here; Part 01 is outside this audit's evidence set.
- The 120 BPM planning grid and the per-plan micro-timings are designs, not observations; they need a test render against a real track.
- Breather depth (how many dB the music drops) is measured in only two references; "≥ 6 dB" is a floor, not a calibrated target.
