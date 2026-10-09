// Voice-over tools. One narration file + word timings = scenes cut on the spoken beat.
//
//   npm run voice -- specs/x.json                       print the narration script + cost estimate
//   npm run voice -- specs/x.json --engine kokoro       free + offline (pip install kokoro-onnx soundfile); --free is short for this
//   npm run voice -- specs/x.json --engine edge         free + online, Indian/Hindi voices, real word timings (pip install edge-tts)
//   npm run voice -- specs/x.json --engine gemini       Google Gemini TTS free tier (GEMINI_API_KEY), takes --style "…"
//      common: --voice <id> (npm run voice -- --voices lists them)  --speed 1.1  --gap 350 (ms between beats)
//   npm run voice -- specs/x.json --tts --voice <id>    generate with ElevenLabs (needs ELEVENLABS_API_KEY)
//   npm run voice -- specs/x.json --align voice/x.mp3   time an existing recording (yours or downloaded)
//   npm run voice -- specs/x.json --import subs.srt     use timings from an .srt or captions .json
//
// Results land in public/voice/<name>.mp3 + public/voice/<name>.timing.json, and the
// spec's audio.voiceover / audio.timing are updated so the next render is synced.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import readline from "node:readline/promises";
import { spawnSync } from "node:child_process";
import { ROOT, c, engine, parseArgs, readSpec } from "./lib.mjs";
import { VOICE_ENGINES, defaultVoice } from "./voices.mjs";

const args = parseArgs(process.argv.slice(2));
// --free is short for the offline engine; --engine elevenlabs is the same as --tts.
if (args.free && !args.engine) args.engine = "kokoro";
if (args.engine === "elevenlabs") {
  args.tts = true;
  delete args.engine;
}
if (args.voices) {
  for (const [id, e] of Object.entries(VOICE_ENGINES)) {
    console.log(c.bold(`\n--engine ${id}`) + `  ${e.label}`);
    console.log(c.dim(`  ${e.cost}\n  setup: ${e.setup}\n  ${e.licence}\n  ${e.timing}`));
    for (const v of e.voices) console.log(`    --voice ${v.id.padEnd(32)} ${v.label}`);
  }
  process.exit(0);
}
const { spec, abs: specPath, name } = readSpec(args._[0]);
const E = await engine();

const says = spec.scenes.map((s) => s.say).filter(Boolean);
if (!says.length) {
  console.error(c.red('No scene has a "say" line. Add the narration for each beat first, e.g.'));
  console.error(c.dim('  { "type": "title", "say": "Turn your words into a video.", "headline": "Words → *video*" }'));
  process.exit(1);
}
// One paragraph per beat: TTS engines pause naturally between paragraphs.
const script = says.join("\n\n");
const chars = script.length;
const estSeconds = E.estimateWords(spec.scenes.map((s) => s.say)).at(-1).endMs / 1000;
const voiceDir = path.join(ROOT, "public", "voice");
fs.mkdirSync(voiceDir, { recursive: true });
const timingRel = `voice/${name}.timing.json`;

const saveTiming = (words, audioRel, source) => {
  if (!words.length) {
    console.error(c.red("No words came back from alignment — check the audio file is the full narration."));
    process.exit(1);
  }
  fs.writeFileSync(path.join(ROOT, "public", timingRel), JSON.stringify({ source, words }, null, 1));
  const updated = { ...spec, audio: { ...(spec.audio ?? {}), timing: timingRel, ...(audioRel ? { voiceover: audioRel } : {}) } };
  delete updated.audio.words;
  fs.writeFileSync(specPath, JSON.stringify(updated, null, 2) + "\n");
  const dur = words.at(-1).endMs / 1000;
  console.log(c.green(`✔ ${words.length} timed words (${dur.toFixed(1)}s) → public/${timingRel}`));
  console.log(c.green(`✔ Updated ${path.relative(process.cwd(), specPath)}: audio.timing${audioRel ? " + audio.voiceover" : ""}`));
  console.log(c.dim("  Next: npm run preview -- " + path.relative(process.cwd(), specPath) + "   then   npm run make -- …"));
};

const audioDuration = (file) => {
  const r = spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file], { encoding: "utf8" });
  return r.status === 0 ? parseFloat(r.stdout) : NaN;
};

