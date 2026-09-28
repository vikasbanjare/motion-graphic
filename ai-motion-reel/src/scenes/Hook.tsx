import { AbsoluteFill, Interactive, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../Background";
import { C, body, display, pop, progress, rise } from "../theme";

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const strike = progress(frame, 22, 10);
  const shake = frame > 22 && frame < 34 ? Math.sin(frame * 3) * 8 : 0;
  return (
    <AbsoluteFill style={{ fontFamily: body, color: C.white }}>
      <Background />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 100, gap: 30 }}>
        <Interactive.Div name="Label" style={{ fontSize: 60, fontWeight: 700, color: C.muted, ...rise(frame, 0) }}>
          Agency ka quote:
        </Interactive.Div>
        <Interactive.Div
          name="Price"
          style={{ position: "relative", fontFamily: display, fontSize: 230, color: C.saffron, lineHeight: 1, translate: `${shake}px 0px`, ...pop(frame, 4) }}
        >
          ₹50,000
          <div
            style={{
              position: "absolute", left: -20, top: "52%", height: 22, borderRadius: 11,
              width: `calc(${strike * 100}% + ${strike * 40}px)`, backgroundColor: C.red, rotate: "-6deg",
            }}
          />
        </Interactive.Div>
        <Interactive.Div name="Ab" style={{ marginTop: 80, fontSize: 84, fontWeight: 800, ...rise(frame, 40) }}>
          Ab?
        </Interactive.Div>
        <Interactive.Div
          name="Answer"
          style={{
            fontFamily: display, fontSize: 170, color: C.bg, backgroundColor: C.green,
            padding: "10px 50px", borderRadius: 28, ...pop(frame, 52),
            rotate: `${interpolate(frame, [52, 68], [-8, -2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}deg`,
          }}
        >
          EK PROMPT.
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
