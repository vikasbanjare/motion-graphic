# Tool registry

Every tool here was license-checked on npm on 2026-10-11 and is installed as a package (not copied into our source),
so updates keep working and each author's notice travels with the package. MIT, ISC, Zlib, BSD and Apache-2.0 all allow
commercial use; the duty is to keep the copyright and license notice with any copy we ship.

## Installed

| Package | License | What we use it for | Frame-deterministic in a render? |
| --- | --- | --- | --- |
| three, @react-three/fiber, @remotion/three | MIT | the 3D worlds | yes |
| p5.brush (standalone) | MIT | watercolour washes, pencil strokes, hatching: the painted pass | yes, re-seed every frame |
| d3-contour | ISC | traces each object's mask into polygons for the painted pass | yes |
| perfect-freehand | MIT | pressure-sensitive pen strokes (the opening's pen) | yes |
| flubber | MIT | shape-to-shape morphs for match-cut transitions | yes |
| culori | MIT | colour mixing in OKLab for grades between worlds | yes |
| simplex-noise | MIT | seeded noise for wobble, paper, drift | yes, with a seeded RNG |
| polygon-clipping | MIT | union / intersect / difference of masks | yes |
| d3-shape, d3-interpolate | ISC | curves, arcs, easing helpers, value interpolation | yes |
| opentype.js | MIT | glyph outlines (engraved type, type that morphs) | yes |
| svg-path-properties, bezier-js | ISC, MIT | sampling and measuring paths by arc length | yes |
| roughjs | MIT | sketchy hand-drawn shapes | yes, with a fixed seed |
| maath | MIT | damping, easing and vector helpers | yes |
| meyda | MIT | audio analysis (beats, onsets) to sync cuts to the mix | offline, yes |
| @lucasmarkes/hairline | MIT | isometric line figures for SaaS and dev-tool pieces | no: own clock and pointer; drive it per frame first |
| topojson-client, world-atlas | ISC | land masks for globes and maps | yes |

## Checked and left out

| Package | Why |
| --- | --- |
| gsap | its own "standard no charge" license, not MIT; also runs on its own clock |
| lygia (shader library) | Prosperity + Patron license: not free for commercial work |
| @theatre/studio | AGPL; the Apache-licensed core alone is not needed |
| animejs, motion, lottie-web | MIT, but they own time; Remotion already drives every frame |

Remotion itself is not MIT: it is free for individuals and companies of up to three people; larger companies need a
company license (see remotion.dev/license).

## Reference corpus

`research/opus55-prompts/` holds 513 prompts for code-made motion videos (MIT, credited). Its digest is
`research/opus55-prompts/DIGEST.md`.

## CRED film: which tool does what, shot by shot

| Shot | Frames | Tools | Why |
| --- | --- | --- | --- |
| 1-3 opening strokes and field | 0-72 | perfect-freehand for the pen strokes (pressure), canvas for the field | the reference's pen has varying weight; SVG strokes are uniform |
| 4 wash and disc | 72-86 | culori for the grade, canvas field | one continuous grade, no colour switch |
| 5 parcel world | 86-150 | three.js engraving + id masks, d3-contour, p5.brush washes and pencil | the painted surface of the user's sheet |
| 6 card reveal | 150-207 | same painted world printed on the card, CSS 3D | the world is the card print |
| 7-8 loupe macro, tag | 207-290 | three.js tag world, p5.brush wash on the tag | keep the foil band crisp over a painted tag |
| 9-10 map, travel world | 290-381 | three.js + painted pass, flubber for the lens-to-world morph | match-morph instead of a dissolve (digest rule 1) |
| 11-12 products | 381-484 | three.js still life + painted pass | painted objects, crisp docket and type |
| 13 cartouche | 484-561 | SVG rosette, painted card | unchanged |
| 14 studio | 561-645 | physical card render | the real product stays photographic, not painted |
| 15 lockup | 645-720 | official logo file, unmodified | brand rule |
| sound | all | meyda checks hits against cut frames | sync check |
