# Specialised Guideline 12: Creator-Led Explainer Reel (India / Hinglish)

A vertical short in which a creator, on camera or as the voice, explains one idea, tool or product to an Indian audience in Hinglish. Each beat is either the creator's face (A-roll) or a motion-graphic or screen cutaway (B-roll) laid over the creator's continuous voice. Burned-in captions, a "samjho in 30 seconds" promise, three steps, one mistake, one proof and a comment-keyword CTA. The length is 20-45 s and the default is **30 s at 9:16**.

This guideline applies the Master SaaS Motion Design System (Parts 01-11 in `research/master/`, cited as **P01-P11**) and the eight frame-measured teardowns in `research/videos/` to this format. Every number is in frames at 30 fps (f) unless stated (1 f = 33.3 ms). "% W" and "% H" are percent of frame width and height. Pixel values are for **1080×1920 (9:16, "@1920p")** unless stated.

**Reference key**

| Tag | Reference (file in `research/videos/`) | Runtime / format | Why it matters here |
|---|---|---|---|
| [V:126cpH] | Chowdeck delivery-app ad (`126cpH-FXL4FxTwRwoJvt9M4FNwBB7peq.md`) | 17.97 s, **9:16**, 95.7 BPM | **The only native vertical reference.** A dialect hook ("You don chow?") that targets the viewer by language in 3 words. Setup/punch type hierarchy (1:2.5-1:3), ≥0.7 s still holds on display phrases, ASL 1.63 s. Its 0.73 s static open and missing CTA are flaws. |
| [V:1-6l8S] | kivi voice-AI launch (`1-6l8SV5NXZQotrYoV8KqKV7SJPvtssso.md`) | 77.8 s, 16:9, 127 BPM | **Indian locale and voice-led text.** Koramangala, Grandma and a Kannada translation card give it "warmth and local specificity". Text streams at the voice's pace (4-7 words/s). Kannada script resolves blur→sharp in ≈20 f. In-world voice is the hero layer. |
| [V:1Hcg3X] | Solar-panel explainer (`1Hcg3X8G_q34iS-RqcAQ2pMHpGkIhxu3j.md`) | 35.8 s, 16:9 | **Explainer rhythm.** One hero per frame, ≤6 words on screen, the key concept gets the longest hold (13 % of runtime), labels 3.6-4 % H. Its missing CTA, too-short payoff and 24→30 judder are flaws. |
| [V:1CSXtQ] | OpenAI × HubSpot connector (`1CSXtQ…md`) | 30.0 s, 16:9, ≈86 BPM | Typing speeds (filler 28-35 cps, key phrase 7-9 cps), click on the press frame, cuts within ±2 f of transients. Its 3.6 % H hook is flagged as too small for phones. |
| [V:19NRDv] | Bumper PRO payments launch (`19NRDv…md`) | 67.2 s, 16:9, 100 BPM | Word-by-word line building, a hero-word slam settling in 8 f, an expo-out counter of ≈1 s, one accent colour on the benefit word. |
| [V:1i2L14] | NOSTRA studio promo (`1i2L14…md`) | 35.1 s, 16:9 | A copy-framework chapter bar (Dream / Pain / Benefits / Features / CTA), a clicked CTA button, transitions caused by interactions. Over-loud mix (−7.9 LUFS, +1.6 dBTP) is a flaw. |
| [V:1ccYWJ] | Lottieicon library promo (`1ccYWJ…md`) | 44.3 s, 16:9, 112 BPM | Snap-hold-suck word cards and the "Why wait? / Let's go!" urgency triplet before the CTA. Flaws: inconsistent copy formats ("Designer" vs "Developers") and music that ends before the picture. |
| [V:15VhHR] | Wix AI site builder (`15VhHR…md`) | 53.9 s, 16:9, 112 BPM | Believable cursor and typing physics, a cut-in 3-3.5× on the control that matters, a suck-out silence before the decisive click. |

**Evidence warning (read first).** None of the eight references is creator-led. None has an on-camera presenter, none is in Hinglish, and none carries a confirmed narrator (P09 §16.10). This guideline's rules come from four kinds of source, and each rule is tagged with its source:
- **Measured motion, type and sound numbers**, transferred from the references to the graphic cutaways.
- **The vertical safe-zone, caption and voice data in the master** ([N], [P]).
- **The user's motion-kit** (its recipe `creator-explainer-hinglish`, its `references/copy.md` and its engine code). These are tagged [K].
- **Production practice for on-camera creator video.** None of it is measured in the reference set, so it is all marked **[inferred]**.

Where a reference number conflicts with a platform or physical limit (safe zones, type floors, loudness), the limit wins (P02 §4.7).

---

## 1. Purpose and audience

**Purpose.** In under a minute, make one idea feel *understood*, then make the viewer act: comment, save, follow or try the product. The creator's face supplies trust ("a real person who has used this"). The graphics supply clarity ("this is exactly how it works"). The captions make it work on mute.

