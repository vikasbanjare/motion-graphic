import React, { useContext, useLayoutEffect, useRef } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Paper, Vignette } from "./fx.tsx";
import { Detail } from "./three.tsx";
import { C, INK, T, expoOut, lerp, ramp, rnd } from "./look.ts";

/**
 * Opening: one engraved line is born, then two scale-step hard cuts raise the line density (1 -> 5 -> 34), as an
 * engraver works up a plate. Our drawing: concentric modulated rings around a centre off the top-right corner (the card's
 * own rosette, seen far too close), not the reference's horizontal sinusoids.
 */

// Ring family centre (px, 1920x1080 frame) and modulation.
const CX = 2280, CY = -330;

const ringPath = (r: number, amp: number, k: number, phase: number, a0: number, a1: number, steps = 220) => {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const a = a0 + ((a1 - a0) * i) / steps;
    const rr = r + amp * Math.sin(k * a + phase);
    const x = CX + rr * Math.cos(a), y = CY + rr * Math.sin(a);
    d += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d;
};
// visible angular range for the family (left/bottom side of the circle, facing the frame)
const A0 = Math.PI * 0.52, A1 = Math.PI * 1.02;

/** Horizontal wavy line (the sheet's opening grammar): from x0 to x1 at height y, amplitude amp, k waves. */
const wavePath = (x0: number, x1: number, y: number, amp: number, k: number, phase: number, steps = 160) => {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const x = x0 + ((x1 - x0) * i) / steps;
    const yy = y + amp * Math.sin((k * Math.PI * 2 * (x - x0)) / (x1 - x0) + phase);
    d += `${i ? "L" : "M"}${x.toFixed(1)} ${yy.toFixed(1)} `;
  }
  return d;
};

/** Step A: a single heavy stroke drawn by a pen while the paper trucks left (easeInQuad on velocity). */
export const StepA: React.FC = () => {
  const f = useCurrentFrame();
  const flat = useContext(Detail).maps === true;
  // truck: velocity 0 -> 0.5 W/s from f6, integrate per frame
  let x = 0;
  for (let i = 7; i <= f; i++) x += 1920 * 0.55 * Math.min(1, ((i - 7) / 15) ** 2) / 24;
  const p = interpolate(f, [4, 22], [0, 0.62], { ...C, easing: (t) => t * (2 - t) });
  const r = 1750;
  return (
    <AbsoluteFill style={{ background: INK.paperGrey }}>
      <svg width={1920} height={1080} style={{ position: "absolute", transform: flat ? undefined : `translateX(${-x * 0.35}px)` }}>
        <filter id="bleedA">
          <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves={2} seed={3} />
          <feDisplacementMap in="SourceGraphic" scale="3" />
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
        {flat ? (
          <path d={wavePath(0, Math.max(2, Math.min(780, (f - 7) * 47)), 540, 7, Math.max(2, Math.min(780, (f - 7) * 47)) / 230, 0.3)} fill="none" stroke={INK.pen} strokeWidth={3} strokeLinecap="round" filter="url(#bleedA)" />
        ) : (
          <path d={ringPath(r, 34, 9, 0.4, A1, A0)} pathLength={1} fill="none" stroke={INK.pen} strokeWidth={12.5} strokeLinecap="round" strokeDasharray={`${p} 1`} filter="url(#bleedA)" />
        )}
      </svg>
      <Paper id="pA" />
      <Vignette strength={0.2} />
    </AbsoluteFill>
  );
};

