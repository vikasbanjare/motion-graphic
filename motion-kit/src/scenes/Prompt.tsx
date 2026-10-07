import React, { useMemo } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { fitText } from "../engine/fit.ts";
import { ease, prog, rise } from "../engine/motion.ts";
import { plainText, richWords } from "../engine/rich.ts";
import { useSpeechLevel } from "../engine/speech.ts";
import { Stage } from "../engine/stage.tsx";
import { FitText } from "../engine/text.tsx";
import { Cursor, Shimmer, Waveform } from "../engine/visuals.tsx";

/**
 * Product-demo beat: a floating card, a prompt typed into the input, the
 * cursor glides to the button and clicks, "Generating…" shimmers, the result
 * appears. Every position is computed, so the cursor always hits the button.
 */
export const Prompt: React.FC<{ scene: SceneOf<"prompt"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, m, c, theme, scene: plan, floor } = useEnv();
  const b = plan.beats as BeatsFor<"prompt">;
  const f = theme.fonts;
  const level = useSpeechLevel();

  const cardW = Math.min(box.width, 1100 * u);
  const pad = 40 * u;
  const labelSize = Math.max(34 * u, floor.comfortable);
  const inputPad = 30 * u;
  const lh = 1.3;
  const promptMax = Math.max(50 * u, floor.comfortable);
  const layout = useMemo(
    () =>
      fitText({
        words: richWords(scene.prompt),
        fontFamily: f.body,
        fontWeight: f.bodyWeight,
        maxWidth: cardW - pad * 2 - inputPad * 2,
        maxHeight: 3 * promptMax * lh,
        maxSize: promptMax,
        minSize: Math.max(34 * u, floor.min),
        lineHeight: lh,
      }),
    [scene.prompt, f, cardW, pad, inputPad, u, promptMax, floor],
  );
  const inputH = layout.height + inputPad * 2;
  const btnSize = Math.max(34 * u, floor.comfortable);
  const btnH = Math.max(88 * u, btnSize * 1.9);
  const btnLabel = scene.button ?? "Generate";
  // Wide enough for the label and for "Generating…" that replaces it.
  const btnW = useMemo(() => {
    const width = (text: string) =>
      fitText({ words: [{ text }], fontFamily: f.body, fontWeight: f.bodyStrongWeight, maxWidth: 1e4, maxHeight: 1e4, maxSize: btnSize, minSize: btnSize, lineHeight: 1.2, maxLines: 1 }).width;
    return Math.max(240 * u, Math.max(width(btnLabel), width("Generating…")) + 90 * u);
  }, [btnLabel, btnSize, f, u]);
  const resultH = scene.result ? (scene.resultKind === "audio" ? 120 * u : 150 * u) : 0;
  const cardH = pad + labelSize * 1.6 + inputH + 28 * u + btnH + pad;
  const btnX = cardW - pad - btnW / 2;
  const btnY = cardH - pad - btnH / 2;

  // Typing
  const total = scene.prompt.length;
  const shown = Math.floor(total * prog(frame, b.typeStart, b.typeEnd - b.typeStart, (t) => t));
  let budget = shown;
  const lines = layout.lines.map((line) => {
    const text = line.words.map((w) => w.text).join(" ");
    const part = text.slice(0, Math.max(0, budget));
    budget -= text.length + 1;
    return part;
  });
  const lastIdx = Math.max(0, lines.findLastIndex((l) => l.length > 0));
  const caretOn = frame < b.typeEnd + 4 || Math.floor((frame - b.typeEnd) / 8) % 2 === 0;

  // Cursor: glides in from lower right, lands on the button, clicks.
  const move = prog(frame, b.cursor, b.click - b.cursor, ease.inOut);
  const startX = cardW + 120 * u;
  const startY = cardH + 260 * u;
  const cx = interpolate(move, [0, 1], [startX, btnX + 10 * u]);
  const cy = interpolate(move, [0, 1], [startY, btnY + 6 * u]) - Math.sin(move * Math.PI) * 60 * u;
  const press = frame >= b.click && frame < b.click + 4 ? 1 : 0;
  const ripple = prog(frame, b.click, 12, ease.out);
  const pressed = prog(frame, b.click, 3) * (1 - prog(frame, b.click + 5, 6));
  const cursorIn = prog(frame, b.cursor, 6);
  const cursorOut = 1 - prog(frame, b.result - 6, 8);
  const generating = frame >= b.click + 3 && frame < b.result;

  return (
    <Stage gap={36}>
      <div
        data-mk="card"
        data-mk-label="prompt card"
        data-mk-bg={c.surface}
        style={{
          ...rise(frame, b.card, m, u, 0.7),
          position: "relative",
          width: cardW,
          height: cardH,
          boxSizing: "border-box",
          borderRadius: theme.radius * u,
          background: c.surface,
          boxShadow: `0 0 0 ${1.5 * u}px ${c.line}, 0 ${24 * u}px ${60 * u}px #0000001A`,
        }}
      >
        <div
          data-mk="text"
          data-mk-label="label"
          style={{
            position: "absolute",
            left: pad,
            top: pad,
            fontFamily: f.body,
            fontWeight: f.bodyStrongWeight,
            fontSize: labelSize,
            color: c.muted,
          }}
        >
          {scene.label ?? "Prompt"}
        </div>
        <div
          style={{
            position: "absolute",
            left: pad,
            right: pad,
            top: pad + labelSize * 1.6,
            height: inputH,
            boxSizing: "border-box",
            padding: inputPad,
            borderRadius: Math.min(theme.radius, 24) * u,
            background: c.bg,
            border: `${2 * u}px solid ${frame >= b.typeStart && frame < b.click ? c.accent : c.line}`,
            fontFamily: f.body,
            fontWeight: f.bodyWeight,
            fontSize: layout.fontSize,
            lineHeight: lh,
            color: c.text,
          }}
          data-mk="text"
          data-mk-label="prompt"
          data-mk-bg={c.bg}
          data-mk-overflow={layout.overflow ? "1" : undefined}
        >
          {lines.map((l, i) => (
            <div key={i} style={{ whiteSpace: "pre", height: layout.fontSize * lh }}>
              {l}
              {i === lastIdx && frame < b.click ? (
                <span
                  style={{
                    display: "inline-block",
                    width: "0.07em",
                    height: "1.05em",
                    marginLeft: "0.05em",
                    verticalAlign: "-0.15em",
                    background: c.accent,
                    opacity: caretOn ? 1 : 0,
                  }}
                />
              ) : null}
            </div>
          ))}
        </div>
        {/* Button */}
        <div
          data-mk="text"
          data-mk-label="button"
          data-mk-bg={c.text}
          style={{
            position: "absolute",
            left: btnX - btnW / 2,
            top: btnY - btnH / 2,
            width: btnW,
            height: btnH,
            borderRadius: 999,
            background: c.text,
            opacity: 1 - 0.18 * pressed,
            transform: `scale(${(1 - 0.04 * pressed).toFixed(4)})`,
            color: c.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: f.body,
            fontWeight: f.bodyStrongWeight,
            fontSize: btnSize,
          }}
        >
          {generating ? <Shimmer text="Generating…" frame={frame} start={b.click} color={c.muted} highlight={c.bg} /> : btnLabel}
        </div>
        {/* Click ripple */}
        {frame >= b.click ? (
          <div
            style={{
              position: "absolute",
              left: btnX + 10 * u - 64 * u * ripple,
              top: btnY + 6 * u - 64 * u * ripple,
              width: 128 * u * ripple,
              height: 128 * u * ripple,
              borderRadius: "50%",
              border: `${3 * u}px solid ${c.accent}`,
              opacity: 0.5 * (1 - ripple),
            }}
          />
        ) : null}
        {/* Cursor */}
        <div style={{ position: "absolute", left: cx, top: cy, opacity: cursorIn * cursorOut }}>
          <Cursor size={56 * u} press={press} />
        </div>
      </div>
      {scene.result ? (
        <div
          data-mk="card"
          data-mk-label="result card"
          data-mk-bg={c.surface}
          style={{
            ...rise(frame, b.result, m, u, 0.5),
            width: cardW,
            minHeight: resultH,
            boxSizing: "border-box",
            padding: `${24 * u}px ${pad}px`,
            borderRadius: theme.radius * u,
            background: c.surface,
            boxShadow: `0 0 0 ${1.5 * u}px ${c.line}, 0 ${18 * u}px ${44 * u}px #00000014`,
            display: "flex",
            alignItems: "center",
            gap: 28 * u,
          }}
        >
          {scene.resultKind === "audio" ? (
            <>
              <div
                style={{
                  flexShrink: 0,
                  width: 72 * u,
                  height: 72 * u,
                  borderRadius: 999,
                  background: c.text,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 0,
                    height: 0,
                    marginLeft: 6 * u,
                    borderTop: `${14 * u}px solid transparent`,
                    borderBottom: `${14 * u}px solid transparent`,
                    borderLeft: `${22 * u}px solid ${c.bg}`,
                  }}
                />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 * u }}>
                <div data-mk="text" data-mk-label="result" style={{ fontFamily: f.body, fontWeight: f.bodyStrongWeight, fontSize: Math.max(32 * u, floor.comfortable), color: c.text }}>
                  {plainText(scene.result)}
                </div>
                <Waveform
                  bars={32}
                  width={cardW - pad * 2 - 100 * u}
                  height={56 * u}
                  color={c.text}
                  frame={frame}
                  level={Math.max(level, 0.6 * prog(frame, b.result, 10))}
                  played={prog(frame, b.result, 90, (t) => t)}
                />
              </div>
            </>
          ) : (
            <FitText
              label="result"
              text={scene.result}
              start={b.result + 2}
              font="body"
              weight={f.bodyStrongWeight}
              align="left"
              maxWidth={cardW - pad * 2}
              maxHeight={resultH}
              maxSize={Math.max(46 * u, floor.comfortable)}
              minSize={Math.max(34 * u, floor.min)}
            />
          )}
        </div>
      ) : null}
    </Stage>
  );
};
