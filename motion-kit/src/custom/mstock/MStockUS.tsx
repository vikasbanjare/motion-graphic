/**
 * m.Stock: US stocks (spec / concept film, not an official m.Stock advertisement).
 *
 * Language: Sarvam's premium product-film grammar (docs/research/pro-film-rules.md): a white canvas with soft
 * travelling light pools, light-weight type that arrives word by word out of a blur, one morphing anchor that
 * carries the eye through every scene, overlapping scenes, no frozen holds, soft stacked shadows, grain.
 * Colour: m.Stock's own orange #E37500 and blue #00468C (from mstock.com), used as glow light and gradients on white.
 *
 * Story: the day you live on American products (you are their customer) -> the turn (now you can own them) ->
 * the coin that becomes a slice -> 5,000+ -> 100% digital, add funds in rupees -> one app for India and the US ->
 * the same products again, now with an ownership mark: customer by habit, shareholder by choice.
 * The anchor is a glossy orange coin: it appears as the question, becomes the slice, a dot in the 5,000, the
 * rupee coin that funds the wallet, the bead that joins two markets, and the mark on each product at the end.
 *
 * Words: the user's script, verbatim. Logo: the official file from mstock.com, unmodified and never cropped.
 * Icons: generic glyphs only (no other company's marks).
 */
import React, { useEffect, useState } from "react";
import { AbsoluteFill, Audio, Easing, Img, continueRender, delayRender, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/fonts";

const FPS = 30;
const s = (sec: number) => Math.round(sec * FPS);
const W = 1920;
const H = 1080;
export const MSTOCK_FRAMES = s(31);

export const BRAND = { orange: "#E37500", blue: "#00468C", orangeSoft: "#FFB46A", blueSoft: "#5B8FD0", ink: "#0B1B33", grey: "#6B7685" };
const SANS = "Inter, 'Open Sans', sans-serif";
const LOGO = "custom/mstock/logo.png";

// ---- motion grammar ---------------------------------------------------------------------------
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const expoOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeIn = Easing.bezier(0.3, 0, 0.8, 0.15);
const inOut = Easing.bezier(0.65, 0, 0.35, 1);
const morph = Easing.bezier(0.45, 0, 0.55, 1);
const p = (f: number, a: number, d: number, e = expoOut) => interpolate(f, [a, a + d], [0, 1], { ...clamp, easing: e });
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const spr = (f: number, at: number, damping = 23) => spring({ frame: f - at, fps: FPS, config: { stiffness: 158, damping, mass: 1 } });

// scene starts (seconds), from the script's timings; scenes overlap their neighbours by ~8 frames
const T = { s1: 0, s2: 4, s3: 7, s4: 10, s5: 13, s6: 16, s7: 20, s8: 24, end: 28, out: 31 };

const useFonts = () => {
  const [h] = useState(() => delayRender("mstock fonts"));
  useEffect(() => {
    loadFont({ family: "Inter", url: staticFile("fonts/Inter.woff2"), weight: "100 900" })
      .then(() => continueRender(h))
      .catch(() => continueRender(h));
  }, [h]);
};

/** Word reveal: opacity + rise + de-blur, 3-frame stagger (Sarvam). */
const Words: React.FC<{ text: string; at: number; size: number; color?: string; weight?: number; emphasis?: Record<string, string>; stagger?: number }> = ({ text, at, size, color = BRAND.ink, weight = 300, emphasis = {}, stagger = 3 }) => {
  const f = useCurrentFrame();
  return (
    <span style={{ fontFamily: SANS, fontSize: size, fontWeight: weight, letterSpacing: "-0.03em", lineHeight: 1.1, whiteSpace: "nowrap" }}>
      {text.split(" ").map((w, i) => {
        const k = p(f, at + i * stagger, 18);
        const key = w.replace(/[.,?*]/g, "");
        return (
          <span key={i} style={{ display: "inline-block", marginRight: "0.24em", opacity: k, filter: `blur(${(1 - k) * 10}px)`, transform: `translateY(${(1 - k) * 18}px)`, color: emphasis[key] ?? color, fontWeight: emphasis[key] ? Math.min(600, weight + 200) : weight }}>
            {w}
          </span>
        );
      })}
    </span>
  );
};

/** Exit: ease-in blur + rise + fade, ~65% of an entrance. */
const exitK = (f: number, at: number, d = 12) => p(f, at, d, easeIn);
const exitStyle = (k: number): React.CSSProperties => ({ opacity: 1 - k, filter: `blur(${k * 10}px)`, transform: `translateY(${-k * 22}px)` });

// ---- the stage: white canvas, travelling orange and blue light ------------------------------------
const Stage: React.FC<{ warm: number }> = ({ warm }) => {
  const f = useCurrentFrame();
  const blob = (cx: number, cy: number, w: number, color: string, ph: number, amp: number) => (
    <div
      style={{
        position: "absolute",
        left: cx - w / 2 + Math.sin(f / 46 + ph) * amp * 1.4,
        top: cy - w * 0.3 + Math.cos(f / 58 + ph) * amp * 0.5,
        width: w,
        height: w * 0.6,
        borderRadius: "50%",
        background: `radial-gradient(closest-side, ${color}, transparent)`,
        opacity: 0.78 + 0.22 * Math.sin(f / 40 + ph),
        filter: "blur(28px)",
      }}
    />
  );
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 44%, #FBFCFE 60%, #F3F7FC 74%, #E7EFF9 88%, #DDE8F6 100%)" }} />
      {blob(560, 1050, 1500, `rgba(0,70,140,${0.22 + 0.06 * (1 - warm)})`, 0, 220)}
      {blob(1380, 1090, 1300, `rgba(227,117,0,${0.16 + 0.12 * warm})`, 2.1, 260)}
      {blob(960, 1160, 1000, "rgba(255,180,106,0.22)", 4.2, 180)}
    </AbsoluteFill>
  );
};

