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
