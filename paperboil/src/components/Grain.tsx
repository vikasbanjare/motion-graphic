import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "../palette";

/**
 * Film grain on every shot, plus the reference's right-edge tick marks and
 * dust specks on light shots.
 */
export const Grain: React.FC<{ light: boolean; enabled?: boolean }> = ({ light, enabled = true }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  if (!enabled) return null;
  const seed = (Math.floor(frame / 2) % 12) + 1;

  // Deterministic dust: positions hop every 5 frames.
  const dustSeed = Math.floor(frame / 5);
  const specks = Array.from({ length: 9 }, (_, i) => {
    const r = Math.sin((i + 1) * 9301 + dustSeed * 49297) * 233280;
    const r2 = Math.sin((i + 3) * 1013 + dustSeed * 7919) * 10000;
    return { x: (r - Math.floor(r)) * width, y: (r2 - Math.floor(r2)) * height, s: 1.5 + ((i * 7) % 4) };
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg width={width} height={height} style={{ position: "absolute", inset: 0, opacity: light ? 0.16 : 0.22, mixBlendMode: "overlay" }}>
        <filter id={`grain-${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency={0.9} numOctaves={2} seed={seed} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
      </svg>
      {light ? (
        <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
          {Array.from({ length: 14 }, (_, i) => (
            <line
              key={i}
              x1={width - 18}
              x2={width - (i % 5 === 0 ? 40 : 28)}
              y1={height * 0.12 + i * height * 0.055}
              y2={height * 0.12 + i * height * 0.055}
              stroke={palette.ink}
              strokeOpacity={0.35}
              strokeWidth={2}
            />
          ))}
          {specks.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.s} fill={palette.ink} fillOpacity={0.35} />
          ))}
        </svg>
      ) : null}
    </AbsoluteFill>
  );
};
