/* eslint-disable @remotion/non-pure-animation -- "transition" here is a scene-transition setting, not a CSS transition. */
import { FORMATS, FPS, type Format } from "./formats.ts";
import { countWords, plainText, richWords } from "./rich.ts";
import type { Scene, SceneOf, SceneType, VideoSpec } from "./schema.ts";
import { THEMES, withBrand, type Theme, type TransitionName } from "./themes.ts";
import { MOTION, PACE, type MotionTokens } from "./tokens.ts";
import { buildVoiceTrack, showTimes, type TimedWord, type VoiceTrack } from "./voice.ts";
import { SNAP, SNAP_VOICE, loudnessGain, onTimeline, snapToBeat, startFrameOf, type MusicPlan } from "./music.ts";

/**
 * The planner turns a spec into an exact timeline: when every element of
 * every scene enters, how long each scene holds, where sound effects land.
 * Scene components only read these beats, so timing rules live in one place
 * and the CLI checker can reason about a video without rendering it.
 */

export type SfxName =
  | "whoosh"
  | "whoosh-soft"
  | "pop"
  | "click"
  | "impact"
  | "riser"
  | "ding"
  | "typing";

export type Cue = { at: number; sfx: SfxName; volume: number; duration?: number };

type Ctx = {
  m: MotionTokens;
  wps: number;
  lead: number;
  /**
   * Scene-relative frame where `text` starts being spoken (voice sync), or
   * `fallback` when there is no narration for it.
   */
  at: (text: string | undefined, fallback: number) => number;
  /** Per-word start frames for `text`: spoken times when available, else a cascade. */
  words: (text: string, start: number, gap: number) => number[];
};

type Planned<B> = {
  beats: B;
  /** Frame (scene-relative) when the last element has landed. */
  entryEnd: number;
  /** Text still to be read from `readFrom` onward. */
  read: (string | undefined)[];
  readFrom: number;
  cues: Cue[];
};

const seq = (n: number, start: number, gap: number) => Array.from({ length: n }, (_, i) => start + i * gap);

const DEVANAGARI = /[\u0900-\u097F]/;

/**
 * Frames a viewer needs to read some text: the larger of a words-per-second
 * budget and the Netflix-style 17 characters/second rule; Hindi gets +15%.
 */
export const readTime = (texts: (string | undefined)[], wps: number) => {
  const t = texts.filter((x): x is string => Boolean(x));
  const words = countWords(...t);
  if (!words) return 0;
  const chars = t.map((x) => plainText(x)).join(" ").length;
  const cps = 17 * (wps / 3);
  const seconds = Math.max(words / wps, chars / cps);
  return Math.round(seconds * FPS * (t.some((x) => DEVANAGARI.test(x)) ? 1.15 : 1));
};
const headlineWords = (s: string) => richWords(s).filter((w) => w !== "\n").length;

/** Items that appear one after another, each no earlier than when it is spoken. */
const chain = (texts: string[], start: number, gap: number, at: Ctx["at"]) => {
  const out: number[] = [];
  texts.forEach((t, i) => {
    const fallback = i === 0 ? start : out[i - 1] + gap;
    out.push(i === 0 ? Math.max(start, at(t, start)) : Math.max(out[i - 1] + 3, at(t, fallback)));
  });
  return out;
};

