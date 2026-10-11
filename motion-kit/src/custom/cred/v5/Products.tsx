import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { LookCtx, mix } from "../../../ensemble/look.ts";
import { Matte, MorphShape, Paper, Pen } from "../../../ensemble/layers.tsx";
import { Field, Wash } from "../../../ensemble/paint2d.tsx";
import { PenType } from "../../../ensemble/globe-type.tsx";
import { Solids, box, cylinder, iso, moveSolid, sphere, type Solid, type View } from "../../../ensemble/iso.tsx";
import { circle, mpD, polyD, roundRect, union, xf, type Ring } from "../../../ensemble/paths.ts";
import { expoOut, onsetAfter, pop, ramp } from "../../../ensemble/score.ts";
import { ParcelTake } from "./Parcels.tsx";
import { CARD, LOOKS, T } from "./looks.ts";

/**
 * 381-392 matte: three card slabs sweep in (polygon-clipping union) and carry the products world over the globe.
 * 392-484 products: a still life on plinths, each object watercolour + hatch + ink, dropping on the onsets; the
 *   opening's line field returns faintly as the backdrop (the film's thread); the copy written by the pen.
 * 484-561 fee: the hero plinth's top morphs into the card (flubber); the card returns with "zero joining fee";
 *   550 whip: the field stretches into speed lines.
 */
const W = 1920, H = 1080;

const slabs = (F: number): string => {
  const rs: Ring[] = [0, 1, 2].map((i) => {
    const t = expoOut(ramp(F, T.matte + i * 2, T.matte + 11 + i * 2));
    const x = W + 200 - (W + 1400) * t;
    return xf(roundRect(x + i * 260, -300 + i * 120, 900, 1500, 40, 6), 1, -0.32, 0, 0, x, 0);
  });
  return mpD(union(...rs));
};

const stillLife = (v: View): { s: Solid; at: number }[] => {
  const P = (x: number, y: number, z: number) => iso(x, y, z, v);
  const at = (k: number) => onsetAfter(T.products + 4, k);
  const plinthA = cylinder(-220, 40, 0, 95, 110, v, "#e7ab91");
  const ball = sphere(-220, 40, 110, 52, v, "#4f7d5c");
  const plinthB = box(-40, -180, 0, 190, 190, 60, v, "#f1d3c2");
  const gift = box(0, -140, 60, 110, 110, 100, v, "#a64c3b");
  gift.detail = [
    { pts: [P(55, -140, 160), P(55, -30, 160), P(55, -30, 60)], size: 0.9, color: "#f6ebcb", taper: 2 },
    { pts: [P(0, -85, 160), P(110, -85, 160), P(110, -85, 60)], size: 0.9, color: "#f6ebcb", taper: 2 },
  ];
  const plinthC = cylinder(210, 60, 0, 85, 170, v, "#e7ab91");
  const bottle = cylinder(210, 60, 170, 30, 120, v, "#2b5f93");
  const cap = cylinder(210, 60, 290, 14, 30, v, "#121214");
  const pot = cylinder(420, 120, 0, 50, 70, v, "#b98536");
  const leaves = sphere(420, 120, 70, 62, v, "#4f7d5c");
  const box2 = box(330, -120, 0, 120, 90, 80, v, "#c8a46a");
  return [
    { s: plinthB, at: at(0) },
    { s: box2, at: at(3) },
    { s: gift, at: at(2) },
    { s: plinthA, at: at(0) },
    { s: ball, at: at(4) },
    { s: plinthC, at: at(1) },
    { s: bottle, at: at(5) },
    { s: cap, at: at(5) },
    { s: pot, at: at(6) },
    { s: leaves, at: at(6) },
  ];
};

const V: View = { ox: W * 0.55, oy: H * 0.5, k: 1.25 };
const CX = W / 2, CY = H / 2 - 40;
// the hero plinth's top (where the card is born at 484)
const plinthTop = (): Ring => Array.from({ length: 64 }, (_, i) => iso(-220 + 95 * Math.cos((i / 64) * Math.PI * 2), 40 + 95 * Math.sin((i / 64) * Math.PI * 2), 110, V));

