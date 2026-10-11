import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { FPS, type Format } from "./formats.ts";
import { luminance, type Theme } from "./themes.ts";

/**
 * One continuous background for the whole video. Scenes are transparent and
 * transitions move only the foreground, so cuts feel like one camera moving
 * through one world instead of slides being swapped.
 */
let grainUrl = () => staticFile("textures/grain.png");
export const setGrainUrlResolver = (fn: () => string) => {
  grainUrl = fn;
};

const alpha = (hex: string, a: number) =>
  hex + Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, "0");

const Blob: React.FC<{ color: string; size: number; x: number; y: number }> = ({ color, size, x, y }) => (
  <div
    style={{
      position: "absolute",
      width: size,
      height: size,
      left: x - size / 2,
      top: y - size / 2,
      borderRadius: "50%",
      background: `radial-gradient(circle at 50% 50%, ${color} 0%, ${alpha(color.slice(0, 7), 0)} 68%)`,
    }}
  />
);

const Grid: React.FC<{ color: string; cell: number; offset: number; opacity: number }> = ({ color, cell, offset, opacity }) => (
  <AbsoluteFill
    style={{
      opacity,
      backgroundImage: `linear-gradient(${color} 2px, transparent 2px), linear-gradient(90deg, ${color} 2px, transparent 2px)`,
      backgroundSize: `${cell}px ${cell}px`,
      backgroundPosition: `0px ${offset % cell}px`,
    }}
  />
);

