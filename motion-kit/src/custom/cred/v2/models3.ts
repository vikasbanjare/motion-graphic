import * as THREE from "three";
import { merge } from "./models2.ts";
import { arc, lathe, roundRect } from "./models.ts";

/**
 * v2D 3D-design pass: the shopping and travel subjects rebuilt as designed objects (original code), same footprints as
 * the v2 builders so the staging and timing of the liked film do not move.
 *  - bag2: tapered paper carrier with gusset folds, puffed panels, a folded cuff, eyelets and rope handles
 *  - giftBox2: rounded body and lipped lid, thin wrapping ribbon that steps over the lid, a four-loop bow with tails
 *  - parcel2: softened kraft box with flap seams, angled tape, twine on a rounded path with a knot, a tilted label
 *  - airliner: ogive nose, upswept tail, window rows, cockpit glass, dihedral wings with winglets, pylon engines
 *  - cloud2: flat-based cumulus (two tiers of puffs)
 *  - globeStand2: meridian with degree ticks and pole caps, a turned base with grooves and a finial
 * Every panel carries UVs so the drawn maps (detail.ts) land where they are drawn.
 */

type V3 = THREE.Vector3;
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/** Grid surface from a point function p(u,v) (u,v in 0..1); smooth normals within, sharp at the merge seams. */
const grid = (nu: number, nv: number, p: (u: number, v: number) => V3, uv?: (u: number, v: number) => [number, number]) => {
  const pos: number[] = [], uvs: number[] = [], idx: number[] = [];
  for (let j = 0; j <= nv; j++)
    for (let i = 0; i <= nu; i++) {
      const u = i / nu, v = j / nv;
      const q = p(u, v);
      pos.push(q.x, q.y, q.z);
      const t = uv ? uv(u, v) : [u, v];
      uvs.push(t[0], t[1]);
    }
  for (let j = 0; j < nv; j++)
    for (let i = 0; i < nu; i++) {
      const a = j * (nu + 1) + i, b = a + 1, c = a + nu + 1, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
};

/** Flat ribbon strip along a curve: width across the curve's binormal blended with a fixed up vector; twist in turns. */
const ribbonStrip = (curve: THREE.Curve<V3>, width: number, n = 64, up = V(0, 1, 0), twist = 0) => {
  const pts = curve.getPoints(n);
  const tans = pts.map((_, i) => curve.getTangent(i / n).normalize());
  return grid(n, 1, (u, v) => {
    const i = Math.round(u * n);
    const t = tans[i];
    // side vector: perpendicular to the tangent, as close to `up` as possible, rotated by the twist
    let s = up.clone().sub(t.clone().multiplyScalar(up.dot(t)));
    if (s.lengthSq() < 1e-6) s = V(1, 0, 0).sub(t.clone().multiplyScalar(t.x));
    s.normalize();
    const b = t.clone().cross(s).normalize();
    const a = twist * Math.PI * 2 * u;
    const side = s.clone().multiplyScalar(Math.cos(a)).add(b.multiplyScalar(Math.sin(a)));
    return pts[i].clone().add(side.multiplyScalar((v - 0.5) * width));
  });
};

const tube = (pts: V3[], r: number, closed = false, seg = 64) => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, closed, "centripetal", 0.6), seg, r, 8, closed);

/** Rounded box standing on y=0: w (x) by h (y) by d (z), edge radius r. */
const roundedBox = (w: number, h: number, d: number, r: number) => {
  const g = new THREE.ExtrudeGeometry(roundRect(w, d, r), { depth: h, bevelEnabled: true, bevelSize: r * 0.8, bevelThickness: r * 0.8, bevelSegments: 3, curveSegments: 6 });
  // extrusion runs along +z: stand it up (z -> y), bevel included in the height
  g.rotateX(-Math.PI / 2);
  g.computeBoundingBox();
  const b = g.boundingBox!;
  g.translate(0, -b.min.y, 0);
  g.scale(1, h / (b.max.y - b.min.y), 1);
  // box UVs: top face planar, sides by height
  const pos = g.getAttribute("position");
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const top = y > h - r * 1.2;
    uv[i * 2] = top ? x / w + 0.5 : (Math.atan2(z, x) / (Math.PI * 2) + 0.5) * 2;
    uv[i * 2 + 1] = top ? z / d + 0.5 : y / h;
  }
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return g;
};

