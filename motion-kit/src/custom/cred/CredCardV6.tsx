import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { T } from "./v5/looks.ts";
import { Lockup } from "./v2/Lockup.tsx";
import { useV6Fonts } from "./v6/LookTest.tsx";
import { CardTake, ProductsTake, RewardsTake, ShellTake, TravelTake } from "./v6/scenes.tsx";
import { Outro } from "./v6/outro.tsx";

/**
 * CRED v6: rebuilt from the reference diagnosis (docs/research/cred-v6-diagnosis.md).
 * Engraved real subjects (licensed glTF models) in duotones, one metaphor per claim, foil on one hero per world,
 * loupe vignette, serif headlines top-centre, scale-step cuts on the mix's onsets. UNOFFICIAL SPEC WORK.
 */
export const CRED_V6_FRAMES = T.end;

export const CredCardV6: React.FC = () => {
  useV6Fonts();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Sequence durationInFrames={T.reveal + 2} name="opening lines, field, green disc; 5% rewards: fox in the hedge">
        <RewardsTake from={0} />
      </Sequence>
      <Sequence from={T.reveal} durationInFrames={310 - T.reveal} name="card: the world becomes the print; one continuous push into the foil strip">
        <CardTake from={T.reveal} />
      </Sequence>
      <Sequence from={258} durationInFrames={T.products - 258} name="travel: revealed through a magnifying glass; hotel, flights over the globe; dive into the globe">
        <TravelTake from={258} />
      </Sequence>
      <Sequence from={T.matte} durationInFrames={T.card + 22 - T.matte} name="products: the globe grid becomes the sunburst floor; colonnade still life">
        <ProductsTake from={T.matte} />
      </Sequence>
      <Sequence from={T.card} durationInFrames={T.studio + 16 - T.card} name="zero joining fee: abalone in the deep">
        <ShellTake from={T.card} />
      </Sequence>
      <Sequence from={T.studio} durationInFrames={T.lockup - T.studio} name="outro: the card on a white set drops into the phone; push into the dark screen">
        <Outro from={T.studio} />
      </Sequence>
      <Sequence from={T.lockup} durationInFrames={T.end - T.lockup} name="lockup (official logo file)">
        <Lockup />
      </Sequence>
      <Audio src={staticFile("custom/cred-v2/mix.wav")} />
    </AbsoluteFill>
  );
};
