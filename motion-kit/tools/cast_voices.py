"""Multi-voice narration with story sound effects, free and offline (Kokoro + numpy).

`npm run voice` speaks a whole video in one voice. A story ad needs a cast: an IVR, a
customer, an agent, a narrator, plus phone sounds. This tool reads a cast file and writes
the same outputs as `npm run voice` (public/voice/<name>.mp3 + <name>.timing.json, and
audio.voiceover / audio.timing in the spec), so check, qa and make work unchanged.

    python3 -I tools/cast_voices.py specs/<name>.cast.json

Cast file:
  {
    "spec": "specs/<name>.json",
    "gapMs": 350,                        # breath between beats
    "beats": [                           # one per scene with a `say`, in order
      {"voice": "am_michael",            # any Kokoro voice (h* = Hindi, needs Devanagari)
       "speak": "Press one for English.",# what the voice reads; defaults to the scene's say
       "speed": 1.0,
       "phone": true,                    # telephone band-pass (300-3400 Hz) + light grit
       "gain": 1.0,
       "before": [{"sfx": "ringback"}],  # sounds before the line (they take time)
       "under": [{"sfx": "night", "gain": 0.5}],   # sounds under the line
       "after": [{"sfx": "dtmf", "digit": "2"}]}   # sounds after the line
    ]
  }
SFX: ringback (Indian 400+450 Hz double ring), dtmf (digit), click, pickup, chime, night
(soft room tone + crickets), silence (ms).

Word timings: the spec's `say` words are spread over each spoken line by length, so the
on-screen karaoke and scene cuts follow the real audio even when the voice reads another
script (Devanagari for the Hindi voices, Latin Hinglish on screen).
"""

import json
import os
import subprocess
import sys

import numpy as np

RATE = 24000
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def tone(freqs, sec, amp=0.25):
    t = np.arange(int(RATE * sec)) / RATE
    x = sum(np.sin(2 * np.pi * f * t) for f in freqs) / len(freqs)
    fade = min(len(t) // 2, int(RATE * 0.008))
    env = np.ones(len(t))
    if fade:
        env[:fade] = np.linspace(0, 1, fade)
        env[-fade:] = np.linspace(1, 0, fade)
    return (x * env * amp).astype(np.float32)


def silence(sec):
    return np.zeros(int(RATE * sec), np.float32)


DTMF = {"1": (697, 1209), "2": (697, 1336), "3": (697, 1477), "4": (770, 1209), "5": (770, 1336),
        "6": (770, 1477), "7": (852, 1209), "8": (852, 1336), "9": (852, 1477), "0": (941, 1336)}


def sfx(ev, rng):
    kind = ev["sfx"]
    if kind == "ringback":
        r = lambda: tone((400, 450), 0.4, 0.18)
        return np.concatenate([r(), silence(0.2), r(), silence(0.15)])
    if kind == "dtmf":
        return np.concatenate([silence(0.08), tone(DTMF[str(ev.get("digit", "1"))], 0.16, 0.22), silence(0.12)])
    if kind in ("click", "pickup"):
        n = int(RATE * (0.03 if kind == "click" else 0.09))
        x = rng.standard_normal(n).astype(np.float32) * np.exp(-np.linspace(0, 9, n)).astype(np.float32)
        return np.concatenate([x * (0.35 if kind == "click" else 0.25), silence(0.12)])
    if kind == "chime":
        a = tone((880, 1320), 0.5, 0.12) * np.exp(-np.linspace(0, 5, int(RATE * 0.5))).astype(np.float32)
        b = tone((1175, 1760), 0.7, 0.12) * np.exp(-np.linspace(0, 5, int(RATE * 0.7))).astype(np.float32)
        return np.concatenate([a[: int(RATE * 0.12)], b])
    if kind == "silence":
        return silence(ev.get("ms", 200) / 1000)
    raise SystemExit(f"Unknown sfx {kind}")


def night(sec, rng):
    """Soft room tone with distant cricket chirps."""
    n = int(RATE * sec)
    pink = np.cumsum(rng.standard_normal(n)).astype(np.float32)
    pink -= np.convolve(pink, np.ones(2400) / 2400, mode="same")
    pink = pink / (np.abs(pink).max() + 1e-6) * 0.015
    t = np.arange(n) / RATE
    chirp = np.sin(2 * np.pi * 4400 * t) * (np.sin(2 * np.pi * 30 * t) > 0.3)
    gate = ((t % 0.9) < 0.22).astype(np.float32)
    return (pink + chirp * gate * 0.012).astype(np.float32)


def phone(x, rng):
    """Telephone line: 300-3400 Hz band, a touch of saturation and line hiss."""
    spec = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / RATE)
    spec[(f < 300) | (f > 3400)] = 0
    y = np.fft.irfft(spec, len(x)).astype(np.float32)
    y = np.tanh(y * 2.2) / 2.2
    return y + rng.standard_normal(len(y)).astype(np.float32) * 0.003


