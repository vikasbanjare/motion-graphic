/**
 * CRED card test: a 15 s "engraved banknote" film for the CRED IndusInd Bank RuPay credit card.
 * UNOFFICIAL SPEC WORK, a style test. Not made, approved or commissioned by CRED or IndusInd Bank.
 *
 * Technique study after the user's reference film (engraved collage, line fields, foil, lens,
 * continuous camera). Every drawing here is original and made in code: wave line fields,
 * guilloche rosettes and an engraved card. None of the reference's illustrations, shots or
 * logos are reproduced. No logos are drawn: the official CRED / IndusInd / RuPay files are not
 * in this repo, and the rule is official files or nothing.
 *
 * Facts (on-screen copy uses only these):
 *   - "CRED IndusInd Bank RuPay credit card", first card of CRED's credit card program,
 *     launched 15 Sep 2025 (IndusInd Bank press release; Storyboard18; inc42)
 *   - "5% rewards on online shopping" (Storyboard18 headline)
 *   - zero joining fee (IndusInd press release, via search snippet)
 *   - redemption on flights, hotels and 2,000+ products on CRED store (IndusInd press release)
 *
 * Colours are measured from the reference film's frames (paper, mint, ink, black), not invented.
 * Fonts are stand-ins: Instrument Serif (headline serif), Inter (small text).
 */
import { loadFont } from "@remotion/fonts";
import React, { useEffect, useMemo, useState } from "react";
import { AbsoluteFill, Audio, Easing, Sequence, continueRender, delayRender, interpolate, staticFile, useCurrentFrame } from "remotion";

const FPS = 30;
export const CRED_TEST_FRAMES = 450;
const DIR = "custom/cred-test/";

const C = {
  paper: "#E6DCC6",
  paperHi: "#F1EADB",
  ink: "#23231F",
  green: "#2F6B45",
  mint: "#CFE3BA",
  black: "#050505",
};
const SERIF = "'Instrument Serif', serif";
const SANS = "Inter, sans-serif";

const expoOut = Easing.bezier(0.16, 1, 0.3, 1);
const morph = Easing.bezier(0.45, 0, 0.55, 1);
const easeIn = Easing.bezier(0.5, 0, 0.75, 0);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ramp = (f: number, a: number, b: number, e = morph) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: e });
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

const useFonts = () => {
  const [h] = useState(() => delayRender("cred fonts"));
  useEffect(() => {
    Promise.all([
      loadFont({ family: "Instrument Serif", url: staticFile("fonts/InstrumentSerif.woff2"), weight: "400" }),
      loadFont({ family: "Inter", url: staticFile("fonts/Inter.woff2"), weight: "100 900" }),
    ])
      .then(() => continueRender(h))
      .catch(() => continueRender(h));
  }, [h]);
};

// ---- geometry ------------------------------------------------------------------------------

const wavePath = (y0: number, x0: number, x1: number, amp: number, freq: number, phase: number, step = 8) => {
  let d = "";
  for (let x = x0; x <= x1; x += step) d += `${x === x0 ? "M" : "L"}${x.toFixed(1)},${(y0 + amp * Math.sin(x * freq + phase)).toFixed(1)}`;
  return d;
};

/** One guilloche ring: a circle whose radius waves k times around. */
const ringPath = (R: number, a: number, k: number, phase: number, n = 720) => {
  let d = "";
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2;
    const r = R + a * Math.sin(k * t + phase);
    d += `${i ? "L" : "M"}${(r * Math.cos(t)).toFixed(1)},${(r * Math.sin(t)).toFixed(1)}`;
  }
  return d + "Z";
};

