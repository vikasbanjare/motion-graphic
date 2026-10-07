import React from "react";
import { useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { pop } from "../engine/motion.ts";
import { Stage } from "../engine/stage.tsx";
import { FitText } from "../engine/text.tsx";

/** Feature tiles: emoji icon + label (+ optional sub line). */
export const Grid: React.FC<{ scene: SceneOf<"grid"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, m, c, theme, scene: plan, landscape, format } = useEnv();
  const b = plan.beats as BeatsFor<"grid">;
  const f = theme.fonts;
  const n = scene.items.length;
  const cols = format.width > format.height ? Math.min(n, n === 4 ? 2 : 3) : n <= 3 ? 1 : 2;
  const rows = Math.ceil(n / cols);
  const gap = 24 * u;
  const titleH = scene.title ? box.height * 0.22 : 0;
  const tileW = (box.width - gap * (cols - 1)) / cols;
  const tileH = Math.min(cols === 1 ? 230 * u : 340 * u, (box.height - titleH - 40 * u - gap * (rows - 1)) / rows);
  const horizontal = cols === 1;
  const icon = Math.min(horizontal ? tileH * 0.55 : tileH * 0.36, 110 * u);
  const pad = 28 * u;
  const textW = horizontal ? tileW - icon - pad * 3 : tileW - pad * 2;

  return (
    <Stage gap={40}>
      {scene.title ? (
        <FitText text={scene.title} start={b.title} maxWidth={box.width} maxHeight={titleH} maxSize={(landscape ? 110 : 120) * u} />
      ) : null}
      <div style={{ display: "flex", flexWrap: "wrap", gap, width: box.width, justifyContent: "center" }}>
        {scene.items.map((it, i) => (
          <div
            key={i}
            style={{
              ...pop(frame, b.items[i], m, 0.75),
              width: tileW,
              height: tileH,
              boxSizing: "border-box",
              padding: pad,
              borderRadius: theme.radius * u,
              background: c.surface,
              border: `${2 * u}px solid ${c.line}`,
              display: "flex",
              flexDirection: horizontal ? "row" : "column",
              alignItems: horizontal ? "center" : "flex-start",
              justifyContent: horizontal ? "flex-start" : "space-between",
              gap: pad,
            }}
          >
            <div style={{ fontSize: icon, lineHeight: 1, flexShrink: 0 }}>{it.icon}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 * u }}>
              <FitText
                text={it.label}
                start={b.items[i]}
                font="body"
                weight={f.bodyStrongWeight}
                align="left"
                animate="none"
                maxWidth={textW}
                maxHeight={tileH * (it.sub ? 0.3 : 0.42)}
                maxSize={48 * u}
                minSize={26 * u}
                lineHeight={1.12}
              />
              {it.sub ? (
                <FitText
                  text={it.sub}
                  start={b.items[i]}
                  font="body"
                  color={c.muted}
                  align="left"
                  animate="none"
                  maxWidth={textW}
                  maxHeight={tileH * 0.26}
                  maxSize={32 * u}
                  minSize={22 * u}
                  lineHeight={1.2}
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Stage>
  );
};
