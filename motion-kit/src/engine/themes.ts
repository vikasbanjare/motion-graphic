/* eslint-disable @remotion/non-pure-animation -- "transition" here is a scene-transition token, not a CSS transition. */
/**
 * Themes are complete art directions: palette, type pairing, background
 * treatment and motion personality chosen to work together. Users pick one
 * name instead of making twenty design decisions.
 *
 * Rules every theme follows:
 * - One accent colour does the talking; accent2 is used sparingly.
 * - text on bg >= 7:1 contrast, muted on bg >= 4.5:1, onAccent on accent >= 4.5:1.
 * - accent and accent2 on bg >= 3:1, onAccent on accent2 >= 3:1, onMark on mark >= 4.5:1.
 *   Brand colours are held to the same rules (resolveBrand, below).
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
      accent2: "#00A178",
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
      accent2: "#DD6E2F",
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

// --- colour maths (OKLab / OKLCH) --------------------------------------------
// Brand colours are adjusted in OKLCH: changing only L keeps the hue a person
// recognises (sRGB/HSL darkening drifts blues to purple and yellows to green).

export type Rgb = [number, number, number];
export type Lab = [number, number, number];
/** l 0-1, c ~0-0.37, h degrees 0-360. */
export type Lch = { l: number; c: number; h: number };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const toLinear = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const toGamma = (v: number) => (v <= 0.0031308 ? v * 12.92 : 1.055 * Math.sign(v) * Math.abs(v) ** (1 / 2.4) - 0.055);

export const isHex = (s: string) => /^#[0-9a-fA-F]{6}$/.test(s);

/** "#FF9933" -> [255, 153, 51] */
export const hexToRgb = (hex: string): Rgb => {
  const n = parseInt(hex.slice(1, 7), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

/** [255, 153, 51] -> "#FF9933" (rounded and clamped). */
export const rgbToHex = (rgb: Rgb) =>
  "#" + rgb.map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, "0")).join("").toUpperCase();

/** sRGB 0-255 -> OKLab. */
export const rgbToOklab = ([r, g, b]: Rgb): Lab => {
  const [lr, lg, lb] = [r, g, b].map((v) => toLinear(v / 255));
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
};

/** OKLab -> sRGB 0-255, unclamped (values outside 0-255 mean "out of gamut"). */
export const oklabToRgb = ([L, a, b]: Lab): Rgb => {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map((v) => toGamma(v) * 255) as Rgb;
};

export const hexToOklch = (hex: string): Lch => {
  const [l, a, b] = rgbToOklab(hexToRgb(hex));
  const h = (Math.atan2(b, a) * 180) / Math.PI;
  return { l, c: Math.hypot(a, b), h: h < 0 ? h + 360 : h };
};

const lchToLab = ({ l, c, h }: Lch): Lab => [l, c * Math.cos((h * Math.PI) / 180), c * Math.sin((h * Math.PI) / 180)];
const inGamut = (rgb: Rgb) => rgb.every((v) => v >= -0.02 && v <= 255.02);

/** OKLCH -> hex. Out-of-gamut colours keep L and hue and lose chroma until they fit. */
export const oklchToHex = (lch: Lch) => {
  const l = clamp(lch.l, 0, 1);
  let c = Math.max(0, lch.c);
  if (!inGamut(oklabToRgb(lchToLab({ l, c, h: lch.h })))) {
    let lo = 0;
    let hi = c;
    for (let i = 0; i < 22; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(oklabToRgb(lchToLab({ l, c: mid, h: lch.h })))) lo = mid;
      else hi = mid;
    }
    c = lo;
  }
  return rgbToHex(oklabToRgb(lchToLab({ l, c, h: lch.h })));
};

/** Perceptual distance (OKLab ΔE; 0.02 ≈ just noticeable, 0.1 = clearly different). */
export const deltaE = (a: string, b: string) => {
  const [x, y] = [rgbToOklab(hexToRgb(a)), rgbToOklab(hexToRgb(b))];
  return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]);
};

/** Signed shortest hue difference b - a in degrees (-180..180). */
export const hueDelta = (a: number, b: number) => ((((b - a) % 360) + 540) % 360) - 180;

/**
 * The colour nearest in lightness to `hex` (same OKLCH hue and chroma, as far
 * as the gamut allows) that passes `ok`. `prefer` breaks ties: 1 = lighter
 * first, -1 = darker first. null when no lightness passes.
 */
export const nearestPassing = (hex: string, ok: (hex: string) => boolean, prefer: 1 | -1 = -1): string | null => {
  if (ok(hex)) return hex;
  const { l, c, h } = hexToOklch(hex);
  for (let k = 1; k <= 500; k++) {
    for (const dir of [prefer, -prefer]) {
      const L = l + dir * k * 0.002;
      if (L < 0 || L > 1) continue;
      const cand = oklchToHex({ l: L, c, h });
      if (ok(cand)) return cand;
    }
  }
  return null;
};

