import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { C, F, H, W, ease, enter, mix, ramp, sec, shadow } from "./theme";

// Persistent backdrop: cream paper, faint dot grid, slow warm glows, paper grain.
export const Backdrop: React.FC<{ endFade: number }> = ({ endFade }) => {
  const frame = useCurrentFrame();
  const t = frame / 60;
  const grainX = Math.floor(random(`gx-${Math.floor(frame / 2)}`) * 200);
  const grainY = Math.floor(random(`gy-${Math.floor(frame / 2)}`) * 200);
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1500,
          height: 1500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.claySoft}AA 0%, transparent 60%)`,
          left: 900 + Math.sin(t * 0.21) * 220,
          top: -700 + Math.cos(t * 0.17) * 140,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1500,
          height: 1500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.paper2} 0%, transparent 62%)`,
          left: -700 + Math.cos(t * 0.15) * 200,
          top: 200 + Math.sin(t * 0.19) * 160,
        }}
      />
      <AbsoluteFill>
        <svg width={W} height={H}>
          <defs>
            <pattern id="dots" width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="18" cy="18" r="1.3" fill={C.mid} fillOpacity="0.35" />
            </pattern>
            <radialGradient id="dotFade" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="white" stopOpacity="0.9" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="dotMask">
              <rect width={W} height={H} fill="url(#dotFade)" />
            </mask>
          </defs>
          <rect width={W} height={H} fill="url(#dots)" mask="url(#dotMask)" opacity={0.55} />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "multiply" }}>
        <svg width={W + 200} height={H + 200} style={{ position: "absolute", left: 0, top: 0, translate: `${-grainX}px ${-grainY}px` }}>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: C.paper, opacity: endFade }} />
    </AbsoluteFill>
  );
};

