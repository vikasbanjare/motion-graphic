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
  const music = await import("../src/engine/music.ts");
  return { ...schema, ...plan, ...themes, ...formats, ...rich, ...voice, ...music };
};

/** Flags that never take a value, so `--skip-qa specs/x.json` keeps the spec path. */
const SWITCHES = new Set(["all-formats", "skip-qa", "no-qa", "json", "tts", "yes", "whisper"]);

/** Parse args like: specs/x.json --theme neon --format square --all-formats */
export const parseArgs = (argv) => {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const [k, v] = a.slice(2).split("=");
      if (v !== undefined) out[k] = v;
      else if (!SWITCHES.has(k) && argv[i + 1] && !argv[i + 1].startsWith("--")) out[k] = argv[++i];
      else out[k] = true;
    } else out._.push(a);
  }
  return out;
};

export const readSpec = (file) => {
  if (!file) {
    console.error("Usage: npm run <check|qa|preview|make> -- specs/your-video.json");
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

/**
 * Inline the word-timing file (audio.timing) and the music beat grid
 * (audio.beats) so Node-side planning matches the render.
 */
export const withTimingFile = (spec) => {
  let out = spec;
  const read = (file) => {
    const abs = path.join(ROOT, "public", file);
    return fs.existsSync(abs) ? JSON.parse(fs.readFileSync(abs, "utf8")) : null;
  };
  if (out.audio?.timing && !out.audio.words?.length) {
    const data = read(out.audio.timing);
    if (data) out = { ...out, audio: { ...out.audio, words: Array.isArray(data) ? data : data.words } };
  }
  if (out.audio?.beats && !out.audio.beatGrid?.length) {
    const data = read(out.audio.beats);
    // Same mapping as beatFields() in src/engine/music.ts.
    if (data)
      out = {
        ...out,
        audio: {
          ...out.audio,
          beatGrid: Array.isArray(data.beats) ? data.beats : [],
          downbeatGrid: Array.isArray(data.downbeats) ? data.downbeats : [],
          ...(typeof data.durationMs === "number" ? { musicDuration: data.durationMs / 1000 } : {}),
          ...(Number.isFinite(data.lufs) ? { musicLufs: data.lufs } : {}),
        },
      };
  }
  return out;
};

/** On-screen text of a scene (everything except narration and settings). */
export const shownText = (scene) =>
  Object.entries(scene)
    .filter(([k, v]) => typeof v === "string" && !["say", "type", "style", "src", "area", "fit", "move", "bg"].includes(k))
    .map(([, v]) => v)
    .join(" ");

/** Scene types that open on a visual and bring their words in after it. */
const VISUAL_FIRST = { orb: "the orb", image: "the image", clip: "the clip", wave: "the waveform", logo: "the logo" };
/** Visual-first scenes whose words are on screen at 0.0s when scene 1's narration starts with them. */
const SAID_FIRST = new Set(["orb", "wave"]);
const OPENERS = ["hook", "title", "kinetic"];

/**
 * Why frame 0 (the thumbnail) shows no words and the change that fixes it,
 * from scene 1's first words (`open` = E.openingText(plan)). `blocker` is a
 * qa finding on frame 0 that pushes them off the frame. check warns when the
 * plan alone shows it; qa reports it from the rendered frame.
 */
export const blankThumbnail = (plan, open, blocker) => {
  const s = plan.scenes[0].scene;
  const visual = VISUAL_FIRST[s.type] && (s.type !== "logo" || s.src || plan.spec.brand?.logo) ? s.type : null;
  const after = (type) => `make this ${type} scene 2, after a hook, title or kinetic scene (their first words are on screen at 0.0s)`;
  if (!open) return { why: `scene 1 (${s.type}) has no words`, fix: after(s.type) };
  const text = open.text.length > 42 ? open.text.slice(0, 41) + "…" : open.text;
  const late = open.at > 0;
  const words = /[\p{L}\p{N}]/u.test(open.text);
  const state = !words ? "has no letters or digits" : late ? `only starts to appear at ${(open.at / 30).toFixed(2)}s (frame ${open.at})` : "is not readable on frame 0";
  const why = `scene 1's ${open.field} "${text}" ${state}`;
  if (!words) return { why, fix: `put words in scene 1's ${open.field}: emoji and symbols alone leave the thumbnail blank` };
  if (!late && blocker) return { why, fix: `fix the ${blocker.check} finding on ${blocker.label} above first: off the frame, it cannot be the thumbnail` };
  // Narration that reaches the opening words late holds them back; said first, they are on screen at 0.0s.
  const say = late && plan.voice && (!visual || SAID_FIRST.has(visual)) ? `start scene 1's say with "${open.text}" so it shows at 0.0s` : null;
  if (visual) {
    const label = visual === "wave" && !s.label ? "give the wave a label (on screen from 0.0s), or " : "";
    return { why, fix: say ? `${say}, or ${after(visual)}` : `${visual} scenes bring their words in after ${VISUAL_FIRST[visual]}: ${label}${after(visual)}` };
  }
  if (say) return { why, fix: say };
  // Text-first scenes start their opening words before frame 0 (plan.ts leadOf), so this one is an engine bug.
  const others = OPENERS.filter((t) => t !== s.type).join(" or ");
  return { why, fix: `${s.type} scenes should show their ${open.field} on frame 0 (engine bug, please report it with this spec); until it is fixed, open with a ${others} scene` };
};

/** CLI overrides so one spec can be previewed in any theme / format. */
export const applyOverrides = (spec, args) => ({
  ...spec,
  ...(args.theme ? { theme: args.theme } : {}),
  ...(args.format ? { format: args.format } : {}),
  ...(args.motion ? { motion: args.motion } : {}),
  ...(args.pace ? { pace: args.pace } : {}),
});

/**
 * The Chrome that renders frames. REMOTION_BROWSER_EXECUTABLE wins; otherwise
 * reuse a Playwright-installed Chromium (sandboxes and CI images often have one
 * and block Remotion's own download). null = let Remotion fetch its own.
 */
export const findBrowser = () => {
  const env = process.env.REMOTION_BROWSER_EXECUTABLE;
  if (env) return { executable: env, mode: process.env.REMOTION_CHROME_MODE ?? "headless-shell" };
  const roots = [...new Set([process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers"].filter(Boolean))];
  const look = (prefix, bins, mode) => {
    for (const root of roots) {
      let dirs = [];
      try {
        dirs = fs.readdirSync(root).filter((d) => d.startsWith(prefix));
      } catch {
        continue;
      }
      // Newest revision first.
      dirs.sort((a, b) => Number(b.split("-").pop()) - Number(a.split("-").pop()));
      for (const d of dirs)
        for (const bin of bins) {
          const exe = path.join(root, d, bin);
          if (fs.existsSync(exe)) return { executable: exe, mode };
        }
    }
    return null;
  };
  return (
    look("chromium_headless_shell-", ["chrome-linux/headless_shell", "chrome-headless-shell-linux64/chrome-headless-shell"], "headless-shell") ??
    look("chromium-", ["chrome-linux/chrome", "chrome-linux64/chrome"], "chrome-for-testing")
  );
};

const browserArgs = () => {
  const b = findBrowser();
  if (!b) return [];
  return [`--browser-executable=${b.executable}`, ...(b.mode === "chrome-for-testing" ? ["--chrome-mode=chrome-for-testing"] : [])];
};

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