const confirm = async (question) => {
  if (args.yes) return true;
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const a = (await rl.question(question + " [y/N] ")).trim().toLowerCase();
  rl.close();
  return a === "y" || a === "yes";
};

const apiKey = process.env.ELEVENLABS_API_KEY;
const elevenFetch = async (url, init) => {
  const res = await fetch(url, { ...init, headers: { "xi-api-key": apiKey, ...(init.headers ?? {}) } });
  if (!res.ok) {
    const body = await res.text();
    console.error(c.red(`ElevenLabs ${res.status}: ${body.slice(0, 400)}`));
    process.exit(1);
  }
  return res;
};

// ---------------------------------------------------------------------------
if (args.tts) {
  if (!apiKey) {
    console.error(c.red("Set ELEVENLABS_API_KEY first (ElevenLabs → Profile → API keys). Never paste it into a spec or chat."));
    process.exit(1);
  }
  const voice = args.voice;
  if (!voice || voice === true) {
    console.error(c.red("Pass --voice <voice_id> (ElevenLabs → Voices → ⋯ → Copy voice ID)."));
    process.exit(1);
  }
  const model = args.model ?? "eleven_multilingual_v2";
  console.log(c.bold(`ElevenLabs TTS · model ${model} · ${chars} characters (~${estSeconds.toFixed(0)}s)`));
  console.log(c.dim("multilingual v2 / v3 bill ~1 credit per character, flash / turbo ~0.5. Check your plan's current rate before generating."));
  if (/multilingual_v2|flash|turbo/.test(model) && /\[[a-z ]+\]/i.test(script))
    console.log(c.yellow("  ⚠ Your script has [audio tags]; only v3/v4 models perform them. This model would read them aloud."));
  if (args.budget && chars > Number(args.budget)) {
    console.error(c.red(`Script is ${chars} characters, over your --budget of ${args.budget}. Shorten the say lines.`));
    process.exit(1);
  }
  if (!(await confirm(`Generate ${chars} characters now?`))) process.exit(0);

  // Narration defaults: steadier than the API default; style 0 avoids instability.
  const body = {
    text: script,
    model_id: model,
    voice_settings: {
      stability: Number(args.stability ?? 0.7),
      similarity_boost: Number(args.similarity ?? 0.5),
      style: Number(args.style ?? 0),
      use_speaker_boost: true,
      ...(args.speed ? { speed: Number(args.speed) } : {}),
    },
    // multilingual_v2 ignores language_code (it detects the language itself).
    ...(args.language && !/multilingual_v2/.test(model) ? { language_code: args.language } : {}),
  };
  const res = await elevenFetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voice}/with-timestamps?output_format=mp3_44100_128`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) },
  );
  const data = await res.json();
  const audioRel = `voice/${name}.mp3`;
  fs.writeFileSync(path.join(ROOT, "public", audioRel), Buffer.from(data.audio_base64, "base64"));
  // Use `alignment` (original text) so timings map back to the say/show words; drop [audio tags].
  const alignment = data.alignment ?? data.normalized_alignment;
  const words = E.wordsFromCharacters(alignment).filter((w) => !/^\[[^\]]*\]$/.test(w.text));
  saveTiming(words, audioRel, `elevenlabs-tts:${model}`);
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Free voices, one beat at a time: kokoro (offline), edge (online) or gemini (free-tier key).
// Each beat is its own clip, so scene cuts land exactly; words come from the engine
// when it reports them (edge), else they are spread by length inside the beat.
if (args.engine) {
  const engine = String(args.engine);
  if (!VOICE_ENGINES[engine] || engine === "elevenlabs") {
    console.error(c.red(`Unknown --engine ${engine}. Use one of: ${Object.keys(VOICE_ENGINES).join(", ")}.`));
    process.exit(1);
  }
  const info = VOICE_ENGINES[engine];
  const hindi = says.some((s) => /[ऀ-ॿ]/.test(s));
  const voice = typeof args.voice === "string" ? args.voice : defaultVoice(engine, hindi);
  const speed = Number(args.speed ?? 1);
  const tmp = path.join(ROOT, "out", ".tmp", `${name}-beats`);
  fs.rmSync(tmp, { recursive: true, force: true });
  fs.mkdirSync(tmp, { recursive: true });
  console.log(c.bold(`${info.label} · ${voice} · ${says.length} beats (~${estSeconds.toFixed(0)}s)`));
  console.log(c.dim(`  ${info.cost}\n  ${info.licence}`));

  let beats;
  if (engine === "gemini") {
    const key = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
    if (!key) {
      console.error(c.red(`Set GEMINI_API_KEY first. ${info.setup}. Never paste it into a spec or chat.`));
      process.exit(1);
    }
    const model = typeof args.model === "string" ? args.model : "gemini-2.5-flash-preview-tts";
    // A style line steers delivery; the model speaks only the text after the colon.
    const style = typeof args.style === "string" ? args.style : "Read this like a confident, warm product video narrator";
    beats = [];
    for (const [k, say] of says.entries()) {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${style}: ${say}` }] }],
          generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } } },
        }),
      });
      if (!res.ok) {
        console.error(c.red(`Gemini ${res.status}: ${(await res.text()).slice(0, 400)}`));
        process.exit(1);
      }
      const data = await res.json();
      const b64 = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)?.inlineData?.data;
      if (!b64) {
        console.error(c.red(`Gemini returned no audio for beat ${k + 1}: ${JSON.stringify(data).slice(0, 300)}`));
        process.exit(1);
      }
      // Raw 16-bit PCM, 24 kHz mono.
      const file = path.join(tmp, `${String(k).padStart(3, "0")}.pcm`);
      fs.writeFileSync(file, Buffer.from(b64, "base64"));
      beats.push({ file, words: null, raw: true });
      console.log(c.dim(`  beat ${k + 1}/${says.length}`));
    }
  } else {
    const python = typeof args.python === "string" ? args.python : process.platform === "win32" ? "python" : "python3";
    const mod = engine === "kokoro" ? "kokoro_onnx, soundfile" : "edge_tts";
    if (spawnSync(python, ["-c", `import ${mod}`]).status !== 0) {
      console.error(c.red(`${info.label} needs Python with: ${info.setup.replace("pip", `${python} -m pip`)}`));
      process.exit(1);
    }
    const job = { engine, beats: says, voice, speed, dir: tmp };
    if (engine === "kokoro") {
      // Kokoro language by voice prefix: a=US, b=UK, h=Hindi, e=Spanish, f=French, i=Italian, p=Portuguese.
      job.lang = args.language ?? { a: "en-us", b: "en-gb", h: "hi", e: "es", f: "fr-fr", i: "it", p: "pt-br", j: "ja", z: "cmn" }[voice[0]] ?? "en-us";
      const dir = path.join(os.homedir(), ".cache", "motion-kit", "kokoro");
      fs.mkdirSync(dir, { recursive: true });
      const release = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0";
      for (const [file, mb] of [["kokoro-v1.0.int8.onnx", 88], ["voices-v1.0.bin", 27]]) {
        const dest = path.join(dir, file);
        if (fs.existsSync(dest) && fs.statSync(dest).size > mb * 0.9e6) continue;
        console.log(c.dim(`Downloading ${file} (~${mb} MB, once)…`));
        if (spawnSync("curl", ["-fsSL", "-o", dest + ".part", `${release}/${file}`], { stdio: "inherit" }).status !== 0) {
          console.error(c.red(`Could not download ${release}/${file}. Download it by hand into ${dir}.`));
          process.exit(1);
        }
        fs.renameSync(dest + ".part", dest);
      }
      Object.assign(job, { model: path.join(dir, "kokoro-v1.0.int8.onnx"), voices: path.join(dir, "voices-v1.0.bin") });
      console.log(c.dim("  Offline synthesis takes about 1.5× the audio length on a laptop CPU."));
    }
    const r = spawnSync(python, ["-I", path.join(ROOT, "tools", "tts_beats.py")], { input: JSON.stringify(job), encoding: "utf8", stdio: ["pipe", "pipe", "inherit"], maxBuffer: 1 << 26 });
    if (r.status !== 0) {
      console.error(c.red(`${info.label} failed (see above).`));
      process.exit(1);
    }
    beats = JSON.parse(r.stdout.trim().split("\n").at(-1)).beats;
  }

  // Join the beats as 24 kHz mono PCM with a short breath between them, then encode once.
  const RATE = 24000;
  const gap = Buffer.alloc(Math.round((RATE * Number(args.gap ?? 350)) / 1000) * 2);
  const parts = [];
  const words = [];
  let bytes = 0;
  for (const [k, b] of beats.entries()) {
    const pcm = b.raw
      ? fs.readFileSync(b.file)
      : spawnSync("ffmpeg", ["-v", "error", "-i", b.file, "-f", "s16le", "-ac", "1", "-ar", String(RATE), "-"], { maxBuffer: 1 << 28 }).stdout;
    if (!pcm?.length) {
      console.error(c.red(`Beat ${k + 1} came back empty. Is ffmpeg installed?`));
      process.exit(1);
    }
    if (k) {
      parts.push(gap);
      bytes += gap.length;
    }
    const startMs = (bytes / 2 / RATE) * 1000;
    const endMs = startMs + (pcm.length / 2 / RATE) * 1000;
    if (b.words?.length) {
      for (const w of b.words) words.push({ text: w.text, startMs: startMs + w.startMs, endMs: startMs + w.endMs });
    } else {
      const ws = says[k].split(/\s+/).filter(Boolean);
      const total = ws.reduce((n, w) => n + w.length + 1, 0);
      let at = startMs;
      for (const w of ws) {
        const len = ((endMs - startMs) * (w.length + 1)) / total;
        words.push({ text: w, startMs: at, endMs: at + len });
        at += len;
      }
    }
    parts.push(pcm);
    bytes += pcm.length;
  }
  const audioRel = `voice/${name}.mp3`;
  const enc = spawnSync("ffmpeg", ["-y", "-v", "error", "-f", "s16le", "-ac", "1", "-ar", String(RATE), "-i", "-", "-ar", "44100", "-b:a", "160k", path.join(ROOT, "public", audioRel)], {
    input: Buffer.concat(parts),
    stdio: ["pipe", "inherit", "inherit"],
  });
  if (enc.status !== 0) {
    console.error(c.red("ffmpeg is needed to encode the MP3 (https://ffmpeg.org/download.html)."));
    process.exit(1);
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  saveTiming(words, audioRel, `${engine}:${voice}`);
  process.exit(0);
}

