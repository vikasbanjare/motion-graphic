import React, { useLayoutEffect, useRef } from "react";
import { getStroke } from "perfect-freehand";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Cam, Detail, EMesh, RefDepth, World } from "../v2/three.tsx";
import { Field } from "../../../ensemble/paint2d.tsx";
import { LookCtx, type Look } from "../../../ensemble/look.ts";
import { circle, trim, type Pt } from "../../../ensemble/paths.ts";
import { expoOut, ramp } from "../../../ensemble/score.ts";
import { Rig } from "./rig.tsx";
import { ENGRAVE_FINE, Headline, M, PAL } from "./kit.tsx";
import { fit, useCopy } from "./copy.tsx";
import { blob, leafGeo, rnd, tube, type P3 } from "./geo.ts";

/**
 * v6.5 opening, rebuilt shot for shot against the reference's first 8 seconds (docs/research/cred-v65-reference-compare.md):
 *   0-12     blank paper under a heavy vignette (the reference holds still before the first stroke)
 *   12-64    pen strokes drawn one at a time from the left edge, thick and tapered, straight at first, then waving
 *   64       scale-step on the beat into the fine line field, which keeps drawing to the right
 *   86-110   the field closes into a large white disc on the left; a yellow-green wash comes in around it
 *   104-140  a big engraved bough sweeps in from the bottom right, cropped by the frame; flowers and leaves burst open
 *   126      the fox runs in along the bough; at the cut (192) it stops among the flowers and looks around
 *   176      the headline, with a flowering twig crossing in front of it
 * G is this take's frame; u = G - INTRO is the v6 timeline the card's print shares (the card starts at u = 150).
 */
export const INTRO = 96;
const W = 1920, H = 1080;
const look = (paper: string, ink: string): Look => ({ paper, ink, inkSoft: ink, washes: [paper], accent: ink, weight: 2.2, grain: 0.32, seed: 5 });

// ---- the 2D ground: paper, pen strokes, the field, the disc and the wash ----------------------------------------------
/** Paper with fibres and a vignette that lifts as the colour arrives. */
const PaperFibre: React.FC<{ color: string; vignette: number }> = ({ color, vignette }) => (
  <>
    <AbsoluteFill style={{ background: color }} />
    <svg width={W} height={H} style={{ position: "absolute", inset: 0, mixBlendMode: "multiply" }}>
      <filter id="fib-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85 0.7" numOctaves={3} seed={7} />
        <feColorMatrix values="0 0 0 0 0.42  0 0 0 0 0.41  0 0 0 0 0.38  0 0 0 -0.5 0.36" />
      </filter>
      <filter id="fib-fibre" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.004 0.09" numOctaves={2} seed={11} />
        <feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0.49  0 0 0 0 0.45  0 0 0 -2.2 1.05" />
      </filter>
      <rect width="100%" height="100%" filter="url(#fib-grain)" />
      <rect width="100%" height="100%" filter="url(#fib-fibre)" opacity={0.16} />
      <radialGradient id="fib-vig" cx="50%" cy="48%" r="72%">
        <stop offset="45%" stopColor="#000" stopOpacity={0} />
        <stop offset="100%" stopColor="#3a3830" stopOpacity={vignette} />
      </radialGradient>
      <rect width="100%" height="100%" fill="url(#fib-vig)" />
    </svg>
  </>
);

/** The opening strokes: y (px), length (fraction of the width), start frame, draw length (frames), weight. */
const STROKES = [
  { y: 512, len: 0.46, at: 12, dur: 24, size: 1.9 },
  { y: 470, len: 0.3, at: 19, dur: 20, size: 1.7 },
  { y: 556, len: 0.62, at: 25, dur: 24, size: 1.8 },
  { y: 430, len: 0.38, at: 31, dur: 20, size: 1.5 },
  { y: 598, len: 0.24, at: 36, dur: 16, size: 1.4 },
  { y: 640, len: 0.52, at: 41, dur: 20, size: 1.5 },
  { y: 392, len: 0.2, at: 46, dur: 14, size: 1.3 },
  { y: 682, len: 0.34, at: 51, dur: 14, size: 1.3 },
];
const FIELD_AT = 64;

