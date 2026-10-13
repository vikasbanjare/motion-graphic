import { S10Drop, S11Pick, S12Stack, S13Proof, S14LastDab, S15EndCard } from "./Payoff";
import { S6Zero, S7Door, S8Key, S9Light } from "./Door";
import { S1Phone, S2Tv, S3Search, S4Ride, S5Tap } from "./Hook";
import type { Shot } from "../storyboard";

export const SHOT_COMPONENTS: Record<string, React.FC<{ shot: Shot }>> = {
  S1: S1Phone,
  S2: S2Tv,
  S3: S3Search,
  S4: S4Ride,
  S5: S5Tap,
  S6: S6Zero,
  S7: S7Door,
  S8: S8Key,
  S9: S9Light,
  S10: S10Drop,
  S11: S11Pick,
  S12: S12Stack,
  S13: S13Proof,
  S14: S14LastDab,
  S15: S15EndCard,
};
