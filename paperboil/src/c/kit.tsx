import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "../fonts";
import { camera } from "../motion";
import { palette as P } from "../palette";

/**
 * Style C — "Bold Cut-Paper Graphic" kit.
 *
 * Everything is authored on a 1080×1080 STAGE (stage units), centred in the
 * frame and scaled to min(width, height). Landscape gets 420 units of bleed
 * left/right, portrait gets it top/bottom, so backgrounds are drawn oversized
 * and type is allowed to run off the stage edge.
 */
export const STAGE = 1080;

export const SHADOW = "drop-shadow(9px 13px 0 rgba(0, 32, 66, 0.24))";
export const SHADOW_SOFT = "drop-shadow(6px 9px 0 rgba(0, 32, 66, 0.18))";

/** Stage: centred square with a living camera (push + drift, never static). */
export const Stage: React.FC<{ children: React.ReactNode; push?: [number, number]; dur: number; seed?: number; origin?: [number, number] }> = ({
  children,
  push = [1, 1.05],
  dur,
  seed = 0,
  origin = [540, 540],
}) => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  // Portrait: pull the stage in a little so bleed type still reads edge to edge.
  const s = (Math.min(width, height) / STAGE) * (height > width ? 0.88 : 1);
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: (width - STAGE * s) / 2,
          top: (height - STAGE * s) / 2,
          width: STAGE,
          height: STAGE,
          transform: `scale(${s})`,
          transformOrigin: "0 0",
        }}
      >
        <div style={{ position: "absolute", inset: 0, transform: camera(f, dur, { from: push[0], to: push[1], drift: 4, rot: 0.35, seed }), transformOrigin: `${origin[0]}px ${origin[1]}px` }}>
          {children}
        </div>
      </div>
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
        filter: shadow === "soft" ? SHADOW_SOFT : shadow ? SHADOW : undefined,
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
      lineHeight,
      letterSpacing: `${tracking}em`,
      color,
      whiteSpace: "pre",
      WebkitTextStroke: outline ? `${Math.max(3, size * 0.016)}px ${outline}` : undefined,
      filter: shadow === true ? SHADOW : typeof shadow === "string" ? shadow : undefined,
      transform: `rotate(${rotate}deg) ${italic ? "skewX(-12deg)" : ""} ${transform}`,
      transformOrigin: origin,
      opacity,
      clipPath: clip,
    }}
  >
    {text}
  </div>
);

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
  <div style={{ position: "absolute", left: -1200, top: -1200, width: STAGE + 2400, height: STAGE + 2400, background: color }}>
    {tone ? <div style={{ position: "absolute", inset: 0, ...halftone(tone, 16, 0.18), opacity: 0.35 }} /> : null}
  </div>
);

/** Small "confetti" accents that make a poster feel finished. */
export const Accents: React.FC<{ items: Array<{ x: number; y: number; s: number; c: string; kind: "sq" | "dot" | "tri" | "bar"; r?: number; at?: number }>; f: number; pop: (f: number, at: number) => number }> = ({ items, f, pop }) => (
  <>
    {items.map((a, i) => {
      const s = pop(f, a.at ?? 0);
      if (s <= 0) return null;
      const common = { position: "absolute" as const, left: a.x - a.s / 2, top: a.y - a.s / 2, width: a.s, height: a.kind === "bar" ? a.s * 0.28 : a.s, background: a.c, filter: SHADOW_SOFT, transform: `rotate(${(a.r ?? 0) + Math.sin(f / 9 + i) * 6}deg) scale(${s})` };
      if (a.kind === "dot") return <div key={i} style={{ ...common, borderRadius: "50%" }} />;
      if (a.kind === "tri") return <div key={i} style={{ ...common, clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />;
      return <div key={i} style={common} />;
    })}
  </>
);