const penPts = (y: number, len: number, amp: number, phase: number): Pt[] =>
  Array.from({ length: 90 }, (_, i) => {
    const x = -60 + (i / 89) * (W * len + 60);
    return [x, y + amp * Math.sin(((x + phase) / 520) * Math.PI * 2)] as Pt;
  });

const Pen: React.FC<{ G: number }> = ({ G }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    const x = ref.current?.getContext("2d");
    if (!x) return;
    x.clearRect(0, 0, W, H);
    for (const s of STROKES) {
      if (G < s.at) continue;
      const k = Math.min(1, (G - s.at) / s.dur);
      // straight while the pen runs, then the line takes its wave (the reference's first stroke bends after it lands)
      const amp = 15 * expoOut(ramp(G, s.at + s.dur * 0.45, s.at + s.dur + 14));
      const pts = trim(penPts(s.y, s.len, amp, G * 3.2 + s.y * 2.1), 0, expoOut(k));
      if (pts.length < 2) continue;
      const n = pts.length;
      const o = getStroke(pts.map(([px, py], i) => [px, py, 0.55 + 0.45 * Math.sin((Math.PI * (i + 0.5)) / n)]), { size: s.size * 5.6, thinning: 0.55, smoothing: 0.4, streamline: 0.1, simulatePressure: false, start: { taper: 0 }, end: { taper: 90 } });
      x.fillStyle = "#1d1d21";
      x.beginPath();
      o.forEach(([px, py], i) => (i ? x.lineTo(px, py) : x.moveTo(px, py)));
      x.closePath();
      x.fill();
    }
  });
  return <canvas ref={ref} width={W} height={H} style={{ position: "absolute", inset: 0 }} />;
};

/** The white disc the field closes into (centre and radius, px) at take frame G. */
const DISC = { cx: 210, cy: 830 };
const discR = (G: number) => 900 + 1900 * (1 - expoOut(ramp(G, 84, 112)));

/** Everything 2D behind the bough, for any take frame G (G beyond the intro is the settled end state). */
export const Ground: React.FC<{ G: number; fine?: number }> = ({ G, fine = 1 }) => {
  const R = discR(G);
  const wash = ramp(G, 86, 108);
  const ring = circle(DISC.cx, DISC.cy, R, 160);
  return (
    <LookCtx.Provider value={look("#ebebe7", "#3a3a3e")}>
      <AbsoluteFill>
        <PaperFibre color="#ecece8" vignette={0.28 - 0.18 * ramp(G, 60, 110)} />
        {G < FIELD_AT ? <Pen G={G} /> : null}
        {G >= FIELD_AT ? (
          <Field f={G} pitch={21 * fine} lambda={112 * fine} amp={6 * fine} speed={6} width={1.7 * fine} color="#7f817b" angle={-2} reveal={0.3 + 0.36 * expoOut(ramp(G, FIELD_AT, FIELD_AT + 40))} ragged={170} noiseAmp={0.3} clip={G >= 84 ? ring : undefined} />
        ) : null}
        {wash > 0 ? (
          <AbsoluteFill
            style={{
              opacity: wash,
              WebkitMaskImage: `radial-gradient(circle ${R}px at ${DISC.cx}px ${DISC.cy}px, transparent 99.6%, #000 100%)`,
              maskImage: `radial-gradient(circle ${R}px at ${DISC.cx}px ${DISC.cy}px, transparent 99.6%, #000 100%)`,
            }}
          >
            <AbsoluteFill style={{ background: "linear-gradient(115deg, #e9ecc4 0%, #dbe6b2 38%, #c4d99a 72%, #b3cf8c 100%)" }} />
            <Field f={G} pitch={14 * fine} lambda={160 * fine} amp={3 * fine} speed={3.5} width={1.1 * fine} color="#a7b884" opacity={0.55} />
            <AbsoluteFill style={{ background: "radial-gradient(ellipse 60% 70% at 70% 30%, rgba(255,250,215,0.55), rgba(255,250,215,0) 70%)" }} />
            <svg width={W} height={H} style={{ position: "absolute", inset: 0, mixBlendMode: "multiply", opacity: 0.5 }}>
              <filter id="wash-mottle" x="0" y="0" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves={4} seed={3} />
                <feColorMatrix values="0 0 0 0 0.62  0 0 0 0 0.68  0 0 0 0 0.46  0 0 0 -1.6 1.1" />
              </filter>
              <rect width="100%" height="100%" filter="url(#wash-mottle)" />
            </svg>
          </AbsoluteFill>
        ) : null}
      </AbsoluteFill>
    </LookCtx.Provider>
  );
};

