/**
 * Ten-film set, I: "Constellations" (30 s, 720 frames, 24 fps). UNOFFICIAL SPEC WORK.
 * Storyboard: docs/storyboards/cred-10.md (I). Method: skills/art-director/SKILL.md. Facts and sources: night/kit.tsx.
 *
 * The idea (simple fusion, a far blend kept clean: rewards are star maps): the card lies on a telescope's map table.
 * Through the eyepiece, a night sky engraved on navy paper. Purchases light stars; every twentieth star is gold, the 5%.
 * The gold stars join into a plane that flies (flights), a hotel draws itself (hotels), the sky fills with small
 * product constellations (2,000+), and a ring of stars, a 0, frames the moon (zero joining fee). The telescope pulls
 * back to the table: the card's own rosette is the same ring; the card turns metal. Fluent device: a line joining
 * stars. Material truth: the card's guilloche as a star map.
 *
 * Music: calm bed at 80 BPM in C# (tools/music_bed.py), celesta-like bells for stars, a slow heartbeat.
 */
import React, { useMemo } from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EMesh, World } from "../v2/three.tsx";
import { P, expoOut, inOut, lerp, ramp, rnd } from "../v2/look.ts";
import { cardBody, roundRect } from "../v2/models.ts";
import { merge } from "../v2/models2.ts";
import { Head } from "../CredCardV3.tsx";
import { face } from "../v3/card.ts";
import { Logo, Paper } from "../night/kit.tsx";

export const I_FRAMES = 720;
type V3 = [number, number, number];
const T = { eye: 30, sky: 84, stars: 96, plane: 192, fly: 250, hotel: 300, store: 384, ring: 468, back: 552, real: 600, turn: 612, lock: 672 };
const NAVY: typeof P.indigo = [["#070b18", 0], ["#1a2140", 0.45], ["#5861a0", 0.83], ["#dfe3f5", 1]];
const NIGHT: typeof P.indigo = [["#05080f", 0], ["#0c1226", 0.45], ["#1a2446", 0.83], ["#2b3a6a", 1]]; // the dome: never brighter than deep navy
const GOLD: typeof P.indigo = [["#4b3a1d", 0], ["#a9863a", 0.45], ["#f0d68a", 0.83], ["#fff6d8", 1]];
const R = 58; // the sky dome

/** A point on the dome at azimuth/elevation (deg), offset dx, dy (dome units) in the tangent plane. */
const sky = (az: number, el: number, dx = 0, dy = 0) => {
  const a = THREE.MathUtils.degToRad(az), e = THREE.MathUtils.degToRad(el);
  const c = new THREE.Vector3(Math.cos(e) * Math.sin(a), Math.sin(e), -Math.cos(e) * Math.cos(a)).multiplyScalar(R);
  const right = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
  const up = new THREE.Vector3().crossVectors(c.clone().normalize(), right).negate();
  return c.addScaledVector(right, dx).addScaledVector(up, dy);
};
/** Star geometry (small spheres) at the given points. */
const starsAt = (pts: THREE.Vector3[], r = 0.3) => merge(pts.map((p) => new THREE.SphereGeometry(r, 8, 6).translate(p.x, p.y, p.z)));
/** Constellation lines: thin cylinders joining consecutive points (as one geometry; revealed by draw range). */
const linesThrough = (pts: THREE.Vector3[], r = 0.2) => {
  const segs: THREE.BufferGeometry[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1];
    const d = b.clone().sub(a);
    const g = new THREE.CylinderGeometry(r, r, d.length(), 6, 1).translate(0, d.length() / 2, 0);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    g.applyQuaternion(q);
    g.translate(a.x, a.y, a.z);
    segs.push(g);
  }
  return merge(segs);
};
const shape = (az: number, el: number, pts: [number, number][], scale = 1) => pts.map(([x, y]) => sky(az, el, x * scale, y * scale));

