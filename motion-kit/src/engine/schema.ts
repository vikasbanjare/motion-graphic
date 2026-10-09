/* eslint-disable @remotion/non-pure-animation -- "transition" here is a scene-transition setting, not a CSS transition. */
import { z } from "zod";
import { THEME_NAMES } from "./themes.ts";
import { FORMAT_NAMES } from "./formats.ts";
import { BACKGROUND_NAMES, BODY_FONT_NAMES, CORNER_RADIUS, DISPLAY_FONT_NAMES } from "./look.ts";

/**
 * The storyboard spec. A video is data, not code: every field here is
 * something a non-technical person (or an AI) can fill in, and every scene
 * type is a pre-built, pre-tested template.
 *
 * Rich text fields accept three inline marks:
 *   *word*     -> accent colour
 *   ==word==   -> highlighter box behind the word
 *   ~~word~~   -> animated strike-through
 */
const rich = z.string().min(1);

const common = {
  /**
   * Narration for this beat ("say"). The on-screen text is the "show". With a
   * voice-over the scene cuts when this line starts and words reveal as spoken;
   * without one, timing is estimated from natural speech for the silent preview.
   * Write numbers as spoken words here ("fifty thousand") and as digits on screen.
   */
  say: z.string().optional(),
  /** Seconds. Leave empty and the engine times the scene from its word count (or the voice-over). */
  duration: z.number().min(0.8).max(20).optional(),
  /** Background for this scene only. "accent" makes a full-colour emphasis beat. */
  bg: z.enum(["default", "accent", "inverse"]).optional(),
  /** Set false to silence this scene's sound effects. */
  sfx: z.boolean().optional(),
};

const titleScene = z.object({
  type: z.literal("title"),
  kicker: z.string().optional(),
  headline: rich,
  sub: rich.optional(),
  ...common,
});

const hookScene = z.object({
  type: z.literal("hook"),
  /** Small line above, e.g. "Agency ka quote:" */
  setup: z.string().optional(),
  /** Big text that gets crossed out, e.g. "₹50,000" */
  strike: z.string().optional(),
  /** The punchline that lands last, e.g. "Ek prompt." */
  punch: rich,
  ...common,
});

const kineticScene = z.object({
  type: z.literal("kinetic"),
  /** Short phrases slammed in one at a time. 1-6 words each works best. */
  lines: z.array(rich).min(1).max(8),
  ...common,
});

const statScene = z.object({
  type: z.literal("stat"),
  kicker: z.string().optional(),
  /** "87%", "₹50,000", "3.5x", "10M+". Digits count up automatically. */
  value: z.string().min(1).max(12),
  label: rich,
  ...common,
});

const listScene = z.object({
  type: z.literal("list"),
  title: rich.optional(),
  items: z.array(rich).min(1).max(5),
  /** "lines" = big kinetic lines, earlier ones dim as the next arrives (no cards). */
  style: z.enum(["numbers", "bullets", "checks", "crosses", "lines"]).optional(),
  ...common,
});

const compareSide = z.object({
  label: z.string().min(1),
  items: z.array(z.string().min(1)).min(1).max(4),
});

const compareScene = z.object({
  type: z.literal("compare"),
  title: rich.optional(),
  /** The worse option (shown muted, with crosses). */
  left: compareSide,
  /** The better option (shown in accent, with checks). */
  right: compareSide,
  ...common,
});

const quoteScene = z.object({
  type: z.literal("quote"),
  quote: rich,
  author: z.string().min(1),
  role: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  ...common,
});

const chatScene = z.object({
  type: z.literal("chat"),
  /** Label over the prompt box, e.g. "You → Claude". */
  label: z.string().optional(),
  /** Typed out letter by letter. */
  prompt: z.string().min(1).max(160),
  /** Optional answer bubble that appears after typing finishes. */
  reply: rich.optional(),
  ...common,
});

const barsScene = z.object({
  type: z.literal("bars"),
  title: rich.optional(),
  unit: z.string().optional(),
  bars: z
    .array(z.object({ label: z.string().min(1), value: z.number().min(0) }))
    .min(2)
    .max(6),
  /** Index of the bar to paint in the accent colour. Defaults to the largest. */
  highlight: z.number().int().min(0).optional(),
  ...common,
});

