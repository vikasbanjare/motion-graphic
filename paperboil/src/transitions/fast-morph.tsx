import { Morph } from "../motion/Morph";
import { ellipsePath, pinPath, rectPath } from "../motion/shapes";
import { palette } from "../palette";
import { anchorPx, type TransitionCtx, type TransitionImpl } from "./types";

/**
 * Reference: laptop lid → Gmail M → map pin, each in 3–5 frames. The outgoing
 * shot pushes toward the object; a painted silhouette morphs at peak speed and
 * hands over to the next shot's matching object.
 */
const PAIRS: Record<string, { from: string; to: string; fillFrom: string; fillTo: string }> = {
  "tv-to-pill": { from: rectPath(220, 200, 560, 340, 26), to: rectPath(140, 430, 720, 140, 70), fillFrom: palette.blueBright, fillTo: palette.blueBright },
  "magnifier-to-pin": { from: ellipsePath(205, 495, 60, 60), to: pinPath(610, 205, 60), fillFrom: palette.pale, fillTo: palette.orange },
};

const Overlay: React.FC<{ p: number; ctx: TransitionCtx; phase: "exit" | "enter" }> = ({ p, ctx, phase }) => {
  const pair = PAIRS[(ctx.params.shape as string) ?? "tv-to-pill"];
  const box = ctx.layout.artBox(phase === "exit" ? ctx.from.layout : ctx.to.layout);
  const t = phase === "exit" ? p * 0.5 : 0.5 + p * 0.5;
  return (
    <div style={{ position: "absolute", left: box.x, top: box.y, width: 1000, height: 1000, transform: `scale(${box.size / 1000})`, transformOrigin: "0 0", opacity: phase === "enter" ? 1 - p : 1 }}>
      <Morph from={pair.from} to={pair.to} p={t} fillFrom={pair.fillFrom} fillTo={pair.fillTo} />
    </div>
  );
};

export const fastMorph: TransitionImpl = {
  exitStyle: (p, ctx) => {
    const [x, y] = anchorPx(ctx);
    return { transform: `scale(${1 + p * 0.25})`, transformOrigin: `${x}px ${y}px`, opacity: 1 - p * 0.6 };
  },
  ExitOverlay: (props) => <Overlay {...props} phase="exit" />,
  EnterOverlay: (props) => <Overlay {...props} phase="enter" />,
  enterStyle: (p) => ({ opacity: 0.4 + p * 0.6 }),
};
