import { AbsoluteFill, useCurrentFrame } from "remotion";
import { MaskWords, Orbits, Scene } from "../components";
import { C, F, ease, enter, mix, ramp, sec } from "../theme";

const platforms = ["Claude Platform", "Amazon Web Services", "Google Cloud", "Microsoft Azure"];

export const Availability: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  return (
    <Scene duration={duration}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <MaskWords
          words={["Available", { t: "today.", style: { fontStyle: "italic" } }]}
          start={sec(0.15)}
          style={{ fontFamily: F.serif, fontSize: 160, lineHeight: 1, color: C.ivory }}
        />
        <div style={{ fontFamily: F.sans, fontSize: 34, color: C.muted, marginTop: 30, ...enter(frame, sec(0.6)) }}>
          On the platforms you already build on.
        </div>
        <div style={{ display: "flex", gap: 22, marginTop: 70 }}>
          {platforms.map((p, i) => {
            const at = sec(0.9) + i * sec(0.12);
            const pop = ramp(frame, at, sec(0.7), ease.back);
            return (
              <div
                key={p}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "20px 32px",
                  borderRadius: 999,
                  border: `1.5px solid ${C.ivory}2A`,
                  backgroundColor: "#ffffff08",
                  fontFamily: F.sans,
                  fontWeight: 500,
                  fontSize: 30,
                  color: C.ivory,
                  opacity: ramp(frame, at, sec(0.35)),
                  scale: String(mix(pop, 0.86, 1)),
                  filter: `blur(${mix(ramp(frame, at, sec(0.5)), 8, 0)}px)`,
                }}
              >
                <span style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: C.coral }} />
                {p}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const EndCard: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const line = ramp(frame, sec(1.1), sec(1.0), ease.inOut);
  return (
    <Scene duration={duration}>
      <Orbits start={0} opacity={0.75} scale={mix(ramp(frame, 0, duration, ease.out), 0.92, 1)} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <MaskWords
          start={sec(0.3)}
          stagger={sec(0.1)}
          style={{ fontFamily: F.serif, fontSize: 170, lineHeight: 1, color: C.ivory }}
          words={["Claude", "Opus", { t: "5.5", style: { fontStyle: "italic", color: C.coral } }]}
        />
        <div style={{ width: 640 * line, height: 1.5, backgroundColor: C.coral, marginTop: 44, opacity: 0.8 }} />
        <div style={{ fontFamily: F.sans, fontSize: 32, color: C.ivory, marginTop: 40, ...enter(frame, sec(1.4)) }}>
          Available now.
        </div>
        <div style={{ fontFamily: F.sans, fontSize: 26, color: C.muted, marginTop: 14, ...enter(frame, sec(1.7)) }}>
          Sonnet 5.5 and Haiku 5.5 follow in the coming weeks.
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 56, opacity: 0.6 }}>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 14,
            letterSpacing: "0.2em",
            color: C.muted,
            ...enter(frame, sec(2.2), { dist: 6, blur: 4 }),
          }}
        >
          UNOFFICIAL MOTION STUDY · FIGURES FROM ANTHROPIC&apos;S 22 SEP 2026 ANNOUNCEMENT
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
