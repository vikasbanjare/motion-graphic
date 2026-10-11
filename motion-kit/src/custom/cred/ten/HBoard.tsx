/**
 * Ten-film set, H: "Departures Board" (30 s, 720 frames, 24 fps). UNOFFICIAL SPEC WORK.
 * Storyboard: docs/storyboards/cred-10.md (H). Method: skills/art-director/SKILL.md. Facts and sources: night/kit.tsx.
 *
 * The idea (replacement: the card's benefits are departures): an engraved station hall with a split-flap board. The
 * flaps clatter and settle to the card's name; then row by row they flip to the benefits (5% rewards on online
 * shopping; flights and hotels, redeem; 2,000+ products on CRED store) while a plane crosses the high windows; the fee
 * column counts down to 0 (zero joining fee). Finally every flap flips once more and the board becomes the card's own
 * face; the card turns. Fluent device: the flap. Material truth: the board as the card's print.
 *
 * Music: tech bed at 128 BPM in F (tools/music_bed.py) with split-flap clatter as percussion.
 */
import React, { useMemo } from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EMesh, World } from "../v2/three.tsx";
import { P, expoOut, inOut, lerp, ramp, rnd } from "../v2/look.ts";
import { airplane, cardBody, roundRect } from "../v2/models.ts";
import { merge } from "../v2/models2.ts";
import { Head } from "../CredCardV3.tsx";
import { face } from "../v3/card.ts";
import { Logo, Paper } from "../night/kit.tsx";

export const H_FRAMES = 720;
type V3 = [number, number, number];
const T = { settle: 24, name: 72, row5: 90, rowF: 186, rowH: 276, rowS: 354, fee: 444, cascade: 540, push: 560, real: 612, turn: 620, lock: 672 };

// the board: 40 columns x 7 rows; each row's final text (uppercase, as a board shows it; facts only)
const COLS = 40, ROWS = 7;
const CW = 0.5, CH = 0.68, GAP = 0.03;
const pad = (s: string) => (s + " ".repeat(COLS)).slice(0, COLS);
const ROW_TEXT = [
  pad("THE CRED INDUSIND BANK RUPAY CREDIT CARD"),
  pad(""),
  pad("5% REWARDS          ONLINE SHOPPING"),
  pad("FLIGHTS             REDEEM"),
  pad("HOTELS              REDEEM"),
  pad("2,000+ PRODUCTS     ON CRED STORE"),
  pad("JOINING FEE                            0"),
];
const ROW_AT = [T.settle, -1, T.row5, T.rowF, T.rowH, T.rowS, T.fee]; // when each row starts flipping (-1: stays blank)
const CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%+,.";
const ATLAS_COLS = 8, ATLAS_ROWS = Math.ceil(CHARS.length / ATLAS_COLS);

