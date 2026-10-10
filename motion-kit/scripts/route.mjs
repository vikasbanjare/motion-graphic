// npm run route -- specs/<name>.shots.json [--budget low|balanced|best] [--provider higgsfield|magnific|local|free]
// npm run route -- --shot product-hero [--seconds 4] [--budget low]
//
// Picks a model and a pipeline for every AI-generated shot, using research/models.json.
// A shot list is { "shots": [ { "id", "type", "seconds"?, "character"?, "budget"? } ] } where
// type is one of the catalog's shot types (npm run route lists them). Output: per shot the
// pipeline steps, the image / video / voice / finish model, how many generations to expect,
// and a relative cost in "units" (catalog cost tier × generations). Units are for comparing
// plans, not prices: preflight every real call with the tool's cost check.
import fs from "node:fs";
import path from "node:path";
import { ROOT, c, parseArgs } from "./lib.mjs";

const CATALOG = path.join(ROOT, "..", "research", "models.json");
const cat = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const byId = Object.fromEntries(cat.models.map((m) => [m.id, m]));
const args = parseArgs(process.argv.slice(2));
const provider = args.provider || "higgsfield";

const PIPELINES = {
  "stills-first": ["Generate still variant(s), pick one", "Animate the approved still (image-to-video, one camera move, 3-5 s)", "Finish: upscale if under 1080 px"],
  "first-last-frame": ["Generate the START still", "Generate the END still from the start still as reference (edit model)", "Video model interpolates start → end", "Finish: upscale"],
  "element-then-stills": ["Create (or reuse) the character Element from one clear reference", "Keyframe stills with <<<element>>> in the prompt", "Animate each keyframe; keep the same Element in the video prompt", "Voice: same voice element for every line"],
  "still-then-cutout": ["Generate the object on a plain background", "remove_background", "Animate in code (motion-kit) as a sticker / inline media"],
  "motion-transfer": ["Record or pick a driving video", "Reference image(s) of the subject", "Motion-transfer model"],
  "workflow:ugc-video": ["Load Higgsfield workflow 'ugc-video' (get_workflow_instructions) and follow it"],
  "workflow:ad-multiplier": ["Load Higgsfield workflow 'ad-multiplier' and follow it"],
  code: ["Route 1: motion-kit renders it. No generation."],
  voice: ["Generate each line with the chosen voice (same voice / reference clip + seed every time)", "Put the take in the production file's voices beat as {\"file\": …}"],
  audio: ["Generate with the chosen model; save under public/music/ or public/sfx/", "Music: npm run music fits it to the cut; SFX: reference it from the voices beats"],
};

// Expected generations per step, by budget: drafts on the cheap model, finals on the chosen one.
const PLAN = {
  low: { stills: 1, rerolls: 0, draftCheap: false },
  balanced: { stills: 2, rerolls: 1, draftCheap: true },
  best: { stills: 3, rerolls: 2, draftCheap: true },
};

const ok = (id) => byId[id] && byId[id].provider === provider && !byId[id].unverified;
// The free tier generates no footage: every visual shot becomes its code scene (the plate's fallback).
const FREE_VISUAL = { pipeline: "code", notes: "Free tier: no footage generation. Use the plate's code fallback scene (npm run produce)." };
const pick = (list, budget, character) => {
  const usable = (list || []).filter(ok).filter((id) => !character || byId[id].elements);
  const pool = usable.length ? usable : (list || []).filter(ok);
  if (!pool.length) return null;
  // low → cheapest; best → the catalog's first choice (listed best-first); balanced → first choice.
  return budget === "low" ? [...pool].sort((a, b) => byId[a].cost - byId[b].cost)[0] : pool[0];
};

