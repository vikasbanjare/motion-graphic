// npm run reference -- refs/ad.mp4 [--json]
// Measures a reference video and suggests a matching style: how often it cuts, how
// much moves on screen, its colours and brightness, and its music tempo. Everything is
// read in memory through ffmpeg; nothing is written.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { ROOT, c, engine, parseArgs } from "./lib.mjs";
import { extractPalette } from "./brand.mjs";
import { analysePcm, decode } from "./beats.mjs";

const T = await engine();
const ff = (args, opts = {}) => spawnSync("ffmpeg", ["-v", "error", "-nostdin", ...args], { maxBuffer: 1 << 30, ...opts });

const probe = (file) => {
  const r = spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration:stream=codec_type,width,height", "-of", "json", file], { encoding: "utf8" });
  if (r.status !== 0) throw new Error(`Could not read ${file}: ${r.stderr.trim().split("\n").pop()}`);
  const j = JSON.parse(r.stdout);
  const video = j.streams.find((s) => s.codec_type === "video");
  if (!video) throw new Error(`${path.basename(file)} has no video stream.`);
  return { duration: Number(j.format.duration) || 0, width: video.width, height: video.height, audio: j.streams.some((s) => s.codec_type === "audio") };
};

/** Hard cuts: ffmpeg's scene score above a threshold, at least 0.25 s apart. */
export const cutsOf = (file) => {
  const r = ff(["-i", file, "-an", "-vf", "scale=160:-2,select='gt(scene,0.30)',showinfo", "-f", "null", "-"], { encoding: "utf8" });
  const times = [...String(r.stderr).matchAll(/pts_time:([\d.]+)/g)].map((m) => Number(m[1]));
  return times.filter((t, i) => i === 0 || t - times[i - 1] >= 0.25);
};

const W = 64;
const H = 36;
/** Mean absolute change between grey 64x36 frames at 10 fps, ignoring the frames at cuts. */
export const motionOf = (file, cuts) => {
  const r = ff(["-i", file, "-an", "-vf", `fps=10,scale=${W}:${H},format=gray`, "-f", "rawvideo", "-"]);
  const buf = r.stdout;
  const n = Math.floor(buf.length / (W * H));
  const diffs = [];
  for (let i = 1; i < n; i++) {
    const t = i / 10;
    if (cuts.some((cut) => Math.abs(cut - t) < 0.15)) continue;
    let sum = 0;
    for (let p = 0; p < W * H; p++) sum += Math.abs(buf[i * W * H + p] - buf[(i - 1) * W * H + p]);
    diffs.push(sum / (W * H) / 255);
  }
  diffs.sort((a, b) => a - b);
  return diffs.length ? diffs[Math.floor(diffs.length / 2)] : 0;
};

