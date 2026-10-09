import {
  contrast,
  hexToRgb,
  nearestPassing,
  oklabToRgb,
  rgbToHex,
  rgbToOklab,
  type BackgroundKind,
  type Theme,
} from "./themes.ts";

/**
 * Look overrides: the parts of a theme a person can pick one by one in the
 * Studio (fonts, canvas colours, background, grain, corners, CTA and kicker
 * style). Applied on top of the theme and before brand colours, so the same
 * contrast rules hold: a picked colour is never rejected, only its lightness
 * moves until text reads (7:1 for text, 4.5:1 for muted text).
 */

const DEVANAGARI_DISPLAY = "Teko";
const DEVANAGARI_BODY = "Poppins";
const stack = (primary: string, fallback: string) => `"${primary}", "${fallback}", sans-serif`;

type DisplayFace = {
  family: string;
  /** Weights the vendored file covers; the first is the default. */
  weights: number[];
  upper: boolean;
  tracking: number;
  lineHeight: number;
  fallback: string;
  description: string;
};

/** Every display face the kit ships (public/fonts, SIL OFL), with the settings it looks best at. */
export const DISPLAY_FONTS = {
  Anton: { family: "Anton", weights: [400], upper: true, tracking: 0.015, lineHeight: 1.02, fallback: DEVANAGARI_DISPLAY, description: "Condensed poster caps: bold creator reels" },
  Inter: { family: "Inter", weights: [800, 300, 500, 900], upper: false, tracking: -0.045, lineHeight: 1.04, fallback: DEVANAGARI_BODY, description: "Neutral modern sans: SaaS, product, Apple-like" },
  "Space Grotesk": { family: "Space Grotesk", weights: [700, 400], upper: false, tracking: -0.035, lineHeight: 1.0, fallback: DEVANAGARI_DISPLAY, description: "Techy grotesk: AI, dev tools, gaming" },
  "Instrument Serif": { family: "Instrument Serif", weights: [400], upper: false, tracking: -0.02, lineHeight: 0.98, fallback: DEVANAGARI_BODY, description: "Elegant serif: luxury, fashion, editorial" },
  "Archivo Black": { family: "Archivo Black", weights: [400], upper: true, tracking: 0, lineHeight: 1.0, fallback: DEVANAGARI_DISPLAY, description: "Heavy friendly caps: playful D2C, events" },
  Teko: { family: "Teko", weights: [600, 400], upper: true, tracking: 0.02, lineHeight: 0.92, fallback: DEVANAGARI_DISPLAY, description: "Tall condensed, has Devanagari: festive, sports" },
  "Plus Jakarta Sans": { family: "Plus Jakarta Sans", weights: [800, 500], upper: false, tracking: -0.035, lineHeight: 1.06, fallback: DEVANAGARI_BODY, description: "Rounded geometric: B2B, finance, hiring" },
  Poppins: { family: "Poppins", weights: [800, 700, 500], upper: false, tracking: -0.02, lineHeight: 1.05, fallback: DEVANAGARI_BODY, description: "Friendly geometric, has Devanagari: Hindi/Hinglish" },
} as const satisfies Record<string, DisplayFace>;

export type DisplayFont = keyof typeof DISPLAY_FONTS;
export const DISPLAY_FONT_NAMES = Object.keys(DISPLAY_FONTS) as [DisplayFont, ...DisplayFont[]];

/** Body faces with their regular / strong weights. */
export const BODY_FONTS = {
  Inter: { weight: 500, strong: 700 },
  Poppins: { weight: 600, strong: 800 },
  "Plus Jakarta Sans": { weight: 500, strong: 700 },
  "Space Grotesk": { weight: 500, strong: 700 },
} as const;
export type BodyFont = keyof typeof BODY_FONTS;
export const BODY_FONT_NAMES = Object.keys(BODY_FONTS) as [BodyFont, ...BodyFont[]];

export const BACKGROUND_NAMES = ["aurora", "grid", "spotlight", "paper", "dots", "plain", "canvas"] as const satisfies readonly BackgroundKind[];
export const CORNER_RADIUS = { sharp: 0, soft: 14, round: 30 } as const;

export type Look = {
  displayFont?: DisplayFont;
  /** Display weight; snapped to the nearest weight the face ships. */
  displayWeight?: number;
  /** Display text in capitals. Defaults to what suits the face. */
  uppercase?: boolean;
  bodyFont?: BodyFont;
  /** Canvas colour. Surface, lines and muted text are derived from it and the text colour. */
  bg?: string;
  /** Main text colour. Moved (lightness only) until it reaches 7:1 on bg. */
  text?: string;
  background?: BackgroundKind;
  grain?: boolean;
  corners?: keyof typeof CORNER_RADIUS;
  ctaStyle?: "button" | "link";
  kicker?: "pill" | "plain";
};

export type LookChange = { field: string; from?: string; to: string; message: string };

