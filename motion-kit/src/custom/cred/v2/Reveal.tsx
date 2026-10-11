import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Face } from "./CardFace.tsx";
import { asmPalAt } from "./Assembly.tsx";
import { LensVignette, Paper } from "./fx.tsx";
import { C, INK, T, lerp, ramp } from "./look.ts";

/**
 * Shots 3-5 in one take: guilloche field -> wash wipe -> parcel world assembles -> the world is revealed to be the
 * print on a card lying on an ink-blue slate (pull-back + roll + tilt, inks re-graded teal/ochre -> cyan/ink-blue,
 * darkness fades in, the card's security print cross-dissolves in), under a wide loupe at the lower right.
 * Sequence-local frame + T.stepC = film frame.
 */
const rv = Easing.bezier(0.7, 0, 0.25, 1);

export const RevealTake: React.FC = () => {
  const f = useCurrentFrame() + T.stepC;
  const p = interpolate(f, [T.reveal, T.reveal + 50], [0, 1], { ...C, easing: rv });
  const hold = Math.max(0, f - (T.reveal + 50));
  // log-scale zoom 1.18 -> 0.5
  const s = Math.exp(lerp(Math.log(1.18), Math.log(0.6), p)) * (1 + hold * 0.001);
  const rx = lerp(0, 40, p);
  const rz = lerp(0, -20, p) - hold * 0.2;
  const tx = lerp(0, 130, p) + hold * 0.6;
  const ty = lerp(0, 80, p) + hold * 0.3;
  const sec = ramp(f, T.reveal + 6, T.reveal + 30);
  const dark = ramp(f, T.reveal + 20, T.reveal + 52);
  const inks = asmPalAt(f);
  const glow = ramp(f, T.reveal + 22, T.reveal + 50);
  return (
    <AbsoluteFill style={{ background: INK.slate }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 70% 60% at 58% 60%, #1b2b47 0%, #0d1526 60%, #070b14 100%)" }} />
      <Paper heavy />
      <AbsoluteFill style={{ perspective: 1700, perspectiveOrigin: "58% 50%" }}>
        <AbsoluteFill
          style={{
            transform: `translate(${tx}px, ${ty}px) rotateZ(${rz}deg) rotateX(${rx}deg) scale(${s})`,
            transformOrigin: "50% 50%",
            filter: glow > 0 ? `drop-shadow(0 0 ${lerp(0, 16, glow)}px rgba(90,190,230,${0.55 * glow}))` : undefined,
          }}
        >
          <Face f={f} clip view={{ inks }} security={sec} ink="#16365f" fill="#cfe9f2" />
        </AbsoluteFill>
      </AbsoluteFill>
      {/* darkness: the slate world settles in around the card */}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 60% 55% at 58% 58%, rgba(5,8,14,0) 40%, rgba(5,8,14,0.65) 100%)", opacity: dark }} />
      <LensVignette r50={0.64} cx={0.57} cy={0.58} feather={2.6} opacity={ramp(f, T.reveal + 24, T.reveal + 50)} dark="4,6,10" />
    </AbsoluteFill>
  );
};
