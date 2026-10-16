import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { fitText } from "../engine/fit.ts";
import { pop, rise } from "../engine/motion.ts";
import { richWords } from "../engine/rich.ts";
import { Stage } from "../engine/stage.tsx";
import { FitText, useFitLayout } from "../engine/text.tsx";

/** Old way vs new way. Left is muted with crosses; right is the hero with checks. */
export const Compare: React.FC<{ scene: SceneOf<"compare"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, m, c, theme, scene: plan, landscape, format, floor } = useEnv();
  const b = plan.beats as BeatsFor<"compare">;
  const f = theme.fonts;
  const side = format.width / format.height > 0.9;

  const titleFit = { maxWidth: box.width, maxHeight: scene.title ? box.height * (side ? 0.22 : 0.18) : 0, maxSize: (landscape ? 110 : 120) * u };
  // Cards get the room a short title does not use.
  const titleH = useFitLayout(scene.title, titleFit)?.height ?? 0;
  const gap = 28 * u;
  const cardW = side ? (box.width - gap) / 2 : box.width;
  const cardH = side ? box.height - titleH - 40 * u : (box.height - titleH - 40 * u - gap) / 2;
  // Narrow side-by-side cards (square) give padding back to the text so rows keep readable type.
  const pad = Math.min(34 * u, cardW * 0.07);
  const border = 4 * u;
  const rows = Math.max(scene.left.items.length, scene.right.items.length);
  const labelSize = Math.max(36 * u, floor.comfortable);
  const labelLh = 1.2;
  const rowGap = labelSize * 0.6;
  // Both card labels share one size. They stay on one line, or both take two when one cannot fit (narrow side-by-side cards).
  const labels = useMemo(() => {
    const fit = (t: string, lines: number, size?: number) =>
      fitText({
        words: richWords(t),
        fontFamily: f.body,
        fontWeight: f.bodyStrongWeight,
        tracking: 0.12,
        upper: true,
        maxWidth: cardW - pad * 2 - border * 2,
        maxHeight: labelSize * labelLh * lines,
        maxSize: size ?? labelSize,
        minSize: size ?? floor.min,
        lineHeight: labelLh,
        maxLines: lines,
      });
    const texts = [scene.left.label, scene.right.label];
    const lines = texts.some((t) => fit(t, 1).overflow) ? 2 : 1;
    const size = Math.min(...texts.map((t) => fit(t, lines).fontSize));
    const fits = texts.map((t) => fit(t, lines, size));
    return {
      size,
      lines: fits.map((x) => x.lines.map((l) => l.words.map((w) => w.text).join(" "))),
      height: Math.max(...fits.map((x) => x.lines.length)) * size * labelLh,
      overflow: fits.map((x) => x.overflow),
    };
  }, [scene.left.label, scene.right.label, f, cardW, pad, border, labelSize, floor]);
  // Inside a card: the label, then each row after a gap, all within padding and border.
  const rowH = (cardH - pad * 2 - border * 2 - labels.height - rowGap * rows) / rows;
  const mark = 46 * u;
  const markGap = 18 * u;
  const textW = cardW - pad * 2 - border * 2 - mark - markGap;

  // One size for every row; a row too long even at the smallest size is flagged on its own.
  const size = useMemo(() => {
    const fits = [...scene.left.items, ...scene.right.items].map((t) =>
      fitText({
        words: richWords(t),
        fontFamily: f.body,
        fontWeight: f.bodyStrongWeight,
        maxWidth: textW,
        maxHeight: rowH,
        maxSize: 52 * u,
        minSize: floor.min,
        lineHeight: 1.15,
        maxLines: 2,
      }),
    );
    const ok = fits.filter((x) => !x.overflow);
    return Math.min(...(ok.length ? ok : fits).map((x) => x.fontSize));
  }, [scene.left.items, scene.right.items, f, textW, rowH, u, floor]);

  const card = (which: "left" | "right") => {
    const data = scene[which];
    const hero = which === "right";
    const labelAt = hero ? b.rightLabel : b.leftLabel;
    const items = hero ? b.right : b.left;
    return (
      <div
        data-mk="card"
        data-mk-label={`${which} card`}
        data-mk-bg={hero ? c.surface : undefined}
        style={{
          ...(hero ? pop(frame, labelAt, m, 0.85) : rise(frame, labelAt, m, u, 0.6)),
          width: cardW,
          height: cardH,
          boxSizing: "border-box",
          borderRadius: theme.radius * u,
          background: hero ? c.surface : "transparent",
          // Same outer size for both cards: the thinner border is padded out to match.
          border: `${hero ? border : border / 2}px solid ${hero ? c.accent : c.line}`,
          padding: hero ? pad : pad + border / 2,
          boxShadow: hero ? `0 ${20 * u}px ${60 * u}px ${c.accent}2E` : undefined,
          display: "flex",
          flexDirection: "column",
          gap: rowGap,
        }}
      >
        <div
          data-mk="text"
          data-mk-label={`${which} label`}
          data-mk-text={data.label}
          data-mk-overflow={labels.overflow[hero ? 1 : 0] ? "1" : undefined}
          style={{
            fontFamily: f.body,
            fontWeight: f.bodyStrongWeight,
            fontSize: labels.size,
            lineHeight: labelLh,
            height: labels.height,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            color: hero ? c.accent : c.muted,
          }}
        >
          {labels.lines[hero ? 1 : 0].map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
        {data.items.map((t, i) => (
          <div
            key={i}
            style={{ ...rise(frame, items[i], m, u, 0.5), display: "flex", alignItems: "center", gap: markGap, minHeight: rowH * 0.8 }}
          >
            <span
              style={{
                flexShrink: 0,
                width: mark,
                height: mark,
                borderRadius: 99,
                background: hero ? c.accent : c.line,
                color: hero ? c.onAccent : c.muted,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: f.body,
                fontWeight: 800,
                fontSize: 26 * u,
              }}
            >
              {hero ? "✓" : "✕"}
            </span>
            <FitText
              label={`${which} item ${i + 1}`}
              text={t}
              start={items[i]}
              font="body"
              weight={f.bodyStrongWeight}
              color={hero ? c.text : c.muted}
              align="left"
              animate="none"
              maxWidth={textW}
              maxHeight={rowH}
              maxSize={size}
              minSize={size}
              lineHeight={1.15}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Stage gap={40}>
      {scene.title ? (
        <FitText label="title" text={scene.title} start={b.title} {...titleFit} />
      ) : null}
      <div style={{ display: "flex", flexDirection: side ? "row" : "column", gap }}>
        {card("left")}
        {card("right")}
      </div>
    </Stage>
  );
};
