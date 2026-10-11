/**
 * Ten-film set, J: "The Fee That Never Catches Up" (30 s, 720 frames, 24 fps). UNOFFICIAL SPEC WORK.
 * Storyboard: docs/storyboards/cred-10.md (J). Method: skills/art-director/SKILL.md. Facts and sources: night/kit.tsx.
 *
 * The idea (competition template, told as a chase): an engraved rubber stamp marked JOINING FEE hovers over the card.
 * It slams; the card slides away along the table into an online shop where 5% sparkles; the stamp hops after it. The
 * card boards a plane and the stamp misses (flights); the card checks into a hotel and the stamp hits the closed door
 * (hotels); the card hides among 2,000+ scanned products and the stamp loses it; the stamp finally lands and prints
 * only "0" (zero joining fee). The card comes back, lifts into the light and turns metal. Fluent device: the stamp's
 * hop. Material truth: the card as the thing a fee is printed on.
 *
 * Music: tech bed at 140 BPM in E (tools/music_bed.py): pluck arpeggio as a pizzicato chase; thuds for the stamp.
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
import { Head } from "../CredCardV3.tsx";
import { face } from "../v3/card.ts";
import { Logo, Paper } from "../night/kit.tsx";

export const J_FRAMES = 720;
type V3 = [number, number, number];
const T = { hover: 0, slam: 72, shop: 96, plane: 192, board: 216, lift: 250, hotel: 288, door: 330, store: 372, hide: 420, lost: 440, land: 468, zero: 500, back: 540, real: 600, turn: 612, lock: 672 };
// scene positions along the table (y)
const Y = { start: 0, shop: 9, plane: 22, hotel: 34, store: 45, land: 56 };
const CS = 0.3; // the card's scale on the table

const CamN: React.FC<{ pos: V3; target: V3; fov?: number }> = ({ pos, target, fov = 38 }) => {
  const { camera } = useThree();
  const c = camera as THREE.PerspectiveCamera;
  c.fov = fov;
  c.near = 0.05;
  c.far = 300;
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
    scene.environmentIntensity = 1.0;
  }, [gl, scene]);
  return null;
};
const m = (palette: typeof P.teal, seed: number, extra: Record<string, unknown> = {}) => ({ palette, seed, space: 0 as const, angleDeg: 45, spec: 0.3, albedoNoise: 0.12, ...extra });

/** The stamp's rubber face and the impressions it leaves (a texture each). */
const textTex = (s: string, mirror: boolean, size = 120, fill = "#2a2a2e") => {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 320;
  const x = c.getContext("2d")!;
  x.clearRect(0, 0, 512, 320);
  x.fillStyle = fill;
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.font = `700 ${size}px 'Lexend', 'DejaVu Sans', sans-serif`;
  if (mirror) {
    x.translate(512, 0);
    x.scale(-1, 1);
  }
  const lines = s.split("\n");
  lines.forEach((l, i) => x.fillText(l, 256, 160 + (i - (lines.length - 1) / 2) * (size * 1.05)));
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  return t;
};

