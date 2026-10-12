import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { T } from "./v5/looks.ts";
import { InkFlood } from "./v5/Products.tsx";
import { ramp, expoOut } from "../../ensemble/score.ts";
import { Holo } from "./v6/kit.tsx";
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

/** Where the card's foil stripe sits on screen when the studio opens (the pull-back is centred on it). */
const STRIPE = { x: 0.34, y: 0.49 };

/** 561-645: the shell's iridescence was the card's stripe: pull back from it to the card, which then holds still. */
const StudioReveal: React.FC<{ from: number }> = ({ from }) => {
  const F = useCurrentFrame() + from;
  const k = expoOut(ramp(F, T.studio, T.studio + 26));
  const copyT = expoOut(ramp(F, T.studio + 22, T.studio + 40));
  const copy = (
    <div style={{ position: "absolute", left: 0.56 * 1920, top: 0.34 * 1080, width: 840, opacity: copyT, transform: `translateY(${(1 - copyT) * 20}px)` }}>
      <div style={{ fontFamily: "Newsreader", fontWeight: 600, fontSize: 64, lineHeight: 1.06, letterSpacing: -1.5, color: "#26262b" }}>
        the CRED IndusInd Bank
        <br />
        RuPay credit card
      </div>
      <div style={{ fontFamily: "Lexend", fontWeight: 500, fontSize: 26, color: "#5a5a64", marginTop: 22, lineHeight: 1.4 }}>redeem on flights, hotels and 2,000+ products on CRED store</div>
    </div>
  );
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${1 + 7 * (1 - k)})`, transformOrigin: `${STRIPE.x * 100}% ${STRIPE.y * 100}%` }}>
        <StudioTake calm copy={<></>} />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: 1 - ramp(F, T.studio, T.studio + 12) }}>
        <Holo phase={(F - T.card) / 60} style={{ inset: 0, mixBlendMode: "normal", opacity: 1 }} />
      </AbsoluteFill>
      {copy}
    </AbsoluteFill>
  );
};

export const CredCardV6: React.FC = () => {
  useV6Fonts();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Sequence durationInFrames={T.reveal + 2} name="opening lines, field, green disc; 5% rewards: fox in the hedge">
        <RewardsTake from={0} />
      </Sequence>
      <Sequence from={T.reveal} durationInFrames={T.macro - T.reveal} name="card: the world becomes the print, under a loupe">
        <CardTake from={T.reveal} />
      </Sequence>
      <Sequence from={T.macro} durationInFrames={T.swap + 20 - T.macro} name="macro: into the foil band, iris">
        <MacroTake from={T.macro} />
      </Sequence>
      <Sequence from={T.swap - 10} durationInFrames={T.products - T.swap + 10} name="travel: opens inside the closing lens, lantern, globe, the fox runs">
        <TravelTake from={T.swap - 10} />
      </Sequence>
      <Sequence from={T.matte} durationInFrames={T.card + 22 - T.matte} name="products: colonnade still life">
        <ProductsTake from={T.matte} />
      </Sequence>
      <Sequence from={T.card} durationInFrames={T.studio + 16 - T.card} name="zero joining fee: abalone in the deep">
        <ShellTake from={T.card} />
      </Sequence>
      <Sequence from={T.studio} durationInFrames={T.lockup - T.studio} name="studio: pull back from the foil stripe; the card holds still">
        <StudioReveal from={T.studio} />
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