const route = (shot, budgetDefault) => {
  let spec = cat.shots[shot.type];
  if (!spec) return { error: `unknown shot type "${shot.type}"` };
  if (provider === "free" && (spec.image || spec.video)) spec = { ...FREE_VISUAL, voice: spec.voice };
  const budget = shot.budget || budgetDefault;
  const p = PLAN[budget] || PLAN.balanced;
  const character = Boolean(shot.character);
  const image = pick(spec.image, budget, character);
  const video = pick(spec.video, budget, character);
  const voice = pick(spec.voice, budget, false);
  const music = pick(spec.music, budget, false);
  const sfx = pick(spec.sfx, budget, false);
  const finish = (spec.finish || []).filter(ok);
  const draft = p.draftCheap && image ? [...(spec.image || [])].filter(ok).sort((a, b) => byId[a].cost - byId[b].cost)[0] : null;
  let units = 0;
  const gens = [];
  if (image) {
    const n = spec.pipeline === "first-last-frame" ? 2 : p.stills;
    if (draft && draft !== image) {
      gens.push(`${n} draft still(s) on ${draft}, final on ${image}`);
      units += n * byId[draft].cost + byId[image].cost;
    } else {
      gens.push(`${n} still(s) on ${image}`);
      units += n * byId[image].cost;
    }
  }
  if (video) {
    const secs = shot.seconds || 4;
    const clips = Math.ceil(secs / 5);
    gens.push(`${clips + p.rerolls} clip(s) on ${video} (${secs}s needed, incl. ${p.rerolls} re-roll)`);
    units += (clips + p.rerolls) * byId[video].cost;
  }
  if (voice) {
    gens.push(`voice lines on ${voice}`);
    units += byId[voice].cost;
  }
  for (const a of [music, sfx].filter(Boolean)) {
    gens.push(`${1 + p.rerolls} take(s) on ${a}`);
    units += (1 + p.rerolls) * byId[a].cost;
  }
  for (const f of finish) units += byId[f].cost;
  const missing = !image && !video && !voice && !music && !sfx && spec.pipeline !== "code";
  return { type: shot.type, budget, pipeline: spec.pipeline, steps: PIPELINES[spec.pipeline] || [], image, video, voice, music, sfx, finish, gens, units, note: missing ? `No ${provider} model in the catalog for this shot type. Try another --provider.` : byId[video]?.notes || spec.notes };
};

if (!args._[0] && !args.shot) {
  console.log(c.bold("\nShot types (research/models.json):\n"));
  for (const [k, v] of Object.entries(cat.shots)) console.log(`  ${k.padEnd(22)}${c.dim(v.pipeline)}`);
  console.log(c.dim("\nnpm run route -- --shot product-hero --seconds 4 --budget low\nnpm run route -- specs/x.shots.json --budget balanced\n"));
  process.exit(0);
}

const budget = args.budget || "balanced";
const shots = args.shot
  ? [{ id: "shot", type: args.shot, seconds: Number(args.seconds) || undefined, character: args.character }]
  : JSON.parse(fs.readFileSync(path.resolve(ROOT, args._[0]), "utf8")).shots;

let total = 0;
const out = [];
for (const s of shots) {
  const r = route(s, budget);
  out.push({ id: s.id, ...r });
  if (r.error) {
    console.log(`${c.red("✖")} ${s.id}: ${r.error}`);
    continue;
  }
  total += r.units;
  console.log(`\n${c.bold(s.id)} ${c.dim(`${r.type} · ${r.pipeline} · ${r.budget}`)}`);
  if (r.image) console.log(`  image   ${r.image}`);
  if (r.video) console.log(`  video   ${r.video}`);
  if (r.voice) console.log(`  voice   ${r.voice}`);
  if (r.music) console.log(`  music   ${r.music}`);
  if (r.sfx) console.log(`  sfx     ${r.sfx}`);
  if (r.finish.length) console.log(`  finish  ${r.finish.join(", ")}`);
  for (const st of r.steps) console.log(c.dim(`   - ${st}`));
  for (const g of r.gens) console.log(c.dim(`   ≈ ${g}`));
  if (r.note) console.log(c.yellow(`   ${r.note}`));
  console.log(`  ${r.units} units`);
}
console.log(c.bold(`\nTotal ≈ ${total} units`) + c.dim(` (relative, ${provider}; preflight real costs before generating)`));
if (args.json) fs.writeFileSync(args.json === true ? "route.json" : args.json, JSON.stringify(out, null, 2));
