import { useCurrentFrame } from "remotion";
import { MapsLogo } from "../components/MapsLogo";
import { arc, clamp, easeIO, impact, popIn, sp, wander } from "../motion";
import { palette as P } from "../palette";
import { markFrame, markFrames, shotDuration, type Shot } from "../storyboard";
import { Accents, Cut, Ground, halftone, Label, Misreg, RevealType, SHADOW, Stage, Type } from "./kit";
import { textOf } from "./text";

type ShotProps = { shot: Shot };
const pop = (f: number, at: number) => popIn(f, at, "pop", 0.2);

// ── S11 · THE DROP — the style frame, assembled on the downbeat. ─────────────
export const C11Drop: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const us = textOf("us");
  const stocks = textOf("stocks");
  const maps = textOf("now-on-maps");
  const sun = f < 0 ? 0 : 1 + 0.18 * (1 - sp(f, 0, "snap")) - 0.18 * (f < 2 ? 1 : 0);
  const band = sp(f, 2, "snap");
  // Pre-advanced so the poster already reads on the downbeat frame itself.
  const u = sp(f + 4, us.at, "snap");
  const st = sp(f + 3, stocks.at, "snap");
  const mp = sp(f, maps.at, "pop");
  const breathe = 1 + Math.sin(f / 10) * 0.012;
  return (
    <Stage dur={shotDuration(shot)} push={[1.06, 1.0]} seed={11}>
      <Ground color={P.cream} />
      <Cut x={360} y={-160} w={1300} h={1300} color={P.orange} radius="50%" scale={Math.max(0, sun) * breathe} tone={{ side: "bottom", opacity: 0.4 }} />
      <div style={{ position: "absolute", left: -900 - (1 - band) * 2400, top: 610, width: 3200, height: 230, background: P.navy, transform: "rotate(-14deg)", transformOrigin: "50% 50%", filter: SHADOW }}>
        <div style={{ position: "absolute", inset: 0, ...halftone(P.ink, 12, 0.28), opacity: 0.45 }} />
      </div>
      <Misreg f={f} at={0} len={5}>
        <Type text={us.text} x={20} y={-30 + (1 - u) * -700} size={520} color={us.color} />
      </Misreg>
      <Type text={stocks.text} x={10 + (1 - st) * 1400} y={520} size={290} color={P.cream} outline={P.navy} />
      <div style={{ position: "absolute", left: 790, top: 845, transform: `translateY(${(1 - mp) * 300}px)`, opacity: f < maps.at ? 0 : 1 }}>
        <Label text="NOW ON" x={0} y={0} size={34} color={maps.color} tracking={0.4} weight={800} />
        <div style={{ position: "absolute", left: -8, top: 40, width: 270 }}>
          <Type text="MAPS" x={0} y={0} size={130} color={maps.color} italic />
        </div>
      </div>
      <Accents
        f={f}
        pop={pop}
        items={[
          { x: 120, y: 90, s: 80, c: P.sky, kind: "sq", r: 12, at: 10 },
          { x: 1010, y: 760, s: 90, c: P.sky, kind: "dot", at: 12 },
          { x: 980, y: 140, s: 70, c: P.navy, kind: "tri", r: -12, at: 14 },
          { x: 70, y: 1000, s: 120, c: P.orange, kind: "bar", r: -14, at: 16 },
        ]}
      />
    </Stage>
  );
};

