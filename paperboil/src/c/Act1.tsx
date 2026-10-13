import { useCurrentFrame } from "remotion";
import { antic, clamp, easeIn, easeIO, impact, popIn, sp, wander } from "../motion";
import { palette as P } from "../palette";
import { markFrame, shotDuration, type Shot } from "../storyboard";
import { Accents, Cut, Ground, halftone, Label, Misreg, RevealType, SHADOW, Stage } from "./kit";
import { textOf } from "./text";

type ShotProps = { shot: Shot };
const pop = (f: number, at: number) => popIn(f, at, "pop", 0.2);

/** Receipt ticker strip under each verb: "07:12 · 48 MIN". Slides up, holds, drifts. */
const Ticker: React.FC<{ id: string; f: number; x?: number; y?: number; dark?: boolean }> = ({ id, f, x = 600, y = 900, dark }) => {
  const t = textOf(id);
  const s = sp(f, t.at, "pop");
  return (
    <Cut x={x} y={y + (1 - s) * 160} w={430} h={86} color={dark ? P.ink : P.cream} radius={6} rotate={-3 + wander(f, 3, 0.6)} opacity={f < t.at ? 0 : 1}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 8, background: `repeating-linear-gradient(90deg, ${dark ? P.ink : P.cream} 0 10px, transparent 10px 20px)`, transform: "translateY(-6px)" }} />
      <Label text={t.text} x={0} y={24} width={430} align="center" size={30} color={t.color} tracking={0.22} weight={800} />
    </Cut>
  );
};

// ── S1 · SCROLL ─────────────────────────────────────────────────────────────
// Orange sun lands, the phone rises into it with its feed already scrolling,
// SCROLL slides in and bleeds off the left edge.
const FEED = [P.orange, P.sky, P.sky, P.cream, P.navy, P.navy];
export const C1Scroll: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const word = textOf("scroll");
  const sun = sp(f, -2, "land");
  const rise = antic(f, 3, 3, 0.08, "pop");
  return (
    <Stage dur={shotDuration(shot)} push={[1.02, 1.1]} seed={1}>
      <Ground color={P.cream} />
      <Cut x={380} y={-40} w={880} h={880} color={P.orange} radius="50%" scale={sun} tone={{ side: "bottom", opacity: 0.45 }} />
      <Cut x={150} y={210 + (1 - rise) * 640} w={330} h={630} color={P.navy} radius={54} rotate={-6 + (1 - rise) * 10}>
        <div style={{ position: "absolute", left: 18, top: 64, right: 18, bottom: 54, background: P.cream, borderRadius: 26, overflow: "hidden" }}>
          {Array.from({ length: 10 }, (_, i) => {
            const y = i * 170 - ((f * 16) % 170) - 40;
            return (
              <div key={i} style={{ position: "absolute", left: 14, right: 14, top: y, height: 150, background: "#fff", borderRadius: 16, boxShadow: "3px 5px 0 rgba(0,32,66,0.15)" }}>
                <div style={{ position: "absolute", left: 12, top: 12, width: 126, height: 126, borderRadius: 12, background: FEED[(i + 2) % FEED.length] }} />
                <div style={{ position: "absolute", left: 152, top: 30, width: 110, height: 16, borderRadius: 8, background: P.navy }} />
                <div style={{ position: "absolute", left: 152, top: 62, width: 80, height: 12, borderRadius: 6, background: P.sky }} />
                <div style={{ position: "absolute", left: 152, top: 92, width: 96, height: 12, borderRadius: 6, background: P.sky }} />
              </div>
            );
          })}
        </div>
        <div style={{ position: "absolute", left: 125, top: 22, width: 80, height: 18, borderRadius: 9, background: P.ink }} />
      </Cut>
      <RevealType text={word.text} x={-60} y={700} size={330} color={word.color} f={f} at={word.at} spring={(f, at) => sp(f, at, "settle")} />
      <div style={{ position: "absolute", left: -40, top: 990, width: 900 * sp(f, word.at + 6, "settle"), height: 26, background: P.orange, filter: SHADOW }} />
      <Ticker id="tick-scroll" f={f} x={620} y={60} />
      <Accents f={f} pop={pop} items={[{ x: 560, y: 610, s: 70, c: P.sky, kind: "sq", r: 12, at: 6 }, { x: 990, y: 860, s: 60, c: P.sky, kind: "dot", at: 9 }, { x: 80, y: 120, s: 90, c: P.navy, kind: "bar", r: -20, at: 11 }]} />
    </Stage>
  );
};

