import React, { useContext, useMemo } from "react";
import * as THREE from "three";
import { Cam, Detail, EMesh, Gltf, M, Shadow, type Live } from "./three.tsx";
import { Paint } from "./paint.tsx";
import { bagOrnament, bagPaper, giftPaper, kraft, ribbon } from "./detail.ts";
import { giftBox } from "./models.ts";
import { shoppingBag, coinStack } from "./models2.ts";
import { paperPlane, parcel, tag } from "./subjects.ts";
import { bag2, giftBox2, parcel2, tissue } from "./models3.ts";
import { P, T, expoOut, lerp, mixPal, ramp } from "./look.ts";
import type { EOpts, Pal } from "./engrave.ts";

/**
 * The "online shopping" parcel world: engraved bags, boxes and parcels assemble from the left and right edges
 * (two sides, not three corners), a posterised swinging parcel tag is the one live hero, paper planes cross far behind.
 * Inks: teal + ochre on a cream/teal wash.  Rendered again (re-inked) as the card art in later shots.
 */

type Inks = { a: Pal; b: Pal; hero: Pal };
export const INKS_ASM: Inks = { a: P.teal, b: P.ochre, hero: P.coral };

// fly-in: [start frame, side (-1 left / +1 right)]
const FLY = {
  bigBox: [86, -1],
  bagR: [92, 1],
  gift: [94, 1],
  bagL: [101, -1],
  parcels: [102, -1],
  boxR: [108, 1],
  coins: [111, 1],
  giftL: [97, -1],
  bagBack: [104, 1],
  front: [114, -1],
} as const;

const fly = (f: number, key: keyof typeof FLY, settle = false) => {
  const [s, side] = FLY[key];
  if (settle) return { dx: 0, rz: 0, e: 1 };
  const e = ramp(f, s, s + 28, expoOut);
  return { dx: side * 16 * (1 - e), rz: -side * 0.5 * (1 - e), e };
};

export type AsmView = {
  f: number; // film frame driving animation
  inks?: Inks;
  periodFrac?: number;
  camZ?: number; // override camera distance (macro views)
  camX?: number;
  camY?: number;
  fov?: number;
  roll?: number;
  settled?: boolean; // everything in place (card art in later shots)
  foil?: number;
  dim?: number;
};

const base = (pal: Pal, extra: Partial<EOpts> = {}): EOpts => ({ palette: pal, periodFrac: 0.0068, ...extra });

