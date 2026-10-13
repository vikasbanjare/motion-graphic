import { expoOut } from "../timing";
import type { TransitionImpl } from "./types";

/** The next scene flicks in like a card: tilted, then flattened onto the stack. */
export const cardFlickStack: TransitionImpl = {
  exitStyle: (p) => ({ transform: `translateY(${p * -6}%) scale(${1 - p * 0.06})`, filter: `brightness(${1 - p * 0.25})` }),
  enterStyle: (p, ctx) => {
    const e = expoOut(p);
    return {
      transform: `translate(${(1 - e) * ctx.layout.width * 0.4}px, ${(1 - e) * ctx.layout.height * -0.2}px) rotate(${(1 - e) * 14}deg)`,
      transformOrigin: "50% 100%",
    };
  },
};
