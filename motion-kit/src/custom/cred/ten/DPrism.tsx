/**
 * Ten-film set, D: "Prism" (30 s, 720 frames, 24 fps). UNOFFICIAL SPEC WORK.
 * Storyboard: docs/storyboards/cred-10.md (D). Method: skills/art-director/SKILL.md. Facts and sources: night/kit.tsx.
 *
 * The idea (fusion: the card's foil strip is a prism): a beam of light in a dark room hits the card's foil strip and
 * splits into four coloured roads of light. Each road ends in a small engraved island lit in that colour: a pink
 * shopping street (5%), a blue sky with a plane (flights), an amber hotel (hotels), a green shelf of scanned products
 * (2,000+). Seen from the islands, every road leads back to the card; the colours recombine into white and the white
 * light forms a ring the card passes through (zero joining fee). The card turns; the strip glints. Fluent device: the
 * coloured road. Material truth: the card's own foil stripe.
 *
 * Music: calm bed at 118 BPM in F# (tools/music_bed.py), one bell note per colour, the chord completes at green.
 */
import React, { useMemo } from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EMesh, Gltf, M, World } from "../v2/three.tsx";
import { P, expoOut, inOut, lerp, ramp } from "../v2/look.ts";
import { airplane, cardBody, hotelBell, roundRect } from "../v2/models.ts";
import { merge, shoppingBag } from "../v2/models2.ts";
import { cloudBank } from "../v2/subjects.ts";
import { Head } from "../CredCardV3.tsx";
import { face } from "../v3/card.ts";
import { Logo, Paper } from "../night/kit.tsx";

export const D_FRAMES = 720;
type V3 = [number, number, number];
const T = { beam: 20, split: 66, pink: 84, blue: 180, amber: 270, green: 342, converge: 432, ring: 468, real: 468, turn: 548, lock: 672 };

// the foil stripe on the metal face: art (1712 x 1080) centre 1130, 540 at -62 deg -> card space
const STRIP: V3 = [(1130 / 1712 - 0.5) * 8.56, 0, 0.05];
const CARD_TILT = { pitch: -0.42, yaw: 0.55 }; // the card lies tilted in the room
const cardQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(CARD_TILT.pitch, CARD_TILT.yaw, 0, "YXZ"));
const S = new THREE.Vector3(...STRIP).applyQuaternion(cardQ); // strip point in world space
const BEAM_SRC = new THREE.Vector3(-10, 7, 6);

// four roads of light leaving the strip; each ends in an island
const BANDS = [
  { col: "#ff6fa8", pal: P.rose, a: -0.55 },
  { col: "#6f8cff", pal: P.indigo, a: -0.18 },
  { col: "#ffb257", pal: P.ochre, a: 0.18 },
  { col: "#7fe3a0", pal: P.green, a: 0.55 },
];
const ROAD = 27.4; // the road runs onto the island's top
const dirOf = (a: number) => new THREE.Vector3(Math.sin(a) * 0.9 + 0.25, 0.1, Math.cos(a)).normalize();
const basisOf = (f: THREE.Vector3) => {
  const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), f).normalize();
  const up = new THREE.Vector3().crossVectors(f, right).normalize();
  return { right, up };
};
const ISLAND = BANDS.map((b) => {
  const f = dirOf(b.a);
  return { f, ...basisOf(f), o: S.clone().addScaledVector(f, ROAD + 4.1) };
});