// ── S2 · STREAM ─────────────────────────────────────────────────────────────
export const C2Stream: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const word = textOf("stream");
  const tv = sp(f, -2, "land");
  const play = popIn(f, 3, "snap", 0.1);
  const pulse = 1 + Math.sin(f / 2.2) * 0.03;
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.08]} seed={2}>
      <Ground color={P.navy} tone={P.ink} />
      <Cut x={190} y={60} w={720} h={720} color={P.sky} radius="50%" scale={tv * pulse} tone={{ side: "right", opacity: 0.4 }} />
      <Cut x={200} y={150 + (1 - tv) * -500} w={700} h={460} color={P.cream} radius={30} rotate={3 * (1 - tv)}>
        <div style={{ position: "absolute", left: 28, top: 28, right: 28, bottom: 28, background: P.ink, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, ...halftone(P.navy, 12, 0.28), opacity: 0.6 }} />
          <div style={{ position: "absolute", left: 230, top: 120, width: 190, height: 170, background: P.orange, clipPath: "polygon(0 0, 100% 50%, 0 100%)", transform: `scale(${play})`, filter: SHADOW }} />
          <div style={{ position: "absolute", left: 30, bottom: 26, height: 10, width: `${clamp(f / 24) * 90}%`, background: P.orange, borderRadius: 5 }} />
        </div>
      </Cut>
      <Cut x={460} y={610} w={180} h={60} color={P.cream} clip="polygon(15% 0, 85% 0, 100% 100%, 0 100%)" />
      <RevealType text={word.text} x={30} y={710} size={300} color={word.color} f={f} at={word.at} spring={(f, at) => sp(f, at, "settle")} />
      <Ticker id="tick-stream" f={f} x={-20} y={40} dark />
    </Stage>
  );
};

// ── S3 · SEARCH ─────────────────────────────────────────────────────────────
export const C3Search: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const word = textOf("search");
  const t0 = markFrame(shot, "typeStart");
  const pill = sp(f, -2, "land");
  const typed = Math.max(0, Math.min(6, Math.floor((f - t0) / 2)));
  const swing = sp(f, 2, "loose");
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.08]} seed={3}>
      <Ground color={P.orange} tone={P.orangeDeep} />
      <Cut x={110} y={330} w={860} h={150} color={P.cream} radius={75} scale={`scale(${0.6 + 0.4 * pill}, ${pill}) ${impact(f, 2, 0.08, 6)}`}>
        <div style={{ position: "absolute", left: 40, top: 40, width: 70, height: 70, borderRadius: "50%", border: `12px solid ${P.navy}`, boxSizing: "border-box" }} />
        {Array.from({ length: typed }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 150 + i * 92, top: 62, width: 70 - (i % 3) * 14, height: 26, borderRadius: 13, background: P.navy }} />
        ))}
        <div style={{ position: "absolute", left: 150 + typed * 92, top: 46, width: 10, height: 58, background: P.orange, opacity: Math.floor(f / 3) % 2 ? 1 : 0.2 }} />
      </Cut>
      <div style={{ position: "absolute", left: 650, top: 20, width: 300, height: 300, transform: `rotate(${-50 + swing * 50}deg) scale(${0.3 + 0.7 * swing})`, transformOrigin: "50% 50%", filter: SHADOW }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 210, height: 210, borderRadius: "50%", border: `38px solid ${P.navy}`, boxSizing: "border-box", background: `${P.cream}55` }} />
        <div style={{ position: "absolute", left: 175, top: 170, width: 150, height: 46, background: P.navy, borderRadius: 23, transform: "rotate(45deg)", transformOrigin: "0 50%" }} />
      </div>
      <RevealType text={word.text} x={-40} y={650} size={320} color={word.color} f={f} at={word.at - 4} spring={(f, at) => sp(f, at, "settle")} />
      <Ticker id="tick-search" f={f} x={620} y={540} />
    </Stage>
  );
};

