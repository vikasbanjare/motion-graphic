import { useCurrentFrame } from "remotion";
import { Shadow, Sparkles } from "../components/Decor";
import { LogoEndCard } from "../components/LogoEndCard";
import { PaintedLayer } from "../components/PaintedLayer";
import { arc, clamp, easeIO, impact, sp, wander } from "../motion";
import { palette } from "../palette";
import { Sprite } from "../paint/Sprite";
import * as S from "../paint/sprites";
import { markFrame, markFrames, type Shot } from "../storyboard";

type ShotProps = { shot: Shot };

/** Phone with a carousel of painted company cards (brand-safe: blank crests). */
const PhoneCarousel: React.FC<{ idPrefix: string; offset: number; smear?: number; picked?: number; pickedGlow?: number; children?: React.ReactNode }> = ({
  idPrefix,
  offset,
  smear = 0,
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
            // Smear: cards stretch along the swipe for the fast frames.
            transform: `scale(${(picked === i ? 1 + pickedGlow * 0.1 : 1) * (1 + smear * 0.3)}, ${(picked === i ? 1 + pickedGlow * 0.1 : 1) / (1 + smear * 0.3)})`,
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

// ── S11 · THE DROP ───────────────────────────────────────────────────────────
// The jagged burst blows in on the downbeat (backdrop + echo-burst transition);
// US STOCKS slams (text layer). On 17.2 s the phone springs up from below with
// a twist and the cards start to scroll.
export const S11Drop: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const phonePop = markFrame(shot, "phonePop");
  const up = sp(f, phonePop, "pop");
  return (
    <PaintedLayer shot={shot} push={[1.04, 1.12]}>
      <div style={{ position: "absolute", left: 0, top: 0, width: S.BURST, height: S.BURST, opacity: 0.8, transform: `scale(${0.6 + sp(f, 0, "snap") * 0.6}) rotate(${f * -0.6}deg)` }}>
        <Sprite id="s10-burst" w={S.BURST} h={S.BURST} draw={S.burst} />
      </div>
      {f >= phonePop ? (
        <div
          style={{
            position: "absolute",
            left: 500 - S.PHONE_W * 0.3,
            top: 470 + (1 - up) * 500,
            width: S.PHONE_W,
            height: S.PHONE_H,
            transform: `scale(0.6) rotate(${(1 - sp(f, phonePop, "loose")) * 18}deg)`,
            transformOrigin: "0 0",
          }}
        >
          <PhoneCarousel idPrefix="s10" offset={(f - phonePop) * 4} />
        </div>
      ) : null}
      <Sparkles from={phonePop + 4} points={[[420, 560], [600, 520, 3], [520, 760, 6]]} />
    </PaintedLayer>
  );
};

// ── S12 · THE PICK ───────────────────────────────────────────────────────────
export const S12Pick: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const swipes = markFrames(shot, "swipes");
  const pick = markFrame(shot, "pick");
  const buy = markFrame(shot, "buy");
  let offset = 0;
  let smear = 0;
  for (const s of swipes) {
    offset += 220 * sp(f, s, "snap");
    const v = sp(f, s, "snap") - sp(f - 1, s, "snap");
    smear = Math.max(smear, v);
  }
  const glow = clamp((f - pick) / 4);
  const press = f >= buy && f < buy + 4;
  const flip = clamp((f - buy - 2) / 8);
  const flipScale = Math.abs(Math.cos(flip * Math.PI));
  const showCert = flip > 0.5;
  // Thumb: flicks left on each swipe (arc), then taps the card and the button.
  const thumbBase: [number, number] = f < pick ? [640, 600] : f < buy ? [560, 470] : [470, 760];
  const flick = swipes.reduce((acc, s) => acc + (f >= s && f < s + 6 ? Math.sin(((f - s) / 6) * Math.PI) : 0), 0);
  return (
    <PaintedLayer shot={shot} push={[1.0, 1.06]}>
      <Shadow x={500} y={985} w={500} />
      <div style={{ position: "absolute", left: 500 - S.PHONE_W * 0.6, top: 30, width: S.PHONE_W, height: S.PHONE_H, transform: `scale(1.2) ${impact(f, buy, 0.04, 5)}`, transformOrigin: "0 0" }}>
        <PhoneCarousel idPrefix="s11" offset={offset} smear={smear} picked={f >= pick ? 2 : undefined} pickedGlow={glow}>
          <div style={{ position: "absolute", left: 14, top: 490, width: 300, height: 108, transform: press ? "scale(0.88, 0.8)" : `scale(${1 + (1 - sp(f, buy + 4, "pop")) * 0.1 * (f >= buy ? 1 : 0)})` }}>
            <Sprite id="s11-buy" w={300} h={108} draw={S.buyButton} />
          </div>
        </PhoneCarousel>
      </div>
      {f >= buy ? (
        <div style={{ position: "absolute", left: 500 - S.CERT_W * 0.35, top: 300 - flip * 40, width: S.CERT_W, height: S.CERT_H, transform: `scale(${0.7 * flipScale}, 0.7)`, transformOrigin: "0 0" }}>
          {showCert ? <Sprite id="s12-cert-0" w={S.CERT_W} h={S.CERT_H} draw={S.certificates[0]} /> : <Sprite id="s11-card-2" w={S.COMPANY_W} h={S.COMPANY_H} draw={S.companyCards[2]} style={{ left: 220, top: 80 }} />}
        </div>
      ) : null}
      <div style={{ position: "absolute", left: thumbBase[0] - flick * 120, top: thumbBase[1] - flick * 30, width: 180, height: 310, transform: `rotate(${-14 - flick * 10}deg)` }}>
        <Sprite id="s11-thumb" w={180} h={310} draw={S.thumb} />
      </div>
    </PaintedLayer>
  );
};

