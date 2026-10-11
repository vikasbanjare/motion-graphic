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
export const DETAIL = { hatch: 0.7, hatchT: 0.42, stipple: 0.5, follow: 0.5, detail: 0.2, wash: 0.42, periodScale: 0.72, maps: true, gltfFollow: 0 };

export const CredCardV2D: React.FC = () => (
  <Detail.Provider value={DETAIL}>
    <CredCardV2 />
  </Detail.Provider>
);
