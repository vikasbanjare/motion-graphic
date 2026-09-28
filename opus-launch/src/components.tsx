import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { C, F, H, W, ease, enter, mix, ramp, sec } from "./theme";

// Persistent backdrop: warm radial base, two drifting glows, film grain, vignette.
export const Backdrop: React.FC<{ endFade: number }> = ({ endFade }) => {
  const frame = useCurrentFrame();
  const t = frame / 60;
  const grainX = Math.floor(random(`gx-${Math.floor(frame / 2)}`) * 200);
  const grainY = Math.floor(random(`gy-${Math.floor(frame / 2)}`) * 200);
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, overflow: "hidden" }}>
      <AbsoluteFill
        style={{ background: `radial-gradient(ellipse 70% 60% at 50% 45%, ${C.ink2} 0%, ${C.ink} 70%)` }}
      />
      <div
        style={{
          position: "absolute",
          width: 1300,
          height: 1300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.coral}2E 0%, transparent 62%)`,
          left: 1100 + Math.sin(t * 0.23) * 220,
          top: -520 + Math.cos(t * 0.19) * 140,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1400,
          height: 1400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.sand}17 0%, transparent 60%)`,
          left: -620 + Math.cos(t * 0.17) * 200,
          top: 240 + Math.sin(t * 0.21) * 160,
        }}
      />
      <AbsoluteFill style={{ opacity: 0.07, mixBlendMode: "overlay" }}>
        <svg width={W + 200} height={H + 200} style={{ translate: `${-grainX}px ${-grainY}px` }}>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill
        style={{ background: "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.6) 100%)" }}
      />
      <AbsoluteFill style={{ backgroundColor: "black", opacity: endFade }} />
    </AbsoluteFill>
  );
};

// Wraps a scene: shared exit (blur, fade, slight push) over its last frames.
export const Scene: React.FC<{ duration: number; children: ReactNode; style?: CSSProperties }> = ({
  duration,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const out = ramp(frame, duration - sec(0.4), sec(0.4), ease.in);
  return (
    <AbsoluteFill
      style={{
        opacity: 1 - out,
        filter: `blur(${out * 14}px)`,
        scale: String(1 + out * 0.035),
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

type Word = string | { t: string; style?: CSSProperties };

// Word-by-word masked rise. Each word slides up from behind its own clip box.
export const MaskWords: React.FC<{
  words: Word[];
  start: number;
  stagger?: number;
  dur?: number;
  style?: CSSProperties;
}> = ({ words, start, stagger = sec(0.08), dur = sec(0.9), style }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", columnGap: "0.24em", ...style }}>
      {words.map((w, i) => {
        const text = typeof w === "string" ? w : w.t;
        const extra = typeof w === "string" ? undefined : w.style;
        const p = ramp(frame, start + i * stagger, dur);
        return (
          <span
            key={`${text}-${i}`}
            style={{
              display: "inline-block",
              overflow: "hidden",
              padding: "0.02em 0.08em 0.16em",
              margin: "-0.02em -0.08em -0.16em",
            }}
          >
            <span
              style={{
                display: "inline-block",
                translate: `0px ${mix(p, 115, 0)}%`,
                rotate: `${mix(p, 4, 0)}deg`,
                transformOrigin: "0% 100%",
                ...extra,
              }}
            >
              {text}
            </span>
          </span>
        );
      })}
    </div>
  );
};

// Section eyebrow: coral index, hairline, uppercase mono label.
export const Eyebrow: React.FC<{ index: string; text: string; start: number }> = ({ index, text, start }) => {
  const frame = useCurrentFrame();
  const line = ramp(frame, start + sec(0.1), sec(0.7));
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        fontFamily: F.mono,
        fontSize: 20,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        ...enter(frame, start, { dist: 12, blur: 6 }),
      }}
    >
      <span style={{ color: C.coral }}>{index}</span>
      <span style={{ width: 56 * line, height: 1.5, backgroundColor: C.dim }} />
      <span style={{ color: C.muted }}>{text}</span>
    </div>
  );
};

// Concentric rings that draw on, rotate slowly, and carry two orbiting dots.
export const Orbits: React.FC<{ start: number; opacity?: number; scale?: number }> = ({
  start,
  opacity = 1,
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const radii = [210, 320, 450, 600];
  const spin = frame * 0.04;
  const dotA = ((frame * 0.55 + 200) * Math.PI) / 180;
  const dotB = ((-frame * 0.32 + 40) * Math.PI) / 180;
  const dotsIn = ramp(frame, start + sec(0.9), sec(0.6));
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity, scale: String(scale) }}>
      <svg width={W} height={H} viewBox={`${-W / 2} ${-H / 2} ${W} ${H}`} style={{ overflow: "visible" }}>
        <defs>
          <radialGradient id="dotGlow">
            <stop offset="0%" stopColor={C.coral} stopOpacity="0.9" />
            <stop offset="100%" stopColor={C.coral} stopOpacity="0" />
          </radialGradient>
        </defs>
        <g style={{ rotate: `${spin}deg` }}>
          {radii.map((r, i) => {
            const circ = 2 * Math.PI * r;
            const p = ramp(frame, start + i * sec(0.12), sec(1.5), ease.inOut);
            return (
              <circle
                key={r}
                r={r}
                fill="none"
                stroke={C.ivory}
                strokeOpacity={i === 2 ? 0.16 : 0.09}
                strokeWidth={i === 2 ? 1 : 1.25}
                strokeDasharray={i === 2 ? "2 9" : `${circ}`}
                strokeDashoffset={i === 2 ? 0 : circ * (1 - p)}
                opacity={i === 2 ? p : 1}
                transform="rotate(-90)"
              />
            );
          })}
        </g>
        <g opacity={dotsIn}>
          <circle cx={Math.cos(dotA) * 320} cy={Math.sin(dotA) * 320} r={26} fill="url(#dotGlow)" />
          <circle cx={Math.cos(dotA) * 320} cy={Math.sin(dotA) * 320} r={6} fill={C.coral} />
          <circle cx={Math.cos(dotB) * 450} cy={Math.sin(dotB) * 450} r={4} fill={C.sand} fillOpacity={0.8} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

// Number that counts up; tabular figures so width doesn't jitter.
export const Counter: React.FC<{
  to: number;
  start: number;
  dur?: number;
  decimals?: number;
  from?: number;
  style?: CSSProperties;
}> = ({ to, start, dur = sec(1.2), decimals = 0, from = 0, style }) => {
  const frame = useCurrentFrame();
  const v = mix(ramp(frame, start, dur), from, to);
  return <span style={{ fontVariantNumeric: "tabular-nums", ...style }}>{v.toFixed(decimals)}</span>;
};
