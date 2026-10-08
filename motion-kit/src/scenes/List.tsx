import React, { useMemo } from "react";
import { interpolateColors, useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { fitText } from "../engine/fit.ts";
import { pop, prog, rise } from "../engine/motion.ts";
import { plainText, richWords } from "../engine/rich.ts";
import { Kicker, Stage } from "../engine/stage.tsx";
import { contrast } from "../engine/themes.ts";
import { FitText, useFitLayout } from "../engine/text.tsx";

/** Numbered steps, bullets, checks or crosses — each row a card, revealed at reading pace. */
export const List: React.FC<{ scene: SceneOf<"list"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, m, c, theme, scene: plan, landscape, floor } = useEnv();
  const b = plan.beats as BeatsFor<"list">;
  const style = scene.style ?? "numbers";
  const f = theme.fonts;
  const n = scene.items.length;

  const stageGap = 36;
  // Wide frames are short: longer lists run in two columns so rows keep readable type.
  const cols = landscape && n >= 4 ? 2 : 1;
  const perCol = Math.ceil(n / cols);
  const gap = 22 * u;
  const colW = (box.width - gap * (cols - 1)) / cols;
  const pad = 30 * u;
  const border = 2 * u;
  const glyphScale = style === "numbers" ? 0.56 : 0.5;
  // Smallest row: a marker whose number still reads comfortably, plus padding and border.
  const markerMin = floor.comfortable / glyphScale;
  const rowMin = markerMin + pad * 1.4 + border * 2;
  // The title gives way before the rows do; a short title also hands its unused room to them.
  const titleRoom = box.height - stageGap * u - rowMin * perCol - gap * (perCol - 1);
  const titleFit = {
    maxWidth: box.width,
    maxHeight: scene.title ? Math.max(0, Math.min(box.height * (landscape ? 0.22 : 0.26), titleRoom)) : 0,
    maxSize: (landscape ? 120 : 130) * u,
  };
  const titleH = useFitLayout(scene.title, titleFit)?.height ?? 0;
  const rowMax = Math.min(150 * u, (box.height - titleH - stageGap * u - gap * (perCol - 1)) / perCol);
  // Room for text inside a row once its padding and border are taken off.
  const textMax = rowMax - pad * 1.4 - border * 2;
  // The marker fills the row height, but never so small that its number is hard to read.
  const marker = Math.max(Math.min(96 * u, textMax), markerMin);
  const textW = colW - marker - pad * 3 - border * 2;

  // One shared size for all rows: lists look broken when every line has its own size.
  // A row too long even at the smallest size is flagged on its own instead of shrinking the rest.
  const size = useMemo(() => {
    const fits = scene.items.map((t) =>
      fitText({
        words: richWords(t),
        fontFamily: f.body,
        fontWeight: f.bodyStrongWeight,
        maxWidth: textW,
        maxHeight: textMax,
        maxSize: (landscape ? 52 : 54) * u,
        minSize: floor.min,
        lineHeight: 1.18,
        maxLines: 2,
      }),
    );
    const ok = fits.filter((x) => !x.overflow);
    return Math.min(...(ok.length ? ok : fits).map((x) => x.fontSize));
  }, [scene.items, f, textW, textMax, u, landscape, floor]);

  const markerColor = (i: number) =>
    style === "crosses" ? "#FF3B30" : style === "checks" ? c.accent2 : i === n - 1 && style === "numbers" ? c.accent2 : c.accent;
  // accent2 is not paired with onAccent, so pick whichever ink reads best on each marker.
  const markerInk = (i: number) => [c.onAccent, c.text, c.bg].reduce((a, b) => (contrast(markerColor(i), b) > contrast(markerColor(i), a) ? b : a));
  const glyph = (i: number) =>
    style === "numbers" ? String(i + 1) : style === "checks" ? "✓" : style === "crosses" ? "✕" : "•";

  if (style === "lines") return <Lines scene={scene} />;

  return (
    <Stage gap={stageGap}>
      {scene.title ? (
        <FitText label="title" text={scene.title} start={b.title} {...titleFit} />
      ) : null}
      <div style={{ display: "flex", gap, width: box.width }}>
        {Array.from({ length: cols }, (_, col) => (
          <div key={col} style={{ display: "flex", flexDirection: "column", gap, width: colW }}>
            {scene.items.slice(col * perCol, (col + 1) * perCol).map((item, k) => {
              const i = col * perCol + k;
              return (
                <div
                  key={i}
                  data-mk="card"
                  data-mk-label={`item ${i + 1} card`}
                  data-mk-bg={c.surface}
                  style={{
                    ...rise(frame, b.items[i], m, u, 0.9),
                    display: "flex",
                    alignItems: "center",
                    gap: pad,
                    padding: `${pad * 0.7}px ${pad}px`,
                    minHeight: Math.min(rowMax, marker + pad * 1.4 + border * 2),
                    borderRadius: theme.radius * u,
                    background: c.surface,
                    border: `${border}px solid ${c.line}`,
                  }}
                >
                  <div
                    data-mk="text"
                    data-mk-label={`item ${i + 1} marker`}
                    data-mk-bg={markerColor(i)}
                    style={{
                      ...pop(frame, b.items[i] + 2, m, 0.3),
                      flexShrink: 0,
                      width: marker,
                      height: marker,
                      borderRadius: theme.radius > 8 ? 999 : theme.radius * u,
                      background: markerColor(i),
                      color: style === "crosses" ? "#FFFFFF" : markerInk(i),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: style === "numbers" ? f.display : f.body,
                      fontWeight: style === "numbers" ? f.displayWeight : 800,
                      fontSize: marker * glyphScale,
                      lineHeight: 1,
                    }}
                  >
                    {glyph(i)}
                  </div>
                  <FitText
                    label={`item ${i + 1}`}
                    text={item}
                    start={b.items[i] + 3}
                    font="body"
                    weight={f.bodyStrongWeight}
                    align="left"
                    animate="none"
                    maxWidth={textW}
                    maxHeight={textMax}
                    maxSize={size}
                    minSize={size}
                    lineHeight={1.18}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Stage>
  );
};

/**
 * Kinetic feature list: one big line per beat. Each new line arrives in the
 * accent of attention; earlier lines step back to muted so the eye always
 * knows where "now" is.
 */
const Lines: React.FC<{ scene: SceneOf<"list"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, c, theme, scene: plan, landscape } = useEnv();
  const b = plan.beats as BeatsFor<"list">;
  const f = theme.fonts;
  const n = scene.items.length;
  const titleH = scene.title ? box.height * 0.12 : 0;
  const lineH = (box.height - titleH - 40 * u) / n;

  const size = useMemo(
    () =>
      Math.min(
        ...scene.items.map(
          (t) =>
            fitText({
              words: richWords(t),
              fontFamily: f.display,
              fontWeight: f.displayWeight,
              tracking: f.displayTracking,
              upper: f.displayUpper,
              maxWidth: box.width,
              maxHeight: Math.min(lineH, 260 * u),
              maxSize: (landscape ? 110 : 112) * u,
              minSize: 44 * u,
              lineHeight: f.displayLineHeight,
              maxLines: 2,
            }).fontSize,
        ),
      ),
    [scene.items, f, box.width, lineH, u, landscape],
  );

  return (
    <Stage gap={28} align="center">
      {scene.title ? (
        <div style={{ width: box.width, display: "flex", justifyContent: landscape ? "flex-start" : "center" }}>
          <Kicker text={plainText(scene.title)} start={b.title} pill={false} color={c.muted} label="title" />
        </div>
      ) : null}
      <div style={{ display: "flex", flexDirection: "column", gap: size * 0.28, width: box.width }}>
        {scene.items.map((item, i) => {
          const next = b.items[i + 1];
          const dim = next === undefined ? 0 : prog(frame, next, 10);
          return (
            <FitText
              key={i}
              label={`item ${i + 1}`}
              text={item}
              start={b.items[i]}
              align={landscape ? "left" : "center"}
              // Muted alone keeps 4.5:1 on every theme; extra fading would make it unreadable.
              color={interpolateColors(dim, [0, 1], [c.text, c.muted])}
              maxWidth={box.width}
              maxHeight={lineH}
              maxSize={size}
              minSize={size}
            />
          );
        })}
      </div>
    </Stage>
  );
};
