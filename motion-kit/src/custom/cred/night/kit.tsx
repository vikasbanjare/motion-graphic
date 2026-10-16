/**
 * Shared kit for the overnight CRED card set (films 01-10). UNOFFICIAL SPEC WORK.
 * Facts allowed on screen (IndusInd Bank press release, Storyboard18, inc42): "CRED IndusInd Bank RuPay credit card",
 * "5% rewards on online shopping", "zero joining fee", "redeem on flights, hotels and 2,000+ products on CRED store".
 * Fonts are OFL stand-ins (Newsreader for CRED's Cirka, Lexend for Gilroy). Logo: CRED's own file, unmodified.
 */
import { loadFont } from "@remotion/fonts";
import React, { useEffect, useState } from "react";
import { AbsoluteFill, Easing, Img, continueRender, delayRender, interpolate, staticFile } from "remotion";

export const FPS = 24;
export const BEAT = 11.52; // 125 BPM at 24 fps
export const expoOut = Easing.bezier(0.16, 1, 0.3, 1);
export const inOut = Easing.bezier(0.45, 0, 0.55, 1);
export const easeIn = Easing.bezier(0.5, 0, 0.75, 0);
export const backOut = Easing.bezier(0.34, 1.56, 0.64, 1);
const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const ramp = (f: number, a: number, b: number, e: (t: number) => number = inOut) => interpolate(f, [a, b], [0, 1], { ...CL, easing: e });
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const SERIF = "'Newsreader', serif";
export const SANS = "'Lexend', sans-serif";
export const LOGO = staticFile("custom/cred-v2/cred-logo.png"); // 192 x 228, white on transparent

export const useFonts = (extra: { family: string; url: string; weight: string }[] = []) => {
  const [h] = useState(() => delayRender("night fonts"));
  useEffect(() => {
    Promise.all([
      loadFont({ family: "Newsreader", url: staticFile("fonts/Newsreader-opsz.woff2"), weight: "200 800" }),
      loadFont({ family: "Lexend", url: staticFile("fonts/Lexend-500.woff2"), weight: "500" }),
      loadFont({ family: "Lexend", url: staticFile("fonts/Lexend-700.woff2"), weight: "700" }),
      ...extra.map((e) => loadFont({ family: e.family, url: staticFile(e.url), weight: e.weight })),
    ])
      .then(() => continueRender(h))
      .catch(() => continueRender(h));
  }, [h]);
};

/** Deterministic camera shake that decays after an impact frame. */
export const shake = (f: number, at: number, amp = 10, decay = 6) => {
  if (f < at) return { x: 0, y: 0 };
  const t = f - at;
  const k = amp * Math.exp(-t / decay);
  return { x: k * Math.sin(t * 2.9 + at), y: k * Math.cos(t * 3.7 + at * 0.7) };
};

/** Static paper grain (soft-light). */
export const Paper: React.FC<{ opacity?: number; heavy?: boolean }> = ({ opacity = 1, heavy }) => (
  <AbsoluteFill style={{ mixBlendMode: "soft-light", pointerEvents: "none", opacity }}>
    <Img src={staticFile(heavy ? "custom/cred-v2/paper-heavy.png" : "custom/cred-v2/paper.png")} style={{ width: "100%", height: "100%" }} />
  </AbsoluteFill>
);

/** SVG defs: 45-degree engraving hatches in light / mid / dark weights for one ink. */
export const Hatch: React.FC<{ id: string; ink: string; pitch?: number }> = ({ id, ink, pitch = 7 }) => (
  <defs>
    {[
      ["l", 0.9],
      ["m", 1.8],
      ["d", 3.2],
    ].map(([k, w]) => (
      <pattern key={k as string} id={`${id}-${k}`} width={pitch} height={pitch} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width={w as number} height={pitch} fill={ink} />
      </pattern>
    ))}
  </defs>
);

