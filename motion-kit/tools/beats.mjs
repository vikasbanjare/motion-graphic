#!/usr/bin/env node
// Onset map of a mix, for snapping cues to the sound (meyda, MIT).
// usage: node tools/beats.mjs <mix.wav> <fps> <out.json>
// Reads 16-bit PCM WAV, folds to mono, runs meyda per 1024-sample window (hop 512): energy, spectral flux,
// spectral centroid. Onsets = local peaks of positive spectral flux above an adaptive threshold.
// Output: { fps, frames: [onset frame numbers], strength: [0..1], energy: [per film frame 0..1] }.
import fs from "node:fs";
import Meyda from "meyda";

const [, , inPath, fpsArg = "24", outPath] = process.argv;
if (!inPath || !outPath) {
  console.error("usage: node tools/beats.mjs <mix.wav> <fps> <out.json>");
  process.exit(1);
}
const fps = Number(fpsArg);
const buf = fs.readFileSync(inPath);

// minimal WAV reader: find "fmt " and "data" chunks
let off = 12, rate = 44100, ch = 2, bits = 16, data = null;
while (off < buf.length - 8) {
  const id = buf.toString("ascii", off, off + 4);
  const size = buf.readUInt32LE(off + 4);
  if (id === "fmt ") {
    ch = buf.readUInt16LE(off + 10);
    rate = buf.readUInt32LE(off + 12);
    bits = buf.readUInt16LE(off + 22);
  } else if (id === "data") data = buf.subarray(off + 8, off + 8 + size);
  off += 8 + size + (size % 2);
}
if (!data || bits !== 16) throw new Error("need 16-bit PCM wav");
const n = data.length / 2 / ch;
const mono = new Float32Array(n);
for (let i = 0; i < n; i++) {
  let s = 0;
  for (let c = 0; c < ch; c++) s += data.readInt16LE((i * ch + c) * 2);
  mono[i] = s / ch / 32768;
}

const W = 1024, HOP = 512;
Meyda.bufferSize = W;
Meyda.sampleRate = rate;
Meyda.windowingFunction = "hanning";
const flux = [], energy = [], times = [];
let prev = null;
for (let i = 0; i + W <= n; i += HOP) {
  const frame = mono.subarray(i, i + W);
  const f = Meyda.extract(["amplitudeSpectrum", "energy"], frame);
  let fl = 0;
  if (prev) for (let k = 0; k < f.amplitudeSpectrum.length; k++) fl += Math.max(0, f.amplitudeSpectrum[k] - prev[k]);
  prev = Float32Array.from(f.amplitudeSpectrum);
  flux.push(fl);
  energy.push(f.energy);
  times.push((i + W / 2) / rate);
}

// adaptive threshold: median of a 1 s window * 1.6, peaks at least 0.12 s apart
const win = Math.round(rate / HOP / 2);
const onsets = [];
const maxFlux = Math.max(...flux) || 1;
for (let i = 1; i < flux.length - 1; i++) {
  const lo = Math.max(0, i - win), hi = Math.min(flux.length, i + win);
  const sorted = flux.slice(lo, hi).sort((a, b) => a - b);
  const thr = sorted[Math.floor(sorted.length / 2)] * 1.6 + maxFlux * 0.015;
  if (flux[i] > thr && flux[i] >= flux[i - 1] && flux[i] > flux[i + 1]) {
    const t = times[i];
    if (!onsets.length || t - onsets[onsets.length - 1].t > 0.12) onsets.push({ t, s: flux[i] / maxFlux });
  }
}

const dur = n / rate, nf = Math.ceil(dur * fps);
const maxE = Math.max(...energy) || 1;
const eFrames = Array.from({ length: nf }, (_, fr) => {
  const t = fr / fps;
  const k = Math.min(energy.length - 1, Math.max(0, Math.round((t * rate - W / 2) / HOP)));
  return +(energy[k] / maxE).toFixed(3);
});
const out = { fps, source: inPath.split("/").pop(), frames: onsets.map((o) => Math.round(o.t * fps)), strength: onsets.map((o) => +o.s.toFixed(3)), energy: eFrames };
fs.writeFileSync(outPath, JSON.stringify(out));
console.log(`${onsets.length} onsets over ${dur.toFixed(2)} s -> ${outPath}`);
