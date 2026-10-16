# Specialised Guideline 10: Minimal 2D Motion Graphics Video

A film made **only of flat shapes, line icons, simplified UI and type**, moved by a 2D virtual camera, that explains one idea or sells one product without footage, photoreal 3D or full product screen recordings. It is the format most SaaS, fintech, security, B2B and service brands reach for when the product is **invisible** (a protocol, a workflow, a data flow, a policy) or when there is **no polished UI to show yet**. It is not a UI product demo (Guideline 02), not a cinematic 3D film (Guideline 09) and not a kinetic-type-only reel (Guideline 07 uses type as the whole picture). Here the picture is a **small, strict kit of shapes** that carries continuity from cut to cut, and type is a partner to it, never the only thing on screen for long.

This guideline condenses the Master SaaS Motion Design System (Parts 01-11 in `research/master/`) and the eight frame-measured teardowns in `research/videos/` into one working spec for this format. Units: **f** = one frame at 30 fps (33.3 ms); **% W / % H** = percent of frame width / height; **% W/f** = speed in percent of frame width per frame. Pixel values are for 1920×1080 ("@1080") unless marked "@1920" (1080×1920 vertical). Numbers are measured in the references unless marked [inferred] (derived by the master or by this guideline from measured rules).

**Evidence base, read first.** All eight references are 2D-first (Part 10 §0.4), and two of them are pure flat 2D with no 3D at all (Solar, and kivi apart from a 1 s cursor). The two closest exemplars of this format are **Solar** (flat vector with 2.5D cues, 35.8 s) and **NOSTRA** (two-colour shapes and type, 35.1 s, with short 3D accents this guideline removes). kivi, HubSpot and Chowdeck supply the minimal type, simplified-UI and vertical rules. No reference is a 45-90 s 2D explainer with a narrator; long-form numbers are the master's extrapolations and are marked.

| Tag | Reference (file in `research/videos/`) | What it teaches this format |
|---|---|---|
| [V:1Hcg3X] | "How do solar panels work?", 16:9, 35.8 s (`1Hcg3X8G_q34iS-RqcAQ2pMHpGkIhxu3j.md`) | **The template for explaining a mechanism.** Five-colour flat palette, one hero per frame with flanking labels, the expo envelope on every shot (snap in, drift, whip out), cut on the empty plate, background colour change per cut, 2.5D instead of 3D, grain, bloom only on emitters, one flash at the transformation. Flaws: two light directions, a 0.4 s payoff, no logo or CTA, 24 → 30 pulldown judder |
| [V:1i2L14] | NOSTRA studio promo, 16:9 inset, 35.1 s (`1i2L14p-cvnLcIl6XY7mUQEiTYZy_OWUA.md`) | **The template for a minimal brand/service promo.** One hue + off-white + ink, polarity flips on 11 of 13 cuts, shape-match chains (dot → eye → circles → dot → typing dots over 5 setups in 4.1 s), oversize-and-settle pops, scatter → swap → converge type, a 4.7 s breather, a cursor-pressed BOOK NOW. Flaws: −7.9 LUFS with overs, pixel build of 23-26 f, unlabelled metaphors, 0.8 s end hold |
| [V:1-6l8S] | kivi voice AI, 16:9, 77.8 s (`1-6l8SV5NXZQotrYoV8KqKV7SJPvtssso.md`) | Calm minimal type: live-append lines, rise + blur entrances 9-12 f, breathing pushes 1.07-1.29× on every hold, zero overshoot, white blooms as transitions; the line → card unfold (pill → slabs → line → card in ≈13 f). Flaw: mixed illustration plate styles, 5 text-only cards in a row |
| [V:1CSXtQ] | OpenAI × HubSpot connector, 16:9, 30.0 s (`1CSXtQSs2jM0WBQP6LPDVpDgkt8JLdUkw.md`) | The 30 s minimal arc (drop at 43%), dot → caret concept match, simplified white UI with soft shadows, the 2.2 s dead-still reprised lockup with a sting |
| [V:126cpH] | Chowdeck delivery ad, 9:16, ≈18 s (`126cpH-FXL4FxTwRwoJvt9M4FNwBB7peq.md`) | The only vertical: setup:hero word ratio 1:2.5-3, leg-by-leg route draw, card → notification collapse in ≈7 f, chapter colours, illustration on twos with UI on ones |
| [V:19NRDv] | Bumper PRO payments, 16:9, 67.2 s (`19NRDvazRJFCFcAfehavceGsUMV64qBRv.md`) | Stroke → fill → sheen logo build (5 f / 8 f / 14 f), earned counter (84 → 100% in 31 f), the 100 BPM grid with cuts 0-2 f early |
| [V:1ccYWJ] | Lottieicon icon library, 16:9, 44.3 s (`1ccYWJ6nQXdqt1UQrpz2mE0ODScG_hU0K.md`) | Line icons with one stroke weight, linear tally counters, dim-to-texture (≈15% in 3 f); the flagged failure of unblurred 22-27% W/f pans and gradient banding |
| [V:15VhHR] | Wix AI builder, 16:9, 53.9 s (`15VhHRcisoHSPWY0VA06PzA3u_y-4qJY_.md`) | Icon → UI morph (sparkle stretches into a prompt pill in 6 f), the 1.0 s still brand sentence, anchored elements across fast cuts |

Master cross-references use Part and rule IDs: Part 10 §12 is the 2D motion chapter (rules 2D-U1 to 2D-U18, move recipes 2M-01 to 2M-24) in `master/10-2d-3d-and-style-categories.md`; Part 03 E-SNAP etc. are ease tokens in `master/03-motion-principles-ease-speed.md`; Part 09 F01-F18 are SFX families in `master/09-sound-design.md`; style cards ST-F1, ST-F2, ST-A1 and ST-J are in Part 10 Phase 11.

---

## 1. Purpose and audience

**Purpose.** A minimal 2D film turns one abstract idea into one remembered picture. It does three jobs well and one badly:

| Job | Why 2D does it well | Evidence |
|---|---|---|
| **Explain an invisible mechanism** (how sign-in works, where data goes, how money reconciles, how energy flows) | Every object can be reduced to the one property that matters (a token, a route, a state colour). Each scene hands the "energy" to the next carrier, so the explanation reads as one continuous thought | [V:1Hcg3X] "follow the energy": sun → lamp → wafer → electrons → bolt → phone → battery → grid → money |
| **Sell a service or brand promise** with no product UI to show | Shapes and three-word lines in one hue carry an argument; polarity flips carry rhythm | [V:1i2L14] dream → pain → benefit → features → reassurance → CTA |
| **Make a product launch readable on mute** | Every word is designed type, exact and legible; no generated glyph risk | Part 10 §12.0: 2D is the controllable option, exact type and exact timing |
| Show the real product's depth or speed (badly) | Abstract shapes cannot prove that a real UI is fast or polished | Use Guideline 02 (UI demo) for that, or add a single simplified UI beat (§10) |

**Audience and context.**
- **B2B buyers and technical evaluators on LinkedIn and YouTube** (sound often off, 4:5 or 1:1 in feed, 16:9 on YouTube and site heroes). They need the mechanism in under 30 s and the brand in the last 3 s.
- **Website visitors** (16:9 hero or explainer section, often autoplay muted, sometimes a 6-10 s silent loop).
- **Onboarding and help centres** (45-90 s explainers with a narrator, one concept per film; master ST-J and ST-C2 text evidence).
- **Paid social** (9:16 and 4:5 cut-downs of 15 s).

**What the viewer must leave with:** one sentence ("my team signs in with passkeys, so there is nothing to leak"), one picture (the key mark), one name, one action. If a draft needs two sentences to summarise, it is two films.

---

## 2. When to choose this format

Choose with the product's promise first, then check assets and runtime (Part 10 ST-U1).

| Choose minimal 2D when… | Prefer another format when… |
|---|---|
| The product is a mechanism, protocol, policy or flow (security, payments, data, compliance, infrastructure, AI pipelines, energy, health processes) | The selling point is the polish or speed of a real UI → Guideline 02 UI Product Demo |
| There is **no real UI yet**, or the UI is dense and unreadable on a phone (Part 10 hard constraint: "no real UI available → ST-F1, ST-F2") | The product is physical hardware or needs volume and material → Guideline 09 Cinematic 3D |
| The brand needs a reusable system (series of 4-6 explainers, a feature-per-film series) | The film is a single big reveal of a flagship → Guideline 04 Premium Brand Film |
| Sound-off feed placement (the story is in on-screen type and shapes) | The proof is a real customer → testimonial / live-action (ST-H) |
| Budget and turnaround are tight: a template engine or one motion designer can build it in days with 0 generative risk | The audience needs to see people (warm consumer apps often need faces or photo cut-outs → ST-G collage) |
| The message must be translated into many languages (type is live text, not baked into footage) | |

**Style variants inside this format** (pick one; do not mix their parameters, Part 10 ST-U4):

| Variant | Master style | Look | Best for | Measured exemplar |
|---|---|---|---|---|
| **V1 Monochrome brand system** | ST-F2 | One saturated hue + off-white + ink; polarity flips; shape chains; ≤3-word caps lines | Service promos, brand-system films, LinkedIn ads | NOSTRA [V:1i2L14] |
| **V2 Editorial 2.5D explainer** | ST-F1 | 4-6 flat colours, one background per scene, long hard shadows, parallax, grain, bloom on emitters | Explaining a mechanism with a narrator | Solar [V:1Hcg3X] |
| **V3 Calm minimal (light)** | ST-A1 / ST-A3 type rules | Off-white, ink, one accent; sentence-case regular-weight type; simplified UI cards with soft shadow; breathing pushes | AI, productivity, B2B launches that want a premium-quiet read | kivi [V:1-6l8S], HubSpot [V:1CSXtQ] (2D parts) |
| **V4 Isometric series** | ST-J | Clean isometric 2D on neutral ground, one alert accent, wide → one tile | Feature-per-film series for logistics, data, infra | Text only [S:TradeLens]; all motion numbers [inferred] |

---

## 3. Platforms, aspect ratios and length

### 3.1 Formats

| Placement | Ratio | Canvas | Text-safe (strict) | Notes |
|---|---|---|---|---|
| YouTube, website hero, sales deck, LinkedIn video ad (landscape) | **16:9 master** | 1920×1080 | x 96-1824, y 54-1026; keep CTA and URL above y ≈918 (player controls) | Most measured references are 16:9. Sentences ≥84 px font for phone-inline play (Part 07 floors) |
| LinkedIn / Instagram feed | 4:5 | 1080×1350 | x 88-992 | Best feed real estate for B2B; re-layout, do not crop |
| Feed square, X | 1:1 | 1080×1080 | x 135-945 | Survives the 3:4 grid crop |
| Reels, Shorts, TikTok, Stories | 9:16 | 1080×1920 | **x 120-840, y 270-1210** (union of Reels ads, TikTok, Shorts) | Lower band y 1210-1640 is for non-text graphics only (Part 02 CO-U17) |

**Re-layout rules for 9:16 (Part 02 CO-U18, Part 10 §12.6):** horizontal pairs become vertical stacks; flank labels move above and below the hero; routes and timelines run top → bottom; statement type grows to 96-160 px @1920 (default 128 px); hero words 240 px @1920 with a setup word at ⅓-0.4 of its size. The vertical axis carries story direction (a vertical push of one frame height in ≈11 f reads as "forward") [V:126cpH t=2.53-2.90s].

