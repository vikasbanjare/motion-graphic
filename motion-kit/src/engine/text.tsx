import React, { useContext, useMemo } from "react";
import { useCurrentFrame } from "remotion";
import { QaContext, useEnv } from "./context.ts";
import { fitText } from "./fit.ts";
import { ease, enterP, prog } from "./motion.ts";
import { richWords, type RichWord } from "./rich.ts";

type Props = {
  text: string;
  /** Frame the first word starts entering. */
  start: number;
  maxWidth: number;
  maxHeight: number;
  maxSize: number;
  minSize?: number;
  maxLines?: number;
  font?: "display" | "body";
  weight?: number;
  color?: string;
  align?: "left" | "center" | "right";
  /**
   * Per-word cascade (headlines), per-line (body copy), none, or karaoke
   * (every word visible but dim, lighting up at its spoken time).
   */
  animate?: "words" | "lines" | "none" | "karaoke";
  /** Exact start frame per word (voice sync). Overrides the cascade. */
  starts?: number[];
  /** Frames between words/lines. Defaults to motion token. */
  stagger?: number;
  lineHeight?: number;
  upper?: boolean;
  style?: React.CSSProperties;
  /** Size the box to the text instead of the full max width. */
  shrinkWrap?: boolean;
};

/**
 * Auto-fitted, animated text. Font size is solved so the text always fits
 * its box; words then cascade in using the video's motion personality.
 */
