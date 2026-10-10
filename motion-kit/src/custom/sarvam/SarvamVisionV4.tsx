/**
 * Sarvam Vision 2.1, v4: rebuilt to docs/research/pro-film-rules.md after v3 measured "frozen"
 * (84% still frames vs 27-56% in Sarvam's own films).
 *
 * Motion: one continuous stage. A slow camera push runs the whole film; holds keep drifting
 * (glow breathing, parallax gems, idle tilt). Scenes overlap and hand over with different recipes:
 * feathered wipe (title card), 3D card entrance, container transform (gem badge -> orb),
 * orb -> gem shrink, gem burst, circle mask from the gem into the end card. One morphing anchor
 * gem carries the eye through every scene. Easing: expo-out entrances, ease-in exits at ~65% length,
 * springs stiffness 158 / damping 21-25 (never the bouncy default). Grain on top.
 * Sound: continuous bed, ducked ~10 dB under the voice with a 60 ms attack / 450 ms release
 * envelope; whoosh peaks on the transition frame; UI ticks 10-15 dB under the voice; risers end on
 * the cut; the music rings out under the logo (no hard stop).
 */
import React from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { C, CANVAS, END_CARD, FORM_LINES, GEM_COLORS, HAND, SANS, SCRIPTS, TABLE, TITLE_CARD, gemPath, useFonts, type GemKind } from "./SarvamVision.tsx";

const FPS = 30;
const s = (sec: number) => Math.round(sec * FPS);
export const SARVAM_V4_FRAMES = s(29);
const W = 1920;
const H = 1080;

// ---- easing --------------------------------------------------------------------------------
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const expoOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeIn = Easing.bezier(0.3, 0, 0.8, 0.15);
const inOut = Easing.bezier(0.65, 0, 0.35, 1);
/** Gentle symmetric ease for size / shape morphs: no steep middle, zero speed at both ends. */
const morph = Easing.bezier(0.45, 0, 0.55, 1);
const p = (f: number, a: number, d: number, e = expoOut) => interpolate(f, [a, a + d], [0, 1], { ...clamp, easing: e });
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const spr = (f: number, at: number, damping = 21) => spring({ frame: f - at, fps: FPS, config: { stiffness: 158, damping, mass: 1 } });

// ---- timeline (seconds) ----------------------------------------------------------------------
const T = {
  wipe: 3.35, // title card wipes away
  built: 3.45,
  toForm: 6.75, // built text exits, paper enters
  write: 7.2,
  scan: 9.0,
  shift: 10.4, // paper slides left, data card arrives
  toOrb: 13.85, // badge gem grows into the orb
  toGem: 18.35, // orb shrinks back to a gem
  burst: 19.05,
  toLive: 21.85,
  toEnd: 25.05, // circle mask from the gem into the end card
  end: 29,
};

// ---- the anchor gem's path: position, size, shape, from scene to scene ----------------------
type Key = { t: number; x: number; y: number; size: number; kind: GemKind; orb?: number };
// Every resting spot and every path keeps clear of text (checked against each text block).
const ANCHOR: Key[] = [
  { t: 3.25, x: 960, y: -120, size: 70, kind: "flower" }, // drops in from above as the title card wipes away
  { t: 4.05, x: 960, y: 372, size: 92, kind: "flower" }, // above "Built to read"
  { t: 6.55, x: 960, y: 360, size: 92, kind: "flower" },
  { t: 7.45, x: 1310, y: 114, size: 40, kind: "star" }, // right of the "Forms · Complex tables · Handwriting" label
  { t: 10.25, x: 1310, y: 114, size: 40, kind: "star" },
  { t: 11.15, x: 1597, y: 341, size: 26, kind: "flower" }, // badge in the card header, right of its text
  { t: 13.75, x: 1597, y: 341, size: 26, kind: "flower" },
  { t: 14.75, x: 960, y: 420, size: 320, kind: "scallop", orb: 1 }, // becomes the orb
  { t: 18.25, x: 960, y: 420, size: 320, kind: "scallop", orb: 1 },
  { t: 19.15, x: 960, y: 275, size: 78, kind: "diamond" }, // shrinks back, above the score
  { t: 21.75, x: 960, y: 275, size: 78, kind: "diamond" },
  { t: 22.2, x: 440, y: 350, size: 60, kind: "diamond" }, // arcs out left, above and around the headline
  { t: 22.75, x: 742, y: 668, size: 46, kind: "flower" }, // beside the CTA pill
  { t: 25.0, x: 742, y: 668, size: 46, kind: "flower" },
];
const anchorAt = (t: number) => {
  let i = ANCHOR.findIndex((k) => k.t > t);
  if (i === -1) i = ANCHOR.length - 1;
  if (i === 0) return { ...ANCHOR[0], blend: 0, from: ANCHOR[0], to: ANCHOR[0] };
  const a = ANCHOR[i - 1];
  const b = ANCHOR[i];
  const k = b.t === a.t ? 1 : Math.min(1, Math.max(0, (t - a.t) / (b.t - a.t)));
  const e = morph(k);
  return { x: mix(a.x, b.x, e), y: mix(a.y, b.y, e), size: mix(a.size, b.size, e), blend: morph(k), from: a, to: b };
};