const Grain: React.FC = () => (
  <AbsoluteFill style={{ mixBlendMode: "soft-light", opacity: 0.16, pointerEvents: "none" }}>
    <svg width={W} height={H}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="11" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width={W} height={H} filter="url(#grain)" />
    </svg>
  </AbsoluteFill>
);

const SHADOW = "0 1px 2px rgba(11,27,51,.04), 0 8px 24px rgba(0,70,140,.07), 0 30px 70px rgba(0,70,140,.12)";

// ---- generic product icons (no company marks) --------------------------------------------------------
type Kind = "stream" | "search" | "ride" | "pay";
const ICONS: { kind: Kind; label: string }[] = [
  { kind: "stream", label: "STREAM" },
  { kind: "search", label: "SEARCH" },
  { kind: "ride", label: "RIDE" },
  { kind: "pay", label: "PAY" },
];
const Glyph: React.FC<{ kind: Kind; color: string }> = ({ kind, color }) => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    {kind === "stream" ? <path d="M38 30 L72 50 L38 70 Z" fill={color} /> : null}
    {kind === "search" ? (
      <>
        <circle cx="44" cy="44" r="17" fill="none" stroke={color} strokeWidth="7" />
        <path d="M57 57 L72 72" stroke={color} strokeWidth="8" strokeLinecap="round" />
      </>
    ) : null}
    {kind === "ride" ? (
      <>
        <path d="M24 60 L30 42 Q32 37 37 37 L63 37 Q68 37 70 42 L76 60 Z" fill={color} />
        <rect x="22" y="56" width="56" height="14" rx="5" fill={color} />
        <circle cx="34" cy="71" r="6" fill="#fff" stroke={color} strokeWidth="4" />
        <circle cx="66" cy="71" r="6" fill="#fff" stroke={color} strokeWidth="4" />
        <rect x="35" y="41" width="30" height="10" rx="3" fill="#fff" opacity="0.55" />
      </>
    ) : null}
    {kind === "pay" ? (
      <>
        <rect x="22" y="32" width="56" height="38" rx="7" fill={color} />
        <rect x="22" y="40" width="56" height="7" fill="#fff" opacity="0.65" />
        <rect x="30" y="56" width="16" height="6" rx="2" fill="#fff" opacity="0.8" />
      </>
    ) : null}
  </svg>
);

