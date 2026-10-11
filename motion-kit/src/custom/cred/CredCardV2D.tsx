/**
 * CRED IndusInd Bank RuPay credit card: v2 detailing pass ("v2D"). Same film, same timing and storyboard as
 * CredCardV2 (the one the user liked); every engraved surface gets closer to banknote illustration: cross-hatched
 * shadows, stippled lights, lines that follow the form. UNOFFICIAL SPEC WORK.
 */
import React from "react";
import { CredCardV2, CRED_V2_FRAMES } from "./CredCardV2.tsx";
import { Detail } from "./v2/three.tsx";

export const CRED_V2D_FRAMES = CRED_V2_FRAMES;
export const DETAIL = { hatch: 0.75, hatchT: 0.4, stipple: 0.55, follow: 0.55, detail: 0.22, maps: true, gltfFollow: 0 };

export const CredCardV2D: React.FC = () => (
  <Detail.Provider value={DETAIL}>
    <CredCardV2 />
  </Detail.Provider>
);