const gridScene = z.object({
  type: z.literal("grid"),
  title: rich.optional(),
  items: z
    .array(
      z.object({
        icon: z.string().min(1).max(4),
        label: z.string().min(1),
        sub: z.string().optional(),
      }),
    )
    .min(2)
    .max(6),
  ...common,
});

const imageScene = z.object({
  type: z.literal("image"),
  /** File inside public/ (e.g. "images/product.jpg") or an https URL. */
  src: z.string().min(1),
  caption: rich.optional(),
  kicker: z.string().optional(),
  fit: z.enum(["cover", "contain"]).optional(),
  /** Slow camera move over the image. */
  move: z.enum(["in", "out", "left", "right", "none"]).optional(),
  ...common,
});

const clipScene = z.object({
  type: z.literal("clip"),
  /** Video file inside public/ (e.g. "clips/desk.mp4") or an https URL. Plays muted, full frame. */
  src: z.string().min(1),
  /** Seconds to skip at the start of the clip (use the clean part of a take). */
  trim: z.number().min(0).optional(),
  caption: rich.optional(),
  kicker: z.string().optional(),
  /** Where the text sits so it doesn't cover the subject. */
  area: z.enum(["top", "center", "bottom"]).optional(),
  /** Mark AI-generated footage with a small "AI-generated" tag. */
  generated: z.boolean().optional(),
  /** 0-1 darkening behind the text. Default 0.6 (keeps 7:1 contrast on bright footage). */
  scrim: z.number().min(0).max(1).optional(),
  ...common,
});

const ctaScene = z.object({
  type: z.literal("cta"),
  /** Line above the button, e.g. "Comment karo" or "Order now". */
  kicker: z.string().optional(),
  /** The button text, e.g. "VIDEO", "Link in bio". Keep it short. */
  action: z.string().min(1).max(24),
  sub: rich.optional(),
  /** @handle or URL shown at the bottom. */
  handle: z.string().optional(),
  /** Defaults to the theme: "button" (big pill) or "link" (quiet "Try X →"). */
  style: z.enum(["button", "link"]).optional(),
  ...common,
});

const orbScene = z.object({
  type: z.literal("orb"),
  kicker: z.string().optional(),
  headline: rich.optional(),
  sub: rich.optional(),
  /** Two hex colours for the orb. Defaults to the theme's. */
  colors: z.tuple([z.string(), z.string()]).optional(),
  ...common,
});

const waveScene = z.object({
  type: z.literal("wave"),
  /** Small label above, e.g. "Voice: Aria" or "Hindi · warm". */
  label: z.string().optional(),
  /** Words under the waveform; each lights up as it is spoken. Defaults to this scene's "say". */
  text: z.string().optional(),
  /** Little chips like "[whispers]" or "Hindi". */
  tags: z.array(z.string().min(1).max(20)).max(4).optional(),
  ...common,
});

const promptScene = z.object({
  type: z.literal("prompt"),
  /** Label over the input, e.g. "Describe a voice". */
  label: z.string().optional(),
  /** Typed into the input. */
  prompt: z.string().min(1).max(140),
  /** Button the cursor clicks. */
  button: z.string().max(18).optional(),
  /** What comes back: a short line of text, or a playing waveform. */
  result: rich.optional(),
  resultKind: z.enum(["text", "audio"]).optional(),
  ...common,
});

const logoScene = z.object({
  type: z.literal("logo"),
  name: z.string().min(1).max(32),
  tagline: z.string().optional(),
  /** Optional logo image inside public/. Defaults to brand.logo. */
  src: z.string().optional(),
  ...common,
});

export const sceneSchema = z.discriminatedUnion("type", [
  titleScene,
  hookScene,
  kineticScene,
  statScene,
  listScene,
  compareScene,
  quoteScene,
  chatScene,
  barsScene,
  gridScene,
  imageScene,
  clipScene,
  orbScene,
  waveScene,
  promptScene,
  ctaScene,
  logoScene,
]);