/** A glass app tile with a generic glyph; `own` (0..1) adds the orange ownership ring and slice badge. */
const Tile: React.FC<{ kind: Kind; label: string; size: number; ghost?: number; own?: number }> = ({ kind, label, size, ghost = 0, own = 0 }) => {
  const g = mix(1, 0.35, ghost);
  return (
    <div style={{ position: "relative", width: size, height: size + 46, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.27,
          background: `linear-gradient(160deg, rgba(255,255,255,${0.96 * g + 0.04}), rgba(236,242,250,${g}))`,
          boxShadow: ghost > 0.5 ? "none" : SHADOW,
          border: `1.5px solid rgba(0,70,140,${0.08 + 0.25 * ghost})`,
          padding: size * 0.2,
          outline: own > 0 ? `${3 * own}px solid ${BRAND.orange}` : undefined,
          outlineOffset: 6 * own,
        }}
      >
        <Glyph kind={kind} color={ghost > 0.5 ? `rgba(0,70,140,${0.35})` : BRAND.blue} />
      </div>
      <div style={{ marginTop: 14, fontFamily: SANS, fontSize: 20, fontWeight: 600, letterSpacing: "0.18em", color: ghost > 0.5 ? "rgba(107,118,133,0.6)" : BRAND.grey }}>{label}</div>
      {own > 0 ? (
        <div style={{ position: "absolute", right: -size * 0.12, top: -size * 0.12, transform: `scale(${own})` }}>
          <CoinGlyph size={size * 0.36} slice={1} />
        </div>
      ) : null}
    </div>
  );
};

