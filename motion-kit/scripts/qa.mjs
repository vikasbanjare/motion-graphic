// npm run qa -- specs/my-video.json [--theme neon] [--format landscape] [--json]
// Renders the key frames of a video IN MEMORY (no image is ever written) and
// checks what is really on screen: text under platform UI or off the canvas,
// overlapping text, text too long for its slot (cut off, spilling out of its
// card), type too small for a phone, weak contrast, and a blank thumbnail.
// Every finding names the scene, time and field with a fix. Exits 1 on errors.
// --theme / --format also take a comma list or "all" to sweep every variant.
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT, applyOverrides, blankThumbnail, c, engine, findBrowser, parseArgs, readSpec, withTimingFile } from "./lib.mjs";

const FPS = 30;
const PREFIX = "[mk-qa] ";
const CACHE = path.join(ROOT, "node_modules", ".cache", "motion-kit");
/** px a box may poke past the safe zone / canvas before it counts (anti-aliasing, glyph overhang). */
const TOLERANCE = 4;
const READABLE = /[\p{L}\p{N}]/u;

// --- bundle (cached per source hash) -----------------------------------------

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]));

const bundleInputs = () => {
  const files = [...walk(path.join(ROOT, "src")), path.join(ROOT, "remotion.config.ts"), path.join(ROOT, "package.json")];
  // Example specs are compiled in as Studio default props (and merged under input props).
  const examples = fs.readFileSync(path.join(ROOT, "src", "examples.ts"), "utf8");
  for (const m of examples.matchAll(/from\s+"(\.\.\/specs\/[^"]+)"/g)) files.push(path.resolve(ROOT, "src", m[1]));
  return files.filter((f) => fs.existsSync(f)).sort();
};

/** Drop bundles of older code from this checkout, and anything nobody has used for a day. */
const pruneBundles = (keep) => {
  const day = Date.now() - 24 * 3600 * 1000;
  for (const d of fs.readdirSync(CACHE)) {
    if (d === keep || !/^(bundle|tmp)-/.test(d)) continue;
    const dir = path.join(CACHE, d);
    try {
      const marker = path.join(dir, ".mk-root");
      const mine = fs.existsSync(marker) && fs.readFileSync(marker, "utf8") === ROOT;
      if (mine || fs.statSync(dir).mtimeMs < day) fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      // Another run is using or removing it; leave it.
    }
  }
};

export const getBundle = async ({ log = () => {} } = {}) => {
  const hash = crypto.createHash("sha256").update(ROOT);
  for (const f of bundleInputs()) hash.update(path.relative(ROOT, f)).update("\0").update(fs.readFileSync(f));
  const name = `bundle-${hash.digest("hex").slice(0, 16)}`;
  const dir = path.join(CACHE, name);
  fs.mkdirSync(CACHE, { recursive: true });
  pruneBundles(name);
  if (!fs.existsSync(path.join(dir, "index.html"))) {
    log(c.dim("  Bundling the engine (once per code change) …"));
    const { bundle } = await import("@remotion/bundler");
    const tmp = fs.mkdtempSync(path.join(CACHE, "tmp-"));
    try {
      await bundle({
        entryPoint: path.join(ROOT, "src", "index.ts"),
        outDir: tmp,
        rspack: true,
        publicDir: path.join(ROOT, "public"),
        // public/ is linked, not copied: big media stays put and edits show up without a rebuild.
        symlinkPublicDir: true,
        onProgress: () => {},
      });
      fs.writeFileSync(path.join(tmp, ".mk-root"), ROOT);
      fs.renameSync(tmp, dir);
    } catch (e) {
      fs.rmSync(tmp, { recursive: true, force: true });
      // A parallel run finished the same bundle first: use it.
      if (!fs.existsSync(path.join(dir, "index.html"))) throw e;
    }
  }
  const now = new Date();
  fs.utimesSync(dir, now, now);
  return dir;
};

// --- which frames to look at ---------------------------------------------------

/**
 * Frame 0 (the thumbnail), every scene once it has landed, every transition
 * midpoint, the last frame, and each kinetic phrase (only one is on screen at a time).
 */
