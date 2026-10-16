// Engraving post-process for three.js / @remotion/three.
// Usage:
//   import { createEngravingPass, PALETTES } from './engravingPass.js';
//   const pass = createEngravingPass(THREE, renderer, FRAG_SOURCE, { width, height, palette: PALETTES.mint, ...overrides });
//   // each frame:
//   pass.render(scene, camera);       // renders scene -> RT, (optional normal RT), engraves to the canvas / target
//
// In @remotion/three: create the pass once in a useMemo with the <ThreeCanvas> gl, call pass.render inside
// useFrame with priority 1 (which disables the default render), or render in a useEffect keyed on useCurrentFrame().

export const PALETTES = {
  // measured ink -> (mid) -> paper stops, sRGB hex (PCA of object pixels; 1st/50th/99th pct). Calibration found ink scale k=0.9..1.1 -> use as measured
  mint:      [['#3b5a2e', 0.0], ['#caf1b8', 1.0]],                    // lighthouse scene (measured)
  forest:    [['#112812', 0.0], ['#def3d0', 1.0]],                    // lens / green rock (measured)
  crimson:   [['#782b31', 0.0], ['#c1876e', 0.5], ['#e2d0bc', 1.0]],  // columns (measured; mid bends warm by dE~21 -> 3 stops)
  lavender:  [['#52466c', 0.0], ['#e6ddf8', 1.0]],                    // turtle / seabed (measured)
  violet:    [['#69458f', 0.0], ['#b280d4', 0.5], ['#f6e1fb', 1.0]],  // flowers (measured; mid bends by dE~23 -> 3 stops)
  olive:     [['#51692c', 0.0], ['#e5f3c8', 1.0]],                    // leaves (measured)
  graphite:  [['#101715', 0.0], ['#c2cbc7', 1.0]],                    // grey seabed (measured)
  // 4-stop versions: luminance quantiles of the reference objects (darkest 5% / 20-40% / 70-90% / top 2%),
  // placed where the fill model lands shadow fill (v~0.45) and lit fill (v~0.83). These carry the hue split
  // seen in the columns (pink-magenta in shadow, peach in light).
  crimson4:  [['#7c2537', 0.0], ['#ae5669', 0.45], ['#dea688', 0.83], ['#fbc4a7', 1.0]],
  mint4:     [['#395a2d', 0.0], ['#7b9e6f', 0.45], ['#b9dda8', 0.83], ['#cdf0bc', 1.0]],
  lavender4: [['#3b316c', 0.0], ['#615788', 0.45], ['#bcafcb', 0.83], ['#fdf4fd', 1.0]],
};

export const DEFAULT_PARAMS = {   // calibrated (== src/engrave.py DEFAULTS, == params/calibrated.json "default")
  periodFrac: 0.0065, angleDeg: 45, black: 0.0, white: 1.0, toneGamma: 1.2,
  dmax: 0.8, tHi: 0.75, covGamma: 1.6, fill: 0.40,
  wobble: 0.7, wobbleScale: 2.77, widthJitter: 0.10, segLen: 4.0, segJitter: 0.35, segWidth: 0.3, segGap: 0.2, skew: 0.0, detail: 0.25,
  cross: 0.0, crossAngleDeg: -90, tCross: 0.2,
  outline: 0.0, outlineLo: 0.08, outlineHi: 0.25, aa: 1.0,
  grain: 0.015, mottle: 0.04, mottleScale: 0.012, vignette: 0.13,
  seed: 3.0, bgTone: 1.0, mode: 0, bend: 0.0, inputLinear: 1.0,
};
export const LENS_PRESET = { periodFrac: 0.0105, fill: 0.65, aa: 2.0, covGamma: 1.0 };
// Clean CG renders (three.js): calibrated end-to-end against the reference column at 360p (J 5.47 -> 1.34).
// Use with materials that carry micro-texture (albedo noise ~0.35, bump) and levels matched to the reference
// tone quantiles (black/white from the render's 5th/95th pct; see src/cg_levels.py).
export const CG_PRESET = { wobble: 0.7, detail: 0.25, segLen: 4.0, segJitter: 0.35, segWidth: 0.3, segGap: 0.2, toneGamma: 1.2 };
// Detail-poor smooth input judged at 360p only (re-synthesis optimum). Looks wormy at 1080p: avoid for hero shots.
export const SMOOTH_INPUT_PRESET = { wobble: 0.9, detail: 0.4, segLen: 0.0, toneGamma: 1.15 };

