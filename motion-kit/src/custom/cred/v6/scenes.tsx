import React, { useLayoutEffect, useMemo, useRef } from "react";
import { getStroke } from "perfect-freehand";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import * as THREE from "three";
import { Cam, Detail, EMesh, RefDepth, World } from "../v2/three.tsx";
import { Paper, type Stroke } from "../../../ensemble/layers.tsx";
import { Field } from "../../../ensemble/paint2d.tsx";
import { Globe } from "../../../ensemble/globe-type.tsx";
import { LookCtx, mix, type Look } from "../../../ensemble/look.ts";
import { circle, polyD, trim, type Pt } from "../../../ensemble/paths.ts";
import { expoOut, onsetAfter, pop, ramp } from "../../../ensemble/score.ts";
import { Rig } from "./rig.tsx";
import { ENGRAVE, Headline, Holo, Lens, M, PAL } from "./kit.tsx";
import { T } from "../v5/looks.ts";

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
const LOGO = staticFile("custom/cred-v2/cred-logo.png");
const look = (paper: string, ink: string): Look => ({ paper, ink, inkSoft: ink, washes: [paper], accent: ink, weight: 2.2, grain: 0.32, seed: 5 });

/** Scale-step: the reference cuts by jumping scale on a beat. Returns the framing index active at frame F. */
const step = (F: number, cuts: number[]) => cuts.filter((c) => F >= c).length;

// ---- 0. ground: the opening's lines, the field, the green disc (one continuous layer, 0-158) ----------------------
const wave = (y: number, amp: number, lam: number, phase: number): Pt[] =>
  Array.from({ length: 120 }, (_, i) => {
    const x = -80 + (i / 119) * (W + 160);
    return [x, y + amp * Math.sin(((x + phase) / lam) * Math.PI * 2)] as Pt;
  });
// the reference's opening: lines arrive one by one from the left edge, each its own length, ragged ends, then the
// scale-step to the fine field (same ragged edge), then a pale disc slides in from the right and the scene grows in it
const LINES = [
  { dy: 0, s: 2, end: 0.52 },
  { dy: -36, s: 9, end: 0.4 },
  { dy: 36, s: 13, end: 0.6 },
  { dy: -72, s: 18, end: 0.33 },
  { dy: 72, s: 22, end: 0.47 },
  { dy: -108, s: 27, end: 0.28 },
  { dy: 108, s: 31, end: 0.42 },
];
/** Pen strokes (perfect-freehand outlines) on a canvas: the SVG version hit a raster-tile duplication glitch here. */
const CanvasPen: React.FC<{ strokes: Stroke[] }> = ({ strokes }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    const x = ref.current?.getContext("2d");
    if (!x) return;
    x.clearRect(0, 0, W, H);
    for (const s of strokes) {
      const pts = trim(s.pts, s.t0 ?? 0, s.t1 ?? 1);
      if (pts.length < 2) continue;
      const n = pts.length;
      const o = getStroke(pts.map(([px, py], i) => [px, py, 0.45 + 0.55 * Math.sin((Math.PI * (i + 0.5)) / n)]), { size: (s.size ?? 1) * 2.2 * 2.4, thinning: 0.5, smoothing: 0.35, streamline: 0.12, simulatePressure: false, start: { taper: s.taper ?? 30 }, end: { taper: s.taper ?? 30 } });
      x.fillStyle = s.color ?? "#3a3a3e";
      x.beginPath();
      o.forEach(([px, py], i) => (i ? x.lineTo(px, py) : x.moveTo(px, py)));
      x.closePath();
      x.fill();
    }
  });
  return <canvas ref={ref} width={W} height={H} style={{ position: "absolute", inset: 0 }} />;
};

