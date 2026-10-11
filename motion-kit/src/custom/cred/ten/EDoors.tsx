/**
 * Ten-film set, E: "One Card, Many Doors" (30 s, 720 frames, 24 fps). UNOFFICIAL SPEC WORK.
 * Storyboard: docs/storyboards/cred-10.md (E). Method: skills/art-director/SKILL.md. Facts and sources: night/kit.tsx.
 *
 * The idea (replacement: the card is the key): the printed card slides into the slot of an engraved door and the door
 * opens. One dolly goes through a boutique whose cases light as you pass (5%), through an airport gate onto a runway
 * where a plane's hatch is the next door (flights), into a hotel room whose walls stand up as you enter (hotels), down
 * a hall of lockers that open in a wave with scanned products inside (2,000+), to a last door with no slot that
 * swings open by itself (zero joining fee). A whip back through every open door; the card slides out of the first
 * slot toward you and turns into the real card. Fluent device: the door. Material truth: the card as a key.
 *
 * Music: calm bed at 100 BPM in D (tools/music_bed.py) with a knock motif at every door.
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

export const E_FRAMES = 720;
type V3 = [number, number, number];
const T = { slot: 12, open: 56, boutique: 80, gate: 190, runway: 204, hatch: 294, hotel: 308, locker: 392, lockers: 406, last: 492, lastOpen: 520, back: 576, out: 616, real: 628, turn: 640, lock: 672 };
const DOOR_Y = [0, 12, 24, 36, 48]; // boutique door, airport gate, plane hatch (= hotel door), locker door, the last door
const EYE = 1.55;

const CamN: React.FC<{ pos: V3; target: V3; fov?: number }> = ({ pos, target, fov = 42 }) => {
  const { camera } = useThree();
  const c = camera as THREE.PerspectiveCamera;
  c.fov = fov;
  c.near = 0.03;
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
const m = (palette: typeof P.teal, seed: number, extra: Record<string, unknown> = {}) => ({ palette, seed, space: 0 as const, angleDeg: 45, spec: 0.35, albedoNoise: 0.15, ...extra });
type Live = { ambient?: number; lift?: number; opacity?: number; key?: V3; dim?: number };

/** An engraved door: frame, hinged leaf with (or without) a card slot. Opens away from the camera (+y). */
const DOOR_W = 2.2, DOOR_H = 3.2;
const Door: React.FC<{ y: number; open: number; pal: typeof P.teal; seed: number; slot?: boolean; arched?: boolean; live: Live }> = ({ y, open, pal, seed, slot = true, arched, live }) => {
  const g = useMemo(() => {
    const jamb = (x: number) => new THREE.BoxGeometry(0.3, 0.4, DOOR_H + 0.3).translate(x, 0, (DOOR_H + 0.3) / 2);
    const frame = merge([jamb(-DOOR_W / 2 - 0.15), jamb(DOOR_W / 2 + 0.15), new THREE.BoxGeometry(DOOR_W + 0.9, 0.4, 0.3).translate(0, 0, DOOR_H + 0.15)]);
    const w = DOOR_W / 2 - 0.05, h = DOOR_H - 0.05;
    const leafShape = new THREE.Shape();
    leafShape.moveTo(-w, 0);
    leafShape.lineTo(w, 0);
    if (arched) {
      leafShape.lineTo(w, h - w);
      leafShape.absarc(0, h - w, w, 0, Math.PI, false);
    } else {
      leafShape.lineTo(w, h);
      leafShape.lineTo(-w, h);
    }
    leafShape.lineTo(-w, 0);
    const leaf = new THREE.ExtrudeGeometry(leafShape, { depth: 0.08, bevelEnabled: false }).rotateX(Math.PI / 2).translate(0, 0.04, 0);
    // panels pressed into the leaf, the slot, the handle
    const panels = merge([
      new THREE.BoxGeometry(DOOR_W - 0.6, 0.02, 1.1).translate(0, -0.05, 2.3),
      new THREE.BoxGeometry(DOOR_W - 0.6, 0.02, 0.9).translate(0, -0.05, 0.7),
    ]);
    const slotG = new THREE.BoxGeometry(2.3, 0.03, 0.1).translate(0, -0.05, 1.56);
    const handle = new THREE.CylinderGeometry(0.04, 0.04, 0.3, 10).rotateZ(Math.PI / 2).translate(0.75, -0.12, 1.4);
    return { frame, leaf, panels, slotG, handle };
  }, [arched]);
  const hinge = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -open * 1.75); // fresh object each render
  return (
    <group position={[0, y, 0]}>
      <EMesh g={g.frame} m={m(pal, seed)} live={live} />
      <group position={[-DOOR_W / 2 + 0.05, 0, 0]} quaternion={hinge}>
        <group position={[DOOR_W / 2 - 0.05, 0, 0]}>
          <EMesh g={g.leaf} m={m(pal, seed + 1)} live={live} />
          <EMesh g={g.panels} m={m(pal, seed + 2, { spec: 0.5 })} live={{ ...live, lift: (live.lift ?? 0) + 0.06 }} />
          {slot && <EMesh g={g.slotG} m={m(P.graphite, seed + 3)} live={{ ...live, dim: 0.5 }} />}
          <EMesh g={g.handle} m={m(P.brass, seed + 4, { spec: 0.7, foil: 0.3 })} live={live} />
        </group>
      </group>
    </group>
  );
};

