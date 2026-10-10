// npm run produce -- specs/productions/<name>.json --tier free|local|mcp [--strict] [--fresh] [--dry]
//
// One command from production file to finished MP4, on any of three tiers:
//
//   free   Claude + CPU only. Voices: Kokoro (tools/cast_voices.py). SFX: tools/sfx_synth.py.
//          Music: tools/music_bed.py. Footage: every plate renders as its code fallback scene.
//   local  Open-weight models on your own GPU / Colab / a Space (docs/research/free-open-models.md).
//          Whatever is missing is written to out/<name>.jobs.md with the model to use and the
//          file path to save to. Save the files, run produce again.
//   mcp    An AI tool over MCP (Higgsfield or Magnific). Same job sheet, naming the MCP tool;
//          Claude preflights cost, asks the user, generates, and puts each result URL in the file.
//
// On every tier produce renders with what exists and falls back to code / free audio for the
// rest, so there is always a video; --strict stops instead when anything is missing.
//
// The production file (specs/productions/<name>.json):
//   {
//     "spec": "specs/<name>.json",          the video: code scenes only, so it always renders
//     "voices": { ...cast },                tools/cast_voices.py format; a beat may be {"file": …}
//     "music": { "mood": "warm", "volume": 0.16, "prompt": "…", "file": "music/x.wav" },
//     "plates": [ {                         footage that replaces a code scene when it exists
//        "id": "dadi-call", "kind": "video", "shot": "character-intro", "seconds": 5,
//        "prompt": "…", "scene": 1,         index of the code scene it replaces
//        "as": { "type": "clip", "caption": "…", "area": "bottom" },   the media scene to use
//        "url" | "file": "…" } ]            filled after generation (then npm run plates imports it)
//   }
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { check } from "./check.mjs";
import { ROOT, c, parseArgs } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const tier = String(args.tier || "free");
if (!["free", "local", "mcp"].includes(tier)) {
  console.error(c.red(`--tier must be free, local or mcp (got ${tier})`));
  process.exit(1);
}
const file = args._[0];
if (!file) {
  console.error("Usage: npm run produce -- specs/productions/<name>.json --tier free|local|mcp");
  process.exit(1);
}
const prodPath = path.resolve(process.cwd(), file);
const prod = JSON.parse(fs.readFileSync(prodPath, "utf8"));
const specPath = path.join(ROOT, prod.spec);
const name = path.basename(specPath, ".json");
const readSpec = () => JSON.parse(fs.readFileSync(specPath, "utf8"));
const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, "..", "research", "models.json"), "utf8"));
const byId = Object.fromEntries(catalog.models.map((m) => [m.id, m]));
const pub = (rel) => path.join(ROOT, "public", rel);
const mtime = (p) => (fs.existsSync(p) ? fs.statSync(p).mtimeMs : 0);
const run = (cmd, argv, label) => {
  console.log(c.dim(`  $ ${cmd} ${argv.join(" ")}`));
  if (args.dry) return;
  const r = spawnSync(cmd, argv, { cwd: ROOT, stdio: "inherit" });
  if (r.status !== 0) {
    console.error(c.red(`✖ ${label} failed`));
    process.exit(1);
  }
};

// The models a tier would use for a job, best first (catalog order is best-first).
const providers = { free: ["free"], local: ["local"], mcp: ["magnific", "higgsfield"] }[tier];
const picks = (shotType, field) => {
  const list = catalog.shots[shotType]?.[field] || [];
  return list.filter((id) => byId[id] && providers.includes(byId[id].provider) && !byId[id].unverified);
};
const describe = (ids) => ids.slice(0, 2).map((id) => `\`${id}\` (${byId[id].provider})${byId[id].notes ? ` — ${byId[id].notes}` : ""}`).join("<br>or ");

const jobs = [];
const done = [];
console.log(c.bold(`\nProduce ${name} · tier ${tier}\n`));

