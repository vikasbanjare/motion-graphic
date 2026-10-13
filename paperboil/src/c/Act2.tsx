import { useCurrentFrame } from "remotion";
import { clamp, easeIn, easeIO, impact, popIn, sp, wander } from "../motion";
import { palette as P } from "../palette";
import { markFrame, shotDuration, type Shot } from "../storyboard";
import { Accents, Cut, Ground, halftone, SHADOW, Stage, STAGE, Type } from "./kit";
import { textOf } from "./text";

type ShotProps = { shot: Shot };
const pop = (f: number, at: number) => popIn(f, at, "pop", 0.2);

/** Cut-paper padlock. `open` 0→1 lifts and swings the shackle. */
const Padlock: React.FC<{ x: number; y: number; body: string; hole: string; open?: number; jiggle?: number; scale?: number; rotate?: number }> = ({ x, y, body, hole, open = 0, jiggle = 0, scale = 1, rotate = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 400, height: 560, transform: `rotate(${rotate + jiggle}deg) scale(${scale})`, transformOrigin: "50% 80%", filter: SHADOW }}>
    <div
      style={{
        position: "absolute",
        left: 70,
        top: 20,
        width: 260,
        height: 300,
        border: `52px solid ${body}`,
        borderBottom: "none",
        borderRadius: "130px 130px 0 0",
        boxSizing: "border-box",
        transform: `translateY(${-open * 90}px) rotate(${open * 28}deg)`,
        transformOrigin: "85% 100%",
      }}
    />
    <div style={{ position: "absolute", left: 20, top: 250, width: 360, height: 300, background: body, borderRadius: 36, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, ...halftone("rgba(0,0,0,0.35)", 12, 0.28), opacity: 0.35, WebkitMaskImage: "linear-gradient(90deg, transparent 58%, #000 58%)", maskImage: "linear-gradient(90deg, transparent 58%, #000 58%)" }} />
      <div style={{ position: "absolute", left: 150, top: 90, width: 60, height: 60, borderRadius: "50%", background: hole }} />
      <div style={{ position: "absolute", left: 165, top: 130, width: 30, height: 80, background: hole, clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)" }} />
    </div>
  </div>
);

// ── S7 · LOCKED — inside the 0: a padlock drops in and rattles. ──────────────
export const C7Locked: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const line = textOf("somebody");
  const drop = sp(f, -2, "land");
  const rattle = f > 14 && f < 26 ? Math.sin(f * 2.2) * 5 : wander(f, 1, 1);
  const tIn = sp(f, line.at + 2, "snap");
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.1]} seed={7} origin={[540, 640]}>
      <Ground color={P.orange} tone={P.orangeDeep} />
      <div style={{ position: "absolute", left: 140, top: 150, width: 800, height: 800, borderRadius: "50%", border: `90px solid ${P.orangeDeep}`, boxSizing: "border-box", opacity: 0.35 }} />
      <Padlock x={340} y={300 + (1 - drop) * -900} body={P.navy} hole={P.orange} jiggle={rattle} />
      <Type text={line.text} x={40 - (1 - tIn) * 1100} y={40} size={118} color={line.color} lineHeight={0.92} />
    </Stage>
  );
};

// ── S8 · NOT ANYMORE — colour flips on the bass return; the key turns, the
// shackle springs open and the lock tumbles out of frame.
export const C8NotAnymore: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const t = textOf("not-anymore");
  const turn = markFrame(shot, "keyTurn");
  const latch = markFrame(shot, "latch");
  const swing = markFrame(shot, "swing");
  const keyRot = 90 * sp(f, turn, "snap");
  const open = sp(f, latch, "loose");
  const fall = easeIn(clamp((f - swing - 6) / 14));
  const s1 = sp(f, t.at, "snap");
  const s2 = sp(f, t.at + 3, "snap");
  return (
    <Stage dur={shotDuration(shot)} push={[1.04, 1.12]} seed={8}>
      <Ground color={P.navy} tone={P.ink} />
      <div style={{ position: "absolute", left: 0, top: 0, width: STAGE, height: STAGE, transform: `translate(${fall * 120}px, ${fall * 900}px) rotate(${fall * 40}deg)`, transformOrigin: "540px 700px" }}>
        <Padlock x={560} y={400} body={P.orange} hole={P.navy} open={open} scale={impact(f, latch, 0.06, 6) ? 1.02 : 1} />
        <div style={{ position: "absolute", left: 760 - 20, top: 760, width: 300, height: 70, transform: `rotate(${-keyRot}deg)`, transformOrigin: "20px 35px", filter: SHADOW }}>
          <div style={{ position: "absolute", left: 0, top: 22, width: 200, height: 26, background: P.cream, borderRadius: 6 }} />
          <div style={{ position: "absolute", left: 170, top: 0, width: 110, height: 70, background: P.cream, borderRadius: "50%" }} />
          <div style={{ position: "absolute", left: 205, top: 22, width: 40, height: 26, background: P.navy, borderRadius: "50%" }} />
        </div>
      </div>
      <Type text={"NOT"} x={50} y={60} size={250} color={t.color} transform={`scale(${f < t.at ? 0 : 1 + 0.4 * (1 - s1)})`} origin="0% 50%" />
      <Type text={"ANYMORE."} x={50} y={270} size={200} color={P.cream} transform={`scale(${f < t.at + 3 ? 0 : 1 + 0.4 * (1 - s2)})`} origin="0% 50%" />
      <Accents f={f} pop={pop} items={[{ x: 930, y: 150, s: 80, c: P.orange, kind: "tri", r: 15, at: 8 }, { x: 860, y: 330, s: 46, c: P.sky, kind: "dot", at: 11 }, { x: 140, y: 960, s: 110, c: P.blueBright, kind: "bar", r: 8, at: 14 }]} />
    </Stage>
  );
};

