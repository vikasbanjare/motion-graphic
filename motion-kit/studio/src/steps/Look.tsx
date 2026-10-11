import type { VideoSpec } from "../../../src/engine/schema.ts";
import type { Ctx } from "../App.tsx";
import { Card, Chips, ColorInput, Row, Section, Swatch } from "../ui.tsx";

type Look = NonNullable<VideoSpec["look"]>;

/** Canvas + text pairs that read well (text/bg 7:1 or more). */
const CANVASES: { name: string; bg: string; text: string }[] = [
  { name: "Paper", bg: "#F4EFE6", text: "#1C1917" },
  { name: "Cool white", bg: "#F5F7FA", text: "#0F172A" },
  { name: "Stone", bg: "#E7E5E4", text: "#1C1917" },
  { name: "Ink", bg: "#0C0A09", text: "#FAFAF9" },
  { name: "Midnight blue", bg: "#0B1020", text: "#F1F5F9" },
  { name: "Forest", bg: "#0F2A1F", text: "#ECFDF5" },
  { name: "Plum", bg: "#1E1028", text: "#FAF5FF" },
  { name: "Saffron night", bg: "#1A0F05", text: "#FFF7ED" },
];

/** Accent pairs (brand accent + second colour). */
const ACCENTS: { name: string; accent: string; accent2: string }[] = [
  { name: "Electric blue", accent: "#2F5BEA", accent2: "#14B8A6" },
  { name: "Coral", accent: "#F25F5C", accent2: "#FFE066" },
  { name: "Lime", accent: "#B8F34D", accent2: "#22D3EE" },
  { name: "Saffron", accent: "#FF9933", accent2: "#E11D74" },
  { name: "Violet", accent: "#7C5CFF", accent2: "#FF6AD5" },
  { name: "Emerald", accent: "#10B981", accent2: "#F59E0B" },
  { name: "Crimson", accent: "#E4002B", accent2: "#1D3557" },
  { name: "Gold", accent: "#C9A227", accent2: "#7A1F2B" },
];

