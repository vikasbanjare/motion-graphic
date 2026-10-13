import { FONT_FAMILY } from "../fonts";
import { palette } from "../palette";

export type MapsLogoVariant = "bar-navy" | "bar-orange" | "text-navy" | "text-black";

type Props = {
  /** Logo width in px; everything scales from it. */
  width: number;
  variant?: MapsLogoVariant;
  /** 0→1 reveal of the "Global Markets" bar (draws in from the left). */
  barReveal?: number;
};

/**
 * MAPS Global Markets lock-up rebuilt in code from the supplied logo sheet:
 * oblique heavy "MAPS" in MAPS orange over "Global Markets", either on a
 * slanted bar (navy / orange) or as a plain line (navy / black).
 * A stand-in until the master SVG/PNG is dropped at assets/maps-logo.svg|png —
 * LogoEndCard then uses the file instead.
 */
export const MapsLogo: React.FC<Props> = ({ width, variant = "bar-navy", barReveal = 1 }) => {
  const mapsSize = width * 0.33;
  const subSize = width * 0.075;
  const onBar = variant.startsWith("bar");
  const barColor = variant === "bar-orange" ? palette.orange : palette.navy;
  const subColor = onBar ? "#ffffff" : variant === "text-navy" ? palette.navy : "#111111";
  return (
    <div style={{ position: "relative", width, height: width * 0.56, fontFamily: FONT_FAMILY }}>
      <div
        style={{
          position: "absolute",
          left: width * 0.02,
          top: 0,
          fontWeight: 800,
          fontSize: mapsSize,
          lineHeight: 1,
          letterSpacing: "-0.035em",
          color: palette.orange,
          transform: "skewX(-13deg)",
          transformOrigin: "0 100%",
        }}
      >
        MAPS
      </div>
      {onBar ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: mapsSize * 1.0,
            width: width * 0.98,
            height: subSize * 1.45,
            background: barColor,
            transform: "skewX(-13deg)",
            clipPath: `inset(0 ${(1 - barReveal) * 100}% 0 0)`,
          }}
        />
      ) : null}
      <div
        style={{
          position: "absolute",
          left: onBar ? 0 : width * 0.0,
          width: onBar ? width * 0.98 : undefined,
          top: mapsSize * 1.0 + (onBar ? subSize * 0.2 : subSize * 0.05),
          textAlign: onBar ? "center" : "left",
          fontWeight: onBar ? 600 : 400,
          fontSize: subSize,
          lineHeight: 1,
          letterSpacing: onBar ? "0.06em" : "0.01em",
          color: subColor,
          opacity: onBar ? Math.min(1, barReveal * 1.5) : barReveal,
          clipPath: onBar ? `inset(0 ${(1 - barReveal) * 100}% 0 0)` : undefined,
        }}
      >
        Global Markets
      </div>
    </div>
  );
};
