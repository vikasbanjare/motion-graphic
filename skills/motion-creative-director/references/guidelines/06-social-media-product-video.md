# Specialised Guideline 06: Social Media Product Video

A short, vertical-first video that sells one product inside a feed: a hook on frame 0, one proof the viewer can follow with the sound off, a payoff, and an action. The product can be an app, a SaaS feature or a physical (D2C) product. The length is 6-30 s and the default is 15 s at 9:16.

This guideline applies the Master SaaS Motion Design System (Parts 01-11 in `research/master/`, cited as **P01-P11**) and the eight frame-measured teardowns in `research/videos/` to this one format. Every number is in frames at 30 fps (f) unless stated (1 f = 33.3 ms). "% W" and "% H" are percent of frame width and height. Pixel values are for **1080×1920 (9:16, "@1920p")** unless "@1080p" (1920×1080) is stated.

**Reference key**

| Tag | Reference (file in `research/videos/`) | Runtime / format | Why it matters for social product videos |
|---|---|---|---|
| [V:126cpH] | Chowdeck delivery-app ad (`126cpH-FXL4FxTwRwoJvt9M4FNwBB7peq.md`) | 17.97 s, **9:16**, 95.7 BPM | **The primary reference and the only native vertical one.** Single-transaction story, dialect hook, flat-to-real swaps, card-to-notification morph, ASL 1.63 s. Its flaws (static open, illegible UI, no CTA) are the format's classic mistakes. |
| [V:19NRDv] | Bumper PRO payments launch (`19NRDvazRJFCFcAfehavceGsUMV64qBRv.md`) | 67.2 s, 16:9, 100 BPM | Frame-0 hero-word slam, word-by-word lines on the beat, one accent colour for the benefit word, colour states instead of labels |
| [V:1ccYWJ] | Lottieicon asset-library promo (`1ccYWJ6nQXdqt1UQrpz2mE0ODScG_hU0K.md`) | 44.3 s, 16:9, 112 BPM | Zero-copy icon hook with a zoom-through, snap-hold-suck word cards, urgency triplet before the CTA; the "music ends before the picture" anti-pattern |
| [V:15VhHR] | Wix AI site builder (`15VhHRcisoHSPWY0VA06PzA3u_y-4qJY_.md`) | 53.9 s, 16:9, 112 BPM | Macro-to-micro hook, anchored slot-machine montage, suck-out silence before the decisive click |
| [V:1CSXtQ] | OpenAI × HubSpot connector (`1CSXtQSs2jM0WBQP6LPDVpDgkt8JLdUkw.md`) | 30.0 s, 16:9, ≈86 BPM | Cuts within ±2 f of transients, accelerate-into-cut grammar, micro-interaction timings, hook too small for phones (a flaw) |
| [V:1-6l8S] | kivi voice-AI launch (`1-6l8SV5NXZQotrYoV8KqKV7SJPvtssso.md`) | 77.8 s, 16:9, 127 BPM | Live-typed pain question as hook, exponential punch into a cut, "show the micro-proof before the label" |
| [V:1i2L14] | NOSTRA studio promo (`1i2L14p-cvnLcIl6XY7mUQEiTYZy_OWUA.md`) | 35.1 s, 16:9 | Copy-framework beats, BOOK NOW button press, interaction-caused transitions; over-loud mix (a flaw) |
| [V:1Hcg3X] | Solar-panel explainer (`1Hcg3X8G_q34iS-RqcAQ2pMHpGkIhxu3j.md`) | 35.8 s, 16:9 | Never still for more than 5 f, background colour flips per cut, payoff held too short (a flaw), 24→30 judder |

**Evidence warning.** All 9:16 numbers rest on one reference ([V:126cpH]), measured through a ≈256×470 px crop of a phone filming a monitor, with the ad animated on twos. Platform safe zones come from [N] (platform and standards data). Where the reference and the platform data conflict, platform data wins, because the conflict is physical occlusion by platform UI, not taste (P02 §4.7). Tags: [N] platform/standards data, [P] model-provider docs, [S] Superside text research, [inferred] derived by the master, not measured.

---

## 1. Purpose and audience

**Purpose.** Stop a thumb, then make one product promise believable before the viewer swipes away. The film's job is one claim, one proof and one action, not a feature tour.

- Attention is front-loaded: 47% of a video campaign's value lands in the first 3 s and 74% in the first 10 s (Meta/Nielsen), and mobile feed dwell is about **1.7 s per item** [N] (P01 §2.2). The hook has to work inside that 1.7 s, and the product has to be named by about 3 s.
- Feeds start muted. Type is the narrator: 6 of 8 references have no narrator, and the point must survive with the sound off (P01 CD-U6; P11 G-37).
- Frame 0 is the thumbnail and the scroll-stopper. The first 5 s double as the autoplay preview (P01 H1, H7).

**Audience.**
- **Cold feed viewers** (paid social, Explore, For You). They have no context and give 1.7 s. They need a hook in their own words, then the product in use.
- **Warm followers** (organic posts, Stories). They know the brand. They want the new thing, the offer and where to get it.
- **Re-targeted visitors.** They have seen the site. They need the one proof they missed and a direct CTA (offer, code, deadline).

**The promise.** "This product does X for someone like you, this easily." Every frame either earns attention, proves X, or tells the viewer what to do next. Anything else is cut.

---

## 2. When to choose this format

Choose a Social Media Product Video when **all three** are true:
1. The product has **one** benefit that can be shown (not just stated) in 2-6 s: an app action, a before/after, a product in hand, a number that changes.
2. The audience is reached in a feed (Reels, TikTok, Shorts, Stories, feed ads), usually on an upright phone.
3. The goal is a single action: install, buy, sign up, book, follow, visit.

| Situation | Use this format? | Template (§4) | Better alternative |
|---|---|---|---|
| Consumer app, one transaction (order, pay, book, split) | **Yes, default** | T3 Single-transaction [V:126cpH] | — |
| SaaS / AI feature with a visible input → output | Yes, 15-30 s | T3 or Prompt-in-feed (T4 compressed) [V:1CSXtQ] | Guideline 02 (UI Product Demo) for the 16:9 master |
| Physical D2C product (skincare, gadget, food) | Yes | Feature trio or Before/after | — |
| Launch day announcement of a new product | Yes, 15-20 s cut of the launch film | Launch teaser (PL-10/PL-15) | Guideline 01 (SaaS Launch Film) for the hero film |
| Limited offer, sale, festival campaign | Yes, 6-15 s | Offer slam | — |
| Price or "free?" objection is the barrier | Yes | T12 Objection flip [S:PointCard] | — |
| Platform with many use cases | Only as one use case per video, in a series | T3 per use case | Guideline 01 or 02 for the overview |
| The value is invisible (security, latency, infra) | Rarely | Stat-led | Explainer guideline |
| Brand awareness with no product to show | No | — | Guideline 04 (Premium Brand Motion Film) |
| Long walkthrough or onboarding | No | — | VO explainer (T9) |

---

## 3. Platforms, aspect ratios and length

### 3.1 Formats and safe zones

| Format | Size | Platforms | Text-safe box (strict) | Notes | motion-kit `format` |
|---|---|---|---|---|---|
| **9:16 (master)** | 1080×1920 | Instagram/Facebook Reels, TikTok, YouTube Shorts, Stories, WhatsApp Status | **x 120-840, y 270-1210** (strict union of Reels-ads, TikTok, Shorts) | Reels ads cover top 269 px, bottom 672 px, sides 65 px. Profile grid crops to 3:4 (y 240-1680); Reels in the feed may be cut to 4:5 (y 285-1635) | `reel` |
| 4:5 | 1080×1350 | Instagram and Facebook feed, LinkedIn feed | x 88-992 | Best feed real estate; many viewers start muted | `portrait` |
| 1:1 | 1080×1080 | Feed ads, carousels | x 135-945 (survives the 810 px grid crop) | — | `square` |
| 16:9 | 1920×1080 | X, LinkedIn, YouTube pre-roll, website | x 96-1824, y 54-1026; CTA above y 918 | 16:9 on an upright phone plays at about half size: body text ≥84 px @1080p | `landscape` |

Sources: P02 §4.7, P11 §24.7, P06 §8.12. TikTok's own insets: top 240-254, bottom 660-707, left 120, right 120-242 px (sources conflict) [N]. Shorts: top 241, bottom 381, left 60, right 201 px [N, unverified].

**Zone map for a 9:16 frame (use for every shot):**

| Band (y @1920p) | Use |
|---|---|
| 0-270 | Platform header and account name. No text. Background or bleed only. |
| 270-640 | Upper-third text (setup lines, kickers, wordmark on the end card) |
| 640-1210 | Hero zone: hero word centred at y ≈900-1000, UI cards, status pills, CTA button |
| 1210-1640 | Captions, caption bar, like/comment/share rail and the CTA sticker live here. **Non-text graphics only** (landscape, shadows, the bottom of a product). Chowdeck's status pill at ≈70% H (y ≈1344) sits in this zone and is a flaw [V:126cpH t=11.07-13.6s] (P02 CO-U17). |
| 1640-1920 | Platform caption text and controls. Nothing that matters. |

Right edge: TikTok and Shorts stack buttons at x >840. A hero display word may run to 84% W only if it is ≥8% H and still reads with its last ≈10% covered; body, CTA, URL and captions never cross x 840 (P02 §4.7 resolution).

**9:16 is a re-layout, not a crop.** Cropping 9:16 out of a 1920×1080 master leaves 608 px of width (P02 CO-U18). Stack horizontal pairs vertically, move flank labels above and below the hero, put split screens top/bottom, and keep every duration identical in milliseconds across formats; scale travel as % of the frame (P03 §18.11; P11 EX-U10).

### 3.2 Length

| Runtime | Use | Shots (ASL 1.6-1.7 s) | Plan |
|---|---|---|---|
| 6 s (180 f) | Bumper ad, offer slam, YouTube bumper | 3-4 | Hook 1.5 / proof 1.5-2 / lockup + CTA 2.5-3 (PL-05 stretched) |
| 10 s (300 f) | Story ad, teaser, "coming soon", one micro-demo | 5 | PL-10 |
| **15 s (450 f), default** | Performance ad, app install, feature cutdown | 9 | PL-15 (§4.2) |
| 20-30 s (600-900 f) | Organic Reel/TikTok, creator-style product reel, feature trio | 12-18 | §4.4 |
| 30-60 s | Only for organic educational content; TikTok's stated In-Feed ad sweet spot is 21-34 s [N] | — | Use guideline 02 structures re-laid out for 9:16 |

