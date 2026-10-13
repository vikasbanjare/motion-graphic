import { AbsoluteFill, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "../fonts";
import { palette as P } from "../palette";

/**
 * STYLE C — "Bold Cut-Paper Graphic". Flat cut-paper shapes with real drop
 * shadows, halftone shading, oversized type that bleeds off frame. Swiss
 * discipline, poster energy.
 */
const Halftone: React.FC<{ id: string; color: string; size?: number }> = ({ id, color, size = 14 }) => (
  <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
    <circle cx={size / 2} cy={size / 2} r={size * 0.28} fill={color} />
  </pattern>
);

export const StyleCHero: React.FC = () => {
  const { width: W, height: H } = useVideoConfig();
  const shadow = "drop-shadow(10px 14px 0 rgba(0,32,66,0.22))";
  return (
    <AbsoluteFill style={{ background: P.cream }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <Halftone id="ht-orange" color={P.orangeDeep} />
          <Halftone id="ht-navy" color={P.ink} size={12} />
        </defs>
        <g style={{ filter: shadow }}>
          <circle cx={W * 0.68} cy={H * 0.5} r={H * 0.62} fill={P.orange} />
        </g>
        <circle cx={W * 0.68} cy={H * 0.5} r={H * 0.62} fill="url(#ht-orange)" opacity={0.35} clipPath="inset(50% 0 0 0)" />
        <g style={{ filter: shadow }}>
          <polygon points={`0,${H * 0.72} ${W},${H * 0.32} ${W},${H * 0.52} 0,${H * 0.92}`} fill={P.navy} />
        </g>
        <polygon points={`0,${H * 0.72} ${W},${H * 0.32} ${W},${H * 0.52} 0,${H * 0.92}`} fill="url(#ht-navy)" opacity={0.35} />
        <g style={{ filter: shadow }}>
          <rect x={W * 0.08} y={H * 0.1} width={W * 0.06} height={H * 0.06} fill={P.blueBright} transform={`rotate(12 ${W * 0.11} ${H * 0.13})`} />
          <circle cx={W * 0.9} cy={H * 0.86} r={H * 0.05} fill={P.sky} />
        </g>
      </svg>
      <div style={{ position: "absolute", left: W * 0.05, top: H * 0.06, fontFamily: FONT_FAMILY, fontWeight: 800, color: P.navy, lineHeight: 0.82, letterSpacing: "-0.04em", filter: shadow }}>
        <div style={{ fontSize: H * 0.48 }}>US</div>
        <div style={{ fontSize: H * 0.3, color: P.cream, WebkitTextStroke: `4px ${P.navy}` }}>STOCKS</div>
      </div>
      <div style={{ position: "absolute", right: W * 0.06, bottom: H * 0.08, textAlign: "right", fontFamily: FONT_FAMILY, color: P.cream }}>
        <div style={{ fontWeight: 600, fontSize: H * 0.03, letterSpacing: "0.3em" }}>NOW ON</div>
        <div style={{ fontWeight: 800, fontSize: H * 0.1, letterSpacing: "-0.02em", fontStyle: "normal", transform: "skewX(-12deg)", color: P.cream }}>MAPS</div>
      </div>
    </AbsoluteFill>
  );
};
