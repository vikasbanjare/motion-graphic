import { palette as P } from "../palette";
import type { DrawFn } from "./engine";
import { archPts, dots, ellipsePts, paint, rrectPts, stroke, type Pt } from "./kit";

/**
 * Placeholder painted art, one draw function per object. Every object is
 * painted with p5.brush (watercolour fills + ink line), so the film already
 * reads as hand-made. Swap any shot for finished art by dropping
 * assets/painted/<asset id>.png (see README).
 *
 * Draw functions are module-level constants so the sprite cache key stays stable.
 */

// ── S1 · phone + tiles + chai ────────────────────────────────────────────────
export const PHONE_W = 400;
export const PHONE_H = 780;
export const phone: DrawFn = (b, { j }) => {
  paint(b, rrectPts(12, 12, PHONE_W - 24, PHONE_H - 24, 56, j), { fill: P.navy, opacity: 245, inkWeight: 1.6, opaque: true });
  // Side buttons.
  paint(b, rrectPts(2, 150, 14, 70, 6, j), { fill: P.ink, wash: true, opacity: 255, inkWeight: 0.6 });
  paint(b, rrectPts(PHONE_W - 16, 200, 14, 110, 6, j), { fill: P.ink, wash: true, opacity: 255, inkWeight: 0.6 });
  paint(b, rrectPts(32, 34, PHONE_W - 64, PHONE_H - 68, 40, j), { fill: P.cream, wash: true, opacity: 255, ink: P.ink, inkWeight: 0.9, opaque: true });
  // Notch + status bar.
  paint(b, rrectPts(PHONE_W / 2 - 60, 46, 120, 26, 13, j), { fill: P.ink, wash: true, opacity: 255, ink: null });
  for (let i = 0; i < 3; i++) paint(b, ellipsePts(PHONE_W - 90 + i * 16, 60, 4, 4, 8), { fill: P.navy, wash: true, opacity: 255, ink: null });
  // Home indicator.
  paint(b, rrectPts(PHONE_W / 2 - 60, PHONE_H - 64, 120, 10, 5, j), { fill: P.navy, wash: true, opacity: 255, ink: null });
  // Glass highlight.
  stroke(b, [[PHONE_W - 70, 90, 1.2], [PHONE_W - 46, 250, 0.4]], "#ffffff", 3, "marker", 0);
  dots(b, 70, PHONE_H - 160, 30, 60, 16, P.sky, 1.8);
};

export const phoneOutline: DrawFn = (b, { j }) => {
  paint(b, rrectPts(12, 12, PHONE_W - 24, PHONE_H - 24, 56, j), { ink: P.navy, inkWeight: 1.4, inkBrush: "charcoal" });
};

const GLYPHS = ["circle", "play", "search", "pin", "tick", "bars", "star", "heart", "card", "cart", "note", "chat"] as const;
export const tile =
  (fill: string, glyph: (typeof GLYPHS)[number]): DrawFn =>
  (b, { j }) => {
    paint(b, rrectPts(6, 6, 88, 88, 22, j), { fill, opacity: 245, inkWeight: 1, opaque: true });
    const g = P.cream;
    const w = (pts: Pt[]) => paint(b, pts, { fill: g, wash: true, opacity: 255, ink: null });
    if (glyph === "circle") w(ellipsePts(50, 50, 20, 20, 16));
    if (glyph === "play") w([[40, 32], [68, 50], [40, 68]]);
    if (glyph === "search") { paint(b, ellipsePts(46, 46, 15, 15, 14), { ink: g, inkWeight: 1.4 }); stroke(b, [[57, 57], [70, 70]], g, 2, "marker", 0); }
    if (glyph === "pin") w([[50, 74], [34, 46], [40, 32], [60, 32], [66, 46]]);
    if (glyph === "tick") stroke(b, [[32, 52], [45, 65], [70, 36]], g, 2.6, "marker", 0);
    if (glyph === "bars") [0, 1, 2].forEach((k) => w(rrectPts(30 + k * 15, 64 - k * 12, 10, 14 + k * 12, 3)));
    if (glyph === "star") w(Array.from({ length: 10 }, (_, i) => { const r = i % 2 ? 9 : 22; const a = (i / 10) * Math.PI * 2 - Math.PI / 2; return [50 + Math.cos(a) * r, 50 + Math.sin(a) * r] as Pt; }));
    if (glyph === "heart") w([[50, 70], [30, 50], [32, 36], [44, 34], [50, 42], [56, 34], [68, 36], [70, 50]]);
    if (glyph === "card") w(rrectPts(28, 36, 44, 30, 5));
    if (glyph === "cart") { w([[28, 36], [72, 36], [66, 58], [34, 58]]); w(ellipsePts(38, 68, 5, 5, 8)); w(ellipsePts(62, 68, 5, 5, 8)); }
    if (glyph === "note") { w(ellipsePts(42, 64, 9, 7, 10)); w(rrectPts(48, 32, 5, 32, 2)); }
    if (glyph === "chat") w(rrectPts(30, 34, 40, 28, 10));
    dots(b, 74, 76, 10, 10, 5, P.ink, 1.4);
  };
