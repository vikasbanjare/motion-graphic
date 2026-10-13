# Code-driven motion graphics: tools and techniques, 2026-04-13 to 2026-10-13

Research for `paperboil/`, a Remotion 4.0.535 cut-paper collage ad rendered headless with `--gl=angle`.
Compiled 2026-10-13. Nothing in `/home/user/motion-graphic` was changed.

## How dates were checked

- **npm publish times** (`npm view <pkg> time`) for every package version cited.
- **Remotion:** I made a sparse, blobless clone of `remotion-dev/remotion` (HEAD `36adb0a77`, 2026-10-13). Each `<AvailableFrom v="4.0.x">` tag in the docs was mapped to its npm publish date, and `git log --diff-filter=A` gave the date each effect file was added.
- **Other repos:** git history of clones of `paper-design/shaders`, `heygen-com/hyperframes`, `Remocn/remocn`, `remotion-dev/html-in-canvas` and `yihui-dev/awesome-opus5-5-videos`.
- **X/Twitter posts:** dates are decoded from the snowflake IDs of posts linked in the awesome list.
- **Smoke test:** I rendered a still in a throwaway project in the scratchpad, using paperboil's `node_modules`. The chain was `CanvasImage` → `roughenEdges` → `paper` → `dropShadow` → `chromaticAberration` → `tear`, plus `lightLeak` on a `Solid`. The output is at `scratchpad/research/smoke/out/smoke2.png`. Findings:
  - Remotion could not download its own Chrome build because the host `remotion.media` is unreachable from this sandbox. As a result, `HtmlInCanvas` could not be tested here.
  - I used the Playwright Chromium 141 binary with `--chrome-mode=chrome-for-testing`. With `--gl=angle` it failed with "Failed to acquire WebGL2 context" because the sandbox has no GPU. With `--gl=swangle` (SwiftShader) it rendered correctly.
  - The torn zigzag from `tear()`, the rough edges, the paper grain and the RGB fringe were all visible.

### Headless and network flags used in this report

| Flag | Meaning |
|---|---|
| **[NET]** | Needs network access at render time |
| **[GPU]** | Needs a real GPU or a WebGPU feature that a headless or GPU-less box may lack |
| **[HIC]** | Needs HTML-in-canvas. This works only in Remotion's bundled Chrome (149+ with the flag on). It does not work with a stock `chrome-headless-shell` set through `REMOTION_BROWSER_EXECUTABLE`, which `paperboil/README.md` suggests as a fallback |
| **[LIC]** | Licence is not standard open source |

---

## 1. Remotion releases (86 npm releases in the window: 4.0.449 on 2026-04-20 to 4.0.535 on 2026-10-12)

Remotion licence: the "Remotion License". It is free for individuals and companies with 3 or fewer employees; larger companies need a company licence. `@remotion/effects` ships with `"license": "UNLICENSED"` and is covered by the Remotion License **[LIC]**. `@remotion/gsap` is MIT.

### 1.1 `@remotion/effects`: a new package, created entirely inside the window

- URL: https://www.remotion.dev/docs/effects/api · source: `packages/effects/src`
- Dates: first commit 2026-04-30. Public in **v4.0.464 (2026-05-20)**. New effects were added through **v4.0.526 (2026-09-17)**.
- What it does: a chain of WebGL2, 2D and WebGPU effects passed through an `effects={[...]}` prop. It works on these components:
  - `<Solid>`, `<CanvasImage>` (v4.0.466, 2026-05-25), `<Img>`, `<HtmlInCanvas>`, `<Video>`
  - `@remotion/shapes` primitives
  - `<RemotionRiveCanvas>`
- Effects are deterministic and seeded, and alpha is preserved.

The effects that matter for a paper and print look:

