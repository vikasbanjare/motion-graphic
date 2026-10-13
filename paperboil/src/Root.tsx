import "./fonts";
import { Composition, Folder } from "remotion";
import { Film, type FilmProps } from "./Film";
import { storyboard } from "./storyboard";
import { StyleAEnd, StyleAHero, StyleAHook } from "./styleframes/StyleA";
import { StyleCHero } from "./styleframes/StyleC";

const { fps, durationInFrames } = storyboard.meta;
const defaults: FilmProps = { captions: false, grain: true, paperTexture: true };

export const RemotionRoot: React.FC = () => (
  <>
  <Folder name="MAPS-US-Stocks">
    <Composition id="Master16x9" component={Film} width={1920} height={1080} fps={fps} durationInFrames={durationInFrames} defaultProps={defaults} />
    <Composition id="Cut9x16" component={Film} width={1080} height={1920} fps={fps} durationInFrames={durationInFrames} defaultProps={defaults} />
  </Folder>
  <StyleframesRoot />
  </>
);

export const StyleframesRoot: React.FC = () => (
  <Folder name="Styleframes">
    {([
      ["SF-A-Hero", StyleAHero],
      ["SF-A-Hook", StyleAHook],
      ["SF-A-End", StyleAEnd],
      ["SF-C-Hero", StyleCHero],
    ] as const).map(([id, C]) => (
      <Composition key={id} id={id} component={C} width={1920} height={1080} fps={fps} durationInFrames={1} />
    ))}
  </Folder>
);
