import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/** Procedural subjects (from the research lab prototype, original code) for the engraved-3D film. Units are arbitrary; every builder returns plain BufferGeometry. */

type P = [number, number];
const V2 = (p: P) => new THREE.Vector2(p[0], p[1]);

/** Arc of profile points around (cx, cy) from a0 to a1 degrees. */
export const arc = (cx: number, cy: number, r: number, a0: number, a1: number, n = 10): P[] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const a = THREE.MathUtils.degToRad(a0 + ((a1 - a0) * i) / n);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as P;
  });

export const lathe = (pts: P[], seg = 96) => {
  const g = new THREE.LatheGeometry(pts.map(V2), seg);
  g.computeVertexNormals();
  return g;
};

const merge = (gs: THREE.BufferGeometry[]) => {
  // Strip to position/normal/uv so mixed builders merge.
  const clean = gs.map((g) => {
    const n = g.index ? g.toNonIndexed() : g.clone();
    for (const k of Object.keys(n.attributes)) if (!["position", "normal", "uv"].includes(k)) n.deleteAttribute(k);
    if (!n.getAttribute("uv")) n.setAttribute("uv", new THREE.Float32BufferAttribute(new Float32Array((n.getAttribute("position").count) * 2), 2));
    return n;
  });
  return mergeGeometries(clean, false)!;
};

/** Rounded rectangle shape (centred). */
export const roundRect = (w: number, h: number, r: number) => {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
};

/** Planar UVs over the XY bounding box (for front-face art on extrusions). */
export const planarUV = (g: THREE.BufferGeometry) => {
  g.computeBoundingBox();
  const b = g.boundingBox!;
  const pos = g.getAttribute("position");
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (pos.getX(i) - b.min.x) / (b.max.x - b.min.x);
    uv[i * 2 + 1] = (pos.getY(i) - b.min.y) / (b.max.y - b.min.y);
  }
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  return g;
};

/** ISO/IEC 7810 ID-1 proportions (85.60 x 53.98 mm), 1 unit = 1 cm. */
export const cardBody = () => {
  const g = new THREE.ExtrudeGeometry(roundRect(8.56, 5.398, 0.32), {
    depth: 0.06,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
    curveSegments: 10,
  });
  g.translate(0, 0, -0.03);
  g.computeVertexNormals();
  return planarUV(g);
};

/** EMV-style contact chip: plate + 6 raised pads separated by grooves. */
export const chip = () => {
  const plate = new THREE.ExtrudeGeometry(roundRect(1.2, 0.92, 0.14), { depth: 0.02, bevelEnabled: false, curveSegments: 6 });
  const pads: THREE.BufferGeometry[] = [];
  const pw = 0.5, ph = 0.24;
  for (let cx = 0; cx < 2; cx++)
    for (let cy = 0; cy < 3; cy++) {
      const g = new THREE.ExtrudeGeometry(roundRect(pw, ph, 0.03), {
        depth: 0.012,
        bevelEnabled: true,
        bevelThickness: 0.004,
        bevelSize: 0.004,
        bevelSegments: 1,
        curveSegments: 4,
      });
      g.translate((cx - 0.5) * 0.56, (cy - 1) * 0.28, 0.02);
      pads.push(g);
    }
  return merge([plate, ...pads]);
};

/** Coin with raised rim, beaded border and reeded edge. Radius 1, thickness 0.16. */
export const coin = (reeds = 120) => {
  const t = 0.16;
  const prof: P[] = [[0, -t / 2], [0.94, -t / 2], [1.0, -t / 2 + 0.01], [1.0, t / 2 - 0.01], [0.97, t / 2], [0.88, t / 2], [0.86, t / 2 - 0.03], [0, t / 2 - 0.03]];
  const g = lathe(prof, reeds * 4);
  // Reeding on the vertical edge only.
  const pos = g.getAttribute("position") as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const r = Math.hypot(x, z);
    if (r < 0.985) continue;
    const th = Math.atan2(z, x);
    const k = Math.abs(y) < t / 2 - 0.005 ? 1 : 0.3;
    const r2 = r - 0.012 * k * (0.5 + 0.5 * Math.cos(th * reeds));
    pos.setXYZ(i, (x / r) * r2, y, (z / r) * r2);
  }
  g.computeVertexNormals();
  // Beaded border on the field.
  const beads: THREE.BufferGeometry[] = [];
  const nb = 72;
  for (let i = 0; i < nb; i++) {
    const a = (i / nb) * Math.PI * 2;
    beads.push(new THREE.SphereGeometry(0.022, 8, 6).scale(1, 0.6, 1).translate(Math.cos(a) * 0.8, t / 2 - 0.03, Math.sin(a) * 0.8));
  }
  return merge([g, ...beads]);
};