// ---- the anchor: a glossy orange coin that can open into a slice ----------------------------------------
/** slice 0 = whole coin; 1 = a wedge (60°) lifted out of it. */
const CoinGlyph: React.FC<{ size: number; slice?: number; tilt?: number; label?: string; id?: string }> = ({ size, slice = 0, tilt = 0, label, id = "c" }) => {
  const a0 = -90 - 30, a1 = -90 + 30; // the wedge, pointing up
  const r = 46;
  const pt = (a: number, rr = r) => [50 + Math.cos((a * Math.PI) / 180) * rr, 50 + Math.sin((a * Math.PI) / 180) * rr];
  const [x0, y0] = pt(a0), [x1, y1] = pt(a1);
  const lift = 10 * slice;
  const wedge = `M50 50 L${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1} Z`;
  const rest = `M50 50 L${x1} ${y1} A${r} ${r} 0 1 1 ${x0} ${y0} Z`;
  return (
    <svg viewBox="-10 -20 120 130" width={size} height={size * 1.083} style={{ overflow: "visible", transform: `perspective(600px) rotateX(${tilt}deg)` }}>
      <defs>
        <radialGradient id={`${id}g`} cx="36%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="22%" stopColor="#FFD3A0" />
          <stop offset="58%" stopColor={BRAND.orangeSoft} />
          <stop offset="88%" stopColor={BRAND.orange} />
          <stop offset="100%" stopColor="#B65A00" />
        </radialGradient>
        <linearGradient id={`${id}e`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE2BF" />
          <stop offset="1" stopColor="#C46400" />
        </linearGradient>
        <filter id={`${id}s`} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#B65A00" floodOpacity="0.28" />
        </filter>
      </defs>
      <g filter={`url(#${id}s)`}>
        {slice > 0.01 ? (
          <>
            <path d={rest} fill={`url(#${id}g)`} stroke={`url(#${id}e)`} strokeWidth="1.5" />
            <g transform={`translate(0 ${-lift}) rotate(${-6 * slice} 50 30)`}>
              <path d={wedge} fill={`url(#${id}g)`} stroke="#FFFFFF" strokeWidth={1.2 + 1.5 * slice} />
            </g>
          </>
        ) : (
          <circle cx="50" cy="50" r={r} fill={`url(#${id}g)`} stroke={`url(#${id}e)`} strokeWidth="1.5" />
        )}
        <circle cx="50" cy="50" r={r - 7} fill="none" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1.2" />
        {label ? (
          <text x="50" y={-lift - 2} textAnchor="middle" fontFamily="Inter" fontWeight={600} fontSize="13" fill={BRAND.ink}>
            {label}
          </text>
        ) : null}
      </g>
    </svg>
  );
};

// the coin's path through the film (seconds, centre x/y, size, slice)
type Key = { t: number; x: number; y: number; size: number; slice?: number; tilt?: number };
const COIN: Key[] = [
  { t: 4.3, x: 960, y: 1180, size: 40 }, // rises in from below on the question
  { t: 5.0, x: 960, y: 820, size: 70 }, // below the question
  { t: 6.8, x: 960, y: 820, size: 70 },
  { t: 7.6, x: 960, y: 800, size: 110 }, // below "US stocks, on m.Stock", clear of the logo
  { t: 9.8, x: 960, y: 800, size: 110 },
  { t: 10.8, x: 600, y: 560, size: 360, tilt: 22 }, // hero coin; the slice lifts out
  { t: 12.8, x: 600, y: 560, size: 360, slice: 1, tilt: 22 },
  { t: 13.6, x: 1306, y: 470, size: 26, slice: 1 }, // becomes one dot in the 5,000
  { t: 15.8, x: 1306, y: 470, size: 26, slice: 1 },
  { t: 16.6, x: 1200, y: 520, size: 64 }, // the rupee coin beside the phone...
  { t: 18.0, x: 1200, y: 520, size: 64 },
  { t: 18.9, x: 1590, y: 712, size: 42 }, // ...drops into the ADD FUNDS box
  { t: 19.7, x: 1590, y: 712, size: 42 },
  { t: 20.4, x: 960, y: 640, size: 54 }, // the bead that joins two markets
  { t: 23.8, x: 960, y: 640, size: 54 },
  { t: 24.6, x: 960, y: 560, size: 46 }, // hands out to the tiles' badges, then opens the end card
  { t: 27.8, x: 960, y: 560, size: 46 },
];
const coinAt = (t: number) => {
  let i = COIN.findIndex((k) => k.t > t);
  if (i === -1) i = COIN.length - 1;
  if (i === 0) return { ...COIN[0], slice: 0, tilt: 0 };
  const a = COIN[i - 1], b = COIN[i];
  const k = morph(Math.min(1, Math.max(0, (t - a.t) / (b.t - a.t))));
  return { x: mix(a.x, b.x, k), y: mix(a.y, b.y, k), size: mix(a.size, b.size, k), slice: mix(a.slice ?? 0, b.slice ?? 0, k), tilt: mix(a.tilt ?? 0, b.tilt ?? 0, k) };
};
const Coin: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  if (t < 4.2 || t > 28.4) return null;
  const c = coinAt(t);
  const bob = Math.sin(f / 22) * 8;
  const breathe = 1 + 0.02 * Math.sin(f / 15);
  const label = t > 11.6 && t < 13.5 ? "$1" : t > 16.4 && t < 20.1 ? "₹" : undefined;
  const out = p(f, s(27.9), 12, easeIn);
  return (
    <div style={{ position: "absolute", left: c.x - c.size / 2, top: c.y - c.size / 2 + bob, transform: `scale(${breathe * (1 - 0.6 * out)})`, opacity: 1 - out }}>
      <CoinGlyph size={c.size} slice={c.slice} tilt={c.tilt} label={label} id="anchor" />
    </div>
  );
};

