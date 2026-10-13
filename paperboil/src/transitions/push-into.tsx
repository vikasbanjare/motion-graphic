import { color, type PaletteToken } from "../palette";
import { easeIn, easeOut } from "../motion";
import { anchorPx, type TransitionImpl } from "./types";

/**
 * Reference: "zoom into the browser screen", "push into the monitor".
 * The camera accelerates into an object until it fills the frame; the next
 * shot starts inside it (its colour), settling from 115% to 100%.
 */
export const pushInto: TransitionImpl = {
  exitStyle: (p, ctx) => {
    const [x, y] = anchorPx(ctx);
    return { transform: `scale(${1 + easeIn(p) * 9})`, transformOrigin: `${x}px ${y}px` };
  },
  ExitOverlay: ({ p, ctx }) => {
    const fill = color((ctx.params.fill as PaletteToken) ?? "cream");
    return <div style={{ position: "absolute", inset: 0, background: fill, opacity: Math.max(0, (p - 0.55) / 0.45) }} />;
  },
  enterStyle: (p) => ({ transform: `scale(${1.15 - easeOut(p) * 0.15})` }),
  EnterOverlay: ({ p, ctx }) => {
    const fill = color((ctx.params.fill as PaletteToken) ?? "cream");
    return <div style={{ position: "absolute", inset: 0, background: fill, opacity: Math.max(0, 1 - p * 2.2) }} />;
  },
};
