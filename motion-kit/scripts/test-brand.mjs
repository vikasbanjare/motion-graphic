// npm test  (or: node --test scripts/test-brand.mjs)
// Brand colours: colour maths, withBrand/resolveBrand guarantees, k-means and
// palette picking, theme recommendation, spec writing, brand.logo in "logo"
// scenes and the CLI's error paths.
// Every image here is a synthetic pixel array or SVG text held in memory; no
// image file is read or written (the CLI test writes one temp spec, then removes it).
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const T = await import("../src/engine/themes.ts");
const B = await import("./brand.mjs");
const KIT = fileURLToPath(new URL("..", import.meta.url));

/** Deterministic pseudo-random numbers (mulberry32). */
const rng = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const close = (a, b, eps, msg) => assert.ok(Math.abs(a - b) <= eps, `${msg ?? ""} ${a} vs ${b} (±${eps})`);

/** RGBA canvas filled with `bg`, plus a box painter. */
const canvas = (w, h, bg = [0, 0, 0, 0]) => {
  const px = new Uint8Array(w * h * 4);
  for (let i = 0; i < w * h; i++) px.set(bg, i * 4);
  const box = (x, y, bw, bh, rgba) => {
    for (let yy = y; yy < y + bh; yy++) for (let xx = x; xx < x + bw; xx++) px.set(rgba, (yy * w + xx) * 4);
  };
  return { px, box, w, h };
};
const rgba = (hex, a = 255) => [...T.hexToRgb(hex), a];

// --- colour maths ----------------------------------------------------------------

test("hex <-> rgb round-trips, clamps and rounds", () => {
  for (const hex of ["#000000", "#FFFFFF", "#FF9933", "#0A5CFF", "#7F7F7F"]) assert.equal(T.rgbToHex(T.hexToRgb(hex)), hex);
  assert.deepEqual(T.hexToRgb("#e4002b"), [228, 0, 43]);
  assert.equal(T.rgbToHex([300, -5, 127.6]), "#FF0080");
});

test("OKLab / OKLCH match reference values", () => {
  const white = T.rgbToOklab([255, 255, 255]);
  close(white[0], 1, 1e-4, "white L");
  close(Math.hypot(white[1], white[2]), 0, 1e-4, "white chroma");
  assert.deepEqual(T.rgbToOklab([0, 0, 0]).map((v) => Math.abs(Math.round(v * 1e6))), [0, 0, 0]);
  // Björn Ottosson's reference for sRGB red.
  const red = T.hexToOklch("#FF0000");
  close(red.l, 0.62796, 1e-3, "red L");
  close(red.c, 0.25768, 1e-3, "red C");
  close(red.h, 29.23, 0.1, "red h");
});

test("OKLCH -> hex round-trips every colour to within one step", () => {
  const r = rng(7);
  for (let i = 0; i < 2000; i++) {
    const rgb = [r() * 255, r() * 255, r() * 255].map(Math.round);
    const back = T.hexToRgb(T.oklchToHex(T.hexToOklch(T.rgbToHex(rgb))));
    back.forEach((v, k) => close(v, rgb[k], 1, `channel ${k} of ${rgb}`));
  }
});

test("out-of-gamut OKLCH keeps lightness and hue, loses chroma", () => {
  for (const h of [0, 60, 140, 220, 300]) {
    const hex = T.oklchToHex({ l: 0.7, c: 0.5, h });
    const got = T.hexToOklch(hex);
    close(got.l, 0.7, 0.01, `L at h${h}`);
    close(T.hueDelta(got.h, h), 0, 3, `hue at h${h}`);
    assert.ok(got.c < 0.5);
  }
  assert.equal(T.oklchToHex({ l: 1.4, c: 0.2, h: 10 }), "#FFFFFF");
  assert.equal(T.oklchToHex({ l: -1, c: 0.2, h: 10 }), "#000000");
});

test("maxChroma finds the sRGB gamut edge; vividness is chroma as a share of it", () => {
  // sRGB red is a gamut corner: all of its chroma is the most its L and hue allow.
  const red = T.hexToOklch("#FF0000");
  close(T.maxChroma(red.l, red.h), red.c, 1e-3, "red sits on the edge");
  close(T.vividness(red), 1, 0.01, "red is fully vivid");
  for (const [l, h] of [[0.3, 20], [0.6, 140], [0.9, 260], [0.95, 100]]) {
    const edge = T.maxChroma(l, h);
    const lab = (c) => [l, c * Math.cos((h * Math.PI) / 180), c * Math.sin((h * Math.PI) / 180)];
    assert.ok(T.oklabToRgb(lab(edge * 0.99)).every((v) => v >= -0.5 && v <= 255.5), `inside at L${l} h${h}`);
    assert.ok(T.oklabToRgb(lab(edge * 1.05 + 0.002)).some((v) => v < -0.5 || v > 255.5), `outside at L${l} h${h}`);
  }
  // Pale yellow has far more room than pale blue: why raw chroma can't compare hues.
  assert.ok(T.maxChroma(0.9, 100) > 3 * T.maxChroma(0.9, 265));
  close(T.vividness(T.hexToOklch("#808080")), 0, 1e-3, "grey");
  assert.equal(T.vividness({ l: 1, c: 0, h: 0 }), 0);
});

test("WCAG contrast and hue helpers", () => {
  close(T.contrast("#FFFFFF", "#000000"), 21, 1e-9);
  assert.equal(T.contrast("#FF9933", "#0A0E1A"), T.contrast("#0A0E1A", "#FF9933"));
  close(T.luminance("#808080"), 0.2158, 1e-3);
  assert.equal(T.hueDelta(350, 10), 20);
  assert.equal(T.hueDelta(10, 350), -20);
  assert.equal(T.deltaE("#123456", "#123456"), 0);
});

test("nearestPassing keeps a passing colour, else moves lightness the least", () => {
  assert.equal(T.nearestPassing("#FF9933", () => true), "#FF9933");
  const fit = T.nearestPassing("#FFE14D", (x) => T.contrast(x, "#FFFFFF") >= 3);
  assert.ok(T.contrast(fit, "#FFFFFF") >= 3);
  // One step lighter must fail, or it was not the nearest.
  const { l, c, h } = T.hexToOklch(fit);
  assert.ok(T.contrast(T.oklchToHex({ l: l + 0.004, c, h }), "#FFFFFF") < 3);
  close(T.hueDelta(T.hexToOklch(fit).h, T.hexToOklch("#FFE14D").h), 0, 5, "hue kept");
  assert.equal(T.nearestPassing("#FFE14D", () => false), null);
});

// --- resolveBrand / withBrand -------------------------------------------------------

/** A spread of brand colours: every hue at several lightness/chroma levels, plus greys. */
const BRAND_GRID = (() => {
  const out = ["#000000", "#FFFFFF", "#7F7F7F", "#333333", "#EEEEEE"];
  for (let h = 0; h < 360; h += 30) for (const l of [0.25, 0.45, 0.65, 0.85]) for (const c of [0.05, 0.15, 0.3]) out.push(T.oklchToHex({ l, c, h }));
  return [...new Set(out)];
})();

const assertReads = (theme, r, label) => {
  const k = r.theme.colors;
  const t = theme.colors;
  assert.deepEqual(r.errors, [], label);
  for (const f of ["text", "bg", "surface", "line", "muted", "onMark"]) assert.equal(k[f], t[f], `${label}: ${f} must not change`);
  assert.ok(T.contrast(k.accent, k.bg) >= 3, `${label}: accent ${k.accent} on bg ${T.contrast(k.accent, k.bg)}`);
  // Kicker pills and the Compare hero card draw the accent as text on surface.
  assert.ok(T.contrast(k.accent, k.surface) >= 3, `${label}: accent ${k.accent} on surface ${T.contrast(k.accent, k.surface)}`);
  assert.ok(T.contrast(k.accent, k.onAccent) >= 4.5, `${label}: onAccent ${k.onAccent} on ${k.accent}`);
  const darkInk = T.luminance(t.text) < T.luminance(t.bg) ? t.text : t.bg;
  assert.ok([t.onAccent, "#FFFFFF", darkInk].includes(k.onAccent), `${label}: onAccent ${k.onAccent} is theme ink or white`);
  assert.ok(T.contrast(k.accent2, k.bg) >= 3, `${label}: accent2 ${k.accent2} on bg`);
  assert.ok(T.contrast(k.accent2, k.onAccent) >= 3, `${label}: glyph on accent2 ${k.accent2}`);
  assert.ok(T.contrast(k.mark, k.onMark) >= 4.5, `${label}: mark ${k.mark} / onMark ${k.onMark}`);
  for (const o of r.theme.orb) assert.ok(T.isHex(o), `${label}: orb ${o}`);
};