export const keyFrames = (plan, E) => {
  const T = plan.transitionFrames;
  const last = plan.durationInFrames - 1;
  const shots = new Map();
  const add = (frame, kind, scene) => {
    const f = Math.max(0, Math.min(last, Math.round(frame)));
    const s = shots.get(f) ?? { frame: f, kinds: new Set(), scene };
    s.kinds.add(kind);
    shots.set(f, s);
  };
  add(0, "thumbnail", 0);
  plan.scenes.forEach((s, i) => {
    if (i > 0 && T > 0) add(s.from + Math.floor(T / 2), "transition", i);
    if (s.scene.type === "kinetic") {
      // Same exit timing as scenes/Kinetic.tsx: each phrase is judged once it has landed.
      s.beats.lines.slice(0, -1).forEach((l) => {
        const len = l.end - l.start;
        const exit = Math.min(6, Math.max(3, Math.round(len * 0.25)));
        add(s.from + l.start + Math.max(0, Math.min(plan.motion.enter + 2, len - exit - 1)), "beat", i);
      });
    }
    add(E.settledFrame(plan, i), "settled", i);
  });
  add(last, "last", plan.scenes.length - 1);
  return [...shots.values()].sort((a, b) => a.frame - b.frame);
};

// --- rendering ---------------------------------------------------------------

const pool = async (items, n, fn) => {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i]);
      }
    }),
  );
  return out;
};

/** One bundle + one browser, reused for every spec / variant checked. */
export const qaSession = async ({ log = () => {}, concurrency } = {}) => {
  const serveUrl = await getBundle({ log });
  const R = await import("@remotion/renderer");
  const E = await engine();
  const found = findBrowser();
  const browserOpts = { browserExecutable: found?.executable ?? null, chromeMode: found?.mode ?? "headless-shell", logLevel: "error" };
  const browser = await R.openBrowser("chrome", { ...browserOpts, chromiumOptions: { enableMultiProcessOnLinux: true } });
  const parallel = concurrency ?? Math.max(1, Math.min(4, os.cpus().length));

  const run = async (spec) => {
    const started = Date.now();
    const inputProps = { ...withTimingFile(spec), _qa: true, _silent: true };
    const composition = await R.selectComposition({ ...browserOpts, serveUrl, id: "Video", inputProps, puppeteerInstance: browser });
    const plan = E.planVideo(E.videoSchema.parse(composition.props));
    const shots = keyFrames(plan, E);
    await pool(shots, parallel, async (shot) => {
      const seen = [];
      try {
        await R.renderStill({
          ...browserOpts,
          serveUrl,
          composition,
          inputProps,
          frame: shot.frame,
          output: null,
          imageFormat: "jpeg",
          jpegQuality: 10,
          puppeteerInstance: browser,
          chromiumOptions: { enableMultiProcessOnLinux: true },
          onBrowserLog: (l) => {
            if (l.text.startsWith(PREFIX)) seen.push(JSON.parse(l.text.slice(PREFIX.length)));
          },
        });
      } catch (e) {
        seen.push({ frame: shot.frame, error: String(e?.message ?? e).split("\n")[0] });
      }
      shot.data = seen.filter((d) => d.frame === shot.frame).pop() ?? null;
    });
    const issues = judge(plan, shots, E);
    return {
      theme: plan.theme.name,
      format: plan.format.name,
      frames: shots.length,
      seconds: (Date.now() - started) / 1000,
      errors: issues.filter((i) => i.level === "error").length,
      warnings: issues.filter((i) => i.level === "warning").length,
      issues,
      plan,
    };
  };

  return { run, close: () => browser.close({ silent: true }) };
};

// --- rules -------------------------------------------------------------------

