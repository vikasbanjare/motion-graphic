import { Player, type PlayerRef } from "@remotion/player";
import { useEffect, useMemo, useRef, useState } from "react";
import { Video } from "../../src/engine/Video.tsx";
import { planVideo } from "../../src/engine/plan.ts";
import { FORMATS } from "../../src/engine/formats.ts";
import { videoSchema, type VideoSpec } from "../../src/engine/schema.ts";

/** planVideo throws on specs the schema rejects; the preview keeps the last good one. */
const usePlanned = (spec: VideoSpec) => {
  const last = useRef<{ spec: VideoSpec; frames: number; w: number; h: number } | null>(null);
  return useMemo(() => {
    const parsed = videoSchema.safeParse(spec);
    if (parsed.success) {
      try {
        const plan = planVideo(parsed.data);
        const f = FORMATS[plan.spec.format];
        last.current = { spec: parsed.data, frames: plan.durationInFrames, w: f.width, h: f.height };
        return { ...last.current, stale: false };
      } catch {
        /* fall through to the last good spec */
      }
    }
    return last.current ? { ...last.current, stale: true } : null;
  }, [spec]);
};

/** The big live preview: the real engine, playing in the browser. Nothing is rendered to disk. */
export const Preview: React.FC<{ spec: VideoSpec; seekTo?: number | null; maxHeight?: number }> = ({ spec, seekTo, maxHeight = 640 }) => {
  const planned = usePlanned(spec);
  const ref = useRef<PlayerRef>(null);
  useEffect(() => {
    if (seekTo !== null && seekTo !== undefined) ref.current?.seekTo(Math.round(seekTo * 30));
  }, [seekTo]);
  if (!planned) return <div className="preview-empty">Fix the storyboard to see a preview.</div>;
  const scale = Math.min(maxHeight / planned.h, 420 / planned.w, 1);
  return (
    <div className="preview">
      <Player
        ref={ref}
        component={Video}
        inputProps={planned.spec}
        durationInFrames={planned.frames}
        fps={30}
        compositionWidth={planned.w}
        compositionHeight={planned.h}
        style={{ width: planned.w * scale, height: planned.h * scale, borderRadius: 12, overflow: "hidden" }}
        controls
        loop
        acknowledgeRemotionLicense
      />
      {planned.stale ? <div className="stale">Showing the last valid version: the storyboard has an error.</div> : null}
    </div>
  );
};

/**
 * A small looping sample used in the style galleries. Plays only while hovered
 * (or when `playing`), so a page of tiles stays light.
 */
export const MiniPreview: React.FC<{ spec: VideoSpec; width?: number; playing?: boolean }> = ({ spec, width = 150, playing }) => {
  const planned = usePlanned(spec);
  const ref = useRef<PlayerRef>(null);
  const [hover, setHover] = useState(false);
  const on = playing || hover;
  useEffect(() => {
    if (!ref.current) return;
    if (on) ref.current.play();
    else {
      ref.current.pause();
      ref.current.seekTo(Math.min(45, (planned?.frames ?? 1) - 1));
    }
  }, [on, planned?.frames]);
  if (!planned) return null;
  const h = (planned.h / planned.w) * width;
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ width, height: h }}>
      <Player
        ref={ref}
        component={Video}
        inputProps={planned.spec}
        durationInFrames={planned.frames}
        fps={30}
        compositionWidth={planned.w}
        compositionHeight={planned.h}
        style={{ width, height: h, borderRadius: 8, overflow: "hidden", pointerEvents: "none" }}
        initialFrame={Math.min(45, planned.frames - 1)}
        loop
        initiallyMuted
        acknowledgeRemotionLicense
      />
    </div>
  );
};
