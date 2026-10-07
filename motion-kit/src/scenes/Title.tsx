import React from "react";
import type { BeatsFor } from "../engine/plan.ts";
import type { SceneOf } from "../engine/schema.ts";
import { useEnv } from "../engine/context.ts";
import { Kicker, Stage } from "../engine/stage.tsx";
import { FitText } from "../engine/text.tsx";

export const Title: React.FC<{ scene: SceneOf<"title"> }> = ({ scene }) => {
  const { box, u, scene: plan, landscape } = useEnv();
  const b = plan.beats as BeatsFor<"title">;
  return (
    <Stage gap={44}>
      {scene.kicker ? <Kicker text={scene.kicker} start={b.kicker} /> : null}
      <FitText
        text={scene.headline}
        start={b.words[0]}
        starts={b.words}
        maxWidth={box.width}
        maxHeight={box.height * (scene.sub ? 0.52 : 0.7)}
        maxSize={(landscape ? 170 : 200) * u}
      />
      {scene.sub ? (
        <FitText
          text={scene.sub}
          start={b.sub}
          font="body"
          maxWidth={box.width * 0.92}
          maxHeight={box.height * 0.24}
          maxSize={56 * u}
          minSize={34 * u}
        />
      ) : null}
    </Stage>
  );
};
