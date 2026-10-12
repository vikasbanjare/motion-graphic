import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Cam, Detail, RefDepth, World } from "../cred/v2/three.tsx";
import { Paper } from "../../ensemble/layers.tsx";
import { Field } from "../../ensemble/paint2d.tsx";
import { LookCtx, type Look } from "../../ensemble/look.ts";
import { expoOut, pop, ramp } from "../../ensemble/score.ts";
import { Rig } from "../cred/v6/rig.tsx";
import { ENGRAVE, Headline, Holo, PAL } from "../cred/v6/kit.tsx";
import type { Pal } from "../cred/v2/engrave.ts";
import { useV6Fonts } from "../cred/v6/LookTest.tsx";

/**
 * Claim film: the CRED v6 method as a data-driven composition. tools/claim_film.py turns a short spec (brand, claims,
 * outro rows) into a plan; this renders it:
 *   opening lines -> one engraved world per claim (licensed glTF subjects, duotone, camera move, headline)
 *   -> phone outro with the claims ticking on -> push into the screen -> lockup.
 * Every hand-over overlaps by OV frames and keeps moving (no ease-to-rest at a cut).
 * A first draft for review, not a finished film: bespoke metaphors and transitions come after the user's notes.
 */
export type Subject = { model: string; file: string; size: number; clip?: string | null; keep?: string | null; drop?: string | null; foil: number; pos: [number, number, number]; enter: number };
export type Claim = { from: number; to: number; headline: string; sub: string; palette: string; paper: string; field: string; grad: [string, string, string]; camera: "push" | "orbit" | "crane"; transition: "split" | "iris" | "wipe" | "dive"; subjects: Subject[] };
export type Plan = {
  slug: string; fps: number; frames: number; unofficial: boolean;
  brand: { name: string; line: string; logo?: string | null };
  open: { from: number; to: number }; claims: Claim[];
  outro: { from: number; to: number; title: string; rows: string[]; screen: "dark" | "light" };
  lockup: { from: number; to: number }; score?: string;
};

const W = 1920, H = 1080, OV = 12;
const MODELS = "custom/cred-v6/models/";
const look = (paper: string, ink: string): Look => ({ paper, ink, inkSoft: ink, washes: [paper], accent: ink, weight: 2.2, grain: 0.32, seed: 5 });
const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ---- opening: lines race in from both edges, the camera pulls back, the field cuts in on the beat ---------------
const wavePath = (y: number, phase: number) => {
  let d = "";
  for (let i = 0; i <= 80; i++) {
    const x = -60 + (i / 80) * (W + 120);
    d += `${i ? "L" : "M"}${x.toFixed(1)},${(y + 13 * Math.sin(((x + phase) / 460) * Math.PI * 2)).toFixed(1)}`;
  }
  return d;
};
const Opening: React.FC<{ plan: Plan }> = ({ plan }) => {
  const F = useCurrentFrame();
  const c0 = plan.claims[0];
  const lines = Array.from({ length: 13 }, (_, i) => ({ dy: (i - 6) * 38, s: Math.abs(i - 6) * 1.6, rev: i % 2 === 1 }));
  const disc = 1250 * expoOut(ramp(F, 18, 46));
  const scale = F < 25 ? 1.22 - 0.16 * expoOut(F / 25) : 1.04 - 0.04 * expoOut(ramp(F, 25, 60));
  return (
    <LookCtx.Provider value={look("#ebebe7", "#3a3a3e")}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <Paper color="#ebebe7" grain={0.4} />
        {F < 25 ? (
          <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
            {lines.filter((l) => F >= l.s).map((l, i) => {
              const k = expoOut(Math.min(1, (F - l.s) / 9));
              return <path key={i} d={wavePath(H * 0.45 + l.dy, F * 6 + l.dy * 3)} fill="none" stroke="#3a3a3e" strokeWidth={2.2} strokeLinecap="round" pathLength={1} strokeDasharray={`${k * 0.85} 1`} strokeDashoffset={l.rev ? -(1 - k * 0.85) : 0} />;
            })}
          </svg>
        ) : (
          <Field f={F} pitch={25.5} lambda={105} amp={6} speed={3.2} width={2.2} color="#9a9b93" angle={-3} reveal={0.4 + 0.2 * expoOut(ramp(F, 25, 47))} ragged={150} noiseAmp={0.3} />
        )}
        <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
          <circle cx={W * 1.12} cy={H * 0.42} r={Math.max(1, disc)} fill={c0.paper} />
        </svg>
      </AbsoluteFill>
    </LookCtx.Provider>
  );
};