// ── S12 · PICK & BUY — swipe the cards, pick one, press Buy. ────────────────
const CARD_MARKS: Array<{ c: string; shape: "dot" | "tri" | "sq" | "ring" }> = [
  { c: P.orange, shape: "dot" },
  { c: P.sky, shape: "tri" },
  { c: P.navy, shape: "sq" },
  { c: P.sky, shape: "ring" },
  { c: P.orangeDeep, shape: "tri" },
];
const StockCard: React.FC<{ i: number; x: number; picked?: number }> = ({ i, x, picked = 0 }) => {
  const m = CARD_MARKS[i % CARD_MARKS.length];
  return (
    <div style={{ position: "absolute", left: x, top: 130, width: 250, height: 340, background: "#fff", borderRadius: 22, boxShadow: `6px 9px 0 rgba(0,32,66,0.18)`, border: picked > 0 ? `${8 * picked}px solid ${P.orange}` : undefined, boxSizing: "border-box", transform: `scale(${1 + picked * 0.08})` }}>
      <div style={{ position: "absolute", left: 70, top: 40, width: 110, height: 110, background: m.shape === "ring" ? "transparent" : m.c, border: m.shape === "ring" ? `24px solid ${m.c}` : undefined, boxSizing: "border-box", borderRadius: m.shape === "dot" || m.shape === "ring" ? "50%" : m.shape === "sq" ? 18 : 0, clipPath: m.shape === "tri" ? "polygon(50% 0, 100% 100%, 0 100%)" : undefined }} />
      <div style={{ position: "absolute", left: 40, top: 190, width: 170, height: 22, borderRadius: 11, background: P.navy }} />
      <svg width={170} height={70} style={{ position: "absolute", left: 40, top: 236 }}>
        <polyline points={Array.from({ length: 9 }, (_, k) => `${k * 21},${40 - Math.sin(k * 1.3 + i) * 18 - k * 2}`).join(" ")} fill="none" stroke={P.sky} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  );
};
export const C12Pick: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const swipes = markFrames(shot, "swipes");
  const pick = markFrame(shot, "pick");
  const buy = markFrame(shot, "buy");
  const phone = sp(f, -3, "land");
  let offset = 0;
  for (const s of swipes) offset += 280 * sp(f, s, "snap");
  const picked = f >= pick ? sp(f, pick, "pop") : 0;
  const press = f >= buy && f < buy + 4;
  const thumbY = f < pick ? 760 : f < buy ? 560 : 860;
  const thumbX = f < pick ? 640 - swipes.reduce((a, s) => a + (f >= s && f < s + 8 ? Math.sin(((f - s) / 8) * Math.PI) * 220 : 0), 0) : f < buy ? 470 : 470;
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.06]} seed={12}>
      <Ground color={P.cream} />
      <Cut x={140} y={300} w={800} h={800} color={P.sky} radius="50%" tone={{ side: "bottom", opacity: 0.4 }} />
      <Cut x={320} y={40 + (1 - phone) * 900} w={440} h={880} color={P.navy} radius={60} scale={impact(f, buy, 0.03, 5) || 1}>
        <div style={{ position: "absolute", left: 20, top: 70, right: 20, bottom: 60, background: P.cream, borderRadius: 30, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 96, background: P.navy }} />
          <div style={{ position: "absolute", left: 30, top: 38, width: 170, height: 18, borderRadius: 9, background: P.sky }} />
          {Array.from({ length: 5 }, (_, i) => (
            <StockCard key={i} i={i} x={70 + i * 280 - offset} picked={i === 2 ? picked : 0} />
          ))}
          <div style={{ position: "absolute", left: 40, right: 40, bottom: 40, height: 110, borderRadius: 55, background: P.orange, transform: press ? "scale(0.92, 0.84)" : `scale(${f >= buy ? 1 + 0.08 * (1 - sp(f, buy + 4, "pop")) : 1})`, filter: SHADOW }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 30, textAlign: "center", fontFamily: "Open Sans", fontWeight: 800, fontSize: 44, letterSpacing: "0.12em", color: P.ink }}>BUY</div>
          </div>
        </div>
      </Cut>
      <div style={{ position: "absolute", left: thumbX, top: thumbY, width: 130, height: 330, background: P.cream, borderRadius: "65px 65px 30px 30px", transform: `rotate(-18deg) translateY(${press ? 14 : 0}px)`, filter: SHADOW }}>
        <div style={{ position: "absolute", left: 22, top: 18, width: 86, height: 74, background: P.orangePale, borderRadius: "40px 40px 20px 20px" }} />
      </div>
      <Accents f={f} pop={pop} items={[{ x: 120, y: 160, s: 90, c: P.orange, kind: "sq", r: 10, at: 4 }, { x: 960, y: 220, s: 70, c: P.navy, kind: "dot", at: 7 }, { x: 980, y: 900, s: 100, c: P.sky, kind: "tri", r: 20, at: 10 }]} />
    </Stage>
  );
};

// ── Certificates (S13–S15) ───────────────────────────────────────────────────
const CERT_BANDS = [P.navy, P.sky, P.orange, P.sky];
const Certificate: React.FC<{ i: number; x: number; y: number; rotate: number; scale?: number; children?: React.ReactNode }> = ({ i, x, y, rotate, scale = 1, children }) => {
  const band = CERT_BANDS[i % CERT_BANDS.length];
  return (
    <Cut x={x} y={y} w={640} h={430} color={P.cream} radius={10} rotate={rotate} scale={scale}>
      <div style={{ position: "absolute", inset: 18, border: `24px solid ${band}`, borderRadius: 4 }}>
        <div style={{ position: "absolute", inset: -24, ...halftone(P.cream, 10, 0.22), opacity: 0.45, WebkitMaskImage: "linear-gradient(#000,#000), linear-gradient(#000,#000)", maskComposite: "exclude" }} />
      </div>
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
const REST: Array<[number, number, number]> = [
  [180, 340, -7],
  [240, 300, 5],
  [200, 330, -3],
  [220, 310, 1.5],
];
const Stack: React.FC<{ f: number; frames: number[] }> = ({ f, frames }) => (
  <>
    {frames.map((f0, i) => {
      if (f < f0 - 6) return null;
      const t = sp(f, f0 - 6, "land");
      const [x, y, r] = REST[i % REST.length];
      const [px, py] = arc([x + 900, y - 800], [x, y], Math.min(1, t), 0.15);
      return (
        <div key={i} style={{ position: "absolute", inset: 0, transform: impact(f, f0, 0.05, 5) }}>
          <Certificate i={i} x={px} y={py} rotate={r + (1 - t) * 35} />
        </div>
      );
    })}
  </>
);

// ── S13 · THE STACK — one certificate per beat.
export const C13Stack: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.06]} seed={13}>
      <Ground color={P.navy} tone={P.ink} />
      <Stack f={f} frames={markFrames(shot, "flicks")} />
      <Accents f={f} pop={pop} items={[{ x: 120, y: 140, s: 80, c: P.orange, kind: "dot", at: 36 }, { x: 960, y: 900, s: 90, c: P.cream, kind: "sq", r: 14, at: 38 }]} />
    </Stage>
  );
};