export const Ground: React.FC<{ F: number }> = ({ F }) => {
  const ink = mix("#3a3a3e", "#b4b6ad", ramp(F, 70, 104));
  const discR = 1120 * expoOut(ramp(F, 58, 96));
  const strokes: Stroke[] = F < T.stepC
    ? LINES.filter((l) => F >= l.s).map((l) => ({ pts: wave(H * 0.45 + l.dy, 13, 460, F * 4 + l.dy * 3), t1: l.end * expoOut(Math.min(1, (F - l.s) / 18)), size: 1.15, color: ink, taper: 30 }))
    : [];
  return (
    <LookCtx.Provider value={look("#ebebe7", "#3a3a3e")}>
      <AbsoluteFill>
        <Paper color="#ebebe7" grain={0.4} />
        {strokes.length ? <CanvasPen strokes={strokes} /> : null}
        {F >= T.stepC ? <Field f={F} pitch={25.5} lambda={105} amp={6} speed={3.2} width={2.2} color={ink} angle={-3} reveal={0.4 + 0.2 * expoOut(ramp(F, T.stepC, T.stepC + 26))} ragged={150} noiseAmp={0.3} /> : null}
        {discR > 1 ? (
          <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
            <defs>
              <radialGradient id="gdisc" gradientUnits="userSpaceOnUse" cx={W * 1.12} cy={H * 0.42} r={Math.max(1, discR)}>
                <stop offset="0.9" stopColor="#d3e0a8" />
                <stop offset="1" stopColor="#d3e0a8" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx={W * 1.12} cy={H * 0.42} r={discR} fill="url(#gdisc)" />
          </svg>
        ) : null}
      </AbsoluteFill>
    </LookCtx.Provider>
  );
};

// ---- 1. rewards: the fox in the hedge -----------------------------------------------------------------------------
/** Growth 0..1 of a plant at world x: a wave that follows the green disc in from the right (right side first). */
const sprout = (F: number, x: number, delay = 0) => {
  const at = 64 + (6 - x) * 2.6 + delay;
  const u = Math.min(1, Math.max(0, (F - at) / 22));
  return u * u * (3 - 2 * u) * (1 + 0.04 * Math.sin(u * Math.PI)); // smoothstep with a breath of overshoot
};
/** Foreground branches slide in from the frame edge (0..1), staggered. */
const sweep = (F: number, delay: number) => expoOut(Math.min(1, Math.max(0, (F - 70 - delay) / 30)));
/** A plant that grows up from its own base: height first, then width, unfurling from a lean. */
const Sprout: React.FC<{ at: [number, number, number]; g: number; lean: number; children: React.ReactNode }> = ({ at, g, lean, children }) =>
  g <= 0.001 ? null : (
    <group position={at} rotation={[0, 0, 0.45 * lean * (1 - g)]} scale={[0.35 + 0.65 * g, g, 0.35 + 0.65 * g]}>
      {children}
    </group>
  );
