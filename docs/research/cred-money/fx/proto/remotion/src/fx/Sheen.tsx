/**
 * Headline sheen (measured on "monitor your cash flow"): base ink + a second colour in a gaussian band
 * (sigma ~0.047 W, ~26% of the ink) drifting left->right at ~0.025 W/s (16 px/s @640 wide, ~48 px/s @1920).
 * It is a slow travelling gradient, not a fast glint.
 */
import React from "react";
export const SheenText: React.FC<{ children: React.ReactNode; t: number; ink: string; sheen: string; frameWidth: number; startX?: number; speedW?: number; sigmaW?: number; style?: React.CSSProperties }> = ({
  children, t, ink, sheen, frameWidth, startX = 0.3, speedW = 0.025, sigmaW = 0.047, style }) => {
  const c = (startX + speedW * t) * frameWidth, s = sigmaW * frameWidth;
  const bg = `linear-gradient(90deg, ${ink} ${c - 2.5 * s}px, ${sheen} ${c - 0.6 * s}px, ${sheen} ${c + 0.6 * s}px, ${ink} ${c + 2.5 * s}px)`;
  return <span style={{ background: bg, backgroundAttachment: "fixed", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", ...style }}>{children}</span>;
};
