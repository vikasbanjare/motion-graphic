// Look overrides: picked fonts and colours apply, and every colour still reads.
import { test } from "node:test";
import assert from "node:assert/strict";
import { engine } from "../scripts/lib.mjs";

const E = await engine();

/** A small deterministic stream of hex colours (no Math.random: failures must reproduce). */
const colours = (n, seed = 7) => {
  const out = [];
  let x = seed;
  for (let i = 0; i < n; i++) {
    x = (x * 1103515245 + 12345) % 2147483648;
    out.push("#" + (x % 0xffffff).toString(16).padStart(6, "0").toUpperCase());
  }
  return out;
};

const spec = (extra) => ({ theme: "midnight", scenes: [{ type: "title", headline: "Hello" }], ...extra });

test("no look leaves every theme untouched", () => {
  for (const name of E.THEME_NAMES) {
    assert.equal(E.resolveLook(E.THEMES[name], undefined).theme, E.THEMES[name]);
    assert.equal(E.resolveLook(E.THEMES[name], {}).theme, E.THEMES[name]);
    assert.deepEqual(E.themeFor({ theme: name, brand: {}, look: undefined }), E.THEMES[name]);
  }
});

test("fonts: picked faces get their own weight, case, tracking and Devanagari fallback", () => {
  const t = E.resolveLook(E.THEMES.midnight, { displayFont: "Instrument Serif", bodyFont: "Inter" }).theme;
  assert.match(t.fonts.display, /^"Instrument Serif", "Poppins"/);
  assert.equal(t.fonts.displayUpper, false);
  assert.equal(t.fonts.displayWeight, 400);
  assert.match(t.fonts.body, /^"Inter", "Poppins"/);
  const caps = E.resolveLook(E.THEMES.clean, { displayFont: "Anton", uppercase: false }).theme;
  assert.equal(caps.fonts.displayUpper, false);
  const snapped = E.resolveLook(E.THEMES.clean, { displayFont: "Space Grotesk", displayWeight: 900 });
  assert.equal(snapped.theme.fonts.displayWeight, 700);
  assert.equal(snapped.changes[0].field, "displayWeight");
});

test("custom canvas: text 7:1, muted 4.5:1, accents 3:1 on canvas and cards, button text 4.5:1", () => {
  const bgs = colours(60, 11);
  const texts = colours(60, 29);
  for (const name of E.THEME_NAMES) {
    for (let i = 0; i < bgs.length; i++) {
      for (const brand of [{}, { accent: texts[(i * 7) % texts.length] }]) {
        const look = { bg: bgs[i], text: i % 3 ? texts[i] : undefined };
        const t = E.themeFor({ theme: name, brand, look }).colors;
        const where = `${name} bg ${look.bg} text ${look.text} brand ${brand.accent}`;
        assert.ok(E.contrast(t.bg, "#FFFFFF") >= 7 || E.contrast(t.bg, "#000000") >= 7, `bg ${where}`);
        assert.ok(E.contrast(t.text, t.bg) >= 7, `text ${where}`);
        assert.ok(E.contrast(t.muted, t.bg) >= 4.5, `muted ${where}`);
        assert.ok(E.contrast(t.accent, t.bg) >= 3, `accent/bg ${where}: ${t.accent}`);
        assert.ok(E.contrast(t.accent, t.surface) >= 3, `accent/surface ${where}: ${t.accent}`);
        assert.ok(E.contrast(t.onAccent, t.accent) >= 4.5, `onAccent ${where}`);
      }
    }
  }
});

test("a readable picked text colour is kept exactly", () => {
  const r = E.resolveLook(E.THEMES.clean, { bg: "#101828", text: "#F2F4F7" });
  assert.equal(r.theme.colors.text, "#F2F4F7");
  assert.equal(r.changes.length, 0);
  const moved = E.resolveLook(E.THEMES.clean, { bg: "#FFFFFF", text: "#9CA3AF" });
  assert.notEqual(moved.theme.colors.text, "#9CA3AF");
  assert.ok(E.contrast(moved.theme.colors.text, "#FFFFFF") >= 7);
  assert.equal(moved.changes[0].field, "text");
});

test("the schema accepts a full look and rejects unknown fonts", () => {
  const ok = E.videoSchema.safeParse(spec({ look: { displayFont: "Teko", bodyFont: "Poppins", bg: "#0B1020", text: "#FFFFFF", background: "grid", grain: false, corners: "round", ctaStyle: "link", kicker: "plain" } }));
  assert.ok(ok.success, JSON.stringify(ok.error?.issues));
  assert.equal(E.videoSchema.safeParse(spec({ look: { displayFont: "Comic Sans" } })).success, false);
});

test("planVideo uses the look", () => {
  const plan = E.planVideo(spec({ look: { displayFont: "Inter", background: "plain", grain: false, corners: "sharp" } }));
  assert.equal(plan.theme.background, "plain");
  assert.equal(plan.theme.grain, false);
  assert.equal(plan.theme.radius, 0);
  assert.match(plan.theme.fonts.display, /^"Inter"/);
});
