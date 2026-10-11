# Specialised Guideline 09: Cinematic 3D Technology Video

A format guide for the film whose **main register is lit 3D**: UI planes, data structures, networks and abstract system objects staged in a designed space, filmed by an optical camera with depth of field and motion blur, with all copy composited flat on top. It is the film you make when the product is a *structure* (infrastructure, data platforms, networks, security, developer platforms, AI systems explained as architecture, hardware-adjacent products) and the story is "here is how it works inside". It applies the Master SaaS Motion Design System (Parts 01-11, `research/master/`) to this one format and turns its rules into a plan you can produce. Every number traces to a master section or a reference teardown (`research/videos/`).

**Evidence warning (read first).** None of the eight references is a 3D-first film; all eight are 2D-first, and 3D is an accent or a proof register in every one of them (P10 §0.3-0.4). The master's style card for this format, **ST-D 3D Technology Film**, is *assembled* (P10 §11.3): from Bumper's 3D proof register (≈51% of its runtime: tilted planes, push-through, stepped orbit, network, chip ring, implosion) [V:19NRDv], HubSpot's 3.67 s studio beat (screen-to-world pull-back, UI particles, ×2.3 dolly through bokeh) [V:1CSXtQ t=17.80-21.47s], Lottieicon's extrusions, dome and light build [V:1ccYWJ], and NOSTRA's ring, ribbon and fog floor [V:1i2L14], plus text-only genre sources ([W:showreel] "3D / CGI" 40 of 243 reels; [S:Bolt] "structured 3D scenes for control over shapes and volumes"). Numbers measured in a reference carry a `[V:…]` tag. Numbers that come only from the assembled card carry `[inferred]`. Validate inferred numbers (3D share, BPM, ASL, runtime) on the first real film before you make them house defaults.

**Reference key** (same tags as the master):

| Tag | Reference | Runtime / format | What a 3D technology film takes from it |
|---|---|---|---|
| [V:19NRDv] | Bumper PRO payments launch | 67.2 s, 16:9, 100 BPM | The only measured optical 3D register: tilted UI planes flown in at ≈35° and settled in 12 f; extraction → 9 f push-through; dolly along rows; stepped orbit (9-12 f steps ≈1.25 s apart); network failover told by colour; chip ring imploding into the logo in 8 f + ≤12 sparks; 180° motion blur on every move; camera "never static on UI"; low-pass breakdown under dense 3D UI |
| [V:1CSXtQ] | OpenAI × HubSpot ChatGPT connector | 30.0 s, 16:9, ≈86 BPM | The hero D4 beat: velocity hand-off into a screen-to-world pull-back (×0.57 in 10 f, then ×0.56 over 18-20 f), environment fade-in over ≈6 f, ≈200-300 particles made of the UI's two colours, dolly ×2.3 in ≈15 f with foreground bokeh; 70 ms gap → hit; telephoto lens feel |
| [V:1ccYWJ] | Lottieicon icon-library launch | 44.3 s, 16:9, ≈112 BPM | Extruded accent edges (6-8% thick), 90° → 0° edge-on flips in 8 f, horizon dome rising 88% → 58% H in 22 f, light build (glow ×9.5 over 2.1 s, cut on the brightest frame), sub booms on peak camera velocity; **the strobing failure** of unblurred 22-27% W/f pans and banded black gradients |
| [V:1i2L14] | NOSTRA studio promo | 35.1 s, 16:9 inset | Camera inside a ring of cards; floor-grid tilt with one glowing tile and fog falloff over ≈26 f; one material per accent; the over-limited mix (−7.9 LUFS, +1.6 dBTP) as the anti-pattern |
| [V:15VhHR] | Wix AI site builder | 53.9 s, 16:9, 112 BPM | 3D card carousel with BRIDGE motion (decelerate 11-14 f → dwell 6-7 f → accelerate 13-21 f); deck → slot collapse in 6 f; refractive hero object; 25 → 30 fps pulldown judder (the delivery flaw) |
| [V:1-6l8S] | kivi voice-AI launch | 77.8 s, 16:9, 127 BPM | Light as transition material; glass over defocused plates (DP-05); generated plates whose mismatched styles and mushy faces survive defocus (the AI-plate warning) |
| [V:1Hcg3X] | Solar explainer | 35.8 s, 16:9 | 2.5D as the cheap alternative to 3D; bloom on emitters only; the two-light-directions flaw |
| [V:126cpH] | Chowdeck app ad | 18 s, 9:16, ≈96 BPM | The only vertical reference: vertical push, pedestal tilt, safe band x 120-840 / y 270-1210 |

Master parts are cited as **P01-P11** (for example P04 §0.2 = camera defaults card, P10 §13 = 3D motion guidelines). Other tags: [N] = platform or standards data, [P] = model-provider docs (Veo/Flow), [E] = ElevenLabs-style brief, [W] / [S] = web and Superside text sources, [inferred] = derived, not measured. Dimensional levels D0-D4 follow P10 §0.6 (D0 flat, D1 2.5D, D2 planar 3D, D3 objects and space, D4 optical 3D with DOF, parallax and a moving 3D camera).

---

## 1. Purpose and audience

**What the film does.** It makes an invisible system legible. It starts in disorder (the problem drawn as a structure that fails), turns that disorder into order (the product drawn as layers, a backbone, a network), proves the order with 2-4 structural demonstrations told mainly by camera, colour state and geometry, spends one signature camera move on "the whole system at once", collapses many into one at the climax, and ends on a flat, still lockup. The viewer should leave able to draw the product's architecture on a napkin (P10 ST-D "Why it works": "3D earns its cost when the product is a structure").

**How it differs from the neighbouring formats:**

| | AI / Technology Launch (G03) | Premium Brand Film (G04) | **Cinematic 3D Technology Video (this guide)** |
|---|---|---|---|
| Main register | 2D-first, real UI, one D4 beat (10-15%) | 2D-first, one D3-D4 hero reveal (8-15%) | **D2-D4 is the main register: 50-90% of runtime** (P10 §13.2 [inferred]); D0 only for claim cards, type and the logo |
| What is shown | The model working: input → thinking → output | A promise and a feeling | **A structure**: layers, flows, networks, failover, scale |
| Camera | Mostly 2D scale/position; one dolly | Slow pushes; one hero dolly | **Optical 3D camera that never stops** (drift ≈1-3% of frame per second), stepped orbits, push-throughs, a signature pull-back (P10 3D-U10) |
| Motion blur | Off on 2D | Only on the hero beat | **180° on every 3D camera and object move** (P10 3D-U22) |
| ASL | 1.6-3.0 s | 2.5-3.5 s | **2.5-3.5 s**, proof shots 3-6 s held by in-shot camera beats every 0.8-1.5 s (P10 ST-D rhythm [inferred]) |
| Music | 100-127 BPM pop-electronic | 70-100 BPM warm hybrid | **Bass-forward electronic 100-112 BPM or hybrid cinematic 70-100 BPM**, sub booms on camera peak velocity (P09 §16.2.2 [inferred]; tempo per P09 SD-U8 and its cinematic exception) |
| Production | Kit + custom 2D + one 3D beat | Kit + custom 2D + plates + one 3D shot | **3D package or @remotion/three for most shots; kit for type, UI cards and assembly** |

**Who watches, and where:**

| Audience | Context | What they need | Implication |
|---|---|---|---|
| Engineers, architects, platform and data leads | Product page, docs landing, YouTube, conference talk | "How does it actually work?" in under a minute | Every 3D device must map to a real architectural fact (P10 3D-U1); label layers with the product's real component names |
| CTO / VP buyers | LinkedIn, sales deck embed, analyst briefing | Scale, reliability, confidence | Show failure and recovery, not just the happy path [V:19NRDv t=39.87-46.13s] |
| Event audience | Keynote opener or section bumper | A big-screen "system" moment | 4K master, telephoto lens feel, deep blacks with dither |
| Investors, press | Launch post | Category and ambition | One unforgettable image: the whole stack revealed by the signature pull-back |

**Funnel stage:** consideration (technical evaluation) and launch awareness. The CTA is a technical next step ("Start streaming →", "Read the architecture", "Deploy in 5 minutes"), never an offer.

---

## 2. When to choose this format (and when not)

Choose a **Cinematic 3D Technology Video** when all of these are true:

1. **The product is a structure.** You can write at least three sentences of the form "the third axis shows that …" from the meaning test (P10 §13.1, 3D-U1): "we go deeper into the same thing", "data travels to another system", "many become one", "one stands out among many", "this is a place / a scale", "this system is a network". If you can write only one, make a 2D film with one D4 beat (G01 or G03).
2. **The real UI exists and is secondary.** The value lives below the interface (routing, storage, inference, replication, security). UI appears as proof on planes, not as the film's main material.
3. **You have 3D capacity.** A 3D artist or a code pipeline (`@remotion/three`, Blender, Cinema 4D) and a realistic render budget: ≈30-50 s of rendered 3D for a 60 s film, at 1920×1080 or 3840×2160 with motion blur.
4. **There is a reason to be seen more than once:** product page hero, keynote, launch post, docs landing.

**Do not choose it when:**

| Situation | Choose instead | Why |
|---|---|---|
| The product's value is visible in the UI (a workflow, an editor, a CRM) | G02 UI Product Demo or G01 Launch Film | 3D would hide the thing that sells; HubSpot spends only 12% on 3D for exactly this reason [V:1CSXtQ] |
| The story is "the model answers you" (copilot, chat, voice) | G03 AI / Technology Launch | Prompt-native beats beat architecture for end users |
| The brand promise matters more than the mechanism | G04 Premium Brand Film | One reveal, not a system tour |
| 5-15 s social cut, or no 3D budget | G07 Short Motion Ad, or a 2.5D version (HR-10) | Solar reads dimensional with 0% true 3D (shadows, rim thickness, parallax 1.3-2×) [V:1Hcg3X] |
| The product is physical hardware | This format plus a modelled hero (3E-11) | Generic device frames are only for SaaS; real hardware gets a real model, never a generated one (P10 §14.5) |

**Decision rule:** count the beats that pass the meaning test. ≥3 beats → this format. 1-2 beats → a 2D film with that many D4 beats. 0 → no 3D.

---

## 3. Platforms, aspect ratios and length

### 3.1 Deliverables matrix

| Deliverable | Ratio / size | Length | Use | Notes |
|---|---|---|---|---|
| **Hero master** | 16:9, 1920×1080 (3840×2160 for keynote) | **60 s** (range 45-90 s) | Product page, YouTube, keynote, launch post | ST-D: 30-60 s [inferred]; ≥45 s lets 3 structural proof blocks breathe |
| Cutdown | 16:9 | 30 s | Paid social on desktop, LinkedIn, sales email | Keep hook, reveal, the signature move, climax, lockup; cut by whole blocks |
| Vertical recomposition | 9:16, 1080×1920 | 30 s and 15 s | Reels, Shorts, TikTok, LinkedIn mobile | **Re-render the 3D cameras, never crop** (P10 ST-D duration row [inferred]); stacked-layer subjects suit vertical frames |
| Square | 1:1, 1080×1080 | 30 s | LinkedIn feed, X | Re-render, or reframe 16:9 renders made with ≥25% horizontal overscan |
| Website loop | 16:9, 1920×1080 | 8-12 s seamless | Hero background behind a headline | No type, no audio; idle stack with one-axis motion (3D-U15); ≈3-5 MB |
| Keynote bumper | 16:9, 3840×2160 | 6-10 s | Section opener | One structural move + logo |

### 3.2 Technical delivery (P11 §24, defaults card #15-21; P09 §16.11)