const TILE_COLORS = [P.orange, P.blueBright, P.navy, P.orangeLight, P.blueMid, P.orangeBright];
export const tiles = GLYPHS.map((g, i) => tile(TILE_COLORS[i % TILE_COLORS.length], g));

export const chai: DrawFn = (b, { j }) => {
  const glass: Pt[] = [[20, 40], [150, 40], [134, 250], [36, 250]];
  paint(b, [[30, 110], [140, 110], [134, 250], [36, 250]], { fill: P.orangeDeep, opacity: 200, ink: null });
  paint(b, glass.map(([x, y]) => [x + j(1.5), y + j(1.5)] as Pt), { fill: P.orangePale, opacity: 90, inkWeight: 1 });
  stroke(b, [[28, 110], [85, 104], [142, 110]], P.ink, 0.6, "HB");
};

export const steam: DrawFn = (b, { j }) => {
  for (let i = 0; i < 3; i++) {
    const x = 30 + i * 30;
    stroke(b, [[x, 150], [x + 14 + j(4), 110], [x - 8 + j(4), 70], [x + 10 + j(4), 20]], P.sky, 1.4, "2B");
  }
};

// ── S2 · TV night ────────────────────────────────────────────────────────────
export const tv: DrawFn = (b, { j }) => {
  paint(b, rrectPts(10, 10, 540, 330, 26, j), { fill: P.ink, opacity: 250, ink: P.ink, inkWeight: 1.2, opaque: true });
  paint(b, rrectPts(36, 34, 488, 282, 14, j), { fill: P.blueBright, opacity: 240, bleed: 0.2, ink: null });
  paint(b, [[200, 340], [360, 340], [380, 372], [180, 372]], { fill: P.ink, wash: true, opacity: 255, inkWeight: 0.8 });
};

export const lamp: DrawFn = (b, { j }) => {
  paint(b, [[40 + j(), 20], [160 + j(), 20], [190, 150], [10, 150]], { fill: P.orange, opacity: 245, bleed: 0.25, inkWeight: 1 });
  paint(b, [[94, 150], [106, 150], [108, 380], [92, 380]], { fill: P.ink, wash: true, opacity: 255, ink: null });
  paint(b, ellipsePts(100, 385, 60, 14, 18, j), { fill: P.ink, wash: true, opacity: 255, ink: null });
};

export const sofa: DrawFn = (b, { j }) => {
  paint(b, rrectPts(10, 60, 780, 200, 40, j), { fill: P.blueMid, opacity: 230, inkWeight: 1.2, opaque: true });
  paint(b, rrectPts(40, 10, 720, 110, 30, j), { fill: P.navy, opacity: 230, inkWeight: 1, opaque: true });
  // Two pairs of feet up on the sofa arm.
  for (const [x, y] of [[560, 40], [610, 30], [660, 46], [710, 36]] as Pt[]) {
    paint(b, ellipsePts(x, y, 26, 40, 16, j), { fill: P.orangePale, opacity: 255, inkWeight: 0.8, opaque: true });
  }
};

// ── S3 · search ──────────────────────────────────────────────────────────────
export const searchPill: DrawFn = (b, { j }) => {
  paint(b, rrectPts(10, 10, 740, 130, 65, j), { fill: P.blueBright, opacity: 210, bleed: 0.1, inkWeight: 1.2, opaque: true });
  paint(b, rrectPts(150, 34, 560, 82, 41, j), { fill: P.tint, wash: true, opacity: 255, ink: null });
};

export const magnifier: DrawFn = (b, { j }) => {
  paint(b, ellipsePts(50, 50, 34, 34, 22, j), { fill: P.pale, opacity: 200, inkWeight: 1.6, ink: P.ink });
  stroke(b, [[76, 76], [104, 104]], P.ink, 2.4, "marker", 0);
};

export const scribble: DrawFn = (b, { j }) => {
  const pts: Pt[] = [];
  for (let i = 0; i <= 22; i++) pts.push([10 + i * 19, 30 + Math.sin(i * 1.7) * 14 + j(4)]);
  stroke(b, pts, P.ink, 1.1, "2B", 0.6);
};

