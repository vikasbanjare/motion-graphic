import { easeInOut, expoOut } from "../timing";
import { anchorPx, type TransitionImpl } from "./types";

/**
 * The outgoing object's shape becomes the next scene: the old shot pushes into
 * the anchor object, and the new shot opens out of a matching shape (rect,
 * pill, circle or arch) centred on the same point.
 */
export const morphMatch: TransitionImpl = {
  exitStyle: (p, ctx) => {
    const [x, y] = anchorPx(ctx);
    return { transform: `scale(${1 + easeInOut(p) * 0.9})`, transformOrigin: `${x}px ${y}px` };
  },
  enterStyle: (p, ctx) => {
    const [x, y] = anchorPx(ctx);
    const { width, height } = ctx.layout;
    const shape = (ctx.params.shape as string) ?? "circle";
    const e = expoOut(p);
    const maxR = Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
    const r = 40 + e * maxR;
    if (shape === "circle") return { clipPath: `circle(${r}px at ${x}px ${y}px)` };
    const hw = shape === "pill" ? r * 1.6 : r;
    const hh = shape === "arch" ? r * 1.5 : r * (shape === "pill" ? 0.45 : 0.8);
    const radius = shape === "pill" ? hh : shape === "arch" ? `${hw}px ${hw}px 0 0` : 24;
    const top = Math.max(0, y - hh);
    const left = Math.max(0, x - hw);
    const right = Math.max(0, width - (x + hw));
    const bottom = Math.max(0, height - (y + hh));
    return { clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px round ${typeof radius === "number" ? `${radius}px` : radius})` };
  },
};
