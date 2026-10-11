import * as THREE from "three";

/**
 * Drawn surface detail for the v2 detailing pass: greyscale albedo maps the engraving shader turns into line weight.
 * Mid grey (#9f9f9f, ~0.62) is neutral; darker marks engrave deeper (creases, seams, rules, weave), lighter marks lift
 * (tape, labels). Everything is procedural canvas: no text, no logos. Corners stay neutral because merged pieces
 * without UVs sample (0,0).
 */

const canvas = (w: number, h: number) => {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const x = c.getContext("2d")!;
  x.fillStyle = "#9f9f9f";
  x.fillRect(0, 0, w, h);
  return { c, x };
};
const tex = (c: HTMLCanvasElement) => {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
};
const rnd = (seed: number) => {
  let s = seed * 9301 + 49297;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
};
/** Fibre: short random strokes at a tone, the paper's own grain. */
const fibres = (x: CanvasRenderingContext2D, w: number, h: number, n: number, tone: string, seed: number, len = 14) => {
  const r = rnd(seed);
  x.strokeStyle = tone;
  x.lineWidth = 1;
  for (let i = 0; i < n; i++) {
    const px = r() * w, py = r() * h, a = (r() - 0.5) * 0.9, L = len * (0.4 + r());
    x.beginPath();
    x.moveTo(px, py);
    x.lineTo(px + Math.cos(a) * L, py + Math.sin(a) * L);
    x.stroke();
  }
};
const cache = new Map<string, THREE.CanvasTexture>();
const memo = (key: string, make: () => HTMLCanvasElement) => {
  let t = cache.get(key);
  if (!t) {
    t = tex(make());
    cache.set(key, t);
  }
  return t;
};

/** Corrugated cardboard: fibre, a tape band, a shipping label with rules, creases and worn corners. */
export const kraft = (seed = 1) =>
  memo(`kraft${seed}`, () => {
    const { c, x } = canvas(1024, 1024);
    fibres(x, 1024, 1024, 2600, "rgba(60,60,60,0.22)", seed, 18);
    fibres(x, 1024, 1024, 1200, "rgba(230,230,230,0.25)", seed + 7, 12);
    // creases along the flaps
    x.strokeStyle = "rgba(40,40,40,0.55)";
    x.lineWidth = 6;
    [0.5].forEach((f) => {
      x.beginPath();
      x.moveTo(0, 1024 * f);
      x.lineTo(1024, 1024 * f + 6);
      x.stroke();
    });
    x.lineWidth = 3;
    x.strokeStyle = "rgba(40,40,40,0.35)";
    for (let i = 1; i < 4; i++) {
      x.beginPath();
      x.moveTo(1024 * (i / 4), 0);
      x.lineTo(1024 * (i / 4) + 4, 1024);
      x.stroke();
    }
    // tape: lighter band with dark edges
    x.fillStyle = "rgba(225,225,225,0.55)";
    x.fillRect(430, 0, 160, 1024);
    x.strokeStyle = "rgba(50,50,50,0.5)";
    x.lineWidth = 3;
    x.strokeRect(430, -2, 160, 1028);
    // label: light rectangle with rule lines and a block (no text)
    x.fillStyle = "rgba(235,235,235,0.9)";
    x.fillRect(640, 620, 300, 200);
    x.strokeStyle = "rgba(45,45,45,0.8)";
    x.lineWidth = 3;
    x.strokeRect(640, 620, 300, 200);
    for (let i = 0; i < 5; i++) {
      x.lineWidth = i === 0 ? 5 : 2;
      x.beginPath();
      x.moveTo(665, 655 + i * 32);
      x.lineTo(665 + (i === 0 ? 150 : 250 - (i % 2) * 60), 655 + i * 32);
      x.stroke();
    }
    // a small stamp block
    x.strokeStyle = "rgba(45,45,45,0.6)";
    x.lineWidth = 2;
    x.strokeRect(110, 110, 120, 120);
    x.beginPath();
    x.arc(170, 170, 42, 0, Math.PI * 2);
    x.stroke();
    // worn corners
    const g = x.createRadialGradient(0, 0, 0, 0, 0, 160);
    g.addColorStop(0, "rgba(60,60,60,0.35)");
    g.addColorStop(1, "rgba(60,60,60,0)");
    x.fillStyle = g;
    x.fillRect(0, 0, 160, 160);
    return c;
  });

