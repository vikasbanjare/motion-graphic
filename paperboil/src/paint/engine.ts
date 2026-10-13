import * as brush from "p5.brush/standalone";

/**
 * Painted-sprite engine on top of p5.brush (standalone build, MIT).
 *
 * p5.brush mixes pigment against white paper, so its canvas is always opaque
 * white. We paint each sprite once per boil variant on a shared WebGL canvas,
 * copy it out and convert white → alpha, then cache the result. Frames just
 * blit the cached variant, so rendering stays fast and deterministic
 * (same seed ⇒ identical pixels).
 */

export type Brush = typeof brush;
export type DrawContext = { w: number; h: number; variant: number; j: (amount?: number) => number };
export type DrawFn = (b: Brush, ctx: DrawContext) => void;

export const BOIL_VARIANTS = 4;
const ENGINE_SIZE = 2048;

let engineCanvas: HTMLCanvasElement | null = null;
let opaqueShapes: Array<Array<[number, number] | [number, number, number]>> = [];

/**
 * Light pigments (cream cards, phone screens) would turn see-through under
 * white→alpha. Shapes painted with `opaque: true` register their outline here;
 * pixels inside them keep full alpha.
 */
export const registerOpaque = (pts: Array<[number, number] | [number, number, number]>) => {
  opaqueShapes.push(pts);
};
const cache = new Map<string, HTMLCanvasElement>();

const hash = (s: string): number => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % 100000;
};

/** Small deterministic PRNG for per-variant geometry jitter (the "re-trace" in a boil). */
const mulberry = (seed: number) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const ensureEngine = (): HTMLCanvasElement => {
  if (!engineCanvas) {
    engineCanvas = document.createElement("canvas");
    engineCanvas.width = ENGINE_SIZE;
    engineCanvas.height = ENGINE_SIZE;
    brush.load(engineCanvas);
    brush.scaleBrushes(2.4);
  }
  return engineCanvas;
};

/** White-paper pigment → straight alpha (GIMP-style colour-to-alpha against white). */
const whiteToAlpha = (ctx: CanvasRenderingContext2D, w: number, h: number, mask: Uint8ClampedArray | null) => {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    if (mask && mask[i + 3] > 127) {
      d[i + 3] = 255;
      continue;
    }
    const srcA = d[i + 3] / 255;
    // Flatten anything already translucent onto white first.
    const r = d[i] * srcA + 255 * (1 - srcA);
    const g = d[i + 1] * srcA + 255 * (1 - srcA);
    const bl = d[i + 2] * srcA + 255 * (1 - srcA);
    const a = Math.max(255 - r, 255 - g, 255 - bl) / 255;
    if (a <= 0.004) {
      d[i + 3] = 0;
      continue;
    }
    d[i] = 255 - (255 - r) / a;
    d[i + 1] = 255 - (255 - g) / a;
    d[i + 2] = 255 - (255 - bl) / a;
    d[i + 3] = Math.round(a * 255);
  }
  ctx.putImageData(img, 0, 0);
};

const buildMask = (w: number, h: number): Uint8ClampedArray | null => {
  if (opaqueShapes.length === 0) return null;
  const m = document.createElement("canvas");
  m.width = w;
  m.height = h;
  const mctx = m.getContext("2d", { willReadFrequently: true });
  if (!mctx) return null;
  mctx.fillStyle = "#000";
  for (const pts of opaqueShapes) {
    mctx.beginPath();
    pts.forEach(([x, y], i) => (i === 0 ? mctx.moveTo(x, y) : mctx.lineTo(x, y)));
    mctx.closePath();
    mctx.fill();
  }
  return mctx.getImageData(0, 0, w, h).data;
};

export const getSprite = (key: string, w: number, h: number, variant: number, draw: DrawFn): HTMLCanvasElement => {
  const id = `${key}|${w}x${h}|${variant}`;
  const hit = cache.get(id);
  if (hit) return hit;
  if (w > ENGINE_SIZE || h > ENGINE_SIZE) throw new Error(`Sprite ${key} is larger than ${ENGINE_SIZE}px`);

  const engine = ensureEngine();
  brush.load(engine);
  const seed = hash(key) * 10 + variant;
  brush.seed(seed);
  brush.noiseSeed(seed);
  const rnd = mulberry(seed);
  const j = (amount = 3) => (rnd() * 2 - 1) * amount;

  opaqueShapes = [];
  brush.clear();
  brush.push();
  brush.translate(-ENGINE_SIZE / 2, -ENGINE_SIZE / 2);
  draw(brush, { w, h, variant, j });
  brush.pop();
  brush.render();

  const out = document.createElement("canvas");
  out.width = w;
  out.height = h;
  const ctx = out.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("No 2D context for sprite output");
  ctx.drawImage(engine, 0, 0, w, h, 0, 0, w, h);
  whiteToAlpha(ctx, w, h, buildMask(w, h));
  cache.set(id, out);
  return out;
};
