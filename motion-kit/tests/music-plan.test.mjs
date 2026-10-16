// Planner beat-snapping, music timeline and ducking on synthetic specs (no audio files needed).
import assert from "node:assert/strict";
import { test } from "node:test";
import { planVideo } from "../src/engine/plan.ts";
import { videoSchema } from "../src/engine/schema.ts";
import { PACE } from "../src/engine/tokens.ts";
import { DUCKING, FADE_IN, FADE_OUT, SNAP, SNAP_VOICE, beatFields, duckingCurve, loudnessGain, musicCurve, onTimeline, snapToBeat } from "../src/engine/music.ts";

const FPS = 30;
/** A steady 4/4 grid in ms from the start of the file. */
const grid = (bpm, seconds, firstMs = 0) => {
  const beats = [];
  for (let t = firstMs; t < seconds * 1000; t += 60000 / bpm) beats.push(Math.round(t * 10) / 10);
  return { beats, downbeats: beats.filter((_, i) => i % 4 === 0) };
};

const SCENES = [
  { type: "title", headline: "Turn words into *motion*" },
  { type: "kinetic", lines: ["Type a line.", "Pick a look.", "Get a *video*."] },
  { type: "stat", value: "87%", label: "of viewers watch *without sound*" },
  { type: "list", title: "What you get", items: ["Timing", "Sound", "Colour"], style: "checks" },
  { type: "quote", quote: "Fastest launch video we ever shipped.", author: "Asha" },
  { type: "cta", action: "Try it", sub: "Free for creators" },
];

const plan = (extra = {}, scenes = SCENES) => planVideo(videoSchema.parse({ format: "reel", theme: "midnight", scenes, ...extra }));

const withBeats = (bpm, start = 0, seconds = 120) => {
  const g = grid(bpm, seconds);
  return { music: "music/test.mp3", musicStart: start, beatGrid: g.beats, downbeatGrid: g.downbeats, musicDuration: seconds };
};

test("without a beat grid, music changes nothing about the timeline", () => {
  const a = plan();
  const b = plan({ audio: { music: "music/test.mp3" } });
  assert.deepEqual(
    b.scenes.map((s) => [s.from, s.duration]),
    a.scenes.map((s) => [s.from, s.duration]),
  );
  assert.equal(b.music.beats.length, 0);
  assert.equal(b.scenes.some((s) => s.onBeat !== undefined), false);
});

for (const bpm of [90, 120, 128]) {
  test(`${bpm} BPM: transition midpoints snap onto beats, keeping order and minimum durations`, () => {
    const base = plan();
    const p = plan({ audio: withBeats(bpm) });
    const T = p.transitionFrames;
    const hold = Math.floor((PACE.normal.hold * FPS) / 2);
    const beatSet = new Set(p.music.beats.map(Math.round));
    const downSet = new Set(p.music.downbeats.map(Math.round));

    assert.equal(p.scenes[0].from, 0, "scene 1 never moves");
    assert.equal(p.scenes[0].onBeat, undefined);
    let snapped = 0;
    for (let i = 1; i < p.scenes.length; i++) {
      const s = p.scenes[i];
      const prev = p.scenes[i - 1];
      assert.ok(s.from > prev.from, "scene order kept");
      // Only the previous scene's length changes, within the snap window.
      const change = prev.duration - base.scenes[i - 1].duration;
      assert.ok(Math.abs(change) <= SNAP.downbeat, `cut ${i} moved ${change} frames`);
      const content = prev.duration - T;
      assert.ok(content >= Math.max(base.scenes[i - 1].minReadable - hold, 39), `scene ${i} lost reading time (${content} frames)`);
      if (s.onBeat === undefined) {
        assert.equal(change, 0, "an unsnapped cut does not move");
        continue;
      }
      snapped++;
      assert.equal(s.onBeat, s.from + Math.round(T / 2), "the transition midpoint sits on the beat");
      assert.ok(beatSet.has(s.onBeat), "onBeat is a beat of the track");
      if (!downSet.has(s.onBeat)) assert.ok(Math.abs(change) <= SNAP.beat, "plain beats are only taken within ±7 frames");
    }
    assert.ok(snapped >= p.scenes.length - 2, `only ${snapped}/${p.scenes.length - 1} cuts snapped`);
    // The last scene keeps its own length.
    assert.equal(p.scenes.at(-1).duration, base.scenes.at(-1).duration);
  });
}

