/**
 * Procedural fallback for every SFX slot in src/audio/cues.json, written to
 * assets/audio/sfx-fallback/<slot>[_n].wav. Real library files dropped into
 * assets/audio/sfx-library/ always win (see scripts/mix.ts).
 *
 * Each sound is designed in layers (transient + body + tail), tonal sounds are
 * tuned to the song key (B major), and tails get a small Schroeder reverb so
 * they sit in one space. Deterministic: same output every run.
 *
 *   npx tsx scripts/sfx-fallbacks.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import cues from "../src/audio/cues.json";

const SR = 48000;
const OUT = join(__dirname, "..", "assets", "audio", "sfx-fallback");

// ── DSP kit ──────────────────────────────────────────────────────────────────
let seed = 9001;
const rnd = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
};
const noise = () => rnd() * 2 - 1;
const buf = (s: number) => new Float32Array(Math.round(s * SR));
const B4 = 493.88;
const note = (semisFromB4: number) => B4 * Math.pow(2, semisFromB4 / 12);

const add = (out: Float32Array, at: number, dur: number, gen: (t: number) => number, gain = 1) => {
  const s0 = Math.round(at * SR);
  const n = Math.round(dur * SR);
  for (let i = 0; i < n && s0 + i < out.length; i++) if (s0 + i >= 0) out[s0 + i] += gen(i / SR) * gain;
};
const env = (t: number, a: number, d: number) => (t < a ? t / a : Math.exp(-(t - a) / d));
const bell = (t: number, len: number) => Math.sin(Math.PI * Math.min(1, Math.max(0, t / len))) ** 2;

/** RBJ biquad; type: lp | hp | bp. Cutoff may vary per sample. */
const biquad = (x: Float32Array, type: "lp" | "hp" | "bp", freq: (i: number) => number, q = 0.707) => {
  const y = new Float32Array(x.length);
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; i < x.length; i++) {
    const w = (2 * Math.PI * Math.min(freq(i), SR * 0.45)) / SR;
    const cs = Math.cos(w), sn = Math.sin(w), al = sn / (2 * q);
    let b0, b1, b2;
    if (type === "lp") [b0, b1, b2] = [(1 - cs) / 2, 1 - cs, (1 - cs) / 2];
    else if (type === "hp") [b0, b1, b2] = [(1 + cs) / 2, -(1 + cs), (1 + cs) / 2];
    else [b0, b1, b2] = [al, 0, -al];
    const a0 = 1 + al, a1 = -2 * cs, a2 = 1 - al;
    const v = (b0 * x[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0;
    x2 = x1; x1 = x[i]; y2 = y1; y1 = v; y[i] = v;
  }
  return y;
};
const filt = (type: "lp" | "hp" | "bp", f: number | ((i: number) => number), q?: number) => (x: Float32Array) => biquad(x, type, typeof f === "number" ? () => f : f, q);

/** Noise burst with an envelope, then filtered. */
const noiseBurst = (dur: number, envFn: (t: number) => number, ...filters: Array<(x: Float32Array) => Float32Array>) => {
  let x: Float32Array<ArrayBufferLike> = buf(dur);
  add(x, 0, dur, (t) => noise() * envFn(t));
  for (const fl of filters) x = fl(x);
  return x;
};
/** Modal (struck) tone: sum of decaying partials. */
const modal = (f0: number, ratios: number[], decays: number[], amps: number[], dur: number) => {
  const x = buf(dur);
  ratios.forEach((r, k) => add(x, 0, dur, (t) => Math.sin(2 * Math.PI * f0 * r * t) * Math.exp(-t / decays[k]) * Math.min(1, t / 0.002), amps[k]));
  return x;
};
const fmBell = (f: number, ratio: number, index: number, decay: number, dur: number) => {
  const x = buf(dur);
  add(x, 0, dur, (t) => Math.sin(2 * Math.PI * f * t + index * Math.exp(-t / (decay * 0.5)) * Math.sin(2 * Math.PI * f * ratio * t)) * env(t, 0.002, decay));
  return x;
};
const mixInto = (...parts: Array<[Float32Array, number, number?]>) => {
  const len = Math.max(...parts.map(([p, , at = 0]) => p.length + Math.round(at * SR)));
  const out = new Float32Array(len);
  for (const [p, g, at = 0] of parts) {
    const s0 = Math.round(at * SR);
    for (let i = 0; i < p.length; i++) out[s0 + i] += p[i] * g;
  }
  return out;
};
const reverse = (x: Float32Array) => Float32Array.from(x).reverse();
/** Small Schroeder room (4 combs + 2 allpasses), wet mixed in. */
const room = (x: Float32Array, wet = 0.25, size = 1, tail = 0.8) => {
  const n = x.length + Math.round(tail * SR);
  const dry = new Float32Array(n);
  dry.set(x);
  const out = new Float32Array(n);
  const combs = [1557, 1617, 1491, 1422].map((d) => Math.round(d * size));
  for (const d of combs) {
    const b = new Float32Array(d);
    let idx = 0;
    for (let i = 0; i < n; i++) {
      const y = b[idx];
      b[idx] = dry[i] + y * 0.78;
      out[i] += y / combs.length;
      idx = (idx + 1) % d;
    }
  }
  let y = out;
  for (const d of [225, 556]) {
    const b = new Float32Array(d);
    const o = new Float32Array(n);
    let idx = 0;
    for (let i = 0; i < n; i++) {
      const bo = b[idx];
      const v = y[i] + bo * 0.5;
      b[idx] = v;
      o[i] = bo - v * 0.5;
      idx = (idx + 1) % d;
    }
    y = o;
  }
  return dry.map((v, i) => v + y[i] * wet);
};
const normalize = (x: Float32Array, peakDb = -3) => {
  let p = 0;
  for (const v of x) p = Math.max(p, Math.abs(v));
  const g = p > 0 ? Math.pow(10, peakDb / 20) / p : 1;
  return x.map((v) => v * g);
};
const fadeOut = (x: Float32Array, ms = 8) => {
  const n = Math.round((ms / 1000) * SR);
  for (let i = 0; i < n && i < x.length; i++) x[x.length - 1 - i] *= i / n;
  return x;
};
const writeWav = (path: string, mono: Float32Array) => {
  const data = Buffer.alloc(mono.length * 2);
  for (let i = 0; i < mono.length; i++) data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, mono[i])) * 32767), i * 2);
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + data.length, 4); h.write("WAVE", 8); h.write("fmt ", 12);
  h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22); h.writeUInt32LE(SR, 24);
  h.writeUInt32LE(SR * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(data.length, 40);
  writeFileSync(path, Buffer.concat([h, data]));
};

