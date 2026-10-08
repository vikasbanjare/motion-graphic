// npm run brand -- public/brand/logo.png [--spec specs/my-video.json] [--json]   ("-" reads stdin)
// Finds a logo's brand colours, recommends the themes they suit best and, with
// --spec, writes brand.accent / brand.accent2 / brand.logo into the spec.
// Nothing but the spec is written: ffmpeg decodes the logo straight into memory
// (SVGs it cannot rasterise are read as text: fill / stroke / stop colours).
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { ROOT, c, parseArgs, readSpec } from "./lib.mjs";

const T = await import("../src/engine/themes.ts");

/** Logos are decoded this many pixels wide: plenty for colour statistics. */
export const SAMPLE_WIDTH = 96;
/** Clusters k-means looks for. */
export const K = 5;
/** OKLCH chroma below this reads as grey. */
const GREY = 0.04;
/** A brand colour must cover this share of the logo's coloured pixels. */
const SIZEABLE = 0.05;
/** Blends (anti-aliased edges, gradient steps) are thin: a colour covering more than this is real. */
const BLEND_MAX = 0.12;

const pack = ([r, g, b]) => (r << 16) | (g << 8) | b;
const unpack = (n) => [(n >> 16) & 255, (n >> 8) & 255, n & 255];
const chroma = (lab) => Math.hypot(lab[1], lab[2]);

// --- decoding ----------------------------------------------------------------

/** Image type from its first bytes (file extensions lie). */
export const sniff = (buf) => {
  const head = buf.subarray(0, 12).toString("latin1");
  if (head.startsWith("\x89PNG")) return "png";
  if (buf[0] === 0xff && buf[1] === 0xd8) return "jpeg";
  if (head.startsWith("GIF8")) return "gif";
  if (head.startsWith("RIFF") && head.slice(8, 12) === "WEBP") return "webp";
  if (/<svg[\s>]/i.test(buf.subarray(0, 8192).toString("utf8"))) return "svg";
  return "unknown";
};

// Explicit demuxer/decoder per type: Remotion's bundled ffmpeg cannot probe pipes.
const INPUT = {
  png: ["-f", "image2pipe", "-c:v", "png"],
  jpeg: ["-f", "image2pipe", "-c:v", "mjpeg"],
  webp: ["-f", "image2pipe", "-c:v", "webp"],
  gif: ["-f", "gif"],
  svg: ["-f", "svg_pipe"],
  unknown: [],
};

/** System ffmpeg first (more formats), then the one Remotion ships. */
const FFMPEGS = [
  ["ffmpeg", []],
  ["npx", ["remotion", "ffmpeg"]],
];

/**
 * Decode an image held in memory to RGBA pixels SAMPLE_WIDTH wide. Piped
 * through ffmpeg stdin -> stdout, so no file is ever written. Nearest-neighbour
 * scaling: point samples keep area shares honest and invent no in-between
 * colours (averaging would also mix in the RGB hidden under transparent pixels).
 * null if no ffmpeg can decode it.
 */
export const decodeImage = (buf, type = sniff(buf)) => {
  const args = ["-v", "error", ...INPUT[type], "-i", "pipe:0", "-frames:v", "1", "-vf", `scale=${SAMPLE_WIDTH}:-1:flags=neighbor`];
  args.push("-pix_fmt", "rgba", "-c:v", "rawvideo", "-f", "image2pipe", "pipe:1");
  for (const [cmd, pre] of FFMPEGS) {
    const r = spawnSync(cmd, [...pre, ...args], { input: buf, cwd: ROOT, maxBuffer: 1 << 28 });
    const out = r.stdout;
    if (r.status === 0 && out?.length && out.length % (SAMPLE_WIDTH * 4) === 0) {
      return { width: SAMPLE_WIDTH, height: out.length / (SAMPLE_WIDTH * 4), rgba: new Uint8Array(out) };
    }
  }
  return null;
};

// --- SVG as text -------------------------------------------------------------

