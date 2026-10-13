import { loadFont } from "@remotion/fonts";
import { continueRender, delayRender, staticFile } from "remotion";

// Open Sans is the only typeface (brand rule). Bundled locally so renders
// never depend on a font CDN. The variable build (wght 300–800, wdth 75–100,
// OFL, via @fontsource-variable/open-sans) lets type weight and width animate.
export const FONT_FAMILY = "Open Sans";

const handle = delayRender("Loading Open Sans");
loadFont({ family: FONT_FAMILY, url: staticFile("fonts/OpenSans-variable.woff2"), weight: "300 800", stretch: "75% 100%" })
  .then(() => continueRender(handle))
  .catch((err) => {
    console.error(err);
    continueRender(handle);
  });
