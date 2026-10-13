import { interpolate, useCurrentFrame } from "remotion";
import { Shadow, Sparkles, useBob } from "../components/Decor";
import { PaintedLayer } from "../components/PaintedLayer";
import { palette } from "../palette";
import { Sprite } from "../paint/Sprite";
import * as S from "../paint/sprites";
import { markFrame, markFrames, type Shot } from "../storyboard";
import { clamp01, easeInOut, expoOut, pop, popIn } from "../timing";

type ShotProps = { shot: Shot };

// S1 · HOOK · THE PHONE ─ tiles pop in four at a time on the beat.
const PHONE_X = 300;
const PHONE_Y = 110;
const tileDraw = S.tiles;

export const S1Phone: React.FC<ShotProps> = ({ shot }) => {
  const frame = useCurrentFrame();
  const pops = markFrames(shot, "rowPops");
  const sparkle = markFrame(shot, "sparkle");
  const bob = useBob(6, 50);
  return (
    <PaintedLayer shot={shot}>
      <Shadow x={500} y={920} w={520} />
      <Shadow x={825} y={905} w={200} />
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${bob}px) scale(1.08)`, transformOrigin: "500px 500px" }}>
      <Sprite id="s1-phone" w={S.PHONE_W} h={S.PHONE_H} draw={S.phone} x={PHONE_X} y={PHONE_Y} />
      {tileDraw.map((draw, i) => {
        const group = Math.floor(i / 4);
        const f = frame - pops[group] - (i % 4); // one frame of stagger inside a group
        const s = popIn(f, 1.18, 8);
        return (
          <div key={i} style={{ position: "absolute", left: PHONE_X + 48 + (i % 3) * 104, top: PHONE_Y + 92 + Math.floor(i / 3) * 148, width: 100, height: 100, transform: `scale(${s})` }}>
            <Sprite id={`s1-tile-${i}`} w={100} h={100} draw={draw} />
          </div>
        );
      })}
      </div>
      <Sprite id="s1-chai" w={170} h={260} draw={S.chai} x={740} y={640} />
      <Sprite id="s1-steam" w={150} h={170} draw={S.steam} x={746} y={480} style={{ opacity: 0.85 }} />
      <Sparkles from={sparkle} points={[[700, 140], [250, 300, 4], [740, 560, 8]]} />
    </PaintedLayer>
  );
};

// S2 · THE TV NIGHT
export const S2Tv: React.FC<ShotProps> = ({ shot }) => {
  const frame = useCurrentFrame();
  const flicker = 0.75 + 0.25 * Math.abs(Math.sin(Math.floor(frame / 3) * 1.7));
  return (
    <PaintedLayer shot={shot}>
      <div style={{ position: "absolute", left: 120, top: 120, width: 760, height: 520, borderRadius: "50%", background: `radial-gradient(closest-side, ${palette.blueBright}aa, transparent)`, opacity: flicker }} />
      <div style={{ position: "absolute", left: -40, top: 260, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(closest-side, ${palette.orangeBright}cc, transparent)` }} />
      <Sprite id="s2-window" w={280} h={340} draw={S.nightWindow} x={680} y={20} />
      <div style={{ position: "absolute", left: 160, top: 360, width: 680, height: 420, clipPath: "polygon(15% 0, 85% 0, 100% 100%, 0 100%)", background: `linear-gradient(180deg, ${palette.blueBright}66, transparent)`, opacity: flicker }} />
      <div style={{ position: "absolute", inset: 0, transform: "scale(1.12)", transformOrigin: "500px 390px" }}>
        <Sprite id="s2-tv" w={560} h={380} draw={S.tv} x={220} y={200} />
        <Sprite id="s2-play" w={100} h={100} draw={S.playGlyph} x={460} y={330} style={{ opacity: flicker }} />
      </div>
      <Sprite id="s2-lamp" w={200} h={420} draw={S.lamp} x={60} y={330} />
      <Sprite id="s2-sofa" w={800} h={270} draw={S.sofa} x={100} y={660} />
    </PaintedLayer>
  );
};