// ---- the bough: a hand-built engraved branch with flowering twigs ---------------------------------------------------------
/** A rounded petal along +y: a narrow claw at the base opening to a broad, ruffled, cupped blade. */
const petalGeo = (len: number, w: number, cup = 0.12, ruffle = 0.012) => {
  const g = new THREE.PlaneGeometry(w, len, 14, 16);
  const p = g.getAttribute("position") as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i) + len / 2;
    const t = y / len;
    const half = (w / 2) * Math.sqrt(Math.max(0, 1 - ((t - 0.56) / 0.56) ** 2)) * Math.min(1, 0.35 + t * 2.2);
    const u = x / (w / 2);
    const edge = Math.abs(u) ** 2 * t;
    p.setXYZ(i, u * half, y, cup * (u * half) ** 2 / Math.max(0.01, w) * 4 + ruffle * Math.sin(u * 7 + t * 9) * edge + 0.08 * t * t * len);
  }
  g.computeVertexNormals();
  return g;
};

/** One five-petal blossom facing +z, centre at the origin; the eye is returned separately (a darker ink). */
const blossom = (s: number) => {
  const petals: THREE.BufferGeometry[] = [];
  for (let k = 0; k < 5; k++) {
    const p = petalGeo(0.24 * s, 0.24 * s);
    p.rotateX(0.32);
    p.rotateZ((k / 5) * Math.PI * 2);
    petals.push(p);
  }
  const eye = new THREE.SphereGeometry(0.04 * s, 12, 10);
  eye.translate(0, 0, 0.03 * s);
  return { petals: mergeGeometries(petals)!, eye };
};

/** A cluster of blossoms, buds and leaves around a point, merged into three meshes. */
const cluster = (n: number, spread: number, seed: number, leaves: number) => {
  const pet: THREE.BufferGeometry[] = [], eyes: THREE.BufferGeometry[] = [], lv: THREE.BufferGeometry[] = [];
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  for (let i = 0; i < n; i++) {
    const r = (k: number) => rnd(i * 13 + k, seed);
    const s = 0.85 + 0.4 * r(1);
    const b = blossom(s);
    // face the camera (+z) with a scatter of tilts, so the cluster reads as a ball of flowers, not a decal
    e.set((r(2) - 0.5) * 0.7, (r(3) - 0.5) * 0.7, r(4) * Math.PI * 2);
    q.setFromEuler(e);
    // a loose spiral, so blossoms overlap at their edges but each one keeps its face
    const a = i * 2.4, rr = spread * Math.sqrt((i + 0.5) / n);
    m.compose(new THREE.Vector3(Math.cos(a) * rr * 1.3, Math.sin(a) * rr, (r(7) - 0.5) * spread * 0.6 + 0.02 * i), q, new THREE.Vector3(1, 1, 1));
    b.petals.applyMatrix4(m);
    b.eye.applyMatrix4(m);
    pet.push(b.petals);
    eyes.push(b.eye);
  }
  for (let i = 0; i < leaves; i++) {
    const r = (k: number) => rnd(i * 17 + k, seed + 50);
    const g = leafGeo(0.34 + 0.18 * r(1), 0.15 + 0.06 * r(2), 0.3, 0.025, 0.25);
    e.set(-0.6 + r(3) * 1.2, (r(4) - 0.5) * 1.6, r(5) * Math.PI * 2);
    q.setFromEuler(e);
    m.compose(new THREE.Vector3((r(6) - 0.5) * spread * 1.6, (r(7) - 0.5) * spread, (r(8) - 0.7) * spread), q, new THREE.Vector3(1, 1, 1));
    g.applyMatrix4(m);
    lv.push(g);
  }
  return { petals: mergeGeometries(pet)!, eyes: mergeGeometries(eyes)!, leaves: lv.length ? mergeGeometries(lv)! : null };
};