const NAMED = {
  black: "#000000", white: "#FFFFFF", red: "#FF0000", green: "#008000", blue: "#0000FF", yellow: "#FFFF00",
  orange: "#FFA500", purple: "#800080", navy: "#000080", teal: "#008080", gray: "#808080", grey: "#808080",
  silver: "#C0C0C0", maroon: "#800000", lime: "#00FF00", aqua: "#00FFFF", fuchsia: "#FF00FF", gold: "#FFD700",
};

/** "#e4002b", "#E02", "rgb(228, 0, 43)", "red" -> "#E4002B". null for none / unknown. */
export const parseColour = (value) => {
  const v = String(value).trim().toLowerCase();
  let m = v.match(/^#([0-9a-f]{3,4})$/);
  if (m) return ("#" + [...m[1].slice(0, 3)].map((ch) => ch + ch).join("")).toUpperCase();
  m = v.match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/);
  if (m) return ("#" + m[1]).toUpperCase();
  m = v.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);
  if (m) return T.rgbToHex([+m[1], +m[2], +m[3]]);
  return NAMED[v] ?? null;
};

const attrsOf = (s) => {
  const out = {};
  for (const m of s.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) out[m[1]] = m[2] ?? m[3];
  return out;
};
const declsOf = (s = "") => {
  const out = {};
  for (const d of s.split(";")) {
    const i = d.indexOf(":");
    if (i > 0) out[d.slice(0, i).trim().toLowerCase()] = d.slice(i + 1).trim();
  }
  return out;
};

const SHAPES = new Set(["path", "rect", "circle", "ellipse", "polygon", "polyline", "line", "text"]);
const HIDDEN = new Set(["defs", "clippath", "mask", "pattern", "marker", "lineargradient", "radialgradient", "style", "title", "desc", "metadata"]);

/**
 * Paint colours of an SVG, weighted by how many shapes use them (fills count
 * 1, strokes 0.5, gradients split across their stops). Honours inheritance
 * from groups, style="" and <style> class rules.
 */
