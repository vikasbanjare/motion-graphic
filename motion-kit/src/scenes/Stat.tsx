import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { fitText } from "../engine/fit.ts";
import { countUp, ease, pop, prog } from "../engine/motion.ts";
import { Kicker, Stage } from "../engine/stage.tsx";
import { FitText } from "../engine/text.tsx";

/** One big number that counts up, with a meter that fills alongside it. */
export const Stat: React.FC<{ scene: SceneOf<"stat"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, m, c, theme, scene: plan, landscape } = useEnv();
  const b = plan.beats as BeatsFor<"stat">;
  const f = theme.fonts;

  const p = prog(frame, b.count, b.countEnd - b.count, ease.out);
  // Size the number for its final text so it never grows while counting.
  const size = useMemo(
    () =>
      fitText({
        words: [{ text: scene.value }],
        fontFamily: f.display,
        fontWeight: f.displayWeight,
        tracking: f.displayTracking,
        upper: f.displayUpper,
        maxWidth: box.width * 0.9,
        maxHeight: box.height * 0.4,
        maxSize: (landscape ? 300 : 360) * u,
        maxLines: 1,
        lineHeight: 1,
        tabular: true,
      }).fontSize,
    [scene.value, f, box, u, landscape],
  );

  const pct = scene.value.trim().endsWith("%") ? Math.min(100, parseFloat(scene.value.replace(/[^\d.]/g, ""))) / 100 : 1;
  const meterW = Math.min(box.width, 720 * u);
  const landed = prog(frame, b.countEnd - 2, 10);

  return (
    <Stage gap={36}>
      {scene.kicker ? <Kicker text={scene.kicker} start={b.kicker} /> : null}
      <div
        data-mk="text"
        data-mk-label="value"
        style={{
          ...pop(frame, b.count, m, 0.7),
          fontFamily: f.display,
          fontWeight: f.displayWeight,
          letterSpacing: `${f.displayTracking}em`,
          textTransform: f.displayUpper ? "uppercase" : "none",
          fontSize: size,
          lineHeight: 1,
          color: c.accent,
          fontVariantNumeric: "tabular-nums",
          whiteSpace: "nowrap",
          textShadow: `0 0 ${(40 * landed * u).toFixed(1)}px ${c.accent}55`,
        }}
      >
        {countUp(scene.value, p)}
      </div>
      <div
        style={{
          width: meterW,
          height: 14 * u,
          borderRadius: 99,
          background: c.line,
          overflow: "hidden",
          opacity: prog(frame, b.count, 8),
        }}
      >
        <div style={{ width: `${(p * pct * 100).toFixed(2)}%`, height: "100%", borderRadius: 99, background: c.accent }} />
      </div>
      <FitText
        label="label"
        text={scene.label}
        start={b.label}
        font="body"
        weight={f.bodyStrongWeight}
        maxWidth={box.width}
        maxHeight={box.height * 0.22}
        maxSize={64 * u}
        minSize={34 * u}
      />
    </Stage>
  );
};