// ── S4 · ride ────────────────────────────────────────────────────────────────
export const cityMap: DrawFn = (b, { j }) => {
  paint(b, rrectPts(20, 20, 860, 860, 30, j), { fill: P.sky, opacity: 170, ink: P.blueMid, inkWeight: 1.2, opaque: true });
  for (const [x, y, w, h] of [[80, 80, 220, 160], [360, 90, 200, 220], [620, 70, 200, 140], [90, 330, 180, 240], [600, 300, 230, 200], [130, 640, 260, 170], [480, 610, 330, 200]]) {
    paint(b, rrectPts(x, y, w, h, 12, j), { fill: P.tint, wash: true, opacity: 255, ink: P.blueMid, inkWeight: 0.8, opaque: true });
    dots(b, x + w * 0.7, y + h * 0.7, w * 0.2, h * 0.2, 6, P.sky, 2);
  }
  paint(b, ellipsePts(380, 470, 90, 70, 20, j), { fill: P.blueBright, opacity: 200, ink: P.blueMid, inkWeight: 0.8 });
  stroke(b, [[20, 880], [200, 700], [300, 620], [470, 520], [880, 400]], P.blueBright, 6, "marker", 0.5);
};

export const ROUTE: Pt[] = [[150, 760], [150, 580], [320, 580], [320, 300], [560, 300], [560, 250]];
export const route: DrawFn = (b) => {
  stroke(b, ROUTE, P.orange, 2.4, "marker", 0.15);
};

export const pin: DrawFn = (b, { j }) => {
  const pts: Pt[] = [];
  for (let i = 0; i <= 18; i++) {
    const a = Math.PI * 0.8 + (i / 18) * Math.PI * 1.4;
    pts.push([60 + Math.cos(a) * 46 + j(1), 58 + Math.sin(a) * 46 + j(1)]);
  }
  pts.push([60, 160]);
  paint(b, pts, { fill: P.orange, opacity: 245, inkWeight: 1.1 });
  paint(b, ellipsePts(60, 58, 16, 16, 14, j), { fill: P.cream, wash: true, opacity: 255, inkWeight: 0.6 });
};

export const cab: DrawFn = (b, { j }) => {
  paint(b, [[10, 70], [30, 34], [60, 26], [120, 26], [140, 50], [160, 56], [160, 92], [10, 92]].map(([x, y]) => [x + j(1), y + j(1)] as Pt), {
    fill: P.orangeLight,
    opacity: 240,
    inkWeight: 1,
  });
  paint(b, rrectPts(64, 6, 34, 20, 6, j), { fill: P.orangeBright, wash: true, opacity: 255, inkWeight: 0.6 });
  paint(b, ellipsePts(46, 94, 15, 15, 14, j), { fill: P.ink, wash: true, opacity: 255, ink: null });
  paint(b, ellipsePts(126, 94, 15, 15, 14, j), { fill: P.ink, wash: true, opacity: 255, ink: null });
};

// ── S5 · tap ─────────────────────────────────────────────────────────────────
export const terminal: DrawFn = (b, { j }) => {
  paint(b, rrectPts(10, 10, 320, 480, 40, j), { fill: P.navy, opacity: 240, inkWeight: 1.2, opaque: true });
  paint(b, rrectPts(46, 50, 248, 150, 14, j), { fill: P.tint, wash: true, opacity: 255, ink: null });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
    paint(b, ellipsePts(90 + c * 80, 270 + r * 66, 20, 18, 14, j), { fill: P.sky, wash: true, opacity: 255, ink: null });
  }
};

export const handPhone: DrawFn = (b, { j }) => {
  paint(b, rrectPts(90, 10, 200, 380, 34, j), { fill: P.ink, opacity: 245, inkWeight: 1.1, opaque: true });
  paint(b, rrectPts(104, 30, 172, 330, 20, j), { fill: P.blueBright, opacity: 210, ink: null });
  // Hand: palm + thumb wrapped around the phone.
  paint(b, [[40, 300], [110, 250], [300, 260], [340, 420], [250, 560], [80, 560], [30, 420]].map(([x, y]) => [x + j(2), y + j(2)] as Pt), {
    fill: P.orangeLight,
    opacity: 235,
    inkWeight: 1,
    opaque: true,
  });
  stroke(b, [[110, 330], [70, 300], [60, 250], [90, 230]], P.ink, 0.9, "pen");
};

