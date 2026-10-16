"""Multi-voice narration with story sound effects, free and offline (Kokoro + numpy).

`npm run voice` speaks a whole video in one voice. A story ad needs a cast: an IVR, a
customer, an agent, a narrator, plus phone sounds. This tool reads a cast file and writes
the same outputs as `npm run voice` (public/voice/<name>.mp3 + <name>.timing.json, and
audio.voiceover / audio.timing in the spec), so check, qa and make work unchanged.

    python3 -I tools/cast_voices.py specs/productions/<name>.json   (its "voices" block)
    python3 -I tools/cast_voices.py <cast>.json                     (a bare cast file with "spec")

Cast (the "voices" block of a production file):
  {
    "gapMs": 350,                        # breath between beats
    "beats": [                           # one per scene with a `say`, in order
      {"voice": "am_michael",            # any Kokoro voice (h* = Hindi, needs Devanagari)
       "speak": "Press one for English.",# what the voice reads; defaults to the scene's say
       "speed": 1.0,
       "phone": true,                    # telephone band-pass (300-3400 Hz) + light grit
       "gain": 1.0,
       "before": [{"sfx": "ringback"}],  # sounds before the line (they take time)
       "under": [{"sfx": "night", "gain": 0.5}],   # sounds under the line
       "after": [{"sfx": "dtmf", "digit": "2"}]},  # sounds after the line
      {"file": "voice/takes/agent-1.wav"}          # OR a take made anywhere else (local open
    ]                                              # model, Higgsfield, Magnific, ElevenLabs, a mic)
  }
SFX: any name from tools/sfx_synth.py (ringback, dtmf, pickup, chime, notify, night, rain, city,
whoosh, riser, impact, typing, heartbeat, door, hangup, busy, click, silence), or
{"file": "sfx/x.wav"} for a sound made or licensed elsewhere.

Word timings: the spec's `say` words are spread over each spoken line by length, so the
on-screen karaoke and scene cuts follow the real audio even when the voice reads another
script (Devanagari for the Hindi voices, Latin Hinglish on screen).
"""

import json
import os
import subprocess
import sys

import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "tools"))  # -I drops the script folder; sfx_synth lives beside us.
import sfx_synth as fx  # noqa: E402

RATE = fx.RATE


def load(path):
    """Decode any audio file to float32 mono at RATE (ffmpeg)."""
    r = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-f", "f32le", "-ac", "1", "-ar", str(RATE), "-"], capture_output=True, check=True)
    return np.frombuffer(r.stdout, np.float32).copy()


def sound(ev):
    """One SFX event: {"sfx": "dtmf", "digit": "9"} (synthesized) or {"file": "sfx/x.wav"} (any source)."""
    if "file" in ev:
        x = load(os.path.join(ROOT, "public", ev["file"]))
    else:
        params = {k: v for k, v in ev.items() if k not in ("sfx", "gain")}
        x = fx.make(ev["sfx"], **params)
    return x * ev.get("gain", 1)


def main():
    cast_path = os.path.abspath(sys.argv[1])
    doc = json.load(open(cast_path, encoding="utf8"))
    # A production file keeps the cast under "voices"; a bare cast file is the cast itself.
    cast = doc.get("voices", doc)
    spec_path = os.path.join(ROOT, doc["spec"])
    spec = json.load(open(spec_path, encoding="utf8"))
    says = [s.get("say", "") for s in spec["scenes"] if s.get("say")]
    beats = cast["beats"]
    if len(beats) != len(says):
        raise SystemExit(f"{len(beats)} beats in the cast but {len(says)} scenes with a say")

    kokoro = None
    lang_of = {"a": "en-us", "b": "en-gb", "h": "hi"}
    gap = fx.silence(cast.get("gapMs", 350) / 1000)

    track, words, at = [], [], 0
    for i, (b, say) in enumerate(zip(beats, says)):
        if i:
            track.append(gap)
            at += len(gap)
        for ev in b.get("before", []):
            s = sound(ev)
            track.append(s)
            at += len(s)
        if b.get("file"):
            # A take made anywhere else: a local open model, Higgsfield, Magnific, ElevenLabs, a recording.
            audio = load(os.path.join(ROOT, "public", b["file"]))
            source = b["file"]
        else:
            if kokoro is None:
                from kokoro_onnx import Kokoro

                d = os.path.join(os.path.expanduser("~"), ".cache", "motion-kit", "kokoro")
                kokoro = Kokoro(os.path.join(d, "kokoro-v1.0.int8.onnx"), os.path.join(d, "voices-v1.0.bin"))
            audio, sr = kokoro.create(b.get("speak", say), voice=b["voice"], speed=b.get("speed", 1.0), lang=b.get("lang", lang_of.get(b["voice"][0], "en-us")))
            if sr != RATE:
                raise SystemExit(f"Kokoro returned {sr} Hz, expected {RATE}")
            source = b["voice"]
        audio = np.asarray(audio, np.float32)
        loud = np.flatnonzero(np.abs(audio) > 0.01)
        if len(loud):
            audio = audio[max(0, loud[0] - 960): loud[-1] + 960]
        if b.get("phone"):
            audio = fx.phone(audio)
        audio = audio * b.get("gain", 1.0)
        for ev in b.get("under", []):
            if ev.get("sfx") in ("night", "rain", "city", "typing", "heartbeat") and "sec" not in ev:
                ev = {**ev, "sec": len(audio) / RATE + 0.4}
            bed = sound(ev)
            audio = np.pad(audio, (0, max(0, len(bed) - len(audio))))
            audio[: len(bed)] += bed
        # The spec's words, spread over the spoken part by length.
        start, end = at / RATE * 1000, (at + len(audio)) / RATE * 1000
        ws = say.split()
        total = sum(len(w) + 1 for w in ws)
        t = start
        for w in ws:
            dur = (end - start) * (len(w) + 1) / total
            words.append({"text": w, "startMs": round(t, 1), "endMs": round(t + dur, 1)})
            t += dur
        track.append(audio)
        at += len(audio)
        for ev in b.get("after", []):
            s = sound(ev)
            track.append(s)
            at += len(s)
        print(f"  beat {i + 1}/{len(beats)} · {source}", file=sys.stderr, flush=True)

    x = np.concatenate(track)
    x = x / max(1.0, np.abs(x).max() / 0.95)
    name = os.path.splitext(os.path.basename(spec_path))[0]
    os.makedirs(os.path.join(ROOT, "public", "voice"), exist_ok=True)
    audio_rel, timing_rel = f"voice/{name}.mp3", f"voice/{name}.timing.json"
    pcm = (x * 32767).astype("<i2").tobytes()
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "s16le", "-ac", "1", "-ar", str(RATE), "-i", "-",
                    "-ar", "44100", "-b:a", "160k", os.path.join(ROOT, "public", audio_rel)], input=pcm, check=True)
    json.dump({"source": "cast", "words": words}, open(os.path.join(ROOT, "public", timing_rel), "w"), indent=1)
    spec.setdefault("audio", {}).update({"voiceover": audio_rel, "timing": timing_rel})
    spec["audio"].pop("words", None)
    with open(spec_path, "w", encoding="utf8") as f:
        json.dump(spec, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"✔ {len(words)} timed words, {len(x) / RATE:.1f}s → public/{audio_rel}")


if __name__ == "__main__":
    main()
