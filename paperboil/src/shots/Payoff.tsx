import { interpolate, useCurrentFrame } from "remotion";
import { LogoEndCard } from "../components/LogoEndCard";
import { PaintedLayer } from "../components/PaintedLayer";
import { palette } from "../palette";
import { Sprite } from "../paint/Sprite";
import * as S from "../paint/sprites";
import { markFrame, markFrames, type Shot } from "../storyboard";
import { clamp01, easeInOut, expoOut, pop, popIn } from "../timing";

type ShotProps = { shot: Shot };

/** Phone with a carousel of painted company cards (brand-safe: blank crests). */
const PhoneCarousel: React.FC<{ idPrefix: string; offset: number; picked?: number; pickedGlow?: number; children?: React.ReactNode }> = ({
  idPrefix,
  offset,
  picked,
  pickedGlow = 0,
  children,
}) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: S.PHONE_W, height: S.PHONE_H }}>
    <Sprite id="s1-phone" w={S.PHONE_W} h={S.PHONE_H} draw={S.phone} />
    <div style={{ position: "absolute", left: 36, top: 70, width: S.PHONE_W - 72, height: S.PHONE_H - 150, overflow: "hidden", borderRadius: 24 }}>
      <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 84, background: palette.blueMid }} />
      <div style={{ position: "absolute", left: 18, top: 30, width: 150, height: 14, borderRadius: 7, background: palette.pale }} />
      {S.companyCards.concat(S.companyCards).map((draw, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 64 + i * 220 - offset,
            top: 150,
            width: S.COMPANY_W,
            height: S.COMPANY_H,
            transform: `scale(${picked === i ? 1 + pickedGlow * 0.1 : 1})`,
            boxShadow: picked === i ? `0 0 ${40 * pickedGlow}px ${palette.orange}` : undefined,
            borderRadius: 22,
          }}
        >
          <Sprite id={`${idPrefix}-card-${i % 4}`} w={S.COMPANY_W} h={S.COMPANY_H} draw={draw} />
        </div>
      ))}
      {children}
    </div>
  </div>
);

// S10 · THE DROP ─ paint burst on the downbeat; the phone pops back at 17.0.
export const S10Drop: React.FC<ShotProps> = ({ shot }) => {
  const frame = useCurrentFrame();
  const b = markFrame(shot, "burst");
  const phonePop = markFrame(shot, "phonePop");
  const glints = markFrame(shot, "glints");
  const burstScale = interpolate(frame - b, [0, 12], [0.6, 1.4], { easing: expoOut, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <PaintedLayer shot={shot}>
      <div style={{ position: "absolute", left: 0, top: 0, width: S.BURST, height: S.BURST, opacity: 0.85, transform: `scale(${burstScale * 0.8}) rotate(${frame * -0.4}deg)` }}>
        <Sprite id="s10-burst" w={S.BURST} h={S.BURST} draw={S.burst} />
      </div>
      {frame >= phonePop ? (
        <div style={{ position: "absolute", left: 500 - S.PHONE_W * 0.3, top: 470, width: S.PHONE_W, height: S.PHONE_H, transform: `scale(${0.6 * popIn(frame - phonePop, 1.15, 8)})`, transformOrigin: "0 0" }}>
          <PhoneCarousel idPrefix="s10" offset={(frame - phonePop) * 3} />
        </div>
      ) : null}
      {[0, 1, 2].map((i) =>
        frame >= glints + i * 4 ? (
          <div key={i} style={{ position: "absolute", left: 420 + i * 90, top: 520 + (i % 2) * 70, width: S.SPARKLE, height: S.SPARKLE, transform: `scale(${0.5 * popIn(frame - glints - i * 4, 1.4, 8)})` }}>
            <Sprite id="s1-sparkle" w={S.SPARKLE} h={S.SPARKLE} draw={S.sparkle} />
          </div>
        ) : null,
      )}
    </PaintedLayer>
  );
};

// S11 · THE PICK ─ swipe, pick on beat 3, Buy on 19.5, the card flips.
export const S11Pick: React.FC<ShotProps> = ({ shot }) => {
  const frame = useCurrentFrame();
  const swipes = markFrames(shot, "swipes");
  const pick = markFrame(shot, "pick");
  const buy = markFrame(shot, "buy");
  let offset = 0;
  swipes.forEach((s) => (offset += 220 * easeInOut(clamp01((frame - s) / 6))));
  const glow = clamp01((frame - pick) / 4);
  const pressed = frame >= buy && frame < buy + 4;
  const flip = clamp01((frame - buy - 2) / 8);
  const flipScale = Math.abs(Math.cos(flip * Math.PI));
  const showCert = flip > 0.5;
  // Thumb rides the swipes, then taps the picked card and the Buy button.
  const thumbX = frame < pick ? 640 - (frame % 15) * 10 : 520;
  const thumbY = frame < buy ? 600 : 760;
  return (
    <PaintedLayer shot={shot}>
      <div style={{ position: "absolute", left: 500 - S.PHONE_W * 0.6, top: 30, width: S.PHONE_W, height: S.PHONE_H, transform: "scale(1.2)", transformOrigin: "0 0" }}>
        <PhoneCarousel idPrefix="s11" offset={offset} picked={frame >= pick ? 2 : undefined} pickedGlow={glow}>
          <div style={{ position: "absolute", left: 14, top: 490, width: 300, height: 108, transform: `scale(${pressed ? 0.9 : pop(frame - buy - 4)})` }}>
            <Sprite id="s11-buy" w={300} h={108} draw={S.buyButton} />
          </div>
        </PhoneCarousel>
      </div>
      {frame >= buy ? (
        <div style={{ position: "absolute", left: 500 - S.CERT_W * 0.35, top: 300, width: S.CERT_W, height: S.CERT_H, transform: `scale(${0.7 * flipScale}, 0.7)`, transformOrigin: "0 0" }}>
          {showCert ? <Sprite id="s12-cert-0" w={S.CERT_W} h={S.CERT_H} draw={S.certificates[0]} /> : <Sprite id="s11-card-2" w={S.COMPANY_W} h={S.COMPANY_H} draw={S.companyCards[2]} style={{ left: 220, top: 80 }} />}
        </div>
      ) : null}
      <div style={{ position: "absolute", left: thumbX, top: thumbY, width: 180, height: 310, transform: "rotate(-14deg)" }}>
        <Sprite id="s11-thumb" w={180} h={310} draw={S.thumb} />
      </div>
    </PaintedLayer>
  );
};

/** A stack of certificate cards; card i flicks in at frames[i]. */
const CertStack: React.FC<{ frames: number[]; frame: number; topCard?: React.ReactNode }> = ({ frames, frame, topCard }) => (
  <>
    {frames.map((f0, i) => {
      const e = expoOut(clamp01((frame - f0) / 6));
      const flat = easeInOut(clamp01((frame - f0 - 6) / 8));
      const rest = [-7, 5, -3, 1.5][i];
      if (frame < f0) return null;
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 500 - S.CERT_W / 2 + (1 - e) * 700 + [-40, 30, -12, 6][i],
            top: 500 - S.CERT_H / 2 - (1 - e) * 500 + [20, -24, 10, -6][i],
            width: S.CERT_W,
            height: S.CERT_H,
            transform: `rotate(${(1 - e) * 32 + rest * (1 - flat * 0.6)}deg)`,
            filter: "drop-shadow(0 18px 18px rgba(0,32,66,0.35))",
          }}
        >
          {i === frames.length - 1 && topCard ? topCard : <Sprite id={`s12-cert-${i}`} w={S.CERT_W} h={S.CERT_H} draw={S.certificates[i % S.certificates.length]} />}
        </div>
      );
    })}
  </>
);