// ── S14 · THE PROOF LINE — the top certificate lifts to camera.
export const C14Proof: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const t = textOf("proof");
  const lift = sp(f, markFrame(shot, "lift"), "land");
  const tIn = sp(f, t.at + 6, "pop");
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.04]} seed={14}>
      <Ground color={P.navy} tone={P.ink} />
      <div style={{ position: "absolute", inset: 0, opacity: 1 - lift * 0.5 }}>
        <Stack f={f} frames={[-40, -40, -40]} />
      </div>
      <Certificate i={3} x={220} y={310 - lift * 20} rotate={1.5 * (1 - lift) + wander(f, 2, 0.4)} scale={1 + lift * 0.5}>
        <div style={{ position: "absolute", left: 70, right: 70, top: 120, textAlign: "center", fontFamily: "Open Sans", fontWeight: 800, fontSize: 46, lineHeight: 1.12, color: t.color, opacity: f < t.at + 6 ? 0 : 1, transform: `translateY(${(1 - tIn) * 30}px)` }}>
          {t.text}
        </div>
        <div style={{ position: "absolute", left: 230, top: 300, width: 180 * tIn, height: 12, background: P.orange, borderRadius: 6 }} />
      </Certificate>
    </Stage>
  );
};

// ── S15 · THE LAST DAB — "Customer by habit." then, after the break,
// "Shareholder by choice." stamps onto a navy band.
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
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.05]} seed={15}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shake}px, ${shake * 0.5}px) scale(${1 + lean * 0.05 - (f >= s.at ? sp(f, s.at, "snap") * 0.05 : 0)})`, transformOrigin: "540px 600px" }}>
        <Ground color={P.cream} />
        <Cut x={520} y={-260} w={820} h={820} color={P.orange} radius="50%" scale={sp(f, -2, "land")} tone={{ side: "bottom", opacity: 0.4 }} />
        <RevealType text={c.text} x={40} y={90} size={170} color={c.color} lineHeight={0.95} f={f} at={c.at + 2} stagger={2} spring={(f, at) => sp(f, at, "settle")} opacity={f >= s.at ? 1 - clamp((f - s.at) / 6) * 0.55 : 1} />
        <div style={{ position: "absolute", left: -900 - (1 - band) * 2600, top: 600, width: 3000, height: 330, background: P.navy, transform: "rotate(-6deg)", transformOrigin: "50% 50%", filter: SHADOW }}>
          <div style={{ position: "absolute", inset: 0, ...halftone(P.ink, 12, 0.28), opacity: 0.45 }} />
        </div>
        {f >= s.at ? <Type text={s.text} x={50} y={622} size={150} color={s.color} lineHeight={0.92} rotate={-6} transform={`scale(${stamp})`} origin="30% 50%" /> : null}
        <div style={{ position: "absolute", left: 60, top: 960, width: 700 * under, height: 30, background: P.orange, transform: "rotate(-6deg)", transformOrigin: "0 50%", filter: SHADOW }} />
        <Accents
          f={f}
          pop={pop}
          items={[
            { x: 980, y: 560, s: 90, c: P.sky, kind: "sq", r: 18, at: s.at + 3 },
            { x: 100, y: 540, s: 60, c: P.sky, kind: "dot", at: s.at + 5 },
            { x: 900, y: 1000, s: 90, c: P.orange, kind: "tri", r: -10, at: s.at + 7 },
          ]}
        />
      </div>
    </Stage>
  );
};

// ── S16 · END CARD — MAPS on the final hit; the sun peeks back in for the loop.
export const C16End: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const t = textOf("now-open");
  const logo = markFrame(shot, "logo");
  const ghost = markFrame(shot, "loopGhost");
  const s = popIn(f, logo, "pop", 0.4);
  const bar = clamp((f - logo - 6) / 8);
  const under = clamp((f - t.at - 8) / 10);
  const peek = easeIO(clamp((f - ghost) / 18));
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.03]} seed={16}>
      <Ground color={P.cream} />
      <Cut x={1080 - peek * 260} y={-160} w={880} h={880} color={P.orange} radius="50%" tone={{ side: "bottom", opacity: 0.45 }} />
      <div style={{ position: "absolute", left: 540 - 300, top: 260, width: 600, transform: `scale(${s})`, transformOrigin: "50% 60%" }}>
        <Misreg f={f} at={logo} len={5}>
          <MapsLogo width={600} variant="bar-navy" barReveal={bar} />
        </Misreg>
      </div>
      <Label text={t.text} x={0} y={680} width={1080} align="center" size={40} color={t.color} weight={800} tracking={0.3} opacity={clamp((f - t.at - 4) / 6)} />
      <div style={{ position: "absolute", left: 540 - 260, top: 742, width: 520 * under, height: 14, borderRadius: 7, background: P.orange }} />
    </Stage>
  );
};