/** The printed card as a small key: it slides into the first slot at the start and out of it at the end. */
const KeyCard: React.FC<{ pos: V3; rot: V3; tex: THREE.Texture; live: Live }> = ({ pos, rot, tex, live }) => {
  const g = useMemo(() => {
    const s = 0.25;
    const face = new THREE.ShapeGeometry(roundRect(8.56 * s, 5.398 * s, 0.08), 8);
    const uv = face.getAttribute("uv") as THREE.BufferAttribute;
    const p = face.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) uv.setXY(i, p.getX(i) / (8.56 * s) + 0.5, p.getY(i) / (5.398 * s) + 0.5);
    const body = cardBody();
    body.scale(s, s, s);
    return { face, body };
  }, []);
  return (
    <group position={pos} rotation={rot}>
      <EMesh g={g.body} m={m(P.green, 90, { albedoNoise: 0.05 })} live={live} />
      <EMesh g={g.face} m={m(P.green, 91, { map: tex, mapAmt: 1.0, albedoNoise: 0.04 })} pos={[0, 0, 0.012]} live={{ ...live, lift: 0.35 }} />
    </group>
  );
};

const Hall: React.FC<{ f: number }> = ({ f }) => {
  const tex = useMemo(() => {
    const t = face("print").tex.clone();
    t.colorSpace = THREE.NoColorSpace;
    t.needsUpdate = true;
    return t;
  }, []);
  const geo = useMemo(() => {
    const floor = new THREE.PlaneGeometry(14, 64).translate(0, 26, 0);
    // boutique: walls and display cases
    const wall = (x: number, y0: number, len: number) => new THREE.BoxGeometry(0.2, len, 4.2).translate(x, y0 + len / 2, 2.1);
    const bWalls = merge([wall(-3.0, 0, 12), wall(3.0, 0, 12), new THREE.BoxGeometry(6.2, 12, 0.2).translate(0, 6, 4.3)]);
    const caseG = merge([new THREE.BoxGeometry(1.0, 1.4, 1.15).translate(0, 0, 0.575), new THREE.BoxGeometry(1.1, 1.5, 0.06).translate(0, 0, 1.18)]);
    const caseTop = new THREE.BoxGeometry(0.9, 1.3, 0.04).translate(0, 0, 1.23);
    // the runway
    const runway = new THREE.BoxGeometry(5, 12, 0.04).translate(0, 18, 0.02);
    const bulbs = merge(Array.from({ length: 16 }, (_, i) => new THREE.SphereGeometry(0.07, 8, 6).translate(i % 2 ? 2.4 : -2.4, 12.6 + Math.floor(i / 2) * 1.5, 0.1)));
    const plane = airplane();
    // hotel room: walls that stand up, a bed, a lamp, a window
    const hWallSide = new THREE.BoxGeometry(0.15, 12, 3.6).translate(0, 6, 1.8);
    const hBack = new THREE.BoxGeometry(6.2, 0.15, 3.6).translate(0, 0, 1.8);
    const bed = merge([
      new THREE.BoxGeometry(2.2, 3.0, 0.5).translate(0, 0, 0.45),
      new THREE.BoxGeometry(2.3, 0.16, 1.2).translate(0, 1.5, 0.85),
      new THREE.BoxGeometry(2.0, 1.0, 0.16).translate(0, 0.9, 0.78), // pillow
    ]);
    const lamp = merge([
      new THREE.CylinderGeometry(0.05, 0.05, 1.5, 8).rotateX(Math.PI / 2).translate(0, 0, 0.75),
      new THREE.ConeGeometry(0.45, 0.5, 16, 1, true).rotateX(-Math.PI / 2).translate(0, 0, 1.6),
      new THREE.CylinderGeometry(0.25, 0.25, 0.06, 12).rotateX(Math.PI / 2).translate(0, 0, 0.03),
    ]);
    const windowG = merge([
      new THREE.BoxGeometry(0.06, 1.8, 0.12).translate(0, 0, 0.0),
      new THREE.BoxGeometry(0.06, 1.8, 0.12).translate(0, 0, 1.4),
      new THREE.BoxGeometry(0.06, 0.12, 1.4).translate(0, -0.84, 0.7),
      new THREE.BoxGeometry(0.06, 0.12, 1.4).translate(0, 0.84, 0.7),
      new THREE.BoxGeometry(0.06, 0.06, 1.4).translate(0, 0, 0.7),
    ]);
    const pane = new THREE.BoxGeometry(0.02, 1.7, 1.3).translate(0, 0, 0.7);
    // lockers: a wall of hinged doors either side
    const lockerBox = new THREE.BoxGeometry(0.7, 0.9, 1.1).translate(0, 0, 0.55);
    const lockerDoor = new THREE.BoxGeometry(0.05, 0.86, 1.06).translate(0, 0.43, 0.53); // hinged at its y = 0 edge
    const lockerVent = merge([0, 1, 2].map((i) => new THREE.BoxGeometry(0.02, 0.5, 0.03).translate(-0.03, 0.43, 0.25 + i * 0.1)));
    return { floor, bWalls, caseG, caseTop, runway, bulbs, plane, hWallSide, hBack, bed, lamp, windowG, pane, lockerBox, lockerDoor, lockerVent };
  }, []);

  // ---- the dolly: one forward move through five doors, then the whip back ----
  const camY = (() => {
    if (f < T.open) return -2.6;
    if (f < T.back) {
      // piecewise: door k at DOOR_Y[k]; arrive 1.1 before each door, pass after it opens
      const legs: [number, number, number, number][] = [
        [T.open, T.gate, -2.6, DOOR_Y[1] - 1.3],
        [T.gate, T.hatch, DOOR_Y[1] - 1.3, DOOR_Y[2] - 1.3],
        [T.hatch, T.locker, DOOR_Y[2] - 1.3, DOOR_Y[3] - 1.3],
        [T.locker, T.last, DOOR_Y[3] - 1.3, DOOR_Y[4] - 2.2],
        [T.last, T.back, DOOR_Y[4] - 2.2, DOOR_Y[4] - 1.4],
      ];
      for (const [a, b, ya, yb] of legs) if (f < b) return lerp(ya, yb, ramp(f, a + 12, b, inOut));
      return DOOR_Y[4] - 1.4;
    }
    return lerp(DOOR_Y[4] - 1.4, -2.6, ramp(f, T.back, T.out, inOut));
  })();
  const sway = 0.06 * Math.sin(f / 19) + 0.04 * Math.sin(f / 7.3);
  const closeUp = f < T.open ? 1 - ramp(f, T.open - 16, T.open + 12, inOut) : f >= T.out - 10 ? ramp(f, T.out - 10, T.out, inOut) : 0;
  const look = closeUp > 0 ? [0.1, -0.5 * closeUp, lerp(EYE - 0.05, 1.4, closeUp)] : [0, camY + 6, EYE - 0.05];
  const pos: V3 = [sway + 0.15 * closeUp, camY, EYE + 0.02 * Math.sin(f / 11) + 0.95 * closeUp];
  const fov = f < T.open ? lerp(34, 42, ramp(f, T.open - 20, T.open + 10, inOut)) : f >= T.back ? lerp(42, 50, ramp(f, T.back, T.out)) : 42;

  // ---- doors ----
  const openAt = (a: number, b: number) => ramp(f, a, b, expoOut);
  const d0 = openAt(T.open, T.boutique + 10) * (1 - ramp(f, T.out - 2, T.out + 10, inOut)); // shuts again behind the whip back
  const d1 = openAt(T.gate - 10, T.runway + 10);
  const d2 = openAt(T.hatch - 10, T.hotel + 10);
  const d3 = openAt(T.locker - 10, T.lockers + 10);
  const d4 = openAt(T.lastOpen - 6, T.lastOpen + 30);
  // the key card slides into the first slot, and out again at the end
  const slideIn = ramp(f, T.slot, T.slot + 30, inOut);
  const slideOut = ramp(f, T.out + 6, T.real + 10, inOut);
  const inside = f >= T.open && f < T.out + 6; // swallowed by the slot while the doors are open
  const keyPos: V3 = [lerp(-0.3, 0, slideIn), lerp(-1.3, 0.42, slideIn) - 1.5 * slideOut, lerp(1.3, 1.56, slideIn) - 0.25 * slideOut];
  const keyRot: V3 = [lerp(-0.4, 0, slideIn) - 0.35 * slideOut, 0, lerp(0.18, 0, slideIn)];
  const near = (y: number, w = 2.5) => Math.max(0, 1 - Math.abs(camY - y) / w);
  const base: Live = { ambient: 0.14, lift: 0.05, key: [-0.4, -0.5, 0.75] };
  const hotelUp = ramp(f, T.hotel - 4, T.hotel + 40, expoOut);
  const hingeL = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), (Math.PI / 2) * (1 - hotelUp));
  const hingeR = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -(Math.PI / 2) * (1 - hotelUp));
  const glowBeyond = ramp(f, T.lastOpen, T.lastOpen + 40, inOut);
  return (
    <>
      <CamN pos={pos} target={look as V3} fov={fov} />
      {/* floor through the whole hall, lit by whichever world the camera is in */}
      <EMesh g={geo.floor} m={m(P.teal, 1, { albedoNoise: 0.22 })} live={{ ambient: 0.12, lift: 0.03, key: [-0.4, -0.5, 0.75] }} />
      {/* door 0: boutique */}
      <Door y={DOOR_Y[0]} open={d0} pal={P.teal} seed={10} live={base} />
      {!inside && <KeyCard pos={keyPos} rot={keyRot} tex={tex} live={{ ambient: 0.2, lift: 0.1 }} />}
      {/* boutique: walls, cases that light as the camera passes */}
      <EMesh g={geo.bWalls} m={m(P.teal, 20)} live={{ ...base, lift: 0.04 }} />
      {Array.from({ length: 8 }, (_, i) => {
        const y = 1.8 + Math.floor(i / 2) * 2.6, x = i % 2 ? 1.75 : -1.75;
        const lit = ramp(near(y - 1.5, 3.5), 0, 1, expoOut);
        return (
          <group key={i} position={[x, y, 0]}>
            <EMesh g={geo.caseG} m={m(P.teal, 21 + i)} live={{ ...base, lift: 0.05 + 0.1 * lit }} />
            <EMesh g={geo.caseTop} m={m(P.teal, 31 + i, { spec: 0.7 })} live={{ ambient: 0.3, lift: 0.15 + 0.6 * lit }} />
          </group>
        );
      })}
      {/* door 1: the airport gate */}
      <Door y={DOOR_Y[1]} open={d1} pal={P.indigo} seed={40} live={base} />
      {/* the runway and the plane; its hatch is door 2 */}
      <EMesh g={geo.runway} m={m(P.indigo, 50, { albedoNoise: 0.2 })} live={{ ...base, lift: 0.02 }} />
      <EMesh g={geo.bulbs} m={m(P.indigo, 51, { spec: 0.8 })} live={{ ambient: 0.4, lift: 0.4 + 0.4 * near(18, 8) }} />
      <EMesh g={geo.plane} m={m(P.indigo, 52, { spec: 0.6 })} pos={[6.5, DOOR_Y[2] + 2.2, 1.9]} rot={[Math.PI / 2, 0, Math.PI]} scale={0.95} live={{ ...base, lift: 0.1 }} />
      <Door y={DOOR_Y[2]} open={d2} pal={P.terra} seed={60} arched live={base} />
      {/* hotel room: side walls hinge up from the floor as you enter; bed, lamp, window */}
      <group position={[-3.0, DOOR_Y[2] + 0.2, 0]} quaternion={hingeL}>
        <EMesh g={geo.hWallSide} m={m(P.terra, 70)} live={base} />
        <group position={[0.08, 5.0, 0.9]}>
          <EMesh g={geo.windowG} m={m(P.terra, 71)} live={base} />
          <EMesh g={geo.pane} m={m(P.terra, 72, { spec: 0.7 })} live={{ ambient: 0.4, lift: 0.5 }} />
        </group>
      </group>
      <group position={[3.0, DOOR_Y[2] + 0.2, 0]} quaternion={hingeR}>
        <EMesh g={geo.hWallSide} m={m(P.terra, 73)} live={base} />
      </group>
      <EMesh g={geo.bed} m={m(P.terra, 74)} pos={[-1.6, DOOR_Y[2] + 5.5, 0]} scale={hotelUp} live={{ ...base, lift: 0.08 }} />
      <EMesh g={geo.lamp} m={m(P.terra, 75)} pos={[1.9, DOOR_Y[2] + 4.0, 0]} scale={hotelUp} live={{ ambient: 0.3, lift: 0.1 + 0.5 * near(DOOR_Y[2] + 3, 5) }} />
      {/* door 3: the locker door, then a hall of lockers either side */}
      <Door y={DOOR_Y[3]} open={d3} pal={P.rose} seed={80} live={base} />
      {Array.from({ length: 24 }, (_, i) => {
        const col = Math.floor(i / 2) % 6, side = i % 2 ? 1 : -1, row = i >= 12 ? 1 : 0;
        const y = DOOR_Y[3] + 1.6 + col * 1.1, x = side * 2.7, z = 0.25 + row * 1.2;
        const open = ramp(f, T.lockers + 8 + col * 7 + row * 4, T.lockers + 30 + col * 7 + row * 4, expoOut);
        const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), side * -1.9 * open);
        const product = [M.camera, M.watch, M.vase, M.box][i % 4];
        return (
          <group key={i} position={[x, y, z]} rotation={[0, 0, side > 0 ? Math.PI : 0]}>
            <EMesh g={geo.lockerBox} m={m(P.rose, 100 + i)} live={{ ...base, lift: 0.05 + 0.25 * open }} />
            <group position={[-0.37, -0.43, 0]} quaternion={q}>
              <EMesh g={geo.lockerDoor} m={m(P.rose, 130 + i)} live={{ ...base, lift: 0.06 }} />
              <EMesh g={geo.lockerVent} m={m(P.rose, 160 + i)} live={{ ...base, dim: 0.3 }} />
            </group>
            {open > 0.3 && (i % 3 === 0 || i % 5 === 0) && <Gltf url={product} size={0.62} m={m(P.rose, 190 + i, { mapAmt: 0.8 })} pos={[0.05, 0, 0.02]} rot={[Math.PI / 2, 0, -0.4 * side]} live={{ ambient: 0.3, lift: 0.2 + 0.4 * open }} />}
          </group>
        );
      })}
      {/* door 4: no slot; it opens by itself and light comes through */}
      <Door y={DOOR_Y[4]} open={d4} pal={P.green} seed={200} slot={false} live={{ ...base, lift: 0.05 + 0.2 * glowBeyond }} />
      <EMesh g={geo.floor} m={m(P.green, 2, { albedoNoise: 0.1 })} pos={[0, DOOR_Y[4] + 32, 0.01]} live={{ ambient: 0.5, lift: 0.6 * glowBeyond, opacity: 0.999 * glowBeyond }} />
    </>
  );
};