/** Mix two colours in OKLab; t=0 gives a, t=1 gives b. */
export const mix = (a: string, b: string, t: number) => {
  const [la, aa, ba] = rgbToOklab(hexToRgb(a));
  const [lb, ab, bb] = rgbToOklab(hexToRgb(b));
  return rgbToHex(oklabToRgb([la + (lb - la) * t, aa + (ab - aa) * t, ba + (bb - ba) * t]));
};

/** Text reaches 7:1 on the canvas (WCAG AAA body text); muted text 4.5:1. */
export const MIN_LOOK_TEXT = 7;
export const MIN_LOOK_MUTED = 4.5;

const isDark = (hex: string) => rgbToOklab(hexToRgb(hex))[0] < 0.6;

/** The face's nearest shipped weight. */
const snapWeight = (face: DisplayFace, w?: number) =>
  w === undefined ? face.weights[0] : face.weights.reduce((best, x) => (Math.abs(x - w) < Math.abs(best - w) ? x : best), face.weights[0]);

/**
 * Apply look overrides to a theme. Returns the theme unchanged (same object)
 * when there is nothing to apply, so specs without a look render exactly as before.
 */
export const resolveLook = (theme: Theme, look?: Look): { theme: Theme; changes: LookChange[] } => {
  if (!look || Object.values(look).every((v) => v === undefined)) return { theme, changes: [] };
  const changes: LookChange[] = [];
  const colors = { ...theme.colors };
  const fonts = { ...theme.fonts };

  if (look.displayFont) {
    const face: DisplayFace = DISPLAY_FONTS[look.displayFont];
    fonts.display = stack(face.family, face.fallback);
    fonts.displayWeight = snapWeight(face, look.displayWeight);
    fonts.displayUpper = look.uppercase ?? face.upper;
    fonts.displayTracking = face.tracking;
    fonts.displayLineHeight = face.lineHeight;
  } else {
    if (look.displayWeight !== undefined) fonts.displayWeight = look.displayWeight;
    if (look.uppercase !== undefined) fonts.displayUpper = look.uppercase;
  }
  if (look.displayFont && look.displayWeight !== undefined && fonts.displayWeight !== look.displayWeight)
    changes.push({ field: "displayWeight", from: String(look.displayWeight), to: String(fonts.displayWeight), message: `${look.displayFont} ships weights ${DISPLAY_FONTS[look.displayFont].weights.join("/")}; using ${fonts.displayWeight}.` });
  if (look.bodyFont) {
    const b = BODY_FONTS[look.bodyFont];
    fonts.body = stack(look.bodyFont, DEVANAGARI_BODY);
    fonts.bodyWeight = b.weight;
    fonts.bodyStrongWeight = b.strong;
  }

  if (look.bg || look.text) {
    const pickedBg = look.bg ?? colors.bg;
    // A mid-tone canvas reads with no text colour at all (even pure black or white
    // stays under 7:1): move its lightness, toward whichever end is nearer, until one does.
    const readable = (h: string) => contrast(h, "#FFFFFF") >= MIN_LOOK_TEXT || contrast(h, "#000000") >= MIN_LOOK_TEXT;
    const bg = readable(pickedBg)
      ? pickedBg
      : (nearestPassing(pickedBg, readable, contrast(pickedBg, "#000000") >= contrast(pickedBg, "#FFFFFF") ? 1 : -1) ?? pickedBg);
    if (bg !== pickedBg)
      changes.push({ field: "bg", from: pickedBg, to: bg, message: `canvas ${pickedBg} is a mid-tone no text reads on at ${MIN_LOOK_TEXT}:1; ${isDark(bg) ? "darkened" : "lightened"} to ${bg}.` });
    const want = look.text ?? colors.text;
    // Text: keep the pick if it reads; else move its lightness away from the canvas.
    const text =
      contrast(want, bg) >= MIN_LOOK_TEXT
        ? want
        : (nearestPassing(want, (h) => contrast(h, bg) >= MIN_LOOK_TEXT, isDark(bg) ? 1 : -1) ?? (isDark(bg) ? "#FFFFFF" : "#000000"));
    if (text.toUpperCase() !== want.toUpperCase())
      changes.push({ field: "text", from: want, to: text, message: `text ${want} ${isDark(bg) ? "lightened" : "darkened"} to ${text} so it reaches ${MIN_LOOK_TEXT}:1 on ${bg}.` });
    // Muted text sits up to 60% of the way from text to canvas, as far toward the canvas
    // as still reads (t = 0 is the text colour itself, which always does).
    let muted = text;
    for (let t = 0.6; t > 0; t -= 0.05) {
      const m = mix(text, bg, t);
      if (contrast(m, bg) >= MIN_LOOK_MUTED) {
        muted = m;
        break;
      }
    }
    Object.assign(colors, { bg, text, muted, surface: mix(bg, text, 0.06), line: mix(bg, text, 0.14) });
  }

  return {
    theme: {
      ...theme,
      colors,
      fonts,
      background: look.background ?? theme.background,
      grain: look.grain ?? theme.grain,
      radius: look.corners ? CORNER_RADIUS[look.corners] : theme.radius,
      ctaStyle: look.ctaStyle ?? theme.ctaStyle,
      kicker: look.kicker ?? theme.kicker,
    },
    changes,
  };
};