/** Paper shopping bag: fine wavy guilloche field, a lighter label with rules, a stitched rim. */
export const bagPaper = (seed = 2) =>
  memo(`bag${seed}`, () => {
    const { c, x } = canvas(1024, 1024);
    fibres(x, 1024, 1024, 1600, "rgba(70,70,70,0.14)", seed, 10);
    x.strokeStyle = "rgba(55,55,55,0.42)";
    x.lineWidth = 2.2;
    for (let row = 0; row < 48; row++) {
      x.beginPath();
      for (let i = 0; i <= 128; i++) {
        const px = (i / 128) * 1024, py = 60 + row * 19 + 7 * Math.sin(i * 0.19 + row * 0.6);
        if (i) x.lineTo(px, py);
        else x.moveTo(px, py);
      }
      x.stroke();
    }
    // the label: light panel, double rule, a crest circle
    x.fillStyle = "rgba(232,232,232,0.92)";
    x.fillRect(312, 360, 400, 300);
    x.strokeStyle = "rgba(45,45,45,0.85)";
    x.lineWidth = 4;
    x.strokeRect(312, 360, 400, 300);
    x.lineWidth = 1.5;
    x.strokeRect(326, 374, 372, 272);
    x.beginPath();
    x.arc(512, 470, 54, 0, Math.PI * 2);
    x.stroke();
    x.beginPath();
    x.arc(512, 470, 40, 0, Math.PI * 2);
    x.stroke();
    for (let i = 0; i < 3; i++) {
      x.lineWidth = i === 0 ? 4 : 2;
      x.beginPath();
      x.moveTo(400 + i * 20, 560 + i * 26);
      x.lineTo(624 - i * 20, 560 + i * 26);
      x.stroke();
    }
    // stitched rim at the top
    x.fillStyle = "rgba(40,40,40,0.7)";
    for (let i = 0; i < 40; i++) x.fillRect(16 + i * 25, 18, 10, 4);
    x.strokeStyle = "rgba(40,40,40,0.6)";
    x.lineWidth = 3;
    x.beginPath();
    x.moveTo(0, 34);
    x.lineTo(1024, 34);
    x.stroke();
    return c;
  });

/** Wrapping paper: a small repeating diamond-and-dot motif, low contrast. */
export const giftPaper = (seed = 3) =>
  memo(`gift${seed}`, () => {
    const { c, x } = canvas(1024, 1024);
    fibres(x, 1024, 1024, 900, "rgba(70,70,70,0.1)", seed, 8);
    x.strokeStyle = "rgba(50,50,50,0.5)";
    x.lineWidth = 2;
    const s = 64;
    for (let j = 0; j < 16; j++)
      for (let i = 0; i < 16; i++) {
        const cx = i * s + s / 2, cy = j * s + s / 2;
        x.beginPath();
        x.moveTo(cx, cy - 18);
        x.lineTo(cx + 18, cy);
        x.lineTo(cx, cy + 18);
        x.lineTo(cx - 18, cy);
        x.closePath();
        x.stroke();
        x.fillStyle = "rgba(50,50,50,0.5)";
        x.beginPath();
        x.arc(cx + s / 2, cy + s / 2, 3.5, 0, Math.PI * 2);
        x.fill();
      }
    return c;
  });

/** Satin ribbon: a diagonal weave of fine lines, lighter base so the foil reads. */
export const ribbon = (seed = 4) =>
  memo(`ribbon${seed}`, () => {
    const { c, x } = canvas(512, 512);
    x.fillStyle = "#b4b4b4";
    x.fillRect(0, 0, 512, 512);
    x.strokeStyle = "rgba(60,60,60,0.35)";
    x.lineWidth = 1.5;
    for (let i = -64; i < 128; i++) {
      x.beginPath();
      x.moveTo(i * 8, 0);
      x.lineTo(i * 8 + 512, 512);
      x.stroke();
      x.beginPath();
      x.moveTo(i * 8 + 512, 0);
      x.lineTo(i * 8, 512);
      x.stroke();
    }
    // selvedge lines along both edges
    x.strokeStyle = "rgba(40,40,40,0.7)";
    x.lineWidth = 5;
    [8, 504].forEach((y) => {
      x.beginPath();
      x.moveTo(0, y);
      x.lineTo(512, y);
      x.stroke();
    });
    void seed;
    return c;
  });

