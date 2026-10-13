import { easeIn } from "../motion";
import type { TransitionImpl } from "./types";

/** Reference: the stack slides away with a smear before the end card. */
export const slideOff: TransitionImpl = {
  revealNextGround: true,
  exitStyle: (p, ctx) => {
    const e = easeIn(p);
    const dx = e * ctx.layout.width * 1.1;
    return { transform: `translateX(${dx}px) skewX(${-e * 18}deg) scaleX(${1 + e * 0.35})`, filter: `blur(${e * 6}px)` };
  },
};
