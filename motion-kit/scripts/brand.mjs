// npm run brand -- public/brand/logo.png [--spec specs/my-video.json] [--json]   ("-" reads stdin)
// Finds a logo's brand colours, recommends the themes they suit best and, with
// --spec, writes brand.accent / brand.accent2 / brand.logo into the spec.
// Nothing but the spec is written: ffmpeg decodes the logo straight into memory
// (an SVG it cannot rasterise is read as text: fill / stroke / stop colours by area).
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

/**
 * A logo's own frame (its sheet or tile): one opaque part spanning this share
 * of the image both ways (a full-bleed square, or one with rounded corners or
 * a few % of transparent padding, as app icons are exported)...
 */
const FRAME_SPAN = 0.85;
/** ...that fills this share of its bounding box (a square or squircle, not a disc, ring or wordmark)... */
const FRAME_SOLID = 0.85;
/** ...with at most this share cut out to transparency (more is a knockout: the glyph shows the video through it). */
const KNOCKOUT = 0.03;

const pack = ([r, g, b]) => (r << 16) | (g << 8) | b;
const unpack = (n) => [(n >> 16) & 255, (n >> 8) & 255, n & 255];
const chroma = (lab) => Math.hypot(lab[1], lab[2]);
/**
 * White, cream, grey or black: the paper a logo can be printed on. A logo's
 * frame only counts as a backdrop (a box around the logo) when it is paper; a
 * saturated full-bleed colour is the mark itself (an app tile).
 */
const isPaper = (rgb) => chroma(T.rgbToOklab(rgb)) < GREY;

// --- decoding ----------------------------------------------------------------

/** Image type from its first bytes (file extensions lie). */
export const sniff = (buf) => {
  const head = buf.subarray(0, 12).toString("latin1");
  if (head.startsWith("\x89PNG")) return "png";
  if (buf[0] === 0xff && buf[1] === 0xd8) return "jpeg";
  if (head.startsWith("GIF8")) return "gif";
  if (head.startsWith("RIFF") && head.slice(8, 12) === "WEBP") return "webp";
  // Markup: the <svg> root may follow a long XML prolog, comments or metadata.
  if (/^(﻿)?\s*</.test(buf.subarray(0, 256).toString("utf8")) && /<svg[\s>]/i.test(buf.toString("utf8"))) return "svg";
  return "unknown";
};

// Explicit demuxer/decoder per type: Remotion's bundled ffmpeg cannot probe pipes.
const INPUT = {
  png: ["-f", "image2pipe", "-c:v", "png"],
  jpeg: ["-f", "image2pipe", "-c:v", "mjpeg"],
  webp: ["-f", "image2pipe", "-c:v", "webp"],
  gif: ["-f", "gif"],
  // librsvg draws at 4× the sample width, so its anti-aliased edges are rare among the samples.
  svg: ["-f", "svg_pipe", "-c:v", "librsvg", "-width", String(4 * SAMPLE_WIDTH)],
  unknown: [],
};

/**
 * Nearest-neighbour at full colour resolution: by default swscale halves the
 * colour detail and invents a colour at every vertical edge (yellow beside
 * transparency came out #DFC167), which would pollute the rim and the palette.
 */
const SCALE_FLAGS = "neighbor+full_chroma_inp+full_chroma_int+accurate_rnd";

/** System ffmpeg first (more formats, librsvg for SVG), then the one Remotion ships (PNG, JPG, GIF only). */
const FFMPEGS = [
  { cmd: "ffmpeg", pre: [], types: null },
  { cmd: "npx", pre: ["--no-install", "remotion", "ffmpeg"], types: ["png", "jpeg", "gif"] },
];

/**
 * ffmpeg arguments that decode one image to raw RGBA, SAMPLE_WIDTH wide, on
 * stdout. A logo file is read from its path (reading writes nothing); stdin
 * bytes are piped in, and a piped SVG needs its length up front (svg_pipe
 * cannot tell where it ends). `size`: an SVG's own width/height (or viewBox),
 * so it renders at its aspect ratio instead of librsvg's 100×100 default box.
 */
export const decodeArgs = (type, { file = null, bytes = 0, size = null } = {}) => {
  const input = [...INPUT[type]];
  if (type === "svg" && size) input.push("-height", String(Math.max(1, Math.round((4 * SAMPLE_WIDTH * size[1]) / size[0]))), "-keep_ar", "0");
  if (type === "svg" && !file) input.push("-frame_size", String(bytes));
  return ["-v", "error", ...input, "-i", file ?? "pipe:0", "-frames:v", "1", "-vf", `scale=${SAMPLE_WIDTH}:-1:flags=${SCALE_FLAGS}`, "-pix_fmt", "rgba", "-c:v", "rawvideo", "-f", "image2pipe", "pipe:1"];
};

/**
 * Decode an image to RGBA pixels SAMPLE_WIDTH wide, straight into memory
 * (ffmpeg -> stdout; no file is ever written). `file`: its absolute path, if it
 * is one, else `buf` is piped in. Nearest-neighbour scaling: point samples keep
 * area shares honest and invent no in-between colours (averaging would also mix
 * in the RGB hidden under transparent pixels). null if no ffmpeg can decode it.
 */
