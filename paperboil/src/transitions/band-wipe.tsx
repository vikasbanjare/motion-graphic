import { color, type PaletteToken } from "../palette";
import { easeOut } from "../motion";
import type { TransitionCtx, TransitionImpl } from "./types";

/**
 * Cut-paper band wipe with elastic edges: the leading edge runs ahead on a
 * stiffer curve than the trailing edge, so the band stretches like paper
 * rather than sliding as a rigid block. An orange accent strip rides just
 * behind the leading edge. Covers at the cut, uncovers after it.
 */
const SKEW = 0.28; // slant, as a fraction of frame height

const Band: React.FC<{ p: number; ctx: TransitionCtx; phase: "exit" | "enter" }> = ({ p, ctx, phase }) => {
  const { width: W, height: H } = ctx.layout;
  const c = color((ctx.params.color as PaletteToken) ?? "navy");
  const accent = color(ctx.params.color === "orange" ? "navy" : "orange");
  const sk = H * SKEW;
  const span = W + sk * 2;
  // Edge positions in [0, 1] along the sweep.
  const lead = phase === "exit" ? easeOut(Math.min(1, p * 1.25)) : 1;
  // Uncover fast: the next shot must read almost at once (short shots).
  const trail = phase === "exit" ? 0 : easeOut(Math.min(1, p * 1.5));
  const lx = -sk + lead * span;
  const tx = -sk + trail * span;
  const poly = (a: number, b: number) => `polygon(${a}px ${-10}px, ${b + sk}px ${-10}px, ${b}px ${H + 10}px, ${a - sk}px ${H + 10}px)`;
  const stripW = W * 0.035;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: c, clipPath: poly(tx, lx), filter: "drop-shadow(14px 0 0 rgba(0,32,66,0.25))" }} />
      {phase === "exit" && lead < 1 ? <div style={{ position: "absolute", inset: 0, background: accent, clipPath: poly(lx - stripW * 2.2, lx - stripW * 1.2) }} /> : null}
      {phase === "enter" && trail > 0 ? <div style={{ position: "absolute", inset: 0, background: accent, clipPath: poly(tx - stripW, tx) }} /> : null}
    </>
  );
};

export const bandWipe: TransitionImpl = {
  ExitOverlay: (props) => <Band {...props} phase="exit" />,
  EnterOverlay: (props) => <Band {...props} phase="enter" />,
};