// ---- shopping ----------------------------------------------------------------------------------------------------

/** Paper carrier bag, footprint 2.2 x 2.6 x 1.0 as the v2 bag, bottom at y=0. */
export const bag2 = () => {
  const w = 2.2, h = 2.6, d = 1.0;
  const W = (v: number) => w * (0.93 + 0.07 * v); // slight taper: wider at the mouth
  const D = (v: number) => d * (0.88 + 0.12 * v);
  const pinch = (v: number) => 0.34 * d * Math.pow(Math.sin(Math.PI * Math.min(1, v * 1.08)), 0.7); // gusset fold, flat at the base and mouth
  const panel = (sx: number, uvOff: number) =>
    grid(24, 20, (u, v) => {
      // front (sx=+1) / back (sx=-1) panel, puffed outward in the middle
      const x = (u - 0.5) * W(v);
      const puff = 0.07 * Math.sin(Math.PI * u) * Math.pow(Math.sin(Math.PI * v), 0.8);
      return V(x * sx, v * h, sx * (D(v) / 2 + puff));
    }, (u, v) => [uvOff + u * (sx > 0 ? 1 : 0.28), v]);
  const gusset = (sx: number, half: number) =>
    grid(8, 20, (u, v) => {
      // one half of a side panel: from the front/back corner to the fold line (pinched inward)
      const z0 = half * D(v) / 2, z1 = 0;
      const z = z0 + (z1 - z0) * u;
      const x = sx * (W(v) / 2 - pinch(v) * u);
      return V(x, v * h, z);
    }, (u, v) => [u * 0.14, v]);
  const bottom = grid(1, 1, (u, v) => V((u - 0.5) * W(0), 0, (v - 0.5) * D(0)));
  // folded cuff: a band around the mouth, slightly larger, folding outward
  const cuff = (sx: number) =>
    grid(24, 4, (u, v) => {
      const y = h - 0.22 + v * 0.26;
      const flare = 1.02 + 0.05 * v;
      const x = (u - 0.5) * W(1) * flare;
      return V(x * sx, y, sx * (D(1) / 2) * flare + sx * 0.02);
    }, (u, v) => [u, 0.9 + v * 0.1]);
  const cuffSide = (sx: number) =>
    grid(8, 4, (u, v) => {
      const y = h - 0.22 + v * 0.26;
      const flare = 1.02 + 0.05 * v;
      return V(sx * (W(1) / 2) * flare, y, (u - 0.5) * D(1) * flare);
    }, (u, v) => [u * 0.14, 0.9 + v * 0.1]);
  // eyelets and rope handles with sag, knotted inside (knots hidden: a bead just under the rim)
  const eyelet = (x: number, z: number) => new THREE.TorusGeometry(0.075, 0.022, 8, 24).translate(x, h - 0.34, z);
  const handle = (z: number) => {
    const zz = z + Math.sign(z) * 0.06;
    const rope = tube([V(-0.55, h - 0.34, zz), V(-0.58, h + 0.25, zz + Math.sign(z) * 0.03), V(-0.3, h + 0.72, zz + Math.sign(z) * 0.05), V(0.3, h + 0.72, zz + Math.sign(z) * 0.05), V(0.58, h + 0.25, zz + Math.sign(z) * 0.03), V(0.55, h - 0.34, zz)], 0.042, false, 56);
    // rope lay: a thinner strand spiralling around the core reads as twisted cord
    const pts: V3[] = [];
    const base = new THREE.CatmullRomCurve3([V(-0.55, h - 0.34, zz), V(-0.58, h + 0.25, zz), V(-0.3, h + 0.72, zz), V(0.3, h + 0.72, zz), V(0.58, h + 0.25, zz), V(0.55, h - 0.34, zz)]);
    for (let i = 0; i <= 140; i++) {
      const t = i / 140, p = base.getPoint(t), tg = base.getTangent(t);
      const n = V(0, 0, 1).sub(tg.clone().multiplyScalar(tg.z)).normalize();
      const b = tg.clone().cross(n);
      const a = t * Math.PI * 2 * 11;
      pts.push(p.add(n.multiplyScalar(Math.cos(a) * 0.03)).add(b.multiplyScalar(Math.sin(a) * 0.03)));
    }
    const lay = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 280, 0.014, 5, false);
    return [rope, lay];
  };
  return merge([
    panel(1, 0), panel(-1, 0.72),
    gusset(1, 1), gusset(1, -1), gusset(-1, 1), gusset(-1, -1),
    bottom, cuff(1), cuff(-1), cuffSide(1), cuffSide(-1),
    eyelet(-0.55, d / 2 + 0.02), eyelet(0.55, d / 2 + 0.02), eyelet(-0.55, -d / 2 - 0.02), eyelet(0.55, -d / 2 - 0.02),
    ...handle(d / 2 + 0.03), ...handle(-d / 2 - 0.03),
  ]);
};

