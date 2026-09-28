import { Composition, Folder } from "remotion";
import { Main, SCENES, TOTAL_DURATION, withBackdrop } from "./Main";
import { FPS, H, W } from "./theme";

const size = { width: W, height: H, fps: FPS };

export const RemotionRoot: React.FC = () => (
  <>
    <Folder name="Scenes">
      {SCENES.map((s) => (
        <Composition
          key={s.id}
          id={s.id}
          component={withBackdrop(s.component, s.durationInFrames)}
          durationInFrames={s.durationInFrames}
          {...size}
        />
      ))}
    </Folder>
    <Composition id="OpusLaunch" component={Main} durationInFrames={TOTAL_DURATION} {...size} />
  </>
);
