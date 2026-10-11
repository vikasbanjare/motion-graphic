import { FPS } from "./formats.ts";
import type { VideoPlan } from "./plan.ts";

/**
 * Music fitting for tracks the user supplies (the kit never generates music):
 * where the track starts, where its beats fall on the video timeline, the
 * level it plays at and how it ducks under narration. Pure functions of the
 * spec and plan, so the render, the checker and the tests agree frame for frame.
 */

/** Loudness most released music is mastered to; `musicVolume` is relative to it. */
export const REF_LUFS = -14;
/** Fade in over 0.4 s from the first frame; fade out over the last 1.5 s. */
export const FADE_IN = Math.round(0.4 * FPS);
export const FADE_OUT = Math.round(1.5 * FPS);
/** Ducking under narration: music drops to `depth` while words are spoken. */
export const DUCKING = { depth: 0.35, attackMs: 120, releaseMs: 450 };

/** How far (frames) a cut may move to land its transition midpoint on the music. */
export type SnapWindow = { beat: number; downbeat: number };
export const SNAP: SnapWindow = { beat: 7, downbeat: 10 };
/** Narrated cuts are anchored to speech, so they barely move. */
export const SNAP_VOICE: SnapWindow = { beat: 4, downbeat: 4 };

export type MusicPlan = {
  src: string;
  /** Frame of the music file the video opens on (`audio.musicStart`); the audio is trimmed there. */
  startFrame: number;
  /** Level after loudness matching, before fades and ducking. */
  volume: number;
  /** Beats and downbeats on the video timeline (frames), repeating when the track loops. Empty without a beat grid. */
  beats: number[];
  downbeats: number[];
};

/** What `npm run music` writes to public/music/<track>.beats.json. Times are ms from the start of the file. */
export type BeatFile = {
  bpm?: number;
  beats?: number[];
  downbeats?: number[];
  startMs?: number;
  durationMs?: number;
  lufs?: number | null;
};

/** Spec fields filled in from a beats file (like `audio.words` from a timing file). */
export const beatFields = (data: BeatFile) => ({
  beatGrid: Array.isArray(data.beats) ? data.beats : [],
  downbeatGrid: Array.isArray(data.downbeats) ? data.downbeats : [],
  ...(typeof data.durationMs === "number" ? { musicDuration: data.durationMs / 1000 } : {}),
  ...(typeof data.lufs === "number" && Number.isFinite(data.lufs) ? { musicLufs: data.lufs } : {}),
});

/** `audio.musicStart` (seconds) as the whole frame the music is trimmed at. */
export const startFrameOf = (seconds: number | undefined) => Math.max(0, Math.round((seconds ?? 0) * FPS));

/** Gain that brings a track mastered at `lufs` to the reference loudness, at most ±6 dB. */
export const loudnessGain = (lufs: number | undefined) =>
  lufs === undefined || !Number.isFinite(lufs) ? 1 : Math.min(2, Math.max(0.5, 10 ** ((REF_LUFS - lufs) / 20)));

/**
 * Track times (ms from the start of the file) -> frames on the video timeline.
 * The video opens on `startFrame`; when the track runs out before `horizon`
 * it loops from that same point (exactly what the renderer does), so the
 * grid repeats with it.
 */
export const onTimeline = (gridMs: number[], startFrame: number, durationMs: number | undefined, horizon: number): number[] => {
  const startMs = (startFrame / FPS) * 1000;
  const loopMs = durationMs !== undefined && durationMs - startMs >= 1000 ? durationMs - startMs : Infinity;
  // A beat a hair before the trim point still sounds on frame 0.
  const usable = gridMs.filter((ms) => ms >= startMs - 20 && ms < startMs + loopMs).sort((a, b) => a - b);
  const out: number[] = [];
  for (let k = 0; k === 0 || (Number.isFinite(loopMs) && (k * loopMs * FPS) / 1000 < horizon); k++) {
    const offset = k === 0 ? 0 : k * loopMs;
    for (const ms of usable) {
      const f = ((ms - startMs + offset) / 1000) * FPS;
      if (f >= horizon) break;
      out.push(Math.max(0, f));
    }
  }
  return out;
};

/**
 * Shift (frames) that centres a transition on a beat: the nearest downbeat in
 * reach wins, else the nearest beat. `lo`/`hi` bound the shift so scenes keep
 * their order and minimum durations. Ties go to the later beat (more reading time).
 */
export const snapToBeat = (
  mid: number,
  grid: { beats: number[]; downbeats: number[] },
  win: SnapWindow,
  lo = -Infinity,
  hi = Infinity,
): { shift: number; beat: number } | null => {
  const pick = (frames: number[], reach: number) => {
    let best: { shift: number; beat: number } | null = null;
    for (const b of frames) {
      const beat = Math.round(b);
      const shift = beat - mid;
      if (Math.abs(shift) > reach || shift < lo || shift > hi) continue;
      if (!best || Math.abs(shift) < Math.abs(best.shift) || (Math.abs(shift) === Math.abs(best.shift) && shift > best.shift)) best = { shift, beat };
    }
    return best;
  };
  return pick(grid.downbeats, win.downbeat) ?? pick(grid.beats, win.beat);
};

/**
 * Per-frame gain (depth..1) that ducks music under spoken words. Each word
 * opens the duck one attack early, so the music is already down when the word
 * lands; gaps shorter than the release are bridged (the music could not get
 * back up before the next word anyway, and half-swells sound like pumping).
 */
export const duckingCurve = (words: { startMs: number; endMs: number }[], frames: number, o = DUCKING): number[] => {
  const spans: [number, number][] = [];
  for (const w of [...words].sort((a, b) => a.startMs - b.startMs)) {
    const s = w.startMs - o.attackMs;
    const last = spans[spans.length - 1];
    if (last && s - last[1] < o.releaseMs) last[1] = Math.max(last[1], w.endMs);
    else spans.push([s, w.endMs]);
  }
  const msPerFrame = 1000 / FPS;
  const down = ((1 - o.depth) * msPerFrame) / o.attackMs;
  const up = ((1 - o.depth) * msPerFrame) / o.releaseMs;
  const out: number[] = [];
  let g = 1;
  let j = 0;
  for (let f = 0; f < frames; f++) {
    const t = f * msPerFrame;
    while (j < spans.length && spans[j][1] < t) j++;
    const target = j < spans.length && spans[j][0] <= t ? o.depth : 1;
    g = target < g ? Math.max(target, g - down) : Math.min(target, g + up);
    out.push(g);
  }
  return out;
};

/** Music level per frame: loudness-matched volume × fades × ducking under narration. */
export const musicCurve = (plan: Pick<VideoPlan, "music" | "voice" | "durationInFrames" | "spec">): ((frame: number) => number) => {
  const m = plan.music;
  if (!m) return () => 0;
  const total = plan.durationInFrames;
  const fadeIn = Math.max(1, Math.min(FADE_IN, Math.floor(total / 4)));
  const fadeOut = Math.max(1, Math.min(FADE_OUT, Math.floor(total / 3)));
  const duck = plan.voice && plan.spec.audio.voiceover ? duckingCurve(plan.voice.tokens, total) : null;
  return (frame) => {
    const f = Math.round(frame);
    if (f < 0 || f >= total) return 0;
    const fade = Math.min(1, f / fadeIn, (total - 1 - f) / fadeOut);
    return m.volume * Math.max(0, fade) * (duck ? (duck[f] ?? 1) : 1);
  };
};
