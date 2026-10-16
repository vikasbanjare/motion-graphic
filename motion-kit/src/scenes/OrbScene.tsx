import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { ease, prog } from "../engine/motion.ts";
import { useSpeechLevel } from "../engine/speech.ts";
import { Kicker, Stage, kickerHeight } from "../engine/stage.tsx";
import { FitText, useFitLayout } from "../engine/text.tsx";
import { Orb } from "../engine/visuals.tsx";

/** Hero orb that breathes with the narration, with an optional headline. */
export const OrbScene: React.FC<{ scene: SceneOf<"orb"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const env = useEnv();
  const { box, u, theme, scene: plan, landscape } = env;
  const b = plan.beats as BeatsFor<"orb">;
  const level = useSpeechLevel();
  const hasText = Boolean(scene.headline || scene.kicker || scene.sub);
  const gap = 52 * u; // Stage gap
  const headlineFit = { maxWidth: box.width, maxHeight: box.height * 0.28, maxSize: (landscape ? 130 : 128) * u };
  const subFit = { font: "body" as const, maxWidth: box.width * 0.9, maxHeight: box.height * 0.14, maxSize: 50 * u, minSize: 36 * u };
  const headline = useFitLayout(scene.headline, headlineFit);
  const sub = useFitLayout(scene.sub, subFit);
  // The orb takes what the text leaves, so a two-line headline never pushes the sub off the safe zone.
  const text = [scene.kicker ? kickerHeight(env, false) : 0, headline?.height ?? 0, sub?.height ?? 0].filter((h) => h > 0);
  const room = box.height - text.reduce((a, h) => a + h + gap, 0);
  const size = Math.min(box.width * (landscape ? 0.42 : 0.82), box.height * (hasText ? 0.5 : 0.8), room);
  const appear = prog(frame, b.orb, 15, ease.out);
  const grow = interpolate(frame, [b.orb, b.orb + 90], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease.out,
  });

  return (
    <Stage gap={52}>
      <div style={{ opacity: appear, transform: `scale(${grow.toFixed(4)})` }}>
        <Orb size={size} colors={scene.colors ?? theme.orb} frame={frame} level={level} />
      </div>
      {scene.kicker ? <Kicker text={scene.kicker} start={b.kicker} pill={false} /> : null}
      {scene.headline ? (
        <FitText label="headline" text={scene.headline} start={b.words[0] ?? b.kicker} starts={b.words} {...headlineFit} />
      ) : null}
      {scene.sub ? (
        <FitText label="sub" text={scene.sub} start={b.sub} {...subFit} color={theme.colors.muted} />
      ) : null}
    </Stage>
  );
};