| Effect | Version (date) | Use |
|---|---|---|
| `paper()` | 4.0.486 (2026-07-07) | Grain, fibres, crumples, folds, specks. It is a port of Paper Shaders' paper-texture **v1**. paperboil already uses it on a `<Solid>` |
| `roughenEdges()` | 4.0.487 (2026-07-09) | Noise-displaced alpha boundary. This gives a GPU torn edge on any cut-out |
| `tear()` | 4.0.523 (2026-09-09) | Rips the layer along a zigzag seam. The two halves rotate outward. Params: `progress`, `angle`, `rotation`, `jaggedness` |
| `halftone()` | 4.0.467 (2026-05-26) | Dots, squares or lines, with colour modes, rotation and offset |
| `halftoneLinearGradient()` | 4.0.469 (2026-05-29) | Graded halftone wipe |
| `duotone()` | 4.0.468 (2026-05-27) | Two-ink mapping of photos (archive-print look) |
| `chromaticAberration()` | 4.0.467 | R/B split. Use as a misregistration stand-in |
| `xyTranslate()` / `uvTranslate()` | 4.0.467 | Per-layer offset for a manual plate shift |
| `dropShadow()` | 4.0.469 (2026-05-29) | Blurred shadow that follows the alpha (cut-out lift) |
| `noise()`, `speckle()`, `whiteNoise()` | 4.0.469 / 4.0.470 | Grain, pinholes, dust |
| `emboss()` | 4.0.479 (2026-06-17) | Raised-line relief, letterpress bite |
| `burlap()`, `flannel()` | 4.0.478 / 4.0.491 | Woven textures for craft layers |
| `noiseDisplacement()` | 4.0.474 (2026-06-08) | Local wobble or ink-bleed warp |
| `evolve()` | 4.0.470 | Directional reveal with a feathered edge |
| `lightLeak()` | 4.0.500 (2026-07-27) | Procedural light leak driven by `progress` |
| `starburst()` | 4.0.500 | Sunburst rays. Could replace the hand-built rays in `Backdrop.tsx` |
| `lut()` | 4.0.526 (2026-09-17) | Inline `.cube` LUT for a final print or film grade |
| `colorCorrection()`, `levels()`, `exposure()`, `whiteBalance()`, `vibrance()`, `shadowsHighlights()` | 4.0.508–4.0.509 (2026-08-11/12) | Grade per layer |
| `vignette()` | 4.0.468 | |
| `outline()` | 4.0.515 (2026-08-21) | Die-cut sticker border that follows the alpha |
| `createEffect()` (public) | 4.0.479 (2026-06-17) | Write your own GLSL effect with backend `'webgl2' \| '2d' \| 'webgpu'` |

Integration recipe. paperboil already depends on `@remotion/effects@4.0.535`, so no install is needed.

```tsx
import {CanvasImage, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {roughenEdges} from '@remotion/effects/roughen-edges';
import {paper} from '@remotion/effects/paper';
import {dropShadow} from '@remotion/effects/drop-shadow';
import {outline} from '@remotion/effects/outline';
import {tear} from '@remotion/effects/tear';

// One cut-out piece. The canvas must be padded by at least the shadow radius plus offset,
// or the shadow is clipped (seen in the smoke test).
export const PaperPiece: React.FC<{src: string; w: number; h: number; seed: number; ripAt?: number}> = ({src, w, h, seed, ripAt}) => {
  const f = useCurrentFrame();
  const twos = Math.floor(f / 2) * 2;               // edge "boil" on twos
  const boilSeed = seed + ((twos / 2) % 3) * 17;     // cycle 3 edge states, like hand-cut replacement animation
  return (
    <CanvasImage src={staticFile(src)} width={w} height={h} effects={[
      outline({/* white paper core, 3–5 px, colour #fbf7ee */}),
      roughenEdges({border: 8, scale: 0.06, seed: boilSeed}),
      paper({amount: 0.55, colorFront: '#d9ccb2', colorBack: '#ffffff', fiber: 0.35, folds: 0.15, seed}),
      dropShadow({radius: 10, offsetX: 3, offsetY: 7, opacity: 0.32, color: '#2a1d10'}),
      ...(ripAt !== undefined ? [tear({progress: interpolate(f, [ripAt, ripAt + 10], [0, 1.4], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', posterize: 2}), jaggedness: 14, rotation: 12})] : []),
    ]} />
  );
};
```

Notes:
- `paper()` defaults to `colorFront: '#9fadbc'`, which tints grey (visible in the smoke test). Set warm colours explicitly.
- Effects need WebGL2. `--gl=angle` works on a GPU host. With no GPU, use `--gl=swangle`; this was verified in the smoke test.
- Effects are grouped by backend, and every WebGL effect costs a GL pass. Budget roughly 4–6 effects per piece, and render a fixed texture layer once on a full-frame `<Solid>`.

### 1.2 `<HtmlInCanvas>`: apply effects to live DOM and SVG (v4.0.455, 2026-05-01)

- URL: https://www.remotion.dev/docs/remotion/html-in-canvas · examples: https://github.com/remotion-dev/html-in-canvas (created 2026-05-01, last commit 2026-05-03; no LICENSE file in the repo)
- What it does: draws a live DOM subtree (your existing SVG collage, type and `feTurbulence` edges) into a canvas. You can then run `effects={[...]}` or your own `onPaint` 2D, WebGL or WebGPU code over it.
  - Crop props were added in 4.0.500.
  - `pixelDensity` was added in 4.0.472.
  - Nesting is supported in SSR from 4.0.534 (2026-10-07; Chromium 157).
- Why it matters: it is the only way to put `paper()`, `halftone()` or `lut()` over an entire SVG shot without rasterising assets first.
- Risk **[HIC]**:
  - It needs Remotion's own Chrome build, which has the flag enabled. Remotion downloads it from `remotion.media`; that host is blocked in this sandbox.
  - A stock `chrome-headless-shell` set through `REMOTION_BROWSER_EXECUTABLE` will not work.
  - Studio preview needs Chrome 149+ with `chrome://flags/#canvas-draw-element`.
  - The API is experimental in Chrome.

