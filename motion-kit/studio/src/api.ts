import type { VideoSpec } from "../../src/engine/schema.ts";

const call = async <T,>(method: string, url: string, body?: unknown, raw?: Blob | ArrayBuffer): Promise<T> => {
  const res = await fetch(url, {
    method,
    headers: raw ? { "Content-Type": "application/octet-stream" } : body !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: raw ?? (body !== undefined ? JSON.stringify(body) : undefined),
  });
  const data = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
  if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
  return data as T;
};

export type ThemeInfo = {
  name: string;
  description: string;
  colors: Record<string, string>;
  fonts: { display: string; body: string };
  background: string;
  motion: string;
  transition: string;
};
export type Recipe = { name: string; purpose: string; format: string; theme: string; motion?: string; pace?: string; spec: VideoSpec };
export type Catalog = {
  themes: ThemeInfo[];
  formats: { name: string; width: number; height: number; label: string }[];
  motions: string[];
  paces: string[];
  transitions: string[];
  displayFonts: { name: string; description: string; weights: number[]; upper: boolean }[];
  bodyFonts: string[];
  backgrounds: string[];
  corners: string[];
  sfx: string[];
  sfxPacks: string[];
  recipes: Recipe[];
  elevenlabs: boolean;
};
export type CheckResult = {
  ok: boolean;
  errors: string[];
  warnings: string[];
  notes: string[];
  duration?: number;
  timeline: { index: number; type: string; from: number; duration: number }[];
};
export type QaIssue = { level: "error" | "warning"; check: string; scene: number | null; time: number; label: string | null; text: string | null; problem: string; fix?: string };
export type QaResult = { errors: number; warnings: number; issues: QaIssue[]; frames: number; seconds: number };
export type UploadKind = "brand" | "refs" | "music" | "voice" | "clips" | "images";
export type FileInfo = { name: string; path: string; size: number };
export type Job = { id: string; status: "running" | "done" | "failed"; log: string[]; outputs: string[] };

export const api = {
  catalog: () => call<Catalog>("GET", "/api/catalog"),
  specs: () => call<{ name: string; mtime: number }[]>("GET", "/api/specs"),
  load: (name: string) => call<VideoSpec>("GET", `/api/spec?name=${encodeURIComponent(name)}`),
  save: (name: string, spec: VideoSpec) => call<{ saved: string }>("PUT", `/api/spec?name=${encodeURIComponent(name)}`, spec),
  check: (spec: VideoSpec) => call<CheckResult>("POST", "/api/check", spec),
  qa: (spec: VideoSpec, format?: string) => call<QaResult>("POST", "/api/qa", { spec, format }),
  fromRecipe: (name: string, recipe: string, format?: string, theme?: string) =>
    call<{ name: string; spec: VideoSpec }>("POST", "/api/new", { name, recipe, format, theme }),
  files: (kind: UploadKind) => call<FileInfo[]>("GET", `/api/files?kind=${kind}`),
  upload: (kind: UploadKind, file: File) => call<{ path: string }>("POST", `/api/upload?kind=${kind}&name=${encodeURIComponent(file.name)}`, undefined, file),
  analyzeImage: (path: string) => call<ImageAnalysis>("POST", "/api/analyze/image", { path }),
  analyzeVideo: (path: string) => call<VideoAnalysis>("POST", "/api/analyze/video", { path }),
  musicFit: (name: string, track: string, start?: number | null, volume?: number) =>
    call<{ spec: VideoSpec; log: string }>("POST", "/api/music/fit", { name, track, start, volume }),
  musicQuote: (seconds: number) => call<{ seconds: number; credits: number | null; note: string }>("POST", "/api/music/quote", { seconds }),
  musicGenerate: (prompt: string, seconds: number, instrumental: boolean) =>
    call<{ path: string }>("POST", "/api/music/generate", { prompt, seconds, instrumental, confirm: true }),
  voiceAlign: (name: string, file: string) => call<{ spec: VideoSpec; log: string }>("POST", "/api/voice/align", { name, file }),
  render: (name: string, opts: { format?: string; allFormats?: boolean }) => call<{ id: string }>("POST", "/api/render", { name, ...opts }),
  job: (id: string) => call<Job>("GET", `/api/job?id=${id}`),
};

export type ImageAnalysis = {
  palette: { hex: string; share: number }[];
  accent?: string;
  accent2?: string;
  base?: "light" | "dark" | null;
  baseWhy?: string;
  themes?: { name: string; score: number; reasons: string[]; clash: string | null; note: string | null; accent: string; bg: string }[];
};

export type VideoAnalysis = {
  duration: number;
  cuts: number[];
  avgShot: number;
  palette: { hex: string; share: number }[];
  brightness: "light" | "dark" | "mixed";
  energy: "calm" | "medium" | "high";
  bpm: number | null;
  suggestion: { theme: string; motion: string; pace: string; transition: string; look: Record<string, unknown>; why: string[] };
};