export const svgColors = (svg) => {
  const weights = new Map();
  const add = (hex, w) => {
    if (!hex) return;
    const key = pack(T.hexToRgb(hex));
    weights.set(key, (weights.get(key) ?? 0) + w);
  };

  const classes = {};
  for (const block of svg.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    for (const rule of block[1].replace(/<!\[CDATA\[|\]\]>/g, "").matchAll(/([^{}]+)\{([^}]*)\}/g)) {
      const decls = declsOf(rule[2]);
      for (const sel of rule[1].split(",")) {
        const m = sel.trim().match(/^\.([\w-]+)$/);
        if (m) classes[m[1]] = { ...classes[m[1]], ...decls };
      }
    }
  }
  const gradients = {};
  for (const g of svg.matchAll(/<(linearGradient|radialGradient)\b([^>]*)>([\s\S]*?)<\/\1>/gi)) {
    const id = attrsOf(g[2]).id;
    const stops = [...g[3].matchAll(/<stop\b([^>]*)>/gi)].map((s) => {
      const a = attrsOf(s[1]);
      return parseColour(declsOf(a.style)["stop-color"] ?? a["stop-color"] ?? "black");
    });
    if (id) gradients[id] = stops.filter(Boolean);
  }
  const paint = (value, w) => {
    if (!value || /^(none|transparent|currentcolor|inherit)$/i.test(value)) return;
    const url = value.match(/url\(\s*['"]?#([^'")\s]+)/);
    if (url) {
      const stops = gradients[url[1]] ?? [];
      for (const s of stops) add(s, w / stops.length);
    } else add(parseColour(value), w);
  };

  const stack = [{ fill: "#000000", stroke: null, hidden: 0 }];
  for (const m of svg.matchAll(/<(\/?)([a-zA-Z][\w:-]*)([^>]*?)(\/?)>/g)) {
    const [, closing, rawName, rawAttrs, selfClosing] = m;
    const name = rawName.toLowerCase();
    if (closing) {
      if (stack.length > 1) stack.pop();
      continue;
    }
    const parent = stack[stack.length - 1];
    const a = attrsOf(rawAttrs);
    const style = declsOf(a.style);
    const cls = Object.assign({}, ...(a.class ?? "").split(/\s+/).map((k) => classes[k] ?? {}));
    const prop = (p) => style[p] ?? cls[p] ?? a[p];
    const node = {
      fill: prop("fill") ?? parent.fill,
      stroke: prop("stroke") ?? parent.stroke,
      hidden: parent.hidden + (HIDDEN.has(name) ? 1 : 0),
    };
    if (SHAPES.has(name) && !node.hidden) {
      paint(node.fill, 1);
      paint(node.stroke, 0.5);
    }
    if (!selfClosing) stack.push(node);
  }
  return weights;
};

// --- pixels -> colour samples ---------------------------------------------------

/** "white" / "black" for near-neutral extremes (treated as background or ink), else "colour". */
export const classify = (rgb) => {
  const lab = T.rgbToOklab(rgb);
  if (chroma(lab) < GREY && lab[0] >= 0.94) return "white";
  if (chroma(lab) < GREY && lab[0] <= 0.22) return "black";
  return "colour";
};

/** Split weighted colours into brand-colour candidates and near-white / near-black weight. */
export const separate = (weights) => {
  const colours = new Map();
  let white = 0;
  let black = 0;
  for (const [n, w] of weights) {
    const kind = classify(unpack(n));
    if (kind === "white") white += w;
    else if (kind === "black") black += w;
    else colours.set(n, w);
  }
  return { colours, white, black };
};

/**
 * Sort decoded RGBA pixels: transparent pixels (alpha < 128) are dropped, the
 * rest are counted per exact colour. Also measures the image border, which
 * tells whether the logo carries its own background.
 */
export const samplePixels = (rgba, width, height) => {
  const weights = new Map();
  let transparent = 0;
  let border = 0;
  let borderOpaque = 0;
  let borderLum = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const edge = x === 0 || y === 0 || x === width - 1 || y === height - 1;
      if (edge) border++;
      if (rgba[i + 3] < 128) {
        transparent++;
        continue;
      }
      const n = pack([rgba[i], rgba[i + 1], rgba[i + 2]]);
      weights.set(n, (weights.get(n) ?? 0) + 1);
      if (edge) {
        borderOpaque++;
        borderLum += T.luminance(T.rgbToHex(unpack(n)));
      }
    }
  }
  const { colours, white, black } = separate(weights);
  return {
    colours,
    stats: { pixels: width * height, transparent, white, black, border, borderOpaque, borderLum: borderOpaque ? borderLum / borderOpaque : 0 },
  };
};

// --- k-means -------------------------------------------------------------------

const dist2 = (p, q) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2;

/**
 * Weighted k-means in OKLab (distances there match how different colours look).
 * Deterministic: seeds are picked greedily, heaviest point first, then the point
 * with the largest weight × distance² to its nearest seed (k-means++ without
 * the dice), so the same logo always gives the same palette.
 * points: [{ lab: [L, a, b], w }] -> [{ centre, weight, members }] (empty clusters dropped).
 */
