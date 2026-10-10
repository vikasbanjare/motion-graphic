import React, { useEffect, useState } from "react";
import { AbsoluteFill, Composition, Img, continueRender, delayRender, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/fonts";
import { FoilGL, FOIL_PRESETS, RAMP_CARD, RAMP_PEARL, RAMP_SHELL } from "./fx/FoilGL";
import { FoilCSS, Glint } from "./fx/FoilCSS";
import { Lens, irisIn, irisOut } from "./fx/Lens";
import { DuotoneDefs } from "./fx/Duotone";
import { Paper } from "./fx/Paper";
import { HoloBand } from "./fx/HoloBand";
import { SheenText } from "./fx/Sheen";
import { SCENE_LUTS } from "./fx/measured";

const FONTS: { family: string; file: string; weight: string }[] = [
  { family: "Poppins", file: "fonts/Poppins-500.woff2", weight: "500" },
  { family: "Poppins", file: "fonts/Poppins-700.woff2", weight: "700" },
  { family: "Instrument Serif", file: "fonts/InstrumentSerif.woff2", weight: "400" },
  { family: "Newsreader", file: "fonts/Newsreader-opsz.woff2", weight: "200 800" },
  { family: "Lexend", file: "fonts/Lexend-500.woff2", weight: "500" },
  { family: "Frank Ruhl Libre", file: "fonts/FrankRuhlLibre-700.woff2", weight: "700" },
  ...(((globalThis as any).EXTRA_FONTS as any[]) || []),
];
const useFonts = (extra: { family: string; file: string; weight: string }[] = []) => {
  const [h] = useState(() => delayRender("fonts"));
  useEffect(() => { Promise.all([...FONTS, ...extra].map((f) => loadFont({ family: f.family, url: staticFile(f.file), weight: f.weight }).catch(() => null))).then(() => continueRender(h)); }, [h]);
};
const W = 1920, H = 1080, FPS = 24;
const Engraving: React.FC<{ lut?: string; scale?: number; style?: React.CSSProperties }> = ({ lut, scale = 1, style }) => (
  <AbsoluteFill style={{ filter: lut ? `url(#${lut})` : undefined, transform: `scale(${scale})`, ...style }}>
    <Img src={staticFile("test_engraving.png")} style={{ width: W, height: H }} />
  </AbsoluteFill>
);
const Defs: React.FC = () => <>{Object.entries(SCENE_LUTS).map(([k, v]) => <DuotoneDefs key={k} id={k} stops={v.stops} />)}</>;

// 1. WebGL foil on original objects (sphere = pearl ramp, card = card ramp); view driven by object rotation
const FxFoil: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS;
  const view: [number, number] = [0.25 * Math.sin(t * 0.9), 0.18 * Math.cos(t * 0.7)];
  return (<AbsoluteFill style={{ background: "#dce6dd" }}><Defs />
    <Engraving lut="seabed_grey" />
    <FoilGL width={W} height={H} baseSrc={staticFile("test_engraving.png")} maskSrc={staticFile("mask_sphere.png")} ramp={RAMP_SHELL}
      params={{ view, center: [760 / W, 700 / H], ...FOIL_PRESETS.shell }} style={{ position: "absolute" }} />
    <FoilGL width={W} height={H} baseSrc={staticFile("test_engraving.png")} maskSrc={staticFile("mask_card.png")} ramp={RAMP_PEARL}
      params={{ view: [view[0] * 1.4, view[1]], center: [1250 / W, 560 / H], ...FOIL_PRESETS.pearl }} style={{ position: "absolute" }} />
  </AbsoluteFill>);
};
// 2. CSS fallback foil + card glints
const FxFoilCSS: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS;
  return (<AbsoluteFill style={{ background: "#e3cdb3" }}><Defs />
    <Engraving lut="seabed_grey" />
    <FoilCSS id="fc1" ramp={RAMP_PEARL} maskSrc={staticFile("mask_sphere.png")} shift={0.15 * Math.sin(t * 0.9)} alpha={0.9} cycles={1.5} />
    <FoilCSS id="fc2" ramp={RAMP_CARD} maskSrc={staticFile("mask_card.png")} shift={0.2 * Math.sin(t * 0.9)} alpha={0.85} cycles={1.2} angle={60} />
    <AbsoluteFill style={{ WebkitMaskImage: `url(${staticFile("mask_card.png")})`, maskImage: `url(${staticFile("mask_card.png")})`, WebkitMaskSize: "100% 100%" }}>
      <Glint t={t} start={0.2} x0={0.6} y={0.36} hue0={12} width={W} height={H} />
      <Glint t={t} start={1.25} x0={0.72} y={0.42} hue0={205} width={W} height={H} />
    </AbsoluteFill>
  </AbsoluteFill>);
};
// 3. Holo band inside a lens (copy = fact: 5% rewards on online shopping)
const FxBand: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS; useFonts();
  const push = 1 + 0.03 * (t / 3);
  return (<AbsoluteFill style={{ background: "#000" }}><Defs />
    <Lens><AbsoluteFill style={{ transform: `scale(${push})` }}>
      <Engraving lut="lens_green_closeup" scale={1.4} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <HoloBand width={W * 1.1} height={64} text="5% REWARDS ON ONLINE SHOPPING" tracking={0.43} weight={500} font="Lexend, sans-serif" />
      </AbsoluteFill>
    </AbsoluteFill></Lens>
  </AbsoluteFill>);
};
// 3b. Band seen close (0.27 H tall, as in the reference push-in) for a like-for-like crop comparison
const FxBandZoom: React.FC = () => { useFonts(); return (<AbsoluteFill style={{ background: "#000" }}><Defs />
  <Lens><AbsoluteFill><Engraving lut="lens_green_closeup" scale={2.4} />
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}><HoloBand width={W * 3.2} height={0.27 * H} cycles={3} text="5% REWARDS" tracking={0.43} weight={500} font="Lexend, sans-serif" style={{ transform: "translateX(18%)" }} /></AbsoluteFill>
  </AbsoluteFill></Lens></AbsoluteFill>); };
