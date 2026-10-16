/**
 * Night film 05, "The Loupe" (18 s, 432 frames, 24 fps). UNOFFICIAL SPEC WORK; facts and sources in ./kit.tsx.
 * One magnifying glass glides over a giant engraved card. Under the glass, microprint hidden in the card's details
 * shows up: the card's name around the chip, "5%" in the rosette, planes along the foil strip, bells in the border,
 * boxes in a corner, a ₹0 tag in the other corner; each find brings its headline. Then the camera pulls back to the
 * whole card, which turns from print to metal; lockup.
 * Look: the engraved world in terracotta / peach, brass loupe.
 */
import React from "react";
import { AbsoluteFill, Audio, Img, staticFile, useCurrentFrame } from "remotion";
import { face } from "../v3/card.ts";
import { Hatch, Icon, Logo, SANS, Words, easeIn, expoOut, inOut, lerp, ramp, useFonts } from "./kit.tsx";

export const F05_FRAMES = 432;
const INK = "#6e2a22";
const CW = 1712, CH = 1080;
type Stop = { at: number; x: number; y: number; big: string[]; small?: string };
const STOPS: Stop[] = [
  { at: 30, x: 330, y: 404, big: ["the CRED IndusInd Bank", "RuPay credit card"] },
  { at: 96, x: 1330, y: 380, big: ["5% rewards"], small: "on online shopping" },
  { at: 160, x: 1080, y: 700, big: ["redeem on flights"] },
  { at: 210, x: 860, y: 60, big: ["and hotels"] },
  { at: 256, x: 330, y: 930, big: ["and 2,000+ products"], small: "on CRED store" },
  { at: 314, x: 1560, y: 955, big: ["zero joining fee"] },
];
const PULL = 364;
const LOUPE = { x: 1300, y: 620, r: 290 };
const Z = 1.8; // main view zoom (card px -> screen px)
const Z2 = 2.6; // extra zoom inside the loupe

