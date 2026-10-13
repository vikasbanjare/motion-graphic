import { fitText, measureText } from "@remotion/layout-utils";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FONT_FAMILY } from "../fonts";
import { useLayout, type Layout } from "../layout";
import { color, palette } from "../palette";
import { Sprite } from "../paint/Sprite";
import { underline } from "../paint/sprites";
import { storyboard, type TextEvent } from "../storyboard";
import { popIn, sp } from "../motion";
import { clamp01, expoOut, sec } from "../timing";

const underlineCache = new Map<string, ReturnType<typeof underline>>();
const underlineFor = (token: string, w: number) => {
  const k = `${token}-${w}`;
  let fn = underlineCache.get(k);
  if (!fn) {
    fn = underline(color(token as keyof typeof palette), w);
    underlineCache.set(k, fn);
  }
  return fn;
};

/** Box (left/top/width) a text event is laid out in, per position + format. */
const placement = (ev: TextEvent, l: Layout) => {
  const { width, height, portrait, safe, splitText } = l;
  switch (ev.position) {
    case "split":
      return { x: splitText.x, w: splitText.w, cy: splitText.y + splitText.h / 2 };
    case "top":
      return { x: safe.x, w: safe.w, cy: portrait ? height * 0.17 : height * 0.15 };
    case "center":
      return { x: safe.x + safe.w * 0.06, w: safe.w * 0.88, cy: height / 2 };
    case "card":
    case "card-1":
    case "card-2": {
      // Card text stays inside the painted card (~62% of the art box).
      const w = Math.min(width, height) * 0.62;
      const dy = ev.position === "card-1" ? -(portrait ? height * 0.035 : height * 0.075) : ev.position === "card-2" ? (portrait ? height * 0.03 : height * 0.06) : 0;
      return { x: (width - w) / 2, w, cy: height / 2 + dy };
    }
    case "below-logo":
      return { x: safe.x, w: safe.w, cy: height * (portrait ? 0.6 : 0.68) };
    case "footer":
      return { x: safe.x, w: safe.w, cy: height - safe.y - height * 0.015 };
    default:
      return { x: safe.x, w: safe.w, cy: width / 2 };
  }
};

const Word: React.FC<{ ev: TextEvent }> = ({ ev }) => {
  const frame = useCurrentFrame();
  const l = useLayout();
  const start = sec(ev.start);
  const end = sec(ev.end);
  const f = frame - start;
  const box = placement(ev, l);
  const letterSpacing = ev.tracking ? `${ev.tracking}em` : undefined;

  // Hero words: ≥12% of frame height, shrunk only if they'd break the safe area.
  const target = ev.size * l.height;
  const fitted = fitText({ text: ev.text, withinWidth: box.w * (ev.chip ? 0.86 : 1), fontFamily: FONT_FAMILY, fontWeight: ev.weight, letterSpacing }).fontSize;
  const fontSize = Math.min(target, fitted);
  const measured = measureText({ text: ev.text, fontFamily: FONT_FAMILY, fontWeight: ev.weight, fontSize, letterSpacing });

  let scale = 1;
  let opacity = 1;
  let dy = 0;
  let rot = 0;
  switch (ev.kind) {
    case "kinetic":
      // Word-hit: pops with overshoot and a twist that settles (follow-through).
      scale = popIn(f, 0, "pop", 0.3);
      rot = (1 - sp(f, 0, "loose")) * (ev.id.length % 2 ? 8 : -8);
      break;
    case "super":
      scale = popIn(f, 0, "snap", 0.5);
      break;
    case "hero":
      // Slam: in big, snap down, impact squash.
      scale = f < 0 ? 0 : 1 + 0.5 * (1 - sp(f, 0, "snap"));
      opacity = interpolate(f, [0, 1], [0, 1], { extrapolateRight: "clamp" });
      break;
    case "card":
      if (ev.stamp) {
        scale = f < 0 ? 0 : 1 + 0.35 * (1 - sp(f, 0, "snap"));
        opacity = interpolate(f, [0, 1], [0, 1], { extrapolateRight: "clamp" });
      } else {
        opacity = interpolate(f, [0, 6], [0, 1], { extrapolateRight: "clamp" });
        dy = (1 - sp(f, 0, "settle")) * fontSize * 0.4;
      }
      break;
    case "endline":
    case "legal":
      opacity = interpolate(f, [0, 6], [0, 1], { extrapolateRight: "clamp" });
      dy = (1 - sp(f, 0, "settle")) * fontSize * 0.3;
      break;
  }
  // Supers that carry across a cut fade over their last 5 frames.
  if (ev.kind === "super" && ev.chip) opacity *= interpolate(frame, [end - 5, end], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // US STOCKS shifts up when the phone pops in (S10, 17.0).
  let shiftY = 0;
  let shiftScale = 1;
  if (ev.shiftAt !== undefined) {
    const p = expoOut(clamp01((frame - sec(ev.shiftAt)) / 8));
    shiftY = p * -(l.portrait ? l.height * 0.22 : l.height * 0.27);
    shiftScale = 1 - p * 0.28;
  }

  const underlineW = Math.round(Math.min(box.w, measured.width * 1.04));
  const underlineP = clamp01((f - 4) / 6);

  return (
    <div
      style={{
        position: "absolute",
        left: box.x,
        width: box.w,
        top: box.cy - fontSize * 0.7 + dy + shiftY,
        height: fontSize * 1.4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `scale(${scale * shiftScale}) rotate(${rot}deg)`,
      }}
    >
      <div
        style={{
          position: "relative",
          fontFamily: FONT_FAMILY,
          fontWeight: ev.weight,
          fontSize,
          letterSpacing,
          lineHeight: 1,
          whiteSpace: "nowrap",
          color: color(ev.color),
          textShadow: ev.shadow ? `${fontSize * 0.05}px ${fontSize * 0.06}px 0 ${color(ev.shadow)}` : undefined,
          padding: ev.chip ? `${fontSize * 0.22}px ${fontSize * 0.45}px` : undefined,
          background: ev.chip ? color(ev.ground) : undefined,
          border: ev.chip ? `${Math.max(2, fontSize * 0.04)}px solid ${palette.ink}` : undefined,
          borderRadius: ev.chip ? fontSize * 0.3 : undefined,
        }}
      >
        {ev.text}
        {ev.underline ? (
          <div style={{ position: "absolute", left: (measured.width - underlineW) / 2, top: fontSize * 0.98, width: underlineW, height: 44, clipPath: `inset(0 ${(1 - underlineP) * 100}% 0 0)` }}>
            <Sprite id={`underline-${ev.id}-${underlineW}`} w={underlineW} h={44} draw={underlineFor(ev.underline, underlineW)} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

/** All typeset text, timed from storyboard.json and rendered above the shots. */
export const TextLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const active = storyboard.text.filter((ev) => frame >= sec(ev.start) && frame < sec(ev.end));
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {active.map((ev) => (
        <Word key={ev.id} ev={ev} />
      ))}
    </AbsoluteFill>
  );
};
