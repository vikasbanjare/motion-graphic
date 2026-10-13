import { color, type PaletteToken } from "../palette";
import { anchorPx, type TransitionCtx, type TransitionImpl } from "./types";

/** The same object survives the cut: a glowing orange light rides across it. */
const Carry: React.FC<{ p: number; ctx: TransitionCtx; phase: "exit" | "enter" }> = ({ p, ctx, phase }) => {
  const [x0, y0] = anchorPx(ctx, "anchor", ctx.from);
  const [x1, y1] = anchorPx(ctx, "to", ctx.to);
  const t = phase === "exit" ? p * 0.5 : 0.5 + p * 0.5;
  const x = x0 + (x1 - x0) * t;
  const y = y0 + (y1 - y0) * t;
  const c = color(((ctx.params.color as PaletteToken) ?? "orangeBright"));
  const r = ctx.layout.height * (0.04 + Math.sin(t * Math.PI) * 0.05);
  const fade = phase === "enter" ? 1 - p : 1;
  return (
    <div
      style={{
        position: "absolute",
        left: x - r * 2,
        top: y - r * 2,
        width: r * 4,
        height: r * 4,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${c} 0%, ${c} 24%, ${c}66 42%, transparent 70%)`,
        opacity: fade,
      }}
    />
  );
};

export const carryThrough: TransitionImpl = {
  ExitOverlay: (props) => <Carry {...props} phase="exit" />,
  EnterOverlay: (props) => <Carry {...props} phase="enter" />,
};