// Wraps a scene: shared exit (lift, blur, fade) over its last frames.
export const Scene: React.FC<{ duration: number; children: ReactNode; style?: CSSProperties }> = ({
  duration,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const out = ramp(frame, duration - sec(0.42), sec(0.42), ease.in);
  return (
    <AbsoluteFill
      style={{
        opacity: 1 - out,
        filter: `blur(${out * 12}px)`,
        translate: `0px ${-out * 40}px`,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export type Word = string | { t: string; style?: CSSProperties };

// Word-by-word masked rise. Each word slides up from behind its own clip box.
export const MaskWords: React.FC<{
  words: Word[];
  start: number;
  stagger?: number;
  dur?: number;
  style?: CSSProperties;
}> = ({ words, start, stagger = sec(0.07), dur = sec(0.9), style }) => {
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
                translate: `0px ${mix(p, 110, 0)}%`,
                rotate: `${mix(p, 3, 0)}deg`,
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

// Section eyebrow: clay dot, uppercase label.
export const Eyebrow: React.FC<{ text: string; start: number; color?: string }> = ({
  text,
  start,
  color = C.clay,
}) => {
  const frame = useCurrentFrame();
  const dot = ramp(frame, start, sec(0.5), ease.back);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontFamily: F.sans,
        fontWeight: 600,
        fontSize: 20,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: C.muted,
        ...enter(frame, start, { dist: 12, blur: 6 }),
      }}
    >
      <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: color, scale: String(dot) }} />
      {text}
    </div>
  );
};

// Concentric rings that draw on and rotate slowly, with one orbiting clay dot.
export const Orbits: React.FC<{ start: number; opacity?: number; scale?: number }> = ({
  start,
  opacity = 1,
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const radii = [210, 320, 450, 600];
  const dotA = ((frame * 0.55 + 200) * Math.PI) / 180;
  const dotB = ((-frame * 0.32 + 40) * Math.PI) / 180;
  const dotsIn = ramp(frame, start + sec(0.9), sec(0.6));
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity, scale: String(scale) }}>
      <svg width={W} height={H} viewBox={`${-W / 2} ${-H / 2} ${W} ${H}`} style={{ overflow: "visible" }}>
        <g style={{ rotate: `${frame * 0.04}deg` }}>
          {radii.map((r, i) => {
            const circ = 2 * Math.PI * r;
            const p = ramp(frame, start + i * sec(0.12), sec(1.5), ease.inOut);
            return (
              <circle
                key={r}
                r={r}
                fill="none"
                stroke={C.ink}
                strokeOpacity={i === 2 ? 0.16 : 0.08}
                strokeWidth={1.25}
                strokeDasharray={i === 2 ? "2 9" : `${circ}`}
                strokeDashoffset={i === 2 ? 0 : circ * (1 - p)}
                opacity={i === 2 ? p : 1}
                transform="rotate(-90)"
              />
            );
          })}
        </g>
        <g opacity={dotsIn}>
          <circle cx={Math.cos(dotA) * 320} cy={Math.sin(dotA) * 320} r={18} fill={C.clay} fillOpacity={0.18} />
          <circle cx={Math.cos(dotA) * 320} cy={Math.sin(dotA) * 320} r={7} fill={C.clay} />
          <circle cx={Math.cos(dotB) * 450} cy={Math.sin(dotB) * 450} r={5} fill={C.blue} />
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

// Reveal a string character by character between [start, start + dur].
export const typed = (frame: number, text: string, start: number, dur: number) =>
  text.slice(0, Math.round(ramp(frame, start, dur, (x) => x) * text.length));

export const Caret: React.FC<{ color?: string; h?: number }> = ({ color = C.clay, h = 30 }) => {
  const frame = useCurrentFrame();
  return (
    <span
      style={{
        display: "inline-block",
        width: 3,
        height: h,
        marginLeft: 3,
        verticalAlign: "middle",
        backgroundColor: color,
        opacity: Math.floor(frame / 16) % 2 === 0 ? 1 : 0,
      }}
    />
  );
};

// App window mock: white card, soft shadow, traffic-light title bar.
export const Window: React.FC<{
  title?: string;
  width: number;
  height: number;
  children: ReactNode;
  style?: CSSProperties;
  bar?: ReactNode;
}> = ({ title, width, height, children, style, bar }) => (
  <div
    style={{
      width,
      height,
      borderRadius: 22,
      backgroundColor: C.white,
      border: `1px solid ${C.line}`,
      boxShadow: shadow,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    <div
      style={{
        height: 52,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "0 20px",
        borderBottom: `1px solid ${C.line}`,
        backgroundColor: "#FDFCFA",
      }}
    >
      {["#E8E6DC", "#E8E6DC", "#E8E6DC"].map((c, i) => (
        <span key={i} style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: c }} />
      ))}
      <span style={{ marginLeft: 14, fontFamily: F.sans, fontWeight: 500, fontSize: 17, color: C.muted }}>{title}</span>
      <span style={{ marginLeft: "auto" }}>{bar}</span>
    </div>
    <div style={{ flex: 1, position: "relative" }}>{children}</div>
  </div>
);

// Pill used for the model badge and small stat callouts.
export const Chip: React.FC<{ children: ReactNode; style?: CSSProperties; dot?: string }> = ({
  children,
  style,
  dot,
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "8px 16px",
      borderRadius: 999,
      border: `1px solid ${C.line}`,
      backgroundColor: C.white,
      fontFamily: F.sans,
      fontWeight: 500,
      fontSize: 18,
      color: C.ink2,
      ...style,
    }}
  >
    {dot ? <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: dot }} /> : null}
    {children}
  </span>
);

// Mouse pointer, travels along keyframes with eased motion and a click squish.
export const Pointer: React.FC<{
  path: { f: number; x: number; y: number }[];
  clicks?: number[];
}> = ({ path, clicks = [] }) => {
  const frame = useCurrentFrame();
  let x = path[0].x;
  let y = path[0].y;
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i];
    const b = path[i + 1];
    if (frame >= a.f) {
      const p = ramp(frame, a.f, b.f - a.f, ease.inOut);
      x = mix(p, a.x, b.x);
      y = mix(p, a.y, b.y);
    }
  }
  const squish = clicks.reduce((s, c) => {
    const d = frame - c;
    return d >= 0 && d < 10 ? Math.min(s, 0.82 + (d / 10) * 0.18) : s;
  }, 1);
  const ring = clicks
    .map((c) => frame - c)
    .filter((d) => d >= 0 && d < 24)
    .map((d) => d / 24);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 20 }}>
      {ring.map((r, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: -22,
            top: -22,
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: `2px solid ${C.clay}`,
            scale: String(0.4 + r),
            opacity: 1 - r,
          }}
        />
      ))}
      <svg width="30" height="38" viewBox="0 0 30 38" style={{ scale: String(squish), transformOrigin: "0 0" }}>
        <path
          d="M2 2 L2 30 L9.5 23 L14.5 35 L19 33 L14 21.5 L24 21.5 Z"
          fill={C.ink}
          stroke={C.white}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
