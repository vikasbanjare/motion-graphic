import { AbsoluteFill, Img, getStaticFiles, staticFile, useCurrentFrame } from "remotion";
import { useLayout } from "../layout";
import { storyboard } from "../storyboard";
import { popIn } from "../motion";
import { clamp01 } from "../timing";
import { MapsLogo, type MapsLogoVariant } from "./MapsLogo";

const LOGO_FILES = ["maps-logo.svg", "maps-logo.png", "maps-logo.webp", "maps-logo.jpg"];

/**
 * End card logo: MAPS Global Markets. Uses assets/maps-logo.{svg,png,webp,jpg}
 * when present (master artwork wins); otherwise the coded lock-up.
 * The "US STOCKS · NOW OPEN" line and its underline come from storyboard.json.
 */
export const LogoEndCard: React.FC<{ popFrame: number }> = ({ popFrame }) => {
  const frame = useCurrentFrame();
  const { width, height, portrait } = useLayout();
  const s = popIn(frame, popFrame, "pop", 0.5);
  const barReveal = clamp01((frame - popFrame - 6) / 8);
  const file = LOGO_FILES.find((n) => getStaticFiles().some((f) => f.name === n));
  const logoW = portrait ? width * 0.7 : width * 0.34;
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: (width - logoW) / 2,
          top: height * (portrait ? 0.4 : 0.43) - logoW * 0.3,
          width: logoW,
          transform: `scale(${s})`,
        }}
      >
        {file ? (
          <Img src={staticFile(file)} style={{ width: "100%", objectFit: "contain" }} />
        ) : (
          <MapsLogo width={logoW} variant={storyboard.logo.variant} barReveal={barReveal} />
        )}
      </div>
    </AbsoluteFill>
  );
};

export type { MapsLogoVariant };