/** Spirograph centre (hypotrochoid), closes after r/gcd turns. */
const spiroPath = (R: number, r: number, d0: number, turns: number, n = 2400) => {
  let d = "";
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2 * turns;
    const x = (R - r) * Math.cos(t) + d0 * Math.cos(((R - r) / r) * t);
    const y = (R - r) * Math.sin(t) - d0 * Math.sin(((R - r) / r) * t);
    d += `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return d;
};

const useRosette = () =>
  useMemo(() => {
    const rings: string[] = [];
    for (let i = 0; i < 22; i++) {
      rings.push(ringPath(180 + i * 5.5, 13, 40, i * 0.16));
      rings.push(ringPath(180 + i * 5.5, 13, 40, -i * 0.16 + Math.PI));
    }
    const spiros = Array.from({ length: 6 }, (_, i) => ({ d: spiroPath(150, 50, 92, 1), rot: i * 20 }));
    return { rings, spiros };
  }, []);

// ---- pieces --------------------------------------------------------------------------------

const FoilDefs: React.FC<{ id: string; sweep: number; w: number }> = ({ id, sweep, w }) => (
  <defs>
    <linearGradient id={`${id}-rain`} x1="0" y1="0" x2="1" y2="1">
      {["#ffb3c7", "#ffe6a3", "#b8f5d0", "#a7d8ff", "#d6b8ff", "#ffb3c7"].map((c, i) => (
        <stop key={i} offset={i / 5} stopColor={c} />
      ))}
    </linearGradient>
    <linearGradient id={`${id}-band`} x1="0" y1="0" x2="1" y2="0.35">
      <stop offset={Math.max(0, sweep - 0.18)} stopColor="#000" />
      <stop offset={sweep} stopColor="#fff" />
      <stop offset={Math.min(1, sweep + 0.18)} stopColor="#000" />
    </linearGradient>
    <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x={-w} y={-w} width={w * 2} height={w * 2}>
      <rect x={-w} y={-w} width={w * 2} height={w * 2} fill={`url(#${id}-band)`} />
    </mask>
  </defs>
);

/** Rosette in its own coordinates (centre 0,0, radius ~330). draw 0..1 draws it on; foil -0.3..1.3 sweeps. */
const Rosette: React.FC<{ draw: number; foil: number; spin: number; color: string; id: string; width?: number }> = ({ draw, foil, spin, color, id, width = 1.1 }) => {
  const { rings, spiros } = useRosette();
  const lines = (stroke: string, w: number) => (
    <g transform={`rotate(${spin})`}>
      {rings.map((d, i) => {
        const p = Math.max(0, Math.min(1, draw * 1.6 - (i / rings.length) * 0.6));
        return <path key={i} d={d} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p} fill="none" stroke={stroke} strokeWidth={w} />;
      })}
      {spiros.map((sp, i) => (
        <path key={i} d={sp.d} transform={`rotate(${sp.rot})`} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - Math.max(0, Math.min(1, draw * 1.5 - i * 0.08))} fill="none" stroke={stroke} strokeWidth={w * 0.8} />
      ))}
    </g>
  );
  return (
    <g>
      <FoilDefs id={id} sweep={foil} w={360} />
      {lines(color, width)}
      <g mask={`url(#${id}-mask)`} opacity={0.95}>
        {lines(`url(#${id}-rain)`, width * 2.2)}
      </g>
    </g>
  );
};

const CARD_W = 760;
const CARD_H = 480;

/** The engraved card face (original design: wave field, rosette emblem, chip). No logos, no text. */
const CardFace: React.FC<{ f: number; draw: number; foil: number; id: string }> = ({ f, draw, foil, id }) => {
  const waves = useMemo(() => Array.from({ length: 34 }, (_, i) => i), []);
  const fill = ramp(draw, 0.35, 0.9);
  return (
    <svg width={CARD_W} height={CARD_H} viewBox={`0 0 ${CARD_W} ${CARD_H}`} style={{ overflow: "visible" }}>
      <defs>
        <clipPath id={`${id}-clip`}>
          <rect width={CARD_W} height={CARD_H} rx={34} />
        </clipPath>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.mint} />
          <stop offset="1" stopColor={C.paperHi} />
        </linearGradient>
        <linearGradient id={`${id}-chip`} x1="0" y1="0" x2="1" y2="1">
          {["#e9d9a6", "#f6edcf", "#cdb57a", "#efe1b4"].map((c, i) => (
            <stop key={i} offset={i / 3} stopColor={c} />
          ))}
        </linearGradient>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        <rect width={CARD_W} height={CARD_H} fill={`url(#${id}-bg)`} opacity={fill} />
        {waves.map((i) => (
          <path
            key={i}
            d={wavePath(8 + i * 14, -10, CARD_W + 10, 9, 0.016, i * 0.22 + f * 0.01)}
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1 - Math.max(0, Math.min(1, draw * 1.5 - i * 0.012))}
            fill="none"
            stroke={C.green}
            strokeOpacity={0.32}
            strokeWidth={1.2}
          />
        ))}
        <g transform={`translate(${CARD_W - 190},${CARD_H / 2}) scale(0.5)`} opacity={fill}>
          <circle r={330} fill={C.paperHi} opacity={0.85} />
          <Rosette draw={1} foil={foil} spin={f * 0.12} color={C.green} id={`${id}-ros`} width={2.6} />
        </g>
        <g transform="translate(78,168)" opacity={fill}>
          <rect width={110} height={82} rx={14} fill={`url(#${id}-chip)`} stroke="#8a7a4a" strokeOpacity={0.5} />
          {[22, 41, 60].map((y) => (
            <line key={y} x1={0} x2={110} y1={y} y2={y} stroke="#8a7a4a" strokeOpacity={0.45} />
          ))}
          <line x1={55} x2={55} y1={0} y2={82} stroke="#8a7a4a" strokeOpacity={0.45} />
        </g>
      </g>
      <rect
        width={CARD_W}
        height={CARD_H}
        rx={34}
        fill="none"
        stroke={C.ink}
        strokeOpacity={0.55}
        strokeWidth={2}
        pathLength={1}
        strokeDasharray="1 1"
        strokeDashoffset={1 - Math.min(1, draw * 1.4)}
      />
    </svg>
  );
};

