import React, { useMemo } from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { LookCtx, mix } from "../../../ensemble/look.ts";
import { Contours, Matte, Paper, Pen, Ribbon } from "../../../ensemble/layers.tsx";
import { Wash } from "../../../ensemble/paint2d.tsx";
import { PenType } from "../../../ensemble/globe-type.tsx";
import { Solids, box, cylinder, iso, moveSolid, sphere, type Solid, type View } from "../../../ensemble/iso.tsx";
import { circle, morph, roundRect, xf, type Pt } from "../../../ensemble/paths.ts";
import { expoOut, onsetAfter, pop, ramp } from "../../../ensemble/score.ts";
import { CARD, LOOKS, T } from "./looks.ts";

/**
 * 72-207: the parcel world and the card reveal.
 *   72-104  the world opens inside the disc (Matte), contours (d3-contour) for ground, culori grade from the opening
 *   88-147  parcels, gift, bag, tin, ball drop on the mix onsets (meyda); each is p5.brush wash + roughjs hatch + pen
 *   116-150 "5% rewards on online shopping" written by the pen (opentype outlines) then filled
 *   150-170 the frame matte morphs into the card (flubber): the world shrinks into the card's print
 *   164-207 engraved bands (bezier-js offsets), the official logo, the product line
 */
const W = 1920, H = 1080;
const LOGO = staticFile("custom/cred-v2/cred-logo.png");


/** A flat strip lying on box faces (tape, ribbon): no volume, no shadow, just painted faces. */
const decal = (faces: { ring: Pt[]; tone: 0 | 1 | 2 }[], hue: string): Solid => ({ hue, faces, edges: faces.map((f) => [...f.ring, f.ring[0]]), shadow: [], decal: true });

const world = (v: View): { s: Solid; at: number }[] => {
  const P = (x: number, y: number, z: number) => iso(x, y, z, v);
  const q = (...p: [number, number, number][]) => p.map(([a, b, c]) => P(a, b, c));
  const ats = [0, 1, 2, 3, 4, 5].map((k) => onsetAfter(89, k * 2));
  const bag = box(-420, 110, 0, 170, 70, 210, v, "#4f9792");
  bag.detail = [
    { pts: Array.from({ length: 17 }, (_, i) => { const a = (i / 16) * Math.PI; return P(-335 - 50 * Math.cos(a), 145, 210 + 70 * Math.sin(a)); }), size: 0.6, taper: 4 },
    { pts: [P(-420, 180, 170), P(-250, 180, 170)], size: 0.3, taper: 2 },
  ];
  const big = box(-180, -80, 0, 240, 170, 140, v, "#c89a55");
  big.detail = [{ pts: [P(-170, 90, 100), P(-120, 90, 100), P(-120, 90, 60), P(-170, 90, 60), P(-170, 90, 100)], size: 0.35, taper: 2 }];
  // tape across the top (along y) and down the front-left face (y = 90)
  const tape = decal([{ ring: q([-74, -80, 140], [-46, -80, 140], [-46, 90, 140], [-74, 90, 140]), tone: 0 }, { ring: q([-74, 90, 0], [-46, 90, 0], [-46, 90, 140], [-74, 90, 140]), tone: 1 }], "#9c7136");
  const small = box(-150, -50, 141, 150, 110, 80, v, "#dcb983");
  const tape2 = decal([{ ring: q([-86, -50, 221], [-64, -50, 221], [-64, 60, 221], [-86, 60, 221]), tone: 0 }, { ring: q([-86, 60, 141], [-64, 60, 141], [-64, 60, 221], [-86, 60, 221]), tone: 1 }], "#9c7136");
  const gift = box(150, -230, 0, 140, 140, 130, v, "#b9688a");
  // ribbon: one band along y (top + front-left face), one along x (top + front-right face)
  const ribA = decal([{ ring: q([208, -230, 130], [232, -230, 130], [232, -90, 130], [208, -90, 130]), tone: 0 }, { ring: q([208, -90, 0], [232, -90, 0], [232, -90, 130], [208, -90, 130]), tone: 1 }], "#e9c27a");
  const ribB = decal([{ ring: q([150, -172, 130], [290, -172, 130], [290, -148, 130], [150, -148, 130]), tone: 0 }, { ring: q([290, -172, 0], [290, -148, 0], [290, -148, 130], [290, -172, 130]), tone: 2 }], "#e9c27a");
  // bow: two loops standing on the knot, each a small washed ellipse in a vertical plane
  const loop = (dx: number): Pt[] => Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * Math.PI * 2;
    return P(220 + dx + 24 * Math.cos(a) * Math.sign(dx), -160 + 6 * Math.cos(a), 150 + 20 * Math.sin(a));
  });
  const bow = decal([{ ring: loop(-22), tone: 1 }, { ring: loop(22), tone: 0 }], "#c24a3a");
  const tin = cylinder(190, 170, 0, 62, 100, v, "#5d64a3");
  const ball = sphere(390, -10, 0, 48, v, "#d9775a");
  // back to front (iso depth), each with the onset it lands on
  return [
    { s: bag, at: ats[1] },
    { s: big, at: ats[0] },
    { s: tape, at: ats[0] },
    { s: small, at: ats[4] },
    { s: tape2, at: ats[4] },
    { s: gift, at: ats[2] },
    { s: ribA, at: ats[2] },
    { s: ribB, at: ats[2] },
    { s: bow, at: ats[2] },
    { s: tin, at: ats[3] },
    { s: ball, at: ats[5] },
  ];
};

