// Tempo, beat, downbeat and loudness analysis for music the user supplies.
// The kit never generates music; this only measures a licensed track so cuts
// can land on its beats. ffmpeg decodes, the DSP below is dependency-free and
// deterministic (same file in, same beat grid out), so it is unit-testable.
import { spawnSync } from "node:child_process";

/** Analysis sample rate: plenty for rhythm, half the work of 44.1 kHz. */
export const SR = 22050;
/** Onset envelope hop: 256 samples = 11.6 ms per envelope frame (~86 per second). */
export const HOP = 256;
const WIN = 1024;
export const ENV_RATE = SR / HOP;

const run = (args, opts = {}) => {
  const r = spawnSync("ffmpeg", args, { maxBuffer: 1 << 30, ...opts });
  if (r.error) throw new Error("ffmpeg is needed for music analysis (https://ffmpeg.org/download.html).");
  return r;
};

/**
 * Decode audio to mono float PCM entirely in memory (ffmpeg writes raw f32 to
 * stdout; no temp files). `input` is a file path or raw ffmpeg input args,
 * e.g. ["-f", "lavfi", "-i", "aevalsrc=..."] for synthetic test signals.
 */
export const decode = (input, { sampleRate = SR } = {}) => {
  const inputArgs = Array.isArray(input) ? input : ["-i", input];
  const r = run(["-v", "error", "-nostdin", ...inputArgs, "-vn", "-ac", "1", "-ar", String(sampleRate), "-f", "f32le", "-"]);
  if (r.status !== 0) throw new Error(`ffmpeg could not decode the track: ${String(r.stderr).trim().split("\n").pop()}`);
  const buf = r.stdout;
  // Copy into an aligned buffer (the stdout Buffer may start at any byte offset).
  const pcm = new Float32Array(buf.length >> 2);
  new Uint8Array(pcm.buffer).set(buf.subarray(0, pcm.length * 4));
  return pcm;
};

/** Integrated loudness (EBU R128, LUFS) via ffmpeg's ebur128 filter. */
export const loudness = (input) => {
  const inputArgs = Array.isArray(input) ? input : ["-i", input];
  const r = run(["-hide_banner", "-nostats", "-nostdin", ...inputArgs, "-vn", "-af", "ebur128=framelog=quiet", "-f", "null", "-"], { encoding: "utf8" });
  const m = [...String(r.stderr).matchAll(/I:\s+(-?[\d.]+|-inf)\s+LUFS/g)].pop();
  const v = m ? Number(m[1]) : NaN;
  return Number.isFinite(v) ? v : null;
};

// --- FFT (radix-2, in place) -------------------------------------------------

const makeFft = (n) => {
  const levels = Math.log2(n);
  const rev = new Uint32Array(n);
  for (let i = 0; i < n; i++) {
    let r = 0;
    for (let b = 0; b < levels; b++) r = (r << 1) | ((i >>> b) & 1);
    rev[i] = r;
  }
  const cos = new Float64Array(n / 2);
  const sin = new Float64Array(n / 2);
  for (let i = 0; i < n / 2; i++) {
    cos[i] = Math.cos((2 * Math.PI * i) / n);
    sin[i] = Math.sin((2 * Math.PI * i) / n);
  }
  return (re, im) => {
    for (let i = 0; i < n; i++) {
      const j = rev[i];
      if (j > i) {
        [re[i], re[j]] = [re[j], re[i]];
        [im[i], im[j]] = [im[j], im[i]];
      }
    }
    for (let size = 2; size <= n; size *= 2) {
      const half = size / 2;
      const step = n / size;
      for (let i = 0; i < n; i += size) {
        for (let k = 0; k < half; k++) {
          const a = i + k;
          const b = a + half;
          const tr = re[b] * cos[k * step] + im[b] * sin[k * step];
          const ti = im[b] * cos[k * step] - re[b] * sin[k * step];
          re[b] = re[a] - tr;
          im[b] = im[a] - ti;
          re[a] += tr;
          im[a] += ti;
        }
      }
    }
  };
};

// --- Features ------------------------------------------------------------------

/**
 * Frame index -> seconds. Frames are centred on their analysis window; spectral
 * flux peaks ~11 ms before the hit reaches the centre (measured on kicks,
 * noise bursts and tones alike), so that lag is added back.
 */