// constellation outlines (tangent-plane coordinates, dome units)
const PLANE: [number, number][] = [[-9, 0], [-4, 1.2], [3, 1.4], [8, 0.4], [9.5, -0.3], [3, -0.6], [-3, -0.9], [-9, 0], [-7, 2.8], [-4, 1.2], [1, 1.5], [0, 6.5], [-2.5, 6.8], [-4, 1.2], [-1, -0.8], [-2, -6], [1, -6.2], [3, -0.6]];
const HOTEL: [number, number][] = [[-6, -5], [-6, 7], [-3, 9], [6, 9], [6, -5], [-6, -5], [-2, -5], [-2, -1], [2, -1], [2, -5]];
const RING_N = 14;
const PRODUCTS: { az: number; el: number; pts: [number, number][]; s: number }[] = [
  { az: 150, el: 28, pts: [[-3, -3], [3, -3], [3, 3], [-3, 3], [-3, -3], [-1, 3], [-1, 5], [1, 5], [1, 3]], s: 0.6 }, // a bag
  { az: 165, el: 14, pts: [[-3, 0], [-1.5, 2.6], [1.5, 2.6], [3, 0], [1.5, -2.6], [-1.5, -2.6], [-3, 0], [0, 0], [0, 2]], s: 0.6 }, // a watch
  { az: 182, el: 30, pts: [[-4, -2], [4, -2], [4, 2], [-4, 2], [-4, -2], [-1, 2], [-1, 3.5], [1, 3.5], [1, 2], [0, 0], [1.5, 0], [0, 1.5], [-1.5, 0], [0, -1.5], [1.5, 0]], s: 0.6 }, // a camera
  { az: 196, el: 12, pts: [[-2, -4], [2, -4], [2.6, 0], [1.6, 4], [-1.6, 4], [-2.6, 0], [-2, -4]], s: 0.6 }, // a vase
  { az: 212, el: 26, pts: [[-3, -3], [3, -3], [3, 3], [-3, 3], [-3, -3], [0, -3], [0, 3]], s: 0.6 }, // a box
  { az: 138, el: 8, pts: [[-3, -2], [3, -2], [3, 2], [-3, 2], [-3, -2], [-3, 0], [3, 0]], s: 0.5 }, // a card
];

