import React from "react";
import { CredCardV2, CRED_V2_FRAMES } from "./CredCardV2.tsx";
import { Detail } from "./v2/three.tsx";
import { DETAIL } from "./CredCardV2D.tsx";

/**
 * v3: the v2D film with the painted pass (p5.brush watercolour washes and pencil silhouettes traced from per-object
 * masks of the 3D worlds, under the engraved render). UNOFFICIAL SPEC WORK.
 */
export const CRED_V3P_FRAMES = CRED_V2_FRAMES;
export const DETAIL_V3 = { ...DETAIL, paint: true };
export const CredCardV3P: React.FC = () => (
  <Detail.Provider value={DETAIL_V3}>
    <CredCardV2 />
  </Detail.Provider>
);
