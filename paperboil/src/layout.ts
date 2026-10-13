import { useVideoConfig } from "remotion";

export type Layout = {
  width: number;
  height: number;
  portrait: boolean;
  /** 90% safe area (storyboard §3: formats). */
  safe: { x: number; y: number; w: number; h: number };
  /** Where the 1000×1000 art box sits for a given shot layout. */
  artBox: (layout: "split" | "center") => { x: number; y: number; size: number };
  /** Where split-layout kinetic words sit. */
  splitText: { x: number; y: number; w: number; h: number };
};

export const ART = 1000;

export const useLayout = (): Layout => {
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  const safe = { x: width * 0.05, y: height * 0.05, w: width * 0.9, h: height * 0.9 };

  const artBox: Layout["artBox"] = (layout) => {
    if (layout === "center") {
      const size = Math.min(width, height);
      return { x: (width - size) / 2, y: (height - size) / 2, size };
    }
    if (portrait) {
      const size = width * 0.92;
      return { x: (width - size) / 2, y: height * 0.1, size };
    }
    const size = height * 0.92;
    return { x: width * 0.06, y: (height - size) / 2, size };
  };

  const splitText = portrait
    ? { x: safe.x, y: height * 0.6, w: safe.w, h: height * 0.18 }
    : { x: width * 0.56, y: height * 0.3, w: width * 0.39, h: height * 0.4 };

  return { width, height, portrait, safe, artBox, splitText };
};
