/**
 * Generates placeholder audio so sync can be checked by ear before real
 * music, SFX and VO arrive:
 *   assets/audio/music.wav      — 30.0 s, 120 BPM, follows the music brief (§5)
 *   assets/audio/sfx/*.wav      — one stub per cue-sheet sound
 *
 * Everything is synthesised deterministically (no samples, no network).
 * Replace any file with the real one of the same name; nothing else changes.
 *
 *   npx tsx scripts/make-stub-audio.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SR = 48000;
const BEAT = 0.5;
const OUT = join(__dirname, "..", "assets", "audio");

// ── tiny DSP kit ─────────────────────────────────────────────────────────────
let seed = 1234567;
const rnd = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
};
const noise = () => rnd() * 2 - 1;
const buf = (seconds: number) => new Float32Array(Math.round(seconds * SR));
const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

/** Add a generated voice into `out` starting at `at` seconds. */
const add = (out: Float32Array, at: number, seconds: number, gen: (t: number, i: number) => number, gain = 1) => {
  const start = Math.round(at * SR);
  const n = Math.round(seconds * SR);
  for (let i = 0; i < n && start + i < out.length; i++) {
    if (start + i < 0) continue;
    out[start + i] += gen(i / SR, i) * gain;
  }
};

const env = (t: number, attack: number, decay: number) => (t < attack ? t / attack : Math.exp(-(t - attack) / decay));

const pluck = (f: number) => (t: number) =>
  env(t, 0.004, 0.18) * (Math.sin(2 * Math.PI * f * t) + 0.35 * Math.sin(4 * Math.PI * f * t) + 0.12 * Math.sin(6 * Math.PI * f * t));

const saw = (f: number, t: number, harmonics = 8) => {
  let v = 0;
  for (let h = 1; h <= harmonics; h++) v += Math.sin(2 * Math.PI * f * h * t) / h;
  return v * 0.6;
};

const kick = (t: number) => {
  const f = 45 + 110 * Math.exp(-t / 0.035);
  return Math.sin(2 * Math.PI * f * t) * env(t, 0.002, 0.16);
};

const lowpass = (x: Float32Array, cutoffAt: (i: number) => number) => {
  const y = new Float32Array(x.length);
  let prev = 0;
  for (let i = 0; i < x.length; i++) {
    const rc = 1 / (2 * Math.PI * cutoffAt(i));
    const a = 1 / SR / (rc + 1 / SR);
    prev = prev + a * (x[i] - prev);
    y[i] = prev;
  }
  return y;
};

const highpass = (x: Float32Array, cutoff: number) => {
  const lp = lowpass(x, () => cutoff);
  return x.map((v, i) => v - lp[i]);
};

const normalize = (x: Float32Array, peakDb: number) => {
  let peak = 0;
  for (const v of x) peak = Math.max(peak, Math.abs(v));
  const g = peak > 0 ? Math.pow(10, peakDb / 20) / peak : 1;
  return x.map((v) => v * g);
};

const writeWav = (path: string, mono: Float32Array) => {
  const n = mono.length;
  const data = Buffer.alloc(n * 4);
  for (let i = 0; i < n; i++) {
    const s = Math.max(-1, Math.min(1, mono[i]));
    const v = Math.round(s * 32767);
    data.writeInt16LE(v, i * 4);
    data.writeInt16LE(v, i * 4 + 2);
  }
  const h = Buffer.alloc(44);
  h.write("RIFF", 0);
  h.writeUInt32LE(36 + data.length, 4);
  h.write("WAVE", 8);
  h.write("fmt ", 12);
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20);
  h.writeUInt16LE(2, 22);
  h.writeUInt32LE(SR, 24);
  h.writeUInt32LE(SR * 4, 28);
  h.writeUInt16LE(4, 32);
  h.writeUInt16LE(16, 34);
  h.write("data", 36);
  h.writeUInt32LE(data.length, 40);
  writeFileSync(path, Buffer.concat([h, data]));
};

