import { useEffect, useRef, useState } from "react";
import type { VideoSpec } from "../../../src/engine/schema.ts";
import type { Ctx } from "../App.tsx";
import { api, type FileInfo, type ImageAnalysis, type VideoAnalysis } from "../api.ts";
import { Banner, Section, Swatch } from "../ui.tsx";

const IMAGE = /\.(png|jpe?g|webp|gif|svg)$/i;
const VIDEO = /\.(mp4|mov|webm|m4v)$/i;

/** Step 2: logo and reference images/videos; turn them into colours, fonts and a style. */
export const References: React.FC<Ctx> = ({ spec, update }) => {
  const [refs, setRefs] = useState<FileInfo[]>([]);
  const [brandFiles, setBrandFiles] = useState<FileInfo[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [images, setImages] = useState<Record<string, ImageAnalysis>>({});
  const [videos, setVideos] = useState<Record<string, VideoAnalysis>>({});
  const refInput = useRef<HTMLInputElement>(null);
  const logoInput = useRef<HTMLInputElement>(null);

  const load = () => {
    api.files("refs").then(setRefs, () => setRefs([]));
    api.files("brand").then(setBrandFiles, () => setBrandFiles([]));
  };
  useEffect(load, []);

  const upload = async (kind: "refs" | "brand", list: FileList | null) => {
    if (!list?.length) return;
    setErr(null);
    for (const file of Array.from(list)) {
      setBusy(`Uploading ${file.name}…`);
      try {
        const { path } = await api.upload(kind, file);
        if (kind === "brand") {
          update((s) => ({ ...s, brand: { ...s.brand, logo: path } }));
          await analyseImage(path);
        }
      } catch (e) {
        setErr((e as Error).message);
      }
    }
    setBusy(null);
    load();
  };

  const analyseImage = async (path: string) => {
    setBusy(`Reading colours in ${path}…`);
    setErr(null);
    try {
      const r = await api.analyzeImage(path);
      setImages((m) => ({ ...m, [path]: r }));
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(null);
    }
  };
  const analyseVideo = async (path: string) => {
    setBusy(`Measuring ${path}: cuts, motion, colours and tempo (about 10-40 s)…`);
    setErr(null);
    try {
      const r = await api.analyzeVideo(path);
      setVideos((m) => ({ ...m, [path]: r }));
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  const logo = spec.brand?.logo;
  return (
    <div>
      <h2>References</h2>
      <p className="lede">
        Give the Studio something to aim at. A <b>logo</b> sets your brand colours. <b>Reference images</b> give a palette. A <b>reference video</b> is measured
        (how often it cuts, how fast things move, its colours and music tempo) and turned into a matching style.
      </p>
      {busy ? <Banner kind="note">{busy}</Banner> : null}
      {err ? <Banner kind="error">{err}</Banner> : null}

      <Section
        title="Logo"
        hint="PNG, JPG, WebP or SVG. Its colours become the brand accent; the Studio also tells you which themes it sits well on."
        right={
          <>
            <button onClick={() => logoInput.current?.click()}>Upload logo</button>
            <input ref={logoInput} hidden type="file" accept="image/*" onChange={(e) => upload("brand", e.target.files)} />
          </>
        }
      >
        {logo ? (
          <div className="ref-row">
            <img className="thumb" src={`/${logo}`} alt="logo" />
            <div>
              <div className="inline">
                <b>{logo}</b>
                <button className="link" onClick={() => analyseImage(logo)}>
                  read colours
                </button>
                <button className="link" onClick={() => update((s) => ({ ...s, brand: { ...s.brand, logo: undefined } }))}>
                  remove
                </button>
              </div>
              {images[logo] ? <ImageResult r={images[logo]} update={update} asBrand /> : null}
            </div>
          </div>
        ) : brandFiles.length ? (
          <div className="chips">
            {brandFiles.map((f) => (
              <button key={f.path} className="chip" onClick={() => update((s) => ({ ...s, brand: { ...s.brand, logo: f.path } }))}>
                use {f.name}
              </button>
            ))}
          </div>
        ) : (
          <p className="hint">No logo yet.</p>
        )}
      </Section>

      <Section
        title="Reference images and videos"
        hint="Mood boards, screenshots, an ad you like. Videos up to a minute work best."
        right={
          <>
            <button className="primary" onClick={() => refInput.current?.click()}>
              Upload references
            </button>
            <input ref={refInput} hidden multiple type="file" accept="image/*,video/mp4,video/webm,video/quicktime" onChange={(e) => upload("refs", e.target.files)} />
          </>
        }
      >
        {refs.length === 0 ? <p className="hint">Nothing uploaded yet.</p> : null}
        {refs.map((f) => (
          <div key={f.path} className="ref-row">
            {IMAGE.test(f.name) ? <img className="thumb" src={`/${f.path}`} alt={f.name} /> : VIDEO.test(f.name) ? <video className="thumb" src={`/${f.path}`} muted loop autoPlay playsInline /> : <span className="thumb" />}
            <div>
              <div className="inline">
                <b>{f.name}</b>
                {IMAGE.test(f.name) ? (
                  <button className="link" onClick={() => analyseImage(f.path)}>
                    get palette
                  </button>
                ) : null}
                {VIDEO.test(f.name) ? (
                  <button className="link" onClick={() => analyseVideo(f.path)}>
                    match this style
                  </button>
                ) : null}
              </div>
              {images[f.path] ? <ImageResult r={images[f.path]} update={update} /> : null}
              {videos[f.path] ? <VideoResult r={videos[f.path]} update={update} /> : null}
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
};

const ImageResult: React.FC<{ r: ImageAnalysis; update: Ctx["update"]; asBrand?: boolean }> = ({ r, update, asBrand }) => (
  <div className="result">
    <div className="inline">
      {r.palette.map((p) => (
        <Swatch key={p.hex} hex={p.hex} label={`${p.hex} · ${Math.round(p.share * 100)}%`} onClick={() => update((s) => ({ ...s, brand: { ...s.brand, accent: p.hex } }))} />
      ))}
      <span className="hint">click a colour to make it the accent</span>
    </div>
    {r.accent ? (
      <button className="primary small" onClick={() => update((s) => ({ ...s, brand: { ...s.brand, accent: r.accent, accent2: r.accent2 } }))}>
        Use as brand colours ({r.accent}
        {r.accent2 ? ` + ${r.accent2}` : ""})
      </button>
    ) : null}
    {r.baseWhy && asBrand ? <p className="hint">Logo background: {r.base ?? "either"} ({r.baseWhy}).</p> : null}
    {r.themes?.length ? (
      <div className="chips">
        <span className="hint">Themes that suit it:</span>
        {r.themes
          .filter((t) => !t.clash)
          .slice(0, 4)
          .map((t) => (
            <button key={t.name} className="chip" title={t.reasons.join("\n")} onClick={() => update((s) => ({ ...s, theme: t.name as VideoSpec["theme"] }))}>
              {t.name}
            </button>
          ))}
      </div>
    ) : null}
  </div>
);

const VideoResult: React.FC<{ r: VideoAnalysis; update: Ctx["update"] }> = ({ r, update }) => (
  <div className="result">
    <p>
      {r.duration.toFixed(1)} s · {r.cuts.length + 1} shots (one every {r.avgShot.toFixed(1)} s) · {r.energy} motion · {r.brightness}
      {r.bpm ? ` · music ~${Math.round(r.bpm)} BPM` : ""}
    </p>
    <div className="inline">
      {r.palette.map((p) => (
        <Swatch key={p.hex} hex={p.hex} label={`${p.hex} · ${Math.round(p.share * 100)}%`} onClick={() => update((s) => ({ ...s, brand: { ...s.brand, accent: p.hex } }))} />
      ))}
    </div>
    <ul className="why">
      {r.suggestion.why.map((w) => (
        <li key={w}>{w}</li>
      ))}
    </ul>
    <button
      className="primary small"
      onClick={() =>
        update((s) => ({
          ...s,
          theme: r.suggestion.theme as VideoSpec["theme"],
          motion: r.suggestion.motion as VideoSpec["motion"],
          pace: r.suggestion.pace as VideoSpec["pace"],
          transition: r.suggestion.transition as VideoSpec["transition"],
          // A new canvas from the reference drops the old text colour, so the theme's ink (or a readable one) is used.
          look: { ...s.look, ...(r.suggestion.look as VideoSpec["look"]), ...((r.suggestion.look as { bg?: string }).bg ? { text: undefined } : {}) },
        }))
      }
    >
      Apply this style ({r.suggestion.theme} · {r.suggestion.motion} · {r.suggestion.transition} · {r.suggestion.pace})
    </button>
  </div>
);
