import type { ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Caret, Chip, Eyebrow, MaskWords, Orbits, Scene, typed, type Word } from "../components";
import { C, F, ease, enter, mix, ramp, sec, shadow } from "../theme";

const ASK = "Migrate billing to the new payments API, update the tests, and open a PR.";

// Hook: a real-feeling ask typed into a composer, then sent.
export const Prompt: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const card = ramp(frame, sec(0.2), sec(1.0), ease.soft);
  const send = ramp(frame, sec(3.05), sec(0.25), ease.back);
  const pressed = frame >= sec(2.95) && frame < sec(3.15);
  const text = typed(frame, ASK, sec(0.8), sec(2.0));
  return (
    <Scene duration={duration}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 56 }}>
        <MaskWords
          words={["What", "would", "you", { t: "hand off?", style: { fontStyle: "italic", color: C.clay } }]}
          start={sec(0.05)}
          style={{ fontFamily: F.serif, fontSize: 110, color: C.ink, lineHeight: 1 }}
        />
        <div
          style={{
            width: 1320,
            borderRadius: 28,
            backgroundColor: C.white,
            border: `1px solid ${C.line}`,
            boxShadow: shadow,
            padding: "34px 38px 26px",
            opacity: card,
            translate: `0px ${mix(card, 60, 0)}px`,
            scale: String(mix(card, 0.96, 1)),
          }}
        >
          <div style={{ fontFamily: F.sans, fontSize: 36, lineHeight: 1.4, color: C.ink, minHeight: 100 }}>
            {text}
            {frame < sec(3.0) ? <Caret h={38} /> : null}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 22 }}>
            <Chip style={{ ...enter(frame, sec(0.6), { dist: 8, blur: 4 }) }}>＋ billing-service</Chip>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
              <Chip dot={C.clay} style={{ fontWeight: 600, color: C.ink, ...enter(frame, sec(0.7), { dist: 8, blur: 4 }) }}>
                Opus 5.5
              </Chip>
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 16,
                  backgroundColor: text.length === ASK.length ? C.clay : C.line,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  scale: String(pressed ? 0.88 : mix(send, 1, 1)),
                  boxShadow: text.length === ASK.length ? `0 6px 20px ${C.clay}55` : undefined,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <path d="M12 19V5M5 12l7-7 7 7" stroke="white" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
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
            fontFamily: F.sans,
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: "0.3em",
            color: C.clay,
            marginRight: "-0.3em",
            ...enter(frame, sec(0.2), { dist: 10, blur: 8 }),
          }}
        >
          INTRODUCING
        </div>
        <MaskWords
          start={sec(0.4)}
          stagger={sec(0.11)}
          dur={sec(1)}
          style={{ fontFamily: F.serif, fontSize: 210, lineHeight: 1, color: C.ink, letterSpacing: "-0.01em" }}
          words={["Claude", "Opus", { t: "5.5", style: { fontStyle: "italic", color: C.clay } }]}
        />
        <div style={{ fontFamily: F.sans, fontSize: 34, color: C.muted, ...enter(frame, sec(1.4)) }}>
          Fable-level performance on most work, at 40% lower cost.
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

// Text column on the left, product mock on the right.
export const Split: React.FC<{
  label: string;
  headline: Word[];
  sub: string;
  accent?: string;
  extra?: ReactNode;
  children: ReactNode;
}> = ({ label, headline, sub, accent, extra, children }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 0,
          bottom: 0,
          width: 610,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Eyebrow text={label} start={sec(0.1)} color={accent} />
        <MaskWords
          words={headline}
          start={sec(0.22)}
          style={{ fontFamily: F.serif, fontSize: 96, lineHeight: 1.02, color: C.ink, marginTop: 28 }}
        />
        <div
          style={{
            fontFamily: F.sans,
            fontSize: 29,
            lineHeight: 1.45,
            color: C.muted,
            marginTop: 26,
            ...enter(frame, sec(0.7)),
          }}
        >
          {sub}
        </div>
        {extra}
      </div>
      <div style={{ position: "absolute", left: 820, right: 0, top: 0, bottom: 0, display: "flex", alignItems: "center" }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

// Window entrance: rises and un-tilts in perspective, then drifts gently.
export const useMockIn = (start: number, duration: number) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, start, sec(1.1), ease.soft);
  const drift = ramp(frame, start, duration, (x) => x);
  return {
    opacity: ramp(frame, start, sec(0.4)),
    transform: `perspective(2000px) translateY(${mix(p, 120, 0) - drift * 14}px) rotateX(${mix(p, 16, 0)}deg) rotateY(${mix(p, -10, -3)}deg) scale(${mix(p, 0.92, 1)})`,
    transformOrigin: "50% 100%",
  };
};
