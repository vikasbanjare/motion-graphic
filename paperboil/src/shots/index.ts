import type { Shot } from "../storyboard";
import { S10Tunnel, S6Zero, S7Door, S8Key, S9Through } from "./Door";
import { S1Phone, S2Tv, S3Search, S4Ride, S5Tap } from "./Hook";
import { S11Drop, S12Pick, S13Stack, S14Proof, S15LastDab, S16EndCard } from "./Payoff";

export const SHOT_COMPONENTS: Record<string, React.FC<{ shot: Shot }>> = {
  S1: S1Phone,
  S2: S2Tv,
  S3: S3Search,
  S4: S4Ride,
  S5: S5Tap,
  S6: S6Zero,
  S7: S7Door,
  S8: S8Key,
  S9: S9Through,
  S10: S10Tunnel,
  S11: S11Drop,
  S12: S12Pick,
  S13: S13Stack,
  S14: S14Proof,
  S15: S15LastDab,
  S16: S16EndCard,
};
