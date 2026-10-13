import { AbsoluteFill, Solid, useVideoConfig } from "remotion";
import { paper } from "@remotion/effects/paper";
import { FONT_FAMILY } from "../fonts";
import { palette as P } from "../palette";
import { MapsLogo } from "../components/MapsLogo";
import { GuillocheBand, MicroRing, Rosette } from "./Guilloche";

/**
 * STYLE A — "Engraved Security Print". The world of the film is drawn the way
 * money and share certificates are printed: hairline guilloche, microtext,
 * engraved borders, a single MAPS-orange ink stamp. Cream paper, navy ink.
 */

const Paper: React.FC<{ tone?: string; amount?: number }> = ({ tone = P.cream, amount = 0.45 }) => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: tone }} />
      <AbsoluteFill style={{ mixBlendMode: "multiply" }}>
        <Solid width={width} height={height} color="#ffffff" effects={[paper({ amount, colorBack: "#ffffff", colorFront: "#d9ccb2", folds: 0.25, drops: 0.15, scale: 0.7, seed: 11 })]} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Hero moment — the drop: the certificate's central rosette blooms behind US STOCKS. */
export const StyleAHero: React.FC = () => {
  const { width: W, height: H } = useVideoConfig();
  const cx = W / 2;
  const cy = H / 2;
  const R = Math.min(W, H) * 0.6;
  return (
    <AbsoluteFill>
      <Paper />
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        {/* Certificate border: double rule + guilloche bands. */}
        <rect x={36} y={36} width={W - 72} height={H - 72} fill="none" stroke={P.navy} strokeWidth={3} />
        <rect x={50} y={50} width={W - 100} height={H - 100} fill="none" stroke={P.navy} strokeWidth={1} />
        <GuillocheBand x={64} y={62} w={W - 128} h={34} color={P.navy} strands={7} waves={26} width={0.9} />
        <GuillocheBand x={64} y={H - 96} w={W - 128} h={34} color={P.navy} strands={7} waves={26} width={0.9} phase={1.3} />
        {/* Blooming rosettes: navy hairline field + MAPS-orange inner bloom. */}
        <Rosette cx={cx} cy={cy} radius={R} rings={46} petals={18} depth={0.32} color={P.navy} width={0.9} inner={0.18} opacity={0.75} />
        <Rosette cx={cx} cy={cy} radius={R * 0.62} rings={30} petals={12} depth={0.5} color={P.orange} width={1.6} phase={0.6} inner={0.2} />
        <circle cx={cx} cy={cy} r={R * 0.36} fill={P.cream} />
        <circle cx={cx} cy={cy} r={R * 0.36} fill="none" stroke={P.navy} strokeWidth={2} />
        <circle cx={cx} cy={cy} r={R * 0.36 - 10} fill="none" stroke={P.navy} strokeWidth={0.8} />
        <MicroRing id="mr-hero" cx={cx} cy={cy} r={R * 0.36 - 22} text="UNITED STATES · STOCKS · NOW ON MAPS · " color={P.navy} size={12} />
        {/* Serial numbers & registration marks, like a real certificate. */}
        <text x={96} y={150} fill={P.orange} fontFamily={FONT_FAMILY} fontWeight={800} fontSize={30} letterSpacing={4}>
          Nº 000 001
        </text>
        <text x={W - 96} y={H - 130} fill={P.orange} fontFamily={FONT_FAMILY} fontWeight={800} fontSize={30} letterSpacing={4} textAnchor="end">
          Nº 000 001
        </text>
        <text x={96} y={H - 130} fill={P.navy} fontFamily={FONT_FAMILY} fontWeight={600} fontSize={16} letterSpacing={6}>
          ONE (1) SHARE · FULLY YOURS
        </text>
        <text x={W - 96} y={150} fill={P.navy} fontFamily={FONT_FAMILY} fontWeight={600} fontSize={16} letterSpacing={6} textAnchor="end">
          SERIES · US EQUITY
        </text>
      </svg>
      {/* Type: engraved-weight headline sitting in the rosette's eye. */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6 }}>
        <div style={{ fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: H * 0.026, letterSpacing: "0.42em", color: P.navy }}>NOW YOU CAN OWN</div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: 800,
            fontSize: H * 0.155,
            lineHeight: 1,
            letterSpacing: "-0.01em",
            color: P.navy,
            textShadow: `${H * 0.006}px ${H * 0.007}px 0 ${P.orange}`,
          }}
        >
          US STOCKS
        </div>
        <div style={{ width: H * 0.5, height: 2, background: P.navy, marginTop: 10 }} />
        <div style={{ fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: H * 0.022, letterSpacing: "0.3em", color: P.navy, marginTop: 6 }}>FROM INDIA · ON MAPS</div>
      </AbsoluteFill>
      {/* The single ink stamp, MAPS orange, slightly rotated like a real hand stamp. */}
      <div style={{ position: "absolute", right: W * 0.14, top: H * 0.16, transform: "rotate(-14deg)", opacity: 0.9 }}>
        <svg width={230} height={230}>
          <circle cx={115} cy={115} r={108} fill="none" stroke={P.orange} strokeWidth={6} />
          <circle cx={115} cy={115} r={92} fill="none" stroke={P.orange} strokeWidth={2} />
          <MicroRing id="stamp" cx={115} cy={115} r={78} text="MAPS GLOBAL MARKETS · " color={P.orange} size={15} weight={800} />
          <text x={115} y={108} textAnchor="middle" fill={P.orange} fontFamily={FONT_FAMILY} fontWeight={800} fontSize={30}>
            NOW
          </text>
          <text x={115} y={140} textAnchor="middle" fill={P.orange} fontFamily={FONT_FAMILY} fontWeight={800} fontSize={30}>
            OPEN
          </text>
        </svg>
      </div>
    </AbsoluteFill>
  );
};

