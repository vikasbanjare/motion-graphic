import React from "react";
import { Img, useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { resolveMedia } from "../engine/media.ts";
import { ease, focus, prog, rise } from "../engine/motion.ts";
import { Stage } from "../engine/stage.tsx";
import { FitText } from "../engine/text.tsx";

/** Brand sign-off: logo, name, a line that draws, tagline. `scene.src` already falls back to brand.logo (resolveSpec). */
export const Logo: React.FC<{ scene: SceneOf<"logo"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, m, c, theme, scene: plan, landscape, floor } = useEnv();
  const b = plan.beats as BeatsFor<"logo">;
  const line = prog(frame, b.name + 8, 20, ease.inOut);

  return (
    <Stage gap={34}>
      {scene.src ? (
        <div data-mk="card" data-mk-label="logo image" style={focus(frame, b.logo, m, u)}>
          <Img src={resolveMedia(scene.src)} style={{ height: 220 * u, maxWidth: box.width * 0.7, objectFit: "contain" }} />
        </div>
      ) : null}
      <FitText
        label="name"
        text={scene.name}
        start={b.name}
        maxWidth={box.width}
        maxHeight={box.height * 0.3}
        maxSize={(landscape ? 190 : 210) * u}
      />
      <div style={{ width: 260 * u * line, height: 6 * u, borderRadius: 99, background: c.accent }} />
      {scene.tagline ? (
        <div
          data-mk="text"
          data-mk-label="tagline"
          style={{
            ...rise(frame, b.tagline, m, u, 0.4),
            fontFamily: theme.fonts.body,
            fontWeight: theme.fonts.bodyWeight,
            fontSize: Math.max(40 * u, floor.comfortable),
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