/** Bark: long fissures along the grain with pale lichen patches (the tone under the line screen). */
const barkTex = (() => {
  const c = document.createElement("canvas");
  c.width = 2048;
  c.height = 256;
  const x = c.getContext("2d")!;
  x.fillStyle = "#c9cfa6";
  x.fillRect(0, 0, 2048, 256);
  for (let i = 0; i < 140; i++) {
    const y = rnd(i, 3) * 256, x0 = rnd(i, 4) * 2048, len = 120 + rnd(i, 5) * 600;
    x.strokeStyle = i % 3 ? "#5d6a34" : "#2f3a14";
    x.globalAlpha = 0.25 + 0.5 * rnd(i, 6);
    x.lineWidth = 1 + rnd(i, 7) * 5;
    x.beginPath();
    for (let k = 0; k <= 30; k++) {
      const px = x0 + (k / 30) * len, py = y + 6 * Math.sin(k * 0.6 + i);
      if (k) x.lineTo(px, py);
      else x.moveTo(px, py);
    }
    x.stroke();
  }
  for (let i = 0; i < 90; i++) {
    // big blotches: dark moss and pale lichen, each a cluster of overlapping ellipses so the edges are ragged
    const dark = i % 3 !== 0;
    x.fillStyle = dark ? "#3d4c18" : "#f4f5e4";
    const cx = rnd(i, 8) * 2048, cy = rnd(i, 9) * 256, R = 30 + rnd(i, 10) * 110;
    for (let k = 0; k < 7; k++) {
      x.globalAlpha = dark ? 0.32 : 0.6;
      x.beginPath();
      x.ellipse(cx + (rnd(i * 7 + k, 13) - 0.5) * R * 1.6, cy + (rnd(i * 7 + k, 14) - 0.5) * R * 0.5, R * (0.3 + 0.5 * rnd(i * 7 + k, 15)), R * (0.12 + 0.2 * rnd(i * 7 + k, 16)), 0, 0, Math.PI * 2);
      x.fill();
    }
  }
  x.globalAlpha = 1;
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(2, 1);
  return t;
})();

