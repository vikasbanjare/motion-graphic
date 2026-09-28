import { random, useCurrentFrame } from "remotion";
import { Counter, Scene } from "../components";
import { C, F, ease, enter, mix, ramp, sec, shadow } from "../theme";
import { Split, useMockIn } from "./Opening";

const italic = { fontStyle: "italic" as const };

const card = {
  borderRadius: 24,
  backgroundColor: C.white,
  border: `1px solid ${C.line}`,
  boxShadow: shadow,
};

// Cost and speed as two stat cards with comparison bars.
export const Efficiency: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const mock = useMockIn(sec(0.25), duration);
  const cols = [
    { n: 40, head: "lower cost", note: "than Opus 5 on typical workloads", old: 1, neu: 0.6, at: sec(0.6) },
    { n: 30, head: "faster output", note: "than Opus 5", old: 1 / 1.3, neu: 1, at: sec(1.0) },
  ];
  return (
    <Scene duration={duration}>
      <Split
        label="Efficiency"
        headline={["Frontier", "results.", { t: "Everyday", style: italic }, "cost."]}
        sub="Run it on more of your work: cheaper per task and quicker to answer."
      >
        <div style={{ display: "flex", gap: 32, ...mock }}>
          {cols.map((c) => (
            <div key={c.head} style={{ ...card, width: 470, padding: "44px 42px" }}>
              <div style={{ fontFamily: F.serif, fontSize: 190, lineHeight: 0.9, color: C.ink }}>
                <Counter to={c.n} start={c.at} dur={sec(1.4)} />
                <span style={{ ...italic, color: C.clay }}>%</span>
              </div>
              <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 34, color: C.ink, marginTop: 22, ...enter(frame, c.at + sec(0.3)) }}>
                {c.head}
              </div>
              <div style={{ fontFamily: F.sans, fontSize: 22, color: C.muted, marginTop: 6, height: 60, ...enter(frame, c.at + sec(0.4)) }}>
                {c.note}
              </div>
              <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { k: "Opus 5", v: c.old, col: C.mid },
                  { k: "Opus 5.5", v: c.neu, col: C.clay },
                ].map((b, j) => {
                  const p = ramp(frame, c.at + sec(0.6) + j * sec(0.15), sec(1.1), ease.inOut);
                  return (
                    <div key={b.k} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 92, fontFamily: F.sans, fontWeight: 500, fontSize: 17, color: C.muted }}>{b.k}</div>
                      <div style={{ flex: 1, height: 12, borderRadius: 6, backgroundColor: C.paper2 }}>
                        <div style={{ height: "100%", borderRadius: 6, width: `${b.v * p * 100}%`, backgroundColor: b.col }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Split>
    </Scene>
  );
};

// 100 dots become 15: an 85% relative reduction.
export const Safety: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const mock = useMockIn(sec(0.25), duration);
  const n = 10;
  const gap = 46;
  const keep = new Set(
    Array.from({ length: 100 }, (_, i) => i)
      .sort((a, b) => random(`k${a}`) - random(`k${b}`))
      .slice(0, 15),
  );
  return (
    <Scene duration={duration}>
      <Split
        label="Safety"
        accent={C.green}
        headline={["Capable,", "and", { t: "careful.", style: italic }]}
        sub="Top performer on Anthropic's automated behavioral audit, its most comprehensive alignment test."
      >
        <div style={{ ...card, padding: "44px 48px", display: "flex", gap: 48, alignItems: "center", ...mock }}>
          <div style={{ position: "relative", width: n * gap, height: n * gap }}>
            {Array.from({ length: 100 }).map((_, i) => {
              const r = Math.floor(i / n);
              const c = i % n;
              const appear = ramp(frame, sec(0.6) + (r + c) * 2, sec(0.5));
              const fade = ramp(frame, sec(1.9) + (r + c) * 1.6, sec(0.6));
              const stays = keep.has(i);
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: c * gap + gap / 2 - 8,
                    top: r * gap + gap / 2 - 8,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    backgroundColor: stays && fade > 0 ? C.clay : C.ink2,
                    opacity: appear * (stays ? mix(fade, 0.5, 1) : mix(fade, 0.5, 0.1)),
                    scale: String(mix(appear, 0.3, 1) * (stays ? mix(fade, 1, 1.15) : 1)),
                  }}
                />
              );
            })}
          </div>
          <div style={{ width: 300 }}>
            <div style={{ fontFamily: F.serif, fontSize: 150, lineHeight: 0.9, color: C.ink, ...enter(frame, sec(2.2)) }}>
              <Counter to={85} start={sec(2.2)} dur={sec(1.2)} />
              <span style={{ ...italic, color: C.clay }}>%</span>
            </div>
            <div style={{ fontFamily: F.sans, fontSize: 24, lineHeight: 1.4, color: C.ink2, marginTop: 20, ...enter(frame, sec(2.5)) }}>
              less likely than Opus 5 to try to get around its boundaries.
            </div>
            <div style={{ fontFamily: F.sans, fontSize: 17, lineHeight: 1.5, color: C.muted, marginTop: 22, ...enter(frame, sec(2.9)) }}>
              Tested pre-release by external evaluators including METR.
            </div>
          </div>
        </div>
      </Split>
    </Scene>
  );
};
