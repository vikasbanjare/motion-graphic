/**
 * CRED IndusInd Bank RuPay credit card: v3, a 30 s film (720 frames, 24 fps, 1920x1080, 125 BPM grid).
 * UNOFFICIAL SPEC WORK. Not made, approved or commissioned by CRED or IndusInd Bank.
 *
 * Storyboard: docs/storyboards/cred-card-v3.md. The card leads every beat, one idea per beat, the headline is on screen
 * for the whole beat, and engraved reward coins are the only thing that travels between beats:
 *   1 intro: a pen draws the card, it fills with the engraving          "introducing"
 *   2 the card's name                                                    "the CRED IndusInd Bank / RuPay credit card"
 *   3 the card taps a shopping bag, coins rise                           "5% rewards / on online shopping"
 *   4 the coins become a flight path, a plane flies it to a suitcase     "redeem on / flights and hotels"
 *   5 the coins land on a shelf, each product lights up                  "and 2,000+ products / on CRED store"
 *   6 one lens move onto the card's fee tag "₹0"                         "zero joining fee"
 *   7 flat print -> real 3D card (same art, see v3/card.ts)
 *   8 lockup: CRED's own logo file (unmodified) + the card's name
 * Look and tools from v2 (engraving shader, CC0 scanned models, lens, sheen; see CredCardV2.tsx for sources and fonts).
 * On-screen claims only: 5% rewards on online shopping, zero joining fee, redeem on flights, hotels and 2,000+ products
 * on CRED store (IndusInd Bank press release, Storyboard18, inc42). "introducing" and the "₹0" tag frame those facts.
 */
import { loadFont } from "@remotion/fonts";
import React, { useEffect, useMemo, useState } from "react";
import { AbsoluteFill, Audio, Img, continueRender, delayRender, interpolate, staticFile, useCurrentFrame } from "remotion";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { Cam, EMesh, Gltf, M, World } from "./v2/three.tsx";
import { airplane, cardBody, coin, roundRect } from "./v2/models.ts";
import { shoppingBag } from "./v2/models2.ts";
import { LensVignette, Paper, Sheen } from "./v2/fx.tsx";
import { C, P, SANS, SERIF, clamp01, easeIn, expoOut, inOut, lerp, ramp } from "./v2/look.ts";
import { FACE_H, FACE_W, face } from "./v3/card.ts";

export const CRED_V3_FRAMES = 720;

/** Beat starts (frames; two bars = 92.16 frames each). */
const B = { intro: 0, name: 92, shop: 185, travel: 276, store: 369, fee: 461, hero: 553, lock: 645, end: 720 } as const;

const useFonts = () => {
  const [h] = useState(() => delayRender("cred v3 fonts"));
  useEffect(() => {
    Promise.all([
      loadFont({ family: "Newsreader", url: staticFile("fonts/Newsreader-opsz.woff2"), weight: "200 800" }),
      loadFont({ family: "Lexend", url: staticFile("fonts/Lexend-500.woff2"), weight: "500" }),
    ])
      .then(() => continueRender(h))
      .catch(() => continueRender(h));
  }, [h]);
};

// ---- headlines ------------------------------------------------------------------------------------------------------
const Head: React.FC<{
  f: number; from: number; to: number; big: string[]; small?: string; x: number; y: number; ink: string; sheen: string;
  size?: number; center?: boolean;
}> = ({ f, from, to, big, small, x, y, ink, sheen, size = 96, center }) => {
  if (f < from - 1 || f > to + 1) return null;
  const out = ramp(f, to - 10, to, easeIn);
  const boxW = 1500;
  const left = center ? x - boxW / 2 : x;
  return (
    <div style={{ position: "absolute", left, top: y, width: boxW, opacity: 1 - out, transform: `translateY(${-18 * out}px)` }}>
      {big.map((line, i) => {
        const p = ramp(f, from + i * 3, from + i * 3 + 18, expoOut);
        return (
          <div key={i} style={{ opacity: p, transform: `translateY(${(1 - p) * 34}px)`, marginBottom: -size * 0.18, display: "flex", justifyContent: center ? "center" : "flex-start" }}>
            <Sheen t={(f - from) / 24} ink={ink} sheen={sheen} boxW={center ? Math.round(line.length * size * 0.5) : boxW} fontSize={size} fontFamily={SERIF} letterSpacing="-0.03em" opsz>
              {line}
            </Sheen>
          </div>
        );
      })}
      {small && (
        <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 38, color: ink, opacity: 0.82 * ramp(f, from + 8, from + 26, expoOut), marginTop: size * 0.32, letterSpacing: "-0.01em", textAlign: center ? "center" : "left" }}>
          {small}
        </div>
      )}
    </div>
  );
};

