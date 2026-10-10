// npm run frames -- refs/ad.mp4 [--fps 10] [--out out/frames/ad]
// Exports every frame of a reference video at --fps (default 10), plus the exact frame at
// each hard cut, and writes index.json with timestamps. Use it to study a reference frame by
// frame. Files go to out/ (git-ignored); nothing is committed.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { ROOT, c, parseArgs } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const input = args._[0];
if (!input) {
  console.error(c.red("Usage: npm run frames -- refs/ad.mp4 [--fps 10] [--out out/frames/ad]"));
  process.exit(1);
}
const file = path.resolve(ROOT, input);
if (!fs.existsSync(file)) {
  console.error(c.red(`Not found: ${input}. Put the video in motion-kit/refs/ or public/refs/.`));
  process.exit(1);
}
const fps = Number(args.fps ?? 10);
const name = path.basename(file).replace(/\.[^.]+$/, "");
const outDir = path.resolve(ROOT, typeof args.out === "string" ? args.out : path.join("out", "frames", name));
const cutDir = path.join(outDir, "cuts");
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(cutDir, { recursive: true });

const run = (a) => spawnSync("ffmpeg", ["-v", "error", "-nostdin", ...a], { encoding: "utf8" });

// 1. Every frame at --fps.
const every = run(["-i", file, "-vf", `fps=${fps}`, path.join(outDir, "f%05d.png")]);
if (every.status !== 0) {
  console.error(c.red(`ffmpeg failed: ${every.stderr.trim().split("\n").pop()}`));
  process.exit(1);
}

// 2. Hard cuts: the first frame after each scene change above 0.30 (same threshold as reference.mjs).
const scene = spawnSync("ffmpeg", ["-v", "info", "-nostdin", "-i", file, "-vf", "select=gt(scene\\,0.30),showinfo", "-f", "null", "-"], { encoding: "utf8", maxBuffer: 1 << 28 });
const cuts = [...scene.stderr.matchAll(/pts_time:([\d.]+)/g)].map((m) => Number(m[1])).filter((t, i, a) => i === 0 || t - a[i - 1] >= 0.25);
cuts.forEach((t, k) => run(["-ss", String(t), "-i", file, "-frames:v", "1", path.join(cutDir, `cut${String(k + 1).padStart(3, "0")}_${t.toFixed(2)}s.png`)]));

const frames = fs.readdirSync(outDir).filter((f) => /^f\d+\.png$/.test(f)).length;
const index = { source: input, fps, frameInterval: +(1 / fps).toFixed(3), frames, cuts: cuts.map((t) => +t.toFixed(3)), files: { every: "f%05d.png (0-based time = (n-1)/fps)", cuts: "cuts/" } };
fs.writeFileSync(path.join(outDir, "index.json"), JSON.stringify(index, null, 2) + "\n");
console.log(c.green(`✔ ${frames} frames at ${fps} fps and ${cuts.length} cut frames → ${path.relative(ROOT, outDir)}`));
console.log(c.dim(`  cuts at: ${cuts.map((t) => t.toFixed(2) + "s").join(", ") || "none"}`));
