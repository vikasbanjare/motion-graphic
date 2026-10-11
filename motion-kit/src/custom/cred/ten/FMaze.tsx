/**
 * Ten-film set, F: "Guilloche Maze" (30 s, 720 frames, 24 fps). UNOFFICIAL SPEC WORK.
 * Storyboard: docs/storyboards/cred-10.md (F). Method: skills/art-director/SKILL.md. Facts and sources: night/kit.tsx.
 *
 * The idea (replacement: one line of the card's own engraving is the road): a single line of the rosette glows, rides
 * off the card and becomes the handrail of a shopping arcade (5%), then a plane's contrail (flights), then the carpet
 * line of a hotel corridor (hotels), then the rail along a store's shelves (2,000+ products), then it passes through an
 * open guilloche ring (zero joining fee) and coils back into the rosette. One continuous camera, one continuous line.
 * Fluent device: the line. Material truth: the card's guilloche.
 *
 * Music: original score at 125 BPM, key E (v2/audio/cred_score.py), pizzicato-like plucks per world.
 */
import React, { useMemo } from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EMesh, Gltf, M, World } from "../v2/three.tsx";
import { P, expoOut, inOut, lerp, ramp } from "../v2/look.ts";
import { airplane, cardBody, roundRect } from "../v2/models.ts";
import { merge } from "../v2/models2.ts";
import { cloudBank } from "../v2/subjects.ts";
import { Head } from "../CredCardV3.tsx";
import { face } from "../v3/card.ts";
import { Logo, Paper } from "../night/kit.tsx";

export const F_FRAMES = 720;
type V3 = [number, number, number];
const T = { leave: 60, arcade: 84, sky: 192, corridor: 312, store: 408, gate: 528, home: 600, real: 648, lock: 672 };

// the rosette on the printed card face (card 8.56 x 5.398 at z 0; art 1712 x 1080, rosette at 1330, 380)
const ROS: V3 = [(1330 / 1712 - 0.5) * 8.56, (0.5 - 380 / 1080) * 5.398, 0.02];

/** The line's path: waypoints through the worlds and back home. */
const spiral: V3[] = Array.from({ length: 13 }, (_, i) => {
  const a = -Math.PI * 0.5 + (i / 12) * Math.PI * 2.2;
  const r = 0.12 + 0.5 * (i / 12);
  return [ROS[0] + r * Math.cos(a), ROS[1] + r * Math.sin(a), 0.03];
});
// waypoints per beat; U below is computed from the curve's real arc length, so the beats land where they say
const SEG: Record<string, V3[]> = {
  leave: [...spiral, [ROS[0] + 1.3, ROS[1] + 0.3, 0.03], [ROS[0] + 1.6, ROS[1] + 0.9, 0.08]], // one turn inside the rosette, then leaves along +y
  arcade: [[3.2, 3.5, 0.3], [3.0, 6.5, 0.45], [2.6, 10.0, 0.5]], // y 3.5-10 (handrail height)
  sky: [[2.2, 12.5, 2.2], [1.0, 16.0, 4.6], [-1.0, 19.0, 2.8], [-2.0, 21.3, 0.6]], // climbs into a contrail, lands before the corridor
  corridor: [[-2.0, 22.5, 0.45], [-2.0, 28.0, 0.45]], // carpet height
  store: [[-1.2, 31.0, 1.1], [0.6, 34.5, 1.1], [2.2, 38.0, 1.1]], // along the shelves
  gate: [[2.4, 41.5, 1.6], [2.4, 44.0, 1.6]], // through the ring at y 42.8
  home: [[1.0, 46.0, 5.0], [-3.0, 34.0, 9.0], [-4.0, 12.0, 6.0], [ROS[0] - 0.6, ROS[1] - 0.5, 0.6], [ROS[0] - 0.3, ROS[1], 0.03]],
};
const ORDER = ["leave", "arcade", "sky", "corridor", "store", "gate", "home"] as const;
const WAY: V3[] = ORDER.flatMap((k) => SEG[k]);
const CURVE = new THREE.CatmullRomCurve3(WAY.map((p) => new THREE.Vector3(...p)), false, "catmullrom", 0.5);
const LEN = CURVE.getLengths(4000);
const uOfIndex = (i: number) => LEN[Math.round((i / (WAY.length - 1)) * 4000)] / LEN[4000];
const endIndex = (k: (typeof ORDER)[number]) => ORDER.slice(0, ORDER.indexOf(k) + 1).reduce((n, kk) => n + SEG[kk].length, 0) - 1;
const U = {
  leave: 0.0,
  spiral: uOfIndex(spiral.length - 1),
  arcade: uOfIndex(endIndex("leave")),
  arcadeEnd: uOfIndex(endIndex("arcade")),
  skyEnd: uOfIndex(endIndex("sky")),
  corridorEnd: uOfIndex(endIndex("corridor")),
  storeEnd: uOfIndex(endIndex("store")),
  gate: uOfIndex(endIndex("gate")),
  home: 1.0,
};
const uAt = (f: number) => {
  const seg = (a: number, b: number, ua: number, ub: number) => lerp(ua, ub, inOut(ramp(f, a, b, (t) => t)));
  if (f < T.arcade) return seg(T.leave, T.arcade, U.leave, U.arcade);
  if (f < T.sky) return seg(T.arcade, T.sky, U.arcade, U.arcadeEnd);
  if (f < T.corridor) return seg(T.sky, T.corridor, U.arcadeEnd, U.skyEnd);
  if (f < T.store) return seg(T.corridor, T.store, U.skyEnd, U.corridorEnd);
  if (f < T.gate) return seg(T.store, T.gate, U.corridorEnd, U.storeEnd);
  if (f < T.home) return seg(T.gate, T.home, U.storeEnd, U.gate);
  return seg(T.home, T.real + 12, U.gate, U.home);
};

