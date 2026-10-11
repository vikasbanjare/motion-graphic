/**
 * Night film 04, "The Watermark" (18 s, 432 frames, 24 fps). UNOFFICIAL SPEC WORK; facts and sources in ./kit.tsx.
 * A dark room, one sheet of laid paper. A warm light moves behind it, and wherever it shines a hidden watermark shows
 * through: the card, then 5%, a plane, a hotel bell, a box, a ₹0 tag, each with its printed line beside it. At the
 * end the light floods the sheet and the card's watermark becomes the real metal card; lockup.
 * Look: security-paper engraving: violet ink, laid lines and chain lines visible only in the light.
 */
import React from "react";
import { AbsoluteFill, Audio, Img, staticFile, useCurrentFrame } from "remotion";
import { face } from "../v3/card.ts";
import { Hatch, Icon, Logo, SANS, Words, easeIn, expoOut, inOut, lerp, ramp, useFonts } from "./kit.tsx";

export const F04_FRAMES = 432;
const INK = "#3b2f5c";
const BEATS: { at: number; kind: "card" | "coin" | "plane" | "bell" | "box" | "tag"; big: string[]; small?: string }[] = [
  { at: 8, kind: "card", big: ["the CRED IndusInd Bank", "RuPay credit card"] },
  { at: 76, kind: "coin", big: ["5% rewards"], small: "on online shopping" },
  { at: 138, kind: "plane", big: ["redeem on flights"] },
  { at: 192, kind: "bell", big: ["and hotels"] },
  { at: 240, kind: "box", big: ["and 2,000+ products"], small: "on CRED store" },
  { at: 300, kind: "tag", big: ["zero joining fee"] },
];
const END = 356;
const WM = { x: 1380, y: 540 };

/** A watermark: the shape as thinner (lighter) paper, soft edged; inside drawn as solid white. */
const Mark: React.FC<{ kind: (typeof BEATS)[number]["kind"]; o: number }> = ({ kind, o }) => (
  <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: o, filter: "blur(1.3px)" }}>
    <Hatch id="wm" ink="#fff" pitch={9} />
    {kind === "card" ? (
      <g>
        <rect x={WM.x - 300} y={WM.y - 190} width={600} height={378} rx={34} fill="#fff" opacity={0.75} />
        <rect x={WM.x - 220} y={WM.y - 50} width={110} height={84} rx={14} fill="#fffbe9" opacity={0.6} />
        {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={WM.x + 140} cy={WM.y - 50} r={30 + i * 9} fill="none" stroke="#fff" strokeWidth={3} opacity={0.9} />)}
      </g>
    ) : (
      <g transform={`translate(${WM.x - 260}, ${WM.y - 260}) scale(2.6)`}>
        <Icon kind={kind} h="wm" ink="#fff" sw={7} />
      </g>
    )}
  </svg>
);

