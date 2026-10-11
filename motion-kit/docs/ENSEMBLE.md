# Ensemble: every tool as one team

`src/ensemble/` turns the installed tools into layers that share one look, one paper and one score, so they can hand a
shot to each other without the seams showing.

## What makes them blend

| Shared thing | Where | Why |
| --- | --- | --- |
| Look (paper, ink, washes, line weight, grain, seed) | `look.ts` | every layer draws in the same ink family; worlds are graded into each other in OKLab (culori) |
| Seeded randomness and noise | `rng.ts` | the same frame always draws the same picture (chunked renders match); "boil" on twos for hand-drawn life |
| Geometry | `paths.ts` | one point format for every tool; draw-on by arc length, offsets, booleans, morphs |
| Score | `score.ts` + `beats.*.json` | cues snap to the onsets meyda finds in the mix; tight springs |

## Layers and the tool behind each

| Layer | Tool | Use it for |
| --- | --- | --- |
| `Paper` | SVG turbulence | ground + grain under everything |
| `Pen`, `PenPaths` | perfect-freehand (+ svg-path-properties via `trim`) | ink lines with pressure, drawn on |
| `Sketch`, `SketchPaths` | roughjs | hachure shading, sketchy outlines |
| `Wash` | p5.brush | watercolour fills, hatching, pencil |
| `Field` | canvas + simplex-noise | the engraved line field, speed lines |
| `Contours` | d3-contour + simplex-noise | terrain, sea rings, map relief |
| `MorphShape` | flubber | shape-to-shape match cuts |
| `Ribbon` | bezier-js | engraved bands with true parallel offsets |
| `Matte` | polygon-clipping (`union`, `diff`, `mpD`) | wipes, irises, slab mattes |
| `Globe` | topojson-client + world-atlas | pen-drawn globe with real coastlines |
| `PenType` | opentype.js (Lexend, OFL) | copy uncovered by a pen nib, in the shared ink |
| `Solids` (`iso.tsx`) | p5.brush + roughjs + perfect-freehand + polygon-clipping | isometric objects: wash, hatch, ink; hidden lines removed with silhouette masks |
| three worlds | three.js / R3F | the photographic card in the studio |
| `tools/beats.mjs` | meyda | onset map of the mix, read by `score.ts` |
| `smoothD` | d3-shape | smooth curves through points |

Left out on purpose: `@lucasmarkes/hairline` runs on its own clock and answers a pointer, so it cannot be driven frame
by frame without rewriting it, and its isometric SaaS figures do not belong in this film.

## CRED v5, shot by shot

| Frames | Shot | Tools working together |
| --- | --- | --- |
| 0-40 | one pen line, scale-step to five | perfect-freehand, svg draw-on |
| 40-86 | the line field grows in, ink graded grey to teal | canvas field, simplex-noise, culori |
| 72-104 | a disc opens the parcel world | polygon matte, d3-contour ground, p5.brush |
| 88-150 | bag, parcels, gift, tin, ball drop on the mix onsets; "5% rewards on online shopping" | meyda onsets, Solids (p5.brush + roughjs + perfect-freehand + polygon-clipping), opentype |
| 150-207 | the frame matte morphs into the card; the world becomes its print; engraved bands; official logo | flubber, bezier-js, p5.brush shadow, official logo file |
| 207-290 | dive into the band; its lines become the field; the pen draws a lens | CSS camera, canvas field, perfect-freehand |
| 282-392 | inside the lens the travel world opens; globe, routes from India on the onsets; suitcase; "redeem on flights, hotels" | topojson/world-atlas, great-circle arcs, meyda, Solids, opentype, d3-contour |
| 381-392 | three card slabs sweep the products world in | polygon-clipping union matte |
| 392-484 | still life on plinths; the line field returns; "and 2,000+ products on CRED store" | Solids, canvas field, p5.brush ground wash, opentype |
| 484-561 | the plinth top morphs into the card; "zero joining fee"; whip into speed lines | flubber, canvas field |
| 561-645 | the studio opens through an iris | polygon matte, three.js |
| 630-645 | an ink blot floods the frame | p5.brush |
| 645-720 | lockup | official logo file, unmodified |
