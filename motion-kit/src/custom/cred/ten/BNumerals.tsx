/**
 * Ten-film set, B: "Embossed Numerals" (30 s, 720 frames, 24 fps). UNOFFICIAL SPEC WORK.
 * Storyboard: docs/storyboards/cred-10.md (B). Method: skills/art-director/SKILL.md. Facts and sources: night/kit.tsx.
 *
 * The idea (dimensionality alteration + contextual fusion): the card's raised numerals ARE the architecture. One true
 * camera dive takes us from a macro of the real card down to street level between its embossed digits, where the
 * numbers that matter are buildings: a glowing 5, a dusk city seen from a plane, a "2,000+" skyline of shelves, a "0"
 * arch with no barrier. Then the camera pulls back out, the city flattens into the emboss, and the card turns in light.
 * Fluent device: the numerals. Material truth: emboss, foil, guilloche. No icons, no copies of the reference.
 *
 * Music: original, 112 BPM, key D (v2/audio/cred_score.py). Every SFX is a visible event (ten/audio/b.json).
 * Render in chunks with a fresh browser per chunk (long WebGL renders stall): ten/render.sh b
 */
import React, { useMemo } from "react";
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from "remotion";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import droidSerifBold from "three/examples/fonts/droid/droid_serif_bold.typeface.json";
import { EMesh, Gltf, M, World } from "../v2/three.tsx";
import { P, easeIn, expoOut, inOut, lerp, mixPal, ramp } from "../v2/look.ts";
import { LensVignette } from "../v2/fx.tsx";
import { Head } from "../CredCardV3.tsx";
import { cardBody, roundRect } from "../v2/models.ts";
import { face } from "../v3/card.ts";
import { Logo, Paper } from "../night/kit.tsx";

export const B_FRAMES = 720;
type V3 = [number, number, number];

// ---- beats (frames) ---------------------------------------------------------------------------------------------
const T = { dive: 50, street: 100, glow: 104, shadow: 132, lift: 166, city: 192, converge: 286, sky: 312, arch: 432, back: 528, real: 596, turn: 606, lock: 672 };

// ---- 3D type -----------------------------------------------------------------------------------------------------
const FONT = new FontLoader().parse(droidSerifBold as never);
const glyph = (s: string, size: number, depth: number, bevel = 0.02) => {
  const g = new TextGeometry(s, { font: FONT, size, depth, curveSegments: 12, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel * 0.7, bevelSegments: 3 });
  g.computeBoundingBox();
  const b = g.boundingBox!;
  g.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -b.min.z);
  g.computeVertexNormals();
  return g;
};

/** Camera with a near plane that follows the shot (the dive goes from 12 units to 0.01 above the surface). */
const CamN: React.FC<{ pos: V3; target: V3; fov?: number; near?: number; roll?: number }> = ({ pos, target, fov = 35, near = 0.05, roll = 0 }) => {
  const { camera } = useThree();
  const c = camera as THREE.PerspectiveCamera;
  c.fov = fov;
  c.near = near;
  c.far = 400;
  c.position.set(...pos);
  c.up.set(Math.sin(roll), Math.cos(roll), 0);
  c.lookAt(new THREE.Vector3(...target));
  c.updateProjectionMatrix();
  return null;
};

const v3 = (a: V3, b: V3, t: number): V3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

// ---- World A: the card and its embossed digits (beats 1, 2 and 6) ------------------------------------------------
const DIGITS = ["5", "0", "2", "0", "0", "0"]; // emboss artwork, not a card number
const PITCH = 0.62;
const ROW_Y = -1.25;
const GOLD = P.brass;
const SILVER: typeof P.graphite = [["#101014", 0], ["#33333b", 0.45], ["#9a9aa6", 0.83], ["#ededf3", 1]];

