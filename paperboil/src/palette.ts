// Palette tokens for MAPS Global Markets (rebrand). Orange is MAPS orange
// #FF5400; the ramp and navy are derived from the MAPS logo lock-ups —
// confirm against the brand guideline before final delivery.
export const palette = {
  orange: "#FF5400",
  orangeDeep: "#C23F00",
  orangeBright: "#FF7A33",
  orangeLight: "#FFB185",
  orangePale: "#FFE4D4",
  navy: "#0A3B70",
  ink: "#002042",
  blueMid: "#1368C3",
  blueBright: "#2B89EE",
  sky: "#7EB6F1",
  pale: "#D2E5F9",
  tint: "#EEF5FC",
  cream: "#F8F3E7",
  slate: "#4C6476",
} as const;

export type PaletteToken = keyof typeof palette;

export const color = (token: PaletteToken): string => palette[token];

// Orange text (#F08000 or lighter) may only sit on these grounds (contrast rule).
export const ORANGE_TEXT_TOKENS: readonly PaletteToken[] = ["orange", "orangeBright", "orangeLight", "orangePale"];
export const DARK_GROUNDS: readonly PaletteToken[] = ["navy", "ink"];
