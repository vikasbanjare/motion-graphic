import { useCurrentFrame } from "remotion";
import { MapsLogo } from "../components/MapsLogo";
import { arc, clamp, easeIO, impact, popIn, sp, wander } from "../motion";
import { palette as P } from "../palette";
import { markFrame, markFrames, shotDuration, type Shot } from "../storyboard";
import { Accents, Cut, Drift, Ground, halftone, kickPulse, Label, Misreg, RevealType, SHADOW, Stage, Type } from "./kit";
import { Sticker } from "./Act2";
import { textOf } from "./text";

type ShotProps = { shot: Shot };
const pop = (f: number, at: number) => popIn(f, at, "pop", 0.2);
const settle = (f: number, at: number) => sp(f, at, "settle");

/** Brand-safe stock tile: an abstract mark + a slice wedge (no real logos). */
const MARKS: Array<{ c: string; shape: "dot" | "tri" | "sq" | "ring" }> = [
  { c: P.orange, shape: "dot" },
  { c: P.sky, shape: "tri" },
  { c: P.navy, shape: "sq" },
  { c: P.sky, shape: "ring" },
  { c: P.orangeDeep, shape: "tri" },
  { c: P.navy, shape: "dot" },
];
/** Pie wedge path from 12 o'clock, `t` of a full turn (radius 34). */
const wedge = (t: number) => {
  const a = Math.min(0.999, Math.max(0.001, t)) * Math.PI * 2;
  const x = Math.sin(a) * 34;
  const y = -Math.cos(a) * 34;
  return `M0 0 L0 -34 A34 34 0 ${a > Math.PI ? 1 : 0} 1 ${x.toFixed(2)} ${y.toFixed(2)} Z`;
};
const StockTile: React.FC<{ i: number; w?: number; h?: number; picked?: number; chart?: number }> = ({ i, w = 250, h = 340, picked = 0, chart = 1 }) => {
  const m = MARKS[i % MARKS.length];
  const k = w / 250;
  return (
    <div style={{ position: "absolute", inset: 0, width: w, height: h, background: "#fffdf8", borderRadius: 22 * k, boxShadow: picked > 0 ? `0 0 0 ${9 * picked}px ${P.orange}` : "4px 7px 2px rgba(8,22,44,0.22)" }}>
      <div
        style={{
          position: "absolute",
          left: 70 * k,
          top: 40 * k,
          width: 110 * k,
          height: 110 * k,
          background: m.shape === "ring" ? "transparent" : m.c,
          border: m.shape === "ring" ? `${24 * k}px solid ${m.c}` : undefined,
          boxSizing: "border-box",
          borderRadius: m.shape === "dot" || m.shape === "ring" ? "50%" : m.shape === "sq" ? 18 * k : 0,
          clipPath: m.shape === "tri" ? "polygon(50% 0, 100% 100%, 0 100%)" : undefined,
        }}
      />
      <div style={{ position: "absolute", left: 40 * k, top: 190 * k, width: 170 * k, height: 22 * k, borderRadius: 11 * k, background: P.navy }} />
      {/* "A slice": a fractional-ownership wedge, not a price chart (SEBI ad code:
          no performance or "number goes up" graphics). */}
      <svg width={84 * k} height={84 * k} viewBox="-50 -50 100 100" style={{ position: "absolute", left: 40 * k, top: 232 * k }}>
        <circle r={42} fill="none" stroke={P.navy} strokeWidth={8} />
        <path d={wedge(0.08 + 0.17 * chart)} fill={P.orange} />
      </svg>
      <div style={{ position: "absolute", left: 140 * k, top: 254 * k, width: 70 * k, height: 14 * k, borderRadius: 7 * k, background: P.sky }} />
      <div style={{ position: "absolute", left: 140 * k, top: 282 * k, width: 46 * k, height: 14 * k, borderRadius: 7 * k, background: P.sky, opacity: 0.6 }} />
    </div>
  );
};

