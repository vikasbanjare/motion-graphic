# Master SaaS Motion Design System, Part 03
## Master §5 Motion Principles · §18 Recommended Animation Speeds · §19 Ease & Acceleration Principles · Phase-3 Motion-Language Library

Draft v1, 2026-10-08. Built from the frame-level teardowns of the user's eight reference films, plus text-only research. Every timing in this part comes from per-frame measurement in those teardowns, from a curve I fitted to their per-frame series (marked "(fitted)"), or from a sourced design-system token. Anything else is marked [inferred]. A senior motion designer, an editor or an AI video system should be able to set every keyframe from this part without guessing.

Scope. This part covers *how things move*: principles, ease curves, speeds, and the full library of motion patterns. Camera moves, transitions, typography specs, UI rules and sound each get their own part. They appear here only where they set a speed or an ease.

---

## 0. How to read this part

### 0.1 Units and tags

**Units**
- **f**: frames at 30 fps. 1 f = 33.3 ms, 30 f = 1 s. Speeds for 24 and 60 fps are in §18.12.
- **% W / % H**: percent of frame width / height. **px @1080p** is a 1920×1080 frame; **px @1920p** is a 1080×1920 (9:16) frame.
- **"% of travel in frame 1"**: the share of a move's total distance covered between its first and second frame. It is the simplest field measure of how "front-loaded" an ease is.
- **r (decay ratio)**: in an exponential ease-out, each frame's step is r × the previous step. **g (growth ratio)**: in an exponential ease-in, each frame's step is g × the previous step.

**Evidence tags** (same as Parts 01 and 02)

