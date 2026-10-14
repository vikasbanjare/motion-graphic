import React, { useMemo } from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import * as THREE from "three";
import { Cam, Detail, EMesh, RefDepth, World } from "../v2/three.tsx";
import { Paper } from "../../../ensemble/layers.tsx";
import { Field } from "../../../ensemble/paint2d.tsx";
import { Globe } from "../../../ensemble/globe-type.tsx";
import { LookCtx, type Look } from "../../../ensemble/look.ts";
import { polyD, type Pt } from "../../../ensemble/paths.ts";
import { expoOut, pop, ramp } from "../../../ensemble/score.ts";
import { Rig } from "./rig.tsx";
import { ENGRAVE_FINE, Headline, Holo, Lens, M, Mottle, PAL } from "./kit.tsx";
import { T } from "../v5/looks.ts";
import { RewardsWorld } from "./intro.tsx";
import { blob, leafGeo, rnd, type P3 } from "./geo.ts";
import { fit, useCopy } from "./copy.tsx";

/**
 * CRED v6 worlds. Every subject is a licensed 3D model (public/custom/cred-v6/models/CREDITS.md) drawn through the
 * engraving shader in a two-ink palette; every claim has a metaphor instead of a literal object:
 *   5% rewards on online shopping   a fox (the sharp shopper) walking through a flowering hedge
 *   the card                        the same world printed on the card, tilted under a loupe, with a foil band
 *   redeem on flights, hotels       street lanterns lighting the way at dusk, a globe rising behind
 *   2,000+ products on CRED store   a still life on a colonnade of plinths
 *   zero joining fee                an abalone shell opening in the deep, all foil (nothing to pay to get in)
 */
const W = 1920, H = 1080;
const look = (paper: string, ink: string): Look => ({ paper, ink, inkSoft: ink, washes: [paper], accent: ink, weight: 2.2, grain: 0.32, seed: 5 });

/** Scale-step: the reference cuts by jumping scale on a beat. Returns the framing index active at frame F. */
const step = (F: number, cuts: number[]) => cuts.filter((c) => F >= c).length;

// ---- 0-1. the opening and the rewards world live in intro.tsx (v6.5) ---------------------------------------------

// ---- 2. the card: the world becomes the card's print, under a loupe -----------------------------------------------
/** Strip copy as fixed slots along the strip, so the close-up can land on a whole phrase (no clipped letters). */
const SLOT = 835;
/** Strip slide (strip px): steady, easing to a slow drift as the camera arrives in close-up; never stops. */
const SLIDE = (() => {
  const out: number[] = [];
  let acc = 0;
  for (let f = 0; f <= 800; f++) {
    out.push(acc);
    const k = Math.min(1, Math.max(0, (f - (T.macro - 20)) / (T.push - T.macro + 20)));
    acc += f < T.reveal ? 0 : 3 - 2.1 * (k * k * (3 - 2 * k));
  }
  return out;
})();
const slideAt = (F: number) => SLIDE[Math.max(0, Math.min(SLIDE.length - 1, Math.round(F)))];
/** Strip u (along the strip) under the close-up's centre, and the frame where the phrase there is centred. */
const U_FOCUS = 1027;
const HOLD = 272;

