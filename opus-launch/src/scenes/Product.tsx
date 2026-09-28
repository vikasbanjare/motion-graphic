import { useCurrentFrame } from "remotion";
import { Caret, Chip, Counter, Pointer, Scene, Window, typed } from "../components";
import { C, F, ease, enter, mix, ramp, sec, shadow } from "../theme";
import { Split, useMockIn } from "./Opening";

const italic = { fontStyle: "italic" as const };

// Stat card that floats in under the text column.
const StatCard: React.FC<{ at: number; label: string; children: React.ReactNode }> = ({ at, label, children }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        marginTop: 44,
        padding: "22px 26px",
        borderRadius: 18,
        backgroundColor: C.white,
        border: `1px solid ${C.line}`,
        boxShadow: shadow,
        width: 520,
        ...enter(frame, at, { dist: 30, blur: 8 }),
      }}
    >
      <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 16, letterSpacing: "0.14em", color: C.muted }}>{label}</div>
      {children}
    </div>
  );
};

// --- Agentic coding ---------------------------------------------------------

const steps = [
  "Read 42 files in /billing",
  "Planned the migration",
  "Updated 12 files",
  "Ran 318 tests · all passing",
  "Opened pull request #482",
];

const code: { k: " " | "+" | "-"; s: string }[] = [
  { k: " ", s: 'import { BillingError } from "./errors";' },
  { k: "-", s: 'import { charge } from "./legacy/payments";' },
  { k: "+", s: 'import { payments } from "@acme/payments-v2";' },
  { k: " ", s: "" },
  { k: " ", s: "export async function bill(order) {" },
  { k: "-", s: "  const res = await charge(order.customer, order.cents);" },
  { k: "+", s: "  const res = await payments.intents.create({" },
  { k: "+", s: "    customer: order.customer," },
  { k: "+", s: "    amount: order.cents," },
  { k: "+", s: "    idempotencyKey: order.id," },
  { k: "+", s: "  });" },
  { k: " ", s: "  if (!res.ok) throw new BillingError(res.error);" },
  { k: " ", s: "  return res.receipt;" },
  { k: " ", s: "}" },
];

const KW = /\b(import|from|export|async|function|const|await|if|throw|new|return)\b/;

const Syntax: React.FC<{ s: string }> = ({ s }) => (
  <>
    {s.split(/("[^"]*"|\b(?:import|from|export|async|function|const|await|if|throw|new|return)\b)/).map((tok, i) => (
      <span
        key={i}
        style={{ color: tok.startsWith('"') ? C.green : KW.test(tok) ? C.clay : C.ink2 }}
      >
        {tok}
      </span>
    ))}
  </>
);

