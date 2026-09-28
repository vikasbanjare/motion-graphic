import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C } from "./theme";

// Slowly drifting glow blobs + grid, shared by every scene.
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          translate: `0px ${(frame * 1.2) % 90}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.saffron}55, transparent 65%)`,
          left: -250 + Math.sin(t * 0.6) * 120,
          top: -200 + Math.cos(t * 0.5) * 100,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.green}40, transparent 65%)`,
          right: -350 + Math.cos(t * 0.4) * 140,
          bottom: -250 + Math.sin(t * 0.7) * 120,
        }}
      />
    </AbsoluteFill>
  );
};