const GemShape: React.FC<{ kind: GemKind; size: number; id: string; orb?: boolean; rot?: number; opacity?: number }> = ({ kind, size, id, orb, rot = 0, opacity = 1 }) => {
  const [c1, c2] = GEM_COLORS[kind];
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ position: "absolute", left: -size / 2, top: -size / 2, overflow: "visible", opacity, transform: `rotate(${rot}deg)` }}>
      <defs>
        <radialGradient id={id} cx="38%" cy="32%" r="78%">
          {orb ? (
            <>
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="28%" stopColor="#CFC9F8" />
              <stop offset="68%" stopColor="#8E86E8" />
              <stop offset="100%" stopColor="#F2B9B0" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="26%" stopColor={c1} />
              <stop offset="100%" stopColor={c2} />
            </>
          )}
        </radialGradient>
      </defs>
      <path d={gemPath(kind)} fill={`url(#${id})`} style={{ filter: `drop-shadow(0 ${size * 0.07}px ${size * 0.14}px ${orb ? "#373AC055" : c2 + "55"})` }} />
    </svg>
  );
};

/** The anchor: one gem that morphs shape, size and place through the whole film. */
const Anchor: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  if (t < 3.25 || t > T.toEnd + 0.7) return null;
  const a = anchorAt(t);
  const shapeMix = a.from.kind === a.to.kind ? 1 : Math.min(1, Math.max(0, (a.blend - 0.25) / 0.5));
  const breathe = 1 + 0.025 * Math.sin(f / 14);
  const bob = Math.sin(f / 20) * 12;
  const rot = f * 0.4; // one constant speed: no jump when the gem becomes the orb
  const fade = 1 - p(f, s(T.toEnd), 18, inOut);
  return (
    <div style={{ position: "absolute", left: a.x, top: a.y + bob, transform: `scale(${breathe})`, opacity: fade }}>
      {a.from.kind !== a.to.kind ? <GemShape kind={a.from.kind} size={a.size} id="anc-a" orb={!!a.from.orb} rot={rot} opacity={1 - shapeMix} /> : null}
      <GemShape kind={a.to.kind} size={a.size} id="anc-b" orb={!!a.to.orb} rot={rot} opacity={a.from.kind !== a.to.kind ? shapeMix : 1} />
    </div>
  );
};

// ---- supporting gems: depth layers, parallax, burst ------------------------------------------
type Sat = { kind: GemKind; x: number; y: number; size: number; depth: 0 | 1 | 2; at: number };
const Satellite: React.FC<Sat & { id: string; out: number; from?: { x: number; y: number } }> = ({ kind, x, y, size, depth, at, id, out, from }) => {
  const f = useCurrentFrame();
  const k = spr(f, at, 23);
  const par = [1, 0.6, 0.3][depth];
  const drift = Math.sin((f + at * 3) / 22) * 22 * par;
  // Burst gems glide out on a smooth decelerating curve (a spring starts too fast: reads as a jolt).
  const g = from ? p(f, at, 34, Easing.bezier(0.25, 0.1, 0.25, 1)) : 0;
  const ox = from ? mix(from.x, x, g) : x;
  const oy = from ? mix(from.y, y, g) : y + (1 - k) * 40;
  const blur = [0, 3, 9][depth];
  const exit = 1 - out;
  return (
    <div
      style={{
        position: "absolute",
        left: ox + (out * (x - 960)) * 0.25 + Math.cos((f + at * 5) / 34) * 14 * par,
        top: oy + drift - out * 30,
        transform: `scale(${(0.85 + 0.15 * k) * (depth === 0 ? 1 : depth === 1 ? 0.9 : 0.75)})`,
        opacity: (from ? Math.min(1, g * 2) : Math.min(1, k * 1.3)) * exit,
        filter: `blur(${blur}px)`,
      }}
    >
      <GemShape kind={kind} size={size} id={id} rot={(f - at) * (depth === 0 ? 0.5 : 0.2)} />
    </div>
  );
};