**Frame rate.** Animate and render natively at the delivery rate (30 fps here; 25 for broadcast PAL). Three references show judder from 24/25 → 30 duplication (Part 10 2D-A13). Shapes, type, UI and camera run on ones; only an illustrated character or collage layer may run on twos, as a declared style (2D-U18).

### 3.2 Length rules

| Runtime | Use | Shots (= runtime ÷ ASL, ASL 1.85-2.2 s) | Structure |
|---|---|---|---|
| 6 s | Bumper, site loop, pre-roll | 2-3 | One shape chain → logo; logo still ≥1.5 s (Part 10 §11.6) |
| 15 s | Paid social cut-down | 7-8 | Hook, promise, one mechanism beat, payoff, CTA + lockup |
| **30 s (default)** | Feed ad, launch, site explainer | **14-16** | Full arc of §4.2 |
| 45 s | Explainer with 3 mechanism steps or 3 features | 21-24 | §4.3 |
| 60-90 s | Narrated explainer, help centre, onboarding | 28-40 (VO-led: cut on sentences) | §4.4; ST-J feature films run 78-87 s [S:TradeLens] |

Rules:
- **Pick the ASL from the style, then derive the shot count** (Part 08 ER-04). Minimal 2D: ASL **1.85 s** (V1, NOSTRA), **2.1 s** (V2, Solar), **2.4 s** (V3, kivi 2.36). Do not cut faster because the film is shorter.
- **Over 60 s, add a narrator or chapter titles.** No measured 2D reference exceeds 36 s without speech or UI demos; kivi's 78 s is held together by in-world voice.
- **Never make a 15 s by trimming the 30 s.** Rebuild it from the plan in §4.1 (Part 08 §17.5).

---

## 4. Story structure with exact beat timings

### 4.1 Stage maps (seconds · frames @30 · % of runtime)

Built from Part 01 §2.3 and Part 08 PL-15/PL-30, then adjusted to the measured 2D exemplars: Solar's hero hold of 4.7 s (13%) and NOSTRA's breather of 4.7 s (13%) and its copy framework (hook 4% / dream 14% / pain 23% / benefits 16% / features 30% / reassurance 4% / brand + CTA 8%) [V:1i2L14 §3].

| Stage | 15 s (450 f) | **30 s (900 f)** | 45 s (1350 f) | 60 s (1800 f) [inferred] |
|---|---|---|---|---|
| 1 Hook (question or tension, picture on f0) | 0.0-1.8 · 0-54 · 12% | **0.0-1.8 · 0-54 · 6%** | 0.0-2.4 · 0-72 · 5% | 0.0-2.4 · 0-72 · 4% |
| 2 Setup / problem (the world before, shown in shapes) | 1.8-3.6 · 54-108 · 12% | **1.8-5.4 · 54-162 · 12%** | 2.4-7.2 · 72-216 · 11% | 2.4-9.6 · 72-288 · 12% |
| 3 Turn (shape-match bridge into the reveal) | merged into 2 | **5.4-6.0 · 162-180 · 2%** | 7.2-7.8 · 216-234 · 1% | 9.6-10.2 · 288-306 · 1% |
| 4 Reveal (name + promise, colour flip, music drop) | 3.6-6.0 · 108-180 · 16% | **6.0-8.4 · 180-252 · 8%** | 7.8-10.8 · 234-324 · 7% | 10.2-13.2 · 306-396 · 5% |
| 5 Mechanism / proof (incl. one hero hold of 13-14%) | 6.0-10.2 · 180-306 · 28% | **8.4-19.8 · 252-594 · 38%** (hero hold 4.2 s) | 10.8-31.2 · 324-936 · 45% (3 steps of 6.8 s) | 13.2-43.2 · 396-1296 · 50% (4 steps 8.4 / 7.8 / 7.2 / 6.6 s) |
| 6 Breather / benefit line | none | **19.8-22.8 · 594-684 · 10%** | 31.2-35.4 · 936-1062 · 9% | 43.2-48.6 · 1296-1458 · 9% |
| 7 Climax (thesis line, kinetic swap, one hit) | 10.2-11.4 · 306-342 · 8% | **22.8-24.6 · 684-738 · 6%** | 35.4-37.8 · 1062-1134 · 5% | 48.6-51.6 · 1458-1548 · 5% |
| 8 Resolution: CTA + lockup | 11.4-15.0 · 342-450 · 24% (CTA 1.2 + lockup 2.4) | **24.6-30.0 · 738-900 · 18% (CTA 2.4 + lockup 3.0)** | 37.8-45.0 · 1134-1350 · 16% (CTA 3.0 + lockup 4.2) | 51.6-60.0 · 1548-1800 · 14% (tagline 1.8 + CTA 3.0 + lockup 3.6) |

Every boundary in the 30 s column is a multiple of **0.6 s = one beat at 100 BPM (18 f)**, so the edit can sit on the grid (§11). Hero moments in the 30 s plan: **6.0 s (20%)**, **≈11.9 s (40%)**, **24.0 s (80%)**.

### 4.2 The 30 s beat sheet (default)

| Beat | Window | What happens | Rule it follows |
|---|---|---|---|
| Hook | 0.0-1.8 s | A question or a tension in ≤5 words over one object; text on f0, first change by f3 | P01 H2 hook budget: ≤7 words, ≤5 in 9:16 and spots ≤15 s; this format keeps to ≤5 by choice; 2D-U4 no dead frames |
| Setup | 1.8-5.4 s | The problem as 2 shots of shapes: where things live today, what goes wrong. One polarity flip at the low point | NOSTRA pain section; 2D-U11 colour fields as transition material |
| Turn | 5.4-6.0 s | Everything collapses to one primitive (a dot) on an empty field; riser crest; 167 ms gap | 2D-U10 shape continuity; Part 09 gap 70-350 ms |
| Reveal | 6.0-8.4 s | The dot becomes the brand mark; name + 4-6-word promise on the brand field; **music drop on the cut** | Part 09: drop on the first product moment, 0-8 f after its cut |
| Mechanism | 8.4-19.8 s | 5 shots: set-up → **hero hold 4.2 s** (the one diagram the film is for) → 2-3 shorter proof beats (1.8 s each) → a number | Solar's hero hold 4.7 s (13%); proof blocks shrink (Part 08) |
| Breather | 19.8-22.8 s | One benefit line, motion ≤1/10 of the peaks, music breakdown −6 to −8 dB | NOSTRA breather 4.7 s, energy <10% of peaks |
| Climax | 22.8-24.6 s | Kinetic thesis line, the last word lands on the beat at 24.0 s and holds 15-18 f | Part 08 PL-30 shot 10 (swaps at 16, 13, 11 f) |
| CTA | 24.6-27.0 s | Verb + product, ≤16 characters, URL; music still playing | Part 09 ending rule; Part 07 CTA budget |
| Lockup | 27.0-30.0 s | Brand mark + wordmark in the reveal's colour (bookend); dead still from 27.6 s (2.4 s); sting on 27.0 s ±2 f | Part 04 #21 final lockup 1.5-2.2 s still; HubSpot 2.2 s |

### 4.3 45 s variant (three-step mechanism)

Hook 2.4 → setup 4.8 → turn 0.6 → reveal 3.0 → step 1 (6.8 s, contains the 4.5-6 s hero hold) → step 2 (6.8 s) → step 3 (6.8 s) → breather 4.2 → climax 2.4 → CTA 3.0 → lockup 4.2 s. Number each step on screen ("1 · 2 · 3", T-LABEL) so the viewer can count; NOSTRA's unlabelled feature parade (19.95-30.63 s) is a flagged failure [V:1i2L14 §16].

### 4.4 60-90 s narrated explainer [inferred from Part 08 VO-led variant and ST-J]

- Narration 150-160 wpm; budget 65-75 words per 30 s. Cut on sentence ends; scene changes on downbeats when the VO allows (Solar: 4 of 5 mid-act cuts within ≈1 f of an onset) [V:1Hcg3X §11].
- Hook + pain may stretch to 9-10 s; name the product by ≈10 s.
- One concept per scene; one hero hold of 4-6 s per act; a recap end-card (strips sliding into exact thirds, 2nd strip ≈0.33 s after the 1st) before the lockup [V:1Hcg3X rule 16] — and **add the logo and CTA Solar left out**.
- Captions always (T-CAPTION, 2 lines × ≤42 characters, 60-75 px @1920).

### 4.5 Story templates that suit flat 2D

| Template | Spine | Exemplar |
|---|---|---|
| **T-A Follow the energy** | One carrier hands its energy to the next on every cut (shape or light match) | Solar [V:1Hcg3X] |
| **T-B Copy framework** | Dream → pain → benefit → features → reassurance → CTA | NOSTRA [V:1i2L14] |
| **T-C One transaction** | The life of a single token, order or request, start to finish | Chowdeck [V:126cpH] |
| **T-D Noise → signal** | A wide field of many items, push to the one that matters, everything else dims to 20% | TradeLens [S], [inferred motion] |
| **T-E Question → answer** | Hook asks it, climax answers it in the same words (loop) | Solar title question; kivi "Still typing?" |

---

## 5. Shot list template

Fill one row per shot before animating. The columns are the storyboard columns of §13 plus the build owner.

| # | In-out (s · f) | Dur (f) | Stage | Hero object (one) | Shape carried from previous shot (±5% W) | Text (≤6 words, tier) | Motion recipe (2M-xx) + ease | Camera (CM-xx, speed) | Out (TR-xx, cut frame) | Background colour | Sound (F-xx on frame) | Music state | Build (kit scene / custom / plate) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0.00-1.80 · 0-54 | 54 | Hook | | — | | | | | | | | |
| 2 | 1.80-3.60 · 54-108 | 54 | Setup | | | | | | | | | | |
| … | | | | | | | | | | | | | |

Row-level checks before the row is "ready":
1. Exactly **one hero object** (Solar rule 4). Labels sit in negative space at x ≈15-20% / 80-85% W on the hero's mid-line.
2. A named **carried shape** or a declared polarity flip (2D-U10, 2D-U11). Never two consecutive shots on the same flat background unless they are one set-up with a state change.
3. Text has a **reading tier** and a landed hold that meets it (§12.1).
4. Every moving element has a **cause** (QC-1.13) and the frame has **1 primary + ≤2 secondary motions** (QC-1.14).
5. The out-point names its **cut frame type**: empty plate, peak velocity, full cover, behind an exiting element, 1-8 f after a state change, or 0-2 f before a beat (Part 05 §7.3.1).

---

## 6. Style direction

### 6.1 Visual

**Dimensional level.** Base **D0** (flat). One level up to **D1** (2.5D: offset backing cards, long hard shadows, rim thickness, isometric drawing, parallax 1.3-2×, emitter glow) is allowed as a style choice. **D2-D4 are out of scope**: if the film needs a tilted plane or a modelled object, it is no longer this format (Part 10 §0.6; HR-10 "2.5D instead of 3D, the cheapest dimensional look").

**Shape kit (decide before storyboarding; reuse for the whole film or series).**