test("whoosh peaks (8 frames in) land on the snapped beat", () => {
  const p = plan({ audio: withBeats(120) });
  for (const s of p.scenes.slice(1)) {
    if (s.onBeat === undefined) continue;
    assert.ok(p.cues.some((c) => c.at === s.onBeat - 8 && c.sfx.startsWith("whoosh")), `no whoosh for the cut at ${s.onBeat}`);
  }
});

test("snapToBeat prefers a downbeat in reach over a nearer beat, and honours bounds", () => {
  const g = { beats: [96, 111, 126], downbeats: [111] };
  assert.deepEqual(snapToBeat(100, g, SNAP), { shift: -4, beat: 96 }, "downbeat out of reach: nearest beat");
  assert.deepEqual(snapToBeat(102, g, SNAP), { shift: 9, beat: 111 });
  assert.deepEqual(snapToBeat(102, { beats: g.beats, downbeats: [] }, SNAP), { shift: -6, beat: 96 });
  assert.deepEqual(snapToBeat(102, { beats: g.beats, downbeats: [] }, SNAP, 0), null, "earlier beats are out of bounds");
  assert.deepEqual(snapToBeat(102, g, SNAP_VOICE), null, "voice window is ±4");
  assert.deepEqual(snapToBeat(103, { beats: [100, 106], downbeats: [] }, SNAP), { shift: 3, beat: 106 }, "ties go to the later beat");
});

test("narrated cuts move at most 4 frames and keep speech sync", () => {
  const voiced = SCENES.map((s, i) => ({ ...s, say: ["Turn your words into motion.", "Type a line, pick a look, get a video.", "Most people watch without sound.", "You get timing, sound and colour.", "Fastest launch video we ever shipped, says Asha.", "Try it free today."][i] }));
  const base = plan({}, voiced);
  const p = plan({ audio: withBeats(120) }, voiced);
  assert.ok(p.voice, "voice mode");
  assert.equal(p.scenes[0].from, 0);
  let snapped = 0;
  p.scenes.forEach((s, i) => {
    assert.ok(Math.abs(s.from - base.scenes[i].from) <= SNAP_VOICE.beat, `scene ${i + 1} moved ${s.from - base.scenes[i].from} frames`);
    if (s.onBeat !== undefined) {
      snapped++;
      assert.equal(s.onBeat, s.from + Math.round(p.transitionFrames / 2));
    }
  });
  assert.ok(snapped >= 1, "some narrated cuts land on the beat");
});

test("the beat grid follows musicStart and loops with a short track", () => {
  // 120 BPM, 10 s track started 2 s in: 8 s loop, beats every 15 frames.
  const g = grid(120, 10);
  const frames = onTimeline(g.beats, 60, 10000, 600);
  assert.equal(frames[0], 0, "the beat at 2.0 s is frame 0");
  assert.equal(frames[1], 15);
  assert.ok(frames.includes(240), "loops after 8 s: the 2.0 s beat comes back at frame 240");
  assert.equal(new Set(frames).size, frames.length, "no beat twice at a loop seam");
  assert.ok(frames.every((f, i) => i === 0 || f > frames[i - 1]));
  // A long track does not repeat.
  assert.equal(Math.max(...onTimeline(g.beats, 0, undefined, 10000)), (Math.max(...g.beats) / 1000) * FPS);

  const p = plan({ audio: { ...withBeats(120, 1), musicStart: 1 } });
  assert.equal(p.music.startFrame, 30);
  assert.equal(p.music.beats[0], 0);
  // A start past the end of the track (the checker flags it) plays from the top instead of nothing.
  const past = plan({ audio: { ...withBeats(120, 0, 60), musicStart: 75 } });
  assert.equal(past.music.startFrame, 0);
  assert.equal(past.music.beats[0], 0);
});

