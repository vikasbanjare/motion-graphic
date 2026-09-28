import { TransitionPresentation, TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { Hook } from "./scenes/Hook";
import { Problem } from "./scenes/Problem";
import { Reveal } from "./scenes/Reveal";
import { Steps } from "./scenes/Steps";
import { Proof } from "./scenes/Proof";
import { CTA } from "./scenes/CTA";

export const SCENES = [
  { id: "Hook", component: Hook, durationInFrames: 100 },
  { id: "Problem", component: Problem, durationInFrames: 120 },
  { id: "Reveal", component: Reveal, durationInFrames: 120 },
  { id: "Steps", component: Steps, durationInFrames: 180 },
  { id: "Proof", component: Proof, durationInFrames: 110 },
  { id: "CTA", component: CTA, durationInFrames: 110 },
] as const;

const TRANSITION = 10;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const presentations: TransitionPresentation<any>[] = [
  slide({ direction: "from-bottom" }),
  wipe({ direction: "from-left" }),
  slide({ direction: "from-right" }),
  fade(),
  slide({ direction: "from-bottom" }),
];

export const TOTAL_DURATION =
  SCENES.reduce((sum, s) => sum + s.durationInFrames, 0) - TRANSITION * (SCENES.length - 1);

export const Main: React.FC = () => (
  <TransitionSeries>
    {SCENES.flatMap((s, i) => {
      const Scene = s.component;
      const seq = (
        <TransitionSeries.Sequence key={s.id} name={s.id} durationInFrames={s.durationInFrames}>
          <Scene />
        </TransitionSeries.Sequence>
      );
      return i === 0
        ? [seq]
        : [
            <TransitionSeries.Transition
              key={`t-${s.id}`}
              presentation={presentations[i - 1]}
              timing={linearTiming({ durationInFrames: TRANSITION })}
            />,
            seq,
          ];
    })}
  </TransitionSeries>
);