const PLANNERS = {
  title: (s: SceneOf<"title">, { m, lead, at, words: wordsAt }: Ctx) => {
    const kicker = at(s.kicker, lead);
    const first = Math.max(kicker + (s.kicker ? 6 : 0), at(s.headline, lead + (s.kicker ? 6 : 0)));
    const n = headlineWords(s.headline);
    const words = wordsAt(s.headline, first, m.wordStagger);
    const sub = Math.max(words[n - 1] + 4, at(s.sub, words[n - 1] + Math.round(m.enter * 0.6)));
    const entryEnd = (s.sub ? sub : words[n - 1]) + m.enter;
    return {
      beats: { kicker, words, sub },
      entryEnd,
      read: [s.kicker, s.headline, s.sub],
      readFrom: lead,
      cues: [] as Cue[],
    };
  },

  hook: (s: SceneOf<"hook">, { m, lead, at, words: wordsAt }: Ctx) => {
    const setup = at(s.setup, lead);
    const strike = Math.max(setup + (s.setup ? 5 : 0), at(s.strike, lead + (s.setup ? 5 : 0)));
    const strikeLine = s.strike ? strike + m.enter + 4 : strike;
    const punch = Math.max(s.strike ? strikeLine + 8 : strike, at(s.punch, s.strike ? strikeLine + 14 : strike));
    const n = headlineWords(s.punch);
    const punchWords = wordsAt(s.punch, punch, m.wordStagger + 1);
    const landed = punchWords[n - 1] + m.enter;
    const cues: Cue[] = [];
    if (s.strike) cues.push({ at: strikeLine, sfx: "whoosh-soft", volume: 0.5 });
    cues.push({ at: punch + 2, sfx: "impact", volume: 0.7 });
    return {
      beats: { setup, strike, strikeLine, punch: punchWords },
      entryEnd: landed,
      read: [s.setup, s.strike, s.punch],
      readFrom: lead,
      cues,
    };
  },

  kinetic: (s: SceneOf<"kinetic">, { m, wps, lead, at }: Ctx) => {
    // Each phrase starts when it is spoken (or after the previous one is read).
    const starts: number[] = [];
    let t = lead;
    s.lines.forEach((line, i) => {
      const start = i === 0 ? at(line, lead) : Math.max(starts[i - 1] + 12, at(line, t));
      starts.push(start);
      t = start + Math.max(18, readTime([line], wps) + 10);
    });
    const lines = starts.map((start, i) => ({ start, end: i === starts.length - 1 ? start : starts[i + 1] }));
    const last = lines[lines.length - 1];
    return {
      beats: { lines },
      entryEnd: last.start + m.enter,
      read: [s.lines[s.lines.length - 1]],
      readFrom: last.start,
      cues: lines.map((l, i) => ({ at: l.start, sfx: (i === 0 ? "whoosh-soft" : "pop") as SfxName, volume: 0.45 })),
    };
  },

  stat: (s: SceneOf<"stat">, { m, lead, at }: Ctx) => {
    const kicker = at(s.kicker, lead);
    const count = Math.max(kicker + (s.kicker ? 6 : 0), at(s.value, lead + (s.kicker ? 6 : 0)));
    const countEnd = count + 32;
    const label = Math.max(count + 10, at(s.label, count + 14));
    return {
      beats: { kicker, count, countEnd, label },
      entryEnd: Math.max(countEnd, label + m.enter),
      read: [s.kicker, s.value, s.label],
      readFrom: lead,
      cues: [{ at: countEnd - 2, sfx: "impact", volume: 0.55 }] as Cue[],
    };
  },

  list: (s: SceneOf<"list">, { m, wps, lead, at }: Ctx) => {
    const title = at(s.title, lead);
    let t = title + (s.title ? Math.max(m.itemStagger + 6, readTime([s.title], wps) * 0.6) : 0);
    let prev = title;
    const items = s.items.map((item, i) => {
      const f = Math.max(i === 0 && !s.title ? prev : prev + m.itemStagger, at(item, Math.round(t)));
      t = f + Math.min(45, Math.max(m.itemStagger + 4, readTime([item], wps) * 0.75));
      prev = f;
      return f;
    });
    const lastAt = items[items.length - 1];
    return {
      beats: { title, items },
      entryEnd: lastAt + m.enter,
      read: [s.items[s.items.length - 1]],
      readFrom: lastAt,
      cues: items.map((at) => ({ at, sfx: "click" as SfxName, volume: 0.4 })),
    };
  },

  compare: (s: SceneOf<"compare">, { m, lead, at }: Ctx) => {
    const title = at(s.title, lead);
    const leftLabel = Math.max(title + (s.title ? 8 : 0), at(s.left.label, lead + (s.title ? 10 : 0)));
    const left = chain(s.left.items, leftLabel + 6, m.itemStagger, at);
    const rightLabel = Math.max(left[left.length - 1] + 6, at(s.right.label, left[left.length - 1] + m.itemStagger + 8));
    const right = chain(s.right.items, rightLabel + 6, m.itemStagger, at);
    return {
      beats: { title, leftLabel, left, rightLabel, right },
      entryEnd: right[right.length - 1] + m.enter,
      read: [s.title, s.left.label, s.right.label, ...s.left.items, ...s.right.items],
      readFrom: lead,
      cues: [
        { at: leftLabel, sfx: "click", volume: 0.35 },
        { at: rightLabel, sfx: "pop", volume: 0.5 },
      ] as Cue[],
    };
  },

  quote: (s: SceneOf<"quote">, { m, lead, at }: Ctx) => {
    const mark = lead;
    const quote = Math.max(lead + 4, at(s.quote, lead + 6));
    const author = Math.max(quote + m.enter, at(s.author, quote + m.enter + 10));
    const stars = seq(s.rating ?? 0, author + 6, 3);
    return {
      beats: { mark, quote, author, stars },
      entryEnd: (stars.length ? stars[stars.length - 1] : author) + m.enter,
      read: [s.quote, s.author, s.role],
      readFrom: quote,
      cues: [{ at: mark, sfx: "pop", volume: 0.4 }] as Cue[],
    };
  },

  chat: (s: SceneOf<"chat">, { m, lead, at }: Ctx) => {
    const box = lead;
    const typeStart = Math.max(lead + 6, at(s.prompt, lead + 8));
    // Typing reads as "fast AI" at ~30 chars/s; long prompts are sped up so they never drag.
    const typeLen = Math.round(Math.min(75, Math.max(24, s.prompt.length)));
    const typeEnd = typeStart + typeLen;
    const reply = Math.max(typeEnd + 6, at(s.reply, typeEnd + 10));
    const cues: Cue[] = [{ at: typeStart, sfx: "typing", volume: 0.35, duration: typeLen }];
    if (s.reply) cues.push({ at: reply, sfx: "pop", volume: 0.5 });
    return {
      beats: { box, typeStart, typeEnd, reply },
      entryEnd: (s.reply ? reply : typeEnd) + m.enter,
      read: s.reply ? [s.reply] : [s.prompt],
      readFrom: s.reply ? reply : typeStart,
      cues,
    };
  },

  bars: (s: SceneOf<"bars">, { lead, at }: Ctx) => {
    const title = at(s.title, lead);
    const bars = chain(s.bars.map((b) => b.label), title + (s.title ? 10 : 2), 4, at);
    const grow = 26;
    return {
      beats: { title, bars, grow },
      entryEnd: bars[bars.length - 1] + grow,
      read: [s.title, ...s.bars.map((b) => b.label)],
      readFrom: lead,
      cues: [
        { at: bars[0], sfx: "whoosh-soft", volume: 0.4 },
        { at: bars[bars.length - 1] + grow, sfx: "pop", volume: 0.45 },
      ] as Cue[],
    };
  },

  grid: (s: SceneOf<"grid">, { m, lead, at }: Ctx) => {
    const title = at(s.title, lead);
    const items = chain(s.items.map((i) => i.label), title + (s.title ? 10 : 0), m.itemStagger, at);
    return {
      beats: { title, items },
      entryEnd: items[items.length - 1] + m.enter,
      read: [s.title, ...s.items.flatMap((i) => [i.label, i.sub])],
      readFrom: lead,
      cues: items.map((at) => ({ at, sfx: "pop" as SfxName, volume: 0.3 })),
    };
  },

  image: (s: SceneOf<"image">, { m, lead, at }: Ctx) => {
    const image = 0;
    const kicker = at(s.kicker, lead + 4);
    const caption = Math.max(kicker + (s.kicker ? 6 : 0), at(s.caption, lead + (s.kicker ? 10 : 6)));
    return {
      beats: { image, kicker, caption },
      entryEnd: Math.max(caption + m.enter, 75),
      read: [s.kicker, s.caption],
      readFrom: caption,
      cues: [] as Cue[],
    };
  },

  clip: (s: SceneOf<"clip">, { m, lead, at }: Ctx) => {
    const kicker = at(s.kicker, lead + 4);
    const caption = Math.max(kicker + (s.kicker ? 6 : 0), at(s.caption, lead + (s.kicker ? 10 : 6)));
    return {
      beats: { kicker, caption },
      entryEnd: Math.max(caption + m.enter, 60),
      read: [s.kicker, s.caption],
      readFrom: caption,
      cues: [] as Cue[],
    };
  },

  orb: (s: SceneOf<"orb">, { m, lead, at, words: wordsAt }: Ctx) => {
    const orb = Math.min(0, lead);
    const kicker = at(s.kicker, lead + 10);
    const first = Math.max(kicker + (s.kicker ? 6 : 0), at(s.headline, lead + (s.kicker ? 16 : 12)));
    const n = s.headline ? headlineWords(s.headline) : 0;
    const words = s.headline ? wordsAt(s.headline, first, m.wordStagger) : [];
    const lastWord = n ? words[n - 1] : first;
    const sub = Math.max(lastWord + 4, at(s.sub, lastWord + Math.round(m.enter * 0.6)));
    return {
      beats: { orb, kicker, words, sub },
      entryEnd: Math.max(45, (s.sub ? sub : lastWord) + m.enter),
      read: [s.kicker, s.headline, s.sub],
      readFrom: lead,
      cues: [{ at: Math.max(0, orb), sfx: "riser", volume: 0.25 }] as Cue[],
    };
  },

  wave: (s: SceneOf<"wave">, { m, lead, words: wordsAt }: Ctx) => {
    const text = s.text ?? s.say ?? "";
    const label = lead;
    const bars = lead + 4;
    // Karaoke: each word lights up as it is spoken (or at a natural speaking pace).
    const words = text ? wordsAt(text, lead + 10, Math.round(FPS / 2.6)) : [];
    const lastWord = words.length ? words[words.length - 1] : bars;
    return {
      beats: { label, bars, words },
      entryEnd: Math.max(bars + 30, lastWord + m.enter),
      read: [s.label],
      readFrom: lead,
      cues: [] as Cue[],
    };
  },

  prompt: (s: SceneOf<"prompt">, { m, lead, at }: Ctx) => {
    const card = lead;
    const typeStart = Math.max(lead + 6, at(s.prompt, lead + 8));
    // ~2 characters per frame: fast enough to feel like a demo, slow enough to read.
    const typeLen = Math.round(Math.min(60, Math.max(18, s.prompt.length / 2)));
    const typeEnd = typeStart + typeLen;
    const cursor = typeEnd + 4;
    const click = cursor + 22;
    const result = Math.max(click + 24, at(s.result, click + 28));
    const cues: Cue[] = [
      { at: typeStart, sfx: "typing", volume: 0.3, duration: typeLen },
      { at: click, sfx: "click", volume: 0.55 },
    ];
    if (s.result) cues.push({ at: result, sfx: "pop", volume: 0.4 });
    return {
      beats: { card, typeStart, typeEnd, cursor, click, result },
      entryEnd: (s.result ? result : click + 10) + m.enter,
      read: s.result ? [s.result] : [s.prompt],
      readFrom: s.result ? result : typeStart,
      cues,
    };
  },

  cta: (s: SceneOf<"cta">, { m, lead, at }: Ctx) => {
    const kicker = at(s.kicker, lead);
    const action = Math.max(kicker + (s.kicker ? 6 : 0), at(s.action, lead + (s.kicker ? 8 : 0)));
    const sub = Math.max(action + 8, at(s.sub, action + 14));
    const handle = Math.max(sub + 6, at(s.handle, sub + 10));
    return {
      beats: { kicker, action, sub, handle },
      entryEnd: (s.handle ? handle : s.sub ? sub : action) + m.enter,
      read: [s.kicker, s.action, s.sub, s.handle],
      readFrom: lead,
      cues: [
        { at: action + 2, sfx: "pop", volume: 0.55 },
        { at: action + 6, sfx: "ding", volume: 0.35 },
      ] as Cue[],
    };
  },

  logo: (s: SceneOf<"logo">, { m, lead, at }: Ctx) => {
    const logo = lead;
    const name = Math.max(lead + (s.src ? 8 : 0), at(s.name, lead + (s.src ? 10 : 0)));
    const tagline = Math.max(name + 10, at(s.tagline, name + 16));
    return {
      beats: { logo, name, tagline },
      entryEnd: (s.tagline ? tagline : name) + m.enter,
      read: [s.name, s.tagline],
      readFrom: lead,
      cues: [{ at: name + 4, sfx: "impact", volume: 0.45 }] as Cue[],
    };
  },
} satisfies { [K in SceneType]: (s: SceneOf<K>, ctx: Ctx) => Planned<unknown> };

