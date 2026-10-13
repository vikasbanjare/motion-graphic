/**
 * 15 s cutdown, cut from the rendered master (out/Master16x9.mp4) on the beat
 * grid defined in src/cuts.ts: picture is frame-exact (same render), audio is
 * spliced from assets/audio/mix.wav with 6 ms fades at each join, then the
 * whole cut is loudness-normalised by scripts/loudnorm.sh like the master.
 *
 *   npm run render && npm run cutdown && npm run loudnorm
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { CUT15, cutLength } from "../src/cuts";

const ROOT = join(__dirname, "..");
const master = join(ROOT, "out", "Master16x9.mp4");
const mix = join(ROOT, "assets", "audio", "mix.wav");
const out = join(ROOT, "out", "Cut15x16x9.mp4");
if (!existsSync(master)) throw new Error("Render the master first: npm run render");
if (!existsSync(mix)) throw new Error("Build the mix first: npm run audio");

const FPS = 30;
const FADE = 0.006;
const v = CUT15.map((s, i) => `[0:v]trim=start_frame=${s.from}:end_frame=${s.to},setpts=PTS-STARTPTS[v${i}]`);
const a = CUT15.map((s, i) => {
  const d = (s.to - s.from) / FPS;
  return `[1:a]atrim=start=${(s.from / FPS).toFixed(4)}:duration=${d.toFixed(4)},asetpts=PTS-STARTPTS,afade=t=in:d=${FADE},afade=t=out:st=${(d - FADE).toFixed(4)}:d=${FADE}[a${i}]`;
});
const joins = CUT15.map((_, i) => `[v${i}][a${i}]`).join("");
const graph = [...v, ...a, `${joins}concat=n=${CUT15.length}:v=1:a=1[v][a]`].join(";");
execFileSync("ffmpeg", ["-v", "error", "-y", "-i", master, "-i", mix, "-filter_complex", graph, "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-crf", "16", "-preset", "slow", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "320k", "-ar", "48000", out], { stdio: "inherit" });
console.log(`→ out/Cut15x16x9.mp4 (${cutLength(CUT15)} frames, ${(cutLength(CUT15) / FPS).toFixed(1)} s, ${CUT15.length} segments)`);