export const RewardsWorld: React.FC<{ F: number; framing?: number; bare?: boolean }> = ({ F, framing, bare }) => {
  const t = F / 24;
  const cut = framing ?? step(F, [onsetAfter(118)]);
  const cam = cut === 0
    ? { pos: [0.2 + (F - 72) * 0.006, 1.25, 6.6 - (F - 72) * 0.008] as [number, number, number], target: [0.2, 1.0, 0] as [number, number, number], fov: 34 }
    : { pos: [0.4 + (F - 118) * 0.008, 1.05, 4.0 - (F - 118) * 0.004] as [number, number, number], target: [0.5, 0.9, 0] as [number, number, number], fov: 32 };
  return (
    <LookCtx.Provider value={look("#e3ead0", "#9aa08c")}>
      <AbsoluteFill>
        {bare ? null : (
          <>
            <Paper color="#e3ead0" grain={0.35} />
            <Field f={F} pitch={12} lambda={150} amp={4} speed={1.5} width={1.2} color="#b9bdae" opacity={0.85} />
            <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
              <path d={polyD(circle(1500, 520, 700, 120), true)} fill="#d3e0a8" />
            </svg>
          </>
        )}
        <World aa>
          <Cam {...cam} />
          <RefDepth.Provider value={6}>
            <Detail.Provider value={ENGRAVE}>
              {[-5.5, -3.2, -1.0, 1.4, 3.6, 5.8].map((x, i) => (
                <Sprout key={`b${i}`} at={[x, -0.2, -3.2 - (i % 2)]} g={sprout(F, x)} lean={i % 2 ? 1 : -1}>
                  <Rig url={M + "DiffuseTransmissionPlant.glb"} size={3.2} rot={[0, i * 1.3, 0]} keep={(n) => n === "leaves"} m={{ palette: PAL.green, follow: 0, wobble: 0.7, atmos: 0.35, seed: 10 + i }} />
                </Sprout>
              ))}
              {[-4.4, -2.0, 2.2, 4.6].map((x, i) => (
                <Sprout key={`f${i}`} at={[x, -0.1, -1.6]} g={sprout(F, x, 6)} lean={i % 2 ? -1 : 1}>
                  <Rig url={M + "GlassVaseFlowers.glb"} size={2.4} rot={[0, i * 1.7 + t * 0.05, 0]} keep={(n) => n === "Flowers"} m={{ palette: PAL.violet, atmos: 0.2, seed: 20 + i }} />
                </Sprout>
              ))}
              <Rig url={M + "Fox.glb"} size={2.4} pos={[-4.2 + (F - 84) * 0.04, 0, -0.2]} rot={[0, Math.PI / 2 - 0.25, 0]} clip="Walk" time={t} m={{ palette: PAL.violet, foil: 0.35 }} foilPhase={t * 0.15} />
              {/* foreground branches sweep in from the frame edges (the reference's branch entrance) */}
              <group position={[-6 * (1 - sweep(F, 0)), -1.2 * (1 - sweep(F, 0)), 0]} rotation={[0, 0, 0.5 * (1 - sweep(F, 0))]}>
                <Rig url={M + "DiffuseTransmissionPlant.glb"} size={4.4} pos={[-3.0, -0.6, 1.4]} rot={[0, 0.6 + t * 0.02, 0]} keep={(n) => n === "leaves"} m={{ palette: PAL.green, follow: 0, wobble: 0.7, seed: 31 }} />
              </group>
              <group position={[5 * (1 - sweep(F, 4)), -1 * (1 - sweep(F, 4)), 0]} rotation={[0, 0, -0.4 * (1 - sweep(F, 4))]}>
                <Rig url={M + "GlassVaseFlowers.glb"} size={2.8} pos={[2.6, -0.3, 1.0]} rot={[0, -0.4, 0]} keep={(n) => n === "Flowers"} m={{ palette: PAL.violet, seed: 32 }} />
              </group>
              <group position={[6 * (1 - sweep(F, 8)), -1.4 * (1 - sweep(F, 8)), 0]} rotation={[0, 0, -0.5 * (1 - sweep(F, 8))]}>
                <Rig url={M + "DiffuseTransmissionPlant.glb"} size={3.8} pos={[3.8, -0.9, 2.2]} rot={[0, 2.2, 0]} keep={(n) => n === "leaves"} m={{ palette: PAL.green, follow: 0, wobble: 0.7, seed: 33 }} />
              </group>
              <Sprout at={[-1.6, -0.9, 2.6]} g={sprout(F, -1.6, 14)} lean={1}>
                <Rig url={M + "GlassVaseFlowers.glb"} size={2.2} rot={[0, 1.1, 0]} keep={(n) => n === "Flowers"} m={{ palette: PAL.violet, seed: 34 }} />
              </Sprout>
            </Detail.Provider>
          </RefDepth.Provider>
        </World>
      </AbsoluteFill>
    </LookCtx.Provider>
  );
};

/** 0-158: the ground layer throughout; the world grows inside the green disc from 70. */
export const RewardsTake: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  return (
    <AbsoluteFill>
      <Ground F={F} />
      {F >= 66 ? <RewardsWorld F={F} bare /> : null}
      {F >= 98 ? <Headline text="5% rewards" sub="on online shopping" grad={["#3b23a0", "#6a4fd0", "#2f7a4a"]} t={expoOut(ramp(F, 98, 112))} /> : null}
    </AbsoluteFill>
  );
};

// ---- 2. the card: the world becomes the card's print, under a loupe -----------------------------------------------
const STRIP_TEXT = "5% REWARDS ON ONLINE SHOPPING  ·  ZERO JOINING FEE  ·  ";

/** The foil strip: rainbow film, fine guilloche waves, letterspaced copy sliding through it. */
const Strip: React.FC<{ w: number; h: number; phase: number; slide: number; font: number }> = ({ w, h, phase, slide, font }) => {
  const rows = 9;
  return (
    <div style={{ position: "relative", width: w, height: h, overflow: "hidden" }}>
      <Holo phase={phase} style={{ inset: 0, mixBlendMode: "normal", opacity: 0.92 }} />
      <svg width={w} height={h} style={{ position: "absolute", inset: 0, mixBlendMode: "soft-light" }}>
        {Array.from({ length: rows }, (_, i) => (
          <path key={i} d={polyD(Array.from({ length: 90 }, (_, k) => [(k / 89) * w, h * ((i + 0.5) / rows) + h * 0.05 * Math.sin((k / 89) * Math.PI * 6 + i * 0.7 + phase * 6)] as Pt))} fill="none" stroke="#ffffff" strokeWidth={Math.max(1, h / 70)} opacity={0.8} />
        ))}
      </svg>
      <div style={{ position: "absolute", top: 0, height: h, display: "flex", alignItems: "center", whiteSpace: "nowrap", transform: `translateX(${-slide}px)`, fontFamily: "Lexend", fontWeight: 500, fontSize: font, letterSpacing: font * 0.32, color: "rgba(255,255,255,0.95)", textShadow: "0 0 2px rgba(60,40,120,0.35)" }}>
        {STRIP_TEXT.repeat(8)}
      </div>
    </div>
  );
};