export const kmeans = (points, k = K, maxIter = 60) => {
  if (!points.length) return [];
  let first = 0;
  points.forEach((p, i) => p.w > points[first].w && (first = i));
  const centres = [[...points[first].lab]];
  const near = points.map((p) => dist2(p.lab, centres[0]));
  while (centres.length < Math.min(k, points.length)) {
    let best = -1;
    let score = 0;
    points.forEach((p, i) => {
      if (p.w * near[i] > score) [best, score] = [i, p.w * near[i]];
    });
    if (best < 0) break; // every point already sits on a seed
    const seed = [...points[best].lab];
    centres.push(seed);
    points.forEach((p, i) => (near[i] = Math.min(near[i], dist2(p.lab, seed))));
  }

  const assign = new Array(points.length).fill(-1);
  for (let it = 0; it < maxIter; it++) {
    let moved = false;
    points.forEach((p, i) => {
      let j = 0;
      for (let q = 1; q < centres.length; q++) if (dist2(p.lab, centres[q]) < dist2(p.lab, centres[j])) j = q;
      if (assign[i] !== j) [assign[i], moved] = [j, true];
    });
    if (!moved) break;
    const sums = centres.map(() => [0, 0, 0, 0]);
    points.forEach((p, i) => {
      const s = sums[assign[i]];
      for (let d = 0; d < 3; d++) s[d] += p.lab[d] * p.w;
      s[3] += p.w;
    });
    sums.forEach((s, j) => s[3] > 0 && (centres[j] = [s[0] / s[3], s[1] / s[3], s[2] / s[3]]));
  }
  return centres
    .map((centre, j) => {
      const members = points.filter((_, i) => assign[i] === j);
      return { centre, weight: members.reduce((a, p) => a + p.w, 0), members };
    })
    .filter((cl) => cl.weight > 0);
};

/**
 * Cluster colour samples into at most k palette entries, biggest first. Each
 * entry shows the cluster's most common exact colour when one dominates (a
 * flat logo area, exact to the hex), else the cluster mean (gradients, photos).
 */
export const extractPalette = (colours, k = K) => {
  const points = [...colours].map(([n, w]) => ({ rgb: unpack(n), lab: T.rgbToOklab(unpack(n)), w }));
  const total = points.reduce((a, p) => a + p.w, 0);
  const entries = [];
  for (const cl of kmeans(points, k)) {
    const mode = cl.members.reduce((a, p) => (p.w > a.w ? p : a));
    const hex = mode.w >= 0.2 * cl.weight ? T.rgbToHex(mode.rgb) : T.rgbToHex(T.oklabToRgb(cl.centre));
    const twin = entries.find((e) => T.deltaE(e.hex, hex) < 0.03);
    if (twin) twin.weight += cl.weight;
    else entries.push({ hex, weight: cl.weight });
  }
  const palette = entries
    .map((e) => ({ hex: e.hex, share: e.weight / total, ...T.hexToOklch(e.hex) }))
    .sort((a, b) => b.share - a.share || a.hex.localeCompare(b.hex));
  return palette.map((p, i) => ({ ...p, blend: p.share < BLEND_MAX && isBlend(p.hex, [...palette.slice(0, i).map((q) => q.hex), "#FFFFFF", "#000000"]) }));
};

/**
 * Is `hex` a mix of two of the `anchors` (heavier palette colours, white,
 * black)? Edges anti-aliased against a white page, or against another brand
 * colour, form small clusters of in-between colours that must not become accents.
 * Mixing is done in sRGB, as renderers composite.
 */
export const isBlend = (hex, anchors) => {
  const x = T.hexToRgb(hex);
  for (let i = 0; i < anchors.length; i++) {
    for (let j = i + 1; j < anchors.length; j++) {
      const p = T.hexToRgb(anchors[i]);
      const d = T.hexToRgb(anchors[j]).map((v, k) => v - p[k]);
      const len = d.reduce((a, v) => a + v * v, 0);
      if (!len) continue;
      const t = d.reduce((a, v, k) => a + v * (x[k] - p[k]), 0) / len;
      if (t > 0.08 && t < 0.92 && T.deltaE(hex, T.rgbToHex(p.map((v, k) => v + t * d[k]))) < 0.03) return true;
    }
  }
  return false;
};

/**
 * accent = the most saturated sizeable colour (it is what makes the logo pop);
 * accent2 = the next most saturated one that is clearly different. Blends are
 * never picked. Either is null when the logo has no such colour (monochrome
 * logos keep the theme's colours).
 */