/** The foil strip: rainbow film, fine guilloche waves, letterspaced copy sliding through it. */
const Strip: React.FC<{ w: number; h: number; phase: number; F: number; font: number; copy: number }> = ({ w, h, phase, F, font, copy }) => {
  const rows = 9;
  const c0 = U_FOCUS + slideAt(HOLD) - slideAt(F);
  const PHRASES = useCopy().strip;
  return (
    <div style={{ position: "relative", width: w, height: h, overflow: "hidden" }}>
      <Holo phase={phase} style={{ inset: 0, mixBlendMode: "normal", opacity: 0.92 }} />
      <svg width={w} height={h} style={{ position: "absolute", inset: 0, mixBlendMode: "soft-light" }}>
        {Array.from({ length: rows }, (_, i) => (
          <path key={i} d={polyD(Array.from({ length: 90 }, (_, k) => [(k / 89) * w, h * ((i + 0.5) / rows) + h * 0.05 * Math.sin((k / 89) * Math.PI * 6 + i * 0.7 + phase * 6)] as Pt))} fill="none" stroke="#ffffff" strokeWidth={Math.max(1, h / 70)} opacity={0.8} />
        ))}
      </svg>
      {Array.from({ length: 7 }, (_, j) => {
        const k = j - 2;
        const c = c0 + k * SLOT;
        if (c < -1000 || c > w + 1000) return null;
        return (
          <React.Fragment key={j}>
            <div style={{ position: "absolute", left: c - 600, width: 1200, top: 0, height: h, display: "flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap", fontFamily: "Lexend", fontWeight: 500, fontSize: font, letterSpacing: font * 0.28, paddingLeft: font * 0.28, color: "rgba(255,255,255,0.97)", textShadow: "0 0 3px rgba(60,40,120,0.4)", opacity: copy }}>
              {PHRASES[((k % 2) + 2) % 2]}
            </div>
            <div style={{ position: "absolute", left: c + SLOT / 2 - 4, top: h / 2 - 4, width: 8, height: 8, borderRadius: 4, background: "#fff", opacity: copy * 0.9 }} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

/** The card's print: the rewards world, greened like a note, with the official logo. */
const Print: React.FC<{ F: number }> = ({ F }) => (
  <AbsoluteFill>
    <RewardsWorld F={F} framing={2} fine={0.4} />
    <AbsoluteFill style={{ background: "#2c8c62", mixBlendMode: "multiply", opacity: 0.55 }} />
  </AbsoluteFill>
);

const CardFace: React.FC<{ F: number; holo: number; copy: number }> = ({ F, holo, copy }) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, borderRadius: 64, overflow: "hidden", boxShadow: "0 0 0 10px #f2f6e8 inset" }}>
    <Print F={F} />
    <div style={{ position: "absolute", left: 1180, top: -400, transform: "rotate(68deg)", transformOrigin: "0 0" }}>
      <Strip w={2200} h={96} phase={holo} F={F} font={30} copy={copy} />
    </div>
    <Img src={staticFile(useCopy().logo)} style={{ position: "absolute", left: 110, top: 90, height: 170, maxWidth: 560, objectFit: "contain", objectPosition: "left center" }} />
  </div>
);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** Strip centre on the card (card px): the push ends with the strip horizontal across the loupe. */
const FOCUS = { x: 1520, y: 570 };

/**
 * One continuous camera on the card from 150 to the magnifier: the frame shrinks into the card and tilts back, keeps
 * breathing, then pushes into the foil strip while turning it level. The print keeps living (the fox never stops).
 */
const cardPose = (F: number) => {
  const k = expoOut(ramp(F, T.reveal, T.reveal + 22));
  const t = (F - T.reveal) / 24;
  const s0 = 1 - 0.36 * k + 0.035 * t; // the card fills the loupe, as the reference's note does
  const rx0 = 38 * k + 4 * Math.sin(t * 1.3) * k;
  const rz0 = -9 * k + 3 * t * k;
  const ty0 = -30 * k + 8 * Math.sin(t * 0.9) * k;
  const z = easeInOut(ramp(F, T.macro - 18, T.push + 4));
  const drift = Math.max(0, F - (T.push + 4)) * 0.012;
  return {
    s: lerp(s0, 3.0, z) + drift,
    rx: lerp(rx0, 0, z),
    rz: lerp(rz0, -68, z),
    ty: lerp(ty0, 0, z),
    fx: lerp(W / 2, FOCUS.x, z),
    fy: lerp(H / 2, FOCUS.y, z),
  };
};

export const CardTake: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const copy = useCopy();
  const p = cardPose(F);
  const k = expoOut(ramp(F, T.reveal, T.reveal + 22));
  const head = expoOut(ramp(F, T.reveal + 18, T.reveal + 32)) * (1 - ramp(F, T.macro - 16, T.macro - 4));
  return (
    <AbsoluteFill style={{ background: "#0a0c0b" }}>
      <Field f={F} pitch={12} lambda={150} amp={4} speed={1.6} width={1.4} color="#1f3329" opacity={1} />
      <AbsoluteFill style={{ perspective: 1800 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transformOrigin: "0 0", transform: `translate(${W / 2}px, ${H / 2 + p.ty}px) scale(${p.s}) rotateX(${p.rx}deg) rotateZ(${p.rz}deg) translate(${-p.fx}px, ${-p.fy}px)` }}>
          <CardFace F={F} holo={(F - T.reveal) / 70} copy={1 - ramp(F, OPEN - 2, OPEN + 6)} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: 1 - ramp(F, 252, 272) }}>
        <Lens r={0.62 + 0.4 * (1 - k)} soft={0.3} />
      </AbsoluteFill>
      {head > 0 ? <Headline text={copy.card.head} sub={copy.card.sub} grad={["#d9f6e4", "#ffffff", "#b8f0d0"]} t={head} size={fit(copy.card.head, 60, 1500)} top={70} /> : null}
    </AbsoluteFill>
  );
};

/** The strip splits open along its centre line: the band (screen px) through which the travel world shows. */
export const OPEN = 276;
export const band = (F: number) => {
  const o = easeInOut(ramp(F, OPEN, OPEN + 24));
  const half = (H / 2 + 40) * o;
  return { top: H / 2 - half, bottom: H / 2 + half, o, on: F >= OPEN };
};

/** The two foil edges of the split strip, riding outward with the band. */
export const FoilEdges: React.FC<{ F: number }> = ({ F }) => {
  const b = band(F);
  if (!b.on || b.o >= 1) return null;
  const th = 14 + 30 * (1 - b.o);
  const ph = (F - T.reveal) / 70;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <Holo phase={ph} style={{ left: 0, right: 0, top: b.top - th, height: th, mixBlendMode: "normal", opacity: 1, boxShadow: "0 -6px 24px rgba(0,0,0,0.25)" }} />
      <Holo phase={ph + 0.3} style={{ left: 0, right: 0, top: b.bottom, height: th, mixBlendMode: "normal", opacity: 1, boxShadow: "0 6px 24px rgba(0,0,0,0.25)" }} />
    </AbsoluteFill>
  );
};

// ---- 3. travel: a hotel at dusk, flights arcing over the globe --------------------------------------------------
/** The lantern's beam: a soft cone of light from the lamp that sweeps across the sky, "lighting the way" (the
 * reference sweeps a lighthouse beam; this is the same device on our own subject). */
const Beam: React.FC<{ F: number; x: number; y: number }> = ({ F, x, y }) => {
  const on = expoOut(ramp(F, 300, 322));
  if (on <= 0) return null;
  const a = (-14 + 22 * Math.sin((F - 300) / 38)) * (Math.PI / 180);
  const L = 2600, half = 0.2 * on;
  const p1: Pt = [x + L * Math.cos(a - half), y + L * Math.sin(a - half)];
  const p2: Pt = [x + L * Math.cos(a + half), y + L * Math.sin(a + half)];
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0, mixBlendMode: "screen", opacity: 0.85 * on }}>
      <defs>
        <radialGradient id="beam-g" gradientUnits="userSpaceOnUse" cx={x} cy={y} r={L}>
          <stop offset="0" stopColor="#fffbe6" stopOpacity={0.95} />
          <stop offset="0.45" stopColor="#e9e2ff" stopOpacity={0.45} />
          <stop offset="1" stopColor="#d6d0ea" stopOpacity={0} />
        </radialGradient>
        <filter id="beam-soft"><feGaussianBlur stdDeviation={10} /></filter>
      </defs>
      <path d={`M${x},${y} L${p1[0]},${p1[1]} L${p2[0]},${p2[1]} Z`} fill="url(#beam-g)" filter="url(#beam-soft)" />
      <circle cx={x} cy={y} r={95} fill="#fffbe6" opacity={0.9} filter="url(#beam-soft)" />
      <circle cx={x} cy={y} r={34} fill="#ffffff" opacity={0.95} />
    </svg>
  );
};