const CamN: React.FC<{ pos: THREE.Vector3; target: THREE.Vector3; fov?: number; near?: number }> = ({ pos, target, fov = 40, near = 0.05 }) => {
  const { camera } = useThree();
  const c = camera as THREE.PerspectiveCamera;
  c.fov = fov;
  c.near = near;
  c.far = 300;
  c.position.copy(pos);
  c.up.set(0, 1, 0);
  c.lookAt(target);
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

/** A soft road of light: a ribbon along `from -> to`, additive, fading at both ends. */
const ribbonAlpha = (() => {
  let tex: THREE.CanvasTexture | null = null;
  return () => {
    if (tex) return tex;
    const c = document.createElement("canvas");
    c.width = 64;
    c.height = 512;
    const x = c.getContext("2d")!;
    const g = x.createLinearGradient(0, 0, 0, 512);
    g.addColorStop(0, "#000");
    g.addColorStop(0.08, "#fff");
    g.addColorStop(0.85, "#fff");
    g.addColorStop(1, "#000");
    x.fillStyle = g;
    x.fillRect(0, 0, 64, 512);
    // soft edges across the width
    const e = x.createLinearGradient(0, 0, 64, 0);
    e.addColorStop(0, "rgba(0,0,0,1)");
    e.addColorStop(0.3, "rgba(0,0,0,0)");
    e.addColorStop(0.7, "rgba(0,0,0,0)");
    e.addColorStop(1, "rgba(0,0,0,1)");
    x.fillStyle = e;
    x.fillRect(0, 0, 64, 512);
    tex = new THREE.CanvasTexture(c);
    return tex;
  };
})();
const Ribbon: React.FC<{ from: THREE.Vector3; to: THREE.Vector3; color: string; width: number; opacity: number; tint?: number }> = ({ from, to, color, width, opacity, tint = 0 }) => {
  const geo = useMemo(() => {
    const f = to.clone().sub(from);
    const L = f.length();
    f.normalize();
    const { right, up } = basisOf(f);
    const g = new THREE.PlaneGeometry(width, L);
    const mtx = new THREE.Matrix4().makeBasis(right, f, up);
    g.applyMatrix4(mtx);
    g.translate(...from.clone().addScaledVector(f, L / 2).toArray());
    return g;
  }, [from.x, from.y, from.z, to.x, to.y, to.z, width]);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color, alphaMap: ribbonAlpha(), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }), []);
  mat.opacity = opacity;
  mat.color.set(color).lerp(new THREE.Color("#ffffff"), tint);
  return <mesh geometry={geo} material={mat} />;
};
const Glow: React.FC<{ at: THREE.Vector3; r: number; color: string; opacity: number }> = ({ at, r, color, opacity }) => {
  const { camera } = useThree();
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const x = c.getContext("2d")!;
    const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "#fff");
    g.addColorStop(0.25, "#fff");
    g.addColorStop(1, "#000");
    x.fillStyle = g;
    x.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);
  const geo = useMemo(() => new THREE.PlaneGeometry(1, 1), []);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color, alphaMap: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }), []);
  mat.opacity = opacity;
  mat.color.set(color);
  return <mesh geometry={geo} material={mat} position={at.toArray() as V3} quaternion={camera.quaternion} scale={[r, r, 1]} />;
};

const m = (palette: typeof P.rose, seed: number, extra: Record<string, unknown> = {}) => ({ palette, seed, space: 0 as const, angleDeg: 45, spec: 0.35, albedoNoise: 0.15, ...extra });

