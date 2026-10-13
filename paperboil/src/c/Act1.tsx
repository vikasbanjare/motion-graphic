import { useCurrentFrame } from "remotion";
import { antic, clamp, easeIn, impact, popIn, sp, wander } from "../motion";
import { palette as P } from "../palette";
import { markFrame, shotDuration, type Shot } from "../storyboard";
import { Accents, Cut, Drift, Ground, halftone, Label, Misreg, RevealType, SHADOW, Stage } from "./kit";
import { textOf } from "./text";

/**
 * Act 1 · the day → the receipt. Landscape grid: type lives in the left
 * column (x 100–900), the object in the right column (x 960–1820).
 */
type ShotProps = { shot: Shot };
const pop = (f: number, at: number) => popIn(f, at, "pop", 0.2);
const settle = (f: number, at: number) => sp(f, at, "settle");

/** Receipt ticker strip under each verb: "07:12 · 48 MIN". */
const Ticker: React.FC<{ id: string; f: number; x: number; y: number; dark?: boolean }> = ({ id, f, x, y, dark }) => {
  const t = textOf(id);
  const s = sp(f, t.at, "pop");
  return (
    <Cut x={x} y={y + (1 - s) * 140} w={440} h={84} color={dark ? P.ink : P.cream} radius={4} rotate={-2.5 + wander(f, 3, 0.8)} opacity={f < t.at ? 0 : 1}>
      <Label text={t.text} x={0} y={24} width={440} align="center" size={30} color={t.color} tracking={0.22} weight={800} />
    </Cut>
  );
};

// ── S1 · SCROLL ─────────────────────────────────────────────────────────────
const FEED = [P.orange, P.sky, P.navy, P.cream, P.orange, P.sky];
export const C1Scroll: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const word = textOf("scroll");
  const sun = sp(f, -3, "land");
  const rise = antic(f, 2, 3, 0.06, "pop");
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.08]} seed={1} origin={[1200, 540]}>
      <Ground color={P.cream} />
      <Drift f={f} seed={1} amp={8}>
        <Cut x={900} y={0} w={940} h={940} color={P.orange} radius="50%" scale={sun} tone={{ side: "bottom", opacity: 0.4 }} />
      </Drift>
      <Drift f={f} seed={2} amp={6} rot={1}>
        <Cut x={1330} y={170 + (1 - rise) * 760} w={360} h={690} color={P.navy} radius={58} rotate={-5 + (1 - rise) * 12}>
          <div style={{ position: "absolute", left: 20, top: 70, right: 20, bottom: 60, background: P.cream, borderRadius: 28, overflow: "hidden" }}>
            {Array.from({ length: 10 }, (_, i) => {
              const y = i * 180 - ((f * 15) % 180) - 40;
              return (
                <div key={i} style={{ position: "absolute", left: 14, right: 14, top: y, height: 160, background: "#fffdf8", borderRadius: 16, boxShadow: "2px 4px 0 rgba(10,30,60,0.14)" }}>
                  <div style={{ position: "absolute", left: 14, top: 14, width: 132, height: 132, borderRadius: 12, background: FEED[(i + 2) % FEED.length], ...halftone("rgba(10,30,60,0.25)", 9, 0.22) }} />
                  <div style={{ position: "absolute", left: 162, top: 34, width: 120, height: 18, borderRadius: 9, background: P.navy }} />
                  <div style={{ position: "absolute", left: 162, top: 70, width: 90, height: 12, borderRadius: 6, background: P.sky }} />
                  <div style={{ position: "absolute", left: 162, top: 100, width: 104, height: 12, borderRadius: 6, background: P.sky, opacity: 0.6 }} />
                </div>
              );
            })}
          </div>
          <div style={{ position: "absolute", left: 140, top: 24, width: 80, height: 18, borderRadius: 9, background: P.ink }} />
        </Cut>
      </Drift>
      <RevealType text={word.text} x={90} y={600} size={330} color={word.color} f={f} at={word.at - 6} spring={settle} />
      <div style={{ position: "absolute", left: 110, top: 925, width: 860 * sp(f, word.at + 8, "settle"), height: 28, background: P.orange, filter: SHADOW }} />
      <Ticker id="tick-scroll" f={f} x={120} y={430} />
      <Accents f={f} pop={pop} items={[{ x: 930, y: 250, s: 70, c: P.sky, kind: "sq", r: 12, at: 6 }, { x: 1830, y: 880, s: 64, c: P.navy, kind: "dot", at: 9 }, { x: 1700, y: 90, s: 110, c: P.navy, kind: "bar", r: -20, at: 11 }]} />
    </Stage>
  );
};

