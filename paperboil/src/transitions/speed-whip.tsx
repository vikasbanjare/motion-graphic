import { palette } from "../palette";
import { easeInOut, expoOut } from "../timing";
import { anchorPx, type TransitionCtx, type TransitionImpl } from "./types";

const Lines: React.FC<{ p: number; ctx: TransitionCtx; strength: number }> = ({ ctx, strength }) => {
  const { width, height } = ctx.layout;
  const [x, y] = anchorPx(ctx);
  return (
    <svg width={width} height={height} style={{ position: "absolute", inset: 0, opacity: strength }}>
      {Array.from({ length: 28 }, (_, i) => {
        const a = (i / 28) * Math.PI * 2;
        const r0 = height * (0.18 + (i % 3) * 0.05);
        const r1 = Math.hypot(width, height);
        return (
          <line
            key={i}
            x1={x + Math.cos(a) * r0}
            y1={y + Math.sin(a) * r0}
            x2={x + Math.cos(a) * r1}
            y2={y + Math.sin(a) * r1}
            stroke={i % 2 ? palette.blueBright : palette.orange}
            strokeWidth={height * 0.01}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};

/** Zoom into the screen with speed lines; the next shot settles out of the blur. */
export const speedWhip: TransitionImpl = {
  exitStyle: (p, ctx) => {
    const [x, y] = anchorPx(ctx);
    return { transform: `scale(${1 + easeInOut(p) * 2.2})`, transformOrigin: `${x}px ${y}px`, filter: `blur(${p * 14}px)` };
  },
  enterStyle: (p) => ({ transform: `scale(${1.25 - expoOut(p) * 0.25})`, filter: `blur(${(1 - p) * 12}px)` }),
  ExitOverlay: ({ p, ctx }) => <Lines p={p} ctx={ctx} strength={p} />,
  EnterOverlay: ({ p, ctx }) => <Lines p={p} ctx={ctx} strength={1 - p} />,
};
