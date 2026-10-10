/**
 * Night film 03, "The Mint" (18 s, 432 frames, 24 fps). UNOFFICIAL SPEC WORK; facts and sources in ./kit.tsx.
 * A coin press strikes one coin per benefit (5% / plane / hotel bell / box / ₹0), each with its line of copy. The coins
 * stack, glow, melt, and the molten metal pours into a card-shaped mould; it cools into the metal card; lockup.
 * Look: the engraved world inverted: gold line engraving on deep navy, molten orange as the one hot accent.
 */
import React from "react";
import { AbsoluteFill, Audio, Img, staticFile, useCurrentFrame } from "remotion";
import { face } from "../v3/card.ts";
import { Hatch, Icon, Logo, SANS, Words, backOut, easeIn, expoOut, inOut, lerp, ramp, shake, useFonts } from "./kit.tsx";

export const F03_FRAMES = 432;
const GOLD = "#d8b46a";
const NAVY = "#0e1b2c";
const STRIKES = [38, 96, 144, 192, 246];
const KINDS = ["coin", "plane", "bell", "box", "tag"] as const;
const COPY: [string[], string?][] = [
  [["5% rewards"], "on online shopping"],
  [["redeem on flights"]],
  [["and hotels"]],
  [["and 2,000+ products"], "on CRED store"],
  [["zero joining fee"]],
];
const C0 = { x: 700, y: 500, r: 170 }; // strike position
const STACK = { x: 330, y: 820 };

/** A coin face (engraved, gold): beaded rim and one icon. Drawn centred in a 400 x 400 box. */
const CoinFace: React.FC<{ k: number; glow?: number }> = ({ k, glow = 0 }) => (
  <svg width={400} height={400} viewBox="0 0 400 400" style={{ overflow: "visible" }}>
    <Hatch id={`c${k}`} ink={GOLD} pitch={7} />
    <defs>
      <radialGradient id={`cg${k}`}>
        <stop offset="0" stopColor="#3a3220" />
        <stop offset="1" stopColor="#1d1a14" />
      </radialGradient>
    </defs>
    <circle cx={200} cy={200} r={190} fill={`url(#cg${k})`} stroke={GOLD} strokeWidth={6} />
    <circle cx={200} cy={200} r={168} fill="none" stroke={GOLD} strokeWidth={3} strokeDasharray="2 9" strokeLinecap="round" />
    <circle cx={200} cy={200} r={150} fill="none" stroke={GOLD} strokeWidth={1.5} opacity={0.6} />
    {KINDS[k] === "coin" ? (
      <text x={200} y={238} textAnchor="middle" fontFamily="'Newsreader', serif" fontWeight={700} fontSize={130} fill={GOLD}>5%</text>
    ) : (
      <g transform="translate(90, 90) scale(1.1)">
        <Icon kind={KINDS[k]} h={`c${k}`} ink={GOLD} sw={4} />
      </g>
    )}
    {glow > 0 && <circle cx={200} cy={200} r={190} fill="#ff8a3d" opacity={glow * 0.85} style={{ mixBlendMode: "screen" }} />}
  </svg>
);

/** The press die. */
const Die: React.FC<{ y: number }> = ({ y }) => (
  <div style={{ position: "absolute", left: C0.x - 210, top: y, width: 420, height: 520 }}>
    <div style={{ position: "absolute", left: 60, top: 0, width: 300, height: 380, background: "linear-gradient(90deg, #2a2f38, #5b616c 45%, #23272e)", borderRadius: 8 }} />
    <div style={{ position: "absolute", left: 0, top: 360, width: 420, height: 150, background: "linear-gradient(90deg, #262a31, #6a707c 45%, #1f2228)", borderRadius: "10px 10px 60px 60px" }} />
  </div>
);