// 4. Lens iris-in (0-0.625 s), hold with push-in, iris-out at the end
const FxLens: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS; const { durationInFrames } = useVideoConfig(); const T = durationInFrames / FPS;
  const r = t < 1 ? irisIn(t) : t > T - 1 ? irisOut(t - (T - 1), 0.95) : 1;
  const push = interpolate(t, [0, T], [1.0, 1.12]);
  return (<AbsoluteFill style={{ background: "#000" }}><Defs />
    <Lens radiusScale={r}><AbsoluteFill style={{ transform: `scale(${push})` }}><Engraving lut="lens_peach" /></AbsoluteFill></Lens>
  </AbsoluteFill>);
};
// 5. Duotone LUT grid
const FxDuotone: React.FC = () => {
  const keys = ["intro_grey_paper", "lens_peach", "columns_terracotta", "turtle_lavender", "lighthouse_mint", "seabed_grey", "lens_green_rock", "money_seal_lens", "lens_green_closeup"];
  return (<AbsoluteFill style={{ background: "#111" }}><Defs />
    {keys.map((k, i) => (<div key={k} style={{ position: "absolute", left: (i % 3) * 640, top: Math.floor(i / 3) * 360, width: 640, height: 360, overflow: "hidden" }}>
      <div style={{ width: W, height: H, transform: "scale(0.3333)", transformOrigin: "0 0", filter: `url(#${k})` }}><Img src={staticFile("test_engraving.png")} style={{ width: W, height: H }} /></div>
      <div style={{ position: "absolute", left: 10, bottom: 8, font: "500 18px Poppins, sans-serif", color: "#000", background: "rgba(255,255,255,0.7)", padding: "2px 6px" }}>{k}</div>
    </div>))}
  </AbsoluteFill>);
};
// 6. Headline sheen + subline (copy = fact: zero joining fee)
const FxSheen: React.FC<{ serif: string; sans: string }> = ({ serif, sans }) => {
  const f = useCurrentFrame(); const t = f / FPS; useFonts((globalThis as any).FX_FONTS || []);
  return (<AbsoluteFill style={{ background: "#b7b5cc" }}><Defs />
    <Engraving lut="turtle_lavender" style={{ opacity: 0.55 }} />
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 70 }}>
      <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 112, letterSpacing: "-0.03em", lineHeight: 1, fontVariationSettings: "'opsz' 72" }}>
        <SheenText t={t} ink="#49298c" sheen="#4fb6c8" frameWidth={W} startX={0.33}>zero joining fee</SheenText>
      </div>
      <div style={{ fontFamily: sans, fontWeight: 500, fontSize: 36, letterSpacing: "-0.02em", color: "#49298c", marginTop: 18 }}>5% rewards on online shopping</div>
    </AbsoluteFill>
    <Paper mottle={0.035} grain={0.1} mottleFreq={0.015} grainFreq={0.1} />
  </AbsoluteFill>);
};
const FxPaper: React.FC<{ mottle: number; grain: number; mottleFreq: number; grainFreq: number }> = (p) => (<AbsoluteFill style={{ background: "#d2d2d2" }}><Paper {...p} /></AbsoluteFill>);

export const Root: React.FC = () => (<>
  <Composition id="FxFoil" component={FxFoil} durationInFrames={96} fps={FPS} width={W} height={H} />
  <Composition id="FxFoilCSS" component={FxFoilCSS} durationInFrames={96} fps={FPS} width={W} height={H} />
  <Composition id="FxBand" component={FxBand} durationInFrames={72} fps={FPS} width={W} height={H} />
  <Composition id="FxBandZoom" component={FxBandZoom} durationInFrames={1} fps={FPS} width={W} height={H} />
  <Composition id="FxLens" component={FxLens} durationInFrames={96} fps={FPS} width={W} height={H} />
  <Composition id="FxDuotone" component={FxDuotone} durationInFrames={1} fps={FPS} width={W} height={H} />
  <Composition id="FxSheen" component={FxSheen as any} durationInFrames={96} fps={FPS} width={W} height={H} defaultProps={{ serif: "Newsreader, serif", sans: "Lexend, sans-serif" }} />
  <Composition id="FxPaper" component={FxPaper as any} durationInFrames={1} fps={FPS} width={W} height={H} defaultProps={{ mottle: 0.035, grain: 0.1, mottleFreq: 0.015, grainFreq: 0.1 }} />
</>);
