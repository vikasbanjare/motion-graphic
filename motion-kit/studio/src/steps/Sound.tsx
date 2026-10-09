import { useEffect, useRef, useState } from "react";
import type { VideoSpec } from "../../../src/engine/schema.ts";
import type { Ctx } from "../App.tsx";
import { api, type FileInfo } from "../api.ts";
import { Banner, Card, Chips, Row, Section } from "../ui.tsx";

const PACKS: { name: NonNullable<NonNullable<VideoSpec["audio"]>["sfxPack"]>; use: string }[] = [
  { name: "classic", use: "Balanced whooshes and pops. Works everywhere." },
  { name: "soft", use: "Airy and gentle. Calm launch films, editorial, wellness." },
  { name: "punchy", use: "Tight and loud. Creator reels, offers, sports." },
  { name: "digital", use: "Blips and bit-crushed edges. AI, tech, gaming." },
];
const SAMPLES = ["whoosh", "pop", "impact", "riser", "ding", "click"];

/** A starting prompt for generated music, from the chosen style. */
const MOODS: Record<string, string> = {
  studio: "Minimal ambient electronic, soft piano pulse, airy pads, calm and premium, 80 BPM, no vocals",
  "studio-dark": "Dark ambient electronic, warm sub bass, slow evolving pads, cinematic and calm, 75 BPM, no vocals",
  midnight: "Punchy trap beat, deep 808 bass, crisp hi-hats, confident and bold, 130 BPM, no vocals",
  neon: "Upbeat synthwave, driving arpeggios, bright synth leads, futuristic tech energy, 124 BPM, no vocals",
  clean: "Light uplifting electronic, clean plucks, gentle claps, optimistic and modern, 105 BPM, no vocals",
  editorial: "Chic deep house, smooth bass, soft keys, elegant and stylish, 118 BPM, no vocals",
  pop: "Quirky upbeat pop, ukulele, claps and whistles, playful and bright, 120 BPM, no vocals",
  desi: "Festive Indian fusion, dhol and tabla, bright sitar riff, celebratory, 110 BPM, no vocals",
  corporate: "Inspiring corporate, light piano and strings, steady drums, confident and warm, 110 BPM, no vocals",
  mono: "Minimal techno, sparse percussion, clean click rhythms, precise and modern, 118 BPM, no vocals",
};

