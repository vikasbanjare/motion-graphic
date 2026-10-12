import React, { useMemo } from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import * as THREE from "three";
import { Cam, Detail, EMesh, RefDepth, World } from "../v2/three.tsx";
import { Paper } from "../../../ensemble/layers.tsx";
import { Field } from "../../../ensemble/paint2d.tsx";
import { Globe } from "../../../ensemble/globe-type.tsx";
import { LookCtx, mix, type Look } from "../../../ensemble/look.ts";
import { circle, mpD, polyD, roundRect, union, xf, type Ring } from "../../../ensemble/paths.ts";
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

// ---- 1. rewards: the fox in the hedge -----------------------------------------------------------------------------
export const RewardsWorld: React.FC<{ F: number; framing?: number }> = ({ F, framing }) => {
  const t = F / 24;
  const cut = framing ?? step(F, [onsetAfter(118)]);
  // two framings: wide (the hedge) then closer on the fox, both drifting
  const cam = cut === 0
    ? { pos: [0.2 + (F - 72) * 0.004, 1.25, 6.4 - (F - 72) * 0.006] as [number, number, number], target: [0.2, 1.0, 0] as [number, number, number], fov: 34 }
    : { pos: [0.4 + (F - 118) * 0.006, 1.05, 4.0] as [number, number, number], target: [0.5, 0.9, 0] as [number, number, number], fov: 32 };
  const grow = (k: number) => expoOut(Math.min(1, Math.max(0, (F - onsetAfter(76, k)) / 10)));
  return (
    <LookCtx.Provider value={look("#e3ead0", "#9aa08c")}>
      <AbsoluteFill>
        <Paper color="#e3ead0" grain={0.35} />
        <Field f={F} pitch={12} lambda={150} amp={4} speed={1.5} width={1.2} color="#b9bdae" opacity={0.85} />
        <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
          <path d={polyD(circle(1500, 520, 700, 120), true)} fill="#d3e0a8" />
        </svg>
        <World aa>
          <Cam {...cam} />
          <RefDepth.Provider value={6}>
            <Detail.Provider value={ENGRAVE}>
              {[-5.5, -3.2, -1.0, 1.4, 3.6, 5.8].map((x, i) => (
                <group key={`b${i}`} scale={grow(i % 3)}>
                  <Rig url={M + "DiffuseTransmissionPlant.glb"} size={3.2} pos={[x, -0.2, -3.2 - (i % 2)]} rot={[0, i * 1.3, 0]} keep={(n) => n === "leaves"} m={{ palette: PAL.green, follow: 0, wobble: 0.7, atmos: 0.35, seed: 10 + i }} />
                </group>
              ))}
              {[-4.4, -2.0, 2.2, 4.6].map((x, i) => (
                <group key={`f${i}`} scale={grow(2 + i)}>
                  <Rig url={M + "GlassVaseFlowers.glb"} size={2.4} pos={[x, -0.1, -1.6]} rot={[0, i * 1.7 + t * 0.05, 0]} keep={(n) => n === "Flowers"} m={{ palette: PAL.violet, atmos: 0.2, seed: 20 + i }} />
                </group>
              ))}
              <Rig url={M + "Fox.glb"} size={2.4} pos={[-2.2 + (F - 72) * 0.022, 0, -0.2]} rot={[0, Math.PI / 2 - 0.25, 0]} clip="Walk" time={t} m={{ palette: PAL.violet, foil: 0.35 }} foilPhase={t * 0.15} />
              <Rig url={M + "DiffuseTransmissionPlant.glb"} size={4.4} pos={[-3.0, -0.6, 1.4]} rot={[0, 0.6 + t * 0.02, 0]} keep={(n) => n === "leaves"} m={{ palette: PAL.green, follow: 0, wobble: 0.7, seed: 31 }} />
              <Rig url={M + "GlassVaseFlowers.glb"} size={2.8} pos={[2.6, -0.3, 1.0]} rot={[0, -0.4, 0]} keep={(n) => n === "Flowers"} m={{ palette: PAL.violet, seed: 32 }} />
              <Rig url={M + "DiffuseTransmissionPlant.glb"} size={3.8} pos={[3.8, -0.9, 2.2]} rot={[0, 2.2, 0]} keep={(n) => n === "leaves"} m={{ palette: PAL.green, follow: 0, wobble: 0.7, seed: 33 }} />
              <Rig url={M + "GlassVaseFlowers.glb"} size={2.2} pos={[-1.6, -0.9, 2.6]} rot={[0, 1.1, 0]} keep={(n) => n === "Flowers"} m={{ palette: PAL.violet, seed: 34 }} />
            </Detail.Provider>
          </RefDepth.Provider>
        </World>
      </AbsoluteFill>
    </LookCtx.Provider>
  );
};

