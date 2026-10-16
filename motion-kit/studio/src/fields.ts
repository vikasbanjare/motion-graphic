import type { SceneType } from "../../src/engine/schema.ts";

/**
 * How the Storyboard step edits each scene type. Mirrors src/engine/schema.ts;
 * `check` validates the result, so a field missing here can still be set in JSON.
 */
export type Field =
  | { key: string; label: string; kind: "text" | "rich" | "long"; required?: boolean; max?: number; hint?: string }
  | { key: string; label: string; kind: "lines"; min?: number; max: number; hint?: string }
  | { key: string; label: string; kind: "number"; min?: number; max?: number; step?: number; hint?: string }
  | { key: string; label: string; kind: "choice"; options: string[]; hint?: string }
  | { key: string; label: string; kind: "toggle"; hint?: string }
  | { key: string; label: string; kind: "media"; accept: "image" | "video"; required?: boolean }
  | { key: string; label: string; kind: "compare" }
  | { key: string; label: string; kind: "bars" }
  | { key: string; label: string; kind: "grid" };

export type SceneInfo = { label: string; use: string; fields: Field[]; sample: Record<string, unknown> };

const RICH_HINT = "*word* = accent colour, ==word== = highlight, ~~word~~ = struck out";

export const SCENES: Record<SceneType, SceneInfo> = {
  hook: {
    label: "Hook",
    use: "Stop the scroll in the first 2 s: a setup, an optional struck-out line, then the punch.",
    fields: [
      { key: "setup", label: "Setup", kind: "text", hint: "e.g. Still editing videos by hand?" },
      { key: "strike", label: "Struck-out line", kind: "text" },
      { key: "punch", label: "Punch", kind: "rich", required: true, hint: RICH_HINT },
    ],
    sample: { type: "hook", setup: "Still editing by hand?", punch: "Let *AI* do it." },
  },
  title: {
    label: "Title",
    use: "One big statement with a small label above and a line below.",
    fields: [
      { key: "kicker", label: "Kicker (small label)", kind: "text", max: 26 },
      { key: "headline", label: "Headline", kind: "rich", required: true, hint: RICH_HINT },
      { key: "sub", label: "Sub line", kind: "rich" },
    ],
    sample: { type: "title", kicker: "Introducing", headline: "Meet *Lumen*" },
  },
  kinetic: {
    label: "Kinetic type",
    use: "Short phrases that replace each other in rhythm.",
    fields: [{ key: "lines", label: "Lines (one per row)", kind: "lines", min: 1, max: 8 }],
    sample: { type: "kinetic", lines: ["Type a line.", "Pick a mood.", "Hear it *instantly*."] },
  },
  stat: {
    label: "Big number",
    use: "One number that proves the point.",
    fields: [
      { key: "kicker", label: "Kicker", kind: "text", max: 26 },
      { key: "value", label: "Number", kind: "text", required: true, max: 12, hint: "e.g. 3×, 92%, ₹499" },
      { key: "label", label: "What it means", kind: "rich", required: true },
    ],
    sample: { type: "stat", value: "3×", label: "faster edits" },
  },
  list: {
    label: "List",
    use: "Up to 5 points: features, steps, tips.",
    fields: [
      { key: "title", label: "Title", kind: "rich" },
      { key: "items", label: "Items (one per row)", kind: "lines", min: 1, max: 5 },
      { key: "style", label: "Markers", kind: "choice", options: ["numbers", "bullets", "checks", "crosses", "lines"] },
    ],
    sample: { type: "list", title: "Why it works", items: ["Fast", "Simple", "Free"], style: "checks" },
  },
  compare: {
    label: "Before / after",
    use: "Two columns: old way vs new way.",
    fields: [
      { key: "title", label: "Title", kind: "rich" },
      { key: "sides", label: "Columns", kind: "compare" },
    ],
    sample: { type: "compare", left: { label: "Before", items: ["Hours"] }, right: { label: "After", items: ["Minutes"] } },
  },
  quote: {
    label: "Quote / review",
    use: "A real customer quote with name and rating.",
    fields: [
      { key: "quote", label: "Quote", kind: "rich", required: true },
      { key: "author", label: "Name", kind: "text", required: true },
      { key: "role", label: "Role / city", kind: "text" },
      { key: "rating", label: "Stars", kind: "number", min: 1, max: 5, step: 1 },
    ],
    sample: { type: "quote", quote: "Saved me hours every week.", author: "Asha", rating: 5 },
  },
  chat: {
    label: "Chat",
    use: "A question and an AI answer, typed out.",
    fields: [
      { key: "label", label: "Label", kind: "text" },
      { key: "prompt", label: "Question", kind: "long", required: true, max: 160 },
      { key: "reply", label: "Answer", kind: "rich" },
    ],
    sample: { type: "chat", prompt: "Make my reel", reply: "Done in *10 seconds*." },
  },
  bars: {
    label: "Bar chart",
    use: "2-6 bars with real numbers.",
    fields: [
      { key: "title", label: "Title", kind: "rich" },
      { key: "unit", label: "Unit", kind: "text", hint: "e.g. %, hrs, ₹" },
      { key: "bars", label: "Bars", kind: "bars" },
      { key: "highlight", label: "Highlight bar # (from 0)", kind: "number", min: 0, step: 1 },
    ],
    sample: { type: "bars", bars: [{ label: "2024", value: 12 }, { label: "2025", value: 30 }] },
  },
  grid: {
    label: "Feature grid",
    use: "2-6 tiles with an emoji icon, label and sub.",
    fields: [
      { key: "title", label: "Title", kind: "rich" },
      { key: "items", label: "Tiles", kind: "grid" },
    ],
    sample: { type: "grid", items: [{ icon: "⚡", label: "Fast" }, { icon: "🎨", label: "On brand" }] },
  },
  image: {
    label: "Image",
    use: "A photo or screenshot with a slow camera move.",
    fields: [
      { key: "src", label: "Image", kind: "media", accept: "image", required: true },
      { key: "kicker", label: "Kicker", kind: "text" },
      { key: "caption", label: "Caption", kind: "rich" },
      { key: "fit", label: "Fit", kind: "choice", options: ["cover", "contain"] },
      { key: "move", label: "Camera move", kind: "choice", options: ["in", "out", "left", "right", "none"] },
    ],
    sample: { type: "image", src: "", caption: "Your product" },
  },
  clip: {
    label: "Video clip",
    use: "Your footage or an AI clip (Flow/Veo), with words on top.",
    fields: [
      { key: "src", label: "Clip", kind: "media", accept: "video", required: true },
      { key: "trim", label: "Start at (s)", kind: "number", min: 0, step: 0.1 },
      { key: "kicker", label: "Kicker", kind: "text" },
      { key: "caption", label: "Caption", kind: "rich" },
      { key: "area", label: "Text area", kind: "choice", options: ["top", "center", "bottom"] },
      { key: "scrim", label: "Darken (0-1)", kind: "number", min: 0, max: 1, step: 0.05 },
      { key: "generated", label: "AI-generated footage", kind: "toggle" },
    ],
    sample: { type: "clip", src: "", caption: "See it live" },
  },
  orb: {
    label: "Orb (calm hero)",
    use: "A soft glowing orb that breathes with the voice. Launch-film opener.",
    fields: [
      { key: "kicker", label: "Kicker", kind: "text" },
      { key: "headline", label: "Headline", kind: "rich" },
      { key: "sub", label: "Sub line", kind: "rich" },
    ],
    sample: { type: "orb", headline: "Meet *Lumen*" },
  },
  wave: {
    label: "Voice waveform",
    use: "A waveform with karaoke text: voice / audio products.",
    fields: [
      { key: "label", label: "Label", kind: "text" },
      { key: "text", label: "Spoken text", kind: "long" },
      { key: "tags", label: "Tags (one per row)", kind: "lines", max: 4 },
    ],
    sample: { type: "wave", label: "Narrator", text: "Hello, I am your new voice." },
  },
  prompt: {
    label: "Prompt → result",
    use: "Type a prompt, click, get the result: AI tool demos.",
    fields: [
      { key: "label", label: "Label", kind: "text" },
      { key: "prompt", label: "Prompt", kind: "long", required: true, max: 140 },
      { key: "button", label: "Button", kind: "text", max: 18 },
      { key: "result", label: "Result", kind: "rich" },
      { key: "resultKind", label: "Result type", kind: "choice", options: ["text", "audio"] },
    ],
    sample: { type: "prompt", prompt: "A calm voice for my podcast", button: "Generate", resultKind: "audio" },
  },
  cta: {
    label: "Call to action",
    use: "What people should do now.",
    fields: [
      { key: "kicker", label: "Kicker", kind: "text" },
      { key: "action", label: "Action", kind: "text", required: true, max: 24, hint: "1-3 words: Try free, Order now" },
      { key: "sub", label: "Sub line", kind: "rich" },
      { key: "handle", label: "Handle / URL", kind: "text" },
      { key: "style", label: "Style", kind: "choice", options: ["button", "link"] },
    ],
    sample: { type: "cta", action: "Try it free" },
  },
  logo: {
    label: "Logo sign-off",
    use: "Logo, name and tagline at the end. Usually silent.",
    fields: [
      { key: "name", label: "Name", kind: "text", required: true, max: 32 },
      { key: "tagline", label: "Tagline", kind: "text" },
      { key: "src", label: "Logo (defaults to brand logo)", kind: "media", accept: "image" },
    ],
    sample: { type: "logo", name: "Brand" },
  },
};

export const COMMON_FIELDS: Field[] = [
  { key: "say", label: "Narration (say)", kind: "long", hint: "What the voice says. Timing follows it even without a voice-over." },
  { key: "duration", label: "Length (s, optional)", kind: "number", min: 0.8, max: 20, step: 0.1 },
  { key: "bg", label: "Background", kind: "choice", options: ["default", "accent", "inverse"] },
  { key: "sfx", label: "Sound effects", kind: "choice", options: ["on", "off"] },
];