/** The bough, entering bottom right and rising gently to the left; s runs right to left (arc length 0..1). */
const BOUGH_R0 = 0.8, BOUGH_R1 = 0.3;
const BOUGH = tube([[5.4, -2.2, 1.3], [3.4, -0.85, 0.7], [1.6, -0.1, 0.25], [-0.4, 0.22, 0.0], [-2.4, 0.3, -0.3], [-4.9, 0.6, -0.9]], BOUGH_R0, BOUGH_R1, 220, 24, 0.18);
/** A second limb crossing behind the first, from the top right (the reference's boughs cross in an X). */
const LIMB = tube([[5.6, 3.9, -1.6], [3.6, 2.5, -1.1], [1.8, 1.25, -0.7], [0.3, 0.45, -0.35]], 0.42, 0.3, 160, 22, 0.2);
/** Burls: knots swelling out of the bark. */
const BURLS: { at: P3; s: number }[] = [
  { at: [2.3, -0.42, 0.62], s: 0.32 },
  { at: [-1.2, 0.36, 0.25], s: 0.24 },
  { at: [3.0, 2.08, -0.72], s: 0.22 },
];
const BURL_G = blob(1, 0.8, 1, 0.22, 4, 28);
const TWIGS: { path: P3[]; r: [number, number]; at: number }[] = [
  { path: [[0.9, 0.05, 0.1], [1.4, 0.8, -0.05], [2.0, 1.6, 0.05], [2.6, 2.45, 0.2]], r: [0.1, 0.03], at: 14 },
  { path: [[-1.5, 0.3, -0.1], [-1.95, 1.05, -0.3], [-2.6, 1.65, -0.4], [-3.15, 2.05, -0.3]], r: [0.09, 0.028], at: 18 },
  { path: [[2.5, -0.5, 0.55], [2.15, -0.95, 1.0], [1.65, -1.2, 1.45]], r: [0.08, 0.028], at: 22 },
  { path: [[-0.2, 0.3, -0.15], [-0.6, 0.75, -0.45], [-1.0, 1.15, -0.65]], r: [0.06, 0.022], at: 24 },
];
const kink = (path: P3[], seed: number): P3[] =>
  path.flatMap((p, i) => {
    if (i === path.length - 1) return [p];
    const q = path[i + 1];
    const m: P3 = [(p[0] + q[0]) / 2 + (rnd(i, seed) - 0.5) * 0.22, (p[1] + q[1]) / 2 + (rnd(i, seed + 1) - 0.5) * 0.16, (p[2] + q[2]) / 2];
    return [p, m];
  });
const TWIG_G = TWIGS.map((t, i) => tube(kink(t.path, 70 + i), t.r[0] * 0.38, t.r[1] * 0.5, 80, 10).g);
/** Flower clusters: position, blossom count, spread, pop-in frame (u), leaves. */
const CLUSTERS: { at: P3; n: number; spread: number; u: number; leaves: number }[] = [
  { at: [2.6, 2.45, 0.2], n: 16, spread: 0.5, u: 20, leaves: 5 },
  { at: [2.05, 1.65, 0.05], n: 8, spread: 0.32, u: 24, leaves: 3 },
  { at: [-3.15, 2.05, -0.3], n: 15, spread: 0.5, u: 24, leaves: 5 },
  { at: [-2.5, 1.6, -0.4], n: 7, spread: 0.3, u: 28, leaves: 3 },
  { at: [1.65, -1.2, 1.45], n: 14, spread: 0.45, u: 26, leaves: 5 },
  { at: [-1.0, 1.15, -0.65], n: 7, spread: 0.3, u: 30, leaves: 3 },
  { at: [-1.75, 0.85, 0.1], n: 10, spread: 0.36, u: 32, leaves: 4 },
  { at: [3.4, -0.3, 1.2], n: 12, spread: 0.42, u: 18, leaves: 4 },
  { at: [-2.9, 0.85, 0.0], n: 9, spread: 0.34, u: 34, leaves: 3 },
];
const CLUSTER_G = CLUSTERS.map((c, i) => cluster(c.n, c.spread, 300 + i * 7, c.leaves));

/** Fox along the bough (arc length s, right to left): runs in, stops among the flowers at the cut, looks around. */
const STEP = 96; // the scale-step to the close shot (u); the fox stops here
const S_STOP = 0.5;
const FOX = 1.25;
const LEN = BOUGH.curve.getLength();
const RUN = 0.0486 / LEN; // arc fraction per frame: the clip's own run speed at this size, so the feet don't slide
const WALK = 0.022 / LEN;
const foxS = (u: number) => (u < STEP ? S_STOP - RUN * (STEP - u) : u < 150 ? S_STOP : S_STOP + WALK * (u - 150));
const onBough = (s: number) => {
  const c = BOUGH.curve;
  const t = Math.min(1, Math.max(0, s));
  const p = c.getPointAt(t), d = c.getTangentAt(t);
  const r = BOUGH_R0 + (BOUGH_R1 - BOUGH_R0) * t;
  return { p: [p.x, p.y + r * 0.9, p.z] as P3, yaw: Math.atan2(d.x, d.z), pitch: -Math.atan2(d.y, Math.hypot(d.x, d.z)) };
};

