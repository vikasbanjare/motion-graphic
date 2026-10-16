import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import land50 from "world-atlas/land-50m.json";
import droidSerifBold from "three/examples/fonts/droid/droid_serif_bold.typeface.json";
import { arc, lathe, roundRect, key as bitKey, coin } from "./models.ts";

type P = [number, number];

export const merge = (gs: THREE.BufferGeometry[]) => {
  const clean = gs.map((g) => {
    const n = g.index ? g.toNonIndexed() : g.clone();
    for (const k of Object.keys(n.attributes)) if (!["position", "normal", "uv"].includes(k)) n.deleteAttribute(k);
    if (!n.getAttribute("uv")) n.setAttribute("uv", new THREE.Float32BufferAttribute(new Float32Array(n.getAttribute("position").count * 2), 2));
    if (!n.getAttribute("normal")) n.computeVertexNormals();
    return n;
  });
  return mergeGeometries(clean, false)!;
};

/** Equirectangular land mask from Natural Earth 1:50m (public domain) via world-atlas (ISC). White = land. */
export const landTexture = (W = 2048, H = 1024) => {
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const x = c.getContext("2d")!;
  x.fillStyle = "#000";
  x.fillRect(0, 0, W, H);
  const topo = land50 as unknown as Topology<{ land: GeometryCollection }>;
  const fc = feature(topo, topo.objects.land) as unknown as GeoJSON.FeatureCollection<GeoJSON.MultiPolygon | GeoJSON.Polygon>;
  const X = (lon: number) => ((lon + 180) / 360) * W;
  const Y = (lat: number) => ((90 - lat) / 180) * H;
  x.fillStyle = "#fff";
  for (const f of fc.features) {
    const polys = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
    for (const poly of polys) {
      for (const shift of [-360, 0, 360]) {
        x.beginPath();
        for (const ring of poly) {
          let prev = ring[0][0];
          let off = 0;
          const pts: P[] = [];
          for (const [lon, lat] of ring) {
            if (lon - prev > 180) off -= 360;
            if (lon - prev < -180) off += 360;
            prev = lon;
            pts.push([lon + off + shift, lat]);
          }
          const span = pts[pts.length - 1][0] - pts[0][0];
          if (Math.abs(span) > 180) {
            // ring wraps the globe (Antarctica): close it through the pole
            pts.push([pts[pts.length - 1][0], -90], [pts[0][0], -90]);
          }
          pts.forEach(([lo, la], i) => (i ? x.lineTo(X(lo), Y(la)) : x.moveTo(X(lo), Y(la))));
          x.closePath();
        }
        x.fill("evenodd");
      }
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  t.anisotropy = 4;
  return t;
};

/** Albedo map for a globe: oceans mid, land light, with graticule lines. */
export const globeAlbedo = () => {
  const land = landTexture();
  const src = land.image as HTMLCanvasElement;
  const c = document.createElement("canvas");
  c.width = src.width;
  c.height = src.height;
  const x = c.getContext("2d")!;
  x.fillStyle = "#6a6a6a";
  x.fillRect(0, 0, c.width, c.height);
  x.globalCompositeOperation = "lighter";
  x.globalAlpha = 0.55;
  x.drawImage(src, 0, 0);
  x.globalAlpha = 1;
  x.globalCompositeOperation = "source-over";
  x.strokeStyle = "rgba(0,0,0,0.7)";
  x.lineWidth = 5;
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
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  return t;
};

/** Extruded serif numerals (Droid Serif Bold typeface JSON shipped in three/examples/fonts, Apache-2.0). */
export const text3d = (s: string, size = 2, depth = 0.5) => {
  const font = new FontLoader().parse(droidSerifBold as never);
  const g = new TextGeometry(s, {
    font,
    size,
    depth,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.04,
    bevelSegments: 4,
  });
  g.computeBoundingBox();
  const b = g.boundingBox!;
  g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2);
  g.computeVertexNormals();
  return g;
};

/** Paper shopping bag with folded gussets and rope handles. */
export const shoppingBag = () => {
  const w = 2.2, h = 2.6, d = 1.0;
  const front = new THREE.PlaneGeometry(w, h, 1, 1).translate(0, h / 2, d / 2);
  const back = front.clone().rotateY(Math.PI);
  const side = (s: number) => {
    // gusset with a centre fold (V) for the side panels
    const g = new THREE.BufferGeometry();
    const hz = d / 2;
    const v = [0, 0, -hz, 0, 0, hz, -0.18 * s, h * 0.5, 0, 0, h, -hz, 0, h, hz, -0.18 * s, h, 0];
    const p = new Float32Array(v);
    for (let i = 0; i < p.length; i += 3) p[i] += (s * w) / 2;
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    g.setIndex([0, 2, 1, 0, 3, 2, 3, 5, 2, 1, 2, 4, 2, 5, 4]);
    g.computeVertexNormals();
    return g;
  };
  const bottom = new THREE.PlaneGeometry(w, d).rotateX(-Math.PI / 2);
  const rim = [d / 2 - 0.01, -d / 2 + 0.01].map((z) => new THREE.BoxGeometry(w, 0.12, 0.02).translate(0, h - 0.06, z));
  const handle = (z: number) => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.5, h - 0.15, z),
      new THREE.Vector3(-0.45, h + 0.55, z),
      new THREE.Vector3(0, h + 0.8, z),
      new THREE.Vector3(0.45, h + 0.55, z),
      new THREE.Vector3(0.5, h - 0.15, z),
    ]);
    return new THREE.TubeGeometry(curve, 48, 0.035, 8, false);
  };
  return merge([front, back, side(1), side(-1), bottom, ...rim, handle(d / 2 + 0.02), handle(-d / 2 - 0.02)]);
};

