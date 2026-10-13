import { useCurrentFrame } from "remotion";
import { Shadow, Sparkles } from "../components/Decor";
import { PaintedLayer } from "../components/PaintedLayer";
import { antic, arc, clamp, easeIO, impact, popIn, sp, stretch, wander } from "../motion";
import { palette } from "../palette";
import { Sprite } from "../paint/Sprite";
import * as S from "../paint/sprites";
import { markFrame, markFrames, type Shot } from "../storyboard";

type ShotProps = { shot: Shot };

// ── S1 · THE PHONE ───────────────────────────────────────────────────────────
// Phone rises in with a soft land; tiles pop on the 8ths (staggered, each with
// overshoot and a little twist); the first tile flickers through substitutions
// (the reference's rapid Google swaps) before the camera pushes into it.
const PHONE_X = 300;
const PHONE_Y = 110;
const SWAP_COLORS = [palette.blueMid, palette.orange, palette.navy, palette.blueBright];

export const S1Phone: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const pops = markFrames(shot, "tilePops");
  const swaps = markFrames(shot, "swaps");
  const rise = sp(f, -6, "land");
  const swapIndex = swaps.filter((s) => f >= s).length;
  return (
    <PaintedLayer shot={shot} push={[1.0, 1.1]}>
      <Shadow x={500} y={925} w={520 * (0.8 + rise * 0.2)} />
      <Shadow x={825} y={905} w={200} />
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${(1 - rise) * 90}px)` }}>
        <Sprite id="s1-phone" w={S.PHONE_W} h={S.PHONE_H} draw={S.phone} x={PHONE_X} y={PHONE_Y} />
        {S.tiles.map((draw, i) => {
          const at = pops[Math.min(pops.length - 1, Math.floor(i / 3))] + (i % 3);
          const s = popIn(f, at, "pop", 0.2);
          const twist = (1 - sp(f, at, "loose")) * (i % 2 ? 14 : -14);
          const swapping = i === 0 && swapIndex > 0;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: PHONE_X + 48 + (i % 3) * 104,
                top: PHONE_Y + 92 + Math.floor(i / 3) * 148,
                width: 100,
                height: 100,
                transform: `scale(${s}) rotate(${twist}deg)`,
                borderRadius: 22,
                background: swapping ? SWAP_COLORS[swapIndex % SWAP_COLORS.length] : undefined,
              }}
            >
              {swapping ? null : <Sprite id={`s1-tile-${i}`} w={100} h={100} draw={draw} />}
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 740, top: 640, width: 170, height: 260, transform: `translateY(${(1 - sp(f, 2, "land")) * 120}px)` }}>
        <Sprite id="s1-chai" w={170} h={260} draw={S.chai} />
      </div>
      <Sprite id="s1-steam" w={150} h={170} draw={S.steam} x={746 + wander(f, 1, 4)} y={480 - (f % 24) * 0.8} style={{ opacity: 0.8 }} />
      <Sparkles from={6} points={[[700, 150], [240, 300, 5], [760, 560, 9]]} />
    </PaintedLayer>
  );
};

// ── S2 · THE TV NIGHT ────────────────────────────────────────────────────────
export const S2Tv: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const flicker = 0.75 + 0.25 * Math.abs(Math.sin(Math.floor(f / 2) * 1.7));
  const playPop = popIn(f, 4, "snap");
  const feet = Math.sin(f / 3) * 4;
  return (
    <PaintedLayer shot={shot} push={[1.04, 1.12]}>
      <Sprite id="s2-window" w={280} h={340} draw={S.nightWindow} x={680} y={20} />
      <div style={{ position: "absolute", left: 160, top: 360, width: 680, height: 420, clipPath: "polygon(15% 0, 85% 0, 100% 100%, 0 100%)", background: `linear-gradient(180deg, ${palette.blueBright}77, transparent)`, opacity: flicker }} />
      <div style={{ position: "absolute", left: -40, top: 260, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(closest-side, ${palette.orangeBright}cc, transparent)`, opacity: 0.8 + wander(f, 2, 0.2) }} />
      <div style={{ position: "absolute", inset: 0, transform: "scale(1.12)", transformOrigin: "500px 390px" }}>
        <Sprite id="s2-tv" w={560} h={380} draw={S.tv} x={220} y={200} />
        <div style={{ position: "absolute", left: 460, top: 330, width: 100, height: 100, transform: `scale(${playPop})`, opacity: flicker }}>
          <Sprite id="s2-play" w={100} h={100} draw={S.playGlyph} />
        </div>
      </div>
      <Sprite id="s2-lamp" w={200} h={420} draw={S.lamp} x={60} y={330} />
      <div style={{ position: "absolute", left: 100, top: 660, width: 800, height: 270, transform: `rotate(${feet * 0.1}deg)` }}>
        <Sprite id="s2-sofa" w={800} h={270} draw={S.sofa} />
      </div>
    </PaintedLayer>
  );
};