const ONSET_LAG = 0.011;
export const frameTime = (i) => (i * HOP + WIN / 2) / SR + ONSET_LAG;

/**
 * Per-frame features: spectral-flux onset strength (full band and kick/bass
 * band), RMS energy and a 12-bin chroma (for chord changes on downbeats).
 */
export const features = (pcm) => {
  const n = Math.max(0, Math.floor((pcm.length - WIN) / HOP) + 1);
  let peak = 0;
  for (let i = 0; i < pcm.length; i++) peak = Math.max(peak, Math.abs(pcm[i]));
  const gain = peak > 0 ? 1 / peak : 1;
  const fft = makeFft(WIN);
  const hann = Float64Array.from({ length: WIN }, (_, i) => 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / WIN));
  const bins = WIN / 2;
  const hz = SR / WIN;
  // Log-spaced bands (~5 per octave, 30 Hz-10 kHz), each weighted equally like a
  // mel spectrogram: a kick counts as much as a broadband hi-hat, so the
  // tracker locks to the beat rather than to off-beat hats.
  const edges = [];
  for (let i = 0; i <= 42; i++) {
    const k = Math.round((30 * 2 ** (i / 5)) / hz);
    if (k < bins && (!edges.length || k > edges[edges.length - 1])) edges.push(k);
  }
  const bands = edges.length - 1;
  const lowBands = edges.filter((k) => k * hz < 150).length;
  const pitch = new Int8Array(bins).fill(-1);
  for (let k = 1; k < bins; k++) {
    const f = k * hz;
    if (f >= 55 && f <= 4200) pitch[k] = ((Math.round(12 * Math.log2(f / 440)) % 12) + 12) % 12;
  }
  const re = new Float64Array(WIN);
  const im = new Float64Array(WIN);
  const mag = new Float64Array(bins);
  let prev = new Float64Array(bands);
  let cur = new Float64Array(bands);
  const lowTop = Math.round(150 / hz);
  const flux = new Float32Array(n);
  const low = new Float32Array(n);
  const rms = new Float32Array(n);
  const lowRms = new Float32Array(n);
  const chroma = new Float32Array(n * 12);
  for (let f = 0; f < n; f++) {
    const off = f * HOP;
    let sq = 0;
    for (let i = 0; i < WIN; i++) {
      const s = pcm[off + i] * gain;
      sq += s * s;
      re[i] = s * hann[i];
      im[i] = 0;
    }
    rms[f] = Math.sqrt(sq / WIN);
    fft(re, im);
    let lowSq = 0;
    for (let k = 1; k < bins; k++) {
      mag[k] = Math.sqrt(re[k] * re[k] + im[k] * im[k]);
      if (k <= lowTop) lowSq += mag[k] * mag[k];
      if (pitch[k] >= 0) chroma[f * 12 + pitch[k]] += mag[k];
    }
    lowRms[f] = Math.sqrt(lowSq / lowTop);
    let all = 0;
    let bass = 0;
    for (let b = 0; b < bands; b++) {
      let s = 0;
      for (let k = edges[b]; k < edges[b + 1]; k++) s += mag[k];
      // Log compression: soft and loud passages contribute comparable onsets.
      cur[b] = Math.log1p((100 * s) / (edges[b + 1] - edges[b]));
      const d = cur[b] - prev[b];
      if (d > 0) {
        all += d;
        if (b < lowBands) bass += d;
      }
    }
    flux[f] = f === 0 ? 0 : all;
    low[f] = f === 0 ? 0 : bass;
    [prev, cur] = [cur, prev];
  }
  return { n, flux, low, rms, lowRms, chroma };
};

/** Remove the slowly varying part and keep the peaks (local-mean high-pass, half-wave rectified). */
const emphasise = (x, radius) => {
  const n = x.length;
  const pre = new Float64Array(n + 1);
  for (let i = 0; i < n; i++) pre[i + 1] = pre[i] + x[i];
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const a = Math.max(0, i - radius);
    const b = Math.min(n, i + radius + 1);
    out[i] = Math.max(0, x[i] - (pre[b] - pre[a]) / (b - a));
  }
  return out;
};

