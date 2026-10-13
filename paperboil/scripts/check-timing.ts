/**
 * Acceptance tests (03_REPO_BUILD_PROMPT.md). Run: npm run check
 *   1. Shots are contiguous and sum to exactly 900 frames.
 *   2. The drop cue is at frame 480.
 *   3. Every text event holds ≥ 45 frames, except kinetic verbs and card-flick words.
 *   4. Orange text only over navy or ink; over light grounds text must be navy.
 *   5. Open Sans is the only font family referenced anywhere.
 *   6. Loudness after loudnorm.sh: integrated ≈ −14 LUFS, true peak ≤ −1 dBTP
 *      (skipped until out/*.norm.mp4 exists; pass --require-loudness to fail instead).
 * Plus: cue frames match their times, and every cue/asset file referenced exists.
 */
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import cues from "../src/audio/cues.json";
import { DARK_GROUNDS, ORANGE_TEXT_TOKENS, type PaletteToken } from "../src/palette";
import { storyboard } from "../src/storyboard";
import { FPS, sec } from "../src/timing";

const ROOT = join(__dirname, "..");
const failures: string[] = [];
const passes: string[] = [];
const check = (name: string, ok: boolean, detail = "") => (ok ? passes : failures).push(`${name}${detail ? ` — ${detail}` : ""}`);

// 1 ─ contiguous shots, 900 frames
{
  const { shots, meta } = storyboard;
  let ok = sec(shots[0].start) === 0;
  const gaps: string[] = [];
  for (let i = 1; i < shots.length; i++) {
    if (sec(shots[i].start) !== sec(shots[i - 1].end)) {
      ok = false;
      gaps.push(`${shots[i - 1].id}→${shots[i].id}`);
    }
  }
  const total = shots.reduce((n, s) => n + (sec(s.end) - sec(s.start)), 0);
  check("1. shots contiguous and total 900 frames", ok && total === 900 && meta.durationInFrames === 900, `total=${total}${gaps.length ? ` gaps: ${gaps.join(", ")}` : ""}`);
}

// 2 ─ drop at frame 480
{
  const drop = cues.cues.find((c) => c.id === "drop");
  check("2. drop cue at frame 480", drop?.frame === 480 && sec(storyboard.meta.dropSeconds) === 480, `drop=${drop?.frame}`);
  const s10 = storyboard.shots.find((s) => s.id === "S10");
  check("2b. S10 (the drop) starts on frame 480", s10 !== undefined && sec(s10.start) === 480);
  const v = storyboard.meta.vacuum;
  check("2c. vacuum gate is 15.5–16.0 s", sec(v.start) === 465 && sec(v.end) === 480);
  const bad = cues.cues.filter((c) => Math.round(c.time * FPS) !== c.frame);
  check("2d. every cue frame = time × 30", bad.length === 0, bad.map((c) => c.id).join(", "));
}

// 3 ─ text holds
{
  const exempt = new Set(["kinetic", "flick"]);
  const short = storyboard.text.filter((t) => !exempt.has(t.kind) && sec(t.end) - sec(t.start) < 45);
  check("3. text events hold ≥ 45 frames", short.length === 0, short.map((t) => `${t.id}=${sec(t.end) - sec(t.start)}f`).join(", "));
}

// 4 ─ contrast rule
{
  const LIGHT: PaletteToken[] = ["cream", "pale", "tint", "sky", "orangePale", "orangeLight"];
  const bad = storyboard.text.filter((t) => {
    if (ORANGE_TEXT_TOKENS.includes(t.color)) return !DARK_GROUNDS.includes(t.ground);
    if (LIGHT.includes(t.ground)) return t.color !== "navy";
    if (t.ground === "orange") return !["ink", "navy"].includes(t.color);
    return false;
  });
  check("4. orange text only on navy/ink; navy on light grounds", bad.length === 0, bad.map((t) => `${t.id}: ${t.color} on ${t.ground}`).join(", "));
}

// 5 ─ only Open Sans
{
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const f of readdirSync(dir)) {
      const p = join(dir, f);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(tsx?|json|css)$/.test(f)) files.push(p);
    }
  };
  walk(join(ROOT, "src"));
  const offenders: string[] = [];
  for (const f of files) {
    const src = readFileSync(f, "utf8");
    // Quoted font-family values (CSS, style objects, JSON) and @font-face/loadFont families.
    for (const m of src.matchAll(/(?:font-?family|family)["']?\s*[:=]\s*["'`]([^"'`]+)["'`]/gi)) {
      const fam = m[1].trim();
      if (fam !== "Open Sans") offenders.push(`${relative(ROOT, f)}: ${fam}`);
    }
  }
  const fontFiles = readdirSync(join(ROOT, "assets", "fonts"));
  const nonOpenSans = fontFiles.filter((f) => !f.startsWith("OpenSans-"));
  check("5. Open Sans is the only font", offenders.length === 0 && nonOpenSans.length === 0 && storyboard.meta.fontFamily === "Open Sans", [...offenders, ...nonOpenSans].join(", "));
}

// 6 ─ loudness
{
  const outDir = join(ROOT, "out");
  const normed = existsSync(outDir) ? readdirSync(outDir).filter((f) => f.endsWith(".norm.mp4")) : [];
  if (normed.length === 0) {
    const msg = "6. loudness — SKIPPED (run npm run render && npm run loudnorm first)";
    if (process.argv.includes("--require-loudness")) failures.push(msg);
    else passes.push(msg);
  } else {
    for (const f of normed) {
      // ffmpeg prints the EBU R128 summary on stderr.
      const { stderr } = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", join(outDir, f), "-af", "ebur128=peak=true", "-f", "null", "-"], { encoding: "utf8" });
      const summary = stderr.slice(stderr.lastIndexOf("Summary:"));
      const I = Number(/I:\s+(-?[\d.]+) LUFS/.exec(summary)?.[1]);
      const TP = Number(/Peak:\s+(-?[\d.]+) dBFS/.exec(summary)?.[1]);
      check(`6. loudness ${f}`, Math.abs(I + 14) <= 1 && TP <= -1, `I=${I} LUFS, TP=${TP} dBTP`);
    }
  }
}

// Extra ─ referenced files exist
{
  const missing = cues.cues.filter((c) => !existsSync(join(ROOT, "assets", c.file))).map((c) => c.file);
  if (!existsSync(join(ROOT, "assets", storyboard.audio.music))) missing.push(storyboard.audio.music);
  check("x. cue + music files exist (npm run stub-audio)", missing.length === 0, [...new Set(missing)].join(", "));
}

for (const p of passes) console.log(`  ✓ ${p}`);
for (const f of failures) console.log(`  ✗ ${f}`);
console.log(failures.length ? `\n${failures.length} check(s) failed` : `\nAll ${passes.length} checks passed`);
process.exit(failures.length ? 1 : 0);