export type BeatsFor<T extends SceneType> = ReturnType<(typeof PLANNERS)[T]>["beats"];

export type ScenePlan = {
  index: number;
  scene: Scene;
  /** Absolute start frame in the full video. */
  from: number;
  duration: number;
  /** Frames the scene spends just being readable after everything landed. */
  readable: number;
  /** Shortest duration that still lets the viewer read everything (frames). */
  minReadable: number;
  /** Voice mode: the narration for this beat is too short for its animation. */
  squeezed: boolean;
  /**
   * Absolute frame of the music beat this scene's incoming transition is
   * centred on (its whoosh peaks there). Only when the cut was snapped.
   */
  onBeat?: number;
  beats: unknown;
  cues: Cue[];
};

export type ResolvedSpec = Required<Pick<VideoSpec, "format" | "theme" | "motion" | "pace" | "progressBar">> & {
  transition: TransitionName;
  brand: NonNullable<VideoSpec["brand"]>;
  audio: {
    sfx: boolean;
    music?: string;
    musicVolume: number;
    /** Seconds into the music file. */
    musicStart: number;
    voiceover?: string;
    words?: TimedWord[];
    beatGrid?: number[];
    downbeatGrid?: number[];
    musicDuration?: number;
    musicLufs?: number;
  };
  scenes: Scene[];
};

