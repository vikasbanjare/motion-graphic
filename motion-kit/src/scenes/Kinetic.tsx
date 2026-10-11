import React from "react";
import { Sequence, interpolate, useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { ease } from "../engine/motion.ts";
import { Stage } from "../engine/stage.tsx";
import { FitText } from "../engine/text.tsx";

/** Rapid-fire phrases, one per beat, each filling the frame. Classic kinetic typography. */
export const Kinetic: React.FC<{ scene: SceneOf<"kinetic"> }> = ({ scene }) => {
  const { scene: plan } = useEnv();
  const b = plan.beats as BeatsFor<"kinetic">;
  return (
    <>
      {b.lines.map((l, i) => {
        const last = i === b.lines.length - 1;
        return (
          <Sequence key={i} from={l.start} durationInFrames={last ? undefined : Math.max(1, l.end - l.start)} layout="none">
            <Line text={scene.lines[i]} label={`line ${i + 1}`} len={l.end - l.start} last={last} />
          </Sequence>
        );
      })}
    </>
  );
};

const Line: React.FC<{ text: string; label: string; len: number; last: boolean }> = ({ text, label, len, last }) => {
  const frame = useCurrentFrame();
  const { box, u, m, landscape } = useEnv();
  const gentle = m.wordStyle === "blur" || m.wordStyle === "rise";
  // Each phrase settles in; non-final ones leave completely before the next
  // arrives (exit ~half the entrance, accelerating), so lines never overlap.
  const settle = interpolate(frame, [0, m.enter], [gentle ? 1.04 : 1.12, 1], { extrapolateRight: "clamp", easing: ease.out });
  const exitLen = Math.min(6, Math.max(3, Math.round(len * 0.25)));
  const e = last ? 0 : interpolate(frame, [len - exitLen, len], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.in });
  const scale = settle * (gentle ? 1 - 0.03 * e : 1 + 0.22 * e);
  const blur = gentle ? e * 14 * u : e * 6 * u;
  return (
    <Stage still>
      <div style={{ transform: `scale(${scale.toFixed(4)})`, opacity: 1 - e, filter: blur > 0.3 ? `blur(${blur.toFixed(2)}px)` : undefined }}>
        <FitText
          label={label}
          text={text}
          start={0}
          stagger={Math.max(1, m.wordStagger - 1)}
          maxWidth={box.width}
          maxHeight={box.height * 0.6}
          maxSize={(landscape ? 230 : 260) * u}
        />
      </div>
    </Stage>
  );
};
