import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { fitText } from "../engine/fit.ts";
import { pop, rise } from "../engine/motion.ts";
import { richWords } from "../engine/rich.ts";
import { Stage } from "../engine/stage.tsx";
import { FitText } from "../engine/text.tsx";

/** Old way vs new way. Left is muted with crosses; right is the hero with checks. */
export const Compare: React.FC<{ scene: SceneOf<"compare"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, m, c, theme, scene: plan, landscape, format } = useEnv();
  const b = plan.beats as BeatsFor<"compare">;
  const f = theme.fonts;
  const side = format.width / format.height > 0.9;

  const titleH = scene.title ? box.height * (side ? 0.22 : 0.18) : 0;
  const gap = 28 * u;
  const cardW = side ? (box.width - gap) / 2 : box.width;
  const cardH = side ? box.height - titleH - 40 * u : (box.height - titleH - 40 * u - gap) / 2;
  const pad = 34 * u;
  const rows = Math.max(scene.left.items.length, scene.right.items.length);
  const labelSize = 36 * u;
  const rowH = (cardH - pad * 2 - labelSize * 1.6) / rows;

  const size = useMemo(() => {
    const all = [...scene.left.items, ...scene.right.items];
    return Math.min(
      ...all.map(
        (t) =>
          fitText({
            words: richWords(t),
            fontFamily: f.body,
            fontWeight: f.bodyStrongWeight,
            maxWidth: cardW - pad * 2 - 56 * u,
            maxHeight: rowH * 0.92,
            maxSize: 52 * u,
            minSize: 34 * u,
            lineHeight: 1.15,
            maxLines: 2,
          }).fontSize,
      ),
    );
  }, [scene.left.items, scene.right.items, f, cardW, pad, rowH, u]);

  const card = (which: "left" | "right") => {
    const data = scene[which];
    const hero = which === "right";
    const labelAt = hero ? b.rightLabel : b.leftLabel;
    const items = hero ? b.right : b.left;
    return (
      <div
        style={{
          ...(hero ? pop(frame, labelAt, m, 0.85) : rise(frame, labelAt, m, u, 0.6)),
          width: cardW,
          height: cardH,
          boxSizing: "border-box",
          padding: pad,
          borderRadius: theme.radius * u,
          background: hero ? c.surface : "transparent",
          border: `${(hero ? 4 : 2) * u}px solid ${hero ? c.accent : c.line}`,
          boxShadow: hero ? `0 ${20 * u}px ${60 * u}px ${c.accent}2E` : undefined,
          display: "flex",
          flexDirection: "column",
          gap: labelSize * 0.6,
        }}
      >
        <div
          style={{
            fontFamily: f.body,
            fontWeight: f.bodyStrongWeight,
            fontSize: labelSize,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: hero ? c.accent : c.muted,
          }}
        >
          {data.label}
        </div>
        {data.items.map((t, i) => (
          <div
            key={i}
            style={{ ...rise(frame, items[i], m, u, 0.5), display: "flex", alignItems: "center", gap: 18 * u, minHeight: rowH * 0.8 }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 46 * u,
                height: 46 * u,
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
              text={t}
              start={items[i]}
              font="body"
              weight={f.bodyStrongWeight}
              color={hero ? c.text : c.muted}
              align="left"
              animate="none"
              maxWidth={cardW - pad * 2 - 58 * u}
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
        <FitText text={scene.title} start={b.title} maxWidth={box.width} maxHeight={titleH} maxSize={(landscape ? 110 : 120) * u} />
      ) : null}
      <div style={{ display: "flex", flexDirection: side ? "row" : "column", gap }}>
        {card("left")}
        {card("right")}
      </div>
    </Stage>
  );
};
