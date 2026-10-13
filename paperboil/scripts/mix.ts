/**
 * Offline mix: music edit + layered SFX cues (+ optional VO) → assets/audio/mix.wav
 *
 *  - Every cue layer (src/audio/cues.json) loads assets/audio/sfx-library/<slot>[_n].<ext>
 *    if present (wav/mp3/aif/aiff/flac/ogg/m4a), else the procedural fallback in
 *    assets/audio/sfx-fallback/. Optional per-slot trims (gainDb, semis) live in
 *    assets/audio/sfx-library/library.json, e.g. { "ui_pluck": { "semis": -2 } }
 *    when a tonal library file isn't rooted on B.
 *  - Layers are delayed to frame + offset, pitched by varispeed (2^(semis/12)),
 *    equal-power panned, summed on an SFX bus.
 *  - Music is ducked around hero cues (cue.duck) and under VO, then the whole
 *    mix is hard-gated to silence for the pre-drop vacuum.
 *  - Two-pass ffmpeg loudnorm to −14 LUFS / −1 dBTP.
 *
 * Deterministic and identical between Studio preview and renders: Remotion
 * just plays the one mix file.
 *
 *   npx tsx scripts/mix.ts
 */
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import cues from "../src/audio/cues.json";
import { storyboard } from "../src/storyboard";

const SR = 48000;
const FPS = 30;
const ROOT = join(__dirname, "..");
const A = (...p: string[]) => join(ROOT, "assets", "audio", ...p);
const EXTS = ["wav", "mp3", "aif", "aiff", "flac", "ogg", "m4a"];
const db = (d: number) => Math.pow(10, d / 20);

type Stereo = [Float32Array, Float32Array];

const decode = (path: string): Stereo => {
  const raw = execFileSync("ffmpeg", ["-v", "error", "-i", path, "-f", "f32le", "-ac", "2", "-ar", String(SR), "-"], { maxBuffer: 1 << 30 });
  const f = new Float32Array(raw.buffer, raw.byteOffset, raw.byteLength / 4);
  const n = f.length / 2;
  const l = new Float32Array(n);
  const r = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    l[i] = f[2 * i];
    r[i] = f[2 * i + 1];
  }
  return [l, r];
};

const library: Record<string, { gainDb?: number; semis?: number }> = existsSync(A("sfx-library", "library.json"))
  ? JSON.parse(readFileSync(A("sfx-library", "library.json"), "utf8"))
  : {};

const sourceCache = new Map<string, { audio: Stereo; fromLibrary: boolean }>();
const usage = { library: new Set<string>(), fallback: new Set<string>() };
const loadSlot = (slot: string, variant?: number) => {
  const name = variant ? `${slot}_${variant}` : slot;
  const hit = sourceCache.get(name);
  if (hit) return hit;
  // Library file wins; a variation falls back to the slot's base file if only one was supplied.
  for (const base of variant ? [name, slot] : [name]) {
    for (const ext of EXTS) {
      const p = A("sfx-library", `${base}.${ext}`);
      if (existsSync(p)) {
        const v = { audio: decode(p), fromLibrary: true };
        sourceCache.set(name, v);
        usage.library.add(base);
        return v;
      }
    }
  }
  const fb = A("sfx-fallback", `${name}.wav`);
  if (!existsSync(fb)) throw new Error(`No audio for slot ${name}: add assets/audio/sfx-library/${name}.wav or run npm run sfx-fallbacks`);
  const v = { audio: decode(fb), fromLibrary: false };
  sourceCache.set(name, v);
  usage.fallback.add(name);
  return v;
};

// ── Buses ────────────────────────────────────────────────────────────────────
const duration = storyboard.meta.durationInFrames / FPS;
const N = Math.round(duration * SR);
const sfxL = new Float32Array(N);
const sfxR = new Float32Array(N);

for (const cue of cues.cues) {
  for (const layer of cue.layers as Array<{ slot: string; offset?: number; gainDb?: number; pan?: number; semis?: number; var?: number }>) {
    const { audio, fromLibrary } = loadSlot(layer.slot, layer.var);
    const trim = fromLibrary ? library[layer.slot] ?? {} : {};
    const semis = (layer.semis ?? 0) + (trim.semis ?? 0);
    const rate = Math.pow(2, semis / 12);
    const gain = db((layer.gainDb ?? 0) + (trim.gainDb ?? 0));
    const pan = Math.max(-1, Math.min(1, layer.pan ?? 0));
    const gl = Math.cos(((pan + 1) * Math.PI) / 4) * Math.SQRT2;
    const gr = Math.sin(((pan + 1) * Math.PI) / 4) * Math.SQRT2;
    const start = Math.round(((cue.frame + (layer.offset ?? 0)) / FPS) * SR);
    const [l, r] = audio;
    const outLen = Math.floor(l.length / rate);
    for (let i = 0; i < outLen; i++) {
      const j = start + i;
      if (j < 0 || j >= N) continue;
      const pos = i * rate;
      const k = Math.floor(pos);
      const fr = pos - k;
      const vl = l[k] + ((l[k + 1] ?? l[k]) - l[k]) * fr;
      const vr = r[k] + ((r[k + 1] ?? r[k]) - r[k]) * fr;
      // Panned layers collapse to mono first; centred layers keep their stereo image.
      if (pan === 0) {
        sfxL[j] += vl * gain;
        sfxR[j] += vr * gain;
      } else {
        const m = (vl + vr) * 0.5 * gain;
        sfxL[j] += m * gl;
        sfxR[j] += m * gr;
      }
    }
  }
}