/** The character atlas: cream type on dark flaps, with a faint line screen so it sits with the engraving. */
const atlasTexture = () => {
  const cw = 96, ch = 128;
  const c = document.createElement("canvas");
  c.width = cw * ATLAS_COLS;
  c.height = ch * ATLAS_ROWS;
  const x = c.getContext("2d")!;
  x.fillStyle = "#1b1d22";
  x.fillRect(0, 0, c.width, c.height);
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.fillStyle = "#efe9d8";
  x.font = "600 92px 'Lexend', 'DejaVu Sans', sans-serif";
  for (let i = 0; i < CHARS.length; i++) {
    const cx = (i % ATLAS_COLS) * cw + cw / 2, cy = Math.floor(i / ATLAS_COLS) * ch + ch / 2;
    x.fillText(CHARS[i], cx, cy + 4);
  }
  // the split line across every flap, and a faint screen
  x.fillStyle = "rgba(0,0,0,0.75)";
  for (let r = 0; r < ATLAS_ROWS; r++) x.fillRect(0, r * ch + ch / 2 - 2, c.width, 4);
  x.strokeStyle = "rgba(255,255,255,0.05)";
  x.lineWidth = 1;
  for (let d = -c.height; d < c.width; d += 5) {
    x.beginPath();
    x.moveTo(d, 0);
    x.lineTo(d + c.height, c.height);
    x.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  t.anisotropy = 8;
  return t;
};

/** Per-character flap geometry (shared), and per-cell card-tile geometry (the board as the card's face). */
const useFlapGeos = () => useMemo(() => {
  const byChar = new Map<string, THREE.PlaneGeometry>();
  for (let i = 0; i < CHARS.length; i++) {
    const g = new THREE.PlaneGeometry(CW - GAP, CH - GAP);
    const uv = g.getAttribute("uv") as THREE.BufferAttribute;
    const u0 = (i % ATLAS_COLS) / ATLAS_COLS, v1 = 1 - Math.floor(i / ATLAS_COLS) / ATLAS_ROWS;
    for (let k = 0; k < uv.count; k++) uv.setXY(k, u0 + uv.getX(k) / ATLAS_COLS, v1 - (1 - uv.getY(k)) / ATLAS_ROWS);
    byChar.set(CHARS[i], g);
  }
  const tiles: THREE.PlaneGeometry[][] = [];
  for (let r = 0; r < ROWS; r++) {
    tiles.push([]);
    for (let col = 0; col < COLS; col++) {
      const g = new THREE.PlaneGeometry(CW - GAP, CH - GAP);
      const uv = g.getAttribute("uv") as THREE.BufferAttribute;
      for (let k = 0; k < uv.count; k++) uv.setXY(k, (col + uv.getX(k)) / COLS, 1 - (r + 1 - uv.getY(k)) / ROWS);
      tiles[r].push(g);
    }
  }
  return { byChar, tiles };
}, []);

/** A cell's state at frame f: the character shown, the next one, and the flip fraction. */
const cellState = (r: number, col: number, f: number) => {
  const start = ROW_AT[r];
  const target = ROW_TEXT[r][col];
  const blank = " ";
  if (start < 0 || f < start + col * 1.2) return { a: blank, b: blank, t: 0 };
  // flip through a run of characters to the target; the fee cell counts down 9..0
  const isFee = r === 6 && col === COLS - 1;
  const run = isFee ? "9876543210" : (() => {
    const n = 6 + Math.floor(rnd(r * 100 + col, 1) * 6);
    let s = "";
    for (let i = 0; i < n; i++) s += CHARS[Math.floor(rnd(r * 1000 + col * 10 + i, 2) * CHARS.length)];
    return s + target;
  })();
  const per = isFee ? 9 : 3.2; // frames per flip
  const p = (f - (start + col * 1.2)) / per;
  const k = Math.floor(p);
  if (k >= run.length - 1) return { a: target, b: target, t: 0 };
  return { a: run[k], b: run[k + 1], t: p - k };
};

const CamN: React.FC<{ pos: V3; target: V3; fov?: number }> = ({ pos, target, fov = 40 }) => {
  const { camera } = useThree();
  const c = camera as THREE.PerspectiveCamera;
  c.fov = fov;
  c.near = 0.05;
  c.far = 300;
  c.position.set(...pos);
  c.up.set(0, 1, 0);
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

const Board: React.FC<{ f: number }> = ({ f }) => {
  const { byChar, tiles } = useFlapGeos();
  const atlas = useMemo(atlasTexture, []);
  const flapMat = useMemo(() => new THREE.MeshStandardMaterial({ map: atlas, roughness: 0.55, metalness: 0.1 }), [atlas]);
  const cardMat = useMemo(() => new THREE.MeshStandardMaterial({ map: face("metal").tex, roughness: 0.4, metalness: 0.45 }), []);
  const cascade = (r: number, col: number) => ramp(f, T.cascade + col * 0.9 + r * 4, T.cascade + 10 + col * 0.9 + r * 4, inOut);
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let col = 0; col < COLS; col++) {
      const { a, b, t } = cellState(r, col, f);
      const c = cascade(r, col);
      const x = (col - (COLS - 1) / 2) * CW, y = ((ROWS - 1) / 2 - r) * CH;
      const rot = c > 0 ? Math.PI * c : Math.PI * t;
      const front = c > 0 ? byChar.get(a)! : byChar.get(a)!;
      const back = c > 0 ? tiles[r][col] : byChar.get(b)!;
      cells.push(
        <group key={`${r}-${col}`} position={[x, y, 0]} rotation={[-rot, 0, 0]}>
          <mesh geometry={front} material={flapMat} />
          <mesh geometry={back} material={c > 0 ? cardMat : flapMat} rotation={[Math.PI, 0, 0]} />
        </group>,
      );
    }
  }
  return <group position={[0, 5.0, 0]}>{cells}</group>;
};