/** The giant card, in card coordinates. `micro` draws the microprint (always drawn; it is tiny outside the loupe). */
const GiantCard: React.FC = () => {
  const pathAt = (i: number) => {
    let d = "";
    for (let k = 0; k <= 720; k++) {
      const a = (k / 720) * Math.PI * 2;
      const r = 130 + i * 7 + 24 * Math.sin(18 * a + i * 0.2);
      d += `${k ? "L" : "M"}${(1330 + r * Math.cos(a)).toFixed(1)},${(380 + r * Math.sin(a)).toFixed(1)}`;
    }
    return d + "Z";
  };
  return (
    <svg width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`} style={{ overflow: "visible" }}>
      <Hatch id="gc" ink={INK} pitch={10} />
      <defs>
        <linearGradient id="gcbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbe7da" />
          <stop offset="1" stopColor="#f1cdb8" />
        </linearGradient>
        <clipPath id="gcclip"><rect width={CW} height={CH} rx={64} /></clipPath>
      </defs>
      <g clipPath="url(#gcclip)">
        <rect width={CW} height={CH} fill="url(#gcbg)" />
        {/* tonal line screen: light overall, heavier in the lower-left */}
        <rect width={CW} height={CH} fill="url(#gc-l)" opacity={0.55} />
        <path d={`M 0 ${CH} L 0 520 Q 500 640 860 ${CH} Z`} fill="url(#gc-m)" opacity={0.7} />
        <path d={`M 0 ${CH} L 0 800 Q 260 860 420 ${CH} Z`} fill="url(#gc-d)" opacity={0.7} />
        {Array.from({ length: 30 }, (_, i) => <path key={i} d={pathAt(i)} fill="none" stroke={INK} strokeWidth={1.6} opacity={0.75} />)}
        <circle cx={1330} cy={380} r={112} fill="#fbe7da" />
        {/* foil strip */}
        <g transform={`translate(1130, ${CH / 2}) rotate(-62)`}>
          <rect x={-760} y={-26} width={1520} height={52} fill="#f7d9c6" stroke={INK} strokeWidth={1.4} />
          {Array.from({ length: 22 }, (_, i) => (
            <g key={i} transform={`translate(${-700 + i * 66}, -11) scale(0.11)`}>
              <Icon kind="plane" h="gc" ink={INK} sw={10} />
            </g>
          ))}
        </g>
        {/* border with a row of tiny bells between the lines */}
        <rect x={34} y={34} width={CW - 68} height={CH - 68} rx={40} fill="none" stroke={INK} strokeWidth={3} />
        <rect x={86} y={86} width={CW - 172} height={CH - 172} rx={30} fill="none" stroke={INK} strokeWidth={1.4} />
        {Array.from({ length: 34 }, (_, i) => (
          <g key={i} transform={`translate(${130 + i * 44}, 44) scale(0.17)`}>
            <Icon kind="bell" h="gc" ink={INK} sw={9} />
          </g>
        ))}
        {/* chip with a microtext ring */}
        <rect x={220} y={420} width={220} height={168} rx={26} fill="#f3d2a8" stroke={INK} strokeWidth={3} />
        <path d="M 330 420 L 330 470 M 220 480 L 298 480 M 362 480 L 440 480 M 220 528 L 298 528 M 362 528 L 440 528 M 330 538 L 330 588" stroke={INK} strokeWidth={3} />
        <text fontFamily={SANS} fontWeight={700} fontSize={13} letterSpacing="0.12em" fill={INK}>
          <textPath href="#chipring">CRED · INDUSIND BANK · RUPAY CREDIT CARD · CRED · INDUSIND BANK · RUPAY CREDIT CARD ·</textPath>
        </text>
        <path id="chipring" d="M 196 400 L 464 400 Q 484 400 484 420 L 484 590 Q 484 610 464 610 L 196 610 Q 176 610 176 590 L 176 420 Q 176 400 196 400 Z" fill="none" />
        {/* the rosette's hidden centre */}
        <text x={1330} y={398} textAnchor="middle" fontFamily="'Newsreader', serif" fontWeight={700} fontSize={54} fill={INK}>5%</text>
        {/* boxes pattern, lower left */}
        {Array.from({ length: 30 }, (_, i) => (
          <g key={i} transform={`translate(${190 + (i % 6) * 48}, ${850 + Math.floor(i / 6) * 34}) scale(0.16)`}>
            <Icon kind="box" h="gc" ink={INK} sw={9} />
          </g>
        ))}
        <text x={330} y={1000} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={18} fill={INK} letterSpacing="0.2em">2,000+</text>
        {/* ₹0 tag, lower right */}
        <g transform="translate(1508, 920) scale(0.5)">
          <Icon kind="tag" h="gc" ink={INK} sw={6} />
        </g>
        {/* contactless */}
        {[0, 1, 2, 3].map((i) => <path key={i} d={`M ${520 + i * 18} ${470 - i * 6} Q ${545 + i * 26} 504 ${520 + i * 18} ${538 + i * 6}`} fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" />)}
      </g>
    </svg>
  );
};

export const F05Loupe: React.FC = () => {
  useFonts();
  const f = useCurrentFrame();
  // camera target (card coords) that sits under the loupe; glides between stops
  let tx = STOPS[0].x, ty = STOPS[0].y;
  for (let i = 0; i < STOPS.length; i++) {
    const s = STOPS[i];
    const prev = i ? STOPS[i - 1] : { x: 1300, y: 900 };
    if (f >= s.at - 22) {
      const t = ramp(f, s.at - 22, s.at + 4, inOut);
      tx = lerp(prev.x, s.x, t);
      ty = lerp(prev.y, s.y, t);
    }
  }
  tx += 10 * Math.sin(f / 23);
  ty += 8 * Math.cos(f / 29);
  const pull = ramp(f, PULL, PULL + 28, inOut);
  const lx = lerp(760, 1340, Math.min(1, Math.max(0, tx / CW)));
  const L = { x: lx, y: LOUPE.y, r: LOUPE.r };
  const z = lerp(Z, 0.52, pull);
  const cx = lerp(L.x, 960, pull), cy = lerp(L.y, 520, pull);
  const vx = lerp(tx, CW / 2, pull), vy = lerp(ty, CH / 2, pull);
  const view = (zz: number, ox: number, oy: number) => `translate(${ox - vx * zz}px, ${oy - vy * zz}px) scale(${zz})`;
  const loupeIn = ramp(f, 4, 26, expoOut) * (1 - ramp(f, PULL - 6, PULL + 10, easeIn));
  const R = L.r * loupeIn;
  const flip = ramp(f, PULL + 30, PULL + 46, inOut);
  const dark = ramp(f, PULL + 24, PULL + 40);
  return (
    <AbsoluteFill style={{ background: "#2a120e" }}>
      {/* main view */}
      <div style={{ position: "absolute", left: 0, top: 0, width: CW, height: CH, transformOrigin: "0 0", transform: view(z, cx, cy), opacity: 1 - flip }}>
        <GiantCard />
      </div>
      {/* the loupe: same card, magnified, clipped to the glass */}
      {R > 1 && (
        <>
          <div style={{ position: "absolute", inset: 0, clipPath: `circle(${R}px at ${L.x}px ${L.y}px)` }}>
            <div style={{ position: "absolute", inset: 0, background: "#fbe7da" }} />
            <div style={{ position: "absolute", left: 0, top: 0, width: CW, height: CH, transformOrigin: "0 0", transform: view(z * Z2, L.x, L.y) }}>
              <GiantCard />
            </div>
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle ${R}px at ${L.x - R * 0.35}px ${L.y - R * 0.4}px, rgba(255,255,255,0.22), rgba(255,255,255,0) 60%)` }} />
          </div>
          <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
            <defs>
              <linearGradient id="brass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f4dca0" />
                <stop offset="0.5" stopColor="#a8803a" />
                <stop offset="1" stopColor="#e7c77f" />
              </linearGradient>
            </defs>
            <line x1={L.x + R * 0.7} y1={L.y + R * 0.7} x2={L.x + R * 1.55} y2={L.y + R * 1.55} stroke="#3b1f12" strokeWidth={46 * loupeIn} strokeLinecap="round" />
            <circle cx={L.x} cy={L.y} r={R} fill="none" stroke="url(#brass)" strokeWidth={22 * loupeIn} />
            <circle cx={L.x} cy={L.y} r={R + 12 * loupeIn} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth={4} />
          </svg>
        </>
      )}
      {/* headlines, on the left, away from the glass */}
      {STOPS.map((s, k) => {
        const end = STOPS[k + 1] ? STOPS[k + 1].at - 18 : PULL;
        if (f < s.at || f > end + 1) return null;
        const out = ramp(f, end - 8, end, easeIn);
        return (
          <div key={k} style={{ position: "absolute", left: 90, top: 80, padding: "26px 40px 30px", background: "rgba(251,231,218,0.95)", border: `3px solid ${INK}`, borderRadius: 12, opacity: (1 - out) * ramp(f, s.at, s.at + 8), boxShadow: "0 18px 40px rgba(60,20,10,0.25)" }}>
            {s.big.map((b, i) => <Words key={i} f={f} at={s.at + 2 + i * 3} text={b} size={s.big.length > 1 ? 64 : 84} color={INK} />)}
            {s.small && <div style={{ marginTop: 12 }}><Words f={f} at={s.at + 8} text={s.small} size={34} color={INK} font={SANS} weight={500} tracking="-0.01em" /></div>}
          </div>
        );
      })}
      {/* the whole card turns from print to metal */}
      <AbsoluteFill style={{ background: "#0d0b0a", opacity: dark }} />
      {f >= PULL + 24 && (
        <AbsoluteFill style={{ perspective: 1800 }}>
          <div style={{ position: "absolute", left: 960 - 445, top: 520 - 281 - 60 * ramp(f, PULL + 46, PULL + 60, inOut), width: 890, height: 561, transform: `rotateY(${180 * flip - 180}deg) scale(${lerp(1, 0.8, ramp(f, PULL + 46, PULL + 60, inOut))})`, transformStyle: "preserve-3d", opacity: ramp(f, PULL + 24, PULL + 30) }}>
            <Img src={face("metal").url} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: 32, backfaceVisibility: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }} />
          </div>
        </AbsoluteFill>
      )}
      {f >= PULL + 50 && <Logo f={f} at={PULL + 50} y={790} h={90} />}
      <Audio src={staticFile("custom/cred-night/f05.wav")} />
    </AbsoluteFill>
  );
};
