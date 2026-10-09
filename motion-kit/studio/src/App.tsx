import { useCallback, useEffect, useRef, useState } from "react";
import type { VideoSpec } from "../../src/engine/schema.ts";
import { api, type Catalog, type CheckResult } from "./api.ts";
import { Preview } from "./preview.tsx";
import { Brief } from "./steps/Brief.tsx";
import { References } from "./steps/References.tsx";
import { Style } from "./steps/Style.tsx";
import { Look } from "./steps/Look.tsx";
import { Storyboard } from "./steps/Storyboard.tsx";
import { Sound } from "./steps/Sound.tsx";
import { Make } from "./steps/Make.tsx";

export type Ctx = {
  spec: VideoSpec;
  /** Apply a change; the preview, checks and autosave follow. */
  update: (fn: (s: VideoSpec) => VideoSpec) => void;
  replace: (name: string, spec: VideoSpec) => void;
  name: string | null;
  catalog: Catalog;
  check: CheckResult | null;
  seek: (seconds: number) => void;
  go: (step: StepId) => void;
};

const STEPS = [
  { id: "brief", label: "1 · Brief", Comp: Brief },
  { id: "refs", label: "2 · References", Comp: References },
  { id: "style", label: "3 · Style", Comp: Style },
  { id: "look", label: "4 · Look", Comp: Look },
  { id: "story", label: "5 · Storyboard", Comp: Storyboard },
  { id: "sound", label: "6 · Sound", Comp: Sound },
  { id: "make", label: "7 · Make", Comp: Make },
] as const;
export type StepId = (typeof STEPS)[number]["id"];

const EMPTY: VideoSpec = {
  format: "reel",
  theme: "studio",
  scenes: [
    { type: "hook", setup: "Your idea here", punch: "Make it *move*." },
    { type: "cta", action: "Get started" },
  ],
};

export const App: React.FC = () => {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [spec, setSpec] = useState<VideoSpec>(EMPTY);
  const [name, setName] = useState<string | null>(null);
  const [step, setStep] = useState<StepId>("brief");
  const [check, setCheck] = useState<CheckResult | null>(null);
  const [saved, setSaved] = useState<"saved" | "saving" | "unsaved" | "error">("saved");
  const [seekTo, setSeekTo] = useState<number | null>(null);
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const dirty = useRef(false);

  useEffect(() => {
    api.catalog().then(setCatalog, (e) => setLoadErr(e.message));
  }, []);

  const update = useCallback((fn: (s: VideoSpec) => VideoSpec) => {
    dirty.current = true;
    setSaved("unsaved");
    setSpec((s) => fn(structuredClone(s)));
  }, []);
  const replace = useCallback((n: string, s: VideoSpec) => {
    dirty.current = false;
    setName(n);
    setSpec(s);
    setSaved("saved");
  }, []);

  // Checks (schema + craft rules + timeline) follow every edit.
  useEffect(() => {
    const t = setTimeout(() => {
      api.check(spec).then(setCheck, (e) => setCheck({ ok: false, errors: [e.message], warnings: [], notes: [], timeline: [] }));
    }, 350);
    return () => clearTimeout(t);
  }, [spec]);

  // Autosave once the video has a name.
  useEffect(() => {
    if (!name || !dirty.current) return;
    const t = setTimeout(() => {
      setSaved("saving");
      api.save(name, spec).then(
        () => {
          dirty.current = false;
          setSaved("saved");
        },
        () => setSaved("error"),
      );
    }, 700);
    return () => clearTimeout(t);
  }, [spec, name]);

  if (loadErr) return <div className="fatal">Could not reach the Studio server: {loadErr}</div>;
  if (!catalog) return <div className="fatal">Loading Motion Studio…</div>;

  const ctx: Ctx = { spec, update, replace, name, catalog, check, seek: (s) => setSeekTo(s + Math.random() * 1e-6), go: setStep };
  const Current = STEPS.find((s) => s.id === step)!.Comp;
  const idx = STEPS.findIndex((s) => s.id === step);

  return (
    <div className="app">
      <nav className="steps">
        <div className="brand">Motion Studio</div>
        {STEPS.map((s) => (
          <button key={s.id} className={s.id === step ? "step on" : "step"} onClick={() => setStep(s.id)}>
            {s.label}
          </button>
        ))}
        <div className="save-state">
          {name ? (
            <>
              <b>{name}</b>
              <span className={`dot ${saved}`}>{saved === "saved" ? "saved" : saved === "saving" ? "saving…" : saved === "error" ? "save failed" : "unsaved"}</span>
            </>
          ) : (
            <span className="hint">Not saved yet: name it in Brief.</span>
          )}
        </div>
      </nav>
      <main className="panel">
        <Current {...ctx} />
        <footer className="nav-buttons">
          {idx > 0 ? <button onClick={() => setStep(STEPS[idx - 1].id)}>← Back</button> : <span />}
          {idx < STEPS.length - 1 ? (
            <button className="primary" onClick={() => setStep(STEPS[idx + 1].id)}>
              Next: {STEPS[idx + 1].label.replace(/^\d · /, "")} →
            </button>
          ) : null}
        </footer>
      </main>
      <aside className="side">
        <Preview spec={spec} seekTo={seekTo} />
        <Status check={check} seek={(s) => setSeekTo(s + Math.random() * 1e-6)} />
      </aside>
    </div>
  );
};

const Status: React.FC<{ check: CheckResult | null; seek: (s: number) => void }> = ({ check, seek }) => {
  if (!check) return null;
  return (
    <div className="status">
      <div className={`badge ${check.errors.length ? "bad" : check.warnings.length ? "warn" : "good"}`}>
        {check.errors.length ? `${check.errors.length} to fix` : check.warnings.length ? `${check.warnings.length} suggestion${check.warnings.length > 1 ? "s" : ""}` : "Checks pass"}
        {check.duration ? <span> · {check.duration.toFixed(1)} s</span> : null}
      </div>
      {check.timeline.length ? (
        <div className="timeline">
          {check.timeline.map((t) => (
            <button key={t.index} style={{ flexGrow: t.duration }} title={`${t.index + 1}. ${t.type} · ${t.duration.toFixed(1)} s`} onClick={() => seek(t.from + 0.2)}>
              {t.index + 1}
            </button>
          ))}
        </div>
      ) : null}
      <ul className="issues">
        {check.errors.map((e, i) => (
          <li key={`e${i}`} className="error">
            {e}
          </li>
        ))}
        {check.warnings.map((w, i) => (
          <li key={`w${i}`} className="warning">
            {w}
          </li>
        ))}
        {check.notes.map((n, i) => (
          <li key={`n${i}`} className="note">
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
};
