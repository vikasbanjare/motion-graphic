import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Face, Rosette } from "./CardFace.tsx";
import { LensRim, LensVignette, Paper } from "./fx.tsx";
import { C, P, T, lerp, ramp } from "./look.ts";

/**
 * Hard cut into a loupe on the card's hexagonal cartouche (green inks), then a log-scale pull-back to the whole card
 * (cubic-bezier(0.75,0,0.3,1), peak speed on beat 46 as the card edges enter) on a deep-green paper ground with a faint
 * rotating rosette, then a whip down-left that hides the cut into the studio (match on action).
 */
const pb = Easing.bezier(0.75, 0, 0.3, 1);
const CART = { x: 430, y: 790 }; // cartouche centre in face coords

export const CardTake: React.FC = () => {
  const lf = useCurrentFrame();
  const f = lf + T.cutCard;
  // settle-back under the loupe, then the pull-back
  const settle = 1 + 0.07 * Math.exp(-lf / 12);
  const p = interpolate(f, [510, 550], [0, 1], { ...C, easing: pb });
  const sEnd = 0.66;
  const s0 = 3.1 * settle;
  const s = Math.exp(lerp(Math.log(s0), Math.log(sEnd), p));
  // focus point travels from the cartouche to the card centre
  const fx = lerp(CART.x, 960, p), fy = lerp(CART.y, 540, p);
  // whip (ease-in, power 2.5) down-left with roll and scale
  const w = Math.pow(ramp(f, T.whip, T.studio, (t) => t), 2.5);
  const wx = -1.25 * 1920 * w, wy = 0.5 * 1080 * w;
  const tilt = lerp(0, 9, p);
  const rz = lerp(0, -5, p) - 6 * w + (f - 484) * 0.03;
  const lensK = 1 + 0.11 * ramp(f, 520, 540);
  const lensO = 1 - ramp(f, 522, 542);
  const blur = Math.min(16, 40 * (w - Math.pow(Math.max(0, (f - 1 - T.whip) / (T.studio - T.whip)), 2.5)) * 4);
  const shadow = ramp(f, 524, 548);
  return (
    <AbsoluteFill style={{ background: "#123826" }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, #1d4a33 0%, #123826 55%, #0a2318 100%)" }} />
      <AbsoluteFill style={{ transform: `translate(${wx * 0.35}px, ${wy * 0.35}px) rotate(${(f - 484) * 0.08}deg)`, opacity: 0.16 * (1 - ramp(f, 540, 552)) }}>
        <svg width={1920} height={1080}>
          <Rosette cx={960} cy={540} R={760} color="#c9c1dc" n={34} k={18} sw={2} />
        </svg>
      </AbsoluteFill>
      <Paper heavy />
      <AbsoluteFill style={{ perspective: 1800 }}>
        <AbsoluteFill
          style={{
            transform: `translate(${960 - fx + wx}px, ${540 - fy + wy}px) rotateX(${tilt}deg) rotateZ(${rz}deg) scale(${s * (1 + 0.15 * w)})`,
            transformOrigin: `${fx}px ${fy}px`,
            filter: `${blur > 0.4 ? `blur(${blur.toFixed(1)}px) ` : ""}drop-shadow(0 ${30 * shadow}px ${40 * shadow}px rgba(0,0,0,${0.45 * shadow}))`,
          }}
        >
          <Face f={T.reveal} clip security={1} ink="#1c3d2a" fill="#e6e8cf" view={{ settled: true, inks: { a: P.green, b: [["#2a4a22", 0], ["#6d8f5a", 0.45], ["#d3dfb8", 0.83], ["#f3efdc", 1]], hero: [["#1e532e", 0], ["#7b9d76", 0.5], ["#f7f3db", 1]] } }} fieldInk="#4f6f58" stripPhase={0.2} />
        </AbsoluteFill>
      </AbsoluteFill>
      {lensO > 0 ? (
        <>
          <LensRim radiusScale={lensK} />
          <LensVignette radiusScale={lensK} opacity={lensO} />
        </>
      ) : null}
    </AbsoluteFill>
  );
};
