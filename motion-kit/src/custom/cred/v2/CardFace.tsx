import React from "react";
import { AbsoluteFill } from "remotion";
import { World } from "./three.tsx";
import { AssemblyWorld, type AsmView } from "./Assembly.tsx";
import { Field } from "./Opening.tsx";
import { bandGradient, BandLines, LinePattern } from "./fx.tsx";
import { SANS, SERIF } from "./look.ts";

/**
 * The card face: the parcel world printed on an ID-1 card (85.60 x 53.98 mm -> 1713 x 1080 inside a 1920 x 1080 face
 * box), plus the card's own security print: a diagonal holographic strip with micro-text, an engraved EMV chip, a
 * rose-curve rosette, a hexagonal guilloche cartouche, a column of outline "5%" glyphs, and a fine-mesh margin.
 * The world underneath is a live ThreeCanvas, so the engraving lines are carried by the card when it moves (CSS 3D).
 */

export const CARD = { x0: 103.5, x1: 1816.5, w: 1713, h: 1080, r: 64 };
export const STRIP = { cx: 1290, cy: 540, angle: -62, w: 70 }; // angle in deg, screen y-down (negative = rising "/")

const rose = (cx: number, cy: number, R: number, a: number, k: number, ph: number, n = 360) => {
  let d = "";
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2;
    const r = R + a * Math.sin(k * t + ph);
    d += `${i ? "L" : "M"}${(cx + r * Math.cos(t)).toFixed(1)} ${(cy + r * Math.sin(t)).toFixed(1)} `;
  }
  return d + "Z";
};

export const Rosette: React.FC<{ cx: number; cy: number; R: number; color: string; n?: number; k?: number; sw?: number }> = ({ cx, cy, R, color, n = 26, k = 12, sw = 1.3 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => (
      <path key={i} d={rose(cx, cy, R * (0.55 + 0.45 * (i / n)), R * 0.09, k, i * 0.37)} fill="none" stroke={color} strokeWidth={sw} />
    ))}
  </g>
);

export const hexPath = (cx: number, cy: number, r: number) => {
  let d = "";
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    d += `${i ? "L" : "M"}${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)} `;
  }
  return d + "Z";
};

/** Hexagonal guilloche cartouche (our seal; no ring text). */
export const Cartouche: React.FC<{ cx: number; cy: number; r: number; ink: string; fill: string; lines?: number; sw?: number }> = ({ cx, cy, r, ink, fill, lines = 44, sw = 1.1 }) => (
  <g>
    <path d={hexPath(cx, cy, r)} fill={fill} stroke={ink} strokeWidth={sw * 3} />
    <path d={hexPath(cx, cy, r * 0.94)} fill="none" stroke={ink} strokeWidth={sw * 1.2} />
    <clipPath id={`hexclip-${Math.round(cx)}-${Math.round(cy)}`}>
      <path d={hexPath(cx, cy, r * 0.92)} />
    </clipPath>
    <g clipPath={`url(#hexclip-${Math.round(cx)}-${Math.round(cy)})`}>
      {Array.from({ length: lines }, (_, i) => (
        <path key={i} d={rose(cx, cy, r * (0.15 + 0.85 * (i / lines)), r * 0.06, 6, i * 0.21, 240)} fill="none" stroke={ink} strokeWidth={sw} opacity={0.85} />
      ))}
    </g>
    <path d={hexPath(cx, cy, r * 0.36)} fill={fill} stroke={ink} strokeWidth={sw * 2} />
    <Rosette cx={cx} cy={cy} R={r * 0.3} color={ink} n={10} k={6} sw={sw * 0.8} />
  </g>
);

export const Chip: React.FC<{ x: number; y: number; w: number; h: number; ink: string; fill: string }> = ({ x, y, w, h, ink, fill }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={h * 0.16} fill={fill} stroke={ink} strokeWidth={2.4} />
    <path d={`M${x + w * 0.5} ${y} V${y + h * 0.3} M${x} ${y + h * 0.36} H${x + w * 0.36} M${x + w * 0.64} ${y + h * 0.36} H${x + w} M${x} ${y + h * 0.64} H${x + w * 0.36} M${x + w * 0.64} ${y + h * 0.64} H${x + w} M${x + w * 0.5} ${y + h * 0.7} V${y + h}`}
      stroke={ink} strokeWidth={2} fill="none" />
    <rect x={x + w * 0.36} y={y + h * 0.3} width={w * 0.28} height={h * 0.4} rx={h * 0.06} fill="none" stroke={ink} strokeWidth={2} />
    {Array.from({ length: 9 }, (_, i) => (
      <line key={i} x1={x + 4} y1={y + 6 + i * (h / 9)} x2={x + w - 4} y2={y + 6 + i * (h / 9)} stroke={ink} strokeWidth={0.8} opacity={0.35} />
    ))}
  </g>
);

