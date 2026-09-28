import { AbsoluteFill, Interactive, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../Background";
import { C, body, display, pop, rise } from "../theme";

const beats = ["Aap bolo.", "Claude code likhta hai.", "Video ban jaata hai. 🎬"];

export const Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [0, 30, 60], [0, 1, 0.6], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ fontFamily: body, color: C.white }}>
      <Background />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 100, gap: 26 }}>
        <Interactive.Div name="Solution" style={{ fontSize: 50, fontWeight: 700, color: C.muted, letterSpacing: 8, ...rise(frame, 0) }}>
          SOLUTION
        </Interactive.Div>
        <Interactive.Div
          name="Claude"
          style={{ fontFamily: display, fontSize: 250, lineHeight: 1, color: C.claude, textShadow: `0 0 ${80 * glow}px ${C.claude}`, ...pop(frame, 6) }}
        >
          CLAUDE
        </Interactive.Div>
        <Interactive.Div name="Plus" style={{ fontSize: 84, fontWeight: 800, ...pop(frame, 18) }}>
          + Remotion
        </Interactive.Div>
        <div style={{ marginTop: 70, display: "flex", flexDirection: "column", gap: 22, alignItems: "center" }}>
          {beats.map((b, i) => (
            <Interactive.Div key={b} name={`Beat ${i + 1}`} style={{ fontSize: 58, fontWeight: 700, textAlign: "center", ...rise(frame, 40 + i * 16) }}>
              {b}
            </Interactive.Div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