export const pickBrandColours = (palette) => {
  const chromatic = palette.filter((p) => p.c >= GREY && !p.blend);
  const sizeable = chromatic.filter((p) => p.share >= SIZEABLE);
  const pool = sizeable.length ? sizeable : chromatic.filter((p) => p.share >= 0.01);
  const mostSaturated = (list) => list.reduce((a, p) => (!a || p.c > a.c ? p : a), null);
  const accent = mostSaturated(pool);
  const accent2 = accent ? mostSaturated(chromatic.filter((p) => p !== accent && p.share >= 0.03 && T.deltaE(p.hex, accent.hex) >= 0.1)) : null;
  return { accent: accent?.hex ?? null, accent2: accent2?.hex ?? null };
};

/** Light or dark video background for this logo, and why (null = either works). */
export const decideBase = (stats, accent) => {
  if (stats.border && stats.borderOpaque / stats.border > 0.9) {
    if (stats.borderLum > 0.4) return { base: "light", why: "the logo sits on a light background" };
    if (stats.borderLum < 0.1) return { base: "dark", why: "the logo sits on a dark background" };
  }
  const opaque = stats.pixels - stats.transparent;
  if (stats.black > stats.white * 2 && stats.black >= opaque * 0.05) return { base: "light", why: "its dark lettering is drawn for light backgrounds" };
  if (stats.white > stats.black * 2 && stats.white >= opaque * 0.05) return { base: "dark", why: "its white lettering is drawn for dark backgrounds" };
  if (accent) {
    const y = T.luminance(accent);
    if (y >= 0.4) return { base: "dark", why: `its main colour ${accent} is light and glows on dark` };
    if (y <= 0.1) return { base: "light", why: `its main colour ${accent} is deep and needs a light page` };
  }
  return { base: null, why: "its colours work on light and dark" };
};

// --- theme recommendation ----------------------------------------------------------

const ratio = (k) => `${k.toFixed(1)}:1`;
const isLight = (theme) => T.luminance(theme.colors.bg) > 0.5;
/** Themes whose restraint suits a logo without a brand colour. */
const QUIET = ["mono", "clean", "studio", "studio-dark", "corporate", "editorial"];

/**
 * Score every theme for these brand colours. Most weight goes to keeping the
 * brand colours true (how far withBrand would have to move them), then to the
 * light/dark base the logo wants, then to a theme built around a similar hue.
 */
export const recommendThemes = ({ accent, accent2, base }) =>
  T.THEME_NAMES.map((name) => {
    const theme = T.THEMES[name];
    const light = isLight(theme);
    const reasons = [];
    let score = 0;
    const brand = accent ? { accent, ...(accent2 ? { accent2 } : {}) } : undefined;
    const colors = T.resolveBrand(theme, brand).theme.colors;
    if (accent) {
      const moved = T.deltaE(accent, colors.accent);
      score -= 4 * moved;
      score += (0.05 * Math.min(T.contrast(colors.accent, colors.bg) - 3, 4)) / 4; // headroom breaks ties
      if (moved === 0) reasons.push(`keeps ${accent} exactly (${ratio(T.contrast(accent, colors.bg))} on its ${light ? "light" : "dark"} background, button text ${ratio(T.contrast(accent, colors.onAccent))})`);
      else reasons.push(`has to ${T.luminance(colors.accent) < T.luminance(accent) ? "darken" : "lighten"} ${accent} to ${colors.accent} to read`);
      if (accent2) {
        const moved2 = T.deltaE(accent2, colors.accent2);
        score -= 2 * moved2;
        if (moved2 > 0.02) reasons.push(`accent2 becomes ${colors.accent2}`);
        if (T.harmonyOf(theme).rule === "neutral") score -= 0.1; // one-colour theme, two-colour brand
      }
      const b = T.hexToOklch(accent);
      if (b.c >= GREY && Math.abs(T.hueDelta(b.h, T.hexToOklch(theme.colors.accent).h)) <= 35) {
        score += 0.15;
        reasons.push("its own accent is a similar hue");
      }
    } else if (QUIET.includes(name)) {
      score += 0.3;
      reasons.push("a restrained palette suits a monochrome logo");
    }
    if (base) {
      score += (base === "light") === light ? 0.3 : -0.3;
      if ((base === "light") === light) reasons.push(`${base} base like the logo`);
    }
    return { name, score, reasons, accent: colors.accent, accent2: colors.accent2, onAccent: colors.onAccent, bg: colors.bg };
  }).sort((a, b) => b.score - a.score || T.THEME_NAMES.indexOf(a.name) - T.THEME_NAMES.indexOf(b.name));