/** Step 6: sound effects, music (yours or generated) and voice-over. */
export const Sound: React.FC<Ctx> = ({ spec, update, replace, name, catalog, check }) => {
  const audio = spec.audio ?? {};
  const setAudio = (patch: Partial<NonNullable<VideoSpec["audio"]>>) =>
    update((s) => {
      const a = { ...(s.audio ?? {}), ...patch } as Record<string, unknown>;
      for (const k of Object.keys(a)) if (a[k] === undefined) delete a[k];
      return { ...s, audio: Object.keys(a).length ? (a as VideoSpec["audio"]) : undefined };
    });
  const [music, setMusic] = useState<FileInfo[]>([]);
  const [voice, setVoice] = useState<FileInfo[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [log, setLog] = useState<string | null>(null);
  const [prompt, setPrompt] = useState(MOODS[spec.theme ?? "midnight"] ?? MOODS.studio);
  const [quote, setQuote] = useState<string | null>(null);
  const musicInput = useRef<HTMLInputElement>(null);
  const voiceInput = useRef<HTMLInputElement>(null);
  const player = useRef<HTMLAudioElement>(null);

  const load = () => {
    api.files("music").then(setMusic, () => setMusic([]));
    api.files("voice").then(setVoice, () => setVoice([]));
  };
  useEffect(load, []);
  const seconds = Math.ceil((check?.duration ?? 30) + 4);

  const play = (src: string) => {
    if (!player.current) return;
    player.current.src = src;
    player.current.play().catch(() => {});
  };
  const task = async (label: string, fn: () => Promise<void>) => {
    setBusy(label);
    setErr(null);
    setLog(null);
    try {
      await fn();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(null);
    }
  };
  const needName = () => {
    if (!name) throw new Error("Name and save the video in the Brief step first: music fitting edits the saved file.");
    return name;
  };
  const fit = (track: string) =>
    task("Measuring tempo and beats, choosing the best start…", async () => {
      const n = needName();
      await api.save(n, spec);
      const r = await api.musicFit(n, track);
      replace(n, r.spec);
      setLog(r.log);
    });

  return (
    <div>
      <h2>Sound</h2>
      <p className="lede">Sound effects follow the motion automatically. Add music (your own licensed track, or generate one) and a voice-over if you have one.</p>
      <audio ref={player} hidden />
      {busy ? <Banner kind="note">{busy}</Banner> : null}
      {err ? <Banner kind="error">{err}</Banner> : null}
      {log ? <pre className="log">{log}</pre> : null}

      <Section title="Sound effects">
        <Row label="Effects">
          <Chips options={["on", "off"]} value={audio.sfx === false ? "off" : "on"} onChange={(v) => setAudio({ sfx: v === "off" ? false : undefined })} />
        </Row>
        <div className="grid cards">
          {PACKS.map((p) => (
            <Card key={p.name} selected={(audio.sfxPack ?? "classic") === p.name} onClick={() => setAudio({ sfxPack: p.name === "classic" ? undefined : p.name })}>
              <b>{p.name}</b>
              <span className="hint">{p.use}</span>
              <span className="chips" onClick={(e) => e.stopPropagation()}>
                {SAMPLES.map((x) => (
                  <button key={x} className="chip tiny" onClick={() => play(p.name === "classic" ? `/sfx/${x}.wav` : `/sfx/${p.name}/${x}.wav`)}>
                    ▶ {x}
                  </button>
                ))}
              </span>
            </Card>
          ))}
        </div>
        <Row label={`Effects level: ${Math.round((audio.sfxVolume ?? 1) * 100)}%`}>
          <input type="range" min={0} max={2} step={0.05} value={audio.sfxVolume ?? 1} onChange={(e) => setAudio({ sfxVolume: Number(e.target.value) === 1 ? undefined : Number(e.target.value) })} />
        </Row>
        <p className="hint">Per scene: turn effects off for a single beat in the Storyboard step.</p>
      </Section>

      <Section title="Music" hint="Cuts land on the beat, music fades in and out, loops if short, is levelled and ducks under the voice.">
        <div className="inline">
          <button onClick={() => musicInput.current?.click()}>Upload a track (MP3/WAV)</button>
          <input
            ref={musicInput}
            hidden
            type="file"
            accept="audio/mpeg,audio/wav,audio/x-wav"
            onChange={(e) =>
              task("Uploading…", async () => {
                const f = e.target.files?.[0];
                if (!f) return;
                const { path } = await api.upload("music", f);
                load();
                await fit(path);
              })
            }
          />
          {audio.music ? (
            <button className="link" onClick={() => setAudio({ music: undefined, musicStart: undefined, beats: undefined, beatGrid: undefined, downbeatGrid: undefined, musicDuration: undefined, musicLufs: undefined, musicVolume: undefined })}>
              remove music
            </button>
          ) : null}
        </div>
        {music.length ? (
          <ul className="files">
            {music.map((m) => (
              <li key={m.path} className={audio.music === m.path ? "on" : ""}>
                <button className="link" onClick={() => play(`/${m.path}`)}>
                  ▶
                </button>
                <span>{m.name}</span>
                {audio.music === m.path ? <b> · in use</b> : <button onClick={() => fit(m.path)}>Use + fit to video</button>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="hint">No tracks yet. Free licensed sources: YouTube Audio Library, Pixabay Music, Mixkit.</p>
        )}
        {audio.music ? (
          <Row label={`Music level: ${Math.round((audio.musicVolume ?? 0.2) * 100)}%`}>
            <input type="range" min={0} max={0.6} step={0.01} value={audio.musicVolume ?? 0.2} onChange={(e) => setAudio({ musicVolume: Number(e.target.value) })} />
          </Row>
        ) : null}

        <h4>Generate music (ElevenLabs Music)</h4>
        {!catalog.elevenlabs ? (
          <Banner kind="note">
            To generate music, start the Studio with your key: <code>ELEVENLABS_API_KEY=… npm run studio</code>. Generation uses your ElevenLabs credits; the Studio asks before
            spending.
          </Banner>
        ) : null}
        <Row label="Describe the track" hint="Style, instruments, mood, tempo. Starts from your theme; edit freely.">
          <textarea rows={3} value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </Row>
        <div className="inline">
          <button className="link" onClick={() => setPrompt(MOODS[spec.theme ?? "midnight"] ?? prompt)}>
            reset to the theme's mood
          </button>
          <button
            disabled={!catalog.elevenlabs || Boolean(busy)}
            onClick={() =>
              task("Getting the cost…", async () => {
                const q = await api.musicQuote(seconds);
                setQuote(q.note);
              })
            }
          >
            Generate {seconds} s instrumental…
          </button>
        </div>
        {quote ? (
          <Banner kind="warning">
            {quote}
            <div className="inline">
              <button
                className="primary"
                onClick={() =>
                  task("Generating music (about 20-60 s)…", async () => {
                    setQuote(null);
                    const { path } = await api.musicGenerate(prompt, seconds, true);
                    load();
                    await fit(path);
                  })
                }
              >
                Yes, generate
              </button>
              <button onClick={() => setQuote(null)}>Cancel</button>
            </div>
          </Banner>
        ) : null}
      </Section>

      <Section title="Voice-over" hint="Each scene's 'say' line is the script. Record or generate it, upload the full MP3, and the video re-times to the real voice.">
        <div className="inline">
          <button onClick={() => voiceInput.current?.click()}>Upload voice-over</button>
          <input
            ref={voiceInput}
            hidden
            type="file"
            accept="audio/*"
            onChange={(e) =>
              task("Uploading and timing every word…", async () => {
                const f = e.target.files?.[0];
                if (!f) return;
                const n = needName();
                await api.save(n, spec);
                const { path } = await api.upload("voice", f);
                load();
                const r = await api.voiceAlign(n, path);
                replace(n, r.spec);
                setLog(r.log);
              })
            }
          />
          {audio.voiceover ? (
            <>
              <span>
                In use: <b>{audio.voiceover}</b>
              </span>
              <button className="link" onClick={() => setAudio({ voiceover: undefined, timing: undefined, words: undefined })}>
                remove
              </button>
            </>
          ) : null}
        </div>
        {voice.length && !audio.voiceover ? (
          <ul className="files">
            {voice
              .filter((v) => /\.(mp3|wav|m4a)$/i.test(v.name))
              .map((v) => (
                <li key={v.path}>
                  <span>{v.name}</span>
                  <button
                    onClick={() =>
                      task("Timing every word…", async () => {
                        const n = needName();
                        await api.save(n, spec);
                        const r = await api.voiceAlign(n, v.path);
                        replace(n, r.spec);
                        setLog(r.log);
                      })
                    }
                  >
                    Use + time it
                  </button>
                </li>
              ))}
          </ul>
        ) : null}
        <p className="hint">
          Timing uses ElevenLabs forced alignment when ELEVENLABS_API_KEY is set, otherwise a local Whisper model (downloaded once). No recording yet? Ask Claude: "generate the
          voice-over for this video" (runs <code>npm run voice -- specs/{name ?? "<name>"}.json --tts</code>, asks before spending).
        </p>
      </Section>
    </div>
  );
};