```tsx
import {HtmlInCanvas} from 'remotion';
import {paper} from '@remotion/effects/paper';
import {lut} from '@remotion/effects/lut';
import cube from './grade/riso-warm.cube?raw'; // or inline string

<HtmlInCanvas width={1920} height={1080} effects={[paper({amount: 0.35, colorFront: '#e8dcc2'}), lut({content: cube})]}>
  <Act1 />   {/* existing SVG collage, untouched */}
</HtmlInCanvas>
```

### 1.3 `@remotion/transitions` additions in the window

- Dates:
  - `dissolve()` and `ripple()`: 4.0.465 (2026-05-22)
  - `bookFlip()`, `crosswarp()`, `dreamyZoom()`, `linearBlur()` and `swap()`: 4.0.466 (2026-05-25)
  - `crossZoom()` and `filmBurn()`: 4.0.467
  - `zoomBlur()`, plus `makeHtmlInCanvasPresentation()` for custom shader transitions: 4.0.456 (2026-05-02)
  - `zoomInOut()`: 4.0.457
  - `pushCut()`: 4.0.500 (2026-07-27)
  - `blurSlide()`: 4.0.523 (2026-09-09)
- Relevant here:
  - `bookFlip()` is a shaded page turn and suits the paper style.
  - `filmBurn()` is a film-burn glow plus radial blur.
  - `pushCut()` is a punch-in hard cut with a flash frame and needs no WebGL.
  - `makeHtmlInCanvasPresentation()` lets you write a custom "paper tear" transition shader.
- **[HIC]**: `bookFlip`, `filmBurn`, `zoomBlur` and every custom HTML-in-canvas presentation carry the HTML-in-canvas warning. `pushCut` is DOM-only and safe.

```tsx
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {pushCut} from '@remotion/transitions/push-cut';
<TransitionSeries.Transition presentation={pushCut({flashColor: '#fff6e0', flashFrames: 1, incomingStartScale: 1.08})} timing={linearTiming({durationInFrames: 6})} />
```

Package: `npm i @remotion/transitions@4.0.535`. It is not yet in paperboil's dependencies.

### 1.4 `posterize` option on `interpolate()` and `interpolateColors()` (4.0.470, 2026-05-31)

- URL: https://www.remotion.dev/docs/posterization
- What it does: native on-twos or on-threes stepping, for example `interpolate(frame, [0, 24], [0, 1], {posterize: 2})`.
- It replaces hand-rolled `Math.floor(frame/2)*2` code, and Studio keyframe UI respects it. paperboil's 12 fps motion system (`src/motion`) can switch to it.
- Risk: none.

### 1.5 `@remotion/gsap`: `useGsapTimeline()` (4.0.517, 2026-08-25, MIT)

See section 4.

### 1.6 `@remotion/three`

- `<ThreeWebGPUCanvas>` (4.0.503, 2026-07-31): a WebGPU renderer through R3F, with TSL node materials. It falls back to WebGL2 when WebGPU is not available. **[GPU]**: headless WebGPU usually falls back, and the docs label it experimental.
- `<ThreeCanvas>` gained `<Sequence>` timing and premount props (4.0.528, 2026-09-24).

---

## 2. Shader libraries for paper and print looks

### 2.1 Paper Shaders: `@paper-design/shaders-react`

- URL: https://shaders.paper.design · https://github.com/paper-design/shaders
- Licence: **Apache-2.0 since v0.0.77**. The README commit "Update README with new license" is dated 2026-06-27. Earlier versions used a custom licence.
- Releases in the window: 0.0.75 (2026-04-13) to **0.0.81 (2026-09-17)**.
  - 0.0.81 is "Paper Texture 2.0": a three-colour scheme, image-to-paper `blending`, `distortion` so the image bends with the sheet, `clip`, light `angle`, straight `folds` grid lines, and laid-paper `roughnessRows`.
  - 0.0.79 added Lens Distortion (2026-08-07).
  - 0.0.78 added image-decode waiting and paused off-screen loops.