// ---- the flat card (2D) ---------------------------------------------------------------------------------------------
type Pose = { cx: number; cy: number; w: number; rx: number; ry: number; rz: number; o: number };
const CW = 900; // card width on screen in the hero moments

const pose2D = (f: number): Pose => {
  const drift = Math.sin(f / 40) * 1.2;
  if (f < B.name) return { cx: 960, cy: 560, w: CW, rx: 0, ry: 0, rz: 0, o: 1 };
  if (f < B.shop - 3) {
    const e = ramp(f, B.name, B.name + 34, inOut);
    return { cx: lerp(960, 1430, e), cy: lerp(560, 540, e), w: lerp(CW, 700, e), rx: 7 * e, ry: -16 * e + drift, rz: 0, o: 1 };
  }
  if (f < 240) {
    // over to the bag, tap at 205-212, lift away and fade
    const a = ramp(f, B.shop - 3, 203, inOut);
    const tap = ramp(f, 203, 209, easeIn) * (1 - ramp(f, 210, 222, expoOut));
    const lift = ramp(f, 214, 238, easeIn);
    return {
      cx: lerp(1430, 1250, a) + 260 * lift,
      cy: lerp(540, 300, a) + 70 * tap - 260 * lift,
      w: lerp(700, 420, a),
      rx: lerp(7, 38, a),
      ry: lerp(-16, -8, a),
      rz: lerp(0, -16, a) - 10 * lift,
      o: 1 - ramp(f, 222, 238),
    };
  }
  if (f >= B.fee && f < B.hero + 40) {
    const e = ramp(f, B.fee, B.fee + 24, expoOut);
    return { cx: lerp(-520, 960, e), cy: 520, w: CW, rx: 0, ry: 0, rz: lerp(8, 0, e), o: 1 - ramp(f, B.hero + 30, B.hero + 34, (t) => t) };
  }
  return { cx: 0, cy: 0, w: 0, rx: 0, ry: 0, rz: 0, o: 0 };
};

const Card2D: React.FC<{ p: Pose; children?: React.ReactNode }> = ({ p, children }) => {
  const h = (p.w * FACE_H) / FACE_W;
  if (p.o <= 0) return null;
  return (
    <div style={{ position: "absolute", left: p.cx - p.w / 2, top: p.cy - h / 2, width: p.w, height: h, perspective: 1800, opacity: p.o }}>
      <div style={{ width: "100%", height: "100%", transform: `rotateX(${p.rx}deg) rotateY(${p.ry}deg) rotateZ(${p.rz}deg)`, transformStyle: "preserve-3d" }}>
        <Img src={face("print").url} style={{ width: "100%", height: "100%", borderRadius: p.w * 0.037, boxShadow: `0 ${p.w * 0.04}px ${p.w * 0.09}px rgba(30,40,25,0.22)` }} />
        {children}
      </div>
    </div>
  );
};