/** Step 4: fonts, colours, background, texture, corners. Every pick keeps text readable. */
export const Look: React.FC<Ctx> = ({ spec, update, catalog }) => {
  const look: Look = spec.look ?? {};
  const theme = catalog.themes.find((t) => t.name === (spec.theme ?? "midnight"))!;
  const set = (patch: Partial<Look>) =>
    update((s) => {
      const next: Look = { ...(s.look ?? {}), ...patch };
      for (const k of Object.keys(next) as (keyof Look)[]) if (next[k] === undefined) delete next[k];
      return { ...s, look: Object.keys(next).length ? next : undefined };
    });
  const setBrand = (patch: Partial<NonNullable<VideoSpec["brand"]>>) => update((s) => ({ ...s, brand: { ...s.brand, ...patch } }));

  return (
    <div>
      <h2>Look</h2>
      <p className="lede">
        Change fonts, colours and texture on top of the <b>{theme.name}</b> theme. Anything you leave alone stays the theme's. A colour that wouldn't read is moved
        just enough to read (the checks panel says what moved).
      </p>
      <div className="inline right">
        <button className="link" onClick={() => update((s) => ({ ...s, look: undefined }))}>
          Reset look to the theme
        </button>
      </div>

      <Section title="Headline font">
        <div className="grid fonts">
          <Card selected={!look.displayFont} onClick={() => set({ displayFont: undefined, displayWeight: undefined, uppercase: undefined })}>
            <span className="font-sample" style={{ fontFamily: theme.fonts.display }}>
              Launch day
            </span>
            <span className="hint">Theme default</span>
          </Card>
          {catalog.displayFonts.map((f) => (
            <Card key={f.name} selected={look.displayFont === f.name} onClick={() => set({ displayFont: f.name as Look["displayFont"], displayWeight: undefined, uppercase: undefined })}>
              <span className="font-sample" style={{ fontFamily: `"${f.name}"`, fontWeight: f.weights[0], textTransform: f.upper ? "uppercase" : "none" }}>
                Launch day
              </span>
              <b>{f.name}</b>
              <span className="hint">{f.description}</span>
            </Card>
          ))}
        </div>
        {look.displayFont ? (
          <>
            <Row label="Weight">
              <Chips
                options={catalog.displayFonts.find((f) => f.name === look.displayFont)!.weights.map(String)}
                value={look.displayWeight ? String(look.displayWeight) : undefined}
                allowNone="default"
                onChange={(v) => set({ displayWeight: v ? Number(v) : undefined })}
              />
            </Row>
            <Row label="Capitals">
              <Chips options={["yes", "no"]} value={look.uppercase === undefined ? undefined : look.uppercase ? "yes" : "no"} allowNone="font default" onChange={(v) => set({ uppercase: v === undefined ? undefined : v === "yes" })} />
            </Row>
          </>
        ) : null}
      </Section>

      <Section title="Body font">
        <Chips options={catalog.bodyFonts} value={look.bodyFont} allowNone="theme default" onChange={(v) => set({ bodyFont: v as Look["bodyFont"] })} />
      </Section>

      <Section title="Canvas colours" hint="Background and main text. Muted text, cards and lines are derived from these.">
        <div className="palette-row">
          <Card selected={!look.bg && !look.text} onClick={() => set({ bg: undefined, text: undefined })} className="mini">
            <span className="pair" style={{ background: theme.colors.bg, color: theme.colors.text }}>
              Aa
            </span>
            <span className="hint">Theme</span>
          </Card>
          {CANVASES.map((p) => (
            <Card key={p.name} selected={look.bg === p.bg && look.text === p.text} onClick={() => set({ bg: p.bg, text: p.text })} className="mini">
              <span className="pair" style={{ background: p.bg, color: p.text }}>
                Aa
              </span>
              <span className="hint">{p.name}</span>
            </Card>
          ))}
        </div>
        <Row label="Background">
          <ColorInput value={look.bg} placeholder={theme.colors.bg} onChange={(v) => set({ bg: v })} />
        </Row>
        <Row label="Text">
          <ColorInput value={look.text} placeholder={theme.colors.text} onChange={(v) => set({ text: v })} />
        </Row>
      </Section>

      <Section title="Accent colours" hint="Buttons, highlights and key words. Your brand colours go here; the References step can pull them from a logo.">
        <div className="palette-row">
          {ACCENTS.map((p) => (
            <Card key={p.name} selected={spec.brand?.accent === p.accent} onClick={() => setBrand({ accent: p.accent, accent2: p.accent2 })} className="mini">
              <span className="dual">
                <Swatch hex={p.accent} size={22} />
                <Swatch hex={p.accent2} size={22} />
              </span>
              <span className="hint">{p.name}</span>
            </Card>
          ))}
        </div>
        <Row label="Accent">
          <ColorInput value={spec.brand?.accent} placeholder={theme.colors.accent} onChange={(v) => setBrand({ accent: v })} />
        </Row>
        <Row label="Second colour">
          <ColorInput value={spec.brand?.accent2} placeholder="derived from the accent" onChange={(v) => setBrand({ accent2: v })} />
        </Row>
      </Section>

      <Section title="Background and texture">
        <Row label="Background">
          <Chips options={catalog.backgrounds} value={look.background} allowNone={`theme (${theme.background})`} onChange={(v) => set({ background: v as Look["background"] })} />
        </Row>
        <Row label="Film grain">
          <Chips options={["on", "off"]} value={look.grain === undefined ? undefined : look.grain ? "on" : "off"} allowNone="theme" onChange={(v) => set({ grain: v === undefined ? undefined : v === "on" })} />
        </Row>
        <Row label="Corners">
          <Chips options={catalog.corners} value={look.corners} allowNone="theme" onChange={(v) => set({ corners: v as Look["corners"] })} />
        </Row>
        <Row label="Call to action">
          <Chips options={["button", "link"]} value={look.ctaStyle} allowNone="theme" onChange={(v) => set({ ctaStyle: v as Look["ctaStyle"] })} />
        </Row>
        <Row label="Small labels">
          <Chips options={["pill", "plain"]} value={look.kicker} allowNone="theme" onChange={(v) => set({ kicker: v as Look["kicker"] })} />
        </Row>
      </Section>
    </div>
  );
};