/** The card's print: the rewards world, greened like a note, with the official logo. */
const Print: React.FC<{ F: number }> = ({ F }) => (
  <AbsoluteFill>
    <RewardsWorld F={F} framing={1} />
    <AbsoluteFill style={{ background: "#2c8c62", mixBlendMode: "multiply", opacity: 0.55 }} />
  </AbsoluteFill>
);

const CardFace: React.FC<{ F: number; holo: number }> = ({ F, holo }) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, borderRadius: 64, overflow: "hidden", boxShadow: "0 0 0 10px #f2f6e8 inset" }}>
    <Print F={F} />
    <div style={{ position: "absolute", left: 1180, top: -400, transform: "rotate(68deg)", transformOrigin: "0 0" }}>
      <Strip w={2200} h={96} phase={holo} slide={(F - T.reveal) * 3} font={30} />
    </div>
    <Img src={LOGO} style={{ position: "absolute", left: 110, top: 90, height: 170 }} />
  </div>
);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** Strip centre on the card (card px): the push ends with the strip horizontal across the loupe. */
const FOCUS = { x: 1545, y: 560 };

/**
 * One continuous camera on the card from 150 to the magnifier: the frame shrinks into the card and tilts back, keeps
 * breathing, then pushes into the foil strip while turning it level. The print keeps living (the fox never stops).
 */
const cardPose = (F: number) => {
  const k = expoOut(ramp(F, T.reveal, T.reveal + 22));
  const t = (F - T.reveal) / 24;
  const s0 = 1 - 0.55 * k + 0.012 * t;
  const rx0 = 38 * k + 2.2 * Math.sin(t * 1.3) * k;
  const rz0 = -9 * k + 1.6 * t * k;
  const ty0 = -30 * k + 8 * Math.sin(t * 0.9) * k;
  const z = easeInOut(ramp(F, T.macro - 18, T.push + 4));
  const drift = Math.max(0, F - (T.push + 4)) * 0.012;
  return {
    s: lerp(s0, 4.2, z) + drift,
    rx: lerp(rx0, 0, z),
    rz: lerp(rz0, -68, z),
    ty: lerp(ty0, 0, z),
    fx: lerp(W / 2, FOCUS.x, z),
    fy: lerp(H / 2, FOCUS.y, z),
  };
};

export const CardTake: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const p = cardPose(F);
  const k = expoOut(ramp(F, T.reveal, T.reveal + 22));
  const head = expoOut(ramp(F, T.reveal + 18, T.reveal + 32)) * (1 - ramp(F, T.macro - 16, T.macro - 4));
  return (
    <AbsoluteFill style={{ background: "#0a0c0b" }}>
      <AbsoluteFill style={{ perspective: 1800 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transformOrigin: "0 0", transform: `translate(${W / 2}px, ${H / 2 + p.ty}px) scale(${p.s}) rotateX(${p.rx}deg) rotateZ(${p.rz}deg) translate(${-p.fx}px, ${-p.fy}px)` }}>
          <CardFace F={F} holo={(F - T.reveal) / 70} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: 1 - ramp(F, 262, 280) }}>
        <Lens r={0.62 + 0.4 * (1 - k)} soft={0.18} />
      </AbsoluteFill>
      {head > 0 ? <Headline text="the CRED IndusInd Bank" sub="RuPay credit card" grad={["#d9f6e4", "#ffffff", "#b8f0d0"]} t={head} size={60} top={70} /> : null}
    </AbsoluteFill>
  );
};

