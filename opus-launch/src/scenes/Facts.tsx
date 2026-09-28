import { random, useCurrentFrame } from "remotion";
import { Counter, Scene } from "../components";
import { C, F, ease, enter, mix, ramp, sec } from "../theme";
import { FactLayout } from "./Opening";

const italic = { fontStyle: "italic" as const };

// 01 — Opus 5.5 travels along a qualitative scale from Opus 5 to Fable 5.1.
export const Intelligence: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const width = 1580;
  const from = 0.26;
  const to = 0.84;
  const track = ramp(frame, sec(1.0), sec(0.9), ease.inOut);
  const travel = ramp(frame, sec(1.7), sec(1.3), ease.inOut);
  const x = mix(travel, from, to) * width;
  const ping = ramp(frame, sec(2.9), sec(0.9));
  const label = (at: number) => ({
    position: "absolute" as const,
    fontFamily: F.mono,
    fontSize: 18,
    letterSpacing: "0.2em",
    whiteSpace: "nowrap" as const,
    translate: "-50% 0",
    ...enter(frame, at, { dist: 8, blur: 6 }),
  });
  return (
    <Scene duration={duration}>
      <FactLayout
        index="01"
        label="Intelligence"
        headline={[{ t: "Fable-level", style: italic }, "intelligence."]}
        sub="Performs at the level of Claude Fable 5.1 on most work."
      >
        <div style={{ position: "relative", width, height: 150, marginTop: 90 }}>
          <div
            style={{ position: "absolute", top: 60, left: 0, height: 1.5, width: width * track, backgroundColor: C.dim }}
          />
          {Array.from({ length: 21 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: i % 5 === 0 ? 50 : 55,
                left: (i / 20) * width,
                width: 1.5,
                height: i % 5 === 0 ? 22 : 12,
                backgroundColor: C.faint,
                opacity: ramp(frame, sec(1.0) + i * 2, sec(0.3)),
              }}
            />
          ))}
          {/* Fable 5.1 target */}
          <div
            style={{
              position: "absolute",
              left: to * width - 16,
              top: 44,
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: `2px solid ${C.ivory}`,
              opacity: ramp(frame, sec(1.3), sec(0.5)) * 0.8,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: to * width - 16,
              top: 44,
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: `2px solid ${C.coral}`,
              scale: String(mix(ping, 1, 2.6)),
              opacity: ping > 0 ? 1 - ping : 0,
            }}
          />
          <div style={{ ...label(sec(1.4)), left: to * width, top: 100, color: C.ivory }}>FABLE 5.1</div>
          {/* Opus 5 origin */}
          <div
            style={{
              position: "absolute",
              left: from * width - 8,
              top: 52,
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: C.slate,
              opacity: ramp(frame, sec(1.2), sec(0.4)),
            }}
          />
          <div style={{ ...label(sec(1.3)), left: from * width, top: 100, color: C.muted }}>OPUS 5</div>
          {/* Opus 5.5 traveller + trail */}
          <div
            style={{
              position: "absolute",
              top: 59,
              left: from * width,
              width: x - from * width,
              height: 3,
              background: `linear-gradient(90deg, ${C.coral}00, ${C.coral})`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: x - 11,
              top: 49,
              width: 22,
              height: 22,
              borderRadius: "50%",
              backgroundColor: C.coral,
              boxShadow: `0 0 30px 6px ${C.coral}88`,
              opacity: ramp(frame, sec(1.5), sec(0.3)),
            }}
          />
          <div style={{ ...label(sec(1.6)), left: x, top: 0, color: C.coral }}>OPUS 5.5</div>
        </div>
      </FactLayout>
    </Scene>
  );
};

// 02 — Terminal-Bench 4.0 bars.
export const Coding: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const track = 1150;
  const rows = [
    { name: "Opus 5", v: 52.3, color: C.slate, text: C.muted, at: sec(1.0) },
    { name: "Opus 5.5", v: 66.4, color: C.coral, text: C.ivory, at: sec(1.25) },
  ];
  return (
    <Scene duration={duration}>
      <FactLayout
        index="02"
        label="Agentic coding"
        headline={["A", { t: "leap", style: italic }, "in", "agentic", "coding."]}
        sub="Also leading on computer use and knowledge-work benchmarks."
      >
        <div style={{ marginTop: 80, display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 18,
              letterSpacing: "0.22em",
              color: C.muted,
              ...enter(frame, sec(0.9), { dist: 8, blur: 4 }),
            }}
          >
            TERMINAL-BENCH 4.0
          </div>
          {rows.map((r) => {
            const p = ramp(frame, r.at, sec(1.3), ease.inOut);
            return (
              <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 36, ...enter(frame, r.at - 6, { dist: 14 }) }}>
                <div style={{ width: 170, fontFamily: F.sans, fontWeight: 500, fontSize: 30, color: r.text }}>{r.name}</div>
                <div style={{ position: "relative", width: track, height: 54, borderRadius: 10, backgroundColor: "#ffffff0A" }}>
                  <div
                    style={{
                      height: "100%",
                      width: (r.v / 100) * track * p,
                      borderRadius: 10,
                      background:
                        r.color === C.coral ? `linear-gradient(90deg, ${C.coral}AA, ${C.coral})` : r.color,
                      boxShadow: r.color === C.coral ? `0 0 40px ${C.coral}44` : undefined,
                    }}
                  />
                </div>
                <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 46, color: r.text, width: 170 }}>
                  <Counter to={r.v} decimals={1} start={r.at} dur={sec(1.3)} />%
                </div>
              </div>
            );
          })}
        </div>
      </FactLayout>
    </Scene>
  );
};