/** Headline words rise in (expo-out, blur to sharp) and leave (ease-in). */
const Line: React.FC<{ f: number; from: number; to: number; text: string; sub?: string; color?: string; x: number; y: number; size?: number }> = ({
  f,
  from,
  to,
  text,
  sub,
  color = C.ink,
  x,
  y,
  size = 92,
}) => {
  if (f < from - 1 || f > to + 1) return null;
  const out = ramp(f, to - 14, to, easeIn);
  const words = text.split(" ");
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 640, color, opacity: 1 - out, transform: `translateY(${-24 * out}px)` }}>
      <div style={{ fontFamily: SERIF, fontSize: size, lineHeight: 1.02, letterSpacing: -1 }}>
        {words.map((w, i) => {
          const p = ramp(f, from + i * 3, from + i * 3 + 22, expoOut);
          return (
            <span key={i} style={{ display: "inline-block", marginRight: size * 0.24, opacity: p, transform: `translateY(${(1 - p) * 46}px)`, filter: `blur(${(1 - p) * 8}px)` }}>
              {w}
            </span>
          );
        })}
      </div>
      {sub && (
        <div style={{ fontFamily: SANS, fontSize: 34, fontWeight: 400, marginTop: 18, opacity: 0.72 * ramp(f, from + 10, from + 32, expoOut), letterSpacing: 0.2 }}>{sub}</div>
      )}
    </div>
  );
};

const Grain: React.FC<{ f: number; opacity: number }> = ({ f, opacity }) => (
  <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity, mixBlendMode: "multiply" }}>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={Math.floor(f / 2)} />
      <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.32  0 0 0 0 0.28  0 0 0 0.9 0" />
    </filter>
    <rect width={1920} height={1080} filter="url(#grain)" />
  </svg>
);

// ---- the film ------------------------------------------------------------------------------

// card placement on stage: (x, y) of its centre, scale
const cardAt = (f: number) => {
  const toEnd = ramp(f, 362, 410);
  const x = mix(1225, 960, toEnd) + 6 * Math.sin(f / 37);
  const y = mix(540, 430, toEnd) + 5 * Math.sin(f / 29 + 1);
  const s = mix(1, 0.9, toEnd);
  const tilt = ramp(f, 220, 290);
  const ry = mix(0, -16, tilt) * (1 - 0.6 * toEnd) + 3 * Math.sin(f / 41);
  const rx = mix(0, 9, tilt) * (1 - 0.5 * toEnd) + 2 * Math.sin(f / 53 + 2);
  return { x, y, s, rx, ry };
};

const Card: React.FC<{ f: number; draw: number; foil: number; id: string }> = ({ f, draw, foil, id }) => {
  const c = cardAt(f);
  return (
    <div style={{ position: "absolute", left: c.x - CARD_W / 2, top: c.y - CARD_H / 2, width: CARD_W, height: CARD_H, perspective: 1800 }}>
      <div
        style={{
          width: CARD_W,
          height: CARD_H,
          transform: `scale(${c.s}) rotateX(${c.rx}deg) rotateY(${c.ry}deg)`,
          borderRadius: 34,
          boxShadow: `0 ${40 * draw}px ${90 * draw}px rgba(20,20,10,${0.28 * ramp(draw, 0.5, 1)})`,
        }}
      >
        <CardFace f={f} draw={draw} foil={foil} id={id} />
      </div>
    </div>
  );
};