const VERT = /* glsl */`
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

export function paletteUniforms(THREE, palette) {
  const stops = [], pos = [0, 1, 1, 1];
  palette.forEach(([hex, p], i) => {
    const v = parseInt(hex.slice(1), 16);
    stops.push(new THREE.Vector3(((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255)); // raw sRGB
    pos[i] = p;
  });
  while (stops.length < 4) stops.push(stops[stops.length - 1].clone());
  return { uStops: { value: stops }, uStopPos: { value: new THREE.Vector4(...pos) }, uStopCount: { value: palette.length } };
}

export function createEngravingPass(THREE, renderer, fragSource, opts = {}) {
  const width = opts.width ?? 1920, height = opts.height ?? 1080;
  const P = { ...DEFAULT_PARAMS, ...(opts.params || {}) };
  const palette = opts.palette || PALETTES.mint;
  const rtOpts = { type: THREE.HalfFloatType, samples: opts.samples ?? 4, depthBuffer: true };
  const rtColor = new THREE.WebGLRenderTarget(width, height, rtOpts);
  const rtNormal = P.mode === 1 ? new THREE.WebGLRenderTarget(width, height, rtOpts) : null;
  const normalMat = new THREE.MeshNormalMaterial();
  const uniforms = {
    tColor: { value: rtColor.texture }, tNormal: { value: rtNormal ? rtNormal.texture : rtColor.texture },
    uResolution: { value: new THREE.Vector2(width, height) }, uInputLinear: { value: P.inputLinear },
    uMode: { value: P.mode }, uBend: { value: P.bend },
    uPeriodFrac: { value: P.periodFrac }, uAngle: { value: THREE.MathUtils.degToRad(P.angleDeg) },
    uBlack: { value: P.black }, uWhite: { value: P.white }, uToneGamma: { value: P.toneGamma },
    uDmax: { value: P.dmax }, uTHi: { value: P.tHi }, uCovGamma: { value: P.covGamma }, uFill: { value: P.fill },
    uWobble: { value: P.wobble }, uWobbleScale: { value: P.wobbleScale }, uWidthJitter: { value: P.widthJitter },
    uSegLen: { value: P.segLen }, uSegJitter: { value: P.segJitter }, uSegWidth: { value: P.segWidth }, uSegGap: { value: P.segGap },
    uSkew: { value: P.skew }, uDetail: { value: P.detail },
    uCross: { value: P.cross }, uCrossAngle: { value: THREE.MathUtils.degToRad(P.crossAngleDeg) }, uTCross: { value: P.tCross },
    uOutline: { value: P.outline }, uOutlineLo: { value: P.outlineLo }, uOutlineHi: { value: P.outlineHi }, uAA: { value: P.aa },
    uBgTone: { value: P.bgTone },
    uGrain: { value: P.grain }, uMottle: { value: P.mottle }, uMottleScale: { value: P.mottleScale }, uVignette: { value: P.vignette },
    uSeed: { value: P.seed },
    ...paletteUniforms(THREE, palette),
  };
  const material = new THREE.ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: fragSource, depthTest: false, depthWrite: false });
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  const qScene = new THREE.Scene(); qScene.add(quad);
  const qCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  return {
    uniforms, material, rtColor, rtNormal,
    setPalette(p) { Object.assign(uniforms, paletteUniforms(THREE, p)); material.uniforms = uniforms; },
    render(scene, camera, target = null) {
      const prevClear = renderer.getClearAlpha(); const prevColor = renderer.getClearColor(new THREE.Color());
      renderer.setClearColor(0x000000, 0.0);
      renderer.setRenderTarget(rtColor); renderer.clear(); renderer.render(scene, camera);
      if (rtNormal) {
        const o = scene.overrideMaterial; scene.overrideMaterial = normalMat;
        renderer.setRenderTarget(rtNormal); renderer.clear(); renderer.render(scene, camera);
        scene.overrideMaterial = o;
      }
      renderer.setClearColor(prevColor, prevClear);
      renderer.setRenderTarget(target); renderer.render(qScene, qCam);
    },
    dispose() { rtColor.dispose(); rtNormal?.dispose(); material.dispose(); quad.geometry.dispose(); normalMat.dispose(); },
  };
}

// Per-object material variant (own lighting; lines can follow UV / object space). See engravingMaterial.frag.glsl.
export function createEngravingMaterial(THREE, vertSource, fragSource, opts = {}) {
  const P = { ...DEFAULT_PARAMS, ...(opts.params || {}) };
  const keyDir = (opts.keyDirView || new THREE.Vector3(-0.5, 0.6, 0.6)).clone().normalize();
  const uniforms = {
    uResolution: { value: new THREE.Vector2(opts.width ?? 1920, opts.height ?? 1080) },
    uKeyDir: { value: keyDir }, uKey: { value: opts.key ?? 0.95 }, uWrap: { value: opts.wrap ?? 0.15 },
    uAmbient: { value: opts.ambient ?? 0.08 }, uRim: { value: opts.rim ?? 0.12 }, uRimPow: { value: 3.0 },
    uSpec: { value: opts.spec ?? 0.15 }, uShininess: { value: opts.shininess ?? 24 },
    uAlbedo: { value: opts.albedo ?? 1.0 }, tAlbedo: { value: opts.albedoMap || null }, uUseAlbedoMap: { value: opts.albedoMap ? 1 : 0 },
    uPhaseMode: { value: opts.phaseMode ?? 0 }, uLinesPerUV: { value: opts.linesPerUV ?? 120 },
    uPlaneDir: { value: opts.planeDir || new THREE.Vector3(1, 1, 0) }, uPlanePeriod: { value: opts.planePeriod ?? 0.02 },
    uPeriodFrac: { value: P.periodFrac }, uAngle: { value: THREE.MathUtils.degToRad(P.angleDeg) }, uToneGamma: { value: P.toneGamma },
    uDmax: { value: P.dmax }, uTHi: { value: P.tHi }, uCovGamma: { value: P.covGamma }, uFill: { value: P.fill },
    uWobble: { value: P.wobble }, uWobbleScale: { value: P.wobbleScale }, uWidthJitter: { value: P.widthJitter },
    uSkew: { value: P.skew }, uDetail: { value: P.detail }, uAA: { value: P.aa },
    uGrain: { value: P.grain }, uMottle: { value: P.mottle }, uMottleScale: { value: P.mottleScale }, uSeed: { value: P.seed },
    ...paletteUniforms(THREE, opts.palette || PALETTES.mint),
  };
  return new THREE.ShaderMaterial({ uniforms, vertexShader: vertSource, fragmentShader: fragSource });
}