const smooth = (x, sigma) => {
  const r = Math.ceil(sigma * 3);
  const k = Array.from({ length: 2 * r + 1 }, (_, i) => Math.exp(-0.5 * ((i - r) / sigma) ** 2));
  const out = new Float32Array(x.length);
  for (let i = 0; i < x.length; i++) {
    let s = 0;
    let w = 0;
    for (let j = -r; j <= r; j++) {
      const v = x[i + j];
      if (v === undefined) continue;
      s += v * k[j + r];
      w += k[j + r];
    }
    out[i] = s / w;
  }
  return out;
};

/**
 * Onset strength envelope (one value per HOP), peaks where notes and drums
 * start. Kick/bass onsets count double: they mark the beat in almost every
 * genre, while hats and strums often sit between beats.
 */
export const onsetEnvelope = (pcm) => {
  const f = features(pcm);
  const both = f.flux.map((v, i) => v + f.low[i]);
  return { ...f, env: emphasise(both, Math.round(ENV_RATE * 0.15)) };
};

// --- Tempo ---------------------------------------------------------------------

const lerp = (arr, x) => {
  const i = Math.floor(x);
  if (i < 0 || i + 1 >= arr.length) return 0;
  return arr[i] + (arr[i + 1] - arr[i]) * (x - i);
};

/**
 * Tempo prior: flat over 90-130 BPM (where most edit-friendly music sits),
 * log-normal falloff outside, a little steeper on the fast side so an
 * ambiguous double-time reading loses to the felt pulse.
 */
const prior = (bpm) => {
  const edge = bpm < 90 ? 90 : bpm > 130 ? 130 : bpm;
  return Math.exp(-0.5 * (Math.log2(bpm / edge) / (bpm > 130 ? 0.35 : 0.45)) ** 2);
};

/**
 * Global tempo from the autocorrelation of the onset envelope, searched in
 * 70-180 BPM. A comb over the first four multiples of each lag rewards
 * periodicity that holds bar after bar. The strongest periodicity fixes the
 * pulse; only its octaves (half/double time) then compete, weighted towards
 * 90-130 BPM. Weighting every tempo would let the prior pull a 150 BPM track
 * onto a 2:3 neighbour (100 BPM) that is not on its beats at all.
 */
export const estimateTempo = (env, { min = 70, max = 180 } = {}) => {
  const x = smooth(env, 1.5);
  const n = x.length;
  let mean = 0;
  for (let i = 0; i < n; i++) mean += x[i];
  mean /= n || 1;
  const maxLag = Math.min(n - 1, Math.ceil((4 * 60 * ENV_RATE) / min) + 2);
  const ac = new Float64Array(Math.max(0, maxLag + 1));
  for (let lag = 0; lag <= maxLag; lag++) {
    let s = 0;
    for (let i = 0; i + lag < n; i++) s += (x[i] - mean) * (x[i + lag] - mean);
    ac[lag] = s / (n - lag);
  }
  const scores = [];
  for (let k = Math.round(min * 10); k <= Math.round(max * 10); k++) {
    const bpm = k / 10;
    const lag = (60 * ENV_RATE) / bpm;
    let s = 0;
    for (let m = 1; m <= 4; m++) s += lerp(ac, m * lag);
    scores.push([bpm, s]);
  }
  // Strongest score within ±4 % of a tempo (its own peak may sit a little off).
  const peakNear = (bpm) => {
    let best = null;
    for (const [b, s] of scores) if (Math.abs(b / bpm - 1) <= 0.04 && (!best || s > best[1])) best = [b, s];
    return best;
  };
  const top = scores.reduce((a, c) => (c[1] > a[1] ? c : a), scores[0]);
  let best = { bpm: top[0], score: -Infinity, raw: top[1] };
  for (const target of [top[0], top[0] * 2, top[0] / 2]) {
    const hit = target >= min * 0.96 && target <= max * 1.04 ? peakNear(target) : null;
    if (!hit || hit[1] <= 0) continue;
    const score = hit[1] * prior(hit[0]);
    if (score > best.score) best = { bpm: hit[0], score, raw: hit[1] };
  }
  return { bpm: best.bpm, confidence: ac[0] > 0 ? Math.max(0, best.raw / (4 * ac[0])) : 0, scores };
};

// --- Beats ---------------------------------------------------------------------

/**
 * Dynamic-programming beat tracker (Ellis 2007, as in librosa): beats sit on
 * strong onsets while inter-beat intervals stay close to the global period.
 * Returns fractional envelope-frame positions.
 */
