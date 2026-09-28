import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Caret, MaskWords, Orbits, Scene, typed } from "../components";
import { C, F, ease, enter, mix, ramp, sec, shadow } from "../theme";

const platforms = ["Claude Platform", "Amazon Web Services", "Google Cloud", "Microsoft Azure"];

export const Availability: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const codeIn = ramp(frame, sec(1.4), sec(0.9), ease.soft);
  const model = typed(frame, '"claude-opus-5-5"', sec(2.0), sec(0.7));
  return (
    <Scene duration={duration}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <MaskWords
          words={["Available", { t: "today.", style: { fontStyle: "italic", color: C.clay } }]}
          start={sec(0.1)}
          style={{ fontFamily: F.serif, fontSize: 150, lineHeight: 1, color: C.ink }}
        />
        <div style={{ display: "flex", gap: 16, marginTop: 50 }}>
          {platforms.map((p, i) => {
            const at = sec(0.5) + i * sec(0.09);
            const pop = ramp(frame, at, sec(0.7), ease.back);
            return (
              <div
                key={p}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "16px 26px",
                  borderRadius: 999,
                  border: `1px solid ${C.line}`,
                  backgroundColor: C.white,
                  fontFamily: F.sans,
                  fontWeight: 500,
                  fontSize: 25,
                  color: C.ink,
                  opacity: ramp(frame, at, sec(0.35)),
                  scale: String(mix(pop, 0.85, 1)),
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: C.clay }} />
                {p}
              </div>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 50,
            width: 760,
            borderRadius: 18,
            backgroundColor: C.ink,
            boxShadow: shadow,
            padding: "26px 34px",
            fontFamily: F.mono,
            fontSize: 22,
            lineHeight: "36px",
            color: "#E8E6DC",
            whiteSpace: "pre",
            opacity: codeIn,
            translate: `0px ${mix(codeIn, 40, 0)}px`,
          }}
        >
          <div>
            <span style={{ color: C.mid }}>client.messages.</span>create({"{"}
          </div>
          <div>
            {"  "}model: <span style={{ color: "#E5A488" }}>{model}</span>
            {frame < sec(3.0) && frame > sec(1.8) ? <Caret h={24} /> : null},
          </div>
          <div style={{ color: C.mid }}>{"  "}...</div>
          <div>{"})"}</div>
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
      <Orbits start={0} opacity={0.9} scale={mix(ramp(frame, 0, duration, ease.out), 0.92, 1)} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <MaskWords
          start={sec(0.3)}
          stagger={sec(0.1)}
          style={{ fontFamily: F.serif, fontSize: 180, lineHeight: 1, color: C.ink }}
          words={["Claude", "Opus", { t: "5.5", style: { fontStyle: "italic", color: C.clay } }]}
        />
        <div style={{ width: 640 * line, height: 2, backgroundColor: C.clay, marginTop: 44 }} />
        <div style={{ fontFamily: F.sans, fontWeight: 500, fontSize: 34, color: C.ink, marginTop: 40, ...enter(frame, sec(1.4)) }}>
          Hand it the hard work.
        </div>
        <div style={{ fontFamily: F.sans, fontSize: 26, color: C.muted, marginTop: 14, ...enter(frame, sec(1.7)) }}>
          Sonnet 5.5 and Haiku 5.5 follow in the coming weeks.
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 50 }}>
        <div
          style={{
            fontFamily: F.sans,
            fontWeight: 500,
            fontSize: 15,
            letterSpacing: "0.14em",
            color: C.mid,
            ...enter(frame, sec(2.2), { dist: 6, blur: 4 }),
          }}
        >
          UNOFFICIAL MOTION STUDY · FIGURES FROM ANTHROPIC&apos;S 22 SEP 2026 ANNOUNCEMENT · UI IS ILLUSTRATIVE
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
