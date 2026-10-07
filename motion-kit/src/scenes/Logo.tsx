import React from "react";
import { Img, useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { resolveMedia } from "../engine/media.ts";
import { ease, focus, prog, rise } from "../engine/motion.ts";
import { Stage } from "../engine/stage.tsx";
import { FitText } from "../engine/text.tsx";

/** Brand sign-off: logo, name, a line that draws, tagline. */
export const Logo: React.FC<{ scene: SceneOf<"logo"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, m, c, theme, scene: plan, plan: video, landscape } = useEnv();
  const b = plan.beats as BeatsFor<"logo">;
  const line = prog(frame, b.name + 8, 20, ease.inOut);
  const src = scene.src ?? video.spec.brand.logo;

  return (
    <Stage gap={34}>
      {src ? (
        <div style={focus(frame, b.logo, m, u)}>
          <Img src={resolveMedia(src)} style={{ height: 220 * u, maxWidth: box.width * 0.7, objectFit: "contain" }} />
        </div>
      ) : null}
      <FitText
        text={scene.name}
        start={b.name}
        maxWidth={box.width}
        maxHeight={box.height * 0.3}
        maxSize={(landscape ? 190 : 210) * u}
      />
      <div style={{ width: 260 * u * line, height: 6 * u, borderRadius: 99, background: c.accent }} />
      {scene.tagline ? (
        <div
          style={{
            ...rise(frame, b.tagline, m, u, 0.4),
            fontFamily: theme.fonts.body,
            fontWeight: theme.fonts.bodyWeight,
            fontSize: 40 * u,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: c.muted,
            textAlign: "center",
            maxWidth: box.width,
          }}
        >
          {scene.tagline}
        </div>
      ) : null}
    </Stage>
  );
};
