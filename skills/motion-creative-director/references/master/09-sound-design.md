# Master SaaS Motion Design System, Part 09
## Master §16 Sound-Design Principles

Version 1.2 (complete: §16.0-16.20, §16.8.1 and Appendices A-B; audited, see the Audit note at the end), 2026-10-08. Built from the audio measurements inside the frame-level teardowns of the user's eight reference films (integrated loudness, 33/50/100 ms RMS envelopes, spectrograms, band energy, onset lists and fitted beat grids, all compared against frame-exact cut times), plus text-only research. It covers the full Phase-9 brief: music style, tempo ranges, every SFX family, where sound reinforces motion, density limits, mixing and loudness targets, and the cut-to-beat statistics measured in the references. An editor, a sound designer or an AI video pipeline should be able to brief, place, level and QC every sound in a SaaS film from this part.

Scope. Part 05 §7.6 holds a short sound-pairing table for transitions; this part is the full system and agrees with it. Shot lengths and cut rates are in the editing-rhythm part (Master §15). Ease tokens and motion speeds are in Part 03. Caption and voice timing for on-screen words is in Part 07 §9.11.4; this part repeats only what the mix depends on.

**Evidence caveat (read first).** The references were measured as finished mixes, not stems.
- Music tempo, section levels, silences and drops are measured and reliable.
- Individual SFX could be isolated only where they stand clear of the bed: Lottieicon (sub booms, one whoosh), HubSpot (impact, keystrokes, click, send hit, sting) and partly Wix (suck-out, hit, click-aligned onsets). In the other five films any SFX statement is [inferred].
- dB values are short-window RMS (33, 50 or 100 ms, as each teardown states) and read 2-4 dB differently between meters [V:1CSXtQ, verification note]. Relative shapes (a 20 dB dip, a 10 dB hit) are reliable; treat absolute dB as approximate.
- Chowdeck's audio is a phone microphone recording a room [V:126cpH]. Its loudness is unusable; only its timing (dips, onsets) is used here.

---

## 0. How to read this part

**Units**
- **f**: one frame at 30 fps (33.3 ms). 30 f = 1 s.
- **dB (short-term)**: RMS level in a 33, 50 or 100 ms window, in dBFS, as the teardown measured it. **"dB over bed"**: the difference between an event's window and the running music level around it.
- **LUFS**: integrated loudness (ITU BS.1770 / EBU R128). **dBTP**: true peak. **LU**: loudness units (LRA = loudness range).
- **BPM** and **beat (f)**: beat length in frames at 30 fps = 1800 ÷ BPM. An **eighth** is half a beat. A **bar** is 4 beats.
- **Onset**: a transient found by the analysis tool. **Grid**: a beat grid fitted to the music. **±2 f window**: the sync test used in every teardown (5 frames, 167 ms).
- **% RT**: percent of the film's runtime.