// ---- type ----------------------------------------------------------------------------------
/** Word reveal: opacity + 18 px rise + 10 px blur, expo-out 18 f, 3 f stagger. */
const Words: React.FC<{ text: string; at: number; size: number; color?: string; weight?: number; emphasis?: Record<string, string> }> = ({ text, at, size, color = C.ink, weight = 300, emphasis = {} }) => {
  const f = useCurrentFrame();
  return (
    <span style={{ fontFamily: SANS, fontSize: size, fontWeight: weight, letterSpacing: "-0.025em", lineHeight: 1.12 }}>
      {text.split(" ").map((w, i) => {
        const k = p(f, at + i * 3, 18);
        return (
          <span key={i} style={{ display: "inline-block", marginRight: "0.25em", opacity: k, filter: `blur(${(1 - k) * 10}px)`, transform: `translateY(${(1 - k) * 18}px)`, color: emphasis[w.replace(/[.,]/g, "")] ?? color }}>
            {w}
          </span>
        );
      })}
    </span>
  );
};

/** Soft-mask reveal: letters uncover left to right behind a feathered edge (Saaras V4 title). */
const MaskReveal: React.FC<{ text: string; at: number; dur: number; size: number; color: string; weight?: number }> = ({ text, at, dur, size, color, weight = 300 }) => {
  const f = useCurrentFrame();
  const x = mix(-25, 110, p(f, at, dur, inOut));
  const m = `linear-gradient(90deg, #000 ${x - 12}%, transparent ${x + 12}%)`;
  return <span style={{ fontFamily: SANS, fontSize: size, fontWeight: weight, letterSpacing: "-0.025em", color, WebkitMaskImage: m, maskImage: m, display: "inline-block" }}>{text}</span>;
};

/** Exit: blur + rise + fade, eased in, ~65% of an entrance. */
const exitStyle = (f: number, at: number, d = 12): React.CSSProperties => {
  const k = p(f, at, d, easeIn);
  return { opacity: 1 - k, filter: `blur(${k * 10}px)`, transform: `translateY(${-k * 22}px)` };
};

// ---- stage pieces --------------------------------------------------------------------------
const Glow: React.FC = () => {
  const f = useCurrentFrame();
  // Two soft light pools travel slowly along the bottom edge and breathe (Sarvam's glow).
  const blob = (cx: number, cy: number, w: number, color: string, ph: number, amp: number) => (
    <div
      style={{
        position: "absolute",
        left: cx - w / 2 + Math.sin(f / 40 + ph) * amp * 1.4,
        top: cy - w * 0.3 + Math.cos(f / 52 + ph) * amp * 0.5,
        width: w,
        height: w * 0.6,
        borderRadius: "50%",
        background: `radial-gradient(closest-side, ${color}, transparent)`,
        opacity: 0.75 + 0.25 * Math.sin(f / 38 + ph),
        filter: "blur(24px)",
      }}
    />
  );
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundImage: CANVAS }} />
      {blob(640, 1040, 1500, "rgba(140,132,232,0.42)", 0, 220)}
      {blob(1340, 1080, 1300, "rgba(186,170,240,0.38)", 2.1, 260)}
      {blob(960, 1150, 1000, "rgba(242,185,176,0.22)", 4.2, 180)}
    </AbsoluteFill>
  );
};

const Grain: React.FC = () => (
  <AbsoluteFill style={{ mixBlendMode: "soft-light", opacity: 0.18, pointerEvents: "none" }}>
    <svg width={W} height={H}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width={W} height={H} filter="url(#grain)" />
    </svg>
  </AbsoluteFill>
);