// ---------------------------------------------------------------------------
if (args.align) {
  const rel = String(args.align).replace(/^public\//, "");
  const file = path.join(ROOT, "public", rel);
  if (!fs.existsSync(file)) {
    console.error(c.red(`Audio not found: public/${rel}. Put the narration file in motion-kit/public/voice/.`));
    process.exit(1);
  }
  const dur = audioDuration(file);
  if (Number.isFinite(dur)) {
    console.log(c.dim(`Audio is ${dur.toFixed(1)}s; the script reads at ~${estSeconds.toFixed(1)}s.`));
    if (dur < estSeconds * 0.5) {
      console.error(c.red("The audio is far shorter than the script — it's probably a partial download. Get the full take."));
      process.exit(1);
    }
  }

  if (apiKey && !args.whisper) {
    // Forced alignment: we already know the words, so ask for their timings directly.
    console.log(c.bold("Aligning with ElevenLabs forced alignment…"));
    const form = new FormData();
    form.append("file", new Blob([fs.readFileSync(file)]), path.basename(file));
    form.append("text", script);
    const res = await elevenFetch("https://api.elevenlabs.io/v1/forced-alignment", { method: "POST", body: form });
    const data = await res.json();
    const words = (data.words ?? []).map((w) => ({ text: w.text, startMs: w.start * 1000, endMs: w.end * 1000 }));
    saveTiming(words, rel, "elevenlabs-forced-alignment");
    process.exit(0);
  }

  // Offline: whisper.cpp (downloads once to ~/.cache/motion-kit/whisper).
  const lang = args.language ?? (says.some((s) => /[ऀ-ॿ]/.test(s)) ? "hi" : "en");
  // Latin-script scripts (English and Hinglish) transcribe as "en" so Whisper writes
  // Latin letters that can match the script; Devanagari scripts use "hi".
  const model = args.model ?? "large-v3-turbo";
  const { installWhisperCpp, downloadWhisperModel, transcribe, toCaptions } = await import("@remotion/install-whisper-cpp");
  const whisperPath = path.join(os.homedir(), ".cache", "motion-kit", "whisper");
  const version = "1.7.6";
  console.log(c.bold(`Transcribing locally with whisper.cpp (${model}, ${lang}). First run downloads ~0.5-1.6 GB.`));
  await installWhisperCpp({ to: whisperPath, version, printOutput: false });
  await downloadWhisperModel({ model, folder: whisperPath, printOutput: true });
  const wav = path.join(ROOT, "out", ".tmp", `${name}.16k.wav`);
  fs.mkdirSync(path.dirname(wav), { recursive: true });
  const conv = spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-i", file, "-ar", "16000", "-ac", "1", wav], { stdio: "inherit" });
  if (conv.status !== 0) {
    console.error(c.red("ffmpeg is needed to prepare audio for transcription (https://ffmpeg.org/download.html)."));
    process.exit(1);
  }
  const out = await transcribe({
    inputPath: wav,
    whisperPath,
    whisperCppVersion: version,
    model,
    tokenLevelTimestamps: true,
    language: lang,
    splitOnWord: true,
    onProgress: (p) => process.stdout.write(`\r  ${Math.round(p * 100)}%`),
  });
  process.stdout.write("\n");
  const { captions } = toCaptions({ whisperCppOutput: out });
  // timestampMs is the DTW onset (more precise than the segment offsets).
  const words = captions
    .map((cap) => ({ text: cap.text.trim(), startMs: cap.timestampMs ?? cap.startMs, endMs: cap.endMs }))
    .filter((w) => w.text);
  saveTiming(words, rel, `whisper.cpp:${model}`);
  process.exit(0);
}

// ---------------------------------------------------------------------------
if (args.import) {
  const file = path.resolve(process.cwd(), String(args.import));
  const text = fs.readFileSync(file, "utf8");
  let words = [];
  if (/\.srt$/i.test(file)) {
    // SRT has phrase timings only: spread each cue's words across its span.
    const toMs = (t) => {
      const [h, m, rest] = t.split(":");
      const [s, ms] = rest.split(/[,.]/);
      return ((Number(h) * 60 + Number(m)) * 60 + Number(s)) * 1000 + Number(ms);
    };
    for (const block of text.split(/\r?\n\r?\n/)) {
      const m = block.match(/(\d+:\d+:\d+[,.]\d+)\s*-->\s*(\d+:\d+:\d+[,.]\d+)\s*\r?\n([\s\S]*)/);
      if (!m) continue;
      const a = toMs(m[1]);
      const b = toMs(m[2]);
      const ws = m[3].replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean);
      ws.forEach((w, k) => words.push({ text: w, startMs: a + ((b - a) * k) / ws.length, endMs: a + ((b - a) * (k + 1)) / ws.length }));
    }
  } else {
    const data = JSON.parse(text);
    const list = Array.isArray(data) ? data : data.words ?? data.captions ?? [];
    words = list
      .filter((w) => !w.type || w.type === "word")
      .map((w) => ({
        text: String(w.text ?? w.word ?? "").trim(),
        startMs: w.startMs ?? (w.start ?? w.start_time ?? 0) * 1000,
        endMs: w.endMs ?? (w.end ?? w.end_time ?? 0) * 1000,
      }))
      .filter((w) => w.text);
  }
  saveTiming(words, args.audio ? String(args.audio).replace(/^public\//, "") : null, `import:${path.basename(file)}`);
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Default: print the paste-ready narration.
const out = path.join(ROOT, "out", `${name}.voice.txt`);
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, script + "\n");
console.log(c.bold("\nNarration (paste into ElevenLabs Text to Speech, or read it aloud):\n"));
console.log(script);
console.log(c.dim(`\n${chars} characters · ~${estSeconds.toFixed(1)}s at a natural pace · saved to ${path.relative(process.cwd(), out)}`));
console.log(c.dim("Then either:"));
console.log(c.dim(`  • save the MP3 as public/voice/${name}.mp3 and run:  npm run voice -- ${args._[0]} --align voice/${name}.mp3`));
console.log(c.dim(`  • or generate free:  --engine kokoro (offline) · --engine edge (online, Indian voices) · --engine gemini (free-tier key)`));
console.log(c.dim(`  • or generate with ElevenLabs:                   npm run voice -- ${args._[0]} --tts --voice <voice_id>`));