const area = (b) => Math.max(0, b[2]) * Math.max(0, b[3]);
const intersect = (a, b) => {
  const w = Math.min(a[0] + a[2], b[0] + b[2]) - Math.max(a[0], b[0]);
  const h = Math.min(a[1] + a[3], b[1] + b[3]) - Math.max(a[1], b[1]);
  return w > 0 && h > 0 ? w * h : 0;
};
const extents = (boxes) => ({
  left: Math.min(...boxes.map((b) => b[0])),
  top: Math.min(...boxes.map((b) => b[1])),
  right: Math.max(...boxes.map((b) => b[0] + b[2])),
  bottom: Math.max(...boxes.map((b) => b[1] + b[3])),
});
/** Worst side where `e` pokes out of `frame`, or null. */
const poke = (e, frame) => {
  const sides = [
    ["top", frame.top - e.top],
    ["bottom", e.bottom - frame.bottom],
    ["left", frame.left - e.left],
    ["right", e.right - frame.right],
  ].sort((a, b) => b[1] - a[1]);
  return sides[0][1] > TOLERANCE ? { side: sides[0][0], px: Math.round(sides[0][1]) } : null;
};
const overlapShare = (a, b) => {
  let inter = 0;
  for (const x of a) for (const y of b) inter += intersect(x, y);
  const smaller = Math.min(
    a.reduce((s, x) => s + area(x), 0),
    b.reduce((s, x) => s + area(x), 0),
  );
  return smaller > 0 ? inter / smaller : 0;
};

const words = (t) => t.split(/\s+/).filter((w) => READABLE.test(w)).length;

/** Word budget per kind of field when text has to get shorter. */
const budget = (label, type) => {
  if (/^line /.test(label)) return 4;
  if (/^(left|right) item/.test(label)) return 4;
  if (/^item /.test(label)) return type === "list" ? 5 : 4;
  if (/^tile .* sub$/.test(label)) return 5;
  if (/^(tile|bar) .* label$/.test(label)) return 2;
  if (/^tag /.test(label)) return 2;
  const map = { headline: 6, punch: 5, setup: 6, strike: 1, sub: 10, kicker: 3, title: 5, caption: 7, quote: 16, reply: 8, label: 6, name: 2, action: 2, text: 12, result: 6, prompt: 12, tagline: 4, handle: 1, author: 3, role: 4, value: 1 };
  return map[label] ?? 6;
};

const detailHint = (label, type) => {
  if (label === "headline" && (type === "title" || type === "orb")) return " or move detail to sub";
  if (label === "punch") return " or move the build-up into setup";
  if (label === "kicker" && type === "cta") return " or move detail to sub";
  if (/^line /.test(label)) return " or split it into two kinetic lines";
  if (/^item /.test(label)) return " or split the list across two scenes";
  if (/^(left|right) item/.test(label)) return " (compare rows read best at 1-5 words)";
  if (/^tile .* label$/.test(label)) return " and put detail in the tile's sub";
  if (label === "caption") return " or move detail to kicker";
  return "";
};

/** The spec field behind an element ("item 3 marker" is drawn for "item 3"). */
const field = (label) => label.replace(/ (marker|card)$/, "");

const shorten = (t, type) => {
  const label = field(t.label);
  if (/(^| )value$/.test(label)) return `use a shorter ${label} (e.g. "50K" instead of "50,000")`;
  const n = words(t.text);
  const k = Math.max(1, Math.min(budget(label, type), n - 1));
  if (n <= 1) return `use a shorter word for ${label}`;
  return `shorten ${label} to ≤${k} word${k === 1 ? "" : "s"}${detailHint(label, type)}`;
};
/** For text that does not fit the frame: shorten it, or give it a scene of its own. */
const makeRoom = (t, type) => {
  const s = shorten(t, type);
  return /split/.test(s) ? s : `${s}, or split the scene in two`;
};

const quote = (s) => (s ? ` "${s.length > 42 ? s.slice(0, 41) + "…" : s}"` : "");

