// npm test  (or: node --test scripts/test-brand.mjs)
// Brand colours: colour maths, withBrand/resolveBrand guarantees, k-means and
// palette picking, theme recommendation and spec writing. Every image here is a
// synthetic pixel array built in memory; no image file is read or written.
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

const T = await import("../src/engine/themes.ts");
const B = await import("./brand.mjs");

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
  assert.equal(result.base, "light");
  assert.match(result.baseWhy, /dark lettering/);
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

test("base: opaque backgrounds, ink colour and accent lightness decide light vs dark", () => {
  const stats = { pixels: 100, transparent: 0, white: 0, black: 0, border: 40, borderOpaque: 40 };
  assert.equal(B.decideBase({ ...stats, borderLum: 0.95 }, null).base, "light");
  assert.equal(B.decideBase({ ...stats, borderLum: 0.01 }, null).base, "dark");
  const clear = { pixels: 100, transparent: 60, white: 0, black: 0, border: 40, borderOpaque: 0, borderLum: 0 };
  assert.equal(B.decideBase({ ...clear, white: 20 }, null).base, "dark");
  assert.equal(B.decideBase({ ...clear, black: 20 }, null).base, "light");
  assert.equal(B.decideBase(clear, "#C6FF3D").base, "dark");
  assert.equal(B.decideBase(clear, "#1D3557").base, "light");
  assert.equal(B.decideBase(clear, "#E4002B").base, null);
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

test("svgColors honours classes, style, inheritance, gradients and defs", () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
    <style>.a{fill:#E4002B}.b,.c{fill:#1d3557;stroke:#FF6A13}</style>
    <defs><linearGradient id="g"><stop offset="0" stop-color="#00A86B"/><stop offset="1" style="stop-color:#0A5CFF"/></linearGradient>
      <path d="M0 0" fill="#ABCDEF"/></defs>
    <g class="a"><path d="M0 0"/><rect width="1" height="1"/><circle r="1" fill="#E4002B"/></g>
    <path class="b" d="M0 0"/>
    <rect width="1" height="1" style="fill:url(#g)" fill="#123456"/>
    <text>ACME</text>
    <path d="M0 0" fill="none" stroke="rgb(255,106,19)"/>
  </svg>`;
  const w = Object.fromEntries([...B.svgColors(svg)].map(([n, v]) => [T.rgbToHex([(n >> 16) & 255, (n >> 8) & 255, n & 255]), v]));
  assert.deepEqual(w, { "#E4002B": 3, "#1D3557": 1, "#FF6A13": 1, "#00A86B": 0.5, "#0A5CFF": 0.5, "#000000": 1 });
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

// --- decoding (in memory) ----------------------------------------------------------

const hasFfmpeg = spawnSync("ffmpeg", ["-version"]).status === 0;

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

test("sniff recognises formats by content", () => {
  assert.equal(B.sniff(Buffer.from("<?xml version='1.0'?><svg xmlns='http://www.w3.org/2000/svg'></svg>")), "svg");
  assert.equal(B.sniff(Buffer.from([0xff, 0xd8, 0xff, 0xe0])), "jpeg");
  assert.equal(B.sniff(Buffer.from("GIF89a")), "gif");
  assert.equal(B.sniff(Buffer.from("RIFF\0\0\0\0WEBPVP8 ")), "webp");
  assert.equal(B.sniff(Buffer.from("hello")), "unknown");
});