- Relevant shaders: `PaperTexture` (v2 is newer than Remotion's `paper()` port), `HalftoneCmyk` (C/M/Y/K screens with `gridNoise` for plate jitter, per-ink `flood` and `gain`, and grain), `HalftoneDots`, `ImageDithering`, `Dithering`, `GrainGradient`, `PerlinNoise`, `SimplexNoise` and `Voronoi`.
- Headless:
  - The noise texture is embedded as a data-URI, so there is no network fetch.
  - WebGL2 is required.
  - Image uniforms decode asynchronously, so wrap them in `delayRender`.
- Recipe:

```tsx
import {HalftoneCmyk, PaperTexture} from '@paper-design/shaders-react';
import {useCurrentFrame, useVideoConfig, delayRender, continueRender, staticFile} from 'remotion';

const RisoPhoto: React.FC<{src: string}> = ({src}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const [h] = React.useState(() => delayRender('img'));
  const [img, setImg] = React.useState<HTMLImageElement | null>(null);
  React.useEffect(() => { const i = new Image(); i.src = staticFile(src); i.decode().then(() => { setImg(i); requestAnimationFrame(() => continueRender(h)); }); }, []);
  if (!img) return null;
  return <HalftoneCmyk image={img} speed={0} frame={(Math.floor(f / 2) * 2) / fps * 1000}
           colorBack="#f3ead6" colorC="#00a0c6" colorM="#ff48b0" colorY="#ffe800" colorK="#1a1a1a"
           size={0.25} gridNoise={0.25} grainMixer={0.3} style={{width: 1920, height: 1080}} />;
};
```

  Always pass `speed={0}` and drive `frame` from Remotion. Never let the shader's rAF loop run.
- Risk: medium-low. Check that the WebGL canvas captures correctly. Remotion screenshots the page, which works with ANGLE or SwiftShader for WebGL2 canvases. If a frame comes out blank, set `webGlContextAttributes={{preserveDrawingBuffer: true}}`.

### 2.2 The `shaders` npm package (shaders.com)

- URL: https://shaders.com · licence: MIT (engine and components). Presets on the site have separate terms.
- Dates: 87 releases in the window, ending at 4.0.4 (2026-10-09).
- What it does: 200+ WebGPU-first effect components, with a design editor that exports the code.
- Risk **[GPU]**: built for WebGPU. Headless Chrome on ANGLE or SwiftShader may have no WebGPU adapter, and I did not verify a WebGL fallback. The time prop needs checking for determinism. This is the lowest priority item.

### 2.3 LYGIA

- URL: https://lygia.xyz
- Licence **[LIC]**: Prosperity (non-commercial) or Patron/commercial. **Do not use it in a paid ad without a commercial licence.**
- Dates: npm 1.4.1 (2026-02-07), before the window. It is listed only for completeness.

### 2.4 three.js postprocessing stack

- `postprocessing` 6.39.1–6.39.5 (2026-04-17 to 2026-09-09) and `@react-three/postprocessing` 3.2.0 (2026-10-10). Both MIT.
- Effects: Noise, ChromaticAberration, DotScreen, LUT3D, Vignette. Use these if you go the 3D route in section 3.

### 2.5 Techniques without a new library

These are plain GLSL or SVG, and all are deterministic if seeded from the frame.

- **Risograph misregistration:**
  1. Render the collage once per ink, either as separate SVG `<g>` groups or with `duotone()` per plate.
  2. Offset each plate by ±1–3 px with `xyTranslate()`. Re-pick the offset each *held* drawing (every 2 frames), not every frame.
  3. Combine the plates with `mix-blend-mode: multiply`.
  4. Add `halftone()` to the K plate only.

  This recipe comes from the techhalla prompt (posted 2026-09-25): "on accent frames only, duplicate text layer offset ±2–4px in magenta and acid green at 40%".
- **Ink bleed:** the SVG chain `feTurbulence` → `feDisplacementMap` (small scale) → `feGaussianBlur` → `feComponentTransfer` threshold. This is the "gooey" trick used by HyperFrames `ink-bleed-reveal` (2026-08-10). Apply it to type edges for a soaked-ink look.
- **Film grain:** a full-frame `<Solid>` with `noise({seed: twos})` and `mix-blend-mode: overlay` at 6–10%. Reseed only on twos so the grain boils in step with the animation.
- **Light leaks:** `lightLeak({progress, seed, hueShift})` on a `<Solid>` composited with `mix-blend-mode: screen`, at 1–2 moments only.

---

## 3. three.js / react-three-fiber paper cut-out 2.5D with real light

- Versions:
  - `three` r184 (2026-04-16), r185 (2026-07-01), r186 (0.186.x, 2026-09-24)
  - `@react-three/fiber` 9.6.0–9.8.1
  - `@react-three/drei` 10.7.8 (2026-08-05), 10.7.9 (2026-09-25)
  - All MIT.
- Relevant changes:
  - **r186 removed `PCFSoftShadowMap`.** It now warns and falls back to `PCFShadowMap`, which I verified in `WebGLShadowMap.js`.
  - `PCFShadowMap` honours `shadow.radius` with a Vogel-disk filter, so use that or `VSMShadowMap`.
  - drei 10.7.9 `<SoftShadows>` (PCSS) has been updated for the newer `sampler2DShadow` chunk.
  - r186 also added `SunLight` with cascaded shadows, `SSAONode` and `VXGINode` (WebGPU).
  - r185 added WebGPU Forward+.
- Why it matters: real directional light raking across paper normals, plus PCSS contact shadows that soften with height. This is the most convincing "physical collage under a lamp" look, and SVG `drop-shadow` cannot fake it.
- Recipe: `npm i @remotion/three@4.0.535 three@0.186.1 @react-three/fiber@9.8.1 @react-three/drei@10.7.9`

```tsx
import {ThreeCanvas} from '@remotion/three';
import {SoftShadows, useTexture} from '@react-three/drei';
import {useCurrentFrame, useVideoConfig, staticFile} from 'remotion';
import * as THREE from 'three';

const Cut: React.FC<{src: string; z: number; x: number; y: number; w: number; h: number}> = ({src, z, ...p}) => {
  const [map, normal] = useTexture([staticFile(src), staticFile('tex/paper-normal.png')]); // local files only
  return (
    <mesh position={[p.x, p.y, z]} castShadow receiveShadow>
      <planeGeometry args={[p.w, p.h]} />
      <meshStandardMaterial map={map} alphaTest={0.5} normalMap={normal} normalScale={new THREE.Vector2(0.4, 0.4)} roughness={0.95} side={THREE.DoubleSide} />
    </mesh>
  );
};

export const Diorama = () => {
  const f = useCurrentFrame(); const {width, height} = useVideoConfig();
  const t = Math.floor(f / 2) * 2;                       // camera on twos
  return (
    <ThreeCanvas width={width} height={height} shadows={{type: THREE.PCFShadowMap}} orthographic camera={{zoom: 120, position: [Math.sin(t / 90) * 0.4, 0, 10]}}>
      <SoftShadows size={18} samples={12} focus={0.6} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[-4, 6, 8]} intensity={2.2} castShadow shadow-mapSize={[2048, 2048]} shadow-radius={6} />
      <mesh receiveShadow position={[0, 0, -0.5]}><planeGeometry args={[40, 24]} /><meshStandardMaterial color="#efe6d2" /></mesh>
      <Cut src="cut/hill.png" z={0} x={0} y={-2} w={16} h={5} />
      <Cut src="cut/logo.png" z={0.35} x={0} y={0.5} w={6} h={3} />
    </ThreeCanvas>
  );
};
```

  - Use `useCurrentFrame()`, never `useFrame()`.
  - Separating layers by 0.1–0.5 units gives realistic shadow offset and parallax.
- Risk: medium.
  - Assets must be raster PNGs, or you rasterise the SVG cut-outs once in a build script.
  - Text needs `drei <Text>`, which fetches the font. **[NET]** unless you pass a local `font=` URL.
  - `<Environment preset>` downloads HDRIs from a CDN **[NET]**. Use local `files=` instead.
  - Avoid `<AccumulativeShadows>` unless `temporal={false}`: progressive accumulation depends on render history and is non-deterministic across Remotion's parallel tabs.
  - PCSS is GPU-heavy. On SwiftShader expect roughly 1–3 s per frame.

---

## 4. GSAP 3.15 and its plugins inside Remotion

- GSAP:
  - URL: https://gsap.com
  - Licence **[LIC]**: the GSAP "Standard no-charge licence". It is free for commercial use, including all former Club plugins since 3.13 (2025-04-30), but it is not OSI-licensed and bars building competing visual-builder tools.
  - Date: **3.15.0 on 2026-04-13**, the first day of the window. New in 3.15: `easeReverse`, which replaces `yoyoEase`.
  - I confirmed that the npm tarball contains `SplitText`, `MorphSVGPlugin`, `DrawSVGPlugin`, `CustomEase`, `CustomWiggle`, `CustomBounce`, `MotionPathPlugin`, `Physics2DPlugin` and `ScrambleTextPlugin`.
- `@remotion/gsap`:
  - Version: 4.0.517 (2026-08-25), MIT. URL: https://www.remotion.dev/docs/gsap
  - What it does: builds a *paused* timeline and re-seeks it from 0 to `frame/fps` on every frame, which makes it deterministic.
  - It blocks callbacks, tweens on plain objects, unseeded randomness and stray tweens.
  - The docs say: "The package does not support GSAP plugins yet". The source does not block plugin tweens that target DOM or SVG elements, though.
    - `drawSVG` and `morphSVG` should seek deterministically.
    - `SplitText.create()` inside the builder only makes DOM nodes, so it passes the stray-animation check.
    - Treat all three as **unofficial but plausible**, and test on a still before relying on them.
- Recipe: `npm i gsap@3.15.0 @remotion/gsap@4.0.535`

```tsx
import gsap from 'gsap';
import {SplitText} from 'gsap/SplitText';
import {DrawSVGPlugin} from 'gsap/DrawSVGPlugin';
import {MorphSVGPlugin} from 'gsap/MorphSVGPlugin';
import {useGsapTimeline} from '@remotion/gsap';
import {Freeze, useCurrentFrame} from 'remotion';
gsap.registerPlugin(SplitText, DrawSVGPlugin, MorphSVGPlugin);

const Headline: React.FC = () => {
  const scope = useGsapTimeline<HTMLDivElement>(({timeline, selector}) => {
    const split = SplitText.create(selector('[data-h]'), {type: 'chars', mask: 'chars'}); // fonts must be loaded first
    timeline.from(split.chars, {yPercent: 110, rotation: 6, duration: 0.5, ease: 'steps(6)', stagger: 0.04}) // stepped ease = on-twos feel
            .from(selector('[data-underline]'), {drawSVG: '0%', duration: 0.6, ease: 'power2.out'}, '<0.2')
            .to(selector('#blob'), {morphSVG: '#blob-target', duration: 0.8}, '<');
  });
  return <div ref={scope}>…</div>;
};
// Exact on-twos for the whole GSAP block: freeze its input frame.
const OnTwos: React.FC<{children: React.ReactNode}> = ({children}) => { const f = useCurrentFrame(); return <Freeze frame={f - (f % 2)}>{children}</Freeze>; };
```

- Risks:
  - SplitText measures glyphs. Load fonts first (`@remotion/fonts` plus `delayRender`), or the splits differ between tabs.
  - The timeline is re-sought from 0 every frame, so it gets slower with hundreds of tweens.
  - paperboil already has `flubber` (morphing) and `perfect-freehand`. MorphSVG mainly adds better point matching, and DrawSVG duplicates what `@remotion/paths evolvePath()` already does.
  - **Net value for paperboil: SplitText for mask-line type is the main win.**

---

## 5. Rive, Lottie and dotLottie

| Item | Date | Licence | Remotion route | Headless notes |
|---|---|---|---|---|
| `@rive-app/canvas` 2.44.2 (28 releases in the window); Rive Scripting went live 2026-01-13; Webflow and Rive data-binding integration 2026-04-17 | 2026-10-10 | MIT runtime | `@remotion/rive` `<RemotionRiveCanvas>` now takes `effects` (4.0.464) and crop props (4.0.500) | **[NET]**: `RemotionRiveCanvas.tsx` hard-codes `locateFile: () => 'https://unpkg.com/@rive-app/canvas-advanced@2.31.5/rive.wasm'`. An offline render fails unless you vendor the wasm and patch or fork. `enableRiveAssetCdn` must also be false |
| `@remotion/lottie` (lottie-web) | updated with each Remotion release | MIT | `<Lottie animationData={json} />` seeks to the frame | No network if the JSON is imported locally |
| `@lottiefiles/dotlottie-web` 0.71→0.81 (17 releases); dotLottie v2 adds theming, state machines and audio | 2026-10-06 | MIT | No Remotion wrapper. Use `new DotLottie({canvas, src, autoplay: false})`, then `setFrame(frame * lottieFps / fps)` per frame inside `delayRender` | **[NET]**: the WASM loads from `cdn.jsdelivr.net` or `unpkg.com` by default. Call `DotLottie.setWasmUrl(staticFile('dotlottie-player.wasm'))` and copy the wasm from `node_modules` into `assets/`. State machines are event-driven: drive inputs from the frame, never from timers |

Verdict for paperboil: low value. A cut-paper look comes from texture and edge treatment, not from vector rigs. Use Lottie only for imported AE-made micro-elements, after re-texturing them with `effects` (through `<HtmlInCanvas>` **[HIC]**).

---

## 6. Generative and texture libraries

| Name | URL | Date in window | Licence | Use |
|---|---|---|---|---|
| Paper Shaders | shaders.paper.design | 0.0.75–0.0.81 (to 2026-09-17) | Apache-2.0 (from 2026-06-27) | Paper Texture 2.0, HalftoneCmyk, grain (section 2.1) |
| `p5.brush` | github.com/acamposuribe/p5.brush | 2.2.1 (2026-07-12) to 2.2.3 (2026-09-20) | MIT | Already used. Upgrading within 2.2.x is low risk; the in-window releases are patch-level |
| `perfect-freehand` | github.com/steveruizok/perfect-freehand | 1.2.3 (2026-02-01, just before the window) | MIT | Already used |
| `@remotion/noise` | remotion.dev/docs/noise | follows Remotion releases | MIT | Seeded 2D/3D/4D simplex noise for edge tables and wobble |
| HyperFrames registry (HeyGen) | github.com/heygen-com/hyperframes | see section 7 | Apache-2.0 | Readable, deterministic HTML/GSAP recipes to port: `torn-paper-rip`, `paper-collage-reveal`, `ink-bleed-reveal`, `halftone-dissolve`, `grain-overlay` |
| Remocn | github.com/Remocn/remocn | first commit 2026-07-25, last 2026-10-11 | MIT | shadcn-style copy-paste Remotion components (transitions, backgrounds, a WebGL shader wrapper). Nothing paper-specific, but useful as a pattern library |
| ClawHub skill `paper-collage-remotion` (tobewin) | clawhub.ai/tobewin/paper-collage-remotion | v1.0.0, "updated 2 months ago" (about Aug 2026) | MIT-0 | Agent skill. Layer-role motion table (primary 78 px travel, start scale 0.86; secondary 58 px, 0.90 …) and a stacked `drop-shadow` die-cut outline. It relies on an image-gen step for its assets; the rest is usable |

---

## 7. Trending repos (motion and animation) in the window

GitHub's trending pages and API were not reachable from this sandbox. The list below uses stars and dates from repo clones and topic pages, not a live "trending" feed.

- **heygen-com/hyperframes**
  - What it is: "Write HTML. Render video. Built for agents."
  - Licence: Apache-2.0. npm `hyperframes` was created 2026-03-23 and was at 0.8.153 on 2026-10-13. About 60k stars on the GitHub animation topic page.
  - Dates: third-party write-ups give the open-sourcing as 2026-04-17 or 2026-07-01. Its registry added `grain-overlay` (2026-04-14), `ink-bleed-reveal`, `halftone-dissolve` and `halftone-field` (2026-08-10), `organic-light-leak-overlay` (2026-07-23), and `torn-paper-rip` and `paper-collage-reveal` (2026-09-28).
  - It is a competing renderer, not a Remotion plugin. Port the techniques, not the runtime.
  - `torn-paper-rip` technique:
    1. Build one edge table once from an LCG with a fixed seed: low-frequency wander plus per-vertex fibre jitter.
    2. Each frame, as a pure function of time, compute two `clip-path: polygon()` values:
       - the sheet;
       - a 6–14 px "paper core" rim in cream, kraft or white with `feTurbulence` grain multiplied over it.
    3. Lift the torn sheet on a growing `drop-shadow`.
    4. Ease with `power2.in` for the first 20% (the paper resists), then `power3.out`.
    5. Keep the filter and the clip on separate elements, or the shadow gets clipped.

    This maps directly onto paperboil's band wipe.
- **Remocn/remocn**: about 1–1.6k stars, MIT. Remotion component library (see section 6).
- **remotion-dev/remotion**: the effects package was added in the window (section 1).
- **motion** (motion.dev): 25 releases (12.39.0 on 2026-05-18 to 14.2.0 on 2026-10-13). It runs on the wall clock (rAF), so it is not suitable inside Remotion renders. Skip it.

---

## 8. Awesome lists of AI-free code video

- **yihui-dev/awesome-opus5-5-videos**
  - URL: https://github.com/yihui-dev/awesome-opus5-5-videos · licence: MIT (added 2026-09-29).
  - It is a list of videos whose animation is written as code. The authors wrote the code with Claude Opus 5.5; no image or video models were used for the footage.
  - Recent additions:
    - 2026-10-08: +38 videos (Remotion and HyperFrames)
    - 2026-10-12: +335 prompts, then +10 videos with live remakes
    - 2026-10-13: removed 150 entries not made from a plain prompt, leaving 703 entries
  - Tech tags across `data/videos.json`: canvas 267, svg 183, threejs 131, shader 92, gsap 86. "remotion" appears in 89 prompts and "hyperframes" in 20.
  - Entries relevant to a premium cut-paper ad:
    - **LeowenAI** (posted 2026-10-04, Remotion): a product launch film with "the halftone xerox look", camera moves and a synthesised, beat-synced score. https://x.com/LeowenAI/status/2106666146456125931
    - **superalesha** (2026-09-24, canvas): a Norstein-style story. The prompt describes "paper cutouts on layers of glass": torn-paper collage, chalk on black paper, tissue paper underwater, sand on a light table and a pop-up book. It is a multiplane reference for section 3. https://x.com/superalesha/status/2103052154931970412
    - **techhalla** (2026-09-25): a full craft spec. It asks for closed-form springs, per-glyph spring for y, opacity and blur, print misregistration on accent frames only, and a mask reveal from the outgoing word's outlines. It also asks for **4-subframe motion blur**, beat grid stagger and a still-per-beat pre-pass.
    - **heyiamnick** (2026-10-11): pencil lines are "resampled and pushed off true by slow sine waves whose phase changes 8 times a second". Each line is stroked twice: full width at 90%, then half width at 40% with more wobble. "Paper tooth knocked out of the strokes, then multiplied onto the paper." Hatching is cut to letter shapes.
    - **twoclipping** (2026-10-02): stickers with a white die-cut border and soft shadow. Letters rise through a mask line. The camera never stops (a 1.03–1.07 push per scene). Film grain sits on everything.
    - **notdwd** (2026-09-26): "fresh grain every frame, halation on bright edges, soft vignette, warm lifted blacks".
    - **wikiwayne** (2026-10-08): a claymation desk scene "animated on twos like real stop-motion", built in Blender and then Three.js.
- **Remotion Resources page** (https://remotion.dev/resources): the community component libraries (Remocn, RemotionUI, Remotion Bits, Onda). There is no dedicated "awesome-remotion" list.
- **Remotion showcase**: it says it is not taking new submissions. I found no 2026 Remotion blog posts (the latest in the repo is 2025-09-01).
- **Other cut-paper reference:** "Anemoia", a paper-collage explainer posted 2026-10-03 (https://contra.com/p/FeqLrZb7). It uses torn paper in mustard, navy, red and sage, plus duotone archive cut-outs "cut and toned in code". The film was composed at 2160×3840 and timed to word-level TTS alignment. The page does not name Remotion.

---

## 9. Shared craft techniques from 2026 showcase prompts

These apply to paperboil with no new dependencies:

1. **Boil on a cycle, not on noise.** Cycle 2–3 pre-seeded edge states on twos, as replacement animation does, instead of reseeding every frame. Use the `roughenEdges` seed in a 3-state cycle, or rotate your `feTurbulence` `seed` across 3 values.
2. **Die-cut paper core.** A 3–6 px light rim between the coloured face and the shadow sells "cut from a sheet". Use `outline()` or stacked `drop-shadow(±4px 0 #f5eedc)`, then a soft elevation shadow `drop-shadow(0 18px 9px rgba(20,15,12,.32))`.
3. **Elevation-correlated shadows.** Shadow offset and blur should grow with each layer's z (lift). Animate the shadow when a piece is picked up or put down.
4. **Misregistration only on impact frames.** Use 1–2 frames of plate offset on a beat, not a constant RGB split.
5. **Grain reseeded on the same twos as the motion**, with halation and lifted blacks applied once at the end through `lut()`.
6. **Subframe motion blur only on smears.** For fast moves, average 3–4 subframes; `@remotion/motion-blur` `<CameraMotionBlur>` is still current at 4.0.535. Keep held drawings sharp.
7. **Still-per-beat QA pre-pass.** Before a full render, run `npx remotion still` once for each major beat. This catches clipped canvases (`dropShadow` needs padding) and grey paper tints.

---

## Ranking: visual impact vs integration risk

| # | Item | Impact | Risk | Why |
|---|---|---|---|---|
| 1 | `@remotion/effects` per-piece chain on cut-outs: `outline` → `roughenEdges` (3-state seed cycle on twos) → `paper` → `dropShadow` | Very high | Low | Already a dependency at 4.0.535. Verified headless on SwiftShader. Each piece gets real fibre texture, a torn edge and lift |
| 2 | `tear()` (4.0.523) and a HyperFrames-style torn-paper rip transition (clip-path edge table, paper-core rim, lift shadow) | High | Low | The GPU effect is already installed. The DOM version is about 100 lines of deterministic code |
| 3 | `interpolate({posterize})` (4.0.470) plus print-finish effects: `noise` grain on twos, `lightLeak` (4.0.500), `lut` (4.0.526) | High | Low | Native APIs, no new packages. Unifies stepped motion and grade |
| 4 | Riso misregistration: per-ink plates plus `xyTranslate`, `duotone` and `halftone` on impact frames only | High | Low–Med | Pure effects and blend modes. The cost is extra layers per shot |
| 5 | Paper Shaders 0.0.81 `PaperTexture` v2 and `HalftoneCmyk` (Apache-2.0) | High | Medium | Newer paper model than `paper()`. Needs `speed={0}` and `frame` from Remotion, plus `delayRender` for images |
| 6 | `@remotion/gsap` plus SplitText for mask-line type (DrawSVG and MorphSVG optional) | Medium–High | Medium | Officially no plugin support yet. Needs font-load gating. GSAP licence is not OSI |
| 7 | `@remotion/three` 2.5D diorama: PCF and PCSS soft shadows plus normal-mapped paper (three r186, drei 10.7.9) | Very high | High | Best "real lamp on paper" look. Needs a raster asset pipeline, local fonts and HDRIs. r186 dropped `PCFSoftShadowMap`. Slow on SwiftShader |
| 8 | `<HtmlInCanvas>` whole-shot post (`paper`, `lut`, `halftone`) plus the `bookFlip` and `filmBurn` transitions | Very high | High | **[HIC]**: needs Remotion's bundled Chrome. It breaks with `REMOTION_BROWSER_EXECUTABLE` set to stock headless-shell, and could not be fetched in this sandbox |

Not recommended: Rive (**[NET]** wasm from unpkg is hard-coded in `@remotion/rive`), dotLottie (**[NET]** unless you call `setWasmUrl`; little stylistic gain), `shaders` / shaders.com (WebGPU-first **[GPU]**), LYGIA (**[LIC]**), motion.dev (wall-clock).

## Sources

- Remotion repo: docs `packages/docs/docs/{effects,transitions,gsap,rive,remotion}/*.mdx`; source `packages/effects/src/*.ts`, `packages/gsap/src/use-gsap-timeline.ts`, `packages/rive/src/RemotionRiveCanvas.tsx`
- https://www.remotion.dev/docs/effects/api · /docs/html-in-canvas · /docs/gsap · /docs/posterization · /docs/three-webgpu-canvas · /docs/light-leaks
- https://github.com/paper-design/shaders (CHANGELOG.md, LICENSE, NOTICE)
- https://github.com/heygen-com/hyperframes (`registry/components/*`)
- https://github.com/Remocn/remocn · https://github.com/remotion-dev/html-in-canvas
- three.js releases: https://github.com/mrdoob/three.js/releases/tag/r184 · /r185 · /r186
- GSAP 3.15: https://gsap.com/blog/3-15/ (via search excerpt) and the npm tarball (types show `easeReverse`, "deprecated since 3.15.0")
- https://github.com/yihui-dev/awesome-opus5-5-videos (`data/videos.json`, git log)
- https://clawhub.ai/tobewin/paper-collage-remotion · https://contra.com/p/FeqLrZb7-anemoia-a-paper-collage-explainer-film-that-loops-forever
- https://www.npmjs.com/package/shaders · https://lygia.xyz/license · https://rive.app/blog/scripting-is-live-in-rive · https://github.com/lottiefiles/dotlottie-web
