/**
 * Night film 07, "Swiss" (15 s, 360 frames, 24 fps). UNOFFICIAL SPEC WORK; facts and sources in ./kit.tsx.
 * Kinetic typography in the editorial / Swiss style from the research playbook (style 3/4): off-white paper, a
 * visible 12-column grid, heavy sans with serif-italic emphasis, one lime accent, a hard cut on every beat (125 BPM),
 * one phrase per beat. Devices: the card set inline in the sentence, a word-by-word build that stays, a struck-out
 * "joining fee" that "zero" lands on. Ends on the card on the grid, then the lockup.
 */
import React from "react";
import { AbsoluteFill, Audio, Img, staticFile, useCurrentFrame } from "remotion";
import { face } from "../v3/card.ts";
import { BEAT, Logo, SANS, SERIF, expoOut, inOut, lerp, ramp, useFonts } from "./kit.tsx";

export const F07_FRAMES = 360;
const PAPER = "#f2f0ea", INK = "#111111", LIME = "#d9f95a";
const b = (n: number) => Math.round(n * BEAT); // beat -> frame

const Grid: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
    {Array.from({ length: 13 }, (_, i) => <line key={i} x1={96 + i * 144} y1={0} x2={96 + i * 144} y2={1080} stroke={dark ? "#fff" : INK} strokeOpacity={0.07} />)}
    <line x1={0} y1={96} x2={1920} y2={96} stroke={dark ? "#fff" : INK} strokeOpacity={0.12} />
    <line x1={0} y1={984} x2={1920} y2={984} stroke={dark ? "#fff" : INK} strokeOpacity={0.12} />
  </svg>
);

/** Heavy sans word. */
const W: React.FC<{ t: string; size: number; color?: string; italic?: boolean; hl?: boolean }> = ({ t, size, color = INK, italic, hl }) => (
  <span style={{ fontFamily: italic ? SERIF : SANS, fontWeight: italic ? 500 : 700, fontStyle: italic ? "italic" : undefined, fontSize: size, letterSpacing: italic ? "-0.02em" : "-0.045em", color, lineHeight: 0.95, background: hl ? LIME : undefined, padding: hl ? "0 0.08em" : undefined, fontVariationSettings: italic ? "'opsz' 72" : undefined }}>{t}</span>
);

/** A hard-cut card: appears on its frame with a 4-frame settle (no fade). */
const Cut: React.FC<{ f: number; from: number; to: number; children: React.ReactNode; dark?: boolean }> = ({ f, from, to, children, dark }) => {
  if (f < from || f >= to) return null;
  const s = lerp(1.035, 1, ramp(f, from, from + 4, expoOut)) + (f - from) * 0.0009;
  return (
    <AbsoluteFill style={{ background: dark ? INK : PAPER }}>
      <Grid dark={dark} />
      <AbsoluteFill style={{ transform: `translateX(${-(f - from) * 1.1}px) scale(${s})`, transformOrigin: "10% 50%" }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

const at = (x: number, y: number, c: React.ReactNode) => <div style={{ position: "absolute", left: x, top: y, whiteSpace: "nowrap" }}>{c}</div>;

export const F07Swiss: React.FC = () => {
  useFonts();
  const f = useCurrentFrame();
  const build = (k: number) => f >= b(14 + k * 1.5);
  const strike = ramp(f, b(24), b(24) + 8, inOut);
  const cardT = ramp(f, b(27), b(30), inOut);
  return (
    <AbsoluteFill style={{ background: PAPER }}>
      <Cut f={f} from={0} to={b(2)}>{at(96, 420, <><W t="the " size={120} italic /><W t="CRED" size={240} /></>)}</Cut>
      <Cut f={f} from={b(2)} to={b(4)}>{at(96, 400, <W t="IndusInd Bank" size={230} />)}</Cut>
      <Cut f={f} from={b(4)} to={b(6)}>
        {at(96, 330, <W t="RuPay" size={230} />)}
        {at(96, 580, <><W t="credit card " size={170} italic /></>)}
        <Img src={face("metal").url} style={{ position: "absolute", left: 1110, top: 560, width: 420, height: 265, borderRadius: 18, transform: `rotate(${-6 + 6 * ramp(f, b(4), b(6))}deg)` }} />
      </Cut>
      <Cut f={f} from={b(6)} to={b(8)}>{at(96, 140, <W t="5%" size={760} hl />)}</Cut>
      <Cut f={f} from={b(8)} to={b(10)}>
        {at(96, 330, <W t="rewards" size={250} />)}
        {at(110, 620, <W t="on online shopping" size={110} italic />)}
      </Cut>
      <Cut f={f} from={b(10)} to={b(13.5)} dark>
        {at(96, 380, <W t="redeem" size={260} color={PAPER} />)}
        {f >= b(11.5) && at(1180, 470, <W t="on" size={180} color={LIME} italic />)}
      </Cut>
      <Cut f={f} from={b(13.5)} to={b(21)}>
        {at(96, 140, <W t="redeem on" size={110} italic />)}
        {build(0) && at(96, 300, <W t="flights," size={170} />)}
        {build(1) && at(96, 470, <W t="hotels" size={170} />)}
        {build(2) && at(96, 640, <><W t="and " size={170} italic /><W t="2,000+ products" size={170} hl /></>)}
        {f >= b(19) && at(100, 860, <W t="on CRED store" size={64} italic />)}
      </Cut>
      <Cut f={f} from={b(21)} to={b(27)}>
        {at(96, 420, <span style={{ position: "relative", display: "inline-block" }}>
          <W t="joining fee" size={230} />
          <span style={{ position: "absolute", left: -10, top: "50%", height: 24, marginTop: -6, width: `${strike * 103}%`, background: INK }} />
        </span>)}
        {f >= b(24.5) && at(96, 150, <W t="zero" size={260} hl />)}
      </Cut>
      <Cut f={f} from={b(27)} to={b(30.5)}>
        <div style={{ position: "absolute", left: 960 - 420, top: 250, width: 840, height: 530, perspective: 1600 }}>
          <Img src={face("metal").url} style={{ width: "100%", height: "100%", borderRadius: 36, transform: `rotateX(${lerp(55, 8, cardT)}deg) rotateZ(${lerp(-20, -4, cardT)}deg)`, boxShadow: `0 40px 80px rgba(0,0,0,${0.35 * cardT})` }} />
        </div>
        {at(96, 860, <><W t="CRED IndusInd Bank " size={62} /><W t="RuPay credit card" size={62} italic /></>)}
      </Cut>
      {f >= b(30.5) && (
        <AbsoluteFill style={{ background: INK }}>
          <Grid dark />
          <Logo f={f} at={b(30.5)} y={400} h={150} />
        </AbsoluteFill>
      )}
      <Audio src={staticFile("custom/cred-night/f07.wav")} />
    </AbsoluteFill>
  );
};