/** The world, at frame F (absolute). */
const ParcelWorld: React.FC<{ F: number; paper: string }> = ({ F, paper }) => {
  const v: View = { ox: W * 0.52, oy: H * 0.5, k: 1.3 };
  const items = useMemo(() => world(v), []); // eslint-disable-line react-hooks/exhaustive-deps
  const solids = items
    .filter((it) => F >= it.at)
    .map((it) => {
      const p = pop(F, it.at);
      return moveSolid(it.s, -460 * (1 - p), 1);
    });
  const look = LOOKS.parcel;
  return (
    <AbsoluteFill style={{ transform: `scale(${1 + 0.05 * ramp(F, 86, 150)})` }}>
      <Paper color={paper} />
      <Contours f={F} levels={14} scale={2.2} drift={0.006} opacity={0.4} width={0.8} color={look.inkSoft} draw={ramp(F, T.wash, T.wash + 20)} />
      <Solids solids={solids} f={F} seed={5} washOpacity={195} />
    </AbsoluteFill>
  );
};

/** 72-207 with its own clock offset. */
export const ParcelTake: React.FC<{ from: number; freeze?: number; caption?: boolean }> = ({ from, freeze, caption = true }) => {
  const now = useCurrentFrame() + from;
  const F = freeze ?? now;
  const look = LOOKS.parcel;
  // the opening disc: grows at the wash, then fills the frame
  const r = F < T.assembly ? 0.56 * H * expoOut(ramp(F, T.wash, T.assembly)) : 0.56 * H + 1500 * expoOut(ramp(F, T.assembly, T.assembly + 18));
  const disc = circle(W * 0.29 + (W * 0.21) * ramp(F, T.assembly, T.assembly + 18), H / 2, Math.max(1, r), 120);
  // the card: the frame matte morphs into the card, the world shrinks into the print
  const cx = W / 2, cy = H / 2 - 40;
  const k = expoOut(ramp(F, T.reveal, T.reveal + 20));
  const frameRing = roundRect(-40, -40, W + 80, H + 80, 2, 6);
  const cardRing = roundRect(cx - CARD.w / 2, cy - CARD.h / 2, CARD.w, CARD.h, CARD.r, 10);
  const matte = F < T.reveal ? null : morph("v5-frame-card", frameRing, cardRing, 8)(k);
  const shrink = 1 - (1 - CARD.w / W) * k;
  const tint = ramp(F, T.reveal + 6, T.reveal + 22);
  const inner = (
    <AbsoluteFill style={{ transform: `translate(${(cx - W / 2) * k}px, ${(cy - H / 2) * k}px) scale(${shrink})` }}>
      <ParcelWorld F={F} paper={mix(look.paper, look.washes[1], tint * 0.6)} />
      {F < T.reveal + 4 ? (
        <PenType text="5% rewards on online shopping" x={110} y={H - 110} size={66} draw={ramp(F, 116, 136)} fill={ramp(F, 134, 146)} color={look.ink} />
      ) : null}
    </AbsoluteFill>
  );
  const bands = useMemo(
    () => [
      [[cx - 380, cy + 40], [cx - 150, cy - 160], [cx + 120, cy + 220], [cx + 380, cy - 20]],
      [[cx - 380, cy + 110], [cx - 120, cy - 60], [cx + 160, cy + 260], [cx + 380, cy + 60]],
    ] as [Pt, Pt, Pt, Pt][],
    [cx, cy],
  );
  return (
    <LookCtx.Provider value={look}>
      <AbsoluteFill>
        {F >= T.reveal ? (
          <>
            <Paper color={mix(look.paper, LOOKS.fee.paper, k)} />
            <Wash shapes={[{ ring: xf(cardRing, 1, 0, 26, 30), color: "#55606a", opacity: 60 * k, bleed: 0.2, texture: 0.3 }]} seed={21} />
          </>
        ) : null}
        <Matte d={matte ?? `M${disc.map((p) => p.join(",")).join("L")}Z`}>
          {inner}
          {F >= T.reveal ? (
            <>
              <AbsoluteFill style={{ background: look.washes[2], mixBlendMode: "multiply", opacity: 0.55 * tint }} />
              {bands.map((c, i) => (
                <Ribbon key={i} c={c} lines={11} spacing={6} draw={expoOut(ramp(F, T.reveal + 14 + i * 5, T.reveal + 40 + i * 5))} color="#eaf6f0" width={0.42} />
              ))}
              <AbsoluteFill style={{ opacity: ramp(F, T.reveal + 28, T.reveal + 36) }}>
                <Img src={LOGO} style={{ position: "absolute", left: cx - CARD.w / 2 + 50, top: cy - CARD.h / 2 + 44, height: 82 }} />
              </AbsoluteFill>
            </>
          ) : null}
        </Matte>
        {F >= T.reveal ? (
          <Pen strokes={[{ pts: [...cardRing, cardRing[0]], t1: k, size: 0.5, color: look.ink, taper: 2 }]} f={F} />
        ) : null}
        {caption && F >= T.reveal + 26 ? (
          <PenType text="the CRED IndusInd Bank RuPay credit card" x={cx} y={cy + CARD.h / 2 + 100} size={44} draw={ramp(F, T.reveal + 26, T.reveal + 44)} fill={ramp(F, T.reveal + 42, T.reveal + 50)} align="center" color={look.ink} />
        ) : null}
      </AbsoluteFill>
    </LookCtx.Provider>
  );
};
