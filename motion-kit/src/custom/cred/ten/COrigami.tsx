/**
 * Ten-film set, C: "Origami Card" (30 s, 720 frames, 24 fps). UNOFFICIAL SPEC WORK.
 * Storyboard: docs/storyboards/cred-10.md (C). Method: skills/art-director/SKILL.md. Facts and sources: night/kit.tsx.
 *
 * The idea (fusion: the card is paper that folds into each benefit): the printed card lies on a cutting mat. It folds
 * into a shopping bag that fills with light (5%), unfolds and refolds into a paper plane that flies across the mat
 * (flights), lands and pops up into a hotel (hotels), collapses into a box that fans open with scanned products
 * (2,000+), then a tag folds up and flattens to nothing (zero joining fee). The flat card is lifted and flipped: its
 * back is the real metal card. Every panel is a piece of the card's own print; one camera orbits the mat.
 * Fluent device: the fold. Material truth: the card as paper.
 *
 * Music: bright plucked bed at 120 BPM in A (tools/music_bed.py) with paper foley.
 */
import React, { useMemo } from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EMesh, Gltf, M, World } from "../v2/three.tsx";
import { P, expoOut, inOut, lerp, ramp } from "../v2/look.ts";
import { merge } from "../v2/models2.ts";
import { Head } from "../CredCardV3.tsx";
import { face } from "../v3/card.ts";
import { Logo, Paper } from "../night/kit.tsx";

export const C_FRAMES = 720;
type V3 = [number, number, number];
const T = { score: 24, bag: 72, plane: 168, hotel: 264, box: 360, tag: 456, lift: 552, flip: 584, lock: 672 };
const W = 8.56, H = 5.398;

const CamN: React.FC<{ pos: V3; target: V3; fov?: number }> = ({ pos, target, fov = 36 }) => {
  const { camera } = useThree();
  const c = camera as THREE.PerspectiveCamera;
  c.fov = fov;
  c.near = 0.05;
  c.far = 200;
  c.position.set(...pos);
  c.up.set(0, 0, 1);
  c.lookAt(new THREE.Vector3(...target));
  c.updateProjectionMatrix();
  return null;
};
const Env: React.FC = () => {
  const { gl, scene } = useThree();
  useMemo(() => {
    const pm = new THREE.PMREMGenerator(gl);
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.9;
  }, [gl, scene]);
  return null;
};

/** A hinge: rotates its children about `axis` through `at` by `angle`. */
const Hinge: React.FC<{ at: V3; axis: V3; angle: number; children: React.ReactNode }> = ({ at, axis, angle, children }) => {
  const q = useMemo(() => new THREE.Quaternion(), []);
  q.setFromAxisAngle(new THREE.Vector3(...axis).normalize(), angle);
  return <group position={at} quaternion={q}>{children}</group>;
};

/** A rectangular piece of the card: local rect [x0,x1]x[y0,y1] in card space, with the matching piece of the print. */
const piece = (x0: number, y0: number, x1: number, y1: number) => {
  const g = new THREE.PlaneGeometry(x1 - x0, y1 - y0).translate((x0 + x1) / 2, (y0 + y1) / 2, 0);
  const uv = g.getAttribute("uv") as THREE.BufferAttribute;
  const pos = g.getAttribute("position") as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / W + 0.5, pos.getY(i) / H + 0.5);
  return g;
};
/** A triangular piece (card-space corners). */
const tri = (a: [number, number], b: [number, number], c: [number, number]) => {
  const s = new THREE.Shape([new THREE.Vector2(...a), new THREE.Vector2(...b), new THREE.Vector2(...c)]);
  const g = new THREE.ShapeGeometry(s);
  const uv = g.getAttribute("uv") as THREE.BufferAttribute;
  const pos = g.getAttribute("position") as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / W + 0.5, pos.getY(i) / H + 0.5);
  return g;
};
/** Moves a piece so that the hinge edge point `at` becomes the local origin (so Hinge can rotate it about that edge). */
const rel = (g: THREE.BufferGeometry, at: V3) => g.clone().translate(-at[0], -at[1], -at[2]);