/** Great-circle arc between two lon/lat points, lifted off the globe, projected like <Globe> (orthographic). */
const flightArc = (a: [number, number], b: [number, number], lon0: number, lat0: number, R: number, cx: number, cy: number): Pt[] => {
  const r = Math.PI / 180;
  const v = ([lo, la]: [number, number]) => [Math.cos(la * r) * Math.cos(lo * r), Math.cos(la * r) * Math.sin(lo * r), Math.sin(la * r)];
  const A = v(a), B = v(b);
  const om = Math.acos(Math.min(1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2]));
  const out: Pt[] = [];
  for (let i = 0; i <= 60; i++) {
    const t = i / 60;
    const s0 = Math.sin((1 - t) * om) / Math.sin(om), s1 = Math.sin(t * om) / Math.sin(om);
    const p = [A[0] * s0 + B[0] * s1, A[1] * s0 + B[1] * s1, A[2] * s0 + B[2] * s1];
    const lift = 1 + 0.22 * Math.sin(Math.PI * t);
    const lon = Math.atan2(p[1], p[0]) / r, lat = Math.asin(p[2]) / r;
    const l = (lon - lon0) * r, ph = lat * r, p0 = lat0 * r;
    const x = Math.cos(ph) * Math.sin(l), y = -(Math.cos(p0) * Math.sin(ph) - Math.sin(p0) * Math.cos(ph) * Math.cos(l));
    out.push([cx + x * R * lift, cy + y * R * lift]);
  }
  return out;
};
const PLANE = "M0,-14 L3,-4 L14,2 L14,5 L3,2 L2,10 L6,13 L6,15 L0,13 L-6,15 L-6,13 L-2,10 L-3,2 L-14,5 L-14,2 L-3,-4 Z";
const ROUTES: { to: [number, number]; at: number }[] = [
  { to: [55.27, 25.2], at: 300 },
  { to: [-0.13, 51.51], at: 312 },
  { to: [103.82, 1.35], at: 324 },
  { to: [2.35, 48.86], at: 340 },
];

const Flights: React.FC<{ F: number; cx: number; cy: number; R: number; lon: number }> = ({ F, cx, cy, R, lon }) => {
  const home: [number, number] = [72.88, 19.08];
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
      {ROUTES.map((rt, i) => {
        const pts = flightArc(home, rt.to, lon, 18, R, cx, cy);
        const k = Math.min(1, Math.max(0, (F - rt.at) / 30));
        const e = 1 - Math.pow(1 - k, 2);
        if (e <= 0) return null;
        const n = Math.max(2, Math.round(e * (pts.length - 1)));
        const seg = pts.slice(0, n + 1);
        const [px, py] = seg[seg.length - 1];
        const [qx, qy] = seg[Math.max(0, seg.length - 2)];
        const ang = (Math.atan2(py - qy, px - qx) * 180) / Math.PI + 90;
        return (
          <g key={i}>
            <path d={polyD(seg)} fill="none" stroke="#3d3a8f" strokeWidth={2.4} strokeDasharray="2 9" strokeLinecap="round" opacity={0.85} />
            <circle cx={pts[0][0]} cy={pts[0][1]} r={6} fill="#3d3a8f" />
            {k < 1 ? (
              <g transform={`translate(${px},${py}) rotate(${ang}) scale(1.5)`}>
                <path d={PLANE} fill="#2a2770" stroke="#f2eefa" strokeWidth={0.8} />
              </g>
            ) : (
              <circle cx={px} cy={py} r={5} fill="#f2eefa" stroke="#3d3a8f" strokeWidth={2} />
            )}
          </g>
        );
      })}
    </svg>
  );
};

/**
 * 270-404. Revealed through the split foil strip (band(F) from the card take), already composed, then:
 *   flights arc out from India over the globe with planes riding the arcs; a hotel rises on the left, the lantern
 *   lights its door, the fox runs past. Leaves by a dive into the globe whose grid becomes the colonnade's floor.
 */
/** Frame where the centred globe matches the colonnade floor; floor radius seen from the overhead camera / globe radius. */
export const MATCH = 384;
/** The lantern's lamp (world units) and a projection to screen px with a take's camera, so 2D light can sit on it. */
const LAMP_AT: [number, number, number] = [-4.76, 2.84, -2.1]; // solved from the lamp's spot in a rendered frame
/** Rock islands under the lanterns: the reference stands its heroes on cut-out ground, not an endless floor. */
const MOUNDS: { at: [number, number, number]; s: [number, number, number]; seed: number }[] = [
  { at: [-3.3, -0.75, -2.4], s: [3.6, 1.1, 2.6], seed: 51 },
  { at: [-0.9, -0.6, -6.2], s: [2.4, 0.8, 1.8], seed: 52 },
  { at: [1.1, -0.55, -10.5], s: [2.0, 0.7, 1.5], seed: 53 },
];
const MOUND_G = MOUNDS.map((m) => blob(m.s[0], m.s[1], m.s[2], 0.18, m.seed, 40));