// ---- the real card ---------------------------------------------------------------------------------------------------
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
  const arrive = ramp(f, T.real, T.real + 22, expoOut);
  const turn = ramp(f, T.turn, T.turn + 50, inOut);
  const toLock = ramp(f, T.lock, T.lock + 26, inOut);
  const yaw = THREE.MathUtils.degToRad(lerp(0, -24, turn) + lerp(0, 12, toLock) + 1.5 * Math.sin(f / 30));
  const pitch = THREE.MathUtils.degToRad(lerp(18, 0, arrive) + lerp(0, -8, turn) + 3 * toLock);
  return (
    <>
      <CamN pos={[0, -1.4, 10.5]} target={[0, 0, 0]} fov={34} />
      <Env />
      <ambientLight intensity={0.45} />
      <directionalLight position={[-7 + 10 * ramp(f, T.real, T.real + 60), 5, 7]} intensity={2.2} color="#fff6ea" />
      <directionalLight position={[8, 2, -6]} intensity={2.0} color="#874bf9" />
      <group position={[0, lerp(-3.5, 0, arrive) + lerp(0, 2.0, toLock), 0]} rotation={[pitch, yaw, 0]} scale={lerp(0.7, 0.95, arrive) * lerp(1, 0.63, toLock)}>
        <mesh geometry={geo.body} material={mats.edge} />
        <mesh geometry={geo.faceG} material={mats.metal} position={[0, 0, 0.0425]} />
        <mesh geometry={geo.faceG} material={mats.back} position={[0, 0, -0.0425]} rotation={[0, Math.PI, 0]} />
      </group>
    </>
  );
};