/** Engraved line-art icons (original). Drawn in a 200 x 200 box; fill with Hatch patterns of id `h`. */
export const Icon: React.FC<{ kind: "bag" | "plane" | "suitcase" | "box" | "tag" | "coin" | "globe" | "bell"; h: string; ink: string; sw?: number }> = ({ kind, h, ink, sw = 4 }) => {
  const st = { stroke: ink, strokeWidth: sw, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  switch (kind) {
    case "bag":
      return (
        <g>
          <path d="M 40 70 L 160 70 L 172 186 L 28 186 Z" fill={`url(#${h}-m)`} {...st} />
          <path d="M 40 70 L 160 70 L 166 120 L 34 120 Z" fill={`url(#${h}-d)`} opacity={0.5} />
          <path d="M 70 70 Q 70 22 100 22 Q 130 22 130 70" fill="none" {...st} />
        </g>
      );
    case "plane":
      return (
        <g transform="rotate(-18 100 100)">
          <path d="M 18 100 Q 18 90 34 90 L 160 90 Q 186 92 190 100 Q 186 108 160 110 L 34 110 Q 18 110 18 100 Z" fill={`url(#${h}-m)`} {...st} />
          <path d="M 92 92 L 64 40 L 82 40 L 128 92 Z" fill={`url(#${h}-d)`} {...st} />
          <path d="M 92 108 L 64 160 L 82 160 L 128 108 Z" fill={`url(#${h}-d)`} {...st} />
          <path d="M 30 92 L 20 64 L 32 64 L 48 92 Z" fill={`url(#${h}-d)`} {...st} />
        </g>
      );
    case "suitcase":
      return (
        <g>
          <rect x={26} y={62} width={148} height={112} rx={14} fill={`url(#${h}-m)`} {...st} />
          <path d="M 76 62 L 76 40 Q 76 32 84 32 L 116 32 Q 124 32 124 40 L 124 62" fill="none" {...st} />
          <rect x={56} y={62} width={14} height={112} fill={`url(#${h}-d)`} {...st} />
          <rect x={130} y={62} width={14} height={112} fill={`url(#${h}-d)`} {...st} />
        </g>
      );
    case "box":
      return (
        <g>
          <path d="M 30 80 L 100 50 L 170 80 L 100 110 Z" fill={`url(#${h}-l)`} {...st} />
          <path d="M 30 80 L 100 110 L 100 186 L 30 156 Z" fill={`url(#${h}-m)`} {...st} />
          <path d="M 170 80 L 100 110 L 100 186 L 170 156 Z" fill={`url(#${h}-d)`} {...st} />
          <path d="M 65 65 L 135 95 L 135 120" fill="none" {...st} />
        </g>
      );
    case "tag":
      return (
        <g>
          <path d="M 20 100 L 60 50 L 182 50 L 182 150 L 60 150 Z" fill={`url(#${h}-l)`} {...st} />
          <circle cx={58} cy={100} r={9} fill="none" {...st} />
          <text x={124} y={124} textAnchor="middle" fontFamily={SERIF} fontWeight={700} fontSize={72} fill={ink}>
            ₹0
          </text>
        </g>
      );
    case "coin":
      return (
        <g>
          <circle cx={100} cy={100} r={78} fill={`url(#${h}-m)`} {...st} />
          <circle cx={100} cy={100} r={60} fill="none" {...st} strokeDasharray="3 7" />
          <text x={100} y={122} textAnchor="middle" fontFamily={SERIF} fontWeight={700} fontSize={62} fill={ink}>
            5%
          </text>
        </g>
      );
    case "globe":
      return (
        <g>
          <circle cx={100} cy={100} r={80} fill={`url(#${h}-l)`} {...st} />
          <ellipse cx={100} cy={100} rx={36} ry={80} fill="none" {...st} />
          <path d="M 20 100 L 180 100 M 30 62 L 170 62 M 30 138 L 170 138" fill="none" {...st} />
        </g>
      );
    case "bell":
      return (
        <g>
          <path d="M 40 150 Q 40 70 100 70 Q 160 70 160 150 Z" fill={`url(#${h}-m)`} {...st} />
          <rect x={26} y={150} width={148} height={16} rx={4} fill={`url(#${h}-d)`} {...st} />
          <circle cx={100} cy={60} r={9} fill={ink} />
        </g>
      );
  }
};

/** A line of text that rises in by words and can carry a travelling sheen (SVG, survives multi-frame renders). */
export const Words: React.FC<{
  f: number; at: number; text: string; size: number; color: string; font?: string; weight?: number; stagger?: number;
  italic?: boolean; tracking?: string; out?: number; rise?: number;
}> = ({ f, at, text, size, color, font = SERIF, weight = 600, stagger = 2.5, italic, tracking = "-0.025em", out, rise = 0.45 }) => {
  const o = out !== undefined ? 1 - ramp(f, out, out + 8, easeIn) : 1;
  return (
    <div style={{ fontFamily: font, fontWeight: weight, fontSize: size, color, letterSpacing: tracking, lineHeight: 1.02, fontStyle: italic ? "italic" : undefined, fontVariationSettings: font === SERIF ? "'opsz' 72" : undefined, opacity: o, whiteSpace: "nowrap" }}>
      {text.split(" ").map((w, i) => {
        const p = ramp(f, at + i * stagger, at + i * stagger + 14, expoOut);
        return (
          <span key={i} style={{ display: "inline-block", marginRight: size * 0.24, opacity: p, transform: `translateY(${(1 - p) * size * rise}px)` }}>
            {w}
          </span>
        );
      })}
    </div>
  );
};

export const Logo: React.FC<{ f: number; at: number; y: number; h?: number; name?: boolean; color?: string }> = ({ f, at, y, h = 130, name = true, color = "rgba(255,255,255,0.9)" }) => {
  const p = ramp(f, at, at + 14, expoOut);
  const q = ramp(f, at + 8, at + 22, expoOut);
  const w = (h * 192) / 228;
  return (
    <>
      <Img src={LOGO} style={{ position: "absolute", left: 960 - w / 2, top: y, width: w, height: h, opacity: p, transform: `translateY(${(1 - p) * 20}px)` }} />
      {name && (
        <div style={{ position: "absolute", left: 0, right: 0, top: y + h + 34, textAlign: "center", fontFamily: SANS, fontWeight: 500, fontSize: 36, letterSpacing: "0.05em", color, opacity: q, transform: `translateY(${(1 - q) * 16}px)` }}>
          IndusInd Bank RuPay credit card
        </div>
      )}
    </>
  );
};