/** Beat 1: a pen draws the card outline, then the engraving fills it diagonally. */
const PenDraw: React.FC<{ f: number }> = ({ f }) => {
  const w = CW, h = (CW * FACE_H) / FACE_W, x0 = 960 - w / 2, y0 = 560 - h / 2;
  const per = 2 * (w + h);
  const d = ramp(f, 6, 46, inOut); // outline drawn
  const fill = ramp(f, 40, 78, inOut); // engraving sweeps in
  const len = d * per;
  // pen nib position along the (square-cornered) perimeter, clockwise from top-left
  const L = len;
  const nib = L < w ? [x0 + L, y0] : L < w + h ? [x0 + w, y0 + L - w] : L < 2 * w + h ? [x0 + w - (L - w - h), y0 + h] : [x0, y0 + h - (L - 2 * w - h)];
  const sweep = lerp(-0.2, 1.25, fill); // diagonal wipe position (fraction of w + h)
  const cut = sweep * (w + h);
  return (
    <>
      <div style={{ position: "absolute", left: x0, top: y0, width: w, height: h, clipPath: `polygon(0 0, ${Math.max(0, cut)}px 0, ${Math.max(0, cut - h)}px ${h}px, 0 ${h}px)` }}>
        <Img src={face("print").url} style={{ width: "100%", height: "100%", borderRadius: w * 0.037 }} />
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <rect x={x0} y={y0} width={w} height={h} rx={w * 0.037} fill="none" stroke="#2c5537" strokeWidth={3} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - d} opacity={1 - ramp(f, 80, 92)} />
        {d > 0 && d < 1 && <circle cx={nib[0]} cy={nib[1]} r={7} fill="#1d2b20" />}
      </svg>
    </>
  );
};

/** Beat 6: the fee tag, hanging from the card's top-right corner. Drawn engraved; it reads the fact. */
const FeeTag: React.FC<{ w: number }> = ({ w }) => {
  const k = w / CW;
  return (
    <svg width={330 * k} height={300 * k} viewBox="0 0 330 300" style={{ position: "absolute", left: w - 40 * k, top: -60 * k, overflow: "visible" }}>
      <defs>
        <pattern id="tagLines" width={9} height={9} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width={9} height={9} fill="#efe9d6" />
          <rect width={2.2} height={9} fill="#2c5537" opacity={0.35} />
        </pattern>
      </defs>
      <path d="M 10 60 Q 60 40 120 92" stroke="#2c5537" strokeWidth={3} fill="none" />
      <g transform="rotate(14 210 170)">
        <path d="M 110 110 L 160 70 L 320 70 Q 330 70 330 80 L 330 260 Q 330 270 320 270 L 160 270 L 110 230 Z" fill="url(#tagLines)" stroke="#2c5537" strokeWidth={3.5} />
        <circle cx={140} cy={170} r={10} fill="#e9eedb" stroke="#2c5537" strokeWidth={3} />
        <text x={248} y={205} textAnchor="middle" fontFamily={SERIF} fontWeight={600} fontSize={104} fill="#1f3d28" style={{ fontVariationSettings: "'opsz' 72" }}>
          ₹0
        </text>
      </g>
    </svg>
  );
};

// ---- the coin stage (beats 3-5: one 3D world, fixed camera; the worlds scroll, the coins lead) ---------------------
const U = 85.6; // px per world unit at z = 0 (camera z 20, fov 35)
const SD = 1080 / 85.6; // one frame height in world units: worlds scroll edge to edge, no seam
const sB3 = (f: number) => -SD * ramp(f, 262, 292); // bag world moves down (we follow the coins up)
const sB4 = (f: number) => SD * (1 - ramp(f, 262, 292)) + SD * ramp(f, 355, 385);
const sB5 = (f: number) => -SD * (1 - ramp(f, 355, 385));

const N = 7;
const quad = (a: number[], b: number[], c: number[], t: number) => a.map((_, k) => (1 - t) * (1 - t) * a[k] + 2 * (1 - t) * t * b[k] + t * t * c[k]);
const PATH = { a: [-6.4, -2.4], b: [-0.4, 5.6], c: [5.0, -0.9] };
const pathAt = (t: number) => quad(PATH.a, PATH.b, PATH.c, t);
const SHELF_Y = -3.0;
const LAND = [[-4.4, 0], [0, 1], [4.4, 2], [-2.2, 3], [2.2, 4], [-7.0, 5], [7.0, 6]].map(([x, k]) => ({ x, at: 390 + k * 6 }));

