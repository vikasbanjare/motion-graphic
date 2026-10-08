// npm run new                                         list the storyboard recipes
// npm run new -- <name> --recipe <recipe> [--format reel] [--theme desi] [--motion calm] [--pace fast]
// Starts a video from a recipe in specs/recipes/: copies it to specs/<name>.json (never
// overwrites), applies the overrides, then prints the beats and every [PLACEHOLDER] and sample
// number to fill in.
import fs from "node:fs";
import path from "node:path";
import { check } from "./check.mjs";
import { ROOT, applyOverrides, c, engine, parseArgs } from "./lib.mjs";

const RECIPES = path.join(ROOT, "specs", "recipes");

/** Placeholders are [CAPS] slots ("[PRODUCT]", "₹[999]"); lowercase [tags] are voice tags and stay. */
const SLOT = /\[[^\]a-z]*[A-Z0-9][^\]a-z]*\]/g;

/**
 * Facts the schema keeps as numbers, so a recipe can't bracket them: chart values and star
 * ratings. Whatever a recipe puts there is a sample, and a grep for [CAPS] never finds it, so
 * list them beside the slots ("bars 0.8 · 1.2 · 1.7 · 2.4", "rating 5").
 */
const samples = (scene) => [
  ...(scene.bars?.length ? [`bars ${scene.bars.map((b) => b.value).join(" · ")}`] : []),
  ...(scene.rating !== undefined ? [`rating ${scene.rating}`] : []),
];

const args = parseArgs(process.argv.slice(2));
const E = await engine();

const recipes = fs
  .readdirSync(RECIPES)
  .filter((f) => f.endsWith(".json"))
  .sort()
  .map((f) => ({ id: f.replace(/\.json$/, ""), spec: JSON.parse(fs.readFileSync(path.join(RECIPES, f), "utf8")) }));

/** "9:16" for "reel": the aspect ratio at the start of each format's label. */
const ratio = (format = "reel") => E.FORMATS[format].label.split(" — ")[0];
/** "9:16 · desi · fast · ~29s": the shape, look and length a recipe starts with. */
const describe = (spec) => {
  const parsed = E.videoSchema.safeParse(spec);
  if (!parsed.success) return c.red("invalid: run npm run check on it");
  const plan = E.planVideo(parsed.data);
  return [ratio(plan.format.name), plan.theme.name, plan.spec.pace, `~${Math.round(plan.durationInFrames / 30)}s`].join(" · ");
};

const list = () => {
  console.log(c.bold(`\n${recipes.length} storyboard recipes`) + c.dim("  (specs/recipes/)\n"));
  const w = Math.max(...recipes.map((r) => r.id.length)) + 2;
  // Name and look on one line, the full "when to use it" under it (never cut off).
  for (const r of recipes) {
    console.log(`  ${c.bold(r.id.padEnd(w))}${c.dim(describe(r.spec))}`);
    console.log(`    ${r.spec._recipe?.when ?? ""}`);
  }
  console.log(c.dim(`\nStart one:  npm run new -- ${args._[0] ?? "<name>"} --recipe <recipe> [--format reel|portrait|square|landscape] [--theme <theme>]`));
};

const fail = (msg) => {
  console.error(c.red(msg));
  process.exit(1);
};

// --- which recipe ------------------------------------------------------------
const name = args._[0];
if (!args.recipe || args.recipe === true) {
  if (args.recipe === true) console.error(c.red("--recipe needs a recipe name."));
  list();
  process.exit(args.recipe === true ? 1 : 0);
}
if (!name) fail("Give the new video a name: npm run new -- <name> --recipe " + args.recipe);

const wanted = path.basename(String(args.recipe)).replace(/\.json$/i, "");
const matches = recipes.filter((r) => r.id === wanted);
// Forgiving lookup: "festive" finds local-offer-festive when it is the only match.
const loose = matches.length ? matches : recipes.filter((r) => r.id.includes(wanted.toLowerCase()));
if (loose.length !== 1) {
  console.error(c.red(loose.length ? `"${wanted}" matches several recipes: ${loose.map((r) => r.id).join(", ")}` : `No recipe called "${wanted}".`));
  list();
  process.exit(1);
}
const recipe = loose[0];

// --- overrides -------------------------------------------------------------------
const shape = E.videoSchema.shape;
const allowed = {
  format: shape.format.unwrap().options,
  theme: shape.theme.unwrap().options,
  motion: shape.motion.unwrap().options,
  pace: shape.pace.unwrap().options,
};
for (const [key, options] of Object.entries(allowed)) {
  if (args[key] !== undefined && !options.includes(args[key])) fail(`--${key} must be one of: ${options.join(", ")}`);
}

