import React from "react";
import { Composition, Folder } from "remotion";
import { calculateVideoMetadata, Video } from "./engine/Video.tsx";
import { calculateSheetMetadata, ContactSheet } from "./engine/ContactSheet.tsx";
import { videoSchema, type VideoSpec } from "./engine/schema.ts";
import { EXAMPLES } from "./examples.ts";
import { SARVAM_VISION_FRAMES, SarvamVision } from "./custom/sarvam/SarvamVision.tsx";
import { SARVAM_V4_FRAMES, SarvamVisionV4 } from "./custom/sarvam/SarvamVisionV4.tsx";
import { CRED_TEST_FRAMES, CredCardTest } from "./custom/cred/CredCardTest.tsx";
import { CRED_V2_FRAMES, CredCardV2 } from "./custom/cred/CredCardV2.tsx";
import { CRED_V3_FRAMES, CredCardV3 } from "./custom/cred/CredCardV3.tsx";
import { CRED_V4_FRAMES, CredCardV4 } from "./custom/cred/CredCardV4.tsx";
import { F01_FRAMES, F01Press } from "./custom/cred/night/F01Press.tsx";
import { F02_FRAMES, F02Map } from "./custom/cred/night/F02Map.tsx";
import { F03_FRAMES, F03Mint } from "./custom/cred/night/F03Mint.tsx";
import { F04_FRAMES, F04Watermark } from "./custom/cred/night/F04Watermark.tsx";
import { F05_FRAMES, F05Loupe } from "./custom/cred/night/F05Loupe.tsx";
import { F06_FRAMES, F06NeoPop } from "./custom/cred/night/F06NeoPop.tsx";
import { F07_FRAMES, F07Swiss } from "./custom/cred/night/F07Swiss.tsx";
import { B_FRAMES, BNumerals } from "./custom/cred/ten/BNumerals.tsx";
import { A_FRAMES, ACity } from "./custom/cred/ten/ACity.tsx";
import { F_FRAMES, FMaze } from "./custom/cred/ten/FMaze.tsx";
import { D_FRAMES, DPrism } from "./custom/cred/ten/DPrism.tsx";
import { C_FRAMES, COrigami } from "./custom/cred/ten/COrigami.tsx";
import { E_FRAMES, EDoors } from "./custom/cred/ten/EDoors.tsx";
import { G_FRAMES, GReceipt } from "./custom/cred/ten/GReceipt.tsx";
import { I_FRAMES, IStars } from "./custom/cred/ten/IStars.tsx";
import { H_FRAMES, HBoard } from "./custom/cred/ten/HBoard.tsx";
import { J_FRAMES, JFee } from "./custom/cred/ten/JFee.tsx";

/**
 * "Video" renders whatever spec you pass with --props=specs/your-video.json.
 * The Examples folder shows every bundled example spec.
 */
export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Video"
      component={Video}
      schema={videoSchema}
      defaultProps={EXAMPLES[0].spec}
      calculateMetadata={calculateVideoMetadata}
      durationInFrames={300}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="ContactSheet"
      component={ContactSheet}
      defaultProps={{ spec: EXAMPLES[0].spec }}
      calculateMetadata={calculateSheetMetadata}
      durationInFrames={1}
      fps={30}
      width={1080}
      height={1080}
    />
    <Folder name="Custom">
      <Composition id="SarvamVision" component={SarvamVision} durationInFrames={SARVAM_VISION_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="SarvamVisionV4" component={SarvamVisionV4} durationInFrames={SARVAM_V4_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="CredCardTest" component={CredCardTest} durationInFrames={CRED_TEST_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="CredCardV2" component={CredCardV2} durationInFrames={CRED_V2_FRAMES} fps={24} width={1920} height={1080} />
      <Composition id="CredCardV3" component={CredCardV3} durationInFrames={CRED_V3_FRAMES} fps={24} width={1920} height={1080} />
      <Composition id="CredCardV4" component={CredCardV4} durationInFrames={CRED_V4_FRAMES} fps={24} width={1920} height={1080} />
      <Composition id="Night01Press" component={F01Press} durationInFrames={F01_FRAMES} fps={24} width={1920} height={1080} />
      <Composition id="Night02Map" component={F02Map} durationInFrames={F02_FRAMES} fps={24} width={1920} height={1080} />
      <Composition id="Night03Mint" component={F03Mint} durationInFrames={F03_FRAMES} fps={24} width={1920} height={1080} />
      <Composition id="Night04Watermark" component={F04Watermark} durationInFrames={F04_FRAMES} fps={24} width={1920} height={1080} />
      <Composition id="Night05Loupe" component={F05Loupe} durationInFrames={F05_FRAMES} fps={24} width={1920} height={1080} />
      <Composition id="Night06NeoPop" component={F06NeoPop} durationInFrames={F06_FRAMES} fps={24} width={1920} height={1080} />
      <Composition id="Night07Swiss" component={F07Swiss} durationInFrames={F07_FRAMES} fps={24} width={1920} height={1080} />
      <Composition id="TenB" component={BNumerals} durationInFrames={B_FRAMES} fps={24} width={1920} height={1080} />
      <Composition id="TenA" component={ACity} durationInFrames={A_FRAMES} fps={24} width={1920} height={1080} />
      <Composition id="TenF" component={FMaze} durationInFrames={F_FRAMES} fps={24} width={1920} height={1080} />
      <Composition id="TenD" component={DPrism} durationInFrames={D_FRAMES} fps={24} width={1920} height={1080} />
      <Composition id="TenC" component={COrigami} durationInFrames={C_FRAMES} fps={24} width={1920} height={1080} />
      <Composition id="TenE" component={EDoors} durationInFrames={E_FRAMES} fps={24} width={1920} height={1080} />
      <Composition id="TenG" component={GReceipt} durationInFrames={G_FRAMES} fps={24} width={1920} height={1080} />
      <Composition id="TenI" component={IStars} durationInFrames={I_FRAMES} fps={24} width={1920} height={1080} />
      <Composition id="TenH" component={HBoard} durationInFrames={H_FRAMES} fps={24} width={1920} height={1080} />
      <Composition id="TenJ" component={JFee} durationInFrames={J_FRAMES} fps={24} width={1920} height={1080} />
    </Folder>
    <Folder name="Examples">
      {EXAMPLES.map((e) => (
        <Composition
          key={e.id}
          id={e.id}
          component={Video}
          schema={videoSchema}
          defaultProps={e.spec as VideoSpec}
          calculateMetadata={calculateVideoMetadata}
          durationInFrames={300}
          fps={30}
          width={1080}
          height={1920}
        />
      ))}
    </Folder>
  </>
);
