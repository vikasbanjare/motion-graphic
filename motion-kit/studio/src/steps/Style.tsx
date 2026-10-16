import { useMemo } from "react";
import type { VideoSpec } from "../../../src/engine/schema.ts";
import type { Ctx } from "../App.tsx";
import { MiniPreview } from "../preview.tsx";
import { Card, Chips, Row, Section } from "../ui.tsx";

type Preset = { name: string; use: string; theme: string; motion: string; transition: string; pace?: string };

/** One-click complete styles: a theme, a motion personality and a transition that belong together. */
export const PRESETS: Preset[] = [
  { name: "Calm premium launch", use: "ElevenLabs / Apple-style launch film", theme: "studio", motion: "calm", transition: "blur", pace: "relaxed" },
  { name: "Night studio", use: "AI / audio product, dark and quiet", theme: "studio-dark", motion: "calm", transition: "blur", pace: "relaxed" },
  { name: "Bold creator reel", use: "Big claims, fast cuts, Hinglish creators", theme: "midnight", motion: "snappy", transition: "whip", pace: "fast" },
  { name: "Tech launch", use: "AI, dev tools, gadgets", theme: "neon", motion: "snappy", transition: "zoom" },
  { name: "Clean SaaS", use: "Product demo, feature announcement", theme: "clean", motion: "smooth", transition: "push" },
  { name: "Editorial luxury", use: "Fashion, food, real estate", theme: "editorial", motion: "smooth", transition: "fade", pace: "relaxed" },
  { name: "Playful pop", use: "D2C, kids, fun events", theme: "pop", motion: "bouncy", transition: "push", pace: "fast" },
  { name: "Festive India", use: "Diwali, weddings, local shops", theme: "desi", motion: "bouncy", transition: "whip", pace: "fast" },
  { name: "Corporate trust", use: "B2B, finance, hiring, reports", theme: "corporate", motion: "smooth", transition: "push" },
  { name: "Swiss minimal", use: "Design studios, agencies", theme: "mono", motion: "snappy", transition: "cut" },
];

const MOTION_INFO: Record<string, string> = {
  snappy: "Quick, confident entrances. Reels, tech, bold claims.",
  smooth: "Even, polished glides. SaaS, corporate, editorial.",
  bouncy: "A little overshoot. Playful brands and kids.",
  calm: "Slow blur-ins and long holds. Premium launch films.",
};
const TRANSITION_INFO: Record<string, string> = {
  auto: "The theme's own",
  push: "Slide to the next beat",
  whip: "Fast blurred swipe",
  fade: "Soft dissolve",
  zoom: "Punch in through the frame",
  blur: "Defocus and refocus",
  cut: "Hard cut, no transition",
};

/** The first beats of the user's own video, short enough to loop in a tile. */
const sample = (spec: VideoSpec, patch: Partial<VideoSpec>): VideoSpec => ({
  ...spec,
  audio: { ...spec.audio, music: undefined, voiceover: undefined, sfx: false },
  scenes: spec.scenes.slice(0, 2),
  ...patch,
});

/** Step 3: complete styles, themes, motion and transitions, each previewed with your own first beats. */
export const Style: React.FC<Ctx> = ({ spec, update, catalog }) => {
  const theme = spec.theme ?? "midnight";
  const base = useMemo(() => sample(spec, {}), [spec]);
  const apply = (p: Preset) =>
    update((s) => ({ ...s, theme: p.theme as VideoSpec["theme"], motion: p.motion as VideoSpec["motion"], transition: p.transition as VideoSpec["transition"], pace: (p.pace ?? s.pace) as VideoSpec["pace"] }));

  return (
    <div>
      <h2>Style</h2>
      <p className="lede">Pick a complete style, then fine-tune the motion and transitions. Hover a tile to play it with your own first scenes.</p>

      <Section title="Complete styles" hint="A theme, motion personality and transition that belong together.">
        <div className="grid tiles">
          {PRESETS.map((p) => (
            <Card key={p.name} selected={spec.theme === p.theme && spec.motion === p.motion && spec.transition === p.transition} onClick={() => apply(p)} className="tile">
              <MiniPreview spec={{ ...base, theme: p.theme as VideoSpec["theme"], motion: p.motion as VideoSpec["motion"], transition: p.transition as VideoSpec["transition"], look: undefined }} />
              <b>{p.name}</b>
              <span className="hint">{p.use}</span>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Theme" hint="Colours, fonts and background. Fine-tune any of them in the Look step.">
        <div className="grid tiles">
          {catalog.themes.map((t) => (
            <Card key={t.name} selected={theme === t.name} onClick={() => update((s) => ({ ...s, theme: t.name as VideoSpec["theme"] }))} className="tile">
              <MiniPreview spec={{ ...base, theme: t.name as VideoSpec["theme"], look: undefined }} />
              <b>{t.name}</b>
              <span className="hint">{t.description}</span>
              <span className="swatches">
                {[t.colors.bg, t.colors.text, t.colors.accent, t.colors.accent2].map((c, k) => (
                  <i key={k} style={{ background: c }} />
                ))}
              </span>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Motion personality" hint="How things move in. Defaults to the theme's.">
        <div className="grid tiles">
          {catalog.motions.map((m) => (
            <Card key={m} selected={spec.motion === m} onClick={() => update((s) => ({ ...s, motion: m as VideoSpec["motion"] }))} className="tile">
              <MiniPreview spec={{ ...base, motion: m as VideoSpec["motion"] }} />
              <b>{m}</b>
              <span className="hint">{MOTION_INFO[m]}</span>
            </Card>
          ))}
        </div>
        <Row label="Use the theme's">
          <button className="link" onClick={() => update((s) => ({ ...s, motion: undefined }))}>
            reset motion
          </button>
        </Row>
      </Section>

      <Section title="Transitions between beats">
        <div className="grid tiles small">
          {catalog.transitions.map((t) => (
            <Card key={t} selected={(spec.transition ?? "auto") === t} onClick={() => update((s) => ({ ...s, transition: t as VideoSpec["transition"] }))} className="tile">
              <MiniPreview width={120} spec={sample(spec, { scenes: spec.scenes.slice(0, 3), transition: t as VideoSpec["transition"] })} />
              <b>{t}</b>
              <span className="hint">{TRANSITION_INFO[t]}</span>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Pace">
        <Chips options={catalog.paces} value={spec.pace ?? "normal"} onChange={(v) => update((s) => ({ ...s, pace: v as VideoSpec["pace"] }))} />
      </Section>
    </div>
  );
};