export const decodeImage = (buf, type = sniff(buf), file = null) => {
  const size = type === "svg" ? svgSize(buf.toString("utf8")) : null;
  const args = decodeArgs(type, { file, bytes: buf.length, size });
  for (const { cmd, pre, types } of FFMPEGS) {
    if (types && !types.includes(type)) continue;
    const r = spawnSync(cmd, [...pre, ...args], { input: file ? undefined : buf, cwd: ROOT, maxBuffer: 1 << 28 });
    const out = r.stdout;
    if (r.status === 0 && out?.length && out.length % (SAMPLE_WIDTH * 4) === 0) {
      const rgba = new Uint8Array(out);
      // librsvg hands over premultiplied colour: undo it, or edges read darker than they are.
      if (type === "svg") for (let i = 0; i < rgba.length; i += 4) for (let k = 0; k < 3 && rgba[i + 3]; k++) rgba[i + k] = Math.min(255, Math.round((rgba[i + k] * 255) / rgba[i + 3]));
      return { width: SAMPLE_WIDTH, height: rgba.length / (SAMPLE_WIDTH * 4), rgba };
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
const rootAttrs = (svg) => attrsOf(svg.match(/<svg\b([^>]*)>/i)?.[1] ?? "");

/** The root <svg>'s user-space box [x, y, w, h]: viewBox, else width/height. null if neither. */
export const svgViewBox = (svg) => {
  const a = rootAttrs(svg);
  const vb = String(a.viewBox ?? a.viewbox ?? "").trim().split(/[\s,]+/).map(Number);
  if (vb.length === 4 && vb.every(Number.isFinite) && vb[2] > 0 && vb[3] > 0) return vb;
  const [w, h] = [parseFloat(a.width), parseFloat(a.height)];
  return w > 0 && h > 0 && !/%/.test(a.width + a.height) ? [0, 0, w, h] : null;
};

/** The SVG's drawn size [w, h] (its width/height, else its viewBox), for its aspect ratio. */
export const svgSize = (svg) => {
  const a = rootAttrs(svg);
  const [w, h] = [parseFloat(a.width), parseFloat(a.height)];
  if (w > 0 && h > 0 && !/%/.test(a.width + a.height)) return [w, h];
  return svgViewBox(svg)?.slice(2) ?? null;
};
const declsOf = (s = "") => {
  const out = {};
  for (const d of s.split(";")) {
    const i = d.indexOf(":");
    if (i > 0) out[d.slice(0, i).trim().toLowerCase()] = d.slice(i + 1).trim();
  }
  return out;
};

const SHAPES = new Set(["path", "rect", "circle", "ellipse", "polygon", "polyline", "line", "text", "tspan"]);
const HIDDEN = new Set(["defs", "clippath", "mask", "pattern", "marker", "lineargradient", "radialgradient", "style", "title", "desc", "metadata"]);

/** A length attribute in user units; "50%" is a share of `ref`. null if missing. */
const lengthOf = (v, ref) => {
  const n = parseFloat(v);
  if (!Number.isFinite(n)) return null;
  return String(v).trim().endsWith("%") ? (n / 100) * ref : n;
};

/** How much a transform="" scales areas (|determinant|): translate and rotate keep them. */
const areaScale = (t = "") => {
  let det = 1;
  for (const m of t.matchAll(/(\w+)\s*\(([^)]*)\)/g)) {
    const n = m[2].split(/[\s,]+/).filter(Boolean).map(Number);
    if (m[1] === "scale") det *= n[0] * (n[1] ?? n[0]);
    else if (m[1] === "matrix") det *= n[0] * n[3] - n[1] * n[2];
  }
  return Number.isFinite(det) ? Math.abs(det) : 1;
};

/** Points along an SVG arc (endpoint form -> centre form, SVG spec F.6.5), up to its end point. */
const arcPoints = ([x1, y1], rx, ry, deg, large, sweep, [x2, y2]) => {
  rx = Math.abs(rx);
  ry = Math.abs(ry);
  if (x1 === x2 && y1 === y2) return [];
  if (!rx || !ry) return [[x2, y2]];
  const [cos, sin] = [Math.cos((deg * Math.PI) / 180), Math.sin((deg * Math.PI) / 180)];
  const [dx, dy] = [(x1 - x2) / 2, (y1 - y2) / 2];
  const [xp, yp] = [cos * dx + sin * dy, -sin * dx + cos * dy];
  const grow = Math.sqrt(Math.max(1, (xp * xp) / (rx * rx) + (yp * yp) / (ry * ry)));
  [rx, ry] = [rx * grow, ry * grow];
  const k = (large === sweep ? -1 : 1) * Math.sqrt(Math.max(0, (rx * rx * ry * ry - rx * rx * yp * yp - ry * ry * xp * xp) / (rx * rx * yp * yp + ry * ry * xp * xp)));
  const [cxp, cyp] = [(k * rx * yp) / ry, (-k * ry * xp) / rx];
  const [cx, cy] = [cos * cxp - sin * cyp + (x1 + x2) / 2, sin * cxp + cos * cyp + (y1 + y2) / 2];
  const t1 = Math.atan2((yp - cyp) / ry, (xp - cxp) / rx);
  let dt = Math.atan2((-yp - cyp) / ry, (-xp - cxp) / rx) - t1;
  if (sweep && dt < 0) dt += 2 * Math.PI;
  if (!sweep && dt > 0) dt -= 2 * Math.PI;
  const steps = Math.max(2, Math.ceil(Math.abs(dt) / (Math.PI / 8)));
  return Array.from({ length: steps }, (_, s) => {
    const t = t1 + (dt * (s + 1)) / steps;
    const [ex, ey] = [rx * Math.cos(t), ry * Math.sin(t)];
    return [cos * ex - sin * ey + cx, sin * ex + cos * ey + cy];
  });
};

/**
 * An SVG path's outline as polygons, one per subpath: end points, plus each
 * curve's midpoint and points along arcs (close enough for areas). Absolute,
 * relative, implicit repeats, packed arc flags ("a5 5 0 015 5") are all read.
 */
export const pathPolygons = (d) => {
  const NUM = /[\s,]*([-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?)/y;
  const FLAG = /[\s,]*([01])/y;
  let p = 0;
  const read = (re) => {
    re.lastIndex = p;
    const m = re.exec(d);
    if (!m) return null;
    p = re.lastIndex;
    return Number(m[1]);
  };
  const polys = [];
  let poly = null;
  let [x, y, sx, sy] = [0, 0, 0, 0];
  let ctrl = null; // last control point, for S / T reflections
  let cmd = "";
  let prev = "";
  const to = (px, py) => {
    if (!poly) polys.push((poly = [[x, y]]));
    poly.push([px, py]);
  };
  for (;;) {
    while (/[\s,]/.test(d[p] ?? "")) p++;
    if (p >= d.length) break;
    if (/[a-df-z]/i.test(d[p])) cmd = d[p++];
    else if (!cmd || /z/i.test(cmd)) break; // numbers with no command: malformed
    const C = cmd.toUpperCase();
    const [ox, oy] = cmd === C ? [0, 0] : [x, y];
    const nums = (n) => {
      const out = [];
      for (let i = 0; i < n; i++) out.push(read(NUM));
      return out.some((v) => v === null) ? null : out;
    };
    let a;
    if (C === "Z") {
      if (poly) to(sx, sy); // the closing edge counts towards the outline
      [x, y, poly, ctrl] = [sx, sy, null, null];
    } else if (C === "M") {
      if (!(a = nums(2))) break;
      [x, y] = [ox + a[0], oy + a[1]];
      [sx, sy] = [x, y];
      polys.push((poly = [[x, y]]));
      cmd = cmd === "M" ? "L" : "l"; // further pairs are line-tos
    } else if (C === "L" || C === "T") {
      if (!(a = nums(2))) break;
      const [ex, ey] = [ox + a[0], oy + a[1]];
      if (C === "T") {
        const q = /[QT]/.test(prev) && ctrl ? [2 * x - ctrl[0], 2 * y - ctrl[1]] : [x, y];
        to((x + 2 * q[0] + ex) / 4, (y + 2 * q[1] + ey) / 4);
        ctrl = q;
      }
      to(ex, ey);
      [x, y] = [ex, ey];
    } else if (C === "H" || C === "V") {
      if (!(a = nums(1))) break;
      if (C === "H") x = ox + a[0];
      else y = oy + a[0];
      to(x, y);
    } else if (C === "C" || C === "S" || C === "Q") {
      const n = C === "C" ? 6 : 4;
      if (!(a = nums(n))) break;
      const pts = [];
      for (let i = 0; i < n; i += 2) pts.push([ox + a[i], oy + a[i + 1]]);
      const [ex, ey] = pts[pts.length - 1];
      if (C === "Q") to((x + 2 * pts[0][0] + ex) / 4, (y + 2 * pts[0][1] + ey) / 4);
      else {
        const c1 = C === "C" ? pts[0] : /[CS]/.test(prev) && ctrl ? [2 * x - ctrl[0], 2 * y - ctrl[1]] : [x, y];
        const c2 = pts[pts.length - 2];
        to((x + 3 * c1[0] + 3 * c2[0] + ex) / 8, (y + 3 * c1[1] + 3 * c2[1] + ey) / 8);
      }
      ctrl = pts[pts.length - 2];
      to(ex, ey);
      [x, y] = [ex, ey];
    } else if (C === "A") {
      const r = nums(3);
      const flags = r && [read(FLAG), read(FLAG)];
      const end = flags && !flags.includes(null) && nums(2);
      if (!end) break;
      const [ex, ey] = [ox + end[0], oy + end[1]];
      for (const pt of arcPoints([x, y], r[0], r[1], r[2], flags[0], flags[1], [ex, ey])) to(...pt);
      [x, y] = [ex, ey];
    }
    prev = C;
  }
  return polys;
};

/**
 * Filled area and outline length of polygons that make one shape. A polygon
 * inside another one's box is a hole (or an island in a hole: the depth decides),
 * whatever way it winds, so the counters of "o" and "A" are not counted as ink.
 */
const polygonsGeometry = (polys) => {
  const parts = polys
    .filter((p) => p.length > 2)
    .map((p) => {
      let area = 0;
      let length = 0;
      p.forEach(([x, y], i) => {
        const [nx, ny] = p[(i + 1) % p.length];
        area += x * ny - nx * y;
        if (i < p.length - 1) length += Math.hypot(nx - x, ny - y);
      });
      const xs = p.map((q) => q[0]);
      const ys = p.map((q) => q[1]);
      return { area: Math.abs(area) / 2, length, box: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)] };
    });
  const size = (b) => (b[2] - b[0]) * (b[3] - b[1]);
  const within = (b, o) => b[0] >= o[0] && b[1] >= o[1] && b[2] <= o[2] && b[3] <= o[3] && size(o) > size(b);
  let area = 0;
  for (const part of parts) area += (parts.filter((o) => o !== part && within(part.box, o.box)).length % 2 ? -1 : 1) * part.area;
  return { area: Math.max(0, area), length: parts.reduce((s, q) => s + q.length, 0) };
};

/** Filled area and outline length of one SVG shape element, in user units. */
const shapeGeometry = (name, a, [, , vw, vh], fontSize, text) => {
  const len = (v, ref) => lengthOf(v, ref) ?? 0;
  const diag = Math.hypot(vw, vh) / Math.SQRT2;
  switch (name) {
    case "rect": {
      const [w, h] = [len(a.width, vw), len(a.height, vh)];
      return { area: w * h, length: 2 * (w + h) };
    }
    case "circle": {
      const r = len(a.r, diag);
      return { area: Math.PI * r * r, length: 2 * Math.PI * r };
    }
    case "ellipse": {
      const [rx, ry] = [len(a.rx, vw), len(a.ry, vh)];
      return { area: Math.PI * rx * ry, length: Math.PI * (rx + ry) };
    }
    case "line":
      return { area: 0, length: Math.hypot(len(a.x2, vw) - len(a.x1, vw), len(a.y2, vh) - len(a.y1, vh)) };
    case "polygon":
    case "polyline": {
      const n = (a.points ?? "").trim().split(/[\s,]+/).map(Number);
      const pts = [];
      for (let i = 0; i + 1 < n.length; i += 2) pts.push([n[i], n[i + 1]]);
      return polygonsGeometry([pts]);
    }
    case "path":
      return polygonsGeometry(pathPolygons(a.d ?? ""));
    default: {
      // text / tspan: about 0.3 em² of ink per character.
      const chars = text.replace(/\s+/g, "").length;
      return { area: chars * 0.3 * fontSize * fontSize, length: 0 };
    }
  }
};

/**
 * Paint colours of an SVG read as text, weighted by the area they cover
 * (fills: the shape's area; strokes: outline length × stroke width; gradients
 * split across their stops). Honours inheritance from groups, style="",
 * <style> class rules and scale transforms. `backdrop`: the solid fill of the
 * topmost rect framing the drawing (FRAME_SPAN of it both ways, square or
 * rounded) when it is paper (white, cream, grey, black: the logo's own
 * background), else null. A coloured one is the mark itself (an app tile),
 * drawn like any other shape.
 */
export const svgColors = (svg) => {
  const weights = new Map();
  const add = (hex, w) => {
    if (!hex || !(w > 0)) return;
    const key = pack(T.hexToRgb(hex));
    weights.set(key, (weights.get(key) ?? 0) + w);
  };
  const vb = svgViewBox(svg) ?? [0, 0, 300, 150]; // 300×150: the CSS default size
  let backdrop = null;

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

  const stack = [{ fill: "#000000", stroke: null, strokeWidth: "1", fontSize: "16", scale: 1, hidden: 0 }];
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
      strokeWidth: prop("stroke-width") ?? parent.strokeWidth,
      fontSize: prop("font-size") ?? parent.fontSize,
      scale: parent.scale * areaScale(prop("transform")),
      hidden: parent.hidden + (HIDDEN.has(name) ? 1 : 0),
    };
    if (SHAPES.has(name) && !node.hidden) {
      const fontSize = lengthOf(node.fontSize, 16) ?? 16;
      const start = m.index + m[0].length;
      // Text: its own characters, up to the next tag (a <tspan> counts its own).
      const text = !selfClosing && (name === "text" || name === "tspan") ? svg.slice(start, (svg.indexOf("<", start) + 1 || svg.length + 1) - 1) : "";
      const { area, length } = shapeGeometry(name, a, vb, fontSize, text);
      paint(node.fill, area * node.scale);
      paint(node.stroke, length * (lengthOf(node.strokeWidth, 1) ?? 1) * node.scale);
      // A rect framing the drawing (FRAME_SPAN of it both ways, square or with
      // rounded corners) is the logo's own background when it is paper, as an
      // opaque frame of pixels is; the topmost one with a paint decides.
      const [x, y, w, h] = ["x", "y", "width", "height"].map((k, i) => lengthOf(a[k], vb[2 + (i % 2)]) ?? 0);
      const span = (from, size, at, length) => Math.min(from + size, at + length) - Math.max(from, at);
      const [rx, ry] = [lengthOf(a.rx, vb[2]), lengthOf(a.ry, vb[3])];
      const corner = Math.min(rx ?? ry ?? 0, w / 2) * Math.min(ry ?? rx ?? 0, h / 2);
      const framing = span(x, w, vb[0], vb[2]) >= FRAME_SPAN * vb[2] && span(y, h, vb[1], vb[3]) >= FRAME_SPAN * vb[3] && (4 - Math.PI) * corner <= (1 - FRAME_SOLID) * w * h;
      if (name === "rect" && node.scale === 1 && framing) {
        const solid = parseColour(node.fill ?? "");
        if (solid) backdrop = isPaper(T.hexToRgb(solid)) ? solid : null;
        else if (/^url\(/i.test(node.fill ?? "")) backdrop = null;
      }
    }
    if (!selfClosing) stack.push(node);
  }
  return { weights, backdrop };
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

const bump = (map, key, by = 1) => map.set(key, (map.get(key) ?? 0) + by);

/**
 * Sort decoded RGBA pixels: transparent pixels (alpha < 128) are dropped, the
 * rest are counted per exact colour. Also finds:
 * - the rim: opaque pixels next to a transparent one or the image edge, the
 *   logo's ink that meets the video background (`rim`, pooled);
 * - the logo's parts: its opaque connected areas (`parts`), each with its rim,
 *   the inks inside it (`inner`: a white glyph inside an app tile, the body
 *   inside an outline; they sit on the logo's own colour, not on the video),
 *   its bounding box, the transparent holes it encloses and the inks of the
 *   parts lying in those holes (`islands`: a glyph inside a ring);
 * - `backdrop`: the mean colour of the logo's own paper, when its biggest part
 *   is a frame (see FRAME_SPAN; square, rounded or inset alike) whose rim is
 *   mostly paper (a coloured mark touching part of the edge neither hides nor
 *   tints it), else null.
 */
export const samplePixels = (rgba, width, height) => {
  const n = width * height;
  const solid = (i) => rgba[i * 4 + 3] >= 128;
  const clear = (x, y) => x < 0 || y < 0 || x >= width || y >= height || !solid(y * width + x);
  const colourAt = (i) => (rgba[i * 4] << 16) | (rgba[i * 4 + 1] << 8) | rgba[i * 4 + 2];
  const weights = new Map();
  const rim = new Map();
  const onRim = new Uint8Array(n);
  let transparent = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (!solid(i)) {
        transparent++;
        continue;
      }
      bump(weights, colourAt(i));
      if (clear(x - 1, y) || clear(x + 1, y) || clear(x, y - 1) || clear(x, y + 1)) {
        onRim[i] = 1;
        bump(rim, colourAt(i));
      }
    }
  }

  // Parts: 8-connected, so anti-aliased diagonals hold a stroke together.
  const label = new Int32Array(n).fill(-1);
  const parts = [];
  const stack = [];
  for (let s = 0; s < n; s++) {
    if (!solid(s) || label[s] >= 0) continue;
    const part = { pixels: 0, holes: 0, outer: 0, box: [width, height, -1, -1], rim: new Map(), inner: new Map(), islands: new Map() };
    label[s] = parts.length;
    stack.push(s);
    while (stack.length) {
      const i = stack.pop();
      const [x, y] = [i % width, Math.floor(i / width)];
      part.pixels++;
      part.box = [Math.min(part.box[0], x), Math.min(part.box[1], y), Math.max(part.box[2], x), Math.max(part.box[3], y)];
      bump(onRim[i] ? part.rim : part.inner, colourAt(i));
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const [nx, ny] = [x + dx, y + dy];
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const j = ny * width + nx;
          if (label[j] < 0 && solid(j)) {
            label[j] = parts.length;
            stack.push(j);
          }
        }
      }
    }
    parts.push(part);
  }

  // Holes: transparent areas the image border cannot reach (4-connected).
  const seen = new Uint8Array(n);
  const flood = (seeds) => {
    let size = 0;
    const touches = new Set();
    for (const s of seeds) seen[s] = 1;
    stack.push(...seeds);
    while (stack.length) {
      const i = stack.pop();
      const [x, y] = [i % width, Math.floor(i / width)];
      size++;
      for (const [nx, ny] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const j = ny * width + nx;
        if (solid(j)) touches.add(label[j]);
        else if (!seen[j]) {
          seen[j] = 1;
          stack.push(j);
        }
      }
    }
    return { size, touches };
  };
  const edges = [];
  for (let x = 0; x < width; x++) edges.push(x, (height - 1) * width + x);
  for (let y = 1; y < height - 1; y++) edges.push(y * width, y * width + width - 1);
  flood(edges.filter((i) => !solid(i) && !seen[i]));
  // Outer rim: the rim along the silhouette, not along holes (how thick the shape is).
  const outside = (x, y) => x < 0 || y < 0 || x >= width || y >= height || (!solid(y * width + x) && seen[y * width + x]);
  for (let i = 0; i < n; i++) {
    const [x, y] = [i % width, Math.floor(i / width)];
    if (onRim[i] && (outside(x - 1, y) || outside(x + 1, y) || outside(x, y - 1) || outside(x, y + 1))) parts[label[i]].outer++;
  }
  for (let s = width; s < n; s++) {
    if (solid(s) || seen[s]) continue;
    // A hole's first pixel in raster order sits right below the part around it;
    // any other part it touches lies inside the hole.
    const owner = label[s - width];
    const hole = flood([s]);
    parts[owner].holes += hole.size;
    for (const j of hole.touches) if (j !== owner) for (const map of [parts[j].rim, parts[j].inner]) for (const [key, w] of map) bump(parts[owner].islands, key, w);
  }

  // The logo's own paper: its biggest part, when that is a frame with a mostly paper rim.
  let backdrop = null;
  const main = parts.reduce((a, p) => (!a || p.pixels > a.pixels ? p : a), null);
  if (main) {
    const [bw, bh] = [main.box[2] - main.box[0] + 1, main.box[3] - main.box[1] + 1];
    const shape = main.pixels + main.holes;
    if (bw >= FRAME_SPAN * width && bh >= FRAME_SPAN * height && shape >= FRAME_SOLID * bw * bh && main.holes <= KNOCKOUT * shape) {
      let [edge, paper] = [0, 0];
      const sum = [0, 0, 0];
      for (const [key, w] of main.rim) {
        edge += w;
        const rgb = unpack(key);
        if (!isPaper(rgb)) continue;
        paper += w;
        rgb.forEach((v, k) => (sum[k] += v * w));
      }
      if (2 * paper > edge) backdrop = sum.map((v) => v / paper);
    }
  }

  const { colours, white, black } = separate(weights);
  return { colours, stats: { pixels: n, transparent, white, black, backdrop, rim, parts } };
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