export const judge = (plan, shots, E) => {
  const issues = [];
  const { format } = plan;
  const T = plan.transitionFrames;
  const box = E.contentBox(format);
  const safe = { left: box.left, top: box.top, right: box.left + box.width, bottom: box.top + box.height };
  const canvas = { left: 0, top: 0, right: format.width, bottom: format.height };
  // Below `min` px is an error, below `comfortable` a warning (landscape plays small on phones).
  const { min: minErr, comfortable: minWarn } = E.textFloor(format);
  const typeOf = (scene) => (scene === null || scene === undefined ? null : plan.scenes[scene]?.scene.type ?? null);
  const inTransition = (f) => T > 0 && plan.scenes.slice(1).some((s) => f >= s.from && f < s.from + T);
  const accent = plan.theme.colors.accent.toUpperCase();

  const add = (level, check, shot, t, problem, fix, extra = {}) =>
    issues.push({
      level,
      check,
      scene: t?.scene ?? null,
      type: typeOf(t?.scene),
      frame: shot.frame,
      time: +(shot.frame / FPS).toFixed(2),
      label: t?.label ?? null,
      text: t?.text ?? null,
      problem,
      fix,
      ...extra,
    });

  for (const shot of shots) {
    const d = shot.data;
    if (!d || d.error) {
      add("error", "probe", shot, null, `frame could not be measured${d?.error ? `: ${d.error}` : ""}`, "re-run; if it persists, run npm run check and open the frame in npm run dev");
      continue;
    }
    const moving = inTransition(shot.frame) && !shot.kinds.has("thumbnail");
    const settled = shot.kinds.has("settled") || shot.kinds.has("beat") || shot.kinds.has("last");

    if (moving) {
      // Mid-transition: the outgoing and incoming scenes must not put text on top of each other.
      // Overlays (the watermark) stay put while scenes slide under them; they are judged on settled frames.
      const live = d.texts
        .filter((t) => t.scene !== null)
        .map((t) => ({ t, boxes: t.boxes.filter((b) => b[4] > 0.35) }))
        .filter((x) => x.boxes.length);
      for (let a = 0; a < live.length; a++)
        for (let b = a + 1; b < live.length; b++) {
          const A = live[a];
          const B = live[b];
          if (A.t.scene === B.t.scene) continue;
          const share = overlapShare(A.boxes, B.boxes);
          if (share > 0.02)
            add("error", "overlap", shot, B.t, `crosses ${A.t.label}${quote(A.t.text)} of scene ${A.t.scene + 1} during the transition (${Math.round(share * 100)}% overlap)`, `shorten the text near the edges of both scenes or use transition "fade"`, { other: A.t.label });
        }
      continue;
    }

    const visible = d.texts.map((t) => ({ t, boxes: t.boxes.filter((b) => b[4] > 0.5) })).filter((x) => x.boxes.length);

    for (const { t, boxes } of visible) {
      const type = typeOf(t.scene);
      const e = extents(boxes);
      const off = poke(e, canvas);
      if (off) add("error", "canvas", shot, t, `runs ${off.px}px off the ${off.side} edge of the frame`, makeRoom(t, type));
      else {
        const out = poke(e, safe);
        if (out) add("error", "safe-zone", shot, t, `sits ${out.px}px into the ${out.side} platform-UI zone (covered by captions/buttons)`, makeRoom(t, type));
      }
      // Text that does not fit also ends up tiny, cut off or outside its card: one finding, one fix.
      if (t.overflow) add("error", "overflow", shot, t, "is too long for its slot even at the smallest type size", shorten(t, type));
      else if (settled && t.clipped > TOLERANCE) add("error", "clipped", shot, t, `is cut off: ${t.clipped}px of it is hidden`, shorten(t, type));
      else if (settled && t.card && t.spill > TOLERANCE) add("error", "spill", shot, t, `spills ${t.spill}px out of its ${t.card}`, shorten(t, type));
      else if (settled && READABLE.test(t.text) && t.px < minWarn) {
        const level = t.px < minErr ? "error" : "warning";
        add(level, "size", shot, t, `renders at ${t.px}px (min ${level === "error" ? minErr : minWarn}px on ${format.name})`, `${shorten(t, type)} so it can be set larger`, { px: t.px });
      }
      // Judged once things have landed: mid-fade text is dimmer on purpose.
      if (settled && t.contrast !== null) {
        const weak = t.contrast < 3 ? "error" : t.contrast < 4.5 && t.px < 48 ? "warning" : null;
        if (weak) {
          const dark = parseInt(t.bg.slice(1, 3), 16) + parseInt(t.bg.slice(3, 5), 16) + parseInt(t.bg.slice(5, 7), 16) < 384;
          const fix =
            t.color === accent
              ? `pick a ${dark ? "brighter" : "darker"} brand.accent or another theme`
              : plan.scenes[t.scene]?.scene.bg
                ? `remove this scene's "bg" override or pick another theme`
                : `pick another theme (or brand.accent) with more contrast`;
          add(weak, "contrast", shot, t, `contrast ${t.contrast}:1 (${t.color} on ${t.bg}; needs ${weak === "error" ? 3 : 4.5}:1)`, fix, { contrast: t.contrast });
        }
      }
    }

    for (const card of d.cards) {
      if (card.box[4] <= 0.5) continue;
      const off = poke(extents([card.box]), canvas);
      if (off) add("error", "canvas", shot, card, `runs ${off.px}px off the ${off.side} edge of the frame`, "too much content for this scene: shorten its text or split the scene in two");
    }

    for (let a = 0; a < visible.length; a++)
      for (let b = a + 1; b < visible.length; b++) {
        const A = visible[a];
        const B = visible[b];
        const share = overlapShare(A.boxes, B.boxes);
        if (share > 0.02)
          add("error", "overlap", shot, B.t, `overlaps ${A.t.label}${quote(A.t.text)} (${Math.round(share * 100)}% of the smaller)`, `shorten ${field(A.t.label)} or ${field(B.t.label)}, or split the scene in two`, { other: A.t.label });
      }

    if (shot.kinds.has("thumbnail")) {
      const readable = visible.some(({ t, boxes }) => READABLE.test(t.text) && !poke(extents(boxes), canvas));
      if (!readable) {
        // Scene 1's words can be there but pushed off the frame: that finding comes first.
        const blocker = issues.find((i) => i.frame === shot.frame && i.scene === 0 && i.check === "canvas");
        const { why, fix } = blankThumbnail(plan, E.openingText(plan), blocker);
        add("error", "thumbnail", shot, { scene: 0, label: "frame 0", text: "" }, `shows no readable text, so the thumbnail is blank: ${why}`, fix);
      }
    }
  }

  // One finding per element and problem; keep the first frame it shows up on.
  const seen = new Map();
  for (const i of issues) {
    const key = [i.check, i.scene, i.label, i.other ?? ""].join("|");
    const prev = seen.get(key);
    if (!prev) seen.set(key, { ...i, frames: [i.frame] });
    else {
      prev.frames.push(i.frame);
      if (i.level === "error" && prev.level !== "error") Object.assign(prev, { ...i, frames: prev.frames });
    }
  }
  return [...seen.values()].sort((a, b) => (a.scene ?? 1e9) - (b.scene ?? 1e9) || a.frame - b.frame);
};

