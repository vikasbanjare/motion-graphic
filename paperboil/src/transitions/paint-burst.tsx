import { Sprite } from "../paint/Sprite";
import { BURST, burst } from "../paint/sprites";
import { expoOut } from "../timing";
import type { TransitionImpl } from "./types";

/**
 * Painted starburst on the downbeat. The scene behind lands with a settle;
 * a second burst flashes out past the edges (the drop's colour hit).
 */
export const paintBurst: TransitionImpl = {
  enterStyle: (p) => ({ transform: `scale(${1.08 - expoOut(p) * 0.08})` }),
  EnterOverlay: ({ p, ctx }) => {
    const { width, height } = ctx.layout;
    const size = Math.max(width, height) * (0.6 + expoOut(p) * 1.1);
    return (
      <div
        style={{
          position: "absolute",
          left: (width - size) / 2,
          top: (height - size) / 2,
          width: BURST,
          height: BURST,
          transform: `scale(${size / BURST}) rotate(${p * 12}deg)`,
          transformOrigin: "0 0",
          opacity: 1 - p,
        }}
      >
        <Sprite id="burst-flash" w={BURST} h={BURST} draw={burst} />
      </div>
    );
  },
};