// ── music bed ────────────────────────────────────────────────────────────────
const makeMusic = () => {
  const verse = buf(30);
  const drop = buf(30);
  const melody = [72, 76, 79, 76, 74, 77, 81, 77, 72, 76, 79, 84, 83, 79, 76, 74];

  // Bars 1–6 (0–12 s): plucked mallet melody on 8ths.
  for (let k = 0; k < 24; k++) {
    const t = k * BEAT * 0.5 * 2;
    add(verse, t, 0.6, pluck(midi(melody[k % melody.length])), 0.35);
    add(verse, t + BEAT * 0.5, 0.5, pluck(midi(melody[(k + 5) % melody.length] - 12)), 0.18);
  }
  // Rim-click on 2 & 4 and shaker 16ths from 1.0; hats out at 5.5; muffled bars 5–6.
  for (let t = 1.0; t < 8.0; t += BEAT) {
    if (Math.round((t - 1.0) / BEAT) % 2 === 1) add(verse, t, 0.03, (x) => noise() * env(x, 0.001, 0.008), 0.5);
  }
  for (let t = 1.0; t < 5.5; t += BEAT / 4) add(verse, t, 0.05, (x) => noise() * env(x, 0.004, 0.015), 0.12);
  // Bars 5–6 low-passed to ~500 Hz (muffled).
  const muffled = lowpass(verse, (i) => (i / SR < 7.5 ? 18000 : i / SR < 8.0 ? 18000 - ((i / SR - 7.5) / 0.5) * 17500 : 500));
  const bedVerse = verse.map((v, i) => (i / SR < 7.5 ? v : muffled[i]));

  // Bar 7: noise riser 12–14 s.
  add(bedVerse, 12.0, 2.0, (t) => noise() * Math.pow(t / 2, 2.2), 0.35);
  // Bar 8: snare roll 14.0–15.5, accelerating 8ths → 32nds.
  let t = 14.0;
  while (t < 15.5) {
    add(bedVerse, t, 0.08, (x) => (noise() * 0.8 + Math.sin(2 * Math.PI * 190 * x) * 0.4) * env(x, 0.001, 0.04), 0.25 + ((t - 14) / 1.5) * 0.35);
    t += t < 14.5 ? 0.25 : t < 15.0 ? 0.125 : 0.0625;
  }

  // Bars 9–14 (16–28 s): DROP. Kick, sub, bright lead, hats.
  const chords = [
    [48, 60, 64, 67], // C
    [45, 60, 64, 69], // Am
    [41, 60, 65, 69], // F
    [50, 62, 65, 69], // Dm
    [43, 59, 62, 67], // G
    [48, 60, 64, 67], // C (resolve on bar 14)
  ];
  for (let bar = 0; bar < 6; bar++) {
    const b0 = 16.0 + bar * 2;
    const [root, ...tones] = chords[bar];
    for (let k = 0; k < 4; k++) add(drop, b0 + k * BEAT, 0.4, kick, 0.9);
    add(drop, b0, 2.0, (x) => Math.sin(2 * Math.PI * midi(root - 12) * x) * env(x, 0.01, 1.4), 0.45);
    for (let k = 0; k < 8; k++) {
      add(drop, b0 + k * BEAT * 0.5 + BEAT * 0.25, 0.04, (x) => noise() * env(x, 0.001, 0.01), 0.15);
      if (k % 2 === 1) for (const n of tones) add(drop, b0 + k * BEAT * 0.5, 0.25, (x) => saw(midi(n), x) * env(x, 0.005, 0.12), 0.09);
    }
    const lead = [melody[bar * 2] + 12, melody[bar * 2 + 1] + 12, melody[bar * 2 + 2] + 12, melody[bar * 2 + 3]];
    lead.forEach((n, k) => add(drop, b0 + k * BEAT, BEAT * 0.95, (x) => saw(midi(n), x, 6) * env(x, 0.01, 0.35), 0.12));
  }
  // Bar 15: one final hit on 28.0, ring-out tail through 30.0.
  add(drop, 28.0, 2.0, kick, 1.0);
  for (const n of [48, 60, 64, 67, 72]) add(drop, 28.0, 2.0, (x) => saw(midi(n), x, 5) * env(x, 0.005, 0.7), 0.12);

  const mix = new Float32Array(bedVerse.length);
  for (let i = 0; i < mix.length; i++) {
    const s = i / SR;
    const verseGain = s < 16.0 ? 1 : 0;
    mix[i] = bedVerse[i] * verseGain + drop[i] * 1.8; // drop sits ~+5 dB over the verse
    if (s >= 15.5 && s < 16.0) mix[i] = 0; // hard gate (also enforced in the mix)
  }
  return normalize(highpass(mix, 25), -3);
};