// ---- 1. Voices -------------------------------------------------------------------------------
if (prod.voices) {
  const beats = prod.voices.beats || [];
  const missingTakes = beats.map((b, i) => [b, i]).filter(([b]) => b.file && !fs.existsSync(pub(b.file)));
  for (const [b, i] of missingTakes) {
    const spoken = readSpec().scenes.filter((s) => s.say)[i]?.say;
    jobs.push({
      what: `Voice take, beat ${i + 1}`,
      save: `public/${b.file}`,
      prompt: `${b.speak || spoken}${b.voiceNote ? ` — ${b.voiceNote}` : ""}`,
      use: describe(picks("voice-line", "voice")),
      job: { type: "voice", id: `voice-${i + 1}`, text: b.speak || spoken, lang: b.lang || (/[ऀ-ॿ]/.test(b.speak || "") ? "hi" : "en"), character: b.character, ref: b.ref, note: b.voiceNote, out: b.file, engines: picks("voice-line", "voice") },
    });
  }
  const spec = readSpec();
  const vo = spec.audio?.voiceover ? pub(spec.audio.voiceover) : null;
  const stale = !vo || mtime(vo) < Math.max(mtime(prodPath), ...beats.filter((b) => b.file).map((b) => mtime(pub(b.file))));
  if (missingTakes.length && tier !== "free") {
    console.log(c.yellow(`○ voices: ${missingTakes.length} take(s) to make; the rest stay as they are`));
    // Fill the gaps with Kokoro so the cut still works: a temporary production without the missing files.
    if (beats.some((b) => !b.file && !b.voice)) console.log(c.yellow("  beats without a voice or file can't be filled; add a Kokoro voice as a stand-in"));
  }
  if (stale || args.fresh) {
    const tmpProd = path.join(ROOT, "out", ".tmp", `${name}.production.json`);
    fs.mkdirSync(path.dirname(tmpProd), { recursive: true });
    // Missing external takes fall back to the beat's Kokoro voice (free stand-in).
    const voices = { ...prod.voices, beats: beats.map((b) => (b.file && !fs.existsSync(pub(b.file)) ? { ...b, file: undefined } : b)) };
    fs.writeFileSync(tmpProd, JSON.stringify({ spec: prod.spec, voices }, null, 2));
    run("python3", ["-I", "tools/cast_voices.py", tmpProd], "voices");
    done.push("voices generated");
  } else done.push("voices up to date");
}

// ---- 2. Plates -------------------------------------------------------------------------------
const plates = prod.plates || [];
if (plates.some((p) => (p.url || p.file) && !findPlate(p))) {
  const tmpManifest = path.join(ROOT, "out", ".tmp", `${name}.plates.json`);
  fs.writeFileSync(tmpManifest, JSON.stringify({ video: name, plates }, null, 2));
  run("node", ["scripts/plates.mjs", tmpManifest], "plates import");
}
function findPlate(p) {
  const dir = pub(path.join("plates", name));
  if (!fs.existsSync(dir)) return null;
  const f = fs.readdirSync(dir).find((x) => path.parse(x).name === p.id);
  return f ? `plates/${name}/${f}` : null;
}
const swaps = {};
for (const p of plates) {
  const src = findPlate(p);
  if (src) {
    swaps[p.scene] = { ...p.as, src, ...(p.kind === "video" ? { generated: true } : {}) };
    done.push(`plate ${p.id} → scene ${p.scene + 1}`);
    continue;
  }
  if (tier === "free") {
    done.push(`plate ${p.id}: code scene ${p.scene + 1} (free tier)`);
    continue;
  }
  const field = p.kind === "video" ? "video" : "image";
  jobs.push({
    what: `Plate \`${p.id}\` (${p.kind}${p.seconds ? `, ${p.seconds}s` : ""}, ${p.shot || "shot"})`,
    save: `public/plates/${name}/${p.id}.${p.kind === "video" ? "mp4" : "png"} — or put the result \`url\` in the production file`,
    prompt: `${p.prompt}${prod.bible ? ` ${prod.bible}` : ""} No text, no logos, no watermark.`,
    use: describe(picks(p.shot || "establishing-world", field)) || "see docs/research/free-open-models.md",
    job: { type: p.kind === "video" ? "video" : "image", id: p.id, prompt: `${p.prompt}${prod.bible ? ` ${prod.bible}` : ""} No text, no logos, no watermark.`, seconds: p.seconds || 5, aspect: p.aspect || ({ reel: "9:16", portrait: "4:5", square: "1:1", landscape: "16:9" }[readSpec().format] || "9:16"), from: p.from, out: `plates/${name}/${p.id}.${p.kind === "video" ? "mp4" : "png"}`, engines: picks(p.shot || "establishing-world", field) },
  });
}

// ---- 3. Music --------------------------------------------------------------------------------
const music = prod.music;
const bedRel = `music/${name}-bed.mp3`;
let track = null;
// A generated track saved at the default path counts without editing the production file.
const musicDefault = ["wav", "mp3", "flac"].map((e) => `music/${name}-music.${e}`).find((f) => fs.existsSync(pub(f)));
if (music) {
  if (music.file && fs.existsSync(pub(music.file))) track = music.file;
  else if (!music.file && musicDefault) track = musicDefault;
  else {
    if (tier !== "free")
      jobs.push({
        what: "Music bed",
        save: `public/${music.file || `music/${name}-music.wav`}`,
        prompt: music.prompt || `${music.mood} instrumental bed`,
        use: describe(picks("music-bed", "music")),
        job: { type: "music", id: "music", prompt: music.prompt || `${music.mood} instrumental bed, no vocals`, seconds: null, out: music.file || `music/${name}-music.wav`, engines: picks("music-bed", "music") },
      });
    if (music.mood) track = bedRel; // free synth bed: the free tier's music, and the stand-in elsewhere
  }
}