/** One island: a disc of engraved paper with its scene, standing at the end of its road. */
const Island: React.FC<{ k: number; lit: number; vis: number; f: number }> = ({ k, lit, vis, f }) => {
  const I = ISLAND[k];
  const B = BANDS[k];
  const geo = useMemo(() => {
    const disc = new THREE.CylinderGeometry(5.2, 5.5, 0.28, 64).translate(0, -0.14, 0);
    const street = merge([
      ...Array.from({ length: 6 }, (_, i) => new THREE.BoxGeometry(1.2, 0.9 + 0.3 * (i % 3), 1.0).translate(-2.8 + i * 1.12, 0.45 + 0.15 * (i % 3), -1.6)),
      ...Array.from({ length: 6 }, (_, i) => new THREE.BoxGeometry(1.3, 0.3, 0.05).translate(-2.8 + i * 1.12, 0.62, -1.08)), // awnings
      ...Array.from({ length: 5 }, (_, i) => new THREE.BoxGeometry(1.2, 0.9 + 0.3 * ((i + 1) % 3), 1.0).translate(-2.2 + i * 1.12, 0.45 + 0.15 * ((i + 1) % 3), 1.6)),
      new THREE.BoxGeometry(7, 0.04, 1.4).translate(0, 0.02, 0), // the street
    ]);
    const bag = shoppingBag();
    bag.scale(0.32, 0.32, 0.32);
    const windows = merge(Array.from({ length: 6 }, (_, i) => new THREE.BoxGeometry(0.7, 0.4, 0.04).translate(-2.8 + i * 1.12, 0.35, -1.09)));
    const clouds = cloudBank(8, 4);
    const plane = airplane();
    const hotel = merge([
      new THREE.BoxGeometry(3.2, 4.2, 2.4).translate(0, 2.1, -0.6),
      new THREE.BoxGeometry(3.6, 0.3, 2.8).translate(0, 4.35, -0.6),
      new THREE.BoxGeometry(2.2, 0.08, 1.6).translate(0, 0.04, 1.4), // forecourt
      new THREE.BoxGeometry(1.0, 1.4, 0.1).translate(0, 0.7, 0.62), // door
      new THREE.BoxGeometry(1.6, 0.12, 1.2).translate(0, 1.6, 1.0), // canopy
      ...[0, 1].map((i) => new THREE.CylinderGeometry(0.05, 0.05, 1.6, 8).translate(-0.6 + i * 1.2, 0.8, 1.5)),
    ]);
    const hotelWin = merge(Array.from({ length: 20 }, (_, i) => new THREE.BoxGeometry(0.42, 0.5, 0.04).translate(-1.05 + (i % 4) * 0.7, 1.1 + Math.floor(i / 4) * 0.62, 0.62)));
    const bell = hotelBell();
    bell.scale(0.35, 0.35, 0.35);
    const shelf = merge([
      ...[0, 1, 2].map((i) => new THREE.BoxGeometry(5.4, 0.08, 1.2).translate(0, 0.9 + i * 1.1, -0.8)),
      new THREE.BoxGeometry(0.08, 3.4, 1.2).translate(-2.7, 1.7, -0.8),
      new THREE.BoxGeometry(0.08, 3.4, 1.2).translate(2.7, 1.7, -0.8),
      new THREE.BoxGeometry(5.5, 3.5, 0.06).translate(0, 1.75, -1.42),
    ]);
    return { disc, street, bag, windows, clouds, plane, hotel, hotelWin, bell, shelf };
  }, []);
  const q = useMemo(() => {
    const mtx = new THREE.Matrix4().makeBasis(I.right.clone().negate(), I.up, I.f.clone().negate());
    return new THREE.Quaternion().setFromRotationMatrix(mtx);
  }, [k]);
  if (vis <= 0) return null;
  const L = { ambient: 0.12 + 0.1 * lit, lift: 0.04 + 0.18 * lit, opacity: vis, key: [-0.4, 0.8, 0.5] as V3 };
  const LW = { ...L, lift: 0.1 + 0.5 * lit, ambient: 0.25 };
  const planeT = ramp(f, T.blue + 20, T.amber, inOut);
  return (
    <group position={I.o.toArray() as V3} quaternion={q} scale={1.3}>
      <EMesh g={geo.disc} m={m(B.pal, 100 + k, { albedoNoise: 0.2, opacity: 0.999 })} live={L} />
      {k === 0 && (
        <>
          <EMesh g={geo.street} m={m(B.pal, 110, { opacity: 0.999 })} live={L} />
          <EMesh g={geo.windows} m={m(B.pal, 111, { spec: 0.6, opacity: 0.999 })} live={LW} />
          <EMesh g={geo.bag} m={m(B.pal, 112, { opacity: 0.999 })} pos={[0.6, 0, 0.2]} rot={[0, 0.5, 0]} live={L} />
        </>
      )}
      {k === 1 && (
        <>
          <EMesh g={geo.clouds} m={m(B.pal, 120, { albedoNoise: 0.1, opacity: 0.999 })} pos={[0, 1.2, 0]} scale={0.55} live={L} />
          <EMesh g={geo.plane} m={m(B.pal, 121, { spec: 0.6, opacity: 0.999 })} pos={[lerp(-3.5, 3.5, planeT), lerp(1.6, 3.6, planeT), 0.4]} rot={[0, 0, 0.25]} scale={0.22} live={{ ...L, lift: 0.15 + 0.3 * lit }} />
        </>
      )}
      {k === 2 && (
        <>
          <EMesh g={geo.hotel} m={m(B.pal, 130, { opacity: 0.999 })} live={L} />
          <EMesh g={geo.hotelWin} m={m(B.pal, 131, { spec: 0.6, opacity: 0.999 })} live={LW} />
          <EMesh g={geo.bell} m={m(B.pal, 132, { spec: 0.7, opacity: 0.999 })} pos={[1.6, 0, 1.6]} live={{ ...L, lift: 0.15 + 0.3 * lit }} />
        </>
      )}
      {k === 3 && (
        <>
          <EMesh g={geo.shelf} m={m(B.pal, 140, { opacity: 0.999 })} live={L} />
          <Gltf url={M.camera} size={0.8} m={m(B.pal, 141, { mapAmt: 0.8, opacity: 0.999 })} pos={[-1.8, 0.94, -0.8]} rot={[0, 0.4, 0]} live={LW} />
          <Gltf url={M.watch} size={0.75} m={m(B.pal, 142, { mapAmt: 0.8, opacity: 0.999 })} pos={[0.3, 0.94, -0.8]} rot={[0, -0.3, 0]} live={LW} />
          <Gltf url={M.vase} size={0.9} m={m(B.pal, 143, { mapAmt: 0.8, opacity: 0.999 })} pos={[1.9, 2.04, -0.8]} live={LW} />
          <Gltf url={M.box} size={0.8} m={m(B.pal, 144, { mapAmt: 0.8, opacity: 0.999 })} pos={[-1.2, 2.04, -0.8]} rot={[0, 0.7, 0]} live={LW} />
          <Gltf url={M.suitcase} size={1.0} m={m(B.pal, 145, { mapAmt: 0.8, opacity: 0.999 })} pos={[1.6, 3.14, -0.8]} rot={[0, -0.5, 0]} pick={(_, i) => i < 4} live={LW} />
        </>
      )}
    </group>
  );
};

