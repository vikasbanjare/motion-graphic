import * as THREE from "three";

/**
 * The card's face art (original, no logos), drawn once to a canvas so the flat 2D card and the 3D card share the exact
 * same design: the flat-to-3D switch has nothing to hide. Two finishes:
 *   print: the engraved-print world (green ink on cream paper, 45 deg line screen), as the film's flat worlds;
 *   metal: the real card (graphite metal, light engraving, gold chip, thin foil stripe).
 */
export const FACE_W = 1712;
export const FACE_H = 1080;
export type Finish = "print" | "metal";

const FIN = {
  print: { bg0: "#f1eedf", bg1: "#e3e8d2", ink: "#2c5537", ink2: "rgba(44,85,55,", chip0: "#e9e3c6", chip1: "#c9c09a", chipInk: "#2c5537", foilA: 0.55 },
  metal: { bg0: "#3a3b42", bg1: "#1d1e23", ink: "#c9c9d2", ink2: "rgba(214,214,226,", chip0: "#e6d39d", chip1: "#a8894c", chipInk: "rgba(70,52,20,0.75)", foilA: 1 },
};

const BAND = ["#f1caca", "#fbd8b9", "#fcd8a3", "#ebdbaf", "#c7e5d2", "#a3c8e4", "#8daad3", "#a49cd7", "#f1caca"];

const rr = (x: CanvasRenderingContext2D, X: number, Y: number, w: number, h: number, r: number) => {
  x.beginPath();
  x.roundRect(X, Y, w, h, r);
};

/** Tone field for the line screen: darker toward the lower-left, clean highlight across the middle. 0 = dark, 1 = light. */
const tone = (u: number, v: number) => {
  const d = Math.hypot(u - 0.62, v - 0.38);
  return Math.min(1, Math.max(0, 0.12 + 1.5 * d * d - 0.08 * Math.sin(u * 7 + v * 3) + v * 0.12 - u * 0.1));
};

