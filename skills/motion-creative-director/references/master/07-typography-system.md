# Master SaaS Motion Design System, Part 07
## Master §9 Typography Animation Rules

Draft v1, 2026-10-08. Built from frame-measured teardowns of the eight reference videos in the user's folder, plus text-only research. It covers the full Phase-5 brief: type sizes (as % of frame height and in px at 1080p and 1920p), hierarchy, weight, tracking, leading, alignment, placement, every reveal and exit type with frame timings, kinetic-type systems, text-camera interaction, text-to-product transitions, how much text to show at once, and readability in motion. A senior motion designer, an editor or an AI video pipeline should be able to set, animate and QC every word on screen from this part.

Scope. Ease curves and the full speed tables are in Part 03 (Master §5, §18, §19); this part uses their tokens (E-OUT, E-SNAP, E-EXIT, E-WHIP, E-LERP, E-SETTLE, E-PUNCH, E-LINEAR) and the kinetic-type sub-catalogue K1-K18 (Part 03, ML-16). Composition, safe areas and colour contrast are in Part 02 (CO-, CL- rules). Camera moves are in Part 04 (CM-). Transitions are in Part 05 (TR-). This part repeats a number only where a typography decision depends on it, and it refines two Part 03 rules on reading holds (see §9.11 and Appendix A).

---

## 0. How to read this part

