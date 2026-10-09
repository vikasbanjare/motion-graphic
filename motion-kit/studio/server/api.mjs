// Motion Studio API: the kit's own scripts (check, qa, new, brand, music, make,
// reference) behind small JSON endpoints, mounted on the Studio's dev server.
// Everything runs locally; files land in motion-kit/specs, public/ and out/.
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { ROOT, engine } from "../../scripts/lib.mjs";

const SPECS = path.join(ROOT, "specs");
const RECIPES = path.join(SPECS, "recipes");
const PUBLIC = path.join(ROOT, "public");
const OUT = path.join(ROOT, "out");
const TMP = path.join(ROOT, "node_modules", ".cache", "motion-studio");
const UPLOAD_KINDS = new Set(["brand", "refs", "music", "voice", "clips", "images"]);
const MAX_UPLOAD = 200 * 1024 * 1024;

const E = await engine();
const { check } = await import("../../scripts/check.mjs");

/** A file-name-safe slug: letters, digits, dot, dash, underscore. */
export const safeName = (s) =>
  String(s)
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "")
    .slice(0, 80) || "file";

const send = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
};

const readBody = (req, limit = 5 * 1024 * 1024) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (c) => {
      size += c.length;
      if (size > limit) {
        reject(Object.assign(new Error(`Upload is larger than ${Math.round(limit / 1048576)} MB.`), { status: 413 }));
        req.destroy();
      } else chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });

const json = async (req) => {
  const buf = await readBody(req);
  try {
    return buf.length ? JSON.parse(buf.toString("utf8")) : {};
  } catch {
    throw Object.assign(new Error("Request body is not valid JSON."), { status: 400 });
  }
};

/** Run a kit script; resolves with exit code and output (never rejects). */
export const run = (script, args, { onLine } = {}) =>
  new Promise((resolve) => {
    const child = spawn(process.execPath, [path.join(ROOT, "scripts", script), ...args], { cwd: ROOT, env: { ...process.env, FORCE_COLOR: "0", NO_COLOR: "1" } });
    let stdout = "";
    let stderr = "";
    const feed = (chunk, into) => {
      const text = chunk.toString();
      if (onLine) text.split(/\r?\n/).filter(Boolean).forEach(onLine);
      return into + text;
    };
    child.stdout.on("data", (c) => (stdout = feed(c, stdout)));
    child.stderr.on("data", (c) => (stderr = feed(c, stderr)));
    child.on("close", (code) => resolve({ code, stdout, stderr }));
    child.on("error", (err) => resolve({ code: 1, stdout, stderr: String(err) }));
  });