const coinAt = (i: number, f: number) => {
  const born = 212 + i * 2;
  if (f < born) return null;
  const mouth = [3.0, 1.0];
  const fan = [3.0 + (i - 3) * 1.1, 2.9 + 0.55 * Math.sin(i * 1.3)];
  const dot = pathAt((i + 0.5) / N);
  const e1 = ramp(f, born, born + 22, expoOut);
  let p = [lerp(mouth[0], fan[0], e1), lerp(mouth[1], fan[1], e1) + Math.sin(e1 * Math.PI) * 0.8];
  let s = 0.55 * ramp(f, born, born + 6, expoOut);
  p[1] += Math.sin((f - born) / 9 + i) * 0.06;
  const e2 = ramp(f, 266 + i, 300 + i, inOut);
  p = [lerp(p[0], dot[0], e2), lerp(p[1], dot[1], e2)];
  s = lerp(s, 0.36, e2);
  // the plane passes each dot: a small pulse
  const pass = 302 + ((i + 0.5) / N) * 48;
  s *= 1 + 0.35 * Math.exp(-(((f - pass) / 3) ** 2));
  // fall to the shelf
  const L = LAND[i];
  const fall = ramp(f, L.at - 22, L.at, easeIn);
  const bounce = f > L.at ? 0.18 * Math.abs(Math.sin(((f - L.at) / 8) * Math.PI)) * Math.exp(-(f - L.at) / 7) : 0;
  p = [lerp(p[0], L.x, fall), lerp(p[1], SHELF_Y + 0.42, fall) + bounce];
  s = lerp(s, 0.5, fall);
  const spin = (f - born) * 0.09 * (1 - fall) + (i % 2 ? 0.25 : -0.25) * fall;
  return { p, s, spin };
};

const Stage: React.FC<{ f: number }> = ({ f }) => {
  const g = useMemo(() => ({ coin: coin(120), bag: shoppingBag(), plane: airplane(), shelf: new THREE.BoxGeometry(17, 0.6, 2.8) }), []);
  const bagIn = ramp(f, B.shop, B.shop + 20, expoOut);
  const pt = ramp(f, 302, 352, inOut);
  const pp = pathAt(pt), pp2 = pathAt(Math.min(1, pt + 0.02));
  const heading = Math.atan2(pp2[1] - pp[1], pp2[0] - pp[0]);
  const lit = (k: number) => 0.5 * (1 - ramp(f, LAND[k].at, LAND[k].at + 6, expoOut));
  const fadeOut = 1 - ramp(f, B.fee - 4, B.fee + 16);
  return (
    <>
      <Cam pos={[0, 0, 20]} target={[0, 0, 0]} fov={35} />
      {f < 300 && (
        <group position={[3.0, lerp(-12, -3.6, bagIn) + sB3(f), 0]} rotation={[0.08, 0.5 + f * 0.002, 0]} scale={1.75}>
          <EMesh g={g.bag} m={{ palette: P.teal, seed: 21, angleDeg: 45 }} double />
        </group>
      )}
      {f >= 262 && f < 392 && (
        <>
          <group position={[pp[0], pp[1] + 0.25 + sB4(f) - (f < 300 ? 0 : 0), 0.8]} rotation={[0.25, 0, heading]} scale={0.3 * ramp(f, 296, 304, expoOut)}>
            <EMesh g={g.plane} m={{ palette: P.indigo, seed: 31, angleDeg: 45 }} />
          </group>
          <Gltf url={M.suitcase} size={3.0} m={{ palette: P.indigo, seed: 32, mapAmt: 0.85 }} pos={[6.0, -3.6 + sB4(f), -0.5]} rot={[0.15, -0.6, 0]} pick={(_, i) => i < 4} />
        </>
      )}
      {f >= 350 && (
        <group position={[0, sB5(f), 0]}>
          <EMesh g={g.shelf} m={{ palette: P.terra, seed: 41, angleDeg: 45 }} pos={[0, SHELF_Y - 0.3, 0]} live={{ opacity: fadeOut }} />
          <Gltf url={M.camera} size={3.6} m={{ palette: P.terra, seed: 42, mapAmt: 0.8 }} pos={[-4.4, SHELF_Y, -0.3]} rot={[0.1, 0.35, 0]} live={{ dim: lit(0), opacity: fadeOut }} />
          <Gltf url={M.watch} size={2.6} m={{ palette: P.terra, seed: 43, mapAmt: 0.8 }} pos={[0, SHELF_Y, -0.3]} rot={[0.2, -0.3, 0]} live={{ dim: lit(1), opacity: fadeOut }} />
          <Gltf url={M.vase} size={3.9} m={{ palette: P.terra, seed: 44, mapAmt: 0.8 }} pos={[4.4, SHELF_Y, -0.3]} rot={[0, 0.4, 0]} live={{ dim: lit(2), opacity: fadeOut }} />
        </group>
      )}
      {Array.from({ length: N }, (_, i) => {
        const c = coinAt(i, f);
        if (!c) return null;
        return (
          <group key={i} position={[c.p[0], c.p[1], 1.2]} rotation={[Math.PI / 2, c.spin, 0]} scale={c.s}>
            <EMesh g={g.coin} m={{ palette: P.brass, seed: 50 + i, foil: 0.35, spec: 0.5, angleDeg: 45 }} live={{ foilPhase: f * 0.012 + i, opacity: fadeOut }} />
          </group>
        );
      })}
    </>
  );
};

