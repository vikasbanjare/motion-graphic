/* eslint-disable @remotion/non-pure-animation -- "transition" here is a scene-transition token, not a CSS transition. */
import type { MotionName } from "./themes.ts";

/**
 * Motion tokens: every animation in the kit draws its timing from here, so a
 * whole video moves with one consistent personality. Values are frames at
 * 30 fps.
 */
export type MotionTokens = {
  /** Frames for one element to land. */
  enter: number;
  /** Frames between consecutive words of a headline. */
  wordStagger: number;
  /** Minimum frames between list items / cards. */
  itemStagger: number;
  /** Scene-to-scene transition length. */
  transition: number;
  /** Distance (px at 1080 short side) an element travels on entry. */
  travel: number;
  /** 0 = settle without overshoot, 1 = springy back-out. */
  overshoot: number;
  /** How headline words arrive. */
  wordStyle: "mask" | "rise" | "pop" | "blur";
};

export const MOTION: Record<MotionName, MotionTokens> = {
  snappy: {
    enter: 15,
    wordStagger: 2,
    itemStagger: 7,
    transition: 12,
    travel: 70,
    overshoot: 0,
    wordStyle: "mask",
  },
  smooth: {
    enter: 22,
    wordStagger: 3,
    itemStagger: 10,
    transition: 18,
    travel: 44,
    overshoot: 0,
    wordStyle: "rise",
  },
  // Editorial launch-film feel: short blur-in per word, no overshoot, long holds.
  calm: {
    enter: 15,
    wordStagger: 3,
    itemStagger: 10,
    transition: 10,
    travel: 36,
    overshoot: 0,
    wordStyle: "blur",
  },
  bouncy: {
    enter: 18,
    wordStagger: 3,
    itemStagger: 8,
    transition: 14,
    travel: 90,
    overshoot: 1,
    wordStyle: "pop",
  },
};

export type PaceName = "relaxed" | "normal" | "fast";

/**
 * Reading pace. `wps` = words per second a viewer can comfortably read on a
 * phone while things move (subtitle standards sit around 2.5-3 wps).
 * `hold` = seconds the finished frame rests before the cut.
 */
export const PACE: Record<PaceName, { wps: number; hold: number }> = {
  relaxed: { wps: 2.4, hold: 0.9 },
  normal: { wps: 3.0, hold: 0.6 },
  fast: { wps: 3.6, hold: 0.4 },
};

/** Cubic-bezier control points, shared by the planner docs and motion.ts. */
export const CURVES = {
  /** Expo-out: fast start, long soft landing. Default for entrances. */
  out: [0.16, 1, 0.3, 1],
  /** Material 3 "emphasized decelerate". */
  emphasized: [0.05, 0.7, 0.1, 1],
  /** Symmetric in-out for transitions and camera moves. */
  inOut: [0.65, 0, 0.35, 1],
  /** Accelerate out of frame. */
  in: [0.7, 0, 0.84, 0],
  /** Back-out with ~10% overshoot. */
  overshoot: [0.34, 1.56, 0.64, 1],
} as const;
