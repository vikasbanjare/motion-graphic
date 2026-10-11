import React, { useMemo } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import * as THREE from "three";
import { Cam, EMesh, Gltf, M, World } from "./three.tsx";
import { airplane, globeStand, hotelBell } from "./models.ts";
import { globeAlbedo, roomKey, merge } from "./models2.ts";
import { cloudBank, routeDots } from "./subjects.ts";
import { LensRim, LensVignette, Paper, Sheen } from "./fx.tsx";
import { C, P, SERIF, T, expoOut, lerp, ramp } from "./look.ts";
import type { EOpts } from "./engrave.ts";

/**
 * Travel world. Under the new lens (dropped in by the lens swap) we look straight down at an engraved globe: its
 * graticule reads as a rosette, dotted flight routes and tiny airliners circle it on a compass-ruled map table. Iris-out,
 * then a 90 deg tilt-up turns the pattern into a world: globe on the left third, low horizon, cloud banks, a suitcase
 * and a desk bell; an airliner orbits the globe. Headline bottom-left: "redeem on flights and hotels".
 * Inks: indigo on cream (one family).
 */

// lens-swap drop, 16 frames (measured keyframes, % of frame)
const SWX = [65.6, 56.6, 51.8, 49.6, 48.4, 47.7, 47.5, 47.4, 47.4, 47.5, 47.8, 48.5, 49.5, 50.1, 50.4, 50.6];
const SWY = [-2.8, 24.9, 46.0, 59.1, 67.7, 72.8, 75.3, 75.7, 75.1, 72.9, 67.2, 59.8, 56.1, 54.1, 53.0, 52.5];

const TILT0 = T.tilt;
const ind = P.indigo;
const mk = (extra: Partial<EOpts> = {}): EOpts => ({ palette: ind, periodFrac: 0.0066, ...extra });

