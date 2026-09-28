import "./index.css";
import { Composition, Folder } from "remotion";
import { Main, SCENES, TOTAL_DURATION } from "./Main";

const size = { width: 1080, height: 1920, fps: 30 };

export const RemotionRoot: React.FC = () => (
  <>
    <Folder name="AIReel-Scenes">
      {SCENES.map((s) => (
        <Composition key={s.id} id={s.id} component={s.component} durationInFrames={s.durationInFrames} {...size} />
      ))}
    </Folder>
    <Composition id="AIReel" component={Main} durationInFrames={TOTAL_DURATION} {...size} />
  </>
);