const PAPER = (seed: number, extra: Record<string, unknown> = {}) => ({ palette: P.green, seed, space: 0 as const, angleDeg: 45, spec: 0.25, albedoNoise: 0.06, mapAmt: 1.0, periodFrac: 0.0066, ...extra });

// ---- the shapes (each one is the flat card at t = 0) --------------------------------------------------------------
const Bag: React.FC<{ t: number; lit: number; tex: THREE.Texture; stand: number }> = ({ t, lit, tex, stand }) => {
  const g = useMemo(() => {
    const w = W / 4;
    const p = [0, 1, 2, 3].map((i) => piece(-W / 2 + i * w, -H / 2, -W / 2 + (i + 1) * w, H / 2));
    const handle = new THREE.TorusGeometry(0.7, 0.05, 8, 32, Math.PI);
    return { p, w, handle };
  }, []);
  const a = (Math.PI / 2) * t;
  const live = { ambient: 0.14, lift: 0.14 + 0.5 * lit, key: [-0.3, -0.5, 0.8] as V3 };
  const mat = (i: number) => PAPER(1 + 0 * i, { map: tex }); // one seed for every piece: no texture pop when shapes swap
  const w = g.w;
  // the whole card stands up on its bottom edge while the panels wrap round
  return (
    <Hinge at={[0, -H / 2, 0]} axis={[1, 0, 0]} angle={(Math.PI / 2) * stand}>
      <group position={[0, H / 2, 0]}>
        <EMesh g={g.p[0]} m={mat(0)} double live={live} />
        <Hinge at={[-W / 2 + w, 0, 0]} axis={[0, 1, 0]} angle={-a}>
          <EMesh g={rel(g.p[1], [-W / 2 + w, 0, 0])} m={mat(1)} double live={live} />
          <Hinge at={[w, 0, 0]} axis={[0, 1, 0]} angle={-a}>
            <EMesh g={rel(g.p[2], [-W / 2 + 2 * w, 0, 0])} m={mat(2)} double live={live} />
            <Hinge at={[w, 0, 0]} axis={[0, 1, 0]} angle={-a}>
              <EMesh g={rel(g.p[3], [-W / 2 + 3 * w, 0, 0])} m={mat(3)} double live={live} />
            </Hinge>
          </Hinge>
        </Hinge>
        {/* handles rise from the top edge once the bag is closed */}
        {t > 0.9 && [0, 1].map((i) => (
          <EMesh key={i} g={g.handle} m={PAPER(20 + i, { spec: 0.5 })} pos={[-W / 2 + w / 2, H / 2, i ? -w + 0.05 : -0.05]} scale={lerp(0.001, 1, ramp(t, 0.9, 1, expoOut))} live={live} />
        ))}
      </group>
    </Hinge>
  );
};