// ---- a claim world -----------------------------------------------------------------------------------------------
const camFor = (c: Claim, F: number) => {
  const u = (F - c.from) / (c.to - c.from);
  if (c.camera === "orbit") {
    const a = 0.35 + 0.55 * u;
    return { pos: [Math.sin(a) * 7.2, 1.7, Math.cos(a) * 7.2] as [number, number, number], target: [0, 1.0, 0] as [number, number, number], fov: 34 };
  }
  if (c.camera === "crane") return { pos: [0.8 - 0.6 * u, 5.2 - 3.4 * u, 6.6 - 0.8 * u] as [number, number, number], target: [0, 1.0 - 0.1 * u, 0] as [number, number, number], fov: 34 };
  return { pos: [-0.4 + 0.8 * u, 1.45, 8.0 - 2.2 * u] as [number, number, number], target: [0.1, 1.1, 0] as [number, number, number], fov: 34 };
};

const Worldlet: React.FC<{ c: Claim; idx: number }> = ({ c, idx }) => {
  const F = useCurrentFrame() + c.from - OV;
  const t = F / 24;
  const cam = camFor(c, F);
  const pal = (PAL as Record<string, Pal>)[c.palette] ?? PAL.green;
  const head = expoOut(ramp(F, c.from + 14, c.from + 28));
  // leaving: a push that carries speed into the next transition
  const out = ramp(F, c.to - OV, c.to + OV);
  return (
    <LookCtx.Provider value={look(c.paper, c.grad[0])}>
      <AbsoluteFill style={{ transform: `scale(${1 + 0.12 * out * out})` }}>
        <Paper color={c.paper} grain={0.35} />
        <Field f={F} pitch={12} lambda={150} amp={4} speed={1.5} width={1.1} color={c.field} opacity={0.9} />
        <World aa>
          <Cam {...cam} />
          <RefDepth.Provider value={8}>
            <Detail.Provider value={ENGRAVE}>
              {c.subjects.map((s, j) => {
                const p = F >= s.enter ? pop(F, s.enter) : 0;
                if (p <= 0) return null;
                const keep = s.keep ? (n: string) => n === s.keep : s.drop ? (n: string) => n !== s.drop : undefined;
                return (
                  <Rig key={j} url={MODELS + s.file} size={s.size} pos={[s.pos[0], s.pos[1] - 1.6 * (1 - p), s.pos[2]]} rot={[0, 0.5 + j * 1.3 + t * (s.clip ? 0 : 0.18), 0]}
                    keep={keep} clip={s.clip ?? undefined} time={t} m={{ palette: pal, foil: s.foil, seed: 10 + idx * 7 + j }} foilPhase={t * 0.2} />
                );
              })}
            </Detail.Provider>
          </RefDepth.Provider>
        </World>
        {head > 0 ? (
          <>
            <AbsoluteFill style={{ background: `radial-gradient(ellipse 34% 16% at 50% 17%, ${c.paper}f2, ${c.paper}cc 55%, ${c.paper}00 100%)`, opacity: head }} />
            <Headline text={c.headline} sub={c.sub || undefined} grad={c.grad} t={head} size={84} top={110} />
          </>
        ) : null}
      </AbsoluteFill>
    </LookCtx.Provider>
  );
};

