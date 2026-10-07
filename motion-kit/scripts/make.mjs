// npm run make -- specs/my-video.json [--format square] [--all-formats] [--crf 22]
// Validates, renders the MP4, a cover image, and loudness-normalises any music/voice-over.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { check } from "./check.mjs";
import { ROOT, applyOverrides, c, parseArgs, readSpec, remotion, writeTemp } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const { spec: raw, name } = readSpec(args._[0]);
const formats = args["all-formats"] ? ["reel", "square", "landscape"] : [args.format ?? raw.format ?? "reel"];

const hasFfmpeg = spawnSync("ffmpeg", ["-version"], { stdio: "ignore" }).status === 0;
const made = [];

for (const format of formats) {
  const spec = applyOverrides(raw, { ...args, format });
  const { errors, warnings, plan } = await check(spec, { quiet: formats.length > 1 });
  for (const w of warnings) console.log(c.yellow("  ⚠ ") + w);
  for (const e of errors) console.log(c.red("  ✖ ") + e);
  if (errors.length) process.exit(1);

  const base = formats.length > 1 || args.format ? `${name}-${format}` : name;
  const mp4 = path.join("out", `${base}.mp4`);
  const props = writeTemp(`${base}.json`, spec);
  console.log(c.bold(`\nRendering ${mp4} …`));
  remotion(["render", "Video", mp4, `--props=${props}`, ...(args.crf ? [`--crf=${args.crf}`] : [])]);

  // Cover = the moment the hook has fully landed. Upload it as the Reel/Short thumbnail.
  const first = plan.scenes[0];
  const coverFrame = Math.max(0, first.duration - plan.transitionFrames - 6);
  const cover = path.join("out", `${base}-cover.jpg`);
  remotion(["still", "Video", cover, `--props=${props}`, `--frame=${coverFrame}`, "--image-format=jpeg", "--jpeg-quality=92"]);

  // Platforms normalise to about -14 LUFS; mastering there means no surprise volume drops.
  if (hasFfmpeg && (spec.audio?.music || spec.audio?.voiceover)) {
    const src = path.join(ROOT, mp4);
    const tmp = src.replace(/\.mp4$/, ".tmp.mp4");
    const r = spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-i", src, "-c:v", "copy", "-af", "loudnorm=I=-14:TP=-1:LRA=11", "-c:a", "aac", "-b:a", "192k", tmp], { stdio: "inherit" });
    if (r.status === 0) fs.renameSync(tmp, src);
  }
  made.push(mp4, cover);
}

console.log(c.green("\n✔ Done:"));
for (const f of made) console.log("  " + path.relative(process.cwd(), path.resolve(ROOT, f)));