// Music + ducking automation (dB per sample, linear ramps in frames).
const [mL, mR] = existsSync(A("music.wav")) ? decode(A("music.wav")) : [new Float32Array(N), new Float32Array(N)];
const duckDb = new Float32Array(N);
const addDuck = (startF: number, depthDb: number, attackF: number, holdF: number, releaseF: number) => {
  for (let i = 0; i < N; i++) {
    const f = (i / SR) * FPS;
    let d = 0;
    if (f >= startF - attackF && f < startF) d = depthDb * ((f - (startF - attackF)) / Math.max(1, attackF));
    else if (f >= startF && f < startF + holdF) d = depthDb;
    else if (f >= startF + holdF && f < startF + holdF + releaseF) d = depthDb * (1 - (f - startF - holdF) / releaseF);
    if (d < duckDb[i]) duckDb[i] = d;
  }
};
for (const cue of cues.cues as Array<{ frame: number; duck?: { depthDb: number; attack: number; release: number } }>) {
  if (cue.duck) addDuck(cue.frame, cue.duck.depthDb, cue.duck.attack, 3, cue.duck.release);
}

// Optional VO, with the music ducked under each caption window.
let voL: Float32Array<ArrayBufferLike> = new Float32Array(N);
let voR: Float32Array<ArrayBufferLike> = new Float32Array(N);
const vo = storyboard.audio.vo;
if (vo && existsSync(A(vo.replace(/^audio\//, "")))) {
  [voL, voR] = decode(A(vo.replace(/^audio\//, "")));
  for (const c of storyboard.captions) addDuck(c.start * FPS, storyboard.audio.voDuckDb, 4, (c.end - c.start) * FPS, 8);
}

const musicGain = db(cues.musicGainDb ?? 0);
const vac = cues.vacuumSilence;
const out = new Float32Array(N * 2);
for (let i = 0; i < N; i++) {
  const t = i / SR;
  // Hard gate (not a fade) for the pre-drop vacuum; 5 ms ramps avoid clicks.
  const gate = t < vac.start - 0.005 || t >= vac.end + 0.005 ? 1 : t < vac.start ? (vac.start - t) / 0.005 : t >= vac.end ? (t - vac.end) / 0.005 : 0;
  const g = musicGain * db(duckDb[i]);
  out[2 * i] = ((mL[i] ?? 0) * g + sfxL[i] + (voL[i] ?? 0)) * gate;
  out[2 * i + 1] = ((mR[i] ?? 0) * g + sfxR[i] + (voR[i] ?? 0)) * gate;
}

const pre = A("mix.pre.f32");
writeFileSync(pre, Buffer.from(out.buffer));
const input = ["-f", "f32le", "-ar", String(SR), "-ac", "2", "-i", pre];
// Pass 1: measure. ffmpeg prints the loudnorm JSON on stderr.
const { stderr } = spawnSync("ffmpeg", ["-hide_banner", "-nostats", ...input, "-af", "loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"], { encoding: "utf8" });
const stats = JSON.parse(stderr.slice(stderr.lastIndexOf("{"), stderr.lastIndexOf("}") + 1));
// Pass 2: apply with the measured values.
execFileSync("ffmpeg", [
  "-hide_banner", "-v", "error", "-y", ...input,
  "-af", `loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=${stats.input_i}:measured_TP=${stats.input_tp}:measured_LRA=${stats.input_lra}:measured_thresh=${stats.input_thresh}:offset=${stats.target_offset}:linear=true,aresample=${SR}`,
  "-c:a", "pcm_s16le", A("mix.wav"),
]);
unlinkSync(pre);

console.log(`mix.wav written: ${cues.cues.length} cues, ${usage.library.size} slot(s) from your library, ${usage.fallback.size} on procedural fallbacks.`);
if (usage.fallback.size) console.log(`Fallbacks in use: ${[...usage.fallback].sort().join(", ")}`);