/** 72-158: opens inside the disc (the opening's match), then the headline. */
export const RewardsTake: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const r = F < T.assembly ? 0.56 * H * expoOut(ramp(F, T.wash, T.assembly)) : 0.56 * H + 1500 * expoOut(ramp(F, T.assembly, T.assembly + 16));
  const d = polyD(circle(W * 0.29 + W * 0.21 * ramp(F, T.assembly, T.assembly + 16), H / 2, Math.max(1, r), 120), true);
  return (
    <AbsoluteFill style={{ clipPath: `path('${d}')` }}>
      <RewardsWorld F={F} />
      <Headline text="5% rewards" sub="on online shopping" grad={["#3b23a0", "#6a4fd0", "#2f7a4a"]} t={expoOut(ramp(F, 98, 112))} />
    </AbsoluteFill>
  );
};

// ---- 2. the card: the world becomes the card's print, tilted under a loupe ----------------------------------------
const CardFace: React.FC<{ F: number; holo: number }> = ({ F, holo }) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, borderRadius: 64, overflow: "hidden", boxShadow: "0 0 0 10px #f2f6e8 inset" }}>
    <RewardsWorld F={F} framing={1} />
    <AbsoluteFill style={{ background: "#2c8c62", mixBlendMode: "multiply", opacity: 0.55 }} />
    <Holo phase={holo} style={{ left: 0, top: 560, width: W, height: 120, transform: "skewY(-4deg)" }} />
    <Img src={LOGO} style={{ position: "absolute", left: 110, top: 90, height: 170 }} />
  </div>
);

export const CardTake: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const k = expoOut(ramp(F, T.reveal, T.reveal + 22));
  // the frame shrinks into the card and tilts back, like a note under a loupe
  const s = 1 - 0.55 * k;
  const rx = 38 * k, rz = -9 * k;
  const holo = (F - T.reveal) / 70;
  return (
    <AbsoluteFill style={{ background: "#0a0c0b" }}>
      <AbsoluteFill style={{ perspective: 1800 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transform: `translateY(${-30 * k}px) scale(${s}) rotateX(${rx}deg) rotateZ(${rz}deg)`, transformOrigin: "50% 50%" }}>
          <CardFace F={Math.min(F, T.reveal + 40)} holo={holo} />
        </div>
      </AbsoluteFill>
      <Lens r={0.62 + 0.4 * (1 - k)} soft={0.18} />
      {F > T.reveal + 18 ? <Headline text="the CRED IndusInd Bank" sub="RuPay credit card" grad={["#d9f6e4", "#ffffff", "#b8f0d0"]} t={expoOut(ramp(F, T.reveal + 18, T.reveal + 32))} size={64} top={64} /> : null}
    </AbsoluteFill>
  );
};

/** 207-298: the loupe pushes into the foil band, then irises into the travel world. */
export const MacroTake: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const z = 1 + 5 * expoOut(ramp(F, T.macro, T.push + 10)) ** 1.4;
  const iris = 0.62 - 0.5 * expoOut(ramp(F, T.swap - 14, T.swap));
  return (
    <AbsoluteFill style={{ background: "#0a0c0b" }}>
      <AbsoluteFill style={{ perspective: 1800 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transformOrigin: "50% 58%", transform: `translateY(-30px) scale(${0.45 * z}) rotateX(${38 - 30 * ramp(F, T.macro, T.push)}deg) rotateZ(${-9 + 6 * ramp(F, T.macro, T.push)}deg)` }}>
          <CardFace F={T.reveal + 40} holo={(F - T.reveal) / 70} />
        </div>
      </AbsoluteFill>
      <Lens r={iris} soft={0.18} />
    </AbsoluteFill>
  );
};

