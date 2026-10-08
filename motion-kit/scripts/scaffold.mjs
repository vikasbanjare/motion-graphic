// Create a new motion-kit project anywhere: copies the engine and installs it.
//
//   npm run scaffold -- ../my-videos                     from inside motion-kit/
//   node <path>/motion-kit/scripts/scaffold.mjs motion-kit   what the Claude Code plugin runs
//   ... --no-install                                     copy only (CI, offline)
//
// Everything in motion-kit/ is copied except node_modules/ and out/, so the new
// folder has the same scenes, fonts, sound effects and example specs, and every
// command (check, qa, preview, voice, music, make) works there unchanged.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { ROOT, c, parseArgs } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const target = args._[0];
if (!target || args.help) {
  console.log("Usage: npm run scaffold -- <new-folder> [--no-install]");
  console.log(c.dim("  Copies the motion-kit engine into <new-folder> and runs npm install there."));
  process.exit(target ? 0 : 1);
}

// `npm run` starts scripts in the package folder; resolve the target from where the user typed it.
const base = process.env.npm_lifecycle_event && process.env.INIT_CWD ? process.env.INIT_CWD : process.cwd();
const dest = path.resolve(base, target);
// Short relative paths read best; far-away ones are clearer absolute. Quoted if they have spaces.
const rel = path.relative(base, dest);
const near = rel.split(path.sep).filter((p) => p === "..").length <= 2;
const shown = ((p) => (/\s/.test(p) ? `"${p}"` : p))(rel && near ? rel : dest);

const inside = (child, parent) => {
  const r = path.relative(parent, child);
  return r === "" || (!r.startsWith("..") && !path.isAbsolute(r));
};
if (inside(dest, ROOT)) {
  console.error(c.red(`${shown} is inside the engine folder (${ROOT}). Pick a folder outside it.`));
  process.exit(1);
}
// An empty folder (or a fresh git repo) is fine; anything else might be someone's work.
const ALLOWED_EXISTING = new Set([".git", ".DS_Store"]);
if (fs.existsSync(dest)) {
  if (!fs.statSync(dest).isDirectory()) {
    console.error(c.red(`${shown} is a file. Pick a new folder name.`));
    process.exit(1);
  }
  const busy = fs.readdirSync(dest).filter((f) => !ALLOWED_EXISTING.has(f));
  if (busy.length) {
    console.error(c.red(`${shown} already has files (${busy.slice(0, 3).join(", ")}${busy.length > 3 ? ", …" : ""}).`));
    console.error(c.dim("  Pick a new folder name, or open that folder in Claude Code if it is already a motion-kit project."));
    process.exit(1);
  }
}

// Installed packages and renders belong to each project, never to the template.
const SKIP_TOP = new Set(["node_modules", "out"]);
const SKIP_ANY = new Set(["node_modules", ".DS_Store", ".git"]);
const keep = (src) => {
  const rel = path.relative(ROOT, src);
  if (!rel) return true;
  const parts = rel.split(path.sep);
  return !SKIP_TOP.has(parts[0]) && !SKIP_ANY.has(parts[parts.length - 1]);
};
fs.cpSync(ROOT, dest, { recursive: true, filter: keep });
console.log(c.green(`✔ Copied the motion-kit engine to ${shown}`));

if (!args["no-install"]) {
  console.log(c.bold("\nInstalling packages (one-time, about a minute) …"));
  // npm is a .cmd file on Windows, which Node only spawns through a shell.
  const r = spawnSync("npm", ["install", "--no-audit", "--no-fund", "--loglevel=error"], {
    cwd: dest,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (r.status !== 0) {
    console.error(c.red("\nnpm install failed — see the message above. The files are in place; fix the cause, then run:"));
    console.error(c.dim(`  cd ${shown} && npm install`));
    console.error(c.dim("  Common causes: no internet / a proxy blocking registry.npmjs.org, or Node.js older than 22.18."));
    process.exit(r.status ?? 1);
  }
  console.log(c.green("✔ Packages installed"));
}

const hasFfmpeg = spawnSync("ffmpeg", ["-version"], { stdio: "ignore" }).status === 0;
console.log(c.bold("\nNext:"));
console.log(`  cd ${shown}`);
if (args["no-install"]) console.log("  npm install");
console.log("  npm run check -- specs/claude-reel.json   " + c.dim("# validate an example, prints its timeline"));
console.log("  npm run dev                               " + c.dim("# Remotion Studio, live preview"));
console.log(c.dim("  Or open the folder in Claude Code and describe the video you want."));
if (!hasFfmpeg) console.log(c.yellow("\n  ffmpeg not found: needed for voice alignment, music and loudness. Videos still render without it."));