/** Room key + tag on a ring (hotel). */
export const roomKey = () => {
  const k = bitKey();
  const ring = new THREE.TorusGeometry(0.42, 0.04, 10, 48).translate(-0.95, 0, 0);
  const tagShape = roundRect(1.4, 2.6, 0.5);
  const hole = new THREE.Path();
  hole.absarc(0, 0.95, 0.16, 0, Math.PI * 2, true);
  tagShape.holes.push(hole);
  const tag = new THREE.ExtrudeGeometry(tagShape, { depth: 0.12, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 3, curveSegments: 16 })
    .translate(0, -0.95, -0.06)
    .rotateZ(0.35)
    .translate(-1.35, -1.0, 0);
  return merge([k, ring, tag]);
};

/** Stack of coins, slightly offset. */
export const coinStack = (n = 7) => {
  const c = coin(120);
  return merge(Array.from({ length: n }, (_, i) => c.clone().translate(Math.sin(i * 1.7) * 0.05, i * 0.165, Math.cos(i * 2.3) * 0.05)));
};

/** Card face art (ours): guilloche rosette + fine lines, drawn to a canvas as an albedo map. */
export const cardArt = () => {
  const W = 1712, H = 1080;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const x = c.getContext("2d")!;
  x.fillStyle = "#d8d8d8";
  x.fillRect(0, 0, W, H);
  x.strokeStyle = "rgba(0,0,0,0.5)";
  x.lineWidth = 1.6;
  const cx = W * 0.72, cy = H * 0.46;
  for (let k = 0; k < 36; k++) {
    x.beginPath();
    for (let i = 0; i <= 720; i++) {
      const t = (i / 720) * Math.PI * 2;
      const r = 210 + 70 * Math.sin(9 * t + k * 0.17) + 26 * Math.cos(23 * t);
      const px = cx + r * Math.cos(t + k * 0.0436), py = cy + r * Math.sin(t + k * 0.0436);
      if (i) x.lineTo(px, py);
      else x.moveTo(px, py);
    }
    x.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  return t;
};

export { arc };

/** Hot-air balloon v2: narrow throat -> widest at 2/3 height -> hemispherical crown; 16 gores bulge between seams. */
export const balloon2 = () => {
  const prof: P[] = [[0.32, 1.25]];
  for (let i = 1; i <= 24; i++) {
    const s = i / 24;
    prof.push([0.32 + (1.6 - 0.32) * Math.pow(Math.sin((Math.PI / 2) * s), 1.25), 1.25 + 2.4 * s]);
  }
  for (let i = 1; i <= 20; i++) {
    const a = (i / 20) * (Math.PI / 2);
    prof.push([1.6 * Math.cos(a), 3.65 + 1.55 * Math.sin(a)]);
  }
  prof.push([0, 5.2]);
  const g = lathe(prof, 256);
  const pos = g.getAttribute("position") as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const r = Math.hypot(x, z);
    if (r < 1e-5) continue;
    const th = Math.atan2(z, x);
    const k = 1 + 0.03 * Math.abs(Math.sin(th * 8));
    pos.setXYZ(i, x * k, y, z * k);
  }
  g.computeVertexNormals();
  const basket = new THREE.CylinderGeometry(0.4, 0.34, 0.45, 24, 4).translate(0, 0.22, 0);
  const rim = new THREE.TorusGeometry(0.4, 0.045, 8, 32).rotateX(Math.PI / 2).translate(0, 0.45, 0);
  const ropes = [0, 1, 2, 3].map((i) => {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const top = new THREE.Vector3(Math.cos(a) * 0.3, 1.27, Math.sin(a) * 0.3);
    const bot = new THREE.Vector3(Math.cos(a) * 0.38, 0.45, Math.sin(a) * 0.38);
    const c = new THREE.CylinderGeometry(0.012, 0.012, top.distanceTo(bot), 6);
    c.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), top.clone().sub(bot).normalize()));
    const mid = top.clone().add(bot).multiplyScalar(0.5);
    return c.translate(mid.x, mid.y, mid.z);
  });
  return merge([g, basket, rim, ...ropes]);
};