const CamN: React.FC<{ pos: V3; target: V3; fov?: number; near?: number }> = ({ pos, target, fov = 40, near = 0.02 }) => {
  const { camera } = useThree();
  const c = camera as THREE.PerspectiveCamera;
  c.fov = fov;
  c.near = near;
  c.far = 400;
  c.position.set(...pos);
  c.up.set(0, 0, 1);
  c.lookAt(new THREE.Vector3(...target));
  c.updateProjectionMatrix();
  return null;
};

const m = (palette: typeof P.teal, seed: number, extra: Record<string, unknown> = {}) => ({ palette, seed, space: 0 as const, angleDeg: 45, spec: 0.35, albedoNoise: 0.15, ...extra });

const Maze: React.FC<{ f: number }> = ({ f }) => {
  const geo = useMemo(() => {
    const tube = new THREE.TubeGeometry(CURVE, 900, 0.045, 10, false);
    const shop = (i: number) => merge([
      new THREE.BoxGeometry(1.5, 1.2, 1.15 + 0.15 * (i % 3)).translate(0, 0, 0.6 + 0.07 * (i % 3)),
      new THREE.BoxGeometry(1.6, 0.42, 0.05).translate(0, -0.72, 0.86), // awning
      new THREE.BoxGeometry(1.62, 1.3, 0.08).translate(0, 0, 1.2 + 0.15 * (i % 3)), // roof slab
      ...Array.from({ length: 5 }, (_, k) => new THREE.BoxGeometry(0.03, 0.46, 0.05).translate(-0.7 + k * 0.35, -0.76, 0.86)), // awning ribs
    ]);
    const shops = Array.from({ length: 8 }, (_, i) => shop(i));
    const windows = new THREE.BoxGeometry(1.0, 0.04, 0.55).translate(0, -0.61, 0.42);
    const corridor = merge([
      new THREE.BoxGeometry(3.2, 7, 0.1).translate(0, 0, -0.05), // floor
      new THREE.BoxGeometry(0.1, 7, 2.6).translate(-1.6, 0, 1.3),
      new THREE.BoxGeometry(0.1, 7, 2.6).translate(1.6, 0, 1.3),
      new THREE.BoxGeometry(3.2, 7, 0.1).translate(0, 0, 2.65),
    ]);
    const door = new THREE.BoxGeometry(0.06, 0.9, 2.0).translate(0, 0.45, 1.0); // hinged at y = 0 edge
    const shelf = merge([
      new THREE.BoxGeometry(2.4, 0.6, 0.08).translate(0, 0, 0.0),
      new THREE.BoxGeometry(2.4, 0.6, 0.08).translate(0, 0, 1.1),
      new THREE.BoxGeometry(0.08, 0.6, 2.2).translate(-1.16, 0, 1.1),
      new THREE.BoxGeometry(0.08, 0.6, 2.2).translate(1.16, 0, 1.1),
    ]);
    const ring = new THREE.TorusGeometry(1.5, 0.11, 14, 64);
    const ringLines = merge(Array.from({ length: 10 }, (_, i) => new THREE.TorusGeometry(1.5, 0.012, 6, 96, Math.PI * 2).scale(1, 1, 1).rotateY(i * 0.31).translate(0, 0, 0)));
    const plane = airplane();
    const ground = new THREE.PlaneGeometry(60, 60);
    const clouds = cloudBank(7, 2);
    const faceG = new THREE.ShapeGeometry(roundRect(8.56, 5.398, 0.32), 12);
    const uv = faceG.getAttribute("uv") as THREE.BufferAttribute;
    const fp = faceG.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < fp.count; i++) uv.setXY(i, fp.getX(i) / 8.56 + 0.5, fp.getY(i) / 5.398 + 0.5);
    return { tube, shops, windows, corridor, door, shelf, ring, ringLines, plane, ground, clouds, body: cardBody(), faceG };
  }, []);
  const faceMat = useMemo(() => {
    const t = face("print").tex.clone();
    t.needsUpdate = true;
    return new THREE.MeshBasicMaterial({ map: t });
  }, []);
  const u = uAt(f);
  // the line draws ahead of the camera
  const drawn = Math.min(1, Math.max(u + 0.012, U.spiral * ramp(f, 14, T.leave - 6, expoOut)));
  const idx = geo.tube.index!.count;
  geo.tube.setDrawRange(0, Math.floor(idx * drawn));
  // camera: behind and above the line's head, looking ahead along the curve
  const P0 = CURVE.getPointAt(Math.max(0, u - 0.008));
  const P1 = CURVE.getPointAt(Math.min(1, u + 0.014));
  const tan = CURVE.getTangentAt(Math.min(0.999, u));
  const side = new THREE.Vector3(-tan.y, tan.x, 0).normalize();
  const high = ramp(f, T.leave, T.arcade + 6, inOut);
  const push = ramp(f, 6, T.leave, inOut);
  const introPos = new THREE.Vector3(0, -3.2, 9.0).lerp(new THREE.Vector3(ROS[0] - 1.1, ROS[1] - 1.9, 2.6), push);
  const camP = new THREE.Vector3().copy(P0).addScaledVector(side, 0.9).add(new THREE.Vector3(0, 0, 0.85 + (u > U.arcadeEnd && u < U.skyEnd ? 0.6 : 0)));
  const home = ramp(f, T.home + 30, T.real + 12, inOut);
  const finalPos = new THREE.Vector3(0, -1.4, 10.5);
  const pos = introPos.clone().lerp(camP, high).lerp(finalPos, home);
  const introTarget = new THREE.Vector3(0, 0.2, 0).lerp(new THREE.Vector3(ROS[0], ROS[1] + 0.2, 0), push);
  const target = introTarget.lerp(P1, high).lerp(new THREE.Vector3(0, 0, 0), home);
  // each world exists only around its beat (fades in ahead of the line, out behind it)
  const vis = (a: number, b: number) => ramp(f, a - 26, a - 2) * (1 - ramp(f, b + 6, b + 30));
  const V = { arcade: vis(T.arcade, T.sky), sky: vis(T.sky, T.corridor), corridor: vis(T.corridor, T.store), store: vis(T.store, T.gate), gate: vis(T.gate, T.home) };
  const lineLive = { foilPhase: f * 0.01, lift: 0.25 };
  const doorOpen = (i: number) => ramp(f, T.corridor + 10 + i * 9, T.corridor + 24 + i * 9, expoOut);
  const shelfOn = (i: number) => ramp(f, T.store + 14 + i * 16, T.store + 26 + i * 16, expoOut);
  const planeU = Math.min(U.skyEnd, Math.max(U.arcadeEnd, u + 0.008));
  const planeP = CURVE.getPointAt(planeU);
  const planeT = CURVE.getTangentAt(planeU);
  const yaw = Math.atan2(planeT.y, planeT.x);
  const pitch = Math.asin(Math.max(-1, Math.min(1, planeT.z)));
  const ringLight = ramp(f, T.gate + 10, T.gate + 50, inOut);
  return (
    <>
      <CamN pos={[pos.x, pos.y, pos.z]} target={[target.x, target.y, target.z]} fov={lerp(30, 46, high) * (1 - 0.25 * home)} near={0.02} />
      {/* the printed card, lying at the origin */}
      <EMesh g={geo.body} m={m(P.green, 1, { albedoNoise: 0.05 })} pos={[0, 0, -0.045]} live={{ ambient: 0.1, lift: 0.08 }} />
      <mesh geometry={geo.faceG} material={faceMat} position={[0, 0, 0.0]} />
      {/* the line */}
      <EMesh g={geo.tube} m={m(P.brass, 2, { foil: 0.35, spec: 0.7, shininess: 60 })} live={lineLive} />
      {/* ground for the worlds */}
      {high > 0 && <EMesh g={geo.ground} m={m(P.teal, 3, { albedoNoise: 0.2 })} pos={[0, 30, -0.12]} live={{ ambient: 0.12, lift: 0.04, opacity: high * (1 - 0.8 * V.sky) }} />}
      {/* arcade: shop fronts either side of the line */}
      {V.arcade > 0 && geo.shops.map((g, i) => {
        const lit = ramp(f, T.arcade + 8 + i * 8, T.arcade + 20 + i * 8, expoOut);
        const pos: V3 = [i % 2 ? 4.6 : 1.3, 3.8 + Math.floor(i / 2) * 1.75, 0];
        return (
          <group key={i} position={pos} rotation={[0, 0, i % 2 ? Math.PI : 0]}>
            <EMesh g={g} m={m(P.teal, 10 + i)} live={{ ambient: 0.12, lift: 0.05 + 0.12 * lit, opacity: V.arcade }} />
            <EMesh g={geo.windows} m={m(P.teal, 60 + i, { spec: 0.6 })} live={{ ambient: 0.2, lift: 0.1 + 0.55 * lit, opacity: V.arcade }} />
          </group>
        );
      })}
      {/* sky: clouds and the plane that draws the contrail */}
      {V.sky > 0 && <EMesh g={geo.clouds} m={m(P.indigo, 20, { albedoNoise: 0.1 })} pos={[0.5, 17, 2.4]} scale={0.9} live={{ ambient: 0.14, lift: 0.1, opacity: V.sky }} />}
      {V.sky > 0 && <EMesh g={geo.clouds} m={m(P.indigo, 21, { albedoNoise: 0.1 })} pos={[-3.5, 14, 3.6]} scale={0.6} live={{ ambient: 0.14, lift: 0.12, opacity: V.sky }} />}
      {u > U.arcadeEnd - 0.02 && u < U.skyEnd + 0.02 && (
        <EMesh g={geo.plane} m={m(P.indigo, 22, { spec: 0.6 })} pos={[planeP.x, planeP.y, planeP.z + 0.05]} rot={[0, -pitch, yaw]} scale={0.16} live={{ ambient: 0.12, lift: 0.12 }} />
      )}
      {/* hotel corridor with doors opening on the beat */}
      {V.corridor > 0 && <EMesh g={geo.corridor} m={m(P.terra, 30)} pos={[-2.0, 25.3, 0]} live={{ ambient: 0.12, lift: 0.04, opacity: V.corridor }} />}
      {V.corridor > 0 && Array.from({ length: 6 }, (_, i) => (
        <group key={i} position={[i % 2 ? -0.45 : -3.55, 22.8 + i * 0.95, 0]} rotation={[0, 0, (i % 2 ? -1 : 1) * 1.3 * doorOpen(i)]}>
          <EMesh g={geo.door} m={m(P.terra, 31 + i)} live={{ ambient: 0.12, lift: 0.08 + 0.2 * doorOpen(i), opacity: V.corridor }} />
        </group>
      ))}
      {/* store: shelves with scanned products, lighting as the line passes */}
      {V.store > 0 && [0, 1, 2].map((i) => (
        <EMesh key={i} g={geo.shelf} m={m(P.rose, 40 + i)} pos={[-0.6 + i * 1.7, 31.5 + i * 3.4, 0]} live={{ ambient: 0.12, lift: 0.05 + 0.2 * shelfOn(i), opacity: V.store }} />
      ))}
      {V.store > 0 && (
        <>
          <Gltf url={M.camera} size={0.8} m={m(P.rose, 43, { mapAmt: 0.8, opacity: 0.999 })} pos={[-0.9, 31.5, 1.18]} rot={[Math.PI / 2, 0, 0.3]} live={{ ambient: 0.12, lift: 0.1 + 0.3 * shelfOn(0), opacity: V.store }} />
          <Gltf url={M.watch} size={0.7} m={m(P.rose, 44, { mapAmt: 0.8, opacity: 0.999 })} pos={[1.0, 34.9, 1.18]} rot={[Math.PI / 2, 0, -0.2]} live={{ ambient: 0.12, lift: 0.1 + 0.3 * shelfOn(1), opacity: V.store }} />
          <Gltf url={M.vase} size={0.9} m={m(P.rose, 45, { mapAmt: 0.8, opacity: 0.999 })} pos={[2.5, 38.3, 1.18]} rot={[Math.PI / 2, 0, 0.2]} live={{ ambient: 0.12, lift: 0.1 + 0.3 * shelfOn(2), opacity: V.store }} />
          <Gltf url={M.box} size={0.7} m={m(P.rose, 46, { mapAmt: 0.8, opacity: 0.999 })} pos={[0.2, 31.5, 0.08]} rot={[Math.PI / 2, 0, 0.6]} live={{ ambient: 0.12, lift: 0.1 + 0.3 * shelfOn(0), opacity: V.store }} />
        </>
      )}
      {/* the gate: a guilloche ring standing across the line, open */}
      {V.gate > 0 && (
        <group position={[2.4, 42.8, 1.6]} rotation={[Math.PI / 2, 0, 0]}>
          <EMesh g={geo.ring} m={m(P.green, 50, { spec: 0.6 })} live={{ ambient: 0.12, lift: 0.08 + 0.25 * ringLight, opacity: V.gate }} />
          <EMesh g={geo.ringLines} m={m(P.green, 51)} live={{ ambient: 0.12, lift: 0.1 + 0.3 * ringLight, opacity: V.gate }} />
        </group>
      )}
    </>
  );
};

