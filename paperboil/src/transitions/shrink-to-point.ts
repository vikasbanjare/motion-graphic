import { anchorPx, type TransitionImpl } from "./types";

/** The scene shrinks away to a point; the next ground is waiting behind it. */
export const shrinkToPoint: TransitionImpl = {
  revealNextGround: true,
  exitStyle: (p, ctx) => {
    const [x, y] = anchorPx(ctx);
    const e = p * p;
    return { transform: `scale(${1 - e}) rotate(${e * 18}deg)`, transformOrigin: `${x}px ${y}px` };
  },
};