const Plane: React.FC<{ t: number; tex: THREE.Texture }> = ({ t, tex }) => {
  const g = useMemo(() => {
    const half = (s: number) => piece(-W / 2, s > 0 ? 0 : -1.6, W / 2, s > 0 ? 1.6 : 0);
    const wing = (s: number) => piece(-W / 2, s > 0 ? 1.6 : -H / 2, W / 2, s > 0 ? H / 2 : -1.6);
    const nose = (s: number) => tri([W / 2, 0], [W / 2, s * H / 2], [W / 2 - 2.6, s * H / 2]);
    return { half: [half(1), half(-1)], wing: [wing(1), wing(-1)], nose: [nose(1), nose(-1)] };
  }, []);
  const fold = ramp(t, 0, 0.55, inOut);
  const wingF = ramp(t, 0.45, 1, inOut);
  const noseF = ramp(t, 0.2, 0.7, inOut);
  const live = { ambient: 0.14, lift: 0.14, key: [-0.3, -0.5, 0.8] as V3 };
  const mat = (i: number) => PAPER(1 + 0 * i, { map: tex }); // one seed for every piece: no texture pop when shapes swap
  return (
    <>
      {[1, -1].map((s, k) => (
        <Hinge key={k} at={[0, 0, 0]} axis={[1, 0, 0]} angle={s * (Math.PI / 2 - 0.15) * fold}>
          <EMesh g={g.half[k]} m={mat(k)} double live={live} />
          <Hinge at={[0, s * 1.6, 0]} axis={[1, 0, 0]} angle={-s * (Math.PI / 2 - 0.25) * wingF}>
            <EMesh g={rel(g.wing[k], [0, s * 1.6, 0])} m={mat(2 + k)} double live={live} />
          </Hinge>
          {/* nose corners fold under along their diagonals */}
          <Hinge at={[W / 2, 0, 0]} axis={[-2.6, s * H / 2, 0]} angle={-Math.PI * noseF}>
            <EMesh g={rel(g.nose[k], [W / 2, 0, 0.003])} m={mat(4 + k)} double live={live} />
          </Hinge>
        </Hinge>
      ))}
    </>
  );
};

const Hotel: React.FC<{ t: number; lit: number; tex: THREE.Texture }> = ({ t, lit, tex }) => {
  const g = useMemo(() => {
    const front = piece(-1.7, -1.0, 1.7, 2.0); // rises from the crease at y = -1
    const roof = piece(-1.7, 2.0, 1.7, 2.7); // folds over the top
    const back = piece(-1.7, -H / 2, 1.7, -1.0); // the page in front of the crease (stays)
    const left = piece(-W / 2, -H / 2, -1.7, H / 2);
    const right = piece(1.7, -H / 2, W / 2, H / 2);
    const windows = merge(Array.from({ length: 12 }, (_, i) => new THREE.BoxGeometry(0.5, 0.42, 0.03).translate(-1.05 + (i % 4) * 0.7, 0.25 + Math.floor(i / 4) * 0.72, 0.02)));
    const canopy = new THREE.BoxGeometry(1.4, 0.05, 0.6).translate(0, 0.0, 0.3);
    return { front, roof, back, left, right, windows, canopy };
  }, []);
  const live = { ambient: 0.14, lift: 0.14, key: [-0.3, -0.5, 0.8] as V3 };
  const litL = { ...live, lift: 0.2 + 0.6 * lit };
  const rise = ramp(t, 0, 0.7, expoOut);
  const roofF = ramp(t, 0.5, 1, inOut);
  const mat = (i: number) => PAPER(1 + 0 * i, { map: tex }); // one seed for every piece: no texture pop when shapes swap
  return (
    <>
      <EMesh g={g.left} m={mat(0)} double live={live} />
      <EMesh g={g.right} m={mat(1)} double live={live} />
      <EMesh g={g.back} m={mat(2)} double live={live} />
      <Hinge at={[0, -1.0, 0]} axis={[1, 0, 0]} angle={(Math.PI / 2) * rise}>
        <EMesh g={rel(g.front, [0, -1.0, 0])} m={mat(3)} double live={live} />
        <EMesh g={g.windows} m={PAPER(45, { spec: 0.6 })} pos={[0, 1.0, 0.0]} live={litL} />
        <Hinge at={[0, 0.4, 0]} axis={[1, 0, 0]} angle={-(Math.PI / 2) * roofF}>
          <EMesh g={g.canopy} m={PAPER(46)} live={live} />
        </Hinge>
        <Hinge at={[0, 3.0, 0]} axis={[1, 0, 0]} angle={-(Math.PI / 2) * roofF}>
          <EMesh g={rel(g.roof, [0, 2.0, 0])} m={mat(4)} double live={live} />
        </Hinge>
      </Hinge>
    </>
  );
};

