import React, { useLayoutEffect, useRef } from "react";
import { AbsoluteFill, continueRender, delayRender, useVideoConfig } from "remotion";
import * as brush from "p5.brush/standalone";
import { useLook } from "./look.ts";
import { noise2 } from "./rng.ts";
import type { Ring } from "./paths.ts";

/**
 * Canvas layers of the ensemble.
 *   Wash   p5.brush watercolour fills, hatching and pencil on any rings (not tied to a 3D scene)
 *   Field  the engraved line field: rows of waves with simplex-noise amplitude, drawn on row by row
 */

export type WashShape = {
  ring: Ring;
  color: string;
  opacity?: number; // 0..255
  bleed?: number;
  texture?: number;
  pencil?: { color?: string; weight?: number; brush?: string };
  hatch?: { gap: number; angle: number; color?: string; weight?: number };
};

let scaled = false;

/** p5.brush is one global instance: each Wash loads its own canvas, paints, and renders before the next layer runs. */
export const Wash: React.FC<{ shapes: WashShape[]; seed?: number; style?: React.CSSProperties }> = ({ shapes, seed = 1, style }) => {
  const look = useLook();
  const { width: W, height: H } = useVideoConfig();
  const ref = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    const c = ref.current;
    if (!c) return;
    const h = delayRender("wash");
    brush.load(c);
    if (!scaled) {
      brush.scaleBrushes(5);
      scaled = true;
    }
    brush.angleMode(brush.DEGREES);
    brush.clear("#ffffff");
    brush.push();
    brush.translate(-W / 2, -H / 2);
    shapes.forEach((s, i) => {
      brush.seed(seed * 1009 + i * 97);
      brush.noiseSeed(seed * 31 + i * 7);
      brush.noStroke();
      brush.noHatch();
      brush.fill(s.color, s.opacity ?? 140);
      brush.fillTexture(s.texture ?? 0.55, 0.4);
      brush.fillBleed(s.bleed ?? 0.06, "out");
      if (s.hatch) {
        brush.hatch(s.hatch.gap, s.hatch.angle, { rand: 0.06, continuous: false, gradient: 0.3 });
        brush.hatchStyle("HB", s.hatch.color ?? look.ink, s.hatch.weight ?? 0.8);
      }
      brush.polygon(s.ring);
      brush.noHatch();
      if (s.pencil) {
        brush.noFill();
        brush.set(s.pencil.brush ?? "HB", s.pencil.color ?? look.ink, s.pencil.weight ?? 1);
        brush.polygon(s.ring);
      }
    });
    brush.pop();
    brush.render();
    continueRender(h);
  }, [shapes, seed, W, H, look.ink]);
  return (
    <AbsoluteFill style={{ mixBlendMode: "multiply", ...style }}>
      <canvas ref={ref} width={W} height={H} style={{ position: "absolute", inset: 0, width: W, height: H }} />
    </AbsoluteFill>
  );
};

export type FieldProps = {
  f: number;
  pitch: number; // px between rows
  lambda: number; // wavelength px
  amp: number; // amplitude px
  speed?: number; // px per frame the waves travel
  width?: number; // line width px
  color?: string;
  angle?: number; // degrees
  rows?: [number, number]; // y range drawn (px, before rotation)
  reveal?: number; // 0..1 draw-on left to right
  ragged?: number; // px of noise on the right edge of the reveal
  noiseAmp?: number; // 0..1 of amp modulated by noise
  clip?: Ring; // only inside this ring
  opacity?: number;
  style?: React.CSSProperties;
};

export const Field: React.FC<FieldProps> = ({ f, pitch, lambda, amp, speed = 3, width = 2, color, angle = 0, rows, reveal = 1, ragged = 0, noiseAmp = 0.35, clip, opacity = 1, style }) => {
  const look = useLook();
  const { width: W, height: H } = useVideoConfig();
  const ref = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    const x = ref.current?.getContext("2d");
    if (!x) return;
    x.clearRect(0, 0, W, H);
    x.save();
    if (clip && clip.length > 2) {
      x.beginPath();
      clip.forEach(([px, py], i) => (i ? x.lineTo(px, py) : x.moveTo(px, py)));
      x.closePath();
      x.clip();
    }
    x.translate(W / 2, H / 2);
    x.rotate((angle * Math.PI) / 180);
    x.translate(-W / 2, -H / 2);
    x.strokeStyle = color ?? look.ink;
    x.lineWidth = width;
    x.lineCap = "round";
    x.globalAlpha = opacity;
    const nz = noise2(look.seed + 17);
    const span = Math.hypot(W, H);
    const [y0, y1] = rows ?? [(H - span) / 2, (H + span) / 2];
    const xs = (W - span) / 2, xe = (W + span) / 2;
    for (let y = y0; y <= y1; y += pitch) {
      const edge = xs + (xe - xs) * reveal + ragged * nz(y * 0.01, 3.1);
      if (edge <= xs) continue;
      x.beginPath();
      for (let px = xs; px <= Math.min(xe, edge); px += 6) {
        const a = amp * (1 - noiseAmp + noiseAmp * (0.5 + 0.5 * nz(px * 0.0015, y * 0.004 + f * 0.01)));
        const py = y + a * Math.sin(((px - f * speed) / lambda) * Math.PI * 2);
        if (px === xs) x.moveTo(px, py);
        else x.lineTo(px, py);
      }
      x.stroke();
    }
    x.restore();
  });
  return (
    <AbsoluteFill style={style}>
      <canvas ref={ref} width={W} height={H} style={{ position: "absolute", inset: 0, width: W, height: H }} />
    </AbsoluteFill>
  );
};