const toScreen = (p: [number, number, number], c: { pos: [number, number, number]; target: [number, number, number]; fov: number }): Pt => {
  const cam = new THREE.PerspectiveCamera(c.fov, W / H, 0.05, 800);
  cam.position.set(...c.pos);
  cam.lookAt(new THREE.Vector3(...c.target));
  cam.updateMatrixWorld();
  const v = new THREE.Vector3(...p).project(cam);
  return [(v.x * 0.5 + 0.5) * W, (-v.y * 0.5 + 0.5) * H];
};
const GLOBE_TO_FLOOR = 941 / 340;

export const TravelTake: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const copy = useCopy();
  const t = F / 24;
  const b = band(F);
  const cut = step(F, [336]);
  const cam = cut === 0
    ? { pos: [-0.8 + (F - T.swap) * 0.018, 1.35, 8.4] as [number, number, number], target: [0.2, 1.45, -2] as [number, number, number], fov: 36 }
    : { pos: [-0.2 + (F - 336) * 0.018, 1.2, 7.2] as [number, number, number], target: [0.4, 1.65, -2] as [number, number, number], fov: 34 };
  const lon = 40 + 22 * ramp(F, T.swap, MATCH - 30) + 0.9 * Math.max(0, F - (MATCH - 30)); // keeps turning through the match
  const G = { cx: W * 0.7, cy: H * 0.6, R: 340 };
  // exit: the globe glides to frame centre and grows to the size of the colonnade's floor seen from above (MATCH)
  const d = 0.85 * easeInOut(ramp(F, MATCH - 30, MATCH)) + 0.15 * ramp(F, MATCH - 30, MATCH);
  // the world arrives still settling (carries the push through the open strip), then keeps a slow push
  const settle = ramp(F, OPEN, OPEN + 64);
  const mag = 1.16 - 0.12 * (1 - (1 - settle) ** 2) + 0.05 * ramp(F, OPEN, MATCH - 30);
  const S = lerp(mag, GLOBE_TO_FLOOR, d) + 0.004 * Math.max(0, F - MATCH);
  return (
    <LookCtx.Provider value={look("#d6d0ea", "#4a50a6")}>
      <AbsoluteFill style={{ clipPath: b.o < 1 ? `inset(${b.top}px 0px ${H - b.bottom}px 0px)` : undefined }}>
        <AbsoluteFill style={{ transformOrigin: `${G.cx}px ${G.cy}px`, transform: `translate(${(W / 2 - G.cx) * d}px, ${(H / 2 - G.cy) * d}px) scale(${S})` }}>
          <Paper color="#d6d0ea" grain={0.35} />
          <Mottle tint={[0.66, 0.62, 0.84]} seed={4} />
          <Field f={F} pitch={11} lambda={180} amp={3} speed={1.4} width={1.35} color="#9c94c8" opacity={0.95} />
          <Globe cx={G.cx} cy={G.cy} r={G.R} lon={lon} lat={18} draw={expoOut(ramp(F, 236, 270))} land="#c3bce4" graticule={0.45} />
          <Flights F={F} cx={G.cx} cy={G.cy} R={G.R} lon={lon} />
          <World aa>
            <Cam {...cam} />
            <RefDepth.Provider value={7}>
              <Detail.Provider value={ENGRAVE_FINE}>
                {MOUNDS.map((m, i) => (
                  <EMesh key={`m${i}`} g={MOUND_G[i]} m={{ palette: PAL.indigo, seed: m.seed, follow: 0.25, angleDeg: 24, albedoNoise: 0.3, noiseScale: 6, atmos: 0.18 * i }} pos={m.at} />
                ))}
                <Rig url={M + "Lantern.glb"} size={4.2} pos={[-3.3, -0.3, -2.4]} rot={[0, -2.4, 0]} m={{ palette: PAL.indigo, foil: 0.5, seed: 40 }} foilPhase={t * 0.1} />
                {/* a street of lanterns receding behind the hero: the way being lit */}
                <Rig url={M + "Lantern.glb"} size={3.2} pos={[-0.9, -0.3, -6.2]} rot={[0, -2.2, 0]} m={{ palette: PAL.indigo, atmos: 0.35, seed: 42 }} />
                <Rig url={M + "Lantern.glb"} size={2.8} pos={[1.1, -0.3, -10.5]} rot={[0, -2.0, 0]} m={{ palette: PAL.indigo, atmos: 0.55, seed: 43 }} />
                {F >= T.swap ? <Rig url={M + "Fox.glb"} smooth size={1.5} pos={[-1.3 - (F - T.swap) * 0.06, -0.2, -2.0]} rot={[0, -Math.PI / 2 + 0.15, 0]} clip="Run" time={t} m={{ palette: PAL.indigo, foil: 0.25 }} foilPhase={t * 0.2} /> : null}
              </Detail.Provider>
            </RefDepth.Provider>
          </World>
        </AbsoluteFill>
        {/* the 3D layer is not under the globe's CSS zoom, so the beam sits beside it and leaves before the dive */}
        <AbsoluteFill style={{ opacity: 1 - ramp(F, MATCH - 36, MATCH - 26) }}>
          {(() => {
            const p = toScreen(LAMP_AT, cam);
            return <Beam F={F} x={p[0]} y={p[1]} />;
          })()}
        </AbsoluteFill>
        {F > T.tilt ? (
          <AbsoluteFill style={{ opacity: 1 - ramp(F, MATCH - 30, MATCH - 18) }}>
            <Headline text={copy.claim2.head} sub={copy.claim2.sub} grad={["#26238a", "#5a4fc0", "#2a6aa0"]} t={expoOut(ramp(F, T.tilt + 6, T.tilt + 20))} size={fit(copy.claim2.head, 76, 1500)} top={130} />
          </AbsoluteFill>
        ) : null}
      </AbsoluteFill>
      <FoilEdges F={F} />
    </LookCtx.Provider>
  );
};