const Hall: React.FC<{ f: number }> = ({ f }) => {
  const geo = useMemo(() => {
    const floor = new THREE.PlaneGeometry(60, 60).rotateX(-Math.PI / 2);
    const backWall = new THREE.BoxGeometry(60, 18, 0.5).translate(0, 9, -1.2);
    const frame = merge([
      new THREE.BoxGeometry(COLS * CW + 0.8, 0.3, 0.5).translate(0, 5.0 + (ROWS * CH) / 2 + 0.15, -0.1),
      new THREE.BoxGeometry(COLS * CW + 0.8, 0.3, 0.5).translate(0, 5.0 - (ROWS * CH) / 2 - 0.15, -0.1),
      new THREE.BoxGeometry(0.3, ROWS * CH + 0.9, 0.5).translate(-(COLS * CW) / 2 - 0.25, 5.0, -0.1),
      new THREE.BoxGeometry(0.3, ROWS * CH + 0.9, 0.5).translate((COLS * CW) / 2 + 0.25, 5.0, -0.1),
      new THREE.BoxGeometry(COLS * CW + 0.8, ROWS * CH + 0.9, 0.2).translate(0, 5.0, -0.2), // backing plate
    ]);
    const pillars = merge(Array.from({ length: 6 }, (_, i) => new THREE.CylinderGeometry(0.5, 0.55, 14, 24).translate(-15 + (i % 3) * 15, 7, i < 3 ? 6 : 14)));
    const windows = merge(Array.from({ length: 5 }, (_, i) => new THREE.BoxGeometry(2.6, 5.5, 0.6).translate(-12 + i * 6, 12.8, -1.2)));
    const mullions = merge(Array.from({ length: 5 }, (_, i) => merge([
      new THREE.BoxGeometry(0.08, 5.5, 0.7).translate(-12 + i * 6, 12.8, -1.2),
      new THREE.BoxGeometry(2.6, 0.08, 0.7).translate(-12 + i * 6, 12.8, -1.2),
      new THREE.BoxGeometry(2.6, 0.08, 0.7).translate(-12 + i * 6, 14.3, -1.2),
      new THREE.BoxGeometry(2.6, 0.08, 0.7).translate(-12 + i * 6, 11.3, -1.2),
    ])));
    const benches = merge(Array.from({ length: 4 }, (_, i) => merge([
      new THREE.BoxGeometry(3.2, 0.12, 0.9).translate(-9 + i * 6, 0.55, 9),
      new THREE.BoxGeometry(3.2, 0.9, 0.12).translate(-9 + i * 6, 1.0, 8.55),
      new THREE.BoxGeometry(0.12, 0.55, 0.9).translate(-10.5 + i * 6, 0.28, 9),
      new THREE.BoxGeometry(0.12, 0.55, 0.9).translate(-7.5 + i * 6, 0.28, 9),
    ])));
    const clock = merge([new THREE.CylinderGeometry(1.1, 1.1, 0.2, 48).rotateX(Math.PI / 2).translate(0, 11.2, -0.8), new THREE.BoxGeometry(0.08, 0.8, 0.05).translate(0, 11.55, -0.65), new THREE.BoxGeometry(0.6, 0.08, 0.05).translate(0.3, 11.2, -0.65)]);
    const plane = airplane();
    return { floor, backWall, frame, pillars, windows, mullions, benches, clock, plane };
  }, []);
  // camera: a wide hall, then a push to the board, tracking down the rows, then into the board
  const rowY = (r: number) => 5.0 + ((ROWS - 1) / 2 - r) * CH;
  const legs: [number, V3, V3, number][] = [
    [0, [6, 4.5, 30], [0, 6, 0], 42],
    [T.name - 20, [1.5, 6.0, 17], [0, 5.6, 0], 36],
    [T.row5 + 8, [-4.0, rowY(2) + 0.4, 9.0], [-3.5, rowY(2), 0], 34],
    [T.rowF + 8, [-3.0, rowY(3) + 1.6, 10.5], [-4.0, rowY(3) + 0.6, 0], 36],
    [T.rowH + 8, [-4.5, rowY(4) + 0.3, 8.5], [-4.5, rowY(4), 0], 34],
    [T.rowS + 8, [-2.5, rowY(5) + 0.3, 9.5], [-3.0, rowY(5), 0], 36],
    [T.fee + 8, [6.0, rowY(6) + 0.6, 7.5], [7.5, rowY(6), 0], 32],
    [T.cascade - 10, [0, 5.0, 19], [0, 5.0, 0], 38],
    [T.push, [0, 5.0, 11.5], [0, 5.0, 0], 30],
  ];
  let pos = new THREE.Vector3(...legs[0][1]), target = new THREE.Vector3(...legs[0][2]), fov = legs[0][3];
  for (let i = 1; i < legs.length; i++) {
    const t = ramp(f, legs[i][0], legs[i][0] + 48, inOut);
    pos.lerp(new THREE.Vector3(...legs[i][1]), t);
    target.lerp(new THREE.Vector3(...legs[i][2]), t);
    fov = lerp(fov, legs[i][3], t);
  }
  pos = pos.add(new THREE.Vector3(0.05 * Math.sin(f / 23), 0.03 * Math.sin(f / 17), 0));
  const planeT = ramp(f, T.rowF + 20, T.rowH, (x) => x);
  const L = { ambient: 0.16, lift: 0.08, key: [-0.4, 0.7, 0.6] as V3 };
  return (
    <>
      <CamN pos={pos.toArray() as V3} target={target.toArray() as V3} fov={fov} />
      <Env />
      <ambientLight intensity={0.55} />
      <directionalLight position={[-8, 14, 12]} intensity={1.6} color="#fff6ea" />
      <directionalLight position={[10, 6, 8]} intensity={1.0} color="#cfd4ff" />
      <EMesh g={geo.floor} m={m(P.brass, 1, { albedoNoise: 0.25 })} live={{ ambient: 0.12, lift: 0.04, key: [-0.4, 0.7, 0.6] }} />
      <EMesh g={geo.backWall} m={m(P.brass, 2, { albedoNoise: 0.2 })} live={L} />
      <EMesh g={geo.windows} m={m(P.cyan, 3, { albedoNoise: 0.05 })} live={{ ambient: 0.5, lift: 0.55 }} />
      <EMesh g={geo.mullions} m={m(P.brass, 4)} live={{ ...L, dim: 0.3 }} />
      <EMesh g={geo.pillars} m={m(P.brass, 5)} live={L} />
      <EMesh g={geo.benches} m={m(P.brass, 6)} live={L} />
      <EMesh g={geo.clock} m={m(P.brass, 7, { spec: 0.6 })} live={{ ...L, lift: 0.18 }} />
      <EMesh g={geo.frame} m={m(P.graphite, 8, { spec: 0.5 })} live={{ ambient: 0.12, lift: 0.06 }} />
      {/* a plane crosses behind the high windows during the flights row */}
      {planeT > 0 && planeT < 1 && (
        <EMesh g={geo.plane} m={m(P.cyan, 9, { spec: 0.5 })} pos={[lerp(-16, 16, planeT), 12.6 + 1.2 * planeT, -3.5]} rot={[0, Math.PI / 2 + 0.1, 0.12]} scale={0.5} live={{ ambient: 0.35, lift: 0.2 }} />
      )}
      <Board f={f} />
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
  const arrive = ramp(f, T.real, T.real + 20, expoOut);
  const turn = ramp(f, T.turn, T.turn + 50, inOut);
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
      <group position={[0, lerp(0, 2.0, toLock), 0]} rotation={[pitch, yaw, 0]} scale={lerp(1.08, 0.95, arrive) * lerp(1, 0.63, toLock)}>
        <mesh geometry={geo.body} material={mats.edge} />
        <mesh geometry={geo.faceG} material={mats.metal} position={[0, 0, 0.0425]} />
        <mesh geometry={geo.faceG} material={mats.back} position={[0, 0, -0.0425]} rotation={[0, Math.PI, 0]} />
      </group>
    </>
  );
};