/** Everything the CLI prints, from decoded pixels or SVG paint weights. */
export const analyse = ({ colours, stats }) => {
  const palette = extractPalette(colours);
  const { accent, accent2 } = pickBrandColours(palette);
  const { base, why } = decideBase(stats, accent);
  return { stats, palette, accent, accent2, base, baseWhy: why, themes: recommendThemes({ accent, accent2, base }) };
};

// --- writing the spec ------------------------------------------------------------

/** Top-level properties of a JSON object's text: key and the character range of its value. */
const topLevel = (text) => {
  const props = [];
  let i = text.indexOf("{") + 1;
  const ws = () => {
    while (/\s/.test(text[i] ?? "")) i++;
  };
  const str = () => {
    for (i++; text[i] !== '"'; i++) if (text[i] === "\\") i++;
    i++;
  };
  const value = () => {
    if (text[i] === '"') return str();
    if (text[i] === "{" || text[i] === "[") {
      let depth = 0;
      do {
        if (text[i] === '"') {
          str();
          continue;
        }
        if (text[i] === "{" || text[i] === "[") depth++;
        else if (text[i] === "}" || text[i] === "]") depth--;
        i++;
      } while (depth > 0 && i < text.length);
      return;
    }
    while (i < text.length && !/[,}\]\s]/.test(text[i])) i++;
  };
  for (ws(); text[i] === '"'; ws()) {
    const start = i;
    str();
    const key = JSON.parse(text.slice(start, i));
    ws();
    i++; // ":"
    ws();
    const valueStart = i;
    value();
    props.push({ key, start, valueStart, valueEnd: i });
    ws();
    if (text[i] === ",") i++;
  }
  return props;
};

/** Video-level settings that come before "brand" in a tidy spec. */
const LOOK_KEYS = ["format", "theme", "motion", "pace", "transition"];

/**
 * Put `brand` into a spec's JSON text, touching nothing else: the rest of the
 * file keeps its formatting (hand-wrapped arrays and all). A new brand block
 * goes after the look settings, 2-space indented.
 */
export const setBrandInText = (text, brand) => {
  const spec = JSON.parse(text);
  const props = topLevel(text);
  const indentOf = (p) => {
    const before = text.slice(text.lastIndexOf("\n", p.start) + 1, p.start);
    return /^\s*$/.test(before) ? before : "  ";
  };
  let out;
  const existing = props.find((p) => p.key === "brand");
  if (existing) {
    const block = JSON.stringify(brand, null, 2).split("\n").join("\n" + indentOf(existing));
    out = text.slice(0, existing.valueStart) + block + text.slice(existing.valueEnd);
  } else if (props.length) {
    const anchor = props.filter((p) => LOOK_KEYS.includes(p.key)).pop();
    const indent = indentOf(props[0]);
    const block = `"brand": ${JSON.stringify(brand, null, 2).split("\n").join("\n" + indent)}`;
    out = anchor
      ? text.slice(0, anchor.valueEnd) + `,\n${indent}${block}` + text.slice(anchor.valueEnd)
      : text.slice(0, props[0].start) + `${block},\n${indent}` + text.slice(props[0].start);
  }
  // Belt and braces: anything unexpected falls back to a clean 2-space rewrite.
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const rest = (o) => Object.fromEntries(Object.entries(o).filter(([k]) => k !== "brand"));
  try {
    const back = JSON.parse(out);
    if (same(back.brand, brand) && same(rest(back), rest(spec))) return out;
  } catch {
    // fall through
  }
  const entries = Object.entries(spec).filter(([k]) => k !== "brand");
  const pos = Math.max(0, ...entries.map(([k], i) => (LOOK_KEYS.includes(k) ? i + 1 : 0)));
  entries.splice(pos, 0, ["brand", brand]);
  return JSON.stringify(Object.fromEntries(entries), null, 2) + "\n";
};

