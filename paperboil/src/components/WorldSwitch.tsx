import { AbsoluteFill, random } from "remotion";

/**
 * "Customer world" → "owner world". Until the drop the film is printed like a
 * cheap photocopy: toner-black on newsprint, with MAPS orange as the only spot
 * colour left alive (the thing you're locked out of). On the drop's downbeat
 * the full painted-paper palette switches on. The style change *is* the
 * product benefit.
 */
export const DROP_FRAME = 480;

const FILTER_ID = "customer-world";

// Luminance (Rec. 601) → toner/newsprint ramp. A steep middle gives the
// photocopier's crushed contrast.
const TONER = [0.075, 0.09, 0.16, 0.62, 0.86, 0.9];
const PAPER_R = TONER.map((v) => v.toFixed(3)).join(" ");
const PAPER_G = TONER.map((v, i) => (v - (i > 2 ? 0.012 : 0)).toFixed(3)).join(" ");
const PAPER_B = TONER.map((v, i) => (v - (i > 2 ? 0.045 : -0.01)).toFixed(3)).join(" ");

const Defs: React.FC = () => (
  <svg width={0} height={0} style={{ position: "absolute" }}>
    <defs>
      <filter id={FILTER_ID} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feColorMatrix in="SourceGraphic" type="matrix" values="0.3 0.59 0.11 0 0  0.3 0.59 0.11 0 0  0.3 0.59 0.11 0 0  0 0 0 1 0" result="lum" />
        <feComponentTransfer in="lum" result="toner">
          <feFuncR type="table" tableValues={PAPER_R} />
          <feFuncG type="table" tableValues={PAPER_G} />
          <feFuncB type="table" tableValues={PAPER_B} />
        </feComponentTransfer>
        {/* Spot-colour key: alpha = "how orange is this pixel". */}
        <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  3 -1.5 -1.5 0 -0.5" result="spot" />
        <feComposite in="spot" in2="toner" operator="over" />
      </filter>
    </defs>
  </svg>
);

/** Photocopier scan wobble: the whole sheet shifts a pixel or two per drawing. */
const scanJitter = (drawn: number) => {
  const x = (random(`sx${drawn}`) - 0.5) * 3;
  const y = (random(`sy${drawn}`) - 0.5) * 2;
  const r = (random(`sr${drawn}`) - 0.5) * 0.12;
  return `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) rotate(${r.toFixed(3)}deg)`;
};

/** Copier artefacts: lid shadow on the sheet edges and one faint drum streak. */
const CopierMarks: React.FC<{ drawn: number }> = ({ drawn }) => (
  <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "multiply" }}>
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(90deg, rgba(20,20,24,0.32) 0, rgba(20,20,24,0) 70px), linear-gradient(270deg, rgba(20,20,24,0.22) 0, rgba(20,20,24,0) 50px), linear-gradient(180deg, rgba(20,20,24,0.18) 0, rgba(20,20,24,0) 36px)",
      }}
    />
    <div style={{ position: "absolute", left: 1532 + (random(`streak${drawn}`) - 0.5) * 2, top: 0, width: 3, height: 1080, background: "rgba(20,20,24,0.10)" }} />
  </AbsoluteFill>
);

const RIP_FRAMES = 9;
const RIP_X = 980;

/** A jagged vertical tear line (seeded, stable for the whole rip). */
const tearLine = (side: "l" | "r", rim: number) => {
  const pts: string[] = [];
  const n = 22;
  for (let i = 0; i <= n; i++) {
    const y = (i / n) * 1080;
    const jag = (random(`tear${i}`) - 0.5) * 70 + Math.sin(i * 0.9) * 26;
    pts.push(`${(RIP_X + jag + (side === "l" ? rim : -rim)).toFixed(1)}px ${y.toFixed(1)}px`);
  }
  return side === "l" ? `polygon(0 0, ${pts.join(", ")}, 0 1080px)` : `polygon(${pts.join(", ")}, 1920px 1080px, 1920px 0)`;
};

/**
 * The switch: on the drop the photocopied world (last customer drawing) rips
 * down the middle and both halves are flung off, uncovering the colour world.
 * Runs on ones (outside the twos clock) so the tear feels violent.
 */
const Rip: React.FC<{ frame: number; render: (drawn: number) => React.ReactNode }> = ({ frame, render }) => {
  const t = frame - DROP_FRAME;
  // DROP_FRAME - 3 is the last customer drawing (on threes).
  if (t < 0 || t >= RIP_FRAMES) return null;
  const k = Math.pow(t / (RIP_FRAMES - 1), 1.6);
  const halves: Array<["l" | "r", number, number]> = [
    ["l", -1, -7],
    ["r", 1, 6],
  ];
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {halves.map(([side, dir, rot]) => (
        <AbsoluteFill
          key={side}
          style={{
            transform: `translate(${dir * k * 1300}px, ${k * k * 160}px) rotate(${rot * k}deg)`,
            transformOrigin: side === "l" ? "0% 100%" : "100% 100%",
            filter: "drop-shadow(10px 14px 6px rgba(0,0,0,0.35))",
          }}
        >
          {/* Paper core: the torn white fibre rim. */}
          <AbsoluteFill style={{ background: "#efe9dc", clipPath: tearLine(side, 14) }} />
          <AbsoluteFill style={{ clipPath: tearLine(side, 0), filter: `url(#${FILTER_ID})` }}>{render(DROP_FRAME - 3)}</AbsoluteFill>
        </AbsoluteFill>
      ))}
    </AbsoluteFill>
  );
};

export const WorldSwitch: React.FC<{ frame: number; drawn: number; render: (drawn: number) => React.ReactNode }> = ({ frame, drawn, render }) => {
  const customer = frame < DROP_FRAME;
  return (
    <AbsoluteFill>
      <Defs />
      <AbsoluteFill style={customer ? { filter: `url(#${FILTER_ID})`, transform: scanJitter(drawn) } : undefined}>{render(drawn)}</AbsoluteFill>
      {customer ? <CopierMarks drawn={drawn} /> : null}
      <Rip frame={frame} render={render} />
    </AbsoluteFill>
  );
};
