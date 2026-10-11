import React, { useContext, useMemo } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import * as THREE from "three";
import { Cam, Detail, EMesh, RefDepth, World } from "./three.tsx";
import { airliner, luggageTag } from "./models3.ts";
import { ribbon } from "./detail.ts";
import { AssemblyWorld } from "./Assembly.tsx";
import { Field } from "./Opening.tsx";
import { BandLines, LensRim, LensVignette, LinePattern, Paper, bandGradient } from "./fx.tsx";
import { C, P, SANS, SERIF, T, lerp, ramp } from "./look.ts";

/**
 * Loupe macro on the card's holographic strip (hard cut in, text already present). The strip runs diagonally and the
 * camera reads it by panning along it (CRITIQUE 5: not a frontal centred read). Then a push-through along the strip
 * (scale x2.85, ease-in to a peak between beats, decelerating under the lens-swap drop that brings the next world).
 */
const ANG = -24; // band angle on screen (deg; negative = rising to the right)
const BH = 124; // band height px (8.9-11 % H)
const rad = (ANG * Math.PI) / 180;
const DIR = { x: Math.cos(rad), y: Math.sin(rad) };

/** v2D: a paper luggage tag with a cord and a stamped airliner roundel on engraved fabric, the push-through's destination. */
const TagWorld: React.FC<{ f: number }> = ({ f }) => {
  const g = useMemo(() => {
    const t = luggageTag();
    const a = airliner();
    return { tag: t.body, stamp: t.stamp, plane: a.body, glass: a.glass, cloth: new THREE.PlaneGeometry(14, 9, 1, 1) };
  }, []);
  const pal = P.cyanDeep;
  const sway = 0.03 * Math.sin((f - T.push) / 9);
  return (
    <>
      <Cam pos={[0.4, 0.9, 4.6]} target={[0.1, 0.05, 0]} fov={34} roll={-0.08} />
      <EMesh g={g.cloth} m={{ palette: pal, periodFrac: 0.009, map: ribbon(9), mapAmt: 0.8, angleDeg: 38, seed: 40, albedo: 0.72, edge: 0, hatch: 0.8 }} live={{ pal }} pos={[0, -0.3, -0.6]} rot={[-0.35, 0, 0]} />
      <group rotation={[-0.32, 0.12, -0.14 + sway]} position={[0, 0, 0]}>
        <EMesh g={g.tag} m={{ palette: P.cyan, periodFrac: 0.0068, angleDeg: 45, seed: 41, albedo: 1.25, lift: 0.18, edge: 0.6, stipple: 0.5 }} live={{ pal: P.cyan }} double />
        <EMesh g={g.stamp} m={{ palette: pal, periodFrac: 0.0068, seed: 42, albedo: 0.5, edge: 0 }} live={{ pal }} />
        <group position={[-0.6, 0.05, 0.09]} rotation={[Math.PI / 2, 0, -0.5]} scale={0.055}>
          <EMesh g={g.plane} m={{ palette: pal, periodFrac: 0.0068, seed: 43, albedo: 0.55, edge: 0.3 }} live={{ pal }} />
        </group>
      </group>
    </>
  );
};