// ---- 3. travel: lanterns light the way at dusk ----------------------------------------------------------------------
export const TravelTake: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const t = F / 24;
  const open = expoOut(ramp(F, T.swap - 2, T.swap + 16));
  const cut = step(F, [onsetAfter(334)]);
  const cam = cut === 0
    ? { pos: [-1.2 + (F - T.swap) * 0.01, 1.6, 7.5] as [number, number, number], target: [0.4, 1.4, -2] as [number, number, number], fov: 36 }
    : { pos: [0.6 + (F - 334) * 0.008, 1.2, 4.6] as [number, number, number], target: [0.8, 1.0, -1] as [number, number, number], fov: 32 };
  return (
    <LookCtx.Provider value={look("#d6d0ea", "#4a50a6")}>
      <AbsoluteFill style={{ clipPath: `circle(${0.12 * H + 1500 * open}px at 50% 50%)` }}>
        <Paper color="#d6d0ea" grain={0.35} />
        <Field f={F} pitch={12} lambda={180} amp={3} speed={1} width={1.1} color="#b7b0d6" opacity={0.9} />
        <Globe cx={W * 0.68} cy={H * 0.5 + 60 - 40 * ramp(F, T.swap, T.matte)} r={430} lon={40 + 30 * ramp(F, T.swap, T.matte)} lat={18} draw={expoOut(ramp(F, T.swap, T.swap + 30))} land="#c3bce4" graticule={0.4} />
        <World aa>
          <Cam {...cam} />
          <RefDepth.Provider value={7}>
            <Detail.Provider value={ENGRAVE}>
              <Rig url={M + "Lantern.glb"} size={5.2} pos={[4.6, -0.4, -0.6]} rot={[0, -2.2, 0]} m={{ palette: PAL.indigo, foil: 0.5, seed: 40 }} foilPhase={t * 0.1} />
              <Rig url={M + "ToyCar.glb"} size={1.5} pos={[-6 + (F - T.swap) * 0.07, 0, -3.4]} rot={[0, Math.PI / 2, 0]} keep={(n) => n !== "Glass"} m={{ palette: PAL.lilac, seed: 41 }} />
              <Rig url={M + "Fox.glb"} size={1.6} pos={[-3 + (F - T.swap) * 0.05, 0, 0.6]} rot={[0, Math.PI / 2 - 0.1, 0]} clip="Run" time={t} m={{ palette: PAL.lilac }} />
              <Rig url={M + "DiffuseTransmissionPlant.glb"} size={3.6} pos={[-3.6, -0.8, 1.8]} rot={[0, 1, 0]} keep={(n) => n === "leaves"} m={{ palette: PAL.indigo, follow: 0, wobble: 0.7, seed: 48 }} />
            </Detail.Provider>
          </RefDepth.Provider>
        </World>
        {F > T.tilt ? <Headline text="redeem on flights, hotels" grad={["#26238a", "#5a4fc0", "#2a6aa0"]} t={expoOut(ramp(F, T.tilt + 6, T.tilt + 20))} size={84} /> : null}
      </AbsoluteFill>
    </LookCtx.Provider>
  );
};

// ---- 4. products: a still life on a colonnade -----------------------------------------------------------------------
const columnG = new THREE.CylinderGeometry(0.42, 0.46, 4.2, 28, 1);
const plinthG = new THREE.BoxGeometry(1.7, 1.2, 1.7);

const slabs = (F: number): string => {
  const rs: Ring[] = [0, 1, 2].map((i) => {
    const k = expoOut(ramp(F, T.matte + i * 2, T.matte + 11 + i * 2));
    const x = W + 200 - (W + 1400) * k;
    return xf(roundRect(x + i * 260, -300 + i * 120, 900, 1500, 40, 6), 1, -0.32, 0, 0, x, 0);
  });
  return mpD(union(...rs));
};

export const ProductsTake: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const t = F / 24;
  const cut = step(F, [onsetAfter(440)]);
  const cam = cut === 0
    ? { pos: [0 + (F - T.matte) * 0.006, 2.6, 9.0 - (F - T.matte) * 0.01] as [number, number, number], target: [0, 2.3, 0] as [number, number, number], fov: 36 }
    : { pos: [1.4 + (F - 440) * 0.006, 2.5, 5.0] as [number, number, number], target: [1.0, 2.5, 0] as [number, number, number], fov: 32 };
  const items: [string, number, number, number, number, Partial<{ foil: number }>][] = [
    ["BoomBox.glb", -3.1, 1.7, 0.3, onsetAfter(T.products + 2, 0), {}],
    ["WaterBottle.glb", -1.05, 1.9, -0.5, onsetAfter(T.products + 2, 2), {}],
    ["MaterialsVariantsShoe.glb", 1.05, 1.8, 0.4, onsetAfter(T.products + 2, 4), { foil: 0.6 }],
    ["Avocado.glb", 3.1, 1.3, -0.4, onsetAfter(T.products + 2, 6), {}],
  ];
  const content = (
    <LookCtx.Provider value={look("#f1d9c6", "#ad503a")}>
      <AbsoluteFill>
        <Paper color="#f1d9c6" grain={0.35} />
        <Field f={F} pitch={12} lambda={130} amp={3} speed={1} width={1.1} color="#e2b9a2" opacity={0.9} />
        <World aa>
          <Cam {...cam} />
          <RefDepth.Provider value={8}>
            <Detail.Provider value={ENGRAVE}>
              {[-4.6, -2.0, 2.0, 4.6].map((x, i) => (
                <EMesh key={`c${i}`} g={columnG} m={{ palette: PAL.terra, seed: 60 + i, angleDeg: 8, atmos: 0.25 }} pos={[x * 1.15, 2.1, -4.2]} />
              ))}
              {items.map(([, x, , z], i) => (
                <EMesh key={`p${i}`} g={plinthG} m={{ palette: PAL.cream, seed: 70 + i, angleDeg: 10 }} pos={[x, 0.6, z]} />
              ))}
              {items.map(([url, x, size, z, at, extra], i) => {
                const p = F >= at ? pop(F, at) : 0;
                return p > 0 ? (
                  <Rig key={url} url={M + url} size={size} pos={[x, 1.2 + 2.5 * (1 - p), z]} rot={[0, 0.5 + t * 0.15 + i, 0]} m={{ palette: i % 2 ? PAL.terra : PAL.cream, seed: 80 + i, ...extra }} foilPhase={t * 0.2} />
                ) : null;
              })}
            </Detail.Provider>
          </RefDepth.Provider>
        </World>
        {F > T.products + 30 ? <Headline text="2,000+ products" sub="on CRED store" grad={["#8a2a1e", "#c2553c", "#7a3a8a"]} t={expoOut(ramp(F, T.products + 30, T.products + 44))} /> : null}
      </AbsoluteFill>
    </LookCtx.Provider>
  );
  return F < T.products ? <AbsoluteFill style={{ clipPath: `path(evenodd, '${slabs(F)}')` }}>{content}</AbsoluteFill> : content;
};