export const tick: DrawFn = (b, { j }) => {
  paint(b, ellipsePts(90, 90, 80, 80, 26, j), { fill: P.orange, opacity: 250, bleed: 0.15, inkWeight: 1.1 });
  stroke(b, [[52, 92], [80, 122], [132, 62]], P.cream, 3.2, "marker", 0);
};

// ── S6 · stickers + the zero ─────────────────────────────────────────────────
const stickerBase: DrawFn = (b, ctx) => {
  paint(b, rrectPts(8, 8, 184, 184, 40, ctx.j), { fill: P.cream, wash: true, opacity: 255, inkWeight: 0.9, opaque: true });
};
export const stickerPhone: DrawFn = (b, ctx) => {
  stickerBase(b, ctx);
  paint(b, rrectPts(70, 30, 60, 120, 14, ctx.j), { fill: P.navy, opacity: 240, inkWeight: 0.8 });
  paint(b, rrectPts(78, 46, 44, 80, 6, ctx.j), { fill: P.orange, wash: true, opacity: 255, ink: null });
};
export const stickerTv: DrawFn = (b, ctx) => {
  stickerBase(b, ctx);
  paint(b, rrectPts(36, 54, 128, 84, 12, ctx.j), { fill: P.blueBright, opacity: 240, inkWeight: 0.9 });
};
export const stickerPill: DrawFn = (b, ctx) => {
  stickerBase(b, ctx);
  paint(b, rrectPts(26, 76, 148, 46, 23, ctx.j), { fill: P.blueBright, opacity: 230, inkWeight: 0.9 });
  paint(b, ellipsePts(54, 99, 12, 12, 12, ctx.j), { ink: P.ink, inkWeight: 0.8 });
};
export const stickerCab: DrawFn = (b, ctx) => {
  stickerBase(b, ctx);
  paint(b, [[32, 120], [50, 84], [140, 84], [168, 110], [168, 134], [32, 134]], { fill: P.orangeLight, opacity: 240, inkWeight: 0.9 });
};
export const stickerTick: DrawFn = (b, ctx) => {
  stickerBase(b, ctx);
  paint(b, ellipsePts(100, 100, 52, 52, 22, ctx.j), { fill: P.orange, opacity: 245, inkWeight: 0.9 });
  stroke(b, [[78, 102], [96, 120], [124, 84]], P.cream, 2.2, "marker", 0);
};

export const ZERO_W = 560;
export const ZERO_H = 760;
export const zero: DrawFn = (b, { j }) => {
  // Thick painted ring: orange outer, ink counter (sits on the ink ground).
  paint(b, ellipsePts(ZERO_W / 2, ZERO_H / 2, 250, 350, 40, j), { fill: P.orange, opacity: 255, bleed: 0.18, texture: 0.5, inkWeight: 1.4 });
  paint(b, ellipsePts(ZERO_W / 2, ZERO_H / 2, 130, 220, 34, j), { fill: P.ink, wash: true, opacity: 255, inkWeight: 1.2 });
  stroke(b, [[150, 200], [120, 330], [140, 470]], P.orangeBright, 2.2, "marker", 0.5);
};

// ── S7–S9 · door, key, light ─────────────────────────────────────────────────
export const DOOR_W = 460;
export const DOOR_H = 800;
export const door: DrawFn = (b, { j }) => {
  const pts = archPts(10, 10, DOOR_W - 20, DOOR_H - 20, j);
  paint(b, pts, { fill: P.slate, opacity: 245, bleed: 0.12, texture: 0.5, inkWeight: 1.3 });
  for (let i = 1; i < 5; i++) {
    const x = 10 + (i * (DOOR_W - 20)) / 5;
    const top = 10 + (DOOR_W - 20) / 2 - Math.sqrt(Math.max(0, ((DOOR_W - 20) / 2) ** 2 - (x - DOOR_W / 2) ** 2));
    stroke(b, [[x + j(2), top + 6], [x + j(2), DOOR_H - 16]], P.navy, 1.1, "2B", 0);
  }
  // Brass lock plate.
  paint(b, rrectPts(DOOR_W - 120, DOOR_H / 2 - 50, 60, 120, 10, j), { fill: P.orangeDeep, opacity: 150, inkWeight: 0.9 });
  paint(b, [[DOOR_W - 96, DOOR_H / 2], [DOOR_W - 84, DOOR_H / 2], [DOOR_W - 82, DOOR_H / 2 + 40], [DOOR_W - 98, DOOR_H / 2 + 40]], {
    fill: P.ink,
    wash: true,
    opacity: 255,
    ink: null,
  });
};
export const KEYHOLE: Pt = [DOOR_W - 90, DOOR_H / 2 + 14];

