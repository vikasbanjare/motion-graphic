import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { LookCtx, mix } from "../../../ensemble/look.ts";
import { Contours, Matte, Paper, Pen, type Stroke } from "../../../ensemble/layers.tsx";
import { Field, Wash } from "../../../ensemble/paint2d.tsx";
import { Globe, PenType } from "../../../ensemble/globe-type.tsx";
import { Solids, box, iso, moveSolid, type Solid, type View } from "../../../ensemble/iso.tsx";
import { circle, polyD, type Pt } from "../../../ensemble/paths.ts";
import { expoOut, onsetAfter, pop, ramp } from "../../../ensemble/score.ts";
import { ParcelTake } from "./Parcels.tsx";
import { LOOKS, T } from "./looks.ts";

/**
 * 207-290 macro: the camera dives into the card's engraved band (bezier-js offsets) until its lines are the frame;
 *   the band hands over to the canvas line field (same pitch and angle), then the pen draws a lens.
 * 282-392 travel: inside the lens, the travel world (match-cut on the circle). Natural Earth globe drawn by the pen
 *   (topojson + world-atlas), routes drawn on from India on the mix onsets (meyda), a suitcase and passports in
 *   watercolour + hatch + ink, d3-contour sea rings, the copy written by the pen. Graded teal -> sand (culori).
 */
const W = 1920, H = 1080;
const LENS = { x: W * 0.62, y: H * 0.5, r: 330 };
const BAND_PT = { x: W / 2 - 11, y: H / 2 - 40 + 25 };
const TEAL = "#6fa597";

export const MacroTake: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const z = Math.pow(14, expoOut(ramp(F, T.macro, T.push)) ** 1.6);
  const handoff = ramp(F, T.push - 18, T.push - 2);
  const lens = ramp(F, 268, 286);
  return (
    <LookCtx.Provider value={LOOKS.fee}>
      <AbsoluteFill style={{ background: TEAL }}>
        {handoff < 1 ? (
          <AbsoluteFill style={{ transformOrigin: `${BAND_PT.x}px ${BAND_PT.y}px`, transform: `scale(${z})`, opacity: 1 - handoff }}>
            <ParcelTake from={T.wash} freeze={T.macro - 1} />
          </AbsoluteFill>
        ) : null}
        {handoff > 0 ? (
          <AbsoluteFill style={{ opacity: handoff }}>
            <Paper color={TEAL} grain={0.28} />
            <Field f={F} pitch={84} lambda={620} amp={22} speed={4} width={11} color="#eaf6f0" angle={17} noiseAmp={0.2} />
          </AbsoluteFill>
        ) : null}
        {lens > 0 ? <Pen strokes={[{ pts: [...circle(LENS.x, LENS.y, LENS.r, 120), [LENS.x + LENS.r, LENS.y] as Pt], t1: expoOut(lens), size: 1.3, color: "#1f3a3c", taper: 20 }]} f={F} /> : null}
      </AbsoluteFill>
    </LookCtx.Provider>
  );
};

// ---- travel ----------------------------------------------------------------------------------------------------
const CITIES: Record<string, [number, number]> = {
  mumbai: [72.88, 19.08],
  london: [-0.13, 51.51],
  dubai: [55.27, 25.2],
  singapore: [103.82, 1.35],
  paris: [2.35, 48.86],
  bali: [115.19, -8.41],
};
const ROUTES: [string, string][] = [["mumbai", "dubai"], ["mumbai", "london"], ["mumbai", "singapore"], ["mumbai", "paris"], ["mumbai", "bali"]];

/** Great-circle arc (slerp) lifted off the surface, projected orthographically; points behind the globe dropped. */
const arc = (a: [number, number], b: [number, number], lon0: number, lat0: number, R: number, cx: number, cy: number): Pt[] => {
  const r = Math.PI / 180;
  const v = ([lo, la]: [number, number]) => [Math.cos(la * r) * Math.cos(lo * r), Math.cos(la * r) * Math.sin(lo * r), Math.sin(la * r)];
  const A = v(a), B = v(b);
  const om = Math.acos(Math.min(1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2]));
  const out: Pt[] = [];
  for (let i = 0; i <= 48; i++) {
    const t = i / 48;
    const s0 = Math.sin((1 - t) * om) / Math.sin(om), s1 = Math.sin(t * om) / Math.sin(om);
    const p = [A[0] * s0 + B[0] * s1, A[1] * s0 + B[1] * s1, A[2] * s0 + B[2] * s1];
    const lift = 1 + 0.16 * Math.sin(Math.PI * t) * Math.min(1, om * 1.4);
    const lon = Math.atan2(p[1], p[0]) / r, lat = Math.asin(p[2]) / r;
    const l = (lon - lon0) * r, ph = lat * r, p0 = lat0 * r;
    const cosc = Math.sin(p0) * Math.sin(ph) + Math.cos(p0) * Math.cos(ph) * Math.cos(l);
    if (cosc < -0.05 * lift) continue;
    const x = Math.cos(ph) * Math.sin(l), y = -(Math.cos(p0) * Math.sin(ph) - Math.sin(p0) * Math.cos(ph) * Math.cos(l));
    out.push([cx + x * R * lift, cy + y * R * lift]);
  }
  return out;
};