// ── S11 · THE DROP — the poster assembles on the downbeat, then keeps living:
// a marquee of stock tiles runs along the band, the sun breathes.
export const C11Drop: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const us = textOf("us");
  const stocks = textOf("stocks");
  const maps = textOf("now-on-maps");
  const sun = f < 0 ? 0 : 1 + 0.16 * (1 - sp(f, 0, "snap")) - 0.16 * (f < 2 ? 1 : 0);
  const band = sp(f + 2, 0, "snap");
  // Pre-advanced so the poster already reads on the downbeat frame itself.
  const u = sp(f + 4, us.at, "snap");
  const st = sp(f + 3, stocks.at, "snap");
  const mp = sp(f, maps.at, "pop");
  const breathe = 1 + Math.sin(f / 10) * 0.015;
  const marquee = (f * 9) % 330;
  return (
    <Stage dur={shotDuration(shot)} push={[1.05, 1.0]} seed={11} origin={[960, 540]}>
      <Ground color={P.cream} />
      <Drift f={f} seed={21} amp={10}>
        <Cut x={940} y={-300} w={1340} h={1340} color={P.orange} radius="50%" scale={Math.max(0, sun) * breathe} tone={{ side: "bottom", opacity: 0.4 }} />
      </Drift>
      <div style={{ position: "absolute", left: -700 - (1 - band) * 3200, top: 650, width: 3600, height: 260, background: P.navy, transform: "rotate(-12deg)", transformOrigin: "50% 50%", filter: SHADOW, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, ...halftone(P.ink, 12, 0.28), opacity: 0.45 }} />
        {f > 10
          ? Array.from({ length: 13 }, (_, i) => (
              <div key={i} style={{ position: "absolute", left: 1200 + i * 330 - marquee, top: 40, width: 250, height: 180, transform: "scale(0.53)", transformOrigin: "0 0" }}>
                <StockTile i={i} />
              </div>
            ))
          : null}
      </div>
      <Misreg f={f} at={0} len={5}>
        <Type text={us.text} x={90} y={-40 + (1 - u) * -760} size={600} color={us.color} vary={kickPulse(f, 12)} />
      </Misreg>
      <Type text={stocks.text} x={70 + (1 - st) * 2000} y={440} size={340} color={P.cream} outline={P.navy} vary={kickPulse(f, 18)} />
      <div style={{ position: "absolute", left: 1460, top: 330, transform: `scale(${mp}) rotate(${(1 - mp) * -14}deg)`, transformOrigin: "20% 60%", opacity: f < maps.at ? 0 : 1 }}>
        <Label text="NOW ON" x={0} y={0} size={38} color={maps.color} tracking={0.4} weight={800} />
        <div style={{ position: "absolute", left: -8, top: 44, width: 320 }}>
          <Type text="MAPS" x={0} y={0} size={150} color={maps.color} italic />
        </div>
      </div>
      <Accents
        f={f}
        pop={pop}
        items={[
          { x: 120, y: 600, s: 80, c: P.sky, kind: "sq", r: 12, at: 10 },
          { x: 1840, y: 640, s: 90, c: P.sky, kind: "dot", at: 12 },
          { x: 900, y: 120, s: 74, c: P.navy, kind: "tri", r: -12, at: 14 },
        ]}
      />
    </Stage>
  );
};