export const trackBeats = (env, bpm, { tightness = 100 } = {}) => {
  const n = env.length;
  if (!n) return [];
  const period = (60 * ENV_RATE) / bpm;
  let mean = 0;
  for (let i = 0; i < n; i++) mean += env[i];
  mean /= n;
  let sd = 0;
  for (let i = 0; i < n; i++) sd += (env[i] - mean) ** 2;
  sd = Math.sqrt(sd / Math.max(1, n - 1)) || 1;
  const half = Math.round(period);
  const kernel = Array.from({ length: 2 * half + 1 }, (_, i) => Math.exp(-0.5 * (((i - half) * 32) / period) ** 2));
  const local = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let j = -half; j <= half; j++) {
      const k = i + j;
      if (k >= 0 && k < n) s += (env[k] / sd) * kernel[j + half];
    }
    local[i] = s;
  }
  const lo = -Math.round(2 * period);
  const hi = -Math.round(period / 2);
  const tx = [];
  for (let d = lo; d <= hi; d++) tx.push(-tightness * Math.log(-d / period) ** 2);
  const cum = new Float64Array(n);
  const back = new Int32Array(n).fill(-1);
  let maxLocal = 0;
  for (let i = 0; i < n; i++) maxLocal = Math.max(maxLocal, local[i]);
  let first = true;
  for (let i = 0; i < n; i++) {
    let best = -Infinity;
    let arg = -1;
    for (let d = lo; d <= hi; d++) {
      const j = i + d;
      const v = (j >= 0 ? cum[j] : 0) + tx[d - lo];
      if (v > best) {
        best = v;
        arg = j;
      }
    }
    cum[i] = local[i] + best;
    if (first && local[i] < 0.01 * maxLocal) back[i] = -1;
    else {
      back[i] = arg >= 0 ? arg : -1;
      first = false;
    }
  }
  // Last beat: the final local maximum of the cumulative score that is still strong.
  const maxima = [];
  for (let i = 0; i < n; i++) {
    const l = i === 0 ? -Infinity : cum[i - 1];
    const r = i === n - 1 ? -Infinity : cum[i + 1];
    if (cum[i] > l && cum[i] >= r) maxima.push(i);
  }
  if (!maxima.length) return [];
  const med = [...maxima.map((i) => cum[i])].sort((a, b) => a - b)[maxima.length >> 1];
  let tail = maxima[maxima.length - 1];
  for (let k = maxima.length - 1; k >= 0; k--) {
    if (cum[maxima[k]] * 2 > med) {
      tail = maxima[k];
      break;
    }
  }
  const beats = [tail];
  while (back[beats[beats.length - 1]] >= 0) beats.push(back[beats[beats.length - 1]]);
  beats.reverse();

  // Trim weak beats at the edges (silence or fades before/after the music).
  const strength = beats.map((b) => local[b]);
  const sm = strength.map((v, i) => 0.5 * (strength[i - 1] ?? 0) + v + 0.5 * (strength[i + 1] ?? 0));
  const thr = 0.5 * Math.sqrt(sm.reduce((a, v) => a + v * v, 0) / (sm.length || 1));
  let a = 0;
  let b = beats.length - 1;
  while (a < b && sm[a] <= thr) a++;
  while (b > a && sm[b] <= thr) b--;

  // Sub-frame precision: centre each beat on the onset peak beside it.
  return beats.slice(a, b + 1).map((f) => {
    let p = f;
    for (let j = -2; j <= 2; j++) if (env[f + j] > env[p]) p = f + j;
    const l = env[p - 1] ?? 0;
    const c = env[p];
    const r = env[p + 1] ?? 0;
    const den = l - 2 * c + r;
    return den < 0 ? p + Math.max(-0.5, Math.min(0.5, (0.5 * (l - r)) / den)) : p;
  });
};

/**
 * Least-squares straight line through the beats. Music made on a grid (almost
 * all library music) gets a perfectly even grid back, which is more accurate
 * than any single detection; live, drifting performances keep their beats.
 */