// ── S2 · STREAM ─────────────────────────────────────────────────────────────
export const C2Stream: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const word = textOf("stream");
  const tv = sp(f, -3, "land");
  const play = popIn(f, 3, "snap", 0.1);
  const pulse = 1 + Math.sin(f / 2.2) * 0.025;
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.07]} seed={2} origin={[1350, 460]}>
      <Ground color={P.navy} tone={P.ink} />
      <Drift f={f} seed={3} amp={10}>
        <Cut x={960} y={60} w={800} h={800} color={P.sky} radius="50%" scale={tv * pulse} tone={{ side: "right", opacity: 0.35 }} />
      </Drift>
      <Drift f={f} seed={4} amp={6} rot={0.8}>
        <Cut x={990} y={200 + (1 - tv) * -560} w={740} h={480} color={P.cream} radius={30} rotate={2 * (1 - tv)}>
          <div style={{ position: "absolute", left: 30, top: 30, right: 30, bottom: 30, background: P.ink, borderRadius: 14, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, ...halftone(P.navy, 12, 0.3), opacity: 0.8 }} />
            <div style={{ position: "absolute", left: 255, top: 120, width: 190, height: 180, background: P.orange, clipPath: "polygon(0 0, 100% 50%, 0 100%)", transform: `scale(${play})`, filter: SHADOW }} />
            <div style={{ position: "absolute", left: 34, bottom: 28, height: 10, width: `${clamp(f / 24) * 88}%`, background: P.orange, borderRadius: 5 }} />
          </div>
        </Cut>
        <Cut x={1270} y={680} w={180} h={64} color={P.cream} clip="polygon(15% 0, 85% 0, 100% 100%, 0 100%)" />
      </Drift>
      <RevealType text={word.text} x={90} y={620} size={360} color={word.color} f={f} at={word.at} spring={settle} />
      <Ticker id="tick-stream" f={f} x={120} y={500} dark />
    </Stage>
  );
};

// ── S3 · SEARCH ─────────────────────────────────────────────────────────────
export const C3Search: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const word = textOf("search");
  const t0 = markFrame(shot, "typeStart");
  const pill = sp(f, -3, "land");
  const typed = Math.max(0, Math.min(6, Math.floor((f - t0) / 2)));
  const swing = sp(f, 1, "loose");
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.07]} seed={3} origin={[1350, 400]}>
      <Ground color={P.orange} tone={P.orangeDeep} />
      <Drift f={f} seed={5} amp={6}>
        <Cut x={960} y={320} w={860} h={160} color={P.cream} radius={80} scale={`scale(${0.6 + 0.4 * pill}, ${pill}) ${impact(f, 2, 0.08, 6)}`}>
          <div style={{ position: "absolute", left: 42, top: 42, width: 76, height: 76, borderRadius: "50%", border: `13px solid ${P.navy}`, boxSizing: "border-box" }} />
          {Array.from({ length: typed }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 156 + i * 96, top: 66, width: 74 - (i % 3) * 14, height: 28, borderRadius: 14, background: P.navy }} />
          ))}
          <div style={{ position: "absolute", left: 156 + typed * 96, top: 48, width: 10, height: 64, background: P.orange, opacity: Math.floor(f / 3) % 2 ? 1 : 0.2 }} />
        </Cut>
      </Drift>
      <div style={{ position: "absolute", left: 1480, top: 20, width: 320, height: 320, transform: `rotate(${-55 + swing * 55 + wander(f, 6, 3)}deg) scale(${0.3 + 0.7 * swing})`, transformOrigin: "50% 50%", filter: SHADOW }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 220, height: 220, borderRadius: "50%", border: `40px solid ${P.navy}`, boxSizing: "border-box", background: `${P.cream}66` }} />
        <div style={{ position: "absolute", left: 182, top: 178, width: 160, height: 48, background: P.navy, borderRadius: 24, transform: "rotate(45deg)", transformOrigin: "0 50%" }} />
      </div>
      <RevealType text={word.text} x={80} y={600} size={380} color={word.color} f={f} at={word.at - 4} spring={settle} />
      <Ticker id="tick-search" f={f} x={1340} y={560} />
    </Stage>
  );
};

