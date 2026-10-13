import { createContext, useContext, useId } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "../fonts";
import { camera } from "../motion";
import { palette as P } from "../palette";

/**
 * Editorial cut-paper collage kit.
 *
 * Landscape only: every shot is composed for the full 1920×1080 frame
 * (stage units = output pixels at 1080p). Backgrounds are drawn oversized so
 * camera moves never reveal an edge, and type may run off the frame.
 */
export const STAGE_W = 1920;
export const STAGE_H = 1080;
/** @deprecated square-stage width, kept for old shared helpers */
export const STAGE = 1080;

/** Real paper lifts off the page: short, slightly soft shadow. */
export const SHADOW = "drop-shadow(5px 8px 2px rgba(8, 22, 44, 0.30))";
export const SHADOW_SOFT = "drop-shadow(3px 5px 1.5px rgba(8, 22, 44, 0.24))";

/**
 * Collage finish (editorial cut-paper, after Giant Ant / BUCK): every cut
 * shape gets a torn, slightly boiling edge (re-seeded each drawing) and paper
 * fibre speckle inside it; type gets a lighter letterpress edge. Filters are
 * defined once per Stage and shared through context.
 */
const EdgeCtx = createContext<{ paper: string; ink: string } | null>(null);
const useEdges = () => useContext(EdgeCtx);

const EdgeDefs: React.FC<{ paper: string; ink: string; seed: number }> = ({ paper, ink, seed }) => (
  <svg width={0} height={0} style={{ position: "absolute" }}>
    <defs>
      <filter id={paper} x="-12%" y="-12%" width="124%" height="124%">
        <feTurbulence type="fractalNoise" baseFrequency={0.032} numOctaves={2} seed={seed} result="warp" />
        <feDisplacementMap in="SourceGraphic" in2="warp" scale={5} xChannelSelector="R" yChannelSelector="G" result="rough" />
        <feTurbulence type="fractalNoise" baseFrequency={0.85} numOctaves={2} seed={7} result="grain" />
        <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0.05  0 0 0 0 0.08  0 0 0 0 0.14  0 0 0 -1.1 0.62" result="speck" />
        <feComposite in="speck" in2="rough" operator="in" result="fibre" />
        <feMerge>
          <feMergeNode in="rough" />
          <feMergeNode in="fibre" />
        </feMerge>
      </filter>
      <filter id={ink} x="-12%" y="-25%" width="124%" height="150%">
        <feTurbulence type="fractalNoise" baseFrequency={0.06} numOctaves={1} seed={seed + 11} result="warp" />
        <feDisplacementMap in="SourceGraphic" in2="warp" scale={2.2} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);

/** Filter chains for cut-paper shapes and printed type. */
const paperFilter = (edges: { paper: string } | null, shadow: string | undefined) => [edges ? `url(#${edges.paper})` : "", shadow ?? ""].join(" ").trim() || undefined;
const inkFilter = (edges: { ink: string } | null, shadow: string | undefined) => [edges ? `url(#${edges.ink})` : "", shadow ?? ""].join(" ").trim() || undefined;

/** Stage: centred square with a living camera (push + drift, never static). */
export const Stage: React.FC<{ children: React.ReactNode; push?: [number, number]; dur: number; seed?: number; origin?: [number, number] }> = ({
  children,
  push = [1, 1.05],
  dur,
  seed = 0,
  origin = [960, 540],
}) => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const uid = useId().replace(/:/g, "");
  const edges = { paper: `paper-${uid}`, ink: `ink-${uid}` };
  // Edges boil: re-seeded per drawing (the picture is already stepped on twos).
  const edgeSeed = (Math.floor(f / 2) % 4) + 1;
  const s = width / STAGE_W;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <EdgeDefs paper={edges.paper} ink={edges.ink} seed={edgeSeed} />
      <EdgeCtx.Provider value={edges}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: (height - STAGE_H * s) / 2,
          width: STAGE_W,
          height: STAGE_H,
          transform: `scale(${s})`,
          transformOrigin: "0 0",
        }}
      >
        <div style={{ position: "absolute", inset: 0, transform: camera(f, dur, { from: push[0], to: push[1], drift: 4, rot: 0.35, seed }), transformOrigin: `${origin[0]}px ${origin[1]}px` }}>
          {children}
        </div>
      </div>
      </EdgeCtx.Provider>
    </AbsoluteFill>
  );
};

/** Halftone dot texture (printed-shadow side of a cut shape). */
export const halftone = (color: string, size = 13, dot = 0.3) => ({
  backgroundImage: `radial-gradient(circle, ${color} ${dot * 100}%, transparent ${dot * 100 + 2}%)`,
  backgroundSize: `${size}px ${size}px`,
});

type CutProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  radius?: number | string;
  clip?: string;
  rotate?: number;
  scale?: number | string;
  origin?: string;
  shadow?: boolean | "soft";
  /** Halftone on a side: "bottom" | "right" | "full". */
  tone?: { side: "bottom" | "right" | "left" | "full"; color?: string; opacity?: number };
  opacity?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