// ── S12 · PICK & BUY — swipe, pick, the stock enlarges on the right, press BUY.
export const C12Pick: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const swipes = markFrames(shot, "swipes");
  const pick = markFrame(shot, "pick");
  const buy = markFrame(shot, "buy");
  const phone = sp(f, -4, "land");
  let offset = 0;
  for (const s of swipes) offset += 280 * sp(f, s, "snap");
  const picked = f >= pick ? sp(f, pick, "pop") : 0;
  const big = f >= pick ? sp(f, pick + 2, "land") : 0;
  const press = f >= buy && f < buy + 4;
  const thumbY = f < pick ? 760 : f < buy ? 560 : 860;
  const thumbX = f < pick ? 900 - swipes.reduce((a, s) => a + (f >= s && f < s + 8 ? Math.sin(((f - s) / 8) * Math.PI) * 220 : 0), 0) : 740;
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.05]} seed={12} origin={[960, 540]}>
      <Ground color={P.cream} />
      <Drift f={f} seed={31} amp={8}>
        <Cut x={360} y={260} w={880} h={880} color={P.sky} radius="50%" tone={{ side: "bottom", opacity: 0.35 }} />
      </Drift>
      <Cut x={580} y={40 + (1 - phone) * 1000} w={440} h={900} color={P.navy} radius={60} scale={impact(f, buy, 0.03, 5) || 1}>
        <div style={{ position: "absolute", left: 20, top: 70, right: 20, bottom: 60, background: P.cream, borderRadius: 30, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 96, background: P.navy }} />
          <div style={{ position: "absolute", left: 30, top: 38, width: 170, height: 18, borderRadius: 9, background: P.sky }} />
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 70 + i * 280 - offset, top: 140, width: 250, height: 340, transform: `scale(${i === 2 ? 1 + picked * 0.06 : 1})` }}>
              <StockTile i={i} picked={i === 2 ? picked : 0} />
            </div>
          ))}
          <div style={{ position: "absolute", left: 40, right: 40, bottom: 44, height: 116, borderRadius: 58, background: P.orange, transform: press ? "scale(0.92, 0.84)" : "scale(1)", filter: SHADOW }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 30, textAlign: "center", fontFamily: "Open Sans", fontWeight: 800, fontSize: 46, letterSpacing: "0.12em", color: P.ink }}>BUY</div>
          </div>
        </div>
      </Cut>
      {/* The picked stock, enlarged on the right with its chart drawing on. */}
      {big > 0 ? (
        <div style={{ position: "absolute", left: 1220 + (1 - big) * 300, top: 180, width: 500, height: 680, transform: `rotate(${4 - big * 2 + wander(f, 5, 0.8)}deg) scale(${0.6 + big * 0.4})`, transformOrigin: "0% 50%", opacity: big, filter: SHADOW }}>
          <StockTile i={2} w={500} h={680} chart={clamp((f - pick - 4) / 14)} />
          {f >= buy ? (
            <div style={{ position: "absolute", right: -40, top: -40, width: 170, height: 170, transform: `scale(${popIn(f, buy + 2, "snap", 0.2)}) rotate(-14deg)`, filter: SHADOW }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: P.orange }} />
              <div style={{ position: "absolute", left: 44, top: 52, width: 82, height: 44, borderLeft: `16px solid ${P.cream}`, borderBottom: `16px solid ${P.cream}`, transform: "rotate(-45deg)" }} />
            </div>
          ) : null}
        </div>
      ) : null}
      {big > 0 ? <Label text="ILLUSTRATIVE · NOT A RECOMMENDATION" x={1210} y={930} size={20} weight={800} tracking={0.18} color={P.navy} opacity={big} /> : null}
      <Burst f={f} at={buy} x={800} y={778} />
      <div style={{ position: "absolute", left: thumbX, top: thumbY, width: 136, height: 340, background: P.cream, borderRadius: "68px 68px 30px 30px", transform: `rotate(-18deg) translateY(${press ? 14 : 0}px)`, filter: SHADOW, boxShadow: `inset 0 0 0 6px ${P.navy}` }}>
        <div style={{ position: "absolute", left: 24, top: 20, width: 88, height: 74, background: P.orangePale, borderRadius: "40px 40px 20px 20px" }} />
      </div>
      <Accents f={f} pop={pop} items={[{ x: 300, y: 180, s: 90, c: P.orange, kind: "sq", r: 10, at: 4 }, { x: 1800, y: 900, s: 74, c: P.navy, kind: "dot", at: 7 }, { x: 260, y: 900, s: 100, c: P.sky, kind: "tri", r: 20, at: 10 }]} />
    </Stage>
  );
};