/** The magnifying glass: where it is and how big, frame by frame (shared by the travel world it reveals). */
export const glass = (F: number) => {
  const a = expoOut(ramp(F, 258, 280));
  const b = easeInOut(ramp(F, 282, 302));
  const x0 = lerp(W * 1.2, W * 0.6, a), y0 = lerp(H * 1.1, H * 0.5, a);
  return { x: lerp(x0, W / 2, b), y: lerp(y0, H / 2, b), r: 230 + 1500 * b * b, on: F >= 258 };
};

/** Metal rim, glass glare and handle of the magnifier, drawn around glass(F). */
export const Magnifier: React.FC<{ F: number }> = ({ F }) => {
  const g = glass(F);
  if (!g.on || g.r > 1300) return null;
  const rim = Math.max(18, g.r * 0.1);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* handle */}
      <div style={{ position: "absolute", left: g.x, top: g.y, width: g.r * 1.9, height: g.r * 0.24, transformOrigin: "0 50%", transform: `rotate(38deg) translate(${g.r + rim * 0.6}px, -50%)`, borderRadius: g.r * 0.12, background: "linear-gradient(180deg, #3a3330, #15110f 55%, #2a2421)", boxShadow: "0 18px 40px rgba(0,0,0,0.45)" }}>
        <div style={{ position: "absolute", left: 0, top: -g.r * 0.02, width: g.r * 0.3, height: g.r * 0.28, borderRadius: g.r * 0.05, background: "linear-gradient(180deg, #e9e4d8, #9d9686 50%, #d8d2c4)" }} />
      </div>
      {/* rim */}
      <div style={{ position: "absolute", left: g.x - g.r - rim, top: g.y - g.r - rim, width: 2 * (g.r + rim), height: 2 * (g.r + rim), borderRadius: "50%", background: "conic-gradient(from 30deg, #f4efe4, #9a917f, #e7e1d3, #7d7565, #efe9dc, #a59c89, #f4efe4)", WebkitMask: `radial-gradient(circle, transparent ${g.r}px, #000 ${g.r + 1}px)`, mask: `radial-gradient(circle, transparent ${g.r}px, #000 ${g.r + 1}px)`, boxShadow: "0 22px 50px rgba(0,0,0,0.45)" }} />
      {/* glare on the glass */}
      <div style={{ position: "absolute", left: g.x - g.r, top: g.y - g.r, width: 2 * g.r, height: 2 * g.r, borderRadius: "50%", background: "radial-gradient(ellipse 55% 35% at 32% 22%, rgba(255,255,255,0.38), rgba(255,255,255,0) 70%)", boxShadow: "inset 0 0 40px rgba(0,0,0,0.35)" }} />
    </AbsoluteFill>
  );
};

// ---- 3. travel: a hotel at dusk, flights arcing over the globe --------------------------------------------------
/** Hotel facade texture: a grid of windows, a cornice band and an entrance arch (no lettering). */
const hotelTex = (() => {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 1024;
  const x = c.getContext("2d")!;
  x.fillStyle = "#ece8f4";
  x.fillRect(0, 0, 512, 1024);
  for (let r = 0; r < 14; r++)
    for (let k = 0; k < 6; k++) {
      x.fillStyle = (r * 7 + k * 3) % 5 === 0 ? "#cfc6e6" : "#2a2a52";
      x.fillRect(40 + k * 74, 60 + r * 62, 42, 40);
    }
  x.fillStyle = "#3a3a66";
  for (let r = 0; r < 15; r++) x.fillRect(0, 48 + r * 62, 512, 4);
  x.fillRect(0, 930, 512, 94);
  x.fillStyle = "#ece8f4";
  x.beginPath();
  x.arc(256, 1024, 70, Math.PI, 0);
  x.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  return t;
})();
const towerG = new THREE.BoxGeometry(2.4, 5.4, 1.8);
const wingG = new THREE.BoxGeometry(1.5, 3.4, 1.5);
const crownG = new THREE.BoxGeometry(1.5, 0.7, 1.2);
const spireG = new THREE.CylinderGeometry(0.05, 0.22, 1.2, 12);
const canopyG = new THREE.BoxGeometry(1.4, 0.1, 0.9);

