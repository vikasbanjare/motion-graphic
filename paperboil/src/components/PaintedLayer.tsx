import { AbsoluteFill, Img, getStaticFiles, staticFile, useCurrentFrame } from "remotion";
import { ART, useLayout } from "../layout";
import { shotDuration, type Shot } from "../storyboard";
import { camera } from "../motion";
import { Boil } from "./Boil";

const ASSET_EXTS = ["png", "webp", "jpg"];

/** Finished art for a shot, if someone dropped assets/painted/<A#>.<ext>. */
export const findPaintedAsset = (assetId: string): string | null => {
  const files = getStaticFiles();
  for (const ext of ASSET_EXTS) {
    const name = `painted/${assetId}.${ext}`;
    if (files.some((f) => f.name === name)) return name;
  }
  return null;
};

type PaintedLayerProps = {
  shot: Shot;
  children: React.ReactNode;
  /** Override the shot's push-in [from, to] scale. */
  push?: [number, number];
  /** Transform origin of the push, as a fraction of the art box. */
  origin?: [number, number];
  boilScale?: number;
};

/**
 * One painted layer: positions the 1000×1000 art box for the shot's layout,
 * applies the slow push-in, and either renders the code-painted placeholder
 * (children) or the finished still from assets/painted/ with an SVG boil.
 * Paper texture and grain are applied once over the whole frame (Film.tsx).
 */
export const PaintedLayer: React.FC<PaintedLayerProps> = ({ shot, children, push, origin = [0.5, 0.5], boilScale = 6 }) => {
  const frame = useCurrentFrame();
  const layout = useLayout();
  const box = layout.artBox(shot.layout);
  const [from, to] = push ?? shot.push ?? [1, 1.05];
  // Moving hold: every shot pushes and drifts (the reference camera is never still).
  const cam = camera(frame, shotDuration(shot), { from, to, drift: 5, rot: 0.5, seed: Number(shot.id.slice(1)) });
  const asset = findPaintedAsset(shot.asset);

  return (
    <AbsoluteFill style={{ transform: cam, transformOrigin: `${box.x + box.size * origin[0]}px ${box.y + box.size * origin[1]}px` }}>
      {asset ? (
        <Boil scale={boilScale}>
          <Img src={staticFile(asset)} style={{ position: "absolute", left: box.x, top: box.y, width: box.size, height: box.size, objectFit: "contain" }} />
        </Boil>
      ) : (
        <div
          style={{
            position: "absolute",
            left: box.x,
            top: box.y,
            width: ART,
            height: ART,
            transform: `scale(${box.size / ART})`,
            transformOrigin: "0 0",
          }}
        >
          {children}
        </div>
      )}
    </AbsoluteFill>
  );
};