const Table: React.FC<{ f: number }> = ({ f }) => {
  const cardTex = useMemo(() => {
    const t = face("print").tex.clone();
    t.colorSpace = THREE.NoColorSpace;
    t.needsUpdate = true;
    return t;
  }, []);
  const faceTex = useMemo(() => textTex("JOINING\nFEE", true, 96, "#3a1c18"), []);
  const zeroTex = useMemo(() => textTex("0", false, 230, "#7a2a22"), []);
  const geo = useMemo(() => {
    const table = new THREE.PlaneGeometry(40, 120).translate(0, 30, 0);
    const card = (() => {
      const g = new THREE.ShapeGeometry(roundRect(8.56, 5.398, 0.32), 10);
      const uv = g.getAttribute("uv") as THREE.BufferAttribute;
      const p = g.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < p.count; i++) uv.setXY(i, p.getX(i) / 8.56 + 0.5, p.getY(i) / 5.398 + 0.5);
      return { face: g, body: cardBody() };
    })();
    const stamp = {
      handle: merge([
        new THREE.CylinderGeometry(0.22, 0.3, 1.3, 20).rotateX(Math.PI / 2).translate(0, 0, 1.15),
        new THREE.SphereGeometry(0.34, 20, 14).translate(0, 0, 1.9),
        new THREE.CylinderGeometry(0.5, 0.55, 0.18, 24).rotateX(Math.PI / 2).translate(0, 0, 0.5),
      ]),
      base: new THREE.BoxGeometry(2.4, 1.5, 0.3).translate(0, 0, 0.3),
      rubber: new THREE.BoxGeometry(2.3, 1.4, 0.12).translate(0, 0, 0.1),
      faceG: new THREE.PlaneGeometry(2.1, 1.3).rotateX(Math.PI).translate(0, 0, 0.035),
    };
    const print = new THREE.PlaneGeometry(2.1, 1.3);
    const shops = merge(Array.from({ length: 4 }, (_, i) => merge([
      new THREE.BoxGeometry(2.0, 1.4, 1.5).translate(-3.2 + i * 2.15, 0, 0.75),
      new THREE.BoxGeometry(2.1, 0.5, 0.05).translate(-3.2 + i * 2.15, -0.85, 1.0),
    ])));
    const shopWin = merge(Array.from({ length: 4 }, (_, i) => new THREE.BoxGeometry(1.4, 0.04, 0.8).translate(-3.2 + i * 2.15, -0.72, 0.6)));
    const sparkle = merge(Array.from({ length: 10 }, (_, i) => new THREE.OctahedronGeometry(0.12).translate(-3.5 + i * 0.8, -1.9 + 0.6 * Math.sin(i), 0.9 + 0.5 * Math.cos(i * 1.3))));
    const plane = airplane();
    const ramp = new THREE.BoxGeometry(1.2, 2.6, 0.06).rotateX(0.35).translate(0, 0, 0.45);
    const hotel = merge([
      new THREE.BoxGeometry(5, 2.2, 3.2).translate(0, 1.1, 1.6),
      new THREE.BoxGeometry(5.4, 2.6, 0.2).translate(0, 1.1, 3.3),
      new THREE.BoxGeometry(2.6, 0.3, 0.06).translate(0, -0.15, 1.8), // canopy
    ]);
    const hotelWin = merge(Array.from({ length: 8 }, (_, i) => new THREE.BoxGeometry(0.5, 0.04, 0.5).translate(-1.75 + (i % 4) * 1.15, -0.02, 1.4 + Math.floor(i / 4) * 0.9)));
    const doorLeaf = new THREE.BoxGeometry(1.0, 0.08, 1.5).translate(0.5, 0, 0.75); // hinged on its x = 0 edge
    const doorFrame = merge([new THREE.BoxGeometry(0.12, 0.2, 1.6).translate(-0.56, 0, 0.8), new THREE.BoxGeometry(0.12, 0.2, 1.6).translate(0.56, 0, 0.8), new THREE.BoxGeometry(1.24, 0.2, 0.12).translate(0, 0, 1.56)]);
    const shelf = merge([
      ...[0, 1].map((i) => new THREE.BoxGeometry(7, 1.2, 0.08).translate(0, 0, 0.04 + i * 1.3)),
      new THREE.BoxGeometry(0.08, 1.2, 2.6).translate(-3.5, 0, 1.3),
      new THREE.BoxGeometry(0.08, 1.2, 2.6).translate(3.5, 0, 1.3),
      new THREE.BoxGeometry(7, 0.06, 2.6).translate(0, 0.6, 1.3),
    ]);
    const form = new THREE.PlaneGeometry(4.2, 3.0);
    return { table, card, stamp, print, shops, shopWin, sparkle, plane, ramp, hotel, hotelWin, doorLeaf, doorFrame, shelf, form };
  }, []);

  // ---- the card's journey along the table ----
  const seg = (a: number, b: number, ya: number, yb: number) => lerp(ya, yb, ramp(f, a, b, inOut));
  const cardY =
    f < T.slam ? Y.start
    : f < T.shop + 60 ? seg(T.slam - 4, T.shop + 60, Y.start, Y.shop + 3)
    : f < T.board ? seg(T.shop + 60, T.board, Y.shop + 3, Y.plane - 1.2)
    : f < T.hotel ? Y.plane - 1.2
    : f < T.door ? seg(T.hotel - 10, T.door - 6, Y.hotel - 6, Y.hotel - 0.6)
    : f < T.store ? Y.hotel - 0.6
    : f < T.hide ? seg(T.store - 12, T.hide, Y.hotel + 3, Y.store - 0.6)
    : f < T.back ? Y.store - 0.6
    : seg(T.back, T.back + 40, Y.store + 2, Y.land - 2.5);
  const boarding = ramp(f, T.board, T.lift, inOut); // up the ramp into the plane
  const planeUp = ramp(f, T.lift, T.hotel - 4, inOut);
  const hiding = ramp(f, T.hide - 10, T.hide + 6, inOut) * (1 - ramp(f, T.back - 10, T.back + 8, inOut));
  const cardZ = 0.02 + 0.8 * boarding + 0.05 * Math.abs(Math.sin(f / 4)) * (f > T.slam && f < T.back + 40 ? (cardY > Y.start + 0.5 && cardY < Y.land - 3 ? 1 : 0) : 0);
  const cardYaw = 0.25 * Math.sin(f / 9) * (f > T.slam && f < T.back + 40 ? 1 : 0);
  const cardVisible = !(planeUp > 0.05 && f < T.hotel - 8) && !(f >= T.door - 6 && f < T.store - 12) && hiding < 0.95;
  const cardPos: V3 = f >= T.board && f < T.hotel - 8 ? [0, Y.plane - 1.2 + 1.9 * boarding, cardZ + 0.9 * boarding] : [0.2 * Math.sin(f / 13), cardY, cardZ + 1.25 * hiding];

  // ---- the stamp: hover, slam, hop after the card, miss, hit the door, lose it, land ----
  const hop = (a: number, b: number, n: number) => {
    const t = ramp(f, a, b, (x) => x);
    const ph = (t * n) % 1;
    return { z: 1.6 * Math.sin(Math.PI * ph) ** 0.8, squash: ph < 0.08 ? 0.85 : 1, t };
  };
  let st: { pos: V3; rot: V3; squash: number } = { pos: [0, Y.start, 0], rot: [0, 0, 0], squash: 1 };
  if (f < T.slam) st = { pos: [0.1 * Math.sin(f / 15), Y.start, 1.6 + 0.25 * Math.sin(f / 9)], rot: [0.05 * Math.sin(f / 11), 0.06 * Math.cos(f / 13), 0], squash: 1 };
  else if (f < T.shop) {
    const slam = ramp(f, T.slam, T.slam + 6, (x) => x * x);
    const bounce = ramp(f, T.slam + 6, T.shop, expoOut);
    st = { pos: [0, Y.start, lerp(1.6, 0.0, slam) + 0.5 * Math.sin(Math.PI * bounce)], rot: [0, 0, 0], squash: slam >= 1 ? lerp(0.82, 1, bounce) : 1 };
  } else if (f < T.lift - 10) {
    const h = hop(T.shop, T.lift - 10, 7);
    st = { pos: [0, lerp(Y.start, Y.plane - 1.2, h.t), h.z], rot: [0.15 * Math.sin(h.t * 44), 0, 0], squash: h.squash };
  } else if (f < T.hotel - 20) {
    const slam = ramp(f, T.lift - 10, T.lift - 4, (x) => x * x);
    const up = ramp(f, T.lift + 12, T.hotel - 20, inOut);
    st = { pos: [0, Y.plane - 1.2, lerp(1.6, 0, slam) * (1 - up) + 1.2 * up], rot: [0.5 * up, 0, 0], squash: slam >= 1 && up < 0.1 ? 0.82 : 1 };
  } else if (f < T.door) {
    const h = hop(T.hotel - 20, T.door, 5);
    st = { pos: [0, lerp(Y.plane - 1.2, Y.hotel - 1.6, h.t), h.z], rot: [0, 0, 0], squash: h.squash };
  } else if (f < T.store) {
    const hit = ramp(f, T.door, T.door + 5, (x) => x);
    const rebound = ramp(f, T.door + 5, T.door + 30, expoOut);
    st = { pos: [0, lerp(Y.hotel - 1.6, Y.hotel - 0.9, hit) - 1.4 * rebound, 0.9 * (1 - rebound) + 0.0], rot: [lerp(-1.2, 0, rebound) + 0.0, 0, 0], squash: 1 };
  } else if (f < T.lost) {
    const h = hop(T.store, T.lost, 4);
    st = { pos: [0, lerp(Y.hotel - 2.3, Y.store - 2.6, h.t), h.z], rot: [0, 0, 0], squash: h.squash };
  } else if (f < T.land) {
    const look = ramp(f, T.lost, T.land, (x) => x);
    st = { pos: [0.4 * Math.sin(look * 9), Y.store - 2.6, 0.6 + 0.3 * Math.sin(look * 6)], rot: [0.2, 0, 0.9 * Math.sin(look * 9)], squash: 1 };
  } else {
    const go = ramp(f, T.land, T.zero - 8, inOut);
    const slam = ramp(f, T.zero - 8, T.zero - 2, (x) => x * x);
    const lift = ramp(f, T.zero + 14, T.zero + 40, inOut);
    st = { pos: [0, lerp(Y.store - 2.6, Y.land, go), lerp(1.4, 0, slam) + 2.2 * lift], rot: [0, 0, 0], squash: slam >= 1 && lift < 0.05 ? 0.84 : 1 };
  }
  const printed = ramp(f, T.zero - 2, T.zero + 2);

  // ---- camera: follows the chase from a three-quarter height; the plane pulls it up briefly ----
  const lead = Math.max(cardY, st.pos[1]) + 1.0;
  const camY = f < T.slam ? Y.start - 0.5 : lead;
  const planeLook = planeUp * (1 - ramp(f, T.hotel - 24, T.hotel - 6));
  const back = ramp(f, T.back + 20, T.real, inOut);
  const pos = new THREE.Vector3(5.5 + 0.3 * Math.sin(f / 40), camY - 5.5, 4.2 + 2.0 * planeLook).lerp(new THREE.Vector3(0.4, Y.land - 5.5, 3.2), back);
  const target = new THREE.Vector3(0, camY + 1.0, 0.5 + 3.5 * planeLook).lerp(new THREE.Vector3(0, Y.land - 1.6, 0.4), back);
  const L = { ambient: 0.16, lift: 0.08, key: [-0.4, -0.5, 0.75] as V3 };
  const doorQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -1.5 * ramp(f, T.hotel + 6, T.hotel + 24, expoOut) * (1 - ramp(f, T.door - 12, T.door - 2, inOut)));
  const sparkleOn = ramp(f, T.shop + 20, T.shop + 50, expoOut);
  return (
    <>
      <CamN pos={pos.toArray() as V3} target={target.toArray() as V3} fov={lerp(38, 34, back)} />
      <Env />
      <ambientLight intensity={0.45} />
      <directionalLight position={[-6, camY - 6, 8]} intensity={2.0} color="#fff6ea" />
      <directionalLight position={[8, camY + 4, 5]} intensity={1.2} color="#cfd4ff" />
      <EMesh g={geo.table} m={m(P.ochre, 1, { albedoNoise: 0.22 })} live={{ ambient: 0.14, lift: 0.06, key: [-0.4, -0.5, 0.75] }} />
      {/* the card */}
      {cardVisible && (
        <group position={cardPos} rotation={[0.35 * boarding, 0, cardYaw]} scale={CS}>
          <EMesh g={geo.card.body} m={m(P.green, 2, { albedoNoise: 0.05 })} live={L} />
          <EMesh g={geo.card.face} m={m(P.green, 3, { map: cardTex, mapAmt: 1 })} pos={[0, 0, 0.045]} live={{ ...L, lift: 0.14 }} />
        </group>
      )}
      {/* the stamp */}
      <group position={st.pos} rotation={st.rot} scale={[1, 1, st.squash]}>
        <EMesh g={geo.stamp.handle} m={m(P.graphite, 10, { spec: 0.5 })} live={{ ambient: 0.16, lift: 0.1 }} />
        <EMesh g={geo.stamp.base} m={m(P.graphite, 11)} live={{ ambient: 0.14, lift: 0.08 }} />
        <EMesh g={geo.stamp.rubber} m={m(P.terra, 12, { spec: 0.2 })} live={{ ambient: 0.14, lift: 0.04 }} />
        <EMesh g={geo.stamp.faceG} m={m(P.terra, 13, { map: faceTex, mapAmt: 1, opacity: 0.999 })} live={{ ambient: 0.2, lift: 0.1 }} />
      </group>
      {/* the impression: only a 0 */}
      {printed > 0 && <EMesh g={geo.print} m={m(P.terra, 14, { map: zeroTex, mapAmt: 1, opacity: 0.999 })} pos={[0, Y.land, 0.012]} live={{ ambient: 0.3, lift: 0.3, opacity: 0.999 * printed }} />}
      <EMesh g={geo.form} m={m(P.ochre, 15, { albedoNoise: 0.04 })} pos={[0, Y.land + 0.2, 0.006]} live={{ ambient: 0.3, lift: 0.3 }} />
      {/* the online shop */}
      <group position={[0, Y.shop + 1.2, 0]}>
        <EMesh g={geo.shops} m={m(P.teal, 20)} live={L} />
        <EMesh g={geo.shopWin} m={m(P.teal, 21, { spec: 0.6 })} live={{ ambient: 0.3, lift: 0.2 + 0.5 * sparkleOn }} />
        <EMesh g={geo.sparkle} m={m(P.brass, 22, { foil: 0.6, spec: 0.9 })} rot={[0, 0, f * 0.02]} scale={sparkleOn} live={{ ambient: 0.6, lift: 0.7, foilPhase: f * 0.03 }} />
      </group>
      {/* the plane: boards the card and lifts off */}
      <group position={[0, Y.plane + 2.0, 0.9 + 9 * Math.pow(planeUp, 1.5)]} rotation={[0.35 * Math.sin(Math.PI * Math.min(1, planeUp * 1.4)), 0, 0]}>
        <EMesh g={geo.plane} m={m(P.indigo, 30, { spec: 0.6 })} rot={[Math.PI / 2, 0, 0]} scale={0.42} live={{ ...L, lift: 0.12 }} />
      </group>
      {planeUp < 0.2 && <EMesh g={geo.ramp} m={m(P.indigo, 31)} pos={[0, Y.plane - 0.2, 0]} live={L} />}
      {/* the hotel with its door */}
      <group position={[0, Y.hotel, 0]}>
        <EMesh g={geo.hotel} m={m(P.terra, 40)} live={L} />
        <EMesh g={geo.hotelWin} m={m(P.terra, 41, { spec: 0.6 })} live={{ ambient: 0.3, lift: 0.45 }} />
        <EMesh g={geo.doorFrame} m={m(P.terra, 42)} pos={[0, -0.02, 0]} live={L} />
        <group position={[-0.5, -0.05, 0]} quaternion={doorQ}>
          <EMesh g={geo.doorLeaf} m={m(P.terra, 43)} live={{ ...L, lift: 0.1 }} />
        </group>
      </group>
      {/* the store shelf with scanned products; the card hides among them */}
      <group position={[0, Y.store, 0]}>
        <EMesh g={geo.shelf} m={m(P.rose, 50)} live={L} />
        {[M.camera, M.watch, M.vase, M.box, M.suitcase].map((u, i) => (
          <Gltf key={i} url={u} size={i === 4 ? 1.3 : 0.9} m={m(P.rose, 51 + i, { mapAmt: 0.8 })} pos={[-2.8 + i * 1.4, -0.2, i % 2 ? 1.38 : 0.08]} rot={[Math.PI / 2, 0, -0.4 + 0.3 * i]} pick={i === 4 ? (_, k) => k < 4 : undefined} live={{ ...L, lift: 0.12 }} />
        ))}
      </group>
    </>
  );
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
  const arrive = ramp(f, T.real, T.real + 24, expoOut);
  const turn = ramp(f, T.turn, T.turn + 50, inOut);
  const toLock = ramp(f, T.lock, T.lock + 26, inOut);
  const yaw = THREE.MathUtils.degToRad(lerp(0, -24, turn) + lerp(0, 12, toLock) + 1.5 * Math.sin(f / 30));
  const pitch = THREE.MathUtils.degToRad(lerp(-55, 0, arrive) + lerp(0, -8, turn) + 3 * toLock);
  return (
    <>
      <CamN pos={[0, -1.4, 10.5]} target={[0, 0, 0]} fov={34} />
      <Env />
      <ambientLight intensity={0.45} />
      <directionalLight position={[-7 + 10 * ramp(f, T.real, T.real + 60), 5, 7]} intensity={2.2} color="#fff6ea" />
      <directionalLight position={[8, 2, -6]} intensity={2.0} color="#874bf9" />
      <group position={[0, lerp(-1.5, 0, arrive) + lerp(0, 2.0, toLock), 0]} rotation={[pitch, yaw, 0]} scale={lerp(0.8, 0.95, arrive) * lerp(1, 0.63, toLock)}>
        <mesh geometry={geo.body} material={mats.edge} />
        <mesh geometry={geo.faceG} material={mats.metal} position={[0, 0, 0.0425]} />
        <mesh geometry={geo.faceG} material={mats.back} position={[0, 0, -0.0425]} rotation={[0, Math.PI, 0]} />
      </group>
    </>
  );
};