const Hotel: React.FC<{ pos: [number, number, number]; rise: number }> = ({ pos, rise }) => {
  const m = { palette: PAL.indigo, seed: 44, angleDeg: 4, map: hotelTex, mapAmt: 0.9 } as never;
  return (
    <group position={pos} scale={[1, Math.max(0.001, rise), 1]}>
      <EMesh g={towerG} m={m} pos={[0, 2.7, 0]} />
      <EMesh g={wingG} m={m} pos={[-1.95, 1.7, 0.1]} />
      <EMesh g={wingG} m={m} pos={[1.95, 1.7, 0.1]} />
      <EMesh g={crownG} m={{ palette: PAL.indigo, seed: 45, angleDeg: 4 }} pos={[0, 5.75, 0]} />
      <EMesh g={spireG} m={{ palette: PAL.indigo, seed: 46, foil: 0.6 }} pos={[0, 6.7, 0]} />
      <EMesh g={canopyG} m={{ palette: PAL.lilac, seed: 47 }} pos={[0, 0.9, 1.1]} />
    </group>
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
 * 258-392. Revealed through the magnifying glass (glass(F) from the card take), then:
 *   flights arc out from India over the globe with planes riding the arcs; a hotel rises on the left, the lantern
 *   lights its door, the fox runs past. Leaves by a dive into the globe whose grid becomes the colonnade's floor.
 */
export const TravelTake: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const t = F / 24;
  const g = glass(F);
  const cut = step(F, [onsetAfter(334)]);
  const cam = cut === 0
    ? { pos: [-0.8 + (F - T.swap) * 0.01, 1.8, 8.4] as [number, number, number], target: [0.2, 1.9, -2] as [number, number, number], fov: 36 }
    : { pos: [-0.2 + (F - 334) * 0.01, 1.6, 7.2] as [number, number, number], target: [0.4, 2.1, -2] as [number, number, number], fov: 34 };
  const lon = 40 + 22 * ramp(F, T.swap, T.matte);
  const G = { cx: W * 0.7, cy: H * 0.6, R: 340 };
  // exit: dive into the globe
  const dive = ramp(F, T.matte - 16, T.products) ** 2.2;
  const z = 1 + 7 * dive;
  // inside the glass the world is magnified a little (a real magnifier, not a hole)
  const mag = g.r < 1200 ? 1.22 - 0.22 * Math.min(1, (g.r - 230) / 900) : 1;
  return (
    <LookCtx.Provider value={look("#d6d0ea", "#4a50a6")}>
      <AbsoluteFill style={{ clipPath: `circle(${g.r}px at ${g.x}px ${g.y}px)` }}>
        <AbsoluteFill style={{ transform: `scale(${mag * z})`, transformOrigin: dive > 0 ? `${G.cx}px ${G.cy}px` : `${g.x}px ${g.y}px` }}>
          <Paper color="#d6d0ea" grain={0.35} />
          <Field f={F} pitch={12} lambda={180} amp={3} speed={1} width={1.1} color="#b7b0d6" opacity={0.9} />
          <Globe cx={G.cx} cy={G.cy} r={G.R} lon={lon} lat={18} draw={expoOut(ramp(F, 262, 296))} land="#c3bce4" graticule={0.45} />
          <Flights F={F} cx={G.cx} cy={G.cy} R={G.R} lon={lon} />
          <World aa>
            <Cam {...cam} />
            <RefDepth.Provider value={8}>
              <Detail.Provider value={ENGRAVE}>
                <Hotel pos={[-3.6, 0, -3.2]} rise={expoOut(ramp(F, 296, 322))} />
                <Rig url={M + "Lantern.glb"} size={3.6} pos={[-1.3, -0.2, -1.4]} rot={[0, -2.4, 0]} m={{ palette: PAL.indigo, foil: 0.5, seed: 40 }} foilPhase={t * 0.1} />
                <Rig url={M + "ToyCar.glb"} size={1.3} pos={[-7 + Math.min(F - T.swap, 70) * 0.075, 0, -1.0]} rot={[0, Math.PI / 2, 0]} keep={(n) => n !== "Glass"} m={{ palette: PAL.lilac, seed: 41 }} />
                <Rig url={M + "Fox.glb"} size={1.4} pos={[-4.5 + (F - T.swap) * 0.06, 0, 1.2]} rot={[0, Math.PI / 2 - 0.1, 0]} clip="Run" time={t} m={{ palette: PAL.lilac }} />
                <Rig url={M + "DiffuseTransmissionPlant.glb"} size={3.2} pos={[-4.6, -0.8, 2.0]} rot={[0, 1, 0]} keep={(n) => n === "leaves"} m={{ palette: PAL.indigo, follow: 0, wobble: 0.7, seed: 48 }} />
              </Detail.Provider>
            </RefDepth.Provider>
          </World>
          {F > T.tilt ? <Headline text="redeem on flights, hotels" grad={["#26238a", "#5a4fc0", "#2a6aa0"]} t={expoOut(ramp(F, T.tilt + 6, T.tilt + 20))} size={76} top={130} /> : null}
        </AbsoluteFill>
      </AbsoluteFill>
      <Magnifier F={F} />
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

export const ProductsTake: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const t = F / 24;
  // overhead (the ring of capitals, as the reference opens its temple), then the crane tilts down to eye level
  const crane = expoOut(ramp(F, T.products + 4, T.products + 40));
  const cut = step(F, [onsetAfter(446)]);
  const orbit = 0.18 + (F - T.products) * 0.0016;
  const eye: [number, number, number] = [Math.sin(orbit) * 9.2, 2.4, Math.cos(orbit) * 9.2];
  const over: [number, number, number] = [0.01, 15, 0.4];
  // swing outward first, then down, so the crane never passes through the ring beam
  const hr = 0.4 + 8.8 * expoOut(Math.min(1, crane * 2.2));
  const pos: [number, number, number] = cut === 0 ? [Math.sin(orbit) * hr, over[1] + (eye[1] - over[1]) * crane, Math.cos(orbit) * hr] : [1.6 + (F - 446) * 0.008, 2.3, 5.6];
  const target: [number, number, number] = cut === 0 ? [0, 2.2 * crane, 0] : [0.6, 2.0, 0];
  const items: [string, number, number, number, number, Partial<{ foil: number }>][] = [
    ["BoomBox.glb", -2.2, 1.5, 0.9, onsetAfter(T.products + 30, 0), {}],
    ["WaterBottle.glb", -0.7, 1.7, -1.4, onsetAfter(T.products + 30, 1), {}],
    ["MaterialsVariantsShoe.glb", 0.8, 1.7, 1.1, onsetAfter(T.products + 30, 2), { foil: 0.6 }],
    ["Avocado.glb", 2.2, 1.2, -0.7, onsetAfter(T.products + 30, 3), {}],
  ];
  const cols = Array.from({ length: 10 }, (_, i) => (i / 10) * Math.PI * 2 + 0.31);
  return (
    <LookCtx.Provider value={look("#f1d9c6", "#ad503a")}>
      <AbsoluteFill style={{ opacity: ramp(F, T.matte + 2, T.products) }}>
        <Paper color="#f1d9c6" grain={0.35} />
        <Field f={F} pitch={12} lambda={130} amp={3} speed={1} width={1.1} color="#e2b9a2" opacity={0.9} />
        <World aa>
          <Cam pos={pos} target={target} fov={cut === 0 ? 38 : 32} />
          <RefDepth.Provider value={8}>
            <Detail.Provider value={ENGRAVE}>
              <EMesh g={floorG} m={{ palette: PAL.cream, seed: 59, map: floorTex, mapAmt: 0.85, angleDeg: 4 } as never} rot={[-Math.PI / 2, 0, 0]} />
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
            </Detail.Provider>
          </RefDepth.Provider>
        </World>
        {F > T.products + 42 ? (
          <>
            {/* a soft paper plate behind the headline so the columns never cut through the words */}
            <AbsoluteFill style={{ background: "radial-gradient(ellipse 30% 15% at 50% 19%, rgba(241,217,198,0.96), rgba(241,217,198,0.85) 55%, rgba(241,217,198,0) 100%)", opacity: expoOut(ramp(F, T.products + 40, T.products + 52)) }} />
            <Headline text="2,000+ products" sub="on CRED store" grad={["#8a2a1e", "#c2553c", "#7a3a8a"]} t={expoOut(ramp(F, T.products + 42, T.products + 56))} top={140} />
          </>
        ) : null}
      </AbsoluteFill>
    </LookCtx.Provider>
  );
};

// ---- 5. zero joining fee: ₹0 rises from an abalone like a pearl -------------------------------------------------
const Pearl: React.FC<{ F: number }> = ({ F }) => {
  const k = expoOut(ramp(F, T.card + 22, T.card + 44));
  const lab = expoOut(ramp(F, T.card + 30, T.card + 44));
  const ph = (F - T.card) / 50;
  const foil = `linear-gradient(110deg, #8f7cff ${-30 + ph * 100}%, #6fd6ea ${0 + ph * 100}%, #b4f2c2 ${25 + ph * 100}%, #ffeea0 ${50 + ph * 100}%, #ffb2d4 ${75 + ph * 100}%, #8f7cff ${105 + ph * 100}%)`;
  const big: React.CSSProperties = { fontFamily: "Newsreader", fontWeight: 700, fontSize: 280, lineHeight: 1, letterSpacing: -10 };
  return (
    <AbsoluteFill style={{ alignItems: "center", pointerEvents: "none" }}>
      {/* label */}
      <div style={{ position: "absolute", top: 112, fontFamily: "Lexend", fontWeight: 500, fontSize: 26, letterSpacing: 26 * 0.42, color: "#3a4452", opacity: lab, paddingLeft: 26 * 0.42 }}>JOINING FEE</div>
      {/* soft shadow as its own layer (a filter on clipped text paints the gradient as a box) */}
      <div style={{ ...big, position: "absolute", top: 160 + 220 * (1 - k) + 12, color: "rgba(30,40,60,0.16)", filter: "blur(14px)", opacity: k, transform: `scale(${0.7 + 0.3 * k})` }}>₹0</div>
      <div style={{ ...big, position: "absolute", top: 160 + 220 * (1 - k), background: foil, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", opacity: Math.min(1, k * 1.4), transform: `scale(${0.7 + 0.3 * k})` }}>₹0</div>
      <div style={{ position: "absolute", top: 452, width: 240 * lab, height: 1.5, background: "#3a4452", opacity: 0.6 }} />
    </AbsoluteFill>
  );
};

export const ShellTake: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const t = F / 24;
  const k = expoOut(ramp(F, T.card, T.card + 20));
  const cut = step(F, [onsetAfter(520)]);
  // the dive: the camera falls into the shell's iridescence, which becomes the card's foil stripe
  const dive = ramp(F, T.whip - 14, T.studio);
  const z = 1 + 9 * dive ** 2.4;
  const cam = cut === 0
    ? { pos: [0, 2.0, 7.6] as [number, number, number], target: [0, 1.5, 0] as [number, number, number], fov: 34 }
    : { pos: [0.4, 2.2, 5.6] as [number, number, number], target: [0, 1.8, 0] as [number, number, number], fov: 30 };
  const fish = useMemo(() => Array.from({ length: 7 }, (_, i) => ({ x0: -7.5 + ((i * 2.3) % 5), v: 0.55 + 0.12 * ((i * 7) % 3), y: 0.35 + ((i * 5) % 3) * 0.28, z: -2.2 - (i % 3) * 0.9, ph: i * 1.7, s: 1.0 + 0.2 * (i % 2) })), []);
  return (
    <LookCtx.Provider value={look("#dfe4e0", "#58636a")}>
      <AbsoluteFill style={{ clipPath: `circle(${Math.max(1, 1600 * k)}px at 50% 60%)` }}>
        <AbsoluteFill style={{ transform: `scale(${z})`, transformOrigin: "50% 74%" }}>
          <Paper color="#dfe4e0" grain={0.35} />
          <Field f={F} pitch={12} lambda={160} amp={4} speed={2} width={1.1} color="#c3cbc8" opacity={0.9} />
          <World aa>
            <Cam {...cam} />
            <RefDepth.Provider value={7}>
              <Detail.Provider value={ENGRAVE}>
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
                <Rig url={M + "IridescenceAbalone.glb"} size={2.6} pos={[0.2, 0, 0]} rot={[-0.5 + 0.4 * k, 0.6 + t * 0.25, 0]} m={{ palette: PAL.slate, foil: 0.95, seed: 99 }} foilPhase={t * 0.35} />
              </Detail.Provider>
            </RefDepth.Provider>
          </World>
        </AbsoluteFill>
        <AbsoluteFill style={{ opacity: 1 - ramp(F, T.whip - 14, T.whip - 4) }}>
          <Pearl F={F} />
        </AbsoluteFill>
        {/* the iridescence floods the frame */}
        <AbsoluteFill style={{ opacity: ramp(F, T.whip - 6, T.studio - 2) }}>
          <Holo phase={(F - T.card) / 60} style={{ inset: 0, mixBlendMode: "normal", opacity: 1 }} />
        </AbsoluteFill>
      </AbsoluteFill>
    </LookCtx.Provider>
  );
};