// --- does the logo file read on a theme? -----------------------------------------

const ratio = (k) => `${k.toFixed(1)}:1`;
const isLight = (theme) => T.luminance(theme.colors.bg) > 0.5;

/** Ink reads on a background with this WCAG contrast alone... */
const READS_CONTRAST = 2.5;
/** ...or with this colour difference alone (OKLab a/b distance); part of each adds up. */
const READS_COLOUR = 0.18;
/** A theme loses the logo when this share of its rim vanishes into the background. */
const VANISH_SHARE = 0.1;
/** An opaque light / dark backdrop shows as a box once it stands out this much. */
const BOX_SHOWS = 0.4;
/** Inks this far apart (OKLab ΔE) are clearly different colours. */
const DIFFERENT = 0.1;
/** A colour lives inside a part (is held by it) when less than this share of the part's rim is that colour. */
const HELD_EDGE = 0.2;
/** Readable ink held inside a part counts once it covers this share of the part, and at least HELD_MIN pixels. */
const HELD_SHARE = 0.03;
const HELD_MIN = 6;
/** A silhouette this many times bigger than its outer rim is a solid block (a plain mark, a tile), not lettering strokes. */
const BLOCK = 10;

/** Hex, OKLab and luminance of a colour: what the fit check compares. */
const inkOf = (hex) => ({ hex, lab: T.rgbToOklab(T.hexToRgb(hex)), y: T.luminance(hex) });
const clarity = (ink, bg) =>
  ((Math.max(ink.y, bg.y) + 0.05) / (Math.min(ink.y, bg.y) + 0.05) - 1) / (READS_CONTRAST - 1) + Math.hypot(ink.lab[1] - bg.lab[1], ink.lab[2] - bg.lab[2]) / READS_COLOUR;