// --- brand colours -------------------------------------------------------------
// A brand colour is never rejected: it is kept exactly when it reads, otherwise
// its lightness moves just far enough (hue and chroma kept) to pass. text, bg,
// surface, line and muted always stay the theme's own.

export type Brand = { accent?: string; accent2?: string };

/** Accent (and accent2) against the theme background; WCAG 2.x graphics / large text. */
export const MIN_ACCENT_CONTRAST = 3;
/** Button text on the accent and text on the highlighter; WCAG 2.x body text. */
export const MIN_TEXT_CONTRAST = 4.5;

export type HarmonyRule = "analogous" | "square" | "complementary" | "neutral";

/**
 * How far round the colour wheel the theme puts accent2 from its accent.
 * A derived brand accent2 takes the same step from the brand accent, so it
 * relates to the brand the way the theme's own pair does: analogous (calm
 * neighbours: desi, corporate), square (a lively quarter turn: midnight, clean,
 * pop), complementary (opposites: neon, editorial, studio, studio-dark) or
 * neutral (mono keeps a grey second colour).
 */
export const harmonyOf = (theme: Theme): { rule: HarmonyRule; step: number } => {
  const a = hexToOklch(theme.colors.accent);
  const b = hexToOklch(theme.colors.accent2);
  if (b.c < 0.03) return { rule: "neutral", step: 0 };
  const step = hueDelta(a.h, b.h);
  const size = Math.abs(step);
  return { rule: size <= 70 ? "analogous" : size < 120 ? "square" : "complementary", step };
};

/** The theme's accent2, re-aimed at a brand accent (see harmonyOf). */
export const harmonize = (theme: Theme, accent: string) => {
  const { rule, step } = harmonyOf(theme);
  if (rule === "neutral") return theme.colors.accent2;
  const from = hexToOklch(theme.colors.accent);
  const to = hexToOklch(accent);
  const second = hexToOklch(theme.colors.accent2);
  return oklchToHex({ l: second.l, c: second.c * clamp(to.c / Math.max(from.c, 0.01), 0, 3), h: to.h + step });
};

/**
 * Re-tint a theme colour that was derived from `from` (the theme's accent or
 * accent2) so it derives from `to` instead: same hue step and chroma ratio,
 * the theme's own lightness. A colour that *is* `from` becomes `same` (the
 * brand colour as used on screen, i.e. after any contrast fix).
 */
const retint = (color: string, from: string, to: string, same: string) => {
  if (deltaE(color, from) < 0.02) return same;
  const c = hexToOklch(color);
  const f = hexToOklch(from);
  const t = hexToOklch(to);
  return oklchToHex({ l: c.l, c: c.c * clamp(t.c / Math.max(f.c, 0.01), 0, 3), h: c.h + hueDelta(f.h, t.h) });
};

export type BrandChange = {
  field: "accent" | "accent2";
  /** "adjusted" = the brand's colour was moved for contrast; "derived" = none was given. */
  kind: "adjusted" | "derived";
  /** The brand colour as given (absent when derived). */
  from?: string;
  to: string;
  message: string;
};

export type BrandReport = { theme: Theme; changes: BrandChange[]; errors: string[] };

const ratio = (k: number) => `${k.toFixed(2)}:1`;

/**
 * Apply brand colours to a theme and report what had to change:
 * - accent: kept if it reaches 3:1 on bg and some button text reaches 4.5:1 on
 *   it; otherwise moved to the nearest lightness that does.
 * - onAccent: the theme's own if it still reads, else white or the theme's dark
 *   ink, whichever reads better.
 * - accent2: the brand's (3:1 on bg and under button text), or derived from the
 *   accent with the theme's colour harmony.
 * - mark / onMark and the orb colours: the theme's tints, re-aimed at the brand.
 */