/** The brand block to write: palette colours plus the logo path (relative to public/). */
export const nextBrand = (current = {}, { accent, accent2, logo }) => {
  const brand = { ...current };
  if (accent) {
    brand.accent = accent;
    // A stale accent2 from an older palette would clash; withBrand derives one instead.
    if (accent2) brand.accent2 = accent2;
    else delete brand.accent2;
  }
  if (logo) brand.logo = logo;
  // Schema order, then anything else as it was.
  const order = ["name", "accent", "accent2", "logo", "handle", "watermark"];
  const rank = (k) => (order.includes(k) ? order.indexOf(k) : order.length);
  return Object.fromEntries(Object.entries(brand).sort(([a], [b]) => rank(a) - rank(b)));
};

/** Whether writing `next` changes the spec's brand (key order aside; no brand = {}). */
export const brandChanged = (current, next) => {
  const norm = (o) => JSON.stringify(Object.entries(o ?? {}).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));
  return norm(current) !== norm(next);
};

// --- CLI ---------------------------------------------------------------------------

const swatch = (hex) => {
  if (!process.stdout.isTTY) return "";
  const [r, g, b] = T.hexToRgb(hex);
  return `\x1b[48;2;${r};${g};${b}m    \x1b[0m `;
};

/** Read a logo file ("-" = stdin) into colour samples. */
const read = (file) => {
  const abs = file === "-" ? null : path.resolve(process.cwd(), file);
  if (abs && !fs.existsSync(abs)) {
    console.error(c.red(`Logo not found: ${file}`));
    process.exit(1);
  }
  let buf;
  try {
    buf = fs.readFileSync(abs ?? 0);
  } catch (e) {
    const why = e.code === "EISDIR" ? "it is a folder, not an image file" : (e.code ?? e.message);
    console.error(c.red(`Could not read ${file} (${why}).`) + " Point at the logo file itself: a PNG, JPG, WebP, GIF or SVG.");
    process.exit(1);
  }
  const label = abs ? path.relative(process.cwd(), abs) : "stdin";
  const type = sniff(buf);
  const pixels = decodeImage(buf, type);
  if (pixels) return { abs, label, source: `${pixels.width}×${pixels.height} px`, ...samplePixels(pixels.rgba, pixels.width, pixels.height) };
  if (type === "svg") {
    const { colours, white, black } = separate(svgColors(buf.toString("utf8")));
    const total = [...colours.values()].reduce((a, w) => a + w, white + black);
    if (total) return { abs, label, source: "SVG paint colours", colours, stats: { pixels: total, transparent: 0, white, black, border: 0 } };
  }
  console.error(c.red(`Could not read ${file} (${type}).`) + " Use a PNG, JPG, WebP, GIF or SVG; install ffmpeg (https://ffmpeg.org) for WebP and SVG.");
  process.exit(1);
};