/** Impact frame: one cream flash ring + navy speed lines, ~5 frames. */
const Burst: React.FC<{ f: number; at: number; x: number; y: number }> = ({ f, at, x, y }) => {
  const t = f - at;
  if (t < 0 || t > 6) return null;
  const k = t / 6;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0 }}>
      {t < 2 ? <div style={{ position: "absolute", left: -260, top: -260, width: 520, height: 520, borderRadius: "50%", border: `36px solid ${P.cream}`, boxSizing: "border-box", transform: `scale(${0.5 + t * 0.4})` }} /> : null}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * 360 + (i % 2) * 9;
        const r0 = 170 + k * 160;
        const len = (1 - k) * (i % 3 === 0 ? 150 : 90);
        return <div key={i} style={{ position: "absolute", left: 0, top: -7, width: len, height: 14, borderRadius: 7, background: i % 4 === 0 ? P.orange : P.navy, transform: `rotate(${a}deg) translateX(${r0}px)`, transformOrigin: "0 50%" }} />;
      })}
    </div>
  );
};

// ── Certificates (S13–S15) ───────────────────────────────────────────────────
const CERT_BANDS = [P.navy, P.sky, P.orange, P.navy, P.sky];
const Certificate: React.FC<{ i: number; x: number; y: number; rotate: number; scale?: number; children?: React.ReactNode }> = ({ i, x, y, rotate, scale = 1, children }) => {
  const band = CERT_BANDS[i % CERT_BANDS.length];
  return (
    <Cut x={x} y={y} w={640} h={430} color={P.cream} radius={10} rotate={rotate} scale={scale}>
      <div style={{ position: "absolute", inset: 18, border: `24px solid ${band}`, borderRadius: 4 }} />
      {children ?? (
        <>
          <div style={{ position: "absolute", left: 220, top: 92, width: 200, height: 22, borderRadius: 11, background: P.navy }} />
          <div style={{ position: "absolute", left: 250, top: 128, width: 140, height: 12, borderRadius: 6, background: P.sky }} />
          <div style={{ position: "absolute", left: 90, top: 190, width: 110, height: 110, borderRadius: "50%", border: `10px solid ${band}`, boxSizing: "border-box" }} />
          {[0, 1, 2].map((k) => (
            <div key={k} style={{ position: "absolute", left: 240, top: 200 + k * 36, width: 300 - k * 60, height: 12, borderRadius: 6, background: k === 0 ? P.navy : P.sky }} />
          ))}
          <Label text={`Nº 000 00${i + 1}`} x={70} y={350} size={22} weight={800} tracking={0.2} color={P.navy} />
          <div style={{ position: "absolute", left: 500, top: 300, width: 92, height: 92, borderRadius: "50%", background: P.orange, boxShadow: `inset -8px -8px 0 ${P.orangeDeep}` }} />
        </>
      )}
    </Cut>
  );
};
/** Where each certificate comes to rest: a loose fan across the frame. */
const REST: Array<[number, number, number]> = [
  [230, 380, -9],
  [1060, 300, 6],
  [640, 440, -3],
  [880, 360, 2],
  [640, 325, -1],
];
const Stack: React.FC<{ f: number; frames: number[] }> = ({ f, frames }) => (
  <>
    {frames.map((f0, i) => {
      if (f < f0 - 6) return null;
      const t = sp(f, f0 - 6, "land");
      const [x, y, r] = REST[i % REST.length];
      const [px, py] = arc([x + 1100, y - 900], [x, y], Math.min(1, t), 0.15);
      return (
        <div key={i} style={{ position: "absolute", inset: 0, transform: impact(f, f0, 0.05, 5) }}>
          <Certificate i={i} x={px} y={py} rotate={r + (1 - t) * 35} scale={1.28} />
        </div>
      );
    })}
  </>
);

// ── S13 · THE STACK — one certificate per beat, fanning across the desk.
export const C13Stack: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.06]} seed={13}>
      <Ground color={P.navy} tone={P.ink} />
      <Drift f={f} seed={41} amp={6} rot={0.4}>
        <Stack f={f} frames={markFrames(shot, "flicks")} />
      </Drift>
      <Accents f={f} pop={pop} items={[{ x: 200, y: 180, s: 80, c: P.orange, kind: "dot", at: 36 }, { x: 1720, y: 880, s: 90, c: P.cream, kind: "sq", r: 14, at: 38 }, { x: 1700, y: 200, s: 120, c: P.sky, kind: "bar", r: -10, at: 40 }]} />
    </Stage>
  );
};

