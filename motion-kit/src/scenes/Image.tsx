import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { resolveMedia } from "../engine/media.ts";
import { ease, prog, rise } from "../engine/motion.ts";
import { Kicker, Stage } from "../engine/stage.tsx";
import { FitText } from "../engine/text.tsx";

/** Photo / product / screenshot with a slow camera move and a legible caption. */
export const ImageScene: React.FC<{ scene: SceneOf<"image"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, c, theme, scene: plan, m } = useEnv();
  const b = plan.beats as BeatsFor<"image">;
  const fit = scene.fit ?? "cover";
  const move = scene.move ?? "in";
  const t = interpolate(frame, [0, plan.duration], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.inOut });

  const scale = move === "in" ? 1.04 + 0.1 * t : move === "out" ? 1.14 - 0.1 * t : 1.12;
  const panX = move === "left" ? (0.5 - t) * 6 : move === "right" ? (t - 0.5) * 6 : 0;
  const reveal = prog(frame, b.image, m.enter * 1.4, ease.emphasized);

  if (fit === "cover") {
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{ opacity: reveal, overflow: "hidden" }}>
          <Img
            src={resolveMedia(scene.src)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${scale.toFixed(4)}) translate3d(${panX.toFixed(3)}%, 0, 0)`,
            }}
          />
          {/* Scrim so captions stay readable on any photo. */}
          <AbsoluteFill
            style={{
              background: `linear-gradient(180deg, ${c.bg}00 35%, ${c.bg}D9 78%, ${c.bg} 100%)`,
            }}
          />
        </AbsoluteFill>
        {scene.caption || scene.kicker ? (
          <Stage align="end" gap={28} still>
            {scene.kicker ? <Kicker text={scene.kicker} start={b.kicker} /> : null}
            {scene.caption ? (
              <FitText label="caption" text={scene.caption} start={b.caption} maxWidth={box.width} maxHeight={box.height * 0.36} maxSize={140 * u} />
            ) : null}
          </Stage>
        ) : null}
      </AbsoluteFill>
    );
  }

  const imgH = box.height * (scene.caption ? 0.62 : 0.85);
  return (
    <Stage gap={40}>
      {scene.kicker ? <Kicker text={scene.kicker} start={b.kicker} /> : null}
      <div
        data-mk="card"
        data-mk-label="image"
        style={{
          ...rise(frame, b.image, m, u, 0.6),
          width: box.width,
          height: imgH,
          borderRadius: theme.radius * u,
          overflow: "hidden",
          boxShadow: `0 ${30 * u}px ${80 * u}px #00000040`,
          background: c.surface,
        }}
      >
        <Img
          src={resolveMedia(scene.src)}
          style={{ width: "100%", height: "100%", objectFit: "contain", transform: `scale(${(1 + 0.04 * t).toFixed(4)})` }}
        />
      </div>
      {scene.caption ? (
        <FitText label="caption" text={scene.caption} start={b.caption} maxWidth={box.width} maxHeight={box.height * 0.24} maxSize={110 * u} />
      ) : null}
    </Stage>
  );
};