const isMain = import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const args = parseArgs(process.argv.slice(2));
  if (!args._[0]) {
    console.error("Usage: npm run brand -- <logo file> [--spec specs/your-video.json] [--json]");
    process.exit(1);
  }
  const logo = read(args._[0]);
  const result = analyse(logo);
  const rel = logo.abs ? path.relative(path.join(ROOT, "public"), logo.abs) : "..";
  const logoPath = rel && !rel.startsWith("..") && !path.isAbsolute(rel) ? rel.split(path.sep).join("/") : null;

  if (args.json) {
    const { themes, palette, ...rest } = result;
    console.log(JSON.stringify({ logo: logoPath ?? logo.label, ...rest, palette: palette.map(({ hex, share, blend }) => ({ hex, share: +share.toFixed(3), blend })), themes: themes.map((t) => ({ ...t, score: +t.score.toFixed(3) })) }, null, 2));
  } else {
    const s = result.stats;
    const pct = (n) => `${Math.round((100 * n) / (s.pixels || 1))}%`;
    console.log(c.bold(`\n${logo.label}`) + c.dim(` · ${logo.source} · ignored: ${pct(s.transparent)} transparent, ${pct(s.white)} near-white, ${pct(s.black)} near-black`));
    console.log(c.bold("\nPalette") + c.dim(` (k-means, k=${K}, by share of coloured pixels)`));
    if (!result.palette.length) console.log(c.dim("  No colours besides black, white and transparency."));
    for (const p of result.palette) {
      const role = p.hex === result.accent ? "accent" : p.hex === result.accent2 ? "accent2" : p.c < GREY ? "grey" : p.blend ? "blend" : "";
      console.log(
        `  ${swatch(p.hex)}${p.hex}  ${`${Math.round(p.share * 100)}%`.padStart(4)}  ${role.padEnd(8)}` +
          c.dim(`${ratio(T.contrast(p.hex, "#FFFFFF")).padStart(6)} on white · ${ratio(T.contrast(p.hex, "#000000")).padStart(6)} on black`),
      );
    }
    if (!result.accent) console.log(c.yellow("  Monochrome logo: no brand accent; themes keep their own accent colours."));
    console.log(c.bold("\nBase  ") + (result.base ?? "light or dark") + c.dim(` — ${result.baseWhy}.`));
    console.log(c.bold("\nBest themes"));
    result.themes.slice(0, 3).forEach((t, i) => {
      console.log(`  ${i + 1}. ${c.bold(t.name.padEnd(11))} ${t.reasons.join("; ")}.`);
      console.log(c.dim(`     ${T.THEMES[t.name].description}`) + (result.accent ? c.dim(` Accent ${t.accent} · button text ${t.onAccent} · accent2 ${t.accent2}.`) : ""));
    });
    console.log(c.dim(`  Then: ${result.themes.slice(3).map((t) => t.name).join(", ")}.`));
  }

  if (args.spec) {
    const { abs, spec } = readSpec(args.spec);
    const brand = nextBrand(spec.brand, { accent: result.accent, accent2: result.accent2, logo: logoPath });
    // Nothing new (e.g. a monochrome logo outside public/): leave the file alone.
    if (brandChanged(spec.brand, brand)) fs.writeFileSync(abs, setBrandInText(fs.readFileSync(abs, "utf8"), brand));
    const say = args.json ? (s) => console.error(s) : (s) => console.log(s);
    const wrote = ["accent", "accent2", "logo"].filter((k) => brand[k] !== undefined && brand[k] !== spec.brand?.[k]).map((k) => `brand.${k} ${brand[k]}`);
    say(c.green(`\n✔ ${args.spec}: `) + (wrote.length ? `wrote ${wrote.join(", ")}` : "brand already up to date") + ".");
    if (spec.brand?.accent2 && !brand.accent2) say(c.dim(`  Removed brand.accent2 ${spec.brand.accent2}: this logo has one brand colour, so accent2 is derived from it.`));
    if (!logoPath) say(c.yellow(`  brand.logo not set: the logo must live in motion-kit/public/ (e.g. public/brand/${logo.abs ? path.basename(logo.abs) : "logo.png"}). Move it there and run again.`));
    const name = spec.theme ?? "midnight";
    if (T.THEMES[name]) {
      for (const ch of T.resolveBrand(T.THEMES[name], brand).changes) say(c.dim(`  ℹ With theme ${name}: `) + ch.message);
      const rank = result.themes.findIndex((t) => t.name === name);
      if (rank > 2) say(c.dim(`  Theme ${name} ranks ${rank + 1}/10 for this logo; consider "${result.themes[0].name}".`));
    }
  } else if (!args.json) {
    console.log(c.dim(`\nWrite these into a spec: npm run brand -- ${logo.abs ? logo.label : "<logo>"} --spec specs/<name>.json`));
  }
}