export const MacroTake: React.FC = () => {
  const lf = useCurrentFrame();
  const f = lf + T.cutMacro;
  const dm = useContext(Detail).maps === true;
  const tagIn = dm ? ramp(f, T.push + 2, T.push + 16) : 0;
  // read: slow pan along the band (content travels toward lower-left)
  const pan = lerp(140, -60, interpolate(f, [T.cutMacro, T.push + 4], [0, 1], C));
  // push-through: ease-in cubic to a peak ~ f283, then expo-out (still decelerating under the swap)
  const pu = interpolate(f, [T.push, T.swap + 14], [0, 1], { ...C, easing: Easing.bezier(0.55, 0, 0.35, 1) });
  const s = Math.exp(Math.log(2.85) * pu);
  const travel = -1250 * pu; // along the band: text exits left through the lens edge
  const vel = Math.abs(interpolate(f + 1, [T.push, T.swap + 14], [0, 1], { ...C, easing: Easing.bezier(0.55, 0, 0.35, 1) }) - pu);
  const blur = Math.min(6, vel * 90);
  const ox = (pan + travel) * DIR.x, oy = (pan + travel) * DIR.y;
  const glintX = interpolate(f, [T.cutMacro + 14, T.push + 2], [-0.25, 1.15], C);
  const inks = { a: P.cyan, b: P.cyanDeep, hero: [["#14315c", 0], ["#4c8fc0", 0.5], ["#cbe9f4", 1]] as [string, number][] };
  const tf = `translate(${ox}px, ${oy}px) scale(${s})`;
  const content = (
    <AbsoluteFill style={{ background: "#d6eef4" }}>
      {tagIn > 0 ? (
        // v2D: the luggage tag world sits behind the moving band with its own slow push (not the band's 2.85x)
        <AbsoluteFill style={{ opacity: tagIn, background: "#d6eef4", transform: `scale(${1 + 0.18 * pu})`, transformOrigin: "50% 55%" }}>
          <World>
            <TagWorld f={f} />
          </World>
        </AbsoluteFill>
      ) : null}
      <AbsoluteFill style={{ transform: tf, transformOrigin: "64% 46%", filter: blur > 0.3 ? `blur(${blur.toFixed(2)}px)` : undefined, opacity: 1 - tagIn }}>
        {/* magnified field + parcels (coarser screen: 2.0 % H, the macro period) */}
        <AbsoluteFill style={{ transform: "scale(2.4) rotate(18deg)", transformOrigin: "40% 30%" }}>
          <Field f={T.reveal} inkOverride="#5d8fb0" />
        </AbsoluteFill>
        <AbsoluteFill style={{ background: "#bfe3ee", mixBlendMode: "multiply", opacity: 0.55 }} />
        <World>
          <RefDepth.Provider value={8}>
            <AssemblyWorld f={T.reveal} settled inks={inks} periodFrac={0.02} camZ={6.2} camX={-1.4 + lf * 0.004} camY={-1.6} fov={34} roll={0.3} />
          </RefDepth.Provider>
        </World>
      </AbsoluteFill>
      <AbsoluteFill style={{ transform: tf, transformOrigin: "64% 46%", filter: blur > 0.3 ? `blur(${blur.toFixed(2)}px)` : undefined }}>
        {/* the strip, read along its length */}
        <div style={{ position: "absolute", left: 960 - 1800, top: 560 - BH / 2, width: 3600, height: BH, transform: `rotate(${ANG}deg)`, transformOrigin: "50% 50%" }}>
          <div style={{ position: "absolute", inset: 0, ...bandGradient(5, 0), boxShadow: "0 0 0 2px rgba(255,255,255,0.4), 0 0 26px rgba(40,90,140,0.35)" }} />
          <BandLines width={3600} height={BH} opacity={0.4} />
          {/* travelling specular glint (screen) */}
          <div style={{ position: "absolute", top: -BH, height: BH * 3, width: 420, left: 1350 + glintX * 1500 - 210, background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,255,255,0.75), rgba(255,255,255,0) 70%)", mixBlendMode: "screen", opacity: 0.35 }} />
          <div style={{ position: "absolute", left: 1385, top: 0, height: BH, display: "flex", alignItems: "center", gap: 34, whiteSpace: "nowrap" }}>
            <svg width={190} height={BH} style={{ overflow: "visible" }}>
              <defs>
                <LinePattern id="numHatch" pitch={6} width={2.6} color="#ffffff" angle={45} />
              </defs>
              <text x={0} y={BH * 0.79} fontFamily={SERIF} fontWeight={700} fontSize={BH * 1.02} fill="url(#numHatch)" stroke="#fff" strokeWidth={2.2} style={{ fontVariationSettings: "'opsz' 72" }}>5%</text>
            </svg>
            <span style={{ fontFamily: SANS, fontWeight: 500, fontSize: 44, letterSpacing: "0.43em", color: "#fff", textShadow: "0 0 8px rgba(255,255,255,.35)" }}>REWARDS ON ONLINE SHOPPING</span>
          </div>
        </div>
      </AbsoluteFill>
      <Paper id="macro" mottle={0.03} grain={0.08} />
    </AbsoluteFill>
  );
  return (
    <AbsoluteFill style={{ background: "#0b0d0c" }}>
      {content}
      <LensRim />
      <LensVignette opacity={1} />
    </AbsoluteFill>
  );
};
