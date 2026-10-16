import React, { useMemo } from "react";
import { measureText } from "@remotion/layout-utils";
import { useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { prog, rise } from "../engine/motion.ts";
import { useSpeechLevel } from "../engine/speech.ts";
import { Kicker, Stage, kickerHeight } from "../engine/stage.tsx";
import { FitText, useFitLayout } from "../engine/text.tsx";
import { Waveform } from "../engine/visuals.tsx";

/** "Hear it": a waveform that plays with the voice, words lighting up as they are spoken. */
export const Wave: React.FC<{ scene: SceneOf<"wave"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const env = useEnv();
  const { box, u, m, c, theme, scene: plan, landscape, floor } = env;
  const b = plan.beats as BeatsFor<"wave">;
  const level = useSpeechLevel();
  const text = scene.text ?? scene.say;
  const bars = landscape ? 64 : 40;
  const last = b.words.length ? b.words[b.words.length - 1] : b.bars;
  const played = prog(frame, b.words[0] ?? b.bars, Math.max(1, last - (b.words[0] ?? b.bars) + 10), (t) => t);

  const gap = 48 * u; // Stage gap
  const textFit = {
    maxWidth: box.width,
    maxHeight: box.height * 0.3,
    maxSize: (landscape ? 76 : 80) * u,
    minSize: 40 * u,
    lineHeight: theme.fonts.displayLineHeight + 0.1,
  };
  const textH = useFitLayout(text, textFit)?.height ?? 0;
  // Tags wrap into rows: measure them so the waveform can give up the height they need.
  const tagFont = `ui-monospace, "SF Mono", Menlo, ${theme.fonts.body}`;
  const tagSize = Math.max(30 * u, floor.comfortable);
  const tagPad = 20 * u;
  const tagGap = 14 * u;
  const tagRows = useMemo(() => {
    if (!scene.tags?.length) return 0;
    let rows = 1;
    let x = 0;
    for (const tag of scene.tags) {
      const w = measureText({ text: tag, fontFamily: tagFont, fontSize: tagSize, fontWeight: "400" }).width + tagPad * 2 + 4 * u;
      if (x > 0 && x + tagGap + w > box.width) {
        rows++;
        x = w;
      } else x += (x > 0 ? tagGap : 0) + w;
    }
    return rows;
  }, [scene.tags, tagFont, tagSize, tagPad, tagGap, box.width, u]);
  const tagH = tagSize * 1.2 + 16 * u + 4 * u;
  const tagsH = tagRows ? tagRows * tagH + (tagRows - 1) * tagGap : 0;
  const parts = [scene.label ? kickerHeight(env) : 0, textH, tagsH].filter((h) => h > 0);
  // The waveform is decoration: it takes what the words and tags leave.
  const waveH = Math.max(60 * u, Math.min((landscape ? 220 : 260) * u, box.height - parts.reduce((a, h) => a + h + gap, 0)));

  return (
    <Stage gap={48}>
      {scene.label ? <Kicker text={scene.label} start={b.label} label="label" /> : null}
      <div style={{ ...rise(frame, b.bars, m, u, 0.4) }}>
        <Waveform
          bars={bars}
          width={box.width * (landscape ? 0.8 : 1)}
          height={waveH}
          color={c.text}
          frame={frame}
          level={level}
          played={played}
        />
      </div>
      {text ? (
        <FitText
          label="text"
          text={text}
          start={b.words[0] ?? b.bars}
          starts={b.words}
          animate="karaoke"
          {...textFit}
        />
      ) : null}
      {scene.tags?.length ? (
        <div style={{ ...rise(frame, b.bars + 8, m, u, 0.3), display: "flex", gap: tagGap, flexWrap: "wrap", justifyContent: "center" }}>
          {scene.tags.map((tag, i) => (
            <span
              key={tag}
              data-mk="text"
              data-mk-label={`tag ${i + 1}`}
              data-mk-bg={c.surface}
              style={{
                fontFamily: tagFont,
                fontSize: tagSize,
                lineHeight: 1.2,
                color: c.muted,
                background: c.surface,
                border: `${2 * u}px solid ${c.line}`,
                borderRadius: 999,
                padding: `${8 * u}px ${tagPad}px`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </Stage>
  );
};
