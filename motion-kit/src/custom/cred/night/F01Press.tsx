/**
 * Night film 01, "The Press" (18 s, 432 frames, 24 fps). UNOFFICIAL SPEC WORK; facts and sources in ./kit.tsx.
 * An engraving press prints the card like currency. Every slam of the plate prints one more thing:
 *   slam 1 prints the card + its name; slam 2 "5% rewards"; slam 3 flights, hotels, 2,000+ products; slam 4 "zero
 *   joining fee". The printed sheets then fan out like a wad of notes, the card lifts out of the fan, flips from print
 *   to metal, and lands on the lockup.
 * Look: the CRED-reference engraved world (cream paper, one ink per sheet, 45 deg hatch), a dark guilloche steel plate.
 */
import React from "react";
import { AbsoluteFill, Audio, Img, staticFile, useCurrentFrame } from "remotion";
import { face } from "../v3/card.ts";
import { Hatch, Icon, Logo, Paper, SANS, Words, easeIn, expoOut, inOut, lerp, ramp, shake, useFonts } from "./kit.tsx";

export const F01_FRAMES = 432;
const SLAMS = [46, 140, 220, 300];
const INKS = ["#2c5537", "#1f5a5e", "#262c66", "#6e2a22"];
const SHEET = { w: 1480, h: 840 };

/** The steel plate: dark, guilloche-engraved, comes down to the paper on each slam. */
const Plate: React.FC<{ y: number }> = ({ y }) => (
  <div style={{ position: "absolute", left: 960 - 820, top: y, width: 1640, height: 940, borderRadius: 18, background: "linear-gradient(160deg, #3b3d42, #1b1c20 60%, #2c2e33)", boxShadow: "0 40px 80px rgba(0,0,0,0.45), inset 0 2px 0 rgba(255,255,255,0.12)" }}>
    <svg width={1640} height={940} style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
      {Array.from({ length: 34 }, (_, i) => (
        <path key={i} fill="none" stroke="#c8c9d4" strokeWidth={1.2} d={`M -10 ${40 + i * 26} ${Array.from({ length: 70 }, (_, j) => `L ${j * 24} ${40 + i * 26 + 10 * Math.sin(j * 0.45 + i * 0.3)}`).join(" ")}`} />
      ))}
    </svg>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 36, textAlign: "center", fontFamily: SANS, fontWeight: 500, fontSize: 22, letterSpacing: "0.4em", color: "rgba(220,220,230,0.55)" }}>INTAGLIO PLATE</div>
  </div>
);