export const Agent: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const mock = useMockIn(sec(0.3), duration);
  const stepAt = (i: number) => sec(1.1) + i * sec(0.85);
  const tests = ramp(frame, stepAt(3), sec(0.8), ease.inOut);
  return (
    <Scene duration={duration}>
      <Split
        label="Agentic coding"
        headline={["Hand", "it", "the", { t: "whole", style: italic }, "task."]}
        sub="Opus 5.5 plans the change, edits the code, runs the tests and opens the pull request."
        extra={
          <StatCard at={sec(4.4)} label="TERMINAL-BENCH 4.0">
            {[
              { n: "Opus 5.5", v: 66.4, c: C.clay, t: C.ink },
              { n: "Opus 5", v: 52.3, c: C.line, t: C.muted },
            ].map((r, i) => {
              const p = ramp(frame, sec(4.6) + i * 6, sec(1.1), ease.inOut);
              return (
                <div key={r.n} style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 14 }}>
                  <div style={{ width: 100, fontFamily: F.sans, fontWeight: 500, fontSize: 20, color: r.t }}>{r.n}</div>
                  <div style={{ width: 280, height: 12, borderRadius: 6, backgroundColor: C.paper2 }}>
                    <div style={{ width: `${r.v * p}%`, height: "100%", borderRadius: 6, backgroundColor: r.c }} />
                  </div>
                  <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 24, color: r.t }}>
                    <Counter to={r.v} decimals={1} start={sec(4.6) + i * 6} dur={sec(1.1)} />%
                  </div>
                </div>
              );
            })}
          </StatCard>
        }
      >
        <div style={mock}>
          <Window title="billing-service — Claude Code" width={1000} height={700} bar={<Chip dot={C.clay} style={{ fontSize: 15, padding: "5px 12px" }}>Opus 5.5</Chip>}>
            <div style={{ display: "flex", height: "100%" }}>
              {/* Task log */}
              <div style={{ width: 340, borderRight: `1px solid ${C.line}`, padding: "26px 24px", backgroundColor: "#FDFCFA" }}>
                <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 15, letterSpacing: "0.12em", color: C.muted, marginBottom: 20 }}>
                  TASK
                </div>
                {steps.map((s, i) => {
                  const shown = ramp(frame, stepAt(i), sec(0.45));
                  const done = frame >= stepAt(i) + sec(0.65);
                  const spin = (frame * 8) % 360;
                  return (
                    <div
                      key={s}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        marginBottom: 20,
                        opacity: shown,
                        translate: `${mix(shown, -16, 0)}px 0px`,
                        fontFamily: F.sans,
                        fontSize: 19,
                        color: done ? C.ink : C.muted,
                      }}
                    >
                      <span
                        style={{
                          width: 24,
                          height: 24,
                          flexShrink: 0,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: done ? C.green : "transparent",
                          border: done ? "none" : `2.5px solid ${C.line}`,
                          borderTopColor: done ? undefined : C.clay,
                          rotate: done ? "0deg" : `${spin}deg`,
                        }}
                      >
                        {done ? (
                          <svg width="14" height="14" viewBox="0 0 24 24">
                            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="white" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : null}
                      </span>
                      {s}
                    </div>
                  );
                })}
              </div>
              {/* Diff */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "16px 24px", borderBottom: `1px solid ${C.line}`, fontFamily: F.mono, fontSize: 15, color: C.muted }}>
                  src/billing/charge.ts
                </div>
                <div style={{ flex: 1, padding: "14px 0", fontFamily: F.mono, fontSize: 16.5, lineHeight: "31px" }}>
                  {code.map((l, i) => {
                    const at = sec(2.1) + i * 4;
                    const p = ramp(frame, at, sec(0.35));
                    const bg = l.k === "+" ? C.greenSoft : l.k === "-" ? C.redSoft : "transparent";
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          padding: "0 22px",
                          backgroundColor: p > 0.5 ? bg : "transparent",
                          opacity: p,
                          textDecoration: l.k === "-" ? "line-through" : undefined,
                          textDecorationColor: `${C.clay}88`,
                        }}
                      >
                        <span style={{ width: 28, color: l.k === "+" ? C.green : l.k === "-" ? C.clay : C.mid }}>{l.k}</span>
                        <span style={{ whiteSpace: "pre" }}>
                          <Syntax s={l.s} />
                        </span>
                      </div>
                    );
                  })}
                </div>
                {/* Test runner */}
                <div style={{ padding: "16px 24px", borderTop: `1px solid ${C.line}`, display: "flex", alignItems: "center", gap: 18, fontFamily: F.mono, fontSize: 15, color: C.muted }}>
                  <span style={{ color: tests >= 1 ? C.green : C.muted }}>{tests >= 1 ? "✓ tests" : "● tests"}</span>
                  <div style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: C.paper2 }}>
                    <div style={{ width: `${tests * 100}%`, height: "100%", borderRadius: 3, backgroundColor: C.green }} />
                  </div>
                  <span style={{ fontVariantNumeric: "tabular-nums", width: 80, textAlign: "right" }}>{Math.round(318 * tests)}/318</span>
                </div>
              </div>
            </div>
          </Window>
        </div>
      </Split>
    </Scene>
  );
};

// --- Computer use -----------------------------------------------------------

