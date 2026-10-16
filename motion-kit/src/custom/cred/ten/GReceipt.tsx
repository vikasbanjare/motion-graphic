/**
 * Ten-film set, G: "Receipt Road" (30 s, 720 frames, 24 fps). UNOFFICIAL SPEC WORK.
 * Storyboard: docs/storyboards/cred-10.md (G). Method: skills/art-director/SKILL.md. Facts and sources: night/kit.tsx.
 *
 * The idea (replacement: the receipt is the road): a thermal printer prints a receipt that itemises what the card gives
 * you, not what you pay. The camera rides the paper. Its dotted separator becomes a runway centre line and a plane lifts
 * off it (flights); the paper folds into a key sleeve and a corridor of doors stands up beside it (hotels); the paper
 * is perforated into tags hanging from scanned products (2,000+); the last line prints "zero joining fee" and tears
 * off, and under the torn paper lies the real card. Fluent device: the ribbon of paper. Material truth: the receipt.
 *
 * Music: tech bed at 90 BPM in G (tools/music_bed.py) with thermal-printer ticks as the hi-hat.
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

export const G_FRAMES = 720;
type V3 = [number, number, number];
const T = { print: 16, ride: 72, runway: 192, lift: 236, sleeve: 312, tags: 408, last: 504, tear: 540, real: 600, turn: 612, lock: 672 };
const RW = 3.2, RL = 76; // the receipt: width and printed length
// where things sit along the paper (y)
const Y = { name: 6, five: 14, flights: 26, plane: 30, hotels: 42, store: 56, zero: 68, card: 70 };

const CamN: React.FC<{ pos: V3; target: V3; fov?: number }> = ({ pos, target, fov = 40 }) => {
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
const m = (palette: typeof P.teal, seed: number, extra: Record<string, unknown> = {}) => ({ palette, seed, space: 0 as const, angleDeg: 45, spec: 0.3, albedoNoise: 0.12, ...extra });

/** The receipt's print, drawn once: lines of real facts, dotted separators, a runway centre line, tag perforations. */
const receiptTexture = () => {
  const Wpx = 512, Hpx = 8192; // v runs along the paper (0 at the printer)
  const c = document.createElement("canvas");
  c.width = Wpx;
  c.height = Hpx;
  const x = c.getContext("2d")!;
  x.fillStyle = "#f4f1e8";
  x.fillRect(0, 0, Wpx, Hpx);
  const py = (y: number) => Hpx - (y / RL) * Hpx; // paper y -> canvas row (canvas top = far end)
  const ink = "#16211b";
  x.fillStyle = ink;
  x.strokeStyle = ink;
  x.textAlign = "center";
  const line = (y: number, s: string, size = 44, weight = "500") => {
    x.font = `${weight} ${size}px 'Lexend', 'DejaVu Sans Mono', monospace`;
    x.fillText(s, Wpx / 2, py(y));
  };
  const dots = (y: number) => {
    x.setLineDash([10, 14]);
    x.lineWidth = 3;
    x.beginPath();
    x.moveTo(40, py(y));
    x.lineTo(Wpx - 40, py(y));
    x.stroke();
    x.setLineDash([]);
  };
  // header
  line(2.0, "receipt", 34, "400");
  dots(3.0);
  line(Y.name - 0.7, "the CRED IndusInd Bank", 50);
  line(Y.name + 0.4, "RuPay credit card", 50);
  dots(Y.name + 1.5);
  line(Y.five - 0.7, "online shopping", 46, "400");
  line(Y.five + 0.6, "5% rewards", 84, "600");
  dots(Y.five + 2.0);
  line(Y.flights - 0.6, "redeem on", 46, "400");
  line(Y.flights + 0.6, "flights", 84, "600");
  // runway centre line: a long dashed stretch
  x.setLineDash([80, 60]);
  x.lineWidth = 10;
  x.beginPath();
  x.moveTo(Wpx / 2, py(Y.flights + 2));
  x.lineTo(Wpx / 2, py(Y.hotels - 3));
  x.stroke();
  x.setLineDash([]);
  // runway edge marks
  for (let y = Y.flights + 2; y < Y.hotels - 3; y += 1.2) {
    x.fillRect(30, py(y) - 20, 24, 40);
    x.fillRect(Wpx - 54, py(y) - 20, 24, 40);
  }
  dots(Y.hotels - 2);
  line(Y.hotels - 0.6, "and", 46, "400");
  line(Y.hotels + 0.6, "hotels", 84, "600");
  dots(Y.hotels + 2);
  line(Y.store - 1.0, "and 2,000+ products", 56, "600");
  line(Y.store, "on CRED store", 46, "400");
  // tag perforations
  for (let y = Y.store + 2; y < Y.zero - 3; y += 2.4) {
    x.setLineDash([6, 10]);
    x.lineWidth = 2;
    x.beginPath();
    x.moveTo(30, py(y));
    x.lineTo(Wpx - 30, py(y));
    x.stroke();
    x.setLineDash([]);
    x.beginPath();
    x.arc(Wpx / 2, py(y + 0.5), 14, 0, Math.PI * 2);
    x.stroke();
  }
  dots(Y.zero - 1.6);
  line(Y.zero - 0.5, "joining fee", 46, "400");
  line(Y.zero + 0.8, "zero", 96, "600");
  dots(Y.zero + 1.8);
  // thermal fade: faint horizontal banding
  x.globalAlpha = 0.06;
  for (let r = 0; r < Hpx; r += 7) {
    x.fillStyle = r % 14 ? "#000" : "#fff";
    x.fillRect(0, r, Wpx, 3);
  }
  x.globalAlpha = 1;
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  t.anisotropy = 8;
  return t;
};