export const EDoors: React.FC = () => {
  const f = useCurrentFrame();
  const realIn = ramp(f, T.real, T.real + 10);
  const lightsOut = ramp(f, T.lock - 6, T.lock + 12);
  const endFade = ramp(f, 704, 719, (t) => t);
  const stops: [number, string][] = [[0, "#d9ece2"], [T.gate, "#dfe0f2"], [T.hatch, "#f3d9cc"], [T.locker, "#f7e3ea"], [T.last, "#e3ecd9"]];
  const mixHex = (a: string, b: string, t: number) => {
    const ca = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16)), cb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
    return `rgb(${ca.map((v, i) => Math.round(lerp(v, cb[i], t))).join(",")})`;
  };
  let bg = stops[0][1];
  for (let i = 1; i < stops.length; i++) bg = mixHex(bg, stops[i][1], ramp(f, stops[i][0] - 12, stops[i][0] + 12, inOut)); // crossfade: a hard switch is a snap frame
  return (
    <AbsoluteFill style={{ background: f >= T.real ? "#0c0c10" : bg }}>
      {f < T.real + 10 && (
        <AbsoluteFill style={{ opacity: 1 - realIn }}>
          <World><Hall f={f} /></World>
        </AbsoluteFill>
      )}
      {f >= T.real && (
        <AbsoluteFill style={{ opacity: realIn }}>
          <AbsoluteFill style={{ background: "linear-gradient(180deg, #121216 0%, #1a1a20 100%)" }} />
          <World aa><RealCard f={f} /></World>
        </AbsoluteFill>
      )}
      <Paper opacity={0.6} />
      <Head f={f} from={10} to={T.boutique + 6} big={["the CRED IndusInd Bank", "RuPay credit card"]} x={110} y={110} ink="#eef3e6" sheen="#ffffff" size={72} />
      <Head f={f} from={T.boutique + 24} to={T.gate - 4} big={["5% rewards"]} small="on online shopping" x={110} y={110} ink="#e6f4ee" sheen="#ffffff" size={112} />
      <Head f={f} from={T.runway + 20} to={T.hatch - 4} big={["redeem on flights"]} x={110} y={110} ink="#262c66" sheen="#8a93d6" size={96} />
      <Head f={f} from={T.hotel + 24} to={T.locker - 4} big={["and hotels"]} x={110} y={110} ink="#fbe6da" sheen="#ffffff" size={96} />
      <Head f={f} from={T.lockers + 24} to={T.last - 4} big={["and 2,000+ products"]} small="on CRED store" x={110} y={110} ink="#6d2a49" sheen="#b9688a" size={92} />
      <Head f={f} from={T.lastOpen + 10} to={T.turn + 30} big={["zero joining fee"]} x={110} y={110} ink={f >= T.real ? "#f1efe6" : "#1c3d2a"} sheen={f >= T.real ? "#ffffff" : "#7aa483"} size={104} />
      {f >= T.lock - 6 && <AbsoluteFill style={{ background: "#000", opacity: lightsOut * 0.4 }} />}
      {f >= T.lock + 14 && <Logo f={f} at={T.lock + 14} y={700} h={96} />}
      <AbsoluteFill style={{ background: "#000", opacity: endFade }} />
      <Audio src={staticFile("custom/cred-ten/e.wav")} />
    </AbsoluteFill>
  );
};
