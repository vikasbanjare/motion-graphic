import { spring, type SpringConfig } from "remotion";
import { FPS } from "../timing";

/**
 * Motion vocabulary distilled from the reference study (docs/REFERENCE_STUDY.md)
 * and the 12 principles: springs with overshoot, anticipation, arcs,
 * squash & stretch, overlapping action and moving holds.
 */

// ── Cadence ──────────────────────────────────────────────────────────────────
/** Drawings per second. The reference is 24 fps on twos → 12 drawings/s (2-3-2-3 holds at 30 fps). */
export const DRAWINGS_PER_SECOND = 12;

/**
 * Beat-locked twos. 12 drawings/s doesn't divide a 150 BPM beat (12 frames),
 * so a free-running step clock only lines up with the beat every 2 s. Instead
 * the step clock re-phases on every beat: drawings start at beat-relative
 * frames 0, 2, 5, 7, 10 (holds 2-3-2-3-2), so the beat frame itself is always
 * a new drawing and impact poses land exactly on the hit.
 */
const BEAT = 12;
const STEPS = [0, 2, 5, 7, 10];
export const drawnFrame = (f: number): number => {
  const b = Math.floor(f / BEAT) * BEAT;
  const k = f - b;
  let s = 0;
  for (const st of STEPS) if (st <= k) s = st;
  return b + s;
};

// ── Springs ──────────────────────────────────────────────────────────────────
export const SPRINGS = {
  /**
   * Restraint (pro launch films ban "bouncy" easing): entrances settle with
   * ≤ ~3% overshoot; only impact objects (snap) are allowed a visible kick.
   */
  /** Entrances: ~3% overshoot, settles in ~10 f. */
  pop: { stiffness: 190, damping: 22, mass: 1 },
  /** Heavy objects landing: one small settle. */
  land: { stiffness: 130, damping: 20, mass: 1.5 },
  /** Type, camera, wipes: critically damped, no overshoot. */
  settle: { stiffness: 160, damping: 200, mass: 1 },
  /** Impacts only (stamps, slams, the drop): ~8% kick. */
  snap: { stiffness: 320, damping: 21, mass: 0.8 },
  /** Loose secondary parts (follow-through): a little wobble. */
  loose: { stiffness: 140, damping: 12, mass: 1 },
  /** Drifts. */
  float: { stiffness: 45, damping: 14, mass: 1 },
} satisfies Record<string, Partial<SpringConfig>>;
export type SpringName = keyof typeof SPRINGS;

/** 0 → 1 spring that starts at frame `at`. */
export const sp = (f: number, at = 0, preset: SpringName = "pop"): number =>
  f < at ? 0 : spring({ frame: f - at, fps: FPS, config: SPRINGS[preset] });

/**
 * Anticipation + main action: for `windup` frames before `at` the value dips
 * by `amount` against the move, then springs to 1 (with overshoot).
 * Returns progress in roughly [-amount, 1+overshoot].
 */
export const antic = (f: number, at: number, windup = 5, amount = 0.12, preset: SpringName = "pop"): number => {
  if (f < at - windup) return 0;
  if (f < at) {
    const t = (f - (at - windup)) / windup;
    return -amount * Math.sin((t * Math.PI) / 2);
  }
  const s = sp(f, at, preset);
  // Release from the wind-up point, not from zero.
  return -amount * (1 - Math.min(1, (f - at) / 3)) * (1 - s) + s;
};

/** Pop-in scale for something appearing from nothing: 0 before `at`, then overshoot to 1. */
export const popIn = (f: number, at: number, preset: SpringName = "pop", from = 0.35): number =>
  f < at ? 0 : from + (1 - from) * sp(f, at, preset);

// ── Space ────────────────────────────────────────────────────────────────────
export type V2 = [number, number];
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** A point on an arc from `a` to `b`; `bow` bends it perpendicular (fraction of distance). */
export const arc = (a: V2, b: V2, t: number, bow = 0.2): V2 => {
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const cx = mx - dy * bow;
  const cy = my + dx * bow;
  const u = 1 - t;
  return [u * u * a[0] + 2 * u * t * cx + t * t * b[0], u * u * a[1] + 2 * u * t * cy + t * t * b[1]];
};

/** Volume-preserving squash & stretch along a velocity (px/frame). */
export const stretch = (vx: number, vy: number, k = 0.012, max = 0.28) => {
  const speed = Math.hypot(vx, vy);
  const s = 1 + Math.min(max, speed * k);
  const angle = (Math.atan2(vy, vx) * 180) / Math.PI;
  return `rotate(${angle}deg) scale(${s}, ${1 / s}) rotate(${-angle}deg)`;
};

/** Impact squash for `len` frames after a landing at `at`: wide and short, then recover. */
export const impact = (f: number, at: number, amount = 0.14, len = 6): string => {
  if (f < at || f >= at + len) return "";
  const t = (f - at) / len;
  const a = amount * Math.sin(Math.PI * (1 - t)) * (1 - t);
  return `scale(${1 + a}, ${1 - a})`;
};

// ── Moving holds ─────────────────────────────────────────────────────────────
/** Smooth deterministic wander (sum of sines) — keeps held objects alive. */
export const wander = (f: number, seed = 0, amp = 1): number =>
  amp * (Math.sin(f / 23 + seed * 1.7) * 0.6 + Math.sin(f / 37 + seed * 3.1) * 0.4);

/** Continuous camera: slow push with drift, the reference's "nothing is ever still". */
export const camera = (f: number, dur: number, opts: { from?: number; to?: number; drift?: number; rot?: number; seed?: number } = {}) => {
  const { from = 1, to = 1.06, drift = 6, rot = 0.6, seed = 0 } = opts;
  const t = Math.min(1, Math.max(0, f / dur));
  const scale = from + (to - from) * t;
  return `translate(${wander(f, seed, drift)}px, ${wander(f, seed + 5, drift * 0.6)}px) rotate(${wander(f, seed + 9, rot)}deg) scale(${scale})`;
};

/** Smoothstep-ish ease used for camera moves inside a shot. */
export const easeIO = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));
export const easeIn = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * t);
export const easeOut = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3));
export const clamp = (t: number) => Math.min(1, Math.max(0, t));