/** Gift box, footprint 2 x 1.95 x 2 as the v2 gift (body 1.5 + lid), bottom at y=0. Returns box and ribbon parts. */
export const giftBox2 = () => {
  const body = roundedBox(2, 1.5, 2, 0.08);
  const lid = roundedBox(2.14, 0.38, 2.14, 0.07).translate(0, 1.56, 0);
  // a shadow gap under the lid lip: a slightly smaller dark band (reads as the lid's shadow line)
  const lip = new THREE.BoxGeometry(2.02, 0.06, 2.02).translate(0, 1.53, 0);
  // ribbon: thin flat bands that step over the lid (body face -> lid side -> lid top)
  const bw = 0.26, bt = 0.028;
  const bandX = (): THREE.BufferGeometry[] => {
    const top = new THREE.BoxGeometry(2.14 + 2 * bt, bt, bw).translate(0, 1.94 + bt / 2, 0);
    const sides = [1, -1].flatMap((s) => [
      new THREE.BoxGeometry(bt, 0.38 + 0.04, bw).translate(s * (1.07 + bt / 2), 1.75, 0),
      new THREE.BoxGeometry(bt, 1.53, bw).translate(s * (1.0 + bt / 2), 0.765, 0),
      new THREE.BoxGeometry(0.07 + bt, bt, bw).translate(s * (1.035 + bt / 2), 1.53, 0),
    ]);
    return [top, ...sides];
  };
  const bandZ = bandX().map((g) => g.rotateY(Math.PI / 2));
  // bow: four loops as flat ribbon strips (two large, two small, slightly twisted), a knot, two notched tails
  const loop = (len: number, rot: number, lift: number) => {
    const c = new THREE.CatmullRomCurve3([V(0, 0.02, 0), V(len * 0.45, 0.22 + lift, 0.12), V(len, 0.16 + lift, 0.02), V(len * 0.55, -0.02 + lift * 0.5, -0.14), V(0.06, 0.0, -0.02)], false, "centripetal", 0.5);
    const g = ribbonStrip(c, bw * 0.95, 48, V(0, 1, 0), 0.12);
    return g.rotateY(rot);
  };
  const loops = [loop(0.92, 0.25, 0.05), loop(0.88, Math.PI + 0.25, 0.04), loop(0.62, Math.PI / 2 + 0.55, 0.16), loop(0.6, -Math.PI / 2 + 0.55, 0.14)].map((g) => g.translate(0, 1.96, 0));
  const knot = new THREE.SphereGeometry(0.17, 16, 12).scale(1.15, 0.72, 1).translate(0, 1.99, 0);
  // tails: over the lid edge and down the side, beside the band
  const tail = (dir: number) => {
    const c = new THREE.CatmullRomCurve3([V(0.05 * dir, 1.97, 0.06), V(0.55 * dir, 1.96, 0.14), V(1.02 * dir, 1.93, 0.2), V(1.15 * dir, 1.62, 0.22), V(1.1 * dir, 1.12, 0.24)], false, "centripetal", 0.5);
    return ribbonStrip(c, bw * 0.9, 40, V(0, 0, 1), 0.03);
  };
  const tails = [tail(1), tail(-1)];
  return { box: merge([body, lid, lip]), ribbon: merge([...bandX(), ...bandZ, ...loops, knot, ...tails]) };
};

