import React, { useLayoutEffect, useRef } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import * as brush from "p5.brush/standalone";

/**
 * Lab: p5.brush (standalone build, WebGL2, no p5) driven by the Remotion frame.
 * Every frame re-seeds the library and redraws from scratch, so the output is a pure function of the frame number
 * (deterministic across chunked renders). Watercolour fills with bleed, pencil strokes and hatching.
 *
 * Proof for the "painted surface in code" route: brush fills and hatch over masks instead of a line screen.
 */
export const BRUSH_TEST_FRAMES = 48;

export const BrushTest: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const f = useCurrentFrame();
  const { width: W, height: H } = useVideoConfig();
  useLayoutEffect(() => {
    const c = ref.current;
    if (!c) return;
    brush.load(c);
    brush.scaleBrushes(5);
    brush.angleMode(brush.DEGREES);
    brush.seed(11);
    brush.noiseSeed(11);
    brush.clear("#ece7d8");
    brush.push();
    brush.translate(-W / 2, -H / 2);
    const t = Math.min(1, f / 36);
    // a watercolour disc that grows, with bleed and texture
    brush.noStroke();
    brush.fill("#4f9792", 95);
    brush.fillBleed(0.35, "out", 20);
    brush.fillTexture(0.6, 0.45);
    brush.circle(W * 0.36, H * 0.52, 120 + 420 * t);
    // a hatched parcel: pencil outline + 45 deg hatch, drawn on as the frame advances
    brush.noFill();
    brush.set("HB", "#3a3a3e", 1.2);
    brush.hatch(9, 45, { rand: 0.08, continuous: false, gradient: 0.2 });
    brush.hatchStyle("HB", "#2d3a4a", 0.9);
    const bw = 380 + 60 * t, bh = 260 + 40 * t;
    brush.rect(W * 0.62 - bw / 2, H * 0.55 - bh / 2, bw, bh);
    brush.noHatch();
    // free pencil strokes with pressure (the pen of the opening)
    brush.set("2B", "#2b2b2f", 1.4);
    for (let i = 0; i < 5; i++) {
      const y = H * 0.2 + i * 26;
      brush.line(W * 0.08, y, W * 0.08 + (0.3 + 0.1 * i) * W * t, y + 8 * Math.sin(i + f * 0.05));
    }
    brush.pop();
    brush.render();
  }, [f, W, H]);
  return (
    <AbsoluteFill style={{ background: "#ece7d8" }}>
      <canvas ref={ref} width={W} height={H} style={{ position: "absolute", inset: 0, width: W, height: H }} />
    </AbsoluteFill>
  );
};
