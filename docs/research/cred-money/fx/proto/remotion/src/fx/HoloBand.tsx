/**
 * Holographic security-thread band (measured on the reference band):
 *  - opaque pastel ramp, S 0.2-0.35, V 0.8-1.0, repeating ~2x along the band: pink -> peach/apricot -> cream ->
 *    mint -> sky -> periwinkle (BAND_STOPS);
 *  - fine white wavy guilloche lines: pitch ~0.124 x band height, sine period ~2 x band height, amplitude ~0.17 bh
 *    (amplitude is the least certain number);
 *  - white UPPERCASE geometric sans, cap height ~0.5 band height; tracking solved from the measured ink span:
 *    Lexend 500 0.43em, Poppins 500/600 0.46em, Montserrat 600 0.41em (two frames agree within +-0.003em);
 *  - colour is fixed to the band: no hue sweep in a static hold (0 deg change, measured).
 */
import React from "react";
import { BAND_STOPS } from "./measured";
export const HoloBand: React.FC<{ width: number; height: number; text?: string; font?: string; weight?: number; tracking?: number; cycles?: number; offset?: number; lineOpacity?: number; style?: React.CSSProperties }> = ({
  width, height, text = "", font = "Lexend, sans-serif", weight = 500, tracking = 0.43, cycles = 2, offset = 0, lineOpacity = 0.4, style }) => {
  const stops: string[] = [];
  // one cycle = measured pink(0.29) .. periwinkle(0.93) compressed into 0..0.85, then a smooth return to pink (closes the loop)
  const cyc = BAND_STOPS.slice(4, 14);
  for (let c = 0; c < cycles; c++) {
    for (const s of cyc) stops.push(`${s.color} ${(((c + 0.85 * (s.pos - 0.29) / (0.93 - 0.29)) / cycles) * 100).toFixed(2)}%`);
    stops.push(`#c9b3dc ${(((c + 0.925) / cycles) * 100).toFixed(2)}%`);   // lavender bridge (seen at the band's violet end)
  }
  stops.push(`${cyc[0].color} 100%`);
  const pitch = 0.124 * height, period = 2 * height, amp = 0.17 * height;
  const lines: string[] = [];
  for (let k = -2; k * pitch < height + amp * 2; k++) {
    const y0 = k * pitch; let d = `M ${-period} ${y0}`;
    for (let x = -period; x <= width + period; x += period / 8) d += ` L ${x.toFixed(1)} ${(y0 + amp * Math.sin((2 * Math.PI * (x + offset * width)) / period + k * 0.35)).toFixed(1)}`;
    lines.push(d);
  }
  const capH = 0.5 * height; const fontSize = capH / 0.7;
  return (
    <div style={{ position: "relative", width, height, overflow: "hidden", background: `linear-gradient(90deg, ${stops.join(", ")})`, backgroundPosition: `${offset * 100}% 0`, ...style }}>
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        {lines.map((d, i) => <path key={i} d={d} fill="none" stroke="#fff" strokeOpacity={lineOpacity} strokeWidth={Math.max(1, height * 0.012)} />)}
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: font, fontWeight: weight, fontSize, letterSpacing: `${tracking}em`, whiteSpace: "nowrap", textShadow: "0 0 1px rgba(0,0,0,0.15)" }}>{text}</div>
    </div>
  );
};