// ---- 4. products: a rotunda of classical columns ------------------------------------------------------------------
/** Classical column parts (base mouldings, fluted shaft, echinus + abacus capital), built once. */
const lathe = (pts: [number, number][]) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), 40);
const COLUMN = (() => {
  const H0 = 4.4;
  const base = lathe([[0, 0], [0.62, 0], [0.62, 0.12], [0.58, 0.14], [0.6, 0.2], [0.54, 0.26], [0.5, 0.3], [0.48, 0.34], [0, 0.34]]);
  const shaft = new THREE.CylinderGeometry(0.4, 0.46, H0 - 0.9, 48, 12, true);
  const pos = shaft.getAttribute("position") as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i);
    const a = Math.atan2(z, x), r = Math.hypot(x, z);
    const k = 1 - 0.06 * Math.max(0, Math.cos(a * 20)); // 20 flutes
    pos.setXYZ(i, Math.cos(a) * r * k, pos.getY(i), Math.sin(a) * r * k);
  }
  shaft.computeVertexNormals();
  shaft.translate(0, 0.34 + (H0 - 0.9) / 2, 0);
  const cap = lathe([[0, H0 - 0.56], [0.42, H0 - 0.56], [0.46, H0 - 0.5], [0.56, H0 - 0.38], [0.62, H0 - 0.3], [0, H0 - 0.3]]);
  const abacus = new THREE.BoxGeometry(1.36, 0.3, 1.36);
  abacus.translate(0, H0 - 0.15, 0);
  return { base, shaft, cap, abacus, h: H0 };
})();
const RING_R = 4.6;
const beamG = new THREE.TorusGeometry(RING_R, 0.32, 10, 96);
const plinthG = new THREE.CylinderGeometry(0.9, 0.98, 1.1, 40);
const floorTex = (() => {
  const c = document.createElement("canvas");
  c.width = c.height = 1024;
  const x = c.getContext("2d")!;
  x.fillStyle = "#e9e1d6";
  x.fillRect(0, 0, 1024, 1024);
  x.translate(512, 512);
  x.strokeStyle = "#8a6f5a";
  for (let i = 0; i < 96; i++) {
    x.lineWidth = i % 4 ? 1 : 2.5;
    x.beginPath();
    x.moveTo(0, 0);
    const a = (i / 96) * Math.PI * 2;
    x.lineTo(Math.cos(a) * 520, Math.sin(a) * 520);
    x.stroke();
  }
  for (let r = 40; r < 520; r += 34) {
    x.lineWidth = 2;
    x.beginPath();
    for (let k = 0; k <= 360; k++) {
      const a = (k / 360) * Math.PI * 2;
      const rr = r + 6 * Math.sin(a * 12 + r * 0.05);
      if (k) x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
      else x.moveTo(Math.cos(a) * rr, Math.sin(a) * rr);
    }
    x.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  return t;
})();
const floorG = new THREE.CircleGeometry(9, 96);

const Column: React.FC<{ pos: [number, number, number]; seed: number }> = ({ pos, seed }) => {
  const m = { palette: PAL.terra, seed, angleDeg: 6 };
  return (
    <group position={pos}>
      <EMesh g={COLUMN.base} m={m} />
      <EMesh g={COLUMN.shaft} m={{ ...m, follow: 0.6 }} double />
      <EMesh g={COLUMN.cap} m={m} />
      <EMesh g={COLUMN.abacus} m={m} />
    </group>
  );
};

/** A guilloche rosette (banknote line work) for the temple wall and the glass panels: thin ink on cream. */
const rosetteTex = (ink: string, paper: string, n = 72) => {
  const c = document.createElement("canvas");
  c.width = c.height = 1024;
  const x = c.getContext("2d")!;
  x.fillStyle = paper;
  x.fillRect(0, 0, 1024, 1024);
  x.strokeStyle = ink;
  x.lineWidth = 1.6;
  x.translate(512, 512);
  for (let k = 0; k < n; k++) {
    x.globalAlpha = k % 6 ? 0.55 : 0.9;
    x.beginPath();
    for (let i = 0; i <= 720; i++) {
      const a = (i / 720) * Math.PI * 2;
      const r = 300 + 120 * Math.sin(a * 7 + (k / n) * Math.PI * 2) + 60 * Math.sin(a * 19 - (k / n) * Math.PI * 4);
      if (i) x.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      else x.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    x.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  return t;
};
const wallTex = rosetteTex("#b0705a", "#f3e2d4", 110);
const panelTex = rosetteTex("#6a5a9a", "#f4ecf8", 48);
const wallG = new THREE.PlaneGeometry(14, 8);
const panelG = new THREE.PlaneGeometry(1.25, 1.7);
const frameG = new THREE.BoxGeometry(1.42, 1.87, 0.06);
/** The close shot's frontal set (the reference's temple): items in a row, each under a holographic glass panel. */
const ROW: [string, number, number, Partial<{ foil: number }>][] = [
  ["BoomBox.glb", -2.1, 0.95, {}],
  ["WaterBottle.glb", -0.7, 1.1, {}],
  ["MaterialsVariantsShoe.glb", 0.7, 1.05, { foil: 0.6 }],
  ["Avocado.glb", 2.1, 0.8, {}],
];

export const ProductsTake: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const copy = useCopy();
  const t = F / 24;
  // overhead (the ring of capitals, as the reference opens its temple), then the crane tilts down to eye level
  const crane = expoOut(ramp(F, MATCH + 2, MATCH + 42));
  const cut = step(F, [446]);
  const orbit = 0.18 + (F - MATCH) * 0.003;
  const eye: [number, number, number] = [Math.sin(orbit) * 9.2, 2.4, Math.cos(orbit) * 9.2];
  const over: [number, number, number] = [0.01, 15, 0.4];
  // swing outward first, then down, so the crane never passes through the ring beam
  const hr = 0.4 + 8.8 * expoOut(Math.min(1, crane * 2.2));
  const pos: [number, number, number] = cut === 0 ? [Math.sin(orbit) * hr, over[1] + (eye[1] - over[1]) * crane, Math.cos(orbit) * hr] : [0.25 - (F - 446) * 0.006, 2.05, 6.3 - (F - 446) * 0.012];
  const target: [number, number, number] = cut === 0 ? [0, 2.2 * crane, 0] : [0.1 - (F - 446) * 0.004, 1.95, 0];
  const items: [string, number, number, number, number, Partial<{ foil: number }>][] = [
    ["BoomBox.glb", -2.2, 1.5, 0.9, 409, {}],
    ["WaterBottle.glb", -0.7, 1.7, -1.4, 421, {}],
    ["MaterialsVariantsShoe.glb", 0.8, 1.7, 1.1, 434, { foil: 0.6 }],
    ["Avocado.glb", 2.2, 1.2, -0.7, 459, {}],
  ];
  const cols = Array.from({ length: 10 }, (_, i) => (i / 10) * Math.PI * 2 + 0.31);
  return (
    <LookCtx.Provider value={look("#f1d9c6", "#ad503a")}>
      <AbsoluteFill style={{ opacity: ramp(F, MATCH - 4, MATCH + 4), clipPath: `circle(${941 * (1 + 0.004 * Math.max(0, F - MATCH) / GLOBE_TO_FLOOR) + 1500 * Math.pow(ramp(F, MATCH + 2, MATCH + 20), 1.6)}px at 50% 50%)` }}>
        <Paper color="#f1d9c6" grain={0.35} />
        <Mottle tint={[0.86, 0.66, 0.56]} seed={5} />
        <Field f={F} pitch={12} lambda={130} amp={3} speed={1} width={1.1} color="#e2b9a2" opacity={0.9} />
        <World aa>
          <Cam pos={pos} target={target} fov={cut === 0 ? 38 : 40} />
          <RefDepth.Provider value={7}>
            <Detail.Provider value={{ ...ENGRAVE_FINE, wash: 0.12, toneGamma: 1.3 }}>
              <EMesh g={floorG} m={{ palette: PAL.cream, seed: 59, map: floorTex, mapAmt: 0.85, angleDeg: 4 } as never} rot={[-Math.PI / 2, 0, 0]} />
              {cut === 0 ? (
                <>
                  {cols.map((a, i) => (
                    <Column key={i} pos={[Math.cos(a) * RING_R, 0, Math.sin(a) * RING_R]} seed={60 + i} />
                  ))}
                  <EMesh g={beamG} m={{ palette: PAL.terra, seed: 58, angleDeg: 6 }} pos={[0, COLUMN.h + 0.3, 0]} rot={[Math.PI / 2, 0, 0]} />
                  {items.map(([, x, , z], i) => (
                    <EMesh key={`p${i}`} g={plinthG} m={{ palette: PAL.cream, seed: 70 + i, angleDeg: 10 }} pos={[x, 0.55, z]} />
                  ))}
                  {items.map(([url, x, size, z, at, extra], i) => {
                    const p = F >= at ? pop(F, at) : 0;
                    return p > 0 ? (
                      <Rig key={url} url={M + url} size={size} pos={[x, 1.1 + 2.5 * (1 - p), z]} rot={[0, 0.5 + t * 0.15 + i, 0]} m={{ palette: i % 2 ? PAL.terra : PAL.cream, seed: 80 + i, ...extra }} foilPhase={t * 0.2} />
                    ) : null;
                  })}
                </>
              ) : (
                <>
                  {/* frontal temple: two big columns crop the frame, a rosette wall, a row of glass panels and plinths */}
                  <EMesh g={wallG} m={{ palette: PAL.terra, seed: 57, map: wallTex, mapAmt: 0.55, angleDeg: 4, lift: 0.22 } as never} pos={[0, 3.2, -2.6]} />
                  <group position={[-3.5, 0, 0.3]} scale={1.3}>
                    <Column pos={[0, 0, 0]} seed={66} />
                  </group>
                  <group position={[3.5, 0, 0.3]} scale={1.3}>
                    <Column pos={[0, 0, 0]} seed={67} />
                  </group>
                  {ROW.map(([url, x, size, extra], i) => (
                    <React.Fragment key={url}>
                      <EMesh g={frameG} m={{ palette: PAL.terra, seed: 95 + i, angleDeg: 30, lift: 0.1 }} pos={[x, 1.95, -1.3]} />
                      <EMesh g={panelG} m={{ palette: PAL.lilac, seed: 90 + i, map: panelTex, mapAmt: 1, foil: 0.6, lift: 0.1 } as never} pos={[x, 1.95, -1.25]} live={{ foilPhase: t * 0.25 + i * 0.2 }} />
                      <EMesh g={plinthG} m={{ palette: PAL.cream, seed: 70 + i, angleDeg: 10 }} pos={[x, 0.42, -0.4]} scale={[0.62, 0.76, 0.62]} />
                      <Rig url={M + url} size={size} pos={[x, 0.84, -0.4]} rot={[0, 0.4 + t * 0.35 + i, 0]} m={{ palette: i % 2 ? PAL.terra : PAL.cream, seed: 80 + i, ...extra }} foilPhase={t * 0.2} />
                    </React.Fragment>
                  ))}
                </>
              )}
            </Detail.Provider>
          </RefDepth.Provider>
        </World>
        {F > T.products + 42 ? (
          <>
            <Headline text={copy.claim3.head} sub={copy.claim3.sub} grad={["#8a2a1e", "#c2553c", "#7a3a8a"]} t={expoOut(ramp(F, T.products + 42, T.products + 56))} size={fit(copy.claim3.head, 92, 1500)} top={140} />
          </>
        ) : null}
      </AbsoluteFill>
    </LookCtx.Provider>
  );
};

// ---- mosaic: the reference's pixel-block dissolve, in our palette ----------------------------------------------------
const MC = 16, MR = 9, TW = W / MC, TH = H / MR;
const TILE_AT = Array.from({ length: MC * MR }, (_, i) => 0.62 * rnd(i, 211) + 0.38 * ((i % MC) / (MC - 1)));
/** Mask (data-URL SVG) showing the tiles whose time has come at progress p, and the tiles flashing in colour. */
const mosaic = (p: number) => {
  const rects = TILE_AT.map((at, i) => (p >= at ? `<rect x="${(i % MC) * TW}" y="${Math.floor(i / MC) * TH}" width="${TW + 0.5}" height="${TH + 0.5}"/>` : "")).join("");
  const mask = `url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${rects}</svg>`)}")`;
  const flash = TILE_AT.map((at, i) => ({ i, k: (p - at) / 0.14 })).filter((x) => x.k > 0 && x.k < 1);
  return { mask, flash };
};
const Flash: React.FC<{ tiles: { i: number; k: number }[]; colors: string[] }> = ({ tiles, colors }) => (
  <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
    {tiles.map(({ i, k }) => (
      <rect key={i} x={(i % MC) * TW} y={Math.floor(i / MC) * TH} width={TW + 0.5} height={TH + 0.5} fill={colors[i % colors.length]} opacity={0.8 * (1 - k)} />
    ))}
  </svg>
);