const fields = [
  { label: "Vendor", value: "Northwind Supply Co.", at: sec(1.5) },
  { label: "Amount", value: "$12,480.00", at: sec(2.4) },
  { label: "Due date", value: "Oct 31, 2026", at: sec(3.2) },
];

export const ComputerUse: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const mock = useMockIn(sec(0.3), duration);
  const submitAt = sec(4.05);
  const toast = ramp(frame, submitAt + sec(0.25), sec(0.6), ease.back);
  // Pointer coordinates are relative to the window body.
  const fx = 340;
  const fy = (i: number) => 196 + i * 116;
  return (
    <Scene duration={duration}>
      <Split
        label="Computer use"
        accent={C.blue}
        headline={["Works", "the", "computer", { t: "like you do.", style: italic }]}
        sub="Clicks, types and navigates real software to finish multi-step work on its own."
      >
        <div style={mock}>
          <Window
            title="portal.northwind.example/orders/new"
            width={1000}
            height={700}
            bar={<Chip dot={C.blue} style={{ fontSize: 15, padding: "5px 12px" }}>Claude is using this app</Chip>}
          >
            <div style={{ padding: "40px 64px", position: "relative", height: "100%" }}>
              <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 34, color: C.ink }}>New purchase order</div>
              <div style={{ fontFamily: F.sans, fontSize: 19, color: C.muted, marginTop: 6 }}>Procurement · Draft</div>
              {fields.map((f, i) => {
                const focused = frame >= f.at && frame < (fields[i + 1]?.at ?? submitAt);
                return (
                  <div key={f.label} style={{ marginTop: i === 0 ? 38 : 22 }}>
                    <div style={{ fontFamily: F.sans, fontWeight: 500, fontSize: 17, color: C.muted, marginBottom: 8 }}>{f.label}</div>
                    <div
                      style={{
                        height: 62,
                        borderRadius: 12,
                        border: `1.5px solid ${focused ? C.blue : C.line}`,
                        boxShadow: focused ? `0 0 0 4px ${C.blue}22` : undefined,
                        display: "flex",
                        alignItems: "center",
                        padding: "0 20px",
                        fontFamily: F.sans,
                        fontSize: 24,
                        color: C.ink,
                      }}
                    >
                      {typed(frame, f.value, f.at + 8, sec(0.55))}
                      {focused ? <Caret color={C.blue} h={28} /> : null}
                    </div>
                  </div>
                );
              })}
              <div
                style={{
                  marginTop: 34,
                  width: 200,
                  height: 60,
                  borderRadius: 12,
                  backgroundColor: C.ink,
                  color: C.white,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: F.sans,
                  fontWeight: 600,
                  fontSize: 22,
                  scale: String(frame >= submitAt && frame < submitAt + 8 ? 0.95 : 1),
                }}
              >
                Submit order
              </div>
              <div
                style={{
                  position: "absolute",
                  right: 48,
                  bottom: 110,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "16px 22px",
                  borderRadius: 14,
                  backgroundColor: C.white,
                  border: `1px solid ${C.line}`,
                  boxShadow: shadow,
                  fontFamily: F.sans,
                  fontSize: 20,
                  color: C.ink,
                  opacity: Math.min(1, toast * 2),
                  scale: String(mix(toast, 0.8, 1)),
                  translate: `0px ${mix(toast, 20, 0)}px`,
                }}
              >
                <span style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24">
                    <path d="M5 12.5l4.5 4.5L19 7.5" stroke="white" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                PO-2291 submitted for approval
              </div>
              <Pointer
                path={[
                  { f: 0, x: 820, y: 560 },
                  { f: sec(0.9), x: 820, y: 560 },
                  { f: fields[0].at, x: fx, y: fy(0) },
                  { f: fields[1].at, x: fx - 60, y: fy(1) },
                  { f: fields[2].at, x: fx - 20, y: fy(2) },
                  { f: submitAt, x: 150, y: 596 },
                  { f: submitAt + sec(1.2), x: 420, y: 520 },
                ]}
                clicks={[fields[0].at, fields[1].at, fields[2].at, submitAt]}
              />
            </div>
          </Window>
        </div>
      </Split>
    </Scene>
  );
};