| Element | Spec | Evidence |
|---|---|---|
| Primitives | 4-6 named primitives (dot, pill, card, line, square, the brand mark). The dot is the default continuity carrier | NOSTRA dot chain [V:1i2L14 t=1.07-3.83s]; kivi pill → card [V:1-6l8S t=9.50-9.93s] |
| Icons | One line-icon family, **one stroke weight** per film (2 px-style at 1080, i.e. ≈0.1% W; 3-4 px when icons are ≥12% W) [inferred px] | Part 10 §12.4; [V:1ccYWJ] [V:1Hcg3X] |
| Corner radius | One family from the brand UI: cards 24-32 px, pills fully round, chips 12-16 px @1080 | Part 10 §12.4 ([E] 32 px in video) |
| Fills | Flat. Gradients only as atmosphere (soft radial blobs ≈13% W blur) or as a declared material | §12.4 |
| Shadow model | **One per film**: none (V1), hard long cast from one key direction (V2), soft drop y 12 / blur 32 / 6-8% on cards only (V3), or offset solid backing card 6% → 3% (playful). One light direction for all of it | 2D-U14; Solar's two-direction flaw [V:1Hcg3X] |
| Glow | Emitters only (screen, light, active state); radius ≈1-2% of frame; on type ≤2-3% of cap height | §12.4 |
| Texture | V1/V3: none, but **1-2% dither on every gradient and every dark field**. V2: visible mono grain ≈3-5% [inferred %] | 2D-U17; banding in 4 of 8 references (MK-03) |
| Composition | One hero per frame, 30-45% W for objects, 55-85% W for a UI card; statement frames ≥85% empty | Part 02 defaults |
| Avoid | 45° long shadows (read dated) [V:126cpH flaw 5]; mixing illustration styles [V:1-6l8S]; more than 3 rendering idioms per frame; decorative rays across the claim word [V:126cpH t=3.90s] | 2D-A7, 2D-A9 |

### 6.2 Color

| Rule | Value | Evidence |
|---|---|---|
| Named colours per film | **≤5, ≤4 per frame** (excluding UI screenshots and photos) | Part 02 defaults |
| Brand accent | **1 hue**, split into a **field tone** (backgrounds, buttons, shapes) and a **text tone** (≥4.5:1 on the canvas) | Part 02 CL-U3 |
| Light canvas | Off-white #F4F3EF-#F9FAFC, never pure #FFFFFF for a whole film (NOSTRA uses #F4F5F4) | [V:1i2L14] [V:1-6l8S] |
| Dark canvas | Hue-tinted near-black #0C0A09 / #15171C / #161616, dithered | Part 02 |
| Ink | #0B0B0B-#1A1A1A on light; #F5F7F5-#FCFCFC on dark | Part 02 |
| Accent area as highlight | ≤5% of frame (V3); a full field is allowed in V1 on reveal, climax and lockup only | [V:1CSXtQ] 92-95% white; [V:1i2L14] |
| Colour = meaning | Fix the semantics in the bible and never break them: e.g. accent = "your data is safe / the product acting", ink field = "the problem", grey = "inactive / revoked" | kivi light = solution [V:1-6l8S]; Lottieicon green = "alive" [V:1ccYWJ] |
| Polarity flips | V1: on ≥75% of cuts (NOSTRA 11 of 13). V2: background colour changes on almost every cut. V3: ≤2 flips (hook → problem, reveal), white as the neutral room | 2D-U11 |
| Contrast | Text ≥4.5:1; large text (≥66 px @1920 9:16, ≈117 px inline 16:9) ≥3:1; data marks ≥3:1 | Part 02 defaults |
| Dimmed context | 50% (still readable) or 15-20% (texture) | Part 02 |

**Palette recipes (contrast computed with WCAG formulas):**

| Variant | Canvas | Ink | Accent field / text tone | Support | Checks |
|---|---|---|---|---|---|
| V1 emerald (NOSTRA-measured) | #F4F5F4 | #161616 | #2FC06C field; ink on it | mint #A4DEBC gradients only | Measured [V:1i2L14] |
| V2 editorial (Solar-measured) | cream #F6F1ED, one flat colour per scene | oxblood #1D0B0A | vermilion #E12E16 | cyan #4DD9E5, mustard #F3C64E | Measured [V:1Hcg3X] |
| V3 tangerine (worked example) | #F4F3EF | #15171C (16.15:1) | #FF6A2B field, **ink text on it (6.27:1)**; text tone #B83A0A on canvas (5.19:1) | grey #C9C7C0 for inactive shapes only (1.52:1, never text); label grey #5E626B (5.51:1) | Off-white on #FF6A2B is 2.57:1: **fails**, never set type that way |

### 6.3 Typography

| Rule | Value | Evidence |
|---|---|---|
| Families | **1 sans** for everything; optional **1 accent face with exactly one role** (Solar: serif = concept words only) | Part 07 #1; [V:1Hcg3X §8] |
| Weight | V3 calm: 400-500. V1 brand system: SemiBold 600 caps, tracking 0 to +3%. V2: bold grotesk labels + serif concept words | Part 07 #7; [V:1i2L14 §8] |
| Case | Sentence case (V3, V2); caps allowed in V1 for ≤3-word lines | — |
| Hero word (T-HERO) | 185 px font @1080 (cap 12% H); 240 px @1920 | Part 07 #3 |
| Statement (T-STATEMENT) | **90 px font @1080** (cap 5.8% H); 128 px @1920 | Part 07 #2 |
| Super / setup word (T-SUPER) | 70 px @1080; 72-106 px @1920; setup : hero = **1 : 2.5-3** | Part 07 #5 |
| Labels on a diagram (T-LABEL) | 56-62 px @1080 (cap 3.6-4% H); 60-72 px @1920; ≤3 words | Solar labels 3.6-4% H [V:1Hcg3X §8] |
| UI text that must be read | ≥43-64 px @1080; ≥52 px @1920 | Part 07 T-UI-READ |
| URL | ≥54 px @1080, ≥52 px @1920 | kivi 54 px works [V:1-6l8S t=75.53s] |
| Read floor | Nothing that carries meaning under cap 2.5% H (27 px cap @1080) or 36 px @1920 | MK-01 (7 of 8 references fail somewhere) |
| Leading | 0.95-1.1 on display; 1.4-1.6 in UI body | Part 07 #9 |
| Placement | Statements centred, centre-line y 47-52% H, 35-70% W; labels world-space, riding the scene drift | 2D-U1 |
| Overshoot, rotation, per-letter scale | **0% / 0° / none** on type (semantic letter tricks ≤1 per film in calm variants) | 2D-U6, 2D-U7, 2D-X2 |

---

## 6b. Technique classes for this format

Each row cites master IDs; the class of an ID is the master's (U universal, S style-specific, X experimental, A avoid, SaaS). The format column says how this format uses it. Assignments to this format are [inferred] from the guideline's own sections unless an evidence tag is given.

| Class | Techniques for this format (master IDs) |
|---|---|
| Universal | Flat, orthographic frames with breathing holds CM-02 (calm/minimal +3-8 %); shape match and morph TR-05, TR-06; object wipes TR-09; polarity flips TR-18; perpetual ambient motion ML-29 |
| Format-specific | Monochrome brand system (ST-F2), retro-editorial 2.5D (ST-F1) and isometric series (ST-J) looks; one line-icon family, one stroke weight; mask wipes TR-10 (≤2 per film); elastic props ML-04 [S] only on editorial props |
| Experimental | Scatter → swap → converge sentences K8 [X]; mask wipe-off and re-type K12 [X]; shape chains across dimensions HR-09 [X] |
| Avoid | Dead frames over ≈1 s mid-film (2D-U4); more than 3 same-treatment cards in a row (ER-07); depth effects that break the flat world; a lockup under 1.5 s |
| Especially good for SaaS | Cards and panels UI-E02 as the product proxy; a cursor click that turns a word into the logo TP-11; one verified number (RV-25) |

## 7. Motion language with numbers

### 7.1 Ease tokens by role (Part 03 §19.3, Part 10 2D-U5)

Use **four to six curves** for the whole film. Mixed curves read as a template collage.

| Role | Token | Curve | Behaviour |
|---|---|---|---|
| Arrival of shapes, words, labels | **E-OUT** (default) / **E-SNAP** (hero words, pops) | (0.33, 1, 0.68, 1) / (0.05, 0.7, 0.1, 1) | E-OUT 90% by f7; E-SNAP 58% on f1, 90% by f5 |
| Travel on screen (token along a route, cursor, re-centre) | **E-GLIDE** | (0.25, 0.1, 0.25, 1) | Peak at f3, 90% by f8 |
| Unfold, morph, push/pull that start and end on screen | **E-INOUT** | (0.65, 0, 0.35, 1) | Peak at f6-7 of 12 |
| Wipes or panels that carry new text | **E-SETTLE**, 45-72 f only | (0.45, 0, 0, 1) | Long tail = reading time |
| Exit into a cut / leaving frame | **E-EXIT** / **E-WHIP** | (0.3, 0, 0.8, 0.15) / (0.64, 0, 0.78, 0) | Last frame carries 37% / 48% of travel |
| Falls, discards, revoked items | **E-GRAVITY** | velocity ×1.2 per frame + 10-20° rotation | — |
| Drifts, draws, counters (tally), colour ramps | **E-LINEAR** | (0, 0, 1, 1) | Only for moves that do not visibly start/stop on screen |
| Spring API needed, no bounce | **E-CRIT** | mass 1, stiffness 179, damping 26.8 | 0% overshoot, settled ≈13 f. Never Remotion's default spring (16.3% overshoot) |

### 7.2 The shot envelope (apply to almost every shot)

Measured on Solar, and the same shape in kivi, Bumper and NOSTRA (2D-U3):

| Phase | Numbers | Ease |
|---|---|---|
| **Arrive** | 40-64% of travel on the first moving frame; 50% in 3-5 f; 86-95% by f3-f6; settled by f10-f14 (fully by f25 on large objects) | E-SNAP / E-OUT |
| **Live** | Drift **0.1-0.2% W/f** (V3 calm, ≈2-4 px/f @1080) or **0.3-0.5% of frame per frame** (V2 editorial chain); or push 1.05-1.15× over the hold. True still frames ≤5 f, except a reading hold ≤1.0 s on a ≥85% empty frame and the final lockup | E-LINEAR |
| **Leave** | 6-11 f, speed ×1.3-1.9 per frame to a peak of 13-20% W/f; the cut lands on the first clean frame after the subject leaves (0-1 empty frame) | E-EXIT / E-WHIP |

Exits are about **half** the entrance length (token P03 SP-T0; kivi entrances 8-14 f, exits 4-6 f) [V:1-6l8S rule 4].

### 7.3 Move recipes that suit minimal 2D (Part 10 §12.3)

