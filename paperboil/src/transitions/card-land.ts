import { easeIn, easeOut } from "../motion";
import type { TransitionImpl } from "./types";

/** Reference: each certificate tilts in, lands and flattens on the stack. */
export const cardLand: TransitionImpl = {
  revealNextGround: true,
  exitStyle: (p) => ({ transform: `scale(${1 - easeIn(p) * 0.06})`, filter: `brightness(${1 - p * 0.25})` }),
  enterStyle: (p, ctx) => {
    const e = easeOut(p);
    return {
      transform: `perspective(1600px) translate(${(1 - e) * ctx.layout.width * 0.18}px, ${(1 - e) * -ctx.layout.height * 0.35}px) rotateX(${(1 - e) * 38}deg) rotate(${(1 - e) * -9}deg) scale(${1 + (1 - e) * 0.12})`,
      transformOrigin: "50% 100%",
    };
  },
};
