/**
 * Night film 06, "NeoPOP" (15 s, 360 frames, 24 fps). UNOFFICIAL SPEC WORK; facts and sources in ./kit.tsx.
 * In the language of CRED's own open-source design system NeoPOP (github.com/CRED-CLUB/neopop-web, Apache-2.0):
 * colour tokens from its primitives/colors.ts, flat colour surfaces with hard extruded edges, buttons that physically
 * press down. The benefits arrive as raised tiles that drop onto a black floor on the beat; a cursor presses
 * "5% rewards"; the tiles stack into the card; lockup. Type: Lexend 700 (stand-in for Gilroy).
 */
import React from "react";
import { AbsoluteFill, Audio, Img, staticFile, useCurrentFrame } from "remotion";
import { face } from "../v3/card.ts";
import { Logo, SANS, backOut, easeIn, expoOut, inOut, lerp, ramp, useFonts } from "./kit.tsx";

export const F06_FRAMES = 360;
// NeoPOP tokens (primitives/colors.ts)
const T = {
  black: "#0d0d0d", white: "#ffffff",
  paccha: "#E5FE40", pacchaD: "#A0B22D",
  pink: "#FF426F", pinkD: "#B32E4E",
  purple: "#6A35FF", purpleD: "#4A25B3",
  orange: "#FF8744", orangeD: "#B35F30",
  green: "#3BFFAD", greenD: "#29B379",
  manna: "#FFCB45", mannaD: "#B38E30",
};

/** A NeoPOP elevated surface: face + hard bottom and right edges (depth px). `press` 0..1 pushes it down. */
const Pop: React.FC<{ x: number; y: number; w: number; h: number; c: string; d: string; depth?: number; press?: number; children?: React.ReactNode; o?: number }> = ({ x, y, w, h, c, d, depth = 16, press = 0, children, o = 1 }) => {
  const k = depth * (1 - 0.8 * press);
  const fl = 5 * Math.sin((x + y) * 0.01 + useCurrentFrame() / 9);
  const dx = depth - k;
  return (
    <div style={{ position: "absolute", left: x + dx, top: y + dx + fl, width: w + k, height: h + k, opacity: o }}>
      <div style={{ position: "absolute", left: k, top: h, width: w, height: k, background: d, transform: "skewX(45deg)", transformOrigin: "0 0" }} />
      <div style={{ position: "absolute", left: w, top: k, width: k, height: h, background: d, filter: "brightness(0.8)", transform: "skewY(45deg)", transformOrigin: "0 0" }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, background: c, border: `2px solid ${T.white}`, boxSizing: "border-box", overflow: "hidden" }}>{children}</div>
    </div>
  );
};

const Label: React.FC<{ t: string; size: number; color?: string; align?: "left" | "center" }> = ({ t, size, color = T.black, align = "center" }) => (
  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: align === "center" ? "center" : "flex-start", padding: align === "left" ? "0 34px" : 0, fontFamily: SANS, fontWeight: 700, fontSize: size, letterSpacing: "0.02em", color, textTransform: "uppercase", lineHeight: 1 }}>{t}</div>
);

/** Drop-in: falls from above with a hard landing (back-out) at frame `at`. */
const drop = (f: number, at: number) => ({ y: lerp(-700, 0, ramp(f, at - 10, at, easeIn)) + (f >= at ? -18 * Math.exp(-(f - at) / 3) * Math.sin((f - at) * 1.3) : 0), o: f >= at - 10 ? 1 : 0 });