const Box: React.FC<{ t: number; lit: number; tex: THREE.Texture }> = ({ t, lit, tex }) => {
  const g = useMemo(() => {
    const s = 0.9; // half side of the base; the sides reach the card's long edges exactly (3s = H/2)
    const base = piece(-s, -s, s, s);
    const sides = [
      piece(-s, s, s, 3 * s), // top (+y)
      piece(s, -s, 3 * s, s), // right (+x)
      piece(-s, -3 * s, s, -s), // bottom (-y)
      piece(-3 * s, -s, -s, s), // left (-x)
    ];
    const lid = piece(3 * s, -s, W / 2, s); // hinged on the right side's far edge
    const rest = [
      piece(-W / 2, -H / 2, -3 * s, H / 2), // far left strip
      piece(-3 * s, s, -s, H / 2), piece(s, s, 3 * s, H / 2), // top corners
      piece(-3 * s, -H / 2, -s, -s), piece(s, -H / 2, 3 * s, -s), // bottom corners
      piece(3 * s, s, W / 2, H / 2), piece(3 * s, -H / 2, W / 2, -s), // right strip above and below the lid
    ];
    const fan = new THREE.PlaneGeometry(1.6, 1.5).translate(0, 0.75, 0);
    return { s, base, sides, lid, rest, fan };
  }, []);
  const s = g.s;
  const up = ramp(t, 0, 0.45, inOut);
  const lidF = ramp(t, 0.35, 0.6, inOut) * (Math.PI / 2) - ramp(t, 0.6, 0.85, inOut) * (Math.PI * 0.95);
  const fanF = ramp(t, 0.7, 1, expoOut);
  const live = { ambient: 0.14, lift: 0.14, key: [-0.3, -0.5, 0.8] as V3 };
  const litL = { ...live, lift: 0.2 + 0.55 * lit };
  const mat = (i: number) => PAPER(1 + 0 * i, { map: tex });
  const hinges: { at: V3; axis: V3; sgn: number }[] = [
    { at: [0, s, 0], axis: [1, 0, 0], sgn: -1 },
    { at: [s, 0, 0], axis: [0, 1, 0], sgn: 1 },
    { at: [0, -s, 0], axis: [1, 0, 0], sgn: 1 },
    { at: [-s, 0, 0], axis: [0, 1, 0], sgn: -1 },
  ];
  const products = [M.camera, M.watch, M.vase, M.box];
  return (
    <>
      <EMesh g={g.base} m={mat(0)} double live={live} />
      {g.rest.map((r, i) => <EMesh key={i} g={r} m={mat(6 + i)} double live={live} />)}
      {g.sides.map((sd, k) => (
        <Hinge key={k} at={hinges[k].at} axis={hinges[k].axis} angle={hinges[k].sgn * (Math.PI / 2) * up}>
          <EMesh g={rel(sd, hinges[k].at)} m={mat(1 + k)} double live={live} />
          {k === 1 && (
            <Hinge at={[2 * s, 0, 0]} axis={[0, 1, 0]} angle={lidF}>
              <EMesh g={rel(g.lid, [3 * s, 0, 0])} m={mat(5)} double live={live} />
            </Hinge>
          )}
        </Hinge>
      ))}
      {/* the fan of product cards rises from the back edge once the lid is open */}
      {fanF > 0 && [0, 1, 2, 3].map((i) => (
        <Hinge key={i} at={[0, s - 0.1, 0.02]} axis={[1, 0, 0]} angle={(Math.PI / 2 - 0.1 - i * 0.26) * fanF}>
          <EMesh g={g.fan} m={PAPER(60 + i)} double live={litL} />
          <Gltf url={products[i]} size={0.7} m={PAPER(70 + i, { mapAmt: 0.8 })} pos={[-0.45 + i * 0.3, 0.72, 0.03]} rot={[Math.PI / 2, 0, 0.3 * i]} live={litL} />
        </Hinge>
      ))}
    </>
  );
};

