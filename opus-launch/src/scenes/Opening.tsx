import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Eyebrow, MaskWords, Orbits, Scene } from "../components";
import { C, F, ease, enter, mix, ramp, sec } from "../theme";

// Cold open: three beats, each with a coral full stop.
export const Tease: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const beats = ["Smarter", "Faster", "Cheaper"];
  return (
    <Scene duration={duration}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 70, fontFamily: F.serif, fontSize: 200, color: C.ivory, lineHeight: 1 }}>
          {beats.map((b, i) => {
            const at = sec(0.25) + i * sec(0.55);
            const dot = ramp(frame, at + sec(0.35), sec(0.5), ease.back);
            return (
              <div key={b} style={{ display: "flex", alignItems: "baseline" }}>
                <MaskWords words={[b]} start={at} dur={sec(0.8)} />
                <span style={{ color: C.coral, scale: String(dot), opacity: dot, display: "inline-block" }}>.</span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

// Title reveal over the orbit motif.
export const Title: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const push = mix(ramp(frame, 0, duration, ease.inOut), 0.97, 1.03);
  return (
    <Scene duration={duration}>
      <Orbits start={0} scale={push * 1.04} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 34, scale: String(push) }}>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 22,
            letterSpacing: "0.5em",
            color: C.coral,
            marginRight: "-0.5em",
            ...enter(frame, sec(0.25), { dist: 10, blur: 8 }),
          }}
        >
          INTRODUCING
        </div>
        <MaskWords
          start={sec(0.45)}
          stagger={sec(0.11)}
          dur={sec(1)}
          style={{ fontFamily: F.serif, fontSize: 200, lineHeight: 1, color: C.ivory, letterSpacing: "-0.01em" }}
          words={["Claude", "Opus", { t: "5.5", style: { fontStyle: "italic", color: C.coral } }]}
        />
        <div style={{ fontFamily: F.sans, fontSize: 32, color: C.muted, ...enter(frame, sec(1.5)) }}>
          The first model in the Claude 5.5 family
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

// Shared left-aligned layout for the fact scenes.
export const FactLayout: React.FC<{
  index: string;
  label: string;
  headline: Parameters<typeof MaskWords>[0]["words"];
  sub: string;
  subWidth?: number;
  headWidth?: number;
  children?: React.ReactNode;
}> = ({ index, label, headline, sub, subWidth = 1100, headWidth = 1500, children }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ padding: "0 170px", justifyContent: "center" }}>
      <Eyebrow index={index} text={label} start={sec(0.1)} />
      <MaskWords
        words={headline}
        start={sec(0.25)}
        style={{ fontFamily: F.serif, fontSize: 124, lineHeight: 1.02, color: C.ivory, marginTop: 34, maxWidth: headWidth }}
      />
      {sub ? (
      <div
        style={{
          fontFamily: F.sans,
          fontSize: 34,
          lineHeight: 1.4,
          color: C.muted,
          marginTop: 30,
          maxWidth: subWidth,
          ...enter(frame, sec(0.75)),
        }}
      >
        {sub}
      </div>
      ) : null}
      {children}
    </AbsoluteFill>
  );
};