| Item | Spec |
|---|---|
| Frame rate | **Native 30 fps** (or 24 fps end to end if generated plates dominate). Never pad 24 → 30 by duplicating frames: judder was measured in three references [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X] |
| Render passes | Beauty with **180° motion blur** on 3D moves; separate passes for UI-plane textures, particles, fog and glow so they can be graded; type and logo composited in 2D, never rendered inside the 3D scene |
| UI textures on planes | **≥1.5× the largest on-screen size** (4K textures for any plane that fills ≥60% W); never greeked (P10 3D-A9; [V:1CSXtQ] greeked rows at 18.4-19.0 s) |
| Video | H.264, yuv420p, **BT.709 tagged**, CRF **16-18**, **12-20 Mb/s @1080p30** (dark gradients band below this) |
| Dither | **1-2% grain or noise on every dark gradient and fog** before the 8-bit encode (P10 defaults #23; Lottieicon and Bumper band without it) |
| Audio | **−14 LUFS ±1**, **≤ −1 dBTP**, LRA 5-10 LU; AAC-LC 48 kHz 256-320 kb/s; WAV 48 kHz/24-bit + stems |
| Safe areas | 16:9 text-safe x 96-1824, y 54-1026; 9:16 x 120-840, y 270-1210 @1920p (P02 §4.7) |

### 3.3 Length rules

- **60 s master:** 18-22 shots, ASL 2.7-3.3 s, 3-4 proof blocks.
- **45 s:** 14-17 shots, 3 proof blocks of 9 / 8 / 7 s (P08 PL-45).
- **30 s:** 9-12 shots, 2 proof blocks; keep exactly one signature move and the implosion.
- **15 s (9:16):** 5-6 shots: hook → order reveal → one structural proof → implosion → lockup. 3D share can stay 60-70%.
- **90 s:** only with a narrator (VO-led explainer, P08 PL-90E); 4-5 blocks of 12.5 / 11 / 10 / 9 / 7.5 s (the last three each 10-40 % shorter, P08 DU-U3).
- Never stretch with longer idle holds: a 3D shot over 3 s needs an event every 0.8-1.5 s [V:19NRDv rule 12]; Bumper's 6.26 s network shot is its flagged energy dip [V:19NRDv §13 flaw 7].

---

## 4. Story structure with exact beat timings

### 4.1 Template T-STRUCT: "Disorder → Order → Inside → Whole → One"

| Stage | Job | Dimensional level | Signature device |
|---|---|---|---|
| 1. Hook | Frame 0 already in motion; one line of tension | D0 type over D3 light paths | Motif already moving on f0 [V:19NRDv rule 1] |
| 2. Setup (disorder) | The problem drawn as a structure that fails | D3 | Tangle of paths; failures in red; drift + push |
| 3. Reveal (order) | Disorder snaps into the product's structure; name | D3 → D0 | Chaos-to-order straighten; light build into the wordmark (TR-14) |
| 4. Proof (inside) | 3 structural demonstrations | D2-D4 | Fly-in + flatten (3E-01), extraction → push-through (3D-U7), stepped orbit (3D-U4), failover by colour [V:19NRDv] |
| 4b. Signature (whole) | The whole system in one move, at ≈45-55% | D4 | Screen-to-world pull-back (3D-U6) |
| 5. Breather | Benefit lines over an idling structure | D3, motion <10% of peaks | Music breakdown |
| 6. Climax (one) | Many → one | D4 | Implosion 8 f + ≤12 sparks + halo (3D-U14) |
| 7. Resolution | Tagline, flat lockup, CTA, still | D0 | Motif becomes full stop / logo stroke / underline |

### 4.2 Stage windows by runtime (30 fps, 100 BPM grid: beat 18 f = 0.6 s, bar 72 f = 2.4 s)

Windows follow P01 §2.3 and P08 PL-60, snapped to whole bars so every stage boundary is a downbeat (P09 §16.3.2). Percentages are of runtime.

| Stage | 30 s (900 f, 12.5 bars) | **60 s master (1800 f, 25 bars)** | 90 s VO-led (2700 f) |
|---|---|---|---|
| 1. Hook | 0-2.4 s · f0-72 · 8% | **0-2.4 s · f0-72 · 4%** | 0-3.0 s · f0-90 · 3% |
| 2. Setup (disorder) | 2.4-4.8 · f72-144 · 8% | **2.4-7.2 · f72-216 · 8%** | 3.0-9.6 · f90-288 · 7% |
| 3. Reveal (order + name) | 4.8-7.2 · f144-216 · 8% | **7.2-12.0 · f216-360 · 8%** (name on f216 = 7.2 s) | 9.6-14.4 · f288-432 · 5% |
| 4. Proof blocks | 7.2-21.6 · f216-648 · 48% (2 blocks: 7.2 / 7.2 s) | **12.0-40.8 · f360-1224 · 48%** (3 blocks: 10.8 / 9.6 / 8.4 s) | 14.4-64.8 · f432-1944 · 56% (5 blocks) |
| 4b. Signature move (inside block B) | at 14.4 s · f432 · 48% | **at 28.8 s · f864 · 48%** | at 43.2 s · f1296 · 48% |
| 5. Breather | — (fold into climax) | **40.8-45.6 · f1224-1368 · 8%** | 64.8-72.0 · f1944-2160 · 8% |
| 6. Climax (implosion) | 21.6-25.2 · f648-756 · 12% | **45.6-52.8 · f1368-1584 · 12%** (implosion at 49.2 s, 82%) | 72.0-80.4 · f2160-2412 · 9% |
| 7. Resolution | 25.2-30.0 · f756-900 · 16% | **52.8-60.0 · f1584-1800 · 12%** (tagline 2.4 s + lockup 2.4 s + CTA/still 2.4 s) | 80.4-90.0 · f2412-2700 · 11% |

Proof blocks shrink as the film goes on (10.8 → 9.6 → 8.4 s), following kivi's 14.75 → 11.03 → 6.69 s and P08 §15.16 [V:1-6l8S].

### 4.3 Timing landmarks (hard requirements)

| Landmark | Requirement | Source |
|---|---|---|
| Frame 0 | Motif or hook text visible on f0; first change by f3 | P11 defaults #24 |
| Hook length | 1.2-2.4 s, ≤7 words (≤5 in 9:16 and spots ≤15 s) | P01 H2; P07 §9.11.1 |
| Product name | On screen by **≤8 s** (60 s master: 7.2 s) | P01 R1 (6/6 product refs show the product or mechanic by 8 s) |
| First structural proof | Starts by **≤12 s** | P08 PL-60 (reveal ends 9.5 s) |
| Signature move | **45-55% of runtime**, loaded by a 70-350 ms gap, hit 0-3 f after the picture | P10 ST-B reveal row; [V:1CSXtQ t=18.95-19.05s] |
| Hero moments | 4-6 per 60 s, ≥9 s apart except climax → lockup, each followed by ≥30 f of calm | P08 §15.9 |
| Breather | A music breakdown of 6-15% of runtime (low-pass or −7 to −17 dB) under the densest reading, or a visual breather of 10-15% | P08 ER-U11; P09 SD-U7 |
| Climax | Starts at 75-85% of runtime; the implosion is the densest moment | P01 §2.3 |
| Final still | Lockup + CTA **dead still ≥2.5 s** (≥4 s with a QR); music resolves on it | P10 ST-B; [V:19NRDv rule 15] |

---

## 5. Shot list template

One row per shot. Fill every field before modelling; an empty field is a decision left to the renderer (P11 §22.1 D).

| Field | What to write | Example |
|---|---|---|
| `id / stage` | Shot number, stage, block | `#08 · Proof A · Ingest` |
| `in-out (f)` | Frames at 30 fps, on the bar grid | `f576-684 (3.6 s)` |
| `story fact` | The 3D-U1 sentence this shot proves | "We go deeper into the same thing: one event out of the stream" |
| `level` | D0-D4 | `D4` |
| `planes` | Background / focal / foreground (≤3, 4 only in the hero) | `fog wall / event table → event card / passing rows` |
| `camera` | One CM- move + start/end framing + duration + ease + peak % W/f + lens | `CM-15 push-through 9 f E-OUT, peak 8% W/f, ≈85 mm look, roll 0°` |
| `object motion` | Verb + frames + ease (fly-in, flatten, flip, extract, recede, implode) | `row lifts 4% H over 15 f E-OUT` |
| `UI / product action` | Real UI state change and its frame | `fields type in 2-4 f stagger from f630` |
| `text` | Copy, size token, position, in-frame | `"Every event, *captured*." 64 px, lower-left, f636` |
| `light` | Key direction, emitters, fog % | `key upper-right; cyan emitter on the event; fog 10%` |
| `material` | One of ≤3 film materials | `matte UI plane` |
| `DOF / blur` | Focal plane, background blur % W, shutter | `focus on card; bg 3% W; 180°` |
| `transition out` | TR- card + cut frame | `TR-11 shrink ×0.85 E-EXIT 8 f, cut f684` |
| `sound` | SFX family + frame + level | `F07 whoosh peak f617 (+4 dB)`; `F11 hit f580` |
| `music` | Section + bar | `groove, bar 9` |
| `route` | kit scene / custom Remotion / 3D render / generated plate | `3D render (Blender) → kit clip` |
| `QC risk` | The one thing most likely to fail | `plane intersection mid push-through (3D-A2)` |

---

## 6. Style direction

### 6.1 Visual concept and world rules

- **Concept sentence (write it first):** one line that says what the structure *is*. Example: "Inside the system, chaos becomes layers."
- **World rule:** claims live flat in the dark (D0); proof lives in a lit 3D studio (D2-D4). This is Bumper's "Night claim / Day proof" split moved into a single dark studio [V:19NRDv rule 4].
- **Motif (≥3 roles):** one light element that travels through the film, as in 8/8 references (P01 CD-K1). Example: a 6 px cyan event pulse with a short trail. Roles: hook spark → path through the layers → reroute arc → the point everything implodes into → the logo stroke → the CTA underline.
- **Environment:** a palette-lit studio: deep navy radial, a fog or horizon falloff, no modelled detail behind the focal plane (P10 3E-07, 3D-U19). **No HDRI skies, glossy floors, mirror reflections, chrome or lens flares** (P10 3D-A8, 3D-A11).
- **Materials (≤3 per film, one per object family; P10 3D-U17):**
  1. **Matte UI plane:** off-white or brand-tinted surface, soft large shadow, no specular (every UI plane).
  2. **Emissive accent:** self-lit accent with falloff ≈10% H; used only for "active", "flowing", "selected" [V:1ccYWJ].
  3. **One of:** frosted glass (nodes, hubs; only where something is behind it, DP-13) **or** extruded accent edge 6-8% of card depth [V:1ccYWJ t=16.10-18.83s].
- **Depth recipe:** shadows + DOF + parallax as one optical model (DP-01; Bumper, HubSpot's beat). Three planes; four only in the signature shot (DP-02).

### 6.2 Colour

**Palette preset "Deep Studio" (example; replace hues with the brand's, keep the roles and contrast):**

| Token | Hex | Role | Share of frame |
|---|---|---|---|
| `bg-void` | #070B1A | Canvas, studio far wall (dithered radial to #0E1530 at the key side) | 50-70% |
| `surface` | #121A33 | Hubs, nodes, back panels | 10-20% |
| `plane` | #E9EEF7 | Matte UI planes (never pure #FFFFFF) | 10-30% in proof shots |
| `text` | #EEF2F8 | Type on dark | — |
| `muted` | #8A94AD | Secondary type, inactive paths at 30-40% opacity | — |
| `accent` | #4FD1FF | The motif, the "flowing/active" state, the one accent word per line, emitters | **≤5% of frame** |
| `fail` | #FF4D5E | Failure state inside UI and network only (never in type) | ≤2%, ≤2 s at a time |

Rules:
- **One accent** carries state and light; status colours live only inside UI or system states, and the system's behaviour is told by colour changes alone where possible (red → reroute → accent) [V:19NRDv rule 10].
- **Contrast:** body text ≥4.5:1; large text ≥3:1; anything over a render or plate ≥7:1 or on a ≥60% scrim (P07 #22). Data marks ≥3:1 against their background; violet glass on navy failed this [V:19NRDv t=11-14s].
- **Fog and far planes** fade toward `bg-void` (atmospheric perspective, DP-12); context dims to 15-50% behind the focal object.
- **ΔE00 ≤ 2** for the accent between shots and between 2D and 3D passes (P11 defaults #5). Pick the accent in the composite, not in the 3D package's linear space.
- **Dither every gradient 1-2%**; deep navy bands at delivery bitrates without it.

### 6.3 Light

- **One key direction for the whole film** (upper-right in the example), shared by 3D speculars, 2D drop shadows, glass rims and every generated plate (P10 3D-U18; Solar's two light directions are a measured flaw [V:1Hcg3X]).
- Key: soft, large, warm-neutral (#FFE8D6 at low intensity). Rim: cool, from behind-left, ≈1 px on plane edges. Fill: the palette, not a sky (3D-U19).
- **Emitters only glow:** the motif, active nodes, the "on" layer. Glow radius ≈1-2% of frame; on type ≤2-3% of cap height (DP-14; Bumper's bloom smears "Save" for 3-4 f [V:19NRDv t=7.2s]).
- **Light is the state language:** inactive = unlit (muted, 30-40%); active = emissive accent; failed = red, then recede; selected = brightest element in frame (3D-U20).
- **Light build as a transition:** glow area ramps ×4-10 over 0.8-2.1 s and the cut lands on the brightest frame [V:1ccYWJ t=18.87-21.00s]. Once or twice per film.

### 6.4 Typography (P07)

| Role | Size @1080p (16:9) | @1920p (9:16) | Weight / case | Placement |
|---|---|---|---|---|
| Hero word (claim cards) | **Cap 12% H ≈ 130 px cap, 185 px font** (range cap 12-33% H) | 240 px font | 300-500, sentence case, tracking −2% | Centred, centre-line y 47-52% H |
| Statement line | **90 px font, cap 5.8% H** | 128 px font | 300-400 | Centred, 35-70% W |
| Caption over 3D | **64 px font, cap ≈4.2% H** (≥3% H floor) | 72-84 px font | 400 | One fixed slot for the whole film: lower-left, x 8% W, baseline y 86% H, in a clean area the render leaves empty |
| Kicker / layer label | Cap 2.5-3% H, tracked caps +4-6% | 40-44 px | 500 | Above the caption, or flat beside the plane it labels |
| UI text on planes | Must-read values cap **≥3% H after the camera move**; everything else is texture | ≥52 px for must-read | UI's own face | Flatten the plane to ≤15° before it is read |
| Wordmark | Official SVG only, 25-35% W at lockup | 60-70% W | — | y 45-50% H |

Rules:
- **One sans family** for all film copy (+ the UI's own face inside planes). Light 300 for cinematic calm, 500 for the claim slam.
- **≤6 words per read frame**; claim lines 2-5 words; 35-55 words of film copy per 60 s.
- **Copy never lives in 3D.** It is composited flat on the focal plane, facing camera, sharp (P10 3D-U9). Text-on-path and 3D type only for words already known (the brand name), once.
- **Never place type over moving 3D without a clean area**: design the empty band into the camera framing (P10 ST-B typography row).
- Words in a build start **9 f apart** (an eighth note at 100 BPM); entrances rise + blur 9-12 f E-OUT; exits 4-8 f E-EXIT (P07 #12-14).
- **0% overshoot on type.**

---

## 6b. Technique classes for this format

Each row cites master IDs; the class of an ID is the master's (U universal, S style-specific, X experimental, A avoid, SaaS). The format column says how this format uses it. Assignments to this format are [inferred] from the guideline's own sections unless an evidence tag is given.

| Class | Techniques for this format (master IDs) |
|---|---|
| Universal | One move per shot with a CM- ID, roll 0; rack focus CM-18; parallax CM-11; macro CM-13; motion-match cuts TR-04; blur transitions TR-13 |
| Format-specific | Cinematic 3D style ST-D: hero dolly CM-04 [S / X], stepped orbit CM-10 [S], screen-to-world CM-16, depth transitions TR-12 (true 3D) [S]; light as motion ML-27 [S]; tempo per P09 SD-U8 cinematic exception |
| Experimental | Fly-through / portal CM-15 and TR-16 [X]; crane CM-09 [X]; lens-distortion zoom-out CM-19 [X]; camera through type TC-11 [X]; 3D object anchored over 2D swaps HR-07 [X] |
| Avoid | DOF and parallax on every shot (P04 DP-A1); holograms, neon, flares (P11 AA-12); unblurred moves above ≈10 % W/f (strobe); over-loud masters (P09 SD-A2) |
| Especially good for SaaS | Screen-to-world CM-16 so the UI stays real and readable; colour-state narratives ML-28 for reliability or failover; real UI composited onto 3D planes, never generated (AA-U1) |

## 7. Motion language (with numbers)

### 7.1 Ease tokens to use (P03 §19.3)

| Token | Bezier | Use in this format |
|---|---|---|
| E-SNAP | (0.05, 0.7, 0.1, 1) | 3D fly-ins landing (58% of travel on f1, 98% by f8); hero-word slams |
| E-SNAP-L | (0, 0, 0, 1) | Counters to a final value; horizon or "sunrise" rises |
| E-OUT | (0.33, 1, 0.68, 1) | Default entrance; edge-on flips; push-through and dolly landings; flatten 28° → 12° |
| E-GLIDE | (0.25, 0.1, 0.25, 1) | Trucks along lanes; cursor travel; route draws that end on screen |
| E-INOUT | (0.65, 0, 0.35, 1) | Pull-backs and push-ins that start and end on screen; chaos-to-order straighten |
| E-HOP | (0.76, 0, 0.24, 1) | **Stepped orbit steps**; hops between nodes |
| E-SETTLE | (0.45, 0, 0, 1), ≥24 f | The decelerating second stage of the screen-to-world pull-back; wide reveals that carry new text |
| E-EXIT | (0.3, 0, 0.8, 0.15) | Recede exits; implosion; shrink into a cut |
| E-ZOOM | constant ratio per frame (log space) | Fly-throughs; exponential pull-backs (×0.87 per frame) |
| E-PUNCH | exponential, +18-33% in 3-8 f | The last 6 f before the tagline → lockup cut |
| E-LINEAR | (0, 0, 1, 1) | Camera drift and breathing pushes; pulse travel along a path; colour ramps |
| E-CRIT | spring stiffness 179, damping 26.8 | Only where a spring API is required; 0% overshoot |

**Banned in this format:** E-SPRING-P, Remotion's default spring (16.3% overshoot), After Effects default Easy Ease on entrances, and any squash or wobble on planes, glass or nodes (P10 3D-U16).

### 7.2 Motion numbers card

| Parameter | Value | Evidence |
|---|---|---|
| 3D fly-in | **12-22 f, E-SNAP, 180° blur in transit, crisp at rest**; enter on a curved arc at 30-45° to camera | [V:19NRDv t=4.97-5.70s, 16.77-17.17s] (P10 3D-U11) |
| Flatten before reading | **28-45° → ≤15° in 12-18 f E-OUT**, before any must-read text appears | P10 3E-01; DP-19 |
| Edge-on flip / unfold | **90° → 0° in 6-8 f E-OUT**; accent edge → white face reads as "on" | [V:1ccYWJ t=16.10-16.37s] [V:1i2L14 t=24.53-24.73s] (3D-U12) |
| Extraction | Target lifts forward **3-5% H over 15 f** (≈0.5 s) before a push-through | [V:19NRDv t=17.6-18.2s] |
| Push-through | **9 f**; foreground blurs and falls away; target stays sharp and rotates face-on | [V:19NRDv t=18.25-18.55s] (3D-U7) |
| State fill | Colour wipe **4-5 f** with a feathered edge (matched, active, rerouted) | [V:19NRDv t=20.37-20.50s] |
| Recede exit | Scale to **≈50% and dim over 8 f E-EXIT**, or yaw away over ≈32 f, then cut | [V:19NRDv t=6.90-7.17s, 28.9-29.95s] (3D-U13) |
| Implosion | **≈8 f E-EXIT**, then **≤12 sparks over 10 f** + soft halo, then ≥30 f calm | [V:19NRDv t=55.00-55.60s] (3D-U14) |
| Particles | Made of on-screen material, with a direction and an end state: 200-300 discs for a data transfer (Ø ≈1.1-2.1% H), ≈60 for a field, ≤12 sparks for a burst; one particle event per film plus the climax burst | [V:1CSXtQ t=19.00-20.47s] (3D-U8; P11 defaults #10) |
| Pulse travel | Constant speed along its path, **1-2% W/f**, trail 10-18% W, E-LINEAR; branching forks land E-OUT 6 f | [inferred from 2D route draws, P10 2M-16] |
| Idle motion | **One axis only**: Y-spin ≤6°/s, bob ≤0.5 px/f, or a slow ring rotation; abstract cores drift with periods of minutes | [V:1i2L14] [V:19NRDv t=5.7-6.9s]; [E] orb (3D-U15) |
| Counters | ≈1 s, E-SNAP-L (70% of the range in the first 25%), lock and hold ≥1.0 s | [V:19NRDv rule 8] |
| Overshoot | **0%** on planes, UI, type, logo and camera | 7/8 references (P03 §19.6) |
| Simultaneous motion | ≤1 primary + ≤2 secondary motions per frame window | P11 AA-T6 |
| In-shot events | Every **0.8-1.5 s** in any shot over 3 s | [V:19NRDv rule 12] |
| Motion blur | **180° on every 3D camera and object move**; none on flat type and UI cards (blur them only on entrance/exit) | P10 3D-U22; DP-08 |

### 7.3 Signature devices (pick 3-4 per film; each once, except the stepped orbit)

| Device | Story fact | Spec |
|---|---|---|
| Chaos-to-order straighten | "The product brings order" | ≈40 tangled paths straighten into parallel lanes in **30 f E-INOUT**, then stack into layers in 18 f E-OUT |
| Extraction → push-through | "We go deeper into exactly the data that matters" | Lift 15 f → push-through 9 f → state fill 5 f (UI-P5) |
| Screen-to-world pull-back (the signature) | "Here is the whole system" | ×0.57 in 10 f, environment fades in over ≈6 f, then ×0.56 over 18-20 f E-SETTLE (×0.32 total by ≈30 f) [V:1CSXtQ t=18.00-19.03s] |
| Failover by colour | "If one part fails, it reroutes" | Node to red in 1 f, recede ≈50% + dim over 8 f, new arc draws 18 f E-INOUT, destination to accent in 4 f [V:19NRDv t=39.87-46.13s] |
| Ring + implosion | "Many become one" | Ring of 12-30 items, 2 stepped rotations of 10 f, implosion 8 f, ≤12 sparks [V:19NRDv t=52.75-55.60s] |
| Hero dolly through foreground | "Into the core" | ×2-2.5 in ≈15 f E-OUT through foreground pulses that go to bokeh [V:1CSXtQ t=19.95-20.47s] |

---

## 8. Camera language

### 8.1 Rules

1. **A real, critically damped camera: 0% overshoot, 0° roll** (≤1° incidental drift inside a dolly) (3D-U2; 8/8 references).
2. **Lens feel: moderate telephoto (≈50-85 mm look) for any shot with UI on planes**: rectangles stay rectangular, text stays undistorted. HubSpot's window converges only 272 vs 260 px across its width [V:1CSXtQ §7]. A wide (≈18-24 mm look) lens only for one declared "speed" or "scale" beat (3D-U3).
3. **The camera never stops between beats:** drift **≈1-3% of frame per second** on every 3D shot ("never static on UI" [V:19NRDv §7]). Only the final lockup is still.
4. **Move in steps, not spins.** Stepped orbit: **9-12 f per step (E-HOP), steps ≈1.2-1.3 s apart** = 2 beats at 100 BPM [V:19NRDv t=29.97-35.93s]. BRIDGE for strips and decks: decelerate 11-14 f → dwell 6-7 f below 15% of peak → accelerate 13-21 f [V:15VhHR]. **Never a continuous 360°** (3D-A4).
5. **Read-safe speed:** while text or a value is read, camera ≤0.2% W/f (P04 defaults #3).
6. **Speed bands:** glide 0.5-4% W/f; fast glide 4-10% W/f needs 180° blur; snap/whip 10-25% W/f only into a cut, with blur (P04 §0.3). Lottieicon's unblurred 22-27% W/f pans strobe [V:1ccYWJ t=27.40-32.57s].
7. **One signature move per film** (CM-U10); here the screen-to-world pull-back at ≈48%.

### 8.2 Move card for this format

| Move | Spec | When |
|---|---|---|
| Drift | 1-3% of frame per second, E-LINEAR, plus breathing push 1.04-1.10× per hold | Every 3D hold |
| Fly-in camera follow | Camera eases with the arriving plane, settles 4-6 f after it | Proof-block openers |
| Push-through (CM-15) | 9 f; foreground falls away defocused (rack 8-12 f) | Into one record, one layer |
| Dolly / truck along lanes (CM-06) | E-GLIDE, peak ≤1.5-4% W/f, motion blur along the travel | Following a pulse or a row stream [V:19NRDv t=21.6-22.7s] |
| Stepped orbit (CM-10) | 9-12 f steps, every 1.2-1.3 s, each step lands on a labelled target | Around a hub or ring |
| Screen-to-world pull-back (CM-16) | ×0.57 / 10 f, then ×0.56 / 18-20 f; velocity hand-off across the preceding cut (exit 7 px/f E-EXIT → entry 34 px/f E-OUT @720) | The signature, once |
| Hero dolly (CM-04) | ×2-2.5 in ≈15 f E-OUT through a foreground layer to bokeh | Into the climax |
| Crane / pedestal (CM-08/09) | Edge-on (0°) → 20-30° above a layer stack over 36-48 f E-INOUT | Establishing the stack after the reveal |
| Cut-in (CM-13) | 2-3.5×, instant, on the beat | From a wide plane to the one value |
| Angle-change cut | Steep perspective → face-on, on the beat | From transit to reading [V:19NRDv t=22.70s] |

### 8.3 Depth and focus

- **Focal plane always sharp; background blur ≥2-4% W (≈40-75 px @1080p); foreground goes to bokeh as it exits** (3D-U21; DP-05, DP-07).
- **Rack focus 8-12 f E-OUT** to move attention between planes or to hide a swap (DP-06).
- **Parallax:** foreground 1.3-2× the focal plane's speed, same direction, only while the camera moves (DP-09).
- **DOF is a camera property:** never on flat D0 claim cards (DP-08).

### 8.4 Camera budget (60 s master)

Breathing/drift on every shot; **14-20 motivated moves** (one per ≈3 s, Bumper's rate for kinetic × 3D, P04 §6.4); **1 signature** (pull-back); **2-3 stepped orbits**; **1-2 push-throughs**; **1 hero dolly**; **1 punch** (tagline → lockup). 30 s: 7-10 moves, 1 signature, 1 orbit, 1 push-through.

### 8.5 9:16 camera

- Re-stage, do not crop: rotate the layer stack to read **vertically** and favour pedestal and push moves; lateral moves ≤50% of frame width (P04 §6.5).
- Keep captions in y 270-1210; end every camera move with the read inside the safe band (Bumper's orbit clipped a caption for 5 s in 16:9 [V:19NRDv t=30.9-35.9s]).
- Camera on ones (native 30 fps) always.

---

## 9. Transitions

### 9.1 Allowed transitions (P05)

| Transition | Where | Spec | Sound |
|---|---|---|---|
| **Hard cut on the beat** (TR-01/02) | Between claim cards and proof shots | Picture 0-2 f before the beat | None (the kick is the accent) |
| **Push-through** (TR-12) | Into a record, a layer, a node | 9 f, foreground defocus | F07 whoosh peaking on the fastest frame (≤1 of the film's 2 whooshes) |
| **Seamless camera move** (TR-17) | Reveal → stack, dedupe → signature pull-back | Velocity matched across the join | Under music |
| **Velocity hand-off match cut** (TR-04) | Into the signature pull-back | Same direction, ease-in before, ease-out after | Small hit ≈3 dB over the bed [V:1CSXtQ t=17.80s] |
| **Tilt onto a plane** (TR-15) | 2D → 3D handover (wordmark lines become layers) | 18 f E-OUT, rotateX 90° → 20-30° | None |
| **Recede-and-cut** (3D-U13) | Leaving a 3D group | ≈50% + dim over 8 f, cut | None, or F12 sub on the cut |
| **Light build → hard cut** (TR-14) | Into the reveal; into the climax | Glow ×4-10 over 24-64 f, cut on the brightest frame | Riser crest 0-2 f before the cut, 67-200 ms gap |
| **Rack focus / defocus dissolve** (TR-13) | Into the breather | 8-12 f | F11 hit within 1-2 f of the start, or none |
| **Particle dissolve** (TR-06) | One data-transfer moment | 28 f sweep, particles from the source's own two colours | 70 ms gap → hit 1.5 f after it starts |
| **Anchored-element cut** (TR-23) | Climax → tagline (the motif holds its pixel ±1 px) | — | — |
| **Punch → hard cut** (TR-11) | Tagline → lockup | +18% in the last 6 f, E-PUNCH | 200 ms gap, sting on the cut |

### 9.2 Budget (60 s)

22-33 scene changes including seamless joins; **5-10 signature-device uses**, **3 hero one-off transitions** (light build, velocity hand-off, punch), **≤2 decorative mask wipes** (prefer 0), **≤1 flash** (≤3 f per colour) (P05 §7.5).

### 9.3 Never

- **Crossfade between 2D and 3D** (P10 HY-U, defaults #24): hand over only through a motivated move (tilt onto a plane, screen-to-world, edge-on flip, collapse into a slot).
- Model-invented transitions ("morph into…") in generated clips (P11 AA-A2).
- 1-frame dips to black between light and dark worlds [V:19NRDv t=25.60s]; use a clean cut or a 2-4 f luma dip.
- Glitch, RGB-split or light-leak packs as transitions (AA-12 "generic neon tech").
- Whooshes on every cut (0-2 per film, P09 defaults).

---

## 10. UI treatment

1. **Real UI only**, from the design file or a capture at ≥1.5× output size, mapped as a texture on matte planes (P06 UI-R; P10 3D-A9). Never generated, never greeked when it will be read.
2. **Fly in tilted, read flat:** 30-45° in transit, **≤15° while read**, settled 12-22 f (3E-01).
3. **Context → extraction → focus:** show the whole table, lift the relevant row or column for 0.5 s, push through in 9 f, show the state change with a 4-5 f fill [V:19NRDv rule 7].
4. **Readable floor:** any value the viewer must read has cap ≥3% H *after* the camera move; scale up the one value that matters (Bumper's "100%" at cap ≈6% H) and let everything else be texture [V:19NRDv §16].
5. **State language by colour and light, not labels:** inactive (muted, unlit), flowing (accent emitter), failed (red, then recede), recovered (accent). A non-technical viewer should follow the story with the sound off [V:19NRDv #21 WHY].
6. **Cursor:** either a branded 3D cursor in the accent with a contact shadow, the same one in every UI scene, flying in over ≈12 f and getting a visible reaction within 6-8 f of each click [V:19NRDv rule 9], or a native OS arrow at ≈2% H for "honest" product truth. Pick one per film (3E-05).
7. **One click per film is the decisive one:** music suck-out ≥15 dB on the press frame, cut ≈8-9 f later, hit ≈4 f after the result appears [V:15VhHR t=12.20-12.6s].
8. **Data realism:** real column names and plausible values from the brand's data sheet; every number approved; placeholders flagged in the spec and removed before master (P11 AA-08).
9. **Device frames:** none by default; a generic untextured frame only if the context is a device; modelled hardware only for hardware products (3E-11).
10. **Planes never intersect.** Step every 3D move at 1-frame increments (HubSpot's planes intersect at 18.4-19.0 s [V:1CSXtQ]).

---

## 11. Sound and music

### 11.1 Music brief (P09 §16.2.4)

| Field | Spec |
|---|---|
| Character | **Hybrid cinematic-electronic**: sub drops, low synth swells, filtered pulses, long-tail impacts, a restrained arpeggio; or bass-forward electronic for a faster brand |
| Tempo | **100 BPM** default (beat 18 f, bar 72 f, every cut lands on whole frames); range 70-112 (P09 §16.2.2 [inferred for this style]; Bumper 100.0 measured [V:19NRDv §12]) |
| Arc | Sparse sub intro → riser into the reveal → groove-in on the first product moment → suck-out on the decisive click → build into the signature (loudest hit) → **low-pass breakdown** under the densest 3D UI and the breather → long build into the climax → sting on the lockup → tail to the last frame |
| Avoid | Trailer drums, choirs, braams (none in the set, P09 SD-MU3); stock "tech" glitch beds; a track that ends before the picture [V:1ccYWJ t=40.5s] |
| Licence | Licensed or commissioned; generated audio from video models muted (AA-G10) |

### 11.2 Music arc for the 60 s master

| Time (s) | Frames | Bars | Music event | Picture |
|---|---|---|---|---|
| 0.0-7.2 | 0-216 | 1-3 | Sparse sub kick every 2 beats (f0, f36, f72…); pad | Hook, disorder |
| 2.5-7.1 | 75-214 | 2-3 | Riser F09, crest f212-214; gap f214-216 (67 ms) | Order straighten, light build |
| 7.2 | 216 | 4 | **Drop / groove-in** (0 f after the picture) | Name reveal |
| 7.2-18.9 | 216-567 | 4-8 | Groove: pulse, arp | Ingest block |
| 18.9-19.3 | 567-580 | 8 | **Suck-out ≥15 dB** from the click f567 | Click → push-through |
| 19.3 | 580 | 9 | Re-entry + F11 hit (4 f after the result appears) | Event extracted |
| 21.6-28.6 | 648-857 | 10-12 | Build (high band rises) | Process block |
| 28.6-28.8 | 857-864 | 12 | Gap 233 ms at ≤ −35 dB | Velocity hand-off |
| 28.8 | 864 | 13 | **Loudest hit of the film** (F11 + F12, +12 dB over the bed) | Signature pull-back |
| 32.4-45.6 | 972-1368 | 14-19 | **Low-pass breakdown** (centroid ≈250-300 Hz, kicks kept) | Failover, dashboard, breather |
| 45.6-49.0 | 1368-1470 | 20-21 | Long build, riser F09 crest f1468 | Climax ring |
| 49.0-49.2 | 1470-1476 | 21 | Gap 200 ms | — |
| 49.2 | 1476 | 21 | F11 hit on the implosion | Many → one |
| 52.6-52.8 | 1578-1584 | 22 | Gap 200 ms | Punch |
| 52.8 | 1584 | 23 | **F17 sting**, sustained under the lockup | Lockup |
| 52.8-60.0 | 1584-1800 | 23-25 | Sting tail and pad; ≤ −60 dB on f1800 | Lockup, CTA, still |

### 11.3 SFX map (families from P09 §16.7; budget 9-15 designed sounds per 60 s)

| Family | Count | Placement rule | Level | Frames in the worked example |
|---|---|---|---|---|
| F12 sub boom | 3 | Fill frame or **camera peak velocity ±2-3 f**; spacing ≥1.4 s; add a 100-300 Hz harmonic for phones | Peaks −3 to −9 dB | f0, f216 (stacked with F11), f864 (stacked with F11) |
| F11 impact | 4 | On the cut or event ±2 f after a 70-350 ms gap | +8 to +15 dB over the bed | f216, f580, f864 (stacked with F12), f1476 |
| F09 riser | 2 | Crest 0-2 f before its hit | Crest ≈ −12 dB | f75-212, f1380-1468 |
| F07 whoosh | 2 | Peak on the fastest frame | +3 to +6 dB above 4 kHz | f617 (push-through), f1375 (hero dolly) |
| F08 swish | 1 sequence (≤5) | Each orbit step's start frame | +2 to +5 dB | Orbit steps f450, f810, f990, f1404, f1422 |
| F01 click | 1 | Press frame, 0 f | Clear inside the suck-out | f567 |
| F06 data ticks + lock | 1 | ≤15 ticks/s during the count; lock accent on the final-value frame | Low; lock at F01 level | f1092-1122, lock f1122 |
| F14 data texture | 0-1 | Under the particle sweep only, ≤10-15 f, or silence instead | −6 to −10 dB | Prefer silence |
| F16 ambience | Continuous | Studio air under every "silence" | Floor −40 to −45 dB | Whole film |
| F17 sting | 1 | ±2 f of the lockup's first full frame; 1.2-2.2 s sustain | Loudest sustained moment | f1584 |

**Never sounded:** card flips mid-sequence, idle spins, every cut on the grid, every pulse. Sounded transitions: 15-65% of transitions, never all (P09 defaults).

### 11.4 Mix

- **−14 LUFS ±1 integrated, ≤ −1 dBTP**, measured on the final MP4 (NOSTRA's −7.9 LUFS / +1.6 dBTP is the anti-pattern [V:1i2L14]).
- Mid-film "silence" floor −40 to −45 dB; digital silence only in the last 0.3 s.
- With a narrator: master per P09 §16.11.1 (−14 LUFS ±1 for social and web, −16 for a landing-page embed), music ducked 10-12 dB (attack 30-80 ms, release 250-700 ms); words appear 0-2 f before they are spoken, never after.
- **The film must work muted:** the state language (colour, light, geometry) and the captions carry the story (6/8 references have no narrator).

---

## 12. Copy rules

### 12.1 Budget

| Item | Rule |
|---|---|
| Film copy (outside UI) | **35-55 words per 60 s**; 20-30 per 30 s; 8-14 per 15 s |
| Per read frame | ≤6 words; claim lines 2-5 words |
| Captions over 3D | ≤5 words, one fixed slot, landed hold ≥0.8 s (P07 #15) |
| Layer labels | 1 word each, the product's real component names ("Ingest", "Store", "Process", "Deliver") |
| Numbers | Only supplied, verified numbers; one number per shot; placeholders marked in the spec |
| Voice | Declarative, present tense, concrete nouns of the system ("events", "regions", "retries"), no hype adjectives, no exclamation marks |

### 12.2 Hook patterns that fit this format (P01 §2.5)

| Pattern | Example (fictional) | Visual |
|---|---|---|
| The system speaks | "Your systems never stop *talking*." | A pulse already moving on f0 forks into a tangle |
| Scale fact (verified only) | "*2 billion* events. Every day." | Counter on a flat card, then the stream in 3D |
| Failure first | "One region goes *dark*." | A node turns red and recedes on f0-f20 |
| Invisible made visible | "You've never *seen* your data." | Pull-back from a single pulse to a field of thousands |
| Question | "Where does a *click* go?" | One click, then the camera follows its event through layers |

### 12.3 Claim lines (one benefit word in the accent, ≤5 words)

"Connect *any* source." · "Every event, *captured*." · "Exactly *once*." · "Regions fail. Events *don't*." · "*One* backbone. Every layer." · "Nothing *dropped*." · "Scale *without* rewrites."

### 12.4 CTA examples (technical next step; P01 §2.11)

| CTA | Sub-line | When |
|---|---|---|
| "Start streaming →" | strata.example | Self-serve platform |
| "Deploy in 5 minutes →" | docs.strata.example/quickstart (only if verified) | Developer platform |
| "Read the architecture →" | strata.example/architecture | Infrastructure for architects |
| "Book a technical demo →" | strata.example/demo | Enterprise, sales-led |
| "Try the free tier →" | strata.example | PLG |

Tagline: ≤5 words, rhymes with the hook ("Your systems never stop talking." → "Every event. Delivered.").

---

## 12b. Typography

One place for this format's type decisions; sizes are P07 §9.2 tokens (font px at 1920×1080 / 1080×1920), entrances and exits follow P03 SP-T0, word budgets and holds follow P01 H2 and P07 §9.11.

| Item | This format |
|---|---|
| Families and weights | One sans for all film copy (+ the UI's own face inside planes); 300 for cinematic calm, 500 for the claim slam (§6) |
| Size tokens | Caption over 3D in one fixed slot: 64 px font at 16:9 (cap ≈4.2 % H), 72-84 px at 9:16; T-STATEMENT 90 / 128 px; T-HERO 185 / 240 px for the claim slam |
| Reveals | RV-04 rise + blur + fade, RV-18 tonal materialise, RV-19 blur → sharp resolve, RV-12 mask wipe |
| Exits | EX-02 blur dissolve, EX-07 defocus-out then cut, EX-15 occluded or carried out by the 3D object |
| Word budget | Hook ≤7 words (≤5 in 9:16); one caption line at a time; tagline ≤5 words and rhymes with the hook |
| Holds | Punch word 10-15 f; kinetic line of ≤3 words ≥10-14 f landed; statement of 4-6 words ≥0.8 s landed; payoff, result or status ≥1.0 s still; no text event under 25 f except SD-03 punch cards in a run (P07 §9.11.2, P08 §17.8 #3-4); lockup ≥1.5 s still (2.2 s premium) |
| Floors | Must-read text inside the safe area (16:9 x 96-1824, y 54-1026; 9:16 x 120-840, y 270-1210); 9:16 body font ≥52 px; contrast ≥4.5:1 (3:1 large), ≥7:1 or a ≥60 % scrim over footage (P07 §9.21, P11 G-27, G-37) |

## 13. Worked example storyboard: "Strata" 60 s 3D technology film

**Strata is a fictional product** (a real-time event-streaming backbone that connects any source to any destination with exactly-once delivery and regional failover). Every claim and number in its UI is a placeholder that a real brand must replace with verified data. Concept: *"Inside the system, chaos becomes layers."* World rule: claims flat in the dark (D0), proof in a lit 3D studio (D2-D4). Motif: a 6 px cyan event pulse with roles hook spark → path → reroute arc → implosion point → logo stroke → CTA underline. Palette "Deep Studio" (§6.2). 30 fps, **100 BPM** (beat 18 f, bar 72 f). Key light upper-right throughout; 180° motion blur on every 3D move; template T-STRUCT.

| # | Scene | Timestamp (frames) | Duration | Visual | UI / product action | Camera | Object motion | Text | Transition (out) | Lighting | Sound | Music | Motion notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Hook | 0.00-2.40 (f0-72) | 2.40 s | D3: navy void #070B1A, dithered. The cyan pulse is already travelling L → R at y 58% H on f0 with an 18% W trail | — | Truck follows the pulse, E-LINEAR, 1.2% W/f; pull-back ×0.80 over f20-60 E-INOUT | Pulse 1.5% W/f; at f30 it forks into 3 paths (E-OUT 6 f), by f60 ≈40 paths tangle in depth at 30-60% opacity | "Your systems never stop *talking*." 90 px Light 300, centred y 44% H; words at f0, f9, f18, f27, f36 (eighth notes); word 1 at 60% opacity on f0 | Hard cut on the downbeat f72 | The pulse is the only emitter; tangle unlit | F12 sub on f0 (the music's sub kick then repeats every 2 beats) | Sparse sub intro, pad | Text on f0, first change by f3; ≤6 words |
| 2 | Disorder | 2.40-4.80 (f72-144) | 2.40 s | D3: the tangle seen wide: ≈12 unlabelled service nodes (frosted glass discs 3% W) joined by ≈40 crossing paths in 3 depth bands | Pulses fail: 3 turn red #FF4D5E and stop at f96, f114, f132 (one per beat) | Drift 2% W/s + push 1.00 → 1.08 E-LINEAR; 85 mm look | Failed pulses flash red 1 f, then dim to 20% over 8 f | "Some of it never *arrives*." 64 px, caption slot lower-left, in at f84 (rise + blur 12 f) | Seamless: camera keeps pushing into #3 | Key upper-right; fog 20% on the far band | F09 riser starts f75 (low, −24 dB) | Pad + sub every 2 beats | Failures told by colour only; DOF on the near band |
| 3 | Order | 4.80-7.20 (f144-216) | 2.40 s | D3: every path pulls taut and straightens into parallel lanes (f150-180, 30 f E-INOUT), then the lanes stack into 4 translucent strata 8% H apart (f180-198, 18 f E-OUT) | — | Pull-back ×0.85 E-INOUT f144-180, then hold with drift | Straighten 30 f; stack 18 f; pulses now flow cleanly along the lanes at 1% W/f | none | **Light build**: strata glow area ×4 over f192-212; hard cut on the brightest frame f216 (TR-14) | Each stratum's edge becomes an emitter as it settles | F09 crest f212; **gap f214-216 (67 ms)** | Riser | Chaos-to-order is the visual thesis; 3D share starts here |
| 4 | Reveal | 7.20-9.60 (f216-288) | 2.40 s | D0/D2: the 4 strata seen edge-on as 4 horizontal light lines (the symbol); wordmark "Strata" (official SVG) cap 8% H centred above them | — | Locked; push 1.00 → 1.05 E-LINEAR | Wordmark tonal sweep #6F7894 → #EEF2F8 over 36 f, L → R in the last 10 f; lines hold | Wordmark at **7.20 s**; "The event backbone." 64 px at f246, y 62% H | **Tilt onto a plane** (TR-15): the 4 lines rotateX 90° → 25° over 18 f E-OUT from f270; seamless into #5 | Lines are emitters, glow radius 1.5% of frame | **F11 hit + F12 sub on f216** | **Drop on f216** (0 f after the picture) | Name by ≤8 s; 2D → 3D through a motivated tilt, never a crossfade |
| 5 | Stack | 9.60-12.00 (f288-360) | 2.40 s | D4: the 4 matte strata (64% W) in the studio, fog horizon at y 70% H; labels flat beside each layer | Labels "Ingest · Store · Process · Deliver" fade in 4 beats apart (f294, f312, f330, f348), tracked caps cap 2.6% H | Crane: 0° → 25° above the stack over 48 f E-INOUT, then drift | Pulses stream down through the layers (≈30 at a time) | Layer labels only | **Push-through** into the Ingest layer, 9 f (f351-360) | Key upper-right; warm rim on plane tops; fog 10% | — | Groove | Establishing shot; 3 planes (fog, stack, passing pulses) |
| 6 | Proof A: Ingest | 12.00-16.80 (f360-504) | 4.80 s | D3: Ingest plane fills 70% W, tilted 28°; 9 generic source tiles (database, phone, sensor, payments, logs …; fictional glyphs) arrive on curved arcs | Tiles dock and start emitting pulses; "Sources connected" counter 0 → 128 (placeholder) at f432, 30 f E-SNAP-L, held to f504 | Drift 2% W/s; **stepped orbit step 10 f E-HOP at f450** | Tiles fly in 22 f E-SNAP with blur, 4-6 f stagger from f378; plane flattens 28° → 12° over 18 f E-OUT at f414 | Kicker "INGEST"; "Connect *any* source." 64 px at f396 | Hard cut on the downbeat f504 | Tiles lit by the key; each docked tile gets an accent edge (extruded 6%) | F08 swish on f450 | Groove | Events every 0.6-1.2 s (f378, f414, f432, f450, f468); flatten before the counter is read |
| 7 | Proof A: Connect | 16.80-19.20 (f504-576) | 2.40 s | D2: macro on the real "Add source" panel, frontal (0°) on the plane, 62% W | Field "orders-db (Postgres)" types at 28 cps (f510-528); 3D cyan cursor flies in 12 f (f540-552), **presses "Connect" at f567** (button darkens 1 f) | Breathing push 1.00 → 1.06; ≤0.2% W/f while typing | Cursor contact shadow; reaction within 6 f | UI only (input cap 4.2% H) | **Cut on the press +9 f** (f576, downbeat) (TR-20) | Same key | **F01 click on f567** | **Suck-out ≥15 dB from f567** | The one decisive click of the film |
| 8 | Proof A: Capture | 19.20-22.80 (f576-684) | 3.60 s | D4: the event stream as a table of rows on a plane tilted 30°; one row ("order.created · A-1042", placeholder) | Status chip on the row turns "Live" (4 f fill) at f576; result appears f576 | Hold; then **push-through 9 f at f612-621** (peak ≈8% W/f, blur); then slow push 1.00 → 1.05 | **Extraction**: the row lifts forward 4% H over 15 f (f594-609); others fall away defocused (rack 9 f); the event card rotates face-on 0° and its fields type in, 2-4 f stagger from f630 | "Every event, *captured*." at f636 | Card shrinks ×0.85, E-EXIT 8 f, cut f684 | Card edge rim; event card emitter cyan | **F11 hit f580** (4 f after the result); **F07 whoosh peak f617** | **Re-entry f580** | Context → extraction → focus (UI-P5); events every 0.6-1.0 s |
| 9 | Claim | 22.80-25.20 (f684-756) | 2.40 s | D0: navy, dithered | — | Push 1.00 → 1.06 E-LINEAR | "Exactly" rises + blur 12 f at f690; "once." in accent at f708 | "Exactly *once*." hero font 185 px Light 300, centred | Hard cut on the downbeat f756 | — | none (kick only) | Groove | Flat claim card: no DOF, no blur on the hold |
| 10 | Proof B: Dedupe | 25.20-28.80 (f756-864) | 3.60 s | D3: the event card enters the Process layer; three copies of the same event arrive from retries | Copies 2 and 3 dim to 30% (f792), slide into copy 1 and merge (f828, 8 f E-EXIT); a check strokes on (f846, 6 f) | **Truck along the lane** E-GLIDE peak 1.5% W/f; **orbit step 10 f at f810**; then the camera starts to rise | Merge 8 f; check stroke 6 f | Kicker "PROCESS"; "Retries never *double-count*." at f774 | **Velocity hand-off** (TR-04): the merged event shoots up the lane at 7 px/f E-EXIT into the cut f864; gap f857-864 | Merged event emits; duplicates unlit | F08 swish f810 | Build; **gap f857-864 (233 ms)** | Events at f774, f792, f810, f828, f846 |
| 11 | **Signature: the whole system** | 28.80-32.40 (f864-972) | 3.60 s | D4: screen-to-world: from the single event the camera pulls back to reveal the full stack: 4 strata, ≈240 pulses flowing top → bottom, sources docked above, 3 destination regions below, fog horizon | — | **Pull-back ×0.57 in 10 f** (f864-874), environment fades in over 6 f, then **×0.56 over 20 f E-SETTLE** (f874-894; ×0.32 total), then push 1.00 → 1.06 to f972 | Pulses E-LINEAR; foreground pulses pass the lens as bokeh | none for 2.0 s; "*One* backbone. Every layer." at f924, held 48 f | Hard cut on the downbeat f972 | 4 planes (fog, far regions, stack, foreground pulses); key upper-right; emitters only on pulses | **F11 + F12 on f864, loudest hit of the film** (+12 dB over the bed) | Full arrangement | **48% of runtime**; the one signature move; ≥30 f calm after the peak |
| 12 | Proof C: Failover | 32.40-36.00 (f972-1080) | 3.60 s | D3: the Deliver layer as a network: hub, 3 region nodes (fictional "Region A/B/C") | Region A turns red at f1008 (1 f), recedes to ≈50% and dims over 8 f (f1016-1024); a new arc draws to Region B, 18 f E-INOUT (f1026-1044); Region B turns accent in 4 f at f1044 | Drift-orbit 2% W/s; **orbit steps 10 f at f990 and f1062** | Pulses reroute along the new arc; no labels needed | Kicker "DELIVER"; "Regions fail. Events *don't*." at f1050 (after the proof) | Hard cut f1080 | Red node loses its glow as it recedes; Region B becomes the emitter | F08 swish f990 | **Low-pass breakdown** from f972 | Show first, label second; colour states tell the story muted |
| 13 | Proof C: Evidence | 36.00-38.40 (f1080-1152) | 2.40 s | D2: real failover dashboard on a plane at 8°, 60% W | "Events lost: 0" holds; "Rerouted" counts 0 → 12,408 (placeholder) f1092-1122 E-SNAP-L; value locks f1122 and holds 30 f (1.0 s) | Breathing push 1.00 → 1.05 | — | UI values cap 4.5% H after the push | Hard cut f1152 | Same key | **F06 ticks f1092-1122, lock f1122** | Breakdown | Payoff held still ≥1.0 s |
| 14 | Claim | 38.40-40.80 (f1152-1224) | 2.40 s | D0: navy | — | Push 1.00 → 1.06 | Words rise + blur 12 f at f1158, f1176 | "Nothing *dropped*." 185 px Light 300 | Rack defocus 10 f into the breather (TR-13), f1224 | — | none | Breakdown | ≤3 consecutive text cards (here 1) |
| 15 | Breather | 40.80-45.60 (f1224-1368) | 4.80 s | D3: wide studio; the stack idles; pulses at half speed; optional generated haze plate behind the fog, defocused ≥3% W | — | Locked; push 1.00 → 1.04 E-LINEAR | Stack Y-rotation ≤4° total over the shot; nothing else moves | "Less firefighting." / "Less replaying." / "More *shipping*." 90 px, lines 2 beats apart (f1236, f1272, f1308), earlier lines dim to 40% | Hard cut on the downbeat f1368 | Dimmed key (−30%); pulses the only emitters | none (F16 air) | **Breakdown**, pads; build begins f1340 | Motion energy <10% of peaks |
| 16 | Climax: core | 45.60-48.00 (f1368-1440) | 2.40 s | D4: **hero dolly ×2.2 in 15 f** (f1368-1383) through foreground pulses into the stack's core; sources, layers and regions now ride a ring (≈24 items) around the core | — | Dolly ×2.2 E-OUT, foreground bokeh; **2 orbit steps 10 f at f1404 and f1422** | Ring rotates only in the steps | none | Seamless into #17 | Core pulse brightening; ring items rim-lit | **F07 whoosh peak f1375** (dolly peak velocity); F08 swishes f1404, f1422; F09 riser f1380-1468 | Long build | The densest stretch; telephoto feel kept on the ring |
| 17 | Climax: many → one | 48.00-50.40 (f1440-1512) | 2.40 s | D4: the ring tightens, then **implodes into the core in 8 f** (f1468-1476, E-EXIT); **≤12 sparks over 10 f** (f1476-1486) + soft halo; the core is the cyan pulse again | — | Slow pull-back 1.00 → 0.94 E-LINEAR; locked after f1486 | Implosion 8 f; sparks 10 f; then ≥30 f calm (f1482-1512) | none | **Anchored-element cut** f1512: the pulse holds its pixel (±1 px) (TR-23) | The pulse is the brightest frame element; halo 1.4× radius at 25% | **Gap f1470-1476 (200 ms); F11 hit f1476** | Riser crest f1468 | Implosion at **82% of runtime**; motion blur on the implosion |
| 18 | Tagline | 50.40-52.80 (f1512-1584) | 2.40 s | D0: navy; the anchored pulse at the line's end position | — | Push +6% over f1512-1578, then **punch +18% in 6 f** (f1578-1584, E-PUNCH) | Words at f1515, f1533 (beat); the pulse slides 8 f E-OUT into the full stop at f1551 | "Every event. *Delivered*." 130 px Light 300 | **Hard cut on the downbeat f1584** (TR-11 + TR-02) | Pulse halo grows ×2 over the last 30 f | **Gap f1578-1584 (200 ms)** | Build crest | Hook → tagline rhyme; densest edit before the stillest frame |
| 19 | Lockup | 52.80-55.20 (f1584-1656) | 2.40 s | D0: symbol (4 stacked lines, top line cyan) + wordmark, 30% W, centred y 47% H | — | Decelerating push +6%, settled by f1640 | Symbol lines draw L → R 12 f each, 3 f stagger; wordmark tonal sweep 36 f | Wordmark (SVG) | None (CTA joins the frame) | Top line is the only emitter | **F17 sting on f1584** | Sting sustained | Flat lockup: never a 3D logo |
| 20 | CTA + still | 55.20-60.00 (f1656-1800) | 4.80 s | Lockup unchanged; CTA under it at y 68% H | — | **Dead still from f1710** | CTA rises 2% H + fades 12 f E-OUT at f1662; the motif underline draws 14 f E-LINEAR at f1680; then nothing moves | "Start streaming →" (cap 5.2% H) / "strata.example" (cap 3.6% H) | Hard end f1800 (web-loop version: fade to void over 20 f) | — | none | Sting tail to ≤ −60 dB by f1800 | **Still 3.0 s ≥2.5 s**; music ends with the picture |

**Check against the format rules.** Hook 2.4 s, 5 words, text on f0. Name at 7.20 s. First structural proof at 12.0 s. Signature at 28.8 s (48%). Hero moments at 7.2 s (12%), 19.3 s (32%), 28.8 s (48%), 49.2 s (82%), 52.8 s (88%). Breather 8%. Climax from 76%. Resolution 12%. 20 shots, **ASL 3.0 s** (ST-D 2.5-3.5 s). **3D share (D2-D4) 43.2 s = 72%** (ST-D 50-90%); D4 shots (#5, #8, #11, #16, #17) 14.4 s = 24%. Camera: 1 signature pull-back, 6 orbit steps (f450, f810, f990, f1062, f1404, f1422), 1 push-through, 1 hero dolly, 1 crane, 1 punch. 3 materials (matte plane, frosted glass nodes, emissive accent; extruded accent edges on tiles count as the plane material's edge). Sound: 15 designed sounds (3 subs, 4 impacts, 2 risers, 2 whooshes, 1 swish sequence, 1 click, 1 tick-and-lock, 1 sting), 4 gaps, 1 suck-out. Film copy ≈50 words outside the UI.

---

## 14. Building it: motion-kit versus custom 3D, generative video and assembly

**Production principle (P11 AA-U1, P10 §14.5):** generate only what is allowed to vary (atmosphere, haze, organic plates); render deterministically everything that must not (UI, type, numbers, logo, motif, structure geometry, camera timing). In this format most of the picture is **deterministic 3D**, not generated.

| Element | Owner |
|---|---|
| Copy, numbers, logo, captions, UI states | 2D: motion-kit or custom Remotion/AE |
| UI planes, layer stacks, rings, networks, pulses, particles, implosion, camera | **Deterministic 3D**: `@remotion/three` (three.js) for planar and procedural scenes; Blender or Cinema 4D for materials, fog, glass and motion blur |
| Abstract core / orb (if the product has an "intelligence" core) | Code (shader), deterministic per frame [E] |
| Studio haze, far atmosphere, optional lifestyle plate | Generative video, defocused and graded |
| Hardware | Modelled or supplied renders, never generated |
| Sound | Designed mix from the cue sheet; generated audio muted |

### 14.1 What the motion-kit template engine covers

The kit (`motion-kit/`, Remotion 4, 30 fps) builds a film from a JSON spec. Scene types: `hook, kinetic, orb, title, stat, list, compare, bars, grid, quote, prompt, chat, wave, image, clip, cta, logo`. Themes: `midnight, clean, neon, editorial, pop, desi, corporate, mono, studio, studio-dark`. Formats: `reel` 1080×1920, `portrait` 1080×1350, `square` 1080×1080, `landscape` 1920×1080. **The kit has no 3D renderer**: in this format it is the type, UI-card and assembly layer, and every 3D shot enters as a `clip`.

**Theme choice:**

| Register | Theme | Facts (from `src/engine/themes.ts`) | `motion` | `transition` |
|---|---|---|---|---|
| **Deep studio (default)** | **`studio-dark`** + `brand.accent` | Warm black #0C0A09, ivory #FAFAF9 type, Inter 300 display, tracking −0.035 em, `canvas` background, grain on, CTA `link`, plain kickers | `calm` (15 f enter, 0% overshoot, blur word-in) | **`cut`** (the 3D clips carry their own push-throughs and light builds; `cut` keeps scene lengths exact) |
| Engineering / Swiss | `mono` | #0C0C0C, Inter 900 caps, one signal red | `smooth` (override the theme's `snappy`) | `cut` |
| Light enterprise | `corporate` | White, slate, indigo, Plus Jakarta Sans 800, grid background | `smooth` | `cut` or `push` |

Avoid `neon` (acid lime + violet glow on a grid is the "generic neon tech" look, P11 AA-12), `midnight` (condensed poster caps, `snappy` + `push`), `pop` and `desi`. Never set `motion: "bouncy"`.

**Scene mapping (Strata):**

| Storyboard shot | Kit scene | Fields | Fidelity |
|---|---|---|---|
| #1 hook | `kinetic` | `lines: ["Your systems", "never stop *talking*."]` | Partial: type is right; the pulse and tangle behind it are not in the kit (render a `clip` and drop the kinetic over it in the custom build) |
| #2-3 disorder → order | `clip` | `src: "clips/strata-02-03-tangle-to-order.mp4"`, `caption` | 3D render; the caption is composited by the kit (sharp, editable) |
| #4 reveal | `logo` | `name`, `tagline` | Partial: no tonal sweep, no edge-on strata lines. For the real tilt-onto-a-plane handover, render #4-5 as one clip with the SVG wordmark composited in Remotion |
| #5-6 stack + ingest | `clip` | `kicker: "Ingest"`, `caption` | 3D render (merged into one 6.6 s clip because the kit's clip floor is 2.8 s and #5 has no copy) |
| #7 connect | `prompt` | `label`, `prompt`, `button: "Connect"`, `result` | **Good as a 2D stand-in**: typed field, cursor click, result. Flat, not on a plane; the kit times it at 3.9 s (typing + reading) instead of 2.4 s |
| #8 capture, #10 dedupe, #11 signature, #12 failover | `clip` × 4 | `caption`, `kicker`; `#11` without a caption | 3D renders. The kit shows a clip caption from the scene's first frame; #11's "picture first, words at +2.0 s" timing needs the caption baked into the custom build |
| #9, #14 claims; #18 tagline | `title` | `headline` | Good (blur word-in, no overshoot); no punch into #19 |
| #13 evidence | `image` | `src` (real dashboard ≥1.5× width), `fit: "contain"`, `move: "in"` | Partial: no count-up on the real UI. **Do not use `stat`**: its value uses `pop()`, a back-out curve with ≈10% overshoot even under `calm` |
| #15 breather | `list` `style: "lines"` | 3 items | Good: earlier lines dim; no cards, no pop. No idle stack behind it (use a `clip` with `caption` if the stack must stay visible) |
| #16-17 climax | `clip` | `src` | 3D render; implosion and sparks are not in the kit |
| #19 lockup, #20 CTA | `logo` → `cta` `style: "link"` | `name`, `tagline`; `action`, `handle` | Good. The kit's `cta` link style draws the underline; `logo` would add an impact SFX if `audio.sfx` were on |
| Abstract core (optional) | `orb` | `colors: ["#4FD1FF", "#070B1A"]` | Animatic stand-in for a code-driven core; replace with the shader render for the master |

**Kit spec (validated).** `npm run check` times this spec at **60.0 s** (17 scenes, `pace: fast`, `transition: cut`). The only errors are the three asset files that do not exist yet (the dashboard image, the music and the logo); as in G04, the checker did not report the missing `clip` files, so check `public/clips/` by hand. It warns that scenes 8-10 are all `clip`: expected in a 3D-first film, and the claim card #9 already breaks the run in the storyboard.

```json
{
  "_note": "Strata is fictional. All 3D shots are deterministic renders in clips/ (Blender or @remotion/three); plates carry no text. Numbers in UI images are placeholders until verified.",
  "format": "landscape",
  "theme": "studio-dark",
  "motion": "calm",
  "pace": "fast",
  "transition": "cut",
  "brand": { "name": "Strata", "accent": "#4FD1FF", "logo": "brand/strata.png" },
  "audio": { "sfx": false, "music": "music/strata-100bpm.mp3" },
  "scenes": [
    { "type": "kinetic", "lines": ["Your systems", "never stop *talking*."], "duration": 2.4 },
    { "type": "clip", "src": "clips/strata-02-03-tangle-to-order.mp4", "caption": "Some of it never *arrives*.", "area": "bottom", "duration": 4.4 },
    { "type": "logo", "name": "Strata", "tagline": "The event backbone.", "duration": 2.4 },
    { "type": "clip", "src": "clips/strata-05-06-stack-ingest.mp4", "kicker": "Ingest", "caption": "Connect *any* source.", "area": "bottom", "duration": 6.6 },
    { "type": "prompt", "label": "Add a source", "prompt": "orders-db (Postgres)", "button": "Connect", "result": "Live. *Streaming*.", "resultKind": "text" },
    { "type": "clip", "src": "clips/strata-08-pushthrough.mp4", "caption": "Every event, *captured*.", "area": "bottom", "duration": 3.6 },
    { "type": "title", "headline": "Exactly *once*.", "duration": 2.4 },
    { "type": "clip", "src": "clips/strata-10-dedupe.mp4", "kicker": "Process", "caption": "Retries never *double-count*.", "area": "bottom", "duration": 3.6 },
    { "type": "clip", "src": "clips/strata-11-stack-reveal.mp4", "duration": 3.6 },
    { "type": "clip", "src": "clips/strata-12-failover.mp4", "kicker": "Deliver", "caption": "Regions fail. Events *don't*.", "area": "bottom", "duration": 3.6 },
    { "type": "image", "src": "images/strata-failover-dashboard.png", "fit": "contain", "kicker": "Failover", "move": "in" },
    { "type": "title", "headline": "Nothing *dropped*.", "duration": 2.4 },
    { "type": "list", "style": "lines", "items": ["Less firefighting.", "Less replaying.", "More *shipping*."], "duration": 4.2 },
    { "type": "clip", "src": "clips/strata-16-17-implosion.mp4", "duration": 4.2 },
    { "type": "title", "headline": "Every event. *Delivered*.", "duration": 2.4 },
    { "type": "logo", "name": "Strata", "tagline": "The event backbone.", "duration": 2.4 },
    { "type": "cta", "style": "link", "action": "Start streaming", "handle": "strata.example", "duration": 4.0 }
  ]
}
```

**Workflow** (from `skills/motion-director/references/production.md`): render the 3D clips first at the storyboard lengths (+0.5 s handles), conform them to 30 fps natively, put them in `public/clips/` → `npm run check -- specs/strata.json` → `npm run qa` (layout stills only, not texture or cadence QC; P11 AA-T14) → `npm run brand -- <logo> --spec specs/strata.json` → `npm run music -- specs/strata.json --track music/strata-100bpm.mp3` (snaps cuts to the beat grid within ±7 f, downbeats within ±10 f, and writes `audio.beats`) → `npm run make -- specs/strata.json --crf 16` (CRF 16-18 for dark gradients, not the default 20; P11 AA-T8). For 9:16 set `format: "reel"`, swap in the **re-rendered vertical clips** (never the 16:9 ones), and cut to 7 scenes: kinetic, tangle-to-order clip, logo, signature clip, failover clip, implosion clip, cta.

**Kit caveats for this format (checked in the source):**
1. **Clip floors.** A `clip` with no copy is still held ≥2.8 s and a `prompt` ≥3.9 s at `pace: fast`, so 2.4 s shots must be merged into longer clips (done above) or timed in a custom composition.
2. **Accent pops overshoot.** `pop()` in `src/engine/motion.ts` (≈10% back-out) drives `stat`, `grid`, `hook`, `compare`, `quote`, `chat`, `list` styles other than `lines`, and the `cta` button. Use `title`, `kinetic`, `list` `lines`, `image`, `bars` (its bars rise with `ease.out`) and `cta` `link`.
3. **No frame-exact sound events.** The kit places SFX per scene; with `audio.sfx: false` the cue sheet (gaps, suck-out, the loudest hit at f864, the sting) must be edited into the music file.
4. **Missing devices:** all 3D, the motif relay, the tonal wordmark sweep, light builds, the punch into the lockup, captions delayed inside a clip. Render them and insert as `clip`, or assemble the film in a custom Remotion composition that reuses the kit's theme tokens.

### 14.2 Custom 3D (deterministic): what to build and how

| Shot family | Tool | Spec |
|---|---|---|
| Strata stack, lanes, pulses, ring, implosion (#1-6, #10-12, #16-17) | **`@remotion/three`** (three.js inside Remotion) when geometry is simple and must sync to the frame grid; **Blender / Cinema 4D** when glass, fog volumes and true motion blur matter | Every value driven by the frame number; pulses and particles from a seeded `random(seed)`; camera keyframes from §8.2 eases (bezier) with 0% overshoot; scale interpolated in log space; 180° motion blur (Remotion `<CameraMotionBlur>` defaults to 180° [N]; Blender shutter 0.5) |
| UI on planes (#7, #8, #13) | Remotion renders the UI flat at ≥1.5× size → texture on a three.js plane, or export PNG sequences → Blender image planes | Text and values stay vector-sharp; flatten to ≤15° before reading; no plane intersections (step at 1 f) |
| Network failover (#12) | three.js lines + instanced nodes, or Blender geometry nodes | Colour states as material swaps on exact frames; arc draws by path length, E-INOUT 18 f |
| Wordmark, tagline, captions, CTA | Remotion 2D (or the kit) | Official SVG; composited over the 3D passes; never rendered inside 3D |
| Blockouts, angle studies | Higgsfield 3D scene builder (`scene_builder_3d_*`) or Blender viewport renders | For camera and framing approval only; final pixels from the deterministic renderer |

Render settings: 1920×1080 (or 3840×2160) at native 30 fps; PNG or EXR passes (beauty, UI-plane, particles, glow, fog, Z-depth for DOF in comp if needed); linear-to-sRGB once in the composite; 1-2% dither before the 8-bit encode; ProRes 4444 (`yuva444p10le`) for any transparent overlay (P11 AA-T13).

### 14.3 What needs generative video (Flow / Veo / Sora / Runway / Kling / Higgsfield)

| Need | Generate? | How |
|---|---|---|
| Studio haze, volumetric light field, far atmosphere behind the fog | **Optional** (prefer a shader or Blender volume for loopability) | One slow move ≤0.2% W/f; defocus ≥3% W; graded to `bg-void` |
| A lifestyle or "real world" plate for the breather (a control room at night, a city at blue hour) | **Yes, if the story needs a human world** | Nobody in focus; no screens; one key direction; defocused and graded with every other plate |
| Abstract hero object (glass core) for an AI-system product | Possible | Clean background, one named move, image-to-video from a graded reference still; composite all type afterwards |
| The stack, network, pulses, particles, implosion | **No** | Geometry and counts must stay exact across shots (AA-03 inconsistent counts, AA-04 broken perspective) |
| UI, numbers, labels, logo, any text | **No** | Generators "cannot set exact typography"; Veo adds gibberish subtitles (AA-G9; [P]) |
| Hardware | **No** | Modelled or supplied renders |
| Audio | **No** | Mute; score from the cue sheet (AA-G10) |

**Operating rules (P11 AA-G1-G14; P10 §13.9):** Veo 3.1 clips are 4, 6 or 8 s at 24 fps [P]; generate 1.5-2 s longer than the edit length and use the middle; one named camera move per clip with start/end framing, duration, ease and peak speed; prompt order Cinematography → Subject → Action → Context → Style; the continuity block (palette hex, key-light direction, lens, grade, grain) pasted verbatim at the end of every prompt; ≤3 reference images or ingredients and a fixed seed per look; 2-4 takes per shot, keep the one that passes the anti-AI checklist (P11 §21.4); upscale before compositing; grade all plates in one pass; keep a generation log. In Sora, Runway, Kling and Higgsfield the same rules apply: start every plate from a graded reference still (image-to-video) so style and light stay locked. Decide the frame rate before generating: at 30 fps delivery keep generated plates in the Breathe band (≤0.2% W/f) and retime by optical flow, never by duplicate frames (AA-G11).

**Example plate prompt (breather #15, optional):** "Locked-off tripod, very slow constant push-in from 100% to 104% over 6 seconds, roll 0°, 85 mm look. A dim, empty network operations room at night seen from the back: rows of unlit desks, no screens visible, no people. Soft cool volumetric haze, a single warm key light from the upper right, deep navy shadows. Large clean empty area across the upper two-thirds for graphics. Low saturation, gentle contrast, fine grain 1%, shallow depth of field, everything softly out of focus." Negative: "text, subtitles, captions, letters, numbers, watermark, logo, signage, screens, monitors, user interface, people, faces, hands, lens flare, particles, sparkles, neon, chrome".

**Continuity block** (paste verbatim): "Palette void navy #070B1A, surface #121A33, cyan accent #4FD1FF used only as small light points. Key light upper right, soft, warm-neutral. 85 mm look, shallow depth of field. Low saturation, soft contrast, fine grain 1%. Night."

### 14.4 What needs 3D (the meaning test, per shot)

| Shot | Story fact the third axis carries (3D-U1) | Level | Spec |
|---|---|---|---|
| #2-3 Disorder → order | "The product turns a tangle into layers" | D3 | 40 paths, 12 nodes, 3 depth bands; straighten 30 f, stack 18 f |
| #5 Stack | "This is a place with layers" | D4 | 4 planes 8% H apart; crane 0° → 25° over 48 f |
| #6 Ingest | "Many sources dock into one layer" | D3 | 9 tiles, 22 f arcs, 4-6 f stagger; flatten 28° → 12° |
| #8 Capture | "We go deeper into one event" | D4 | Lift 15 f, push-through 9 f, rack 9 f |
| #10 Dedupe | "Three copies become one" | D3 | Merge 8 f E-EXIT |
| #11 Signature | "Here is the whole system" | D4 | ×0.57 / 10 f, ×0.56 / 20 f; 4 planes; ≈240 pulses |
| #12 Failover | "The system is a network that reroutes" | D3 | Red 1 f, recede 8 f, arc 18 f |
| #16-17 Climax | "Everything becomes one backbone" | D4 | Dolly ×2.2 / 15 f; ring of ≈24; implosion 8 f; ≤12 sparks / 10 f |
| #4, #9, #14, #18-20 | No third-axis fact | D0 | Flat type and logo |

**2.5D fallback (no 3D budget):** keep the structure and the camera grammar, but build the stack from flat cards with 6-8% extruded accent edges, rim thickness, long soft shadows from one direction and parallax 1.3-2×; replace the push-through with a 2-3.5× cut-in and the screen-to-world pull-back with a 2D pull-back ×0.75 over 20 f (P10 HR-10; P04 defaults #4). This reads dimensional with 0% true 3D, as Solar does [V:1Hcg3X].

---

## 15. QC checklist for this format

Run per shot (Gate 1), on the locked cut (Gate 2) and on the final file (Gate 3) (P11 §22). **S1** blocks release; **S2** must be fixed or signed off.

**Story and meaning**
- [ ] Every D2-D4 shot has a written 3D-U1 story fact; shots without one are flat (S2).
- [ ] Hook visible on f0, first change by f3, ≤7 words (≤5 in 9:16 and spots ≤15 s), ≤2.4 s (S1).
- [ ] Product name on screen by ≤8 s; first structural proof by ≤12 s (S1 / S2).
- [ ] Signature move at 45-55% of runtime, loaded by a 70-350 ms gap, hit 0-3 f after the picture (S2).
- [ ] At least one failure → recovery shown, told by colour state (S2).
- [ ] Every claim, number and UI value supplied and approved; no placeholders in the master (S1).

**3D integrity**
- [ ] 3D share 50-90% of runtime; D4 (DOF + parallax + moving 3D camera) on ≤5 shots (S2).
- [ ] **No plane intersections**: every 3D move stepped at 1 f (S1).
- [ ] No continuous spins or 360° orbits; orbits in 9-12 f steps ≥1.2 s apart (S2).
- [ ] 0% overshoot and 0° roll on camera, planes, UI, type, logo (S2).
- [ ] 180° motion blur on every 3D move; nothing above 5% W/f unblurred; nothing above 10% W/f except into a cut (S1 for visible strobing).
- [ ] Camera drifts 1-3% of frame per second on every 3D hold; an in-shot event every 0.8-1.5 s in shots over 3 s (S2).
- [ ] Lens: telephoto feel on UI planes (straight edges stay straight within ≈5%); wide lens on ≤1 declared beat (S2).
- [ ] Particles: ≤1 particle event + the climax burst; each made of on-screen colours, with a direction and an end state (S2).
- [ ] Object counts and geometry identical across shots (the same 9 sources, 4 layers, 3 regions) (S1).
- [ ] ≤3 materials; one key-light direction across 3D, 2D shadows, glass rims and plates (S2).
- [ ] No HDRI sky, glossy floor, mirror reflection, chrome, lens flare or ambient sparkle (S2).
- [ ] 2D ↔ 3D handovers only through motivated moves; no crossfades between dimensions (S2).

**UI, type and brand**
- [ ] UI is real, textures ≥1.5× on-screen size, never greeked where read (S1).
- [ ] Planes flattened to ≤15° before any must-read value; must-read cap ≥3% H after the move (16:9), ≥52 px at 9:16 (S1).
- [ ] All copy composited flat, facing camera, sharp; captions in one fixed clean slot (S2).
- [ ] ≤6 words per read frame; 35-55 words of film copy per 60 s; no exclamation marks (S2).
- [ ] Contrast ≥4.5:1 (≥7:1 or a ≥60% scrim over renders and plates); data marks ≥3:1 (S1).
- [ ] Glow only on emitters; on type ≤2-3% of cap height; no smeared letter edges (S2).
- [ ] Logo, wordmark and motif are the official vectors, never 3D, identical in every shot and cutdown; anchored elements ±1 px across cuts (S1).
- [ ] Text-safe: 16:9 x 96-1824, y 54-1026; 9:16 x 120-840, y 270-1210 (S1 for clipped text).

**Generated layers**
- [ ] No glyphs, screens, signage, faces or hands in any plate; continuity block used; generation log kept (S1).
- [ ] No texture boil, identity drift or lighting change across a plate's used range (S1).
- [ ] Frame rate decided before generation; 0 duplicated frames in any move (S2).

**Rhythm and sound**
- [ ] ASL 2.5-3.5 s; breather per P08 ER-U11 (breakdown 6-15% or visual 10-15%); implosion at 75-85% (S2).
- [ ] Cuts in music-led sections 0-2 f before the beat, never after (S2).
- [ ] 9-15 designed sounds per 60 s; ≤2 whooshes; ≤2 risers; subs ≥1.4 s apart and on camera peak velocity ±2-3 f (S2).
- [ ] One decisive click with a ≥15 dB suck-out (S2).
- [ ] −14 LUFS ±1, ≤ −1 dBTP on the final MP4; sting ±2 f of the lockup; music ends with or after the last frame (S1 for overs and for a silent CTA).
- [ ] The film is understandable muted (S2).

**Delivery**
- [ ] Final lockup + CTA dead still ≥2.5 s (≥4 s with a QR) (S1).
- [ ] 1920×1080 or larger, native 30 fps, H.264 CRF 16-18 at 12-20 Mb/s, BT.709 tagged, 1-2% dither, no banding in fog or gradients at a 1:1 crop of the final encode (S2).
- [ ] 9:16 and 1:1 versions re-rendered, not cropped; cutdowns cut by whole blocks with music edited on bar lines (S2).
- [ ] At most 1 flash moment, ≤3 f per colour, ≤3 flashes per second (S1, photosensitivity).
- [ ] Every cut stepped ±10 f at 1-frame steps; no 1-frame dips to black (S1).

---

## 16. Common mistakes (and fixes)

| # | Mistake | Seen in / source | Fix |
|---|---|---|---|
| 1 | **3D everywhere "to make it cinematic"**: DOF, parallax and orbits on every shot, including claim cards | P10 3D-A1, DP-A1; no reference does it; Bumper keeps claim cards flat [V:19NRDv] | Meaning test per shot; D0 for type and logo; D4 on ≤5 shots |
| 2 | **Turntable syndrome**: the product structure spins continuously | P10 3D-A4; 0/8 references | Stepped orbit, 9-12 f steps every 1.2-1.3 s, each landing on a labelled target |
| 3 | **Strobing fast moves** with no motion blur | [V:1ccYWJ t=27.40-32.57s] (22-27% W/f unblurred) | 180° shutter on all 3D moves; ≤5% W/f unblurred; >10% W/f only into a cut |
| 4 | **Reading text on a tilted plane** | P10 3D-A3; DP-19 | Flatten to ≤15° first; scale the one value to cap ≥3% H |
| 5 | **Plane intersections mid-move** | [V:1CSXtQ t=18.4-19.0s] | Step every move at 1 f; separate planes by ≥2% of frame in depth |
| 6 | **Generic neon tech**: random sparkle particles, lens flares, chrome, glitch packs, lime-and-violet grids | P11 AA-12; [V:15VhHR §13] "no particles, lens flares or chrome" | Particles made of the UI with a source, a direction and an end state; one accent; palette-lit fog |
| 7 | **Greeked or low-resolution UI on hero planes** | [V:1CSXtQ §13] greeked rows | Real UI at ≥1.5× size; 4K textures for planes ≥60% W |
| 8 | **Low-contrast glass data marks** | [V:19NRDv t=11-14s] violet glass on navy | ≥3:1 for marks; matte planes for anything read |
| 9 | **Bloom smearing hero type** | [V:19NRDv t=7.2s] | Type glow ≤2-3% of cap height; glow on emitters only |
| 10 | **Two suns**: 3D speculars from one side, 2D shadows from the other, plates with their own light | [V:1Hcg3X] two shadow directions; kivi's mismatched plates [V:1-6l8S] | One key direction in a film bible; one continuity block for every plate |
| 11 | **Long dead diagram holds** | [V:19NRDv] 6.26 s network shot, motion mean 1.82 | Event every 0.8-1.5 s; cap proof shots at ≈5 s; shrink blocks toward the end |
| 12 | **Generated structure or UI** that drifts in geometry, counts or text between shots | P11 AA-03, AA-05, AA-G9 | Deterministic 3D for everything with a count, a label or a value; generate only haze and plates |
| 13 | **Crossfading between 2D and 3D** | P10 defaults #24 | Tilt onto a plane, screen-to-world, edge-on flip, collapse into a slot |
| 14 | **A 3D logo** spinning at the end | P10 ST-D avoid row | Flat SVG lockup, still ≥2.5 s; the motif becomes the logo stroke |
| 15 | **Banding in navy fog and gradients** | [V:1ccYWJ] [V:19NRDv] (encode banding) | 1-2% dither; CRF 16-18; ≥12 Mb/s @1080p |
| 16 | **Pulldown judder** from 24/25 fps renders or plates conformed to 30 fps | [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X] | Render natively at the delivery rate; retime plates by optical flow |
| 17 | **Cropping the 16:9 renders for 9:16** | P10 ST-D duration row [inferred] | Re-stage and re-render vertical cameras; stack layers vertically |
| 18 | **Trailer music** (drums, choirs, braams) or a track that ends before the picture | P09 SD-MU3; [V:1ccYWJ t=40.5s] | Hybrid cinematic-electronic 70-112 BPM; sting on the lockup; tail to the last frame |
| 19 | **Over-loud master** | [V:1i2L14] −7.9 LUFS, +1.6 dBTP | −14 LUFS ±1, ≤ −1 dBTP on the final file |
| 20 | **A one-off stock or lifestyle insert** with no continuity to the system | [V:19NRDv flaw 6] | Tie every plate to the palette and the story, or drop it |
