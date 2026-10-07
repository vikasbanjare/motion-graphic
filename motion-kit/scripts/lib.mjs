// Shared helpers for the CLI scripts. Plain ESM so they run with `node` alone.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const [major, minor] = process.versions.node.split(".").map(Number);
if (major < 22 || (major === 22 && minor < 18)) {
  console.error(`motion-kit needs Node.js 22.18 or newer (you have ${process.versions.node}). Get it from https://nodejs.org`);
  process.exit(1);
}

export const c = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

export const engine = async () => {
  const schema = await import("../src/engine/schema.ts");
  const plan = await import("../src/engine/plan.ts");
  const themes = await import("../src/engine/themes.ts");
  const formats = await import("../src/engine/formats.ts");
  const rich = await import("../src/engine/rich.ts");
  const voice = await import("../src/engine/voice.ts");
  return { ...schema, ...plan, ...themes, ...formats, ...rich, ...voice };
};

/** Parse args like: specs/x.json --theme neon --format square --all-formats */
export const parseArgs = (argv) => {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const [k, v] = a.slice(2).split("=");
      if (v !== undefined) out[k] = v;
      else if (argv[i + 1] && !argv[i + 1].startsWith("--")) out[k] = argv[++i];
      else out[k] = true;
    } else out._.push(a);
  }
  return out;
};

export const readSpec = (file) => {
  if (!file) {
    console.error("Usage: npm run <check|preview|make> -- specs/your-video.json");
    process.exit(1);
  }
  const abs = path.resolve(process.cwd(), file);
  if (!fs.existsSync(abs)) {
    console.error(c.red(`Spec not found: ${file}`));
    process.exit(1);
  }
  const text = fs.readFileSync(abs, "utf8");
  try {
    return { abs, name: path.basename(abs).replace(/\.json$/i, ""), spec: JSON.parse(text) };
  } catch (e) {
    const m = String(e.message).match(/position (\d+)/);
    let where = "";
    if (m) {
      const pos = Number(m[1]);
      const line = text.slice(0, pos).split("\n").length;
      where = ` (line ${line})`;
    }
    console.error(c.red(`${file} is not valid JSON${where}: ${e.message}`));
    console.error(c.dim("Common causes: a trailing comma, a missing comma between scenes, or curly quotes “ ” instead of straight quotes."));
    process.exit(1);
  }
};

/** Inline the word-timing file (audio.timing) so Node-side planning matches the render. */
export const withTimingFile = (spec) => {
  const file = spec.audio?.timing;
  if (!file || spec.audio?.words?.length) return spec;
  const abs = path.join(ROOT, "public", file);
  if (!fs.existsSync(abs)) return spec;
  const data = JSON.parse(fs.readFileSync(abs, "utf8"));
  return { ...spec, audio: { ...spec.audio, words: Array.isArray(data) ? data : data.words } };
};

/** On-screen text of a scene (everything except narration and settings). */
export const shownText = (scene) =>
  Object.entries(scene)
    .filter(([k, v]) => typeof v === "string" && !["say", "type", "style", "src", "area", "fit", "move", "bg"].includes(k))
    .map(([, v]) => v)
    .join(" ");

/** CLI overrides so one spec can be previewed in any theme / format. */
export const applyOverrides = (spec, args) => ({
  ...spec,
  ...(args.theme ? { theme: args.theme } : {}),
  ...(args.format ? { format: args.format } : {}),
  ...(args.motion ? { motion: args.motion } : {}),
  ...(args.pace ? { pace: args.pace } : {}),
});

const browserArgs = () =>
  process.env.REMOTION_BROWSER_EXECUTABLE ? [`--browser-executable=${process.env.REMOTION_BROWSER_EXECUTABLE}`] : [];

export const remotion = (args) => {
  const r = spawnSync("npx", ["remotion", ...args, ...browserArgs(), "--log=error"], { cwd: ROOT, stdio: "inherit" });
  if (r.status !== 0) {
    console.error(c.red("Remotion failed — see the message above."));
    process.exit(r.status ?? 1);
  }
};

export const writeTemp = (name, data) => {
  const dir = path.join(ROOT, "out", ".tmp");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, name);
  fs.writeFileSync(file, JSON.stringify(data));
  return file;
};