// 03 — Two big efficiency numbers with mini comparison bars.
export const Efficiency: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const cols = [
    { n: 40, head: "lower cost", note: "than Opus 5 on typical workloads", old: 1, neu: 0.6, at: sec(0.35) },
    { n: 30, head: "faster output", note: "than Opus 5", old: 1 / 1.3, neu: 1, at: sec(0.75) },
  ];
  const divider = ramp(frame, sec(0.5), sec(1.0), ease.inOut);
  const barW = 560;
  return (
    <Scene duration={duration}>
      <FactLayout
        index="03"
        label="Efficiency"
        headline={["More", "for", { t: "less.", style: italic }]}
        sub=""
      >
        <div style={{ display: "flex", marginTop: 56, alignItems: "stretch" }}>
          {cols.map((c, i) => (
            <div key={c.head} style={{ display: "flex" }}>
              {i > 0 ? (
                <div style={{ width: 1.5, margin: "30px 110px 0", backgroundColor: C.faint, scale: `1 ${divider}` }} />
              ) : null}
              <div style={{ width: 620 }}>
                <div
                  style={{
                    fontFamily: F.serif,
                    fontSize: 230,
                    lineHeight: 1,
                    color: C.ivory,
                    ...enter(frame, c.at, { dist: 40, blur: 14, dur: sec(1) }),
                  }}
                >
                  <Counter to={c.n} start={c.at} dur={sec(1.4)} />
                  <span style={{ fontStyle: "italic", color: C.coral }}>%</span>
                </div>
                <div
                  style={{
                    fontFamily: F.sans,
                    fontWeight: 600,
                    fontSize: 40,
                    color: C.ivory,
                    marginTop: 6,
                    ...enter(frame, c.at + sec(0.3)),
                  }}
                >
                  {c.head}
                </div>
                <div style={{ fontFamily: F.sans, fontSize: 28, color: C.muted, marginTop: 6, ...enter(frame, c.at + sec(0.4)) }}>
                  {c.note}
                </div>
                <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { k: "OPUS 5", v: c.old, col: C.slate },
                    { k: "OPUS 5.5", v: c.neu, col: C.coral },
                  ].map((b, j) => {
                    const p = ramp(frame, c.at + sec(0.6) + j * sec(0.15), sec(1.1), ease.inOut);
                    return (
                      <div key={b.k} style={{ display: "flex", alignItems: "center", gap: 20, opacity: Math.min(1, p * 3) }}>
                        <div style={{ width: 110, fontFamily: F.mono, fontSize: 15, letterSpacing: "0.16em", color: C.muted }}>
                          {b.k}
                        </div>
                        <div style={{ height: 8, borderRadius: 4, width: barW * b.v * p, backgroundColor: b.col }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </FactLayout>
    </Scene>
  );
};

// 04 — 100 dots become 15: an 85% relative reduction.
export const Safety: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const n = 10;
  const gap = 46;
  // Deterministic scatter of the 15 dots that remain.
  const keep = new Set(
    Array.from({ length: 100 }, (_, i) => i)
      .sort((a, b) => random(`k${a}`) - random(`k${b}`))
      .slice(0, 15),
  );
  return (
    <Scene duration={duration}>
      <FactLayout
        index="04"
        label="Safety"
        headline={["Its", "strongest", { t: "alignment", style: italic }, "results", "yet."]}
        sub="Top performer on Anthropic's automated behavioral audit, and 85% less likely than Opus 5 to try to get around its boundaries."
        subWidth={860}
        headWidth={1040}
      />
      <div style={{ position: "absolute", right: 190, top: 230, width: n * gap, fontFamily: F.mono }}>
        <div style={{ position: "relative", width: n * gap, height: n * gap }}>
          {Array.from({ length: 100 }).map((_, i) => {
            const r = Math.floor(i / n);
            const c = i % n;
            const appear = ramp(frame, sec(0.5) + (r + c) * 2, sec(0.5));
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
                  backgroundColor: stays && fade > 0 ? C.coral : C.ivory,
                  opacity: appear * (stays ? mix(fade, 0.45, 1) : mix(fade, 0.45, 0.08)),
                  scale: String(mix(appear, 0.3, 1) * (stays ? mix(fade, 1, 1.15) : 1)),
                  boxShadow: stays && fade > 0.5 ? `0 0 18px ${C.coral}77` : undefined,
                }}
              />
            );
          })}
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            alignItems: "baseline",
            gap: 22,
            fontFamily: F.serif,
            fontSize: 64,
            color: C.ivory,
            ...enter(frame, sec(2.6)),
          }}
        >
          <span style={{ color: C.dim }}>100</span>
          <span style={{ fontSize: 40, color: C.dim }}>→</span>
          <span style={{ color: C.coral, fontStyle: "italic" }}>15</span>
        </div>
        <div
          style={{ fontSize: 15, letterSpacing: "0.16em", color: C.muted, marginTop: 10, lineHeight: 1.6, ...enter(frame, sec(2.8)) }}
        >
          BOUNDARY-CIRCUMVENTION ATTEMPTS,
          <br />
          RELATIVE TO OPUS 5
        </div>
      </div>
    </Scene>
  );
};
