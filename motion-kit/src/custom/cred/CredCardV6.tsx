import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { T } from "./v5/looks.ts";
import { Lockup } from "./v2/Lockup.tsx";
import { useV6Fonts } from "./v6/LookTest.tsx";
import { CardTake, MATCH, OPEN, ProductsTake, RewardsTake, ShellTake, TravelTake } from "./v6/scenes.tsx";
import { Outro } from "./v6/outro.tsx";

/**
 * CRED v6: rebuilt from the reference diagnosis (docs/research/cred-v6-diagnosis.md).
 * Engraved real subjects (licensed glTF models) in duotones, one metaphor per claim, foil on one hero per world,
 * loupe vignette, serif headlines top-centre, scale-step cuts on the mix's onsets. UNOFFICIAL SPEC WORK.
 */
export const CRED_V6_FRAMES = T.end;

/** The lockup keeps breathing: a slow push so the final hold never reads as a freeze. */
const Drift: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{ transform: `scale(${1 + 0.0016 * f})` }}>{children}</AbsoluteFill>;
};

export const CredCardV6: React.FC = () => {
  useV6Fonts();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Sequence durationInFrames={T.reveal + 2} name="opening lines, field, green disc; 5% rewards: fox in the hedge">
        <RewardsTake from={0} />
      </Sequence>
      <Sequence from={T.reveal} durationInFrames={OPEN + 28 - T.reveal} name="card: the world becomes the print; one continuous push into the foil strip, which splits open">
        <CardTake from={T.reveal} />
      </Sequence>
      <Sequence from={OPEN - 4} durationInFrames={MATCH + 24 - (OPEN - 4)} name="travel: revealed through the split strip; hotel, flights over the globe; the globe becomes the colonnade floor">
        <TravelTake from={OPEN - 4} />
      </Sequence>
      <Sequence from={MATCH - 4} durationInFrames={T.card + 22 - (MATCH - 4)} name="products: the globe matches the sunburst floor from above; colonnade still life">
        <ProductsTake from={MATCH - 4} />
      </Sequence>
      <Sequence from={T.card} durationInFrames={T.studio + 16 - T.card} name="zero joining fee: abalone in the deep">
        <ShellTake from={T.card} />
      </Sequence>
      <Sequence from={T.studio} durationInFrames={T.lockup - T.studio} name="outro: the card on a white set drops into the phone; push into the dark screen">
        <Outro from={T.studio} />
      </Sequence>
      <Sequence from={T.lockup - 6} durationInFrames={T.end - T.lockup + 6} name="lockup (official logo file); overlaps the push so no frame is dead black">
        <Drift>
          <Lockup />
        </Drift>
      </Sequence>
      <Audio src={staticFile("custom/cred-v6/score.wav")} />
    </AbsoluteFill>
  );
};