/** How a claim enters over the previous shot (k: 0..1 across 2*OV frames). */
const Enter: React.FC<{ c: Claim; children: React.ReactNode }> = ({ c, children }) => {
  const F = useCurrentFrame() + c.from - OV;
  const k = smooth(ramp(F, c.from - OV, c.from + OV));
  if (k >= 1) return <AbsoluteFill>{children}</AbsoluteFill>;
  if (c.transition === "split") {
    const half = (H / 2 + 40) * k;
    return (
      <>
        <AbsoluteFill style={{ clipPath: `inset(${H / 2 - half}px 0px ${H / 2 - half}px 0px)`, transform: `scale(${1.14 - 0.14 * k})` }}>{children}</AbsoluteFill>
        <Holo phase={F / 30} style={{ left: 0, right: 0, top: H / 2 - half - 16, height: 16, mixBlendMode: "normal", opacity: 1 }} />
        <Holo phase={F / 30 + 0.3} style={{ left: 0, right: 0, top: H / 2 + half, height: 16, mixBlendMode: "normal", opacity: 1 }} />
      </>
    );
  }
  if (c.transition === "wipe") {
    const x = lerp(-0.3, 1.3, k) * W;
    return <AbsoluteFill style={{ clipPath: `polygon(0 0, ${x + 300}px 0, ${x - 300}px ${H}px, 0 ${H}px)`, transform: `scale(${1.1 - 0.1 * k})` }}>{children}</AbsoluteFill>;
  }
  if (c.transition === "dive") {
    const flood = 1 - Math.abs(2 * k - 1);
    return (
      <>
        <AbsoluteFill style={{ opacity: k > 0.5 ? 1 : 0, transform: `scale(${1.2 - 0.2 * k})` }}>{children}</AbsoluteFill>
        <AbsoluteFill style={{ opacity: Math.min(1, flood * 1.6) }}>
          <Holo phase={0.35 + 0.4 * Math.sin(F / 14)} style={{ inset: 0, mixBlendMode: "normal", opacity: 1, transform: `scale(${1 + 0.3 * k})` }} />
        </AbsoluteFill>
      </>
    );
  }
  // iris
  return <AbsoluteFill style={{ clipPath: `circle(${Math.max(1, 1300 * k)}px at 62% 52%)`, transform: `scale(${1.12 - 0.12 * k})` }}>{children}</AbsoluteFill>;
};

