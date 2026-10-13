import { color, type PaletteToken } from "../palette";
import { easeIn, easeOut } from "../motion";
import type { TransitionCtx, TransitionImpl } from "./types";

/**
 * Cut-paper band wipe: a slanted strip (with a hard offset shadow) sweeps
 * across, covering the old shot, then carries on to uncover the new one.
 */
const Band: React.FC<{ p: number; ctx: TransitionCtx; phase: "exit" | "enter" }> = ({ p, ctx, phase }) => {
  const { width, height } = ctx.layout;
  const c = color((ctx.params.color as PaletteToken) ?? "navy");
  const w = width * 1.6 + height;
  const t = phase === "exit" ? easeIn(p) * 0.5 : 0.5 + easeOut(p) * 0.5;
  const x = -w + t * (width + w) * 1.02;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: -height * 0.25,
        width: w,
        height: height * 1.5,
        background: c,
        transform: "skewX(-18deg)",
        boxShadow: "18px 0 0 rgba(0,32,66,0.22)",
      }}
    />
  );
};

export const bandWipe: TransitionImpl = {
  ExitOverlay: (props) => <Band {...props} phase="exit" />,
  EnterOverlay: (props) => <Band {...props} phase="enter" />,
};
