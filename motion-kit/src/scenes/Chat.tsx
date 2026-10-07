import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { fitText } from "../engine/fit.ts";
import { pop, prog, rise } from "../engine/motion.ts";
import { richWords } from "../engine/rich.ts";
import { Stage } from "../engine/stage.tsx";
import { FitText } from "../engine/text.tsx";

/** A prompt being typed into a chat box, then an answer bubble. Perfect for AI / app demos. */
export const Chat: React.FC<{ scene: SceneOf<"chat"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, m, c, theme, scene: plan } = useEnv();
  const b = plan.beats as BeatsFor<"chat">;
  const f = theme.fonts;
  const pad = 40 * u;
  const innerW = box.width - pad * 2;

  // Lay the prompt out at its final length so the box never reflows while typing.
  const layout = useMemo(
    () =>
      fitText({
        words: richWords(scene.prompt),
        fontFamily: f.body,
        fontWeight: f.bodyWeight,
        maxWidth: innerW,
        maxHeight: box.height * 0.36,
        maxSize: 52 * u,
        minSize: 30 * u,
        lineHeight: 1.32,
      }),
    [scene.prompt, f, innerW, box.height, u],
  );

  const total = scene.prompt.length;
  const shown = Math.floor(total * prog(frame, b.typeStart, b.typeEnd - b.typeStart, (t) => t));
  const typing = frame < b.typeEnd + 4;
  const cursorOn = typing || Math.floor(frame / 9) % 2 === 0;

  let budget = shown;
  const lines = layout.lines.map((line) => {
    const text = line.words.map((w) => w.text).join(" ");
    const part = text.slice(0, Math.max(0, budget));
    budget -= text.length + 1;
    return part;
  });
  const lastIdx = Math.max(0, lines.findLastIndex((l) => l.length > 0));
  const labelSize = 36 * u;

  return (
    <Stage gap={34}>
      <div
        style={{
          ...rise(frame, b.box, m, u, 0.6),
          width: box.width,
          boxSizing: "border-box",
          padding: pad,
          borderRadius: theme.radius * u,
          background: c.surface,
          border: `${3 * u}px solid ${c.accent}`,
          boxShadow: `0 ${24 * u}px ${70 * u}px ${c.accent}26`,
        }}
      >
        <div
          style={{
            fontFamily: f.body,
            fontWeight: f.bodyStrongWeight,
            fontSize: labelSize,
            color: c.accent,
            marginBottom: labelSize * 0.6,
            display: "flex",
            alignItems: "center",
            gap: 14 * u,
          }}
        >
          <span style={{ width: 16 * u, height: 16 * u, borderRadius: 99, background: c.accent, opacity: typing ? 0.5 + 0.5 * Math.abs(Math.sin(frame / 5)) : 1 }} />
          {scene.label ?? "Prompt"}
        </div>
        <div
          style={{
            fontFamily: f.body,
            fontWeight: f.bodyWeight,
            fontSize: layout.fontSize,
            lineHeight: 1.32,
            color: c.text,
            height: layout.height,
          }}
        >
          {lines.map((l, i) => (
            <div key={i} style={{ whiteSpace: "pre", height: layout.fontSize * 1.32 }}>
              {l}
              {i === lastIdx ? (
                <span
                  style={{
                    display: "inline-block",
                    width: "0.08em",
                    height: "1.05em",
                    marginLeft: "0.06em",
                    verticalAlign: "-0.15em",
                    background: c.accent,
                    opacity: cursorOn ? 1 : 0,
                  }}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
      {scene.reply ? (
        <div
          style={{
            ...pop(frame, b.reply, m, 0.7),
            alignSelf: "flex-end",
            transformOrigin: "100% 0%",
            maxWidth: box.width * 0.9,
            boxSizing: "border-box",
            padding: `${pad * 0.7}px ${pad * 0.9}px`,
            borderRadius: `${theme.radius * u}px ${theme.radius * u}px ${Math.min(8, theme.radius) * u}px ${theme.radius * u}px`,
            background: c.accent,
          }}
        >
          <FitText
            text={scene.reply}
            start={b.reply + 2}
            font="body"
            weight={f.bodyStrongWeight}
            color={c.onAccent}
            align="left"
            animate="none"
            shrinkWrap
            maxWidth={box.width * 0.9 - pad * 1.8}
            maxHeight={box.height * 0.25}
            maxSize={48 * u}
            minSize={30 * u}
          />
        </div>
      ) : null}
    </Stage>
  );
};
