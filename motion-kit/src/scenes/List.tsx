import React, { useMemo } from "react";
import { interpolateColors, useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { fitText } from "../engine/fit.ts";
import { pop, prog, rise } from "../engine/motion.ts";
import { plainText, richWords } from "../engine/rich.ts";
import { Kicker, Stage } from "../engine/stage.tsx";
import { FitText } from "../engine/text.tsx";

/** Numbered steps, bullets, checks or crosses — each row a card, revealed at reading pace. */
export const List: React.FC<{ scene: SceneOf<"list"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, m, c, theme, scene: plan, landscape } = useEnv();
  const b = plan.beats as BeatsFor<"list">;
  const style = scene.style ?? "numbers";
  const f = theme.fonts;
  const n = scene.items.length;

  const titleH = scene.title ? box.height * 0.26 : 0;
  const gap = 22 * u;
  const rowMax = Math.min(150 * u, (box.height - titleH - 40 * u - gap * (n - 1)) / n);
  const marker = Math.min(96 * u, rowMax * 0.72);
  const pad = 30 * u;
  const textW = box.width - marker - pad * 3;

  // One shared size for all rows: lists look broken when every line has its own size.
  const size = useMemo(() => {
    const sizes = scene.items.map(
      (t) =>
        fitText({
          words: richWords(t),
          fontFamily: f.body,
          fontWeight: f.bodyStrongWeight,
          maxWidth: textW,
          maxHeight: rowMax - pad * 0.8,
          maxSize: (landscape ? 52 : 54) * u,
          minSize: 26 * u,
          lineHeight: 1.18,
          maxLines: 2,
        }).fontSize,
    );
    return Math.min(...sizes);
  }, [scene.items, f, textW, rowMax, pad, u, landscape]);

  const markerColor = (i: number) =>
    style === "crosses" ? "#FF3B30" : style === "checks" ? c.accent2 : i === n - 1 && style === "numbers" ? c.accent2 : c.accent;
  const glyph = (i: number) =>
    style === "numbers" ? String(i + 1) : style === "checks" ? "✓" : style === "crosses" ? "✕" : "•";

  if (style === "lines") return <Lines scene={scene} />;

  return (
    <Stage gap={36}>
      {scene.title ? (
        <FitText
          text={scene.title}
          start={b.title}
          maxWidth={box.width}
          maxHeight={titleH}
          maxSize={(landscape ? 120 : 130) * u}
        />
      ) : null}
      <div style={{ display: "flex", flexDirection: "column", gap, width: box.width }}>
        {scene.items.map((item, i) => (
          <div
            key={i}
            style={{
              ...rise(frame, b.items[i], m, u, 0.9),
              display: "flex",
              alignItems: "center",
              gap: pad,
              padding: `${pad * 0.7}px ${pad}px`,
              minHeight: Math.min(rowMax, marker + pad * 1.4),
              borderRadius: theme.radius * u,
              background: c.surface,
              border: `${2 * u}px solid ${c.line}`,
            }}
          >
            <div
              style={{
                ...pop(frame, b.items[i] + 2, m, 0.3),
                flexShrink: 0,
                width: marker,
                height: marker,
                borderRadius: theme.radius > 8 ? 999 : theme.radius * u,
                background: markerColor(i),
                color: style === "crosses" ? "#FFFFFF" : c.onAccent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: style === "numbers" ? f.display : f.body,
                fontWeight: style === "numbers" ? f.displayWeight : 800,
                fontSize: marker * (style === "numbers" ? 0.56 : 0.5),
                lineHeight: 1,
              }}
            >
              {glyph(i)}
            </div>
            <FitText
              text={item}
              start={b.items[i] + 3}
              font="body"
              weight={f.bodyStrongWeight}
              align="left"
              animate="none"
              maxWidth={textW}
              maxHeight={rowMax}
              maxSize={size}
              minSize={size}
              lineHeight={1.18}
            />
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
          <Kicker text={plainText(scene.title)} start={b.title} pill={false} color={c.muted} />
        </div>
      ) : null}
      <div style={{ display: "flex", flexDirection: "column", gap: size * 0.28, width: box.width }}>
        {scene.items.map((item, i) => {
          const next = b.items[i + 1];
          const dim = next === undefined ? 0 : prog(frame, next, 10);
          return (
            <FitText
              key={i}
              text={item}
              start={b.items[i]}
              align={landscape ? "left" : "center"}
              color={interpolateColors(dim, [0, 1], [c.text, c.muted])}
              maxWidth={box.width}
              maxHeight={lineH}
              maxSize={size}
              minSize={size}
              style={{ opacity: 1 - 0.35 * dim }}
            />
          );
        })}
      </div>
    </Stage>
  );
};
