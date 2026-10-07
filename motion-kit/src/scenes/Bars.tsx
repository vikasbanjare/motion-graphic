import React from "react";
import { useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { countUp, ease, prog, rise } from "../engine/motion.ts";
import { Stage } from "../engine/stage.tsx";
import { FitText } from "../engine/text.tsx";

/** Horizontal bar chart. Works in every aspect ratio and keeps labels readable on phones. */
export const Bars: React.FC<{ scene: SceneOf<"bars"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, m, c, theme, scene: plan, landscape } = useEnv();
  const b = plan.beats as BeatsFor<"bars">;
  const f = theme.fonts;
  const max = Math.max(...scene.bars.map((x) => x.value)) || 1;
  const hi = scene.highlight ?? scene.bars.findIndex((x) => x.value === max);
  const n = scene.bars.length;

  const titleH = scene.title ? box.height * 0.22 : 0;
  const rowH = Math.min(150 * u, (box.height - titleH - 60 * u) / n);
  const barH = rowH * 0.42;
  const labelSize = Math.min(40 * u, rowH * 0.3);
  const valueW = 210 * u;

  return (
    <Stage gap={44}>
      {scene.title ? (
        <FitText text={scene.title} start={b.title} maxWidth={box.width} maxHeight={titleH} maxSize={(landscape ? 110 : 120) * u} />
      ) : null}
      <div style={{ width: box.width, display: "flex", flexDirection: "column" }}>
        {scene.bars.map((bar, i) => {
          const p = prog(frame, b.bars[i], b.grow, ease.out);
          const isHi = i === hi;
          const value = countUp(String(bar.value), p);
          return (
            <div key={i} style={{ ...rise(frame, b.bars[i], m, u, 0.4), height: rowH, display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 * u }}>
              <div
                style={{
                  fontFamily: f.body,
                  fontWeight: isHi ? f.bodyStrongWeight : f.bodyWeight,
                  fontSize: labelSize,
                  color: isHi ? c.text : c.muted,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {bar.label}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 20 * u }}>
                <div style={{ flex: 1, height: barH, borderRadius: barH / 2, background: c.line + "66", overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${((bar.value / max) * p * 100).toFixed(2)}%`,
                      height: "100%",
                      borderRadius: barH / 2,
                      background: isHi ? c.accent : c.muted + "88",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: valueW,
                    textAlign: "right",
                    fontFamily: f.display,
                    fontWeight: f.displayWeight,
                    fontSize: barH * 1.25,
                    lineHeight: 1,
                    color: isHi ? c.accent : c.text,
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                  }}
                >
                  {value}
                  {scene.unit ?? ""}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};
