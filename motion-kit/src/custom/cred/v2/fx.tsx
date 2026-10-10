import React from "react";
import { AbsoluteFill, Img, staticFile, useVideoConfig } from "remotion";

/**
 * 2D effects, adapted from the research prototypes (RC/fx/proto/remotion/src/fx; original code, measured numbers):
 * Lens (loupe vignette, measured edge profile), HoloBand (security-thread band), Paper (static grain), SheenText.
 */

// ---- Lens -----------------------------------------------------------------------------------------------------------
// [offset from R50 in px@360, vignette alpha], measured on four loupe scenes; widened x1.6 so the 10-90 feather reads
// ~0.15 H by the scorecard's azimuthal method (the prototype measured 0.092 H vs 0.158-0.167 H in the reference).
const EDGE: [number, number][] = [
  [-60, 0.001], [-50, 0.017], [-40, 0.037], [-35, 0.063], [-30, 0.093], [-25, 0.129], [-20, 0.173], [-15, 0.233],
  [-10, 0.307], [-5, 0.395], [0, 0.486], [5, 0.585], [10, 0.686], [15, 0.779], [20, 0.871], [25, 0.941], [30, 0.987], [35, 1],
];
export const LENS = { r50: 0.83, cx: 0.508, cy: 0.527 };

export const LensVignette: React.FC<{ r50?: number; cx?: number; cy?: number; radiusScale?: number; opacity?: number; feather?: number; dark?: string }> = ({
  r50 = LENS.r50,
  cx = LENS.cx,
  cy = LENS.cy,
  radiusScale = 1,
  opacity = 1,
  feather = 1.6,
  dark = "11,13,12",
}) => {
  const { width, height } = useVideoConfig();
  const R = r50 * height * radiusScale;
  const at = `${cx * width}px ${cy * height}px`;
  const stops = EDGE.map(([d, a]) => `rgba(${dark},${(a * opacity).toFixed(3)}) ${Math.max(0, R + ((d * feather) / 360) * height).toFixed(1)}px`).join(", ");
  return <AbsoluteFill style={{ background: `radial-gradient(circle at ${at}, rgba(${dark},0) 0px, ${stops})`, pointerEvents: "none" }} />;
};

/** Rim softening: blurred + desaturated toward the rim (backdrop-filter, one render of the content; no barrel
 * distortion, no CA, as measured). Place it above the content and under the vignette. */
export const LensRim: React.FC<{ r50?: number; cx?: number; cy?: number; radiusScale?: number }> = ({ r50 = LENS.r50, cx = LENS.cx, cy = LENS.cy, radiusScale = 1 }) => {
  const { width, height } = useVideoConfig();
  const R = r50 * height * radiusScale;
  const at = `${cx * width}px ${cy * height}px`;
  const mask = `radial-gradient(circle at ${at}, transparent ${0.5 * R}px, #000 ${0.9 * R}px)`;
  return <AbsoluteFill style={{ backdropFilter: "blur(2.2px) saturate(0.78)", WebkitMaskImage: mask, maskImage: mask, pointerEvents: "none" }} />;
};

// ---- Holographic band -----------------------------------------------------------------------------------------------
// Measured pastel ramp (S p50 0.27, V p50 0.89), ~2 colour cycles, white wavy overprint at 40 %.
const BAND = ["#f1caca", "#fbd8b9", "#fcd8a3", "#fadba3", "#ebdbaf", "#c7e5d2", "#a3c8e4", "#8daad3", "#89a0c8", "#889bbc"];
export const bandGradient = (cycles = 2, offset = 0) => {
  const stops: string[] = [];
  for (let c = 0; c < cycles; c++) {
    BAND.forEach((col, i) => stops.push(`${col} ${(((c + (0.9 * i) / (BAND.length - 1)) / cycles) * 100).toFixed(2)}%`));
    stops.push(`#c9b3dc ${(((c + 0.95) / cycles) * 100).toFixed(2)}%`);
  }
  stops.push(`${BAND[0]} 100%`);
  return { background: `linear-gradient(90deg, ${stops.join(", ")})`, backgroundSize: "100% 100%", backgroundPosition: `${offset * 100}% 0` };
};