export type VideoPlan = {
  spec: ResolvedSpec;
  theme: Theme;
  format: Format;
  motion: MotionTokens;
  transitionFrames: number;
  scenes: ScenePlan[];
  /** Transition cues and other video-level sounds (absolute frames). */
  cues: Cue[];
  durationInFrames: number;
  /** Present when scenes have `say` lines. `estimated` = no real voice-over timing yet. */
  voice: VoiceTrack | null;
  /** Present when the spec has music: trim point, level and (with a beat grid) beats on the timeline. */
  music: MusicPlan | null;
};

export const resolveSpec = (spec: VideoSpec): ResolvedSpec => {
  const theme = THEMES[spec.theme ?? "midnight"];
  const transition = spec.transition && spec.transition !== "auto" ? spec.transition : theme.transition;
  return {
    format: spec.format ?? "reel",
    theme: theme.name,
    motion: spec.motion ?? theme.motion,
    pace: spec.pace ?? "normal",
    progressBar: spec.progressBar ?? false,
    transition,
    brand: spec.brand ?? {},
    audio: {
      sfx: spec.audio?.sfx ?? true,
      music: spec.audio?.music,
      // Narrated music is ducked while words are spoken, so its bed can sit
      // higher between lines; a voice-over without `say` lines gets a flat, low bed.
      musicVolume: spec.audio?.musicVolume ?? (spec.audio?.voiceover ? (spec.scenes.some((s) => s.say) ? 0.15 : 0.08) : 0.2),
      musicStart: spec.audio?.musicStart ?? 0,
      voiceover: spec.audio?.voiceover,
      words: spec.audio?.words,
      beatGrid: spec.audio?.beatGrid,
      downbeatGrid: spec.audio?.downbeatGrid,
      musicDuration: spec.audio?.musicDuration,
      musicLufs: spec.audio?.musicLufs,
    },
    scenes: spec.scenes,
  };
};

