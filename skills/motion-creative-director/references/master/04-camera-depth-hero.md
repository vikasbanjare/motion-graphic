# Master SaaS Motion Design System, Part 04
## Master §6 Camera Movement Library · §20 Cinematic Depth Rules · §10 Product Hero-Shot Rules

Draft v1, 2026-10-08. Built from frame-measured teardowns of the eight reference videos in the user's folder, plus text-only research. Use it to specify, build and QC every camera move, every depth decision and every hero shot. A senior motion designer, an editor or an AI video system should be able to follow it without guessing.

---

## 0. How to read this part

**Units**
- **% W / % H**: percent of frame width / height.
- **Speed**: % W per frame (**% W/f**). Perceived speed scales with the frame, not the pixel count, so this unit transfers between resolutions.
  - 1% W/f = 19.2 px/f at 1920×1080 = 576 px/s.
  - Across a 1080-wide 9:16 frame, 1% W/f = 10.8 px/f.
- **Scale speed**: % per frame. A "×1.36/f" zoom grows 36% every frame.
- **px @1080p** = a 16:9 frame of 1920×1080. **px @1920p** = a 9:16 frame of 1080×1920.
- **f** = one frame at 30 fps (33.3 ms).
- Teardown values measured at source resolution (1138, 1280 or 1011 px wide) are converted and marked **(computed)**.
- **Source frame-rate caveat.** Frame counts are in 30 fps container frames, but three references were not animated at 30: Wix [V:15VhHR] and HubSpot [V:1CSXtQ] are 25 fps masters with every 6th frame duplicated (multiply Wix counts by 0.833 for true 25 fps frames; HubSpot's smallest real step is 40 ms), Solar [V:1Hcg3X] is 24 fps with every 5th frame repeated, and Chowdeck [V:126cpH] animates on twos (≈12 unique poses/s). Counts under ≈4 f from these four are therefore ±1 f.

**Evidence tags** (the same as Parts 01-02)
- **[V:xxxxxx t=..s]**: the user's reference videos, measured frame by frame. This is the strongest evidence.
- **[S:brand]** / **[S:playbook]**: Superside text research.
- **[E]**: ElevenLabs style brief. Camera and motion values in it are mostly the brief's own inferences.
- **[N]**: design-system tokens, standards and platform data.
- **[P]**: the voice and footage pipeline brief (Veo/Flow).
- **[W:site]**: inspiration-site catalogues (titles and descriptions only).
- **[inferred]**: my own judgement, not directly observed or sourced.

Text-only sources ([S], [E], [W], [P]) support intent and vocabulary. They never support frame-level timing.

**Priority.** The user's references outrank generic advice. Where they disagree, a **"References win"** note says so and explains why. Appendix A lists every such ruling.

**Rule IDs**
- **CM-** = camera (Master §6). **DP-** = depth (Master §20). **HS-** = hero shot (Master §10).
- Class letters:
  - **U** = universal (three or more references agree).
  - **S** = style-specific.
  - **X** = experimental (one reference, or untested).
  - **A** = avoid.
  - **SaaS** = especially good for SaaS.

### Reference roster (tags used below)

| Tag | Reference | Frame / length | Style |
|---|---|---|---|
| [V:1-6l8S] | kivi, voice-AI dictation launch | 16:9, 77.8 s | Minimal Premium × soft-cinematic UI demo |
| [V:126cpH] | Chowdeck delivery-app ad, measured through a crop of an AE screen capture | 9:16, ~18 s | Playful illustrated collage + UI demo |
| [V:15VhHR] | Wix AI site builder | 16:9, 53.9 s | UI demo inside an editorial brand frame |
| [V:19NRDv] | Bumper PRO payments launch | 16:9, 67.2 s | Kinetic-type launch with 3D UI proof |
| [V:1CSXtQ] | OpenAI × HubSpot connector spot | 16:9, 30 s | Minimal Premium, prompt-native, one 3D beat |
| [V:1Hcg3X] | "How do solar panels work?" | 16:9, 35.8 s | Editorial 2.5D explainer |
| [V:1ccYWJ] | Lottieicon icon-library promo | 16:9, 44.3 s | Fast startup launch, dark neon |
| [V:1i2L14] | NOSTRA studio promo | 16:9 inset, 35 s | Monochrome brand-system explainer |

### 0.1 Camera census: what the eight references actually do

| Ref | Camera share | Moves actually used | Motion blur | True 3D / DOF | Depth recipe |
|---|---|---|---|---|---|
| kivi [V:1-6l8S] | Locked frame plus breathing on every shot | Breathing pushes of 1.07-1.29×; 4 exponential punches into cuts; 1 truck (40% W in 0.85 s); 1 cut-in (2×); continuity reframes | None, even on whips and the truck | None. Flat painted plates with no measurable parallax | Focus: sharp glass UI over heavily defocused plates |
| Chowdeck [V:126cpH] | Locked title cards ≈42% of runtime | 2-stage pull-out (4.1×); push + pan over a mosaic; vertical push; map rotate-to-upright + pan; tilt through a cloud band; 2 rack focuses | Directional blur on the vertical push only | None (2D comp camera) | Offset backing card; drop shadows on photo cut-outs; fake DOF |
| Wix [V:15VhHR] | Static brand frames and dialogs, 1-3.7 s | Jump-reframes; caret-follow truck; ≈3.4× cut-ins; pull-out cuts (page lands at ≈85% scale / ≈55% W / ≈44% W); carousel decel-dwell-accel whip; 3D card rotations; deck fan; page scrolls | Only on the carousel whip and page scrolls | 3D heart, ice object, carousel, deck. No camera DOF pull | Blur plates; foreground leaf; UI-in-world window |
| Bumper [V:19NRDv] | "Never static on UI": drift ≈1-3% of frame per second | Pull-back on building type with 3 f snaps; fly-in of tilted planes; push-through; dolly along rows; 2.5× punch-in cut; angle-change cut; stepped orbit; drift orbit; yaw recede; whip tilts | On every move (≈180° shutter [inferred]) | Yes: perspective planes, DOF, parallax, contact shadows | Shadows + DOF + parallax |
| HubSpot [V:1CSXtQ] | Every card drifts. The only still frame is the final 2.2 s | Re-centre pan; caret-follow; 2D pull-back ×0.75; accelerating logo push; macro truck; 3D screen-to-world pull-back ×0.32; dolly ×2.3 through particles; tilt-scroll | None on 2D moves, even at 75 px/f @720; bokeh only in the 3D beat | One 3.67 s 3D beat | Real DOF, foreground parallax, glass edge |
| Solar [V:1Hcg3X] | Perpetual scroll drift; true holds ≤5 f | Vertical crane-scroll; an expo-in whip exit on most shots; pan-whip; 3× scale pull-out; push/tilt; parallax | 1 blurred frame on the hook exit | None (2.5D only) | Hard long shadows, overlap, parallax 1.3-2× |
| Lottieicon [V:1ccYWJ] | 19 of 25 shots locked | Zoom-through at ×1.36/f; 2 lens-distortion zoom-outs; hop-and-hold tour; crane-up scroll; horizon rise; scale-matched pull-back | None. Strobes at 22-27% W/f | Extruded cards and a dome; DOF only on the CTA bubbles | Light (emissive glow), extrusion, dim-to-texture |
| NOSTRA [V:1i2L14] | Static plus 0.3-1 px/f micro drift | Fly-through clouds; 2-step pull-back; cue-led whip pan; push into bloom; ribbon push and pull; orbit inside a card ring; tilt onto a floor plane | On the whip's last 2 f only | Card ring, text ribbon, floor grid | Fog and scale, glass, grain gradient |

**What the census says**
1. All eight keep the frame alive. Only Bumper moves a real 3D camera through most of its proof shots.
2. In premium SaaS films, "camera" mostly means digital scale and position on flat layers. The rest is edit-camera: cut-ins, pull-out cuts and reframes.
3. No reference uses camera roll, handheld shake or a continuous 360° orbit.
4. Five of eight leave 2D moves unblurred. Blur policy is a style decision, not a universal one (CM-U9).

### 0.2 Defaults card: the numbers to encode first

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

### 0.3 Speed bands (use these names in briefs and prompts)

| Band | Speed (% W/f) | px/f @1080p | px/f across 9:16 | Scale speed | Blur | Use | Evidence |
|---|---|---|---|---|---|---|---|
| **Still** | 0 | 0 | 0 | 0 | — | The final lockup only | [V:1CSXtQ t=27.87-30.03s] |
| **Breathe** | 0.03-0.2 | 0.6-4 | 0.3-2 | 0.15-0.9%/f | None | Every hold; read-safe | [V:1-6l8S] [V:1i2L14] [V:1CSXtQ] [V:19NRDv] |
| **Scroll-drift** | 0.3-0.5 | 6-10 | 3-5 | — | None | Flat illustration worlds only | [V:1Hcg3X] |
| **Glide** | 0.5-4 | 10-77 | 5-43 | 1-6%/f | None | Follows, reveals, trucks | [V:1CSXtQ] [V:1-6l8S] [V:15VhHR] |
| **Fast glide** | 4-10 | 77-192 | 43-108 | 6-15%/f | 180° recommended above 5 | Tour hops, push-throughs | [V:1ccYWJ moves 1-2] [V:19NRDv t=18.25s] |
| **Snap / whip** | 10-25 | 192-480 | 108-270 | 15-36%/f | Required, or bury it in the cut | The last 2-3 f into a cut | [V:1i2L14] [V:1Hcg3X] [V:15VhHR] |

Scale-speed column: values are computed from the cited moves (HubSpot pull-back ≈1.4%/f, HubSpot 3D pull-back ≈5.5%/f, Bumper snaps ≈10%/f, Lottieicon zoom-through 36%/f); the band edges between them are [inferred].

**Why bands matter.** At 30 fps, the eye fuses frames into smooth motion only when each frame's displacement is small. Above about 5% W/f, a crisp edge appears in two places a frame apart, so the move reads as strobing rather than travelling [inferred, from the measured failure in [V:1ccYWJ t=30.57-32.57s]].

### 0.4 Camera ease vocabulary

| Name | Curve | Measured where | Use |
|---|---|---|---|
| **BREATHE** | Linear | kivi pushes ("mostly linear"); Bumper's PRO push; Chowdeck's mosaic push | Holds. The cuts hide the start and end. |
| **SETTLE** (expo-out) | `cubic-bezier(0.16, 1, 0.3, 1)` [N] | 40-64% of travel lands on the first frame and 86-95% by frame 3-6: Bumper "Take" slam 64% / 86% in 3 f [V:19NRDv t=0.00-0.30s]; NOSTRA 40-45% / 88-95% by f6 [V:1i2L14]; Chowdeck pull-out stage 1 [V:126cpH] | Arrivals out of a cut; landings |
| **GLIDE** (symmetric in-out) | `cubic-bezier(0.65, 0, 0.35, 1)` [E] for a peak at 50-55%; an expo in-out shape when the peak is 4-5× the mean speed [inferred mapping] | HubSpot pull-back peaks at 50-55% [V:1CSXtQ t=8.2-8.9s]; Lottieicon tour hops [V:1ccYWJ] | Reveals; travel between two targets |
| **ATTACK** (fast attack, long tail) | ≈`cubic-bezier(0.2, 0, 0, 1)` [N M3 standard; inferred fit] | HubSpot re-centre pan peaks at ≈25% [V:1CSXtQ t=3.37-3.93s]; kivi truck (2-3 f hold, fast middle, long tail) [V:1-6l8S t=35.47-36.4s] | Reframes, re-centres, short repositions |
| **READ** (long settle) | `cubic-bezier(0.45, 0, 0, 1)`, least-squares fit with 1.5% RMSE | Solar's split-screen wipe [V:1Hcg3X t=17.0-19.4s] | Any move that introduces text. It gives ~1.5 s of near-still frame while technically still moving. |
| **INTO-CUT** (accelerate) | Expo-in. Speed grows ×1.3-1.9 per frame, or scale increments roughly double. M3 emphasized-accelerate `(0.3, 0, 0.8, 0.15)` [N] is a softer stand-in | kivi punches; Solar whips ×1.35-1.9; NOSTRA whip ×1.3-3; HubSpot shrinks and pushes into cuts | The last 6-10 f before a cut |
| **BRIDGE** | Decelerate 11-14 f → dwell 6-7 f below 15% of peak speed → accelerate 13-21 f | Wix carousel and deck [V:15VhHR t=14.13-15.87s, 48.27-49.63s] | Moving between items in a strip or a deck |
| **NO SPRING** | 0% overshoot | All 8 references | The camera never overshoots. Bounce belongs to objects, never to the lens. |

---

# Master §6. Camera Movement Library

## 6.0 What a camera move is for, and why restraint reads as premium

The camera is the viewer's attention. Each move tells the eye where to look next. A move with no reason splits attention between "what am I looking at" and "why is it moving". That split is exactly how random AI camera motion reads as cheap.

The references converge on one grammar: **long, low-amplitude, linear breathing everywhere, and rare, decisive, motivated moves at the few moments that matter.**

**CM-U1. Every move has one of four motives: BREATHE, FOLLOW, REVEAL or HAND-OFF. If a move has none, delete it.** [U]

| Motive | What it does | Measured example |
|---|---|---|
| **BREATHE** | Keeps a hold alive so it never looks paused | kivi: every hold gets a 1.07-1.29× push [V:1-6l8S] |
| **FOLLOW** | Tracks an action so the eye never searches | The caret stays at 65-66% W while the line types [V:1CSXtQ t=4.5-7.2s] |
| **REVEAL** | Changes scale to show context or detail | Text becomes a UI by a ×0.75 pull-back [V:1CSXtQ t=8.0-9.03s] |
| **HAND-OFF** | Carries energy across a cut | The send motion accelerates up to the cut; the bubble continues upward after it [V:1CSXtQ t=17.8s] |

Evidence that unmotivated moves are absent:
- Lottieicon's tour camera "always travels *to* something" [V:1ccYWJ t=27.13-33.20s].
- NOSTRA cues every fast move: the cursor arrow turns toward the whip's direction ≈10 f ahead [V:1i2L14 t=5.5-5.87s].
- In Solar, the next shot continues every move's direction [V:1Hcg3X].
- kivi's only real camera move, the truck, exists to set up a cursor click [V:1-6l8S t=35.47-37.15s].

## 6.1 The library at a glance

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

## 6.2 Move cards

Every card follows the same order: definition, use, numbers, focal feel, transition into the next shot, mistakes, why it works, and a prompt line. The prompt line is written for an AI video model or as a compositing spec. Its numbers are the measured values above, converted to a 1920×1080 frame.

### CM-01 Locked-off (still) [U]

- **Definition.** The composition does not move at all: no scale, no translation. Ambient layers (an aurora, a gradient, an object's own loop) may still move.
- **Use.**
  - The final logo lockup: **still ≥1.5 s, 2.2 s for premium** (the system floor: P01 §2.16 #9, P08 DU-U5, P11 G-11).
  - A mid-film reading hold of at most ≈1 s in minimal or editorial styles.
  - A shot where the object's own motion carries everything. The Solar wafer sits in a static frame for 4.7 s while it bounces, tumbles and gathers electrons [V:1Hcg3X t=6.83-11.53s].
- **Numbers.**
  - Final lockups are dead still for 2.2 s [V:1CSXtQ t=27.87-30.03s], ≈1.7 s [V:15VhHR t=52.20-53.87s], ≈1.4 s with one tiny wobbling rider [V:126cpH t=16.53-17.97s] and ≈0.8 s [V:1i2L14 t=34.2-35.07s]. Chowdeck's 1.4 s and NOSTRA's 0.8 s are flagged short; the rule is ≥1.5 s.
  - Mid-film still holds: Wix holds its brand sentence still for 1.0 s before anything moves [V:15VhHR t=0.63-1.43s]. Solar never holds still for more than 5 f [V:1Hcg3X t=5.43-6.83s].
  - Lottieicon locks 19 of 25 shots, but life comes from object scale and the moving aurora behind [V:1ccYWJ].
- **Focal feel.** Orthographic and flat, with no perspective and no DOF.
- **Into the next shot.**
  - A hard cut, often with a background polarity flip (11 of NOSTRA's 13 hard cuts flip green ↔ white) [V:1i2L14].
  - Or the subject exits by itself (a whip, a fall, a shrink) and the cut lands on the empty plate [V:1Hcg3X].
- **Mistakes.**
  - A still frame in mid-film with nothing moving for more than ≈1 s. It reads as a paused video or a slideshow.
  - A still opening. Chowdeck's ad is static for its first 0.73 s, which costs the hook [V:126cpH t=0.00-0.73s].
  - Locking a frame that crops a UI component by accident at the edge [V:1ccYWJ t=12.17s].
- **Why it works.** Stillness is the strongest "full stop" signal there is. It is credible only because everything before it was moving. That is why the true still is saved for the end.
- **Prompt line.** "Locked-off tripod shot, zero camera movement, no drift, no zoom, no shake; only [named element] moves."

### CM-02 Breathing push / drift [U]

- **Definition.** A slow, constant change of scale (push or shrink) or position across a hold. It is linear, so the cuts at either end hide its start and end.
- **Use.** On every hold that is not the final lockup, including type cards, UI cards, logos and plates.
- **Numbers.**

| Reference | Breathing measured | Per-frame (computed) |
|---|---|---|
| kivi | Pushes of 1.07-1.29× over 0.5-2.5 s, mostly linear, on nearly every hold; lateral text drift ≈42 px/s at 1138 w (3.7% W/s) [V:1-6l8S] | 0.3-0.6%/f; 0.12% W/f |
| HubSpot | Every text card shrinks 13-24% (×0.76-0.87); the logo pushes +10.6%. These are ease-in shrinks/pushes into the cut, not linear breaths [V:1CSXtQ t=10.37-13.03s, 21.47-27.37s] | ≈0.2%/f (logo, 10.6% over ≈51 f) to ≈1.1%/f (card 6, ×0.80 over 18 f) (computed) |
| Bumper | PRO pushes +8.9% over 33 f, linear [V:19NRDv t=60.10-61.20s]; UI drifts ≈1-3% of frame per second [estimate in teardown] | 0.27%/f |
| NOSTRA | 0.3-1 px/f, or 0.05-0.1% scale per frame [V:1i2L14] | 0.03-0.1% W/f |
| Lottieicon | The "For *Creator*" card grows ≈+10% linearly; the counter card pushes ≈+10% [V:1ccYWJ t=6.80-7.30s, 15.7-16.07s] | ≈0.6-0.9%/f |
| Chowdeck | Push + pan across the mosaic, 1.3-1.5× over ≈2.7 s, linear [V:126cpH t=6.53-9.27s] | ≈0.4%/f |
| Solar | Scroll drift 0.34-0.51% H/f (≈136 px/s @1080p) [V:1Hcg3X t=0.37-0.97s] | Scroll-drift band |

  **Default:** +10% over a 1.5-2 s hold (band +8-12%), linear, in one direction per film section.

  **Style exception (calm / minimal styles):** +3-8% per hold, still linear. NOSTRA's minimal editorial film breathes at 0.05-0.1% scale per frame, ≈2-4.5% over a 45 f hold [V:1i2L14]; the worked example's calm voice-AI film uses +3-8% (worked-example B.2). A "subtle" push (P11 banned-word table: 1.00 → 1.05 over 2.0 s) sits in this band. Below ≈0.15%/f the breath stops reading as motion [inferred].
- **Direction carries meaning.**
  - A push-in reads as attention and intimacy (kivi, Bumper).
  - A shrink or pull-back reads as "this is receding; make room for the next idea". HubSpot shrinks every text card into the next cut [V:1CSXtQ t=21.9-27.3s].
  - Bumper pulls back while words keep arriving, so the camera seems to step back to fit the growing sentence [V:19NRDv].
- **Focal feel.** Orthographic.
- **Into the next shot.** Either the linear breath runs straight into the cut, or the last 6-10 f turn into INTO-CUT (CM-03). HubSpot's grammar is "ease out of the cut, ease in toward the next cut" [V:1CSXtQ].
- **Mistakes.**
  - A breath that reverses direction within the hold.
  - Breathing on two translation axes plus scale at once, which reads as "floaty" [inferred].
  - An amplitude above ≈30% with no motive.
  - Ease-in-out breathing, which shows a visible start and stop inside the hold [inferred].
  - Breathing a plate while the UI on top also moves fast. Only one layer should carry the breath.
- **Why it works.** A frame that is never still says "this is playing" and keeps attention. A move under 0.2% W/f is below the threshold at which it competes with reading.
- **Prompt line.** "Very slow constant push-in from 100% to 110% framing over the full 2 s, linear speed, no acceleration, horizon locked."
- **References win.** [E] infers a push of 1.00 → 1.05-1.08 per shot [E §3]. The measured references breathe harder, at 7-29% per hold. Use +8-12% as the default (+3-8% in calm/minimal styles, above) and up to 29% only after a punch, when it carries the punch's momentum [V:1-6l8S t=71.10-72.27s].

### CM-03 Punch-in into a cut (accelerating push) [U]

- **Definition.** In the last frames before a major cut, the subject scales up on an expo-in curve, so the cut lands at peak velocity.
- **Use.** Into a hero reveal, a beat drop, a scene-world change, or a logo.
- **Numbers.**

| Reference | Measured |
|---|---|
| kivi wordmark | +18% in the last 3 f; per-frame growth 7 → 10 → 17 → 24 px, roughly doubling; then 1 pure-white frame [V:1-6l8S t=7.83-7.97s] |
| kivi Gmail icon | +33% in 3 f, then a hard cut exactly on an audio onset (Δ0.0 f) [V:1-6l8S t=18.23-18.37s] |
| kivi tagline | +18% over 8 f, cut on the beat (Δ1.5 f). The next shot keeps a decelerating +29% push over 1.17 s, so the momentum carries through the cut [V:1-6l8S t=70.83-72.27s] |
| HubSpot logo | +10.6% over ≈1.7 s, ease-in (increments growing from +1 to +7 px per 200 ms), a 100 ms audio gap, then a hard cut on the beat drop [V:1CSXtQ t=11.3-13.03s] |
| Wix | A 3 f accelerating ≈1.5× zoom into a cut-in [V:15VhHR t=16.53-16.63s] |
| NOSTRA | A ≈2× push in 6 f into the creature's glowing head, then a shape-match cut [V:1i2L14 t=2.43-2.63s] |

- **Budget.** kivi uses it 4 times in 78 s (one per ≈19.5 s, computed) [V:1-6l8S t=7.83, 18.23, 33.4, 70.85s]. Use it at most once per 15-20 s, and only on structural cuts.
- **Focal feel.** Orthographic. This is a digital scale, not a dolly, so there is no perspective change.
- **Into the next shot.**
  - Cut on an audio onset (±1 f), or into one white frame [V:1-6l8S t=7.967s].
  - The incoming shot either keeps decelerating in the same direction or starts with something that fills the frame. kivi's echo rings fill the frame within 4 f, ≈3 f before the drop hit [V:1-6l8S t=8.00-8.28s].
- **Mistakes.**
  - A linear zoom into the cut. It never builds pressure.
  - Punching on a cut that has no audio event.
  - Punching on every cut. The device stops meaning "big moment" [inferred].
  - Overshoot after the cut.
- **Why it works.** Exponential acceleration builds anticipation, like a held breath. Cutting at peak speed transfers the energy to the next image, so the cut feels like an impact rather than a change of slide.
- **Prompt line (compositing).** "Last 3 frames before the cut: scale the subject 100% → 104% → 110% → 118%, expo-in; cut on the downbeat; next shot opens with a 1-frame white flash."

### CM-04 Hero dolly-in through a foreground layer [S / X]

- **Definition.** A true 3D forward move. Foreground elements pass the lens, grow and go out of focus while the subject stays sharp.
- **Use.** Once per film, on the hero beat that explains the core idea.
- **Numbers.**
  - **HubSpot.** A dolly-in of ×2.3 in ≈15 f, ease-out. Foreground particles grow from 12 to 30-40 px at 720p and go to bokeh as they leave frame left, which gives real parallax. A lateral settle follows (ease-out over ≈11 f), then an accelerating tilt-scroll down the answer table, 8 → 24 px/f at 720p, into a blur dissolve [V:1CSXtQ t=19.95-21.47s].
  - **Bumper push-through.** 9 f. The foreground tables blur and drop back while the two extracted "Amount" columns stay sharp and rotate face-on [V:19NRDv t=18.25-18.55s].
  - **Lottieicon tour opening.** A 2.27× zoom-in over 32 f (14 f ease-in, then 18 f expo-out) onto a highlighted tile [V:1ccYWJ t=27.40-28.47s].
  - **Wix.** A push-in to ≈130% over 0.5 s, into an action (the object eraser) [V:15VhHR t=28.0-28.5s].
- **Focal feel.** Moderate telephoto. On HubSpot's yawed window, the left edge is 272 px tall and the right edge 260 px, a ≈4.6% difference at an inferred ≈10° yaw [V:1CSXtQ t=20.25s]. Shallow DOF on near elements.
- **Into the next shot.** Settle laterally, then accelerate a tilt or scroll into a defocus dissolve (HubSpot T9 → T10).
- **Mistakes.**
  - Dollying through a low-resolution or placeholder ("greeked") texture. Viewers scrutinise the hero beat most, and HubSpot's app window shows exactly this flaw [V:1CSXtQ t=18.4-19.0s].
  - Planes that intersect during the move [V:1CSXtQ t=18.4-19.0s].
  - Foreground particles that do not come from the scene. HubSpot's particles are made from the UI's own colours, which "keeps the abstraction honest" [V:1CSXtQ t=19.00-19.95s].
- **Why it works.** Foreground parallax is the brain's strongest monocular depth cue. Because it appears only once, it marks the beat as the important one.
- **Prompt line.** "Single smooth dolly-in, 2.3× magnification over 0.5 s, decelerating to a stop; foreground particles pass close to the lens and blur into soft bokeh; focus locked on the chat panel; moderate telephoto look (85-100 mm equivalent [inferred]); no roll."

### CM-05 Pull-back reveal [U, strongest consensus]

- **Definition.** The frame opens from a detail to its context by scaling down (2D) or dollying back (3D).
- **Use.** "Detail first, context second." Seven of the eight references do this, which makes it the most common reveal grammar in the set:
  - text that turns out to live in a UI;
  - an icon that turns out to be a phone;
  - one grocery item that turns out to be a whole catalogue;
  - one chart that turns out to be a dashboard.
- **Variants and numbers.**

| Variant | Measured | Evidence |
|---|---|---|
| **2D context reveal** | ×1.00 → ×0.75 over 8.0-9.03 s (main move 21 f; 31 f with ramps), cubic ease-in-out with peak velocity at 50-55% (≈1.2% W/f, computed). The bar card goes from overflowing the left edge to 77% W | [V:1CSXtQ t=8.0-9.03s] |
| **Two-step pull-back** | ×1.0 → ×0.79 in 6 f (2 f ease-in, peak at f3, 88% done by f6), a slow 0.05%/f drift for ≈1 s, then a second 6 f step from ×0.75 to ×0.63 | [V:1i2L14 t=4.10-5.50s] |
| **ECU → system** | 4.1× over 1.0 s in two stages. Stage 1 is expo-out (40% of the change on the first pose, ≈90% within 8 f). Then a near-hold of ≈0.25 s. Stage 2 is ease-in-out over ≈13 f | [V:126cpH t=5.20-6.20s] |
| **Icon → device** | 3.0× → 1.0× in 24 f, expo-out. The first frame removes ≈1/3 of the change | [V:1Hcg3X t=14.30-15.30s] |
| **Macro → dashboard snap** | A 2-3 f pull-back snap with blur, then a slow yaw recede | [V:19NRDv t=28.77-29.95s] |
| **Card → small card** | Width 90% → 48% in ≈7 f, easing to 43% by 13.33 s | [V:1i2L14 t=12.87-13.33s] |
| **Lens-distortion zoom-out** | See CM-19 | [V:1ccYWJ t=7.30-8.0s] |
| **Screen-to-world** | See CM-16 | [V:1CSXtQ t=18.00-19.03s] |
| **Pull-out cut** (instant) | The page lands as a window at ≈85% scale, a card ≈55% W in a wall of sites, or an editor column ≈44% W (sizes of the revealed page, not zoom factors) | [V:15VhHR t=19.73, 32.83, 38.20s] |

- **Focal feel.** Orthographic in 2D. In 3D the background environment fades in during the move (HubSpot: 6 f).
- **Into the next shot.**
  - Hold and breathe.
  - Add a second, smaller step about 1 s later (NOSTRA).
  - Or end with an ease-in pull-back that hands scale to the next shot. Lottieicon pulls back −38% over 11 f, then the next title enters at ≈2.1× scale and 25% opacity and decelerates to 1× over ≈18 f [V:1ccYWJ t=32.80-33.50s].
- **Mistakes.**
  - Revealing a context that has nothing new in it.
  - A pull-back that ends with the subject smaller than ≈40% W. It loses the read [inferred].
  - Linear pull-backs. Every measured one eases.
- **Why it works.** The viewer reads the detail while it is big and legible. The pull-back then answers "where is this?" without a cut. HubSpot's headline is read as text first, so when the UI arrives it is context, not clutter [V:1CSXtQ].
- **Prompt line (2D).** "Hold the typed headline at full size for 0.6 s, then pull back from 100% to 75% over 0.7 s with ease-in-out (fastest at the midpoint), revealing that the text sits inside a prompt bar."

### CM-06 Truck / lateral follow [U]

- **Definition.** A horizontal camera translation, parallel to the image plane.
- **Use.** Follow a typing caret; travel along rows or a strip; move from one UI target to another.
- **Numbers.**
  - **kivi.** The only "real" camera move in 78 s. After a 2× cut-in and a 2-3 f hold, the camera trucks ≈40% W in ≈0.85 s (ATTACK: fast middle, long ease-out tail) while pushing ≈20%. Peak ≈4% W/f (computed). No motion blur [V:1-6l8S t=35.47-36.4s].
  - **HubSpot caret lock.** The caret is held at x ≈ 65-66% W, so the line scrolls left as characters arrive [V:1CSXtQ t=4.5-7.2s].
  - **HubSpot macro follow.** One long ease-in-out truck of ≈545 px at 1280 w (≈43% W) over ≈3.7 s, peaking at 1.2-1.8% W/f (computed). The caret is *not* locked: it drifts from 19% to 75% W, so the newest characters always stay in frame [V:1CSXtQ t=13.6-17.3s].
  - **Wix caret follow.** An ease-in follow accelerating from ≈0.5 to 1.6% W/f (computed) that keeps the caret in the right third. Typing slows to 7-8 chars/s at this ECU scale [V:15VhHR t=6.57-8.6s].
  - **Bumper.** A dolly along steep diagonal transaction rows (linear, with motion blur along the travel and DOF on near and far rows) for 1.2 s, then an angle-change cut to face-on [V:19NRDv t=21.50-22.70s].
- **Focal feel.** Orthographic for 2D UI. For 3D rows, telephoto with shallow DOF.
- **Into the next shot.** A UI action (hover, click) or a cut. kivi's truck lands on a hover lift; the click then blooms into white [V:1-6l8S t=36.45-37.15s].
- **Mistakes.**
  - A hard-locked caret on short lines. It makes the text jitter [inferred].
  - Trucking faster than the content can be read.
  - Changing on-screen copy across the cut-in that precedes a truck: "make" in the wide shot, "create" in the ECU [V:15VhHR t=6.57s].
- **Why it works.** The eye stays on the newest information without a saccade, so the camera does the reading work for the viewer.
- **Prompt line (compositing).** "Track the caret: keep it between 60% and 70% of frame width; camera follows with ease-in, peak 1.5% of frame width per frame; no vertical drift."

### CM-07 Pan / whip pan [U]

- **Definition.** A fast horizontal reframe that accelerates into a cut. In 2D, a pan and a truck look the same, so this library treats any fast horizontal reframe as a whip.
- **Class.** [U], the same class as TR-08: as a hand-off between shots the whip is the same move as the transition, and 6 of 8 references use it [V:1i2L14] [V:1Hcg3X] [V:15VhHR] [V:19NRDv] [V:1-6l8S] [V:1ccYWJ]. How *often* to use it is style-specific: calm and minimal styles keep it to exits only [inferred].
- **Use.** Energetic hand-offs between scenes, and exits.
- **Slow, motivated pan.** When the reframe must be watched rather than hidden (following a row, revealing a strip), pan slowly: **≤0.2% W/f while text is being read, otherwise 1-4% W/f with E-GLIDE**. These are the measured lateral camera speeds of CM-06 (HubSpot 1.2-1.8% W/f, Wix 0.5-1.6% W/f, kivi peak ≈4% W/f) [V:1CSXtQ t=13.6-17.3s] [V:15VhHR t=6.57-8.6s] [V:1-6l8S t=35.47-36.4s]; for a pure translation use CM-06.
- **Numbers.**

| Reference | Measured |
|---|---|
| NOSTRA | 8-9 f expo-in. Speed grows ≈1.3-3× per frame (Δ 4, 5, 7, 15, 22, 45, 136 px/f, then ≈204 px/f as it leaves). ≈13% W/f on the last on-screen frame and ≈20% as it exits. Blur on the last 2 f only. Cued by the cursor turning from ↖ to → over ≈11 f. The cut hides behind the exiting card, and the next line keeps drifting right with a decelerating ease (Δ 21, 10, 6, 4 px/f) [V:1i2L14 t=5.5-6.33s] |
| Solar | Exits over 6-11 f, ×1.35-1.9 per frame, peaking at 15-20% of the frame per frame. The house exits at 19% W/f. The cut lands on the first frame after the subject has gone, often after 1 empty frame [V:1Hcg3X t=5.30-6.83s] |
| Wix carousel | Decelerate ≈14 f, dwell ≈6 f, accelerate ≈13 f to a whip peak, then an ≈16 f ease-out landing. Native motion blur on the whip frames. The music re-enters as the acceleration starts [V:15VhHR t=14.13-15.87s] |
| Bumper | Whip-smear exits of 2-7 f with motion blur [V:19NRDv t=8.55s, 47.83s] |
| kivi | A text whip-left exit of 4-6 f, ease-in, no blur [V:1-6l8S t=38.70-38.85s] |

- **Focal feel.** Any. At these speeds, blur matters more than lens.
- **Into the next shot.** The incoming shot must open moving in the same screen direction and decelerating. This is a velocity hand-off.
- **Mistakes.**
  - **Unblurred whips above ≈10% W/f.** Lottieicon's tour hops peak at 22-27% W/f with no blur and strobe on playback [V:1ccYWJ t=30.57-32.57s].
  - Whips with no cue, or an incoming shot that moves against the whip's direction.
  - A whoosh on every whip. Wix uses none and leans on the music arrangement instead [V:15VhHR].
- **Why it works.** Expo-in reads as intent: something pulls the frame away. Hiding the cut inside the fastest frames makes two shots feel like one move.
- **Prompt line (compositing).** "Whip right: 8 frames, each frame's displacement 1.5-2× the previous, last two frames at 13-20% of frame width per frame with 180° motion blur; cut on the fastest frame; next shot opens drifting right and decelerating."

### CM-08 Tilt / pedestal (vertical travel) [U]

- **Definition.** A vertical reframe. In 2D it is a scroll of the world. With a perspective change it becomes a tilt.
- **Use.**
  - Progression ("down the chain", "next step").
  - A change of world: Chowdeck tilts from the "sun world" above to the "brand world" below.
  - Scrolling a page or a table.
- **Numbers.**
  - **Chowdeck.** A tilt/pedestal down through a cloud band of ≈1.6 frame heights in 30 f [estimate]. S-curve: slow at first (≈10% of the travel in 10 f), then a fast peak of ≈11% H/f, then deceleration, plus a 10 f settle. The cloud band works as a wipe. The wordmark fades from 30% to 100% over the last 8 f while riding up from 65% to 42% H [V:126cpH t=15.20-16.53s].
  - **Chowdeck vertical push.** 1 frame height in ≈11 f, expo-in-out, peak ≈4.2 frame heights/s, directional blur of ≈10% H on both layers [V:126cpH t=2.53-2.90s].
  - **Solar.** A continuous crane-down / scroll-up at 0.3-0.5% H/f that ends in a 6-8 f expo-in whip tilt reaching 20% H/f. The next shot continues upward [V:1Hcg3X t=0.00-3.43s].
  - **HubSpot.** A tilt-scroll down the generated table, accelerating 8 → 24 px/f at 720p (≈1.1 → 3.3% H/f, computed), into the transition [V:1CSXtQ t=20.40-21.47s].
  - **Wix page scroll.** ≈1 FH in 12 f, ease-out, with vertical motion blur on frames 2-4 [V:15VhHR t=34.47s].
  - **Bumper and Lottieicon.** Bumper whip-tilts in ≈3 f with vertical blur to reframe [V:19NRDv t=23.80-23.88s]. Lottieicon whips the block up in 3-4 f [V:1ccYWJ t=25.33-25.47s].
- **Screen-direction grammar.**
  - Solar: vertical = progression, horizontal = context [V:1Hcg3X].
  - Chowdeck: bottom-to-top = forward [V:126cpH].
  - HubSpot: "send" moves up [V:1CSXtQ t=17.8s].
  - Pick one grammar per film and keep it (Part 02 CO-U24).
- **Mistakes.**
  - Mixing up and down progressions in one sequence.
  - A scroll with no blur at ≥1 FH in 12 f, which judders [inferred].
  - Tilting past text that has not yet been read.
- **Why it works.** Vertical travel matches the scroll habit of phone viewers. A layer crossing the frame (clouds, a horizon, a UI edge) gives the move physical logic.
- **Prompt line.** "Smooth pedestal down through a band of soft white clouds, 1.6 frame heights over 1 s, slow start, fastest in the middle, gentle stop; logo rises into the frame centre during the last 0.25 s."

### CM-09 Crane (arcing, with a perspective change) [X]

- **Definition.** A rise or fall combined with a change of camera angle. For example, start level and rise to look down on a grid.
- **Evidence.** No true 3D crane appears in the references.
  - The nearest is NOSTRA's 6 f tilt onto a floor plane (0° → ≈45-55° [inferred]). The hero tile then glows while far rows fade into fog over ≈26 f [V:1i2L14 t=19.23-20.30s].
  - Lottieicon's dome rises from 88% to 58% H in 22 f (expo-out), reading as a low "planet horizon" angle. That move belongs to the object, not the camera [V:1ccYWJ t=21.13-21.87s].
  - Veo lists "crane up" as a promptable move [P].
- **Recipe [inferred].** 1.5-2.5 s, GLIDE, rising 10-20% H while tilting down 20-40°. Use it only to establish a world (a grid of customers, a map, an isometric system). TradeLens' isometric "noise grid with a slow camera drift" is a text-only analogue [S:TradeLens, inferred in source].
- **Mistakes.** Cranes over UI. UI is a screen, and a crane over a screen exposes its flatness [inferred].

### CM-10 Stepped orbit [S]

- **Definition.** The camera circles a pivot in discrete eased steps, each bringing the next element to the front.
- **Use.** Several features around one hub: badges around a hero photo, payment methods around a logo.
- **Numbers.**
  - **Bumper.** Orbit steps at 30.9, 32.2 and 33.4 s, each 9-12 f and motion-blurred, ≈1.25 s apart (= 2 beats at 100 BPM). After each step the front badge turns from grey to colour and a status pill slides in. The badges sit in front of and behind the photo, with DOF and ring-vs-photo parallax [V:19NRDv t=29.97-35.93s].
  - **Bumper chip ring.** Chips fly in on curved arcs over 22 f and settle into a ring that rotates clockwise slowly. Near chips are soft and ring-plane chips are sharp [V:19NRDv t=4.97-6.9s].
  - **NOSTRA.** The camera sits inside a ring of ≈8-10 copy cards and orbits for ≈1.5 s. It is deliberately oppressive ("too much text"), then settles frontal [V:1i2L14 t=10.9-12.4s].
- **Focal feel.** Normal to telephoto, with DOF on the ring.
- **Into the next shot.** A hard cut after the last step's hold.
- **Mistakes.**
  - A continuous slow drift-orbit over a diagram. Bumper's 6.3 s network shot has state beats every 0.8-1.4 s but only drift between them; it drops to motion mean 1.82 and loses energy mid-film [V:19NRDv t=39.87-46.13s].
  - A continuous 360° turntable on UI [inferred; no reference does it].
  - Clipping text with the frame edge during the orbit. Bumper's caption is cut by the top edge for 5 s [V:19NRDv t=30.9-35.9s].
- **Why it works.** One pivot plus three steps gives three feature beats with zero cuts, and that continuity says "one platform handles all of these" [V:19NRDv].
- **Prompt line.** "Camera orbits the central photo in three separate eased steps of 0.35 s each, one step every 1.25 s, holding between steps; badges in front are slightly out of focus, the active badge is sharp."

### CM-11 Parallax (multi-plane) [U]

- **Definition.** Layers at different depths move at different speeds during one camera move.
- **Numbers.**
  - **Solar.** The foreground moves 1.3-2× the speed of the background. The roof enters 4 f after the sun and travels faster; the sun moves against the panel rows; the colour floors scroll at different rates [V:1Hcg3X t=1.53-3.17s, 30.63-31.0s].
  - **Bumper.** Parallax between the tooltip bubble and the chart plane, and between the badge ring and the photo [V:19NRDv t=13.13s, 29.97s].
  - **HubSpot.** The particle cloud moves against the chat pane during the dolly [V:1CSXtQ t=19.95-20.47s].
  - **Deliberately none.** kivi's painted plates have no measurable parallax; depth comes only from blur and layering [V:1-6l8S]. Chowdeck's tiles and camera move as one plane [V:126cpH].
  - **Text sources.** [E] infers "parallax only between a UI card and the background". [W:raivcoo] lists "2.5D Parallax Transition" and "Layered Object Drop with Lateral Camera Move" as named techniques (titles only).
- **Rule.**
  - Use 2-3 planes. The foreground moves at 1.3-2× the focal plane, and the background at ≈0.5-0.75× [background ratio inferred].
  - A UI component is one rigid plane. Never parallax its internal elements against each other [inferred, from the believable-UI rule in Master §8 (UI animation)].
- **Mistakes.**
  - Parallax on a static shot (it needs a camera move to exist).
  - Opposite-direction layers.
  - Background layers moving faster than the foreground.
- **Why it works.** Parallax is how the eye measures distance in motion. It turns flat illustration into space at almost no cost.

### CM-12 Roll [A]

- **Evidence.** No reference rolls the camera.
  - Bumper: "There is no camera roll." Wix: "no roll". Solar: "no rotation roll". Lottieicon: "no roll". kivi: no roll.
  - HubSpot shows only ≈1° of incidental roll drift during its dolly [V:1CSXtQ t=20.25s].
- **What looks like roll is object rotation that settles to upright.**
  - Chowdeck's map arrives tilted 10-15° CCW and eases upright over ≈1.1 s [V:126cpH t=11.4-12.5s].
  - Its order card is tossed in at +15°, overshoots to −4° and settles in 16-22 f [V:126cpH t=9.27-10.0s].
  - Wix's card flattens from ≈15° to 0° in 7 f [V:15VhHR t=33.33s].
- **Rule.** Camera roll is 0°. Rotation belongs to objects, stays at ≤15° and settles to 0° before anything is read.
- **Why.** A rolled horizon reads as instability or a "Dutch angle" of unease. That is the opposite of a product promising control [inferred].

### CM-13 Macro / cut-in [U]

- **Definition.** An instant change to a much closer framing of the same subject. The subject overflows at least one frame edge.
- **Numbers.**

| Reference | Magnification | Duration | Notes |
|---|---|---|---|
| HubSpot | Type ≈1.65× the pulled-back scale (1.25× the pre-pull-back scale); the bar runs off the right edge | 4.77 s | Lands on the beat drop. "A lens feel without blur" [V:1CSXtQ t=13.03-17.80s] |
| Wix | ≈3.4× (glyph widths 15 → 51 px) | 2.06 s | Typing slows from ≈19 to 7-8 chars/s at this scale [V:15VhHR t=6.57-8.63s] |
| Bumper | ≈2.5× punch-in onto the tooltip | 1.20 s | A second beat delivering the "why" [V:19NRDv t=13.13-14.33s] |
| Bumper | Tilted dashboard macro with shallow DOF | 2.4 s | Then a 2-3 f pull-back snap to the full dashboard [V:19NRDv t=27.57-29.97s] |
| kivi | ≈2× onto the app icons | 1.68 s | Then a truck [V:1-6l8S t=35.47s] |
| NOSTRA | A smash-in to a macro of bold text plus 3 f of defocus | — | The camera is "inside the page" [V:1i2L14 t=10.633-10.73s] |

- **Rules.**
  - Use 1.65-3.5×.
  - Crop decisively: put ≥30% of the component off-frame so the crop reads as intentional [V:1ccYWJ rule].
  - Slow any content animation inside a macro (typing at 7-8 chars/s instead of 19).
  - Keep every string identical across the cut.
- **Into the next shot.** A 2-3 f pull-back snap (Bumper) or a pull-out cut (Wix).
- **Why it works.** A macro makes a flat UI feel like a lens close-up, and it makes one value or word the subject. Wix's rule: "use ≈3-3.5× scale cut-ins for detail instead of zoom animations" [V:15VhHR rule 13].
- **Prompt line.** "Extreme close-up of the input field, text fills 60% of frame height, field edges run off both sides of the frame, everything crisp, no blur."

### CM-14 Overhead / top-down [S]

- **Evidence.**
  - Chowdeck's map is a top-down plane. It arrives tilted 10-15° CCW, eases upright over ≈1.1 s, then pans up ≈8% H over 1 s with ≤2% scale change ("tracking-app drift"). A route draws leg by leg over ≈1.7 s [V:126cpH t=11.07-13.60s].
  - Wix's generated site opens on a top-down basketball-court photo [V:15VhHR t=12.47s].
  - Solar views the wafer and the panel field slightly top-down [V:1Hcg3X].
  - NOSTRA's floor grid is a tilted overhead plane with distance fog [V:1i2L14 t=19.23s].
- **Use.** Maps and routes, boards and grids ("the market of identical options"), dashboards laid flat as objects.
- **Numbers.** A linear pan of ≈8% H/s, measured on Chowdeck's map [V:126cpH t=12.5-13.5s]; the 5% lower bound is [inferred]. Optionally, enter rotated ≤15° and ease upright over ≈1 s (Chowdeck: 10-15° to upright over ≈1.1 s).
- **Mistakes.** Text on an overhead plane at an oblique angle. Tilt to ≤15° before text must be read.
- **Prompt line.** "Straight top-down view of a light-grey map, camera slowly drifts upward 8% of frame height per second, no rotation after the first second."

### CM-15 Fly-through / zoom-through / portal [S / X]

- **Definition.** The camera travels *into* an object or through a layer until the next scene is revealed inside it.
- **Numbers.**
  - **Lottieicon bell zoom-through** [V:1ccYWJ t=0.87-1.27s].
    - 3 f of ease-in, then a constant ×1.36 per frame for ≈8 f (bell height 79 → 549 px at 640p over 8 f; ≈20× over ≈10 f).
    - The bell fills the frame height at f34 and the width by f36. Its thick strokes sweep off as split white bars over 2-3 f, and the next word is already inside the hollow.
    - A sub boom peaks on the fill frames (−6.2 dB, the loudest moment of the first 27 s). No motion blur.
  - **NOSTRA cloud fly-through.** "IMAGINE" goes from ≈2.5-3× (cropped) to ≈1.05× in 8 f, expo-out, while clouds stream outward past the lens; the push-in reading is the teardown's inference. It exits with a 4 f blur-dissolve [V:1i2L14 t=0.00-0.77s].
  - **NOSTRA hex iris** (a portal). 7 f, roughly linear (white area 40 → 97%) [V:1i2L14 t=24.25-24.48s].
  - **HubSpot.** The dolly through particles (CM-04).
  - **Text-only.** Bolt's film is praised for "fluid camera movements" [S:Bolt, sourced quote]. The fly-through and wide-angle details are the source's own inference. [W:raivcoo] lists "3d car portal to another world" (title only).
- **Why exponential.** A constant per-frame ratio looks like constant forward speed, because the eye perceives scale on a log scale [V:1ccYWJ analysis]. A linear zoom looks like it is slowing down.
- **Into the next shot.** The next scene is already composited inside the object's hollow or behind the iris. There is no separate cut.
- **Mistakes.**
  - A zoom-through without a structure to fly *through* (a hollow, a ring, a window). It reads as a plain zoom.
  - Zooming into raster art. It pixelates at 20× [inferred].
  - Using it more than twice per film.
- **Prompt line (compositing).** "Hold the icon centred; frames 1-3 ease-in to ×1.1; then scale ×1.36 every frame for 8 frames until the icon's hollow fills the frame; next scene already visible inside the hollow; sub hit on the frame it fills."

### CM-16 Screen-to-world [SaaS]

- **Definition.** A flat UI turns out to be a plane in a 3D space. The camera pulls back to reveal the world around the screen.
- **Use.** Integrations, data moving between systems, "where your message goes". This is the cleanest way to explain a connector or an API.
- **Numbers (HubSpot)** [V:1CSXtQ t=17.80-19.03s]:

| Frames | What happens |
|---|---|
| 17.60-17.77 | The prompt content moves up at 3, 3, 5, 7 px/f (ease-in) |
| 17.80 | Cut. The sent bubble continues up at 34, 34, 31, 7, 4 px/f (ease-out): a velocity hand-off |
| 18.00-18.33 | Bubble text 604 → 346 px: **×0.57 in 10 f**, ease-in, moving up-right |
| 18.17-18.37 | The blue-grey environment and the second app window fade in (**6 f**) |
| 18.33-19.03 | A further **×0.56** while decelerating (≈20 f). Total **×0.32 in ≈1 s** |
| 19.00-19.95 | Near-static (≤3 px/f drift) while the event plays: the window disintegrates into particles |

  Environment: a soft, diffuse blue-grey radial set, #C8D4DF on the left (darker) to #F4F5F8 on the right, with a gentle vignette.
- **Other variants.**
  - **Wix.** A pull-out cut turns the website into a rounded window (~85% scale) floating over the same beach photo, extended full-bleed, with a soft drop shadow and in-focus foreground grass [V:15VhHR t=19.73s].
  - **NOSTRA.** A 6 f tilt onto a floor plane turns a label into one tile of a fogged grid [V:1i2L14 t=19.23-19.43s].
  - **Bumper.** Tables enter as tilted 3D planes (≈35° Y / 20° X [inferred]) in 12 f with expo-out, then slowly flatten [V:19NRDv t=16.77-17.17s].
- **Focal feel.** Moderate telephoto (edge-height ratio ≤1.05 on a yawed plane, computed from 272/260 px). Real DOF.
- **Mistakes.**
  - Planes intersecting: HubSpot's window pokes through the chat pane's glass edge, and the seam slides from x ≈230 to ≈485 px [V:1CSXtQ t=18.4-19.0s].
  - Low-resolution or greeked textures on the revealed plane [V:1CSXtQ].
  - A world photo whose horizon or light does not match the page photo [V:15VhHR t=19.73s, inferred at low resolution].
- **Why it works.** It answers a spatial question ("where did my message go?") with a single camera gesture. The viewer keeps tracking one object, so the jump from 2D to 3D never disorients.
- **Prompt line.** "Start on a flat chat interface filling the frame; pull back to 57% in 0.33 s, then keep pulling back, decelerating, to 32% total by 1 s; a soft blue-grey studio (#C8D4DF to #F4F5F8) fades in around the interface panel during the first 0.2 s; telephoto feel, subtle depth of field; no roll."

### CM-17 Travelling through UI [SaaS]

Four sub-moves cover "navigate the product" without a screen recording.

**(a) Scroll as camera.**
- Wix: a page scroll of ≈1 FH in 12 f, ease-out, with motion blur on frames 2-4 [V:15VhHR t=34.47s]. A section scroll-up of 5-8 f [V:15VhHR t=21.35s].
- HubSpot: an accelerating scroll down the answer table [V:1CSXtQ t=20.40-21.47s].
- Lottieicon: a constant crane-up scroll through a 3D card column [V:1ccYWJ t=16.10-18.83s].

**(b) Push-through extraction** [V:19NRDv t=16.77-20.50s]. Context → extraction → focus:
- the tables fly in (12 f, expo-out);
- the relevant "Amount" columns extrude forward (≈0.6 s);
- the camera pushes through (9 f) while the tables blur and fall away;
- labels drop on (5 f);
- a mint fill wipes left to right (4 f) to mean "matched".

**(c) Hop-and-hold tour** [V:1ccYWJ t=27.13-33.20s]:

| Phase | Frames | Measured |
|---|---|---|
| Lens settle | ≈7 f | Bulge relaxes |
| Move 1 | 32 f | Zoom-in 2.27× plus pan, S-curve. Sub hit at peak velocity (−2.6 dB, loudest in the film) |
| Hold | ≈8 f | The refresh icon loops in its green tile |
| Move 2 | ≈32 f | Peak ≈10% W/f |
| Hold | ≈20 f | — |
| Move 3 | ≈22 f | Peak ≈27% W/f (unblurred: strobes) |
| Hold | ≈20 f | — |
| Move 4 | ≈17 f | Peak ≈22% W/f |
| Hold | ≈7 f | — |
| Pull-back | 11 f | −38%, ease-in, into a scale-matched cut |

  The moves shorten and the holds vary, so the tour accelerates toward the exit. **Fix the flaw:** cap peaks at 8-10% W/f, or add 180° blur above 5% W/f.

**(d) Carousel bridge (decel → dwell → accel)** [V:15VhHR t=14.13-16.63s, 48.27-49.63s]:
- Carousel: decelerate ≈14 f, dwell ≈6 f, accelerate ≈13 f to a whip peak, land on the next card with an ≈16 f ease-out, hold ≈0.65 s, then a 3 f ≈1.5× accelerating zoom into the cut-in.
- Deck: fan ≈11 f, cruise ≈7 f, then accelerate ≈21 f and cut at peak velocity.

- **Use.** (a) for long pages; (b) for data and tables; (c) for libraries, galleries and dashboards ("find the one"); (d) for showing many outputs.
- **Why it works.** Each sub-move is a natural UI verb (scroll, open, select, browse), so the camera seems to be *using* the product.

### CM-18 Rack focus (focus as camera) [U]

- **Numbers.**
  - **Chowdeck matte reveal.** The background resolves from a heavy blur (radius ≈8-10% of frame width) to sharp over 8 f (ease-out) while the subject is held as a flat yellow matte. The matte then drops in 1 f [V:126cpH t=1.60-1.87s].
  - **Chowdeck morph rack.** As the order card collapses into a notification, a defocused field racks to the map over 11-12 f (readable ≈5 f after the morph lands) [V:126cpH t=11.07-11.43s].
  - **HubSpot defocus dissolve.** The table's blur radius grows over ≈4 f while it fades; the new text cuts in crisp. 8 f in total [V:1CSXtQ t=21.47-21.73s].
  - **Bumper.** Text defocuses for 1-2 f before cuts. A DOF rack runs over 9 f as the tables drop out. Per-letter blur-in takes 3-4 f [V:19NRDv].
  - **Lottieicon.** CTA bubbles enter large and defocused and sharpen as they settle (≈1.3 s) [V:1ccYWJ t=39.2-40.5s].
  - **kivi.** A blur-to-sharp resolve of translated text over ≈20 f. Background defocus increases while a B&W plate blooms into colour over 22 f [V:1-6l8S t=49.25-49.90s, 18.57-19.33s].
  - **Text-only.** Veo accepts "rack focus" as a named move [P].
- **Use.** Shift attention from one plane to another; hide a background swap during a morph; begin a scene with the eye already on the subject.
- **Mistakes.**
  - Racking focus on text the viewer is reading.
  - A rack slower than ≈12 f with nothing else happening.
  - Gaussian blur on a flat layer with no plane logic. It reads as "blurry", not "deep" (DP-08).
- **Why it works.** Focus is the camera's own pointer. It moves attention without moving the frame.
- **Prompt line.** "Background starts very soft (large blur), focus pulls to the background map over 0.3 s while the notification in front stays sharp."

### CM-19 Lens-distortion zoom-out [X]

- **Numbers.** Lottieicon cuts into a barrel-distorted close view of the icon grid (≈6 columns visible, edge icons smeared into arcs). The bulge relaxes in ≈6 f while the grid zooms out to 13 columns (≈2.2×, computed) over ≈20 f, expo-out [V:1ccYWJ t=7.30-8.0s, 27.13s].
- **Text-only.** Bolt's brief asked for "wide-angle lenses". The Superside breakdown suggests faking this by scaling an illustrated scene 1.0 → 1.6 over 0.8-1.2 s with an expo ease-in plus a radial or perspective skew; that recipe is its own inference [S:Bolt].
- **Use.** Opening a dense field (an asset wall, a grid of templates) in Fast Startup styles only.
- **Avoid.** In Minimal Premium films, the distortion bends straight UI lines and reads as a glitch [inferred].

### CM-20 Edit-camera: cut-in, pull-out cut, angle-change cut, continuity reframe [U / SaaS]

- **Definition.** The scale or angle changes through the edit, not through an animated move.
- **Numbers.**
  - **Wix.** Cut-ins of ≈3.4× and pull-out cuts that land the page at ≈85% scale, ≈55% W or ≈44% W. Its rule: "reserve animated pushes for 1-2 moments" [V:15VhHR rule 13].
  - **Bumper.** A 2.5× punch-in cut [V:19NRDv t=13.13s] and an angle-change cut from steep perspective to face-on [V:19NRDv t=22.70s].
  - **kivi.** A continuity reframe on the same plate (moved right and closer) separates "prompt" from "result" [V:1-6l8S t=22.87s, 67.70s]. A 2× cut-in follows [V:1-6l8S t=35.47s].
  - **Wix jump-reframes on macro type.** 264 px (23% W), then ≈824 px (72% W), on the word rhythm, so the newest word is always in frame [V:15VhHR t=0.233s, 0.467s].
  - **Text-only.** [W:motion-so]: "No camera-move vocabulary appears (no dolly or macro). Reveals and framing stand in for camera."
- **Why it works.** Cuts are free and perfectly crisp. An animated zoom of a UI spends 0.5 s on motion the viewer does not need, and it softens the text while it moves [inferred].
- **Rule.** For UI detail, prefer cut-ins (2-3.5×) and pull-out cuts. Animate only when the move itself carries meaning (a reveal, a follow, a hand-off).

## 6.2b Coverage matrix: when, how fast, focal feel, exit, premium vs amateur

This table closes the gaps in the shorter cards (CM-09, CM-11, CM-14, CM-16 to CM-20) and gives every move a premium-vs-amateur test. Numbers repeat the measured values above; anything not measured is tagged.

| ID | When (motive) | How fast / how long | Focal feel | Into the next shot | Premium signal | Amateur signal |
|---|---|---|---|---|---|---|
| CM-01 Locked-off | End lockup (still ≥1.5 s, 2.2 s premium); mid-film reading hold ≤1 s | 0; measured lockups 0.8-2.2 s, of which 0.8 s and 1.4 s are flagged short [V:1CSXtQ] [V:15VhHR] [V:126cpH] [V:1i2L14] | Orthographic | End, or hard cut with polarity flip [V:1i2L14] | Still only after everything before it moved | Frozen mid-film frame >1 s; static first 0.7 s [V:126cpH t=0.00-0.73s] |
| CM-02 Breathe | Every other hold (BREATHE) | Default +8-12% scale (calm/minimal +3-8%; measured 7-29%) or 0.03-0.2% W/f over 0.5-2.5 s, linear [V:1-6l8S] [V:1i2L14] | Orthographic | Runs through the cut or turns INTO-CUT in the last 6-10 f [V:1CSXtQ] | One axis, one direction, cut hides start/end | Ease-in-out breath with visible stop; 3-axis float [inferred] |
| CM-03 Punch | Structural cut on an audio onset (HAND-OFF) | +18-33% in 3-8 f, expo-in [V:1-6l8S] | Orthographic (digital scale) | Cut ±1 f of onset or 1 white frame; next shot keeps decelerating [V:1-6l8S t=71.10s] | ≤1 per 15-20 s, always on a sound event | Linear zoom into cut; on every cut [inferred] |
| CM-04 Hero dolly | The one 3D hero beat (REVEAL) | ×2.3 in ≈15 f, ease-out [V:1CSXtQ t=19.95-20.47s] | Moderate telephoto, shallow DOF (edge ratio 272/260 px) | Lateral settle, accelerating tilt, 8 f defocus dissolve [V:1CSXtQ] | Foreground made of the scene's own material | Dolly into greeked/low-res UI; plane intersections [V:1CSXtQ t=18.4-19.0s] |
| CM-05 Pull-back | Detail → context (REVEAL) | ×0.75-0.80 over 6-31 f; two-step ×0.79 then ×0.63 [V:1CSXtQ] [V:1i2L14] | Orthographic (2D); DOF in 3D | Breathe, second smaller step ≈1 s later, or scale-matched hand-off [V:1ccYWJ t=33.20s] | Text read big first, then revealed as UI | Linear pull-back; context with nothing new; subject ends <40% W [inferred] |
| CM-06 Truck / follow | Follow typing or travel to a target (FOLLOW) | Peak 1-4% W/f over 0.85-3.7 s [V:1-6l8S] [V:1CSXtQ] | Orthographic; telephoto + DOF on 3D rows [V:19NRDv] | Lands on a hover/click, or cut | Newest character always in frame, caret at 60-75% W | Hard-locked caret jitter [inferred]; copy changes across the cut-in [V:15VhHR t=6.57s] |
| CM-07 Pan / whip pan | Energetic hand-off (whip); motivated reframe (slow pan) | Whip 6-9 f expo-in, peak 13-20% W/f, blur on last 2 f [V:1i2L14] [V:1Hcg3X]; slow pan ≤0.2% W/f while read, else 1-4% W/f E-GLIDE [V:1CSXtQ] [V:15VhHR] | Any | Cut hidden in fastest frame; next shot same direction, decelerating | Cued ≈10 f ahead (cursor turns) [V:1i2L14] | Unblurred >10% W/f (strobe) [V:1ccYWJ t=30.57-32.57s]; reversed direction after cut |
| CM-08 Tilt / pedestal | Progression, world change, page scroll | S-curve peak ≈11% H/f over 30 f + 10 f settle [V:126cpH]; drift 0.3-0.5% H/f [V:1Hcg3X] | Flat; perspective only when tilting onto a plane | A crossing layer (clouds, band) is the wipe [V:126cpH t=15.20-16.53s] | One vertical grammar per film | Mixed up/down progressions; unblurred ≥1 FH in 12 f [inferred] |
| CM-09 Crane | Establish a world from above (REVEAL) | 1.5-2.5 s, GLIDE, rise 10-20% H, tilt down 20-40° [inferred] | Wide to normal (18-35 mm feel) [inferred] | Land and hold, or cut in to one tile [inferred; nearest V:1i2L14 t=19.23-20.30s] | Lands on one glowing target among many | Craning over flat UI, exposing it as a card [inferred] |
| CM-10 Stepped orbit | Several features around one pivot (REVEAL) | 9-12 f steps, one per ≈1.25 s [V:19NRDv t=29.97-35.93s] | Normal to telephoto, DOF on ring | Hard cut after last step's hold | Steps on the beat; front badge changes state | Continuous turntable [inferred]; caption clipped [V:19NRDv t=30.9-35.9s] |
| CM-11 Parallax | Depth during any move (2D/2.5D) | Foreground 1.3-2× the focal plane [V:1Hcg3X]; background 0.5-0.75× [inferred] | Inherits the main move | Ends with the move; never on a still shot | Same direction, speed ordered by depth | Opposite-direction or faster background layers; parallax inside one UI component [inferred] |
| CM-12 Roll | Never | 0°; ≤1° incidental [V:1CSXtQ t=20.25s] | — | — | Objects rotate ≤15° and settle | Dutch angle on UI |
| CM-13 Macro / cut-in | One value, word or field (REVEAL) | 1.65-3.5×, instant; hold 1.2-4.8 s [V:1CSXtQ] [V:15VhHR] [V:19NRDv] | Macro, optional shallow DOF | 2-3 f pull-back snap [V:19NRDv t=28.77s] or pull-out cut [V:15VhHR] | ≥30% of component off-frame; inner motion slowed (typing 7-8 chars/s) | Timid 1.2× crop; different copy across the cut |
| CM-14 Overhead | Maps, routes, boards, grids | Linear ≈8% H/s pan; rotate-to-upright ≈1.1 s [V:126cpH t=11.4-13.5s] | Flat top-down | Hard cut [V:126cpH t=13.60s] | Rotation settled before text is read | Text read on an oblique plane |
| CM-15 Fly-through | Enter an object or world (HAND-OFF) | ×1.36/f after 3 f ease-in, ≈10 f [V:1ccYWJ t=0.87-1.27s]; 2.5-3× → 1× in 8 f [V:1i2L14] | Wide | Next scene already inside the hollow; sub hit on fill frame [V:1ccYWJ] | Constant-ratio (exponential) scale through a real opening | Linear zoom (looks like slowing); raster pixelation at 20× [inferred] |
| CM-16 Screen-to-world | Integrations, "where does it go" (REVEAL) | ×0.57 in 10 f, then ×0.56 over ≈20 f (×0.32 in ≈1 s) [V:1CSXtQ t=18.00-19.03s] | Moderate telephoto, real DOF | Near-static hold (≤3 px/f @720) while the event plays, then dolly [V:1CSXtQ t=19.00-19.95s] | One tracked object carries the eye into 3D | World light/horizon not matching the page [V:15VhHR t=19.73s, inferred]; seams |
| CM-17 Travel through UI | Navigate the product without a screen recording | Scroll 1 FH in 12 f with blur on f2-4 [V:15VhHR t=34.47s]; hops 17-32 f, peaks capped 8-10% W/f [V:1ccYWJ] | Orthographic or tilted plane ≤15° while read | Cut at peak speed [V:15VhHR t=49.60s] or land, hold 7-20 f, cut in | Each move is a UI verb (scroll, open, select) | Hops with unblurred 22-27% W/f peaks [V:1ccYWJ]; scrolling past unread text |
| CM-18 Rack focus | Shift attention between planes; hide a swap | 8-12 f ease-out from ≈8-10% W blur [V:126cpH t=1.60-1.83s, 11.07-11.43s] (that film animates on twos, so ≈4-6 poses) | Shallow DOF | Morph or cut; subject readable ≈5 f after the morph lands [V:126cpH] | Racks while the subject is not being read | Rack on text being read; >12 f with nothing else happening |
| CM-19 Lens-distortion zoom-out | Open a dense field fast (Fast Startup only) | ≈2.2× → 1× over ≈20 f expo-out; bulge gone in ≈6 f [V:1ccYWJ t=7.30-8.0s] | Wide / fisheye | Settle, slow ≈5% creep, then dim-to-texture (3 f to 15%) [V:1ccYWJ t=9.833s] | Only on fields of small icons, bulge gone before anything is read | Barrel bending straight UI lines in a Minimal Premium film [inferred] |
| CM-20 Edit-camera | Change scale or angle for free | Instant; cut-ins 2-3.5×, pull-outs to ≈85%/55%/44% W [V:15VhHR] | Matches the shots on both sides | Next shot breathes or drifts | Same strings, same plate, new framing [V:1-6l8S t=22.87s] | Jump cuts between near-identical framings (<1.3× change) [inferred] |

**Moves not in the library.** Dolly zoom (vertigo), handheld follow, snorricam and crash-zoom-with-shake appear in none of the eight references and in none of the text sources for SaaS films. Treat them as CM-A (avoid) for SaaS UI work [inferred from absence]. Veo lists "handheld tracking" as promptable [P]; use it only on live-action b-roll plates, never on UI.

## 6.3 Camera hand-offs between shots

| Outgoing (last frames) | Cut | Incoming (first frames) | Measured | Sound |
|---|---|---|---|---|
| Ease-in content move, 3 → 7 px/f | Hard | Same direction, 34 px/f ease-out | [V:1CSXtQ t=17.8s] | Small whoosh/hit on the cut |
| Expo-in punch +18-33% in 3-8 f | Hard (or 1 white frame) | A frame-filling graphic within 4 f, or a decelerating push carrying on | [V:1-6l8S t=7.97s, 71.10s] | Cut within ±1 f of an onset |
| Whip, 8-9 f expo-in, blur on the last 2 f | Hidden behind the exiting element | Content drifting the same way, decelerating | [V:1i2L14 t=6.13s] | Whoosh ending on the fastest frame [V:1i2L14 takeaway] |
| Subject whips out; 0-1 empty frame | Hard, on the empty plate | The next subject enters, continuing the screen direction | [V:1Hcg3X t=1.53s, 6.83s] | Whoosh into a soft impact [inferred] |
| Ease-in pull-back −38% in 11 f | Hard | Next title at ≈2.1× and 25% opacity, decelerating to 1× over ≈18 f (scale match) | [V:1ccYWJ t=33.20s] | Onset at 33.16 |
| Card shrinks ×0.76, ease-in | Hard | Next card enters oversized (×1.18), settling | [V:1CSXtQ t=22.60s] | — |
| Glow area ramps ≈×9.5 over 2.1 s | Hard, on the brightest frame | A new world rises (dome, 22 f expo-out) | [V:1ccYWJ t=21.00s] | Sub hit |
| Tilt through a cloud band | The band itself is the wipe | The logo rides up into place over the last 8 f | [V:126cpH t=15.20-16.53s] | — |
| A dolly settles, then the scroll accelerates | Defocus dissolve, 8 f | Crisp kinetic text | [V:1CSXtQ t=21.47s] | Hit at 21.43-21.47 |
| Mid-move | Cut *into* motion | The incoming object is already moving on the cut frame; half of its 25 f expo-out travel (10.7% W in total) is covered in the first 4 f | [V:1ccYWJ t=12.17s] | Onset ±2 f |

**CM-U4. Accelerate into the cut, decelerate out of it.** [U] This is HubSpot's core grammar: the last 6-10 f before a cut ease in and the first 6-20 f after it ease out [V:1CSXtQ]. Solar, NOSTRA, Lottieicon, kivi and Bumper use the same envelope.

**Why it works.** The cut lands at peak velocity, which is where the eye expects a change. The deceleration afterwards gives the new image time to be read.

## 6.4 Camera budget by runtime

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

## 6.5 Camera in 9:16

Evidence is thin here: one reference [V:126cpH], measured through a crop of a screen capture.
- **Prefer vertical and scale moves.** Chowdeck uses a vertical push (1 FH in 11 f), a two-stage pull-out, an upward map pan and a pedestal tilt, and no lateral truck [V:126cpH]. The phone's scroll habit is vertical [inferred].
- **Lateral travel.** Keep any single lateral move to ≤50% of the frame width, because the width is the short side [inferred].
- **End every move inside the safe area.** Use x 120-840, y 270-1210 on 1080×1920 for anything readable [N]. Bumper's orbit clipped a caption at the top edge for 5 s in 16:9 [V:19NRDv t=30.9-35.9s]. In 9:16, platform UI makes that failure more likely.
- **Keep the camera on ones.** Chowdeck animates its illustration on twos (≈12 unique fps) and hides the stepping on camera moves with directional blur [V:126cpH t=2.53-2.90s]. For SaaS work, keep camera moves and UI on ones; stepped UI motion reads as lag [V:126cpH rule 13, inferred].

## 6.6 Universal camera principles (CM-U)

| ID | Principle | Why it works | Evidence |
|---|---|---|---|
| CM-U1 | Every move has a motive: breathe, follow, reveal or hand-off | Motion is attention. An unmotivated move splits it | [V:1ccYWJ] [V:1i2L14] [V:1Hcg3X] [V:1-6l8S] |
| CM-U2 | **One dominant move per shot**, plus breathing. Measured compounds are limited to push + truck (kivi) and zoom + pan in one S-curve (Lottieicon move 1) | Two independent moves make the eye solve two vectors | 8 refs; [P] "one camera move per clip" |
| CM-U3 | **Nothing is still except the end lockup.** Breathe every hold. A still reading hold of ≤1 s is allowed in minimal or editorial styles | A frozen frame reads as paused. A breathing frame reads as playing | [V:1-6l8S] [V:1CSXtQ] [V:19NRDv] [V:1Hcg3X] [V:1i2L14]; [V:15VhHR] 1.0 s still |
| CM-U4 | **Accelerate into cuts; decelerate out of them** | The cut lands at peak velocity, where change is expected | 6 refs |
| CM-U5 | **Critically damped camera: 0% overshoot** | A lens that bounces reads as a template preset | All 8 |
| CM-U6 | **Detail → context.** Reveal by pull-back or pull-out cut | The viewer reads the detail while it is big; context then answers "where?" | 7 refs |
| CM-U7 | **Read-safe speed:** ≤0.2% W/f while text is read. Fast motion only in the first or last 6-10 f of a shot | Reading needs a near-still image | [V:1CSXtQ] "≤2 px/f while text must be read"; [V:19NRDv] "never moving fast while it needs to be read" |
| CM-U8 | **Keep screen direction across cuts**, under one written grammar | Continuity of vector makes cuts feel like one move | [V:1Hcg3X] [V:126cpH] [V:1CSXtQ] [V:1i2L14] |
| CM-U9 | **Blur scales with speed:** none ≤5% W/f; 180° shutter for 5-10% W/f; above 10% W/f only into a cut, with blur | Above ≈5% W/f, crisp edges double and strobe | [V:1ccYWJ] (failure); [V:1i2L14] [V:15VhHR]; [N] 180° |
| CM-U10 | **One signature move per film or act** | Rarity is what makes it a signature | 8 refs |
| CM-U11 | **Sound marks the camera's peak.** Put SFX at peak velocity, cut on an onset, and use silence before the hero move | Hearing the peak gives a 2D move weight without blur | [V:1ccYWJ] 9 of 11 key motion events carry a clear SFX within ±3 f; [V:1-6l8S] [V:1CSXtQ] |
| CM-U12 | **No roll, no handheld shake** | Instability contradicts a product that promises control | All 8 |
| CM-U13 | **Render natively at the delivery fps** | Camera moves expose duplicate-frame pulldown judder | [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X] |
| CM-U14 | **Cut-ins beat animated zooms for UI detail** | Crisp, free, and they keep the move budget for meaning | [V:15VhHR] [V:19NRDv] [V:1-6l8S] [V:1CSXtQ] |

**References win (sound placement).** [N] (practitioner, unverified) says to "start whooshes 4-8 f before the cut, with the peak on the first frame of the new shot". The measured film places sub hits and whooshes at the move's **peak velocity**, which is mid-move for S-curve glides [V:1ccYWJ t=23.53s, 27.9s]. For whips into a cut, the peak *is* the cut, so the two agree. For mid-shot glides, use peak velocity.

## 6.7 Style-specific camera (S)

| Style | Camera signature | Numbers | Evidence |
|---|---|---|---|
| **Minimal Premium SaaS** (light) | Breathing push on every hold, 1-4 punches, one real move, no blur, light as the transition | Push 1.07-1.29× per hold; punch +18-33% in 3-8 f | [V:1-6l8S] [V:1CSXtQ] |
| **Prompt-native launch** | Caret-follow trucks, text → UI pull-back, macro on the beat drop, one 3D screen-to-world beat | ×0.75 pull-back; macro 1.65×; ×0.32 world reveal; ×2.3 dolly | [V:1CSXtQ] |
| **Kinetic-type × 3D UI** ("night claim / day proof") | The camera pulls back as words accumulate; tilted planes fly in; push-through; orbit on the beat; motion blur on everything | Type drift −1 to −3.5%/f with ≈40-55% snaps in 3 f; fly-in 12 f; orbit steps 9-12 f every 2 beats | [V:19NRDv] |
| **Fast Startup, dark neon** | Zoom-through hook; lens-distortion reveals; hop-and-hold tour; booms at peak velocity | ×1.36/f; ≈2× → 1× in 20 f; hops 17-32 f | [V:1ccYWJ] |
| **Editorial 2.5D explainer** | Perpetual scroll drift; an expo-in whip exit on most shots; cut on the empty plate; parallax; zero blur | Drift 0.3-0.5% H/f; whips 6-11 f, ×1.35-1.9/f, peak 15-20%/f | [V:1Hcg3X] |
| **Playful collage** (9:16) | Two-stage pull-out; tilt through a cloud layer; map drift; stepped 12 fps illustration with directional blur on camera moves | 4.1× in 1.0 s; 1.6 FH in 30 f | [V:126cpH] |
| **Monochrome brand system** | Fly-through hook; stepped pull-backs; cue-led whip; inside-the-ring orbit; tilt onto a floor | ×0.79 in 6 f; whip 8-9 f; tilt 6 f | [V:1i2L14] |
| **UI demo in an editorial frame** | Static brand frames; cut-ins and pull-out cuts; caret follow; carousel bridge; deck climax | ≈3.4× cut-in; bridge 14/6/13/16 f | [V:15VhHR] |

## 6.8 Experimental (X): validate before using as a default

- **CM-X1 Zoom-through portal at ×1.3-1.4/f** [V:1ccYWJ]. Strong as a hook, but untested in calm premium styles.
- **CM-X2 Lens-distortion zoom-out** [V:1ccYWJ] and **faked wide-angle push** [S:Bolt, inferred in source]. These bend UI lines.
- **CM-X3 Orbit inside a ring of cards** [V:1i2L14]. Powerful for "overwhelm", but it overloads by design.
- **CM-X4 Crane-over-grid establishing shot** [inferred; P lists "crane up"].
- **CM-X5 Stepped camera on twos (12-15 fps)** for a handmade feel. Chowdeck animates on twos [V:126cpH], and Figma's Config opening film was dropped to 15 fps [S:Figma]. Keep UI on ones even then.
- **CM-X6 A continuous one-take film** (all transitions as camera moves). Bolt's film is described as "fluid" [S:Bolt]. None of the eight references sustains it for more than 8 s (HubSpot's longest continuous take is 8.23 s) [V:1CSXtQ t=2.13-10.37s].

## 6.9 Avoid (A)

| ID | Avoid | Why / evidence |
|---|---|---|
| CM-A1 | Unblurred whips or tour hops above ≈10% W/f | They strobe [V:1ccYWJ t=30.57-32.57s] |
| CM-A2 | Continuous slow drift-orbits over diagrams longer than ≈5 s where only slow drift fills the gaps between story beats | Energy drops: Bumper's 6.26 s network shot has state beats every 0.8-1.4 s, yet its slow drift between them falls to motion mean 1.82 at the film's midpoint [V:19NRDv t=39.87-46.13s]. Fill gaps with camera beats (snap, step, push-through), not drift |
| CM-A3 | Camera roll, Dutch angles, handheld shake on UI | None of the 8 references does it; it reads as instability (CM-12) |
| CM-A4 | Random floating camera: drift with no direction, multi-axis wobble | Solar lists "no random floating camera, no wobble-cam" as mistakes it avoided [V:1Hcg3X] |
| CM-A5 | Framing that clips text during a move | [V:19NRDv t=30.9-35.9s] |
| CM-A6 | Frame-rate conversion by duplicating frames | Judder on every pan [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X] |
| CM-A7 | Different copy in the wide shot and its cut-in | [V:15VhHR t=6.57s] |
| CM-A8 | Dollying into low-resolution or greeked UI | [V:1CSXtQ t=18.4-19.0s] |
| CM-A9 | Spring or bounce on the camera | 0 of 8 references; it reads as a template preset |
| CM-A10 | A continuous 360° turntable of a UI screen | It exposes that the screen is flat; no reference does it [inferred] |
| CM-A11 | Several animated zooms per minute on UI | Wix reserves animated pushes for 1-2 moments [V:15VhHR rule 13] |
| CM-A12 | A static opening frame longer than 0.5 s | [V:126cpH t=0.00-0.73s]; [N] says frame 0 should already hold the hook |

## 6.10 Especially good for SaaS

1. **Caret-follow truck for prompts and inputs.** Caret at 60-70% W; typing slowed at macro scale [V:1CSXtQ] [V:15VhHR].
2. **Text → UI pull-back.** Let the viewer read the claim, then reveal that it is the product (×0.75) [V:1CSXtQ t=8.0-9.03s].
3. **Screen-to-world for integrations and APIs** (×0.32 in ≈1 s) [V:1CSXtQ].
4. **Push-through extraction for data**: table → column → state change [V:19NRDv t=16.77-20.50s].
5. **Hop-and-hold tour** for libraries, templates and dashboards, with peaks capped at 8-10% W/f [V:1ccYWJ].
6. **Continuity reframe from prompt to result** on the same plate [V:1-6l8S t=22.87s].
7. **Cut-in on the one value that matters** ("100%") instead of zooming the whole dashboard [V:19NRDv t=23.90-24.93s].
8. **A cursor that cues the camera.** The pointer turns toward the direction of the next move ≈10 f ahead [V:1i2L14 t=5.5-5.87s].

## 6.11 Do / Don't (camera)

| Do | Don't |
|---|---|
| Breathe every hold: +10% over 1.5-2 s, linear | Freeze a mid-film frame for 2 s, or wobble it on three axes |
| Ease in for the last 6-10 f, cut on the onset, ease out the next shot | Cut in the middle of a constant-speed move with no audio event |
| Pull back ×0.75 from read text into its UI | Open on a wide UI with the text too small to read, then zoom in |
| Cut in at 2-3.5× for detail | Animate a 1.0 → 3.0 zoom across a screenshot |
| Whip in 8 f with 180° blur on the last 2 f, and continue the direction after the cut | Whip at 25% W/f with no blur, then reverse direction |
| Orbit in 3 eased steps, one step every 2 beats | Turntable a UI screen through 360° |
| Keep roll at 0°; let objects rotate ≤15° and settle | Dutch-tilt the camera "for energy" |
| Spend true DOF and parallax on one hero beat | Put DOF and parallax on every shot of a minimal film |
| Put the boom at the move's peak velocity | Put a whoosh on every move |
| Render at 30 fps natively | Ship 25 fps pulled up to 30 by duplicating frames |

## 6.12 Writing camera moves into AI-video and compositing prompts

**Division of labour** [inferred from the references and [P]]:
- Every reference composites its UI and type as crisp 2D layers.
- kivi's AI-looking plates are static or near-static, heavily defocused, and only drift [V:1-6l8S].
- So: generate plates and hero objects with AI video and **do the camera on UI in compositing**, where scale and position are deterministic.
- Never ask an AI video model to generate readable UI or text in motion. [P] warns that Veo adds gibberish subtitles when a prompt implies dialogue.

**Veo / Flow constraints** [P]:
- One camera move per clip. Veo defaults to static or subtle movement if no move is named.
- Clips are 4, 6 or 8 s at 24 fps; Extend adds 7 s per step.
- Structure prompts as Cinematography → Subject → Action → Context → Style. Put a noun list in `negative_prompt`.
- Describe the empty space you need ("subject in lower third, large clean empty sky in upper half, shallow depth of field").

**Frame-rate consequence.** Veo delivers 24 fps. Duplicate-frame conversion to 30 fps produced visible judder in three references. Either:
- deliver the whole film at 24 fps, or
- keep AI plate camera moves in the Breathe band (≤0.2% W/f), where pulldown judder is invisible, and do all faster moves in compositing at native 30 fps [inferred].

**Camera block template (fill every field; never write "cinematic camera")**

```
CAMERA: <one move from CM-01..CM-20> from <start framing, % of frame> to <end framing>
  over <seconds / frames>, ease <BREATHE | SETTLE | GLIDE | ATTACK | READ | INTO-CUT>,
  peak speed ≤ <x>% of frame width per frame, roll 0°, horizon level, no handheld shake.
LENS FEEL: <orthographic flat | telephoto 85-135 mm equiv. | normal 35-50 mm | wide 18-24 mm> [mm values inferred]
FOCUS: on <plane>; background blur <none | soft | heavy>; foreground <none | soft bokeh>.
EXIT: <hold still | accelerate into cut | whip right with blur | land and hold N frames>.
NEGATIVE: camera shake, roll, dutch angle, sudden zoom, orbit, warped straight lines, text, subtitles, logo.
```

**Phrase bank (one per move)**

| Move | Phrase that works | Never write |
|---|---|---|
| CM-01 | "locked-off tripod, zero camera movement" | "static but dynamic" |
| CM-02 | "very slow constant push-in, 100% to 110% over the clip, no acceleration" | "subtle cinematic movement" |
| CM-04 | "single smooth dolly-in, 2.3× over 0.5 s, decelerating to a stop, near particles blur into bokeh" | "epic camera move" |
| CM-05 | "pull back from 100% to 75% over 0.7 s, fastest at the midpoint, revealing the panel around the text" | "zoom out to show more" |
| CM-08 | "pedestal down 1.6 frame heights through a band of clouds over 1 s, slow-fast-slow" | "camera goes down" |
| CM-10 | "orbit in three separate steps of 0.35 s, holding 1 s between steps" | "rotating around" |
| CM-14 | "straight top-down, slow drift upward 8% of frame height per second" | "drone shot" |
| CM-16 | "the flat interface is a panel in a soft blue-grey studio; pull back to a third of the size over 1 s, decelerating" | "go 3D" |
| CM-18 | "focus pulls from the foreground card to the background map over 0.3 s" | "dreamy blur" |

---

# Master §20. Cinematic Depth Rules

## 20.0 What depth does, and why "cinematic" is not "blur everywhere"

Depth tells the viewer **what to read first** and **where things live**. The eye ranks layers by a handful of cues: sharpness, contrast, scale, overlap, shadow and relative speed (parallax).

The references create depth with very few of these cues at a time:
- **Solar** has zero depth blur (no DOF, no plate blur; only 2-5 f blur-in on text entrances and one motion-blurred exit frame) and still reads as premium. It uses shadows, overlap and parallax [V:1Hcg3X].
- **kivi** has zero parallax. It uses only focus and layering [V:1-6l8S].
- **HubSpot** saves real DOF, bokeh and parallax for a single 3.67 s beat [V:1CSXtQ t=17.8-21.47s].

"Cinematic depth" therefore means **a few cues used consistently**, not every cue stacked on every shot. Stacking cues that contradict each other (a blurred layer that moves faster than a sharp nearer one, or shadows from two suns) is what reads as fake depth.

Part 02 (§4.8) set the composition side: three planes and four recipes. This section sets the motion, focus, light and QC side as 20 numbered rules.

## 20.1 The depth stack: per-plane specification

| Plane | Typical content | Focus | Speed during a camera move | Contrast / value | Shadow | Evidence |
|---|---|---|---|---|---|---|
| **Background** (far) | Painted plate, photo, gradient, aurora, studio wall, fog grid | Heavily defocused, or flat colour | 0.5-0.75× the focal plane [inferred] | Reduced and pulled toward the background colour; context dimmed to 15-50% | None | [V:1-6l8S] [V:1CSXtQ] [V:1i2L14] [V:1ccYWJ] |
| **Focal** (the read) | UI card, logo, hero object, type | Always sharp | 1× (reference speed) | Full contrast; the brightest or most saturated region | Soft drop shadow or contact shadow | All 8 |
| **Foreground accent** (near) | Particles, badges, a leaf, bubbles, chips | Soft bokeh, or sharp when it overlaps an edge | 1.3-2× | Full, but small | None, or a parallax shadow | [V:1CSXtQ] [V:15VhHR] [V:1ccYWJ] [V:1-6l8S] [V:19NRDv] |
| **4th plane** (hero beat only) | A second app window behind glass | Sharp or soft | — | — | — | [V:1CSXtQ t=18.17-19.95s] |

## 20.2 The twenty depth rules

**DP-01. Choose one depth recipe per film, by style.** [U]
- The four recipes (Part 02 §4.8), plus a fifth found in Lottieicon:
  1. **Focus**: sharp UI over a defocused plate.
  2. **Overlap and offset.**
  3. **Fog and scale.**
  4. **Shadows and parallax.**
  5. **Light and extrusion** (Lottieicon).
- Why: each recipe is internally consistent, and mixing them inside one shot creates contradictory cues.
- Evidence: kivi = focus; Chowdeck = overlap/offset; NOSTRA = fog/scale; Solar = shadows/parallax; Lottieicon = light/extrusion; Bumper and HubSpot (hero beat) = shadows + DOF + parallax, all as one optical model.
- See the recipe table in §20.3.

**DP-02. Three planes by default; four at most, and only in the hero beat. Name them in the brief.** [U]
- Why: three planes give an unambiguous near-mid-far order. More planes stop being read as depth and start being read as clutter.
- Evidence: Part 02 CO-U19. HubSpot reaches four planes (back wall, chat pane with glass edge, HubSpot window, particles) only in its hero shot [V:1CSXtQ t=17.8-21.47s].

**DP-03. Spend true optical depth (DOF + parallax + perspective camera) on one hero beat, about 10-15% of runtime, in minimal styles.** [U for minimal; S otherwise]
- HubSpot: 3.67 s of 30 s = 12% (computed). Everything outside the beat is flat and orthographic [V:1CSXtQ].
- Wix keeps 3D to "three moments only (heart, ice, card deck)", "so the 3D moments read as special" [V:15VhHR].
- Kinetic-type × 3D styles (Bumper) run depth across the proof shots (≈51% of runtime is UI/graphic proof), but never on claim cards [V:19NRDv].
- Why: depth is a contrast effect. Its value comes from the flat shots around it.

**DP-04. The read lives on the focal plane and is always sharp. Never depth-blur text the viewer must read.** [U]
- Text may blur only during:
  - an entrance: blur → sharp over 3-5 f (Bumper per-letter 3-4 f; Solar 2-5 f);
  - an exit: 1-2 f defocus before a cut [V:19NRDv t=10.97s, 16.73s];
  - a defocus dissolve [V:1CSXtQ t=21.47s].
- Why: blur on text costs reading time, which is the scarcest resource in a 30 s film. A blurred word the viewer was reading reads as a mistake.

**DP-05. Background plates are defocused until they become colour and light, not detail.** [U]
- The only measured blur radius is the start of Chowdeck's rack focus: **≈8-10% of frame width** [V:126cpH t=1.60s].
- kivi's plates are "heavily blurred". The blur also hides AI-illustration flaws, though not all of them; mushy crowd faces survive it [V:1-6l8S t=64.4-69.62s].
- Default: background blur radius **≥2-4% W** (≈40-75 px @1080p) for glass-over-plate shots [inferred].
- Why: detail in the background competes with the focal plane for fixations. Defocus removes the detail and keeps the mood (colour, light, place).

**DP-06. Rack focus takes 8-12 f with an ease-out.** [U]
- Use it to move attention between planes or to hide a background swap.
- Evidence:
  - Chowdeck: 8 f matte reveal; 11-12 f rack during the card → notification morph [V:126cpH t=1.60-1.83s, 11.07-11.43s].
  - Bumper: a DOF rack over 9 f as the tables fall away [V:19NRDv t=18.25-18.55s].
  - HubSpot: the blur grows over 4 f inside an 8 f dissolve [V:1CSXtQ t=21.47-21.73s].
- Why: under ≈6 f the rack reads as a cut; over ≈12 f it reads as a lens hunting for focus [inferred].

**DP-07. A foreground accent is small, soft, fast, and on its way out.** [U]
- HubSpot's particles grow from 12 to 30-40 px at 720p (≈4-6% H, computed) and go to bokeh as they leave frame left [V:1CSXtQ t=20.2-20.4s].
- Wix's palm leaf is blurred in the foreground [V:15VhHR t=43.07s].
- Lottieicon's bubbles enter defocused from the bottom corners in 2-3 depth bands, then shrink and sharpen [V:1ccYWJ t=39.2-40.5s].
- A sharp foreground accent is allowed only when it overlaps the focal object's edge, like kivi's app badge on the card's corner [V:1-6l8S t=39.75s].
- Use one foreground family per shot [inferred].
- Why: a near layer that moves fast and leaves frame is the strongest depth cue, and because it never settles it never competes for reading.

**DP-08. Each kind of blur has one job. DOF = depth; motion blur = speed; a gaussian "plate blur" only on a layer that stays behind.** [U]
- HubSpot shows no blur on any 2D move, even at 75 px/f. Its blur is DOF bokeh in the 3D beat and one defocus transition [V:1CSXtQ].
- Solar uses no depth or plate blur. Its only blur is a 2-5 f blur-in on title text and 1 motion-blurred exit frame [V:1Hcg3X t=0.10-0.90s, 1.50s].
- Lottieicon's CTA bubbles are the film's only DOF [V:1ccYWJ].
- Why: blur with no optical logic (a random layer softened) reads as "out of focus by mistake", not as distance.

**DP-09. Parallax: the foreground moves 1.3-2× the focal plane, in the same direction, and only while the camera moves.** [U]
- Evidence: Solar measured 1.3-2× (sun vs roof; sun vs panel rows) [V:1Hcg3X]; Bumper's badge ring vs the hero photo [V:19NRDv t=29.97-35.93s]; HubSpot's particles during the dolly [V:1CSXtQ].
- kivi and Chowdeck deliberately use none: flat plates and single-plane mosaics [V:1-6l8S] [V:126cpH].
- Why: relative speed is how the visual system measures distance in motion. Opposite-direction or reversed-speed layers break the illusion at once.

**DP-10. Match the shadow model to the style, and use one light direction per film.** [U]

| Style | Shadow model | Evidence |
|---|---|---|
| Floating UI | Soft, large blur, low opacity | HubSpot soft drop shadows (large blur, low opacity) [V:1CSXtQ]; Wix soft drop under the window [V:15VhHR t=19.73s]; Bumper strong soft shadows, plus a soft shadow under the cursor [V:19NRDv]; [E] proposes `0 24px 48px rgba(0,0,0,.08)` plus a `0 0 0 1px rgba(0,0,0,.06)` hairline [E, inferred values] |
| Flat editorial | Hard, long cast shadows | [V:1Hcg3X t=22.97-26.53s] |
| Flat playful | A solid offset backing card, ≈6% offset, shrinking to ≈3% as the card lands | [V:126cpH t=9.27-10.0s] |

- Failure: Solar's battery shadows fall to the right (light from the left), while its credit-token shadows fall down-left (light from the upper right) [V:1Hcg3X].
- Why: shadows are read as light. Two light directions read as two composited worlds, which is fake depth.

**DP-11. Ground every floating object with a contact cue.** [U]
- Evidence:
  - Solar's wafer floats over an elliptical shadow that sends ripple rings on each landing [V:1Hcg3X t=6.83-8.7s].
  - Solar's phone hovers over a glowing white ellipse [V:1Hcg3X t=14.30s].
  - Bumper's cursor has a soft shadow [V:19NRDv t=11.10s].
  - Lottieicon's toolbar pill is lit from below by a green under-glow [V:1ccYWJ t=12.17-14.73s].
- Why: an object with no contact cue reads as pasted on. A contact cue says "this object is at this height above that surface". This is the main difference between "floating interface" and "random floating screen".

**DP-12. Use atmospheric perspective: far layers lose contrast and drift toward the background colour.** [U]
- NOSTRA's far grid rows fade into green fog over ≈26 f [V:1i2L14 t=19.43-20.30s].
- Lottieicon dims the icon wall to ≈15% opacity in 3 f behind the counter [V:1ccYWJ t=9.833s].
- kivi dims superseded content to ≈50% [V:1-6l8S t=13.77s].
- Bumper recedes a group by shrinking it to ≈50% and dimming it over 8 f [V:19NRDv t=6.90-7.17s].
- TradeLens is described as dimming everything except the chosen tile to 20% [S:TradeLens, inferred in source].
- Why: haze and lower contrast are how real distance looks, and fog creates depth "without any lighting simulation" [V:1i2L14].

**DP-13. Glass is a depth layer only when there is something behind it.** [S]
- Recipe: frosted backdrop blur, a 1 px light rim, a soft inner glow, and a tint taken from the scene [V:1-6l8S t=18.37s, 39.75s].
- NOSTRA's glass tiles have a lighter top-right rim [V:1i2L14 t=28.7-30.6s]. HubSpot's chat pane has a semi-transparent glass edge [V:1CSXtQ].
- Over flat colour, glass reads as a grey box [inferred].
- Why: glass proves depth by showing a blurred version of what is behind it. With nothing behind it, there is no proof.

**DP-14. Light can be depth: emitters glow and nothing else does.** [S]
- Lottieicon:
  - an emissive accent under-glow with a falloff of ≈10% H;
  - a highlight-tile glow of ≈20% of the tile size;
  - a glow area that ramps ≈×9.5 into a cut [V:1ccYWJ t=12.17s, 18.83-21.0s, 27.13s].
- Solar puts halation bloom only on emissive objects (lamp shade, sun, phone hover pad, rings, bolt) [V:1Hcg3X t=3.43-5.43s]. Keep bloom radius small, ≈1-2% of frame width [inferred; the teardown gives no radius].
- Bumper places a coral glow blob behind its logo [V:19NRDv t=3.67s].
- Cap glow on text at 2-3% of cap height. Bumper's heavy bloom smears letter edges for 3-4 f [V:19NRDv t=7.2s].
- Why: a light source reads as the nearest, most important thing, so a glow is a free depth and hierarchy cue.

**DP-15. Extrusion and rim thickness give 3D for almost no cost.** [S]
- Lottieicon's flat category cards get a green extruded edge 6-8% thick [V:1ccYWJ t=16.10-18.83s].
- Solar's wafer shows rim thickness as it tumbles [V:1Hcg3X t=8.7-11.3s].
- Bumper's "Amount" columns extrude forward out of the tables [V:19NRDv t=17.6-18.2s].
- Chowdeck uses a solid offset backing card [V:126cpH].
- Why: a visible side face is the simplest proof of volume, and it needs no lighting or DOF.

**DP-16. Keep scale-depth consistent: nearer means bigger and (optionally) softer, and each object class keeps one size per depth band.** [U]
- Bumper's ring: near chips are soft and ring-plane chips are sharp [V:19NRDv t=5.7s].
- NOSTRA's circle chain: big near circles over smaller far ones [V:1i2L14 t=2.63-3.53s].
- Lottieicon's bubbles enter large and soft, then shrink and sharpen as they settle [V:1ccYWJ].
- Why: if two same-class objects differ in size with no depth logic, the viewer reads it as an error.

**DP-17. Occlusion is absolute: no ambiguous plane intersections, checked during every camera move.** [U]
- Failure: the HubSpot app window pokes through the chat pane's glass edge, and the seam slides from x ≈230 to ≈485 px as the camera settles [V:1CSXtQ t=18.4-19.0s]. See also Part 02 CO-U20.
- Intersections usually appear *mid-move*, so QC at 1-frame stepping across the whole move.
- Why: an intersection breaks the one assumption depth rests on, that each plane is wholly in front of or behind its neighbour.

**DP-18. Prefer depth transitions to flat crossfades when moving between layers.** [SaaS]

| Depth transition | Measured | Evidence |
|---|---|---|
| Dolly through a foreground layer | ×2.3 in 15 f | [V:1CSXtQ t=19.95s] |
| Push-through | 9 f; the foreground tables blur and fall away | [V:19NRDv t=18.25s] |
| Defocus dissolve | 4-8 f | [V:1CSXtQ t=21.47s] [V:1i2L14 t=0.63s] |
| Rack-focus morph | 11-12 f | [V:126cpH t=11.07s] |
| Dim-to-texture | 3 f to 15% | [V:1ccYWJ t=9.833s] |

- Why: a depth transition says "we went deeper into the same thing". A crossfade says "something else now". For SaaS, "deeper into the product" is usually the right message.

**DP-19. A tilted UI plane must face the camera while it is read: ≤15° while reading; ≥30° only in transit.** [U]
- Wix's BOWY card flattens from ≈15° to 0° in 7 f before its inner scroll is read [V:15VhHR t=33.33s].
- Bumper's tables fly in at ≈35° Y / 20° X [inferred angles] over 12 f, then the perspective slowly flattens [V:19NRDv t=16.77-17.17s].
- Lottieicon's card column is tilted ≈10-15° [V:1ccYWJ t=16.10s].
- Chowdeck's card lands upright after a 15° toss [V:126cpH t=9.27-10.0s].
- Why: perspective foreshortening compresses glyphs. Above ≈15°, text takes measurably longer to read [inferred], and the tilt reads as decoration rather than depth.

**DP-20. One depth world per sequence: one lens feel, one blur family, one light direction, one grain over the composite.** [U]
- Solar puts fine monochrome grain over everything, which unifies the layers and gives a print-like finish [V:1Hcg3X].
- Lottieicon's teardown recommends 1-2% grain or dither to stop banding in dark gradients [V:1ccYWJ rule 16].
- kivi's plates change rendering style from scene to scene (gouache desk, watercolour courtyard, flat office). That is the film's biggest flaw [V:1-6l8S].
- For AI-generated plates, repeat the same lens, aperture and light words in every shot prompt ("85 mm look, background softly out of focus, soft key from upper right"). [P] confirms Veo responds to "shallow depth of field" phrasing; the exact repetition rule is [inferred].
- Grain opacity ≈3-5% is [inferred].
- Why: depth cues are compared across cuts. A change in lens feel or light direction between consecutive shots reads as a different world. This is the "identity drift" the anti-AI checklist (Master §21) guards against.

## 20.3 Depth recipe by style

| Style | Recipe | Planes | Blur | Shadows | Light | Evidence |
|---|---|---|---|---|---|---|
| Minimal Premium, light | Focus: glass UI over a defocused plate, or flat white with soft shadows | 3 | Heavy on plates, none on UI | Soft, large blur, low opacity | White bloom; aurora | [V:1-6l8S] |
| Prompt-native with one 3D beat | Flat 2D everywhere; real DOF + parallax in the hero beat only | 2, rising to 4 in the beat | Bokeh only in the beat | Soft drop shadows | Soft diffuse; cool blue-grey studio | [V:1CSXtQ] |
| Kinetic-type × 3D UI | Shadows + DOF + parallax on tilted planes | 3-4 | DOF fall-off at panel edges; motion blur everywhere | Strong, soft contact shadows | Coral / violet glows on navy | [V:19NRDv] |
| Dark neon asset reel | Light: emissive under-glow, rim glow, extrusion; DOF only on the CTA | 2-3 | DOF only on the CTA bubbles | Soft shadow under the pill | Neon accent glows | [V:1ccYWJ] |
| Editorial 2.5D | Shadows + overlap + parallax, zero depth blur | 2-3 | No DOF or plate blur; text blur-in (2-5 f) only | Hard, long cast | Bloom on emitters only; fine grain | [V:1Hcg3X] |
| Playful collage | Overlap and offset; drop-shadowed photo cut-outs; fake DOF rack at transitions | 2-3 | Rack focus at transitions only | Soft drop on photo cut-outs; solid offset on UI | Flat | [V:126cpH] |
| Monochrome brand system | Fog + scale + glass | 2-3 | Feathered edges; fog | — | Haze gradients | [V:1i2L14] |
| Editorial brand frame + UI demo | Blur plates; UI-in-world window; a blurred foreground leaf | 3 | Blur plates | Soft drop under the window | Photographic | [V:15VhHR] |

## 20.4 Experimental depth (X)

- **DP-X1. Monochrome → colour bloom with increasing defocus** as a "life arrives" depth cue. Saturation ramps 0 → 100% over 22-42 f while the background defocuses [V:1-6l8S t=18.57-19.33s, 54.0-55.4s]. kivi applies it inconsistently (two scenes of four), so define the rule before using it.
- **DP-X2. Particles made of the UI's own colours** as a depth field. HubSpot uses ≈200-300 two-tone discs, Ø ≈8-15 px at 720p [count estimated] [V:1CSXtQ t=19.00-19.95s].
- **DP-X3. A 3D refractive object anchored across layout swaps.** Wix's ice bottle stays in one screen region over 4 backgrounds, with caustics and a specular streak on one cut frame [V:15VhHR t=29.47-33.33s]. The teardown calls the montage "semantically vague", so give it a label.
- **DP-X4. Grain-gradient (dithered) shading on 3D props** [V:1i2L14 t=0.70-2.63s]. Once per film.

## 20.5 Avoid (depth)

| ID | Avoid | Evidence / why |
|---|---|---|
| DP-A1 | DOF and parallax on every shot "to make it cinematic" | No reference does this. Depth stops meaning anything (DP-03) |
| DP-A2 | Two light directions | [V:1Hcg3X] (flaw) |
| DP-A3 | Plane intersections | [V:1CSXtQ t=18.4-19.0s] |
| DP-A4 | Blurred text that must be read | DP-04 |
| DP-A5 | Bloom on non-emitters, or bloom that smears letter edges | [V:19NRDv t=7.2s]; [V:1Hcg3X] restraint |
| DP-A6 | Mixed rendering styles across plates | [V:1-6l8S] (flaw) |
| DP-A7 | Low-contrast data marks on a dark ground (violet glass bars on navy) | Depth tint must not kill legibility. Data marks need ≥3:1 [V:19NRDv t=11-14s]; [N] WCAG 1.4.11 |
| DP-A8 | Dark gradients with no grain or dither at low bitrate | Banding destroys the depth falloff [V:1ccYWJ] [V:19NRDv] |

## 20.6 Especially good for SaaS (depth)

1. **Glass UI over a defocused "life" plate.** The human world stays soft and the product is sharp. Cheap, and reads as cinematic [V:1-6l8S].
2. **Dim-to-texture.** Keep the proof (an asset wall, a table) at 15% behind the number it proves [V:1ccYWJ t=9.833s].
3. **Extraction depth.** Lift the relevant column or card forward out of its table, then push through [V:19NRDv].
4. **Emissive "active" glow** to mark the selected or AI-touched element [V:1ccYWJ] [V:15VhHR t=23.83s] (violet halo in 3 f).
5. **UI-in-world window** with a soft shadow over a matching photo [V:15VhHR t=19.73s].

## 20.7 Do / Don't (depth)

| Do | Don't |
|---|---|
| Pick one recipe (focus, offset, fog, shadow/parallax or light) and use it across the film | Blur some shots, fog others, and add parallax at random |
| Keep the read sharp on the focal plane; blur text only during its entrance or exit | Rack focus away from a sentence the viewer is still reading |
| Make the foreground small, soft, fast, and leaving the frame | Park a large blurred blob in the foreground of a UI shot |
| Ground floating cards and objects with a contact shadow or glow pad | Float a screenshot over a gradient with no shadow |
| Use one light direction and write it down ("soft key from upper right") | Let each AI-generated plate choose its own light |
| Flatten a UI plane to ≤15° before its text is read | Hold a 35°-tilted dashboard while the viewer reads it |
| Spend real DOF and parallax on the hero beat only (≈12% of runtime) | Shoot every shot "with shallow depth of field" |
| QC every camera move at 1-frame stepping for intersections | Check only the first and last frames of a 3D move |

## 20.8 Depth QC gate (run on every shot)

1. Can you name the three planes? Is the read on the focal plane and sharp?
2. Is the depth recipe the film's chosen one (DP-01)?
3. Does every blurred layer sit consistently behind or in front (DP-08)?
4. During camera moves, does the foreground move 1.3-2× the focal plane, in the same direction (DP-09)?
5. Do all shadows fall from the one light direction (DP-10)? Does every floating object have a contact cue (DP-11)?
6. Step through the move frame by frame: are there any plane intersections (DP-17)?
7. Is every tilted plane at ≤15° while its text is read (DP-19)?
8. Are lens feel, blur family, light direction and grain unchanged since the previous shot (DP-20)?
9. Is true DOF or parallax used outside the hero beat in a minimal-style film? If so, remove it (DP-03).

---

# Master §10. Product Hero-Shot Rules

## 10.0 What a hero shot is in a SaaS film

In hardware ads, the hero shot is the product turning under studio light. Showcase sites still give hardware "full 3D/CGI hero treatment" (Surface, Figure, Codex Micro) [W:showreel-design].

A SaaS product has no body. In the eight references, the hero is one of six things:
1. **the UI doing its job** (a card, a composer, a table);
2. **the logo or wordmark**;
3. **a hero word** (the product name);
4. **a symbolic object** standing in for the product (a wafer, a bell, a heart, an orb);
5. **a collection** of everything the product makes or connects (a deck, a ring of chips);
6. **the integration itself**, shown in space.

A hero shot is the moment the film spends its best resources: the longest take, the only depth, the loudest or quietest sound, the most deliberate camera. Its job is to make the viewer *remember one image* of the product.

**Why it works.** Memory favours one distinctive, well-lit, unhurried image over many quick ones. Every reference concentrates its craft into one or two such moments and keeps everything else lean (CM-U10, DP-03).

## 10.1 Hero types and their measured specs

| Hero type | SaaS subject | Size and position | Camera | Reveal | Evidence |
|---|---|---|---|---|---|
| **UI hero card** | Composer, email, sheet, dashboard, order card | 55-85% W, centred or upper-centre. kivi's glass card is ~83-85% W at top-centre, with its waveform card at ~70% H | Breathe +6-12%; cut in on the one value | Build around text already read; cascade at a 2-4 f stagger; an empty hold of 8-9 f before the cascade | [V:1-6l8S t=22.87-25.47s] [V:1CSXtQ t=7.80-9.03s] [V:15VhHR t=12.47-12.83s] [V:126cpH t=9.27s] |
| **Logo / wordmark** | Brand | Solo: cap 7-15% H, 17-26% W. Lockup: ≤50-57% W | Still, or a slow push; dead still at the end | Tonal materialise; stroke → fill → sheen; converge; morph out of text | [V:1-6l8S] [V:19NRDv] [V:1CSXtQ] [V:1i2L14] [V:15VhHR] |
| **Hero word** | Product name, punch word | Cap 31-33% H | Linear push +8.9% over 1.1 s | Per-letter type-in at a 2 f stagger; an escalating word swap | [V:19NRDv t=57.60-61.47s] [V:1ccYWJ t=38.00s] |
| **Symbolic object** | Wafer, bell, phone, heart, orb | Object 30-45% W (Solar's wafer measured at ≈40% W; the range is [inferred]). An orb ≈57% H, ≈8% above centre [E, inferred framing] | Static frame while the object moves; zoom-through to exit | Expo-out entry, ≈50% of travel in 3-5 f (Lottieicon pill 50% in 4 f [V:1ccYWJ t=12.17s]; NOSTRA 40-45% on frame 1 [V:1i2L14]) | [V:1Hcg3X] [V:1ccYWJ] [V:15VhHR] [V:1i2L14]; [E] |
| **Collection** | Chip ring, site deck, icon wall, tile grid | Full frame | Stepped orbit, fan, or hop-and-hold tour | Arc fly-ins at a 270-400 ms stagger | [V:19NRDv] [V:15VhHR] [V:1ccYWJ] [V:1i2L14] |
| **Integration in space** | Two systems and the data between them | The hero pane ends at ≈1/3 of its starting scale (×0.32, measured on the bubble text) | Screen-to-world, then a dolly | Disintegration into the UI's own particles | [V:1CSXtQ t=17.8-21.47s] |
| *Hardware 3D* | A device | — | Turntable [inferred] | — | [W:showreel-design]; no reference video |
| *Abstract AI object* | A glass sphere or an orb | — | Near-still: the orb shader's drift period is ≈251 s | Fade in 15 f; scale 0.92 → 1.00 over 90 f [E, inferred] | [W:raivcoo] [E] (shader sourced) |

## 10.2 The ten hero-shot rules

**HS-01. One hero, one job, sized by type and placed on the optical centre.** [U]
- Sizes (see the table above):
  - UI card: 55-85% W.
  - Object: 30-45% W. Solar's wafer is ≈40% W [V:1Hcg3X t=6.83s].
  - Solo logo: cap 7-15% H. Wix's logo has a 12.2% H cap at 17% W [V:15VhHR t=51.37s]; kivi's wordmark measures 15-21% H ascender-to-baseline at 17-23% W [V:1-6l8S]; NOSTRA's cap is 7.2% H at 26% W [V:1i2L14].
  - Lockup: ≤50-57% W. HubSpot ≈50% W [V:1CSXtQ]; Bumper's wordmark 57% W with an 11% H cap [V:19NRDv].
  - Hero word: cap 31-33% H [V:19NRDv] [V:1ccYWJ].
- Position: centre or the statement band at y 47-52% H (Part 02). An object may sit ≈8% above the middle [E, inferred].
- Nothing else in the frame competes. Context is dimmed or defocused (HS-04).
- Why: a single hero gives the eye one place to land. Two heroes split the memory trace.

**HS-02. The hero gets time: the film's longest or most elaborate take (≈13-14% of runtime). Keep it alive inside the shot.** [U]
- Solar's wafer is the longest shot at 4.7 s of 35.8 s (13%, computed). Its life comes from a decaying bounce, a tumble, then electrons ramping up [V:1Hcg3X t=6.83-11.53s].
- Lottieicon's tour is the longest shot at 6.07 s of 44.3 s (14%, computed) [V:1ccYWJ t=27.13-33.20s].
- HubSpot's only 3D shot is 3.67 s [V:1CSXtQ].
- Shots longer than 3 s need an in-shot beat every 0.8-1.5 s (a snap, an orbit step, a push-through, a punch-in) [V:19NRDv rule 12].
- Why: dwell time is what turns an image into a memory. Internal beats stop dwell time from becoming dead time.

**HS-03. Materialise the hero; don't slide it in.** [U]
Measured reveal families:

| Family | Numbers | Evidence |
|---|---|---|
| Tonal materialise | A pale silver ghost darkens to brand green over ≈42 f, finishing with a left→right tonal sweep of ≈10 f | [V:1-6l8S t=6.2-7.6s] |
| Stroke → fill → sheen | Outline stroke-draws in 5 f; fill grows from a dot in 8 f (ease-out); sheen sweeps in 14 f | [V:19NRDv t=3.62-4.70s] |
| Develop | Duotone or "thermal" render → colour: a 1 f switch plus a 6-12 f clean-up at montage pace, or a 15 f develop for a single hero image (up to 20 f [inferred]) | [V:15VhHR t=8.93s, 25.77-26.43s] |
| Assemble | Particles converge into a column in 4 f and fuse into the icon in 2 f | [V:1Hcg3X t=12.60-12.80s] |
| Condense | A glass cube condenses on a particle trail, rotates frontal and shows a ✓ | [V:1i2L14 t=28.7-29.2s] |
| Converge | Wordmark halves move 20-39 px toward the "×" over 8 f while fading in from ≈80% (black side) and ≈50% (orange side); the colour half finishes ≈5 f later | [V:1CSXtQ t=10.37-10.63s] |
| Morph out of text | A cursor clicks "NO" in "NO STRESS" and the line becomes the "NOSTRA." logo in 1 f; a green dash then flies in as the full stop | [V:1i2L14 t=32.0-32.60s] |

- Avoid pixel or glitch builds longer than 12 f. NOSTRA's 23-26 f pixel build reads as noise [V:1i2L14 t=16.63-17.50s].
- Why: a slide says "this object came from somewhere else". Materialising says "this object came into being". That is the emotional claim of a launch.

**HS-04. Ground, light and isolate the hero.** [U]
- **Ground.** Use a contact shadow, a glow pad or a halo:
  - Solar: an elliptical floor shadow with ripple rings [V:1Hcg3X].
  - kivi: the hummingbird sits in a soft circular halo of ≈15% W [V:1-6l8S t=72.27s].
  - Bumper: a soft circular halo appears behind the B after the implosion [V:19NRDv t=55.27-55.60s].
  - Lottieicon: a highlight-tile glow of ≈20% of the tile [V:1ccYWJ t=27.13s].
- **Isolate.** Make the hero the sharpest, brightest or most saturated region. Dim context to 15-50% or defocus it (DP-12).
- Light colour and setting are given in §10.4.
- Why: isolation is attention by subtraction. A glow or halo also reads as "this object emits value".

**HS-05. One specular event per hero: a single sheen sweep of 12-24 f, left to right.** [U]
- Bumper: a pink-white sheen across the B in 14 f [V:19NRDv t=4.23-4.70s].
- Wix: a cyan → blue AI shimmer across the wordmark in 12 f [V:15VhHR t=18.73-19.13s].
- kivi: a light-sweep shimmer across the polished line over ≈0.8 s [V:1-6l8S t=15.0-15.8s].
- Solar: a specular sheen sweeps across the wafer stripes [V:1Hcg3X].
- ElevenLabs' ShimmeringText component loops a 2 s sweep. In a film, use it once [E sourced component; "once" is inferred].
- Why: one moving highlight proves the surface is real and catches the eye exactly once. Looping highlights read as a UI loading state.

**HS-06. The camera on the hero is calm.** [U]
- Allowed:
  - a static frame with the object moving (Solar wafer);
  - a linear push of +5-15% across the hold. Bumper's PRO pushes +8.9% over 1.1 s [V:19NRDv t=60.10-61.20s]; kivi's bird +15% over 2.5 s; kivi's URL +12% over 1.3 s [V:1-6l8S t=72.27-76.80s];
  - hop-and-hold, with 7-20 f holds on each target [V:1ccYWJ].
- Fast moves happen only *into* or *out of* the hero (CM-03, CM-07), never while it is being admired.
- Why: a moving camera makes the hero smaller in attention. Stillness, or near-stillness, gives the hero authority.

**HS-07. Use the real product, real data, at real resolution, and keep it identical across shots.** [U]
- The references show real product states:
  - real Wix editor UI [V:15VhHR];
  - a real ChatGPT composer and a real HubSpot page [V:1CSXtQ];
  - believable merchant data (GBP amounts such as 108.50, July 2025 dates) [V:19NRDv];
  - a real order flow (order → preparing → ready → rider → delivered) [V:126cpH].
- Failure: HubSpot's 3D hero shows a low-resolution, partly greeked app window at 18.4-19.0 s [V:1CSXtQ].
- Keep product identity locked across shots. Wix's ice bottle stays in the same screen region across 4 layouts [V:15VhHR t=30.83-32.83s].
- **For AI pipelines: composite the product (UI, logo, type) as vector or real assets over AI-generated plates. Never generate the product itself** [inferred from kivi's mismatched AI plates and [P]'s gibberish-text warning].
- Why: the hero is the most scrutinised frame of the film. Any fake detail there costs more credibility than anywhere else.

**HS-08. Frame the hero with sound: silence before, a hit on (or just after) the reveal.** [U]
- HubSpot: 70-300 ms gaps before its hits. 300 ms of silence after the riser crest; a 100 ms gap before the drop; a 70 ms near-silence before the particle dissolve hit [V:1CSXtQ t=10.6-10.95s, 12.85-12.95s, 18.95-19.05s].
- Wix: the music sucks out to −35 dB exactly on the send click, and the BASELINE page cut follows 8 f later [V:15VhHR t=12.20-12.47s].
- kivi: near-silence at 6.65-6.80 s, a riser under the wordmark, and the full-band hit at ≈8.28 s. The picture's burst leads the hit by ≈3 f [V:1-6l8S].
- Lottieicon: the loudest frame of the film (sub at −2.6 dB) sits on the hero tour's peak velocity [V:1ccYWJ t=27.9s].
- ITU-R BT.1359 puts detectability at ≈45 ms when sound leads picture and ≈125 ms when sound lags it [P]. So a hit may land up to ≈3 f after the reveal (as kivi's ≈3 f lag does) but should never land before it.
- Why: silence resets the ear, so the next sound is heard at full size. A hit fixes the moment in memory.

**HS-09. The climax collects many into one.** [U]
- **Bumper**:
  - payment chips fly in along arcs at a 270-400 ms stagger and ring the centre;
  - a small B grows over 8 f while the chips implode into it with blur;
  - ≈12 orange spark particles burst over 10 f;
  - a soft halo appears, then a slow pull-back [V:19NRDv t=52.75-56.67s].
- **Wix**:
  - every generated site joins a 3D deck that fans out (≈11 f), cruises (≈7 f) and accelerates (≈21 f);
  - the deck cuts into the tagline's inline slot, which collapses into the heart in 6 f [V:15VhHR t=48.27-49.83s].
- **NOSTRA (inverse)**: a label → a square → one tile in a grid of identical tiles. It glows while the others fade into fog ("stand out among sameness") [V:1i2L14 t=18.37-20.30s].
- Text-only: a Superside-derived recipe has up to 10 product icons orbit or assemble around a central hub node over ≈3-4 s with a fast stagger, and another merges feature columns toward the centre logo [S:Clever Devices, inferred in source]. Timings there are not frame-measured.
- Why: "unification" and "everything in one place" are the core promise of most SaaS products. Collapsing many objects into one shows the promise instead of stating it.

**HS-10. The end frame is a hero too: logo plus CTA, dead still, same position as any earlier lockup, music resolving on it.** [U]
- Holds: 2.2 s [V:1CSXtQ]; ≈1.7 s [V:15VhHR]; a 5.7 s end card with QR code and URL [V:19NRDv].
- HubSpot reprises its mid-film lockup at the same x (328 vs 327 px) [V:1CSXtQ t=27.37s].
- Failures:
  - kivi ends on a bare URL with no logo or verb [V:1-6l8S t=75.53s];
  - Lottieicon has no end logo, and its music ends 3.7 s before the picture [V:1ccYWJ t=40.5-44.27s];
  - Chowdeck has no CTA [V:126cpH].
- Why: the last still frame is the one most likely to be screenshotted, paused on, or used as a thumbnail.

## 10.3 Hero-shot recipes (frame-accurate, from the references)

Times are relative to the start of the recipe (f0) unless an absolute time is given.

**R1. Logo: materialise and punch (Minimal Premium)** [V:1-6l8S t=6.00-8.30s]

| f | Picture | Sound |
|---|---|---|
| 0-3 | Pure white frames (rest) | — |
| 4-7 | Aurora fades up | — |
| 6-48 | Wordmark appears as a pale silver ghost and darkens to the brand colour; the last ≈10 f are a left→right tonal sweep | Near-silence at 6.65-6.80 s, then a tonal riser; bass returns at 7.33 s |
| 48-54 | Push accelerates, +6.5% | — |
| 55-58 | **Punch +18% in 3 f** (per-frame growth 7 → 10 → 17 → 24 px) | — |
| 59 | **1 pure white frame** | — |
| 60-64 | The next graphic bursts to fill the frame in 4 f | Full-band hit ≈3 f after the frame fills |

**R2. Logo: stroke, fill, sheen, then ring (kinetic × 3D)** [V:19NRDv t=3.62-7.20s]
1. Stroke-draw the outline in 5 f, landing on a kick.
2. Grow the fill from a dot in 8 f (ease-out).
3. Sweep a sheen across in 14 f.
4. The full groove enters; chips fly in on curved arcs over 22 f with motion trails.
5. The ring settles with DOF (near chips soft, ring-plane chips sharp) and rotates slowly for ≈1.2 s.
6. Exit: the group shrinks to ≈50% and dims over 8 f (ease-in), then a hard cut.

**R3. Symbolic object on a floor (editorial)** [V:1Hcg3X t=6.83-11.53s], 4.7 s
1. The object enters *on the cut* already moving (screen-direction continuity). It is ≈40% W, centred over an elliptical floor shadow, on a vertical gradient.
2. Decaying bounce: landing intervals 0.47, 0.47, 0.37, 0.37 s, with ripple rings on each contact.
3. It comes to rest at ≈1.9 s, then tumbles in pseudo-3D (rim thickness visible) while a specular sheen crosses it.
4. From ≈2.4 s, particles orbit and densify over ≈2.1 s (energy builds toward the transformation).
5. Exit: the object and its floor drop out together (6 f, expo-in), then 1 empty frame, then a hard cut on the beat (Δ≈1 f).

**R4. Integration in space: screen-to-world plus dolly (prompt-native)** [V:1CSXtQ t=17.60-21.73s], ≈4.1 s (≈14% of a 30 s film, computed)
1. 17.60-17.77: the sent content accelerates upward (3 → 7 px/f).
2. 17.80: cut on a small hit. The bubble keeps rising and decelerates (34 → 4 px/f).
3. 18.00-18.33: pull back ×0.57. The blue-grey studio (#C8D4DF → #F4F5F8) and the source app window fade in over 6 f.
4. 18.33-19.03: keep pulling back, decelerating (×0.56; ×0.32 in total).
5. 18.95-19.02: near-silence; hit at 19.05. The source window disintegrates left→right into ≈200-300 discs in its own UI colours over ≈0.95 s, while the camera holds near-static.
6. 19.95-20.47: dolly in ×2.3 (15 f). Near particles go to bokeh. The answer text fades in over 2 f at 20.00.
7. 20.27-20.80: lateral settle (ease-out). 20.40-21.47: tilt-scroll down the result table, accelerating 8 → 24 px/f at 720p. Rows append every 130-200 ms.
8. Hit at 21.43-21.47, then an 8 f defocus dissolve into crisp kinetic text.

**R5. Gallery hop-and-hold (fast startup, fixed)** [V:1ccYWJ t=27.13-33.20s]
- Lens settle (≈7 f).
- Zoom-in 2.27× plus pan in one S-curve (32 f).
- Then 3-4 hops of 17-32 f each, with holds of 7-20 f on accent-highlighted targets, shortening toward the exit.
- Each target's micro-animation plays during its hold.
- A sub hit lands at each hop's peak velocity.
- Exit: an 11 f ease-in pull-back (−38%) into a scale-matched title.
- **Fix the reference's flaw:** cap peaks at 8-10% W/f, or add 180° blur above 5% W/f.

**R6. Many → one climax** (see HS-09) [V:19NRDv t=52.75-56.67s] [V:15VhHR t=48.27-50.03s]
- Chip version: ring in at a 270-400 ms stagger → implode over 8 f → ≤12 sparks over 10 f → halo → slow pull-back.
- Deck version: fan 11 f / cruise 7 f / accelerate 21 f → cut into the logo motif's slot → 6 f collapse.

**R7. Hero-word crescendo → lockup (kinetic-type)** [V:19NRDv t=56.67-62.60s]
1. The supertitle builds letter by letter and rises to y ≈20% H.
2. The hero word swaps every 16, 15, 13, 11, then 14 f, with heights growing 10 → 13 → 18 → 27 → 34 → 33% H.
3. The final word (the product name) types in per letter at a 2 f stagger, in the heavy display face, with bloom capped at 2-3% of cap height. A linear push of +8.9% runs over 33 f.
4. Cut. The wordmark letters reveal right to left at a 2 f stagger (10 f). Hold 14 f.
5. The wordmark rises; the QR code scales from a dot in 8 f (ease-out); a scan line sweeps it.
6. The end card holds still for ≥4 s while the music fades.

**R8. UI hero card (prompt → result)** [V:1-6l8S t=22.87-25.47s] [V:1CSXtQ t=7.80-9.03s] [V:15VhHR t=12.47-12.83s]
1. Show the content or prompt first, large and readable (HubSpot types the headline before any UI exists).
2. Build the component around it: shadow and border in 1-3 f, brand icon pop in ≈3 f, secondary controls slide in over 4-5 f. Then pull back ×0.75 (21-31 f, GLIDE).
3. For the result, use a continuity cut on the same plate, reframed. Hold the empty result card for 8-9 f.
4. Cascade the content in reading order: a 3-4 f stagger, a 4-6 f fade for each element, ≈20 f in total. Alternatively, Wix's 12 f build: 2 f clean plate → 2 f header wipe → 8 f colour settle → badge +4 f → nav and body +2 f.
5. Breathe +6-10% across the hold. Add one sheen (HS-05). Cut in on the one value that proves the claim (CM-13).

## 10.4 Hero light and background

| Setting | Background | Light / accent | Halo / glow | Evidence |
|---|---|---|---|---|
| Light minimal | #F9FAFC-#FFFFFF plus a mint aurora | Soft; implied top light | A radial halo ≈15% W behind the symbol | [V:1-6l8S] |
| Cool 3D studio | Radial #C8D4DF (left, darker) → #F4F5F8 (right), gentle vignette | Soft, diffuse | None. Depth comes from DOF and parallax | [V:1CSXtQ t=17.8-21.47s] |
| Night navy | #06004E with a coral blob top-right and violet bottom-left | Coral / orange accent | Bloom on the hero word, capped at 2-3% of cap height | [V:19NRDv] |
| Dark neon | #000 with green radial blobs | An emissive accent under-glow, falloff ≈10% H | Highlight-tile glow ≈20% of the tile | [V:1ccYWJ] |
| Editorial flat | One flat palette colour | Implied by long, hard shadows | Bloom on emitters only (radius ≈1-2% W [inferred]) | [V:1Hcg3X] |
| Brand-colour field | A red → navy radial dissolve (strong red gone in 8 f, settled in 25 f) | — | A soft radial glow | [V:15VhHR t=51.37-52.20s] |
| ElevenLabs-style orb | #0c0a09 or #f5f5f5 | The orb's ramp: black → colour 1 → colour 2 → white | Halo 1.4× the radius, 25% alpha, blurred 80 px [E, inferred] | [E] |

- Ambient light from the top-right is suggested by glows and rims in three references (coral top-right [V:19NRDv]; a mint top-right glow [V:1i2L14]; a lighter top-right glass rim [V:1i2L14]). It is inferred, not measured lighting. Use it as the default key direction for AI plates [inferred].
- No reference provides measured colour temperatures or key:fill ratios. Any Kelvin values in prompts are [inferred].

## 10.5 Style-specific, experimental, avoid, SaaS

**Style-specific (S)**

| Style | Hero signature |
|---|---|
| Minimal Premium | Logo materialise + punch (R1); glass card on a defocused plate; halo; white bloom transitions [V:1-6l8S] |
| Prompt-native | UI built around read text (R8); integration in space (R4) [V:1CSXtQ] |
| Kinetic-type × 3D | Hero-word crescendo (R7); stroke-fill-sheen (R2); chip ring and implosion (R6) [V:19NRDv] |
| Dark neon | Emissive highlight tile; hop-and-hold (R5); zoom-through hook [V:1ccYWJ] |
| Editorial 2.5D | Object on a floor (R3); hard shadows; bloom only on emitters [V:1Hcg3X] |
| Playful collage | Flat-to-real swap: a flat icon is hard-swapped on one pose for a real product photo with a soft drop shadow, then the photo falls with gravity ("promise → proof") [V:126cpH t=6.77s, 7.70s, 8.43s] |
| Monochrome brand system | Grain-gradient props; a glossy inflated 3D phone (once); glass tiles; a click-triggered logo [V:1i2L14] |

**Experimental (X)**
- **HS-X1. 3D hardware turntable.** No reference video. [W:showreel-design] only.
- **HS-X2. Abstract AI hero object** (an orb or glass sphere). Shader values are sourced [E], framing is inferred, and [W:raivcoo] lists the type. Keep its motion near-still; the orb's drift period is ≈251 s [E].
- **HS-X3. A refractive object anchored across layout swaps** [V:15VhHR t=29.47-33.33s]. Label what it proves.
- **HS-X4. The inverse climax** (one among many, glowing in a fogged grid) [V:1i2L14 t=19.13-20.33s].

**Avoid (A)**

| ID | Avoid | Evidence |
|---|---|---|
| HS-A1 | A brand on screen for under 2 s in the whole film | [V:1ccYWJ] 1.9 s, at 2.6-4.6 s only |
| HS-A2 | A greeked or low-resolution product in the hero beat | [V:1CSXtQ t=18.4-19.0s] |
| HS-A3 | Bloom that smears the hero's letter edges | [V:19NRDv t=7.2s] |
| HS-A4 | Decorative bursts that cross the claim | Rays cover "seconds" for ≈0.5 s [V:126cpH t=4.03-4.43s] |
| HS-A5 | Hundreds of random particles | Bumper uses ≤12 sparks; HubSpot's 200-300 are made of the UI itself |
| HS-A6 | Ending on a bare URL, with no logo, or with no CTA | [V:1-6l8S] [V:1ccYWJ] [V:126cpH] |
| HS-A7 | Music that ends before the hero end frame | [V:1ccYWJ] (3.7 s early) |
| HS-A8 | Unlabelled abstract hero metaphors | NOSTRA's pinwheel, strands and glass icons carry no labels [V:1i2L14 t=19.95-30.63s] |
| HS-A9 | A hero that slides in linearly from off-screen | No reference does this; see HS-03 |
| HS-A10 | Overshoot or bounce on a premium hero | Every settle in Bumper, kivi, Wix and HubSpot is critically damped |

**Especially good for SaaS**
1. **Let the product UI be the hero and the logo be the signature.** The UI proves the claim; the logo signs it.
2. **Feature first, label second, inside the hero.** kivi shows the auto-correction (a 4-5 f selection highlight on "Shitij", then "Kshitij") at 20.43 s; the "Custom Dictionary" card names the feature ≈5 s later, at 25.47 s [V:1-6l8S t=20.43s, 25.47s].
3. **A state change is the payoff.**
   - Toggle on → payoff cut 3 f later [V:1CSXtQ t=10.267-10.367s].
   - A counter running 84 → 100% with expo-out (70% of the range in the first 25% of the time) [V:19NRDv t=23.90-24.93s].
   - A mint fill wiping left to right in 4 f to mean "matched" [V:19NRDv t=20.37-20.50s].
4. **A cut-in on the one value**, so it becomes the hero [V:19NRDv].
5. **Integration in space (R4)** for connectors, APIs and data products [V:1CSXtQ].

## 10.6 Do / Don't (hero)

| Do | Don't |
|---|---|
| Give the hero the longest take (≈13-14% of runtime) and add an internal beat every 0.8-1.5 s | Flash the product for 0.5 s between text cards |
| Materialise it: tone, stroke-fill-sheen, develop, assemble | Slide a screenshot in from off-screen |
| Ground it with a contact shadow or halo; dim context to 15-50% | Float it over a busy, sharp background |
| One sheen sweep of 12-24 f | Loop a shimmer across the hero |
| Calm camera: static, or a linear push of +5-15% | Orbit or whip while the hero is on screen |
| Silence 70-300 ms before, then a hit on or ≤3 f after the reveal | Bury the reveal under a constant music bed |
| Collect many into one at the climax | End the climax on another feature card |
| End on logo + CTA, still for ≥1.5-2.2 s, with music resolving on it | Fade out on a URL while the music has already stopped |
| Composite the real UI and logo over AI-generated plates | Ask an AI video model to render the product UI or logo |

## 10.7 Hero QC gate

1. Can you state the hero in one noun? Is it the only hero in its frame (HS-01)?
2. Is it the longest or most elaborate take, with an internal beat every ≤1.5 s (HS-02)?
3. Is it materialised rather than slid in, with no glitch build over 12 f (HS-03)?
4. Is it grounded, and is it the sharpest, brightest or most saturated region (HS-04)?
5. Is there exactly one specular event (HS-05)?
6. Is the camera static or a ≤15% linear push while it is on screen (HS-06)?
7. Is it real product and real data at full resolution, identical across shots (HS-07)?
8. Is there silence before the reveal and a hit on it (HS-08)?
9. Does the climax collect many into one (HS-09)?
10. Does the end frame show logo + CTA, still for ≥1.5 s, with the music resolving on it (HS-10)?

---

## Appendix A. Where the references overrule generic advice (camera, depth, hero)

| # | Generic or text-source advice | What the references do | Ruling |
|---|---|---|---|
| 1 | Breathing push of 1.00 → 1.05-1.08 per shot [E, inferred] | 7-29% per hold (kivi), 13-24% shrink per card (HubSpot), +8.9% over 1.1 s (Bumper) | **References win.** Default +10% over 1.5-2 s; up to 29% only when carrying a punch's momentum (CM-02) |
| 2 | Motion blur at a 180° shutter on camera moves [N] | 5 of 8 leave 2D moves unblurred; Bumper blurs everything; Lottieicon's unblurred 22-27% W/f hops strobe | **Split ruling by speed** (CM-U9): no blur ≤5% W/f; 180° above that. The references win for slow moves, [N] wins for fast ones |
| 3 | Whoosh peak on the first frame of the new shot [N, unverified] | Sub hits and whooshes sit at the move's peak velocity, which is mid-move for glides [V:1ccYWJ] | **References win** for mid-shot glides. For whips into a cut, the two agree |
| 4 | Continuous "one-take" fluid camera with no hard cuts [S:Bolt, inferred in source] | Hard cuts with velocity hand-offs. The longest continuous take is 8.23 s [V:1CSXtQ] | **References win.** Use continuous moves within shots and hand-offs across cuts (CM-X6) |
| 5 | On-screen UI moves of 15-21 f, `bezier(0.2, 0, 0, 1)` [N] | Camera glides run 20-32 f (HubSpot 21-31 f; Lottieicon 17-32 f; kivi ≈25 f) | **References win for camera moves.** [N] still governs UI element moves (Master §8) |
| 6 | Springs with 2.8-9.5% overshoot for text and accents [N] | 0% overshoot on every camera move in all 8 | **References win for the camera.** Object springs remain style-specific |
| 7 | "Cinematic" = DOF and parallax everywhere [common practice, inferred] | One depth beat (HubSpot 12%) or one depth recipe; Solar uses zero depth blur | **References win** (DP-03, DP-A1) |
| 8 | 360° product turntables [common practice, inferred] | Only stepped orbits (9-12 f steps) and short card rotations | **References win** for SaaS UI. Hardware is untested (HS-X1) |
| 9 | Blur dissolves of 8-12 f [E, inferred] | 4-8 f (HubSpot 8 f; NOSTRA 4 f; kivi 4-8 f) | **References win**: 4-8 f |
| 10 | Keep everything inside the 5% safe area [N] | Macro shots deliberately overflow; Bumper clips a caption for 5 s (a flaw) | **Both**: overflow is fine for macro UI and display type (Part 02 Appendix A #2); readable text must end every move inside the safe area |
| 11 | One camera move per clip [P] | Measured compounds are limited to push + truck and zoom + pan in one curve | **No conflict.** It confirms CM-U2 |
| 12 | "No breakdown observed a zoom-in directly" [S:playbook] | Cut-ins of 2-3.5× and pushes are measured in 5 references | **References close the text-only gap.** Zoom to detail is confirmed, preferably as a cut-in (CM-13/CM-20) |

## Appendix B. Evidence strength and gaps

**Strong** (three or more references, frame-measured)
- Breathing on every hold.
- Accelerate into cuts, decelerate out of them.
- Detail → context pull-back reveals (7 refs).
- No camera roll; no camera overshoot.
- Cut-ins of 2-3.5×.
- Screen-direction continuity across cuts.
- One depth recipe per film.
- UI planes at ≤15° while read.
- Native frame rate (3 judder failures).
- Materialise-type hero reveals; one sheen sweep; many → one climaxes (3 refs).
- A still final lockup of 1.4-2.2 s.
- Context dimmed behind the hero.
- Contact cues under floating objects.

**Medium** (1-2 references, measured)
- Screen-to-world numbers and the ×2.3 dolly (HubSpot only).
- Stepped orbit timing (Bumper only).
- Hop-and-hold tour (Lottieicon only).
- Carousel and deck bridge (Wix only).
- Rack-focus timings (Chowdeck, plus Bumper and HubSpot partially).
- Parallax ratio 1.3-2× (Solar only).
- Whip numbers (NOSTRA, Solar).
- Zoom-through ratio (Lottieicon only).
- Punch numbers (kivi only, though used 4 times).
- All 9:16 camera guidance (Chowdeck only, measured through a crop of a screen capture, animated at 12 fps).

**Weak / inferred**
- **Crane**: no measured example.
- **Overhead / top-down** beyond a map plane.
- **Lens mm equivalents**: all inferred. The only measured perspective cue is HubSpot's 272/260 px edge ratio.
- **Background blur radii**: only the rack-focus start (8-10% W) is measured; plate blur defaults are inferred.
- Background parallax at 0.5-0.75×.
- Glass over flat colour reading as grey.
- **3D hardware heroes and abstract AI orbs**: no reference video ([W] and [E] only).
- **AI-video camera behaviour**: Veo facts are text-only [P]. No AI-generated camera move was measured.
- **Lighting**: no Kelvin values, key:fill ratios or measured light positions. The top-right key is inferred from glows.
- **Budgets for 5-10 s and 90 s films**: extrapolated.
- **Motion-blur thresholds (5% / 10% W/f)**: anchored on one measured failure (Lottieicon) and two blurred whips (NOSTRA, Wix). The exact threshold is a design judgement.

---

## Audit (2026-10-08, adversarial pass against the per-video teardowns and text briefs)

I spot-checked about 120 numeric claims against the eight teardowns in `research/videos/` and the web briefs. Most matched. These are the changes:

1. **CM-02, HubSpot row.** The per-frame breathing rate "0.3-0.6%/f" did not match the teardown. It is now ≈0.2%/f (logo +10.6% over ≈51 f) to ≈1.1%/f (card ×0.80 over 18 f). The row also notes that these are ease-in moves into the cut, not linear breaths.
2. **Solar blur (four places: §20.0, DP-08, §20.3 table, Appendix A #7).** "Zero blur" / "no blur at all" contradicted the teardown, which shows 2-5 f blur-in on title text. All four now say "zero depth blur", meaning no DOF and no plate blur.
3. **Solar bloom size (DP-14, §10.4).** "≈1-2% of the frame" is not in the teardown. It is now tagged [inferred], and the measured emitter list is cited.
4. **Wix pull-out cuts (§0.1, CM-05, CM-20).** "To ≈85/55/44%" read as zoom factors. Only the first is a scale. The other two are the revealed page's width (≈55% W, ≈44% W), and the text now says so.
5. **Feature-first example (§10.5 SaaS #2).** This misread the kivi timing. The 4-5 f is the length of the correction highlight. The label arrives ≈5 s later, not 5 f.
6. **Cut-into-motion hand-off (§6.3).** "Already 50% through a 25 f expo-out" misread the Lottieicon timing. The object is already moving on the cut frame, and half of its travel is covered in the first 4 f.
7. **Chowdeck backing card (DP-10).** The offset was "4-6% → 3%". The measured value is ≈6% → ≈3%.
8. **Constellation climax (HS-09).** This was misattributed to [S:playbook] with an unsourced 2-3 s duration. It is now [S:Clever Devices, inferred in source], which gives ≈3-4 s with a fast stagger, and it is marked as not frame-measured.
9. **Bumper network shot (CM-10 mistakes, CM-A2).** "No beat" contradicted the teardown, which shows beats every 0.8-1.4 s. The real problem is slow drift between the beats.
10. **kivi truck hold (CM-06, §0.4).** The teardown gives both 2 f and 3 f, so this now reads 2-3 f.
11. **NOSTRA fly-through (CM-15).** The unsourced "≈3×, 93% of the change" is now the teardown's ≈2.5-3×, and the push-in reading is flagged as the teardown's own inference.
12. **BT.1359 (HS-08).** "≤100 ms" did not match the cited thresholds. It now uses them directly: sound leading picture is detectable at ≈45 ms, sound lagging at ≈125 ms.
13. **CM-14 pan.** Only 8% H/s is measured, so the 5% lower bound is tagged [inferred]. The measured map rotation is added.
14. **Hero object size and entry (§10.1).** The 30-45% W range is tagged [inferred] around the measured ≈40% W, and the expo-out entry gets measured sources.
15. **Speed-band scale column (§0.3).** I added the cited moves the values come from and tagged the band edges [inferred].
16. **Develop reveal (HS-03).** Only 15 f is measured, so the top of "15-20 f" is now tagged [inferred].
17. **Punch budget (CM-03).** The rate is now marked as computed (one per ≈19.5 s), with all four timestamps cited.
18. **Source frame-rate caveat (§0).** This is new. Wix and HubSpot are 25 fps masters, Solar is 24 fps, and Chowdeck animates on twos, so frame counts under ≈4 f from these films are ±1 f.
19. **Coverage matrix (§6.2b, new).** This adds when, how fast, focal feel, the exit into the next shot, and premium-vs-amateur signals for all 20 moves. It fills the fields missing from the shorter cards (CM-09, 11, 14, 16-20). It also adds a "Moves not in the library" note covering dolly zoom, handheld and snorricam.

**Confirmed against the teardowns** (sample): kivi punches (+18%/3 f, +33%/3 f, +18%/8 f), truck ≈40% W in ≈0.85 s, pushes 1.07-1.29×; HubSpot ×0.75 / ×0.57 / ×0.56 / ×0.32 / ×2.3, caret at 65-66% W, 2.2 s still, the 272/260 px edge ratio, the silence gaps; Solar wafer 4.7 s, bounce intervals, whips ×1.35-1.9 at 15-20%/f, parallax 1.3-2×, the two light directions; Lottieicon ×1.36/f, 2.27× tour, 10% and 27% W/f peaks, −38% hand-off, 9 of 11 SFX within ±3 f, dome 88→58% H; NOSTRA two-step pull-back, whip deltas, 0.8 s end hold, hex iris; Chowdeck 4.1× two-stage pull-out, 8-10% W rack, cloud tilt; Bumper orbit steps, PRO +8.9%/33 f, chip stagger, caption clipping; Wix 3.4× cut-in, bridge 14/6/13/16 f, rule 13, 12 f sheen.

**Remaining known gaps** (also listed in Appendix B):
- No measured crane, dolly zoom or true lens focal lengths. All mm equivalents are inferred.
- No measured plate-blur radius beyond Chowdeck's rack start, and no measured bloom radius.
- Parallax background ratio and lighting (Kelvin values, key:fill ratios) are inferred.
- 9:16 camera guidance rests on one cropped, 12 fps reference.
- AI-video (Veo) camera behaviour is text-only.
- Hardware turntables and orb heroes have no reference video.
- 5-10 s and 90 s budgets are extrapolated.
- The motion-blur thresholds (5% and 10% W/f) rest on a single strobing failure.