const Vignette: React.FC<{ color: string; strength: number }> = ({ color, strength }) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse 75% 65% at 50% 45%, ${alpha(color, 0)} 40%, ${alpha(color, strength)} 100%)`,
    }}
  />
);

/**
 * Film grain as tiled <Img> elements (Remotion waits for them to load, so no
 * flicker). The pattern drifts slowly instead of re-randomising each frame:
 * it keeps the filmic texture while encoders can track it, so files stay ~5x
 * smaller than with per-frame noise.
 */
export const Grain: React.FC<{ opacity: number; width: number; height: number }> = ({ opacity, width, height }) => {
  const frame = useCurrentFrame();
  const TILE = 256;
  const cols = Math.ceil(width / TILE) + 1;
  const rows = Math.ceil(height / TILE) + 1;
  const dx = -((frame * 0.5) % TILE);
  const dy = -((frame * 0.35) % TILE);
  return (
    <AbsoluteFill style={{ opacity, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, transform: `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)` }}>
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, k) => (
            <Img key={`${r}-${k}`} src={grainUrl()} style={{ position: "absolute", left: k * TILE, top: r * TILE, width: TILE, height: TILE }} />
          )),
        )}
      </div>
    </AbsoluteFill>
  );
};

export const Background: React.FC<{ theme: Theme; format: Format }> = ({ theme, format }) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const { width: W, height: H } = format;
  const c = theme.colors;
  const big = Math.max(W, H);
  const dark = theme.background === "aurora" || theme.background === "grid" || theme.background === "plain";

  let layer: React.ReactNode = null;
  switch (theme.background) {
    case "aurora":
      layer = (
        <>
          <Grid color={c.line} cell={Math.round(W / 12)} offset={frame * 0.8} opacity={0.35} />
          <Blob color={alpha(c.accent, 0.42)} size={big * 0.85} x={W * 0.12 + Math.sin(t * 0.5) * W * 0.12} y={H * 0.12 + Math.cos(t * 0.4) * H * 0.06} />
          <Blob color={alpha(c.accent2, 0.3)} size={big * 0.95} x={W * 0.95 + Math.cos(t * 0.35) * W * 0.1} y={H * 0.9 + Math.sin(t * 0.45) * H * 0.05} />
          <Blob color={alpha(c.surface, 0.9)} size={big * 0.7} x={W * 0.5 + Math.sin(t * 0.3) * W * 0.15} y={H * 0.5} />
          <Vignette color={c.bg} strength={0.65} />
        </>
      );
      break;
    case "grid":
      layer = (
        <>
          <Grid color={c.line} cell={Math.round(Math.min(W, H) / 9)} offset={frame * 0.6} opacity={0.75} />
          <Blob color={alpha(c.accent2, 0.22)} size={big * 0.9} x={W * 0.5 + Math.sin(t * 0.4) * W * 0.2} y={H * 0.08} />
          <Blob color={alpha(c.accent, 0.12)} size={big * 0.7} x={W * 0.85} y={H * 0.95 + Math.cos(t * 0.5) * H * 0.04} />
          <Vignette color={c.bg} strength={0.92} />
        </>
      );
      break;
    case "spotlight":
      layer = (
        <>
          <Blob color={alpha("#FFFFFF", 1)} size={big * 1.1} x={W * 0.5 + Math.sin(t * 0.3) * W * 0.08} y={H * 0.18} />
          <Blob color={alpha(c.accent, 0.1)} size={big * 0.9} x={W * 0.15 + Math.sin(t * 0.4) * W * 0.06} y={H * 0.85} />
          <Blob color={alpha(c.accent2, 0.08)} size={big * 0.8} x={W * 0.9} y={H * 0.6 + Math.cos(t * 0.35) * H * 0.05} />
        </>
      );
      break;
    case "paper":
      layer = (
        <>
          <Blob color={alpha("#FFFFFF", 0.65)} size={big * 1.0} x={W * 0.35 + Math.sin(t * 0.25) * W * 0.06} y={H * 0.3} />
          <Blob color={alpha(c.accent, 0.08)} size={big * 0.8} x={W * 0.95} y={H * 0.95} />
          <Vignette color={c.line} strength={0.5} />
        </>
      );
      break;
    case "dots": {
      const cell = Math.round(Math.min(W, H) / 22);
      layer = (
        <>
          <AbsoluteFill
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, ${alpha(c.text, 0.13)} 0, ${alpha(c.text, 0.13)} ${cell * 0.12}px, transparent ${cell * 0.12 + 1}px)`,
              backgroundSize: `${cell}px ${cell}px`,
              backgroundPosition: `${(frame * 0.5) % cell}px ${(frame * 0.5) % cell}px`,
            }}
          />
          <Blob color={alpha("#FFFFFF", 0.5)} size={big * 0.9} x={W * 0.5 + Math.sin(t * 0.4) * W * 0.12} y={H * 0.35} />
        </>
      );
      break;
    }
    case "canvas": {
      // Flat editorial canvas; faint pastel atmosphere drifting at the edges.
      const [o1, o2] = theme.orb;
      const light = luminance(theme.colors.bg) > 0.4;
      const a = light ? 0.32 : 0.14;
      layer = (
        <>
          <Blob color={alpha(o1, a)} size={big * 0.9} x={W * 0.05 + Math.sin(t * 0.18) * W * 0.06} y={H * 0.08 + Math.cos(t * 0.15) * H * 0.03} />
          <Blob color={alpha(o2, a * 0.8)} size={big * 0.85} x={W * 0.98 + Math.cos(t * 0.16) * W * 0.05} y={H * 0.92 + Math.sin(t * 0.2) * H * 0.03} />
          <Blob color={alpha(c.accent2, a * 0.35)} size={big * 0.6} x={W * 0.9} y={H * 0.12 + Math.sin(t * 0.22) * H * 0.02} />
        </>
      );
      break;
    }
    case "plain":
      layer = (
        <>
          <Blob color={alpha(c.surface, 1)} size={big * 1.0} x={W * 0.5 + Math.sin(t * 0.3) * W * 0.1} y={H * 0.4} />
          <Vignette color={c.bg} strength={0.7} />
        </>
      );
      break;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: c.bg, overflow: "hidden" }}>
      {layer}
      {theme.grain ? (
        <Grain width={W} height={H} opacity={theme.background === "canvas" ? 0.22 : dark ? 0.55 : theme.background === "paper" ? 0.9 : 0.4} />
      ) : null}
    </AbsoluteFill>
  );
};