const Tag: React.FC<{ t: number; tex: THREE.Texture }> = ({ t, tex }) => {
  const g = useMemo(() => {
    const tag = piece(1.4, 0.4, 4.28, 2.7);
    const rest = merge([piece(-W / 2, -H / 2, 1.4, H / 2), piece(1.4, -H / 2, W / 2, 0.4)]);
    const hole = new THREE.TorusGeometry(0.16, 0.035, 8, 24);
    const string = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(1.75, 1.55, 0.02), new THREE.Vector3(0.9, 1.9, 0.3), new THREE.Vector3(-0.3, 1.7, 0.1)]), 24, 0.025, 6, false);
    return { tag, rest, hole, string };
  }, []);
  const live = { ambient: 0.14, lift: 0.14, key: [-0.3, -0.5, 0.8] as V3 };
  const upF = ramp(t, 0, 0.35, expoOut) * (1 - ramp(t, 0.6, 1, inOut)); // rises, then flattens to nothing
  const mat = (i: number) => PAPER(1 + 0 * i, { map: tex }); // one seed for every piece: no texture pop when shapes swap
  return (
    <>
      <EMesh g={g.rest} m={mat(0)} double live={live} />
      <Hinge at={[1.4, 0.4, 0]} axis={[0, 1, 0]} angle={-1.1 * upF}>
        <EMesh g={rel(g.tag, [1.4, 0.4, 0])} m={mat(1)} double live={live} />
        <EMesh g={g.hole} m={PAPER(82, { spec: 0.6 })} pos={[0.35, 1.15, 0.0]} live={{ ...live, opacity: upF }} />
      </Hinge>
      {upF > 0.02 && <EMesh g={g.string} m={PAPER(83)} live={{ ...live, opacity: upF }} />}
    </>
  );
};

/** The flat printed card (for the score beat and the lift). */
const Flat: React.FC<{ tex: THREE.Texture; creases: number }> = ({ tex, creases }) => {
  const g = useMemo(() => {
    const card = piece(-W / 2, -H / 2, W / 2, H / 2);
    const lines = merge([
      ...[1, 2, 3].map((i) => new THREE.BoxGeometry(0.012, H, 0.004).translate(-W / 2 + (i * W) / 4, 0, 0.004)),
      new THREE.BoxGeometry(W, 0.012, 0.004).translate(0, 0, 0.004),
      new THREE.BoxGeometry(W, 0.012, 0.004).translate(0, 1.6, 0.004),
      new THREE.BoxGeometry(W, 0.012, 0.004).translate(0, -1.6, 0.004),
      new THREE.BoxGeometry(0.012, 2.6, 0.004).translate(1.4, 1.7, 0.004),
    ]);
    return { card, lines };
  }, []);
  const live = { ambient: 0.14, lift: 0.14, key: [-0.3, -0.5, 0.8] as V3 };
  return (
    <>
      <EMesh g={g.card} m={PAPER(1, { map: tex })} double live={live} />
      {creases > 0 && <EMesh g={g.lines} m={PAPER(2, { palette: P.graphite })} live={{ ...live, lift: 0, opacity: 0.8 * creases }} />}
    </>
  );
};