const pop = (u: number, at: number, len = 16) => {
  const k = Math.min(1, Math.max(0, (u - at) / len));
  return k <= 0 ? 0 : 1 - Math.pow(1 - k, 3) + 0.12 * Math.sin(k * Math.PI) * (1 - k);
};

/** The rewards world (3D only). u is the v6 timeline; framing 0 wide, 1 close on the fox (from the step, and on the card). */
export const Bough: React.FC<{ u: number; framing?: number; fine?: number }> = ({ u, framing, fine = 1 }) => {
  const t = u / 24;
  const cut = framing ?? (u >= STEP ? 1 : 0);
  const sweep = expoOut(ramp(u, 8, 36));
  const fs = foxS(u);
  const fox = onBough(fs);
  const stop = onBough(S_STOP).p;
  const du = u - 150;
  const cam = cut === 2
    ? // the card's print: the flowering top-right twig under the loupe's focus, the fox along the bottom edge
      { pos: [0.3 - du * 0.004, 2.1, 5.6] as P3, target: [0.25 - du * 0.004, 2.0, 0] as P3, fov: 44 }
    : cut === 0
    ? { pos: [1.4 - u * 0.012, 1.0 + u * 0.002, 6.9 - u * 0.014] as P3, target: [0.75 - u * 0.009, 0.9, 0] as P3, fov: 36 }
    : (() => {
        const fx = u < 150 ? stop[0] : 0.6 * fox.p[0] + 0.4 * stop[0];
        return { pos: [fx + 1.3 - (u - STEP) * 0.011, stop[1] + 0.85, stop[2] + 3.7 - (u - STEP) * 0.008] as P3, target: [fx - 0.1 - (u - STEP) * 0.004, stop[1] + 0.5, stop[2]] as P3, fov: 32 };
      })();
  const clip = u < STEP ? "Run" : u < 150 ? "Survey" : "Walk";
  const clipT = u < STEP ? t : u < 150 ? (u - STEP) / 24 : (u - 150) / 24;
  const green = { palette: PAL.green, seed: 31, map: barkTex, mapAmt: 1, follow: 0.1, angleDeg: 28, periodFrac: 0.0052, toneGamma: 1.3, wash: 0.25 };
  // the reference's blossoms are pale lavender cut with violet line, not solid purple
  const bloom = [["#3b2290", 0], ["#7f5fd6", 0.38], ["#c8b4f3", 0.74], ["#f1eafd", 1]] as typeof PAL.violet;
  return (
    <World aa>
      <Cam {...cam} />
      {/* depth scale per framing: the close shot keeps the wide shot's line pitch instead of magnifying it */}
      <RefDepth.Provider value={cut === 0 ? 6.4 : cut === 1 ? 3.7 : 5.4}>
        <Detail.Provider value={{ ...ENGRAVE_FINE, periodScale: fine }}>
          <group position={[3.8 * (1 - sweep), -2.6 * (1 - sweep), 0.4 * (1 - sweep)]} rotation={[0, 0, -0.12 * (1 - sweep)]}>
            <EMesh g={BOUGH.g} m={green as never} />
            <group position={[1.2 * (1 - pop(u, 4, 26)), 1.6 * (1 - pop(u, 4, 26)), 0]}>
              <EMesh g={LIMB.g} m={{ ...green, seed: 36, atmos: 0.12 } as never} />
            </group>
            {BURLS.map((b, i) => (
              <EMesh key={`k${i}`} g={BURL_G} m={{ ...green, seed: 37 + i } as never} pos={b.at} scale={b.s} />
            ))}
            {TWIGS.map((tw, i) => {
              const g = pop(u, tw.at, 18);
              if (g <= 0) return null;
              const [bx, by, bz] = tw.path[0];
              const sway = 0.025 * Math.sin(t * 1.3 + i * 1.7);
              return (
                <group key={`t${i}`} position={[bx, by, bz]} rotation={[0, 0, sway]} scale={g}>
                  <group position={[-bx, -by, -bz]}>
                    <EMesh g={TWIG_G[i]} m={{ palette: PAL.violet, seed: 40 + i, follow: 0.6 }} />
                  </group>
                </group>
              );
            })}
            {CLUSTERS.map((c, i) => {
              const g = pop(u, c.u, 16);
              if (g <= 0) return null;
              const sway = 0.07 * Math.sin(t * 1.4 + i * 2.1);
              return (
                <group key={`c${i}`} position={c.at} rotation={[sway * 0.5, 0, sway]} scale={g}>
                  {CLUSTER_G[i].leaves ? <EMesh g={CLUSTER_G[i].leaves!} m={{ palette: PAL.green, seed: 60 + i, follow: 0.6, wobble: 0.6 }} double /> : null}
                  <EMesh g={CLUSTER_G[i].petals} m={{ palette: bloom, seed: 80 + i, follow: 0.12, angleDeg: 35, periodFrac: 0.0042, wash: 0.4, foil: i === 0 ? 0.2 : 0 }} double />
                  <EMesh g={CLUSTER_G[i].eyes} m={{ palette: PAL.violet, seed: 90 + i, albedo: 0.2 }} />
                </group>
              );
            })}
          </group>
          {u >= 20 ? (
            <group position={fox.p} rotation={[0, fox.yaw, 0]}>
              <group rotation={[fox.pitch, 0, 0]}>
                <Rig url={M + "Fox.glb"} size={FOX} clip={clip} time={clipT} smooth m={{ palette: PAL.violet, foil: 0.3, follow: 0.35, hatch: 0.7, wash: 0.3 }} foilPhase={t * 0.15} />
              </group>
            </group>
          ) : null}
        </Detail.Provider>
      </RefDepth.Provider>
    </World>
  );
};