// ── S14 · THE PROOF LINE — the top certificate lifts to camera until it *is*
// the frame; the line is set big on it and a slice sticker fills as the full stop.
export const C14Proof: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const t = textOf("proof");
  const lift = sp(f, markFrame(shot, "lift"), "settle");
  const slice = f < t.at + 22 ? 0 : sp(f, t.at + 22, "snap");
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.04]} seed={14}>
      <Ground color={P.navy} tone={P.ink} />
      <div style={{ position: "absolute", inset: 0, opacity: 1 - lift * 0.55, filter: `blur(${lift * 2}px)` }}>
        <Stack f={f} frames={[-40, -40, -40, -40]} />
      </div>
      <Certificate i={4} x={640} y={325} rotate={1.5 * (1 - lift) + wander(f, 2, 0.3) * (1 - lift)} scale={1.28 + lift * 1.67}>
        <div />
      </Certificate>
      <RevealType text={"Own a slice\nof the brands you\nuse every day."} x={170} y={300} size={152} color={t.color} lineHeight={0.98} f={f} at={t.at + 4} stagger={2} spring={settle} />
      {slice > 0 ? (
        <div style={{ position: "absolute", left: 1500, top: 500, width: 340, height: 340, transform: `scale(${popIn(f, t.at + 22, "snap", 0.3)}) rotate(${-12 + wander(f, 4, 2)}deg)`, filter: SHADOW }}>
          <svg width={340} height={340} viewBox="-50 -50 100 100">
            <circle r={46} fill="#fffdf8" />
            <circle r={40} fill="none" stroke={P.navy} strokeWidth={7} />
            <path d={wedge(0.04 + 0.13 * slice)} fill={P.orange} />
          </svg>
        </div>
      ) : null}
    </Stage>
  );
};