// --- report ------------------------------------------------------------------

export const printReport = (result, name) => {
  const { plan, issues } = result;
  console.log(
    c.bold(`\nQA ${name}`) +
      c.dim(` · ${plan.format.label.split(" — ")[0]} ${plan.format.name} · theme ${plan.theme.name} · ${result.frames} frames in ${result.seconds.toFixed(1)}s`),
  );
  if (!issues.length) {
    console.log(c.green("  ✔ No visual problems found."));
    return;
  }
  const groups = new Map();
  for (const i of issues) {
    const k = i.scene ?? -1;
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(i);
  }
  for (const [k, list] of groups) {
    if (k >= 0) {
      const s = plan.scenes[k];
      console.log(c.bold(`  Scene ${k + 1} · ${s.scene.type}`) + c.dim(` (${(s.from / FPS).toFixed(1)}s–${((s.from + s.duration) / FPS).toFixed(1)}s)`));
    } else console.log(c.bold("  Whole video"));
    for (const i of list) {
      const mark = i.level === "error" ? c.red("✖") : c.yellow("⚠");
      console.log(`    ${mark} ${c.dim(`${(i.frame / FPS).toFixed(1)}s`.padStart(5))}  ${i.label ?? ""}${c.dim(quote(i.text))} ${i.problem}`);
      console.log(c.dim(`             → ${i.fix}`));
    }
  }
  const e = result.errors;
  const w = result.warnings;
  console.log((e ? c.red(`  ${e} error${e === 1 ? "" : "s"}`) : c.green("  0 errors")) + (w ? c.yellow(` · ${w} warning${w === 1 ? "" : "s"}`) : ""));
};

