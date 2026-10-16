import { loadFont } from "@remotion/fonts";
import React, { useEffect, useState } from "react";
import { AbsoluteFill, Audio, Sequence, continueRender, delayRender, staticFile, useCurrentFrame } from "remotion";
import { Opening } from "./v5/Open.tsx";
import { ParcelTake } from "./v5/Parcels.tsx";
import { MacroTake, TravelTake } from "./v5/Travel.tsx";
import { FeeTake, InkFlood, ProductsTake, irisD } from "./v5/Products.tsx";
import { Matte } from "../../ensemble/layers.tsx";
import { StudioTake } from "./v2/Studio.tsx";
import { Lockup } from "./v2/Lockup.tsx";
import { T } from "./v5/looks.ts";

/**
 * CRED v5 "Ensemble": the film rebuilt on src/ensemble, where every tool is a layer on one shared look and score.
 * No dissolves: every hand-off is a matte, a morph or a match (digest rule 1). Shot-by-shot tool map: docs/ENSEMBLE.md.
 * UNOFFICIAL SPEC WORK.
 */
export const CRED_V5_FRAMES = T.end;

const useFonts = () => {
  const [h] = useState(() => delayRender("cred v5 fonts"));
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

/** The studio opens out of the speed lines through a growing circle. */
const StudioIris: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  return (
    <Matte d={irisD(F)}>
      <StudioTake />
    </Matte>
  );
};

export const CredCardV5: React.FC = () => {
  useFonts();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Sequence durationInFrames={T.assembly + 20} name="opening: pen (perfect-freehand), field (canvas + simplex)">
        <Opening />
      </Sequence>
      <Sequence from={T.wash} durationInFrames={T.macro - T.wash} name="parcel world + card: disc matte, contours, brush/rough/pen solids, flubber card, bezier bands, opentype copy">
        <ParcelTake from={T.wash} />
      </Sequence>
      <Sequence from={T.macro} durationInFrames={T.swap + 20 - T.macro} name="macro: dive into the band, field hand-off, pen lens">
        <MacroTake from={T.macro} />
      </Sequence>
      <Sequence from={T.swap - 8} durationInFrames={T.products - T.swap + 8} name="travel: lens match-cut, globe (topojson), routes on onsets (meyda)">
        <TravelTake from={T.swap - 8} />
      </Sequence>
      <Sequence from={T.matte} durationInFrames={T.card + 16 - T.matte} name="products: slab matte (polygon-clipping), still life">
        <ProductsTake from={T.matte} />
      </Sequence>
      <Sequence from={T.card} durationInFrames={T.studio + 16 - T.card} name="fee: plinth -> card morph (flubber), whip">
        <FeeTake from={T.card} />
      </Sequence>
      <Sequence from={T.studio} durationInFrames={T.lockup - T.studio} name="studio: iris out of the speed lines (three)">
        <StudioIris from={T.studio} />
      </Sequence>
      <Sequence from={T.lockup - 15} durationInFrames={15} name="ink flood (p5.brush)">
        <InkFlood from={T.lockup - 15} />
      </Sequence>
      <Sequence from={T.lockup} durationInFrames={T.end - T.lockup} name="lockup (official logo file)">
        <Lockup />
      </Sequence>
      <Audio src={staticFile("custom/cred-v2/mix.wav")} />
    </AbsoluteFill>
  );
};
