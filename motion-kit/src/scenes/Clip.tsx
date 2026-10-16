import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { FPS } from "../engine/formats.ts";
import { resolveMedia } from "../engine/media.ts";
import { ease, prog } from "../engine/motion.ts";
import { Kicker, Stage } from "../engine/stage.tsx";
import { FitText } from "../engine/text.tsx";

/**
 * Full-frame footage (your own, stock, or AI-generated b-roll) with the words
 * overlaid by the engine, so text stays sharp, on-brand and editable.
 */
export const Clip: React.FC<{ scene: SceneOf<"clip"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, c, theme, scene: plan, m, format, floor } = useEnv();
  const b = plan.beats as BeatsFor<"clip">;
  const area = scene.area ?? "bottom";
  const scrim = scene.scrim ?? 0.6;
  const push = interpolate(frame, [0, plan.duration], [1.0, 1.06], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.inOut });
  const reveal = prog(frame, 0, m.enter, ease.emphasized);
  const hex = Math.round(scrim * 255).toString(16).padStart(2, "0");
  const scrimBg =
    area === "top"
      ? `linear-gradient(0deg, ${c.bg}00 40%, ${c.bg}${hex} 80%)`
      : area === "center"
        ? `radial-gradient(ellipse 80% 45% at 50% 50%, ${c.bg}${hex} 0%, ${c.bg}00 100%)`
        : `linear-gradient(180deg, ${c.bg}00 40%, ${c.bg}${hex} 78%)`;

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ overflow: "hidden", opacity: reveal }}>
        <AbsoluteFill style={{ transform: `scale(${push.toFixed(4)})` }}>
          <Video
            src={resolveMedia(scene.src)}
            muted
            trimBefore={Math.round((scene.trim ?? 0) * FPS)}
            objectFit="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </AbsoluteFill>
        {scene.caption || scene.kicker ? <AbsoluteFill style={{ background: scrimBg }} /> : null}
      </AbsoluteFill>
      {scene.caption || scene.kicker ? (
        <Stage align={area === "top" ? "start" : area === "center" ? "center" : "end"} gap={26} still>
          {scene.kicker ? <Kicker text={scene.kicker} start={b.kicker} /> : null}
          {scene.caption ? (
            <FitText label="caption" text={scene.caption} start={b.caption} maxWidth={box.width} maxHeight={box.height * 0.36} maxSize={130 * u} />
          ) : null}
        </Stage>
      ) : null}
      {scene.generated ? (
        <div
          data-mk="text"
          data-mk-label="AI-generated tag"
          data-mk-bg="#000000B3"
          style={{
            // Inside the safe zone (platform buttons cover the corners), opposite the caption.
            position: "absolute",
            right: format.width - box.left - box.width,
            ...(area === "top" ? { bottom: format.height - box.top - box.height } : { top: box.top }),
            padding: `${6 * u}px ${14 * u}px`,
            borderRadius: 10 * u,
            background: "#000000B3",
            color: "#FFFFFF",
            fontFamily: theme.fonts.body,
            fontWeight: 600,
            fontSize: floor.comfortable,
            letterSpacing: "0.04em",
          }}
        >
          AI-generated
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
