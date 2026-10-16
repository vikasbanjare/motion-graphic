/**
 * Paper texture + grain as a static SVG turbulence overlay (soft-light).
 * Measured: the reference has NO animated grain (frame-to-frame noise 0.02-0.17 levels in static holds), so seed
 * is fixed by default. Intro paper: ~1 level std per octave from 2 to 60 px at 1080p (flat spectrum, ~2.3 levels
 * total = 0.9%). Banknote/seal paper is much stronger (mottle ~12-15 levels, sibling 'engraving' measurement).
 * Defaults (mottle .035 @ .015, grain .10 @ .10, 1920x1080) reproduce the intro paper's per-octave texture energy
 * within 0.87-1.28x after a 640x360 H.264 round trip (RMS log error 0.17). Scale mottle ~x5 for banknote paper.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
export const Paper: React.FC<{ id?: string; mottle?: number; grain?: number; mottleFreq?: number; grainFreq?: number; animatedGrain?: boolean; seed?: number; blend?: React.CSSProperties["mixBlendMode"] }> = ({
  id = "paper", mottle = 0.035, grain = 0.1, mottleFreq = 0.015, grainFreq = 0.1, animatedGrain = false, seed = 7, blend = "soft-light" }) => {
  const frame = useCurrentFrame();
  const gseed = animatedGrain ? seed + frame : seed;
  // slope s around 0.5 keeps mean neutral for soft-light; s ~= 2*target_std/noise_std
  const lin = (s: number) => ({ slope: s, intercept: 0.5 - s * 0.5 });
  return (
    <AbsoluteFill style={{ mixBlendMode: blend, pointerEvents: "none" }}>
      <svg width="100%" height="100%">
        <filter id={`${id}-m`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency={mottleFreq} numOctaves={5} seed={seed} />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer><feFuncR type="linear" {...lin(mottle * 10)} /><feFuncG type="linear" {...lin(mottle * 10)} /><feFuncB type="linear" {...lin(mottle * 10)} /><feFuncA type="linear" slope={0} intercept={1} /></feComponentTransfer>
        </filter>
        <filter id={`${id}-g`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency={grainFreq} numOctaves={2} seed={gseed} />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer><feFuncR type="linear" {...lin(grain * 10)} /><feFuncG type="linear" {...lin(grain * 10)} /><feFuncB type="linear" {...lin(grain * 10)} /><feFuncA type="linear" slope={0} intercept={1} /></feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter={`url(#${id}-m)`} />
        <rect width="100%" height="100%" filter={`url(#${id}-g)`} style={{ mixBlendMode: "overlay" }} />
      </svg>
    </AbsoluteFill>
  );
};