**Evidence tags** (the same as Parts 01-07)
- **[V:xxxxxx t=..s]**: the user's reference videos, measured. The strongest evidence.
- **[S:brand]** / **[S:playbook]**: Superside text research. **[E]**: ElevenLabs style brief (its brand rules and open-source orb/waveform code are sourced; its timings and sound notes are its author's inferences). **[N]**: motion-numbers brief (loudness standards, sync conventions, licences). **[P]**: voice and footage pipeline brief (TTS alignment, perception thresholds, Veo audio). **[W:site]**: inspiration-site catalogues (titles, tags, descriptions only).
- **[inferred]**: my judgement, not directly observed or sourced. **(computed)**: arithmetic on measured values.
- Text-only sources ([S], [E], [W], [P], [N]) support intent, vocabulary and standards. They never support frame-level sync claims.

**Priority.** The user's references outrank generic advice. Where they disagree, a **"References win"** note says so and explains why. Exceptions are physical limits (platform loudness normalisation, phone speakers, perception thresholds), where the standard wins and the note says so. Appendix A collects every ruling.

**Rule IDs used in this part**
- **SD-MU** music style (§16.2) · **SD-T** tempo (§16.3) · **SD-AR** music arc (§16.4) · **SD-SI** silence (§16.5) · **SD-B** beat sync (§16.6) · **F01-F18** SFX family cards (§16.7) · **SD-R** sound-motion sync map (§16.8) · **SD-D** density (§16.9) · **SD-V** voice (§16.10) · **SD-M** mixing (§16.11) · **SD-AI** AI and template pipelines (§16.12). Sound maps by runtime are in §16.13; the QC gate is §16.20; Appendix B rates the evidence behind each area.
- **SD-U / SD-S / SD-X / SD-A / SD-SaaS**: universal principles, style-specific rules, experimental techniques, techniques to avoid, techniques especially good for SaaS (§16.14-16.18).
- Class tags: **U** = measured in 3 or more references with none contradicting. **S** = style-specific. **X** = experimental (one reference, or untested). **A** = avoid. **SaaS** = especially good for SaaS.

### Reference roster

| Tag | Reference | Frame / length | Style |
|---|---|---|---|
| [V:1-6l8S] | kivi, voice-AI dictation launch | 16:9, 77.8 s | Minimal Premium × soft-cinematic UI demo |
| [V:126cpH] | Chowdeck delivery-app ad (AE screen capture, phone-mic audio) | 9:16, ~18 s | Playful illustrated collage + UI demo |
| [V:15VhHR] | Wix AI site builder | 16:9, 53.9 s | UI demo inside an editorial brand frame |
| [V:19NRDv] | Bumper PRO payments launch | 16:9, 67.2 s | Kinetic-type launch with 3D UI proof |
| [V:1CSXtQ] | OpenAI × HubSpot connector spot | 16:9, 30.0 s | Minimal Premium, prompt-native, one 3D beat |
| [V:1Hcg3X] | "How do solar panels work?" | 16:9, 35.8 s | Editorial 2.5D explainer |
| [V:1ccYWJ] | Lottieicon icon-library promo | 16:9, 44.3 s | Fast startup launch, dark neon |
| [V:1i2L14] | NOSTRA studio promo | 16:9 inset, 35.1 s | Monochrome brand-system explainer |

### 0.1 Audio census: what the eight references actually do

| Ref | Voice | Music (measured texture → genre [inferred]) | Tempo (felt) | Integrated | Edit driver | Hard cuts within ±2 f of an onset or beat | Silence before a hit | Isolatable SFX | Ending |
|---|---|---|---|---|---|---|---|---|---|
| kivi [V:1-6l8S] | In-world user dictation; no narrator | Mallet/piano plucks with 4.4-5 kHz "sparkle" blips → ~900 Hz tonal riser → full-band drop → rhythmic pulses; pad-only stretch; steady eighth-notes from 44 s → airy organic-electronic | 127 (detector said 63, half-time) | **−10.7 LUFS** (loud) | Speech-led first half, music-led back half | 5/11 overall; back half (52-70 s) 4/6 within 1.2 f of onsets and 5/6 within 1.1 f of the 127 BPM eighth grid (random 29%) | Yes: 6.65-6.80 s at −41 to −61 dB before the logo; 100 ms dropout 8.13-8.23 s before the drop | None clear; chimes and ticks blended into the bed [inferred] | Music −15 → −49 dB over the last 1.5 s, under a 14 f fade to white |
| Chowdeck [V:126cpH] | None confirmed | Onsets in pairs 0.3 s apart (syncopated groove) → Afrobeats/amapiano-adjacent [inferred] | 95.7 | −16.3 (phone mic; unusable) | Narrative / feature | 0/5 (nearest 7 f); 5-6 of ~25 visual events = chance | Yes: −35.2 dB dip at 10.0-10.5 s, then the click on an onset (0 f) | Click accent at 10.54 s only [inferred] | Cut by TikTok |
| Wix [V:15VhHR] | None (vocal-chop textures in the music [inferred]) | 700-800 Hz pad, 0.9-3 kHz vocal-chop glides, dense percussion → pop-electronic | 112.3 | −15.9 | UI-driven; sync at section level | 7/33 (chance 5.8) | Yes: suck-out to −35 dB on the send click (12.2 s); cut 8 f later; hit at 12.6 s | ~4 clicks with an onset within ±0.1 s [inferred click SFX]; no whooshes on whips | Stab, music out at 50.3 s, swell across the heart cut, 2.2 s fade; digital silence 0.27 s before the last frame |
| Bumper [V:19NRDv] | None | 55-80% of energy below 120 Hz; sub kick every 1.2 s; low-pass breakdown; long hi-band build → bass-heavy electronic/hip-hop-leaning | **100.0** exact | −14.1 | Beat-locked | **11/18 land 0-2 f before a quarter beat** (chance ≈17%, p < 0.001); 4 more within 1 f of an eighth off-beat | Sparse intro: kicks with −22 to −30 dB between them | Not isolatable; percussive accents [inferred] | Fade −25 → −77 dB over 63.5-66 s; ≈1.2 s near-silent tail on the static end card |
| HubSpot [V:1CSXtQ] | None | Sub impact + descending glide → near-silence with keystrokes → tonal riser → plucks → drop → kick/bass blocks → pad breakdown → full-band sting → minimal electronic pluck | ≈86 | −14.2 | Typing-driven first half, music-driven second half | **6/8 with an RMS transient within ±2 f** (7/8 counting a spectral onset) | Yes, four gaps: 350, 100, 70 and 100 ms | Impact 0.00 s, keystrokes, toggle click 10.24 s, send whoosh/hit 17.80 s, sting 27.85 s | Hit on the lockup cut, then a sting held ≈1.2 s and decaying to −65 dB by the last frame |
| Solar [V:1Hcg3X] | Likely VO [inferred] (speech likelihood 0.50) | Dense, compressed, flat (σ 1.7 dB) bed with no drops | 64.6 (≈129 in half-time [inferred]) | −16.6 | VO/story-led; downbeats for major scene changes | 5/16 (31% vs ≈20%); mid act 4/5 within ≈1 f | No | None | −34.6 dB in the last 0.5 s (cut-off) |
| Lottieicon [V:1ccYWJ] | None | Light electronic/pop pulse plus a separate SFX layer | 112.3 | −16.6 (quiet) | Feature-driven; **SFX locked to motion** | 4/10 (baseline 21%); 5/10 on a fitted grid | No | **9 of 11 key motion events carry an SFX within ±3 f**: 8 sub booms, 1 high whoosh, faint swap accents | **Music ends 3.7 s before the picture** (flaw) |
| NOSTRA [V:1i2L14] | Unclear [inferred possible VO] | Dense, mid-forward, heavily limited, narrow (side/mid −14.6 dB) | 83.4 (or 167) | **−7.9 LUFS, +1.6 dBTP** (overs) | Copy/story-driven | 3/14 (chance 19.6%) | No | None at whips or bursts | Static logo hold ≈0.8 s |

### 0.2 What the census says

1. **The type narrates; the music carries emotion; product sound carries proof.** No reference has a confirmed conventional narrator. kivi's only voice is the product being used (dictation); Solar and NOSTRA may carry a VO but neither could be confirmed. Every film works with the sound off. [U: 8/8]
2. **Beat-cutting is a mode, not a requirement.** Three films lock cuts to the grid (Bumper throughout; HubSpot and kivi in their second halves). Two sync selected events (Solar's mid act; Lottieicon through SFX). Three are not beat-cut at all (Chowdeck, Wix, NOSTRA), and Wix syncs only at section boundaries. [U]
3. **Silence is the most consistent premium device.** Five of eight use a dip or gap of 70-500 ms immediately before a reveal, a drop or a decisive click (kivi, Chowdeck, Wix, HubSpot; Bumper's sparse kick intro is the arrangement-level version). [U: 5/8]
4. **Picture leads sound.** Where cuts are locked, the picture lands 0-2 f before the beat [V:19NRDv] and a frame-filling graphic lands ≈3 f before the drop [V:1-6l8S t=8.17-8.28s]. No locked cut lands after its beat. This matches the perception asymmetry in ITU-R BT.1359 [P]. [U]
5. **Whooshes are rare.** In the five films whose whips and transitions were checked for a whoosh, each has 0 or 1 (kivi 0 and NOSTRA 0: no whoosh peak at their whips; Wix 0: "no obvious whooshes", [inferred] by its teardown; HubSpot 1; Lottieicon 1). Only HubSpot and Lottieicon expose a full SFX layer, so the zeros are "none audible over the bed", not "none in the stems". The amateur habit of a whoosh on every transition has no support in the set. [U: 5/5 resolvable]
6. **One loudest moment per film, spent on the hero beat.** kivi's drop under the "Just speak" burst (−4 dB, 8.28 s), Lottieicon's boom on the first hero camera move (−2.6 dB, 27.9 s) and HubSpot's end sting (−7 dB RMS, the loudest sustained moment). [U: 3/3 where measurable]
7. **Tempo cluster: 83-113 BPM** for 6 of 8; kivi is 127 and Solar 64.6 (≈129 felt in half-time). Median ≈100 BPM (computed). [U]
8. **Loudness: the best-mixed premium films sit at −14.1 to −15.9 LUFS** (Bumper, HubSpot, Wix). The two loudest are flagged flaws (kivi −10.7; NOSTRA −7.9 with true-peak overs), and the quietest undersells on phones (Lottieicon −16.6). [U + N]
9. **The bed drops under the densest reading.** Four films thin the music (pad-only, low-pass, or 7-17 dB down) for 6-21% of the runtime exactly where the eye has the most to read. [U: 4/8]
10. **Sound placed by motion physics** (peak velocity, frame-fill, press frame, a pitch glide that follows a falling object) is the strongest craft signal in the set, but it is measured in two films only (Lottieicon, HubSpot). [X/S]
11. **The ending resolves on the lockup.** Hit or swell within ±2 f of the lockup, a 1.2-2.2 s tail, silence only at the very end. The one film whose music stops during the CTA is the flaw [V:1ccYWJ]. [U]

### 0.3 Defaults card: the sound numbers to encode first

| Parameter | Default | Range seen in references | Evidence |
|---|---|---|---|
| Integrated loudness (social, YouTube, X, web hero) | **−14 LUFS ±1** | −16.6 to −7.9 (both extremes flagged) | [N] + [V:19NRDv] [V:1CSXtQ] |
| Integrated loudness (VO-led landing-page or help-centre embed) | −16 LUFS [inferred compromise between AES77's music −16 to −14 and speech −18]; social and web uploads stay at −14 even when VO-led; −18 only for speech-dominant webinar or how-to content (§16.11.1) | — | [N] (AES77: speech or mixed −18, music −16 to −14) |
| True peak | **≤ −1 dBTP** | +1.6 dBTP fails [V:1i2L14] | [N] |
| Tempo | **100 BPM** (beat = 18 f, eighth = 9 f, bar = 2.4 s) | 83-127 | [V] |
| Locked-cut offset | **picture 0-2 f before the beat**; never after | 0-3 f | [V:19NRDv] [V:1-6l8S] [P] |
| Locked share (music-led modes) | ≥60% of hard cuts within ±2 f of the grid | 61-88% in locked films | [V:19NRDv] [V:1CSXtQ] |
| Gap before a hero hit | **70-350 ms at ≤ −35 dB, or ≥15 dB under the running bed** | 70 ms-0.5 s, −29 to −64 dB (kivi's pre-drop dropout is the shallow end, −29 dB) | [V:1CSXtQ] [V:1-6l8S] [V:126cpH] |
| Suck-out on a decisive click | ≥15 dB down on the press frame; cut ≈8 f later; hit ≈4 f after the result appears | −15 → −35 dB | [V:15VhHR t=12.2-12.6s] |
| Mid-film "silence" floor | −40 to −45 dB; digital silence only in the last 0.3 s | −41 to −45 dB | [V:1CSXtQ] [V:15VhHR] |
| Drop / groove-in | **on the first product moment**, 0-8 f after its cut | 7-11% RT (50-80 s films); 43% RT (30 s film) | [V:15VhHR] [V:19NRDv] [V:1-6l8S] [V:1CSXtQ] |
| Breakdown | Low-pass or −7 to −17 dB, 6-15% RT, under the densest reading | 6-21% RT | [V:19NRDv] [V:15VhHR] [V:1CSXtQ] [V:1-6l8S] |
| Hero hit level | **8-15 dB over the running bed** (50-100 ms RMS); one loudest moment per film | −2.6 to −8 dB peaks | [V:1ccYWJ] [V:1-6l8S] [V:1CSXtQ] |
| Hero hit spacing | ≥1.4 s | 1.4-1.6 s (camera tour) | [V:1ccYWJ] |
| UI click | On the **press frame (0 f)**; one per state change | 0-1 f | [V:126cpH] [V:1CSXtQ] |
| Keystrokes | 20-25 dB under the full music level; only in a quiet section | — | [V:1CSXtQ] |
| Whooshes | **0-2 per film**; peak on the fastest frame | 0-1 | [V] |
| Sounded transitions | 15-65% of transitions; never all | 17-64% | [V:1ccYWJ] [V:1CSXtQ] (computed) |
| SFX per beat | ≤1 (a ceiling inside a cluster, not the working density) | — | [N, unverified] |
| Riser | Crest 0-2 f before its hit | 1 s (logo), ≈4 s (UI build), 28 s (arrangement build) | [V:1-6l8S] [V:1CSXtQ] [V:19NRDv] |
| Music under VO | Ducked 10-12 dB (range 6-12); attack 30-80 ms; release 250-700 ms | no reference VO | [N] [E] (both unverified) |
| On-screen word vs its spoken onset | 0-2 f early; never late | — | [P] |
| Ending | Hit or swell on the lockup ±2 f; tail 1.2-2.2 s; music never absent while the CTA is animating | — | [V:1CSXtQ] [V:15VhHR]; failure [V:1ccYWJ] |
| Audio master | 48 kHz / 24-bit WAV + stems (music, VO, SFX, ambience); AAC ≥ 256 kb/s in the MP4 | refs delivered AAC 44.1-48 kHz stereo | [inferred]; [V:1CSXtQ] [S:Thomson Reuters] |

---

# Master §16. Sound-Design Principles

## 16.0 Why sound decides the premium read

The references' most expensive-feeling moments are sound-picture events, and every one of them is a **contrast**, not a layer of extra sound:
- kivi's logo: 150 ms of near-silence, a 1 s tonal riser under the wordmark, a scale punch, one white frame, then a full-band drop about 3 frames after the burst fills the frame [V:1-6l8S t=6.65-8.28s].
- HubSpot's brand card: a riser that crests on the cut to the co-brand lockup, then 350 ms of near-silence before the first pluck [V:1CSXtQ t=10.30-10.97s].
- Wix's generation moment: the music is sucked out by 20 dB on the send click, the result cut lands 8 f later, and a single hit lands 4 f after the result appears, early in its 12 f build (12.47-12.83 s) [V:15VhHR t=12.2-12.6s].
- Lottieicon's camera tour: a sub boom at the peak velocity of each glide, so 2D moves without motion blur feel heavy [V:1ccYWJ t=27.9-32.3s].

Three principles follow, and the rest of this part implements them:
1. **Contrast beats density.** A hit is loud because the frame before it was quiet. Platforms normalise integrated loudness to about −14 LUFS [N], so loudness can no longer be bought with level; it can only be bought with dynamic contrast [inferred].
2. **Sound proves causality.** A click on the press frame, a hit as the result lands, a voice that the text follows word for word. The viewer reads the product as responsive and real when the sound arrives with the action [V:126cpH] [V:1CSXtQ] [V:1-6l8S].
3. **Sound is placed by the motion's physics**, not by the edit list: at the frame of fill, the frame of peak velocity, the frame of contact. A sound placed at the start of a move reads as a cue; placed at the physical event it reads as the event itself [V:1ccYWJ].

*Why sync matters perceptually:* viewers detect sound that arrives early by about 45 ms but tolerate sound that arrives late by up to about 125 ms (ITU-R BT.1359) [P]. A picture that leads its sound by 0-3 f is therefore always read as in sync; a picture that trails by 2 f is not. That asymmetry is why the locked references put the picture first [V:19NRDv] [V:1-6l8S].

---

## 16.1 The sound stack: five layers and their jobs

| Layer | Job | Level relative to the music bed | Frequency home | Evidence |
|---|---|---|---|---|
| **L0 Silence and floor** | Contrast; resets the ear before a hero hit | Floor −40 to −45 dB; designed gaps −29 to −64 dB | — | [V:1CSXtQ] [V:1-6l8S] [V:15VhHR] |
| **L1 Music bed** | Emotion, energy arc, the tempo grid | The reference: body −12 to −18 dB short-term | Full band | All 8 |
| **L2 Structural hits** (drops, impacts, sub booms, stings, riser crests) | Mark section boundaries and the hero beat | +8 to +15 dB over the bed at the hit | Sub (<100 Hz) + full band | [V:1-6l8S] [V:1CSXtQ] [V:1ccYWJ] [V:15VhHR] |
| **L3 Motion accents** (whooshes, swishes, pitch glides) | Weight for the one or two biggest moves | +3 to +6 dB in their band | >4 kHz (air), tonal | [V:1CSXtQ t=17.80s] (≈3 dB); [V:1ccYWJ t=23.54s] (+5-6 dB >4 kHz) |
| **L4 Interface sounds** (clicks, keystrokes, ticks, pings) | Prove the product is responding in real time | Keystrokes 20-25 dB under the full bed; clicks clear only inside a dip | 2-6 kHz [inferred] | [V:1CSXtQ] [V:126cpH] [V:15VhHR] |
| **L5 Voice and product audio** (VO, in-world dictation, generated output) | Proof and explanation | Music ducked 10-12 dB under it | 300-3400 Hz | [V:1-6l8S]; [N] [E] |

**Priority when layers collide** [inferred, consistent with every reference]: L5 voice > L2 hero hit > L4 interface > L3 accents > L1 bed. Never put an L2 hit under a spoken word; schedule hits in voice gaps. If an interface click and a whoosh fall on the same frame, keep the click.

**Frequency map (where each layer lives in the references)**

| Band | What lives there | Measured examples |
|---|---|---|
| 20-100 Hz | Sub booms, kick fundamentals | HubSpot impact 20-100 Hz [V:1CSXtQ t=0.00s]; Lottieicon booms with 80-100% of frame energy below 150 Hz [V:1ccYWJ]; Bumper 55-80% of all energy below 120 Hz [V:19NRDv] |
| 100-400 Hz | Bass body, warm pads, Foley thuds | HubSpot breakdown pad 100-330 Hz; riser low-mid swell 190-330 Hz [V:1CSXtQ] |
| 400-1000 Hz | Pads, tonal risers, groove centroid | Wix pad 700-800 Hz [V:15VhHR]; kivi riser ≈900 Hz [V:1-6l8S]; Bumper groove centroid 440-630 Hz [V:19NRDv] |
| 1-3 kHz | Plucks, vocal chops, riser harmonics | HubSpot plucks 1.8 kHz → 580 Hz, riser harmonics 1-1.8 kHz [V:1CSXtQ]; Wix vocal-chop glides 0.9-3 kHz [V:15VhHR] |
| 300-3400 Hz | Voice intelligibility band | 44% of NOSTRA's energy sits here [V:1i2L14] |
| 3-6 kHz | Interface chimes, sparkle, riser tops | kivi sparkle blips 4.4-5 kHz [V:1-6l8S]; HubSpot riser harmonics 3-5.4 kHz [V:1CSXtQ] |
| >4 kHz | Whoosh air, hi-hats | Lottieicon whoosh +5-6 dB above 4 kHz [V:1ccYWJ]; 27% of NOSTRA's energy at 4-8 kHz [V:1i2L14] |

**SD-M0 (layer separation).** Give each layer its own band so none of them needs level to be heard: clicks above 2 kHz, sub hits below 100 Hz plus a harmonic layer at 100-300 Hz for phones, voice in 300-3400 Hz, and carve 2-4 dB out of the bed at 1-4 kHz while a voice speaks [inferred].
*Why:* masking is frequency-specific. A click that shares the voice band must be loud to cut through; the same click above 2 kHz is clear at a low level.

---

## 16.2 Music style

### 16.2.1 What the references use

| Ref | Measured texture | Genre [inferred] | What the music does in the film |
|---|---|---|---|
| kivi [V:1-6l8S] | Soft mallet/piano plucks with harmonic stacks; 4.4-5 kHz chime blips; ~900 Hz shimmer riser with a tremolo comb; full-band drop; pad-only stretch; eighth-note pulse | Airy organic-electronic | Carries emotion while the in-world voice carries proof; thins to pads under title cards; tightens to eighth-notes for the climax |
| Chowdeck [V:126cpH] | Syncopated paired onsets 0.3 s apart; dips before key actions | Afrobeats/amapiano-adjacent | Runs under the picture rather than driving it; ducks before the click |
| Wix [V:15VhHR] | Sustained 700-800 Hz pad; vocal-chop glides; dense percussion | Pop-electronic with vocal chops | Arranged to the edit at section level: drop on the first UI, suck-out on the send click, re-entries on section cuts |
| Bumper [V:19NRDv] | Sub-dominant; kick pair every 1.2 s; filtered breakdown; rising hi-band build | Bass-heavy electronic/hip-hop | A strict 100 BPM grid that decides where every cut lands |
| HubSpot [V:1CSXtQ] | Sub impact + glide; near-silence; tonal riser; pluck arpeggios; kick/bass blocks; pad breakdown; full-band sting | Minimal electronic pluck | Intimate silence for the typing half, momentum after the drop at 43% RT |
| Solar [V:1Hcg3X] | Dense compressed bed, σ 1.7 dB, regular pulse in the mid act | Mid-tempo bed under narration | Wallpaper for the VO; drama comes from the picture (flashes, colour flips) |
| Lottieicon [V:1ccYWJ] | Regular light electronic pulse, centroid 2-3 kHz, no vocals | Light electronic/pop | A bed under a separate, motion-locked SFX layer |
| NOSTRA [V:1i2L14] | Mid-forward, 5 dB of total level range, tonal, narrow | Limited pop bed | Constant energy; no builds or drops |

Text sources agree on the genre centre. On showreel.design, Electronic/Synth is the dominant sound tag across the 243-reel catalogue (and the usual tag on its Tech & SaaS UI reels), Hip-hop/Urban appears on agency reels, and only 7 of 243 reels are tagged "Voiceover Heavy" [W:showreel.design]. motion.so's own launch films pair "a confident voiceover", "an electronic music bed" and "sharp impact transitions" [W:motion.so]. Figma's Config 2025 scores were written to "skew digital, while still staying warm and organic", with motifs that recur across every launch video "so it all feels connected" [S:Figma].

### 16.2.2 Music by style category

| Style category | Music character | Instrumentation | Tempo | Arrangement arc | Evidence |
|---|---|---|---|---|---|
| **Minimal Premium SaaS** | Minimal, warm-digital, spacious | Plucks, felt piano or mallets, airy pads, a light sub kick, chime-like top notes | 86-100, or 120-128 with sparse content | Sparse or near-silent open → riser into the brand or product reveal → drop → steady pulse → pad breakdown under text → sting | [V:1CSXtQ] [V:1-6l8S]; [S:Figma]; [E] |
| **UI-Focused Demo** | Pop-electronic, upbeat but uncluttered | Pads, vocal chops or plucks, tight percussion | 100-112 (Wix 112.3; the 100 floor is [inferred]) | Drop on the first UI; suck-out on the decisive click; re-entry on the next section cut | [V:15VhHR] [V:1CSXtQ] |
| **Fast Startup Launch / kinetic type** | Bass-forward electronic or hip-hop | Sub kicks, claps, filtered synths | 100-112 | Sparse kicks under the hook → groove before the first big graphic move → low-pass breakdown under UI → long build into the finale | [V:19NRDv] [V:1ccYWJ] |
| **Playful consumer collage** | Groove-forward, regional where the audience is | Syncopated percussion, warm bass | 95-110 (Chowdeck 95.7; the range is its teardown's genre norm, [inferred]) | The groove runs under the picture; only the interaction is synced | [V:126cpH] (single reference) |
| **Editorial explainer** | Compressed mid-tempo bed that leaves room for a narrator | Light percussion, pads | 64-90 felt (often a half-time feel of 120-130) | Flat level; major scene changes on downbeats when the VO allows | [V:1Hcg3X] [V:1i2L14] |
| **Voice / AI audio product** | Restrained; the product's own voice is the hero | Ambient electronic, soft pulse | 100-120 [E, inferred] | Music under the voice demo, riser into the end card | [E]; in-world voice [V:1-6l8S] |
| **Cinematic Product Launch / 3D Technology Film** | Hybrid orchestral-electronic or dark ambient | Sub drops, low brass or synth swells, reverse swells, long-tail impacts | 70-100, or free time with tempo-mapped hits | Long build to one hero reveal; silence before it | **No reference in the set** [inferred]; [W:showreel.design] lists Epic/Cinematic as a minor tag |
| **Event recap / launch sizzle** | Upbeat, cut on the beat | Licensed track; recurring sonic-palette motifs | 110-128 [inferred: no source gives a tempo] | Montage cut to the beat throughout | [S:Figma] [S:playbook H] |

### 16.2.3 Track selection rules

**SD-MU1. Choose the edit mode first and the genre second.** The mode (grid-locked, section-synced, SFX-to-motion, two-half hybrid, VO-led; §16.6.2) decides what the track must offer. A grid-locked film needs a steady, transient-rich pulse; a section-synced UI demo needs clear arrangement blocks it can be cut around. [U]
*Why:* in the references, genre varied freely within a style, but the relationship between track and edit never did.

**SD-MU2. The track must contain four arrangement points:** a sparse intro of at least 2 bars, a drop or groove entry, a breakdown, and a resolvable ending (a sting, a final hit or a clean decay). Bumper's track has all four at 0-4.8 s, 4.8 s, 24-32 s and 63.5 s [V:19NRDv]; HubSpot's has them at 0-10 s, 13.05 s, 25.5-27.3 s and 27.85 s [V:1CSXtQ]. Prefer stock tracks with stems or alternate mixes so these points can be moved [inferred]. [U]

**SD-MU3. Warm-digital, not "epic".** Use synthetic sources with an organic element (piano, mallets, plucks, breathy pads). This is what the premium references do [V:1-6l8S] [V:1CSXtQ] and what Figma's Config brief asked for [S:Figma]. Trailer-style percussion and choirs appear in none of the eight. [U]

**SD-MU4. No sung lyrics under on-screen copy** [inferred]. Wix's 0.9-3 kHz vocal glides read as chops "or sung hooks" (its teardown cannot tell, [inferred]) and carry no intelligible words [V:15VhHR]; no teardown found an intelligible lyric under text. Two verbal channels compete for the same language processing.

**SD-MU5. Keep the low end translatable.** Bumper puts 55-80% of its energy below 120 Hz [V:19NRDv]. On a phone speaker most of that disappears, so add harmonic content at 100-300 Hz to kicks and booms, or the hits vanish on the platform where most viewers watch [inferred].

**SD-MU6. Decide which side gets edited.**
- Grid-locked styles: lock the music edit first, then cut the picture to the grid [V:19NRDv].
- UI demos: lock the picture first, then cut and loop bars of the music so drops, suck-outs and re-entries land on the section cuts. Wix's teardown describes exactly this: "music arranged to the edit at the section level" [V:15VhHR].
- Two-half films: lock the first half to the speech or typing, then switch to the grid from the drop onward [V:1-6l8S] [V:1CSXtQ]. [U]

**SD-MU7. Licence everything, and know the platform limits.** Music must be licensed [S:playbook]. CC0 sources (Freesound filtered to CC0, Kenney), Sonniss GDC bundles, Pixabay and Mixkit are usable for SFX; YouTube Audio Library is cleared for YouTube only; business accounts on TikTok and Instagram may use only the platforms' commercial libraries, so trending sounds are not cleared [N]. [U]

**SD-MU8. A recurring sonic motif across a launch series.** When a launch ships several films, give them a shared motif or palette [S:Figma]; a brand with a sonic logo should use it on the lockup (Bolt has a Koto-built sonic brand [S:Bolt]; its placement on the lockup is [inferred]). [S]

### 16.2.4 Writing the music brief (composer, library search or generator)

Write measurable instructions. "Epic cinematic tech music" produces generic stock; the brief below produces a track an editor can cut.

| Field | Write this | Not this |
|---|---|---|
| Tempo and metre | "100 BPM, 4/4" (18 f per beat at 30 fps) | "upbeat" |
| Length | "67.2 s, ending on a sting at 61.5 s that decays to silence by 66 s" | "about a minute" |
| Arrangement map | "0-4.8 s: sub kick on beats 1 and 3 only, nothing else. 4.8 s: full groove. 24-32 s: low-pass to ≈300 Hz, kicks kept. 32-60 s: build by adding hats and opening the filter. 61.5 s: sting." | "builds up" |
| Instrumentation | "Warm digital: plucked synth, felt piano, airy pad, tight sub kick. No vocals with lyrics." | "corporate tech" |
| Low end | "Kick and sub with harmonics at 100-300 Hz so it reads on phones" | "big bass" |
| Space for sound design | "Leave a break of at most 1 beat (a 100-350 ms hole the editor can cut) at 10.6 s and at 27.7 s for silence before hits" (a full-bar gap, 2.4 s at 100 BPM, is 7× longer than any measured gap and reads as a dropout; SD-SI1, SD-SI4) | — |
| Deliverables | "Stems: drums, bass, music, FX; 48 kHz / 24-bit WAV" | "MP3" |

---

## 16.3 Tempo (BPM) ranges

### 16.3.1 Measured tempos

| Ref | BPM (felt) | Beat (ms) | Beat (f @30) | Eighth (f) | Notes |
|---|---|---|---|---|---|
| kivi [V:1-6l8S] | 127 | 472 | 14.2 | 7.1 (0.236 s) | Detector reported 63 (half-time); 79% of onsets after 44 s sit within 1 f of the 127 BPM eighth grid |
| Chowdeck [V:126cpH] | 95.7 | 627 | 18.8 | 9.4 | Syncopated: onsets in pairs ≈0.3 s apart |
| Wix [V:15VhHR] | 112.3 | 534 | 16.0 | 8.0 | 74 onsets, median spacing 0.47 s |
| Bumper [V:19NRDv] | 100.0 | 600 | **18.0** | 9.0 | Kick pair every 1.200 s (2 beats) from frame 0 to 57.64 s |
| HubSpot [V:1CSXtQ] | ≈86 | 697 | 20.9 | 10.5 | Pre-drop half is near-silent; tempo applies from 13.05 s |
| Solar [V:1Hcg3X] | 64.6 (≈129 half-time) | 929 | 27.9 | 13.9 | Regular pulse only over 9.6-16.2, 19.0-22.7 and 28.3-30.1 s |
| Lottieicon [V:1ccYWJ] | 112.3 | 534 | **16.0** | 8.0 | Onsets only weakly periodic (vector strength 0.16) |
| NOSTRA [V:1i2L14] | 83.4 (or 167) | 719 | 21.6 | 10.8 | 57 onsets at 1.63/s |

Six of eight sit at 83-113 BPM; the median felt tempo is ≈100 BPM (computed). Every film keeps one tempo for its whole length.

### 16.3.2 BPM to frames

| BPM | Beat (ms) | Beat @24 fps | Beat @30 fps | Beat @60 fps | Eighth @30 | Bar (s) |
|---|---|---|---|---|---|---|
| 75 | 800 | 19.2 | **24** | 48 | 12 | 3.20 |
| 86 | 698 | 16.7 | 20.9 | 41.9 | 10.5 | 2.79 |
| 90 | 667 | **16** | **20** | **40** | 10 | 2.67 |
| 96 | 625 | **15** | 18.75 | 37.5 | 9.4 | 2.50 |
| 100 | 600 | 14.4 | **18** | **36** | 9 | 2.40 |
| 105 | 571 | 13.7 | 17.1 | 34.3 | 8.6 | 2.29 |
| 112.5 | 533 | 12.8 | **16** | **32** | 8 | 2.13 |
| 120 | 500 | **12** | **15** | **30** | 7.5 | 2.00 |
| 128 | 469 | 11.25 | 14.06 | 28.1 | 7.0 | 1.88 |
| 128.57 | 467 | 11.2 | **14** | **28** | 7 | 1.87 |

(computed; bold = whole frames)

### 16.3.3 Tempo rules

**SD-T1. Default to 100 BPM; stay inside 83-128.** [U] 100 BPM gives an 18 f beat, a 9 f eighth and a 2.4 s bar, and it is the centre of the measured cluster.

**SD-T2. Derive the edit's cadences from the tempo.** [U]
- Word-by-word reveals ≈ one eighth note: Bumper's 7-10 f word starts against a 9 f eighth [V:19NRDv].
- List and role swaps ≈ one beat: Lottieicon swaps every 15 f against a 16 f beat [V:1ccYWJ t=5.43-7.30s].
- Camera or orbit steps ≈ two beats: Bumper's orbit steps every ≈1.25 s against a 1.2 s half-bar [V:19NRDv t=30.9-33.4s].
- Hero impacts ≥ 2.5 beats apart: Lottieicon's tour booms land 1.4-1.6 s apart at 112.3 BPM [V:1ccYWJ].
*Why:* when the visual cadences are subdivisions of the music, the film feels composed even where cuts are not locked.

**SD-T3. Tempo by personality.** [S]
- Calm, AI, voice, premium: 85-100 BPM (HubSpot ≈86), or 120-128 with sparse, pad-led content (kivi 127).
- Energetic launch and kinetic type: 100-112 (Bumper 100, Lottieicon 112.3).
- UI demo: 100-112 (Wix 112.3).
- Playful consumer: 95-110 (Chowdeck 95.7; one reference).
- VO-led explainer: a 60-90 BPM felt pulse, often a half-time feel of 120-130 (Solar 64.6/129; NOSTRA 83.4).

**SD-T4. Prefer whole-frame tempos when the edit is grid-locked.** [X] 90, 100, 112.5 and 120 BPM land every beat on a whole frame at 30 fps; 90 and 120 also do at 24 and 60 fps, which suits multi-format masters (computed). Bumper (18.0 f) and Lottieicon (16.0 f) happen to sit on whole-frame beats. This is a convenience, not a quality rule: a non-integer beat only alternates the rounding by at most 0.5 f (17 ms), which is below the 45 ms detection threshold [P].

**SD-T5. Resolve half-time and double-time before cutting.** [U] In three of the eight teardowns the detector's tempo is off or ambiguous by a factor of two: kivi was corrected (63 → 127); Solar (64.6 or ≈129) and NOSTRA (83.4 or ≈167) remain ambiguous. Choose the felt pulse (the one the hi-hats or the eighth-note pattern imply) and build the grid on it; cut cadences are chosen against what the viewer feels, not what the detector prints [inferred].

**SD-T6. One tempo per film; change energy by arrangement.** [U] No teardown reports a tempo change (each gives one BPM for the whole film; Bumper's kick grid holds exactly 100.0 BPM from 0.03 to 57.64 s). Bumper raises energy for 28 s at a fixed 100 BPM by adding high-frequency content (hi-band share 3.4% → 6.2%, centroid 749 → 1114 Hz) [V:19NRDv]. kivi raises perceived pace by switching from speech-led to eighth-note cutting, not by shortening shots [V:1-6l8S].

---

## 16.4 Music arc and arrangement

### 16.4.1 Measured arcs (event positions as % of runtime)

| Ref | Hook | Sparse setup | Reveal / riser | Drop or groove-in | Suck-out on decisive action | Breakdown under reading | Build / re-entry | Lockup hit | Music out |
|---|---|---|---|---|---|---|---|---|---|
| kivi [V:1-6l8S] | Soft plucks from 0% | 0-8.5% | Near-silence 8.5%, riser 9-10% | **10.6%** (8.28 s) | — | 27.9-39.3% (pad only, zero onsets) | Eighth-note pulse from 56.6% | Punch-cut on beat at 91.4% | 97.7-99.9% fade |
| Wix [V:15VhHR] | Loud beat texture 0-2% | 2.4-8.2% | — | **8.4%** (4.5 s) | 22.6% (12.2 s) | 53.3-61.8% | Re-entries at 27.7% and 62.0% | Dip 91.5%, stab 92-93% | Out 93.4%, swell, fade to 99.5% |
| Bumper [V:19NRDv] | Kick on frame 0 | 0-7.1% (kicks only) | Logo stroke on a kick at 5.4% | **7.1%** (4.8 s) | — | 35.7-47.6% (to 56.5% by kicks) | Build 47.6-89.3% | Lockup 91.5% | Fade 94.5-98.2% |
| HubSpot [V:1CSXtQ] | Sub impact at 0% | 8.3-24% (near-silence) | Riser 21.3-34.5%, crest on the brand card | **43.5%** (13.05 s) | — | 84.9-90.9% (under the CTA) | — | Hit 91.2%, sting 92.7% | Decay to the last frame |
| Lottieicon [V:1ccYWJ] | Sub boom at 2.5% | — | Visual glow build 42.6-47.4% (no audio riser measured), released by a sub at 47.9% | Bed from 3.2% | — | — | — | (none) | **91.5% (flaw)** |

### 16.4.2 The arc template

| Stage | Audio state | Level (short-term) | Placement rule | Evidence |
|---|---|---|---|---|
| Frame 0 | A hook accent (sub impact, kick, or a loud texture under macro type) **or** a soft but present intro. Never a fade up from digital silence in feed formats. | Impact −6 dB; or texture −13 to −20 dB | On frame 0 or the first cut | [V:1CSXtQ t=0.00s] [V:19NRDv t=0.03s] [V:15VhHR t=0.1-1.2s]; [N] (93% of top TikToks use audio) |
| Setup | Sparse: kicks every 2 beats with silence between, near-silence with keystrokes, or soft plucks | −22 to −45 dB between events | First 7-25% RT | [V:19NRDv] [V:1CSXtQ] [V:1-6l8S] |
| Reveal | Near-silence 100-350 ms → riser 1-4 s → crest on the reveal cut | Riser crest ≈ −12 dB | Crest 0-2 f before the cut | [V:1-6l8S] [V:1CSXtQ] |
| Drop / groove-in | Full bed enters | Body −12 to −18 dB; drop window up to −4 dB | On the first product moment, 0-8 f after its cut | §16.4.3 |
| Demo body | Steady groove; interface accents; suck-out for the one decisive action | Body level | — | [V:15VhHR] |
| Breakdown | Low-pass, pad-only or 7-17 dB down | −20 to −34 dB | Under the densest reading; 6-15% RT | §16.4.4 |
| Build / re-entry | Re-enter within ±2 f of the next big section cut, or as a move accelerates | Back to body level | — | [V:15VhHR t=14.9s, 33.4s] |
| Climax | Densest rhythm; cuts on eighths; escalating swaps | Body level, brightest spectrum | Last 10-15% before the lockup | [V:19NRDv t=56.67-61.47s] [V:1-6l8S t=52-70s] |
| Lockup | Gap → hit on the lockup ±2 f → sting or tail 1.2-2.2 s | Hit +8 to +15 dB; sting ≈ −7 dB | 90-95% RT | §16.4.6 |
| Out | Decay to ≤ −60 dB | — | Last 0-0.5 s by default (1.2 s measured maximum), only on a static end card | [V:1CSXtQ] [V:15VhHR] [V:19NRDv] |

### 16.4.3 Drop placement

**SD-AR1. The drop lands on the first product moment.** [U: 4/4 films with a drop]
- Wix: drop 8 f after the cut to the first product UI, as the headline starts typing [V:15VhHR t=4.233-4.5s].
- Bumper: the full groove enters 5 f before the payment chips fly in, the first big graphic move [V:19NRDv t=4.8-4.97s].
- HubSpot: drop peak 0.5 f after the cut to the macro prompt, at 43% RT [V:1CSXtQ t=13.033-13.05s].
- kivi: the "Just speak" pill (the product's record button) fills the frame ≈3 f before the full-band drop [V:1-6l8S t=8.17-8.28s].

So the position depends on structure, not on a fixed percentage: 7-11% RT in 50-80 s films that open on brand type, about 40-45% RT in a 30 s film with an intimate typed setup.
*Why:* the drop is the film's biggest release of energy. Spending it on the product tells the viewer what matters; spending it on the logo or on a stock-footage moment wastes it.

**SD-AR2. Picture first, drop second.** The frame that carries the product moment appears 0-3 f before the drop transient: HubSpot 0.5 f, kivi ≈3 f [V]. Never let the drop arrive before the picture changes. [U]

**SD-AR3. Clear the air before the drop.** A 100 ms gap (or a dropout of ≈−29 to −41 dB) immediately before the drop: HubSpot 12.85-12.95 s, kivi 8.13-8.23 s [V]. [U: 2 refs + §16.5]

### 16.4.4 Breakdowns under reading

**SD-AR4. Thin the bed where the eye has the most to read.** [U: 4/8]

| Ref | When | What happens | Depth | Share of runtime | What is on screen |
|---|---|---|---|---|---|
| Bumper [V:19NRDv] | 24-32 s (kicks continue to 38 s) | Low-pass: centroid 440-630 → 255-286 Hz; sub share 73-80% | Filtered, not muted | 12% (21% to 38 s) | Reporting dashboard and refunds orbit, the densest UI |
| kivi [V:1-6l8S] | 21.7-30.6 s | Pad-only, zero onsets | Rhythm removed | 11% | Five feature and statement title cards |
| Wix [V:15VhHR] | 28.7-33.3 s | Quieter section | −20 to −34 dB vs −11 to −14 (≈7-20 dB down) | 8.5% | End of the eraser demo, ice-bottle montage |
| HubSpot [V:1CSXtQ] | 25.5-27.3 s | Sustained 100-330 Hz pad | −22 to −32 dB vs ≈−15 (≈7-17 dB down) | 6% | CTA cards |

Rules:
- Keep the kick or a pulse during a breakdown if cuts must stay on the grid (Bumper kept low-passed kicks so its cuts still have a beat) [V:19NRDv].
- Keep breakdowns to 6-15% RT, and never let one hold more than 4 consecutive text-only cards: kivi's 9 s pad stretch under five text cards is the film's flagged energy dip [V:1-6l8S]. [U]
- NOSTRA's teardown recommends a −6 dB "breath" for its 4.7 s calm section, which the delivered mix lacks [V:1i2L14]. [S]
*Why:* a busy bed and dense text compete for attention. Removing rhythm or brightness lets the viewer read without the film feeling slower, which is exactly how the references use it.

### 16.4.5 Builds into the finale

**SD-AR5. Build by brightness and density, not by volume or tempo.** Bumper builds for 28 s by raising high-frequency share 3.4% → 6.2% and the spectral centroid 749 → 1114 Hz at a fixed tempo [V:19NRDv]; kivi switches from pulses to a steady eighth-note pattern from 44 s [V:1-6l8S]. Integrated loudness is normalised anyway [N], so a louder finale gains nothing. [U: 2 refs + N]

**SD-AR6. Re-enter on a section cut or on an acceleration.** Wix's music returns within 2 f after the wall cut (33.33 → 33.4 s) and as the carousel whip starts accelerating (14.83 → 14.9-15.0 s) [V:15VhHR]. [S]

### 16.4.6 Endings

| Ref | Lockup audio | Tail | Silence at the end | Verdict |
|---|---|---|---|---|
| HubSpot [V:1CSXtQ] | Hit on the lockup cut (+15 dB at 27.39-27.40 s), 100 ms gap, full-band sting at 27.85 s (−7 dB RMS) | Sting flat ≈1.2 s, then decays to −65 dB by 30.0 s | None | Model ending |
| Wix [V:15VhHR] | Dip 10 f before the tagline cut, stab 49.5-50.1 s, music out by 50.3 s, small swell across the heart-fill cut (51.1-51.7 s) | 2.2 s fade, −29 → −78 dB | 0.27 s of digital silence before the last frame | Good |
| kivi [V:1-6l8S] | Punch → hard cut on the beat to the wordmark (71.10 s) | Music −15 → −49 dB over 76-77.8 s under a 14 f fade to white | None | Good |
| Bumper [V:19NRDv] | Lockup at 61.47 s inside the groove | Fade −25 → −77 dB over 63.5-66 s | ≈1.2 s on a static end card | Acceptable |
| Lottieicon [V:1ccYWJ] | None (no sting) | Music falls 25 dB within 1 s at 40.5 s | **3.7 s, while the URL types and the spinner runs** | Flaw |

**SD-AR7. Land a hit or swell within ±2 f of the lockup's first full frame, then a sting or tail of 1.2-2.2 s.** [U: 3 refs] ElevenLabs' end-card recipe states the same intent ("final music hit lands on the logo's frame") [E, inferred].

**SD-AR8. Music never stops while the CTA is animating.** It may decay to silence only on a static end card, and by default for no more than the last 0.5 s (Part 08 BS-10). Wix reaches digital silence 0.27 s before its last frame; Bumper's ≈1.2 s near-silent tail on a static QR card is the measured maximum, acceptable but not the target. Never during the URL type-on, a button press or a spinner (Lottieicon 3.7 s) [V]. [U]
*Why:* the drop-out reads as "the film is over", so the CTA plays to a viewer who has already mentally left.

---

## 16.5 Silence as a material

### 16.5.1 Every measured gap

| Ref | Time | Duration | Depth | What follows |
|---|---|---|---|---|
| kivi [V:1-6l8S] | 6.65-6.80 s | 150 ms | −41 to −61 dB (33 ms windows) | High ticks, tonal riser under the wordmark, bass re-entry at 7.33 s |
| kivi [V:1-6l8S] | 8.13-8.23 s | 100 ms | ≈ −29 dB | Full-band drop at 8.27-8.30 s (−4 dB) |
| Chowdeck [V:126cpH] | 10.0-10.5 s | ≤ 500 ms | −35.2 dB (from −16 to −26) | The click on an onset at 10.54 s (0 f to the press) |
| Wix [V:15VhHR] | 12.2 s | ≈ 400 ms to the hit | Suck-out to −35.5 dB from −15 dB | Cut to the result 8 f later (12.467 s); hit at 12.6 s |
| Wix [V:15VhHR] | 49.3 s | short dip | −36 dB | Deck → tagline cut 10 f later; stab at full level |
| HubSpot [V:1CSXtQ] | 10.60-10.95 s | 350 ms | −46 to −64 dB | First pluck at 10.97 s |
| HubSpot [V:1CSXtQ] | 12.85-12.95 s | 100 ms | −41 dB | Drop at 13.05 s |
| HubSpot [V:1CSXtQ] | 18.95-19.02 s | 70 ms | −44 / −47 dB | Hit at 19.05 s as the HubSpot window starts to dissolve into particles |
| HubSpot [V:1CSXtQ] | 27.65-27.75 s | 100 ms | very low | Final sting at 27.85 s |
| Bumper [V:19NRDv] | 0-4.8 s | between kicks | −22 to −30 dB | Each hook cut lands on a kick |

### 16.5.2 Silence rules

**SD-SI1. Precede every hero hit with a gap of 70-350 ms (2-10 f) at ≤ −35 dB, or at least 15 dB under the running bed.** [U: 4 refs; measured depths −29 (kivi pre-drop) to −64 dB, 13-50 dB under the bed] Use 70-100 ms before a drop or a transition hit, 150-350 ms before a brand reveal or a sting. HubSpot uses four gaps in 30 s, which is the measured maximum; 2-4 per 30 s is the working range.
*Why:* the ear adapts to a steady level, and a short gap resets it, so the following hit is perceived as louder without a higher peak. That matters on loudness-normalised platforms, where peak level cannot be raised [inferred]. A gap also signals "something is about to happen" without any visual cue.

**SD-SI2. The decisive-action suck-out.** For the one action the film is about (send, generate, buy, connect), drop the bed by ≥15 dB on the press frame, hold it 0.3-0.5 s while the result builds, cut to the result about 8 f after the press, and land a single hit about 4 f after the result appears [V:15VhHR t=12.2-12.6s]. The Chowdeck variant ducks the bed for up to 0.5 s before the press and fires the accent on the press frame [V:126cpH t=10.0-10.54s]. One per film. [U: 2 refs, the strongest SaaS-specific device in the set]
*Why:* the silence makes the product's response the only event in the film for half a second. It reads as "watch this", which is the claim every SaaS demo is making.

**SD-SI3. Mid-film silence is a floor, not zero.** For any near-silence longer than the 70-350 ms designed gaps, keep −40 to −45 dB of something (a room tone, a pad tail, keystrokes); the short gaps themselves may dip to −46/−64 dB [V:1CSXtQ t=10.60-10.95s]. HubSpot's 4.7 s "silent" typing section sits at −41 to −45 dB [V:1CSXtQ t=2.5-7.2s]. Reserve digital silence for the last 0.3 s (Wix reaches it 0.27 s before the end) [V:15VhHR]. [U]
*Why:* true digital silence mid-film reads as a dropout or a broken file, especially on phones.

**SD-SI4. Long near-silence needs an intimate sound to hold it.** HubSpot's 4.7 s of near-silence works because soft keystrokes and a blinking caret carry it, and because it sets up the riser and drop that follow [V:1CSXtQ]. Without a foreground sound, more than ~1 s of near-silence mid-film reads as a gap in the edit [inferred]. [S]

**SD-SI5. Never silence the CTA.** See SD-AR8. [U]

**SD-SI6. Pull the bed before a click, not after it.** Chowdeck dips before its click, Wix sucks out on the click, HubSpot's toggle click (10.24 s) falls under a rising riser whose crest (10.30-10.35 s) lands 1-2.5 f after the track fills and on the knob's final settle (10.333 s), with the cut 1 f later [V:1CSXtQ Study C]. A dip after the click arrives too late to frame it. [U: 3 refs]

---

## 16.6 Beat sync: the cut-to-beat statistics

Part 08 §15.7 holds the editor's beat-sync rules (BS-01 to BS-12) and the beat-to-frame table. This section gives the measured statistics behind them and the rules for the sound side: what the audio has to provide so that cuts can land, and how to test sync honestly.

### 16.6.1 Measured cut-to-beat statistics

"Within" means within the stated window of an audio event. "Chance" is the share of a random cut list that would land in the same windows, as each teardown computed it.

| Ref | Cuts tested | Test | Hits | Chance | Hits ÷ chance (computed) | Verdict |
|---|---|---|---|---|---|---|
| Bumper [V:19NRDv] | 18 hard cuts | 0-2 f **before** a quarter beat of the 100.0 BPM kick grid | **11/18 (61%)** | ≈17% (3 f of an 18 f beat) | 3.6× (binomial p < 0.001) | **Grid-locked** |
| Bumper | same 18 | + within 1 f of an eighth off-beat | 15/18 (83%) | — | — | Grid-locked |
| Bumper | 17 detector cuts | ±2 f of the generic onset list | 4/17 (24%) | ≈20% | 1.2× | Misleading: the list missed the intro and breakdown kicks and ran ≈2 f early |
| kivi [V:1-6l8S] | 11 hard cuts | ±2 f of an onset | 5/11 (45%) | — | — | Two-half hybrid |
| kivi, back half 52-70 s | 6 | ±1.2 f of an onset | 4/6 (67%) | 29% | 2.3× | Locked |
| kivi, back half | 6 | ±1.1 f of the 127 BPM eighth grid | **5/6 (83%)** | ≈31% (2.2 f of a 7.09 f eighth, computed) | 2.7× | Locked |
| kivi | 19 seamless changes | ±2 f of an onset | 3/19 (16%) | — | — | Not synced (transitions follow speech) |
| HubSpot [V:1CSXtQ] | 8 hard cuts | ±2 f of a 50 ms RMS transient | **6/8 (75%)**; 7/8 counting a spectral onset | — | — | Locked in the second half |
| HubSpot | same 8 | ±2 f of the generic onset list | 3/8 | — | — | Detector under-reports |
| HubSpot | 3 seamless events (toggle, dissolve, blur) | ±2 f of a hit or click | 3/3 | — | — | In-shot events synced |
| Solar [V:1Hcg3X] | 16 hard cuts | ±2 f of an onset | 5/16 (31%) | ≈20% | 1.6× | Loose |
| Solar, mid act 6.8-16.2 s | 5 | ≈1 f of an onset | 4/5 (80%) | — | — | Downbeat landings for scene changes |
| Lottieicon [V:1ccYWJ] | 10 hard cuts | ±2 f of an onset | 4/10 (40%) | 21% | 1.9× | Loose against the music |
| Lottieicon | same 10 | ±2 f of a fitted 112.3 BPM grid | 5/10 | — | — | Loose (vector strength 0.16) |
| Lottieicon | 11 key motion events | SFX within ±3 f | **9/11 (82%)** | — | — | **SFX-locked to motion** |
| Wix [V:15VhHR] | 33 hard cuts | ±2 f of an onset | 7/33 (21%) | 5.8 cuts (18%) | 1.2× | Chance |
| Wix | same 33 | ±2 f of a best-phase 112.3 BPM grid | 13/33 (39%) | 8.3 cuts (25%) | 1.6× (best phase inflates it) | Weak at most |
| Wix | 5 section turns | ±8 f of a music event (drop, suck-out, re-entry, dip) | 5/5 | — | — | **Section-synced** |
| Chowdeck [V:126cpH] | 5 hard cuts | ±2 f of an onset | **0/5** (nearest 7 f) | ≈20% | 0 | Not beat-cut |
| Chowdeck | ≈25 visual events | ±2 f of an onset | 5-6 | ≈5 events (20%) | 1.0-1.2× | Chance, except the click (0 f after a −35 dB dip) |
| NOSTRA [V:1i2L14] | 14 hard cuts | ±2 f of an onset | 3/14 (21%) | 19.6% | 1.1× | Chance; copy-led |
| NOSTRA | 41 motion events | ±2 f of an onset | 7/41 (17%) | ≈20% | 0.9× | Chance |

**Lead and lag.** Every locked cut that could be signed puts the picture first: Bumper's 11 cuts land 0-2 f before the beat; kivi's frame-filling burst leads the drop by ≈3 f [V:1-6l8S t=8.17-8.28s]; HubSpot's cut to the macro prompt leads the drop peak by 0.5 f and its sprocket pop leads its hit by 3-4 f [V:1CSXtQ t=13.033s, 23.33s]. The only on-grid picture event that lands after its grid point is Bumper's logo stroke, 0.6 f after the 3.60 s beat (and still 0.6 f before the 3.64 s kick rise) [V:19NRDv]. Where the picture does trail its sound, it is by ≤1.2 f: HubSpot's toggle fill trails its click onset by 0.8 f (10.267 vs 10.24 s) and its blur dissolve trails its hit by 1.2 f (21.47 vs 21.43 s, 40 ms), the measured maximum, just inside the 45 ms early-sound threshold [V:1CSXtQ §11] [P].

**What the table says.**
1. Three references lock cuts to the music (Bumper throughout, kivi and HubSpot in their second halves). Five do not. Beat-cutting is a mode, not a quality marker. [U]
2. Every reference syncs its **structural** moments: the drop, the suck-out, the hero hit, the click that matters, the lockup. That is 8/8, including the three films whose cuts are at chance. [U]
3. Generic onset detectors understate sync. Bumper reads as "copy-driven" on its onset list (4/17) and as strictly locked on a sub-band kick envelope (11/18). HubSpot reads 3/8 on the list and 6/8 on RMS transients. Three of eight detectors also reported half-time tempos (§16.3). [U]

### 16.6.2 The five sync modes, and what the sound has to supply

| Mode | What decides the cut | What the audio must supply | Sound design density | References |
|---|---|---|---|---|
| **Grid-locked** | The quarter/eighth grid; picture 0-2 f ahead | A steady, transient-rich pulse with an audible kick from frame 0 (sparse kicks in the intro so hook cuts have targets) | Low: the kicks are the accents; SFX not isolatable | Bumper |
| **Two-half hybrid** | First half: speech or typing. Second half: the grid, from the drop | An intimate first half (near-silence + keystrokes, or soft plucks under in-world voice), a riser, a drop at the switch, then a steady eighth pulse | Medium: UI sounds in the first half, music accents in the second | HubSpot (switch at 43% RT), kivi (switch ≈67% RT) |
| **Section-synced** | The product's own timing; music turns only at section boundaries | Clear arrangement blocks that can be cut and moved: drop, suck-out, breakdown, re-entries, a stab | Low: a few click accents, one hit | Wix; Chowdeck's single click |
| **SFX-to-motion** | Feature order; motion peaks carry their own sound | A quiet, steady bed that leaves room for a separate SFX layer | Highest in the set: 9 designed SFX in 44 s | Lottieicon |
| **VO / copy-led** | The script's sentences; downbeats for big scene changes when the VO allows | A flat, compressed bed under narration; no drops that fight the voice | Lowest: none isolatable | Solar, NOSTRA |

### 16.6.3 Rules

**SD-B1. Sync the structure in every film; sync the cuts only in grid-locked and hybrid modes.** [U: 8/8 sync structure; 3/8 lock cuts] Same rule as Part 08 BS-01.
*Why:* the structural moments are the edit's own decisions, so they must sound decided. UI micro-timing is product truth; forcing a typing step onto the grid makes the product look staged.

**SD-B2. The picture leads the sound by 0-2 f; a frame-filling graphic may lead a drop by up to 3 f when the drop has a pre-gap; the picture never trails its sound by more than 1 f (measured maximum 1.2 f = 40 ms, HubSpot's blur dissolve).** [U: Bumper, kivi, HubSpot] Physical limit, agreed by the references: sound early is detectable at about 45 ms (1.35 f), sound late is tolerated to about 125 ms (3.75 f) (ITU-R BT.1359) [P].
*Why:* the eye needs the image before the ear confirms it. A hit that arrives first announces something the viewer cannot yet see, which reads as an editing error.

**SD-B3. Build the grid from the felt pulse with a sub-band kick envelope, not from a generic onset list.** [U: 3 detector failures] Method that recovered Bumper's grid: a 5 ms envelope of energy below 150 Hz, kicks picked from its rise points, grid fitted to them, then checked by eye on a spectrogram [V:19NRDv verification]. Resolve half-time and double-time first (SD-T5).
*Why:* general onset detectors miss low-passed and sparse kicks and can run 1-2 f early, so an editor who trusts them misplaces every cut by the same error.

**SD-B4. Report sync against chance, never as a raw count.** [U: every teardown] Chance = the share of the timeline covered by the ±2 f windows around all detected events (merge overlapping windows). For a grid it is window ÷ period: a 3 f lead window on an 18 f beat is 17%. Targets:
- Grid-locked: ≥60% of hard cuts 0-2 f before a quarter beat (≥3× chance), or ≥80% within ±2 f of a transient [V:19NRDv] [V:1CSXtQ rule 13].
- Hybrid: the locked half meets the grid target; the free half needs none.
- Section-synced, SFX-to-motion and VO-led: 100% of section turns, hero hits and decisive clicks within ±2 f of an audio event; cuts may sit at chance.
*Why:* at typical onset densities (1.2-1.6 per second) about one cut in five lands near an onset by luck. Wix's 7/33 looks like sync and is chance.

**SD-B5. Sync the in-shot events too.** [U: Bumper, HubSpot, Lottieicon] Bumper's logo stroke, routing snap, dashboard snap, wipe, merge ring and the first swap word all hit the grid [V:19NRDv §11]. HubSpot's toggle (10.267 s vs click 10.24 s), particle dissolve (19.00 vs hit 19.05) and blur dissolve (21.47 vs hit 21.43) are synced inside continuous takes [V:1CSXtQ §11]. Lottieicon's logo beat-steps land on an onset (3.47 vs 3.46 s) [V:1ccYWJ].
*Why:* long takes have no cuts to carry the music, so their internal beats do it.

**SD-B6. A cut that cannot land goes into a gap or gets its own sound.** [U as BS-03; second half inferred] HubSpot's 22.60 s cut lands 5 f before a kick and is the one flagged sync error in the film [V:1CSXtQ avoid]. Either move the cut into a silence, or give it a designed accent (a soft note, like HubSpot's 26.07 s cut) so it becomes its own event [inferred].
*Why:* a cut 3-8 f off the beat reads as a near miss; a cut in silence or on its own sound reads as intentional.

**SD-B7. Beat-paced cadences must use computed beat times.** [U] Lottieicon swaps role words every 15 f against a 16.0 f beat, so the swaps are "beat-paced but drift against the onsets" [V:1ccYWJ §11]. Compute `t = t0 + n × 60 / BPM` and round to the nearest frame minus 0-2 f of lead (Part 08 BS-04).

**SD-B8. Choose a whole-frame tempo when the film is grid-locked and must also render at 24 or 60 fps.** [X] 90 and 120 BPM land every beat on a whole frame at 24, 30 and 60 fps; 100 and 112.5 BPM do at 30 and 60 fps (computed; §16.3.2).

### 16.6.4 Sync test, step by step (run on the locked cut)

1. Export the cut list (frame numbers) from the timeline, not from a shot detector (Part 08 ER-01).
2. Build the audio event list two ways: a generic onset list, and a sub-150 Hz kick envelope plus 33-50 ms RMS rises of ≥6 dB.
3. Fit the beat grid on the felt pulse; confirm it on a spectrogram.
4. For every hard cut, compute Δ = cut frame − nearest event frame (negative = picture leads).
5. Count hits in the mode's window; compute chance (SD-B4); report hits, chance and ratio.
6. Flag every Δ of +2 f or later (picture late), and every Δ of −3 to −8 f near a kick (near miss).
7. List the structural moments (drop, suck-out, hero hit, decisive click, lockup) and confirm each is within ±2 f of its sound, with the picture first.

---

## 16.7 SFX family library (F01-F18)

The brief asks for every family: UI clicks, whooshes, risers, impacts, sub hits, tonal transitions, soft interface sounds, mechanical and digital sounds, ambient layers and transition accents. They are split into 18 families below so that each has one placement rule.

**Evidence strength.** Only three references expose an SFX layer that can be measured (Lottieicon, HubSpot, partly Wix). Where a family has no measured example it is marked [inferred] or X, and its numbers are a starting point to test, not a standard.

### 16.7.1 Master table

Levels are short-term (50-100 ms RMS) relative to the running music bed unless stated. "Budget" is per 30 s of film.

| ID | Family | Use for | Place at | Length | Level | Band | Budget / 30 s | Class | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| F01 | UI click / tap / press | A button, send, buy, select: a state change the story depends on | **Press frame, 0 f** (the frame the control darkens or depresses) | 20-60 ms [inferred] | Clear only inside a dip; ≈ bed level when the bed is down by ≥15 dB [inferred] | 2-6 kHz [inferred] | 1-3 | U | [V:126cpH t=10.54s] (0 f) [V:1CSXtQ t=10.24s] (0.2 f); [V:15VhHR] ≈4 click-aligned onsets, only within ±0.1 s (±3 f), so Wix supports "one per click", not the 0 f placement |
| F02 | Keystrokes / typing | Typed prompts and headlines | On each burst; individual keys only when typing ≤12 chars/s [inferred] | per key 15-40 ms [inferred] | **20-25 dB under the full music level** | Broadband transient | 1 passage | S | [V:1CSXtQ t=2.5-7.2s]; missing in [V:1ccYWJ t=34.4-37.2s] (flagged) |
| F03 | Toggle / switch / latch (mechanical UI) | Toggles, checkboxes, drag-drop snaps, connect/disconnect | Press frame; optional second tick on the settle frame (1-3 f later) [inferred] | 30-80 ms | As F01 | 1-5 kHz [inferred] | 0-2 | S | [V:1CSXtQ t=10.20-10.33s] (click onset 10.24 s, knob 10.233-10.333 s) |
| F04 | Soft interface tones (ping, chime, success, notification) | A toast, a notification, a "done" state, sparkle on an AI result | First full-opacity frame of the toast or result [inferred] | 150-600 ms with a short tail [inferred] | Blended into the bed, +0-4 dB in its band | 3-6 kHz (kivi blips 4.4-5 kHz) | 0-2 | S | [V:1-6l8S t=0-6.7s] (chime-like blips, blended); [S:Clever Devices] audio cues synced to system updates |
| F05 | Settle ticks / pops | Small staggered arrivals: dots, chips, icons, a hero pop | **First moving frame** of an expo-out arrival; frame 0 of an oversize-and-settle pop | 10-40 ms [inferred] | −6 to −10 dB under F01 [inferred] | 3-8 kHz | 0-1 sequence | X | Recommended, not present: [V:1i2L14 §12 takeaway] (dot pops at 3.57/3.63/3.70 s) |
| F06 | Counter / data ticks | Count-ups, chart draws, progress | A tick texture while the value runs (≤15 ticks/s), one "lock" accent on the final-value frame [inferred] | Run length of the counter (≈1-1.9 s) | Low; the lock accent at F01 level | 2-6 kHz | 0-1 | X | No counter in the set is audibly sounded [V:19NRDv t=23.90-24.93s] [V:1ccYWJ t=9.93-11.80s] |
| F07 | Whoosh | The one or two biggest moves: a send, a ribbon, a whip into a cut | **Peak on the fastest frame**: on the cut for a whip-into-cut or a velocity hand-off; mid-move for a glide | 250-700 ms with the peak in the last third [inferred] | **+3 to +6 dB** over the bed above 4 kHz | >4 kHz air, optional low body | **0-1** (0-2 per film) | U | [V:1CSXtQ t=17.80s] (≈3 dB bump) [V:1ccYWJ t=23.54-23.59s] (+5-6 dB, ≤1 f from peak velocity); none on whips in [V:15VhHR] [V:1i2L14] |
| F08 | Swish / air pass | Small repeated moves: word swaps, orbit steps, card flips | Each swap's outgoing tilt frame [inferred] | 80-200 ms [inferred] | +2 to +5 dB above 4 kHz | >4 kHz | 0-1 sequence of ≤5 | X | [V:1ccYWJ t=5.80/6.30/6.80s] faint (+2-5 dB, weak); card flip unsounded [V:1ccYWJ t=15.99-16.37s] |
| F09 | Riser (tonal or noise) | Into a brand reveal, a drop, a lockup | **Crest 0-2 f before the hit or cut**; then a gap or the hit | 1 s (logo) to ≈4 s (UI build) | Crest ≈ −12 dB short-term | Low-mid swell 190-330 Hz + harmonics 1-1.8 and 3-5.4 kHz; or ≈900 Hz shimmer | 0-1 | U | [V:1-6l8S t=7.0-8.0s] [V:1CSXtQ t=6.4-10.35s] |
| F10 | Reverse swell / suck-in | The inhale before a hero hit or a decisive click | Ends on the gap, 2-10 f before the hit [inferred] | 0.3-0.8 s [inferred] | Rises from −30 to ≈ −15 dB [inferred] | Broadband | 0-1 | X | Not isolated in the set; the measured version is a music suck-out [V:15VhHR t=12.2s] |
| F11 | Impact / hit (full-band) | Section turns, the result landing, a polarity flip, the lockup | On the cut or event frame ±2 f, after a 70-350 ms gap | Transient + 0.3-1.2 s tail | **+8 to +15 dB** over the bed | Full band | 3-5 | U | [V:1CSXtQ t=2.10, 19.05, 21.43, 27.39s] [V:15VhHR t=12.6s] |
| F12 | Sub hit / boom | Frame fills, zoom-throughs, peak velocity of camera moves, hook accents | Fill frame, or **peak velocity ±2-3 f** | 0.3-1.0 s decay [inferred] | Peaks −2.6 to −9.3 dB; 80-100% of energy below 150 Hz | 20-150 Hz **+ a 100-300 Hz harmonic layer for phones** | 1-3; spacing ≥1.4 s | U / S | [V:1ccYWJ] (8 booms) [V:1CSXtQ t=0.00s] (−5.8 dB, 20-100 Hz) [V:19NRDv] (kicks ≈ −13.5 dB) |
| F13 | Tonal transitions (glides, tings, stabs, chord turns) | A sound that mirrors a motion's path; a light or shape match; a section turn | Glide spans the move; a ting on the match frame; a stab on the section cut | Glide 0.5-2 s; ting 0.2-0.6 s [inferred] | Bed level | 300 Hz-2 kHz | 0-2 | S | [V:1CSXtQ t=0.5-2.5s] (≈600 → 330 Hz glide under the falling dot); [V:15VhHR t=49.5-50.1s] (stab); ting: no measured example ([V:1Hcg3X §12] names only "a zap on the flash" as a hook, [inferred]) |
| F14 | Digital / data textures (shimmer, data stream, glitch) | AI generation, data transfer, a decode | Under the visual effect only, ≤10-15 f [inferred]; or **silence instead** | ≤0.5 s [inferred] | −6 to −10 dB under the bed [inferred] | 2-8 kHz | 0-1 | X | Wix builds its generation inside the suck-out silence [V:15VhHR t=12.2-12.6s]; HubSpot's particle transfer is marked by a hit, not a texture [V:1CSXtQ t=19.05s] |
| F15 | Mechanical / physical Foley (thuds, flips, landings, collisions) | Objects with physics: gravity drops, bounces, tossed cards in illustrated styles | Contact frame | 50-300 ms [inferred] | Bed level | 100 Hz-4 kHz | 0-3 (playful only) | S | Sound not measured; contact frames are: Solar's wafer landings 6.87 / 7.33 / 7.80 / 8.17 / 8.53 s and battery tip-and-settle every ≈0.5 s [V:1Hcg3X §4]; Chowdeck's gravity falls (banana 7.27-7.73 s, jug 8.27-8.47 s) [V:126cpH] |
| F16 | Ambient layers (room tone, air, pads, environment) | Under every "silence" mid-film; under lifestyle or 3D environment shots | Continuous | — | **Floor −40 to −45 dB** | Broadband / low-mid pads | Always | U | [V:1CSXtQ t=2.5-7.2s] (−41 to −45 dB floor); pads [V:1-6l8S t=21.7-30.6s] [V:1CSXtQ t=25.5-27.3s] |
| F17 | Sting / sonic logo | The lockup | Hit within ±2 f of the lockup's first full frame; sustain then decay under the static hold | 1.2-2.2 s | Loudest sustained moment (HubSpot −7 dB RMS) | Full band | 1 per film | U | [V:1CSXtQ t=27.85-30.0s] [V:15VhHR t=49.5-53.6s]; [E] "final music hit lands on the logo's frame"; [S:Bolt] sonic brand |
| F18 | Product / in-world audio (dictation, generated voice or music, device sounds) | Any product whose output is sound, or whose input is voice | Where the product makes it; on-screen text follows it word for word | As spoken | The hero layer; music ducked or thinned under it | 300-3400 Hz (voice) | As needed | S / SaaS | [V:1-6l8S] (in-world dictation at 9.5-14.5, 18.5-22.5, 40-45 … s); [E] (output heard over a live waveform) |

### 16.7.2 Family notes, with the why and a do/don't pair

**F01 UI click.** The single most useful SaaS sound, because it proves the interface is responding. Chowdeck lands its only accent on the press frame after a −35 dB dip [V:126cpH t=10.0-10.54s]; HubSpot's click onset sits on the knob press (10.24 s vs 10.233 s) under a rising riser [V:1CSXtQ]; Wix has about four click-aligned onsets within ±0.1 s (one 3 f early: 3.88 vs click 3.97 s), and its send click's nearest onset is 3.3 f late (12.31 vs 12.20 s), so Wix marks its decisive click with the suck-out, not a click sound [V:15VhHR].
- *How fast:* 20-60 ms, dry, with no tail past the 1 f UI state change [inferred]; the visual state change it confirms takes 1 f in Wix and 1-3 f in HubSpot [V:15VhHR] [V:1CSXtQ Study C].
- *Premium vs amateur:* premium = one click on the decisive press, bed already pulled back; amateur = a click on every UI change, hover and cursor arrival, at full bed level.
- *Why:* the press frame is the cause; a sound there makes the result that follows look caused, not animated.
- **Do:** one click on the press of the action the shot is about, with the bed already pulled back. **Don't:** click on hover, on cursor arrival, or on every UI change in a montage.

**F02 Keystrokes.** HubSpot types its headline in near-silence with keystrokes 20-25 dB under the later music; it is the "intimate" half of the film [V:1CSXtQ §12]. Lottieicon types at 23-55 chars/s with no key sound at all, and its teardown calls that a missed opportunity [V:1ccYWJ §12].
- *Why:* typing is the most human action in a SaaS demo; hearing it makes a prompt feel authored by a person in real time.
- Above about 12 chars/s individual keys blur into a buzz, so use a soft typing texture that follows the bursts and pauses, not one sample per character [inferred].
- **Do:** keystrokes in a quiet section, following the typing's bursts and its 0.9-1.1 s phrase pauses. **Don't:** layer loud keys over a full music bed, or type silently through a quiet section.

**F03 Toggle / switch / latch.** HubSpot: chip label swaps (10.200 s), knob pressed (10.233 s), click onset (10.24 s), track filled (10.267 s), riser crest (10.30-10.35 s), cut (10.367 s) [V:1CSXtQ Study C]. The mechanical state change and the musical crest arrive within 4 f of each other.
- **Do:** one tick on the press; let the music crest carry the settle. **Don't:** a separate sound for the label swap, the knob, the fill and the settle.

**F04 Soft interface tones.** The only measured example is kivi's 4.4-5 kHz chime-like blips in the intro, mixed into the music rather than placed on top [V:1-6l8S §12]. Superside sources Clever Devices' audio cues synced to the system's own stop-screen updates [S:Clever Devices].
- *Why:* a tone in the track's key reads as part of the score, so a notification can sound without breaking the music [inferred].
- **Do:** tune pings to the key of the bed and keep them within the bed's level. **Don't:** stock notification sounds from a different product (a recognisable phone ping reads as someone else's device).

**F05 Settle ticks / pops.** No reference places them; NOSTRA's teardown recommends soft ticks on its typing-dot pops and cursor taps [V:1i2L14 §12]. [N] suggests a tick "on the frame where the text settles" [unverified].
- **References win on placement:** premium arrivals are front-loaded (Bumper's hero word covers 64% of its travel in frame 1; NOSTRA's arrivals 40-45% in the first moving frame) [V:19NRDv] [V:1i2L14], so the perceived arrival is the first moving frame, not the settle. A tick on the settle frame lands 6-10 f after the eye registered the arrival [inferred from the measured ease shapes].
- **Do:** ticks only on a short staggered sequence (≤4 items) or a single hero pop. **Don't:** tick every word of kinetic type; the references let the music's eighths carry word builds [V:19NRDv §11].

**F06 Counter / data ticks.** No reference sounds its counters, including Bumper's 84 → 100 % hero moment and Lottieicon's 43 → 4,863+ count [V:19NRDv] [V:1ccYWJ]. Class X.
- **Do (test first):** either silence plus one accent when the value locks, or a soft tick texture that slows with the expo-out and stops dead with the number. **Don't:** a slot-machine rattle in a premium film.

**F07 Whoosh.** The five films whose SFX layer could be read have 0 or 1 whoosh each [U]. HubSpot's sits on the send match cut, where the bubble leaves at 34 px/f, the fastest frame of the move (≈3 dB over the bed) [V:1CSXtQ t=17.80s]. Lottieicon's sits ≤1 f from the ribbon's peak velocity (+5-6 dB above 4 kHz) [V:1ccYWJ t=23.54s]. Wix's whips and NOSTRA's whip carry none [V:15VhHR] [V:1i2L14].
- *Why:* a whoosh is the sound of air moving at speed, so it must peak where the picture is fastest. Peaking at the start of a move announces it; peaking after the landing lags it.
- **Do:** one whoosh on the one move that matters most, peak on its fastest frame. **Don't:** a whoosh on every transition; that is the audio version of a plug-in transition (Part 05 TR-A9).

**F08 Swish / air pass.** Lottieicon's role-word swaps carry faint high-band accents (+2-5 dB, "weak"), and its teardown says to make them audible [V:1ccYWJ rule 4]. Its 3D card flip carries no swish at all (the >4 kHz level stays below the body median) [V:1ccYWJ t=15.99-16.37s]. Class X.
- **Do:** a quiet, identical swish per swap in a slot-machine sequence of 3-5 items, peaking on the outgoing word's tilt frame (0-2 f before the cut) and sitting about +4 to +6 dB above the bed's >4 kHz level, i.e. just above Lottieicon's barely-audible +2-5 dB [inferred]. **Don't:** different swish samples per swap; the variation reads as random.

**F09 Riser.** kivi: near-silence (6.65-6.80 s) → ≈900 Hz shimmer riser for 1 s under the wordmark → dropout → drop [V:1-6l8S]. HubSpot: a 4 s riser under the UI build crests on the cut to the co-brand card, then **releases into 350 ms of silence**, not into a hit [V:1CSXtQ t=10.30-10.97s].
- *Why:* a riser makes the viewer expect an event at a known moment; landing the cut on its crest pays that expectation off. Releasing into silence is the premium variant: the expected hit is replaced by a held breath.
- **Do:** crest 0-2 f before the cut; 1 s for a logo, 3-4 s for a UI build. **Don't:** a riser that peaks after the cut, or risers before every section.

**F10 Reverse swell / suck-in.** Not isolated anywhere in the set. The measured equivalent is the music suck-out (Wix −20 dB on the send click) [V:15VhHR]. Class X: use only when the track has no gap to edit.

**F11 Impact / hit.** HubSpot uses five hits in 30 s, each after a gap or on a cut or in-shot event: 2.10 s (+7-9 dB, polarity flip), 19.05 s (after a 70 ms gap, as the window dissolves), 21.43 s (blur dissolve), 23.47 s (3-4 f after the sprocket pop) and 27.39 s (+15 dB, lockup cut) [V:1CSXtQ §11]. Its 26.06 s "+8 dB soft note" under a card cut is the softer, tonal version (F13). Wix lands one hit ≈4 f after the BASELINE result appears [V:15VhHR t=12.467-12.6s].
- *Why:* a full-band hit marks a boundary the viewer must notice; the preceding gap makes it loud without raising the peak.
- **Do:** gap 70-350 ms → hit on the frame the new state is first fully visible. **Don't:** hits on consecutive cuts; Lottieicon's closest booms are 1.4 s apart and that is the measured minimum.

**F12 Sub hit / boom.** Lottieicon's eight booms land on the zoom-through fill, the logo in and out, the dome's first fast frames and the peak velocity of each tour move, all within ±2-3 f [V:1ccYWJ §11]. Its teardown: low-end impacts at peak velocity "make 2D/2.5D moves feel heavy and expensive without motion blur".
- *Why:* weight is heard, not seen. A sub at peak velocity gives a flat vector move the inertia of a physical object.
- Add harmonic content at 100-300 Hz: most phone speakers reproduce little below about 150 Hz, so a pure sub vanishes on the device most viewers use [inferred].
- **Do:** subs on frame-fill and peak velocity of the 3-8 biggest moves. **Don't:** subs on text cards or under a voice.

**F13 Tonal transitions.** HubSpot's opening impact carries a descending glide (≈600 → 330 Hz over 0.5-2.5 s) that mirrors the falling dot [V:1CSXtQ §12]. Wix lands a stab across the deck → tagline turn [V:15VhHR t=49.5-50.1s]. HubSpot's brand card plays a descending pluck figure (≈1.8 kHz → 580 Hz) [V:1CSXtQ t=10.97-13.0s].
- *Why:* when a pitch moves the way the object moves, the sound reads as the object's own voice rather than as a library effect.
- **Do:** falling object → falling pitch; rising reveal → rising pitch; keep tones in the bed's key. **Don't:** a rising whoosh on a falling object.

**F14 Digital / data textures.** The strongest evidence is an absence: Wix's AI generation (the page building from the send click) plays inside a −20 dB suck-out, with a hit 4 f after the result first appears [V:15VhHR t=12.2-12.6s]. HubSpot marks its particle data transfer with a gap and a hit, not a data-stream texture [V:1CSXtQ t=18.95-19.05s]. No reference uses glitch audio.
- **Do:** let silence carry "the AI is working", then hit the result. **Don't:** glitch, bleep or "computer" textures under AI moments; they read as dated sci-fi (a premium SaaS film shows AI as calm and competent) [inferred].

**F15 Mechanical / physical Foley.** Present only as implied hooks in the illustrated films: Solar's bounces and wobbles, Chowdeck's falling products [V:1Hcg3X §12] [V:126cpH, inferred]. Class S (playful, editorial). The picture side is measured: Solar's wafer lands at 6.87, 7.33, 7.80, 8.17 and 8.53 s, a decaying bounce whose interval shrinks 0.47 → 0.37 s, and only the 7.80 s landing sits on a music onset [V:1Hcg3X §4, §11]. So a Foley layer must follow the object's own contact frames, not the music grid; each thud gets quieter with the bounce height [inferred].
- **Do:** Foley on objects that obey gravity in illustrated styles, on the contact frame. **Don't:** thuds on UI panels in a premium film; UI has no mass.

**F16 Ambient layers.** HubSpot's 4.7 s "silent" section sits at −41 to −45 dB with keystrokes on top [V:1CSXtQ]. Pads hold kivi's text-card stretch and HubSpot's CTA breakdown [V:1-6l8S] [V:1CSXtQ]. No reference adds environment ambience to its lifestyle or 3D shots [not observed].
- **Do:** a floor under every mid-film silence; a room or air bed under 3D environments [inferred]. **Don't:** digital silence mid-film (SD-SI3).

**F17 Sting / sonic logo.** HubSpot: hit on the lockup cut, 100 ms gap, sting at 27.85 s held ≈1.2 s, decaying to about −65 dB by the last frame [V:1CSXtQ]. Wix: dip, stab, swell across the heart cut, 2.2 s fade [V:15VhHR]. A brand with a sonic logo uses it here [S:Bolt]; a launch series shares motifs [S:Figma].
- **Do:** one resolved sound on the lockup, held under the static logo. **Don't:** end the music before the CTA (Lottieicon) [V:1ccYWJ].

**F18 Product / in-world audio.** kivi has no narrator: the only voice is the user dictating, with transcript text streaming at the voice's pace (4-7 words/s) [V:1-6l8S §12]. ElevenLabs' films let the generated output be heard over a live waveform [E].
- *Why:* hearing the product work is stronger proof than any narrator describing it.
- **Do:** make the product's own audio the hero and drive its visual (waveform, orb) from the real signal [E]. **Don't:** narrate over a product demo whose output is sound.

---

## 16.8 Where sound reinforces motion: the sync map

Each row gives the frame the sound belongs on. "f0" is the motion event's frame.

| Motion event | Sound | Frame placement | Evidence | Why |
|---|---|---|---|---|
| Button press, send, toggle | F01 or F03 click, after a bed dip | f0 = press frame (0 f) | [V:126cpH t=10.54s] [V:1CSXtQ t=10.24s]; Wix puts the suck-out (not a click) on its press frame [V:15VhHR t=12.20s] | The cause must be heard at the cause |
| Result appears after an action | F11 hit | ≈4 f after the result's first full frame; result cut ≈8 f after the press | [V:15VhHR t=12.2-12.6s] | Picture first, then the confirmation |
| State settles at the end of a riser | Riser crest | Crest on the settle frame (±1 f; 1-2.5 f after the state change); cut 1 f after the settle | [V:1CSXtQ t=10.267-10.367s] (fill 10.267, crest 10.30-10.35, settle 10.333, cut 10.367) | The crest and the cut share one moment |
| Camera glide, tour move, ribbon | F12 sub or F07 whoosh | **Peak velocity ±2-3 f** | [V:1ccYWJ] (9/11) | Weight belongs to the fastest instant |
| Zoom-through / object fills the frame | F12 sub | The fill frame | [V:1ccYWJ t=1.13-1.20s] (−6.2 dB) | The frame fill is the "impact" |
| Whip into a hard cut | F07 whoosh, or nothing | Peak on the last outgoing frame or the cut | [V:1CSXtQ t=17.80s]; NOSTRA's teardown puts the peak on the whip's fastest frame, 6.10-6.13 s, the frame before the hidden cut [V:1i2L14 §12]; none in [V:15VhHR]; onset 4-8 f early per [N, unverified] | The cut sits at peak velocity |
| Velocity hand-off match cut | Small hit or whoosh, ≈3 dB over the bed | The cut frame | [V:1CSXtQ t=17.80s] | Sound bridges the two halves of one motion |
| Polarity flip / cold-open cut | F11 hit or kick | The cut frame | [V:1CSXtQ t=2.133s] [V:19NRDv t=1.17s] | Light changing everywhere at once needs a sound of the same size |
| Punch-in into a cut (+18-33%) | Music onset | The cut frame ±1 f | [V:1-6l8S t=18.367s] (Δ0.0 f) | The expo-in scale builds toward the onset |
| Frame-filling graphic into a drop | Drop transient | Graphic fills ≈3 f before the drop; 100 ms dropout before it | [V:1-6l8S t=8.13-8.28s] | The burst completes inside the dropout |
| Falling object | F13 descending glide | Glide spans the fall | [V:1CSXtQ t=0.5-2.5s] | Pitch follows height |
| Light build / glow ramp into a cut | F12 sub on the release (a swell under the 2 s glow ramp is [inferred]: no audio riser was measured there) | Sub on the dome's first fast frames, ≤2 f after the cut | [V:1ccYWJ t=19.0-21.2s] (sub −8 dB at 21.2 s) | The release is the cut |
| Object dissolves into particles | 70 ms gap, then F11 hit | The first dissolve frame (hit 0-2 f after) | [V:1CSXtQ t=18.95-19.05s] | The gap makes the disintegration feel decisive |
| Blur dissolve between scenes | Hit | Dissolve start ±2 f | [V:1CSXtQ t=21.43-21.47s] | Marks a seamless change as a section turn |
| Logo stroke draw, logo scale steps | Kick or onset | The stroke's first frame; each step on a beat | [V:19NRDv t=3.62s] [V:1ccYWJ t=3.47s] | The mark "breathes" with the music |
| Word swaps in a slot-machine sequence | F08 swish (quiet) or nothing | Each swap; computed beat times | [V:1ccYWJ t=5.80-6.80s] (faint) | Rhythm without drowning the words |
| Word-by-word line build | Nothing; the music's eighths carry it | Word starts ≈ one eighth apart (7-10 f at 100 BPM) | [V:19NRDv §11] | Per-word sounds would compete with reading |
| Typing | F02 keystroke texture | Follows bursts and pauses | [V:1CSXtQ t=2.5-7.2s] | Human pace made audible |
| Cursor travel and hover | Nothing | — | No reference sounds cursor travel [not observed] | Travel is not an event; the press is |
| Toast / notification lands | F04 ping, in key | First full-opacity frame [inferred] | [S:Clever Devices] (audio cues synced to the system's updates; text only, no frame timing) | The ping is the product talking |
| Count-up completes | Silence, then one accent on the lock frame [X] | Final-value frame | none sounded [V:19NRDv] [V:1ccYWJ] | The stop is the information |
| Many-into-one implosion / merge | Riser → F11 hit | Hit on the merge frame | [V:19NRDv t=55.0-55.6s, inferred] | Release of the gathered energy |
| AI generation / develop | Silence (suck-out), then F11 hit | Hit ≈4 f after the result first appears (early in its build, not at its end) | [V:15VhHR t=12.2-12.6s] | "Watch this" without a sci-fi cliché |
| Logo lockup | F17 sting, F11 hit | Lockup's first full frame ±2 f | [V:1CSXtQ t=27.39-27.85s] | One resolution for one ending |
| Fade to white or black | Music fades with it | Music ends with or after the last frame | [V:1-6l8S t=76.8-77.78s] | Sound and picture finish together |

**SD-R1. Place sound by the motion's physics, not by the edit list.** The anchor frame is the press, the fill, the peak velocity or the contact, depending on the event (table above). [U for press and fill; S for peak velocity, two references]
*Why:* a sound at the start of a move is heard as a cue ("something is about to move"); at the physical event it is heard as the event itself.

**SD-R2. Read the anchor frame from the ease curve.** For an S-curve glide the peak velocity is at the mid-point (symmetric expo in-out) or earlier (Lottieicon's ribbon peaks at ≈37% of its move) [V:1ccYWJ]. For an expo-out arrival the event is the first moving frame. For an expo-in exit it is the last frame before the cut. [U]

**SD-R3. One sound per motion event; never one per animated property.** A card that fades, scales and rises at once gets one sound (or none). [inferred, consistent with every reference]

### 16.8.1 Transition accents: what each transition type gets

The brief lists transition accents as a family of their own. In the references the accent is chosen by the transition's physics, and most transitions get none. Every row below is a measured transition in a teardown's transitions table.

| Transition (measured) | Accent in the reference | Where it lands | How fast | Evidence | Premium vs amateur |
|---|---|---|---|---|---|
| Hard cut between claim cards on a grid | None; the kick or beat is the accent | Picture 0-2 f before the beat | Instant | [V:19NRDv] 11/18 cuts | Premium: the music carries the cut. Amateur: a swoosh or click on every card cut |
| Hard cut with a polarity or light flip | F11 hit (+7-9 dB) | The cut frame (hit 2.10-2.15 s vs cut 2.133 s) | Transient + short tail | [V:1CSXtQ T1] | A full-frame light change needs a sound of the same size |
| Velocity hand-off match cut | Small whoosh/hit ≈3 dB over the bed | The cut frame (34 px/f peak) | ≈250-450 ms [inferred] | [V:1CSXtQ T6 t=17.80s] | Premium: one, on the film's key action. Amateur: whooshes on every match cut |
| Zoom-through (object fills frame) | F12 sub (−6.2 dB) | Fill frames, 0-2 f | 10 f zoom, boom decays over ≈0.5 s | [V:1ccYWJ #1 t=1.13-1.20s] | — |
| Suck-in shrink → hard cut | F12 sub (−8.2 dB) | The cut frame, ≤1 f | 8-19 f pre-roll, sound only at the cut | [V:1ccYWJ #2 t=2.633s] | Sound at the cut, not during the shrink |
| Whip exit → hard cut | Sub (Lottieicon) or nothing (Wix, NOSTRA) | The cut, ≤2 f | 3-8 f whip | [V:1ccYWJ #3 t=4.567s]; none [V:15VhHR] [V:1i2L14] | Premium: silent or one low hit. Amateur: a stock whoosh that starts before the whip moves |
| Exponential scale punch → hard cut | Music onset (no SFX) | Cut on the onset, Δ0.0-1.5 f | +18-33% over the last 3-8 f | [V:1-6l8S T9 t=18.367s, t=71.10s] | The punch's expo-in is the "riser"; adding a riser doubles it |
| Punch → 1 white frame → frame-filling burst | Drop (full-band, −4 dB) after a 100 ms dropout | ≈3 f after the frame fills | 3 + 1 + 4 f | [V:1-6l8S T5 t=7.83-8.28s] | — |
| Light build → hard cut | F12 sub (−8 dB) on the release | ≤2 f after the cut | 2 s glow ramp, silent build [measured: no audio riser] | [V:1ccYWJ #10 t=21.2s] | — |
| Particle dissolve (object as wipe) | 70 ms gap → F11 hit | Hit 1.5 f after the dissolve starts | ≈28 f dissolve | [V:1CSXtQ T8 t=18.95-19.05s] | Premium: gap then one hit. Amateur: a sizzle/glitch texture under the particles (F14) |
| Blur (defocus) dissolve | F11 hit (−5 dB) | Within 1.2 f of the dissolve start | 8 f | [V:1CSXtQ T10 t=21.43-21.47s] | — |
| Shrink + fade card cut | Soft tonal note (+8 dB) | The cut frame | Note, no tail [inferred] | [V:1CSXtQ T13 t=26.06s] | A note in key, not a whoosh |
| Word-spacing match cut | Music onset only | Within 1 f | 0 f | [V:1CSXtQ T12 t=24.78s] | — |
| Variable-word swap (slot machine) | Faint high swish (+2-5 dB) or nothing | 0-2 f after each swap | Every 11-15 f | [V:1ccYWJ #4] | Identical sample each swap (F08) |
| 3D card flip / object wipe mid-sequence | Nothing | — | 8 f | [V:1ccYWJ #8 t=15.99-16.37s] | Leave mid-sequence UI moves unsounded |
| Blank-frame breath cut, dim-to-texture crossfade | Nothing | — | 1-9 f | [V:1ccYWJ #6, #11] | Silence lets the breath read as a breath |
| Colour-match cut after the decisive click | Music suck-out (−20 dB) from the press; hit after the cut | Suck-out on the press, cut 8 f later, hit 4 f after the cut | 0.4 s press-to-hit | [V:15VhHR t=12.20-12.6s] | The strongest SaaS transition sound in the set (SD-SI2) |
| Section cut (new chapter) | Music re-entry | ≤2 f after the cut | 0 f | [V:15VhHR t=33.33/33.4s] | Re-enter on the cut, never mid-shot |
| Shape-fill cut + colour dissolve into the logo | Small swell across the cut | Swell 51.1-51.7 s around the 51.37 s cut | 25 f dissolve | [V:15VhHR] | — |
| Fade to white / black at the end | Music fades with the picture | Ends with or after the last frame | 14-33 f | [V:1-6l8S t=76.8-77.78s]; flaw: music already gone [V:1ccYWJ #15] | Premium: sound and picture end together. Amateur: the track ends first |

Share of transitions that carry a designed accent: Lottieicon 4 of 24 (17%), HubSpot 7 of 14 with a hit, whoosh, sub or riser crest (9 of 14 counting the riser start and the soft note) [V:1ccYWJ §10] [V:1CSXtQ §10] (computed). This is the measured basis for SD-D8.

---

## 16.9 Density limits

### 16.9.1 What the references measure

| Ref | Runtime | Designed SFX (excluding music) | Per second | One sound every | Hero-class hits (≥ 8 dB over bed) | Designed gaps | Whooshes | Visual events per designed sound (computed) |
|---|---|---|---|---|---|---|---|---|
| HubSpot [V:1CSXtQ] | 30.0 s | 8 (impact, 2.10 hit, toggle click, send whoosh, 19.05 hit, 21.43 hit, lockup hit, sting) + a keystroke passage | 0.27 | 3.75 s | 4-5 | 4 | 1 | ≈2 (≈15 beats incl. seamless moves) |
| Lottieicon [V:1ccYWJ] | 44.3 s | 9 clear (8 subs, 1 whoosh) + 3 faint | 0.20 | 4.9 s | 8 | 0 | 1 | ≈3-4 (24 transitions plus in-shot events) |
| Wix [V:15VhHR] | 53.9 s | ≈6-7 (≈4 click accents, 12.6 hit, ≈13.7 transient) + suck-out + stab | 0.12 | ≈8 s | 2-3 | 3 (suck-out, two dips) | 0 | ≈10+ (one UI event every ≈0.5 s inside long shots) |
| Chowdeck [V:126cpH] | 18.0 s | 1 [inferred] | 0.06 | 18 s | 1 | 1 | 0 | ≈25 |
| kivi [V:1-6l8S] | 77.8 s | none isolatable (blips and ticks blended into the bed) | — | — | 1 measured (the −4 dB drop); the 18.37 and 71.10 punch-cuts land on onsets whose level over the bed was not measured [inferred hero-class] | 2 | 0 | — |
| Bumper, Solar, NOSTRA | — | none isolatable | — | — | Bumper: the kicks | 0 | 0 | — |

**Reading.** Even the most SFX-forward film in the set places a designed sound about every 4-5 s, and the visual event rate in these films is one every 0.5-1.5 s (Part 08 ER-U3). So sound marks at most one visual event in two, and usually one in four or fewer (computed). The amateur pattern, a sound on every visual event, is absent from all eight. [U]

### 16.9.2 Rules

**SD-D1. Average one designed SFX every 3-5 s in SFX-forward styles, and one every 8 s or more in music-led UI demos.** [U: 0.06-0.27 per second measured] Never more than one per beat (≈0.5-0.6 s), even inside a cluster [N, unverified]; the tightest measured cluster is Lottieicon's tour, four subs 1.45-1.5 s apart (≈2.7 beats) [V:1ccYWJ t=27.9-32.3s].
*Why:* each sound claims attention; past about one every 3 s they stop marking importance and become texture.

**SD-D2. Sound at most one visual event in two; aim for one in three.** [U, computed]
*Why:* sound is the hierarchy layer. If everything is sounded, nothing is emphasised.

**SD-D3. Hero-class hits (≥8 dB over the bed): at most one per 5 s of runtime averaged over the film, at least 1.4 s apart, and one loudest moment per film.** A single hero sequence may cluster them at the 1.4 s minimum (Lottieicon: 4 in 4.4 s) as long as the film average holds. [U: HubSpot 4-5 in 30 s; Lottieicon 8 in 44 s (the measured maximum, one per 5.5 s), closest 1.4 s apart; one loudest moment in 3/3 measurable films]

**SD-D4. Whooshes: 0-2 per film.** [U: 0-1 in every resolvable reference]

**SD-D5. Designed gaps: 2-4 per 30 s, never closer than about 2 s.** [U: HubSpot 4 in 30 s is the measured maximum; Wix 3 in 54 s]
*Why:* a gap only works when the ear has had time to re-adapt to the bed.

**SD-D6. Risers: at most 2 per film, plus one arrangement build.** [U: kivi 1, HubSpot 1, Bumper's 28 s build is arrangement]

**SD-D7. At most three non-music layers at any instant** (for example voice + one SFX + ambience), and never two unrelated transients on the same frame. [inferred] If a click and a whoosh collide, keep the click (§16.1 priority).

**SD-D8. Sounded transitions: 15-65% of all transitions, never all.** [U: Lottieicon 4 of 24 (17%) carry a designed SFX; HubSpot 7-9 of 14 (50-64%) coincide with a designed audio event (computed from the transition tables; §16.8.1)]

### 16.9.3 Sound budget by runtime

Computed from the densities above (0.2-0.27 designed sounds per second at the busiest) and the arc template (§16.4.2). The edit structure for each runtime is in Part 08 §17.4.

| Runtime | Music arc | Hero hits (incl. drop and lockup) | Designed gaps | Risers | Whooshes | UI clicks | Total designed SFX | Drop position | Tail after the lockup hit |
|---|---|---|---|---|---|---|---|---|---|
| 5 s (bumper / pre-roll) | One state + sting | 1 (lockup) | 0-1 | 0 | 0-1 | 0-1 | 1-2 | none; hook accent on f0 | 1.2-1.5 s |
| 10 s | Intro → groove → sting | 1-2 | 1 | 0-1 | 0-1 | 0-1 | 2-3 | 1.0-1.5 s (first product frame) | 1.2-1.5 s |
| 15 s (vertical ad) | Sparse → drop → sting | 2-3 | 1-2 | 0-1 | 0-1 | 1-2 | 3-4 | 1.5-3 s | 1.2-1.8 s |
| 30 s | Sparse → riser → drop → groove → breakdown → sting | 3-5 | 2-4 | 1 | 0-1 | 1-3 | 5-8 | 7-11% RT if it opens on brand type; 40-45% RT if it opens on an intimate typed setup | 1.2-2.2 s |
| 45 s | + breakdown under the densest reading | 4-7 | 3-5 | 1-2 | 1 | 2-4 | 7-11 | 7-11% RT | 1.5-2.2 s |
| 60 s | + build into the finale | 5-9 | 3-6 | 1-2 | 1-2 | 2-5 | 9-15 | 7-11% RT | 1.5-2.2 s |
| 90 s (launch film) | Two demo blocks, two breakdowns, one long build | 7-12 | 4-8 | 2 | 1-2 | 3-6 | 13-22 | 7-11% RT; a second lift at 55-67% RT | 1.5-2.2 s |

The 90 s row is extrapolated: the longest reference is 77.8 s (kivi), which switches to its eighth-note climax at 67% RT [V:1-6l8S]. [inferred] The 5, 10 and 15 s rows are also [inferred]: the shortest reference is Chowdeck (≈18 s, one designed sound, phone-mic audio) [V:126cpH], so they scale the 30 s densities down rather than reproduce a measured short film.

---

## 16.10 Voice and product audio

**Evidence caveat.** No reference has a confirmed conventional narrator (§0.2 point 1). Solar and NOSTRA may carry one; neither could be confirmed from the mix [V:1Hcg3X] [V:1i2L14]. Every VO rule below therefore rests on text sources ([S], [N], [P], [E]) and standards, and is marked so. The in-world voice rules rest on kivi [V:1-6l8S].

### 16.10.1 Choose the voice mode first

| Mode | When | What carries the message | Music behaviour | Evidence |
|---|---|---|---|---|
| **No voice; type narrates** | Launch films, sizzles, social, anything watched muted | On-screen type | Free to drop, suck out and build | 7-8 of 8 references; [S:Figma] "skips the usual voiceover"; only 7 of 243 showreel.design reels are tagged "Voiceover Heavy" [W:showreel.design] |
| **In-world product voice** | Voice-input and audio-output products (dictation, TTS, music, agents) | The product's own sound + text that follows it word for word | Thins to pulses or pads under the voice | kivi [V:1-6l8S]; ElevenLabs "the voice demo itself is the hero" [E, inferred] |
| **Narrator** | Platform tours, onboarding, how-tos, explainers | The VO; on-screen text is a keyword echo | Flat, compressed, ducked | [S:Superspace] "a calm narrator"; [S:Newsela] AI narrator; [S:TradeLens] "confident narration"; Solar (likely) [V:1Hcg3X] |
| **Customer soundbites** | Testimonials, case studies | The customer; no brand narrator | Understated underscore [inferred: Superside confirms only "sound and music" in scope and a "FinalMix"], swell on the closing line [inferred] | [S:Thomson Reuters] [S:Snowflake] |
| **Launch VO + bold type** | Short hype launches | A confident or high-energy VO over kinetic type | Electronic bed with impact transitions | [W:motion.so] |

**SD-V1. Default to no narrator for launch films under 60 s; let the type narrate and the product be heard.** [U: 7-8/8 references; S:playbook rule 11 "design for sound-off"]
*Why:* social video autoplays muted, and a narrator duplicates what the type already says. The references put the "voice" budget into the product's own audio instead.

### 16.10.2 Narration and caption timing

**SD-V2. Narrate at 150-170 words per minute (2.5-2.8 words/s).** [S:playbook: Superspace ≈154 wpm, Luminate ≈160, Thomson Reuters ≈170] Slow down on the closing vision line (TR does) [S:Thomson Reuters].

**SD-V3. On-screen words appear 0-2 f before their spoken onset, never after.** [P] Start the pop-in about 2 f (67 ms) before the onset so most of the entrance happens before the sound: `frame = round((startMs − 67) / 1000 × fps)` [P]. Keep a line up to 500 ms after its last word, hold a phrase at least 5/6 s, and leave at least 2 f between caption events [P] (Netflix timed-text rules).
*Why:* the same perception asymmetry as SD-B2. A word that appears after it is heard reads as late; one that appears up to about 100 ms early reads as in sync.

**SD-V4. In-world voice: stream the text at the voice's pace and make machine output faster.** kivi streams dictated words at 4-7 words/s, each fading 30% → 100% over 3-4 f, and streams AI-generated text at about 2 f per word to signal machine speed [V:1-6l8S rule 6]. [S: one reference]
*Why:* the contrast between human pace and machine pace is itself the product claim.

### 16.10.3 Mixing voice against music and SFX

| Parameter | Value | Evidence |
|---|---|---|
| Music under a narrator | **−10 to −12 dB** (the system value; [N] quotes a wider 6-12 dB range, unverified) | [E, inferred] 10-12 dB; [N, unverified] 6-12 dB |
| Ducking attack / release | 30-80 ms / 250-700 ms | [N, unverified] |
| SFX under VO | 6-10 dB below the voice | [N, unverified] |
| Bed EQ under VO | Carve 2-4 dB at 1-4 kHz while the voice speaks | [inferred] |
| Hits | Only in VO gaps of ≥250 ms; never under a stressed word | [inferred] |
| Integrated target for VO-led films | Social and web uploads −14 LUFS ±1; VO-led landing-page or help-centre embeds −16 [inferred]; speech-dominant webinar or how-to −18 (AES77). One table: §16.11.1 | [N] (AES77) |
| Music under in-world product voice | Pulses or pads only; no new melodic material while the product speaks | [V:1-6l8S] (pulses under dictation 8-22 s; pad-only under the title cards) |

**SD-V5. Never put a structural hit under a word.** [inferred, consistent with §16.1 priority] Schedule drops, hits and stings in the gaps between phrases; a 250 ms VO gap is enough room for a 70-100 ms pre-gap and a hit.

**SD-V6. Everything said must also be shown, or be unnecessary.** [S:playbook rule 11] Thomson Reuters ships a full caption track (11 cues of 2-4 s) [S:Thomson Reuters]. All eight references work with the sound off. [U]

### 16.10.4 Generated voice (TTS) and generated footage

**SD-V7. For TTS narration, request timestamps and align the reveals to them.** [P] ElevenLabs `with-timestamps` returns character timings; convert to word timings by splitting on whitespace and strip `[tags]` before display. Use `eleven_multilingual_v2` for Hindi and Hinglish narration, `eleven_v3`/`eleven_v4` when audio tags such as `[whispers]` are needed, with `{stability: 0.7, similarity_boost: 0.5, style: 0, use_speaker_boost: true}`. Generate one request per scene and pass `previous_request_ids` (up to 3) for continuity [P]. For the user's own recording with a known script, use Forced Alignment [P].

**SD-V8. Never put a real customer's words through TTS.** [S:playbook Recipe 4] If there is no recording, the film becomes caption-first.

**SD-V9. Mute the audio of generated footage and rebuild it.** Veo 3.1 clips always carry audio (it is priced "audio always on") [P]; that audio is not synced to your edit and its mix is unknown. Avoid prompts that imply dialogue, which also trigger gibberish subtitles; put "text, subtitles, captions, letters, watermark, logo" in the negative prompt [P]. [S]
*Why:* sync is the whole value of the sound layer; audio generated per clip cannot know where the cut, the click or the drop will land.

---

## 16.11 Mixing and loudness targets

### 16.11.1 Delivery targets

| Destination | Integrated | True peak | Loudness range (LRA) | Evidence |
|---|---|---|---|---|
| YouTube, X, LinkedIn, website hero, Product Hunt | **−14 LUFS ±1** | **≤ −1 dBTP** | 5-10 LU [inferred] | [N] (YouTube normalises to −14 since 2019 [unverified, secondary source]; AES77: music −16 to −14, ≤ −1 dBTP); best-mixed references −14.1 to −15.9 [V:19NRDv] [V:1CSXtQ] [V:15VhHR] |
| TikTok, Instagram Reels, Shorts | −14 LUFS (no official target; community norm) | ≤ −1 dBTP | 5-10 LU [inferred] | [N] |
| VO-led explainer as a landing-page or help-centre embed, tutorial with music | −16 LUFS [inferred compromise: AES77 puts music at −16 to −14 and speech or mixed content at −18]. A VO-led film uploaded to a social or web platform above stays at −14 | ≤ −1 dBTP | — | [N] (AES77) |
| Speech-dominant (webinar promo, how-to; little or no music) | −18 LUFS | ≤ −1 dBTP | — | [N] (AES77: speech) |

**This is the one loudness table for the whole system.** P11 §24.5 and QC-S, every guideline and the worked example cite it rather than restating other numbers.
| Broadcast TV | −23 LUFS (EBU R128) / −24 LKFS (ATSC A/85) | −1 / −2 dBTP | — | [inferred: general broadcast standards, not in the research sources] |

**Measured failures.** kivi −10.7 LUFS (platforms will turn it down about 3 dB) [V:1-6l8S]. NOSTRA −7.9 LUFS, true peak +1.6 dBTP, LRA 1.2 LU, about 5 dB of short-term range: over-limited and clipping [V:1i2L14]. Lottieicon −16.6 LUFS, quiet on phones [V:1ccYWJ]. Chowdeck's −16.3 is a phone-mic room capture and says nothing about its mix [V:126cpH].

**References win, and agree with the standard.** The two loudest references are flagged flaws by their own teardowns, and the three best-mixed sit within 2 dB of −14. This is the one place where a physical limit (platform normalisation) and the references say the same thing.

### 16.11.2 Short-term level map (the shape of a premium mix)

Approximate, from 33-100 ms RMS windows in the teardowns (meters differ by 2-4 dB; read the differences, not the absolutes).

| Layer or moment | Short-term level | Relative to the bed | Evidence |
|---|---|---|---|
| Music body | −12 to −18 dB | 0 dB (reference) | [V:1-6l8S] [V:19NRDv] [V:1CSXtQ] [V:15VhHR] |
| Breakdown | −20 to −34 dB | −7 to −17 dB | §16.4.4 |
| Designed gap before a hit | ≤ −35 dB (measured −29 to −64) | ≈ −13 to −50 dB (aim ≥15 dB down) | §16.5.1 |
| Mid-film "silence" floor | −40 to −45 dB | ≈ −25 to −30 dB | [V:1CSXtQ t=2.5-7.2s] |
| Keystrokes | ≈ 20-25 dB under the full music level | — | [V:1CSXtQ] |
| Whoosh | +3 to +6 dB in its band | +3 to +6 dB | [V:1CSXtQ] [V:1ccYWJ] |
| Hero hit / drop window | −2.6 to −8 dB | **+8 to +15 dB** | [V:1ccYWJ] [V:1-6l8S] [V:1CSXtQ] |
| Final sting (sustained) | ≈ −7 dB | ≈ +8 dB | [V:1CSXtQ t=27.85s] |
| End of the tail | ≤ −60 dB by the last frame | — | [V:1CSXtQ] [V:15VhHR] [V:19NRDv] |

### 16.11.3 Mix rules

**SD-M1. Master to −14 LUFS ±1 integrated, ≤ −1 dBTP, for every social and web destination.** [U + N]

**SD-M2. Buy impact with contrast, not with limiting.** Keep about 20 dB between the bed and the designed gaps and 8-15 dB between the bed and the hero hits. [U] A loudness range of 5-10 LU is the working target [inferred]; NOSTRA's 1.2 LU is the failure case [V:1i2L14].
*Why:* after normalisation every film plays at about the same integrated level. The only loudness left to design is the difference between moments, and a limiter removes exactly that.

**SD-M3. Separate the layers by band before reaching for level** (SD-M0, §16.1): sub hits below 100 Hz with a 100-300 Hz harmonic, voice at 300-3400 Hz, clicks and air above 2 kHz. [inferred]

**SD-M4. Keep the low end translatable to phones.** Bumper puts 55-80% of its energy below 120 Hz [V:19NRDv], which a phone speaker barely reproduces. Check every hit on a phone at medium volume; if it disappears, add harmonics, not level. [inferred]

**SD-M5. Keep the centre solid and mono-safe.** Sub, kick, voice, clicks and stings in the centre; width only on pads, ambience and air. NOSTRA's side/mid ratio is −14.6 dB (very narrow) [V:1i2L14]; it is mono-safe but adds to its flat feel. Fold the mix to mono and listen before export. [inferred]

**SD-M6. Give UI sounds one shared space.** A single short room or plate (about 0.3-0.6 s) on the SFX bus so clicks, ticks and pings sound like one device in one room; leave subs and voice dry. [inferred]

**SD-M7. Fade every audio region in and out (about 5-10 ms) and never cut a music tail short.** A hard-cut sample edge clicks. The music tail runs at least 1.2 s past the lockup hit (SD-AR7). [inferred; tail U]

**SD-M8. Bus structure and order of work.** Music bus → SFX bus → product/voice bus → ambience bus, with the voice (or product audio) sidechaining the music. Mix in this order: set the bed against the picture, carve the gaps and dips, place hits and clicks, add the voice and duck, then master. [inferred]

**SD-M9. Deliver a 48 kHz / 24-bit WAV master plus stems (music, voice, SFX, ambience) and encode AAC-LC stereo at 48 kHz, 256-320 kb/s in the MP4.** [inferred] The references were delivered as stereo AAC at 44.1 kHz (HubSpot) [V:1CSXtQ]; Superside's Thomson Reuters film was delivered at 48 kHz and named "FinalMix" [S:Thomson Reuters]. Stems let the next cut-down be remixed instead of re-edited.

### 16.11.4 Measuring loudness

- Measure: `ffmpeg -i film.mp4 -af ebur128=peak=true -f null -` (prints integrated LUFS, LRA and true peak) [inferred: standard ffmpeg filter].
- Normalise in two passes: first `ffmpeg -i mix.wav -af loudnorm=I=-14:TP=-1:LRA=10:print_format=json -f null -` (LRA=10 matches the 5-10 LU target; in `linear=true` mode loudnorm applies one gain and does not compress the range), then a second run that feeds the measured values back in (`measured_I`, `measured_TP`, `measured_LRA`, `measured_thresh`, `offset`, `linear=true`) [inferred: standard ffmpeg usage].
- Prefer adjusting the mix to hit −14 by ear and gain; use `loudnorm` as a trim, not as the limiter that decides the dynamics (SD-M2).

---

## 16.12 Sound in AI-video and template pipelines

An AI pipeline gets sync right only if sound is placed from the motion timeline, not generated per clip. The references' best moments are all frame-exact relationships (§16.0), which a per-clip audio generator cannot know.

**SD-AI1. Derive a cue sheet from the animation's event list, then render audio from the cue sheet.** Every event that §16.8 says to sound (press, fill, peak velocity, cut, lockup) becomes a cue with a frame number. [inferred, implementing SD-R1]

**SD-AI2. Choose and edit the music before placing any SFX.** Pick the track by mode and tempo (§16.2-16.3), fit it to the runtime on bar lines (Part 08 BS-07), mark its drop, gaps, breakdown and ending, and only then place the picture's structural moments on them. [U: SD-MU6]

**SD-AI3. Generate or pick SFX per family, then reuse them.** One click sample, one whoosh, one sub and one sting per film, reused wherever the family recurs. [inferred] Varying the sample on each use (a new whoosh per swap) reads as random (F08).

**SD-AI4. Write sound cues in measurable terms.** Never "add cinematic sound", "make it punchy" or "epic whoosh".

| Vague | Precise |
|---|---|
| "Cinematic sound design" | "Sub boom (80% energy < 150 Hz, harmonic at 120-250 Hz), −6 dB short-term, on f34 where the bell fills the frame; nothing else in that second" |
| "Make the click satisfying" | "Bed ducks −18 dB over 6 f before f312; dry 2-5 kHz click, 40 ms, on f312 (press frame); result cut f320; full-band hit f324, +12 dB over the bed" |
| "Add whooshes to the transitions" | "One whoosh only, on the send match cut: 450 ms, peak on f534 (the bubble's 34 px/f frame), +4 dB above 4 kHz; all other transitions unsounded" |
| "Epic music" | "100 BPM 4/4 warm-digital: plucked synth, felt piano, airy pad, sub kick; sparse kicks on beats 1 and 3 until 4.8 s; drop at 4.8 s; low-pass to ≈300 Hz at 24-32 s; sting at 55.2 s decaying to −60 dB by 60.0 s" |
| "Build tension" | "4.0 s tonal riser (harmonics 1-1.8 and 3-5.4 kHz), crest −12 dB on f310, cut on f311, then 350 ms at ≤ −45 dB before the first pluck" |
| "Dramatic pause" | "Gap 10.60-10.95 s at ≤ −45 dB; keep a −42 dB room-tone floor; no SFX" |

**Cue-sheet schema** (one row per cue; the same fields a sound designer, an editor or a renderer needs):

```json
{
  "fps": 30, "bpm": 100, "grid_t0_s": 0.033, "target_lufs": -14, "true_peak_dbtp": -1,
  "music": { "file": "music/track.wav", "drop_f": 144, "breakdown_f": [720, 960], "sting_f": 1656, "tail_end_f": 1800 },
  "cues": [
    { "f": 0,    "family": "F12", "desc": "sub hook accent, 20-100 Hz + 120-250 Hz harmonic", "level_db_rel_bed": 10, "anchor": "first frame" },
    { "f": 306,  "family": "duck", "desc": "bed -18 dB over 6 f (f306-312), hold through f324", "anchor": "6 f before press" },
    { "f": 312,  "family": "F01", "desc": "dry click, 2-5 kHz, 40 ms", "level_db_rel_bed": 0, "anchor": "press frame" },
    { "f": 324,  "family": "F11", "desc": "full-band hit, 0.6 s tail", "level_db_rel_bed": 12, "anchor": "4 f after result frame" },
    { "f": 534,  "family": "F07", "desc": "air whoosh, 450 ms, peak at f534", "level_db_rel_bed": 4, "anchor": "peak velocity" },
    { "f": 1656, "family": "F17", "desc": "sting in key, hold 36 f, decay to -60 dB by f1800", "level_db_rel_bed": 8, "anchor": "lockup first full frame" }
  ]
}
```

**Per-shot sound field for generation prompts** (used by the prompt system in Master Phases 14-18): `Sound: [family ID] [descriptor], [frame or seconds], [anchor: press / fill / peak velocity / cut / lockup], [level relative to bed], [band]; Music state: [intro / sparse / groove / breakdown / build / sting]; Silence: [gap start-end, depth]`.

---

## 16.13 Sound maps by runtime

### 16.13.1 Two measured maps

**HubSpot, 30.0 s, ≈86 BPM, two-half hybrid** [V:1CSXtQ]

| Time (s) | % RT | Picture | Audio |
|---|---|---|---|
| 0.00 | 0 | "For the first time ever", dot rises | Sub impact (−5.8 dB, 20-100 Hz) + descending glide mirroring the dot |
| 2.08-2.15 | 7 | Hard cut on motion, black → white | Hit (+7-9 dB) |
| 2.5-7.2 | 8-24 | Headline typed | Near-silence (−41 to −45 dB) + keystrokes |
| 6.4-10.35 | 21-35 | UI builds around the text; toggle on | Tonal riser; click at 10.24 s on the toggle press |
| 10.367 | 35 | Cut to the co-brand lockup | Riser crest 10.30-10.35 s, then 350 ms at −46 to −64 dB |
| 10.97-12.85 | 37-43 | Push-in on the lockup | Sparse plucks; 100 ms gap at 12.85-12.95 s |
| 13.033 / 13.05 | 43 | Cut to the macro prompt | **Drop** (picture 0.5 f first) |
| 17.80 | 59 | Send match cut | Whoosh/hit ≈3 dB over the bed |
| 18.95-19.05 | 63 | Window dissolves into particles | 70 ms gap, then hit |
| 21.43-21.47 | 72 | Blur dissolve to the first benefit card | Hit |
| 25.5-27.3 | 85-91 | CTA cards | Pad breakdown, −22 to −32 dB |
| 27.367 / 27.39 | 91 | Cut to the reprised lockup | Hit +15 dB |
| 27.65-27.75 → 27.85 | 92-93 | Static lockup | 100 ms gap → sting (−7 dB RMS), flat ≈1.2 s, decays to ≈ −65 dB by 30.0 s |

**Bumper, 67.2 s, 100.0 BPM, grid-locked** [V:19NRDv]

| Time (s) | % RT | Picture | Audio |
|---|---|---|---|
| 0.0, 1.2, 2.4, 3.6 | 0-5 | Hook cuts (1.17, 2.40); logo stroke 3.62 | Sub kicks every 1.2 s (≈ −13.5 dB), −22 to −30 dB between them |
| 4.8 | 7 | Chips fly in 5 f later (4.97) | Full groove enters |
| 4.8-24 | 7-36 | Claim cards on quarter beats; proof shots | Steady groove, −17 to −18 dB, centroid 440-630 Hz |
| 24-32 (kicks to 38) | 36-57 | Densest UI: dashboard, refunds orbit | Low-pass breakdown (centroid 255-286 Hz), kicks kept |
| 32-60 | 48-89 | Climax build; chevron wipe on the grid; finale word swaps every 11-16 f | Build by brightness: hi-band 3.4 → 6.2%, centroid 749 → 1114 Hz |
| 61.47 | 91 | Lockup | Inside the groove, cut on an eighth off-beat |
| 63.5-66 | 94-98 | Static end card with QR | Fade −25 → −77 dB; ≈1.2 s near-silent tail |

### 16.13.2 Templates

All at **100 BPM** (beat 18 f, bar 72 f = 2.4 s, computed; the reference median), picture leading by 0-2 f. Part 08 §17.4 draws its edit plans on a 120 BPM planning grid; when the two are combined, keep the % positions below and re-snap every audio event to the chosen track's grid with Part 08 BS-04 (no event moves more than one beat).

**5 s (pre-roll / bumper)**

| Time (s) | Frame | Picture | Audio |
|---|---|---|---|
| 0.00 | 0 | Product or claim on f0 | F12 hook accent or a kick |
| 0.0-2.4 | 0-72 | One proof moment | One bar of groove |
| 2.4 | 70-72 | Lockup | F11 hit + F17 short sting |
| 2.4-5.0 | 72-150 | Static lockup + CTA | Sting holds ≈1.2 s, decays to ≤ −60 dB by f150 |

**15 s (vertical consumer or feature ad)**

| Time (s) | Frame | Picture | Audio |
|---|---|---|---|
| 0.00 | 0 | Hook question on f0 | F12 accent; sparse kicks |
| 2.4 | 70-72 | First product UI | **Drop** |
| 2.4-6.6 | 72-198 | Promise and range | Groove |
| 6.7-7.2 | 201-216 | Cursor dwell on the button | Bed dips ≥15 dB (≈0.5 s) |
| 7.2 | 216 | **Press frame** | F01 click |
| 7.47 | 224 | Cut to the result (8 f) | Gap continues |
| 7.6 | 228 | Result settles | F11 hit (4 f after the result) |
| 7.6-12.0 | 228-360 | Tracking / payoff | Groove re-enters |
| 12.0 | 358-360 | Lockup + CTA | F11 hit + F17 sting |
| 12.0-15.0 | 360-450 | Static lockup | Tail decays to ≤ −60 dB by f450 |

**30 s (prompt-native AI feature launch; HubSpot structure on a 100 BPM grid)**

| Time (s) | Frame | Picture | Audio |
|---|---|---|---|
| 0.00 | 0 | Cold open on black | F12 sub + F13 glide that follows the hook motion |
| 2.4 | 70-72 | Hard cut to white on motion | F11 hit |
| 2.4-6.0 | 72-180 | Headline typed | Floor −42 dB + F02 keystrokes |
| 6.0-9.55 | 180-286 | UI builds; toggle press at 8.4 s (f252) | F09 riser (3.6 s); F03 tick on f252 |
| 9.6 | 286-288 | Cut to the brand card | Riser crest on the cut; 300 ms gap to f297 |
| 9.9-11.9 | 297-357 | Brand card push-in | Sparse plucks; 100 ms gap 11.9-12.0 |
| 12.0 | 358-360 | Cut to the macro product moment (40% RT) | **Drop** |
| 15.6 | 468 | Send match cut at peak velocity | F07 whoosh (the film's only whoosh) |
| 16.73-16.8 | 502-504 | Data transfer begins | 70 ms gap → F11 hit |
| 19.2-24.0 | 576-720 | Benefit cards on quarter beats | Groove |
| 24.0-26.3 | 720-789 | CTA cards | Pad breakdown, −7 to −17 dB |
| 26.4 | 790-792 | Lockup (88% RT) | 100 ms gap → F11 hit (+12-15 dB) → F17 sting |
| 26.4-30.0 | 792-900 | Static lockup | Sting holds ≈1.2 s, decays to ≤ −60 dB by f900 |

**60 s (launch film; Bumper structure)**

| Time (s) | Frame | Picture | Audio |
|---|---|---|---|
| 0.0-4.8 | 0-144 | Hook claim cards, cut on kicks (0-2 f early); logo stroke on the 3.6 s kick | Sparse sub kicks on beats 1 and 3; −22 to −30 dB between |
| 4.8 | 144 | First big product move 0-5 f later | **Full groove** |
| 4.8-21.6 | 144-648 | Feature blocks of 2-4 bars; claims on quarter beats | Groove; F12 subs on the 2-3 biggest camera moves at peak velocity |
| 21.6-28.8 | 648-864 | Densest UI proof | Low-pass breakdown, kicks kept (12% RT) |
| 28.8-50.4 | 864-1512 | Remaining features; the decisive action at ≈43 s with a 0.4 s suck-out and a hit | Build by brightness, not level |
| 50.4-55.2 | 1512-1656 | Climax: escalating swaps every beat | Densest rhythm, brightest spectrum |
| 55.2 | 1654-1656 | Lockup (92% RT) | F11 hit + F17 sting |
| 55.2-60.0 | 1656-1800 | Static end card ≥4 s, CTA | Sting, then fade to ≤ −60 dB; ≤0.5 s of silence at the very end |

**90 s (launch film)** [inferred: extrapolated from kivi 77.8 s and Bumper 67.2 s]

| Time (s) | % RT | Picture | Audio |
|---|---|---|---|
| 0-6 | 0-7 | Hook and problem | Soft plucks or sparse kicks |
| 5.5-7.0 | 6-8 | Brand reveal | 150-300 ms gap → 1 s F09 riser under the wordmark |
| 7.2 | 8 | First product moment fills the frame | 100 ms dropout → **drop** (picture ≤3 f first) |
| 7-30 | 8-33 | Demo A (two features) | Groove; product audio or keystrokes on top; one F01 click per action |
| 30-38 | 33-42 | Feature callouts and statements | Pad-only or low-pass breakdown (≤4 text cards in a row) |
| 38-55 | 42-61 | Demo B; the decisive action | Re-entry on the section cut; one suck-out + hit |
| 55-60 | 61-67 | Turn into the climax | Switch to the eighth-note pulse; cuts on the grid from here |
| 60-82 | 67-91 | Fast demos, then climax | Build by brightness; F12 on peak-velocity camera moves |
| 82.8 | 92 | Lockup | F11 hit + F17 sting |
| 82.8-90 | 92-100 | Logo, symbol, URL with CTA | Sting and tail; music to the last frame |

---

## 16.14 Universal principles (SD-U)

Measured in 3 or more references, none contradicting.

1. **SD-U1 · Contrast beats density.** Hits are loud because the moment before them was quiet; impact comes from gaps and dips, not from level (§16.0, §16.5). [5/8 use designed gaps or dips; 3/3 measurable films spend one loudest moment on the hero beat] Why: platforms normalise integrated loudness, so only the difference between moments is left to design.
2. **SD-U2 · The type narrates, the music carries emotion, the product's sound carries proof.** No reference relies on a narrator; all eight work muted (§16.10). Why: most launch films are first seen muted, and a narrator duplicates the type.
3. **SD-U3 · Sync the structure in every film; sync the cuts only in music-led modes** (SD-B1). [8/8 sync drop, suck-out, hero hit, decisive click or lockup; 3/8 lock cuts]
4. **SD-U4 · Picture first: 0-2 f ahead of the beat or hit (≤3 f into a drop with a pre-gap); never more than 1 f behind (measured maximum 1.2 f, 40 ms)** (SD-B2). [Bumper, kivi, HubSpot; ITU-R BT.1359 [P]]
5. **SD-U5 · A gap of 70-350 ms at ≤ −35 dB (or ≥15 dB under the bed) before every hero hit; mid-film silence keeps a −40 to −45 dB floor** (SD-SI1, SD-SI3). [kivi, Chowdeck, Wix, HubSpot]
6. **SD-U6 · The drop lands on the first product moment, picture 0-3 f first** (SD-AR1, SD-AR2). [4/4 films with a drop]
7. **SD-U7 · Thin the bed under the densest reading: low-pass, pad-only or 7-17 dB down for 6-15% of the runtime** (SD-AR4). [4/8]
8. **SD-U8 · One tempo per film; energy changes by arrangement and brightness, not by tempo or level** (SD-T1, SD-T6, SD-AR5). [8/8 single tempo; Bumper and kivi builds]
   - **Default 100 BPM; 83-128 BPM for music-led product films** (references 83.4-127 BPM [V:1i2L14] [V:1-6l8S]).
   - **Exception, VO-led beds:** a felt pulse of 60-90 BPM, usually the half-time of 120-130 (Solar 64.6/129 [V:1Hcg3X]) (SD-S6).
   - **Exception, premium brand film and cinematic 3D:** 70-100 BPM, or free time with tempo-mapped hits (SD-S10) [inferred: no reference in this style].
   - **Exception, creator-led reels:** 110-128 BPM, default 120 (guideline 12) [inferred from the kit's theme ranges, clamped to this rule's ceiling].
   - Guidelines that name a tempo cite this rule and one of its exceptions.
9. **SD-U9 · Whooshes are rare (0-2 per film) and peak on the fastest frame** (F07). [0-1 in every resolvable reference]
10. **SD-U10 · Designed SFX are sparse: one every 3-5 s at most, on at most one visual event in two** (SD-D1, SD-D2). [0.06-0.27 per second measured]
11. **SD-U11 · Click on the press frame; one click per meaningful state change, never on hover or travel** (F01). [Chowdeck and HubSpot at 0-0.2 f; Wix's click accents only within ±3 f, and its decisive press gets a suck-out instead]
12. **SD-U12 · Hit or sting within ±2 f of the lockup; tail 1.2-2.2 s; music never stops while the CTA animates** (SD-AR7, SD-AR8). [HubSpot, Wix, kivi; Lottieicon is the failure]
13. **SD-U13 · Master −14 LUFS ±1, ≤ −1 dBTP; the two loudest references are flagged flaws** (SD-M1). [N + 3 best-mixed references at −14.1 to −15.9]
14. **SD-U14 · Warm-digital music with an organic element; no trailer percussion, no sung lyrics under copy** (SD-MU3, SD-MU4). [0/8 use trailer music; no intelligible lyric under text in any teardown, though Wix's vocal glides could be sung hooks [inferred]]
15. **SD-U15 · Measure sync against chance with a sub-band kick envelope, never trust a generic onset list** (SD-B3, SD-B4). [Bumper, HubSpot and three half-time errors]

## 16.15 Style-specific sound (SD-S)

| ID | Style | Music and tempo | Sync mode | Signature sound devices | SFX density | Evidence |
|---|---|---|---|---|---|---|
| SD-S1 | **Minimal Premium SaaS / Calm-Tech** | Airy organic-electronic: plucks, mallets, pads, chime-like tops; 120-128 BPM felt as a calm pulse, or 85-100 | Two-half hybrid: speech-led, then eighth-note grid | Silence → 1 s riser → drop under a frame-filling burst; pads under title cards; punch-cut on the beat into the wordmark | Very low; tones blended into the bed | [V:1-6l8S] |
| SD-S2 | **Prompt-native AI launch** | Minimal electronic pluck, ≈86 BPM (85-95) | Hybrid, switch at 40-45% RT on the drop | Sub + glide cold open; typing in near-silence; riser crest on the brand card then 350 ms silence; gaps before every hit; one send whoosh; CTA pad; held sting | Medium: ≈8 designed sounds per 30 s | [V:1CSXtQ] |
| SD-S3 | **UI-focused demo in a brand frame** | Pop-electronic with wordless vocal chops, 100-112 BPM | Section-synced | Drop 0-8 f after the first UI; suck-out on the send click; re-entries on section cuts; stab and 2.2 s fade | Low: a few click accents, one hit; no whooshes on whips | [V:15VhHR] |
| SD-S4 | **Fast startup launch / kinetic type ("night claim, day proof")** | Bass-heavy electronic or hip-hop, 100-112 BPM | Grid-locked, picture 0-2 f ahead | Sparse kicks under the hook; groove in before the first big move; low-pass breakdown under UI; 28 s brightness build; fade on a ≥4 s end card | Low: the kicks are the accents | [V:19NRDv] |
| SD-S5 | **Dark neon asset-library reel** | Light electronic/pop pulse, ≈112 BPM | SFX-to-motion | Sub booms at frame-fill and peak velocity; a whoosh on the fastest move; (add) key ticks on fast type-ons and a final sting | Highest in the set: ≈1 per 5 s | [V:1ccYWJ] |
| SD-S6 | **Editorial 2.5D explainer** | Dense, compressed mid-tempo bed (felt 60-90 BPM, often half-time of 120-130) under a probable VO | VO-led; downbeats for major scene changes | Drama from the picture (flash, colour flips), not from the mix; Foley hooks on bounces and wobbles | Low [inferred] | [V:1Hcg3X] |
| SD-S7 | **Monochrome brand-system explainer** | Mid-forward, constant-energy bed, ≈83 BPM | Copy-led | As delivered: none. Teardown fixes: ticks on dot pops and taps, one whoosh peaking on the whip's fastest frame, a filtered riser into the burst, a −6 dB breath under the calm section | Low | [V:1i2L14] |
| SD-S8 | **Playful consumer collage** | Syncopated groove (Afrobeats/amapiano-adjacent), 95-110 BPM | Narrative; one deliberate sync | Dip before the decisive click, accent on the press frame; Foley on falling products [inferred] | Low | [V:126cpH] (one reference) |
| SD-S9 | **Voice / AI-audio product** | Restrained electronic/ambient pulse, 100-120 BPM | Product-voice-led | The product's own voice or output is heard over a live waveform; music under it; riser into the end card; final hit on the logo frame | Low | [E] (sourced brand and code; sound inferred); in-world voice [V:1-6l8S] |
| SD-S10 | **Cinematic product launch / 3D technology film** | Hybrid orchestral-electronic or dark ambient; 70-100 BPM or free time with tempo-mapped hits | Hero-hit-led | Long build to one reveal; silence before it; sub drop and long-tail impact on the reveal; ambience beds under 3D environments | Low-medium | **No reference in the set** [inferred]; [W:showreel.design] lists Epic/Cinematic as a minor tag |
| SD-S11 | **Event recap / launch sizzle** | Upbeat licensed track with recurring motifs, 110-128 BPM | Grid-locked montage | Cuts on the beat throughout; a shared sonic palette across the launch series | Low | [S:Figma] [S:playbook] |
| SD-S12 | **VO-led tour / onboarding / customer story** | Light bed ducked 10-12 dB; understated underscore for testimonials | VO- or soundbite-led | Supers 0-2 f before the spoken word; hits only in VO gaps; swell under the closing line | Low | [S:Superspace] [S:Thomson Reuters] [N] [P] |

## 16.16 Experimental (SD-X): validate before using as a default

1. **SD-X1 · Riser released into silence instead of a hit.** HubSpot crests on the brand card and then holds 350 ms at −46 to −64 dB before the first pluck [V:1CSXtQ t=10.30-10.97s]. One reference. It feels premium because the expected hit is withheld; test that it does not read as a dropout on phones.
2. **SD-X2 · Sub booms at peak velocity of 2D camera moves** (F12) [V:1ccYWJ]. Measured in one reference (8 booms). Strong for tours and galleries; untested under a voice.
3. **SD-X3 · Pitch glides that mirror motion paths** (F13) [V:1CSXtQ t=0.5-2.5s]. One reference. Keep in the track's key.
4. **SD-X4 · Settle ticks and counter ticks** (F05, F06). Recommended by two teardowns, present in none [V:1i2L14] [V:1ccYWJ]. A/B test at very low level.
5. **SD-X5 · Panning whooshes and swishes with the screen direction of the move.** Not measured in any reference; NOSTRA's mix is nearly mono [V:1i2L14]. [inferred] Keep the pan within ±30% and check the mono fold-down.
6. **SD-X6 · Driving a visual (orb, waveform) from the real audio signal** [E] (ElevenLabs' open-source orb and waveform take an audio level as input). Sourced code, untested here against a full mix; drive it from the voice stem, not the master.
7. **SD-X7 · Reverse swell into a hit when the track has no gap to edit** (F10). Not measured.
8. **SD-X8 · Breath dip of −6 dB under a low-motion breather section.** Recommended by NOSTRA's teardown for its 4.7 s calm section, absent from its mix [V:1i2L14 §12].

## 16.17 Avoid (SD-A)

| ID | Avoid | Observed in | Fix |
|---|---|---|---|
| SD-A1 | Music that ends before the picture; silence under an animating CTA | Lottieicon: music gone 3.7 s early, under the URL type-on and spinner [V:1ccYWJ] | Sting on the lockup ±2 f; music to the last frame (SD-AR8) |
| SD-A2 | Over-limited masters: hot integrated loudness, true-peak overs, no dynamic range | NOSTRA −7.9 LUFS, +1.6 dBTP, LRA 1.2 LU, ≈5 dB range [V:1i2L14]; kivi −10.7 LUFS [V:1-6l8S] | −14 LUFS, ≤ −1 dBTP, 5-10 LU (SD-M1, SD-M2) |
| SD-A3 | A quiet master that undersells on phones | Lottieicon −16.6 LUFS [V:1ccYWJ] | −14 ±1 for social |
| SD-A4 | A whoosh on every transition or whip | None of the eight [U]; Part 05 TR-A9 | 0-2 whooshes per film, on the biggest moves |
| SD-A5 | A sound on every visual event (every word, card, icon) | None of the eight | Sound ≤1 in 2 visual events (SD-D2) |
| SD-A6 | A cut a few frames ahead of a kick, or any locked cut after its beat | HubSpot 22.60 s, 5 f ahead of the kick [V:1CSXtQ] | Lead by 0-2 f, or move the cut into a gap (SD-B6) |
| SD-A7 | Digital silence mid-film | Not observed; the references keep a −40 to −45 dB floor [V:1CSXtQ] | Room tone or pad tail under every gap (SD-SI3) |
| SD-A8 | A flat bed with no drop, breakdown or build | NOSTRA (5 dB range); Solar (σ 1.7 dB, acceptable only because a VO leads) [V:1i2L14] [V:1Hcg3X] | ≥3 energy states and a build (Part 08 BS-09) |
| SD-A9 | An ambient bed under 5 or more text-only cards in a row | kivi 22-31 s, flagged energy dip [V:1-6l8S] | Breakdowns ≤4 consecutive text cards; insert a UI beat or a music lift |
| SD-A10 | Silent fast typing | Lottieicon types at 23-55 chars/s with no key sound [V:1ccYWJ] | A soft keystroke texture (F02) |
| SD-A11 | Trusting an onset detector for sync decisions | Bumper misread as "copy-driven" [V:19NRDv]; half-time tempos in 3/8 | Sub-band kick envelope + chance test (SD-B3, SD-B4) |
| SD-A12 | Trailer percussion, choirs or "epic" stock on a SaaS film | None of the eight | Warm-digital (SD-MU3) |
| SD-A13 | Sung lyrics under on-screen copy | None of the eight | Wordless chops or instrumental (SD-MU4) |
| SD-A14 | Native audio from generated footage left in the mix | — [P] | Mute and rebuild from the cue sheet (SD-V9) |
| SD-A15 | Unlicensed music; trending platform sounds on business accounts | — [N] [S:playbook] | Licensed or CC0 sources; platform commercial libraries only (SD-MU7) |
| SD-A16 | Sub-only hits that vanish on phones | Risk in bass-heavy mixes (Bumper: 55-80% of energy below 120 Hz) [V:19NRDv] | Add a 100-300 Hz harmonic layer (SD-MU5) |
| SD-A17 | Glitch and "computer" bleeps for AI moments | None of the eight; Wix uses silence [V:15VhHR] | Suck-out, then a hit on the result (F14) |
| SD-A18 | Absolute dB values copied from one meter to another | The teardowns' own meters differ by 2-4 dB [V:1CSXtQ] | Copy relative shapes (dB over the bed), measure your own mix |

## 16.18 Especially good for SaaS (SD-SaaS)

1. **SD-SaaS1 · The decisive-action suck-out.** Bed down ≥15 dB on the press frame, result cut about 8 f later, a single hit about 4 f after the result appears (SD-SI2) [V:15VhHR t=12.2-12.6s] [V:126cpH t=10.0-10.54s]. The strongest SaaS-specific device in the set: it says "watch what the product does".
2. **SD-SaaS2 · Typing in near-silence, then a drop on the first product payoff** (SD-S2) [V:1CSXtQ]. It turns the prompt into an intimate human act and the product response into a release.
3. **SD-SaaS3 · Click on the press frame, one per state change** (F01) [V:126cpH] [V:1CSXtQ] [V:15VhHR]. Audible causality is the cheapest proof that the UI is real.
4. **SD-SaaS4 · Feature-led first half, music-led second half** (Part 08 ER-17), with the switch on the drop at 40-67% of runtime [V:1CSXtQ] [V:1-6l8S]. The product shows its real speed, then the film takes over.
5. **SD-SaaS5 · Section-level sync for UI-heavy demos** (SD-S3) [V:15VhHR rule 17]. UI keeps its true timing; the music still marks every chapter.
6. **SD-SaaS6 · Breakdown under the dashboard** (SD-AR4) [V:19NRDv]. The busiest UI gets the quietest music.
7. **SD-SaaS7 · Hear the product.** For voice, audio and AI-agent products, the product's own output is the hero sound, with its visual driven from the real signal (F18) [V:1-6l8S] [E].
8. **SD-SaaS8 · Silence for "AI is working"** (F14) [V:15VhHR] [V:1CSXtQ t=18.95-19.05s]. Calm competence instead of sci-fi bleeps.
9. **SD-SaaS9 · Sub weight on 2D/2.5D UI camera moves** (F12) [V:1ccYWJ]. Makes a flat UI tour feel like a physical camera without rendering motion blur.
10. **SD-SaaS10 · One sonic motif across a launch series, and the brand's sonic logo on every lockup** [S:Figma] [S:Bolt].

## 16.19 Do / Don't

| Do | Don't | Why |
|---|---|---|
| Pull the bed down ≥15 dB on the press frame of the one action the film is about | Keep the bed at full level through the payoff | Silence makes the result the only event (SD-SI2) |
| Leave 70-350 ms at ≤ −35 dB (or ≥15 dB under the bed) before each hero hit | Stack a hit straight onto a busy bar | The ear resets in the gap (SD-SI1) |
| Keep a −40 to −45 dB floor under every "silent" moment | Drop to digital silence mid-film | Zero reads as a broken file (SD-SI3) |
| Land the drop 0-3 f after the first product frame | Spend the drop on the logo or a stock shot | The biggest release belongs to the product (SD-AR1) |
| Put the cut 0-2 f before the beat | Cut on or after the kick, or 5 f early | Sound-late is tolerated; sound-early is detected at ≈45 ms (SD-B2) |
| Sync the drop, the click, the hero hit and the lockup in every film | Force every typing step and UI change onto the grid | UI timing is product truth (SD-B1) |
| One whoosh on the biggest move, peaking on its fastest frame | A whoosh on every transition | Rarity is what makes it heard (F07) |
| Sub boom at peak velocity of the big camera moves, with a 100-300 Hz harmonic | Pure sub hits mixed for studio monitors | Weight on phones needs harmonics (F12, SD-MU5) |
| A falling pitch under a falling object | A rising whoosh on a falling object | The sound becomes the object's voice (F13) |
| Silence while the AI generates, a hit when the result lands | Glitch bleeps and data-stream textures | Premium AI reads calm and competent (F14) |
| Keystrokes 20-25 dB under the full music level, in a quiet passage | Loud key clicks over the full groove, or silent fast typing | Human pace made audible (F02) |
| Low-pass or pad-only bed under the densest UI | Full groove under a dense dashboard | The eye and the ear share one attention budget (SD-AR4) |
| Build by brightness and density at a fixed tempo | Speed up the track or push the master louder | Normalisation erases level; tempo changes break the grid (SD-AR5) |
| Hit or sting on the lockup ±2 f, tail 1.2-2.2 s | End the music while the URL is still typing | The CTA must not play after the film "ends" (SD-AR8) |
| Master −14 LUFS, ≤ −1 dBTP, 5-10 LU | Limit to −8 LUFS for "punch" | Platforms turn it down and keep the distortion (SD-M2) |
| Text appears 0-2 f before its spoken word | Supers that trail the voice | Word-late reads as lag (SD-V3) |
| Mute generated-clip audio and place every sound from the cue sheet | Keep the video model's audio | Per-clip audio cannot know the edit (SD-V9) |
| Report sync as hits vs chance on a kick envelope | Report "7 cuts on beat" from an onset list | One cut in five lands on an onset by luck (SD-B4) |

## 16.20 Sound QC gate (run on the final mix against the locked picture)

1. **Mode declared** (grid-locked, hybrid, section-synced, SFX-to-motion, VO-led) and the track chosen for it: sparse intro ≥2 bars, a drop or groove entry, a breakdown, a resolvable ending (SD-MU1, SD-MU2).
2. **Tempo** 83-128 BPM felt, half-time resolved, one tempo for the whole film; beat times computed, not counted (SD-T1, SD-T5, SD-B7).
3. **Sync test** run (§16.6.4): music-led cuts ≥60% 0-2 f before a quarter beat (or ≥80% within ±2 f of a transient); in every mode 100% of drop, suck-out, hero hits, decisive clicks and lockup within ±2 f, picture first; no locked event with the picture late by >1 f; no cut 3-8 f ahead of a kick.
4. **Drop** on the first product moment, picture 0-3 f first, with a ≈100 ms pre-gap (SD-AR1-3).
5. **Gaps**: 2-4 per 30 s, 70-350 ms, ≤ −35 dB or ≥15 dB under the bed; any near-silence longer than 350 ms keeps a −40 to −45 dB floor (short designed gaps may dip to −64 dB, as HubSpot's 350 ms gap does); digital silence only in the last 0.3 s (SD-SI1, SD-SI3).
6. **Decisive action**: one suck-out ≥15 dB with click on the press frame and hit ≈4 f after the result (SD-SI2).
7. **Breakdown** under the densest reading, 6-15% RT, ≤4 text-only cards on it (SD-AR4).
8. **Density**: designed SFX ≤1 per 3 s on average and ≤1 per beat in clusters; ≤1 in 2 visual events sounded; hero hits ≤1 per 5 s and ≥1.4 s apart; whooshes ≤2; risers ≤2 (SD-D1-D6).
9. **Placement**: every SFX anchored to press, fill, peak velocity, contact or cut per §16.8; none on hover, cursor travel or per-word builds.
10. **Ending**: hit or sting within ±2 f of the lockup; tail 1.2-2.2 s; music running under every animating CTA element; ≤0.5 s of silence at the very end by default (SD-AR7, SD-AR8; Part 08 BS-10).
11. **Voice** (if any): ducked 10-12 dB; supers 0-2 f before the spoken onset; no hit under a word; everything said is also on screen (SD-V3-V6).
12. **Loudness**: −14 LUFS ±1 integrated (or the destination's target in §16.11.1), ≤ −1 dBTP, LRA 5-10 LU; measured with `ebur128` on the final MP4, not the session (SD-M1, SD-M2).
13. **Translation**: hits audible on a phone speaker at medium volume; mono fold-down keeps voice, clicks and hits intact (SD-M4, SD-M5).
14. **Clean edges**: no clicks at region boundaries; no generated-clip audio left in; every music and SFX file licensed for the destination (SD-M7, SD-V9, SD-MU7).
15. **Deliverables**: 48 kHz / 24-bit WAV master + stems (music, voice/product, SFX, ambience); AAC-LC 48 kHz 256-320 kb/s in the MP4 (SD-M9).

---

## Appendix A. Where the references disagree with generic advice

| # | Generic advice | What the references do | Ruling |
|---|---|---|---|
| 1 | Start whooshes 4-8 f before the cut, peak on the first frame of the new shot [N, unverified] | Whips into a cut: peak at or on the cut (HubSpot send). Mid-shot glides: peak at peak velocity, mid-move (Lottieicon) [V:1CSXtQ] [V:1ccYWJ] | **References win** for glides; the two agree for whips into a cut (F07, Part 05 §7.6) |
| 2 | Put a pop or tick on the frame where text settles [N, unverified] | No reference ticks its text; arrivals are front-loaded (40-64% of travel in the first frame), so the perceived arrival is the first moving frame | **References win**: tick (if at all) on the first moving frame, only on short sequences or a hero pop (F05) |
| 3 | No more than one SFX per beat [N] | The references are far sparser: one designed sound every 3.7-18 s | **References win**: one per beat is the ceiling inside a cluster, not the working density (SD-D1) |
| 4 | Soft UI clicks and whooshes throughout a launch film [E, inferred] | 0-1 whoosh per film; clicks only on decisive presses [U] | **References win** (SD-D4, F01) |
| 5 | "Sharp impact transitions synced to scene cuts" [W:motion.so] | Impacts on 15-65% of transitions, spent on section turns and hero beats | **References win**: impacts mark structure, not every cut (SD-D8) |
| 6 | Cut a launch montage on the beat [S:playbook] [S:Figma] | Only 3/8 lock cuts; UI-led films sync at section level | **Both, by mode**: beat-cut sizzles and kinetic-type launches; section-sync UI demos (SD-B1) |
| 7 | Epic or cinematic trailer music for a launch | Warm-digital in every reference; no trailer percussion | **References win** (SD-MU3); the cinematic style card (SD-S10) has no reference and stays [inferred] |
| 8 | Silence is dead air | Silence is the most consistent premium device (5/8) | **References win** (§16.5) |
| 9 | Master loud for social impact | The two loudest references are flagged flaws; best-mixed at −14.1 to −15.9 LUFS | **Standard and references agree**: −14 LUFS, ≤ −1 dBTP (SD-M1) |
| 10 | 100-120 BPM for AI-product films [E, inferred] | 83-127 BPM, median ≈100; the prompt-native reference runs ≈86 | **References extend the range**: 85-100 or 120-128 for calm AI films (SD-T3) |
| 11 | Duck music 6-12 dB under VO [N, unverified]; 10-12 dB [E, inferred] | No reference with a confirmed narrator | **Standard stands**, untested: 10-12 dB (§16.10.3) |
| 12 | Onset detectors measure sync | Detectors missed Bumper's kick grid and halved three tempos | **Method ruling**: sub-band kick envelope + chance test (SD-B3, SD-B4) |
| 13 | Music may fade to silence over a long end card (Bumper: ≈1.2 s near-silence) vs Part 08 BS-10 (≤0.5 s of silence) | Wix reaches digital silence 0.27 s before the end; HubSpot's tail is still audible at the last frame | **Default ≤0.5 s** (Part 08); Bumper's 1.2 s on a static card is the measured maximum, acceptable but not the target (SD-AR8) |
| 14 | A tick or whoosh on a 3D card flip [common practice, inferred] | Lottieicon's card flip is unsounded [V:1ccYWJ t=15.99-16.37s] | **References win**: leave mid-sequence UI transitions unsounded unless the move is a hero move |

## Appendix B. Evidence strength and gaps

| Area | Strength | Why | What would fix it |
|---|---|---|---|
| Music tempo, arcs, drops, breakdowns, gaps, endings | **Strong** | Measured on finished mixes in 6-8 references with frame-exact picture times | — |
| Cut-to-beat statistics | **Strong** | Computed against chance in every teardown; Bumper re-measured on a kick envelope | — |
| Loudness targets | **Strong** | Platform standard [N] and the references agree | — |
| Individual SFX families (whoosh, sub, hit, click) | **Medium** | Isolatable in only three films (Lottieicon, HubSpot, partly Wix); 100 ms windows give ±3 f precision on Lottieicon | Stems, or reference films with sparser beds |
| Settle ticks, counter ticks, swishes, reverse swells, Foley | **Weak** | Recommended by teardowns or [N]; absent or faint in the references | A/B tests on our own renders |
| Voice-over mixing and caption sync | **Weak for VO, medium for captions** | No reference has a confirmed narrator; caption timing rests on Netflix rules and ITU-R BT.1359 [P] | A VO-led SaaS reference measured frame by frame |
| Cinematic / 3D technology film sound | **None measured** | No such film in the reference set; the style card is [inferred] | Add 2-3 cinematic launch references |
| Ambient layers and stereo image | **Weak** | Only HubSpot's floor and NOSTRA's side/mid ratio are measured | Stem-level analysis |
| ElevenLabs sound style | **Weak** | Brand and code sourced; every sound statement in [E] is the author's inference | Frame-by-frame scrub of 2-3 ElevenLabs launch films ([E] §7 checklist) |
| Absolute dB values | **Approximate** | Meters differ by 2-4 dB between teardowns; Chowdeck is a phone-mic capture | Use relative values (dB over the bed) |


---

## Audit (adversarial pass, 2026-10-08)

Checked every numeric claim against the eight per-video teardowns (sound-design, beat-sync, transitions and verification sections) and against [N], [P], [E], [S] and [W]. Most measured values matched (LUFS, BPM, gap times and depths, drop and breakdown positions, % RT arithmetic, cut-to-beat counts and chance rates, the BPM-to-frame table, cue-sheet frame numbers). 36 fixes:

**Contradictions with the per-video analyses (corrected)**
1. Gap depth: kivi's pre-drop dropout is −29 dB, not ≤ −35. The default is now "≤ −35 dB or ≥15 dB under the bed", range −29 to −64 dB (§0.3, §16.1, SD-SI1, §16.11.2, SD-U5, §16.19, QC 5).
2. Floor vs gap: "floor never below −45 dB" contradicted HubSpot's −46/−64 dB 350 ms gap. The floor now applies to near-silence longer than the 70-350 ms gaps (SD-SI3, QC 5).
3. HubSpot riser timing: the crest (10.30-10.35 s) lands on the knob settle (10.333 s), 1-2.5 f after the fill, with the cut 1 f after. It does not land "2 f after the settle" (SD-SI6, §16.8 riser row).
4. Picture lag: HubSpot's blur dissolve trails its hit by 1.2 f (40 ms), so "nothing trails by more than 1 f" was false. The text now gives 1.2 f as the measured maximum, inside the 45 ms threshold (§16.6.1 lead/lag, SD-B2, SD-U4). Bumper's logo stroke is now described against both the grid and the kick rise.
5. Wix's hit lands 4 f after the result appears, early in its 12 f build, not "as it resolves" (§16.0, F14, §16.8 AI row).
6. Wix click placement: its click onsets are only within ±0.1 s (one is 3 f early), and its send click's onset is 3.3 f late. Wix no longer supports "0 f" clicks; its press gets the suck-out (F01 table and notes, §16.8 press row, SD-U11).
7. F11: HubSpot's "five hits" named only four. Added 23.47 s and noted the 26.06 s soft note.
8. Lottieicon light build: no audio riser was measured, so the "swell" is now tagged [inferred] and the measured sub release is given (§16.8).
9. SD-D8 / transition share: HubSpot is 7-9 of 14 transitions (50-64%), recomputed from its T1-T14 table.
10. kivi density row: only the drop is a measured hero-class hit; the two punch-cut onsets are tagged [inferred].
11. Music-brief example: a "1-bar gap" (2.4 s) contradicted SD-SI1/SD-SI4. It is now "a break of at most 1 beat (100-350 ms)".
12. SD-T5: only kivi's tempo was corrected; Solar and NOSTRA remain ambiguous (reworded). SD-T6 now says "no teardown reports a tempo change" instead of a measured "all eight keep one tempo".
13. §0.2 point 5: kivi and NOSTRA do not have resolvable SFX layers. The whoosh count is now scoped to "whips checked for a whoosh", with Wix's zero marked as its teardown's inference.
14. Lyrics: Wix's vocal glides may be "sung hooks" per its teardown, so the zero-lyrics claim is qualified (SD-MU4, SD-U14).

**Source-tag corrections (text sources)**
15. AES77 (per [N]) puts speech and mixed content at −18 LUFS and music at −16 to −14. The "mixed content −16" claim was wrong. Fixed in §0.3, §16.10.3 and §16.11.1; −16 is kept only as an [inferred] web-embed compromise.
16. "One SFX per beat" is [N, unverified] (§0.3, SD-D1). "YouTube −14 since 2019" is [N]'s unverified secondary source (§16.11.1).
17. Clever Devices: "chimes" changed to the sourced "audio cues", with a note that the source has no frame timing (§16.8 toast row).
18. Whip row: the 4-8 f whoosh lead is [N, unverified]. Added the measured NOSTRA fastest-frame anchor (6.10-6.13 s) so the frame claim no longer rests on a text source.
19. Bolt: only the sonic brand is sourced; its placement on the lockup is [inferred] (SD-MU8).
20. Customer soundbites: "understated underscore" and "swell on the closing line" are now [inferred]; Superside sources only "sound and music" in scope and a "FinalMix".
21. showreel.design: Electronic/Synth is the dominant tag across the whole catalogue, not specifically "for Tech & SaaS".
22. Tempo ranges with no source are tagged: UI-demo floor 100, playful 95-110 and event recap 110-128 (§16.2.2).
23. F13 "ting [V:1Hcg3X]": Solar names only "a zap on the flash". The ting is now marked as having no measured example.

**Coverage added**
24. New §16.8.1, transition accents: 20 measured transition types with their accent, landing frame, speed, evidence and a premium-vs-amateur note. This covers the brief's "transition accents" family explicitly.
25. F01: added how-fast (20-60 ms, against a 1-3 f UI state change) and premium-vs-amateur lines.
26. F15 Foley: added the measured contact frames (Solar's wafer landings 6.87-8.53 s with intervals shrinking 0.47 → 0.37 s, and Chowdeck's falls). Added the rule to follow the object's contact frames, not the grid.
27. F08: replaced "make them audible" with a concrete level (+4-6 dB above the bed's >4 kHz level, [inferred]) and a placement on the tilt frame.
28. SD-D1/SD-D3: added the measured tightest cluster (four subs 1.45-1.5 s apart) and clarified that the one-per-5-s limit is a film average.
29. §16.9.3: the 5, 10 and 15 s budget rows are tagged [inferred], since no reference is shorter than about 18 s.

**Mechanism and consistency fixes**
30. Cue-sheet JSON: the duck now starts at f306, 6 f before the f312 press, to match the precise-cue example and SD-SI6.
31. `loudnorm` example: LRA=10 to match the 5-10 LU target, with a note on linear mode.
32-36. Propagated fixes 1, 4 and 6 to the Do/Don't table, the QC gate and the SD-U list, so the summaries no longer contradict the corrected rules.

**Remaining known gaps** (not fixable from the evidence on hand)
- Only HubSpot and Lottieicon expose a measurable SFX layer, and Wix partly. Whoosh, click, tick and Foley statements for the other five films are "none audible over the bed", and Lottieicon's SFX timing has ±3 f precision (100 ms windows).
- No reference has a confirmed narrator. All VO ducking, attack/release and SFX-under-VO numbers are [N, unverified] or [E, inferred].
- No cinematic or 3D-technology film is in the set (SD-S10 stays [inferred]). There is no reference under about 18 s, so the 5-15 s templates are extrapolated.
- [N]'s whoosh lead, settle-tick and one-SFX-per-beat conventions are unverified. Settle ticks, counter ticks, reverse swells and Foley are untested (Class X).
- ElevenLabs sound statements [E] are the brief author's inferences, not a frame scrub.
- Absolute dB values differ by 2-4 dB between the teardowns' meters. Chowdeck's audio is a phone-mic capture.
- Not re-verified: "Hip-hop/Urban appears on agency reels" [W:showreel.design], and the exact level of Wix's click accents ([inferred] in its teardown).