// ---- 5. the seabed: rocks and kelp that fill the frame, as the reference's deep is full to its edges ----------------
const ROCKS = Array.from({ length: 11 }, (_, i) => {
  const r = (k: number) => rnd(i * 11 + k, 77);
  const x = -6.2 + i * 1.2 + (r(1) - 0.5) * 0.6;
  const big = Math.abs(x) > 1.6 ? 1 : 0.55; // keep the middle low so the shell reads
  return { g: blob(1.2 + r(2) * 1.4 * big, (0.5 + r(3) * 0.9) * big, 0.9 + r(4) * 0.8, 0.16, i), pos: [x, -0.1, -0.6 - r(5) * 2.4 + (i % 2) * 1.2] as P3, rot: r(6) * 3 };
});
const KELP = Array.from({ length: 16 }, (_, i) => {
  const r = (k: number) => rnd(i * 7 + k, 91);
  const x = (i % 2 ? 1 : -1) * (1.7 + r(1) * 4.4), z = -3.4 + r(2) * 3.2, h = 3.0 + r(3) * 3.4;
  // a frond: a long ribbon leaf with a wavy margin, curling back at the tip
  return { g: leafGeo(h, 0.32 + r(5) * 0.2, 0.08, 0.07, 0.12, 40), pos: [x, -0.2, z] as P3, ph: r(4) * 6, yaw: r(6) * 3 };
});
const Seabed: React.FC<{ t: number }> = ({ t }) => (
  <>
    {ROCKS.map((k, i) => (
      <EMesh key={`r${i}`} g={k.g} m={{ palette: PAL.slate, seed: 120 + i, follow: 0.2, angleDeg: 30, albedoNoise: 0.25, noiseScale: 9 }} pos={k.pos} rot={[0, k.rot, 0]} />
    ))}
    {KELP.map((k, i) => (
      <group key={`k${i}`} position={k.pos} rotation={[0.06 * Math.sin(t * 0.9 + k.ph), k.yaw, 0.1 * Math.sin(t * 0.7 + k.ph)]}>
        <EMesh g={k.g} m={{ palette: PAL.slate, seed: 140 + i, follow: 0.4 }} double />
      </group>
    ))}
  </>
);

