import * as THREE from "three";
import { merge } from "./models2.ts";
import { roundRect, lathe, arc } from "./models.ts";

/** New code-modelled subjects for v2 (original). */

/** Taped parcel: slightly soft box, tape cross on top, twine loop around. */
export const parcel = (w = 2, h = 1.2, d = 1.5) => {
  const body = new THREE.BoxGeometry(w, h, d, 4, 3, 4);
  const pos = body.getAttribute("position") as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const bulge = 0.04 * Math.cos((x / w) * Math.PI) * Math.cos((z / d) * Math.PI);
    pos.setXYZ(i, x * (1 + bulge * 0.3), y + (y > 0 ? bulge : 0), z * (1 + bulge * 0.3));
  }
  body.computeVertexNormals();
  body.translate(0, h / 2, 0);
  const tape = new THREE.BoxGeometry(w * 0.22, 0.02, d + 0.02).translate(0, h + 0.012, 0);
  const tapeSide = new THREE.BoxGeometry(w * 0.22, h * 0.35, 0.02);
  const t1 = tapeSide.clone().translate(0, h - h * 0.175, d / 2 + 0.012);
  const t2 = tapeSide.clone().translate(0, h - h * 0.175, -d / 2 - 0.012);
  const tw = (axis: "x" | "z") => {
    const g = new THREE.TorusGeometry(1, 0.025, 6, 64);
    if (axis === "x") g.scale((w + 0.06) / 2, (h + 0.06) / 2, 1).translate(0, h / 2, 0).rotateY(Math.PI / 2).scale(1, 1, 1);
    else g.scale((w + 0.06) / 2, (h + 0.06) / 2, 1).translate(0, h / 2, 0);
    return g;
  };
  const twA = tw("z").scale(1, 1, 1);
  const twB = new THREE.TorusGeometry(1, 0.025, 6, 64).scale((d + 0.06) / 2, (h + 0.06) / 2, 1).rotateY(Math.PI / 2).translate(w * 0.28, h / 2, 0);
  const knot = new THREE.TorusKnotGeometry(0.09, 0.025, 48, 6).translate(w * 0.28, h + 0.06, 0);
  return merge([body, tape, t1, t2, twA.translate(-w * 0.0, 0, 0), twB, knot]);
};

/** Luggage / parcel tag: rounded tag with eyelet, on a string that hangs from y=0 (pivot) down to the tag. */
export const tag = (len = 3) => {
  const s = roundRect(1.3, 2.1, 0.18);
  const top = new THREE.Shape();
  // clipped corners at the top: build as a polygon instead
  top.moveTo(-0.65, -1.05);
  top.lineTo(0.65, -1.05);
  top.lineTo(0.65, 0.75);
  top.lineTo(0.3, 1.05);
  top.lineTo(-0.3, 1.05);
  top.lineTo(-0.65, 0.75);
  top.lineTo(-0.65, -1.05);
  const hole = new THREE.Path();
  hole.absarc(0, 0.75, 0.13, 0, Math.PI * 2, true);
  top.holes.push(hole);
  void s;
  const body = new THREE.ExtrudeGeometry(top, { depth: 0.04, bevelEnabled: true, bevelSize: 0.015, bevelThickness: 0.015, bevelSegments: 1, curveSegments: 16 }).translate(0, -len - 0.75, 0);
  const eyelet = new THREE.TorusGeometry(0.15, 0.035, 8, 32).translate(0, -len, 0.03);
  const str = new THREE.CylinderGeometry(0.018, 0.018, len, 6).translate(0, -len / 2, 0);
  // printed rule lines on the tag face (raised a hair so the engraving picks them up)
  const rules = [0, 1, 2, 3].map((i) => new THREE.BoxGeometry(0.85, 0.04, 0.02).translate(0, -len - 1.0 - i * 0.28, 0.065));
  return merge([body, eyelet, str, ...rules]);
};

/** Folded paper plane (nose = +X). */
export const paperPlane = () => {
  const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
  const tri = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3) => {
    const g = new THREE.BufferGeometry().setFromPoints([a, b, c]);
    g.computeVertexNormals();
    return g;
  };
  const nose = V(1.6, 0, 0), tl = V(-1.2, 0.05, 1.1), tr = V(-1.2, 0.05, -1.1), kl = V(-1.2, -0.35, 0.08), kr = V(-1.2, -0.35, -0.08), k = V(-1.2, -0.05, 0);
  return merge([tri(nose, tl, k), tri(nose, k, tr), tri(nose, kl, k), tri(nose, k, kr)]);
};

/** A low stepped pedestal (for product displays). */
export const pedestal = (r = 1.4, h = 0.5) => lathe([[0, 0], [r, 0], ...arc(r, 0.06, 0.06, -90, 90, 6), [r - 0.08, 0.14], [r - 0.15, 0.18], [r - 0.15, h - 0.12], [r - 0.06, h - 0.08], [r - 0.06, h], [0, h]], 96);

/** Flat sheet with rounded corners (z-up face) for card slabs and backdrops. */
export const slab = (w: number, h: number, r: number, depth = 0.06) =>
  new THREE.ExtrudeGeometry(roundRect(w, h, r), { depth, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.01, bevelSegments: 1, curveSegments: 10 }).translate(0, 0, -depth / 2);

/** Rolling cloud bank: a row of overlapping squashed spheres (engraves like a woodcut cloud). */
export const cloudBank = (n = 9, seed = 1) => {
  const parts: THREE.BufferGeometry[] = [];
  for (let i = 0; i < n; i++) {
    const r = 0.9 + 0.7 * Math.abs(Math.sin(i * 2.7 + seed));
    parts.push(new THREE.SphereGeometry(r, 24, 16).scale(1.25, 0.78, 0.8).translate(i * 1.35 - (n * 1.35) / 2, r * 0.35 + 0.2 * Math.sin(i * 1.3 + seed), Math.sin(i * 3.1 + seed) * 0.4));
  }
  return merge(parts);
};

/** Dotted great-circle route arc on a sphere of radius R between two lon/lat points: small beads. */
export const routeDots = (R: number, a: [number, number], b: [number, number], n = 40, lift = 0.12) => {
  const toV = ([lon, lat]: [number, number]) => {
    const la = THREE.MathUtils.degToRad(lat), lo = THREE.MathUtils.degToRad(lon);
    return new THREE.Vector3(Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo));
  };
  const A = toV(a), B = toV(b);
  const parts: THREE.BufferGeometry[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const v = A.clone().lerp(B, t).normalize();
    const h = R * (1 + lift * Math.sin(Math.PI * t));
    parts.push(new THREE.SphereGeometry(0.018 * R, 6, 4).translate(v.x * h, v.y * h, v.z * h));
  }
  return merge(parts);
};

export const routePoint = (R: number, ll: [number, number], t: number, lift = 0.12, b?: [number, number]) => {
  const toV = ([lon, lat]: [number, number]) => {
    const la = THREE.MathUtils.degToRad(lat), lo = THREE.MathUtils.degToRad(lon);
    return new THREE.Vector3(Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo));
  };
  const A = toV(ll), B = toV(b ?? ll);
  const v = A.clone().lerp(B, t).normalize();
  const h = R * (1 + lift * Math.sin(Math.PI * t));
  return v.multiplyScalar(h);
};
