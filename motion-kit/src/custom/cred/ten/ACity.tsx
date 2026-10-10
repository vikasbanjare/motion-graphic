/**
 * Ten-film set, A: "Chip City" (30 s, 720 frames, 24 fps). UNOFFICIAL SPEC WORK.
 * Storyboard: docs/storyboards/cred-10.md (A). Method: skills/art-director/SKILL.md. Facts and sources: night/kit.tsx.
 *
 * The idea (dimensionality alteration, contextual fusion): the card's gold chip is a living city. One continuous camera
 * dives onto the chip; its contact pads are districts, the grooves between them are boulevards. The market district
 * lights up street by street (5%), a boulevard leads to the airfield pad where a plane lifts off (flights), the hotel
 * quarter has a lit tower and a bell in its square (hotels), the warehouse district opens its roofs on a grid of goods
 * (2,000+ products), and the city gate stands open with no booth (zero joining fee). Then the camera pulls out through
 * the gate: districts become pads, pads become the chip, the chip sits on the card.
 * Fluent device: the chip. Material truth: the chip's real pad layout (6 pads on a plate).
 *
 * Music: original "warm" bed (tanpura, harmonium, synth tabla; tools/music_bed.py) at 100 BPM, key D.
 */
import React, { useMemo } from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EMesh, World } from "../v2/three.tsx";
import { P, expoOut, inOut, lerp, ramp } from "../v2/look.ts";
import { airplane, cardBody, chip, hotelBell, roundRect } from "../v2/models.ts";
import { merge } from "../v2/models2.ts";
import { Head } from "../CredCardV3.tsx";
import { face } from "../v3/card.ts";
import { Logo, Paper } from "../night/kit.tsx";

export const A_FRAMES = 720;
type V3 = [number, number, number];
const T = { chip: 72, market: 140, blvd: 192, field: 260, hotel: 312, ware: 408, gate: 504, out: 576, real: 640, lock: 672 };