const CardWorld: React.FC<{ f: number }> = ({ f }) => {
  const geo = useMemo(() => {
    const chars = DIGITS.map((c) => glyph(c, 0.86, 0.06, 0.008));
    const pct = glyph("%", 0.5, 0.004, 0);
    const slab = new THREE.BoxGeometry(8.56, 5.398, 0.06);
    return { chars, pct, slab };
  }, []);
  const tex = useMemo(() => {
    const t = face("metal").tex.clone();
    t.colorSpace = THREE.NoColorSpace;
    t.needsUpdate = true;
    return t;
  }, []);
  // the digit row minus the 5 (the 5 is its own mesh so it can glow): offset the row so the 5 sits at x = -2.6
  const fiveX = -2.6;
  const glow = ramp(f, T.glow, T.glow + 30, inOut) * (1 - ramp(f, T.lift + 10, T.city));
  const fivePal = mixPal(SILVER, GOLD, glow);
  const shadowIn = ramp(f, T.shadow, T.shadow + 20, inOut);
  const flat = f >= T.back ? ramp(f, T.back + 10, T.back + 60, inOut) : 0; // emboss flattens on the way out
  const zs = lerp(1, 0.18, flat);
  // camera path
  let pos: V3, target: V3, near = 0.05;
  if (f < T.back) {
    const slide = ramp(f, 0, T.dive, inOut);
    const dive = ramp(f, T.dive, T.street + 10, inOut); // decelerates into the landing (an ease-in crashed: frame jump)
    const walk = ramp(f, T.street, T.lift, inOut);
    const lift = ramp(f, T.lift, T.city, inOut);
    const p0 = v3([-4.2, -9.0, 5.6], [-2.4, -8.6, 5.2], slide); // the whole card, low 3/4, sliding right
    // the canyon between the 5 and the first 0 (digit pitch 0.62, glyphs about 0.5 wide): a street 0.12 wide, walls 0.06 tall
    const cx = fiveX + PITCH / 2 + 0.02;
    const pStreet: V3 = [cx, ROW_Y - 0.95, 0.075]; // at the canyon mouth, eye 0.045 above the face (face top at z 0.03)
    const pWalk: V3 = [cx, ROW_Y - 0.05, 0.058]; // inside the canyon
    const pLift: V3 = [fiveX + 1.05, ROW_Y - 0.55, 0.62]; // straight above the % shadow's top circle
    pos = v3(v3(v3(p0, pStreet, dive), pWalk, walk), pLift, lift);
    const t0: V3 = [-0.2, -0.6, 0];
    const tStreet: V3 = [cx - 0.02, ROW_Y + 1.6, 0.04]; // looking along the street
    const tLift: V3 = [fiveX + 1.05, ROW_Y - 0.55, 0.03];
    target = v3(v3(t0, tStreet, Math.max(dive, walk * 0.3)), tLift, lift);
    near = lerp(0.05, 0.003, Math.pow(dive, 0.6));
  } else {
    // the way out: from street level by the last 0 up and back to the full card
    const out = ramp(f, T.back, T.real + 10, inOut);
    pos = v3([fiveX + 4.5 * PITCH, ROW_Y - 0.1, 0.058], [0, -1.4, 10.5], out);
    target = v3([fiveX + 4.5 * PITCH, ROW_Y + 1.6, 0.04], [0, 0, 0], out);
    near = lerp(0.004, 0.05, out);
  }
  // key light: grazing from the lower left for the macro, then from behind the camera at street level
  const kd = ramp(f, T.dive, T.street, inOut);
  const key: V3 = f < T.back ? [lerp(-0.9, 0.25, kd), lerp(-0.5, -1.0, kd), lerp(0.22, 0.55, kd)] : [-0.5, -0.8, 0.6];
  const L = { key, ambient: f < T.back ? lerp(0.05, 0.12, kd) : 0.08, lift: f < T.back ? lerp(0, 0.06, kd) : 0.02, keyAmt: 1.1 };
  return (
    <>
      <CamN pos={pos} target={target} fov={f < T.back ? lerp(34, 58, ramp(f, T.dive, T.street, inOut)) * (1 - 0.35 * ramp(f, T.lift, T.city)) : lerp(58, 34, ramp(f, T.back, T.real + 10, inOut))} near={near} />
      {/* the card slab: engraved, with the metal face art as albedo */}
      <EMesh g={geo.slab} m={{ palette: SILVER, seed: 2, map: tex, mapAmt: 0.55, albedoNoise: 0.08, space: 0, angleDeg: 45, periodFrac: 0.0066, spec: 0.55, shininess: 40 }} pos={[0, 0, 0]} live={L} />
      {/* emboss row (the 5 separately so it can glow) */}
      <group position={[0, 0, 0.03]} scale={[1, 1, zs]}>
        {geo.chars.map((g, i) => (
          <EMesh key={i} g={g} m={{ palette: SILVER, seed: 3 + i, space: 0, spec: 0.7, shininess: 60, angleDeg: 45, albedoNoise: 0.1 }} pos={[fiveX + i * PITCH, ROW_Y, 0]} live={i === 0 ? { ...L, pal: fivePal, lift: L.lift + 0.25 * glow } : L} />
        ))}
        {/* the % "shadow" cast on the card by the glowing 5 */}
        <EMesh g={geo.pct} m={{ palette: GOLD, seed: 5, space: 0, angleDeg: 45, opacity: 1 }} pos={[fiveX + 1.05, ROW_Y - 0.55, 0.002]} live={{ ...L, opacity: shadowIn * 0.9, dim: 0.15 }} />
      </group>
    </>
  );
};