export const CredCardTest: React.FC = () => {
  useFonts();
  const f = useCurrentFrame();

  // camera: one continuous slow push with drift, no resets
  const camS = 1 + 0.045 * (f / CRED_TEST_FRAMES) + 0.012 * Math.sin(f / 70);
  const camX = 10 * Math.sin(f / 90);
  const camY = 6 * Math.sin(f / 110 + 1);

  // A: wave field draws on, then gathers into the rosette
  const lines = useMemo(() => Array.from({ length: 30 }, (_, i) => i), []);
  const gather = ramp(f, 70, 150);

  // B: rosette (stage centre 1250,520) travels into the card's emblem (card-local 570,240)
  const rosDraw = ramp(f, 80, 160, Easing.bezier(0.33, 0, 0.2, 1));
  const toCard = ramp(f, 168, 215);
  const c0 = cardAt(215);
  const emblem = { x: c0.x - CARD_W / 2 + (CARD_W - 190), y: c0.y };
  const rosX = mix(1260, emblem.x, toCard);
  const rosY = mix(520, emblem.y, toCard);
  const rosS = mix(1, 0.5, toCard);
  const rosOn = 1 - ramp(f, 210, 222, Easing.linear);

  const cardDraw = ramp(f, 176, 226, Easing.bezier(0.33, 0, 0.2, 1));
  const cardFoil = mix(-0.3, 1.3, ramp(f, 372, 420, Easing.linear));

  // loupe pass over the card (chip → emblem)
  const lp = ramp(f, 244, 330);
  const lOn = ramp(f, 236, 252, expoOut) * (1 - ramp(f, 318, 334, easeIn));
  const cNow = cardAt(f);
  const lx = mix(cNow.x - 230, cNow.x + 150, lp);
  const ly = cNow.y + mix(-30, 10, lp) + 18 * Math.sin(lp * Math.PI);
  const LR = 128;

  // iris to black from the card centre
  const iris = ramp(f, 332, 368);

  const end = ramp(f, 386, 410, expoOut);
  const fadeOut = ramp(f, CRED_TEST_FRAMES - 14, CRED_TEST_FRAMES - 1, Easing.linear);

  return (
    <AbsoluteFill style={{ background: C.black }}>
      <AbsoluteFill style={{ transform: `translate(${camX}px,${camY}px) scale(${camS})`, transformOrigin: "960px 540px" }}>
        <AbsoluteFill style={{ background: `radial-gradient(ellipse at 55% 45%, ${C.paperHi} 0%, ${C.paper} 60%, #d6caae 100%)` }} />

        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
          <g opacity={1 - 0.85 * ramp(f, 80, 150, Easing.linear) - 0.15 * ramp(f, 150, 175, Easing.linear)}>
            {lines.map((i) => {
              const p = ramp(f, 2 + i * 1.6, 44 + i * 1.6, Easing.bezier(0.33, 0, 0.2, 1));
              const y0 = 120 + i * 29 + (i - 15) * 14 * gather;
              const amp = (14 + 10 * Math.sin(i * 0.7)) * (1 + 1.4 * gather);
              return (
                <path
                  key={i}
                  d={wavePath(y0, -20, 1940, amp, 0.009 + i * 0.00012, i * 0.3 + f * 0.035)}
                  pathLength={1}
                  strokeDasharray="1 1"
                  strokeDashoffset={1 - p}
                  fill="none"
                  stroke={C.ink}
                  strokeOpacity={0.62}
                  strokeWidth={1.6}
                />
              );
            })}
          </g>
          {rosDraw > 0 && rosOn > 0 && (
            <g transform={`translate(${rosX},${rosY}) scale(${rosS})`} opacity={rosOn}>
              <Rosette draw={rosDraw} foil={mix(-0.3, 1.3, ramp(f, 112, 168, Easing.linear))} spin={f * 0.12} color={C.green} id="ros" />
            </g>
          )}
        </svg>

        {/* black iris opens behind the card */}
        <AbsoluteFill style={{ background: C.black, clipPath: `circle(${iris * 2300}px at ${cNow.x}px ${cNow.y}px)` }} />

        {f >= 174 && <Card f={f} draw={cardDraw} foil={cardFoil} id="card" />}

        {/* loupe: the same card, magnified inside a ring */}
        {lOn > 0.001 && (
          <>
            <AbsoluteFill style={{ clipPath: `circle(${LR * lOn}px at ${lx}px ${ly}px)` }}>
              <AbsoluteFill style={{ background: C.paperHi }} />
              <AbsoluteFill style={{ transform: `scale(1.75)`, transformOrigin: `${lx}px ${ly}px` }}>
                <Card f={f} draw={cardDraw} foil={cardFoil} id="loupe" />
              </AbsoluteFill>
            </AbsoluteFill>
            <div
              style={{
                position: "absolute",
                left: lx - LR * lOn,
                top: ly - LR * lOn,
                width: LR * 2 * lOn,
                height: LR * 2 * lOn,
                borderRadius: "50%",
                border: `3px solid ${C.ink}`,
                boxShadow: "0 18px 40px rgba(20,20,10,.35), inset 0 0 30px rgba(255,255,255,.35)",
              }}
            />
          </>
        )}

        <Line f={f} from={104} to={196} text="5% rewards" sub="on online shopping" x={140} y={400} size={150} />
        <Line f={f} from={222} to={280} text="zero joining fee" x={140} y={430} size={118} />
        <Line f={f} from={284} to={334} text="redeem on flights & hotels" sub="and 2,000+ products on CRED store" x={140} y={380} size={108} />

        {end > 0 && (
          <div style={{ position: "absolute", left: 0, width: 1920, top: 752, textAlign: "center", color: C.paperHi, opacity: end, transform: `translateY(${(1 - end) * 30}px)` }}>
            <div style={{ fontFamily: SERIF, fontSize: 80, letterSpacing: -0.5 }}>the CRED IndusInd Bank RuPay credit card</div>
            <div style={{ fontFamily: SANS, fontSize: 30, marginTop: 16, color: C.mint, opacity: 0.8 * ramp(f, 396, 420, expoOut) }}>5% rewards on online shopping · zero joining fee</div>
          </div>
        )}
      </AbsoluteFill>

      <Grain f={f} opacity={0.22 * (1 - iris) + 0.1} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 58%, rgba(0,0,0,.28) 100%)" }} />
      <AbsoluteFill style={{ background: "#000", opacity: fadeOut }} />
      <Sound />
    </AbsoluteFill>
  );
};