const rnd = (i: number, s = 1) => {
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const v3 = (a: V3, b: V3, t: number): V3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

const CamN: React.FC<{ pos: V3; target: V3; fov?: number; near?: number }> = ({ pos, target, fov = 35, near = 0.05 }) => {
  const { camera } = useThree();
  const c = camera as THREE.PerspectiveCamera;
  c.fov = fov;
  c.near = near;
  c.far = 400;
  c.position.set(...pos);
  c.up.set(0, 0, 1); // the card is the ground plane (z up)
  c.lookAt(new THREE.Vector3(...target));
  c.updateProjectionMatrix();
  return null;
};

// chip placement on the card (card face at z = 0.03); pads: (cx 0|1, cy 0|1|2) at local (±0.28, (cy-1)*0.28), top z 0.032
const CHIP: V3 = [-2.3, 0.4, 0.03];
const PAD_TOP = 0.032;
const pad = (cx: number, cy: number): V3 => [CHIP[0] + (cx - 0.5) * 0.56, CHIP[1] + (cy - 1) * 0.28, CHIP[2] + PAD_TOP];
const MARKET = pad(0, 1), FIELD = pad(1, 0), HOTEL = pad(1, 1), WARE = pad(0, 0), RESI = pad(0, 2), PARK = pad(1, 2);
const GATE: V3 = [CHIP[0], CHIP[1] + 0.47, CHIP[2] + 0.02];

/** A district of tiny buildings on a pad, merged into one geometry. */
const district = (seed: number, w = 0.46, h = 0.2, n = 110, hmax = 0.028) => {
  const boxes: THREE.BufferGeometry[] = [];
  for (let i = 0; i < n; i++) {
    const gx = (Math.floor(rnd(i, seed) * 10) + 0.5) / 10 - 0.5;
    const gy = (Math.floor(rnd(i + 50, seed) * 5) + 0.5) / 5 - 0.5;
    const bw = 0.022 + rnd(i + 9, seed) * 0.02, bd = 0.016 + rnd(i + 3, seed) * 0.014, bh = 0.006 + rnd(i + 7, seed) ** 2 * hmax;
    boxes.push(new THREE.BoxGeometry(bw, bd, bh).translate(gx * w + (rnd(i + 1, seed) - 0.5) * 0.01, gy * h, bh / 2));
  }
  return merge(boxes);
};

const GOLD = P.brass;
const STEEL: typeof P.graphite = [["#101014", 0], ["#33333b", 0.45], ["#9a9aa6", 0.83], ["#ededf3", 1]];

// camera keys: [frame, pos, target, fov]
const KEYS: [number, V3, V3, number][] = [
  [0, [-0.4, -5.2, 6.4], [-1.6, -0.2, 0], 34],
  [T.chip, [-2.2, -1.5, 1.35], [-2.3, 0.35, 0.03], 34],
  [T.market, [MARKET[0] - 0.05, MARKET[1] - 0.33, MARKET[2] + 0.11], [MARKET[0], MARKET[1] + 0.02, MARKET[2]], 48],
  [T.blvd, [MARKET[0] + 0.1, MARKET[1] - 0.2, MARKET[2] + 0.07], [MARKET[0] + 0.3, MARKET[1] + 0.1, MARKET[2]], 52],
  [T.field, [FIELD[0] - 0.3, FIELD[1] - 0.09, FIELD[2] + 0.045], [FIELD[0] - 0.05, FIELD[1], FIELD[2] + 0.012], 50],
  [T.hotel, [FIELD[0] - 0.12, FIELD[1] - 0.02, FIELD[2] + 0.1], [HOTEL[0] + 0.1, HOTEL[1], HOTEL[2] + 0.05], 46],
  [T.ware, [HOTEL[0] - 0.08, HOTEL[1] - 0.17, HOTEL[2] + 0.08], [HOTEL[0] + 0.06, HOTEL[1] + 0.02, HOTEL[2] + 0.05], 46],
  [T.ware + 40, [WARE[0] + 0.12, WARE[1] - 0.3, WARE[2] + 0.2], [WARE[0], WARE[1] + 0.02, WARE[2]], 46],
  [T.gate, [WARE[0] + 0.02, WARE[1] - 0.3, WARE[2] + 0.25], [WARE[0], WARE[1] + 0.02, WARE[2]], 46],
  [T.out, [GATE[0], GATE[1] - 0.22, GATE[2] + 0.035], [GATE[0], GATE[1] + 0.3, GATE[2] + 0.03], 54],
  [T.real + 8, [0, -1.4, 10.5], [0, 0, 0], 34],
  [A_FRAMES, [0, -1.4, 10.5], [0, 0, 0], 34],
];
const cam = (f: number) => {
  for (let i = 0; i < KEYS.length - 1; i++) {
    const [a, pa, ta, fa] = KEYS[i], [b, pb, tb, fb] = KEYS[i + 1];
    if (f >= a && f < b) {
      const t = inOut((f - a) / (b - a));
      return { pos: v3(pa, pb, t), target: v3(ta, tb, t), fov: lerp(fa, fb, t) };
    }
  }
  const [, p, t, fv] = KEYS[KEYS.length - 1];
  return { pos: p, target: t, fov: fv };
};

const City: React.FC<{ f: number }> = ({ f }) => {
  const geo = useMemo(() => {
    const plane = airplane();
    plane.computeBoundingBox();
    const win = (() => {
      const c = document.createElement("canvas");
      c.width = 64;
      c.height = 192;
      const x = c.getContext("2d")!;
      x.fillStyle = "#666";
      x.fillRect(0, 0, 64, 192);
      for (let r = 0; r < 14; r++) for (let k = 0; k < 4; k++) {
        x.fillStyle = (r * 5 + k * 3) % 4 === 0 ? "#fff" : "#999";
        x.fillRect(5 + k * 15, 6 + r * 13, 9, 7);
      }
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.NoColorSpace;
      return t;
    })();
    const lids: THREE.BufferGeometry[] = [];
    const goods: THREE.BufferGeometry[] = [];
    for (let i = 0; i < 12; i++) {
      const gx = ((i % 4) - 1.5) * 0.105, gy = (Math.floor(i / 4) - 1) * 0.062;
      for (let k = 0; k < 24; k++) goods.push(new THREE.BoxGeometry(0.012, 0.01, 0.012 + rnd(k + i * 7) * 0.016).translate(gx + ((k % 6) - 2.5) * 0.013, gy + (Math.floor(k / 6) - 1.5) * 0.012, 0.004));
      lids.push(new THREE.BoxGeometry(0.09, 0.05, 0.004).translate(gx, gy, 0.03));
    }
    return {
      card: new THREE.BoxGeometry(8.56, 5.398, 0.06),
      chip: chip(),
      market: district(1), resi: district(2, 0.46, 0.2, 90, 0.016), park: district(3, 0.46, 0.2, 40, 0.01),
      hotelQ: district(4, 0.46, 0.2, 70, 0.02),
      tower: new THREE.BoxGeometry(0.06, 0.06, 0.1),
      bell: hotelBell(),
      runway: new THREE.BoxGeometry(0.4, 0.05, 0.003),
      plane,
      // open-top trays (floor + four thin walls) so the goods inside show once the roofs lift
      wareBody: merge(Array.from({ length: 12 }, (_, i) => {
        const x = ((i % 4) - 1.5) * 0.105, y = (Math.floor(i / 4) - 1) * 0.062;
        return merge([
          new THREE.BoxGeometry(0.09, 0.05, 0.004).translate(x, y, 0.002),
          new THREE.BoxGeometry(0.09, 0.003, 0.022).translate(x, y - 0.0235, 0.011),
          new THREE.BoxGeometry(0.09, 0.003, 0.022).translate(x, y + 0.0235, 0.011),
          new THREE.BoxGeometry(0.003, 0.05, 0.022).translate(x - 0.0435, y, 0.011),
          new THREE.BoxGeometry(0.003, 0.05, 0.022).translate(x + 0.0435, y, 0.011),
        ]);
      })),
      lids,
      goods: merge(goods),
      pillar: new THREE.BoxGeometry(0.014, 0.014, 0.075),
      arch: new THREE.TorusGeometry(0.052, 0.008, 10, 32, Math.PI),
      bulb: new THREE.SphereGeometry(0.0035, 8, 6),
      win,
    };
  }, []);
  const tex = useMemo(() => {
    const t = face("metal").tex.clone();
    t.colorSpace = THREE.NoColorSpace;
    t.needsUpdate = true;
    return t;
  }, []);
  const c = cam(f);
  const h = c.pos[2] - 0.06; // height above the pads
  const near = Math.max(0.0015, Math.min(0.05, h * 0.25));
  const macro = ramp(f, T.chip, T.market, inOut);
  const L = { key: [-0.5, -0.7, 0.55] as V3, ambient: lerp(0.05, 0.12, macro), lift: 0.04 * macro, keyAmt: 1.05 };
  const m = (seed: number, extra: Record<string, unknown> = {}) => ({ palette: GOLD, seed, space: 0 as const, angleDeg: 45, spec: 0.5, shininess: 50, albedoNoise: 0.12, ...extra });
  // beats
  const marketOn = (k: number) => ramp(f, T.market - 20 + k * 1.1, T.market - 14 + k * 1.1, expoOut);
  const takeoff = ramp(f, T.field + 12, T.hotel - 10, inOut);
  const lidOpen = (i: number) => ramp(f, T.ware + 10 + i * 2.5, T.ware + 34 + i * 2.5, inOut);
  const goodsOn = ramp(f, T.ware + 36, T.ware + 70, inOut);
  const gateLight = ramp(f, T.gate + 8, T.gate + 40, inOut);
  const planeP: V3 = [FIELD[0] - 0.17 + 0.5 * takeoff, FIELD[1] + 0.0, FIELD[2] + 0.012 + 0.14 * takeoff * takeoff];
  const track = takeoff > 0 && takeoff < 1 ? Math.sin(Math.PI * takeoff) : 0;
  // during the takeoff the camera flies alongside the plane, just behind its wing
  const chase: V3 = [planeP[0] - 0.07, planeP[1] - 0.075, planeP[2] + 0.025];
  const camPos: V3 = v3(c.pos, chase, 0.9 * track);
  const camTarget: V3 = v3(c.target, planeP, 0.9 * track);
  return (
    <>
      <CamN pos={camPos} target={camTarget} fov={c.fov} near={near} />
      {/* the card and its chip */}
      <EMesh g={geo.card} m={{ palette: STEEL, seed: 2, map: tex, mapAmt: 0.55, albedoNoise: 0.08, space: 0, angleDeg: 45, periodFrac: 0.0066, spec: 0.5, shininess: 40 }} live={L} />
      <EMesh g={geo.chip} m={m(3, { spec: 0.8, shininess: 80 })} pos={CHIP} live={{ ...L, dim: 0.22 * macro }} />
      {/* districts */}
      <EMesh g={geo.market} m={m(10)} pos={MARKET} live={{ ...L, lift: L.lift + 0.06 + 0.12 * ramp(f, T.market - 20, T.blvd) }} />
      <EMesh g={geo.resi} m={m(11)} pos={RESI} live={{ ...L, lift: L.lift + 0.06 }} />
      <EMesh g={geo.park} m={m(12)} pos={PARK} live={{ ...L, lift: L.lift + 0.06 }} />
      <EMesh g={geo.hotelQ} m={m(13)} pos={HOTEL} live={{ ...L, lift: L.lift + 0.06 }} />
      <EMesh g={geo.tower} m={m(14, { map: geo.win, mapAmt: 1 })} pos={[HOTEL[0] + 0.1, HOTEL[1] + 0.02, HOTEL[2] + 0.05]} live={{ ...L, lift: 0.08 + 0.1 * ramp(f, T.hotel, T.hotel + 30) }} />
      <EMesh g={geo.bell} m={m(15, { spec: 0.9, shininess: 90 })} pos={[HOTEL[0] - 0.08, HOTEL[1] - 0.04, HOTEL[2]]} scale={0.012} live={{ ...L, lift: 0.1 * ramp(f, T.hotel + 30, T.hotel + 44, expoOut) }} />
      {/* airfield */}
      <EMesh g={geo.runway} m={m(16, { albedoNoise: 0.3 })} pos={[FIELD[0], FIELD[1], FIELD[2] + 0.0015]} live={{ ...L, lift: -0.08 }} />
      {Array.from({ length: 16 }, (_, k) => (
        <mesh key={k} geometry={geo.bulb} position={[FIELD[0] - 0.19 + k * 0.025, FIELD[1] - 0.028, FIELD[2] + 0.004]} scale={0.8 * ramp(f, T.blvd + 20 + k * 2, T.blvd + 26 + k * 2, expoOut)}>
          <meshBasicMaterial color="#ffd27a" />
        </mesh>
      ))}
      <EMesh g={geo.plane} m={m(17, { spec: 0.7 })} pos={planeP} rot={[0, -0.35 * takeoff, 0]} scale={0.0095} live={{ ...L, lift: 0.12 }} />
      {/* warehouses: roofs hinge open on the back edge; goods inside light in a wave */}
      <EMesh g={geo.wareBody} m={m(18)} pos={WARE} live={L} />
      {geo.lids.map((g, i) => (
        <group key={i} position={[WARE[0], WARE[1] + 0.09 * lidOpen(i), WARE[2] + 0.05 * Math.sin(Math.PI * Math.min(1, lidOpen(i))) + 0.02 * lidOpen(i)]} rotation={[0.9 * lidOpen(i), 0, 0]}>
          <EMesh g={g} m={m(19 + i)} pos={[0, 0, 0]} live={{ ...L, opacity: 1 - 0.6 * lidOpen(i) }} />
        </group>
      ))}
      <EMesh g={geo.goods} m={m(31, { palette: P.terra })} pos={[WARE[0], WARE[1], WARE[2] + 0.004]} live={{ ...L, lift: 0.15 + 0.45 * goodsOn }} />
      {/* market street lights, on one by one */}
      {Array.from({ length: 40 }, (_, k) => {
        const row = k % 4, col = Math.floor(k / 4);
        return (
          <mesh key={k} geometry={geo.bulb} position={[MARKET[0] - 0.2 + col * 0.044, MARKET[1] - 0.075 + row * 0.05, MARKET[2] + 0.006]} scale={marketOn(k)}>
            <meshBasicMaterial color="#ffe0a0" />
          </mesh>
        );
      })}
      {/* the city gate: two pillars and an arch across the top boulevard, open */}
      <EMesh g={geo.pillar} m={m(40)} pos={[GATE[0] - 0.052, GATE[1], GATE[2] + 0.0375]} live={{ ...L, lift: 0.1 * gateLight }} />
      <EMesh g={geo.pillar} m={m(41)} pos={[GATE[0] + 0.052, GATE[1], GATE[2] + 0.0375]} live={{ ...L, lift: 0.1 * gateLight }} />
      <EMesh g={geo.arch} m={m(42)} pos={[GATE[0], GATE[1], GATE[2] + 0.075]} rot={[Math.PI / 2, 0, 0]} live={{ ...L, lift: 0.12 * gateLight }} />
    </>
  );
};

// ---- the real card at the end -------------------------------------------------------------------------------------
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

export const ACity: React.FC = () => {
  const f = useCurrentFrame();
  const realIn = ramp(f, T.real, T.real + 16);
  const lightsOut = ramp(f, T.lock - 6, T.lock + 12);
  const endFade = ramp(f, 704, 719, (t) => t);
  const G = "#f3dca4";
  return (
    <AbsoluteFill style={{ background: "#0c0c10" }}>
      {f < T.real + 16 && (
        <AbsoluteFill style={{ opacity: 1 - realIn }}>
          <World><City f={f} /></World>
        </AbsoluteFill>
      )}
      {f >= T.real && (
        <AbsoluteFill style={{ opacity: realIn }}>
          <AbsoluteFill style={{ background: "linear-gradient(180deg, #121216 0%, #1a1a20 100%)" }} />
          <World aa><RealCard f={f} /></World>
        </AbsoluteFill>
      )}
      <Paper opacity={0.35} />
      <Head f={f} from={10} to={T.chip + 20} big={["the CRED IndusInd Bank", "RuPay credit card"]} x={110} y={110} ink="#e9e7ee" sheen="#ffffff" size={72} />
      <Head f={f} from={T.market - 6} to={T.blvd + 16} big={["5% rewards"]} small="on online shopping" x={110} y={110} ink={G} sheen="#ffffff" size={112} />
      <Head f={f} from={T.field - 6} to={T.hotel + 4} big={["redeem on flights"]} x={110} y={110} ink={G} sheen="#ffffff" size={96} />
      <Head f={f} from={T.hotel + 14} to={T.ware + 4} big={["and hotels"]} x={110} y={110} ink={G} sheen="#ffffff" size={96} />
      <Head f={f} from={T.ware + 16} to={T.gate + 2} big={["and 2,000+ products"]} small="on CRED store" x={110} y={110} ink={G} sheen="#ffffff" size={92} />
      <Head f={f} from={T.gate + 12} to={T.out + 20} big={["zero joining fee"]} x={110} y={110} ink={G} sheen="#ffffff" size={104} />
      {f >= T.lock - 6 && <AbsoluteFill style={{ background: "#000", opacity: lightsOut * 0.4 }} />}
      {f >= T.lock + 14 && <Logo f={f} at={T.lock + 14} y={700} h={96} />}
      <AbsoluteFill style={{ background: "#000", opacity: endFade }} />
      <Audio src={staticFile("custom/cred-ten/a.wav")} />
    </AbsoluteFill>
  );
};