// ---- World B: dusk city of numerals, seen through a plane window (beat 3) -----------------------------------------
const CityWorld: React.FC<{ f: number }> = ({ f }) => {
  const lf = f - T.city;
  const geo = useMemo(() => {
    const two = glyph("2", 1.0, 1.2, 0.03);
    const zero = glyph("0", 1.0, 0.9, 0.03);
    const tower = new THREE.BoxGeometry(1.2, 1.2, 3.6);
    const ground = new THREE.PlaneGeometry(60, 60);
    const bulb = new THREE.SphereGeometry(0.09, 10, 8);
    const items: { g: THREE.BufferGeometry; x: number; y: number; r: number; s: number }[] = [];
    let i = 0;
    for (let gx = -7; gx <= 7; gx++)
      for (let gy = -6; gy <= 6; gy++) {
        if (Math.hypot(gx * 0.9, gy) < 1.4) continue; // keep the plaza by the hotel clear
        const h = Math.sin(i * 12.9898 + gx * 3.1) * 43758.5453;
        const r = h - Math.floor(h);
        if (r < 0.25) { i++; continue; }
        items.push({ g: r < 0.6 ? zero : two, x: gx * 2.1 + (r - 0.5) * 0.6, y: gy * 2.1 + (r - 0.5) * 0.6, r: Math.floor(r * 4) * (Math.PI / 2), s: 0.55 + r * 0.6 });
        i++;
      }
    return { tower, ground, bulb, items };
  }, []);
  const winTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 128;
    c.height = 384;
    const x = c.getContext("2d")!;
    x.fillStyle = "#555";
    x.fillRect(0, 0, 128, 384);
    for (let r = 0; r < 24; r++) for (let k = 0; k < 6; k++) {
      x.fillStyle = (r * 7 + k * 3) % 5 === 0 ? "#ffffff" : "#8a8a8a";
      x.fillRect(8 + k * 20, 8 + r * 16, 12, 9);
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.NoColorSpace;
    return t;
  }, []);
  // the runway light path: an arc from the near edge to the hotel plaza
  const N = 34;
  const path = (k: number): V3 => {
    const t = k / (N - 1);
    return [lerp(-9, 0.9, t) + 2.2 * Math.sin(t * Math.PI), lerp(-9, -0.9, t), 0.1];
  };
  const converge = ramp(f, T.converge, T.sky - 2, easeIn);
  const camT = lf / (T.sky - T.city);
  const pos: V3 = [lerp(-4, 1.0, camT), lerp(-15, -9, camT), lerp(8, 7, camT)];
  const CL = { key: [-0.55, -0.75, 0.35] as V3, ambient: 0.1, lift: 0.05 };
  return (
    <>
      <CamN pos={pos} target={[0.4 * camT, -1.5, 0.6]} fov={40} near={0.1} />
      <EMesh g={geo.ground} m={{ palette: P.indigo, seed: 11, space: 0, angleDeg: 45 }} pos={[0, 0, 0]} live={{ ...CL, lift: 0.12 }} />
      {geo.items.map((it, k) => (
        <EMesh key={k} g={it.g} m={{ palette: P.indigo, seed: 12 + (k % 7), space: 0, angleDeg: 45 }} pos={[it.x, it.y, 0]} rot={[0, 0, it.r]} scale={[it.s, it.s, it.s * 1.6]} live={CL} />
      ))}
      {/* the hotel: a lit tower on the plaza */}
      <EMesh g={geo.tower} m={{ palette: P.indigo, seed: 30, space: 0, angleDeg: 45, map: winTex, mapAmt: 1 }} pos={[1.2, -0.6, 1.8]} live={{ ...CL, lift: 0.1 }} />
      {/* runway lights, lit one by one, then converging to a point */}
      {Array.from({ length: N }, (_, k) => {
        const on = ramp(f, T.city + 10 + k * 2.2, T.city + 16 + k * 2.2, expoOut);
        const p = path(k);
        const q: V3 = [lerp(p[0], 1.2, converge), lerp(p[1], -3.4, converge), lerp(p[2], 1.3, converge)];
        return (
          <mesh key={k} geometry={geo.bulb} position={q} scale={on * (1 + 0.5 * converge)}>
            <meshBasicMaterial color="#ffd27a" />
          </mesh>
        );
      })}
    </>
  );
};