/** Laurel ring of leaves (ellipsoids) lying on the coin face. */
export const laurel = (radius = 0.66, leaves = 26, y = 0.05) => {
  const out: THREE.BufferGeometry[] = [];
  for (const side of [-1, 1])
    for (let i = 0; i < leaves / 2; i++) {
      const a = Math.PI * 1.5 + side * (0.25 + (i / (leaves / 2)) * 2.4);
      const leaf = new THREE.SphereGeometry(0.06, 10, 6).scale(1, 0.25, 0.45);
      leaf.rotateY(-a + side * 0.6);
      leaf.translate(Math.cos(a) * radius, y, Math.sin(a) * radius);
      out.push(leaf);
    }
  return merge(out);
};

/** Bit key with ornate bow (torus + beads), collar rings and stepped bit. Long axis = X. */
export const key = () => {
  const bow = new THREE.TorusGeometry(0.55, 0.12, 16, 64);
  const inner = new THREE.TorusGeometry(0.3, 0.05, 12, 48);
  const beads: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    beads.push(new THREE.SphereGeometry(0.075, 12, 8).translate(Math.cos(a) * 0.73, Math.sin(a) * 0.73, 0));
  }
  const shaftPts: P[] = [[0, 0], [0.13, 0], [0.13, 0.12], [0.17, 0.16], [0.17, 0.24], [0.13, 0.28], [0.1, 0.32], [0.1, 2.6], [0.13, 2.65], [0.13, 2.75], [0.1, 2.8], [0.1, 3.3], [0, 3.32]];
  const shaft = lathe(shaftPts, 32).rotateZ(-Math.PI / 2).translate(0.6, 0, 0);
  const bs = new THREE.Shape();
  bs.moveTo(0, 0); bs.lineTo(0.75, 0); bs.lineTo(0.75, -0.25); bs.lineTo(0.55, -0.25); bs.lineTo(0.55, -0.5); bs.lineTo(0.75, -0.5); bs.lineTo(0.75, -0.75); bs.lineTo(0.3, -0.75); bs.lineTo(0.3, -0.45); bs.lineTo(0.15, -0.45); bs.lineTo(0.15, -0.75); bs.lineTo(0, -0.75); bs.lineTo(0, 0);
  const bit = new THREE.ExtrudeGeometry(bs, { depth: 0.12, bevelEnabled: true, bevelSize: 0.015, bevelThickness: 0.015, bevelSegments: 1 }).translate(3.05, -0.05, -0.06);
  return merge([bow, inner, ...beads, shaft, bit]);
};

/** Hotel desk bell: stepped base, dome, plunger. */
export const hotelBell = () => {
  const base = lathe([[0, 0], [1.3, 0], ...arc(1.3, 0.1, 0.1, -90, 90, 8), [1.2, 0.22], [1.0, 0.26], [0.98, 0.32], [0, 0.32]], 128);
  const domePts: P[] = [];
  for (let i = 0; i <= 40; i++) {
    const a = (i / 40) * Math.PI * 0.5;
    domePts.push([0.95 * Math.cos(a) + 0.03 * (1 - i / 40), 0.32 + 0.82 * Math.sin(a)]);
  }
  domePts.unshift([0.99, 0.32]);
  const dome = lathe(domePts, 128);
  const plunger = lathe([[0, 1.1], [0.07, 1.1], [0.07, 1.42], ...arc(0, 1.5, 0.16, -60, 90, 10)], 48);
  return merge([base, dome, plunger]);
};

/** Gift box: body, lid, crossing ribbons, bow loops and tails. */
export const giftBox = () => {
  const body = new THREE.BoxGeometry(2, 1.5, 2, 2, 2, 2).translate(0, 0.75, 0);
  const lid = new THREE.BoxGeometry(2.12, 0.35, 2.12).translate(0, 1.6, 0);
  const r1 = new THREE.BoxGeometry(0.3, 1.82, 2.16).translate(0, 0.91, 0);
  const r2 = new THREE.BoxGeometry(2.16, 1.82, 0.3).translate(0, 0.91, 0);
  const loop = (rot: number) => {
    const g = new THREE.TorusGeometry(0.42, 0.09, 12, 48, Math.PI * 1.7).scale(1, 0.75, 0.45);
    g.rotateZ(-0.3);
    g.translate(0.42, 0.1, 0);
    g.rotateY(rot);
    return g.translate(0, 1.85, 0);
  };
  const knot = new THREE.SphereGeometry(0.18, 16, 12).scale(1, 0.8, 1).translate(0, 1.88, 0);
  return { box: merge([body, lid]), ribbon: merge([r1, r2, loop(0.3), loop(Math.PI + 0.3), loop(Math.PI / 2 + 0.6), knot]) };
};