/** Kraft parcel (w x h x d), bottom at y=0: softened box, flap seams, angled tape, twine with a knot, tilted label. */
export const parcel2 = (w = 2, h = 1.2, d = 1.5) => {
  const body = roundedBox(w, h, d, 0.045);
  // soften: a little bulge on every face
  const pos = body.getAttribute("position") as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i) - h / 2, z = pos.getZ(i);
    const k = 1 + 0.025 * Math.cos((x / w) * Math.PI) * Math.cos((y / h) * Math.PI) * Math.cos((z / d) * Math.PI);
    pos.setXYZ(i, x * k, (y + h / 2) * (1 + (k - 1) * 0.5), z * k);
  }
  body.computeVertexNormals();
  // flap seams on the top: a centre seam and the two flap edges, as hair-thin raised rules
  const seam = (len: number, ax: "x" | "z", off: number) => {
    const g = ax === "x" ? new THREE.BoxGeometry(len, 0.012, 0.028) : new THREE.BoxGeometry(0.028, 0.012, len);
    return ax === "x" ? g.translate(0, h + 0.004, off) : g.translate(off, h + 0.004, 0);
  };
  const seams = [seam(d * 0.98, "z", 0), seam(d * 0.98, "z", w * 0.5 - 0.03), seam(d * 0.98, "z", -w * 0.5 + 0.03), seam(w * 0.98, "x", d * 0.5 - 0.03), seam(w * 0.98, "x", -d * 0.5 + 0.03)];
  // tape along the centre seam and a third of the way down the front and back, cut at a slight angle
  const tapeShape = new THREE.Shape();
  tapeShape.moveTo(-0.12 * w, 0); tapeShape.lineTo(0.12 * w, 0); tapeShape.lineTo(0.11 * w, 1); tapeShape.lineTo(-0.13 * w, 1); tapeShape.lineTo(-0.12 * w, 0);
  const tapeTop = new THREE.BoxGeometry(w * 0.24, 0.018, d + 0.03).translate(0, h + 0.012, 0);
  const tapeSide = (s: number) => new THREE.ExtrudeGeometry(tapeShape, { depth: 0.016, bevelEnabled: false }).scale(1, h * 0.38, 1).rotateX(Math.PI).translate(0, h + 0.004, s * (d / 2 + 0.012)).rotateY(s > 0 ? 0 : Math.PI);
  // twine: two loops on rounded-rectangle paths, a knot and two loose ends
  const loopPath = (a: number, b: number, rot: number) => {
    const r = 0.06;
    const pts: V3[] = [];
    const corners: [number, number][] = [[a, b], [-a, b], [-a, -b], [a, -b]];
    corners.forEach(([cx, cy], k) => {
      const ox = Math.sign(cx) * (Math.abs(cx) - r), oy = Math.sign(cy) * (Math.abs(cy) - r);
      for (let i = 0; i <= 4; i++) {
        const ang = (Math.PI / 2) * k + (i / 4) * (Math.PI / 2);
        pts.push(V(ox + r * Math.cos(ang), oy + r * Math.sin(ang), 0));
      }
    });
    const g = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, true, "centripetal", 0.5), 96, 0.022, 6, true);
    return g.rotateY(rot);
  };
  const twineA = loopPath(d / 2 + 0.035, h / 2 + 0.035, Math.PI / 2).translate(w * 0.3, h / 2, 0);
  const twineB = loopPath(w / 2 + 0.035, h / 2 + 0.035, 0).translate(0, h / 2, 0);
  const knot = new THREE.TorusKnotGeometry(0.075, 0.022, 48, 6, 2, 3).translate(w * 0.3, h + 0.07, 0);
  const ends = [tube([V(w * 0.3, h + 0.08, 0), V(w * 0.38, h + 0.1, 0.12), V(w * 0.46, h + 0.03, 0.26)], 0.02), tube([V(w * 0.3, h + 0.08, 0), V(w * 0.2, h + 0.12, -0.1), V(w * 0.06, h + 0.04, -0.24)], 0.02)];
  // label on the front face, a hair proud, tilted
  const label = new THREE.BoxGeometry(w * 0.34, h * 0.4, 0.012).translate(-w * 0.22, h * 0.48, d / 2 + 0.006).rotateY(0);
  label.rotateZ(0.06);
  return merge([body, ...seams, tapeTop, tapeSide(1), tapeSide(-1), twineA, twineB, knot, ...ends, label]);
};

