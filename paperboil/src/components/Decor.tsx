import { useCurrentFrame } from "remotion";
import { palette } from "../palette";
import { Sprite } from "../paint/Sprite";
import { SPARKLE, sparkle } from "../paint/sprites";
import { popIn } from "../timing";

/** Soft painted contact shadow under a floating object (art-box px). */
export const Shadow: React.FC<{ x: number; y: number; w: number; h?: number; opacity?: number }> = ({ x, y, w, h = w * 0.16, opacity = 0.28 }) => (
  <div
    style={{
      position: "absolute",
      left: x - w / 2,
      top: y - h / 2,
      width: w,
      height: h,
      borderRadius: "50%",
      background: `radial-gradient(closest-side, ${palette.ink}, transparent)`,
      opacity,
      filter: "blur(4px)",
    }}
  />
);

/** ✦ glints on hero objects (reference trait): pop in at `from`, then twinkle. */
export const Sparkles: React.FC<{ points: Array<[number, number, number?]>; from?: number; size?: number }> = ({ points, from = 0, size = 0.55 }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {points.map(([x, y, delay = 0], i) => {
        const f = frame - from - delay;
        if (f < 0) return null;
        const twinkle = 0.75 + 0.25 * Math.sin((f + i * 7) / 4);
        const s = size * popIn(f, 1.4, 8) * twinkle;
        return (
          <div key={i} style={{ position: "absolute", left: x - SPARKLE / 2, top: y - SPARKLE / 2, width: SPARKLE, height: SPARKLE, transform: `scale(${s}) rotate(${f * 2}deg)` }}>
            <Sprite id="s1-sparkle" w={SPARKLE} h={SPARKLE} draw={sparkle} />
          </div>
        );
      })}
    </>
  );
};

/** Gentle float (the reference's bobbing hero objects). */
export const useBob = (amp = 8, period = 40, phase = 0) => {
  const frame = useCurrentFrame();
  return Math.sin(((frame + phase) / period) * Math.PI * 2) * amp;
};