Platform sweet spots (recommendations, not limits): Reels 15-30 s, Shorts 20-45 s (≤60 s), TikTok 15-35 s, Stories 15 s per card, feed ads 6/15/30 s (P11 §24.7; kit `copy.md`). Check current platform maximums before a launch; they change.

**Frame rate.** Render natively at 30 fps. Never conform 24/25 → 30 by duplicating frames: 3 of 8 references show a judder every 5-6 frames on slides and scrolls [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X] (P10 2D-U18). Generated plates (24 fps) are conformed with optical flow or the whole film is finished at 24.

---

## 4. Story structure with exact beat timings

### 4.1 Pick one template

| ID | Template | Beat map | Use when | Evidence |
|---|---|---|---|---|
| **T3** | **Single-transaction story** (default) | Hook → problem → promise → (range) → UI action → progress → payoff → seamless move → lockup + CTA | Apps and SaaS: one order, one payment, one generation, one booking | [V:126cpH] rule 2 |
| T12 | Objection flip | Objection question ≈3 s → blunt answer → 3 perks → product UI → mirrored Q&A → offer + arrow CTA | Price, trust or "free?" is the barrier | [S:PointCard], beats [inferred] |
| T-BA | Before / after | Pain state (grey, dense) → one action → result state at the same framing → number → CTA | Results products: finance, beauty, fitness, productivity | kit `before-after-transformation`; Bumper's colour states [V:19NRDv t=39.87-45.0s] |
| T-FT | Feature trio (launch reel) | Time/price shock hook → name + promise → 3 tiles → one real number → old vs new → offer → CTA | New product or gadget announcement | kit `product-launch-reel`; [V:1ccYWJ] statement cadence |
| T-OS | Offer slam | Offer on f0 → product in 1 shot → deadline → CTA | Sales, festive campaigns, 6-10 s | P08 PL-05/PL-10 |

Rule: in films of 30 s or less, tell **one use case end to end** (P01 TS3). Chowdeck proves its app with one order in 8.43 s of proof [V:126cpH]; HubSpot does one query → answer in 8.44 s [V:1CSXtQ].

### 4.2 The default: 15 s single-transaction ad (450 f, 9:16)

Windows from P01 §2.3 and P08 PL-15; edit points snapped to a 100 BPM grid (beat 18 f, bar 2.4 s) as in the P09 §16.13.2 15 s sound map.