// ---- scenes ---------------------------------------------------------------------------------------
/** 1. A day on American products: the sun crosses the day while the four tiles punch in on the beat. */
const Day: React.FC = () => {
  const f = useCurrentFrame();
  const end = s(T.s2);
  if (f > end + 40) return null;
  const sun = p(f, 0, end, inOut);
  const toGhost = p(f, end - 2, 22, inOut);
  const lift = p(f, end - 2, 26, inOut);
  const head = exitK(f, end - 6, 12);
  const ax = (u: number) => [360 + 1200 * u, 640 - 230 * Math.sin(Math.PI * u)];
  const [sx, sy] = ax(sun);
  return (
    <AbsoluteFill>
      {/* the day's arc */}
      <svg width={W} height={H} style={{ position: "absolute", inset: 0, opacity: 0.9 * (1 - toGhost) }}>
        <path d={`M360 640 Q960 180 1560 640`} fill="none" stroke="rgba(0,70,140,0.18)" strokeWidth="2" strokeDasharray="3 10" strokeLinecap="round" />
        <circle cx={sx} cy={sy} r={16} fill={sun < 0.6 ? BRAND.orange : BRAND.blue} opacity={0.9} />
        <circle cx={sx} cy={sy} r={34} fill={sun < 0.6 ? BRAND.orange : BRAND.blue} opacity={0.12} />
      </svg>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 150, ...exitStyle(head) }}>
        <Words text="Your whole day runs on" at={4} size={78} />
        <Words text="American companies." at={14} size={78} emphasis={{ American: BRAND.blue }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 0, right: 0, top: mix(560, 380, lift), display: "flex", justifyContent: "center", gap: 70 }}>
        {ICONS.map((ic, i) => {
          const at = s(1.2 + i * 0.5);
          const k = spr(f, at, 19);
          const fl = 1 - p(f, at, 8); // a quick flash on the punch
          return (
            <div key={ic.kind} style={{ opacity: Math.min(1, k * 1.5), transform: `translateY(${(1 - k) * 60}px) scale(${0.88 + 0.12 * k + 0.06 * fl * k})` }}>
              <Tile kind={ic.kind} label={ic.label} size={150} ghost={toGhost} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** 2. The question. The tiles stay above as ghosts (you use them); the coin rises in. */
const Question: React.FC = () => {
  const f = useCurrentFrame();
  const a = s(T.s2), b = s(T.s3);
  if (f < a - 2 || f > b + 20) return null;
  const out = exitK(f, b - 6, 12);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 260, ...exitStyle(out) }}>
      <Words text="How many do you own?" at={a + 8} size={96} emphasis={{ own: BRAND.orange }} />
    </AbsoluteFill>
  );
};

/** 3. The turn: a premium blue-to-orange light sweeps across; "Now you can." then the line with the official logo. */
const Turn: React.FC = () => {
  const f = useCurrentFrame();
  const a = s(T.s3), b = s(T.s4);
  if (f < a - 4 || f > b + 20) return null;
  const sweep = p(f, a - 4, 26, inOut);
  const glow = Math.sin(Math.PI * Math.min(1, (f - a + 4) / 60));
  const out = exitK(f, b - 6, 12);
  const logoK = p(f, a + 34, 20);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(105deg, transparent ${sweep * 140 - 40}%, rgba(0,70,140,0.10) ${sweep * 140 - 25}%, rgba(227,117,0,0.14) ${sweep * 140 - 10}%, transparent ${sweep * 140 + 5}%)`, opacity: glow }} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 26, paddingRight: 220, ...exitStyle(out) }}>
        <Words text="Now you can." at={a + 6} size={64} color={BRAND.grey} />
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <Words text="US stocks, on" at={a + 22} size={96} emphasis={{ US: BRAND.blue }} />
          <div style={{ opacity: logoK, filter: `blur(${(1 - logoK) * 8}px)`, transform: `translateY(${(1 - logoK) * 14}px)` }}>
            <Img src={staticFile(LOGO)} style={{ height: 112, width: "auto", display: "block" }} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** 4. Own a slice: the hero coin tilts and a slice lifts out with $1 on it. */
const Slice: React.FC = () => {
  const f = useCurrentFrame();
  const a = s(T.s4), b = s(T.s5);
  if (f < a - 2 || f > b + 20) return null;
  const out = exitK(f, b - 8, 12);
  return (
    <AbsoluteFill style={{ ...exitStyle(out) }}>
      <div style={{ position: "absolute", left: 980, top: 400, display: "flex", flexDirection: "column", gap: 16 }}>
        <Words text="Own a slice." at={a + 10} size={96} emphasis={{ slice: BRAND.orange }} />
        <Words text="From one dollar.*" at={a + 26} size={64} color={BRAND.grey} />
      </div>
      <div style={{ position: "absolute", left: 990, top: 960, fontFamily: SANS, fontSize: 20, color: BRAND.grey, opacity: p(f, a + 40, 16) * 0.85 }}>*T&C apply.</div>
    </AbsoluteFill>
  );
};

/** 5. 5,000+: a field of dots fills (the coin becomes one of them) as the count rolls up. */
const Universe: React.FC = () => {
  const f = useCurrentFrame();
  const a = s(T.s5), b = s(T.s6);
  if (f < a - 4 || f > b + 22) return null;
  const out = exitK(f, b - 6, 14);
  const fill = p(f, a + 4, 52, inOut);
  const n = Math.round(5000 * fill);
  const cols = 50, rows = 22;
  const dots = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const order = ((i * 7919) % (cols * rows)) / (cols * rows); // scatter the fill order
      const on = fill > order;
      const x = 760 + c * 22, y = 250 + r * 22;
      const col = (r + c) % 7 === 0 ? BRAND.orange : (r * 3 + c) % 5 === 0 ? BRAND.blueSoft : BRAND.blue;
      dots.push(<circle key={i} cx={x} cy={y + Math.sin(f / 30 + c * 0.3) * 2} r={on ? 6 : 2.5} fill={on ? col : "rgba(0,70,140,0.12)"} opacity={on ? 0.9 : 1} />);
    }
  return (
    <AbsoluteFill style={{ ...exitStyle(out) }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0, opacity: p(f, a, 14) }}>
        {dots}
      </svg>
      <div style={{ position: "absolute", left: 150, top: 360, display: "flex", flexDirection: "column", gap: 10 }}>
        <span style={{ fontFamily: SANS, fontSize: 170, fontWeight: 300, letterSpacing: "-0.04em", color: BRAND.ink, fontVariantNumeric: "tabular-nums", opacity: p(f, a + 4, 14) }}>
          {n.toLocaleString("en-US")}
          <span style={{ color: BRAND.orange, opacity: p(f, a + 52, 10) }}>+</span>
        </span>
        <Words text="US stocks and ETFs." at={a + 30} size={56} color={BRAND.grey} emphasis={{ ETFs: BRAND.blue }} />
      </div>
    </AbsoluteFill>
  );
};

/** 6. 100% digital account opening, then add funds in rupees: one phone, a progress ring, then the wallet. */
const Phone: React.FC = () => {
  const f = useCurrentFrame();
  const a = s(T.s6), b = s(T.s7);
  if (f < a - 4 || f > b + 22) return null;
  const enter = spr(f, a, 25);
  const out = exitK(f, b - 6, 14);
  const ring = p(f, a + 10, 48, inOut);
  const funds = p(f, a + s(2.2), 30, inOut);
  const steps = ["Details", "Verify", "Done"];
  const bal = Math.round(10000 * funds);
  return (
    <AbsoluteFill style={{ ...exitStyle(out) }}>
      <div style={{ position: "absolute", left: 120, top: 360, display: "flex", flexDirection: "column", gap: 18 }}>
        <Words text="100% digital" at={a + 6} size={92} emphasis={{ "100%": BRAND.orange }} />
        <Words text="account opening." at={a + 12} size={64} color={BRAND.grey} />
        <div style={{ height: 22 }} />
        <Words text="Add funds in rupees." at={a + s(2.0)} size={64} emphasis={{ rupees: BRAND.blue }} />
      </div>
      <div style={{ position: "absolute", left: 1290, top: 150, width: 380, height: 780, borderRadius: 56, background: "linear-gradient(160deg, #FFFFFF, #F4F7FB)", boxShadow: SHADOW, border: "1.5px solid rgba(0,70,140,0.08)", transform: `translateY(${(1 - enter) * 120}px) rotate(${(1 - enter) * 4 + Math.sin(f / 50) * 0.6}deg)`, opacity: Math.min(1, enter * 1.4), overflow: "hidden" }}>
        <div style={{ margin: "26px auto 0", width: 110, height: 28, borderRadius: 16, background: "#0B1B33" }} />
        <div style={{ padding: "40px 34px 0", fontFamily: SANS }}>
          <div style={{ fontSize: 22, color: BRAND.grey, letterSpacing: "0.1em", fontWeight: 600 }}>OPEN ACCOUNT</div>
          <svg width="312" height="230" viewBox="0 0 312 230" style={{ marginTop: 18 }}>
            <circle cx="156" cy="115" r="92" fill="none" stroke="rgba(0,70,140,0.1)" strokeWidth="14" />
            <circle cx="156" cy="115" r="92" fill="none" stroke={BRAND.orange} strokeWidth="14" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 92 * ring} ${2 * Math.PI * 92}`} transform="rotate(-90 156 115)" />
            <text x="156" y="128" textAnchor="middle" fontFamily="Inter" fontWeight={300} fontSize="46" fill={BRAND.ink}>{Math.round(100 * ring)}%</text>
          </svg>
          {steps.map((st, i) => {
            const k = p(f, a + 16 + i * 14, 12);
            return (
              <div key={st} style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14, opacity: 0.35 + 0.65 * k }}>
                <div style={{ width: 28, height: 28, borderRadius: 14, background: k > 0.5 ? BRAND.blue : "rgba(0,70,140,0.12)", color: "#fff", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div>
                <div style={{ fontSize: 22, color: BRAND.ink }}>{st}</div>
              </div>
            );
          })}
          <div style={{ marginTop: 34, padding: "18px 20px", borderRadius: 20, background: "rgba(227,117,0,0.08)", opacity: p(f, a + s(2.0), 14) }}>
            <div style={{ fontSize: 18, color: BRAND.grey, letterSpacing: "0.08em", fontWeight: 600 }}>ADD FUNDS</div>
            <div style={{ fontSize: 44, color: BRAND.ink, fontWeight: 300, marginTop: 6, fontVariantNumeric: "tabular-nums" }}>₹ {bal.toLocaleString("en-IN")}</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** 7. One app for Indian and US investing: two market cards slide together and become one. */
const OneApp: React.FC = () => {
  const f = useCurrentFrame();
  const a = s(T.s7), b = s(T.s8);
  if (f < a - 4 || f > b + 22) return null;
  const enter = spr(f, a, 25);
  const join = p(f, a + 40, 36, morph);
  const out = exitK(f, b - 6, 14);
  const spark = (seed: number, color: string) => (
    <svg width="300" height="90" viewBox="0 0 300 90">
      <path d={Array.from({ length: 30 }, (_, i) => `${i ? "L" : "M"}${i * 10.3} ${60 - 30 * (i / 29) - 12 * Math.sin(i * 0.9 + seed) - 6 * Math.sin(i * 2.3 + seed)}`).join(" ")} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${700 * p(f, a + 10, 40, inOut)} 700`} />
    </svg>
  );
  const card = (title: string, color: string, seed: number, side: -1 | 1) => (
    <div style={{ position: "absolute", left: 960 + side * mix(480, 200, join) - 190, top: 330 + (1 - enter) * 80, width: 380, height: 330, borderRadius: 34, background: "linear-gradient(160deg,#FFFFFF,#F5F8FC)", boxShadow: SHADOW, border: "1.5px solid rgba(0,70,140,0.08)", padding: 34, opacity: Math.min(1, enter * 1.4) * (1 - 0.0 * join), transform: `rotate(${side * 3 * (1 - join)}deg)` }}>
      <div style={{ fontFamily: SANS, fontSize: 22, fontWeight: 600, letterSpacing: "0.12em", color }}>{title}</div>
      <div style={{ marginTop: 40 }}>{spark(seed, color)}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{ ...exitStyle(out) }}>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 140 }}>
        <Words text="One app for Indian and US investing." at={a + 8} size={72} emphasis={{ One: BRAND.orange, Indian: BRAND.blue, US: BRAND.blue }} />
      </AbsoluteFill>
      {card("INDIAN STOCKS", BRAND.orange, 1.3, -1)}
      {card("US STOCKS", BRAND.blue, 3.7, 1)}
      {/* the joined app card frame wraps both once they meet */}
      <div style={{ position: "absolute", left: 960 - 410, top: 310, width: 820, height: 370, borderRadius: 44, border: `2px solid rgba(227,117,0,${0.5 * join})`, boxShadow: join > 0.5 ? "0 30px 80px rgba(0,70,140,.10)" : "none", opacity: join }} />
    </AbsoluteFill>
  );
};

/** 8. The same four products again, each now marked as owned. */
const Shareholder: React.FC = () => {
  const f = useCurrentFrame();
  const a = s(T.s8), b = s(T.end);
  if (f < a - 4 || f > b + 20) return null;
  const out = exitK(f, b - 4, 14);
  return (
    <AbsoluteFill style={{ ...exitStyle(out) }}>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 170, flexDirection: "column", gap: 10 }}>
        <Words text="Customer by habit." at={a + 6} size={70} color={BRAND.grey} />
        <Words text="Shareholder by choice." at={a + 24} size={92} emphasis={{ Shareholder: BRAND.orange }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 0, right: 0, top: 560, display: "flex", justifyContent: "center", gap: 70 }}>
        {ICONS.map((ic, i) => {
          const k = spr(f, a + 4 + i * 4, 23);
          const own = spr(f, a + 34 + i * 6, 19);
          return (
            <div key={ic.kind} style={{ opacity: Math.min(1, k * 1.4), transform: `translateY(${(1 - k) * 40}px)` }}>
              <Tile kind={ic.kind} label={ic.label} size={130} own={own} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** End card: a circle opens from the coin into the premium blue-to-orange card with the official logo. */
const EndCard: React.FC = () => {
  const f = useCurrentFrame();
  const a = s(T.end);
  if (f < a - 6) return null;
  const r = 2300 * Math.pow(p(f, a - 6, 26, inOut), 1.2);
  const k = p(f, a + 12, 22);
  const drift = 1 + 0.0015 * (f - a);
  return (
    <AbsoluteFill style={{ clipPath: `circle(${Math.max(1, r)}px at 960px 560px)` }}>
      <AbsoluteFill style={{ background: "radial-gradient(120% 90% at 50% 110%, #FFD9B0 0%, #FFFFFF 46%, #FFFFFF 100%)" }} />
      <AbsoluteFill style={{ background: `radial-gradient(60% 40% at 50% 100%, rgba(227,117,0,0.18), transparent), radial-gradient(70% 50% at 10% 100%, rgba(0,70,140,0.14), transparent)` }} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 40, transform: `scale(${drift})` }}>
        <div style={{ opacity: k, filter: `blur(${(1 - k) * 10}px)`, transform: `translateY(${(1 - k) * 16}px)` }}>
          <Img src={staticFile(LOGO)} style={{ height: 150, width: "auto", display: "block" }} />
        </div>
        <Words text="US stocks, now on m.Stock." at={a + 26} size={44} color={BRAND.grey} emphasis={{ US: BRAND.blue }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 46, textAlign: "center", fontFamily: SANS, fontSize: 19, lineHeight: 1.5, color: "rgba(11,27,51,0.6)", opacity: p(f, a + 30, 18) }}>
        *T&C apply. Investments in securities market are subject to market risks. Read all the related documents carefully before investing.
        <br />
        Concept film, not an official m.Stock advertisement.
      </div>
    </AbsoluteFill>
  );
};

export const MStockUS: React.FC<{ score?: string }> = ({ score }) => {
  useFonts();
  const f = useCurrentFrame();
  const t = f / FPS;
  // one continuous camera: a slow push that eases (never resets) across the film
  const cam = 1 + 0.035 * (1 - Math.cos((Math.PI * Math.min(t, T.end)) / T.end)) / 2;
  const warm = Math.min(1, Math.max(0, (t - 7) / 3)) * (t < 20 ? 1 : 0.6);
  return (
    <AbsoluteFill style={{ background: "#FFFFFF" }}>
      <Stage warm={warm} />
      <AbsoluteFill style={{ transform: `scale(${cam})` }}>
        <Day />
        <Question />
        <Turn />
        <Slice />
        <Universe />
        <Phone />
        <OneApp />
        <Shareholder />
        <Coin />
      </AbsoluteFill>
      <EndCard />
      <Grain />
      {score ? <Audio src={staticFile(score)} /> : null}
    </AbsoluteFill>
  );
};
