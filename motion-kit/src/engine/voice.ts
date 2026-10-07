/**
 * Voice timing: turns narration (`say` lines) plus word timestamps into
 * per-token times, so scenes cut on the spoken beat and on-screen words
 * reveal as they are said.
 *
 * Works with three sources of word timings:
 * - real timestamps from ElevenLabs / Whisper / forced alignment (exact),
 * - nothing at all: timings are estimated from a natural speaking rate, which
 *   makes the silent preview match the eventual voice-over closely.
 */
export type TimedWord = { text: string; startMs: number; endMs: number };

export type VoiceToken = { scene: number; norm: string; startMs: number; endMs: number };

export type VoiceTrack = {
  tokens: VoiceToken[];
  /** First spoken token per scene (undefined when the scene has no `say`). */
  sceneStartMs: (number | undefined)[];
  sceneEndMs: (number | undefined)[];
  endMs: number;
  estimated: boolean;
  /** Share of script words found in the timing data (1 = every word matched). */
  coverage: number;
};

const DIGITS: Record<string, string> = {
  "0": "zero", "1": "one", "2": "two", "3": "three", "4": "four",
  "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine", "10": "ten",
};

/** Lowercase, strip punctuation/markup, keep letters, digits and Indic marks. */
const SYMBOLS: [RegExp, string][] = [
  [/\+/g, " plus "],
  [/&/g, " and "],
  [/%/g, " percent "],
  [/@/g, " at "],
];

export const normalizeToken = (t: string) =>
  t
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[*=~_#]/g, "")
    .replace(/[^\p{L}\p{N}\p{M}]/gu, "");

export const tokenize = (text: string) =>
  SYMBOLS.reduce((acc, [re, word]) => acc.replace(re, word), text)
    .split(/[\s—–/]+/)
    .map(normalizeToken)
    .filter(Boolean)
    .map((t) => DIGITS[t] ?? t);

const similar = (a: string, b: string) => {
  if (a === b) return 0;
  if (!a || !b) return 1;
  if (a.startsWith(b) || b.startsWith(a)) return Math.min(a.length, b.length) >= 3 ? 0.35 : 0.8;
  // Cheap edit-distance ratio for short tokens.
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 4) return 1;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  const ratio = prev[n] / Math.max(m, n);
  return ratio <= 0.34 ? 0.4 : 1;
};

/**
 * Global sequence alignment (Needleman-Wunsch) of two token lists.
 * Returns, for each token in `a`, the index of its partner in `b` or -1.
 * Robust to ASR mistakes, missing words and number formatting differences.
 */
export const alignTokens = (a: string[], b: string[]): number[] => {
  const m = a.length;
  const n = b.length;
  const GAP = 0.7;
  const cost: Float64Array[] = Array.from({ length: m + 1 }, () => new Float64Array(n + 1));
  const move: Uint8Array[] = Array.from({ length: m + 1 }, () => new Uint8Array(n + 1));
  for (let i = 1; i <= m; i++) {
    cost[i][0] = i * GAP;
    move[i][0] = 1;
  }
  for (let j = 1; j <= n; j++) {
    cost[0][j] = j * GAP;
    move[0][j] = 2;
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const diag = cost[i - 1][j - 1] + similar(a[i - 1], b[j - 1]);
      const up = cost[i - 1][j] + GAP;
      const left = cost[i][j - 1] + GAP;
      if (diag <= up && diag <= left) {
        cost[i][j] = diag;
        move[i][j] = 0;
      } else if (up <= left) {
        cost[i][j] = up;
        move[i][j] = 1;
      } else {
        cost[i][j] = left;
        move[i][j] = 2;
      }
    }
  }
  const out = new Array<number>(m).fill(-1);
  let i = m;
  let j = n;
  while (i > 0 || j > 0) {
    const mv = move[i][j];
    if (i > 0 && j > 0 && mv === 0) {
      if (similar(a[i - 1], b[j - 1]) < 1) out[i - 1] = j - 1;
      i--;
      j--;
    } else if (i > 0 && (mv === 1 || j === 0)) i--;
    else j--;
  }
  return out;
};

/** Fill gaps by interpolating between known neighbours. */
const interpolate = (vals: (number | undefined)[], fallbackStep: number, start = 0) => {
  const out = [...vals];
  for (let i = 0; i < out.length; i++) {
    if (out[i] !== undefined) continue;
    let p = i - 1;
    while (p >= 0 && out[p] === undefined) p--;
    let q = i + 1;
    while (q < out.length && vals[q] === undefined) q++;
    const pv = p >= 0 ? (out[p] as number) : start;
    if (q < out.length) {
      const qv = vals[q] as number;
      out[i] = pv + ((qv - pv) * (i - p)) / (q - p);
    } else {
      out[i] = pv + fallbackStep * (i - p);
    }
  }
  return out as number[];
};

/** Natural narration rate: ~155 wpm English; Hindi/Devanagari a little slower. */
export const SPEAK_WPS = { latin: 2.6, devanagari: 2.3 };
const DEVANAGARI = /[ऀ-ॿ]/;