def main():
    cast_path = os.path.abspath(sys.argv[1])
    cast = json.load(open(cast_path, encoding="utf8"))
    spec_path = os.path.join(ROOT, cast["spec"])
    spec = json.load(open(spec_path, encoding="utf8"))
    says = [s.get("say", "") for s in spec["scenes"] if s.get("say")]
    beats = cast["beats"]
    if len(beats) != len(says):
        raise SystemExit(f"{len(beats)} beats in the cast but {len(says)} scenes with a say")

    from kokoro_onnx import Kokoro

    d = os.path.join(os.path.expanduser("~"), ".cache", "motion-kit", "kokoro")
    k = Kokoro(os.path.join(d, "kokoro-v1.0.int8.onnx"), os.path.join(d, "voices-v1.0.bin"))
    rng = np.random.default_rng(7)
    lang_of = {"a": "en-us", "b": "en-gb", "h": "hi"}
    gap = silence(cast.get("gapMs", 350) / 1000)

    track, words, at = [], [], 0
    for i, (b, say) in enumerate(zip(beats, says)):
        if i:
            track.append(gap)
            at += len(gap)
        for ev in b.get("before", []):
            s = sfx(ev, rng) * ev.get("gain", 1)
            track.append(s)
            at += len(s)
        audio, sr = k.create(b.get("speak", say), voice=b["voice"], speed=b.get("speed", 1.0), lang=b.get("lang", lang_of.get(b["voice"][0], "en-us")))
        if sr != RATE:
            raise SystemExit(f"Kokoro returned {sr} Hz, expected {RATE}")
        loud = np.flatnonzero(np.abs(audio) > 0.01)
        audio = audio[max(0, loud[0] - 960): loud[-1] + 960].astype(np.float32)
        if b.get("phone"):
            audio = phone(audio, rng)
        audio = audio * b.get("gain", 1.0)
        for ev in b.get("under", []):
            bed = (night(len(audio) / RATE + 0.4, rng) if ev["sfx"] == "night" else sfx(ev, rng)) * ev.get("gain", 1)
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
            s = sfx(ev, rng) * ev.get("gain", 1)
            track.append(s)
            at += len(s)
        print(f"  beat {i + 1}/{len(beats)} · {b['voice']}", file=sys.stderr, flush=True)

    x = np.concatenate(track)
    x = x / max(1.0, np.abs(x).max() / 0.95)
    name = os.path.splitext(os.path.basename(spec_path))[0]
    os.makedirs(os.path.join(ROOT, "public", "voice"), exist_ok=True)
    audio_rel, timing_rel = f"voice/{name}.mp3", f"voice/{name}.timing.json"
    pcm = (x * 32767).astype("<i2").tobytes()
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "s16le", "-ac", "1", "-ar", str(RATE), "-i", "-",
                    "-ar", "44100", "-b:a", "160k", os.path.join(ROOT, "public", audio_rel)], input=pcm, check=True)
    json.dump({"source": "cast:kokoro", "words": words}, open(os.path.join(ROOT, "public", timing_rel), "w"), indent=1)
    spec.setdefault("audio", {}).update({"voiceover": audio_rel, "timing": timing_rel})
    spec["audio"].pop("words", None)
    with open(spec_path, "w", encoding="utf8") as f:
        json.dump(spec, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"✔ {len(words)} timed words, {len(x) / RATE:.1f}s → public/{audio_rel}")


if __name__ == "__main__":
    main()