// ---- the card as a physical object (shared by the room and the ending) ----------------------------------------------
const useCardParts = () => {
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
  return { geo, mats };
};
const CardMesh: React.FC<{ geo: ReturnType<typeof useCardParts>["geo"]; mats: ReturnType<typeof useCardParts>["mats"] }> = ({ geo, mats }) => (
  <>
    <mesh geometry={geo.body} material={mats.edge} />
    <mesh geometry={geo.faceG} material={mats.metal} position={[0, 0, 0.0425]} />
    <mesh geometry={geo.faceG} material={mats.back} position={[0, 0, -0.0425]} rotation={[0, Math.PI, 0]} />
  </>
);

/** The dark room: the tilted card, the beam, the split, the four roads and their islands. One camera. */
const Room: React.FC<{ f: number }> = ({ f }) => {
  const { geo, mats } = useCardParts();
  const beamIn = ramp(f, T.beam, T.beam + 30, expoOut);
  const split = ramp(f, T.split, T.split + 16, expoOut);
  const white = ramp(f, T.converge + 6, T.ring - 4, inOut); // colours recombine
  // camera
  const introPos = new THREE.Vector3(-4.5, 3.2, 11.5).lerp(new THREE.Vector3(-1.5, 2.0, 7.5), ramp(f, 0, T.split, inOut));
  const introTarget = new THREE.Vector3(0.6, 0.2, 0).lerp(S.clone().add(new THREE.Vector3(0.4, 0.2, 0)), ramp(f, T.beam, T.split, inOut));
  // per band: ride from a point along the road to the island's edge; between bands a lateral hop
  const rideFor = (k: number, a: number, b: number) => {
    const I = ISLAND[k];
    const t = ramp(f, a, b, inOut);
    const startD = k === 0 ? 1.5 : 10;
    const pos = S.clone().addScaledVector(I.f, lerp(startD, ROAD - 7.9, t)).addScaledVector(I.up, lerp(1.2, 5.2, t));
    const target = S.clone().addScaledVector(I.f, lerp(startD + 6, ROAD + 4.1, t)).addScaledVector(I.up, lerp(0.4, 0.8, t));
    return { pos, target };
  };
  const beats = [[T.pink, T.blue], [T.blue, T.amber], [T.amber, T.green], [T.green, T.converge]];
  const HOP = 20;
  let pos = introPos, target = introTarget, fov = 38;
  if (f >= T.pink - 16) {
    let k = beats.findIndex(([a, b]) => f >= a && f < b);
    if (k < 0) k = 3;
    const [a, b] = beats[k];
    const ride = rideFor(k, a + (k === 0 ? 0 : HOP), b);
    if (k > 0 && f < a + HOP) {
      const prev = rideFor(k - 1, beats[k - 1][0] + (k - 1 === 0 ? 0 : HOP), beats[k - 1][1]);
      const next = rideFor(k, a + HOP, b);
      const t = ramp(f, a, a + HOP, inOut);
      const arc = Math.sin(Math.PI * t) * 3.0; // lift over the dark between islands
      pos = prev.pos.clone().lerp(next.pos, t).add(new THREE.Vector3(0, arc, 0));
      target = prev.target.clone().lerp(next.target, t);
    } else {
      pos = ride.pos;
      target = ride.target;
    }
    if (k === 0) {
      const t = ramp(f, T.pink - 16, T.pink + 14, inOut);
      pos = introPos.clone().lerp(pos, t);
      target = introTarget.clone().lerp(target, t);
    }
    fov = lerp(38, 40, ramp(f, T.pink - 16, T.pink + 14, inOut));
  }
  if (f >= T.converge) {
    // pull up and turn back: all roads lead to the card
    const t = ramp(f, T.converge, T.converge + 30, inOut);
    const last = rideFor(3, T.green + HOP, T.converge);
    pos = last.pos.clone().addScaledVector(ISLAND[3].up, 15 * t).addScaledVector(ISLAND[3].f, 7 * t);
    target = last.target.clone().lerp(S.clone(), ramp(t, 0.15, 1, inOut));
    fov = lerp(40, 46, t);
  }
  const litOf = (k: number) => ramp(f, beats[k][0] + 30, beats[k][0] + 60, expoOut);
  const visOf = (k: number) => ramp(f, beats[k][0] - 10, beats[k][0] + 20) * Math.max(1 - ramp(f, beats[k][1] + 14, beats[k][1] + 34), ramp(f, T.converge, T.converge + 24));
  return (
    <>
      <CamN pos={pos} target={target} fov={fov} />
      <Env />
      <ambientLight intensity={0.25} />
      <directionalLight position={[-6, 8, 6]} intensity={1.2 + 1.6 * beamIn} color="#fff6ea" />
      <directionalLight position={[8, 2, -6]} intensity={1.2} color="#874bf9" />
      <group quaternion={cardQ}>
        <CardMesh geo={geo} mats={mats} />
      </group>
      {/* the beam into the strip */}
      {beamIn > 0 && <Ribbon from={BEAM_SRC} to={S} color="#ffffff" width={0.7} opacity={0.55 * beamIn * (1 - 0.5 * white)} />}
      {beamIn > 0 && <Ribbon from={BEAM_SRC} to={S} color="#ffffff" width={0.22} opacity={0.9 * beamIn * (1 - 0.5 * white)} />}
      <Glow at={S} r={lerp(0.6, 2.8, split) * (1 + 0.15 * Math.sin(f * 0.6))} color="#ffffff" opacity={0.9 * beamIn} />
      {/* four roads of light, each drawn out from the strip on the split */}
      {BANDS.map((b, k) => {
        const I = ISLAND[k];
        const grow = ramp(f, T.split + k * 3, T.split + 26 + k * 3, expoOut);
        if (grow <= 0) return null;
        const end = S.clone().addScaledVector(I.f, ROAD * grow).addScaledVector(I.up, 0.05);
        return (
          <group key={k}>
            <Ribbon from={S} to={end} color={b.col} width={1.7} opacity={0.5} tint={white} />
            <Ribbon from={S} to={end} color={b.col} width={0.5} opacity={0.85} tint={white} />
          </group>
        );
      })}
      {BANDS.map((_, k) => <Island key={k} k={k} lit={litOf(k)} vis={visOf(k)} f={f} />)}
    </>
  );
};