export const ProductsTake: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const look = LOOKS.products;
  const items = useMemo(() => stillLife(V), []);
  const solids = items.filter((it) => F >= it.at).map((it) => moveSolid(it.s, -480 * (1 - pop(F, it.at)), 1));
  const push = 1 + 0.06 * ramp(F, T.products, T.card);
  const content = (
    <LookCtx.Provider value={look}>
      <AbsoluteFill style={{ transform: `scale(${push})` }}>
        <Paper />
        <Field f={F} pitch={25.5} lambda={105} amp={5} speed={2} width={1.6} color={mix(look.paper, look.inkSoft, 0.45)} angle={-4} opacity={0.8} />
        <Wash shapes={[{ ring: Array.from({ length: 64 }, (_, i) => [W * 0.55 + 760 * Math.cos((i / 64) * Math.PI * 2), H * 0.62 + 300 * Math.sin((i / 64) * Math.PI * 2)] as [number, number]), color: look.washes[0], opacity: 200, bleed: 0.15, texture: 0.5 }]} seed={41} />
        <Solids solids={solids} f={F} seed={13} washOpacity={190} id="prod" />
      </AbsoluteFill>
      {F >= T.products + 36 && F < T.card + 6 ? (
        <PenType text="and 2,000+ products on CRED store" x={110} y={H - 110} size={62} draw={ramp(F, T.products + 36, T.products + 56)} fill={ramp(F, T.products + 54, T.products + 64)} color={look.ink} />
      ) : null}
    </LookCtx.Provider>
  );
  return F < T.products ? <Matte d={slabs(F)}>{content}</Matte> : <AbsoluteFill>{content}</AbsoluteFill>;
};

export const FeeTake: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const look = LOOKS.fee;
  const k = expoOut(ramp(F, T.card, T.card + 18));
  const cardRing = roundRect(CX - CARD.w / 2, CY - CARD.h / 2, CARD.w, CARD.h, CARD.r, 10);
  const top = plinthTop().map(([x, y]) => [W / 2 + (x - W / 2) * 1.06, H / 2 + (y - H / 2) * 1.06] as [number, number]); // products push-in at 484
  const whip = ramp(F, T.whip - 4, T.studio);
  const cardIn = ramp(F, T.card + 12, T.card + 20);
  return (
    <LookCtx.Provider value={look}>
      <AbsoluteFill style={{ opacity: ramp(F, T.card + 2, T.card + 16) }}>
        <Paper />
      </AbsoluteFill>
      <AbsoluteFill style={{ transform: `translateX(${-2200 * whip * whip}px)` }}>
        {/* the morphing shape carries the cut: plinth top -> card */}
        <AbsoluteFill style={{ opacity: 1 - cardIn }}>
          <MorphShape id="v5-plinth-card" a={top} b={cardRing} t={k} fill="#6fa597" />
        </AbsoluteFill>
        <AbsoluteFill style={{ opacity: cardIn }}>
          <ParcelTake from={T.wash} freeze={T.macro - 1} caption={false} />
        </AbsoluteFill>
        {F >= T.card + 22 ? (
          <PenType text="zero joining fee" x={CX} y={CY + CARD.h / 2 + 120} size={84} draw={ramp(F, T.card + 22, T.card + 40)} fill={ramp(F, T.card + 38, T.card + 46)} align="center" color={look.ink} />
        ) : null}
      </AbsoluteFill>
      {whip > 0 ? (
        <AbsoluteFill style={{ opacity: Math.min(1, whip * 2.2) }}>
          <Field f={F} pitch={14} lambda={4000} amp={0} speed={0} width={2} color={mix(look.paper, look.ink, 0.5)} angle={0} reveal={1} />
        </AbsoluteFill>
      ) : null}
      {F >= T.card && F < T.card + 22 ? <Pen strokes={[{ pts: [...cardRing, cardRing[0]], t1: k, size: 0.5, taper: 2 }]} f={F} /> : null}
    </LookCtx.Provider>
  );
};

/** 561-575 iris: a pen circle opens the studio out of the speed lines. */
export const irisD = (F: number) => polyD(circle(W / 2, H / 2, Math.max(1, 1200 * expoOut(ramp(F, T.studio, T.studio + 14))), 120), true);

/** 630-645 ink flood: a watercolour blot of ink grows over the studio and becomes the black of the lockup. */
export const InkFlood: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const t = expoOut(ramp(F, T.lockup - 15, T.lockup));
  const r = 40 + 1250 * t;
  return (
    <AbsoluteFill>
      <Wash shapes={[{ ring: circle(W / 2, H / 2, r, 96), color: "#0b0b0d", opacity: 255, bleed: 0.12, texture: 0.2 }]} seed={57} />
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        <circle cx={W / 2} cy={H / 2} r={Math.max(0, r * 0.9 - 30)} fill="#0b0b0d" />
      </svg>
    </AbsoluteFill>
  );
};