| # | Stage | In-out (s) | Frames | Dur | % | Must contain | Exit |
|---|---|---|---|---|---|---|---|
| 1 | **Hook** | 0.00-1.50 | 0-45 | 1.50 s | 10% | ≤3-5 words in the audience's idiom, on screen at f0, first change by f3, hero word 12-13% H | Vertical push or hard cut |
| 2 | **Problem** | 1.50-2.40 | 45-72 | 0.90 s | 6% | One visual pain, product already in frame; ≤3 readable words held ≥0.7 s (Chowdeck's 0.45 s is a flaw) | Release into the drop |
| 3 | **Promise / reveal** | 2.40-4.20 | 72-126 | 1.80 s | 12% | Brand name + one-line promise, legible by 2.9 s, still ≥0.7 s. **Drop on this cut.** | Hard cut on a beat |
| 4 | **Proof A: set-up** | 4.20-6.00 | 126-180 | 1.80 s | 12% | The UI or product appears and fills with the user's real case | Card holds into the action |
| 5 | **Proof B: the action** | 6.00-7.47 | 180-224 | 1.47 s | 10% | Tap/click with 10 f dwell; **press at 7.20 s (f216)**; feedback on the press frame | Cut 8 f after the press, or shared-element morph |
| 6 | **Proof C: progress** | 7.47-10.20 | 224-306 | 2.73 s | 18% | Progress drawn; ≤2 statuses, each ≤5 words, each held ≥1.0 s | Hard cut on a beat |
| 7 | **Payoff** | 10.20-12.00 | 306-360 | 1.80 s | 12% | The outcome in ≤4 words, fully still ≥1.0 s | Hard cut or seamless tilt |
| 8 | **CTA** | 12.00-13.20 | 360-396 | 1.20 s | 8% | Verb + offer, ≤4 words, button or arrow | Seamless 30 f tilt or hard cut on the sting |
| 9 | **Lockup** | 13.20-15.00 | 396-450 | 1.80 s | 12% | Logo + handle/CTA; still from 13.5 s (1.5 s) with one tiny ambient element | End on the last frame (no early fade) |

Checks: 9 shots, ASL 1.67 s (Chowdeck 1.63 s), longest shot = the progress proof (P08 DU-R4), heroes at 2.4 s (drop), 7.2 s (press) and 13.2 s (sting). The product is named at 2.4 s, inside the 3 s window [N] and earlier than any 16:9 reference except Bumper (P01 H6).

### 4.3 Short plans

**6 s (180 f): offer slam or bumper**

| # | In-out (s) | Frames | Beat | Content |
|---|---|---|---|---|
| 1 | 0.00-1.50 | 0-45 | Hook | Offer or claim ≤4 words on f0, hero word slammed from 3-4× (E-SNAP, settled by f8-10) [V:19NRDv t=0.00s] |
| 2 | 1.50-3.30 | 45-99 | Proof | One state change: open mid-motion, press at 2.1 s, consequence by 2.3 s, result still 2.3-3.3 s |
| 3 | 3.30-6.00 | 99-180 | Lockup + CTA | Logo in 8-12 f, CTA ≤4 words by 3.7 s, still from 4.2 s (1.8 s); sting on the cut, tail to f180 |

**10 s (300 f): teaser or micro-demo (P08 PL-10)**

| # | In-out (s) | Frames | Beat | Content |
|---|---|---|---|---|
| 1 | 0.0-1.5 | 0-45 | Hook | ≤5 words on f0; new word every ≤0.5 s while building; accelerate into the cut (6-10 f E-EXIT) |
| 2 | 1.5-3.0 | 45-90 | Reveal | Name + first UI or product; name legible by 1.8 s; groove enters on the cut |
| 3 | 3.0-6.0 | 90-180 | Proof | One take: UI settles 12 f, tap travel 15-20 f, dwell 10 f, press ≈4.6 s, consequence 6-8 f later, result readable from ≈5.0 s; slow push 1.00 → 1.06 |
| 4 | 6.0-7.5 | 180-225 | Payoff | Result or number fully still 6.4-7.5 s; expo punch +18% in the last 3-8 f |
| 5 | 7.5-10.0 | 225-300 | Lockup | Logo + verb CTA + handle; dead still 8.2-10.0 s (1.8 s) |

### 4.4 20-30 s organic reel (Feature trio, 24 s = 720 f at 100 BPM)

| # | In-out (s) | Frames | Beat | Content |
|---|---|---|---|---|
| 1 | 0.0-1.8 | 0-54 | Hook | Time or price shock: old value struck through, new value lands by 1.5 s |
| 2 | 1.8-3.6 | 54-108 | Reveal | "Introducing" + name + promise ≤8 words |
| 3 | 3.6-7.2 | 108-216 | Proof 1 | The product doing its main job (UI or product in hand), result held ≥1.0 s |
| 4 | 7.2-9.6 | 216-288 | Features | 3 tiles, 1-3 words each, 4 f stagger |
| 5 | 9.6-13.2 | 288-396 | Proof 2 | Second use or a close-up cut-in on the one value (3-3.5× cut-in) |
| 6 | 13.2-15.6 | 396-468 | Number | One verified number counting up ≈1 s (70% of the range in the first 25% of the time) [V:19NRDv rule 8] |
| 7 | 15.6-18.0 | 468-540 | Old vs new | Two rows each side, same order as spoken |
| 8 | 18.0-19.2 | 540-576 | Urgency | Triplet of 10-12 f punch cards ("So." / "Why wait?" / "Get it.") [V:1ccYWJ rule 14] |
| 9 | 19.2-21.6 | 576-648 | CTA | Offer + verb + where ("Link in bio") |
| 10 | 21.6-24.0 | 648-720 | Lockup | Logo still ≥1.5 s, music resolving on it |

Shorts loop: an end frame that rhymes with the hook (same colour, same motif) replays cleanly (P01 L3; kit `copy.md`).

### 4.5 Energy and music arc (15 s default)

| Time | Energy | Music |
|---|---|---|
| 0.0-2.4 s | Sharp on f0, then curiosity | Sparse kicks or a sub accent on f0; no full groove yet |
| 2.4 s | First peak (reveal) | **Drop on the first product moment, 0-8 f after its cut** (P09 defaults) |
| 2.4-6.7 s | Steady, readable | Groove |
| 6.7-7.2 s | Inhale | Bed dips ≥15 dB for ≈0.5 s |
| 7.2 s | Second peak (the press) | F01 click on the press frame (0 f) |
| 7.6 s | Result | F11 hit ≈4 f after the result appears, groove re-enters |
| 10.2 s | Payoff | Hit on the cut |
| 13.2 s | Third peak (lockup) | F17 sting ±2 f, tail decays to ≤ −60 dB by f450 |

---

## 5. Shot list template

Fill one row per shot before any animation or generation. The columns are P01 §2.13's beat fields plus the format-specific checks.

| Field | What to write | Example |
|---|---|---|
| `id` / stage | Shot number and stage (1-7) | 05 / Proof B |
| `t_in`-`t_out` · frames | Seconds and frames at 30 fps | 6.00-7.47 · f180-224 |
| Duration token | P08 SD-01…SD-20 | SD-12 action → consequence |
| Job | One verb phrase | "Show one tap requests the money" |
| Copy on screen | ≤5 words; accent word marked `*…*` | "Request *₹900*" |
| Safe-zone check | Every string inside x 120-840, y 270-1210 | ✓ button at y 1080 |
| Must-read size | Font px of the smallest must-read string (≥52 px) | 56 px |
| Proof object | Which real UI state or real product photo | Split screen state "₹300 × 3" |
| Actor | Who causes the change (tap, hand, voice, system) | Thumb tap at x 610, y 1080 |
| Entry → exit device | From §9 | Card held → shared-element morph |
| Camera | From §8, with scale/speed numbers | Locked, +4% linear push |
| Object motion | Token + frames | Ripple 8 f; button press −15% in 3 f |
| Continuity anchor | What stays fixed across the cut | Button becomes the status pill |
| World / colour | Background chapter colour; accent meaning | Paper card on marigold; coral = owed |
| Music event | none / hit / drop / dip / sting | Dip 6.7-7.2 s, click at f216 |
| SFX | Family ID (P09 F01-F18) and frame | F01 at f216 |
| Source | Kit scene / custom / generated plate / 3D / photo | Custom scene (tap + morph) |
| Facts to verify | Every number, price, date, claim | "₹1,200 Wi-Fi bill" is illustrative |

---

## 6. Style direction

### 6.1 Visual

Pick one register and keep it for the whole video (P10 §11.5: no style changes mid-film).

| Register | Look | Use for | Evidence |
|---|---|---|---|
| **Playful collage + UI** | Flat colour fields, 2D illustration, real photo cut-outs with soft drop shadows, light UI cards with an offset solid backing card (6% → 3% offset), lowercase extra-bold rounded sans | Consumer apps (delivery, fintech, social), warm SaaS, D2C | ST-G [V:126cpH] |
| **Bold kinetic** | Mid or dark field, one accent for the benefit word, hero words slammed in, word-by-word lines | Gadgets, tools, offers, AI products | [V:19NRDv] [V:1ccYWJ] |
| **Clean premium** | Off-white #F9FAFC field, one accent family, regular-weight sentence-case type, white as the transition room | Premium SaaS, AI features, considered purchases | [V:1-6l8S] [V:1CSXtQ] |
| **Product-in-hand live action + overlay** | Real footage of the product or phone, defocused background, crisp 2D type and UI composited on top | Physical products, apps with a strong in-life moment | [V:126cpH t=1.60-2.53s]; [V:1-6l8S] glass-over-plate |

Rules:
- **One hero per frame.** Every reference keeps one primary subject per shot (P03 "one idea per beat").
- **Three rendering idioms at most** (flat, photo, UI) and never all three competing in one busy frame; Chowdeck's mosaic is where its idioms collide [V:126cpH flaw 6].
- **No grain or lighting model in flat styles**; in clean styles, add 1-2% dither on gradients to stop banding on compressed feeds [V:1ccYWJ rule 16].
- **Promise → proof imagery.** A flat icon promises; the real photo proves. Swap the silhouette for the real object instantly on one frame, same position and angle, then give it a physical reaction (fall/rotate 6-14 f, E-GRAVITY) [V:126cpH rule 4].

### 6.2 Color

- **Palette: 4-6 colours, ≤4 in any frame.** Chowdeck runs 6 brand colours with ≤4 per frame [V:126cpH §Visual Quality]; NOSTRA runs 2 plus near-black [V:1i2L14 rule 1].
- **One anchor brand colour opens and closes the film** (bookends). Chowdeck's teal is the first and last shot [V:126cpH rule 3].
- **Background colour is the chapter marker.** Change it per chapter (≤4 backgrounds per 15-18 s) or flip polarity on ≥75% of hard cuts in bold styles [V:126cpH rule 3] [V:1i2L14 rule 1]. Never put the same flat background on two consecutive scenes unless it is a state change in one set-up [V:1Hcg3X rule 3].
- **One accent = one meaning.** About 10% of the frame, one element per scene (P01 CD-C2). In product videos, give states colours and drop the labels: fail/owed red-coral, success teal/mint [V:19NRDv rule 10].
- **Off-white, not #FFFFFF; near-black, not #000000** for type fields (#F4F5F4 / #161616) [V:1i2L14 rule 1].
- **Contrast:** ≥4.5:1 for text; 3:1 only for large text ≥66 px in 9:16; 7:1 or a ≥60% scrim over footage (P07 RM-05).

### 6.3 Typography

Sizes for 1080×1920. The 9:16 text column is 720 px wide (x 120-840), so statements break into 2-3 short lines and grow in px (P07 §9.2).

| Role | Size @1920p | Weight / case | Max | Placement | Evidence |
|---|---|---|---|---|---|
| Hero word (hook punch, claim word) | 200-240 px font (ascender 12-13% H); words >5 characters drop to 180-200 px to fit 720 px | Extra-bold/black, lowercase or sentence case, tracking −2 to −4% | 1-2 words | Centred at y ≈900-1000 | [V:126cpH §Typography]; P07 T-HERO |
| Setup word over the hero | ≈1/3 of the hero (75-95 px) | Bold | 1-3 words | Directly above the hero; ratio 1:2.5-1:3 | [V:126cpH] "been" / "busy?" |
| Statement | **128 px default** (96-190 px) on 2-3 lines | 500-700, sentence case | 3-6 words | Centre-line y 900-1000 | P07 T-STATEMENT |
| Payoff headline | 135-145 px cap, leading ≈1.0 | Bold grotesk, Title Case allowed | ≤4 words | Left-aligned on a column edge at x ≈13% (≥120 px) or centred | [V:126cpH t=13.60s] |
| Must-read UI text (status, amount, button) | **≥52 px font** (floor 36 px) | 500-700 | ≤5 words | Inside y 270-1210 | P06 UI-L1 |
| CTA label | 56-64 px in a pill 60-67% W | 700 | 1-3 words, ≤16 characters | ≤ y 1210 | P07 T-CTA |
| Captions (VO or creator speech) | 60-75 px (≥52) | 500 | 2 lines × ≤42 characters | y 270-1210, never in the bottom 35% | P07 T-CAPTION |

Rules:
- **≤5 words on screen at once** in 9:16 (Chowdeck's maximum is 5; display moments are 2-3) [V:126cpH §Typography].
- **Hierarchy by contrast of 1:2.5 or more.** Under ≈1:1.4 the levels compete (P07 §9.3).
- **Emphasis by colour or weight on one word per line**, not by underlining everything [V:19NRDv rule 3].
- **Display type may bleed off an edge for ≤0.7 s** in the hook; information never touches an edge (P07 TY-P6).
- **Hindi/Hinglish:** Hinglish in Latin script is fine; Hindi in Devanagari with the right font subset, leading ≥1.25 for headlines, animated by word, never by code point; holds ×1.15 [N, unverified factor] (P11 §24.8).

---

## 6b. Technique classes for this format

Each row cites master IDs; the class of an ID is the master's (U universal, S style-specific, X experimental, A avoid, SaaS). The format column says how this format uses it. Assignments to this format are [inferred] from the guideline's own sections unless an evidence tag is given.

| Class | Techniques for this format (master IDs) |
|---|---|
| Universal | Text on f0 and change by f3 (P01 H1); one transaction end to end; stagger ML-06; kinetic type ML-16; shared-element morph TR-07; polarity flip cuts TR-18 |
| Format-specific | 9:16 re-layout, not crop (P04 §6.5); playful collage / fast startup styles (ST-G) with pops and slams; dialect hooks ≤3 words [V:126cpH]; beat cuts TR-02 [S] |
| Experimental | Animating on twos ML-30 [X] for a hand-made look [V:126cpH]; fly-through hook CM-15 [S / X]; escalating word swap K17 [X] |
| Avoid | Text in the platform UI bands (top 14 %, bottom 35 % on Reels [N]); pop-ons for every element (P03 SP-T, [V:126cpH] avoid); over-limited masters (P09 SD-A2); trending audio under a brand post |
| Especially good for SaaS | Phone-UI tap with a visible consequence (TR-20); anchored-element montage TR-23; a counter that parks on the final value (RV-25) |

## 7. Motion language with numbers

### 7.1 Ease tokens (P03 §19.3)

| Token | Curve | Use in this format |
|---|---|---|
| E-SNAP | cubic-bezier(0.05, 0.7, 0.1, 1): 58% of travel on f1, 90% by f5 | Hook hero word slammed from 3-4×; small pops entering at 1.25-2× |
| E-OUT | cubic-bezier(0.33, 1, 0.68, 1): 90% by f7 | Default entrance: cards, words, tiles, UI rows |
| E-INOUT | cubic-bezier(0.65, 0, 0.35, 1): peak at 50% | Vertical push, pull-outs that start and end on screen |
| E-EXIT | cubic-bezier(0.3, 0, 0.8, 0.15) | Anything that ends on a cut: shrink into the cut, punch |
| E-WHIP | cubic-bezier(0.64, 0, 0.78, 0) | Objects leaving the frame entirely |
| E-GRAVITY | velocity ×1.2 per frame | Falls and "discard" exits, + 10-20° rotation (playful only) |
| E-PUNCH | exponential scale, +18-33% in 3-8 f | The last 3-8 f before a major cut |
| E-LINEAR | constant | Drifts on holds, route/progress draws, counters, colour ramps |

### 7.2 Timing table

| Element | Spec | Evidence |
|---|---|---|
| First visible change | **≤ f3 (100 ms)**, never later than 0.5 s; text on f0 | P01 H1; [V:126cpH] 0.73 s static open is a flaw |
| Hero-word slam | Start 3-4× scale with motion blur; ≈65% of the delta in f1, 85% by f3, settled by f8-10; no overshoot | [V:19NRDv rule 1] |
| Pop (playful) | 0-4 f, step or E-SNAP | [V:126cpH §Motion] |
| Word-by-word line | Words start 7-10 f apart (≈ one eighth note at 90-110 BPM), each in 4-7 f with blur; fast reels 2-3 f | [V:19NRDv rule 2]; [V:1i2L14 rule 5] |
| Snap-hold-suck word card | +40-55% in 6 f (peak velocity f2), hold 6-10 f, −24 to −30% over 8-18 f, cut on the smallest frame | [V:1ccYWJ rule 2] |
| Blur-in claim word | 4 f | [V:126cpH rule 12] |
| Typewriter question | ≈15 characters/s (readable); filler 28-35 cps, key phrase 7-9 cps in close-up | [V:126cpH rule 12]; [V:1CSXtQ rule 1] |
| Payoff headline | Opacity up over ≈15 f per line, 3 f line stagger | [V:126cpH rule 12] |
| Entrance vs exit | Entrances 8-14 f E-OUT, exits 4-6 f E-EXIT (≈2:1) | P03 SP-T0; [V:1-6l8S rule 4] |
| Stagger ladder | Chips/dots 2 f, words 2-3 f, cards 4 f (each pops whole in 1 f), large objects 5-7 f | [V:15VhHR rule 12]; [V:1i2L14 rule 5] |
| Counter | ≈1 s, expo-out, 70% of the range in the first 25%; park a highlight on the final value | [V:19NRDv rule 8] |
| Punch into a cut | +18-33% over 3-8 f, cut on a music onset (±1 f) or into one white frame; ≤4 per 78 s, so ≤1 per 15 s | [V:1-6l8S rule 3] |
| Gravity fall | 6-14 f E-GRAVITY with 70-90° rotation, within ≈0.6 s of a swap | [V:126cpH rule 4] |
| Text drift while being read | ≤0.2% W/f (≤2.2 px/f across 1080 px); typical 1-2 px/f | P07 TC-01 |

### 7.3 Holds and life

- **Never fully static for more than 5 f (167 ms)** except the final lockup: every hold gets a 1.04-1.29× linear push over 0.5-2.5 s, a drift of 0.3-0.5% per frame, or an ambient loop [V:1Hcg3X rule 1] [V:1-6l8S rule 5].
- **Read holds:** each display phrase ≥0.7 s fully still after its reveal; payoff ≥1.0 s; status ≥1.0 s; lockup ≥1.5 s with at most one tiny ambient motion (Chowdeck's wobbling rider) [V:126cpH rule 14].
- **Event density:** about one visual event every 0.7 s, in 2-4 s burst-and-breathe cycles; slow down (≥1.8 s shots) whenever UI must be read [V:126cpH rule 15].

### 7.4 Overshoot and cadence policy

- **Premium and SaaS styles: 0% overshoot** on type and UI; settles are critically damped expo-out [V:19NRDv rule 6]. 6 of 8 references use no UI overshoot (P06 §0.5).
- **Playful styles:** one rotational overshoot of ≈25% of the swing on a tossed card is allowed (15° → ≈−4° → 0° in 16-22 f) [V:126cpH rule 6]. Never bounce text.
- **On twos (12 poses/s)** only for illustration or collage layers as a declared style; UI, scrolls, cursors, type and camera stay on ones. Stepped UI reads as a slow app (P10 2D-U18; [V:126cpH rule 13]).

---

## 8. Camera language

All cameras in this format are virtual 2D or 2.5D unless a 3D hero beat is budgeted (§14.4). Specify speeds in **% of the frame**, never pixels: a pixel speed copied from a 16:9 spec runs ≈1.8× too fast in 9:16 (P05 §7.13).

| Move | Spec | Use | Evidence |
|---|---|---|---|
| Locked + breathing push | 1.04-1.10× linear over the hold | Title cards, hook, payoff (≈40-50% of runtime) | [V:126cpH] locked ≈42% |
| Vertical push (camera "moves up") | 1 FH in ≈11 f, E-INOUT, peak ≈4.2 FH/s (≈14% H/f), ≈10% H directional blur at peak | Chapter change; "forward" | [V:126cpH rule 10] |
| Two-stage pull-out reveal | ECU of one element → whole system, ≈4× in ≈1 s: stage 1 expo-out (≈40% of change in 2 f, 90% in 8 f), ≈0.25 s near-hold, stage 2 E-INOUT over ≈13 f | "One item, now everything" (range, catalogue) | [V:126cpH rule 5] |
| Slow push + pan over a mosaic | ≈1.3× over ≈2.7 s, linear | Range shots | [V:126cpH t=6.53-8.4s] |
| Rotate-to-upright + pan | Plane arrives tilted 10-15°, eases upright over ≈1 s, then pans ≈8% H/s | Maps, feeds, tracking | [V:126cpH rule 9] |
| Tilt / pedestal through a layer | ≈1.6 FH in 30 f, S-curve, peak ≈11% H/f, +10 f settle; a horizontal layer (clouds, horizon, UI edge) is the wipe | Into the lockup | [V:126cpH rule 11] |
| Rack focus (fake DOF) | Background blur ↔ sharp over 8-12 f | Live action → graphic; scene swaps behind a held card | [V:126cpH t=1.60-1.83s, 11.07-11.43s] |
| Cut-in (instead of a zoom) | 3-3.5× scale, hard cut, value held ≥1.0 s | The one number or control that must be read | [V:15VhHR rule 13] |
| Zoom-through (hook exit) | 3 f ease-in, then ×1.3-1.4 per frame for 8-10 f; sub boom on the fill frame | Zero-copy icon hooks | [V:1ccYWJ rule 1] |
| Expo punch into a cut | +18-33% in 3-8 f | The cut before the reveal or the logo | [V:1-6l8S rule 3] |

Rules:
- **Vertical and scale moves first.** The phone's scroll habit is vertical; Chowdeck uses no lateral truck (P04 §6.5). Keep one direction grammar: up = forward, horizontal = context (P06 UI-SC8).
- **Every move ends with its readable content inside x 120-840, y 270-1210** (P04 §6.5).
- **Peak speed ≤8-10% W/f without blur;** add 180° motion blur above ≈5% W/f [V:1ccYWJ rule 11].
- **A proof shot longer than 3 s needs an in-shot camera beat every 0.8-1.5 s** [V:19NRDv rule 12].

---

## 9. Transitions

Density target: ≈1 transition per 1.8 s plus in-shot events, i.e. one visual event every ≈0.7 s [V:126cpH §Transitions]. Use 3-5 transition types per film; never one per cut.

| Transition | Spec | Use | Evidence |
|---|---|---|---|
| **Hard cut on motion** | Accelerate into the cut (last 6-10 f E-EXIT: shrink −10-20% or push +10%), decelerate out (first 6-20 f E-OUT) | The default | [V:1CSXtQ rule 3] |
| **Vertical push** | 11 f, E-INOUT, ≈10% H blur on both layers | Hook → problem, chapter changes | [V:126cpH rule 10] |
| **Shared-element morph** | Drop the card's offset backing, collapse it toward its bottom edge and narrow into the target pill over ≈7 f; rack-focus the background over 11-12 f; the anchor never leaves the screen | Button → notification, card → toast, order → tracking | [V:126cpH rule 8] |
| **Shape-matched swap** | Same silhouette, position and angle; swap in 0 f on one frame; physical reaction within ≈0.6 s | Flat icon → real product; old UI → new UI | [V:126cpH rule 4] |
| **Match-on-action across a cut** | The falling object re-enters falling from the top in the next shot within 3-7 f | Linking two worlds | [V:126cpH t=9.27-9.50s] |
| **Colour-matte reveal into live action** | Subject held as a flat silhouette in the type colour while the background sharpens (8 f), then the matte drops in 1 f | Graphic → footage without a style shock | [V:126cpH t=1.57-1.87s] |
| **Seamless tilt into the lockup** | 30 f S-curve + 10 f settle; the logo fades in over the last 8 f while riding up ≈23% H | Ending | [V:126cpH rule 11] |
| **Interaction-caused cut** | The tap or click is the edit point; cut 3-8 f after the press | Every proof | [V:1i2L14 rule 15]; P06 UI-C6 |
| **Snap-hold-suck** | Cut on the smallest frame of the suck-in | Kinetic word cards | [V:1ccYWJ rule 2] |
| **Cut on the empty plate** | Subject fully leaves; 0-1 clean frame; next shot continues the screen direction | Explainer-style product shots | [V:1Hcg3X rule 2] |
| **Light bloom / white frame** | 4-7 f bloom, or 1 white frame after a punch | Into the logo or a hero reveal | [V:1-6l8S rule 9] |

Rules:
- **Hide swaps in motion** (inside a twist, burst, push or scatter), never on a static frame [V:1i2L14 rule 17].
- **At least 2 transitions per film are visibly triggered by something** (a tap, a hand, a drop) [V:1i2L14 rule 15].
- **Anchored elements sit in the strict text area** so platform UI never covers the constant that carries the cut (P05 §7.13).
- **Below an ASL of ≈0.8 s, anchor one element** at identical coordinates across the burst and change only the context [V:15VhHR rule 6].
- **Never ask a video model to invent a transition between two different scenes.** Use a designed cut or a composited morph (P11 AA-G6).

---

## 10. UI treatment

For apps and SaaS products. Physical products follow §6.1's promise → proof rule instead.

### 10.1 Layout (P06 §8.12)

| Item | Rule |
|---|---|
| Hero card | ≈75% W (810 px, x 135-945), centred at y ≈960; text-bearing rows inside x 120-840 |
| Device frame | Optional for mobile apps (it says "this is the app"); otherwise frameless rounded cards on flat colour [V:126cpH] |
| Status pills, toasts, notifications | Above y 1210 (≤63% H). Never in the caption zone |
| Must-read text | Font ≥52 px; if the real UI is smaller, **rebuild the screen larger** or cut in 3-3.5×, never shrink the meaning to texture |
| Texture text | Anything <36 px is texture: it must still be real content (no lorem ipsum, no duplicate rows) |

### 10.2 Interaction grammar

| Beat | Spec | Evidence |
|---|---|---|
| Actor | **A thumb tap (finger-sized ripple or press state) for mobile UI.** A desktop arrow on a phone UI is a fidelity error. Use an arrow only for desktop/web products | P06 §8.12 [inferred] |
| Approach | 8 f ease-out travel (fast) or 15-25 f decelerating (calm) | [V:126cpH rule 7]; [V:1i2L14 rule 13] |
| Dwell | **10 f** on the target before the press (0.6-1.0 s total anticipation with the travel) | [V:126cpH rule 7]; P06 §8.4 |
| Press | Feedback **on the target on the press frame (≤1 f)**: colour change, or −15 to −20% scale in 3 f, release in 6 f, no overshoot | [V:1i2L14 rule 13]; P06 UI-C6 |
| Consequence | 3-8 f after the press (max 15 f); cut ≈8 f after the press when the result is a new screen | P06 UI-C6; [V:15VhHR rule 8] |
| Content population | Hold an empty card ≈8-9 f, then cascade in reading order: 3-4 f stagger, 4-6 f fades (≈20 f total) | [V:1-6l8S rule 7] |
| Micro-interactions | Toggle 1-3 f, dropdown 6 f, row stagger 2 f, label swap 1 f | [V:1CSXtQ rule 7] |
| Status cycling | One container; text-only swap (fade-out, 1-3 f blank, fade-in, 5-7 f total); each status ≤5 words, held ≥1.0 s; the progress line reaches its end ≈0.35 s before the final status | [V:126cpH rule 9] |
| Feature first, label second | Show the micro-proof (≈5 f highlight) before any card names the feature | [V:1-6l8S rule 12] |

### 10.3 Believability

- Every state change has a visible actor within the previous 30 f (P06 §8.18).
- States follow the real product flow in the real order (order → confirm → preparing → ready → on the way → delivered) [V:126cpH §UI].
- Real-looking data that is consistent across shots: the same amounts, names and avatars wherever they reappear.
- The UI is a deterministic layer (rebuilt in the engine, or a ≥2× screenshot). It is never generated by a video model (P11 AA-G9).

---

## 11. Sound and music

### 11.1 Music

| Parameter | Value | Evidence |
|---|---|---|
| Tempo | **100 BPM default** (beat 18 f, eighth 9 f, bar 2.4 s); range 95-112 for playful/consumer and UI demos; 85-100 for calm premium | P09 SD-T1, SD-T3; [V:126cpH] 95.7 |
| Genre | Groove-forward, warm-digital; regional where the audience is (Afrobeats/amapiano for Lagos, Indian pop/indie percussion for India) | P09 §16.2.2 |
| Arrangement | Sparse intro (kicks on 0 and beat 2) → drop on the first product moment → dip before the press → re-entry → sting on the lockup | P09 §16.13.2 |
| Edit mode | **Narrative, section-synced**: sync section turns, the press and the sting; let other cuts fall where the story needs them (Chowdeck: 0 of 5 hard cuts on onsets, click at 0 f) | [V:126cpH §Editing Rhythm] |
| Picture vs beat | When cutting to the grid, picture leads by 0-2 f, never late | P09 defaults |
| Lyrics | **No sung lyrics under on-screen copy** | P09 SD-MU4 |
| Low end | Add 100-300 Hz harmonics to kicks and booms so they survive a phone speaker | P09 SD-MU5 |
| Licence | Licensed tracks only. Business/brand accounts cannot use the platforms' trending library sounds on ads (TikTok: commercial music library only) | P11 §24.7 [N]; kit `craft.md` |
| Ending | Music runs to the last frame; never ends before the picture | P01 L1; [V:1ccYWJ] flaw |

### 11.2 SFX map (P09 §16.7 families)

| Moment | Family | Placement | Level | Budget per 15 s |
|---|---|---|---|---|
| Hook accent | F12 sub hit (with a 100-300 Hz layer) or a kick | f0, or the frame the hero word lands | Peaks −3 to −9 dB | 1 |
| Hero-word pop / UI tiles | F05 settle tick | First moving frame of each pop | 6-10 dB under F01 | 1 sequence |
| Typing | F02 keystrokes | Each burst, only in a quiet section | 20-25 dB under the full music level | 0-1 passage |
| Tap / click | **F01 UI click** | **Press frame, 0 f**, inside a ≥15 dB dip of 0.3-0.5 s | ≈ bed level when the bed is down | 1-2 |
| Toggle / switch | F03 | Press frame, optional tick on settle 1-3 f later | As F01 | 0-1 |
| Notification / success | F04 soft chime (3-6 kHz) | First full-opacity frame of the toast or "paid" state | Blended, +0-4 dB in its band | 1-2 |
| Counter | F06 tick texture (≤15 ticks/s) + lock accent | While running; accent on the final value | Low | 0-1 |
| Gravity fall / tossed card | F15 Foley thud or flip | Contact frame | Bed level | 0-3 (playful only) |
| Big move | **F07 whoosh** | Peak velocity frame | +3 to +6 dB above 4 kHz | **0-1 (0-2 per film)** |
| Result lands | F11 full-band hit | ≈4 f after the result appears, after a 70-350 ms gap | +8 to +15 dB over the bed | 1-2 |
| Lockup | **F17 sting** | ±2 f of the lockup's first full frame; 1.2-2.2 s tail | Loudest sustained moment | 1 |
| Under every "silence" | F16 ambient floor | Continuous | −40 to −45 dB | always |

Rules: sound 15-65% of transitions, never all (P09 defaults); whooshes sit on peak velocity, not on the start or landing [V:1ccYWJ rule 10]; one loudest moment per film.

### 11.3 Mix and delivery

- **−14 LUFS integrated ±1, true peak ≤ −1 dBTP**, LRA 5-10 LU for Reels, TikTok and Shorts (community norm) and YouTube, X, LinkedIn (P09 §16.11.1). The two loudest references (kivi −10.7, NOSTRA −7.9 with +1.6 dBTP clipping) are flagged flaws [V:1-6l8S] [V:1i2L14].
- With a creator VO or narration: music ducked 10-12 dB (attack 30-80 ms, release 250-700 ms); on-screen words appear 0-2 f before they are spoken, never after (P09 §16.10).
- Generated audio from video models is muted and discarded (P11 AA-G10).

---

## 12. Copy rules

### 12.1 Budget

| Beat | Words on screen | Hold | Evidence |
|---|---|---|---|
| Hook | ≤5 in 9:16 and spots ≤15 s, ≤7 in longer 16:9/4:5/1:1 cuts; median 4; dialect hooks ≤3 | 1.2-2.4 s for the whole hook | P01 H2; [V:126cpH rule 1] |
| Problem | ≤3 readable words | ≥0.7 s still | [V:126cpH] flaw at 0.45 s |
| Promise | ≤6 words, one line of idea | ≥0.7 s still after landing | [V:126cpH t=3.07-3.90s] |
| UI status | ≤5 words each | ≥1.0 s each | [V:126cpH rule 9] |
| Payoff | ≤4-6 words | ≥1.0 s still | P01 §2.12 |
| Punch card (urgency triplet) | 1-2 words | 10-12 f, only inside a climax run | [V:1ccYWJ t=38.0-39.07s] |
| CTA | Verb + offer/destination, 1-5 words; button label ≤16 characters | 1.0-2.6 s | P01 L4; P08 SD-19 |
| Whole 15 s video | ≈20-30 words total | — | [V:126cpH] uses ≈25 |

For lines that are not built progressively, or for second-language audiences: hold = max(1.0 s, 0.33 s × words + 0.4 s, characters ÷ 17), ×1.15 for Hindi/Hinglish [N] (P01 §2.12).

### 12.2 Hook rules and examples

- Text and motion on f0; the first change by f3 (P01 H1).
- The hook already shows the product mechanic: typing for a writing tool, a notification for an alerts app, a struck-out price for a cheaper product (P01 H4).
- One idea; name the viewer's situation in their own words. A dialect question targets by language in 3 words ("You don chow?") [V:126cpH].
- Hook cap ≥5.8% H in 16:9; in 9:16 the hero word is 200-240 px (P07 TY-A13).

| Hook type | Example (English) | Example (Hinglish) | Evidence |
|---|---|---|---|
| Pain question | "Still splitting bills on WhatsApp?" | "Abhi bhi hisaab WhatsApp pe?" | [V:1-6l8S t=0.10s] "Still typing?" |
| Dialect / in-group question | "Who paid for the Wi-Fi?" | "Wi-Fi ka paisa kisne diya?" | [V:126cpH t=0.73s] |
| Time or price shock (strike) | "~~2 hours~~ → 10 seconds" | "~~₹50,000~~ → ek prompt" | kit `hook` with `strike` |
| Promise slam | "Take payments like a PRO" | "Payment lo, tension nahi" | [V:19NRDv t=0.00s] |
| Objection flip | "Free? Nope." / "Free? Yes. Really." | "Free? Haan, sach mein." | [S:PointCard] |
| Zero-copy icon | A bell, a receipt, a parcel moving on f1 | same | [V:1ccYWJ t=0.03s] |
| Common mistake | "You're doing receipts the hard way." | "Receipts aise mat sambhalo." | kit `craft.md` |

### 12.3 CTA rules and examples

- Verb + destination, chosen by funnel stage (P01 L4). Readable: cap ≥5% H in 16:9 (≥54 px @1080p); in 9:16 the action line is ≥96 px font and a pill label ≥56 px; URL/handle ≥3.5% H equivalent (P01 L5).
- One CTA. Repeat the brand name or hook motif on the lockup (P01 L3).
- Only real offers, codes and deadlines.

| Funnel / goal | CTA examples |
|---|---|
| App install | "Get Kharcha free" · "Download free" · "Split your first bill" |
| Performance (offer) | "20% off · code SPLIT20" + "Shop now →" · "Book a demo" |
| Organic follow | "Follow for part 2" · "Save this for later" |
| Launch | "Try [Product] →" · "Available now · link in bio" |
| Local business / event | "Book a visit" · "Reserve your seat" |

---

## 12b. Typography

One place for this format's type decisions; sizes are P07 §9.2 tokens (font px at 1920×1080 / 1080×1920), entrances and exits follow P03 SP-T0, word budgets and holds follow P01 H2 and P07 §9.11.

| Item | This format |
|---|---|
| Families and weights | One sans; 500-600 launch, 800-900 playful consumer, 400 calm premium; Hinglish in Latin script, Hindi in Devanagari with the right subset (P07 §9.19) |
| Size tokens | 9:16 first: T-HERO 240 px, T-STATEMENT 128 px, T-SUPER 72-106 px, T-CAPTION 60-75 px (≥52), T-UI-READ ≥52 px; 16:9 and 4:5 cut-downs re-laid out to the P07 ladder |
| Reveals | RV-07 slam (hook), RV-02 pop-on (one hook only), RV-08 scale pop, RV-26 ride-in on transition momentum, RV-10 diegetic typing |
| Exits | EX-01 leave with the cut, EX-04 shrink into the cut, EX-03 whip |
| Word budget | Hook ≤5 words in 9:16 and spots ≤15 s (≤7 in longer 16:9/4:5/1:1 cuts; dialect ≤3); captions 2 lines × ≤42 characters; cards ≤6 words |
| Holds | Punch word 10-15 f; kinetic line of ≤3 words ≥10-14 f landed; statement of 4-6 words ≥0.8 s landed; payoff, result or status ≥1.0 s still; no text event under 25 f except SD-03 punch cards in a run (P07 §9.11.2, P08 §17.8 #3-4); lockup ≥1.5 s still (2.2 s premium) |
| Floors | Must-read text inside the safe area (16:9 x 96-1824, y 54-1026; 9:16 x 120-840, y 270-1210); 9:16 body font ≥52 px; contrast ≥4.5:1 (3:1 large), ≥7:1 or a ≥60 % scrim over footage (P07 §9.21, P11 G-27, G-37) |

## 13. Worked example storyboard: "Kharcha", 15 s, 9:16

**Fictional product.** Kharcha is a shared-expense app for flatmates in India: add a bill, it splits automatically, one tap sends UPI requests, and it tracks who has paid. All names, amounts and figures below are illustrative.

**Direction card.** Template T3 single-transaction · register: playful collage + UI · 1080×1920, 30 fps, 450 f · 100 BPM groove (Indian indie-pop percussion, no lyrics) · type-led, sound-off safe · English with a Hinglish variant (§13.3).

**Palette (≤4 per frame).** Marigold #FFC93C (anchor, bookends) · Ink #16130F (type) · Paper #FFF7E8 (UI cards) · Coral #FF5E5B (owed / pending) · Mint #2BB673 (paid / settled) · Sky #8EC9FF (chat chapter). Colour semantics: coral = money owed, mint = settled. Never swap them.

**Type.** One extra-bold rounded geometric sans, lowercase for display, sentence case in UI. Hero word 220 px, setup 80 px, statement 128 px, UI must-read 56 px, CTA 60 px in a pill.

### 13.1 Storyboard

| Scene | Timestamp (frames) | Duration | Visual | UI / product action | Camera | Object motion | Text (on screen) | Transition out | Lighting | Sound | Music | Motion notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **1 Hook** | 0.00-1.50 (f0-45) | 1.50 s | Marigold field. A small chat bubble (Paper, 520 px wide) at y ≈560 reading "₹1,200 Wi-Fi bill 🧾"; hero question centred at y ≈960 | None (sets up the transaction) | Locked, linear push 1.00 → 1.05 over 45 f | Bubble is on screen at f0 with a 2 f tail settle; "who" slams from 3× at f2 (E-SNAP, settled f10); "paid?" slams at f9 (settled f17); question mark rotates 0 → 8° → 0 over 6 f at f20 | Setup "₹1,200 Wi-Fi bill" (80 px) · hero "who *paid?*" (220 px, "paid?" in Coral) | **Vertical push up** f41-52: 11 f E-INOUT, ≈10% H directional blur | Flat, no lighting model; soft 0-alpha shadow under the bubble only | F12 sub accent on f2 (with 150-250 Hz layer); F05 tick on f9 | Sparse kick on f0 and f18 | Text on f0, first change by f2. Hero is 9 characters: 220 px fits the 720 px column. No overshoot on type. |
| **2 Problem** | 1.50-2.40 (f45-72) | 0.90 s | Sky field. A flat-group chat stack, card 810 px wide centred at y ≈900: three reply bubbles from three avatars | Real chat states: three replies appear | Locked (arrives via the push), +2% drift | Bubbles pop in at f47, f49, f51 (2 f stagger, each 1.25× → 1.0 in 4 f E-SNAP); last bubble wobbles ±3° once | "not me 🙃" · "i paid in may" · "who has gpay?" (56 px each) | **Hard cut on f72** after a 4 f E-EXIT shrink of the stack (−8%) | Flat | Three F05 ticks at f47/49/51, −8 dB | Kicks continue; 100 ms near-silence f69-72 | The readable line "not me 🙃" is still from f51 to f69 = 18 f; it reads as a pattern, not as text that must be read. Product is not yet named: the pain is the chat chaos. |
| **3 Promise / reveal** | 2.40-4.20 (f72-126) | 1.80 s | Marigold field again (bookend colour). App icon (Coral rounded square, 260 px) centred at y ≈760; wordmark "kharcha" below at y ≈1000; promise line at y ≈1140 | Brand reveal | Locked; linear push 1.00 → 1.06 over 54 f | Icon lands on f72 at 2× and settles in 8 f (E-SNAP); wordmark letters type in at a 2 f stagger (f76-90); promise line blurs in over 4 f at f88; at f104 a 6-ray mint starburst fires *behind* the icon (4 f out, 8 f rotate, 3 f thin-out, gone by f119) | "kharcha" (wordmark 150 px) · "split it in *one tap*." (96 px, "one tap" in Mint) | **Hard cut on f126** (beat 7); last 6 f E-EXIT push +8% | Flat; a soft mint radial glow (≈8% H falloff) under the icon from f104-f119 | F11 hit on f72; F05 pop on f104 | **Drop on f72** (2.4 s, first product moment) | Fixes Chowdeck's flaw: the burst sits behind the icon and never covers the claim line. Promise fully still f92-120 (0.93 s). |
| **4 Proof A: add the bill** | 4.20-6.00 (f126-180) | 1.80 s | Paper UI card ("Add expense"), 810 px wide, centred at y ≈940, on Marigold with a 5% Ink offset backing card | Amount field types "₹1,200"; four avatars below auto-fill "₹300 each" | Locked, +3% linear push | Card enters tossed at 15° → 1.5° in 3 f, overshoots to −4°, settles to 0° by f146 (20 f); empty card held 8 f (f146-154); amount types at 12 cps f154-170; avatar row cascades f164-176 (4 f stagger, 5 f fades); "₹300 each" chip pops in Coral at f176 | "Wi-Fi · *₹1,200*" (64 px) · "₹300 each" chip (56 px) · avatars labelled "you · rohan · aisha · kabir" (40 px, texture) | Card holds through the cut (same position) into scene 5 | Flat; 1 px Ink rim on the card | F15 card-landing flip on f129; F02 keystrokes f154-170 at −22 dB; F05 tick on f176 | Groove | The only overshoot in the film (playful register). All must-read strings ≥52 px; avatar names are texture. Card rows inside x 135-945. |
| **5 Proof B: one tap** | 6.00-7.47 (f180-224) | 1.47 s | Same card, now showing the button "Request ₹900" (Coral pill, 600 px × 120 px, label 60 px) at y ≈1120 | Thumb tap on "Request ₹900"; button darkens on the press frame; three request chips fly to the avatars | Locked; 3-3.5× cut-in is **not** needed (button is already 60 px) | Thumb (photo cut-out, soft shadow) rises from the bottom edge f186-200 (14 f E-OUT) to the button; dwells f200-216 (16 f, ≈10 f dwell + settle); **press on f216**: button −15% in 3 f, colour Coral → darker Coral on f216, release in 6 f, no overshoot; 3 chips fly to the avatars f219-224 (2 f stagger) | "Request *₹900*" (60 px) | **Shared-element morph** f224-231: the button collapses toward its bottom edge and narrows into a status pill (≈7 f); background rack-focuses 11 f | Flat | Bed dips ≥15 dB from f201; **F01 click on f216 (0 f)** | 0.5 s dip f201-216 | Thumb, not a desktop arrow: this is a mobile app. Feedback on the press frame, consequence 3 f later (chips). |
| **6 Proof C: getting paid** | 7.47-10.20 (f224-306) | 2.73 s | Paper status pill (720 px wide) at y ≈760; below it three avatar rows with UPI ticks; a progress bar ₹0 → ₹900 at y ≈1100 | Requests resolve: two pay, then the third | Background plate tilted 10° eases upright over 30 f (f228-258), then pans up 8% H/s; scale change ≤2% | Pill text: status 1 fades in at f231; progress bar draws leg by leg (E-LINEAR within legs, easing into each payment): ₹0 → ₹600 f236-266, pause 5 f, ₹600 → ₹900 f271-296 (reaches the end f296, 10 f before the cut); avatar rows flip Coral → Mint on each payment (0 f state snap, f262, f266, f296); status swap at f264 (2 f out, 2 f blank, 2 f in) | Status 1 "2 of 3 paid" (56 px, f231-264 = 1.1 s) · status 2 "all 3 paid ✓" (56 px, f270-306 = 1.2 s) · progress "₹900 / ₹900" (52 px) | **Hard cut on f306** (beat 17) | Flat; mint glow (≈6% H) on each flip, fading over 8 f | **F11 hit on f228** (≈4 f after the pill resolves); F04 chime on f262 and f296 | Groove re-enters at f228 | Discrete states snap in 0 f; continuous values ease (P11; [V:1Hcg3X rule 15]). Both statuses held ≥1.0 s (fixes Chowdeck's 2 f final status). Pill and bar sit above y 1210. |
| **7 Payoff** | 10.20-12.00 (f306-360) | 1.80 s | Mint field (the "settled" colour). Illustrated flat-share sofa scene in the lower band (y 1210-1640, non-text); headline left-aligned at x 130, y 520-860 | Outcome | Locked, +4% linear push | "all" fades up over 15 f from f306; "settled." follows +3 f (f309-324); a Paper receipt cut-out drops into the scene at f318 and lands at f330 (12 f E-GRAVITY, 70° rotation, F15 thud) | "all *settled.*" (2 lines, 150 px cap, leading 1.0, Ink on Mint; "settled." in Paper) | **Hard cut on f360** (beat 20) after an E-PUNCH +20% in the last 6 f | Flat | F11 hit on f306; F15 thud on f330 | Groove, brightest section | Headline fully still f324-354 (1.0 s). The illustration lives below the text band. |
| **8 CTA** | 12.00-13.20 (f360-396) | 1.20 s | Marigold field. Coral pill CTA (680 px × 128 px) at y ≈1060; offer line above at y ≈820 | None | Locked | Offer line snaps from 1.25× in 4 f at f360; pill grows from 0.8× in 8 f (E-OUT) at f366; label settles f374 | "split your first bill free" (96 px, 2 lines) · pill "Get Kharcha" (60 px, 11 characters) | **Seamless tilt down** f390-420: 30 f S-curve through a Paper "receipt edge" layer that wipes the frame | Flat | none | Pad lift; 100 ms gap f393-396 | CTA fully still f374-390 (0.53 s) and repeated on the lockup, so total CTA exposure is 2.1 s. |
| **9 Lockup** | 13.20-15.00 (f396-450) | 1.80 s | Marigold field (bookend). App icon 200 px + "kharcha" wordmark 640 px wide centred at y ≈840; handle "@kharcha.app" and "Get it free on Android & iOS" at y ≈1120 | None | Settle tail of the tilt to f405, then locked | Wordmark fades 30% → 100% over the last 8 f of the tilt (f396-404) while riding up ≈20% H; handle line fades in f402-408; then still; the "₹" glyph in the icon blinks once at f430 (2 f), the only ambient motion | "kharcha" · "split bills, not friendships." (64 px) · "@kharcha.app" (52 px) | End on f450; no fade before the sting tail ends | Flat | **F17 sting on f396**, tail decays to ≤ −60 dB by f450 | Music resolves on the logo, runs to the last frame | Logo still f408-450 (1.4 s) + the one blink; the tilt closes the marigold bookend opened in scene 1. |

### 13.2 Checks on the storyboard

- 9 scenes, 15.00 s, ASL 1.67 s; longest = the progress proof (2.73 s).
- Text on f0, first change f2; product named at 2.4 s; product UI on screen 4.2-10.2 s (40% of runtime).
- Press at f216 inside a 0.5 s dip; result hit 4 f after the pill resolves; sting at f396. Section turns on beats 4, 7, 10, 12, 17, 20, 22.
- Must-read strings 52-60 px minimum, all inside x 120-840, y 270-1210; the lower band holds only illustration.
- Two interaction-caused transitions (tap → morph, receipt drop); one whoosh at most (none used); one overshoot (scene 4 only).
- Facts to verify before release: every amount, the "free" claim, the store availability line.

### 13.3 Hinglish variant (same timings)

| Scene | English | Hinglish |
|---|---|---|
| 1 | "₹1,200 Wi-Fi bill" / "who *paid?*" | "₹1,200 Wi-Fi bill" / "kisne *diya?*" |
| 2 | "not me 🙃" · "i paid in may" · "who has gpay?" | "maine nahi 🙃" · "may mein maine diya" · "gpay kiske paas hai?" |
| 3 | "split it in *one tap*." | "*ek tap* mein split." |
| 6 | "2 of 3 paid" → "all 3 paid ✓" | "3 mein se 2 ne diya" → "sabne de diya ✓" |
| 7 | "all *settled.*" | "hisaab *clear.*" |
| 8 | "split your first bill free" / "Get Kharcha" | "pehla bill free mein split karo" / "Kharcha lo" |

Hinglish lines run longer: re-check the 720 px column (scene 6 status 1 at 56 px is ≈620 px wide) and add ×1.15 to read holds where a line is not progressively built (take the time from scene 4).

---

## 14. Building it: motion-kit versus generative video versus 3D

### 14.1 What motion-kit can build directly

Scene types: hook, kinetic, orb, title, stat, list, compare, bars, grid, quote, prompt, chat, wave, image, clip, cta, logo. Themes: midnight, clean, neon, editorial, pop, desi, corporate, mono, studio, studio-dark. Formats: reel, portrait, square, landscape.

| Beat in this format | motion-kit scene | Notes |
|---|---|---|
| Hook (setup + punch, price/time shock) | `hook` (`setup`, `strike`, `punch`) | Punch lands with an impact SFX; ≤6 words |
| Hook (kinetic, word-by-word) | `kinetic` (`lines`, 1-5 words each) | For "Still X?" / "Y." / "*Z.*" sequences and the urgency triplet |
| Problem (chat chaos, DM, review) | `chat` (`label`, `prompt`, `reply`) | Typed at ≈30 cps; keep the prompt ≤60 characters |
| Promise / reveal | `title` (`kicker`, `headline`, `sub`) or `orb` for calm AI launches | One accent mark per scene |
| App action (input → button → result) | `prompt` (`label`, `prompt`, `button`, `result`) | Card, typing, cursor glide, click, "Generating…" shimmer, result |
| Feature trio | `grid` (2-6 tiles, emoji icon + 1-3-word label) | Use real feature names only |
| One number | `stat` (`value`, `label`, `kicker`) | Count-up + meter; verified numbers only |
| Old way vs new way | `compare` | Rows in the same order as `say` |
| Status / checklist payoff | `list` with `style: "checks"` | Stands in for the status cycle |
| Product photo, screenshot | `image` (`fit: "contain"` for UI, `"cover"` for product shots; `move: "in"`) | Supply ≥2× delivery width |
| Real footage, generated plate | `clip` (`area`, `scrim`, `generated: true` for AI footage) | The kit overlays the words; set `area` so text avoids the subject |
| Review | `quote` | Real reviews with permission only |
| CTA | `cta` with `style: "button"` (performance) or `"link"` (launch) | `action` ≤16 characters reads best |
| Sign-off | `logo` (`name`, `tagline`, `src`) | Silent by default, after the CTA |

**Video settings for this format:** `format: "reel"` (plus `portrait`/`square` cutdowns by changing only the format); `pace: "fast"` for offers and creator reels, `"normal"` for app demos; `transition: "push"` (vertical) or `"cut"`; `motion: "snappy"` for bold styles, `"smooth"` for SaaS; `bouncy` only for playful consumer brands and never on UI. Theme by vibe: `pop` (D2C, food, playful apps), `neon` (tech, gadgets, AI), `desi` (festive India, local business), `midnight` (creator, bold claims), `clean` / `studio` (premium SaaS), `corporate` (B2B), `editorial` (fashion, food, real estate). Start from recipes `product-launch-reel`, `app-demo`, `before-after-transformation`, `local-offer-festive` or `testimonial-proof`. Workflow: `npm run new -- kharcha --recipe app-demo --format reel --theme pop` → edit the spec → `npm run brand -- public/brand/kharcha.png --spec specs/kharcha.json` → `npm run music -- specs/kharcha.json --track music/groove-100bpm.mp3` → `npm run check` → `npm run preview` → `npm run qa` → `npm run make`.

**Kit approximation of the Kharcha storyboard** (fields from `skills/motion-director/references/scenes.md`; it reproduces the beats and copy, not the custom motion in §14.2):

```json
{
  "format": "reel",
  "theme": "pop",
  "motion": "snappy",
  "pace": "fast",
  "transition": "push",
  "brand": { "name": "Kharcha", "accent": "#FF5E5B", "accent2": "#2BB673", "logo": "brand/kharcha.png", "handle": "@kharcha.app" },
  "audio": { "sfx": true, "music": "music/groove-100bpm.mp3" },
  "scenes": [
    { "type": "hook", "setup": "₹1,200 Wi-Fi bill", "punch": "who *paid?*", "duration": 1.5 },
    { "type": "chat", "label": "Flat 4B", "prompt": "who paid the wifi??", "reply": "not me 🙃", "duration": 1.3, "sfx": false },
    { "type": "title", "kicker": "kharcha", "headline": "split it in *one tap*.", "duration": 1.8 },
    { "type": "prompt", "label": "Add expense", "prompt": "Wi-Fi · ₹1,200 · split 4 ways", "button": "Request ₹900", "result": "*₹300* each · 3 requests sent", "duration": 3.4 },
    { "type": "list", "items": ["Rohan paid", "Aisha paid", "Kabir paid"], "style": "checks", "duration": 2.0, "sfx": false },
    { "type": "kinetic", "lines": ["all", "*settled.*"], "duration": 1.6 },
    { "type": "cta", "kicker": "Split your first bill free", "action": "Get Kharcha", "sub": "Android & iOS", "style": "button", "handle": "@kharcha.app", "duration": 1.6 },
    { "type": "logo", "name": "Kharcha", "tagline": "split bills, not friendships.", "duration": 1.8 }
  ]
}
```

(15.0 s before transition overlaps; in a `TransitionSeries` the film is the sum of scenes minus the overlaps, so re-check the total after `npm run check` and let `npm run music` snap cuts to the 100 BPM grid (P11 AA-T9). The `"sfx": false` on scenes 2 and 5 removes two incoming whooshes to stay inside the 0-2 whoosh budget.)

### 14.2 Where the kit falls short of this guideline (and the fix)

| Gap | Guideline target | Kit today | Fix |
|---|---|---|---|
| Safe zone | Text inside x 120-840, y 270-1210 | `reel` keeps content inside x 96-930, y 260-1340 | Keep CTA and status copy short so it sits high; check every frame in `npm run preview`; for paid TikTok/Shorts ads, a custom layout with the strict box |
| Type floor | Must-read ≥52 px in 9:16 | Checker floor 36 px (30 px hard) | Treat 36-51 px as texture; keep the meaning in headlines and in `stat`/`title` scenes |
| Tap vs cursor | Thumb tap with a ripple for mobile UI | `prompt` uses a desktop cursor (22 f glide, click on arrival, no dwell) | Acceptable for web/SaaS products; for mobile apps write a custom scene with a thumb and a 10 f dwell |
| Typing speed | ≈12-15 cps readable | `prompt` ≈60 cps, `chat` ≈30 cps | Keep typed strings ≤40 characters |
| Whoosh budget | 0-2 whooshes per film, sound 15-65% of transitions | A whoosh on every cut | `"sfx": false` on most scenes, or `transition: "cut"` |
| Shared-element morph, tossed card, status cycle, progress draw, flat-to-real swap, seamless tilt into the lockup | §9, §10 specs | Not available | Custom Remotion scene (`docs/ADDING-SCENES.md`) |
| On-twos illustration cadence | 12 poses/s for collage layers only | Not available | Custom scene; never apply it to UI |
| Tossed-card overshoot | One ≈25% rotational overshoot, playful only | `bouncy` overshoots ≈3% on text and ≈10% on buttons | Use `snappy`/`smooth`; build the tossed card as a custom scene |
| Burst behind the claim | Accent never covers the claim word | Theme-dependent accents | Check in `npm run preview` |
| Read holds | Status ≥1.0 s, payoff ≥1.0 s still, lockup ≥1.5 s | Timed from words (≈3.6 words/s at `fast`) | Set `duration` on payoff and lockup scenes explicitly |

### 14.3 What needs generative video (Flow / Veo / Sora / Runway / Kling / Higgsfield)

Rule (P11 §21.1): **generate only what is allowed to vary; compose everything that must not.**

| Layer | Generate? | Notes |
|---|---|---|
| Lifestyle plate: hands holding a phone with a **blank** screen, a flat interior, a café table, a sofa | **Yes** | One camera move per clip, named and timed (P11 AA-G2); "large clean empty area in the upper half" for type; composite the UI onto the screen as a tracked 2D layer |
| Defocused background behind glass UI | Yes | Extra 2-4% W blur in compositing, grade to the palette, add dither (P10 HR-11) |
| Abstract texture, gradient fields, light leaks | Yes (or in-engine) | Calm motion ≤0.2% W/f |
| Product UI, screens, charts, prices, type, logo | **Never** | Deterministic layers only; warped glyphs and drifting text are the main "AI look" tells (P11 AA-G9) |
| The physical product itself (packaging, label, device) | **Never generate it** | Real photography, a supplied render, or 3D from CAD; generators drift on product geometry and labels (P10 §14.5) |
| Real people as customers, founders or reviewers | **Never** | Real footage with releases; synthetic creator presenters only if clearly disclosed and allowed by the platform |
| Generated audio | **Discard** | Rebuild from the cue sheet |

**Plate prompt pattern** (Cinematography → Subject → Action → Context → Style; continuity block at the end, verbatim): "Locked-off vertical medium close-up, 9:16. Two hands hold a phone with a plain black screen, thumb resting at the lower edge. Slight natural hand sway only. Bright Indian flat interior behind, softly out of focus, warm morning window light from the upper left. Large clean empty area in the upper half of the frame. Palette marigold #FFC93C, paper #FFF7E8; soft shadows; fine grain. 6 seconds." Negative: "text, subtitles, captions, letters, watermark, logo, numbers, screen content, user interface, faces". Generate 1.5-2 s longer than the edit length, 2-4 takes, one model tier and seed per look, upscale before compositing, conform 24 → 30 with optical flow, and log model, prompt, seed and date for every kept take (P11 AA-G1-G14). Tag the shot `generated: true` in the kit's `clip` scene.

**Tool notes.** Veo 3.1 / Flow clips are 4, 6 or 8 s at 24 fps; Extend adds 7 s per step [P]. Higgsfield, Kling, Runway and Sora behave similarly for this purpose: use image-to-video from a designed first frame (start-frame conditioning) so the plate ends on a frame you composed, not on an invented transition (P11 AA-G6).

### 14.4 What needs 3D

Budget at most one 3D hero beat (≈10-15% of runtime, 1.4-4 s; P08 SD-14):
- **Physical product turntable or reveal** (gadget, bottle, shoe): from CAD or a photogrammetry scan, one key light, roll 0°, 180-360° in 2-4 s with ease-in-out; render with the brand background so it cuts into flat shots.
- **Glossy 3D app icon or phone** (inflated or extruded) for the reveal beat [V:1i2L14] (inflated phone); extrusion 6-8% thick in the accent colour [V:1ccYWJ rule 9].
- **Collection climax**: all generated outputs or products in one 3D deck that folds back to the logo [V:15VhHR rule 15].
- **Tilted UI planes** for a fintech/data proof, with real UI textures rendered at ≥ max zoom × width [V:19NRDv].

Build in Remotion with `@remotion/three`, After Effects 3D layers, Blender/C4D, or a 3D scene builder. No intersecting planes, DOF only on what is not read, and one light direction for the whole film (P10 §13).

---

## 15. QC checklist (Social Media Product Video)

Run per shot (frame by frame), on the locked cut, and on every delivered file. Severity: ✖ blocks release, ⚠ fix unless justified.

**Hook and story**
- [ ] ✖ Frame 0 carries the hook text or the product, and works as the thumbnail.
- [ ] ✖ First visible change by f3; no static opening longer than 0.5 s.
- [ ] ✖ Hook ≤5 words in 9:16 or ≤15 s (≤7 otherwise; ≤3 for dialect), one idea, hero word 200-240 px.
- [ ] ✖ Product or brand named by 3 s (2.4 s in PL-15).
- [ ] ⚠ One use case, told end to end; one template, kept.
- [ ] ✖ The story survives with the sound off (watch it muted once, end to end).

**Safe zones and legibility (check at 1080×1920 and on a real phone)**
- [ ] ✖ Every string inside x 120-840, y 270-1210; nothing meaningful in y 1210-1920 or x >840.
- [ ] ✖ Must-read text ≥52 px; nothing that carries meaning below 36 px.
- [ ] ✖ ≤5 words on screen at once; no informational text touching a frame edge; display bleed ≤0.7 s.
- [ ] ✖ Contrast ≥4.5:1 (3:1 for ≥66 px text), ≥7:1 or a ≥60% scrim over footage.
- [ ] ⚠ Profile-grid crop (3:4, y 240-1680) and 4:5 feed crop (y 285-1635) still show the hook and the logo.

**Timing and motion**
- [ ] ✖ Each display phrase ≥0.7 s still; each status ≥1.0 s; payoff ≥1.0 s still; lockup ≥1.5 s still.
- [ ] ⚠ ASL 1.5-1.8 s; UI shots ≥1.8 s; longest shot is a proof, not a text card.
- [ ] ⚠ No hold fully static for more than 5 f before the lockup.
- [ ] ✖ No overshoot on type or UI in premium styles; at most one rotational overshoot in playful styles.
- [ ] ✖ UI, cursor, scroll and camera on ones; on twos only for illustration layers.
- [ ] ⚠ Peak speeds ≤8-10% W/f, or motion blur above 5% W/f.
- [ ] ✖ Flashes ≤3 per second, flash frames ≤3 f, one flash moment at most.

**UI and product truth**
- [ ] ✖ Every state change has a visible actor (tap, hand, system) in the previous 30 f; feedback on the press frame; consequence in 3-8 f.
- [ ] ✖ Mobile UI uses a tap, not a desktop arrow.
- [ ] ✖ UI states follow the real product flow; data consistent across shots.
- [ ] ✖ No generated UI, type, logo, product geometry or real people; generated plates tagged.
- [ ] ✖ Every price, number, offer, code, date and review is verified and approved by the client.

**Sound**
- [ ] ✖ −14 LUFS ±1 integrated, true peak ≤ −1 dBTP (measure with `ffmpeg -af ebur128=peak=true`).
- [ ] ⚠ Drop within 0-8 f of the first product cut; click on the press frame inside a ≥15 dB dip; sting ±2 f of the lockup.
- [ ] ⚠ 0-2 whooshes; sounded transitions 15-65%; one loudest moment.
- [ ] ✖ Music licensed for ads on the target platform; no lyrics under copy; music runs to the last frame.
- [ ] ⚠ Kicks and hits audible on a phone speaker (100-300 Hz layer).

**Ending and delivery**
- [ ] ✖ A CTA exists: verb + destination, ≤16-character button, readable (Chowdeck's missing CTA is the classic failure).
- [ ] ⚠ The lockup rhymes with the hook (colour, line or motif).
- [ ] ✖ 1080×1920, 30 fps native (no duplicated-frame pulldown), H.264 High, yuv420p, BT.709, CRF 16-18 for UI/gradients, AAC ≥256 kb/s, 48 kHz.
- [ ] ⚠ Cutdowns (4:5, 1:1, 16:9) re-laid out, not cropped; durations identical in ms; strings identical.
- [ ] ⚠ Variants for A/B change scene 1 only (and keep it inside 1.2-2.4 s); file names state format, length, language and variant.
- [ ] ⚠ QC decisions made on the final-settings render, not on preview stills.

---

## 16. Common mistakes

| # | Mistake | Seen in | Why it fails | Fix |
|---|---|---|---|---|
| 1 | **Static first frames** (0.73 s before the first change) | [V:126cpH t=0.00-0.73s] | Frame 0 is the thumbnail and the scroll decision; 0.7 s is 40% of a feed dwell | Text on f0, first change by f3 (§7.2) |
| 2 | **UI micro-text carries the meaning** (1-2% H line items, a 1.3% H button) | [V:126cpH]; 7 of 8 references | Illegible on a phone; the proof becomes decoration | Rebuild the screen larger (≥52 px must-read) or cut in 3-3.5× |
| 3 | **No CTA** (logo only, then the end) | [V:126cpH]; [V:1ccYWJ] (CTA without logo) | The viewer is convinced and has nowhere to go | Verb + destination card, then a lockup with the handle |
| 4 | **Text in the platform UI zones** (status pill at y ≈1344, hero words to 84% W) | [V:126cpH t=11.07-13.6s] | Captions, buttons and the CTA sticker cover it | Strict box x 120-840, y 270-1210; lower band for non-text art only |
| 5 | **Statuses and lines flashed** ("Order delivered" for 2 f, "been busy?" for 0.45 s) | [V:126cpH]; Solar payoff 0.4 s [V:1Hcg3X] | The key word of the story is subliminal | Status ≥1.0 s, phrase ≥0.7 s, payoff ≥1.0 s still |
| 6 | **An accent covers the claim** (starburst rays over "seconds" for ≈0.5 s) | [V:126cpH t=3.90-4.43s] | The loudest visual hides the one word that matters | Fire bursts behind the claim or after it has been read |
| 7 | **Cropping the 16:9 master to 9:16** | P02 CO-U18 (608 px survives) | Layout breaks, text lands in the overlay zones | Re-lay out per format; keep times, scale travel in % |
| 8 | **Hook too small for phones** (3.6% H cap) | [V:1CSXtQ t=0-2.13s] | The hook is weakest exactly where the feed is | Hero word 200-240 px in 9:16; cap ≥5.8% H in 16:9 |
| 9 | **Music ends before the picture** (3.7 s early) | [V:1ccYWJ] | The CTA plays in silence; the ending feels broken | Music and sting run to the last frame |
| 10 | **Over-loud or clipping mix** (−7.9 LUFS, +1.6 dBTP) | [V:1i2L14]; kivi −10.7 [V:1-6l8S] | Platforms turn it down 3-6 dB and the limiter has flattened it | −14 LUFS ±1, ≤ −1 dBTP |
| 11 | **Duplicated-frame judder** (24/25 → 30 pulldown) | [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X] | Slides and scrolls stutter every 5-6 frames | Render native 30 fps; optical-flow conform for generated plates |
| 12 | **Stepped (on-twos) UI** | P10 2D-U18 | Reads as a slow app | Twos only for illustration layers |
| 13 | **A whoosh on every cut** | P09 (references use 0-1) | Sound becomes a template; nothing stands out | 0-2 whooshes; sound 15-65% of transitions |
| 14 | **Feature tour instead of one transaction** | P01 TS3 | Five features in 15 s prove none | One use case end to end; series for the others |
| 15 | **Generated product, UI or logo** | P11 AA-G9 | Warped glyphs, drifting labels, the "AI look"; also misrepresents the product | Generate plates only; composite real UI, real product photography or CAD 3D |
| 16 | **Trending sound on a brand ad** | P11 §24.7 [N] | Business accounts cannot use the trending library; the ad is muted or rejected | Licensed commercial music; brief it by BPM and arrangement points |
| 17 | **Invented numbers, reviews or offers** | kit `craft.md`; P11 §22.1 A | Legal and trust risk; platforms reject unsupported claims | Every fact supplied and approved by the client, or the beat is cut |
| 18 | **Text-card fatigue** (one reveal grammar repeated, card after card) | P11 MK-05 (4/8) | The film reads like a slideshow | 3-5 reveal types; alternate claim cards with proof shots; ≤3 text cards in a row |

---

*Sources: P01 §2.2-2.12 (stages, hooks, endings, copy budget); P02 §4.7-4.10 and §11 (safe areas, frame recipes, colour); P03 §18-19 (speeds, ease tokens); P04 §6 (camera in 9:16); P05 §7.13 (transitions in 9:16); P06 §8.4-8.12 (cursor, UI in 9:16, legibility); P07 §9 (type tokens, placement, reading time); P08 §15-17 (ASL, shot tokens, PL-05/10/15 plans, cutdowns); P09 §16 (tempo, SFX families, sound maps, loudness); P10 §12.5-12.6, §14.4-14.5, ST-G (cadence, 2D in 9:16, hybrid recipes, playful collage style card); P11 §21.5-21.6, §22, §23, §24.7-24.8 (generative and template rules, QC, mistakes, platform delivery). Per-video facts: the eight teardowns listed in the reference key.*