/** The rewards world with its settled ground, as the card prints it (u on the v6 timeline). `fine` < 1 engraves it
 * finer, so the loupe's 3x push still lands on line work at the film's own pitch instead of magnified blobs. */
export const RewardsWorld: React.FC<{ F: number; framing?: number; fine?: number }> = ({ F, framing, fine }) => (
  <AbsoluteFill>
    <Ground G={F + INTRO} fine={fine} />
    <Bough u={F} framing={framing} fine={fine} />
  </AbsoluteFill>
);

/** 0 to 150 + INTRO: the opening and the rewards claim. */
export const RewardsTake: React.FC<{ from: number }> = ({ from }) => {
  const G = useCurrentFrame() + from;
  const u = G - INTRO;
  const copy = useCopy();
  // the paper breathes in while the pen works, then the scale-step lands on the field and keeps a slow push
  const s = G < FIELD_AT ? 1.07 - 0.05 * ramp(G, 12, FIELD_AT) : 1.0 + 0.035 * ramp(G, FIELD_AT, 150 + INTRO);
  const head = G >= 176 ? expoOut(ramp(G, 176, 192)) : 0;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${s})` }}>
        <Ground G={G} />
      </AbsoluteFill>
      {/* the words sit under the 3D layer, so the twig and its flowers cross in front of them */}
      {head > 0 ? <Headline text={copy.claim1.head} sub={copy.claim1.sub} grad={["#3b23a0", "#6a4fd0", "#2f7a4a"]} t={head} size={fit(copy.claim1.head, 92, 1500)} /> : null}
      {u >= 2 ? <Bough u={u} /> : null}
    </AbsoluteFill>
  );
};