const apart = (p, q) => Math.hypot(p.lab[0] - q.lab[0], p.lab[1] - q.lab[1], p.lab[2] - q.lab[2]);

/**
 * How clearly `ink` stands out on `bg`: 1 or more reads. Lightness contrast and
 * colour difference both count, so a vivid yellow mark reads on white at 1.5:1
 * while navy lettering on near-black at 1.6:1 does not.
 */
export const standsOut = (ink, bg) => clarity(inkOf(ink), inkOf(bg));

/**
 * "light" / "dark" when the logo carries its own opaque light or dark paper
 * (`backdrop`: a frame that is mostly white, cream, grey or black), else null.
 * A full-bleed colour (a purple, navy or yellow app tile) is not a background
 * but the mark: it is judged as a part like any other.
 */
const backdropTone = (stats) => {
  if (!stats.backdrop) return null;
  const y = T.luminance(T.rgbToHex(stats.backdrop));
  return y > 0.4 ? "light" : y < 0.1 ? "dark" : null;
};

/**
 * What one opaque part of the logo is to the fit check: its rim inks, the inks
 * it holds (colours that live inside it rather than on its edge: the glyph in
 * a tile, the body inside an outline, the text on a badge, a glyph inside a
 * ring) and its role, which names it in messages: "outline" (an edge around a
 * body of another colour, or a ring around a glyph), "tile" / "badge" (a
 * square / round block holding a glyph, or with the glyph cut out), "block"
 * (a plain solid mark) or "stroke" (lettering, line work).
 */
