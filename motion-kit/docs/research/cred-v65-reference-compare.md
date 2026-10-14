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
