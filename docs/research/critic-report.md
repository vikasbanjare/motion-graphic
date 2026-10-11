# Completeness and consistency critic report (2026-10-08)

Scope: master/01-11, guidelines/01-12, prompt-system/** (SKILL.md, prompt-templates.md, worked-example.md), videos/*.md.

## Coverage verdict

- All 24 master sections are present: §1-2 in P01, §3/4/11 in P02, §5/18/19 in P03, §6/20/10 in P04, §7 in P05, §8 in P06, §9 in P07, §15/17 in P08, §16 in P09, §12/13/14 in P10 and §21-24 in P11.
- The libraries are complete:
  - Phase 3 has ML-01..31, covering every listed pattern plus 6 discovered ones.
  - Phase 4 has CM-01..20 and covers every listed move.
  - Phase 7 has TR-01..24 and covers all 16 listed types.
  - Phase 6 has UI-E01..22 and covers every listed element.
  - Phase 9 has F01..F18 and covers every listed sound type.
  - Phase 10 has AA-01..25 and covers all 15 listed failure modes.
  - Phase 11 has style cards A-F plus the discovered styles.
  - Phase 8 has timing plans PL-05/10/15/30/45/60/90 (§17.4).
- All 10 required guidelines exist (01-10), plus 11 (dev-tool) and 12 (Hinglish creator reel).
- Prompt system: the 25-question bank, Parts A-H, the 31-field per-shot template, the continuity bible with N→N+1 notes, and the QC gate G-01..G-45 are all present.
- Remaining issues are listed below, most severe first.

## Gaps and inconsistencies (JSON-like)

- { id: C01, type: gap, severity: S1, file: "prompt-system/motion-creative-director/SKILL.md",
    issue: "Knowledge-file table points to references/master-system.md (marked 'Always'), references/guidelines/*.md, references/prompt-templates.md and references/worked-example.md. No references/ folder exists, and master-system.md exists nowhere. The skill also says the banned-word table and the full G-01..G-45 gate live in master-system.md.",
    fix: "Create prompt-system/motion-creative-director/references/. (1) Write master-system.md as a condensed digest containing: the Direction Card (P01 §1.1); the stage timing table (P01 §2.3); ease tokens (P03 §19.3); speed tables SP-* (P03 §18); CM-01..20 (P04 §6.1); TR-01..24 (P05 §7.1); UI-B laws (P06 §8.1); type size tokens and read-time rules (P07 §9.2, §9.11-9.12); ASL and duration tokens SD-01..20 (P08); the sound stack, density limits and loudness (P09 §16.1, §16.9, §16.11); style cards and tokens (P10 §11.7); AA-U1 plus the §21.4 checklist; G-01..G-45 with the banned-vague-word table (P11 §22.1). (2) Copy or symlink guidelines/*.md, prompt-templates.md and worked-example.md into references/. (3) Or change the paths in SKILL.md to the real locations." }
  FIXED: Created prompt-system/motion-creative-director/references/: master-system.md (verbatim digest of Direction Card, §2.3 stage table, story templates/QC, safe areas, ease tokens, SP-T0/SP-V, CM/TR tables, UI-B, type tokens + §9.11-9.12, ER-U/QC, SD-01..20, DU-U, sound stack/density/loudness/SD-U, style selector + tokens, AA-U1, §21.4 checklist, G-01..G-45 + banned-word table) plus copies of guidelines/, master/, prompt-templates.md, worked-example.md; rebuilt by scratchpad/tools/build_refs.py.

- { id: C02, type: gap, severity: S2, file: "prompt-system/motion-creative-director/SKILL.md",
    issue: "The guideline list in the knowledge-file table names 01-11 and omits 12-creator-led-explainer-reel-india-hinglish.md.",
    fix: "Add `12-creator-led-explainer-reel-india-hinglish` with the trigger 'creator-led / face-to-camera reel, India, Hindi or Hinglish VO'. Also add it to the Q7 'Video type' default options." }
  FIXED: SKILL knowledge table lists guideline 12 with its trigger; Q7 options include creator-led reel (India, Hindi/Hinglish).

- { id: C03, type: inconsistency, severity: S1, file: "master/11-quality-anti-ai-qc-export.md (G-01) vs prompt-system/motion-creative-director/SKILL.md (Phase 14)",
    issue: "G-01 says 'A missing answer is asked, never assumed'. SKILL Phase 14 says to default everything except the must-knows, and to proceed on defaults when the user says 'no questions'.",
    fix: "Reword G-01 pass condition to: 'Every must-know item (product, features, on-screen facts) is supplied; every other item is either answered or listed as a stated default in the package's Assumptions block.' Keep SKILL as is." }
  FIXED: P11 G-01 pass condition now: must-knows (product, features, on-screen facts, logo when a lockup is planned) supplied; all else answered or listed in the Assumptions block. SKILL Phase 14 cites G-01.

- { id: C04, type: gap, severity: S2, file: "prompt-system/motion-creative-director/SKILL.md (question bank)",
    issue: "G-01 requires a logo SVG with clear-space rules and a deadline. The 25-question bank has no logo question and no deadline question. The logo is mentioned only in the selection-logic prose.",
    fix: "Add Q26 'Logo: SVG file and clear-space / minimum-size rules?' with the default 'Ask whenever a lockup is planned (must-know for the lockup)'. Add Q27 'Deadline and review rounds?' with the default 'Not asked for simple projects'. Add both to the flagship brief list." }
  FIXED: SKILL question bank adds Q26 logo SVG/clear space (must-know when a lockup is planned) and Q27 deadline/review rounds; both added to the flagship brief list.

- { id: C05, type: inconsistency, severity: S1, file: "master/07-typography-system.md §9.11 vs master/01 §2.12/§2.16, master/11, SKILL.md, guidelines 01-06/08/11 (≤7), guideline 09 (≤6), guidelines 07 and 10 (≤5)",
    issue: "The hook word budget has three values. P07 §9.11 says '≤5 in total'. P01, SKILL ('hook 7 words max') and most guidelines say ≤7. Guideline 09 says ≤6.",
    fix: "Pick one rule and state it in P07 §9.11, P01 §2.16 and SKILL Phase 18. Suggested: '≤7 words, ≤5 for 9:16 and spots of 15 s or less; 1-2 words visible at once while it builds'. Then align guideline 09 (≤6 → the rule) and the guideline 07 and 10 checklists (cite the 9:16/short exception)." }
  FIXED: One hook budget (P01 H2): <=7 words, <=5 in 9:16 and spots <=15 s, <=3 dialect, 1-2 visible while building; stated in P01 H2/§2.12/§2.16, P07 §9.11.1, SKILL Phase 18; guidelines 06/07/09/10/12 aligned (09 and 12 off <=6). Also fixed P07 defaults row lockup >=2.0 s -> >=1.5 s (2.2 premium).

- { id: C06, type: inconsistency, severity: S1, file: "master/10-2d-3d-and-style-categories.md (ST-U8) and master/04-camera-depth-hero.md (CM-01 rows in §6.1 and §6.2b)",
    issue: "The logo-hold floor is 1.5 s in P01 §2.16 #9, P08 SD-U5, G-11 and SKILL ('≥1.5 s still, 2.2 s premium'). P10 ST-U8 says 'holds ≥0.8 s'. CM-01 says 'reading hold of ≤1 s' with a lockup duration of 0.8-2.2 s.",
    fix: "P10 ST-U8: change to 'holds ≥1.5 s still (2.2 s premium); NOSTRA's 0.8 s and Chowdeck's 1.4 s are flagged short'. P04 CM-01: change to 'Final lockup still ≥1.5 s (2.2 s premium); a mid-film reading hold ≤1 s'. Make the duration column '≥1.5 s (lockup)'." }
  FIXED: P10 ST-U8 and P04 CM-01 (table row, card, §6.2b row) now say lockup still >=1.5 s, 2.2 s premium; NOSTRA 0.8 s and Chowdeck 1.4 s flagged short; mid-film reading hold <=1 s kept separate.

- { id: C07, type: inconsistency, severity: S1, file: "master/01-creative-direction-and-storytelling.md §2.3 table; master/08-editing-rhythm-durations.md (§17.4 PL-30/PL-60, line ~671 'stays at 9-15 %'); guidelines/04 (8-15 %), guidelines/08 (9-15 %), guidelines/09 (6-15 %)",
    issue: "The breather share disagrees across files. ER-U11, Rhythm QC #6, G-12 and SKILL require 12-15 % of runtime for films of 30 s or more. P01 §2.3 gives 11.7 % (30 s), 11.1 % (45 s), 8.3 % (60 s) and 8.9 % (90 s). PL-30 uses 11.7 %. P08 elsewhere says 9-15 %. The guidelines use 8-15 %, 9-15 % and 6-15 %.",
    fix: "Decide once. Option A: make the rule '9-15 % (≥12 % when no music breakdown)' and update ER-U11, Rhythm QC #6, G-12, SKILL and guideline 02. Option B: keep 12-15 % and re-time the P01 §2.3 benefit/breather row (30 s: 3.6-4.5 s; 60 s: 7.2-9.0 s; 90 s: 10.8-13.5 s, taking time from proof) and PL-30, then set guidelines 04, 08 and 09 to 12-15 %." }
  FIXED: One band everywhere: one breather per film >=30 s = 10-15 % of runtime at <=1/10 peak motion, or a 6-15 % music breakdown (ER-U11, P09 SD-U7; NOSTRA 13 %, kivi 11 %). P01 §2.3 60 s/90 s rows and P08 PL-60/PL-90L re-timed to 10 %; ER-U11, Rhythm QC #6, G-12, SKILL, guidelines 01/02/04/08/09, P03, P10, worked example aligned.

- { id: C08, type: inconsistency, severity: S2, file: "master/08-editing-rhythm-durations.md (SD-U3 vs Duration QC #6 vs PL-30/PL-45) and master/01 §2.3",
    issue: "Proof-block shrink rules disagree. SD-U3 says each of the last 3 proof blocks is 20-40 % shorter than the one before. Duration QC #6 only says they 'do not grow'. PL-30 runs 5.0→3.0→3.0→1.5 (one step at 0 %). PL-45 runs 9→8→7 (11-12 %). P01 §2.3 uses a flat 3×8 s at 45 s and 10/9/8/7.5 s at 60 s (6-11 %).",
    fix: "Change SD-U3 to 'proof blocks shrink 10-40 % block to block over the last three and never grow' (or keep 20-40 % and re-time PL-30, PL-45 and P01 §2.3 to match, e.g. 45 s: 10/7.5/5.5 s plus a bridge). Make Duration QC #6 state the same number. In P01 §2.3, replace the flat 3×8 s with the PL-45 split." }
  FIXED: One rule (DU-U3 + Duration QC #6): last three proof blocks each 10-40 % shorter, never grow; one use case = one block. P01 §2.3 45 s now 9/8/7, 60 s 10/9/8/7, 90 s 12.5/11/10/9/7.5; PL-60, PL-90L, PL-90E (14/12/10) re-timed and rhythm checks re-verified; PL-30 note explains single use case. Guideline examples re-timed to the rule too: 01 (60 s: 6.0/9.6/8.4/6.0 + breather), 03 (8/7/5), 11 (8.5/7.5/6), 02 and 09 block lists.

- { id: C09, type: inconsistency, severity: S2, file: "master/11-quality-anti-ai-qc-export.md (banned-word table, 'make it cinematic') and prompt-system/motion-creative-director/SKILL.md ('cinematic' example) vs master/03 §L.3 and master/04 CM-02",
    issue: "The 'cinematic' rewrite gives 'one push-in 1.00 → 1.08 over 60 f, E-GLIDE'. A 2 s push with no visible start or stop is CM-02, which must be linear: P04 lists 'ease-in-out breathing' as a mistake, and P03 §L.3 writes the same rewrite as a linear push. The amplitude is also below CM-02's +8-12 % default band (0.13 %/f vs ≥0.15 %/f).",
    fix: "In P11 and SKILL change it to 'one CM-02 push-in 1.00 → 1.10 over 60 f, E-LINEAR, roll 0; key light upper right ~4300 K; far plane ≈12 px blur @1080p; FG 1.5× focal-plane speed'. Alternatively label it CM-05/E-INOUT if a move that starts and stops on screen is intended." }
  FIXED: 'cinematic' rewrite in P11 banned-word table, SKILL and P03 §L.3 is now one CM-02 push 1.00->1.10 over 60 f, E-LINEAR, roll 0.

- { id: C10, type: inconsistency, severity: S2, file: "master/09-sound-design.md §16.11 (−18 LUFS for VO-led/speech) vs master/11-quality-anti-ai-qc-export.md QC-S ('VO-led films: −16 LUFS') vs guidelines/08 (−16 to −18) and guidelines/02 (−18)",
    issue: "The integrated loudness target for VO-led films has three values.",
    fix: "Pick one value and cite it everywhere. Suggested: 'social and web destinations −14 LUFS ±1 even when VO-led; −16 LUFS for VO-led web embeds or tutorials; −18 only for speech-dominant webinar or how-to content; all ≤−1 dBTP'. Update the P09 §16.11 table rows, P11 QC-S and QC-3.12, and guidelines 02 §11 and 08 §11." }
  FIXED: One loudness table in P09 §16.11.1 (social/web −14 ±1 even VO-led; VO-led landing-page embed −16 [inferred]; speech-dominant −18 AES77; ≤−1 dBTP); P09 §0.3/§16.10.3, P11 QC-S/§24.5/§24.14, guidelines 01/02/03/05/08/09/10/11 now cite it.

- { id: C11, type: inconsistency, severity: S2, file: "master/08-editing-rhythm-durations.md (line ~949 'bed ducked 6-12 dB')",
    issue: "Every other file (P09, P10, P11 G-35, all guidelines, the worked example) ducks music 10-12 dB under VO.",
    fix: "Change it to 'bed ducked 10-12 dB under the voice (P09 §16.10)'." }
  FIXED: P08 PL-90E shot 1 now 'bed ducked 10-12 dB under the voice (P09 §16.10)'; P09 §16.10.3 marks [N]'s 6-12 dB as an unverified wider range, system value 10-12 dB.

- { id: C12, type: inconsistency, severity: S2, file: "master/09-sound-design.md SD-U8 vs P09 style rows and guidelines 04, 08, 09, 12",
    issue: "SD-U8 says 'one tempo per film, 83-128 BPM'. P09's own style table and the guidelines prescribe 70-100 BPM (premium brand film, cinematic 3D), a felt 60-90 BPM (VO-led), 60-110 (guideline 08) and 110-130 BPM (guideline 12).",
    fix: "Rewrite SD-U8 as 'One tempo per film. Default 100 BPM, 83-128 BPM for music-led product films. Exceptions: VO-led beds 60-90 felt (half-time of 120-130); premium brand and cinematic 3D 70-100 or free time with tempo-mapped hits.' Clamp guideline 12 to 110-128 or add the creator-reel exception explicitly." }
  FIXED: P09 SD-U8 rewritten: default 100, 83-128 for music-led films, explicit exceptions (VO-led felt 60-90; premium/cinematic 3D 70-100 or free time; creator reels 110-128). Guidelines 04, 08, 09, 12 cite it; guideline 12 clamped from 110-130 to 110-128.

- { id: C13, type: inconsistency, severity: S2, file: "master/08-editing-rhythm-durations.md §17 and master/09-sound-design.md §16.14",
    issue: "ID collision. Both parts use SD-U1..SD-U6 (P08 shot-duration principles; P09 sound-design principles SD-U1..U15), and P08 also uses SD-01..SD-20 for duration tokens. A citation such as 'SD-U5' is ambiguous: P08 means the lockup hold, P09 means pre-hit gaps.",
    fix: "Rename P08's principle IDs to DU-U1..DU-U6 (keep the SD-01..SD-20 tokens), or rename P09's to SN-*. Then update every cross-reference in guidelines/*.md, P11 and the worked example (grep 'SD-U', 'SD-R', 'SD-M', 'SD-D', 'SD-T', 'SD-V', 'SD-AI')." }
  FIXED: P08's principle/class IDs renamed SD-U/R/S/X/A/SaaS -> DU-* (35 occurrences, note added in §0); SD-01..SD-20 tokens kept; external citations in guidelines 06/07 and P04/SKILL updated to DU-*.

- { id: C14, type: inconsistency, severity: S3, file: "guidelines/08-30-60-second-product-explainer.md (§7 ease table, 'E-READ')",
    issue: "Defines a new ease token E-READ ≈ (0.45, 0, 0, 1). This is E-SETTLE from P03 §19.3, under a different name. Every other file uses the P03 token set only.",
    fix: "Replace E-READ with E-SETTLE (45-72 f) and cite P03 §19.3." }
  FIXED: Guideline 08 ease table now uses E-SETTLE (0.45,0,0,1), 45-72 f, citing P03 §19.3; E-READ removed (0 occurrences left).

- { id: C15, type: inconsistency, severity: S3, file: "master/03-motion-principles-ease-speed.md (SP-U2 'exits 4-8 f'; MP comparison 'statements 9-14 f') vs master/07 §9.6-9.7 (entrances 8-14 f, exits 4-6 f) vs master/11 banned-word table and SKILL ('entrances 9-14 f, exits 4-6 f') vs worked-example B.2 ('entrances 6-12 f; exits 4-8 f')",
    issue: "The same entrance and exit duration rule appears with four different number pairs.",
    fix: "Publish one token pair in P03 §18.1 (e.g. statement entrance 8-14 f, word entrance 4-7 f, exit 4-6 f, with 4-8 f allowed only for whole-card exits). Cite that token in P07, P11, SKILL and the worked example instead of restating the numbers." }
  FIXED: New token P03 §18.1 SP-T0 (words 4-7 f, statements 8-14 f, slams 8-13 f, exits 4-6 f, whole-card exits 4-8 f); SP-U1/U2, P07 TY-U6, P08 §17.2, P11 banned-word table, SKILL, worked example and guidelines 04/06/10 cite it; all '9-14 f' and '6-12/4-8' variants removed.

- { id: C16, type: inconsistency, severity: S3, file: "master/03-motion-principles-ease-speed.md (ML-20 dashboards 'Tier S', ML-22 charts 'Tier S') vs master/06-ui-animation-system.md (UI-E13 dashboards [U, SaaS], UI-E14 charts [U])",
    issue: "The same technique has different evidence classes in two parts.",
    fix: "Align the tiers. ML-20 has 1/8 evidence and ML-22 has 2/8, so mark UI-E13 and UI-E14 as [S, SaaS] with 'weak evidence', or justify U in both places." }
  FIXED: P06 UI-E13 and UI-E14 re-tagged [S, SaaS] with weak-evidence notes, matching P03 ML-20/ML-22 Tier S.

- { id: C17, type: inconsistency, severity: S3, file: "master/04-camera-depth-hero.md (CM-07 whip pan [S]) vs master/05-transition-library.md (TR-08 camera wipe/whip pan [U])",
    issue: "The whip pan is Style-specific as a camera move but Universal as a transition. The CM-07 table title is 'Whip pan' while the card title is 'Pan / whip pan'. The library also has no slow, motivated pan entry.",
    fix: "Use one class for both, or explain the difference in each card. Rename the CM-07 table row to 'Pan / whip pan' and add the slow-pan numbers (≤0.2 % W/f while reading, otherwise 1-4 % W/f E-GLIDE), or point to CM-06 for slow lateral moves." }
  FIXED: CM-07 now [U] like TR-08 (6/8 refs, frequency style-specific); table row and §6.2b row renamed 'Pan / whip pan'; slow-pan numbers added (<=0.2 % W/f while read, else 1-4 % W/f E-GLIDE, from CM-06 measurements).

- { id: C18, type: gap, severity: S2, file: "prompt-system/motion-creative-director/SKILL.md (Phase 15 Part D storyboard columns)",
    issue: "The brief's storyboard needs lighting and music columns. SKILL Part D has no Lighting column and folds music into Sound. The worked example (Part D) does have separate Lighting, Sound design and Music behaviour columns.",
    fix: "Add rows 'Lighting | key direction, colour temperature K, change vs previous shot (none unless motivated)' and 'Music | event (bed, gap, drop, build, sting) and frame' to the Part D column table, and split Sound into SFX/VO." }
  FIXED: SKILL Part D adds Lighting (key, K, change vs previous) and Music (event + frame) columns; Sound split into SFX / VO.

- { id: C19, type: gap, severity: S2, file: "prompt-system/motion-creative-director/SKILL.md (Phase 16 field list)",
    issue: "The Phase 16 bullet list omits 'Palette' (palette tokens with hex, accent meaning, per-plane colour). G-20 and prompt-templates §9.1 field 26 both require it.",
    fix: "Add the bullet: 'Palette: tokens with hex, the accent's one meaning, colour per plane'. Also add 'resolution per layer (delivery vs generation)' and point to prompt-templates §9.2 as the canonical 31-field template." }
  FIXED: SKILL Phase 16 adds Palette (hex, accent meaning, per-plane colour) and resolution per layer; points to prompt-templates §9.2 as the canonical 31-field template.

- { id: C20, type: inconsistency, severity: S3, file: "prompt-system/prompt-templates.md §9.3 (continuity block template)",
    issue: "The template hard-codes 'key light soft from the upper right' and 'calm, slow camera'. The worked example's bible uses upper left, so copying the template verbatim would break continuity.",
    fix: "Make these variables: '{key direction}', '{K}', '{camera physics: max speed, ease family}'. Add a note that direction comes from the continuity bible (SKILL Phase 17)." }
  FIXED: prompt-templates §9.3 continuity block and §9.2 LIGHTING line now use variables {key direction}, {K}, {camera physics}, with a note that all come from the continuity bible (SKILL Phase 17).

- { id: C21, type: inconsistency, severity: S3, file: "prompt-system/motion-creative-director/SKILL.md (description and Q25) vs prompt-system/prompt-templates.md §4 'Sora 2 (deprecated: method only)'",
    issue: "SKILL offers Sora as a target tool without saying it is deprecated.",
    fix: "In Q25 and the description, write 'Sora (deprecated; method only, see prompt-templates §4)', or drop Sora from the default list." }
  FIXED: SKILL description and Q25 label Sora 'deprecated; method only, see prompt-templates §4'.

- { id: C22, type: gap, severity: S2, file: "prompt-system/prompt-templates.md (new §11.6) and SKILL.md (Phase 14 Q12 and Phase 18 'Final polish')",
    issue: "The system asks for the user's reference video and compares the package with it, but has no reusable Phase-2 analysis procedure. The brief's per-shot analysis fields are not written down as a template, and 'why each technique works' is not required anywhere. The video teardowns' shot tables also lack explicit columns for angle, scale, perspective, motion rhythm, speed changes, reflections and motion trails, plus a 'why it works' column.",
    fix: "Add a 'Reference-video teardown template'. Per shot, it records: duration, composition, framing, angle, camera move (CM-), object/UI/text motion, depth, layering, scale, perspective, lighting, background, palette, typography, motion rhythm, transition (TR-), ease (E-), speed changes, blur, glow, shadows, reflections, grain, texture, trails, DOF, parallax, 2D/3D, and WHY it works. Add a measurement recipe (frame stepping, % W/f, ASL, LUFS) per P11 §22.6. SKILL Phase 14 should fill a light version whenever Q12 supplies a video." }
  FIXED: Added prompt-templates §11.6 reference-video teardown: film header, 21-column per-shot table incl. angle/scale/perspective/rhythm/speed changes/reflections/trails/why-it-works (light version marked), P11 §22.6 measurement recipe; SKILL Q12, Phase 14 and Phase 18 Final polish use it. Existing 8 teardowns left as evidence; the template notes where their missing fields live.

- { id: C23, type: gap, severity: S3, file: "guidelines/01-12 (all)",
    issue: "The brief asks for techniques separated into universal, style-specific, experimental, avoid and especially good for SaaS. The guidelines have Common mistakes (avoid) but no Experimental block (0 mentions in all 12) and no explicit class split. None has a dedicated typography section: type specs are scattered through §6, §7 and §12.",
    fix: "Add to each guideline a short '§6b Technique classes for this format' table (Universal / Format-specific / Experimental / Avoid / Especially good for SaaS, each citing master IDs). Add a '§12b Typography' block: families and weights, size tokens per aspect (P07 §9.2), reveal and exit IDs, word budget and hold per card." }
  FIXED: All 12 guidelines gained '§6b Technique classes for this format' (Universal / Format-specific / Experimental / Avoid / Especially good for SaaS, citing master IDs; assignments tagged [inferred]) and '§12b Typography' (families/weights, P07 size tokens per aspect, RV-/EX- IDs, word budget per P01 H2, holds and floors).

- { id: C24, type: inconsistency, severity: S3, file: "guidelines/11-developer-tool-api-launch.md (§15 checklist: code '≥40 px at 9:16') and prompt-system/worked-example.md (F.1: '9:16 body ≥52 px cap')",
    issue: "P07 and G-27 set the 9:16 body floor at a ≥52 px font size (absolute floor 36 px). Guideline 11 allows 40 px code. The worked example states the floor as cap height rather than font size, which is a units mismatch.",
    fix: "Guideline 11: 'code ≥52 px font at 9:16 (≥40 px only for non-must-read texture lines)'. Worked example: '9:16 body font ≥52 px'." }
  FIXED: Guideline 11: must-read code >=52 px font at 9:16 (40 px only for non-must-read texture lines) in the size table, chars-per-line, log lines, must-read table, checklist and 9:16 cutdown; worked example now says '9:16 body font >=52 px' and '52 px font' instead of 'cap'.

- { id: C25, type: inconsistency, severity: S3, file: "prompt-system/motion-creative-director/SKILL.md (Phase 18 Typography row)",
    issue: "The Typography row says 'no text event under 25 f' and 'contrast 4.5:1'. It omits two parts of the source rules: the P08 exception for SD-03 punch cards in a rhythmic run (SD-U6, Rhythm QC #10), and the 7:1 (or ≥60 % scrim) requirement over footage (G-37, P07 RM).",
    fix: "Change the row to 'no text event under 25 f except SD-03 punch cards in a rhythmic run; contrast ≥4.5:1 (3:1 large), ≥7:1 or a ≥60 % scrim over footage'." }
  FIXED: SKILL Phase 18 Typography row adds the SD-03 punch-card exception and >=7:1 or >=60 % scrim over footage (plus 3:1 large type).

- { id: C26, type: inconsistency, severity: S3, file: "master/04-camera-depth-hero.md CM-02 ('References win: +8-12 % default') vs prompt-system/worked-example.md (B.2/F.1 'breathing +3 to +8 % per hold') and master/11 'subtle' rewrite ('Push 1.05× over 2.0 s')",
    issue: "The breathing-push amplitude default differs between files.",
    fix: "State the style exception in the CM-02 card: 'calm/minimal styles +3-8 %, default +8-12 %'. Cite that line from the worked example and the P11 banned-word table." }
  FIXED: CM-02 card states default +8-12 % and a calm/minimal exception +3-8 % (NOSTRA evidence); worked example and P11 'subtle' rewrite cite that band.

- { id: C27, type: inconsistency, severity: S3, file: "guidelines/05-feature-announcement-video.md §8 ('0.1-0.5 % frame drift per frame') and guidelines/08 §8 ('drift 0.3-0.5 %')",
    issue: "Both allow drift up to 0.5 %/f in the same sentence that sets the read-safe ceiling at ≤0.2 % W/f (CM-U7, UI-U13, QC-1.21). It is unclear which applies.",
    fix: "Specify '0.1-0.5 %/f scale drift (CM-02) and ≤0.2 % W/f translation while text is read', separating scale from translation as P07 §9.12 RM does." }
  FIXED: Guidelines 05 and 08 now separate scale breathing (CM-02 +8-12 %, calm +3-8 %) from translation (<=0.2 % W/f while text is read; 0.3-0.5 %/f only on text-free illustration, Solar).

- { id: C28, type: inconsistency, severity: S3, file: "master/11-quality-anti-ai-qc-export.md (G-07, G-10, G-12, G-26 sources 'Part 08 QC n')",
    issue: "Part 08 has two numbered QC gates: Rhythm QC (§15.18, 13 items) and Duration QC (§17.8, 11 items). 'Part 08 QC 6-7' and 'Part 08 QC 10' are therefore ambiguous; Duration QC #6 and #7 are different checks.",
    fix: "Cite them as 'P08 §15.18 #6-7', 'P08 §15.18 #10' and 'P08 §15.18 #13', and use '§17.8 #n' for duration checks." }
  FIXED: P11 citations now read 'P08 §15.18 #n' (G-10, G-12, G-26, AA-T9, QC-2.12, §AA text) and '§17.8 #n' for duration checks.

- { id: C29, type: gap, severity: S3, file: "master/01-creative-direction-and-storytelling.md §2.3",
    issue: "The stage timing table covers 15/30/45/60/90 s. The brief's Phase 8 also asks for 5 s and 10 s, which exist only in P08 §17.4 (PL-05, PL-10). Readers of the story framework do not see them.",
    fix: "Add 5 s and 10 s columns copied from PL-05 and PL-10 (hook, proof, payoff, lockup, with %), or add a pointer line under the table." }
  FIXED: P01 §2.3 table now has 5 s and 10 s columns copied from P08 PL-05/PL-10 (tagged extrapolated), plus resolution splits and climax positions for them.

- { id: C30, type: inconsistency, severity: S3, file: "guidelines/07-short-5-15-second-motion-ad.md §8",
    issue: "It says platform UI covers '≈49 % of 9:16 height (top 14 % + bottom 35 %)'. The strict safe band in P02 §4.7 (y 270-1210 of 1920) leaves the top 14 % and the bottom 37 %, which is 51 %.",
    fix: "Write 'top 14 % + bottom 37 % (≈51 %): keep meaning inside y 270-1210 (P02 §4.7)'." }
  FIXED: Guideline 07 §8 now: Reels UI top 14 % + bottom 35 % [N]; strict band leaves out top 14 % + bottom 37 % (~51 %), keep meaning inside y 270-1210 (P02 §4.7).
