import React, { useMemo } from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { faceTexture } from "../v2/Studio.tsx";
import { expoOut, ramp } from "../../../ensemble/score.ts";
import { Holo } from "./kit.tsx";
import { T } from "../v5/looks.ts";

/**
 * Outro (561-645), after the "Milestones on CRED" reference: a clean white set, the card as a glossy flat object,
 * the card dropping into a phone that shows it in a CRED-style card screen, small words either side of the phone,
 * then the screen goes dark and the camera pushes into it, landing on the (dark) logo lockup.
 * Copy is limited to the approved claims; the logo is the official file, unmodified.
 */
const W = 1920, H = 1080;
const LOGO = staticFile("custom/cred-v2/cred-logo.png");
const CW = 856, CH = 540; // card on the set
const smooth = (t: number) => t * t * (3 - 2 * t);

const useCardImage = () => useMemo(() => (faceTexture(false, true).image as HTMLCanvasElement).toDataURL("image/png"), []);

/** The card as a glossy flat object: printed face, official logo, a gloss sweep that crosses once. */
const Card: React.FC<{ src: string; w: number; gloss: number; shadow?: number }> = ({ src, w, gloss, shadow = 1 }) => {
  const h = (w * CH) / CW;
  return (
    <div style={{ position: "relative", width: w, height: h, borderRadius: w * 0.04, overflow: "hidden", boxShadow: `0 ${w * 0.04}px ${w * 0.09}px rgba(20,22,30,${0.35 * shadow})` }}>
      <Img src={src} style={{ position: "absolute", inset: 0, width: w, height: h }} />
      <Img src={LOGO} style={{ position: "absolute", left: w * 0.06, top: w * 0.055, height: w * 0.11 }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(115deg, rgba(255,255,255,0) ${gloss * 140 - 40}%, rgba(255,255,255,0.32) ${gloss * 140 - 25}%, rgba(255,255,255,0) ${gloss * 140 - 10}%)` }} />
    </div>
  );
};

/** A front-on phone (titanium frame, black bezel, dynamic island) with a CRED-style card screen. */
const PW = 430, PH = 880;
const SLOT = { x: 24, y: 150, w: PW - 2 * 18 - 48 }; // card slot inside the screen
const Phone: React.FC<{ src: string; F: number; dark: number; cardIn: number }> = ({ src, F, dark, cardIn }) => {
  const row = (i: number) => expoOut(ramp(F, 612 + i * 6, 622 + i * 6));
  const rows = ["5% rewards on online shopping", "zero joining fee", "redeem on flights, hotels and 2,000+ products on CRED store"];
  return (
    <div style={{ position: "relative", width: PW, height: PH, borderRadius: 74, background: "linear-gradient(135deg, #d9d9dd, #8d8d93 40%, #e6e6ea 60%, #a6a6ac)", padding: 6, boxShadow: "0 40px 90px rgba(20,22,30,0.28), 0 10px 24px rgba(20,22,30,0.18)" }}>
      {/* side buttons */}
      <div style={{ position: "absolute", left: -4, top: 190, width: 5, height: 70, borderRadius: 3, background: "#9a9aa0" }} />
      <div style={{ position: "absolute", left: -4, top: 280, width: 5, height: 70, borderRadius: 3, background: "#9a9aa0" }} />
      <div style={{ position: "absolute", right: -4, top: 240, width: 5, height: 110, borderRadius: 3, background: "#9a9aa0" }} />
      <div style={{ position: "absolute", inset: 6, borderRadius: 68, background: "#0b0b0d", padding: 12 }}>
        <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 56, overflow: "hidden", background: "#f5f5f3" }}>
          {/* status bar + island */}
          <div style={{ position: "absolute", left: 30, top: 18, fontFamily: "Lexend", fontWeight: 500, fontSize: 17, color: "#111" }}>9:41</div>
          <div style={{ position: "absolute", left: "50%", top: 12, width: 118, height: 34, marginLeft: -59, borderRadius: 20, background: "#0b0b0d" }} />
          <div style={{ position: "absolute", left: 24, top: 82, fontFamily: "Newsreader", fontWeight: 600, fontSize: 30, color: "#141416", letterSpacing: -0.5 }}>your card</div>
          {/* card slot */}
          <div style={{ position: "absolute", left: SLOT.x, top: SLOT.y, opacity: cardIn }}>
            <Card src={src} w={SLOT.w} gloss={ramp(F, 606, 640)} shadow={0.6} />
          </div>
          <div style={{ position: "absolute", left: 24, top: SLOT.y + (SLOT.w * CH) / CW + 26, right: 24, opacity: expoOut(ramp(F, 606, 616)) }}>
            <div style={{ fontFamily: "Lexend", fontWeight: 600, fontSize: 19, color: "#141416" }}>CRED IndusInd Bank RuPay credit card</div>
            <div style={{ height: 1, background: "#e2e2de", margin: "18px 0 10px" }} />
            {rows.map((r, i) => (
              <div key={r} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", opacity: row(i), transform: `translateY(${(1 - row(i)) * 10}px)` }}>
                <div style={{ flex: "0 0 24px", height: 24, borderRadius: 12, background: "#1f7a55", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontFamily: "Lexend" }}>✓</div>
                <div style={{ fontFamily: "Lexend", fontWeight: 400, fontSize: 16, lineHeight: 1.35, color: "#2a2a30" }}>{r}</div>
              </div>
            ))}
          </div>
          {/* the screen goes dark before the push-in */}
          <div style={{ position: "absolute", inset: 0, background: "#000", opacity: dark }} />
        </div>
      </div>
    </div>
  );
};

/** Words that arrive one by one, small sans, as in the reference. */
const Words: React.FC<{ text: string; F: number; at: number; align: "left" | "right"; x: number }> = ({ text, F, at, align, x }) => (
  <div style={{ position: "absolute", top: H / 2 - 40, [align]: x, width: 520, textAlign: align, fontFamily: "Lexend", fontWeight: 500, fontSize: 36, lineHeight: 1.2, color: "#17171b", letterSpacing: -0.5 } as React.CSSProperties}>
    {text.split(" ").map((w, i) => {
      const k = expoOut(ramp(F, at + i * 3, at + i * 3 + 10));
      return (
        <span key={i} style={{ display: "inline-block", marginRight: 10, opacity: k, filter: `blur(${(1 - k) * 8}px)`, transform: `translateY(${(1 - k) * 12}px)` }}>
          {w}
        </span>
      );
    })}
  </div>
);

export const Outro: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const src = useCardImage();
  // 1. pull back from the card's foil stripe (the shell's iridescence was the stripe)
  const pull = expoOut(ramp(F, T.studio, T.studio + 18));
  const stripe = { x: (1380 / 2048) * CW, y: (646 / 1292) * CH };
  // 2. the card floats, then tilts back and drops into the phone
  const drop = smooth(ramp(F, 590, 606));
  const phoneIn = expoOut(ramp(F, 586, 606));
  const phoneY = H / 2 - PH / 2 + 980 * (1 - phoneIn);
  // card position: centre of the set -> the phone's card slot
  const slotX = W / 2 - PW / 2 + 6 + 12 + SLOT.x, slotY = phoneY + 6 + 12 + SLOT.y;
  const cardW = CW + (SLOT.w - CW) * drop;
  const cx = W / 2 - CW / 2 + (slotX - (W / 2 - CW / 2)) * drop;
  const cy = H / 2 - CH / 2 - 10 + Math.sin(((F - T.studio) / 24) * 1.4) * 6 * (1 - drop) + (slotY - (H / 2 - CH / 2)) * drop;
  const tiltX = 10 * (1 - drop) + 55 * Math.sin(Math.PI * drop), tiltY = -14 * (1 - drop);
  const handed = F >= 606; // the card now lives inside the phone's screen
  // 3. the screen goes dark and the camera pushes into it
  const dark = ramp(F, 630, 638);
  const push = ramp(F, 634, T.lockup);
  const z = 1 + 9 * push * push;
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse 70% 60% at 50% 45%, #ffffff, #ececea 70%, #e2e2df)" }}>
      <AbsoluteFill style={{ transform: `scale(${z})`, transformOrigin: `${W / 2}px ${phoneY + PH / 2}px` }}>
        {F >= 584 ? (
          <div style={{ position: "absolute", left: W / 2 - PW / 2, top: phoneY }}>
            <Phone src={src} F={F} dark={dark} cardIn={handed ? 1 : 0} />
          </div>
        ) : null}
        {!handed ? (
          <AbsoluteFill style={{ perspective: 1600 }}>
            <div style={{ position: "absolute", left: cx, top: cy, transformOrigin: `${stripe.x}px ${stripe.y}px`, transform: `scale(${1 + 5 * (1 - pull)}) rotateX(${tiltX}deg) rotateY(${tiltY}deg)` }}>
              <Card src={src} w={cardW} gloss={ramp(F, 568, 592)} />
            </div>
          </AbsoluteFill>
        ) : null}
        {F >= 604 ? (
          <>
            <Words text="the CRED IndusInd Bank" F={F} at={606} align="right" x={W / 2 + PW / 2 + 70} />
            <Words text="RuPay credit card." F={F} at={614} align="left" x={W / 2 + PW / 2 + 70} />
          </>
        ) : null}
      </AbsoluteFill>
      {/* the shell's iridescence resolving into the stripe */}
      <AbsoluteFill style={{ opacity: 1 - ramp(F, T.studio, T.studio + 10) }}>
        <Holo phase={(F - T.card) / 60} style={{ inset: 0, mixBlendMode: "normal", opacity: 1 }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
