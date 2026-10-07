// Voice-over tools. One narration file + word timings = scenes cut on the spoken beat.
//
//   npm run voice -- specs/x.json                       print the narration script + cost estimate
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

const args = parseArgs(process.argv.slice(2));
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
console.log(c.dim(`  • or generate + time it in one go:               npm run voice -- ${args._[0]} --tts --voice <voice_id>`));