export const archFrame: DrawFn = (b, { j }) => {
  for (let k = 0; k < 3; k++) {
    paint(b, archPts(14 + k * 8, 14 + k * 8, 572 - k * 16, 932 - k * 8, j), { ink: k === 1 ? P.navy : P.ink, inkWeight: 2.2, inkBrush: "charcoal" });
  }
};

export const silhouette: DrawFn = (b, { j }) => {
  paint(b, ellipsePts(45, 30, 22, 24, 16, j), { fill: P.ink, wash: true, opacity: 255, inkWeight: 0.6, ink: P.sky });
  paint(b, [[18, 58], [72, 58], [86, 150], [70, 200], [20, 200], [4, 150]], { fill: P.ink, wash: true, opacity: 255, inkWeight: 0.6, ink: P.sky });
};

export const KEY_W = 340;
export const KEY_H = 130;
export const key: DrawFn = (b, { j }) => {
  paint(b, ellipsePts(66, 65, 54, 54, 26, j), { fill: P.orangeBright, opacity: 255, bleed: 0.12, inkWeight: 1.2 });
  paint(b, ellipsePts(66, 65, 22, 22, 18, j), { fill: P.ink, wash: true, opacity: 255, inkWeight: 0.8 });
  paint(b, rrectPts(112, 52, 210, 26, 8, j), { fill: P.orange, opacity: 250, inkWeight: 1 });
  paint(b, [[260, 76], [282, 76], [282, 112], [260, 112]], { fill: P.orange, opacity: 250, inkWeight: 0.9 });
  paint(b, [[296, 76], [318, 76], [318, 100], [296, 100]], { fill: P.orange, opacity: 250, inkWeight: 0.9 });
};

export const tape =
  (fill: string): DrawFn =>
  (b, { j }) => {
    paint(b, [[8 + j(2), 6], [38 + j(2), 10], [32 + j(2), 190], [4 + j(2), 186]], { fill, opacity: 230, inkWeight: 0.6 });
  };
export const tapeOrange = tape(P.orangeLight);
export const tapeBlue = tape(P.sky);
export const confetti =
  (fill: string): DrawFn =>
  (b, { j }) => {
    paint(b, ellipsePts(20, 20, 14, 10, 12, j), { fill, opacity: 240, inkWeight: 0.5 });
  };
export const confettiOrange = confetti(P.orange);
export const confettiBlue = confetti(P.blueBright);

// ── S10 · burst ──────────────────────────────────────────────────────────────
export const BURST = 1000;
export const burst: DrawFn = (b, { j }) => {
  const colors = [P.orange, P.blueBright, P.orangeBright, P.navy];
  const n = 18;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + j(0.04);
    const r0 = 150 + j(20);
    const r1 = 470 + j(20);
    stroke(
      b,
      [
        [500 + Math.cos(a) * r0, 500 + Math.sin(a) * r0, 0.6],
        [500 + Math.cos(a + 0.06) * (r0 + r1) * 0.5, 500 + Math.sin(a + 0.06) * (r0 + r1) * 0.5, 1.6],
        [500 + Math.cos(a + 0.1) * r1, 500 + Math.sin(a + 0.1) * r1, 0.4],
      ],
      colors[i % colors.length],
      7,
      "marker",
      0.5,
    );
  }
  paint(b, ellipsePts(500, 500, 210, 170, 30, j), { fill: P.orangePale, opacity: 230, bleed: 0.3, ink: null });
};

// ── S10–S13 · cards ──────────────────────────────────────────────────────────
export const COMPANY_W = 200;
export const COMPANY_H = 270;
export const companyCard =
  (accent: string): DrawFn =>
  (b, { j }) => {
    paint(b, rrectPts(8, 8, COMPANY_W - 16, COMPANY_H - 16, 22, j), { fill: P.cream, wash: true, opacity: 255, inkWeight: 0.9, opaque: true });
    paint(b, ellipsePts(COMPANY_W / 2, 92, 46, 46, 22, j), { fill: accent, opacity: 230, inkWeight: 0.8 });
    stroke(b, [[44, 176], [156, 176]], P.navy, 1.4, "HB", 0);
    stroke(b, [[60, 206], [140, 206]], P.sky, 1.2, "HB", 0);
  };
export const companyCards = [companyCard(P.orange), companyCard(P.blueBright), companyCard(P.navy), companyCard(P.orangeLight)];

export const buyButton: DrawFn = (b, { j }) => {
  paint(b, rrectPts(8, 8, 284, 92, 46, j), { fill: P.orange, opacity: 250, bleed: 0.1, inkWeight: 1.1 });
};

