/**
 * CRED IndusInd Bank RuPay credit card: v2 detailing pass ("v2D"). Same film, same timing and storyboard as
 * CredCardV2 (the one the user liked); every engraved surface gets closer to banknote illustration: cross-hatched
 * shadows, stippled lights, lines that follow the form. UNOFFICIAL SPEC WORK.
 */
import React from "react";
import { CredCardV2, CRED_V2_FRAMES } from "./CredCardV2.tsx";
import { Detail } from "./v2/three.tsx";

export const CRED_V2D_FRAMES = CRED_V2_FRAMES;
// the look of the user's target sheet: a finer screen (period x0.72), cross-hatched shadows, stipple in the lights, and a
// watercolour tone wash under the lines so forms read as shaded illustration rather than a line screen
export const DETAIL = { hatch: 0.55, hatchT: 0.4, stipple: 0.7, follow: 0.5, detail: 0.1, wash: 0.6, periodScale: 0.45, edge: 1.0, maps: true, gltfFollow: 0 };

export const CredCardV2D: React.FC = () => (
  <Detail.Provider value={DETAIL}>
    <CredCardV2 />
  </Detail.Provider>
);