// ---- travel -------------------------------------------------------------------------------------------------------

/** Airliner, nose +X, length 8, span 8.4 as the v2 plane. `glass` is the window row + cockpit (render darker). */
export const airliner = () => {
  type P = [number, number];
  const prof: P[] = [[0, -4]];
  for (let i = 1; i <= 90; i++) {
    const t = i / 90; // 0 tail .. 1 nose
    let r = 0.42;
    if (t < 0.26) r = 0.06 + 0.36 * Math.pow(t / 0.26, 0.75); // tail cone
    if (t > 0.82) r = 0.42 * Math.sqrt(Math.max(0, 1 - Math.pow((t - 0.82) / 0.18, 2.2))); // ogive nose
    prof.push([r, -4 + t * 8]);
  }
  const fus = lathe(prof, 72).rotateZ(-Math.PI / 2);
  // upswept tail: lift the aft fuselage
  const fp = fus.getAttribute("position") as THREE.BufferAttribute;
  for (let i = 0; i < fp.count; i++) {
    const x = fp.getX(i);
    if (x < -1.9) fp.setY(i, fp.getY(i) + 0.22 * Math.pow((-1.9 - x) / 2.1, 1.8));
  }
  fus.computeVertexNormals();
  const planform = (span: number, root: number, tip: number, sweep: number) => {
    const s = new THREE.Shape();
    s.moveTo(0, 0); s.lineTo(-sweep, span); s.lineTo(-sweep - tip, span); s.lineTo(-root, 0); s.lineTo(0, 0);
    return s;
  };
  const wing = (s: number) => {
    const g = new THREE.ExtrudeGeometry(planform(4.1, 1.75, 0.5, 1.9), { depth: 0.11, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 2 });
    g.rotateX((s * Math.PI) / 2).rotateX(s * THREE.MathUtils.degToRad(-5)); // span along +/-z without mirroring (keeps the winding), dihedral up
    g.translate(0.95, -0.16, 0);
    // winglet: a small vertical planform standing on the tip
    const wl = new THREE.ExtrudeGeometry(planform(0.55, 0.42, 0.14, 0.3), { depth: 0.05, bevelEnabled: false });
    wl.translate(0.95 - 1.9 - 0.25, -0.16 + 4.1 * Math.sin(THREE.MathUtils.degToRad(5)), s * 4.08);
    // flap and aileron rules on the upper surface
    const rule = new THREE.BoxGeometry(0.02, 0.012, 2.6).rotateY(THREE.MathUtils.degToRad(-24)).translate(0.95 - 1.45, -0.16 + 0.06 + 1.3 * Math.sin(THREE.MathUtils.degToRad(5)), s * 1.5);
    return [g, wl, rule];
  };
  const stab = (s: number) => {
    const g = new THREE.ExtrudeGeometry(planform(1.45, 0.95, 0.38, 0.8), { depth: 0.06, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 1 });
    g.rotateX((s * Math.PI) / 2).rotateX(s * THREE.MathUtils.degToRad(-6)).translate(-3.0, 0.3, 0);
    return g;
  };
  const fin = new THREE.ExtrudeGeometry(planform(1.75, 1.35, 0.5, 1.15), { depth: 0.07, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 1 }).translate(-2.65, 0.32, -0.035);
  const rudder = new THREE.BoxGeometry(0.02, 1.5, 0.09).rotateZ(THREE.MathUtils.degToRad(-33)).translate(-3.55, 1.05, 0);
  // engines: intake lip, nacelle, exhaust cone, pylon to the wing
  const nac = lathe([[0, 0], [0.26, 0], [0.31, 0.04], [0.3, 0.12], [0.3, 0.95], [0.26, 1.2], [0.14, 1.26], [0.14, 1.4], [0, 1.4]], 36).rotateZ(Math.PI / 2);
  const engine = (z: number) => {
    const n = nac.clone().translate(1.55, -0.62 + Math.abs(z) * Math.sin(THREE.MathUtils.degToRad(5)) - 0.1, z);
    const py = new THREE.BoxGeometry(0.7, 0.3, 0.09).translate(0.95, -0.36 + Math.abs(z) * Math.sin(THREE.MathUtils.degToRad(5)) - 0.1, z);
    return [n, py];
  };
  // windows: a row of small ovals each side, cockpit glass, two door frames
  const win: THREE.BufferGeometry[] = [];
  for (let x = -1.7; x <= 2.9; x += 0.21) {
    if (x > 0.3 && x < 0.75) continue; // over-wing exit gap
    for (const s of [1, -1]) win.push(new THREE.CylinderGeometry(0.05, 0.05, 0.03, 10).scale(0.85, 1, 1).rotateX(Math.PI / 2).translate(x, 0.13, s * 0.41));
  }
  const cockpit = [1, -1].flatMap((s) => [
    new THREE.BoxGeometry(0.28, 0.14, 0.03).rotateY(s * 0.55).translate(3.45, 0.16, s * 0.33),
    new THREE.BoxGeometry(0.22, 0.13, 0.03).rotateY(s * 1.05).translate(3.28, 0.17, s * 0.4),
  ]);
  const door = (x: number, s: number) =>
    [new THREE.BoxGeometry(0.02, 0.62, 0.012), new THREE.BoxGeometry(0.02, 0.62, 0.012), new THREE.BoxGeometry(0.34, 0.02, 0.012), new THREE.BoxGeometry(0.34, 0.02, 0.012)].map((g, i) =>
      g.translate(x + (i === 0 ? -0.16 : i === 1 ? 0.16 : 0), i === 2 ? 0.26 : i === 3 ? -0.36 : -0.05, s * 0.425),
    );
  const body = merge([fus, ...wing(1), ...wing(-1), stab(1), stab(-1), fin, rudder, ...engine(1.65), ...engine(-1.65), ...door(2.45, 1), ...door(-1.95, 1), ...door(2.45, -1), ...door(-1.95, -1)]);
  const glass = merge([...win, ...cockpit]);
  return { body, glass };
};

