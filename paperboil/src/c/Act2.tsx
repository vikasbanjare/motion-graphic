import { useCurrentFrame } from "remotion";
import { clamp, easeIn, easeIO, impact, popIn, sp, wander } from "../motion";
import { palette as P } from "../palette";
import { markFrame, shotDuration, type Shot } from "../storyboard";
import { Accents, Cut, Drift, Ground, halftone, RevealType, SHADOW, SHADOW_SOFT, Stage, STAGE_H, STAGE_W } from "./kit";
import { textOf } from "./text";

type ShotProps = { shot: Shot };
const pop = (f: number, at: number) => popIn(f, at, "pop", 0.2);
const settle = (f: number, at: number) => sp(f, at, "settle");

/** Cut-paper padlock. `open` 0→1 lifts and swings the shackle. */
const Padlock: React.FC<{ x: number; y: number; body: string; hole: string; open?: number; jiggle?: number; scale?: number }> = ({ x, y, body, hole, open = 0, jiggle = 0, scale = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 440, height: 600, transform: `rotate(${jiggle}deg) scale(${scale})`, transformOrigin: "50% 80%", filter: SHADOW }}>
    <div
      style={{
        position: "absolute",
        left: 78,
        top: 20,
        width: 284,
        height: 320,
        border: `58px solid ${body}`,
        borderBottom: "none",
        borderRadius: "142px 142px 0 0",
        boxSizing: "border-box",
        transform: `translateY(${-open * 100}px) rotate(${open * 28}deg)`,
        transformOrigin: "85% 100%",
      }}
    />
    <div style={{ position: "absolute", left: 20, top: 270, width: 400, height: 320, background: body, borderRadius: 40, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, ...halftone("rgba(0,0,0,0.35)", 12, 0.28), opacity: 0.35, WebkitMaskImage: "linear-gradient(90deg, transparent 58%, #000 58%)", maskImage: "linear-gradient(90deg, transparent 58%, #000 58%)" }} />
      <div style={{ position: "absolute", left: 167, top: 96, width: 66, height: 66, borderRadius: "50%", background: hole }} />
      <div style={{ position: "absolute", left: 183, top: 140, width: 34, height: 88, background: hole, clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)" }} />
    </div>
  </div>
);

// ── S7 · LOCKED — inside the 0: a padlock drops in and rattles. ──────────────
export const C7Locked: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const line = textOf("somebody");
  const drop = sp(f, -3, "land");
  const rattle = f > 14 && f < 26 ? Math.sin(f * 2.2) * 5 : wander(f, 1, 1.2);
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.08]} seed={7} origin={[1350, 640]}>
      <Ground color={P.orange} tone={P.orangeDeep} />
      <Drift f={f} seed={11} amp={8}>
        <div style={{ position: "absolute", left: 960, top: 90, width: 860, height: 860, borderRadius: "50%", border: `96px solid ${P.orangeDeep}`, boxSizing: "border-box", opacity: 0.35 }} />
      </Drift>
      <Padlock x={1170} y={260 + (1 - drop) * -1000} body={P.navy} hole={P.orange} jiggle={rattle} />
      <RevealType text={line.text} x={100} y={170} size={190} color={line.color} lineHeight={0.95} f={f} at={line.at} stagger={2} spring={settle} />
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
  const LX = 1180;
  const LY = 300;
  return (
    <Stage dur={shotDuration(shot)} push={[1.03, 1.1]} seed={8} origin={[960, 540]}>
      <Ground color={P.navy} tone={P.ink} />
      <div style={{ position: "absolute", inset: 0, transform: `translate(${fall * 160}px, ${fall * 1000}px) rotate(${fall * 38}deg)`, transformOrigin: `${LX + 220}px ${LY + 440}px` }}>
        <Padlock x={LX} y={LY} body={P.orange} hole={P.navy} open={open} scale={impact(f, latch, 0.06, 6) ? 1.02 : 1} />
        <div style={{ position: "absolute", left: LX + 200, top: LY + 400, width: 320, height: 76, transform: `rotate(${-keyRot}deg)`, transformOrigin: "20px 38px", filter: SHADOW }}>
          <div style={{ position: "absolute", left: 0, top: 24, width: 214, height: 28, background: P.cream, borderRadius: 6 }} />
          <div style={{ position: "absolute", left: 184, top: 0, width: 120, height: 76, background: P.cream, borderRadius: "50%" }} />
          <div style={{ position: "absolute", left: 222, top: 24, width: 44, height: 28, background: P.navy, borderRadius: "50%" }} />
        </div>
      </div>
      <div style={{ position: "absolute", left: 100, top: 170, fontFamily: "Open Sans", fontWeight: 800, fontSize: 330, lineHeight: 0.86, letterSpacing: "-0.04em", color: t.color, filter: SHADOW, transform: `scale(${f < t.at ? 0 : 1 + 0.4 * (1 - s1)})`, transformOrigin: "0% 50%" }}>
        NOT
      </div>
      <div style={{ position: "absolute", left: 100, top: 470, fontFamily: "Open Sans", fontWeight: 800, fontSize: 250, lineHeight: 0.86, letterSpacing: "-0.04em", color: P.cream, filter: SHADOW, transform: `scale(${f < t.at + 3 ? 0 : 1 + 0.4 * (1 - s2)})`, transformOrigin: "0% 50%" }}>
        ANYMORE.
      </div>
      <Accents f={f} pop={pop} items={[{ x: 1760, y: 160, s: 90, c: P.orange, kind: "tri", r: 15, at: 8 }, { x: 980, y: 880, s: 54, c: P.sky, kind: "dot", at: 11 }, { x: 260, y: 900, s: 140, c: P.sky, kind: "bar", r: 8, at: 14 }]} />
    </Stage>
  );
};