const luggage = (v: View): Solid[] => {
  const P = (x: number, y: number, z: number) => iso(x, y, z, v);
  const case_ = box(0, 0, 0, 200, 80, 150, v, "#d9775a");
  case_.detail = [
    { pts: Array.from({ length: 13 }, (_, i) => { const a = (i / 12) * Math.PI; return P(100 - 36 * Math.cos(a), 40, 150 + 26 * Math.sin(a)); }), size: 0.7, taper: 4 },
    { pts: [P(60, 80, 0), P(60, 80, 150)], size: 0.35, taper: 2, color: "#8a3328" },
    { pts: [P(140, 80, 0), P(140, 80, 150)], size: 0.35, taper: 2, color: "#8a3328" },
  ];
  const pass1 = box(240, 10, 0, 90, 120, 10, v, "#2b5f93");
  const pass2 = box(250, 0, 10, 90, 120, 10, v, "#5d64a3");
  pass2.detail = [{ pts: Array.from({ length: 17 }, (_, i) => { const a = (i / 16) * Math.PI * 2; return P(295 + 22 * Math.cos(a), 60 + 22 * Math.sin(a), 20.5); }), size: 0.3, taper: 1, color: "#e8cf96" }];
  return [case_, pass1, pass2];
};

export const TravelTake: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const look = LOOKS.travel;
  // the lens opens to the frame (match-cut on the pen circle)
  const open = expoOut(ramp(F, T.swap, T.swap + 18));
  const lensR = LENS.r + 1500 * open;
  const lon = 30 + 55 * ramp(F, T.swap - 8, T.matte + 11);
  const lat = 16;
  const coast = expoOut(ramp(F, T.swap - 6, T.swap + 26));
  const routeAt = [0, 1, 2, 3, 4].map((k) => onsetAfter(T.swap + 12, k * 2));
  const strokes: Stroke[] = ROUTES.map(([a, b], i) => {
    const pts = arc(CITIES[a], CITIES[b], lon, lat, LENS.r, LENS.x, LENS.y);
    return { pts, t1: expoOut(ramp(F, routeAt[i], routeAt[i] + 14)), size: 0.6, color: look.accent, taper: 10 };
  });
  const v: View = { ox: W * 0.13, oy: H * 0.66, k: 1.15 };
  const items = useMemo(() => luggage(v), []); // eslint-disable-line react-hooks/exhaustive-deps
  const drops = [onsetAfter(T.tilt + 4), onsetAfter(T.tilt + 12), onsetAfter(T.tilt + 18)];
  const solids = items.map((s, i) => (F >= drops[i] ? moveSolid(s, -420 * (1 - pop(F, drops[i])), 1) : null)).filter((s): s is Solid => !!s);
  const paper = mix(TEAL, look.paper, ramp(F, T.swap - 8, T.swap + 10));
  const ringD = polyD(circle(LENS.x, LENS.y, Math.max(1, lensR), 120), true);
  return (
    <LookCtx.Provider value={look}>
      <Matte d={ringD}>
        <Paper color={paper} />
        <Contours f={F} levels={10} scale={1.6} drift={0.005} opacity={0.35} width={0.7} color={look.inkSoft} seed={23} />
        <Wash shapes={[{ ring: circle(LENS.x, LENS.y, LENS.r, 96), color: "#c3c1db", opacity: 150, bleed: 0.04, texture: 0.6 }]} seed={31} />
        <Globe cx={LENS.x} cy={LENS.y} r={LENS.r} lon={lon} lat={lat} draw={coast} land="#e8cf96" graticule={0.3} />
        <Pen strokes={strokes} f={F} />
        {strokes.map((s, i) => {
          const t = s.t1 ?? 0;
          if (t <= 0.02 || t >= 0.999 || s.pts.length < 2) return null;
          const k = Math.min(s.pts.length - 1, Math.floor(t * (s.pts.length - 1)));
          const [x, y] = s.pts[k];
          return <Pen key={i} strokes={[{ pts: circle(x, y, 7, 16).concat([[x + 7, y]]), size: 0.5, color: look.ink, taper: 1 }]} f={F} />;
        })}
        <Solids solids={solids} f={F} seed={9} washOpacity={195} id="lug" />
        {F >= T.tilt + 14 ? <PenType text="redeem on flights, hotels" x={110} y={H - 110} size={66} draw={ramp(F, T.tilt + 14, T.tilt + 32)} fill={ramp(F, T.tilt + 30, T.tilt + 40)} color={look.ink} /> : null}
      </Matte>
    </LookCtx.Provider>
  );
};