// ---- the real card ---------------------------------------------------------------------------------------------------
const Env: React.FC = () => {
  const { gl, scene } = useThree();
  useMemo(() => {
    const pm = new THREE.PMREMGenerator(gl);
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 1.0;
  }, [gl, scene]);
  return null;
};
const RealCard: React.FC<{ f: number }> = ({ f }) => {
  const geo = useMemo(() => {
    const body = cardBody();
    const faceG = new THREE.ShapeGeometry(roundRect(8.56, 5.398, 0.32), 12);
    const uv = faceG.getAttribute("uv") as THREE.BufferAttribute;
    const pos = faceG.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / 8.56 + 0.5, pos.getY(i) / 5.398 + 0.5);
    return { body, faceG };
  }, []);
  const mats = useMemo(() => ({
    metal: new THREE.MeshPhysicalMaterial({ map: face("metal").tex, roughness: 0.34, metalness: 0.5, clearcoat: 1, clearcoatRoughness: 0.12 }),
    back: new THREE.MeshPhysicalMaterial({ color: "#26272c", roughness: 0.4, metalness: 0.6 }),
    edge: new THREE.MeshPhysicalMaterial({ color: "#b9b9c4", roughness: 0.22, metalness: 1 }),
  }), []);
  const turn = ramp(f, T.real + 6, T.real + 50, inOut);
  const toLock = ramp(f, T.lock, T.lock + 26, inOut);
  const yaw = THREE.MathUtils.degToRad(lerp(0, -24, turn) + lerp(0, 12, toLock) + 1.5 * Math.sin(f / 30));
  const pitch = THREE.MathUtils.degToRad(lerp(0, -8, turn) + 3 * toLock);
  return (
    <>
      <CamN pos={[0, -1.4, 10.5]} target={[0, 0, 0]} fov={34} />
      <Env />
      <ambientLight intensity={0.45} />
      <directionalLight position={[-7 + 10 * ramp(f, T.real, T.real + 60), 5, 7]} intensity={2.2} color="#fff6ea" />
      <directionalLight position={[8, 2, -6]} intensity={2.0} color="#874bf9" />
      <group position={[0, lerp(0, 2.0, toLock), 0]} rotation={[pitch, yaw, 0]} scale={lerp(0.95, 0.6, toLock)}>
        <mesh geometry={geo.body} material={mats.edge} />
        <mesh geometry={geo.faceG} material={mats.metal} position={[0, 0, 0.0425]} />
        <mesh geometry={geo.faceG} material={mats.back} position={[0, 0, -0.0425]} rotation={[0, Math.PI, 0]} />
      </group>
    </>
  );
};