// ── S9 · THE DOOR — a cut-paper door swings open onto light. ────────────────
export const C9Door: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const t = textOf("door");
  const frame = sp(f, -4, "land");
  const swing = f < 6 ? 0 : sp(f, 6, "land");
  const DX = 1140;
  const DY = 160;
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.1]} seed={9} origin={[DX + 230, 640]}>
      <Ground color={P.navy} tone={P.ink} />
      {swing > 0.2
        ? Array.from({ length: 7 }, (_, i) => {
            const a = -0.9 + i * 0.3;
            return <div key={i} style={{ position: "absolute", left: DX + 230, top: 900, width: 1100 * swing, height: 46, background: i % 2 ? P.cream : P.orangePale, transform: `rotate(${a * 57 + 90}deg)`, transformOrigin: "0 50%", opacity: 0.22 * swing * (0.8 + 0.2 * Math.sin(f / 2.5 + i)) }} />;
          })
        : null}
      <Cut x={DX} y={DY + (1 - frame) * 1000} w={470} h={820} color={P.cream} radius="235px 235px 0 0">
        <div style={{ position: "absolute", left: 36, top: 36, right: 36, bottom: 0, borderRadius: "199px 199px 0 0", background: `radial-gradient(ellipse at 50% 70%, #ffffff 0%, ${P.orangePale} 50%, ${P.cream} 100%)`, opacity: swing }} />
        {/* A glimpse of the colour world through the doorway: the sun rising. */}
        <div style={{ position: "absolute", left: 36, top: 36, right: 36, bottom: 0, borderRadius: "199px 199px 0 0", overflow: "hidden", opacity: swing }}>
          <div style={{ position: "absolute", left: 70, top: 560 - swing * 120 - f * 1.2, width: 300, height: 300, borderRadius: "50%", background: P.orange }} />
        </div>
      </Cut>
      <div style={{ position: "absolute", left: DX + 36, top: DY + 36 + (1 - frame) * 1000, width: 398, height: 784, perspective: 1400 }}>
        <div style={{ position: "absolute", inset: 0, transform: `rotateY(${-swing * 105}deg)`, transformOrigin: "0% 50%", background: P.orange, borderRadius: "199px 199px 0 0", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, ...halftone("rgba(120,30,0,0.5)", 12, 0.28), opacity: 0.35 }} />
          <div style={{ position: "absolute", left: 310, top: 410, width: 48, height: 48, borderRadius: "50%", background: P.cream }} />
          <div style={{ position: "absolute", left: 50, top: 120, right: 50, height: 240, border: `10px solid ${P.orangeDeep}`, borderRadius: "140px 140px 8px 8px" }} />
          <div style={{ position: "absolute", left: 50, top: 410, right: 140, height: 310, border: `10px solid ${P.orangeDeep}`, borderRadius: 8 }} />
        </div>
      </div>
      {/* Dust motes drifting out of the doorway into the dark: the hold keeps moving. */}
      {swing > 0.4
        ? Array.from({ length: 16 }, (_, i) => {
            const life = ((f * (0.9 + (i % 5) * 0.12) + i * 23) % 60) / 60;
            const x = DX + 120 + ((i * 53) % 260) - life * (220 + (i % 4) * 90);
            const y = DY + 560 - ((i * 37) % 300) - life * (140 + (i % 3) * 60) + Math.sin(life * 6 + i) * 18;
            const r = 5 + (i % 4) * 3;
            return <div key={`m${i}`} style={{ position: "absolute", left: x, top: y, width: r, height: r, borderRadius: "50%", background: P.cream, opacity: Math.sin(life * Math.PI) * 0.7 * swing }} />;
          })
        : null}
      <RevealType text={t.text} x={100} y={320} size={140} color={t.color} lineHeight={0.96} f={f} at={t.at + 2} stagger={2} spring={settle} />
    </Stage>
  );
};