// ---- scenes --------------------------------------------------------------------------------
/** Title card; leaves with a feathered wipe (mask edge travels top -> bottom) while scene 2 enters. */
const TitleCard: React.FC = () => {
  const f = useCurrentFrame();
  const w = p(f, s(T.wipe), 18, inOut);
  const edge = mix(-30, 130, w);
  const m = `linear-gradient(180deg, transparent ${edge - 25}%, #000 ${edge}%)`;
  const drift = 1.0 + f * 0.0012;
  if (f > s(T.wipe) + 19) return null;
  return (
    <AbsoluteFill style={{ WebkitMaskImage: m, maskImage: m }}>
      <AbsoluteFill style={{ backgroundImage: TITLE_CARD, backgroundSize: "100% 160%", backgroundPosition: `50% ${30 + Math.sin(f / 26) * 30}%`, transform: `scale(${drift})` }} />
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center" }}>
        <div style={{ width: 1000, height: 760, borderRadius: "500px 500px 0 0", background: "radial-gradient(60% 70% at 50% 100%, #FFE3D2 0%, transparent 75%)", opacity: 0.55 + 0.2 * Math.sin(f / 14), filter: "blur(34px)", transform: `translateY(${Math.sin(f / 22) * 40}px) scale(${1 + 0.12 * Math.sin(f / 30)})` }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 14, transform: `translateY(${-f * 0.12}px)` }}>
        <MaskReveal text="Introducing" at={6} dur={22} size={36} color="rgba(255,255,255,0.85)" weight={400} />
        <Words text="Sarvam Vision 2.1" at={24} size={104} color={C.white} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const BUILT_SATS: Sat[] = [
  { kind: "star", x: 1395, y: 300, size: 74, depth: 0, at: s(4.0) },
  { kind: "clover", x: 520, y: 760, size: 96, depth: 1, at: s(4.15) },
  { kind: "diamond", x: 1430, y: 760, size: 64, depth: 0, at: s(4.3) },
  { kind: "scallop", x: 610, y: 300, size: 54, depth: 2, at: s(4.45) },
  { kind: "flower", x: 1640, y: 560, size: 120, depth: 2, at: s(4.6) },
  { kind: "star", x: 290, y: 520, size: 46, depth: 1, at: s(4.75) },
];

const Built: React.FC = () => {
  const f = useCurrentFrame();
  if (f < s(T.built) - 2 || f > s(T.toForm) + 14) return null;
  const out = p(f, s(T.toForm), 12, easeIn);
  return (
    <AbsoluteFill>
      {BUILT_SATS.map((g, i) => (
        <Satellite key={i} id={`bs${i}`} {...g} out={out} />
      ))}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", paddingTop: 70, ...exitStyle(f, s(T.toForm), 12), scale: String(1 + (f - s(T.built)) * 0.0004) }}>
        <Words text="Built to read" at={s(T.built) + 4} size={70} />
        <Words text="India's documents" at={s(T.built) + 12} size={70} color={C.grey} emphasis={{ "India's": C.blue }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Hero: handwritten Hindi form, written, scanned (camera pushes in), then typed out as data. */
const FormScene: React.FC = () => {
  const f = useCurrentFrame();
  const t0 = s(T.toForm);
  if (f < t0 - 2 || f > s(T.toOrb) + 22) return null;
  const enter = spr(f, t0 + 2, 25);
  const push = p(f, s(T.scan) - 6, 30, inOut) * (1 - p(f, s(T.shift) - 4, 26, inOut)); // in, then back out
  const shift = p(f, s(T.shift), 24, expoOut);
  const out = p(f, s(T.toOrb), 16, easeIn);
  const scan = interpolate(f, [s(T.scan), s(T.scan) + 38], [0, 1], { ...clamp, easing: inOut });
  const sweep = p(f, s(T.scan) + 4, 26, inOut);
  const write = (i: number) => p(f, s(T.write) + i * 8, 18, inOut);
  const paperX = mix(960 - 290, 400, shift);
  const cam = 1 + 0.16 * push;
  const idleTilt = Math.sin(f / 50) * 2;
  // typed values: 1-2 characters per frame, one row after another
  const typed = (i: number, str: string) => {
    const start = s(T.shift) + 14 + i * 12;
    const n = Math.max(0, Math.min(str.length, Math.floor((f - start) * 1.6)));
    return { text: str.slice(0, n), caret: f >= start && n < str.length, done: n >= str.length && f >= start, at: start + Math.ceil(str.length / 1.6) };
  };
  return (
    <AbsoluteFill style={{ opacity: 1 - out, filter: `blur(${out * 8}px)`, transform: `scale(${(1 - out * 0.06) * cam})`, transformOrigin: "960px 560px" }}>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 96 }}>
        <Words text="Forms · Complex tables · Handwriting" at={t0 + 10} size={30} color={C.grey} weight={400} emphasis={{ Handwriting: C.blue }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, perspective: 1600 }}>
        {/* paper */}
        <div
          style={{
            position: "absolute",
            left: paperX,
            top: 205,
            width: 580,
            height: 690,
            background: C.paper,
            borderRadius: 18,
            boxShadow: "0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(55,58,192,.07), 0 30px 70px rgba(55,58,192,.12)",
            transform: `translateY(${(1 - enter) * 90}px) rotateX(${(1 - enter) * 18}deg) rotateY(${idleTilt * (1 - shift)}deg) rotate(${-1.4 * (1 - shift)}deg)`,
            opacity: Math.min(1, enter * 1.4),
            padding: "44px 48px",
            overflow: "hidden",
          }}
        >
          <div style={{ fontFamily: SANS, fontSize: 18, letterSpacing: "0.12em", color: C.grey, textTransform: "uppercase" }}>आवेदन पत्र · Application</div>
          <div style={{ height: 1, background: "#E7E3D8", margin: "18px 0 24px" }} />
          {FORM_LINES.map((l, i) => {
            const hit = p(f, s(T.scan) + 8 + i * 6, 8) * (1 - p(f, s(T.shift), 12));
            return (
              <div key={l.key} style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 22 }}>
                <span style={{ fontFamily: SANS, fontSize: 20, color: C.grey, width: 92 }}>{l.label}</span>
                <span style={{ fontFamily: HAND, fontSize: 34, color: C.pencil, flex: 1, paddingBottom: 2, borderBottom: "1.5px dashed #D9D4C6", borderRadius: 6, background: `rgba(55,58,192,${0.1 * hit})`, boxShadow: hit > 0.05 ? `0 0 0 ${2 * hit}px rgba(55,58,192,${0.35 * hit})` : undefined, WebkitMaskImage: `linear-gradient(90deg, #000 ${write(i) * 115 - 15}%, transparent ${write(i) * 115}%)` }}>
                  {l.value}
                </span>
              </div>
            );
          })}
          <div style={{ marginTop: 10, border: "1.5px solid #D9D4C6", borderRadius: 10, overflow: "hidden" }}>
            {TABLE.map((r, i) => (
              <div key={i} style={{ display: "flex", borderTop: i ? "1.5px solid #E7E3D8" : undefined, opacity: write(4 + i) }}>
                {r.map((c, j) => (
                  <div key={j} style={{ flex: 1, padding: "8px 16px", fontFamily: i ? HAND : SANS, fontSize: i ? 28 : 18, color: i ? C.pencil : C.grey, borderLeft: j ? "1.5px solid #E7E3D8" : undefined }}>
                    {c}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {scan > 0 && scan < 1 ? <div style={{ position: "absolute", left: 0, right: 0, top: scan * 690 - 50, height: 100, background: "linear-gradient(180deg, rgba(55,58,192,0) 0%, rgba(55,58,192,0.16) 47%, rgba(55,58,192,0.6) 50%, rgba(55,58,192,0.16) 53%, rgba(55,58,192,0) 100%)" }} /> : null}
          {/* light sweep across the page, once */}
          <div style={{ position: "absolute", top: -100, bottom: -100, width: 180, left: mix(-260, 760, sweep), transform: "skewX(-16deg)", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent)", opacity: sweep > 0 && sweep < 1 ? 1 : 0 }} />
        </div>
        {/* data card: enters with a 3D swing, values type in */}
        <div
          style={{
            position: "absolute",
            left: 1050,
            top: 300,
            width: 580,
            background: "rgba(255,255,255,0.94)",
            borderRadius: 18,
            boxShadow: "0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(55,58,192,.08), 0 30px 70px rgba(55,58,192,.14)",
            padding: "28px 34px",
            opacity: shift,
            transform: `translateX(${(1 - shift) * 120}px) rotateY(${(1 - shift) * -22 + Math.sin(f / 55) * 1.5}deg)`,
            transformOrigin: "left center",
          }}
        >
          <div style={{ fontFamily: SANS, fontSize: 18, color: C.grey, marginBottom: 18, display: "flex", justifyContent: "space-between", paddingRight: 34 }}>
            <span>Structured output</span>
            <span style={{ color: C.blue }}>Sarvam Vision 2.1</span>
          </div>
          {FORM_LINES.map((l, i) => {
            const v = typed(i, l.out);
            const ok = spr(f, v.at + 2, 22);
            return (
              <div key={l.key} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 0", borderTop: "1px solid #EEF0FA", opacity: f >= v.at - 30 ? 1 : 0.35 }}>
                <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 19, color: C.grey, width: 110 }}>{l.key}</span>
                <span style={{ fontFamily: SANS, fontSize: 25, color: C.ink, fontWeight: 400, flex: 1, minHeight: 30 }}>
                  {v.text}
                  {v.caret ? <span style={{ display: "inline-block", width: 2, height: 26, background: C.blue, marginLeft: 2, verticalAlign: "middle", opacity: Math.floor(f / 8) % 2 ? 1 : 0.2 }} /> : null}
                </span>
                <svg width="22" height="22" viewBox="0 0 22 22" style={{ transform: `scale(${0.85 + 0.15 * ok})`, opacity: v.done ? ok : 0 }}>
                  <circle cx="11" cy="11" r="10" fill={C.blue} />
                  <path d="M6 11.5 L9.5 15 L16 7.5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Around the orb (the anchor grown big): Indian scripts arrive in sequence; a live line types. */
const OrbScene: React.FC = () => {
  const f = useCurrentFrame();
  const a = s(T.toOrb) + 12;
  if (f < a - 4 || f > s(T.toGem) + 20) return null;
  const out = p(f, s(T.toGem), 14, easeIn);
  const R = 300;
  const live = "नाम → name · पता → address · राशि → amount";
  const n = Math.max(0, Math.min(live.length, Math.floor((f - (a + 30)) * 1.3)));
  return (
    <AbsoluteFill>
      {SCRIPTS.map(([w, font], i) => {
        const ang = (i / SCRIPTS.length) * Math.PI * 2 - Math.PI / 2 + f * 0.0045;
        const k = p(f, a + i * 3, 16);
        const push = 1 + out * 0.35;
        return (
          <div key={w} style={{ position: "absolute", left: 960 + Math.cos(ang) * R * 1.6 * push - 80, top: 420 + Math.sin(ang) * R * 0.72 * push - 22, width: 160, textAlign: "center", fontFamily: font, fontSize: 30, color: w === "English" ? C.blue : "#5A5A6A", opacity: k * 0.92 * (1 - out), filter: `blur(${(1 - k) * 8 + out * 6}px)` }}>
            {w}
          </div>
        );
      })}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", flexDirection: "column", paddingBottom: 126, gap: 10, ...exitStyle(f, s(T.toGem), 12) }}>
        <div style={{ fontFamily: "'Noto Sans Devanagari', Inter, sans-serif", fontSize: 24, color: "#6A6A7A", height: 34 }}>
          {live.slice(0, n)}
          {n < live.length && f > a + 30 ? <span style={{ display: "inline-block", width: 2, height: 24, background: C.blue, marginLeft: 2, verticalAlign: "middle" }} /> : null}
        </div>
        <div>
          <Words text="22 Indian languages," at={a + 18} size={56} />
          <Words text="plus English" at={a + 30} size={56} color={C.grey} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const BURST: Sat[] = [
  { kind: "star", x: 600, y: 300, size: 80, depth: 0, at: 0 },
  { kind: "flower", x: 1330, y: 330, size: 104, depth: 1, at: 2 },
  { kind: "clover", x: 1290, y: 800, size: 80, depth: 0, at: 4 },
  { kind: "diamond", x: 650, y: 790, size: 70, depth: 1, at: 6 },
  { kind: "scallop", x: 420, y: 540, size: 60, depth: 2, at: 3 },
  { kind: "star", x: 1520, y: 560, size: 54, depth: 2, at: 5 },
  { kind: "flower", x: 820, y: 935, size: 46, depth: 2, at: 7 },
  { kind: "clover", x: 1120, y: 150, size: 40, depth: 2, at: 8 },
];

const Bench: React.FC = () => {
  const f = useCurrentFrame();
  const a = s(T.toGem) + 6;
  if (f < a - 4 || f > s(T.toLive) + 16) return null;
  const out = p(f, s(T.toLive), 12, easeIn);
  const n = interpolate(f, [a + 6, a + 40], [70, 87.3], { ...clamp, easing: expoOut });
  const b = s(T.burst);
  return (
    <AbsoluteFill>
      {BURST.map((g, i) => (
        <Satellite key={i} id={`bb${i}`} {...g} at={b + g.at} from={{ x: 960, y: 275 }} out={out} />
      ))}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 6, paddingTop: 90, ...exitStyle(f, s(T.toLive), 12), scale: String(1 + (f - a) * 0.0004) }}>
        <Words text="olmOCR-Bench" at={a} size={28} color={C.grey} weight={400} />
        <div style={{ fontFamily: SANS, fontSize: 176, fontWeight: 200, color: C.ink, letterSpacing: "-0.045em", lineHeight: 1, opacity: p(f, a + 4, 12), transform: `translateY(${(1 - p(f, a + 4, 18)) * 16}px)` }}>{n.toFixed(1)}</div>
        <Words text="State of the art" at={a + 26} size={56} color={C.blue} />
        <div style={{ fontFamily: SANS, fontSize: 18, color: C.grey, marginTop: 8, opacity: p(f, a + 40, 12) }}>Sarvam-reported score</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Live: React.FC = () => {
  const f = useCurrentFrame();
  const a = s(T.toLive) + 6;
  if (f < a - 4 || f > s(T.toEnd) + 20) return null;
  const pill = spr(f, a + 22, 25);
  const sweep = p(f, a + 40, 24, inOut);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 2, scale: String(1 + (f - a) * 0.0005) }}>
      <Words text="Sarvam Vision 2.1" at={a} size={76} />
      <Words text="Live now" at={a + 10} size={76} color={C.grey} />
      <div style={{ marginTop: 40, position: "relative", overflow: "hidden", borderRadius: 999, height: 64, padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1, background: C.blue, color: C.white, fontFamily: SANS, fontSize: 28, fontWeight: 400, transform: `scale(${0.88 + 0.12 * pill})`, opacity: Math.min(1, pill * 1.3), boxShadow: "0 8px 24px rgba(55,58,192,.25)" }}>
        sarvam.ai →
        <div style={{ position: "absolute", top: 0, bottom: 0, width: 90, left: mix(-120, 360, sweep), transform: "skewX(-18deg)", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)" }} />
      </div>
    </AbsoluteFill>
  );
};

/** End: a circle mask grows from the anchor gem into the dusk card; the wordmark resolves and holds. */
const End: React.FC = () => {
  const f = useCurrentFrame();
  const a = s(T.toEnd);
  if (f < a) return null;
  const r = spring({ frame: f - a, fps: FPS, config: { stiffness: 60, damping: 200 } });
  const radius = mix(0, 2300, r);
  const logo = p(f, a + 16, 26);
  const hold = (f - a) * 0.00035;
  const gem = onScreen(a, 742, 668 + Math.sin(a / 20) * 12);
  return (
    <AbsoluteFill style={{ clipPath: `circle(${radius}px at ${gem.x}px ${gem.y}px)` }}>
      <AbsoluteFill style={{ backgroundImage: END_CARD, transform: `scale(${1.02 + hold})` }} />
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center" }}>
        <div style={{ width: 1200, height: 700, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(168,182,250,0.45), transparent)", transform: `translate(${Math.sin(f / 34) * 160}px, ${250 + Math.sin(f / 26) * 40}px) scale(${1 + 0.1 * Math.sin(f / 30)})`, filter: "blur(20px)" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <Img src={staticFile("brand/sarvam/wordmark-light.svg")} style={{ width: 440, opacity: logo, filter: `blur(${(1 - logo) * 12}px)`, transform: `scale(${0.96 + 0.04 * logo + hold})` }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---- sound ---------------------------------------------------------------------------------
const DIR = "custom/sarvam-v4/";
const VO: [string, number, number][] = [
  // key, start (s), length (s)
  ["a", 0.4, 2.92],
  ["b", 3.85, 1.87],
  ["c", 7.25, 4.44],
  ["d", 14.45, 2.58],
  ["e", 18.75, 2.36],
  ["f", 22.2, 2.77],
];
/** Music gain per frame: -10 dB duck under the voice, 60 ms attack / 450 ms release, 0.6 s fade in,
 * ring-out (not silence) over the last 3 s. */
const MUSIC_GAIN: number[] = (() => {
  const n = s(T.end) + 2;
  const out: number[] = [];
  const base = 0.34;
  const duck = base * 0.316;
  let g = base;
  for (let i = 0; i < n; i++) {
    const t = i / FPS;
    const talking = VO.some(([, at, len]) => t >= at - 0.06 && t <= at + len + 0.05);
    const target = talking ? duck : base;
    const tau = target < g ? 0.06 : 0.45; // seconds
    g += (target - g) * (1 - Math.exp(-1 / (FPS * tau)));
    const fadeIn = Math.min(1, t / 0.6);
    const tail = t > T.end - 3 ? mix(1, 0.32, (t - (T.end - 3)) / 3) : 1;
    out.push(g * fadeIn * tail);
  }
  return out;
})();

/** A sound placed so its loudest moment (peak, seconds into the file) lands on `at`. */
const Fx: React.FC<{ file: string; at: number; peak?: number; vol: number }> = ({ file, at, peak = 0, vol }) => (
  <Sequence from={Math.max(0, s(at - peak))}>
    <Audio src={staticFile(DIR + file)} volume={vol} />
  </Sequence>
);

const Sound: React.FC = () => (
  <>
    <Audio src={staticFile(DIR + "music.mp3")} volume={(fr) => MUSIC_GAIN[Math.min(fr, MUSIC_GAIN.length - 1)]} />
    {VO.map(([k, at]) => (
      <Sequence key={k} from={s(at)}>
        <Audio src={staticFile(`${DIR}vo-${k}.wav`)} />
      </Sequence>
    ))}
    {/* feathered wipe: whoosh peak on the wipe's middle frame */}
    <Fx file="sfx-whoosh.wav" at={T.wipe + 0.3} peak={0.4} vol={0.16} />
    {/* paper swings in */}
    <Fx file="sfx-whoosh.wav" at={T.toForm + 0.25} peak={0.4} vol={0.1} />
    {/* pencil writing under the handwriting */}
    <Fx file="sfx-scribble.wav" at={T.write} vol={0.12} />
    {/* scan: swell ends where the scan finishes; chime as the data card lands */}
    <Fx file="sfx-swell.wav" at={T.scan + 1.27} peak={1.58} vol={0.1} />
    <Fx file="sfx-chime.wav" at={T.shift + 0.15} vol={0.12} />
    {/* a soft tick as each value finishes typing */}
    {[0, 1, 2, 3].map((i) => (
      <Fx key={i} file="sfx-tick.wav" at={T.shift + (14 + i * 12) / FPS + [12, 24, 10, 5][i] / 1.6 / FPS + 0.07} vol={0.07} />
    ))}
    {/* badge gem grows into the orb */}
    <Fx file="sfx-whoosh.wav" at={T.toOrb + 0.4} peak={0.4} vol={0.12} />
    {/* gem burst around the score */}
    <Fx file="sfx-shimmer.wav" at={T.burst} vol={0.1} />
    {/* end: swell into the circle mask, chime as the wordmark resolves */}
    <Fx file="sfx-swell.wav" at={T.toEnd + 0.1} peak={1.58} vol={0.08} />
    <Fx file="sfx-chime.wav" at={T.toEnd + 0.75} vol={0.1} />
  </>
);

// ---- camera --------------------------------------------------------------------------------
/** Scale and drift of the whole stage at frame f. Inside each scene it pushes in ~4.5% and eases
 * back out (1 - cos), so it is at rest exactly on every scene change: no snap, no jump. */
const camAt = (f: number) => {
  const cuts = [0, T.built, T.toForm, T.toOrb, T.toGem, T.toLive, T.toEnd, T.end].map(s);
  let i = cuts.findIndex((c) => c > f);
  if (i <= 0) i = cuts.length - 1;
  const a = cuts[i - 1];
  const b = cuts[i];
  const local = Math.min(1, Math.max(0, (f - a) / Math.max(1, b - a)));
  return { scale: 1 + 0.045 * (1 - Math.cos(local * Math.PI * 2)) * 0.5, tx: Math.sin(f / 90) * 22, ty: Math.cos(f / 110) * 10 };
};
/** Where a stage point lands on screen (scale around the centre, then drift). */
const onScreen = (f: number, x: number, y: number) => {
  const c = camAt(f);
  return { x: (x - W / 2) * c.scale + W / 2 + c.tx, y: (y - H / 2) * c.scale + H / 2 + c.ty };
};

// ---- film ----------------------------------------------------------------------------------
export const SarvamVisionV4: React.FC = () => {
  useFonts();
  const f = useCurrentFrame();
  const cam = camAt(f);
  return (
    <AbsoluteFill style={{ background: C.white }}>
      <AbsoluteFill style={{ transform: `translate(${cam.tx}px, ${cam.ty}px) scale(${cam.scale})` }}>
        <Glow />
        <Built />
        <FormScene />
        <OrbScene />
        <Bench />
        <Live />
        <Anchor />
      </AbsoluteFill>
      <TitleCard />
      <End />
      <Grain />
      <Sound />
    </AbsoluteFill>
  );
};