/** Step B: five lines draw on with staggered, ragged starts; camera locked. */
export const StepB: React.FC = () => {
  const f = useCurrentFrame(); // local, 0..18
  const flat = useContext(Detail).maps === true;
  return (
    <AbsoluteFill style={{ background: "#d9d9d6" }}>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <filter id="bleedB">
          <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves={2} seed={5} />
          <feDisplacementMap in="SourceGraphic" scale="2" />
        </filter>
        {flat
          ? [0, 1, 2].map((i) => {
              const centre = Math.min(1100, 780 + f * 18);
              const end = i === 1 ? centre : Math.min(centre * (i === 0 ? 0.62 : 0.85), f * (i === 0 ? 105 : 120) + 40);
              return <path key={i} d={wavePath(0, end, 540 + (i - 1) * 125, 7, end / 230, 0.3 + i * 0.9)} fill="none" stroke="#2b2b2b" strokeWidth={3} strokeLinecap="round" filter="url(#bleedB)" />;
            })
          : Array.from({ length: 5 }, (_, i) => {
              const p = Math.min(1, 0.22 + rnd(i, 4) * 0.2 + f * 0.035);
              return (
                <path key={i} d={ringPath(1180 + i * 64, 26, 11, 0.6 + i * 0.5, A1, A0)} pathLength={1} fill="none" stroke="#2b2b2b" strokeWidth={6}
                  strokeLinecap="round" strokeDasharray={`${p} 1`} strokeDashoffset={-0.04 * rnd(i, 9)} filter="url(#bleedB)" />
              );
            })}
      </svg>
      <Paper id="pB" mottle={0.025} />
      <Vignette strength={0.12} />
    </AbsoluteFill>
  );
};

/**
 * Dense guilloche field (34 rings, pitch 2.2 % H, stroke 0.55 % H). The modulation phase flows (expo-out), the paper
 * drifts, then a colour wash wipes in top-to-bottom and the field keeps living only inside the big pale disc: that disc
 * is the card rosette, and it stays behind the parcel world that assembles next.
 * `f` is the film frame (this layer spans the opening and the assembly).
 */