// ── S10 · THE BUILD — the five things from your day orbit a growing orange
// disc, tighten and speed up with the riser, then fly at camera on the rush.
// At 15.2 s everything freezes and pulls back (the vacuum); a ghost of the
// drop's sun flickers in at 15.8.
export const Sticker: React.FC<{ kind: number }> = ({ kind }) => {
  const box = (c: string, extra?: React.CSSProperties): React.CSSProperties => ({ position: "absolute", background: c, ...extra });
  return (
    <div style={{ position: "absolute", inset: 0, background: P.cream, borderRadius: 34, boxShadow: `0 0 0 8px ${P.cream}`, filter: SHADOW_SOFT }}>
      {kind === 0 ? (
        <>
          <div style={box(P.navy, { left: 66, top: 26, width: 88, height: 168, borderRadius: 18 })} />
          <div style={box(P.sky, { left: 76, top: 48, width: 68, height: 116, borderRadius: 8 })} />
        </>
      ) : null}
      {kind === 1 ? (
        <>
          <div style={box(P.navy, { left: 28, top: 50, width: 164, height: 110, borderRadius: 12 })} />
          <div style={box(P.orange, { left: 92, top: 78, width: 46, height: 54, clipPath: "polygon(0 0, 100% 50%, 0 100%)" })} />
        </>
      ) : null}
      {kind === 2 ? (
        <>
          <div style={{ position: "absolute", left: 40, top: 40, width: 100, height: 100, borderRadius: "50%", border: `22px solid ${P.navy}`, boxSizing: "border-box" }} />
          <div style={box(P.navy, { left: 128, top: 128, width: 66, height: 26, borderRadius: 13, transform: "rotate(45deg)", transformOrigin: "0 50%" })} />
        </>
      ) : null}
      {kind === 3 ? (
        <>
          <div style={box(P.cream, { left: 60, top: 70, width: 90, height: 44, borderRadius: "24px 30px 0 0", boxShadow: `0 0 0 6px ${P.navy}` })} />
          <div style={box(P.orange, { left: 26, top: 104, width: 168, height: 48, borderRadius: 20 })} />
          <div style={box(P.ink, { left: 46, top: 138, width: 34, height: 34, borderRadius: "50%" })} />
          <div style={box(P.ink, { left: 140, top: 138, width: 34, height: 34, borderRadius: "50%" })} />
        </>
      ) : null}
      {kind === 4 ? (
        <>
          <div style={box(P.orange, { left: 26, top: 56, width: 168, height: 106, borderRadius: 14, transform: "rotate(-8deg)" })} />
          <div style={box(P.cream, { left: 46, top: 84, width: 34, height: 26, borderRadius: 5, transform: "rotate(-8deg)" })} />
        </>
      ) : null}
    </div>
  );
};

