import { useContext } from "react";
import { useCurrentFrame } from "remotion";
import { PlanContext, SceneContext } from "./context.ts";
import { FPS } from "./formats.ts";

/**
 * 0..1 "is the narrator speaking right now", smoothed over a few frames.
 * Driven by word timings (real or estimated), so orbs and waveforms react to
 * the voice deterministically without analysing audio.
 */
export const useSpeechLevel = (smoothing = 4) => {
  const frame = useCurrentFrame();
  const plan = useContext(PlanContext);
  const scene = useContext(SceneContext);
  const tokens = plan?.voice?.tokens;
  if (!tokens || !scene) return 0;
  const abs = scene.from + frame;
  let sum = 0;
  for (let k = -smoothing; k <= smoothing; k++) {
    const ms = ((abs + k) / FPS) * 1000;
    // Binary search would be faster; videos have < 300 words, so linear is fine.
    if (tokens.some((t) => ms >= t.startMs - 30 && ms <= t.endMs + 30)) sum += 1;
  }
  return sum / (smoothing * 2 + 1);
};

/** Deterministic organic wobble in [-1, 1]. */
export const wobble = (frame: number, seed: number, speed = 1) =>
  Math.sin(frame * 0.21 * speed + seed * 1.7) * 0.6 + Math.sin(frame * 0.087 * speed + seed * 4.3) * 0.4;