/** 2D backdrops of the stage worlds; they scroll with their 3D worlds. */
const StageBackdrop: React.FC<{ f: number }> = ({ f }) => {
  const wipe = ramp(f, B.shop - 6, B.shop + 12, inOut); // matte wipe in from the right, led by the card
  return (
    <>
      {f < 300 && (
        <AbsoluteFill style={{ background: "#d7e9df", clipPath: `inset(0 0 0 ${(1 - wipe) * 100}%)`, transform: `translateY(${-sB3(f) * U}px)` }}>
          <AbsoluteFill style={{ background: "radial-gradient(ellipse 30% 9% at 64% 86%, rgba(20,60,55,0.22), rgba(20,60,55,0) 100%)", opacity: ramp(f, B.shop + 6, B.shop + 20) }} />
        </AbsoluteFill>
      )}
      {f >= 262 && f < 392 && (
        <AbsoluteFill style={{ background: "#e5e2f1", transform: `translateY(${-sB4(f) * U}px)` }}>
          <svg width={1920} height={1080}>
            {Array.from({ length: 9 }, (_, k) => (
              <path key={k} d={`M -20 ${700 + k * 34} ${Array.from({ length: 41 }, (_, j) => `L ${j * 49} ${700 + k * 34 + 9 * Math.sin(j * 0.5 + k * 0.6 + f * 0.02)}`).join(" ")}`} fill="none" stroke="#5d64a3" strokeOpacity={0.22} strokeWidth={2} />
            ))}
          </svg>
        </AbsoluteFill>
      )}
      {f >= 350 && (
        <AbsoluteFill style={{ background: "linear-gradient(180deg, #f8e3d5 0%, #f1d1bf 100%)", transform: `translateY(${-sB5(f) * U}px)` }} />
      )}
    </>
  );
};

// ---- the real card (3D) ---------------------------------------------------------------------------------------------
const Env: React.FC = () => {
  const { gl, scene } = useThree();
  useMemo(() => {
    const pm = new THREE.PMREMGenerator(gl);
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 1.0;
  }, [gl, scene]);
  return null;
};

