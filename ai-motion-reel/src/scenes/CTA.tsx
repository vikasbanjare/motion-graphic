import { AbsoluteFill, Interactive, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../Background";
import { C, body, display, pop, rise } from "../theme";

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(Math.max(0, frame - 20) / 4) * 0.04;
  return (
    <AbsoluteFill style={{ fontFamily: body, color: C.white }}>
      <Background />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 100, gap: 40, textAlign: "center" }}>
        <Interactive.Div name="Comment" style={{ fontSize: 76, fontWeight: 800, ...rise(frame, 0) }}>
          Comment karo 👇
        </Interactive.Div>
        <Interactive.Div
          name="Keyword"
          style={{
            fontFamily: display, fontSize: 220, lineHeight: 1, color: C.bg, backgroundColor: C.saffron,
            padding: "20px 70px", borderRadius: 36, ...pop(frame, 8),
            scale: frame > 20 ? pulse : interpolate(frame, [8, 20], [0.4, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          VIDEO
        </Interactive.Div>
        <Interactive.Div name="DM" style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.3, ...rise(frame, 22) }}>
          Poora prompt DM mein bhejunga 🚀
        </Interactive.Div>
        <Interactive.Div name="Save" style={{ marginTop: 40, fontSize: 52, fontWeight: 700, color: C.green, ...rise(frame, 36) }}>
          🔖 Save kar lo — kaam aayega
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
