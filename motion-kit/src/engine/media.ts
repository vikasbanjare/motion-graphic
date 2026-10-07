import { staticFile } from "remotion";

/** `images/x.jpg` -> file in public/; http(s), data: and blob: URLs pass through. */
let resolver = (src: string) => (/^(https?:|data:|blob:)/.test(src) ? src : staticFile(src.replace(/^\/+/, "")));

export const resolveMedia = (src: string) => resolver(src);

/** The browser editor swaps this to serve uploaded files and inlined assets. */
export const setMediaResolver = (fn: (src: string) => string) => {
  resolver = fn;
};