// ---- outro: phone mockup with the claims ticking on, then push into the screen ---------------------------------
const PW = 430, PH = 880;
const Phone: React.FC<{ plan: Plan; F: number; dark: number }> = ({ plan, F, dark }) => {
  const o = plan.outro;
  const night = o.screen === "dark";
  const ink = night ? "#f4f4f2" : "#141416";
  const row = (i: number) => expoOut(ramp(F, o.from + 40 + i * 8, o.from + 50 + i * 8));
  const c0 = plan.claims[0];
  return (
    <div style={{ position: "relative", width: PW, height: PH, borderRadius: 74, background: "linear-gradient(135deg, #d9d9dd, #8d8d93 40%, #e6e6ea 60%, #a6a6ac)", padding: 6, boxShadow: "0 40px 90px rgba(20,22,30,0.28), 0 10px 24px rgba(20,22,30,0.18)" }}>
      <div style={{ position: "absolute", inset: 6, borderRadius: 68, background: "#0b0b0d", padding: 12 }}>
        <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 56, overflow: "hidden", background: night ? "radial-gradient(ellipse 120% 60% at 50% 0%, #1c1c22, #0c0c0f 60%)" : "#f5f5f3" }}>
          <div style={{ position: "absolute", left: 30, top: 18, fontFamily: "Lexend", fontWeight: 500, fontSize: 17, color: ink }}>9:41</div>
          <div style={{ position: "absolute", left: "50%", top: 12, width: 118, height: 34, marginLeft: -59, borderRadius: 20, background: "#0b0b0d" }} />
          {/* the product tile: the first world's colours, the brand name (or official logo file) */}
          <div style={{ position: "absolute", left: 22, right: 22, top: 90, height: 210, borderRadius: 18, overflow: "hidden", background: `linear-gradient(135deg, ${c0.grad[0]}, ${c0.grad[1]})`, boxShadow: "0 18px 40px rgba(0,0,0,0.35)", transform: `translateY(${(1 - expoOut(ramp(F, o.from + 14, o.from + 30))) * 140}px)`, opacity: ramp(F, o.from + 14, o.from + 20) }}>
            <Holo phase={F / 40} style={{ left: 0, right: 0, top: 120, height: 34, mixBlendMode: "screen", opacity: 0.55 }} />
            {plan.brand.logo ? <Img src={staticFile(plan.brand.logo)} style={{ position: "absolute", left: 20, top: 20, height: 42 }} /> : <div style={{ position: "absolute", left: 20, top: 18, fontFamily: "Lexend", fontWeight: 600, fontSize: 30, color: "#fff" }}>{plan.brand.name}</div>}
          </div>
          <div style={{ position: "absolute", left: 24, right: 24, top: 326, opacity: expoOut(ramp(F, o.from + 30, o.from + 40)) }}>
            <div style={{ fontFamily: "Lexend", fontWeight: 600, fontSize: 20, color: ink }}>{o.title}</div>
            <div style={{ height: 1, background: night ? "rgba(255,255,255,0.12)" : "#e2e2de", margin: "16px 0 8px" }} />
            {o.rows.map((r, i) => (
              <div key={r} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "11px 0", opacity: row(i), transform: `translateY(${(1 - row(i)) * 10}px)` }}>
                <div style={{ flex: "0 0 24px", height: 24, borderRadius: 12, background: "#2fa36f", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontFamily: "Lexend" }}>✓</div>
                <div style={{ fontFamily: "Lexend", fontWeight: 400, fontSize: 16, lineHeight: 1.35, color: night ? "rgba(244,244,242,0.82)" : "#2a2a30" }}>{r}</div>
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(120deg, rgba(255,255,255,0) ${ramp(F, o.from + 20, o.to) * 160 - 50}%, rgba(255,255,255,0.10) ${ramp(F, o.from + 20, o.to) * 160 - 32}%, rgba(255,255,255,0) ${ramp(F, o.from + 20, o.to) * 160 - 14}%)` }} />
          <div style={{ position: "absolute", inset: 0, background: "#000", opacity: dark }} />
        </div>
      </div>
    </div>
  );
};

const Outro: React.FC<{ plan: Plan }> = ({ plan }) => {
  const o = plan.outro;
  const F = useCurrentFrame() + o.from - OV;
  const rise = expoOut(ramp(F, o.from - 4, o.from + 22));
  const phoneY = H / 2 - PH / 2 + 980 * (1 - rise);
  const dark = ramp(F, o.to - 16, o.to - 8);
  const push = ramp(F, o.to - 12, o.to + 2);
  const z = (1 + 0.08 * ramp(F, o.from, o.to)) * (1 + 9 * push * push);
  const word = (txt: string, at: number) =>
    txt.split(" ").map((w, i) => {
      const k = expoOut(ramp(F, at + i * 3, at + i * 3 + 10));
      return <span key={i} style={{ display: "inline-block", marginRight: 10, opacity: k, filter: `blur(${(1 - k) * 8}px)`, transform: `translateY(${(1 - k) * 12}px)` }}>{w}</span>;
    });
  const side: React.CSSProperties = { position: "absolute", top: H / 2 - 30, width: 620, fontFamily: "Lexend", fontWeight: 500, fontSize: 44, whiteSpace: "nowrap", color: "#17171b", letterSpacing: -0.5 };
  const enter = smooth(ramp(F, o.from - OV, o.from + OV));
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse 70% 60% at 50% 45%, #ffffff, #ececea 70%, #e2e2df)", clipPath: enter < 1 ? `circle(${Math.max(1, 1300 * enter)}px at 50% 55%)` : undefined }}>
      <AbsoluteFill style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.045) 1px, transparent 1px)", backgroundSize: "120px 120px", backgroundPosition: "center" }} />
      <AbsoluteFill style={{ transform: `scale(${z})`, transformOrigin: `${W / 2}px ${phoneY + PH / 2}px` }}>
        <div style={{ position: "absolute", left: W / 2 - 300, width: 600, top: H / 2 + PH / 2 + 10, height: 70, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 50%, rgba(20,22,30,0.28), rgba(20,22,30,0) 70%)", opacity: rise }} />
        <div style={{ position: "absolute", inset: 0, perspective: 2200 }}>
          <div style={{ position: "absolute", left: W / 2 - PW / 2, top: phoneY, transform: `rotateY(${-22 * (1 - rise) + 5 * Math.sin((F - o.from) / 24 * 0.9) * rise}deg) rotateX(${8 * (1 - rise) + 2 * Math.sin((F - o.from) / 24 * 0.7)}deg)` }}>
            <Phone plan={plan} F={F} dark={dark} />
          </div>
        </div>
        <div style={{ ...side, right: W / 2 + PW / 2 + 70, textAlign: "right" }}>{word(plan.brand.name, o.from + 30)}</div>
        <div style={{ ...side, left: W / 2 + PW / 2 + 70 }}>{word(plan.brand.line || o.title, o.from + 38)}</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---- lockup -------------------------------------------------------------------------------------------------------
const Lockup: React.FC<{ plan: Plan }> = ({ plan }) => {
  const f = useCurrentFrame();
  const k = expoOut(ramp(f, 4, 20));
  const line = expoOut(ramp(f, 14, 30));
  return (
    <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center" }}>
      <AbsoluteFill style={{ background: `linear-gradient(110deg, rgba(255,255,255,0) ${ramp(f, 10, 60) * 160 - 40}%, rgba(255,255,255,0.06) ${ramp(f, 10, 60) * 160 - 25}%, rgba(255,255,255,0) ${ramp(f, 10, 60) * 160 - 10}%)` }} />
      <div style={{ display: "grid", justifyItems: "center", gap: 26, transform: `scale(${1 + 0.0016 * f})` }}>
        {plan.brand.logo ? (
          <Img src={staticFile(plan.brand.logo)} style={{ height: 150, opacity: k, transform: `translateY(${(1 - k) * 16}px)` }} />
        ) : (
          <div style={{ fontFamily: "Lexend", fontWeight: 600, fontSize: 120, color: "#fff", letterSpacing: -3, opacity: k, transform: `translateY(${(1 - k) * 16}px)` }}>{plan.brand.name}</div>
        )}
        {plan.brand.line ? <div style={{ fontFamily: "Lexend", fontWeight: 500, fontSize: 38, letterSpacing: "0.04em", color: "rgba(255,255,255,0.86)", opacity: line }}>{plan.brand.line}</div> : null}
      </div>
      {plan.unofficial ? <div style={{ position: "absolute", bottom: 40, fontFamily: "Lexend", fontSize: 18, letterSpacing: "0.2em", color: "rgba(255,255,255,0.45)" }}>UNOFFICIAL SPEC WORK</div> : null}
    </AbsoluteFill>
  );
};

export const ClaimFilm: React.FC<{ plan: Plan }> = ({ plan }) => {
  useV6Fonts();
  return (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence durationInFrames={plan.open.to + OV} name="opening">
      <Opening plan={plan} />
    </Sequence>
    {plan.claims.map((c, i) => (
      <Sequence key={i} from={c.from - OV} durationInFrames={c.to - c.from + 2 * OV} name={`claim ${i + 1}: ${c.headline} (${c.transition} in)`}>
        <Enter c={c}>
          <Worldlet c={c} idx={i} />
        </Enter>
      </Sequence>
    ))}
    <Sequence from={plan.outro.from - OV} durationInFrames={plan.outro.to - plan.outro.from + OV + 4} name="outro: phone mockup">
      <Outro plan={plan} />
    </Sequence>
    <Sequence from={plan.lockup.from - 4} name="lockup">
      <Lockup plan={plan} />
    </Sequence>
    {plan.score ? <Audio src={staticFile(plan.score)} /> : null}
  </AbsoluteFill>
  );
};