/** A cut-paper shape: flat fill, hard offset shadow, optional halftone side. */
export const Cut: React.FC<CutProps> = ({ x, y, w, h, color, radius = 0, clip, rotate = 0, scale = 1, origin = "50% 50%", shadow = true, tone, opacity = 1, style, children }) => {
  const edges = useEdges();
  const sc = typeof scale === "number" ? `scale(${scale})` : scale;
  const toneMask =
    tone?.side === "bottom"
      ? "linear-gradient(180deg, transparent 52%, #000 52%)"
      : tone?.side === "right"
        ? "linear-gradient(90deg, transparent 55%, #000 55%)"
        : tone?.side === "left"
          ? "linear-gradient(90deg, #000 45%, transparent 45%)"
          : undefined;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        transform: `rotate(${rotate}deg) ${sc}`,
        transformOrigin: origin,
        filter: paperFilter(edges, shadow === "soft" ? SHADOW_SOFT : shadow ? SHADOW : undefined),
        opacity,
        ...style,
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: color, borderRadius: radius, clipPath: clip, overflow: "hidden" }}>
        {tone ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              ...halftone(tone.color ?? "rgba(0,32,66,0.55)"),
              opacity: tone.opacity ?? 0.5,
              WebkitMaskImage: toneMask,
              maskImage: toneMask,
            }}
          />
        ) : null}
        {children}
      </div>
    </div>
  );
};

type TypeProps = {
  text: string;
  x: number;
  y: number;
  size: number;
  color: string;
  weight?: 400 | 600 | 800;
  outline?: string;
  shadow?: boolean | string;
  tracking?: number;
  align?: "left" | "center" | "right";
  width?: number;
  rotate?: number;
  transform?: string;
  origin?: string;
  opacity?: number;
  lineHeight?: number;
  italic?: boolean;
  clip?: string;
  /** Variable-font axes (overrides weight). */
  vary?: { wght: number; wdth: number };
};

/**
 * Kick pulse for variable type: on every beat after `at` the word slams to
 * full weight/width and relaxes before the next kick (12-frame beat).
 */
export const kickPulse = (f: number, at = 0, beat = 12) => {
  if (f < at) return { wght: 800, wdth: 100 };
  const t = (f - at) % beat;
  const k = Math.exp(-t / 3.2);
  return { wght: 620 + 180 * k, wdth: 80 + 20 * k };
};

/** Poster type, positioned by its top-left (or by width + align). */
export const Type: React.FC<TypeProps> = ({
  text,
  x,
  y,
  size,
  color,
  weight = 800,
  outline,
  shadow = true,
  tracking = -0.035,
  align = "left",
  width,
  rotate = 0,
  transform = "",
  origin = "0% 100%",
  opacity = 1,
  lineHeight = 0.86,
  italic,
  clip,
  vary,
}) => {
  const edges = useEdges();
  return (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      textAlign: align,
      fontFamily: FONT_FAMILY,
      fontWeight: vary ? undefined : weight,
      fontVariationSettings: vary ? `"wght" ${vary.wght.toFixed(0)}, "wdth" ${vary.wdth.toFixed(1)}` : undefined,
      fontSize: size,
      lineHeight,
      letterSpacing: `${tracking}em`,
      color,
      whiteSpace: "pre",
      WebkitTextStroke: outline ? `${Math.max(3, size * 0.016)}px ${outline}` : undefined,
      filter: inkFilter(edges, shadow === true ? SHADOW : typeof shadow === "string" ? shadow : undefined),
      transform: `rotate(${rotate}deg) ${italic ? "skewX(-12deg)" : ""} ${transform}`,
      transformOrigin: origin,
      opacity,
      clipPath: clip,
    }}
  >
    {text}
  </div>
);
};

/** Small tracked caps label. */
export const Label: React.FC<{ text: string; x: number; y: number; size?: number; color?: string; tracking?: number; align?: "left" | "center" | "right"; width?: number; opacity?: number; weight?: 400 | 600 | 800 }> = ({
  text,
  x,
  y,
  size = 26,
  color = P.navy,
  tracking = 0.32,
  align = "left",
  width,
  opacity = 1,
  weight = 600,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      textAlign: align,
      fontFamily: FONT_FAMILY,
      fontWeight: weight,
      fontSize: size,
      letterSpacing: `${tracking}em`,
      color,
      whiteSpace: "pre",
      opacity,
    }}
  >
    {text}
  </div>
);

/** Full-bleed flat ground for a shot (drawn way past the stage). */
export const Ground: React.FC<{ color: string; tone?: string }> = ({ color, tone }) => (
  <div style={{ position: "absolute", left: -1000, top: -1000, width: STAGE_W + 2000, height: STAGE_H + 2000, background: color }}>
    {tone ? <div style={{ position: "absolute", inset: 0, ...halftone(tone, 16, 0.18), opacity: 0.35 }} /> : null}
  </div>
);