// S3 · THE SEARCH ─ an illegible query types in, orange cursor blinks.
export const S3Search: React.FC<ShotProps> = ({ shot }) => {
  const frame = useCurrentFrame();
  const t0 = markFrame(shot, "typeStart");
  const t1 = markFrame(shot, "typeEnd");
  // Typing advances in 2-frame keystrokes.
  const typed = clamp01((Math.floor((frame - t0) / 2) * 2) / (t1 - t0));
  const cursorX = 310 + typed * 440;
  const blinkOn = Math.floor(frame / 6) % 2 === 0 || (frame > t0 && frame < t1);
  return (
    <PaintedLayer shot={shot}>
      <Shadow x={500} y={640} w={760} opacity={0.35} />
      <div style={{ position: "absolute", inset: 0, transform: "scale(1.15)", transformOrigin: "500px 495px" }}>
      <Sprite id="s3-pill" w={760} h={150} draw={S.searchPill} x={120} y={420} />
      <div style={{ position: "absolute", left: 310, top: 455, width: 450, height: 60, clipPath: `inset(0 ${(1 - typed) * 100}% 0 0)` }}>
        <Sprite id="s3-scribble" w={450} h={60} draw={S.scribble} />
      </div>
      <div style={{ position: "absolute", left: cursorX, top: 452, width: 9, height: 66, borderRadius: 4, background: palette.orange, opacity: blinkOn ? 1 : 0 }} />
      <Sprite id="s3-magnifier" w={110} h={110} draw={S.magnifier} x={140} y={440} />
      </div>
      <div style={{ position: "absolute", left: 620, top: 160 + useBob(10, 30), width: 110, height: 110, transform: "scale(2.2) rotate(-12deg)" }}>
        <Sprite id="s3-magnifier-big" w={110} h={110} draw={S.magnifier} />
      </div>
      <Sparkles points={[[200, 300], [830, 640, 3], [380, 700, 6]]} />
    </PaintedLayer>
  );
};

// S4 · THE RIDE ─ the pin lands, a cab follows the orange route to it.
const MAP_X = 50;
const MAP_Y = 50;
const pointOnRoute = (t: number): [number, number] => {
  const pts = S.ROUTE;
  const lens = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  const total = lens.reduce((a, b) => a + b, 0);
  let d = t * total;
  for (let i = 0; i < lens.length; i++) {
    if (d <= lens[i]) {
      const k = d / lens[i];
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k];
    }
    d -= lens[i];
  }
  const last = pts[pts.length - 1];
  return [last[0], last[1]];
};

export const S4Ride: React.FC<ShotProps> = ({ shot }) => {
  const frame = useCurrentFrame();
  const land = markFrame(shot, "pinLand");
  const c0 = markFrame(shot, "cabStart");
  const c1 = markFrame(shot, "cabEnd");
  const pinDrop = interpolate(frame - land, [0, 6], [-260, 0], { easing: expoOut, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const [cx, cy] = pointOnRoute(easeInOut(clamp01((frame - c0) / (c1 - c0))));
  return (
    <PaintedLayer shot={shot}>
      <Sprite id="s4-map" w={900} h={900} draw={S.cityMap} x={MAP_X} y={MAP_Y} />
      <div style={{ position: "absolute", left: MAP_X, top: MAP_Y, width: 900, height: 900, clipPath: `inset(0 0 0 0)` }}>
        <svg width={900} height={900} style={{ position: "absolute", inset: 0 }}>
          <path
            d={`M ${S.ROUTE.map((p) => `${p[0]} ${p[1]}`).join(" L ")}`}
            fill="none"
            stroke={palette.orange}
            strokeWidth={18}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - clamp01(frame / 10) * 1}
          />
        </svg>
      </div>
      <Shadow x={MAP_X + 560} y={MAP_Y + 254} w={90} opacity={0.4} />
      <Sprite id="s4-cab" w={170} h={110} draw={S.cab} x={MAP_X + cx - 85} y={MAP_Y + cy - 80} style={{ transform: "scale(1.5)" }} />
      <div style={{ position: "absolute", left: MAP_X + 560 - 60, top: MAP_Y + 250 - 160 + pinDrop, width: 120, height: 170, transform: `scale(${1.6 * pop(frame - land - 6)})`, transformOrigin: "50% 100%" }}>
        <Sprite id="s4-pin" w={120} h={170} draw={S.pin} />
      </div>
    </PaintedLayer>
  );
};

// S5 · THE TAP ─ a phone taps the terminal, an orange tick pops.
export const S5Tap: React.FC<ShotProps> = ({ shot }) => {
  const frame = useCurrentFrame();
  const tap = markFrame(shot, "tap");
  const tick = markFrame(shot, "tick");
  const approach = easeInOut(clamp01(frame / tap));
  const press = frame >= tap && frame < tap + 3 ? 10 : 0;
  return (
    <PaintedLayer shot={shot}>
      <Sprite id="s5-terminal" w={340} h={500} draw={S.terminal} x={500} y={380} />
      <div
        style={{
          position: "absolute",
          left: interpolate(approach, [0, 1], [-260, 200]),
          top: interpolate(approach, [0, 1], [560, 300]) + press,
          width: 380,
          height: 570,
          transform: `rotate(${interpolate(approach, [0, 1], [-28, -8])}deg)`,
        }}
      >
        <Sprite id="s5-hand" w={380} h={570} draw={S.handPhone} />
      </div>
      <div style={{ position: "absolute", left: 670 - 90, top: 415, width: 180, height: 180, transform: `scale(${1.25 * popIn(frame - tick, 1.2, 8)})` }}>
        <Sprite id="s5-tick" w={180} h={180} draw={S.tick} />
      </div>
      <Sparkles from={tick} points={[[560, 380], [800, 420, 2], [700, 640, 4]]} />
    </PaintedLayer>
  );
};
