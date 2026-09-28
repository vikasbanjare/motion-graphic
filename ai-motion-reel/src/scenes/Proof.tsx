import { AbsoluteFill, Interactive, useCurrentFrame } from "remotion";
import { Background } from "../Background";
import { C, body, display, pop, rise } from "../theme";

export const Proof: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: body, color: C.white }}>
      <Background />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 100, gap: 50, textAlign: "center" }}>
        <Interactive.Div name="Eyes" style={{ fontSize: 200, ...pop(frame, 0) }}>👀</Interactive.Div>
        <Interactive.Div name="Line" style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.2, ...rise(frame, 8) }}>
          Yeh video bhi <span style={{ color: C.saffron }}>aise hi</span> bana hai.
        </Interactive.Div>
        <div style={{ display: "flex", gap: 30, marginTop: 30 }}>
          {[
            { big: "100%", small: "code" },
            { big: "0", small: "After Effects" },
          ].map((s, i) => (
            <Interactive.Div
              key={s.small}
              name={s.small}
              style={{ backgroundColor: C.bg2, border: "2px solid #26314d", borderRadius: 32, padding: "36px 44px", minWidth: 360, ...pop(frame, 30 + i * 10) }}
            >
              <div style={{ fontFamily: display, fontSize: 130, lineHeight: 1, color: i === 0 ? C.green : C.saffron }}>{s.big}</div>
              <div style={{ fontSize: 46, fontWeight: 700, color: C.muted }}>{s.small}</div>
            </Interactive.Div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
