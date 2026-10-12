import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Opening } from "./v5/Open.tsx";
import { T } from "./v5/looks.ts";
import { InkFlood, irisD } from "./v5/Products.tsx";
import { Matte } from "../../ensemble/layers.tsx";
import { StudioTake } from "./v2/Studio.tsx";
import { Lockup } from "./v2/Lockup.tsx";
import { useV6Fonts } from "./v6/LookTest.tsx";
import { CardTake, MacroTake, ProductsTake, RewardsTake, ShellTake, TravelTake } from "./v6/scenes.tsx";

/**
 * CRED v6: rebuilt from the reference diagnosis (docs/research/cred-v6-diagnosis.md).
 * Engraved real subjects (licensed glTF models) in duotones, one metaphor per claim, foil on one hero per world,
 * loupe vignette, serif headlines top-centre, scale-step cuts on the mix's onsets. UNOFFICIAL SPEC WORK.
 */
export const CRED_V6_FRAMES = T.end;

const StudioIris: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  return (
    <Matte d={irisD(F)}>
      <StudioTake />
    </Matte>
  );
};

export const CredCardV6: React.FC = () => {
  useV6Fonts();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Sequence durationInFrames={T.assembly + 20} name="opening: pen line, five lines, field">
        <Opening />
      </Sequence>
      <Sequence from={T.wash} durationInFrames={T.reveal + 2 - T.wash} name="5% rewards: fox in the hedge">
        <RewardsTake from={T.wash} />
      </Sequence>
      <Sequence from={T.reveal} durationInFrames={T.macro - T.reveal} name="card: the world becomes the print, under a loupe">
        <CardTake from={T.reveal} />
      </Sequence>
      <Sequence from={T.macro} durationInFrames={T.swap + 20 - T.macro} name="macro: into the foil band, iris">
        <MacroTake from={T.macro} />
      </Sequence>
      <Sequence from={T.swap} durationInFrames={T.products - T.swap} name="travel: lanterns, globe, the fox runs">
        <TravelTake from={T.swap} />
      </Sequence>
      <Sequence from={T.matte} durationInFrames={T.card + 22 - T.matte} name="products: colonnade still life">
        <ProductsTake from={T.matte} />
      </Sequence>
      <Sequence from={T.card} durationInFrames={T.studio + 16 - T.card} name="zero joining fee: abalone in the deep">
        <ShellTake from={T.card} />
      </Sequence>
      <Sequence from={T.studio} durationInFrames={T.lockup - T.studio} name="studio">
        <StudioIris from={T.studio} />
      </Sequence>
      <Sequence from={T.lockup - 15} durationInFrames={15} name="ink flood">
        <InkFlood from={T.lockup - 15} />
      </Sequence>
      <Sequence from={T.lockup} durationInFrames={T.end - T.lockup} name="lockup (official logo file)">
        <Lockup />
      </Sequence>
      <Audio src={staticFile("custom/cred-v2/mix.wav")} />
    </AbsoluteFill>
  );
};
