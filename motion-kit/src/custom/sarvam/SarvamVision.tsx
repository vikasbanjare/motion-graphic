/**
 * Sarvam Vision 2.1: a bespoke 16:9 product film in Sarvam's product-film language
 * (from their Saaras V4 / Voice agents / Content Studio videos and brand film):
 * - white canvas with a lavender glow rising from the bottom, light sans, sentence case;
 * - words revealed one at a time with a blur; the second line in grey;
 * - gem icons (four-petal flower, star, diamond, clover) floating around the words;
 * - a petal-edged blossom orb; gradient title and end cards; fades, not cuts.
 * Timing follows docs/research/dataset.md: a held opening (~3.6 s), the busiest beat a third
 * in (the handwritten form -> structured data transformation), a calm last tenth and a held,
 * still end card. Colours: Sarvam's named swatches and colours sampled from their films.
 * Facts: Sarvam's Vision 2.1 launch post (see specs/custom/sarvam-vision-v3.md).
 */
import { loadFont } from "@remotion/fonts";
import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  continueRender,
  delayRender,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const FPS = 30;
const s = (sec: number) => Math.round(sec * FPS);

// ---- palette -------------------------------------------------------------------------------
export const C = {
  ink: "#141414",
  grey: "#8C8C99",
  blue: "#373AC0", // Sarvam Blue (brand video swatch)
  orange: "#D5630E", // Sarvam Orange (brand video swatch)
  white: "#FFFFFF",
  paper: "#FFFDF7",
  pencil: "#2B2F6B",
};
export const CANVAS = "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 46%, #F9FAFD 62%, #F2F5FF 72%, #E2E9FF 86%, #D2DCFC 100%)";
export const TITLE_CARD = "linear-gradient(180deg, #4340D1 0%, #544ED2 12%, #665DCF 25%, #7C6ED1 38%, #8F80CF 50%, #A58FCF 62%, #B69FCE 74%, #D3B1C2 87%, #EEBCB3 100%)";
export const END_CARD = "linear-gradient(180deg, #282858 0%, #2D2E6E 12%, #323486 25%, #3839A0 36%, #4B4FB5 48%, #616ACA 60%, #7786E7 72%, #8DA0F9 84%, #A8B6FA 92%, #BBCBFA 100%)";

export const SANS = "Inter, 'Noto Sans Devanagari', sans-serif";
export const HAND = "Kalam, 'Noto Sans Devanagari', cursive";

// ---- timeline (seconds) ----------------------------------------------------------------------
const T = {
  intro: [0, 3.7],
  built: [3.5, 6.7],
  form: [6.5, 13.9],
  langs: [13.7, 18.1],
  bench: [17.9, 21.7],
  live: [21.5, 25.3],
  end: [25.1, 28.4],
} as const;
export const SARVAM_VISION_FRAMES = s(28.4);

// ---- fonts ---------------------------------------------------------------------------------
const FONTS: [string, string, string][] = [
  ["Inter", "fonts/Inter.woff2", "100 900"],
  ["Kalam", "fonts/sarvam/kalam-devanagari-400-normal.woff2", "400"],
  ["Kalam", "fonts/sarvam/kalam-latin-400-normal.woff2", "400"],
  ["Noto Sans Devanagari", "fonts/sarvam/noto-sans-devanagari-devanagari-400-normal.woff2", "400"],
  ["Noto Sans Tamil", "fonts/sarvam/noto-sans-tamil-tamil-400-normal.woff2", "400"],
  ["Noto Sans Bengali", "fonts/sarvam/noto-sans-bengali-bengali-400-normal.woff2", "400"],
  ["Noto Sans Telugu", "fonts/sarvam/noto-sans-telugu-telugu-400-normal.woff2", "400"],
  ["Noto Sans Gujarati", "fonts/sarvam/noto-sans-gujarati-gujarati-400-normal.woff2", "400"],
  ["Noto Sans Kannada", "fonts/sarvam/noto-sans-kannada-kannada-400-normal.woff2", "400"],
  ["Noto Sans Malayalam", "fonts/sarvam/noto-sans-malayalam-malayalam-400-normal.woff2", "400"],
  ["Noto Sans Gurmukhi", "fonts/sarvam/noto-sans-gurmukhi-gurmukhi-400-normal.woff2", "400"],
  ["Noto Sans Oriya", "fonts/sarvam/noto-sans-oriya-oriya-400-normal.woff2", "400"],
];
export const useFonts = () => {
  const [handle] = useState(() => delayRender("sarvam fonts"));
  useEffect(() => {
    Promise.all(FONTS.map(([family, file, weight]) => loadFont({ family, url: staticFile(file), weight })))
      .then(() => continueRender(handle))
      .catch((e) => {
        console.error(e);
        continueRender(handle);
      });
  }, [handle]);
};

