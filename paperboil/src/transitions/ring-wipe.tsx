import { color, type PaletteToken } from "../palette";
import { easeIO } from "../motion";

/** Radius from an area-eased progress (no one-frame jump on the first frames). */
const radius = (p: number, w: number, h: number) => Math.sqrt(easeIO(p)) * Math.hypot(w, h) * 0.55;
import type { TransitionImpl } from "./types";

/** A radial colour ring expands from centre (eased by area, not radius) and reveals the next scene inside it. */
export const ringWipe: TransitionImpl = {
  enterStyle: (p, ctx) => {
    const { width, height } = ctx.layout;
    const r = radius(p, width, height);
    return { clipPath: `circle(${r}px at 50% 50%)` };
  },
  EnterOverlay: ({ p, ctx }) => {
    const { width, height } = ctx.layout;
    const r = radius(p, width, height);
    const colors = ((ctx.params.colors as PaletteToken[]) ?? ["orange", "blueBright"]).map(color);
    const band = height * 0.035;
    return (
      <svg width={width} height={height} style={{ position: "absolute", inset: 0, opacity: 1 - p * 0.6 }}>
        {colors.map((c, i) => (
          <circle key={c} cx={width / 2} cy={height / 2} r={r + i * band} fill="none" stroke={c} strokeWidth={band} />
        ))}
      </svg>
    );
  },
};