export const F06NeoPop: React.FC = () => {
  useFonts();
  const f = useCurrentFrame();
  const intro = drop(f, 14);
  const cardIn = ramp(f, 44, 58, expoOut);
  const pressAt = 112;
  const press = f >= pressAt - 4 ? Math.sin(Math.PI * ramp(f, pressAt - 4, pressAt + 8)) : 0;
  const cursor = { x: lerp(900, 460, ramp(f, 92, pressAt - 4, inOut)), y: lerp(1060, 780, ramp(f, 92, pressAt - 4, inOut)) };
  const tiles = [
    { at: 168, label: "flights", c: T.purple, d: T.purpleD, fg: T.white },
    { at: 180, label: "hotels", c: T.orange, d: T.orangeD, fg: T.black },
    { at: 192, label: "2,000+ products", c: T.green, d: T.greenD, fg: T.black },
  ];
  const fee = drop(f, 238);
  const stack = ramp(f, 292, 314, inOut);
  const outA = 1 - ramp(f, 122, 130, easeIn); // first page leaves after the press
  const outB = 1 - ramp(f, 226, 234, easeIn);
  const outC = 1 - ramp(f, 284, 292, easeIn);
  return (
    <AbsoluteFill style={{ background: T.black }}>
     <AbsoluteFill style={{ transform: `translate(${14 * Math.sin(f / 31)}px, ${8 * Math.cos(f / 27)}px) scale(${1.02 + 0.02 * Math.sin(f / 45)})` }}>
      {/* floor grid, scrolling */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: 0.12, transform: `translate(${-((f * 1.5) % 60)}px, ${-((f * 0.8) % 60)}px)` }}>
        {Array.from({ length: 33 }, (_, i) => <line key={`v${i}`} x1={i * 60} y1={0} x2={i * 60} y2={1080} stroke={T.white} strokeWidth={1} />)}
        {Array.from({ length: 19 }, (_, i) => <line key={`h${i}`} x1={0} y1={i * 60} x2={1920} y2={i * 60} stroke={T.white} strokeWidth={1} />)}
      </svg>

      {/* 1: introducing / the card */}
      {f < 160 && (
        <div style={{ opacity: outA }}>
          <div style={{ transform: `translateY(${intro.y}px)`, opacity: intro.o }}>
            <Pop x={120} y={120} w={520} h={110} c={T.paccha} d={T.pacchaD}><Label t="introducing" size={44} /></Pop>
          </div>
          <div style={{ position: "absolute", left: 120, top: 300, fontFamily: SANS, fontWeight: 700, fontSize: 78, lineHeight: 1.05, color: T.white, textTransform: "uppercase", opacity: cardIn, transform: `translateX(${(1 - cardIn) * -60}px)` }}>
            the CRED<br />IndusInd Bank<br />RuPay<br />credit card
          </div>
          <div style={{ position: "absolute", left: lerp(2000, 920, cardIn), top: 230, width: 860, height: 542, transform: `rotate(${lerp(12, -4, cardIn)}deg)` }}>
            <div style={{ position: "absolute", left: 18, top: 18, width: "100%", height: "100%", background: T.green, borderRadius: 34 }} />
            <Img src={face("metal").url} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: 34, border: `2px solid ${T.white}` }} />
          </div>
          {/* the press: a pink 5% button, pushed by the cursor */}
          {f >= 84 && (
            <div style={{ opacity: ramp(f, 84, 92) }}>
              <Pop x={120} y={700} w={520} h={130} c={T.pink} d={T.pinkD} depth={20} press={press}><Label t="5% rewards" size={56} color={T.white} /></Pop>
              <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
                <path d={`M ${cursor.x} ${cursor.y} l 0 70 l 18 -16 l 14 30 l 14 -6 l -14 -30 l 24 -2 Z`} fill={T.white} stroke={T.black} strokeWidth={3} transform={`translate(${press * 8} ${press * 8})`} />
              </svg>
            </div>
          )}
        </div>
      )}
      {/* 2: after the press: the 5% statement fills the frame */}
      {f >= pressAt + 2 && f < 236 && (
        <div style={{ opacity: f < 160 ? 1 : outB }}>
          {f >= 156 && (
            <>
              <div style={{ position: "absolute", left: 120, top: 120, fontFamily: SANS, fontWeight: 700, fontSize: 64, color: T.white, textTransform: "uppercase", opacity: ramp(f, 156, 166) }}>redeem on</div>
              {tiles.map((t, i) => {
                const d = drop(f, t.at);
                return (
                  <div key={i} style={{ transform: `translateY(${d.y}px)`, opacity: d.o }}>
                    <Pop x={120 + i * 580} y={300} w={520} h={360} c={t.c} d={t.d} depth={22}>
                      <Label t={t.label} size={t.label.length > 8 ? 46 : 64} color={t.fg} />
                    </Pop>
                  </div>
                );
              })}
              <div style={{ position: "absolute", left: 1280, top: 760, fontFamily: SANS, fontWeight: 700, fontSize: 40, color: T.green, textTransform: "uppercase", opacity: ramp(f, 200, 210) }}>on CRED store</div>
            </>
          )}
          {f < 160 && (() => {
            const big = drop(f, 132);
            const o = 1 - ramp(f, 150, 158, easeIn);
            return (
              <div style={{ opacity: o }}>
                <div style={{ transform: `translateY(${big.y}px)`, opacity: big.o }}>
                  <Pop x={360} y={220} w={1200} h={420} c={T.pink} d={T.pinkD} depth={30}><Label t="5% rewards" size={150} color={T.white} /></Pop>
                </div>
                <div style={{ position: "absolute", left: 0, right: 0, top: 760, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 60, color: T.paccha, textTransform: "uppercase", opacity: ramp(f, 136, 144) }}>on online shopping</div>
              </div>
            );
          })()}
        </div>
      )}
      {/* 3: ₹0 */}
      {f >= 226 && f < 296 && (
        <div style={{ opacity: outC }}>
          <div style={{ transform: `translateY(${fee.y}px)`, opacity: fee.o }}>
            <Pop x={620} y={190} w={680} h={460} c={T.paccha} d={T.pacchaD} depth={30}><Label t="₹0" size={260} /></Pop>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 760, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 84, color: T.white, textTransform: "uppercase", opacity: ramp(f, 244, 254), transform: `translateY(${(1 - ramp(f, 244, 254, expoOut)) * 30}px)` }}>zero joining fee</div>
        </div>
      )}
      {/* 4: colour slabs stack into the card */}
      {f >= 284 && (
        <>
          {[T.pink, T.purple, T.orange, T.green, T.paccha].map((c, i) => {
            const t = ramp(f, 284 + i * 3, 300 + i * 3, backOut);
            return <div key={i} style={{ position: "absolute", left: 960 - 330 + (1 - stack) * (i - 2) * 140, top: lerp(1200, 230 + i * 8 * (1 - stack), t), width: 660, height: 416, background: c, borderRadius: 30, border: `2px solid ${T.white}`, opacity: 1 - stack }} />;
          })}
          <div style={{ position: "absolute", left: 960 - 330, top: 200, width: 660, height: 416, opacity: stack }}>
            <div style={{ position: "absolute", left: 16, top: 16, width: "100%", height: "100%", background: T.green, borderRadius: 30 }} />
            <Img src={face("metal").url} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: 30, border: `2px solid ${T.white}` }} />
          </div>
          {f >= 316 && <Logo f={f} at={316} y={700} h={96} />}
        </>
      )}
     </AbsoluteFill>
      <Audio src={staticFile("custom/cred-night/f06.wav")} />
    </AbsoluteFill>
  );
};