// ---- helpers -------------------------------------------------------------------------------
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.22, 1, 0.36, 1);
/** 0 -> 1 over `dur` frames from `start`, eased. */
const prog = (f: number, start: number, dur: number) => interpolate(f, [start, start + dur], [0, 1], { ...clamp, easing: ease });
/** Section envelope: fade/blur in over 14 frames, out over 12. */
const envelope = (f: number, len: number) => Math.min(prog(f, 0, 14), 1 - prog(f, len - 12, 12));

/** Words appear one by one: fade, de-blur, rise. */
const Words: React.FC<{ text: string; start: number; color?: string; size: number; weight?: number; stagger?: number; font?: string; emphasis?: Record<string, string> }> = ({
  text,
  start,
  color = C.ink,
  size,
  weight = 300,
  stagger = 4,
  font = SANS,
  emphasis = {},
}) => {
  const f = useCurrentFrame();
  return (
    <span style={{ fontFamily: font, fontSize: size, fontWeight: weight, letterSpacing: "-0.02em", lineHeight: 1.15, whiteSpace: "pre-wrap" }}>
      {text.split(" ").map((w, i) => {
        const p = prog(f, start + i * stagger, 16);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: p,
              filter: `blur(${(1 - p) * 10}px)`,
              transform: `translateY(${(1 - p) * 14}px)`,
              color: emphasis[w.replace(/[.,]/g, "")] ?? color,
              marginRight: "0.26em",
            }}
          >
            {w}
          </span>
        );
      })}
    </span>
  );
};