// S12 · THE STACK
export const S12Stack: React.FC<ShotProps> = ({ shot }) => {
  const frame = useCurrentFrame();
  return (
    <PaintedLayer shot={shot}>
      <CertStack frames={markFrames(shot, "flicks")} frame={frame} />
    </PaintedLayer>
  );
};

// S13 · THE PROOF LINE ─ the top card enlarges (slow push); the proof super sits on it.
export const S13Proof: React.FC<ShotProps> = ({ shot }) => {
  const frame = useCurrentFrame();
  const grow = interpolate(frame, [0, 10], [1, 1.42], { easing: expoOut, extrapolateRight: "clamp" });
  return (
    <PaintedLayer shot={shot}>
      <CertStack frames={[-40, -40, -40]} frame={frame} />
      <div style={{ position: "absolute", left: 500 - S.CERT_W / 2, top: 500 - S.CERT_H / 2, width: S.CERT_W, height: S.CERT_H, transform: `scale(${grow})` }}>
        <Sprite id="s13-plain" w={S.CERT_W} h={S.CERT_H} draw={S.plainCard} />
      </div>
    </PaintedLayer>
  );
};

// S14 · THE LAST DAB ─ engraved frame card; the two lines are typeset on top.
export const S14LastDab: React.FC<ShotProps> = ({ shot }) => {
  const frame = useCurrentFrame();
  const line2 = markFrame(shot, "line2");
  const settle = interpolate(frame, [0, 10], [0.94, 1], { easing: expoOut, extrapolateRight: "clamp" });
  const thunk = frame >= line2 && frame < line2 + 3 ? 4 : 0;
  return (
    <PaintedLayer shot={shot}>
      <CertStack frames={[-40, -40, -40, -40]} frame={frame} />
      <div style={{ position: "absolute", left: 500 - S.FRAME_W / 2, top: 500 - S.FRAME_H / 2 + thunk, width: S.FRAME_W, height: S.FRAME_H, transform: `scale(${settle})` }}>
        <Sprite id="s14-frame" w={S.FRAME_W} h={S.FRAME_H} draw={S.ornateFrame} />
      </div>
    </PaintedLayer>
  );
};

// S15 · END CARD ─ logo pop, tracked line, and the phone ghosts back for the loop.
export const S15EndCard: React.FC<ShotProps> = ({ shot }) => {
  const frame = useCurrentFrame();
  const logo = markFrame(shot, "logo");
  const ghost = markFrame(shot, "loopGhost");
  const ghostOpacity = interpolate(frame, [ghost, ghost + 15], [0, 0.22], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <>
      <PaintedLayer shot={shot}>
        <Sprite id="s15-phone-ghost" w={S.PHONE_W} h={S.PHONE_H} draw={S.phoneOutline} x={300} y={110} style={{ opacity: ghostOpacity }} />
      </PaintedLayer>
      <LogoEndCard popFrame={logo} />
    </>
  );
};