const writeTmp = (name, data) => {
  fs.mkdirSync(TMP, { recursive: true });
  const file = path.join(TMP, `${safeName(name)}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  return file;
};

const specPath = (name) => path.join(SPECS, `${safeName(name).replace(/\.json$/, "")}.json`);

/** Everything the UI offers, read from the engine so it never drifts from what renders. */
const catalog = () => {
  const recipes = fs.existsSync(RECIPES)
    ? fs
        .readdirSync(RECIPES)
        .filter((f) => f.endsWith(".json"))
        .map((f) => {
          const spec = JSON.parse(fs.readFileSync(path.join(RECIPES, f), "utf8"));
          return { name: f.replace(/\.json$/, ""), purpose: spec._recipe?.purpose ?? spec._recipe?.description ?? "", format: spec.format, theme: spec.theme, motion: spec.motion, pace: spec.pace, spec };
        })
    : [];
  return {
    themes: E.THEME_NAMES.map((n) => ({ name: n, ...E.THEMES[n] })),
    formats: Object.entries(E.FORMATS).map(([name, f]) => ({ name, width: f.width, height: f.height, label: f.label ?? name })),
    motions: ["snappy", "smooth", "bouncy", "calm"],
    paces: ["relaxed", "normal", "fast"],
    transitions: ["auto", "push", "whip", "fade", "zoom", "blur", "cut"],
    displayFonts: Object.entries(E.DISPLAY_FONTS).map(([name, f]) => ({ name, ...f })),
    bodyFonts: Object.keys(E.BODY_FONTS),
    backgrounds: E.BACKGROUND_NAMES,
    corners: Object.keys(E.CORNER_RADIUS),
    sfx: fs.existsSync(path.join(PUBLIC, "sfx")) ? fs.readdirSync(path.join(PUBLIC, "sfx")).filter((f) => f.endsWith(".wav")) : [],
    sfxPacks: fs.existsSync(path.join(PUBLIC, "sfx"))
      ? fs.readdirSync(path.join(PUBLIC, "sfx"), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
      : [],
    recipes,
    elevenlabs: Boolean(process.env.ELEVENLABS_API_KEY),
  };
};

const listFiles = (kind) => {
  const dir = path.join(PUBLIC, kind);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => !f.startsWith(".") && !/\.(beats|timing)\.json$|\.mp3\.txt$/.test(f))
    .map((f) => ({ name: f, path: `${kind}/${f}`, size: fs.statSync(path.join(dir, f)).size }));
};

// --- render jobs --------------------------------------------------------------------
const jobs = new Map();
let jobSeq = 0;

const startRender = (name, opts) => {
  const id = String(++jobSeq);
  const job = { id, name, status: "running", log: [], outputs: [], startedAt: Date.now() };
  jobs.set(id, job);
  const args = [path.relative(ROOT, specPath(name))];
  if (opts.allFormats) args.push("--all-formats");
  else if (opts.format) args.push("--format", opts.format);
  run("make.mjs", args, {
    onLine: (line) => {
      job.log.push(line);
      if (job.log.length > 400) job.log.shift();
    },
  }).then(({ code }) => {
    job.status = code === 0 ? "done" : "failed";
    job.finishedAt = Date.now();
    job.outputs = fs.existsSync(OUT)
      ? fs
          .readdirSync(OUT)
          .filter((f) => f.startsWith(safeName(name)) && /\.(mp4|jpg)$/.test(f))
          .map((f) => `out/${f}`)
      : [];
  });
  return job;
};

// --- routes ---------------------------------------------------------------------------
const routes = {
  "GET /api/catalog": async () => catalog(),

  "GET /api/specs": async () =>
    fs.existsSync(SPECS)
      ? fs
          .readdirSync(SPECS)
          .filter((f) => f.endsWith(".json"))
          .map((f) => ({ name: f.replace(/\.json$/, ""), mtime: fs.statSync(path.join(SPECS, f)).mtimeMs }))
          .sort((a, b) => b.mtime - a.mtime)
      : [],

  "GET /api/spec": async (req, url) => {
    const file = specPath(url.searchParams.get("name") ?? "");
    if (!fs.existsSync(file)) throw Object.assign(new Error("No such spec."), { status: 404 });
    return JSON.parse(fs.readFileSync(file, "utf8"));
  },

  "PUT /api/spec": async (req, url) => {
    const name = url.searchParams.get("name");
    if (!name) throw Object.assign(new Error("Give the spec a name."), { status: 400 });
    const spec = await json(req);
    fs.mkdirSync(SPECS, { recursive: true });
    fs.writeFileSync(specPath(name), JSON.stringify(spec, null, 2) + "\n");
    return { saved: path.relative(ROOT, specPath(name)) };
  },

  /** Schema + craft rules + timeline, the same as npm run check. */
  "POST /api/check": async (req) => {
    const spec = await json(req);
    const parsed = E.videoSchema.safeParse(spec);
    if (!parsed.success) return { ok: false, errors: parsed.error.issues.map((i) => `${i.path.join(".") || "spec"}: ${i.message}`), warnings: [], notes: [], timeline: [] };
    const { errors, warnings, notes = [], plan } = await check(spec, { quiet: true });
    return {
      ok: errors.length === 0,
      errors,
      warnings,
      notes,
      duration: plan ? plan.durationInFrames / 30 : 0,
      timeline: plan ? plan.scenes.map((s) => ({ index: s.index, type: s.scene.type, from: s.from / 30, duration: s.duration / 30 })) : [],
    };
  },

  /** In-memory visual QA (renders key frames, writes nothing). */
  "POST /api/qa": async (req) => {
    const { spec, format, theme } = await json(req);
    const file = writeTmp("qa-spec", spec);
    const args = [file, "--json"];
    if (format) args.push("--format", format);
    if (theme) args.push("--theme", theme);
    const r = await run("qa.mjs", args);
    try {
      return JSON.parse(r.stdout);
    } catch {
      throw Object.assign(new Error((r.stderr || r.stdout).trim().split("\n").slice(-6).join("\n") || "QA failed to run."), { status: 500 });
    }
  },

  /** Start a spec from a recipe (npm run new). */
  "POST /api/new": async (req) => {
    const { name, recipe, format, theme } = await json(req);
    if (fs.existsSync(specPath(name))) throw Object.assign(new Error(`specs/${safeName(name)}.json already exists; pick another name.`), { status: 409 });
    const args = [safeName(name), "--recipe", recipe];
    if (format) args.push("--format", format);
    if (theme) args.push("--theme", theme);
    const r = await run("new.mjs", args);
    if (r.code !== 0 || !fs.existsSync(specPath(name))) throw Object.assign(new Error((r.stderr || r.stdout).trim().slice(-800)), { status: 400 });
    return { name: safeName(name), spec: JSON.parse(fs.readFileSync(specPath(name), "utf8")), log: r.stdout };
  },

  "GET /api/files": async (req, url) => {
    const kind = url.searchParams.get("kind") ?? "";
    if (!UPLOAD_KINDS.has(kind)) throw Object.assign(new Error("Unknown file kind."), { status: 400 });
    return listFiles(kind);
  },

  /** Raw upload: POST /api/upload?kind=refs&name=moodboard.png */
  "POST /api/upload": async (req, url) => {
    const kind = url.searchParams.get("kind") ?? "";
    if (!UPLOAD_KINDS.has(kind)) throw Object.assign(new Error("Unknown upload kind."), { status: 400 });
    const name = safeName(url.searchParams.get("name") ?? "upload");
    const buf = await readBody(req, MAX_UPLOAD);
    const dir = path.join(PUBLIC, kind);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, name), buf);
    return { path: `${kind}/${name}`, size: buf.length };
  },

  /** Palette + theme ranking from a logo or reference image (npm run brand, read-only). */
  "POST /api/analyze/image": async (req) => {
    const { path: rel } = await json(req);
    const r = await run("brand.mjs", [path.join(PUBLIC, rel), "--json"]);
    try {
      return JSON.parse(r.stdout);
    } catch {
      throw Object.assign(new Error((r.stderr || r.stdout).trim().slice(-600) || "Could not read the image."), { status: 400 });
    }
  },

  /** Fit a music track to the saved spec (npm run music); the spec file is updated. */
  "POST /api/music/fit": async (req) => {
    const { name, track, start, volume } = await json(req);
    const args = [path.relative(ROOT, specPath(name)), "--track", track];
    if (start !== undefined && start !== null && start !== "") args.push("--start", String(start));
    if (volume !== undefined) args.push("--volume", String(volume));
    const r = await run("music.mjs", args);
    if (r.code !== 0) throw Object.assign(new Error((r.stderr || r.stdout).trim().slice(-800)), { status: 400 });
    return { spec: JSON.parse(fs.readFileSync(specPath(name), "utf8")), log: r.stdout };
  },

  /** Measure a reference video (cuts, motion, colours, tempo) and suggest a style. Read-only. */
  "POST /api/analyze/video": async (req) => {
    const { path: rel } = await json(req);
    const r = await run("reference.mjs", [rel, "--json"]);
    try {
      return JSON.parse(r.stdout);
    } catch {
      throw Object.assign(new Error((r.stderr || r.stdout).trim().slice(-600) || "Could not read the video."), { status: 400 });
    }
  },

  /** Time an uploaded voice-over against the narration (npm run voice --align); updates the spec. */
  "POST /api/voice/align": async (req) => {
    const { name, file } = await json(req);
    if (!fs.existsSync(specPath(name))) throw Object.assign(new Error("Save the video first (Brief step)."), { status: 400 });
    const r = await run("voice.mjs", [path.relative(ROOT, specPath(name)), "--align", file, "--yes"]);
    if (r.code !== 0) throw Object.assign(new Error((r.stderr || r.stdout).trim().slice(-900)), { status: 400 });
    return { spec: JSON.parse(fs.readFileSync(specPath(name), "utf8")), log: r.stdout };
  },

  /** What a music generation would cost, before anything is spent. */
  "POST /api/music/quote": async (req) => {
    const { seconds } = await json(req);
    return {
      seconds,
      credits: null,
      note: `ElevenLabs Music bills generated audio by length on your plan (${Math.round(seconds)} s requested). Check your remaining credits at elevenlabs.io before generating.`,
    };
  },

  /**
   * Generate an instrumental bed with ElevenLabs Music (POST /v1/music). Needs
   * ELEVENLABS_API_KEY in the Studio's environment and confirm: true from the UI,
   * which shows the quote first. Saved to public/music/.
   */
  "POST /api/music/generate": async (req) => {
    const { prompt, seconds, instrumental = true, confirm } = await json(req);
    if (!confirm) throw Object.assign(new Error("Generation spends ElevenLabs credits; confirm first."), { status: 400 });
    const key = process.env.ELEVENLABS_API_KEY;
    if (!key) throw Object.assign(new Error("Set ELEVENLABS_API_KEY in the terminal that runs npm run studio, then restart it."), { status: 400 });
    const ms = Math.round(Math.min(600, Math.max(3, Number(seconds) || 30)) * 1000);
    const res = await fetch("https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128", {
      method: "POST",
      headers: { "xi-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: String(prompt).slice(0, 2000), music_length_ms: ms, model_id: "music_v1", force_instrumental: Boolean(instrumental) }),
    });
    if (!res.ok) throw Object.assign(new Error(`ElevenLabs Music: ${res.status} ${(await res.text()).slice(0, 400)}`), { status: 502 });
    const buf = Buffer.from(await res.arrayBuffer());
    const dir = path.join(PUBLIC, "music");
    fs.mkdirSync(dir, { recursive: true });
    const base = `generated-${safeName(String(prompt).slice(0, 32).toLowerCase())}-${Date.now().toString(36)}.mp3`;
    fs.writeFileSync(path.join(dir, base), buf);
    // Keep the prompt next to the file: it is the track's provenance.
    fs.writeFileSync(path.join(dir, `${base}.txt`), `Generated with ElevenLabs Music (music_v1), ${ms / 1000}s, instrumental=${Boolean(instrumental)}.\nPrompt: ${prompt}\n`);
    return { path: `music/${base}` };
  },

  "POST /api/render": async (req) => {
    const { name, format, allFormats } = await json(req);
    if (!fs.existsSync(specPath(name))) throw Object.assign(new Error("Save the spec first."), { status: 400 });
    const job = startRender(name, { format, allFormats });
    return { id: job.id };
  },

  "GET /api/job": async (req, url) => {
    const job = jobs.get(url.searchParams.get("id") ?? "");
    if (!job) throw Object.assign(new Error("No such job."), { status: 404 });
    return { ...job, log: job.log.slice(-60) };
  },
};

/** Optional routes added by other modules (reference analysis, music generation). */
export const extraRoutes = {};

const MIME = { ".mp4": "video/mp4", ".jpg": "image/jpeg", ".json": "application/json" };

/** Vite plugin: mounts /api/* and serves rendered files under /out/. */
export const studioApi = () => ({
  name: "motion-studio-api",
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const url = new URL(req.url, "http://localhost");
      if (url.pathname.startsWith("/out/")) {
        const file = path.join(OUT, path.basename(url.pathname));
        if (!fs.existsSync(file)) return next();
        res.setHeader("Content-Type", MIME[path.extname(file)] ?? "application/octet-stream");
        return fs.createReadStream(file).pipe(res);
      }
      if (!url.pathname.startsWith("/api/")) return next();
      const handler = routes[`${req.method} ${url.pathname}`] ?? extraRoutes[`${req.method} ${url.pathname}`];
      if (!handler) return send(res, 404, { error: `No route ${req.method} ${url.pathname}` });
      try {
        send(res, 200, await handler(req, url));
      } catch (err) {
        send(res, err.status ?? 500, { error: err.message ?? String(err) });
      }
    });
  },
});