// --- Knowledge work ---------------------------------------------------------

const bars = [
  { q: "Q4", v: 0.52 },
  { q: "Q1", v: 0.61 },
  { q: "Q2", v: 0.7 },
  { q: "Q3", v: 0.92 },
];

export const Knowledge: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const mock = useMockIn(sec(0.3), duration);
  const lines = [0.96, 0.9, 0.93, 0.6];
  return (
    <Scene duration={duration}>
      <Split
        label="Knowledge work"
        accent={C.green}
        headline={["From", "raw", "data", "to", "a", { t: "finished", style: italic }, "brief."]}
        sub="Analysis, writing and charts in one pass, with Opus 5.5 leading knowledge-work evaluations."
        extra={
          <StatCard at={sec(3.6)} label="GDPVAL-AA V2.1">
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 8 }}>
              <span style={{ fontFamily: F.serif, fontSize: 72, lineHeight: 1, color: C.ink }}>
                <Counter to={1846} start={sec(3.7)} dur={sec(1.2)} />
              </span>
              <span style={{ fontFamily: F.sans, fontWeight: 500, fontSize: 22, color: C.muted }}>Elo</span>
            </div>
          </StatCard>
        }
      >
        <div style={mock}>
          <Window title="Q3 revenue brief" width={1000} height={700}>
            <div style={{ padding: "44px 70px" }}>
              <div style={{ fontFamily: F.serif, fontSize: 50, color: C.ink, minHeight: 60 }}>
                {typed(frame, "Q3 revenue brief", sec(0.9), sec(0.6))}
              </div>
              <div style={{ fontFamily: F.sans, fontSize: 17, color: C.muted, marginTop: 6, ...enter(frame, sec(1.3), { dist: 6, blur: 3 }) }}>
                Drafted by Claude from 3 spreadsheets and 14 call notes
              </div>
              <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 14 }}>
                {lines.map((w, i) => (
                  <div
                    key={i}
                    style={{
                      height: 13,
                      borderRadius: 7,
                      backgroundColor: C.paper2,
                      width: `${w * 100 * ramp(frame, sec(1.5) + i * 5, sec(0.5), ease.inOut)}%`,
                    }}
                  />
                ))}
              </div>
              <div style={{ display: "flex", gap: 40, marginTop: 38, alignItems: "flex-end" }}>
                <div style={{ display: "flex", gap: 26, alignItems: "flex-end", height: 250, paddingLeft: 8, borderLeft: `1.5px solid ${C.line}`, borderBottom: `1.5px solid ${C.line}` }}>
                  {bars.map((b, i) => {
                    const p = ramp(frame, sec(2.2) + i * 5, sec(0.9), ease.soft);
                    return (
                      <div key={b.q} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                        <div
                          style={{
                            width: 70,
                            height: 220 * b.v * p,
                            borderRadius: "8px 8px 0 0",
                            backgroundColor: i === 3 ? C.clay : C.blue,
                            opacity: i === 3 ? 1 : 0.55,
                          }}
                        />
                        <span style={{ fontFamily: F.sans, fontSize: 15, color: C.muted, marginBottom: -30 }}>{b.q}</span>
                      </div>
                    );
                  })}
                </div>
                <div
                  style={{
                    flex: 1,
                    padding: "22px 24px",
                    borderRadius: 14,
                    backgroundColor: C.claySoft + "80",
                    borderLeft: `4px solid ${C.clay}`,
                    fontFamily: F.sans,
                    fontSize: 22,
                    lineHeight: 1.4,
                    color: C.ink,
                    marginBottom: 20,
                    ...enter(frame, sec(3.0), { dist: 16, blur: 6 }),
                  }}
                >
                  Revenue grew <b>31% QoQ</b>, driven by annual plans after the pricing change.
                </div>
              </div>
            </div>
          </Window>
        </div>
      </Split>
    </Scene>
  );
};
