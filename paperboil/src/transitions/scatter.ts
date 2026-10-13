import { easeIn } from "../motion";
import { anchorPx, type TransitionImpl } from "./types";

/** Reference: the bottle caps spread out and fold away. The scene shrinks, spins and flies to its slot in the next layout. */
export const scatter: TransitionImpl = {
  revealNextGround: true,
  exitStyle: (p, ctx) => {
    const [x, y] = anchorPx(ctx);
    const e = easeIn(p);
    return { transform: `translate(${e * -ctx.layout.width * 0.25}px, ${e * -ctx.layout.height * 0.3}px) scale(${1 - e * 0.85}) rotate(${e * -40}deg)`, transformOrigin: `${x}px ${y}px` };
  },
};