const LAST_HOLD = 24;
/** No scene is shorter than this (frames), however little it says. */
const MIN_SCENE = Math.round(1.3 * FPS);
/** Start an element's entrance this many frames before its word is spoken, so it lands on the word. */
const REVEAL_LEAD = 3;
const toFrame = (ms: number) => Math.round((ms / 1000) * FPS);

export const planVideo = (input: VideoSpec): VideoPlan => {
  const spec = resolveSpec(input);
  const theme = withBrand(THEMES[spec.theme], spec.brand);
  const format = FORMATS[spec.format];
  const motion = MOTION[spec.motion];
  const pace = PACE[spec.pace];
  const T = spec.transition === "cut" ? 0 : motion.transition;
  const n = spec.scenes.length;
  const holdFrames = Math.round(pace.hold * FPS);
  const sfxScale = spec.audio.voiceover ? 0.6 : 1;

  const voice = buildVoiceTrack(
    spec.scenes.map((sc) => sc.say),
    spec.audio.words,
  );

  // Frame 0 is the thumbnail and the hook: the first scene starts already
  // mid-entrance so there is never an empty first frame.
  const leadOf = (i: number) => (i === 0 ? -Math.round(motion.enter * 0.6) : Math.round(T * 0.55));
  const noSync: Pick<Ctx, "at" | "words"> = {
    at: (_t, fallback) => fallback,
    words: (text, start, gap) => seq(headlineWords(text), start, gap),
  };
  const run = (i: number, sync: Pick<Ctx, "at" | "words">) =>
    (PLANNERS[spec.scenes[i].type] as (s: Scene, c: Ctx) => Planned<unknown>)(spec.scenes[i], {
      m: motion,
      wps: pace.wps,
      lead: leadOf(i),
      ...sync,
    });
  const contentOf = (i: number, p: Planned<unknown>) => {
    const scene = spec.scenes[i];
    const minReadable = Math.max(p.entryEnd + 6, p.readFrom + readTime(p.read, pace.wps)) + holdFrames;
    const content = scene.duration
      ? Math.max(Math.round(scene.duration * FPS), p.entryEnd + 6)
      : Math.max(minReadable, MIN_SCENE);
    return { minReadable, content };
  };

  // Reading-paced plan for every scene: the timeline without voice, and the
  // fallback for scenes that have no narration.
  const base = spec.scenes.map((_, i) => run(i, noSync));
  const baseContent = base.map((p, i) => contentOf(i, p));

  const froms: number[] = new Array(n).fill(0);
  const durations: number[] = new Array(n).fill(0);

  // Music beats on the video timeline. Cuts snap to them: each transition's
  // midpoint (where its whoosh peaks) moves onto the nearest beat in reach,
  // downbeats first. Scene 1 always starts at frame 0.
  const musicMs = spec.audio.musicDuration === undefined ? undefined : spec.audio.musicDuration * 1000;
  // A start past the end of a known track would leave nothing to play (the checker flags it): play from the top.
  const musicStartFrame = startFrameOf(musicMs !== undefined && spec.audio.musicStart * 1000 > musicMs - 1000 ? 0 : spec.audio.musicStart);
  const horizon = Math.max(voice ? toFrame(voice.endMs) : 0, baseContent.reduce((a, c) => a + c.content, 0)) + n * 30 + 10 * FPS;
  const grid =
    spec.audio.music && spec.audio.beatGrid?.length
      ? {
          beats: onTimeline(spec.audio.beatGrid, musicStartFrame, musicMs, horizon),
          downbeats: onTimeline(spec.audio.downbeatGrid ?? [], musicStartFrame, musicMs, horizon),
        }
      : null;
  const onBeat: (number | undefined)[] = new Array(n).fill(undefined);
  const mid = Math.round(T / 2);

  if (!voice) {
    let from = 0;
    for (let i = 0; i < n; i++) {
      if (grid && i > 0) {
        // Moving this cut changes only the previous scene's length (later scenes
        // follow). An earlier cut may take at most half of the resting hold,
        // never reading time, and no scene drops under its minimum length.
        const prev = baseContent[i - 1];
        const floor = Math.min(prev.content, Math.max(prev.minReadable - Math.floor(holdFrames / 2), base[i - 1].entryEnd + 6, MIN_SCENE));
        const hit = snapToBeat(from + mid, grid, SNAP, floor - prev.content);
        if (hit) {
          from += hit.shift;
          durations[i - 1] += hit.shift;
          onBeat[i] = hit.beat;
        }
      }
      froms[i] = from;
      durations[i] = baseContent[i].content + (i === n - 1 ? LAST_HOLD : T);
      from += durations[i] - T;
    }
  } else {
    // Cut on the spoken beat: each scene starts so its first element lands as
    // its first word is said.
    const anchor = voice.sceneStartMs.map((ms) => (ms === undefined ? undefined : toFrame(ms)));
    const known: (number | undefined)[] = anchor.map((a, i) => (i === 0 ? 0 : a === undefined ? undefined : a - REVEAL_LEAD - leadOf(i)));
    const lastVoiced = anchor.reduce<number>((acc, a, i) => (a !== undefined ? i : acc), 0);
    const voiceEnd = (i: number) => toFrame(voice.sceneEndMs[i] ?? voice.endMs);
    for (let i = 1; i < n; i++) {
      if (known[i] !== undefined) continue;
      if (i > lastVoiced) {
        // Silent scenes after the narration: start once the voice has finished.
        // The last spoken beat keeps its full reading time; nothing is waiting to be said.
        known[i] =
          i === lastVoiced + 1
            ? Math.max((known[i - 1] ?? 0) + T + 15, voiceEnd(lastVoiced) + 8 - leadOf(i), (known[i - 1] ?? 0) + baseContent[i - 1].content)
            : (known[i - 1] as number) + baseContent[i - 1].content;
        continue;
      }
      // Silent scene between two narrated ones: share the gap by estimated weight.
      let j = i;
      while (j < n && known[j] === undefined) j++;
      const a = known[i - 1] as number;
      const b = known[j] as number;
      const weights = baseContent.slice(i - 1, j).map((c) => c.content);
      const sum = weights.reduce((x, y) => x + y, 0);
      let acc = 0;
      for (let k = i; k < j; k++) {
        acc += weights[k - i];
        known[k] = Math.round(a + ((b - a) * acc) / sum);
      }
    }
    for (let i = 0; i < n; i++) froms[i] = Math.max(i === 0 ? 0 : froms[i - 1] + T + 15, known[i] as number);
  }

  const syncFor = (i: number): Pick<Ctx, "at" | "words"> => {
    if (!voice) return noSync;
    const from = froms[i];
    return {
      at: (text, fallback) => {
        if (!text) return fallback;
        const first = showTimes(voice, i, text).find((t) => t !== undefined);
        if (first === undefined) return fallback;
        const f = toFrame(first) - from - REVEAL_LEAD;
        // Scene 1 must show something on frame 0.
        return i === 0 && f < 15 ? leadOf(0) : f;
      },
      words: (text, start, gap) => {
        const count = headlineWords(text);
        const times = showTimes(voice, i, text).slice(0, count);
        if (!times.some((t) => t !== undefined)) return seq(count, start, gap);
        const out: number[] = [];
        for (let k = 0; k < count; k++) {
          const t = times[k];
          let spoken = t === undefined ? undefined : toFrame(t) - from - REVEAL_LEAD;
          // Scene 1's opening word must already be on screen at frame 0 (the thumbnail).
          if (i === 0 && k === 0 && spoken !== undefined && spoken < 15) spoken = Math.min(start, leadOf(0));
          const prev = k === 0 ? start - gap : out[k - 1];
          out.push(k === 0 && spoken !== undefined && i === 0 ? spoken : Math.max(k === 0 ? start : prev + 1, spoken ?? prev + gap));
        }
        return out;
      },
    };
  };

  // Plan scenes in order. In voice mode, if a beat's narration ends before
  // its last element has been readable for a moment, nudge the next cut
  // later (max 0.3s) instead of cutting away from unread text.
  const plans: Planned<unknown>[] = [];
  for (let i = 0; i < n; i++) {
    if (voice && grid && i > 0) {
      // Narrated cuts sit on the spoken word, so they move only a few frames,
      // never shortening the previous beat below what it needs or crowding the next.
      const gap = froms[i] - froms[i - 1];
      const lo = Math.max(T + 15, Math.min(gap, plans[i - 1].entryEnd + 10)) - gap;
      const hi = i < n - 1 ? froms[i + 1] - froms[i] - (T + 15) : Infinity;
      const hit = snapToBeat(froms[i] + mid, grid, SNAP_VOICE, lo, hi);
      if (hit) {
        froms[i] += hit.shift;
        onBeat[i] = hit.beat;
      }
    }
    const p = voice ? run(i, syncFor(i)) : base[i];
    plans.push(p);
    if (voice && i < n - 1) {
      const avail = froms[i + 1] - froms[i];
      const want = p.entryEnd + 10;
      if (avail < want) {
        froms[i + 1] += Math.min(want - avail, 9);
        for (let k = i + 2; k < n; k++) froms[k] = Math.max(froms[k], froms[k - 1] + T + 15);
      }
    }
  }
  if (voice) {
    for (let i = 0; i < n - 1; i++) durations[i] = froms[i + 1] - froms[i] + T;
    const last = n - 1;
    const anchorLast = voice.sceneStartMs[last];
    const lastEnd = anchorLast !== undefined ? toFrame(voice.sceneEndMs[last] ?? voice.endMs) + 30 : froms[last] + baseContent[last].content;
    durations[last] = Math.max(lastEnd - froms[last], plans[last].entryEnd + 30) + LAST_HOLD;
  }

  const scenes: ScenePlan[] = spec.scenes.map((scene, i) => {
    const p = plans[i];
    const { minReadable } = contentOf(i, p);
    const tail = i === n - 1 ? LAST_HOLD : T;
    const duration = durations[i];
    return {
      index: i,
      scene,
      from: froms[i],
      duration,
      readable: duration - tail - p.entryEnd,
      minReadable,
      squeezed: Boolean(voice) && duration - tail < p.entryEnd + 6,
      ...(onBeat[i] !== undefined ? { onBeat: onBeat[i] } : {}),
      beats: p.beats,
      cues:
        spec.audio.sfx && scene.sfx !== false
          ? p.cues.map((c) => ({ ...c, volume: c.volume * sfxScale }))
          : [],
    };
  });

  const durationInFrames = froms[n - 1] + durations[n - 1];

  const cues: Cue[] = [];
  if (spec.audio.sfx && T > 0) {
    const soft = spec.transition === "fade" || spec.transition === "zoom" || spec.transition === "blur";
    // Whoosh peaks (~8 frames in) land on the middle of the transition: the music beat when the cut was snapped.
    for (const s of scenes.slice(1)) {
      if (s.scene.sfx === false) continue;
      cues.push({
        at: Math.max(0, (s.onBeat ?? s.from + Math.round(T / 2)) - 8),
        sfx: soft ? "whoosh-soft" : "whoosh",
        volume: (soft ? 0.5 : 0.4) * sfxScale,
      });
    }
  }

  const music: MusicPlan | null = spec.audio.music
    ? {
        src: spec.audio.music,
        startFrame: musicStartFrame,
        volume: Math.min(1, spec.audio.musicVolume * loudnessGain(spec.audio.musicLufs)),
        beats: grid ? grid.beats.filter((b) => b < durationInFrames) : [],
        downbeats: grid ? grid.downbeats.filter((b) => b < durationInFrames) : [],
      }
    : null;

  return { spec, theme, format, motion, transitionFrames: T, scenes, cues, durationInFrames, voice, music };
};