export const FitText: React.FC<Props> = ({
  text,
  start,
  maxWidth,
  maxHeight,
  maxSize,
  minSize,
  maxLines,
  font = "display",
  weight,
  color,
  align = "center",
  animate = font === "display" ? "words" : "lines",
  stagger,
  lineHeight,
  upper,
  style,
  shrinkWrap,
  starts,
}) => {
  const frame = useCurrentFrame();
  const { theme, m, c } = useEnv();
  const f = theme.fonts;
  const isDisplay = font === "display";
  const family = isDisplay ? f.display : f.body;
  const fw = weight ?? (isDisplay ? f.displayWeight : f.bodyWeight);
  const tracking = isDisplay ? f.displayTracking : 0;
  const caps = upper ?? (isDisplay && f.displayUpper);
  // Devanagari matras sit above and below the line: Latin leading would clip them.
  const deva = /[\u0900-\u097F]/.test(text);
  const baseLh = lineHeight ?? (isDisplay ? f.displayLineHeight : 1.28);
  const lh = deva ? Math.max(baseLh, isDisplay ? 1.25 : 1.5) : baseLh;

  const layout = useMemo(
    () =>
      fitText({
        words: richWords(text),
        fontFamily: family,
        fontWeight: fw,
        tracking,
        upper: caps,
        maxWidth,
        maxHeight,
        maxSize,
        minSize,
        maxLines,
        lineHeight: lh,
      }),
    [text, family, fw, tracking, caps, maxWidth, maxHeight, maxSize, minSize, maxLines, lh],
  );

  const qa = useContext(QaContext);
  if (layout.overflow && typeof console !== "undefined") {
    console.warn(`[motion-kit] TEXT TOO LONG: "${text.slice(0, 60)}"`);
  }
  const gap = stagger ?? (animate === "lines" ? Math.max(3, m.wordStagger * 2) : m.wordStagger);
  let wordIndex = 0;

  return (
    <div
      style={{
        width: shrinkWrap ? Math.ceil(layout.width) + 2 : maxWidth,
        fontFamily: family,
        fontWeight: fw,
        fontSize: layout.fontSize,
        letterSpacing: tracking ? `${tracking}em` : undefined,
        textTransform: caps ? "uppercase" : "none",
        lineHeight: lh,
        color: color ?? c.text,
        ...style,
        ...(qa && layout.overflow ? { outline: "6px dashed #FF2D55", outlineOffset: 6 } : null),
      }}
    >
      {layout.lines.map((line, li) => (
        <div
          key={li}
          style={{
            display: "flex",
            justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
            height: layout.fontSize * lh,
            alignItems: "center",
            whiteSpace: "nowrap",
          }}
        >
          {line.words.map((w, wi) => {
            const i = wordIndex++;
            const at =
              (animate === "words" || animate === "karaoke") && starts?.[i] !== undefined
                ? starts[i]
                : animate === "words" || animate === "karaoke"
                  ? start + i * gap
                  : animate === "lines"
                    ? start + li * gap
                    : start;
            return (
              <Word
                key={wi}
                word={w}
                at={at}
                frame={frame}
                mode={animate}
                sceneStart={start}
                marginRight={wi < line.words.length - 1 ? layout.space : 0}
                joinRight={w.mark === "mark" && line.words[wi + 1]?.mark === "mark"}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

const Word: React.FC<{
  word: RichWord;
  at: number;
  frame: number;
  mode: "words" | "lines" | "none" | "karaoke";
  sceneStart: number;
  marginRight: number;
  /** Next word is also highlighted: extend the box across the gap. */
  joinRight: boolean;
}> = ({ word, at, frame, mode, sceneStart, marginRight, joinRight }) => {
  const { m, c } = useEnv();
  const style = mode === "words" ? m.wordStyle : mode === "karaoke" ? "none" : "rise";
  const p = mode === "none" || mode === "karaoke" ? 1 : enterP(frame, at, m);
  // Karaoke: the line fades in as a whole, each word brightens on its spoken frame.
  const opacity =
    mode === "none"
      ? 1
      : mode === "karaoke"
        ? prog(frame, sceneStart - 4, 10) * (0.3 + 0.7 * prog(frame, at - 1, 3))
        : prog(frame, at, Math.max(3, m.enter * 0.4));

  const after = at + Math.round(m.enter * 0.55);
  const markP = prog(frame, after, 10, ease.inOut);
  const colorOf = (mk?: RichWord["mark"]) =>
    mk === "accent" ? c.accent : mk === "mark" ? c.onMark : mk === "strike" ? c.muted : undefined;
  const color = word.parts ? undefined : colorOf(word.mark);
  const content = word.parts
    ? word.parts.map((part, k) => (
        <span key={k} style={{ color: colorOf(part.mark) }}>
          {part.text}
        </span>
      ))
    : word.text;

  let inner: React.CSSProperties;
  if (style === "mask") {
    // Travel past the mask's padding so no sliver peeks through before entry.
    inner = { display: "inline-block", opacity: p <= 0.001 ? 0 : 1, transform: `translate3d(0, ${((1 - p) * 140).toFixed(2)}%, 0)` };
  } else if (style === "pop") {
    inner = {
      display: "inline-block",
      opacity,
      transform: `translate3d(0, ${((1 - p) * 0.25).toFixed(3)}em, 0) scale(${(0.5 + 0.5 * p).toFixed(4)})`,
      transformOrigin: "50% 80%",
    };
  } else if (style === "none") {
    inner = { display: "inline-block", opacity };
  } else if (style === "blur") {
    // Editorial blur-in: short rise, defocus resolving to sharp, no overshoot.
    const q = prog(frame, at, m.enter, ease.out);
    const blur = (1 - q) * 0.1;
    inner = {
      display: "inline-block",
      opacity: prog(frame, at, Math.max(4, m.enter * 0.55)),
      transform: `translate3d(0, ${((1 - q) * 0.32).toFixed(3)}em, 0)`,
      filter: blur > 0.004 ? `blur(${blur.toFixed(3)}em)` : undefined,
    };
  } else {
    const blur = (1 - prog(frame, at, m.enter * 0.8)) * 0.08;
    inner = {
      display: "inline-block",
      opacity,
      transform: `translate3d(0, ${((1 - p) * 0.38).toFixed(3)}em, 0)`,
      filter: blur > 0.004 ? `blur(${blur.toFixed(3)}em)` : undefined,
    };
  }

  return (
    <span style={{ position: "relative", display: "inline-block", marginRight, color }}>
      {word.mark === "mark" ? (
        <span
          style={{
            position: "absolute",
            left: "-0.1em",
            right: joinRight ? -marginRight - 2 : "-0.1em",
            top: "0.06em",
            bottom: "0.02em",
            background: c.mark,
            borderRadius: "0.08em",
            transformOrigin: "0% 50%",
            transform: `scaleX(${markP.toFixed(4)})`,
          }}
        />
      ) : null}
      <span
        style={
          style === "mask"
            ? {
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "top",
                padding: "0.14em 0.04em 0.16em",
                margin: "-0.14em -0.04em -0.16em",
                position: "relative",
              }
            : { display: "inline-block", position: "relative" }
        }
      >
        <span style={inner}>{content}</span>
      </span>
      {word.mark === "strike" ? (
        <span
          style={{
            position: "absolute",
            left: "-0.04em",
            right: "-0.04em",
            top: "50%",
            height: "0.09em",
            marginTop: "-0.045em",
            background: c.accent,
            borderRadius: "0.05em",
            transformOrigin: "0% 50%",
            transform: `scaleX(${markP.toFixed(4)})`,
          }}
        />
      ) : null}
    </span>
  );
};