export const C10Tunnel: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const rush = markFrame(shot, "rush");
  const vacuum = markFrame(shot, "vacuum");
  const ghost = markFrame(shot, "ghost");
  const live = Math.min(f, vacuum);
  const inVac = f >= vacuum;
  const pull = inVac ? easeIO(clamp((f - vacuum) / 8)) : 0;
  const grow = easeIO(clamp(live / vacuum));
  const R = 170 + grow * 330;
  const spin = live * 0.035 + Math.max(0, live - rush) * 0.06;
  const fly = easeIn(clamp((live - rush) / (vacuum - rush)));
  const rays = Math.max(0, live - rush);
  return (
    <Stage dur={shotDuration(shot)} push={[1.0, 1.0]} seed={10}>
      <Ground color={P.cream} />
      <div style={{ position: "absolute", left: 0, top: 0, width: STAGE_W, height: STAGE_H, transform: `scale(${1 - pull * 0.06})`, transformOrigin: "960px 540px", filter: inVac ? `saturate(${1 - pull * 0.6})` : undefined }}>
        {/* Sunburst behind the disc, turning faster with the build. */}
        <div style={{ position: "absolute", left: 960 - 1300, top: 540 - 1300, width: 2600, height: 2600, transform: `rotate(${live * 0.5 + rays * 1.2}deg)`, opacity: 0.18 + grow * 0.22 }}>
          {Array.from({ length: 24 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 1300, top: 1300 - 40, width: 1300, height: 80, background: i % 2 ? P.sky : P.orangePale, transform: `rotate(${i * 15}deg)`, transformOrigin: "0 50%", clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }} />
          ))}
        </div>
        <Cut x={960 - R} y={540 - R} w={R * 2} h={R * 2} color={P.orange} radius="50%" tone={{ side: "bottom", opacity: 0.35 }} />
        {Array.from({ length: 5 }, (_, i) => {
          const a = (i / 5) * Math.PI * 2 + spin;
          const orbit = (560 - grow * 140) * (1 + fly * 1.6);
          const x = 960 + Math.cos(a) * orbit * 1.25;
          const y = 540 + Math.sin(a) * orbit * 0.62;
          const sc = 0.9 + fly * 1.8 + Math.sin(f / 6 + i) * 0.03;
          const enter = sp(f, i * 2 - 6, "pop");
          return (
            <div key={i} style={{ position: "absolute", left: x - 110, top: y - 110, width: 220, height: 220, transform: `scale(${sc * enter}) rotate(${Math.sin(a) * 12 + wander(f, i, 4)}deg)`, opacity: 1 - fly * 0.4 }}>
              <Sticker kind={i} />
            </div>
          );
        })}
        {rays > 0 && !inVac
          ? Array.from({ length: 22 }, (_, i) => {
              const a = (i / 22) * 360;
              const d = 260 + ((i * 97 + f * 70) % 900);
              return <div key={i} style={{ position: "absolute", left: 960, top: 536, width: 200, height: 9, background: i % 2 ? P.navy : P.orange, transform: `rotate(${a}deg) translateX(${d}px)`, transformOrigin: "0 50%", opacity: 0.7 }} />;
            })
          : null}
      </div>
      {inVac ? <div style={{ position: "absolute", left: -1000, top: -1000, width: STAGE_W + 2000, height: STAGE_H + 2000, background: P.cream, opacity: 0.25 + pull * 0.3 }} /> : null}
      {f >= ghost ? <div style={{ position: "absolute", left: 960 - 160, top: 540 - 160, width: 320, height: 320, borderRadius: "50%", background: P.orange, opacity: 0.5, transform: `scale(${1 + (f - ghost) * 0.3})` }} /> : null}
    </Stage>
  );
};
