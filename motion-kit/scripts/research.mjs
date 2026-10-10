// npm run research -- refs/ [--out out/research]
// Measures every video in a folder and writes one research record per video plus a summary
// table. Records hold numbers only (cut times, motion curve, colours, tempo, easing estimate):
// no frames or footage are kept, so the output can be shared inside the team.
//
// Output:
//   out/research/<name>.json   one record per video
//   out/research/summary.csv   one row per video, for comparing styles across references
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { ROOT, c, parseArgs } from "./lib.mjs";
import { analyseReference } from "./reference.mjs";

/**
 * Frame-by-frame motion at 10 fps: mean absolute change between consecutive 64x36 grey
 * frames, 0 (still) to 1. Rises and falls in this curve show how each move eases in and out.
 */
const motionCurve = (file) => {
  const W = 64;
  const H = 36;
  const r = spawnSync("ffmpeg", ["-v", "error", "-nostdin", "-i", file, "-an", "-vf", `fps=10,scale=${W}:${H},format=gray`, "-f", "rawvideo", "-"], { maxBuffer: 1 << 30 });
  const buf = r.stdout ?? Buffer.alloc(0);
  const n = Math.floor(buf.length / (W * H));
  const curve = [];
  for (let k = 1; k < n; k++) {
    let sum = 0;
    for (let i = 0; i < W * H; i++) sum += Math.abs(buf[k * W * H + i] - buf[(k - 1) * W * H + i]);
    curve.push(Math.round((sum / (W * H * 255)) * 1000) / 1000);
  }
  return curve;
};

const args = parseArgs(process.argv.slice(2));
const input = args._[0];
if (!input) {
  console.error(c.red("Usage: npm run research -- refs/   (a folder of videos you have downloaded)"));
  process.exit(1);
}
const dir = path.resolve(ROOT, input);
const VIDEO = /\.(mp4|mov|m4v|webm|mkv)$/i;
const files = fs.statSync(dir).isDirectory() ? fs.readdirSync(dir).filter((f) => VIDEO.test(f)).sort().map((f) => path.join(dir, f)) : [dir];
if (!files.length) {
  console.error(c.red(`No videos in ${input}.`));
  process.exit(1);
}
const outDir = path.resolve(ROOT, typeof args.out === "string" ? args.out : path.join("out", "research"));
fs.mkdirSync(outDir, { recursive: true });

const rows = [];
for (const file of files) {
  const name = path.basename(file).replace(/\.[^.]+$/, "");
  process.stdout.write(c.dim(`measuring ${name}… `));
  try {
    const r = analyseReference(file);
    fs.writeFileSync(path.join(outDir, `${name}.json`), JSON.stringify({ source: path.relative(ROOT, file), ...r, curveFps: 10, curve: motionCurve(file) }, null, 2) + "\n");
    const sg = r.suggestion;
    rows.push({ name, duration: r.duration, shots: r.cuts.length + 1, avgShot: r.avgShot, motion: r.motion, bpm: r.bpm ?? "", theme: sg.theme, motionStyle: sg.motion, pace: sg.pace, transition: sg.transition });
    console.log(c.green("ok"));
  } catch (e) {
    console.log(c.red(`failed: ${e.message}`));
  }
}

const cols = ["name", "duration", "shots", "avgShot", "motion", "bpm", "theme", "motionStyle", "pace", "transition"];
const csv = [cols.join(",")]
  .concat(rows.map((r) => cols.map((k) => JSON.stringify(r[k] ?? "")).join(",")))
  .join("\n");
fs.writeFileSync(path.join(outDir, "summary.csv"), csv + "\n");
console.log(c.bold(`\n${rows.length}/${files.length} measured → ${path.relative(ROOT, outDir)}/summary.csv`));
