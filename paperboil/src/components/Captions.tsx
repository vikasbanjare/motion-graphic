import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FONT_FAMILY } from "../fonts";
import { useLayout } from "../layout";
import { palette } from "../palette";
import { storyboard } from "../storyboard";
import { sec } from "../timing";

/**
 * Burned-in captions from storyboard.json. Lines marked `burn: false` are
 * already on screen as a super, so they are not doubled up.
 */
export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { height, portrait, safe } = useLayout();
  const line = storyboard.captions.find((c) => c.burn !== false && frame >= sec(c.start) && frame < sec(c.end));
  if (!line) return null;
  const fontSize = portrait ? height * 0.024 : height * 0.036;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: safe.x,
          width: safe.w,
          top: portrait ? height * 0.8 : height * 0.84,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: safe.w * 0.86,
            background: "rgba(0, 32, 66, 0.82)",
            color: palette.cream,
            fontFamily: FONT_FAMILY,
            fontWeight: 600,
            fontSize,
            lineHeight: 1.25,
            padding: `${fontSize * 0.28}px ${fontSize * 0.6}px`,
            borderRadius: fontSize * 0.4,
            textAlign: "center",
          }}
        >
          {line.text}
        </div>
      </div>
    </AbsoluteFill>
  );
};