// ---- gems ----------------------------------------------------------------------------------
export type GemKind = "flower" | "star" | "diamond" | "clover" | "scallop";
export const GEM_COLORS: Record<GemKind, [string, string]> = {
  flower: ["#8E8BF0", "#373AC0"],
  star: ["#FBB264", "#D5630E"],
  diamond: ["#F7A8C8", "#D63C7C"],
  clover: ["#B7E07C", "#3E8E3E"],
  scallop: ["#F3D2E8", "#9D8CE6"],
};
export const gemPath = (k: GemKind) => {
  switch (k) {
    case "flower": // four rounded petals
      return "M50 8 C64 8 66 30 58 42 C70 34 92 36 92 50 C92 64 70 66 58 58 C66 70 64 92 50 92 C36 92 34 70 42 58 C30 66 8 64 8 50 C8 36 30 34 42 42 C34 30 36 8 50 8 Z";
    case "star": // soft four-point star
      return "M50 4 C54 34 66 46 96 50 C66 54 54 66 50 96 C46 66 34 54 4 50 C34 46 46 34 50 4 Z";
    case "diamond":
      return "M50 6 C56 6 94 44 94 50 C94 56 56 94 50 94 C44 94 6 56 6 50 C6 44 44 6 50 6 Z";
    case "clover":
      return "M50 14 C62 2 84 10 80 30 C98 30 104 54 88 62 C100 78 82 98 64 86 C58 100 42 100 36 86 C18 98 0 78 12 62 C-4 54 2 30 20 30 C16 10 38 2 50 14 Z";
    case "scallop": {
      const pts: string[] = [];
      const n = 10;
      for (let i = 0; i < n; i++) {
        const a0 = (i / n) * Math.PI * 2;
        const a1 = ((i + 0.5) / n) * Math.PI * 2;
        const a2 = ((i + 1) / n) * Math.PI * 2;
        const p = (a: number, r: number) => `${(50 + Math.cos(a) * r).toFixed(1)} ${(50 + Math.sin(a) * r).toFixed(1)}`;
        pts.push(`${i === 0 ? "M" : "L"}${p(a0, 40)} Q${p(a1, 52)} ${p(a2, 40)}`);
      }
      return pts.join(" ") + " Z";
    }
  }
};
const Gem: React.FC<{ kind: GemKind; x: number; y: number; size: number; delay: number; spin?: number; id: string }> = ({ kind, x, y, size, delay, spin = 0, id }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = spring({ frame: f - delay, fps, config: { damping: 14, stiffness: 120, mass: 0.7 } });
  const bob = Math.sin((f + delay * 7) / 22) * 7;
  const [c1, c2] = GEM_COLORS[kind];
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2 + bob,
        transform: `scale(${k}) rotate(${spin * f * 0.4 + (1 - k) * -40}deg)`,
        opacity: Math.min(1, k * 1.4),
        filter: `drop-shadow(0 ${size * 0.08}px ${size * 0.12}px ${c2}40)`,
        overflow: "visible",
      }}
    >
      <defs>
        <radialGradient id={id} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="28%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </radialGradient>
      </defs>
      <path d={gemPath(kind)} fill={`url(#${id})`} />
    </svg>
  );
};

// ---- backgrounds ---------------------------------------------------------------------------
const Canvas: React.FC = () => <AbsoluteFill style={{ backgroundImage: CANVAS }} />;

/** A soft arch of light inside the gradient title card (Saaras V4 title card). */
const ArchGlow: React.FC<{ color: string; opacity: number }> = ({ color, opacity }) => (
  <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center" }}>
    <div style={{ width: 900, height: 820, borderRadius: "450px 450px 0 0", background: `radial-gradient(60% 70% at 50% 100%, ${color} 0%, transparent 75%)`, opacity, filter: "blur(30px)" }} />
  </AbsoluteFill>
);

// ---- sections ------------------------------------------------------------------------------
const Intro: React.FC<{ len: number }> = ({ len }) => {
  const f = useCurrentFrame();
  const out = prog(f, len - 14, 14);
  return (
    <AbsoluteFill style={{ backgroundImage: TITLE_CARD, opacity: 1 - out, transform: `scale(${1 - out * 0.04})` }}>
      <ArchGlow color="#FFE3D2" opacity={0.55 + 0.15 * Math.sin(f / 20)} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 18 }}>
        <Words text="Introducing" start={6} size={34} color="rgba(255,255,255,0.82)" weight={400} />
        <Words text="Sarvam Vision 2.1" start={26} size={96} color={C.white} weight={300} stagger={6} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Built: React.FC<{ len: number }> = ({ len }) => {
  const f = useCurrentFrame();
  const o = envelope(f, len);
  return (
    <AbsoluteFill style={{ opacity: o, filter: `blur(${(1 - o) * 6}px)` }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 4 }}>
        <Words text="Built to read" start={4} size={64} />
        <Words text="India's documents" start={16} size={64} color={C.grey} emphasis={{ "India's": C.blue }} />
      </AbsoluteFill>
      <Gem id="g1" kind="flower" x={560} y={340} size={112} delay={22} spin={0.3} />
      <Gem id="g2" kind="star" x={1380} y={300} size={86} delay={28} spin={-0.4} />
      <Gem id="g3" kind="diamond" x={1420} y={730} size={78} delay={34} />
      <Gem id="g4" kind="clover" x={520} y={750} size={92} delay={40} spin={0.2} />
      <Gem id="g5" kind="scallop" x={960} y={235} size={64} delay={46} spin={0.5} />
      <Gem id="g6" kind="star" x={300} y={540} size={52} delay={50} spin={0.6} />
      <Gem id="g7" kind="flower" x={1640} y={520} size={58} delay={54} spin={-0.3} />
    </AbsoluteFill>
  );
};