const Scene: React.FC<{ f: number }> = ({ f }) => {
  const tex = useMemo(() => {
    const t = face("print").tex.clone();
    t.colorSpace = THREE.NoColorSpace;
    t.needsUpdate = true;
    return t;
  }, []);
  const matG = useMemo(() => {
    const mat = new THREE.PlaneGeometry(60, 60);
    const grid = merge([
      ...Array.from({ length: 25 }, (_, i) => new THREE.BoxGeometry(0.02, 60, 0.004).translate(-24 + i * 2, 0, 0)),
      ...Array.from({ length: 25 }, (_, i) => new THREE.BoxGeometry(60, 0.02, 0.004).translate(0, -24 + i * 2, 0)),
    ]);
    return { mat, grid };
  }, []);
  const metal = useMemo(() => new THREE.MeshPhysicalMaterial({ map: face("metal").tex, roughness: 0.34, metalness: 0.5, clearcoat: 1, clearcoatRoughness: 0.12 }), []);
  const metalG = useMemo(() => {
    const g = piece(-W / 2, -H / 2, W / 2, H / 2);
    g.rotateY(Math.PI); // faces -z: the back of the sheet
    const uv = g.getAttribute("uv") as THREE.BufferAttribute;
    for (let i = 0; i < uv.count; i++) uv.setX(i, 1 - uv.getX(i));
    return g;
  }, []);

  // which shape is on the mat, and how far it is folded (each beat: fold in, hold, unfold)
  const beat = (a: number, b: number, inF: number, outF: number) => ramp(f, a, a + inF, inOut) * (1 - ramp(f, b - outF, b, inOut));
  const bagT = beat(T.bag, T.plane, 40, 16);
  const planeT = beat(T.plane, T.hotel, 36, 14);
  const hotelT = beat(T.hotel, T.box, 44, 16);
  const boxT = beat(T.box, T.tag, 72, 14);
  const tagT = ramp(f, T.tag, T.lift - 10, (x) => x);
  const bagLit = ramp(f, T.bag + 44, T.bag + 70, expoOut);
  const stand = ramp(f, T.bag + 6, T.bag + 40, inOut) * (1 - ramp(f, T.plane - 16, T.plane, inOut));
  // the plane flies across the mat and lands
  const fly = ramp(f, T.plane + 40, T.hotel - 18, inOut);
  const flyPos: V3 = [lerp(0, 0, fly), lerp(0, 0, fly), Math.sin(Math.PI * fly) * 2.2];
  const flyRot: V3 = [0, -0.35 * Math.sin(Math.PI * fly), lerp(0, Math.PI * 2, fly)];
  // the lift and flip at the end
  const lift = ramp(f, T.lift, T.lift + 30, inOut);
  const flip = ramp(f, T.flip, T.flip + 44, inOut);
  const toLock = ramp(f, T.lock, T.lock + 26, inOut);
  const which = f < T.bag ? "flat" : f < T.plane ? "bag" : f < T.hotel ? "plane" : f < T.box ? "hotel" : f < T.tag ? "box" : f < T.lift ? "tag" : "flat";

  // camera: top-down, tilts to three-quarter as the first fold starts, then orbits slowly; the target follows the object
  const tilt = ramp(f, T.score + 20, T.bag + 20, inOut);
  const orbit = lerp(-Math.PI / 2, -Math.PI / 2 + 1.1, ramp(f, T.bag, T.lift, (x) => x));
  const near = which === "box" ? ramp(f, T.box + 10, T.box + 50, inOut) * (1 - ramp(f, T.tag - 20, T.tag, inOut)) : 0;
  const r = lerp(0.001, lerp(8.0, 5.6, near), tilt);
  const hgt = lerp(11.5, lerp(4.8, 3.4, near), tilt);
  const cx = which === "bag" ? -3.2 * stand : 0;
  const liftZ = which === "bag" ? 2.0 * stand : which === "plane" ? flyPos[2] : which === "hotel" ? 1.2 * hotelT : which === "box" ? 1.0 * boxT : 0;
  const endPos = new THREE.Vector3(0, -8.0, 6.3);
  const pos = new THREE.Vector3(cx + r * Math.cos(orbit), r * Math.sin(orbit), hgt).lerp(endPos, lift);
  const target = new THREE.Vector3(cx, 0, liftZ * 0.6).lerp(new THREE.Vector3(0, 0, 1.6), lift);
  return (
    <>
      <CamN pos={pos.toArray() as V3} target={target.toArray() as V3} fov={lerp(30, 36, tilt) * (1 - 0.1 * toLock)} />
      <Env />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-6, -8, 9]} intensity={2.2} color="#fff6ea" />
      <directionalLight position={[8, 4, 6]} intensity={1.4} color="#cfd4ff" />
      {/* the cutting mat */}
      <EMesh g={matG.mat} m={{ palette: P.teal, seed: 3, space: 0, angleDeg: 45, albedoNoise: 0.12 }} pos={[0, 0, -0.02]} live={{ ambient: 0.12, lift: 0.0, dim: 0.22, key: [-0.3, -0.5, 0.8] }} />
      <EMesh g={matG.grid} m={{ palette: P.teal, seed: 4, space: 0, angleDeg: 45 }} pos={[0, 0, -0.015]} live={{ ambient: 0.1, lift: 0.0, dim: 0.25 }} />
      <group position={[0, 0, lerp(0.0, 2.2, lift) + lerp(0, 1.2, toLock)]} rotation={[lerp(0, Math.PI, flip) + lerp(0, 0.55, lift) * (1 - flip) + 0.1 * toLock, 0, 0.12 * Math.sin(f / 40) * lift]} scale={lerp(1, 0.78, toLock)}>
        {which === "flat" && <Flat tex={tex} creases={f < T.bag ? ramp(f, T.score, T.score + 30, expoOut) * (1 - ramp(f, T.bag - 10, T.bag)) : 0} />}
        {which === "bag" && <Bag t={bagT} lit={bagLit} tex={tex} stand={stand} />}
        {which === "plane" && (
          <group position={flyPos} rotation={flyRot}>
            <Plane t={planeT} tex={tex} />
          </group>
        )}
        {which === "hotel" && <Hotel t={hotelT} lit={ramp(f, T.hotel + 40, T.hotel + 64, expoOut)} tex={tex} />}
        {which === "box" && <Box t={boxT} lit={ramp(f, T.box + 56, T.box + 80, expoOut)} tex={tex} />}
        {which === "tag" && <Tag t={tagT} tex={tex} />}
        {f >= T.lift && <mesh geometry={metalG} material={metal} position={[0, 0, -0.004]} />}
      </group>
    </>
  );
};

