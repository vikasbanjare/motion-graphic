// The music (V1) is 150 BPM, 4/4, half-time feel: one beat = 12 frames,
// one bar = 48 frames at 30 fps. Film 0.0 s is a bar downbeat; the drop is
// bar 11 (16.0 s, frame 480).
export const BPM = 150;
export const FPS = 30;
export const BEAT_FRAMES = (60 / BPM) * FPS; // 12
export const BAR_FRAMES = BEAT_FRAMES * 4; // 48

/** Seconds → frame (rounded to the nearest frame). */
export const sec = (s: number): number => Math.round(s * FPS);
/** 1-based beat number → frame of its downbeat. beat(1) = 0. */
export const beat = (n: number): number => (n - 1) * BEAT_FRAMES;
/** 1-based bar number → frame of its downbeat. bar(11) = 480. */
export const bar = (n: number): number => (n - 1) * BAR_FRAMES;

/** Hold a value for `every` frames. */
export const stepped = (frame: number, every: number): number => Math.floor(frame / every) * every;

/** Easing curves from the animation spec (§6). */
export const easeInOut = (t: number): number => {
  // cubic-bezier(0.4, 0, 0.2, 1) approximated by a solved bezier.
  return cubicBezier(0.4, 0, 0.2, 1)(t);
};
export const expoOut = (t: number): number => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Pop: 1.0 → 1.12 → 1.0 over 8 frames, `f` = frames since the hit. */
export const pop = (f: number, peak = 1.12, length = 8): number => {
  if (f < 0 || f >= length) return 1;
  const half = length / 2;
  return f < half ? 1 + (peak - 1) * (f / half) : peak - (peak - 1) * ((f - half) / half);
};

/** Pop-in from nothing: scale 0 → peak → 1 over `length` frames. */
export const popIn = (f: number, peak = 1.12, length = 8): number => {
  if (f < 0) return 0;
  if (f >= length) return 1;
  const half = length / 2;
  return f < half ? peak * (f / half) : peak - (peak - 1) * ((f - half) / half);
};

export const clamp01 = (t: number): number => Math.min(1, Math.max(0, t));

export function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sy = (t: number) => ((ay * t + by) * t + cy) * t;
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number): number => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 6; i++) {
      const err = sx(t) - x;
      const d = dx(t);
      if (Math.abs(err) < 1e-5 || Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    return sy(t);
  };
}
