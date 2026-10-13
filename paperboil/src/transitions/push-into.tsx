import { color, type PaletteToken } from "../palette";
import { easeIn, easeIO, easeOut } from "../motion";
import { anchorPx, type TransitionImpl } from "./types";

/**
 * Reference: "zoom into the browser screen", "push into the 0".
 * The camera accelerates into an object; a hard-edged flood of the next
 * shot's colour grows from the object (area-eased) until it covers the frame.
 * No colour cross-fades — the accent never fades into the dark.
 */
export const pushInto: TransitionImpl = {
  exitStyle: (p, ctx) => {
    const [x, y] = anchorPx(ctx);
    return { transform: `scale(${1 + easeIn(p) * 4})`, transformOrigin: `${x}px ${y}px` };
  },
  ExitOverlay: ({ p, ctx }) => {
    const [x, y] = anchorPx(ctx);
    const { width, height } = ctx.layout;
    const fill = color((ctx.params.fill as PaletteToken) ?? "cream");
    const maxR = Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
    const r = Math.sqrt(easeIO(p)) * maxR * 1.02;
    if (r >= maxR) return <div style={{ position: "absolute", inset: 0, background: fill }} />;
    return <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: "50%", background: fill }} />;
  },
  enterStyle: (p) => ({ transform: `scale(${1.12 - easeOut(p) * 0.12})` }),
};
