import { Config } from "@remotion/cli/config";

Config.setPublicDir("./assets");
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// paper() and p5.brush both need WebGL2.
Config.setChromiumOpenGlRenderer("angle");
// First frame of each tab paints its sprites (p5.brush) — allow time for it.
Config.setDelayRenderTimeoutInMilliseconds(240000);
// Point at a local Chrome / headless-shell build if Remotion can't download one.
if (process.env.REMOTION_BROWSER_EXECUTABLE) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
}