export const drawFace = (finish: Finish): HTMLCanvasElement => {
  const F = FIN[finish];
  const W = FACE_W, H = FACE_H;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const x = c.getContext("2d")!;
  x.save();
  rr(x, 0, 0, W, H, 64);
  x.clip();
  const g = x.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, F.bg0);
  g.addColorStop(1, F.bg1);
  x.fillStyle = g;
  x.fillRect(0, 0, W, H);

  // 45 deg line screen; thickness follows the tone field (thicker = darker), vanishing in the highlight
  const pitch = finish === "print" ? 12 : 9;
  x.strokeStyle = F.ink;
  x.lineCap = "butt";
  for (let k = -H; k < W + H; k += pitch) {
    for (let s = 0; s < H + W; s += 14) {
      // walk along the "/" diagonal: from (k, H) up-right
      const px = k + s * 0.7071, py = H - s * 0.7071;
      if (px < -20 || px > W + 20 || py < -20 || py > H + 20) continue;
      const t = tone(px / W, py / H);
      const w = Math.max(0, (finish === "print" ? 7.5 : 2.4) * ((finish === "print" ? 0.98 : 0.82) - t));
      if (w < 0.25) continue;
      x.globalAlpha = finish === "print" ? 0.9 : 0.22;
      x.lineWidth = w;
      x.beginPath();
      x.moveTo(px, py);
      x.lineTo(px + 14 * 0.7071, py - 14 * 0.7071);
      x.stroke();
    }
  }
  x.globalAlpha = 1;

  // guilloche rosette (top right)
  const cx = 1330, cy = 380;
  for (let i = 0; i < 34; i++) {
    const R = 120 + i * 6.4;
    x.strokeStyle = F.ink2 + (finish === "print" ? 0.75 : 0.42) + ")";
    x.lineWidth = finish === "print" ? 1.6 : 1.3;
    x.beginPath();
    for (let k = 0; k <= 720; k++) {
      const a = (k / 720) * Math.PI * 2;
      const r = R + 22 * Math.sin(18 * a + i * 0.21);
      const X = cx + r * Math.cos(a), Y = cy + r * Math.sin(a);
      if (k) x.lineTo(X, Y);
      else x.moveTo(X, Y);
    }
    x.stroke();
  }
  // clear centre of the rosette with a fine star
  x.fillStyle = F.bg0;
  x.beginPath();
  x.arc(cx, cy, 104, 0, Math.PI * 2);
  x.fill();
  x.strokeStyle = F.ink2 + "0.8)";
  x.lineWidth = 1.4;
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    x.beginPath();
    x.moveTo(cx + 22 * Math.cos(a), cy + 22 * Math.sin(a));
    x.quadraticCurveTo(cx + 70 * Math.cos(a + 0.5), cy + 70 * Math.sin(a + 0.5), cx + 98 * Math.cos(a + 0.18), cy + 98 * Math.sin(a + 0.18));
    x.stroke();
  }

  // double engraved border
  x.strokeStyle = F.ink2 + (finish === "print" ? 0.85 : 0.35) + ")";
  x.lineWidth = 3;
  rr(x, 38, 38, W - 76, H - 76, 40);
  x.stroke();
  x.lineWidth = 1.2;
  rr(x, 52, 52, W - 104, H - 104, 32);
  x.stroke();

  // thin diagonal foil stripe
  x.save();
  x.translate(1130, H / 2);
  x.rotate((-62 * Math.PI) / 180);
  const sg = x.createLinearGradient(-700, 0, 700, 0);
  BAND.forEach((col, i) => sg.addColorStop(i / (BAND.length - 1), col));
  x.globalAlpha = F.foilA;
  x.fillStyle = sg;
  x.fillRect(-760, -17, 1520, 34);
  x.globalAlpha = 1;
  x.restore();

  // chip
  const chx = 210, chy = 420, chw = 220, chh = 168;
  const cg = x.createLinearGradient(chx, chy, chx + chw, chy + chh);
  cg.addColorStop(0, F.chip0);
  cg.addColorStop(0.55, F.chip1);
  cg.addColorStop(1, F.chip0);
  x.fillStyle = cg;
  rr(x, chx, chy, chw, chh, 28);
  x.fill();
  x.strokeStyle = F.chipInk;
  x.lineWidth = 3;
  rr(x, chx, chy, chw, chh, 28);
  x.stroke();
  x.beginPath();
  x.moveTo(chx + chw / 2, chy); x.lineTo(chx + chw / 2, chy + 52);
  x.moveTo(chx, chy + 60); x.lineTo(chx + 78, chy + 60); x.moveTo(chx + chw - 78, chy + 60); x.lineTo(chx + chw, chy + 60);
  x.moveTo(chx, chy + 110); x.lineTo(chx + 78, chy + 110); x.moveTo(chx + chw - 78, chy + 110); x.lineTo(chx + chw, chy + 110);
  x.moveTo(chx + chw / 2, chy + 118); x.lineTo(chx + chw / 2, chy + chh);
  x.stroke();
  x.strokeRect(chx + 78, chy + 52, chw - 156, 66);

  // contactless waves
  x.lineWidth = 7;
  x.lineCap = "round";
  x.strokeStyle = F.ink2 + (finish === "print" ? 0.85 : 0.6) + ")";
  for (let i = 0; i < 4; i++) {
    x.beginPath();
    x.arc(chx + chw + 40, chy + chh / 2, 26 + i * 22, -0.75, 0.75);
    x.stroke();
  }
  x.restore();
  return c;
};

const cache: Partial<Record<Finish, { url: string; tex: THREE.CanvasTexture }>> = {};

/** Data URL (for the 2D card) and a texture (for the 3D card) of one finish; drawn once per page. */
export const face = (finish: Finish) => {
  if (!cache[finish]) {
    const c = drawFace(finish);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    cache[finish] = { url: c.toDataURL("image/png"), tex };
  }
  return cache[finish]!;
};
