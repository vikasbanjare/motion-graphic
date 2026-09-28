import { AbsoluteFill, Interactive, useCurrentFrame } from "remotion";
import { Background } from "../Background";
import { C, body, display, pop, progress, rise } from "../theme";

const prompt = "30 sec ka reel banao — AI tools pe, Hinglish mein, strong hook ke saath";

const steps = [
  { n: "1", t: "Idea Hinglish mein likho" },
  { n: "2", t: "Claude hook + script + animation banata hai" },
  { n: "3", t: "Ek command → MP4 ready ✅" },
];

export const Steps: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = Math.floor(prompt.length * progress(frame, 8, 55));
  const cursor = Math.floor(frame / 8) % 2 === 0;
  return (
    <AbsoluteFill style={{ fontFamily: body, color: C.white }}>
      <Background />
      <AbsoluteFill style={{ justifyContent: "center", padding: "100px 90px", gap: 40 }}>
        <Interactive.Div name="Title" style={{ fontFamily: display, fontSize: 130, lineHeight: 1, ...rise(frame, 0) }}>
          KAISE? <span style={{ color: C.saffron }}>3 STEPS</span>
        </Interactive.Div>
        <Interactive.Div
          name="Prompt"
          style={{
            backgroundColor: C.bg2, border: `3px solid ${C.claude}`, borderRadius: 36, padding: "36px 44px",
            fontSize: 46, fontWeight: 500, lineHeight: 1.35, minHeight: 250, ...rise(frame, 4),
          }}
        >
          <div style={{ fontSize: 34, fontWeight: 700, color: C.claude, marginBottom: 12 }}>You → Claude</div>
          {prompt.slice(0, typed)}
          <span style={{ opacity: cursor ? 1 : 0, color: C.claude }}>▍</span>
        </Interactive.Div>
        {steps.map((s, i) => (
          <Interactive.Div key={s.n} name={`Step ${s.n}`} style={{ display: "flex", alignItems: "center", gap: 36, ...rise(frame, 70 + i * 22, 90) }}>
            <div
              style={{
                flexShrink: 0, width: 120, height: 120, borderRadius: 60, backgroundColor: i === 2 ? C.green : C.saffron,
                color: C.bg, display: "flex", justifyContent: "center", alignItems: "center",
                fontFamily: display, fontSize: 72, ...pop(frame, 70 + i * 22),
              }}
            >
              {s.n}
            </div>
            <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.2 }}>{s.t}</div>
          </Interactive.Div>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