const describePart = (part, ink) => {
  const rim = [...part.rim].map(([key, w]) => ({ ...ink(key), w }));
  const rimTotal = rim.reduce((a, r) => a + r.w, 0);
  const held = new Map();
  for (const map of [part.inner, part.islands ?? new Map()]) {
    for (const [key, w] of map) {
      const x = ink(key);
      let edge = 0;
      for (const r of rim) if (apart(x, r) < DIFFERENT) edge += r.w;
      if (edge < HELD_EDGE * rimTotal) held.set(key, { ...x, w: (held.get(key)?.w ?? 0) + w });
    }
  }
  const inks = [...held.values()].sort((a, b) => b.w - a.w);
  const enough = Math.max(HELD_MIN, HELD_SHARE * part.pixels);
  const own = [...part.inner].reduce((a, [key, w]) => a + (held.has(key) ? w : 0), 0);
  const filled = part.pixels + part.holes;
  const block = filled >= BLOCK * part.outer && part.holes <= filled / 2;
  const square = part.box && filled >= FRAME_SOLID * (part.box[2] - part.box[0] + 1) * (part.box[3] - part.box[1] + 1);
  const holder = square ? "tile" : "badge";
  let role = block ? (part.holes >= KNOCKOUT * filled ? holder : "block") : "stroke";
  if (inks.reduce((a, x) => a + x.w, 0) >= enough) role = own > part.pixels / 2 || part.holes > part.pixels ? "outline" : holder;
  return { rim, rimTotal, held: inks, enough, role };
};