const Card3D: React.FC<{ f: number }> = ({ f }) => {
  const geo = useMemo(() => {
    const body = cardBody();
    const faceG = new THREE.ShapeGeometry(roundRect(8.56, 5.398, 0.32), 12);
    const uv = faceG.getAttribute("uv") as THREE.BufferAttribute;
    const pos = faceG.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / 8.56 + 0.5, pos.getY(i) / 5.398 + 0.5);
    return { body, face: faceG };
  }, []);
  const mats = useMemo(() => {
    const ptex = face("print").tex.clone();
    ptex.colorSpace = THREE.NoColorSpace;
    ptex.needsUpdate = true;
    const print = new THREE.MeshBasicMaterial({ map: ptex, transparent: true });
    const metal = new THREE.MeshPhysicalMaterial({ map: face("metal").tex, roughness: 0.34, metalness: 0.5, clearcoat: 1, clearcoatRoughness: 0.12 });
    const back = new THREE.MeshPhysicalMaterial({ color: "#26272c", roughness: 0.4, metalness: 0.6, clearcoat: 0.6 });
    const edge = new THREE.MeshPhysicalMaterial({ color: "#b9b9c4", roughness: 0.22, metalness: 1 });
    return { print, metal, back, edge };
  }, []);
  mats.print.opacity = 1 - ramp(f, 594, 620, inOut);
  const turn = ramp(f, 596, 640, inOut);
  const toLock = ramp(f, B.lock, B.lock + 30, inOut);
  const yaw = THREE.MathUtils.degToRad(lerp(0, -24, turn) + lerp(0, 16, toLock) + Math.sin(f / 30) * 1.5 * turn);
  const pitch = THREE.MathUtils.degToRad(lerp(0, -9, turn) + lerp(0, 4, toLock));
  const roll = THREE.MathUtils.degToRad(lerp(0, 3, turn) - lerp(0, 3, toLock));
  const s = lerp(0.952 * (1 + 0.04 * turn), 0.5, toLock);
  const y = lerp(0.18, 2.1, toLock);
  return (
    <group position={[lerp(0, 0.4, turn) * (1 - toLock), y, 0]} rotation={[pitch, yaw, roll]} scale={s}>
      <mesh geometry={geo.body} material={mats.edge} />
      <mesh geometry={geo.face} material={mats.metal} position={[0, 0, 0.0425]} />
      <mesh geometry={geo.face} material={mats.print} position={[0, 0, 0.0435]} />
      <mesh geometry={geo.face} material={mats.back} position={[0, 0, -0.0425]} rotation={[0, Math.PI, 0]} />
    </group>
  );
};

const LOGO = staticFile("custom/cred-v2/cred-logo.png"); // CRED's own file, 192 x 228, unmodified

