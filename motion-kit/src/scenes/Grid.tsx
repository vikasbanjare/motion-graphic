import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { pop } from "../engine/motion.ts";
import { Stage } from "../engine/stage.tsx";
import type { FitResult } from "../engine/fit.ts";
import { FitText, fitLayout, useFitLayout } from "../engine/text.tsx";

/** Feature tiles: emoji icon + label (+ optional sub line). */
export const Grid: React.FC<{ scene: SceneOf<"grid"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, m, c, theme, scene: plan, landscape, format, floor } = useEnv();
  const b = plan.beats as BeatsFor<"grid">;
  const f = theme.fonts;
  const n = scene.items.length;
  const cols = format.width > format.height ? Math.min(n, n === 4 ? 2 : 3) : n <= 3 ? 1 : 2;
  const rows = Math.ceil(n / cols);
  const gap = 24 * u;
  const titleFit = { maxWidth: box.width, maxHeight: scene.title ? box.height * 0.22 : 0, maxSize: (landscape ? 110 : 120) * u };
  const titleH = useFitLayout(scene.title, titleFit)?.height ?? 0;
  const tileW = (box.width - gap * (cols - 1)) / cols;
  const tileH = Math.min(cols === 1 ? 230 * u : 340 * u, (box.height - titleH - 40 * u - gap * (rows - 1)) / rows);
  const horizontal = cols === 1;
  const subs = scene.items.some((it) => it.sub);
  const pad = 28 * u;
  const border = 2 * u;
  const subGap = 6 * u;
  const iconGap = 16 * u;
  const inner = tileH - pad * 2 - border * 2;
  // A sub needs two lines at the smallest size; a label one comfortable line.
  const subNeed = floor.min * 1.2 * 2 + subGap;
  const stackedIcon = Math.min(tileH * (subs ? 0.28 : 0.36), 110 * u);
  // Short tiles with subs: the icon moves beside the label so the text keeps the tile's full height.
  const compact = !horizontal && subs && inner - stackedIcon - pad < floor.comfortable * 1.12 + subNeed;
  const icon = horizontal ? Math.min(tileH * 0.55, 110 * u) : compact ? Math.max(floor.comfortable * 1.3, 52 * u) : stackedIcon;
  // Text gets exactly the room left inside the tile (padding, border, icon), so it can never spill out.
  const textW = (horizontal ? tileW - icon - pad * 3 : tileW - pad * 2) - border * 2;
  const textH = horizontal || compact ? inner : inner - icon - pad;
  const labelW = compact ? textW - icon - iconGap : textW;

  // One label size and one sub size for every tile (a grid with mixed sizes looks broken).
  // The sub gets whatever its tile's label leaves. Text too long even at the smallest size is flagged on its own.
  const fit = useMemo(() => {
    const shared = (fits: FitResult[]) => {
      const ok = fits.filter((x) => !x.overflow);
      return Math.min(...(ok.length ? ok : fits).map((x) => x.fontSize));
    };
    const labelOpts = scene.items.map((it) => ({
      font: "body" as const,
      weight: f.bodyStrongWeight,
      maxWidth: labelW,
      maxHeight: it.sub ? Math.max(textH - subNeed, floor.comfortable * 1.12) : textH,
      maxSize: Math.max(48 * u, floor.comfortable * 1.25),
      minSize: floor.min,
      lineHeight: 1.12,
    }));
    const label = shared(scene.items.map((it, i) => fitLayout(theme, it.label, labelOpts[i])));
    const subOpts = scene.items.map((it, i) => {
      const labelH = fitLayout(theme, it.label, { ...labelOpts[i], maxSize: label, minSize: label }).height;
      const maxHeight = textH - (compact ? Math.max(labelH, icon) : labelH) - subGap;
      return { font: "body" as const, maxWidth: textW, maxHeight, maxSize: Math.max(32 * u, floor.comfortable), minSize: floor.min, lineHeight: 1.2 };
    });
    const subs = scene.items.flatMap((it, i) => (it.sub ? [fitLayout(theme, it.sub, subOpts[i])] : []));
    return { labelOpts, label, subOpts, sub: subs.length ? shared(subs) : 0 };
  }, [scene.items, theme, f, labelW, textW, textH, compact, icon, subGap, subNeed, u, floor]);

  return (
    <Stage gap={40}>
      {scene.title ? <FitText label="title" text={scene.title} start={b.title} {...titleFit} /> : null}
      <div style={{ display: "flex", flexWrap: "wrap", gap, width: box.width, justifyContent: "center" }}>
        {scene.items.map((it, i) => {
          const iconEl = <div style={{ fontSize: icon, lineHeight: 1, flexShrink: 0 }}>{it.icon}</div>;
          const label = (
            <FitText
              label={`tile ${i + 1} label`}
              text={it.label}
              start={b.items[i]}
              align="left"
              animate="none"
              {...fit.labelOpts[i]}
              maxSize={fit.label}
              minSize={fit.label}
            />
          );
          const sub = it.sub ? (
            <FitText
              label={`tile ${i + 1} sub`}
              text={it.sub}
              start={b.items[i]}
              color={c.muted}
              align="left"
              animate="none"
              {...fit.subOpts[i]}
              maxSize={fit.sub}
              minSize={fit.sub}
            />
          ) : null;
          return (
            <div
              key={i}
              data-mk="card"
              data-mk-label={`tile ${i + 1}`}
              data-mk-bg={c.surface}
              style={{
                ...pop(frame, b.items[i], m, 0.75),
                width: tileW,
                height: tileH,
                boxSizing: "border-box",
                padding: pad,
                borderRadius: theme.radius * u,
                background: c.surface,
                border: `${border}px solid ${c.line}`,
                display: "flex",
                flexDirection: horizontal ? "row" : "column",
                alignItems: horizontal ? "center" : "flex-start",
                justifyContent: horizontal ? "flex-start" : compact ? "center" : "space-between",
                gap: compact ? subGap : pad,
              }}
            >
              {compact ? (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: iconGap }}>
                    {iconEl}
                    {label}
                  </div>
                  {sub}
                </>
              ) : (
                <>
                  {iconEl}
                  <div style={{ display: "flex", flexDirection: "column", gap: subGap }}>
                    {label}
                    {sub}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </Stage>
  );
};
