# Specialised Guideline 11: Developer Tool / API Launch

A film that launches a product **developers adopt by running it**: an API, an SDK, a CLI, an IDE extension, a database, an infrastructure or platform service, an open-source library. The film convinces a technical viewer in one way only: it shows **real code, a real command and a real response**, and makes the amount of work saved visible (lines, steps, services, milliseconds). Then it hands the viewer the exact next keystroke: the install command, the docs URL, the API key page.

It is not an AI model launch (Guideline 03 covers model and AI-API launches in the calm ST-A3 register, where the hero is the model's output). It is not a feature announcement (Guideline 05: one delta inside a product people already use). It is not a UI walkthrough (Guideline 02). The hero of a developer launch is the **developer's own surface, the editor and the terminal**, and the climax is a working result reached in fewer lines than the viewer expects.

This guideline condenses the Master SaaS Motion Design System (Parts 01-11 in `research/master/`) and the eight frame-measured teardowns in `research/videos/` into one working spec for this format. None of the eight references is a pure developer-tool launch. The guideline therefore takes measured mechanics from the closest ones (typed prompts, code cards, connectors, failover diagrams, asset-library energy) and turns them into developer-surface rules. Every number is in frames at 30 fps (f) unless stated; 1 f = 33.3 ms. "% W" and "% H" are percent of frame width and height. Numbers are measured in the references unless marked [inferred] (derived by this guideline from measured rules, not observed directly).

| Tag | Reference (file in `research/videos/`) | What it teaches a developer launch |
|---|---|---|
| [V:1CSXtQ] | OpenAI x HubSpot connector, 16:9, 30 s (`1CSXtQSs2jM0WBQP6LPDVpDgkt8JLdUkw.md`) | The input is the hero: human-rhythm typing (9 → 35 chars/s), caret lock at ≈65% W, near-silence carried by keystrokes, send → one 3D screen-to-world beat for "data flows between systems" (the cleanest connector/API picture measured) |
| [V:1ccYWJ] | Lottieicon library launch, 16:9, 44.3 s (`1ccYWJ6nQXdqt1UQrpz2mE0ODScG_hU0K.md`) | The only reference sold partly to developers (Lottie JSON + AEP). Dark neon energy (ST-E2), audience slot machine "For *Developers*", SFX at peak velocity. Its flaws teach as much: the "AEP + JSON" format pill at ≈1.5% H, music gone 3.7 s early, no lockup |
| [V:1-6l8S] | kivi voice AI, 16:9, 77.8 s (`1-6l8SV5NXZQotrYoV8KqKV7SJPvtssso.md`) | The one measured **code card**: #121212 glass, line numbers 42-44, tokens appear one per 3-4 f, identifiers in outlined chips [t=59.73-62.93s]; machine-pace vs human-pace streams |
| [V:19NRDv] | Bumper PRO payments, 16:9, 67.2 s (`19NRDvazRJFCFcAfehavceGsUMV64qBRv.md`) | Infra told by colour state alone: the failover network (provider 1 red, provider 2 red, provider 3 teal) [t=39.87-46.13s]; claim world / proof world; tilted UI tables |
| [V:15VhHR] | Wix AI site builder, 16:9, 53.9 s (`15VhHRcisoHSPWY0VA06PzA3u_y-4qJY_.md`) | Anchored input: one prompt bar locked for 3.8 s across 6 shots; key-phrase typing at 7-8 chars/s; caret-follow truck; 3.4x cut-ins |
| [V:126cpH] | Chowdeck delivery app, 9:16, ≈18 s (`126cpH-FXL4FxTwRwoJvt9M4FNwBB7peq.md`) | A status cycle told end to end (order → ready → on the way → delivered), the same grammar as a job's run log; its 2 f "delivered" state is the flaw to avoid |
| [V:1Hcg3X] | Solar explainer, 16:9, 35.8 s (`1Hcg3X8G_q34iS-RqcAQ2pMHpGkIhxu3j.md`) | Explaining an invisible mechanism (flow, storage, export) with one hero per frame and state-by-colour: the model for architecture diagrams |
| [V:1i2L14] | NOSTRA studio promo, 16:9 inset, 35 s (`1i2L14p-cvnLcIl6XY7mUQEiTYZy_OWUA.md`) | Click-caused transitions; typing dots; the cost of a wrapper that eats 21% of the canvas |

Master cross-references use Part and rule IDs (for example Part 06 UI-K1 is typing rule K1 in `master/06-ui-animation-system.md`; Part 10 ST-E2 is the Dark Neon Asset Reel style card in `master/10-2d-3d-and-style-categories.md`). Sibling guidelines are cited as G02, G03, G05.

---

## 1. Purpose and audience

**Purpose.** Move a technical viewer from "huh, what is that" to **running the install command today**. The film has five jobs, in this order:

1. **Name the pain in the developer's own language** within 2 s: an error line, a config file that is too long, a count of services, a slow benchmark. Not a stock photo of a stressed person.
2. **Reveal the tool** and say what it is in one category line ("Durable background jobs for TypeScript"). Developers decide in a second whether the category is theirs.
3. **Prove it in code**: install → write → run → see the result. Real syntax, a real command, real output. This is ≈50% of runtime, more than any other format, because developers buy on proof and distrust claims.
4. **Quantify the delta** with numbers that carry their conditions: lines of code, steps, services removed, p50/p99 latency with region and payload, cost per million calls.
5. **Hand over the next keystroke**: the exact install command, docs URL, or "Get an API key", plus the adoption facts (free tier, licence, self-host, languages, status: beta or GA).

**Audience.**

| Viewer | Where they meet it | What they need | Design consequence |
|---|---|---|---|
| Individual developers (ICs) | X/Twitter, YouTube, Reddit, Hacker News (via the launch post), GitHub README, dev newsletters | "Does this save me work, and does it look like real code?" | Real, runnable code; legible mono type; honest timing; no hype words |
| Tech leads and staff engineers | Launch blog, docs landing page, LinkedIn | "Is it production-grade? Retries, limits, observability, lock-in?" | A run log or dashboard, failure handled on screen, licence and self-host chip |
| Engineering managers and buyers | LinkedIn, email, conference stage | Time and cost saved; security; pricing | One delta number with its scope; free tier and plan chip |
| Developer-creators and DevRel | Shorts, Reels, TikTok, YouTube | A 15 s clip they can re-share or stitch | A 9:16 re-layout with ≤25-char code lines; the command big |
| Conference audiences | Keynote screens, booth loops | Spectacle plus one memorable command | 16:9 4K master; a silent booth loop |

**The promise the film makes.** "The code you see is the code you write, the command works, and the numbers were measured." Developers paste commands from videos into terminals. A typo, a renamed package, an invented flag or a benchmark without conditions costs more credibility than the film can earn, and it is publicly called out in the replies.

---

## 2. When to choose this format

Choose a Developer Tool / API Launch when **all** of these are true:

1. The primary user writes code or configures infrastructure (an API, SDK, CLI, library, database, hosting, observability, CI, an IDE plugin, a dev-focused AI tool whose surface is code).
2. There is a **runnable path of ≤3 steps** that can be shown honestly: install, write ≤6 lines, run.
3. The result is **visible**: terminal output, a JSON response, a dashboard row, a deployed URL, a test turning green.
4. The team can supply real code, real commands, the real package name and measured numbers with their conditions.

| Situation | This format? | Better alternative |
|---|---|---|
| New API, SDK, CLI or library (v1.0, GA, public beta) | **Yes**, 45 s master + 15 s 9:16 + 6 s bumper + silent README loop | — |
| New developer platform with a UI dashboard and an SDK | Yes; split proof between code (≥60%) and dashboard (≤40%) | — |
| AI model or AI API where the output (text, voice, image) is the hero | Partly: use G03 (ST-A3), borrow this guide's code-card rules for the API beat | G03 |
| A new feature in an existing dev tool (a flag, a new command, a new endpoint) | No, use G05 with this guide's code and terminal rules (§10) | G05 |
| Infra with no visible developer surface (network, storage tiers, security) | Only with a visible proxy: an architecture diagram with state colours [V:19NRDv] [V:1Hcg3X], a latency gauge, a cost counter | Mechanism explainer (Part 10 ST-F1) or 3D tech film (ST-D) |
| Open-source library launch / big release | Yes, with GitHub-native proof (README loop, the diff, the install); stars only if real | — |
| Component library, icon set, template kit for developers | Yes, but in the ST-E2 "product is the motion" register [V:1ccYWJ] | Part 10 ST-E2 |
| How-to for existing users (step-by-step tutorial) | No, too long for a launch | Docs video, G02, Part 10 ST-C2 |
| Dev-tool company brand film (mission, founders) | No | Part 10 ST-F3 founder story |

**Story template.** Part 01's **T4 Prompt-native** shape (the input is the hero) crossed with **T3 Single-transaction** (one job end to end), plus two stages the master templates lack: **Install** (the zero-to-running path) and **Adopt** (licence, free tier, languages, status). The signature structure of this guideline:

> **Pain → Before → Reveal → Install → Write → Run → Inspect → Call → Delta → Adopt → Climax → CTA → Lockup**

Proof stages (Install → Call) are told as **three proof blocks that shrink**: 8.5 s, 7.5 s, 6 s (each 10-40 % shorter than the one before, Part 08 DU-U3, PL-45; Part 01 P-rule; kivi's blocks shrink 14.75 → 11.03 → 6.69 s [V:1-6l8S]).

**Style choice** (Part 10 ST-U1; Part 02 §3.2 style-choice rule: "Speed / energy / developer audience → AD-S5"):

| Product character | Primary style | Notes |
|---|---|---|
| CLI, SDK, infra, OSS library (default) | **Dev-dark**: this guideline's ST-E2 adaptation (dark tinted canvas, one emissive accent, editor and terminal as light sources) | Part 02 §11.5: dark tinted canvases suit developer tools, because emissive accents only read on dark |
| Developer platform with a calm, premium brand (API for AI audio, payments API) | ST-A3 calm editorial, light or warm-black | G03 |
| API that connects systems (integrations, webhooks, data sync) | ST-A2 prompt-native + one CM-16 screen-to-world beat [V:1CSXtQ] | — |
| Infra explained as a mechanism | ST-F1 2.5D diagram + code inserts | [V:1Hcg3X] [V:19NRDv t=39.87-46.13s] |
| Kits and libraries whose output is visual | ST-E2 unchanged [V:1ccYWJ] | — |

---

## 3. Platforms, aspect ratios and length

### 3.1 Formats

| Format | Size | Typical placement | Text-safe box | motion-kit `format` |
|---|---|---|---|---|
| **16:9 master** | 1920x1080 (4K 3840x2160 for keynote screens) | Launch blog, YouTube, X, LinkedIn, Product Hunt gallery (YouTube link), docs landing page, keynote | x 96-1824, y 54-1026; CTA, command and URL above y 918 (player controls) | `landscape` |
| 9:16 | 1080x1920 | Shorts, Reels, TikTok, X vertical, DevRel creators | **x 120-840, y 270-1210** (union of Reels-ads, TikTok and Shorts) | `reel` |
| 1:1 | 1080x1080 | X and LinkedIn feed, newsletter | x 135-945 | `square` |
| 4:5 | 1080x1350 | LinkedIn / Instagram feed | x 88-992 | `portrait` |
| **README / docs loop** (silent) | 1280x720 or 1600x1000; GIF fallback at 800 px wide | GitHub README, docs hero, npm/PyPI page (via README), changelog | 6% margin all sides [inferred] | Render `landscape`, then crop and encode in delivery, or build a custom composition |

Sources: Part 02 §4.7; Part 06 §8.12; G05 §3.1. **9:16 is a re-layout, not a crop** (Part 02 CO-U18): a 9:16 window cut from a 1920x1080 master is 608 px wide, which shows ≈11 characters of 46 px mono code. Code for 9:16 is **rewritten** shorter (§6.3), never shrunk.

**README loop specifics** [inferred]: MP4 (H.264) or WebM ≤10 MB, because GitHub's inline upload limit for free accounts is commonly 10 MB (check the current limit). GIF only as a fallback: ≤256 colours, 12-15 fps, ≤8 MB, dark gradients flattened to solid fills to avoid banding. Seamless loop (last frame = first frame).

### 3.2 Length

| Runtime | Use | Plan to start from | What fits |
|---|---|---|---|
| **6 s (180 f)** | Bumper, pinned post, "v1.0 is out" | Part 08 PL-05 | Command typed on f0 → one output line → lockup + URL |
| **10 s (300 f)** | Teaser, "coming next week", conference countdown | PL-10 | Pain line → name → one run → lockup |
| **15 s (450 f), vertical default** | Shorts/Reels/TikTok, X vertical | PL-15 | Pain strike, one command, one result, CTA command, lockup |
| 30 s (900 f) | Paid social, LinkedIn, a small library | PL-30 + this guide | Pain, reveal, one 8 s proof block (write + run), delta, CTA, lockup |
| **45 s (1350 f), 16:9 default master** | Launch post, YouTube, Product Hunt, homepage | **§4.1 (this guideline)**; Part 08 PL-45 names "a dev-tool launch" explicitly | Three shrinking proof blocks (8 / 8 / 6 s), delta, adopt, CTA, lockup |
| 60-120 s | Keynote launch segment, VO-led | Part 01 T10 five-chapter | Only with VO and a live-coding feel; otherwise cut to 45 s |
| 6-12 s loop | README / docs hero | §3.3 | One proof block, silent, seamless |

Rules:
- **One job, end to end.** The whole film follows one concrete task (send a welcome email, resize an image, sync a table). Switching examples mid-film doubles the reading load (Part 01 TS3; HubSpot proves its connector with one query → answer in 8.44 s [V:1CSXtQ]).
- **Make the hero film plus cutdowns, not separate films** (Part 08 §17.5): a 45 s 16:9 master, then a 15 s 9:16 and a 6 s bumper made by removing whole blocks.
- **Frame rate:** 30 fps native. Use 60 fps only for the keynote 4K screen if the venue plays 60. Never convert 24/25 → 30 by duplicating frames: 3 of 8 references judder on scrolls because of it (Part 11 MK-06). Scrolling code judders worst.

### 3.3 The README / docs loop (silent)

The copy developers watch most is often the silent loop at the top of the README or docs page [inferred]. Build it as its own deliverable:

- 6-12 s, **no sound dependency**, no hook text and no logo (the page already has both).
- Content: one proof block (§4.2 a-k) on the real editor/terminal look, at 1.0x (no cut-ins: the viewer can pause and zoom the page).
- **Seamless loop:** the last frame equals the first. End with the terminal cleared (`clear`) or the editor back to its first state over 12-18 f E-INOUT, hold 15 f; frame 0 is that state.
- Code at ≥24 px font in a 1280 px-wide loop (cap ≈2.4% H of 720 = should-read, fine for a page the viewer can enlarge) [inferred].

---

## 4. Story structure with exact beat timings

### 4.1 The thirteen stages (45 s default, 16:9, music at 120 BPM)

120 BPM gives a whole-frame grid at 30 fps: beat = 15 f, bar = 60 f = 2.0 s. Stage boundaries sit on beats; **cuts land 2 f before the beat** (Part 08 #15). Use 112 BPM (beat 16.07 f, the measured Lottieicon tempo [V:1ccYWJ]) if a track fits better; keep the stage percentages.

| Stage | Seconds | Frames | % | Job in a developer launch | Evidence |
|---|---|---|---|---|---|
| 1 **Pain** (hook) | 0.00-2.00 | 0-60 | 4.4 | The pain in the developer's own surface: red log lines, a count, a failing test. Text on f0, first change by f3 | Part 01 H1-H4; Part 08 PL-45 hook 0-2.0 s |
| 2 **Before** | 2.00-5.00 | 60-150 | 6.7 | The DIY stack: file tree, line count, services to run. One readable fact | Part 01 setup; [V:19NRDv] claim world |
| 3 **Reveal** | 5.00-9.00 | 150-270 | 8.9 | Name + category line. The reveal is an audio event (Part 01 R2) | PL-45 reveal 4.0-8.0 s; [V:1ccYWJ t=1.87-2.60s] |
| 4 **Install** | 9.00-13.50 | 270-405 | 10.0 | One command, real output. **Drop on the first product frame** | Part 09 drop rule; [V:15VhHR t=4.233-4.5s] drop 8 f after first UI |
| 5 **Write** | 13.50-17.50 | 405-525 | 8.9 | ≤6 lines of code; only the key line types | [V:1-6l8S t=59.73-62.93s] code card; Part 06 UI-K1 |
| 6 **Run** | 17.50-21.50 | 525-645 | 8.9 | Run it; a failure is handled on screen (retry, fallback, cache); success | [V:19NRDv t=39.87-46.13s] red, red, teal |
| 7 **Inspect** | 21.50-25.00 | 645-750 | 7.8 | Dashboard / trace / logs: the run is observable | Part 06 UI-P1 cursor grammar |
| 8 **Call** | 25.00-31.00 | 750-930 | 13.3 | The API from anywhere: request → response; languages swap | [V:1CSXtQ t=17.80-19.03s] screen-to-world; [V:15VhHR] anchored slot |
| 9 **Delta** | 31.00-34.00 | 930-1020 | 6.7 | Lines saved + one measured performance number; the breather | [V:19NRDv t=11.00-14.33s] ghost bar; Part 08 #11 |
| 10 **Adopt** | 34.00-37.00 | 1020-1110 | 6.7 | Languages, free tier, licence, self-host, status (beta/GA) | G05 Access stage |
| 11 **Climax** | 37.00-39.50 | 1110-1185 | 5.6 | Thesis line, last word on the beat; callback to the pain | Part 01 C1-C2, L3 |
| 12 **CTA** | 39.50-42.00 | 1185-1260 | 5.6 | The command + docs URL | Part 01 L5 |
| 13 **Lockup** | 42.00-45.00 | 1260-1350 | 6.7 | Logo + version + URL, **≥2.2 s dead still** | Part 08 #20 |

Proof (stages 4-8) is **48.9%** of runtime, against 53.3% in Part 08's PL-45 (whose proof includes the delta) and 38.3% in G05; with the delta it is 55.6%. Climax starts at **82.2%**, at the top of the master's 70-82% window for short films (Part 01 §2.3): developers tolerate a later climax because the proof is the entertainment [inferred]. Resolution (CTA + lockup) is 12.2%, equal to PL-45.

**Hero moments** (Part 08 #12: first at 10-25%, last at 76-91%, ≥30 f calmer picture after each):
- H1: the name lands, ≈f158 (11.7%).
- H2: the retry succeeds and turns green, ≈f607 (45.0%).
- H3: the climax word, ≈f1140 (84.4%).

### 4.2 The code-proof block (micro-structure)

G02 §4.2's proof block, translated to developer surfaces. One complete block is 4-8 s.

| Micro-beat | Duration | Developer version | Rule source |
|---|---|---|---|
| a. Context lands | 6-12 f | The editor or terminal is already there: lines cascade in 2 f per line, or the window cuts in mid-ease | Part 06 cascade; [V:1ccYWJ] cut into motion |
| b. Input | 20-60 f | **Only the line that matters types** (≤40 chars) at 7-9 chars/s for the key token, 15-20 chars/s for the rest; everything else is pre-written | Part 06 UI-K1 |
| c. Read hold | ≥18 f | Caret blinks (18 f period); nothing else moves | UI-K3 |
| d. Trigger | 6-10 f | The Enter key (terminal), save (editor), Send (request); a 6 f pause before Enter | UI-C4 adapted [inferred] |
| e. Consequence | 3-8 f after the trigger | First output line or status chip | Part 06 believability "speed" law |
| f. Working state | ≤30 f | Spinner, "running…", a progress line; **never longer than 1 s** on screen | UI-E04 mistakes: typing indicator ≤1 s |
| g. Output cascade | 2-4 f per line | Machine pace: output appends a line every 2-4 f (machine streams ≈2 f/word [V:1-6l8S t=14.3-14.6s]) | UI-E04 |
| h. State colour | 1-2 f swap | ✓ green / ✖ red, always with a glyph | §6.2 |
| i. Cut-in | 2-2.5x, instant | On the one value that proves it (184 ms, `"status": "queued"`) | Part 04 CM cut-in |
| j. Payoff hold | ≥30 f | The result stays readable ≥1.0 s (Chowdeck's 2 f "delivered" is the anti-example [V:126cpH t=13.53s]) | Part 06 #payoff |

### 4.3 Energy and music arc (45 s)

- f0-60: sub impact on f0 + sparse pulse; three soft error ticks on the red lines.
- f60-150 (Before): the pulse thins; 250 ms near-silence f140-148 before the reveal (Part 08 #13: 70-350 ms).
- f150-270 (Reveal): F11 impact on the name; riser f200-266, cresting 0-2 f before the cut into Install.
- **f270: drop on the first product frame** (the terminal). HubSpot's drop sits at 43% [V:1CSXtQ §11]; here it sits at 20% because developers want the product sooner than a brand film can wait [inferred].
- f270-930 (Proof): steady groove; **intimate dips** for typing: music −6 dB under each typing burst, keystrokes audible (HubSpot carries 4.7 s of near-silence on keystrokes and a caret [V:1CSXtQ], Part 09 SD-SI4); ≥15 dB dip 0.3-0.5 s before each Enter.
- f930-1020 (Delta): breakdown −9 dB, low-passed (the breather, Part 08 #11).
- f1020-1140: build; hit on the climax word at f1140.
- f1261: sting on the lockup; tail to the last frame (Lottieicon's music ends 3.7 s early [V:1ccYWJ]).

### 4.4 Short versions

**15 s, 9:16 (450 f, 120 BPM; cuts 2 f before beats)**

| Stage | Seconds | Frames | Content |
|---|---|---|---|
| Pain + reveal | 0.00-2.43 | 0-73 | f0 red log line (`✖ job lost on deploy`, 40 px mono) + "Deploys shouldn't eat jobs." 96 px; name "Tern" 220 px at f40 |
| Install + write | 2.43-6.43 | 73-193 | Terminal 810 px wide: `npm i @tern/sdk` typed; then a 4-line code card rewritten to ≤25 chars/line (§6.3) |
| Run | 6.43-10.43 | 193-313 | `✖ attempt 1` red → `✓ attempt 2 · 184 ms` green, cut-in 2x on the green line, held ≥1.0 s |
| CTA | 10.43-12.93 | 313-388 | Command pill `npm i @tern/sdk` 52 px mono + "Free for 10k runs a month" |
| Lockup | 12.93-15.00 | 388-450 | Logo + "tern.example/docs", still from f405 |

**10 s teaser (300 f)**: pain line on f0 → name at 1.5 s → one run 3.0-6.5 s (Enter at ≈3.6 s, output 4 f later, green line held to 6.5 s) → lockup with "v1.0 · [date]" 7.5-10.0 s, still from 8.2 s (Part 08 PL-10).

**6 s bumper (180 f)**: f0 the command already typed, caret blinking; Enter on f20; three output lines f24-32; the green result held f32-110; f110-180 lockup + URL, still from f132 (PL-05).

### 4.5 Release variant (45 s, 3 capabilities: "v2.0", "Launch Week day 3")

| Stage | Seconds | Content |
|---|---|---|
| Hook | 0.0-2.0 | Version number as the hero: `v2.0` typed into a terminal prompt, or a `git tag` line |
| Chapter + proof 1 | 2.0-12.0 | Chapter card "01 / 03 · Streaming" 1.0 s (mono kicker) + 9 s proof block |
| Chapter + proof 2 | 12.0-21.5 | 1.0 s + 8.5 s |
| Chapter + proof 3 | 21.5-30.0 | 1.0 s + 7.5 s (blocks shrink, Part 01 P-rule) |
| Changelog triptych | 30.0-34.0 | Three code diffs or three terminal results as tiles, 4 f stagger [V:1Hcg3X recap] |
| Upgrade path | 34.0-38.0 | `npm i @tern/sdk@2` + "Breaking changes: 0" chip (only if true) + migration-guide URL |
| CTA + lockup | 38.0-45.0 | CTA 2.0 s, lockup 3.0 s still ≥2.2 s |

---

## 5. Shot list template

Fill one row per shot before animating. Each row must pass the five-question test (Part 06 §8.0: who acted, what changed, would the real product do this, where was the eye one frame before, what is the one thing to read) **plus two developer questions: would this code run if pasted, and does every number carry its conditions?**

| # | Stage | In-out (s) | Frames | Dur (f) | Surface (editor / terminal / request / dashboard / diagram / type) | Source tier | Actor + trigger | State A → B | Code / command shown (exact string) | Must-read token (cap px) | Camera | Transition out | Music event | SFX (frame) | Anchor kept across cut |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Pain | 0.00-1.93 | 0-58 | 58 | Terminal log | T2 | system | — | `✖ job welcome · lost on deploy` | headline cap ≥70 px | Locked + push +6% | Hard cut | Sub f0 | Ticks f0/f4/f8 | Window rect |
| 2 | Before | | | | File tree + counter | T3 | | | | | | | | | |
| … | | | | | | | | | | | | | | | |

**Shot types for this format:** pain log · DIY file tree / config wall · name card · terminal (install, run) · editor code card · diff (before/after code) · run log / trace · dashboard row · request → response pair · language-tab slot machine · architecture diagram (state colours) · benchmark bars / counter · adopt chips · climax line · command CTA · lockup.

**Source tiers** (Part 06 §8.2), adapted:
- **T1 real capture**: a screen recording of the real terminal or IDE. Fine for README loops; for the film it usually fails on legibility (13-14 px code) and leaks personal chrome.
- **T2 vector rebuild** (default): the editor, terminal and dashboard rebuilt in Remotion/AE with the real strings, real syntax colours and the real dashboard layout. Sharp at any cut-in, no secrets.
- **T3 stylised**: abstract file trees, diagrams, "before" metaphors.
- **T4**: never for code. Code is either real or absent. **Never let a video model draw code, a terminal or a dashboard.**

**Per-shot spec block** (copy for each code, terminal or request shot):

```
SHOT <n> · <name> · <aspect> <W×H> · 30 fps · <duration f>
SURFACE     : editor | terminal | request/response | dashboard | diagram
SOURCE      : <tier>; code from repo <path@commit>; package <name@version>; tested on <runtime/version>
CODE BIBLE  : bg <hex>; surface <hex>; ink <hex>; comment <hex>; keyword <hex>; string <hex>; function <hex>;
              number <hex>; ok <hex>; err <hex>; mono <family, size px, line-height>; ligatures off; tab 2 spaces
WINDOW      : x, y, w, h px; radius <px>; header <px> + label "<file or shell>"; gutter <n> chars
LINES       : <exact code, ≤6 lines, ≤48 chars each (16:9) / ≤25 (9:16)>
TYPED       : line <n> "<string>" f<a>-f<b> at <cps> (key token at 7-9 cps)
TRIGGER     : Enter | save | Send at f<c> (6 f pause before); consequence f<d>
OUTPUT      : f<e> "<line>"; f<e+3> "<line>" … (2-4 f per line)
STATE       : ✓/✖ lines, colour + glyph, held to f<f>
CAMERA      : locked | breathe +x% | cut-in ×n at f<g> | caret-follow
MUST-READ   : "<token>" cap <px>, landed f<x>, held to f<y>
NUMBERS     : <value> = <metric> · <percentile> · <region> · <payload> · <date> · source <doc/link>
SECRETS     : keys shown as $ENV_VAR or sk_test_••••; user/host anonymised; no internal paths
MUST STAY UNCHANGED : strings, package name, version, flags, colours, window rect
SOUND       : keystroke bursts f<…>; Enter click f<c>; ok tone f<…>; err tone f<…>
NEGATIVES   : no invented flags; no code that would not compile; no unblurred scroll >5% W/f; no ligature-only glyphs
```

---

## 6. Style direction

### 6.1 Visual

- **The editor and the terminal are the stage.** Default to a dark tinted canvas (Part 02 §11.5) where white-ish code surfaces become light sources, as Lottieicon's white UI pills do on black [V:1ccYWJ]. The film's chrome (canvas gradient, glow) stays **around** the windows; inside a window, use the real editor theme the team ships in docs (or a neutral one built from §6.2).
- **Windows, not screenshots of desktops.** Frameless rounded windows with a 40-48 px header showing only the file name (`jobs/welcome.ts`) or the shell label (`~/my-app`). No OS menu bars, no dock, no third-party IDE logos (trademarks; Part 06 UI-E01 "frameless by default", 7/8 references frameless).
- **Window width 62-78% W at 16:9** (≈1190-1500 px); one window per shot, two only for request → response (each 44-46% W). In 9:16: 810 px (75% W) centred.
- **Radius 16-20 px** (editor-like, tighter than consumer cards); shadow y 24 px, blur 48 px, black 35-45% on dark canvases (shadows need more opacity on dark), plus a 1 px hairline at white 8%.
- **Anchor rect:** the terminal and the editor occupy the **same rectangle** so window swaps read as Cmd-Tab, not a scene change (Wix's prompt bar is locked for 3.8 s across 6 shots [V:15VhHR]).
- **Before world vs after world:** the DIY "before" uses the same dark canvas but desaturated and denser (more files, smaller type 0.94-0.96 scale, ink #8B93A7); the "after" is full colour at 1.0.
- **Depth:** 3 planes (canvas gradient / window / accent glow). A fourth plane only in the one 3D beat (§8).
- **Texture:** 1-2% grain or dither on every dark gradient (Lottieicon's black-green gradients band [V:1ccYWJ rule 16]; banding is MK-03 in 5/8 references).
- **Real data**: realistic ids (`u_8F2`, `job_3kQ9`), plausible timestamps, plausible latencies (184 ms SMTP, not 1 ms). No `foo`, `bar`, `test123`, lorem ipsum.

### 6.2 Color

Colour has four jobs in this format, each with one fixed meaning (Part 02 "one accent, one meaning"):

| Role | Rule | Default (dev-dark) |
|---|---|---|
| **Brand accent** | Product name, CTA, logo, the "after" side of the delta, the one highlighted line | Tern green #3DDC97 (10.9:1 on #0B0E14) |
| **Syntax palette** | ≤4 token colours + ink + comment; each ≥4.5:1 on the editor surface | Below |
| **Status: ok / error / warning** | Final states in logs (not transitional): ✓ ok, ✖ error, ⚠ warning. **Always paired with a glyph** (red/green alone fails for ≈8% of men with colour-vision deficiency [inferred, common figure]) | ok #3DDC97 · err #FF7A7A (7.7:1) · warn #FFB86B |
| **Working / AI colour** | Transitional only: spinner, "running…", AI completion, on ≤15 f, settled in 6-8 f (Part 06 UI-A16) | Info blue #7CC8FF |

If the brand accent is green, do not also use green as the "ok" colour in a way that makes the logo read as a status; either make "ok" the brand accent deliberately (Tern does: "jobs that finish" = green) or shift ok to the info blue.

**Dev-dark code palette** (contrast computed for this guideline, WCAG formula; first value on canvas #0B0E14, second on window surface #121722):

| Token | Hex | Contrast | Use |
|---|---|---|---|
| Canvas | #0B0E14 | — | Film background (with a 0-6% accent radial glow behind the window) |
| Window surface | #121722 | — | Editor / terminal body |
| Ink (identifiers, output) | #E6E9EF | 15.9 / 14.7 | Default text |
| Comment, line numbers, muted output | #8B93A7 | 6.3 / 5.8 | Comments, gutter, timestamps |
| Prompt glyph `❯` / `$` | #6B7385 | 4.1 / 3.8 | Texture only (≥3:1) |
| Keyword | #C4A5FF | 9.4 / 8.7 | `import`, `export`, `const`, `async` |
| String | #9BE38C | 12.7 / 11.8 | `"@tern/sdk"` |
| Function / type | #7CC8FF | 10.6 / 9.9 | `job`, `send` |
| Number | #FFB86B | 11.3 / 10.5 | `5`, `184` |
| Accent / ok | #3DDC97 | 10.9 / 10.1 | ✓ lines, highlight band (12% fill) |
| Error | #FF7A7A | 7.7 / 7.1 | ✖ lines |

**Light variant** (docs embedded in light pages; on #FAFAF8): ink #14161C (17.3:1), comment #5F6676 (5.5:1), keyword #7A3FD1 (5.8:1), string #1F7A3A (5.2:1), function #0B63C4 (5.6:1), number #A85400 (5.1:1).

Presets that fit:

| Preset | Canvas | Accent | Fits |
|---|---|---|---|
| **Dev-dark** (default) | #0B0E14 + accent radial glow ≤6% | Brand accent, one | CLIs, SDKs, infra, OSS |
| Dark neon library [V:1ccYWJ] | #000 → #114110 blobs | #38D037 | Component kits, icon/animation libraries, "drops" |
| Prompt-native minimal [V:1CSXtQ] | #FFFFFF | Brand accent on the icon only; system blue for "on" | Integrations and connectors with a light product |
| Calm editorial (G03) | #f5f5f5 / #0c0a09 | One platform hue | API for AI audio/voice, premium platforms |
| Night claim / day proof [V:19NRDv] | #06004E / #FCFCFC | #F4643C | Payments and B2B infra APIs |

### 6.3 Typography

Two families only: **one sans for statements** and **one monospace for code, commands, ids, versions and URLs** (Part 07 role table: "Code / tokens → monospace" [V:1-6l8S t=59.73s]; [E] Geist Mono for tags). Free stand-ins (SIL OFL): JetBrains Mono, Geist Mono, IBM Plex Mono, Fira Code (with ligatures **off**). Sans: Inter / Geist (calm), Space Grotesk / Manrope (energetic; Part 07 TY-W2 "creator tools, dev tools, dark neon → rounded geometric sans at 500").

| Role | 16:9 @1080 | 9:16 @1920 | Rule |
|---|---|---|---|
| Pain / hook line (sans) | cap ≥6.5% H (≥70 px cap) | 96-120 px font | Part 01 H5 |
| Product name (reveal) | cap 10-14% H (108-150 px cap) | 200-250 px font | The hero word; use the wordmark file if it is a logotype |
| Category line | 64-72 px font (cap ≈46-50 px) | 64-80 px font | ≤7 words |
| **Code in the editor / terminal** | **46 px mono** (JetBrains Mono cap ≈0.73 em → ≈33.6 px cap = 3.1% H); line-height 1.45 (67 px) | **≥52 px mono** for must-read code (9:16 body floor, P07 / G-27); 40 px only for non-must-read texture lines; key token ≥52 px, or larger via cut-in | Must-read code cap ≥3% H (Part 06 UI-L1) |
| Characters per code line | **≤44 recommended, 48 max** at 46 px (0.6 em advance = 27.6 px/char; 48 chars + 3-char gutter + 2×48 px padding ≈ 1500 px = 78% W) | **≤19 chars** at 52 px (720 px safe width − 64 px padding − 2-char gutter ≈ 594 px ÷ 31.2 px); ≤25 chars only for 40 px texture lines | Rewrite, never shrink |
| Lines visible per shot | **≤6** (G03: ≤6 lines) + ≤2 dimmed context lines | ≤5 | Read budget ≈0.5 s per line [inferred] |
| Output / log lines | 40-46 px mono | ≥52 px if must-read; 40 px texture only | Must-read lines ≥46 px or cut-in |
| Must-read token after cut-in | cap ≥4% H (≥43 px cap) | ≥64 px | "184 ms", `"queued"` |
| Delta / benchmark value | cap ≈6-9% H (65-97 px) | ≥96 px | Tabular figures |
| Adopt chips | cap ≥3% H (≥32 px cap) | ≥48 px | ≤3 words each |
| Command in CTA | 52-58 px mono | ≥52 px mono | Exactly the docs command |
| URL | ≥3.5% H, mono or sans | ≥52 px | Lottieicon's 2% H URL is flagged [V:1ccYWJ] |

- **Ligatures off** for all code shown in film [inferred]: `=>` must look like what the viewer types; ligature glyphs confuse viewers copying from a paused frame.
- **Tabular figures** on every counter and latency (Part 07 role table, so digits do not jitter).
- Sentence case for statements; code keeps its own case; product name exactly as the brand writes it (`tern` vs `Tern`), the package name exactly as published (`@tern/sdk`).
- Weight: sans 500-600 for launch energy, 400 for calm; mono 400 (500 for the highlighted line only).
- ≤6 words per statement card; ≤3 same-treatment statement cards in a row (MK-05: text-card fatigue in 4/8, Lottieicon 6 in a row [V:1ccYWJ t=33.2-39.1s]).
- **0% overshoot on type, code and UI** (8/8 references).

---

## 6b. Technique classes for this format

Each row cites master IDs; the class of an ID is the master's (U universal, S style-specific, X experimental, A avoid, SaaS). The format column says how this format uses it. Assignments to this format are [inferred] from the guideline's own sections unless an evidence tag is given.

| Class | Techniques for this format (master IDs) |
|---|---|
| Universal | Real code, real commands, real output (AA-U1); diegetic typing at 7-9 cps on key tokens; cut-ins CM-20 on the token that matters; hard cuts TR-01 and motion-match cuts TR-04 |
| Format-specific | Dev-dark look, built from the dark neon reel (ST-E2); terminal and editor chrome UI-E12; screen-to-world CM-16 for the one hero beat; status chips ("202 Accepted") and JSON cascades (UI-E04) |
| Experimental | Decode / scramble reveal RV-20 on an ID (once per film); a continuous take over 6.3 s (DU-X1); cursor as a cue UI-C9 [X] |
| Avoid | Fake or uncompilable code; marketing slogans in place of a real error or command ("Tired of complexity?"); code below the 52 px 9:16 floor for must-read lines; alarm buzzers and "access denied" beeps |
| Especially good for SaaS | Install → write → run → inspect proof blocks that shrink (DU-U3); dashboards and tables UI-E13 [S, SaaS] and UI-E15; integrations and language tiles UI-E21 |

## 7. Motion language with numbers

### 7.1 Ease tokens (Part 03 §19.3)

| Token | cubic-bezier | Use here |
|---|---|---|
| E-OUT | (0.33, 1, 0.68, 1) | Windows, chips, statement words (12 f) |
| E-SNAP | (0.05, 0.7, 0.1, 1) | Name pop, status chip pop |
| E-SNAP-L | (0, 0, 0, 1) | Counters landing (lines, ms) |
| E-GLIDE | (0.25, 0.1, 0.25, 1) | Cursor travel, request pulse, tab underline |
| E-INOUT | (0.65, 0, 0.35, 1) | Pull-backs, loop returns |
| E-EXIT | (0.3, 0, 0.8, 0.15) | Suck-in, punch, anything into a cut |
| E-LINEAR | (0, 0, 1, 1) | Breathing push, tally counters, countdown rings |
| E-CRIT | spring stiffness 179, damping 26.8 | When a spring API is required, 0% overshoot |

Never Remotion's default spring (damping 10 → 16.3% overshoot).

### 7.2 Developer-surface speeds

| Element | Numbers | Source |
|---|---|---|
| **Typing a readable command** (wide) | 15-20 chars/s; 170-200 ms between words | UI-K1 [V:15VhHR t=4.2-6.57s] ≈19 |
| **Typing the key token** (`retries: 5`) | **7-9 chars/s**, first letters ≈4 | UI-K1 [V:15VhHR t=6.57-8.6s] 7-8; [V:1CSXtQ t=13.28-14.03s] ≈4 |
| Typing filler (`npx`, `import {`) | 25-35 chars/s, bursts to 50 | UI-K1 [V:1CSXtQ t=15.0-16.0s] |
| Pause before Enter | 6 f [inferred] | UI-K2 "0.9-1.1 s at phrase breaks", shortened |
| Caret blink | 0.3 s on / 0.3 s off (18 f period); hidden once output starts | UI-K3 [V:1CSXtQ] |
| Pre-written code lines | Cascade 2 f per line, each fading 4 f, rise 0.5% H | Part 06 cascade [inferred] |
| Code tokens appearing (AI completion, generated code) | 1 token per 3-4 f; identifiers may get outlined chips | [V:1-6l8S t=59.73-62.9s] |
| **Terminal output** | 1 line per 2-4 f (machine pace); a progress line updates every 2 f; ≤8 output lines per command | UI-E04 machine stream ≈2 f/word |
| Spinner / "running…" | Braille spinner frame every 2 f; on screen **≤30 f** | UI-E04 mistakes |
| Status swap (running → ✓/✖) | Glyph and colour swap in 1 f; line tint 12% fills in 4 f | Part 06 state change "software changes instantly" |
| Line highlight band | Accent at 12% opacity, fades in 4 f E-OUT, full line width | [inferred] |
| Diff | Removed lines: red tint 12% for 6 f, then collapse height 8 f E-EXIT; added lines: expand 8 f E-OUT, green tint 12%, `+` gutter | [inferred] from cascade + exit tokens |
| JSON response | Braces first, then one key/value line per 3 f; the proving line highlighted 4 f later | [V:1CSXtQ t=20.00-21.47s] row every 4-6 f |
| Request pulse (request → response) | Dot 12-16 px travels the link line in 12 f E-GLIDE (≤3% W/f); 1 trailing ghost at 40% | [V:19NRDv t=39.87-46.13s] data pulse |
| Retry / backoff countdown | Ring or bar drains **in real time** (1 s shown = 30 f); never "2 s" drawn in 1 s | §12 honest time |
| Language tab swap (slot machine) | Underline glides 8 f E-GLIDE; code swaps in 1 f; every 15 f; ≤3 swaps | [V:1ccYWJ t=5.43-7.30s] swaps every 15 f |
| Counter (lines, ms) | Tally: linear, hard stop, ≈1 s for 2-3 digits; or E-SNAP-L reaching ≈95% by f10, final by f33 | Part 06 tally [V:1ccYWJ t=9.93-11.80s] |
| Window swap (terminal ↔ editor) | Hard cut, same rect (anchor), 0 f | [V:15VhHR] anchored element |
| Chips | 12 f E-OUT, rise 5% H, 4 f stagger | Part 06 #4, #8 |

### 7.3 Signature moves for a developer launch

| Move | Numbers | Source |
|---|---|---|
| **Error-log hook** | f0: first red line already on screen; 2nd line at f4, 3rd at f8 (whole lines, no typing); f24 the statement lands over them as the lines dim to 30% in 4 f | Part 01 H1 (text on f0); [V:19NRDv] red as "failure" state |
| **Name pop** | Grows +40-55% in 6 f (velocity peak f2), holds 6-10 f, 0% overshoot; at the shot end **suck-in −24 to −30% over 8-18 f E-EXIT**, hard cut on the smallest frame | [V:1ccYWJ t=1.87-2.60s] |
| **Enter-caused cut** (signature, 3-5 per film) | Enter press frame = click SFX; first output 3-8 f later; when the output belongs to the next shot, cut 3-8 f after the press | Part 06 UI-P8; [V:1CSXtQ t=10.267-10.367s] click-caused cut |
| **Fail → retry → succeed** | ✖ line red; real-time countdown; ✓ line green; cut-in 2x on the ✓ line | [V:19NRDv t=39.87-46.13s] red, red, teal |
| **Line-count strike** | `212` struck (strike draws 8 f) → `6` lands E-SNAP-L in 10 f | Kit `hook` strike; Part 01 hooks |
| **Request → response pulse** | §7.2 pulse; status chip pops 6 f E-SNAP on arrival | [V:19NRDv]; G05 card → toast |
| **Anchored language slot** | Tabs `TS · Py · Go · curl`; same rect; 15 f per swap | [V:15VhHR]; [V:1ccYWJ] |

### 7.4 Holds and life

- Every hold breathes: +3-6% linear push across the hold, or 0.1-0.3% W/f drift; **≤0.2% W/f while code is read** (Part 04 #1-3). Code moving under the eye is harder to read than prose.
- **Only the lockup is fully still** (2.2 s).
- One primary motion per frame (typing, or output, or the cursor) plus ambient drift (Part 06 #22).
- Overshoot: **0%** on code, UI, type and data.

---

## 8. Camera language

| Move | Numbers | Use here | Evidence |
|---|---|---|---|
| **Locked + breathe** (default) | Locked; +3-6% linear push over the shot | Every editor and terminal shot | Part 04 #1; 19/25 Lottieicon shots locked [V:1ccYWJ] |
| **Cut-in on the proving token** | 2-2.5x, instant, on a cut; token cap reaches 4-7% H | The ✓ line, the latency, `"queued"` | [V:15VhHR t=6.57s] 3.4x; [V:19NRDv t=13.13s] 2.5x |
| Caret-follow truck | Caret held at ≈65% W; E-LERP k 0.2-0.25 | Long commands (>40 chars) only | [V:1CSXtQ t=4.5-7.2s] |
| Short push into the trigger | ≈115-130% over ≈15 f before Enter / Send | ≤2 per film | [V:15VhHR t=28.0-28.5s] |
| Reveal pull-back | x0.75-0.80 over 21-31 f E-INOUT | From one line out to the whole dashboard or diagram | [V:1CSXtQ t=8.0-9.03s] |
| **Screen-to-world** (the one 3D beat) | x0.57 in 10 f, then ≈x0.56 decelerating over 18-20 f; studio fades in 6 f | API/integration: "your app → the API → workers" | [V:1CSXtQ t=17.80-19.03s]; Part 04 CM-16 "the cleanest way to explain a connector or an API" |
| Hop-and-hold tour | 17-32 f glides, 7-20 f holds, peak ≤8% W/f (blur above) | Component libraries, region maps | [V:1ccYWJ] (its 22-27% W/f pans strobe) |
| Focus by subtraction | Context to 40% (secondary) / 15% (texture) in 3-6 f | Highlight one line in a file or one row in a dashboard | Part 06 |

Rules:
- **Land, then read** (Part 06 UI-Z5): no zoom, pan or scroll while code is being read.
- **Never scroll a code file to show its length.** Show length as a count (212 lines) or a minimap thumbnail; a scrolling file is unreadable and reads as filler (Part 03 "linear scrolls of a full screen recording at reading-impossible speed reads amateur").
- Unblurred speed ≤5% W/f; 5-10% W/f needs 180° motion blur; >10% only as a whip into a cut. Never motion-blur code that must be read.
- Code planes in 3D: tilt ≤15° while read, flattened to 0° in 7-8 f before reading; ≤35° only in transit (Part 04; [V:19NRDv t=16.73-21.55s]).
- Roll 0°; camera overshoot 0%; one 3D beat ≈10-15% of runtime (here ≤4.5 s of 45 s).

---

## 9. Transitions

Defaults (Part 05 §0.3): one scene change every ≈2-3.5 s (this format reads code, so ASL runs ≈3.2 s); ≥75% hard cuts; one signature device used 3-12 times; 2-4 hero one-offs.

| Transition | Spec | Where | Evidence |
|---|---|---|---|
| **Anchor cut (window swap)** (signature A) | Terminal ↔ editor in the same rect; hard cut; the header label changes (`~/my-app` ↔ `jobs/welcome.ts`) | Install → Write → Run | [V:15VhHR] anchored prompt bar 3.8 s across 6 shots |
| **Enter-caused cut** (signature B) | Cut 3-8 f after the Enter/Send press | Run, Call | Part 06 UI-P8 |
| Suck-in into a cut | −24 to −30% over 8-18 f, expo-in | Out of the name card | [V:1ccYWJ t=2.33-2.60s] |
| Continuity cut-in | Same window, 2-2.5x | Onto the proving line | Part 04 CM-20 |
| Pulse hand-off | The request pulse exits frame right and the next shot opens with it arriving | Request → response across 2 shots | Part 05 velocity hand-off [V:1CSXtQ t=17.80s] |
| Screen-to-world | §8 numbers | Once, for the API/architecture beat | [V:1CSXtQ] |
| Blur/defocus dissolve | 6 f | Into the delta breather | [V:1CSXtQ t=21.47s] |
| Punch into a cut | +18-33% over the last 3-8 f, expo-in; ≤1 per 15-20 s | Climax → CTA | [V:1-6l8S t=7.83s] |

Hand-off grammar: the last 6-10 f before a cut accelerate; the first frames after settle. Music-led cuts land 0-2 f **before** the beat; **UI micro-timing (typing, Enter, output) stays product truth and is never forced onto the grid** (Part 09: "forcing a typing step onto the grid makes the product look staged").

Avoid: "hacker" glitch transitions, Matrix rain, scanlines, CRT warps (cliché, and read as security theatre); typewriter crossfades between code states (code changes instantly); a 1 f dip to black between windows (Bumper's flaw [V:19NRDv t=25.60s]); plug-in packs (Part 05 TR-A1: 0/8 references use them).

---

## 10. UI treatment: code, terminal, API, dashboard

### 10.1 Believability laws for developer surfaces

G02's five laws (cause, order, speed, focus, payoff; Part 06 §8.1), plus six for developer launches:

6. **It runs.** Every snippet compiles and runs in a fresh project at the shown package version. Every command exists with exactly those flags. QC by pasting from the storyboard, not from the source repo.
7. **One example, end to end.** The `welcome` job written in Write is the one that runs in Run, appears in Inspect and is called in Call. Ids carry through (`u_8F2`, `job_3kQ9`).
8. **Honest time.** On-screen durations play in real time or are labelled ("sped up 4x"). A "1.2 s install" shows ≈36 f of output, or says "trimmed".
9. **Failure is shown and handled** at least once when reliability is the promise: a red line that the tool recovers from is more persuasive than a run that never fails [V:19NRDv t=39.87-46.13s].
10. **No secrets, no personal chrome.** Keys as `$TERN_KEY` or `sk_test_••••`; shell prompt reduced to `❯`; no usernames, hostnames, home paths, branch names, internal URLs, other companies' repos.
11. **Shipped surface only.** The CLI output, dashboard and API shape are the GA (or labelled beta) ones on launch day. No roadmap endpoints.

### 10.2 Choreography patterns

| Pattern | What happens | Best for | Source |
|---|---|---|---|
| **DT-1 Install → ready** | `❯` + caret on f0 of the shot; command types at 15-20 cps; 6 f pause; Enter (click SFX); output lines every 3 f; ✓ "ready" line held ≥30 f | Every CLI/SDK | UI-K1, UI-E04 |
| **DT-2 Key line** | Code pre-written (cascade 2 f/line); one empty line types the key token at 7-9 cps; highlight band 4 f; save glyph (● → ✓ in the tab) 1 f | SDKs, config-as-code | [V:1-6l8S] code card; UI-K1 |
| **DT-3 Fail → recover** | Run; ✖ red line; real-time backoff; ✓ green line; cut-in 2x on ✓ | Queues, retries, failover, edge, caching | [V:19NRDv] failover |
| **DT-4 Request → response** | Request card left, response right; Send; pulse 12 f; status chip pops; JSON lines every 3 f; one key highlighted | REST/GraphQL APIs | [V:1CSXtQ] send → answer |
| **DT-5 Language slot** | Same request card; tab underline + code swap every 15 f, ≤3 swaps; must-read = tab names | Multi-SDK products | [V:15VhHR]; [V:1ccYWJ] |
| **DT-6 Diff** | Before code (12-20 lines, dimmed, should-read) → removed lines tint red and collapse → the new 3-6 lines expand green | "Replace X with us", migrations, v2.0 | [inferred] |
| **DT-7 Trace inspect** | Cursor 17 f E-GLIDE to a dashboard row, dwell 18 f, press; row expands 6 f; spans cascade 3 f; cut-in 2.5x | Observability, job platforms, databases | Part 06 UI-C4, UI-P1 |
| **DT-8 Architecture by state colour** | 3-5 nodes on a 2.5D plane; a pulse travels links; nodes turn red/teal by state; no labels needed beyond node names | Infra, networking, multi-region | [V:19NRDv t=39.87-46.13s]; [V:1Hcg3X] |
| **DT-9 Screen-to-world** | The response card pulls back x0.57 → the app, API and workers revealed as planes in a studio | Integrations, "where your request goes" | [V:1CSXtQ t=17.80-19.03s] |

### 10.3 Legibility contract

| Tier | Contents in this format | 16:9 minimum | 9:16 minimum |
|---|---|---|---|
| Must-read | Product name, the command, the key code line, the ✓/✖ line, the proving value, delta numbers, adopt chips, CTA command, URL | cap ≥3% H (46 px mono); ≥4% H when the shot exists for it | mono ≥52 px (40 px only for texture lines); sans ≥52 px |
| Should-read | Other code lines, other output lines, dashboard columns | cap 2.5-3% H | ≥36 px |
| Texture | Dimmed context code, file trees, other dashboard rows | <2.5% H, dimmed to 15-40% | <36 px |

All 8 references put meaning in micro-text (Part 11 MK-01, 7/8 below the 3% H floor). In this format the usual victims are the **install command** under the logo, the **licence/free-tier line**, and the **format pill** (Lottieicon's "AEP + JSON" at ≈1.5% H [V:1ccYWJ]). Make them must-read or cut them.

### 10.4 Resolution and rendering

- Build code as **vector text** (T2) in the renderer: sharp at any cut-in. If you must use screenshots, capture at ≥ max zoom × delivery width (a 2.5x cut-in on 1920 px needs a 4800 px source; Part 06 §10.4).
- Render code with a real highlighter (Shiki / Prism grammar) so token colours are correct for the language; then map to the film palette.
- Encode thin mono strokes at **CRF 16-18, 12-20 Mb/s at 1080p30** (G03 §codec; HubSpot's ≈176 kb/s delivery smears text [V:1CSXtQ]).

---

## 11. Sound and music

### 11.1 Music

- **Tempo: 120 BPM default** (beat 15 f, bar 2.0 s, whole-frame grid); 110-124 BPM range for dev launches; Lottieicon, the developer-adjacent reference, runs ≈112 BPM [V:1ccYWJ]; 6/8 references sit at 83-113 BPM (Part 09 §16.3). Use 100 BPM only for calm platform films (G03 register).
- Style: minimal electronic with a clean kick and plucks, or bass-forward electronic for "drops" and OSS hype. Avoid "hacker" dubstep and cinematic trailer braams.
- Arc: f0 hit → sparse → near-silence 250 ms before the reveal → riser → **drop on the first terminal frame** → groove with **intimate dips under typing** → breakdown under the delta → build → hit on the climax word → sting on the lockup, tail to the last frame.
- Under VO: duck 10-12 dB, attack 30-80 ms, release 250-700 ms; VO 150-170 wpm; never read code aloud character by character ("npm i tern sdk" is fine).
- **The film must work muted** (X and LinkedIn autoplay muted; README loops are silent).

### 11.2 SFX map (Part 09 §16.7 families)

| Family | Use in a developer launch | Place at | Level | Budget / 45 s |
|---|---|---|---|---|
| F11 Impact / sub | Hook f0; name reveal; climax word | Event frame ±2 f, after a 70-350 ms gap | +8 to +15 dB over the bed | 3 |
| **F02 Keystrokes** (signature) | Every typed command and the key line | Per burst; individual keys only when typing ≤12 chars/s | **20-25 dB under the full music level**; music dipped −6 dB under the burst | 3-5 passages |
| **F01 Enter / click** | Enter, Save, Send, dashboard press | **Press frame (0 f)**, ≥15 dB music dip 0.3-0.5 s before | Clear inside the dip | 4-6 |
| F05 Soft tick | Output line groups (one tick per group, not per line); chip groups; error lines in the hook | First full frame of the group | −8 dB | 3-4 |
| F04 Soft tone, success | ✓ lines, 202 status chip | First full frame | +0-4 dB in band, 3-6 kHz | 2-3 |
| F04 variant, error | ✖ lines: the success tone pitched down a minor third, shorter (≤120 ms) [inferred] | First full frame | −3 dB vs success | 1-2 |
| F07 Whoosh | Request pulse; suck-in | **Peak velocity frame (±2-3 f)** | +3 to +6 dB above 4 kHz | ≤2 |
| F09 Riser | Into the drop at Install | Crest 0-2 f before the cut | Crest ≈ −12 dB | 1 |
| F06 Counter ticks | Line-count tally, latency count | ≤15 ticks/s, lock accent on the final value | Low | 1 |
| F16 Ambient floor | Every "silence" | Continuous | −40 to −45 dB | always |
| F17 Sting | Lockup | ±2 f of the first full lockup frame | Loudest sustained moment | 1 |

Rules: one click per state change; whooshes and booms at peak velocity, not at the start or end of a move (Lottieicon's strongest craft signature [V:1ccYWJ rule 10]); no alarm buzzers or "access denied" beeps; sound on 15-65% of transitions. Mix **−14 LUFS ±1, true peak ≤ −1 dBTP** (−16 LUFS for a docs-page embed with VO; −18 only if speech-dominant; P09 §16.11.1). Discard any audio a video model returns (Part 11 AA-G10).

---

## 12. Copy rules

- **Hook ≤7 words (median 4), on screen at f0, in developer language**: a real error, a real count, a real command. Not "Tired of complexity?".
- **Name + category by 6 s** (5.3 s in §13). The category line says what it is in the developer's nouns: "Durable background jobs for TypeScript", not "The future of async".
- **Code is copy.** Every visible line is product truth: real package name, real import path, real flags, current version. Write it as the docs write it.
- **Numbers carry conditions**, in a texture-size source line under the number or in the VO: metric, percentile, region, payload, hardware, date, "vs what". "9 ms p50 enqueue · us-east-1 · 1 KB payload · Oct 2026". No condition → no number.
- **Comparisons are fair and sourced**: "DIY queue: 212 lines" must be a real reference implementation the team can publish. Never name a competitor's product in a benchmark without legal sign-off; compare to "DIY" or "before".
- **Banned words**: revolutionary, blazing fast, magic, seamless, 10x developer, next-gen, effortless (dev audiences discount them; at most one hype phrase per film, and HubSpot's one is "For the first time ever" [V:1CSXtQ]).
- **Adopt facts as chips, ≤3 words each, ≤3 chips**: free tier, licence, hosting, languages, status. Say "Public beta" if beta; "GA" or "v1.0" only if true.
- **CTA = the next keystroke**: the install command (exactly as in the docs quick-start), "Read the docs →", "Get an API key", "Star on GitHub" (OSS only). ≤16 characters on a button; commands may run to 24 characters in mono.
- **One package manager** in the film (npm *or* pnpm *or* bun); mention the others on the docs page, not in the video.
- Sentence case; terminal periods allowed on short statements ("Ship the job."), which adds calm finality [V:1CSXtQ t=21.60s]; no exclamation marks.
- **Close the loop**: the climax repeats the hook's word or colour (6/8 references): hook "lost on deploy" (red) → climax "Jobs that finish." (green).

**Hook examples**

| Pattern | Example | Pairs with |
|---|---|---|
| Error-log hook | Red `✖ job welcome · lost on deploy` ×3 + "Deploys shouldn't eat jobs." | DT-3 |
| Strike → new count (kit `hook`) | "Background jobs took: ~~3 services~~ Now? *6 lines.*" | DT-2, DT-6 |
| One-command hook | `❯ npx tern dev` already typed on f0, caret blinking; Enter on f20 | DT-1, bumpers |
| Benchmark hook | "~~1.4 s~~ → 9 ms" (with conditions line) | Databases, edge |
| Diff hook | 40 dimmed lines collapse to 6 green ones in 1.5 s | Migrations, v2.0 |
| Question in dev voice | "Still writing retry loops?" | Social cutdowns |
| Dialect / local (9:16) | "Cron job phir se fail?" | Indian dev-creator reels (`desi` is wrong here: use `neon` or `mono`) |

**CTA examples**

| Situation | Kicker / sub | Command / button |
|---|---|---|
| SDK / library | "Free for 10k runs a month" | `npm i @tern/sdk` + "Read the docs →" |
| CLI | "macOS, Linux, Windows" | `brew install tern` |
| Hosted API | "No card required" | "Get an API key" |
| Open source | "MIT licensed" | "Star on GitHub" + repo URL |
| Public beta | "Public beta · free during beta" | "Join the beta" |
| Major version | "Migration guide in the docs" | `npm i @tern/sdk@2` |
| Template / starter | "Deploys in one click" | "Use the template" |

---

## 12b. Typography

One place for this format's type decisions; sizes are P07 §9.2 tokens (font px at 1920×1080 / 1080×1920), entrances and exits follow P03 SP-T0, word budgets and holds follow P01 H2 and P07 §9.11.

| Item | This format |
|---|---|
| Families and weights | Two families only: one sans for statements, one monospace for code, commands, IDs, versions and URLs (§6; [E] Geist Mono) |
| Size tokens | Code 46 px mono at 16:9 (cap ≈3.1 % H), ≥52 px mono at 9:16 for must-read lines (40 px only for texture); T-STATEMENT 90 / 128 px; T-HERO 185 / 240 px for the product name; T-URL ≥54 / ≥52 px in mono |
| Reveals | RV-10 diegetic typing (filler 28-35 cps, key tokens 7-9 cps), RV-09 display typewriter, RV-14 staggered line fade for output, RV-28 inline chip |
| Exits | EX-13 status swap, EX-14 dim when superseded, EX-02 blur dissolve |
| Word budget | Hook ≤7 words (≤5 in 9:16), in developer language; code ≤44 characters per line at 16:9 (48 max), ≤19 at 52 px in 9:16; CTA is the real command |
| Holds | Punch word 10-15 f; kinetic line of ≤3 words ≥10-14 f landed; statement of 4-6 words ≥0.8 s landed; payoff, result or status ≥1.0 s still; no text event under 25 f except SD-03 punch cards in a run (P07 §9.11.2, P08 §17.8 #3-4); lockup ≥1.5 s still (2.2 s premium) |
| Floors | Must-read text inside the safe area (16:9 x 96-1824, y 54-1026; 9:16 x 120-840, y 270-1210); 9:16 body font ≥52 px; contrast ≥4.5:1 (3:1 large), ≥7:1 or a ≥60 % scrim over footage (P07 §9.21, P11 G-27, G-37) |

## 13. Worked example storyboard: "Tern v1.0", 45 s, 16:9 master

**Fictional product.** Tern is a durable background-jobs service with a TypeScript SDK (plus Python, Go and a REST API). You define a job in code; Tern queues it, retries it with backoff, schedules it and shows every run in a dashboard. No Redis, no worker fleet. (The name, package `@tern/sdk` and domain `tern.example` are fictional; check a real name is not a registered package before reuse.)
**Format:** 1920x1080, 30 fps, 1350 f. **Template:** §4.1 thirteen stages; three shrinking proof blocks (Install + Write 8.5 s, Run + Inspect 7.5 s, Call 6 s; −12 % and −20 %, P08 DU-U3). **Style:** dev-dark (§6.2): canvas #0B0E14 with a 6% #3DDC97 radial glow behind the window, window #121722, ink #E6E9EF, Tern green #3DDC97 (accent and ✓), error #FF7A7A, info #7CC8FF. **Type:** Space Grotesk 500/700 for statements; JetBrains Mono 400/500, ligatures off, 46 px / 67 px line-height in windows. **Window rect (anchor):** x 330-1590, y 230-830 (1260x600 px, 66% W), radius 18 px, header 44 px. **Music:** 120 BPM (beat 15 f), cuts 2 f before beats. **Claims:** "212 lines / 3 services", "9 ms p50", "10k runs free" are **placeholders**; replace them with the team's measured and published figures (with conditions) or delete those beats.

**The code (6 lines, ≤41 chars, compiles against the fictional SDK):**

```ts
import { job } from "@tern/sdk";
import { mail } from "./mail";
export const welcome = job("welcome", {
  retries: 5,
  run: ({ userId }) => mail.send(userId),
});
```

Cut frames: 0 · 58 · 148 · 268 · 388 · 508 · 628 · 748 · 838 · 928 · 1018 · 1108 · 1183 · 1258 · 1350 (beats at 60, 150, 270, 390, 510, 630, 750, 840, 930, 1020, 1110, 1185, 1260).

| Scene | Timestamp | Duration | Visual | UI / product action | Camera | Object motion | Text | Transition (out) | Lighting | Sound | Music | Motion notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 Pain (hook) | 0:00.00-0:01.93 (f0-58) | 1.93 s (58 f) | Terminal window in the anchor rect, header `~/my-app · logs`; three red log lines | f0 line 1 already on screen: `✖ job welcome · lost on deploy`; f4 line 2 `✖ job invoice · lost on deploy`; f8 line 3 `✖ job digest · lost on deploy` (whole lines, 1 f in, 4 f tint); f24 lines dim to 30% in 4 f | Locked; push +6% linear | f24-36 statement words rise 3% H, 3 f stagger, E-OUT, 0% overshoot | Mono lines 46 px #FF7A7A with ✖ glyph; statement "Deploys shouldn't eat jobs." Space Grotesk 700, **96 px font (cap ≈70 px, 6.5% H)**, centred over the window | Hard cut f58 | Dark; red lines emit a faint 4% red bloom | F11 sub f0 (+10 dB); F05 ticks f0, f4, f8 (−8 dB) | Sparse pulse from f0 | Text on f0 = thumbnail (red log + window). Hook = 4 words. The red sets up the green callback |
| 2 Before | 0:01.93-0:04.93 (f58-148) | 3.00 s (90 f) | DIY stack: file tree left (9 files), desaturated, scale 0.96; counter right | f62-78 files cascade 2 f each: `queue.ts worker.ts retry.ts backoff.ts dlq.ts cron.yaml redis.conf docker-compose.yml alerts.ts`; f80-112 counter tallies 0 → 212 lines (linear, hard stop, 32 f); f118 chip "3 services to run" (12 f E-OUT) | Locked; push +4% linear | Files fade 4 f, rise 0.5% H; nothing else moves | Files 34 px mono #8B93A7 (texture); **"212 lines" 96 px tabular**, cap 70 px; chip "3 services to run" cap 34 px; held f130-146 | Hard cut f148 on a hit (colour returns in shot 3) | Cooler, flatter: glow off | F06 ticks under the tally (≤15/s), lock f112; 250 ms near-silence f140-148 | Pulse thins | One readable fact (212 lines · 3 services). Placeholder figures |
| 3 Reveal | 0:04.93-0:08.93 (f148-268) | 4.00 s (120 f) | Clean canvas, green radial glow 6% at centre; Tern mark + name | f150 kicker "Introducing" fades 12 f E-OUT; **f158 "Tern" name pop** +45% in 6 f (E-SNAP, peak f160); mark stroke draws 12 f f158-170; f176-194 category line word by word (3 f stagger); hold to f248; f250-266 suck-in −26% over 16 f E-EXIT | Locked; breathe +5% linear | Name: 0% overshoot; suck-in to the smallest frame on f267 | Kicker "Introducing" cap 30 px tracked +3%; **"Tern" cap 140 px (13% H)** white, mark #3DDC97; category "Durable background jobs for TypeScript." 68 px font | Suck-in → hard cut f268 | Glow brightens 0 → 6% over 12 f with the name | F11 impact f158 (+12 dB); F09 riser f200-266, crest f266; F07 whoosh at suck-in peak velocity ≈f262 | Riser into **drop at f270** | **H1 at f158 (11.7%)**. Named at 5.27 s. |
| 4a Install | 0:08.93-0:13.43 (f268-403) | 4.50 s (135 f) | Terminal in the anchor rect, header `~/my-app` | f268 `❯` + blinking caret (18 f period); f272-278 types `npm i ` (30 cps, filler), f278-308 `@tern/sdk` at 9 cps (key token, 30 f); 6 f pause; **Enter f314**; output f318 `added 1 package in 1.2s`; f324-344 types `npx tern dev` (12 chars ≈18 cps); **Enter f350**; f354 `✓ Dev server · http://localhost:8288`; f357 `· Found 0 jobs · watching ./jobs` (muted) | Locked; breathe +3% | Caret hides on each Enter; output lines appear whole (1 f) with 4 f fade | Commands 46 px ink; ✓ line #3DDC97; must-read `npm i @tern/sdk` and `✓ Dev server`, held f357-401 | **Anchor cut** f403 (same rect, header changes) | Window is the light source; glow 6% | F02 keystroke bursts f272-308 and f324-344 (−22 dB vs music); F01 Enter f314, f350 (music dip −15 dB from f302 and f340); F05 tick f354 | **Drop f270**; groove; −6 dB under typing | DT-1. Real time: "1.2s" output arrives 4 f after Enter, so the line reads "added … in 1.2s" without showing 1.2 s of waiting (allowed: the claim is the tool's own log, not a timed visual) |
| 4b Write | 0:13.43-0:17.43 (f403-523) | 4.00 s (120 f) | Editor in the anchor rect, tab `jobs/welcome.ts`, gutter 1-6 | f405-415 lines 1-3, 5, 6 cascade (2 f/line, 4 f fade); line 4 empty with caret; f419-460 types `retries: 5,` at **8 cps** (11 chars, 41 f); f461 highlight band on line 4 (#3DDC97 12%, 4 f); f467 tab dot ● → ✓ (saved, 1 f); f471 toast slides from the window's bottom edge (9 f): `✓ Found 1 job · welcome` | Locked; breathe +3% | One motion at a time: cascade → typing → band → save → toast | Code 46 px mono, syntax palette §6.2; **must-read line 4 `retries: 5,`** (weight 500); toast 40 px; held f480-521 (41 f) | **Anchor cut** f523 back to the terminal | Same | F02 burst f419-460 (individual keys: typing ≤12 cps); F05 tick f467 (save); F04 soft tone f480 | Groove, −6 dB under typing | DT-2. Only the key line types; 6 lines, longest 41 chars. Proof block A ends (8.5 s) |
| 4c Run | 0:17.43-0:21.43 (f523-643) | 4.00 s (120 f) | Terminal (anchor rect) | f527-551 types `npx tern send welcome` (21 chars ≈26 cps); **Enter f555**; f559 `→ welcome  u_8F2  attempt 1  running` (muted, braille spinner 2 f/frame); f571 swaps to `✖ attempt 1  SMTP 421 · retry in 1s` (#FF7A7A); f571-601 a 1 s ring drains (linear, **30 f = real time**); f601 `→ attempt 2  running`; **f607 `✓ attempt 2  ok · 184 ms`** (#3DDC97, line tint 12% in 4 f) | Locked to f607; **continuity cut-in 2x on the ✓ line at f613** (instant) | Spinner ≤12 f each time; ring drains linearly | ✖ and ✓ lines 46 px (92 px after 2x cut-in = cap ≈6.2% H); held f613-641 at 2x + 6 f before = 34 f | **Enter-caused** hard cut f643 | Faint red bloom on ✖ (4%), green on ✓ (6%) | F01 Enter f555 (dip from f545); F04-error f571; F06 ticks under ring (2); **F04 success f607** | Groove | **H2 at f607 (45.0%)**. DT-3, the Bumper red → teal grammar [V:19NRDv t=39.87-46.13s]; ≥30 f payoff (Chowdeck's 2 f flaw avoided) |
| 4d Inspect | 0:21.43-0:24.93 (f643-748) | 3.50 s (105 f) | Tern dashboard (rebuilt, T2), 1440x800 px (75% W), dark surface; Runs table with 5 rows | Dashboard cuts in mid-settle (rows already there); f655 cursor enters bottom-right; 17 f E-GLIDE to row `welcome · job_3kQ9 · ok` (peak ≈4% W/f); hover f672-690 (18 f; row tint); **press f690**; row expands 6 f; f696-710 two spans cascade (3 f): red bar "attempt 1 · 212 ms · SMTP 421", dashed 1 s backoff, green bar "attempt 2 · 184 ms"; **cut-in 2.5x on the spans at f715** | Locked; cut-in 2.5x at f715 | Cursor parks right of the row at f715; no motion during the read | Row 38 px; spans 40 px → 100 px after cut-in (cap ≈6.5% H); held f715-746 (31 f, ≥1.0 s); other rows texture at 40% | Hard cut f748 | Same | F01 click f690 (dip from f675); F05 tick f696 | Groove | DT-7. The same job id carries through from 4c. Proof block B ends (7.5 s) |
| 4e1 Call: request | 0:24.93-0:27.93 (f748-838) | 3.00 s (90 f) | Request card left (46% W, x 96-980), language tabs `HTTP · TS · Py · Go` above; empty response slot right | f752-760 lines cascade: `POST /v1/jobs/welcome` · `Authorization: Bearer $TERN_KEY` · body `{ }`; f764-799 body types `{ "userId": "u_8F2" }` at 18 cps (21 chars ≈35 f); read hold f800-826; **Send (⌘↵ key glyph pulses) f832** | Short push 100 → 115% f812-827 (E-OUT); locked after | Pulse dot leaves the Send glyph at f834 heading right (E-GLIDE) | Request 44 px mono; `$TERN_KEY` (never a literal key); tab "HTTP" active, underline #3DDC97 | **Enter-caused cut** f838 (6 f after Send), pulse mid-flight | Same | F02 burst f764-799; F01 f832 (dip from f820); F07 whoosh at the pulse's peak velocity ≈f840 | Groove | DT-4 part 1. The `$TERN_KEY` env var = secret hygiene (§10.1 law 10) |
| 4e2 Call: response | 0:27.93-0:30.93 (f838-928) | 3.00 s (90 f) | Response card right (46% W) beside the request (now 60% opacity); link line between them | f838 pulse arrives (velocity hand-off, decelerating 6 f); **f842 status chip "202 Accepted" pops** (6 f E-SNAP); f846-858 JSON cascades 3 f/line: `{` · `"id": "job_3kQ9",` · `"status": "queued",` · `"runAt": "2026-10-08T09:30:00Z"` · `}`; f862 highlight on `"status": "queued"`; hold to f892; **f895 and f910 tabs swap TS → Py** (underline 8 f, code 1 f), request card only | Locked; breathe +3% | Pulse ≤3% W/f; one motion at a time | Chip 40 px; JSON 42 px; **must-read `"status": "queued"`** held f866-892 (26 f) + visible to f928; tab names must-read, code during swaps = texture | Blur dissolve 6 f (f922-928) | Same | F04 success f842; F05 tick f895 (tab swaps, one tick each, −10 dB) | Groove ends on f928 | DT-4 + DT-5. Proof block C (6 s). The same `u_8F2` / `job_3kQ9` as 4c/4d |
| 5 Delta | 0:30.93-0:33.93 (f928-1018) | 3.00 s (90 f) | Two numbers side by side on the canvas, no window | f932-940 left: `212 lines` (#8B93A7) with strike drawing 8 f (f942-950), then `6 lines` lands E-SNAP-L f952-962 (#3DDC97); f968-993 right: `9 ms` counts 0 → 9 (E-SNAP-L, 25 f) with label "p50 enqueue"; f998 condition line fades 6 f | Locked; push +3% linear | Strike → land; nothing else moves (breather) | **"6 lines" cap 86 px (8% H)**; "~~212~~" 64 px; **"9 ms" cap 86 px**; label "p50 enqueue" cap 34 px; condition "us-east-1 · 1 KB payload · Oct 2026" cap 22 px (texture, sourced); held f993-1016 | Hard cut f1018 | Glow 4% | F06 ticks f968-993, lock f993 | **Breakdown −9 dB, low-passed** | Line-count strike + benchmark. Placeholder numbers: replace with measured values or delete |
| 6 Adopt | 0:33.93-0:36.93 (f1018-1108) | 3.00 s (90 f) | Left: four language tiles; right: three chips | f1020-1032 tiles `TS` `Py` `Go` `{ } REST` land (12 f E-OUT, 4 f stagger); f1030, f1034, f1038 chips "10k runs free" / "MIT SDK" / "Self-host" (12 f E-OUT, rise 5% H) | Locked; push +4% linear | No cursor | Tiles 40 px mono glyph + 34 px label; **chips cap 34 px**; status line "v1.0 · GA today" cap 34 px at f1044; held f1050-1106 | Hard cut f1108 | Flat | One F05 tick f1030 for the chip group | Build begins f1050 | Adopt facts approved by the team (pricing, licence). 6 words in chips → hold ≥2.4 s (met: f1030-1106 = 2.53 s) |
| 7 Climax | 0:36.93-0:39.43 (f1108-1183) | 2.50 s (75 f) | Statement on canvas; ghost of the green ✓ line at 8% behind | f1110 "Ship the job." words 3 f apart (E-OUT); **f1140 "Skip the queue."** lands on the beat, "Skip" in #3DDC97; punch +20% f1177-1183 (E-EXIT) | Punch in the last 6 f | Words E-SNAP from 1.3x in 8 f, 0% overshoot | "Ship the job. *Skip* the queue." 104 px font (cap ≈75 px), two lines | Punch → hard cut f1183 | Glow pulses 4 → 8% on f1140 | **F11 impact f1140** (+12 dB) | Build f1050-1140, **hit f1140** | **H3 at f1140 (84.4%)**. Green callback to the red hook |
| 8 CTA | 0:39.43-0:41.93 (f1183-1258) | 2.50 s (75 f) | Command pill + docs link centred | f1185 command pill types `npm i @tern/sdk` at 25 cps (15 chars, 18 f) — the viewer read it in 4a, so faster is fine; f1206 copy glyph beside it (static, no fake click); f1210 link "Read the docs →" with underline drawing 12 f E-OUT; f1222 URL | Locked; shrink x0.95 over the last 8 f (E-EXIT) | No pulsing | Pill: **`❯ npm i @tern/sdk` 56 px mono** on #121722, radius 14 px; link "Read the docs →" **cap 54 px (5% H)**, ≈76 px font; URL `tern.example/docs` 40 px mono; all above y 918 | Hard cut f1258 | Flat | F02 short burst f1185-1203 (−24 dB); 100 ms gap f1253-1258 | Pad | Command identical to 4a and to the docs quick-start |
| 9 Lockup | 0:41.93-0:45.00 (f1258-1350) | 3.07 s (92 f) | Tern mark + wordmark 22% W centred; "v1.0 · Jobs that finish." under it | Mark and wordmark converge 8 px per side over 9 f; line fades 6 f; **dead still from f1284 (2.2 s)** | Locked | None after f1284 | Wordmark (official SVG); "v1.0 · Jobs that finish." cap 34 px; URL `tern.example` cap 34 px | End on the last frame, no fade | Flat; glow 6% static | F17 sting f1261, tail to f1350 | Resolves; music to the last frame | The only fully still frame |

**Rhythm check.** 14 shots, ASL 3.21 s (96 f); median 3.0 s; longest 4.5 s (10% of runtime). Code-reading films sit above the calm band (2.3-3.0 s, Part 08 #1), so a **discrete event every ≤1.5 s** is kept inside every shot (typing → Enter → output → status → cut-in). Hero moments at f158 (11.7%), f592 (43.9%) and f1140 (84.4%), each followed by ≥30 f calmer picture. Enter/Send-caused cuts: 2 (4c → 4d, 4e1 → 4e2); anchor cuts: 2 (4a → 4b → 4c). Every state change has an actor (keystroke, Enter, save, cursor press, Send, or a system event whose source, the job, is on screen). The `welcome` job and `u_8F2` / `job_3kQ9` ids carry through four shots. Name at 5.27 s; the command on screen at 9.1 s and again at 39.5 s.

**9:16 cutdown (15 s, 450 f), re-laid out, not cropped.** f0-73: red log line `✖ job lost on deploy` 52 px mono at y 380 (must-read); "Deploys shouldn't eat jobs." 96 px at y 520-760; f40 "Tern" 220 px at y 820-1040. f73-193: terminal 810 px wide (x 135-945, y 600-1160): `❯ npm i @tern/sdk` typed f78-104, Enter f110, `✓ ready` f114; anchor cut f133 to a 4-line code card rewritten to ≤25 chars (`job("welcome", {` · `  retries: 5,` · `  run: sendMail,` · `});`), line 2 types at 8 cps. f193-313: `✖ attempt 1` → 1 s ring → `✓ attempt 2 · 184 ms` at f250, cut-in 2x at f256 (y 700-860), held to f311. f313-388: command pill 52 px mono at y 760, "Free for 10k runs a month" 48 px at y 880, "Read the docs →" 64 px at y 1000. f388-450: lockup + `tern.example/docs`, still from f405. All text in x 120-840, y 270-1210.

**6 s bumper (180 f).** f0 `❯ npx tern dev` already typed, caret blinking; Enter f20; three output lines f24, f27, f30; `✓ Found 1 job · welcome` held f30-110; f110-180 lockup "Tern v1.0" + `tern.example`, still from f132.

**README loop (8 s, 240 f, 1280x720, silent).** Editor state A (5 lines, empty line 4) → line 4 types `retries: 5,` (8 cps) → anchor cut to terminal → `npx tern send welcome` → ✖ attempt 1 → 1 s ring → ✓ attempt 2 held 40 f → `clear` → anchor cut back to state A held 15 f = frame 0.

---

## 14. Building it with motion-kit vs generative video vs 3D

### 14.1 What motion-kit can build directly

Scene types: hook, kinetic, orb, title, stat, list, compare, bars, grid, quote, prompt, chat, wave, image, clip, cta, logo. Themes: midnight, clean, neon, editorial, pop, desi, corporate, mono, studio, studio-dark. Formats: reel, portrait, square, landscape. Field reference: `skills/motion-director/references/scenes.md`.

| Storyboard stage | motion-kit scene | How |
|---|---|---|
| 1 Pain + 2 Before (merged) | `hook` | `setup` "Background jobs took:", `strike` "3 services" (≤14 chars), `punch` "Now? *6 lines.*" (≤6 words). The strike *is* the before |
| 3 Reveal | `title` | `kicker` "Introducing" (or "v1.0"), `headline` "*Tern*", `sub` = category line |
| 4a Install / run a command | `prompt` | `label` "Terminal", `prompt` = the command (≤40 chars), `button` "Run", `result` = the ✓ output line. A stand-in for a terminal (see gaps) |
| 4e Request → response | `chat` | `label` = `POST /v1/...`, `prompt` = the body JSON (≤40 chars), `reply` = "202 Accepted · job_3kQ9 queued". **No `*accent*` mark inside `reply`**: the reply bubble is accent-filled, and QA measured accent-on-accent at 1:1 contrast |
| 4c Run log / status cycle | `list` with `style: "lines"` | Items = log lines ("Attempt 1 · SMTP 421", "Retry in 1 s", "Attempt 2 · *ok* · 184 ms"); earlier lines dim as later ones land |
| 4b / 4d Real code, real dashboard | `image` (`fit: "contain"`, `move: "in"`) or `clip` | A code PNG rendered with Shiki at ≥2x delivery width, or a 30 fps screen recording on clean demo data; `clip` with `scrim` 0 for UI |
| 5 Delta | `compare` (2 rows a side) or `stat` (`value` "9ms", `kicker` = conditions) or `bars` (`highlight: 1`) | `compare` beyond ≈7 s triggers a check warning: keep 2 rows a side |
| 6 Adopt | `grid` (language tiles: `icon` accepts any ≤4-char string, so "TS", "Py", "Go", "{ }" render as glyph tiles) + `list` `style: "checks"` (free tier, licence, hosting) | Or put adopt facts into the `cta` `kicker` for reels |
| 7 Climax | `kinetic` | 1-2 lines ≤28 chars |
| 8 CTA | `cta` | `kicker` = the install command, `action` "Read the docs", `style: "link"` (16:9) / `"button"` (reel), `handle` = docs URL |
| 9 Lockup | `logo` | `name`, `tagline`, `src` |

**Video settings.** `theme: "neon"` (near-black #07070A, Space Grotesk, grid background: the closest kit theme to dev-dark) or `"mono"` (Swiss black/white/red, Inter) or `"studio-dark"` (calm platforms, G03 register). Set `brand.accent` to the product colour (`npm run brand -- logo.png --spec ...`). `motion: "snappy"` or `"smooth"` (both 0% overshoot in `tokens.ts`); never `bouncy`. **`transition: "cut"`**: neon's default is `whip`, which reads as hype on code. `pace: "normal"` (16:9), `"fast"` (reel). Start from `launch-film-16x9` or `app-demo` (`npm run new -- tern --recipe launch-film-16x9 --theme neon`), then `npm run music -- specs/tern.json --track music/x.mp3` (snaps cuts to the beat), `npm run check`, `npm run preview`, `npm run qa`, `npm run make`.

**Example spec: Tern v1.0, 16:9** (validated in this session: `npm run check` → valid, no warnings, **47.8 s** at `pace: "normal"`; `npm run qa --format landscape,reel` → 0 errors, 0 warnings):

```json
{
  "format": "landscape",
  "theme": "neon",
  "motion": "snappy",
  "pace": "normal",
  "transition": "cut",
  "brand": { "name": "Tern", "accent": "#3DDC97", "accent2": "#7CC8FF", "handle": "tern.example/docs" },
  "audio": { "sfx": true },
  "scenes": [
    { "type": "hook", "setup": "Background jobs took:", "strike": "3 services", "punch": "Now? *6 lines.*" },
    { "type": "title", "kicker": "Introducing", "headline": "*Tern*", "sub": "Durable background jobs for TypeScript." },
    { "type": "prompt", "label": "Terminal", "prompt": "npx tern dev", "button": "Run", "result": "*1 job found* · dashboard on :8288", "resultKind": "text" },
    { "type": "chat", "label": "POST /v1/jobs/welcome", "prompt": "{ \"userId\": \"u_8F2\" }", "reply": "202 Accepted · job_3kQ9 queued" },
    { "type": "list", "title": "Run log · job_3kQ9", "items": ["Attempt 1 · SMTP 421", "Retry in 1 s", "Attempt 2 · *ok* · 184 ms"], "style": "lines" },
    { "type": "compare", "title": "Same job, two ways",
      "left": { "label": "DIY queue", "items": ["Redis + worker + cron", "212 lines"] },
      "right": { "label": "Tern", "items": ["One SDK, retries built in", "6 lines"] } },
    { "type": "stat", "kicker": "p50 enqueue · us-east", "value": "9ms", "label": "from *enqueue* to running" },
    { "type": "grid", "title": "Runs where you deploy",
      "items": [ { "icon": "TS", "label": "TypeScript" }, { "icon": "Py", "label": "Python" }, { "icon": "Go", "label": "Go" }, { "icon": "{ }", "label": "REST API" } ] },
    { "type": "list", "title": "Free to start", "items": ["10k runs a month", "MIT-licensed SDK", "Cloud or self-host"], "style": "checks" },
    { "type": "kinetic", "lines": ["Ship the job.", "*Skip* the queue."] },
    { "type": "cta", "kicker": "npm i @tern/sdk", "action": "Read the docs", "style": "link", "handle": "tern.example/docs" },
    { "type": "logo", "name": "Tern", "tagline": "Jobs that finish." }
  ]
}
```

Timeline at `pace: "normal"`: hook 0.0-3.0 · title 3.0-6.9 · prompt 6.9-12.2 · chat 12.2-15.9 · list 15.9-20.8 · compare 20.8-27.8 · stat 27.8-31.2 · grid 31.2-34.8 · list 34.8-38.8 · kinetic 38.8-41.7 · cta 41.7-45.1 · logo 45.1-47.8 s. To land at ≈44-45 s, drop the `grid` (move "TS · Py · Go · REST" into the `stat` kicker or the CTA sub). The first draft had 3 rows a side in `compare` (7.6 s on screen → check warning "past ~7 s viewers swipe") and `*202 Accepted*` in the chat reply (QA error: contrast 1:1); both fixes are in the spec above. All numbers are placeholders.

**Example spec: 15 s reel** (validated: valid, 15.1 s at `pace: "fast"`; QA 0 errors):

```json
{
  "format": "reel", "theme": "neon", "motion": "snappy", "pace": "fast", "transition": "cut",
  "brand": { "name": "Tern", "accent": "#3DDC97", "accent2": "#7CC8FF", "handle": "tern.example/docs" },
  "audio": { "sfx": true },
  "scenes": [
    { "type": "hook", "setup": "Background jobs took:", "strike": "3 services", "punch": "Now? *6 lines.*" },
    { "type": "prompt", "label": "Terminal", "prompt": "npx tern dev", "button": "Run", "result": "*1 job found*", "resultKind": "text" },
    { "type": "list", "title": "Run log", "items": ["Attempt 1 · failed", "Retry in 1 s", "Attempt 2 · *ok*"], "style": "lines" },
    { "type": "cta", "kicker": "Free for 10k runs a month", "action": "Read the docs", "style": "button", "handle": "tern.example/docs" },
    { "type": "logo", "name": "Tern", "tagline": "Jobs that finish." }
  ]
}
```

### 14.2 Where the kit falls short of this guideline (and the fix)

| Gap | Guideline target | Kit behaviour today (checked in `motion-kit/src`) | Fix |
|---|---|---|---|
| **No monospace font** | Mono for code, commands, ids, URLs | `public/fonts/` holds Anton, Archivo Black, Instrument Serif, Inter, Plus Jakarta Sans, Poppins, Space Grotesk, Teko; no mono. Commands render in the theme's sans | Add JetBrains Mono or Geist Mono (OFL) to `public/fonts` + `fonts.ts`; use it in custom scenes |
| **No editor / terminal / request scene** | DT-1 to DT-5 with the code bible | `prompt` draws a generic input card with a button; `chat` a box and a reply bubble | Add three templates via `docs/ADDING-SCENES.md` (proposed below) |
| Typing speed | 15-20 cps readable; 7-9 cps on the key token | `prompt` types ≈2 chars/f (≈60 cps, 18-60 f); `chat` ≈1 char/f (≈30 cps, 24-75 f, `plan.ts`) | Keep typed strings ≤20 chars (`npx tern dev`); key-token pacing needs the custom scene |
| **`pop()` overshoots in every personality** | 0% overshoot on UI and data | `motion.ts` `pop()` uses the back-out curve `(0.34, 1.56, 0.64, 1)` (≈10% overshoot of travel) when the personality has `overshoot: 0`; it drives the `stat` value, `cta` button, `grid` tiles, `chat` reply, `hook` strike, `list` markers and the `compare` hero label | Patch the non-bouncy branch to `ease.out` (E-OUT), or accept it for reels only; flag it in QC |
| Accent inside an accent-filled element | Text ≥4.5:1 | `chat` reply bubble is accent-filled; `*accent*` inside it renders accent-on-accent (QA: 1:1) | No inline marks in `chat.reply`; `npm run qa` catches it |
| Status colours (✓ green / ✖ red) | Final-state colours + glyphs | Only `accent`, `accent2`, `mark` per theme; no error colour | Put ✓/✖ glyphs in the text; `list` `style: "checks"` / `"crosses"`; error colour needs the custom scene |
| Anchor cut (same window rect across shots) | Terminal ↔ editor swap in 1 f | Each scene lays out its own card; transitions are global | Custom `terminal` + `code` scenes sharing one rect; `transition: "cut"` |
| Cut-in on one line | 2-2.5x instant | None | `stat` for a value; custom scene for a code line |
| Request pulse, screen-to-world | §7.2, §8 | None | Custom scene or After Effects / `@remotion/three` |
| README loop | First frame = last frame, silent | No loop mode | Custom composition, or cut in post |
| Theme fit | Dev-dark #0B0E14, mono, one accent | `neon` (#07070A, acid lime #C6FF3D default accent, `grid` background, whip) is closest; `mono` for Swiss minimal | `neon` + `brand.accent` + `transition: "cut"` |

**Proposed custom scenes** (fields kept within the kit's zod style):

| Scene | Fields | Planner defaults (frames) |
|---|---|---|
| `terminal` | `shell` (header label), `steps: [{ cmd ≤48 chars, out: [≤8 lines], status?: "ok"|"err" }]`, `highlight?: step index` | caret 18 f period; type 18 cps (key words 8 cps via `*marks*`); 6 f pause; Enter; output 3 f/line; status swap 1 f; payoff hold ≥30 f; sfx typing / click / pop |
| `code` | `file`, `lang`, `lines: [≤6, ≤48 chars]`, `type?: line index`, `highlight?: line index` | cascade 2 f/line; typed line at 8 cps; band 4 f; hold ≥ max(30 f, 15 f per visible line) |
| `request` | `method`, `path`, `body ≤60 chars`, `status`, `json: [≤6 lines]`, `highlight?: line`, `tabs?: [≤4]` | body 18 cps; Send; pulse 12 f; chip 6 f; JSON 3 f/line; tab swap every 15 f |

### 14.3 What needs generative video (Flow / Veo / Sora / Runway / Kling / Higgsfield)

Rule (Part 11 AA-U1): **generate atmosphere, compose meaning.** In a developer launch almost everything is product truth, so generated footage is optional and ≤10% of runtime.

| Layer | Generate? | Notes |
|---|---|---|
| Defocused human context (a developer at a desk at night, a team at a standup, a server-room light field) for the pain or climax | Optional | Veo 3.1 / Flow 4-8 s clips at 24 fps; Runway, Kling, Sora, Higgsfield similar. Locked-off or one slow dolly; screens must be **unreadable** (blur 40-60 px in compositing); use as `clip` with `generated: true`, `scrim` 0.5-0.7 |
| Abstract data-flow atmosphere (light streaks, particles, aurora) | Prefer code | Deterministic, loopable, brand-exact in Remotion/three (G03 §orb); generate only organic textures |
| Code, terminal, dashboard, JSON, CLI output, logos, keyboards with legible keys, numbers | **Never** | Generated glyphs warp and code would not compile; it breaks the "it runs" promise (Part 11 AA-G9, AA-A1) |
| Real developers, maintainers, customers | **Never** generated | Real footage with releases, or a `quote` card with permission |
| Generated audio | **Discard** | Rebuild from the SFX map |

Plate prompt pattern: "Locked-off medium shot of a developer's desk at night, a single warm desk lamp from the left, a monitor glowing cool blue but completely out of focus, very shallow depth of field, a coffee mug in the foreground, no people in focus, large empty dark area in the upper two thirds for text. 6 seconds, subtle steam from the mug only." Negative: "text, letters, code, user interface, readable screen, logos, watermark, numbers, keyboard legends, faces in focus, hands typing". Generate 1.5-2 s longer than the edit, 2-4 takes, same model and seed per look; conform 24 → 30 fps with optical flow (never frame duplication); log model, prompt, seed and date.

### 14.4 What needs 3D

At most one hero beat, ≈10-15% of runtime (≤4.5 s of 45 s), only when it explains the product better than a flat window:

- **Screen-to-world (API / integration)**: the response card pulls back x0.57 in 10 f then x0.56 over 18-20 f, revealing "your app → Tern API → workers" as planes in a blue-grey studio (#C8D4DF → #F4F5F8 light, or #0B0E14 → #161C28 dark) [V:1CSXtQ t=17.80-19.03s].
- **Architecture by state colour (infra)**: 3-5 glass nodes on a 2.5D plane, a pulse on the links, nodes red/teal by state [V:19NRDv t=39.87-46.13s]; 2.5D (Part 10 HR-10) is the cheapest version.
- **Region globe or edge map** only if multi-region is the news: hop-and-hold between regions, peak ≤8% W/f [V:1ccYWJ].
- **Extruded code slab** for a version number reveal ("v2.0" as a 6-8% thick slab in the accent), flattened to 0° before reading.

Build with `@remotion/three` (code as vector textures at ≥ zoom × width), After Effects 3D layers, Blender, or a 3D scene builder. Roll 0°, one key light, no intersecting planes (HubSpot's flaw), DOF only on what is not read.

---

## 15. QC checklist (Developer Tool / API Launch)

Run per shot (frame by frame), then on the locked cut, then on every delivered file.

**Code and command truth**
- [ ] Every snippet pasted **from the storyboard** into a fresh project compiles and runs at the shown package version and runtime.
- [ ] Every command and flag exists; the install command is byte-identical to the docs quick-start and the README.
- [ ] The package name, import path and version are the published ones; the name is owned by the team on the registry.
- [ ] One package manager across the film.
- [ ] The example is one job end to end; ids and names carry through.
- [ ] No secrets: keys shown as env vars or `sk_test_••••`; no usernames, hostnames, home paths, internal URLs, branch names, emails.
- [ ] No third-party IDE, OS or cloud logos in window chrome without permission.
- [ ] Every on-screen duration plays in real time or is labelled as sped up.
- [ ] A failure is shown and handled if reliability is the promise.

**Numbers and claims**
- [ ] Every number carries metric, percentile, region/hardware, payload and date, on screen or in the description; the source is published.
- [ ] "Before" comparisons point to a real, publishable reference implementation; no competitor named without legal sign-off.
- [ ] Status wording matches reality: "Public beta" vs "GA" vs "v1.0".
- [ ] Free tier, licence and pricing chips approved by the team.
- [ ] No banned hype words; at most one hype phrase.

**Legibility**
- [ ] Code: mono 46 px at 16:9 (cap ≥3% H), ≥52 px font at 9:16 for must-read code (≥40 px only for non-must-read texture lines); key token ≥4% H after a cut-in.
- [ ] ≤6 code lines visible, ≤48 chars per line (16:9) / ≤25 (9:16); 9:16 code rewritten, not shrunk.
- [ ] Ligatures off; tabular figures on counters.
- [ ] Every syntax colour ≥4.5:1 on its surface; prompt glyph and dimmed context ≥3:1.
- [ ] ✓/✖ always paired with glyphs (colour-blind safe).
- [ ] No code is read while the camera moves (≤0.2% W/f drift); no scrolling files.
- [ ] Every must-read state held ≥ max(1.0 s, 0.33 s × words + 0.4 s); outputs and statuses ≥30 f.
- [ ] Install command, URL, licence and free-tier lines are must-read size, not micro-text.

**Motion and UI believability**
- [ ] Every state change has an actor (keystroke, Enter, save, click, Send, or an on-screen system source).
- [ ] Typing: 15-20 cps readable, 7-9 cps on the key token, 25-35 cps on filler; never 60 cps on a must-read string.
- [ ] Output appends 2-4 f per line; spinners ≤30 f; caret period 18 f.
- [ ] 0% overshoot on code, UI, data and type (check the kit's `pop()` if motion-kit is used).
- [ ] One primary motion per frame; anchor rect identical across window swaps (±0 px).
- [ ] No video-model-generated code, UI, logo or numbers; generated plates tagged `generated: true`.

**Rhythm and sound**
- [ ] Hook on f0 with first change by f3, ≤7 words; name + category by 6 s.
- [ ] Drop on the first terminal frame (0-8 f after its cut); music-led cuts 0-2 f before beats; typing and Enter timing never forced onto the grid.
- [ ] Keystrokes 20-25 dB under the full music level; Enter click on the press frame inside a ≥15 dB dip.
- [ ] Whooshes and booms at peak velocity; ≤2 whooshes.
- [ ] Lockup dead still ≥2.2 s; music to the last frame; −14 LUFS ±1, true peak ≤ −1 dBTP.

**Delivery**
- [ ] Exact size per format; constant 30 fps; no duplicated frames (scrolling code judders first).
- [ ] H.264 High, yuv420p, BT.709; **CRF 16-18, 12-20 Mb/s at 1080p** (thin mono strokes smear first); `+faststart`; 1-2% grain on dark gradients.
- [ ] Frame 0 works as a thumbnail (the red log + statement, or the command).
- [ ] 9:16 text inside x 120-840, y 270-1210; 16:9 command and URL above y 918.
- [ ] README loop: seamless, silent, ≤10 MB MP4/WebM (check the host's current limit), GIF fallback ≤256 colours.
- [ ] Captions or a sidecar file if there is VO; test the upload on a phone at 1:1 and on a 27-inch monitor (developers watch on desktops too).

---

## 16. Common mistakes

| Mistake | Seen in / source | Why it hurts | Fix |
|---|---|---|---|
| Code that does not compile, invented flags, a renamed package | Common in launch videos [inferred] | Developers paste it; the replies call it out; trust gone | QC by pasting from the storyboard; byte-identical to docs |
| Code too small (a 13-14 px IDE screen recording at 1080p) | 7/8 references put meaning in micro-text (Part 11 MK-01); kivi's code card text ≈3% H "mono-ish" [V:1-6l8S] | Unreadable on phones and in feeds | Vector rebuild, 46 px mono, ≤6 lines, cut-ins |
| Scrolling a long file to show "how much code" | Part 03: full-screen scrolls at reading-impossible speed read amateur | Nothing is readable; strobing | Show length as a counter or minimap; strike 212 → 6 |
| Typing the whole file, or typing at machine speed | Kit `prompt` ≈60 cps; generic templates | Either drags or cannot be read | Pre-write the file; type only the key line at 7-9 cps |
| Real API keys, emails, hostnames or home paths visible | [inferred] (screen recordings leak) | Security incident and embarrassment | Env vars, `sk_test_••••`, `❯` prompt, rebuilt windows |
| Benchmarks without conditions, or against a named competitor | Text sources; Part 01 claims rules | Disputed publicly within hours | Metric · percentile · region · payload · date; compare to "DIY" |
| Hype copy ("blazing fast", "revolutionary") | — | Developers discount everything after it | Nouns and numbers; ≤1 hype phrase |
| Matrix rain, glitch, scanlines, hooded-hacker stock | Part 05 TR-A1 (plug-in packs, 0/8 references) | Cliché; reads as security theatre | Real surfaces, one accent, clean cuts |
| Fake time ("deploys in 1 s" animated in 4 f; "retry in 2 s" drawn in 1 s) | — | Developers check; misrepresents the product | Real-time playback or "sped up" label |
| No failure shown for a reliability product | Bumper shows failure as the proof [V:19NRDv t=39.87-46.13s] | The promise stays abstract | DT-3 fail → recover |
| Install command only in micro-text under the logo | Lottieicon's "AEP + JSON" pill ≈1.5% H, URL ≈2% H [V:1ccYWJ] | The next step is unreadable | Command pill 52-58 px mono in the CTA and in Install |
| Red/green status without glyphs | [inferred] | ≈1 in 12 men cannot tell them apart | ✓ / ✖ / ⚠ glyphs always |
| Window chrome full of third-party branding (IDE logo, OS dock, cloud console) | — | Trademark risk; distracts | Frameless window, file name only |
| A different example in every shot | Part 01 TS3 | Viewer rebuilds context each cut | One job end to end; ids carry through |
| Weak ending: bare URL, no lockup, music ends early | Lottieicon: music gone 3.7 s early, no lockup [V:1ccYWJ]; kivi bare URL [V:1-6l8S] (MK-04, 4/8) | The ask is lost | Command CTA + 2.2 s still lockup + sting to the last frame |
| Overshoot on chips, counters and buttons | Remotion default spring 16.3%; kit `pop()` back-out ≈10% | Toy-like; undermines "precise software" | E-OUT / E-SNAP; patch `pop()` |
| Status held for 2 f | Chowdeck "Order delivered" 2 f [V:126cpH t=13.53s] | The payoff is subliminal | ≥30 f on every ✓ line |
| 9:16 made by cropping the 16:9 master | Part 02 CO-U18 | 608 px window ≈11 chars of code | Rewrite code to ≤25 chars; stack windows |
| Banding and blocking on dark gradients and thin mono | MK-02 8/8 sub-1080p or low bit rate; MK-03 banding 5/8; HubSpot ≈176 kb/s [V:1CSXtQ] | Code edges smear; gradients step | CRF 16-18, 12-20 Mb/s, 1-2% grain |
| Mixed package managers, inconsistent number formats | Lottieicon mixes "4,863+" and "50 + Categories" [V:1ccYWJ] | Looks careless to a detail-oriented audience | One manager, one number style, tabular figures |
