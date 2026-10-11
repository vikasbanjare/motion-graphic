import type { VideoSpec } from "./engine/schema.ts";
import allScenes from "../specs/all-scenes.json";
import claudeReel from "../specs/claude-reel.json";
import studioLaunch from "../specs/studio-launch.json";

/** Bundled example specs, shown in Remotion Studio's "Examples" folder. */
export const EXAMPLES: { id: string; spec: VideoSpec }[] = [
  { id: "claude-reel", spec: claudeReel as VideoSpec },
  { id: "studio-launch", spec: studioLaunch as VideoSpec },
  { id: "all-scenes", spec: allScenes as VideoSpec },
];
