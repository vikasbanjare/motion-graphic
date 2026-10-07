import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { useEnv } from "./context.ts";
import { fitText } from "./fit.ts";
import { prog, rise } from "./motion.ts";
import { richWords } from "./rich.ts";

/**
 * Wraps every scene: optional full-colour background, a slow camera push-in so
 * held frames stay alive, and a content area that respects platform safe zones.
 */
export const Stage: React.FC<{
  children: React.ReactNode;
  align?: "center" | "start" | "end";
  gap?: number;
  /** Disable the camera drift (e.g. image scenes that move on their own). */
  still?: boolean;
}> = ({ children, align = "center", gap = 40, still }) => {
  const frame = useCurrentFrame();
  const { scene, format, c, u } = useEnv();
  const push = still
    ? 1
    : interpolate(frame, [0, scene.duration], [1, 1.035], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fill = scene.scene.bg && scene.scene.bg !== "default";
  return (
    <AbsoluteFill>
      {fill ? <AbsoluteFill style={{ backgroundColor: c.bg }} /> : null}
      <AbsoluteFill
        style={{
          transform: `scale(${push.toFixed(5)})`,
          paddingTop: format.safe.top,
          paddingBottom: format.safe.bottom,
          paddingLeft: format.safe.left,
          paddingRight: format.safe.right,
          display: "flex",
          flexDirection: "column",
          justifyContent: align === "center" ? "center" : align === "start" ? "flex-start" : "flex-end",
          alignItems: "center",
          gap: gap * u,
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Small uppercase label above a headline. */
export const Kicker: React.FC<{ text: string; start: number; color?: string; pill?: boolean }> = ({
  text,
  start,
  color,
  pill: pillProp,
}) => {
  const frame = useCurrentFrame();
  const { theme, m, u, c, box } = useEnv();
  const pill = pillProp ?? theme.kicker === "pill";
  const line = prog(frame, start + 4, 14);
  const size = useMemo(
    () =>
      fitText({
        words: richWords(text),
        fontFamily: theme.fonts.body,
        fontWeight: theme.fonts.bodyStrongWeight,
        tracking: 0.16,
        upper: true,
        maxWidth: box.width - (pill ? 120 * u : 0),
        maxHeight: 100 * u,
        maxSize: 38 * u,
        minSize: 28 * u,
        maxLines: 1,
        lineHeight: 1.2,
      }).fontSize,
    [text, theme, box.width, pill, u],
  );
  return (
    <div
      style={{
        ...rise(frame, start, m, u, 0.5),
        fontFamily: theme.fonts.body,
        fontWeight: theme.fonts.bodyStrongWeight,
        fontSize: size,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: color ?? c.accent,
        padding: pill ? `${0.42 * size}px ${1.0 * size}px` : 0,
        borderRadius: 999,
        border: pill ? `${2 * u}px solid ${c.line}` : undefined,
        background: pill ? c.surface : undefined,
        display: "flex",
        alignItems: "center",
        gap: 0.45 * size,
        whiteSpace: "nowrap",
      }}
    >
      {pill ? (
        <span
          style={{
            width: 0.4 * size,
            height: 0.4 * size,
            borderRadius: 99,
            background: color ?? c.accent,
            transform: `scale(${line.toFixed(3)})`,
          }}
        />
      ) : null}
      {text}
    </div>
  );
};

/** QA overlay: tints the platform-UI zones so previews show what will be covered. */
export const SafeZoneOverlay: React.FC<{ format: { width: number; height: number; safe: { top: number; bottom: number; left: number; right: number } } }> = ({ format }) => {
  const { width: W, height: H, safe } = format;
  const tint = "rgba(255, 45, 85, 0.22)";
  const r = (left: number, top: number, width: number, height: number) => (
    <div style={{ position: "absolute", left, top, width, height, background: tint }} />
  );
  return (
    <AbsoluteFill>
      {r(0, 0, W, safe.top)}
      {r(0, H - safe.bottom, W, safe.bottom)}
      {r(0, safe.top, safe.left, H - safe.top - safe.bottom)}
      {r(W - safe.right, safe.top, safe.right, H - safe.top - safe.bottom)}
      <div style={{ position: "absolute", left: safe.left, top: safe.top, width: W - safe.left - safe.right, height: H - safe.top - safe.bottom, outline: "3px dashed rgba(255,45,85,0.8)" }} />
    </AbsoluteFill>
  );
};
