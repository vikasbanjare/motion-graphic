/**
 * <Lens>: loupe / magnifier vignette, measured on the reference (640x360 frames, scaled by H):
 *  - circle centred (offset 0..+1.3% W, 0..+5.5% H), 50% radius R50 = 0.814 H (293/360); diameter ~1.63 H, so it
 *    clips the top/bottom of a 16:9 frame and leaves dark only at the sides and corners.
 *  - edge: asymmetric S-ramp, brightness 0.98 at R50-0.139H, 0.51 at R50, 0.01 at R50+0.083H (table below).
 *  - outside: near-black, luma 10-13/255 (#0b0d0c), slightly tinted toward the scene.
 *  - NO barrel distortion (straight band edge flat within +-1 px out to r/R~1.0) and NO systematic chromatic
 *    aberration (per-channel 50% radii within +-4 px, sign inconsistent across scenes).
 *  - inner rim softening: high-frequency energy falls to ~0.45x by r/R 0.8 => gaussian sigma ~0.75 px at 360p
 *    (~2.2 px at 1080p) ramping from r/R 0.45 to 0.85; saturation dips ~-0.1 near the rim.
 *  - magnification comes from the CAMERA (push-ins under a fixed lens), not from the lens.
 *  - iris-in: radius from beyond the corner to ~R in ~0.25 s (expo-out) then a ~7% creep over 0.4 s.
 *    iris-out: accelerating (ease-in) 0.33-0.95 s, then cut.
 */
import React from "react";
import { AbsoluteFill, Easing, interpolate, useVideoConfig } from "remotion";

// [offset from R50 in units of H, vignette alpha] -- measured (mean of 4 scenes, spread <= 0.03)
export const LENS_EDGE: [number, number][] = [
  [-60, 0.001], [-50, 0.017], [-40, 0.037], [-35, 0.063], [-30, 0.093], [-25, 0.129], [-20, 0.173], [-15, 0.233],
  [-10, 0.307], [-5, 0.395], [0, 0.486], [5, 0.585], [10, 0.686], [15, 0.779], [20, 0.871], [25, 0.941], [30, 0.987], [35, 1],
].map(([d, a]) => [d / 360, a] as [number, number]);

export const LENS_DEFAULTS = { r50: 0.814, cx: 0.505, cy: 0.52, dark: "11,13,12", rimBlurPxAt1080: 2.2, rimSat: 0.75 };

/** Measured iris radius curves, normalised to the settled R50 (1.0). t in seconds from the start of the move. */
export const irisIn = (t: number) => {
  // 10.125s: >=1.24R (corner), 10.25: 1.15, 10.333: 1.10, 10.5: 1.04, 10.75: 1.0  (diag r50 367->276)
  return interpolate(t, [0, 0.083, 0.125, 0.208, 0.375, 0.625], [1.33, 1.21, 1.15, 1.098, 1.04, 1.0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
};
export const irisOut = (t: number, dur = 0.95) => {
  // 52.0->52.96 s: 296,300(0.25),308(0.5),329(0.75),367(0.96) => ease-in (accelerating)
  const u = Math.min(1, Math.max(0, t / dur));
  return 1 + 0.24 * Math.pow(u, 2.6);
};

export const Lens: React.FC<{
  children: React.ReactNode; radiusScale?: number; r50?: number; cx?: number; cy?: number; dark?: string;
  rimBlurPxAt1080?: number; rimSat?: number; darkOpacity?: number;
}> = ({ children, radiusScale = 1, r50 = LENS_DEFAULTS.r50, cx = LENS_DEFAULTS.cx, cy = LENS_DEFAULTS.cy, dark = LENS_DEFAULTS.dark,
  rimBlurPxAt1080 = LENS_DEFAULTS.rimBlurPxAt1080, rimSat = LENS_DEFAULTS.rimSat, darkOpacity = 1 }) => {
  const { width, height } = useVideoConfig();
  const R = r50 * height * radiusScale;
  const at = `${cx * width}px ${cy * height}px`;
  const stops = LENS_EDGE.map(([d, a]) => `rgba(${dark},${(a * darkOpacity).toFixed(3)}) ${Math.max(0, R + d * height).toFixed(1)}px`).join(", ");
  const blur = rimBlurPxAt1080 * (height / 1080);
  const sharpMask = `radial-gradient(circle at ${at}, #000 ${0.45 * R}px, transparent ${0.85 * R}px)`;
  return (
    <AbsoluteFill>
      {/* rim layer: slightly blurred + desaturated copy (visible toward the rim) */}
      <AbsoluteFill style={{ filter: `blur(${blur}px) saturate(${rimSat})` }}>{children}</AbsoluteFill>
      {/* sharp centre */}
      <AbsoluteFill style={{ WebkitMaskImage: sharpMask, maskImage: sharpMask }}>{children}</AbsoluteFill>
      {/* the loupe body */}
      <AbsoluteFill style={{ background: `radial-gradient(circle at ${at}, rgba(${dark},0) 0px, ${stops})`, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
