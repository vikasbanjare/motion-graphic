/**
 * CSS/SVG fallback for foil (no WebGL): a hue gradient drawn from the measured palette, wobbled by SVG turbulence
 * (irregular thin-film banding), blended with mix-blend-mode: overlay (best-fitting blend, measured), and masked
 * to the object's alpha (maskSrc) or to text (asText).
 * Movement rule (measured): the colour is attached to the object; shift it with the object's motion (pass `shift`
 * from your camera/object transform), it does not sweep on its own in a static hold.
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import type { RampStop } from "./FoilGL";
const hsl = (h: number, s = 100, l = 50) => `hsl(${h} ${s}% ${l}%)`;
/** gradient stops in measured proportions; repeat `cycles` times (measured: 1-1.5 hue cycles across an object) */
export const rampGradient = (ramp: RampStop[], cycles = 1.5, angle = 115, light = 50) => {
  const tot = ramp.reduce((s, r) => s + r.share, 0); const parts: string[] = [];
  for (let c = 0; c < Math.ceil(cycles); c++) { let acc = 0; for (const r of ramp) { const pos = ((c + (acc + r.share / 2) / tot) / cycles) * 100; parts.push(`${hsl(r.hue, 100, light)} ${pos.toFixed(1)}%`); acc += r.share; } }
  return `linear-gradient(${angle}deg, ${parts.join(", ")})`;
};
export const FoilCSS: React.FC<{
  id: string; ramp: RampStop[]; maskSrc?: string; shift?: number; cycles?: number; angle?: number; alpha?: number; wobble?: number; light?: number; style?: React.CSSProperties;
}> = ({ id, ramp, maskSrc, shift = 0, cycles = 1.5, angle = 115, alpha = 0.85, wobble = 60, light = 50, style }) => {
  const mask = maskSrc ? { WebkitMaskImage: `url(${maskSrc})`, maskImage: `url(${maskSrc})`, WebkitMaskSize: "100% 100%", maskSize: "100% 100%" } : {};
  return (
    <AbsoluteFill style={{ mixBlendMode: "overlay", opacity: alpha, ...mask, ...style }}>
      <svg width={0} height={0} style={{ position: "absolute" }} aria-hidden>
        <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0025 0.004" numOctaves={3} seed={11} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={wobble} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <AbsoluteFill style={{ inset: "-10%", background: rampGradient(ramp, cycles, angle, light), backgroundSize: "200% 200%",
        backgroundPosition: `${(shift * 100).toFixed(2)}% 50%`, filter: `url(#${id}) saturate(1)` }} />
    </AbsoluteFill>
  );
};

/**
 * Card-style glint (measured on the bank cards): a soft saturated blob, overlay-blended.
 *  fade-in ~0.25 s, hold 0.4-0.6 s drifting 4-37 px/s @640w (0.009-0.058 W/s, typ 0.04) while the hue turns 5-100 deg (median ~40),
 *  fade-out ~0.12 s; horizontal sigma 11-25 px @640w (0.017-0.039 W); peak sat 0.6-0.7; repeats every ~1.0-1.2 s,
 *  staggered between elements (never in sync).
 */
export const Glint: React.FC<{ t: number; start: number; x0: number; y: number; hue0: number; width: number; height: number; dur?: number; drift?: number; hueTurn?: number; sigmaW?: number }> = ({
  t, start, x0, y, hue0, width, height, dur = 0.85, drift = 0.03, hueTurn = 40, sigmaW = 0.025 }) => {
  const u = t - start; if (u < 0 || u > dur) return null;
  const a = u < 0.25 ? u / 0.25 : u > dur - 0.12 ? (dur - u) / 0.12 : 1;
  const x = (x0 + drift * u) * width; const h = hue0 + hueTurn * (u / dur); const s = sigmaW * width;
  return <AbsoluteFill style={{ mixBlendMode: "overlay", opacity: a, background: `radial-gradient(ellipse ${2.6 * s}px ${1.6 * s}px at ${x}px ${y * height}px, hsl(${h} 100% 50%) 0%, hsl(${h + 20} 100% 50% / 0.6) 45%, transparent 100%)` }} />;
};
