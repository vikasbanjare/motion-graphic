/**
 * CRED IndusInd Bank RuPay credit card: v4, about 25 s (601 frames, 24 fps, 1920x1080).
 * UNOFFICIAL SPEC WORK. Not made, approved or commissioned by CRED or IndusInd Bank.
 *
 * v3's clear story and text, with v2's 3D chain the user liked put back, and the pace tightened:
 *   0-56     intro: the pen draws the card, "introducing"           (v3, replayed 1.6x faster)
 *   56-124   the card's name                                          (v3, 1.3x)
 *   124-223  hard cut into the loupe close-up of the card's foil band "5% rewards on online shopping", push-through,
 *            lens swap                                                (v2 MacroTake, unchanged)
 *   207-298  route map tilts up into the 3D globe world, "redeem on flights and hotels" (v2 TravelTake, unchanged)
 *   298-370  coins drop onto the shelf, each product lights up, "and 2,000+ products / on CRED store" (v3)
 *   370-446  one lens move onto the "₹0" fee tag, "zero joining fee" (v3, 1.2x)
 *   446-526  the flat print card becomes the real 3D card            (v3, 1.15x)
 *   526-601  lockup: CRED's own logo file + the card's name          (v3)
 * Sources, fonts and asset licences: CredCardV2.tsx and CredCardV3.tsx headers.
 */
import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Head, V3Film } from "./CredCardV3.tsx";
import { MacroTake } from "./v2/Macro.tsx";
import { TravelTake } from "./v2/Travel.tsx";

export const CRED_V4_FRAMES = 601;

/** v4 frame -> v3 frame, piecewise linear (each piece replays a v3 beat at its own speed). */
const MAP: [number, number, number, number][] = [
  [0, 56, 0, 92],
  [56, 124, 92, 180],
  [298, 370, 386, 461],
  [370, 446, 461, 553],
  [446, 526, 553, 645],
  [526, 601, 645, 720],
];
const toV3 = (f: number) => {
  for (const [a, b, c, d] of MAP) if (f >= a && f < b) return interpolate(f, [a, b], [c, d]);
  return null;
};

export const CredCardV4: React.FC = () => {
  const f = useCurrentFrame();
  const v3 = toV3(f);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {v3 !== null && <V3Film f={v3} />}
      <Sequence from={124} durationInFrames={99} name="v2 loupe macro, push-through, lens swap">
        <MacroTake />
      </Sequence>
      <Sequence from={207} durationInFrames={91} name="v2 route map tilts up into the globe world">
        <TravelTake />
      </Sequence>
      {f >= 124 && f < 214 && (
        <Head f={f} from={130} to={206} big={["5% rewards"]} small="on online shopping" x={110} y={90} ink="#14304d" sheen="#5d8fb0" size={104} />
      )}
      <Audio src={staticFile("custom/cred-v4/mix.wav")} />
    </AbsoluteFill>
  );
};