/** The ending: the white light forms a ring the card passes through; the card turns; lockup. */
const Ending: React.FC<{ f: number }> = ({ f }) => {
  const { geo, mats } = useCardParts();
  const ringG = useMemo(() => new THREE.TorusGeometry(3.4, 0.08, 12, 128), []);
  const ringMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }), []);
  const grow = ramp(f, T.ring, T.ring + 22, expoOut);
  const pass = ramp(f, T.ring + 16, T.ring + 64, inOut); // the ring travels over the card = the card passes through
  const ringFade = 1 - ramp(f, T.ring + 56, T.ring + 80);
  ringMat.opacity = 0.9 * grow * ringFade;
  const turn = ramp(f, T.turn, T.turn + 50, inOut);
  const toLock = ramp(f, T.lock, T.lock + 26, inOut);
  const yaw = THREE.MathUtils.degToRad(lerp(0, -24, turn) + lerp(0, 12, toLock) + 1.5 * Math.sin(f / 30));
  const pitch = THREE.MathUtils.degToRad(lerp(0, -8, turn) + 3 * toLock);
  const ringZ = lerp(-3.5, 7.5, pass);
  return (
    <>
      <CamN pos={new THREE.Vector3(0, -1.4, 10.5)} target={new THREE.Vector3(0, 0, 0)} fov={34} />
      <Env />
      <ambientLight intensity={0.45} />
      <directionalLight position={[-7 + 10 * ramp(f, T.ring, T.ring + 80), 5, 7]} intensity={2.2} color="#fff6ea" />
      <directionalLight position={[8, 2, -6]} intensity={2.0} color="#874bf9" />
      <pointLight position={[0, 3.2, ringZ]} intensity={12 * grow * ringFade} distance={12} color="#ffffff" />
      <group position={[0, lerp(0, 2.0, toLock), 0]} rotation={[pitch, yaw, 0]} scale={lerp(0.95, 0.6, toLock) * lerp(0.86, 1, ramp(f, T.ring, T.ring + 40, expoOut))}>
        <CardMesh geo={geo} mats={mats} />
      </group>
      <mesh geometry={ringG} material={ringMat} position={[0, 0, ringZ]} scale={lerp(0.2, 1, grow)} />
    </>
  );
};

