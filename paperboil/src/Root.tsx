import "./fonts";
import { Composition, Folder } from "remotion";
import { Film, type FilmProps } from "./Film";
import { storyboard } from "./storyboard";

const { fps, durationInFrames } = storyboard.meta;
const defaults: FilmProps = { captions: true, grain: true, paperTexture: true };

export const RemotionRoot: React.FC = () => (
  <Folder name="MAPS-US-Stocks">
    <Composition id="Master16x9" component={Film} width={1920} height={1080} fps={fps} durationInFrames={durationInFrames} defaultProps={defaults} />
    <Composition id="Cut9x16" component={Film} width={1080} height={1920} fps={fps} durationInFrames={durationInFrames} defaultProps={defaults} />
  </Folder>
);
