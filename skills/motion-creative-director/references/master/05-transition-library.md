# Master SaaS Motion Design System, Part 05
## Master §7 Transition Library

Draft v1, 2026-10-08. Built from frame-measured teardowns of the eight reference videos in the user's folder, plus text-only research. It covers every transition type named in the Phase-7 brief (match cut, shape match, object morph, UI morph, camera wipe, object wipe, mask wipe, zoom, depth, blur, light, perspective, portal, seamless camera move, hard cut, beat cut) and eight more types that the references use and the brief did not name. For each type it gives what it is, when to use it, its duration in frames, the outgoing and incoming motion, the camera, the ease, the sound, and whether and where the references use it, with measured durations. A senior motion designer, an editor or an AI video system should be able to specify, build and QC every scene change from this part.

Scope. Camera moves, depth and hero shots are in Part 04 (Master §6, §20, §10). Ease curves and speeds are in Part 03 (Master §5, §18, §19). This part uses them and cross-references their rule IDs (CM-, DP-, HS-, MP-, EA-, SP-). It repeats a number only where a transition depends on it.

---

## 0. How to read this part

**Units**
- **f**: one frame at 30 fps (33.3 ms). 30 f = 1 s.
- **% W / % H**: percent of frame width / height. Speed is given as % W (or % H) per frame, written **% W/f**. It transfers between resolutions.
  - 1% W/f = 19.2 px/f at 1920×1080 (**@1080p**).
  - 1% W/f = 10.8 px/f across a 1080×1920 frame (**@1920p**, 9:16).
- **Scale steps**: "×1.36/f" means the object grows 36% every frame. "+18% in 3 f" means total growth over 3 frames.
- **Growth ratio g**: in an accelerating (expo-in) move, each frame's step is g × the previous one. **Decay ratio r**: in a decelerating (expo-out) move, each step is r × the previous one.
- Values measured at a source resolution (1138, 1280, 1011 or 640 px wide) are converted and marked **(computed)**.

