import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop } from "./components";
import { Availability, EndCard } from "./scenes/Closing";
import { Coding, Efficiency, Intelligence, Safety } from "./scenes/Facts";
import { Tease, Title } from "./scenes/Opening";
import { ramp, sec } from "./theme";

export const SCENES = [
  { id: "Tease", component: Tease, durationInFrames: sec(2.9) },
  { id: "Title", component: Title, durationInFrames: sec(4.2) },
  { id: "Intelligence", component: Intelligence, durationInFrames: sec(4.8) },
  { id: "Coding", component: Coding, durationInFrames: sec(4.6) },
  { id: "Efficiency", component: Efficiency, durationInFrames: sec(5.0) },
  { id: "Safety", component: Safety, durationInFrames: sec(5.0) },
  { id: "Availability", component: Availability, durationInFrames: sec(3.8) },
  { id: "EndCard", component: EndCard, durationInFrames: sec(5.0) },
] as const;

// Scenes overlap so each exit blurs into the next entrance.
// scripts/make_score.py mirrors these timings for the soundtrack.
const OVERLAP = sec(0.12);

const starts = SCENES.reduce<number[]>(
  (acc, s, i) => [...acc, i === 0 ? 0 : acc[i - 1] + SCENES[i - 1].durationInFrames - OVERLAP],
  [],
);

export const TOTAL_DURATION = starts[starts.length - 1] + SCENES[SCENES.length - 1].durationInFrames;

export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Backdrop endFade={ramp(frame, durationInFrames - sec(0.6), sec(0.6))} />
      <Audio src={staticFile("audio/score.wav")} />
      {SCENES.map((s, i) => {
        const Scene = s.component;
        return (
          <Sequence key={s.id} name={s.id} from={starts[i]} durationInFrames={s.durationInFrames}>
            <Scene duration={s.durationInFrames} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

// Standalone scene preview with the shared backdrop.
export const withBackdrop = (Scene: React.FC<{ duration: number }>, duration: number) => {
  const Wrapped: React.FC = () => (
    <AbsoluteFill>
      <Backdrop endFade={0} />
      <Scene duration={duration} />
    </AbsoluteFill>
  );
  return Wrapped;
};