/** Cumulus bank: a flat-based row of puffs with a second tier on top; same span as cloudBank(n). */
export const cloud2 = (n = 9, seed = 1) => {
  const parts: THREE.BufferGeometry[] = [];
  const puff = (r: number, x: number, y: number, z: number, sx = 1.15, sy = 0.82) => {
    const g = new THREE.SphereGeometry(r, 28, 18).scale(sx, sy, 0.9).translate(x, y, z);
    const p = g.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) if (p.getY(i) < 0.05) p.setY(i, 0.05 + (p.getY(i) - 0.05) * 0.08); // flat base
    g.computeVertexNormals();
    return g;
  };
  // a long low bank: wide puffs with a lot of overlap (so the engraving reads one mass, not a row of balls), a few
  // taller heads, small caps only on the heads
  for (let i = 0; i < n; i++) {
    const head = i % 3 === 1;
    const r = (head ? 1.35 : 1.0) + 0.35 * Math.abs(Math.sin(i * 2.7 + seed));
    const x = i * 1.35 - (n * 1.35) / 2;
    parts.push(puff(r, x, r * 0.42, Math.sin(i * 3.1 + seed) * 0.3, 1.45, head ? 0.8 : 0.62));
    if (head) {
      const r2 = 0.42 + 0.25 * Math.abs(Math.cos(i * 1.9 + seed * 1.3));
      parts.push(puff(r2, x + 0.55, r * 0.78 + r2 * 0.4, 0.15, 1.1, 0.85));
      parts.push(puff(r2 * 0.8, x - 0.5, r * 0.74 + r2 * 0.35, -0.1, 1.1, 0.85));
    }
  }
  return merge(parts);
};

