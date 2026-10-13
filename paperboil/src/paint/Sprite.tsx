import { useLayoutEffect, useRef } from "react";
import { useCurrentFrame } from "remotion";
import { BOIL_VARIANTS, getSprite, type DrawFn } from "./engine";

export type SpriteProps = {
  /** Cache key — must be unique per drawing. */
  id: string;
  w: number;
  h: number;
  draw: DrawFn;
  /** Position inside the 1000×1000 art box (top-left). */
  x?: number;
  y?: number;
  style?: React.CSSProperties;
  /** Freeze the boil (e.g. the S9 vacuum freeze). */
  freeze?: boolean;
  /** Boil step in frames: 3 = 10 fps (storyboard §6). */
  boilEvery?: number;
};

/**
 * A p5.brush-painted object. The boil comes from cycling 4 separately painted
 * variants at 10 fps, i.e. it is genuinely re-painted rather than warped.
 */
export const Sprite: React.FC<SpriteProps> = ({ id, w, h, draw, x = 0, y = 0, style, freeze, boilEvery = 3 }) => {
  const frame = useCurrentFrame();
  const ref = useRef<HTMLCanvasElement>(null);
  const variant = freeze ? 0 : Math.floor(frame / boilEvery) % BOIL_VARIANTS;

  useLayoutEffect(() => {
    const c = ref.current;
    if (!c) return;
    const src = getSprite(id, w, h, variant, draw);
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(src, 0, 0);
  }, [id, w, h, variant, draw]);

  return (
    <canvas
      ref={ref}
      width={w}
      height={h}
      style={{ position: "absolute", left: x, top: y, width: w, height: h, ...style }}
    />
  );
};