/** "dark lettering (#111111)", "#1D3557 tile", "dark outline (#111111)": never "lettering" for a tile or an outline. */
const partName = (hex, role) => {
  const { l, c: ch } = T.hexToOklch(hex);
  const noun = { outline: "outline", tile: "tile", badge: "badge", block: "mark" }[role] ?? (ch < GREY ? "lettering" : "parts");
  return ch < GREY ? `${l < 0.5 ? "dark" : l >= 0.94 ? "white" : "light"} ${noun} (${hex})` : `${hex} ${noun}`;
};

/**
 * Whether this logo file reads on each theme: { [theme]: { clash, note } },
 * or null when it cannot be told (an SVG read as text has no pixels). The
 * "logo" scene draws the file as is, straight on the theme background.
 * - A logo on its own opaque light / dark paper shows as a box wherever that
 *   paper stands out (`clash`).
 * - Otherwise each opaque part is judged by its rim, the ink that meets the
 *   background. A part whose rim vanishes but which holds ink of another
 *   colour that reads there (a navy app tile's white glyph on near-black, the
 *   orange body inside a black outline, black text on a yellow badge on pop)
 *   still reads: only its edge blends in (`note`). A part with nothing
 *   readable inside (wordmark strokes, a plain mark, a tile with its glyph cut
 *   out) is lost with its rim; when that is a sizeable share of the logo's
 *   rim (charcoal or navy lettering on a dark theme, white lettering on a
 *   light one, a yellow mark on pop's yellow), the theme loses the logo.
 * clash: { ink, part, message }; note: { ink, message }; either may be null.
 */
export const judgeLogo = (stats) => {
  const tone = backdropTone(stats);
  if (!tone && !stats.rim?.size) return null;
  const inks = new Map();
  const ink = (key) => inks.get(key) ?? inks.set(key, inkOf(T.rgbToHex(unpack(key)))).get(key);
  // Stats built without parts (no pixel layout): the pooled rim as one plain part.
  const parts = tone ? [] : (stats.parts ?? [{ rim: stats.rim, inner: new Map(), pixels: 0, holes: 0, outer: 0, box: null }]).map((p) => describePart(p, ink));
  const total = parts.reduce((a, p) => a + p.rimTotal, 0);
  return Object.fromEntries(
    T.THEME_NAMES.map((name) => {
      const bg = inkOf(T.THEMES[name].colors.bg);
      const light = isLight(T.THEMES[name]);
      const where = (hex) => `${light ? "light" : "dark"} background (${ratio(T.contrast(hex, bg.hex))})`;
      if (tone) {
        const box = T.rgbToHex(stats.backdrop);
        const message = `the logo's own ${tone} background (${box}) would show as a box: use a transparent PNG or SVG of the logo`;
        return [name, { clash: clarity(inkOf(box), bg) >= BOX_SHOWS ? { ink: box, part: `${tone} background (${box})`, message } : null, note: null }];
      }
      let lost = 0;
      const lostBy = new Map(); // hex -> { w, roles: Map(role -> w) }
      let spared = 0;
      let biggest = null; // the part with the most edge blending in while what it holds reads
      for (const part of parts) {
        const gone = part.rim.filter((r) => clarity(r, bg) < 1);
        const goneW = gone.reduce((a, r) => a + r.w, 0);
        if (!goneW) continue;
        let reads = 0;
        let shown = null;
        for (const x of part.held) {
          if (reads >= part.enough) break;
          if (clarity(x, bg) < 1 || gone.some((r) => apart(x, r) < DIFFERENT)) continue;
          reads += x.w;
          shown ??= x;
        }
        if (reads >= part.enough) {
          spared += goneW;
          if (!biggest || goneW > biggest.w) biggest = { w: goneW, edge: gone.reduce((a, r) => (r.w > a.w ? r : a)), role: part.role, shown };
          continue;
        }
        lost += goneW;
        for (const r of gone) {
          const entry = lostBy.get(r.hex) ?? lostBy.set(r.hex, { w: 0, roles: new Map() }).get(r.hex);
          entry.w += r.w;
          bump(entry.roles, part.role, r.w);
        }
      }
      if (lost >= VANISH_SHARE * total) {
        const [hex, { roles }] = [...lostBy].reduce((a, e) => (e[1].w > a[1].w ? e : a));
        const part = partName(hex, [...roles].reduce((a, e) => (e[1] > a[1] ? e : a))[0]);
        const message = `the logo's ${part} would vanish on a ${where(hex)}: use a ${light ? "dark-on-light" : "light-on-dark"} version of the logo`;
        return [name, { clash: { ink: hex, part, message }, note: null }];
      }
      if (biggest && spared >= VANISH_SHARE * total) {
        const message = `the edge of the logo's ${partName(biggest.edge.hex, biggest.role)} blends into the ${where(biggest.edge.hex)}; the ${biggest.shown.hex} inside it still reads`;
        return [name, { clash: null, note: { ink: biggest.edge.hex, message } }];
      }
      return [name, { clash: null, note: null }];
    }),
  );
};

