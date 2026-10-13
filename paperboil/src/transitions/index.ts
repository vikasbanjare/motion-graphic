import type { TransitionName } from "../storyboard";
import { cardFlickStack } from "./card-flick-stack";
import { carryThrough } from "./carry-through";
import { hardCutOnBeat } from "./hard-cut-on-beat";
import { morphMatch } from "./morph-match";
import { paintBurst } from "./paint-burst";
import { ribbonWipe } from "./ribbon-wipe";
import { ringWipe } from "./ring-wipe";
import { shrinkToPoint } from "./shrink-to-point";
import { speedWhip } from "./speed-whip";
import { cardLand } from "./card-land";
import { echoBurst } from "./echo-burst";
import { fastMorph } from "./fast-morph";
import { pushInto } from "./push-into";
import { scatter } from "./scatter";
import { slideOff } from "./slide-off";
import type { TransitionImpl } from "./types";

export const TRANSITIONS: Record<TransitionName, TransitionImpl> = {
  "morph-match": morphMatch,
  "carry-through": carryThrough,
  "ribbon-wipe": ribbonWipe,
  "ring-wipe": ringWipe,
  "paint-burst": paintBurst,
  "speed-whip": speedWhip,
  "shrink-to-point": shrinkToPoint,
  "card-flick-stack": cardFlickStack,
  "hard-cut-on-beat": hardCutOnBeat,
  "push-into": pushInto,
  "fast-morph": fastMorph,
  scatter,
  "echo-burst": echoBurst,
  "card-land": cardLand,
  "slide-off": slideOff,
};

export type { TransitionCtx, TransitionImpl } from "./types";
