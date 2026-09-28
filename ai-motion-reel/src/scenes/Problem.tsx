import { AbsoluteFill, Interactive, useCurrentFrame } from "remotion";
import { Background } from "../Background";
import { C, body, display, rise } from "../theme";

const rows = [
  { who: "Agency", what: "2 hafte ⏳", color: C.muted },
  { who: "Freelancer", what: "₹15k+ 💸", color: C.muted },
];

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: body, color: C.white }}>
      <Background />
      <AbsoluteFill style={{ justifyContent: "center", padding: "100px 90px", gap: 44 }}>
        {rows.map((r, i) => (
          <Interactive.Div
            key={r.who}
            name={r.who}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              backgroundColor: C.bg2, border: "2px solid #26314d", borderRadius: 32, padding: "44px 50px",
              ...rise(frame, 4 + i * 14, 120),
            }}
          >
            <span style={{ fontSize: 58, fontWeight: 700, color: r.color }}>{r.who}</span>
            <span style={{ fontSize: 66, fontWeight: 800 }}>{r.what}</span>
          </Interactive.Div>
        ))}
        <Interactive.Div name="Punch" style={{ marginTop: 60, fontSize: 76, fontWeight: 800, lineHeight: 1.2, ...rise(frame, 40, 80) }}>
          Aur aapko reel chahiye…
        </Interactive.Div>
        <Interactive.Div name="Kal" style={{ fontFamily: display, fontSize: 220, color: C.saffron, lineHeight: 1, ...rise(frame, 56, 120) }}>
          KAL. 😩
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