test("without brand colours the theme is returned untouched", () => {
  for (const name of T.THEME_NAMES) {
    assert.equal(T.withBrand(T.THEMES[name], undefined), T.THEMES[name]);
    assert.equal(T.withBrand(T.THEMES[name], { handle: "@x" }), T.THEMES[name]);
  }
});

test("a theme's own accent as the brand changes nothing", () => {
  for (const name of T.THEME_NAMES) {
    const theme = T.THEMES[name];
    for (const brand of [{ accent: theme.colors.accent }, { accent: theme.colors.accent, accent2: theme.colors.accent2 }]) {
      const r = T.resolveBrand(theme, brand);
      assert.deepEqual(r.changes, [], name);
      assert.deepEqual(r.theme.colors, theme.colors, name);
      assert.deepEqual(r.theme.orb, theme.orb, name);
    }
  }
});

test("the themes themselves follow the colour rules brand colours are held to", () => {
  for (const name of T.THEME_NAMES) {
    const k = T.THEMES[name].colors;
    assert.ok(T.contrast(k.text, k.bg) >= 7, `${name} text`);
    assert.ok(T.contrast(k.muted, k.bg) >= 4.5, `${name} muted`);
    assert.ok(T.contrast(k.accent, k.bg) >= 3, `${name} accent`);
    assert.ok(T.contrast(k.accent, k.surface) >= 3, `${name} accent on surface`);
    assert.ok(T.contrast(k.accent, k.onAccent) >= 4.5, `${name} onAccent`);
    assert.ok(T.contrast(k.accent2, k.bg) >= 3, `${name} accent2`);
    assert.ok(T.contrast(k.accent2, k.onAccent) >= 3, `${name} glyph on accent2`);
    assert.ok(T.contrast(k.mark, k.onMark) >= 4.5, `${name} mark`);
  }
});

test("every brand accent on every theme ends up readable, text/bg untouched", () => {
  for (const name of T.THEME_NAMES) {
    const theme = T.THEMES[name];
    for (const accent of BRAND_GRID) {
      const r = T.resolveBrand(theme, { accent: accent.toLowerCase() });
      assertReads(theme, r, `${name} + ${accent}`);
      // A colour that already reads is kept to the hex.
      const passes = T.contrast(accent, theme.colors.bg) >= 3 && T.contrast(accent, theme.colors.surface) >= 3 && [theme.colors.onAccent, "#FFFFFF", theme.colors.text, theme.colors.bg].some((x) => T.contrast(accent, x) >= 4.5);
      if (passes && T.contrast(accent, theme.colors.onAccent) >= 4.5) assert.equal(r.theme.colors.accent, accent, `${name} keeps ${accent}`);
    }
  }
});

test("brand accent + accent2 pairs also read on every theme", () => {
  const r0 = rng(3);
  for (const name of T.THEME_NAMES) {
    for (let i = 0; i < 40; i++) {
      const accent = BRAND_GRID[Math.floor(r0() * BRAND_GRID.length)];
      const accent2 = BRAND_GRID[Math.floor(r0() * BRAND_GRID.length)];
      assertReads(T.THEMES[name], T.resolveBrand(T.THEMES[name], { accent, accent2 }), `${name} + ${accent}/${accent2}`);
      assertReads(T.THEMES[name], T.resolveBrand(T.THEMES[name], { accent2 }), `${name} + accent2 ${accent2}`);
    }
  }
});

test("random brand colours (fuzz) read on every theme, alone and in pairs", () => {
  const r0 = rng(29);
  const hex = () => T.rgbToHex([r0() * 255, r0() * 255, r0() * 255]);
  for (const name of T.THEME_NAMES) {
    const theme = T.THEMES[name];
    for (let i = 0; i < 150; i++) {
      const [accent, accent2] = [hex(), hex()];
      assertReads(theme, T.resolveBrand(theme, { accent }), `${name} + ${accent}`);
      assertReads(theme, T.resolveBrand(theme, { accent, accent2 }), `${name} + ${accent}/${accent2}`);
    }
  }
});

test("a deep brand accent lifted on a dark theme also reads on its cards", () => {
  // Navy on dark themes: 3:1 on bg alone left it ~2.6:1 in kicker pills (surface).
  for (const name of ["midnight", "desi", "studio-dark", "neon", "mono"]) {
    const theme = T.THEMES[name];
    const r = T.resolveBrand(theme, { accent: "#0D23A9" });
    const fixed = r.theme.colors.accent;
    assertReads(theme, r, `${name} + #0D23A9`);
    close(T.hueDelta(T.hexToOklch(fixed).h, T.hexToOklch("#0D23A9").h), 0, 6, `${name} navy hue kept`);
    // Nearest: one step back towards the brand's own lightness fails on surface.
    const { l, c, h } = T.hexToOklch(fixed);
    assert.ok(T.contrast(T.oklchToHex({ l: l - 0.004, c, h }), theme.colors.surface) < 3, `${name}: ${fixed} is the nearest`);
    assert.match(r.changes[0].message, new RegExp(`lightened to ${fixed} .* on the ${name} background and cards, needs 3:1`));
  }
  // corporate's surface is darker than its white page, so it binds for pale brands.
  const corp = T.resolveBrand(T.THEMES.corporate, { accent: "#AA9B94" }).theme.colors;
  assert.ok(T.contrast(corp.accent, T.THEMES.corporate.colors.surface) >= 3, `corporate ${corp.accent} on surface`);
});

