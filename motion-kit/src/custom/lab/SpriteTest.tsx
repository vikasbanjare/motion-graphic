import React, { useLayoutEffect, useRef } from "react";
import { AbsoluteFill, continueRender, delayRender } from "remotion";
import * as brush from "p5.brush/standalone";

/** Lab: does p5.brush paint onto a transparent canvas (clear() with no colour), so a sprite can be composited normally? */
export const SpriteTest: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    const h = delayRender("sprite");
    const off = document.createElement("canvas");
    off.width = 1920;
    off.height = 1080;
    brush.load(off);
    brush.clear();
    brush.push();
    brush.translate(-960, -540);
    brush.noStroke();
    brush.fill("#f1ede2", 255);
    brush.fillTexture(0, 0);
    brush.fillBleed(0, "out");
    brush.circle(700, 540, 300);
    brush.fill("#4f9792", 160);
    brush.fillTexture(0.55, 0.4);
    brush.fillBleed(0.03, "out");
    brush.circle(700, 540, 300);
    brush.pop();
    brush.render();
    const x = ref.current!.getContext("2d")!;
    x.drawImage(off, 0, 0);
    continueRender(h);
  }, []);
  return (
    <AbsoluteFill style={{ background: "repeating-linear-gradient(90deg,#d33 0 40px,#33d 40px 80px)" }}>
      <canvas ref={ref} width={1920} height={1080} style={{ position: "absolute", inset: 0 }} />
    </AbsoluteFill>
  );
};