export const Field: React.FC<{ f: number; inkOverride?: string }> = ({ f, inkOverride }) => {
  const { width, height } = useVideoConfig();
  const local = f - T.stepC;
  // flow: 26 -> 6 px/frame expo-out over 23 frames, then a slow residual drift
  const flow = (fr: number) => {
    let s = 0;
    for (let i = 0; i < Math.max(0, fr); i++) s += 6 + 20 * Math.exp(-i / 7);
    return s;
  };
  const fine = useContext(Detail).maps === true;
  // measured intro: the lines are static while the sheet trucks; the flow only starts under the wash
  const ph = fine ? Math.max(0, f - T.wash) * 0.012 : flow(Math.min(local, 60)) / 220 + Math.max(0, local - 60) * 0.012;
  const wash = ramp(f, T.wash, T.wash + 6, (t) => t);
  const disc = ramp(f, T.wash + 4, T.wash + 14, expoOut);
  const drift = fine
    ? -Math.max(0, Math.min(f, T.wash) - 58) * 5.8 - Math.max(0, f - T.wash) * 0.9
    : -Math.min(local, 200) * 0.9 - Math.max(0, local - 200) * 0.2;
  const zoom = 1 - Math.min(local, 120) * 0.0006;
  const ink = inkOverride ?? (wash > 0.5 ? "#6d7f78" : "#646464");
  const pitch = fine ? 0.0236 * height : 0.022 * height;
  const ref = useRef<HTMLCanvasElement>(null);
  // drawn into a 2D canvas: ~4x cheaper than 76 long SVG paths per frame in headless Chrome
  useLayoutEffect(() => {
    const c = ref.current;
    if (!c) return;
    const x = c.getContext("2d")!;
    x.clearRect(0, 0, width, height);
    x.save();
    x.translate(width, 0);
    x.scale(zoom, zoom);
    x.translate(-width + drift / zoom, (-drift * 0.25) / zoom);
    x.strokeStyle = ink;
    x.lineWidth = 5.6;
    x.lineCap = "round";
    x.lineJoin = "round";
    if (fine) {
      // the reference intro, measured at 1080p: a scale-step cut from 8 lines (pitch 80 px, ends 1100 -> 1260 px) to
      // the full field (43 rows, pitch 25.5 px, 2.5 px lines, lambda ~105 px, amp ~6 px) with a ragged right edge;
      // under the wash the field grows to fill the disc
      x.lineWidth = 2.6;
      const stage3 = f < 58;
      const grow = ramp(f, T.wash, T.wash + 16, (t) => t);
      const rows = stage3 ? 8 : Math.ceil((height + 900) / pitch);
      for (let i = 0; i < rows; i++) {
        const y0 = stage3 ? 540 + (i - 3.5) * 80 : -450 + i * pitch;
        const end0 = stage3 ? 1100 + (f - 40) * 9 : 1250;
        const ragged = (rnd(i, 2) - 0.5) * (stage3 ? 220 : 180);
        const x1 = lerp(end0 + ragged, width + 900, grow);
        const lam = stage3 ? 230 : 105, amp = stage3 ? 7 : 6;
        x.beginPath();
        for (let k = 0; k <= 300; k++) {
          const px = -80 + ((x1 + 80) * k) / 300;
          const py = y0 + amp * Math.sin((px * Math.PI * 2) / lam + ph + i * 0.7);
          if (k) x.lineTo(px, py);
          else x.moveTo(px, py);
        }
        x.stroke();
      }
      x.restore();
      return;
    }
    for (let i = 0; i < 76; i++) {
      const r = 820 + i * pitch;
      const a0 = A0 - 0.05 + rnd(i, 2) * 0.08;
      const a1 = A1 + 0.12 - rnd(i, 7) * 0.16 - Math.max(0, i - 50) * 0.004;
      x.beginPath();
      for (let k = 0; k <= 260; k++) {
        const a = a0 + ((a1 - a0) * k) / 260;
        const rr = r + pitch * 0.5 * Math.sin(31 * a + ph + i * 0.08);
        const px = CX + rr * Math.cos(a), py = CY + rr * Math.sin(a);
        if (k) x.lineTo(px, py);
        else x.moveTo(px, py);
      }
      x.stroke();
    }
    x.restore();
  }, [width, height, zoom, drift, ink, ph, pitch, fine, wash]);
  // curved wash front, top to bottom in 6 frames
  const frontY = lerp(-200, height + 260, wash);
  const washClip = `path('M 0 0 L ${width} 0 L ${width} ${frontY - 120} Q ${width / 2} ${frontY + 140} 0 ${frontY - 120} Z')`;
  const discR = lerp(2600, fine ? 0.56 * height : 1520, disc);
  const dcx = fine ? 0.29 * width : CX - 380, dcy = fine ? 0.5 * height : CY + 120;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "#e7e7e4" }} />
      <AbsoluteFill style={{ clipPath: washClip, background: `linear-gradient(160deg, ${INK.washA} 0%, #dfe2c6 55%, ${INK.washB} 100%)`, filter: `saturate(${lerp(0.5, 1, ramp(f, T.wash, T.wash + 14))})` }} />
      {/* the disc: pale paper carrying the field */}
      <AbsoluteFill style={{ clipPath: wash > 0 ? `circle(${discR}px at ${dcx}px ${dcy}px)` : undefined }}>
        <AbsoluteFill style={{ background: "#efeee8", opacity: disc }} />
        <canvas ref={ref} width={width} height={height} style={{ position: "absolute", inset: 0 }} />
      </AbsoluteFill>
      {wash > 0 ? (
        <svg width={width} height={height} style={{ position: "absolute", inset: 0, opacity: disc }}>
          <circle cx={dcx} cy={dcy} r={discR} fill="none" stroke="#7f938a" strokeWidth={3} />
          <circle cx={dcx} cy={dcy} r={discR - 14} fill="none" stroke="#9aaba2" strokeWidth={1.5} />
        </svg>
      ) : null}
      <Paper id="pC" mottle={0.03} />
    </AbsoluteFill>
  );
};