// ── S4 · RIDE ───────────────────────────────────────────────────────────────
export const C4Ride: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const word = textOf("ride");
  const land = markFrame(shot, "pinLand");
  const band = sp(f, -4, "settle");
  const c0 = markFrame(shot, "cabStart");
  const c1 = markFrame(shot, "cabEnd");
  const ct = clamp((f - c0) / (c1 - c0));
  const carX = -300 + ct * 2000;
  const carY = 720 - (carX + 300) * Math.tan((10 * Math.PI) / 180);
  const pin = sp(f, land + 2, "land");
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.06]} seed={4}>
      <Ground color={P.cream} />
      <div style={{ position: "absolute", left: -600 + (1 - band) * -2600, top: 560, width: 3200, height: 280, background: P.navy, transform: "rotate(-10deg)", transformOrigin: "50% 50%", filter: SHADOW }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 130, height: 20, background: `repeating-linear-gradient(90deg, ${P.cream} 0 80px, transparent 80px 150px)`, backgroundPosition: `${-f * 28}px 0` }} />
      </div>
      <div style={{ position: "absolute", left: carX, top: carY, width: 320, height: 160, transform: `rotate(-10deg) translateY(${Math.sin(f * 1.3) * 2}px)`, filter: SHADOW }}>
        <div style={{ position: "absolute", left: 66, top: 0, width: 170, height: 76, background: P.cream, borderRadius: "40px 54px 0 0" }} />
        <div style={{ position: "absolute", left: 130, top: 10, width: 74, height: 50, background: P.sky, borderRadius: "16px 24px 0 0" }} />
        <div style={{ position: "absolute", left: 0, top: 58, width: 320, height: 78, background: P.orange, borderRadius: 32, ...halftone("rgba(120,30,0,0.35)", 10, 0.25) }} />
        {[52, 226].map((x) => (
          <div key={x} style={{ position: "absolute", left: x, top: 106, width: 60, height: 60, borderRadius: "50%", background: P.ink, border: `11px solid ${P.cream}`, boxSizing: "border-box", transform: `rotate(${f * 30}deg)` }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: 1520, top: 110 + (1 - pin) * -520, width: 160, height: 224, transform: impact(f, land + 8, 0.16, 6), transformOrigin: "50% 100%", filter: SHADOW }}>
        <div style={{ position: "absolute", inset: 0, background: P.orange, clipPath: "path('M80 224 C58 170 0 128 0 77 A80 80 0 1 1 160 77 C160 128 102 170 80 224 Z')" }} />
        <div style={{ position: "absolute", left: 48, top: 45, width: 64, height: 64, borderRadius: "50%", background: P.cream }} />
      </div>
      <RevealType text={word.text} x={90} y={60} size={420} color={word.color} f={f} at={word.at - 4} spring={settle} />
      <Ticker id="tick-ride" f={f} x={1300} y={900} />
    </Stage>
  );
};

// ── S5 · PAY ────────────────────────────────────────────────────────────────
export const C5Pay: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const word = textOf("pay");
  const tap = markFrame(shot, "tap");
  const tick = markFrame(shot, "tick");
  const term = sp(f, -4, "land");
  const swing = antic(f, 1, 3, 0.1, "snap");
  const k = Math.max(0, swing);
  const cardX = 2050 - k * 790;
  const cardY = 80 + k * 300 - Math.sin(k * Math.PI) * 140;
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.06]} seed={5} origin={[1400, 500]}>
      <Ground color={P.sky} tone={P.navy} />
      <Drift f={f} seed={7} amp={5}>
        <Cut x={1240} y={220 + (1 - term) * 760} w={360} h={600} color={P.navy} radius={42} scale={impact(f, tap, 0.05, 5) || 1} origin="50% 100%">
          <div style={{ position: "absolute", left: 38, top: 46, right: 38, height: 200, background: P.cream, borderRadius: 16 }} />
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 54 + (i % 3) * 90, top: 296 + Math.floor(i / 3) * 86, width: 66, height: 56, borderRadius: 14, background: P.sky, opacity: 0.85 }} />
          ))}
        </Cut>
      </Drift>
      {f >= tap
        ? [0, 4, 8].map((d) => {
            const r = clamp((f - tap - d) / 10);
            return r > 0 && r < 1 ? <div key={d} style={{ position: "absolute", left: 1420 - 300 * r, top: 360 - 300 * r, width: 600 * r, height: 600 * r, borderRadius: "50%", border: `14px solid ${P.cream}`, opacity: 1 - r }} /> : null;
          })
        : null}
      <div style={{ position: "absolute", left: 1420 - 85, top: 340 - 85, width: 170, height: 170, transform: `scale(${popIn(f, tick, "snap", 0.1)})`, filter: SHADOW }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: P.orange }} />
        <div style={{ position: "absolute", left: 42, top: 50, width: 86, height: 46, borderLeft: `17px solid ${P.cream}`, borderBottom: `17px solid ${P.cream}`, transform: "rotate(-45deg)" }} />
      </div>
      <Cut x={cardX} y={cardY} w={420} h={262} color={P.orange} radius={26} rotate={-26 + k * 16} tone={{ side: "bottom", opacity: 0.35 }} style={{ zIndex: 2 }}>
        <div style={{ position: "absolute", left: 38, top: 64, width: 76, height: 58, borderRadius: 10, background: P.cream, opacity: 0.85 }} />
        <div style={{ position: "absolute", left: 38, top: 170, width: 240, height: 18, borderRadius: 9, background: P.cream, opacity: 0.85 }} />
      </Cut>
      <RevealType text={word.text} x={90} y={300} size={480} color={word.color} f={f} at={word.at - 4} spring={settle} />
      <Ticker id="tick-pay" f={f} x={120} y={880} />
    </Stage>
  );
};