// ---- 5. zero joining fee: ₹0 rises from an abalone like a pearl -------------------------------------------------
const Pearl: React.FC<{ F: number }> = ({ F }) => {
  const copy = useCopy();
  const vsize = fit(copy.hero.value, 280, 1300, 0.55);
  const k = expoOut(ramp(F, T.card + 22, T.card + 44));
  const lab = expoOut(ramp(F, T.card + 30, T.card + 44));
  const ph = (F - T.card) / 50;
  const sc = 0.7 + 0.3 * k;
  const y = 160 + 220 * (1 - k);
  // SVG text with a gradient fill: CSS background-clip:text under a transform renders as a solid box in Chrome headless
  const stops: [string, number][] = [["#8f7cff", -0.3], ["#6fd6ea", 0], ["#b4f2c2", 0.25], ["#ffeea0", 0.5], ["#ffb2d4", 0.75], ["#8f7cff", 1.05]];
  return (
    <AbsoluteFill style={{ alignItems: "center", pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: 112, fontFamily: "Lexend", fontWeight: 500, fontSize: 26, letterSpacing: 26 * 0.42, color: "#3a4452", opacity: lab, paddingLeft: 26 * 0.42 }}>{copy.hero.label}</div>
      <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        <defs>
          <linearGradient id="fee-foil" x1="0" y1="0" x2="1" y2="0.36" gradientTransform={`translate(${(ph % 1) - 0.5} 0)`} spreadMethod="repeat">
            {stops.map(([c, o], i) => (
              <stop key={i} offset={Math.min(1, Math.max(0, (o + 0.3) / 1.35))} stopColor={c} />
            ))}
          </linearGradient>
          <filter id="fee-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={12} />
          </filter>
        </defs>
        <g transform={`translate(${W / 2} ${y + 230}) scale(${sc})`} opacity={Math.min(1, k * 1.4)}>
          <text x={0} y={14} textAnchor="middle" fontFamily="Newsreader" fontWeight={700} fontSize={vsize} letterSpacing={-10} fill="rgba(30,40,60,0.18)" filter="url(#fee-soft)">{copy.hero.value}</text>
          <text x={0} y={0} textAnchor="middle" fontFamily="Newsreader" fontWeight={700} fontSize={vsize} letterSpacing={-10} fill="url(#fee-foil)" stroke="rgba(70,60,140,0.35)" strokeWidth={1.5}>{copy.hero.value}</text>
        </g>
      </svg>
      <div style={{ position: "absolute", top: 452, width: 240 * lab, height: 1.5, background: "#3a4452", opacity: 0.6 }} />
    </AbsoluteFill>
  );
};

