import { AbsoluteFill, useCurrentFrame } from "remotion";
import { useLayout } from "../layout";
import { color, palette, type PaletteToken } from "../palette";
import { Sprite } from "../paint/Sprite";
import { BACKDROP, jaggedBurst, rays } from "../paint/sprites";
import { expoOut } from "../timing";

export type BackdropSpec = {
  /** glow: radial vignette glow · field: flat saturated field · desk: calm payoff desk */
  kind: "glow" | "field" | "desk";
  /** [centre, edge] tokens for glow; [field] for field/desk. */
  colors: PaletteToken[];
  /** Painted sunburst behind the subject. */
  rays?: { colors: PaletteToken[]; opacity?: number; spin?: number; scale?: number; from?: number };
  /** Jagged multi-colour burst (the drop). */
  burst?: boolean;
  /** Falling specks (the reference's snow), in a token colour. */
  specks?: PaletteToken;
  /** Checker border bands top and bottom. */
  checker?: [PaletteToken, PaletteToken];
};

const rayCache = new Map<string, ReturnType<typeof rays>>();
const raysFor = (tokens: PaletteToken[], opacity: number) => {
  const k = `${tokens.join(",")}|${opacity}`;
  let fn = rayCache.get(k);
  if (!fn) {
    fn = rays(tokens.map(color), 18, opacity);
    rayCache.set(k, fn);
  }
  return fn;
};

/** Full-bleed painted ground for a shot: glow/field + rays/burst + specks + checker + vignette. */
export const Backdrop: React.FC<{ spec: BackdropSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const { width, height } = useLayout();
  const [c0, c1 = c0] = spec.colors.map(color);
  const cover = Math.hypot(width, height) / BACKDROP;

  const base =
    spec.kind === "glow"
      ? `radial-gradient(ellipse 75% 85% at 50% 48%, ${c0} 0%, ${c0} 30%, ${c1} 100%)`
      : spec.kind === "desk"
        ? `radial-gradient(ellipse 90% 90% at 50% 45%, ${c0} 0%, ${c1} 100%)`
        : c0;

  const specks = spec.specks
    ? Array.from({ length: 70 }, (_, i) => {
        const r1 = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
        const r2 = Math.abs(Math.sin(i * 78.233) * 12345.678) % 1;
        const speed = 0.6 + r2 * 1.4;
        const y = ((r2 * height + frame * speed * 2.2) % (height + 20)) - 10;
        const x = r1 * width + Math.sin(frame / 20 + i) * 8;
        return { x, y, s: 2 + (i % 4) * 1.5 };
      })
    : [];

  const band = height * 0.035;
  return (
    <AbsoluteFill style={{ background: base, overflow: "hidden" }}>
      {spec.rays ? (
        <div
          style={{
            position: "absolute",
            left: (width - BACKDROP) / 2,
            top: (height - BACKDROP) / 2,
            width: BACKDROP,
            height: BACKDROP,
            transform: `scale(${cover * (spec.rays.scale ?? 1)}) rotate(${frame * (spec.rays.spin ?? 0.15)}deg)`,
            opacity: spec.rays.from !== undefined ? Math.min(1, Math.max(0, (frame - spec.rays.from) / 6)) : 1,
          }}
        >
          <Sprite id={`rays-${spec.rays.colors.join("-")}-${spec.rays.opacity ?? 120}`} w={BACKDROP} h={BACKDROP} draw={raysFor(spec.rays.colors, spec.rays.opacity ?? 120)} />
        </div>
      ) : null}
      {spec.burst ? (
        <div style={{ position: "absolute", left: (width - BACKDROP) / 2, top: (height - BACKDROP) / 2, width: BACKDROP, height: BACKDROP, transform: `scale(${cover * 1.05 * (0.6 + 0.4 * expoOut(Math.min(1, frame / 12)))}) rotate(${frame * 0.2}deg)` }}>
          <Sprite id="jagged-burst" w={BACKDROP} h={BACKDROP} draw={jaggedBurst} />
        </div>
      ) : null}
      {specks.length ? (
        <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
          {specks.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={p.s} fill={color(spec.specks!)} fillOpacity={0.85} />
          ))}
        </svg>
      ) : null}
      {spec.checker ? (
        <>
          {[0, height - band].map((top) => (
            <div
              key={top}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top,
                height: band,
                backgroundImage: `repeating-conic-gradient(${color(spec.checker![0])} 0% 25%, ${color(spec.checker![1])} 0% 50%)`,
                backgroundSize: `${band}px ${band}px`,
              }}
            />
          ))}
        </>
      ) : null}
      {/* Soft vignette, like the reference's lilac glow edges. */}
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 55%, ${palette.ink}22 100%)` }} />
    </AbsoluteFill>
  );
};