/** Globe stand, sphere radius 1 at the origin: meridian ring with degree ticks and pole caps, a turned base. */
export const globeStand2 = () => {
  const ring = new THREE.TorusGeometry(1.12, 0.04, 10, 160, Math.PI * 1.3).rotateZ(-Math.PI * 0.65);
  const ticks: THREE.BufferGeometry[] = [];
  for (let k = 0; k <= 36; k++) {
    const a = -Math.PI * 0.65 + (k / 36) * Math.PI * 1.3 + Math.PI / 2;
    const big = k % 3 === 0;
    const t = new THREE.BoxGeometry(big ? 0.12 : 0.07, 0.014, 0.05).translate(1.12, 0, 0).rotateZ(a);
    ticks.push(t);
  }
  const axis = new THREE.CylinderGeometry(0.03, 0.03, 2.5, 10);
  const cap = (y: number) => lathe([[0, 0], [0.09, 0], [0.09, 0.05], [0.05, 0.08], [0.03, 0.14], [0, 0.16]], 24).translate(0, y, 0);
  const caps = [cap(1.14), cap(-1.3).rotateX(Math.PI).translate(0, -2.6 + 0.0, 0)];
  const tilt = new THREE.Matrix4().makeRotationZ(THREE.MathUtils.degToRad(23.4));
  [ring, axis, ...ticks, ...caps].forEach((g) => g.applyMatrix4(tilt));
  // base: foot with turned grooves, a bulbous column, a collar and a cradle finial under the ring's end
  const stand = lathe(
    [[0, -2.0], [0.82, -2.0], ...arc(0.82, -1.9, 0.1, -90, 90, 6), [0.74, -1.8], [0.74, -1.76], [0.66, -1.76], [0.66, -1.72], [0.58, -1.72], [0.5, -1.66], [0.26, -1.62], [0.2, -1.52], [0.24, -1.44], [0.17, -1.36], [0.11, -1.22], [0.14, -1.17], [0.1, -1.12], [0, -1.12]],
    80,
  );
  const collar = new THREE.TorusGeometry(0.19, 0.03, 8, 40).rotateX(Math.PI / 2).translate(0, -1.6, 0);
  return { ring: merge([ring, axis, ...ticks, ...caps]), stand: merge([stand, collar]) };
};

// ---- set dressing (the per-shot detail pass) ------------------------------------------------------------------------

