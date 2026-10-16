import { useEffect, useState } from "react";
import type { Scene, SceneType } from "../../../src/engine/schema.ts";
import type { Ctx } from "../App.tsx";
import { api, type FileInfo } from "../api.ts";
import { COMMON_FIELDS, SCENES, type Field } from "../fields.ts";
import { Card, Chips, FilePicker, Row } from "../ui.tsx";

type Obj = Record<string, unknown>;

const setKey = (o: Obj, key: string, v: unknown): Obj => {
  const next = { ...o };
  if (v === undefined || v === "" || (Array.isArray(v) && v.length === 0)) delete next[key];
  else next[key] = v;
  return next;
};

/** Step 5: the beats of the video, one card per scene. */
export const Storyboard: React.FC<Ctx> = ({ spec, update, check, seek }) => {
  const [open, setOpen] = useState<number | null>(0);
  const [adding, setAdding] = useState(false);
  const [files, setFiles] = useState<Record<string, FileInfo[]>>({});
  const refresh = () =>
    Promise.all((["images", "clips", "brand", "refs"] as const).map(async (k) => [k, await api.files(k).catch(() => [])] as const)).then((e) => setFiles(Object.fromEntries(e)));
  useEffect(() => {
    refresh();
  }, []);

  const scenes = spec.scenes;
  const edit = (i: number, fn: (s: Obj) => Obj) => update((s) => ({ ...s, scenes: s.scenes.map((x, j) => (j === i ? (fn(x as Obj) as Scene) : x)) }));
  const move = (i: number, d: number) =>
    update((s) => {
      const a = [...s.scenes];
      const j = i + d;
      if (j < 0 || j >= a.length) return s;
      [a[i], a[j]] = [a[j], a[i]];
      return { ...s, scenes: a };
    });
  const add = (type: SceneType) => {
    update((s) => ({ ...s, scenes: [...s.scenes, structuredClone(SCENES[type].sample) as Scene] }));
    setOpen(scenes.length);
    setAdding(false);
  };

  return (
    <div>
      <h2>Storyboard</h2>
      <p className="lede">
        One card per beat. <b>Say</b> is what the narrator says; the other fields are what appears on screen. Timing follows the narration even without a
        voice-over, so the preview already plays at the right speed.
      </p>
      <ol className="scenes">
        {scenes.map((scene, i) => {
          const info = SCENES[scene.type];
          const t = check?.timeline.find((x) => x.index === i);
          const sceneErrors = check?.errors.filter((e) => e.startsWith(`scenes.${i}.`) || e.includes(`Scene ${i + 1}`)) ?? [];
          return (
            <li key={i} className={`scene ${open === i ? "open" : ""}`}>
              <header onClick={() => setOpen(open === i ? null : i)}>
                <span className="num">{i + 1}</span>
                <b>{info.label}</b>
                <span className="summary">{summary(scene as Obj)}</span>
                {t ? <span className="dur">{t.duration.toFixed(1)} s</span> : null}
                {sceneErrors.length ? <span className="err-dot" title={sceneErrors.join("\n")} /> : null}
                <span className="actions" onClick={(e) => e.stopPropagation()}>
                  {t ? <button title="Play from here" onClick={() => seek(t.from + 0.1)}>▶</button> : null}
                  <button title="Move up" onClick={() => move(i, -1)}>↑</button>
                  <button title="Move down" onClick={() => move(i, 1)}>↓</button>
                  <button title="Duplicate" onClick={() => update((s) => ({ ...s, scenes: [...s.scenes.slice(0, i + 1), structuredClone(s.scenes[i]), ...s.scenes.slice(i + 1)] }))}>⧉</button>
                  <button
                    title="Delete"
                    disabled={scenes.length === 1}
                    onClick={() => update((s) => ({ ...s, scenes: s.scenes.filter((_, j) => j !== i) }))}
                  >
                    ✕
                  </button>
                </span>
              </header>
              {open === i ? (
                <div className="scene-body">
                  <Row label="Scene type">
                    <select
                      value={scene.type}
                      onChange={(e) => {
                        const type = e.target.value as SceneType;
                        // Keep what carries over (narration, timing); start the rest from the sample.
                        edit(i, (s) => ({ ...structuredClone(SCENES[type].sample), say: s.say, duration: s.duration, bg: s.bg, sfx: s.sfx }));
                      }}
                    >
                      {(Object.keys(SCENES) as SceneType[]).map((k) => (
                        <option key={k} value={k}>
                          {SCENES[k].label}
                        </option>
                      ))}
                    </select>
                  </Row>
                  <p className="hint">{info.use}</p>
                  {info.fields.map((f) => (
                    <FieldEditor key={f.key} field={f} scene={scene as Obj} onChange={(fn) => edit(i, fn)} files={files} onUploaded={refresh} />
                  ))}
                  <hr />
                  {COMMON_FIELDS.map((f) => (
                    <FieldEditor key={f.key} field={f} scene={scene as Obj} onChange={(fn) => edit(i, fn)} files={files} onUploaded={refresh} />
                  ))}
                  {sceneErrors.map((e) => (
                    <div key={e} className="banner error">
                      {e}
                    </div>
                  ))}
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
      {adding ? (
        <div className="grid cards">
          {(Object.keys(SCENES) as SceneType[]).map((k) => (
            <Card key={k} onClick={() => add(k)}>
              <b>{SCENES[k].label}</b>
              <span className="hint">{SCENES[k].use}</span>
            </Card>
          ))}
        </div>
      ) : (
        <button className="primary" disabled={scenes.length >= 30} onClick={() => setAdding(true)}>
          + Add a scene
        </button>
      )}
    </div>
  );
};

const summary = (s: Obj) => {
  const first = ["punch", "headline", "value", "quote", "prompt", "action", "name", "caption", "text", "title"].map((k) => s[k]).find((v) => typeof v === "string" && v);
  const lines = Array.isArray(s.lines) ? (s.lines as string[]).join(" / ") : Array.isArray(s.items) && typeof (s.items as unknown[])[0] === "string" ? (s.items as string[]).join(" · ") : "";
  return String(first ?? lines ?? "").replace(/[*=~]/g, "").slice(0, 60);
};

const FieldEditor: React.FC<{ field: Field; scene: Obj; onChange: (fn: (s: Obj) => Obj) => void; files: Record<string, FileInfo[]>; onUploaded: () => void }> = ({
  field: f,
  scene,
  onChange,
  files,
  onUploaded,
}) => {
  const v = scene[f.key];
  const set = (val: unknown) => onChange((s) => setKey(s, f.key, val));
  switch (f.kind) {
    case "text":
    case "rich":
      return (
        <Row label={f.label + (f.kind === "text" && "required" in f && f.required ? " *" : "")} hint={f.hint}>
          <input value={(v as string) ?? ""} maxLength={"max" in f ? f.max : undefined} onChange={(e) => set(e.target.value)} />
        </Row>
      );
    case "long":
      return (
        <Row label={f.label} hint={f.hint}>
          <textarea rows={2} value={(v as string) ?? ""} maxLength={"max" in f ? f.max : undefined} onChange={(e) => set(e.target.value)} />
        </Row>
      );
    case "lines":
      return (
        <Row label={f.label} hint={f.hint ?? `Up to ${f.max}`}>
          <textarea
            rows={Math.min(f.max, 4)}
            value={((v as string[]) ?? []).join("\n")}
            onChange={(e) => set(e.target.value.split("\n").slice(0, f.max).filter((x, idx, a) => x || idx < a.length - 1))}
            onBlur={(e) => set(e.target.value.split("\n").map((x) => x.trim()).filter(Boolean))}
          />
        </Row>
      );
    case "number":
      return (
        <Row label={f.label} hint={f.hint}>
          <input type="number" min={f.min} max={f.max} step={f.step ?? 1} value={(v as number) ?? ""} onChange={(e) => set(e.target.value === "" ? undefined : Number(e.target.value))} />
        </Row>
      );
    case "choice":
      if (f.key === "sfx")
        return (
          <Row label={f.label}>
            <Chips options={f.options} value={v === undefined ? undefined : v ? "on" : "off"} allowNone="default" onChange={(x) => set(x === undefined ? undefined : x === "on")} />
          </Row>
        );
      return (
        <Row label={f.label} hint={f.hint}>
          <Chips options={f.options} value={v as string} allowNone="default" onChange={(x) => set(x)} />
        </Row>
      );
    case "toggle":
      return (
        <Row label={f.label} hint={f.hint}>
          <input type="checkbox" checked={Boolean(v)} onChange={(e) => set(e.target.checked || undefined)} />
        </Row>
      );
    case "media": {
      const kind = f.accept === "video" ? "clips" : scene.type === "logo" ? "brand" : "images";
      const pool = [...(files[kind] ?? []), ...(files.refs ?? [])].filter((x) => (f.accept === "video" ? /\.(mp4|mov|webm)$/i : /\.(png|jpe?g|webp|gif|svg)$/i).test(x.name));
      return (
        <Row label={f.label + ("required" in f && f.required ? " *" : "")}>
          <FilePicker kind={kind} accept={f.accept === "video" ? "video/mp4,video/webm,video/quicktime" : "image/*"} value={v as string} files={pool} onChange={set} onUploaded={onUploaded} />
        </Row>
      );
    }
    case "compare": {
      const side = (k: "left" | "right") => (scene[k] as { label: string; items: string[] }) ?? { label: "", items: [] };
      const setSide = (k: "left" | "right", patch: Partial<{ label: string; items: string[] }>) => onChange((s) => ({ ...s, [k]: { ...side(k), ...patch } }));
      return (
        <div className="two-col">
          {(["left", "right"] as const).map((k) => (
            <div key={k}>
              <Row label={k === "left" ? "Left title" : "Right title"}>
                <input value={side(k).label} onChange={(e) => setSide(k, { label: e.target.value })} />
              </Row>
              <Row label="Rows (up to 4)">
                <textarea rows={4} value={side(k).items.join("\n")} onChange={(e) => setSide(k, { items: e.target.value.split("\n").slice(0, 4) })} onBlur={(e) => setSide(k, { items: e.target.value.split("\n").map((x) => x.trim()).filter(Boolean) })} />
              </Row>
            </div>
          ))}
        </div>
      );
    }
    case "bars": {
      const bars = (scene.bars as { label: string; value: number }[]) ?? [];
      const setBars = (b: { label: string; value: number }[]) => onChange((s) => ({ ...s, bars: b }));
      return (
        <Row label="Bars (2-6, real numbers)">
          <div className="list-edit">
            {bars.map((b, j) => (
              <span key={j} className="inline">
                <input value={b.label} placeholder="label" onChange={(e) => setBars(bars.map((x, k) => (k === j ? { ...x, label: e.target.value } : x)))} />
                <input type="number" value={b.value} onChange={(e) => setBars(bars.map((x, k) => (k === j ? { ...x, value: Number(e.target.value) } : x)))} />
                <button disabled={bars.length <= 2} onClick={() => setBars(bars.filter((_, k) => k !== j))}>✕</button>
              </span>
            ))}
            {bars.length < 6 ? <button onClick={() => setBars([...bars, { label: "", value: 0 }])}>+ bar</button> : null}
          </div>
        </Row>
      );
    }
    case "grid": {
      const items = (scene.items as { icon: string; label: string; sub?: string }[]) ?? [];
      const setItems = (b: { icon: string; label: string; sub?: string }[]) => onChange((s) => ({ ...s, items: b }));
      return (
        <Row label="Tiles (2-6)">
          <div className="list-edit">
            {items.map((b, j) => (
              <span key={j} className="inline">
                <input className="icon" value={b.icon} maxLength={4} onChange={(e) => setItems(items.map((x, k) => (k === j ? { ...x, icon: e.target.value } : x)))} />
                <input value={b.label} placeholder="label" onChange={(e) => setItems(items.map((x, k) => (k === j ? { ...x, label: e.target.value } : x)))} />
                <input value={b.sub ?? ""} placeholder="sub (optional)" onChange={(e) => setItems(items.map((x, k) => (k === j ? { ...x, sub: e.target.value || undefined } : x)))} />
                <button disabled={items.length <= 2} onClick={() => setItems(items.filter((_, k) => k !== j))}>✕</button>
              </span>
            ))}
            {items.length < 6 ? <button onClick={() => setItems([...items, { icon: "✨", label: "" }])}>+ tile</button> : null}
          </div>
        </Row>
      );
    }
  }
};