export const thumb: DrawFn = (b, { j }) => {
  paint(b, [[60, 10], [120, 10], [150, 120], [170, 300], [20, 300], [30, 120]].map(([x, y]) => [x + j(2), y + j(2)] as Pt), {
    fill: P.orangeLight,
    opacity: 240,
    inkWeight: 1,
  });
  paint(b, ellipsePts(90, 40, 22, 18, 12, j), { fill: P.orangePale, wash: true, opacity: 255, inkWeight: 0.6 });
};

export const CERT_W = 640;
export const CERT_H = 440;
export const certificateIn =
  (band: string): DrawFn =>
  (b, { j }) => {
    paint(b, rrectPts(10, 10, CERT_W - 20, CERT_H - 20, 8, j), { fill: P.cream, wash: true, opacity: 255, inkWeight: 1.1, ink: P.navy, opaque: true });
    // Engraved border band (guilloche): coloured band with a woven line pattern.
    for (const [x, y, w, h] of [[24, 24, CERT_W - 48, 30], [24, CERT_H - 54, CERT_W - 48, 30], [24, 24, 30, CERT_H - 48], [CERT_W - 54, 24, 30, CERT_H - 48]]) {
      paint(b, rrectPts(x, y, w, h, 3), { fill: band, opacity: 230, bleed: 0.05, texture: 0.3, ink: null, opaque: true });
    }
    for (let k = 0; k < 2; k++) {
      const top: Pt[] = [];
      const bottom: Pt[] = [];
      for (let i = 0; i <= 36; i++) {
        top.push([30 + i * 16.4, 39 + Math.sin(i * 1.3 + k * 2) * 9]);
        bottom.push([30 + i * 16.4, CERT_H - 39 + Math.sin(i * 1.3 + k * 2) * 9]);
      }
      stroke(b, top, P.cream, 0.5, "rotring", 0.5);
      stroke(b, bottom, P.cream, 0.5, "rotring", 0.5);
    }
    paint(b, rrectPts(62, 62, CERT_W - 124, CERT_H - 124, 4, j), { ink: band, inkWeight: 0.6, inkBrush: "rotring" });
    // Heading rules (no text — typeset nothing that isn't in the storyboard).
    stroke(b, [[200, 96], [440, 96]], P.navy, 1.6, "marker", 0);
    stroke(b, [[240, 122], [400, 122]], P.sky, 0.8, "rotring", 0);
    // Blank crest (brand-safe).
    paint(b, ellipsePts(140, 236, 58, 58, 26, j), { fill: P.pale, opacity: 160, ink: band, inkWeight: 0.9, inkBrush: "rotring" });
    dots(b, 140, 236, 40, 40, 22, band, 1.6);
    // "Your name" slot + body lines.
    stroke(b, [[240, 214], [560, 214]], P.navy, 0.8, "rotring", 0);
    for (let k = 0; k < 4; k++) stroke(b, [[240, 248 + k * 22], [560 - k * 40, 248 + k * 22]], P.sky, 0.5, "rotring", 0);
    // Signatures.
    stroke(b, [[240, 352], [270, 334], [290, 356], [320, 338], [340, 352]], P.navy, 0.7, "pen", 0.6);
    // Orange wax seal with ridges.
    paint(b, ellipsePts(CERT_W - 120, CERT_H - 112, 46, 44, 22, j), { fill: P.orange, opacity: 250, bleed: 0.2, inkWeight: 0.9, opaque: true });
    paint(b, ellipsePts(CERT_W - 120, CERT_H - 112, 28, 26, 16, j), { ink: P.orangeDeep, inkWeight: 0.8 });
    stroke(b, [[CERT_W - 150, CERT_H - 70], [CERT_W - 160, CERT_H - 30]], P.orange, 2.4, "marker", 0);
    stroke(b, [[CERT_W - 92, CERT_H - 70], [CERT_W - 80, CERT_H - 32]], P.orange, 2.4, "marker", 0);
  };
export const certificates = [certificateIn(P.navy), certificateIn(P.blueMid), certificateIn(P.orangeDeep), certificateIn(P.slate)];
export const certificate = certificates[0];