// ---- 5. zero joining fee: an abalone opening in the deep ------------------------------------------------------------
export const ShellTake: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const t = F / 24;
  const k = expoOut(ramp(F, T.card, T.card + 20));
  const cut = step(F, [onsetAfter(520)]);
  const whip = ramp(F, T.whip - 4, T.studio);
  const cam = cut === 0
    ? { pos: [0, 2.0, 7.2] as [number, number, number], target: [0, 1.2, 0] as [number, number, number], fov: 34 }
    : { pos: [0.4, 2.0, 5.0] as [number, number, number], target: [0, 1.3, 0] as [number, number, number], fov: 30 };
  const fish = useMemo(() => Array.from({ length: 7 }, (_, i) => ({ y: 1.1 + (i % 3) * 0.45, z: -2.5 - (i % 2) * 1.2, ph: i * 0.9 })), []);
  return (
    <LookCtx.Provider value={look("#dfe4e0", "#58636a")}>
      <AbsoluteFill style={{ clipPath: `circle(${Math.max(1, 1600 * k)}px at 50% 60%)`, transform: `translateX(${-2200 * whip * whip}px)` }}>
        <Paper color="#dfe4e0" grain={0.35} />
        <Field f={F} pitch={12} lambda={160} amp={4} speed={2} width={1.1} color="#c3cbc8" opacity={0.9} />
        <World aa>
          <Cam {...cam} />
          <RefDepth.Provider value={7}>
            <Detail.Provider value={ENGRAVE}>
              {fish.map((p, i) => (
                <Rig key={i} url={M + "BarramundiFish.glb"} size={1.2} pos={[-5 + ((F - T.card) * 0.04 + p.ph * 1.6) % 10, p.y, p.z]} rot={[0, Math.PI / 2, 0.05 * Math.sin(t * 6 + p.ph)]} m={{ palette: PAL.slate, atmos: 0.3, seed: 90 + i }} />
              ))}
              <Rig url={M + "DiffuseTransmissionPlant.glb"} size={3.6} pos={[-3.4, -0.6, 0.6]} rot={[0, 0.4, 0]} keep={(n) => n === "leaves"} m={{ palette: PAL.slate, follow: 0, wobble: 0.7, seed: 98 }} />
              <Rig url={M + "IridescenceAbalone.glb"} size={2.6} pos={[0.2, 0, 0]} rot={[-0.5 + 0.4 * k, 0.6 + t * 0.25, 0]} m={{ palette: PAL.slate, foil: 0.95, seed: 99 }} foilPhase={t * 0.35} />
            </Detail.Provider>
          </RefDepth.Provider>
        </World>
        {F > T.card + 18 ? <Headline text="zero joining fee" grad={["#1f2a8a", "#2f7f86", "#5a2a8a"]} t={expoOut(ramp(F, T.card + 18, T.card + 32))} /> : null}
      </AbsoluteFill>
      {whip > 0 ? (
        <AbsoluteFill style={{ opacity: Math.min(1, whip * 2.2) }}>
          <Field f={F} pitch={14} lambda={4000} amp={0} speed={0} width={2} color={mix("#dfe4e0", "#58636a", 0.5)} />
        </AbsoluteFill>
      ) : null}
    </LookCtx.Provider>
  );
};