export const resolveBrand = (theme: Theme, brand?: Brand): BrandReport => {
  const changes: BrandChange[] = [];
  const errors: string[] = [];
  if (!brand?.accent && !brand?.accent2) return { theme, changes, errors };
  const t = theme.colors;
  const lightBg = luminance(t.bg) > 0.5;
  const away = lightBg ? -1 : 1;
  const darkInk = luminance(t.text) < luminance(t.bg) ? t.text : t.bg;
  const onBg = (x: string) => contrast(x, t.bg);
  const verb = (a: string, b: string) => (luminance(b) < luminance(a) ? "darkened" : "lightened");
  const where = `the ${theme.name} background`;

  /** Button text for an accent: the theme's own, else white or dark ink. null if none reads. */
  const textOn = (accent: string) => {
    if (contrast(accent, t.onAccent) >= MIN_TEXT_CONTRAST) return t.onAccent;
    const best = bestTextOn(accent, "#FFFFFF", darkInk);
    return contrast(accent, best) >= MIN_TEXT_CONTRAST ? best : null;
  };

  // Accent + button text.
  let accent = t.accent;
  let onAccent = t.onAccent;
  const given = brand.accent?.toUpperCase();
  if (given) {
    const fit = nearestPassing(given, (x) => onBg(x) >= MIN_ACCENT_CONTRAST && textOn(x) !== null, away);
    if (fit) {
      accent = fit;
      onAccent = textOn(fit) as string;
      if (fit !== given) {
        const why =
          onBg(given) < MIN_ACCENT_CONTRAST
            ? `${ratio(onBg(given))} → ${ratio(onBg(fit))} on ${where}, needs 3:1`
            : `button text ${ratio(contrast(given, bestTextOn(given, "#FFFFFF", darkInk)))} → ${ratio(contrast(fit, onAccent))}, needs 4.5:1`;
        changes.push({ field: "accent", kind: "adjusted", from: given, to: fit, message: `brand accent ${given} ${verb(given, fit)} to ${fit} for contrast (${why}).` });
      }
    } else {
      accent = given;
      onAccent = bestTextOn(given, "#FFFFFF", darkInk);
      errors.push(`brand.accent ${given} cannot reach 3:1 on ${where} with readable button text at any lightness. Pick another theme.`);
    }
  }

  // Accent2: list markers carry button-coloured glyphs, so it needs both.
  let accent2 = t.accent2;
  /** The brand's second colour before contrast fixes (tints follow this, not the fix). */
  let true2 = t.accent2;
  const readable2 = (x: string) => onBg(x) >= MIN_ACCENT_CONTRAST && contrast(x, onAccent) >= MIN_ACCENT_CONTRAST;
  const given2 = brand.accent2?.toUpperCase();
  if (given2) {
    const fit = nearestPassing(given2, readable2, away);
    accent2 = fit ?? given2;
    true2 = given2;
    if (!fit) errors.push(`brand.accent2 ${given2} cannot reach 3:1 on ${where} at any lightness. Pick another theme.`);
    else if (fit !== given2) {
      const why =
        onBg(given2) < MIN_ACCENT_CONTRAST
          ? `${ratio(onBg(given2))} → ${ratio(onBg(fit))} on ${where}, needs 3:1`
          : `button-text glyphs on it ${ratio(contrast(given2, onAccent))} → ${ratio(contrast(fit, onAccent))}, needs 3:1`;
      changes.push({ field: "accent2", kind: "adjusted", from: given2, to: fit, message: `brand accent2 ${given2} ${verb(given2, fit)} to ${fit} for contrast (${why}).` });
    }
  } else if (given) {
    const raw = harmonize(theme, given);
    true2 = raw;
    accent2 = nearestPassing(raw, readable2, away) ?? raw;
    const { rule } = harmonyOf(theme);
    if (accent2 !== t.accent2)
      changes.push({
        field: "accent2",
        kind: "derived",
        to: accent2,
        message:
          rule === "neutral"
            ? `brand accent2 not set: the ${theme.name} theme's neutral second colour becomes ${accent2} so it reads under the button text.`
            : `brand accent2 not set: derived ${accent2}, ${rule} to the accent like the ${theme.name} theme's own pair.`,
      });
  }

  // Highlighter and orb: whichever theme accent each was tinted from, re-aim at
  // the brand's true hue and chroma (the mark's contrast is checked below).
  const sources = [
    { from: t.accent, to: given ?? t.accent, same: accent, h: hexToOklch(t.accent) },
    { from: t.accent2, to: true2, same: accent2, h: hexToOklch(t.accent2) },
  ].filter((s) => s.h.c >= 0.03);
  const tint = (color: string) => {
    const c = hexToOklch(color);
    if (c.c < 0.03 || !sources.length) return color;
    const src = sources.reduce((a, b) => (Math.abs(hueDelta(c.h, a.h.h)) <= Math.abs(hueDelta(c.h, b.h.h)) ? a : b));
    return retint(color, src.from, src.to, src.same);
  };
  const markRaw = tint(t.mark);
  const mark = nearestPassing(markRaw, (x) => contrast(x, t.onMark) >= MIN_TEXT_CONTRAST, luminance(t.onMark) > 0.5 ? -1 : 1) ?? t.mark;

  return {
    theme: {
      ...theme,
      colors: { ...t, accent, accent2, onAccent, mark },
      orb: [tint(theme.orb[0]), tint(theme.orb[1])],
    },
    changes,
    errors,
  };
};

/** Apply brand colours on top of a theme (see resolveBrand for the rules). */
export const withBrand = (theme: Theme, brand?: Brand): Theme => resolveBrand(theme, brand).theme;
