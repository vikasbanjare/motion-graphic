import { registerRoot } from "remotion";
import { loadAllFonts } from "./engine/fonts.ts";
import { RemotionRoot } from "./Root.tsx";

loadAllFonts();
registerRoot(RemotionRoot);
