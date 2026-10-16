import { createRoot } from "react-dom/client";
import { loadAllFonts, setFontUrlResolver } from "../../src/engine/fonts.ts";
import { setMediaResolver } from "../../src/engine/media.ts";
import { setSfxUrlResolver } from "../../src/engine/Video.tsx";
import { App } from "./App.tsx";
import "./styles.css";

// The Studio's server serves motion-kit/public at the site root.
setFontUrlResolver((file) => `/fonts/${file}`);
setMediaResolver((src) => (/^(https?:|data:|blob:)/.test(src) ? src : `/${src.replace(/^\/+/, "")}`));
setSfxUrlResolver((name, pack = "classic") => (pack === "classic" ? `/sfx/${name}.wav` : `/sfx/${pack}/${name}.wav`));
// Fonts are also used by the font pickers outside the player.
loadAllFonts();

createRoot(document.getElementById("root")!).render(<App />);