const CamN: React.FC<{ pos: V3; target: V3; fov?: number; up?: V3 }> = ({ pos, target, fov = 40, up = [0, 1, 0] }) => {
  const { camera } = useThree();
  const c = camera as THREE.PerspectiveCamera;
  c.fov = fov;
  c.near = 0.05;
  c.far = 200;
  c.position.set(...pos);
  c.up.set(...up);
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

const Sky: React.FC<{ f: number }> = ({ f }) => {
  const geo = useMemo(() => {
    const dome = new THREE.SphereGeometry(R, 48, 32);
    // random stars: 20 per gold star
    const pts: THREE.Vector3[] = [];
    const gold: THREE.Vector3[] = [];
    for (let i = 0; i < 420; i++) {
      const az = rnd(i, 1) * 360, el = -5 + 80 * Math.pow(rnd(i, 2), 0.8);
      const p = sky(az, el);
      if (i % 20 === 19) gold.push(p);
      else pts.push(p);
    }
    const starGroups = Array.from({ length: 6 }, (_, k) => starsAt(pts.filter((_, i) => i % 6 === k)));
    const goldStars = starsAt(gold, 0.5);
    const planePts = shape(60, 32, PLANE, 0.9);
    const hotelPts = shape(105, 24, HOTEL, 0.8);
    const ringPts = Array.from({ length: RING_N + 1 }, (_, i) => sky(250, 36, 9 * Math.cos((i / RING_N) * Math.PI * 2), 9 * Math.sin((i / RING_N) * Math.PI * 2)));
    const plane = { stars: starsAt(planePts, 0.6), lines: linesThrough(planePts) };
    const hotel = { stars: starsAt(hotelPts, 0.6), lines: linesThrough(hotelPts) };
    const ring = { stars: starsAt(ringPts.slice(0, RING_N), 0.6), lines: linesThrough(ringPts) };
    const products = PRODUCTS.map((p) => {
      const pts = shape(p.az, p.el, p.pts, p.s);
      return { stars: starsAt(pts, 0.42), lines: linesThrough(pts, 0.14) };
    });
    const moon = new THREE.SphereGeometry(5.2, 32, 24);
    const moonP = sky(250, 36);
    const craters = merge([[-1.2, 1.0, 0.9], [1.5, -0.4, 0.6], [0.3, -1.8, 0.5], [-1.8, -1.2, 0.4], [1.0, 1.9, 0.45]].map(([x, y, r]) => new THREE.TorusGeometry(r, 0.08, 6, 24).translate(x, y, 4.1)));
    // the telescope tube and the table
    const tube = new THREE.CylinderGeometry(0.9, 1.1, 9, 32, 1, true);
    const table = new THREE.PlaneGeometry(30, 30);
    return { dome, starGroups, goldStars, plane, hotel, ring, products, moon, moonP, craters, tube, table };
  }, []);
  const cardTex = useMemo(() => {
    const t = face("print").tex.clone();
    t.colorSpace = THREE.NoColorSpace;
    t.needsUpdate = true;
    return t;
  }, []);
  const cardG = useMemo(() => {
    const g = new THREE.ShapeGeometry(roundRect(8.56, 5.398, 0.32), 10);
    const uv = g.getAttribute("uv") as THREE.BufferAttribute;
    const p = g.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) uv.setXY(i, p.getX(i) / 8.56 + 0.5, p.getY(i) / 5.398 + 0.5);
    return { face: g, body: cardBody() };
  }, []);

  // ---- camera: table -> into the eyepiece -> sky pans -> back out ----
  const dirOf = (az: number, el: number) => sky(az, el).normalize();
  const into = ramp(f, T.eye, T.sky, inOut);
  const back = ramp(f, T.back, T.real + 6, inOut);
  const look = (() => {
    const beats: [number, number, number][] = [[T.sky, 40, 30], [T.plane - 20, 60, 32], [T.fly, 85, 34], [T.hotel - 16, 105, 24], [T.store - 16, 175, 20], [T.ring - 16, 250, 36]];
    let az = 40, el = 30;
    for (let i = 1; i < beats.length; i++) {
      const t = ramp(f, beats[i][0], beats[i][0] + 40, inOut);
      az = lerp(az, beats[i][1], t);
      el = lerp(el, beats[i][2], t);
    }
    return dirOf(az + 0.6 * Math.sin(f / 60), el + 0.4 * Math.sin(f / 47));
  })();
  const tablePos = new THREE.Vector3(2.5, 4.0, 7.5);
  const tableTarget = new THREE.Vector3(1.0, 0.3, 0);
  const eyePos = new THREE.Vector3(0, 1.2, 0);
  const skyTarget = look.clone().multiplyScalar(R * 0.9);
  const pos = tablePos.clone().lerp(eyePos, into).lerp(tablePos, back);
  const target = tableTarget.clone().lerp(skyTarget, into).lerp(tableTarget, back);
  const fov = lerp(36, 46, into) * (1 - 0.25 * back);
  const skyOn = f >= T.eye && f < T.real; // the dome exists only through the eyepiece
  const tubeOn = (ramp(f, T.eye + 10, T.sky - 8, inOut) * (1 - ramp(f, T.sky - 8, T.sky + 4, inOut))) + ramp(f, T.back + 6, T.back + 18, inOut) * (1 - ramp(f, T.real - 16, T.real - 4, inOut));

  // ---- the beats ----
  const litGroup = (k: number) => ramp(f, T.stars + k * 10, T.stars + 26 + k * 10, expoOut);
  const goldOn = ramp(f, T.stars + 50, T.stars + 80, expoOut);
  const draw = (a: number, b: number) => ramp(f, a, b, inOut);
  const planeDraw = draw(T.plane, T.plane + 44);
  const hotelDraw = draw(T.hotel, T.hotel + 44);
  const ringDraw = draw(T.ring, T.ring + 50);
  const storeDraw = (i: number) => draw(T.store + i * 9, T.store + 30 + i * 9);
  const fly = ramp(f, T.fly, T.hotel + 10, inOut);
  const setRange = (g: THREE.BufferGeometry, t: number) => {
    const n = g.index ? g.index.count : g.getAttribute("position").count;
    g.setDrawRange(0, Math.floor(n * t));
  };
  setRange(geo.plane.lines, planeDraw);
  setRange(geo.hotel.lines, hotelDraw);
  setRange(geo.ring.lines, ringDraw);
  geo.products.forEach((p, i) => setRange(p.lines, storeDraw(i)));
  const flyQ = useMemo(() => new THREE.Quaternion(), []);
  flyQ.setFromAxisAngle(new THREE.Vector3(0, 1, 0), THREE.MathUtils.degToRad(-30 * fly));
  const S = { ambient: 0.9, lift: 0.9 };
  const G = { ambient: 1.0, lift: 1.0, foilPhase: f * 0.02 };
  return (
    <>
      <CamN pos={pos.toArray() as V3} target={target.toArray() as V3} fov={fov} />
      <Env />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-6, 9, 6]} intensity={1.8} color="#fff6ea" />
      <directionalLight position={[8, 3, -6]} intensity={1.2} color="#874bf9" />
      {/* the map table and the card */}
      <EMesh g={geo.table} m={m(NAVY, 1, { albedoNoise: 0.25 })} rot={[-Math.PI / 2, 0, 0]} pos={[0, -0.02, 0]} live={{ ambient: 0.12, lift: 0.04 }} />
      <group position={[1.6, 0.0, 1.2]} rotation={[-Math.PI / 2, 0, -0.25]}>
        <EMesh g={cardG.body} m={m(P.green, 2, { albedoNoise: 0.05 })} live={{ ambient: 0.16, lift: 0.08 }} />
        <EMesh g={cardG.face} m={m(P.green, 3, { map: cardTex, mapAmt: 1 })} pos={[0, 0, 0.045]} live={{ ambient: 0.2, lift: 0.35 }} />
      </group>
      {/* the telescope: a tube standing on the table, seen from inside while we look up */}
      {tubeOn > 0 && <EMesh g={geo.tube} m={m(P.brass, 4, { spec: 0.7, foil: 0.2 })} pos={[0, 1.2, 0]} rot={[0.0, 0, 0]} double live={{ ambient: 0.1, lift: 0.02, opacity: 0.999 * tubeOn }} />}
      {/* the sky */}
      {skyOn && (
        <>
          <EMesh g={geo.dome} m={m(NIGHT, 5, { albedoNoise: 0.3, noiseScale: 14, spec: 0 })} double live={{ ambient: 0.08, lift: 0.0, keyAmt: 0.2 }} />
          {geo.starGroups.map((g, k) => <EMesh key={k} g={g} m={m(P.grey, 10 + k)} live={{ ...S, opacity: 0.999 * litGroup(k) }} />)}
          <EMesh g={geo.goldStars} m={m(GOLD, 20, { foil: 0.5, spec: 0.8 })} live={{ ...G, opacity: 0.999 * goldOn }} />
          {/* the plane constellation draws, then flies */}
          <group quaternion={flyQ}>
            <EMesh g={geo.plane.stars} m={m(GOLD, 21, { foil: 0.5 })} live={{ ...G, opacity: 0.999 * ramp(f, T.plane - 10, T.plane + 10) }} />
            <EMesh g={geo.plane.lines} m={m(GOLD, 22, { foil: 0.3 })} live={G} />
          </group>
          <EMesh g={geo.hotel.stars} m={m(GOLD, 23, { foil: 0.5 })} live={{ ...G, opacity: 0.999 * ramp(f, T.hotel - 10, T.hotel + 10) }} />
          <EMesh g={geo.hotel.lines} m={m(GOLD, 24, { foil: 0.3 })} live={G} />
          {geo.products.map((p, i) => (
            <group key={i}>
              <EMesh g={p.stars} m={m(GOLD, 30 + i, { foil: 0.5 })} live={{ ...G, opacity: 0.999 * ramp(f, T.store + i * 9 - 8, T.store + i * 9 + 8) }} />
              <EMesh g={p.lines} m={m(GOLD, 40 + i, { foil: 0.3 })} live={G} />
            </group>
          ))}
          {/* the moon, framed by the ring of stars */}
          <group position={geo.moonP.toArray() as V3}>
            <EMesh g={geo.moon} m={m(P.grey, 50, { albedoNoise: 0.3 })} live={{ ambient: 0.6, lift: 0.5 }} />
            <group quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), geo.moonP.clone().normalize().negate())}>
              <EMesh g={geo.craters} m={m(P.grey, 51)} live={{ ambient: 0.4, lift: 0.1 }} />
            </group>
          </group>
          <EMesh g={geo.ring.stars} m={m(GOLD, 52, { foil: 0.5 })} live={{ ...G, opacity: 0.999 * ramp(f, T.ring - 10, T.ring + 10) }} />
          <EMesh g={geo.ring.lines} m={m(GOLD, 53, { foil: 0.3 })} live={G} />
        </>
      )}
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
  const pitch = THREE.MathUtils.degToRad(lerp(-50, 0, arrive) + lerp(0, -8, turn) + 3 * toLock);
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