test("ducking: down to 35% while words are spoken, with attack and release", () => {
  const words = [
    { startMs: 1000, endMs: 1400 },
    { startMs: 1500, endMs: 1900 }, // 100 ms gap: bridged, no pumping
    { startMs: 4000, endMs: 4300 },
  ];
  const g = duckingCurve(words, 180);
  const at = (ms) => g[Math.round((ms / 1000) * FPS)];
  assert.equal(at(0), 1);
  assert.equal(at(500), 1);
  assert.ok(Math.abs(at(1000) - DUCKING.depth) < 1e-9, "already ducked when the first word lands (attack starts early)");
  assert.ok(at(850) > 0.99, "attack starts only ~120 ms before the word");
  assert.ok(Math.abs(at(1450) - DUCKING.depth) < 1e-9, "short gaps stay ducked");
  assert.ok(at(2100) > DUCKING.depth && at(2100) < 1, "release is gradual");
  assert.equal(at(1900 + DUCKING.releaseMs + 50), 1, "fully back ~450 ms after speech");
  assert.ok(Math.abs(at(4100) - DUCKING.depth) < 1e-9);
  for (let f = 1; f < g.length; f++) {
    // Slopes: attack ~120 ms, release ~450 ms for the full 65% swing.
    assert.ok(g[f - 1] - g[f] <= (0.65 * 1000) / FPS / DUCKING.attackMs + 1e-9);
    assert.ok(g[f] - g[f - 1] <= (0.65 * 1000) / FPS / DUCKING.releaseMs + 1e-9);
  }
});

test("music level: fades, loudness match, ducking only with a voice-over", () => {
  const say = SCENES.map(() => "Some words are spoken here for this beat.");
  const voiced = SCENES.map((s, i) => ({ ...s, say: say[i] }));
  const vo = plan({ audio: { music: "music/test.mp3", voiceover: "voice/x.mp3" } }, voiced);
  const curve = musicCurve(vo);
  assert.equal(curve(0), 0);
  assert.equal(curve(vo.durationInFrames - 1), 0);
  const spoken = vo.voice.tokens[2];
  const mid = Math.round(((spoken.startMs + spoken.endMs) / 2000) * FPS);
  assert.ok(Math.abs(curve(mid) - vo.music.volume * DUCKING.depth) < 1e-9, "ducked under a word");

  // Same narration but no voice-over file (silent preview): no ducking.
  const preview = plan({ audio: { music: "music/test.mp3" } }, voiced);
  const flat = musicCurve(preview);
  const total = preview.durationInFrames;
  assert.ok(Math.abs(flat(mid) - preview.music.volume) < 1e-9);
  assert.ok(Math.abs(flat(FADE_IN / 2) - preview.music.volume / 2) < 1e-9, "linear 0.4 s fade-in");
  assert.ok(Math.abs(flat(total - 1 - FADE_OUT) - preview.music.volume) < 1e-9, "fade-out starts 1.5 s before the end");
  assert.ok(Math.abs(flat(total - 1 - FADE_OUT / 3) - preview.music.volume / 3) < 1e-9);
  assert.equal(flat(total), 0);

  assert.equal(loudnessGain(-14), 1);
  assert.ok(Math.abs(loudnessGain(-8) - 10 ** (-6 / 20)) < 1e-9, "a loud master is turned down");
  assert.equal(loudnessGain(-30), 2, "boost capped at +6 dB");
  assert.equal(loudnessGain(undefined), 1);
  const loud = plan({ audio: { music: "music/test.mp3", musicVolume: 0.2, musicLufs: -8 } });
  assert.ok(Math.abs(loud.music.volume - 0.2 * 10 ** (-6 / 20)) < 1e-9);
});

test("beatFields maps a beats file onto the inline spec fields", () => {
  assert.deepEqual(beatFields({ bpm: 120, beats: [0, 500], downbeats: [0], startMs: 0, durationMs: 90000, lufs: -9.5 }), {
    beatGrid: [0, 500],
    downbeatGrid: [0],
    musicDuration: 90,
    musicLufs: -9.5,
  });
  assert.deepEqual(beatFields({ beats: [], lufs: null }), { beatGrid: [], downbeatGrid: [] });
  // The result validates against the schema.
  assert.ok(videoSchema.safeParse({ scenes: SCENES, audio: { music: "m.mp3", beats: "m.beats.json", ...beatFields({ beats: [1, 2], durationMs: 1000, lufs: -14 }) } }).success);
});