const toJson = (result, name) => ({
  spec: name,
  theme: result.theme,
  format: result.format,
  frames: result.frames,
  seconds: +result.seconds.toFixed(2),
  errors: result.errors,
  warnings: result.warnings,
  issues: result.issues,
});

// --- CLI ---------------------------------------------------------------------

const isMain = import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const args = parseArgs(process.argv.slice(2));
  if (!args._.length) readSpec(undefined);
  const E = await engine();
  const list = (v, all) => (!v ? [undefined] : v === "all" ? [...all] : String(v).split(",").map((s) => s.trim()));
  const themes = list(args.theme, E.THEME_NAMES);
  const formats = list(args.format, E.FORMAT_NAMES);
  for (const t of themes) if (t && !E.THEME_NAMES.includes(t)) (console.error(c.red(`Unknown theme "${t}". Use one of: ${E.THEME_NAMES.join(", ")}`)), process.exit(1));
  for (const f of formats) if (f && !E.FORMAT_NAMES.includes(f)) (console.error(c.red(`Unknown format "${f}". Use one of: ${E.FORMAT_NAMES.join(", ")}`)), process.exit(1));

  const jobs = [];
  for (const file of args._) {
    const { spec, name } = readSpec(file);
    for (const theme of themes)
      for (const format of formats) {
        const variant = applyOverrides(spec, { ...args, theme, format });
        const parsed = E.videoSchema.safeParse(withTimingFile(variant));
        if (!parsed.success) {
          console.error(c.red(`${file} is not a valid spec — run npm run check -- ${file} first.`));
          process.exit(1);
        }
        jobs.push({ name, label: [name, theme, format].filter(Boolean).join(" · "), spec: variant });
      }
  }

  const log = args.json ? () => {} : (s) => console.log(s);
  let session;
  try {
    session = await qaSession({ log, concurrency: args.concurrency ? Number(args.concurrency) : undefined });
  } catch (e) {
    console.error(c.red(`QA could not start: ${String(e?.message ?? e).split("\n")[0]}`));
    console.error(c.dim("  If the engine was edited, run: npx tsc -p . && npx eslint src. If no browser was found, set REMOTION_BROWSER_EXECUTABLE."));
    process.exit(1);
  }
  const results = [];
  try {
    for (const job of jobs) {
      const r = await session.run(job.spec);
      results.push({ job, r });
      if (!args.json) printReport(r, job.label);
    }
  } finally {
    await session.close();
  }

  const errors = results.reduce((s, x) => s + x.r.errors, 0);
  const warnings = results.reduce((s, x) => s + x.r.warnings, 0);
  if (args.json) {
    const out = results.map(({ job, r }) => toJson(r, job.name));
    console.log(JSON.stringify(out.length === 1 ? out[0] : out, null, 2));
  } else {
    if (results.length > 1) {
      console.log(c.bold(`\n${results.length} variants checked`));
      for (const { job, r } of results)
        console.log(`  ${r.errors ? c.red("✖") : r.warnings ? c.yellow("⚠") : c.green("✔")} ${job.label.padEnd(40)} ${c.dim(`${r.errors} errors · ${r.warnings} warnings`)}`);
    }
    console.log(
      errors
        ? c.red(`\n✖ QA failed: ${errors} error(s)${warnings ? `, ${warnings} warning(s)` : ""}. Fix the spec (see → hints) and run again.`)
        : c.green(`\n✔ QA passed`) + (warnings ? c.yellow(` with ${warnings} warning(s).`) : "."),
    );
  }
  process.exit(errors ? 1 : 0);
}
