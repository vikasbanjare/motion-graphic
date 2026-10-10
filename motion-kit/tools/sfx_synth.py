"""Story sound effects synthesized from scratch (numpy only, CPU, no licence questions).

The kit's scene SFX packs (public/sfx/*) cover UI motion: whooshes, pops, dings. Story ads
also need the world: a phone ringing, keypad tones, a door, night ambience, rain, a heartbeat.
These are generated here, so the free tier needs no sound library and no model.

    python3 -I tools/sfx_synth.py --list
    python3 -I tools/sfx_synth.py ringback dtmf:9 night:3 --out public/sfx/story/
    python3 -I tools/sfx_synth.py --all --out public/sfx/story/      # every effect, one WAV each

Used as a library by tools/cast_voices.py: make(name, **params) -> float32 mono at RATE.
Names take parameters after a colon: dtmf:9, night:4 (seconds), rain:6, silence:300 (ms).
"""

import os
import sys
import wave

import numpy as np

RATE = 24000
_rng = np.random.default_rng(7)


def _t(sec):
    return np.arange(int(RATE * sec)) / RATE


def _env(n, attack=0.005, release=0.01):
    e = np.ones(n, np.float32)
    a, r = min(n // 2, int(RATE * attack)), min(n // 2, int(RATE * release))
    if a:
        e[:a] = np.linspace(0, 1, a)
    if r:
        e[-r:] = np.linspace(1, 0, r)
    return e


def _decay(n, rate):
    return np.exp(-np.linspace(0, rate, n)).astype(np.float32)


def tone(freqs, sec, amp=0.25):
    t = _t(sec)
    x = sum(np.sin(2 * np.pi * f * t) for f in freqs) / len(freqs)
    return (x * _env(len(t), 0.008, 0.008) * amp).astype(np.float32)


def silence(sec):
    return np.zeros(int(RATE * sec), np.float32)


def noise(n):
    return _rng.standard_normal(n).astype(np.float32)


def lowpass(x, cutoff):
    spec = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / RATE)
    spec *= 1 / (1 + (f / cutoff) ** 4)
    return np.fft.irfft(spec, len(x)).astype(np.float32)


def bandpass(x, lo, hi):
    spec = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / RATE)
    spec[(f < lo) | (f > hi)] = 0
    return np.fft.irfft(spec, len(x)).astype(np.float32)


def phone(x):
    """Telephone line: 300-3400 Hz band, light saturation and hiss."""
    y = np.tanh(bandpass(x, 300, 3400) * 2.2) / 2.2
    return (y + noise(len(y)) * 0.003).astype(np.float32)


DTMF = {"1": (697, 1209), "2": (697, 1336), "3": (697, 1477), "4": (770, 1209), "5": (770, 1336),
        "6": (770, 1477), "7": (852, 1209), "8": (852, 1336), "9": (852, 1477), "0": (941, 1336),
        "*": (941, 1209), "#": (941, 1477)}


def ringback():
    """Indian ringback: 400+450 Hz, 0.4 s on, 0.2 s off, 0.4 s on."""
    r = lambda: tone((400, 450), 0.4, 0.18)
    return np.concatenate([r(), silence(0.2), r(), silence(0.15)])


def busy():
    return np.concatenate([np.concatenate([tone((400,), 0.375, 0.18), silence(0.375)]) for _ in range(3)])


def dtmf(digit="1"):
    return np.concatenate([silence(0.08), tone(DTMF[str(digit)], 0.16, 0.22), silence(0.12)])


def click():
    n = int(RATE * 0.03)
    return np.concatenate([noise(n) * _decay(n, 9) * 0.35, silence(0.12)])


def pickup():
    n = int(RATE * 0.09)
    return np.concatenate([lowpass(noise(n), 2500) * _decay(n, 7) * 0.6, silence(0.12)])


def hangup():
    n = int(RATE * 0.12)
    thud = lowpass(noise(n), 900) * _decay(n, 10) * 0.9
    return np.concatenate([thud, silence(0.1), tone((480, 620), 0.25, 0.12)])


def chime():
    def ding(fs, sec):
        return tone(fs, sec, 0.12) * _decay(int(RATE * sec), 5)
    return np.concatenate([ding((880, 1320), 0.5)[: int(RATE * 0.12)], ding((1175, 1760), 0.7)])


def notify():
    """Phone notification: two quick bright pings."""
    p = lambda f: tone((f, f * 2), 0.18, 0.14) * _decay(int(RATE * 0.18), 6)
    return np.concatenate([p(1568), silence(0.05), p(2093), silence(0.1)])


def whoosh(sec=0.6):
    n = int(RATE * sec)
    x = noise(n)
    # Sweep a band up then down by mixing low- and high-passed copies along the way.
    lo, hi = lowpass(x, 700), x - lowpass(x, 2500)
    m = np.sin(np.linspace(0, np.pi, n)).astype(np.float32)
    y = lo * (1 - m) + hi * m
    return (y * np.sin(np.linspace(0, np.pi, n)) ** 2 * 0.35).astype(np.float32)


