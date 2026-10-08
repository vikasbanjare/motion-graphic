import { createContext, useContext, useMemo } from "react";
import { contentBox, textFloor, unit, type Format } from "./formats.ts";
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
  /** Where scene content is laid out: the safe zone, minus room for the camera push (and watermark). */
  box: ReturnType<typeof contentBox>;
  /** Smallest readable text for this format (px). Small labels never go below `comfortable`. */
  floor: ReturnType<typeof textFloor>;
  /** Colours for this scene, after the scene's `bg` override. */
  c: Theme["colors"];
  landscape: boolean;
};

/** Stage's slow camera push-in: content scales from 1 to 1 + CAMERA_PUSH over a scene. */
export const CAMERA_PUSH = 0.035;

/** Height kept free at the top of the safe zone for the brand watermark. */
export const watermarkSpace = (format: Format) => textFloor(format).comfortable * 1.8;

/**
 * The safe zone shrunk around its centre so that content filling it still
 * ends inside the safe zone at the end of the push-in.
 */
export const layoutBox = (format: Format, watermark = false) => {
  const safe = contentBox(format);
  const top = watermark ? watermarkSpace(format) : 0;
  const b = { ...safe, top: safe.top + top, height: safe.height - top };
  const k = 1 / (1 + CAMERA_PUSH);
  const width = b.width * k;
  const height = b.height * k;
  return { left: b.left + (b.width - width) / 2, top: b.top + (b.height - height) / 2, width, height };
};

export const PlanContext = createContext<VideoPlan | null>(null);
/** QA mode: draws safe zones and flags text that had to overflow its slot. */
export const QaContext = createContext(false);
export const SceneContext = createContext<ScenePlan | null>(null);

export const useEnv = (): SceneEnv => {
  const plan = useContext(PlanContext);
  const scene = useContext(SceneContext);
  if (!plan || !scene) throw new Error("useEnv() must be used inside a scene");
  // Same objects every frame, so scenes can memoise layout on them.
  return useMemo(() => {
    const { theme, format } = plan;
    return {
      plan,
      scene,
      theme,
      format,
      m: plan.motion,
      u: unit(format),
      box: layoutBox(format, Boolean(plan.spec.brand.watermark && plan.spec.brand.handle)),
      floor: textFloor(format),
      c: sceneColors(theme, scene.scene.bg),
      landscape: format.width > format.height,
    };
  }, [plan, scene]);
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
