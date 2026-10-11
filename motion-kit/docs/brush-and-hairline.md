# p5.brush and hairline in motion-kit

Two drawing libraries added on 2026-10-11, both installed as regular dependencies of `motion-kit`.

## p5.brush (`p5.brush`, standalone build)

Natural media in a WebGL2 canvas: pencils (`2B`, `HB`, `2H`, `cpencil`, `pen`, `rotring`), `spray`, `marker`, `charcoal`,
watercolour `fill` with `fillBleed` and `fillTexture`, `hatch` inside any shape, and vector fields that bend strokes.

Why it matters here: it is the first tool in the kit that draws a *painted* surface rather than a line screen. The
engraved-illustration films (CRED v2D) reach their limit at hatching over a tone wash; p5.brush can lay watercolour
fills and pencil hatching over masks, which is the look the user's reference sheet has.

How it is used (see `src/custom/lab/BrushTest.tsx`, composition `LabBrush`):

- Import the standalone build, not the p5 one: `import * as brush from "p5.brush/standalone"`. No p5 dependency,
  no draw loop of its own. Type declarations live in `src/custom/lab/p5-brush.d.ts` (the package ships none).
- Every frame: `brush.load(canvas)`, `brush.seed(n)`, `brush.noiseSeed(n)`, `brush.clear(paper)`, draw, `brush.render()`.
  Re-seeding each frame makes the picture a pure function of the frame number, so chunked renders and re-renders
  match. Verified under `--gl=swangle` in the headless renderer.
- The canvas origin is the centre: `brush.push(); brush.translate(-W/2, -H/2)` to work in top-left pixels.
- `brush.scaleBrushes(5)` for a 1080p canvas, confirmed visually; `brush.angleMode(brush.DEGREES)` before `hatch`.
- Hatch brush is chosen with `brush.hatchStyle(name, color, weight)`; `brush.hatch(dist, angle, options)` then applies to
  the next shapes until `brush.noHatch()`.
- Known detail: `brush.circle(x, y, r)` takes a radius.

Next step when a film needs it: render object masks (ids) from the three.js world, then fill and hatch each mask with
p5.brush in the world's ink, and composite over the paper. Type, foil band, card and lockup stay as they are.

## hairline (`@lucasmarkes/hairline`)

Thirty-three isometric line figures (tray of cards, pillars, exploded window, dot matrix, conveyor, turntable, keyboard,
laptop, terminal, vault, padlock, plug, call stack, ...) that answer the pointer. React components under
`@lucasmarkes/hairline/react`, or `figure(element, options)` for any DOM. Six CSS custom properties set the plate,
highlight, edge, mid and low inks and the stroke width.

Why it matters here: ready-made isometric wireframe subjects in one consistent hairline style, good for SaaS, dev-tool
and fintech explainers in the studio and on the web.

Limits for film renders: the figures run on their own clock (`performance.now()`) and on pointer input, so inside a
Remotion render they are not deterministic frame to frame. `play: true` loops a figure on its own, which is fine for the
studio UI and web pages. To put one in a rendered film, drive it: capture it to a canvas per frame with the pointer
position computed from the frame, or port the figure's geometry into a Remotion component. Not done yet.
