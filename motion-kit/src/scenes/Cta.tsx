import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { fitText } from "../engine/fit.ts";
import { ease, pop, prog, rise } from "../engine/motion.ts";
import { Stage } from "../engine/stage.tsx";
import { FitText } from "../engine/text.tsx";

/** The ask. One big button-shaped action that pulses, plus who to follow. */
export const Cta: React.FC<{ scene: SceneOf<"cta"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, m, c, theme, scene: plan, landscape } = useEnv();
  const b = plan.beats as BeatsFor<"cta">;
  const f = theme.fonts;

  const padX = 70 * u;
  const size = useMemo(
    () =>
      fitText({
        words: [{ text: scene.action }],
        fontFamily: f.display,
        fontWeight: f.displayWeight,
        tracking: f.displayTracking,
        upper: f.displayUpper,
        maxWidth: box.width - padX * 2,
        maxHeight: box.height * 0.22,
        maxSize: (landscape ? 170 : 200) * u,
        maxLines: 1,
        lineHeight: 1.05,
      }).fontSize,
    [scene.action, f, box, padX, u, landscape],
  );

  const landed = b.action + m.enter + 4;
  const pulse = frame > landed ? 1 + Math.sin(((frame - landed) / 30) * Math.PI * 2 * 0.9) * 0.035 : 1;
  const shine = prog(frame, landed + 6, 22, ease.inOut);

  if ((scene.style ?? theme.ctaStyle) === "link") return <LinkCta scene={scene} />;

  return (
    <Stage gap={40}>
      {scene.kicker ? (
        <FitText
          text={scene.kicker}
          start={b.kicker}
          font="body"
          weight={f.bodyStrongWeight}
          maxWidth={box.width}
          maxHeight={box.height * 0.16}
          maxSize={76 * u}
          minSize={40 * u}
        />
      ) : null}
      <div style={{ transform: `scale(${pulse.toFixed(4)})` }}>
        <div
          style={{
            ...pop(frame, b.action, m, 0.4),
            position: "relative",
            overflow: "hidden",
            padding: `${size * 0.14}px ${padX}px`,
            borderRadius: Math.min(theme.radius * 1.4, 60) * u,
            background: c.accent,
            color: c.onAccent,
            fontFamily: f.display,
            fontWeight: f.displayWeight,
            letterSpacing: `${f.displayTracking}em`,
            textTransform: f.displayUpper ? "uppercase" : "none",
            fontSize: size,
            lineHeight: 1.05,
            whiteSpace: "nowrap",
            boxShadow: `0 ${24 * u}px ${70 * u}px ${c.accent}59`,
          }}
        >
          {scene.action}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "35%",
              left: `${(-40 + shine * 140).toFixed(2)}%`,
              background: "linear-gradient(100deg, #FFFFFF00 0%, #FFFFFF59 50%, #FFFFFF00 100%)",
              transform: "skewX(-18deg)",
            }}
          />
        </div>
      </div>
      {scene.sub ? (
        <FitText
          text={scene.sub}
          start={b.sub}
          font="body"
          weight={f.bodyStrongWeight}
          maxWidth={box.width}
          maxHeight={box.height * 0.18}
          maxSize={58 * u}
          minSize={34 * u}
        />
      ) : null}
      {scene.handle ? (
        <div
          style={{
            ...rise(frame, b.handle, m, u, 0.4),
            marginTop: 20 * u,
            fontFamily: f.body,
            fontWeight: f.bodyStrongWeight,
            fontSize: 42 * u,
            color: c.muted,
            letterSpacing: "0.02em",
          }}
        >
          {scene.handle}
        </div>
      ) : null}
    </Stage>
  );
};

/**
 * Quiet launch-film ending: the kicker as a headline, then "Try X →" with an
 * underline that draws itself. Confidence instead of a flashing button.
 */
const LinkCta: React.FC<{ scene: SceneOf<"cta"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, m, c, theme, scene: plan, landscape } = useEnv();
  const b = plan.beats as BeatsFor<"cta">;
  const f = theme.fonts;
  const underline = prog(frame, b.action + m.enter, 18, ease.inOut);
  const arrow = prog(frame, b.action + m.enter + 8, 12, ease.out);
  return (
    <Stage gap={44}>
      {scene.kicker ? (
        <FitText
          text={scene.kicker}
          start={b.kicker}
          maxWidth={box.width}
          maxHeight={box.height * 0.36}
          maxSize={(landscape ? 140 : 132) * u}
        />
      ) : null}
      <div style={{ ...rise(frame, b.action, m, u, 0.4), position: "relative", paddingBottom: 14 * u }}>
        <span
          style={{
            fontFamily: f.body,
            fontWeight: f.bodyStrongWeight,
            fontSize: (landscape ? 56 : 58) * u,
            color: c.accent,
            letterSpacing: "-0.01em",
          }}
        >
          {scene.action}
          <span style={{ display: "inline-block", marginLeft: "0.35em", transform: `translate3d(${((arrow - 1) * 0.4).toFixed(3)}em, 0, 0)`, opacity: arrow }}>
            →
          </span>
        </span>
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            height: 4 * u,
            width: `${(underline * 100).toFixed(2)}%`,
            borderRadius: 99,
            background: c.accent,
          }}
        />
      </div>
      {scene.sub ? (
        <FitText
          text={scene.sub}
          start={b.sub}
          font="body"
          color={c.muted}
          maxWidth={box.width * 0.9}
          maxHeight={box.height * 0.16}
          maxSize={46 * u}
          minSize={36 * u}
        />
      ) : null}
      {scene.handle ? (
        <div style={{ ...rise(frame, b.handle, m, u, 0.3), fontFamily: f.body, fontWeight: f.bodyWeight, fontSize: 38 * u, color: c.muted }}>
          {scene.handle}
        </div>
      ) : null}
    </Stage>
  );
};