export const F03Mint: React.FC = () => {
  useFonts();
  const f = useCurrentFrame();
  const cur = STRIKES.filter((s) => f >= s).length - 1;
  const melt = ramp(f, 296, 324, inOut);
  const pour = ramp(f, 314, 350, inOut);
  const fill = ramp(f, 326, 366, inOut);
  const cool = ramp(f, 366, 386, inOut);
  const lift = ramp(f, 384, 404, inOut);
  const sh = STRIKES.reduce((a, s) => { const v = shake(f, s, 14, 5); return { x: a.x + v.x, y: a.y + v.y }; }, { x: 0, y: 0 });
  // die: comes down for each strike
  let dieY = -700;
  for (const s of STRIKES) if (f >= s - 14 && f < s + 20) dieY = f < s ? lerp(-700, C0.y - 560, ramp(f, s - 14, s, easeIn)) : lerp(C0.y - 560, -700, ramp(f, s + 2, s + 20, expoOut));
  const MOULD = { x: 1180, y: 280, w: 620, h: 391 };
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse 80% 70% at 45% 45%, #17304d, ${NAVY})` }}>
      <AbsoluteFill style={{ transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        {/* engraved guilloche backdrop */}
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: 0.18 }}>
          {Array.from({ length: 22 }, (_, i) => (
            <circle key={i} cx={C0.x} cy={C0.y} r={230 + i * 38} fill="none" stroke={GOLD} strokeWidth={1.4} strokeDasharray={`${4 + (i % 3) * 3} 8`} />
          ))}
        </svg>
        {/* the anvil */}
        <div style={{ position: "absolute", left: C0.x - 260, top: C0.y + 175, width: 520, height: 60, borderRadius: 10, background: "linear-gradient(180deg, #4b515c, #1f2329)", opacity: 1 - melt }} />
        {/* stacked coins (seen at an angle) */}
        {STRIKES.map((s, k) => {
          const toStack = ramp(f, s + 30, s + 46, inOut);
          if (f < s || k > cur) return null;
          const onStack = toStack;
          const sy = STACK.y - k * 34;
          const x = lerp(C0.x, STACK.x, onStack);
          const y = lerp(C0.y, sy, onStack);
          const sc = lerp(1, 0.6, onStack) * (f < s + 10 ? interpolatePop(f - s) : 1);
          const tilt = lerp(0, 68, onStack);
          const meltY = melt * 160;
          return (
            <div key={k} style={{ position: "absolute", left: x - 200, top: y - 200 + meltY * (k / 4), width: 400, height: 400, transform: `perspective(900px) rotateX(${tilt}deg) scale(${sc * (1 - 0.6 * melt)})`, opacity: 1 - melt, filter: melt > 0 ? `blur(${melt * 6}px)` : undefined }}>
              <CoinFace k={k} glow={ramp(f, 280, 308)} />
            </div>
          );
        })}
        {/* molten pour: a stream from the stack into the mould */}
        {pour > 0 && pour < 1 && (
          <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
            <defs>
              <linearGradient id="molten" x1="0" x2="1">
                <stop offset="0" stopColor="#ff6a2a" />
                <stop offset="1" stopColor="#ffd27a" />
              </linearGradient>
            </defs>
            <path d={`M ${STACK.x} ${STACK.y - 40} Q ${(STACK.x + MOULD.x) / 2} ${STACK.y - 520} ${MOULD.x + MOULD.w / 2} ${MOULD.y + MOULD.h - 40}`} fill="none" stroke="url(#molten)" strokeWidth={34 * Math.sin(Math.PI * pour)} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - Math.min(1, pour * 2)} style={{ filter: "drop-shadow(0 0 18px #ff8a3d)" }} />
          </svg>
        )}
        {/* the mould: card-shaped, fills with molten metal, then cools into the card */}
        {f >= 290 && (
          <div style={{ position: "absolute", left: lerp(MOULD.x, 960 - MOULD.w / 2, lift), top: lerp(MOULD.y, 300, lift), width: MOULD.w, height: MOULD.h, transform: `perspective(1600px) rotateX(${lerp(48, 0, lift)}deg) rotateY(${lerp(0, -14, lift)}deg) scale(${lerp(1, 1.25, lift)})`, opacity: ramp(f, 290, 302) }}>
            <div style={{ position: "absolute", inset: -14, borderRadius: 44, border: `4px solid ${GOLD}`, opacity: 1 - lift }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: 30, background: "#0a1220", boxShadow: "inset 0 6px 18px rgba(0,0,0,0.8)" }} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: `${fill * 100}%`, borderRadius: 30, background: "linear-gradient(90deg, #ff6a2a, #ffd27a 60%, #ff8a3d)", opacity: 1 - cool, boxShadow: "0 0 60px #ff8a3d" }} />
            <Img src={face("metal").url} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: 30, opacity: cool }} />
            {/* steam */}
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ position: "absolute", left: 120 + i * 180, top: -60 - ramp(f, 362 + i * 3, 400) * 160, width: 90, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.25)", filter: "blur(22px)", opacity: Math.sin(Math.PI * ramp(f, 360 + i * 3, 404)) }} />
            ))}
          </div>
        )}
        <Die y={dieY} />
      </AbsoluteFill>
      {/* copy: one line per coin, right of the strike */}
      {COPY.map(([big, small], k) => {
        const s = STRIKES[k];
        const end = k < 4 ? STRIKES[k + 1] - 4 : 294;
        if (f < s + 2 || f > end + 1) return null;
        const out = ramp(f, end - 8, end, easeIn);
        return (
          <div key={k} style={{ position: "absolute", left: 1000, top: 380, opacity: 1 - out }}>
            {big.map((b, i) => <Words key={i} f={f} at={s + 4 + i * 3} text={b} size={92} color={GOLD} />)}
            {small && <div style={{ marginTop: 18 }}><Words f={f} at={s + 10} text={small} size={38} color="#e9d9b2" font={SANS} weight={500} tracking="-0.01em" /></div>}
          </div>
        );
      })}
      {f < 36 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 480, textAlign: "center" }}>
          <Words f={f} at={0} text="the CRED IndusInd Bank RuPay credit card" size={60} color={GOLD} out={28} />
        </div>
      )}
      {f >= 410 && <Logo f={f} at={410} y={860} h={86} name={false} />}
      {f >= 396 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 100, textAlign: "center", opacity: ramp(f, 396, 410, expoOut) }}>
          <Words f={f} at={396} text="CRED IndusInd Bank RuPay credit card" size={52} color={GOLD} />
        </div>
      )}
      <Audio src={staticFile("custom/cred-night/f03.wav")} />
    </AbsoluteFill>
  );
};

/** Struck coin pops in: 0 -> overshoot -> 1 over 10 frames. */
function interpolatePop(t: number) {
  return backOut(Math.min(1, Math.max(0, t / 10)));
}