/** Small "confetti" accents that make a poster feel finished. */
export const Accents: React.FC<{ items: Array<{ x: number; y: number; s: number; c: string; kind: "sq" | "dot" | "tri" | "bar"; r?: number; at?: number }>; f: number; pop: (f: number, at: number) => number }> = ({ items, f, pop }) => (
  <>
    {items.map((a, i) => {
      const s = pop(f, a.at ?? 0);
      if (s <= 0) return null;
      const common = { position: "absolute" as const, left: a.x - a.s / 2, top: a.y - a.s / 2, width: a.s, height: a.kind === "bar" ? a.s * 0.28 : a.s, background: a.c, filter: SHADOW_SOFT, outline: a.kind === "tri" ? undefined : `6px solid ${P.cream}`, transform: `rotate(${(a.r ?? 0) + Math.sin(f / 9 + i) * 6}deg) scale(${s})` };
      if (a.kind === "dot") return <div key={i} style={{ ...common, borderRadius: "50%" }} />;
      if (a.kind === "tri") return <div key={i} style={{ ...common, clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />;
      return <div key={i} style={common} />;
    })}
  </>
);

/**
 * Mask-line type reveal: each line is its own clip band; glyphs rise through
 * it one by one (stagger = a 16th note, 3 frames at 150 BPM) on a critically
 * damped spring. Lines can bleed off frame cleanly. `out` lowers them away.
 */
export const RevealType: React.FC<{
  text: string;
  x: number;
  y: number;
  size: number;
  color: string;
  f: number;
  at: number;
  stagger?: number;
  lineStagger?: number;
  out?: number;
  outline?: string;
  lineHeight?: number;
  tracking?: number;
  weight?: 400 | 600 | 800;
  opacity?: number;
  rotate?: number;
  spring: (f: number, at: number) => number;
}> = ({ text, x, y, size, color, f, at, stagger = 3, lineStagger = 4, out, outline, lineHeight = 0.9, tracking = -0.035, weight = 800, opacity = 1, rotate = 0, spring }) => {
  const lines = text.split("\n");
  const edges = useEdges();
  let n = 0;
  return (
    <div style={{ position: "absolute", left: x, top: y, filter: inkFilter(edges, SHADOW), opacity, transform: `rotate(${rotate}deg)`, transformOrigin: "0 50%" }}>
      {lines.map((line, li) => (
        <div key={li} style={{ overflow: "hidden", height: size * lineHeight, paddingRight: size * 0.1, whiteSpace: "pre" }}>
          {[...line].map((ch, ci) => {
            const start = at + li * lineStagger + ci * (stagger / 2) + (n++ * 0);
            const s = spring(f, start);
            const o = out !== undefined ? spring(f, out + ci) : 0;
            return (
              <span
                key={ci}
                style={{
                  display: "inline-block",
                  fontFamily: FONT_FAMILY,
                  fontWeight: weight,
                  fontSize: size,
                  lineHeight,
                  letterSpacing: `${tracking}em`,
                  color,
                  WebkitTextStroke: outline ? `${Math.max(3, size * 0.016)}px ${outline}` : undefined,
                  transform: `translateY(${(1 - s + o) * 105}%)`,
                }}
              >
                {ch === " " ? " " : ch}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

/**
 * Print misregistration on impact frames only: orange + navy ghosts offset by
 * a few px for `len` frames after `at`, fading out.
 */
export const Misreg: React.FC<{ f: number; at: number; len?: number; children: React.ReactNode }> = ({ f, at, len = 4, children }) => {
  const k = f - at;
  if (k < 0 || k >= len) return <>{children}</>;
  const a = 0.45 * (1 - k / len);
  const d = 4 * (1 - k / len) + 1.5;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${-d}px, ${d * 0.6}px)`, opacity: a, filter: "sepia(1) saturate(6) hue-rotate(-20deg)", mixBlendMode: "multiply" }}>{children}</div>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${d}px, ${-d * 0.6}px)`, opacity: a, filter: "grayscale(1) brightness(0.4) sepia(1) hue-rotate(180deg) saturate(4)", mixBlendMode: "multiply" }}>{children}</div>
      <div style={{ position: "absolute", inset: 0 }}>{children}</div>
    </>
  );
};

/**
 * Moving hold: a group that keeps breathing after it lands — slow drift and a
 * hair of rotation, each group on its own seed so layers never move in lockstep.
 */
export const Drift: React.FC<{ f: number; seed: number; amp?: number; rot?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ f, seed, amp = 10, rot = 0.6, children, style }) => {
  const w = (s: number) => Math.sin(f / 23 + s * 1.7) * 0.6 + Math.sin(f / 37 + s * 3.1) * 0.4;
  return <div style={{ position: "absolute", inset: 0, transform: `translate(${w(seed) * amp}px, ${w(seed + 4) * amp * 0.6}px) rotate(${w(seed + 8) * rot}deg)`, ...style }}>{children}</div>;
};
