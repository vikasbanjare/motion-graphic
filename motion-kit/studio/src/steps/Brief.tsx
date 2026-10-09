import { useEffect, useState } from "react";
import type { Ctx } from "../App.tsx";
import { api } from "../api.ts";
import { Banner, Card, Chips, Row, Section } from "../ui.tsx";

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);

/** Step 1: name the video, start from a recipe or an existing spec, set format and pace. */
export const Brief: React.FC<Ctx> = ({ spec, update, replace, name, catalog }) => {
  const [specs, setSpecs] = useState<{ name: string }[]>([]);
  const [draftName, setDraftName] = useState(name ?? "");
  const [recipe, setRecipe] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    api.specs().then(setSpecs, () => setSpecs([]));
  }, [name]);

  const start = async () => {
    const n = slug(draftName);
    if (!n) return setErr("Give the video a name first (letters and numbers).");
    setBusy(true);
    setErr(null);
    try {
      if (recipe) {
        const r = await api.fromRecipe(n, recipe, spec.format, undefined);
        replace(r.name, r.spec);
      } else {
        await api.save(n, spec);
        replace(n, spec);
      }
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <h2>Brief</h2>
      <p className="lede">What is the video, and where will people watch it? Start from a proven recipe or open one you saved.</p>

      <Section title="Name" hint="The file is saved as specs/<name>.json, so Claude in chat can open and edit the same video.">
        <div className="inline">
          <input value={draftName} placeholder="e.g. diwali-offer" onChange={(e) => setDraftName(e.target.value)} />
          <button className="primary" disabled={busy} onClick={start}>
            {name ? "Save as new" : recipe ? "Start from recipe" : "Start blank"}
          </button>
        </div>
        {err ? <Banner kind="error">{err}</Banner> : null}
        {specs.length ? (
          <div className="open-list">
            <span className="hint">Or open:</span>
            {specs.slice(0, 12).map((s) => (
              <button key={s.name} className="chip" onClick={async () => replace(s.name, await api.load(s.name))}>
                {s.name}
              </button>
            ))}
          </div>
        ) : null}
      </Section>

      <Section title="Start from a recipe" hint="Each recipe is a tested storyboard with a hook, the right number of beats and a CTA. [CAPS] slots are where your facts go.">
        <div className="grid cards">
          <Card selected={recipe === null} onClick={() => setRecipe(null)}>
            <b>Blank</b>
            <span className="hint">Build every scene yourself.</span>
          </Card>
          {catalog.recipes.map((r) => (
            <Card key={r.name} selected={recipe === r.name} onClick={() => setRecipe(r.name)}>
              <b>{r.name.replace(/-/g, " ")}</b>
              <span className="hint">{r.purpose}</span>
              <span className="tags">
                {r.format} · {r.theme}
                {r.pace ? ` · ${r.pace}` : ""}
              </span>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Where it plays">
        <Row label="Format">
          <Chips
            options={catalog.formats.map((f) => f.name)}
            value={spec.format ?? "reel"}
            onChange={(v) => update((s) => ({ ...s, format: (v ?? "reel") as typeof s.format }))}
          />
        </Row>
        <p className="hint">{catalog.formats.find((f) => f.name === (spec.format ?? "reel"))?.label}</p>
        <Row label="Pace" hint="How long text stays on screen: fast for offers and creator reels, relaxed for launch films and explainers.">
          <Chips options={catalog.paces} value={spec.pace ?? "normal"} onChange={(v) => update((s) => ({ ...s, pace: v as typeof s.pace }))} />
        </Row>
        <Row label="Brand name">
          <input value={spec.brand?.name ?? ""} onChange={(e) => update((s) => ({ ...s, brand: { ...s.brand, name: e.target.value || undefined } }))} />
        </Row>
        <Row label="Handle / website">
          <input value={spec.brand?.handle ?? ""} placeholder="@yourbrand" onChange={(e) => update((s) => ({ ...s, brand: { ...s.brand, handle: e.target.value || undefined } }))} />
        </Row>
        <Row label="Watermark">
          <input type="checkbox" checked={spec.brand?.watermark ?? false} onChange={(e) => update((s) => ({ ...s, brand: { ...s.brand, watermark: e.target.checked || undefined } }))} />
        </Row>
        <Row label="Progress bar">
          <input type="checkbox" checked={spec.progressBar ?? false} onChange={(e) => update((s) => ({ ...s, progressBar: e.target.checked || undefined }))} />
        </Row>
      </Section>
    </div>
  );
};