| Need | Recipe | Numbers @30 fps |
|---|---|---|
| Hero word in a hook | 2M-02 oversize slam | 3-4× → 1× in 8-13 f; 64% of the change on f1; 86% by f3 |
| Calm line entrance | 2M-04 rise + blur | 9-12 f; rise 2-10% H; blur ≈8 px → 0 |
| Live statement (dictation, chat) | 2M-01 live-append + recentre | Words 3-8 f apart; recentre E-LERP k = 0.2-0.25, settles 13-14 f |
| Dots, chips, icons, labels | 2M-18 oversize-and-settle pop | 2× → 1 in 3-4 f, stagger 2 f; labels 1.25× → 1 in 4 f; no undershoot |
| Input becomes output | 2M-05 unfold (line → card) | Bar 3 → 40 px height, S-curve 8 f; width +7%; content fades in 2 f after landing |
| Action → status | 2M-07 shared-element collapse | Card collapses bottom-anchored 100% → 37% height in ≈7 f; background re-focus 11-12 f |
| Hero object with weight | 2M-12 gravity bounce + contact rings | Landing intervals 0.47, 0.47, 0.37, 0.37 s, then rest |
| Any hero object | 2M-10 expo envelope | In at 4% W/f decaying ×0.85/f; 90% by f12; hold; out 11 f at ×1.6/f to 19% W/f |
| Life on a held object | 2M-11 snap-tilt settle | 1 f snap to 10-14°, E-OUT return over 12-15 f; ≤ +5° overshoot on objects, none on words |
| Introducing a term / comparison | 2M-13 long-settle split wipe | 49% W in ≈2.4 s, peak 3.5-4% W/f, ≈50 f tail |
| Chapter change | 2M-14 band push | New colour band rises 97% → 6% H in 20-32 f; full colour 1 f; cut |
| The one transformation | 2M-15 particle coalescence + flash | ≈60 particles converge in 4 f, fuse in 2 f; flash 3 f + 2 f — **once per film** |
| Journey, request, data flow | 2M-16 leg-by-leg route draw | Pre-drawn grey path; legs of ≈28 f and ≈16 f, E-OUT per leg, ≈5 f pause at corners; arrive ≈0.35 s before the cut |
| Logo and hero icons | 2M-17 stroke → fill → sheen | 5 f / 8 f / 14 f |
| A number | 2M-22 count-up | Earned: E-SNAP-L ≈31 f, park ≥1.0 s. Tally: E-LINEAR with a hard stop |
| Number in front of its proof | 2M-24 dim-to-texture | Previous shot to ≈15% in 3 f, kept behind |
| Three short sentences in one shot | 2M-19 scatter → swap → converge | ≈1 s per sentence: settle 7-14 f, hold 10-14 f, scatter 6-7 f, swap in 1 f, converge ≈7 f |

### 7.4 Stagger, holds and density

| Item | Value | Evidence |
|---|---|---|
| Panels, blinds, strips | 1 f | 2D-U8 |
| Dots, chips, letters, list rows | 2 f | 2D-U8 |
| Words in a line | 2-3 f (fast) to 7-10 f (paced to music); **8 f ≈ an eighth note at ≈110 BPM**; at 100 BPM use 9 f | Part 07 #12; Part 09 SD-T2 |
| Cards, cascade rows | 3-4 f, after an 8-9 f empty hold | 2D-SaaS 4 |
| Group total | ≤18-20 f and ≤8 items; never zero stagger on like items | 2D-U8; kivi's simultaneous icons flagged [V:1-6l8S t=34.50s] |
| Motion budget | 1 primary + ≤2 secondary motions per 0.5 s window | QC-1.14 |
| Event density | One significant motion event per ≈0.85 s in V1 (NOSTRA ≈41 events / 35 s) | [V:1i2L14 §1] |

### 7.5 Physics, overshoot, rotation and blur

