import { AbsoluteFill, Freeze, Sequence, useCurrentFrame } from "remotion";
import { Backdrop } from "./components/Backdrop";
import { Captions } from "./components/Captions";
import { Grain } from "./components/Grain";
import { Ground } from "./components/Ground";
import { TextLayer } from "./components/KineticWord";
import { PaperTexture } from "./components/PaperTexture";
import { Soundtrack } from "./components/Soundtrack";
import { useLayout } from "./layout";
import { WorldSwitch } from "./components/WorldSwitch";
import { drawnFrame } from "./motion";
import { SHOT_COMPONENTS } from "./shots";
import { shotDuration, shotFrom, storyboard, type Shot } from "./storyboard";
import { TRANSITIONS, type TransitionCtx } from "./transitions";
import { clamp01, sec, stepped } from "./timing";

export type FilmProps = {
  captions: boolean;
  grain: boolean;
  paperTexture: boolean;
};

/** Transition progress is stepped at 15 fps — the reference's choppy in-transition motion. */
const progress = (k: number, n: number) => clamp01((stepped(k, 2) + 1) / n);

const ShotFrame: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const layout = useLayout();
  const shots = storyboard.shots;
  const shot = shots[index];
  const prev: Shot | undefined = shots[index - 1];
  const next: Shot | undefined = shots[index + 1];
  const dur = shotDuration(shot);
  const Comp = SHOT_COMPONENTS[shot.id];

  let style: React.CSSProperties = {};
  const overlays: React.ReactNode[] = [];
  let revealGround: Shot | null = null;

  const out = shot.transitionOut;
  if (next && out.frames > 0 && frame >= dur - out.frames) {
    const impl = TRANSITIONS[out.name];
    const ctx: TransitionCtx = { params: out.params, layout, from: shot, to: next };
    const p = progress(frame - (dur - out.frames), out.frames);
    style = { ...style, ...impl.exitStyle?.(p, ctx) };
    if (impl.ExitOverlay) overlays.push(<impl.ExitOverlay key="exit" p={p} ctx={ctx} />);
    if (impl.revealNextGround) revealGround = next;
  }
  if (prev && prev.transitionOut.frames > 0 && frame < prev.transitionOut.frames) {
    const t = prev.transitionOut;
    const impl = TRANSITIONS[t.name];
    const ctx: TransitionCtx = { params: t.params, layout, from: prev, to: shot };
    const p = progress(frame, t.frames);
    style = { ...style, ...impl.enterStyle?.(p, ctx) };
    revealGround = prev;
    if (impl.EnterOverlay) overlays.push(<impl.EnterOverlay key="enter" p={p} ctx={ctx} />);
  }

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {revealGround ? <Ground tokens={revealGround.ground} /> : null}
      <AbsoluteFill style={style}>
        <Backdrop spec={shot.backdrop} />
        <Comp shot={shot} />
      </AbsoluteFill>
      {overlays}
    </AbsoluteFill>
  );
};

export const Film: React.FC<FilmProps> = ({ captions, grain, paperTexture }) => {
  const frame = useCurrentFrame();
  const current = storyboard.shots.find((s) => frame >= sec(s.start) && frame < sec(s.end)) ?? storyboard.shots[0];
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* Picture is animated on twos (12 drawings/s, 2-3-2-3 holds), like the
          reference. Audio, grain and captions stay on ones. */}
      <WorldSwitch
        frame={frame}
        drawn={drawnFrame(frame)}
        render={(d) => (
          <Freeze frame={d}>
            {storyboard.shots.map((shot, i) => (
              <Sequence key={shot.id} from={shotFrom(shot)} durationInFrames={shotDuration(shot)} name={`${shot.id} · ${shot.name}`}>
                <ShotFrame index={i} />
              </Sequence>
            ))}
            <TextLayer />
          </Freeze>
        )}
      />
      {captions ? <Captions /> : null}
      {paperTexture ? <PaperTexture amount={current.light ? 0.32 : 0.18} /> : null}
      <Grain light={current.light} enabled={grain} />
      <Soundtrack />
    </AbsoluteFill>
  );
};