// ── Sound designs ────────────────────────────────────────────────────────────
const click = (f: number, ms = 8, q = 1.5) => noiseBurst(ms / 1000 + 0.01, (t) => env(t, 0.0004, ms / 4000), filt("bp", f, q));
const thud = (f0: number, f1: number, d: number) => {
  const x = buf(d * 5);
  add(x, 0, d * 5, (t) => Math.sin(2 * Math.PI * (f1 + (f0 - f1) * Math.exp(-t / (d * 0.6))) * t) * env(t, 0.002, d));
  return x;
};
const sweepNoise = (dur: number, f0: number, f1: number, q = 1.2, shape = 1) =>
  noiseBurst(dur, (t) => bell(t, dur) ** shape, filt("bp", (i) => f0 + (f1 - f0) * (i / (dur * SR)), q));
const crackle = (dur: number, density: number, f = 2500) => {
  const x = buf(dur);
  for (let t = 0; t < dur; t += (1 / density) * (0.3 + rnd() * 1.4)) add(x, t, 0.006, (u) => noise() * env(u, 0.0003, 0.0015), Math.exp(-t / (dur * 0.4)) * (0.4 + rnd() * 0.6));
  return biquad(x, "bp", () => f, 0.9);
};
const marimba = (f: number, dur = 0.7) => mixInto([modal(f, [1, 3.93, 9.2], [0.32, 0.07, 0.025], [1, 0.35, 0.12], dur), 1], [click(4000, 3), 0.15]);

