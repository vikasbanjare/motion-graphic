import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { fitText } from "../engine/fit.ts";
import { countUp, ease, prog, rise } from "../engine/motion.ts";
import { richWords } from "../engine/rich.ts";
import { Stage } from "../engine/stage.tsx";
import { FitText, useFitLayout } from "../engine/text.tsx";

/** Horizontal bar chart. Works in every aspect ratio and keeps labels readable on phones. */
export const Bars: React.FC<{ scene: SceneOf<"bars"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, m, c, theme, scene: plan, landscape, floor } = useEnv();
  const b = plan.beats as BeatsFor<"bars">;
  const f = theme.fonts;
  const max = Math.max(...scene.bars.map((x) => x.value)) || 1;
  const hi = scene.highlight ?? scene.bars.findIndex((x) => x.value === max);
  const n = scene.bars.length;

  const titleFit = { maxWidth: box.width, maxHeight: scene.title ? box.height * 0.22 : 0, maxSize: (landscape ? 110 : 120) * u };
  // Rows get the room a short title does not use.
  const titleH = useFitLayout(scene.title, titleFit)?.height ?? 0;
  const rowH = Math.min(150 * u, (box.height - titleH - 60 * u) / n);
  // Wide frames are short: label, bar and value share one line so labels can stay big.
  const inline = landscape;
  const rowGap = inline ? 28 * u : 10 * u;
  const labelMax = Math.max(40 * u, floor.comfortable);
  // Stacked rows keep a full line for the label; the bar and its value share what is left.
  const barLine = inline ? rowH : Math.max(floor.comfortable, rowH - rowGap - labelMax * 1.2);
  const barH = Math.min(rowH * 0.42, barLine * 0.8);
  const valueSize = Math.max(Math.min(barH * 1.25, barLine), floor.comfortable);
  const unit = scene.unit ?? "";

  // Sized for the final numbers so the column never jumps while counting up.
  const valueW = useMemo(
    () =>
      Math.max(
        ...scene.bars.map(
          (bar) =>
            fitText({
              words: [{ text: `${bar.value}${unit}` }],
              fontFamily: f.display,
              fontWeight: f.displayWeight,
              maxWidth: 1e4,
              maxHeight: 1e4,
              maxSize: valueSize,
              minSize: valueSize,
              lineHeight: 1,
              maxLines: 1,
              tabular: true,
            }).width,
        ),
      ) + 8 * u,
    [scene.bars, unit, f, valueSize, u],
  );
  const labelW = inline ? Math.min(box.width * 0.3, 520 * u) : box.width;

  // One label size for every row, shrunk to fit the longest label on one line. A label
  // too long even at the smallest size is flagged on its own instead of shrinking the rest.
  const label = useMemo(() => {
    const fits = scene.bars.map((bar) =>
      fitText({
        words: richWords(bar.label),
        fontFamily: f.body,
        fontWeight: f.bodyStrongWeight,
        maxWidth: labelW,
        maxHeight: inline ? rowH * 0.8 : rowH - valueSize - rowGap,
        maxSize: labelMax,
        minSize: floor.min,
        lineHeight: 1.2,
        maxLines: 1,
      }),
    );
    const ok = fits.filter((x) => !x.overflow);
    return { size: Math.min(...(ok.length ? ok : fits).map((x) => x.fontSize)), overflow: fits.map((x) => x.overflow) };
  }, [scene.bars, f, labelW, inline, rowH, valueSize, rowGap, labelMax, floor]);

  return (
    <Stage gap={44}>
      {scene.title ? (
        <FitText label="title" text={scene.title} start={b.title} {...titleFit} />
      ) : null}
      <div style={{ width: box.width, display: "flex", flexDirection: "column" }}>
        {scene.bars.map((bar, i) => {
          const p = prog(frame, b.bars[i], b.grow, ease.out);
          const isHi = i === hi;
          const value = countUp(String(bar.value), p);
          return (
            <div
              key={i}
              style={{
                ...rise(frame, b.bars[i], m, u, 0.4),
                height: rowH,
                display: "flex",
                flexDirection: inline ? "row" : "column",
                justifyContent: "center",
                alignItems: inline ? "center" : "stretch",
                gap: rowGap,
              }}
            >
              <div
                data-mk="text"
                data-mk-label={`bar ${i + 1} label`}
                data-mk-overflow={label.overflow[i] ? "1" : undefined}
                style={{
                  flexShrink: 0,
                  width: inline ? labelW : undefined,
                  fontFamily: f.body,
                  fontWeight: isHi ? f.bodyStrongWeight : f.bodyWeight,
                  fontSize: label.size,
                  lineHeight: 1.2,
                  color: isHi ? c.text : c.muted,
                  whiteSpace: "nowrap",
                }}
              >
                {bar.label}
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 20 * u }}>
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
                  data-mk="text"
                  data-mk-label={`bar ${i + 1} value`}
                  style={{
                    width: valueW,
                    textAlign: "right",
                    fontFamily: f.display,
                    fontWeight: f.displayWeight,
                    fontSize: valueSize,
                    lineHeight: 1,
                    color: isHi ? c.accent : c.text,
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                  }}
                >
                  {value}
                  {unit}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};