export const AssemblyWorld: React.FC<AsmView> = ({ f, inks = INKS_ASM, periodFrac = 0.0068, camZ, camX, camY, fov = 35, roll, settled = false, dim = 0 }) => {
  const dm = useContext(Detail).maps;
  // v2D: the designed subjects (models3) stand in for the v2 primitives on the same footprints
  const g = useMemo(
    () => ({
      gift: dm ? giftBox2() : giftBox(),
      bag: dm ? bag2() : shoppingBag(),
      parcelA: dm ? parcel2(2.2, 1.1, 1.6) : parcel(2.2, 1.1, 1.6),
      parcelB: dm ? parcel2(1.6, 0.9, 1.3) : parcel(1.6, 0.9, 1.3),
      parcelC: dm ? parcel2(1.2, 0.7, 1.0) : parcel(1.2, 0.7, 1.0),
      tag: tag(3.2),
      plane: paperPlane(),
      coins: coinStack(6),
      tissue: dm ? [tissue(1), tissue(2)] : null,
      ground: dm ? new THREE.PlaneGeometry(70, 46) : null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const pf = periodFrac;
  const MAP = (t: THREE.Texture, amt = 0.75) => (dm ? { map: t, mapAmt: amt } : {});
  const liveA: Live = { pal: inks.a, dim };
  const liveB: Live = { pal: inks.b, dim };
  // camera: assembly pull-back x0.85 with +1 deg roll (expo-out), then a living drift
  const pull = ramp(f, 92, 150, expoOut);
  const z = camZ ?? lerp(12.6, 14.8, pull) + Math.max(0, f - 150) * 0.004;
  const rl = roll ?? THREE.MathUtils.degToRad(lerp(-1.2, 0.3, pull) + Math.max(0, f - 150) * 0.01);
  const x = camX ?? lerp(0.6, 0, pull) + Math.max(0, f - 150) * 0.002;
  const y = camY ?? (dm ? 1.4 : 0.3);
  const S = settled;
  // v2D: the sheet's layout, every object standing on one ground plane (G) in the lower half of the frame
  const G = -6.2;
  const pos3 = (v2: [number, number, number], d: [number, number, number]): [number, number, number] => (dm ? d : v2);
  const rx = (v: number) => (dm ? 0 : v);
  const bigBox = fly(f, "bigBox", S), bagR = fly(f, "bagR", S), gift = fly(f, "gift", S), bagL = fly(f, "bagL", S);
  const parcels = fly(f, "parcels", S), boxR = fly(f, "boxR", S), coins = fly(f, "coins", S);
  const giftL = fly(f, "giftL", S), bagBack = fly(f, "bagBack", S), front = fly(f, "front", S);
  // hero tag: enters from the top on a string and swings (pendulum, 1.6 s period, decaying to a 6 deg sway)
  const tagIn = S ? 1 : ramp(f, 112, 126, expoOut);
  const tAge = Math.max(0, f - 112) / 24;
  const swing = (0.42 * Math.exp(-tAge * 0.9) + 0.1) * Math.sin(tAge * Math.PI * 2 / 1.6 + 0.4);
  const planeT = (k: number) => ((f - 100 + k * 47 + 600) % 160) / 160;
  return (
    <>
      <Cam pos={[x, y, z]} target={[x * 0.6, dm && camY === undefined ? -2.2 : 0, 0]} fov={fov} roll={rl} />
      {dm ? (
        <group>
          {([
            [4.6 + bagBack.dx, -7.5, 4.6, 3.0], [-7.4 + giftL.dx, -5.2, 3.2, 3.0], [-6.4 + bigBox.dx, -0.6, 6.6, 5.6], [-10.8 + bagL.dx, -3.4, 4.2, 2.8],
            [-1.6 + parcels.dx, -3.4, 3.6, 2.8], [6.6 + bagR.dx, 0.4, 6.0, 3.6], [1.8 + gift.dx, -0.4, 3.6, 3.4], [10.2 + boxR.dx, -3.8, 4.6, 4.2],
            [3.4 + coins.dx, 2.4, 1.8, 1.8], [-2.8 + front.dx, 3.4, 4.0, 3.0],
          ] as [number, number, number, number][]).map(([sx, sz, w, d], i) => (
            <Shadow key={i} pos={[sx, G + 0.01, sz]} w={w} d={d} ink={inks.a[0][0]} opacity={0.22} />
          ))}
        </group>
      ) : null}
      {dm ? <EMesh g={g.ground!} m={base(inks.a, { periodFrac: pf, angleDeg: 45, seed: 33, albedo: 1.5, lift: 0.6, edge: 0, atmos: 0.95, fill: 0.1, opacity: 0.999 })} live={{ ...liveA, opacity: S ? 0.6 : 0.6 * ramp(f, 88, 104) }} pos={[0, G - 0.02, -6]} rot={[-Math.PI / 2, 0, 0]} /> : null}
      {/* far: paper planes (atmospheric: low contrast, lifted toward paper) */}
      {(settled || f > 100 ? [0, 1, 2] : []).map((k) => {
        const t = planeT(k);
        const dir = k === 1 ? -1 : 1;
        return (
          <EMesh key={k} g={g.plane} m={base(inks.a, { periodFrac: pf, atmos: 0.65, angleDeg: 38, edge: 0.3 })} live={{ pal: inks.a, dim }}
            pos={[lerp(-15, 15, t) * dir, 3.6 - k * 1.3 + Math.sin(t * 6 + k) * 0.25, -10 - k * 2]}
            rot={[-0.75, dir < 0 ? Math.PI : 0, 0.15 * Math.sin(t * 5)]} scale={0.7} double />
        );
      })}
      {/* back row */}
      <Paint id={1} wash={inks.b[2][0]} ink={inks.b[0][0]}>
        <EMesh g={g.bag} m={base(inks.b, { periodFrac: pf, angleDeg: 45, seed: 21, atmos: 0.35, ...MAP(bagOrnament(1), 0.7) })} live={liveB} double
          pos={pos3([3.2 + bagBack.dx, -1.0, -7.5], [4.6 + bagBack.dx, G, -7.5])} rot={[rx(0.05), -0.3, bagBack.rz]} scale={1.9} />
      </Paint>
      <Paint id={2} wash={inks.a[2][0]} ink={inks.a[0][0]}>
        <group position={pos3([-6.4 + giftL.dx, 1.1, -5.5], [-7.4 + giftL.dx, G, -5.2])} rotation={[rx(0.25), 0.6, rx(0.1) + giftL.rz]} scale={1.1}>
          <EMesh g={g.gift.box} m={base(inks.a, { periodFrac: pf, angleDeg: 52, seed: 22, atmos: 0.25, ...MAP(giftPaper(1)) })} live={liveA} />
          <EMesh g={g.gift.ribbon} m={base(inks.b, { periodFrac: pf, angleDeg: 45, seed: 23, atmos: 0.25, ...MAP(ribbon(1), 0.6) })} live={liveB} />
        </group>
      </Paint>
      {/* left side */}
      <Paint id={3} wash={inks.b[2][0]} ink={inks.b[0][0]}>
        <group position={pos3([-5.9 + bigBox.dx, -5.6, 0.8], [-6.4 + bigBox.dx, G, -0.6])} rotation={[rx(0.12), 0.55, bigBox.rz]}>
          <Gltf url={M.box} size={6.2} m={base(inks.b, { periodFrac: pf, angleDeg: 45, seed: 4, mapAmt: 0.75 })} live={liveB} />
        </group>
      </Paint>
      <Paint id={4} wash={inks.a[2][0]} ink={inks.a[0][0]}>
        <group position={pos3([-8.6 + bagL.dx, -2.8, -1.4], [-10.8 + bagL.dx, G, -3.4])} rotation={[rx(0.05), 0.75, rx(0.06) + bagL.rz]} scale={1.7}>
          <EMesh g={g.bag} m={base(inks.a, { periodFrac: pf, angleDeg: 52, seed: 6, ...MAP(bagPaper(2)) })} live={liveA} double />
          {g.tissue ? <EMesh g={g.tissue[0]} m={base(inks.hero, { periodFrac: pf, angleDeg: 38, seed: 30, albedo: 1.15, edge: 0.4 })} live={{ pal: inks.hero, dim }} double pos={[0.1, 2.25, 0]} rot={[0.15, 0.3, -0.1]} scale={0.8} /> : null}
        </group>
      </Paint>
      <Paint id={5} wash={inks.b[2][0]} ink={inks.b[0][0]}>
        <group position={pos3([-2.0 + parcels.dx, -2.6, -2.6], [-1.6 + parcels.dx, G, -3.4])} rotation={[rx(0.18), -0.4, parcels.rz]} scale={1.25}>
          <EMesh g={g.parcelA} m={base(inks.b, { periodFrac: pf, angleDeg: 38, seed: 8, ...MAP(kraft(1)) })} live={liveB} />
          <EMesh g={g.parcelB} m={base(inks.a, { periodFrac: pf, angleDeg: 45, seed: 9, ...MAP(kraft(2)) })} live={liveA} pos={[0.2, 1.1, 0.1]} rot={[0, 0.5, 0]} />
          <EMesh g={g.parcelC} m={base(inks.b, { periodFrac: pf, angleDeg: 52, seed: 10, ...MAP(kraft(3)) })} live={liveB} pos={[-0.1, 2.0, 0]} rot={[0, -0.3, 0]} />
        </group>
      </Paint>
      {/* right side */}
      <Paint id={6} wash={inks.a[2][0]} ink={inks.a[0][0]}>
        <group position={pos3([5.6 + bagR.dx, -6.4, 1.6], [6.6 + bagR.dx, G, 0.4])} rotation={[rx(0.05), -0.6, rx(-0.04) + bagR.rz]} scale={2.4}>
          <EMesh g={g.bag} m={base(inks.a, { periodFrac: pf, angleDeg: 45, seed: 11, ...MAP(bagOrnament(3), 0.8) })} live={liveA} double />
          {g.tissue ? <EMesh g={g.tissue[1]} m={base(inks.b, { periodFrac: pf, angleDeg: 45, seed: 31, albedo: 1.1, edge: 0.4 })} live={liveB} double pos={[-0.1, 2.3, 0]} rot={[0.1, -0.4, 0.12]} scale={0.85} /> : null}
        </group>
      </Paint>
      <Paint id={7} wash={inks.b[2][0]} ink={inks.b[0][0]}>
        <group position={pos3([1.4 + gift.dx, -4.2, -0.6], [1.8 + gift.dx, G, -0.4])} rotation={[rx(0.2), -0.5, gift.rz]} scale={1.45}>
          <EMesh g={g.gift.box} m={base(inks.b, { periodFrac: pf, angleDeg: 45, seed: 12, ...MAP(giftPaper(2)) })} live={liveB} />
          <EMesh g={g.gift.ribbon} m={base(inks.a, { periodFrac: pf, angleDeg: 38, seed: 13, albedo: 0.8, ...MAP(ribbon(2), 0.6) })} live={liveA} />
        </group>
      </Paint>
      <Paint id={8} wash={inks.b[2][0]} ink={inks.b[0][0]}>
        <group position={pos3([7.6 + boxR.dx, 1.4, -3.0], [10.2 + boxR.dx, G, -3.8])} rotation={[rx(0.35), -0.8, rx(-0.25) + boxR.rz]}>
          <Gltf url={M.box} size={4.2} m={base(inks.b, { periodFrac: pf, angleDeg: 52, seed: 14, mapAmt: 0.75 })} live={liveB} />
        </group>
      </Paint>
      <Paint id={9} wash={inks.b[2][0]} ink={inks.b[0][0]}>
        <EMesh g={g.coins} m={base(inks.b, { periodFrac: pf, angleDeg: 38, seed: 15, spec: 0.5, shininess: 40 })} live={liveB}
          pos={pos3([4.0 + coins.dx, -1.4, 0.8], [3.4 + coins.dx, G, 2.4])} rot={[rx(0.35), 0.3, rx(-0.2) + coins.rz]} scale={0.95} />
      </Paint>
      {/* foreground parcel crossing the bottom edge */}
      <Paint id={10} wash={inks.a[2][0]} ink={inks.a[0][0]}>
        <group position={pos3([-1.8 + front.dx, -6.6, 4.2], [-2.8 + front.dx, G, 3.4])} rotation={[rx(0.3), 0.35, rx(0.05) + front.rz]} scale={1.6}>
          <EMesh g={g.parcelA} m={base(inks.a, { periodFrac: pf, angleDeg: 45, seed: 24, ...MAP(kraft(4)) })} live={liveA} />
        </group>
      </Paint>
      {/* hero: posterised parcel tag on a string, swinging (no line screen) */}
      <Paint id={40} wash={inks.hero[1][0]} ink={inks.hero[0][0]}>
      <group position={[-0.6, (dm ? 3.4 : 5.6) + (1 - tagIn) * 6, 1.5]} rotation={[0, 0.35 + swing * 0.6, swing]}>
        <EMesh g={g.tag} m={{ palette: inks.hero, poster: true, albedoNoise: 0.2, key: [-0.4, 0.5, 0.8] }} live={{ pal: inks.hero, dim }} double scale={1.05} />
      </group>
      </Paint>
    </>
  );
};

export const asmPalAt = (f: number): Inks => {
  // world-into-card grade: teal/ochre -> cyan/ink-blue over the reveal
  const t = ramp(f, T.reveal + 8, T.reveal + 28);
  return { a: mixPal(P.teal, P.cyan, t), b: mixPal(P.ochre, P.cyanDeep, t), hero: mixPal(P.coral, [["#14315c", 0], ["#4c8fc0", 0.5], ["#cbe9f4", 1]], t) };
};
