import { createContext, useContext } from "react";
import { contentBox, unit, type Format } from "./formats.ts";
import type { ScenePlan, VideoPlan } from "./plan.ts";
import type { Theme } from "./themes.ts";
import type { MotionTokens } from "./tokens.ts";

export type SceneEnv = {
  plan: VideoPlan;
  scene: ScenePlan;
  theme: Theme;
  format: Format;
  m: MotionTokens;
  /** Typography unit (1 at 1080 short side). */
  u: number;
  box: ReturnType<typeof contentBox>;
  /** Colours for this scene, after the scene's `bg` override. */
  c: Theme["colors"];
  landscape: boolean;
};

export const PlanContext = createContext<VideoPlan | null>(null);
/** QA mode: draws safe zones and flags text that had to overflow its slot. */
export const QaContext = createContext(false);
export const SceneContext = createContext<ScenePlan | null>(null);

export const useEnv = (): SceneEnv => {
  const plan = useContext(PlanContext);
  const scene = useContext(SceneContext);
  if (!plan || !scene) throw new Error("useEnv() must be used inside a scene");
  const { theme, format } = plan;
  return {
    plan,
    scene,
    theme,
    format,
    m: plan.motion,
    u: unit(format),
    box: contentBox(format),
    c: sceneColors(theme, scene.scene.bg),
    landscape: format.width > format.height,
  };
};

/** "accent" scenes flip to a full-colour background; "inverse" swaps light/dark. */
export const sceneColors = (theme: Theme, bg?: "default" | "accent" | "inverse"): Theme["colors"] => {
  const c = theme.colors;
  if (bg === "accent") {
    return { ...c, bg: c.accent, surface: c.onAccent + "14", line: c.onAccent + "33", text: c.onAccent, muted: c.onAccent + "CC", accent: c.onAccent, onAccent: c.accent, mark: c.onAccent, onMark: c.accent };
  }
  if (bg === "inverse") {
    return { ...c, bg: c.text, surface: c.bg + "14", line: c.bg + "33", text: c.bg, muted: c.bg + "B3" };
  }
  return c;
};