test("adjustments keep the brand hue and are reported", () => {
  const clean = T.resolveBrand(T.THEMES.clean, { accent: "#FFE14D" });
  const fixed = clean.theme.colors.accent;
  assert.notEqual(fixed, "#FFE14D");
  close(T.hueDelta(T.hexToOklch(fixed).h, T.hexToOklch("#FFE14D").h), 0, 5, "yellow hue kept");
  const ch = clean.changes.find((x) => x.field === "accent");
  assert.equal(ch.kind, "adjusted");
  assert.equal(ch.from, "#FFE14D");
  assert.equal(ch.to, fixed);
  assert.match(ch.message, /darkened to #[0-9A-F]{6} for contrast/);

  const night = T.resolveBrand(T.THEMES.midnight, { accent: "#1D3557" });
  assert.match(night.changes[0].message, /#1D3557 lightened to/);

  for (const name of T.THEME_NAMES) {
    for (const accent of BRAND_GRID) {
      const before = T.hexToOklch(accent);
      const after = T.hexToOklch(T.resolveBrand(T.THEMES[name], { accent }).theme.colors.accent);
      if (before.c >= 0.08 && after.c >= 0.05) close(T.hueDelta(before.h, after.h), 0, 6, `${name} ${accent} hue`);
    }
  }
});

test("derived accent2 follows the theme's own colour harmony", () => {
  assert.equal(T.harmonyOf(T.THEMES.neon).rule, "complementary");
  assert.equal(T.harmonyOf(T.THEMES.studio).rule, "complementary");
  assert.equal(T.harmonyOf(T.THEMES.desi).rule, "analogous");
  assert.equal(T.harmonyOf(T.THEMES.corporate).rule, "analogous");
  assert.equal(T.harmonyOf(T.THEMES.midnight).rule, "square");
  assert.equal(T.harmonyOf(T.THEMES.mono).rule, "neutral");
  for (const name of T.THEME_NAMES) {
    const { rule, step } = T.harmonyOf(T.THEMES[name]);
    for (const accent of ["#E4002B", "#0A5CFF", "#00A86B", "#8B2BE2"]) {
      const r = T.resolveBrand(T.THEMES[name], { accent });
      const a2 = T.hexToOklch(r.theme.colors.accent2);
      if (rule === "neutral") assert.ok(a2.c < 0.03, `${name}: accent2 stays grey`);
      else if (a2.c >= 0.05) close(T.hueDelta(T.hexToOklch(accent).h + step, a2.h), 0, 12, `${name} ${accent} accent2 hue`);
      if (r.theme.colors.accent2 !== T.THEMES[name].colors.accent2) assert.ok(r.changes.some((x) => x.field === "accent2" && x.kind === "derived"), `${name}: derived accent2 reported`);
    }
  }
});

test("highlighter and orb are re-tinted from the brand at the theme's lightness", () => {
  const theme = T.THEMES.studio;
  const r = T.resolveBrand(theme, { accent: "#E4002B" });
  const red = T.hexToOklch("#E4002B").h;
  r.theme.orb.forEach((o, i) => {
    close(T.hueDelta(T.hexToOklch(o).h, red), 0, 25, `orb ${i} hue`);
    close(T.hexToOklch(o).l, T.hexToOklch(theme.orb[i]).l, 0.02, `orb ${i} lightness`);
  });
  close(T.hueDelta(T.hexToOklch(r.theme.colors.mark).h, red), 0, 25, "mark hue");
  // Pale tints of warm brands stay pale but clearly the brand's hue: richer
  // than the theme's pale blue (no beige), short of the gamut edge (no neon).
  const paleBlue = T.hexToOklch(T.THEMES.clean.colors.mark);
  for (const brand of ["#FFE14D", "#00A86B", "#C6FF3D"]) {
    const mark = T.hexToOklch(T.resolveBrand(T.THEMES.clean, { accent: brand }).theme.colors.mark);
    close(T.hueDelta(mark.h, T.hexToOklch(brand).h), 0, 25, `${brand} mark hue`);
    assert.ok(mark.c > paleBlue.c * 1.3, `${brand} mark chroma ${mark.c} not beige`);
    assert.ok(T.vividness(mark) < 0.8, `${brand} mark vividness ${T.vividness(mark)} not neon`);
  }
  // A muted brand gets muted tints; re-aiming at the same colour changes nothing.
  const slate = T.resolveBrand(T.THEMES.studio, { accent: "#5B6770" }).theme;
  for (const o of [...slate.orb, slate.colors.mark]) assert.ok(T.vividness(T.hexToOklch(o)) < 0.3, `slate tint ${o}`);
  assert.equal(T.reaim("#DCE5FF", "#2F5BEA", "#2f5bea"), "#DCE5FF");
  // Neutral parts of a theme stay neutral.
  const mono = T.resolveBrand(T.THEMES.mono, { accent: "#0A5CFF" });
  assert.equal(mono.theme.orb[0], "#0A5CFF");
  assert.equal(mono.theme.orb[1], T.THEMES.mono.orb[1]);
  assert.equal(mono.theme.colors.mark, T.THEMES.mono.colors.mark);
});

// --- k-means ---------------------------------------------------------------------

const blob = (hex, n, spread, r) => {
  const [R, G, Bl] = T.hexToRgb(hex);
  return Array.from({ length: n }, () => {
    const rgb = [R, G, Bl].map((v) => Math.max(0, Math.min(255, Math.round(v + (r() - 0.5) * 2 * spread))));
    return { lab: T.rgbToOklab(rgb), w: 1 };
  });
};

test("k-means recovers well-separated clusters with their weights", () => {
  const r = rng(11);
  const points = [...blob("#E4002B", 600, 4, r), ...blob("#1D3557", 300, 4, r), ...blob("#FFC300", 100, 4, r)];
  const clusters = B.kmeans(points, 3).sort((a, b) => b.weight - a.weight);
  assert.deepEqual(clusters.map((c) => c.weight), [600, 300, 100]);
  ["#E4002B", "#1D3557", "#FFC300"].forEach((hex, i) => {
    const got = T.rgbToHex(T.oklabToRgb(clusters[i].centre));
    assert.ok(T.deltaE(got, hex) < 0.02, `${got} ≈ ${hex}`);
  });
});

test("k-means is deterministic and order-independent", () => {
  const r = rng(5);
  const points = [...blob("#E4002B", 200, 30, r), ...blob("#00A86B", 200, 30, r), ...blob("#7F7F7F", 120, 30, r)];
  const run = (pts) => B.kmeans(pts, 5).map((c) => `${T.rgbToHex(T.oklabToRgb(c.centre))}:${c.weight}`).sort();
  assert.deepEqual(run(points), run(points));
  const shuffled = [...points].sort(() => 0).reverse();
  assert.deepEqual(run(shuffled), run(points));
});

test("k-means handles weights, tiny inputs and k above the number of colours", () => {
  assert.deepEqual(B.kmeans([], 5), []);
  const a = T.rgbToOklab([255, 0, 0]);
  const b = T.rgbToOklab([0, 0, 255]);
  const [one] = B.kmeans([{ lab: a, w: 9 }, { lab: b, w: 1 }], 1);
  one.centre.forEach((v, i) => close(v, 0.9 * a[i] + 0.1 * b[i], 1e-9, `weighted mean ${i}`));
  const three = B.kmeans([{ lab: a, w: 5 }, { lab: b, w: 2 }, { lab: a, w: 1 }], 5);
  assert.equal(three.length, 2);
  assert.deepEqual(three.map((c) => c.weight).sort(), [2, 6]);
});

// --- pixels -> palette -------------------------------------------------------------

test("samplePixels drops transparency and counts near-white / near-black separately", () => {
  const { px, box, w, h } = canvas(40, 20);
  box(2, 2, 10, 10, rgba("#E4002B"));
  box(15, 2, 10, 5, rgba("#111111"));
  box(30, 2, 5, 5, rgba("#FCFCFC"));
  box(30, 10, 5, 5, rgba("#E4002B", 100)); // mostly transparent: ignored
  const { colours, stats } = B.samplePixels(px, w, h);
  assert.equal(stats.pixels, 800);
  assert.equal(stats.transparent, 800 - 100 - 50 - 25);
  assert.equal(stats.black, 50);
  assert.equal(stats.white, 25);
  assert.deepEqual([...colours], [[0xe4002b, 100]]);
  assert.equal(stats.borderOpaque, 0);
  assert.equal(stats.paperRgb, null);
});

test("samplePixels: the rim is the ink that meets the backdrop, not what the logo encloses", () => {
  // A red app icon with a white glyph inside, on transparency.
  const { px, box, w, h } = canvas(20, 20);
  box(2, 2, 16, 16, rgba("#E4002B"));
  box(7, 7, 6, 6, rgba("#FFFFFF"));
  const { stats } = B.samplePixels(px, w, h);
  assert.deepEqual([...stats.rim], [[0xe4002b, 4 * 16 - 4]], "only the red outline touches transparency");
  // The image edge counts as backdrop too (a tightly cropped logo), and the border is measured:
  // opaque all round, but navy is a colour, not paper.
  const full = canvas(10, 4, rgba("#1D3557"));
  const edge = B.samplePixels(full.px, full.w, full.h).stats;
  assert.equal(edge.rim.get(0x1d3557), 2 * 10 + 2 * 2);
  assert.equal(edge.borderOpaque, edge.border);
  assert.equal(edge.paper, 0);
  assert.equal(edge.paperRgb, null);
  // Cream paper is: its mean colour is measured.
  const cream = canvas(10, 4, rgba("#FDF6E3"));
  const sheet = B.samplePixels(cream.px, cream.w, cream.h).stats;
  assert.equal(sheet.paper, sheet.border);
  assert.deepEqual(sheet.paperRgb, T.hexToRgb("#FDF6E3"));
});

/** A two-colour logo on transparency with anti-aliased (blended) edges and dark lettering. */
const syntheticLogo = () => {
  const { px, box, w, h } = canvas(96, 48);
  box(4, 4, 40, 40, rgba("#E4002B"));
  box(50, 8, 40, 20, rgba("#1D3557"));
  box(50, 32, 40, 8, rgba("#111111"));
  // Anti-aliasing: a one-pixel ring of red blended half-way to white.
  for (let i = 3; i < 45; i++) for (const [x, y] of [[i, 3], [i, 44], [3, i], [44, i]]) px.set([242, 128, 149, 255], (y * w + x) * 4);
  return B.samplePixels(px, w, h);
};

test("palette: exact flat colours, accent = most saturated, accent2 = next", () => {
  const { colours, stats } = syntheticLogo();
  const palette = B.extractPalette(colours);
  assert.equal(palette[0].hex, "#E4002B");
  assert.ok(palette.some((p) => p.hex === "#1D3557" && !p.blend));
  assert.ok(palette.some((p) => p.hex === "#F28095" && p.blend), "the anti-aliased ring is a blend");
  close(palette.reduce((a, p) => a + p.share, 0), 1, 1e-9, "shares sum to 1");
  assert.deepEqual(B.pickBrandColours(palette), { accent: "#E4002B", accent2: "#1D3557" });
  const result = B.analyse({ colours, stats });
  // Its navy and near-black parts touch the backdrop and would vanish on dark themes.
  assert.equal(result.base, "light");
  assert.ok(result.baseFirm);
  assert.match(result.baseWhy, /would vanish on dark backgrounds/);
});

test("blends of two colours (or a colour and white / black) are spotted", () => {
  const mix = (a, b, t) => T.rgbToHex(T.hexToRgb(a).map((v, k) => v + t * (T.hexToRgb(b)[k] - v)));
  const anchors = ["#E4002B", "#1D3557", "#FFFFFF", "#000000"];
  assert.ok(B.isBlend(mix("#E4002B", "#FFFFFF", 0.5), anchors), "red -> white edge");
  assert.ok(B.isBlend(mix("#E4002B", "#000000", 0.4), anchors), "red -> transparent-black edge");
  assert.ok(B.isBlend(mix("#E4002B", "#1D3557", 0.3), anchors), "red -> navy edge");
  assert.ok(!B.isBlend("#00A86B", anchors), "green is its own colour");
  assert.ok(!B.isBlend("#E4002B", anchors), "an anchor is not a blend");
});

test("palette: a small vivid mark beats a big dull area for the accent", () => {
  const { px, box, w, h } = canvas(100, 50);
  box(0, 0, 80, 50, rgba("#5B6770")); // slate, 80%
  box(80, 0, 20, 50, rgba("#FF5A00")); // orange, 20%
  const { colours } = B.samplePixels(px, w, h);
  assert.deepEqual(B.pickBrandColours(B.extractPalette(colours)), { accent: "#FF5A00", accent2: null });
});

test("palette: a monochrome logo has no brand accent and gets quiet themes", () => {
  const { px, box, w, h } = canvas(60, 30);
  box(5, 5, 50, 20, rgba("#000000"));
  const result = B.analyse(B.samplePixels(px, w, h));
  assert.equal(result.accent, null);
  assert.equal(result.palette.length, 0);
  assert.equal(result.base, "light");
  for (const t of result.themes.slice(0, 3)) assert.ok(["mono", "clean", "studio", "studio-dark", "corporate", "editorial"].includes(t.name), t.name);
});

/** In-memory logo: `draw` paints boxes on a transparent (or `bg`) 96×48 canvas; returns samplePixels' output. */
const logoPixels = (draw, bg) => {
  const cv = canvas(96, 48, bg);
  draw(cv.box);
  return B.samplePixels(cv.px, cv.w, cv.h);
};

test("standsOut: lightness contrast and colour difference both make ink read", () => {
  const bgOf = (n) => T.THEMES[n].colors.bg;
  // A vivid yellow mark reads on white at ~1.5:1; navy or charcoal lettering on near-black does not at ~1.6:1.
  for (const n of ["clean", "studio", "corporate", "editorial"]) assert.ok(B.standsOut("#FFC20E", bgOf(n)) >= 1, n);
  for (const n of ["midnight", "neon", "desi", "mono", "studio-dark"]) {
    for (const ink of ["#111111", "#222222", "#2B2B2B", "#333333", "#1D3557"]) assert.ok(B.standsOut(ink, bgOf(n)) < 1, `${ink} on ${n}`);
    assert.ok(B.standsOut("#FFFFFF", bgOf(n)) >= 1 && B.standsOut("#E4002B", bgOf(n)) >= 1, n);
  }
  assert.ok(B.standsOut("#FFC20E", bgOf("pop")) < 1, "yellow on pop's yellow");
  assert.ok(B.standsOut("#FFFFFF", bgOf("clean")) < 1, "white on off-white");
  assert.ok(B.standsOut("#0D23A9", bgOf("midnight")) >= 1, "a vivid deep blue still reads on dark");
});

test("base: opaque backgrounds, ink that meets the backdrop and accent lightness decide light vs dark", () => {
  const white = logoPixels((box) => box(20, 10, 56, 28, rgba("#C6FF3D")), rgba("#FFFFFF")).stats;
  const black = logoPixels((box) => box(20, 10, 56, 28, rgba("#C6FF3D")), rgba("#050505")).stats;
  const whiteInk = logoPixels((box) => box(10, 10, 76, 20, rgba("#FFFFFF"))).stats;
  const darkInk = logoPixels((box) => box(10, 10, 76, 20, rgba("#2B2B2B"))).stats;
  const red = logoPixels((box) => box(10, 10, 76, 20, rgba("#E4002B"))).stats;
  assert.deepEqual(B.decideBase(white, null), { base: "light", why: "the logo sits on a light background", firm: true });
  assert.equal(B.decideBase(black, null).base, "dark");
  assert.deepEqual(B.decideBase(whiteInk, null), { base: "dark", why: "its white lettering (#FFFFFF) would vanish on light backgrounds", firm: true });
  assert.deepEqual(B.decideBase(darkInk, null), { base: "light", why: "its dark lettering (#2B2B2B) would vanish on dark backgrounds", firm: true });
  // Ink that reads everywhere leaves a mild hint from the accent's lightness only.
  assert.deepEqual(B.decideBase(red, "#C6FF3D"), { base: "dark", why: "its main colour #C6FF3D is light and glows on dark", firm: false });
  assert.equal(B.decideBase(red, "#1D3557").base, "light");
  assert.equal(B.decideBase(red, "#E4002B").base, null);
  assert.ok(Object.values(B.logoClashes(red)).every((x) => x === null));
  // What goes wrong, theme by theme.
  const box = B.logoClashes(white);
  for (const n of ["midnight", "neon", "desi", "mono", "studio-dark", "pop"]) assert.match(box[n].message, /own light background \(#FFFFFF\) would show as a box: use a transparent PNG or SVG/, n);
  for (const n of ["clean", "studio", "corporate", "editorial"]) assert.equal(box[n], null, `a white box blends into ${n}`);
  assert.equal(B.logoClashes(darkInk).midnight.message, "the logo's dark lettering (#2B2B2B) would vanish on a dark background (1.4:1): use a light-on-dark version of the logo");
  // Unknown (an SVG read as text has no rim): no clash, no firm base.
  assert.equal(B.logoClashes({ ...red, rim: null }), null);
  assert.equal(B.decideBase({ ...red, rim: null }, null).firm, false);
});

test("theme recommendation: keeps the brand colour true and matches the base", () => {
  const lime = B.recommendThemes({ accent: "#C6FF3D", accent2: null, base: "dark" });
  assert.equal(lime[0].name, "neon");
  assert.equal(lime[0].accent, "#C6FF3D");
  assert.match(lime[0].reasons.join(" "), /keeps #C6FF3D exactly/);
  assert.equal(lime.length, 10);

  const red = B.recommendThemes({ accent: "#E4002B", accent2: "#1D3557", base: "light" });
  assert.ok(T.luminance(T.THEMES[red[0].name].colors.bg) > 0.5, `${red[0].name} is light`);
  assert.equal(red[0].accent, "#E4002B");
  // Pale yellow cannot stay itself on a light theme: dark themes win.
  const pale = B.recommendThemes({ accent: "#FFE14D", accent2: null, base: null });
  assert.ok(T.luminance(T.THEMES[pale[0].name].colors.bg) < 0.5, pale[0].name);
  // A mild base (from the accent alone) only nudges: nothing is ruled out.
  assert.ok(B.recommendThemes({ accent: "#1D3557", accent2: null, base: "light" }).every((t) => t.clash === null));
});

const isLightTheme = (name) => T.luminance(T.THEMES[name].colors.bg) > 0.5;
/** Transparent logo: a coloured mark plus a wordmark in `ink`. */
const markAndWordmark = (mark, ink) => {
  const { px, box, w, h } = canvas(96, 48);
  box(4, 4, 30, 30, rgba(mark));
  box(40, 12, 50, 16, rgba(ink));
  return B.analyse(B.samplePixels(px, w, h));
};

test("theme recommendation: whether the logo file reads outranks colour fidelity", () => {
  // Black wordmark + yellow mark: yellow stays truest on dark themes, but the
  // wordmark would vanish there (#111111 on midnight is ~1.05:1).
  const ink = markAndWordmark("#FFC20E", "#111111");
  assert.equal(ink.accent, "#FFC20E");
  assert.equal(ink.base, "light");
  assert.ok(ink.baseFirm && ink.fitChecked);
  const names = ink.themes.map((t) => t.name).join();
  assert.deepEqual(ink.themes.slice(0, 4).map((t) => isLightTheme(t.name) && t.clash === null), [true, true, true, true], names);
  for (const t of ink.themes.slice(4)) {
    if (t.name === "pop") assert.match(t.clash, /the logo's #FFC20E parts would vanish on a light background \(1\.2:1\)/, "yellow mark on pop's yellow");
    else assert.match(t.clash, /dark lettering \(#111111\) would vanish on a dark background \(1\.\d:1\): use a light-on-dark version of the logo/, t.name);
  }
  // The yellow is darkened to read on the light winner, never left unreadable.
  assert.ok(T.contrast(ink.themes[0].accent, ink.themes[0].bg) >= 3);

  // White wordmark + deep blue mark: the mirror case. pop keeps the white
  // lettering just readable, so it is not ruled out, but dark themes come first.
  const white = markAndWordmark("#0D23A9", "#FFFFFF");
  assert.equal(white.base, "dark");
  assert.ok(white.themes.slice(0, 5).every((t) => !isLightTheme(t.name) && t.clash === null), white.themes.map((t) => t.name).join());
  assert.equal(white.themes[5].name, "pop");
  assert.equal(white.themes[5].clash, null);
  for (const t of white.themes.slice(6)) assert.match(t.clash, /white lettering \(#FFFFFF\) would vanish on a light background/, t.name);

  // An opaque white backdrop (e.g. a JPG logo) would be a white box on dark themes.
  const { px, box, w, h } = canvas(96, 48, rgba("#FFFFFF"));
  box(20, 10, 56, 28, rgba("#C6FF3D"));
  const boxed = B.analyse(B.samplePixels(px, w, h));
  assert.equal(boxed.base, "light");
  assert.ok(isLightTheme(boxed.themes[0].name), boxed.themes[0].name);
  assert.match(boxed.themes[9].clash, /show as a box/);
});

test("theme recommendation: charcoal, grey and navy wordmarks rule out dark themes too", () => {
  for (const wordmark of ["#222222", "#2B2B2B", "#333333", "#1D3557"]) {
    const r = markAndWordmark("#FFC20E", wordmark);
    const names = r.themes.map((t) => `${t.name}${t.clash ? "!" : ""}`).join();
    assert.equal(r.base, "light", wordmark);
    assert.ok(r.baseFirm, wordmark);
    for (const t of r.themes.slice(0, 3)) assert.ok(isLightTheme(t.name) && !t.clash, `${wordmark}: ${names}`);
    for (const n of ["midnight", "neon", "desi", "mono", "studio-dark"]) {
      const t = r.themes.find((x) => x.name === n);
      assert.ok(t.clash?.includes(`(${wordmark})`) || t.clash?.includes(`${wordmark} parts`), `${wordmark} on ${n}: ${t.clash}`);
      assert.ok(T.contrast(wordmark, t.bg) < 1.7, "the clash is real");
    }
  }
});

test("theme recommendation: ink the logo encloses does not decide the base", () => {
  // A red app icon with a white glyph inside reads on every theme.
  const icon = B.analyse(
    logoPixels((box) => {
      box(24, 4, 40, 40, rgba("#E4002B"));
      box(36, 14, 16, 20, rgba("#FFFFFF"));
    }),
  );
  assert.equal(icon.baseFirm, false);
  assert.ok(icon.themes.every((t) => t.clash === null), icon.themes.map((t) => t.clash).join());
  // A yellow badge with black text: fine on dark and light themes; only pop's yellow swallows it.
  const badge = B.analyse(
    logoPixels((box) => {
      box(8, 8, 80, 32, rgba("#FFC20E"));
      box(20, 18, 56, 12, rgba("#111111"));
    }),
  );
  assert.equal(badge.baseFirm, false);
  assert.deepEqual(badge.themes.filter((t) => t.clash).map((t) => t.name), ["pop"]);
  assert.equal(badge.themes[9].name, "pop");
});

const DARK = ["midnight", "neon", "desi", "mono", "studio-dark"];
const LIGHT = ["clean", "studio", "corporate", "editorial"];
/** A full-bleed opaque square in `fill` (no transparency anywhere) with a `glyph` inside it. */
const fullBleed = (fill, glyph) => {
  const { px, box, w, h } = canvas(64, 64, rgba(fill));
  box(20, 14, 24, 36, rgba(glyph));
  return B.analyse(B.samplePixels(px, w, h));
};
const clashOn = (r, name) => r.themes.find((t) => t.name === name).clash;

test("a full-bleed coloured tile is the mark (an app icon), not a box around the logo", () => {
  for (const fill of ["#612BD3", "#1D3557", "#FFC20E"]) {
    const tile = fullBleed(fill, "#FFFFFF");
    assert.equal(tile.accent, fill);
    assert.doesNotMatch(tile.baseWhy, /sits on/, fill);
    for (const t of tile.themes) assert.doesNotMatch(t.clash ?? "", /box|transparent PNG/, `${fill} on ${t.name}`);
    // The best themes never carry a warning: there is always a theme this logo file reads on.
    for (const t of tile.themes.slice(0, 3)) assert.equal(t.clash, null, `${fill}: ${t.name}`);
  }
  // Violet reads on every background, the near-black, violet-glow and indigo dark ones included.
  const violet = fullBleed("#612BD3", "#FFFFFF");
  assert.ok(violet.themes.every((t) => t.clash === null), violet.themes.map((t) => `${t.name}: ${t.clash}`).join("\n"));
  assert.equal(violet.baseFirm, false);
  // Yellow reads on dark and light themes; only pop's yellow swallows the tile.
  const yellow = fullBleed("#FFC20E", "#FFFFFF");
  for (const n of [...DARK, ...LIGHT]) assert.equal(clashOn(yellow, n), null, n);
  assert.match(clashOn(yellow, "pop"), /the logo's #FFC20E parts would vanish on a light background/);
  // Navy reads on light themes; on near-black ones the tile's edge is what vanishes (1.6:1),
  // so light themes come first: a fixable warning, not "use a transparent PNG".
  const navy = fullBleed("#1D3557", "#FFFFFF");
  for (const n of LIGHT) assert.equal(clashOn(navy, n), null, n);
  for (const n of DARK) assert.match(clashOn(navy, n), /the logo's #1D3557 parts would vanish on a dark background/, n);
  assert.deepEqual([navy.base, navy.baseFirm], ["light", true]);
});

test("a white, cream or black full-bleed backdrop is paper: it shows as a box where it stands out", () => {
  for (const paper of ["#FFFFFF", "#FDF6E3", "#F5F5DC"]) {
    const sheet = fullBleed(paper, "#612BD3");
    assert.deepEqual([sheet.base, sheet.baseFirm, sheet.baseWhy], ["light", true, "the logo sits on a light background"], paper);
    for (const n of DARK) assert.equal(clashOn(sheet, n), `the logo's own light background (${paper}) would show as a box: use a transparent PNG or SVG of the logo`, `${paper} on ${n}`);
    for (const n of LIGHT) assert.equal(clashOn(sheet, n), null, `${paper} on ${n}`);
  }
  const black = fullBleed("#111111", "#FFC20E");
  assert.deepEqual([black.base, black.baseFirm], ["dark", true]);
  for (const n of LIGHT) assert.match(clashOn(black, n), /own dark background \(#111111\) would show as a box/, n);
  // JPEG noise and a coloured mark touching part of the edge do not turn paper into a colour.
  const r = rng(3);
  const { px, box, w, h } = canvas(64, 64);
  for (let i = 0; i < w * h; i++) px.set([255, 255, 255].map((v) => v - Math.floor(r() * 6)).concat(255), i * 4);
  box(0, 20, 64, 24, rgba("#612BD3")); // a band bleeding off both sides: 48 of 252 border pixels
  const jpg = B.analyse(B.samplePixels(px, w, h));
  assert.equal(jpg.accent, "#612BD3");
  // The box is named by the paper's own colour, not tinted by the band.
  for (const n of DARK) assert.match(clashOn(jpg, n), /own light background \(#F[CD]F[CD]F[CD]\) would show as a box/, n);
});

// --- SVG text -----------------------------------------------------------------------

test("parseColour reads hex, short hex, rgb() and names", () => {
  assert.equal(B.parseColour("#e4002b"), "#E4002B");
  assert.equal(B.parseColour("#E02"), "#EE0022");
  assert.equal(B.parseColour("#E4002B80"), "#E4002B");
  assert.equal(B.parseColour("rgb(228, 0, 43)"), "#E4002B");
  assert.equal(B.parseColour(" White "), "#FFFFFF");
  assert.equal(B.parseColour("none"), null);
  assert.equal(B.parseColour("var(--brand)"), null);
});

const weightsByHex = (weights) => Object.fromEntries([...weights].map(([n, v]) => [T.rgbToHex([(n >> 16) & 255, (n >> 8) & 255, n & 255]), +v.toFixed(2)]));

test("svgColors weighs colours by area and honours classes, style, inheritance, transforms, gradients and defs", () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <style>.a{fill:#E4002B}.b,.c{fill:#1d3557;stroke:#FF6A13}</style>
    <defs><linearGradient id="g"><stop offset="0" stop-color="#00A86B"/><stop offset="1" style="stop-color:#0A5CFF"/></linearGradient>
      <path d="M0 0h50v50H0z" fill="#ABCDEF"/></defs>
    <g class="a"><rect width="10" height="10"/><circle r="5" fill="#E4002B"/></g>
    <path class="b" d="M0 0h20v10H0z"/>
    <rect width="10" height="20" style="fill:url(#g)" fill="#123456"/>
    <g transform="translate(5 5) scale(2)"><rect width="5" height="5" fill="#FFC20E"/></g>
    <text font-size="10">A B</text>
    <path d="M0 0" fill="none" stroke="rgb(255,106,19)"/>
    <line x1="0" y1="0" x2="30" y2="40" stroke="#FF6A13" stroke-width="2"/>
  </svg>`;
  const { weights, backdrop } = B.svgColors(svg);
  assert.deepEqual(weightsByHex(weights), {
    "#E4002B": +(100 + 25 * Math.PI).toFixed(2), // rect + circle
    "#1D3557": 200,
    "#FF6A13": 60 + 50 * 2, // the 20×10 path's outline + a 50-long line 2 wide
    "#00A86B": 100, // a gradient splits its area across its stops
    "#0A5CFF": 100,
    "#FFC20E": 100, // 5×5 scaled 2×
    "#000000": 60, // two letters at 0.3 em² each
  });
  assert.equal(backdrop, null);
});

test("svgColors: holes are not ink, arcs and relative / packed path data are read", () => {
  const area = (d) => weightsByHex(B.svgColors(`<svg viewBox="0 0 100 100"><path d="${d}" fill="#E4002B"/></svg>`).weights)["#E4002B"];
  assert.equal(area("M0 0h100v100H0zM25 25h50v50H25z"), 7500, "a square ring, same winding");
  assert.equal(area("M0 0h100v100H0zM25 25v50h50V25z"), 7500, "a square ring, opposite winding");
  assert.equal(area("m10 10 20 0 0 20-20 0z"), 400, "relative moveto with implicit line-tos");
  const circle = Math.PI * 40 * 40;
  close(area("M10 50a40 40 0 1 0 80 0a40 40 0 1 0-80 0z"), circle, 0.03 * circle, "circle drawn with two arcs");
  close(area("M10 50a40 40 0 1080 0a40 40 0 10-80 0z"), circle, 0.03 * circle, "same, with packed arc flags");
  assert.ok(B.pathPolygons("M0 0L10 0 10 10z").length === 1 && B.pathPolygons("M0 0 L").length === 1, "malformed data stops cleanly");
});

test("svgColors: a rect covering the whole drawing is the logo's backdrop", () => {
  const backdrop = (inner, root = `viewBox="0 0 200 100"`) => B.svgColors(`<svg xmlns="http://www.w3.org/2000/svg" ${root}>${inner}<circle cx="50" cy="50" r="30" fill="#0A5CFF"/></svg>`).backdrop;
  assert.equal(backdrop(`<rect width="200" height="100" fill="#fff"/>`), "#FFFFFF");
  assert.equal(backdrop(`<rect width="100%" height="100%" fill="white"/>`, `width="400" height="200"`), "#FFFFFF");
  assert.equal(backdrop(`<rect x="-1" y="-1" width="202" height="102" fill="#111"/>`), "#111111");
  assert.equal(backdrop(`<rect width="150" height="100" fill="#fff"/>`), null, "part of it only");
  assert.equal(backdrop(`<g transform="scale(0.5)"><rect width="200" height="100" fill="#fff"/></g>`), null, "scaled down");
  assert.equal(backdrop(`<rect width="200" height="100" fill="url(#g)"/>`), null, "not a solid colour");
  assert.equal(backdrop(`<rect width="200" height="100" fill="#FDF6E3"/>`), "#FDF6E3", "cream paper");
  // A coloured artboard is the mark itself (an app tile), not a background.
  assert.equal(backdrop(`<rect width="200" height="100" fill="#612BD3"/>`), null, "violet tile");
  assert.equal(backdrop(`<rect width="200" height="100" fill="#FFC20E"/>`), null, "yellow tile");
  // The topmost covering rect decides: a tile drawn over white paper hides it.
  assert.equal(backdrop(`<rect width="200" height="100" fill="#fff"/><rect width="200" height="100" fill="#1D3557"/>`), null);
  assert.equal(backdrop(`<rect width="200" height="100" fill="#612BD3"/><rect width="200" height="100" fill="#fff"/>`), "#FFFFFF");
});

test("svgViewBox / svgSize read the root's viewBox and width / height", () => {
  assert.deepEqual(B.svgViewBox(`<svg viewBox="0 0 100 40">`), [0, 0, 100, 40]);
  assert.deepEqual(B.svgSize(`<svg viewBox="0 0 100 40">`), [100, 40]);
  assert.deepEqual(B.svgSize(`<svg width="200px" height="80" viewBox="0 0 100 40">`), [200, 80]);
  assert.deepEqual(B.svgSize(`<svg width="100%" height="100%" viewBox="0,0,10,5">`), [10, 5]);
  assert.deepEqual(B.svgViewBox(`<svg width="64" height="32">`), [0, 0, 64, 32]);
  assert.equal(B.svgSize(`<svg xmlns="http://www.w3.org/2000/svg">`), null);
});

test("an SVG read as text: area-weighted colours, its artboard rect as a backdrop, no guess about lettering", () => {
  const artboard = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100"><rect width="200" height="100" fill="#fff"/><circle cx="50" cy="50" r="30" fill="#0A5CFF"/><rect x="110" y="20" width="60" height="60" fill="#E4002B"/></svg>`;
  const boxed = B.analyse(B.svgTextSamples(artboard));
  assert.equal(boxed.base, "light");
  assert.ok(boxed.baseFirm);
  assert.deepEqual(boxed.themes.filter((t) => t.clash).map((t) => t.name).sort(), ["desi", "midnight", "mono", "neon", "pop", "studio-dark"]);
  assert.match(boxed.themes[9].clash, /own light background \(#FFFFFF\) would show as a box/);
  // The red square covers more area than the blue circle, but blue is more saturated: accent by saturation.
  assert.deepEqual([boxed.accent, boxed.accent2], ["#0A5CFF", "#E4002B"]);
  // Without pixels there is no rim: a white-on-colour mark is not mistaken for white lettering.
  const glyph = B.svgTextSamples(`<svg viewBox="0 0 64 64"><rect x="4" y="4" width="56" height="56" fill="#E4002B"/><path d="M20 16h24v32H20z" fill="#fff"/></svg>`);
  const r = B.analyse(glyph);
  assert.equal(r.fitChecked, false);
  assert.equal(r.baseFirm, false);
  assert.ok(r.themes.every((t) => t.clash === null));
  assert.equal(B.svgTextSamples(`<svg viewBox="0 0 10 10"><path d="M0 0" fill="none"/></svg>`), null);
});

/** An app-icon logo: a full 260×260 violet artboard with a white mark (the shape of postiz/assets/logo.svg). */
const APP_TILE = `<svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="260" height="260" fill="#612BD3"/><path d="M80 78h100v112H80z" fill="white"/><path d="M100 96h60v20h-60z" fill="#131019"/></svg>`;

test("an SVG read as text: a coloured artboard rect is the mark, not a backdrop", () => {
  const tile = B.analyse(B.svgTextSamples(APP_TILE));
  assert.equal(tile.accent, "#612BD3");
  assert.equal(tile.stats.paperRgb, null);
  assert.equal(tile.baseFirm, false);
  assert.doesNotMatch(tile.baseWhy, /sits on/);
  assert.ok(tile.themes.every((t) => t.clash === null), tile.themes.map((t) => t.clash).join());
  // The same drawing on a cream artboard is a box on dark themes.
  const sheet = B.analyse(B.svgTextSamples(APP_TILE.replace(`fill="#612BD3"/>`, `fill="#FDF6E3"/><circle cx="40" cy="40" r="20" fill="#612BD3"/>`)));
  assert.equal(sheet.base, "light");
  for (const n of DARK) assert.match(clashOn(sheet, n), /own light background \(#FDF6E3\) would show as a box/, n);
});

// --- writing the spec --------------------------------------------------------------

test("setBrandInText adds brand after the look settings and keeps the file's formatting", () => {
  const text = `{
  "format": "landscape",
  "theme": "studio",
  "scenes": [
    { "type": "kinetic", "lines": ["One.", "Two."] }
  ]
}
`;
  const out = B.setBrandInText(text, { accent: "#E4002B", logo: "brand/acme.png" });
  assert.equal(
    out,
    `{
  "format": "landscape",
  "theme": "studio",
  "brand": {
    "accent": "#E4002B",
    "logo": "brand/acme.png"
  },
  "scenes": [
    { "type": "kinetic", "lines": ["One.", "Two."] }
  ]
}
`,
  );
});

test("setBrandInText replaces an existing brand block in place", () => {
  const text = `{
  "theme": "midnight",
  "brand": { "handle": "@x", "accent": "#000000" },
  "scenes": [{ "type": "logo", "name": "X" }]
}
`;
  const brand = B.nextBrand(JSON.parse(text).brand, { accent: "#C6FF3D", accent2: null, logo: "brand/x.svg" });
  assert.deepEqual(Object.keys(brand), ["accent", "logo", "handle"]);
  const out = B.setBrandInText(text, brand);
  assert.ok(out.includes(`"scenes": [{ "type": "logo", "name": "X" }]`));
  assert.deepEqual(JSON.parse(out), { theme: "midnight", brand: { accent: "#C6FF3D", logo: "brand/x.svg", handle: "@x" }, scenes: [{ type: "logo", name: "X" }] });
});

test("nextBrand drops a stale accent2 and leaves colours alone for monochrome logos", () => {
  assert.deepEqual(B.nextBrand({ accent: "#111111", accent2: "#222222" }, { accent: "#E4002B", accent2: null }), { accent: "#E4002B" });
  assert.deepEqual(B.nextBrand({ accent: "#111111", accent2: "#222222" }, { accent: null, accent2: null, logo: "l.png" }), {
    accent: "#111111",
    accent2: "#222222",
    logo: "l.png",
  });
  // Odd formatting still produces valid JSON.
  const out = B.setBrandInText(`{"theme":"neon","scenes":[]}`, { accent: "#C6FF3D" });
  assert.deepEqual(JSON.parse(out), { theme: "neon", brand: { accent: "#C6FF3D" }, scenes: [] });
});

test("brandChanged ignores key order and treats a missing brand as empty", () => {
  // Monochrome logo outside public/ on a spec with no brand: nothing to write.
  assert.equal(B.brandChanged(undefined, B.nextBrand(undefined, { accent: null, accent2: null, logo: null })), false);
  assert.equal(B.brandChanged({ handle: "@x", accent: "#E4002B" }, { accent: "#E4002B", handle: "@x" }), false);
  assert.equal(B.brandChanged(undefined, { logo: "brand/x.png" }), true);
  assert.equal(B.brandChanged({ accent: "#111111", accent2: "#222222" }, { accent: "#111111" }), true);
});

// --- brand.logo in "logo" scenes ----------------------------------------------------

test("a logo scene showing brand.logo is planned like one with its own src", async () => {
  const P = await import("../src/engine/plan.ts");
  const video = (logoScene, brand) => ({
    theme: "clean",
    ...(brand ? { brand } : {}),
    scenes: [{ type: "kinetic", lines: ["Ship faster."] }, { type: "logo", name: "Acme", tagline: "Build more", ...logoScene }],
  });
  const own = P.planVideo(video({ src: "brand/logo.png" }));
  const fromBrand = P.planVideo(video({}, { logo: "brand/logo.png" }));
  const none = P.planVideo(video({}));
  const last = (plan) => plan.scenes[plan.scenes.length - 1];

  // The template draws scene.src: the fallback is already resolved into the planned scene.
  assert.equal(last(fromBrand).scene.src, "brand/logo.png");
  assert.equal(last(none).scene.src, undefined);
  // Same image, same timeline: the name waits for the logo, the impact lands with the name.
  assert.deepEqual(last(fromBrand).beats, last(own).beats);
  assert.deepEqual(last(fromBrand).cues, last(own).cues);
  assert.equal(last(fromBrand).duration, last(own).duration);
  assert.equal(fromBrand.durationInFrames, own.durationInFrames);
  assert.ok(last(own).beats.name > last(none).beats.name, "with an image the name enters after the logo");
  // An explicit src still wins over brand.logo.
  const both = P.planVideo(video({ src: "brand/other.png" }, { logo: "brand/logo.png" }));
  assert.equal(last(both).scene.src, "brand/other.png");
});

// --- CLI ---------------------------------------------------------------------------

const cli = (args, input, env = process.env) => spawnSync(process.execPath, ["scripts/brand.mjs", ...args], { cwd: KIT, input, encoding: "utf8", env });
/** A temp spec for one CLI run, removed afterwards. */
const withSpec = (text, fn) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "brand-test-"));
  try {
    const spec = path.join(dir, "x.json");
    fs.writeFileSync(spec, text);
    fn(spec);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
};
const hasFfmpeg = spawnSync("ffmpeg", ["-version"]).status === 0;
/** Whether this machine's ffmpeg can rasterise SVG (librsvg); else SVGs are read as text. */
const canRasterise = hasFfmpeg && Boolean(B.decodeImage(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 4"><rect width="4" height="4" fill="#E4002B"/></svg>`)));
const YELLOW_BLACK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40"><rect width="30" height="30" fill="#FFC20E"/><path d="M40 10h50v10H40z" fill="#111"/></svg>`;

test("CLI: --spec without a file prints the usage, not a stack trace", () => {
  const r = cli(["-", "--spec"], YELLOW_BLACK);
  assert.equal(r.status, 1);
  assert.match(r.stderr, /^Usage: npm run brand -- <logo file>/);
  assert.doesNotMatch(r.stderr, /TypeError|\n\s+at /);
});

test("CLI: a folder instead of a logo file is a friendly error, not a stack trace", () => {
  const r = cli(["public"]);
  assert.equal(r.status, 1);
  assert.match(r.stderr, /Could not read public \(it is a folder, not an image file\)/);
  assert.doesNotMatch(r.stderr, /EISDIR|\n\s+at /);
});

test("CLI: a monochrome logo leaves a spec without a brand block untouched", () => {
  const text = `{\n  "theme": "mono",\n  "scenes": [{ "type": "kinetic", "lines": ["One."] }]\n}\n`;
  withSpec(text, (spec) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect width="10" height="10" fill="#000"/></svg>`;
    const r = cli(["-", "--spec", spec], svg);
    assert.equal(r.status, 0, r.stderr);
    assert.match(r.stdout, /brand already up to date/);
    assert.equal(fs.readFileSync(spec, "utf8"), text);
  });
});

test("CLI: values kept from an earlier logo are pointed out", () => {
  const text = `{\n  "theme": "mono",\n  "brand": { "accent": "#E4002B", "accent2": "#1D3557", "logo": "brand/old.png" },\n  "scenes": [{ "type": "kinetic", "lines": ["One."] }]\n}\n`;
  withSpec(text, (spec) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect x="2" y="2" width="6" height="6" fill="#000"/></svg>`;
    const r = cli(["-", "--spec", spec], svg);
    assert.equal(r.status, 0, r.stderr);
    assert.match(r.stdout, /Kept brand\.accent #E4002B and brand\.accent2 #1D3557 from before: this logo has no brand colour\. Delete them/);
    assert.match(r.stdout, /brand\.logo not updated \(it still points to "brand\/old\.png"\)/);
    assert.equal(fs.readFileSync(spec, "utf8"), text);
  });
});

test("CLI: a spec theme the logo cannot sit on gets a warning and light alternatives", { skip: !canRasterise && "no ffmpeg with librsvg to rasterise SVG" }, () => {
  withSpec(`{\n  "theme": "midnight",\n  "scenes": [{ "type": "kinetic", "lines": ["One."] }]\n}\n`, (spec) => {
    const r = cli(["-", "--spec", spec], YELLOW_BLACK);
    assert.equal(r.status, 0, r.stderr);
    assert.match(r.stdout, /96×39 px/, "rasterised, at the SVG's own aspect ratio");
    const best = [...r.stdout.matchAll(/^\s+\d\. (?:\x1b\[\d+m)?([\w-]+)/gm)].map((m) => m[1]);
    assert.equal(best.length, 3, r.stdout);
    for (const name of best) assert.ok(isLightTheme(name), name);
    assert.match(r.stdout, /Accent #B48700 \(3\.0:1 on its background\)/, "each theme shows its accent's contrast");
    assert.match(r.stdout, /Not with this logo file:[\s\S]*midnight, desi, neon, mono, studio-dark\S* — the logo's dark lettering \(#111111\)/);
    assert.match(r.stdout, /pop\S* — the logo's #FFC20E parts would vanish/);
    assert.match(r.stdout, /Theme midnight: the logo's dark lettering \(#111111\) would vanish on a dark background \(1\.0:1\): use a light-on-dark version of the logo, or switch to theme "clean"/);
  });
});

test("CLI: an SVG no ffmpeg can rasterise is read as text, and says so", () => {
  // No PATH: no ffmpeg at all, so the SVG text fallback runs.
  const r = cli(["-"], YELLOW_BLACK, { ...process.env, PATH: "" });
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /SVG read as text · ignored: 0% near-white, 36% near-black \(by area\)/);
  assert.match(r.stdout, /This SVG was read as text, not pixels: no ffmpeg here can rasterise it/);
  assert.match(r.stdout, /whether its lettering reads on each theme was not checked/);
  assert.doesNotMatch(r.stdout, /Not with this logo file/);
});

// --- decoding (in memory) ----------------------------------------------------------

test("decodeArgs: a file is read from its path, stdin is piped (an SVG with its length)", () => {
  const file = B.decodeArgs("png", { file: "/logos/acme.png", bytes: 99 });
  assert.equal(file[file.indexOf("-i") + 1], "/logos/acme.png");
  assert.ok(!file.includes("pipe:0") && !file.includes("-frame_size"));
  const piped = B.decodeArgs("png", { bytes: 99 });
  assert.equal(piped[piped.indexOf("-i") + 1], "pipe:0");
  // svg_pipe cannot tell where a piped SVG ends: it is told the length.
  const svg = B.decodeArgs("svg", { bytes: 1234, size: [100, 40] });
  assert.equal(svg[svg.indexOf("-frame_size") + 1], "1234");
  assert.ok(svg.indexOf("-frame_size") < svg.indexOf("-i") && svg.includes("librsvg"));
  // Rendered at 4× the sample width, at the SVG's own aspect ratio (not librsvg's 100×100 box).
  assert.deepEqual(svg.slice(svg.indexOf("-width"), svg.indexOf("-width") + 6), ["-width", "384", "-height", "154", "-keep_ar", "0"]);
  const svgFile = B.decodeArgs("svg", { file: "/logos/acme.svg", bytes: 1234 });
  assert.equal(svgFile[svgFile.indexOf("-i") + 1], "/logos/acme.svg");
  assert.ok(!svgFile.includes("-frame_size") && !svgFile.includes("-height"));
  // Full colour resolution while scaling: no invented colours at vertical edges.
  assert.match(piped[piped.indexOf("-vf") + 1], /^scale=96:-1:flags=neighbor\+full_chroma_inp/);
});

test("decodeImage turns PNG bytes into RGBA pixels in memory", { skip: !hasFfmpeg && "ffmpeg not installed" }, () => {
  // 192×64 PNG generated in memory: left half red, right half transparent.
  const src = "color=c=black:s=192x64,format=rgba,geq=r='if(lt(X,96),228,0)':g='0':b='if(lt(X,96),43,0)':a='if(lt(X,96),255,0)'";
  const png = spawnSync("ffmpeg", ["-v", "error", "-f", "lavfi", "-i", src, "-frames:v", "1", "-f", "image2pipe", "-c:v", "png", "-"]).stdout;
  assert.equal(B.sniff(png), "png");
  const img = B.decodeImage(png);
  assert.equal(img.width, B.SAMPLE_WIDTH);
  assert.equal(img.height, 32);
  const { colours, stats } = B.samplePixels(img.rgba, img.width, img.height);
  close(stats.transparent / stats.pixels, 0.5, 0.05, "half transparent");
  assert.equal(B.pickBrandColours(B.extractPalette(colours)).accent, "#E4002B");
});

test("decodeImage invents no colours at sharp vertical edges", { skip: !hasFfmpeg && "ffmpeg not installed" }, () => {
  // 200×50 PNG in memory: a yellow band (x 37-90) on transparency. Scaling to
  // 96 wide with half-resolution colour used to put #DFC167 at its edges.
  const src = "color=c=black@0:s=200x50,format=rgba,geq=r='if(between(X,37,90),255,0)':g='if(between(X,37,90),194,0)':b='if(between(X,37,90),14,0)':a='if(between(X,37,90),255,0)'";
  const png = spawnSync("ffmpeg", ["-v", "error", "-f", "lavfi", "-i", src, "-frames:v", "1", "-f", "image2pipe", "-c:v", "png", "-"]).stdout;
  const img = B.decodeImage(png);
  const { colours, stats } = B.samplePixels(img.rgba, img.width, img.height);
  assert.deepEqual([...colours.keys()], [0xffc20e]);
  assert.deepEqual([...stats.rim.keys()], [0xffc20e]);
});

test("decodeImage rasterises SVG bytes from a pipe, at their aspect ratio, colours un-premultiplied", { skip: !canRasterise && "no ffmpeg with librsvg" }, () => {
  const img = B.decodeImage(Buffer.from(YELLOW_BLACK));
  assert.deepEqual([img.width, img.height], [96, 39]);
  const { colours, stats } = B.samplePixels(img.rgba, img.width, img.height);
  // Anti-aliased edges come back at their true colour, not darkened towards black.
  assert.deepEqual([...colours.keys()], [0xffc20e]);
  assert.deepEqual([...stats.rim.keys()].sort(), [0x111111, 0xffc20e].sort());
  const r = B.analyse({ colours, stats });
  assert.equal(r.base, "light");
  assert.ok(r.baseFirm);
  // An artboard rect is an opaque backdrop: a box on dark themes, not "white lettering".
  const artboard = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100"><rect width="200" height="100" fill="#fff"/><circle cx="50" cy="50" r="30" fill="#0A5CFF"/><rect x="110" y="20" width="60" height="60" fill="#E4002B"/></svg>`;
  const boxed = B.analyse(B.samplesOf(Buffer.from(artboard)));
  assert.equal(boxed.base, "light");
  assert.match(boxed.baseWhy, /sits on a light background/);
  assert.match(boxed.themes.find((t) => t.name === "midnight").clash, /would show as a box/);
  assert.equal(boxed.themes.find((t) => t.name === "clean").clash, null);
  // A coloured artboard is the app tile itself: it reads on every theme.
  const pixels = B.samplesOf(Buffer.from(APP_TILE));
  assert.equal(pixels.text, false, "rasterised");
  const tile = B.analyse(pixels);
  assert.equal(tile.accent, "#612BD3");
  assert.ok(tile.fitChecked);
  assert.ok(tile.themes.every((t) => t.clash === null), tile.themes.map((t) => `${t.name}: ${t.clash}`).join("\n"));
});

test("analyseLogo reads a data: URL in memory and skips remote URLs", { skip: !hasFfmpeg && "ffmpeg not installed" }, () => {
  const r = B.analyseLogo(`data:image/svg+xml;base64,${Buffer.from(YELLOW_BLACK).toString("base64")}`);
  assert.equal(r.accent, "#FFC20E");
  assert.equal(B.analyseLogo(`data:image/svg+xml,${encodeURIComponent(YELLOW_BLACK)}`).accent, "#FFC20E");
  assert.equal(B.analyseLogo("https://example.com/logo.png"), null);
  assert.equal(B.analyseLogo("brand/does-not-exist.png"), null);
});

test("check: a logo scene whose file would not read on the theme gets a warning", { skip: !canRasterise && "no ffmpeg with librsvg" }, async () => {
  const { check } = await import("./check.mjs");
  const logo = `data:image/svg+xml;base64,${Buffer.from(YELLOW_BLACK.replace("#FFC20E", "#FFE14D")).toString("base64")}`;
  const spec = (theme) => ({ theme, brand: { accent: "#FFE14D", logo }, scenes: [{ type: "kinetic", lines: ["Ship faster."] }, { type: "logo", name: "Acme" }] });
  const night = await check(spec("midnight"), { quiet: true });
  assert.ok(night.warnings.some((w) => /^Logo "data: URL" \(scene 2\) on theme midnight: the logo's dark lettering \(#111111\) would vanish .*, or use theme clean \/ studio \/ corporate\.$/.test(w)), night.warnings.join("\n"));
  // On a light theme the yellow is darkened; it would stay exact only on dark themes, where this logo does not read.
  const clean = await check(spec("clean"), { quiet: true });
  assert.ok(!clean.warnings.some((w) => w.startsWith("Logo ")), clean.warnings.join("\n"));
  const note = clean.notes.find((n) => n.startsWith("brand accent #FFE14D darkened"));
  assert.match(note, /It stays exact only on theme midnight \/ neon \/ desi \/ mono \/ studio-dark, where brand\.logo would not read\.$/);
  assert.doesNotMatch(note, /To keep it exactly/);
  // An app-tile logo (full-bleed violet artboard) is not a box on any theme: no warning to fix.
  const tile = `data:image/svg+xml;base64,${Buffer.from(APP_TILE).toString("base64")}`;
  for (const theme of ["midnight", "neon", "clean", "studio-dark"]) {
    const r = await check({ theme, brand: { accent: "#612BD3", logo: tile }, scenes: [{ type: "kinetic", lines: ["Ship faster."] }, { type: "logo", name: "Acme" }] }, { quiet: true });
    assert.ok(!r.warnings.some((w) => w.startsWith("Logo ")), `${theme}: ${r.warnings.join("\n")}`);
  }
});

test("sniff recognises formats by content", () => {
  assert.equal(B.sniff(Buffer.from("<?xml version='1.0'?><svg xmlns='http://www.w3.org/2000/svg'></svg>")), "svg");
  // The root may come after a long prolog (comments, metadata).
  assert.equal(B.sniff(Buffer.from(`﻿<?xml version="1.0"?>\n<!-- ${"x".repeat(20000)} -->\n<svg viewBox="0 0 1 1"/>`)), "svg");
  assert.equal(B.sniff(Buffer.from("not markup <svg>")), "unknown");
  assert.equal(B.sniff(Buffer.from([0xff, 0xd8, 0xff, 0xe0])), "jpeg");
  assert.equal(B.sniff(Buffer.from("GIF89a")), "gif");
  assert.equal(B.sniff(Buffer.from("RIFF\0\0\0\0WEBPVP8 ")), "webp");
  assert.equal(B.sniff(Buffer.from("hello")), "unknown");
});
