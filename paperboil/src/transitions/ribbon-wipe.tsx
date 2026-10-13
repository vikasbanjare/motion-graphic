import { color, type PaletteToken } from "../palette";
import { Sprite } from "../paint/Sprite";
import { RIBBON_H, RIBBON_W, ribbon } from "../paint/sprites";
import { easeInOut } from "../timing";
import type { TransitionCtx, TransitionImpl } from "./types";

const ribbons = new Map<string, ReturnType<typeof ribbon>>();
const ribbonFor = (c: string) => {
  let fn = ribbons.get(c);
  if (!fn) {
    fn = ribbon(c);
    ribbons.set(c, fn);
  }
  return fn;
};

/** A painted swipe crosses the frame: covers the old scene, then uncovers the new. */
const Ribbon: React.FC<{ p: number; ctx: TransitionCtx; phase: "exit" | "enter" }> = ({ p, ctx, phase }) => {
  const { width, height } = ctx.layout;
  const c = color((ctx.params.color as PaletteToken) ?? "orange");
  const scale = (Math.hypot(width, height) * 1.25) / RIBBON_W;
  const w = RIBBON_W * scale;
  // Travel: from off-left (-w) to fully covering (0 offset) to off-right.
  const t = phase === "exit" ? easeInOut(p) * 0.5 : 0.5 + easeInOut(p) * 0.5;
  const x = -w + t * (width + w);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: (height - RIBBON_H * scale) / 2,
        width: RIBBON_W,
        height: RIBBON_H,
        transform: `scale(${scale}) rotate(-8deg)`,
        transformOrigin: "0 0",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: c, top: RIBBON_H * 0.18, bottom: RIBBON_H * 0.18 }} />
      <Sprite id={`ribbon-${c}`} w={RIBBON_W} h={RIBBON_H} draw={ribbonFor(c)} />
    </div>
  );
};

export const ribbonWipe: TransitionImpl = {
  ExitOverlay: (props) => <Ribbon {...props} phase="exit" />,
  EnterOverlay: (props) => <Ribbon {...props} phase="enter" />,
};