export const BandLines: React.FC<{ width: number; height: number; opacity?: number; phase?: number }> = ({ width, height, opacity = 0.4, phase = 0 }) => {
  const pitch = 0.124 * height, period = 2 * height, amp = 0.17 * height;
  const paths: string[] = [];
  for (let k = -2; k * pitch < height + amp * 2; k++) {
    const y0 = k * pitch;
    let d = "";
    for (let x = -period; x <= width + period; x += period / 10) {
      const y = y0 + amp * Math.sin((2 * Math.PI * (x + phase)) / period + k * 0.35);
      d += `${d ? " L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    paths.push(d);
  }
  return (
    <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#fff" strokeOpacity={opacity} strokeWidth={Math.max(1, height * 0.012)} />
      ))}
    </svg>
  );
};

// ---- Paper ----------------------------------------------------------------------------------------------------------
/** Static paper mottle + grain (soft-light). The reference has no animated grain. Pre-generated noise PNGs
 * (public/custom/cred-v2/paper*.png: fbm mottle + fine grain around mid-grey) instead of per-frame SVG turbulence. */
export const Paper: React.FC<{ id?: string; heavy?: boolean; opacity?: number; mottle?: number; grain?: number }> = ({ heavy, opacity = 1 }) => (
  <AbsoluteFill style={{ mixBlendMode: "soft-light", pointerEvents: "none", opacity }}>
    <Img src={staticFile(heavy ? "custom/cred-v2/paper-heavy.png" : "custom/cred-v2/paper.png")} style={{ width: "100%", height: "100%" }} />
  </AbsoluteFill>
);

/** Radial paper vignette (measured -6..-12 L* to the corners). */
export const Vignette: React.FC<{ strength?: number; color?: string }> = ({ strength = 0.22, color = "0,0,0" }) => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse 75% 70% at 50% 48%, rgba(${color},0) 55%, rgba(${color},${strength}) 100%)`, pointerEvents: "none" }} />
);

// ---- Headline sheen -------------------------------------------------------------------------------------------------
/** A highlight band travelling through the letters (measured 2.5-17 % W/s, sigma ~5 % W, +33 %). Local coordinates:
 * background-position in the element's own box, so it survives transformed parents. */
export const Sheen: React.FC<{ children: React.ReactNode; t: number; ink: string; sheen: string; boxW: number; speed?: number; sigma?: number; style?: React.CSSProperties }> = ({
  children,
  t,
  ink,
  sheen,
  boxW,
  speed = 0.08 * 1920,
  sigma = 0.05 * 1920,
  style,
}) => {
  const span = boxW + 6 * sigma;
  const c = ((t * speed) % span) - 3 * sigma;
  const bg = `linear-gradient(90deg, ${ink} 0px, ${ink} ${c - 2.5 * sigma}px, ${sheen} ${c - 0.4 * sigma}px, ${sheen} ${c + 0.4 * sigma}px, ${ink} ${c + 2.5 * sigma}px, ${ink} ${boxW + 10}px)`;
  return (
    <span style={{ background: bg, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", display: "inline-block", ...style }}>{children}</span>
  );
};

/** SVG pattern of 45 deg engraving lines, for 2D art (seal, slab, numerals). */
export const LinePattern: React.FC<{ id: string; pitch: number; width: number; color: string; angle?: number }> = ({ id, pitch, width, color, angle = 45 }) => (
  <pattern id={id} patternUnits="userSpaceOnUse" width={pitch} height={pitch} patternTransform={`rotate(${-angle})`}>
    <rect width={pitch} height={width} fill={color} />
  </pattern>
);
