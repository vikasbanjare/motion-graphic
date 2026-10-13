import { paper } from "@remotion/effects/paper";
import { AbsoluteFill, Solid, useVideoConfig } from "remotion";

/**
 * Remotion paper() texture (grain, fibres, crumples, folds, speckles) laid
 * over the whole frame with a multiply blend, so every painted layer sits on
 * the same sheet. Needs WebGL2 (--gl=angle).
 */
export const PaperTexture: React.FC<{ amount?: number }> = ({ amount = 0.32 }) => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ mixBlendMode: "multiply", pointerEvents: "none" }}>
      <Solid
        width={width}
        height={height}
        color="#ffffff"
        effects={[
          paper({
            amount,
            colorBack: "#ffffff",
            colorFront: "#d8ccb4",
            folds: 0.3,
            drops: 0.2,
            scale: 0.6,
            seed: 6,
          }),
        ]}
      />
    </AbsoluteFill>
  );
};