export const ShellTake: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const t = F / 24;
  const k = ramp(F, T.card, T.card + 20);
  const mz = mosaic(k * 1.16);
  const cut = step(F, [520]);
  // the dive: the camera falls into the shell's iridescence, which becomes the card's foil stripe
  const dive = ramp(F, T.whip - 14, T.studio);
  const z = 1 + 9 * dive ** 2.4;
  const cam = cut === 0
    ? { pos: [-0.3 + (F - T.card) * 0.01, 2.0, 7.4 - (F - T.card) * 0.016] as [number, number, number], target: [-0.05 + (F - T.card) * 0.006, 1.4, 0] as [number, number, number], fov: 36 }
    : { pos: [0.3 + (F - 520) * 0.01, 2.3, 6.6 - (F - 520) * 0.012] as [number, number, number], target: [0, 1.3, 0] as [number, number, number], fov: 30 };
  const fish = useMemo(
    () => [
      ...Array.from({ length: 7 }, (_, i) => ({ x0: -7.5 + ((i * 2.3) % 5), v: 0.55 + 0.12 * ((i * 7) % 3), y: 0.35 + ((i * 5) % 3) * 0.28, z: -2.2 - (i % 3) * 0.9, ph: i * 1.7, s: 1.0 + 0.2 * (i % 2) })),
      // two in front, at the height of the value, crossing it mid-shot
      { x0: -4.6, v: 0.9, y: 2.25, z: 1.2, ph: 0.4, s: 0.9 },
      { x0: -6.2, v: 0.95, y: 2.55, z: 0.6, ph: 2.2, s: 0.75 },
    ],
    [],
  );
  return (
    <LookCtx.Provider value={look("#dfe4e0", "#58636a")}>
      <AbsoluteFill style={k < 1 ? { WebkitMaskImage: mz.mask, maskImage: mz.mask, WebkitMaskSize: "100% 100%", maskSize: "100% 100%" } : undefined}>
        <AbsoluteFill style={{ transform: `scale(${z})`, transformOrigin: "50% 74%" }}>
          <Paper color="#dfe4e0" grain={0.35} />
          <Mottle tint={[0.66, 0.72, 0.7]} seed={6} />
          <Field f={F} pitch={11} lambda={160} amp={4} speed={2} width={1.35} color="#a3adaa" opacity={0.95} />
          {/* the value sits under the 3D layer: two fish swim across in front of it (the reference's fish cross its words) */}
          <AbsoluteFill style={{ opacity: 1 - ramp(F, T.whip - 14, T.whip - 4) }}>
            <Pearl F={F} />
          </AbsoluteFill>
          <World aa>
            <Cam {...cam} />
            <RefDepth.Provider value={7}>
              <Detail.Provider value={ENGRAVE_FINE}>
                {fish.map((p, i) => {
                  // each fish swims its own gentle curve, faces where it is going, and sways its body
                  const tt = (F - T.card) / 24 + p.ph;
                  const x = p.x0 + p.v * (F - T.card) / 24;
                  const y = p.y + 0.18 * Math.sin(tt * 0.9);
                  const z = p.z + 0.5 * Math.sin(tt * 0.55 + p.ph);
                  const dz = 0.5 * 0.55 * Math.cos(tt * 0.55 + p.ph);
                  const yaw = Math.atan2(-dz, p.v) + 0.12 * Math.sin(tt * 7 + p.ph);
                  return <Rig key={i} url={M + "BarramundiFish.glb"} size={p.s} pos={[x, y, z]} rot={[0, Math.PI / 2 + yaw, 0.1 * Math.cos(tt * 0.9)]} m={{ palette: PAL.slate, atmos: 0.25 + 0.1 * (i % 2), seed: 90 + i }} />;
                })}
                <Rig url={M + "DiffuseTransmissionPlant.glb"} size={3.6} pos={[-3.4, -0.6, 0.6]} rot={[0, 0.4, 0]} keep={(n) => n === "leaves"} m={{ palette: PAL.slate, follow: 0, wobble: 0.7, seed: 98 }} />
                <Seabed t={t} />
                <Rig url={M + "IridescenceAbalone.glb"} size={2.5} pos={[-0.05, -0.1, 0.3]} rot={[-0.5 + 0.4 * k, 0.6 + t * 0.25, 0]} m={{ palette: PAL.slate, foil: 0.95, seed: 99 }} foilPhase={t * 0.35} />
              </Detail.Provider>
            </RefDepth.Provider>
          </World>
        </AbsoluteFill>
        {/* the iridescence floods the frame */}
        <AbsoluteFill style={{ opacity: ramp(F, T.whip - 6, T.studio - 2) }}>
          <Holo phase={0.35 + 0.4 * Math.sin((F - T.card) / 14)} style={{ inset: 0, mixBlendMode: "normal", opacity: 1, transform: `scale(${1 + 0.02 * Math.max(0, F - (T.whip - 6))})` }} />
        </AbsoluteFill>
      </AbsoluteFill>
      {k < 1 ? <Flash tiles={mz.flash} colors={["#c3cbc8", "#e3d7fb", "#9fb0b4", "#f0d9cb"]} /> : null}
    </LookCtx.Provider>
  );
};