// ── S9 · THE DOOR — a cut-paper door swings open onto light. ────────────────
export const C9Door: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const t = textOf("door");
  const frame = sp(f, -3, "land");
  const swing = f < 6 ? 0 : sp(f, 6, "land");
  const tIn = sp(f, t.at + 2, "pop");
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.12]} seed={9} origin={[560, 600]}>
      <Ground color={P.navy} tone={P.ink} />
      <Cut x={430} y={240 + (1 - frame) * 900} w={460} h={800} color={P.cream} radius="230px 230px 0 0">
        <div style={{ position: "absolute", left: 36, top: 36, right: 36, bottom: 0, borderRadius: "194px 194px 0 0", background: `radial-gradient(ellipse at 50% 70%, #ffffff 0%, ${P.orangePale} 45%, ${P.orangeLight} 100%)`, opacity: swing }} />
      </Cut>
      <div style={{ position: "absolute", left: 466, top: 276 + (1 - frame) * 900, width: 388, height: 764, perspective: 1400 }}>
        <div style={{ position: "absolute", inset: 0, transform: `rotateY(${-swing * 105}deg)`, transformOrigin: "0% 50%", background: P.orange, borderRadius: "194px 194px 0 0", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, ...halftone("rgba(120,30,0,0.5)", 12, 0.28), opacity: 0.35 }} />
          <div style={{ position: "absolute", left: 300, top: 400, width: 46, height: 46, borderRadius: "50%", background: P.cream }} />
          <div style={{ position: "absolute", left: 50, top: 120, right: 50, height: 230, border: `10px solid ${P.orangeDeep}`, borderRadius: "140px 140px 8px 8px" }} />
          <div style={{ position: "absolute", left: 50, top: 400, right: 140, height: 300, border: `10px solid ${P.orangeDeep}`, borderRadius: 8 }} />
        </div>
      </div>
      {swing > 0.2
        ? Array.from({ length: 7 }, (_, i) => {
            const a = -0.9 + i * 0.3;
            return <div key={i} style={{ position: "absolute", left: 660, top: 680, width: 900 * swing, height: 40, background: i % 2 ? P.orangeLight : P.orangePale, transform: `rotate(${a * 57 + 90}deg)`, transformOrigin: "0 50%", opacity: 0.25 * swing }} />;
          })
        : null}
      <Type text={t.text} x={40} y={40 - (1 - tIn) * 500} size={96} color={t.color} lineHeight={0.95} />
    </Stage>
  );
};

// ── S10 · THE TUNNEL — rings rush past and accelerate; at 15.2 s everything
// freezes and pulls back (the vacuum); a ghost of the drop's sun flickers in.
const RING_COLORS = [P.orange, P.navy, P.cream, P.blueBright, P.orangeLight, P.sky];
export const C10Tunnel: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const rush = markFrame(shot, "rush");
  const vacuum = markFrame(shot, "vacuum");
  const ghost = markFrame(shot, "ghost");
  const live = Math.min(f, vacuum);
  const travel = live * 0.03 + Math.max(0, live - rush) * 0.05;
  const inVac = f >= vacuum;
  const pull = inVac ? easeIO(clamp((f - vacuum) / 8)) : 0;
  const rings = Array.from({ length: 14 }, (_, k) => {
    const idx = k - (travel % 1);
    const r = 60 * Math.pow(1.42, idx + 1);
    const colorIdx = (k + Math.floor(travel)) % RING_COLORS.length;
    return { r, c: RING_COLORS[(RING_COLORS.length - colorIdx) % RING_COLORS.length] };
  }).reverse();
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.0]} seed={10}>
      <Ground color={P.cream} />
      <div style={{ position: "absolute", inset: 0, transform: `scale(${1 - pull * 0.06}) rotate(${live * 0.4}deg)`, transformOrigin: "540px 540px", filter: inVac ? `saturate(${1 - pull * 0.6})` : undefined }}>
        {rings.map(({ r, c }, i) => (
          <div key={i} style={{ position: "absolute", left: 540 - r, top: 540 - r, width: r * 2, height: r * 2, borderRadius: "50%", background: c, boxShadow: "10px 14px 0 rgba(0,32,66,0.18)" }} />
        ))}
        {f >= rush && !inVac
          ? Array.from({ length: 18 }, (_, i) => {
              const a = (i / 18) * 360;
              const d = 200 + ((i * 97 + f * 60) % 600);
              return <div key={i} style={{ position: "absolute", left: 540, top: 536, width: 160, height: 8, background: P.cream, transform: `rotate(${a}deg) translateX(${d}px)`, transformOrigin: "0 50%", opacity: 0.8 }} />;
            })
          : null}
      </div>
      {inVac ? <div style={{ position: "absolute", left: -1200, top: -1200, width: 3480, height: 3480, background: P.cream, opacity: 0.25 + pull * 0.3 }} /> : null}
      {f >= ghost ? <div style={{ position: "absolute", left: 540 - 140, top: 540 - 140, width: 280, height: 280, borderRadius: "50%", background: P.orange, opacity: 0.5, transform: `scale(${1 + (f - ghost) * 0.25})` }} /> : null}
    </Stage>
  );
};
