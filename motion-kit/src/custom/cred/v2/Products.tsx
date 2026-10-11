import React, { useContext, useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import * as THREE from "three";
import { Cam, Detail, EMesh, Gltf, M, World } from "./three.tsx";
import { balloonSeams, giftPaper, kraft, ribbon } from "./detail.ts";
import { giftBox } from "./models.ts";
import { balloon2, merge } from "./models2.ts";
import { parcel, pedestal } from "./subjects.ts";
import { arcade, bottle, duffel, giftBox2, headphones, openBox, parcel2, plant, spool, wristwatch } from "./models3.ts";
import { tag } from "./subjects.ts";
import { LinePattern, Paper, Sheen, bandGradient } from "./fx.tsx";
import { C, P, SANS, SERIF, T, expoOut, lerp, ramp, rnd } from "./look.ts";
import type { EOpts } from "./engrave.ts";

/**
 * Products world (entered by a card-slab matte wipe sliding right-to-left). Terracotta inks on a warm backdrop:
 * far skyline of stacked parcels (atmospheric), products on pedestals (Poly Haven CC0 camera, pocket watch, brass vase,
 * cardboard boxes), the hero gift box approaching with a pearl foil ribbon, balloons rising with small parcels (one
 * passes in front of the headline). A frosted glass card on the right third lists what the rewards redeem on.
 */
const ter = P.terra;
const mk = (extra: Partial<EOpts> = {}): EOpts => ({ palette: ter, periodFrac: 0.0068, ...extra });

// matte edge (% W) per frame, measured object-matte profile, mirrored to run right -> left
const EDGE = [0, 7.2, 16.2, 28.4, 42.2, 55.6, 67.2, 76.9, 84.7, 90.9, 95.6, 100].map((e) => 100 - e);

const skyline = () => {
  const parts: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 46; i++) {
    const x = -40 + i * 1.8 + rnd(i, 3) * 1.2;
    const stack = 1 + Math.floor(rnd(i, 5) * 4);
    let y = 0;
    for (let k = 0; k < stack; k++) {
      const w = 1.4 + rnd(i * 7 + k, 2) * 1.4, h = 0.8 + rnd(i * 3 + k, 9) * 1.2, d = 1.2 + rnd(i + k, 4);
      parts.push(new THREE.BoxGeometry(w, h, d).rotateY(rnd(i + k * 11, 6) * 0.8 - 0.4).translate(x + (rnd(k + i, 8) - 0.5) * 0.6, y + h / 2, rnd(i, 12) * 6));
      y += h;
    }
  }
  return merge(parts);
};

