import { useMemo } from "react";

/**
 * Security-print linework (banknote / share-certificate engraving), generated
 * exactly in code: guilloche rosettes from layered epi/hypotrochoids, plus
 * microtext rings and engraved hatch fills.
 */

type RosetteProps = {
  cx: number;
  cy: number;
  /** Outer radius in px. */
  radius: number;
  /** Number of nested curves. */
  rings?: number;
  /** Petal count. */
  petals?: number;
  /** 0..1 depth of the petal modulation. */
  depth?: number;
  color: string;
  width?: number;
  /** Phase (radians) — animate for a living guilloche. */
  phase?: number;
  /** 0..1 how much of each path is drawn (draw-on). */
  draw?: number;
  opacity?: number;
  /** Inner radius as a fraction of outer. */
  inner?: number;
};

export const rosettePath = (cx: number, cy: number, r: number, petals: number, depth: number, phase: number, twist: number, steps = 720): string => {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const rr = r * (1 - depth * 0.5 + depth * 0.5 * Math.cos(petals * t + phase)) + r * 0.04 * Math.sin((petals * 3 + 1) * t + twist);
    const x = cx + rr * Math.cos(t + twist * 0.02);
    const y = cy + rr * Math.sin(t + twist * 0.02);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return d + "Z";
};

export const Rosette: React.FC<RosetteProps> = ({ cx, cy, radius, rings = 28, petals = 12, depth = 0.35, color, width = 1.2, phase = 0, draw = 1, opacity = 1, inner = 0.25 }) => {
  const paths = useMemo(
    () =>
      Array.from({ length: rings }, (_, k) => {
        const t = k / Math.max(1, rings - 1);
        const r = radius * (inner + (1 - inner) * t);
        return rosettePath(cx, cy, r, petals, depth * (0.4 + 0.6 * Math.sin(t * Math.PI)), phase + k * 0.21, k * 0.6);
      }),
    [cx, cy, radius, rings, petals, depth, phase, inner],
  );
  return (
    <g opacity={opacity} fill="none" stroke={color} strokeWidth={width}>
      {paths.map((d, i) => (
        <path key={i} d={d} pathLength={1} strokeDasharray={draw < 1 ? 1 : undefined} strokeDashoffset={draw < 1 ? 1 - draw : undefined} />
      ))}
    </g>
  );
};

/** A straight guilloche band (for certificate borders): interleaved sine strands. */
export const GuillocheBand: React.FC<{ x: number; y: number; w: number; h: number; color: string; strands?: number; waves?: number; width?: number; phase?: number }> = ({
  x,
  y,
  w,
  h,
  color,
  strands = 9,
  waves = 18,
  width = 1,
  phase = 0,
}) => {
  const paths = useMemo(
    () =>
      Array.from({ length: strands }, (_, s) => {
        let d = "";
        for (let i = 0; i <= 400; i++) {
          const u = i / 400;
          const px = x + u * w;
          const py = y + h / 2 + (h / 2) * 0.92 * Math.sin(u * waves * Math.PI * 2 + (s / strands) * Math.PI * 2 + phase) * Math.cos(u * waves * 0.5 * Math.PI + s * 0.3);
          d += `${i === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`;
        }
        return d;
      }),
    [x, y, w, h, strands, waves, phase],
  );
  return (
    <g fill="none" stroke={color} strokeWidth={width}>
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </g>
  );
};

/** Microtext along a circle (anti-counterfeit style). */
export const MicroRing: React.FC<{ cx: number; cy: number; r: number; text: string; color: string; size?: number; rotate?: number; id: string; weight?: number }> = ({
  cx,
  cy,
  r,
  text,
  color,
  size = 11,
  rotate = 0,
  id,
  weight = 600,
}) => {
  const circumference = 2 * Math.PI * r;
  const unit = text.length * size * 0.62;
  const repeats = Math.max(1, Math.floor(circumference / unit));
  return (
    <g transform={`rotate(${rotate} ${cx} ${cy})`}>
      <defs>
        <path id={id} d={`M${cx - r},${cy} a${r},${r} 0 1,1 ${2 * r},0 a${r},${r} 0 1,1 ${-2 * r},0`} />
      </defs>
      <text fill={color} fontFamily="Open Sans" fontWeight={weight} fontSize={size} letterSpacing={size * 0.12}>
        <textPath href={`#${id}`} textLength={circumference * 0.995} lengthAdjust="spacing">
          {Array.from({ length: repeats }, () => text).join("")}
        </textPath>
      </text>
    </g>
  );
};

/** Engraved hatch fill: fine parallel lines clipped to a shape. */
export const Hatch: React.FC<{ id: string; clip: React.ReactNode; color: string; gap?: number; angle?: number; width?: number; w: number; h: number }> = ({ id, clip, color, gap = 6, angle = -35, width = 1, w, h }) => {
  const lines = Math.ceil(Math.hypot(w, h) / gap) * 2;
  return (
    <g>
      <defs>
        <clipPath id={id}>{clip}</clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <g transform={`rotate(${angle} ${w / 2} ${h / 2})`}>
          {Array.from({ length: lines }, (_, i) => (
            <line key={i} x1={-w} x2={w * 2} y1={-h + i * gap} y2={-h + i * gap} stroke={color} strokeWidth={width} />
          ))}
        </g>
      </g>
    </g>
  );
};
