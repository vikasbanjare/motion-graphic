import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setColorSpace("bt709");
Config.setOverwriteOutput(true);
Config.setCodec("h264");
// CRF 20: visually lossless for motion graphics at ~8 Mbps (platforms re-encode anyway).
Config.setCrf(20);
Config.setPixelFormat("yuv420p");
Config.setEntryPoint("src/index.ts");
// Where Remotion can't download its own browser (cloud sandboxes), Studio and
// `npx remotion` use the Chromium found by the repository's SessionStart hook
// (../scripts/session-start.sh). The npm scripts pass it themselves.
if (process.env.REMOTION_BROWSER_EXECUTABLE) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
  if (process.env.REMOTION_CHROME_MODE === "chrome-for-testing") Config.setChromeMode("chrome-for-testing");
}