/** Colours from 12 frames spread over the video (96 px wide, 4-bit per channel bins). */
export const coloursOf = (file, duration) => {
  /** bin -> [count, sumR, sumG, sumB]: binned for clustering, reported as the bin's mean colour. */
  const bins = new Map();
  let lum = 0;
  let px = 0;
  for (let k = 0; k < 12; k++) {
    const at = (duration * (k + 0.5)) / 12;
    const r = ff(["-ss", at.toFixed(2), "-i", file, "-frames:v", "1", "-vf", "scale=96:-2", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"]);
    const b = r.stdout;
    for (let i = 0; i + 2 < b.length; i += 3) {
      const q = ((b[i] >> 4) << 8) | ((b[i + 1] >> 4) << 4) | (b[i + 2] >> 4);
      const bin = bins.get(q) ?? [0, 0, 0, 0];
      bin[0]++;
      bin[1] += b[i];
      bin[2] += b[i + 1];
      bin[3] += b[i + 2];
      bins.set(q, bin);
      lum += (0.2126 * b[i] + 0.7152 * b[i + 1] + 0.0722 * b[i + 2]) / 255;
      px++;
    }
  }
  const counts = new Map();
  for (const [n, r, g, bl] of bins.values()) {
    const packed = (Math.round(r / n) << 16) | (Math.round(g / n) << 8) | Math.round(bl / n);
    counts.set(packed, (counts.get(packed) ?? 0) + n);
  }
  return { palette: extractPalette(counts, 6).map((p) => ({ hex: p.hex, share: Math.round(p.share * 1000) / 1000, c: p.c, l: p.l })), lum: px ? lum / px : 0.5 };
};

/** Map the measurements to the kit's styles. */
export const suggest = ({ avgShot, motion, lum, palette, bpm }) => {
  const why = [];
  const energy = motion > 0.045 || avgShot < 1.1 ? "high" : motion > 0.018 || avgShot < 2.4 ? "medium" : "calm";
  const brightness = lum > 0.6 ? "light" : lum < 0.35 ? "dark" : "mixed";
  const vivid = palette.filter((p) => p.c > 0.12 && p.share > 0.03);
  const saturated = vivid.reduce((a, p) => a + p.share, 0) > 0.25;
  const warm = vivid.some((p) => p.h !== undefined && (p.h < 80 || p.h > 330));

  const pace = avgShot < 1.4 ? "fast" : avgShot > 2.8 ? "relaxed" : "normal";
  why.push(`a cut every ${avgShot.toFixed(1)} s → pace "${pace}"`);
  const motionName = energy === "high" ? (saturated && !warm ? "snappy" : saturated ? "bouncy" : "snappy") : energy === "medium" ? "smooth" : "calm";
  why.push(`${energy} on-screen movement → "${motionName}" motion`);
  const transition = energy === "calm" ? (brightness === "light" ? "fade" : "blur") : avgShot < 1.2 ? "whip" : energy === "high" ? "zoom" : "push";
  why.push(`→ "${transition}" transitions`);

  let theme;
  if (brightness === "dark") theme = saturated ? (warm ? "midnight" : "neon") : "studio-dark";
  else if (brightness === "light") theme = saturated ? (warm ? "pop" : "clean") : energy === "calm" ? "studio" : warm ? "editorial" : "clean";
  else theme = saturated ? "midnight" : "corporate";
  why.push(`${brightness}${saturated ? ", colourful" : ", restrained"}${warm ? ", warm" : ""} picture → theme "${theme}"`);
  if (bpm) why.push(`music around ${Math.round(bpm)} BPM: pick a track near that tempo in the Sound step`);

  // A dominant canvas colour (40%+ of the picture, not too saturated) becomes the look's background.
  const look = {};
  const canvas = palette[0];
  if (canvas && canvas.share >= 0.4 && canvas.c < 0.08) {
    look.bg = canvas.hex;
    why.push(`its canvas is ${canvas.hex} (${Math.round(canvas.share * 100)}% of the picture) → used as the background`);
  }
  return { energy, brightness, suggestion: { theme, motion: motionName, pace, transition, look, why } };
};

export const analyseReference = (file) => {
  const info = probe(file);
  const cuts = cutsOf(file);
  const shots = cuts.length + 1;
  const avgShot = info.duration / shots;
  const motion = motionOf(file, cuts);
  const { palette, lum } = coloursOf(file, info.duration);
  let bpm = null;
  if (info.audio) {
    try {
      const a = analysePcm(decode(file));
      bpm = a.rhythmic ? a.bpm : null;
    } catch {
      bpm = null;
    }
  }
  const s = suggest({ avgShot, motion, lum, palette: palette.map((p) => ({ ...p, h: T.hexToOklch(p.hex).h })), bpm });
  return {
    file: path.basename(file),
    duration: Math.round(info.duration * 100) / 100,
    size: { width: info.width, height: info.height },
    cuts: cuts.map((t) => Math.round(t * 100) / 100),
    avgShot: Math.round(avgShot * 100) / 100,
    motion: Math.round(motion * 1000) / 1000,
    palette: palette.map(({ hex, share }) => ({ hex, share })),
    brightness: s.brightness,
    energy: s.energy,
    bpm,
    suggestion: s.suggestion,
  };
};

const isMain = process.argv[1] && import.meta.url === pathToFileURL(fs.realpathSync(process.argv[1])).href;
if (isMain) {
  const args = parseArgs(process.argv.slice(2));
  const rel = args._[0];
  if (!rel) {
    console.log("Usage: npm run reference -- refs/ad.mp4 [--json]   (path inside public/, or any path)");
    process.exit(1);
  }
  const file = fs.existsSync(rel) ? path.resolve(rel) : path.join(ROOT, "public", rel);
  try {
    const r = analyseReference(file);
    if (args.json) console.log(JSON.stringify(r));
    else {
      console.log(c.bold(`\n${r.file}`) + c.dim(` · ${r.duration}s · ${r.size.width}x${r.size.height}`));
      console.log(`  ${r.cuts.length + 1} shots, one every ${r.avgShot}s · ${r.energy} motion · ${r.brightness}${r.bpm ? ` · ~${Math.round(r.bpm)} BPM` : ""}`);
      console.log(`  Colours: ${r.palette.map((p) => `${p.hex} ${Math.round(p.share * 100)}%`).join("  ")}`);
      console.log(c.bold("\n  Suggested style"));
      for (const w of r.suggestion.why) console.log(c.dim("  · ") + w);
      console.log(c.green(`\n  theme ${r.suggestion.theme} · motion ${r.suggestion.motion} · transition ${r.suggestion.transition} · pace ${r.suggestion.pace}\n`));
    }
  } catch (e) {
    console.error(c.red("✖ ") + e.message);
    process.exit(1);
  }
}