**Evidence tags** (the same as Parts 01-04)
- **[V:xxxxxx t=..s]**: the user's reference videos, measured frame by frame. This is the strongest evidence.
- **[S:brand]** / **[S:playbook]**: Superside text research. **[E]**: ElevenLabs style brief (its motion timings are its author's inferences). **[N]**: design-system tokens, standards, platform data. **[P]**: voice and footage pipeline brief (Veo/Flow facts). **[W:site]**: inspiration-site catalogues (titles and descriptions only).
- **[inferred]**: my own judgement, not directly observed or sourced.

Text-only sources ([S], [E], [W], [P]) support intent, vocabulary and structure. They never support frame-level timing.

**Priority.** The user's references outrank generic advice. Where they disagree, a **"References win"** note says so in place and explains why. Appendix A collects every ruling.

**Rule IDs**
- **TR-01 … TR-24**: transition cards (§7.2).
- **TR-U / TR-S / TR-X / TR-A / TR-SaaS**: universal principles, style-specific rules, experimental techniques, techniques to avoid, techniques especially good for SaaS (§7.7-7.11).
- Class tags on each card:
  - **U** = universal: measured in 3 or more references, none contradicting.
  - **S** = style-specific. **X** = experimental (one reference, or untested). **A** = avoid. **SaaS** = especially good for SaaS.

### Reference roster

| Tag | Reference | Frame / length | Style |
|---|---|---|---|
| [V:1-6l8S] | kivi, voice-AI dictation launch | 16:9, 77.8 s | Minimal Premium × soft-cinematic UI demo |
| [V:126cpH] | Chowdeck delivery-app ad (measured through a crop of an AE screen capture; animated on twos, ≈12 fps) | 9:16, ~18 s | Playful illustrated collage + UI demo |
| [V:15VhHR] | Wix AI site builder (25 fps master in a 30 fps file) | 16:9, 53.9 s | UI demo inside an editorial brand frame |
| [V:19NRDv] | Bumper PRO payments launch | 16:9, 67.2 s | Kinetic-type launch with 3D UI proof |
| [V:1CSXtQ] | OpenAI × HubSpot connector spot (25 fps master in a 30 fps file) | 16:9, 30 s | Minimal Premium, prompt-native, one 3D beat |
| [V:1Hcg3X] | "How do solar panels work?" (24 fps animation in a 30 fps file) | 16:9, 35.8 s | Editorial 2.5D explainer |
| [V:1ccYWJ] | Lottieicon icon-library promo | 16:9, 44.3 s | Fast startup launch, dark neon |
| [V:1i2L14] | NOSTRA studio promo | 16:9 inset, 35 s | Monochrome brand-system explainer |

### 0.1 Transition census: what the eight references actually do

| Ref | Scene changes (corrected) | One change every | Hard-cut share | Plain crossfades between scenes | Signature device (uses) | Hero one-off transitions | Music policy at cuts | Blur on transition motion |
|---|---|---|---|---|---|---|---|---|
| kivi [V:1-6l8S] | 32 | 2.4 s | ≈28-34% (9 of 32 in the teardown's transition table; 11 in its beat statistics, which count punch cuts as hard cuts); 12 of 32 pass through white light | 1 (logo → symbol, 17 f) | Expo punch into a cut (×4) | Pill burst on the drop; click bloom; ink-bloom mask | Speech-led first half; back half on a 127 BPM grid (5 of 6 cuts within 1.1 f) | None, even on whips |
| Chowdeck [V:126cpH] | 10 (+≈6 in-shot events) | 1.8 s | ≈40-50% | 0 | Instant flat → real shape swap (×3) | Card → notification morph; tilt through clouds | Not beat-cut (0 of 5 hard cuts on onsets); 1 click on an onset | Directional blur on the vertical push only |
| Wix [V:15VhHR] | 33 | 1.6 s | ≈100% (grade dissolves happen inside shots) | 0 | Cut-in / pull-out cut (×5+); thermal → colour switch (×3) | Icon → prompt morph; deck → heart collapse | Section-level only (7 of 33 cuts within ±2 f, chance 5.8) | Only on the carousel whip and page scrolls |
| Bumper [V:19NRDv] | 26 (18 hard + 8 seamless) | 2.6 s | 69% | 0 (one 4 f dissolve to white) | Light/dark world flip (×7); scale snap (×5) | Inverted match cut; push-through; chevron wipe; implosion | Beat-locked: 11 of 18 cuts 0-2 f **before** a 100 BPM beat | On every move |
| HubSpot [V:1CSXtQ] | 9 (8 hard + 1 blur dissolve) | 3.3 s (≈2.0 s counting in-take beats) | 89% | 0 | Accelerate into the cut, decelerate out (×7) | Send match cut → screen-to-world → particles → dolly | 6-7 of 8 cuts on a transient ±2 f; silence gaps before hits | Only in the 3D beat and the defocus dissolve |
| Solar [V:1Hcg3X] | 21 (16 hard + 5 seamless) | 1.7 s | 76% | 0 | Expo-in whip to an empty plate, then cut (×6) | Light-source match; particles → bolt + flash frames | Loose (5 of 16 within ±2 f); mid-act 4 of 5 on downbeats | 1 blurred frame on the hook exit only |
| Lottieicon [V:1ccYWJ] | 24 | 1.8 s | ≈79% (≈19 of 24 are cuts with a designed pre-roll) | 0 (one 3 f dim-to-texture) | Ease-in "suck-in" shrink into the cut (×3); whip exits (×3) | Bell zoom-through; light-build → dome | Loose on music; SFX locked to motion (9 of 11 events) | None, even at 22-27% W/f (strobes) |
| NOSTRA [V:1i2L14] | 18 (13 hard + 5 other) | 1.9 s | 72% | 0 (one 4 f blur dissolve) | Green ↔ white polarity flip (11 of 13 cuts) | Dot → eye match; whip; burst + hex iris; click → logo | Not beat-cut (3 of 14, chance) | Whip's last 2 f only |

**What the census says**
1. **No reference uses a plug-in transition.** There are no luma wipes, page curls, spins, glitch packs or light-leak presets in any of the eight. Every "effect" is choreography: an object, a shape, the camera or light doing something with a reason.
2. **Hard cuts carry the film.** In six of eight, hard cuts make up 69-100% of scene changes. The craft sits in the frames on either side of the cut, not in a bridge between them.
3. **Crossfades between scenes are almost extinct.** In about 362 s of reference footage there are only two opacity blends between shots: kivi's logo → symbol hand-over (17 f, 2 f overlap) [V:1-6l8S t=72.27-72.83s] and Lottieicon's 3 f dim of the icon wall to a 15% texture under the counter [V:1ccYWJ t=9.833s]. Other dissolves are short blur dissolves (4-8 f) or pass through white.
4. **Every film has one signature device used 3-12 times, plus 2-4 one-off hero transitions.** The repetition teaches the viewer the grammar; the hero transitions mark the big turns.
5. **Changes come about every 1.6-3.3 s** (median ≈1.85 s across the eight). In-shot events come faster: one every 0.7-0.85 s in the densest films [V:126cpH] [V:1i2L14].
6. **Music sync is a style choice, not a rule.** Three films lock cuts to music (Bumper, kivi's back half, HubSpot's transients). Five do not, and sync only section-level events (drops, suck-outs, re-entries) or SFX to motion.

### 0.2 Duration bands (use these names in briefs and prompts)

| Band | Frames @30 | ms | What lives here (measured) |
|---|---|---|---|
| **CUT** | 0 f | 0 | Hard cuts, match cuts, cut-ins, polarity flips, instant shape swaps, state jump-cuts |
| **SNAP** | 1-2 f | 33-67 | Collapse-to-dot (1 f) [V:1i2L14 t=1.067s]; in-place word swap (1 f) [V:1i2L14 t=31.50s]; blur-out cut (1-2 f) [V:15VhHR t=25.73s]; defocus-out before a cut (1-2 f) [V:19NRDv t=10.97s]; breath frame (1 f) |
| **QUICK** | 3-4 f | 100-133 | Radial white bloom (3-4 f) [V:1-6l8S t=62.90s]; blur dissolve to white (4 f) [V:1-6l8S t=16.90s] [V:19NRDv t=21.43s]; blinds wipe (4 f) [V:1i2L14 t=14.50s]; violet glow-bloom before a cut-in (3 f) [V:15VhHR t=23.83s]; dim-to-texture (3 f) [V:1ccYWJ t=9.83s]; 3 f dissolve into B&W [V:1-6l8S t=53.57s] |
| **SHORT** | 5-8 f | 167-267 | Blur dissolve (8 f) [V:1CSXtQ t=21.47s]; click bloom (6 f) [V:1-6l8S t=36.95s]; dot burst (6 f) and hex iris (7 f) [V:1i2L14 t=21.83s, 24.25s]; whips (6-9 f); punches (3-8 f); card → notification collapse (≈7 f) [V:126cpH t=11.03s]; icon → prompt stretch (6 f) [V:15VhHR t=4.0s]; 3D object wipe (8 f) [V:1ccYWJ t=16.10s]; scale-down recede (8 f) [V:19NRDv t=6.90s] |
| **MEDIUM** | 9-16 f | 300-533 | Push-through (9 f) [V:19NRDv t=18.25s]; zoom-through (10 f + 3 f stroke wipe) [V:1ccYWJ t=1.13s]; object wipe (≈10 f) [V:1Hcg3X t=2.93s]; vertical push (≈11 f) [V:126cpH t=2.53s]; chevron wipe (12 f) [V:19NRDv t=47.97s]; pill → card morph (≈13 f) [V:1-6l8S t=9.50s]; dolly through particles (≈15 f) [V:1CSXtQ t=19.95s] |
| **LONG** | 17-32 f | 0.57-1.07 s | Logo crossfade (17 f) [V:1-6l8S t=72.27s]; bottom-up wash (≈18 f) [V:1-6l8S t=46.0s]; chevron transition start-to-clean (≈20 f) [V:19NRDv t=47.83s]; brand colour dissolve (25 f) [V:15VhHR t=51.37s]; particle disintegration (≈28 f) [V:1CSXtQ t=19.00s]; screen-to-world pull-back (≈30 f) [V:1CSXtQ t=18.00s]; tilt through clouds (30 f + 10 f settle) [V:126cpH t=15.20s]; fade to black (≈33 f) [V:1ccYWJ t=43.10s] |
| **READ** | 60-72 f | 2-2.4 s | In-shot reading wipes only: split-screen panel (72 f) [V:1Hcg3X t=17.0s]; recap strips (≈70 f) [V:1Hcg3X t=32.53s] |

**Why bands matter.** A scene change shorter than about 4 f is perceived as a cut with a texture, not as a separate event. A change of 17 f or more is perceived as a camera move or a reveal in its own right, and it costs reading time [inferred]. The references put almost every bridge in QUICK-MEDIUM and spend LONG only on the one or two moves that explain something (screen-to-world, the tilt to the logo, the logo colour resolve).

### 0.3 Defaults card: the numbers to encode first

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

### 0.4 Transition ease vocabulary

The names are the same as Part 04 §0.4, so a brief can use one word for a curve.

| Name | Curve | Role in a transition | Measured where |
|---|---|---|---|
| **INTO-CUT** | Expo-in. Each step ×1.3-1.9 the previous one (×1.2 for a gravity drop). M3 emphasized-accelerate `(0.3, 0, 0.8, 0.15)` [N] is a softer stand-in | The last 2-11 f of the outgoing shot | Solar whips ×1.35-1.9 [V:1Hcg3X]; NOSTRA whip ×1.3-3 [V:1i2L14 t=5.87s]; kivi punches (growth 7→10→17→24 px) [V:1-6l8S t=7.83s]; Lottieicon shrink (deltas 4, 4, 8, 12, 12, 20, 28, 36) [V:1ccYWJ t=2.33s] |
| **SETTLE** | Expo-out, `cubic-bezier(0.16, 1, 0.3, 1)` [N] | The first 6-25 f of the incoming shot | Bumper "Take" 64% of the change on frame 1, 86% by frame 3 [V:19NRDv t=0.00s]; Lottieicon toolbar 50% in 4 f of a 25 f move [V:1ccYWJ t=12.17s] |
| **COVER** | Expo-out on the leading edge of a wipe, or near-linear for an iris | Mask and shape wipes | Chevron boundary 187, 184, 156, 125, 100, 82, 68, 51 px/f @1138 (16.4% → 4.5% W/f) [V:19NRDv t=47.97s]; hex iris ≈linear [V:1i2L14 t=24.25s] |
| **BURST** | Exponential area growth, ×2-2.5 per frame | Burst and bloom covers | Pinwheel 0.1 → 1.7 → 4.6 → 9.6 → 23.7 → 49% of frame in 6 f [V:1i2L14 t=21.83s] |
| **GLIDE** | Symmetric expo in-out, peak at 50-55% | Seamless camera transitions | HubSpot pull-back [V:1CSXtQ t=8.2-8.9s]; Chowdeck cloud tilt S-curve [V:126cpH t=15.20s] |
| **BRIDGE** | Decelerate 11-14 f → dwell 6-7 f → accelerate 13-21 f | Moving between items in a strip or a deck, then cutting | Wix carousel and deck [V:15VhHR t=14.13s, 48.27s] |
| **READ** | `cubic-bezier(0.45, 0, 0, 1)` (fitted, 1.5% RMSE) | Reading wipes that bring in new text | Solar split-screen panel [V:1Hcg3X t=17.0-19.4s] |
| **NO SPRING** | 0% overshoot | Every camera move and every premium transition | 7 of 8 references |

---

# Master §7. Transition Library

## 7.0 What a transition is for, and why fewer effects read as more expensive

A transition has three jobs, in this order:
1. **Keep the eye where the next important thing will be.** The viewer should never search the new frame. Matched positions, continued directions and anchored elements do this.
2. **Explain a change.** A click becomes the next scene; data flies from one app into another; a word's meaning becomes the wipe. A transition that explains is content, not decoration.
3. **Set the energy.** Accelerating into a cut and decelerating out of it sets pace without shortening shots.

**Why restraint reads as premium.** Template packs and amateur edits spend their energy *between* shots: a spin, a glitch, a luma wipe that has nothing to do with either shot. The references spend it *inside* shots and in the 4-10 frames on either side of a hard cut. That is cheaper to watch, because the eye only processes one new image, and it is harder to fake, because the motion has to match on both sides [inferred]. The census shows the outcome: zero plug-in transitions in eight professional films (§0.1).

**Why the cut is the default.** A cut costs zero frames of reading time. With a velocity hand-off, a shared shape or a polarity flip, it also feels like a designed transition. Use a bridged transition only when it adds meaning (TR-U3).

## 7.1 The library at a glance

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

## 7.2 Transition cards

Each card follows the same order. **What it is. Best use. Duration. Outgoing. Cut / bridge. Incoming. Camera. Ease. Sound. Observed. Why it works. Do / Don't. Spec line** (a one-line description to paste into a storyboard, an edit decision list or a generation prompt).

---

### TR-01 Hard cut [U]

**What it is.** One frame of shot A, then one frame of shot B, with no bridge. In the references it is almost never "plain": the frames either side are designed (TR-04, TR-11, TR-18, TR-19).

**Best use.** The default for every scene change. Mandatory between claim and proof, between a prompt and its result, and inside fast montages.

**Duration.** 0 f.

**Outgoing.** Accelerating (INTO-CUT) over the last 6-10 f, or leaving the frame to an empty plate (TR-19). Never mid-settle: a cut during an ease-out reads as a mistake, because the eye was told the move was ending [inferred].

**Incoming.** Already moving, decelerating (SETTLE). Lottieicon cuts *into* a move that is 50% complete within 4 f [V:1ccYWJ t=12.17s].

**Camera.** Any. The cut carries the change of framing (Part 04 CM-20).

**Ease.** INTO-CUT out, SETTLE in.

**Sound.** A cut needs no sound. Put a hit on it only when it is a section boundary or a beat cut (TR-02). HubSpot lands 6-7 of 8 cuts on a transient [V:1CSXtQ]; Wix lands only section changes [V:15VhHR].

**Observed.**
- Hard-cut share 69-100% in six films (§0.1).
- HubSpot has "no crossfades between scenes", 8 hard cuts and one blur dissolve in 30 s [V:1CSXtQ].
- Wix is hard-cut only across 34 shots [V:15VhHR].

**Why it works.** A cut costs no time and asks the brain to process exactly one new picture. The designed frames on either side give it the feeling of a transition without the cost.

**Do / Don't.**
- Do: design the last 6-10 f of A and the first 6-20 f of B together.
- Don't: cut from a held, motionless frame to another held frame unless one of them is a deliberate stop (final lockup) — it reads as a slideshow [V:1Hcg3X] (perpetual-drift rule).
- Don't: change on-screen copy across the cut. Wix's wide shot types "make" and its cut-in types "create" [V:15VhHR t=6.57s].

**Spec line.** `TR-01 hard cut @f{n}; A: last 8 f INTO-CUT; B: first 12 f SETTLE.`

---

### TR-02 Beat cut [S]

**What it is.** A hard cut placed on a music event: a kick, a beat-grid line, an onset or a drop.

**Best use.** Kinetic-type launches, montages and the second half of a film once the music takes over. Not for UI demos that must wait for an action to finish.

**Duration.** 0 f. **Offset: 0-2 f before the beat.**

**Outgoing / incoming.** As TR-01. Bumper's word builds also run on the grid: words start 7-10 f apart, about an eighth note at 100 BPM [V:19NRDv].

**Camera.** Any. Bumper's in-shot beats (logo stroke, scale snaps, orbit steps 1.25 s apart = 2 beats) also sit on the grid [V:19NRDv].

**Ease.** As TR-01.

**Sound.** The beat is the sound. Add nothing on top unless it is a section hit.

**Observed.**
- **Bumper:** 11 of 18 hard cuts land **0-2 f before** a 100 BPM quarter note (chance ≈17%, p < 0.001); 4 more within 1 f of an eighth-note off-beat [V:19NRDv].
- **kivi:** in the back half (52-70 s), 5 of 6 cuts sit within 1.1 f of a 127 BPM eighth-note grid; the first half follows the dictated speech [V:1-6l8S].
- **HubSpot:** 6-7 of 8 cuts on a transient within ±2 f; the miss (22.60) is 5 f early of a kick [V:1CSXtQ].
- **Not beat-cut:** Wix (7 of 33, chance 5.8), Chowdeck (0 of 5 hard cuts), NOSTRA (3 of 14, chance), Solar (loose) [V:15VhHR] [V:126cpH] [V:1i2L14] [V:1Hcg3X].
- [S:Figma] Config recap: about one shot per second (57.7 scenes/min) over upbeat music, with no VO (cut rate from a third-party teardown snippet; text-only; whether cuts sit on beats is not documented).

**Why it works.** Viewers tolerate picture leading sound far more than sound leading picture ([P], ITU-R BT.1359: +45 ms early is detectable, −125 ms late). A cut 1-2 f early lands *as* the beat is heard [inferred from [P]]. A late cut reads as sluggish [V:19NRDv avoid list].

**Do / Don't.**
- Do: pick one edit driver per section. kivi and HubSpot switch from feature-led to music-led halfway [V:1-6l8S] [V:1CSXtQ].
- Don't: half-sync. A cut 3-5 f off a kick is worse than one clearly off it. If it cannot sit on the transient, move it into a silence gap [V:1CSXtQ avoid list].
- Don't: force UI cuts onto a beat before the UI action finishes. Wix syncs only at section level for this reason [V:15VhHR].

**Spec line.** `TR-02 beat cut @f{beat−1}; grid {BPM}; picture leads by 1 f.`

---

### TR-03 Match cut (graphic, position, colour, inverted) [U]

**What it is.** A hard cut where something stays the same across the cut: position, silhouette, colour field or the text itself. The thing that changes (world, colour, scale, polarity) is the message.

**Best use.** World changes that must feel like one idea: problem → solution, night → day, outside → inside, generic → brand. The inverted variant (same layout, colours flipped) is the cleanest "lights out / lights on" reveal.

**Duration.** 0 f. Optional 2 f hold on the matched element before the cut.

**Outgoing.** The matched element sits still or decelerates into its matched position. Solar shrinks a white disc (~11% W) to a ~4% W point in 2 f, then **holds it 2 f** before the cut [V:1Hcg3X t=3.30-3.43s].

**Incoming.** The matched element is in the same place within **±5% W**. Everything else is new.

**Camera.** Locked across the cut. Any camera move starts after it.

**Ease.** Matched element: none or SETTLE. New context: SETTLE.

**Sound.** A tonal "ting" for a light or shape match [inferred]; a drop or hit for an inverted world flip (Bumper's cut sits on an intro kick) [V:19NRDv t=1.17s].

**Observed.**
- **Inverted match:** "Take payments like a" keeps an identical size and position while white-on-navy replaces navy-on-white (luma 223 → 46) [V:19NRDv t=1.167s].
- **Shape + position:** NOSTRA's dot in the hand becomes the creature's eye within ≈5% W, with the background flipping green → mint-white [V:1i2L14 t=1.433s].
- **Light source:** sun → point of light → lamp at the same spot [V:1Hcg3X t=3.30-3.43s].
- **Colour field:** orange court → orange website [V:15VhHR t=12.47s].
- **Concept match:** the bouncing "thinking" dot of the black hook becomes the caret on white, at frame centre [V:1CSXtQ t=2.133s].
- **Match-on-action:** the melon falling at the end of one shot falls from the top of the next [V:126cpH t=9.27s].
- **Continuity reframe:** prompt card → result card on the same blurred plate, reframed right and closer [V:1-6l8S t=22.87s, 67.70s]. This is the SaaS prompt → result pair (Part 02 CO-U23).

**Why it works.** The eye locks onto the matched element and does not have to search the new frame. Because the element did not change, the brain attributes all the change to the world around it, so the cut *states* the transformation.

**Do / Don't.**
- Do: keep the matched element within ±5% W and at the same angle (Chowdeck's swaps match silhouette, position *and* angle [V:126cpH]).
- Do: change exactly one thing besides the context: polarity, colour or scale.
- Don't: "match" two elements that are 15-20% apart. Wix's theme swap moves the hero bottle from ~72% to ~54% W and grows it 1.5-2×, which reads as a loose recurrence, not a match [V:15VhHR t=19.2s].

**Spec line.** `TR-03 match cut @f{n}; matched: {element} at ({x}%W,{y}%H) ±5%W, scale ×{s}; changes: {polarity|colour|context}; hold matched 2 f before.`

---

### TR-04 Motion match cut (velocity hand-off and screen-direction continuity) [U]

**What it is.** A cut inside one continuous movement. Shot A accelerates in a direction; shot B starts already moving the same way and decelerates. The eye experiences one move.

**Best use.** Action → consequence (send → message lands), feature → next feature, any cut that should feel unbroken.

**Duration.** 0 f cut. Pre-roll 3-10 f. Settle 5-20 f.

**Outgoing.** INTO-CUT in the travel direction. HubSpot's prompt content moves up 3, 3, 5, 7 px/f @720 before "send" (≈0.4 → 1.0% H/f, computed) [V:1CSXtQ t=17.60-17.77s].

**Incoming.** Same direction, **3-5× faster on the first frame**, then SETTLE: the sent bubble continues up at 34, 34, 31, 7, 4 px/f @720 (≈4.7% H/f → 0.6% H/f, computed) [V:1CSXtQ t=17.80s].

**Camera.** The direction is the camera's. Solar carries "up" through hook → sun → lamp and "left/right" through lamp → house → wafer [V:1Hcg3X]; Chowdeck reads bottom-to-top as forward [V:126cpH t=2.53s].

**Ease.** INTO-CUT → SETTLE.

**Sound.** A small whoosh or hit on the cut frame (HubSpot: ≈3 dB bump over the bed at 17.80) [V:1CSXtQ].

**Observed.**
- Velocity hand-off (above) [V:1CSXtQ t=17.80s].
- Directional whip exits that the next shot continues, six times [V:1Hcg3X].
- NOSTRA's whip: shot 6 opens with "VIDEO" drifting right, decelerating 21, 10, 6, 4, 4, 2 px/f [V:1i2L14 t=6.13s].
- Scale momentum: kivi's tagline punches +18% into the cut, then the wordmark keeps a decelerating push of +29% over 1.17 s [V:1-6l8S t=71.10s].
- Scale direction: Lottieicon's grid pulls back −38% in 11 f, and the next title enters at ≈2.1× and shrinks to 1× over ≈18 f, continuing the shrink [V:1ccYWJ t=33.20s].

**Why it works.** Peak velocity is where the eye expects a change. Because the motion vector continues, the visual system treats both shots as one object moving, and the cut disappears.

**Do / Don't.**
- Do: make the incoming first-frame speed the *highest* speed of the shot, then decelerate.
- Do: fix a direction grammar per film ("up = forward", "vertical = progression, horizontal = context") and keep it (Part 02 CO-U24).
- Don't: reverse direction across a cut unless the story reverses. Solar breaks its grammar exactly once, with a diagonal at the money payoff [V:1Hcg3X t=28.43s].

**Spec line.** `TR-04 motion match @f{n}; dir {up|left|…}; A last 4 f INTO-CUT to {v}%/f; B first f {3–5×v}%/f, SETTLE over 6 f.`

---

### TR-05 Shape match and shape-match chains [U]

**What it is.** A primitive shape (circle, square, line, silhouette) survives the cut or the swap while what it *is* changes: a dot becomes an eye, a flat icon becomes a real banana, a point of light becomes a lamp. A **chain** carries one primitive across three or more setups.

**Best use.** Abstract → concrete, promise → proof, opening sequences that must feel like one thought. It is the safest "morph" for AI-generated work because nothing is warped (TR-A12).

**Duration.** 0 f (cut or instant swap). A 1-2 f collapse-to-shape before it is optional.

**Outgoing.** The source collapses to the primitive or is already that shape. NOSTRA's "A WAY" text box collapses to an 8 px dot **in 1 f** [V:1i2L14 t=1.067s].

**Incoming.** The same shape at the same position (±5% W), now a new object. A physical reaction within ≈0.6 s sells it: each Chowdeck real object falls and rotates after its swap (banana 14 f, ease-in, 70-90°) [V:126cpH t=7.27-7.73s].

**Camera.** Locked across the swap; a slow push may continue through it (Chowdeck's mosaic push-and-pan continues through all three swaps [V:126cpH]).

**Ease.** Swap: none. Reaction: gravity ease-in or SETTLE.

**Sound.** A soft pop or tick on the swap [inferred]; Chowdeck's swaps are not on onsets (chance level) [V:126cpH].

**Observed.**
- **Chain:** one circle survives five setups in 4.1 s: "?" dot → "A WAY" dot → eye → circle chain → ring → green dot → typing dots [V:1i2L14 t=0.0-4.1s].
- **Many → one, inverted:** a ring of ≈18 white circles on green cuts to one green dot on white [V:1i2L14 t=3.567s].
- **Flat → real:** three instant swaps on one 12 fps pose change each, no dissolve [V:126cpH t=6.77, 7.70, 8.43s].
- **Light point:** see TR-03 [V:1Hcg3X].
- **Shape to UI:** Lottieicon cuts to a white circle (32.5% H) that shrinks expo-out to 16.6% H in 6 f, then stretches into a search pill in ≈7 f [V:1ccYWJ t=39.07-39.70s].

**Why it works.** The eye tracks the shape, so five setups feel like one thought. The swap is instant, so there is no in-between frame where the object is neither one thing nor the other.

**Do / Don't.**
- Do: change scale or polarity at each link, so each step has energy [V:1i2L14].
- Do: swap instantly (0 f). Chowdeck's swaps were first misread as 2-4 f dissolves; frame-accurate checking showed they are instant [V:126cpH verification].
- Don't: dissolve between two different objects at the same spot. A half-transparent banana over a half-transparent icon reads as a mistake [inferred].

**Spec line.** `TR-05 shape match @f{n}; primitive {circle Ø{d}%H} at ({x},{y}) ±5%W; A {object} → B {object}; swap 0 f; B reaction {fall 14 f ease-in, 70° rot | SETTLE 6 f}.`

---

### TR-06 Object morph (including many → one and particles) [U]

**What it is.** One object visibly becomes another over several frames: a pill unfolds into a card, particles fuse into a bolt, a ring of chips implodes into a logo, a deck of cards collapses into a heart.

**Best use.** The single biggest idea of the film. "Many → one" is the canonical SaaS climax: every integration, file or output collapses into the brand mark.

**Duration.** 6-18 f for the morph itself. Longer only for reading-speed scale chains.

**Outgoing.** The source either rests (kivi's pill) or accelerates into the change (Bumper's chips collapse inward with blur).

**Incoming.** The target arrives with a SETTLE and, at the climax, one punctuation: a particle burst of ≤12 particles over 10 f, or a soft halo [V:19NRDv t=55.27-55.60s].

**Camera.** Locked or a slow push. After an implosion, Bumper pulls back slowly on the logo (ease-in-out, ≈1 s) [V:19NRDv t=55.6-56.6s].

**Ease.** Symmetric in-out for shape morphs; INTO-CUT for implosions; SETTLE for the result.

**Sound.** Riser into a hit on the implosion [V:19NRDv, inferred]; a rising zap into the particle fuse [V:1Hcg3X, inferred].

**Observed.**

| Morph | Duration | Mechanics | Evidence |
|---|---|---|---|
| Pill → slabs → line → card | ≈13 f | Bar height 3, 5, 8, 14, 25, 34, 37, 40 px over 8 f (S-curve); content fades in 2 f after it lands | [V:1-6l8S t=9.50-9.93s] |
| Particles → bolt | 6 f | ≈60 particles converge into a column (4 f) and fuse (2 f), then flash frames | [V:1Hcg3X t=12.60-12.80s] |
| Chips → logo (many → one) | 8 f + 10 f | B grows from the centre while chips collapse in with blur; ≈12 spark particles and a halo | [V:19NRDv t=55.00-55.60s] |
| Deck → inline slot → heart | ≈21 f accel + 6 f collapse | The 3D deck accelerates into the cut; the slot collapses to the heart in 6 f while the words close 87% of the gap | [V:15VhHR t=48.93-49.83s] |
| Label → square → tile → grid | ≈32 f | Expand expo-out (44% of travel on frame 1), 1 f snap-shrink, 6 f tilt onto a plane | [V:1i2L14 t=18.37-19.43s] |
| Circle → search pill | 6 f + ≈7 f | Expo-out shrink, then a horizontal stretch to a pill whose width follows the typed URL | [V:1ccYWJ t=39.07-39.70s] |

**Why it works.** A morph keeps object identity while changing function, which is exactly the story of most products (a button becomes a conversation, many tools become one platform). "Many → one" turns the abstract word "unification" into a physical event.

**Do / Don't.**
- Do: morph only between *geometrically simple* states (pill, card, circle, square, line), where the in-between frames are still clean shapes.
- Do: give the morph the film's biggest audio moment if it is the climax.
- Don't: morph text glyphs, faces, logos or detailed UI into each other. In-between frames show warped letters and broken geometry, the clearest AI-look tell (Master §21; TR-A12).
- Don't: use more than one many → one collapse per film [inferred].

**Spec line.** `TR-06 morph {A}→{B} f{n}–f{n+12}; S-curve; B content in at +2 f; climax: {≤12} particles 10 f + halo.`

---

### TR-07 UI morph (shared element, icon → UI, text → UI) [U · SaaS]

**What it is.** A UI element survives a scene change by changing form: an order card becomes a notification, a sparkle icon becomes a prompt bar, a typed headline grows a prompt bar around itself, a circle becomes a search field. The element never leaves the screen.

**Best use.** Moving from brand world into product world without a cold cut to a screen recording; moving between two product states (order → tracking; idea → input → result).

**Duration.** 6-13 f for the morph, plus 11-12 f for the background to change behind it.

**Outgoing.** The shared element starts changing shape. Everything else fades over the same frames (Wix fades all context to 0 over the 6 f of the stretch) [V:15VhHR t=4.0-4.2s].

**Incoming.** The new context resolves *behind* the shared element: blur → sharp, or a cut hidden by the blur.

**Camera.** Locked on the shared element. HubSpot adds a ×0.75 pull-back once the UI has built (≈21-31 f, cubic in-out, peak at 50-55%) [V:1CSXtQ t=8.0-9.03s].

**Ease.** Symmetric in-out on the shape; SETTLE on position.

**Sound.** The click that triggered it (TR-20); a drop or hit 8 f after the new world appears in Wix [V:15VhHR t=4.5s].

**Observed.**
- **Chowdeck card → notification:** at 11.03 the offset backing card vanishes; the card collapses with its **bottom edge anchored** (height 100 → 87 → 65 → 37%) and narrows 18% into the pill, ≈7 f in all. The background blurs to a colour wash and sharpens into the map over 11-12 f. No anticipation pop [V:126cpH t=11.03-11.43s].
- **Wix sparkle → prompt:** click at 3.97; the sparkle stretches into a pill over 6 f while all else fades over 6 f; near-hard cut to the iridescent field at 4.23 (a faint haze 1 f early) [V:15VhHR t=3.97-4.23s].
- **HubSpot text → UI:** a typed headline gains a border and shadow (1-3 f), a brand icon (≈3 f) and a toolbar (4-5 f), then the camera pulls back ×0.75 to reveal it is a prompt bar [V:1CSXtQ t=7.80-9.03s].
- **kivi:** the "Just speak" pill breaks into glass slabs and a thin line that unfolds into the transcript card (≈13 f) [V:1-6l8S t=9.50-9.93s].
- **Lottieicon:** circle → search pill → typed URL → spinner [V:1ccYWJ t=39.07-40.40s].
- [S:Airtable] "spreadsheet-to-app morph" and [S:Slack] "chaos-to-order" windows snapping into one app are described in text only.

**Why it works.** The viewer tracks one object while the world changes behind it. Keeping the anchor makes product UI feel like a continuation of the brand, not an inserted screen recording.

**Do / Don't.**
- Do: anchor the morph on one edge (Chowdeck anchors the bottom edge) so it reads as physical.
- Do: build UI around content the viewer has *already read* (HubSpot) — the UI then arrives as context, not clutter.
- Don't: add a scale "pop" before the morph by default. Chowdeck has none, and its morph reads as clean [V:126cpH verification].
- Don't: let a generator interpolate between two UI screens; composite the shared element and cut the background (§7.14).

**Spec line.** `TR-07 UI morph @f{n}: {card}→{pill}, bottom-anchored, 7 f in-out; context fades 6 f; BG blur 8→0 over 11 f behind it.`

---

### TR-08 Camera wipe: whip pan, whip tilt, whip scroll [U]

**What it is.** The camera (or the whole scene) accelerates out of a shot so fast that the move itself is the wipe. The cut lands when the subject has gone or is a streak.

**Best use.** Feature → next feature, energy between stories, the exit of a type card. In SaaS demos, a page scroll that whips is the "travel through the UI" version (Part 04 CM-17).

**Duration.** **6-9 f** expo-in, then a cut (range 2-11 f).

**Outgoing.** INTO-CUT with g ≈1.35-1.9 per frame to a peak of **13-20% W/f** (or % H/f for tilts). Solar's hook exit: deltas 1.9, 2.1, 3.8, 7.2, 11.9, 20.6% H per frame over 8 f, peak ≈222 px/f @1080p (computed) [V:1Hcg3X t=1.20-1.50s].

**Cut.** On the first frame after the subject has gone (TR-19), or **hidden behind the exiting element**: NOSTRA cuts at 6.133, while the card is still crossing the frame [V:1i2L14 t=6.10-6.13s].

**Incoming.** Continues the direction (TR-04), decelerating.

**Camera.** Pan, tilt or scroll. Strip carousels use the BRIDGE shape: decelerate ≈14 f → dwell ≈6 f → accelerate ≈13 f to the peak → land with a ≈16 f ease-out [V:15VhHR t=14.13-15.87s].

**Ease.** INTO-CUT; SETTLE on the far side.

**Blur.** Above 5% W/f, add 180° motion blur or bury the fast frames in the cut (Part 04 CM-U9). NOSTRA blurs only the last 2 f [V:1i2L14]; Lottieicon's unblurred 22-27% W/f hops strobe visibly [V:1ccYWJ t=30.57-32.57s].

**Cue.** Point before you whip. NOSTRA's cursor arrow starts turning ≈11 f before the whip and points right on its first frame [V:1i2L14 t=5.50-5.87s].

**Sound.** A whoosh that **ends on the fastest frame** (the last frame before the cut) [inferred: a recommendation in the NOSTRA teardown; NOSTRA itself has no measurable whoosh at its whip, V:1i2L14 t=6.1s]. Lottieicon's logo whip lands with a sub (−9.3 dB) within 2 f of the cut [V:1ccYWJ t=4.567s]. Wix uses no whooshes on its whips and relies on the music [V:15VhHR, inferred from the spectrogram]. Pick one policy per film.

**Observed.**
- Solar: six whip exits of 6-11 f, ×1.35-1.9 per frame, 15-20% of frame per frame; the house exit is 11 f at ×1.6 per frame, peak 19% W/f [V:1Hcg3X t=6.47-6.83s].
- NOSTRA: Δ 4, 5, 7, 15, 22, 45, 136 px/f @1011 (last on-screen frame ≈13.5% W/f), then ≈20% W/f as it leaves; 8 f on screen [V:1i2L14 t=5.87-6.10s].
- Bumper: whip-smear text exits of 2 f and 7 f; a vertical whip tilt with vertical blur over 3 f [V:19NRDv t=8.55, 47.83, 23.80s].
- Lottieicon: an 8 f whip exit right (deltas 3, 5, 8, 11, 17, 25, 42 half-res px; ≈7.4% W/f at the cut, computed), cut on an onset Δ0.5 f with a sub [V:1ccYWJ t=4.30-4.57s].
- kivi: text whips left over ≈4-6 f (ease-in), without blur [V:1-6l8S t=38.70-38.85s].

**Why it works.** The acceleration builds energy, and the subject leaving the frame motivates the cut. No effect layer is needed.

**Do / Don't.**
- Do: exit faster than you entered (about half the entrance duration; kivi enters in 8-14 f and exits in 4-6 f) [V:1-6l8S].
- Don't: whip in a random direction. Every whip must be continued by the next shot (TR-04) or cued (arrow, cursor, copy).
- Don't: run 24/25 fps whips in a 30 fps file. Duplicated frames judder on exactly these moves [V:15VhHR] [V:1Hcg3X] [V:1CSXtQ].

**Spec line.** `TR-08 whip {left} f{n−8}–f{n}: INTO-CUT g1.6 to 18%W/f, 180° blur last 2 f; cut @f{n} behind exiting {element}; B opens drifting {left}, SETTLE.`

---

### TR-09 Object wipe [U, used once per film]

**What it is.** A real object in the scene grows or passes across the frame until it covers it, and the next scene is revealed behind or after it: a wall rising, a card flipping through a headline, a cloud band crossing during a tilt.

**Best use.** A colour or world reset that must feel physical; turning a claim into its content ("50+ Categories" → the first category card pushes through the words).

**Duration.** **8-10 f** for the cover.

**Outgoing.** The covering object accelerates (Solar's house wall: dark covers 39% of the frame at 3.07, 68% at 3.20 and 94% at 3.30) [V:1Hcg3X t=2.93-3.30s].

**Incoming.** Revealed behind the object, or cut on the fully covered frame. Hide any colour swap *inside* the cover: Solar swaps the red sun for a white disc while the wall covers it [V:1Hcg3X t=3.17-3.27s].

**Camera.** Usually locked; a tilt makes a passing layer into the wipe (Chowdeck's cloud band crosses 15.53-16.23 during a tilt) [V:126cpH].

**Ease.** INTO-CUT on the cover; an edge-on → face-on rotation for 3D cards.

**Sound.** Lottieicon's card wipe carries no measurable SFX ("nothing at ... the card flip") [V:1ccYWJ verification]. A low "thud" or air movement is a reasonable choice [inferred].

**Observed.**
- Solar house wall ≈10 f [V:1Hcg3X t=2.93-3.30s].
- Lottieicon 3D card: a green edge-on sliver appears *between* "Ca" and "tegories", rotates 90° → 0° on Y in 8 f, grows to ≈45% W and occludes the text by frame 11 [V:1ccYWJ t=16.10-16.37s].
- Chowdeck cloud band as the wipe edge inside a 30 f tilt [V:126cpH t=15.53-16.23s].
- Bumper pre-loads a soft chevron as an object, then uses it as a mask (TR-10) [V:19NRDv].

**Why it works.** The cover has a physical cause, so the change of world feels inevitable rather than edited.

**Do / Don't.**
- Do: make the covering object part of the story (the house the sun lights; the first category card).
- Don't: use a generic shape sweep that belongs to neither scene ([S:Slack] "brand-shape wipes" in the logo's accent colours are text-only and inferred in the source).

**Spec line.** `TR-09 object wipe f{n}–f{n+9}: {object} rises to cover 39/68/94% at f+4/+8/+9; colour swap hidden at f+7; cut on full cover.`

---

### TR-10 Mask wipe (shape mask, blinds, split panel, band push, matte, ink bloom) [U as a family, ≤2 per film]

**What it is.** A shaped edge or matte reveals the next scene: a chevron, vertical strips, a sliding colour panel, a rising band, a silhouette matte, an organic ink edge.

**Best use.** When the shape *means* something (a chevron for "up a gear"; a watercolour edge for an emotional "Grandma" story; a split panel to pair two halves of a word). Otherwise use a cut.

**Duration.**
- **Covering wipes: 6-12 f.** Bumper's chevron boundary crosses the frame in ≈12 f; NOSTRA's blinds take 4 f [V:19NRDv t=47.97-48.37s] [V:1i2L14 t=14.50-14.63s].
- **Organic and colour washes: 7-20 f** [V:1-6l8S].
- **Reading wipes (in-shot): 20-72 f**, when new text arrives inside the wipe [V:1Hcg3X].

**Outgoing.** Text and objects exit ahead of the wipe (Bumper's line accelerates left into a light streak over 7 f before the mask) [V:19NRDv t=47.83-48.07s].

**Incoming.** Elements ride the wipe's direction and momentum: "This" enters from the right with defocus, sharp by 48.50 [V:19NRDv t=48.17-48.50s].

**Camera.** Locked. The wipe is the motion.

**Ease.** COVER: expo-out on the leading edge (Bumper: 187 → 51 px/f @1138, i.e. 16.4% → 4.5% W/f; 50% of the frame covered at frame 4). Blinds: 1 f stagger per strip.

**Sound.** The wipe starts on an onset [V:19NRDv t=47.97s]; a whoosh across it [inferred].

**Observed.**

| Variant | Duration | Mechanics | Evidence |
|---|---|---|---|
| Chevron shape mask | ≈20 f total (7 f exit + 12 f wipe) | Chevron pre-loaded ≈1 s earlier as a soft shape at the right edge; ease-in exit, ease-out wipe; a feathered periwinkle band trails | [V:19NRDv t=46.9-48.6s] |
| Vertical blinds | 4 f | 4 gradient strips, each ≈25% W, 1 f stagger | [V:1i2L14 t=14.50-14.63s] |
| Mask wipe-off and re-type | 25 f | Feathered edge ≈1 letter wide erases a phrase L→R at ≈1 letter/f (12 f), 1-2 f gap, re-reveals it (10-11 f); "VIDEO" stays as the anchor | [V:1i2L14 t=6.17-7.00s] |
| Split-screen panel | 72 f | A colour panel slides in from the right, READ ease (0.45, 0, 0, 1), peak 4.0% W/f | [V:1Hcg3X t=17.0-19.4s] |
| Band push | 20-32 f | A new colour band rises from below carrying content and becomes the frame; 1 empty plate frame, then a cut | [V:1Hcg3X t=19.47-20.53s] |
| Colour matte + defocus | ≈10 f | Live action opens as a flat yellow silhouette while the background sharpens (8 f); the matte drops in 1 f | [V:126cpH t=1.57-1.87s] |
| Watercolour ink bloom | ≈20 f + 6 f | A peach blot grows from centre with organic edges, overexposes to white, then the scene resolves | [V:1-6l8S t=38.85-39.75s] |
| Aurora wash | 4-7 f | A green blob sweeps across and dissolves the text | [V:1-6l8S t=1.50-1.73s, 28.27-28.40s] |

**Why it works.** A meaningful shape makes the wipe part of the copy. A motivated wipe also tells the viewer *which direction* the story moves.

**Do / Don't.**
- Do: pre-load the shape about 1 s before so the wipe is expected [V:19NRDv].
- Do: make incoming elements ride the same direction.
- Don't: use a decorative shape wipe more than twice in a film. Every reference uses at most one hard-edged shape wipe; NOSTRA's long list of unrelated devices is its main weakness [V:1i2L14 flaws].
- Don't: run a mask reveal of noisy pixels or glitch blocks longer than 12 f (NOSTRA's 26 f pixel build reads as noise) [V:1i2L14 t=16.63-17.50s].

**Spec line.** `TR-10 {chevron} mask wipe R→L f{n}–f{n+12}, COVER (50% at f+4), feather 2%W; pre-load shape f{n−30}; incoming rides R→L with blur 8→0 px over 10 f.`

---

### TR-11 Zoom transitions [U]

**What it is.** Scale carries the change. Six measured variants:

| Variant | What happens | Duration | Measured | Part 04 link |
|---|---|---|---|---|
| **Punch into a cut** | The subject scales up with an accelerating curve; cut on the last frame, often into 1 white frame | 3-8 f | +18% in 3 f (growth 7 → 10 → 17 → 24 px) [V:1-6l8S t=7.83-7.93s]; +33% in 3 f [V:1-6l8S t=18.23s]; +18% over 8 f [V:1-6l8S t=70.83s]; Wix: a 3 f ≈1.5× accelerating zoom into a cut-in [V:15VhHR t=16.53s] | CM-03 |
| **Suck-in shrink into a cut** | The subject shrinks with an accelerating curve; cut on the smallest frame | 8-18 f | −28% in 8 f (deltas 4, 4, 8, 12, 12, 20, 28, 36) [V:1ccYWJ t=2.33s]; −24% over 18 f [V:1ccYWJ t=26.53s]; ×0.76 (ease-in, 20 px/f on the last frame) [V:1CSXtQ t=21.93-22.57s] | — |
| **Zoom-through** | Exponential scale into an object until its interior becomes the next scene | 10 f + 3 f | 3 f ease-in, then ×1.36/f; ≈20× in 10 f; the strokes sweep off as split white bars over 3 f; the next scene is already inside the hollow [V:1ccYWJ t=0.87-1.27s] | CM-15 |
| **Cut-in / pull-out cut** | The edit does the zoom: same subject, 2-3.5× closer or wider | 0 f | Cut-ins 2× [V:1-6l8S t=35.47s], 2.5× [V:19NRDv t=13.13s], 3.4× [V:15VhHR t=6.57s]; pull-out cuts to 85%, 55%, 44% [V:15VhHR t=19.73, 32.83, 38.20s] | CM-13, CM-20 |
| **Scale-matched hand-off** | A: pull back or shrink (ease-in). B: enters 1.15-2.1× its rest size and shrinks to rest (ease-out) | 11 f + 18-20 f | 11 f pull-back −38% → title at ≈2.1× and 25% opacity, 1× by ≈18 f [V:1ccYWJ t=32.80-33.80s]; ×0.76 → next card at ×1.18, ≈20 f settle [V:1CSXtQ t=22.60s] | — |
| **Pull-back reveal (in shot, then cut)** | Detail → context, often in two stages | 6-31 f | Two-stage pull-out ≈4.1× over 1.0 s [V:126cpH t=5.20-6.20s]; 1.0 → 0.79 in 6 f, then 0.75 → 0.63 in 6 f [V:1i2L14 t=4.10-5.50s]; lens-distortion zoom-out ≈20 f [V:1ccYWJ t=7.30s] | CM-05, CM-19 |

**Best use.** Punch: into the biggest cuts (logo, drop), at most once per 15-20 s. Suck-in: out of type cards into a new object. Zoom-through: a hook or one portal moment. Cut-ins: detail inside UI demos. Scale-matched hand-off: between two type cards or out of a camera tour.

**Outgoing / incoming.** Outgoing INTO-CUT (punch, suck-in); incoming SETTLE, or still for cut-ins.

**Camera.** Digital scale on flat layers in 7 of 8 references; true 3D only in Bumper and HubSpot (Part 04 census).

**Sound.**
- Punch: cut within ±1 f of an onset, or into 1 white frame and a drop [V:1-6l8S t=18.367s (Δ0.0 f)].
- Zoom-through: a sub boom peaking when the object fills the frame (−6.2 dB, the loudest moment of the first 27 s) [V:1ccYWJ t=1.10s].
- Suck-in: a sub on the cut [V:1ccYWJ t=2.6s].

**Why it works.** Scale is the most legible signal of "closer / farther / into". An exponential zoom has constant perceived speed on a log scale, so it reads as a dolly into the object rather than a graphic growing [V:1ccYWJ WHY].

**Do / Don't.**
- Do: prefer cut-ins of 2-3.5× over animated zooms for UI detail; reserve animated pushes for 1-2 moments [V:15VhHR rule 13].
- Do: start a scale-matched incoming title at ≤25% opacity so the oversize frame does not flash type at the viewer [V:1ccYWJ].
- Don't: punch more than 4 times in 78 s [V:1-6l8S rule 3].
- Don't: zoom through a detailed UI screen with a generator; the interior will warp. Zoom through a simple shape (bell, circle, button) and composite [inferred].

**Spec line.** `TR-11 punch: {subject} +25% f{n−5}–f{n} INTO-CUT (steps doubling); cut @f{n} → 1 white frame → {B}.`

---

### TR-12 Depth transition: push-through, dolly through a foreground, rack focus [U for rack/defocus · S for true 3D]

**What it is.** The camera passes *through* a layer (a table, a particle cloud, a page) or focus moves from one plane to another, and the next subject is what lies beyond.

**Best use.** Context → extraction → focus in data UI ("the whole table, then the two columns that matter"); the hero 3D beat; hiding a background swap behind defocus.

**Duration.** Push-through 9 f; dolly-through ≈15 f; rack focus 8-12 f (Part 04 CM-18).

**Outgoing.** The foreground layer blurs and falls away. Bumper's tables blur and drop back while the extracted columns stay sharp and rotate face-on [V:19NRDv t=18.25-18.55s].

**Incoming.** The target is sharp; labels drop on 1-5 f later (Bumper's "BUMPER"/"DMS" pills drop in 5 f) [V:19NRDv t=18.58-18.75s].

**Camera.** A true 3D dolly (HubSpot ×2.3 in ≈15 f, foreground particles growing to 30-40 px and going to bokeh) [V:1CSXtQ t=19.95-20.47s], or a 2D rack focus (blur radius ≈8-10% W → sharp, ease-out) [V:126cpH t=1.60-1.83s, 11.07-11.43s].

**Ease.** SETTLE (ease-out) on the dolly and on the rack.

**Sound.** A whoosh on the push-through [V:19NRDv, inferred]; HubSpot's dolly sits under the music after a hit at 19.05 [V:1CSXtQ].

**Observed.**
- Bumper push-through, 9 f [V:19NRDv t=18.25-18.55s].
- HubSpot dolly through particles, ≈15 f, ×2.3 [V:1CSXtQ t=19.95-20.47s].
- Chowdeck rack focus as the hidden background swap of a UI morph (11-12 f) [V:126cpH t=11.07-11.43s].
- NOSTRA smash-in to a macro of text, then 3 f of pure green defocus ("inside the page") [V:1i2L14 t=10.633-10.73s].
- Bumper defocus on entering words (blur clears over 4-5 f) [V:19NRDv].

**Why it works.** Passing through a layer answers "what is inside this?" with the camera itself. It isolates the exact data that matters before any label appears.

**Do / Don't.**
- Do: show context first, lift the relevant part out for ≈0.5 s, then push through (Bumper rule 7) [V:19NRDv].
- Do: keep true DOF to one hero beat in minimal styles (HubSpot: 3.67 s of 30 s) (Part 04 DP rules).
- Don't: push through a plane that intersects another plane (HubSpot's HubSpot window pokes through the glass edge of the chat pane for ≈0.6 s) [V:1CSXtQ t=18.4-19.0s].

**Spec line.** `TR-12 push-through f{n}–f{n+9}: camera dolly ×2.2 SETTLE through {table}; table blur 0→12 px and drops back; {columns} stay sharp, rotate face-on; labels drop at f+11, 5 f.`

---

### TR-13 Blur transition: defocus dissolve, defocus-out cut, blur-to-sharp resolve [U]

**What it is.** Shot A loses focus (and opacity) while shot B is revealed crisp, or B resolves from blur. The quietest bridge after a cut.

**Best use.** From a dense UI shot into a calm type card; out of a dreamy hook; between "spoken" words in voice products.

**Duration.** **4-8 f.** The blur grows over the first ≈4 f.

**Outgoing.** Blur radius grows over ≈4 f while opacity falls [V:1CSXtQ t=21.47-21.73s].

**Incoming.** Crisp from its first frame (HubSpot's next text is crisp at 21.60, 4 f into the dissolve), or resolving blur → sharp in 3-5 f [V:1CSXtQ] [V:19NRDv].

**Camera.** A scroll or move that is accelerating into the dissolve keeps momentum (HubSpot's table scroll accelerates 8 → 24 px/f into it) [V:1CSXtQ t=20.40-21.47s].

**Ease.** Linear or ease-in on blur; ease-out on the incoming element.

**Sound.** A hit on the dissolve start (HubSpot: −5 dB at 21.43-21.47) [V:1CSXtQ].

**Observed.**
- HubSpot blur dissolve, 8 f [V:1CSXtQ t=21.47-21.73s].
- NOSTRA blur dissolve, 4 f: clouds defocus and fade while "A WAY" fades in [V:1i2L14 t=0.63-0.77s].
- kivi blur dissolves: 8 f [V:1-6l8S t=3.83s], 4 f [V:1-6l8S t=5.83s], 4 f to mint-white [V:1-6l8S t=16.90s].
- Defocus-out → cut: text loses focus for 1-2 f, then a hard cut [V:19NRDv t=10.97, 16.73s]; Wix gaussian-blurs the frame ≈2 f on the "Create" click, then cuts [V:15VhHR t=25.73s].
- Blur-to-sharp resolve: kivi's Kannada translation resolves over ≈20 f ("ink settling") [V:1-6l8S t=49.25-49.90s].

**Why it works.** Defocus is how eyes and lenses change attention, so a short blur dissolve reads as "look here now" rather than as an edit.

**Do / Don't.**
- Do: keep it to 4-8 f. **References win** over [E]'s 8-12 f / 10 f default: no reference blur dissolve exceeds 8 f.
- Don't: use it to hide a mismatch between shots. A blur dissolve between two unrelated layouts still looks like a crossfade [inferred].

**Spec line.** `TR-13 blur dissolve f{n}–f{n+6}: A blur 0→20 px over 4 f + opacity→0; B crisp from f{n+4}.`

---

### TR-14 Light transition: bloom, wash, click bloom, light build, flash frames, fade to white [U as a family · S as the default bridge]

**What it is.** Light fills (or nearly fills) the frame and the next scene emerges from it. Variants: a radial white bloom from a UI element, a click bloom, a colour wash, a slow light build that releases into a cut, flash frames, a fade to white.

**Best use.** Light-mode minimal films, where white is the film's "neutral room"; voice and AI products ("energy"); the moment something is *activated*.

**Duration.**
- Bloom: **3-6 f** [V:1-6l8S t=62.90s, 36.85s].
- Wash: **7-18 f** [V:1-6l8S t=1.50s, 46.0s].
- Light build: up to ≈2 s, released by a hard cut [V:1ccYWJ t=18.87-21.00s].
- Flash frames: **3 f + 2 f, once** [V:1Hcg3X t=12.83-12.97s].
- Fade to white at the end: ≈14 f [V:1-6l8S t=76.80-77.27s].

**Outgoing.** Light grows from a *source* in the scene: a clicked tile, a UI card's centre, an emitter. Lottieicon's glow area grows ≈×9.5 over 2.1 s, accelerating after 19.9 s [V:1ccYWJ].

**Incoming.** The next scene is already visible through the bloom (kivi's next title shows through the radial bloom) [V:1-6l8S t=62.93s], or emerges from 1-4 white frames.

**Camera.** Usually locked; an accelerating push into white works (kivi: 1.0 → 1.2 over 16 f, then a 5 f dissolve to white) [V:1-6l8S t=33.40-34.10s].

**Ease.** BURST for blooms; linear for washes and fades; ease-in for light builds.

**Sound.** A swell or riser under a light build, released on the cut with a sub hit [V:1ccYWJ t=21.2s]; soft chimes for blooms [V:1-6l8S, inferred]; an electric hit on flash frames [V:1Hcg3X, inferred].

**Observed.**
- kivi: 12 of 32 transitions are light/white-based (washes, blooms, white frames) [V:1-6l8S].
- Bumper: 4 f opacity-and-blur dissolve to white [V:19NRDv t=21.43-21.55s].
- Wix: a violet halo blooms behind the selected image in 3 f, then a cut-in [V:15VhHR t=23.83-23.97s]; a light streak flares across the ice object on one cut frame [V:15VhHR t=31.40s].
- Lottieicon: light build → hard cut on the frame with the largest glow area (the largest frame difference in the film) [V:1ccYWJ t=21.00s].
- Solar: flash frames at the conceptual peak: cyan 3 f, cream 2 f [V:1Hcg3X t=12.83-12.97s].

**Why it works.** Light is the universal sign of "on", "activated", "new". A bloom from a UI element ties the transition to an action, and white is a neutral that both shots share, so the change of material (UI → type → scene) disappears into it.

**Do / Don't.**
- Do: grow the light from a source in the frame.
- Do: keep flash frames to one moment, ≤3 f per colour and ≤3 flashes per second [N WCAG 2.3.1].
- Don't: put a 1-frame flash or dip of a colour that belongs to neither world (TR-A2).
- Don't: use white blooms as the bridge in a dark-mode film unless white is a defined brand light; use the accent glow instead (Lottieicon) [inferred].

**Spec line.** `TR-14 click bloom @f{n}: white radial from {tile} centre, BURST to full frame in 6 f; 3 f pure white; B title visible from f{n+7}.`

---

### TR-15 Perspective transition: angle-change cut, flatten, shrink-rotate, tilt onto a plane, screen-to-world [U]

**What it is.** The viewing angle of a UI plane changes across or during the transition: a steep 3D view cuts to face-on; a tilted card flattens to face the camera; a page shrinks and rotates into a carousel; a flat tile tips onto a floor grid; a 2D chat UI is revealed as one plane in a 3D world.

**Best use.** Moving between "object" views of the product (cards in space) and "reading" views (face-on); the single UI-to-3D moment.

**Duration.** 0 f (angle-change cut); 6-7 f (flatten, shrink-rotate, tilt); ≈30 f (screen-to-world).

**Outgoing / incoming.**
- **Flatten + cut-in:** a card rotates ≈15° → 0° in 7 f, then cut in [V:15VhHR t=33.33-34.47s].
- **Shrink-rotate:** the page scales 100 → 85% and swings on Y while the neighbour slides in, 6 f, then cut [V:15VhHR t=13.93-14.13s].
- **Angle-change cut:** steep diagonal rows → a face-on list, 1 frame [V:19NRDv t=22.67-22.70s].
- **Tilt onto a plane:** a tile tips into a floor grid in 6 f; distance fog takes the far rows [V:1i2L14 t=19.23-19.43s].
- **Screen-to-world:** ×0.57 in 10 f, then a further ×0.56 decelerating over 18-20 f (≈×0.32 in ≈1 s); the environment fades in over ≈6 f [V:1CSXtQ t=18.00-19.03s].
- **Dome horizon:** a curved dome rises from 88% to 58% H in 22 f expo-out after a light-build cut [V:1ccYWJ t=21.13-21.87s].

**Camera.** Rotation on Y or X only; no roll (0° roll in 8 of 8, Part 04).

**Ease.** SETTLE for flatten and tilt; INTO-CUT for shrink-rotate; front-loaded GLIDE for screen-to-world.

**Sound.** Under music in HubSpot [V:1CSXtQ]; a sub on the dome [V:1ccYWJ t=21.2s].

**Why it works.** Changing the angle tells the viewer "this is an object you can step back from" or "now read it". It turns flat UI into a place without inventing a fake 3D world.

**Do / Don't.**
- Do: read UI only at 0-15° of tilt; tilt further only in transit (Part 04 defaults #15).
- Don't: flatten a card *while* its text must be read; finish the flatten first, then cut in [V:15VhHR].

**Spec line.** `TR-15 screen-to-world f{n}–f{n+30}: pull-back ×0.57 in 10 f, then ×0.56 decel over 20 f; env fade-in 6 f; UI plane yaw ≤10°, roll 0°.`

---

### TR-16 Portal: iris, zoom into a hollow, bloom portal [X]

**What it is.** A shaped opening grows from inside the frame and the next scene is seen through it: an iris, the hollow inside an icon, a hexagon.

**Best use.** One "enter a new world" moment: hook → product, problem → solution.

**Duration.** 7-13 f.

**Outgoing.** The frame contracts or spins into the opening (NOSTRA's pinwheel contracts over 23.4-24.1 s, then a hexagon iris opens) [V:1i2L14].

**Incoming.** Revealed through the opening; NOSTRA's hex iris covers 40 → 97% of the frame in 7 f, roughly linear [V:1i2L14 t=24.25-24.48s]. Lottieicon's next scene is already inside the bell's hollow at frame 36 [V:1ccYWJ t=1.20s].

**Camera.** Zoom-through (TR-11) or locked.

**Ease.** Near-linear for an iris; exponential for a zoom-through.

**Sound.** A sub boom when the opening fills the frame [V:1ccYWJ t=1.10s].

**Observed.** Two references, once each [V:1i2L14 t=24.25s] [V:1ccYWJ t=0.87-1.27s]. [W:raivcoo] catalogues a "3d car portal to another world" (title only).

**Why it works.** The opening is a literal threshold: the viewer understands "through here is somewhere new" before seeing it.

**Do / Don't.**
- Do: make the portal shape part of the product's vocabulary (the bell is a notification; the hexagon follows a pinwheel).
- Don't: use more than one portal per film, and never a generic circle iris from a transition pack [inferred].

**Spec line.** `TR-16 hex iris @f{n}: opens from centre, 40→97% in 7 f linear, feather 3-5%W; B already composed behind.`

---

### TR-17 Seamless camera move [U]

**What it is.** One continuous camera move carries the viewer from one scene into the next, with no cut: a tilt down through clouds to the logo, a pull-back that reveals a world, a carousel slide that lands on the next site, a crane scroll from one floor to the next.

**Best use.** Story beats that must feel like one place (sun world above, brand world below); the transition into the final lockup; any hand-over where a cut would break a spatial idea.

**Duration.** **30 f S-curve + ≈10 f settle** for a scene-to-scene move (Chowdeck); ≈30 f for screen-to-world (HubSpot).

**Outgoing.** The move starts slowly (Chowdeck: about 10% of the travel over the first 10 f) [V:126cpH t=15.20-15.53s].

**Incoming.** Arrives with the move; the destination element rides in with the camera and fades in during the last 8 f (Chowdeck's wordmark: 30 → 100% opacity while rising from 65% to 42% H) [V:126cpH t=15.93-16.53s].

**Camera.** Tilt, pedestal, pull-back, truck. Peak ≈11% H per frame for Chowdeck's tilt [V:126cpH].

**Ease.** GLIDE (S-curve), with a short settle tail.

**Sound.** No hit needed; Chowdeck's lockup landing is within 1 f of an onset [V:126cpH t=16.20s].

**Observed.**
- Chowdeck tilt through a cloud band: 30 f + 10 f settle [V:126cpH t=15.20-16.53s].
- HubSpot: two continuous takes (8.23 s and 3.67 s) with internal re-centres, pull-backs and a dolly [V:1CSXtQ].
- Solar: the upward crane-scroll continues across shots #1-#4 and band pushes between floors [V:1Hcg3X].
- Bumper: 8 seamless shot boundaries inside continuous moves (snaps, push-through, rides on the wipe) [V:19NRDv].
- Wix: the carousel BRIDGE lands on the next site, then a 3 f zoom throws into the cut-in [V:15VhHR t=14.13-16.63s].
- [S:Bolt] describes "continuous, mostly unbroken camera travel" (inferred in the source).

**Why it works.** Space stays continuous, so the viewer feels they *travelled* rather than were shown something else. A layer crossing the lens (clouds) gives the move physical logic.

**Do / Don't.**
- Do: put a horizontal layer (clouds, horizon, UI edge) in the path so the move has a wipe edge.
- Don't: build a whole film as one take. **References win** over [S:Bolt]'s "no hard cuts" reading: the longest continuous take measured is 8.23 s [V:1CSXtQ], and every film relies on cuts (Part 04 Appendix A #4).

**Spec line.** `TR-17 seamless tilt-down f{n}–f{n+30} GLIDE, peak 11%H/f, + 10 f settle; cloud band crosses f+10–f+31; logo rides 65→42%H, fades 30→100% over last 8 f.`

---

### TR-18 Polarity / colour-field flip cut [U]

**What it is.** A hard cut where the background world flips: green ↔ white, navy ↔ lavender-white, black → white, one flat palette colour → another.

**Best use.** Claim (dark, read) ↔ proof (light, watch); chapter boundaries; every cut in a monochrome or flat-palette film; a cold open ("lights off → lights on").

**Duration.** 0 f.

**Outgoing / incoming.** As TR-01, often combined with TR-03 (inverted match) or TR-05 (inverted shape match).

**Camera.** Any.

**Ease.** As TR-01.

**Sound.** A hit or kick on the flip [V:19NRDv] [V:1CSXtQ t=2.13s].

**Observed.**
- NOSTRA: 11 of 13 hard cuts flip green ↔ white [V:1i2L14].
- Bumper: 7 light/dark flips, mostly claim/proof boundaries [V:19NRDv].
- Solar: the flat background changes on nearly every cut, from a 5-colour palette [V:1Hcg3X].
- HubSpot: 2 s on black, then a hard cut to the white product world on the first hit [V:1CSXtQ t=2.133s].
- Chowdeck: background colour as chapter marker, teal bookends [V:126cpH].
- kivi: white type cards ↔ coloured scenes; B&W "problem" plates bloom into colour [V:1-6l8S].

**Why it works.** A luminance flip gives every cut punch without adding a new colour, and the two worlds become a code the viewer learns ("dark = claim, light = proof").

**Do / Don't.**
- Do: assign meaning to each world and keep it (Bumper's claim/proof split; three proof scenes on navy weaken it slightly) [V:19NRDv].
- Don't: flip on two consecutive cuts inside one continuous idea (state changes inside one setup stay on one background) [V:1Hcg3X rule 3].

**Spec line.** `TR-18 polarity flip @f{n}: BG {#2FC06C}→{#F4F5F4}; type inverts; hit on cut.`

---

### TR-19 Empty-plate cut: exit to clean background, breath frame, drop-out, recede [U]

**What it is.** The subject leaves (whips out, drops out, recedes and dims) and the cut lands on, or right after, one frame of clean background. Also: a deliberate 1-10 f empty "breath" before new text.

**Best use.** Explainers and type-led films; any cut that should feel like "that's done, next".

**Duration.** **1 f** of empty plate after an exit (0-1 f measured); 1-4 white frames in light films; up to 9-10 f as a breath before a text card.

**Outgoing.**
- Whip out (TR-08).
- Gravity drop: NOSTRA's card sinks 2-4 px/f for 6 f, then falls with velocity growing ≈×1.2 per frame and 20° of rotation over 13 f [V:1i2L14 t=13.30-13.93s].
- Drop-out: Solar's wafer and floor fall out of the bottom together in 6 f (expo-in), 1 empty frame, cut on a beat (11.53 vs onset 11.49) [V:1Hcg3X t=11.30-11.53s].
- Recede: Bumper's group shrinks to ≈50% and dims over 8 f (ease-in), then cuts [V:19NRDv t=6.90-7.17s].
- Dim to black: Lottieicon's background drops 48% over 18 f while the cards exit up [V:1ccYWJ t=18.2-18.83s].

**Cut / gap.** Empty plate frames measured: 1 f [V:1Hcg3X t=11.50, 20.50, 28.43, 30.60s]; 1 empty navy frame [V:19NRDv t=2.40, 25.63, 35.93s]; 1-9 f of empty gradient [V:1ccYWJ]; 1-4 white frames [V:1-6l8S t=6.00-6.10, 7.967, 30.17-30.20s]; 10 f of empty aurora as a breath [V:1-6l8S t=4.10-4.45s].

**Incoming.** A new subject enters with SETTLE, continuing the direction where there was one.

**Ease.** INTO-CUT out; SETTLE in.

**Sound.** Whoosh into a soft impact [V:1Hcg3X, inferred]; the cut on a beat when the pulse is steady.

**Why it works.** The clean plate is a visual full stop. Because the frame is empty for a moment, the next subject's arrival gets full attention.

**Do / Don't.**
- Do: make the gap frame the colour of the incoming world or the film's established neutral.
- Don't: insert a 1-frame dip of an unrelated colour. Bumper's single black frame between light and navy reads as a render glitch [V:19NRDv t=25.60s], while its empty *navy* breath frames read as designed.

**Spec line.** `TR-19 drop-out f{n−6}–f{n−1} expo-in; f{n−1} empty {incoming BG}; cut @f{n}.`

---

### TR-20 Interaction-triggered transition: click, send, tap, toggle [U · SaaS]

**What it is.** A product interaction *causes* the scene change: a click blooms into the next chapter, sending a prompt match-cuts into the sent bubble, a toggle's state change is followed by the payoff cut, a tap on a word becomes the logo.

**Best use.** Every SaaS film. It is the most believable way to move between product states, and it doubles as the demo.

**Duration.** **3-8 f from the action to the change.**
- HubSpot cuts to the logo 3 f after the toggle track fills (1 f after the knob settles) [V:1CSXtQ t=10.267-10.367s].
- Wix cuts to the generated site 8 f after the send click [V:15VhHR t=12.20-12.467s].
- kivi's click bloom fills the frame in ≈6 f [V:1-6l8S t=36.85-37.10s].
- NOSTRA's tap on "NO" becomes the logo 5 f later [V:1i2L14 t=32.0-32.167s].

**Outgoing.** Anticipation: a cursor dwell before the press (Chowdeck 10 f [V:126cpH t=10.20-10.53s]; Wix 0.3-1.0 s [V:15VhHR]); a hover state (kivi's tile lifts ≈5 px [V:1-6l8S t=36.45s]). The press itself is a 1-3 f state change.

**Incoming.** The consequence: a morph (TR-07), a match cut (TR-04), a bloom (TR-14), a colour match (TR-03).

**Camera.** Often a slow push during the dwell [S:Airtable, inferred in source]; a truck that brings the target to the cursor [V:1-6l8S t=35.47-36.4s].

**Ease.** Cursor: fast-in, long ease-out (Master §8 UI animation rules). Consequence: SETTLE.

**Sound.** **The decisive click gets silence first.** Wix drops the music to −35 dB exactly on the send click and the build follows [V:15VhHR t=12.20s]; Chowdeck's click lands on an onset (0 f) after a −35 dB dip [V:126cpH t=10.0-10.54s]; HubSpot's toggle → logo cut lands on the riser crest and is followed by ≈350 ms of near-silence (−46 to −64 dB) [V:1CSXtQ t=10.60-10.95s].

**Why it works.** Cause and effect is the strongest continuity there is. The viewer sees *why* the scene changed, and the product's responsiveness is proved by the cut itself.

**Do / Don't.**
- Do: make at least 2 transitions per film interaction-caused (NOSTRA rule 15) [V:1i2L14].
- Do: let the UI state change (1-3 f) happen *before* the cut so the click is confirmed on screen.
- Don't: cut on the cursor's arrival; cut after the press and its state change.

**Spec line.** `TR-20 click-triggered: cursor dwell 10 f; press f{n} (1 f state); music −15 dB @f{n}; cut/bloom @f{n+3..8}.`

---

### TR-21 Type-carried transitions [U]

**What it is.** The text itself performs the transition. Variants:

| Variant | Mechanics | Duration | Evidence |
|---|---|---|---|
| **Inverted type match** | Same line, same position; the world flips | 0 f | [V:19NRDv t=1.167s] |
| **Word swap (slot machine)** | A fixed anchor word stays; the variable word swaps every 11-16 f; outgoing tilts out over 2-3 f, incoming enters ≈−6° and +4 px low and settles in 3-4 f | 0 f + 3-4 f | [V:1ccYWJ t=5.43-7.30s]; escalating sizes in Bumper's finale (16, 15, 13, 11, 14 f) [V:19NRDv t=57.60-59.90s] |
| **Scatter-swap-converge** | Words scatter into a staircase (6-7 f, expo-out), swap in 1 f while displaced, converge (≈7 f) | 20-25 f per cycle | [V:1i2L14 t=8.30-10.13s] |
| **Word-spacing match** | Card A exits by widening gaps ≈1.5× (+16% width) and fading to ≈60% over ≈18 f; card B enters with gaps ≈1.25× open and tightens in 8-10 f | 0 f cut | [V:1CSXtQ t=24.13-25.10s] |
| **Text split / gap collapse** | The phrase splits and slides out while a 3 f dissolve brings the next scene; or the gap collapses and the line whips out with 1 white frame | 3-6 f | [V:1-6l8S t=53.57s, 64.20-64.40s] |
| **Scale-contrast type cut** | The same words cut from macro (49% FH cap) to small (6.6% FH) | 0 f | [V:15VhHR t=0.633s] |
| **Click-to-logo swap** | A tapped word swaps in place to the wordmark | 1 f after a 5 f cue | [V:1i2L14 t=32.167s] |
| **Decode across a cut** | Scrambled glyphs resolve into the product name over ≈10 f just after a cut | ≈10 f | [V:19NRDv t=1.167-1.50s] |

**Best use.** Type-led launches and any film with more than about four type cards in a row, where plain cuts between cards would feel like a slideshow.

**Outgoing / incoming.** Text is never read during the move: fast motion only in the first or last 4-8 f, and settled lines hold at least 10 f (NOSTRA 10-23 f; Bumper 0.6-1.6 s; kivi type-card shots 1.2-1.9 s) [V:1i2L14] [V:19NRDv] [V:1-6l8S].

**Ease.** SETTLE in (no bounce on text in 8 of 8 except Lottieicon's 3-4 f role-word tilt, a contained playful exception).

**Sound.** Faint high-band swishes on swaps [V:1ccYWJ, weak evidence]; typing ticks under type-ons [inferred; Lottieicon has none, which its teardown calls a missed opportunity].

**Why it works.** The words are the one thing the viewer is already looking at. Making them carry the change keeps attention fixed and turns several cards into one continuous sentence.

**Do / Don't.**
- Do: hide word swaps inside a displaced or moving state (NOSTRA rule 17).
- Don't: let words overlap mid-exit. kivi's "spreadsheetpowered" collision reads as a glitch [V:1-6l8S t=64.27-64.33s].
- Don't: run more than 4-5 text-only cards without a change of treatment (HubSpot, Lottieicon, kivi all flag this) [V:1CSXtQ] [V:1ccYWJ] [V:1-6l8S].

**Spec line.** `TR-21 spacing match @f{n}: A gaps ×1.5, width +16%, fade→60% over 18 f INTO-CUT; B gaps ×1.25 → ×1.0 over 9 f SETTLE.`

---

### TR-22 Generation-state transitions [SaaS · S]

**What it is.** A visual "develop" that shows AI or the product producing a result: a false-colour thermal plate that switches or dissolves to the real image, a pixel mosaic that de-pixelates, a gradient shimmer across rewritten text, a black-and-white plate that blooms into colour as the voice starts, a flat promise icon swapped for a real photo.

**Best use.** Any AI feature (generation, rewrite, translation, transcription). It replaces fake progress bars.

**Duration.**
- Montage pace: **1 f switch + 6-12 f clean-up** (thermal held 7-11 f first) [V:15VhHR t=8.93, 9.87, 11.20s].
- Hero image: **15-20 f dissolve**, ≈80% done in 15 f [V:15VhHR t=25.77-26.43s].
- Pixel mosaic: 8 f [V:15VhHR t=40.33s]. Text regenerate: 12 f gradient + 6 f settle [V:15VhHR t=36.6-37.0s].
- Mono → colour bloom: 22-42 f, linear, timed to the first 2-3 spoken words [V:1-6l8S t=18.57-19.33s, 54.0-55.4s].

**Outgoing / incoming.** The "AI acting" colour (cyan, iridescent) appears only during the transition and always settles to final colours within 6-8 f [V:15VhHR].

**Camera.** Locked; the prompt bar or card stays fixed (TR-23).

**Ease.** Hard switch + ease-out clean-up; exponential ease-out develop; linear colour bloom.

**Sound.** A shimmer under the develop [inferred]; the drop or hit when the result lands (Wix: a hit at 12.6 s, 4 f into the build) [V:15VhHR].

**Why it works.** It is an honest metaphor for generation: the result *develops* in place, so the viewer sees the product working without a spinner.

**Do / Don't.**
- Do: reserve one colour family for "AI is acting" and never leave it on resting UI [V:15VhHR rule 4].
- Do: apply the device to every matching scene. kivi uses B&W → colour on two of four scenes, a visible inconsistency [V:1-6l8S flaws].
- Don't: hold the thermal/duotone state longer than ≈15 f; it reads as a glitch [V:15VhHR avoid list].

**Spec line.** `TR-22 develop: thermal plate 9 f → 1 f switch to final image → tint clears 10 f ease-out; prompt bar locked.`

---

### TR-23 Anchored-element cut [U · SaaS]

**What it is.** One element keeps identical screen coordinates across several hard cuts while only the context behind it changes: a prompt bar over three industries, an asset over four layouts, a fixed word with a swapping variable.

**Best use.** Fast montages (ASL under ≈0.8 s), "one input, many outputs" demos, design-range proofs.

**Duration.** 0 f per cut; shots of 0.23-1.27 s are readable because of the anchor [V:15VhHR t=8.63-12.47s].

**Outgoing / incoming.** Only the background changes; the anchor does not move, scale or re-render.

**Camera.** Locked on the anchor.

**Sound.** Rhythm comes from the cuts; a lengthening shot rhythm can land on the hero use case (Wix colour holds 21 → 29 → 38 f) [V:15VhHR].

**Observed.**
- Wix prompt bar: identical x, y and size across 6 shots in 3.8 s; ice object in the same region across 4 backgrounds in 2.5 s [V:15VhHR].
- Chowdeck: the notification stays through the scene change [V:126cpH t=11.07s].
- Lottieicon: "For" fixed while the role word swaps [V:1ccYWJ].
- NOSTRA: "VIDEO" stays while "MOTION DESIGN" is wiped off and re-typed [V:1i2L14 t=6.17-7.00s].
- HubSpot: the mid-film lockup reprises at the end within 1 px [V:1CSXtQ].

**Why it works.** The anchor holds the eye still, so the background can change many times a second without disorientation, and the comparison is instant.

**Do / Don't.**
- Do: pixel-lock the anchor. Wix's theme-swap bottle that moves 18% W and grows 1.5-2× reads as a weaker before/after than its pixel-locked ice object [V:15VhHR].
- Do: label what the montage proves; Wix's ice-object montage is "visually rich but semantically vague" [V:15VhHR flaws].

**Spec line.** `TR-23 anchored montage: {prompt bar} locked at (50%W, 50%H), 57%W; BG cuts every 7-11 f thermal + 21/29/38 f colour.`

---

### TR-24 Dissolves and fades: crossfade, dim-to-texture, fade to end [S, sparing]

**What it is.** Opacity blends: a crossfade between two logo states, a dim of the previous shot to a texture behind new content, a fade to white or black at the end.

**Best use.** Logo → symbol hand-overs; keeping proof visible behind a stat; the very end of the film.

**Duration.**
- Logo crossfade: 9 f out + 10 f in, **≤2 f overlap** (nearly sequential) [V:1-6l8S t=72.27-72.83s].
- Brand colour dissolve: exponential, strong colour gone in 8 f, settled in 25 f [V:15VhHR t=51.37-52.20s].
- Dim-to-texture: 3 f to ≈15% opacity [V:1ccYWJ t=9.833s].
- End fade: ≈14 f to white [V:1-6l8S t=76.80-77.27s]; ≈33 f linear to black [V:1ccYWJ t=43.10-44.20s].

**Outgoing / incoming.** Nearly sequential, not a long mix: two half-visible logos for more than 2 f look muddy [inferred from kivi's 2 f overlap].

**Camera.** Locked or a slow push (kivi's URL keeps a +12% push into the fade) [V:1-6l8S t=75.53-77.27s].

**Ease.** Linear or exponential ease-out.

**Sound.** The music fades with the picture: kivi −15 → −49 dB over 76-77.8 s [V:1-6l8S]; Wix −29 → −78 dB over 2.2 s [V:15VhHR]. Never let the music end first (Lottieicon's bed is gone 3.7 s before the picture) [V:1ccYWJ].

**Why it works.** A short, nearly sequential dissolve is calm without the muddy double image of a long crossfade. Dimming instead of cutting keeps the proof present behind the number.

**Do / Don't.**
- Do: use at most one scene-to-scene crossfade per film (§0.1 finding 3).
- Don't: use a crossfade as the default transition. **References win** over common template practice [inferred]: none of the eight uses it that way.

**Spec line.** `TR-24 logo crossfade f{n}–f{n+17}: wordmark out 9 f, symbol in 10 f, overlap 2 f; music fade −15→−49 dB over the last 45 f.`

---

## 7.2.25 Premium vs amateur, card by card

The cards above give the mechanics. This table puts the premium and amateur versions of each type side by side, so a reviewer can say which one a shot is. "Premium" is what the references do; "amateur" is either a failure measured in a reference or, where marked, a common template habit [inferred].

| Card | Premium (how, how fast) | Amateur tell | Evidence |
|---|---|---|---|
| TR-01 Hard cut | Last 6-10 f accelerate, first 6-20 f decelerate; cut at peak velocity | Cut from a held frame to a held frame; cut mid-settle | §7.3.1; [V:1CSXtQ] [V:1Hcg3X]; mid-settle [inferred] |
| TR-02 Beat cut | Picture 0-2 f before the beat, one edit driver per section | Cut 3-5 f off a kick, or a few frames after the beat | [V:19NRDv] (11 of 18); [V:1CSXtQ t=22.60s] |
| TR-03 Match cut | Matched element within ±5% W, held 2 f, one other attribute changes | "Match" 15-20% W apart, or moved and rescaled at once | [V:1i2L14 t=1.433s]; [V:15VhHR t=19.2s] |
| TR-04 Motion match | Incoming first frame 3-5× the outgoing last-frame speed, same direction | Direction reverses across the cut; incoming starts slow | [V:1CSXtQ t=17.80s]; reversal [inferred] |
| TR-05 Shape match | Instant (0 f) swap at the same silhouette and angle, then a physical reaction | Dissolve between two different objects at one spot | [V:126cpH t=6.77-8.43s]; dissolve [inferred] |
| TR-06 Object morph | Simple geometry (pill, card, circle), 6-18 f, one climax morph | Warped letters, logos or faces mid-morph; several climaxes | [V:1-6l8S t=9.50s] [V:19NRDv t=55.0s]; warp tell [inferred, Master §21] |
| TR-07 UI morph | One edge anchored, ≈7 f, background re-focused behind it in 11-12 f, no pop | Cold cut to a full screen recording; generator-interpolated screens | [V:126cpH t=11.03-11.43s]; [inferred] |
| TR-08 Whip | 6-9 f expo-in to 13-20% W/f, blur on the last 2 f or cut behind the exiting element; cued by a pointer | Unblurred hops at 22-27% W/f (strobe); random direction; 24/25 → 30 fps judder | [V:1i2L14 t=5.87-6.13s]; [V:1ccYWJ t=30.57-32.57s]; [V:15VhHR] |
| TR-09 Object wipe | A story object covers the frame in 8-10 f; colour swap hidden inside the cover | Generic shape sweep that belongs to neither scene | [V:1Hcg3X t=2.93-3.30s]; [S:Slack] text only |
| TR-10 Mask wipe | Shape motivated by the copy, pre-loaded ≈1 s, 6-12 f COVER, incoming rides its direction | Decorative wipes on many cuts; noisy pixel builds over 12 f | [V:19NRDv t=47.97s]; [V:1i2L14 t=16.63-17.50s] |
| TR-11 Zoom | Punch +18-33% in 3-8 f, at most 4 in 78 s; cut-ins 2-3.5× for UI detail | An animated zoom on every detail; punches on every cut | [V:1-6l8S]; [V:15VhHR rule 13] |
| TR-12 Depth | Context → lift ≈0.5 s → push-through 9 f; one true-DOF beat per minimal film | Planes intersecting during the move | [V:19NRDv t=16.77-18.75s]; [V:1CSXtQ t=18.4-19.0s] |
| TR-13 Blur | 4-8 f, blur grows over the first 4 f, incoming crisp | 12-20 f soft dissolve used to hide a layout mismatch | Measured 4-8 f in 4 refs; long dissolve [inferred] |
| TR-14 Light | Light grows from a source in the frame; flash once, ≤3 f per colour | Foreign-colour 1 f dip; repeated flashes; white blooms in a dark film | [V:1-6l8S t=36.85s] [V:1Hcg3X t=12.83s]; [V:19NRDv t=25.60s] |
| TR-15 Perspective | Read UI at 0-15° tilt; rotate on Y/X only, roll 0° | Flatten a card while its text must be read; roll | [V:15VhHR t=33.33s]; roll 0° in 8 of 8 (Part 04) |
| TR-16 Portal | One portal, shape from the product's vocabulary, 7-13 f | Generic circle iris from a pack | [V:1ccYWJ t=0.87-1.27s] [V:1i2L14 t=24.25s]; pack iris [inferred] |
| TR-17 Seamless move | 30 f GLIDE + ≈10 f settle, a layer crossing the lens as the wipe edge | Whole film as one take; float with no destination | [V:126cpH t=15.20-16.53s]; longest measured take 8.23 s [V:1CSXtQ] |
| TR-18 Polarity flip | Each world has a fixed meaning (claim/proof) | Flips inside one continuous idea | [V:19NRDv]; [V:1Hcg3X rule 3] |
| TR-19 Empty plate | 1 f gap in the incoming world's colour | 1 f of a colour belonging to neither world | [V:1Hcg3X]; [V:19NRDv t=25.60s] |
| TR-20 Interaction | Silence, press (1-3 f state change), cut 3-8 f later | Cut on the cursor's arrival, before the press reads | [V:15VhHR t=12.20s] [V:1CSXtQ t=10.367s]; [inferred] |
| TR-21 Type-carried | Swaps hidden in a displaced state; settled lines hold ≥10 f | Words overlapping mid-exit; 5+ text-only cards in a row | [V:1i2L14 t=8.30-10.13s]; [V:1-6l8S t=64.27s] |
| TR-22 Generation state | "AI" colour only during the change, settled within 6-8 f; thermal held ≤15 f | Fake progress bars; duotone held long; device applied to some scenes only | [V:15VhHR]; [V:1-6l8S flaws] |
| TR-23 Anchored cut | Anchor pixel-locked across every cut | Anchor drifts 18% W and grows 1.5-2× | [V:15VhHR t=8.63-12.47s]; [V:15VhHR t=19.2s] |
| TR-24 Dissolve / fade | ≤2 f overlap on logo hand-overs; music outlasts the picture | Long muddy crossfades as the default; music ending first | [V:1-6l8S t=72.27s]; [V:1ccYWJ] |

---

## 7.3 Hand-off grammar: where to put the cut and how the two halves fit

Part 04 §6.3 lists the measured camera hand-offs. This section generalises them into rules for *every* transition.

### 7.3.1 Legal cut frames

Cut on one of these frames, and only these:

| # | Cut frame | Why it is invisible | Measured |
|---|---|---|---|
| 1 | **Peak velocity** of an accelerating exit | The eye expects change at maximum speed | HubSpot converge at 75 px/f @720, cut before the settle [V:1CSXtQ t=2.133s]; Wix deck at peak speed [V:15VhHR t=49.63s] |
| 2 | **First frame of the empty plate** after the subject has gone | Nothing is interrupted | Solar ×6 [V:1Hcg3X] |
| 3 | **Fully covered frame** of a wipe, bloom or object | The cover is the transition | Lottieicon light build [V:1ccYWJ t=21.00s]; Solar house wall [V:1Hcg3X t=3.30s] |
| 4 | **Behind a still-moving exiting element** | The cut is masked by motion | NOSTRA whip [V:1i2L14 t=6.133s] |
| 5 | **1-8 f after a UI state change** | Cause, then effect | HubSpot +3 f [V:1CSXtQ t=10.367s]; Wix +8 f [V:15VhHR t=12.467s] |
| 6 | **0-2 f before a beat** (music-led films) | Picture-leading sync reads as on time | Bumper 11 of 18 [V:19NRDv] |
| 7 | **After a 2 f hold of a matched element** | The eye has locked on | Solar light point [V:1Hcg3X t=3.37-3.43s] |

**Never cut** in the middle of an ease-out settle, on a frame where text is half-formed or overlapping, or a few frames *after* a beat [inferred; [V:19NRDv] avoid list; [V:1-6l8S t=64.27s]].

### 7.3.2 Velocity ratios across the cut

| Outgoing last frame | Incoming first frame | Then | Evidence |
|---|---|---|---|
| Accelerating, peak v | Same direction, **3-5 × v** | SETTLE over 5-20 f | 7 → 34 px/f [V:1CSXtQ t=17.80s] |
| Whip at 13-20% W/f, subject gone | New subject, SETTLE: 40-64% of its travel on frame 1 | 86-95% by frame 3-6 | [V:1Hcg3X] [V:19NRDv] |
| Shrinking (−20 to −38%, ease-in) | Oversized (1.15-2.1×), shrinking to rest | 18-20 f ease-out | [V:1ccYWJ t=33.20s] [V:1CSXtQ t=22.60s] |
| Growing (punch +18-33%, ease-in) | Growing more slowly (push carried over), or a frame-filling graphic within 4 f | Decelerating push, e.g. +29% over 1.17 s | [V:1-6l8S t=71.10s, 7.97s] |
| Still matched element (2 f hold) | Same element, new context, still | Context SETTLE | [V:1Hcg3X t=3.43s] [V:1i2L14 t=1.433s] |

**Why the incoming frame is faster.** The cut itself costs the eye a moment of re-orientation. Starting the new shot at its highest speed and decelerating lands the new subject while attention recovers, so the subject is at rest by the time the viewer is reading [inferred from the measured pattern in 6 of 8].

### 7.3.3 Asymmetry rule

**Exits take about half the time of entrances.** kivi: entrances 8-14 f, exits 4-6 f [V:1-6l8S]. NOSTRA: whips of 8-9 f against arrivals that settle over 13-14 f [V:1i2L14]. Solar: 6-11 f exits against 10-27 f settles [V:1Hcg3X]. [N] agrees: Material 3 pairs a 400 ms entrance with a 200 ms exit.

**Why.** The exit only has to clear attention; the entrance has to deliver information. Spending time on the exit delays the next idea.

---

## 7.4 Choosing a transition: selection matrix by story boundary

| Boundary | First choice | Second choice | Avoid | Evidence |
|---|---|---|---|---|
| Hook → brand / product name | Punch into a cut → 1 white frame → frame-filling reveal (TR-11, TR-14) | Inverted match cut (TR-03); zoom-through a symbol (TR-11) | A fade up from black; a logo sting before the hook | [V:1-6l8S t=7.83-8.20s] [V:19NRDv t=1.167s] [V:1ccYWJ t=1.13s] |
| Problem → solution (world change) | Polarity flip cut (TR-18) or shape/light match (TR-03, TR-05) | Object wipe (TR-09); mono → colour bloom (TR-22) | A crossfade | [V:1CSXtQ t=2.133s] [V:1Hcg3X t=3.43s] [V:1-6l8S t=18.37s] |
| Claim (type) → proof (UI) | Polarity flip cut (TR-18) | Light bloom (light-mode films) (TR-14) | A whip into UI that must be read at once | [V:19NRDv] (7 flips) [V:1-6l8S] |
| Brand line → product UI | UI morph: the icon or text becomes the input (TR-07) | Text → UI build + pull-back (TR-07) | A cold cut to a full screen recording | [V:15VhHR t=3.97-4.23s] [V:1CSXtQ t=7.80-9.03s] |
| Prompt / input → result | Continuity reframe cut on the same plate (TR-03) | Motion match on "send" (TR-04); click-triggered morph (TR-20, TR-07) | Showing the result before the action finishes | [V:1-6l8S t=22.87s] [V:1CSXtQ t=17.80s] [V:126cpH t=11.03s] |
| AI is generating → generated | Generation-state develop (TR-22) | Blur-out cut on the click, then develop (TR-13 + TR-22) | Fake progress bars; duotone held over 15 f | [V:15VhHR t=8.63-12.47s, 25.73s] |
| Overview ↔ detail | Cut-in / pull-out cut, 2-3.5× (TR-11) | Push-through after an extraction lift (TR-12) | An animated zoom on every detail | [V:15VhHR t=6.57s] [V:19NRDv t=13.13s, 18.25s] |
| Feature → next feature | Motion match / whip to empty plate (TR-04, TR-08, TR-19) | Hard cut with a polarity flip (TR-18) | A different decorative wipe each time | [V:1Hcg3X] [V:1i2L14] |
| Use-case montage (ASL < 0.8 s) | Anchored-element cuts (TR-23) | Beat cuts (TR-02) | Montage with nothing fixed | [V:15VhHR t=8.63-12.47s] [S:Figma] |
| Flat UI → 3D hero beat | Screen-to-world pull-back (TR-15) | Push-through (TR-12) | Random floating screens | [V:1CSXtQ t=18.00s] [V:19NRDv t=18.25s] |
| Into a breather | Hard cut on a calm, low-energy shot; music breakdown | Blur dissolve (TR-13) | A breather under 5+ text-only cards | [V:1i2L14 t=25.93s] [V:1-6l8S t=21.7-30.6s] |
| Climax | Many → one morph (TR-06) | Deck → bookend collapse (TR-06) | Two climaxes | [V:19NRDv t=55.0s] [V:15VhHR t=49.63s] |
| Tagline → logo | Punch → hard cut on a beat (TR-11, TR-02) | Click-triggered word → logo (TR-20); motif-fill cut + colour dissolve (TR-24) | A slow crossfade from tagline to logo | [V:1-6l8S t=71.10s] [V:1i2L14 t=32.167s] [V:15VhHR t=51.37s] |
| Scene world → lockup | Seamless tilt through a layer (TR-17) | Hard cut to the reprised lockup (TR-03) | A whip into the logo | [V:126cpH t=15.20s] [V:1CSXtQ t=27.367s] |
| Lockup → end | Dead-still hold 1.5-2.2 s, then a 14-33 f fade with the music | A hard end on a resolved hit | Music ending before the picture | [V:1CSXtQ] [V:1-6l8S] [V:1ccYWJ] |

---

## 7.5 Transition budget and density by runtime

Measured density is one scene change every 1.6-3.3 s (§0.1). The budgets below apply it to the target runtimes. Rows for 5, 10 and 90 s are extrapolated [inferred].

| Runtime | Scene changes | Signature device uses | Hero one-off transitions | Decorative shape/mask wipes | Flash moments | Basis |
|---|---|---|---|---|---|---|
| 5 s | 2-3 | 1-2 | 0-1 | 0 | 0 | [inferred] |
| 10 s | 4-6 | 2-3 | 1 | 0 | 0 | [inferred] |
| 15 s | 6-9 | 3 | 1-2 | ≤1 | 0 | Chowdeck 18 s: 10 changes, 2 hero transitions [V:126cpH] |
| 30 s | 10-16 | 3-7 | 1-2 | ≤1 | ≤1 | HubSpot 30 s: 9 (+6 in-take beats) [V:1CSXtQ]; NOSTRA 35 s: 18 [V:1i2L14]; Solar 36 s: 21 [V:1Hcg3X] |
| 45 s | 16-25 | 4-8 | 2-3 | ≤1 | ≤1 | Lottieicon 44 s: 24 [V:1ccYWJ] |
| 60 s | 22-33 | 5-10 | 3 | ≤2 | ≤1 | Wix 54 s: 33 [V:15VhHR]; Bumper 67 s: 26 [V:19NRDv] |
| 90 s launch film | 30-45 | 6-12 | 3-4 | ≤2 | ≤1 | kivi 78 s: 32 [V:1-6l8S]; extrapolated |

**Density inside long shots.** A shot over 3 s needs an in-shot event (camera beat, UI action, state change) every 0.8-1.5 s, which is how Bumper keeps 6 s proof shots alive without cuts [V:19NRDv rule 12].

**Why budgets matter.** A signature used fewer than 3 times is not learned; used more than about 12 times it becomes monotonous (Bumper flags its own slam → build → pull-back grammar, repeated ≈12 times, as a risk) [V:19NRDv flaws].

---

## 7.6 Sound pairing for transitions

Full sound rules are in Master §16. This table covers only what a transition needs.

| Transition | Sound | Placement | Evidence |
|---|---|---|---|
| Hard cut (TR-01) | Nothing, or the music's own transient | On the cut if it is a section boundary | [V:15VhHR] |
| Beat cut (TR-02) | The beat | Picture 0-2 f ahead | [V:19NRDv] |
| Match / polarity flip (TR-03, TR-18) | A hit or kick; a tonal "ting" for light matches | On the cut | [V:19NRDv t=1.17s] [V:1CSXtQ t=2.10-2.15s]; ting [inferred] |
| Motion match (TR-04) | A small whoosh or hit, ≈3 dB over the bed | On the cut frame | [V:1CSXtQ t=17.80s] |
| Whip (TR-08) | A whoosh that ends on the fastest frame, a sub on the cut, or nothing | Peak on the last outgoing frame | Whoosh [inferred, NOSTRA teardown recommendation]; sub on the cut [V:1ccYWJ t=4.567s]; Wix uses none [V:15VhHR] |
| Glide or tour move | Sub boom or whoosh at **peak velocity**, mid-move | ±2-3 f of the peak | [V:1ccYWJ] (9 of 11 events) |
| Zoom-through / portal (TR-11, TR-16) | Sub boom | When the object fills the frame | −6.2 dB at 1.1 s [V:1ccYWJ] |
| Punch into a cut (TR-11) | Cut on an onset; the drop follows the frame-filling graphic by ≈3 f | ±1 f | [V:1-6l8S t=18.367s, 8.03-8.28s] |
| Light build (TR-14) | Swell, released by a sub on the cut | On the cut | [V:1ccYWJ t=21.2s] |
| Flash frames (TR-14) | Electric hit | On the first flash frame | [inferred] |
| Interaction-triggered (TR-20) | **Silence first** (suck-out ≥15 dB, or a 70-300 ms gap), then a click or hit | Click on the press frame (0 f) | [V:15VhHR t=12.20s] [V:126cpH t=10.54s] [V:1CSXtQ t=10.24s] |
| Climax morph (TR-06) | Riser → hit | Hit on the merge frame | [V:19NRDv, inferred] |
| Generation-state (TR-22) | Shimmer under the develop; a hit as the result lands | Hit ≈4 f after the result appears | [V:15VhHR t=12.6s] |
| End fade (TR-24) | Music fades with the picture | Music ends after the last visible frame | [V:1-6l8S] [V:15VhHR]; failure [V:1ccYWJ] |

**References win.** [N] advises starting whooshes 4-8 f before a cut with the peak on the first frame of the new shot. That holds for whips into a cut. For mid-shot glides the references put the peak at the move's peak velocity, mid-move [V:1ccYWJ] (Part 04 Appendix A #3).

**Restraint.** Not every transition gets a sound. Wix uses one bed, a few click accents and silence as its reveal device [V:15VhHR]; HubSpot keeps UI sounds sparse [V:1CSXtQ]. A whoosh on every move is the audio version of a plug-in transition (TR-A9).

---

## 7.7 Universal principles (TR-U)

**TR-U1. Cuts carry the film; motion carries the cut.** Make at least 70% of scene changes hard cuts, and design the frames either side of each. Use zero plug-in transitions. [U: hard-cut share 69-100% in 6 of 8; 0 of 8 use plug-ins]
*Why:* a cut costs no reading time, and a designed hand-off makes it feel intentional.

**TR-U2. Accelerate into every cut and decelerate out of it.** Last 6-10 f expo-in; first 6-20 f expo-out. [U: 7 of 8; Part 04 CM-U4]
*Why:* the cut lands at peak velocity, where change is expected, and the new image settles while attention recovers.

**TR-U3. Every bridged transition needs a cause:** an action (click, send, tap), physics (gravity, light), the copy's meaning ("up a gear" → chevron) or a shared shape. [U: 6+ of 8; [V:1-6l8S t=36.95s] [V:1CSXtQ t=17.80s] [V:19NRDv t=47.97s] [V:1i2L14 t=32.0s] [V:126cpH t=10.53s] [V:15VhHR t=3.97s]]
*Why:* a motivated transition explains the change; an unmotivated one only decorates it.

**TR-U4. Keep at least one thing constant across every transition:** position (±5% W), shape, direction, colour field or an anchored element. [U: 8 of 8 use at least one of these on their key cuts]
*Why:* the constant tells the eye where to look in the new frame.

**TR-U5. Exits take about half as long as entrances.** [U: kivi, NOSTRA, Solar, HubSpot; [N] agrees]
*Why:* the exit only has to clear attention; the entrance has to deliver information (§7.3.3).

**TR-U6. Hide every swap inside motion, a cover or blur.** Background swaps go inside a twist, a burst, a wipe or a rack focus; word swaps go inside a displaced state; scene cuts go behind an exiting element. [U: NOSTRA, Wix, kivi, Chowdeck, Bumper, Solar]
*Why:* the viewer never sees a static frame change, so the change reads as motion, not as an edit.

**TR-U7. One signature transition, repeated 3-12 times, plus 2-4 one-off hero transitions.** [U: 8 of 8]
*Why:* repetition teaches the grammar so it stops being noticed; the one-offs then stand out at the big turns.

**TR-U8. Mark world or chapter boundaries with a background change** (polarity flip, colour field, chapter colour). [U: 6 of 8]
*Why:* a luminance or colour flip is the cheapest way to tell the viewer "new section" without words, and it becomes a code they learn within two or three uses.

**TR-U9. Keep bridges short.** Non-camera transitions run 0-12 f. Only camera moves and logo resolves run 17-32 f, and reading wipes run 60-72 f inside shots. [U: 8 of 8; §0.2]
*Why:* every frame spent in a bridge is a frame in which nothing can be read. Short bridges keep the film's reading time for the content.

**TR-U10. Never read text during a transition.** Settled lines hold at least 10 f (ideally the full reading time from Master §9 typography rules) before any exit; fast motion happens only in the first or last 4-8 f. [U: Bumper, HubSpot, NOSTRA, kivi, Solar]
*Why:* moving text at transition speed cannot be read, so anything the viewer must read has to be still first.

**TR-U11. Place sound sparsely and precisely:** silence before a decisive hit, a hit within ±2 f of section cuts, booms at peak velocity. Not a whoosh on every move. [U: HubSpot, Wix, Lottieicon, kivi, Chowdeck]
*Why:* a sound accent only means "this matters" if most transitions have none; silence before it makes the hit read as an event.

**TR-U12. Gap frames belong to a world.** A 1-4 f gap is the colour of the incoming world or the film's neutral (white in light films). [U: Solar, Bumper, Lottieicon, kivi; Bumper's black dip is the counter-example]
*Why:* a gap in a known colour reads as a designed pause; a gap in an unknown colour reads as a dropped frame.

**TR-U13. Fix screen direction per film** and continue every directional exit in the next shot. [U: Solar, HubSpot, NOSTRA, Chowdeck, Lottieicon]
*Why:* a consistent direction becomes a map of the story (forward, back, deeper), so the viewer always knows where the next frame is relative to the last.

**TR-U14. Render transitions at the delivery frame rate.** Duplicated frames from 24/25 → 30 fps judder most on whips, scrolls and decks. [U: failures in Wix, Solar, HubSpot]
*Why:* a repeated frame stops a fast move for 33 ms every 5-6 frames; on a transition that is the moment the eye is tracking hardest, so the stutter is most visible there.

---

## 7.8 Style-specific transitions (TR-S)

| Style (Part 01 categories) | Signature transitions | Durations | Music policy | Blur policy | Evidence |
|---|---|---|---|---|---|
| **Minimal Premium SaaS** (light) | Accelerate-into-cut hand-offs; punch into a cut; short blur dissolves; white light as the neutral room; continuity reframe for prompt → result | Punch 3-8 f; blur dissolve 4-8 f; bloom 3-6 f | Feature-led, then music-led in the second half | None on 2D moves | [V:1-6l8S] [V:1CSXtQ] |
| **Cinematic Product Launch / 3D Technology** | Screen-to-world pull-back; push-through; dolly through particles; many → one implosion; stepped orbit beats | 9-30 f | Hits on the hero moves | 180° blur on fast moves; real DOF in the hero beat | [V:1CSXtQ t=17.8-21.5s] [V:19NRDv] |
| **Kinetic-Type Launch** ("night claim / day proof") | Oversize slam + pull-back; scale snaps (3 f, 40-55%); inverted match; motivated shape-mask wipe; word swap crescendo | Snaps 3 f; wipe 12 f; swaps 11-16 f | Beat-locked, 0-2 f early | Blur on every move | [V:19NRDv] |
| **UI-Focused Demo in a brand frame** | Hard cuts only; cut-ins / pull-out cuts; anchored-element montage; icon → UI morph; generation develops; deck → bookend collapse | Cuts 0 f; develop 1 f + 6-12 f | Section-level only (drop, suck-out, re-entry) | Only on scroll and whip frames | [V:15VhHR] |
| **Editorial Motion (flat 2.5D explainer)** | Whip to an empty plate; background colour flip on every cut; object wipe; light/shape match; READ-ease panel wipe; one flash moment | Whips 6-11 f; panel 72 f | VO-led; downbeats for big changes | One blurred frame at most | [V:1Hcg3X] |
| **Monochrome brand-system explainer** | Polarity flip on ≥75% of cuts; shape-match chains; arrow-cued whip; burst and iris; scatter-swap-converge; click-triggered logo | 1-8 f mostly | Copy-led | Last 2 f of the whip | [V:1i2L14] |
| **Fast Startup Launch (dark neon)** | Suck-in shrink into the cut; zoom-through; light-build release; scale-matched hand-off; rapid hero-word cuts (10-12 f) | 8-19 f pre-rolls | SFX locked to motion | None (keep hops ≤8-10% W/f or add blur) | [V:1ccYWJ] |
| **Playful Illustrated Collage** (discovered) | Instant shape-match swaps with a physical reaction; match-on-action; shared-element UI morph; seamless tilt through a layer; chapter colours; graphics on twos | Swaps 0 f; morph ≈7 f; tilt 30 f | Feature-led; one click on an onset | Directional blur on pushes | [V:126cpH] |

---

## 7.9 Experimental (TR-X): validate before using as a default

| ID | Technique | Evidence | Risk | Use when |
|---|---|---|---|---|
| TR-X1 | Hex / iris portal, 7 f | [V:1i2L14 t=24.25s] only | Reads as a template iris if the shape is generic | The shape belongs to the brand or follows from the previous motion |
| TR-X2 | Lens-distortion zoom-out reveal (barrel bulge relaxes in 6 f within a ≈20 f zoom-out) | [V:1ccYWJ t=7.30, 27.13s] only | Warps detailed UI; looks like a lens error on text | Opening dense grids of simple items (icons, tiles) |
| TR-X3 | Particle disintegration as a data-transfer wipe (200-300 discs in the UI's own colours, 0.9-1.0 s L→R) | [V:1CSXtQ t=19.00-19.95s] only | Generic sci-fi particles if the colours are not the UI's | Integrations, sync, import/export (also TR-SaaS) |
| TR-X4 | Twist-hidden background swap inside a 3D text ribbon | [V:1i2L14 t=15.567s] only | Needs a real 3D ribbon | Brand films where the name becomes an object |
| TR-X5 | Light-build release (glow area ×8-10 over ≈2 s, cut on the brightest frame) | [V:1ccYWJ t=18.87-21.00s] only | Dull without a clear emitter | Dark-mode films with an emissive accent |
| TR-X6 | Watercolour ink-bloom mask | [V:1-6l8S t=38.85s] only | Breaks a tech look | Emotional, human scenes inside a calm film |
| TR-X7 | Graphics on twos (12 fps) for illustration layers | [V:126cpH] only | Reads as lag on UI | Illustration and collage layers; keep UI, live action and camera on ones |
| TR-X8 | Scatter-swap-converge type cycles | [V:1i2L14 t=8.30-10.13s] only | Busy with more than 3 words per line | 3-word kinetic lines |
| TR-X9 | Page turn, "text → flowers" morph, "2.5D parallax transition", "layered object drop with lateral camera move", "blurred zoom transition" | [W:raivcoo] titles only, not watched | Unknown timing | Vocabulary for exploration only |
| TR-X10 | Generated in-model transitions (asking an AI video model to move from scene A to scene B) | None measured; [P] supports first/last-frame conditioning | Warped UI and identity drift (Master §21) | Only between two *photographic* states of one environment, never between designs (§7.14) |

---

## 7.10 Avoid (TR-A)

| ID | Avoid | Seen where | Do instead |
|---|---|---|---|
| TR-A1 | Plug-in transition packs: glitch, luma wipe, spin, page curl, light-leak preset | None of the 8 use them; NOSTRA's 26 f pixel build is the nearest and reads as noise [V:1i2L14 t=16.63-17.50s] | A motivated cut, wipe or morph (TR-U3) |
| TR-A2 | A 1-frame dip of a colour belonging to neither world | Bumper's black frame between light and navy reads as a render glitch [V:19NRDv t=25.60s] | A 1 f gap in the incoming world's colour (TR-19) |
| TR-A3 | One-frame artefacts at transitions: stray patches, overlapping words, plane intersections | kivi light-leak patch [V:1-6l8S t=59.73s]; "spreadsheetpowered" [V:1-6l8S t=64.27s]; window through glass edge [V:1CSXtQ t=18.4-19.0s] | Step every transition at 1 f in QC (§7.15) |
| TR-A4 | Unblurred camera hops above ≈10% W/f | Lottieicon tour at 22-27% W/f strobes [V:1ccYWJ t=30.57-32.57s] | ≤5% W/f unblurred; 180° blur above; bury >10% W/f in a cut (Part 04 CM-U9) |
| TR-A5 | 24/25 → 30 fps duplication | Judder on whips and decks [V:15VhHR] [V:1Hcg3X] [V:1CSXtQ] | Render at the delivery rate (TR-U14) |
| TR-A6 | Glitch or pixel builds longer than 12 f | [V:1i2L14 t=16.63-17.50s] (26 f) | ≤8 f de-pixelate (Wix 8 f) [V:15VhHR t=40.33s] |
| TR-A7 | Changing copy or UI state across a cut-in | "make" → "create" [V:15VhHR t=6.57s] | Lock strings and UI state across every cut |
| TR-A8 | Cutting late on a beat, or a few frames off a transient | Bumper's rule (never after) [V:19NRDv]; HubSpot 22.60 is 5 f early of a kick [V:1CSXtQ] | 0-2 f early, or move the cut into a silence gap |
| TR-A9 | A whoosh on every move | Wix uses none on its whips and stays clean [V:15VhHR] | Sound only section cuts, decisive clicks and peak-velocity hero moves |
| TR-A10 | Swapping information out before it can be read | "Order delivered" visible 2 f before the cut [V:126cpH t=13.53s]; Solar's message block readable ≈0.4 s [V:1Hcg3X t=29.80-30.2s] | Hold ≥ reading time before the transition starts (TR-U10) |
| TR-A11 | A parade of unrelated transition metaphors | NOSTRA's features section (arrows, pinwheel, iris, form, phone, strands, glass) [V:1i2L14 flaws] | One signature + motivated hero transitions (TR-U7) |
| TR-A12 | Generated or warped morphs between two different UI screens, products, logos or faces | Not in the references; it is the main AI-look failure (Master §21) [inferred] | Instant shape-match swap (TR-05) or a composited shared-element morph (TR-07) |
| TR-A13 | Overshoot or bounce on premium transitions | 0% in 7 of 8; [S:Slack]/[S:PointCard] "spring with overshoot" is text-only and inferred | Critically damped SETTLE |
| TR-A14 | More than one flash moment, flashes over 3 f, or more than 3 flashes per second | Solar's single 3 f + 2 f flash is the ceiling [V:1Hcg3X]; [N WCAG 2.3.1] | One flash at the conceptual peak |
| TR-A15 | Unexplained instant state jumps off the beat | Solar's battery gauge snaps feel arbitrary [V:1Hcg3X t=21.03, 21.53s] | Snap on a beat or a VO word |
| TR-A16 | Music ending before the picture | Lottieicon: 3.7 s of near-silence under the CTA [V:1ccYWJ] | Fade music with the end fade, or end on a resolved hit |
| TR-A17 | A crossfade as the default scene transition | None of the 8 [§0.1] | Hard cut with a hand-off (TR-U1) |
| TR-A18 | Decorative rays or overlays crossing a claim word during its reveal | Chowdeck's burst covers "seconds" for ≈0.5 s [V:126cpH t=3.90-4.43s] | Mask effects behind the type |

---

## 7.11 Especially good for SaaS (TR-SaaS)

1. **Interaction-triggered transitions (TR-20).** The product's own click, send or toggle moves the film forward and proves responsiveness [6 of 8].
2. **UI morph from the brand line into the product (TR-07).** "The CTA icon becomes the UI" [V:15VhHR WHY]; "build the UI around text the viewer has already read" [V:1CSXtQ].
3. **Prompt → result continuity reframe (TR-03).** Same plate, reframed, empty result card held 8-9 f, then a reading-order cascade of 3-4 f stagger [V:1-6l8S t=22.87-23.87s].
4. **Generation-state develops (TR-22)** for AI features instead of spinners [V:15VhHR] [V:1-6l8S].
5. **Anchored-element montage (TR-23)** for "one input, many outputs" [V:15VhHR t=8.63-12.47s].
6. **Context → extraction → push-through (TR-12)** for tables and dashboards [V:19NRDv t=16.77-18.75s].
7. **Screen-to-world pull-back (TR-15)** as the single 3D beat that explains an integration [V:1CSXtQ t=18.00s].
8. **Particle transfer in the UI's own colours (TR-X3)** for sync and integrations [V:1CSXtQ t=19.00s].
9. **Many → one collapse into the logo (TR-06)** for platforms that unify tools or payments [V:19NRDv t=55.0s] [V:15VhHR t=49.63s].
10. **Polarity flip claim/proof (TR-18)** so the viewer knows when to read and when to watch [V:19NRDv].
11. **Cut-ins and pull-out cuts (TR-11)** instead of zoom animations for UI detail [V:15VhHR].

---

## 7.12 Do / Don't

| Do | Don't |
|---|---|
| Design the last 6-10 f of A and first 6-20 f of B as one move | Put an effect layer between two unrelated shots |
| Cut at peak velocity, on an empty plate, on a full cover, or 1-8 f after a state change | Cut in the middle of an ease-out settle |
| Keep a matched element within ±5% W and hold it 2 f before the cut | "Match" elements that are 15-20% W apart |
| Swap shapes instantly (0 f) and add a physical reaction | Dissolve two different objects at the same spot |
| Exit in about half the entrance time | Give exits long, decorative tails |
| Pre-load a shape about 1 s before a shape wipe | Spring a surprise shape wipe out of nowhere |
| Put the decisive click after silence and cut 3-8 f after its state change | Cut on the cursor's arrival, before the click is confirmed |
| Keep blur dissolves to 4-8 f | Use 12-20 f soft crossfades between scenes |
| Make the gap frame the incoming world's colour | Flash one frame of black in a light film |
| Use one signature device 3-12 times | Use a new transition type in every scene |
| Lock copy, UI state and asset identity across every cut | Let a cut-in retype a different word |
| Composite shared elements across generated shots | Ask a video model to morph one UI into another |
| Let music outlast the end fade | Let the bed die before the CTA |

---

## 7.13 Transitions in 9:16

Chowdeck is the only vertical reference, measured through a crop of a screen capture and animated on twos, so all 9:16 guidance is **medium-to-weak evidence**.

- **Vertical is the primary transition axis.** Chowdeck's push runs bottom-to-top ("forward"): one frame height in ≈11 f, expo-in-out, peak ≈4.2 frame heights per second (≈14% H/f, computed), with directional blur of ≈10% H at the peak [V:126cpH t=2.53-2.90s]. Its lockup arrives by a vertical tilt through a cloud band (30 f + 10 f settle) [V:126cpH t=15.20-16.53s].
- **Specify whip speeds in % of the frame, never in pixels.** A horizontal whip across a 1080 px-wide 9:16 frame covers 44% fewer pixels per frame than the same % W/f in 16:9, yet reads at the same speed relative to the frame. A pixel speed copied from a 16:9 spec will run about 1.8× too fast in 9:16 (Part 04 §0.3) [inferred].
- **Matched and anchored elements must sit in the strict text area** (x 120-840, y 270-1210 on 1080×1920) [N], so platform UI never covers the constant that carries the cut.
- **Shared-element morphs suit vertical** because cards and notifications are already vertical stacks; Chowdeck's bottom-anchored collapse is the model [V:126cpH t=11.03s].
- **On-twos** stepping is fine for illustration layers only (TR-X7); keep UI and camera moves on ones [V:126cpH rule 13, inferred].

---

## 7.14 Writing transitions into AI-video, compositing and Remotion specs

### 7.14.1 Principles

1. **The generator makes shots; the edit makes transitions** [inferred]. Plan every transition in the storyboard, generate (or animate) each shot with its *outgoing* and *incoming* frames specified, and execute the transition in compositing or in the template engine. This keeps UI, text and products pixel-stable across the cut (TR-A12).
2. **Specify both halves.** A transition spec without the last frames of A and the first frames of B is not a spec. Use the field template below.
3. **Never write "smooth transition", "cinematic transition" or "seamless morph".** Write what creates the effect: direction, speed in % W/f, ease name, frame counts, the matched element and its coordinates, the gap frame colour, and the sound placement.
4. **Use the generator's conditioning only for continuity of one environment.** Veo 3.1 accepts a `last_frame`, up to 3 reference images, Frames-to-Video and Extend (+7 s per step) [P]. Use them to pin the start and end composition of a seamless camera move (TR-17) or to start shot B from a frame that already contains the matched element at the matched position (TR-03/05) [inferred method]. Do not use them to morph between two designs.
5. **One camera move per generated clip** [P]. A transition that needs two moves (whip + settle) is two clips cut together.
6. **Frame rate.** Veo 3.1 clips are 24 fps [P]. Either deliver that cut at 24 fps or keep generated footage to slow or static shots and build whips, zooms and wipes as 30 fps graphics; never duplicate 24 → 30 under a fast transition (TR-U14) [inferred].
7. **Negatives.** For generated shots that carry text later, add the noun list "text, subtitles, captions, letters, watermark, logo" [P]; for transition shots add "morphing, warping, melting, distorted interface, changing text, flicker" [inferred].
8. **Remotion / template engines.** A `TransitionSeries` overlap shortens the total by the transition length [N]. Most of this library is not an overlap effect: it is in-scene animation on either side of a plain sequence boundary (TR-U1). Build hand-offs as each scene's own entrance and exit; reserve overlaps for TR-13 and TR-24 [inferred].

### 7.14.2 Transition spec template (one block per scene change)

```
TRANSITION T{nn}  (S{a} → S{b})
type:            TR-{id} {name}            class: {U|S|X}   role: {signature|hero|plain}
cut frame:       f{n} ({t} s)              driver: {action|beat|VO word|story}
outgoing S{a}:   frames f{n−k}–f{n−1}; {element}; direction {…}; speed {from}→{to} %W/f;
                 ease {INTO-CUT g1.6 | …}; blur {none | 180° on last 2 f}
gap:             {none | 1 f #{hex} (incoming BG)}
incoming S{b}:   frames f{n}–f{n+m}; {element}; first-frame speed {…} %W/f; ease {SETTLE};
                 matched element: {name} at ({x}%W,{y}%H) ±5%W, scale ×{s}, colour {…}
camera:          {locked | move, speed band, ease}  roll 0°, overshoot 0%
sound:           {none | whoosh peak f{…} | hit f{…} | silence f{…}–f{…}, −{dB}}
must stay same:  {copy string, UI state, product geometry, logo, palette}
negatives:       {morphing, warping, changing text, crossfade, overshoot, flicker}
QC:              step f{n−10}–f{n+10} at 1 f; gap colour; no artefact; text still while read
```

### 7.14.3 Worked example 1: send → sent bubble (TR-04 + TR-15), 16:9 @1080p

```
TRANSITION T06  (S04 prompt macro → S05 chat world)
type:            TR-04 motion match cut      class: U   role: hero
cut frame:       f534 (17.80 s)              driver: action (send)
outgoing S04:    f528–f533; prompt bar content moves UP; 4.5→4.5→7.5→10.5 px/f
                 (0.4→1.0 %H/f); INTO-CUT; no blur
gap:             none
incoming S05:    f534–f538; sent bubble continues UP at 51, 51, 46, 10, 6 px/f
                 (4.7→0.6 %H/f); SETTLE
                 then f540–f549 pull-back ×0.57 (front-loaded), f550–f569 further ×0.56
                 decelerating; blue-grey set #C8D4DF→#F4F5F8 fades in over 6 f (f545–f551)
matched:         bubble text = the exact prompt string typed in S04
camera:          2D until f539, then 3D pull-back; roll 0°; overshoot 0%
sound:           small whoosh/hit on f534, ≈3 dB over the bed; 70 ms silence at f569–f571,
                 hit at f572 when the data transfer starts
must stay same:  prompt string, composer UI, chip states, brand orange #F65542
negatives:       crossfade, morphing UI, changing text, motion blur on 2D moves
QC:              step f526–f545; caret and text identical across f533/f534
```
Measured basis: [V:1CSXtQ t=17.60-19.03s], speeds converted from 720p.

### 7.14.4 Worked example 2: tagline punch → logo (TR-11 + TR-02), 16:9 @1080p, 127 BPM

```
TRANSITION T29  (S30 tagline → S31 wordmark)
type:            TR-11 punch into a cut + TR-02 beat cut   role: signature (4th use)
cut frame:       f2133 (71.10 s); target 0-1 f before the beat (the reference lands within 1.5 f)
outgoing S30:    f2125–f2132; whole tagline scales +18.7%; per-frame width growth
                 7, 10, 13, 15, 17, 49, 49, 125 px @1080p (computed from 4, 6, 8, 9, 10, 29,
                 29, 74 px on a 902 px line @1138); centred; no blur
gap:             none (or 1 white frame #FFFFFF for a bigger hit)
incoming S31:    f2133–f2167; serif wordmark at ≈15.4% H, decelerating push +29% over 35 f
                 (the punch's momentum carried through the cut)
matched:         centre point of the frame (both elements centred)
camera:          digital scale only; roll 0°
sound:           cut on the onset (±1 f); no whoosh
must stay same:  wordmark geometry, brand green #2D4123
negatives:       overshoot, bounce, crossfade, glow on the wordmark
QC:              step f2120–f2140; wordmark sharp on f2133; no tagline pixels left on f2133
```
Measured basis: [V:1-6l8S t=70.83-72.27s].

---

## 7.15 Transition QC gate (run on every scene change)

| # | Check | Pass condition | Rule |
|---|---|---|---|
| 1 | Type is in the plan | Every change has a TR ID, a role (signature / hero / plain) and a cause | TR-U3, TR-U7 |
| 2 | Budget | Signature used 3-12 times; hero one-offs ≤4; decorative wipes ≤2; flash ≤1 | §7.5 |
| 3 | Cut frame is legal | Peak velocity, empty plate, full cover, behind an exiting element, 1-8 f after a state change, or 0-2 f before a beat | §7.3.1 |
| 4 | Hand-off speeds | Outgoing accelerates; incoming starts 3-5× faster and settles; same direction | TR-U2, TR-U13 |
| 5 | Matched element | Within ±5% W, same angle, held ≥2 f when it is a match | TR-03, TR-05 |
| 6 | Constant across the cut | At least one of position, shape, direction, colour field or anchor | TR-U4 |
| 7 | Gap frames | 0-4 f, coloured as the incoming world or the neutral; no foreign 1-frame dip | TR-U12, TR-A2 |
| 8 | Durations | Bridges within their band (§0.2); blur dissolves 4-8 f; covering wipes 6-12 f | TR-U9 |
| 9 | Text | Fully legible and still for its reading time before any exit; no overlap mid-exit | TR-U10, TR-A3 |
| 10 | Continuity | Copy strings, UI state, product geometry and logo identical across the cut | TR-A7 |
| 11 | Speed and blur | ≤5% W/f unblurred; 5-10% W/f with 180° blur; >10% W/f only into a cut | TR-A4 |
| 12 | Artefacts | Step ±10 f at 1 f: no stray patches, plane intersections or warped frames | TR-A3, TR-A12 |
| 13 | Sound | Placement as §7.6; decisive clicks preceded by silence; music outlasts the picture | TR-U11, TR-A16 |
| 14 | Beat offset | In music-led sections, picture 0-2 f ahead; never late; no 3-5 f near misses | TR-02, TR-A8 |
| 15 | Frame rate | Rendered natively at the delivery rate; no duplicated frames in moves | TR-U14 |
| 16 | Flashing | ≤3 flashes per second; ≤3 f per flash colour | TR-A14 |
| 17 | Safe area | Matched and anchored elements inside the platform text-safe area | §7.13 |

---

## Appendix A. Where the references overrule generic advice (transitions)

| # | Generic or text-source advice | What the references do | Ruling |
|---|---|---|---|
| 1 | Blur dissolves of 8-12 f; a 10 f blur dissolve as a global default [E, inferred] | 4-8 f in every measured case (HubSpot 8, NOSTRA 4, kivi 4-8, Bumper 4 to white) | **References win**: 4-8 f, default 6 f |
| 2 | Full-frame transitions of 500-700 ms (15-21 f) [N, derived from UI tokens] | Covering wipes 4-12 f (chevron 12, iris 7, burst 6, blinds 4); only washes, band pushes and camera transitions run 17-32 f | **References win** for covering wipes; [N]'s range fits only soft washes and camera moves |
| 3 | Continuous "one-take" zoom-through flow with no hard cuts [S:Bolt, inferred in source] | Hard cuts carry 69-100% of changes in 6 of 8; the longest continuous take is 8.23 s | **References win** (also Part 04 Appendix A #4) |
| 4 | Crossfades / soft dissolves between lifestyle and UI shots [S:Airbnb, inferred in source]; crossfade as a template default [common practice, inferred] | Two opacity blends between shots in ≈362 s of references (a 17 f logo hand-over and a 3 f dim-to-texture) | **References win**: crossfades only for logo states and end fades (TR-24) |
| 5 | Scale-pop and "spring-magnet" transitions with overshoot [S:PointCard, S:Slack, inferred in sources] | 0% overshoot on transitions in 7 of 8; Chowdeck's card overshoots ≈¼ of its swing in a playful style | **References win** for premium; overshoot is style-specific (playful only) |
| 6 | Brand-shape wipes as section transitions, repeated [S:Slack, inferred in source] | One hard-edged shape wipe per film at most, always motivated (Bumper's chevron for "up a gear") | **References win**: ≤2 decorative wipes, each motivated |
| 7 | Start whooshes 4-8 f before a cut, peak on the first frame of the new shot [N, unverified] | Whoosh ending on a whip's fastest frame; booms at the peak velocity of glides; hits within ±2 f of cuts | **Both**, by case: agree for whips into cuts; **references win** for mid-shot glides |
| 8 | Flash or white-dip transitions on music hits [S:Snowflake, inferred in source]; a 2-4 f hard flash at the open [S:Bolt, inferred] | One flash moment per film (3 f + 2 f); white frames of 1-4 f in light films only | **References win**, and [N WCAG] caps flashes at 3 per second |
| 9 | Hard cuts on the beat, or 10 f blur dissolves [E, inferred] | Beat-locking is style-specific (3 of 8); 5 of 8 sync only section events or SFX | **References win**: choose an edit driver per section (TR-02) |
| 10 | "Sharp impact transitions synced to scene cuts" [W:motion.so] | Impacts are sparse and placed (HubSpot hits; Lottieicon subs at peak velocity); Wix uses none on whips | **Both**: impacts yes, but only on section cuts and hero moves (TR-U11) |
| 11 | Remotion `TransitionSeries` overlaps as the transition mechanism [N] | Most measured transitions are in-scene entrances and exits around a plain boundary | **No conflict**: build hand-offs inside scenes; use overlaps for blur dissolves and fades only |

## Appendix B. Evidence strength and gaps

**Strong** (three or more references, frame-measured)
- Hard-cut dominance and zero plug-in transitions (8 of 8).
- Accelerate into, decelerate out of cuts (7 of 8).
- One signature device repeated plus 2-4 hero transitions (8 of 8).
- Short blur dissolves of 4-8 f (4 references).
- Match cuts with a ±5% W position tolerance (NOSTRA, Solar, Bumper; Wix colour; HubSpot concept).
- Directional continuity across cuts (5 references).
- Polarity / background flips at boundaries (6 references).
- Empty-plate and breath frames of 1 f (5 references).
- Interaction-triggered transitions (6 references).
- Type-carried transitions (6 references).
- Exits shorter than entrances (4 references plus [N]).

**Medium** (1-2 references, measured)
- Velocity ratio of 3-5× across a motion match (HubSpot only; Solar and NOSTRA consistent in shape).
- Chevron mask wipe timing (Bumper only); blinds, iris and burst (NOSTRA only).
- Zoom-through ×1.36/f and light-build release (Lottieicon only).
- Push-through (Bumper) and dolly through particles (HubSpot): one each.
- Shared-element card → notification morph (Chowdeck only, measured on a 12 fps animation through a screen-capture crop).
- Seamless tilt through a layer (Chowdeck only).
- Generation-state develops (Wix only); mono → colour bloom (kivi only).
- Logo crossfade and colour dissolve (kivi, Wix).
- All 9:16 transition guidance (Chowdeck only).

**Weak / inferred**
- Sound under transitions: most SFX are inferred from spectrograms or not separable (Chowdeck's audio is a room recording; Solar's is a flat bed). Only HubSpot's hits, Wix's suck-out and Lottieicon's subs are measured.
- Portal transitions beyond two single uses; page turns, text morphs and parallax transitions exist only as catalogue titles [W:raivcoo].
- Budgets for 5-10 s and 90 s films are extrapolated.
- **AI-video transitions:** no generated transition was measured. Everything in §7.14 about conditioning frames is method inferred from [P] facts.
- Overshoot tolerance in playful SaaS styles rests on one reference (Chowdeck).
- The rule "incoming starts 3-5× faster" is a generalisation from one measured hand-off plus consistent shapes elsewhere; treat the ratio, not the exact numbers, as the rule.

## Audit (2026-10-08)

Adversarial check of this part against the eight per-video teardowns (videos/<id>.md), superside.json, motion-numbers-brief.md, voice-footage-pipeline-brief.md, elevenlabs-style-brief.md and raivcoo.md / motion-so.md. Most numbers matched their cited teardown to the stated precision; spot-checked items include every census row, the chevron speed series, the bell zoom ratios, the HubSpot velocity hand-off, the Chowdeck morph and tilt, the Wix carousel/deck/develop timings, the Solar whip and wall-wipe series, the NOSTRA whip, burst and iris series, and every [N]/[P]/[E]/[W] figure.

Changes made (10 fixes + 1 added section):
1. §0.1 census, kivi hard-cut share: was "≈34% (11 of 32)". The kivi teardown gives 9 hard cuts in its transition table and 11 in its beat statistics; now "≈28-34% (9-11)".
2. §0.3 #2 hard-cut range widened from 34-100% to 28-100% to match fix 1.
3. TR-08 kivi whip: "≈6 f" → "≈4-6 f" (38.70-38.85 s is 4.5 f; the teardown says ~4-6 f).
4. TR-08 Lottieicon whip deltas: removed a spurious leading "2"; the teardown series is 3, 5, 8, 11, 17, 25, 42.
5. TR-08 sound: "whoosh ends on the fastest frame [V:1i2L14 takeaway]" was presented as observed. It is the teardown's recommendation; NOSTRA has no measurable whoosh at the whip. Re-tagged [inferred] and added the measured Lottieicon sub on its whip cut.
6. §7.6 whip row: same re-tag as fix 5.
7. TR-09 sound: "only a small blip 3 f before it" is not in the Lottieicon teardown; its verification says there is nothing at the card flip. Corrected.
8. TR-02 [S:Figma]: "cut on the music" is not in the source (which says only "upbeat music, fast sequencing"). Reworded.
9. TR-21: kivi card holds "1.2-1.7 s" → "1.2-1.9 s" (the teardown's type-card range).
10. §0.3 #10: the 6 f blur-dissolve default is a midpoint, not a measurement; tagged [inferred].
11. Added §7.2.25 "Premium vs amateur, card by card" so every Phase-7 type has an explicit premium-vs-amateur contrast with evidence or an [inferred] tag (scope item 4).

Remaining known gaps:
- Sound under transitions is still the weakest evidence: most SFX descriptions in TR-03, TR-05, TR-06, TR-12, TR-14 and TR-19 are [inferred]; only HubSpot's hits, Wix's suck-out, Chowdeck's click and Lottieicon's subs are measured.
- Wix, HubSpot and Solar are 24/25 fps masters in 30 fps files, so their frame counts include duplicate frames (multiply by ≈0.83 for source frames); the cards quote the 30 fps counts.
- Chowdeck (the only 9:16 reference) was measured through a cropped screen capture of a 12 fps animation; all 9:16 rules stay medium-to-weak.
- Portal (TR-16) rests on two single uses; page turns, text morphs and parallax transitions exist only as catalogue titles.
- No AI-generated transition was measured; §7.14's conditioning advice is method inferred from [P] facts.
- Budgets for 5, 10 and 90 s runtimes are extrapolated.
- Some counts differ inside the source teardowns themselves (NOSTRA "13" vs "14" hard cuts; kivi 9 vs 11); this part quotes both where it matters.