/** Synthetic timings for a silent preview: words at a natural pace, a breath between beats. */
export const estimateWords = (says: (string | undefined)[]): TimedWord[] => {
  const words: TimedWord[] = [];
  let t = 250;
  for (const say of says) {
    if (!say) continue;
    const wps = DEVANAGARI.test(say) ? SPEAK_WPS.devanagari : SPEAK_WPS.latin;
    for (const w of say.split(/\s+/).filter(Boolean)) {
      // Longer words take longer to say.
      const len = (1000 / wps) * Math.min(1.6, Math.max(0.6, w.replace(/[^\p{L}\p{N}]/gu, "").length / 5));
      words.push({ text: w, startMs: t, endMs: t + len * 0.92 });
      t += len;
      if (/[.!?।]$/.test(w)) t += 180;
      else if (/[,;:—]$/.test(w)) t += 90;
    }
    t += 280;
  }
  return words;
};

/** Build the voice track from scene `say` lines and (optional) real word timings. */
export const buildVoiceTrack = (says: (string | undefined)[], timed?: TimedWord[]): VoiceTrack | null => {
  if (!says.some(Boolean)) return null;
  const estimated = !timed || timed.length === 0;
  const words = estimated ? estimateWords(says) : timed!;

  const scriptTokens: { scene: number; norm: string }[] = [];
  says.forEach((say, scene) => {
    if (!say) return;
    for (const norm of tokenize(say)) scriptTokens.push({ scene, norm });
  });

  const asr: { norm: string; startMs: number; endMs: number }[] = [];
  for (const w of words) {
    const toks = tokenize(w.text);
    toks.forEach((norm, k) => {
      const span = (w.endMs - w.startMs) / toks.length;
      asr.push({ norm, startMs: w.startMs + span * k, endMs: w.startMs + span * (k + 1) });
    });
  }

  const map = alignTokens(
    scriptTokens.map((t) => t.norm),
    asr.map((t) => t.norm),
  );
  const starts = interpolate(
    map.map((j) => (j >= 0 ? asr[j].startMs : undefined)),
    350,
    asr[0]?.startMs ?? 0,
  );
  const ends = interpolate(
    map.map((j) => (j >= 0 ? asr[j].endMs : undefined)),
    350,
    asr[0]?.endMs ?? 300,
  );
  const tokens: VoiceToken[] = scriptTokens.map((t, i) => ({
    scene: t.scene,
    norm: t.norm,
    startMs: starts[i],
    endMs: Math.max(starts[i] + 60, ends[i]),
  }));
  // Enforce monotonic time (ASR can occasionally swap neighbours).
  for (let i = 1; i < tokens.length; i++) {
    if (tokens[i].startMs < tokens[i - 1].startMs) tokens[i].startMs = tokens[i - 1].startMs + 1;
  }

  const sceneStartMs = says.map((_, s) => tokens.find((t) => t.scene === s)?.startMs);
  const sceneEndMs = says.map((_, s) => {
    const own = tokens.filter((t) => t.scene === s);
    return own.length ? own[own.length - 1].endMs : undefined;
  });
  const lastWord = words[words.length - 1];
  return {
    tokens,
    sceneStartMs,
    sceneEndMs,
    endMs: Math.max(lastWord?.endMs ?? 0, tokens[tokens.length - 1]?.endMs ?? 0),
    estimated,
    coverage: map.length ? map.filter((j) => j >= 0).length / map.length : 0,
  };
};

/**
 * For on-screen text inside one scene: when is each displayed word spoken?
 * Matches shown words to that scene's spoken tokens; unmatched words are
 * interpolated, so "₹50,000" still lands near "fifty thousand".
 */
export const showTimes = (track: VoiceTrack, scene: number, show: string): (number | undefined)[] => {
  const spoken = track.tokens.filter((t) => t.scene === scene);
  const shown = show.split(/\s+/).filter(Boolean).map((w) => tokenize(w)[0] ?? "");
  if (!spoken.length || !shown.length) return shown.map(() => undefined);
  const map = alignTokens(
    shown,
    spoken.map((t) => t.norm),
  );
  // Only trust the match when the text is really being said: its opening
  // words match, or at least half of it does. A lone shared word ("chahiye")
  // must not drag an unspoken title to the end of the beat.
  const matched = map.filter((j) => j >= 0).length;
  const anchored = map[0] >= 0 || (map.length > 1 && map[1] >= 0) || matched >= Math.ceil(map.length / 2);
  if (!anchored) return shown.map(() => undefined);
  return map.map((j) => (j >= 0 ? spoken[j].startMs : undefined));
};

/** Convert ElevenLabs character-level alignment into words. */
export const wordsFromCharacters = (a: {
  characters: string[];
  character_start_times_seconds: number[];
  character_end_times_seconds: number[];
}): TimedWord[] => {
  const out: TimedWord[] = [];
  let cur: TimedWord | null = null;
  a.characters.forEach((ch, i) => {
    const s = a.character_start_times_seconds[i] * 1000;
    const e = a.character_end_times_seconds[i] * 1000;
    if (/\s/.test(ch)) {
      if (cur) out.push(cur);
      cur = null;
      return;
    }
    if (!cur) cur = { text: ch, startMs: s, endMs: e };
    else {
      cur.text += ch;
      cur.endMs = e;
    }
  });
  if (cur) out.push(cur);
  return out;
};