// ── S6 · THE RECEIPT ─────────────────────────────────────────────────────────
// The day prints out as one receipt (left), the question sets in (right); on
// the hole in the music the giant orange 0 slams over the whole frame.
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
  const feed = sp(f, -2, "settle");
  const printed = (i: number) => f >= 6 + i * 6;
  const slam = f >= zero ? 1 + 0.7 * (1 - sp(f, zero, "snap")) : 0;
  const shake = f >= zero && f < zero + 8 ? Math.sin((f - zero) * 2.5) * (8 - (f - zero)) * 2.8 : 0;
  const dim = f >= zero ? 0.35 : 0;
  const dur = shotDuration(shot);
  const exit = easeIn(clamp((f - (dur - 10)) / 10));
  // The receipt prints centre-frame, then steps aside for the question.
  const aside = f < q.at - 6 ? 0 : sp(f, q.at - 6, "settle");
  return (
    <Stage dur={dur} push={[1.0, 1.07]} seed={6} origin={[960, 560]}>
      <Ground color={P.navy} tone={P.ink} />
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shake}px, ${shake * 0.5}px)` }}>
        <Cut x={690 - 360 * aside} y={-40 - (1 - feed) * 1000} w={540} h={1040} color={P.cream} radius={4} rotate={-1 - 3 * aside + wander(f, 6, 1.2)} origin="50% 0%" clip="polygon(0 0, 100% 0, 100% 97%, 95% 100%, 90% 97%, 85% 100%, 80% 97%, 75% 100%, 70% 97%, 65% 100%, 60% 97%, 55% 100%, 50% 97%, 45% 100%, 40% 97%, 35% 100%, 30% 97%, 25% 100%, 20% 97%, 15% 100%, 10% 97%, 5% 100%, 0 97%)">
          <div style={{ position: "absolute", inset: 0, opacity: 1 - dim }}>
            <Label text="YOUR DAY" x={0} y={110} width={540} align="center" size={48} weight={800} tracking={0.3} />
            <Label text="MADE IN THE USA · SPENT IN INDIA" x={0} y={174} width={540} align="center" size={18} tracking={0.22} />
            <div style={{ position: "absolute", left: 42, right: 42, top: 222, borderTop: `3px dashed ${P.navy}` }} />
            {LINES.map(([t, verb, qty], i) =>
              printed(i) ? (
                <div key={verb} style={{ position: "absolute", left: 42, right: 42, top: 252 + i * 76, height: 62, transform: `translateY(${(1 - sp(f, 6 + i * 6, "settle")) * 20}px)` }}>
                  <Label text={t} x={0} y={14} size={25} tracking={0.05} weight={400} />
                  <Label text={verb} x={104} y={8} size={35} tracking={0.08} weight={800} />
                  <Label text={qty} x={0} y={14} width={456} align="right" size={25} tracking={0.05} weight={400} />
                </div>
              ) : null,
            )}
            {f >= 40 ? <div style={{ position: "absolute", left: 42, right: 42, top: 646, borderTop: `3px dashed ${P.navy}` }} /> : null}
            {f >= 46 ? <Label text={"US SHARES\nOWNED"} x={42} y={686} size={42} weight={800} tracking={0.06} /> : null}
            {f >= 46 && f < zero ? <Label text="?" x={42} y={676} width={456} align="right" size={100} weight={800} color={P.orange} opacity={Math.floor(f / 4) % 2 ? 1 : 0.3} /> : null}
            <div style={{ position: "absolute", left: 62, right: 62, top: 880, height: 74, background: `repeating-linear-gradient(90deg, ${P.navy} 0 4px, transparent 4px 9px, ${P.navy} 9px 11px, transparent 11px 16px)` }} />
          </div>
        </Cut>
        <RevealType text={q.text} x={1040} y={200} size={150} color={q.color} lineHeight={0.96} f={f} at={q.at} stagger={2} spring={settle} opacity={f >= zero ? 1 - clamp((f - zero) / 4) * 0.7 : 1} />
        {f >= zero ? (
          <Misreg f={f} at={zero}>
            <div style={{ position: "absolute", left: 0, width: 1920, top: 560 - 1150 * 0.62, height: 1150 * 1.2, textAlign: "center", fontFamily: "Open Sans", fontWeight: 800, fontSize: 1150, lineHeight: 1.2, color: P.orange, filter: SHADOW, transform: `scale(${slam * (1 + exit * 0.15)}) rotate(${wander(f, 9, 1.2)}deg)`, transformOrigin: "50% 52%" }}>0</div>
          </Misreg>
        ) : null}
      </div>
    </Stage>
  );
};