// --- write specs/<name>.json ---------------------------------------------------
const slug = path
  .basename(String(name))
  .replace(/\.json$/i, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");
if (!slug) fail(`"${name}" is not a usable file name. Use letters, numbers and dashes, e.g. diwali-sale.`);
const rel = `specs/${slug}.json`;
const out = path.join(ROOT, rel);

const spec = applyOverrides(recipe.spec, args);

/** JSON with short objects and arrays kept on one line, so specs stay easy to read and edit. */
const inline = (v) =>
  Array.isArray(v)
    ? `[${v.map(inline).join(", ")}]`
    : v && typeof v === "object"
      ? Object.keys(v).length
        ? `{ ${Object.entries(v).map(([k, x]) => `${JSON.stringify(k)}: ${inline(x)}`).join(", ")} }`
        : "{}"
      : JSON.stringify(v);
const formatSpec = (v, indent = "") => {
  if (!v || typeof v !== "object") return JSON.stringify(v);
  const flat = inline(v);
  if (indent && indent.length + flat.length <= 100) return flat;
  const inner = indent + "  ";
  const rows = Array.isArray(v)
    ? v.map((x) => inner + formatSpec(x, inner))
    : Object.entries(v).map(([k, x]) => `${inner}${JSON.stringify(k)}: ${formatSpec(x, inner)}`);
  const [open, close] = Array.isArray(v) ? ["[", "]"] : ["{", "}"];
  return rows.length ? `${open}\n${rows.join(",\n")}\n${indent}${close}` : `${open}${close}`;
};

try {
  fs.writeFileSync(out, formatSpec(spec) + "\n", { flag: "wx" });
} catch (e) {
  if (e.code === "EEXIST") fail(`${rel} already exists, so nothing was changed. Pick another name, or edit that file.`);
  throw e;
}

// --- report ----------------------------------------------------------------------
const meta = spec._recipe ?? {};
const parsed = E.videoSchema.safeParse(spec);
const plan = parsed.success ? E.planVideo(parsed.data) : null;
const look = plan
  ? ` · ${ratio(plan.format.name)} ${plan.format.name} · theme ${plan.theme.name} · motion ${plan.spec.motion} · pace ${plan.spec.pace} · ~${Math.round(plan.durationInFrames / 30)}s`
  : "";
console.log(c.green(`\n✔ Created ${rel}`) + c.dim(` from recipe "${recipe.id}"`));
console.log(c.bold(`  ${meta.title ?? recipe.id}`) + c.dim(look));

console.log(c.bold("\nBeats"));
spec.scenes.forEach((s, i) => {
  console.log(`  ${String(i + 1).padStart(2)}. ${s.type.padEnd(8)} ${meta.beats?.[i] ?? ""}`);
  if (s.say) console.log(c.dim(`      say: "${s.say}"`));
});

const slots = (value) => {
  const found = new Set();
  const walk = (v) => {
    if (typeof v === "string") for (const m of v.match(SLOT) ?? []) found.add(m);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  walk(value);
  return [...found];
};
const todo = [
  ["video", slots(Object.fromEntries(Object.entries(spec).filter(([k]) => k !== "scenes" && k !== "_recipe"))), []],
  ...spec.scenes.map((s, i) => [`scene ${i + 1}`, slots(s), samples(s)]),
].filter(([, found, sample]) => found.length || sample.length);
const total = todo.reduce((n, [, found]) => n + found.length, 0);
const sampled = todo.reduce((n, [, , sample]) => n + sample.length, 0);
if (total || sampled) {
  const count = [total && `${total} slot${total > 1 ? "s" : ""}`, sampled && `${sampled} sample number${sampled > 1 ? "s" : ""}`].filter(Boolean).join(" + ");
  console.log(c.bold(`\nFill in (${count}: real facts only; same words in "say" and on screen)`));
  for (const [where, found, sample] of todo) {
    if (found.length) console.log(`  ${where.padEnd(10)} ${found.join("  ")}`);
    for (const x of sample) {
      const lead = found.length ? " ".repeat(10) : where.padEnd(10);
      console.log(`  ${lead} ${c.yellow(`sample: ${x}`)}${c.dim("  (no brackets: replace with the user's numbers, or cut the beat)")}`);
    }
  }
}
if (meta.copyTips?.length) {
  console.log(c.bold("\nCopy tips"));
  for (const t of meta.copyTips) console.log(c.dim(`  • ${t}`));
}

console.log(c.bold("\nCheck"));
const { errors, warnings } = await check(spec, { quiet: true });
for (const w of warnings) console.log(c.yellow("  ⚠ ") + w);
for (const e of errors) console.log(c.red("  ✖ ") + e);
if (!errors.length) console.log(c.green("  ✔ Valid") + (warnings.length ? c.yellow(` with ${warnings.length} suggestion(s)`) : "") + c.dim(" (placeholders included)"));
console.log(c.bold("\nNext"));
console.log(`  1. Replace every [CAPS] slot${sampled ? " and sample number" : ""} in ${rel} (numbers as words in "say", digits on screen).`);
console.log(`  2. npm run check -- ${rel}`);
console.log(`  3. npm run qa -- ${rel}`);
console.log(`  4. npm run make -- ${rel}   ${c.dim("(only when the video is wanted)")}`);