export const ProductsWorld: React.FC<{ f: number; front?: boolean }> = ({ f, front }) => {
  const dm = useContext(Detail).maps;
  const g = useMemo(
    () => ({
      sky: skyline(),
      ped: pedestal(1.5, 0.9),
      pedTall: pedestal(1.2, 2.2),
      gift: dm ? giftBox2() : giftBox(),
      balloon: balloon2(),
      smallGift: dm ? giftBox2() : giftBox(),
      parcel: dm ? parcel2(1.8, 1.0, 1.4) : parcel(1.8, 1.0, 1.4),
      dress: dm ? { tag: tag(1.0), small: parcel2(1.1, 0.7, 0.9), spool: spool(), bottle: bottle(), arcade: arcade(), plant: plant(), headphones: headphones(), open: openBox(), watch: wristwatch(), duffel: duffel() } : null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const lf = f - T.matte;
  const MAP = (t: THREE.Texture, amt = 0.75) => (dm ? { map: t, mapAmt: amt } : {});
  // camera: midground drifts right (+8 -> +0.4 % W/s, ease-out quad) == camera trucks left
  const drift = interpolate(lf, [0, 103], [0, 1], { ...C, easing: (t) => 1 - (1 - t) * (1 - t) });
  const cx = lerp(1.6, -0.6, drift);
  const gl = { pal: ter };
  const approach = interpolate(lf, [0, 103], [1, 1.25], C);
  const balloons = [
    { x: -8.5, z: -8, s: 0.75, ph: 0.1, sp: 0.06 },
    { x: 7.5, z: -10, s: 0.9, ph: 0.55, sp: 0.05 },
    { x: 1.8, z: -14, s: 0.8, ph: 0.3, sp: 0.045 },
    { x: -3.0, z: -18, s: 0.7, ph: 0.8, sp: 0.04 },
    { x: 11, z: -16, s: 0.7, ph: 0.15, sp: 0.05 },
  ];
  if (front && dm) return null; // the sheet's still life has no balloons
  if (front) {
    // a near balloon rising across the headline (depth-layered type)
    const y = lerp(-8, 9.5, (lf - 6) / 104);
    return (
      <>
        <Cam pos={[cx, 2.4, 15]} target={[cx * 0.8, 1.8, 0]} fov={38} />
        <group position={[-6.8, y, 4]} rotation={[0, lf * 0.01, 0.05 * Math.sin(lf / 13)]} scale={0.62}>
          <EMesh g={g.balloon} m={mk({ seed: 70, angleDeg: 45, foil: 0.25, ...MAP(balloonSeams(1), 0.7) })} live={{ ...gl, foilPhase: lf * 0.004 }} />
          <EMesh g={g.smallGift.box} m={mk({ seed: 71, ...MAP(giftPaper(3)) })} live={gl} pos={[0, -1.1, 0]} scale={0.35} />
        </group>
      </>
    );
  }
  return (
    <>
      <Cam pos={dm ? [cx * 0.6, 1.5, 11.6] : [cx, 2.4, 15]} target={dm ? [cx * 0.5, 0.5, 0] : [cx * 0.8, 1.8, 0]} fov={38} roll={THREE.MathUtils.degToRad(-0.6 + lf * 0.004)} />
      {/* far: v2 skyline of stacked parcels, or (v2D) an arcaded wall with plants, as in the target sheet */}
      {g.dress ? (
        <>
          <EMesh g={g.dress.arcade} m={mk({ atmos: 0.55, seed: 60, angleDeg: 45, albedoNoise: 0.2, edge: 0.4, hatch: 0.4 })} live={gl} pos={[-cx * 0.3 - 1, -2.2, -17]} scale={1.25} />
          <EMesh g={g.dress.plant} m={mk({ atmos: 0.3, seed: 61, angleDeg: 52, edge: 0.5 })} live={gl} pos={[8.6, -2.2, -8]} rot={[0, 0.4, 0]} scale={1.6} />
          <EMesh g={g.dress.plant} m={mk({ atmos: 0.42, seed: 62, angleDeg: 38, edge: 0.5 })} live={gl} pos={[-9.2, -2.2, -9]} rot={[0, -0.6, 0]} scale={1.4} />
        </>
      ) : (
        <EMesh g={g.sky} m={mk({ atmos: 0.62, seed: 60, angleDeg: 45, albedoNoise: 0.3, edge: 0.5, ...MAP(kraft(5), 0.5) })} live={gl} pos={[-cx * 0.3, -1.2, -34]} />
      )}
      {/* rising balloons with parcels (secondary life: vertical rise, sin bob, phase-offset) */}
      {(dm ? [] : balloons).map((b, i) => {
        const y = -6 + (((lf / 24) * b.sp * 24 + b.ph * 16) % 16);
        return (
          <group key={i} position={[b.x + 0.3 * Math.sin(lf / 26 + i), y, b.z]} scale={b.s} rotation={[0, lf * 0.006 * (i % 2 ? 1 : -1), 0]}>
            <EMesh g={g.balloon} m={mk({ seed: 61 + i, angleDeg: [38, 45, 52][i % 3], atmos: 0.15 + 0.08 * i, ...MAP(balloonSeams(2 + i), 0.7) })} live={gl} />
            <EMesh g={g.smallGift.box} m={mk({ seed: 66 + i, atmos: 0.15 + 0.08 * i, ...MAP(giftPaper(4)) })} live={gl} pos={[0, -1.0, 0]} scale={0.33} />
          </group>
        );
      })}
      {g.dress ? (
        <>
          {/* v2D still life on low pedestals: headphones, perfume bottle, open box with tissue, wristwatch; a duffel on the floor */}
          <group position={[-6.2, -2.2, -2.0]} scale={1.25}>
            <EMesh g={g.ped} m={mk({ seed: 80, angleDeg: 38 })} live={gl} />
            <EMesh g={g.dress.headphones} m={mk({ seed: 81, spec: 0.35, shininess: 30, hatch: 0.6 })} live={gl} pos={[0, 0.9, 0]} rot={[0, 0.5 + lf * 0.002, 0]} scale={1.05} />
          </group>
          <group position={[-2.8, -2.2, -4.2]} scale={1.2}>
            <EMesh g={g.pedTall} m={mk({ seed: 82, angleDeg: 52 })} live={gl} />
            <EMesh g={g.dress.bottle} m={mk({ seed: 83, spec: 0.55, shininess: 60, foil: 0.2 })} live={{ ...gl, foilPhase: lf * 0.003 }} pos={[0, 2.2, 0]} rot={[0, 0.3 + lf * 0.003, 0]} scale={1.1} />
          </group>
          <group position={[1.5, -2.2, -3.4]} scale={1.35}>
            <EMesh g={g.ped} m={mk({ seed: 84, angleDeg: 45 })} live={gl} />
            <group position={[0, 0.9, 0]} rotation={[0, -0.35, 0]} scale={1.25}>
              <EMesh g={g.dress.open.box} m={mk({ seed: 85, angleDeg: 45, ...MAP(giftPaper(6)) })} live={gl} />
              <EMesh g={g.dress.open.tissue} m={mk({ seed: 86, albedo: 1.2, edge: 0.4, lift: 0.1 })} live={gl} double />
            </group>
          </group>
          <group position={[5.2, -2.2, -1.4]} scale={1.25}>
            <EMesh g={g.ped} m={mk({ seed: 87, angleDeg: 52 })} live={gl} />
            <EMesh g={g.dress.watch} m={mk({ seed: 88, spec: 0.6, shininess: 50, hatch: 0.6 })} live={gl} pos={[0, 0.9, 0]} rot={[0, -0.4 + lf * 0.002, 0]} scale={1.0} />
          </group>
          <EMesh g={g.dress.duffel} m={mk({ seed: 89, angleDeg: 38, hatch: 0.7, ...MAP(kraft(10), 0.35) })} live={gl} pos={[8.4, -2.2, -0.2]} rot={[0, -0.55, 0]} scale={1.2} />
        </>
      ) : (
        <>
          {/* pedestals with products */}
          <group position={[-6.0, -2.2, -2.5]}>
            <EMesh g={g.pedTall} m={mk({ seed: 80, angleDeg: 38 })} live={gl} />
            <group position={[0, 2.2, 0]} rotation={[0, 0.7 + lf * 0.004, 0]}>
              <Gltf url={M.camera} size={2.4} m={mk({ seed: 81, mapAmt: 0.8, spec: 0.3 })} live={gl} />
            </group>
          </group>
          <group position={[4.6, -2.2, -3.5]}>
            <EMesh g={g.ped} m={mk({ seed: 82, angleDeg: 52 })} live={gl} />
            <group position={[0, 0.9, 0]} rotation={[0, -0.3 + lf * 0.003, 0]}>
              <Gltf url={M.vase} size={3.6} m={mk({ seed: 83, mapAmt: 0.7, spec: 0.5, shininess: 40 })} live={gl} />
            </group>
          </group>
          <group position={[8.6, -2.2, 0.5]} rotation={[0, -0.5, 0]}>
            <Gltf url={M.box} size={3.4} m={mk({ seed: 84, mapAmt: 0.75, angleDeg: 38 })} live={gl} />
            <group position={[0.2, 2.65, 0.1]} rotation={[0, 0.6, 0]}>
              <Gltf url={M.box} size={2.2} m={mk({ seed: 85, mapAmt: 0.75, angleDeg: 52 })} live={gl} />
            </group>
          </group>
          <group position={[-0.2, -2.2, 5.6]} rotation={[-0.2, 0.4, 0.15]}>
            <Gltf url={M.watch} size={1.3} m={mk({ seed: 86, mapAmt: 0.75, spec: 0.6, shininess: 50 })} live={gl} pick={(_, i) => i !== 0} />
          </group>
        </>
      )}
      <EMesh g={g.parcel} m={mk({ seed: 87, angleDeg: 45, ...MAP(kraft(6)) })} live={gl} pos={[-11.5, -2.2, -2.0]} rot={[0, 0.5, 0]} scale={1.3} />
      {g.dress ? (
        <>
          {/* price tags swinging on the camera and the vase, small parcels and a ribbon spool on the floor */}
          <group position={[-5.3, 0.6, -1.3]} rotation={[0, 0.3, 0.12 * Math.sin(lf / 11)]}>
            <EMesh g={g.dress.tag} m={mk({ seed: 90, albedo: 1.12, angleDeg: 45 })} live={gl} scale={0.55} double />
          </group>
          <group position={[6.7, 0.9, -2.3]} rotation={[0, -0.4, -0.1 * Math.sin(lf / 13 + 1)]}>
            <EMesh g={g.dress.tag} m={mk({ seed: 91, albedo: 1.12, angleDeg: 52 })} live={gl} scale={0.5} double />
          </group>
          <EMesh g={g.dress.small} m={mk({ seed: 92, angleDeg: 38, ...MAP(kraft(7)) })} live={gl} pos={[-3.4, -2.2, 2.6]} rot={[0, 0.9, 0]} scale={0.9} />
          <EMesh g={g.dress.small} m={mk({ seed: 93, angleDeg: 52, ...MAP(kraft(8)) })} live={gl} pos={[7.2, -2.2, 3.4]} rot={[0, -0.6, 0]} scale={0.75} />
          <EMesh g={g.dress.small} m={mk({ seed: 94, angleDeg: 45, ...MAP(kraft(9)) })} live={gl} pos={[-8.6, -2.2, 1.2]} rot={[0, 0.2, 0]} scale={0.7} />
          <EMesh g={g.dress.spool} m={mk({ seed: 95, angleDeg: 45, albedo: 1.08, foil: 0.3 })} live={{ ...gl, foilPhase: lf * 0.004 }} pos={[0.6, -2.2, 4.6]} rot={[0, 0.8, 0]} scale={0.55} />
        </>
      ) : null}
      {/* hero: gift box approaching, pearl foil on the ribbon only */}
      <group position={dm ? [-1.9 + lf * 0.004, -2.2, 1.6] : [2.4 + lf * 0.004, -2.2, 0.6]} rotation={[0.08, -0.55 + lf * 0.0018, 0]} scale={(dm ? 1.0 : 1.5) * approach}>
        <EMesh g={g.gift.box} m={mk({ seed: 88, angleDeg: 45, ...MAP(giftPaper(5)) })} live={gl} />
        <EMesh g={g.gift.ribbon} m={mk({ seed: 89, albedo: 1.15, foil: 0.6, spec: 0.5, angleDeg: 38, ...MAP(ribbon(3), 0.5) })} live={{ ...gl, foilPhase: lf * 0.006 + drift * 0.3 }} />
      </group>
    </>
  );
};

const GlassCard: React.FC<{ f: number }> = ({ f }) => {
  const step = ramp(f, 461, 467, expoOut); // active row steps to "2,000+ products" on the break (one bar later)
  const rows = ["flights", "hotels", "2,000+ products"];
  const pitch = 0.12 * 1080;
  const top0 = 120;
  const barY = lerp(top0 + pitch * 1, top0 + pitch * 2, step);
  return (
    <div
      style={{
        position: "absolute",
        left: 0.585 * 1920,
        top: 0.17 * 1080,
        width: 0.35 * 1920,
        height: 0.43 * 1080,
        borderRadius: 26,
        background: "rgba(255,234,222,0.34)",
        backdropFilter: "blur(7px) saturate(1.1)",
        border: "1.5px solid rgba(255,255,255,0.55)",
        boxShadow: "0 18px 50px rgba(110,42,34,0.18)",
        overflow: "hidden",
      }}
    >
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <filter id="smear" x="-10%" y="-40%" width="120%" height="180%">
          <feMorphology operator="dilate" radius="3 1" />
          <feGaussianBlur stdDeviation="12 0" />
        </filter>
      </svg>
      <div style={{ position: "absolute", left: 44, top: 46, fontFamily: SANS, fontWeight: 500, fontSize: 19, letterSpacing: "0.32em", color: "#7a3328" }}>REDEEM ON</div>
      <div style={{ position: "absolute", left: 26, right: 26, top: barY - pitch * 0.36, height: pitch * 0.72, borderRadius: 14, background: "linear-gradient(90deg, #ff8744 0%, #ff7b9a 100%)", opacity: 0.92 }} />
      {rows.map((r, i) => {
        const active = i === 1 ? 1 - step : i === 2 ? step : 0;
        const y = top0 + pitch * i;
        return (
          <div key={r} style={{ position: "absolute", left: 50, right: 50, top: y - 22, height: 44, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: SANS, fontWeight: 500, fontSize: 34, color: "#5a1f19", opacity: 1 - active, filter: "url(#smear)" }}>
              <span>{r}</span>
              <span style={{ width: 120, height: 10, borderRadius: 5, background: "#9b4a3b", opacity: 0.6 }} />
            </div>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: SANS, fontWeight: 500, fontSize: 34, color: "#fff7f2", opacity: active }}>
              <span>{r}</span>
              <span style={{ width: 120, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.75)" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** v2D: the list as an engraved paper docket (the reference's small legends), not a glass UI card. */
const Legend: React.FC<{ f: number }> = ({ f }) => {
  const step = ramp(f, 461, 467, expoOut);
  const rows = ["flights", "hotels", "2,000+ products"];
  const W = 0.33 * 1920, H = 0.4 * 1080, L = 0.6 * 1920, Tp = 0.18 * 1080;
  const pitch = 96, top0 = 150;
  const ink = "#5a1f19", ink2 = "rgba(90,31,25,0.55)";
  const barY = lerp(top0 + pitch, top0 + pitch * 2, step);
  return (
    <div style={{ position: "absolute", left: L, top: Tp, width: W, height: H }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <LinePattern id="legMesh" pitch={6} width={1.1} color={ink} angle={45} />
          <linearGradient id="legFoil" x1="0" x2="1">
            <stop offset="0" stopColor="#f1caca" />
            <stop offset="0.35" stopColor="#fcd8a3" />
            <stop offset="0.7" stopColor="#c7e5d2" />
            <stop offset="1" stopColor="#8daad3" />
          </linearGradient>
        </defs>
        {/* paper panel with a fine-mesh margin and double rule, like a banknote cartouche */}
        <rect x={0} y={0} width={W} height={H} rx={10} fill="#f6e4d8" opacity={0.92} />
        <rect x={0} y={0} width={W} height={H} rx={10} fill="url(#legMesh)" opacity={0.35} />
        <rect x={16} y={16} width={W - 32} height={H - 32} rx={6} fill="#f8ebe2" />
        <rect x={16} y={16} width={W - 32} height={H - 32} rx={6} fill="none" stroke={ink} strokeWidth={2.2} />
        <rect x={24} y={24} width={W - 48} height={H - 48} rx={4} fill="none" stroke={ink} strokeWidth={0.8} />
        {/* small rosette ornament top-right */}
        <g opacity={0.8}>
          {Array.from({ length: 9 }, (_, i) => {
            const R = 22 * (0.5 + 0.5 * (i / 9));
            let d = "";
            for (let k = 0; k <= 180; k++) {
              const t = (k / 180) * Math.PI * 2, r = R + 22 * 0.1 * Math.sin(8 * t + i * 0.4);
              d += `${k ? "L" : "M"}${(W - 62 + r * Math.cos(t)).toFixed(1)} ${(62 + r * Math.sin(t)).toFixed(1)} `;
            }
            return <path key={i} d={d + "Z"} fill="none" stroke={ink} strokeWidth={0.9} />;
          })}
        </g>
        {/* the active row: a thin foil rule under the words, not a pill */}
        <rect x={52} y={barY + 22} width={W - 104} height={5} fill="url(#legFoil)" opacity={0.95} />
        <rect x={52} y={barY + 22} width={W - 104} height={5} fill="url(#legMesh)" opacity={0.35} />
        {/* hairline rules between rows */}
        {rows.map((_, i) => (
          <line key={i} x1={52} x2={W - 52} y1={top0 + pitch * i + 46} y2={top0 + pitch * i + 46} stroke={ink2} strokeWidth={1} />
        ))}
      </svg>
      <div style={{ position: "absolute", left: 52, top: 50, fontFamily: SANS, fontWeight: 500, fontSize: 19, letterSpacing: "0.34em", color: ink }}>REDEEM ON</div>
      {rows.map((r, i) => {
        const active = i === 1 ? 1 - step : i === 2 ? step : 0;
        return (
          <div key={r} style={{ position: "absolute", left: 52, right: 52, top: top0 + pitch * i - 24, height: 48, display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: SERIF, fontWeight: 600, fontSize: 42, color: ink, letterSpacing: "-0.02em", opacity: 0.62 + 0.38 * active, fontVariationSettings: "'opsz' 72" }}>
            <span>{r}</span>
            <span style={{ fontFamily: SANS, fontWeight: 500, fontSize: 16, letterSpacing: "0.3em", opacity: 0.7 }}>{["0" + (i + 1), "02", "03"][i].slice(-2)}</span>
          </div>
        );
      })}
    </div>
  );
};

/** The sliding card slab used as the wipe matte (engraved crimson face + foil edge). */
const Slab: React.FC<{ edge: number }> = ({ edge }) => {
  const w = 0.22 * 1920;
  const x = (edge / 100) * 1920 - w;
  return (
    <div style={{ position: "absolute", left: x, top: -60, width: w, height: 1200, transform: "rotate(-4deg)", transformOrigin: "100% 50%" }}>
      <svg width={w} height={1200} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="slabG" x1="0" x2="1" y1="0" y2="0.3">
            <stop offset="0" stopColor="#8a2f2a" />
            <stop offset="0.6" stopColor="#c45a48" />
            <stop offset="1" stopColor="#6b211e" />
          </linearGradient>
          <LinePattern id="slabL" pitch={7.5} width={3.2} color="#4a1512" angle={45} />
        </defs>
        <rect width={w} height={1200} fill="url(#slabG)" />
        <rect width={w} height={1200} fill="url(#slabL)" opacity={0.55} />
        {Array.from({ length: 16 }, (_, i) => (
          <path key={i} d={`M ${-20} ${i * 80} C ${w * 0.3} ${i * 80 - 30}, ${w * 0.7} ${i * 80 + 30}, ${w + 20} ${i * 80}`} stroke="#f2c2a6" strokeOpacity={0.4} fill="none" strokeWidth={2} />
        ))}
      </svg>
      <div style={{ position: "absolute", right: 0, top: 0, width: 26, height: 1200, ...bandGradient(3, 0), backgroundSize: "100% 100%", transform: "none", filter: "saturate(1.2)" }} />
      <div style={{ position: "absolute", right: 26, top: 0, width: 4, height: 1200, background: "rgba(255,240,230,0.8)" }} />
    </div>
  );
};

export const ProductsTake: React.FC = () => {
  const lf = useCurrentFrame();
  const f = lf + T.matte;
  const detailed = useContext(Detail).maps;
  // the slab slides in from the right for 2 frames, then its trailing edge is the matte (11 measured steps)
  const wiping = lf < 13;
  const edge = lf < 2 ? 100 : wiping ? EDGE[Math.min(11, lf - 2)] : 0;
  const slabEdge = lf < 2 ? [126, 112][lf] : edge;
  const clip = wiping ? `inset(0 0 0 ${edge}%)` : undefined;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: clip }}>
        <AbsoluteFill style={{ background: "linear-gradient(180deg, #f1d3c2 0%, #e9c4b1 55%, #dcae99 72%, #e6bfab 100%)" }} />
        <World>
          <ProductsWorld f={f} />
        </World>
        <Paper id="prod" mottle={0.035} grain={0.1} />
        {detailed ? <Legend f={f} /> : <GlassCard f={f} />}
        {/* headline top-left; locked, revealed by the wipe (no entrance); a near balloon later rises in front of it */}
        <div style={{ position: "absolute", left: 0.05 * 1920, top: 0.07 * 1080 }}>
          <Sheen t={lf / 24} ink="#6e2a22" sheen="#e8957a" boxW={900} fontSize={116} fontFamily={SERIF} letterSpacing="-0.03em" opsz>
            2,000+ products
          </Sheen>
          <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 38, color: "#4d1c16", marginTop: 8, letterSpacing: "-0.01em" }}>on CRED store</div>
        </div>
        <World>
          <ProductsWorld f={f} front />
        </World>
      </AbsoluteFill>
      {wiping ? <Slab edge={slabEdge} /> : null}
    </AbsoluteFill>
  );
};