/** Per theme: { ink, part, message } saying why this logo file would not read on it, or null if it does (see judgeLogo). */
export const logoClashes = (stats, fit = judgeLogo(stats)) => fit && Object.fromEntries(Object.entries(fit).map(([name, f]) => [name, f.clash]));

/**
 * Light or dark video background for this logo, and why (base null = either
 * works). `firm`: the logo file itself demands it: its own opaque backdrop, or
 * ink that vanishes on most themes of the other base (`clashes`, from
 * logoClashes). A tile or outline whose inside still reads never decides it.
 * Otherwise the accent's lightness gives a mild preference only.
 */
export const decideBase = (stats, accent, clashes = logoClashes(stats)) => {
  const firm = (base, why) => ({ base, why, firm: true });
  const tone = backdropTone(stats);
  if (tone) return firm(tone, `the logo sits on a ${tone} background`);
  const lostOn = (light) => {
    const side = T.THEME_NAMES.filter((n) => isLight(T.THEMES[n]) === light);
    const lost = side.filter((n) => clashes?.[n]);
    return lost.length * 2 > side.length ? clashes[lost[0]] : null;
  };
  const [onLight, onDark] = [lostOn(true), lostOn(false)];
  if (onLight && onDark) return { base: null, why: `its ${onLight.part} vanishes on light backgrounds and its ${onDark.part} on dark ones`, firm: false };
  if (onLight) return firm("dark", `its ${onLight.part} would vanish on light backgrounds`);
  if (onDark) return firm("light", `its ${onDark.part} would vanish on dark backgrounds`);
  const mild = (base, why) => ({ base, why, firm: false });
  if (accent) {
    const y = T.luminance(accent);
    if (y >= 0.4) return mild("dark", `its main colour ${accent} is light and glows on dark`);
    if (y <= 0.1) return mild("light", `its main colour ${accent} is deep and needs a light page`);
  }
  return mild(null, "its colours work on light and dark");
};

// --- theme recommendation ----------------------------------------------------------

/** Themes whose restraint suits a logo without a brand colour. */
const QUIET = ["mono", "clean", "studio", "studio-dark", "corporate", "editorial"];

/**
 * Rank every theme for this logo. Whether the logo file reads on a theme is a
 * constraint, not a score: themes it clashes with (`clashes`, from logoClashes)
 * go last, each with a `clash` saying why, and with a firm base the other
 * base's remaining themes come after the firm base's, however well they keep
 * the colours. Within that, most weight goes to keeping the brand colours true
 * (how far withBrand would have to move them), then to a mild base preference
 * (from the accent's lightness), then to a theme built around a similar hue;
 * a theme where only the edge of a tile or outline blends in (`notes`, from
 * judgeLogo; its `note`) ranks a little lower than one where all of it shows.
 */
export const recommendThemes = ({ accent, accent2, base, firm = false, clashes = null, notes = null }) => {
  const themes = T.THEME_NAMES.map((name) => {
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
    const fits = !base || (base === "light") === light;
    if (base) {
      score += fits ? 0.3 : -0.3;
      if (fits) reasons.push(`${base} base like the logo`);
    }
    const note = notes?.[name] ?? null;
    if (note) score -= 0.1;
    const tier = clashes?.[name] ? 2 : firm && !fits ? 1 : 0;
    const clash = clashes?.[name] ?? null;
    return { name, score, tier, reasons, clash: clash?.message ?? null, clashInk: clash?.ink ?? null, note: note?.message ?? null, accent: colors.accent, accent2: colors.accent2, onAccent: colors.onAccent, bg: colors.bg };
  });
  const order = (a, b) => a.tier - b.tier || b.score - a.score || T.THEME_NAMES.indexOf(a.name) - T.THEME_NAMES.indexOf(b.name);
  return themes.sort(order).map(({ tier: _tier, ...t }) => t);
};

/** Everything the CLI prints, from decoded pixels or SVG paint weights. */
export const analyse = ({ colours, stats }) => {
  const palette = extractPalette(colours);
  const { accent, accent2 } = pickBrandColours(palette);
  const fit = judgeLogo(stats);
  const clashes = logoClashes(stats, fit);
  const notes = fit && Object.fromEntries(Object.entries(fit).map(([name, f]) => [name, f.note]));
  const { base, why, firm } = decideBase(stats, accent, clashes);
  return { stats, palette, accent, accent2, base, baseWhy: why, baseFirm: firm, fitChecked: Boolean(fit), themes: recommendThemes({ accent, accent2, base, firm, clashes, notes }) };
};

/**
 * Colour samples of an SVG read as text (svgColors), shaped like samplePixels'
 * output. Text has no pixels, so there is no rim and there are no parts
 * (whether its lettering reads on a theme is unknown); a paper rect framing the
 * drawing still counts as the logo's own backdrop. null if it paints nothing.
 */
export const svgTextSamples = (svg) => {
  const { weights, backdrop } = svgColors(svg);
  const { colours, white, black } = separate(weights);
  const total = [...weights.values()].reduce((a, w) => a + w, 0);
  if (!total) return null;
  return { colours, stats: { pixels: total, transparent: 0, white, black, backdrop: backdrop ? T.hexToRgb(backdrop) : null, rim: null, parts: null } };
};

/**
 * A logo's colour samples from its bytes: decoded pixels, else (an SVG no
 * ffmpeg here can rasterise) its paint colours read as text. `file`: its
 * absolute path when it is a file. null if it is neither.
 */
export const samplesOf = (buf, file = null) => {
  const type = sniff(buf);
  const pixels = decodeImage(buf, type, file);
  if (pixels) return { type, source: `${pixels.width}×${pixels.height} px`, text: false, ...samplePixels(pixels.rgba, pixels.width, pixels.height) };
  const svg = type === "svg" && svgTextSamples(buf.toString("utf8"));
  return svg ? { type, source: "SVG read as text", text: true, ...svg } : null;
};

/**
 * Analyse a logo as a spec names it (a path inside public/, or a data: URL),
 * printing nothing: null if it cannot be read (remote URLs are not fetched).
 * check.mjs uses this to warn about a logo that would not read on the theme.
 */