/** The hero: a handwritten Hindi application form is scanned and becomes structured data. */
export const FORM_LINES: { label: string; value: string; key: string; out: string }[] = [
  { label: "नाम", value: "सुनीता वर्मा", key: "name", out: "Sunita Verma" },
  { label: "पता", value: "14, गोमती नगर, लखनऊ", key: "address", out: "14, Gomti Nagar, Lucknow" },
  { label: "मोबाइल", value: "98xxxxxx21", key: "mobile", out: "98xxxxxx21" },
  { label: "राशि", value: "₹ 25,000", key: "amount", out: "25000" },
];
export const TABLE = [
  ["महीना", "किस्त"],
  ["जनवरी", "₹ 5,000"],
  ["फ़रवरी", "₹ 5,000"],
];

const Form: React.FC<{ len: number }> = ({ len }) => {
  const f = useCurrentFrame();
  const o = envelope(f, len);
  const write = (i: number) => prog(f, 10 + i * 9, 16); // handwriting appears line by line
  const scan = interpolate(f, [s(1.9), s(3.1)], [0, 1], clamp); // scan bar sweeps the page
  const shift = prog(f, s(3.2), 22); // page slides left, data card arrives
  const row = (i: number) => prog(f, s(3.6) + i * 7, 14);
  const paperX = 960 - 330 * shift - 290;
  return (
    <AbsoluteFill style={{ opacity: o }}>
      {/* caption, small, at the top: the three things it reads */}
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 92 }}>
        <Words text="Forms · Complex tables · Handwriting" start={4} size={30} color={C.grey} weight={400} stagger={5} emphasis={{ Handwriting: C.blue }} />
      </AbsoluteFill>

      {/* the paper */}
      <div
        style={{
          position: "absolute",
          left: paperX,
          top: 200,
          width: 580,
          height: 700,
          background: C.paper,
          borderRadius: 18,
          boxShadow: "0 30px 80px rgba(55,58,192,0.14), 0 2px 8px rgba(20,20,20,0.06)",
          transform: `rotate(${-1.6 + shift * 1.6}deg)`,
          padding: "44px 48px",
          overflow: "hidden",
        }}
      >
        <div style={{ fontFamily: SANS, fontSize: 18, letterSpacing: "0.12em", color: C.grey, textTransform: "uppercase" }}>आवेदन पत्र · Application</div>
        <div style={{ height: 1, background: "#E7E3D8", margin: "18px 0 24px" }} />
        {FORM_LINES.map((l, i) => {
          const hit = prog(f, s(2.0) + i * 6, 10) * (1 - prog(f, s(3.4), 12)); // highlight as the scan passes
          return (
            <div key={l.key} style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 22 }}>
              <span style={{ fontFamily: SANS, fontSize: 20, color: C.grey, width: 92 }}>{l.label}</span>
              <span
                style={{
                  fontFamily: HAND,
                  fontSize: 34,
                  color: C.pencil,
                  clipPath: `inset(0 ${(1 - write(i)) * 100}% 0 0)`,
                  borderBottom: "1.5px dashed #D9D4C6",
                  flex: 1,
                  paddingBottom: 2,
                  background: `rgba(55,58,192,${0.1 * hit})`,
                  borderRadius: 6,
                }}
              >
                {l.value}
              </span>
            </div>
          );
        })}
        <div style={{ marginTop: 10, border: "1.5px solid #D9D4C6", borderRadius: 10, overflow: "hidden" }}>
          {TABLE.map((r, i) => (
            <div key={i} style={{ display: "flex", borderTop: i ? "1.5px solid #E7E3D8" : undefined, opacity: write(4 + i) }}>
              {r.map((c, j) => (
                <div key={j} style={{ flex: 1, padding: "8px 16px", fontFamily: i ? HAND : SANS, fontSize: i ? 28 : 18, color: i ? C.pencil : C.grey, borderLeft: j ? "1.5px solid #E7E3D8" : undefined }}>
                  {c}
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* scan bar */}
        {scan > 0 && scan < 1 ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: scan * 700 - 40, height: 80, background: "linear-gradient(180deg, rgba(55,58,192,0) 0%, rgba(55,58,192,0.18) 48%, rgba(55,58,192,0.55) 50%, rgba(55,58,192,0.18) 52%, rgba(55,58,192,0) 100%)" }} />
        ) : null}
      </div>

      {/* arrow */}
      <div style={{ position: "absolute", left: 958, top: 530, opacity: prog(f, s(3.4), 12), fontFamily: SANS, fontSize: 40, color: C.blue, fontWeight: 300 }}>→</div>

      {/* structured data card */}
      <div
        style={{
          position: "absolute",
          left: 1040,
          top: 300,
          width: 560,
          opacity: shift,
          transform: `translateX(${(1 - shift) * 60}px)`,
          background: "rgba(255,255,255,0.92)",
          borderRadius: 18,
          boxShadow: "0 30px 80px rgba(55,58,192,0.16), 0 0 0 1px rgba(55,58,192,0.08)",
          padding: "28px 34px",
        }}
      >
        <div style={{ fontFamily: SANS, fontSize: 18, color: C.grey, marginBottom: 18, display: "flex", justifyContent: "space-between" }}>
          <span>Structured output</span>
          <span style={{ color: C.blue }}>Sarvam Vision 2.1</span>
        </div>
        {FORM_LINES.map((l, i) => (
          <div key={l.key} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 0", borderTop: "1px solid #EEF0FA", opacity: row(i), transform: `translateY(${(1 - row(i)) * 10}px)` }}>
            <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 19, color: C.grey, width: 110 }}>{l.key}</span>
            <span style={{ fontFamily: SANS, fontSize: 25, color: C.ink, fontWeight: 400, flex: 1 }}>{l.out}</span>
            <svg width="22" height="22" viewBox="0 0 22 22" style={{ opacity: row(i) }}>
              <circle cx="11" cy="11" r="10" fill={C.blue} />
              <path d="M6 11.5 L9.5 15 L16 7.5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        ))}
        <div style={{ fontFamily: SANS, fontSize: 17, color: C.grey, paddingTop: 12, borderTop: "1px solid #EEF0FA", opacity: row(4) }}>+ table: 2 rows · महीना, किस्त</div>
      </div>
    </AbsoluteFill>
  );
};

export const SCRIPTS: [string, string][] = [
  ["हिन्दी", "Noto Sans Devanagari"],
  ["தமிழ்", "Noto Sans Tamil"],
  ["বাংলা", "Noto Sans Bengali"],
  ["తెలుగు", "Noto Sans Telugu"],
  ["ગુજરાતી", "Noto Sans Gujarati"],
  ["ಕನ್ನಡ", "Noto Sans Kannada"],
  ["മലയാളം", "Noto Sans Malayalam"],
  ["ਪੰਜਾਬੀ", "Noto Sans Gurmukhi"],
  ["ଓଡ଼ିଆ", "Noto Sans Oriya"],
  ["मराठी", "Noto Sans Devanagari"],
  ["English", "Inter"],
];

/** Petal-edged blossom orb that breathes, ringed by Indian scripts (Saaras V4 orb). */
const Languages: React.FC<{ len: number }> = ({ len }) => {
  const f = useCurrentFrame();
  const o = envelope(f, len);
  const breathe = 1 + 0.035 * Math.sin(f / 9);
  const grow = spring({ frame: f - 4, fps: FPS, config: { damping: 16, stiffness: 90 } });
  const R = 290;
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <svg viewBox="0 0 100 100" width={300} height={300} style={{ transform: `translateY(-70px) scale(${grow * breathe}) rotate(${f * 0.25}deg)`, filter: "drop-shadow(0 24px 40px rgba(55,58,192,0.25))", overflow: "visible" }}>
          <defs>
            <radialGradient id="orb" cx="40%" cy="35%" r="75%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#C9C3F7" />
              <stop offset="70%" stopColor="#8E86E8" />
              <stop offset="100%" stopColor="#F2B9B0" />
            </radialGradient>
          </defs>
          <path d={gemPath("scallop")} fill="url(#orb)" />
        </svg>
      </AbsoluteFill>
      {SCRIPTS.map(([w, font], i) => {
        const a = (i / SCRIPTS.length) * Math.PI * 2 - Math.PI / 2 + f * 0.004;
        const p = prog(f, 10 + i * 4, 14);
        return (
          <div
            key={w}
            style={{
              position: "absolute",
              left: 960 + Math.cos(a) * R * 1.55 - 80,
              top: 470 + Math.sin(a) * R * 0.78 - 22,
              width: 160,
              textAlign: "center",
              fontFamily: font,
              fontSize: 30,
              color: w === "English" ? C.blue : "#5A5A6A",
              opacity: p * 0.9,
              filter: `blur(${(1 - p) * 8}px)`,
            }}
          >
            {w}
          </div>
        );
      })}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", flexDirection: "column", paddingBottom: 150, gap: 2 }}>
        <Words text="22 Indian languages" start={22} size={54} />
        <Words text="plus English" start={34} size={54} color={C.grey} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Bench: React.FC<{ len: number }> = ({ len }) => {
  const f = useCurrentFrame();
  const o = envelope(f, len);
  const n = interpolate(f, [10, 40], [70, 87.3], { ...clamp, easing: ease });
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 8 }}>
        <Words text="olmOCR-Bench" start={2} size={28} color={C.grey} weight={400} />
        <div style={{ fontFamily: SANS, fontSize: 168, fontWeight: 200, color: C.ink, letterSpacing: "-0.04em", lineHeight: 1, opacity: prog(f, 8, 12) }}>{n.toFixed(1)}</div>
        <Words text="State of the art" start={30} size={54} color={C.blue} />
        <div style={{ fontFamily: SANS, fontSize: 18, color: C.grey, marginTop: 10, opacity: prog(f, 44, 12) }}>Sarvam-reported score</div>
      </AbsoluteFill>
      {/* gem burst around the score ("Last Detail" confetti in the Saaras V4 film) */}
      {([
        ["star", 600, 290, 84],
        ["flower", 1320, 330, 104],
        ["clover", 1290, 800, 80],
        ["diamond", 660, 790, 70],
        ["scallop", 430, 540, 58],
        ["star", 1500, 560, 56],
        ["diamond", 960, 180, 46],
        ["flower", 820, 930, 48],
        ["clover", 1110, 160, 42],
      ] as [GemKind, number, number, number][]).map(([k, x, y, z], i) => (
        <Gem key={i} id={`b${i}`} kind={k} x={x} y={y} size={z} delay={34 + i * 3} spin={i % 2 ? 0.3 : -0.3} />
      ))}
    </AbsoluteFill>
  );
};