export const regularise = (beats) => {
  if (beats.length < 8) return { beats, period: beats.length > 1 ? (beats[beats.length - 1] - beats[0]) / (beats.length - 1) : 0, steady: false };
  const ibis = beats.slice(1).map((b, i) => b - beats[i]).sort((x, y) => x - y);
  const p0 = ibis[ibis.length >> 1];
  const k = beats.map((b) => Math.round((b - beats[0]) / p0));
  const m = beats.length;
  const sk = k.reduce((s, v) => s + v, 0);
  const sb = beats.reduce((s, v) => s + v, 0);
  const skk = k.reduce((s, v) => s + v * v, 0);
  const skb = k.reduce((s, v, i) => s + v * beats[i], 0);
  const period = (m * skb - sk * sb) / (m * skk - sk * sk);
  const offset = (sb - period * sk) / m;
  const resid = Math.sqrt(beats.reduce((s, b, i) => s + (b - (offset + period * k[i])) ** 2, 0) / m);
  // Steady when detections sit within ~23 ms (2 envelope frames) of the line.
  const steady = resid / ENV_RATE < 0.023;
  if (!steady) return { beats, period, steady };
  const out = [];
  for (let i = k[0]; i <= k[k.length - 1]; i++) out.push(offset + period * i);
  return { beats: out, period, steady };
};

/**
 * Downbeats: of the four possible bar phases, the one whose beats carry the
 * most accent — louder hits, heavier kick/bass, chord changes (bars usually
 * change harmony on beat one). Each cue votes with its statistical
 * significance, so a cue that does not vary with the bar (noise) stays silent.
 */
export const findDownbeats = (beatFrames, { rms, lowRms, chroma }) => {
  if (beatFrames.length < 8) return { phase: 0, downbeats: beatFrames.filter((_, i) => i % 4 === 0) };
  // Peak level just after the beat (the hit itself, ~70 ms).
  const at = (arr, f) => {
    const i = Math.round(f);
    let v = 0;
    for (let j = 0; j <= 6; j++) v = Math.max(v, arr[i + j] ?? 0);
    return v;
  };
  // Beat-synchronous chroma: average between consecutive beats.
  const seg = beatFrames.map((b, i) => {
    const a = Math.max(0, Math.round(b));
    const e = Math.round(beatFrames[i + 1] ?? b + (beatFrames[i] - (beatFrames[i - 1] ?? b - 40)));
    const v = new Float64Array(12);
    for (let f = a; f < Math.max(a + 1, e) && f * 12 < chroma.length; f++) for (let c = 0; c < 12; c++) v[c] += chroma[f * 12 + c];
    return v;
  });
  const cosine = (x, y) => {
    let d = 0;
    let nx = 0;
    let ny = 0;
    for (let c = 0; c < 12; c++) {
      d += x[c] * y[c];
      nx += x[c] * x[c];
      ny += y[c] * y[c];
    }
    return nx && ny ? d / Math.sqrt(nx * ny) : 1;
  };
  const feats = [
    { w: 1, v: beatFrames.map((b) => at(lowRms, b)) },
    { w: 0.5, v: beatFrames.map((b) => at(rms, b)) },
    { w: 1, v: seg.map((s, i) => (i === 0 ? 0 : 1 - cosine(seg[i - 1], s))) },
  ];
  const score = [0, 0, 0, 0];
  for (const { w, v } of feats) {
    const mean = v.reduce((a, x) => a + x, 0) / v.length;
    const groups = [0, 1, 2, 3].map((p) => v.filter((_, i) => i % 4 === p));
    const means = groups.map((g) => g.reduce((a, x) => a + x, 0) / (g.length || 1));
    // Pooled within-phase spread: how much a cue varies from bar to bar on the same beat.
    const within = Math.sqrt(groups.reduce((a, g, p) => a + g.reduce((b, x) => b + (x - means[p]) ** 2, 0), 0) / Math.max(1, v.length - 4));
    const sd = Math.max(within, 0.02 * Math.abs(mean), 1e-9);
    // t-statistic of each phase against the overall mean, capped so one cue cannot outvote the rest.
    means.forEach((m, p) => (score[p] += w * Math.max(-8, Math.min(8, ((m - mean) / sd) * Math.sqrt(groups[p].length)))));
  }
  const phase = score.indexOf(Math.max(...score));
  return { phase, downbeats: beatFrames.filter((_, i) => i % 4 === phase) };
};

// --- Sections ------------------------------------------------------------------