// ── SFX stubs ────────────────────────────────────────────────────────────────
const sfx: Record<string, () => Float32Array> = {
  "paper-tap": () => {
    const x = buf(0.15);
    add(x, 0, 0.15, (t) => noise() * env(t, 0.001, 0.02));
    return lowpass(x, () => 3000);
  },
  "bloop-0": () => bloop(0),
  "bloop-1": () => bloop(1),
  "bloop-2": () => bloop(2),
  sparkle: () => {
    const x = buf(0.6);
    [2637, 3136, 3951].forEach((f, k) => add(x, k * 0.06, 0.4, (t) => Math.sin(2 * Math.PI * f * t) * env(t, 0.002, 0.12), 0.4));
    return x;
  },
  whoomp: () => {
    const x = buf(0.4);
    add(x, 0, 0.4, (t) => Math.sin(2 * Math.PI * (60 + 140 * Math.exp(-t / 0.08)) * t) * env(t, 0.01, 0.12));
    return x;
  },
  keys: () => {
    const x = buf(0.6);
    for (let k = 0; k < 4; k++) add(x, k * 0.125, 0.03, (t) => noise() * env(t, 0.0005, 0.006), 0.8);
    return highpass(x, 1500);
  },
  pop: () => {
    const x = buf(0.12);
    add(x, 0, 0.12, (t) => Math.sin(2 * Math.PI * (300 + 600 * Math.exp(-t / 0.02)) * t) * env(t, 0.001, 0.03));
    return x;
  },
  tap: () => {
    const x = buf(0.08);
    add(x, 0, 0.08, (t) => (noise() * 0.5 + Math.sin(2 * Math.PI * 2000 * t)) * env(t, 0.0005, 0.01));
    return x;
  },
  chime: () => {
    const x = buf(0.9);
    add(x, 0, 0.9, (t) => (Math.sin(2 * Math.PI * 880 * t) + 0.6 * Math.sin(2 * Math.PI * 1320 * t)) * env(t, 0.003, 0.25), 0.6);
    return x;
  },
  "sub-hit": () => {
    const x = buf(1.0);
    add(x, 0, 1.0, (t) => Math.sin(2 * Math.PI * 55 * t) * env(t, 0.005, 0.3));
    return x;
  },
  whoosh: () => {
    const x = buf(0.5);
    add(x, 0, 0.5, (t) => noise() * Math.sin(Math.PI * (t / 0.5)) ** 2);
    return lowpass(x, (i) => 400 + (i / x.length) * 4000);
  },
  drone: () => {
    const x = buf(4.0);
    add(x, 0, 4.0, (t) => (Math.sin(2 * Math.PI * 55 * t) + 0.5 * Math.sin(2 * Math.PI * 82.4 * t)) * (0.7 + 0.3 * Math.sin(2 * Math.PI * 0.5 * t)) * Math.min(1, t / 0.5, (4 - t) / 0.5), 0.6);
    return x;
  },
  rattle: () => {
    const x = buf(0.4);
    for (let k = 0; k < 6; k++) add(x, k * 0.05, 0.04, (t) => (noise() * 0.4 + Math.sin(2 * Math.PI * 1800 * t)) * env(t, 0.0005, 0.008), 0.7);
    return x;
  },
  riser: () => {
    const x = buf(1.0);
    add(x, 0, 1.0, (t) => (noise() * 0.6 + Math.sin(2 * Math.PI * (200 + 800 * t * t) * t) * 0.4) * t * t);
    return x;
  },
  click: () => {
    const x = buf(0.05);
    add(x, 0, 0.05, (t) => Math.sin(2 * Math.PI * 3000 * t) * env(t, 0.0003, 0.004));
    return x;
  },
  clunk: () => {
    const x = buf(0.3);
    add(x, 0, 0.3, (t) => Math.sin(2 * Math.PI * 120 * t) * env(t, 0.001, 0.06) + noise() * env(t, 0.0005, 0.006) * 0.4);
    return x;
  },
  swell: () => {
    const x = buf(0.6);
    for (const f of [523, 659, 784]) add(x, 0, 0.6, (t) => Math.sin(2 * Math.PI * f * t) * (t / 0.6) ** 2, 0.3);
    return x;
  },
  impact: () => {
    const x = buf(1.4);
    add(x, 0, 1.4, (t) => Math.sin(2 * Math.PI * (38 + 120 * Math.exp(-t / 0.05)) * t) * env(t, 0.002, 0.4));
    add(x, 0, 0.4, (t) => noise() * env(t, 0.001, 0.08), 0.5); // paint-splash "shhk"
    return x;
  },
  stamp: () => {
    const x = buf(0.25);
    add(x, 0, 0.25, (t) => Math.sin(2 * Math.PI * 150 * t) * env(t, 0.001, 0.05) + noise() * env(t, 0.0005, 0.01) * 0.6);
    return x;
  },
  "flick-0": () => flick(0),
  "flick-2": () => flick(2),
  "flick-4": () => flick(4),
  "flick-5": () => flick(5),
};

function bloop(semitone: number) {
  const x = buf(0.18);
  const f = 600 * Math.pow(2, semitone / 12);
  add(x, 0, 0.18, (t) => Math.sin(2 * Math.PI * f * (1 + 0.4 * Math.exp(-t / 0.02)) * t) * env(t, 0.002, 0.05));
  return x;
}

function flick(semitone: number) {
  const x = buf(0.12);
  const f = 1200 * Math.pow(2, semitone / 12);
  add(x, 0, 0.12, (t) => (noise() * 0.7 + Math.sin(2 * Math.PI * f * t) * 0.5) * env(t, 0.001, 0.025));
  return x;
}

mkdirSync(join(OUT, "sfx"), { recursive: true });
writeWav(join(OUT, "music.wav"), makeMusic());
for (const [name, gen] of Object.entries(sfx)) writeWav(join(OUT, "sfx", `${name}.wav`), normalize(gen(), -3));
console.log(`Wrote music.wav + ${Object.keys(sfx).length} SFX stubs to ${OUT}`);