export const F04Watermark: React.FC = () => {
  useFonts();
  const f = useCurrentFrame();
  const cur = BEATS.filter((b) => f >= b.at).length - 1;
  // the light: sweeps across the watermark at each beat, then floods the sheet at the end
  const b = BEATS[Math.max(0, cur)];
  const lt = ramp(f, b.at - 6, b.at + 30, inOut);
  const lx = lerp(WM.x - 420, WM.x + 60, lt) + 30 * Math.sin(f / 13);
  const ly = WM.y + 40 * Math.sin(f / 19);
  const flood = ramp(f, END, END + 26, inOut);
  const R = lerp(520, 1900, flood);
  const lightOn = ramp(f, 0, 14);
  const toCard = ramp(f, END + 18, END + 40, inOut);
  const lift = ramp(f, END + 34, END + 54, inOut);
  const mask = `radial-gradient(circle ${R}px at ${lx}px ${ly}px, #000 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0) 100%)`;
  return (
    <AbsoluteFill style={{ background: "#121317" }}>
      {/* unlit sheet */}
      <div style={{ position: "absolute", left: 60, top: 50, width: 1800, height: 980, background: "#6d6658", borderRadius: 6, boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }} />
      {/* lit sheet: warm, with laid lines + chain lines and the current watermark, all inside the light */}
      <div style={{ position: "absolute", left: 60, top: 50, width: 1800, height: 980, borderRadius: 6, overflow: "hidden", WebkitMaskImage: mask, maskImage: mask, opacity: lightOn }}>
        <div style={{ position: "absolute", left: -60, top: -50, width: 1920, height: 1080, background: "#efe4c8" }}>
          <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
            {Array.from({ length: 80 }, (_, i) => <line key={`c${i}`} x1={i * 26} y1={0} x2={i * 26} y2={1080} stroke="#fff" strokeWidth={2} />)}
            {Array.from({ length: 270 }, (_, i) => <line key={`l${i}`} x1={0} y1={i * 4} x2={1920} y2={i * 4} stroke="#d6c7a2" strokeWidth={0.8} />)}
          </svg>
          {BEATS.map((bb, k) => {
            const nx = BEATS[k + 1]?.at ?? END;
            const o = k === cur && f < END ? ramp(f, bb.at, bb.at + 12) * (1 - ramp(f, nx - 8, nx)) : k === 0 && f >= END ? ramp(f, END, END + 16) : 0;
            return o > 0 ? <Mark key={k} kind={bb.kind} o={o} /> : null;
          })}
          {/* the warm light itself */}
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle ${R * 0.9}px at ${lx}px ${ly}px, rgba(255,214,150,0.55), rgba(255,214,150,0) 70%)`, mixBlendMode: "multiply" }} />
        </div>
      </div>
      {/* printed copy (ink is on the front, always visible, lit or not) */}
      {BEATS.map((bb, k) => {
        const end = BEATS[k + 1]?.at ?? END;
        if (f < bb.at || f > end + 1) return null;
        const out = ramp(f, end - 8, end, easeIn);
        return (
          <div key={k} style={{ position: "absolute", left: 160, top: bb.big.length > 1 ? 380 : 430, opacity: 1 - out }}>
            {bb.big.map((t, i) => <Words key={i} f={f} at={bb.at + 6 + i * 3} text={t} size={bb.big.length > 1 ? 74 : bb.big[0].length > 14 ? 84 : 96} color={INK} />)}
            {bb.small && <div style={{ marginTop: 16 }}><Words f={f} at={bb.at + 12} text={bb.small} size={38} color={INK} font={SANS} weight={500} tracking="-0.01em" /></div>}
          </div>
        );
      })}
      {/* lights down around the card for the lockup */}
      <AbsoluteFill style={{ background: "#121317", opacity: ramp(f, END + 38, END + 54) * 0.92, pointerEvents: "none" }} />
      {/* the card watermark becomes the real card */}
      {f >= END + 14 && (
        <AbsoluteFill style={{ perspective: 1800 }}>
          <div style={{ position: "absolute", left: lerp(WM.x - 300, 960 - 330, lift), top: lerp(WM.y - 190, 230, lift), width: lerp(600, 660, lift), height: lerp(378, 416, lift), transform: `rotateX(${lift * 10}deg) rotateY(${lift * -16}deg)`, opacity: toCard }}>
            <Img src={face("metal").url} style={{ width: "100%", height: "100%", borderRadius: 34, boxShadow: `0 ${40 * lift}px ${90 * lift}px rgba(0,0,0,0.55)` }} />
          </div>
        </AbsoluteFill>
      )}
      {f >= END + 50 && <Logo f={f} at={END + 50} y={720} h={96} />}
      {f < 8 && <AbsoluteFill style={{ background: "#121317", opacity: 1 - ramp(f, 0, 8, expoOut) }} />}
      <Audio src={staticFile("custom/cred-night/f04.wav")} />
    </AbsoluteFill>
  );
};