- **Overshoot 0%** on type, UI chrome, logos and camera (7 of 8 references). Physical props in V2 may take one cycle of ≤25% of the swing (Solar's phone −12° → +5°, settled ≈15 f) [V:1Hcg3X t=14.50-15.17s].
- **Rotation** belongs to objects only: 6-15° tilts settling in 3-15 f; discards 10-20°; falling props up to 70-90° (2D-U7).
- **Weight** comes from acceleration, not bounce: falls at ×1.2 velocity per frame (2D-U13).
- **Discrete states snap (0-3 f) on a beat or VO word; continuous values ease** (2D-U16). Solar's off-beat state snaps "feel arbitrary" [V:1Hcg3X Study H].
- **Motion blur:** off at ≤5% W/f (crisp vector edges are the look); 180° shutter at 5-10% W/f; above 10% W/f only as a whip into a cut with blur on the last 2 f. Never sustained unblurred moves at 22-27% W/f (Lottieicon's flagged strobing) (2D-U12).
- **Scale** above ≈1.5× is interpolated in log space (E-ZOOM), so zooms do not appear to slow down (2D-U2).

### 7.6 Motion while text is read

Translation ≤0.2% W/f; scale drift about the text's own centre ≤0.6%/f (calm) or ≤1.5%/f (kinetic). Text never blurs while it must be read; entry blur 3-5 f and exit defocus 1-2 f only (Part 07 #16; DP-04).

---

## 8. Camera language

The camera in this format is a **2D comp camera**: scale and position on flat layers, roll 0°, overshoot 0%.

| Move | Use | Numbers | Evidence |
|---|---|---|---|
| **Breathing push (default on every hold)** | Keeps flat frames alive | +5-10% scale across a 1.5-2.5 s hold, linear (≈0.16-0.21%/f) | Part 04 #1; kivi 1.07-1.29× |
| Drift | Same job, for diagrams with labels | 0.1-0.2% W/f (calm) / 0.3-0.5% (editorial crane-scroll) | Part 04 #2; [V:1Hcg3X] |
| Pull-back reveal | "One item, then everything" | ×0.75-0.80 over 6-31 f (E-INOUT); or 2M-08 two-stage ×4.1 in 1.0 s | Part 04 #4; [V:126cpH t=5.20-6.20s] |
| Device / icon pull-out | From the meaningful icon to the whole object | 3× → 1× in ≈24 f, E-OUT (first frame removes ≈22% of the size) | [V:1Hcg3X rule 14] |
| Cut-in | Point at a detail | 2-3.5×, instant (a cut, not a zoom) | Part 04 #5 |
| Punch into a cut | Emphasis at a section turn | +18-33% over 3-8 f (E-PUNCH); ≤1 per 15-20 s | Part 04 #9 |
| Whip into a cut | Energy carrier between scenes | 6-9 f expo-in, peak 13-20% W/f, blur on the last 2 f | Part 04 #8 |
| Vertical crane / whip tilt | V2 progression axis; 9:16 story axis | Drift 0.3-0.5% H/f; whip tilts 6-8 f up to 20% H/f | [V:1Hcg3X §7] |
| Parallax | V2 depth without 3D | Foreground 1.3-2× the background | Part 04 #17 |
| Seamless tilt or pan into the lockup | The film's signature move (one per film) | 30 f S-curve + ≈10 f settle | [V:126cpH t=15.20-16.53s] |

**Camera rules.**
- **One signature move per film** (CM-U10). Do not repeat it.
- **Budget (Part 04 §6.4):** 15 s: 2-4 motivated moves, 1 signature, 2 punches/whips. 30 s: 4-8 motivated moves (one per 3.5-8 s), 1 signature, 2-3 punches/whips. Minimal V3: one motivated move per 8-13 s.
- **Screen direction is a rule:** pick one (e.g. vertical = progression, horizontal = context, Solar) and write it in the bible. Mixed whip directions without a rule are a Solar flaw [V:1Hcg3X §16].
- **Never** roll, orbit, rack focus on flat art (there is no depth to rack), or move the camera faster than 0.2% W/f while a line is being read.
- **9:16:** prefer vertical and scale moves; any lateral move ≤50% W; end every move inside x 120-840, y 270-1210 (Part 04 §6.5).

---

## 9. Transitions

**Defaults (Part 05 §0.3):** one scene change every ≈2 s; **≥70% hard cuts** (plain or with a designed hand-off); one signature device used 3-12 times; 2-4 hero one-off transitions per film (1 per 15-20 s); overshoot 0%.

**The minimal-2D transition set, ranked by how often to use it:**

| Rank | Transition | Band | Numbers | Use | Evidence |
|---|---|---|---|---|---|
| 1 | **Hard cut on the empty plate** after an E-WHIP exit | CUT | Subject fully leaves; 0-1 clean frame; next shot's first motion continues the screen direction | Default between scenes | [V:1Hcg3X rule 2] |
| 2 | **Polarity / colour-field flip cut** (TR-18) | CUT | Full-frame colour change on the cut, nothing else | Every new beat in V1; chapter turns in V3 | 11 of 13 cuts [V:1i2L14] |
| 3 | **Shape-match cut / shape chain** (TR-05) | CUT | The carried primitive within ±5% W of its position; scale or polarity changes at the cut | Hook → setup → turn → reveal | [V:1i2L14 t=1.07-3.83s] |
| 4 | **Object morph** (TR-06): dot → mark, pill → card, card → notification | SHORT-MEDIUM | 7-13 f, E-INOUT / E-OUT | The turn into the reveal; action → status | [V:1-6l8S t=9.50s] [V:126cpH t=11.03s] |
| 5 | **Whip / object wipe** (TR-08, TR-09) | SHORT | 6-9 f, blur on the last 2 f; object wipe ≈10 f, once per film | Energy carrier between scenes | [V:1Hcg3X t=2.93s] |
| 6 | **Collapse-to-dot** | SNAP | 1 f | Ending a set-up so the dot can start the next | [V:1i2L14 t=1.067s] |
| 7 | **Mask wipes** (TR-10: band push, split panel, blinds, iris) | QUICK-READ | Blinds 4 f with 1 f stagger; hex iris 7 f; band push 20-32 f; split panel 72 f (reading) | ≤2 per film | [V:1i2L14] [V:1Hcg3X] |
| 8 | **Light bridge** (TR-14) | QUICK | White bloom 3-6 f; wash 7-18 f | V3 only; white is the neutral room | [V:1-6l8S] |
| 9 | **Light-source match** | SNAP | Shrink the outgoing emitter to a ≈4% W point in 2 f, hold 2 f, reveal the incoming one at the same position | V2 | [V:1Hcg3X rule 12] |
| 10 | **Flash frames** | QUICK | 3 f + 2 f, **once per film**, ≤3 flashes per second (WCAG 2.3.1) | The single transformation peak | [V:1Hcg3X t=12.83s] |

**Cut-frame rules (Part 05 §7.3):** cut on peak velocity, on an empty plate, on full cover, behind an exiting element, 1-8 f after a state change, or 0-2 f before a beat. Velocity hand-off across a cut: the outgoing exit and the incoming entrance continue the same direction.

**Never in this format:** generic crossfades between scenes (only a 6 f blur-dissolve once, for a mood change), 1-frame dips to black (use a clean cut or a 2-4 f luma dip, 2D-A11), pixel or glitch builds longer than 12 f (NOSTRA's 23-26 f build reads as "illegible noise", 2D-A6), more than one flash, zoom-transition presets on every cut.

---

## 10. UI treatment

Minimal 2D films show UI as **simplified, redrawn components**, not screenshots. This is a deliberate abstraction tier (Part 06 §8.2 real-vs-mock tiers): the UI is drawn in the film's shape kit so it never fights the flat world.

| Rule | Value | Evidence |
|---|---|---|
| Abstraction | Draw only the 1-3 components the story needs (a card, a toggle, a status pill, a button). Everything else is grey bars (texture, ≤2% H) or absent | Part 06 UI-E02; HubSpot's white UI with soft shadows [V:1CSXtQ] |
| Truth | Labels, states and order must be **true to the product**; no invented features or numbers (QC-1.7) | AA-07 |
| Size | Hero UI card 55-85% W; every string that carries meaning ≥T-UI-READ (≥43 px @1080, ≥52 px @1920) | Part 02; MK-01 |
| Frame | Frameless cards by default; a device outline only when the device itself matters (phone vs laptop) | Part 06 UI-E01 |
| Build | Border and shadow 1-3 f → icon pop ≈3 f → controls 4-5 f → optional ×0.75 pull-back over 21-31 f | 2D-SaaS 1 [V:1CSXtQ t=7.80-9.03s] |
| Cascades | 8-9 f empty hold, then rows at 3-4 f stagger, 4-6 f each, 13-22 f total | 2D-SaaS 4 |
| States | Toggles and statuses change in 1-3 f (snap), on a beat; every status held **≥1.0 s** (≤5 words) | Part 07 UI-status tier; Chowdeck's 2 f status is the flaw [V:126cpH] |
| Cursor | Only on desktop UI: travel 20-27 f E-GLIDE, **dwell 8-10 f** before the click, press −6 to −20% scale in 3 f, release 6 f, no overshoot; click sound on the press frame | Part 06 §8.4; NOSTRA BOOK NOW [V:1i2L14 t=33.8-34.0s] |
| Tap (mobile) | Finger-sized ripple (≈120 px @1920), button darkens on the press frame | Guideline 07 §10 |
| Consequence | The UI result starts **≤6-8 f after** the action (cause → effect reads as one) | Part 06 UI-B |
| Morph out | The UI survives the scene change via 2M-05 unfold or 2M-07 collapse | 2D-SaaS 3 |
| Cadence | UI, cursor and scrolls on ones, always | 2D-A12 |

---

## 11. Sound and music

### 11.1 Music

| Parameter | Value | Evidence |
|---|---|---|
| Character | Minimal, warm-digital, spacious: plucks, felt piano or mallets, airy pads, a light sub kick (V1, V3); compressed mid-tempo bed with light percussion under a narrator (V2) | Part 09 §16.2.2 |
| **Tempo** | **100 BPM default** (beat 18 f, eighth 9 f, bar 72 f = 2.4 s). Calm V3: 86-100. V1 brand system: 83-100 (NOSTRA 83.4). V2 narrated: 60-90 felt pulse, often a half-time of 120-130 (Solar 64.6/129). One tempo per film | Part 09 SD-T1, SD-T3, SD-T6 |
| Whole-frame tempos | 90 (20 f), 100 (18 f), 112.5 (16 f), 120 (15 f) | Part 09 §16.3.2 |
| Edit driver | V1/V3 without VO: copy-led first half, beat-led after the drop; cuts **0-2 f before** the beat, never after; ≥60% of hard cuts within ±2 f of the grid once music-led. V2: VO sentences, scene changes on downbeats | Part 09; [V:19NRDv] 11 of 18 cuts |
| Arc (30 s) | Sparse open (plucks, no kick) → riser 2-4 s into the reveal → **drop on the reveal cut (≈20%)** → steady pulse under the mechanism → **suck-out ≥15 dB on the decisive click** → **breakdown −6 to −8 dB under the breather (10%)** → build into the climax → **sting on the lockup ±2 f**, tail 1.2-2.2 s | Part 09 §16.4; HubSpot drop at 43%, kivi at 10.6% |
| Silence before hits | 70-350 ms at ≤−35 dB or ≥15 dB under the bed | Part 09 defaults |
| Under VO | Duck 10-12 dB, attack 30-80 ms, release 250-700 ms | Part 09 |
| Ending | Music never absent while the CTA is animating (Lottieicon's music ends 3.7 s early, flagged) | Part 09 |
| Loudness | **−14 LUFS ±1 integrated, ≤−1 dBTP** (social, web); −16 for a VO-led landing-page explainer (P09 §16.11.1). NOSTRA's −7.9 LUFS with +1.6 dBTP fails | Part 09; MK-07 |

### 11.2 SFX map for minimal 2D (Part 09 §16.7)

Budget per 30 s; levels relative to the running bed. **The total designed SFX layer in this format is small: 6-10 events per 30 s.** Shapes do not need a sound each.

| Motion event | Family | Place at | Level | Budget / 30 s |
|---|---|---|---|---|
| Hook's first frame (object or slam on f0) | **F12 sub hit** + 100-300 Hz harmonic layer for phones | f0 | Peak −3 to −9 dB | 1 |
| Polarity flip / section turn / result landing | **F11 impact** | Cut frame ±2 f, after a 70-350 ms gap | +8 to +15 dB over the bed | 3-5 |
| Dot / chip / icon pops (one staggered sequence) | **F05 settle ticks** | First moving frame of each pop | −6 to −10 dB under F01 | 0-1 sequence |
| Button press, tap, approve | **F01 click** | **Press frame, 0 f**, inside a ≥12-15 dB dip | Bed level once the bed is down | 1-3 |
| Toggle on / off | **F03 toggle** | Press frame, optional settle tick 1-3 f later | As F01 | 0-2 |
| Success state, status pill, check | **F04 soft tone** | First full-opacity frame | +0-4 dB in its band | 0-2 |
| Counter running / final value | **F06 data ticks** + lock accent | ≤15 ticks/s while running; accent on the final-value frame | Low; accent at F01 level | 0-1 |
| Token travelling a route / dot falling | **F13 tonal glide** | Spans the move | Bed level | 0-2 |
| Revoked item falling, object landing (V2 props) | **F15 Foley thud** | Contact frame | Bed level | 0-3 |
| The one big whip or transformation | **F07 whoosh** | Peak on the fastest frame | +3 to +6 dB above 4 kHz | **0-1** |
| Into the reveal | **F09 riser** | Crest 0-2 f before the hit | Crest ≈ −12 dB | 1 |
| Lockup | **F17 sting** | ±2 f of the lockup's first full frame; 1.2-2.2 s | Loudest sustained moment | 1 |
| Mid-film "silence" | **F16 ambience/pad** | Continuous | Floor −40 to −45 dB | Always |

Rules: sounded transitions 15-65% of transitions, never all; ≤1 SFX per beat; whooshes 0-2 per film; keystrokes (if any typing) 20-25 dB under the music; a word never appears after its sound (it may lead by ≤2 f).

---

## 12. Copy rules

### 12.1 Word budgets and reading time (Part 07 §9.11)

| Beat | Max words | Max chars | Reading tier (minimum) |
|---|---|---|---|
| Hook | ≤7 (≤5 in 9:16 and spots ≤15 s; this format's default is 5), 1-2 visible at any instant while it builds (P01 H2) | ≤24 | Kinetic: landed 10-14 f |
| Kinetic line (V1) | ≤3 | ≤26 | 10-14 f landed (≥15 f over a busy frame); ≈1.0 s per sentence |
| Statement | ≤6 | ≤32 | Landed ≥0.8 s; total visible 0.25 s × words + 0.25 s (5 words → 1.5 s) |
| Diagram label | 1-3 | ≤20 | Visible ≥0.9 s; previous labels dim to 50% |
| Payoff | 2-6 | ≤40 | **≥1.0 s fully still** |
| UI status | ≤5 | ≤24 | ≥1.0 s each |
| CTA | 1-3 | **≤16** | Part of the resolution; ≥1.5 s visible |
| Lockup | Logo + 1 line (tagline ≤4 words or a URL) | — | ≥1.5 s; final frame ≥2.0-2.4 s still |
| Message / caption / anything over a busy frame | 2 lines × ≤42 chars | 84 | max(1.0 s, 0.33 s × words + 0.4 s, chars ÷ 17); ×1.15 for Hindi/Hinglish |
| Whole 30 s film (no VO) | **35-50 words** of on-screen copy | — | ≤3 text-only cards in a row (MK-05) |

### 12.2 Hook rules and examples

Rules: picture on f0 and the first change by f3 (thumbnail = f0 must read); one question or one tension; ≤5 words; the climax answers it (template T-E); no logo in the first 1.8 s.

| Hook pattern | Example (fictional brands) | Why it works |
|---|---|---|
| Ownership question | "Who has the password?" | Names the hidden risk in 4 words; the answer is the product |
| Location of a thing | "Where does your invoice go?" | Sets up a route draw (2M-16) |
| Count tension | "12 tools. 1 approval." | Two numbers = a before/after in one line (only with true numbers) |
| Mechanism question (V2) | "How does a passkey work?" | Explainer promise; Solar's "How do solar panels work?" |
| Pain in their words | "Still chasing sign-offs?" | kivi's "Still typing?" pattern [V:1-6l8S t=0.10s] |
| Dream outcome (V1) | "Imagine a month-end with no spreadsheets." | NOSTRA's "Imagine a way…" opening [V:1i2L14] |

### 12.3 CTA rules and examples

Rules: verb + product or verb + benefit; ≤16 characters on the button or link face; the URL or handle ≥54 px; one CTA only; the action must be possible (no "Book a demo" if there is no booking page); music continues under it; for performance placements use a button with a press (−20% in 3 f, release 6 f, no overshoot), for awareness a quiet link with an underline drawn in 12 f (E-OUT).

| Placement | CTA examples |
|---|---|
| B2B awareness (LinkedIn, YouTube) | "Try Hushkey →" · "See how it works" · "Read the guide" |
| Performance / sign-up | "Start free" · "Get early access" · "Book a demo" |
| Service / agency (V1) | "Book a call" · "Get a quote" · "Book now" (NOSTRA) |
| Website loop | No CTA in the loop; the page carries it |

### 12.4 Banned or risky copy

- Numbers you cannot source ("10× faster", "used by 10,000 teams"): replace with a mechanism claim ("Nothing to share") or delete the beat. Every number is the client's, verified (QC-1.1, AA-08).
- Absolute security or compliance promises ("unhackable", "100% secure"). Use the precise property ("phishing-resistant").
- Lorem ipsum, placeholder names in UI, duplicate rows (AA-08).
- Mixed languages in one frame unless the audience is bilingual by design (NOSTRA's French body + English heads is flagged).
- Exclamation marks and hype words in V3 (HubSpot uses none).

---

## 12b. Typography

One place for this format's type decisions; sizes are P07 §9.2 tokens (font px at 1920×1080 / 1080×1920), entrances and exits follow P03 SP-T0, word budgets and holds follow P01 H2 and P07 §9.11.

| Item | This format |
|---|---|
| Families and weights | One family, two weights (e.g. Inter 400 / 800, or 300 / 500 for calm); one line-icon family (§6) |
| Size tokens | T-SUPER 70 px @1080, 72-106 px @1920 (setup : hero 1 : 2.5-3); T-STATEMENT 90 / 128 px; T-HERO 185 / 240 px; T-CAPTION 60-75 px @1920, 2 lines × ≤42 characters |
| Reveals | RV-01 cut-on, RV-04 rise + blur + fade, RV-05 word slide-in, RV-15 word-space opening |
| Exits | EX-02 blur dissolve, EX-05 rise and fade, EX-12 gap split; exits about half the entrance (SP-T0) |
| Word budget | Hook ≤7 words, ≤5 in 9:16 and spots ≤15 s (this format's default is 5); cards ≤6 words; captions always on |
| Holds | Punch word 10-15 f; kinetic line of ≤3 words ≥10-14 f landed; statement of 4-6 words ≥0.8 s landed; payoff, result or status ≥1.0 s still; no text event under 25 f except SD-03 punch cards in a run (P07 §9.11.2, P08 §17.8 #3-4); lockup ≥1.5 s still (2.2 s premium) |
| Floors | Must-read text inside the safe area (16:9 x 96-1824, y 54-1026; 9:16 x 120-840, y 270-1210); 9:16 body font ≥52 px; contrast ≥4.5:1 (3:1 large), ≥7:1 or a ≥60 % scrim over footage (P07 §9.21, P11 G-27, G-37) |

## 13. Worked example storyboard: "Hushkey", 30 s, 16:9 master

**Fictional product.** Hushkey: a passkey manager for teams. Members sign in with device-bound passkeys; admins add and remove people in one click; there are no shared passwords. **Audience:** IT leads and founders at 10-200-person companies on LinkedIn and YouTube, mostly sound-off. **Variant:** V3 calm minimal with V1 polarity flips at the three turns (problem, reveal, climax). **Template:** T-E question → answer + T-C one transaction (the sign-in challenge). **Format:** 1920×1080, 30 fps native, 900 f. **Music:** 100 BPM (beat 18 f, bar 72 f), plucks + felt keys + light sub kick; drop at 6.0 s. **Every cut is placed 1 f before the listed beat frame** (e.g. the 1.80 s cut is on f53) per Part 09. **Palette:** canvas #F4F3EF, ink #15171C (16.15:1), tangerine field #FF6A2B (ink type on it, 6.27:1; never off-white type on it, 2.57:1), tangerine text tone #B83A0A on canvas (5.19:1), inactive grey #C9C7C0 (shapes only), label grey #5E626B (5.51:1). **Type:** Inter 600 statements 90 px, Inter 500 labels 58 px, wordmark in the brand face. **Shape kit:** dot, rounded note card (radius 12), key mark (circle + shaft), line icons at 3 px stroke, avatar circles. **Shadow model:** soft drop (y 12, blur 32, 6%) on UI cards only; no light model. **Screen direction:** left → right = request travels to the device; right → left = answer returns. **Signature move:** the dot → key morph (used at the turn and bookended at the lockup).

| Scene | Timestamp | Duration | Visual | UI / product action | Camera | Object motion | Text | Transition | Lighting | Sound | Music | Motion notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 Hook | 0.00-1.80 s · f0-54 | 1.80 s (54 f) | Canvas #F4F3EF; one ink-outline note card (22% W) left of centre with "••••••••" in grey; statement to its right | None (the password is the "product" of the old world) | CM-02 push 1.00 → 1.06 linear f0-54 | Note on f0, snap-tilt −8° → 0° in 12 f (2M-11, E-OUT); "the password?" rises 3% H with blur 8 → 0 px in 9 f from f3 (2M-04); exit: note E-WHIP right 8 f (f45-53) to 19% W/f, text E-EXIT 6 f | Who has *the password?* (4 words; "password?" in #B83A0A; 90 px) | Hard cut on the empty plate at f53 | Flat | **F12 sub on f0** with 100-300 Hz layer | Sparse plucks, no kick | "Who has" is on f0 so the thumbnail reads; first change on f3; landed hold f12-45 = 1.1 s |
| 2 Setup | 1.80-3.60 s · f54-108 | 1.80 s (54 f) | Same note enters from the left (direction continues) and splits into 3 copies that fly to 3 line icons: chat bubble, spreadsheet grid, desk monitor (each 12% W, evenly spaced on y 50%) | — | Locked + drift 0.15% W/f left | Note arrives E-SNAP (50% in 3 f); copies split f62 and travel 10 f E-OUT, stagger 3 f; icons pop 1.25× → 1 in 4 f, stagger 4 f (2M-18); labels blur-fade 4 f under each icon | It lives in: (T-SUPER 70 px, top) · group chat · spreadsheet · sticky note (labels 58 px) | Hard cut f107 | Flat | **F05 ticks** on the 3 icon pops (f66, f70, f74), −8 dB under F01 level | Plucks + hats | Labels landed by f80; visible 0.9 s; 3 icons, 1 stroke weight |
| 3 Problem | 3.60-5.40 s · f108-162 | 1.80 s (54 f) | **Polarity flip** to ink field #15171C; the 3 notes converge to centre into one; a crack line is drawn across it; 6 account circles in a row below switch from grey outline to tangerine fill one by one | — | Locked; **E-PUNCH +20% over f155-161** into the cut | Converge 8 f E-OUT; crack trim path 6 f E-OUT at f116; circles snap to tangerine 0 f each, 2 f stagger (f126-136) — contagion | One leak. *Every account.* (off-white #F4F3EF on ink; 2 lines, 90 px; "Every account." in tangerine field colour #FF6A2B as large text, 6.3:1 on ink) | Hard cut f161 | Flat | **F11 impact on f108** after a 70 ms gap (f106-108) | Kick enters, still filtered | "One leak." f112 (rise 9 f); "Every account." f126; landed to f155 = 0.97 s (kinetic tier) |
| 4 Turn | 5.40-6.00 s · f162-180 | 0.60 s (18 f) | The 6 circles collapse into one tangerine dot at frame centre on the ink field; empty frame around it | — | Locked | Collapse 8 f E-EXIT (f162-170); dot holds 4 f; dot pulses 1.00 → 1.08 over 6 f | — | **Shape-match cut** f179: the dot stays at x 960 ±1 px into scene 5 | Flat | **F09 riser** f120-177, crest f177; **167 ms gap f175-180** (≤−35 dB) | Filter sweep up | Carried shape #1 (the dot) |
| 5 Reveal | 6.00-8.40 s · f180-252 | 2.40 s (72 f) | **Polarity flip** to tangerine field #FF6A2B; the dot morphs into the Hushkey key mark (ink, 9% W); wordmark "Hushkey" (ink, 26% W) to its right; promise line below | Brand + promise | CM-02 push 1.00 → 1.08 linear | Morph dot → key f180-192 (12 f, E-INOUT); wordmark mask L → R 10 f (f190-200); promise rises 9 f from f204 | Hushkey · Passkeys for your *whole team.* (ink, 90 px; 5 words + name) | Hard cut f251 | Flat | **F11 hit on f180 (0 f)** | **Drop on f180 (6.0 s, 20%)**: kick + bass + plucks | **Hero 1 at 6.0 s.** Promise legible from f207: 44 f = 1.47 s ≈ statement tier (5 words → 1.5 s); bookends with scene 14 |
| 6 Mechanism: set-up | 8.40-10.20 s · f252-306 | 1.80 s (54 f) | Canvas; laptop outline left (30% W), phone outline right (18% W); the key mark centre splits into two halves: tangerine "private" half flies into the phone, outline "public" half into the laptop | Key pair created | Locked + drift 0.1% W/f | Split 8 f E-OUT at f258; halves travel 14 f E-GLIDE (f266-280); labels blur-fade 4 f at f282, flanking each device at x ≈18% / 82% W | private · stays on phone / public · safe to share (labels 58 px, ≤3 words each) | Hard cut f305 | Flat; soft drop shadow 6% under both devices | F05 tick on the split (f258) | Groove | Labels visible 0.8 s; screen direction set: laptop left, phone right |
| 7 Mechanism: hero hold | 10.20-14.40 s · f306-432 | **4.20 s (126 f, 14%)** | Same devices; grey dashed arc route laptop → phone; a small ink square "challenge" token travels it; the phone shows a fingerprint prompt; the token gets a tangerine stamp and travels back; the laptop shows a "Signed in" status pill | **The sign-in:** site sends challenge → device signs with the private half → site verifies with the public half | CM-02 slow push 1.00 → 1.10 linear over 126 f (≈0.08%/f) | Route pre-drawn f306-318 (trim 12 f, E-LINEAR); token leg 1 f318-346 (28 f, E-GLIDE); fingerprint pops f348 (2× → 1 in 4 f); **tap ripple, press frame f356**; stamp wipes L → R 4 f (f357-361); leg 2 f364-380 (16 f, ≈5 f corner pause at the apex); status pill snaps f386 and holds to f432 | 1 · challenge (f318) → 2 · signed on device (f356) → 3 · nothing to steal (f392); the previous label dims to 50% as the next arrives; pill: "Signed in ✓" (UI 48 px) | Hard cut f431 | Flat; pill in tangerine field with ink text | **Dip −15 dB f344-356**; **F01 click on f356**; F13 tonal glide spans leg 2; **F04 success tone on f386** | Groove (dipped, then back on f362) | **Hero 2 at 11.87 s (40%).** The longest shot, Solar's hero-hold rule; status held 1.53 s ≥1.0 s; 1 primary motion at any time |
| 8 Mechanism: team | 14.40-16.20 s · f432-486 | 1.80 s (54 f) | Canvas; one simplified admin card (55% W, radius 24, soft drop shadow): "Team · 5 members", 5 avatar circles with tiny key icons, one toggle row "Passkeys required" | Admin turns on "Passkeys required" | Locked | Card border + shadow 3 f, rows cascade after an 8 f empty hold at 3 f stagger, 5 f each (f443-460); toggle knob slides 3 f on f466 (press frame) and the track fills tangerine | Team · 5 members / Passkeys required (UI 48-52 px) | Hard cut f485 | Flat UI | **F03 toggle on f466** | Groove | Cascade total 17 f ≤20; toggle state on a beat (f468 = beat 26, 2 f early) |
| 9 Mechanism: revoke | 16.20-18.00 s · f486-540 | 1.80 s (54 f) | Same card; a cursor glides to row "Sam" and clicks "Remove"; Sam's key turns grey and falls out of the card; the other 4 rows slide up | One-click offboarding | Locked | Cursor travel 20 f E-GLIDE (f490-510), dwell 8 f, **press f518** (−8% scale in 3 f, release 6 f); key greys 0 f on f520 and falls with E-GRAVITY (×1.2/f) + 15° rotation, 12 f; rows close up 8 f E-OUT | Someone leaves? *One click.* (T-SUPER 70 px above the card, f490) | Hard cut f539 | Flat UI | **F01 click on f518**; F15 soft thud when the key leaves the card (f532) | Groove | Line visible 1.6 s; UI on ones; consequence 2 f after the press (≤6-8 f) |
| 10 Stat | 18.00-19.80 s · f540-594 | 1.80 s (54 f) | Canvas; the team card dimmed to 15% as texture behind (2M-24); a huge "0" with a label | Product truth: passkeys mean no shared passwords | CM-02 push 1.00 → 1.05 | Card dims in 3 f; "0" snaps from 1.25× → 1 in 6 f (E-SNAP) on f544; label rises 9 f at f552 | *0* passwords to share (the "0" 240 px in #B83A0A; label 90 px ink) | Hard cut f593 | Flat | **F11 impact on f540** (small, +8 dB) | Groove; hats drop out from f576 | "0" is a mechanism fact, not a marketing number; still ≥1.0 s (f561-593) |
| 11 Breather | 19.80-22.80 s · f594-684 | 3.00 s (90 f, 10%) | Canvas; the key mark small at centre (8% W) slowly drifting up; one benefit line below | — | CM-02 push 1.00 → 1.05 over 90 f; drift 0.1% H/f | Line rises 12 f (E-OUT) from f600; nothing else moves; motion ≤1/10 of the peaks | Phishing-resistant, *by design.* (3 words, 90 px) | Hard cut f683 | Flat | — | **Breakdown −8 dB**, low-pass pads, kick out | Text visible 2.7 s: the calm before the climax; no SFX |
| 12 Climax | 22.80-24.60 s · f684-738 | 1.80 s (54 f) | **Polarity flip** to ink field; one centred line whose last word swaps | — | Locked; punch +18% over f732-737 into the cut | "No notes." f684 → swap to "No resets." at f700 (16 f) → "No leaks." at f713 (13 f); in-place swaps in 1 f with a 4 f rise; "leaks." lands f720 and holds 17 f | No notes. → No resets. → No *leaks*. (185 px T-HERO, off-white; "leaks." in #FF6A2B) | Hard cut f737 | Flat | **F11 hit on f720** | Build from f684 (kick back, riser 1 bar); hit on the beat at 24.0 s | **Hero 3 at 24.0 s (80%)**; answers the hook's question |
| 13 CTA | 24.60-27.00 s · f738-810 | 2.40 s (72 f) | Canvas; quiet link "Try Hushkey →" centred, URL below | The ask | Locked; drift 0.1% W/f | Link rises 9 f from f740; underline draws L → R 12 f E-OUT (f752-764); arrow nudges +1% W and back once at f780 (E-OUT 8 f) | Try Hushkey → (90 px ink, 13 chars) · hushkey.app (60 px #5E626B) | Hard cut f809 | Flat | — (no click: awareness CTA) | Pad + soft pulse; music continues | Visible 2.3 s; URL ≥54 px; inside y ≤918 |
| 14 Lockup | 27.00-30.00 s · f810-900 | 3.00 s (90 f) | **Tangerine field** (bookend of scene 5); key mark + "Hushkey" wordmark centred; tagline below | Brand | Locked | Mark and wordmark converge 24 px over 9 f (E-OUT, f810-819) while fading in; tagline blur-fade 4 f at f822; **dead still from f828 (27.6 s)** | Hushkey · Nothing to leak. (tagline 60 px ink) | End on f899 | Flat | **F17 sting on f810 (±2 f)**, sustain 1.4 s, decay to ≤−60 dB by f899 | Resolves on the sting | Still 2.4 s ≥2.0 s; −14 LUFS master |

**Totals.** 14 shots · ASL 2.14 s (V3/V2 band 2.1-2.4 s) · longest 4.2 s (14%, the mechanism) · 43 words of on-screen copy (+ 6 UI strings) · scene changes: 11 hard cuts, 1 shape-match cut, 1 polarity flip carried by a punch, 0 dissolves · polarity flips 3 · carried shape: the dot (scenes 4, 5, 14) and the key mark (5, 6, 7, 11, 14) · designed SFX: F12, F05 ×4, F11 ×5, F09, F01 ×2, F03, F04, F13, F15, F17 (≈9 distinct events above bed level once the F05 ticks are counted as one sequence) · 1 signature move (dot → key morph, bookended) · 0 flashes · 0 3D.

**9:16 re-layout (1080×1920, same timings).** Statements 128 px, hero 240 px; scene 2 icons stack vertically (y 420 / 740 / 1060) with the note travelling top → bottom; scene 6-7 devices stack (laptop top at y ≈420, phone bottom at y ≈1050) and the route becomes a vertical arc (down = request, up = answer); scene 8-9 card 75% W (810 px), UI text ≥52 px; every string inside x 120-840, y 270-1210; lockup wordmark ≈56-62% W.

**15 s cut (450 f, rebuilt, not trimmed):** hook "Who has the password?" (0-1.8) → turn + reveal on tangerine with the drop at 1.8 s (1.8-4.2) → hero hold of the challenge route, compressed to 3.6 s (4.2-7.8; legs 22 f + 14 f, press at 6.0 s) → "0 passwords to share" (7.8-9.6) → "No leaks." (9.6-10.8, hit at 10.2 s) → CTA (10.8-12.6) → lockup still from 13.2 s (12.6-15.0).

**6 s bumper:** dot on ink drops and lands (0-1.2, F12) → dot → key morph on tangerine with "Hushkey" (1.2-3.0, F11 + drop) → "Nothing to leak." + URL, still from 3.6 s (3.0-6.0, F17).

---

## 14. Building it: motion-kit vs generative video vs 3D

### 14.1 What motion-kit builds directly

Scene types: hook, kinetic, orb, title, stat, list, compare, bars, grid, quote, prompt, chat, wave, image, clip, cta, logo. Themes: midnight, clean, neon, editorial, pop, desi, corporate, mono, studio, studio-dark. Formats: reel (9:16), portrait (4:5), square (1:1), landscape (16:9). Field reference: `skills/motion-director/references/scenes.md`; recipes in `motion-kit/specs/recipes/` (closest starting points: `tips-listicle.json` for a mono V1 film, `stats-report.json` for a number-led film, `launch-film-16x9.json` for V3).

**Theme by variant.**

| Variant | Theme | Why | Motion | Transition |
|---|---|---|---|---|
| V1 Monochrome brand system | **mono** (black, white, one signal red; Inter 900 caps; plain background; grain) with `brand.accent` set to the brand hue | Closest to NOSTRA's one-hue system; caps display | `snappy` (enter 15 f, word stagger 2 f, overshoot 0) | `cut` (or the theme's `whip` for energy) |
| V2 Editorial 2.5D | **editorial** (cream paper, Instrument Serif display, terracotta, grain) | Serif concept words over a paper ground, like Solar's serif + grotesk roles | `smooth` | `cut` |
| V3 Calm minimal (light) | **clean** (off-white #F5F5F7, Inter 800, one blue; spotlight background) or **studio** (light Inter 300, calm blur-in) | Off-white + ink + one accent | `smooth` (enter 22 f, rise, 0 overshoot) or `calm` (blur-in, 15 f) | `cut` |
| V3 dark | **studio-dark** or **corporate** (white/slate/indigo, B2B) | — | `smooth` / `calm` | `cut` / `blur` |
| Never for this format | `pop`, `desi` (default `bouncy` motion overshoots ≈3% on text, ≈10% on buttons), `neon` (glow + grid reads as tech reel, not minimal) unless the brand demands it | — | Never `bouncy` | — |

**Storyboard stage → kit scene.**

| Storyboard stage | motion-kit scene | Settings |
|---|---|---|
| Hook (question) | `kinetic` (1-2 lines ≤28 chars, one `*accent*`) | Words on f0; the checker warns if frame 0 is blank |
| Hook (before → after tension) | `hook` (`setup` ≤4 words, `strike` ≤14 chars, `punch` ≤6 words) with `bg: "inverse"` for the problem flip | Max 1-2 `accent`/`inverse` scenes per video |
| Setup ("where it lives today") | `list` with `style: "lines"` (big kinetic lines, earlier ones dim) or `grid` (2-6 emoji tiles) | `lines` is the calmest list in light themes |
| Reveal | `title` (`kicker` "Meet X", `headline` ≤8 words) with `bg: "accent"` | The accent field = the polarity flip |
| Mechanism steps | `list` with `style: "numbers"` (3 steps, 2-6 words each) | Numbers make the steps countable (§4.3) |
| Before vs after | `compare` (1-2 rows per side) | — |
| Simplified UI action | `prompt` (label, prompt ≤40 chars, button, result) or `chat` | Only when a typed input is the story; the kit types ≈2 chars/frame |
| A number | `stat` (`value` counts up, meter fills) | True numbers only |
| Climax line | `kinetic` (3 short lines) | — |
| CTA | `cta` with `style: "link"` (awareness) or `"button"` (performance) | `action` ≤16 chars |
| Lockup | `logo` (`name`, `tagline`, `src`) | Set `duration` only here to land the slot length |

**Validated specs for the Hushkey example** (both pass `npm run check` with no warnings; the engine darkens `#FF6A2B` to `#F25E1A` for 3:1 on the clean background).

30 s, 16:9 (engine timeline: kinetic 0.0-1.8 · list 1.8-5.4 · hook 5.4-8.4 · title 8.4-10.9 · compare 10.9-15.3 · list 15.3-19.1 · stat 19.1-21.8 · kinetic 21.8-24.9 · cta 24.9-27.0 · logo 27.0-30.0 s):

```json
{
  "format": "landscape", "theme": "clean", "motion": "smooth", "pace": "fast", "transition": "cut",
  "brand": { "name": "Hushkey", "accent": "#FF6A2B", "accent2": "#5E626B", "handle": "hushkey.app" },
  "audio": { "sfx": true },
  "scenes": [
    { "type": "kinetic", "lines": ["Who has", "the *password*?"] },
    { "type": "list", "title": "Right now it lives", "style": "lines", "items": ["in a group chat", "in a spreadsheet", "on a sticky note"] },
    { "type": "hook", "setup": "One leak:", "strike": "1 account", "punch": "*Every* account.", "bg": "inverse" },
    { "type": "title", "kicker": "Meet Hushkey", "headline": "Passkeys for your *whole team*.", "bg": "accent" },
    { "type": "compare", "title": "What changes", "left": { "label": "Passwords", "items": ["Shared", "Phishable"] }, "right": { "label": "Passkeys", "items": ["Stay on device", "Phishing-resistant"] } },
    { "type": "list", "title": "How it signs you in", "style": "numbers", "items": ["Site sends a challenge", "Your device signs it", "Nothing to steal"] },
    { "type": "stat", "kicker": "Passwords to share", "value": "0", "label": "for the *whole team*" },
    { "type": "kinetic", "lines": ["No notes.", "No resets.", "No *leaks*."] },
    { "type": "cta", "action": "Try Hushkey", "style": "link", "handle": "hushkey.app" },
    { "type": "logo", "name": "Hushkey", "tagline": "Nothing to leak.", "duration": 2.2 }
  ]
}
```

15 s, 9:16 V1 mono variant (kinetic 0.0-1.7 · title 1.7-4.2 · list 4.2-7.1 · stat 7.1-9.7 · cta 9.7-11.6 · logo 11.6-15.0 s):

```json
{
  "format": "reel", "theme": "mono", "motion": "snappy", "pace": "fast", "transition": "cut",
  "brand": { "name": "Hushkey", "accent": "#FF6A2B", "handle": "hushkey.app" },
  "audio": { "sfx": true },
  "scenes": [
    { "type": "kinetic", "lines": ["Who has", "the *password*?"] },
    { "type": "title", "kicker": "Meet Hushkey", "headline": "Passkeys for your *whole team*." },
    { "type": "list", "style": "numbers", "items": ["Site sends a challenge", "Your device signs it", "Nothing to steal"] },
    { "type": "stat", "kicker": "Passwords to share", "value": "0", "label": "for the *whole team*" },
    { "type": "cta", "action": "Try Hushkey", "style": "link", "handle": "hushkey.app" },
    { "type": "logo", "name": "Hushkey", "tagline": "Nothing to leak.", "duration": 2.6 }
  ]
}
```

Pipeline: `npm run brand -- <logo> --spec specs/hushkey.json` (writes accent and logo) → `npm run music -- specs/hushkey.json --track music/x.mp3` (snaps cuts to the beat; pick a 90-100 BPM track) → `npm run check` → `npm run preview` (contact sheet) → `npm run qa` → `npm run make`. Re-run with `--format portrait|square|reel`: the engine re-lays out and keeps durations.

### 14.2 Where the kit falls short of this guideline (and the fix)

The kit produces a **clean V1/V3 type-and-card film**; it does not draw the bespoke shape kit, diagrams or routes that make this format distinctive. Expect the template version to read as "minimal kinetic type with cards" and the custom version to read as "a 2D explainer".

| Gap | Guideline target | Kit behaviour today | Fix |
|---|---|---|---|
| Custom shapes, line icons, diagrams | Shape kit + one hero object per frame (§6.1) | Scenes are type, cards, emoji tiles, bars, orb | Custom Remotion scene (`docs/ADDING-SCENES.md`) using SVG paths; or render the diagram in AE/Lottie and drop it in as `clip` (muted MP4) or `image` |
| Shape-match chains, dot → mark morph | Carried primitive ±5% W; 7-13 f morph | Scenes cut or use the global transition; no shared elements | Custom scene with the dot at a fixed position across scenes; or keep a hard cut and place the mark at the same x/y in the next scene |
| Route draws, tokens on paths, stamps | 2M-16 legs 28 f + 16 f | Not available | Custom scene (SVG `strokeDashoffset` driven by `interpolate`, clamped) |
| Simplified UI with toggle / revoke | §10 | `prompt` and `chat` cover typed input only | Custom scene; or `image` of a redrawn UI card with `move: "in"` |
| Hero hold of 4-6 s | One long mechanism shot (13-14%) | Reading-paced planner gives 2.5-4.5 s per scene | Use `list` (numbers) as the hero, or set `duration` on that scene (only if `npm run check` stays clean) |
| Per-scene polarity flips on most cuts (V1) | ≥75% of cuts | Max 1-2 `accent`/`inverse` scenes before the checker warns | Use the `mono` theme (dark base) + 1 `accent` + 1 `inverse`; for full V1 build a custom scene |
| Grain / dither | 1-2% dither on gradients | `grain: true` in mono, editorial, studio themes; clean has none (flat, no gradient, so no banding risk) | Keep clean flat, or pick a grain theme |
| Earned counter with a parked value | E-SNAP-L ≈31 f, ≥1.0 s park | `stat` counts the first number up with a meter | Fine for real numbers; a "0" stat shows a full meter, which reads as "complete" (acceptable) |
| Overshoot | 0% | `bouncy` overshoots; theme defaults of pop/desi are bouncy | Always set `motion` explicitly (`smooth`, `snappy`, `calm`) |
| Exact 100 BPM grid, cut 0-2 f early | §11 | `npm run music` snaps cuts to detected beats | Run it; do not force `duration` below reading time |

### 14.3 What needs generative video (Flow / Veo / Sora / Runway / Kling / Higgsfield)

Almost nothing. Rule (Part 11 AA-U1): **generate atmosphere, compose meaning.** A minimal 2D film has no atmosphere layer by design, so the generative share is 0% in V1 and V3.

| Layer | Generate? | Notes |
|---|---|---|
| Shapes, icons, diagrams, UI, type, numbers, logo | **Never** | Generators cannot set exact typography or hold geometry; every glyph and count must be exact (QC-1.1, QC-1.2) |
| Shape morphs (dot → key, icon → object) | **Never** | Morphing is AA-01; build it as a path morph or a 0 f swap on a pose boundary (2M-09) |
| A textured background plate (paper, soft gradient field, abstract light) for V2/V3 | Optional | Generate a 4-8 s locked-off plate with no objects; defocus or keep it ≤10% contrast; add 1-2% dither; one plate style for the whole film (2D-A7). An engine background (theme `paper`, `canvas`, `spotlight`) usually does the same job with zero risk |
| Illustration style frames for look development | Yes, as reference only | Use image models (or Higgsfield image tools) to explore palette and shape language; redraw the chosen look as vectors |
| A one-off "real world" bookend (V2 hybrid: a real city at dusk before the flat explainer) | Rarely | Then it is a hybrid (HR-11): generated plate + deterministic 2D overlay; one camera move per clip; negative list "text, letters, numbers, logos, user interface, screen content, watermark, faces"; 2-4 takes; conform to 30 fps with optical flow, never duplication; tag `generated: true` in a `clip` scene |
| Music and SFX | Generated music may be used if licensed; **discard generated audio from video models** | Rebuild the SFX layer from §11.2 |

### 14.4 What needs 3D

None in this format. If the brief needs a tilted plane, a modelled hero object or a true depth beat, switch format (Guideline 09) or declare a hybrid with **one** beat of ≤10-15% of runtime entered and left by a motivated move (Part 10 HR rules). Inside this format, fake dimension with **D1 2.5D only**: offset backing cards (6% → 3%), rim thickness, long hard shadows from one key direction, isometric drawing (one angle for the whole series, ST-J), parallax 1.3-2×. These cost nothing in a template engine or After Effects and cannot warp (HR-10).

---

## 15. QC checklist (Minimal 2D Motion Graphics Video)

Run on the storyboard, then frame by frame on the locked cut at final render settings (Part 11 AA-T14: preview stills are for layout only), then on every delivered file.

**Story and structure**
- [ ] One-sentence summary written; the hook asks or sets up exactly what the climax answers.
- [ ] Runtime is the slot length (6.0 / 15.0 / 30.0 / 45.0 s) at native 30 fps; 0 duplicated frames in any move (frame-difference scan).
- [ ] Shot count = runtime ÷ the variant's ASL (1.85 / 2.1 / 2.4 s) within ±25%.
- [ ] One hero hold of 13-14% of runtime on the core mechanism; proof beats shrink after it.
- [ ] A breather of ≈10% before the climax in films ≥30 s; ≤3 text-only cards in a row.
- [ ] Ending = CTA + lockup; lockup dead still ≥2.0 s (≥1.5 s in 6-15 s films); music still playing under the CTA.

**Visual system**
- [ ] ≤5 named colours, ≤4 per frame; one accent hue with a field tone and a text tone; colour semantics never broken.
- [ ] Every text/background pair measured: ≥4.5:1 (3:1 only for large text; never off-white on a light accent field).
- [ ] One stroke weight, one radius family, one shadow model, one light direction (shadow vectors within ±15°).
- [ ] One hero per frame; statement frames ≥85% empty; labels in negative space on the hero's mid-line.
- [ ] Never two consecutive scenes on the same flat background unless they are one set-up.
- [ ] Gradients and dark fields dithered 1-2%; no banding at the delivery bitrate (check the encoded file, not the comp).

**Motion**
- [ ] Every shot follows the envelope: 40-64% of travel on the first moving frame, settled by f10-14; exits 6-11 f accelerating.
- [ ] No still frame longer than 5 f on flat art outside reading holds ≤1.0 s and the lockup; drift 0.1-0.5%/f or push 1.05-1.15× elsewhere.
- [ ] 0% overshoot on type, UI chrome, logos and camera (measure peak past rest); no rotation on text or layouts.
- [ ] Stagger present on every group of like items (1-4 f by size); group reveal ≤20 f.
- [ ] Every moving element has a cause; 1 primary + ≤2 secondary motions per 0.5 s window.
- [ ] No sustained unblurred move above 5% W/f; whips >10% W/f only into a cut with blur on the last 2 f.
- [ ] Discrete states snap on a beat or VO word; continuous values ease.
- [ ] UI, cursor and camera on ones.

**Continuity and transitions**
- [ ] The carried shape sits within ±5% W (±1 px for anchors) across each match cut (onion-skin at 50%).
- [ ] ≥70% hard cuts; one signature device; ≤2 mask wipes; ≤1 flash (3 f + 2 f); no 1-frame dips; no pixel builds >12 f.
- [ ] Step ±10 f around every cut: no stray patches, overlapping words or clipped glyphs (QC-1.30).
- [ ] Screen-direction rule written and obeyed.

**Type and copy**
- [ ] Every string diffed against the string table (100% match); every number verified by the client.
- [ ] Sizes: statements ≥90 px @1080 / ≥128 px @1920; labels ≥56 px @1080 / ≥60 px @1920; nothing meaningful under cap 2.5% H or 36 px @1920; URL ≥54 px.
- [ ] Holds meet the tiers in §12.1 (payoff and UI statuses ≥1.0 s still).
- [ ] Safe areas: 16:9 x 96-1824 / y 54-1026, CTA above y 918; 9:16 x 120-840 / y 270-1210.
- [ ] Hook: words on f0, first change by f3; thumbnail (f0) readable at 25% size.

**Sound**
- [ ] Music 83-100 BPM (or a VO bed), one tempo; cuts 0-2 f before the beat once music-led; never after.
- [ ] Drop on the reveal cut 0-8 f; 70-350 ms gap before each hero hit; suck-out ≥15 dB on the decisive click.
- [ ] Clicks on press frames (0 f); 6-10 designed SFX events per 30 s; whooshes 0-2; sting on the lockup ±2 f.
- [ ] −14 LUFS ±1 integrated, ≤−1 dBTP (VO-led landing-page embed −16; P09 §16.11.1); 48 kHz / 24-bit stems archived.

**Delivery**
- [ ] H.264 High, yuv420p, BT.709, CRF 16-18 (gradient or UI heavy), ≥8-12 Mb/s at 1080p; 1080×1920 / 1080×1350 / 1080×1080 / 1920×1080 masters, each a re-layout.
- [ ] Captions file for any VO; no player wrapper or letterbox inside the master.
- [ ] Flash test: ≤3 luminance flips per second.

---

## 16. Common mistakes

| # | Mistake | Seen in | Fix |
|---|---|---|---|
| 1 | **The slideshow read:** flat frames held still for 1-2 s | Generic templates; 2D-A1 | Drift 0.1-0.5%/f or push 1.05-1.15× on every hold; true stills ≤5 f |
| 2 | **Text too small for a phone** (diagram labels, UI micro-copy) | 7 of 8 references (MK-01): Solar recap labels 2.2-2.5% H, Chowdeck UI ≈1% H | Labels ≥56 px @1080 / 60 px @1920; anything smaller is texture and carries no meaning |
| 3 | **Unlabelled metaphors** (a pinwheel, a ribbon, glass icons with no words) | NOSTRA features 19.95-30.63 s [V:1i2L14] | Every abstract shape gets a ≤3-word label or a numbered step |
| 4 | **Easy Ease everywhere / symmetric in-out** | 2D-A3 (26-39% error vs measured curves) | Role tokens: E-OUT/E-SNAP in, E-EXIT/E-WHIP out, E-LINEAR only for drifts and draws |
| 5 | **Bounce on type, buttons and logos** | Template presets; kit `bouncy` | 0% overshoot; bounce only on physical props, ≤25%, one cycle, playful variants only |
| 6 | **New shape vocabulary on every cut** | NOSTRA's "a new material per section" | One shape kit; carry one primitive across ≥2-3 setups |
| 7 | **Two light directions or two illustration styles** | Solar (batteries vs tokens) [V:1Hcg3X]; kivi plates [V:1-6l8S] | One key direction and one rendering style in the bible; check shadow vectors |
| 8 | **A payoff or state shown for under half a second** | Solar payoff ≈0.4 s; Chowdeck status 2 f [V:126cpH] | Payoffs and statuses ≥1.0 s fully still |
| 9 | **No logo or CTA, or ending mid-motion** | Solar, Lottieicon, Chowdeck (MK-04) | CTA + lockup with ≥2.0 s still and a sting |
| 10 | **Banding on dark or gradient fields** | kivi, Wix, Bumper, Lottieicon (MK-03) | 1-2% dither; CRF 16-18; check the encoded file |
| 11 | **Duplicate-frame judder from 24/25 → 30 fps** | Wix, HubSpot, Solar (MK-06) | Animate and render natively |
| 12 | **Unblurred fast pans that strobe** | Lottieicon 22-27% W/f [V:1ccYWJ t=30.57-32.57s] | ≤5% W/f unblurred; blur 5-10%; >10% only as a whip into a cut |
| 13 | **Too many flashes, glitches or pixel builds** | NOSTRA 23-26 f pixel build | One flash (3 f + 2 f) per film; builds ≤12 f |
| 14 | **Over-loud master** | NOSTRA −7.9 LUFS, +1.6 dBTP; kivi −10.7 | −14 LUFS, ≤−1 dBTP |
| 15 | **Text-card fatigue** (4-13 centred cards of the same size) | kivi, HubSpot, Lottieicon (MK-05) | ≤3 text-only cards in a row; alternate cards with a diagram or UI beat; vary the reveal grammar after ≤6 uses |
| 16 | **Generating shapes, morphs or UI with a video model** | AA-01, AA-05 | Compose every shape, glyph and morph deterministically; generate only optional plates |
| 17 | **Cropping the 16:9 master to 9:16** | CO-U18 | Re-layout: stack pairs vertically, labels above/below, statements 128 px |
| 18 | **Invented numbers and claims to fill a stat scene** | AA-08 | Use a mechanism fact ("0 passwords to share") or cut the beat |
