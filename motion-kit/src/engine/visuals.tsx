import React from "react";
import { FPS } from "./formats.ts";
import { wobble } from "./speech.ts";

const hexA = (hex: string, a: number) =>
  hex.slice(0, 7) + Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, "0");

/**
 * Soft voice orb, CSS only (renders identically in Studio, CLI and the browser
 * exporter). Seven pastel lobes orbit slowly inside a sphere, blended by blur,
 * with light rings that swell while someone is speaking.
 */
export const Orb: React.FC<{ size: number; colors: [string, string]; frame: number; level: number }> = ({
  size,
  colors,
  frame,
  level,
}) => {
  const [c1, c2] = colors;
  const t = frame / FPS;
  const talk = level * (0.75 + 0.25 * Math.sin(t * 4.8));
  const lobes = Array.from({ length: 7 }, (_, k) => {
    const angle = (k / 7) * Math.PI * 2 + t * 0.32 + 0.35 * Math.sin(t * 0.4 + k);
    const r = size * (0.2 + 0.05 * Math.sin(t * 0.7 + k * 1.3) + 0.04 * talk);
    return {
      x: size / 2 + Math.cos(angle) * r,
      y: size / 2 + Math.sin(angle) * r,
      w: size * (0.56 + 0.06 * Math.sin(t * 0.5 + k)),
      h: size * (0.42 + 0.05 * Math.cos(t * 0.6 + k)),
      rot: (angle * 180) / Math.PI,
      color: k % 3 === 0 ? "#FFFFFF" : k % 3 === 1 ? c1 : c2,
      a: k % 3 === 0 ? 0.75 : 0.95,
    };
  });
  const ring = (scale: number, alpha: number, width: number) => (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        transform: `scale(${scale.toFixed(4)})`,
        background: `radial-gradient(circle, transparent ${(68 - width).toFixed(1)}%, ${hexA("#FFFFFF", alpha)} 70%, transparent ${(72 + width).toFixed(1)}%)`,
      }}
    />
  );

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {/* Halo */}
      <div
        style={{
          position: "absolute",
          left: -size * 0.35,
          top: -size * 0.35,
          width: size * 1.7,
          height: size * 1.7,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${hexA(c2, 0.32 + 0.12 * talk)} 0%, ${hexA(c2, 0)} 62%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          overflow: "hidden",
          background: `radial-gradient(circle at 50% 45%, ${c1} 0%, ${c2} 70%, ${hexA(c2, 1)} 100%)`,
          boxShadow: `0 ${size * 0.06}px ${size * 0.18}px ${hexA(c2, 0.35)}`,
        }}
      >
        <div style={{ position: "absolute", inset: 0, filter: `blur(${(size * 0.07).toFixed(1)}px)` }}>
          {lobes.map((l, k) => (
            <div
              key={k}
              style={{
                position: "absolute",
                left: l.x - l.w / 2,
                top: l.y - l.h / 2,
                width: l.w,
                height: l.h,
                borderRadius: "50%",
                transform: `rotate(${l.rot.toFixed(2)}deg)`,
                background: `radial-gradient(ellipse at 50% 50%, ${hexA(l.color, l.a)} 0%, ${hexA(l.color, 0)} 70%)`,
              }}
            />
          ))}
        </div>
        {ring(0.98 + 0.05 * talk, 0.35 + 0.3 * talk, 3)}
        {ring(0.74 + 0.08 * talk, 0.18 + 0.25 * talk, 4)}
        {/* Glassy highlight */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "radial-gradient(circle at 34% 26%, #FFFFFFB3 0%, #FFFFFF00 34%)",
          }}
        />
      </div>
    </div>
  );
};

/**
 * Audio waveform bars that "play" while the narrator speaks. Deterministic
 * (driven by frame + speech level), so it never needs the audio decoded.
 */
export const Waveform: React.FC<{
  bars: number;
  width: number;
  height: number;
  color: string;
  frame: number;
  level: number;
  /** 0..1 how much of the waveform has "played" (left part brighter). */
  played?: number;
}> = ({ bars, width, height, color, frame, level, played }) => {
  const gap = Math.max(2, (width / bars) * 0.38);
  const bw = (width - gap * (bars - 1)) / bars;
  return (
    <div style={{ display: "flex", alignItems: "center", gap, width, height }}>
      {Array.from({ length: bars }, (_, k) => {
        const x = k / (bars - 1);
        const env = 0.35 + 0.65 * Math.exp(-((x - 0.5) ** 2) / 0.09);
        const idle = 0.08 + 0.04 * (0.5 + 0.5 * Math.sin(frame * 0.12 + k * 0.6));
        const live = Math.abs(wobble(frame, k, 1.6)) * env;
        const v = Math.min(1, idle + level * live * 0.95);
        const edge = Math.min(1, Math.min(x, 1 - x) / 0.12);
        const isPlayed = played === undefined || x <= played;
        return (
          <div
            key={k}
            style={{
              width: bw,
              height: Math.max(bw, v * height),
              borderRadius: bw / 2,
              background: color,
              opacity: (0.3 + 0.7 * v) * (0.35 + 0.65 * edge) * (isPlayed ? 1 : 0.45),
            }}
          />
        );
      })}
    </div>
  );
};

/** Mouse pointer, drawn as SVG so it stays crisp at any size. */
export const Cursor: React.FC<{ size: number; press: number }> = ({ size, press }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ transform: `scale(${(1 - 0.15 * press).toFixed(3)})`, transformOrigin: "10% 10%" }}>
    <path
      d="M4 2.5 L4 19.5 L8.6 15.4 L11.6 22 L14.6 20.7 L11.7 14.2 L18 14.2 Z"
      fill="#0C0A09"
      stroke="#FFFFFF"
      strokeWidth={1.4}
      strokeLinejoin="round"
    />
  </svg>
);

/** "Generating…" with a soft highlight sweeping across the letters. */
export const Shimmer: React.FC<{ text: string; frame: number; start: number; color: string; highlight: string }> = ({
  text,
  frame,
  start,
  color,
  highlight,
}) => {
  const chars = [...text];
  const period = 40;
  const pos = (((frame - start) % period) / period) * (chars.length + 6) - 3;
  return (
    <span>
      {chars.map((ch, i) => {
        const d = Math.abs(i - pos);
        const k = Math.max(0, 1 - d / 3);
        return (
          <span key={i} style={{ color: k > 0.05 ? highlight : color, opacity: 0.55 + 0.45 * k }}>
            {ch}
          </span>
        );
      })}
    </span>
  );
};
