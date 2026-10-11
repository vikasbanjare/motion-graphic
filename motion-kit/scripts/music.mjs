// Fit a music track YOU supply to a video. The kit never generates music: use
// tracks you hold a licence for (YouTube Audio Library, Pixabay Music, Mixkit,
// Artlist / Epidemic Sound if bought).
//
//   npm run music -- specs/x.json --track music/song.mp3              analyse + pick the best start
//   npm run music -- specs/x.json --track music/song.mp3 --start 12.5 start at 12.5 s instead
//   npm run music -- specs/x.json --track ~/Downloads/song.mp3        copies it into public/music/
//   ... --volume 0.2                                                  set the music level (0-1)
//
// Measures tempo, beats, downbeats and loudness, picks where the track starts
// (the bar that opens its most energetic stretch long enough for the video),
// writes public/music/<track>.beats.json and links it in the spec
// (audio.music, audio.musicStart, audio.beats). Cuts then land on the beat and
// the music ducks under narration.
import fs from "node:fs";
import path from "node:path";
import { SR, analysePcm, decode, loudness, pickStart, renderDuration } from "./beats.mjs";
import { ROOT, c, engine, parseArgs, readSpec, withTimingFile } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const { spec, abs: specPath } = readSpec(args._[0]);
const fail = (msg, hint) => {
  console.error(c.red(msg));
  if (hint) console.error(c.dim(hint));
  process.exit(1);
};
if (!args.track || args.track === true)
  fail("Pass the track: npm run music -- specs/x.json --track music/song.mp3", "Put a licensed MP3/WAV in motion-kit/public/music/ (or give any path; it is copied there).");

const track = String(args.track);
if (/^https?:/.test(track)) fail("Download the track first and put it in public/music/ — analysis needs the file on disk.");
if (!/\.(mp3|wav|m4a|aac|ogg|oga|opus|flac|aiff?)$/i.test(track)) fail(`${track} does not look like an audio file (mp3, wav, m4a, aac, ogg, opus, flac).`);

