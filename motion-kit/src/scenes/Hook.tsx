import React from "react";
import { interpolateColors, useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { ease, pop, prog } from "../engine/motion.ts";
import { Stage } from "../engine/stage.tsx";
import { FitText } from "../engine/text.tsx";

const STRIKE_RED = "#FF3B30";

/** Scroll-stopper: optional setup line, a big number that gets struck out, then the punchline. */
export const Hook: React.FC<{ scene: SceneOf<"hook"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, m, c, scene: plan, landscape } = useEnv();
  const b = plan.beats as BeatsFor<"hook">;

  const strikeP = prog(frame, b.strikeLine, 9, ease.out);
  const shake = frame >= b.strikeLine && frame < b.strikeLine + 10 ? Math.sin((frame - b.strikeLine) * 2.6) * 10 * u * (1 - (frame - b.strikeLine) / 10) : 0;
  const dim = prog(frame, b.strikeLine + 6, 12);

  return (
    <Stage gap={36}>
      {scene.setup ? (
        <FitText
          label="setup"
          text={scene.setup}
          start={b.setup}
          font="body"
          weight={700}
          color={c.muted}
          maxWidth={box.width}
          maxHeight={box.height * 0.14}
          maxSize={60 * u}
          animate="words"
        />
      ) : null}
      {scene.strike ? (
        <div style={{ transform: `translate3d(${shake.toFixed(2)}px, 0, 0)` }}>
        <div style={{ position: "relative", ...pop(frame, b.strike, m, 0.5) }}>
          <FitText
            label="strike"
            text={scene.strike}
            start={b.strike}
            // Struck out = steps back to muted, which stays readable (the joke needs the number).
            color={interpolateColors(dim, [0, 1], [c.accent, c.muted])}
            animate="none"
            shrinkWrap
            maxWidth={box.width}
            maxHeight={box.height * 0.26}
            maxSize={(landscape ? 220 : 250) * u}
          />
          <div
            style={{
              position: "absolute",
              left: "-4%",
              width: `${(108 * strikeP).toFixed(2)}%`,
              top: "50%",
              height: 22 * u,
              marginTop: -11 * u,
              borderRadius: 11 * u,
              background: STRIKE_RED,
              transform: "rotate(-7deg)",
              transformOrigin: "0% 50%",
              boxShadow: `0 ${6 * u}px ${24 * u}px ${STRIKE_RED}66`,
            }}
          />
        </div>
        </div>
      ) : null}
      <FitText
        label="punch"
        text={scene.punch}
        start={b.punch[0]}
        starts={b.punch}
        stagger={m.wordStagger + 1}
        maxWidth={box.width}
        maxHeight={box.height * (scene.strike ? 0.32 : 0.62)}
        maxSize={(landscape ? 180 : 210) * u}
        style={{ marginTop: scene.strike ? 30 * u : 0 }}
      />
    </Stage>
  );
};
