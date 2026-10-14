import * as THREE from "three";

/** Shared builders for the v6.5 worlds (made once at module level, never per frame). */
export type P3 = [number, number, number];
export const rnd = (i: number, s = 1) => {
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** A tube along a smooth path, radius tapering from r0 to r1, with a little knotted swelling along the way. */
export const tube = (path: P3[], r0: number, r1: number, segments = 160, radial = 20, knots = 0) => {
  const curve = new THREE.CatmullRomCurve3(path.map((p) => new THREE.Vector3(...p)), false, "centripetal");
  const g = new THREE.TubeGeometry(curve, segments, 1, radial, false);
  const pos = g.getAttribute("position") as THREE.BufferAttribute;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const c = curve.getPointAt(t);
    const r = (r0 + (r1 - r0) * t) * (1 + knots * (0.5 + 0.5 * Math.sin(t * 37)) * Math.pow(Math.sin(t * 9.3), 8));
    for (let j = 0; j <= radial; j++) {
      const k = i * (radial + 1) + j;
      const v = new THREE.Vector3(pos.getX(k), pos.getY(k), pos.getZ(k)).sub(c);
      // bark is never round: a slight ridged cross-section
      const a = (j / radial) * Math.PI * 2;
      v.normalize().multiplyScalar(r * (1 + 0.05 * Math.sin(a * 5 + t * 14)));
      pos.setXYZ(k, c.x + v.x, c.y + v.y, c.z + v.z);
    }
  }
  g.computeVertexNormals();
  return { g, curve };
};

/** A leaf along +y with a midrib fold, wavy margin and a curl. */
export const leafGeo = (len: number, w: number, fold = 0.3, wave = 0.03, curl = 0.2, seg = 22) => {
  const g = new THREE.PlaneGeometry(w, len, 10, seg);
  const p = g.getAttribute("position") as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i) + len / 2;
    const t = y / len;
    const half = (w / 2) * Math.pow(Math.max(0, Math.sin(Math.PI * Math.min(1, t * 1.02))), 0.8) * (1 - 0.2 * t);
    const u = x / (w / 2);
    p.setXYZ(i, u * half + wave * Math.sin(t * 20 + u) * Math.abs(u) * half * 3, y, -fold * Math.abs(u * half) + curl * t * t * len);
  }
  g.computeVertexNormals();
  return g;
};


/** An organic lump (a rock, a sponge): a sphere squashed to (sx, sy, sz) with low-frequency relief. */
export const blob = (sx = 1, sy = 1, sz = 1, relief = 0.12, seed = 1, seg = 36) => {
  const g = new THREE.SphereGeometry(0.5, seg, Math.round(seg * 0.75));
  const p = g.getAttribute("position") as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    const v = new THREE.Vector3(p.getX(i), p.getY(i), p.getZ(i));
    const n = Math.sin(v.x * 7 + seed) * Math.sin(v.y * 6 + seed * 1.7) * Math.sin(v.z * 8 + seed * 2.3) + 0.5 * Math.sin(v.x * 17 + v.z * 13 + seed);
    v.multiplyScalar(1 + relief * n);
    p.setXYZ(i, v.x * sx, v.y * sy, v.z * sz);
  }
  g.computeVertexNormals();
  return g;
};