// ---- the film -------------------------------------------------------------------------------------------------------
export const CredCardV3: React.FC = () => {
  useFonts();
  const f = useCurrentFrame();
  const p = pose2D(f);
  // beat 6/7: one lens move onto the fee tag and back
  const zoom = ramp(f, 492, 530, inOut) * (1 - ramp(f, B.hero, B.hero + 26, inOut));
  const tag = { x: 960 + CW / 2 + 120, y: 520 - (CW * FACE_H) / FACE_W / 2 + 70 };
  const zs = 1 + 1.25 * zoom;
  const lensR = f < B.hero ? interpolate(f, [486, 500], [2.6, 1], { ...C, easing: expoOut }) : interpolate(f, [B.hero, B.hero + 22], [1, 2.8], { ...C, easing: easeIn });
  const lensOn = f >= 486 && f < B.hero + 22;
  const studio = ramp(f, 588, 612);
  const lightsOut = ramp(f, B.lock - 4, B.lock + 14);
  const endFade = ramp(f, 704, 719, (t) => t);
  const show3D = f >= B.hero + 30;
  // camera breathing: a slow push inside each beat that returns to rest at the beat's edges (no snap on cuts)
  const starts = [B.intro, B.name, B.shop, B.travel, B.store, B.fee, B.hero, B.lock, B.end];
  const k = Math.max(0, starts.findIndex((s0, i) => f >= s0 && f < starts[i + 1]));
  const bt = (f - starts[k]) / (starts[k + 1] - starts[k]);
  const cam = 1 + 0.035 * (1 - Math.cos(2 * Math.PI * bt)) / 2;
  const camX = 14 * Math.sin(2 * Math.PI * bt) * (k % 2 ? 1 : -1);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
     <AbsoluteFill style={{ transform: `translateX(${camX}px) scale(${cam})` }}>
      {/* paper worlds */}
      {(f < B.shop + 14 || (f >= B.fee - 8 && f < 620)) && (
        <AbsoluteFill style={{ background: "radial-gradient(ellipse 80% 70% at 50% 45%, #f3f1e4 0%, #e6e8d6 100%)" }} />
      )}
      {f >= B.shop - 8 && f < B.fee + 30 && <StageBackdrop f={f} />}
      {f >= B.fee - 8 && f < B.fee + 30 && (
        <AbsoluteFill style={{ background: "radial-gradient(ellipse 80% 70% at 50% 45%, #f3f1e4 0%, #e6e8d6 100%)", clipPath: `inset(0 ${(1 - clamp01((p.cx + p.w / 2) / 1920)) * 100}% 0 0)` }} />
      )}
      {f >= 580 && (
        <AbsoluteFill style={{ background: "linear-gradient(180deg, #efede8 0%, #dedad2 60%, #cbc6bc 100%)", opacity: studio }}>
          <AbsoluteFill style={{ background: "radial-gradient(ellipse 26% 4% at 51% 82%, rgba(40,36,30,0.3), rgba(40,36,30,0) 100%)" }} />
        </AbsoluteFill>
      )}
      <Paper opacity={0.9 * (1 - lightsOut)} />

      {/* stage: coins, bag, plane, suitcase, shelf */}
      {f >= B.shop && f < B.fee + 20 && (
        <World>
          <Stage f={f} />
        </World>
      )}

      {/* beat 1: pen draws the card */}
      {f < B.name && <PenDraw f={f} />}

      {/* the flat card (beats 2, 3, 6, 7) with the lens zoom */}
      {f >= B.name && p.o > 0 && (
        <AbsoluteFill style={{ transformOrigin: `${tag.x}px ${tag.y}px`, transform: `translate(${(1210 - tag.x) * zoom}px, ${(430 - tag.y) * zoom}px) scale(${zs})` }}>
          <Card2D p={p}>{f >= B.fee && <FeeTag w={p.w} />}</Card2D>
        </AbsoluteFill>
      )}

      {/* lights out for the lockup: behind the lit card */}
      {f >= B.lock - 6 && <AbsoluteFill style={{ background: "#000", opacity: lightsOut }} />}

      {/* the real card */}
      {show3D && (
        <World aa>
          <Cam pos={[0, 0, 16]} target={[0, 0, 0]} fov={34} />
          <Env />
          <ambientLight intensity={0.45} />
          <directionalLight position={[-6 + 4 * Math.sin(f / 50), 5, 7]} intensity={2.0} color="#fff6ea" />
          <directionalLight position={[8, 2, -6]} intensity={2.2} color="#874bf9" />
          <directionalLight position={[-8, 3, -4]} intensity={1.4} color="#ffffff" />
          <Card3D f={f} />
        </World>
      )}

      {lensOn && <LensVignette radiusScale={lensR} />}


      {/* headlines: one per beat, on screen for the whole beat */}
      <Head f={f} from={22} to={88} big={["introducing"]} x={960} y={150} ink="#2c5537" sheen="#7aa483" size={64} center />
      <Head f={f} from={100} to={180} big={["the CRED IndusInd Bank", "RuPay credit card"]} x={110} y={400} ink="#2c5537" sheen="#7aa483" size={76} />
      <Head f={f} from={214} to={268} big={["5% rewards"]} small="on online shopping" x={120} y={400} ink="#1f5a5e" sheen="#64aaa3" size={112} />
      <Head f={f} from={296} to={360} big={["redeem on", "flights and hotels"]} x={120} y={110} ink="#262c66" sheen="#8a93d6" size={96} />
      <Head f={f} from={392} to={455} big={["and 2,000+ products"]} small="on CRED store" x={120} y={110} ink="#6e2a22" sheen="#e8957a" size={100} />
      <Head f={f} from={504} to={562} big={["zero joining fee"]} x={1340} y={810} ink="#1f3d28" sheen="#7aa483" size={84} center />

      {/* lockup */}
      {f >= B.lock + 14 && (
        <>
          <Img src={LOGO} style={{ position: "absolute", left: 960 - 54, top: 640, width: 108, height: 128, opacity: ramp(f, B.lock + 16, B.lock + 30, expoOut) }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 800, textAlign: "center", fontFamily: SANS, fontWeight: 500, fontSize: 40, letterSpacing: "0.04em", color: "rgba(255,255,255,0.88)", opacity: ramp(f, B.lock + 24, B.lock + 38, expoOut), transform: `translateY(${(1 - ramp(f, B.lock + 24, B.lock + 38, expoOut)) * 24}px)` }}>
            IndusInd Bank RuPay credit card
          </div>
        </>
      )}
     </AbsoluteFill>
      <AbsoluteFill style={{ background: "#000", opacity: endFade }} />
      <Audio src={staticFile("custom/cred-v3/mix.wav")} />
    </AbsoluteFill>
  );
};