/** Hook — your day prints as a receipt; the total line reads 0. */
export const StyleAHook: React.FC = () => {
  const { width: W, height: H } = useVideoConfig();
  const lines: Array<[string, string, string]> = [
    ["07:12", "SCROLL", "48 min"],
    ["13:30", "SEARCH", "31 times"],
    ["18:05", "RIDE", "2 trips"],
    ["20:41", "PAY", "6 taps"],
    ["22:10", "STREAM", "2 hrs"],
  ];
  const rw = 560;
  return (
    <AbsoluteFill>
      <Paper tone={P.navy} amount={0.25} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 70% 80% at 40% 50%, ${P.blueMid}aa, transparent)` }} />
      {/* The receipt, tilted, unspooling out of frame top. */}
      <div style={{ position: "absolute", left: W * 0.2, top: -60, width: rw, height: H * 1.02, transform: "rotate(-6deg)", filter: "drop-shadow(0 30px 40px rgba(0,16,40,0.55))" }}>
        <div style={{ position: "absolute", inset: 0, background: P.cream, clipPath: "polygon(0 0, 100% 0, 100% 96%, 96% 100%, 92% 96%, 88% 100%, 84% 96%, 80% 100%, 76% 96%, 72% 100%, 68% 96%, 64% 100%, 60% 96%, 56% 100%, 52% 96%, 48% 100%, 44% 96%, 40% 100%, 36% 96%, 32% 100%, 28% 96%, 24% 100%, 20% 96%, 16% 100%, 12% 96%, 8% 100%, 4% 96%, 0 100%)" }} />
        <div style={{ position: "absolute", left: 48, right: 48, top: 110, fontFamily: FONT_FAMILY, color: P.navy, fontVariantNumeric: "tabular-nums" }}>
          <div style={{ textAlign: "center", fontWeight: 800, fontSize: 30, letterSpacing: "0.3em" }}>YOUR DAY</div>
          <div style={{ textAlign: "center", fontWeight: 600, fontSize: 15, letterSpacing: "0.3em", marginTop: 6 }}>MADE IN THE USA · SPENT IN INDIA</div>
          <div style={{ borderTop: `2px dashed ${P.navy}`, margin: "26px 0" }} />
          {lines.map(([t, verb, qty], i) => (
            <div key={verb} style={{ display: "flex", alignItems: "baseline", fontSize: 26, fontWeight: i === 4 ? 800 : 600, marginBottom: 22 }}>
              <span style={{ width: 92, fontWeight: 400, fontSize: 20 }}>{t}</span>
              <span style={{ flex: 1, letterSpacing: "0.08em" }}>{verb}</span>
              <span style={{ fontWeight: 400, fontSize: 22 }}>{qty}</span>
            </div>
          ))}
          <div style={{ borderTop: `2px dashed ${P.navy}`, margin: "10px 0 24px" }} />
          <div style={{ display: "flex", alignItems: "baseline", fontWeight: 800, fontSize: 30 }}>
            <span style={{ flex: 1, letterSpacing: "0.06em" }}>US SHARES OWNED</span>
            <span style={{ fontSize: 64, color: P.orange }}>0</span>
          </div>
          <div style={{ textAlign: "center", fontSize: 14, letterSpacing: "0.35em", marginTop: 40, fontWeight: 600 }}>THANK YOU FOR SHOPPING</div>
          <svg width={rw - 96} height={70} style={{ marginTop: 18 }}>
            {Array.from({ length: 58 }, (_, i) => (
              <rect key={i} x={i * 8} y={0} width={(i * 7) % 3 === 0 ? 4 : 2} height={60} fill={P.navy} />
            ))}
          </svg>
        </div>
      </div>
      {/* Kinetic verb, set big beside the receipt. */}
      <div style={{ position: "absolute", left: W * 0.56, top: H * 0.36, fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: H * 0.17, color: P.orangeBright, lineHeight: 0.95 }}>
        STREAM
        <div style={{ fontWeight: 600, fontSize: H * 0.03, letterSpacing: "0.35em", color: P.cream, marginTop: 18 }}>22:10 · 2 HRS</div>
      </div>
    </AbsoluteFill>
  );
};

/** End card — certificate frame, logo, line. */
export const StyleAEnd: React.FC = () => {
  const { width: W, height: H } = useVideoConfig();
  const lw = Math.min(W * 0.34, H * 0.6);
  return (
    <AbsoluteFill>
      <Paper />
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        <Rosette cx={W / 2} cy={H * 0.44} radius={H * 0.5} rings={24} petals={16} depth={0.3} color={P.navy} width={0.6} inner={0.5} opacity={0.18} />
        <rect x={36} y={36} width={W - 72} height={H - 72} fill="none" stroke={P.navy} strokeWidth={3} />
        <rect x={50} y={50} width={W - 100} height={H - 100} fill="none" stroke={P.navy} strokeWidth={1} />
      </svg>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ width: lw }}>
          <MapsLogo width={lw} variant="bar-navy" />
        </div>
        <div style={{ fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: H * 0.03, letterSpacing: "0.32em", color: P.navy, marginTop: H * 0.02 }}>US STOCKS · NOW OPEN</div>
        <div style={{ width: H * 0.42, height: 6, background: P.orange, marginTop: 12, borderRadius: 3 }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", bottom: 64, left: 0, right: 0, textAlign: "center", fontFamily: FONT_FAMILY, fontWeight: 400, fontSize: 15, color: P.navy, lineHeight: 1.45 }}>
        Investments in the securities market are subject to market risks. Read all related documents carefully before investing.
        <br />
        Overseas investments are subject to the RBI Liberalised Remittance Scheme limits, foreign-exchange risk and applicable taxes.
      </div>
    </AbsoluteFill>
  );
};
