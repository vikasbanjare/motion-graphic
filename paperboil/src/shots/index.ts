import type { Shot } from "../storyboard";
import { C1Scroll, C2Stream, C3Search, C4Ride, C5Pay, C6Receipt } from "../c/Act1";
import { C10Tunnel, C7Locked, C8NotAnymore, C9Door } from "../c/Act2";
import { C11Drop, C12Pick, C13Stack, C14Proof, C15LastDab, C16End } from "../c/Act3";

/** Style C · Bold Cut-Paper Graphic (picked 2026-10-13). */
export const SHOT_COMPONENTS: Record<string, React.FC<{ shot: Shot }>> = {
  S1: C1Scroll,
  S2: C2Stream,
  S3: C3Search,
  S4: C4Ride,
  S5: C5Pay,
  S6: C6Receipt,
  S7: C7Locked,
  S8: C8NotAnymore,
  S9: C9Door,
  S10: C10Tunnel,
  S11: C11Drop,
  S12: C12Pick,
  S13: C13Stack,
  S14: C14Proof,
  S15: C15LastDab,
  S16: C16End,
};