export const analyseLogo = (src) => {
  let buf;
  let file = null;
  try {
    const data = String(src).match(/^data:[^,]*?(;base64)?,(.*)$/s);
    if (data) buf = data[1] ? Buffer.from(data[2], "base64") : Buffer.from(decodeURIComponent(data[2]));
    else if (/^[a-z][\w+.-]*:/i.test(src)) return null;
    else buf = fs.readFileSync((file = path.join(ROOT, "public", src)));
  } catch {
    return null;
  }
  const logo = samplesOf(buf, file);
  return logo && { ...analyse(logo), source: logo.source, text: logo.text };
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
  const near = abs && path.relative(process.cwd(), abs);
  const label = abs ? (near.startsWith("..") ? abs : near) : "stdin";
  const logo = samplesOf(buf, abs);
  if (logo) return { abs, label, ...logo };
  const type = sniff(buf);
  const need = type === "webp" ? " WebP needs a system ffmpeg (https://ffmpeg.org)." : type === "unknown" ? "" : " Is the file complete?";
  console.error(c.red(`Could not read ${file} (${type}).`) + ` Use a PNG, JPG, WebP, GIF or SVG.${need}`);
  process.exit(1);
};

const isMain = Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const args = parseArgs(process.argv.slice(2));
  if (!args._[0] || args.spec === true) {
    console.error("Usage: npm run brand -- <logo file> [--spec specs/your-video.json] [--json]");
    process.exit(1);
  }
  const logo = read(args._[0]);
  const result = analyse(logo);
  const rel = logo.abs ? path.relative(path.join(ROOT, "public"), logo.abs) : "..";
  const logoPath = rel && !rel.startsWith("..") && !path.isAbsolute(rel) ? rel.split(path.sep).join("/") : null;

  if (args.json) {
    const { themes, palette, stats, ...rest } = result;
    const { rim: _rim, parts: _parts, ...counts } = stats; // per-pixel detail, not data for a reader
    console.log(JSON.stringify({ logo: logoPath ?? logo.label, ...rest, stats: counts, palette: palette.map(({ hex, share, blend }) => ({ hex, share: +share.toFixed(3), blend })), themes: themes.map((t) => ({ ...t, score: +t.score.toFixed(3) })) }, null, 2));
  } else {
    const s = result.stats;
    const pct = (n) => `${Math.round((100 * n) / (s.pixels || 1))}%`;
    const ignored = logo.text ? `${pct(s.white)} near-white, ${pct(s.black)} near-black (by area)` : `${pct(s.transparent)} transparent, ${pct(s.white)} near-white, ${pct(s.black)} near-black`;
    console.log(c.bold(`\n${logo.label}`) + c.dim(` · ${logo.source} · ignored: ${ignored}`));
    if (logo.text) {
      console.log(c.yellow("  This SVG was read as text, not pixels: no ffmpeg here can rasterise it (a system ffmpeg built with librsvg can)."));
      console.log(c.dim("  Colours are weighted by shape area; whether its lettering reads on each theme was not checked."));
    }
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
    console.log(c.bold("\nBase  ") + (result.base ?? "light or dark") + c.dim(` — ${result.baseWhy}${result.baseFirm ? `, so ${result.base} themes come first` : ""}.`));
    console.log(c.bold("\nBest themes"));
    result.themes.slice(0, 3).forEach((t, i) => {
      console.log(`  ${i + 1}. ${c.bold(t.name.padEnd(11))} ${t.reasons.join("; ")}.`);
      if (t.clash) console.log(c.yellow(`     ⚠ ${t.clash}.`));
      else if (t.note) console.log(c.dim(`     ℹ ${t.note}.`));
      const colours = ` Accent ${t.accent} (${ratio(T.contrast(t.accent, t.bg))} on its background) · button text ${t.onAccent} · accent2 ${t.accent2}.`;
      console.log(c.dim(`     ${T.THEMES[t.name].description}`) + (result.accent ? c.dim(colours) : ""));
    });
    const rest = result.themes.slice(3);
    const then = rest.filter((t) => !t.clash).map((t) => t.name);
    const clashing = rest.filter((t) => t.clash);
    if (then.length) console.log(c.dim(`  Then: ${then.join(", ")}.`));
    if (clashing.length) console.log(c.yellow("  Not with this logo file:"));
    for (const ink of new Set(clashing.map((t) => t.clashInk))) {
      const group = clashing.filter((t) => t.clashInk === ink);
      console.log(c.yellow(`    ${group.map((t) => t.name).join(", ")}`) + c.dim(` — ${group[0].clash}.`));
    }
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
    if (!result.accent && spec.brand?.accent) {
      const kept = ["accent", "accent2"].filter((k) => spec.brand[k]).map((k) => `brand.${k} ${spec.brand[k]}`);
      say(c.yellow(`  Kept ${kept.join(" and ")} from before: this logo has no brand colour. Delete ${kept.length > 1 ? "them" : "it"} to use the theme's own accent.`));
    }
    if (!logoPath) {
      const old = spec.brand?.logo ? ` (it still points to "${spec.brand.logo}")` : "";
      say(c.yellow(`  brand.logo not updated${old}: the logo must live in motion-kit/public/ (e.g. public/brand/${logo.abs ? path.basename(logo.abs) : "logo.png"}). Move it there and run again.`));
    }
    const name = spec.theme ?? "midnight";
    if (T.THEMES[name]) {
      for (const ch of T.resolveBrand(T.THEMES[name], brand).changes) say(c.dim(`  ℹ With theme ${name}: `) + ch.message);
      const rank = result.themes.findIndex((t) => t.name === name);
      const top = result.themes.filter((t) => !t.clash).slice(0, 3).map((t) => `"${t.name}"`).join(" / ");
      const { clash, note } = result.themes[rank];
      if (clash) say(c.yellow(`  ⚠ Theme ${name}: ${clash}${top ? `, or switch to theme ${top}` : ""}.`));
      else if (note) say(c.dim(`  ℹ Theme ${name}: ${note}.`));
      if (!clash && rank > 2) say(c.dim(`  Theme ${name} ranks ${rank + 1}/10 for this logo; consider ${top}.`));
    }
  } else if (!args.json) {
    console.log(c.dim(`\nWrite these into a spec: npm run brand -- ${logo.abs ? logo.label : "<logo>"} --spec specs/<name>.json`));
  }
}