const mapTexture = () => {
  const c = document.createElement("canvas");
  c.width = c.height = 2048;
  const x = c.getContext("2d")!;
  x.fillStyle = "#e8e8e8";
  x.fillRect(0, 0, 2048, 2048);
  x.translate(1024, 1024);
  x.strokeStyle = "rgba(0,0,0,0.85)";
  for (let i = 1; i < 26; i++) {
    x.lineWidth = i % 5 === 0 ? 7 : 2.6;
    x.beginPath();
    x.arc(0, 0, 60 + i * 38, 0, Math.PI * 2);
    x.stroke();
  }
  for (let k = 0; k < 32; k++) {
    const a = (k / 32) * Math.PI * 2;
    x.lineWidth = k % 4 === 0 ? 5 : 2;
    x.beginPath();
    x.moveTo(Math.cos(a) * 180, Math.sin(a) * 180);
    x.lineTo(Math.cos(a) * 1020, Math.sin(a) * 1020);
    x.stroke();
  }
  // dotted routes fanning out
  x.fillStyle = "rgba(0,0,0,0.7)";
  for (let r = 0; r < 7; r++) {
    const a0 = r * 0.9 + 0.3, a1 = a0 + 0.9 + (r % 3) * 0.3;
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      const a = a0 + (a1 - a0) * t, rr = 300 + 520 * Math.sin(Math.PI * t) * (0.6 + 0.1 * r);
      x.beginPath();
      x.arc(Math.cos(a) * rr, Math.sin(a) * rr, 8, 0, Math.PI * 2);
      x.fill();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  return t;
};

export const TravelWorld: React.FC<{ f: number }> = ({ f }) => {
  const g = useMemo(() => {
    const st = globeStand();
    st.ring.rotateZ(THREE.MathUtils.degToRad(-23.4)); // upright axis: the pole is centred in the top-down view
    return {
      sphere: new THREE.SphereGeometry(1, 128, 96),
      ring: st.ring,
      stand: st.stand,
      plane: airplane(),
      bell: hotelBell(),
      key: roomKey(),
      clouds: [cloudBank(9, 1), cloudBank(7, 4), cloudBank(11, 7), cloudBank(10, 9), cloudBank(8, 12)],
      routes: merge([
        routeDots(1.0, [-74, 40], [2, 49], 34),
        routeDots(1.0, [2, 49], [77, 28], 40),
        routeDots(1.0, [77, 28], [139, 35], 34),
        routeDots(1.0, [55, 25], [103, 1], 28),
        routeDots(1.0, [-0.1, 51.5], [-74, 40.7], 36),
      ]),
      ground: new THREE.CircleGeometry(40, 96).rotateX(-Math.PI / 2),
      map: mapTexture(),
      albedo: globeAlbedo(),
    };
  }, []);
  // camera: top-down -> tilt-up (pitch -90 -> ~-6 deg), height on the same curve delayed 3 frames; then dolly finish,
  // living drift, and an accelerating orbit into the matte wipe
  const tilt = interpolate(f, [TILT0, TILT0 + 27], [0, 1], { ...C, easing: Easing.bezier(0.6, 0, 0.2, 1) });
  const tiltH = interpolate(f, [TILT0 + 3, TILT0 + 30], [0, 1], { ...C, easing: Easing.bezier(0.6, 0, 0.2, 1) });
  const el = THREE.MathUtils.degToRad(lerp(89.3, 5, tilt));
  const D = lerp(6.6, 13.5, tiltH) * (1 + 0.03 * (1 - ramp(f, TILT0 + 27, TILT0 + 45, expoOut))) - Math.max(0, f - TILT0 - 45) * 0.006;
  const orbit = THREE.MathUtils.degToRad(14 * Math.pow(ramp(f, 362, 392, (t) => t), 2));
  const az = THREE.MathUtils.degToRad(-8) + orbit + (f - 290) * 0.0006;
  const tgt = new THREE.Vector3(lerp(0, 4.6, tiltH), lerp(4, 4.4, tiltH), lerp(0, 0.8, tiltH));
  const pos: [number, number, number] = [tgt.x + D * Math.cos(el) * Math.sin(az), tgt.y + D * Math.sin(el), tgt.z + D * Math.cos(el) * Math.cos(az)];
  const roll = lerp(0.35 + (f - 290) * 0.002, 0, tilt);
  const spin = f * 0.004;
  const orbitA = (f / 96) * Math.PI * 2;
  const gl = { pal: ind };
  return (
    <>
      <Cam pos={pos} target={[tgt.x, tgt.y, tgt.z]} fov={44} roll={roll} />
      <EMesh g={g.ground} m={mk({ map: g.map, mapAmt: 0.9, albedoNoise: 0.12, key: [0.2, 1, 0.3], edge: 0, angleDeg: 45, lift: 0.08 })} live={gl} />
      {/* clouds far behind (atmospheric) */}
      {g.clouds.map((c, i) => (
        <EMesh key={i} g={c} m={mk({ atmos: 0.45 + i * 0.08, angleDeg: [38, 45, 52, 45, 38][i], seed: 30 + i, albedoNoise: 0.15, wrap: 0.5, edge: 0.5 })} live={gl}
          pos={[[-10, 12, 34, -34, 2][i] - (f - 290) * 0.01 * (i + 1), [2.6, 4.2, 3.4, 3.0, 6.5][i], [-26, -34, -44, -40, -60][i]]} scale={[2.4, 2.8, 3.4, 3.2, 4.2][i]} />
      ))}
      {/* small airliners flying the dotted routes on the map table */}
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const a = k * 1.05 + 0.5 + (f - 290) * 0.004 * (k % 2 ? 1 : -1);
        const rr = 4.6 + (k % 3) * 1.5;
        return (
          <EMesh key={`m${k}`} g={g.plane} m={mk({ seed: 50 + k, spec: 0.3, angleDeg: [38, 45, 52][k % 3] })} live={gl}
            pos={[Math.cos(a) * rr, 0.3, Math.sin(a) * rr]} rot={[0, -a + (k % 2 ? 0 : Math.PI), 0]} scale={0.16} />
        );
      })}
      {/* far airliners crossing the sky */}
      {[0, 1].map((k) => (
        <EMesh key={k} g={g.plane} m={mk({ atmos: 0.55, seed: 40 + k, edge: 0.4 })} live={gl}
          pos={[lerp(-30, 40, ((f - 290) / 140 + k * 0.45) % 1), 10 + k * 2.5, -36 - k * 8]} rot={[0.1, k ? 0.2 : -0.2, 0]} scale={0.6} />
      ))}
      {/* the globe on its stand (scale 2: sphere r 2, stand foot on the ground) */}
      <group position={[0, 4, 0]} scale={2}>
        <group rotation={[0, 0, THREE.MathUtils.degToRad(23.4) * tilt]}>
          <group rotation={[0, -1.6 + spin, 0]}>
            <EMesh g={g.sphere} m={mk({ map: g.albedo, mapAmt: 0.85, albedoNoise: 0.1, angleDeg: 45, seed: 5, foil: 0.35, spec: 0.25 })} live={{ ...gl, foilPhase: spin * 0.6 + tilt * 0.4 }} />
            <EMesh g={g.routes} m={mk({ albedo: 0.35, edge: 0, seed: 6 })} live={gl} />
          </group>
        </group>
        <EMesh g={g.ring} m={mk({ spec: 0.5, seed: 7, angleDeg: 52 })} live={{ ...gl, opacity: ramp(f, TILT0 + 4, TILT0 + 14) }} />
        <EMesh g={g.stand} m={mk({ spec: 0.4, seed: 8, angleDeg: 38 })} live={gl} />
        {/* airliner orbiting the globe */}
        <group rotation={[0.35, 0, -0.2]}>
          <group rotation={[0, orbitA, 0]}>
            <EMesh g={g.plane} m={mk({ spec: 0.3, seed: 9, angleDeg: 45 })} live={gl} pos={[0, 0, 1.75]} rot={[0, Math.PI, -0.15]} scale={0.085} />
          </group>
        </group>
      </group>
      {/* hotels: suitcase and desk bell, room key */}
      <group position={[8.2, 0, 3.4]} rotation={[0, -0.55, 0]}>
        <Gltf url={M.suitcase} size={4.2} m={mk({ angleDeg: 52, seed: 11, mapAmt: 0.85 })} live={gl} pick={(_, i) => i < 4} />
      </group>
      <EMesh g={g.bell} m={mk({ spec: 0.7, shininess: 50, seed: 12, angleDeg: 38 })} live={gl} pos={[3.6, 0, 4.2]} scale={1.0} />
      <EMesh g={g.key} m={mk({ spec: 0.45, seed: 13 })} live={gl} pos={[5.2, 0.12, 5.6]} rot={[-Math.PI / 2, 0, 0.6]} scale={0.55} />
    </>
  );
};