// ---- sound ---------------------------------------------------------------------------------

const s = (sec: number) => Math.round(sec * FPS);
const Fx: React.FC<{ file: string; at: number; peak?: number; vol: number }> = ({ file, at, peak = 0, vol }) => (
  <Sequence from={Math.max(0, s(at - peak))}>
    <Audio src={staticFile(DIR + file)} volume={vol} />
  </Sequence>
);

const Sound: React.FC = () => (
  <>
    <Audio
      src={staticFile(DIR + "music.wav")}
      volume={(fr) => 0.55 * Math.min(1, fr / 18) * (fr > CRED_TEST_FRAMES - 60 ? mix(1, 0.4, (fr - (CRED_TEST_FRAMES - 60)) / 60) : 1)}
    />
    <Fx file="sfx-scribble.wav" at={0.1} vol={0.12} />
    <Fx file="sfx-shimmer.wav" at={3.9} vol={0.09} />
    <Fx file="sfx-tick.wav" at={3.5} vol={0.07} />
    <Fx file="sfx-whoosh.wav" at={6.4} peak={0.4} vol={0.12} />
    <Fx file="sfx-tick.wav" at={7.45} vol={0.07} />
    <Fx file="sfx-shimmer.wav" at={8.3} vol={0.07} />
    <Fx file="sfx-tick.wav" at={9.5} vol={0.07} />
    <Fx file="sfx-whoosh.wav" at={11.6} peak={0.4} vol={0.14} />
    <Fx file="sfx-swell.wav" at={12.6} peak={1.58} vol={0.09} />
    <Fx file="sfx-chime.wav" at={13.0} vol={0.1} />
  </>
);