export const FMaze: React.FC = () => {
  const f = useCurrentFrame();
  const realIn = ramp(f, T.real, T.real + 16);
  const lightsOut = ramp(f, T.lock - 6, T.lock + 12);
  const endFade = ramp(f, 704, 719, (t) => t);
  const bg = f < T.sky ? "#d9ece2" : f < T.corridor ? "#dfe0f2" : f < T.store ? "#f3d9cc" : f < T.gate ? "#f7e3ea" : "#e3ecd9";
  return (
    <AbsoluteFill style={{ background: f >= T.real ? "#0c0c10" : bg }}>
      {f < T.real + 16 && (
        <AbsoluteFill style={{ opacity: 1 - realIn }}>
          <World><Maze f={f} /></World>
        </AbsoluteFill>
      )}
      {f >= T.real && (
        <AbsoluteFill style={{ opacity: realIn }}>
          <AbsoluteFill style={{ background: "linear-gradient(180deg, #121216 0%, #1a1a20 100%)" }} />
          <World aa><RealCard f={f} /></World>
        </AbsoluteFill>
      )}
      <Paper opacity={0.6} />
      <Head f={f} from={34} to={T.arcade - 4} big={["the CRED IndusInd Bank", "RuPay credit card"]} x={110} y={110} ink="#eef3e6" sheen="#ffffff" size={72} />
      <Head f={f} from={T.arcade + 12} to={T.sky - 8} big={["5% rewards"]} small="on online shopping" x={110} y={110} ink="#e6f4ee" sheen="#ffffff" size={112} />
      <Head f={f} from={T.sky + 14} to={T.corridor - 8} big={["redeem on flights"]} x={110} y={110} ink="#262c66" sheen="#8a93d6" size={96} />
      <Head f={f} from={T.corridor + 14} to={T.store - 8} big={["and hotels"]} x={110} y={110} ink="#fbe6da" sheen="#ffffff" size={96} />
      <Head f={f} from={T.store + 14} to={T.gate - 8} big={["and 2,000+ products"]} small="on CRED store" x={110} y={110} ink="#6d2a49" sheen="#b9688a" size={92} />
      <Head f={f} from={T.gate + 12} to={T.home + 30} big={["zero joining fee"]} x={110} y={110} ink="#1c3d2a" sheen="#7aa483" size={104} />
      {f >= T.lock - 6 && <AbsoluteFill style={{ background: "#000", opacity: lightsOut * 0.4 }} />}
      {f >= T.lock + 14 && <Logo f={f} at={T.lock + 14} y={700} h={96} />}
      <AbsoluteFill style={{ background: "#000", opacity: endFade }} />
      <Audio src={staticFile("custom/cred-ten/f.wav")} />
    </AbsoluteFill>
  );
};