export const STRIP_TEXT = "5% REWARDS ON ONLINE SHOPPING";

/** The diagonal holographic strip of the card (in face coordinates). */
export const Strip: React.FC<{ opacity?: number; phase?: number }> = ({ opacity = 1, phase = 0 }) => {
  const L = 1500;
  return (
    <div
      style={{
        position: "absolute",
        left: STRIP.cx - L / 2,
        top: STRIP.cy - STRIP.w / 2,
        width: L,
        height: STRIP.w,
        transform: `rotate(${STRIP.angle}deg)`,
        opacity,
        overflow: "hidden",
        ...bandGradient(4, phase),
        boxShadow: "0 0 0 1.5px rgba(255,255,255,0.35)",
      }}
    >
      <BandLines width={L} height={STRIP.w} opacity={0.38} phase={phase * 300} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-around", color: "#fff", fontFamily: SANS, fontWeight: 500, fontSize: 17, letterSpacing: "0.43em", whiteSpace: "nowrap" }}>
        <span>{STRIP_TEXT}</span>
        <span>{STRIP_TEXT}</span>
      </div>
    </div>
  );
};

export const Security: React.FC<{ ink: string; fill: string; opacity: number; stripOpacity?: number; phase?: number; hideStrip?: boolean }> = ({ ink, fill, opacity, stripOpacity, phase = 0, hideStrip }) => (
  <AbsoluteFill style={{ opacity }}>
    <svg width={1920} height={1080} style={{ position: "absolute" }}>
      <defs>
        <LinePattern id="meshA" pitch={7} width={1.3} color={ink} angle={45} />
        <LinePattern id="meshB" pitch={7} width={1.3} color={ink} angle={-45} />
      </defs>
      {/* security margin: fine mesh frame */}
      <path
        d={`M${CARD.x0} 0 H${CARD.x1} V${CARD.h} H${CARD.x0} Z M${CARD.x0 + 34} 34 V${CARD.h - 34} H${CARD.x1 - 34} V34 Z`}
        fill="url(#meshA)" fillRule="evenodd" opacity={0.55}
      />
      <path d={`M${CARD.x0} 0 H${CARD.x1} V${CARD.h} H${CARD.x0} Z M${CARD.x0 + 34} 34 V${CARD.h - 34} H${CARD.x1 - 34} V34 Z`} fill="url(#meshB)" fillRule="evenodd" opacity={0.3} />
      <rect x={CARD.x0 + 34} y={34} width={CARD.w - 68} height={CARD.h - 68} rx={40} fill="none" stroke={ink} strokeWidth={2.5} />
      <rect x={CARD.x0 + 44} y={44} width={CARD.w - 88} height={CARD.h - 88} rx={34} fill="none" stroke={ink} strokeWidth={1} />
      <Rosette cx={1560} cy={300} R={190} color={ink} n={22} k={14} sw={1.4} />
      <Chip x={300} y={420} w={160} h={122} ink={ink} fill={fill} />
      <Cartouche cx={430} cy={790} r={118} ink={ink} fill={fill} lines={30} />
      {Array.from({ length: 7 }, (_, i) => (
        <text key={i} x={1748} y={160 + i * 126} transform={`rotate(-90 1748 ${160 + i * 126})`} fontFamily={SERIF} fontWeight={700} fontSize={60}
          fill="none" stroke={ink} strokeWidth={1.6} textAnchor="middle">5%</text>
      ))}
    </svg>
    {!hideStrip ? <Strip opacity={stripOpacity ?? 1} phase={phase} /> : null}
  </AbsoluteFill>
);

export const cardClip = `inset(0 ${CARD.x0}px round ${CARD.r}px)`;

/** Face = printed world (field + 3D parcels) [+ security print], 1920x1080 box, clipped to the card when `clip`. */
export const Face: React.FC<{
  f: number;
  view?: Partial<AsmView>;
  clip?: boolean;
  security?: number;
  ink?: string;
  fill?: string;
  fieldInk?: string;
  stripPhase?: number;
  hideStrip?: boolean;
  worldFilter?: string;
}> = ({ f, view, clip, security = 0, ink = "#16365f", fill = "#d6eef4", fieldInk, stripPhase, hideStrip, worldFilter }) => (
  <AbsoluteFill style={{ clipPath: clip ? cardClip : undefined, overflow: "hidden" }}>
    <AbsoluteFill style={{ filter: worldFilter }}>
      <Field f={f} inkOverride={fieldInk} />
      <World>
        <AssemblyWorld f={f} {...view} />
      </World>
    </AbsoluteFill>
    {security > 0 ? <Security ink={ink} fill={fill} opacity={security} phase={stripPhase} hideStrip={hideStrip} /> : null}
  </AbsoluteFill>
);