def riser(sec=1.5):
    t = _t(sec)
    f = 200 * (8 ** (t / sec))
    x = np.sin(2 * np.pi * np.cumsum(f) / RATE) * 0.12 + (noise(len(t)) - lowpass(noise(len(t)), 1500)) * 0.08 * (t / sec)
    return (x * (t / sec) ** 1.5).astype(np.float32)


def impact():
    n = int(RATE * 0.8)
    t = np.arange(n) / RATE
    boom = np.sin(2 * np.pi * (55 + 60 * np.exp(-t * 20)) * t) * _decay(n, 6) * 0.8
    crack = lowpass(noise(n), 4000) * _decay(n, 40) * 0.5
    return (boom + crack).astype(np.float32)


def typing(sec=1.5):
    out = silence(sec)
    t = 0.0
    while t < sec - 0.05:
        n = int(RATE * 0.025)
        k = bandpass(noise(n), 1500, 6000) * _decay(n, 12) * (0.25 + 0.15 * _rng.random())
        i = int(t * RATE)
        out[i: i + n] += k[: len(out) - i]
        t += 0.06 + 0.12 * _rng.random()
    return out


def heartbeat(sec=3.0, bpm=72):
    out = silence(sec)
    beat = 60 / bpm
    for t0 in np.arange(0, sec - 0.4, beat):
        for off, amp in ((0, 0.9), (0.28, 0.6)):
            n = int(RATE * 0.15)
            th = np.sin(2 * np.pi * 45 * np.arange(n) / RATE) * _decay(n, 8) * amp
            i = int((t0 + off) * RATE)
            out[i: i + n] += th[: len(out) - i]
    return out * 0.7


def night(sec=3.0):
    """Soft room tone with distant cricket chirps."""
    n = int(RATE * sec)
    room = lowpass(noise(n), 400)
    room = room / (np.abs(room).max() + 1e-6) * 0.02
    t = np.arange(n) / RATE
    chirp = np.sin(2 * np.pi * 4400 * t) * (np.sin(2 * np.pi * 30 * t) > 0.3)
    gate = ((t % 0.9) < 0.22).astype(np.float32)
    return (room + chirp * gate * 0.012).astype(np.float32)


def rain(sec=4.0):
    n = int(RATE * sec)
    bed = bandpass(noise(n), 800, 9000) * 0.05
    for _ in range(int(sec * 40)):
        i = _rng.integers(0, n - 400)
        d = bandpass(noise(400), 2000, 8000) * _decay(400, 10) * 0.1 * _rng.random()
        bed[i: i + 400] += d
    return (bed * _env(n, 0.3, 0.3)).astype(np.float32)


def city(sec=4.0):
    """Distant traffic hum with an occasional far horn."""
    n = int(RATE * sec)
    hum = lowpass(noise(n), 300) * 0.25
    hum = hum / (np.abs(hum).max() + 1e-6) * 0.06
    i = int(RATE * sec * 0.4)
    horn = tone((415, 523), 0.35, 0.03)
    hum[i: i + len(horn)] += horn[: n - i]
    return (hum * _env(n, 0.3, 0.3)).astype(np.float32)


def door():
    n = int(RATE * 0.5)
    knock = lowpass(noise(n), 600) * _decay(n, 14) * 0.9
    return np.concatenate([knock[: int(RATE * 0.25)], knock])


SFX = {
    "ringback": ringback, "busy": busy, "dtmf": dtmf, "click": click, "pickup": pickup, "hangup": hangup,
    "chime": chime, "notify": notify, "whoosh": whoosh, "riser": riser, "impact": impact,
    "typing": typing, "heartbeat": heartbeat, "night": night, "rain": rain, "city": city, "door": door,
    "silence": lambda ms=200: silence(float(ms) / 1000),
}
# Parameter after "name:" (dtmf digit, ambience/whoosh/riser seconds, silence ms).
_PARAM = {"dtmf": "digit", "silence": "ms", "night": "sec", "rain": "sec", "city": "sec",
          "typing": "sec", "heartbeat": "sec", "whoosh": "sec", "riser": "sec"}


def make(name, **params):
    if name not in SFX:
        raise SystemExit(f"Unknown sfx {name}. Choose one of: {', '.join(SFX)}")
    clean = {k: (float(v) if k == "sec" else v) for k, v in params.items()}
    return np.asarray(SFX[name](**clean), np.float32)


def parse(token):
    name, _, arg = token.partition(":")
    return make(name, **({_PARAM[name]: arg} if arg and name in _PARAM else {}))


def write_wav(path, x, rate=RATE):
    x = np.clip(x, -1, 1)
    with wave.open(path, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(rate)
        w.writeframes((x * 32767).astype("<i2").tobytes())


def main(argv):
    if not argv or "--list" in argv:
        print("Effects: " + ", ".join(SFX) + "\nParameters: dtmf:9  night:4  rain:6  silence:300")
        return
    out = argv[argv.index("--out") + 1] if "--out" in argv else "."
    os.makedirs(out, exist_ok=True)
    names = [n for n in SFX if n != "silence"] if "--all" in argv else [a for a in argv if not a.startswith("--") and a != out]
    for token in names:
        path = os.path.join(out, token.replace(":", "-") + ".wav")
        write_wav(path, parse(token))
        print(path)


if __name__ == "__main__":
    main(sys.argv[1:])