/** Airliner from turned and extruded parts; nose = +X. */
export const airplane = () => {
  const fus: P[] = [];
  for (let i = 0; i <= 80; i++) {
    const t = i / 80; // 0 tail .. 1 nose
    let r = 0.42;
    if (t < 0.22) r = 0.42 * Math.pow(t / 0.22, 0.6) * 0.85 + 0.06;
    if (t > 0.86) r = 0.42 * Math.sqrt(Math.max(0, 1 - ((t - 0.86) / 0.14) ** 2));
    fus.push([r, -4 + t * 8]);
  }
  fus.unshift([0, -4]);
  const fuselage = lathe(fus, 64).rotateZ(-Math.PI / 2);
  fuselage.translate(0, 0, 0);
  const planform = (span: number, root: number, tip: number, sweep: number) => {
    const s = new THREE.Shape();
    s.moveTo(0, 0); s.lineTo(-sweep, span); s.lineTo(-sweep - tip, span); s.lineTo(-root, 0); s.lineTo(0, 0);
    return s;
  };
  const wingR = new THREE.ExtrudeGeometry(planform(4.2, 1.7, 0.45, 1.9), { depth: 0.1, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 2 });
  wingR.rotateX(Math.PI / 2).translate(0.9, -0.15, 0);
  const wingL = wingR.clone().scale(1, 1, -1);
  const tailR = new THREE.ExtrudeGeometry(planform(1.5, 0.9, 0.35, 0.8), { depth: 0.06, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 1 });
  tailR.rotateX(Math.PI / 2).translate(-3.0, 0.15, 0);
  const tailL = tailR.clone().scale(1, 1, -1);
  const fin = new THREE.ExtrudeGeometry(planform(1.7, 1.3, 0.45, 1.1), { depth: 0.07, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 1 });
  fin.translate(-2.7, 0.25, -0.035);
  const nacelle = lathe([[0, 0], [0.22, 0], [0.27, 0.3], [0.27, 0.9], [0.24, 1.15], [0.2, 1.2], [0, 1.2]], 32).rotateZ(Math.PI / 2);
  const engines = [1.6, -1.6].map((z) => nacelle.clone().translate(0.9, -0.55, z));
  return merge([fuselage, wingR, wingL, tailR, tailL, fin, ...engines]);
};

/** Suitcase: rounded body via extrusion, handle, two straps, corner caps. */
export const suitcase = () => {
  const body = new THREE.ExtrudeGeometry(roundRect(3, 2.1, 0.25), { depth: 0.9, bevelEnabled: true, bevelSize: 0.08, bevelThickness: 0.08, bevelSegments: 3, curveSegments: 8 }).translate(0, 0, -0.45);
  const handle = new THREE.TorusGeometry(0.35, 0.06, 10, 32, Math.PI).translate(0, 1.13, 0);
  const straps = [-0.8, 0.8].map((x) => new THREE.BoxGeometry(0.22, 2.3, 1.15).translate(x, 0, 0));
  return merge([body, handle, ...straps]);
};

/** Globe sphere + meridian ring + turned stand. */
export const globeStand = () => {
  const ring = new THREE.TorusGeometry(1.12, 0.035, 10, 128, Math.PI * 1.3).rotateZ(-Math.PI * 0.65);
  const axis = new THREE.CylinderGeometry(0.025, 0.025, 2.4, 8);
  const stand = lathe([[0, -2.0], [0.75, -2.0], ...arc(0.75, -1.9, 0.1, -90, 90, 6), [0.5, -1.78], [0.2, -1.7], [0.12, -1.5], [0.16, -1.42], [0.09, -1.3], [0.06, -1.12], [0, -1.12]], 64);
  const tilt = new THREE.Matrix4().makeRotationZ(THREE.MathUtils.degToRad(23.4));
  ring.applyMatrix4(tilt);
  axis.applyMatrix4(tilt);
  return { ring: merge([ring, axis]), stand };
};
