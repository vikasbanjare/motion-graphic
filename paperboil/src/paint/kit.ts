import { palette } from "../palette";
import { registerOpaque, type Brush, type DrawContext } from "./engine";

/** Shared painting helpers so every object reads as the same hand. */

export type Pt = [number, number] | [number, number, number];

export const INK: string = palette.ink;

export const ellipsePts = (cx: number, cy: number, rx: number, ry: number, n = 28, j?: DrawContext["j"]): Pt[] =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return [cx + Math.cos(a) * rx + (j ? j(1.5) : 0), cy + Math.sin(a) * ry + (j ? j(1.5) : 0)] as Pt;
  });

export const rrectPts = (x: number, y: number, w: number, h: number, r: number, j?: DrawContext["j"]): Pt[] => {
  const pts: Pt[] = [];
  const corner = (cx: number, cy: number, a0: number) => {
    for (let i = 0; i <= 5; i++) {
      const a = a0 + (i / 5) * (Math.PI / 2);
      pts.push([cx + Math.cos(a) * r + (j ? j(1.2) : 0), cy + Math.sin(a) * r + (j ? j(1.2) : 0)]);
    }
  };
  corner(x + w - r, y + r, -Math.PI / 2);
  corner(x + w - r, y + h - r, 0);
  corner(x + r, y + h - r, Math.PI / 2);
  corner(x + r, y + r, Math.PI);
  return pts;
};

/** Arched door / archway outline: flat bottom, semicircular top. */
export const archPts = (x: number, y: number, w: number, h: number, j?: DrawContext["j"]): Pt[] => {
  const r = w / 2;
  const pts: Pt[] = [[x, y + h]];
  for (let i = 0; i <= 16; i++) {
    const a = Math.PI + (i / 16) * Math.PI;
    pts.push([x + r + Math.cos(a) * r + (j ? j(1.2) : 0), y + r + Math.sin(a) * r + (j ? j(1.2) : 0)]);
  }
  pts.push([x + w, y + h]);
  return pts;
};

type PaintOpts = {
  fill?: string;
  opacity?: number;
  bleed?: number;
  texture?: number;
  ink?: string | null;
  inkWeight?: number;
  inkBrush?: string;
  wash?: boolean;
  /** Keep the inside fully opaque (light pigments on dark grounds). */
  opaque?: boolean;
};

/** Fill a closed polygon with watercolour, then trace it with a wobbly ink line. */
export const paint = (b: Brush, pts: Pt[], o: PaintOpts = {}) => {
  const { fill, opacity = 210, bleed = 0.12, texture = 0.35, ink = INK, inkWeight = 1.6, inkBrush = "pen", wash, opaque } = o;
  if (opaque) registerOpaque(pts);
  if (fill) {
    b.noStroke();
    if (wash) {
      b.noFill();
      b.wash(fill, opacity);
    } else {
      // Flat base wash under the watercolour so colours hit their palette value.
      b.noFill();
      b.wash(fill, opacity);
      b.polygon(pts);
      b.noWash();
      b.fill(fill, opacity);
      b.fillBleed(bleed);
      b.fillTexture(texture, 0.35);
    }
    b.polygon(pts);
    b.noFill();
    b.noWash();
  }
  if (ink) {
    b.set(inkBrush, ink, inkWeight);
    b.polygon(pts);
    b.noStroke();
  }
};

/** An open ink/brush line through points. */
export const stroke = (b: Brush, pts: Pt[], color = INK, weight = 1.1, brushName = "pen", curvature = 0.4) => {
  b.noFill();
  b.noWash();
  b.set(brushName, color, weight);
  b.spline(pts, curvature);
  b.noStroke();
};

/** Dotted hatching for shading (reference trait). */
export const dots = (b: Brush, cx: number, cy: number, rx: number, ry: number, n: number, color = INK, r = 2.2) => {
  b.noStroke();
  b.noFill();
  // Deterministic sunflower spread so dots don't clump.
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const a = i * 2.39996;
    const d = Math.sqrt(t);
    b.wash(color, 200);
    b.circle(cx + Math.cos(a) * rx * d, cy + Math.sin(a) * ry * d, r);
  }
  b.noWash();
};
