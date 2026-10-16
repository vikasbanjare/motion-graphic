import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { LookCtx, mix } from "../../../ensemble/look.ts";
import { Paper, Pen, type Stroke } from "../../../ensemble/layers.tsx";
import { Field } from "../../../ensemble/paint2d.tsx";
import { expoOut, ramp } from "../../../ensemble/score.ts";
import type { Pt } from "../../../ensemble/paths.ts";
import { LOOKS, T } from "./looks.ts";

/**
 * 0-86: the opening, rebuilt from the reference measurements.
 *   0-22  one pen line (perfect-freehand, pressure swell) draws across and trucks
 *   22-40 scale-step cut: five lines at 32 px pitch
 *   40-86 the full line field (canvas, simplex-noise amplitude), ragged edge growing in from the left,
 *         ink graded grey -> teal (culori, OKLab) as the wash arrives
 */
const W = 1920, H = 1080;
const wave = (y: number, lam: number, amp: number, phase: number): Pt[] => Array.from({ length: 140 }, (_, i) => {
  const x = -120 + (i / 139) * (W + 240);
  return [x, y + amp * Math.sin(((x + phase) / lam) * Math.PI * 2)];
});

export const Opening: React.FC = () => {
  const f = useCurrentFrame();
  const look = LOOKS.open;
  const ink = mix(look.ink, LOOKS.parcel.inkSoft, ramp(f, T.wash - 6, T.wash + 14));
  let strokes: Stroke[] = [];
  if (f < T.stepB) {
    const d = expoOut(Math.min(1, f / 14));
    strokes = [{ pts: wave(H / 2, 460, 16, f * 5.8), t1: d, size: 1.25, color: ink, taper: 60 }];
  } else if (f < T.stepC) {
    const g = f - T.stepB;
    strokes = Array.from({ length: 5 }, (_, i) => ({ pts: wave(H / 2 + (i - 2) * 32, 460, 16, f * 5.8), t1: expoOut(Math.min(1, (g + 2 - i) / 8)), size: 1.05, color: ink, taper: 60 }));
  }
  const fieldIn = f >= T.stepC;
  return (
    <LookCtx.Provider value={look}>
      <AbsoluteFill>
        <Paper />
        {strokes.length ? <Pen strokes={strokes} f={f} /> : null}
        {fieldIn ? (
          <Field
            f={f}
            pitch={25.5}
            lambda={105}
            amp={6 + 10 * (1 - ramp(f, T.stepC, T.stepC + 10))}
            speed={5.8}
            width={2.6}
            color={ink}
            angle={-4}
            reveal={0.35 + 0.65 * expoOut(Math.min(1, (f - T.stepC) / 22))}
            ragged={120}
          />
        ) : null}
      </AbsoluteFill>
    </LookCtx.Provider>
  );
};