// ── S14 · ornate frame ───────────────────────────────────────────────────────
export const FRAME_W = 920;
export const FRAME_H = 640;
export const ornateFrame: DrawFn = (b, { j }) => {
  const BAND = 70;
  paint(b, rrectPts(10, 10, FRAME_W - 20, FRAME_H - 20, 6, j), { fill: P.ink, opacity: 250, ink: P.ink, inkWeight: 1.2, opaque: true });
  paint(b, rrectPts(10 + BAND, 10 + BAND, FRAME_W - 20 - BAND * 2, FRAME_H - 20 - BAND * 2, 4, j), { fill: P.cream, wash: true, opacity: 255, ink: P.cream, inkWeight: 1.2, opaque: true });
  // Floral pattern in the band: vines, leaves and berries in cream.
  const vine = (pts: Pt[]) => stroke(b, pts, P.cream, 0.9, "pen", 0.6);
  const leaf = (x: number, y: number, a: number) =>
    paint(b, [[x, y], [x + Math.cos(a - 0.5) * 16, y + Math.sin(a - 0.5) * 16], [x + Math.cos(a) * 26, y + Math.sin(a) * 26], [x + Math.cos(a + 0.5) * 16, y + Math.sin(a + 0.5) * 16]], {
      fill: P.cream,
      wash: true,
      opacity: 255,
      ink: null,
    });
  const run = (x0: number, y0: number, x1: number, y1: number) => {
    const n = Math.round(Math.hypot(x1 - x0, y1 - y0) / 34);
    const horizontal = Math.abs(y1 - y0) < 1;
    const pts: Pt[] = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const off = Math.sin(i * 1.4) * 14;
      const x = x0 + (x1 - x0) * t + (horizontal ? 0 : off);
      const y = y0 + (y1 - y0) * t + (horizontal ? off : 0);
      pts.push([x, y]);
      if (i % 1 === 0) leaf(x, y, (horizontal ? Math.PI / 2 : 0) * (i % 2 ? 1 : -1) + (i % 2 ? 0 : Math.PI));
      if (i % 3 === 0) paint(b, ellipsePts(x + (horizontal ? 10 : -16), y + (horizontal ? -16 : 10), 5, 5, 8), { fill: P.cream, wash: true, opacity: 255, ink: null });
    }
    vine(pts);
  };
  const m = 10 + BAND / 2;
  run(m + 20, m, FRAME_W - m - 20, m);
  run(m + 20, FRAME_H - m, FRAME_W - m - 20, FRAME_H - m);
  run(m, m + 20, m, FRAME_H - m - 20);
  run(FRAME_W - m, m + 20, FRAME_W - m, FRAME_H - m - 20);
  // Inner engraved rule.
  paint(b, rrectPts(10 + BAND + 14, 10 + BAND + 14, FRAME_W - 20 - BAND * 2 - 28, FRAME_H - 20 - BAND * 2 - 28, 4, j), { ink: P.navy, inkWeight: 0.6, inkBrush: "rotring" });
};

// ── Shared painted strokes ───────────────────────────────────────────────────
export const underline =
  (color: string, w: number): DrawFn =>
  (b, { j }) => {
    stroke(
      b,
      [
        [12, 26 + j(3), 0.7],
        [w * 0.35, 18 + j(4), 1.3],
        [w * 0.7, 24 + j(4), 1.1],
        [w - 12, 16 + j(3), 0.6],
      ],
      color,
      4.2,
      "marker",
      0.5,
    );
  };

export const RIBBON_W = 1600;
export const RIBBON_H = 900;
export const ribbon =
  (color: string): DrawFn =>
  (b, { j }) => {
    for (let k = 0; k < 7; k++) {
      const y = 120 + k * 110;
      stroke(
        b,
        [
          [0, y + j(10), 1],
          [RIBBON_W * 0.5, y + 30 + j(10), 1.4],
          [RIBBON_W, y + j(10), 1],
        ],
        color,
        16,
        "marker",
        0.4,
      );
    }
  };

export const plainCard: DrawFn = (b, { j }) => {
  paint(b, rrectPts(10, 10, CERT_W - 20, CERT_H - 20, 10, j), { fill: P.cream, wash: true, opacity: 255, inkWeight: 1.1, ink: P.navy, opaque: true });
  paint(b, rrectPts(30, 30, CERT_W - 60, CERT_H - 60, 6, j), { ink: P.navy, inkWeight: 0.7, inkBrush: "rotring" });
  paint(b, ellipsePts(CERT_W - 70, CERT_H - 66, 34, 32, 20, j), { fill: P.orange, opacity: 250, bleed: 0.2, inkWeight: 0.9 });
};

export const SPARKLE = 120;
export const sparkle: DrawFn = (b, { j }) => {
  const c = SPARKLE / 2;
  const pts: Pt[] = [];
  for (let i = 0; i < 8; i++) {
    const r = i % 2 === 0 ? 52 + j(3) : 12;
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    pts.push([c + Math.cos(a) * r, c + Math.sin(a) * r]);
  }
  paint(b, pts, { fill: P.orangeBright, opacity: 255, inkWeight: 0.7 });
};