// ---- 4. Job sheet ----------------------------------------------------------------------------
const sheet = path.join(ROOT, "out", `${name}.jobs.md`);
if (jobs.length) {
  const how =
    tier === "mcp"
      ? "Claude runs these over MCP: preflight cost first (Magnific `simulate_cost`, Higgsfield `get_cost: true`), get the user's yes on the total, generate, then put each result URL (`url`) or saved path (`file`) into the production file and run produce again."
      : "Run each with the model named (ComfyUI, Wan2GP, diffusers, a Colab or a Hugging Face Space), save the file at the path given, then run produce again. Check each model card's licence for client work.";
  const md = [
    `# Jobs for ${name} (tier ${tier})`,
    "",
    how,
    "",
    "| # | What | Prompt / text | Use | Save to |",
    "|---|---|---|---|---|",
    ...jobs.map((j, i) => `| ${i + 1} | ${j.what} | ${String(j.prompt).replace(/\|/g, "/")} | ${j.use || "—"} | ${j.save} |`),
    "",
    "Until a job is done, the video uses its free stand-in (code scene, Kokoro voice, synthesized bed).",
    "",
  ].join("\n");
  fs.mkdirSync(path.dirname(sheet), { recursive: true });
  fs.writeFileSync(sheet, md);
  // Machine-readable twin for tools/local/run_jobs.py and the Colab notebook. Paths are relative to public/.
  const { plan } = await check(readSpec(), { quiet: true });
  const filmSeconds = plan ? Math.ceil(plan.durationInFrames / 30) + 1 : 32;
  const list = jobs.map((j) => j.job).filter(Boolean).map((j) => (j.type === "music" ? { ...j, seconds: filmSeconds } : j));
  fs.writeFileSync(sheet.replace(/\.md$/, ".json"), JSON.stringify({ video: name, tier, jobs: list }, null, 2));
}

// ---- 5. Render -------------------------------------------------------------------------------
const spec = readSpec();
const renderSpec = { ...spec, scenes: spec.scenes.map((s, i) => (swaps[i] ? { ...swaps[i], ...(s.say ? { say: s.say } : {}) } : s)) };
if (track) {
  const { plan } = await check(renderSpec, { quiet: true });
  const secs = plan ? plan.durationInFrames / 30 : 30;
  if (track === bedRel && (!fs.existsSync(pub(bedRel)) || args.fresh || mtime(pub(bedRel)) < mtime(prodPath))) {
    fs.mkdirSync(pub("music"), { recursive: true });
    run("python3", ["-I", "tools/music_bed.py", "--mood", music.mood, "--seconds", String(Math.ceil(secs + 1)), "--out", pub(bedRel), ...(music.key ? ["--key", music.key] : []), ...(music.bpm ? ["--bpm", String(music.bpm)] : [])], "music bed");
  }
  if (spec.audio?.music !== track || args.fresh) {
    run("node", ["scripts/music.mjs", prod.spec, "--track", track, ...(music.volume ? ["--volume", String(music.volume)] : [])], "music fit");
  }
  done.push(`music: ${track}`);
}

for (const d of done) console.log(c.green("✔ ") + d);
if (jobs.length) {
  console.log(c.yellow(`\n○ ${jobs.length} job(s) for the ${tier} tier → ${path.relative(process.cwd(), sheet)}`));
  for (const j of jobs) console.log(c.dim(`   - ${j.what}`));
  if (args.strict) {
    console.log(c.yellow("--strict: not rendering until the jobs are done."));
    process.exit(2);
  }
  console.log(c.dim("  Rendering now with free stand-ins for these."));
}
if (args.dry) process.exit(0);

// Re-read: music.mjs updated the spec's audio block.
const final = readSpec();
const out = { ...final, scenes: renderSpec.scenes };
const tmpSpec = path.join(ROOT, "out", ".tmp", "render", `${name}.json`);
fs.mkdirSync(path.dirname(tmpSpec), { recursive: true });
fs.writeFileSync(tmpSpec, JSON.stringify(out, null, 2));
run("node", ["scripts/make.mjs", tmpSpec, ...(args.format ? ["--format", String(args.format)] : [])], "render");