export const DPrism: React.FC = () => {
  const f = useCurrentFrame();
  const cut = f >= T.ring;
  const flash = ramp(f, T.ring - 6, T.ring, (t) => t) * (1 - ramp(f, T.ring, T.ring + 10, expoOut));
  const lightsOut = ramp(f, T.lock - 6, T.lock + 12);
  const endFade = ramp(f, 704, 719, (t) => t);
  const bandInk = ["#ffd2e3", "#d3dbff", "#ffe2bd", "#d1f5dc"];
  return (
    <AbsoluteFill style={{ background: "#0c1220" }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 42% 48%, #1a2238 0%, #0c1220 60%, #070b14 100%)" }} />
      {!cut && <World><Room f={f} /></World>}
      {cut && <World aa><Ending f={f} /></World>}
      <Paper opacity={0.5} />
      <Head f={f} from={10} to={T.pink - 6} big={["the CRED IndusInd Bank", "RuPay credit card"]} x={110} y={110} ink="#e9e7ee" sheen="#ffffff" size={72} />
      <Head f={f} from={T.pink + 30} to={T.blue + 6} big={["5% rewards"]} small="on online shopping" x={110} y={110} ink={bandInk[0]} sheen="#ffffff" size={112} />
      <Head f={f} from={T.blue + 30} to={T.amber + 6} big={["redeem on flights"]} x={110} y={110} ink={bandInk[1]} sheen="#ffffff" size={96} />
      <Head f={f} from={T.amber + 30} to={T.green + 6} big={["and hotels"]} x={110} y={110} ink={bandInk[2]} sheen="#ffffff" size={96} />
      <Head f={f} from={T.green + 30} to={T.converge + 20} big={["and 2,000+ products"]} small="on CRED store" x={110} y={110} ink={bandInk[3]} sheen="#ffffff" size={92} />
      <Head f={f} from={T.ring + 20} to={T.turn + 40} big={["zero joining fee"]} x={110} y={110} ink="#f1efe6" sheen="#ffffff" size={104} />
      {flash > 0 && <AbsoluteFill style={{ background: "#fff", opacity: flash * 0.85 }} />}
      {f >= T.lock - 6 && <AbsoluteFill style={{ background: "#000", opacity: lightsOut * 0.4 }} />}
      {f >= T.lock + 14 && <Logo f={f} at={T.lock + 14} y={700} h={96} />}
      <AbsoluteFill style={{ background: "#000", opacity: endFade }} />
      <Audio src={staticFile("custom/cred-ten/d.wav")} />
    </AbsoluteFill>
  );
};
