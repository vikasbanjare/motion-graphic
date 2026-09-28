import { loadFont } from "@remotion/fonts";
import { Easing, interpolate, staticFile } from "remotion";

// Fonts are vendored in public/fonts so renders work offline.
export const body = "Poppins";
export const display = "Anton";

for (const w of ["500", "700", "800"]) {
  loadFont({ family: body, url: staticFile(`fonts/Poppins-${w}.woff2`), weight: w });
}
loadFont({ family: display, url: staticFile("fonts/Anton-400.woff2"), weight: "400" });

export const C = {
  bg: "#0A0E1A",
  bg2: "#141B2E",
  saffron: "#FF9933",
  green: "#22C55E",
  white: "#F8FAFC",
  muted: "#94A3B8",
  red: "#EF4444",
  claude: "#D97757",
};

const out = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Rise + fade in starting at `start` frames.
export const rise = (frame: number, start: number, dist = 60) => ({
  opacity: interpolate(frame, [start, start + 12], [0, 1], { ...clamp, easing: out }),
  translate: interpolate(frame, [start, start + 18], [`0px ${dist}px`, "0px 0px"], {
    ...clamp,
    easing: out,
  }),
});

// Pop scale-in with slight overshoot.
export const pop = (frame: number, start: number) => ({
  opacity: interpolate(frame, [start, start + 6], [0, 1], clamp),
  scale: interpolate(frame, [start, start + 16], [0.4, 1], {
    ...clamp,
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  }),
});

export const progress = (frame: number, start: number, len: number) =>
  interpolate(frame, [start, start + len], [0, 1], { ...clamp, easing: out });
