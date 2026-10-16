# CRED v6.4 against the reference, and what v6.5 changes

Reference: CRED's own "The more you know | CRED money" (69 s, 24 fps). Ours: the CRED IndusInd RuPay card film v6.4
(30 s). Compared frame by frame (strips every 0.25 s and 0.5 s), with motion measured per half second (mean absolute
frame difference at 240x135) and scene cuts detected the same way on both. No reference frames are kept in this repo.

## The opening, 0–8 s

| | Reference | v6.4 | v6.5 |
| --- | --- | --- | --- |
| Blank paper before the first stroke | 0.5 s (7 of 12 frames still) | none | 0.5 s, with a slow breathe-in |
| Lines | drawn one at a time from the left edge, 0.5–3.0 s; thick, tapered, straight then waving | 13 at once in 0.4 s, full width, even weight | 8 pen strokes, 0.5–2.7 s, each straight while drawn, then waving |
| Scale-step to the fine field | 3.0 s | 1.08 s | 2.67 s, on the beat |
| Field closes into the disc | ~4.0 s; the disc is the white line field, colour washes in around it | 0.9 s; a flat lime disc slides in from the right | 3.5–4.7 s; white line disc on the left, yellow-green wash around it |
| Hero enters | a huge engraved branch sweeps in from the bottom right at 5.0 s; flowers burst; the bird lands at 7.5 s | small plants grow in a band; the fox walks a frieze at 4.5 s | an engraved bough sweeps in at 4.3 s; flowers burst 4.8–5.3 s; the fox runs in along it and stops to look around at 8 s |
| First words | ~13 s | 2.75 s | 7.3 s, under a flowering twig |
| Paper | fibres and a heavy vignette that lifts as colour arrives | flat | fibres and a vignette that lifts |
| Motion curve | still, then builds to peaks at 3 s and 5 s | flat from frame 0 | still, then builds |
| Micro-stop | none | lines frozen 0.5–0.92 s | none |

## The rest of the film

- Every reference hero performs (the bird lands and flaps, the turtle swims, the beam sweeps, the shell opens, fish
  cross). v6.5: the fox runs, stops and surveys; fish cross in front of the ₹0.
- Reference subjects pass in front of the words. v6.5: the twig's flowers cross the rewards headline; two fish cross
  the ₹0.
- The reference's loupe has a dark, soft rim. v6.5: softer, heavier rim on the card's loupe.
- Not changed, and why: the reference puts real app screens inside its worlds; we have no approved CRED card screens
  beyond the outro's, and inventing UI would invent claims. The reference ends dark; our white set is the card's
  own story. Transition variety (pixel mosaic, light-beam wipe) is a candidate for a later pass.

## Length

The opening needs the reference's time to read like it, so v6.5 is 96 frames (4 s) longer: 816 frames, 34 s. The
rest of the cut is unchanged and shifted; the score's cue sheet is retimed (`public/custom/cred-v6/cues.json`).

## The improvement loop (v6.5 rounds)

Each round: measure (`tools/ref_compare.py`, look metrics against the reference), compare real frames side by side,
fix the largest gap, commit.

| Round | Gap found against the reference | Change |
| --- | --- | --- |
| 1 | The opening barely moved (median motion 3.9 vs 12.8): the reference's line field flows and its illustration layer always drifts | Faster line flow, steady camera drift and push, more sway |
| 1 | The card's loupe close-up magnified one blossom into blobs | The print gets its own framing (flowers under the strip, the fox along the bottom) and finer line work |
| 1 | Travel: a box hotel, a lamp post through the headline | Lantern hero with a sweeping beam of light (the reference's lighthouse device on our subject), receding lanterns |
| 1 | Shell: mostly empty grey | Seabed rocks and kelp fronds fill the frame |
| 2 | Lines went coarse and zebra-like in close-ups; pure ink on white | Finer pitch held per framing, a pale tint under the lines (`ENGRAVE_FINE`) |
| 2 | Low-poly fox facets | Smooth normals on skinned meshes |
| 2 | The bough read as a smooth blade | Ridged bark, burls, a second limb crossing in an X |
| 2 | The pixel-mosaic dissolve and mottled grounds were missing | Mosaic into the shell world in our palette; mottled paper |
| 2 | Lanterns floated; an endless floor looked like a game | Cut-out rock islands, as the reference stands its lighthouse on a rock |
| 3 | Products was a casual three-quarter view | A frontal temple: framing columns, guilloche rosette wall, holographic glass panels over plinths |
| 4 | The user: "not even 70% close"; transitions were dissolves, mosaics and floods the reference never uses | Hard cuts on the beat inside a persistent loupe; iris opens and closes; lens-edge sweep; mosaic and flood removed |
| 5 | The user: trees and fox "still look 3D"; the travel hotel shot didn't work | Flat plate with an inked contour (`ENGRAVE_FLAT`); travel rebuilt as an engraved hot-air balloon (fox in the basket) over a globe |
| 6 | The user: jerks between scenes; sampled stills hid them | `tools/jerk_qa.py` on every frame: eased the bough's expo-out, kept the lens through cuts, started the crane and iris on the cut, fixed a black flash before the lockup, slowed the phone push |
| 7–9 | The intro still didn't read like the reference | Frame-matched side by side: thin parallel S-wave pen bundle with a pull-back, a bold field, grey paper, a close bough with dark hatched olive bark and lavender edge clusters |
| 10 | The temple was too sparse | Rosette wall panels, framing columns, a row of plinths with glass panels |
| 11 | The score was thin | Cinematic score (92 BPM, D) with an event per cut, from `public/custom/cred-v6/sound.json` |

## The final cut

The user cut round 11 in an editor (`showcase/cred-v65/`): the pen-stroke opening trimmed to 0.8 s, the earlier
three-quarter colonnade used for products, and their own music and effects at −14 LUFS. Read against round 11
frame by frame, everything else is the render, cut for cut.

Still weak, honestly: the fox is a low-poly model, and the blossoms read as clusters, not single flowers. Both
need better source models, not more shader work.
