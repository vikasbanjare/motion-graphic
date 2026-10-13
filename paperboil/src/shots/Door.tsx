import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Shadow } from "../components/Decor";
import { PaintedLayer } from "../components/PaintedLayer";
import { arc, clamp, easeIn, easeIO, impact, sp, stretch, wander } from "../motion";
import { Morph } from "../motion/Morph";
import { archPath, ellipsePath } from "../motion/shapes";
import { palette } from "../palette";
import { Sprite } from "../paint/Sprite";
import * as S from "../paint/sprites";
import { markFrame, type Shot } from "../storyboard";

type ShotProps = { shot: Shot };

// ── S6 · THE ZERO ────────────────────────────────────────────────────────────
// Stickers fly in on staggered arcs and hang in a slowly orbiting ring. They
// start to tremble just before the bass drops out; the giant 0 slams in on the
// hole in the music, shoves the ring outward and drains its colour. Then the
// 0 morphs into the arched door in 8 frames.
const STICKERS = [S.stickerPhone, S.stickerTv, S.stickerPill, S.stickerCab, S.stickerTick];
const DOOR_X = 270;
const DOOR_Y = 150;

export const S6Zero: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const zero = markFrame(shot, "zero");
  const morph = markFrame(shot, "morph");
  const slam = f >= zero ? 1 + 0.9 * (1 - sp(f, zero, "snap")) : 0;
  const shake = f >= zero && f < zero + 7 ? Math.sin((f - zero) * 2.4) * (7 - (f - zero)) * 2.2 : 0;
  const push = sp(f, zero, "loose");
  const drain = clamp((f - zero) / 4);
  const tremble = f > zero - 24 && f < zero ? ((f - (zero - 24)) / 24) * 3 : 0;
  const m = easeIO(clamp((f - morph) / 8));
  const doorIn = clamp((f - morph - 6) / 4);
  return (
    <PaintedLayer shot={shot} push={[1.0, 1.1]}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shake}px, ${shake * 0.6}px)` }}>
        {STICKERS.map((draw, i) => {
          const at = i * 3;
          const t = sp(f, at, "land");
          const a = (i / STICKERS.length) * Math.PI * 2 - Math.PI / 2 + f * 0.004;
          const r = 380 + push * 70 + m * 400;
          const home: [number, number] = [500 + Math.cos(a) * r, 500 + Math.sin(a) * r];
          const [x, y] = arc([-200, 1150], home, t, 0.3);
          const bob = wander(f, i * 2, 8) + Math.sin(f * 2.1 + i) * tremble;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x - 100,
                top: y - 100 + bob,
                width: 200,
                height: 200,
                transform: `scale(${0.4 + t * 0.6}) rotate(${(i - 2) * 7 + (1 - t) * 90 + wander(f, i, 3)}deg)`,
                filter: `grayscale(${drain}) brightness(${1 - drain * 0.35}) sepia(${drain * 0.25}) hue-rotate(${drain * 170}deg)`,
                opacity: 1 - m,
              }}
            >
              <Sprite id={`s6-sticker-${i}`} w={200} h={200} draw={draw} />
            </div>
          );
        })}
        {f >= zero && m < 0.5 ? (
          <div
            style={{
              position: "absolute",
              left: 500 - S.ZERO_W / 2,
              top: 500 - S.ZERO_H / 2,
              width: S.ZERO_W,
              height: S.ZERO_H,
              transform: `scale(${slam * (1 + clamp((f - zero) / 30) * 0.04)}) ${impact(f, zero + 3, 0.12, 6)}`,
            }}
          >
            <Sprite id="s6-zero" w={S.ZERO_W} h={S.ZERO_H} draw={S.zero} />
          </div>
        ) : null}
        {m > 0 && m < 1 ? <Morph from={ellipsePath(500, 500, 250, 350)} to={archPath(DOOR_X, DOOR_Y, S.DOOR_W, S.DOOR_H)} p={m} fillFrom={palette.orange} fillTo={palette.slate} /> : null}
        {doorIn > 0 ? <Sprite id="s7-door" w={S.DOOR_W} h={S.DOOR_H} draw={S.door} x={DOOR_X} y={DOOR_Y} style={{ opacity: doorIn }} /> : null}
      </div>
    </PaintedLayer>
  );
};

// ── S7–S8 · THE DOOR ─────────────────────────────────────────────────────────
// One world, two beats. S7: the key is thrown in on an arc, spinning, and
// lands in the lock. S8: on the bass return it turns (snap + squash), the
// latch jolts, and the door swings open on a heavy spring with a little
// overshoot, light pouring out. Short: 2.8 s total (was 8 s).
const [KX, KY] = [DOOR_X + S.KEYHOLE[0], DOOR_Y + S.KEYHOLE[1]];
const TIP: [number, number] = [318, 65];

type DoorState = { keyLaunch?: number; keyLand?: number; keyTurn?: number; latch?: number; swing?: number; keyDone?: boolean };

const DoorWorld: React.FC<{ shot: Shot; st: DoorState }> = ({ shot, st }) => {
  const f = useCurrentFrame();
  // Keyhole glow pulses on every beat (12 f) and blazes once the key turns.
  let glow = 0.3 + Math.max(0, 1 - (f % 12) / 10) * 0.5;
  if (st.keyTurn !== undefined && f >= st.keyTurn) glow = 1;

  // Key flight: arc from top-right, spinning, stretched along its velocity.
  let keyX = 0;
  let keyY = 0;
  let keyRot = 90;
  let keyStretch = "";
  let keyVisible = Boolean(st.keyDone);
  if (st.keyLaunch !== undefined && st.keyLand !== undefined) {
    const span = st.keyLand - st.keyLaunch;
    const tt = (x: number) => easeIn(clamp((x - st.keyLaunch!) / span)) ** 0.8;
    const pos = (x: number) => arc([700, -700], [0, 0], tt(x), -0.25);
    const [x0, y0] = pos(f - 1);
    [keyX, keyY] = pos(f);
    keyRot = 90 + (1 - tt(f)) * 540;
    keyStretch = f < st.keyLand ? stretch(keyX - x0, keyY - y0, 0.006, 0.35) : impact(f, st.keyLand, 0.2, 6);
    keyVisible = f >= st.keyLaunch;
  }
  if (st.keyTurn !== undefined) {
    keyRot = f < st.keyTurn ? 90 : 90 - 90 * sp(f, st.keyTurn, "snap");
    keyStretch = impact(f, st.keyTurn, 0.15, 5);
  } else if (st.keyDone) keyRot = 0;

  const landJolt = st.keyLand !== undefined && f >= st.keyLand && f < st.keyLand + 4 ? 3 : 0;
  const latchJolt = st.latch !== undefined && f >= st.latch && f < st.latch + 3 ? -5 : 0;
  const swing = st.swing !== undefined ? (f < st.swing ? 0 : sp(f, st.swing, "land")) : 0;
  const slit = st.latch !== undefined ? clamp((f - st.latch) / 5) : 0;
  const light = Math.max(slit * 0.55, swing);

  return (
    <PaintedLayer shot={shot} push={[1.0, 1.08]} origin={[KX / 1000, KY / 1000]}>
      <Shadow x={500} y={955} w={560} opacity={0.5} />
      {/* Light behind the doorway. */}
      <div
        style={{
          position: "absolute",
          left: DOOR_X,
          top: DOOR_Y,
          width: S.DOOR_W,
          height: S.DOOR_H,
          borderRadius: `${S.DOOR_W / 2}px ${S.DOOR_W / 2}px 0 0`,
          background: `radial-gradient(circle at 50% 62%, #ffffff, ${palette.orangeLight} 45%, ${palette.orange})`,
          opacity: light,
        }}
      />
      {/* Light spilling onto the floor. */}
      <div style={{ position: "absolute", left: 180, top: 900, width: 640, height: 160, borderRadius: "50%", background: `radial-gradient(closest-side, ${palette.orangeLight}, transparent)`, opacity: swing * 0.9 }} />
      <div style={{ position: "absolute", left: DOOR_X, top: DOOR_Y, width: S.DOOR_W, height: S.DOOR_H, perspective: 1400 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translate(${landJolt}px, ${latchJolt}px) rotateY(${-swing * 100}deg)`,
            transformOrigin: "0% 50%",
          }}
        >
          {slit > 0 && swing < 0.05 ? <div style={{ position: "absolute", right: -6, top: 30, width: 14, bottom: 0, background: palette.orangeLight, opacity: slit, filter: "blur(5px)" }} /> : null}
          <Sprite id="s7-door" w={S.DOOR_W} h={S.DOOR_H} draw={S.door} />
          <div
            style={{
              position: "absolute",
              left: S.KEYHOLE[0] - 80,
              top: S.KEYHOLE[1] - 80,
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: `radial-gradient(closest-side, ${palette.orangeBright}, ${palette.orange}88 45%, transparent)`,
              opacity: glow,
              mixBlendMode: "screen",
            }}
          />
          {keyVisible ? (
            <div
              style={{
                position: "absolute",
                left: S.KEYHOLE[0] - TIP[0] + keyX,
                top: S.KEYHOLE[1] - TIP[1] + keyY,
                width: S.KEY_W,
                height: S.KEY_H,
                transform: `rotate(${keyRot}deg) ${keyStretch}`,
                transformOrigin: `${TIP[0]}px ${TIP[1]}px`,
              }}
            >
              <Sprite id="s8-key" w={S.KEY_W} h={S.KEY_H} draw={S.key} />
            </div>
          ) : null}
        </div>
      </div>
      <Sprite id="s7-arch" w={600} h={940} draw={S.archFrame} x={200} y={40} />
      <div style={{ position: "absolute", left: 455, top: 790, width: 90, height: 200, transform: `translateY(${wander(f, 3, 2)}px)`, filter: light > 0 ? `drop-shadow(0 0 ${light * 18}px ${palette.orangeLight})` : undefined }}>
        <Sprite id="s7-silhouette" w={90} h={200} draw={S.silhouette} />
      </div>
    </PaintedLayer>
  );
};

export const S7Door: React.FC<ShotProps> = ({ shot }) => (
  <DoorWorld shot={shot} st={{ keyLaunch: markFrame(shot, "keyLaunch"), keyLand: markFrame(shot, "keyLand") }} />
);

export const S8Key: React.FC<ShotProps> = ({ shot }) => (
  <DoorWorld shot={shot} st={{ keyDone: true, keyTurn: markFrame(shot, "keyTurn"), latch: markFrame(shot, "latch"), swing: markFrame(shot, "swing") }} />
);

// ── S9–S10 · THROUGH THE DOOR, THE LIGHT TUNNEL, THE VACUUM ──────────────────
// The camera flies through the doorway into light: ticker tape and confetti
// stream past (perspective fly-through, every frame moves) and speed up with
// the build. At 15.2 s everything freezes and pulls back for the half-bar
// vacuum; a ghost of the burst flickers in just before the drop.
const BITS = [S.tapeOrange, S.confettiBlue, S.tapeBlue, S.confettiOrange];

const Tunnel: React.FC<{ travel: number; frozen: boolean; streaks: number }> = ({ travel, frozen, streaks }) => {
  const items = Array.from({ length: 26 }, (_, i) => {
    const a = i * 2.39996;
    const z = (((i * 0.137) % 1) + travel) % 1;
    const d = z * z;
    const r = 60 + d * 900;
    return { i, x: 500 + Math.cos(a) * r, y: 500 + Math.sin(a) * r * 0.85, s: 0.3 + d * 3.2, rot: i * 47 + travel * 400 * (i % 2 ? 1 : -1), o: Math.min(1, z * 4) * (1 - Math.max(0, (z - 0.85) / 0.15)) };
  });
  return (
    <>
      <div style={{ position: "absolute", left: 200, top: 200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(closest-side, #ffffff, #ffffffaa 40%, transparent)" }} />
      {streaks > 0 ? (
        <svg width={1000} height={1000} style={{ position: "absolute", inset: 0, opacity: streaks }}>
          {Array.from({ length: 30 }, (_, k) => {
            const a = (k / 30) * Math.PI * 2;
            const r0 = 120 + ((k * 53 + travel * 900) % 260);
            return <line key={k} x1={500 + Math.cos(a) * r0} y1={500 + Math.sin(a) * r0} x2={500 + Math.cos(a) * (r0 + 380)} y2={500 + Math.sin(a) * (r0 + 380)} stroke={k % 2 ? palette.orange : palette.blueBright} strokeWidth={9} strokeLinecap="round" />;
          })}
        </svg>
      ) : null}
      {items.map(({ i, x, y, s, rot, o }) => {
        const tape = i % 2 === 0;
        const w = tape ? 44 : 40;
        const h = tape ? 200 : 40;
        return <Sprite key={i} id={`s9-bit-${i % 4}`} w={w} h={h} draw={BITS[i % 4]} freeze={frozen} x={x - w / 2} y={y - h / 2} style={{ opacity: o, transform: `scale(${s}) rotate(${rot}deg)` }} />;
      })}
    </>
  );
};

export const S9Through: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  return (
    <PaintedLayer shot={shot} push={[1.15, 1.0]}>
      <Tunnel travel={f * 0.012} frozen={false} streaks={0} />
    </PaintedLayer>
  );
};

export const S10Tunnel: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const rush = markFrame(shot, "rush");
  const vacuum = markFrame(shot, "vacuum");
  const ghost = markFrame(shot, "ghost");
  const live = Math.min(f, vacuum);
  // Travel speeds up with the build and again on the rush.
  const travel = 48 * 0.012 + live * 0.016 + Math.max(0, live - rush) * 0.02;
  const inVacuum = f >= vacuum;
  const pull = inVacuum ? easeIO(clamp((f - vacuum) / 10)) : 0;
  const streaks = inVacuum ? 0 : clamp((f - rush) / 8);
  return (
    <>
      <PaintedLayer shot={shot} push={[1.0, 1.0]}>
        <div style={{ position: "absolute", inset: 0, transform: `scale(${1 + clamp(live / vacuum) * 0.12 - pull * 0.05})`, filter: inVacuum ? `saturate(${1 - pull * 0.5})` : undefined }}>
          <Tunnel travel={travel} frozen={inVacuum} streaks={streaks} />
        </div>
      </PaintedLayer>
      {inVacuum ? <AbsoluteFill style={{ background: palette.cream, opacity: 0.35 + pull * 0.35 }} /> : null}
      {f >= ghost ? (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: S.BACKDROP, height: S.BACKDROP, transform: `scale(${0.6 + (f - ghost) * 0.06})`, opacity: 0.25 }}>
            <Sprite id="jagged-burst" w={S.BACKDROP} h={S.BACKDROP} draw={S.jaggedBurst} />
          </div>
        </AbsoluteFill>
      ) : null}
    </>
  );
};