// ── Backdrops (reference: painted sunburst rays, jagged colour burst) ────────
export const BACKDROP = 800;
export const rays =
  (colors: string[], count = 18, opacity = 200): DrawFn =>
  (b, { j }) => {
    const c = BACKDROP / 2;
    for (let i = 0; i < count; i++) {
      const a0 = (i / count) * Math.PI * 2 + j(0.01);
      const a1 = ((i + 0.5) / count) * Math.PI * 2 + j(0.01);
      const R = BACKDROP * 0.75;
      paint(b, [[c, c], [c + Math.cos(a0) * R, c + Math.sin(a0) * R], [c + Math.cos(a1) * R, c + Math.sin(a1) * R]], {
        fill: colors[i % colors.length],
        opacity,
        bleed: 0.18,
        texture: 0.55,
        ink: null,
      });
    }
  };

/** Jagged multi-colour starburst (the drop). */
export const jaggedBurst: DrawFn = (b, { j }) => {
  const c = BACKDROP / 2;
  const k = BACKDROP / 1600;
  const star = (points: number, rOut: number, rIn: number, rot: number): Pt[] =>
    Array.from({ length: points * 2 }, (_, i) => {
      const r = (i % 2 === 0 ? rOut : rIn) * (1 + j(0.06));
      const a = rot + (i / (points * 2)) * Math.PI * 2;
      return [c + Math.cos(a) * r, c + Math.sin(a) * r] as Pt;
    });
  // Colour wedges first, like torn paint.
  const wedgeColors = [P.orange, P.blueBright, P.orangeLight, P.navy, P.sky, P.orangeBright, P.blueMid, P.orangePale];
  for (let i = 0; i < 24; i++) {
    const a0 = (i / 24) * Math.PI * 2 + j(0.03);
    const a1 = a0 + Math.PI / 12 + j(0.03);
    const R = BACKDROP * 0.78;
    paint(b, [[c, c], [c + Math.cos(a0) * R, c + Math.sin(a0) * R], [c + Math.cos(a1) * R, c + Math.sin(a1) * R]], {
      fill: wedgeColors[i % wedgeColors.length],
      opacity: 235,
      bleed: 0.15,
      texture: 0.6,
      ink: null,
    });
  }
  paint(b, star(12, 520 * k, 300 * k, 0.1), { fill: P.orange, opacity: 245, bleed: 0.1, texture: 0.5, ink: null, opaque: true });
  paint(b, star(9, 380 * k, 210 * k, 0.3), { fill: P.orangePale, wash: true, opacity: 255, ink: null, opaque: true });
  // Brush flicks radiating out.
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 + 0.2;
    stroke(b, [[c + Math.cos(a) * 560 * k, c + Math.sin(a) * 560 * k, 1.4], [c + Math.cos(a) * 760 * k, c + Math.sin(a) * 760 * k, 0.3]], i % 2 ? P.cream : P.navy, 5 * k, "marker", 0);
  }
};

/** Shadow / light pool helper drawn as a soft wash. */
export const softShadow: DrawFn = (b, { j }) => {
  paint(b, ellipsePts(200, 40, 190, 30, 24, j), { fill: P.ink, opacity: 70, bleed: 0.3, texture: 0.2, ink: null });
};

export const nightWindow: DrawFn = (b, { j }) => {
  paint(b, rrectPts(10, 10, 260, 320, 10, j), { fill: P.ink, opacity: 255, ink: P.navy, inkWeight: 1.4, opaque: true });
  paint(b, ellipsePts(190, 90, 34, 34, 20, j), { fill: P.orangePale, wash: true, opacity: 255, ink: null, opaque: true });
  paint(b, ellipsePts(204, 80, 30, 30, 20, j), { fill: P.ink, wash: true, opacity: 255, ink: null });
  for (const [x, y] of [[60, 70], [100, 160], [70, 240], [200, 230], [140, 60]] as Pt[]) paint(b, ellipsePts(x, y, 4, 4, 8), { fill: P.sky, wash: true, opacity: 255, ink: null, opaque: true });
  stroke(b, [[140, 14], [140, 326]], P.navy, 1.4, "charcoal", 0);
  stroke(b, [[14, 170], [266, 170]], P.navy, 1.4, "charcoal", 0);
};

export const playGlyph: DrawFn = (b) => {
  paint(b, [[20, 10], [90, 50], [20, 90]], { fill: P.cream, wash: true, opacity: 255, ink: null, opaque: true });
};