const Desk: React.FC<{ f: number }> = ({ f }) => {
  const tex = useMemo(receiptTexture, []);
  const cardTex = useMemo(() => {
    const t = face("print").tex.clone();
    t.colorSpace = THREE.NoColorSpace;
    t.needsUpdate = true;
    return t;
  }, []);
  const geo = useMemo(() => {
    const paper = new THREE.PlaneGeometry(RW, RL, 1, 380).translate(0, RL / 2, 0);
    // PlaneGeometry lists its rows from the far end; reverse the triangles so a draw range reveals the paper from the printer out
    const pi = paper.index!.array as Uint16Array | Uint32Array;
    const rev = pi.slice();
    const nt = pi.length / 3;
    for (let t = 0; t < nt; t++) for (let k = 0; k < 3; k++) rev[t * 3 + k] = pi[(nt - 1 - t) * 3 + k];
    paper.setIndex(new THREE.BufferAttribute(rev, 1));
    const desk = new THREE.PlaneGeometry(80, 120).translate(0, 40, -0.02);
    const printer = merge([
      new THREE.BoxGeometry(5.0, 3.6, 1.6).translate(0, -2.2, 0.8),
      new THREE.BoxGeometry(5.2, 1.2, 0.5).translate(0, -0.6, 1.6), // lid
      new THREE.BoxGeometry(3.6, 0.3, 0.12).translate(0, -0.2, 1.42), // the slot lip
    ]);
    const slot = new THREE.BoxGeometry(3.4, 0.16, 0.14).translate(0, -0.25, 1.5);
    const plane = airplane();
    const doorFrame = merge([
      new THREE.BoxGeometry(0.22, 0.3, 2.6).translate(-0.9, 0, 1.3),
      new THREE.BoxGeometry(0.22, 0.3, 2.6).translate(0.9, 0, 1.3),
      new THREE.BoxGeometry(2.0, 0.3, 0.22).translate(0, 0, 2.5),
      new THREE.BoxGeometry(1.5, 0.08, 2.3).translate(0, 0, 1.15),
    ]);
    const shelf = merge([
      new THREE.BoxGeometry(0.1, 10, 1.1).translate(0, 0, 0.55),
      new THREE.BoxGeometry(1.4, 10, 0.08).translate(0.7, 0, 1.1),
      new THREE.BoxGeometry(1.4, 10, 0.08).translate(0.7, 0, 0.04),
    ]);
    const tag = new THREE.PlaneGeometry(0.7, 1.1).translate(0, -0.55, 0);
    const string = new THREE.CylinderGeometry(0.012, 0.012, 0.5, 6).translate(0, 0.25, 0);
    const torn = (() => {
      const s = new THREE.Shape();
      s.moveTo(-RW / 2, 0);
      for (let i = 0; i <= 12; i++) s.lineTo(-RW / 2 + (i / 12) * RW, (i % 2 ? 0.18 : 0) + 0.05 * Math.sin(i * 1.7));
      s.lineTo(RW / 2, 4.6);
      s.lineTo(-RW / 2, 4.6);
      s.closePath();
      const g = new THREE.ShapeGeometry(s, 4);
      const uv = g.getAttribute("uv") as THREE.BufferAttribute;
      const pos = g.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / RW + 0.5, (Y.zero - 1.9 + pos.getY(i)) / RL);
      return g;
    })();
    const cardFace = new THREE.ShapeGeometry(roundRect(8.56 * 0.42, 5.398 * 0.42, 0.13), 10);
    const uv = cardFace.getAttribute("uv") as THREE.BufferAttribute;
    const pp = cardFace.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < pp.count; i++) uv.setXY(i, pp.getX(i) / (8.56 * 0.42) + 0.5, pp.getY(i) / (5.398 * 0.42) + 0.5);
    const cardB = cardBody();
    cardB.scale(0.42, 0.42, 0.42);
    return { paper, desk, printer, slot, plane, doorFrame, shelf, tag, string, torn, cardFace, cardB };
  }, []);
  const metal = useMemo(() => new THREE.MeshPhysicalMaterial({ map: face("metal").tex, roughness: 0.34, metalness: 0.5, clearcoat: 1, clearcoatRoughness: 0.12 }), []);
  const real = useMemo(() => {
    const body = cardBody();
    const faceG = new THREE.ShapeGeometry(roundRect(8.56, 5.398, 0.32), 12);
    const uv = faceG.getAttribute("uv") as THREE.BufferAttribute;
    const p = faceG.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) uv.setXY(i, p.getX(i) / 8.56 + 0.5, p.getY(i) / 5.398 + 0.5);
    return { body, faceG, edge: new THREE.MeshPhysicalMaterial({ color: "#b9b9c4", roughness: 0.22, metalness: 1 }) };
  }, []);
  const sleeveG = useMemo(() => new THREE.PlaneGeometry(RW, 3.0).translate(0, 1.5, 0), []);

  // how much paper has printed: the leading edge runs ahead of the camera
  const camY = f < T.ride ? 0 : lerp(0, Y.zero - 2.5, ramp(f, T.ride, T.tear, (x) => x));
  const printed = Math.min(Y.zero + 2.4, Math.max(lerp(0, Y.five + 3, ramp(f, T.print, T.ride, inOut)), camY + 9));
  const idx = geo.paper.index!.count;
  geo.paper.setDrawRange(0, Math.floor(idx * Math.min(1, printed / RL)));
  // camera
  const introPos = new THREE.Vector3(5.5, -7.5, 6.5).lerp(new THREE.Vector3(1.0, -3.6, 3.4), ramp(f, T.print, T.ride, inOut));
  const introTarget = new THREE.Vector3(0.5, 1.0, 0.4).lerp(new THREE.Vector3(0.2, 4, 0.2), ramp(f, T.print, T.ride, inOut));
  const onRide = ramp(f, T.ride, T.ride + 30, inOut);
  const ridePos = new THREE.Vector3(0.9 + 0.3 * Math.sin(f / 50), camY - 3.4, 2.4 + 0.3 * Math.sin(f / 37));
  const rideTarget = new THREE.Vector3(0.0, camY + 4.5, 0.15);
  const tearLook = ramp(f, T.tear, T.tear + 30, inOut);
  const tearPos = new THREE.Vector3(0.4, Y.card - 4.2, 3.6);
  const tearTarget = new THREE.Vector3(0, Y.card + 0.4, 0.1);
  const pos = introPos.lerp(ridePos, onRide).lerp(tearPos, tearLook);
  const target = introTarget.lerp(rideTarget, onRide).lerp(tearTarget, tearLook);
  // beats
  const lift = ramp(f, T.lift, T.sleeve - 10, inOut);
  const planeY = Y.plane + lift * 14;
  const planeZ = 0.12 + Math.pow(lift, 1.6) * 7;
  const planeTilt = 0.35 * Math.sin(Math.PI * Math.min(1, lift * 1.3));
  const sleeveF = ramp(f, T.sleeve + 10, T.sleeve + 50, expoOut);
  const doorsUp = (i: number) => ramp(f, T.sleeve + 20 + i * 10, T.sleeve + 48 + i * 10, expoOut);
  const tagsOn = (i: number) => ramp(f, T.tags + 12 + i * 10, T.tags + 36 + i * 10, expoOut);
  const tear = ramp(f, T.tear + 6, T.real + 6, inOut);
  const L = { ambient: 0.16, lift: 0.08, key: [-0.4, -0.5, 0.75] as V3 };
  const hingeQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI * 0.92 * sleeveF);
  return (
    <>
      <CamN pos={pos.toArray() as V3} target={target.toArray() as V3} fov={lerp(36, 44, onRide)} />
      <Env />
      {/* desk and printer */}
      <EMesh g={geo.desk} m={m(P.graphite, 1, { albedoNoise: 0.25 })} live={{ ambient: 0.1, lift: 0.0, dim: 0.35 }} />
      <EMesh g={geo.printer} m={m(P.graphite, 2)} live={{ ambient: 0.14, lift: 0.05 }} />
      <EMesh g={geo.slot} m={m(P.graphite, 3)} live={{ ambient: 0.05, dim: 0.7 }} />
      {/* the card rests beside the printer */}
      <group position={[4.6, 1.2, 0.03]} rotation={[0, 0, -0.35]}>
        <EMesh g={geo.cardB} m={m(P.green, 4, { albedoNoise: 0.05 })} live={L} />
        <EMesh g={geo.cardFace} m={m(P.green, 5, { map: cardTex, mapAmt: 1, albedoNoise: 0.04 })} pos={[0, 0, 0.02]} live={{ ...L, lift: 0.12 }} />
      </group>
      {/* the receipt: printed length grows, the texture carries the facts */}
      <EMesh g={geo.paper} m={m(P.green, 6, { map: tex, mapAmt: 1.0, albedoNoise: 0.0, spec: 0.1 })} pos={[0, 0, 0.01]} live={{ ambient: 0.22, lift: 0.1, key: [-0.3, -0.4, 0.85] }} double />
      {/* flights: the plane on the runway lifts off */}
      {f >= T.runway - 30 && (
        <EMesh g={geo.plane} m={m(P.indigo, 10, { spec: 0.6 })} pos={[0, planeY, planeZ]} rot={[Math.PI / 2 + planeTilt, 0, 0]} scale={0.34} live={{ ...L, lift: 0.12 }} />
      )}
      {/* hotels: the paper folds over into a key sleeve, doors stand up beside it */}
      {f >= T.sleeve - 10 && (
        <group position={[0, Y.hotels + 2.2, 0.015]} quaternion={hingeQ}>
          <EMesh g={sleeveG} m={m(P.terra, 20, { albedoNoise: 0.05 })} live={{ ambient: 0.3, lift: 0.4 }} double />
        </group>
      )}
      {f >= T.sleeve - 10 && (
        <group position={[0, Y.hotels + 1.0, 0.1]} rotation={[0, 0, 0]} scale={lerp(0.001, 1, ramp(f, T.sleeve + 30, T.sleeve + 56, expoOut))}>
          <EMesh g={geo.cardB} m={m(P.green, 21, { albedoNoise: 0.05 })} pos={[0, 0, 0]} rot={[0.0, 0, 0]} scale={0.55} live={L} />
          <EMesh g={geo.cardFace} m={m(P.green, 22, { map: cardTex, mapAmt: 1 })} pos={[0, 0, 0.012]} scale={0.55} live={{ ...L, lift: 0.12 }} />
        </group>
      )}
      {f >= T.sleeve - 10 && [0, 1, 2, 3, 4].map((i) => (
        <group key={i} position={[i % 2 ? 2.6 : -2.6, Y.hotels - 2 + i * 2.2, 0]} rotation={[(i % 2 ? 1 : -1) * (Math.PI / 2) * (1 - doorsUp(i)), 0, 0]}>
          <EMesh g={geo.doorFrame} m={m(P.terra, 30 + i)} live={{ ...L, lift: 0.06 + 0.2 * doorsUp(i) }} />
        </group>
      ))}
      {/* store: a shelf beside the paper, products with hanging tags cut from the receipt */}
      {f >= T.tags - 20 && (
        <>
          <EMesh g={geo.shelf} m={m(P.rose, 40)} pos={[2.4, Y.store + 3.5, 0]} live={L} />
          {[M.camera, M.watch, M.vase, M.box].map((u, i) => (
            <group key={i} position={[3.0, Y.store - 0.2 + i * 2.4, 1.18]}>
              <Gltf url={u} size={0.95} m={m(P.rose, 41 + i, { mapAmt: 0.8 })} rot={[Math.PI / 2, 0, -0.5 + 0.3 * i]} live={{ ...L, lift: 0.1 + 0.35 * tagsOn(i) }} />
              <group position={[-0.55, 0, 0.9]} rotation={[0.2 * Math.sin(f / 23 + i), 0, 0]} scale={tagsOn(i)}>
                <EMesh g={geo.string} m={m(P.rose, 50 + i)} rot={[Math.PI / 2, 0, 0]} live={L} />
                <EMesh g={geo.tag} m={m(P.rose, 55 + i, { map: tex, mapAmt: 0.9 })} rot={[Math.PI / 2, 0, 0]} live={{ ambient: 0.3, lift: 0.4 }} double />
              </group>
            </group>
          ))}
        </>
      )}
      {/* the tear: the last lines lift away and the real card lies under the paper */}
      {f >= T.tear && (
        <group position={[0, Y.zero - 1.9, 0.02]} rotation={[lerp(0, -1.2, tear), 0, 0.15 * tear]}>
          <EMesh g={geo.torn} m={m(P.green, 60, { map: tex, mapAmt: 1.0, albedoNoise: 0.0 })} live={{ ambient: 0.22, lift: 0.1 }} double />
        </group>
      )}
      {f >= T.tear && (
        <group position={[0, Y.card, -0.02]} rotation={[0, 0, 0.12]} scale={0.42}>
          <mesh geometry={real.body} material={real.edge} />
          <mesh geometry={real.faceG} material={metal} position={[0, 0, 0.0425]} />
        </group>
      )}
      <ambientLight intensity={0.4} />
      <directionalLight position={[-6, Y.card - 6, 8]} intensity={2.0} color="#fff6ea" />
      <directionalLight position={[8, Y.card + 4, 5]} intensity={1.4} color="#874bf9" />
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
  const pitch = THREE.MathUtils.degToRad(lerp(-40, 0, arrive) + lerp(0, -8, turn) + 3 * toLock);
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

export const GReceipt: React.FC = () => {
  const f = useCurrentFrame();
  const realIn = ramp(f, T.real, T.real + 12);
  const lightsOut = ramp(f, T.lock - 6, T.lock + 12);
  const endFade = ramp(f, 704, 719, (t) => t);
  return (
    <AbsoluteFill style={{ background: f >= T.real ? "#0c0c10" : "#e7e5dc" }}>
      {f < T.real + 12 && (
        <AbsoluteFill style={{ opacity: 1 - realIn }}>
          <World aa><Desk f={f} /></World>
        </AbsoluteFill>
      )}
      {f >= T.real && (
        <AbsoluteFill style={{ opacity: realIn }}>
          <AbsoluteFill style={{ background: "linear-gradient(180deg, #121216 0%, #1a1a20 100%)" }} />
          <World aa><RealCard f={f} /></World>
        </AbsoluteFill>
      )}
      <Paper opacity={0.6} />
      <Head f={f} from={10} to={T.ride + 20} big={["the CRED IndusInd Bank", "RuPay credit card"]} x={110} y={110} ink="#1c3d2a" sheen="#7aa483" size={72} />
      <Head f={f} from={T.ride + 40} to={T.runway + 10} big={["5% rewards"]} small="on online shopping" x={110} y={110} ink="#1f5a5e" sheen="#64aaa3" size={112} />
      <Head f={f} from={T.runway + 30} to={T.sleeve + 10} big={["redeem on flights"]} x={110} y={110} ink="#262c66" sheen="#8a93d6" size={96} />
      <Head f={f} from={T.sleeve + 30} to={T.tags + 10} big={["and hotels"]} x={110} y={110} ink="#6e2a22" sheen="#e8957a" size={96} />
      <Head f={f} from={T.tags + 30} to={T.last + 10} big={["and 2,000+ products"]} small="on CRED store" x={110} y={110} ink="#6d2a49" sheen="#b9688a" size={92} />
      <Head f={f} from={T.last + 24} to={T.turn + 36} big={["zero joining fee"]} x={110} y={110} ink={f >= T.real ? "#f1efe6" : "#1c3d2a"} sheen={f >= T.real ? "#ffffff" : "#7aa483"} size={104} />
      {f >= T.lock - 6 && <AbsoluteFill style={{ background: "#000", opacity: lightsOut * 0.4 }} />}
      {f >= T.lock + 14 && <Logo f={f} at={T.lock + 14} y={700} h={96} />}
      <AbsoluteFill style={{ background: "#000", opacity: endFade }} />
      <Audio src={staticFile("custom/cred-ten/g.wav")} />
    </AbsoluteFill>
  );
};