// ── S3 · THE SEARCH ──────────────────────────────────────────────────────────
// The pill lands out of the TV morph (impact squash); an illegible query types
// in on 2-frame keystrokes; a big magnifier swings in on an arc.
export const S3Search: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const t0 = markFrame(shot, "typeStart");
  const t1 = markFrame(shot, "typeEnd");
  const typed = clamp((Math.floor((f - t0) / 2) * 2) / (t1 - t0));
  const cursorX = 310 + typed * 440;
  const blinkOn = Math.floor(f / 4) % 2 === 0 || (f > t0 && f < t1);
  const swing = sp(f, 2, "loose");
  const [mx, my] = arc([980, 60], [640, 170], swing, 0.25);
  return (
    <PaintedLayer shot={shot} push={[1.0, 1.08]}>
      <Shadow x={500} y={640} w={760} opacity={0.35} />
      <div style={{ position: "absolute", inset: 0, transform: `scale(1.15) ${impact(f, 0, 0.12, 6)}`, transformOrigin: "500px 495px" }}>
        <Sprite id="s3-pill" w={760} h={150} draw={S.searchPill} x={120} y={420} />
        <div style={{ position: "absolute", left: 310, top: 455, width: 450, height: 60, clipPath: `inset(0 ${(1 - typed) * 100}% 0 0)` }}>
          <Sprite id="s3-scribble" w={450} h={60} draw={S.scribble} />
        </div>
        <div style={{ position: "absolute", left: cursorX, top: 452, width: 9, height: 66, borderRadius: 4, background: palette.orange, opacity: blinkOn ? 1 : 0 }} />
        <Sprite id="s3-magnifier" w={110} h={110} draw={S.magnifier} x={140} y={440} />
      </div>
      <div style={{ position: "absolute", left: mx, top: my, width: 110, height: 110, transform: `scale(2.2) rotate(${-12 + (1 - swing) * 50}deg)` }}>
        <Sprite id="s3-magnifier-big" w={110} h={110} draw={S.magnifier} />
      </div>
      <Sparkles from={8} points={[[200, 300], [830, 650, 3], [380, 720, 6]]} />
    </PaintedLayer>
  );
};

// ── S4 · THE RIDE ────────────────────────────────────────────────────────────
const MAP_X = 50;
const MAP_Y = 50;
const routePoint = (t: number): [number, number] => {
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
  const f = useCurrentFrame();
  const land = markFrame(shot, "pinLand");
  const c0 = markFrame(shot, "cabStart");
  const c1 = markFrame(shot, "cabEnd");
  const ct = (x: number) => easeIO(clamp((x - c0) / (c1 - c0)));
  const [cx, cy] = routePoint(ct(f));
  const [px, py] = routePoint(ct(f - 1));
  const draw = easeIO(clamp(f / 14));
  return (
    <PaintedLayer shot={shot} push={[1.02, 1.1]}>
      <div style={{ position: "absolute", inset: 0, transform: "perspective(1800px) rotateX(18deg)", transformOrigin: "500px 700px" }}>
        <Sprite id="s4-map" w={900} h={900} draw={S.cityMap} x={MAP_X} y={MAP_Y} />
        <svg width={900} height={900} style={{ position: "absolute", left: MAP_X, top: MAP_Y }}>
          <path d={`M ${S.ROUTE.map((p) => `${p[0]} ${p[1]}`).join(" L ")}`} fill="none" stroke={palette.orange} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
        </svg>
        <div style={{ position: "absolute", left: MAP_X + cx - 85, top: MAP_Y + cy - 80, width: 170, height: 110, transform: `scale(1.5) ${stretch(cx - px, cy - py, 0.02, 0.3)}` }}>
          <Sprite id="s4-cab" w={170} h={110} draw={S.cab} />
        </div>
      </div>
      <Shadow x={MAP_X + 560} y={MAP_Y + 262} w={110} opacity={0.4 * sp(f, land, "land")} />
      <div style={{ position: "absolute", left: MAP_X + 500, top: MAP_Y + 90, width: 120, height: 170, transform: `scale(1.6) ${impact(f, land, 0.18, 7)}`, transformOrigin: "50% 100%" }}>
        <Sprite id="s4-pin" w={120} h={170} draw={S.pin} />
      </div>
    </PaintedLayer>
  );
};

// ── S5 · THE TAP ─────────────────────────────────────────────────────────────
// The phone winds up (pulls back), swings in on an arc, taps with a squash;
// the tick pops and the rays fire. Then everything scatters into stickers.
export const S5Tap: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const tap = markFrame(shot, "tap");
  const tick = markFrame(shot, "tick");
  const swing = antic(f, 2, 4, 0.15, "snap");
  const [hx, hy] = arc([-280, 620], [200, 300], Math.max(0, swing), -0.2);
  const press = f >= tap && f < tap + 3 ? 10 : 0;
  const tickS = popIn(f, tick, "snap", 0.1) * 1.25;
  return (
    <PaintedLayer shot={shot} push={[1.0, 1.06]}>
      <Shadow x={670} y={900} w={360} />
      <div style={{ position: "absolute", left: 500, top: 380, width: 340, height: 500, transform: impact(f, tap, 0.06, 5), transformOrigin: "50% 100%" }}>
        <Sprite id="s5-terminal" w={340} h={500} draw={S.terminal} />
      </div>
      <div
        style={{
          position: "absolute",
          left: hx + (swing < 0 ? swing * 200 : 0),
          top: hy + press,
          width: 380,
          height: 570,
          transform: `rotate(${-30 + Math.max(0, swing) * 22}deg)`,
        }}
      >
        <Sprite id="s5-hand" w={380} h={570} draw={S.handPhone} />
      </div>
      <div style={{ position: "absolute", left: 670 - 90, top: 415, width: 180, height: 180, transform: `scale(${tickS}) rotate(${(1 - sp(f, tick, "loose")) * -25}deg)` }}>
        <Sprite id="s5-tick" w={180} h={180} draw={S.tick} />
      </div>
      <Sparkles from={tick} points={[[560, 380], [810, 420, 2], [700, 650, 4]]} />
    </PaintedLayer>
  );
};