| Tag | Source | What it may support here |
|---|---|---|
| `[V:<id6> t=..s]` | Frame-level teardowns of the user's 8 reference films | Everything, including frame timing. Strongest evidence. |
| `(fitted)` | My least-squares cubic-bezier fit to a measured per-frame series from a `[V]` teardown | Curve shapes. The RMSE is given as % of the move's travel. Method and data: Appendix A. |
| `[N]` | Motion-numbers brief: Material 3, Carbon, Apple, Remotion tokens; WCAG; Netflix/BBC reading rates | Generic numeric norms |
| `[E]` | ElevenLabs style brief | Brand rules and open-source orb/waveform code are sourced. Its motion timings are its author's inference. |
| `[S:<brand>]`, `[S:playbook]` | Superside text research (20 SaaS videos) | Style *intent* only. No frame timing (only Figma's cut rate and a few caption tracks were measured). |
| `[P]` | Voice and footage pipeline brief | Veo/Flow and audio-sync facts |
| `[W:motion.so]`, `[W:showreel.design]`, `[W:raivcoo]` | Inspiration-site catalogues, text only | Naming, intent, style labels. Never timing. |
| `[inferred]` | My synthesis | Not directly observed or sourced |

**Rule IDs.** MP = motion principles (§5), EA = ease and acceleration (§19), SP = speeds (§18), ML = motion-language library entries. Suffixes: U = universal, S = style-specific, X = experimental, A = avoid, SaaS = especially good for SaaS. Use the IDs in prompts and in the QC gate.

**Confirmation rule.** "Universal" requires the pattern in at least 3 of the 8 references, measured, with no reference contradicting it. "n/8" counts references that show the pattern. Single-reference observations are filed as style-specific or experimental, never universal.

**Conflict policy.** Where the user's references disagree with generic advice ([N], [E], [S], [W]), **the references win**. Each case is flagged "References win" in place and collected in Appendix B.

### 0.2 Reference roster, as motion evidence

| Tag | Film | Runtime | What it teaches about motion | Frame-rate caveat |
|---|---|---|---|---|
| [V:1-6l8S] | kivi voice-AI launch | 77.8 s, 16:9 | Live-append kinetic type, exponential punch into cuts, perpetual slow push, light as transition material, entrances ≈2× exits. No overshoot, no motion blur. | Native 30 fps |
| [V:126cpH] | Chowdeck delivery-app ad (AE screen capture) | 18 s, 9:16 | Animating on twos, pops and gravity, tossed-card overshoot, cursor dwell, bottom-anchored shared-element morph | Authored on twos (≈12 unique fps) inside a 30 fps capture |
| [V:15VhHR] | Wix AI site builder | 53.9 s, 16:9 | Real-UI physics (cursor, typing, 1 f state changes), decel→dwell→accel carousel and deck, AI colour-state grammar, anchored element across 0.23-1.27 s cuts | 25 fps master pulled up to 30 (every 6th frame duplicated) |
| [V:19NRDv] | Bumper PRO payments launch | 67.2 s, 16:9 | Oversize slam-down type, word-by-word build with camera pull-back, semantic letter animation, motion blur on every move, beat-locked cuts 0-2 f ahead | Native 30 fps |
| [V:1CSXtQ] | OpenAI × HubSpot connector | 30.0 s, 16:9 | "Ease out of the cut, ease in toward the next cut", text-to-UI build, velocity hand-off match cut, screen-to-world pull-back, UI-made particles | 25 fps master pulled up to 30 |
| [V:1Hcg3X] | "How do solar panels work?" | 35.8 s, 16:9 | The cleanest measured envelope: expo-out arrival → slow drift → expo-in whip exit → cut on the empty plate. Fitted long-settle reading ease. | Animated at 24 fps, delivered at 30 (every 5th frame duplicated) |
| [V:1ccYWJ] | Lottieicon icon library | 44.3 s, 16:9 | Exponential zoom-through (constant ratio), snap-hold-suck word cards, hop-and-hold camera tour, light build into a cut, SFX at peak velocity | Native 30 fps |
| [V:1i2L14] | NOSTRA motion-studio promo | 35.1 s, 16:9 inset | Snap arrivals (40-45% of travel in frame 1), oversize-and-settle pops, scatter-swap-converge type, shape-match chains, gravity discard, click-caused transitions | Native 30 fps |

### 0.3 Defaults card: the 25 motion numbers to encode first

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

---

# Master §5. Motion Principles

## 5.0 Why motion decides the premium read

Viewers do not consciously see easing curves. They see physics. When every element in a film obeys one consistent model of mass and friction, and every movement has a visible cause, the film reads as designed and expensive. When elements move at uniform speed, bounce for no reason, float without a job, or each use a different curve, the film reads as a template, whatever its colours and type.

All eight references hold to this. None of them uses a linear curve for a move that visibly starts and stops on screen; linear appears only in drifts and pushes that span a whole hold, constant scrolls, draws, counters and colour ramps. Not one bounces its type. In all eight, the strongest motion is spent on the one idea that most needs it. The principles below are the measured common ground.

## 5.1 Universal principles

**MP-U1. Every movement has a cause the viewer can name.** (8/8)
- Causes seen: typing (text grows, line re-centres), a click (state change, transition), sending (content rises), voice (colour floods in, waveform moves), gravity (things fall when released), a camera move toward something (it always travels *to* a target), and the music (steps on the beat).
- Evidence: the kivi click blooms into the next scene [V:1-6l8S t=36.95s]. A cursor tap on "NO" swaps the line into the logo [V:1i2L14 t=32.0-32.17s]. The send action pushes the prompt up into the sent bubble [V:1CSXtQ t=17.60-17.93s]. Released groceries fall with gravity [V:126cpH t=7.27s]. The tour camera "always travels *to* something" [V:1ccYWJ t=27.13-33.2s]. The UI "moves only when an action causes it" [V:1-6l8S §9]. Text sources agree: Slack's motion "mirrors actual Slack workflows" [S:Slack]; motion.so asks for "no fake UI" [W:motion.so].
- Why it works: a caused movement is information. An uncaused one is noise the viewer must filter. It is also the single best defence against the AI-generated look (random floating objects).

**MP-U2. Decelerate into place; accelerate out of place.** (8/8)
- Entrances use an ease-out (fast start, long soft landing). Exits use an ease-in (slow start, fastest on the last frame). Measured entrance first-frame shares run 16-64%; measured exit growth ratios run ×1.2-2.0 per frame.
- Evidence: "Take" slams in with 64% of its travel on frame 1 [V:19NRDv t=0.03s]. The solar film's subject arrives expo-out, drifts, then leaves expo-in [V:1Hcg3X §6]. HubSpot's "ease out of the cut, ease in toward the next cut" is the film's core grammar [V:1CSXtQ §6]. NOSTRA's exits "are never ease-out" [V:1i2L14 §6]. Lottieicon: "entrances are almost always expo-out and exits expo-in" [V:1ccYWJ §6]. Wix: "ease-out dominates entrances" [V:15VhHR §6]. kivi: entrances ease-out, exits ease-in [V:1-6l8S §6]. Chowdeck: expo-out pull-out, ease-in falls [V:126cpH t=5.20s, 7.27s].
- Why it works: an object that decelerates looks like it was placed with intent and has mass. An object that accelerates away hands its energy to the cut, so the cut feels like a consequence rather than an interruption.

**MP-U3. Arrivals take longer to finish than departures.** (6/8)
- Full settle of an entrance is 1.5-4× the duration of an exit, even though the entrance covers most of its distance in its first 2-4 frames.
- Evidence: kivi title cards enter in 8-14 f and exit in 4-6 f, about 2:1 [V:1-6l8S §6]. Solar: the house is ≈82% settled by f12 and ≈90% by f16-17 (computed from the teardown's x series; the teardown's prose says 90% by f12), fully by f25, then exits in 11 f [V:1Hcg3X t=5.43-6.83s]. Bumper: slam settles in 8-13 f, whip exits in 2-7 f [V:19NRDv §6]. Lottieicon: toolbar settles over 25 f, logo whip exits in 8 f [V:1ccYWJ t=12.17s, 4.30s]. Wix: carousel landing 16 f, deck exit at full speed into the cut [V:15VhHR t=15.27s, 49.6s]. HubSpot: entrances settle over 6-20 f, exits are the last 6-10 f [V:1CSXtQ §6].
- Exception: NOSTRA runs closer to 1:1 (arrivals 7-12 f, whip 8-9 f) because its exits are long gravity drops and cued whips [V:1i2L14 t=5.87s, 13.50s].
- Why it works: the viewer needs time to read where something lands; nobody needs to read where it left. Short exits keep momentum; long tails give reading time without a visible stop.

**MP-U4. Nothing is dead, except a reading hold and the end card.** (7/8)
- Every hold keeps a slow push, a scale drift, a positional drift or an ambient background moving. Measured hold life: push 1.07-1.29× over 0.5-2.5 s [V:1-6l8S §7]; card scale drift −13 to −24% per card [V:1CSXtQ t=21.9-27.3s]; drift 0.3-0.5% of frame per frame [V:1Hcg3X §6]; 0.3-1 px/f after landing [V:1i2L14 §6]; "camera is never static on UI" at an estimated (not tracked) 1-3% of frame per second [V:19NRDv §7]; the aurora background never stops [V:1ccYWJ §6]; held illustration "boils" on twos [V:126cpH t=0.73-1.57s].
- The end card is the only long still frame: 2.2 s [V:1CSXtQ t=27.87-30.03s], 1.7 s [V:15VhHR t=52.2s], 0.8 s [V:1i2L14 t=34.2s], 1.4 s with one tiny moving element [V:126cpH t=16.53-17.97s]. The solar film never holds fully still for more than 5 f [V:1Hcg3X t=5.43s].
- The exception that sets the limit: Wix locks camera and line layout for ≈1.0 s of reading on its brand sentence [V:15VhHR t=0.63-1.43s], but it is not dead still: "love" rises in 3 f at 0.87 s and the inline 3D heart keeps spinning on Y (edge-on at 1.03 s) [V:15VhHR Study 2]. The one truly still mid-film hold is a carousel card, ≈0.65 s with frame-diff ≤0.6 [V:15VhHR t=15.9-16.5s]. These work because the frame is about 85% empty (≈45% negative space above and below the line). So: a static-layout reading hold of ≤1.0 s is allowed on a sparse frame, ideally with one small element still alive; a fully dead frame only up to ≈0.65 s mid-film; anywhere else, keep something moving.
- Why it works: in flat graphic work a still frame looks like a paused slideshow. Continuous low-amplitude motion reads as "camera running" and costs no attention.

**MP-U5. Type and UI chrome are critically damped: zero overshoot.** (7/8)
- No measured overshoot on any text or UI element in kivi, Wix, Bumper, HubSpot, solar, Lottieicon or NOSTRA. The only text "overshoot" in the set is a 3% width settle in an auto-fit type-on [V:1ccYWJ t=36.2s] and a 3-4 f tilt settle on four role words [V:1ccYWJ t=5.43-7.30s]. NOSTRA's button release returns "with no overshoot" [V:1i2L14 t=33.9s].
- Overshoot appears only on physical objects in playful films: a tossed UI card [V:126cpH t=9.43s] and a wobbling phone [V:1Hcg3X t=14.83s].
- Several teardowns name this restraint as a reason the film reads premium: "critically damped expo-out… the main reason the film reads premium rather than template-y" [V:19NRDv §6]; "No overshoot or elastic bounce on UI. This restraint reads premium" [V:15VhHR §6].
- **References win** over [N], which allows a 2.8% text spring and 9.5% accents (§19.6).
- Why it works: overshoot implies a spring, and springs imply a toy. Software UI does not wobble when it lands, so a bouncing card breaks the "this is the real product" promise.

**MP-U6. Two speed families: a slow world and a fast product.** (6/8)
- Camera, background and type cards move slowly (0.5-3.7 s moves, 1-2 s holds). UI responses move at real software speed (1-6 f).
- Evidence: HubSpot pairs camera moves of 0.6-1.7 s with UI micro-interactions of 1-6 f; "the contrast reads as premium calm + responsive product" [V:1CSXtQ §6]. Wix: brand frame "slow and precise", product world "fast but physical (12 f scrolls, 6 f morphs, 1-2 f pops)" [V:15VhHR §6]. Bumper: claim cards cut fast while proof shots drift with in-shot beats every 0.8-1.5 s [V:19NRDv §11]. kivi: slow pushes on every hold, fast punches and exits [V:1-6l8S §6]. Lottieicon and NOSTRA alternate snap UI pops with slow drifts [V:1ccYWJ §6] [V:1i2L14 §6].
- Why it works: the slow layer sets the brand's temperament (calm, confident); the fast layer proves the product is responsive. Mixing them inside one frame gives both readings at once.

**MP-U7. Reveal in reading order with small, regular staggers.** (8/8)
- Order is left→right, top→bottom, or importance order. Measured staggers: 1 f (wipe strips) [V:1i2L14 t=14.50s]; 2 f (dropdown rows, dots, chips) [V:1CSXtQ t=8.867s] [V:1i2L14 t=3.567s]; 2-3 f (UI chips, table columns) [V:15VhHR t=4.47s] [V:1-6l8S t=67.87s]; 3-4 f (email lines, cards) [V:1-6l8S t=23.13s] [V:15VhHR t=41.67s]; 5-9 f (title lines, big objects) [V:1Hcg3X t=0.10s] [V:15VhHR t=44.6s]; 7-10 f (words in a spoken-rhythm line) [V:19NRDv t=0.30s].
- Why it works: a cascade in reading order guides the eye through the content without effort; the stagger itself becomes the reading pace.

**MP-U8. Keep one anchor still while the context changes.** (8/8)
- Something holds its screen position (or its identity) across a cut or a scene change: a prompt bar locked for 3.8 s across 6 shots [V:15VhHR t=8.63-12.47s]; an ice-bottle asset over 4 page swaps [V:15VhHR t=30.83-32.83s]; a card that morphs into a notification and stays on screen [V:126cpH t=11.03-13.60s]; the same line at the same position across a white→navy flip [V:19NRDv t=1.167s]; one circle carried across 5 setups [V:1i2L14 t=0.0-4.1s]; a sun shrinking to a point that becomes a lamp [V:1Hcg3X t=3.30-3.43s]; the voice pill unfolding into the transcript card [V:1-6l8S t=9.50-9.93s]; the dot that becomes a caret [V:1CSXtQ t=2.133s].
- Why it works: the eye tracks one object, so even sub-second cuts read as one continuous thought. This is what lets an ASL below 0.8 s stay calm [V:15VhHR rule 6].

**MP-U9. The motion acts out the meaning.** (8/8)
- Examples: "thousands" decodes from "$$$$" [V:19NRDv t=7.68s]; "Automatically" assembles its own scattered letters [V:19NRDv t=14.33s]; a chevron wipe for "up a gear" [V:19NRDv t=47.97s]; "OVERCOMPLICATE" spreads on an arc wave [V:1i2L14 t=9.70s]; a card is thrown away by gravity before the solution [V:1i2L14 t=13.50s]; live dictation text appends and re-centres like a transcript [V:1-6l8S t=0.10s]; UI data breaks into particles that flow into the answer [V:1CSXtQ t=19.0s]; the icons' own animations are the product demo [V:1ccYWJ]; groceries "drop into your basket" [V:126cpH]; energy passes from carrier to carrier [V:1Hcg3X]; a dedicated AI colour appears only when the AI acts [V:15VhHR §6].
- Text sources state the same intent: "make the motion feel like the product" [S:playbook rule 12]; Bolt's "fluid camera movements create momentum that mirrors the speed of their one-click checkout" [S:Bolt].
- Why it works: a viewer remembers a word that moved the way it means. Decoration has to be ignored; semantic motion is read.

**MP-U10. Text never moves fast while it is being read.** (8/8)
- Fast motion on type happens only in its first 4-8 f (entrance) or last 6-10 f (exit). While readable, drift stays at or below 0.1-0.5% of the frame per frame.
- Measured: HubSpot "drift speeds on cards are ≤2 px/f [720p] while text must be read. Fast motion happens only in the first or last 6-10 frames" [V:1CSXtQ §8]; Bumper "text is never moving fast while it needs to be read" [V:19NRDv §8]; NOSTRA "moving states are never read; only the settled line carries meaning" [V:1i2L14 §8]; kivi line drift 1.4 px/f native (≈2.4 px/f @1080) [V:1-6l8S t=0.5-1.5s]; solar title drift 0.34-0.51% H per frame [V:1Hcg3X t=0.37-0.97s].
- Why it works: reading needs fixation; the eye can track slow drift but not a whip. It also explains *why* exits can be fast: no one reads an exiting line.

**MP-U11. Carry momentum across the cut.** (6/8)
- The outgoing shot accelerates into the cut; the incoming shot opens already moving (same direction or same scale trend) and decelerates.
- Measured: send motion 3→7 px/f before the cut, then 34 px/f decelerating after it [V:1CSXtQ t=17.60-17.93s]; a whip right hands its momentum to a line that drifts right with decelerating steps 21, 10, 6, 4 px/f [V:1i2L14 t=6.13s]; the panel exits upward and the sun keeps rising the same way [V:1Hcg3X t=1.53s]; a pull-back shrink continues into a title that enters at 2.1× and shrinks [V:1ccYWJ t=33.20s]; the tagline punch continues as a decelerating +29% push on the wordmark [V:1-6l8S t=71.10s]; the toolbar pill is cut into mid-move [V:1ccYWJ t=12.167s]; incoming text rides the chevron wipe's direction [V:19NRDv t=48.17s]; a falling melon re-enters falling from the top of the next shot (match on action) [V:126cpH t=9.27-9.50s].
- Why it works: a cut on peak velocity hides itself; the brain reads one continuous move.

**MP-U12. UI state changes run at real software speed.** (7/8)
- 1-3 f for state changes, 6 f for menus, 3 f press + 6 f release for buttons, 4-5 f for colour fills.
- Measured: toggle completes in one source frame plus a 3 px settle (3 f) [V:1CSXtQ t=10.267-10.333s]; chip label swaps in 1 f [V:1CSXtQ t=10.200s]; button fills in 1 f [V:15VhHR t=8.53s]; popups appear in 1-2 f [V:15VhHR §9]; dropdown opens in 6 f [V:1CSXtQ t=8.867s]; button press −20% in 3 f, release in 6 f [V:1i2L14 t=33.8s]; mint "matched" fill wipes in 4 f [V:19NRDv t=20.37s]; hover lift ≈5 px in ≈3 f [V:1-6l8S t=36.45s].
- These match [N] Carbon fast-01 (70 ms ≈ 2 f, for buttons and toggles).
- Why it works: anything slower than the real product reads as a mock-up; anything faster does not register. Real timings inside a slow camera make the product feel responsive and the film unhurried.

**MP-U13. Spend the biggest motion once.** (8/8)
- Each film has one or two "loudest" moves and keeps everything else quieter: the only 3D/DOF/particle shot [V:1CSXtQ t=17.8-21.47s]; one pill shockwave into the drop [V:1-6l8S t=8.03s]; one flash per film [V:1Hcg3X t=12.83s]; one implosion with ≤12 sparks [V:19NRDv t=55.0s]; three 3D moments only (heart, ice, deck) [V:15VhHR §6]; one hero tour at 61-75% of runtime [V:1ccYWJ t=27.13s]; one starburst on the core claim [V:126cpH t=3.90s]; one 4.7 s breather after 25 s of dense morphing [V:1i2L14 t=25.93s].
- Why it works: contrast is what makes a hero moment read as a hero moment. If everything is loud, nothing is.

**MP-U14. The picture leads the sound; it never trails.** (4/8 measured, plus [P])
- Where cuts or hits are synced, the picture lands 0-3 f *before* the audio: the shockwave fills the frame ≈3 f before the drop [V:1-6l8S t=8.20s]; 11 of 18 cuts land 0-2 f before a 100 BPM beat [V:19NRDv §11]; booms sit at the peak velocity of each camera move within ±2-3 f [V:1ccYWJ §11]; the toggle fills on the click onset [V:1CSXtQ t=10.24-10.267s].
- Perception data agree: sound arriving late is noticed from about 125 ms, early from 45 ms [P, ITU-R BT.1359], so a word or hit should "never appear after its sound" ([P] author's inference from BT.1359).
- Why it works: the eye processes the visual event as the cause of the sound. A cut after the kick reads as sluggish [V:19NRDv §16, inferred].

**MP-U15. One small curve vocabulary per film.** (6/8)
- Each film uses three to six recurring curve shapes and applies them by role, not per shot. Solar: "a small ease vocabulary applied everywhere: expo-out arrivals, expo-in whips, one long-settle in-out… and a snap-tilt settle" [V:1Hcg3X §13]. Lottieicon: expo-out, expo-in, S-curve glides, linear counters [V:1ccYWJ §13]. NOSTRA: "consistent ease families" [V:1i2L14 §13]. The same holds for Bumper, HubSpot and kivi.
- Why it works: a consistent physics model is what makes different elements feel like one world. "Uniform ease on everything" (one curve for every role) and "a different curve per shot" both read as amateur [V:1Hcg3X §6].

## 5.2 Style-specific motion principles

The style names match Part 02's art-direction styles (AD-S). Use the row for the chosen style; do not mix rows inside one film.

| ID | Style | Ease family | Entrances | Exits | Overshoot | Motion blur | Hold behaviour | Signature move | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| MP-S1 | **Airy Aurora / Calm-Tech** | Exponential smoothing (lerp 20-25% per frame); linear pushes; expo-in punches | 8-14 f, rise ≈2-10% H with blur → sharp | 4-6 f blur dissolve or whip-left | 0% | None, even on whips and the truck | Push 1.07-1.29× on every hold; aurora always drifting | Live-append type with auto-re-centre; +18-33% punch into a cut or a white frame | [V:1-6l8S] |
| MP-S2 | **Night claim / Day proof** | Expo-out slams (64% in frame 1); drift-then-snap pull-backs | Slam 3-4× → 1× in 8-13 f; words 4-7 f from the right with blur | 2-7 f whip-smear or defocus | 0% | **On every move** (ghosting on frames 0-1; ≈180° shutter [inferred]) | Type world shrinks 1-3.5%/f with ≈40-55% snaps in 3 f | Oversize slam + word build + continuous pull-back; semantic letters | [V:19NRDv] |
| MP-S3 | **Prompt-native launch** | Ease out of each cut, ease in toward the next; cubic in-out pull-backs | 6-20 f ease-out; typed text | Last 6-10 f accelerate (shrink 10-20%, push, scroll 8 → 24 px/f) | 0% | None on 2D; only DOF in the one 3D shot | Every card scale-drifts 13-24% | Text grows into UI; velocity hand-off on send; screen-to-world pull-back | [V:1CSXtQ] |
| MP-S4 | **Brand-bookended UI montage** | Ease-out with exponential tails (step halves every ≈2 f); decel → dwell → accel | Brand frame 3-6 f moves after a 1 s still read; product pops 1-2 f | Accelerate into cuts at peak speed (deck), or land and hold (carousel) | 0% on UI | Only on whips and page scrolls | Brand line layout locked 1.0 s (one inline element still animating); product shots full of UI events (≈1 per 0.5 s) | Anchored element across fast cuts; AI colour-state sweeps 8-15 f | [V:15VhHR] |
| MP-S5 | **Editorial 2.5D (risograph)** | Expo-out ×0.85-0.92 per frame; expo-in ×1.35-1.9 per frame; one long-settle in-out (0.45, 0, 0, 1) | 50% of travel in 3-6 f; 90% by 10-27 f | 6-11 f whip to 15-20% of frame per frame, then cut on the empty plate | One small snap-tilt on physical props only (≤12°, one +5° overshoot) | One blurred frame on a whip exit only | Drift 0.3-0.5% of frame per frame, never still >5 f | Arrival → drift → whip envelope; light-source match cuts | [V:1Hcg3X] |
| MP-S6 | **Dark neon asset reel** | Expo-out, expo-in, symmetric S-curve glides, linear counters | Snap +40-55% in 6 f (velocity peak on frame 2) or settle from 2× over 18 f | Suck-in shrink −24 to −38% over 8-19 f; 3-8 f whips | Only a 3-4 f tilt settle on accent words | None (strobes above 10% W/f: a flaw) | Aurora always moving; holds 7-20 f in tours | Zoom-through ×1.36/f; hop-and-hold tour; light build → cut | [V:1ccYWJ] |
| MP-S7 | **Monochrome brand-system explainer** | Snap expo-out (40-45% in frame 1, 88-95% by f6); expo-in whips; gravity | 6-12 f snaps; small objects enter at ≈2× and settle in 3-4 f | 8-9 f whip, cued 11 f ahead; 13 f gravity drop with 20° rotation | None on large cards and buttons; oversize-settle (not overshoot) on small pops | Last 2 f of a whip only | 0.3-1 px/f drift after every landing | Scatter-swap-converge type; shape-match chains; polarity flip on 11/13 cuts | [V:1i2L14] |
| MP-S8 | **Playful collage, animated on twos** | Stepped (12 fps) pops and snaps; gravity ease-in; one rotational overshoot | 0-4 f pops; 16-22 f settles | Gravity falls 6-14 f with 70-90° rotation | ≈25% of swing on a tossed card | Directional blur on the vertical push only | Boil and wobble on held art | Flat-to-real shape-matched swaps; tossed card; cursor dwell | [V:126cpH] |
| MP-S9 | **Calm editorial AI (ElevenLabs-like)** | Expo-out, no overshoot [E, inferred] | Blur-in 8 → 0 px, 0.35 em rise, 14 f, 3 f stagger [E, inferred] | Blur dissolve 8-12 f (10 f in its recipe) or cut on the beat [E, inferred] | 0% [E, inferred] | [inferred] none | Push 1.00 → 1.05-1.08 per shot [E, inferred]; orb drift period ≈251 s [E, sourced code] | Talking orb driven by voice level; shimmer sweep 2 s + 0.5 s pause [E, sourced code] | [E] (motion inferred; scrub before relying) |

Reading the table:
- **Blur policy is a style choice, not a universal rule.** Three references never blur (kivi, HubSpot's 2D shots, Lottieicon); one blurs everything (Bumper). Pick one policy per film (§19.8).
- **Two different "premium calm" recipes exist.** MP-S1 and MP-S3 get calm from slow continuous pushes and soft eases. MP-S4 gets it from locked-layout reading holds in a near-empty frame (one small inline element still moves). Both work; do not combine a dead-still hold with a constantly drifting background in the same frame.

## 5.3 Experimental (single-reference or risky; validate before using as a default)

| ID | Technique | Numbers | Why it is experimental | Evidence |
|---|---|---|---|---|
| MP-X1 | **Animate on twos** for illustration and collage layers | Every pose held 2-3 capture frames (≈12 unique fps); live action and camera on ones | One reference. Stepped UI motion reads as lag [inferred], so never on UI scrolling or camera moves in SaaS work. Figma's Config keynote film was dropped to 15 fps for a handmade feel [S:Figma]. | [V:126cpH §Motion language] |
| MP-X2 | **Exponential zoom-through** into an icon | 3 f ease-in, then constant ×1.36 per frame, ≈20× in 10 f | One reference; needs a hollow or dark interior to "enter" | [V:1ccYWJ t=0.87-1.20s] |
| MP-X3 | **Semantic letter animation** | $-scramble 12 f; self-assembling letters 20 f with ±0.5 cap random offsets; kick-bounce letters at 2 f stagger | One reference, but the strongest idea in it. Limit to 3 words per film. | [V:19NRDv t=7.68s, 14.33s, 46.13s] |
| MP-X4 | **Colour bloom on voice** (B&W → colour) | 22-42 f linear saturation ramp, with background defocus | One reference, and it was applied inconsistently there | [V:1-6l8S t=18.57s, 54.0s] |
| MP-X5 | **Scatter-swap-converge** kinetic sentence | Settle 7-14 f, hold 10-14 f, scatter 6-7 f, swap in 1 f while displaced, converge 7 f; ≈1 s per sentence | One reference; needs short (≤3-word) lines | [V:1i2L14 t=7.57-10.63s] |
| MP-X6 | **Lens-distortion zoom-out** to open a dense grid | ≈2× → 1× over ≈20 f expo-out; barrel bulge relaxes in ≈6 f | One reference; distortion can read as an effect if overused | [V:1ccYWJ t=7.30s, 27.13s] |
| MP-X7 | **Glitch / scramble decode** | ≈10 f, stepwise, once per film | One reference; Bumper uses it once "so it doesn't feel cheap" | [V:19NRDv t=1.17-1.50s] |
| MP-X8 | **Velocity-tied SFX** (booms at peak velocity, not at cuts) | Sub hit within ±2-3 f of each move's peak velocity | One reference measured it as the edit's real sync | [V:1ccYWJ §11] |

## 5.4 Avoid (observed failures and their fixes)

| ID | Failure | Where it was seen | Why it reads amateur | Fix |
|---|---|---|---|---|
| MP-A1 | **Fast camera pans with no motion blur** (10-27% W per frame) | [V:1ccYWJ t=29.3s, 30.93s, 32.30s] | The grid strobes; the eye sees discrete jumps | Keep peak ≤8-10% W/f, or add 180° motion blur above ≈5% W/f (SP-U8, SP-V) |
| MP-A2 | **Frame-rate conversion by duplication** (24/25 → 30) | [V:15VhHR], [V:1CSXtQ], [V:1Hcg3X] | Judder every 5th or 6th frame on slides and whips | Animate and render at the delivery frame rate (§18.12) |
| MP-A3 | **Zero-stagger rows** of icons | [V:1-6l8S t=34.50s] ("the least crafted moment") | Elements arrive as a block; no reading order | 2-3 f stagger (SP table) |
| MP-A4 | **Pixel/glitch builds longer than ≈12 f** | [V:1i2L14 t=16.63-17.50s] (23-26 f) | Long, illegible noise | ≤10-12 f, once per film |
| MP-A5 | **Bloom so strong it smears letter edges** at oversize scale | [V:19NRDv t=7.2s] | Soft, muddy type for 3-4 f | Glow radius ≤2-3% of cap height (Part 02, §11.7) |
| MP-A6 | **The same reveal grammar more than ≈6 times** | [V:19NRDv] (slam → build → pull-back ≈12×) | Monotony in the middle third | Rotate in semantic variants (MP-X3) |
| MP-A7 | **Holding an "AI-working" colour state longer than ≈15 f** | [V:15VhHR] (thermal frames read as glitches) | Reads as a render error | Switch in 1 f and clean up over 6-12 f, or dissolve over 15-20 f |
| MP-A8 | **Single-frame dips to black** between scenes | [V:19NRDv t=25.60s] | Reads as a render glitch | A clean cut, or a 2-4 f luma dip |
| MP-A9 | **A status or payoff visible for under 0.5 s** | "Order delivered" 2 f [V:126cpH t=13.53s]; payoff block ≈0.4 s [V:1Hcg3X t=29.80s] | The message is subliminal | Hold ≥1.0 s, or ≥ the read-time formula (§18.8) |
| MP-A10 | **Decorative bursts crossing the claim word** | Starburst over "seconds" ≈0.5 s [V:126cpH t=3.90-4.43s] | The effect fights the message | Mask rays behind type |
| MP-A11 | **Uncaused floating or bobbing UI** | Not present in any reference (MP-U1) | The single most common AI-video tell [inferred] | Every move needs a named cause |
| MP-A12 | **Bounce or elastic on type** | Not present in any reference (MP-U5); Remotion's default spring overshoots 16.3% [N] | Toy-like; breaks "real product" | Critically damped curves (§19.6) |
| MP-A13 | **Linear moves that visibly start and stop on screen** | Not present in any reference: linear is used only where cuts hide the start and end (hold pushes, drifts, constant scrolls) or for draws, counters and colour ramps | Mechanical, "keyframed" | Linear only for drift, opacity, colour ramps, tally counters (§19.8) |
| MP-A14 | **Uniform ease on every element** | Named as an amateur signal [V:1Hcg3X §6] | No physical model; everything feels the same weight | Role-based ease tokens (§19.3) |

## 5.5 Especially good for SaaS

| ID | Principle | Numbers | Evidence |
|---|---|---|---|
| MP-SaaS1 | **Show the product's real response time.** Let UI react in 1-3 f inside a slow camera | Toggle 3 f, label 1 f, dropdown 6 f, camera 0.6-1.7 s | [V:1CSXtQ], [V:15VhHR] |
| MP-SaaS2 | **The interaction causes the transition.** A click, toggle or send triggers the next scene | Consequence lands 3-8 f after the press | [V:1-6l8S t=36.95s], [V:1CSXtQ t=10.367s], [V:1i2L14 t=32.17s], [V:126cpH t=11.03s] |
| MP-SaaS3 | **Say → see.** Input first, empty result hold, then a reading-order cascade | Empty hold 8-9 f, cascade 13-22 f | [V:1-6l8S t=22.87s], [V:15VhHR t=12.47s] |
| MP-SaaS4 | **One colour means "AI is acting".** A transitional colour state that always settles | 8-15 f sweep, settle 6-8 f | [V:15VhHR §6] |
| MP-SaaS5 | **Human speed vs machine speed.** Typed or spoken input at human pace; AI output at machine pace | Input 4-7 words/s or 7-20 chars/s; output ≈15 words/s (2 f per word) or 40-55 chars/s | [V:1-6l8S t=9.7-14.6s], [V:15VhHR] |
| MP-SaaS6 | **Context → extraction → focus** for data | Show the whole table, lift the relevant column 0.5 s, push through in 9 f, confirm with a 4-5 f fill | [V:19NRDv t=16.77-20.50s] |
| MP-SaaS7 | **Prefer state switches to generated morphs.** Swap between two stable states on one frame and add a physical reaction, rather than tweening geometry | Instant swap, then a 6-14 f fall or settle | [V:126cpH t=6.77s] ("works as a model for AI generation too"), [V:15VhHR t=8.93s] (1 f thermal → colour switch) |

## 5.6 Do / Don't pairs

| Do | Don't |
|---|---|
| Land a card with cubic-bezier(0.33, 1, 0.68, 1) over 12 f, then drift 0.2%/f | Slide it in linearly over 12 f and stop dead |
| Let the click cause the scene change within 3-8 f | Cut to the result on an arbitrary frame after the click |
| Exit a title in 4-6 f with an accelerating curve and cut at peak speed | Fade it out over 20 f and cut on an empty frame with no motion |
| Keep text drift ≤0.5% of frame per frame while it is readable | Push a line across 10% of the frame while the viewer reads it |
| Put overshoot only on a tossed physical prop in a playful film (≤25%, one cycle) | Spring every headline into place |
| Spend 3D, DOF and particles on the one idea that needs them | Add depth and glow to every shot |
| Hold the end card still for ≥0.8 s | Keep the logo drifting and pulsing until the last frame |
| Lead the beat by 0-2 f | Cut a frame or two after the kick |

## 5.7 Where the references overrule generic advice (motion principles)

1. **Overshoot.** [N] allows 0-3% overshoot on text and up to 10% on accents. The references use 0% on all text and UI in 7/8 films. **References win**: 0% on type and UI chrome; overshoot only on physical props in playful styles.
2. **Anticipation.** [N] suggests a 3-6 f, 2-5% pull-back before objects move. No reference uses a cartoon wind-up on UI or type. They anticipate with *narrative* cues instead (cursor dwell, pointing, a glow build, a pre-loaded shape, a scale punch). **References win** (§19.7).
3. **Motion blur.** [N] gives Remotion's 180° shutter as the film standard. The references split 3 never / 1 always / 4 selective. **References win**: blur is a per-style choice, mandatory only above ≈5% W per frame.
4. **Stillness.** Generic practice (and [E]'s inferred push on every shot) says never hold still. Wix shows a ≤1.0 s locked-layout read on a sparse brand frame works (camera and line still, one inline heart spinning), and a ≈0.65 s fully still carousel card. **References refine** the rule rather than reverse it (MP-U4).

---

# Master §19. Ease & Acceleration Principles

§19 comes before §18 in this part because every speed in §18 names one of the ease tokens defined here.

## 19.0 Why easing is the biggest single premium/amateur tell

A move's duration says how important it is. Its curve says what it weighs and who moved it. Two films with identical timings read completely differently if one uses symmetric "easy ease" on everything and the other gives entrances a fast start and a long soft landing. In this reference set, After Effects' default Easy Ease (influence 33% on both keys, equivalent to cubic-bezier(0.333, 0, 0.667, 1)) misses **every** measured entrance by 26-39% of travel (RMSE, Appendix A). The curves the references actually use are strongly asymmetric.

## 19.1 How the curves were measured

- **Data.** Each per-video teardown tracked positions, widths, heights or areas frame by frame (ink bounding boxes, colour masks, phase correlation). I took 28 of those series: entrances, glides, exits, falls, counters.
- **Fit.** For each series I normalised time and progress to 0-1 and fitted a CSS cubic-bezier(x1, y1, x2, y2) by least squares (Nelder-Mead, 18 starts). I also scored 30 standard tokens (Material 3, Carbon, CSS, Penner eases, Remotion's and [E]'s EXPO/INOUT/QUINT) against each series. The error is RMSE in % of the move's travel: under 3% is indistinguishable by eye at 30 fps, 3-6% is a close match, over 10% is a different curve [inferred thresholds].
- **Caveats.** Three references were frame-rate converted (25 → 30 or 24 → 30); I fitted those on their unique frames. Some moves were cut into mid-flight or left the frame, so their "start" or "end" is the first or last visible frame. Fits on 6-9 points are shape indicators, not precision values. Full data: Appendix A.

## 19.2 The measured curve atlas

| ID | Move (reference, time) | Length | Travel in frame 1 | Fitted cubic-bezier (fitted) | Best standard token (RMSE) | Class |
|---|---|---|---|---|---|---|
| A | "Take" slam-down, 4.05× → 1× [V:19NRDv t=0.00-0.27s] | 8 f | 63% | (0.01, 0.78, 0.26, 0.92) | M3 emphasized-decelerate (0.05, 0.7, 0.1, 1): 3.5%; EXPO (0.16, 1, 0.3, 1): 4.5% | SNAP |
| C | "IMAGINE" scale-down [V:1i2L14 t=0.03-0.40s] | 11 f | 37% | (0.14, 0.72, 0.38, 1.06) | easeOutQuart (0.25, 1, 0.5, 1): 2.2%; (0, 0, 0, 1): 2.9% | SNAP |
| D | "SOLUTION" block expand [V:1i2L14 t=18.37-18.73s] | 12 f | 44% | (0.06, 0.31, 0, 0.91) | (0, 0, 0, 1): 1.7% | SNAP |
| B | "Still" append and re-centre [V:1-6l8S t=0.10-0.53s] | 13 f | 25% | (0.11, 0.35, 0.18, 0.83) | Carbon expressive entrance (0, 0, 0.3, 1): 3.8%; easeOutCubic (0.33, 1, 0.68, 1): 4.0% | OUT |
| F | House slide-in [V:1Hcg3X t=5.43-6.27s] | 20 f @24 | 25% | (0.02, 0.38, 0.3, 0.88) | easeOutCubic: 5.7% | OUT |
| K | Toolbar pill, cut into mid-move [V:1ccYWJ t=12.17-13.0s] | 25 f | 16% | (0.11, 0.46, 0.25, 0.92) | easeOutCubic: 4.1% | OUT |
| O | Counter 84 → 100% [V:19NRDv t=23.90-24.93s] | 31 f | 19% | unstable fit | (0, 0, 0, 1): 2.9%; easeOutQuart: 4.7% | OUT (long) |
| G | Climax sun rise [V:1Hcg3X t=30.63-32.30s] | 50 f | 20% | (0, 0.39, 0.25, 1.0) | (0, 0, 0, 1): 1.2% | OUT (long) |
| H | "photo \| voltaic" panel wipe [V:1Hcg3X t=17.0-19.4s] | 72 f | 1-2% (creeps in) | (0.39, 0.19, 0, 1.02); the teardown's own fit (0.45, 0, 0, 1) scores 1.5-2.0% | CSS ease (0.25, 0.1, 0.25, 1): 5.7-8.0% | SETTLE |
| P | Cursor ballistic move [V:15VhHR t=2.5-3.07s] | ≈16 f | 4% | unstable fit | CSS ease: 3.8% | GLIDE |
| J | Headline re-centre pan [V:1CSXtQ t=3.37-3.93s] | ≈17 f | 1% | (0.34, −0.01, 0.16, 0.97) | CSS ease: 4.2% | GLIDE |
| R | Desktop truck [V:1-6l8S t=35.47-36.4s] | ≈26 f | 0% (2-3 f hold) | (0.36, −0.13, 0.04, 0.77) | CSS ease: 7.7% | GLIDE |
| M | Variation ribbon rise [V:1ccYWJ t=23.17-24.23s] | 32 f | 2% | (0.57, 0.35, 0.11, 0.99) | CSS ease: 6.8% | GLIDE |
| E | Card pull-back, step 1 [V:1i2L14 t=4.07-4.67s] | 18 f | 8% | (0.24, 0.33, 0, 1.17) | easeOutQuart: 7.2% | GLIDE (fast attack) |
| I | Text-to-UI pull-back ×0.75 [V:1CSXtQ t=8.0-9.03s] | ≈31 f | 1% | (0.69, 0.07, 0.36, 0.97) | **easeInOutCubic (0.65, 0, 0.35, 1): 1.8%** | INOUT |
| N | Line-to-card unfold [V:1-6l8S t=9.70-9.93s] | 8 f | 5% | (0.73, 0.22, 0.35, 0.77) | CSS ease-in-out (0.42, 0, 0.58, 1): 3.6%; easeInOutCubic: 4.9% | INOUT |
| L | Gallery tour glide 3 [V:1ccYWJ t=30.57-31.30s] | 25 f | 0% | (0.79, 0.01, 0.21, 0.98) | **easeInOutQuart (0.76, 0, 0.24, 1): 0.7%** | HOP |
| X2 | Logo whip exit [V:1ccYWJ t=4.30-4.53s] | 8 f | 3% | (0.45, 0.06, 0.81, 0.32) | **M3 emphasized-accelerate (0.3, 0, 0.8, 0.15): 2.7%** | EXIT |
| X3 | "Introducing" suck-in shrink [V:1ccYWJ t=2.33-2.60s] | 8 f | 3% | unstable fit | M3 emphasized-accelerate: 5.4% | EXIT |
| X4 | Hook whip exit [V:1Hcg3X t=1.20-1.47s] | 6 f @24 | 4% | (0.21, 0.09, 0.7, −0.04) | M3 emphasized-accelerate: 1.7% | EXIT |
| X6 | Tagline punch +18% [V:1-6l8S t=70.83-71.10s] | 8 f | 2% | (0.28, 0.07, 0.86, 0.11) | M3 emphasized-accelerate: 2.8% | EXIT / PUNCH |
| X7 | Hook converge into cut [V:1CSXtQ t=1.93-2.10s] | 5 f | 3% | unstable fit | M3 emphasized-accelerate: 0.9% | EXIT |
| X9 | Card shrink ×0.80 into cut [V:1CSXtQ t=21.93-22.57s] | ≈17 f | 2% | (0.24, 0.07, 0.73, 0.23) | M3 emphasized-accelerate: 7.7% | EXIT |
| X1 | Card whip right [V:1i2L14 t=5.87-6.10s] | 8 f | 2% | (0.47, 0.05, 0.93, 0.08) | **easeInQuint (0.64, 0, 0.78, 0): 3.8%** | WHIP |
| X5 | House whip exit [V:1Hcg3X t=6.47-6.83s] | 9 f @24 | 1% | (0.42, 0.04, 0.92, 0.02) | easeInQuint: 3.7% | WHIP |
| X8 | Card gravity drop [V:1i2L14 t=13.50-13.93s] | 12 f | 3% | unstable fit | **easeInQuad (0.11, 0, 0.5, 0): 2.9%** | GRAVITY |

What the atlas shows:
1. **Entrances come in two families.** "SNAP" moves put 37-64% of their travel into frame 1 (hero words, label expands, oversize settles). "OUT" moves put 16-25% into frame 1 (cards, objects, line re-centres, toolbars). One curve cannot serve both: Material 3's emphasized-decelerate fits the slam within 3.5% but misses the OUT family by 13.8-18.4%; easeOutCubic fits the OUT family within 4.0-5.7% but misses the slam by 12.6%.
2. **Travel moves use an asymmetric glide**, with velocity peaking at 20-37% of the move and a long tail. CSS's built-in `ease` (0.25, 0.1, 0.25, 1) is the best standard token for cursors, trucks, re-centring pans and rising ribbons. Symmetric in-out curves are reserved for pull-backs, unfolds and camera hops between targets.
3. **Exits that end on a cut fit Material 3's emphasized-accelerate (0.3, 0, 0.8, 0.15)** in 6 of 9 cases. Whips that leave the frame are steeper (easeInQuint). Gravity is a plain quadratic.
4. **The long-settle reading ease** (0.45, 0, 0, 1) is the one curve here no standard library ships; it is the references' own.
5. **The defaults most generators reach for fail.** AE Easy Ease misses every entrance by 26-39%. EXPO (0.16, 1, 0.3, 1), which [E] and Remotion's skill use for all entrances, fits only the SNAP family (4.5-8.1%) and misses the OUT family by 11.6-16.3%.

## 19.3 The ease token set

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

## 19.4 Frame-domain recipes (for hand-keying and for checking renders)

**Exponential ease-out by decay ratio r** (each frame's step = r × the previous step). Choose r by "mass".

| r | Frames to 50% | to 90% | to 98% | Feels like | Measured examples |
|---|---|---|---|---|---|
| 0.60 | 1.4 | 4.5 | 7.7 | A slam: heavy, decisive | "Take" settles by f8 [V:19NRDv t=0.03-0.27s] |
| 0.70 | 1.9 | 6.5 | 11 | Snappy UI | Wix ease-outs, step halves every ≈2 f [V:15VhHR §6] |
| 0.75-0.80 | 2.4-3.1 | 8-10 | 14-18 | Calm, organic | kivi re-centre, lerp 20-25% per frame, settles in 13-14 f [V:1-6l8S t=0.10s] |
| 0.85 | 4.3 | 14 | 24 | Soft, floating | House slide, ×0.85/f, ≈90% by f16-17 (computed from the measured series), full by f25 [V:1Hcg3X t=5.43s]; toolbar, half in 4 f, settled 25 f [V:1ccYWJ t=12.17s] |
| 0.90-0.92 | 6.6-8.3 | 22-28 | 37-47 | Slow, cinematic | Climax sun, 90% in ≈27 f [V:1Hcg3X t=30.63s]; recap strips ×0.92 per frame [V:1Hcg3X t=32.53s] |

**Exponential ease-in by growth ratio g** (each frame's step = g × the previous step). The last frame carries about (1 − 1/g) of the remaining motion.

| g | Share of travel in the last frame | Feels like | Measured examples |
|---|---|---|---|
| 1.2 | ≈17-19% | Gravity, a drop | Card drop, Δy 4.9 → 32 px/f over 12 f [V:1i2L14 t=13.50s] |
| 1.4-1.5 | ≈30-38% | A clean exit into a cut | Logo whip 3, 5, 8, 11, 17, 25, 42 px [V:1ccYWJ t=4.30s]; "Introducing" shrink doubling every ≈2 f [V:1ccYWJ t=2.33s] |
| 1.6-1.9 | ≈40-45% | A whip | Hook exit ×1.7-1.9 per frame [V:1Hcg3X t=1.20s]; house exit ×1.6 [V:1Hcg3X t=6.47s]; tagline punch 44% in the last frame [V:1-6l8S t=71.07s] |
| 2.0+ | ≥50% | A smash; a cut hidden in motion blur | Converge 4, 9, 17, 37, 74 px [V:1CSXtQ t=1.93s]; card whip 45 → 136 → ≈204 px/f [V:1i2L14 t=6.03s] |

**Envelope check for any shot**: arrival (r 0.6-0.85) → drift (0.1-0.5% of frame per frame, linear) → exit (g 1.4-2.0) → cut on peak velocity or on 0-1 empty frame [V:1Hcg3X rules 1-2]. If a render shows a hard stop (velocity to zero in one frame) or a slow start on an entrance, the wrong token was applied.

## 19.5 Compound acceleration patterns

| ID | Pattern | Numbers | Use | Evidence |
|---|---|---|---|---|
| EA-C1 | **Arrival → drift → whip** (the shot envelope) | Arrival 50% in 3-6 f, 90% by 10-14 f; drift 0.3-0.5% per frame; exit 6-11 f at g 1.35-1.9, last frame 15-20% of frame per frame; cut on the first empty frame | Any illustrated or object shot in an editorial explainer | [V:1Hcg3X §6, rules 1-2] |
| EA-C2 | **Decelerate → dwell → accelerate** | Decel ≈11-14 f; dwell ≈6-7 f below 15% of peak speed; accel ≈13-21 f; then cut at peak speed (deck) or land with a ≈16 f ease-out and hold (carousel) | Carousels, card decks, galleries: the dwell is the reading beat | [V:15VhHR t=14.13-15.87s, 48.27-49.63s] |
| EA-C3 | **Drift → snap** | Type pull-back drifts −1.5 to −3.5% scale per frame, then snaps ≈40-55% in 3 f when the line needs room | Kinetic lines that keep growing | [V:19NRDv t=2.45-3.25s, 9.28s] |
| EA-C4 | **Two-stage reveal** | Stage 1 expo-out (40% of its change in the first pose, ≈90% within 8 f); near-hold ≈0.25 s; stage 2 ease-in-out ≈13 f; ≈4.1× total over 1.0 s. Variant: two 6 f pull-back steps ≈1 s apart (1.0 → 0.79, then 0.75 → 0.63) | "One item → the whole system" reveals | [V:126cpH t=5.20-6.20s], [V:1i2L14 t=4.10-5.50s] |
| EA-C5 | **Double-ease snap** | Ease-out 7 f, then re-accelerate 4 f into a cut-step that drops scale a further ×0.4 | Moving a hero word out of the way for its sentence | [V:19NRDv t=7.20-7.63s] |
| EA-C6 | **Push → punch → cut** | Steady push ≈+7% over 0.5 s (or 1.0× for 1 s, then 1.0 → 1.2), then E-PUNCH +18-33% in the last 3-8 f, cut on an onset or into 1 white frame | Section climaxes; logo reveals; ≤4 per 78 s | [V:1-6l8S t=7.6-7.97s, 33.4-33.93s, 70.37-71.10s] |
| EA-C7 | **Snap → hold → suck-in** | +40-55% in 6 f (peak velocity on frame 2) → hold 6-10 f → −24 to −30% over 8-18 f (E-EXIT) → cut on the smallest frame | Single statement cards in a fast reel | [V:1ccYWJ t=1.87-2.60s, 25.5-27.13s] |
| EA-C8 | **Escalation** | Moves shorten (32 → 32 → 22 → 17 f) while peak speed climbs (8 → 10 → 27 → 22% W/f) and holds go 9 → 20 → 20 → 7 f; word-swap cadence tightens 16 → 15 → 13 → 11 f | Building toward an exit or a climax | [V:1ccYWJ t=27.40-32.57s], [V:19NRDv t=57.60-59.90s] |
| EA-C9 | **Light build → release** | Glow area grows ≈×9.5 over 2.1 s, accelerating after the first second; hard cut on the frame of maximum glow | Energy transfer into a new scene | [V:1ccYWJ t=18.87-21.0s] |
| EA-C10 | **Velocity hand-off** | Outgoing accelerates (3 → 7 px/f); incoming starts fast in the same direction and decelerates (34, 34, 31, 7, 4 px/f) | Match cuts on action (send, throw, whip) | [V:1CSXtQ t=17.60-17.93s] |

## 19.6 Overshoot, spring and settle policy

**Measured overshoot in the set**

| Element | Overshoot | Settle | Style | Evidence |
|---|---|---|---|---|
| All type and UI chrome in kivi, Wix, Bumper, HubSpot, solar | 0% | — | Premium | [V:1-6l8S §6], [V:15VhHR §6], [V:19NRDv §6], [V:1CSXtQ §6], [V:1Hcg3X §8] |
| Button release after a −20% press | 0% | 6 f | Monochrome | [V:1i2L14 t=33.9s] |
| Small pops entering oversized (dots at 2×, label at 1.25×) | 0% (settle from above, no undershoot) | 3-4 f | Monochrome | [V:1i2L14 t=3.567s, 17.50s] |
| Auto-fit line width | ≈3% (407 → 395 half-res px) | 5 f | Dark neon | [V:1ccYWJ t=36.2s] |
| Role words entering −6° and 4 px low | Settle from offset | 3-4 f | Dark neon | [V:1ccYWJ t=5.80-6.80s] |
| Tossed UI card, +15° entry | −3.5 to −4° (≈25% of the swing) | 16-22 f | Playful collage | [V:126cpH t=9.27-10.00s] |
| Illustrated phone wobble, ≈11° snap held ≈4 f | +5° (≈45%) | settled by ≈15.17 s (≈15-20 f) | Editorial 2.5D | [V:1Hcg3X t=14.50-15.17s] |

**Policy**

| Element class | Max overshoot | Spring form (mass 1) | Notes |
|---|---|---|---|
| Type (any size), logos, numbers | **0%** | stiffness 179, damping 26.8 (ζ = 1) | **References win** over [N]'s "type 0-3%, damping 15" |
| UI chrome: cards, buttons, menus, toggles, tooltips | **0%** | as above | Real software does not wobble (MP-U5) |
| Small UI pops (dots, chips, badges) | 0% overshoot; may **enter oversized** at 1.25-2× and settle in 3-4 f | E-SNAP bezier | [V:1i2L14] |
| Physical props in premium styles | ≤1.5% (imperceptible) | ζ ≥ 0.8 | Matches [N] M3 standard springs (ζ 0.9, 0.15%) |
| Physical props in playful styles | ≤25%, one cycle | stiffness 186, damping 10.9 (ζ ≈ 0.4) | [V:126cpH] |
| Illustrated character-like wobble | ≤45% on rotation only, ≤12° amplitude | stiffness 878, damping ≈15 (ζ ≈ 0.25, computed for 45%), settle ≈16 f | [V:1Hcg3X] editorial style only |
| Remotion default spring (stiffness 100, damping 10) | 16.3% | — | **Ban** for type and UI [N] |

Overshoot for a damping ratio ζ is exp(−ζπ / √(1 − ζ²)): ζ 0.4 → 25%, 0.5 → 16%, 0.6 → 9.5%, 0.7 → 4.6%, 0.8 → 1.5%, 0.9 → 0.2%, 1.0 → 0% (computed). Remotion's `damping` = 2ζ√stiffness with mass 1 (computed).

## 19.7 Anticipation: narrative, not cartoon

[N] recommends a classic wind-up (a 3-6 f, 2-5% pull-back before an object moves). **None of the eight references uses a wind-up on type or UI.** They anticipate with story cues instead. **References win.**

| Anticipation device | Numbers | Evidence |
|---|---|---|
| Cursor dwell before a press | 10 f (333 ms) | [V:126cpH t=10.20-10.53s] |
| Hover dwell (with a hover microinteraction) | 0.3-1.0 s; sparkle twinkles through ≈4 phases | [V:15VhHR t=2.9-3.97s] |
| Pointing cue before a whip | Cursor rotates ↖ → ↑ → ↗ → → over ≈11 f, pointing the whip's direction by its first frame | [V:1i2L14 t=5.5-5.87s] |
| One-frame stretch before a collapse | The box stretches taller for 1 f, then collapses to a dot in 1 f | [V:1i2L14 t=1.033-1.067s] |
| Exit drift | The card drifts up ≈5 px over 5 f before the cut | [V:1-6l8S t=67.50-67.67s] |
| Accelerating push into a drop | +10.6% over ≈1.7 s, ease-in, cut on the drop | [V:1CSXtQ t=11.3-13.03s] |
| Pre-loaded shape | The wipe's chevron sits at the frame edge ≈1 s before it moves | [V:19NRDv t=46.9-47.97s] |
| Light build | Glow area ×9.5 over 2.1 s | [V:1ccYWJ t=18.87-21.0s] |
| Silence before the hit | Near-silence 0.15-0.3 s before the logo; a 100 ms gap before the drop; a −35 dB dip 0.5 s before the click | [V:1-6l8S t=6.65-6.80s], [V:1CSXtQ t=12.85-12.95s], [V:126cpH t=10.0-10.5s] |
| Small counter-move before a smash cut | 4 f drift left, then a 1 f jump right | [V:1i2L14 t=10.47-10.60s] |

## 19.8 Ease by property

| Property | Entrance | Hold | Exit | Rules | Evidence |
|---|---|---|---|---|---|
| Position | E-OUT (objects), E-SNAP (hero words) | Linear drift 0.1-0.5% of frame per frame | E-EXIT into a cut; E-WHIP off-frame | Entrance offsets: words ≈4% W; titles rise 2-10% H; cards rise 5-8% H [V:1-6l8S], [V:1ccYWJ t=18.87s] | §19.2 |
| Scale | E-SNAP from 2-4×, or E-OUT from 0.9-0.96 | Push 1.05-1.15× per hold | E-EXIT shrink −13 to −30%, or E-PUNCH +18-33% | Interpolate in log space; never bounce scale on type | [V:19NRDv], [V:1CSXtQ], [V:1ccYWJ] |
| Rotation | E-OUT from ≤15° (tossed card) or 90° edge-on (card flip, 8 f) | None, or a ≤1° drift | E-GRAVITY with 10-20° (discard) | Type does not rotate in premium styles ("kinetic type never rotates" [V:1-6l8S §8]); one exception: role words at −6° [V:1ccYWJ] | [V:126cpH], [V:1ccYWJ t=16.10s], [V:1i2L14 t=13.50s] |
| Opacity | Linear or E-OUT over 2-8 f; text may enter at 25-60% and solidify in 2-4 f | 100% | Linear over 4-8 f, often with blur | No overshoot ([N] "effects" springs never overshoot) | [V:1-6l8S t=0.33s, 18.70s], [V:1ccYWJ t=33.20s] |
| Blur (defocus) | Blur → sharp over 2-5 f on labels; ≈20 f for an "AI result resolving" | 0 | Sharp → blur over 4-8 f (blur dissolve) | Pair with opacity; ≈8 px → 0 at 1080p [V:1Hcg3X rule 5, inferred value] | [V:1Hcg3X t=0.10s], [V:1-6l8S t=49.25s, 3.83s] |
| Colour | Linear ramps of 22-42 f (saturation bloom); AI gradient → final colour in 6-8 f | Static | Exponential dissolves: half in 3 f, settled 25 f | One colour means one state; return to final colour within 15 f | [V:1-6l8S t=18.57s], [V:15VhHR t=36.6s, 51.37s] |
| Mask / wipe edge | Ease-out (chevron: 185 → 30 px/f over 12 f); E-SETTLE for text-carrying panels | — | — | Feather 3-5% of frame width on organic masks [inferred]; state fills use a feathered leading edge [V:19NRDv t=20.37s] | [V:19NRDv t=47.97s], [V:1Hcg3X t=17.0s], [V:1i2L14 t=21.83s] |
| Camera | E-GLIDE (trucks), E-INOUT (pull-backs), E-HOP (target hops) | Linear push or drift | E-EXIT or E-PUNCH into a cut | One move per shot ([P] states it for generated clips; for animated camera it is [inferred]) | §18.6 |
| Motion blur | Off below ≈5% W per frame | Off | On (180° shutter) for whips and anything above ≈5% W/f | Pick one blur policy per film (MP-S) | [V:1ccYWJ §13], [V:19NRDv §6], [N] |

## 19.9 Universal, style-specific, experimental, avoid, SaaS

**Universal (EA-U)**
- **EA-U1.** Assign eases by role from the token set; never one curve for everything (MP-U15).
- **EA-U2.** Entrances: E-OUT by default, E-SNAP for hero words and oversize settles (atlas families).
- **EA-U3.** Moves ending on a cut: E-EXIT; moves leaving the frame: E-WHIP (atlas X-series, 9/9 accelerate).
- **EA-U4.** Travel between two on-screen points: E-GLIDE (asymmetric, peak at 20-37%).
- **EA-U5.** 0% overshoot on type and UI (§19.6).
- **EA-U6.** Anything that tracks a moving target uses exponential smoothing (E-LERP), not a re-triggered bezier [V:1-6l8S], [V:1CSXtQ t=4.5-7.2s] (caret-follow).
- **EA-U7.** Scale and zoom interpolate in log space [V:1ccYWJ].

**Style-specific (EA-S)**
- **EA-S1 Calm-Tech / Calm editorial AI:** E-LERP (k 0.2-0.25) and E-OUT; linear pushes; E-PUNCH only into cuts [V:1-6l8S]; [E] inferred the same family.
- **EA-S2 Night claim / Day proof:** E-SNAP for slams; drift → snap pull-backs; directional motion blur everywhere [V:19NRDv].
- **EA-S3 Editorial 2.5D:** r 0.85-0.92 arrivals, g 1.35-1.9 whips, E-SETTLE on text-carrying wipes, one snap-tilt spring on props [V:1Hcg3X].
- **EA-S4 Playful collage:** stepped 12 fps poses, E-GRAVITY falls with rotation, E-SPRING-P on tossed cards [V:126cpH].

**Experimental (EA-X)**
- **EA-X1.** E-ZOOM fly-through at ×1.3-1.4 per frame [V:1ccYWJ].
- **EA-X2.** Escalating moves (EA-C8) as the tour approaches its exit [V:1ccYWJ].
- **EA-X3.** Double-ease snap (EA-C5) [V:19NRDv].

**Avoid (EA-A)**
- **EA-A1.** AE default Easy Ease on entrances (26-39% error against every reference entrance).
- **EA-A2.** EXPO (0.16, 1, 0.3, 1) as the only entrance curve: it makes standard moves feel snapped (11.6-16.3% error on the OUT family).
- **EA-A3.** Remotion's default spring on type or UI (16.3% overshoot) [N].
- **EA-A4.** Linear moves that visibly start or stop on screen (MP-A13).
- **EA-A5.** Ease-out on an exit into a cut: the move dies just before the cut, so the cut feels late [V:1i2L14 §6] ("exits are never ease-out").

**Especially good for SaaS (EA-SaaS)**
- **EA-SaaS1.** UI response on E-SNAP/1-3 f inside a camera on E-GLIDE or E-INOUT: the "responsive product in a calm film" contrast (MP-U6).
- **EA-SaaS2.** Cursor on E-GLIDE with a 10 f dwell and a 1 f state confirmation (§18.3).
- **EA-SaaS3.** Counters on E-SNAP-L (≈70% of the range in the first ≈25% of the time) [V:19NRDv t=23.90-24.93s].
- **EA-SaaS4.** Text-to-UI pull-back on E-INOUT over 21-31 f [V:1CSXtQ t=8.0-9.03s].

## 19.10 Do / Don't

| Do | Don't |
|---|---|
| Hero word: 4× → 1× on E-SNAP over 8-10 f | Hero word: 4× → 1× on Easy Ease over 20 f |
| Card: E-OUT over 12-20 f, then a linear drift | Card: E-OUT that stops dead and sits still for 2 s |
| Cursor: E-GLIDE over 15-20 f, dwell 10 f, then click | Cursor: linear travel straight into an instant click |
| Exit into a cut: E-EXIT over 6-8 f, cut on the fastest frame | Exit into a cut: an ease-out that has already stopped before the cut |
| Line that grows word by word: E-LERP re-centre (k ≈ 0.22) | Line that grows word by word: a new 12 f bezier restarted at each word (visible hitches) |
| Fly-through: scale ×1.36 per frame (log-linear) | Fly-through: scale 1 → 20 linearly (appears to stall, then rush) |
| Tossed card in a playful ad: one −4° overshoot, settled by f20 | Tossed card in a premium SaaS film: any overshoot |

## 19.11 Where the references overrule generic advice (ease)

1. **Entrance curve.** [N]'s default entrance is M3 emphasized-decelerate (0.05, 0.7, 0.1, 1); [E] and Remotion's skill use EXPO (0.16, 1, 0.3, 1). Both fit only the references' SNAP family. For the far more common OUT family (cards, objects, re-centres), the references fit easeOutCubic (0.33, 1, 0.68, 1) within 4.0-5.7%, while the generic defaults miss by 11.6-18.4%. **References win**: two entrance tokens, not one.
2. **Exit curve.** [N]'s default exit, M3 emphasized-accelerate (0.3, 0, 0.8, 0.15), is confirmed: it is the best standard token on 6 of 9 measured exits. **Agreement.**
3. **Text springs.** [N] allows a 2.8% text spring. **References win**: 0% (§19.6).
4. **Anticipation.** [N]'s object wind-up is not used. **References win**: narrative anticipation (§19.7).
5. **Long settles.** No design-system token reproduces the references' reading wipe; use their own fitted (0.45, 0, 0, 1). **References extend** the generic set.

---

# Master §18. Recommended Animation Speeds

## 18.0 How to use the speed tables

- Every value is in frames at 30 fps and in milliseconds. For other frame rates keep the **milliseconds** constant and convert (§18.12).
- "Default" is the value to use when nothing else is known. "Range seen" is what the references actually did. Stay inside the range unless the style row in §18.11 says otherwise.
- Each speed names its ease token from §19.3. A speed without its ease is half a specification.
- The references are 16:9 except Chowdeck (9:16). Distances are given as % of the frame dimension in the direction of travel, so they transfer between aspect ratios [inferred].
- Tag in every row: the evidence that set the number. Rows marked [N] or [E] are generic or inferred and lose to a `[V]` value if they conflict.

## 18.1 Typography motion speeds (SP-T)

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

## 18.2 UI element and microinteraction speeds (SP-UI)

| Action | Default | Range seen | Ease | Evidence |
|---|---|---|---|---|
| Card or panel entrance | **12 f**, rise 5-8% H or slide ≈10% W, opacity in over 6-8 f | 6-25 f | E-OUT | [V:1-6l8S t=18.40s] (8 f fade), [V:1ccYWJ t=18.83s] (6 f, 7.5% H), [V:1ccYWJ t=12.17s] (25 f, 10.7% W) |
| Frosted ghost → opaque card | 6-8 f | — | E-OUT | [V:1-6l8S t=39.75s, 67.73s] |
| Card grows to fit new content (relayout) | 6 f; earlier content dims to ≈50% | — | E-OUT | [V:1-6l8S t=13.77-13.93s] |
| Shape morph (pill → card, icon → input, circle → pill, card → notification) | **7 f** | 6-13 f | E-INOUT (unfold) or E-OUT | [V:1-6l8S t=9.50-9.93s] (13 f), [V:15VhHR t=4.0-4.2s] (6 f), [V:1ccYWJ t=39.47s] (7 f), [V:126cpH t=11.03s] (7 f) |
| Popover, modal, chat card | 1-2 f | 1-2 f | step or E-SNAP | [V:15VhHR t=16.8s, 24.23s] |
| Dropdown open | **6 f**, rows 2 f apart | — | E-OUT | [V:1CSXtQ t=8.867-9.067s] |
| Toggle | **3 f** (track fills in one frame, knob settles ≈3 px) | 1-4 f | E-SNAP | [V:1CSXtQ t=10.233-10.333s], [V:19NRDv t=12.03s] (≈4 f) |
| Chip or label swap | 1 f | — | step | [V:1CSXtQ t=10.200s] |
| Button fill on press | 1 f, then widen 2 f | — | step | [V:15VhHR t=8.53s] |
| Button press / release | −15 to −20% in 3 f / back in 6 f, no overshoot | — | E-OUT both | [V:1i2L14 t=33.8-34.0s] |
| Press effect in a playful style | 5 f pixel-break, card jolts ≈2° | — | stepped | [V:126cpH t=10.53-10.70s] |
| Hover state | Lift ≈5 px (≈0.5% H) and brighten in ≈3 f | — | E-OUT | [V:1-6l8S t=36.45s] |
| Selection highlight / selection box | 4-5 f; box + contextual toolbar pop in 1-2 f | — | E-OUT / step | [V:1-6l8S t=20.43s], [V:15VhHR t=23.47s] |
| Status text swap in a fixed container | Fade-out 2 f, blank 1-3 f, fade-in 2 f (5-7 f); hold each status **≥1.0 s** | Holds 2 f-1.1 s (the short ones are flaws) | linear | [V:126cpH t=12.20-12.40s, §Rules 9] |
| Typing indicator dots | 2 f stagger; each enters at ≈2× and settles in 3-4 f | — | E-SNAP | [V:1i2L14 t=3.567-3.83s] |
| Caret blink | 0.3 s on / 0.3 s off (≈18 f period) | — | step | [V:1CSXtQ t=2.5-7.67s] [approx]; [E] 16 f [inferred] |
| Spinner / loading state | Swap glyph → spinner in one step | — | step | [V:1ccYWJ t=40.40s] |
| Page scroll | ≈1 FH in **12 f**, motion blur on frames 2-4 | 5-12 f | E-OUT | [V:15VhHR t=34.47s] |
| Section scroll-up | 5-8 f | — | E-OUT | [V:15VhHR t=21.35-21.63s] |
| List scroll then hold | 12 f ease-out, hold 1.4 s | — | E-OUT | [V:15VhHR t=46.37-48.2s] |
| Accelerating scroll into a transition | 8 → 24 px/f @720 (12 → 36 px/f @1080) | — | E-EXIT | [V:1CSXtQ t=20.40-21.47s] |
| Result cascade | **Empty hold 8-9 f**, then elements every 3-4 f, each fading 4-6 f; **13-22 f** total | 12-22 f | E-OUT | [V:1-6l8S t=22.87-23.87s, 67.73-68.50s] |
| Generated-site build | 12 f: clean plate 2 f, header wipe 2 f, title colour-settle 8 f, next tiers +2-4 f each | — | E-OUT | [V:15VhHR t=12.47-12.83s] |
| Table fill | Headers 2-3 f apart; columns lag 2-3 f; a 5×5 grid in ≈13 f (≈430 ms) | — | E-OUT | [V:1-6l8S t=67.87-68.50s] |
| Generated table rows | One row every 4-6 f (130-200 ms), cells typing L → R | — | E-OUT | [V:1CSXtQ t=20.40-21.47s] |
| Floating cards around a hero | 4 f stagger, each appearing whole in 1 f | 3-7 f | step | [V:15VhHR t=41.67-41.93s, 43.07s, 44.60s] |
| Streaming text, human speech pace | 4-7 words/s (one word per 4-7 f), each word 30% → 100% in 3-4 f | — | linear opacity | [V:1-6l8S t=9.7-13.7s, 18.70-20.45s] |
| Streaming text, machine pace | ≈15 words/s (2 f per word); code tokens one per 3-4 f | — | linear | [V:1-6l8S t=14.3-14.6s, 59.73-62.9s] |
| "AI is acting" sweep | 12 f gradient sweep, final colour in 6-8 f | 8-15 f | E-LINEAR then E-OUT | [V:15VhHR t=18.73-19.13s, 36.6-37.0s] |
| "AI generating" image | Duotone 7-11 f → 1 f switch → 6-12 f clean-up; or a 15-20 f develop; de-pixelate 8 f | — | step / exponential | [V:15VhHR t=8.63-12.47s, 25.77-26.43s, 40.33s] |
| "AI tool invoked" halo | Violet halo blooms in 3 f | — | E-OUT | [V:15VhHR t=23.83-23.93s] |
| Under-glow on an active component | Builds over ≈1 s | — | E-OUT | [V:1ccYWJ t=12.17-13.0s] |

## 18.3 Cursor and typing speeds (SP-C)

**Cursor**

| Phase | Default | Range seen | Ease | Evidence |
|---|---|---|---|---|
| Entry | Already on the first target, or rises in 4-6 f, or flies in 6-12 f | — | E-OUT | [V:1CSXtQ t=8.867s], [V:1-6l8S t=36.20s], [V:19NRDv t=11.10s, 24.20s] |
| Short hop (<20% W) | 8-12 f | 8 f | E-GLIDE | [V:126cpH t=9.93-10.20s] |
| Across the UI (20-50% W) | **16 f**, peak ≈80 px/f @1080 on frame 3-4 | 15-20 f | E-GLIDE | [V:15VhHR t=2.5-3.07s] |
| Deliberate travel (the viewer pre-reads the target) | 25-27 f | — | E-GLIDE | [V:1CSXtQ t=9.2-10.1s], [V:1i2L14 t=32.9-33.73s] |
| Dwell before the press | **10 f** | 10 f-1.0 s | — | [V:126cpH t=10.20-10.53s], [V:15VhHR t=2.9-3.97s] |
| Press | 1 f pressed state, or −15-20% in 3 f | 1-3 f | E-SNAP | [V:1CSXtQ t=10.233s], [V:1i2L14 t=33.8s] |
| Release | 6 f, no overshoot | — | E-OUT | [V:1i2L14 t=33.9-34.0s] |
| Consequence after the press | **3-8 f** | 3-10 f | — | [V:1CSXtQ t=10.367s] (cut 3 f after the fill), [V:19NRDv §9] (reaction in 6-8 f), [V:15VhHR t=12.47s] (cut 8 f after the click) |
| Size | Native OS arrow ≈2% FH (≈22 px @1080) | — | — | [V:15VhHR §9]; [E] 44 px [inferred]; a brand-coloured 3D cursor is a style choice [V:19NRDv], [V:1-6l8S] |

**Typing**

| What is typed | chars/s | Evidence |
|---|---|---|
| A prompt or question the viewer must read (wide shot) | **15-20** | [V:15VhHR t=4.2-6.57s] (≈19), [V:126cpH t=1.73-2.07s] (≈15); matches reading rates of 17-20 chars/s [N] |
| The key noun phrase, or any extreme close-up | **7-9** (first letters at ≈4) | [V:15VhHR t=6.57-8.6s] (7-8), [V:1CSXtQ t=3.97-5.3s] (≈9), [V:1CSXtQ t=13.28-14.03s] (≈4) |
| Known filler or text already read | 25-35 | [V:1CSXtQ t=2.53-2.87s] (≈35), [V:15VhHR t=24.23s] (≈25) |
| Statement type-on that then holds | 40-55 | [V:1ccYWJ t=34.33-38.0s], [V:15VhHR t=4.47-5.13s] (≈53, with a gradient leading edge) |
| URL in the CTA | ≈23 | [V:1ccYWJ t=39.73-40.53s] |
| Pauses | 170-200 ms between typed words; 0.9-1.1 s at phrase breaks | [V:1CSXtQ t=0.60-1.47s, 2.87-3.97s, 5.3-6.27s] |

**References win** over [E]'s inferred "2 characters per frame" (60 chars/s) for prompt typing: no reference types a readable prompt faster than 35 chars/s; 40-55 chars/s appears only for statements that hold afterwards.

## 18.4 Data, chart and counter speeds (SP-D)

| Action | Default | Range seen | Ease | Evidence |
|---|---|---|---|---|
| Counter to a KPI / percentage | **24-31 f**, ≈70% of the range in the first ≈25% of the time, then park a cursor or highlight on the final value | — | E-SNAP-L | [V:19NRDv t=23.90-24.93s]; [E] 24 f EXPO [inferred] |
| Counter as a tally (volume) | Linear with a hard stop: ≈1 s for 2 digits, ≈1.9 s for 4 digits | 29-56 f | E-LINEAR | [V:1ccYWJ t=9.93-11.80s, 14.73-15.70s] |
| Line-chart draw | 26 f per series, series 4-8 f apart | — | E-LINEAR (≈) | [V:19NRDv t=27.63-28.50s] |
| Bar rise in response to a toggle | ≈7 f, starting on the toggle frame | — | E-OUT | [V:19NRDv t=12.03-12.27s] |
| State fill ("matched", "done") | 4-5 f, L → R, feathered edge | — | E-LINEAR wipe | [V:19NRDv t=20.37-20.50s] |
| Status colour per system state | Colour flips in 1-2 f; ≈1.7-2.5 s between states | — | step | [V:19NRDv t=40.8s, 42.5s, 45.0s] |
| Gauge | Continuous fill ≈6 f E-OUT; discrete states (empty / full / alert) snap in 0 f, ideally on a beat | — | E-OUT / step | [V:1Hcg3X t=20.60-21.53s, Study H] |
| Route / progress-path draw | Leg by leg: ≈28 f, a 5 f pause at the corner, ≈16 f; reach the destination ≈0.35 s before the cut | ≈1.7 s total | E-OUT per leg | [V:126cpH t=11.6-13.23s] |
| Map settle | Arrive tilted 10-15°, upright over ≈1 s; then pan ≈8% H per second | — | E-OUT, then E-LINEAR | [V:126cpH t=11.4-13.5s] |
| Pin pop | 3 f with a radial glow | — | E-SNAP | [V:126cpH t=11.60-11.70s] |
| Data-transfer particles | 200-300 discs, sweep L → R in 0.95 s (≈525 px/s @1080) | — | E-LINEAR sweep | [V:1CSXtQ t=19.00-19.95s] |
| Dashboard reveal | Macro chart draws (26 f) → 2-3 f pull-back snap to the full dashboard → ≈1 s yaw recede | — | E-SNAP snap | [V:19NRDv t=27.63-29.95s] |

## 18.5 Object, icon and logo speeds (SP-O)

| Action | Default | Range seen | Ease | Evidence |
|---|---|---|---|---|
| Icon row entrance | 10 f fade + ≈6 px rise, **2-3 f stagger** | 8-14 f | E-OUT | [V:1-6l8S t=34.50s] (the 0-stagger version is a flaw) |
| Icon micro-animation loop | 10-15 f per icon, one icon at a time, in sequence | — | per Lottie | [V:1ccYWJ t=12.17-14.73s] |
| Icon flip-in | ≈2 f | — | step | [V:126cpH t=2.83s] |
| Object slide-in | ≈82% by 12 f, ≈90% by 16-17 f, fully settled by 25 f (r ≈ 0.85; computed from the measured series) | — | E-OUT | [V:1Hcg3X t=5.43-6.27s] |
| Object drop / discard | 6-14 f, velocity ×1.2 per frame, rotate 10-90° | — | E-GRAVITY | [V:126cpH t=7.27-7.73s], [V:1i2L14 t=13.50-13.93s] |
| Decaying bounce (physical prop) | Landing intervals 0.47, 0.47, 0.37, 0.37 s, then rest | — | E-GRAVITY / E-OUT | [V:1Hcg3X t=6.87-8.53s] |
| Prop tilt and settle | Snap 10-14° in 1-3 f, return in ≈12 f | — | E-OUT | [V:1Hcg3X t=3.43-3.83s] |
| Shape-matched swap (flat → real) | 0 f swap, then a physical reaction within ≈0.6 s | — | step | [V:126cpH t=6.77s, 7.70s, 8.43s] |
| Implosion into the logo | 8 f collapse + ≤12 sparks over 10 f + a soft halo | — | E-EXIT then burst | [V:19NRDv t=55.00-55.60s] |
| Logo build | Stroke-draw 5 f → fill from a dot 8 f → sheen sweep 14 f | — | E-OUT | [V:19NRDv t=3.62-4.70s] |
| Wordmark reveal | L → R wipe 7 f, or letters 2 f apart | — | E-OUT | [V:1ccYWJ t=2.73-2.97s], [V:19NRDv t=61.47-61.80s] |
| Co-brand lockup | Halves converge 20-40 px in 8 f while fading in from 50-80%; colour half finishes ≈5 f later | — | E-OUT | [V:1CSXtQ t=10.367-10.63s] |
| Tonal "materialise" | Silver ghost → brand colour over ≈42 f, ending in a L → R tonal sweep | — | E-LINEAR | [V:1-6l8S t=6.2-7.6s] |
| Beat-step on a held logo | +15% in 4 f, then +5% in 3 f on the next beat | — | E-OUT | [V:1ccYWJ t=3.47s, 4.03s] |
| Wordmark → symbol cross-fade | 9-10 f each way, ≈2 f overlap | — | linear | [V:1-6l8S t=72.27-72.83s] |
| QR / CTA card | Scale from a dot in 8 f, scan line ≈5 f | — | E-SNAP | [V:19NRDv t=62.27-62.60s] |
| End-card hold | **0.8-2.2 s** fully still; ≥4 s if a URL or QR must be scanned | 0.8-5.7 s | — | [V:1i2L14], [V:1CSXtQ], [V:15VhHR], [V:19NRDv t=61.47-67.2s] |

## 18.6 Camera speeds (summary; the full camera library is a separate part) (SP-K)

| Move | Default | Range seen | Ease | Evidence |
|---|---|---|---|---|
| Hold push (calm) | **1.05-1.15× over the hold**, ≈6-12% per second | 1.07-1.29× | E-LINEAR | [V:1-6l8S t=72.27-75.53s] (1.15× / 2.5 s), [V:1CSXtQ t=11.3-13.0s] (+10.6% / 1.7 s), [V:19NRDv t=60.10-61.20s] (+8.9% / 1.1 s) |
| Hold push (energised) | 20-30% per second | — | E-LINEAR or decelerating | [V:1-6l8S t=8.20-9.47s] (1.27× / 1.3 s), [V:1-6l8S t=71.10-72.27s] (+29% / 1.17 s, decelerating) |
| Lateral truck | 40% W in ≈26 f (0.85 s), 2-3 f hold first | — | E-GLIDE | [V:1-6l8S t=35.47-36.4s] |
| Caret-follow truck | Accelerates 6 → 18 px/f (1138 px frame), keeping the caret in the right third | — | E-LERP | [V:15VhHR t=6.57-8.6s] |
| 2D pull-back reveal | ×0.75 over 21-31 f, or ×0.79 in a 6 f snap | — | E-INOUT / E-SNAP | [V:1CSXtQ t=8.0-9.03s], [V:1i2L14 t=4.10-4.30s] |
| Screen-to-world 3D pull-back | ×0.57 in 10 f, then a further ×0.56 over ≈20 f (×0.32 in ≈1 s) | — | E-INOUT, front-loaded | [V:1CSXtQ t=18.00-19.03s] |
| Push through a layer | 9 f (tables), or ×2.3 in 15 f through particles | — | E-OUT | [V:19NRDv t=18.25-18.55s], [V:1CSXtQ t=19.95-20.47s] |
| Push into an action | 130% over 0.5 s; or a 3 f accelerating ×1.5 zoom into a cut-in | — | E-INOUT / E-EXIT | [V:15VhHR t=28.0-28.5s, 16.53-16.60s] |
| Whip | 6-11 f, reaching 13-20% W per frame, blur on the last 2 f | — | E-WHIP | [V:1i2L14 t=5.87-6.13s], [V:1Hcg3X t=1.20-1.47s, 6.47-6.83s] |
| Orbit step | 9-12 f per step, ≈2 beats apart | — | E-HOP | [V:19NRDv t=30.9s, 32.2s, 33.4s] |
| Gallery hop-and-hold | Glides 17-32 f, holds 7-20 f, opening zoom 2.27× over 32 f | — | E-HOP | [V:1ccYWJ t=27.13-33.2s] |
| Tilt through a layer | ≈1.6 frame-heights in 30 f + 10 f settle | — | E-INOUT | [V:126cpH t=15.20-16.53s] |
| Vertical push between shots | 1 FH in 11 f, peak ≈4.2 FH/s, ≈10% H directional blur | — | E-INOUT | [V:126cpH t=2.53-2.90s] |
| Fly-through zoom | ×1.36 per frame for ≈10 f | — | E-ZOOM | [V:1ccYWJ t=0.87-1.20s] |
| Lens-distortion zoom-out | ≈2× → 1× in ≈20 f; bulge gone in ≈6 f | — | E-OUT | [V:1ccYWJ t=7.30s, 27.13s] |

## 18.7 Transition speeds (summary; the full transition library is a separate part) (SP-TR)

| Transition | Default | Range seen | Evidence |
|---|---|---|---|
| Hard cut | 0 f, optionally on 1 empty frame | 0-1 f | [V:1Hcg3X t=11.50s, 20.50s, 28.43s, 30.60s] |
| White bloom / light wash | Bloom **3-7 f**; wash ≈18 f; one pure-white frame | 3-18 f | [V:1-6l8S t=1.50s, 36.95s, 46.0s, 62.90s, 7.967s] |
| Blur dissolve | 4-8 f | 4-8 f | [V:1-6l8S t=3.83s], [V:1i2L14 t=0.63s], [V:1CSXtQ t=21.47s] |
| Cross-fade | 9-10 f each way | — | [V:1-6l8S t=72.27s] |
| Dim-to-texture | Previous shot to 15% in 3 f | — | [V:1ccYWJ t=9.833s] |
| Shape-mask wipe | Text exit 7 f + wipe ≈12 f (ease-out), ≈20 f in all | 18-22 f | [V:19NRDv t=47.83-48.50s] |
| Blinds / panel wipe | 4 strips, 1 f apart | — | [V:1i2L14 t=14.50-14.60s] |
| Split-screen panel wipe (carries new text) | ≈72 f | — | [V:1Hcg3X t=17.0-19.4s] |
| Band push | 20-32 f | — | [V:1Hcg3X t=19.47-20.53s] |
| Burst / iris | 6-7 f (area ×2-2.5 per frame) | — | [V:1i2L14 t=21.83s, 24.25s] |
| Object wipe | ≈8-10 f | — | [V:1Hcg3X t=2.93-3.30s], [V:1ccYWJ t=16.10-16.37s] |
| Light-source match | Shrink to a point in 2 f, hold 2 f, cut | — | [V:1Hcg3X t=3.30-3.43s] |
| Flash frames | 3 f + 2 f, **once per film**; never more than 3 flashes per second [N] | — | [V:1Hcg3X t=12.83-12.97s] |
| Colour dissolve in a logo field | Half in 3 f, strong colour gone in 8 f, settled 25 f | — | [V:15VhHR t=51.37-52.20s] |
| Organic ink-bloom mask | ≈20-27 f | — | [V:1-6l8S t=38.85-39.75s] (≈20 f in the shot table, ≈27 f in the transition log) |
| End fade | 14-33 f | — | [V:1-6l8S t=76.80-77.27s], [V:1ccYWJ t=43.10-44.20s] |

## 18.8 Holds, reading time and event density (SP-H)

| Parameter | Default | Evidence and notes |
|---|---|---|
| Read time after text lands | max(1.0 s, 0.33 s × words + 0.4 s, characters ÷ 17) | [N] (BBC/Netflix-derived). Matches the references' statement cards: 1.2-1.9 s for 1-6 words [V:1-6l8S §11]; 0.6-1.6 s fully legible [V:19NRDv §8] |
| 1-2-word punch cards in a fast section | **10-15 f** if the word is ≥10% H and alone in the frame | [V:1ccYWJ t=38.0-39.07s] (10-12 f), [V:1ccYWJ t=5.43-7.30s] (15 f). **References win** over [N]'s 1.0 s floor for this case only |
| Settled 2-3-word line | ≥10 f | [V:1i2L14 §8] (10-23 f) |
| Any message of 3+ words | Never below the [N] formula | The references' sub-0.5 s holds are flagged as flaws: the 6-word payoff block readable ≈0.4 s [V:1Hcg3X t=29.80-30.2s]; even the 2-word "been busy?" at ≈0.45 s is called out [V:126cpH t=2.07-2.50s] |
| UI that must be read | Shot ≥1.8 s | [V:126cpH rule 15]; demo shots 2.6-6.3 s [V:1-6l8S §11] |
| Long proof shot | An in-shot beat (snap, orbit step, push-through, punch-in) every 0.8-1.5 s | [V:19NRDv rule 12] |
| UI event density in a demo shot | About one UI event per 0.5 s | [V:15VhHR §11] |
| Whole-film event density | One significant motion event per 0.7-0.85 s; burst-and-breathe cycle of 2-4 s | [V:126cpH §Transitions], [V:1i2L14 §11] |
| Breather before the CTA | 10-15% of runtime at <10% of peak motion energy (P08 ER-U11) | [V:1i2L14 rule 14] (4.7 s of 35 s at ≈1/30 of peak energy) |
| Breath frames | 1 f clean plate before a cut; 3-4 white frames before a logo; up to ≈9-10 f of empty background before a new idea | [V:1Hcg3X rule 2], [V:1-6l8S t=6.0-6.1s, 4.1-4.45s], [V:1ccYWJ t=22.333-22.63s] |
| Static-layout reading hold | ≤1.0 s on a near-empty brand frame (camera and line locked, one small element may keep moving); fully dead frame ≤≈0.65 s | [V:15VhHR t=0.63-1.43s, 15.9-16.5s] |
| End-card still | 0.8-2.2 s | §18.5 |

## 18.9 Velocity limits (SP-V)

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

## 18.10 Tempo mapping (BPM → frames)

Frames per beat at 30 fps = 1800 ÷ BPM.

| BPM | Frames per beat | Eighth note | Word interval | Swap / card interval | Camera step (2 beats) | Seen in |
|---|---|---|---|---|---|---|
| 86 | 20.9 | 10.5 | 10 f | 21 f | 42 f | [V:1CSXtQ] |
| 95.7 | 18.8 | 9.4 | 9 f | 19 f | 38 f | [V:126cpH] |
| 100 | 18.0 | 9.0 | 7-10 f (measured) | 11-16 f (measured swaps) | ≈38 f (measured orbit steps, ≈1.25 s) | [V:19NRDv] |
| 112 | 16.0 | 8.0 | 8 f | 15 f (measured role swaps) | 32 f | [V:1ccYWJ], [V:15VhHR] |
| 127 | 14.2 | 7.1 | 7 f | 14 f | 28 f | [V:1-6l8S] (back-half cuts on the eighth-note grid) |
| 64.6 measured (129 half-time [inferred]) | 27.9 (14.0 at 129) | 7.0 at 129 | 7 f | 14 f or 28 f | 28 f | [V:1Hcg3X] |

Cells not marked "measured" are computed from 1800 ÷ BPM, not observed. Rules: word starts on eighth notes, swaps and card changes on beats, camera steps every 2 beats [V:19NRDv §11], [V:1ccYWJ §11]. The picture lands 0-2 f before the beat (MP-U14). Where the edit is story-led rather than beat-cut (4 of 8 references), sync only the section changes and the hero hits [V:15VhHR §11], [V:126cpH §Editing].

## 18.11 Speed by style and by format

**By style** (style IDs from §5.2)

| Style | Word entrance | Text exit | UI pop | Hold life | Type-card hold | Proof-shot length | Signature speed |
|---|---|---|---|---|---|---|---|
| MP-S1 Calm-Tech | 6 f (+3-8 f stagger), statements rise in 8-14 f (SP-T0) | 4-6 f blur or whip | 3-6 f | Push 1.07-1.29× | 1.2-1.9 s | 2.6-6.3 s | Punch +18-33% in 3-8 f |
| MP-S2 Night claim / Day proof | 4-7 f, 7-10 f apart; slam 8-13 f | 2-7 f smear | 4-5 f fills | Pull-back 1-3.5%/f | 0.6-1.6 s legible | 2-6 s with beats every 0.8-1.5 s | Slam 64% in frame 1 |
| MP-S3 Prompt-native | Typed (9-35 chars/s) | Last 6-10 f accelerate | 1-6 f | Scale drift 13-24% per card | 1.1-2.2 s | 3.7-8.2 s continuous takes | Toggle 3 f → cut 3 f later |
| MP-S4 Brand-bookended montage | 3-6 f after a 1 s read | Into cuts at speed | 1-2 f | Layout locked 1.0 s on brand frames | ≥1.0 s locked | 0.23-3.7 s (fast montages at 0.64 s ASL) | Click → suck-out → result in 8 f |
| MP-S5 Editorial 2.5D | Blur-fade 2-5 f; lines 5-9 f apart | 6-11 f whip | 0 f state snaps | Drift 0.3-0.5% per frame | ≥1.0 s (its 0.4 s payoff is a flaw) | 1.4-4.7 s | Arrival → drift → whip |
| MP-S6 Dark neon reel | Snap 6 f or settle 18 f; type-on 40-55 chars/s | Suck-in 8-19 f | 3 f dims | Aurora always moving | 10-15 f for 1-2 words | 2.2-6.1 s | Zoom-through ×1.36/f |
| MP-S7 Monochrome brand-system | 2-3 f stagger, 6-12 f snaps | 8-9 f whip, 13 f drop | 3-4 f oversize settle | 0.3-1 px/f | 10-23 f (≤3 words) | 0.7-4.7 s | Kinetic cycle ≈1 s per sentence |
| MP-S8 Playful collage | 0-4 f pops on twos | Gravity 6-14 f | 5 f press effect | Boil on twos | ≥0.7 s | 0.7-2.6 s | Tossed card settle 16-22 f |

**By format** [inferred unless tagged]
- Keep durations (ms) identical across 16:9, 9:16 and 1:1 cuts; scale travel distances as % of the frame dimension in the direction of travel, not in pixels.
- A vertical move on a 1080×1920 frame covers 1.78× more pixels per % than on 1920×1080; keep peak speeds inside SP-V in % terms, which the 9:16 reference does (1 FH in 11 f) [V:126cpH t=2.53s].
- In feeds, the hook text must be on screen at frame 0 [N], and the first change must come within ≈0.5 s [V:126cpH rule 1] (its 0.73 s static open is flagged as too long).

## 18.12 Frame-rate rules

| Rule | Detail | Evidence |
|---|---|---|
| Design in milliseconds, convert to frames | 24 fps: frames × 0.8; 25 fps: × 0.833; 60 fps: × 2 | [inferred] |
| Render at the delivery frame rate | Three references show judder from duplicating frames: every 6th frame (25 → 30) or every 5th (24 → 30) | [V:15VhHR], [V:1CSXtQ], [V:1Hcg3X] |
| AI-generated footage | Veo 3.1 clips are 24 fps [P]. Either finish the film at 24 fps, or conform the clips with optical-flow retiming. Never pad to 30 by duplicating frames | [P]; conform method [inferred] |
| Animate on twos only on purpose | 12 fps poses on a 24/30 base for illustration and collage; camera, live action and UI stay on ones | [V:126cpH]; [S:Figma] (Config film at 15 fps) |
| 1-frame values at higher frame rates | A "1 f" state change at 30 fps is 2 f at 60 fps; keep it at ≈33 ms, do not stretch it | [inferred] |

## 18.13 Universal, style-specific, experimental, avoid, SaaS (speeds)

**Universal (SP-U)**
- **SP-U1.** Text entrances per SP-T0: words 4-7 f; statements 8-14 f; hero slams 8-13 f.
- **SP-U2.** Text exits per SP-T0: 4-6 f for lines and words, 4-8 f only for whole-card exits; arrivals finish 1.5-3× slower than exits (MP-U3).
- **SP-U3.** UI state changes 1-3 f; menus 6 f; popovers 1-2 f (SP-UI).
- **SP-U4.** Staggers: 1-2 f strips, 2 f chips and rows, 3-4 f cards and lines, 5-9 f title lines, 7-10 f spoken-rhythm words (MP-U7).
- **SP-U5.** Cursor 15-20 f travel, 10 f dwell, 3-8 f to consequence (SP-C).
- **SP-U6.** Holds follow the read-time formula except 1-2-word punch cards (SP-H).
- **SP-U7.** Hold push 1.05-1.15× per hold; read drift ≤0.5% of frame per frame (SP-K, SP-V).
- **SP-U8.** Unblurred motion ≤5% W per frame (SP-V).

**Style-specific**: §18.11 table.

**Experimental (SP-X)**
- **SP-X1.** 1-2-word punch cards at 10-12 f each, three in a row before a CTA [V:1ccYWJ].
- **SP-X2.** Scatter-swap-converge at ≈1 s per sentence [V:1i2L14].
- **SP-X3.** Machine-speed streaming (2 f per word) right after human-speed input, to show AI speed [V:1-6l8S].

**Avoid (SP-A)**
- **SP-A1.** Readable prompts typed faster than 35 chars/s (SP-C).
- **SP-A2.** Holding a status, payoff or 5-word message for under 0.5 s (MP-A9).
- **SP-A3.** Pixel or glitch builds over ≈12 f (MP-A4).
- **SP-A4.** Unblurred pans above ≈5-10% W per frame (MP-A1).
- **SP-A5.** Frame-duplicating conversions (§18.12).
- **SP-A6.** Static openings longer than 0.5 s in feed formats [V:126cpH].

**Especially good for SaaS (SP-SaaS)**
- **SP-SaaS1.** Prompt typing at 15-20 chars/s with the key phrase slowed to 7-9 chars/s and a 0.9-1.1 s pause before it [V:1CSXtQ], [V:15VhHR].
- **SP-SaaS2.** 8-9 f empty result hold, then a 13-22 f reading-order cascade [V:1-6l8S].
- **SP-SaaS3.** Toggle 3 f → reaction 6-8 f → cut 3 f after the state lands [V:1CSXtQ], [V:19NRDv].
- **SP-SaaS4.** KPI counter 24-31 f on E-SNAP-L with a cursor parked on the final value [V:19NRDv].

**Do / Don't**

| Do | Don't |
|---|---|
| Type the prompt at 18 chars/s, slow to 8 chars/s on "skincare brand" | Type the whole prompt at 60 chars/s |
| Hold the empty result card 8-9 f, then cascade | Show the finished result on the cut frame |
| Pop a modal in 1-2 f | Scale a modal in over 20 f with a bounce |
| Count a KPI 84 → 100% in 31 f, fast then slow | Count it linearly over 3 s |
| Give a 2-word punch card 12 f in a fast climax | Give a 6-word line 12 f |
| Hold the end card 0.8-2.2 s still | Fade the logo out while it is still settling |

---

# Phase 3. Motion-Language Library

## L.0 How the entries are laid out

Each entry gives: **What** it is · **When to use** · **Why it works** · **How fast** (frames at 30 fps, ms, and the ease token from §19.3) · **Reads premium when** · **Reads amateur when** · **Evidence** · **Tier** (U = universal, S = style-specific, X = experimental, A = avoid, SaaS = especially good for SaaS) and **n/8** (how many of the user's references show it, from the matrix below).

## L.1 Coverage matrix

● = measured in that reference · ○ = partial or weak form · – = absent.
Columns: kivi [1-6l8S], Chowdeck [126cpH], Wix [15VhHR], Bumper [19NRDv], HubSpot [1CSXtQ], Solar [1Hcg3X], Lottieicon [1ccYWJ], NOSTRA [1i2L14].

| Entry | Pattern | kivi | Chow | Wix | Bump | HubS | Solar | Lottie | NOSTRA | ● count |
|---|---|---|---|---|---|---|---|---|---|---|
| ML-01 | Slow premium easing (long settle) | ● | ○ | ● | ○ | ● | ● | ● | ○ | 5 |
| ML-02 | Snappy UI motion | ● | ● | ● | ● | ● | ○ | ● | ● | 7 |
| ML-03 | Overshoot | – | ● | ○ | – | – | ● | ○ | ○ | 2 |
| ML-04 | Elastic / bounce | – | ○ | – | – | – | ● | – | ○ | 1 |
| ML-05 | Anticipation | ● | ● | ● | ● | ● | ○ | ● | ● | 7 |
| ML-06 | Stagger | ● | ● | ● | ● | ● | ● | ● | ● | 8 |
| ML-07 | Cascading UI | ● | ○ | ● | ● | ● | ○ | ● | ○ | 5 |
| ML-08 | Sequential reveals | ● | ● | ● | ● | ● | ● | ● | ● | 8 |
| ML-09 | Scale transitions | ● | ● | ● | ● | ● | ● | ● | ● | 8 |
| ML-10 | Rotation transitions | – | ● | ● | ● | ○ | ● | ● | ● | 6 |
| ML-11 | Depth transitions | – | ○ | ○ | ● | ● | – | ● | ● | 4 |
| ML-12 | Fly-throughs | – | – | – | ○ | ● | – | ● | ● | 3 |
| ML-13 | UI cards in 3D space | – | – | ● | ● | ● | – | ● | ● | 5 |
| ML-14 | Perspective shifts | – | ○ | ● | ● | ● | – | ○ | ● | 4 |
| ML-15 | Floating interfaces | ● | ○ | ● | ● | ○ | – | ● | ○ | 4 |
| ML-16 | Kinetic typography | ● | ● | ● | ● | ● | ● | ● | ● | 8 |
| ML-17 | Object interaction | ○ | ● | ○ | ● | ● | ● | ○ | ● | 5 |
| ML-18 | Cursor animation | ● | ● | ● | ● | ● | – | – | ● | 6 |
| ML-19 | Scroll animation | – | – | ● | ○ | ● | ○ | ● | ○ | 3 |
| ML-20 | Dashboard animation | ○ | ○ | ○ | ● | ○ | ○ | ○ | – | 1 |
| ML-21 | Data visualisation | ○ | ● | – | ● | ○ | ● | ● | ○ | 4 |
| ML-22 | Chart animation | – | – | – | ● | – | ● | – | – | 2 |
| ML-23 | Icon animation | ● | ○ | ○ | ● | ○ | ● | ● | ● | 5 |
| ML-24 | Microinteractions | ● | ● | ● | ● | ● | ○ | ● | ● | 7 |
| ML-25 | Product interaction demos | ● | ● | ● | ● | ● | – | ○ | ○ | 5 |
| ML-26 | Shape morph / shared element (discovered) | ● | ● | ● | ● | ● | ● | ● | ● | 8 |
| ML-27 | Light as motion (discovered) | ● | ○ | ● | ○ | ○ | ● | ● | ○ | 4 |
| ML-28 | Colour-state motion (discovered) | ● | ○ | ● | ● | ○ | ● | ○ | ● | 5 |
| ML-29 | Perpetual ambient motion (discovered) | ● | ● | ○ | ● | ● | ● | ● | ● | 7 |
| ML-30 | Animating on twos (discovered) | – | ● | – | – | – | – | – | – | 1 |
| ML-31 | Particles (discovered) | – | – | – | ● | ● | ● | – | ○ | 3 |

Weakest coverage: dashboards (1 full example), charts (2), elastic/bounce (1), on-twos (1). Rules for those rows lean on fewer measurements and are tiered accordingly.

---

### ML-01. Slow premium easing (long settle) — Tier U · 5/8
- **What.** A move whose tail keeps decelerating long after most of the distance is covered: 90% in the first third to half, then a soft creep to rest. Not a slow move overall.
- **When to use.** Big reveals that should feel expensive (horizon rises, recap strips, logo fields); panels or wipes that carry new text (the tail is reading time); camera landings after a whip.
- **Why it works.** The eye gets the information early (most of the travel happens fast) and then sees the object "settle" as if it has mass and friction. It keeps the frame alive during reading without a visible stop.
- **How fast.** 45-72 f (1.5-2.4 s) with E-SETTLE (0.45, 0, 0, 1) for wipes and panels; 50-70 f with E-SNAP-L (0, 0, 0, 1) for rises; ≈16 f E-OUT for a camera landing; r ≈ 0.88-0.92 if keyed by hand (§19.4).
- **Reads premium when.** The tail is continuous (no stop then restart), and nothing else competes for attention during the tail.
- **Reads amateur when.** The whole move is slow and symmetric (a 2 s Easy Ease): the object dawdles at both ends and the viewer waits for it.
- **Evidence.** Panel wipe 49% W in 2.4 s, peak 4% W/f at 17.67 s, fitted (0.45, 0, 0, 1) [V:1Hcg3X t=17.0-19.4s]; climax sun 90% in ≈0.9 s, settled 1.7 s [V:1Hcg3X t=30.63-32.3s]; recap strips ×0.92 per frame, 2.3 s [V:1Hcg3X t=32.53-34.87s]; carousel landing ≈16 f [V:15VhHR t=15.27-15.87s]; toolbar 25 f [V:1ccYWJ t=12.17-13.0s]; 3D pull-back decelerating ≈20 f [V:1CSXtQ t=18.33-19.03s]; red → navy dissolve settled in 25 f [V:15VhHR t=51.37-52.20s].

### ML-02. Snappy UI motion — Tier U, SaaS · 7/8
- **What.** UI elements change state at real software speed: 1-3 f state changes, 6 f menus, 1-2 f popovers.
- **When to use.** Every button, toggle, chip, dropdown, popover, selection and status change in a product demo.
- **Why it works.** It matches what the viewer's hand expects from real software, so the UI reads as the real product. Inside a slow camera it also gives the "calm film, responsive product" contrast (MP-U6).
- **How fast.** Toggle 3 f; label swap 1 f; button fill 1 f + 2 f widen; popover 1-2 f; dropdown 6 f (rows 2 f apart); press 3 f, release 6 f; hover lift ≈3 f; E-SNAP or a step (§18.2).
- **Reads premium when.** Each change is crisp, confirmed in one frame, and caused by a visible action.
- **Reads amateur when.** Menus scale in over 20 f with a bounce, or everything pops with no cause.
- **Evidence.** [V:1CSXtQ t=8.867-10.333s], [V:15VhHR t=8.53s, 16.8s, 24.23s], [V:1i2L14 t=33.8-34.0s], [V:19NRDv t=12.03s, 20.37s], [V:1-6l8S t=36.45s], [V:126cpH t=10.53s], [V:1ccYWJ t=9.833s]; Carbon fast-01 = 70 ms for toggles [N].

### ML-03. Overshoot — Tier S (playful only); A on type and UI · 2/8
- **What.** The element passes its rest value and returns.
- **When to use.** Only on physical props or tossed objects in playful styles (MP-S8, MP-S5), to show weight and casualness. Never on type, logos or UI chrome in premium work.
- **Why it works (where it works).** A single, damped overshoot reads as "a card was tossed onto the table": human and casual. More than one cycle reads as a toy.
- **How fast.** Tossed card: +15° entry, ≈90% upright on the next pose (3 f), overshoot to −3.5/−4° (≈25% of the swing), settled by 16-22 f; E-SPRING-P (mass 1, stiffness 186, damping 10.9). Prop wobble: ≤12° snap, one ≤+5° overshoot, ≈15 f (§19.6).
- **Reads premium when.** One cycle, small amplitude, on an object that plausibly has mass.
- **Reads amateur when.** Text springs into place; every element bounces; Remotion's default spring (16.3% overshoot) is left on.
- **Evidence.** [V:126cpH t=9.27-10.00s]; [V:1Hcg3X t=14.50-15.17s]; 0% on all type and UI in 7/8 references (MP-U5); [N] spring table. **References win** over [N]'s 2.8% text spring.

### ML-04. Elastic / bounce — Tier S (editorial and playful props only) · 1/8
- **What.** Repeated, decaying bounces (gravity landings) or a squash-and-stretch wobble.
- **When to use.** To give a single hero prop physical weight in an illustrated explainer, followed by a rest. Not in UI.
- **Why it works.** A decaying bounce reads as gravity and settling; it keeps a long hero hold alive with internal motion instead of cuts.
- **How fast.** Landing intervals 0.47, 0.47, 0.37, 0.37 s, then rest (≈1.7 s total), concentric impact rings on each landing; or one squash wobble of ≈9 f on a glossy prop.
- **Reads premium when.** It decays to rest and then other motion takes over (tumble, particles).
- **Reads amateur when.** It loops forever, is applied to text ("bouncy text" exists as a catalogue technique [W:raivcoo]; no reference uses it), or is not locked to the music while pretending to be rhythmic.
- **Evidence.** Wafer bounce [V:1Hcg3X t=6.87-8.53s] (only the 7.80 s landing is on an onset); phone squash [V:1i2L14 t=25.07-25.4s]; rider wobble on the end frame [V:126cpH t=16.20-17.97s]. Text sources describe brand shapes that "move and bounce" [S:Zendesk] (brand system, not film) and Duolingo's squash and stretch [S:Duolingo, inferred].

### ML-05. Anticipation — Tier U · 7/8
- **What.** A cue that tells the viewer a move is coming. In this set it is almost always *narrative* (dwell, point, build, pre-load, punch), not a cartoon wind-up.
- **When to use.** Before every click, whip, big reveal and section cut.
- **Why it works.** The eye arrives at the target before the action, so the action lands as a payoff instead of a surprise the viewer has to re-read.
- **How fast.** Cursor dwell 10 f; hover 0.3-1.0 s; pointing cue ≈11 f ahead of a whip; exit drift ≈5 px over 5 f; punch 3-8 f; glow build ≈2 s; pre-loaded shape ≈1 s; silence 0.1-0.5 s before the hit (§19.7).
- **Reads premium when.** The cue is part of the story (the cursor turns to point where the camera will go).
- **Reads amateur when.** UI elements squash backwards before every move (the [N] wind-up applied to software), or nothing ever signals a cut.
- **Evidence.** [V:126cpH t=10.20-10.53s], [V:15VhHR t=2.9-3.97s], [V:1i2L14 t=5.5-5.87s, 1.033s], [V:1-6l8S t=67.50s, 7.83s], [V:19NRDv t=46.9s], [V:1ccYWJ t=18.87-21.0s], [V:1CSXtQ t=11.3-13.0s]. **References win** over [N]'s 3-6 f pull-back (§19.7).

### ML-06. Stagger — Tier U · 8/8
- **What.** Elements of one group start one after another at a fixed small offset.
- **When to use.** Every group of 2+ elements: words in a line, rows in a menu, cards, chips, table columns, title lines.
- **Why it works.** It turns a block into a reading sequence and sets the reading pace. A fixed offset reads as designed; random offsets read as chaos (except for deliberately "self-assembling" letters, ML-16 K10).
- **How fast.** 1 f strips; 2 f chips, rows, dots, letters in a wordmark; 2-3 f table columns; 3-4 f cards and content blocks; 5-9 f title lines and large objects; 7-10 f words in a spoken-rhythm line (§18 SP-U4). Keep UI-chrome groups under ≈18 f in total [N] unless the cascade itself is the proof (a 12-card carousel ran ≈2 s on an average 5.5 f stagger [V:1ccYWJ t=16.10-18.2s]).
- **Reads premium when.** The order is reading order or importance order and the offset is constant (or deliberately tightening).
- **Reads amateur when.** Zero stagger (a row arrives as a block) or uneven offsets with no logic.
- **Evidence.** [V:1i2L14 t=14.50s], [V:1CSXtQ t=8.867s], [V:15VhHR t=4.47s, 41.67s], [V:1-6l8S t=23.13s, 67.87s], [V:1Hcg3X t=0.10s, 28.97s], [V:19NRDv t=0.30s, 61.47s], [V:126cpH t=13.70s]; zero-stagger flaw [V:1-6l8S t=34.50s].

### ML-07. Cascading UI — Tier U, SaaS · 5/8
- **What.** A UI result populates itself in reading order after a short empty beat: container first, then title, then body, then secondary controls.
- **When to use.** Every "AI writes / system generates / data arrives" result: emails, documents, tables, generated pages, dashboards.
- **Why it works.** The empty hold says "the system is working"; the cascade leads the eye through the output in the order a person would read it, and its speed says "effortless".
- **How fast.** Empty container 8-9 f → elements every 3-4 f, each fading in over 4-6 f with a soft L → R wipe → 13-22 f total; tables by column, 2-3 f lag, 5×5 in ≈13 f; a generated page in 12 f (plate 2 f, header 2 f, title colour-settle 8 f, then +2-4 f per tier) (§18.2).
- **Reads premium when.** It is fast enough that cells are not read individually (the point is effortlessness) and it follows reading order.
- **Reads amateur when.** The result is already complete on the cut frame, or every element flies in from a different direction.
- **Evidence.** [V:1-6l8S t=22.87-23.87s, 67.73-68.50s], [V:15VhHR t=12.47-12.83s, 41.67s], [V:1CSXtQ t=20.40-21.47s], [V:19NRDv t=27.63s], [V:1ccYWJ t=16.10s]. Text: Airtable's UI building "right before your eyes" [S:Airtable, description].

### ML-08. Sequential reveals — Tier U · 8/8
- **What.** One idea per beat: the frame adds one piece of information at a time (word, then image, then UI, then result) instead of showing everything at once.
- **When to use.** Every statement card and every demo shot.
- **Why it works.** It matches working memory: the viewer processes one new element per beat. It also creates a rhythm the music and SFX can lock to.
- **How fast.** One new element per 0.5-1.5 s inside a shot (≈1 UI event per 0.5 s in dense demos; an in-shot beat every 0.8-1.5 s in long proof shots) (§18.8).
- **Reads premium when.** Each reveal has room (the previous one has finished its entrance).
- **Reads amateur when.** Everything enters together, or reveals overlap so the viewer cannot tell what is new.
- **Evidence.** [V:15VhHR §11] (one event every 0.5 s), [V:19NRDv rule 12], [V:1-6l8S t=9.55-17.03s] (raw text → polished text), [V:1Hcg3X] ("one hero per frame"), showreel.design's "one idea per beat" reading of launch-studio descriptions [W:showreel.design pattern 4].

### ML-09. Scale transitions — Tier U · 8/8

Scale is the references' main transition engine. Six measured forms:

| Form | What | Numbers | Use | Evidence |
|---|---|---|---|---|
| **Punch into a cut** | The subject accelerates in scale for the last frames, then a hard cut or 1 white frame | +18-33% in 3-8 f, per-frame growth ×1.4-2 (E-PUNCH); ≤4 per 78 s | Section climaxes, logo reveals, icon → world cuts | [V:1-6l8S t=7.83s, 18.23s, 33.4s, 70.83s] |
| **Oversize slam** | A hero word starts 2-4× too big and lands | 3-4× → 1× in 8-13 f (E-SNAP), 64% on frame 1 | Hooks, one-word claims | [V:19NRDv t=0.00s, 7.20s, 46.13s], [V:1i2L14 t=0.00s], [V:1ccYWJ t=33.20s] |
| **Pull-out reveal** | Start inside a detail (icon, word, UI) and pull back to its context | ≈3× → 1× in ≈24 f (E-OUT); two-stage ≈4.1× in 1.0 s; ×0.75 in 21-31 f (E-INOUT) | "One item → the whole system"; text → UI; device in context | [V:1Hcg3X t=14.30s], [V:126cpH t=5.20-6.20s], [V:1CSXtQ t=8.0s], [V:1i2L14 t=4.10s] |
| **Suck-in shrink** | The outgoing element shrinks with acceleration into the cut | −24 to −38% over 8-19 f (E-EXIT); cut on the smallest frame | Statement cards in fast reels | [V:1ccYWJ t=2.33s, 26.53s, 32.80s], [V:1CSXtQ t=21.93s, 25.53s] |
| **Scale-contrast cut** | The same words cut from macro to small | 49% FH cap → 6.6% FH cap in one cut | A hook that resolves into an editorial line | [V:15VhHR t=0.633s] |
| **Scale-matched hand-off** | Outgoing pulls back; incoming enters large and keeps shrinking | Outgoing −38% in 11 f (ease-in); incoming 2.1× → 1× in ≈18 f at 25% → 100% opacity in ≈5 f | Joining a camera shot to a title | [V:1ccYWJ t=32.80-33.80s] |

- **Why it works.** Scale is the cheapest depth cue in 2D: growth reads as approach, shrink as departure. Accelerating into the cut and decelerating after it hides the cut inside one continuous scale change.
- **Reads premium when.** Scale is interpolated in log space, accelerates into cuts and decelerates out of them, and is used for a reason (approach, reveal, departure).
- **Reads amateur when.** Things simply zoom in and out with symmetric easing, or every shot punches.

### ML-10. Rotation transitions — Tier S · 6/8
- **What.** Rotation used as an entrance, a reveal or a camera move: tossed cards, edge-on flips, perspective flatten, orbit steps, discard tilts.
- **When to use.** Physical tosses in playful styles; 3D card flips that reveal a face; orbiting a pivot to bring the next feature forward; a discard with gravity.
- **Why it works.** Rotation adds a second axis of change that reads as physical handling (a card is turned, a carousel is spun) without adding new objects.
- **How fast.** Tossed card 15° → ≈0° in 3 f, settled 16-22 f; edge-on 90° → 0° flip in 8 f (E-OUT); card perspective 15° → 0° in 7 f; orbit step 9-12 f (E-HOP) every ≈2 beats; discard 10-20° during a gravity drop; map 10-15° → upright in ≈1 s.
- **Reads premium when.** Rotation is on objects and cameras, never on body text in premium styles ("kinetic type never rotates" [V:1-6l8S §8]).
- **Reads amateur when.** Text spins, logos spin for decoration, or the camera rolls with no cause.
- **Evidence.** [V:126cpH t=9.27s, 11.4-12.5s], [V:1ccYWJ t=16.10-16.37s], [V:15VhHR t=33.33-33.6s, 13.93s], [V:19NRDv t=30.9-33.4s], [V:1i2L14 t=13.50s, 20.53-21.83s], [V:1Hcg3X t=3.43s]; only exception on type: role words at −6° [V:1ccYWJ t=5.80s].

### ML-11. Depth transitions — Tier S · 4/8
- **What.** The camera moves *through* a layer (tables, particles, a hollow icon, a ring of cards) into the next scene.
- **When to use.** To isolate one detail from a busy context (context → extraction → focus) or to enter a product "world".
- **Why it works.** Passing a foreground layer creates real parallax and defocus, which reads as cinematic depth and makes the destination feel inside the product.
- **How fast.** Push-through 9 f with the foreground blurring away [V:19NRDv t=18.25-18.55s]; dolly ×2.3 in ≈15 f with foreground particles going to bokeh [V:1CSXtQ t=19.95-20.47s]; zoom-through ×1.36/f over ≈10 f [V:1ccYWJ t=0.87-1.20s]; camera inside a ring of cards ≈45 f [V:1i2L14 t=10.9-12.4s].
- **Reads premium when.** It is used once or twice, on the idea that needs isolating, and the foreground defocuses as it passes.
- **Reads amateur when.** Every scene change is a fly-through, or the layer passed through has no meaning.

### ML-12. Fly-throughs — Tier X · 3/8
- **What.** A continuous forward camera move through space or into an object.
- **When to use.** A hook (into an icon), a hero moment (through data), an opening (through clouds).
- **Why it works.** Constant-ratio zoom reads as forward travel at constant speed; objects rushing past the lens create energy without cuts.
- **How fast.** ×1.3-1.4 per frame for 8-10 f (E-ZOOM), 3 f ease-in first; cloud fly-through with type 3× → 1× in 8 f [V:1i2L14 t=0.00-0.27s].
- **Reads premium when.** The destination is visible or implied (a hollow interior, a world behind the clouds) and a sub hit lands as the frame fills.
- **Reads amateur when.** Generic tunnel or warp-speed effects with no destination; "neon technology visuals" [W:motion.so].
- **Evidence.** [V:1ccYWJ t=0.87-1.20s] (sub boom −6.2 dB at the fill frames), [V:1i2L14 t=0.00-0.70s], [V:1CSXtQ t=19.95-20.47s]. Text: Bolt's "fluid camera movements" and wide-angle lens brief [S:Bolt] (timing not documented).

### ML-13. UI cards in 3D space — Tier S, SaaS · 5/8
- **What.** Flat UI screens treated as physical cards: tilted planes, decks, carousels, extruded slabs, a chat pane in a 3D studio.
- **When to use.** To show many outputs at once (deck, wall, carousel), to make a dashboard feel physical, or for the one hero 3D beat of an otherwise flat film.
- **Why it works.** Perspective and shadow make a screenshot feel like an object; a deck "collects" every story into one thing (climax = collection).
- **How fast.** Page 100 → 85% plus Y-rotation in 6 f into a carousel [V:15VhHR t=13.93-14.13s]; deck: fan ≈11 f, cruise ≈7 f, exit ≈21 f at peak speed [V:15VhHR t=48.27-49.63s]; tables fly in 12 f (E-OUT) at ≈35° Y / 20° X [inferred angles] [V:19NRDv t=16.77-17.17s]; card flips 90° → 0° in 8 f, extrusion 6-8% of card width [V:1ccYWJ t=16.10s]; tilt to a floor plane in 6 f with distance fog [V:1i2L14 t=19.23-19.43s].
- **Reads premium when.** The cards hold real, art-directed content; perspective is consistent; shadows are soft and grounded; there is no motion blur gap at high speed.
- **Reads amateur when.** Random screens float and spin in a void; perspective differs per card; low-res or greeked textures in the hero shot (a flaw in [V:1CSXtQ t=18.4-19.0s]).
- **Evidence.** Matrix row ML-13.

### ML-14. Perspective shifts — Tier S · 4/8
- **What.** The viewing angle changes: flat → 3D (pull back to reveal the UI is a plane), steep → face-on (angle-change cut), tilted → frontal (perspective flatten), frontal → floor (tilt).
- **When to use.** At the moment the story changes level (from "the message" to "the world", from "the table" to "the one value").
- **Why it works.** A change of angle signals a change of context more strongly than a cut, while keeping the same objects.
- **How fast.** Screen-to-world pull-back ×0.57 in 10 f then ×0.56 over ≈20 f [V:1CSXtQ t=18.00-19.03s]; angle-change hard cut steep → face-on [V:19NRDv t=22.70s]; flatten 15° → 0° in 7 f [V:15VhHR t=33.33s]; tilt onto a floor 6 f [V:1i2L14 t=19.23s]; slow yaw recede ≈1 s as a soft exit [V:19NRDv t=28.9-29.95s].
- **Reads premium when.** One change per shot, motivated by the story.
- **Reads amateur when.** The angle drifts continuously for no reason ("random camera motion").

### ML-15. Floating interfaces — Tier S; A when uncaused · 4/8
- **What.** UI surfaces presented off any device: glass cards over defocused plates, a page as a window over a matching photo, a pill with an emissive under-glow.
- **When to use.** To separate the product from the background world while keeping both visible.
- **Why it works.** A floating surface with a soft shadow and a backdrop reads as "this UI lives in this world" (UI-in-world), which is more cinematic than a screen recording and cleaner than a device mock-up.
- **How fast.** Entrance 8 f fade (+ frosted → glass 6-8 f); after landing, drift ≤0.5% of frame per frame or a slow hold push; never a continuous bob on UI. Bobbing (≈0.5 px/f) appears only on non-UI glass icons in a breather section [V:1i2L14 t=29.5-30.6s].
- **Reads premium when.** The surface has a job, a ground (shadow or plate), consistent light and no wobble.
- **Reads amateur when.** "Random floating screens" with sine-wave bobbing and no action: listed as the main thing to avoid in UI animation [V:126cpH §UI], [V:1-6l8S §9].
- **Evidence.** [V:1-6l8S t=18.37-22.87s] (glass card over plate, three planes), [V:15VhHR t=19.73-21.63s] (page window over the same beach photo), [V:1ccYWJ t=12.17-14.73s] (under-glow), [V:19NRDv §9] (glass panels).

### ML-16. Kinetic typography — Tier U · 8/8

The references' richest motion vocabulary. Sub-catalogue:

| ID | Technique | Numbers | Tier | Evidence |
|---|---|---|---|---|
| K1 | **Live-append with auto-re-centre** | Words 3-8 f apart; line re-centres with E-LERP (k ≈ 0.22), 13-14 f, 10-15% W travel; then 3.7% W/s linear drift | SaaS (voice, AI, chat) | [V:1-6l8S t=0.10-1.50s] |
| K2 | **Two-tone statement** (subject neutral, benefit in the accent) | Benefit phrase arrives +1-8 f after the subject | U (3/8) | [V:1-6l8S §8], [V:19NRDv §8], [V:1i2L14 §8] |
| K3 | **Oversize slam-down** | 3-4× → 1× in 8-13 f, E-SNAP, motion-blurred frames 0-1 in blur styles | U for hero words (3/8) | [V:19NRDv t=0.00s], [V:1i2L14 t=0.00s], [V:1ccYWJ t=33.20s] |
| K4 | **Word build with camera pull-back** | Words 4-7 f each, 7-10 f apart from the right with blur; line shrinks 1-3.5%/f and snaps 40-55% in 3 f | S (Night/Day) | [V:19NRDv §6] |
| K5 | **Typed headline that becomes UI** | Filler 28-35 chars/s, key phrase ≈9 chars/s, 0.9-1.1 s pauses; caret held at 65% W; UI builds around the read text (border 1-3 f, icon 3 f, toolbar 4-5 f); pull-back ×0.75 | SaaS | [V:1CSXtQ t=2.13-9.03s] |
| K6 | **Staircase → baseline collapse** | Words on a diagonal (step ≈5% H) collapse in 7-10 f | X | [V:1CSXtQ t=1.50s, 21.60s] |
| K7 | **Word-spacing open / spacing match cut** | Spacing 0 → normal in 12 f; exit gaps ×1.5 over ≈18 f, next card enters at ≈1.25× gaps and tightens in 8-10 f | X | [V:1ccYWJ t=4.93s], [V:1CSXtQ t=24.13-25.43s] |
| K8 | **Scatter → swap → converge** | ≈1 s per sentence; swap in 1 f while displaced | X | [V:1i2L14 t=7.57-10.63s] |
| K9 | **Slot-machine swap** (fixed anchor + variable word) | Swap every 15 f (≈1 beat); incoming settles 3-4 f; variable set in a contrasting face | U (3/8) | [V:1ccYWJ t=5.43-7.30s], [V:19NRDv t=57.60-59.90s], [V:15VhHR t=8.63-12.47s] (keyword swaps in a locked prompt bar) |
| K10 | **Semantic letters** ($-scramble, self-assembling, kick-bounce, arc wave) | 12-30 f; ≤3 per film | X (2/8) | [V:19NRDv t=7.68s, 14.33s, 46.13s], [V:1i2L14 t=9.70s] |
| K11 | **Auto-fit type-on** | 40-55 chars/s; the line scales down once it passes ≈50% W so the final width stays ≤70% W | X | [V:1ccYWJ t=34.33-38.0s] |
| K12 | **Mask wipe-off and re-type** | ≈1 letter per frame out, 10-11 f back in; one word stays as the anchor | X | [V:1i2L14 t=6.13-7.00s] |
| K13 | **Scale-contrast cut** (macro word-by-word → small sentence) | Macro cap ≈49% FH, a word every 7 f with jump-reframes; cut to cap ≈6.6% FH | S (brand-frame films) | [V:15VhHR t=0.00-0.63s] |
| K14 | **Objects inline in a sentence** (a heart, photo chips, a brand icon) | Gap opens 7 f, chip scales in ≈5 f, chips flip every 2-4 f | S, SaaS | [V:15VhHR t=1.43-2.2s], [V:1CSXtQ t=7.83s] |
| K15 | **Snap → hold → suck-in** | +40-55% in 6 f, hold 6-10 f, −24 to −30% over 8-18 f into the cut | S (fast reels) | [V:1ccYWJ t=1.87-2.60s] |
| K16 | **World-space labels** (labels ride the scene camera) | Blur-fade 2-5 f; 4-10 f between label lines | S (editorial) | [V:1Hcg3X §8] |
| K17 | **Escalating word swap** | Intervals tighten 16 → 11 f while height grows 10 → 34% H; ends on the product name typed per letter at a 2 f stagger | X | [V:19NRDv t=57.60-60.03s] |
| K18 | **Ghost-word streaming** | Words appear at 30-40% opacity and solidify in 3-4 f, at speech pace (4-7 words/s) | SaaS (voice, transcription) | [V:1-6l8S t=18.70-20.45s] |

- **When to use.** Every film: kinetic type is the narrator in all 8 references (none relies on a VO alone; several have none).
- **Why it works.** Moving one word at a time at a spoken rhythm makes the viewer read along, so the copy is "heard" even with the sound off.
- **Reads premium when.** Line-level motion, one family of reveals per film plus at most 2-3 semantic variants, critically damped, readable holds.
- **Reads amateur when.** Per-letter bounces, rotating letters, a different reveal on every card, or the same reveal ≈12 times in a row (MP-A6).

### ML-17. Object interaction — Tier S · 5/8
- **What.** Objects act on each other or are acted on: a hand grabs a dot, a button shoves a logo up, groceries fall after a swap, chips implode into a logo, a dot "launches" a word.
- **When to use.** To motivate a transition (an interaction causes the cut) or to give a flat world physical rules.
- **Why it works.** Cause and effect between objects is the strongest kind of motivated motion (MP-U1), and it reads as craft rather than effect.
- **How fast.** Hand pinch with an accelerating grow 8 → 125 px over ≈10 f [V:1i2L14 t=1.07-1.40s]; button rises 72 px in 3 f and shoves the logo 48 px in 4 f, both settle ≈25 px over 10 f [V:1i2L14 t=32.73-33.27s]; swap then fall 6-14 f with 70-90° rotation [V:126cpH t=6.77-7.73s]; implosion 8 f + sparks 10 f [V:19NRDv t=55.0-55.6s]; dot launches the word on frame 2 [V:1CSXtQ t=0.067s].
- **Reads premium when.** Contact is clear (objects touch at a visible point) and the reaction follows within a few frames.
- **Reads amateur when.** Objects pass through each other, or reactions arrive late.

### ML-18. Cursor animation — Tier U, SaaS · 6/8
- **What.** A pointer that travels, hovers, dwells and clicks, with UI responses on its press.
- **When to use.** Any demo where an interaction needs to be shown, not narrated.
- **Why it works.** It gives the viewer a proxy hand and a focus point; ballistic travel with a dwell before the click reads as human intent.
- **How fast.** Travel 15-20 f across the UI (8-12 f short hops, 25-27 f deliberate) on E-GLIDE with peak ≈80 px/f @1080; dwell 10 f (0.3-1.0 s if the target needs explaining); press 1-3 f; release 6 f; consequence in 3-8 f; native size ≈2% FH (§18.3).
- **Reads premium when.** Real cursor states (arrow → hand on hover), a 1 f confirmation on the target, one cursor style per film (custom brand cursor allowed if consistent: [V:19NRDv §9]).
- **Reads amateur when.** The cursor glides at constant speed, clicks with no dwell, is oversized, or changes style between scenes.
- **Evidence.** [V:15VhHR t=2.5-3.97s, §9], [V:1CSXtQ t=8.867-10.3s], [V:126cpH t=9.93-10.70s], [V:1i2L14 t=32.9-34.2s], [V:19NRDv t=11.10s, 24.20s], [V:1-6l8S t=36.20-37.15s].

### ML-19. Scroll animation — Tier S, SaaS · 3/8
- **What.** The UI's own scroll used as camera movement through a page, list or table.
- **When to use.** To travel through long content ("travel through the UI") or to reveal the next section.
- **Why it works.** Scrolling is native behaviour, so it moves the view without inventing a camera move.
- **How fast.** Page ≈1 FH in 12 f E-OUT with motion blur on frames 2-4; section 5-8 f; list 12 f then a 1.4 s hold; an accelerating scroll (8 → 24 px/f @720) as an exit into a transition; continuous slow scroll ≈0.5% H per frame under a cascade (§18.2).
- **Reads premium when.** Scroll lands with a long ease-out and content is readable at rest.
- **Reads amateur when.** Linear scrolls of a full screen recording at reading-impossible speed.
- **Evidence.** [V:15VhHR t=21.35s, 34.47s, 46.37s], [V:1CSXtQ t=20.40-21.47s], [V:1ccYWJ t=16.10-18.83s], [V:1Hcg3X t=23.93-26.53s].

### ML-20. Dashboard animation — Tier S, SaaS · 1/8 (weak evidence)
- **What.** A dashboard introduced detail-first: one chart draws in macro, then the camera snaps back to the full dashboard.
- **When to use.** Reporting and analytics features.
- **Why it works.** The viewer sees *what* the chart says before being shown *where* it lives; the reverse order (full dashboard first) asks the viewer to find the point.
- **How fast.** Macro tilted chart, lines draw 26 f with 4-8 f stagger → 2-3 f pull-back snap with blur → ≈1 s slow yaw recede [V:19NRDv t=27.57-29.97s]. KPI tiles: counters 24-31 f (ML-21).
- **Reads premium when.** Real-looking data (believable values, dates, names), one focal chart at a time.
- **Reads amateur when.** A whole dashboard animates every widget at once; lorem-ipsum numbers.
- **Evidence.** Only one full measured dashboard [V:19NRDv]; UI-in-dashboard elements in [V:1ccYWJ t=18.83s], [V:1-6l8S t=67.70s]. Text: Asana's zooms on status/dashboard counts [S:Asana, inferred in source], TradeLens "zeroes in" from overview to one alert [S:TradeLens, secondary].

### ML-21. Data visualisation — Tier S, SaaS · 4/8 (counters measured in only 2/8)
- **What.** Numbers and system states shown through motion: counters, gauges, status colours, progress paths, data-made particles.
- **When to use.** Every proof claim with a number; every system behaviour (success, failure, sync, transfer).
- **Why it works.** Motion turns a static number into an event (it "arrives"), and colour states explain behaviour without labels (red, red, teal = failover).
- **How fast.** KPI counter 24-31 f on E-SNAP-L; tally counter linear with a hard stop (≈1 s per 2 digits); state colour flip 1-2 f, states ≈1.7-2.5 s apart; gauge fill ≈6 f, state snaps 0 f; route draw ≈1.7 s leg by leg; data particles ≈1 s sweep (§18.4).
- **Reads premium when.** The final value gets a hold and a pointer (cursor parked, highlight), and the colour language is consistent across the film.
- **Reads amateur when.** Numbers count linearly for 3 s; data marks have low contrast (violet bars on navy were a flaw [V:19NRDv t=11-14s]).
- **Evidence.** [V:19NRDv t=23.90-24.93s, 39.87-46.13s], [V:1ccYWJ t=9.93-11.80s], [V:1Hcg3X t=20.53-22.97s], [V:126cpH t=11.07-13.60s], [V:1CSXtQ t=19.0-19.95s].

### ML-22. Chart animation — Tier S · 2/8 (weak evidence)
- **What.** Lines drawing on, bars rising, a before/after bar pair reacting to a toggle.
- **When to use.** Savings, growth and comparison claims.
- **Why it works.** A single binary comparison (Without / With) is the most legible chart in motion: the "before" bar stays as a ghost so the difference is instant.
- **How fast.** Lines 26 f each, 4-8 f apart; a bar rises ≈7 f on the toggle frame; bars elsewhere ease continuously; [E]'s comparison bars at 20 f are inferred.
- **Reads premium when.** One comparison per chart, the "after" in the accent colour, axis labels only where they are legible.
- **Reads amateur when.** Many series animate together; tiny axis labels (≈1.3% H) carry the meaning.
- **Evidence.** [V:19NRDv t=11.00-14.33s, 27.63-28.50s], [V:1Hcg3X t=20.53-22.97s].

### ML-23. Icon animation — Tier U · 5/8
- **What.** Icons that enter, punch, play their own micro-animation, orbit or morph.
- **When to use.** Integrations, feature lists, app context (Gmail, WhatsApp), status.
- **Why it works.** An icon that performs its function (a bell rings, a magnifier becomes a spinner) explains itself; one animating icon at a time directs attention.
- **How fast.** Entrance 8-14 f with a ≈6 px rise and 2-3 f stagger; micro-animation loops 10-15 f per icon, played one at a time; icon punch into a cut +33% in 3 f; chip orbits 22 f fly-in then slow rotation; icon flip ≈2 f (§18.5).
- **Reads premium when.** One stroke weight and colour per scene; one icon "alive" at a time; recognisable, licensed marks.
- **Reads amateur when.** All icons loop at once; a row arrives with zero stagger; an unidentifiable icon is included [V:1-6l8S t=34.50s].
- **Evidence.** [V:1ccYWJ t=12.17-14.73s], [V:1-6l8S t=17.17-18.37s], [V:1Hcg3X t=16.17-19.77s], [V:19NRDv t=4.97-7.2s], [V:1i2L14 t=28.7-30.6s].

### ML-24. Microinteractions — Tier U, SaaS · 7/8
- **What.** The small state machines inside UI: hover, press, toggle, selection, typing dots, caret, spinner, highlight.
- **When to use.** Every interactive moment in a demo; one per beat.
- **Why it works.** They are the proof that the UI is real and responsive; they also give SFX a precise sync point.
- **How fast.** Hover lift ≈3 f; press 1-3 f; release 6 f; toggle 3 f; selection 4-5 f; typing dots 2 f stagger; caret 0.3 / 0.3 s; spinner swap in 1 step; focus flare 1-2 f decaying ≈0.6 s [V:1Hcg3X t=4.00s] (§18.2).
- **Reads premium when.** Real component states are used, and each produces a visible consequence.
- **Reads amateur when.** Generic ripples and glows decorate elements that are not being used.
- **Evidence.** Matrix row ML-24; [S:Slack] ("motion mirrors actual Slack workflows"); [S:PointCard] ("directional arrows guided viewers", campaign level; the nudge motion itself is [inferred]).

### ML-25. Product interaction demos — Tier U, SaaS · 5/8
- **What.** A complete input → system → output loop shown in one take or a continuity cut: say → see, prompt → page, toggle → chart, order → tracking.
- **When to use.** The proof block of every SaaS film.
- **Why it works.** It shows the value as an experience the viewer can imagine doing, and repetition of the same loop (≥3 times) teaches the grammar so later variations are instant.
- **How fast.** Input at human speed (typing 15-20 chars/s, voice 4-7 words/s) → trigger (click, send; 1 f confirmation) → 8-9 f empty hold or a suck-out → output cascade 12-22 f → hold ≥1.0 s → next (§18.2, §18.3).
- **Reads premium when.** One fixed template repeated (kivi repeats its say → see loop four times [V:1-6l8S §1]); real flow states only; the result is art-directed.
- **Reads amateur when.** Random screens with no input; outputs appear without cause; the template changes every time.
- **Evidence.** [V:1-6l8S t=9.55-69.62s], [V:15VhHR t=4.23-16.63s], [V:1CSXtQ t=13.03-21.47s], [V:19NRDv t=11.00-14.33s], [V:126cpH t=9.27-13.60s].

### ML-26. Shape morph and shared-element continuity (discovered) — Tier U · 8/8
- **What.** One element turns into the next one (pill → card, icon → input, card → notification, circle → pill, chips → logo, particles → bolt), or a single primitive is carried across several setups.
- **When to use.** Between UI states, between the brand frame and the product, and as the climax ("the many become one").
- **Why it works.** The eye follows one object through the change, so the scene can change completely without a perceived cut (MP-U8).
- **How fast.** 6-13 f for UI morphs (E-INOUT or E-OUT); bottom-anchored collapse ≈7 f with an 11-12 f background rack-focus; carry a primitive within ±5% of its screen position across a cut [V:1i2L14 rule 7].
- **Reads premium when.** The morph is a clean geometric interpolation between two stable states, or a 1 f swap between shape-matched states.
- **Reads amateur when.** Geometry warps or melts through intermediate shapes (the AI-morph look). For generated footage, prefer a hard switch between stable states plus a physical reaction (MP-SaaS7).
- **Evidence.** [V:1-6l8S t=9.50-9.93s], [V:15VhHR t=3.97-4.23s, 49.63s], [V:126cpH t=11.03-11.27s], [V:1ccYWJ t=39.47-39.70s], [V:19NRDv t=55.0s], [V:1Hcg3X t=12.60-12.80s, 3.30s], [V:1i2L14 t=0.0-4.1s], [V:1CSXtQ t=7.80s, 17.80s].

### ML-27. Light as motion (discovered) — Tier S · 4/8
- **What.** Light itself moves or builds: white blooms as transitions, glow builds into a cut, a halo that means "AI tool active", a sheen across a logo, bloom only on emitters.
- **When to use.** As the neutral "room" between materials (UI ↔ type ↔ scene), or as the energy that motivates a cut.
- **Why it works.** Light is a material every scene shares, so passing through it joins unlike scenes; a build-then-release reads as energy transfer.
- **How fast.** Bloom 3-7 f; wash ≈18 f; 1 white frame before a smash; glow build ≈2 s then cut on the maximum; halo 3 f; sheen 14 f; flash 3 f + 2 f once (§18.7).
- **Reads premium when.** Light comes from a source in the scene (a click, a screen, an emitter) and glow stays on emitters.
- **Reads amateur when.** Lens flares and light leaks are pasted on transitions; glow on non-emissive objects [V:1Hcg3X §16]; a 1-frame light-leak artefact [V:1-6l8S t=59.73s].
- **Evidence.** [V:1-6l8S §10] (12 of 32 transitions are light-based), [V:1ccYWJ t=18.87-21.0s], [V:1Hcg3X t=12.83s, §13], [V:15VhHR t=23.83s, 51.37s].

### ML-28. Colour-state motion (discovered) — Tier S, SaaS · 5/8
- **What.** A colour change that carries meaning: monochrome → colour when the product engages, an "AI" gradient that sweeps and settles, polarity flips on cuts, status fills.
- **When to use.** To mark state (before / after, AI working, matched, failed) and to give hard cuts rhythm without new colours.
- **Why it works.** Once the colour semantic is learned, no caption is needed (Wix's cyan "AI" colour appears 9 times and never on resting UI).
- **How fast.** Saturation bloom 22-42 f linear; AI sweep 8-15 f then final colour in 6-8 f; status fill 4-5 f; polarity flip on the cut frame (0 f).
- **Reads premium when.** One colour = one meaning, used every time the meaning occurs.
- **Reads amateur when.** The device is applied to only some matching scenes [V:1-6l8S §13], or an AI colour lingers (>15 f reads as a glitch).
- **Evidence.** [V:1-6l8S t=18.57-19.33s, 54.0-55.4s], [V:15VhHR §6], [V:19NRDv t=20.37s, 40.8-45.0s], [V:1i2L14 §10] (11 of 13 cuts flip polarity), [V:1Hcg3X §13].

### ML-29. Perpetual ambient motion (discovered) — Tier U · 7/8
- **What.** A low-amplitude layer that never stops: drifting gradient blobs, a slow push, line drift, boil.
- **When to use.** Under every hold, except a sparse reading hold (≤1.0 s) and the end card.
- **Why it works.** It removes "dead" frames at no attention cost (MP-U4).
- **How fast.** Gradient blobs move visibly frame to frame [V:1ccYWJ t=5.43s] (a 2-3 s reconfiguration period is [inferred]); push 1.05-1.15× per hold; drift 0.1-0.5% of frame per frame; boil once per 12 fps pose (playful only); an orb drifting with a ≈251 s period is "barely moving" by design [E, sourced code].
- **Reads premium when.** It is slower than anything meaningful in the frame.
- **Reads amateur when.** The ambient layer is faster or brighter than the content, or gradients band (add 1-2% grain or dither [V:1ccYWJ rule 16]).
- **Evidence.** Matrix row ML-29.

### ML-30. Animating on twos (discovered) — Tier X · 1/8
- **What.** Holding each animation pose for 2 (or 2-3) frames, ≈12 unique poses per second, for a hand-made, stop-motion feel.
- **When to use.** Illustrated, collage or character layers in playful brand films.
- **Why it works.** Stepped motion reads as crafted and hides cheap tweening; a single unifying tempo joins flat art, photo cut-outs and UI.
- **How fast.** 2-3-2-3 capture-frame cadence on a 24/30 base; live action, camera moves and UI stay on ones.
- **Reads premium when.** Applied to every illustrated layer consistently.
- **Reads amateur when.** Applied to UI scrolling or camera moves, where it reads as lag [V:126cpH rule 13, inferred].
- **Evidence.** [V:126cpH §Motion language]; [S:Figma] (Config keynote film dropped from 60 to 15 fps for a handmade feel).

### ML-31. Particles (discovered) — Tier S; A when decorative · 3/8
- **What.** Many small elements standing for something real: UI data breaking into discs, electrons, a ≤12-spark burst at a merge.
- **When to use.** Only to make an invisible process visible (data transfer, energy, a merge), once per film.
- **Why it works.** Particles made of the UI's own colours keep the abstraction honest ("your data" is literally the UI moving).
- **How fast.** 200-300 discs sweeping L → R in ≈0.95 s, then a ×2.3 dolly through them [V:1CSXtQ t=19.00-20.47s]; ≈60 particles raining, converging in 4 f and fusing in 2 f [V:1Hcg3X t=11.53-12.80s]; ≤12 sparks over 10 f [V:19NRDv t=55.27-55.60s].
- **Reads premium when.** Colour, count and direction come from the story.
- **Reads amateur when.** Generic glitter, dust or "neon tech" particles fill empty frames [W:motion.so]; no reference uses decorative particles.

---

## L.2 Premium vs amateur: the quick read

| Dimension | Reads premium (measured in the references) | Reads amateur |
|---|---|---|
| Entrance curve | 16-64% of travel in frame 1, long soft tail (E-OUT / E-SNAP) | Symmetric Easy Ease; linear slides |
| Exit | Accelerates into the cut in 4-11 f | Fades out slowly, then a cut on a dead frame |
| Overshoot | 0% on type and UI | Springy type; bouncing cards |
| Stillness | Drift 0.1-0.5% of frame per frame; still only on sparse reading holds and the end card | Dead frames mid-film; or everything bobbing |
| Cause | Every move has a named cause | Random floating screens and objects |
| Speed contrast | Slow world, 1-3 f product responses | Everything at one medium speed |
| Hero moments | One or two big moves per film | Effects on every shot |
| Text in motion | Moves fast only in its first/last frames | Text slides while the viewer reads it |
| Continuity | An anchor or matched shape across cuts | Unrelated shots joined by generic transitions |
| Frame rate | Rendered at the delivery rate; on twos only by design | Duplicated-frame judder; stepped UI |
| Motion blur | Off below ≈5% W/f; on for whips | Strobing fast pans; blur on slow moves |

## L.3 Prompt phrasing: replace vague words with measurable motion

For motion designers, AI motion tools (Remotion, AE scripts) and generative-video prompts. Bezier values go to animation tools; the plain-language column goes to generative video models, which cannot take curves [inferred]. Keep one camera move per generated clip [P].

| Instead of | Write (animation spec) | Write (generative-video prompt) | Source |
|---|---|---|---|
| "smooth premium motion" | "Enters with cubic-bezier(0.33, 1, 0.68, 1) over 12 f (90% by frame 7), then drifts 0.2% of frame per frame; no overshoot" | "The card glides in quickly and slows to a soft stop, then barely drifts; it never bounces" | §19.3 |
| "snappy UI" | "Toggle completes in 3 f; dropdown opens in 6 f with rows 2 f apart" | Do not generate UI motion; composite real UI over the footage [inferred] | §18.2 |
| "cinematic camera" | "CM-02 linear push from 1.00 to 1.10 scale over the whole 2 s shot (60 f), E-LINEAR; no shake, no roll" | "One slow, steady dolly-in over the whole clip; no other camera movement" | §18.6; [P] |
| "dynamic transition" | "8 f exit on cubic-bezier(0.3, 0, 0.8, 0.15), hard cut on the fastest frame; the next shot opens already moving the same way and decelerates over 12 f" | Cut in the edit, not in the generation; generate each clip with its own single move [inferred] | MP-U11 |
| "bouncy / playful" | "One overshoot of ≤25% of the swing, settled by frame 20 (spring: stiffness 186, damping 10.9)" | "The card lands with one small wobble and settles" | §19.6 |
| "energetic build" | "Scale +20% over the last 4 f before the cut, per-frame increments doubling" | Do in the edit (E-PUNCH on the composite) [inferred] | E-PUNCH |
| "kinetic typography" | "Words enter every 8 f, each over 6 f from 4% W right with 8 px blur → 0, cubic-bezier(0.33, 1, 0.68, 1); line holds ≥ read time; exits in 5 f" | Never generate type in video models; add it in the motion layer (Veo adds gibberish subtitles when dialogue is implied [P]) | §18.1; [P] |
| "floating UI" | "Card at 80% W over a defocused plate; after landing, drifts upward 0.1% H per frame; soft shadow; no rotation or bob" | "Clean empty space in the upper half for an overlay; shallow depth of field" (describe the empty space, then composite) | ML-15; [P] |
| "make it feel fast" | "Cut on peak velocity; exits 4-6 f; human input then machine-speed output (2 f per word)" | "Quick, decisive camera move that starts immediately and stops cleanly" [inferred] | MP-SaaS5 |
| "morph into" | "Switch between the two stable shapes on one frame, then a 6-14 f physical reaction" | Avoid prompting morphs; generate both end states and cut [inferred] | MP-SaaS7 |

---

## Appendix A. Fitted-curve data (for reproduction)

Method: §19.1. Each line gives the series as measured in the teardown (frames at 30 fps unless noted) → fitted cubic-bezier → RMSE of the fit → best two standard tokens. All fits computed 2026-10-08 with numpy (least squares on normalised time and progress, 18 Nelder-Mead starts).

| ID | Measured series (source) | Fit | RMSE | Best tokens (RMSE) |
|---|---|---|---|---|
| A | Width 863, 458, 363, 313, 280, 259, 243, 231, 221 px, f0-f8 [V:19NRDv Verification #1] | (0.01, 0.78, 0.26, 0.92) | <0.1% | M3 emph-decel 3.5%; EXPO 4.5% |
| B | Left x 526, 498, 477, 462, 452, 443, 437, 432, 427, 423, 420, 417, 415, 413, f0-f13 [V:1-6l8S Study A] | (0.11, 0.35, 0.18, 0.83) | 0.2% | Carbon expressive 3.8%; outCubic 4.0% |
| C | Width fraction 0.89, 0.71, 0.60, 0.53, 0.48 (f1-f5), 0.41 (f8), 0.40 (f12) [V:1i2L14 Study A] | (0.14, 0.72, 0.38, 1.06) | 0.1% | outQuart 2.2%; (0,0,0,1) 2.9% |
| D | Top-edge Δ 88, 36, 20, 14, 12, 8, 8, 4, 4, 4, 2, 2 px [V:1i2L14 Study I] | (0.06, 0.31, 0, 0.91) | 0.2% | (0,0,0,1) 1.7%; outQuart 5.5% |
| E | Width 1009, 990, 941, 872, 832, 810, 795, 788, 784 (f0-f8), 766 (f18) [V:1i2L14 Study D] | (0.24, 0.33, 0, 1.17) | 1.8% | outQuart 7.2%; outQuint 7.2% |
| F | x 69.9, 65.8, 63.8, 62.3, 61.1, 60.1, 59.2, 58.4, 57.7, 57.1, 56.6, 56.1 (u0-u11 @24 fps), 53.6 (u20) % W [V:1Hcg3X Study D] | (0.02, 0.38, 0.3, 0.88) | 0.1% | outCubic 5.7%; (0,0,0,1) 7.2% |
| G | Sun top 62.5 → 7.7% H at 30.633-32.30 s, 17 samples [V:1Hcg3X Study J] | (0, 0.39, 0.25, 1.0) | 1.0% | (0,0,0,1) 1.2%; outQuint 6.3% |
| H | Panel edge 99.5 (17.0 s, creep) → 51.0% W (19.4 s), 14 samples [V:1Hcg3X Study G] | teardown fit (0.45, 0, 0, 1) | 2.0% (1.5% on the teardown's own 19 samples) | CSS ease 5.7% |
| I | Steps 1, 1, 2, 2, 3, 3, 5, 5, 7, 9, 11, 14, 18, 18, 18, 14, 11, 9, 7, 5, 4, 3, 2, 1, 1, 1 px per 25 fps frame [V:1CSXtQ Study B] | (0.69, 0.07, 0.36, 0.97) | 0.2% | inOutCubic 1.8%; inOutQuart 3.7% |
| J | Steps 2, 10, 21, 31, 29, 23, 17, 12, 9, 7, 5, 4, 3, 1, 1 px per 25 fps frame [V:1CSXtQ Study B] | (0.34, −0.01, 0.16, 0.97) | 0.1% | CSS ease 4.2%; CSS ease-out 7.9% |
| K | Right edge 282, 292, 300, 307, 312, 316, 320, 323, 325, 328, 330, 332, 333, 335, 336, 337, 338, 339, 340, 340, 341, 341, 342, 342, 343, 343 [V:1ccYWJ Study E] (last 3 values interpolated to the stated 343 by 13.0 s) | (0.11, 0.46, 0.25, 0.92) | 0.4% | outCubic 4.1%; (0,0,0,1) 4.9% |
| L | Speeds 1, 2, 5, 7, 10, 13, 18, 24, 33, 47, 70, 115, 155, 114, 70, 47, 33, 24, 18, 14, 11, 8, 5, 3, 1 [V:1ccYWJ Study I] | (0.79, 0.01, 0.21, 0.98) | <0.1% | inOutQuart 0.7%; inOutQuint 1.2% |
| M | Top row 319 … 124 (f0-f22), 115 (f32) [V:1ccYWJ Study H] | (0.57, 0.35, 0.11, 0.99) | 0.2% | CSS ease 6.8% |
| N | Height 3, 5, 8, 14, 25, 34, 37, 40 [V:1-6l8S Study C] | (0.73, 0.22, 0.35, 0.77) | 0.8% | CSS ease-in-out 3.6%; inOutSine 4.0% |
| O | 84, 87, 89, 90, 92, 93, 94, 95, 96, 97, 98, 99, 100% at 23.90-24.93 s [V:19NRDv Study 5.8] | unstable | 1.3% | (0,0,0,1) 2.9%; outQuart 4.7% |
| P | Steps 3, 10, 13, 11, 8, 5, 4, 3, 3, 3, 2, 2, 2 (duplicate removed) [V:15VhHR Study 3] | unstable | 0.6% | CSS ease 3.8% |
| R | x 127, 128, 127, 120, 101, 92, 73, 66, 57, 53, 49, 45, 41, 40, 38, 36, 35, 31 @20 fps [V:1-6l8S Study F] | (0.36, −0.13, 0.04, 0.77) | 1.8% | CSS ease 7.7% |
| X1 | Centre x 460, 464, 469, 476, 491, 513, 558, 694 [V:1i2L14 Study D] | (0.47, 0.05, 0.93, 0.08) | 0.2% | inQuint 3.8%; inQuart 4.6% |
| X2 | Left edge 176, 179, 184, 192, 203, 220, 245, 287 [V:1ccYWJ Study B] | (0.45, 0.06, 0.81, 0.32) | 0.1% | M3 emph-accel 2.7%; inCubic 3.7% |
| X3 | Δ 4, 4, 8, 12, 12, 20, 28, 36 [V:1ccYWJ Study B] | unstable | 0.5% | M3 emph-accel 5.4%; inCubic 5.7% |
| X4 | Δ 1.9, 2.1, 3.8, 7.2, 11.9, 20.6 % H @24 fps [V:1Hcg3X Study A] | (0.21, 0.09, 0.7, −0.04) | 0.1% | M3 emph-accel 1.7%; inCubic 2.7% |
| X5 | Δ 0.3, 0.4, 0.7, 0.9, 1.5, 2.6, 4.1, 7.1, 19.4 % W @24 fps [V:1Hcg3X Study D] | (0.42, 0.04, 0.92, 0.02) | 0.1% | inQuint 3.7%; inExpo 4.2% |
| X6 | Δ 4, 6, 8, 9, 10, 29, 29, 74 px [V:1-6l8S Study H] | (0.28, 0.07, 0.86, 0.11) | 1.1% | M3 emph-accel 2.8%; inCubic 4.6% |
| X7 | Δ 4, 9, 17, 37, 74 px [V:1CSXtQ Study A] | unstable | <0.1% | M3 emph-accel 0.9%; inCubic 2.0% |
| X8 | Δy 4.9, 5.8, 7.1, 7.8, 9.4, 10.2, 12.7, 15.1, 17.6, 20.8, 28, 32 px [V:1i2L14 Study G] | unstable | 0.1% | inQuad 2.9%; inSine 4.9% |
| X9 | Δ 2, 4, 2, 4, 4, 4, 6, 6, 6, 8, 9, 10, 12, 13, 17, 20 px (cadence duplicates removed) [V:1CSXtQ Study G] | (0.24, 0.07, 0.73, 0.23) | 0.3% | M3 emph-accel 7.7%; inCubic 8.2% |

"Unstable" means the least-squares bezier was ill-conditioned (control points at the bounds); use the token.

## Appendix B. Where the references overrule generic advice (all of this part)

| # | Generic advice | What the references do | Decision | Where |
|---|---|---|---|---|
| 1 | Text spring 0-3% overshoot, accents ≤10% [N] | 0% on type and UI in 7/8; overshoot only on playful props | **References win** | MP-U5, §19.6 |
| 2 | One entrance curve: M3 emphasized-decelerate [N] or EXPO [E] | Two entrance families; the common one (cards, objects) fits easeOutCubic, not the generic defaults (11.6-18.4% error) | **References win** | §19.2, §19.11 |
| 3 | Exit: M3 emphasized-accelerate [N] | Confirmed on 6/9 measured exits | Agreement | §19.2 |
| 4 | 3-6 f, 2-5% wind-up before objects move [N] | No wind-ups; narrative anticipation (dwell, pointing, build, pre-load, punch) | **References win** | §19.7 |
| 5 | Always render with 180° motion blur [N] | 3/8 never blur, 1 always, 4 selectively | **References win**: blur by style, mandatory only above ≈5% W/f | MP-S table, SP-V |
| 6 | Entrances 12-18 f, exits 6-9 f (M3 400/200 ms, converted) [N] | Words 4-7 f, statements 8-14 f, hero slams 8-13 f, UI 1-6 f; exits 4-6 f, whole cards 4-8 f (SP-T0) | **References win** for type and UI; [N] still fits cards (12 f) | §18.1-18.2 |
| 7 | Read hold ≥1.0 s for any text [N] | 1-2-word punch cards hold 10-15 f in fast sections | **References win** for 1-2-word cards only; [N] formula for 3+ words | §18.8 |
| 8 | Stagger groups ≤600 ms and ≤8 items [N] | UI groups agree; a cascade that *is* the proof runs longer (12 cards ≈2 s) | **References refine** | ML-06 |
| 9 | Typing at 2 chars per frame (60 chars/s) [E, inferred] | Readable prompts at 15-20 chars/s, key phrase 7-9; ≥40 only for held statements | **References win** | §18.3 |
| 10 | Push 1.00 → 1.05-1.08 on every shot [E, inferred] | Pushes 1.07-1.29× on holds in Calm-Tech; Wix locks camera and layout for 1 s on a sparse brand frame (one inline element still animates) | **References refine** | MP-U4 |
| 11 | Whoosh peaks on the first frame of the new shot [N, unverified] | Booms and whooshes sit at a move's peak velocity; cuts and hits lead the beat by 0-3 f | **References win** for motion-tied SFX | MP-U14, MP-X8 |
| 12 | Easy Ease as the "default smooth" (common AE practice) | Misses every measured entrance by 26-39% | **References win** | §19.0 |

## Appendix C. Evidence strength and gaps (read before relying on a number)

**Strong (frame-measured in ≥3 references, re-verified by the teardowns' adversarial checks):** the entrance/exit asymmetry; zero overshoot on type and UI; stagger values; UI state-change speeds; cursor timings; the shot envelope; the exit token; hold-life values; the anchor principle.

**Medium:**
- **Fitted curves** rest on 6-27 points per series, several from 640p frames and two from frame-rate-converted files; treat the third decimal as noise. "Unstable" fits are reported only through their best token.
- **Typing speeds** come from three references; two of the teardowns did not re-measure them in verification [V:15VhHR Verification], [V:1-6l8S Verification].
- **Tempo mapping**: only Bumper is strictly beat-locked; kivi locks its back half; the others sync at section level.

**Weak (1-2 references or inferred):**
- **Dashboards (1/8), charts (2/8), elastic bounce (1/8), animating on twos (1/8)**: tiered S or X.
- **3D angles** of tilted tables and decks were estimated by the analysts, not measured [V:19NRDv], [V:15VhHR].
- **ElevenLabs-style motion (MP-S9)** is entirely the [E] author's inference; only the orb, waveform and shimmer code values are sourced. Scrub real ElevenLabs videos before relying on its timings.
- **Text-only sources ([S], [W])** support intent only (e.g. "fluid camera", "crisp motion", "bouncy text"); they contribute no timings here.
- **Generative-video phrasing (L.3, right column)** is untested against Veo/Flow output [inferred]; only "one camera move per clip", the 24 fps clip rate and the subtitle problem are sourced [P].
- **9:16 behaviour** rests on one vertical reference (Chowdeck, captured from a monitor); vertical speed rules are mostly [inferred].
- **Motion blur thresholds** (≈5% W/f) come from one reference's flaw analysis plus [N]'s shutter default.

**Not covered here (other parts):** camera library, transition library, typography sizes, UI layout rules, sound design and the QC gate. This part supplies their speeds and eases.

---

## Audit (2026-10-08, adversarial pass)

Method: re-opened all 8 per-video teardowns and the [N], [E], [P], [S], [W] briefs and checked a sample of every section's numbers against them; recomputed every ease-token behaviour claim (§19.3) and the Easy-Ease / token RMSE values for atlas series A, B, D, F, K, X1, X2 from the Appendix A data (all reproduced within 0.1%).

Changes (28):
1-9. **Wix "dead-still 1.0 s hold" corrected** (defaults #25, MP-U4, MP-S4 row, §5.2 note, §5.7 #4, §18.8 row, §18.11 MP-S4 row, Appendix B #10). The teardown shows camera and line locked for ≈1.0 s, but "love" rises in 3 f at 0.87 s and the inline 3D heart keeps spinning [V:15VhHR Study 2]. The only fully still mid-film hold is the ≈0.65 s carousel card (frame-diff ≤0.6). Rule rewritten as a static-layout hold with one small element alive.
10-12. **Solar house "90% by f12" corrected** (MP-U3, §19.4 r = 0.85 row, §18.5 object slide-in). The teardown's own x series gives ≈82% at f12 and ≈90% at f16-17; its prose figure was inconsistent with its data.
13-14. **Phone wobble** corrected to ≈11° snap with +5° overshoot (≈45%, not 40%; "−12°" was not in the teardown); policy cap raised to ≤45% and spring recomputed (ζ ≈ 0.25, damping ≈15).
15. **§18.8 flaw citation** fixed: [V:126cpH t=2.07s] is a 2-word line, not a 5-word one; row now reads "3+ words" with both cases described correctly.
16-17. **Tempo table**: the solar row now states 64.6 BPM as measured and 129 as [inferred] (it was inverted); added a note that unmarked cells are computed from 1800 ÷ BPM.
18. [E] blur dissolve range corrected to 8-12 f (MP-S9).
19. E-HOP peak velocity corrected to ≈1.25× E-INOUT (computed), not ≈1.3×.
20. [S:Asana] counters tagged "inferred in source"; [S:PointCard] reworded to the sourced quote with the nudge motion tagged [inferred].
21. ML-29 blob period: "every 2-3 s" was attributed to [V:1ccYWJ] but is not in it; now cites the observed frame-to-frame motion and tags the period [inferred].
22. MP-U4: Bumper's 1-3%/s camera drift tagged as an estimate (the teardown did not track it).
23. MP-U14: "never appear after its sound" tagged as the [P] author's inference.
24. §19.8 camera "one move per shot": [P] covers generated clips only; animated-camera use tagged [inferred].
25. SP-V unblurred ceiling (≈5% W/f) relabelled as the analyst's recommendation, with the observed 10% (borderline) and 22-27% W/f (strobing) values; threshold tagged [inferred].
26. Organic ink-bloom mask widened to ≈20-27 f (the kivi teardown gives both values).
27. §19.8 mask feather "3-5% of frame width" tagged [inferred]; the sourced feathered fill edge is cited.
28. MP-A1 pointed to a non-existent rule "SP-U12"; now SP-U8 / SP-V.

Checks that passed without change: every [V] number sampled in MP-U1-U15, the curve atlas, §18.1-18.7 and ML-02/03/05/06/09/12/16/18/26/27 (e.g. "Take" 4.05× slam 64% in f1, Lottieicon ×1.36/f zoom, NOSTRA −20% press 3 f / release 6 f, HubSpot dropdown 6 f with 2 f rows, Chowdeck tossed card +15° → −3.5/−4°, kivi 12 of 32 light transitions, Bumper 11 of 18 cuts 0-2 f ahead of a 100 BPM beat); [N] tokens (M3, Carbon, Remotion spring 16.3%, 2.8% text spring, 180° shutter, read-time formula, 3 flashes/s); [P] BT.1359 values, Veo 24 fps, subtitle problem; [S]/[W] quotes (Slack, Bolt, Figma 60 → 15 fps, Zendesk, Airtable, motion.so, raivcoo, showreel.design). No frame-level claim rests on a text-only source; [S]/[W] appear only as intent. All 31 library entries carry when / why / how fast / premium / amateur.

Remaining known gaps: dashboards (1/8), charts (2/8), elastic bounce (1/8) and on-twos (1/8) are thin; MP-S9 ElevenLabs motion is entirely inferred (no ElevenLabs film was scrubbed); 3D tilt angles are analyst estimates; 9:16 rules rest on one phone-captured reference; the generative-video phrasing column (L.3) is untested; not every one of the ≈400 [V] citations was re-opened (sampled ≈60, with 9 errors found and fixed above), so a residual error rate of a few percent should be assumed.
