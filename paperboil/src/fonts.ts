import { loadFont } from "@remotion/fonts";
import { continueRender, delayRender, staticFile } from "remotion";

// Open Sans is the only typeface (brand rule). Bundled locally so renders
// never depend on a font CDN.
export const FONT_FAMILY = "Open Sans";

const handle = delayRender("Loading Open Sans");
Promise.all(
  (["400", "600", "800"] as const).map((weight) =>
    loadFont({ family: FONT_FAMILY, url: staticFile(`fonts/OpenSans-${weight}.woff2`), weight }),
  ),
)
  .then(() => continueRender(handle))
  .catch((err) => {
    console.error(err);
    continueRender(handle);
  });