- **The trust job.** Indian creator explainers sell through a person, not a brand. The viewer follows the creator for their judgement, so the creator's face and voice open the film and close it [inferred].
- **The clarity job.** Every abstract claim becomes a picture: a definition card, three numbered steps, a demo, a mistake-vs-fix comparison, one number. The kit's recipe encodes exactly this sequence [K: `creator-explainer-hinglish`].
- **The attention job.** 47 % of a video campaign's value lands in the first 3 s, and mobile feed dwell is ≈1.7 s per item [N] (P01 §2.2). The hook must target the viewer by language and pain inside 1.7 s, as Chowdeck's 3-word Pidgin question does [V:126cpH #1].

**Audience.**
- **Hinglish-first urban and semi-urban viewers, 18-35.** They think in Hindi and use English nouns (app, reel, EMI, UPI, upload). They read Roman-script Hinglish faster than formal Hindi or formal English [inferred]. Most of them watch on mid-range Android phones, often on mobile data and often on mute in public.
- **Followers of the creator.** They know the face and expect the creator's catchphrases and pace. They want a payoff they can use today.
- **Cold viewers from Explore, For You and Shorts.** They give 1.7 s. They need the topic and the "30 second" promise on frame 0.
- **Sponsored-content viewers.** The brand pays for the creator's credibility, so disclosure must be visible (§12.4) or that credibility is lost.

**The promise.** "In 30 seconds you will understand X well enough to do Y. I tried it myself." Every frame either earns the next second, explains, proves, or asks. Everything else is cut.

---

## 2. When to choose this format

Choose a Creator-Led Explainer Reel when **all four** are true:
1. **One idea fits in 3 steps or fewer.** Examples: a tool, a money concept (SIP, EMI, credit score), a feature, a hack, a myth.
2. **A credible person can front it.** That means the creator, a founder who talks like a creator, or a domain expert.
3. **The audience is Indian and speaks Hinglish** (or Hindi). Use English for a pan-India English audience, with this guideline's structure and an English copy bank.
4. **The goal is understanding, then one low-friction action**: comment a keyword, save, follow for part 2, or try a free product.

| Situation | Use this format? | Template (§4) | Better alternative |
|---|---|---|---|
| A creator explains a tool or app they use (sponsored or organic) | **Yes, default** | T1 30 s "Samjho" | — |
| A finance, tech or career concept ("SIP kya hai?") | Yes | T1, or T3 for myth-busting | Educational carousel if there is no face |
| A product launch through an influencer | Yes, as one creator's take | T1 with a product demo in steps 2-3 | Guideline 06 (Social Media Product Video) for the brand's own ad |
| A brand's own account with no presenter | Faceless variant (§4.6) | T1 faceless | Guideline 06 or Guideline 08 (30-60 s Explainer) |
| A list of tips ("3 tips jo koi nahi batata") | Yes | T2 Listicle | — |
| "Yeh galti mat karna" / a myth vs fact | Yes | T3 Myth-buster | — |
| Festive offer or local-shop promo | No | — | `local-offer-festive` recipe, Guideline 06 |
| A multi-feature platform tour | No (one feature per reel; make a series) | T1 per feature | Guideline 02 (UI Product Demo), Guideline 08 |
| A premium or luxury brand film | No | — | Guideline 04 (Premium Brand Motion Film) |
| Claims that need regulation (investment advice, health cures) | Only with registration and sources (§12.4) | T1 with a sourced stat | A legal review first |

---

## 3. Platforms, aspect ratios and length

### 3.1 Formats and safe zones

| Platform | Canvas | Safe text area @1920p | Notes |
|---|---|---|---|
| Instagram Reels | 1080×1920, 9:16 | Strict union: **x 120-840, y 270-1210** (P02 §4.7) | The caption block, audio row and buttons cover the bottom ≈30 % and the right ≈15 % [N]. The kit's `reel` safe box is x 96-930, y 260-1340 [K: `formats.ts`], so keep must-read text inside the stricter box. |
| YouTube Shorts | 1080×1920 | Same union | The right button column is the widest of the three platforms [N]. A loop back to the hook replays well [K: copy.md]. |
| Moj / Josh / ShareChat | 1080×1920 | Same union [inferred] | Hindi-first audiences: test a Devanagari variant (§6.3). |
| WhatsApp Status | 1080×1920 | y 200-1500 [inferred] | Limits per clip change, so check the current one. Keep the CTA as a number or keyword. |
| Instagram / LinkedIn feed | 1080×1350, 4:5 | Crop y 285-1635 of the 9:16 master shows the hook and the logo (P02) | Re-layout, don't crop (P02 CO-U18). |
| YouTube long-form chapter / website | 1920×1080, 16:9 | Kit `landscape` safe box | Re-layout: the face goes to the left third and the graphics to the right two-thirds [inferred]. |

**Face placement in 9:16 (A-roll).** Put the eyes at **y 640-760 (33-40 % H)**. The top of the head goes at y ≥300, so the face clears the top band (profile row, "Reels" header) and leaves the chest zone free for captions. The face is **38-48 % W** wide in a medium close-up (MCU) and centred within ±4 % W of x 480 (the centre of the strict union, not of the frame). The 150 px right-hand button column would otherwise sit on an ear [inferred from P02 §4.7 and [N] safe zones].

**Caption band.** Captions sit at **y 1000-1210**, the lowest band that stays clear of the platform caption block. In a cutaway, the graphic's own text replaces the caption. Never show both (§10.4).

### 3.2 Length

| Length | Use | Words spoken (at 2.6-2.9 words/s) | Evidence |
|---|---|---|---|
| 15 s | A teaser, a single tip, a hook test | 35-42 | [K: copy.md] Reels 15-30 s |
| **25-35 s (default 30 s)** | The full "samjho" explainer | **75-85** | Recipe "~30 s" [K]; narrated SaaS 150-170 wpm (P09 SD-V2) |
| 45 s | A concept with a demo plus a mistake plus proof | 115-125 | Shorts sweet spot 20-45 s [K: copy.md] |
| 60 s | A two-part concept, or a demo with 3 real steps | 150-165 | The kit warns past 60 s for vertical [K: `check.mjs`] |

Rules:
- **Speech rate 150-175 wpm (2.5-2.9 words/s).** Hinglish creators often talk faster, but on-screen reading time rises by ×1.15 for Hindi and Hinglish (P07 §9.11, [N, unverified]). Above 3.0 words/s the captions outrun the reader [inferred].
- **Cut by removing whole beats, never by speeding up the voice** (P08 §17.5 rule 1). A 30 s reel cut to 15 s keeps the hook, one step, the proof and the CTA.
- **Do not exceed 60 s on Reels or Shorts for an explainer.** Make "Part 2" a series and use it as the CTA (copy.md CTA #2).

---

## 4. Story structure with exact beat timings

### 4.1 Pick one template

| ID | Template | Beats | Length | When |
|---|---|---|---|---|
| **T1** | **"Samjho" explainer** (default) | Hook → promise → definition → 3 steps / demo → galti vs sahi → proof → CTA | 30 s | Tools, concepts, features [K: recipe] |
| T2 | Listicle ("3 tips jo koi nahi batata") | Hook → tip 1 → tip 2 → tip 3 (the best tip last) → recap → CTA | 30-40 s | Tips, hacks |
| T3 | Myth-buster | Myth (struck out) → "Sach?" → reason → proof → what to do instead → CTA | 20-30 s | Misconceptions, "yeh galti mat karna" |
| T4 | Try-it demo ("Maine try kiya") | Result first → "kaise?" → live steps → reaction → verdict → CTA | 30-45 s | Product reviews, sponsored tools |
| T5 | 15 s teaser | Hook → one-line answer → one visual proof → CTA | 15 s | Hook tests, Story cutdowns |

### 4.2 The default: T1, 30 s (900 f, 9:16, voice-led)

Stage windows come from the recipe's beat order [K]. They are scaled to PL-30's proportions: hook 6.7 %, proof ≈42 %, resolution ≈16 % (P08 §17.4), adjusted for a voice-led edit (P08 PL-90E: cut on sentence ends).

| # | Stage | Window (s) | Frames | % | Shot type | What it must do |
|---|---|---|---|---|---|---|
| 1 | **Hook (question)** | 0.00-1.80 | 0-54 | 6 % | A-roll MCU + kinetic overlay | Topic and pain in ≤5 spoken words. Text on f0, first motion by f3 (P01 H1). |
| 2 | **Hook payoff (shock)** | 1.80-3.90 | 54-117 | 7 % | Graphic: strike → punch | The "2 ghante → 2 minute" style flip. **Hero 1 at ≈2.6 s (9 %).** |
| 3 | **Promise** | 3.90-6.00 | 117-180 | 7 % | A-roll punch-in | "Tees second mein samjhata hoon." Sets the contract. |
| 4 | **Definition** | 6.00-8.70 | 180-261 | 9 % | A-roll + caption, or a `title` card | "X = meaning", plus an everyday analogy (chai, cricket, EMI) [K: recipe beat 2]. |
| 5 | **Steps** | 8.70-11.40 | 261-342 | 9 % | Graphic numbered list | 3 steps of 2-5 words each [K]. |
| 6 | **Demo** | 11.40-14.70 | 342-441 | 11 % | Screen / prompt card | Input → tap → result. **Hero 2 on the result ≈13.4 s (45 %).** |
| 7 | **Demo result** | 14.70-17.70 | 441-531 | 10 % | Graphic or screen | The output, readable, held ≥1.0 s. |
| 8 | **Turn ("Lekin…")** | 17.70-19.80 | 531-594 | 7 % | A-roll | The creator's face resets attention before the mistake. |
| 9 | **Galti vs sahi** | 19.80-22.80 | 594-684 | 10 % | Graphic compare | The common mistake vs the right way [K]. |
| 10 | **Proof** | 22.80-25.50 | 684-765 | 9 % | Graphic stat | One number with a nameable source, or the creator's own test. **Hero 3 on the counter lock ≈24.0 s (80 %).** |
| 11 | **Ask (face)** | 25.50-27.60 | 765-828 | 7 % | A-roll | "Try karna hai?" Eye contact. |
| 12 | **CTA** | 27.60-30.00 | 828-900 | 8 % | Graphic CTA | Comment keyword plus handle. Still ≥1.5 s (P08 defaults #20). |

**Rhythm check [derived].** 12 shots. ASL 2.50 s, median 2.40 s (0.96 × ASL), longest 3.3 s (the demo, 11 % of runtime). Face on screen in shots 1, 3, 4, 8 and 11 = 11.1 s (37 %). Heroes at 9 %, 45 % and 80 %, inside P08's "first at 10-25 %, last at 76-91 %" band, with the first one deliberately early because a reel's hook is its first hero. Inside each A-roll shot add 1-2 jump cuts (§8.2), which brings the felt cut rate to ≈1.6-1.9 s, the fast/montage band of P08 §15.2.

**Why this order works.**
- **Face → graphic → face → graphic.** Alternating the two worlds is the "two-world contrast" concept (P01 C), with the creator's room as the human world and the graphic field as the answer world. Every return to the face resets attention. Rule: **never more than 6 s of cutaways without returning to the face**, and the face is on screen at 0 s and in the last 5 s [inferred].
- **The mistake beat is the retention hook of the back half.** "Lekin ek galti mat karna" re-opens a loop at 59 % of runtime, where viewers typically drop [inferred].
- **Proof before the ask**, the same order as P01's Proof → Resolution, so the CTA is earned.

### 4.3 Energy and music arc (30 s, 120 BPM: beat 15 f, bar 60 f = 2 s)

| Time | Music | Voice | Picture energy |
|---|---|---|---|
| 0.0-3.9 | Beat from f0, ducked −10 to −12 dB under the voice (P09 SD-V table) | Fast, punchy | High: hook slam, strike, impact |
| 3.9-11.4 | Groove continues, thinned (drums plus bass only) | Explaining | Medium: definition, list ticks |
| 11.4 | **Groove-in / fuller arrangement on the demo cut** (P09 "drop on the first product moment, 0-8 f after its cut") | "Generate dabao…" | High: typing, tap, result |
| 17.7-22.8 | **Breakdown**: low-pass or −7 dB under the compare (P09 §16.4.4, densest reading) | "Lekin…" | Calm: face, then compare |
| 22.8-25.5 | Build back in; counter lock on a beat | Proof | Rising |
| 27.6-30.0 | Final hit on the CTA button pop ±2 f; tail runs to the last frame | CTA | Button pulse, then still |

### 4.4 T2 Listicle, 35 s (1050 f)

| Beat | Window (s) | Frames | Note |
|---|---|---|---|
| Hook (numbered promise) | 0.0-2.0 | 0-60 | "3 tips jo *koi nahi batata*" (copy.md #6) |
| Tip 1 (face + caption → graphic) | 2.0-9.5 | 60-285 | Chapter chip "01/03" for 1.0-1.5 s, then the visual |
| Tip 2 | 9.5-17.5 | 285-525 | A different graphic treatment from tip 1 (P08 ≤3 same-treatment cards in a row) |
| Tip 3 (the best) | 17.5-26.5 | 525-795 | The longest beat, holding the hero (P01 hero budget) |
| Recap list | 26.5-30.5 | 795-915 | `list` with checks: all 3 tips in 2-4 words each |
| CTA (Save) | 30.5-35.0 | 915-1050 | "Save karo, baad mein kaam aayega" (copy.md CTA #3) |

### 4.5 T3 Myth-buster, 22 s (660 f) and T5 Teaser, 15 s (450 f)

| T3 beat | Window (s) | | T5 beat | Window (s) |
|---|---|---|---|---|
| Myth struck out ("Myth: ~~bada budget~~") | 0.0-2.2 | | Hook (question, face) | 0.0-1.8 |
| "Sach?" (face, a 0.3 s pause before the answer) | 2.2-4.0 | | Answer card (title) | 1.8-4.5 |
| Reason (title or list) | 4.0-9.0 | | One proof (demo or stat) | 4.5-10.5 |
| Proof (stat or demo) | 9.0-14.0 | | CTA (face + keyword card) | 10.5-15.0 |
| What to do instead (list, checks) | 14.0-18.5 | | | |
| CTA | 18.5-22.0 | | | |

### 4.6 Faceless variant

If the creator does not appear on camera, use **voice + graphics + a brand avatar**. The avatar is the creator's logo or illustrated face in a 160-200 px circle at the top-left of the safe box, present on 100 % of the runtime [inferred]. Raise the B-roll event rate to one event every 0.7-1.0 s (P08 defaults #6), because the face is no longer resetting attention. Every recipe beat maps onto a kit scene directly (§14.1).

---

## 5. Shot list template

Fill in one row per shot before shooting. Shot IDs: **A** = A-roll (face), **G** = graphic (kit scene), **S** = screen recording, **B** = b-roll footage (real or generated).

| ID | Type | Framing / scale | Action | VO line (exact Hinglish) | On-screen text (≤6 words) | Dur (s / f) | Kit scene | Source / notes |
|---|---|---|---|---|---|---|---|---|
| A1 | A-roll | MCU, eyes y 640-760, 100 % | Leans 5 cm toward the lens on the question word | "…" | Hook line, kinetic | 1.8 / 54 | `kinetic` (kit build) or editor overlay | Take 3+; first frame already mid-sentence |
| G2 | Graphic | Full frame | Strike → punch | "…" | setup / ~~strike~~ / punch | 2.1 / 63 | `hook` | Impact on the punch |
| A3 | A-roll | Punch-in 115 % | Counting gesture | "…" | Caption (2-4 words) | 2.1 / 63 | `clip` (`trim` = scene start) | Jump cut at the breath |
| S6 | Screen | Phone UI card, 82 % W | Upload → tap → result | Describe, don't recite (copy.md) | UI only | 3.3 / 99 | `prompt` or `image` / `clip` | DND on, dummy data |
| B? | B-roll | Wide | Analogy visual (chai stall, local train) | "…" | 1-line caption | 1.5-2.5 | `clip` (`generated: true` if AI) | No text in the plate |
| … | | | | | | | | |

**A-roll recording sheet (per take):** script line ID, take number, eye line OK (Y/N), fan off (Y/N), lights flicker-free (Y/N), audio peak (dBFS), background noise (pressure cooker, horn, doorbell → retake), best take ★.

**Rules for the list.**
- **One spoken sentence = one shot,** cut on its end (P08 PL-90E "one caption cue, one shot").
- **Every graphic shot names its kit scene type**, or "custom" with a reason (§14.2).
- **Record the whole script in one continuous A-roll take** (or 2-3 long takes), even where the final edit will show graphics. The continuous take becomes the voice track that every cutaway sits on, which keeps lip sync exact (§14.1, workflow step 3).

---

## 6. Style direction

### 6.1 Visual

- **Two worlds, cut between, never blended.** The "real" world is the creator in their actual room: a warm practical lamp, a bookshelf or plant, 1.5-3 m of depth behind them. The "answer" world is the graphic field (theme background, one accent). Cutting between them is the edit's grammar (P01 concept C). Mixing them (graphics floating on the face for long stretches) reads as clutter [inferred].
- **Real, local and specific.** kivi's Indian locations (Koramangala, Grandma, a courtyard) are what give it warmth [V:1-6l8S §2]. Use real Indian examples: ₹ amounts, chai, cricket, Mumbai local, UPI, Flipkart Big Billion Days. Never use stock "global office" imagery.
- **One hero per frame, ≤6 words of display text per frame** [V:1Hcg3X rules 6-7]. Use ≤5 words on screen at once in 9:16 (G06 §15).
- **A-roll set:**
  - Background 1-1.5 stops darker than the face.
  - No window behind the creator, or it will be backlit.
  - The wardrobe is one solid mid-tone colour that is **not** the accent colour (the accent belongs to the answer) and has no fine stripes or checks, which cause moiré on phone sensors [inferred].
  - Turn **phone "portrait mode" off**. Its fake blur cuts hair edges and breathes between frames, an AI-look tell (P11 anti-AI list) [inferred]. Get real depth from distance instead.

### 6.2 Color

| Role | Rule | Value (midnight theme default) |
|---|---|---|
| Graphic field | One theme, held for the whole reel | midnight bg `#0A0E1A` [K] |
| Accent | **One accent, one meaning: "the answer / the payoff word"**, about 10 % of the frame, one element per scene (P01 CD-C2) | saffron `#FF9933` [K], or the brand's own via `npm run brand` |
| Galti (mistake) | Muted text plus ✕, never a second loud colour; the kit's `compare` mutes the left side [K] | theme `muted` |
| Captions over the face | White `#FFFFFF` + a 6-8 px black stroke, or a 60-70 % dark pill; the keyword in the accent | ≥4.5:1, ≥7:1 over footage, or a ≥60 % scrim (G06 §15) |
| A-roll grade | Neutral skin, white balance 5000-5600 K, warm practicals at 2700-3200 K in the background; no teal-orange LUT on skin [inferred] | — |

Theme choice: **midnight + snappy** is the classic bold creator look [K: recipe copyTips]. **corporate** suits finance and other serious topics, **neon** suits tech and AI, and **desi** suits festive or local topics only, not general explainers [K].

### 6.3 Typography

| Role | Size @1920p | Face (kit) | Evidence |
|---|---|---|---|
| Hook hero word (1-2 words) | 200-280 px (T-HERO, default 240) | Theme display (midnight: Anton caps) | P07 §9.2.2; "chow?" ascender 12-13 % H [V:126cpH] |
| Setup word over the hero | ⅓-⅖ of the hero (72-106 px, T-SUPER) | Body bold | Setup/punch ratio 1:2.5-1:3 [V:126cpH] |
| Statement / definition | 128 px default (96-190, T-STATEMENT) on 2-3 lines | Display | P07 |
| Stat value | 220-320 px (T-STAT) | Display | P07 [inferred for 9:16] |
| **Burned-in caption** | **64-80 px** (T-CAPTION 60-75, and ≥52 px floor); weight 700-800 | Poppins 700/800 (kit body font, Latin + Devanagari) | P07 floors table; [N] creator consensus 60-75 px |
| Label / chip ("01/03", "Mera test") | 60-72 px (T-LABEL) | Body 600-700 | P07 |
| Handle / URL | ≥52 px | Body 500 | P07 T-URL |
| Anything that carries meaning | **never below 52 px**; kit QA fails <30 px and warns <36 px | — | P07; [K: qa] |

Script rules (P07 §9.19):
- **Roman-script Hinglish is the default** on screen [K: craft.md]. If the creator writes in Devanagari, keep Devanagari on screen and in `say` [K: recipe].
- **One script per line.** Never put Latin and Devanagari in the same line [K: copy.md checklist]. Break lines at word boundaries of either script (P07 §9.19).
- **Devanagari leading 1.25 for headlines and 1.5 for body**, never Latin's 0.95-1.1. Otherwise matras get clipped (P07 §9.19).
- **Load the Devanagari subset** explicitly. The kit ships display stacks that fall back to Teko and Poppins for Devanagari [K: `themes.ts`].
- **Sentence case or lowercase** for captions (P07 TY-W6). Leave case to the theme, since midnight sets display caps. Don't type ALL CAPS yourself [K: copy.md].
- **Fix one romanisation and lock it** (§12.1).

---

## 6b. Technique classes for this format

Each row cites master IDs; the class of an ID is the master's (U universal, S style-specific, X experimental, A avoid, SaaS). The format column says how this format uses it. Assignments to this format are [inferred] from the guideline's own sections unless an evidence tag is given.

| Class | Techniques for this format (master IDs) |
|---|---|
| Universal | Text on f0 and payoff by 3 s (P01 H1); one idea per beat; captions that carry the meaning muted; hard cuts on spoken words (0-2 f early) |
| Format-specific | A-roll creator framing (eyes at y 640-760); karaoke captions word-synced to the VO; kinetic overlays (T-SUPER setup + slam punch); dialect and Hinglish copy; tempo 110-128 BPM (P09 SD-U8 creator-reel exception) |
| Experimental | Graphic stat cards cut into A-roll at 80 % as the hero (RV-25); Devanagari variants for Hindi-first apps (Moj, Josh, ShareChat) [inferred] |
| Avoid | Bollywood or trending audio under a brand post (copyright, muted reels); Latin and Devanagari in the same line (P07 §9.19); captions in the bottom 35 % platform band; over-loud masters |
| Especially good for SaaS | A real phone-screen recording composited, not generated (AA-U1); one measured result ("2 min") as the proof; app UI tap → consequence (TR-20) |

## 7. Motion language with numbers

### 7.1 Ease tokens (P03 §19.3)

| Token | Curve | Use in this format |
|---|---|---|
| E-SNAP | cubic-bezier(0.05, 0.7, 0.1, 1): 58 % of travel on f1, 90 % by f5 | Caption pop-in, hook hero word, stat lock |
| E-OUT | cubic-bezier(0.33, 1, 0.68, 1): 90 % by f7 | Default entrance: list rows, cards, chips |
| E-INOUT | cubic-bezier(0.65, 0, 0.35, 1) | Vertical push between sections |
| E-EXIT | cubic-bezier(0.3, 0, 0.8, 0.15) | Anything ending on a cut (shrink, punch) |
| E-LINEAR | constant | Breathing push on holds, counters, progress |

### 7.2 Timing table

| Element | Spec | Evidence |
|---|---|---|
| First visible change | **≤ f3**; text on **f0** | P01 H1; Chowdeck's 0.73 s static open is a flaw [V:126cpH #1] |
| Hook hero-word slam | From 3-4× scale with motion blur, ≈65 % of the change in f1, settled by f8-10, no overshoot | [V:19NRDv rule 1] |
| Strike-through | Line drawn in 6-8 f, E-OUT, then the struck word dims to 40 % | [K: `hook` + whoosh-soft]; [inferred] |
| **Caption cue** | Pop in **3-4 f** (scale 0.85 → 1.0, opacity 0 → 1, E-SNAP), appearing **0-2 f before the spoken onset**; stays ≤500 ms after its last word; ≥2 f gap between cues; no exit animation (hard swap) | P09 SD-V3 [P] |
| Caption keyword | Accent colour only; at most one keyword per cue; no extra scale bounce (≤3 % if any) | P01 CD-C2 [inferred] |
| Word-by-word kinetic line | Snappy: words 2 f apart, mask reveal in 15 f per element | [K: `snappy` wordStagger 2, enter 15] |
| List row | One row every ≥7 f (snappy itemStagger), but timed to the spoken word | [K]; P09 SD-V3 |
| Typing (demo) | Readable 12-15 cps; filler 28-35 cps, key phrase 7-9 cps | [V:1CSXtQ rule 1] [V:126cpH rule 12] |
| Tap → consequence | Ripple on the press frame; state change 3-8 f later (median 6-8 f) | P08 defaults #17 |
| Counter | ≈1 s expo-out, 70 % of the range in the first 25 %; final value fully still ≥1.0 s | [V:19NRDv rule 8]; P08 PL-90E shot 11 |
| Entrance vs exit | Entrances 8-15 f, exits 4-6 f (≈2:1) | [V:1-6l8S rule 4] |
| Jump-cut punch-in (A-roll) | **0 f** scale change, 100 % ↔ 112-118 %, scaled about the eye point | [inferred] |
| Breathing push on A-roll | 1.00 → 1.06 linear over the shot | [K: `clip` push 1.0 → 1.06] |
| Breathing push on graphics | 1.04-1.10 linear over the hold | G06 §8; [V:126cpH] |
| Punch into a section cut | +18-33 % over 3-8 f, cut on a music onset; ≤1 per 15 s | [V:1-6l8S rule 3] |
| Text drift while being read | ≤0.2 % W/f (≤2 px/f) | P07 TC-01 |

### 7.3 Holds and life

- **Display phrases: ≥0.7 s fully still** after the reveal [V:126cpH rule 14]. **Messages** (5+ words, including captions over footage) hold for **max(1.0 s, 0.33 s × words + 0.4 s, characters ÷ 17) × 1.15** for Hinglish (P07 §9.11.2, the ×1.15 unverified). A 4-word Hinglish caption therefore stays ≥1.98 s, built progressively word by word.
- **Never fully static for more than 5 f** except the final CTA hold. A-roll is alive by nature (the creator moves). Graphics get the breathing push or a drift of 0.1-0.5 % per frame [V:1Hcg3X rule 1].
- **One event every 0.7-1.5 s**, never more than 1.5 s without a discrete event (P08 defaults #6). In A-roll the events are the caption swaps and jump cuts.

### 7.4 Overshoot policy

- **No overshoot on captions, type or UI** in midnight, corporate and neon (P03; 6 of 8 references use no UI overshoot).
- `bouncy` is for playful consumer topics only, and never on numbers or UI (G06 §7.4).
- **Stickers and emoji** may pop with one ≈10 % overshoot settling in 8-12 f. Use at most 1 per 10 s, never over the face [inferred].

---

## 8. Camera language

### 8.1 Physical camera (A-roll)

| Setting | Value | Why |
|---|---|---|
| Device | The phone's rear main camera (1×, ≈24-26 mm equivalent), not the selfie camera, with a flip screen or monitor app | Sharper, better low light [inferred] |
| Position | Tripod, lens at eye height ±5 cm, **60-90 cm** from the face; MCU, chest-up | An eye-level lens makes eye contact; too close distorts the nose [inferred] |
| Resolution / rate | **4K 2160×3840 vertical at 30 fps** (record at the delivery rate) | P08 / [V:1Hcg3X rule 18]: avoid 24→30 duplicate-frame judder; 4K allows a 115-118 % punch-in without dropping below 1080p |
| Shutter | **1/50 or 1/100 s** | India's mains frequency is 50 Hz; at 1/60 s, tube lights and cheap LEDs band and flicker [inferred, physical] |
| Exposure / focus | AE/AF locked on the face; HDR video off (or export SDR/BT.709) | Avoids pumping and washed-out HDR→SDR uploads [inferred] |
| Movement | **Locked-off.** All motion comes from the creator and from punch-ins. A handheld "walk-and-talk" is a declared vlog variant only, using a gimbal | Stable framing keeps captions and the eye line consistent [inferred] |

### 8.2 Edit-camera on the A-roll

- **Jump cuts remove breaths, "umm" and restarts.** Leave 3-6 f of air between phrases. A gap ≥250 ms is only kept when it loads a punchline (P09 SD-V5) [inferred].
- **Alternate the scale on every jump cut:** 100 % → 115 % → 100 %. Never put two consecutive A-roll segments at the same scale, or the jump reads as an error. Scale about the eye point so the eyes stay within ±3 % H across the cut [inferred].
- **Use the 115-118 % punch for emphasis** (the keyword sentence, the "lekin" turn). Use 125-135 % at most once per reel, for the strongest reaction [inferred].
- **No digital zoom ramps on the face** (slow Ken Burns on a talking head reads as an amateur auto-effect). The kit's 1.00 → 1.06 linear push is the ceiling [K].

### 8.3 Virtual camera (graphics)

As in G06 §8: locked plus a breathing push for 40-50 % of graphic time; a vertical push of 1 FH in ≈11 f (E-INOUT, ≈10 % H blur at peak) for section changes [V:126cpH rule 10]; a cut-in at 3-3.5× on the one UI control that must be read [V:15VhHR rule 13]. Every move ends with its readable content inside x 120-840, y 270-1210. Peak speed stays ≤8-10 % W/f without motion blur; add blur above 5 % W/f.

### 8.4 Lighting (A-roll)

| Light | Spec | Note |
|---|---|---|
| Key | A soft source (60-90 cm softbox, or a diffused window) 30-45° off-axis, ≈30° above the eye line, 5600 K, CRI ≥95 | Use a ring light only as a fill: a frontal ring flattens the face and leaves a donut catchlight [inferred] |
| Fill | A white wall bounce or a reflector; ratio **2:1** (key 1 stop over fill) | Calm, friendly modelling [inferred] |
| Background | A warm practical (2700-3200 K lamp), 1-1.5 stops under the face | Depth and an Indian-home feel [inferred] |
| Kill | Overhead tube lights and CFLs (green cast, 50 Hz flicker), **ceiling fans** (moving shadows, mic noise) | Physical [inferred] |
| Hair / rim (optional) | A small LED behind, −1 stop, same colour temperature as the key | Separates the creator from a dark background |

---

## 9. Transitions

Density: hard cuts carry the film. **≥80 % of all scene changes are hard cuts** (P05 TR-U1: hard-cut share 69-100 % in 6 of 8 references; 0 of 8 use plug-in transitions).

| Transition | Spec | Use | Evidence |
|---|---|---|---|
| **Cut on the word boundary** (A-roll ↔ graphic) | Cut 0-2 f before the first word the cutaway shows; the voice is continuous across the cut | The default between the two worlds | P09 SD-V3; P08 PL-90E |
| **Jump cut** (A-roll ↔ A-roll) | 0 f, with a scale change of 12-18 % | Inside A-roll segments | §8.2 [inferred] |
| **Hard cut on motion** (graphic ↔ graphic) | Accelerate into the cut (last 6-10 f E-EXIT: shrink −10-20 % or push +10 %), decelerate out (first 6-20 f E-OUT) | Between graphic beats | [V:1CSXtQ rule 3] |
| **Vertical push** | 11-12 f E-INOUT, ≈10 % H blur | At most 2: hook → body, body → CTA | [V:126cpH rule 10]; [K: midnight default `push`, 12 f] |
| **Punch into a cut** | +18-33 % over 3-8 f | Into the hook payoff only | [V:1-6l8S rule 3] |
| **Interaction-caused cut** | A tap on screen is the edit point; cut 3-8 f after the press | Demo → result | [V:1i2L14 rule 15] |
| **Snap-hold-suck** | Card +40-55 % in 6 f, hold 6-10 f, −24 to −30 % over 8-18 f, cut on the smallest frame | Kinetic word cards in the hook | [V:1ccYWJ rule 2] |

Rules:
- **No transition effects on the face** (no whip, zoom-blur or glitch into or out of A-roll). They break the viewer's eye contact with the creator [inferred].
- **No whoosh on a cut into the face.** Sound only 15-65 % of transitions, with 0-2 whooshes per reel (P09 F07).
- **Don't put the same graphic treatment on 3 consecutive beats** (P08 defaults #19). Alternate dense beats (list, compare) with airy ones (title, stat, face) [K: copy.md checklist].

---

## 10. UI treatment

This applies to explainers of apps or tools; concept explainers skip §10.1-10.3.

### 10.1 Showing the phone UI

- **Rebuild or record, never fake.** Use a **real screen recording** of the live product (P06 tier T1, "acceptable for how-tos"), cropped tight to the action area. Or rebuild the key screen as layers (T2) when it must be readable at 9:16. Never generate UI with a video model (P06 UI-R5; P11).
- **Size:** the app screen sits as a floating card at **78-86 % W**, corner radius ≈48 px @1920p, soft shadow (y-offset 2 % H, blur 4 % H, 30 % opacity), no device frame by default (P06: 0 of 8 references draw chrome).
- **Must-read UI text ≥52 px.** A phone screen recorded at 1080 px wide and shown at 82 % W shrinks its 14 sp body text to ≈36-40 px, which is below the floor. So **cut in 1.5-2×** on the region that matters, or rebuild it larger (G06 mistake #2).
- **Recording hygiene:** Do Not Disturb on; full battery; neutral wallpaper; dummy names and numbers; **mask UPI IDs, account numbers, phone numbers and OTPs**; English or Hinglish UI language matching the voice-over [inferred].

### 10.2 Interaction grammar

| Event | Spec | Evidence |
|---|---|---|
| Tap | A 100-120 px circle at 35-45 % white, appearing on the press frame and growing to 1.6× while fading out over 18-24 f; the control darkens on the press frame | P06 UI-C rules; [V:126cpH t=10.54s] (click on the press frame) |
| Consequence | State change 3-8 f after the tap | P08 defaults #17 |
| Typing | 12-15 cps for strings that must be read; ≤40 characters | [V:126cpH rule 12]; G06 §14.2 |
| Result | The result appears whole or cascades at 2-4 f per row, then holds still ≥1.0 s with one highlighted value | [V:1-6l8S] cascades; P08 PL-90E |
| Cursor (desktop tools only) | Ballistic glide with a long ease-out tail, about 0.8-0.9 s per travel | [V:15VhHR]; [V:1CSXtQ rule 7] |

### 10.3 Believability

- **Every state change has a visible actor** (a tap, a creator gesture, a system event) in the previous 30 f (G06 §15).
- **The demo matches the voice.** The creator says "Generate dabao" on the frame of the tap ±3 f [inferred from P09 SD-V3].
- **Data stays consistent:** the same file name, numbers and duration across the demo, the result and the stat [K: copy.md "spell a number identically on every beat"].

### 10.4 Captions vs. on-screen text

- **During A-roll:** burned-in captions in the caption band (§3.1), built word by word.
- **During a graphic cutaway:** **no captions.** The graphic's text is the caption, and the voice says the same words in the same order ([K: copy.md "Say vs show" rule 1]).
- **During a screen demo:** no captions over the UI. If needed, put a single kicker label above the card ("Step 2 · Generate") [inferred].
- **Never rely on the platform's auto-captions.** They mis-transcribe Hinglish, and Whisper-class ASR writes Hinglish English words in Devanagari and drops matras (P07 §9.19 [P]).

---

## 11. Sound and music

### 11.1 Voice

- **The creator's own voice is the hero layer.** Record with a **lavalier 15-20 cm below the chin**, or a shotgun 30-40 cm above the frame. Peaks at **−12 to −6 dBFS**, 48 kHz / 24-bit. Record **10 s of room tone** per setup [inferred].
- **Retake on:** a pressure-cooker whistle, a horn, a doorbell, a ceiling fan, a mobile notification. Noise reduction can't fix a transient under a word [inferred].
- **Speech 150-175 wpm**, slowing by ≈10 % on the definition and on the CTA keyword (P09 SD-V2 [S]).
- **On-screen words appear 0-2 f before their spoken onset**, never after (P09 SD-V3 [P]).
- **TTS (faceless only):** use ElevenLabs `eleven_multilingual_v2` for Hindi or Hinglish, with `{stability 0.7, similarity_boost 0.5, style 0, use_speaker_boost true}` and one request per scene (P09 SD-V7 [P]). Respell brand names phonetically in `say` ("Likho" → "Lik-ho") and test them. **Never put a real customer's or a real creator's words through TTS without consent** (P09 SD-V8).

### 11.2 Music

| Parameter | Value | Evidence |
|---|---|---|
| Style | Instrumental only (no vocals under speech), punchy drums and bass; midnight: trap/hip-hop/phonk-lite; neon: synthwave; corporate: light electronic | [K: production.md BPM guide]; P09 §16.2 |
| Tempo | **120 BPM default** (beat 15 f, bar 60 f = 2 s); range 110-128 (P09 SD-U8 creator-reel exception); voice-led → the bottom of the range | [K: midnight 120-140, "voice-led: bottom of range"] |
| Level under the voice | **Ducked −10 to −12 dB**, attack 30-80 ms, release 250-700 ms; carve 2-4 dB at 1-4 kHz while the voice speaks | P09 §16.10.3 [E/N, unverified] |
| Kit default | `musicVolume` 0.15 under narration, ducking automatic | [K: `plan.ts`] |
| Arc | Starts on f0; fuller on the demo cut; breakdown under the compare; hit on the CTA pop; **music never ends before the picture** | §4.3; P09; [V:1ccYWJ] flaw |
| Licence | Only a track the user holds a licence for (YouTube Audio Library, Pixabay, Mixkit, paid Artlist/Epidemic). **No Bollywood chart songs, no "no copyright" re-uploads, no trending audio on business accounts** | [K: production.md] |

### 11.3 SFX map (P09 §16.7 families; the kit's automatic cues in brackets [K: `plan.ts`])

| Moment | Family | Placement | Level | Kit cue |
|---|---|---|---|---|
| Hook strike-through | F08 swish | On the strike line | +2 to +5 dB above 4 kHz | `whoosh-soft` 0.5 |
| Hook punch word | F11 impact (+ an F12 sub layer with a 100-300 Hz harmonic for phones) | Punch frame +2 f, inside a VO gap of ≥250 ms (P09 SD-V5) | +8 to +15 dB over the bed | `impact` 0.7 |
| Kinetic line words | F05 pops | First moving frame | −6 to −10 dB under clicks | `whoosh-soft` then `pop` 0.45 |
| List rows | F01 click | Each row's arrival | Soft | `click` 0.4 |
| Typing | F02 keystrokes | During typing | 20-25 dB under the full music level | `typing` 0.3 |
| Tap / Generate | F01 click | **Press frame, 0 f** | Clear | `click` 0.55 |
| Result appears | F04 soft tone | First full-opacity frame | Blended, +0-4 dB | `pop` 0.4 |
| Compare (sahi side) | F01 / F05 | Label arrival | Soft | `click` 0.35 / `pop` 0.5 |
| Stat counter lock | F11 impact (light) | Final-value frame −2 f | +6 to +8 dB | `impact` 0.55 |
| CTA button | F05 pop + F04 ding | Action +2 f / +6 f | Pop clear, ding soft | `pop` 0.55, `ding` 0.35 |
| Cut into the face | **none** | — | — | set `"sfx": false` on `clip` scenes |
| Transitions | F07 whoosh | **0-2 per reel**, peak on the fastest frame | +3 to +6 dB above 4 kHz | the kit adds one per transition: silence most with `"sfx": false` |

**Budget:** ≤1 SFX per beat (P09 [N]), 3-5 impacts per 30 s at most, one loudest moment (the hook punch or the CTA). With a voice-over the kit scales all SFX by 0.6 [K: `plan.ts` sfxScale].

### 11.4 Mix and delivery

- **−14 LUFS ±1 integrated, ≤ −1 dBTP**, LRA 5-10 LU (P09 SD-M1). The kit normalises to −14 [K: craft.md]. Measure with `ffmpeg -i out.mp4 -af ebur128=peak=true -f null -`.
- **Voice 300-3400 Hz centred and mono-safe; SFX 6-10 dB under the voice; no hit under a stressed word** (P09 SD-M3, SD-M5, SD-V5).
- **Check on a phone speaker at medium volume.** If the hook impact disappears, add 100-300 Hz harmonics rather than level (P09 SD-M4).
- **Fade every region 5-10 ms**, and let the music tail run ≥1.2 s past the final hit (P09 SD-M7).

---

## 12. Copy rules

### 12.1 Budget and Hinglish style

| Item | Budget |
|---|---|
| Spoken words, 30 s | 75-85 (2.5-2.9 words/s) |
| Hook on screen | ≤5 words (P01 H2, 9:16 budget); payoff by 3 s; ≤7 spoken words to the payoff [K: copy.md] |
| Any display line | ≤6 words / ≤28 characters (kinetic) [K: scenes.md] |
| Caption cue | 1-4 words, ≤18 characters, ≤2 lines [inferred]; 42 characters per line is the absolute max [N] |
| List items | 3 items, 2-5 words each [K: recipe] |
| CTA button | 1-3 words, ≤16 characters reads best [K] |
| Emoji | ≤1 per line, casual themes only (midnight, pop, desi) [K: copy.md] |

**Romanisation lock** (choose once per channel and never vary; inconsistency is a craft flaw, P07 RM-14):
`hai` (not h/hain for the singular) · `nahi` (not nhi/nahin) · `kya` · `kaise` · `karo` · `mein` (not me/main) · `bhi` · `sirf` · `ab` · `toh` · `lekin` · `matlab` · `samjho` · `zyada` · `paise` · `ghante` · `second`/`minute` in English.

**Language mix:** Hindi grammar and connectors; English for tech and product nouns (app, upload, captions, reel, EMI, UPI). Don't translate English nouns into formal Hindi ("anuvaad" for translation) unless the channel's voice is Hindi-first [inferred]. Use Hinglish transition words: Lekin · Toh · Ab · Matlab · Isliye · Aur haan · Bas · Socho · Dekho [K: copy.md].

**Numbers:** digits on screen, words in `say`, matching how the creator speaks ("tees second", "two minute"). Use the Indian system (₹1,50,000, lakh, crore). Spell each number identically on every beat [K: copy.md numbers rule].

### 12.2 Hook rules and examples

Rules:
- **Frame 0 shows the topic.** Name the viewer's pain in their own words (Chowdeck's dialect question did the targeting in 3 words [V:126cpH #1]).
- **No "Hi guys, welcome back", no logo intro, no slow fade-in** [K: copy.md hook rules].
- **One accent on the payoff word.**
- Unsure? Offer three angles: a question, a demonstration, a mistake [K].

| Formula | Hinglish hook (on screen) | Spoken |
|---|---|---|
| Question (copy.md #3) | "SIP mein *loss* kyun hota hai?" | "SIP mein loss kyun hota hai?" |
| Time shock (#2) | "~~2 ghante~~ ka kaam. Ab *2 minute.*" | "Do ghante ka kaam, ab do minute." |
| Common mistake (#4) | "Aap UPI *galat* use kar rahe ho." | same |
| Stop doing X (#5) | "Credit card ka *minimum due* bharna band karo." | same |
| Numbered promise (#6) | "3 Excel tricks jo *koi nahi batata.*" | same |
| Myth vs fact (#14) | "Myth: ~~bada budget~~. Sach: *aapka phone.*" | "Myth: bada budget. Sach? Aapka phone." |
| Topic + time promise (recipe) | "Credit score kya hai? *30 second* mein samjho." | "Credit score kya hai? Tees second mein samjho." |
| Warning (#25) | "Phone lene se pehle *yeh dekho.*" | same |

### 12.3 CTA rules and examples

Rules:
- **One action per video**, button 1-3 words [K].
- The CTA `say` reads the kicker first, then the action [K: copy.md].
- **A comment keyword gets more comments than "follow karo"** [K: recipe copyTips]. Only promise a DM if the creator will actually send it (manually or through an automation tool).
- **The CTA rhymes with the hook** (P01 L3: repeat the hook's line, colour or motif).

| Pattern | `kicker` | `action` | `sub` |
|---|---|---|---|
| Comment keyword | "Comment karo 👇" | "LIKHO" | "Free trial link *DM* mein" |
| Part 2 | "Part 2 kal aayega" | "Follow" | "Miss mat karna" |
| Save | "Baad mein kaam aayega" | "Save karo" | — |
| Share | "Us dost ko bhejo" | "Send karo" | "Jo abhi bhi typing kar raha hai" |
| Link in bio | "Link bio mein hai" | "Try karo" | "Pehla month free" (only if true) |
| Poll | "Aap kaunsa loge?" | "Comment 1 ya 2" | — |

### 12.4 Disclosure and claims (India)

These rules are [external, verify the current text before publishing]:
- **Paid or gifted content needs a visible disclosure.** Use the platform's "Paid partnership" tool **and** an on-screen label such as "Ad", "Sponsored" or "Collab". ASCI's influencer guidelines ask for the label to be prominent and placed at the start, and for videos to carry it for a minimum share of the runtime. Check the current ASCI text for the exact duration rule. Default: label visible for **≥⅓ of the runtime from 0 s** [inferred from ASCI guidance].
- **Finance (investments, securities, credit):** no specific buy/sell advice unless the creator holds the required SEBI registration. Show a source for every number (RBI, SEBI, AMFI, NPCI, the product's public page). Without a source, cut the stat beat [K: recipe "No source: cut beat 5"].
- **AI-generated or altered people or voices:** label them (Meta "AI info", YouTube's altered/synthetic disclosure) and follow MeitY's current rules on synthetic content [external, verify]. The kit tags AI clips with `"generated": true` [K].
- **Every price, offer, number and review is confirmed by the user or brand** before render [K: copy.md].

---

## 12b. Typography

One place for this format's type decisions; sizes are P07 §9.2 tokens (font px at 1920×1080 / 1080×1920), entrances and exits follow P03 SP-T0, word budgets and holds follow P01 H2 and P07 §9.11.

| Item | This format |
|---|---|
| Families and weights | Poppins 700/800 (Latin + Devanagari) for captions and supers [K]; one script per line; Devanagari leading 1.25 headline / 1.5 body (P07 §9.19) |
| Size tokens | 9:16 only: burned-in caption 64-80 px (T-CAPTION 60-75, ≥52 floor); T-SUPER 72-106 px setup word; hero/punch word 2.5-3× the setup; white with a 6-8 px black stroke or a 60-70 % pill over footage |
| Reveals | RV-07 slam (hook punch), RV-02 pop-on (one hook only), karaoke word highlight synced to the VO (P07 §9.11.4), RV-25 count-up on the stat card |
| Exits | EX-01 leave with the cut, EX-04 shrink into the cut |
| Word budget | Hook ≤5 words on screen (P01 H2 9:16 budget); ≤7 spoken words to the payoff [K]; captions ≤2 lines |
| Holds | Punch word 10-15 f; kinetic line of ≤3 words ≥10-14 f landed; statement of 4-6 words ≥0.8 s landed; payoff, result or status ≥1.0 s still; no text event under 25 f except SD-03 punch cards in a run (P07 §9.11.2, P08 §17.8 #3-4); lockup ≥1.5 s still (2.2 s premium) |
| Floors | Must-read text inside the safe area (16:9 x 96-1824, y 54-1026; 9:16 x 120-840, y 270-1210); 9:16 body font ≥52 px; contrast ≥4.5:1 (3:1 large), ≥7:1 or a ≥60 % scrim over footage (P07 §9.21, P11 G-27, G-37) |

## 13. Worked example storyboard: "Likho" (fictional), 30 s, 9:16

**Brief (fictional).** *Likho* is an app that turns spoken Hinglish in a reel into styled, word-synced captions. Creator: **@techwalibaat** (fictional), a Hinglish tech explainer channel. Sponsored post. Theme `midnight`, motion `snappy`, music 120 BPM licensed instrumental. Template T1. The voice is the creator's continuous A-roll recording; graphics cut away over it. The claim "2 minute" is the creator's own test (it must be a real test before publishing).

**Script (82 words, ≈164 wpm):**
1. "Captions mein ghante lagte hain?"
2. "Do ghante ka kaam, ab do minute."
3. "Tees second mein dikhata hoon kaise."
4. "Likho aapki Hinglish ko captions banata hai."
5. "Teen steps: upload karo, style chuno, export karo."
6. "Reel upload karo, Generate dabao, aur bas, captions ready."
7. "Har word apne aap sync hota hai, Hinglish bhi."
8. "Lekin ek galti mat karna."
9. "Seedha post mat karo. Pehle ek baar spelling check karo."
10. "Mera test? Chaalis second ki reel, do minute."
11. "Try karna hai?"
12. "LIKHO comment karo, link DM mein."

### 13.1 Storyboard

| Sc | Timestamp (s / f) | Dur | Visual | UI / product action | Camera | Object motion | Text (on screen) | Transition out | Lighting | Sound (VO + SFX) | Music | Motion notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0.00-1.80 / 0-54 | 1.8 s (54 f) | A-roll MCU: the creator holds a phone, frowning at it; eyes y≈700 | — | Locked, 100 %; lean-in 5 cm on "ghante" | Kinetic overlay: "Captions mein" (T-SUPER 96 px) at f0, "*ghante?*" slams from 3.5× at f6, settled by f15 | "Captions mein / *ghante?*" (y 980-1210) | Hard cut on the word "Do" (0-2 f early) | Key 45° camera-left 5600 K, warm lamp behind at −1.5 stops, fan off | VO 1. Impact (F11) on "ghante?" settle +2 f | 120 BPM bed from f0, ducked −11 dB | Text on f0 and motion by f3: the hook passes the thumbnail test. "ghante?" in the accent, saffron. No caption duplicate (the overlay is the caption). |
| 2 | 1.80-3.90 / 54-117 | 2.1 s (63 f) | Graphic, midnight field with aurora | — | Breathing push 1.00 → 1.06 | "2 ghante" draws in (E-OUT 8 f); the strike line draws over 7 f at ≈2.3 s, the word dims to 40 %; the punch "Ab *2 minute.*" slams at ≈2.6 s, settled in 9 f | setup "Pehle:", strike "2 ghante", punch "Ab *2 minute.*" | Vertical push 12 f (E-INOUT) | Graphic | VO 2. `whoosh-soft` on the strike; `impact` on the punch (in the 250 ms pause before "ab") | Full beat, kick on the punch | **Hero 1 (9 %).** The punch word is 200-240 px, inside x 120-840. Punch holds ≥0.7 s still before the push. |
| 3 | 3.90-6.00 / 117-180 | 2.1 s (63 f) | A-roll, punch-in 115 %, eye contact, three fingers raised then "tees" gesture | — | Jump cut at 5.0 s back to 100 % | Captions build word by word: "30 second mein" → "dikhata hoon *kaise*" | Caption cues ≤4 words, 72 px Poppins 800, white with stroke; "kaise" in the accent; label "Ad · Likho ke saath" top-left from 0 s | Hard cut on "Likho" | Same as sc 1 | VO 3. No SFX (`sfx: false`) | Ducked −11 dB | Captions appear 0-2 f before each word. Jump cut removes a breath; eyes stay within ±3 % H across the scale flip. |
| 4 | 6.00-8.70 / 180-261 | 2.7 s (81 f) | A-roll 100 %, the creator turns the phone toward the lens | — | Locked; 1.00 → 1.06 push | Caption card in the caption band: "Likho = *Hinglish → captions*" (rich, accent on the result) | "Likho = *Hinglish → captions*" (T-STATEMENT 110-128 px, 2 lines) | Hard cut on "Teen" | Same | VO 4. No SFX | Ducked | The definition beat. Hold ≥ max(1.0, 0.33×4+0.4)×1.15 = 1.98 s after landing ✓ (lands ≈6.4 s, holds to 8.7 s). |
| 5 | 8.70-11.40 / 261-342 | 2.7 s (81 f) | Graphic list, 3 numbered rows | — | Breathing push | Rows arrive on their spoken words (≥7 f apart), E-OUT 15 f, travel 70 px | Title "3 steps" · "1 Upload karo" · "2 Style chuno" · "3 *Export karo*" | Hard cut on motion (rows shrink −12 % over the last 6 f) | Graphic | VO 5. `click` per row | Thinned groove | Each row 2 words ✓. Accent only on step 3 (the payoff). |
| 6 | 11.40-14.70 / 342-441 | 3.3 s (99 f) | Prompt card (the Likho upload screen rebuilt as a floating card, 84 % W) | Field label "Reel upload"; typed "my_reel_final_v3.mp4 · Hinglish" (32 chars); tap "Generate"; "Generating…" shimmer 15-20 f; result | Locked; cut-in feel through card scale 1.0 → 1.04 | Typing, cursor/tap on the button, shimmer, result cascade | label "Reel upload" · button "Generate" · result "*142 words* · synced" | Interaction-caused cut 6 f after the result lands | Graphic | VO 6 (describes, doesn't recite). `typing` (−20 dB re music), `click` on the press frame, `pop` on the result | **Groove-in / full arrangement on this cut** (P09 drop rule) | **Hero 2 (≈13.4 s, 45 %)** on the result. The tap says "Generate dabao" ±3 f. 32 typed chars at the kit's rate fit inside the beat. |
| 7 | 14.70-17.70 / 441-531 | 3.0 s (90 f) | Waveform plus karaoke words: the product output | Words light up as spoken | Breathing push | Waveform reacts to the voice; each word turns from 40 % to 100 % opacity on its onset | label "Hinglish · auto-sync"; tags "Hinglish", "Auto-sync"; text = VO 7 | Hard cut on "Lekin" | Graphic | VO 7. No SFX | Full | The product's own behaviour (word sync) *is* the visual: show, then label (P01). |
| 8 | 17.70-19.80 / 531-594 | 2.1 s (63 f) | A-roll punch-in 118 %, finger raised, serious face | — | Jump cut to 100 % at 18.7 s | Captions: "Lekin ek *galti*" → "mat karna" | Caption cues; "galti" in the accent | Hard cut on "Seedha" | Same | VO 8. No SFX; 300 ms pause after "Lekin" kept | **Breakdown:** low-pass ≈800 Hz / −7 dB | Turn of the story at 59 %. The pause is the only kept gap ≥250 ms in the A-roll (it loads the turn). |
| 9 | 19.80-22.80 / 594-684 | 3.0 s (90 f) | Graphic compare, left muted ✕ / right hero ✓ | — | Locked | Left label and row in, then right with a `pop`; right side settles last | title "Galti vs sahi" · Galti: "Seedha post" · Sahi tarika: "Pehle *spelling check*" | Hard cut on "Mera" | Graphic | VO 9. `click` (left), `pop` (right) | Breakdown continues, building in its last bar | Rows in the same order as spoken ✓. Mutes the mistake, no second loud colour. |
| 10 | 22.80-25.50 / 684-765 | 2.7 s (81 f) | Graphic stat with meter | — | Breathing push | Counter 0 → 2 in ≈1 s expo-out; lock at ≈24.0 s; meter fills | kicker "Mera test · 40-sec reel" · value "2 min" · label "captions *ready*" | Hard cut on "Try" | Graphic | VO 10. `impact` 0.55 on the lock (−2 f) | Build back to full on the next downbeat | **Hero 3 (80 %).** "2 min" matches the hook's "2 minute": the loop closes (P01 L3). Fully still ≥1.0 s after the lock. |
| 11 | 25.50-27.60 / 765-828 | 2.1 s (63 f) | A-roll 100 %, a smile, an eyebrow raise, the phone held up | — | Locked | Caption: "Try karna *hai?*" | Caption cue | Hard cut on "LIKHO" | Same | VO 11. No SFX | Full, ducked | The face returns in the last 5 s ✓. |
| 12 | 27.60-30.00 / 828-900 | 2.4 s (72 f) | Graphic CTA, big pulsing pill | — | Locked | Kicker in, the pill pops (8 f, no overshoot in midnight), gentle pulse 1.00 ↔ 1.03 every 30 f, then still from ≈28.5 s | kicker "Comment karo 👇" · action "LIKHO" · sub "Free trial link *DM* mein" · handle "@techwalibaat" | End (loops to sc 1) | Graphic | VO 12. `pop` +2 f, `ding` +6 f on the action | **Final hit on the pill pop**; tail to the last frame | Button ≤16 chars ✓. Still ≥1.5 s ✓. A last frame that flows back to sc 1 helps the Shorts loop. |

### 13.2 Checks on the storyboard

- **Hook:** text on f0 ✓; payoff "2 minute" at 2.6 s (<3 s) ✓; ≤5 hook words on screen ✓.
- **Face share:** 1.8 + 2.1 + 2.7 + 2.1 + 2.1 = 10.8 s = **36 %** ✓ (target 30-55 %). Longest cutaway run: sc 5-7 = 9.0 s ✗ against the "≤6 s without the face" rule. **Fix:** in the editor build, a 1.0 s A-roll reaction ("dekho!") goes between sc 6 and 7, or the creator's face goes in a 200 px circle PiP over sc 6-7 (§14.2). The pure-kit build accepts the 9 s run.
- **Words per second:** 82 / 30 = 2.73 ✓.
- **Accent discipline:** one accent per scene, always on the payoff word ✓.
- **Numbers:** "2 ghante", "2 minute", "2 min", "30 second", "40-sec" are consistent across beats ✓ (the "2 min" stat is the creator's real test or it is cut).
- **Disclosure:** "Ad · Likho ke saath" label from 0 to ≥10 s plus the platform's Paid-partnership tag ✓ (§12.4).
- **Sound:** impacts at 2.6, 24.0 s plus the CTA hit (3 loud moments); whooshes ≤2 (the strike swish and one push) ✓.

### 13.3 Devanagari variant (Hindi-first channels, same timings)

Hook: "कैप्शन में *घंटों* लगते हैं?" → strike "2 घंटे" → punch "अब *2 मिनट।*". CTA action stays Latin "LIKHO", because it is the keyword viewers type. Kicker: "कमेंट करो 👇". Use Devanagari leading 1.25 for headlines. Keep one script per line. Re-run `npm run qa` because Devanagari line heights change the fit (P07 §9.19).

---

## 14. Building it: motion-kit versus editor versus generative video versus 3D

### 14.1 What motion-kit can build directly

Scene types: hook, kinetic, orb, title, stat, list, compare, bars, grid, quote, prompt, chat, wave, image, clip, cta, logo. Themes: midnight, clean, neon, editorial, pop, desi, corporate, mono, studio, studio-dark. Formats: reel, portrait, square, landscape.

| Beat | Kit scene | Notes |
|---|---|---|
| Hook question (kinetic) | `kinetic` (`lines`, 1-5 words each) | Must be scene 1 in a kit build: a `clip` fades in over 15 f, so it can't carry frame 0 (QA flags a blank thumbnail) [K: `Clip.tsx`, qa] |
| Hook shock | `hook` (`setup`, `strike` ≤14 chars, `punch` ≤6 words) | Strike gets `whoosh-soft`, the punch an `impact` [K] |
| A-roll face (with or without caption) | `clip` (`src`, `trim`, `caption`, `kicker`, `area: "bottom"`, `scrim`) | Muted, full frame, 1.00 → 1.06 push. The caption is one static rich line (≤8 words), not word-by-word |
| Definition | `title` (`kicker`, `headline` ≤8 words, `sub`) | Recipe beat 2 [K] |
| 3 steps | `list` (`style: "numbers"`) | Rows reveal on the spoken word |
| App demo | `prompt` (`label`, `prompt`, `button`, `result`) or `chat` | Desktop cursor; good for web/AI tools |
| Product output that is speech or captions | `wave` (karaoke words, `tags`) | Ideal for voice or caption products |
| Galti vs sahi | `compare` | Left muted ✕, right hero ✓ |
| Proof number | `stat` (`value`, `label`, `kicker` = source) | Count-up + meter; Indian grouping kept [K] |
| Screenshot or b-roll | `image` / `clip` (`generated: true` for AI) | |
| CTA | `cta` (`style: "button"`, `handle`) | |

**Workflow (Likho example):**
1. `npm run new -- likho-explainer --recipe creator-explainer-hinglish` (creates the spec from the recipe; it lists every `[CAPS]` slot to fill) [K].
2. Shoot the A-roll as one continuous take. Save `public/clips/likho-aroll.mp4`. Extract its audio as the voice track: `ffmpeg -i public/clips/likho-aroll.mp4 -vn -c:a libmp3lame -b:a 192k public/voice/likho.mp3`.
3. Write each scene's `say` **exactly as spoken in the take**, then align: `npm run voice -- specs/likho-explainer.json --align voice/likho.mp3`. With `ELEVENLABS_API_KEY` set, the kit uses ElevenLabs forced alignment, which is preferred for Hinglish. Offline it uses whisper.cpp with Latin-script Hinglish transcribed as English [K: `voice.mjs`; craft.md].
4. Set `"transition": "cut"` (zero overlap between scenes [K: `plan.ts` T = 0]). Run `npm run check` to print the timeline. Set **each `clip` scene's `trim` = that scene's start time in seconds** (plus the take's offset if the recording starts before the first word). The face then lip-syncs to the continuous voice track. Re-check after `npm run music`, because beat snapping can move boundaries. Lip-sync tolerance is audio ≤45 ms early to ≤125 ms late (ITU-R BT.1359 detectability) [external]; that is about 1 f early and 3 f late.
5. `npm run brand -- public/brand/likho.png --spec specs/likho-explainer.json` (brand accent, if sponsored).
6. `npm run music -- specs/likho-explainer.json --track music/phonk-120.mp3` (after the voice).
7. `npm run check` → `npm run preview` (contact sheet, platform zones tinted red) → `npm run qa` → `npm run make` (also `--format portrait` for the 4:5 feed).

**Kit spec for the Likho storyboard** (fields from `skills/motion-director/references/scenes.md`; `trim` values are placeholders until step 4 is run on the real take):

```json
{
  "format": "reel",
  "theme": "midnight",
  "motion": "snappy",
  "pace": "normal",
  "transition": "cut",
  "brand": { "name": "Likho", "handle": "@techwalibaat" },
  "audio": { "sfx": true, "voiceover": "voice/likho.mp3", "music": "music/phonk-120.mp3" },
  "scenes": [
    { "type": "kinetic", "say": "Captions mein ghante lagte hain?",
      "lines": ["Captions mein", "*ghante?*"] },
    { "type": "hook", "say": "Do ghante ka kaam, ab do minute.",
      "strike": "2 ghante", "punch": "Ab *2 minute.*" },
    { "type": "clip", "say": "Tees second mein dikhata hoon kaise.", "src": "clips/likho-aroll.mp4", "trim": 3.9,
      "kicker": "Ad · Likho ke saath", "caption": "30 second mein, *kaise*", "area": "bottom", "scrim": 0.45, "sfx": false },
    { "type": "clip", "say": "Likho aapki Hinglish ko captions banata hai.", "src": "clips/likho-aroll.mp4", "trim": 6.0,
      "caption": "Likho = *Hinglish → captions*", "area": "bottom", "scrim": 0.45, "sfx": false },
    { "type": "list", "say": "Teen steps: upload karo, style chuno, export karo.",
      "title": "3 steps", "items": ["Upload karo", "Style chuno", "*Export karo*"], "style": "numbers", "sfx": false },
    { "type": "prompt", "say": "Reel upload karo, Generate dabao, aur bas, captions ready.",
      "label": "Reel upload", "prompt": "my_reel_final_v3.mp4 · Hinglish", "button": "Generate", "result": "*142 words* · synced" },
    { "type": "wave", "say": "Har word apne aap sync hota hai, Hinglish bhi.",
      "label": "Hinglish · auto-sync", "tags": ["Hinglish", "Auto-sync"] },
    { "type": "clip", "say": "Lekin ek galti mat karna.", "src": "clips/likho-aroll.mp4", "trim": 17.7,
      "caption": "Lekin ek *galti*", "area": "bottom", "scrim": 0.45, "sfx": false },
    { "type": "compare", "say": "Seedha post mat karo. Pehle ek baar spelling check karo.",
      "title": "Galti vs sahi",
      "left": { "label": "Galti", "items": ["Seedha post"] },
      "right": { "label": "Sahi tarika", "items": ["Pehle spelling check"] } },
    { "type": "stat", "say": "Mera test? Chaalis second ki reel, do minute.",
      "kicker": "Mera test · 40-sec reel", "value": "2 min", "label": "captions *ready*" },
    { "type": "clip", "say": "Try karna hai?", "src": "clips/likho-aroll.mp4", "trim": 25.5,
      "caption": "Try karna *hai?*", "area": "bottom", "scrim": 0.45, "sfx": false },
    { "type": "cta", "say": "LIKHO comment karo, link DM mein.",
      "kicker": "Comment karo 👇", "action": "LIKHO", "sub": "Free trial link *DM* mein", "handle": "@techwalibaat", "style": "button" }
  ]
}
```

Notes:
- The `hook` has no `setup` here because "Pehle:" is not spoken. On-screen words must be spoken, in order [K: copy.md "Say vs show"].
- `transition: "cut"` keeps lip sync exact and matches the ≥80 % hard-cut rule. The two pushes in the storyboard (sc 2 → 3 and the CTA) are the editor build's only additions.
- The voice-over scales SFX to 0.6 and sets music to 0.15 automatically [K: `plan.ts`].
- **Verified:** `npm run check` passes on this spec (with the `voiceover` and `music` keys removed and the clip `src` swapped for a placeholder URL). Before any voice-over it estimates **38.0 s**, because it assumes slower speech than the creator's 2.73 words/s, and it warns that scenes 10 and 11 are too short to read. After `--align` on a real take at ≈164 wpm the timeline lands at ≈30 s. If the two warnings remain, lengthen those `say` lines ("Try karna hai? Toh suno.") rather than adding durations.

### 14.2 Where the kit falls short of this guideline (and the fix)

| Gap | Guideline target | Kit today | Fix |
|---|---|---|---|
| **Face on frame 0** | A-roll hook with text on f0 | `clip` fades in over 15 f; QA flags a blank thumbnail | Open with `kinetic` / `hook` (the voice is already running), or build the hook in the editor |
| **Word-by-word captions over the face** | Cues of 1-4 words, 0-2 f before onset | `clip.caption` is one static line; `wave` has karaoke but on a waveform | Keep each A-roll `clip` to one ≤8-word sentence and split long sentences into consecutive `clip` scenes; or caption the A-roll in an editor (CapCut, Premiere, DaVinci) using the kit's `voice/*.timing.json` word timings; or add a custom `talk` scene (`docs/ADDING-SCENES.md`) |
| **Jump-cut punch-ins** | 100 ↔ 112-118 % per cut | `clip` has no scale field (push 1.00 → 1.06 only) | Pre-scale alternate segments in the A-roll edit, or use consecutive `clip` scenes cut from pre-cropped files |
| **Face PiP over graphics** | 160-200 px face circle during long cutaways | Not available | Editor composite, or a custom scene |
| **Persistent disclosure label** | "Ad" label visible ≥⅓ of runtime | `kicker` per scene only | Put the kicker on the first 2-3 scenes, or overlay in the editor; always use the platform's Paid-partnership tool |
| **Mobile tap ripple** | Thumb tap with a ripple for phone apps | `prompt` uses a desktop cursor | Fine for web/AI tools; for phone apps use a real screen recording in `clip` (`area: "top"`) with "Show touches" on, or a custom scene |
| **Must-read text ≥52 px** | 52 px floor | QA floor 36 px (30 px hard) | Treat 36-51 px as texture; keep meaning in headline-size fields |
| **Safe box** | x 120-840, y 270-1210 | `reel` box x 96-930, y 260-1340 | Keep captions and CTA copy short so they sit high; check in `npm run preview` |
| **Whoosh budget** | 0-2 per reel | A whoosh on every non-cut transition | `transition: "cut"` plus `"sfx": false` where needed |
| **Stickers / emoji pops, arrows over the face** | ≤1 per 10 s | Not available | Editor |

**Recommended split.** Use the **kit for every graphic cutaway** (it guarantees fit, contrast, safe zones and timing), plus the A-roll inserts via `clip` for a quick version. For a polished creator post, cut the A-roll (jump cuts, word captions, PiP) in an NLE, then drop in the kit-rendered graphic beats. Render the kit with the same `voice/likho.mp3` so its beats line up with the A-roll timeline [inferred].

### 14.3 What needs generative video (Flow / Veo / Sora / Runway / Kling / Higgsfield)

Rule (P11 §21.1): **generate only what may vary; compose everything that must not.**

| Layer | Generate? | Notes |
|---|---|---|
| Analogy b-roll (a chai tapri at dusk, a Mumbai local, a kirana counter with a UPI QR, a phone on a desk) | **Yes** | One camera move per clip, 4-8 s, "large clean empty area in the upper half" for text; then a `clip` scene with `generated: true` [K] |
| Abstract backgrounds, light leaks | Yes (or the kit's theme backgrounds) | Calm motion ≤0.2 % W/f |
| **The creator's face, voice or lip-sync** | **No**, unless it is the creator's own consented digital twin, clearly labelled, and allowed by the platform | Higgsfield AI-influencer / lip-sync tools fall here; never a real third person (P09 SD-V8) |
| UI, captions, numbers, logos, any Devanagari or Latin text | **Never** | Veo adds gibberish subtitles when dialogue is implied; generators can't set exact type (P07 TY-U21) |
| Real products (packaging, devices) | Never | Real photos or supplied renders |
| Generated audio | Discard | Rebuild from the cue sheet (P09 SD-V9) |

**Plate prompt (Indian b-roll):** "Locked-off vertical medium shot, 9:16. A roadside chai stall in Pune at dusk; steam rising from a kettle; a hand places a glass of chai on the steel counter, then withdraws. Warm tungsten practicals, soft blue ambient sky. Large clean empty area in the upper third. Palette navy #0A0E1A and saffron #FF9933 accents. Natural film grain. No speech. 6 seconds." Negative: "text, subtitles, captions, letters, watermark, logo, signboard text, faces in close-up". Clips are 4/6/8 s at 24 fps (Veo 3.1 [P]). Conform to 30 fps with optical flow or by retiming, never by duplicating frames (P08; [V:1Hcg3X] judder). Generate 1.5-2 s longer than needed, 2-4 takes, and log the model, prompt, seed and date (P11 AA-G).

### 14.4 What needs 3D

Rarely needed. Budget at most one 3D beat of 1.5-2.5 s:
- **A 3D phone or app-icon reveal** for a sponsored launch (an inflated or extruded icon, 6-8 % depth, in the accent colour [V:1ccYWJ rule 9] [V:1i2L14]).
- **A 3D object analogy** (a coin stack for compounding, a credit-score dial) when no real object can be filmed.

Build it with `@remotion/three`, Blender, or Higgsfield `generate_3d` → GLB, using one key light matched to the A-roll's key direction (camera-left), and render with the theme background so it cuts cleanly into flat beats (P10 §13).

---

## 15. QC checklist (Creator-Led Explainer Reel)

Severity: ✖ blocks release, ⚠ fix unless justified. Check on the locked cut at 1080×1920 **and on a mid-range Android phone, muted and unmuted**.

**Hook and story**
- [ ] ✖ Frame 0 shows the topic (text and/or face) and works as the thumbnail; first motion by f3.
- [ ] ✖ The hook names the pain in Hinglish in ≤6 on-screen words; payoff by 3 s; no "Hi guys", no logo intro.
- [ ] ✖ One idea; ≤3 steps; the structure follows one template (§4.1).
- [ ] ⚠ Face on screen 30-55 % of the runtime, at 0 s and in the last 5 s; ≤6 s of cutaways without the face (or a PiP).
- [ ] ✖ The story survives on mute (watch it once muted, end to end).

**Captions and text**
- [ ] ✖ Every A-roll sentence is captioned; captions appear 0-2 f before the spoken word, never after.
- [ ] ✖ Captions are 64-80 px, weight ≥700, contrast ≥4.5:1 (≥7:1 or a ≥60 % scrim over footage), inside y 1000-1210 and x 120-840.
- [ ] ✖ No double text: no captions during graphic cutaways or over UI.
- [ ] ✖ The romanisation lock is respected (§12.1); one script per line; no ASR Devanagari leaking into a Roman reel.
- [ ] ✖ Display phrases are still ≥0.7 s; messages hold ≥ max(1.0 s, 0.33 s × words + 0.4 s) × 1.15; the stat is still ≥1.0 s; the CTA is still ≥1.5 s.
- [ ] ✖ Nothing that carries meaning is below 52 px; nothing at all below 36 px; `npm run qa` is clean.

**A-roll picture**
- [ ] ✖ Eyes at y 640-760; head-top ≥ y 300; face not under the right-hand button column.
- [ ] ✖ No 50 Hz flicker or banding (shutter 1/50 or 1/100); no fan shadows; no portrait-mode edge artefacts.
- [ ] ⚠ Every jump cut changes scale by 12-18 %; eyes stay within ±3 % H across punch-ins; no two consecutive cuts at the same scale.
- [ ] ✖ Lip sync within +45 / −125 ms on every A-roll segment (check the first and last word of each `clip`).
- [ ] ⚠ Skin is neutral (no LUT shift); the background is 1-1.5 stops under the face.

**Demo and truth**
- [ ] ✖ Real product UI (recorded or rebuilt), never generated; personal data, UPI IDs and OTPs masked.
- [ ] ✖ Every tap has a press-frame reaction and a 3-8 f consequence; the voice names the action within ±3 f.
- [ ] ✖ Every number has a source or is the creator's real test; numbers are spelled identically across beats.
- [ ] ✖ Sponsored: the platform Paid-partnership tag plus an on-screen "Ad" label from 0 s for ≥⅓ of the runtime; finance claims comply (§12.4).
- [ ] ✖ AI b-roll is tagged `generated: true`; there is no synthetic person without labelling and consent.

**Sound**
- [ ] ✖ −14 LUFS ±1, ≤ −1 dBTP; voice intelligible on a phone speaker over the music.
- [ ] ✖ Music is licensed and instrumental under speech, and runs to the last frame.
- [ ] ⚠ Music is ducked 10-12 dB under the voice; no hit under a stressed word; ≤2 whooshes; no SFX on cuts into the face.
- [ ] ⚠ No room noise (cooker, horn, fan) under words; room tone fills every gap (no digital silence mid-reel).

**Ending and delivery**
- [ ] ✖ One CTA: a 1-3-word action, kicker spoken first, keyword identical in VO, screen and caption; a promised DM really happens.
- [ ] ⚠ The CTA rhymes with the hook (the number, line or colour returns); the last frame loops cleanly to frame 0.
- [ ] ✖ 1080×1920, 30 fps native, H.264 High, yuv420p, BT.709 SDR, AAC ≥256 kb/s at 48 kHz; the file plays to the CTA.
- [ ] ⚠ The 4:5 feed version is re-laid out (`--format portrait`), not cropped; the same strings and timings.

---

## 16. Common mistakes

| # | Mistake | Why it fails | Fix |
|---|---|---|---|
| 1 | **"Hi guys, welcome back to my channel…"** opening | Spends the 1.7 s dwell on nothing; the topic is not on frame 0 | Open on the question; the intro goes, or moves after the CTA |
| 2 | **Static first frames** (a face that starts talking at 0.7 s, a text card that fades in) | Chowdeck's 0.73 s static open is the measured version of this flaw [V:126cpH #1] | Start mid-sentence, text on f0, first change by f3 |
| 3 | **Captions under the platform UI** (bottom 30 %, right 15 %) | Covered by the caption block and buttons [N] | Caption band y 1000-1210, x 120-840 |
| 4 | **Captions and graphic text on screen together** | Double reading; neither is read | One text layer at a time (§10.4) |
| 5 | **Inconsistent Hinglish spelling** ("nahi / nhi / nahin" in one reel) | Reads careless; the same craft flaw as "Designer / Developers" [V:1ccYWJ] (P07 RM-14) | The romanisation lock (§12.1) |
| 6 | **Auto-captions or Whisper output used as display text** | Hinglish English words come out in Devanagari, matras dropped (P07 §9.19 [P]) | Captions from the script; ASR only for timing |
| 7 | **Mixed scripts in one line** | Baselines and leading clash; Devanagari matras clip | One script per line; Devanagari leading 1.25 / 1.5 |
| 8 | **Too fast** (>3.2 words/s, no breaths) | Captions outrun reading; the ×1.15 Hinglish factor makes it worse | 2.5-2.9 words/s; cut words, not air |
| 9 | **Ring light dead-centre, overhead tube light on, fan running** | Flat face, green cast, 50 Hz flicker, moving shadows, hum | Soft key at 45°, kill the overheads and fan, shutter 1/50 or 1/100 |
| 10 | **Shooting 24 fps and delivering 30** | Duplicate-frame judder every 5th frame [V:1Hcg3X] | Record at 30 fps; conform generated b-roll with optical flow |
| 11 | **Jump cuts at the same scale** | Reads as a mistake, not a style | Alternate 100 ↔ 115 % |
| 12 | **UI screenshots at native size** | 14 sp text becomes ≈36-40 px, illegible (G06 #2) | Cut in 1.5-2× or rebuild larger |
| 13 | **Unsourced numbers** ("90 % log yeh galti karte hain") | Credibility, and for finance, regulatory risk | Name the source in the `kicker`, or use the creator's own test, or cut the beat [K] |
| 14 | **Hidden or missing sponsorship disclosure** | Breaks ASCI guidance and viewer trust | Paid-partnership tag + on-screen "Ad" label from 0 s |
| 15 | **Bollywood or trending audio under a brand post** | Copyright claims, muted reels; lyrics fight the voice | A licensed instrumental at 110-128 BPM (P09 SD-U8), ducked 10-12 dB |
| 16 | **Music ends before the picture** | The CTA plays in dead air [V:1ccYWJ] | The tail runs to the last frame |
| 17 | **Several CTAs** ("like, share, subscribe, comment, link in bio") | No action wins | One action; a comment keyword is the default |
| 18 | **Promising a DM that never arrives** | Destroys trust in the next CTA | Promise it only with automation or a real reply plan |
| 19 | **AI lip-sync of a real person, or an unlabelled AI avatar** | Platform policy and legal risk; the uncanny "AI look" | Real A-roll; a labelled, consented digital twin only |
| 20 | **Over-loud master** (−8 LUFS, clipping) | Platforms turn it down; transients are flattened [V:1i2L14] | −14 LUFS, ≤ −1 dBTP, contrast through gaps, not a limiter |