/** Hot-air balloon envelope: gore seams around, a decorative diamond band, tone per gore. */
export const balloonSeams = (seed = 5) =>
  memo(`balloon${seed}`, () => {
    const { c, x } = canvas(1024, 1024);
    const gores = 16;
    for (let g = 0; g < gores; g++) {
      x.fillStyle = `rgba(${g % 2 ? 150 : 170},${g % 2 ? 150 : 170},${g % 2 ? 150 : 170},0.6)`;
      x.fillRect((g / gores) * 1024, 0, 1024 / gores + 1, 1024);
    }
    x.strokeStyle = "rgba(35,35,35,0.8)";
    x.lineWidth = 4;
    for (let g = 0; g <= gores; g++) {
      x.beginPath();
      x.moveTo((g / gores) * 1024, 0);
      x.lineTo((g / gores) * 1024, 1024);
      x.stroke();
    }
    // band of diamonds at two thirds height, and a double rule
    x.lineWidth = 3;
    for (let g = 0; g < gores; g++) {
      const cx = ((g + 0.5) / gores) * 1024, cy = 380;
      x.beginPath();
      x.moveTo(cx, cy - 26);
      x.lineTo(cx + 20, cy);
      x.lineTo(cx, cy + 26);
      x.lineTo(cx - 20, cy);
      x.closePath();
      x.stroke();
    }
    [330, 430].forEach((y) => {
      x.beginPath();
      x.moveTo(0, y);
      x.lineTo(1024, y);
      x.stroke();
    });
    fibres(x, 1024, 1024, 1400, "rgba(70,70,70,0.12)", seed, 10);
    return c;
  });

/** Cloud: stipple that thickens toward the underside. */
export const cloudStipple = (seed = 6) =>
  memo(`cloud${seed}`, () => {
    const { c, x } = canvas(512, 512);
    x.fillStyle = "#b8b8b8";
    x.fillRect(0, 0, 512, 512);
    const r = rnd(seed);
    for (let i = 0; i < 9000; i++) {
      const px = r() * 512, py = r() * 512;
      const dens = Math.pow(py / 512, 1.6); // v = 0 at the bottom of a sphere's uv? LatheGeometry/Sphere: v grows upward
      if (r() > 0.25 + 0.75 * (1 - dens)) continue;
      x.fillStyle = "rgba(50,50,50,0.5)";
      x.beginPath();
      x.arc(px, py, 1.2 + r() * 1.6, 0, Math.PI * 2);
      x.fill();
    }
    return c;
  });

/** Globe relief: land tone with hatched relief and a graticule, drawn over the land mask. */
export const globeRelief = (land: THREE.Texture) =>
  memo("globeRelief", () => {
    const src = land.image as HTMLCanvasElement;
    const { c, x } = canvas(src.width, src.height);
    x.fillStyle = "#7a7a7a";
    x.fillRect(0, 0, c.width, c.height);
    // oceans: fine horizontal wave lines (engraved sea)
    x.strokeStyle = "rgba(40,40,40,0.35)";
    x.lineWidth = 2;
    for (let row = 0; row < c.height / 14; row++) {
      x.beginPath();
      for (let i = 0; i <= 256; i++) {
        const px = (i / 256) * c.width, py = row * 14 + 4 * Math.sin(i * 0.25 + row);
        if (i) x.lineTo(px, py);
        else x.moveTo(px, py);
      }
      x.stroke();
    }
    // land: lighter, with short relief hatching inside the mask
    x.save();
    x.globalCompositeOperation = "source-over";
    const maskC = document.createElement("canvas");
    maskC.width = c.width;
    maskC.height = c.height;
    const mx = maskC.getContext("2d")!;
    mx.fillStyle = "#c4c4c4";
    mx.fillRect(0, 0, c.width, c.height);
    fibres(mx, c.width, c.height, 26000, "rgba(40,40,40,0.5)", 11, 9);
    mx.globalCompositeOperation = "destination-in";
    mx.drawImage(src, 0, 0);
    x.drawImage(maskC, 0, 0);
    x.restore();
    // coastline
    x.save();
    x.globalCompositeOperation = "source-over";
    const edge = document.createElement("canvas");
    edge.width = c.width;
    edge.height = c.height;
    const ex = edge.getContext("2d")!;
    ex.drawImage(src, 0, 0);
    ex.globalCompositeOperation = "destination-out";
    ex.drawImage(src, -3, -3);
    ex.globalCompositeOperation = "source-in";
    ex.fillStyle = "#1e1e1e";
    ex.fillRect(0, 0, c.width, c.height);
    x.drawImage(edge, 0, 0);
    x.restore();
    // graticule
    x.strokeStyle = "rgba(30,30,30,0.55)";
    x.lineWidth = 3;
    for (let lon = -180; lon <= 180; lon += 15) {
      const X = ((lon + 180) / 360) * c.width;
      x.beginPath();
      x.moveTo(X, 0);
      x.lineTo(X, c.height);
      x.stroke();
    }
    for (let lat = -75; lat <= 75; lat += 15) {
      const Y = ((90 - lat) / 180) * c.height;
      x.beginPath();
      x.moveTo(0, Y);
      x.lineTo(c.width, Y);
      x.stroke();
    }
    return c;
  });
