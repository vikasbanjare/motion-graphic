import React from "react";
import { AbsoluteFill } from "remotion";
import { linearTiming, type TransitionPresentation, type TransitionPresentationComponentProps } from "@remotion/transitions";
import { ease } from "./motion.ts";
import type { TransitionName } from "./themes.ts";

/**
 * Foreground-only transitions. Scenes are transparent over one continuous
 * background, so these move content, never the world behind it.
 */
type Props = { kind: Exclude<TransitionName, "cut">; axis: "x" | "y"; size: number; blurScale: number };

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const Presentation: React.FC<TransitionPresentationComponentProps<Props>> = ({
  children,
  presentationProgress: p,
  presentationDirection,
  passedProps: { kind, axis, size, blurScale },
}) => {
  const entering = presentationDirection === "entering";
  const v = Math.sin(Math.PI * p); // velocity proxy: 0 at ends, 1 mid-move
  let style: React.CSSProperties = {};

  if (kind === "push" || kind === "whip") {
    const whip = kind === "whip";
    const offset = (entering ? 1 - p : -p) * size * (whip ? 1 : 0.9);
    const t = axis === "y" ? `translate3d(0, ${offset}px, 0)` : `translate3d(${offset}px, 0, 0)`;
    const blur = v * (whip ? 26 : 9) * blurScale;
    style = {
      transform: whip ? `${t} scale(${1 - v * 0.05})` : t,
      filter: blur > 0.4 ? `blur(${blur.toFixed(2)}px)` : undefined,
      opacity: entering ? clamp01(p * 3) : clamp01((1 - p) * 3),
    };
  } else if (kind === "fade") {
    const o = entering ? clamp01((p - 0.4) / 0.6) : clamp01(1 - p / 0.6);
    const s = entering ? 1.025 - 0.025 * p : 1 - 0.025 * p;
    const blur = (1 - o) * 10 * blurScale;
    style = {
      opacity: o,
      transform: `scale(${s.toFixed(4)})`,
      filter: blur > 0.4 ? `blur(${blur.toFixed(2)}px)` : undefined,
    };
  } else if (kind === "blur") {
    // Blur dissolve: the old scene defocuses away, the new one focuses in. Calm, editorial.
    const o = entering ? clamp01((p - 0.3) / 0.7) : clamp01(1 - p / 0.7);
    const blur = (entering ? 1 - p : p) * 22 * blurScale;
    style = {
      opacity: o,
      transform: `scale(${(entering ? 1.015 - 0.015 * p : 1 - 0.01 * p).toFixed(4)})`,
      filter: blur > 0.4 ? `blur(${blur.toFixed(2)}px)` : undefined,
    };
  } else {
    // zoom: old scene rushes past the camera, new one settles in from depth.
    const s = entering ? 0.82 + 0.18 * p : 1 + 0.4 * p;
    const o = entering ? clamp01((p - 0.25) / 0.6) : clamp01(1 - p / 0.6);
    const blur = (entering ? 1 - p : p) * 18 * blurScale;
    style = {
      opacity: o,
      transform: `scale(${s.toFixed(4)})`,
      filter: blur > 0.4 ? `blur(${blur.toFixed(2)}px)` : undefined,
    };
  }

  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};

export const makeTransition = (
  kind: Exclude<TransitionName, "cut">,
  format: { width: number; height: number },
): TransitionPresentation<Props> => {
  const axis = format.height > format.width ? "y" : "x";
  return {
    component: Presentation,
    props: { kind, axis, size: axis === "y" ? format.height : format.width, blurScale: Math.min(format.width, format.height) / 1080 },
  };
};

export const transitionTiming = (frames: number) => linearTiming({ durationInFrames: frames, easing: ease.inOut });
