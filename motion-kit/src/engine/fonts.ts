import { loadFont } from "@remotion/fonts";
import { useEffect, useState } from "react";
import { staticFile } from "remotion";

/**
 * All fonts are vendored (public/fonts, SIL OFL) so renders are offline and
 * identical on every machine. Poppins and Teko include Devanagari, and every
 * theme falls back to them, so Hindi text always renders in a designed face.
 */
type FontFile = { family: string; file: string; weight: string; style?: string };

const FILES: FontFile[] = [
  { family: "Anton", file: "Anton.woff2", weight: "400" },
  { family: "Poppins", file: "Poppins-500.woff2", weight: "500" },
  { family: "Poppins", file: "Poppins-700.woff2", weight: "600 700" },
  { family: "Poppins", file: "Poppins-800.woff2", weight: "800 900" },
  { family: "Inter", file: "Inter.woff2", weight: "100 900" },
  { family: "Space Grotesk", file: "SpaceGrotesk.woff2", weight: "300 700" },
  { family: "Instrument Serif", file: "InstrumentSerif.woff2", weight: "400" },
  { family: "Instrument Serif", file: "InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  { family: "Archivo Black", file: "ArchivoBlack.woff2", weight: "400" },
  { family: "Teko", file: "Teko.woff2", weight: "300 700" },
  { family: "Plus Jakarta Sans", file: "PlusJakartaSans.woff2", weight: "200 800" },
];

/** Override where font files come from (the browser editor inlines them). */
let resolveUrl = (file: string) => staticFile(`fonts/${file}`);
export const setFontUrlResolver = (fn: (file: string) => string) => {
  resolveUrl = fn;
};

let ready: Promise<void> | null = null;
let isReady = false;

export const loadAllFonts = () => {
  if (!ready) {
    ready = Promise.all(
      FILES.map((f) => loadFont({ family: f.family, url: resolveUrl(f.file), weight: f.weight, style: f.style })),
    ).then(() => {
      isReady = true;
    });
  }
  return ready;
};

/** Text is measured for auto-fit, so nothing renders until the real fonts are in. */
export const useFontsReady = () => {
  const [ok, setOk] = useState(isReady);
  useEffect(() => {
    if (ok) return;
    let alive = true;
    loadAllFonts().then(() => alive && setOk(true));
    return () => {
      alive = false;
    };
  }, [ok]);
  return ok;
};