/** One printed sheet. `k` picks the content. */
const Sheet: React.FC<{ k: number; f: number; slam: number }> = ({ k, f, slam }) => {
  const ink = INKS[k];
  const wet = 1 - ramp(f, slam + 2, slam + 30); // fresh ink: slightly blurred and glossy for a moment
  const content = () => {
    if (k === 0)
      return (
        <>
          <Img src={face("print").url} style={{ position: "absolute", left: 860, top: 236, width: 540, height: 341, borderRadius: 22, boxShadow: "0 0 0 2px rgba(44,85,55,0.35)" }} />
          <div style={{ position: "absolute", left: 90, top: 300 }}>
            <Words f={f} at={slam + 6} text="the CRED IndusInd Bank" size={60} color={ink} />
            <Words f={f} at={slam + 10} text="RuPay credit card" size={60} color={ink} />
          </div>
        </>
      );
    const items = k === 1 ? ["bag", "coin"] : k === 2 ? ["plane", "suitcase", "box"] : ["tag"];
    return (
      <>
        <svg width={SHEET.w} height={SHEET.h} style={{ position: "absolute", inset: 0 }}>
          <Hatch id={`p${k}`} ink={ink} pitch={8} />
          {items.map((it, i) => {
            const p = ramp(f, slam + 2 + i * 3, slam + 16 + i * 3, expoOut);
            const n = items.length;
            const sz = k === 3 ? 420 : k === 2 ? 230 : 330;
            const x = k === 3 ? 1150 : k === 2 ? 1130 + (i - (n - 1) / 2) * 210 : 1080 + (i - (n - 1) / 2) * 290;
            return (
              <g key={it} transform={`translate(${x - sz / 2}, ${420 - sz / 2 + (1 - p) * 30}) scale(${sz / 200})`} opacity={p}>
                <Icon kind={it as never} h={`p${k}`} ink={ink} sw={3.4} />
              </g>
            );
          })}
        </svg>
        <div style={{ position: "absolute", left: 90, top: k === 2 ? 230 : 290 }}>
          {k === 1 && (
            <>
              <Words f={f} at={slam + 6} text="5% rewards" size={112} color={ink} />
              <div style={{ marginTop: 18 }}><Words f={f} at={slam + 12} text="on online shopping" size={40} color={ink} font={SANS} weight={500} tracking="-0.01em" /></div>
            </>
          )}
          {k === 2 && (
            <>
              <Words f={f} at={slam + 6} text="redeem on" size={72} color={ink} />
              <Words f={f} at={slam + 9} text="flights, hotels" size={72} color={ink} />
              <Words f={f} at={slam + 12} text="and 2,000+ products" size={72} color={ink} />
              <div style={{ marginTop: 18 }}><Words f={f} at={slam + 16} text="on CRED store" size={40} color={ink} font={SANS} weight={500} tracking="-0.01em" /></div>
            </>
          )}
          {k === 3 && <Words f={f} at={slam + 6} text="zero joining fee" size={94} color={ink} />}
        </div>
      </>
    );
  };
  return (
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(170deg, #f6f2e3, #ebe6d2)", borderRadius: 10, overflow: "hidden", filter: `blur(${wet * 1.2}px)` }}>
      {/* guilloche border, like a note */}
      <svg width={SHEET.w} height={SHEET.h} style={{ position: "absolute", inset: 0 }}>
        <rect x={26} y={26} width={SHEET.w - 52} height={SHEET.h - 52} rx={14} fill="none" stroke={ink} strokeWidth={3} opacity={0.75} />
        <rect x={40} y={40} width={SHEET.w - 80} height={SHEET.h - 80} rx={10} fill="none" stroke={ink} strokeWidth={1.2} opacity={0.6} />
        {Array.from({ length: 6 }, (_, i) => (
          <path key={i} fill="none" stroke={ink} strokeOpacity={0.22} strokeWidth={1.4} d={`M 60 ${SHEET.h - 120 + i * 10} ${Array.from({ length: 46 }, (_, j) => `L ${60 + j * 30} ${SHEET.h - 120 + i * 10 + 6 * Math.sin(j * 0.7 + i)}`).join(" ")}`} />
        ))}
      </svg>
      {content()}
      <AbsoluteFill style={{ background: "linear-gradient(110deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 70%)", opacity: wet * 0.7, transform: `translateX(${(1 - wet) * 600 - 300}px)` }} />
    </div>
  );
};

export const F01Press: React.FC = () => {
  useFonts();
  const f = useCurrentFrame();
  // plate position: hovers, slams down to cover the sheet on each slam, lifts away
  let plateY = -1000;
  for (const s of SLAMS) {
    const down = ramp(f, s - 10, s, easeIn);
    const up = ramp(f, s + 3, s + 22, expoOut);
    if (f >= s - 26 && f < s + 24) plateY = lerp(-1000, 70, f < s ? (f < s - 10 ? ramp(f, s - 26, s - 10, inOut) * 0.25 : 0.25 + 0.75 * down) : 1 - up);
  }
  const sh = SLAMS.reduce((a, s) => {
    const v = shake(f, s, 12, 5);
    return { x: a.x + v.x, y: a.y + v.y };
  }, { x: 0, y: 0 });
  // which sheet is on the bed; sheets slide off to the left between slams
  const cur = SLAMS.filter((s) => f >= s).length - 1;
  const fan = ramp(f, 356, 384, inOut);
  const lift = ramp(f, 372, 398, inOut);
  const flip = ramp(f, 384, 404, inOut);
  const toLock = ramp(f, 400, 416, inOut);
  return (
    <AbsoluteFill style={{ background: "#d9d3bf" }}>
      <AbsoluteFill style={{ transform: `translate(${sh.x}px, ${sh.y}px) scale(${1 + 0.02 * Math.sin(f / 40)})` }}>
        {/* the press bed */}
        <AbsoluteFill style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, #e6e0cc, #cfc8b1)" }} />
        {/* blank sheet waiting under the first slam */}
        {cur < 0 && <div style={{ position: "absolute", left: 960 - SHEET.w / 2, top: 120, width: SHEET.w, height: SHEET.h, background: "#f3efe0", borderRadius: 10, boxShadow: "0 18px 40px rgba(60,50,30,0.25)" }} />}
        {/* printed sheets: the current one on the bed, earlier ones slid away and stacked at left, then all fan out */}
        {SLAMS.map((s, k) => {
          if (f < s) return null;
          const off = k < cur ? 1 : 0;
          const nextS = SLAMS[k + 1] ?? 9999;
          const slide = k < cur ? 1 : ramp(f, nextS - 30, nextS - 14, inOut);
          const baseX = 960 - SHEET.w / 2 + lerp(0, -1250, slide) * (1 - fan);
          const fx = lerp(baseX, 960 - SHEET.w / 2 + (k - 1.5) * 90, fan);
          const fy = lerp(120, 170 + Math.abs(k - 1.5) * 18, fan);
          const rot = lerp(-4 * slide * (off || slide), (k - 1.5) * 9, fan);
          const sc = lerp(1, 0.62, fan);
          const hide = k === 0 ? lift : 0;
          return (
            <div key={k} style={{ position: "absolute", left: fx, top: fy, width: SHEET.w, height: SHEET.h, transform: `rotate(${rot}deg) scale(${sc})`, transformOrigin: "50% 120%", boxShadow: "0 18px 40px rgba(60,50,30,0.28)", borderRadius: 10, opacity: 1 - hide * 0.0 }}>
              <Sheet k={k} f={f} slam={s} />
            </div>
          );
        })}
        <Plate y={plateY} />
      </AbsoluteFill>
      {/* lights out behind the card */}
      {f >= 386 && <AbsoluteFill style={{ background: "#0b0b0d", opacity: ramp(f, 386, 402) }} />}
      {/* the card lifts out of the fan, flips from print to metal */}
      {f >= 372 && (
        <AbsoluteFill style={{ perspective: 1800 }}>
          <div style={{ position: "absolute", left: 960 - 400, top: lerp(lerp(520, 300, lift), 190, toLock), width: 800, height: 505, transform: `rotateY(${180 * flip}deg) scale(${lerp(0.6, 1, lift) * lerp(1, 0.62, toLock)})`, transformStyle: "preserve-3d" }}>
            <Img src={face("print").url} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: 30, backfaceVisibility: "hidden", boxShadow: "0 30px 70px rgba(0,0,0,0.35)" }} />
            <Img src={face("metal").url} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: 30, backfaceVisibility: "hidden", transform: "rotateY(180deg)", boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }} />
          </div>
        </AbsoluteFill>
      )}
      {f < 40 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 470, textAlign: "center" }}>
          <Words f={f} at={0} text="introducing" size={64} color="#2c2a24" out={30} />
        </div>
      )}
      {f >= 404 && <Logo f={f} at={404} y={640} h={110} />}
      <Paper opacity={0.8} />
      <Audio src={staticFile("custom/cred-night/f01.wav")} />
    </AbsoluteFill>
  );
};