/**
 * Where the music should start: the bar (downbeat) that opens the most
 * energetic stretch that still covers the whole video. A start where the
 * energy steps up (a drop or chorus entry) gets a bonus.
 */
export const pickStart = ({ rms, downbeatsMs, beatsMs, durationMs, needMs }) => {
  if (durationMs <= needMs || !rms.length) return { startMs: 0, covers: durationMs >= needMs };
  const pre = new Float64Array(rms.length + 1);
  for (let i = 0; i < rms.length; i++) pre[i + 1] = pre[i] + rms[i];
  const toFrame = (ms) => Math.max(0, Math.min(rms.length, Math.round(((ms / 1000) * SR - WIN / 2) / HOP)));
  const mean = (aMs, bMs) => {
    const a = toFrame(aMs);
    const b = toFrame(bMs);
    return b > a ? (pre[b] - pre[a]) / (b - a) : 0;
  };
  const candidates = (downbeatsMs.length ? downbeatsMs : beatsMs.length ? beatsMs : Array.from({ length: Math.floor(durationMs / 500) }, (_, i) => i * 500)).filter(
    (ms) => ms + needMs <= durationMs,
  );
  if (!candidates.length) return { startMs: 0, covers: true };
  const bar = downbeatsMs.length > 1 ? (downbeatsMs[downbeatsMs.length - 1] - downbeatsMs[0]) / (downbeatsMs.length - 1) : 2000;
  let best = { startMs: candidates[0], score: -Infinity };
  for (const ms of candidates) {
    const body = mean(ms, ms + needMs);
    const before = ms - 2 * bar >= 0 ? mean(ms - 2 * bar, ms) : body;
    const after = mean(ms, ms + 2 * bar);
    const rise = body > 0 ? Math.max(0, Math.min(1, (after - before) / body)) : 0;
    const score = body * (1 + 0.3 * rise);
    if (score > best.score + 1e-9) best = { startMs: ms, score };
  }
  return { startMs: best.startMs, covers: true };
};

// --- All together ----------------------------------------------------------------

/**
 * Pulse strength: mean onset strength at the tracked beats. Drums, plucks and
 * chord stabs score 25+ (even a kick 20 dB under a pad or noise); pads, drones
 * and noise score ~4-6, where the tracker is only following the envelope's
 * ripple. Below `PULSE_MIN` there is no beat to cut on.
 */
export const PULSE_MIN = 12;
const pulseOf = (env, beatFrames) => {
  if (!beatFrames.length) return 0;
  let sum = 0;
  for (const b of beatFrames) {
    const i = Math.round(b);
    let v = 0;
    for (let j = -2; j <= 2; j++) v = Math.max(v, env[i + j] ?? 0);
    sum += v;
  }
  return sum / beatFrames.length;
};

/**
 * Full analysis of decoded PCM: tempo, beat grid and downbeats (times in ms).
 * `rhythmic` is false for free-time music (ambient, drones, rubato piano):
 * the grid is then not worth snapping cuts to.
 */
export const analysePcm = (pcm) => {
  const durationMs = (pcm.length / SR) * 1000;
  const f = onsetEnvelope(pcm);
  const tempo = estimateTempo(f.env);
  const tracked = trackBeats(f.env, tempo.bpm);
  const grid = regularise(tracked);
  const { downbeats } = findDownbeats(grid.beats, f);
  const toMs = (fr) => Math.round(frameTime(fr) * 1000 * 10) / 10;
  const beatsMs = grid.beats.map(toMs).filter((ms) => ms >= 0 && ms < durationMs);
  const downbeatsMs = downbeats.map(toMs).filter((ms) => ms >= 0 && ms < durationMs);
  const bpm = grid.period > 0 ? (60 * ENV_RATE) / grid.period : tempo.bpm;
  const pulse = pulseOf(f.env, tracked);
  const rhythmic = beatsMs.length >= 8 && pulse >= PULSE_MIN && tempo.confidence >= 0.2;
  return {
    bpm: Math.round(bpm * 100) / 100,
    beats: beatsMs,
    downbeats: downbeatsMs,
    durationMs: Math.round(durationMs),
    rhythmic,
    steady: grid.steady,
    confidence: tempo.confidence,
    pulse: Math.round(pulse * 10) / 10,
    rms: f.rms,
  };
};
