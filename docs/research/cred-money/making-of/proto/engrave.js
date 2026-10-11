// Prototype: "currency engraving" look for 3D objects, code-only (three.js r176).
// Technique = real-time halftoning (Freudenberg et al. 2002) / Photoshop "Hard Mix" line screen
// (Texturelabs / sjvnnings Godot shader, MIT) with the screen in OBJECT space so it scales with the
// camera like the reference, multi-layer crosshatch by tone threshold (Spoon Graphics / Ostromoukhov 1999),
// gradient-map duotone, thin-film foil (three.js iridescence = Belcour & Barla 2017),
// then a post pass: loupe/lens vignette + barrel distortion + paper fibre + grain.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const q = new URLSearchParams(location.search);
const W = +(q.get('w') || 1280), H = +(q.get('h') || 720);
const SCENE = q.get('scene') || 'bird';
const T = +(q.get('t') || 0);
const PAL = q.get('pal') || 'purple';
const LENS = q.get('lens') === '1';
const ZOOM = +(q.get('zoom') || 1);
const PERIOD_PX = +(q.get('period') || 7); // target line period in px at zoom 1

// Ink / mid / paper per scene tint. Measured as the mean of the darkest / middle / lightest 20% of
// pixels inside engraved objects of the reference (640x360 frames, so ink is blended with paper:
// real ink is darker) and nudged darker for ink. See tone_levels.py.
const PALETTES = {
  purple: { ink: '#3a2385', mid: '#8f7fc4', paper: '#e6e2ec', bg: '#dfe6c8' },
  green:  { ink: '#2c4a26', mid: '#7fa86f', paper: '#cfe9bd', bg: '#cfe9bd' },
  peach:  { ink: '#7d1634', mid: '#b4636a', paper: '#ecc0a2', bg: '#ead9c4' },
  grey:   { ink: '#1f272d', mid: '#8a9893', paper: '#d3ddd8', bg: '#d8dfdb' },
};
const pal = PALETTES[PAL] || PALETTES.purple;

const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1);
renderer.setSize(W, H);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(pal.bg);
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 5000);

const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(3, 5, 4); scene.add(key);
const fill = new THREE.HemisphereLight(0xffffff, 0x404040, 0.6); scene.add(fill);