// ── S15 · THE LAST DAB — "Customer by habit." sits next to the day's receipt;
// on the downbeat after the break "Shareholder by choice." stamps on a navy
// band and the receipt flips over into a share certificate.
export const C15LastDab: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const c = textOf("customer");
  const s = textOf("shareholder");
  const breakIn = markFrame(shot, "breakIn");
  const lean = easeIO(clamp((f - breakIn) / (s.at - breakIn)));
  const band = f < s.at - 2 ? 0 : sp(f, s.at - 2, "snap");
  const stamp = f < s.at ? 0 : 1 + 0.35 * (1 - sp(f, s.at, "snap"));
  const shake = f >= s.at && f < s.at + 6 ? Math.sin((f - s.at) * 2.6) * (6 - (f - s.at)) * 2 : 0;
  const under = clamp((f - s.at - 4) / 8);
  const flip = clamp((f - s.at - 1) / 8);
  const flipScale = Math.abs(Math.cos(flip * Math.PI));
  const showCert = flip > 0.5;
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.05]} seed={15} origin={[960, 560]}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shake}px, ${shake * 0.5}px) scale(${1 + lean * 0.05 - (f >= s.at ? sp(f, s.at, "snap") * 0.05 : 0)})`, transformOrigin: "960px 600px" }}>
        <Ground color={P.cream} />
        <Drift f={f} seed={51} amp={10}>
          <Cut x={1380} y={-320} w={760} h={760} color={P.orange} radius="50%" scale={sp(f, -3, "land")} tone={{ side: "bottom", opacity: 0.4 }} />
        </Drift>
        <RevealType text={c.text} x={100} y={110} size={210} color={c.color} lineHeight={0.95} f={f} at={c.at + 2} stagger={2} spring={settle} opacity={f >= s.at ? 1 - clamp((f - s.at) / 6) * 0.55 : 1} />
        {/* The receipt (customer) → flips to a certificate (shareholder). */}
        <div style={{ position: "absolute", left: 1240, top: 170, width: 420, height: 560, transform: `rotate(${6 + wander(f, 3, 1.2)}deg) scale(${flipScale}, 1) translateY(${(1 - sp(f, 4, "land")) * 900}px)`, transformOrigin: "50% 50%", filter: SHADOW }}>
          {showCert ? (
            <div style={{ position: "absolute", inset: 0, background: P.cream, borderRadius: 10 }}>
              <div style={{ position: "absolute", inset: 16, border: `20px solid ${P.navy}` }} />
              <div style={{ position: "absolute", left: 110, top: 90, width: 200, height: 20, borderRadius: 10, background: P.navy }} />
              <div style={{ position: "absolute", left: 90, top: 150, width: 240, height: 12, borderRadius: 6, background: P.sky }} />
              <div style={{ position: "absolute", left: 140, top: 230, width: 140, height: 140, borderRadius: "50%", border: `12px solid ${P.navy}`, boxSizing: "border-box" }} />
              <div style={{ position: "absolute", left: 270, top: 400, width: 100, height: 100, borderRadius: "50%", background: P.orange, boxShadow: `inset -8px -8px 0 ${P.orangeDeep}` }} />
              <Label text="Nº 000 001" x={60} y={460} size={22} weight={800} tracking={0.2} />
            </div>
          ) : (
            <div style={{ position: "absolute", inset: 0, background: "#fffdf8", clipPath: "polygon(0 0, 100% 0, 100% 96%, 92% 100%, 84% 96%, 76% 100%, 68% 96%, 60% 100%, 52% 96%, 44% 100%, 36% 96%, 28% 100%, 20% 96%, 12% 100%, 4% 96%, 0 100%)" }}>
              <Label text="YOUR DAY" x={0} y={46} width={420} align="center" size={34} weight={800} tracking={0.3} />
              {[0, 1, 2, 3, 4].map((k) => (
                <div key={k} style={{ position: "absolute", left: 40, right: 40, top: 120 + k * 56, height: 14, borderRadius: 7, background: k % 2 ? P.sky : P.navy, opacity: 0.8 }} />
              ))}
              <Label text={"US SHARES OWNED  0"} x={40} y={420} size={24} weight={800} tracking={0.06} />
            </div>
          )}
        </div>
        <div style={{ position: "absolute", left: -800 - (1 - band) * 3400, top: 565, width: 3600, height: 340, background: P.navy, transform: "rotate(-5deg)", transformOrigin: "50% 50%", filter: SHADOW }}>
          <div style={{ position: "absolute", inset: 0, ...halftone(P.ink, 12, 0.28), opacity: 0.45 }} />
        </div>
        <HabitsToSlices f={f} stamp={s.at} />
        {f >= s.at ? <Type text={s.text} x={110} y={665} size={150} color={s.color} lineHeight={0.92} rotate={-5} transform={`scale(${stamp})`} origin="20% 50%" /> : null}
        <div style={{ position: "absolute", left: 120, top: 932, width: 760 * under, height: 28, background: P.orange, transform: "rotate(-5deg)", transformOrigin: "0 50%", filter: SHADOW }} />
        <Accents
          f={f}
          pop={pop}
          items={[
            { x: 1060, y: 500, s: 80, c: P.sky, kind: "sq", r: 18, at: s.at + 3 },
            { x: 1150, y: 120, s: 60, c: P.navy, kind: "dot", at: s.at + 5 },
            { x: 1770, y: 890, s: 80, c: P.orange, kind: "tri", r: -10, at: s.at + 7 },
          ]}
        />
      </div>
    </Stage>
  );
};

/**
 * The day's habits (the Act 1 stickers) land one per beat under "Customer by
 * habit."; on the stamp each flips into a slice token and lands on the band:
 * the brands you use → slices you own. Tokens then pulse in a beat chase.
 */
const HabitsToSlices: React.FC<{ f: number; stamp: number }> = ({ f, stamp }) => (
  <>
    {Array.from({ length: 5 }, (_, i) => {
      const at = 10 + i * 12;
      if (f < at) return null;
      const land = popIn(f, at, "pop", 0.3);
      const fl = clamp((f - stamp - i * 2) / 6);
      const go = f < stamp + i * 2 ? 0 : sp(f, stamp + i * 2, "snap");
      const x0 = 110 + i * 200;
      const y0 = 610;
      const x1 = 1090 + i * 150;
      const y1 = 760 - 0.0875 * (x1 + 68 - 1000) - 68;
      const [x, y] = arc([x0, y0], [x1, y1], go, 0.25);
      const flip = Math.abs(Math.cos(fl * Math.PI));
      const token = fl > 0.5;
      const beatsIn = Math.floor((f - stamp - 12) / 12);
      const chase = token && beatsIn >= 0 && beatsIn % 5 === i ? 1 + 0.12 * Math.exp(-((f - stamp - 12) % 12) / 3) : 1;
      return (
        <div key={i} style={{ position: "absolute", left: x, top: y, width: 220, height: 220, transform: `scale(${0.7 * land * chase}) scaleX(${flip}) rotate(${(i % 2 ? 6 : -6) * (1 - go) - 5 * go}deg)`, transformOrigin: "0 0" }}>
          {token ? (
            <svg width={220} height={220} viewBox="-50 -50 100 100" style={{ filter: SHADOW }}>
              <circle r={47} fill="#fffdf8" />
              <circle r={40} fill="none" stroke={P.navy} strokeWidth={8} />
              <path d={wedge(0.1 + 0.04 * i)} fill={P.orange} />
            </svg>
          ) : (
            <Sticker kind={i} />
          )}
        </div>
      );
    })}
  </>
);

// ── S16 · END CARD — MAPS on the song's final hit; the line tracks out
// slowly, the sun rises back in for the loop.
export const C16End: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const t = textOf("now-open");
  const cta = textOf("cta");
  const logo = markFrame(shot, "logo");
  const ghost = markFrame(shot, "loopGhost");
  const s = popIn(f, logo, "pop", 0.4);
  const bar = clamp((f - logo - 6) / 8);
  const under = clamp((f - t.at - 8) / 10);
  const peek = easeIO(clamp((f - ghost) / 18));
  const track = 0.3 + clamp(f / 48) * 0.06;
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.03]} seed={16}>
      <Ground color={P.cream} />
      <Cut x={1920 - 260 - peek * 160} y={-200 + (1 - peek) * 40} w={880} h={880} color={P.orange} radius="50%" tone={{ side: "bottom", opacity: 0.45 }} />
      <div style={{ position: "absolute", left: 960 - 340, top: 250, width: 680, transform: `scale(${s})`, transformOrigin: "50% 60%" }}>
        <Misreg f={f} at={logo} len={5}>
          <MapsLogo width={680} variant="bar-navy" barReveal={bar} />
        </Misreg>
      </div>
      <Label text={t.text} x={0} y={700} width={1920} align="center" size={44} color={t.color} weight={800} tracking={track} opacity={clamp((f - t.at - 4) / 6)} />
      <div style={{ position: "absolute", left: 960 - 300, top: 768, width: 600 * under, height: 16, borderRadius: 8, background: P.orange }} />
      {/* CTA: one clear action; presses on every downbeat so the loop keeps asking. */}
      <div style={{ position: "absolute", left: 960 - 250, top: 812, width: 500, height: 96, borderRadius: 48, background: P.navy, filter: SHADOW, transform: `scale(${popIn(f, cta.at + 8, "pop", 0.3) * (1 - 0.05 * Math.exp(-((Math.max(0, f - cta.at - 8)) % 12) / 2.5))})`, transformOrigin: "50% 50%" }}>
        <Label text={cta.text} x={0} y={26} width={500} align="center" size={38} color={cta.color} weight={800} tracking={0.12} />
      </div>
      <Drift f={f} seed={61} amp={6}>
        <Accents f={f} pop={pop} items={[{ x: 240, y: 230, s: 70, c: P.sky, kind: "sq", r: 14, at: 10 }, { x: 330, y: 860, s: 56, c: P.navy, kind: "dot", at: 14 }]} />
      </Drift>
    </Stage>
  );
};
