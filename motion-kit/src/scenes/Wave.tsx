import React from "react";
import { useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { prog, rise } from "../engine/motion.ts";
import { useSpeechLevel } from "../engine/speech.ts";
import { Kicker, Stage } from "../engine/stage.tsx";
import { FitText } from "../engine/text.tsx";
import { Waveform } from "../engine/visuals.tsx";

/** "Hear it": a waveform that plays with the voice, words lighting up as they are spoken. */
export const Wave: React.FC<{ scene: SceneOf<"wave"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, m, c, theme, scene: plan, landscape } = useEnv();
  const b = plan.beats as BeatsFor<"wave">;
  const level = useSpeechLevel();
  const text = scene.text ?? scene.say;
  const bars = landscape ? 64 : 40;
  const last = b.words.length ? b.words[b.words.length - 1] : b.bars;
  const played = prog(frame, b.words[0] ?? b.bars, Math.max(1, last - (b.words[0] ?? b.bars) + 10), (t) => t);

  return (
    <Stage gap={48}>
      {scene.label ? <Kicker text={scene.label} start={b.label} /> : null}
      <div style={{ ...rise(frame, b.bars, m, u, 0.4) }}>
        <Waveform
          bars={bars}
          width={box.width * (landscape ? 0.8 : 1)}
          height={(landscape ? 220 : 260) * u}
          color={c.text}
          frame={frame}
          level={level}
          played={played}
        />
      </div>
      {text ? (
        <FitText
          text={text}
          start={b.words[0] ?? b.bars}
          starts={b.words}
          animate="karaoke"
          maxWidth={box.width}
          maxHeight={box.height * 0.3}
          maxSize={(landscape ? 76 : 80) * u}
          minSize={40 * u}
          lineHeight={theme.fonts.displayLineHeight + 0.1}
        />
      ) : null}
      {scene.tags?.length ? (
        <div style={{ ...rise(frame, b.bars + 8, m, u, 0.3), display: "flex", gap: 14 * u, flexWrap: "wrap", justifyContent: "center" }}>
          {scene.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: `ui-monospace, "SF Mono", Menlo, ${theme.fonts.body}`,
                fontSize: 30 * u,
                color: c.muted,
                background: c.surface,
                border: `${2 * u}px solid ${c.line}`,
                borderRadius: 999,
                padding: `${8 * u}px ${20 * u}px`,
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