const hex = z.string().regex(/^#([0-9a-fA-F]{6})$/, "Use a 6-digit hex colour like #FF9933");

export const videoSchema = z.object({
  /** reel = 9:16 (Reels/Shorts/TikTok), portrait = 4:5, square = 1:1, landscape = 16:9 */
  format: z.enum(FORMAT_NAMES).optional(),
  theme: z.enum(THEME_NAMES).optional(),
  /** Animation personality. Defaults to the theme's. */
  motion: z.enum(["snappy", "smooth", "bouncy", "calm"]).optional(),
  /** How long text stays readable. "fast" suits punchy reels, "relaxed" suits explainers. */
  pace: z.enum(["relaxed", "normal", "fast"]).optional(),
  transition: z.enum(["auto", "push", "whip", "fade", "zoom", "blur", "cut"]).optional(),
  brand: z
    .object({
      name: z.string().optional(),
      /**
       * Brand colours (`npm run brand -- <logo>` extracts them from a logo). A
       * colour that would not read on the theme is lightened/darkened just enough.
       */
      accent: hex.optional(),
      accent2: hex.optional(),
      /** Logo file inside public/ (e.g. "brand/logo.png"). "logo" scenes without a src use it. */
      logo: z.string().optional(),
      handle: z.string().optional(),
      /** Show the handle small in a corner for the whole video. */
      watermark: z.boolean().optional(),
    })
    .optional(),
  /**
   * Pick parts of the look one by one, on top of the theme (the Studio's Look step).
   * Colours that would not read are moved in lightness only, like brand colours.
   */
  look: z
    .object({
      displayFont: z.enum(DISPLAY_FONT_NAMES).optional(),
      displayWeight: z.number().int().min(100).max(900).optional(),
      uppercase: z.boolean().optional(),
      bodyFont: z.enum(BODY_FONT_NAMES).optional(),
      /** Canvas colour; surface, lines and muted text are derived from it. */
      bg: hex.optional(),
      /** Main text colour; kept at 7:1 or better on bg. */
      text: hex.optional(),
      background: z.enum(BACKGROUND_NAMES).optional(),
      grain: z.boolean().optional(),
      corners: z.enum(Object.keys(CORNER_RADIUS) as ["sharp", "soft", "round"]).optional(),
      ctaStyle: z.enum(["button", "link"]).optional(),
      kicker: z.enum(["pill", "plain"]).optional(),
    })
    .optional(),
  audio: z
    .object({
      sfx: z.boolean().optional(),
      /** Music file inside public/ or https URL. Licensed tracks only; the kit never generates music. */
      music: z.string().optional(),
      musicVolume: z.number().min(0).max(1).optional(),
      /** Seconds into the music file where the video starts (picked by `npm run music`). Loops from here if the track is short. */
      musicStart: z.number().min(0).optional(),
      /**
       * Beat grid JSON inside public/ (written by `npm run music`). Loaded
       * automatically; transitions then land on the beat.
       */
      beats: z.string().optional(),
      /** Beat times inline, ms from the start of the music file (filled from `beats`). */
      beatGrid: z.array(z.number().min(0)).optional(),
      /** Downbeats (bar starts) inline, ms from the start of the music file (filled from `beats`). */
      downbeatGrid: z.array(z.number().min(0)).optional(),
      /** Length of the music file in seconds (filled from `beats`), so the grid follows a looped track. */
      musicDuration: z.number().min(0).optional(),
      /** Integrated loudness of the music file (filled from `beats`); the level is matched to −14 LUFS. */
      musicLufs: z.number().optional(),
      /** Voice-over file inside public/ or https URL. */
      voiceover: z.string().optional(),
      /**
       * Word timings JSON inside public/ (written by `npm run voice`). Loaded
       * automatically; scenes then cut on the spoken words.
       */
      timing: z.string().optional(),
      /** Word timings inline (the browser editor and scripts fill this in). */
      words: z
        .array(z.object({ text: z.string(), startMs: z.number(), endMs: z.number() }))
        .optional(),
    })
    .optional(),
  /** Thin story-style progress bar along the top edge. */
  progressBar: z.boolean().optional(),
  scenes: z.array(sceneSchema).min(1).max(30),
});

export type Scene = z.infer<typeof sceneSchema>;
export type SceneType = Scene["type"];
export type VideoSpec = z.infer<typeof videoSchema>;
export type SceneOf<T extends SceneType> = Extract<Scene, { type: T }>;
