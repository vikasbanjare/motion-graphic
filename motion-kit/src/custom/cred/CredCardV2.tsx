/**
 * CRED IndusInd Bank RuPay credit card: v2, a 30 s engraved-print film (720 frames, 24 fps, 1920x1080, 125 BPM grid).
 * UNOFFICIAL SPEC WORK. Not made, approved or commissioned by CRED or IndusInd Bank.
 *
 * Visual language studied from CRED's "CRED Money" film (engraved line-screen worlds, one duotone per world, rationed
 * foil, loupe vignette, lens swaps, asymmetric camera curves, lowercase serif with a sheen). Only numbers measured from
 * it are used; every drawing, subject, composition and sound here is original. Research + build spec:
 * scratch research-cred/BUILD-SPEC.md and CRITIQUE.md (the shot order and palettes were re-planned per the critique so
 * the film is not shot-for-shot).
 *
 * On-screen claims (only these): "5% rewards on online shopping", "zero joining fee", "redeem on flights, hotels and
 * 2,000+ products on CRED store", product name "CRED IndusInd Bank RuPay credit card" (IndusInd Bank press release,
 * Storyboard18, inc42; see CredCardTest.tsx).
 *
 * Fonts (stand-ins; CRED's faces are commercial): Newsreader variable, opsz 72 / 600 (OFL, @fontsource-variable/newsreader)
 * for the lowercase serif headlines (CRED: Cirka per the NeoPOP design system, Denton on cred.club); Lexend 500/700 (OFL,
 * @fontsource/lexend) for the geometric sans (CRED: Gilroy). Files in public/fonts, licences in public/fonts/OFL-LICENSES.txt.
 *
 * Logo: public/custom/cred-v2/cred-logo.png is CRED's own emblem + wordmark file, used unmodified (fetched from
 * cred.club by the brand scout, run 38077910677). Nothing in the film redraws or retypes it.
 * 3D models: Poly Haven CC0 (public/custom/cred-v2/models/SOURCES.md); everything else is code-modelled here.
 * Sound: original score + SFX synthesised locally on the beat grid (src/custom/cred/v2/audio/), mastered to -14 LUFS.
 *
 * Render: npx remotion render src/index.ts CredCardV2 out/cred-card-v2.mp4 --gl=swangle
 */
import { loadFont } from "@remotion/fonts";
import React, { useEffect, useState } from "react";
import { AbsoluteFill, Audio, Sequence, continueRender, delayRender, staticFile } from "remotion";
import { FRAMES, T } from "./v2/look.ts";
import { StepA, StepB } from "./v2/Opening.tsx";
import { RevealTake } from "./v2/Reveal.tsx";
import { MacroTake } from "./v2/Macro.tsx";
import { TravelTake } from "./v2/Travel.tsx";
import { ProductsTake } from "./v2/Products.tsx";
import { CardTake } from "./v2/CardPull.tsx";
import { StudioTake } from "./v2/Studio.tsx";
import { Lockup } from "./v2/Lockup.tsx";

export const CRED_V2_FRAMES = FRAMES;

const useFonts = () => {
  const [h] = useState(() => delayRender("cred v2 fonts"));
  useEffect(() => {
    Promise.all([
      loadFont({ family: "Newsreader", url: staticFile("fonts/Newsreader-opsz.woff2"), weight: "200 800" }),
      loadFont({ family: "Lexend", url: staticFile("fonts/Lexend-500.woff2"), weight: "500" }),
      loadFont({ family: "Lexend", url: staticFile("fonts/Lexend-700.woff2"), weight: "700" }),
    ])
      .then(() => continueRender(h))
      .catch((e) => {
        console.error(e);
        continueRender(h);
      });
  }, [h]);
};

export const CredCardV2: React.FC = () => {
  useFonts();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Sequence from={T.stepA} durationInFrames={T.stepB - T.stepA} name="1 line">
        <StepA />
      </Sequence>
      <Sequence from={T.stepB} durationInFrames={T.stepC - T.stepB} name="2 five lines">
        <StepB />
      </Sequence>
      <Sequence from={T.stepC} durationInFrames={T.cutMacro - T.stepC} name="3-5 field, parcel world, card reveal">
        <RevealTake />
      </Sequence>
      <Sequence from={T.cutMacro} durationInFrames={T.swap + 16 - T.cutMacro} name="6 loupe macro, push-through, lens swap">
        <MacroTake />
      </Sequence>
      <Sequence from={T.swap} durationInFrames={T.products - T.swap} name="7 route map, tilt-up, travel world">
        <TravelTake />
      </Sequence>
      <Sequence from={T.matte} durationInFrames={T.cutCard - T.matte} name="8 products world">
        <ProductsTake />
      </Sequence>
      <Sequence from={T.cutCard} durationInFrames={T.studio - T.cutCard} name="9 seal, pull-back, whip">
        <CardTake />
      </Sequence>
      <Sequence from={T.studio} durationInFrames={T.lockup - T.studio} name="10 studio">
        <StudioTake />
      </Sequence>
      <Sequence from={T.lockup} durationInFrames={FRAMES - T.lockup} name="11 lockup">
        <Lockup />
      </Sequence>
      <Audio src={staticFile("custom/cred-v2/mix.wav")} />
    </AbsoluteFill>
  );
};
