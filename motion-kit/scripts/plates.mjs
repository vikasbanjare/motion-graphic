// npm run plates -- specs/<name>.plates.json [--dry]
//
// Collects AI-generated (or hand-made) plates for a video into public/plates/<name>/ so the
// spec can use them in `image` / `clip` scenes. The manifest lists every plate:
//
//   { "video": "launch", "plates": [
//       { "id": "hero", "kind": "image", "prompt": "…", "url": "https://…/result.png" },
//       { "id": "orbit", "kind": "video", "prompt": "…", "file": "~/Downloads/orbit.mp4" } ] }
//
// `url` is a generation result (Higgsfield, Veo, Kling… return one); `file` is a local file
// you downloaded or made. Each plate is saved as public/plates/<video>/<id>.<ext>, checked
// with ffprobe (size, duration), and the manifest gets its `src` filled in, the exact string
// to put in the scene's `src`. Plates without url/file are listed as still to generate.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { ROOT, c, parseArgs } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const file = args._[0];
if (!file) {
  console.error("Usage: npm run plates -- specs/<name>.plates.json [--dry]");
  process.exit(1);
}
const manifestPath = path.resolve(ROOT, file);
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const video = manifest.video || path.basename(file).replace(/\.plates\.json$/, "");
const dir = path.join(ROOT, "public", "plates", video);
fs.mkdirSync(dir, { recursive: true });

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const VIDEO_EXT = new Set([".mp4", ".mov", ".webm"]);
const extOf = (p, kind) => {
  const e = path.extname(String(p).split("?")[0]).toLowerCase();
  if ((kind === "image" ? IMAGE_EXT : VIDEO_EXT).has(e)) return e;
  return kind === "image" ? ".png" : ".mp4";
};

const probe = (p) => {
  const r = spawnSync("ffprobe", ["-v", "error", "-show_entries", "stream=width,height:format=duration", "-of", "json", p], { encoding: "utf8" });
  if (r.status !== 0) return null;
  const j = JSON.parse(r.stdout);
  const s = (j.streams || []).find((x) => x.width) || {};
  return { width: s.width, height: s.height, duration: Number(j.format?.duration) || 0 };
};

let todo = 0;
let bad = 0;
for (const plate of manifest.plates || []) {
  const kind = plate.kind === "video" ? "video" : "image";
  const label = `${plate.id} (${kind})`;
  if (!plate.url && !plate.file) {
    todo++;
    console.log(`${c.yellow("○")} ${label}: still to generate${plate.prompt ? c.dim(`  "${plate.prompt.slice(0, 80)}…"`) : ""}`);
    continue;
  }
  const dest = path.join(dir, plate.id + extOf(plate.url || plate.file, kind));
  if (args.dry) {
    console.log(`${c.dim("·")} ${label} → ${path.relative(ROOT, dest)}`);
    continue;
  }
  try {
    if (plate.file) {
      fs.copyFileSync(plate.file.replace(/^~(?=\/)/, os.homedir()), dest);
    } else {
      const res = await fetch(plate.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    }
  } catch (e) {
    bad++;
    console.log(`${c.red("✖")} ${label}: ${e.message}. Download it yourself and set "file" instead of "url".`);
    continue;
  }
  const info = probe(dest);
  if (!info || !info.width) {
    bad++;
    fs.rmSync(dest, { force: true });
    console.log(`${c.red("✖")} ${label}: not a readable ${kind} file`);
    continue;
  }
  plate.src = path.relative(path.join(ROOT, "public"), dest).split(path.sep).join("/");
  const small = Math.max(info.width, info.height) < 1080;
  const dur = kind === "video" ? `, ${info.duration.toFixed(1)}s` : "";
  console.log(`${c.green("✔")} ${label} → ${plate.src}  ${c.dim(`${info.width}×${info.height}${dur}`)}${small ? c.yellow("  (under 1080 px: upscale it for a sharp render)") : ""}`);
}

if (!args.dry) fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(
  todo || bad
    ? c.yellow(`\n${todo} plate(s) still to generate, ${bad} failed. Fix them, then run this again.`)
    : c.green(`\nAll plates ready in public/plates/${video}/. Use each plate's "src" in its image / clip scene.`),
);
process.exit(bad ? 1 : 0);
