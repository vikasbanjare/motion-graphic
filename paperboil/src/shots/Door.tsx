import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { PaintedLayer } from "../components/PaintedLayer";
import { palette } from "../palette";
import { Sprite } from "../paint/Sprite";
import * as S from "../paint/sprites";
import { markFrame, markFrames, shotDuration, type Shot } from "../storyboard";
import { clamp01, easeInOut, expoOut } from "../timing";

type ShotProps = { shot: Shot };

// S6 · THE ZERO ─ stickers hang in a ring; the VO asks, the picture answers.
const STICKERS = [S.stickerPhone, S.stickerTv, S.stickerPill, S.stickerCab, S.stickerTick];
const DOOR_X = 270;
const DOOR_Y = 150;

export const S6Zero: React.FC<ShotProps> = ({ shot }) => {
  const frame = useCurrentFrame();
  const zero = markFrame(shot, "zero");
  const morph = markFrame(shot, "morph");
  const end = shotDuration(shot);
  const desat = clamp01((frame - zero) / 4);
  const m = easeInOut(clamp01((frame - morph) / (end - morph)));
  const slam = interpolate(frame - zero, [0, 6], [1.7, 1], { easing: expoOut, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shake = frame >= zero && frame < zero + 6 ? Math.sin((frame - zero) * 2.6) * 10 : 0;

  return (
    <PaintedLayer shot={shot}>
      {STICKERS.map((draw, i) => {
        const a = (i / STICKERS.length) * Math.PI * 2 - Math.PI / 2;
        const bob = Math.sin(frame / 12 + i) * 8;
        const s = interpolate(frame - i * 2, [0, 6], [0.3, 1], { easing: expoOut, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 500 + Math.cos(a) * 380 - 100,
              top: 500 + Math.sin(a) * 380 - 100 + bob,
              width: 200,
              height: 200,
              transform: `scale(${s * 1.05}) rotate(${(i - 2) * 7}deg)`,
              filter: `grayscale(${desat}) brightness(${1 - desat * 0.35}) sepia(${desat * 0.25}) hue-rotate(${desat * 170}deg)`,
              opacity: 1 - m,
            }}
          >
            <Sprite id={`s6-sticker-${i}`} w={200} h={200} draw={draw} />
          </div>
        );
      })}
      {frame >= zero ? (
        <div
          style={{
            position: "absolute",
            left: 500 - S.ZERO_W / 2 + shake,
            top: 500 - S.ZERO_H / 2,
            width: S.ZERO_W,
            height: S.ZERO_H,
            // Morph: the 0 squashes into the door's arch proportions as it fades.
            transform: `scale(${slam * (1 - m * 0.18)}, ${slam * (1 + m * 0.05)})`,
            opacity: 1 - m,
          }}
        >
          <Sprite id="s6-zero" w={S.ZERO_W} h={S.ZERO_H} draw={S.zero} />
        </div>
      ) : null}
      {m > 0 ? <Sprite id="s7-door" w={S.DOOR_W} h={S.DOOR_H} draw={S.door} x={DOOR_X} y={DOOR_Y} style={{ opacity: m }} /> : null}
    </PaintedLayer>
  );
};

// S7–S9 · one door world, three beats.
type DoorState = {
  pulses?: number[];
  rattle?: number;
  keyLand?: number;
  keyTurn?: number;
  latch?: number;
  slit?: number;
  swing?: number;
  flood?: number;
  vacuum?: number;
  ghost?: number;
};

const [KX, KY] = [DOOR_X + S.KEYHOLE[0], DOOR_Y + S.KEYHOLE[1]];

const DoorWorld: React.FC<{ shot: Shot; st: DoorState }> = ({ shot, st }) => {
  const frame = useCurrentFrame();
  const vacuum = st.vacuum !== undefined && frame >= st.vacuum;

  // Keyhole glow pulses on each bar downbeat.
  let glow = 0.35;
  for (const p of st.pulses ?? []) if (frame >= p) glow = Math.max(glow, 1 - (frame - p) / 30);
  if (st.keyTurn !== undefined && frame >= st.keyTurn) glow = 1;

  const rattle = st.rattle !== undefined && frame >= st.rattle && frame < st.rattle + 6 ? Math.sin((frame - st.rattle) * 3) * 4 : 0;
  const latch = st.latch !== undefined && frame >= st.latch && frame < st.latch + 3 ? 3 : 0;

  // Key: falls from the top, lands at keyLand, turns at keyTurn.
  let keyY = -400;
  let keyRot = 90;
  if (st.keyLand !== undefined && st.keyLand <= 0) {
    // Key already home and turned (S9 continues from S8).
    keyY = 0;
    keyRot = 0;
  } else if (st.keyLand !== undefined) {
    keyY = interpolate(frame, [0, st.keyLand], [-500, 0], { easing: (t) => t * t, extrapolateRight: "clamp" });
    if (st.keyTurn !== undefined) keyRot = interpolate(frame, [st.keyTurn, st.keyTurn + 6], [90, 0], { easing: expoOut, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  }
  const showKey = st.keyLand !== undefined || st.swing !== undefined;

  // Door swing + light flood (S9).
  const swing = st.swing !== undefined ? easeInOut(clamp01((frame - st.swing) / 14)) : 0;
  const flood = st.flood !== undefined ? clamp01((frame - st.flood) / 30) : 0;
  const slit = st.slit !== undefined ? clamp01((frame - st.slit) / 6) : 0;
  const tFrozen = st.vacuum !== undefined && st.flood !== undefined ? Math.min(frame, st.vacuum) - st.flood : 0;

  return (
    <>
      <PaintedLayer shot={shot} origin={[KX / 1000, KY / 1000]}>
        {/* Light behind the doorway. */}
        <div
          style={{
            position: "absolute",
            left: DOOR_X,
            top: DOOR_Y,
            width: S.DOOR_W,
            height: S.DOOR_H,
            borderRadius: `${S.DOOR_W / 2}px ${S.DOOR_W / 2}px 0 0`,
            background: `radial-gradient(circle at 50% 60%, #ffffff, ${palette.orangeLight} 45%, ${palette.orange})`,
            opacity: Math.max(slit * 0.6, swing),
          }}
        />
        <div style={{ position: "absolute", left: DOOR_X, top: DOOR_Y, width: S.DOOR_W, height: S.DOOR_H, perspective: 1600 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `translateX(${rattle}px) translateY(${latch}px) rotateY(${-swing * 78}deg)`,
              transformOrigin: "0% 50%",
            }}
          >
            {slit > 0 && swing === 0 ? <div style={{ position: "absolute", left: -6, top: 30, width: 12, bottom: 0, background: palette.orangeLight, opacity: slit, filter: "blur(4px)" }} /> : null}
            <Sprite id="s7-door" w={S.DOOR_W} h={S.DOOR_H} draw={S.door} />
            <div
              style={{
                position: "absolute",
                left: S.KEYHOLE[0] - 70,
                top: S.KEYHOLE[1] - 70,
                width: 140,
                height: 140,
                borderRadius: "50%",
                background: `radial-gradient(closest-side, ${palette.orangeBright}, ${palette.orange}88 45%, transparent)`,
                opacity: glow,
                mixBlendMode: "screen",
              }}
            />
            {showKey ? (
              <div
                style={{
                  position: "absolute",
                  // Pivot on the key tip, which sits in the keyhole: 90° = hanging bow-up, 0° = turned.
                  left: S.KEYHOLE[0] - 318,
                  top: S.KEYHOLE[1] - S.KEY_H / 2 + keyY,
                  width: S.KEY_W,
                  height: S.KEY_H,
                  transform: `rotate(${keyRot}deg)`,
                  transformOrigin: "318px 50%",
                }}
              >
                <Sprite id="s8-key" w={S.KEY_W} h={S.KEY_H} draw={S.key} />
              </div>
            ) : null}
          </div>
        </div>
        <Sprite id="s7-arch" w={600} h={940} draw={S.archFrame} x={200} y={40} />
        <Sprite id="s7-silhouette" w={90} h={200} draw={S.silhouette} x={455} y={790} />
        {/* Ticker tape and confetti hang in the light. */}
        {st.flood !== undefined
          ? Array.from({ length: 14 }, (_, i) => {
              const a = (i / 14) * Math.PI * 2;
              const t = Math.max(0, tFrozen) / 30;
              const r = 120 + t * (220 + (i % 4) * 60);
              const draw = i % 4 === 0 ? S.tapeOrange : i % 4 === 1 ? S.confettiBlue : i % 4 === 2 ? S.tapeBlue : S.confettiOrange;
              const isTape = i % 2 === 0;
              return (
                <Sprite
                  key={i}
                  id={`s9-bit-${i % 4}`}
                  w={isTape ? 44 : 40}
                  h={isTape ? 200 : 40}
                  draw={draw}
                  freeze={vacuum}
                  x={500 + Math.cos(a) * r}
                  y={520 + Math.sin(a) * r * 0.9}
                  style={{ opacity: flood, transform: `rotate(${i * 37 + t * 20}deg)` }}
                />
              );
            })
          : null}
      </PaintedLayer>
      {/* The light floods the whole frame, then at 15.5 everything snaps to cream. */}
      {st.flood !== undefined ? (
        <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 55%, #ffffff ${flood * 40}%, ${palette.orangeLight}cc ${flood * 70}%, transparent ${20 + flood * 90}%)`, opacity: flood * 0.9 }} />
      ) : null}
      {vacuum ? <AbsoluteFill style={{ background: palette.cream }} /> : null}
      {vacuum && st.ghost !== undefined && frame >= st.ghost ? (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: S.BURST, height: S.BURST, transform: "scale(0.55)", opacity: 0.25 }}>
            <Sprite id="s10-burst" w={S.BURST} h={S.BURST} draw={S.burst} />
          </div>
        </AbsoluteFill>
      ) : null}
    </>
  );
};

export const S7Door: React.FC<ShotProps> = ({ shot }) => (
  <DoorWorld shot={shot} st={{ pulses: markFrames(shot, "pulses"), rattle: markFrame(shot, "rattle") }} />
);

export const S8Key: React.FC<ShotProps> = ({ shot }) => (
  <DoorWorld
    shot={shot}
    st={{ pulses: [0], keyLand: markFrame(shot, "keyLand"), keyTurn: markFrame(shot, "keyTurn"), latch: markFrame(shot, "latch"), slit: markFrame(shot, "slit") }}
  />
);

export const S9Light: React.FC<ShotProps> = ({ shot }) => (
  <DoorWorld
    shot={shot}
    st={{
      keyLand: -1,
      keyTurn: -1,
      slit: -10,
      swing: markFrame(shot, "swing"),
      flood: markFrame(shot, "flood"),
      vacuum: markFrame(shot, "vacuum"),
      ghost: markFrame(shot, "ghost"),
    }}
  />
);