// ── S4 · RIDE ───────────────────────────────────────────────────────────────
export const C4Ride: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const word = textOf("ride");
  const land = markFrame(shot, "pinLand");
  const band = sp(f, -3, "snap");
  const c0 = markFrame(shot, "cabStart");
  const c1 = markFrame(shot, "cabEnd");
  const ct = easeIO(clamp((f - c0) / (c1 - c0)));
  const carX = -260 + ct * 900;
  const carY = 610 - ct * 900 * Math.tan((12 * Math.PI) / 180);
  const v = easeIO(clamp((f + 1 - c0) / (c1 - c0))) - ct;
  const pin = sp(f, land + 2, "land");
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.07]} seed={4}>
      <Ground color={P.cream} />
      <div style={{ position: "absolute", left: -700 + (1 - band) * -1600, top: 480, width: 2600, height: 270, background: P.navy, transform: "rotate(-12deg)", transformOrigin: "50% 50%", filter: SHADOW }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 125, height: 20, background: `repeating-linear-gradient(90deg, ${P.cream} 0 70px, transparent 70px 130px)`, backgroundPosition: `${-f * 26}px 0` }} />
      </div>
      <div style={{ position: "absolute", left: carX, top: carY, width: 300, height: 150, transform: `rotate(-12deg) scale(${1 + v * 3}, ${1 - v * 2})`, filter: SHADOW }}>
        <div style={{ position: "absolute", left: 60, top: 0, width: 160, height: 70, background: P.cream, borderRadius: "40px 50px 0 0" }} />
        <div style={{ position: "absolute", left: 0, top: 54, width: 300, height: 74, background: P.orange, borderRadius: 30 }} />
        <div style={{ position: "absolute", left: 120, top: 8, width: 70, height: 46, background: P.sky, borderRadius: "16px 22px 0 0" }} />
        {[48, 210].map((x) => (
          <div key={x} style={{ position: "absolute", left: x, top: 100, width: 56, height: 56, borderRadius: "50%", background: P.ink, border: `10px solid ${P.cream}`, boxSizing: "border-box" }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: 770, top: 140 + (1 - pin) * -500, width: 150, height: 210, transform: impact(f, land + 7, 0.16, 6), transformOrigin: "50% 100%", filter: SHADOW }}>
        <div style={{ position: "absolute", inset: 0, background: P.orange, clipPath: "path('M75 210 C55 160 0 120 0 72 A75 75 0 1 1 150 72 C150 120 95 160 75 210 Z')" }} />
        <div style={{ position: "absolute", left: 45, top: 42, width: 60, height: 60, borderRadius: "50%", background: P.cream }} />
      </div>
      <RevealType text={word.text} x={30} y={40} size={340} color={word.color} f={f} at={word.at - 4} spring={(f, at) => sp(f, at, "settle")} />
      <Ticker id="tick-ride" f={f} x={600} y={880} />
    </Stage>
  );
};

// ── S5 · PAY ────────────────────────────────────────────────────────────────
export const C5Pay: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const word = textOf("pay");
  const tap = markFrame(shot, "tap");
  const tick = markFrame(shot, "tick");
  const term = sp(f, -3, "land");
  const swing = antic(f, 1, 3, 0.12, "snap");
  const k = Math.max(0, swing);
  const cardX = 1150 - k * 830;
  const cardY = 120 + k * 280 - Math.sin(k * Math.PI) * 120;
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.07]} seed={5}>
      <Ground color={P.sky} tone={P.navy} />
      <Cut x={540} y={240 + (1 - term) * 700} w={340} h={560} color={P.navy} radius={40} scale={impact(f, tap, 0.05, 5) || 1} origin="50% 100%">
        <div style={{ position: "absolute", left: 36, top: 44, right: 36, height: 190, background: P.cream, borderRadius: 16 }} />
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 50 + (i % 3) * 86, top: 280 + Math.floor(i / 3) * 80, width: 62, height: 52, borderRadius: 14, background: P.navy }} />
        ))}
      </Cut>
      {f >= tap
        ? [0, 4, 8].map((d) => {
            const r = clamp((f - tap - d) / 10);
            return r > 0 && r < 1 ? <div key={d} style={{ position: "absolute", left: 710 - 260 * r, top: 380 - 260 * r, width: 520 * r, height: 520 * r, borderRadius: "50%", border: `14px solid ${P.cream}`, opacity: 1 - r }} /> : null;
          })
        : null}
      <div style={{ position: "absolute", left: 710 - 80, top: 300 - 80, width: 160, height: 160, transform: `scale(${popIn(f, tick, "snap", 0.1)})`, filter: SHADOW }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: P.orange }} />
        <div style={{ position: "absolute", left: 40, top: 46, width: 80, height: 44, borderLeft: `16px solid ${P.cream}`, borderBottom: `16px solid ${P.cream}`, transform: "rotate(-45deg)" }} />
      </div>
      <Cut x={cardX} y={cardY} w={400} h={250} color={P.orange} radius={24} rotate={-24 + k * 14} tone={{ side: "bottom", opacity: 0.35 }} style={{ zIndex: 2 }}>
        <div style={{ position: "absolute", left: 36, top: 60, width: 72, height: 56, borderRadius: 10, background: P.cream }} />
        <div style={{ position: "absolute", left: 36, top: 160, width: 230, height: 18, borderRadius: 9, background: P.cream, opacity: 0.85 }} />
      </Cut>
      <RevealType text={word.text} x={40} y={50} size={360} color={word.color} f={f} at={word.at - 4} spring={(f, at) => sp(f, at, "settle")} />
      <Ticker id="tick-pay" f={f} x={40} y={900} />
    </Stage>
  );
};

