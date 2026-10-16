import React from "react";
import { AbsoluteFill, Freeze, type CalculateMetadataFunction } from "remotion";
import { FORMATS } from "./formats.ts";
import { planVideo, settledFrame } from "./plan.ts";
import { videoSchema, type VideoSpec } from "./schema.ts";
import { Video, withTimings } from "./Video.tsx";

/**
 * One still with a frozen frame per scene (plus the opening frame) at the
 * moment everything has landed, safe zones tinted. Reviewing this takes
 * seconds and catches almost every problem a full render would.
 */
export type SheetProps = { spec: VideoSpec; qa?: boolean };

const THUMB = 360;
const GAP = 24;
const LABEL = 54;

export const sheetFrames = (spec: VideoSpec) => {
  const plan = planVideo(spec);
  const shots = [{ frame: 0, label: "0.0s · first frame" }];
  plan.scenes.forEach((s, i) => {
    const settled = settledFrame(plan, i);
    shots.push({ frame: settled, label: `${(settled / 30).toFixed(1)}s · ${i + 1}. ${s.scene.type}` });
  });
  return { plan, shots };
};

const layout = (spec: VideoSpec) => {
  const f = FORMATS[spec.format ?? "reel"];
  const scale = THUMB / Math.min(f.width, f.height) / (f.width > f.height ? 0.75 : 1);
  const w = Math.round(f.width * scale);
  const h = Math.round(f.height * scale);
  const { shots } = sheetFrames(spec);
  const cols = Math.min(shots.length, f.width > f.height ? 3 : 5);
  const rows = Math.ceil(shots.length / cols);
  return { f, scale, w, h, cols, rows, shots };
};

export const calculateSheetMetadata: CalculateMetadataFunction<SheetProps> = async ({ props, abortSignal }) => {
  const parsed = videoSchema.safeParse(props.spec);
  if (!parsed.success) return { width: 1080, height: 1080, durationInFrames: 1, fps: 30 };
  const spec = await withTimings(parsed.data, abortSignal);
  const { w, h, cols, rows } = layout(spec);
  return {
    width: GAP + cols * (w + GAP),
    height: GAP + rows * (h + LABEL + GAP),
    // Frozen frames are clamped to the composition length, so match the video.
    durationInFrames: planVideo(spec).durationInFrames,
    fps: 30,
    props: { ...props, spec },
  };
};

export const ContactSheet: React.FC<SheetProps> = ({ spec, qa = true }) => {
  const parsed = videoSchema.safeParse(spec);
  if (!parsed.success) return <Video {...spec} />;
  const { f, scale, w, h, cols, shots } = layout(parsed.data);
  return (
    <AbsoluteFill style={{ backgroundColor: "#111214", fontFamily: "Inter, sans-serif" }}>
      {shots.map((s, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        return (
          <div key={i} style={{ position: "absolute", left: GAP + col * (w + GAP), top: GAP + row * (h + LABEL + GAP), width: w }}>
            <div style={{ color: "#E5E7EB", fontSize: 26, fontWeight: 600, height: LABEL, lineHeight: `${LABEL - 12}px` }}>{s.label}</div>
            <div style={{ position: "relative", width: w, height: h, overflow: "hidden", borderRadius: 10, outline: "1px solid #2a2d33" }}>
              <div style={{ position: "absolute", width: f.width, height: f.height, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
                <Freeze frame={s.frame}>
                  <Video {...parsed.data} _qa={qa} _probe={false} _silent />
                </Freeze>
              </div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