/** Certificate stack: card i drops in on a tilted arc at frames[i], lands with a squash, settles messy. */
const CertStack: React.FC<{ frames: number[]; f: number }> = ({ frames, f }) => (
  <>
    {frames.map((f0, i) => {
      if (f < f0 - 6) return null;
      const t = sp(f, f0 - 6, "land");
      const rest = [-7, 5, -3, 1.5][i % 4];
      const [x, y] = arc([900, -500], [[-40, 30, -12, 6][i % 4], [20, -24, 10, -6][i % 4]], Math.min(1, t), 0.15);
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 500 - S.CERT_W / 2 + x,
            top: 500 - S.CERT_H / 2 + y,
            width: S.CERT_W,
            height: S.CERT_H,
            transform: `perspective(1600px) rotateX(${(1 - t) * 35}deg) rotate(${(1 - t) * 30 + rest}deg) ${impact(f, f0, 0.06, 5)}`,
            filter: "drop-shadow(0 18px 18px rgba(0,32,66,0.35))",
          }}
        >
          <Sprite id={`s12-cert-${i}`} w={S.CERT_W} h={S.CERT_H} draw={S.certificates[i % S.certificates.length]} />
        </div>
      );
    })}
  </>
);

// ── S13 · THE STACK — one certificate per beat (reference: one per ~0.33 s, substitution on top).
export const S13Stack: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  return (
    <PaintedLayer shot={shot} push={[1.0, 1.08]}>
      <div style={{ position: "absolute", inset: 0, transform: `rotate(${f * 0.04}deg)`, transformOrigin: "500px 500px" }}>
        <CertStack frames={markFrames(shot, "flicks")} f={f} />
      </div>
      <Sparkles from={markFrames(shot, "flicks")[3]} points={[[760, 330], [280, 640, 3]]} />
    </PaintedLayer>
  );
};

// ── S14 · THE PROOF LINE — the top card lifts off the stack and comes to camera.
export const S14Proof: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const lift = sp(f, markFrame(shot, "lift"), "land");
  return (
    <PaintedLayer shot={shot} push={[1.0, 1.05]}>
      <div style={{ position: "absolute", inset: 0, transform: "rotate(1.9deg)", transformOrigin: "500px 500px", filter: `blur(${lift * 2}px) brightness(${1 - lift * 0.15})` }}>
        <CertStack frames={[-40, -40, -40, -40]} f={f} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 500 - S.CERT_W / 2,
          top: 500 - S.CERT_H / 2 - (1 - lift) * 20,
          width: S.CERT_W,
          height: S.CERT_H,
          transform: `scale(${1 + lift * 0.42}) rotate(${(1 - lift) * 4 + wander(f, 4, 0.6)}deg)`,
          filter: `drop-shadow(0 ${10 + lift * 30}px ${10 + lift * 20}px rgba(0,32,66,0.35))`,
        }}
      >
        <Sprite id="s13-plain" w={S.CERT_W} h={S.CERT_H} draw={S.plainCard} />
      </div>
    </PaintedLayer>
  );
};

// ── S15 · THE LAST DAB — the engraved card lands on the stack (reference 1183).
// On the music's break the camera leans in (anticipation); on the next
// downbeat "Shareholder" stamps: card jolt, shake, sparkles.
export const S15LastDab: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const breakIn = markFrame(shot, "breakIn");
  const line2 = markFrame(shot, "line2");
  const lean = easeIO(clamp((f - breakIn) / (line2 - breakIn)));
  const release = sp(f, line2, "snap");
  const shake = f >= line2 && f < line2 + 5 ? Math.sin((f - line2) * 2.7) * (5 - (f - line2)) * 1.5 : 0;
  return (
    <PaintedLayer shot={shot} push={[1.0, 1.05]}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shake}px, ${shake * 0.5}px) scale(${1 + lean * 0.05 - (f >= line2 ? release * 0.03 : 0)})`, transformOrigin: "500px 520px" }}>
        <div style={{ position: "absolute", inset: 0, transform: "rotate(2deg)", transformOrigin: "500px 500px" }}>
          <CertStack frames={[-40, -40, -40, -40]} f={f} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 500 - S.FRAME_W / 2,
            top: 500 - S.FRAME_H / 2,
            width: S.FRAME_W,
            height: S.FRAME_H,
            transform: `rotate(${-1.5 + wander(f, 7, 0.5)}deg) ${impact(f, line2, 0.035, 6)}`,
            filter: "drop-shadow(0 22px 22px rgba(0,32,66,0.4))",
          }}
        >
          <Sprite id="s14-frame" w={S.FRAME_W} h={S.FRAME_H} draw={S.ornateFrame} />
        </div>
      </div>
      <Sparkles from={line2 + 2} points={[[190, 590], [820, 560, 2], [300, 700, 4], [740, 420, 5]]} />
    </PaintedLayer>
  );
};

// ── S16 · END CARD — logo on the song's final hit; the phone ghosts back for the loop.
export const S16EndCard: React.FC<ShotProps> = ({ shot }) => {
  const f = useCurrentFrame();
  const logo = markFrame(shot, "logo");
  const ghost = markFrame(shot, "loopGhost");
  const g = clamp((f - ghost) / 12);
  return (
    <>
      <PaintedLayer shot={shot} push={[1.0, 1.03]}>
        <Sprite id="s15-phone-ghost" w={S.PHONE_W} h={S.PHONE_H} draw={S.phoneOutline} x={300} y={110} style={{ opacity: g * 0.22, transform: `scale(${0.9 + g * 0.1})` }} />
      </PaintedLayer>
      <LogoEndCard popFrame={logo} />
    </>
  );
};
