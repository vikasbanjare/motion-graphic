import { measureText } from "@remotion/layout-utils";
import type { RichWord } from "./rich.ts";

/**
 * Auto-fit: find the largest font size at which the text wraps inside the box,
 * then re-wrap with balanced line lengths (no orphans). Every headline in the
 * kit goes through this, which is why long text can never overflow a frame.
 */
export type FitInput = {
  words: (RichWord | "\n")[];
  fontFamily: string;
  fontWeight: number;
  /** em */
  tracking?: number;
  upper?: boolean;
  maxWidth: number;
  maxHeight: number;
  maxSize: number;
  minSize?: number;
  lineHeight: number;
  maxLines?: number;
};

export type FitLine = { words: RichWord[]; width: number };
export type FitResult = {
  fontSize: number;
  lines: FitLine[];
  space: number;
  height: number;
  width: number;
  /** True when even the minimum size could not fit: the text is too long for its slot. */
  overflow: boolean;
};

const REF = 100;

const measure = (text: string, i: FitInput) =>
  measureText({
    text,
    fontFamily: i.fontFamily,
    fontSize: REF,
    fontWeight: String(i.fontWeight),
    letterSpacing: i.tracking ? `${i.tracking}em` : undefined,
    textTransform: i.upper ? "uppercase" : "none",
  }).width;

type Measured = { word: RichWord | "\n"; w: number };

const wrap = (items: Measured[], space: number, scale: number, width: number): FitLine[] => {
  const lines: FitLine[] = [];
  let cur: RichWord[] = [];
  let curW = 0;
  const push = () => {
    lines.push({ words: cur, width: curW });
    cur = [];
    curW = 0;
  };
  for (const it of items) {
    if (it.word === "\n") {
      push();
      continue;
    }
    const w = it.w * scale;
    const add = cur.length ? space * scale + w : w;
    if (cur.length && curW + add > width) push();
    curW += cur.length ? space * scale + w : w;
    cur.push(it.word);
  }
  if (cur.length || !lines.length) push();
  return lines;
};

export const fitText = (i: FitInput): FitResult => {
  const items: Measured[] = i.words.map((word) => ({ word, w: word === "\n" ? 0 : measure(word.text, i) }));
  const space = Math.max(measure("x x", i) - measure("xx", i), REF * 0.2);
  const widest = Math.max(1, ...items.map((m) => m.w));
  const maxLines = i.maxLines ?? 99;
  const width = i.maxWidth * 0.985;

  const fits = (size: number) => {
    const scale = size / REF;
    if (widest * scale > width) return false;
    const lines = wrap(items, space, scale, width);
    return lines.length <= maxLines && lines.length * size * i.lineHeight <= i.maxHeight;
  };

  let lo = i.minSize ?? 12;
  let hi = i.maxSize;
  if (fits(hi)) lo = hi;
  else {
    for (let k = 0; k < 18; k++) {
      const mid = (lo + hi) / 2;
      if (fits(mid)) lo = mid;
      else hi = mid;
    }
  }
  const fontSize = Math.floor(lo);
  const scale = fontSize / REF;
  let lines = wrap(items, space, scale, width);

  // Balance: shrink the wrap width as far as possible without adding a line.
  const target = lines.length;
  if (target > 1) {
    let a = width * 0.4;
    let b = width;
    for (let k = 0; k < 14; k++) {
      const mid = (a + b) / 2;
      if (wrap(items, space, scale, mid).length <= target) b = mid;
      else a = mid;
    }
    lines = wrap(items, space, scale, b);
  }

  return {
    overflow: !fits(fontSize),
    fontSize,
    lines,
    space: space * scale,
    height: lines.length * fontSize * i.lineHeight,
    width: Math.max(...lines.map((l) => l.width)),
  };
};