const DESIGNS: Record<string, (v: number) => Float32Array> = {
  paper_tap: () => mixInto([click(2600, 10, 1.1), 1], [thud(500, 220, 0.02), 0.5]),
  ui_pluck: () => room(marimba(B4), 0.18, 0.7, 0.5),
  soft_tap: () => mixInto([click(3400, 6, 2), 1], [thud(900, 600, 0.008), 0.3]),
  word_hit: () => mixInto([thud(150, 85, 0.05), 1], [noiseBurst(0.08, (t) => env(t, 0.001, 0.015), filt("lp", 700)), 0.6]),
  whoosh_short: () => sweepNoise(0.32, 500, 2600, 1.4, 1.3),
  whoosh_long: () => mixInto([sweepNoise(0.62, 300, 1800, 1.0, 1.1), 1], [sweepNoise(0.62, 2400, 5000, 2, 2), 0.25]),
  tv_thunk: () => mixInto([thud(110, 70, 0.07), 1], [click(1800, 4, 0.8), 0.6], [crackle(0.25, 120, 3500), 0.3, 0.02]),
  hum: () => { const x = buf(1.0); add(x, 0, 1.0, (t) => (Math.sin(2 * Math.PI * 60 * t) + 0.5 * Math.sin(2 * Math.PI * 120 * t) + 0.2 * Math.sin(2 * Math.PI * 180 * t)) * Math.min(1, t / 0.05, (1 - t) / 0.2)); return x; },
  card_thump: () => mixInto([thud(160, 95, 0.045), 1], [noiseBurst(0.12, (t) => env(t, 0.001, 0.02), filt("lp", 1100)), 0.7], [click(2200, 5), 0.25]),
  key_tick: (v) => mixInto([click([3000, 3400, 2700, 3800][v - 1], 9, 2.2), 1], [thud([900, 1000, 820, 1100][v - 1], 600, 0.006), 0.35]),
  ping: () => room(mixInto([modal(note(12), [1, 2.01, 3.02], [0.35, 0.12, 0.05], [1, 0.3, 0.1], 0.8), 1]), 0.25, 0.8, 0.7),
  swish: () => sweepNoise(0.2, 1800, 4500, 1.6, 1.5),
  map_boop: () => { const x = buf(0.3); add(x, 0, 0.3, (t) => Math.sin(2 * Math.PI * note(-12) * (1 + 0.25 * Math.exp(-t / 0.02)) * t) * env(t, 0.003, 0.07)); return x; },
  car_pass: () => {
    const d = 0.7;
    const x = buf(d);
    let ph = 0;
    for (let i = 0; i < x.length; i++) {
      const t = i / SR;
      const f = 95 * (t < d / 2 ? 1.06 : 0.94);
      ph += (2 * Math.PI * f) / SR;
      x[i] = (Math.sin(ph) + 0.5 * Math.sin(2 * ph) + 0.3 * Math.sin(3 * ph)) * bell(t, d) * 0.5;
    }
    return mixInto([biquad(x, "lp", () => 900), 1], [sweepNoise(d, 400, 1200, 0.8, 1.5), 0.5]);
  },
  nfc_chime: () => room(mixInto([fmBell(note(12), 3.5, 1.4, 0.35, 0.9), 1]), 0.2, 0.7, 0.6),
  card_tap: () => mixInto([click(1800, 7, 3), 1], [click(4200, 3, 1), 0.4]),
  paper_flick: (v) => mixInto([noiseBurst(0.06, (t) => env(t, 0.0005, 0.012), filt("bp", [3800, 4300, 3400, 4700][v - 1], 1.8)), 1], [click([1200, 1400, 1100, 1300][v - 1], 6, 2), 0.5, 0.03]),
  reverse_swell: () => reverse(room(noiseBurst(0.45, (t) => env(t, 0.001, 0.12), filt("hp", 1500)), 0.6, 1, 0.3)),
  sub_drop: () => { const x = buf(0.9); add(x, 0, 0.9, (t) => Math.tanh(1.6 * Math.sin(2 * Math.PI * (34 + 36 * Math.exp(-t / 0.18)) * t)) * env(t, 0.004, 0.32)); return x; },
  cardboard_slam: () => mixInto([thud(120, 70, 0.08), 1], [noiseBurst(0.2, (t) => env(t, 0.0008, 0.035), filt("lp", 1600)), 0.9], [click(2400, 6, 0.9), 0.6]),
  paper_debris: () => crackle(0.7, 60, 3000),
  wood_creak: () => {
    const d = 0.55;
    const x = buf(d);
    let t = 0;
    while (t < d) {
      add(x, t, 0.004, (u) => noise() * env(u, 0.0002, 0.0008), bell(t, d));
      t += 1 / (45 + 40 * Math.sin((t / d) * Math.PI));
    }
    return mixInto([biquad(x, "bp", () => 650, 3), 1], [biquad(x, "bp", () => 1300, 4), 0.5]);
  },
  key_jingle: () => { let out = buf(0.5); for (let k = 0; k < 7; k++) out = mixInto([out, 1], [fmBell(3000 + rnd() * 2500, 2.76, 2, 0.06, 0.15), 0.4, rnd() * 0.35]); return out; },
  metal_clack: () => room(mixInto([fmBell(2200, 2.41, 3, 0.09, 0.4), 0.8], [click(3500, 5, 1), 1], [thud(300, 180, 0.02), 0.4]), 0.2, 0.6, 0.4),
  lock_mechanism: () => mixInto([click(2600, 6, 2), 1], [fmBell(1800, 2.2, 2, 0.05, 0.2), 0.5], [click(2000, 7, 2), 1, 0.07], [thud(260, 160, 0.02), 0.5, 0.07]),
  latch_clunk: () => mixInto([thud(170, 110, 0.05), 1], [fmBell(1400, 1.9, 1.5, 0.05, 0.2), 0.4], [click(1600, 6), 0.6]),
  door_swing: () => mixInto([sweepNoise(0.7, 200, 900, 0.8, 1), 1], [DESIGNS.wood_creak(1), 0.4, 0.05]),
  shimmer: () => { let out = buf(1.2); [12, 16, 19, 24].forEach((s, k) => { out = mixInto([out, 1], [fmBell(note(s), 2.0, 0.6, 0.6, 1.0), 0.35, k * 0.04]); }); return room(out, 0.4, 1, 1.0); },
  air_riser: () => { const d = 2.4; return noiseBurst(d, (t) => Math.pow(t / d, 2.2), filt("bp", (i) => 300 + 5000 * Math.pow(i / (d * SR), 2), 1.2)); },
  paper_rip: () => { const d = 0.38; const x = noiseBurst(d, (t) => env(t, 0.004, 0.11) * (0.55 + 0.45 * Math.abs(Math.sin(2 * Math.PI * 47 * t + 7 * t * t))), filt("bp", (i) => 900 + 3200 * (i / (d * SR)), 0.8)); return mixInto([x, 1], [crackle(0.32, 260, 3200), 0.7, 0.0]); },
  paper_flutter: () => { const d = 0.7; return noiseBurst(d, (t) => bell(t, d) * (0.5 + 0.5 * Math.sin(2 * Math.PI * 19 * t)), filt("bp", 2600, 1)); },
  reverse_cymbal: () => reverse(noiseBurst(0.65, (t) => env(t, 0.001, 0.18), filt("hp", 4500))),
  paint_splash: () => { const d = 0.38; const x = noiseBurst(d, (t) => env(t, 0.002, 0.08) * (0.6 + 0.4 * Math.sin(2 * Math.PI * 31 * t)), filt("lp", 2800), filt("hp", 250)); return mixInto([x, 1], [crackle(0.3, 90, 1800), 0.4, 0.03]); },
  sub_boom: () => { const x = buf(1.5); add(x, 0, 1.5, (t) => Math.tanh(2 * Math.sin(2 * Math.PI * (30 + 45 * Math.exp(-t / 0.12)) * t)) * env(t, 0.003, 0.5)); return x; },
  crash: () => room(noiseBurst(1.1, (t) => env(t, 0.001, 0.35), filt("hp", 3800)), 0.3, 1.1, 0.8),
  pop: () => { const x = buf(0.1); add(x, 0, 0.1, (t) => Math.sin(2 * Math.PI * (260 + 600 * Math.exp(-t / 0.012)) * t) * env(t, 0.001, 0.022)); return x; },
  sparkle: () => { let out = buf(0.6); [24, 28, 31, 36].forEach((s, k) => { out = mixInto([out, 1], [modal(note(s), [1, 2.7], [0.12, 0.04], [1, 0.3], 0.3), 0.3, k * 0.055]); }); return room(out, 0.35, 0.8, 0.6); },
  card_slide: () => sweepNoise(0.26, 1500, 2600, 1.1, 0.8),
  button_thunk: () => mixInto([thud(190, 120, 0.035), 1], [click(1500, 5, 1.5), 0.5]),
  positive_chime: () => room(mixInto([fmBell(note(12), 3.0, 1.0, 0.3, 0.7), 0.8], [fmBell(note(19), 3.0, 1.0, 0.35, 0.8), 0.8, 0.09]), 0.25, 0.8, 0.7),
  paper_flip: () => mixInto([sweepNoise(0.12, 2500, 4000, 1.5, 1), 1], [sweepNoise(0.12, 3000, 2000, 1.5, 1), 0.8, 0.07]),
  card_flick: (v) => mixInto([noiseBurst(0.05, (t) => env(t, 0.0004, 0.01), filt("bp", [3500, 3900, 3200, 4200][v - 1], 2)), 1], [thud([1000, 1100, 950, 1200][v - 1], 500, 0.01), 0.6, 0.012]),
  paper_lift: () => reverse(sweepNoise(0.22, 2000, 3600, 1.2, 1.5)),
  card_slap: () => mixInto([noiseBurst(0.09, (t) => env(t, 0.0005, 0.018), filt("bp", 1500, 0.8)), 1], [thud(130, 90, 0.03), 0.8]),
  brush_stroke: () => { const d = 0.35; return noiseBurst(d, (t) => bell(t, d) * (0.6 + 0.4 * noise()), filt("bp", 1300, 0.9)); },
  rubber_stamp: () => mixInto([thud(125, 80, 0.06), 1], [noiseBurst(0.1, (t) => env(t, 0.0008, 0.02), filt("lp", 2000)), 0.8], [modal(400, [1, 2.3], [0.05, 0.02], [1, 0.4], 0.15), 0.25]),
  paper_crunch: () => crackle(0.25, 220, 2800),
  tonal_hit: () => room(mixInto([modal(note(-24), [1, 2, 3, 4.01, 5.02], [0.9, 0.5, 0.3, 0.18, 0.1], [1, 0.5, 0.3, 0.2, 0.1], 1.6), 1], [click(3000, 4), 0.2]), 0.25, 1, 0.8),
  logo_motif: () => { const m = mixInto([marimba(note(0), 0.9), 1], [marimba(note(4), 0.9), 1, 0.2], [marimba(note(7), 1.4), 1.1, 0.4], [marimba(note(12), 1.6), 0.5, 0.4]); return room(m, 0.3, 1, 1.2); },
  paper_swoosh: () => sweepNoise(0.3, 1200, 3500, 1.2, 1.2),
};

mkdirSync(OUT, { recursive: true });
let n = 0;
for (const [slot, meta] of Object.entries(cues.slots)) {
  const design = DESIGNS[slot];
  if (!design) throw new Error(`No fallback design for slot "${slot}"`);
  const variations = meta.variations ?? 1;
  for (let v = 1; v <= variations; v++) {
    const name = variations > 1 ? `${slot}_${v}` : slot;
    writeWav(join(OUT, `${name}.wav`), fadeOut(normalize(design(v))));
    n++;
  }
}
console.log(`Wrote ${n} fallback SFX to ${OUT}`);
