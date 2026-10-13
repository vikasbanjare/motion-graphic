import { Sprite } from "../paint/Sprite";
import { BACKDROP, jaggedBurst } from "../paint/sprites";
import { easeOut } from "../motion";
import type { TransitionImpl } from "./types";

/**
 * Reference: ghost arches appear, then the painted burst blows out on the
 * downbeat (wedges fly in from the edges). Here the burst slams in over the
 * first frames of the drop and the new scene lands with a 15% overshoot.
 */
export const echoBurst: TransitionImpl = {
  enterStyle: (p) => ({ transform: `scale(${1.15 - easeOut(p) * 0.15})` }),
  EnterOverlay: ({ p, ctx }) => {
    const { width, height } = ctx.layout;
    const size = Math.hypot(width, height) * (2.2 - easeOut(p) * 1.1);
    return (
      <div
        style={{
          position: "absolute",
          left: (width - size) / 2,
          top: (height - size) / 2,
          width: BACKDROP,
          height: BACKDROP,
          transform: `scale(${size / BACKDROP}) rotate(${(1 - p) * -25}deg)`,
          transformOrigin: "0 0",
          opacity: 1 - p,
        }}
      >
        <Sprite id="jagged-burst" w={BACKDROP} h={BACKDROP} draw={jaggedBurst} />
      </div>
    );
  },
  ExitOverlay: ({ p }) => <div style={{ position: "absolute", inset: 0, background: "#ffffff", opacity: p > 0.75 ? (p - 0.75) * 2.4 : 0 }} />,
};
