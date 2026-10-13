import { interpolate as flubber } from "flubber";
import { useMemo } from "react";
import { palette } from "../palette";

const cache = new Map<string, (t: number) => string>();
const interp = (a: string, b: string) => {
  const k = `${a}|${b}`;
  let fn = cache.get(k);
  if (!fn) {
    fn = flubber(a, b, { maxSegmentLength: 8 });
    cache.set(k, fn);
  }
  return fn;
};

type MorphProps = {
  from: string;
  to: string;
  /** 0 → 1. Reference morphs are fast: 3–5 frames, swapped at peak velocity. */
  p: number;
  fillFrom: string;
  fillTo: string;
  ink?: string;
  inkWidth?: number;
};

/**
 * Silhouette morph between two shapes (flubber), drawn in the art box with an
 * ink line. Fill colour blends across the morph. Used for the fast
 * object-to-object match cuts (TV → search pill, magnifier → pin, 0 → door).
 */
export const Morph: React.FC<MorphProps> = ({ from, to, p, fillFrom, fillTo, ink = palette.ink, inkWidth = 7 }) => {
  const fn = useMemo(() => interp(from, to), [from, to]);
  const t = Math.min(1, Math.max(0, p));
  return (
    <svg width={1000} height={1000} viewBox="0 0 1000 1000" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <path d={fn(t)} fill={t < 0.5 ? fillFrom : fillTo} stroke={ink} strokeWidth={inkWidth} strokeLinejoin="round" />
    </svg>
  );
};
