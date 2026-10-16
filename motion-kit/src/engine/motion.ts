import type { CSSProperties } from "react";
import { Easing, interpolate, spring } from "remotion";
import { FPS } from "./formats.ts";
import { CURVES, type MotionTokens } from "./tokens.ts";

export const ease = {
  out: Easing.bezier(...CURVES.out),
  emphasized: Easing.bezier(...CURVES.emphasized),
  inOut: Easing.bezier(...CURVES.inOut),
  in: Easing.bezier(...CURVES.in),
  overshoot: Easing.bezier(...CURVES.overshoot),
};

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0 -> 1 between `start` and `start + len`. */
export const prog = (frame: number, start: number, len: number, easing = ease.out) =>
  interpolate(frame, [start, start + Math.max(1, len)], [0, 1], { ...clamp, easing });

/** Entrance progress for the current motion personality (may overshoot past 1). */
export const enterP = (frame: number, start: number, m: MotionTokens, len = m.enter) => {
  if (m.overshoot > 0) {
    // damping 15 / stiffness 100 = ~3% overshoot: lively but text never wobbles.
    return spring({
      frame: frame - start,
      fps: FPS,
      config: { damping: 15, stiffness: 100, mass: 1 },
      durationInFrames: Math.round(len * 1.35),
    });
  }
  return prog(frame, start, len, m.wordStyle === "rise" ? ease.emphasized : ease.out);
};

/** Opacity ramps faster than position so things never look ghosted. */
const fadeIn = (frame: number, start: number, m: MotionTokens) => prog(frame, start, Math.max(4, m.enter * 0.45), ease.out);

/** Velocity-shaped blur: strongest right as an element starts moving. Fakes motion blur. */
const motionBlur = (frame: number, start: number, m: MotionTokens, amount: number) => {
  const p = prog(frame, start, m.enter * 0.7, ease.out);
  return amount * (1 - p);
};

/** Rise up into place. The workhorse entrance. */
export const rise = (frame: number, start: number, m: MotionTokens, u = 1, dist = 1): CSSProperties => {
  const p = enterP(frame, start, m);
  const y = (1 - p) * m.travel * u * dist;
  const blur = motionBlur(frame, start, m, 6 * u);
  return {
    opacity: fadeIn(frame, start, m),
    transform: `translate3d(0, ${y}px, 0)`,
    filter: blur > 0.3 ? `blur(${blur.toFixed(2)}px)` : undefined,
  };
};

/** Slide in horizontally (from -1 left, 1 right). */
export const slideIn = (frame: number, start: number, m: MotionTokens, u = 1, from: -1 | 1 = -1): CSSProperties => {
  const p = enterP(frame, start, m);
  const x = (1 - p) * m.travel * 1.4 * u * from;
  return { opacity: fadeIn(frame, start, m), transform: `translate3d(${x}px, 0, 0)` };
};

/** Scale up from small. Overshoots when the motion personality is bouncy. */
export const pop = (frame: number, start: number, m: MotionTokens, from = 0.6): CSSProperties => {
  // Accents (buttons, badges, markers) may overshoot ~10%; damping 12 / stiffness 100.
  const p =
    m.overshoot > 0
      ? spring({ frame: frame - start, fps: FPS, config: { damping: 12, stiffness: 100 }, durationInFrames: Math.round(m.enter * 1.4) })
      : prog(frame, start, m.enter, ease.overshoot);
  const s = from + (1 - from) * p;
  return { opacity: fadeIn(frame, start, m), transform: `scale(${s.toFixed(4)})` };
};

/** Gentle zoom-in from slightly larger with blur. Premium "focus pull". */
export const focus = (frame: number, start: number, m: MotionTokens, u = 1): CSSProperties => {
  const p = prog(frame, start, m.enter * 1.3, ease.emphasized);
  const s = 1.12 - 0.12 * p;
  const blur = (1 - p) * 14 * u;
  return {
    opacity: prog(frame, start, m.enter * 0.6),
    transform: `scale(${s.toFixed(4)})`,
    filter: blur > 0.3 ? `blur(${blur.toFixed(2)}px)` : undefined,
  };
};

/** Continuous subtle float so held frames never feel frozen. */
export const drift = (frame: number, amp: number, speed = 1, phase = 0) =>
  Math.sin((frame / FPS) * speed * 1.3 + phase) * amp;

/** Count-up for strings like "₹50,000", "87%", "3.5x", "10M+". */
export const countUp = (value: string, p: number) => {
  const m = value.match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!m) return value;
  const [, pre, num, post] = m;
  const target = parseFloat(num.replace(/,/g, ""));
  const decimals = (num.split(".")[1] ?? "").length;
  const current = target * Math.min(1, Math.max(0, p));
  let text = current.toFixed(decimals);
  if (num.includes(",")) {
    const [int, dec] = text.split(".");
    // Indian grouping when the input used it (50,00,000), else western.
    const indian = /\d,\d\d,\d{3}/.test(num);
    const grouped = indian
      ? int.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")
      : int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    text = dec ? `${grouped}.${dec}` : grouped;
  }
  return `${pre}${text}${post}`;
};
