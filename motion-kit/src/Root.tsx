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
