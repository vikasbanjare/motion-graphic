---
name: art-director
description: Think like an art director before any storyboard. Turns a product and its facts into an out-of-the-box but on-message concept using research-backed creativity methods (Goldenberg's creativity templates, Phillips & McQuarrie visual rhetoric, Koestler bisociation / Fauconnier-Turner blending), a kill list of category clichés and a scoring gate. Use whenever the user asks for a storyboard, a concept, a "creative" or "out of the box" film, or a video "like" a reference that is unusually inventive (e.g. CRED Money). Always run before brand-film step 4 (script).
---

# Art director: concept before craft

Read this before writing any storyboard. Append to it as you learn (never rewrite the history section). The research
behind it is in `docs/research/creative-ideation.md`; the measured craft rules are in `docs/research/pro-film-rules.md`
and `docs/research/cred-money/BUILD-SPEC.md`.

## 0. Why this exists (what went wrong before)

Our CRED films got worse after v2 because we built from habit instead of an idea:
- **v1:** abstract line art, no subject.
- **v3:** literal benefit icons: a bag, a plane, a shelf.
- **Night films:** clip-art versions of one metaphor each.

The one the user liked (v2, the loupe to the 3D globe) worked because it had a world and a camera that travelled through it.

A concept is not a style. "Engraved" is a style; "your money is a living world you look at through a loupe" is a concept.

## 1. Anatomy of the reference (CRED Money): what to learn, not copy

- **One governing metaphor:** money is a world. The banknote's engraving is a landscape you can enter. Every benefit is a place in that world (flowers, sea, lighthouse, columns), not an icon.
- **One instrument:** the loupe. "Take a good look at your money" is literally what the camera does. The product's verb (analyse, track, see) is the film's camera move.
- **Material truth:** the world is made of the product's own material: currency engraving, guilloche and the security thread. Nothing is borrowed from another category.
- **Transitions are metaphors:**
  - lens swaps change worlds;
  - a pattern becomes architecture;
  - a world turns out to be printed on the object.
- **Restraint:** one ink per world, foil rationed, few cuts, long takes.
- **The ending pays off the metaphor:** the engraved money becomes a real 3D note entering the phone.

## 2. The method (do every step, write the outputs down)

1. **Single-minded proposition.** Write one sentence the film must leave behind (e.g. "this card turns everyday spending into things you love, for free").
2. **Native material and native verb.**
   - What is the product physically made of, or what does it print or touch? Card, chip, foil, emboss, receipt, statement, ledger.
   - What does it do? Pay, reward, unlock, travel, collect.
   - The best concepts are built from these, not from stock imagery.
3. **Generate at least 30 ideas, fast, in four families.** Keep the strongest 5.
   - **A. Creativity templates** (Goldenberg, Mazursky & Solomon 1999; names as recalled, see the research file for sourcing). For each, write 3 ideas.
     - **Pictorial analogy / replacement:** the card replaces something that symbolises the benefit (the card as a boarding pass, a key, a passport stamp).
     - **Extreme situation:** the benefit taken to an absurd extreme (5% back measured in a mountain of tiny objects).
     - **Consequences:** show what happens after (the trip, the gift unboxed), not the payment.
     - **Competition:** the card against something it beats (a fee that never arrives).
     - **Interactive experiment:** the viewer is invited to do something (pause, look closer, find the hidden 0).
     - **Dimensionality alteration:** change time or scale: years in seconds, microscopic or giant.
   - **B. Visual rhetoric** (Phillips & McQuarrie 2004). For the hero transformation choose:
     - **fusion:** two things become one object;
     - **replacement:** one stands in for the other, the most demanding and memorable;
     - **juxtaposition:** side by side, only for comparisons.
     - Prefer "source shown in the target's context" replacements (van Enschot et al. 2023: most fluent and pleasing).
   - **C. Bisociation and blending** (Koestler 1964; Fauconnier & Turner 2002).
     - Collide the card's frame with an unrelated frame: tide, orchestra, origami, constellation, bonsai, typewriter, weather, a museum, a mint, a garden, a train timetable.
     - Run the blend: composition (what maps to what), completion (what the blend implies) and elaboration (run the scene).
     - Keep only blends whose emergent idea is the proposition.
   - **D. The reference's devices** (from BUILD-SPEC). Use them as transitions, never as subjects:
     - lens swap;
     - pattern becomes world;
     - world printed on the object;
     - one long camera move per beat;
     - matte wipe by a foreground object.
4. **Kill list: never use these unless subverted.**
   - A card swiping a terminal.
   - Money or coins raining.
   - Shopping bags flying.
   - A phone with app UI as the hero (it's fine as the ending).
   - A globe spinning by itself.
   - Generic confetti.
   - Icons in a row.
   - "Benefit, icon, next benefit" slideshows.
   - A literal price tag.
   - Any composition from the reference.
5. **Score the 5 survivors** (0–3 each; keep only ideas scoring 16+ out of 21):
   - **ownable:** no other card brand could run it;
   - **one-sentence:** it can be told in one sentence;
   - **every benefit lives inside the metaphor:** no detour slides;
   - **a camera journey exists:** one continuous move or a chain of motivated transitions;
   - **hero transformation:** fusion or replacement, not juxtaposition;
   - **ending pays off the metaphor and lands the card;**
   - **buildable at quality** with our pipeline: 3D engraving shader, CC0 scans, Remotion, or a priced AI plate.
6. **Storyboard only the winner(s).** Per beat, write:
   - time;
   - camera (move, lens, speed);
   - subject;
   - material and look;
   - transition and the metaphor it carries;
   - on-screen copy (facts only);
   - sound (motivated);
   - the reference rule it uses.

   Also draw a thumbnail sheet (rendered stills) before building motion.
7. **Gate before delivery.** A film is not done until all three pass:
   - the reference scorecard (`docs/research/cred-money/scorecard/score.py`) against the reference;
   - a side-by-side frame review against the reference's matching shot types;
   - `tools/film_qa.py`.

   "Passes film_qa" alone means nothing.

## 3. Craft defaults for this brand family (from the measured research)

- **Look:** engraved line screen at 45° and about 0.0065 of frame height. One duotone per world. Paper and grain. Foil only on the hero, at most 15% of pixels.
- **Camera:** asymmetric curves, about 0.4 s ease-in and about 1.2 s settle, holds that drift, and on 125 BPM the big moves peak on beats.
- **Lens:** a vignette only, with no distortion; R50 at about 0.83 of frame height.
- **Type:** lowercase high-contrast serif (stand-in Newsreader for Cirka) plus a geometric sans subline (Lexend for Gilroy), with a travelling sheen.
- **3D:** use `src/custom/cred/v2/three.tsx` with the engraving material. Render in chunks with a fresh browser per chunk (long renders stall WebGL), using `--gl=swangle`.
- **Music:** choose freely per concept. Synthesised score (`v2/audio/cred_score.py`), a new recipe, or a licensed or open-model track. Match the concept, not habit.

## 3b. Rules added from 2024–2026 research (see `docs/research/creative-ideation.md` sections 7–13)

Apply these on top of section 2. The older methods stay as the reference frame; these steer the choices.

1. **Match the metaphor type to the distance of the blend (Huang 2024).** Close ideas (card × chip, card × numerals) become **contextual fusions**: the fused object lives inside a believable world. Far ideas (card × constellation) stay **simple fusions**, uncluttered, or they stop being understood.
2. **Originality must carry information (Khan et al. 2024; Rosengren et al. 2020).** Every beat reads its fact muted, on first viewing. If the metaphor hides the benefit, change the metaphor, not the fact.
3. **One fluent device per film (System1 "Cost of Dull", 2024–25).** A recurring motif that returns in every beat (the loupe, the glowing line, the split light), plus one moment of delight. Half of all ads leave people feeling nothing; those need 2–2.6× the media. Dull is the failure mode to fear, not "too strange".
4. **The medium is the idea (D&AD 2025 Black Pencil "Spreadbeats"; Cannes 2025 Film Craft Grand Prix, Telstra stop-motion).** Build the film out of the product's own materials and tools. For a card: chip, emboss, foil, guilloche, receipt. Tactile beats glossy.
5. **Diorama and hybrid 2D/3D are current, not dated (2026 trend commentary).** A whole world in one object, and flat print turning into 3D, are exactly the devices the user liked. Use them deliberately.
6. **Generate wide, filter hard, pick distant frames (AI-ideation research 2024–25).** Fluent idea generation converges on safe, similar ideas; the night films proved it. Force at least 10 distant frames in step 3C before scoring.
7. **Music is part of the device.** Choose or make it per concept; never reuse a bed across films.

## 4. Idea log (append; never delete)

- 2026-10-10:
  - **Liked:** v2's loupe close-up to the 3D route-map globe tilt-up.
  - **Disliked:**
    - v2's opening (random parcels);
    - v3's literal icons and slow pace;
    - the night films (flat clip art, no 3D, no world).