// ---- World C: the "2,000+" skyline and the 0 arch (beats 4 and 5) --------------------------------------------------
const SkyWorld: React.FC<{ f: number }> = ({ f }) => {
  const geo = useMemo(() => {
    const g2 = glyph("2", 2.6, 1.1, 0.04);
    const comma = glyph(",", 2.6, 0.5, 0.03);
    const g0 = glyph("0", 2.6, 1.1, 0.04);
    const plus = glyph("+", 2.0, 0.7, 0.03);
    const ground = new THREE.PlaneGeometry(80, 40);
    return { g2, comma, g0, plus, ground };
  }, []);
  const xs = { two: -5.0, comma: -3.55, z1: -2.0, z2: 0.3, z3: 2.6, plus: 4.9 };
  const pullback = ramp(f, T.sky, T.sky + 60, inOut);
  const glide = ramp(f, T.sky + 60, T.arch, inOut);
  const fly = ramp(f, T.arch, T.back - 6, Easing);
  const camA: V3 = [xs.comma, -1.9, 2.6]; // on the comma (the converged light)
  const camB: V3 = [0.2, -0.2, 14];
  const camC: V3 = [xs.z3, 0.0, 12];
  const camD: V3 = [xs.z3, 0.0, -4]; // through the last 0
  const pos = fly > 0 ? v3(camC, camD, fly) : v3(v3(camA, camB, pullback), camC, glide);
  const target: V3 = fly > 0 ? [xs.z3, 0, -40] : v3(v3([xs.comma, -1.6, 0], [0.2, -0.2, 0], pullback), [xs.z3, 0, 0], glide);
  const pal = P.terra;
  const m = (seed: number) => ({ palette: pal, seed, space: 0 as const, angleDeg: 45, spec: 0.3 });
  const top = 1.3 + 0.1; // top of the 2.6-high glyphs, standing on y = 0 baseline shifted: glyphs centred at y 0
  return (
    <>
      <CamN pos={pos} target={target} fov={fly > 0 ? lerp(36, 52, fly) : 36} near={0.05} />
      <directionalLight position={[-6, 9, 8]} intensity={2.2} color="#fff1e4" />
      <directionalLight position={[8, 3, -6]} intensity={0.7} color="#ffd1b8" />
      <ambientLight intensity={0.45} />
      <EMesh g={geo.ground} m={{ ...m(40), lift: 0.12 }} pos={[0, -1.4, -2]} rot={[-Math.PI / 2, 0, 0]} />
      <EMesh g={geo.g2} m={m(41)} pos={[xs.two, 0, 0]} />
      <EMesh g={geo.comma} m={m(42)} pos={[xs.comma, -0.9, 0]} />
      <EMesh g={geo.g0} m={m(43)} pos={[xs.z1, 0, 0]} />
      <EMesh g={geo.g0} m={m(44)} pos={[xs.z2, 0, 0]} />
      <EMesh g={geo.g0} m={m(45)} pos={[xs.z3, 0, 0]} />
      <EMesh g={geo.plus} m={m(46)} pos={[xs.plus, 0.1, 0]} />
      {/* the shelves: scanned products standing on the numerals */}
      <Gltf url={M.camera} size={1.1} m={{ ...m(47), mapAmt: 0.8 }} pos={[xs.two + 0.1, top, 0.5]} rot={[0, 0.5, 0]} />
      <Gltf url={M.watch} size={0.9} m={{ ...m(48), mapAmt: 0.8 }} pos={[xs.z1, top, 0.5]} rot={[0.1, -0.3, 0]} />
      <Gltf url={M.vase} size={1.2} m={{ ...m(49), mapAmt: 0.8 }} pos={[xs.z2, top, 0.5]} rot={[0, 0.4, 0]} />
      <Gltf url={M.suitcase} size={1.3} m={{ ...m(50), mapAmt: 0.85 }} pos={[xs.plus, top - 0.1, 0.4]} rot={[0, -0.4, 0]} pick={(_, i) => i < 4} />
    </>
  );
};
const Easing = (t: number) => easeIn(t);

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
  const turn = ramp(f, T.turn, T.turn + 50, inOut);
  const toLock = ramp(f, T.lock, T.lock + 26, inOut);
  const yaw = THREE.MathUtils.degToRad(lerp(0, -26, turn) + lerp(0, 14, toLock) + 1.5 * Math.sin(f / 30));
  const pitch = THREE.MathUtils.degToRad(lerp(0, -8, turn) + 3 * toLock);
  const s = lerp(0.95, 0.6, toLock);
  return (
    <>
      <CamN pos={[0, -1.4, 10.5]} target={[0, 0, 0]} fov={34} />
      <Env />
      <ambientLight intensity={0.45} />
      <directionalLight position={[-7 + 10 * ramp(f, T.turn, T.turn + 60), 5, 7]} intensity={2.2} color="#fff6ea" />
      <directionalLight position={[8, 2, -6]} intensity={2.0} color="#874bf9" />
      <group position={[0, lerp(0, 2.0, toLock), 0]} rotation={[pitch, yaw, 0]} scale={s}>
        <mesh geometry={geo.body} material={mats.edge} />
        <mesh geometry={geo.faceG} material={mats.metal} position={[0, 0, 0.0425]} />
        <mesh geometry={geo.faceG} material={mats.back} position={[0, 0, -0.0425]} rotation={[0, Math.PI, 0]} />
      </group>
    </>
  );
};