// A path inside public/ ("music/song.mp3"), or any file on disk copied into public/music/.
let rel = track.replace(/^\/*public\//, "");
let file = path.join(ROOT, "public", rel);
if (!fs.existsSync(file)) {
  const outside = path.resolve(process.cwd(), track.replace(/^~(?=\/)/, process.env.HOME ?? "~"));
  if (!fs.existsSync(outside)) fail(`Track not found: ${track}`, "Use a path inside motion-kit/public/ (e.g. music/song.mp3) or a full path to the file.");
  rel = `music/${path.basename(outside)}`;
  file = path.join(ROOT, "public", rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (path.resolve(outside) !== path.resolve(file)) fs.copyFileSync(outside, file);
  console.log(c.dim(`Copied ${track} → public/${rel}`));
}

let volume;
if (args.volume !== undefined) {
  volume = Number(args.volume);
  if (!(volume >= 0 && volume <= 1)) fail("--volume is a level between 0 and 1 (0.2 is a typical music bed).");
}

// --- analyse -----------------------------------------------------------------
console.log(c.bold(`Analysing public/${rel} …`));
let pcm;
try {
  pcm = decode(file);
} catch (e) {
  fail(e.message);
}
if (pcm.length < SR * 2) fail("The track is shorter than 2 seconds — is it the full file?");
const a = analysePcm(pcm);
const lufs = loudness(file);
// The renderer loops the track after its own reading of the length; use that
// so the beat grid stays on the music across loops.
const played = await renderDuration(file);
const durationMs = played === null ? a.durationMs : Math.round(played);
// Free-time music (ambient, drones, rubato) has no grid worth cutting on.
const rhythmic = a.rhythmic;

// --- how much music the video needs ---------------------------------------------
const E = await engine();
const withMusic = (startMs, beats) => {
  const audio = { ...(spec.audio ?? {}), music: rel, musicStart: Math.round(startMs) / 1000 };
  for (const k of ["beats", "beatGrid", "downbeatGrid", "musicDuration", "musicLufs"]) delete audio[k];
  if (beats) Object.assign(audio, { beatGrid: beats.beats, downbeatGrid: beats.downbeats, musicDuration: durationMs / 1000, ...(lufs !== null ? { musicLufs: lufs } : {}) });
  if (volume !== undefined) audio.musicVolume = volume;
  return { ...spec, audio };
};
const planOf = (s) => {
  const parsed = E.videoSchema.safeParse(withTimingFile(s));
  if (!parsed.success) {
    const i = parsed.error.issues[0];
    fail(`The spec has problems (${i.path.join(".") || "top level"}: ${i.message}).`, `Fix them first: npm run check -- ${args._[0]}`);
  }
  return E.planVideo(parsed.data);
};
const msOf = (plan) => (plan.durationInFrames / 30) * 1000;
// Fade-out tail and beat-snapping can stretch the cut a little: keep a margin.
const MARGIN = 1500;

/**
 * Slide the start up to one beat earlier (a pickup into the section's first
 * downbeat, hidden by the fade-in) so the beat grid lines up with as many
 * cuts as possible. Prefers downbeat hits, then the downbeat arriving just as
 * the fade-in completes. Starts stay on whole video frames.
 */
const fitPhase = (sectionMs) => {
  const beatFrames = (60 * 30) / a.bpm;
  const first = Math.round((sectionMs / 1000) * 30);
  let best = null;
  for (let f = 0; f < beatFrames; f++) {
    let frame = first - f;
    if (frame < 0) frame += Math.round(beatFrames);
    const plan = planOf(withMusic((frame / 30) * 1000, a));
    const hits = plan.scenes.filter((x) => x.onBeat !== undefined);
    const downs = new Set(plan.music.downbeats.map(Math.round));
    const score = hits.length * 100 + hits.filter((x) => downs.has(x.onBeat)).length * 20 - Math.abs(f - E.FADE_IN);
    if (!best || score > best.score) best = { ms: (frame / 30) * 1000, score };
  }
  return best.ms;
};

let needMs = msOf(planOf(withMusic(0, null))) + MARGIN;
let startMs = 0;
let sectionMs = 0;
const chosen = args.start !== undefined && args.start !== true;
if (chosen) {
  startMs = Number(args.start) * 1000;
  if (!(startMs >= 0 && startMs < durationMs - 1000)) fail(`--start ${args.start} is outside the track (${(durationMs / 1000).toFixed(1)}s long).`);
} else {
  // Snapped cuts change the length slightly; settle start and length together.
  for (let k = 0; k < 2; k++) {
    const grid = rhythmic ? { downbeatsMs: a.downbeats, beatsMs: a.beats } : { downbeatsMs: [], beatsMs: [] };
    sectionMs = pickStart({ rms: a.rms, ...grid, durationMs, needMs }).startMs;
    if (!rhythmic) break;
    const len = msOf(planOf(withMusic(sectionMs, a))) + MARGIN;
    if (len <= needMs) break;
    needMs = len;
  }
  startMs = rhythmic ? fitPhase(sectionMs) : sectionMs;
}

// --- write -----------------------------------------------------------------------
const base = path.basename(rel).replace(/\.[^.]+$/, "");
const beatsRel = `music/${base}.beats.json`;
const data = {
  track: rel,
  bpm: rhythmic ? a.bpm : null,
  beats: rhythmic ? a.beats : [],
  downbeats: rhythmic ? a.downbeats : [],
  startMs: Math.round(startMs),
  durationMs,
  lufs,
};
// One key per line, arrays inline: small diffs, still readable.
const json = "{\n" + Object.entries(data).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(",\n") + "\n}\n";
fs.mkdirSync(path.join(ROOT, "public", "music"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "public", beatsRel), json);

const updated = withMusic(startMs, null);
updated.audio.beats = beatsRel;
fs.writeFileSync(specPath, JSON.stringify(updated, null, 2) + "\n");

// --- report ------------------------------------------------------------------------
const plan = planOf(updated);
const videoMs = msOf(plan);
const leftMs = durationMs - startMs;
const clock = (ms) => `${Math.floor(ms / 60000)}:${((ms % 60000) / 1000).toFixed(1).padStart(4, "0")}`;
const cuts = plan.scenes.length - 1;
const snapped = plan.scenes.filter((s) => s.onBeat !== undefined).length;

console.log("");
if (rhythmic) {
  console.log(c.green("✔ ") + `${a.bpm.toFixed(1)} BPM · ${a.beats.length} beats · ${a.downbeats.length} bars` + (a.steady ? "" : c.dim(" (tempo drifts — beats follow the performance)")));
} else {
  console.log(c.yellow("⚠ ") + "No steady beat found (ambient / free-time track?). Music plays, but cuts are timed without it.");
}
// Starts sit on whole video frames, so a bar up to one frame before the start still opens the video.
const bar = rhythmic ? a.downbeats.findIndex((d) => d >= startMs - 40) : -1;
const pickup = bar >= 0 ? a.downbeats[bar] - startMs : 0;
console.log(
  c.green("✔ ") +
    `Starts at ${clock(startMs)}` +
    (bar >= 0 ? (pickup > 30 ? ` (${(pickup / 1000).toFixed(2)}s pickup into bar ${bar + 1})` : ` (bar ${bar + 1})`) : "") +
    c.dim(chosen ? " — from --start" : leftMs >= needMs ? " — the most energetic stretch that covers the video" : ""),
);
if (leftMs >= videoMs) console.log(c.green("✔ ") + `Long enough: ${(leftMs / 1000).toFixed(1)}s of music from there for a ${(videoMs / 1000).toFixed(1)}s video.`);
else
  console.log(
    c.yellow("⚠ ") +
      `Too short: ${(leftMs / 1000).toFixed(1)}s of music for a ${(videoMs / 1000).toFixed(1)}s video — it will loop from ${clock(startMs)}. A longer track (or a full-length version) sounds better.`,
  );
if (rhythmic && cuts > 0) console.log(c.green("✔ ") + `${snapped}/${cuts} cuts land on the beat` + c.dim(plan.voice ? " (narrated cuts move at most 4 frames to stay in sync)" : ""));
if (lufs !== null) {
  const db = lufs - E.REF_LUFS;
  // The engine corrects at most ±6 dB; beyond that, say so.
  const applied = 20 * Math.log10(E.loudnessGain(lufs));
  const fix =
    Math.abs(applied + db) < 0.1
      ? "level matched automatically"
      : `turned ${applied > 0 ? "up" : "down"} ${Math.abs(applied).toFixed(1)} dB, the most it adjusts; use --volume if it still sits wrong`;
  const note = Math.abs(db) < 1.5 ? "about average" : `${Math.abs(db).toFixed(1)} dB ${db > 0 ? "louder" : "quieter"} than average — ${fix}`;
  console.log(c.green("✔ ") + `Loudness ${lufs.toFixed(1)} LUFS (${note}); music level ${plan.spec.audio.musicVolume}.`);
}
if (plan.voice && plan.spec.audio.voiceover) console.log(c.green("✔ ") + `Ducks to ${Math.round(E.DUCKING.depth * 100)}% while the narration speaks.`);
// The renderer's decoder could not open the file, or it is AAC (Chrome decodes it, not every Chromium build does).
if (played === null || /\.(m4a|aac)$/i.test(rel))
  console.log(c.yellow("⚠ ") + `This format may not play in every renderer; MP3 or WAV always do (ffmpeg -i public/${rel} public/music/${base}.wav, then re-run).`);
const specRel = path.relative(process.cwd(), specPath);
const shown = specRel.startsWith("..") ? specPath : specRel;
console.log(c.green("✔ ") + `Wrote public/${beatsRel}; updated ${shown} (audio.music, audio.musicStart, audio.beats).`);
console.log(c.dim("  Only use music you hold a licence for. Next: npm run check -- " + args._[0] + "   then   npm run make -- …"));
