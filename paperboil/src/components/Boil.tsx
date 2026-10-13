import { useId } from "react";
import { useCurrentFrame } from "remotion";

// Variant offsets from the boil technique (C. Visini, "Simulating hand-drawn
// motion with SVG filters"): one per step of a 4-variant cycle.
const OFFSETS = [-0.02, 0.01, -0.01, 0.02];

type BoilProps = {
  children: React.ReactNode;
  /** Displacement scale in px. 4–8 reads as hand-made at 1080p. */
  scale?: number;
  /** feTurbulence base frequency (~0.02–0.03). */
  baseFrequency?: number;
  /** Hold each variant for N frames: 3 = 10 fps. */
  every?: number;
  disabled?: boolean;
  style?: React.CSSProperties;
};

/**
 * SVG feTurbulence + feDisplacementMap wobble, stepped at 10 fps with a
 * 4-variant cycle. Painted sprites already boil by re-painting; this filter
 * adds the same wobble to typeset and vector layers so the whole frame moves
 * as one hand.
 */
export const Boil: React.FC<BoilProps> = ({ children, scale = 6, baseFrequency = 0.025, every = 3, disabled, style }) => {
  const frame = useCurrentFrame();
  const id = `boil-${useId().replace(/:/g, "")}`;
  const variant = Math.floor(frame / every) % OFFSETS.length;
  // Offsets are relative to the base frequency so the grain size stays stable.
  const freq = baseFrequency * (1 + OFFSETS[variant] * 10);
  if (disabled) return <div style={{ position: "absolute", inset: 0, ...style }}>{children}</div>;
  return (
    <div style={{ position: "absolute", inset: 0, filter: `url(#${id})`, ...style }}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves={2} seed={variant + 1} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={scale} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      {children}
    </div>
  );
};