/** Folded map sheet lying on a table (XZ), folds rising in y; UVs run across the sheet for a map texture. */
export const foldedMap = (w = 3.2, h = 2.2, folds = 5) =>
  grid(folds * 6, 8, (u, v) => {
    const t = u * folds;
    const tri = Math.abs(((t % 1) + 1) % 1 - 0.5) * 2; // 0 at the crease, 1 mid-panel
    const lift = 0.16 * (1 - tri) * (0.6 + 0.4 * Math.sin(Math.PI * v));
    return V(u * w - w / 2, 0.02 + lift, v * h - h / 2);
  });

/** Three passport-sized booklets stacked with a slight fan, an embossed oval on the top one. */
export const passportStack = () => {
  const parts: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 3; i++) {
    const b = new THREE.ExtrudeGeometry(roundRect(1.25, 1.75, 0.08), { depth: 0.1, bevelEnabled: true, bevelSize: 0.015, bevelThickness: 0.015, bevelSegments: 1, curveSegments: 6 });
    b.rotateX(-Math.PI / 2).translate(0, i * 0.125 + 0.015, 0).rotateY((i - 1) * 0.18);
    parts.push(b);
    // page edges: a thin lighter slab between covers
    const pages = new THREE.BoxGeometry(1.15, 0.05, 1.65).translate(0.03, i * 0.125 + 0.065, 0).rotateY((i - 1) * 0.18);
    parts.push(pages);
  }
  parts.push(new THREE.TorusGeometry(0.22, 0.02, 6, 40).rotateX(Math.PI / 2).scale(1, 1, 1.3).translate(0, 3 * 0.125 + 0.02, -0.15).rotateY(0.18));
  return merge(parts);
};

/** Crumpled tissue sheet (for a bag mouth): a plane displaced by layered waves. */
export const tissue = (seed = 1, w = 1.7, h = 1.3) =>
  grid(26, 20, (u, v) => {
    const a = seed * 1.7;
    const d = 0.1 * Math.sin(u * 9 + a) * Math.cos(v * 7 - a) + 0.07 * Math.sin(u * 17 + v * 11 + a) + 0.05 * Math.cos(u * 29 - v * 23);
    return V((u - 0.5) * w * (0.85 + 0.3 * v), v * h, d * (0.3 + v));
  });

/** Far mountain ridge: a jagged extruded silhouette (len wide, peaks to ~hgt), base at y=0. */
export const ridge = (len = 80, hgt = 8, seed = 1) => {
  const s = new THREE.Shape();
  s.moveTo(-len / 2, 0);
  const n = 34;
  for (let i = 0; i <= n; i++) {
    const x = -len / 2 + (i / n) * len;
    const y = hgt * (0.25 + 0.75 * Math.abs(Math.sin(i * 1.9 + seed) * Math.cos(i * 0.7 + seed * 2))) * (i === 0 || i === n ? 0.3 : 1);
    s.lineTo(x, y);
  }
  s.lineTo(len / 2, 0);
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 1.5, bevelEnabled: false });
  g.computeVertexNormals();
  return g;
};

/** Ribbon spool: two flanges on a core, a wound ribbon mass, a loose end. */
export const spool = () => {
  const flange = (y: number) => lathe([[0, 0], [0.9, 0], [0.92, 0.04], [0.9, 0.08], [0, 0.08]], 48).translate(0, y, 0);
  const core = new THREE.CylinderGeometry(0.32, 0.32, 1.0, 32).translate(0, 0.5, 0);
  const wound = lathe([[0.32, 0.1], [0.78, 0.1], [0.8, 0.5], [0.78, 0.9], [0.32, 0.9]], 64);
  const end = ribbonStrip(new THREE.CatmullRomCurve3([V(0.8, 0.5, 0), V(1.3, 0.42, 0.3), V(1.9, 0.2, 0.35), V(2.5, 0.03, 0.2)]), 0.3, 32, V(0, 1, 0), 0.06);
  return merge([flange(0), flange(0.92), core, wound, end]);
};
