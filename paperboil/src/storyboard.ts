import raw from "./storyboard.json";
import type { BackdropSpec } from "./components/Backdrop";
import type { PaletteToken } from "./palette";
import { sec } from "./timing";

export type TransitionName =
  | "morph-match"
  | "carry-through"
  | "ribbon-wipe"
  | "ring-wipe"
  | "paint-burst"
  | "speed-whip"
  | "shrink-to-point"
  | "card-flick-stack"
  | "hard-cut-on-beat";

export type TransitionSpec = {
  name: TransitionName;
  frames: number;
  params: Record<string, unknown>;
};

export type Shot = {
  id: string;
  name: string;
  start: number;
  end: number;
  asset: string;
  ground: PaletteToken[];
  backdrop: BackdropSpec;
  light: boolean;
  layout: "split" | "center";
  push?: [number, number];
  marks: Record<string, number | number[]>;
  transitionOut: TransitionSpec;
};

export type TextKind = "kinetic" | "hero" | "super" | "card" | "endline" | "legal" | "flick";

export type TextEvent = {
  id: string;
  shot: string;
  text: string;
  start: number;
  end: number;
  kind: TextKind;
  weight: 400 | 600 | 800;
  color: PaletteToken;
  ground: PaletteToken;
  position: "split" | "top" | "center" | "card" | "card-1" | "card-2" | "below-logo" | "footer";
  size: number;
  underline?: PaletteToken;
  shadow?: PaletteToken;
  chip?: boolean;
  stamp?: boolean;
  tracking?: number;
  shiftAt?: number;
  shiftTo?: "upper";
  placeholder?: boolean;
  note?: string;
};

export type Caption = { start: number; end: number; text: string; burn?: boolean };

export type Storyboard = {
  meta: {
    title: string;
    fps: number;
    bpm: number;
    durationInFrames: number;
    dropSeconds: number;
    vacuum: { start: number; end: number };
    fontFamily: string;
  };
  shots: Shot[];
  text: TextEvent[];
  captions: Caption[];
  logo: { brand: string; variant: "bar-navy" | "bar-orange" | "text-navy" | "text-black"; variants: string[] };
  audio: { music: string; musicGainDb: number; vo: string | null; voDuckDb: number };
};

export const storyboard = raw as unknown as Storyboard;

export const shotFrom = (s: Shot): number => sec(s.start);
export const shotDuration = (s: Shot): number => sec(s.end) - sec(s.start);

export const getShot = (id: string): Shot => {
  const s = storyboard.shots.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown shot ${id}`);
  return s;
};

/** A mark's frame, relative to the start of its shot (what useCurrentFrame() returns inside the shot). */
export const markFrame = (s: Shot, name: string, index = 0): number => {
  const m = s.marks[name];
  if (m === undefined) throw new Error(`Shot ${s.id} has no mark "${name}"`);
  const t = Array.isArray(m) ? m[index] : m;
  return sec(t) - sec(s.start);
};

export const markFrames = (s: Shot, name: string): number[] => {
  const m = s.marks[name];
  if (!Array.isArray(m)) throw new Error(`Mark "${name}" in ${s.id} is not a list`);
  return m.map((t) => sec(t) - sec(s.start));
};