const Live: React.FC<{ len: number }> = ({ len }) => {
  const f = useCurrentFrame();
  const o = envelope(f, len);
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 4 }}>
        <Words text="Sarvam Vision 2.1" start={4} size={72} />
        <Words text="Live now" start={18} size={72} color={C.grey} />
        <div style={{ marginTop: 34, fontFamily: SANS, fontSize: 28, color: C.blue, fontWeight: 400, opacity: prog(f, 34, 14), borderBottom: `1.5px solid ${C.blue}`, paddingBottom: 4 }}>sarvam.ai →</div>
      </AbsoluteFill>
      <Gem id="l1" kind="flower" x={960} y={300} size={84} delay={8} spin={0.3} />
    </AbsoluteFill>
  );
};

const End: React.FC = () => {
  const f = useCurrentFrame();
  const inn = prog(f, 0, 18);
  const logo = prog(f, 12, 24);
  return (
    <AbsoluteFill style={{ backgroundImage: END_CARD, opacity: inn }}>
      <ArchGlow color="#A8B6FA" opacity={0.35} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <Img src={staticFile("brand/sarvam/wordmark-light.svg")} style={{ width: 420, opacity: logo, filter: `blur(${(1 - logo) * 10}px)`, transform: `scale(${0.96 + 0.04 * logo})` }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---- audio ---------------------------------------------------------------------------------
const VO: [string, number][] = [
  ["a", 0.35],
  ["b", 3.85],
  ["c", 7.0],
  ["d", 14.2],
  ["e", 18.35],
  ["f", 21.95],
];
const VO_LEN: Record<string, number> = { a: 2.44, b: 1.87, c: 4.44, d: 2.58, e: 2.36, f: 2.62 };
const speaking = (t: number) => VO.some(([k, at]) => t >= at - 0.1 && t <= at + VO_LEN[k] + 0.1);

const Sound: React.FC = () => {
  const dir = "custom/sarvam-v3/";
  return (
    <>
      <Audio
        src={staticFile(dir + "music.mp3")}
        volume={(fr) => {
          const t = fr / FPS;
          const fadeIn = Math.min(1, t / 1.2);
          const fadeOut = Math.min(1, Math.max(0, (28.4 - t) / 2.2));
          return (speaking(t) ? 0.13 : 0.24) * fadeIn * fadeOut;
        }}
      />
      {VO.map(([k, at]) => (
        <Sequence key={k} from={s(at)}>
          <Audio src={staticFile(`${dir}vo-${k}.wav`)} volume={1} />
        </Sequence>
      ))}
      <Sequence from={s(3.4)}>
        <Audio src={staticFile(dir + "sfx-whoosh.wav")} volume={0.35} />
      </Sequence>
      <Sequence from={s(T.form[0] + 1.75)}>
        <Audio src={staticFile(dir + "sfx-riser.wav")} volume={0.25} />
      </Sequence>
      <Sequence from={s(T.form[0] + 3.55)}>
        <Audio src={staticFile(dir + "sfx-chime.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={s(T.bench[0] + 1.2)}>
        <Audio src={staticFile(dir + "sfx-notify.wav")} volume={0.25} />
      </Sequence>
      <Sequence from={s(T.end[0] + 0.3)}>
        <Audio src={staticFile(dir + "sfx-whoosh.wav")} volume={0.25} />
      </Sequence>
    </>
  );
};

// ---- film ----------------------------------------------------------------------------------
const Section: React.FC<{ at: readonly [number, number]; children: (len: number) => React.ReactNode }> = ({ at, children }) => {
  const len = s(at[1] - at[0]);
  return (
    <Sequence from={s(at[0])} durationInFrames={len}>
      {children(len)}
    </Sequence>
  );
};

export const SarvamVision: React.FC = () => {
  useFonts();
  return (
    <AbsoluteFill style={{ background: C.white }}>
      <Canvas />
      <Section at={T.built}>{(len) => <Built len={len} />}</Section>
      <Section at={T.form}>{(len) => <Form len={len} />}</Section>
      <Section at={T.langs}>{(len) => <Languages len={len} />}</Section>
      <Section at={T.bench}>{(len) => <Bench len={len} />}</Section>
      <Section at={T.live}>{(len) => <Live len={len} />}</Section>
      <Section at={T.intro}>{(len) => <Intro len={len} />}</Section>
      <Sequence from={s(T.end[0])}>
        <End />
      </Sequence>
      <Sound />
    </AbsoluteFill>
  );
};
