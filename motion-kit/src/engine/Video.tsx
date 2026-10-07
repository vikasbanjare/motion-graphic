import React, { useMemo } from "react";
import { AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries } from "@remotion/transitions";
import type { CalculateMetadataFunction } from "remotion";
import { Background } from "./backgrounds.tsx";
import { PlanContext, QaContext, SceneContext } from "./context.ts";
import { SafeZoneOverlay } from "./stage.tsx";
import { FPS } from "./formats.ts";
import { useFontsReady } from "./fonts.ts";
import { resolveMedia } from "./media.ts";
import { planVideo, type SfxName, type VideoPlan } from "./plan.ts";
import { videoSchema, type Scene, type VideoSpec } from "./schema.ts";
import { makeTransition, transitionTiming } from "./transitions.tsx";
import { SCENES } from "../scenes/index.ts";

let sfxUrl = (name: SfxName) => staticFile(`sfx/${name}.wav`);
export const setSfxUrlResolver = (fn: (name: SfxName) => string) => {
  sfxUrl = fn;
};

/** Pull word timings from `audio.timing` (a JSON file in public/) into the spec. */
export const withTimings = async (spec: VideoSpec, signal?: AbortSignal): Promise<VideoSpec> => {
  if (!spec.audio?.timing || spec.audio.words?.length) return spec;
  try {
    const res = await fetch(resolveMedia(spec.audio.timing), { signal });
    const data = await res.json();
    const words = Array.isArray(data) ? data : data.words;
    return { ...spec, audio: { ...spec.audio, words } };
  } catch {
    return spec;
  }
};

export const calculateVideoMetadata: CalculateMetadataFunction<VideoSpec> = async ({ props, abortSignal }) => {
  const parsed = videoSchema.safeParse(props);
  if (!parsed.success) return { durationInFrames: 90, fps: FPS, width: 1080, height: 1920 };
  const spec = await withTimings(parsed.data, abortSignal);
  const plan = planVideo(spec);
  return {
    durationInFrames: plan.durationInFrames,
    fps: FPS,
    width: plan.format.width,
    height: plan.format.height,
    props: spec,
  };
};

/** The one composition. Everything a video is comes from the spec. */
export const Video: React.FC<VideoSpec & { _qa?: boolean; _silent?: boolean }> = (props) => {
  const parsed = useMemo(() => videoSchema.safeParse(props), [props]);
  if (!parsed.success) {
    return <SpecError issues={parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`)} />;
  }
  return (
    <QaContext.Provider value={Boolean(props._qa)}>
      <Rendered spec={parsed.data} qa={Boolean(props._qa)} silent={Boolean(props._silent)} />
    </QaContext.Provider>
  );
};

const Rendered: React.FC<{ spec: VideoSpec; qa: boolean; silent: boolean }> = ({ spec, qa, silent }) => {
  const plan = useMemo(() => planVideo(spec), [spec]);
  const fontsReady = useFontsReady();
  const T = plan.transitionFrames;

  return (
    <PlanContext.Provider value={plan}>
      <AbsoluteFill style={{ backgroundColor: plan.theme.colors.bg }}>
        <Background theme={plan.theme} format={plan.format} />
        {fontsReady ? (
          <TransitionSeries>
            {plan.scenes.flatMap((s, i) => {
              const node = (
                <TransitionSeries.Sequence key={`s${i}`} name={`${i + 1}. ${s.scene.type}`} durationInFrames={s.duration} premountFor={30}>
                  <SceneContext.Provider value={s}>
                    <SceneView scene={s.scene} />
                  </SceneContext.Provider>
                </TransitionSeries.Sequence>
              );
              if (i === 0 || T === 0) return [node];
              return [
                <TransitionSeries.Transition
                  key={`t${i}`}
                  presentation={makeTransition(plan.spec.transition as Exclude<typeof plan.spec.transition, "cut">, plan.format)}
                  timing={transitionTiming(T)}
                />,
                node,
              ];
            })}
          </TransitionSeries>
        ) : null}
        <Overlays plan={plan} />
        {qa ? <SafeZoneOverlay format={plan.format} /> : null}
        {silent ? null : <Sounds plan={plan} />}
      </AbsoluteFill>
    </PlanContext.Provider>
  );
};

const SceneView: React.FC<{ scene: Scene }> = ({ scene }) => {
  const Component = SCENES[scene.type] as React.FC<{ scene: Scene }>;
  return <Component scene={scene} />;
};

const Overlays: React.FC<{ plan: VideoPlan }> = ({ plan }) => {
  const frame = useCurrentFrame();
  const { format, theme, spec } = plan;
  const c = theme.colors;
  const u = Math.min(format.width, format.height) / 1080;
  return (
    <>
      {spec.progressBar ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: 8 * u,
            width: `${((frame / plan.durationInFrames) * 100).toFixed(3)}%`,
            background: c.accent,
          }}
        />
      ) : null}
      {spec.brand.watermark && spec.brand.handle ? (
        <div
          style={{
            position: "absolute",
            left: format.safe.left,
            top: Math.max(30 * u, format.safe.top - 80 * u),
            fontFamily: theme.fonts.body,
            fontWeight: theme.fonts.bodyStrongWeight,
            fontSize: 30 * u,
            color: c.muted,
            opacity: interpolate(frame, [10, 25], [0, 0.85], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          {spec.brand.handle}
        </div>
      ) : null}
    </>
  );
};

const Sounds: React.FC<{ plan: VideoPlan }> = ({ plan }) => {
  const { audio } = plan.spec;
  const total = plan.durationInFrames;
  const sceneCues = plan.scenes.flatMap((s) => s.cues.map((c) => ({ ...c, at: s.from + c.at })));
  const cues = [...plan.cues, ...sceneCues].filter((c) => c.at < total);
  return (
    <>
      {cues.map((c, i) => (
        <Sequence key={i} from={c.at} durationInFrames={c.duration ?? 45} layout="none" name={`sfx ${c.sfx}`}>
          <Audio src={sfxUrl(c.sfx)} volume={c.volume} loop={Boolean(c.duration && c.duration > 55)} />
        </Sequence>
      ))}
      {audio.music ? (
        <Audio
          src={resolveMedia(audio.music)}
          loop
          volume={(f) =>
            interpolate(f, [0, 12, total - 40, total - 1], [0, audio.musicVolume, audio.musicVolume, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      ) : null}
      {audio.voiceover ? <Audio src={resolveMedia(audio.voiceover)} /> : null}
    </>
  );
};

const SpecError: React.FC<{ issues: string[] }> = ({ issues }) => (
  <AbsoluteFill style={{ backgroundColor: "#1a0b0b", color: "#fff", padding: 80, fontFamily: "sans-serif", gap: 24 }}>
    <div style={{ fontSize: 64, fontWeight: 800, color: "#ff6b6b" }}>Spec has problems</div>
    {issues.slice(0, 12).map((t, i) => (
      <div key={i} style={{ fontSize: 34, lineHeight: 1.3 }}>
        • {t}
      </div>
    ))}
  </AbsoluteFill>
);
