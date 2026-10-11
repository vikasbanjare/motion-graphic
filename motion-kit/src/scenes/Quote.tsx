import React from "react";
import { useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { pop, rise } from "../engine/motion.ts";
import { Stage } from "../engine/stage.tsx";
import { FitText } from "../engine/text.tsx";

/** Testimonial / review with optional star rating. */
export const Quote: React.FC<{ scene: SceneOf<"quote"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, m, c, theme, scene: plan, landscape, floor } = useEnv();
  const b = plan.beats as BeatsFor<"quote">;
  const f = theme.fonts;
  // Condensed all-caps poster faces shout; quotes read better in the body face for those themes.
  const font = f.displayUpper ? "body" : "display";

  return (
    <Stage gap={34}>
      <div
        style={{
          ...pop(frame, b.mark, m, 0.4),
          fontFamily: '"Instrument Serif", serif',
          fontSize: 260 * u,
          lineHeight: 0.6,
          height: 120 * u,
          color: c.accent,
        }}
      >
        “
      </div>
      <FitText
        label="quote"
        text={scene.quote}
        start={b.quote}
        font={font}
        weight={font === "body" ? f.bodyStrongWeight : undefined}
        upper={false}
        animate="lines"
        maxWidth={box.width}
        maxHeight={box.height * 0.5}
        maxSize={(font === "body" ? 66 : landscape ? 104 : 112) * u}
        minSize={34 * u}
        lineHeight={font === "body" ? 1.25 : 1.08}
      />
      <div style={{ ...rise(frame, b.author, m, u, 0.5), display: "flex", flexDirection: "column", alignItems: "center", gap: 8 * u }}>
        {b.stars.length ? (
          <div style={{ display: "flex", gap: 10 * u, marginBottom: 12 * u }}>
            {b.stars.map((at, i) => (
              <span key={i} style={{ ...pop(frame, at, m, 0.2), color: c.accent, fontSize: 52 * u, lineHeight: 1, fontFamily: f.body }}>
                ★
              </span>
            ))}
          </div>
        ) : null}
        <div data-mk="text" data-mk-label="author" style={{ fontFamily: f.body, fontWeight: f.bodyStrongWeight, fontSize: Math.max(44 * u, floor.comfortable * 1.15), color: c.text }}>
          — {scene.author}
        </div>
        {scene.role ? (
          <div data-mk="text" data-mk-label="role" style={{ fontFamily: f.body, fontWeight: f.bodyWeight, fontSize: Math.max(34 * u, floor.comfortable), color: c.muted }}>
            {scene.role}
          </div>
        ) : null}
      </div>
    </Stage>
  );
};