**Units**
- **f**: one frame at 30 fps (33.3 ms). 30 f = 1 s.
- **% H**: percent of the frame's own height. In 16:9, 1% H = 10.8 px at 1920×1080 (**@1080p**). In 9:16, 1% H = 19.2 px at 1080×1920 (**@1920p**). **% W**: percent of frame width.
- **Type measures.** The references were measured three ways, so three measures appear:
  - **cap**: height of a capital letter (the most stable measure).
  - **font** (em, the size you type into a tool): font ≈ cap ÷ 0.70 for the geometric grotesks in the set [inferred; the HubSpot teardown's assumption, unconfirmed per face].
  - **x-height** ≈ 0.50-0.53 em; **ascender-to-descender bbox** ≈ 1.15 em [derived from kivi, where bbox 7.2-10.2% H corresponds to font 6.3-8.8% H].
- Values measured at a source resolution (1138, 1280, 1011 or 640 px wide) are converted to 1080p and marked **(computed)** where the conversion is mine.
- **cps** = characters per second. **wps** = words per second.
- **Pulldown caveat.** Wix [V:15VhHR] and HubSpot [V:1CSXtQ] are 25 fps masters delivered at 30 fps with every 6th frame duplicated, so their frame counts here include the duplicates (multiply by 0.833 for true 25 fps frames; the smallest real motion step in them is 40 ms) [V:15VhHR header] [V:1CSXtQ header]. Their 2-8 f durations therefore carry about ±1 f of uncertainty.

**Evidence tags** (the same as Parts 01-05)
- **[V:xxxxxx t=..s]**: the user's reference videos, measured frame by frame. The strongest evidence.
- **[S:brand]** / **[S:playbook]**: Superside text research. **[E]**: ElevenLabs style brief (its motion timings are its author's inferences). **[N]**: design-system tokens, standards, reading-speed and platform data. **[P]**: voice and footage pipeline brief (caption sync, Veo/Flow facts). **[W:site]**: inspiration-site catalogues (titles and descriptions only).
- **[inferred]**: my own judgement, not directly observed or sourced.
- Text-only sources ([S], [E], [W], [P]) support intent, vocabulary and structure. They never support frame-level timing.

**Priority.** The user's references outrank generic advice. Where they disagree, a **"References win"** note says so in place and explains why. The exception is a physical limit (phone pixel density, platform overlays, photosensitivity), where the generic data wins and the note says so. Appendix A collects every ruling.

**Rule IDs used in this part**
- **T-…**: size tokens (§9.2). **TY-W** type selection, size changes, weight, case, tracking and leading; **TY-H** hierarchy; **TY-P** placement (§9.1-9.5).
- **RV-01 … RV-28**: reveal (entrance) cards (§9.6). **EX-01 … EX-16**: exit cards (§9.7).
- **KT-01 … KT-11**: kinetic-type systems with frame recipes (§9.8).
- **TC-01 … TC-15**: text-camera rules (§9.9). **TP-01 … TP-18**: text-to-product transitions (§9.10).
- **RM-01 … RM-24**: readability-in-motion rules (§9.12).
- **TY-U / TY-S / TY-X / TY-A / TY-SaaS**: universal principles, style-specific rules, experimental techniques, techniques to avoid, techniques especially good for SaaS (§9.13-9.17).
- Class tags: **U** = measured in 3 or more references, none contradicting. **S** = style-specific. **X** = experimental (one reference, or untested). **A** = avoid. **SaaS** = especially good for SaaS.

### Reference roster

| Tag | Reference | Frame / length | Style |
|---|---|---|---|
| [V:1-6l8S] | kivi, voice-AI dictation launch | 16:9, 77.8 s | Minimal Premium × soft-cinematic UI demo |
| [V:126cpH] | Chowdeck delivery-app ad (measured through a crop of an AE screen capture; animated on twos) | 9:16, ~18 s | Playful illustrated collage + UI demo |
| [V:15VhHR] | Wix AI site builder | 16:9, 53.9 s | UI demo inside an editorial brand frame |
| [V:19NRDv] | Bumper PRO payments launch | 16:9, 67.2 s | Kinetic-type launch with 3D UI proof |
| [V:1CSXtQ] | OpenAI × HubSpot connector spot | 16:9, 30 s | Minimal Premium, prompt-native, one 3D beat |
| [V:1Hcg3X] | "How do solar panels work?" | 16:9, 35.8 s | Editorial 2.5D explainer |
| [V:1ccYWJ] | Lottieicon icon-library promo | 16:9, 44.3 s | Fast startup launch, dark neon |
| [V:1i2L14] | NOSTRA studio promo | 16:9 inset, 35 s | Monochrome brand-system explainer |

### 0.1 Typography census: what the eight references actually do

Sizes converted to 1080p (16:9) or 1920p (9:16, Chowdeck). Font sizes derived from cap heights are (computed).

| Ref | Copy family (identity inferred) | Accent face (one role) | Weights | Case | Statement size | Hero size | Max words / read frame | Landed hold (statements) | Signature type device | Type flaw the teardown flags |
|---|---|---|---|---|---|---|---|---|---|---|
| kivi [V:1-6l8S] | Humanist-geometric sans (Google-Sans-like) | Serif, wordmark only | 400 | Sentence | Font 6.3-8.8% H (68-95 px) | "Meet" font ≈10% H (108 px); wordmark 15.4-21% H asc-baseline | 6 (UI card ~20) | ≈0.6-1.1 s; cards 1.2-1.9 s | Live-append + smoothed re-centre; two-tone line | UI micro-text 1.2-2% H; words overlap on one exit |
| Chowdeck [V:126cpH] | Heavy rounded geometric sans + bold grotesk payoff | — | Black (≈900); Bold | lowercase; Title Case payoff | Payoff em ≈190 px @1920 (9.9% H) | "chow?" em ≈320 px @1920 (16.7% H) [inferred em] | 5 | ≥0.7 s (flaws at 0.45 s and 2 f) | Pop-on + boil; small setup word over huge punch word | Rays cross the claim; UI 1% H; status shown 2 f |
| Wix [V:15VhHR] | Geometric humanist grotesk (Wix Madefor-like) | Generated-site display faces | 400 | Sentence | Cap 6.6% H (71 px cap ≈ 101 px font) | Macro hook cap 49% H (530 px), bleeding | 7-word line incl. an icon; **11 words of ad copy in 54 s** | ≥1.0 s dead-still before motion | Scale-contrast cut; inline object chips; AI-gradient settle | "make" vs "create" copy break across a cut; UI 1-1.5% H |
| Bumper [V:19NRDv] | Geometric grotesk (Satoshi/General-Sans-like) | Heavy rounded display (PRO, BUMPER) | 500 / 600; display ≈900 | Sentence; caps wordmark | Phrase cap 4.5-5.5% (70-85 px font); headline cap 8-9% (≈130 px font) | Cap 15-23% (230-360 px font); PRO cap ≈33% (≈505 px font) | 6 (typical 2-4) | 0.6-1.6 s | Oversize slam-down + word build + pull-back | Caption clipped by frame edge 5 s; bloom smears letters; same grammar ×12 |
| HubSpot [V:1CSXtQ] | HubSpot-Sans/Lexend-like | — | 400 typed; 500 cards; 700 on one word | Sentence, terminal period | Cap 5.8% H (≈63 px cap, ≈90 px font) | — (hook cap 3.6-3.9%, flagged small) | 9 typed; 2-5 per card | Cards 1.1-2.2 s total | Typed headline becomes UI; staircase collapse; word-spacing match cut | Hook too small for phones; 4 same-size cards in a row |
| Solar [V:1Hcg3X] | Helvetica-like grotesk + transitional serif | Serif = concept words | Bold grotesk; bold serif title | CAPS title; lowercase concept; Title Case labels | Message cap 5.6% (≈84 px font) | "SOLAR" cap 11.6% (≈175 px font); concept words font 12.5-13% | 6 (typical 1-2) | Labels ≈1-2 s; message complete only 0.4 s (flaw) | World-space labels, 2-5 f blur-fade | Recap labels 2.2-2.5% H; payoff block 0.4 s |
| Lottieicon [V:1ccYWJ] | Rounded geometric sans (Gilroy-like) | Italic serif, 4 audience words | 500; 400 small; 600 labels | Sentence | Em 6.7-10.8% H (72-116 px) | "So" em ≈44% H (≈470 px; cap 31%) | 7 (typical 1-5) | Hero words 10-12 f; lines ≈0.5-0.7 s | Snap-hold-suck; auto-fit type-on; slot swap | Chips 1.5%, URL 2%; 6 text cards in a row; copy inconsistencies |
| NOSTRA [V:1i2L14] | Montserrat-like wide geometric sans | Custom bold-italic wordmark | 600; 800 label | ALL CAPS | Cap 5.6% H (≈87 px font) | Cap 8.5-11% H (130-170 px font) | 3 | 10-23 f | Scatter-swap-converge; mask wipe-off and re-type | 23-26 f pixel build; mixed languages |

### 0.2 What the census says

1. **One sans carries all copy in 8 of 8.** Five of eight add a second face, and every time it is confined to **one role**: the wordmark (kivi), the variable audience word (Lottieicon), the concept vocabulary (Solar), the product name (Bumper), generated customer content (Wix). No reference mixes two text faces for the same job.
2. **Statement type is smaller and lighter than "big bold" advice.** Single-line statements sit at **cap 4.4-6.6% H (font 68-101 px @1080)** in six of seven 16:9 films. Size jumps are reserved for 1-2-word hero words (cap 10-23%) and one climax word (cap 31-33%).
3. **Weight follows positioning, not canvas colour.** Calm premium films set statements in Regular 400 (kivi, Wix, HubSpot's typed text; [E] uses Light 300). Launch-energy films use Medium/SemiBold 500-600 (Bumper, Lottieicon, NOSTRA, HubSpot cards). Only the playful consumer ad goes to Black ≈900 (Chowdeck), and only one launch film uses ≈900, for its product name (Bumper PRO).
4. **≤6 words per read frame** in 7 of 8; typical is 2-4. The one exception is a typed prompt (HubSpot, 9 words), which the viewer reads during typing.
5. **No overshoot on type in any reference** (8 of 8). No per-letter rotation or bounce except deliberate semantic moments (Bumper ×3, NOSTRA ×1), each under 1 s. Two near-misses that are not exceptions: Chowdeck's tossed UI card (which carries text) overshoots ≈4° in rotation [V:126cpH t=9.43-9.60s], and NOSTRA's "SOLUTION" label resolves at ≈1.25× and settles to 1.0 in 4 f, an oversize-and-settle that decelerates into its target without passing it [V:1i2L14 Study I].
6. **Every reference reveals type sequentially**, by word, line or letter, at a spoken or musical rhythm. None reveals a whole sentence with one fade.
7. **Type almost never sits dead still.** Six of eight keep a drift, push or shrink on every hold until the final lockup.
8. **Readability failures cluster in two places:** micro-text at 1-2% H that carries meaning (6 of 8), and payoff text fully on screen for less than 0.5 s (Solar, Chowdeck). No teardown flags a correctly sized statement card as unreadable.
9. **Text sits on near-empty fields.** Statement frames are ≥85% empty (Wix ≈85%, HubSpot 92-95%, kivi ≤8.5% type coverage, all from Part 02 CO-U7).

### 0.3 Defaults card: the 25 typography numbers to encode first

| # | Parameter | Default | Range seen | Evidence |
|---|---|---|---|---|
| 1 | Families | 1 sans for all copy + ≤1 accent face with exactly one role | 1-2 faces | 8/8 refs (§9.1) |
| 2 | Statement size (T-STATEMENT) | Cap 5.8% H = 63 px cap, **90 px font @1080**; 9:16 **128 px font @1920** [inferred: a pick inside [N]'s 96-160 px headline range; [E] uses 112 px] | Cap 4.4-6.6% H (68-101 px font) | [V:1CSXtQ] [V:1-6l8S] [V:15VhHR] [V:1i2L14] [V:1Hcg3X]; 9:16 [N] [E] |
| 3 | Hero word (T-HERO) | Cap 12% H = 130 px cap, **185 px font @1080**; **240 px @1920** [inferred; the only 9:16 reference sets "busy?" at ≈260 px and "chow?" ascender ≈240 px [V:126cpH §Typography]] | Cap 10-23% H | [V:19NRDv] [V:1Hcg3X] [V:1i2L14] [V:1ccYWJ] [V:126cpH] |
| 4 | Climax word (T-MEGA) | Cap 31-33% H (460-510 px font @1080) | — | [V:1ccYWJ t=38.00s] [V:19NRDv t=59.90s] |
| 5 | Setup : hero size ratio | **1 : 2.5-3** | 1:2.1 to 1:6 ("order in" 4% over "seconds" 8.4% H is 1:2.1 [V:126cpH §Typography]) | [V:126cpH] [V:1Hcg3X] [V:19NRDv] |
| 6 | Readability floors | Cap ≥2.5% H (read class); **cap ≥3.6% H mobile-safe**; sentences for phone-inline 16:9 ≥84 px font; 9:16 body ≥52 px, floor 36 px | — | Part 02 CO-U5; [V:1Hcg3X §8]; [N] |
| 7 | Weight | 400 calm premium / 500-600 launch / 800-900 playful | 300-900 | §9.4 |
| 8 | Tracking | 0 on lines; −1 to −3% on lowercase display; 0 to +3% on display caps | −4% to +3% | §9.4 |
| 9 | Leading | 0.95-1.1 on display multi-line; 1.4-1.6 in UI body | 0.9-1.6 | [V:19NRDv] [V:126cpH] [V:1Hcg3X] [V:1-6l8S] |
| 10 | Statement placement | Centred; centre-line y 47-52% H; width 35-70% W, ≤85% W for one line of ≤6 words | 24-84% W | Part 02 CO-U11; 6/8 refs |
| 11 | Words per read frame | **≤6**; typed prompt ≤9-10; 2-4 typical | 1-9 | 7/8 refs |
| 12 | Word interval in a build | **8 f** (an eighth note at ≈110 BPM); 2-3 f in fast cards; 3-8 f in dictation streams | 2-10 f | [V:19NRDv] [V:1-6l8S] [V:15VhHR] [V:1i2L14] |
| 13 | Word or line entrance | Slide 4-7 f; rise + blur 9-12 f; label blur-fade 2-5 f | 1-18 f | §9.6 |
| 14 | Exit | 4-8 f, about half the entrance, E-EXIT or E-WHIP | 1-18 f | [V:1-6l8S §6] [V:1ccYWJ] [V:19NRDv] |
| 15 | Holds | Punch word 10-15 f; ≤3-word kinetic line ≥10-14 f landed; 4-6-word statement ≥0.8 s landed (1.2-1.9 s total); messages, captions and busy plates: [N] formula; payoff ≥1.0 s; end lockup ≥1.5 s still (2.2 s premium) | — | §9.11 |
| 16 | Motion while the text is read | Translation ≤0.2% W/f; scale drift about the text's own centre ≤0.6%/f (calm) or ≤1.5%/f (kinetic launch) | Translation 0.12-0.25% W/f; scale 0.3-3.5%/f measured | [V:1-6l8S] [V:1CSXtQ] [V:1Hcg3X] [V:19NRDv]; Part 04 |
| 17 | Overshoot on type | **0%** | 0% in 8/8 | §9.13 TY-U5 |
| 18 | Typing (display or prompt) | Filler 28-35 cps, key phrase ≈9 cps, 0.9-1.1 s phrase pauses; ECU 7-8 cps | 4-55 cps | [V:1CSXtQ] [V:15VhHR] [V:126cpH] [V:1ccYWJ] |
| 19 | Caret | Blink 9 f on / 9 f off; locked at 65-66% W once the line passes centre | — | [V:1CSXtQ t=4.5-7.67s] |
| 20 | Streaming | Speech pace 4-7 wps, each word 30-40% → 100% opacity in 3-4 f; machine pace 1 word per 2 f | — | [V:1-6l8S t=9.55-20.45s] |
| 21 | AI-written text colour | Gradient for 4-12 f, settled to the final colour within 6-8 f | 4-18 f | [V:15VhHR t=7.87s, 12.53s, 36.6s] |
| 22 | Contrast | ≥4.5:1; 3:1 only for large text; 7:1 over footage; scrim ≥60% | — | [N]; Part 02 §11.3 |
| 23 | Glow on type | Dark energetic styles only; radius ≤2-3% of cap height | 0 to ≈6-8% (flagged) | [V:19NRDv t=7.2s]; Part 02 CL-A4 |
| 24 | Repetition | Semantic letter tricks ≤3 per film (9-30 f each); one reveal grammar ≤6 uses before it varies; ≤3 consecutive text-only cards | — | [V:19NRDv rule 5, avoid]; [V:1-6l8S] [V:1ccYWJ] [V:1CSXtQ] |
| 25 | Sync | A word never appears after its sound; it may lead by ≤2 f (≈67 ms) | Picture leads the beat 0-2 f | [P]; [V:19NRDv §11] |

---

# Master §9. Typography Animation Rules

## 9.0 Why typography decides the premium read

In these films the type is the narrator. None of the eight relies on a voice-over to carry the argument: five have no voice-over (HubSpot, Bumper and Lottieicon measured; Wix and Chowdeck inferred from the audio), kivi's voice is in-world dictation, and Solar's and NOSTRA's VO is unconfirmed [V:15VhHR §Sound] [V:19NRDv §12] [V:1CSXtQ §12] [V:1ccYWJ §12] [V:126cpH §Sound] [V:1-6l8S §12]. The text-only research agrees: SaaS videos are designed for sound-off viewing [S:playbook §1.11], and inspiration sites describe the house style as "bold type, dark, kinetic", "crisp typography", "restrained typography" [W:motion.so].

Typography is also where amateur work shows first, for three reasons [inferred from the census]:
- **The eye fixates on words.** A viewer forgives an imperfect camera ease, but not a word that wobbles, overshoots, smears or vanishes before it is read.
- **Text is the one element a generator cannot be trusted with.** Generative video "cannot set exact typography" [N §6] and adds gibberish subtitles when a prompt implies dialogue [P §8]. So in an AI pipeline, type is always composited, and its quality depends entirely on the rules below.
- **Restraint is measurable in type.** One family, one accent word per line, Regular weight, small sizes and long holds are the clearest premium signals in the set (§0.2).

---

## 9.1 Type selection: families, roles and pairing

**TY-W1 [U]. One sans family carries all copy. Add at most one accent face, and give it exactly one role.**
- Evidence: one sans in 8 of 8; accent faces confined to one role in 5 of 8 (census §0.1).
- Why: a single family turns every card into one voice. The accent face then works as a signal ("this word is special") only because it is rare. Lottieicon's italic serif appears on four audience words and nowhere else, which "makes four near-identical cards feel designed rather than templated" [V:1ccYWJ §4 WHY 5-8].

**Role table.** Decide the role of every string before choosing its size.

| Role | Face | Typical use | Evidence |
|---|---|---|---|
| Statement / claim | Main sans | Every claim card, every line of kinetic copy | 8/8 |
| Hero word / product name | Main sans at heavier weight, or the brand display face | "One", "Save", "PRO"; "So" | [V:19NRDv t=2.40s, 59.90s] [V:1ccYWJ t=38.0s] |
| Concept vocabulary (explainers) | Serif accent | "SOLAR", "photo", "voltaic" | [V:1Hcg3X §8] |
| Variable word in a slot | Contrasting italic serif | "For *Designer* / *Developers*…" | [V:1ccYWJ t=5.43-7.30s] |
| Wordmark | The official logo file, never typed | All 8 | [E] ("IIElevenLabs" typed in capitals is on the brand's avoid list) |
| UI text | The product's own UI font | Real UI in kivi, Wix, HubSpot, Bumper | [V:15VhHR §UI] [V:1CSXtQ §9] |
| Code / tokens | Monospace | "KIVI WRITES:" code card; [E] uses Geist Mono for tags | [V:1-6l8S t=59.73s] [E] |
| Numbers that count | Main sans with tabular figures [inferred] so digits do not jitter in width | Counters 84 → 100%, 43 → 4,863 | [V:19NRDv t=23.90s] [V:1ccYWJ t=9.93s] |

**TY-W2 [U]. Choose the family by the product's promise, then keep it for the whole film.**

| Positioning | Family character | Observed | Free stand-ins (families and axes from [N]; which family suits which positioning is [inferred]) |
|---|---|---|---|
| Calm, assistant, voice, AI | Humanist or neo-grotesk sans at 300-400 | kivi, HubSpot, Wix; ElevenLabs uses Waldenburg 300 [E] | Inter / Inter Tight 300-400; Geist 300 [E] |
| Launch energy, fintech, B2B ops | Geometric grotesk at 500-600, plus one heavy rounded display cut for the product name | Bumper | Manrope, Sora, Bricolage Grotesque (opsz 12-96, wdth 75-100) |
| Creator tools, dev tools, dark neon | Rounded geometric sans at 500 | Lottieicon | Manrope, Sora |
| Brand system, agency, all caps | Wide geometric sans at 600-800 | NOSTRA | Archivo (wdth 62-125), Unbounded |
| Editorial explainer | Grotesk labels + transitional serif concept words | Solar | Inter + Instrument Serif or Fraunces |
| Playful consumer | Heavy rounded geometric, lowercase | Chowdeck | Baloo 2 (400-800, Devanagari too), Poppins 800-900 |
| Brand fonts named in the text research | Agrandir (Bolt), Figma Sans condensed for display + regular for body (Figma), Lato (Snowflake) | — | [S:Bolt] [S:Figma] [S:Snowflake] |

Pairing note: the suggested pairs in [N] (Instrument Serif + Inter Tight; Fraunces + Inter; Bricolage Grotesque + Inter) are taste suggestions [N, unverified], consistent with Solar's serif + grotesk split [V:1Hcg3X §8].

**TY-W3 [U]. Logos are artwork, not type.** Use the official SVG for every wordmark and lockup. Never retype a logo in a font, never animate it letter by letter unless the brand's own files are split per glyph (Bumper reveals BUMPER per letter [V:19NRDv t=61.47s], presumably from split brand artwork [inferred]). Why: retyping the wordmark is on ElevenLabs' explicit avoid list [E], and in an AI pipeline a generated wordmark will drift between shots (Master §21 Anti-AI-Look, Phase 10).

---

## 9.2 Size system

### 9.2.1 How sizes transfer between formats

- Sizes are given as **% of the frame's own height** and in px. 16:9 values use H = 1080. 9:16 values use H = 1920.
- **9:16 is a re-layout, not a crop** (Part 02 CO-U18). The 9:16 text-safe column is only 720 px wide (x 120-840) [N], so statements break into 2-3 short lines and grow in px, while their % H falls.
- **Physical size on a phone decides the floor** [N]: a 9:16 video fills an upright phone (1 video px ≈ 0.364 pt), while a 16:9 video played inline on an upright phone shrinks to 1 px ≈ 0.205 pt. 11 pt (Apple's minimum) is ≈30 px in 9:16 but ≈54 px in 16:9-inline (computed from [N]).

### 9.2.2 The size ladder (tokens)

| Token | Role | 16:9 cap % H | 16:9 px @1080 (cap / font) | 9:16 font px @1920 (% H) | Max width | Weight band | Evidence |
|---|---|---|---|---|---|---|---|
| **T-MEGA** | One climax word or product name, ≤0.5 s; or a bleeding macro hook ≤0.7 s | 31-33% (macro hook 45-50%, bleeding) | 335-356 / 480-510 (macro cap ≈530) | 280-380 (14.6-19.8%) | 16:9 ≤74% W; 9:16 ≤84% W only if ≥8% H (Part 02 §4.7) | 500-900 | "So" cap 31% [V:1ccYWJ t=38.00s]; PRO cap ≈33% [V:19NRDv t=60.1s]; macro 49% [V:15VhHR t=0-0.63s] |
| **T-HERO** | 1-2-word hero word | 10-23%, default **12%** | 108-248 / 155-355; default **130 / 185** | 200-280 (10.4-14.6%), default **240** | ≤60% W [inferred] | 500-600 (400 in calm films) | Bumper 15-23% [V:19NRDv §8]; "SOLAR" 11.6% [V:1Hcg3X t=0.37s]; "IMAGINE" 10.3%, "SOLUTION" 11% [V:1i2L14 §8]; Lottieicon em 13.6-16.7% [V:1ccYWJ §8]; "chow?" asc 12-13% of 1920 [V:126cpH t=0.73s] |
| **T-STAT** | A number that is the claim | Font 10-22% standalone; inside UI, cap ≥6% | — / 108-240 | 220-320 (11.5-16.7%) [inferred] | — | 300-600 | "50 + Categories" em ≈10% [V:1ccYWJ t=14.73s]; "100%" cap ≈6% inside a card [V:19NRDv t=24.93s]; stat card 240 px @1080 [E, inferred] |
| **T-DISPLAY** | 2-4-word headline, two-line headline, payoff block | 7.9-11% | 85-119 / 122-170 | 140-200 (7.3-10.4%) | ≤70% W | 500-800 | Bumper headline cap 8-9% [V:19NRDv t=25.6s]; "MOTION DESIGN" 8.5% [V:1i2L14 t=13.97s]; "PANELS" 7.9% [V:1Hcg3X]; Chowdeck payoff cap 7-7.5% of 1920 [V:126cpH t=13.60s] |
| **T-STATEMENT** | Default single-line claim, 3-6 words | 4.4-6.6%, default **5.8%** | 48-71 / 68-101; default **63 / 90** | 96-190 (5-9.9%), default **128** (6.7%) on 2-3 lines | 35-70% W, ≤85% W for one line ≤6 words | 300-500 | HubSpot cap 5.8% [V:1CSXtQ t=21.47-27.37s]; Wix 6.6% [V:15VhHR t=0.63s]; NOSTRA 5.6% [V:1i2L14 t=7.57s]; Solar message 5.6% [V:1Hcg3X t=28.97s]; kivi font 6.3-8.8% [V:1-6l8S §8]; 9:16 headlines 96-160 px [N], [E] 112 px (128 px is [E]'s 16:9 value) |
| **T-SUPER** | Setup word, supertitle, kicker, connector | 3.6-5.5%, default **4.5%** | 39-59 / 56-85; default **49 / 70** | 72-106 (3.8-5.5%) | ≤60% W | 400-600 | Bumper phrase/supertitle 4.5-5.5% [V:19NRDv §8]; "A WAY" 5.5% [V:1i2L14 t=0.70s]; Chowdeck setup words 4-5.5% of 1920 [V:126cpH]; HubSpot hook 3.6-3.9% (flagged as weak on phones) [V:1CSXtQ §13] |
| **T-LABEL** | World-space or flank label, chip label, card label (1-3 words) | 3.6-4% | 39-43 / 56-62 | 60-72 (3.1-3.75%) | Fits its object | 600-700 | Solar labels 3.6-4% [V:1Hcg3X §8]; card labels ≈3% SemiBold [V:1ccYWJ t=16.10s] |
| **T-UI-READ** | UI text that must be read: prompt, typed field, notification, status, result | Cap 2.8-4.2% (font 4-6%); at ECU cap 4.2-7.5% | 30-45 / 43-64; ECU 64-115 font | ≥52 (2.7%) | Inside the UI | 400 | kivi card body font 3.5-4%, leading 1.6 [V:1-6l8S t=18.37s]; HubSpot typed font 4.8%, ECU 6.0% [V:1CSXtQ §8]; Wix ECU input cap ≈7.5% [V:15VhHR t=6.57s]; Chowdeck notification 52 px @1920 [V:126cpH t=11.07s] |
| **T-CAPTION** | VO caption, 1-2 lines | ≈3.6-4% (font 4.8-5.6%) | 39-43 / 52-60 | 60-75 (≥52) | Lines ≤68% W, ≤42 characters | 500 | [N] (BBC 68% width; Netflix 42 characters per line; creator consensus 60-75 px, unverified); 2-line cues of 2-4 s [S:Thomson Reuters] |
| **T-WORDMARK** | Logo alone or with product name | Cap 7-12% | 76-130 cap | Cap ≈77 px (4%) at 56-62% W | Alone 17-26% W; with product or co-brand 50-57% W | Brand | Wix 12.2% / 17% W [V:15VhHR t=51.37s]; NOSTRA 7.2% / 26% W [V:1i2L14 t=32.17s]; Bumper 11% / 57% W [V:19NRDv t=61.47s]; HubSpot box 9.6% / 50% W [V:1CSXtQ t=10.37s]; kivi asc 15.4-21% [V:1-6l8S t=71.10s]; Chowdeck [V:126cpH t=16.20s] |
| **T-URL** | URL, handle | Font ≥5% (bbox ≈5.8%) | ≥54 font | ≥52 | — | 400-500 | kivi 54 px works [V:1-6l8S t=75.53s]; Bumper ≈24 px cap and Lottieicon ≈2% are flagged [V:19NRDv §8] [V:1ccYWJ §13] |
| **T-CTA** | Button label in a pill | Cap ≈5.3% in a pill 37% W × 11% H | 57 / 81 | 56-64 [inferred] | Pill ≤67% W in 9:16 [inferred] | 700 | "BOOK NOW" [V:1i2L14 t=32.87s] |
| **T-TEXTURE** | UI micro-copy, prop paragraphs, axis labels | ≤2% | ≤22 | <36 | — | any | Unreadable by design in 6/8 (Part 02 CO-U5) |

> **Evidence note on the 9:16 column.** Only Chowdeck [V:126cpH] is measured in 9:16, and it is measured through a ≈256×470 px crop of a phone-filmed monitor, assuming a 1080×1920 comp [V:126cpH header, inferred]. Every 9:16 px value in this table that does not cite [V:126cpH] or [N] (T-MEGA, T-STAT, T-LABEL, T-CTA and the upper ends of T-HERO and T-DISPLAY) is **[inferred]**: the 16:9 role re-laid into the 720 px text column and checked against [N]'s floors (36 / 52 px) and headline range (96-160 px).

**Floors (one table, so a validator can enforce them).**

| Class | 16:9 @1080 | 9:16 @1920 | Why | Evidence |
|---|---|---|---|---|
| Texture (meaning must not depend on it) | Any size below the read floor | Below 36 px | Unreadable is acceptable only if obviously decorative | Part 02 CO-U5 |
| Read floor (anything that carries meaning) | Cap ≥2.5% H (27 px cap) | ≥36 px font | Below this the references themselves call the text illegible | [V:1-6l8S §13] [V:1ccYWJ §13] [N] |
| Mobile-safe label (≤3 bold words next to a hero) | Cap ≥3.6% H (39 px cap ≈ 56 px font) | ≥60 px | Solar's labels at 3.6% read in every main scene; its 2.2-2.5% recap labels are the only ones flagged | [V:1Hcg3X §8] |
| Sentence for phone-inline 16:9 delivery | Font ≥84 px | — | Physical pt size on an upright phone | [N] |
| 9:16 body / caption | — | ≥52 px (captions 60-75) | Physical pt size | [N] |

> **Generic advice wins here (physical limit).** kivi sets some statements at 68-80 px font in 16:9 [V:1-6l8S §8] and they read on a desktop or X player. For a 16:9 master that will play inline on phones, the [N] floor of 84 px for sentences wins, because it is a pixel-density limit, not a taste choice. The default T-STATEMENT (90 px) already clears it. Labels of ≤3 bold words may stay at the reference value of cap 3.6% H (≈56 px font), because Solar shows them reading cleanly next to a hero [V:1Hcg3X §8].

### 9.2.3 Width and line capacity

Characters per line at an average glyph width of ≈0.55 em [N, derived]:

| Font px | 16:9 at 70% W (1344 px) | 16:9 at 85% W (1632 px) | 9:16 text column (720 px) |
|---|---|---|---|
| 64 | 38 | 46 | 20 |
| 90 | 27 | 33 | 14 |
| 128 | 19 | 23 | 10 |
| 185 | 13 | 16 | 7 |
| 240 | 10 | 12 | 5 |

Use it to break lines before animating:
- A 5-word, ≈30-character statement fits one 16:9 line at 90 px (≤85% W), but needs three 9:16 lines at 128 px.
- In 9:16, a hero word longer than ≈5 characters cannot reach 240 px inside the 720 px column. Either drop to 180-200 px or allow the Part 02 §4.7 exception (≤84% W, ≥8% H).
- Line breaks fall on phrase boundaries, never inside a noun phrase [inferred]. kivi splits every statement at its subject/benefit seam ("Your spreadsheet, | powered by voice.") [V:1-6l8S t=62.93s].

### 9.2.4 Size changes in motion

**TY-W4 [U]. A size change is an event. Make it on a cut or in a single fast move, never as a slow creep the eye can see stalling.**
- On a cut: the scale-contrast cut from macro cap 49% H to cap 6.6% H on the same words (≈7.4×) [V:15VhHR t=0.633s].
- In one move: slam-downs of 3-4× → 1× in 8-13 f [V:19NRDv t=0.00s]; scale pops of +40-55% in 6 f [V:1ccYWJ t=1.87s].
- Slow scale drift *is* allowed when it is continuous across the whole hold, centred on the text, and below ≈0.6%/f in calm styles (HubSpot cards shrink 13-24% over 1.1-2.2 s [V:1CSXtQ t=21.9-27.3s]; kivi holds push 7-29% over 0.5-2.5 s [V:1-6l8S §7]) or ≈1.5%/f in kinetic launch styles (Bumper's lines shrink ≈1.5%/f while they build [V:19NRDv t=1.50-2.37s]); see TC-02.
- Why: a fast change reads as intentional choreography. A slow change that starts and stops mid-hold reads as a layout bug.

---

## 9.3 Hierarchy

**TY-H1 [U]. One text level per frame is the premium default; two levels need a ratio of at least 1 : 2.5.**
- One level: HubSpot sets "one text level per frame" and moves hierarchy between frames by weight, colour and scene-to-scene size jumps [V:1CSXtQ §8].
- Two levels: setup word over punch word at 1 : 2.5-3 ("been" ≈5% over "busy?" ≈13.5% H ≈1:2.7; "You don" cap ≈4% over "chow?"; "order in" ≈4% over "seconds" ≈8.4% H is only ≈1:2.1, the low end) [V:126cpH §Typography]. Supertitle over a giant word at about 1 : 6 in Bumper's finale (cap 4.5-5.5% over cap 33%) [V:19NRDv t=56.67-61.47s].
- Three levels only in a title stack or an editorial layout: Solar's title runs connectors (cap 2.8%) / "SOLAR" (11.6%) / "PANELS" (7.9%) [V:1Hcg3X t=0.10-0.90s]. Adjacent levels differ by at least ×1.45 (PANELS : SOLAR = 0.68).
- Why: in motion the eye has about 1.7 s per feed item [N]. With one level, it never has to decide where to look. With two levels at ≥1:2.5, the order is unambiguous. With a ratio under ≈1:1.4, the levels compete and the frame reads as a slide [inferred].

**TY-H2 [U]. Emphasis toolkit, ranked by how often the references use it. Use at most two tools on the same word [inferred].**

| Rank | Tool | Specification | Evidence |
|---|---|---|---|
| 1 | **Accent colour on the benefit phrase** (two-tone) | Neutral words in ink, the benefit phrase in the brand accent; one accent phrase per line | kivi sage #556962 / #396454 on the benefit [V:1-6l8S §8]; Bumper orange #F4643C (large) / #E46C54 (small) [V:19NRDv §8]; NOSTRA one green word per line [V:1i2L14 §8]; Chowdeck yellow punch word over white setup [V:126cpH t=1.60s, 2.53s] |
| 2 | **Arrival order** | The accent phrase arrives last, +1-8 f after the neutral part | kivi +1-8 f [V:1-6l8S t=28.60s, 37.35s, 62.93s]; NOSTRA's green word usually ends the line ("ADS", "STRESS", "SURPRISE") [V:1i2L14 t=7.57s, 30.63s] |
| 3 | **Weight** | One word Bold among Regular, same size | "first" Bold, others Regular [V:1CSXtQ t=0.067s]; Bumper hero words 600 vs phrases 500 [V:19NRDv §8] |
| 4 | **Size** | Setup : punch ≥1 : 2.5 | [V:126cpH] [V:1Hcg3X] |
| 5 | **Face switch** | The accent face on the one variable or concept word | [V:1ccYWJ t=5.43s] [V:1Hcg3X t=16.85s] [V:19NRDv t=59.90s] |
| 6 | **De-emphasis** | Function words lighter (≈60% opacity); superseded text dimmed to ≈40-50% | Bumper "like a" in lavender-grey [V:19NRDv t=0.00s] and rule 3; kivi raw transcript dims to ≈50% [V:1-6l8S t=13.77s]; [E] earlier list lines drop to #a8a29e |
| 7 | **Motion of meaning** | The key word acts out its meaning, ≤3 times per film | $-scramble on "thousands", self-assembling "Automatically", kick-bounce "Kick" [V:19NRDv t=7.68s, 14.33s, 46.13s]; arc-wave "OVERCOMPLICATE" [V:1i2L14 t=9.70s] |
| 8 | **Light** | Shimmer sweep on AI-improved text; glow on dark | 0.8 s L → R sweep [V:1-6l8S t=15.0-15.8s]; 12 f AI sweep [V:15VhHR t=18.73s] |

- Why the accent goes last: the neutral part sets up a question and the accent answers it, so the eye's last fixation lands on the benefit [inferred]. Part 02 states the same colour rule as "neutral first, accent last".
- Text research agrees on one emphasised phrase per headline: Superside's web headlines italicise one key phrase each [S:Superside], and [N] recommends one accent colour per video on one element per scene [N, unverified].

**TY-H3 [S]. Hierarchy across frames (sequence) beats hierarchy inside a frame for premium films.** HubSpot and kivi never put two type sizes in one statement frame; they cut from a small statement to a large wordmark, or from a typed line to a macro typed line [V:1CSXtQ §8] [V:1-6l8S §8]. Use in-frame hierarchy for playful, editorial and kinetic-launch styles (Chowdeck, Solar, Bumper).

---

## 9.4 Weight, case, tracking and leading

### 9.4.1 Weight

**TY-W5 [U]. Weight follows positioning (census point 3).**

| Positioning | Statement weight | Hero / display weight | Evidence |
|---|---|---|---|
| Calm premium, assistant, voice | 400 (300 for display ≥96 px on light canvases, [E]) | 400 wordmark-led | [V:1-6l8S] [V:15VhHR] [V:1CSXtQ] typed; [E] Waldenburg 300 |
| Launch energy, kinetic | 500 | 600; product name ≈900 | [V:19NRDv] [V:1ccYWJ] [V:1CSXtQ] cards |
| Brand-system caps | 600 | 800 (knock-out labels) | [V:1i2L14] |
| Editorial labels | 700 grotesk; serif concept words 400-700 | Bold serif title | [V:1Hcg3X] |
| Playful consumer | 800-900 | 900 | [V:126cpH] |

- Why: light weights at modest sizes read as confidence ("a small, quiet sentence reads as confidence" [V:15VhHR WHY #1→#2]); heavy weights read as volume and energy.
- **Do not go below 400 on dark gradients delivered at low bitrate** [inferred]: [N §5] warns that yuv420p delivery bleeds thin, saturated coloured text and bands dark gradients; extending that to thin light strokes on dark fields is my inference. Lottieicon's dark gradients already macro-block at its delivery bitrate [V:1ccYWJ §13].

### 9.4.2 Case

**TY-W6 [U]. Sentence case is the default** (kivi, Wix, Bumper, HubSpot, Lottieicon; Chowdeck lowercase). ALL CAPS belongs to brand-system styles (NOSTRA, 100% of its copy), editorial titles (Solar's "SOLAR / PANELS") and generated display content (Wix's "BASELINE", "DESIGNED TO BE SEEN") [V:1i2L14 §8] [V:1Hcg3X §8] [V:15VhHR §Typography]. Title Case only for short labels and payoffs ("Order Delivered", "Electricity") [V:126cpH t=13.60s] [V:1Hcg3X t=3.43s].
- Why: sentence case reads as a voice speaking; caps read as a sign or a brand system. A terminal period on short cards ("No complex setup.") adds calm finality [V:1CSXtQ t=21.60s].

### 9.4.3 Tracking

| Text | Static tracking | Evidence |
|---|---|---|
| Statement lines, UI text | 0 | kivi, HubSpot, Lottieicon, Bumper lines [V:1-6l8S §8] [V:1CSXtQ §8] [V:1ccYWJ §8] [V:19NRDv §8] |
| Lowercase or sentence-case display ≥96 px | −1 to −3% (−0.01 to −0.03 em) | Bumper hero words −1 to −2% [inferred]; Wix macro −1 to −2% [inferred]; Solar message ≈−1%; [E] −0.02 to −0.03 em at 48-64 px web display; [N] −0.01 to −0.03 em |
| Heavy rounded lowercase (Black) | −2 to −4% | "chow?" letters nearly touching [V:126cpH t=0.73s] |
| Display caps | 0 to +3% | NOSTRA 0 to +3% [V:1i2L14 §8]; "SOLAR" ≈+2% [V:1Hcg3X]; Lottieicon wordmark ≈+3% [V:1ccYWJ t=2.73s] |
| Small caps labels (<3% H) | +5 to +8% [inferred split of [N]'s +5-12%] | [N] |
| Big numerals | −2 to −4% | [E] −0.04 em on stat numbers [inferred] |

> **References win (display caps).** [N] recommends +5-12% letter-spacing on all caps. The references set display caps at 0 to +3% and read premium (NOSTRA's whole film, Solar's title). Keep +5-12% for small caps labels, where open spacing helps legibility; use 0 to +3% at display sizes, where wide spacing breaks the word into letters [inferred reason].

**Animated tracking and word spacing** (each measured):

| Device | Numbers | Ease | Evidence |
|---|---|---|---|
| Tracking-in on one hero word | Width −17% in 4 f (85 → 71 px @720) | E-OUT | [V:1CSXtQ t=0.067-0.20s] |
| Word-space opening (assemble) | Words start with zero word spaces and open to normal over 12 f | E-OUT | [V:1ccYWJ t=4.93-5.27s] |
| Word-spacing exit | Gaps widen ×1.5, line +16%, fade to ≈60% over ≈18 f | E-EXIT | [V:1CSXtQ t=24.13-24.73s] |
| Spaced entry (pairs with the exit) | Gaps ≈1.25× tightening to rest in 8-10 f | E-OUT | [V:1CSXtQ t=24.77-25.43s] |
| Gap closing after an inline element collapses | Line narrows 87% of the way in 6 f, settles by 12 f | E-OUT | [V:15VhHR t=49.63-50.03s] |

- Why: animating space (not letters) keeps every glyph rigid and legible while the line still feels alive. It is the most premium way to animate a static word [inferred from the three films that use it].

### 9.4.4 Leading

| Text | Leading (line pitch ÷ font size) | Evidence |
|---|---|---|
| Display, 2 lines | **0.95-1.1** | Bumper ≈1.1 (pitch 14.8% H for cap 8.5-9%) [V:19NRDv §8]; Chowdeck payoff ≈1.0 [V:126cpH t=13.60s]; Solar message ≈1.0 (pitch 7.6% H, cap 5.6%) [V:1Hcg3X t=28.97s]; Solar title ≈1.0; [E] 1.05-1.17; [N] 0.95-1.1 |
| Two-line statement in a rounded sans | ≈1.2 | Lottieicon counter block [V:1ccYWJ t=9.93s] |
| Condensed caps display in generated content | ≈0.9 | Wix site display [V:15VhHR §Typography] |
| UI body in cards | 1.4-1.6 | kivi voice card ≈1.6 [V:1-6l8S t=18.37s]; HubSpot chat ≈1.4 [inferred] |
| Devanagari | 1.25 headline / 1.5 body (never Latin values) | [N] (§9.19) |

- Why: tight display leading makes two lines read as one shape; loose body leading in UI is what real interfaces use, so it keeps UI believable.
- **Premium vs amateur (tracking and leading).** Premium: tracking set once per role and left alone, with animation applied to word spaces rather than letters (§9.4.3 table); display caps at 0 to +3%; two-line display at 0.95-1.1. Amateur [inferred from the references' consistency, not from a flagged example]: default (0) tracking on 150+ px lowercase display, which looks loose; +10% or more on display caps, which breaks words into letters; and body-style leading (1.4+) on a two-line headline, which splits it into two unrelated lines.

---

## 9.5 Alignment and placement

**TY-P1 [U]. Statement lines are centred, on a centre-line at y 47-52% H.** kivi y ≈49-51%, Bumper 47-52%, Lottieicon 47-52%, NOSTRA 50 ± 3%, HubSpot optical centre [V:1-6l8S §8] [V:19NRDv §8] [V:1ccYWJ §8] [V:1i2L14 §8] [V:1CSXtQ §8]. Width 35-70% W, ≤85% W for a single line of ≤6 words (Part 02 CO-U11). 9:16: stack inside x 120-840, centre-line y ≈900-1000 (47-52% H), never below y 1210 (Part 02 §4.7).
- Why: a fixed reading position across cuts means the eye is already where the next word appears. With statements every 1-2 s, a moving target costs reading time.

**TY-P2 [U]. Editorial blocks and payoffs are left-aligned on a column edge, ragged right.** Chowdeck x ≈13%, y 25-42% H in 9:16 [V:126cpH t=13.60s]; Solar top-right block at x ≈67-84% W, top line y ≈10.6% H [V:1Hcg3X t=28.97s]. UI text keeps the UI's own alignment, which is left inside cards [V:1-6l8S §8].

**TY-P3 [S]. Placement map (16:9 px @1080; 9:16 px @1920).**

| Slot | 16:9 position | 9:16 position | Use | Evidence |
|---|---|---|---|---|
| Statement band | Centre-line y 508-562, x centred | Centre-line y 900-1000, column x 120-840 | Every claim | TY-P1 |
| Upper-third line (room below) | y ≈32% (≈346) | y 270-640 | When a UI ribbon, card or subject rises beneath | Lottieicon y ≈32% [V:1ccYWJ t=22.33s]; Solar title y 15-25% [V:1Hcg3X]; Chowdeck "been busy?" 20-41% H over footage [V:126cpH t=1.60s] |
| Supertitle over a giant word | y ≈20% over y ≈55% | y ≥270 over y ≈900-1100 | Finale swaps, slot machines | [V:19NRDv t=56.67s] |
| Flank labels | x ≈15% / 81% on the hero's mid-line | Above and below the hero | Labels next to a centred object | [V:1Hcg3X t=3.43s]; re-layout [V:1Hcg3X t=32.87s] |
| World-space label | Attached to the object it names | Same | Explainers | [V:1Hcg3X §8] |
| Stacked end card | Wordmark y ≈18%, CTA card centre, URL low | Wordmark inside y 270-640; CTA ≤y 1210 | Lockups with QR or CTA | [V:19NRDv t=61.47s] |
| Logo + pill CTA | Logo above, pill (37% W × 11% H) directly beneath | Pill 60-67% W [inferred] | Click-to-book endings | [V:1i2L14 t=32.73s] |
| Typing caret lock | x ≈65-66% W once the line passes centre | x ≤840 | Typed headlines | [V:1CSXtQ t=4.5-7.2s] |

**TY-P4 [U]. A growing line keeps its composition stable** by one of three methods (Part 02 CO-U13): smoothed re-centring (E-LERP, kivi), auto-fit scaling so the final width stays ≤70% W (Lottieicon), or a camera that follows so the newest character stays at 65-66% W or in the right third (HubSpot, Wix). Never let a line grow off-centre and then jump.

**TY-P5 [U]. Text keeps its screen position across a cut when the idea continues.** Bumper's inverted match cut keeps "Take payments like a" at identical size and position while the world flips white → navy [V:19NRDv t=1.167s]; HubSpot reprises its lockup at x = 328 vs 327 px [V:1CSXtQ t=27.37s]; kivi's statements all share the centre-line. Why: the eye stays still while the context changes, which reads as one continuous thought (Part 05 positional continuity).

**TY-P6 [U]. Informational text never touches the frame edge; display type may bleed for ≤0.7 s.** Bumper's caption was clipped by the top edge for 5 s and is listed as a flaw; the fix is ≥5% H inside title-safe [V:19NRDv t=30.9-35.9s]. Wix's macro hook bleeds deliberately for 0.63 s [V:15VhHR t=0-0.63s]. (Part 02 CO-U15/16.)

**TY-P7 [U]. Decoration never crosses the claim.** Chowdeck's starburst rays cover "seconds" for ≈0.5 s [V:126cpH t=3.9-4.4s]. Mask decorative layers behind the type's bounding box plus ≈10% padding (Part 02 CO-U6).

---

## 9.6 Reveal library (entrances)

Each card gives the mechanics in frames at 30 fps, the ease token (Part 03 §19.3), where it was measured, and when to use it. Speeds for the same devices also appear in Part 03 §18.1 (SP-T); where this table is more specific, this table governs.

| ID | Reveal | Mechanics (frames @30) | Ease | Measured in | Use when | Tier |
|---|---|---|---|---|---|---|
| **RV-01** | **Cut-on / hard swap** | Text is complete on the first frame of the shot (0 f). Rapid variants swap whole words every 10-16 f | none | "No complex setup." crisp at 21.60 [V:1CSXtQ]; "So / Why wait? / Let's go!" 10-12 f each [V:1ccYWJ t=38.00-39.07s]; swap words with a 2-3 f blur-in [V:19NRDv t=58.13-59.43s]; brand sentence held 1.0 s from the cut [V:15VhHR t=0.63s]; "Just" → "Think" [V:1-6l8S t=3.05s] | The cut itself is the event (on a beat); scale-contrast cuts; rhythmic climaxes; any frame that must be readable instantly | U |
| **RV-02** | **Pop-on (1 f step)** | The word appears in 1 f with no tween; life comes from something secondary on the same frame (background shapes swell, boil on twos, a sparkle travels ≈22 f) | step | "chow?" [V:126cpH t=0.733s] | One hook per film in playful styles. Never for supporting text ("pop-ons for every element" is an avoid [V:126cpH]) | S |
| **RV-03** | **Blur-fade in place** | Opacity 0 → 1 and defocus → sharp over **2-5 f**, no offset. Blur start ≈8 px @1080 [inferred] | linear opacity + E-OUT blur | Every Solar label and title line, 2-5 f [V:1Hcg3X t=0.10s, 2.27s, 3.47s, 27.27s]; "seconds" 4 f [V:126cpH t=3.07s]; hard-swap words 2-3 f [V:19NRDv t=58.13s] | Labels, world-space text, words that must land on a beat without moving | U |
| **RV-04** | **Rise + blur + fade** | Rise 2-10% H (6-15% H in fast cuts) while blur clears, over **9-12 f** (5-8 f in fast styles) | E-OUT | "Meet" ≈12 px native (≈2% H) in ≈10 f; "Custom Dictionary" ≈9 f; "Hey kivi" ≈66 px native (≈10% H) in ≈12 f [V:1-6l8S t=4.45s, 25.47s, 31.85s]; "photo" 10-15% H in 5 f, "voltaic" 8 f [V:1Hcg3X t=16.85s, 18.50s]; macro hook words 7.5-15% H in 6 f [V:15VhHR t=0.00-0.63s]; [E] 0.35 em over 14 f [inferred] | Calm statements, power words, concept words | U |
| **RV-05** | **Word slide-in from the right** | Each word starts ≈4% W right of rest with horizontal motion blur and a defocus that clears in 4-5 f; settles in **4-7 f**; word starts **7-10 f** apart (2 f in fast cards) | E-OUT | "payments" 7 f, "like" 5 f, "a" 4 f; starts 10/10/7 f apart [V:19NRDv t=0.30-0.97s]; "payment routing" 2 f apart [V:19NRDv t=9.63s]; kivi's second phrase 46 px native (4% W) in 6 f [V:1-6l8S t=0.33s] | Launch kinetic builds; anything that should read as speech rhythm | U |
| **RV-06** | **Live-append with smoothed re-centre** | Word 1 appears at full opacity, displaced; the line re-centres with exponential smoothing (k ≈0.22-0.25 per frame), **13-14 f**, travel 10-15% W; later words join 3-8 f apart at ≈60% opacity and solidify in 2-3 f; then a linear drift ≈3.7% W/s | E-LERP then E-LINEAR | [V:1-6l8S t=0.10-0.53s, 28.50s, 37.25s, 52.25s, 62.93s, 69.65s] (6 uses) | Voice, dictation, chat and AI products: the line behaves like live transcription | SaaS |
| **RV-07** | **Oversize slam-down** | Hero word starts at **3-4×** with 2 ghosted frames (f0-f1) and lands at 1× in **8-13 f**; ≈64% of the change on frame 1, ≈86% by frame 3. Soft variant: from ≈1.2-2.1× and ≈25% opacity over 18-20 f | E-SNAP (soft: E-OUT) | "Take" 4.05× → 1× in 8 f [V:19NRDv t=0.00-0.27s]; "IMAGINE" ≈3× → 1.05× in 8 f [V:1i2L14 t=0.00-0.27s]; "Easy to use" ≈2.1× → 1× in ≈18 f [V:1ccYWJ t=33.20s]; "All powered…" ×1.18 → 1 in ≈20 f [V:1CSXtQ t=22.60s] | Frame-0 hooks; hero words in launch films; ≤5 per film | U |
| **RV-08** | **Scale pop (snap up)** | Word appears small, then grows **+40-55% in 6 f** with the velocity peak on frame 2; no overshoot | E-SNAP | "Introducing" +52% (deltas 21, 62, 37, 17, 8, 4 px) [V:1ccYWJ t=1.87-2.07s] | Announcement words; pairs with EX-04 (KT-04) | S |
| **RV-09** | **Display typewriter** | Characters appear at **15-35 cps** for read text; key noun phrase ≈9 cps; 0.9-1.1 s pauses at phrase breaks; caret 9 f on / 9 f off. Per-character blur-in variant: 1-2 f per character | linear | Question typed ≈15 cps, both lines in parallel [V:126cpH t=1.73-2.07s]; 35 / 9 / 28 cps with pauses [V:1CSXtQ t=2.53-7.2s]; per-character blur 1-2 f [V:19NRDv t=25.6s, 35.93s] | Questions, prompts, "the ad is a prompt" concepts | U |
| **RV-10** | **Diegetic typing in a UI field** | Wide shot 18-20 cps; at ECU slow to **7-8 cps**; macro prompt starts ≈4 cps and bursts to 30-50 cps; UI headline type-on with a gradient leading edge up to ≈53 cps; URL ≈23 cps | linear (bursty) | [V:15VhHR t=4.47-8.6s]; [V:1CSXtQ t=13.28-16.5s]; URL [V:1ccYWJ t=39.73-40.53s] | Every product demo with an input | SaaS |
| **RV-11** | **Ghost-word streaming** | Words arrive at 30-40% opacity and reach 100% in **3-4 f**. Speech pace 4-7 wps (one word per 4-7 f), locked to the voice; machine pace ≈1 word per 2 f (≈15 wps); code tokens one per 3-4 f in outline chips; table cells type left → right, rows every 130-200 ms | linear opacity | Raw transcript 4.8 wps [V:1-6l8S t=9.55-13.77s]; 6.9 wps [V:1-6l8S t=18.70-20.45s]; machine pace [V:1-6l8S t=14.3-14.6s]; code [V:1-6l8S t=59.73-62.9s]; table [V:1CSXtQ t=20.40-21.47s] | Voice input, AI output, live data | SaaS |
| **RV-12** | **Mask / line wipe** | A soft-edged mask reveals left → right at ≈1-1.2 letters per frame (a short word in 4 f, a wordmark in 7 f); line-mask variant: each line rises from behind its own baseline mask (100% → 0) over 16 f, 4 f stagger | linear mask / E-OUT | Wordmark L → R in 7 f [V:1ccYWJ t=2.73-2.97s]; "STRESS" 4 f [V:1i2L14 t=30.63-30.77s]; re-type 10-11 f [V:1i2L14 t=6.67-7.00s]; "BOOK NOW" rises through its pill mask in 3 f [V:1i2L14 t=32.87s]; line mask 16 f [E, inferred] | Wordmarks, CTA labels, editorial lists | U |
| **RV-13** | **Letter sequence** | Letters arrive 1-4 f apart, each from ≈40% opacity and heavy blur to sharp in 3-4 f, while the word re-centres; directional variant reveals a wordmark right → left at 2 f per letter toward the product word | E-OUT per letter | "One" 4 f stagger [V:19NRDv t=2.45-2.83s]; BUMPER R → L 2 f, 10 f total [V:19NRDv t=61.47-61.80s]; "PRO" typed per letter 2 f [V:19NRDv t=59.90-60.03s] | Single hero words, product names, wordmarks split per glyph by the brand | S |
| **RV-14** | **Staggered line or word fade** | Each line or word fades (with blur) in 2-6 f; lines **4-9 f** apart; slow payoff variant: 15-16 f per line, 3 f apart | linear opacity + E-OUT | Message lines 2-3 f each, 4/8/9/4 f stagger [V:1Hcg3X t=28.97-29.80s]; title lines 3-5 f, 5/8/9 f stagger [V:1Hcg3X t=0.10-0.90s]; payoff ≈15 f per line, +3 f [V:126cpH t=13.60-14.23s]; words 2-5 f apart [V:1ccYWJ t=4.57s, 22.63s, 25.50s]; email lines 4-6 f, 3-4 f stagger [V:1-6l8S t=23.13-23.87s] | Multi-line blocks, payoffs, UI content in reading order | U |
| **RV-15** | **Word-space opening** | Words appear with zero word spaces and open to normal spacing over **12 f** | E-OUT | [V:1ccYWJ t=4.93-5.27s] | Category lines, taglines | X |
| **RV-16** | **Tracking-in** | One hero word starts ≈20% wider and tightens **−15 to −20%** in 4 f | E-OUT | "first" 85 → 71 px [V:1CSXtQ t=0.067-0.20s] | One emphasised word in a calm hook | X |
| **RV-17** | **Staircase → baseline** | Words placed on a descending diagonal (step ≈5% H) collapse onto one baseline in **7-10 f** (within 10 px after 7 f) | E-OUT or E-INOUT | Hook collapse 9 f [V:1CSXtQ t=1.50-1.80s]; "No complex setup." 10 f [V:1CSXtQ t=21.60-21.93s]; scatter variant [V:1i2L14 t=8.30s] | Short benefit cards; announcement hooks | X |
| **RV-18** | **Tonal materialise** | Text appears as a pale ghost (≈25-30% contrast) and darkens to full ink over **18-42 f**, ending with a left → right tonal sweep; no positional move | linear | Wordmark silver → forest #2D4123 over ≈42 f [V:1-6l8S t=6.2-7.6s]; tagline 30% → 100% over ≈0.6 s [V:1-6l8S t=69.65-70.3s] | Premium wordmark reveals; "coming into focus" moments | S |
| **RV-19** | **Blur → sharp resolve** | Text is placed blurred and resolves to sharp over **≈20 f** ("ink settling") | E-OUT | Kannada translation [V:1-6l8S t=49.25-49.90s] | An AI result settling; translations | SaaS |
| **RV-20** | **Decode / scramble** | Glyphs scramble (outline glyphs with RGB fringes, or a semantic glyph set such as "$") and resolve to the word in **10-12 f** | stepped | "PRO" ≈10 f [V:19NRDv t=1.17-1.50s]; "thou$$$$$" → "thousands" 12 f [V:19NRDv t=7.68-8.08s] | Once per film, on a tech or money word | X |
| **RV-21** | **Semantic letter choreography** | Letters act out the word: self-assembling (1-2 f stagger, ±0.5 cap random offsets, settled ≈20 f, strays snap last); kick-bounce (letters pop up from below the baseline 2 f apart); arc-wave (letters on a curve spread flat in ≈5 f) | E-OUT per letter | "Automatically" [V:19NRDv t=14.33-15.37s]; "Kick" [V:19NRDv t=46.13s]; "OVERCOMPLICATE" [V:1i2L14 t=9.70-9.87s]; arc type-on ≈22 letters/s [V:1ccYWJ t=1.20-1.73s] | ≤3 per film, 9-30 f each, only where the motion *is* the meaning | X |
| **RV-22** | **AI colour settle** | AI-written text arrives in the reserved AI gradient (cyan → indigo) and settles to its final colour: 4 f to gradient, 6-8 f settle; a rewrite runs per word over ≈12 f, then 6 f settle | linear colour | "skincare brand" 4 f [V:15VhHR t=7.87s]; "BASELINE" 8 f [V:15VhHR t=12.53-12.83s]; headline rewrite 12 f + 6 f [V:15VhHR t=36.6-37.0s] | Any text the AI writes or edits | SaaS |
| **RV-23** | **Shimmer / gloss sweep** | A lighter band sweeps left → right across finished text: **12-24 f** (status loops: 60 f sweep + 15 f pause) | linear | Polished line 0.8 s [V:1-6l8S t=15.0-15.8s]; AI sweep 12 f [V:15VhHR t=18.73-19.13s]; component 2 s + 0.5 s pause, spread 2 px per character [E, code] | "AI-enhanced" or "generating…" states | SaaS |
| **RV-24** | **Pixel / glitch build** | Blocks grow from a cluster and resolve into a label; resolve at ≈1.25× and settle to 1.0 in 4 f. **Keep ≤12 f** (the reference's 23-26 f is flagged) | stepped + E-OUT | "SOLUTION" [V:1i2L14 t=16.63-17.63s] | Rarely; a single "digital" label | A when >12 f |
| **RV-25** | **Count-up** | Expo-out count: ≈70% of the range in the first 25% of ≈30 f, final digit lands hard; or a linear tally with a hard stop (≈87 per frame, 56 f) | E-SNAP-L / E-LINEAR | 84 → 100% in 31 f [V:19NRDv t=23.90-24.93s]; 43 → 4,863 linear [V:1ccYWJ t=9.93-11.80s]; 0 → 50 at 1.72 per frame [V:1ccYWJ t=14.73-15.70s]; [E] 24 f EXPO [inferred] | Proof numbers (expo-out = "earned"; linear = "honest tally") | U |
| **RV-26** | **Ride-in on transition momentum** | Incoming text enters in the direction of the wipe or whip that brought it, defocused, and resolves sharp within ≈7 f; or it inherits the whip's leftover velocity and decelerates (Δ 21, 10, 6, 4 px/f) | E-OUT | "This is" after the chevron wipe [V:19NRDv t=48.17-48.50s]; "VIDEO" after the whip [V:1i2L14 t=6.13-6.40s] | After every directional transition | U |
| **RV-27** | **Scale-matched entrance across a cut** | The new title starts at ≈2.1× and ≈25% opacity on the cut frame, continuing the outgoing shot's shrink, and decelerates to 1× over ≈18 f (full opacity within ≈5 f) | E-OUT | [V:1ccYWJ t=33.20s] | Hand-off from a pull-back or suck-in | X |
| **RV-28** | **Inline object chip** | A gap opens in the sentence over ≈7 f, an object (photo chip, icon, 3D heart) scales in over ≈5 f, chips may flip every 2-4 f; a brand icon appended after typed text pops in ≈3 f | E-OUT | [V:15VhHR t=1.43-2.2s]; sprocket after "data." [V:1CSXtQ t=7.83s] | Showing "your content / your data" inside the promise | SaaS |

**Notes: why these work, and what reads premium vs amateur**
- **RV-01 Cut-on.** The cut does the work, so the text can be perfectly still and sharp from frame 1, which is the most legible state possible. It reads amateur only when nothing else in the film is choreographed; then it is a slideshow.
- **RV-03 / RV-04 Blur reveals.** Defocus-to-focus mimics an eye or lens finding the word, so it feels optical rather than "animated". Premium when the blur is gone by frame 4-12 and nothing moves after. Amateur when a long fade leaves text semi-transparent for half a second.
- **RV-05 Word slide.** One small move per word, at an eighth-note interval, makes the viewer read at the film's tempo; the music's pulse becomes reading speed [V:19NRDv §11]. Amateur when words fly in from off-screen or from different directions.
- **RV-06 Live-append.** The smoothing (each frame closes ≈22-25% of the remaining gap) is the signature of real dictation interfaces, so the medium becomes the message from frame 3 [V:1-6l8S Study A].
- **RV-07 Slam-down.** Frame 0 already contains a bold, moving object and a verb [V:19NRDv WHY #1]. It reads premium only with a critically damped landing (no bounce); with overshoot it reads as a template.
- **RV-09 / RV-10 Typing.** Variable speed reads as human: fast on filler, slow on the words that matter, with pauses at phrase breaks [V:1CSXtQ WHY shot 2]. Uniform machine typing at 60 cps reads as an effect, not a person (see Appendix A on [E]'s 2 characters per frame).
- **RV-11 Streaming.** The contrast between speech pace (4-7 wps) and machine pace (≈15 wps) *is* the product demonstration: human input, instant AI output [V:1-6l8S WHY shots 7-8].
- **RV-22 AI colour.** Once the viewer learns "cyan gradient = AI acting", no caption is needed [V:15VhHR WHY #24]. The colour must settle within 6-8 f, or it reads as a glitch (Wix flags >15 f).
- **RV-24 Pixel build.** The only reveal that a teardown explicitly calls amateur at length: 23-26 f of illegible noise [V:1i2L14 §6, §16].

---

## 9.7 Exit library

**TY-U6 [U]. Exits are faster than entrances, about half the duration, and accelerate (E-EXIT or E-WHIP).** Token: Part 03 SP-T0 (statement entrances 8-14 f, word entrances 4-7 f, exits 4-6 f; 4-8 f only for whole-card exits). kivi: entrances 8-14 f ease-out, exits 4-6 f ease-in [V:1-6l8S §6]. Lottieicon, HubSpot, Solar, NOSTRA and Bumper all exit on accelerating curves [V:1ccYWJ §6] [V:1CSXtQ §6] [V:1Hcg3X §6] [V:1i2L14 §6] [V:19NRDv §6]. [N] pairs a 400 ms entrance with a 200 ms exit. Why: the viewer has already read the text, so the exit only has to clear the stage and hand momentum to the next shot.

| ID | Exit | Mechanics (frames @30) | Ease | Measured in | Use when | Tier |
|---|---|---|---|---|---|---|
| **EX-01** | **Leave with the cut** | The text is still on screen when the shot cuts | — | Most cuts in all 8 | Default; pair with a strong entrance on the next shot | U |
| **EX-02** | **Blur dissolve** | Opacity → 0 with blur over **4-8 f** | linear | 8 f [V:1-6l8S t=3.83s]; 4 f [V:1-6l8S t=5.83s, 16.90s] | Calm films, "spoken" words | U |
| **EX-03** | **Whip / smear exit** | The line accelerates sideways out of frame in **4-7 f** (velocity grows ×1.3-3 per frame); motion blur on the last 2 f only in blur styles | E-WHIP | 4-6 f whip-left, no blur [V:1-6l8S t=38.70-38.85s, 64.20-64.37s]; 2 f smear [V:19NRDv t=8.55-8.62s]; 7 f into a light streak [V:19NRDv t=47.83-48.07s] | Directional hand-offs; before wipes | U |
| **EX-04** | **Shrink into the cut ("suck-in")** | Scale −20 to −30% over **8-18 f**, per-frame deltas roughly doubling; cut on the smallest frame | E-EXIT | −28% in 8 f [V:1ccYWJ t=2.33-2.60s]; −24% in 18 f [V:1ccYWJ t=26.53-27.13s]; ×0.80 / ×0.81 [V:1CSXtQ t=21.93-22.57s, 25.53-26.03s] | Momentum into the next object; card chains | U |
| **EX-05** | **Rise and fade** | Rise ≈3% H and fade over **8 f** | E-EXIT | [V:1ccYWJ t=34.07-34.30s] | Before a blank breath frame and a new type-on | S |
| **EX-06** | **Word-spacing widen + fade** | Gaps ×1.5, line +16%, drift ≈4% W, fade to ≈60% over ≈18 f; next card enters spaced (pairs with RV-15 logic) | E-EXIT | [V:1CSXtQ t=24.13-24.73s] | Two cards that are one sentence | X |
| **EX-07** | **Defocus-out, then cut** | Text loses focus for **1-2 f** before the cut | linear | [V:19NRDv t=10.97s, 16.73s] | Cutting from type to a 3D/DOF world | S |
| **EX-08** | **Punch into the cut** | Steady push, then +18% in the last 8 f (or +18-33% in 3 f), cut on a beat | E-PUNCH | Tagline [V:1-6l8S t=70.83-71.10s]; wordmark [V:1-6l8S t=7.83-7.93s] | Taglines into logos; at most ≈4 per film | S |
| **EX-09** | **Mask wipe-off** | A feathered mask erases left → right at ≈1 letter per frame (13 letters in 12 f); an anchor word stays | linear mask | "MOTION DESIGN" erased while "VIDEO" stays [V:1i2L14 t=6.17-6.57s] | Rewriting part of a line | X |
| **EX-10** | **Collapse to a dot** | Text and its box collapse to an ≈8 px dot in **1 f** (after a 1 f stretch as anticipation) | step | [V:1i2L14 t=1.033-1.067s] | Handing text to a shape chain (TP-04) | X |
| **EX-11** | **Per-glyph uneven fade** | Letters fade out at slightly different times over ≈9 f | linear | [V:1-6l8S t=31.2-31.5s] | A soft "dissolving thought" | X |
| **EX-12** | **Gap split** | The gap between two phrases widens and the line slides out while a 3 f dissolve brings the next scene, on an onset. **Never collapse the gap until words overlap**: kivi's "spreadsheetpowered" reads as a glitch | E-EXIT | Split [V:1-6l8S t=53.57-53.63s]; overlap flaw [V:1-6l8S t=64.27-64.33s] | Two-tone lines splitting at their seam | S |
| **EX-13** | **Status swap** | Old text fades out in 2 f, 1-3 f blank, new text fades in 2 f (5-7 f in all), inside a fixed container | linear | [V:126cpH t=12.20-12.43s] | UI status cycling | SaaS |
| **EX-14** | **Dim when superseded** | Earlier text stays but drops to ≈40-50% while new text arrives above or below it | linear | Raw transcript to ≈50% [V:1-6l8S t=13.77s]; earlier list lines to #a8a29e [E] | Before/after comparisons; feature lists | SaaS |
| **EX-15** | **Occluded or carried out** | An object wipes through the text (a card rotates 90° → 0° in 8 f between the letters), or the text rides out with its scene (world-space) | E-OUT / E-WHIP | Card through "50 + Categories" [V:1ccYWJ t=16.10-16.37s]; message block whips out with its scene [V:1Hcg3X t=30.1-30.57s] | Text-to-product (TP-09); explainers | S |
| **EX-16** | **Fade to white or black with the music** | Final URL or logo fades over ≈14 f while the music falls about −15 → −49 dB | linear | [V:1-6l8S t=76.80-77.27s] | End of film only | U |

**Premium vs amateur (exits)**
- **Premium:** the exit is about half the entrance (4-6 f per SP-T0; 4-8 f for a whole card), accelerates, and hands its velocity to the next shot (TC-08); words leave as a group or split at a phrase seam (EX-12). Measured in kivi (entrances 8-14 f, exits 4-6 f [V:1-6l8S §6]) and HubSpot's shrink-and-cut chain [V:1CSXtQ t=21.93-26.03s].
- **Amateur:** a fade-out as long as the fade-in (the text is already read, so the extra frames are dead time) [inferred]; words that collide while they leave ("spreadsheetpowered" [V:1-6l8S t=64.27-64.33s]); a status or payoff that exits before it is read (2 f "Order delivered" [V:126cpH t=13.53s]); and glitch exits longer than ≈12 f [V:1i2L14 §16].

---

## 9.8 Kinetic-typography systems (sentence-level choreography)

A kinetic system is a repeatable recipe for a whole sentence: entrance, build, life during the hold, exit. Part 03 ML-16 catalogues 18 devices (K1-K18); here are the eleven that a film can be built on, as frame recipes. Use **one system as the film's typographic signature**, plus at most two or three variants.

**TY-U8 [U]. Every film reveals its copy sequentially, at a spoken or musical rhythm.** 8 of 8. Why: one word at a time makes the viewer read along at the film's tempo, so the copy is "heard" with the sound off [Part 03 ML-16].

### Word cadence and tempo

Word starts sit on eighth notes; swaps and card changes sit on beats [Part 03 §18.10].

| BPM | Eighth note | Word interval | Card / swap interval | Seen in |
|---|---|---|---|---|
| 86 | 10.5 f | 10 f (computed) | 21 f (computed) | [V:1CSXtQ] music ≈86 BPM; its typing is phrase-paced, not beat-paced |
| 95.7 | 9.4 f | 9 f (computed) | 19 f (computed) | [V:126cpH] music 95.7 BPM, but its edit is **not** beat-cut (5-6 of ≈25 events near onsets, chance level) [V:126cpH §Editing Rhythm] |
| 100 | 9.0 f | 7-10 f (measured) | 11-16 f (measured) | [V:19NRDv]; 11 of 18 cuts land 0-2 f before a beat |
| 112 | 8.0 f | 8 f (computed) | 15 f (measured, ≈0.94 beat) | [V:1ccYWJ] (Wix is also ≈112 BPM but not beat-locked [V:15VhHR §11]) |
| 127 | 7.1 f | 7 f (computed; measured word joins 3-8 f) | 14 f (computed) | [V:1-6l8S]; back half cut on the eighth-note grid |

Rows marked (computed) are the beat arithmetic for that tempo, not measured type cadences; only Bumper's word interval and Bumper's and Lottieicon's swap intervals are measured on type.

When the type follows a voice instead of music, words appear with their sound (§9.11.4), and the music syncs only at section changes [V:15VhHR §11].

### KT-01 Two-tone live-append statement (kivi) — SaaS (voice, AI, chat)

| Frame | Action | Evidence |
|---|---|---|
| f0-f2 | Background only (aurora drifting) | [V:1-6l8S Study A] |
| f3 | Subject phrase appears at 100% opacity in ink #0B0B0B, displaced right by ≈10% W of its final position | 113 px native travel |
| f3-f16 | Line re-centres with E-LERP (k ≈0.22-0.25): deltas 28, 21, 15, 10, 9, 6, 5, 5, 4, 3, 3, 2, 2 px native | [V:1-6l8S t=0.10-0.53s] |
| f10 (+3 to +8 f) | Benefit phrase enters ≈4% W right of rest at ≈60% opacity in the accent (sage #556962 / #396454), solid in 2-3 f, settled in 6 f | [V:1-6l8S t=0.33s, 28.60s, 37.35s, 62.93s] |
| f16 → exit | Whole line drifts left, linear, ≈3.7% W/s (≈2.4 px/f @1080 computed) | [V:1-6l8S §7] |
| Exit | Blur dissolve 4-8 f, whip-left 4-6 f, a gap split with a 3 f dissolve, or a punch into the cut | [V:1-6l8S t=3.83s, 38.70s, 53.57s, 70.83s] |

Specs: Regular 400, sentence case, font 68-95 px @1080 (use 90 for phone-safe), ≤6 words, one line, centre-line y ≈50%. Total card 1.2-1.9 s. Why: the line literally types itself like a transcription UI, and the benefit phrase arriving last in the brand colour makes every card a mini before → after.

### KT-02 Slam + build + pull-back (Bumper) — S (kinetic launch)

| Frame | Action | Evidence |
|---|---|---|
| f0 | Hero word at ≈4× scale, 3-4 ghost copies (multi-sample motion blur) on f0-f1 | [V:19NRDv Study 5.1] |
| f0-f8 | E-SNAP to 1×: ≈64% of the change on f1, ≈86% by f3, settled f8 | widths 891, 460, 364, 313, 280, 258, 242, 230, 220 px |
| f9-f16 | Word 2 slides in from the right (RV-05), blur clears in 4-5 f | [V:19NRDv t=0.30-0.53s] |
| f19-f23, f26-f29 | Words 3 and 4 (starts 10, 10, 7 f apart: the cadence accelerates) | [V:19NRDv t=0.63-0.97s] |
| Throughout | The line shrinks 1-1.5% per frame (virtual pull-back); when the next phrase needs room it snaps −40-55% in 3 f with blur | [V:19NRDv t=2.45-3.25s, 9.28s] |
| Cut | Hard cut 0-2 f before a beat; the next shot keeps the line's position (inverted match cut) or slams the next hero word | [V:19NRDv t=1.167s; §11] |

Specs: Medium 500 phrases, SemiBold 600 hero words, function words at ≈60% (lavender-grey), one accent benefit word (#F4643C large / #E46C54 small), centred y 47-52%. Glow ≤2-3% of cap height. Why: frame 0 is already an object and a verb, and the shrinking line gives flat type a sense of camera depth. Limit: Bumper uses this ≈12 times and its teardown flags monotony; vary after ≈6 uses with semantic variants (RV-20, RV-21).

### KT-03 Typed headline becomes the prompt UI (HubSpot) — SaaS (AI, integrations)

| Time | Action | Evidence |
|---|---|---|
| Cut | Hard cut to white; caret at the exact frame centre | [V:1CSXtQ t=2.133s] |
| +0.4-0.73 s | Type filler at ≈35 cps ("Get the power", 13 chars) | [V:1CSXtQ t=2.53-2.87s] |
| Pause ≈1.1 s | Inside the pause, re-centre the line ≈13.7% W (computed) over ≈17 f, fast attack, long tail | [V:1CSXtQ t=3.37-3.93s] |
| Key phrase | Type at ≈9 cps (" of ChatGPT,"), then pause ≈0.95 s | [V:1CSXtQ t=3.97-6.27s] |
| Burst | Type ≈28 cps; the line scrolls so the caret stays at x ≈65-66% W; the first glyph overflows the left edge | [V:1CSXtQ t=6.3-7.2s] |
| Hold | ≈0.6 s on the finished headline; caret blinks 9 f on / 9 f off and disappears | [V:1CSXtQ t=7.2-7.8s] |
| UI build | Bar border + shadow 1-3 f → brand icon pops ≈3 f → toolbar fades and slides up 4-5 f | [V:1CSXtQ t=7.80-8.07s] |
| Reveal | Pull-back ×1.00 → ×0.75, main move ≈21 f (31 f with ramps), E-INOUT peaking at 50-55% | [V:1CSXtQ t=8.0-9.03s] |

Specs: Regular 400, typed font ≈51 px @1080 (4.8% H, computed); in the later macro shot ≈64 px (6.0% H). Why: the viewer reads the claim as an action at reading speed, then the UI arrives as context for text they already understand, not as clutter.

### KT-04 Snap-hold-suck card (Lottieicon) — S (fast startup)

| Frame | Action | Evidence |
|---|---|---|
| 0-16 f | Letters type on along a downward arc that flattens (≈22 letters/s) | [V:1ccYWJ t=1.20-1.73s] |
| +4 f | Snap +52% in 6 f, velocity peak on frame 2, no overshoot | [V:1ccYWJ t=1.87-2.07s] |
| +6 f | Hold 8 f | [V:1ccYWJ t=2.07-2.33s] |
| +14 f | Shrink −28% over 8 f (deltas 4, 4, 8, 12, 12, 20, 28, 36 px), E-EXIT | [V:1ccYWJ t=2.33-2.60s] |
| Cut | Hard cut on the smallest frame into the next object, on a sub hit | [V:1ccYWJ t=2.633s] |

Why: pop, breath, and a pull into the cut carry momentum from word to object without any transition effect. Use ≤3 per film [inferred from the reference's three suck-in cuts].

### KT-05 Scatter → swap → converge (NOSTRA) — X (brand system)

| Phase | Frames | Mechanics | Evidence |
|---|---|---|---|
| Build | 0-14 f | Words drop into place 3 f then 2 f apart at their final x; vertical settle ≈13 f, E-OUT | [V:1i2L14 t=7.567-8.0s] |
| Hold | 10-14 f | Line still (≤1 px/f drift) | [V:1i2L14 Study F] |
| Scatter | 6-7 f | Upper word rises, lower word drops 4 f later, middle word shifts: a staircase (Δ 23, 15, 10, 6, 4, 2 px/f at 567p) | [V:1i2L14 t=8.30-8.60s] |
| Swap | 1 f | Every word is replaced in place while displaced | [V:1i2L14 t=8.70s] |
| Converge | ≈7 f | Words return to one baseline (Δx 23, 13, 8, 4, 3, 1 px/f) | [V:1i2L14 t=8.77-9.00s] |

Specs: ≤3 words per line, SemiBold caps, cap 5.6% H, one key word in the brand hue. Cycle ≈1.0 s per sentence; 3 sentences in 3.07 s. Why: perceptual masking. The swap happens while the words are mid-move, so the viewer sees one line breathing, never text "changing" [V:1i2L14 WHY #7].

### KT-06 Editorial title stack and world-space labels (Solar) — S (editorial explainer)

| Frame | Action | Evidence |
|---|---|---|
| f1 | The hero object is already entering (no dead first frame) | [V:1Hcg3X Study A] |
| f3-f5 | Line 1 (connector, cap 2.8%) blur-fades in place, 3 f | |
| f8-f11 | Line 2 (serif CAPS hero, cap 11.6%) blur-fades, 4 f | |
| f16-f20 | Line 3 (serif CAPS, cap 7.9%) blur-fades, 5 f | |
| f25-f27 | Line 4 (connector) blur-fades, 3 f; the title is crisp by 0.90 s | stagger 5 / 8 / 9 f |
| Hold | The whole group rides the camera crane at 0.34-0.51% H per frame (world space) | [V:1Hcg3X t=0.37-0.97s] |
| Exit | The scene whips out (expo-in, 8 f); the title leaves with it | [V:1Hcg3X t=1.20-1.47s] |

Labels in later scenes: bold grotesk cap 3.6-4%, blur-fade 2-4 f, placed at the object (x ≈15% / 81% W for flank pairs), label pairs 10 f apart. Why: text that lives in the scene's space never looks pasted on; serif for vocabulary and grotesk for labels teaches the viewer what kind of word each one is.

### KT-07 Bookend sentence with inline objects (Wix) — S, SaaS (editorial brand frame)

| Time | Action | Evidence |
|---|---|---|
| 0.00-0.63 s | Macro type, cap 49% H, Regular, one new word every 7 f, each rising 7.5-15% H in 6 f (E-OUT); the frame jump-reframes (23% then 72% W) so the newest word is always whole | [V:15VhHR t=0.00-0.63s] |
| 0.633 s | Hard cut to the same words at cap 6.6% H, centred, ≈56% W: a ≈7.4× scale-contrast cut | [V:15VhHR t=0.633s] |
| 0.63-1.43 s | A deliberate dead-still read hold of 1.0 s before anything moves | [V:15VhHR WHY #2] |
| 0.87 s | "love" rises in 3 f; an inline 3D heart spins | [V:15VhHR t=0.87-1.03s] |
| 1.43-2.2 s | A gap opens (7 f), an image chip grows (≈5 f), chips flip every 2-4 f; the line ticks 25% W left in 4 f as words swap | [V:15VhHR t=1.43-2.2s] |
| Close | "Easy to [slot] love": the slot flips every ≈2 f, collapses to a heart in 6 f; the words close the gap 87% in 6 f, settled by 12 f; the heart fills the frame → logo | [V:15VhHR t=49.63-51.37s] |

Why: the macro hook gives a physical jolt in 0.6 s; the small, quiet sentence then reads as confidence; objects inside the sentence explain "website = your content" without a voice-over.

### KT-08 Setup / punch hook and typewriter question (Chowdeck) — S (playful consumer, 9:16)

| Time | Action | Evidence |
|---|---|---|
| f0 | Setup word in a pill (cap ≈4% H of 1920 ≈ 77 px) already on screen | [V:126cpH t=0.00s] |
| ≤0.5 s | First change. The reference waits 0.73 s, which its teardown calls too long | [V:126cpH rule 1] |
| Pop | Punch word pops on in 1 f: Black rounded lowercase, em ≈320 px @1920 [inferred em], tracking −2 to −4%, ≈84% W; background shapes swell on the same frame; elements boil on twos; a 4-point sparkle travels ≈22 f | [V:126cpH t=0.733s] |
| Hold | ≥0.7 s fully still apart from the boil | [V:126cpH §Typography] |
| Next card | A question types at ≈15 cps, both lines in parallel; hold ≥0.7 s (the reference's 0.45 s is flagged) | [V:126cpH t=1.73-2.50s] |
| Claim | The claim word blurs in over 4 f; keep decorative rays behind it | [V:126cpH t=3.07s, 3.9s] |
| Payoff | Two-line Title Case, cap 7-7.5% of 1920, left-aligned at x ≈13%, tone-on-tone, each line fades ≈15 f, +3 f stagger; hold ≥1.0 s | [V:126cpH t=13.60-14.23s] |

Why: a small setup word above a huge punch word (1 : 2.5-3) gives a sentence in one glance; the dialect question targets the audience by language.

### KT-09 Slot machine and escalating swap (Lottieicon, Bumper, Wix) — U (3 refs)

- **Anchor + variable.** A fixed anchor ("For", "Take payments like a") stays still; the variable word swaps in a contrasting face [V:1ccYWJ t=5.43-7.30s] [V:19NRDv t=57.60-59.90s].
- **Cadence.** Swap every **15 f** (≈1 beat at 112 BPM); the first card holds 11 f. The outgoing word lifts and tilts out over 2-3 f; the incoming one enters at ≈−6° and ≈4 px low and settles in 3-4 f (E-OUT) [V:1ccYWJ Study C].
- **Escalating version.** Intervals tighten 16 → 15 → 13 → 11 → 14 f while the word's height grows 10 → 13 → 18 → 27 → 34 → 33% H. Each swap is hard, with a 2-3 f blur-in and a slow upward drift of ≈0.2% H per frame. It ends on the product name, typed per letter at a 2 f stagger in the display face, then pushed +8.9% over 33 f (linear) [V:19NRDv Study 5.12].
- **Locked-prompt version.** A prompt bar stays at identical x/y/size while the keyword swaps and the world behind it cuts every 0.23-1.27 s; colour holds lengthen 21 → 29 → 38 f to land on the hero use case [V:15VhHR t=8.63-12.47s].
- 3-5 items. Why: the fixed anchor makes many near-identical cards read as one designed list; the escalation turns a list into a crescendo.

### KT-10 Climax triplet into an action CTA (Lottieicon) — S (fast startup)

| Frames | Action | Evidence |
|---|---|---|
| 10 f | Hero word, em ≈44% H (cap 31%), cut on an onset | [V:1ccYWJ t=38.00s] |
| 10 f | Question, em ≈16.7% H | [V:1ccYWJ t=38.333s] |
| 12 f | Imperative, em ≈11.6% H | [V:1ccYWJ t=38.667s] |
| 6 f | Hard cut to a white circle (32.5% H) that shrinks to 16.6% H, E-SNAP-like | [V:1ccYWJ t=39.067-39.27s] |
| ≈7 f | Circle stretches into a search pill | [V:1ccYWJ t=39.47-39.70s] |
| ≈24 f | URL types at ≈23 cps; the magnifier becomes a spinner | [V:1ccYWJ t=39.73-40.53s] |

Fix the reference: end on a logo + URL lockup with the music running to the last frame [V:1ccYWJ §16]. Why: big-small-mid scale contrast resets attention, and the CTA is shown as a real action (search, type, load).

### KT-11 End-card chain with staircase and spacing match (HubSpot) — S (minimal premium)

| Time | Action | Evidence |
|---|---|---|
| 21.60 s | "No complex setup." appears crisp on a staircase (≈13.6% H vertical spread) as the previous shot blur-dissolves | [V:1CSXtQ t=21.47-21.60s] |
| +7-10 f | Staircase collapses onto one baseline (within 10 px after 7 f), E-OUT | [V:1CSXtQ t=21.60-21.93s] |
| Hold → exit | Shrink ×0.80 then ×0.76 on the last frame (E-EXIT), hard cut | [V:1CSXtQ t=21.93-22.60s] |
| Next card | Enters at ×1.18 and settles over ≈20 f; brand icon pops in ≈2 f; the line re-centres ≈72 px @720 in ≈10 f | [V:1CSXtQ t=22.60-23.93s] |
| Exit | Word gaps ×1.5, line +16%, fade to ≈60% over ≈18 f | [V:1CSXtQ t=24.13-24.73s] |
| Next card | Enters with gaps ≈1.25× and tightens in 8-10 f; exits shrinking ×0.81 + fade | [V:1CSXtQ t=24.77-26.03s] |
| Lockup | Cut on the audio peak to the reprised lockup, converging 8 px per side in ≈9 f, then ≥2.2 s still | [V:1CSXtQ t=27.37-30.03s] |

Specs: Medium 500, sentence case with a terminal period, cap 5.8% H (≈90 px font @1080), 2-5 words, one card per 1.1-2.2 s. Why: entrances decelerate and exits accelerate, so every cut lands at peak velocity and the next card absorbs it; the spacing match makes two cards read as one sentence. Its teardown warns that four same-size cards in a row are repetitive: vary scale or add a UI tie-in on the fourth.

### Kinetic budget per film

| Budget | Rule | Evidence |
|---|---|---|
| Signature system | One per film, used 2-6 times | kivi KT-01 ×6; NOSTRA KT-05 ×3; Lottieicon suck-in ×3; HubSpot staircase ×2, spacing ×2 |
| Same grammar | ≤6 uses before it varies | Bumper's ≈12 repeats of KT-02 are flagged [V:19NRDv §13] |
| Semantic letter tricks (RV-20, RV-21) | ≤3 per film, 9-30 f each | [V:19NRDv rule 5] |
| Decode / glitch | Once per film | [V:19NRDv §6] |
| Consecutive text-only cards | ≤3; the 4th must change scale, add a UI or icon tie-in, or change the background | Flags at 4-6 in a row: [V:1-6l8S §16] [V:1ccYWJ §16] [V:1CSXtQ §16] |
| Type-led share of runtime | ≈11% (editorial brand frame) to ≈50% (kinetic launch) | Wix: brand-sentence frames at 0-4.2 s and 49.6-51.4 s ≈11% (computed), 11 words of ad copy [V:15VhHR]; Bumper ≈49% [V:19NRDv §3] |

---

## 9.9 Text-camera interaction

The camera and the type must agree on one thing: **while a word is being read, the camera does not compete with it.** Everything else in this section is a way to move the camera (real or virtual) around type without breaking that rule. Camera moves themselves are specified in Part 04 (CM-01 … CM-20).

**Measured text-camera behaviour**

| Behaviour | Numbers | Evidence |
|---|---|---|
| Lateral drift on a held line | 1.4 px/f native = **0.12% W/f** (≈2.4 px/f @1080, computed) | [V:1-6l8S t=0.53-1.50s] |
| Card drift while read | ≤2 px/f @720 = **0.16% W/f** | [V:1CSXtQ §8] |
| World-space title riding a crane | 0.34-0.51% H/f (≈0.24% W/f equivalent, computed) | [V:1Hcg3X t=0.37-0.97s] |
| Scale drift on held cards | −13 to −24% per card over 1.1-2.2 s (≈0.3-1.2%/f, the faster rates on the exit) | [V:1CSXtQ t=21.9-27.3s] |
| Line pull-back while building | −1 to −3.5% per frame, plus 3 f snaps of −40-55% | [V:19NRDv t=1.50-3.25s, 9.28s] |
| Push on holds | ×1.07-1.29 over 0.5-2.5 s (mostly linear) | [V:1-6l8S §7] |
| Linear push on a final hero word | +8.9% over 33 f | [V:19NRDv t=60.10-61.20s] |
| Accelerating push into a cut | +10.6% over ≈1.7 s (ease-in), cut on the drop | [V:1CSXtQ t=11.3-13.03s] |
| Punch into the cut | +18% in the last 8 f (or +18-33% in 3 f) | [V:1-6l8S t=70.83s, 7.83s, 18.23s] |
| Caret lock | Caret held at x ≈65-66% W | [V:1CSXtQ t=4.5-7.2s] |
| Caret-follow truck (macro) | ≈43% W over ≈3.7 s, peak 1.2-1.8% W/f; caret drifts 19% → 75% W | [V:1CSXtQ t=13.6-17.3s] |
| Caret-follow (ease-in) | 0.5 → 1.6% W/f, caret kept in the right third; typing slows to 7-8 cps | [V:15VhHR t=6.57-8.6s] |
| Jump-reframes on macro words | Instant jumps of 23% W and 72% W at the 7 f word cadence | [V:15VhHR t=0.233s, 0.467s] |
| Logo appearing inside a camera tilt | Fades 30% → 100% over the last 8 f of the move while riding from 65% to 42% H; settles 10 f later | [V:126cpH t=15.93-16.53s] |
| Camera push into text on a 3D ribbon | Cap ≈15% H → ≈40% H in ≈0.47 s | [V:1i2L14 t=15.0-15.47s] |

**TC-01 [U]. Read-safe translation ≤0.2% W/f** (≤3.8 px/f @1080 in 16:9; ≤2.2 px/f across a 1080-wide 9:16 frame, computed). World-space text that moves with its scene in one steady direction may reach ≈0.25% W/f [V:1Hcg3X]. Part 04 sets the same camera limit. Why: at these speeds the eye can track and read at once; faster, it must choose.

**TC-02 [U]. Scale drift is more read-tolerant than translation, provided it is centred on the text.** Calm styles ≤0.6%/f (kivi, HubSpot); kinetic launch styles ≤1.5%/f (Bumper); up to 3.5%/f only in the first ≈16 f after a hero word lands, decaying to ≤1.5%/f [V:19NRDv t=2.45-2.98s]. Why: scaling about the text's own centre keeps every word near where the eye already is, while a translation of the same magnitude slides the word away.

**TC-03 [S]. Pull back while the line builds** (kinetic launch). Shrink the line 1-1.5% per frame while words arrive; when the next phrase needs room, snap −40-55% in 3 f with directional blur [V:19NRDv §7]. Why: the virtual camera seems to back off to make room, which gives flat type a sense of depth and keeps the composition centred.

**TC-04 [SaaS]. Re-centre with smoothing, not with a keyframed move.** A line that grows re-centres by E-LERP (k ≈0.22-0.25, 13-14 f), so it follows its moving target without restarting [V:1-6l8S t=0.10-0.53s]. Why: smoothing is how real dictation and chat interfaces behave.

**TC-05 [SaaS]. When a line types, the camera serves the caret.** Choose one: (a) lock the caret at 65-66% W and scroll the line [V:1CSXtQ t=4.5-7.2s]; (b) one long ease-in-out truck that keeps the newest characters in frame [V:1CSXtQ t=13.6-17.3s]; (c) an ease-in follow that keeps the caret in the right third [V:15VhHR t=6.57-8.6s]. At ECU, slow the typing to 7-8 cps. Why: the eye never has to search for the newest character.

**TC-06 [S]. Macro words reframe by jumps, not pans.** At macro sizes (cap ≈49% H), jump-reframe on each new word so the newest word is whole [V:15VhHR t=0.00-0.63s]. Why: a pan across macro type smears the letters; a jump on the word rhythm reads as an edit.

**TC-07 [U]. Holds push gently; cuts get a push or punch only when they hand off energy.** Steady pushes on holds (×1.07-1.29) keep cards alive [V:1-6l8S §7]; an accelerating push or a punch (+18-33%) belongs only to the last 3-8 f before a cut, and the incoming shot continues the momentum with a decelerating push (kivi's wordmark keeps +29% over 1.17 s after the punch cut [V:1-6l8S t=71.10-72.27s]). Why: momentum crosses the cut, so the cut feels like one move.

**TC-08 [U]. Velocity hand-off across a cut.** Text leaves accelerating; the next text or object enters decelerating in the same direction. HubSpot's typed prompt moves up 3, 3, 5, 7 px/f, then the sent bubble continues at 34, 34, 31, 7, 4 px/f [V:1CSXtQ t=17.60-17.93s]; Lottieicon's pull-back hands off to a title entering at ≈2.1× [V:1ccYWJ t=33.20s]. (Part 05 has the full transition cards.)

**TC-09 [U]. Decide for each class of text whether it lives in world space or screen space, and never mix within a class [inferred rule; evidence for both modes].**
- World space: editorial labels ride the camera and leave with their scene [V:1Hcg3X §8].
- Screen space: SaaS statements stay centred and independent of the camera (kivi, HubSpot, Bumper).
- UI text is part of its UI and rides with it.
- Captions are always screen space [inferred].
- Why: a label that sometimes sticks to its object and sometimes floats reads as a compositing error.

**TC-10 [U]. Text on a 3D plane rotates to face the camera before it must be read.** Bumper's extracted columns rotate face-on during the push-through, before the numbers matter [V:19NRDv t=18.25-18.58s]; Wix's card flattens from ≈15° to 0° in 7 f before its cut-in [V:15VhHR t=33.33-34.47s]; NOSTRA's carousel settles frontal on one card before it pulls back [V:1i2L14 t=12.0-12.87s]. Read text on a plane stays within ≈10° of facing camera (HubSpot's window at ≈10° yaw [inferred from the teardown]). Text on steep planes (Bumper's tables at ≈35° Y) is texture only.

**TC-11 [X]. The camera may travel through or past type once per film.** NOSTRA pushes into a 3D text ribbon (cap ≈15% → ≈40% H) and hides a background swap inside its twist [V:1i2L14 t=14.8-15.6s], and opens with clouds streaming past "IMAGINE" [V:1i2L14 t=0.00-0.70s]. Why it works once: it proves craft. Why only once: type-as-set competes with the product for the hero role [inferred].

**TC-12 [U]. Motion blur on type belongs to entrances and exits, never to holds.** Bumper blurs frames 0-1 of a slam and the slide-in words [V:19NRDv Study 5.1]; whips blur only their last 2 f [V:1i2L14 t=5.87-6.10s]. Premium 2D styles use no blur at all, even on whips (kivi, HubSpot, Lottieicon) [V:1-6l8S §4] [V:1CSXtQ §6]. Pick one policy per film.

**TC-13 [U]. Focus on type: defocus to enter or leave, never while read.** Entrances resolve blur → sharp (RV-03, RV-04, RV-19); exits may defocus for 1-2 f before a cut (EX-07). A text bubble may sit in front of a defocused UI plane with parallax [V:19NRDv t=13.13-14.33s], but read text itself is never soft, and never sits on a defocused layer.

**TC-14 [S]. Text that arrives inside a camera move reaches full opacity by the time the move lands.** Chowdeck's wordmark fades in over the last 8 f of the tilt while riding to its rest position, and settles 10 f later [V:126cpH t=15.93-16.53s].

**Premium vs amateur (text and camera).** Premium: the camera is slow (≤0.2% W/f) or still while text is read, fast moves happen only at the text's entrance and exit edges, and type that moves with the camera is clearly world-space (TC-01, TC-09, TC-12). Amateur: read text carried through an unblurred fast pan (the strobing grid in [V:1ccYWJ t=28.8-32.57s] shows the effect on icons; on text it is [inferred] worse), read text sitting on a defocused plane, and labels that stick to their object in one shot and float in the next (TC-09, [inferred]).

**TC-15 [U]. Reserve the space a camera move will reveal.** Lottieicon pushes its line to y ≈32% so the ribbon can rise beneath it [V:1ccYWJ t=22.33-25.5s]; Chowdeck types its question in the upper third above the subject [V:126cpH t=1.60s]. In AI shot prompts, describe the empty area the text will occupy [P] (Part 02 CO-U10).

---

## 9.10 Text-to-product transitions (and product-to-text)

**TY-SaaS1. The words become the product, or the product folds back into the words.** Five of eight references turn a type card into the product (or the product back into type) at least once without a generic transition (kivi, Wix, HubSpot, Lottieicon, NOSTRA); the other three hand over by hard cuts, light/dark flips or camera moves. Why: a cut from a brand world to a cold screen recording breaks the film's voice; a transformation keeps the viewer in one continuous thought [V:15VhHR WHY #2 → #3].

| ID | Transition | Direction | Mechanics (frames @30) | Evidence | Tier |
|---|---|---|---|---|---|
| **TP-01** | **Typed headline becomes the prompt** | Text → UI | Read text → bar border + shadow 1-3 f → brand icon ≈3 f → toolbar slides up 4-5 f → pull-back ×0.75 over ≈21-31 f (E-INOUT) | [V:1CSXtQ t=7.80-9.03s] | SaaS |
| **TP-02** | **Icon in the sentence becomes the UI** | Text → UI | Cursor hovers ≈1.0 s on an icon inside the sentence; click; the icon stretches into the input pill over 6 f while all other text fades out over the same 6 f; cut to the UI with the pill at the same size (≈57% W) | [V:15VhHR t=2.5-4.23s] | SaaS |
| **TP-03** | **Button becomes the text surface** | UI → text | A pill breaks into horizontal slabs (≈4 f), becomes a thin line, and unfolds into a card (height S-curve over ≈8 f; ≈13 f in all); content fades in 2 f after the card lands | [V:1-6l8S t=9.50-9.93s] | SaaS |
| **TP-04** | **Word → dot → object** | Text → object | The text and its selection box stretch for 1 f, collapse to an ≈8 px dot in 1 f; the dot grows and match-cuts into an object at the same screen position (±5% W) | [V:1i2L14 t=1.033-1.433s] | X |
| **TP-05** | **Shrink into the cut, onto the product** | Text → product | The card shrinks −24 to −28% over 8-18 f (E-EXIT) and cuts on its smallest frame to the logo tile or the product grid | [V:1ccYWJ t=2.33-2.633s, 26.53-27.133s] | S |
| **TP-06** | **Punch into the product world** | Text/icon → product | +18-33% expo-in over the last 3-8 f, hard cut on a beat into the product scene | [V:1-6l8S t=18.23-18.367s, 70.83-71.10s] | S |
| **TP-07** | **Proof dims into the number's background** | Product → text | The product wall dims to ≈15% in 3 f and stays as texture under a count-up | [V:1ccYWJ t=9.833-11.80s] | SaaS |
| **TP-08** | **Product collapses into a slot in the sentence** | Product → text | A deck of products cuts to a slot inside the closing sentence; the slot flips every ≈2 f, collapses to an icon in 6 f; the words close the gap 87% in 6 f, settled by 12 f | [V:15VhHR t=49.63-50.03s] | S |
| **TP-09** | **Object wipe through the headline** | Text → product | A card enters edge-on between two letters and rotates 90° → 0° on Y in 8 f, grows to ≈45% W and occludes the headline; more cards follow | [V:1ccYWJ t=16.10-16.37s] | S |
| **TP-10** | **Send match cut** | Text → UI | The typed text moves up with ease-in (3 → 7 px/f); cut; the sent bubble continues upward with ease-out (34 → 4 px/f), then the camera pulls back into the product world | [V:1CSXtQ t=17.60-18.33s] | SaaS |
| **TP-11** | **Click turns a word into the logo** | Text → brand | The cursor drops in (4 f) and taps a word (2 f); 5 f later the line swaps to the wordmark in 1 f; the brand name is hidden in the benefit ("NO STR(ess)" → NOSTRA) | [V:1i2L14 t=31.90-32.167s] | X |
| **TP-12** | **Text becomes a banner, then a 3D ribbon** | Text → object | Four gradient panels wipe in behind the line at 1 f stagger; the line becomes a banner (1 f), bends into a 3D ribbon carrying repeated text on its path (≈5 f), then the camera pushes in | [V:1i2L14 t=14.50-15.47s] | X |
| **TP-13** | **Whip-out, then the scene blooms in** | Text → scene | The statement whips left in ≈6 f (E-WHIP) while a watercolour ink blot grows from the centre over ≈20 f to reveal the scene | [V:1-6l8S t=38.70-39.75s] | S |
| **TP-14** | **Product blooms into the next title** | Product → text | A radial white bloom grows from the UI in 3-4 f; the next title is already visible through it | [V:1-6l8S t=62.90-63.00s] | S |
| **TP-15** | **Feature first, label second** | Product → text | Show the micro-proof inside the product (a corrected name highlighted for ≈5 f), then name the feature on a title card a few seconds later | [V:1-6l8S t=20.43s → 25.47s] | SaaS |
| **TP-16** | **Prompt bar locked while worlds change** | Text in UI stays | The prompt bar holds identical x/y/size across 6 shots while the keyword swaps and backgrounds cut every 0.23-1.27 s | [V:15VhHR t=8.63-12.47s] | SaaS |
| **TP-17** | **Circle → search pill → typed URL** | Shape → text | Circle shrinks 32.5% → 16.6% H in 6 f, stretches to a pill in ≈7 f, the URL types at ≈23 cps, the icon becomes a spinner | [V:1ccYWJ t=39.067-40.53s] | S |
| **TP-18** | **Wordmark revealed toward the product word** | Brand text | The product word slides aside 1 f before the cut; after the cut the brand letters reveal right → left at 2 f per letter toward it; hold 14 f; QR or CTA scales up in 8 f | [V:19NRDv t=61.40-62.53s] | S |

**Rules for every TP transition**
- **The text must have been read first** [V:1CSXtQ WHY shot 2]: start the transformation only after the text's tier hold (§9.11).
- **One anchor survives.** A shape, a position or a velocity carries across (TP-04 ±5% W; TP-02 same pill size; TP-10 same direction) [V:1i2L14 rule 7] [V:1CSXtQ rule 4].
- **The cause is visible.** A click, a send, a whip or a punch drives the change (TP-02, TP-10, TP-11, TP-06). Two transitions per film should be visibly triggered [V:1i2L14 rule 15].
- **Premium vs amateur.** Premium: the transformation starts after the read, has a visible cause, and keeps one anchor (shape, position or velocity), so the viewer sees one continuous thought [V:15VhHR WHY #2 → #3] [V:1CSXtQ WHY shot 2]. Amateur: a generic dissolve or a cut from a brand card to a cold screen recording, which breaks the film's voice [V:15VhHR WHY #2 → #3]; or a transformation that starts while the text is still being read, so neither the words nor the product register [inferred].
- **Never morph letterforms into product geometry with a generated morph.** Every reference switches between stable states (a 1 f collapse, a hard swap, an occluding object) instead of warping glyphs; an AI morph is where text visibly changes (Master §21 Anti-AI-Look, Phase 10) [inferred from the absence of glyph morphs in 8/8 and Chowdeck's "shape-matched swap instead of AI morphing" rule [V:126cpH rule 4]].

---

## 9.11 How much text at once: word budgets and reading time

### 9.11.1 Word budget per frame

| Beat | Max words on screen | Max characters | Lines (16:9 / 9:16) | Evidence |
|---|---|---|---|---|
| Hook | ≤7 in total (≤5 in 9:16 and spots ≤15 s; ≤3 for a dialect question), 1-2 visible at any instant while it builds (P01 H2) | ≤24 (16:9 ≤40) | 1 / 1-3 | "Still typing?" [V:1-6l8S t=0.10s]; "You don chow?" [V:126cpH]; "For the first time ever" [V:1CSXtQ]; "Take payments like a PRO" [V:19NRDv]; 1-2 macro words visible [V:15VhHR] |
| Hero / punch word | 1-2 | ≤10 | 1 / 1-2 | "So", "One", "Save", "PRO" [V:1ccYWJ] [V:19NRDv] |
| Kinetic line (brand system) | ≤3 | ≤26 | 1 / 2-3 | [V:1i2L14 §8] |
| Statement | **≤6** | ≤32 [N] | 1 / 2-3 | 7/8 refs max 5-7; [N] 1-7 words, ≤32 characters |
| Payoff / message block | 2-6 | ≤40 | 2-4 / 3-5 | "Order Delivered" [V:126cpH]; "Earning credits on your Electric Bill" [V:1Hcg3X] |
| Typed prompt or query | ≤9-12 (read during typing) | ≤70 | 1, overflowing / 2-3 | 9-10 words [V:1CSXtQ t=2.13s, 13.03s]; ≈10 [V:15VhHR] |
| UI status text | ≤5 | ≤24 | 1 | "Rider on his way to you" [V:126cpH rule 9] |
| Caption under a VO | 2 lines × ≤42 characters | 84 | 2 / 2 | [N] Netflix/BBC; 2-line cues [S:Thomson Reuters] |
| CTA button | 1-3 | ≤16 | 1 | [S:playbook §4]; "BOOK NOW" [V:1i2L14] |
| Lockup | Logo + 1 line (tagline ≤4 words or a URL) | — | — | [V:1CSXtQ] [V:19NRDv] [V:1-6l8S] |
| UI texture | Unlimited, if nothing depends on it | — | — | ≈60-word answer scrolled past in ≈1.5 s [V:1CSXtQ t=20.0-21.47s] |
| **Absolute cap per frame (read class)** | — | **84** | — | [N] |

> **References and generic advice agree here.** [N]'s kinetic headline beat of 1-7 words and ≤32 characters matches the references' median maximum of 6 words. Use ≤6 as the hard default and allow 7 only when one word is an inline object or the line is a bookend sentence the viewer will see twice (Wix's "Build a website you ♥ love… with WIX" [V:15VhHR t=0.63s]).

### 9.11.2 Reading-time tiers

Reading starts when the first word is legible, not when the last one lands, because sequential reveals let the eye read during the build [inferred from the references' short landed holds]. So each tier has two numbers: the **landed hold** (last word settled → exit starts) and the **total visible time** (first word legible → exit starts).

| Tier | Applies to | Landed hold (minimum) | Total visible (minimum) | Measured | Evidence |
|---|---|---|---|---|---|
| **Punch** | 1-2 words, cap ≥10% H, alone in frame, in a run of ≥2 rhythmic cards | — | **10-15 f** | 10-12 f [V:1ccYWJ t=38.0-39.07s]; 11-15 f swaps [V:1ccYWJ t=5.43-7.30s]; 11-16 f swaps [V:19NRDv t=57.60-59.90s] | Part 03 SP-H |
| **Kinetic** | ≤3 words revealed word by word, cap ≥5.5% H, near-empty frame | **10-14 f** (≥15 f over a busy background) | ≈0.9-1.0 s | 10-23 f landed, ≈1.0 s per sentence [V:1i2L14 §8]; 3-word cards 0.87-1.63 s [V:1ccYWJ]; 1.0-1.3 s [V:1CSXtQ t=21.47-27.37s] | |
| **Statement** | 4-6 words on a ≥85% empty frame, built in ≤2 chunks | **≥0.8 s** | **0.25 s × words + 0.25 s** (5 words → 1.5 s; 6 → 1.75 s) [inferred: a conservative fit just above kivi's 1.2-1.45 s for 5 words] | kivi 5-word cards ≈0.6-1.1 s landed, 1.2-1.45 s visible [V:1-6l8S t=37.25-38.70s, 52.25-53.5s, 62.95-64.2s, 69.65-70.83s]; Bumper 0.6-1.6 s legible [V:19NRDv §8]; HubSpot 5 words 2.17 s [V:1CSXtQ t=22.60s] | |
| **Message** | 5+ words with new information; any text over footage, a photo or a busy UI; captions | **max(1.0 s, 0.33 s × words + 0.4 s, characters ÷ 17)**; ×1.15 for Hindi or Hinglish [N, unverified] | — | The references' failures sit here: a 6-word block complete for 0.4 s [V:1Hcg3X t=29.80-30.2s]; a 2-word question over footage for 0.45 s [V:126cpH t=2.07-2.50s] | [N] |
| **Typed** | Prompts and display type-ons | ≥0.6 s after the last character (display type-on 15-20 f) | Typing time counts as reading | 0.6 s [V:1CSXtQ t=7.2-7.8s]; 15-20 f [V:1ccYWJ t=34.73-38.0s] | |
| **Payoff** | The line the viewer must remember | **≥1.0 s fully still** | — | ≈1.0 s [V:126cpH t=14.2-15.2s]; 1.0 s [V:15VhHR t=0.63-1.43s] | [V:126cpH rule 14] |
| **UI status** | Text that tells the story inside the UI | **≥1.0 s** per status (≤5 words) | — | 0.33 / 0.5 / 1.1 s / 2 f, of which only 1.1 s works [V:126cpH t=11.2-13.6s] | [V:126cpH rule 9] |
| **Lockup** | Logo, tagline, URL, CTA | ≥1.5 s; the final frame ≥2.0-2.2 s still | — | 2.2 s [V:1CSXtQ t=27.87-30.03s]; ≈1.7 s [V:15VhHR t=52.20-53.87s]; 1.4 s [V:126cpH t=16.53-17.97s]; ≥4 s with a QR [V:19NRDv rule 15] | |

> **References win (statement tier, refining Part 03 §18.8).** [N]'s subtitle-derived formula asks a 5-word line to hold ≥2.05 s after it lands. kivi holds its 5-word statements ≈0.6-1.1 s after landing (1.2-1.45 s in total) and its teardown flags no readability problem; Bumper's lines are fully legible for 0.6-1.6 s. The difference is the context: a subtitle is read while the eye also watches action, but a statement card is the only thing in an otherwise empty frame and arrives in one or two chunks the eye reads during the build. So for a 4-6-word statement alone on a ≥85% empty frame, use the statement tier. Part 03 §18.8's "any message of 5+ words: never below the [N] formula" still applies to messages, captions, busy plates and new information, which is where every reference failure sits. Do not go below kivi's 0.24 s per word of total visible time; kivi reaches it only on a repeated template ("Your X, Y by voice") that the viewer has learned [inferred].

> **References win (punch tier).** Netflix's minimum event of 5/6 s (25 f) [N] and [N]'s 1.0 s floor do not apply to 1-2-word punch words in a rhythmic run: the references use 10-15 f with no flagged problem (Part 03 SP-H says the same).

### 9.11.3 Density across a film

- **Text change cadence.** Narrated SaaS films change on-screen text every ≈2.5-3.5 s and the idea every 7-14 s [S:playbook §1.6]; caption lines average 2.4-3.5 s (Superspace) and 3.2 s (Luminate) [S:Superside] [S:Snowflake]. Kinetic sections in the references change cards every 0.33-2.2 s [V:1ccYWJ §11] [V:1CSXtQ §11]. Use the faster cadence only for 1-3-word beats.
- **Words per film.** A brand-frame film can say everything in ≈11 words of ad copy (Wix, 54 s) [V:15VhHR §Typography]. A kinetic launch carries ≈50% of its runtime as type (Bumper) [V:19NRDv §3]. Choose the end of the range by style, not by habit.
- **Text-only runs.** ≤3 consecutive text-only cards; the teardowns flag 4 (HubSpot), 5 (kivi, over an ambient bed) and 6 (Lottieicon) [V:1CSXtQ §16] [V:1-6l8S §16] [V:1ccYWJ §16]. Break a run with a UI beat, a scale change or a music lift.

### 9.11.4 Text and voice sync

When a voice speaks the words (VO, in-world dictation, or a customer soundbite):
- **A word never appears after its sound.** Picture leading sound is tolerated far more than the reverse (ITU-R BT.1359: +45 ms early vs −125 ms late is the detectability threshold) [P].
- **Reveal frame = round((word start ms − 67) ÷ 1000 × fps)**, i.e. start the pop-in ≈2 f before the onset so the word is legible on it; switch a karaoke highlight at the onset or 1 f early [P].
- **Hold a phrase ≥5/6 s (25 f); a line may stay up to 500 ms after its last word; keep ≥2 f between caption events** [P] (Netflix timing guide).
- **Page captions** by combining tokens within 1,200 ms and breaking on silences of 400 ms, with a forced page break at scene boundaries [P].
- **Stream in-world speech at its own rate.** kivi's transcript streams at 4-7 wps exactly where the voice's formants appear [V:1-6l8S §12].
- **Music-led type** lands on the grid 0-2 f before the beat [V:19NRDv §11]; never after it [V:19NRDv §16].

---

## 9.12 Readability-in-motion rules (the RM checklist)

Each rule is pass/fail with a number, so a validator or a QC editor can apply it.

| ID | Rule | Threshold | Evidence |
|---|---|---|---|
| **RM-01** | Text is slow while it is read; fast motion only at the edges | Translation ≤0.2% W/f; scale ≤0.6%/f (calm) or ≤1.5%/f (kinetic); fast motion only in the first 4-8 f and the last 2-8 f of the text's life | [V:19NRDv §8] [V:1CSXtQ §8]; TC-01/02 |
| **RM-02** | Legible early in its entrance | Blur gone and opacity ≥90% by frame 4 (labels), 8 (word slides), 12 (statement rises), 20 (soft slams) | RV-03 … RV-07 |
| **RM-03** | No spring on read text | Overshoot 0%; no bounce, no per-letter rotation. A ≤3% width correction after an auto-fit is the only exception | 8/8 refs; auto-fit 407 → 395 px [V:1ccYWJ t=35.27-35.8s] |
| **RM-04** | Size floors | §9.2 floors (cap ≥2.5% read; ≥3.6% mobile-safe; 84 px sentences for phone-inline 16:9; 9:16 ≥52 px body) | §9.2.2 |
| **RM-05** | Contrast | ≥4.5:1; 3:1 only for large text (≥66 px in 9:16 [N]; ≈117 px in phone-inline 16:9, computed from [N]'s 0.205 pt/px); 7:1 over footage; scrim ≥60% or a frosted card over a defocused plate | [N]; Part 02 §11.3; frosted cards over defocused plates [V:1-6l8S t=18.37s] |
| **RM-06** | Holds by tier | §9.11.2 | §9.11.2 |
| **RM-07** | Blur policy | Motion blur only on entrance frames and whip exits; never during a hold; one policy per film | TC-12 |
| **RM-08** | Nothing crosses the claim | Decorative layers masked behind the text's bbox + ≈10% padding | [V:126cpH t=3.9-4.4s]; Part 02 CO-U6 |
| **RM-09** | Words never collide | No overlapping glyphs during any exit or swap | [V:1-6l8S t=64.27-64.33s] |
| **RM-10** | Glow is subtle | Radius ≤2-3% of cap height; dark energetic styles only; never in prompt-native films | [V:19NRDv t=7.2s]; Part 02 CL-S1, CL-A4 |
| **RM-11** | Information stays inside safe areas | ≥5% H inside title-safe in 16:9; x 120-840, y 270-1210 in 9:16; display bleed ≤0.7 s only | [V:19NRDv t=30.9-35.9s]; Part 02 §4.7 |
| **RM-12** | One reading position | Statements return to the same centre-line (y 47-52% H); successive words appear where the eye already is | TY-P1, TY-P5 |
| **RM-13** | Text levels per frame | 1 (premium) or 2 at ≥1:2.5; 3 only in a title stack, adjacent levels ≥×1.45 | TY-H1 |
| **RM-14** | Copy is locked | Identical strings across cut-ins and versions; consistent grammar and number formats; one language unless localised on purpose | "make" vs "create" [V:15VhHR t=6.57s]; "Designer" vs "Developers", "4,863+" vs "50 + Categories" [V:1ccYWJ §13]; French + English [V:1i2L14 §13] |
| **RM-15** | Transitional colour states settle | AI gradients settle within 6-8 f; never >15 f | [V:15VhHR §Typography, §What to avoid] |
| **RM-16** | Glitch and decode are short | ≤10-12 f, once per film | [V:19NRDv t=1.17-1.50s]; [V:1i2L14 §16] |
| **RM-17** | UI text that tells the story is readable | ≥1.0 s per status; the final status is never a 2 f flash | [V:126cpH t=13.53s] |
| **RM-18** | Repetition limits | ≤3 consecutive text-only cards; one reveal grammar ≤6 uses | §9.8 budget |
| **RM-19** | No dead open | Type or a moving object on frame 0-1; the first change ≤0.5 s | [V:19NRDv t=0.00s] [V:1i2L14 t=0.00s] [V:1Hcg3X t=0.03s]; flaw at 0.73 s [V:126cpH]; [N] hook rule |
| **RM-20** | Photosensitivity | ≤3 flashes per second; flash frames ≤3 f, once per film; never strobe text colours | [N] WCAG 2.3.1; [V:1Hcg3X t=12.83-12.97s] |
| **RM-21** | No read text on a strobing move | Text is not on screen during camera moves above ≈5% W/f unless motion-blurred (Part 04's unblurred speed cap) | The measured strobe is Lottieicon's unblurred icon grid at 22-27% W/f [V:1ccYWJ t=28.8-32.57s §13]; applying it to text is [inferred]; Part 04 |
| **RM-22** | Frame cadence | Type and UI animate on ones; stepped "on twos" only on illustration layers | [V:126cpH rule 13, inferred] |
| **RM-23** | Delivery protects thin type | Native frame rate (no 24/25 → 30 pulldown), H.264 CRF 18 [N] (a ≥8-12 Mb/s floor at 1080p for UI-heavy films is [inferred]), PNG or JPEG ≥95 frames, bt709 | [N]; pulldown in [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X]; low bitrate in [V:1CSXtQ §13] |
| **RM-24** | Type is composited, never generated | Every visible word comes from the compositor with a locked font file and string | §9.20 |

---

## 9.13 Universal principles (TY-U)

Each is measured in at least three references with none contradicting, unless marked.

| ID | Principle | Numbers | Evidence (count) | Why it works |
|---|---|---|---|---|
| **TY-U1** | One sans for all copy, ≤1 accent face with one role | 1-2 faces | 8/8 (§0.1) | One voice; the rare accent face reads as a signal |
| **TY-U2** | Statements are centred single lines on the y 47-52% H centre-line | Width 35-70% W, ≤85% W for ≤6 words | 6/8 | A fixed reading position across fast cuts |
| **TY-U3** | Statements are small and light; size jumps are reserved for 1-2-word hero words | Statement cap 4.4-6.6% H, weight 400-500; hero cap 10-23%; climax 31-33% | 7/8 | "A small, quiet sentence reads as confidence" [V:15VhHR]; contrast with the rare big word makes it land |
| **TY-U4** | ≤6 words per read frame | Typical 2-4 | 7/8 (typed prompts excepted) | The eye reads 6 short words in ≈1.5 s on an empty frame |
| **TY-U5** | No overshoot, bounce or elastic on type | 0% | 8/8 | Critically damped settles read as precise; bounce reads as a template [V:19NRDv §6] [V:15VhHR §What to avoid] |
| **TY-U6** | Exits are faster than entrances and accelerate | Exit ≈½ the entrance; 4-8 f | 6/8 (§9.7) | The text is already read; the exit only hands momentum on |
| **TY-U7** | Text is slow while read; fast motion only at its edges | First 4-8 f, last 2-8 f | [V:19NRDv] [V:1CSXtQ] [V:1-6l8S] [V:1Hcg3X] | The eye tracks and reads at once only at low speeds |
| **TY-U8** | Copy is revealed sequentially at a spoken or musical rhythm | Words 7-10 f apart (eighth notes) or at speech rate | 8/8 | The viewer reads along at the film's tempo, sound on or off |
| **TY-U9** | Type keeps living after it lands, until the final lockup | Drift 0.12-0.25% W/f, or scale 0.3-1.5%/f | 6/8 | No dead frames; flat type gains depth |
| **TY-U10** | One accent word or phrase per line, usually arriving last | Accent +1-8 f after the neutral part | [V:1-6l8S] [V:19NRDv] [V:1i2L14] [V:126cpH] (HubSpot uses weight instead) | The eye's last fixation lands on the benefit |
| **TY-U11** | Micro-text is texture; the value that matters is enlarged or cut in on | Read class cap ≥2.5% H; cut-ins 2-3.4× | Flaw in 6/8; fixes in [V:19NRDv t=23.9s] [V:15VhHR t=6.57s] | Meaning never depends on text the viewer cannot read |
| **TY-U12** | Two text levels in one frame differ by ≥1 : 2.5 | Setup : punch 1 : 2.5-3 | [V:126cpH] [V:1Hcg3X] [V:19NRDv] [V:1ccYWJ t=38.0-39.07s] | Unambiguous reading order |
| **TY-U13** | Motion is line- or word-level; per-letter motion only for semantic moments | Semantic ≤3 per film | 8/8 (kivi "never rotates or scales per letter"; Solar "never letter-by-letter, never bounce") | Rigid glyphs stay legible |
| **TY-U14** | Holds follow the reading tiers | §9.11.2 | Refs + [N] | Failures in the set are all hold failures on messages |
| **TY-U15** | Text never arrives after its sound or its beat | Lead by 0-2 f | [V:19NRDv §11] [V:1-6l8S §12]; [P] | Late text reads as lag |
| **TY-U16** | Frame 0 already carries type or motion | First change ≤0.5 s | [V:19NRDv] [V:1i2L14] [V:1Hcg3X] [V:1CSXtQ] [V:1ccYWJ]; flaw [V:126cpH] | Frame 0 is the thumbnail and the scroll-stopper [N] |
| **TY-U17** | Copy is locked across shots and versions | Identical strings, grammar, number format, language | Flags in [V:15VhHR] [V:1ccYWJ] [V:1i2L14] | Changing text is the first thing viewers (and AI-QC) catch |
| **TY-U18** | Text rides the momentum of the transition that delivers it | RV-26, TC-08 | [V:19NRDv] [V:1i2L14] [V:1CSXtQ] [V:1ccYWJ] | Two shots read as one move |
| **TY-U19** | No drop shadows, long shadows or bevels on type; depth comes from scale, light and focus | — | 7/8; the one long shadow is flagged as dated [V:126cpH] | Effects on letters date instantly and hurt legibility |
| **TY-U20** | Text on a 3D plane faces the camera before it is read | ≤≈10° from facing | [V:19NRDv] [V:15VhHR] [V:1i2L14] | Perspective-skewed text is texture |

---

## 9.14 Style-specific typography (TY-S)

| Style (Part 02 / Phase-11 name) | Family and weight | Case | Sizes (16:9) | Signature reveal / system | Exit | Emphasis | Light and blur | Holds | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| **Minimal Premium SaaS** ("Airy calm-tech") | Humanist sans 400 (300 for big display [E]); one serif wordmark | Sentence | Statement font 68-95 px (90 default); hero ≈108 px | KT-01 live-append; RV-04 rise + blur; RV-18 tonal materialise | EX-02 blur dissolve; EX-03 whip; EX-08 punch | Two-tone accent phrase | No glow, no motion blur; aurora behind | Cards 1.2-1.9 s | [V:1-6l8S]; [E] |
| **Prompt-native launch** | Brand sans 400 typed, 500 cards, 700 on one word | Sentence + period | Typed 51-64 px; cards cap 5.8% (90 px) | KT-03 typed headline → UI; KT-11 end-card chain; RV-16 tracking-in | EX-04 shrink; EX-06 spacing | Weight, not size | No glow; blur only in the 3D beat | Cards 1.1-2.2 s; typed hold ≥0.6 s | [V:1CSXtQ] |
| **Editorial brand frame + product montage** | Geometric grotesk 400; generated content in its own display faces | Sentence (brand); CAPS (content) | Brand cap 6.6% (≈101 px); macro cap 49% | KT-07 bookend sentence; RV-28 inline chips; RV-22 AI colour | Hard cut; TP-08 slot collapse | AI gradient colour; inline objects | None | ≥1.0 s still before motion | [V:15VhHR] |
| **Kinetic-type launch** ("Night claim / Day proof") | Geometric grotesk 500/600 + heavy rounded display ≈900 for the product name | Sentence; caps wordmark | Phrase cap 4.5-5.5%; headline 8-9%; hero 15-23%; PRO ≈33% | KT-02 slam + build + pull-back; RV-20/21 semantic letters (≤3); KT-09 escalating swap | EX-03 smear; EX-07 defocus; ride into wipes | Orange benefit word; function words at ≈60% | Bloom on white type over dark, radius ≤2-3% of cap; motion blur on entries | 0.6-1.6 s legible | [V:19NRDv] |
| **Fast startup / dark neon library** | Rounded geometric sans 500 (labels 600) + one italic serif for the variable word | Sentence | Statements em 72-116 px; climax em ≈470 px | KT-04 snap-hold-suck; RV-09 auto-fit type-on 40-55 cps; KT-09 slot swap; KT-10 climax triplet | EX-04 suck-in; EX-05 rise-and-fade | Italic serif variable word; scale contrast | Emissive glow on UI, not on type; no motion blur | Punch 10-12 f; lines 0.5-1.6 s | [V:1ccYWJ] |
| **Monochrome brand-system explainer** | Wide geometric sans 600 (800 for knock-out labels) | ALL CAPS | Body cap 5.6% (87 px); hero 8.5-11% (130-170 px) | KT-05 scatter-swap-converge; RV-12 mask reveals; TP-04, TP-11 | EX-09 mask wipe-off; EX-10 collapse to dot | One green key word per line; polarity flip per cut | Grain-gradient 3D accents, not on type | 10-23 f landed (≤3 words) | [V:1i2L14] |
| **Editorial 2.5D explainer** | Bold grotesk labels + transitional serif for concept words | CAPS serif title; lowercase concept; Title Case labels | Labels cap 3.6-4%; message cap 5.6%; title cap 11.6% | KT-06 title stack + world-space labels; RV-03 2-5 f blur-fade | Rides out with the scene (EX-15) | Colour from the 5-colour palette, inverted against the field | Neon glow only on emitter labels; fine grain overall | Labels ≈1-2 s; messages must meet [N] | [V:1Hcg3X] |
| **Playful illustrated collage + UI (consumer)** | Heavy rounded geometric ≈900 lowercase + bold grotesk payoff | lowercase; Title Case payoff | 9:16 punch em ≈320 px; payoff em ≈190 px @1920 | KT-08 setup/punch pop; RV-09 typewriter ≈15 cps | Hard cuts; tilt carries the logo | Setup : punch size 1 : 2.5-3; yellow punch over white setup | Flat; illustration on twos, type on ones [inferred] | ≥0.7 s; payoff ≥1.0 s | [V:126cpH] |
| **Cinematic product launch / 3D technology beat** | The film's statement face, unchanged | — | Statement size; no new display face | Type stays out of the 3D hero move; it returns on a blur-dissolve (8 f) after the move | EX-07 defocus into 3D | — | DOF and bokeh on the scene, never on read text | Text appears after the camera settles | HubSpot's only 3D beat carries no statement type (its answer text is texture) [V:1CSXtQ t=17.80-21.47s]; Bumper keeps claims in the 2D world [V:19NRDv §1]; "bold type, dark, kinetic… cinematic" brief vocabulary [W:motion.so] |

**TY-S1.** Bloom on type only in dark, energetic styles; never in prompt-native or minimal premium films (Part 02 CL-S1).
**TY-S2.** CAPS only where the whole system is caps (brand system, editorial title, generated display content). Never mix a caps statement into a sentence-case film [inferred from 8/8 consistency].
**TY-S3.** Animating on twos is for illustration and collage; text and UI stay on ones [V:126cpH rule 13, inferred].
**TY-S4.** A playful style may pop one hook word on in 1 f (RV-02); premium styles never pop type without a tween or a cut.

---

## 9.15 Experimental typography (TY-X)

Single-reference techniques, or techniques with no reference at all. Validate each on a test render before using it as a default.

| ID | Technique | Numbers | Evidence | Validate |
|---|---|---|---|---|
| **TY-X1** | Scale-contrast hook: macro words (cap ≈49% H, bleeding) for ≤0.7 s, then a hard cut to the same words at cap ≈6.6% | ≈7.4× size cut; a word every 7 f | [V:15VhHR t=0.00-0.63s] | That the small line is readable on the first frame after the cut |
| **TY-X2** | Staircase → baseline collapse | Step ≈5% H; collapse in 7-10 f | [V:1CSXtQ t=1.50s, 21.60s]; scatter variant [V:1i2L14] | That the staircase is not mistaken for a layout error in frame 1 |
| **TY-X3** | Word-spacing match cut between two cards | Exit gaps ×1.5 over ≈18 f; entry gaps ×1.25 → 1 in 8-10 f | [V:1CSXtQ t=24.13-25.43s] | That both cards read as one sentence |
| **TY-X4** | Scatter → swap → converge | ≈1.0 s per sentence; swap in 1 f while displaced | [V:1i2L14 t=7.57-10.63s] | That no frame shows two sentences mixed |
| **TY-X5** | Auto-fit type-on | 40-55 cps; scale the line down once it passes ≈50% W so the final width is ≤70% W; ≈15 f pause between phrases; hold 15-20 f; add key ticks | [V:1ccYWJ t=34.33-38.0s] | Final size ≥ the read floor |
| **TY-X6** | Escalating word swap ending on the product name | Intervals 16 → 11 f; height 10 → 34% H | [V:19NRDv t=57.60-60.03s] | That each word is readable at 11 f |
| **TY-X7** | Text-on-path 3D ribbon | Banner → ribbon in ≈5 f; push from cap 15% to 40% H | [V:1i2L14 t=14.67-16.6s] | Once per film; the repeated text must stay legible on the curve |
| **TY-X8** | Click turns a word into the logo (the brand hidden in a benefit) | Tap 2 f; swap 1 f, ≈5 f after the tap | [V:1i2L14 t=32.0-32.167s] | Only if the name genuinely hides in the copy |
| **TY-X9** | Mask wipe-off and re-type with one anchor word | ≈1 letter/f out; 10-11 f back in | [V:1i2L14 t=6.17-7.00s] | The anchor word never moves |
| **TY-X10** | Tonal materialise of a wordmark | Ghost → full ink over ≈42 f, ending in an L → R tonal sweep | [V:1-6l8S t=6.2-7.6s] | That the ghost is visible on frame 1 (≈25-30% contrast) |
| **TY-X11** | Semantic letters (scramble, self-assembly, kick, arc) | ≤3 per film, 9-30 f | [V:19NRDv] [V:1i2L14] | The word must be readable before and after the trick |
| **TY-X12** | Variable-font axis animation (width or optical size) as an alternative to tracking-in | e.g. wdth 75 → 100 over 8-12 f, E-OUT | No reference; fonts with width/opsz axes exist (Bricolage Grotesque, Archivo, Anek Devanagari) [N] [inferred] | Untested: check that the line width change does not shove neighbours |
| **TY-X13** | Karaoke caption (current word in ink, others at 40%) | Highlight switches at the onset or 1 f early | [E] recipe [inferred]; sync rule [P] | Only with a VO; contrast of the 40% words ≥3:1 |
| **TY-X14** | Chapter rail with labelled segments | Chips proportional to section length; active chip cross-fades 5-6 f | NOSTRA's wrapper bar [V:1i2L14 §9]; the playbook lists a chapter rail as an engine gap [S:playbook §5] | For long explainers only; it costs vertical space |

---

## 9.16 Avoid (TY-A)

| ID | Avoid | Seen in | Why it fails | Fix |
|---|---|---|---|---|
| **TY-A1** | Meaning carried by micro-text at 1-2% H | 6/8 | Illegible at delivery, especially on phones | Read-class floor (cap ≥2.5% H), or enlarge the one value, or cut in 2-3.4× |
| **TY-A2** | Payoff or message text fully on screen <0.5 s | [V:1Hcg3X t=29.80s] (0.4 s); [V:126cpH t=2.07s] (0.45 s), t=13.53s (2 f) | The idea that matters most is the one viewers miss | Message tier (§9.11.2); payoff ≥1.0 s still |
| **TY-A3** | Overshoot, bounce, elastic or per-letter rotation on read text | None of the 8; listed as an avoid in [V:15VhHR] [V:19NRDv] [V:1CSXtQ]; "bouncy text" exists as a catalogue genre [W:raivcoo] | Reads as a template; wobbling letters cost reading time | 0% overshoot (E-OUT / E-SNAP / E-CRIT) |
| **TY-A4** | Static first frames | [V:126cpH t=0.00-0.73s] | Frame 0 is the thumbnail; a static open loses the scroll | Type or motion on f0-f1; first change ≤0.5 s |
| **TY-A5** | Decoration crossing the claim | [V:126cpH t=3.9-4.4s] | The key word is covered at the moment it matters | Mask decoration behind the text bbox + ≈10% |
| **TY-A6** | Bloom that smears letter edges | [V:19NRDv t=7.2s] (first 3-4 f of "Save") | Soft edges read as low quality and hurt legibility | Glow radius ≤2-3% of cap height |
| **TY-A7** | Text clipped by the frame edge | [V:19NRDv t=30.9-35.9s] | Reads as a mistake for its whole duration | ≥5% H inside title-safe; 9:16 text column |
| **TY-A8** | Words overlapping during an exit | [V:1-6l8S t=64.27-64.33s] ("spreadsheetpowered") | Reads as a glitch | Split the gap (EX-12) or shrink as a group |
| **TY-A9** | Copy that changes between a wide and its cut-in; inconsistent grammar or number format; unplanned mixed languages | [V:15VhHR t=6.57s]; [V:1ccYWJ §13]; [V:1i2L14 §13] | Viewers notice changing text instantly; it is also a core AI-look tell | Lock strings in a continuity sheet (§9.20) |
| **TY-A10** | Glitch or pixel builds longer than ≈12 f | [V:1i2L14 t=16.63-17.50s] (23-26 f) | Long illegible noise | ≤10-12 f, once per film |
| **TY-A11** | The same type grammar repeated >6 times; ≥4 text-only cards in a row | [V:19NRDv §13]; [V:1CSXtQ §16] [V:1-6l8S §16] [V:1ccYWJ §16] | Monotony in the middle third | Vary with semantic variants or a UI beat |
| **TY-A12** | Long shadows, bevels or drop shadows on type | [V:126cpH t=0.73s] | Dated | Flat type, or an offset backing plate on UI cards only |
| **TY-A13** | Hook text under ≈5% H cap on phone-bound films | [V:1CSXtQ t=0-2.13s] (cap 3.6%) | The hook is weak exactly where the feed is | Hook cap ≥5.8% (T-STATEMENT) or a hero word |
| **TY-A14** | A tiny URL or ending on a bare URL | [V:19NRDv] (≈24 px cap); [V:1ccYWJ] (≈2% H); [V:1-6l8S t=75.53s] (no lockup, no verb) | The CTA is the least readable thing in the film | URL font ≥54 px @1080; logo + URL lockup with a verb ("Try X →" [E]) |
| **TY-A15** | Typed logos (a wordmark rebuilt from a font) | [E] (the brand's own avoid list) | Off-brand; drifts between shots | Use the official SVG |
| **TY-A16** | Letting a video generator draw any text | [P] (Veo adds gibberish subtitles when dialogue is implied); [N] (generative video cannot set exact typography) | Garbled, changing letters: the clearest AI tell | Composite all type (§9.20) |
| **TY-A17** | Typing with no sound | [V:1ccYWJ §12] | Typing looks weightless and fake | Soft key ticks 20-25 dB under the music [V:1CSXtQ §12] |
| **TY-A18** | Reading text on a camera move faster than ≈5% W/f without blur | [V:1ccYWJ t=30.57-32.57s] (an unblurred icon grid strobing at 22-27% W/f; the text case is [inferred] from it) | Strobing text is unreadable | Clear the text before the move or add 180° motion blur |

---

## 9.17 Especially good for SaaS (TY-SaaS)

| ID | Technique | Why it fits SaaS | Evidence |
|---|---|---|---|
| **TY-SaaS1** | The words become the product (TP-01, TP-02, TP-10, TP-16) | The promise and the interface are one continuous thought, with no cut to a cold screen recording | [V:1CSXtQ] [V:15VhHR] |
| **TY-SaaS2** | Typed prompt as headline (KT-03): variable typing speed, caret lock, UI built around read text | Every AI product starts with typing; the ad becomes a prompt | [V:1CSXtQ] |
| **TY-SaaS3** | Speech-pace vs machine-pace streaming (RV-11) | Shows human input and instant AI output in one shot | [V:1-6l8S] |
| **TY-SaaS4** | One reserved AI colour that only text being written by AI may wear, settling in 6-8 f (RV-22) | Teaches "AI is acting" without a caption | [V:15VhHR] |
| **TY-SaaS5** | Two-tone statements: subject in ink, benefit in the brand accent (KT-01) | Each card is a micro before → after | [V:1-6l8S] [V:19NRDv] |
| **TY-SaaS6** | Feature first, label second (TP-15) | Proof precedes the claim, so the label confirms rather than asserts | [V:1-6l8S t=20.43s → 25.47s] |
| **TY-SaaS7** | Status cycling in one container, ≥1.0 s per status (EX-13) | Shows time passing in a workflow without new shots | [V:126cpH] |
| **TY-SaaS8** | Proof-first counters: the product wall dims to ≈15% under a linear tally, or an expo-out counter parks a cursor on the final value | The number is believable because the evidence is still visible | [V:1ccYWJ t=9.83-11.8s] [V:19NRDv t=23.90-24.93s] |
| **TY-SaaS9** | Slot machine for audiences or use cases (KT-09) | Covers 3-5 personas in ≈2 s | [V:1ccYWJ] [V:15VhHR] |
| **TY-SaaS10** | Bookend sentence: the hook line returns at the end (KT-07, KT-09) | The logo inherits the whole film's meaning | [V:15VhHR] [V:19NRDv] |
| **TY-SaaS11** | Real product strings everywhere: real labels, believable data, real UI copy | Text is the fastest way to spot a fake UI | Merchant IDs, GBP amounts, dates [V:19NRDv §9]; real composer and dropdown labels [V:1CSXtQ §9] |
| **TY-SaaS12** | Enlarge the one number that matters inside the UI | The proof is readable while the rest stays texture | "100%" at cap ≈6% [V:19NRDv t=24.93s] |
| **TY-SaaS13** | Selection highlight → corrected word, ≈5 f | A one-frame proof of an AI feature | [V:1-6l8S t=20.43-20.60s] |
| **TY-SaaS14** | Shimmer status line for "Generating…" | A familiar UI idiom for waiting on AI | 60 f sweep + 15 f pause [E]; component 2 s + 0.5 s [E, code] |

---

## 9.18 Do / Don't

| Do | Don't | Why | Evidence |
|---|---|---|---|
| Set statements at cap ≈5.8% H (90 px @1080), Regular or Medium | Fill the frame with bold headlines on every card | Small, quiet type reads as confidence; big type is a punctuation mark | TY-U3 |
| Keep one sans and give an accent face one job | Pair two display faces "for variety" | The accent works only because it is rare | TY-U1 |
| Put the benefit phrase in the accent colour and bring it in last | Colour random words or whole lines | The eye's last fixation lands on the benefit | TY-U10 |
| Reveal word by word on eighth notes (≈8 f) | Fade a whole sentence in at once | Sequential reveals set reading tempo | TY-U8 |
| Land with E-OUT / E-SNAP and 0% overshoot | Use the default spring (16.3% overshoot [N]) on text | Bounce reads as a template | TY-U5 |
| Exit in 4-8 f with an accelerating curve | Fade out as slowly as you faded in | The exit only clears the stage | TY-U6 |
| Keep held text drifting ≤0.2% W/f | Freeze type dead for seconds, or slide it fast while it is read | Alive but readable | TY-U9, RM-01 |
| Hold a 5-word statement ≥0.8 s after it lands (1.5 s visible) | Whip a 6-word message away after 0.4 s | Message failures are the set's real readability flaws | §9.11.2 |
| Hold UI status text ≥1.0 s | Flash the final status for 2 f | The status is the story | RM-17 |
| Keep statements on one centre-line across cuts | Move every card to a new height | The eye is already where the next word appears | TY-P1 |
| Let a growing line re-centre with smoothing, auto-fit or a caret-follow camera | Let it grow off-centre and then jump | Stable composition while typing | TY-P4 |
| Make micro-UI obviously texture, and enlarge the one value that matters | Put meaning in 1-2% H labels | It will not be read | TY-A1 |
| Show the typing and build the UI around the text the viewer just read | Cut from a brand card to a cold screen recording | One continuous thought | TY-SaaS1 |
| Use the official logo file | Retype the wordmark in a font | Brand fidelity and shot-to-shot consistency | TY-W3 |
| Composite every word in the editor, with locked strings | Ask the video model to write the headline | Generators garble and change text | §9.20 |
| Mask decorative rays behind the type | Let effects pass over the claim | The key word is covered | TY-A5 |
| Keep glow ≤2-3% of cap height on dark styles only | Bloom white type until its edges smear | Legibility and polish | TY-A6 |
| Lead the beat or the voice by 0-2 f | Land text after the sound | Late text reads as lag | TY-U15 |
| Vary the reveal after ≈6 uses and break text runs after 3 cards | Run the same card treatment 12 times | Monotony | TY-A11 |
| Re-lay out for 9:16 (stack 2-3 short lines at 128 px) | Crop the 16:9 frame | Width capacity is ≈10 characters at 128 px | §9.2.3 |

---

## 9.19 Multilingual and Devanagari typography

The user's pipeline supports English, Hindi and Hinglish. Only one reference shows a non-Latin script (kivi's Kannada translation card), so most rules here come from [N] and [P].

| Rule | Numbers | Evidence |
|---|---|---|
| Choose fonts that carry both scripts with matched proportions | Sans: Poppins (100-900), Mukta (200-800), Anek Devanagari (wdth 75-125, wght 100-800), Hind; display: Baloo 2, Teko, Rozha One. In Hind, the Devanagari base sits at 94% of the Latin cap height; in Poppins it equals the Latin ascender height | [N] |
| Leading for Devanagari | 1.25 headline / 1.5 body (never the Latin 0.95-1.1), or matras above and below get clipped | [N] |
| Animate by word or orthographic syllable, never by code point | Splitting by code point breaks conjuncts such as क्ष | [N] (W3C ilreq) |
| Load the script subset explicitly | A missing `devanagari` subset silently falls back to another font | [N] |
| Reading time | × 1.15 for Hindi or Hinglish on the [N] formula | [N, unverified] |
| Non-Latin script reveal | Word-level blur → sharp resolve over ≈20 f; Kannada set at ≈3.5% H inside a card | [V:1-6l8S t=49.25-49.90s] |
| Mixed-script captions | Whisper large-v3 transliterates English words in Hinglish speech into Devanagari; its normaliser deletes matras and viramas. Use ASR output only for timing, never as display text | [P] |
| Numbers | Indian-locale number expansion when aligning spoken numbers to displayed numerals | [P] |
| Hinglish line breaks | Break at word boundaries of either script; never split a Latin word across a script change [inferred] | — |

---

## 9.20 Typography in AI-generated video pipelines

**TY-U21 [U by source, not by reference]. Every visible word is composited, never generated.** Generative video cannot set exact typography [N §6]; Veo 3 adds gibberish subtitles when a prompt implies dialogue [P §8]. "Changing text" is on the Anti-AI-Look list (Master §21, Phase 10). So:

1. **Generate plates without text.** Put only nouns in the negative prompt: "text, subtitles, captions, letters, watermark, logo" [P]. Avoid dialogue and signage in the positive prompt.
2. **Describe the empty space the type will use**, for example "subject in lower third, large clean empty sky in upper half, shallow depth of field" [P] (TC-15).
3. **Composite type in the editor** (Remotion or After Effects) as vectors, at the delivery frame rate, with fonts loaded before render and text fitted at validation time [N §7].
4. **Track text onto moving surfaces** (screens, cards) with a corner pin in the compositor; never let the generator draw the UI text.
5. **Keep a type continuity sheet** for the whole film and every cutdown: font files and versions; weights; token sizes in px for each format; tracking; leading; hex colours; every string verbatim; centre-line and column anchors; reveal and exit IDs with frame counts. Any change to a string is a new version, not a fix in one shot.

**Shot-prompt typography block (template).** Every storyboard shot that carries text gets this block, filled with exact values:

```
TYPE
  string:        "Your spreadsheet, powered by voice."   (verbatim, locked)
  split:         ["Your spreadsheet,", "powered by voice."]   accent = part 2
  family/weight: Inter 400 (accent part same weight)
  size:          T-STATEMENT · cap 5.8% H · 90 px @1080 (16:9) / 128 px @1920 (9:16, 3 lines)
  tracking/lead: 0 / n.a. (single line)
  colour:        ink #0B0B0B · accent #396454 · on #F9FAFC (contrast ≥ 4.5:1)
  position:      centred · centre-line y 540 (16:9) / y 950 (9:16) · width ≤ 85% W
  reveal:        KT-01 · part 1 at f3 (+10% W offset, E-LERP k 0.22, 13 f) · part 2 at +8 f, 60% → 100% in 3 f
  hold:          landed ≥ 0.8 s · total ≥ 1.5 s · drift 0.12% W/f left
  exit:          EX-03 whip-left 5 f E-WHIP → 1 white frame → cut on the beat
  sound:         none on reveal; whoosh peaking on the cut frame
  must not:      overshoot, glow, motion blur, any change to the string
```

**Replace vague words with measurable type motion**

| Vague request | Write instead | Source |
|---|---|---|
| "Make the headline pop" | "Hero word slams from 3.5× to 1× in 9 f with E-SNAP (≈64% of the change on frame 1), two ghosted frames of motion blur on f0-f1, 0% overshoot" | RV-07 |
| "Elegant text animation" | "Each word rises 4% H while blur clears 8 → 0 px and opacity goes 0 → 1 over 10 f (E-OUT), words 3 f apart; Regular 400 at cap 5.8% H, centred at y 50%; hold 1.0 s with 0.12% W/f drift" | RV-04 |
| "Kinetic typography" | Name the system and its numbers: "KT-02: slam, then words slide from 4% W right every 8 f, line shrinks 1.5%/f, snap −45% in 3 f when the second line arrives" | §9.8 |
| "Typewriter effect" | "Type filler at 30 cps and the key phrase at 9 cps, pause 1.0 s at the comma, caret 9 f on / 9 f off, caret locked at 65% W once the line passes centre" | RV-09, TC-05 |
| "Show the AI writing" | "Words appear at 35% opacity and reach 100% in 3 f, one word every 2 f, then a 0.8 s left-to-right shimmer" | RV-11, RV-23 |
| "Make it readable" | "Cap ≥5.8% H, contrast ≥4.5:1, landed hold ≥0.8 s, drift ≤0.2% W/f, no blur after frame 8" | RM-01 … RM-06 |
| "Smooth transition into the product" | "TP-01: border and shadow build in 2 f, icon pops in 3 f, toolbar slides up in 5 f, then pull back ×0.75 over 24 f with E-INOUT" | TP-01 |
| "Cinematic title" | "Tonal materialise: wordmark from 25% contrast to full ink over 40 f ending in a left-to-right sweep, slow push +7% over 0.5 s, then +18% punch in the last 3 f into one white frame on the downbeat" | RV-18, EX-08 |
| "Clean ending" | "Logo lockup cap 9-12% H, URL ≥54 px beneath, both settled by the hit, 2.2 s dead-still hold, music resolves on the logo frame" | §9.11.2 lockup |

---

## 9.21 Typography QC gate (run on every render)

Pass every item before a shot is approved. Step through the text's entrance, hold and exit at 1-frame increments.

| # | Check | Pass threshold |
|---|---|---|
| 1 | Strings | Every string matches the continuity sheet character for character, in every shot and every format |
| 2 | Family and weights | Only the declared family plus ≤1 accent face; weights match the style row (§9.14) |
| 3 | Size | Each string uses its T- token; nothing meaningful below the read floor; phone-bound 16:9 sentences ≥84 px; 9:16 body ≥52 px |
| 4 | Width and safe area | Statements ≤85% W (≤70% for multi-line); 16:9 text inside x 96-1824, y 54-1026 (5% per side, EBU R95 [N]); 9:16 inside x 120-840, y 270-1210; no informational text touching an edge |
| 5 | Hierarchy | ≤2 levels per frame (≤3 in a title stack); ratio ≥1:2.5 between setup and hero |
| 6 | Accent | ≤1 accent phrase per line, on the benefit |
| 7 | Contrast | ≥4.5:1 (3:1 only for large text); 7:1 over footage |
| 8 | Entrance | Correct RV card; legible by its RM-02 frame; 0% overshoot |
| 9 | Hold | Meets its §9.11.2 tier (punch, kinetic, statement, message, typed, payoff, status, lockup) |
| 10 | Motion during the read | Translation ≤0.2% W/f; scale within TC-02; no motion blur on a hold |
| 11 | Exit | 4-8 f, accelerating; no word collisions; no clipped glyphs on the last frame |
| 12 | Sync | No word appears after its sound; music-led text lands 0-2 f before the beat |
| 13 | Decoration | Nothing crosses the text bbox + 10%; glow ≤2-3% of cap height |
| 14 | 3D text | Faces the camera (≤≈10°) before it is read; never soft while read |
| 15 | Repetition | ≤3 consecutive text-only cards; same reveal ≤6 uses; semantic tricks ≤3; decode ≤1 |
| 16 | Frame 0 | Type or motion on f0-f1; first change ≤0.5 s |
| 17 | Photosensitivity | ≤3 flashes per second; flash frames ≤3 f |
| 18 | Render | Native frame rate; no duplicate-frame judder on moving type; thin type not bled by compression (check a 1:1 crop of the smallest read text) |
| 19 | AI plates | No generated letters, signage or subtitles anywhere in a plate |
| 20 | Devanagari (if used) | Correct subset loaded; leading ≥1.25; no broken conjuncts; word- or syllable-level animation |

---

## Appendix A. Where the references overrule generic advice (typography)

| # | Generic advice | What the references do | Ruling |
|---|---|---|---|
| 1 | Hold a 5-word line ≥2.05 s after it lands (subtitle-derived [N] formula; Part 03 §18.8 applies it to all 5+-word messages) | kivi holds 5-word statements ≈0.6-1.1 s after landing (1.2-1.45 s visible) with no flagged problem; Bumper 0.6-1.6 s | **References win** for 4-6-word statements alone on a ≥85% empty frame: statement tier (≥0.8 s landed; 0.25 s × words + 0.25 s visible). [N]'s formula still governs messages, captions, busy plates and new information. This refines Part 03 §18.8 (§9.11.2) |
| 2 | 1.0 s minimum per text event; Netflix minimum event 25 f [N] | 1-2-word punch cards hold 10-15 f | **References win** for punch words in a rhythmic run (agrees with Part 03 SP-H) |
| 3 | All caps get +5-12% letter-spacing [N] | Display caps at 0 to +3% (NOSTRA, Solar, Lottieicon wordmark) | **References win** at display sizes; +5-8% stays for small caps labels |
| 4 | Type springs may overshoot 0-3% [N] | 0% on type in 8/8 | **References win**: 0%, except a ≤3% auto-fit width correction |
| 5 | Stagger words 2-4 f and keep a group's reveal ≤18 f and ≤8 items [N, practitioner] | Launch builds space words 7-10 f apart (≈26 f for 4 words) [V:19NRDv]; dictation 3-8 f [V:1-6l8S]; fast cards 2-3 f [V:1i2L14] | **References win**: spoken-rhythm builds run on eighth notes and may exceed 18 f, because the build is the reading time. [N]'s 2-4 f applies to UI lists and fast cards |
| 6 | Caret blinks on a 16 f period [E, inferred] | 0.3 s on / 0.3 s off (18 f) [V:1CSXtQ] | **References win**: 9 f on / 9 f off |
| 7 | Prompt typing at 2 characters per frame (60 cps) [E, inferred] | Read prompts 9-35 cps; display type-ons with auto-fit 40-55 cps | **References win**: 60 cps is too fast to read as human typing |
| 8 | Lines no wider than 68% of a 16:9 frame (BBC) [N] | Single statements to 74-84% W | **References win** for one line of ≤6 words (≤85% W); 68% stays for multi-line text and captions (as Part 02 CO-U11) |
| 9 | Keep all graphics inside safe areas [N] | Macro hook type bleeds for 0.63 s | **References win** for ≤0.7 s display bleed; never for information (Part 02 CO-U15) |
| 10 | Body text ≥84 px for 16:9 watched inline on a phone [N] | kivi statements at 68-95 px; Solar labels ≈56 px font | **Generic advice wins** for sentences (a physical pixel-density limit); references win for ≤3-word bold labels at cap ≥3.6% H |
| 11 | Blur-in text entrances over 12-16 f [E, inferred] | Labels blur-fade in 2-5 f; statements rise in 9-12 f | **References win**: 2-5 f for labels, 8-14 f (P03 SP-T0) for statements |
| 12 | 9:16 hero words should stay inside the strict text column [N] | Chowdeck's hero words run to 80-84% W | **Generic advice wins** for body, CTA and captions (platform overlays are physical); hero words ≥8% H may reach 84% W (as Part 02 §4.7) |

---

## Appendix B. Evidence strength and gaps (read before relying on a number)

**Strong (measured in ≥3 references, re-verified by an adversarial pass)**
- Statement sizes, centre-line placement, ≤6-word limit, 0% overshoot, sequential reveals, exit-faster-than-entrance, drift while held, the word-cadence/tempo link, and the readability flaws (micro-text, short payoff holds).

**Medium (measured in 1-2 references, or measured but not re-verified)**
- Leading values (4 references: Bumper, Chowdeck, Solar, Lottieicon).
- Tracking values: mostly visual estimates marked [inferred] in the teardowns; only HubSpot's tracking-in (−17% in 4 f) and Lottieicon's word-space opening are measured.
- Typing speeds (HubSpot, Wix and Lottieicon measured; Wix's speeds were not re-measured by its verifier).
- Hero sizes in 9:16: one reference (Chowdeck), measured through a crop of a phone-filmed screen capture, so its px values are converted from a ≈480 px-high crop.

**Weak (inferred or text-only)**
- **Font identities.** Every reference face is inferred from glyph shapes (Google-Sans-like, Satoshi-like, Montserrat-like…). Only ElevenLabs' Waldenburg and Superside's Agrandir (Bolt), Figma Sans and Lato (Snowflake) are named, and those come from text, not frames [E] [S].
- **cap → font conversion.** The 0.70 em cap ratio is an assumption; real faces vary ≈0.66-0.73 em, which moves the px font values by about ±5%.
- **9:16 sizes beyond Chowdeck** come from [N]'s derived phone-pt calculations and [E]'s inferred recipes.
- **Devanagari and Indic rules**: only kivi's Kannada card is observed; the rest is [N] / [P].
- **Caption and VO sync**: no reference has a confirmed narrator with captions; the rules come from [P] and [N] subtitle standards.
- **Light 300 display weights** appear only in [E] (web extraction), never in a measured frame.
- **Variable-font axis animation, karaoke captions, chapter rails**: no reference evidence (TY-X12-14).
- **Sub-1080 sources**: all 16:9 references were delivered at 640-720p, so every px @1080 value is a conversion; sub-pixel stroke details (bloom radius, tracking) are approximate.

---

## Audit (adversarial pass, 2026-10-08)

Method: re-read the whole part and spot-checked about 60 numeric claims against the eight per-video teardowns (kivi live-append deltas, Bumper slam widths and 100 BPM grid, HubSpot typing speeds, caret lock, tracking-in and end-card sizes, Lottieicon snap / suck / auto-fit / URL speeds, Solar label sizes, drift and title stagger, NOSTRA pixel build and CTA, Wix scale-contrast cut, ECU typing and AI colour settle, Chowdeck type table and holds) and against [N], [E] and [P]. Almost all checked values match their sources. Changes made (22):

1. **Units:** added the 25 → 30 fps pulldown caveat for Wix and HubSpot frame counts (duplicated frames included; ±1 f on short durations).
2. **Defaults #2:** the 9:16 statement value (128 px) is now tagged [inferred] as a pick inside [N]'s 96-160 px range; [E] uses 112 px.
3. **Defaults #3:** the 9:16 hero value (240 px) is now tagged [inferred], with the one 9:16 measurement (Chowdeck) named.
4. **Defaults #5:** the setup : hero range now includes Chowdeck's measured 1:2.1 ("order in" / "seconds").
5. **T-STATEMENT row:** corrected "[E] 112-128 px" for 9:16. [E] gives 112 px for 9:16 and 128 px for 16:9.
6. **Size ladder:** added an evidence note. 9:16 px values that do not cite Chowdeck or [N] are [inferred] re-layouts, and Chowdeck itself is measured through a crop.
7. **TY-H1:** the measured setup : punch ratios are now given per pair (≈1:2.7, ≈1:2.1) instead of a blanket 1:2.5-3.
8. **TY-W2:** the stand-in column now says that [N] gives the families and axes, while mapping a family to a positioning is [inferred].
9. **TY-W5 compression bullet:** reworded to say what [N] actually states (yuv420p bleeds thin saturated colour text and bands dark gradients). Extending that to thin light strokes is tagged as inference.
10. **Word cadence table:** marked the 86 / 95.7 / 112 / 127 BPM word and card intervals as (computed), not measured. Noted that Chowdeck and Wix are **not** beat-cut and that kivi's measured word joins are 3-8 f.
11. **Broken cross-reference:** §9.11.5 → §9.11.4.
12. **Statement-tier formula** (0.25 s × words + 0.25 s): tagged [inferred] as a conservative fit to kivi.
13. **RM-05:** the ≈117 px large-text threshold for phone-inline 16:9 is now marked as computed from [N].
14. **RM-23:** the "≥8-12 Mb/s" floor has no source and is now [inferred]. CRF 18 stays attributed to [N].
15. **RM-21 / TY-A18:** the 22-27% W/f strobe in Lottieicon is on an icon grid, not on text. The citation now says so, and the text rule is tagged [inferred].
16. **Census point 5 (overshoot):** added two near-misses so the 8/8 claim stays honest: Chowdeck's text-bearing UI card overshoots ≈4°, and NOSTRA's label settles from 1.25× without passing its target.
17. **QC gate #4:** the 16:9 safe area is now attributed to EBU R95 via [N].
18. **Section citations:** fixed the citations for the new notes (Lottieicon §13, Chowdeck §Editing Rhythm).
19. **Coverage, tracking and leading:** added a premium-vs-amateur note. The amateur side is tagged [inferred] because no reference flags a tracking error.
20. **Coverage, exits:** added a premium-vs-amateur note with measured evidence (kivi 8-14 f in / 4-6 f out; word collision; the 2 f status; the glitch exit).
21. **Coverage, text-camera:** added a premium-vs-amateur note.
22. **Coverage, text-to-product:** added a premium-vs-amateur note grounded in Wix's "no cut to a cold screen recording" and HubSpot's "read first" rule.

**Remaining known gaps** (also see Appendix B)
- Every 9:16 size except Chowdeck's is inferred. Chowdeck's own px values come from a ≈470 px-high crop with an assumed 1080×1920 comp.
- All typeface identities and the 0.70 cap → font ratio are inferred, which moves px font values by about ±5%.
- Tracking at rest is mostly a visual estimate. Only HubSpot's tracking-in and Lottieicon's word-space opening are measured.
- No reference has confirmed VO plus captions, so caption sizing, paging and sync rest on [N] and [P] only. The Hindi ×1.15 reading factor is unverified.
- Devanagari rules have no reference evidence apart from kivi's Kannada card.
- Variable-font axis animation, karaoke captions and chapter rails (TY-X12-14) have no reference.
- Thresholds that generalise the references (≤0.6%/f calm scale drift, ≤6 uses of one grammar, ≤3 text-only cards, 5% W/f strobe cap on text) are judgements fitted to 1-4 films, not measured limits.
- Not every one of the roughly 400 citations was opened. Unchecked rows were left as written, and their teardowns have their own verification passes.