export const HBoard: React.FC = () => {
  const f = useCurrentFrame();
  const realIn = ramp(f, T.real, T.real + 8);
  const lightsOut = ramp(f, T.lock - 6, T.lock + 12);
  const endFade = ramp(f, 704, 719, (t) => t);
  return (
    <AbsoluteFill style={{ background: f >= T.real ? "#0c0c10" : "#efe5cf" }}>
      {f < T.real + 8 && (
        <AbsoluteFill style={{ opacity: 1 - realIn }}>
          <World aa><Hall f={f} /></World>
        </AbsoluteFill>
      )}
      {f >= T.real && (
        <AbsoluteFill style={{ opacity: realIn }}>
          <AbsoluteFill style={{ background: "linear-gradient(180deg, #121216 0%, #1a1a20 100%)" }} />
          <World aa><RealCard f={f} /></World>
        </AbsoluteFill>
      )}
      <Paper opacity={0.6} />
      <Head f={f} from={T.name} to={T.row5 + 30} big={["the CRED IndusInd Bank", "RuPay credit card"]} x={110} y={820} ink="#3b2a12" sheen="#d6b25a" size={64} />
      <Head f={f} from={T.row5 + 50} to={T.rowF + 20} big={["5% rewards"]} small="on online shopping" x={110} y={760} ink="#3b2a12" sheen="#d6b25a" size={96} />
      <Head f={f} from={T.rowF + 40} to={T.rowH + 20} big={["redeem on flights"]} x={110} y={790} ink="#3b2a12" sheen="#d6b25a" size={88} />
      <Head f={f} from={T.rowH + 40} to={T.rowS + 20} big={["and hotels"]} x={110} y={790} ink="#3b2a12" sheen="#d6b25a" size={88} />
      <Head f={f} from={T.rowS + 40} to={T.fee + 20} big={["and 2,000+ products"]} small="on CRED store" x={110} y={760} ink="#3b2a12" sheen="#d6b25a" size={84} />
      <Head f={f} from={T.fee + 60} to={T.turn + 36} big={["zero joining fee"]} x={110} y={f >= T.real ? 110 : 790} ink={f >= T.real ? "#f1efe6" : "#3b2a12"} sheen={f >= T.real ? "#ffffff" : "#d6b25a"} size={96} />
      {f >= T.lock - 6 && <AbsoluteFill style={{ background: "#000", opacity: lightsOut * 0.4 }} />}
      {f >= T.lock + 14 && <Logo f={f} at={T.lock + 14} y={700} h={96} />}
      <AbsoluteFill style={{ background: "#000", opacity: endFade }} />
      <Audio src={staticFile("custom/cred-ten/h.wav")} />
    </AbsoluteFill>
  );
};