// ---------- engraving material patch ----------
function engrave(material, opts = {}) {
  const u = {
    uFreq: { value: opts.freq ?? 40.0 },
    uSpace: { value: opts.space ?? 1.0 },              // lines per object-space unit (set per object)
    uDir1: { value: new THREE.Vector3(0.7071, -0.7071, 0) }, // wave vector at -45 deg => LINES at +45 deg (reference)
    uDir2: { value: new THREE.Vector3(0.7071, 0.7071, 0.0) },   // along the lines (drives the waviness)
    uDir3: { value: new THREE.Vector3(Math.cos(1.31), Math.sin(1.31), 0.0) },  // crosshatch: wave vector 75 deg => lines at 165 deg
    uWaveAmp: { value: opts.waveAmp ?? 0.35 },        // in line periods
    uWaveLen: { value: opts.waveLen ?? 22.0 },        // in line periods
    uLo: { value: opts.lo ?? 0.10 }, uHi: { value: opts.hi ?? 0.90 }, uGamma: { value: opts.gamma ?? 1.0 },
    uCross: { value: opts.cross ?? 0.42 },
    uToneMax: { value: opts.toneMax ?? 0.84 },        // keep a hairline even in highlights (reads as engraved)            // tone below which the crosshatch layer appears
    uEngrave: { value: opts.engrave ?? 0.88 },        // 0 = plain gradient map, 1 = pure line art
    uInk: { value: new THREE.Color(opts.ink ?? pal.ink) },
    uMid: { value: new THREE.Color(opts.mid ?? pal.mid) },
    uPaper: { value: new THREE.Color(opts.paper ?? pal.paper) },
    uFoil: { value: opts.foil ? 1.0 : 0.0 },          // foil: procedural thin-film-like pastel rainbow + lines
    uTime: { value: T },
    uFoilBands: { value: opts.foilBands ?? 1.6 },     // rainbow cycles across the object
    uFoilView: { value: opts.foilView ?? 2.2 },       // cycles added from grazing view angle (1 - N.V)
    uFoilSpeed: { value: opts.foilSpeed ?? 0.18 },    // cycles per second drift
  };
  material.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, u);
    if (opts.foil) sh.fragmentShader = '#define ENGRAVE_FOIL\n' + sh.fragmentShader;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vObjP;\nvarying vec3 vRel;')
      .replace('#include <skinning_vertex>', '#include <skinning_vertex>\nvObjP = transformed;\nvRel = (modelViewMatrix * vec4(transformed, 1.0)).xyz - (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vObjP;
varying vec3 vRel;
uniform float uSpace, uToneMax;
uniform float uFreq, uWaveAmp, uWaveLen, uLo, uHi, uGamma, uCross, uEngrave, uFoil, uTime, uFoilBands, uFoilView, uFoilSpeed;
uniform vec3 uDir1, uDir2, uDir3, uInk, uMid, uPaper;
float lineInk(float ph, float tone){
  float d = abs(fract(ph) - 0.5) * 2.0;          // 0 on the line centre, 1 midway between lines
  float aa = clamp(fwidth(ph) * 1.5, 0.002, 0.5); // pixel-width anti-aliasing (Freudenberg's smooth threshold)
  float th = 1.0 - tone;                          // half line width as a fraction of the period
  float ink = 1.0 - smoothstep(th - aa, th + aa, d); // "hard mix": width grows with darkness
  return ink * clamp(th / aa, 0.0, 1.0);          // no ghost line at pure white
}
vec3 gmap(float t){ return t < 0.5 ? mix(uInk, uMid, t * 2.0) : mix(uMid, uPaper, (t - 0.5) * 2.0); }`)
      .replace('#include <dithering_fragment>', `#include <dithering_fragment>
{
  float L = pow(max(dot(gl_FragColor.rgb, vec3(0.2126, 0.7152, 0.0722)), 0.0), 1.0/2.2); // perceptual tone
  float tone = min(pow(clamp((L - uLo) / (uHi - uLo), 0.0, 1.0), uGamma), uToneMax);
  // uSpace 1: screen-oriented screen anchored to the object, scaling with its on-screen size
  // (behaves like an engraved 2.5D plate, = the reference); uSpace 0: true object space.
  vec3 p = (uSpace > 0.5 ? vec3(vRel.xy, 0.0) : vObjP) * uFreq;
  float ph1 = dot(p, uDir1) + uWaveAmp * sin(6.2831853 * dot(p, uDir2) / uWaveLen);
  float ph3 = dot(p, uDir3) + uWaveAmp * sin(6.2831853 * dot(p, uDir1) / uWaveLen);
  float ink1 = lineInk(ph1, tone);
  float ink3 = lineInk(ph3, clamp(tone / uCross, 0.0, 1.0));
  float ink = max(ink1, ink3);
#ifdef ENGRAVE_FOIL
  {
    // thin-film look without physics: hue phase = position bands + view-angle term + slow drift
    // (cosine palette, pastel: a=0.78, b=0.22), modulated by the lit luminance so form still reads
    float ndv = abs(dot(normalize(normal), normalize(vViewPosition)));
    float phase = uFoilBands * dot(vObjP.xy, vec2(0.55, 0.83)) / max(1e-3, 1.0) + uFoilView * (1.0 - ndv) + uFoilSpeed * uTime;
    vec3 rainbow = 0.78 + 0.22 * cos(6.2831853 * (phase + vec3(0.0, 0.33, 0.67)));
    vec3 foilCol = rainbow * (0.55 + 0.55 * tone);
    float inkF = lineInk(ph1, min(tone, 0.72));   // foil keeps a thin, constant screen like the reference
    gl_FragColor.rgb = pow(foilCol, vec3(2.2)) * mix(1.0, 0.55, inkF * uEngrave); // back to linear
  }
#else
  {
    vec3 base = gmap(tone);
    vec3 lines = mix(uPaper, uInk, ink);
    gl_FragColor.rgb = mix(base, lines, uEngrave);
  }
#endif
}`);
  };
  material.customProgramCacheKey = () => 'engrave' + (opts.foil ? 'F' : '');
  material.userData.u = u;
  return material;
}

// fit object-space line frequency so lines are PERIOD_PX apart on screen at zoom 1
function freqFor(objectWorldSize, objectScreenPx) { // object-space mode
  return (objectScreenPx / PERIOD_PX) / objectWorldSize;
}
// view-space mode: lines per world unit so the period is PERIOD_PX at distance dist0 (zoom 1);
// zooming the camera then scales the screen with the object, as measured in the reference.
function freqView(dist0) { return (H / (2 * dist0 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)))) / PERIOD_PX; }

let mixer = null;
const loader = new GLTFLoader();
const ready = [];

if (SCENE === 'bird' || SCENE === 'stork') {
  ready.push(new Promise((res) => loader.load(`./assets/${SCENE === 'bird' ? 'Flamingo' : 'Stork'}.glb`, (g) => {
    const m = g.scene.children[0];
    // these GLBs ship without normals: GLTFLoader flags flatShading on the original material, so keep it
    m.material = engrave(new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.9, metalness: 0, flatShading: !m.geometry.attributes.normal }), {
      freq: freqView(380), waveAmp: 0.25, cross: 0.35, lo: 0.40, hi: 0.95, gamma: 2.0 });
    m.rotation.y = -0.5;
    scene.add(g.scene);
    mixer = new THREE.AnimationMixer(g.scene);
    mixer.clipAction(g.animations[0]).play();
    mixer.setTime(T);
    camera.position.set(0, 20, 380 / ZOOM); camera.lookAt(0, 10, 0);
    res();
  })));
}

if (SCENE === 'shoe') {
  ready.push(new Promise((res) => loader.load('./assets/MaterialsVariantsShoe.glb', (g) => {
    const box = new THREE.Box3().setFromObject(g.scene); const size = box.getSize(new THREE.Vector3());
    const s = 1 / Math.max(size.x, size.y, size.z); g.scene.scale.setScalar(s);
    g.scene.position.sub(box.getCenter(new THREE.Vector3()).multiplyScalar(s));
    g.scene.traverse((o) => { if (o.isMesh) {
      const mat = new THREE.MeshStandardMaterial({ map: o.material.map, normalMap: o.material.normalMap, roughness: 0.8 });
      o.material = engrave(mat, { freq: freqView(2.4), waveAmp: 0.3, cross: 0.38 });
    } });
    g.scene.rotation.y = 0.6 + T * 0.15;
    scene.add(g.scene);
    camera.position.set(0, 0.25, 2.4 / ZOOM); camera.lookAt(0, 0, 0);
    res();
  })));
}

if (SCENE === 'card') {
  // a credit card in thin-film foil with a faint engraved screen over it
  const geo = new RoundedBoxGeometry(3.37, 2.125, 0.03, 4, 0.12);
  const foil = new THREE.MeshStandardMaterial({ color: 0xbbbbbb, metalness: 0.2, roughness: 0.4, envMapIntensity: 0.6 });
  const card = new THREE.Mesh(geo, engrave(foil, { foil: true, freq: freqView(9), engrave: 0.7, foilBands: 0.45 }));
  card.rotation.set(-0.9 + 0.25 * Math.sin(T * 0.8), 0.35 * Math.sin(T * 0.6), 0.25);
  scene.add(card);
  camera.position.set(0, 0, 9 / ZOOM); camera.lookAt(0, 0, 0);
  ready.push(Promise.resolve());
}

if (SCENE === 'plate') {
  // 2.5D photo plate: any photo/render on a card, engraved in its own (layer) space
  const img = q.get('img') || 'rocket.jpg';
  ready.push(new Promise((res) => new THREE.TextureLoader().load('./assets/' + img, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    const a = tex.image.width / tex.image.height, hgt = 2.0, wid = hgt * a;
    const mat = engrave(new THREE.MeshBasicMaterial({ map: tex }), { freq: 0, waveAmp: 0.5, waveLen: 26, cross: 0.36, lo: 0.06, hi: 0.92, gamma: 1.1 });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(wid, hgt), mat);
    scene.add(plane);
    const dist = (hgt / 2) / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    mat.userData.u.uFreq.value = freqView(dist);
    camera.position.set(0, 0, dist / ZOOM); camera.lookAt(0, 0, 0);
    res();
  })));
}

// ---------- post pass: lens + paper + grain ----------
const rt = new THREE.WebGLRenderTarget(W, H, { samples: 4, type: THREE.HalfFloatType }); // linear working space
const post = new THREE.ShaderMaterial({
  uniforms: {
    tSrc: { value: rt.texture }, uRes: { value: new THREE.Vector2(W, H) }, uTime: { value: T },
    uLens: { value: LENS ? 1 : 0 },
    uLensR: { value: 0.466 },   // radius / frame width  (measured: r50 = 288-312 px of 640)
    uLensSoft: { value: 0.0625 }, // r90 -> r50 distance / frame width (measured ~40 px of 640)
    uBarrel: { value: 0.12 },   // [Guessing] mild bulge inside the loupe
    uCA: { value: 0.004 },      // [Guessing] chromatic fringe at the rim
    uPaperAmt: { value: 0.07 }, uGrain: { value: 0.035 },
    uRim: { value: new THREE.Color(pal.paper) },
  },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
  fragmentShader: `
varying vec2 vUv; uniform sampler2D tSrc; uniform vec2 uRes; uniform float uTime, uLens, uLensR, uLensSoft, uBarrel, uCA, uPaperAmt, uGrain; uniform vec3 uRim;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float a = 0.5, s = 0.0; for(int i=0;i<5;i++){ s += a*vn(p); p *= 2.03; a *= 0.5; } return s; }
void main(){
  vec2 px = vUv * uRes;
  vec2 c = uRes * 0.5;
  vec2 d = (px - c) / uRes.x;            // normalised by width so the loupe is a circle
  float r = length(d);
  vec2 uv = vUv;
  vec3 col;
  if (uLens > 0.5) {
    float k = 1.0 - uBarrel * (r / uLensR) * (r / uLensR); // barrel: magnify centre, compress rim
    vec2 base = c + d * k * uRes.x;
    vec2 off = d * uCA * uRes.x * smoothstep(0.6 * uLensR, uLensR, r);
    col = vec3(texture2D(tSrc, (base + off) / uRes).r, texture2D(tSrc, base / uRes).g, texture2D(tSrc, (base - off) / uRes).b);
  } else {
    col = texture2D(tSrc, uv).rgb;
  }
  col = pow(max(col, 0.0), vec3(1.0/2.2)); // linear -> display
  // paper: low-frequency mottling + fine fibres, multiplied (stays put while layers move, like a print)
  float mott = fbm(px / 180.0);
  float fib = fbm(vec2(px.x / 60.0, px.y / 14.0) + 3.1);   // short fibres, mostly isotropic
  col *= 1.0 - uPaperAmt * (0.75 * mott + 0.25 * fib - 0.5) * 2.0;
  // film grain (changes every frame)
  col += (h(px + fract(uTime * 24.0) * 91.7) - 0.5) * uGrain;
  if (uLens > 0.5) {
    float m = 1.0 - smoothstep(uLensR - uLensSoft, uLensR, r);
    float rim = exp(-pow((r - (uLensR - uLensSoft * 0.6)) / (uLensSoft * 0.25), 2.0));
    col = mix(vec3(0.02, 0.025, 0.022), col, m) + uRim * rim * 0.08;
  }
  gl_FragColor = vec4(col, 1.0);
}`,
});
const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), post);
const postScene = new THREE.Scene(); postScene.add(quad);
const postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

Promise.all(ready).then(() => {
  if (mixer) mixer.setTime(T);
  renderer.setRenderTarget(rt); renderer.render(scene, camera);
  renderer.setRenderTarget(null); renderer.render(postScene, postCam);
  window.__ready = true;
});
