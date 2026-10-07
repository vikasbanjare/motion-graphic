/* eslint-disable @remotion/non-pure-animation -- "transition" here is a scene-transition token, not a CSS transition. */
/**
 * Themes are complete art directions: palette, type pairing, background
 * treatment and motion personality chosen to work together. Users pick one
 * name instead of making twenty design decisions.
 *
 * Rules every theme follows:
 * - One accent colour does the talking; accent2 is used sparingly.
 * - text on bg >= 7:1 contrast, muted on bg >= 4.5:1, onAccent on accent >= 4.5:1.
 * - Display fonts fall back to Teko / Poppins so Hindi (Devanagari) still renders.
 */
export const THEME_NAMES = [
  "midnight",
  "clean",
  "neon",
  "editorial",
  "pop",
  "desi",
  "corporate",
  "mono",
  "studio",
  "studio-dark",
] as const;
export type ThemeName = (typeof THEME_NAMES)[number];

export type BackgroundKind = "aurora" | "grid" | "spotlight" | "paper" | "dots" | "plain" | "canvas";
export type MotionName = "snappy" | "smooth" | "bouncy" | "calm";
export type TransitionName = "push" | "whip" | "fade" | "zoom" | "blur" | "cut";

export type Theme = {
  name: ThemeName;
  description: string;
  colors: {
    bg: string;
    surface: string;
    line: string;
    text: string;
    muted: string;
    accent: string;
    accent2: string;
    /** Text colour on top of the accent colour. */
    onAccent: string;
    /** Highlighter colour behind ==marked== words. */
    mark: string;
    /** Text colour on top of the highlighter. */
    onMark: string;
  };
  fonts: {
    display: string;
    displayWeight: number;
    /** Uppercase display text (condensed poster fonts look best in caps). */
    displayUpper: boolean;
    /** em units, applied to display text. */
    displayTracking: number;
    displayLineHeight: number;
    body: string;
    bodyWeight: number;
    bodyStrongWeight: number;
  };
  background: BackgroundKind;
  grain: boolean;
  radius: number;
  motion: MotionName;
  transition: TransitionName;
  /** "button" = big pulsing pill; "link" = quiet "Try X →" with a drawn underline. */
  ctaStyle: "button" | "link";
  /** Kicker labels as a pill badge, or plain tracked caps (minimal themes). */
  kicker: "pill" | "plain";
  /** Two colours for the orb scene (colour ramp: dark -> c1 -> c2 -> white). */
  orb: [string, string];
};

const DEVANAGARI_DISPLAY = "Teko";
const DEVANAGARI_BODY = "Poppins";
const stack = (primary: string, fallback: string) => `"${primary}", "${fallback}", sans-serif`;