// ---- the film -------------------------------------------------------------------------------------------------------
export const BNumerals: React.FC = () => {
  const f = useCurrentFrame();
  const inCard = f < T.city || (f >= T.back && f < T.real + 16);
  const inCity = f >= T.city && f < T.sky;
  const inSky = f >= T.sky && f < T.back;
  const realIn = ramp(f, T.real, T.real + 16);
  const porthole = inCity ? interpolate(f, [T.city, T.city + 6, T.converge + 10, T.sky], [0.42, 0.42, 0.42, 1.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: inOut }) : 0;
  const lightsOut = ramp(f, T.lock - 6, T.lock + 12);
  const endFade = ramp(f, 704, 719, (t) => t);
  const A = "#e9e7ee";
  return (
    <AbsoluteFill style={{ background: f >= T.city && f < T.sky ? "#141a3a" : f >= T.sky && f < T.back ? "#f0d2c0" : "#0c0c10" }}>
      {inCard && (
        <AbsoluteFill style={{ opacity: f >= T.real ? 1 - realIn : 1 }}>
          <World><CardWorld f={f} /></World>
        </AbsoluteFill>
      )}
      {inCity && (
        <>
          <World><CityWorld f={f} /></World>
          {/* the plane window: the % circle we lifted into */}
          <LensVignette r50={porthole} cx={0.5} cy={0.5} dark="8,8,12" feather={1.2} />
          <AbsoluteFill style={{ background: `radial-gradient(circle ${porthole * 1080 * 0.97}px at 50% 50%, rgba(0,0,0,0) 97%, rgba(120,128,150,0.5) 98.5%, rgba(0,0,0,0) 100%)` }} />
        </>
      )}
      {inSky && <World><SkyWorld f={f} /></World>}
      {f >= T.real && (
        <AbsoluteFill style={{ opacity: realIn * (1 - lightsOut * 0.0) }}>
          <AbsoluteFill style={{ background: "linear-gradient(180deg, #121216 0%, #1a1a20 100%)" }} />
          <World aa><RealCard f={f} /></World>
        </AbsoluteFill>
      )}
      <Paper opacity={0.5 * (inSky ? 1 : 0.6)} />
      {/* copy: one line per beat, on screen for the whole beat */}
      <Head f={f} from={10} to={T.dive + 16} big={["the CRED IndusInd Bank", "RuPay credit card"]} x={110} y={110} ink={A} sheen="#ffffff" size={72} />
      <Head f={f} from={T.glow + 4} to={T.lift + 12} big={["5% rewards"]} small="on online shopping" x={110} y={110} ink="#f3dca4" sheen="#ffffff" size={112} />
      <Head f={f} from={T.city + 14} to={T.converge + 12} big={["redeem on", "flights and hotels"]} x={110} y={110} ink="#f1ecff" sheen="#ffffff" size={84} />
      <Head f={f} from={T.sky + 18} to={T.arch - 4} big={["and 2,000+ products"]} small="on CRED store" x={110} y={110} ink="#6e2a22" sheen="#e8957a" size={96} />
      <Head f={f} from={T.arch + 14} to={T.back - 8} big={["zero joining fee"]} x={110} y={110} ink="#6e2a22" sheen="#e8957a" size={104} />
      {f >= T.lock - 6 && <AbsoluteFill style={{ background: "#000", opacity: lightsOut * 0.4 }} />}
      {f >= T.lock + 14 && <Logo f={f} at={T.lock + 14} y={700} h={96} />}
      <AbsoluteFill style={{ background: "#000", opacity: endFade }} />
      <Audio src={staticFile("custom/cred-ten/b.wav")} />
    </AbsoluteFill>
  );
};
