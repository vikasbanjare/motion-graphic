import { loadFont } from "@remotion/fonts";
import type { CSSProperties } from "react";
import { Easing, interpolate, staticFile } from "remotion";

export const FPS = 60;
export const W = 1920;
export const H = 1080;
export const sec = (s: number) => Math.round(s * FPS);

// Fonts are vendored in public/fonts so renders work offline.
export const F = {
  serif: "Instrument Serif",
  sans: "Inter Tight",
  mono: "JetBrains Mono",
};

loadFont({ family: F.serif, url: staticFile("fonts/InstrumentSerif-400.woff2"), weight: "400" });
loadFont({
  family: F.serif,
  url: staticFile("fonts/InstrumentSerif-400i.woff2"),
  weight: "400",
  style: "italic",
});
for (const w of ["400", "500", "600", "700"]) {
  loadFont({ family: F.sans, url: staticFile(`fonts/InterTight-${w}.woff2`), weight: w });
}
loadFont({ family: F.mono, url: staticFile("fonts/JetBrainsMono-500.woff2"), weight: "500" });

// Anthropic public palette: cream paper, ink type, clay accent (+ blue/green support).
export const C = {
  paper: "#FAF9F5",
  paper2: "#F0EEE6",
  line: "#E8E6DC",
  white: "#FFFFFF",
  ink: "#141413",
  ink2: "#3D3D3A",
  muted: "#73726C",
  mid: "#B0AEA5",
  clay: "#D97757",
  claySoft: "#F3DDD3",
  blue: "#6A9BCC",
  green: "#788C5D",
  greenSoft: "#E4EAD9",
  redSoft: "#F6E0DA",
};

export const shadow = "0 1px 2px rgba(20,20,19,0.06), 0 12px 40px rgba(20,20,19,0.08), 0 40px 90px rgba(20,20,19,0.06)";

export const ease = {
  out: Easing.bezier(0.16, 1, 0.3, 1),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  in: Easing.bezier(0.7, 0, 0.84, 0),
  back: Easing.bezier(0.34, 1.45, 0.64, 1),
  soft: Easing.bezier(0.22, 1, 0.36, 1),
};

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// 0 → 1 over [start, start + dur].
export const ramp = (frame: number, start: number, dur: number, easing = ease.out) =>
  interpolate(frame, [start, start + dur], [0, 1], { ...clamp, easing });

export const mix = (t: number, a: number, b: number) => a + (b - a) * t;

// Soft blur-and-rise entrance.
export const enter = (
  frame: number,
  start: number,
  { dur = sec(0.8), dist = 28, blur = 10 }: { dur?: number; dist?: number; blur?: number } = {},
): CSSProperties => {
  const t = ramp(frame, start, dur);
  return {
    opacity: t,
    translate: `0px ${mix(t, dist, 0)}px`,
    filter: `blur(${mix(t, blur, 0)}px)`,
  };
};