export const IStars: React.FC = () => {
  const f = useCurrentFrame();
  const realIn = ramp(f, T.real, T.real + 12);
  const lightsOut = ramp(f, T.lock - 6, T.lock + 12);
  const endFade = ramp(f, 704, 719, (t) => t);
  return (
    <AbsoluteFill style={{ background: "#0b1020" }}>
      {f < T.real + 12 && (
        <AbsoluteFill style={{ opacity: 1 - realIn }}>
          <World aa><Sky f={f} /></World>
        </AbsoluteFill>
      )}
      {f >= T.real && (
        <AbsoluteFill style={{ opacity: realIn }}>
          <AbsoluteFill style={{ background: "linear-gradient(180deg, #121216 0%, #1a1a20 100%)" }} />
          <World aa><RealCard f={f} /></World>
        </AbsoluteFill>
      )}
      <Paper opacity={0.5} />
      <Head f={f} from={10} to={T.sky + 10} big={["the CRED IndusInd Bank", "RuPay credit card"]} x={110} y={110} ink="#e9e7ee" sheen="#ffffff" size={72} />
      <Head f={f} from={T.stars + 40} to={T.plane + 6} big={["5% rewards"]} small="on online shopping" x={110} y={110} ink="#f3e2b0" sheen="#ffffff" size={112} />
      <Head f={f} from={T.plane + 30} to={T.hotel + 6} big={["redeem on flights"]} x={110} y={110} ink="#e9e7ee" sheen="#ffffff" size={96} />
      <Head f={f} from={T.hotel + 30} to={T.store + 6} big={["and hotels"]} x={110} y={110} ink="#e9e7ee" sheen="#ffffff" size={96} />
      <Head f={f} from={T.store + 30} to={T.ring + 6} big={["and 2,000+ products"]} small="on CRED store" x={110} y={110} ink="#e9e7ee" sheen="#ffffff" size={92} />
      <Head f={f} from={T.ring + 30} to={T.turn + 36} big={["zero joining fee"]} x={110} y={110} ink="#f1efe6" sheen="#ffffff" size={104} />
      {f >= T.lock - 6 && <AbsoluteFill style={{ background: "#000", opacity: lightsOut * 0.4 }} />}
      {f >= T.lock + 14 && <Logo f={f} at={T.lock + 14} y={700} h={96} />}
      <AbsoluteFill style={{ background: "#000", opacity: endFade }} />
      <Audio src={staticFile("custom/cred-ten/i.wav")} />
    </AbsoluteFill>
  );
};
