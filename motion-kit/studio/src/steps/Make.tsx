import { useEffect, useState } from "react";
import type { Ctx } from "../App.tsx";
import { api, type Job, type QaResult } from "../api.ts";
import { Banner, Chips, Section } from "../ui.tsx";

/** Step 7: visual QA in memory, then render the MP4(s). */
export const Make: React.FC<Ctx> = ({ spec, name, check, catalog, seek, go }) => {
  const [qa, setQa] = useState<QaResult | null>(null);
  const [qaBusy, setQaBusy] = useState(false);
  const [qaErr, setQaErr] = useState<string | null>(null);
  const [which, setWhich] = useState<string>("this format");
  const [job, setJob] = useState<Job | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!job || job.status !== "running") return;
    const t = setInterval(() => api.job(job.id).then(setJob, () => {}), 1500);
    return () => clearInterval(t);
  }, [job]);

  const runQa = async () => {
    setQaBusy(true);
    setQaErr(null);
    try {
      setQa(await api.qa(spec));
    } catch (e) {
      setQaErr((e as Error).message);
    } finally {
      setQaBusy(false);
    }
  };
  const render = async () => {
    if (!name) return setErr("Name the video in the Brief step first.");
    setErr(null);
    try {
      await api.save(name, spec);
      const opts = which === "all formats" ? { allFormats: true } : which === "this format" ? {} : { format: which };
      const { id } = await api.render(name, opts);
      setJob(await api.job(id));
    } catch (e) {
      setErr((e as Error).message);
    }
  };
  const blocked = Boolean(check?.errors.length);

  return (
    <div>
      <h2>Make</h2>
      <p className="lede">Check the real frames, then render. Rendering uses your computer; a 30 s video takes about 1-3 minutes.</p>

      <Section title="1. Visual check" hint="Renders the key frames in memory (nothing is saved) and measures what is really on screen: text off the safe area, overlaps, overflow, small type, contrast, a blank thumbnail.">
        <button className="primary" disabled={qaBusy || blocked} onClick={runQa}>
          {qaBusy ? "Checking frames…" : "Run visual check"}
        </button>
        {blocked ? <Banner kind="error">Fix the errors in the checks panel first.</Banner> : null}
        {qaErr ? <Banner kind="error">{qaErr}</Banner> : null}
        {qa ? (
          <>
            <Banner kind={qa.errors ? "error" : qa.warnings ? "warning" : "ok"}>
              {qa.errors ? `${qa.errors} problem(s) to fix` : qa.warnings ? `Passed with ${qa.warnings} suggestion(s)` : "No visual problems found"} · {qa.frames} frames checked
            </Banner>
            <ul className="issues">
              {qa.issues.map((i, k) => (
                <li key={k} className={i.level}>
                  <button className="link" onClick={() => seek(i.time)}>
                    {i.time.toFixed(1)} s
                  </button>{" "}
                  {i.scene !== null ? `scene ${i.scene + 1} · ` : ""}
                  {i.label ? `${i.label}: ` : ""}
                  {i.problem}
                  {i.fix ? <div className="hint">→ {i.fix}</div> : null}
                </li>
              ))}
            </ul>
            {qa.issues.length ? (
              <button className="link" onClick={() => go("story")}>
                Go to the storyboard to fix them
              </button>
            ) : null}
          </>
        ) : null}
      </Section>

      <Section title="2. Render" hint="Writes motion-kit/out/<name>.mp4 and a cover image. Music and voice are levelled to −14 LUFS for social platforms.">
        <Chips options={["this format", ...catalog.formats.map((f) => f.name), "all formats"]} value={which} onChange={(v) => setWhich(v ?? "this format")} />
        <button className="primary" disabled={blocked || job?.status === "running"} onClick={render}>
          {job?.status === "running" ? "Rendering…" : "Render video"}
        </button>
        {err ? <Banner kind="error">{err}</Banner> : null}
        {job ? (
          <div className="job">
            <Banner kind={job.status === "failed" ? "error" : job.status === "done" ? "ok" : "note"}>
              {job.status === "running" ? "Rendering…" : job.status === "done" ? "Done." : "Render failed: see the log."}
            </Banner>
            {job.outputs.map((o) =>
              o.endsWith(".mp4") ? (
                <div key={o}>
                  <video src={`/${o}`} controls style={{ maxWidth: 360, borderRadius: 8 }} />
                  <a href={`/${o}`} download>
                    Download {o}
                  </a>
                </div>
              ) : (
                <a key={o} href={`/${o}`} download>
                  Download {o}
                </a>
              ),
            )}
            <pre className="log">{job.log.join("\n")}</pre>
          </div>
        ) : null}
      </Section>
    </div>
  );
};