export const THEMES: Record<ThemeName, Theme> = {
  midnight: {
    name: "midnight",
    description: "Bold creator reel. Navy, saffron, condensed poster type.",
    colors: {
      bg: "#0A0E1A",
      surface: "#141B2E",
      line: "#26314D",
      text: "#F8FAFC",
      muted: "#94A3B8",
      accent: "#FF9933",
      accent2: "#22C55E",
      onAccent: "#0A0E1A",
      mark: "#22C55E",
      onMark: "#0A0E1A",
    },
    fonts: {
      display: stack("Anton", DEVANAGARI_DISPLAY),
      displayWeight: 400,
      displayUpper: true,
      displayTracking: 0.015,
      displayLineHeight: 1.02,
      body: stack("Poppins", DEVANAGARI_BODY),
      bodyWeight: 600,
      bodyStrongWeight: 800,
    },
    background: "aurora",
    grain: true,
    radius: 32,
    motion: "snappy",
    transition: "push",
    ctaStyle: "button",
    kicker: "pill",
    orb: ["#FF9933", "#FFD29E"],
  },
  clean: {
    name: "clean",
    description: "Calm product launch. Off-white, ink, one electric blue.",
    colors: {
      bg: "#F5F5F7",
      surface: "#FFFFFF",
      line: "#E2E2E7",
      text: "#0B0B0F",
      muted: "#5C5C66",
      accent: "#0A5CFF",
      accent2: "#00A37A",
      onAccent: "#FFFFFF",
      mark: "#D4E3FF",
      onMark: "#0B0B0F",
    },
    fonts: {
      display: stack("Inter", DEVANAGARI_BODY),
      displayWeight: 800,
      displayUpper: false,
      displayTracking: -0.045,
      displayLineHeight: 1.04,
      body: stack("Inter", DEVANAGARI_BODY),
      bodyWeight: 500,
      bodyStrongWeight: 700,
    },
    background: "spotlight",
    grain: false,
    radius: 28,
    motion: "smooth",
    transition: "fade",
    ctaStyle: "button",
    kicker: "pill",
    orb: ["#9DB8FF", "#DCE6FF"],
  },
  neon: {
    name: "neon",
    description: "AI / tech / gaming. Near-black, acid lime, violet glow.",
    colors: {
      bg: "#07070A",
      surface: "#121218",
      line: "#26262F",
      text: "#F2F2F5",
      muted: "#9A9AA8",
      accent: "#C6FF3D",
      accent2: "#8B6CFF",
      onAccent: "#07070A",
      mark: "#6D4AFF",
      onMark: "#FFFFFF",
    },
    fonts: {
      display: stack("Space Grotesk", DEVANAGARI_DISPLAY),
      displayWeight: 700,
      displayUpper: false,
      displayTracking: -0.035,
      displayLineHeight: 1.0,
      body: stack("Space Grotesk", DEVANAGARI_BODY),
      bodyWeight: 500,
      bodyStrongWeight: 700,
    },
    background: "grid",
    grain: true,
    radius: 20,
    motion: "snappy",
    transition: "whip",
    ctaStyle: "button",
    kicker: "pill",
    orb: ["#C6FF3D", "#8B6CFF"],
  },
  editorial: {
    name: "editorial",
    description: "Luxury, fashion, food, real estate. Cream paper, serif, terracotta.",
    colors: {
      bg: "#F2ECE2",
      surface: "#FBF8F3",
      line: "#DDD3C4",
      text: "#1C1917",
      muted: "#6B6159",
      accent: "#B4441A",
      accent2: "#2F5D50",
      onAccent: "#FBF8F3",
      mark: "#E9C9A8",
      onMark: "#1C1917",
    },
    fonts: {
      display: stack("Instrument Serif", DEVANAGARI_BODY),
      displayWeight: 400,
      displayUpper: false,
      displayTracking: -0.02,
      displayLineHeight: 0.98,
      body: stack("Inter", DEVANAGARI_BODY),
      bodyWeight: 500,
      bodyStrongWeight: 600,
    },
    background: "paper",
    grain: true,
    radius: 6,
    motion: "smooth",
    transition: "fade",
    ctaStyle: "link",
    kicker: "plain",
    orb: ["#E9C9A8", "#B4441A"],
  },
  pop: {
    name: "pop",
    description: "Playful D2C / food / kids. Sunny yellow, black, hot pink.",
    colors: {
      bg: "#FFD93D",
      surface: "#FFF4C2",
      line: "#111111",
      text: "#111111",
      muted: "#4A3F12",
      accent: "#D6125A",
      accent2: "#2F4BFF",
      onAccent: "#FFFFFF",
      mark: "#FFFFFF",
      onMark: "#111111",
    },
    fonts: {
      display: stack("Archivo Black", DEVANAGARI_DISPLAY),
      displayWeight: 400,
      displayUpper: true,
      displayTracking: 0.0,
      displayLineHeight: 1.0,
      body: stack("Poppins", DEVANAGARI_BODY),
      bodyWeight: 700,
      bodyStrongWeight: 800,
    },
    background: "dots",
    grain: false,
    radius: 26,
    motion: "bouncy",
    transition: "push",
    ctaStyle: "button",
    kicker: "pill",
    orb: ["#FF7AA8", "#FFFFFF"],
  },
  desi: {
    name: "desi",
    description: "Festive India — Diwali, weddings, local business. Indigo, marigold, Hindi-ready.",
    colors: {
      bg: "#1A0F33",
      surface: "#2A1A4A",
      line: "#3F2C66",
      text: "#FFF7E8",
      muted: "#C9B9E0",
      accent: "#FFB627",
      accent2: "#FF5E7E",
      onAccent: "#1A0F33",
      mark: "#FF5E7E",
      onMark: "#1A0F33",
    },
    fonts: {
      display: stack("Teko", DEVANAGARI_DISPLAY),
      displayWeight: 600,
      displayUpper: true,
      displayTracking: 0.02,
      displayLineHeight: 0.92,
      body: stack("Poppins", DEVANAGARI_BODY),
      bodyWeight: 600,
      bodyStrongWeight: 800,
    },
    background: "aurora",
    grain: true,
    radius: 30,
    motion: "bouncy",
    transition: "zoom",
    ctaStyle: "button",
    kicker: "pill",
    orb: ["#FFB627", "#FF5E7E"],
  },
  corporate: {
    name: "corporate",
    description: "B2B, SaaS, finance, hiring. White, slate, indigo. Trustworthy.",
    colors: {
      bg: "#FFFFFF",
      surface: "#F1F4F9",
      line: "#DCE2EC",
      text: "#0F172A",
      muted: "#526077",
      accent: "#4338CA",
      accent2: "#0891B2",
      onAccent: "#FFFFFF",
      mark: "#E0E7FF",
      onMark: "#0F172A",
    },
    fonts: {
      display: stack("Plus Jakarta Sans", DEVANAGARI_BODY),
      displayWeight: 800,
      displayUpper: false,
      displayTracking: -0.035,
      displayLineHeight: 1.06,
      body: stack("Plus Jakarta Sans", DEVANAGARI_BODY),
      bodyWeight: 500,
      bodyStrongWeight: 700,
    },
    background: "grid",
    grain: false,
    radius: 22,
    motion: "smooth",
    transition: "push",
    ctaStyle: "button",
    kicker: "pill",
    orb: ["#A5B4FC", "#67E8F9"],
  },
  mono: {
    name: "mono",
    description: "Swiss poster minimalism. Black, white, one signal red.",
    colors: {
      bg: "#0C0C0C",
      surface: "#1A1A1A",
      line: "#2E2E2E",
      text: "#FAFAFA",
      muted: "#A3A3A3",
      accent: "#FF3B30",
      accent2: "#FAFAFA",
      onAccent: "#0C0C0C",
      mark: "#FAFAFA",
      onMark: "#0C0C0C",
    },
    fonts: {
      display: stack("Inter", DEVANAGARI_BODY),
      displayWeight: 900,
      displayUpper: true,
      displayTracking: -0.025,
      displayLineHeight: 0.95,
      body: stack("Inter", DEVANAGARI_BODY),
      bodyWeight: 500,
      bodyStrongWeight: 700,
    },
    background: "plain",
    grain: true,
    radius: 0,
    motion: "snappy",
    transition: "whip",
    ctaStyle: "link",
    kicker: "plain",
    orb: ["#FF3B30", "#FAFAFA"],
  },
  studio: {
    name: "studio",
    description: "Calm product launch, AI / audio / SaaS. Light canvas, airy light type, pastel orb.",
    colors: {
      bg: "#F5F5F4",
      surface: "#FFFFFF",
      line: "#E7E5E4",
      text: "#0C0A09",
      muted: "#6F6A64",
      accent: "#2F5BEA",
      accent2: "#E8783A",
      onAccent: "#FFFFFF",
      mark: "#DCE5FF",
      onMark: "#0C0A09",
    },
    fonts: {
      display: stack("Inter", DEVANAGARI_BODY),
      displayWeight: 300,
      displayUpper: false,
      displayTracking: -0.035,
      displayLineHeight: 1.05,
      body: stack("Inter", DEVANAGARI_BODY),
      bodyWeight: 450,
      bodyStrongWeight: 550,
    },
    background: "canvas",
    grain: true,
    radius: 28,
    motion: "calm",
    transition: "blur",
    ctaStyle: "link",
    kicker: "plain",
    orb: ["#CADCFC", "#A0B9D1"],
  },
  "studio-dark": {
    name: "studio-dark",
    description: "The studio look at night. Warm black, soft white type, glowing orb.",
    colors: {
      bg: "#0C0A09",
      surface: "#1C1917",
      line: "#2E2A27",
      text: "#FAFAF9",
      muted: "#A8A29E",
      accent: "#A9C4FF",
      accent2: "#F6B38A",
      onAccent: "#0C0A09",
      mark: "#28324A",
      onMark: "#FAFAF9",
    },
    fonts: {
      display: stack("Inter", DEVANAGARI_BODY),
      displayWeight: 300,
      displayUpper: false,
      displayTracking: -0.035,
      displayLineHeight: 1.05,
      body: stack("Inter", DEVANAGARI_BODY),
      bodyWeight: 450,
      bodyStrongWeight: 550,
    },
    background: "canvas",
    grain: true,
    radius: 28,
    motion: "calm",
    transition: "blur",
    ctaStyle: "link",
    kicker: "plain",
    orb: ["#CADCFC", "#A0B9D1"],
  },
};

/** Apply brand colour overrides on top of a theme. */
export const withBrand = (theme: Theme, brand?: { accent?: string; accent2?: string }): Theme => {
  if (!brand?.accent && !brand?.accent2) return theme;
  const accent = brand.accent ?? theme.colors.accent;
  return {
    ...theme,
    colors: {
      ...theme.colors,
      accent,
      accent2: brand.accent2 ?? theme.colors.accent2,
      onAccent: bestTextOn(accent, theme.colors.text, theme.colors.bg),
    },
  };
};

// --- colour maths (WCAG 2.x) -------------------------------------------------

const channel = (c: number) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

export const luminance = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
};

export const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/** Whichever of two candidate colours reads better on `bg`. */
export const bestTextOn = (bg: string, a: string, b: string) =>
  contrast(bg, a) >= contrast(bg, b) ? a : b;