// ── S6 · THE RECEIPT ─────────────────────────────────────────────────────────
// The day prints out as one receipt; the question lands; on the hole in the
// music the giant orange 0 slams over it all.
const LINES: Array<[string, string, string]> = [
  ["07:12", "SCROLL", "48 MIN"],
  ["22:10", "STREAM", "2 HRS"],
  ["13:30", "SEARCH", "31 TIMES"],
  ["18:05", "RIDE", "2 TRIPS"],
  ["20:41", "PAY", "6 TAPS"],
];
export const C6Receipt: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const zero = markFrame(shot, "zero");
  const q = textOf("question");
  const feed = Math.min(1, sp(f, -2, "settle"));
  const printed = (i: number) => f >= 6 + i * 6;
  const slam = f >= zero ? 1 + 0.7 * (1 - sp(f, zero, "snap")) : 0;
  const shake = f >= zero && f < zero + 8 ? Math.sin((f - zero) * 2.5) * (8 - (f - zero)) * 2.6 : 0;
  const dim = f >= zero ? 0.35 : 0;
  const dur = shotDuration(shot);
  const exit = easeIn(clamp((f - (dur - 10)) / 10));
  return (
    <Stage dur={dur} push={[1.0, 1.08]} seed={6} origin={[540, 560]}>
      <Ground color={P.navy} tone={P.ink} />
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shake}px, ${shake * 0.5}px)` }}>
        <Cut x={40} y={-40 - (1 - feed) * 900} w={520} h={1010} color={P.cream} radius={4} rotate={-4 + wander(f, 6, 0.8)} origin="50% 0%" clip="polygon(0 0, 100% 0, 100% 97%, 95% 100%, 90% 97%, 85% 100%, 80% 97%, 75% 100%, 70% 97%, 65% 100%, 60% 97%, 55% 100%, 50% 97%, 45% 100%, 40% 97%, 35% 100%, 30% 97%, 25% 100%, 20% 97%, 15% 100%, 10% 97%, 5% 100%, 0 97%)">
          <div style={{ position: "absolute", inset: 0, opacity: 1 - dim }}>
            <Label text="YOUR DAY" x={0} y={110} width={520} align="center" size={46} weight={800} tracking={0.3} />
            <Label text="MADE IN THE USA · SPENT IN INDIA" x={0} y={172} width={520} align="center" size={17} tracking={0.22} />
            <div style={{ position: "absolute", left: 40, right: 40, top: 220, borderTop: `3px dashed ${P.navy}` }} />
            {LINES.map(([t, verb, qty], i) =>
              printed(i) ? (
                <div key={verb} style={{ position: "absolute", left: 40, right: 40, top: 250 + i * 74, height: 60, transform: `translateY(${(1 - sp(f, 6 + i * 6, "pop")) * 18}px)` }}>
                  <Label text={t} x={0} y={14} size={24} tracking={0.05} weight={400} />
                  <Label text={verb} x={100} y={8} size={34} tracking={0.08} weight={800} />
                  <Label text={qty} x={0} y={14} width={440} align="right" size={24} tracking={0.05} weight={400} />
                </div>
              ) : null,
            )}
            {f >= 40 ? <div style={{ position: "absolute", left: 40, right: 40, top: 640, borderTop: `3px dashed ${P.navy}` }} /> : null}
            {f >= 46 ? <Label text={"US SHARES\nOWNED"} x={40} y={680} size={40} weight={800} tracking={0.06} /> : null}
            {f >= 46 && f < zero ? <Label text="?" x={40} y={672} width={440} align="right" size={96} weight={800} color={P.orange} opacity={Math.floor(f / 4) % 2 ? 1 : 0.3} /> : null}
            <div style={{ position: "absolute", left: 60, right: 60, top: 860, height: 70, background: `repeating-linear-gradient(90deg, ${P.navy} 0 4px, transparent 4px 9px, ${P.navy} 9px 11px, transparent 11px 16px)` }} />
          </div>
        </Cut>
        <RevealType text={q.text} x={690} y={140} size={92} color={q.color} lineHeight={0.98} f={f} at={q.at} stagger={2} spring={(f, at) => sp(f, at, "settle")} opacity={f >= zero ? 1 - clamp((f - zero) / 4) * 0.7 : 1} />
        {f >= zero ? (
          <Misreg f={f} at={zero}>
          <div style={{ position: "absolute", left: -500, width: 2080, top: 560 - 1100 * 0.62, height: 1100 * 1.2, textAlign: "center", fontFamily: "Open Sans", fontWeight: 800, fontSize: 1100, lineHeight: 1.2, color: P.orange, filter: SHADOW, transform: `scale(${slam * (1 + exit * 0.15)})`, transformOrigin: "50% 52%" }}>0</div>
          </Misreg>
        ) : null}
      </div>
    </Stage>
  );
};
