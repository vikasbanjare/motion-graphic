import { Html5Audio, getStaticFiles, staticFile } from "remotion";
import { storyboard } from "../storyboard";

const exists = (name: string) => getStaticFiles().some((f) => f.name === name);

/**
 * The soundtrack is one pre-mixed file (npm run audio → assets/audio/mix.wav):
 * music edit + layered SFX + ducking + vacuum gate + loudnorm, built offline by
 * scripts/mix.ts so Studio preview and renders sound identical. Falls back to
 * the bare music edit if the mix hasn't been built yet.
 */
export const Soundtrack: React.FC = () => {
  const { mix, music } = storyboard.audio;
  if (exists(mix)) return <Html5Audio src={staticFile(mix)} />;
  if (exists(music)) return <Html5Audio src={staticFile(music)} />;
  return null;
};