export const TravelTake: React.FC = () => {
  const lf = useCurrentFrame();
  const f = lf + T.swap;
  // incoming lens: circle(47.5vw) dropping on the measured keyframes
  const k = Math.min(15, Math.max(0, lf));
  const swX = SWX[Math.floor(k)] + (SWX[Math.min(15, Math.floor(k) + 1)] - SWX[Math.floor(k)]) * (k % 1);
  const swY = SWY[Math.floor(k)] + (SWY[Math.min(15, Math.floor(k) + 1)] - SWY[Math.floor(k)]) * (k % 1);
  const swapping = lf < 16;
  const cx = swapping ? swX / 100 : 0.506;
  const cy = swapping ? swY / 100 : 0.525;
  // iris-out (ease-in, 7 frames) then the lens is gone
  const iris = 1 + 0.24 * Math.pow(ramp(f, TILT0, TILT0 + 8, (t) => t), 2.6) + 0.5 * ramp(f, TILT0 + 7, TILT0 + 10, (t) => t);
  const lensOn = f < TILT0 + 10;
  const skyT = ramp(f, TILT0 + 12, TILT0 + 26);
  const hl = ramp(f, 340, 345, (t) => t);
  const rise = interpolate(f, [340, 364], [0.025 * 1080, 0], { ...C, easing: expoOut });
  const clip = swapping ? `circle(${0.475 * 1920}px at ${cx * 100}% ${cy * 100}%)` : undefined;
  return (
    <AbsoluteFill style={{ clipPath: clip }}>
      <AbsoluteFill style={{ background: "#e9e1cf" }} />
      <AbsoluteFill style={{ opacity: skyT, background: "linear-gradient(180deg, #c9c6de 0%, #e2dccd 52%, #efe8d8 70%)" }} />
      <World>
        <TravelWorld f={f} />
      </World>
      <Paper id="travel" mottle={0.035} grain={0.1} />
      {/* headline, bottom-left, centre-out mask reveal + 2.5 % H rise */}
      <div style={{ position: "absolute", left: 0.05 * 1920, top: 0.062 * 1080 + rise, opacity: f >= 340 ? 1 : 0 }}>
        <div style={{ clipPath: `inset(0 ${50 * (1 - hl)}% 0 ${50 * (1 - hl)}%)` }}>
          <Sheen t={(f - 340) / 24} ink="#262c66" sheen="#8a93d6" boxW={1300} fontSize={104} fontFamily={SERIF} letterSpacing="-0.03em" opsz>
            redeem on flights and hotels
          </Sheen>
        </div>
      </div>
      {lensOn ? (
        <>
          <LensRim cx={cx} cy={cy} radiusScale={iris} />
          <LensVignette cx={cx} cy={cy} radiusScale={iris} />
        </>
      ) : null}
      {swapping ? <AbsoluteFill style={{ background: `radial-gradient(circle at ${cx * 100}% ${cy * 100}%, rgba(0,0,0,0) ${0.475 * 1920 - 26}px, rgba(0,0,0,0.85) ${0.475 * 1920 - 2}px)` }} /> : null}
    </AbsoluteFill>
  );
};