export const COrigami: React.FC = () => {
  const f = useCurrentFrame();
  const lightsOut = ramp(f, T.lock - 6, T.lock + 12);
  const endFade = ramp(f, 704, 719, (t) => t);
  const dark = ramp(f, T.flip, T.flip + 44, inOut);
  return (
    <AbsoluteFill style={{ background: "#d9ece2" }}>
      <AbsoluteFill style={{ background: "#0c0c10", opacity: dark }} />
      <World aa><Scene f={f} /></World>
      <Paper opacity={0.6} />
      <Head f={f} from={10} to={T.bag + 10} big={["the CRED IndusInd Bank", "RuPay credit card"]} x={110} y={110} ink="#1c3d2a" sheen="#7aa483" size={72} />
      <Head f={f} from={T.bag + 30} to={T.plane + 6} big={["5% rewards"]} small="on online shopping" x={110} y={110} ink="#1f5a5e" sheen="#64aaa3" size={112} />
      <Head f={f} from={T.plane + 30} to={T.hotel + 6} big={["redeem on flights"]} x={110} y={110} ink="#262c66" sheen="#8a93d6" size={96} />
      <Head f={f} from={T.hotel + 30} to={T.box + 6} big={["and hotels"]} x={110} y={110} ink="#6e2a22" sheen="#e8957a" size={96} />
      <Head f={f} from={T.box + 40} to={T.tag + 6} big={["and 2,000+ products"]} small="on CRED store" x={110} y={110} ink="#6d2a49" sheen="#b9688a" size={92} />
      <Head f={f} from={T.tag + 24} to={T.flip + 10} big={["zero joining fee"]} x={110} y={110} ink="#1c3d2a" sheen="#7aa483" size={104} />
      {f >= T.lock - 6 && <AbsoluteFill style={{ background: "#000", opacity: lightsOut * 0.4 }} />}
      {f >= T.lock + 14 && <Logo f={f} at={T.lock + 14} y={700} h={96} />}
      <AbsoluteFill style={{ background: "#000", opacity: endFade }} />
      <Audio src={staticFile("custom/cred-ten/c.wav")} />
    </AbsoluteFill>
  );
};