export const JFee: React.FC = () => {
  const f = useCurrentFrame();
  const realIn = ramp(f, T.real, T.real + 12);
  const lightsOut = ramp(f, T.lock - 6, T.lock + 12);
  const endFade = ramp(f, 704, 719, (t) => t);
  return (
    <AbsoluteFill style={{ background: f >= T.real ? "#0c0c10" : "#f3e9d2" }}>
      {f < T.real + 12 && (
        <AbsoluteFill style={{ opacity: 1 - realIn }}>
          <World aa><Table f={f} /></World>
        </AbsoluteFill>
      )}
      {f >= T.real && (
        <AbsoluteFill style={{ opacity: realIn }}>
          <AbsoluteFill style={{ background: "linear-gradient(180deg, #121216 0%, #1a1a20 100%)" }} />
          <World aa><RealCard f={f} /></World>
        </AbsoluteFill>
      )}
      <Paper opacity={0.6} />
      <Head f={f} from={10} to={T.shop + 10} big={["the CRED IndusInd Bank", "RuPay credit card"]} x={110} y={110} ink="#5a4116" sheen="#d6b25a" size={72} />
      <Head f={f} from={T.shop + 30} to={T.plane + 10} big={["5% rewards"]} small="on online shopping" x={110} y={110} ink="#1f5a5e" sheen="#64aaa3" size={112} />
      <Head f={f} from={T.plane + 30} to={T.hotel + 10} big={["redeem on flights"]} x={110} y={110} ink="#262c66" sheen="#8a93d6" size={96} />
      <Head f={f} from={T.hotel + 30} to={T.store + 10} big={["and hotels"]} x={110} y={110} ink="#6e2a22" sheen="#e8957a" size={96} />
      <Head f={f} from={T.store + 30} to={T.land + 10} big={["and 2,000+ products"]} small="on CRED store" x={110} y={110} ink="#6d2a49" sheen="#b9688a" size={92} />
      <Head f={f} from={T.zero + 10} to={T.turn + 36} big={["zero joining fee"]} x={110} y={110} ink={f >= T.real ? "#f1efe6" : "#5a4116"} sheen={f >= T.real ? "#ffffff" : "#d6b25a"} size={104} />
      {f >= T.lock - 6 && <AbsoluteFill style={{ background: "#000", opacity: lightsOut * 0.4 }} />}
      {f >= T.lock + 14 && <Logo f={f} at={T.lock + 14} y={700} h={96} />}
      <AbsoluteFill style={{ background: "#000", opacity: endFade }} />
      <Audio src={staticFile("custom/cred-ten/j.wav")} />
    </AbsoluteFill>
  );
};
