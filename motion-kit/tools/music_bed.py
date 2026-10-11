"""Instrumental music beds synthesized from scratch (numpy, CPU, a few seconds per track).

The free tier's music: no model, no download, no licence question (the notes are generated
here, so the track is yours). It is a bed, not a hit: pads, a pulse, a light melody, arranged
to the shape measured across 496 reference films (docs/research/dataset.md): a held intro,
the busiest stretch about a third in, a calmer last tenth, a clean ending.

    python3 -I tools/music_bed.py --mood warm --seconds 30 --out public/music/bed.wav
    python3 -I tools/music_bed.py --mood tech --bpm 112 --key A --seconds 45 --out public/music/x.wav

Moods:
  warm   Indian: tanpura drone, harmonium pad, bansuri-like melody (raag Bhupali notes), synth tabla (keherwa)
  tech   minor pluck arpeggio, sub bass, soft kick and hats: SaaS / AI launch
  calm   slow major pad progression with soft piano-like plucks: explainer, brand film
  tense  low drone, pulse and rising filter: problem beat, thriller teaser

Then fit it to the video like any track:  npm run music -- specs/x.json --track music/bed.wav
For better music use a local open model or an MCP tool (see docs/research/free-open-models.md).
"""

import argparse
import wave

import numpy as np

SR = 44100
NOTES = {"C": 0, "C#": 1, "D": 2, "D#": 3, "E": 4, "F": 5, "F#": 6, "G": 7, "G#": 8, "A": 9, "A#": 10, "B": 11}
rng = np.random.default_rng(11)


def hz(semitone, octave=4):
    return 440.0 * 2 ** ((semitone - 9) / 12 + (octave - 4))


def env(n, a, r):
    e = np.ones(n)
    a, r = min(int(SR * a), n // 2), min(int(SR * r), n // 2)
    if a:
        e[:a] = np.linspace(0, 1, a)
    if r:
        e[-r:] *= np.linspace(1, 0, r)
    return e


def lowpass(x, cutoff):
    spec = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    spec *= 1 / (1 + (f / cutoff) ** 4)
    return np.fft.irfft(spec, len(x))


def osc(f, sec, kind="sine", vib=0.0):
    t = np.arange(int(SR * sec)) / SR
    ph = 2 * np.pi * np.cumsum(f * (1 + vib * np.sin(2 * np.pi * 5.2 * t))) / SR
    if kind == "saw":
        return 2 * ((ph / (2 * np.pi)) % 1) - 1
    if kind == "tri":
        return 2 * np.abs(2 * ((ph / (2 * np.pi)) % 1) - 1) - 1
    return np.sin(ph)


def add(buf, x, at):
    i = int(at * SR)
    if i >= len(buf):
        return
    n = min(len(x), len(buf) - i)
    buf[i: i + n] += x[:n]


def reverb(x, sec=1.8, mix=0.25):
    n = int(SR * sec)
    ir = rng.standard_normal(n) * np.exp(-np.linspace(0, 7, n))
    ir = lowpass(ir, 5000)
    m = len(x) + n
    wet = np.fft.irfft(np.fft.rfft(x, m) * np.fft.rfft(ir, m), m)[: len(x)]
    wet *= np.abs(x).max() / (np.abs(wet).max() + 1e-9)
    return x * (1 - mix) + wet * mix


# ---- instruments -------------------------------------------------------------

def pad(freqs, sec, kind="saw", cutoff=1200):
    x = sum(osc(f * d, sec, kind) for f in freqs for d in (0.997, 1.003)) / (2 * len(freqs))
    return lowpass(x, cutoff) * env(len(x), 0.6, 0.8)


def pluck(f, sec=0.5, bright=3000):
    x = osc(f, sec, "saw") * np.exp(-np.linspace(0, 6, int(SR * sec)))
    return lowpass(x, bright) * env(len(x), 0.003, 0.05)


def flute(f, sec):
    x = osc(f, sec, "sine", vib=0.004) + 0.15 * osc(2 * f, sec)
    breath = lowpass(rng.standard_normal(len(x)), 3000) * 0.05
    return (x + breath) * env(len(x), 0.08, 0.25)


def kick():
    n = int(SR * 0.35)
    t = np.arange(n) / SR
    return np.sin(2 * np.pi * (50 + 90 * np.exp(-t * 30)) * t) * np.exp(-t * 9)


def hat(open_=False):
    n = int(SR * (0.18 if open_ else 0.05))
    x = rng.standard_normal(n)
    x = x - lowpass(x, 7000)
    return x * np.exp(-np.linspace(0, 8, n)) * 0.25


def tabla(kind, base):
    """Synth tabla strokes: dayan (tuned ring), bayan (low bend), closed slap."""
    n = int(SR * 0.4)
    t = np.arange(n) / SR
    if kind == "na":
        return (np.sin(2 * np.pi * base * t) + 0.5 * np.sin(2 * np.pi * base * 2.7 * t)) * np.exp(-t * 14) * 0.5
    if kind == "ge":
        return np.sin(2 * np.pi * (70 + 40 * np.exp(-t * 8)) * t) * np.exp(-t * 6) * 0.8
    if kind == "dha":
        return tabla("na", base) + tabla("ge", base)
    x = lowpass(rng.standard_normal(n), 2500) * np.exp(-t * 40) * 0.4  # ka / ti
    return x


def tanpura(root, sec):
    # Pa - Sa - Sa - low Sa, each string a bright, slowly decaying tone with jawari shimmer.
    out = np.zeros(int(SR * sec))
    cycle = 2.4
    for k in np.arange(0, sec, cycle):
        for j, f in enumerate((root * 1.5, root * 2, root * 2, root)):
            n = int(SR * min(cycle * 1.6, sec - k - j * 0.6)) if sec - k - j * 0.6 > 0.1 else 0
            if n <= 0:
                continue
            t = np.arange(n) / SR
            tone = sum(np.sin(2 * np.pi * f * h * t) / h ** 1.2 for h in range(1, 9))
            tone *= (1 + 0.3 * np.sin(2 * np.pi * 0.7 * t)) * np.exp(-t * 0.9)
            add(out, tone * 0.06, k + j * 0.6)
    return out


# ---- arrangements ------------------------------------------------------------

def section(t, total):
    """0 intro, 1 build, 2 full, 3 outro, following the measured film shape."""
    p = t / total
    return 0 if p < 0.12 else 1 if p < 0.3 else 2 if p < 0.88 else 3


def arrange(mood, key, bpm, sec):
    root = NOTES[key]
    beat = 60 / bpm
    out = np.zeros(int(SR * sec) + SR)
    bars = int(sec / (4 * beat)) + 1

    if mood == "warm":
        r = hz(root, 3)
        add(out, tanpura(r, sec + 1), 0)
        # Harmonium-like pad on Sa-Ga-Pa, then Sa-Ma-Dha, alternating every 2 bars.
        for b in range(bars):
            t0 = b * 4 * beat
            chord = (0, 4, 7) if (b // 2) % 2 == 0 else (0, 5, 9)
            add(out, pad([hz(root + c, 3) for c in chord], 4 * beat + 0.4, "saw", 900) * 0.10, t0)
            sec_i = section(t0, sec)
            if sec_i in (1, 2):
                # Keherwa: dha ge na ti | na ka dhi na  (8 matras over one bar)
                bols = ["dha", "ge", "na", "ti", "na", "ka", "dha", "na"] if sec_i == 2 else ["dha", None, "na", None, "na", None, "dha", None]
                for m, bol in enumerate(bols):
                    if bol:
                        add(out, tabla(bol, hz(root, 4)) * (0.6 if sec_i == 1 else 0.8), t0 + m * beat / 2)
            if sec_i == 2 and b % 2 == 0:
                # Bhupali phrase: S R G P D (major pentatonic), one long note to land on.
                scale = [0, 2, 4, 7, 9, 12]
                phrase = rng.choice(scale, size=3)
                for m, s in enumerate(phrase):
                    add(out, flute(hz(root + int(s), 5), beat * 1.6) * 0.09, t0 + m * beat * 1.3)
                add(out, flute(hz(root + 7, 5), beat * 3) * 0.08, t0 + 4 * beat)
    elif mood == "tech":
        prog = [(0, 3, 7), (8, 12, 15), (3, 7, 10), (10, 14, 17)]  # i VI III VII
        for b in range(bars):
            t0 = b * 4 * beat
            ch = prog[b % 4]
            sec_i = section(t0, sec)
            add(out, pad([hz(root + c, 3) for c in ch], 4 * beat + 0.3, "saw", 700) * 0.09, t0)
            add(out, osc(hz(root + ch[0], 1), 4 * beat) * env(int(SR * 4 * beat), 0.02, 0.1) * (0.18 if sec_i in (1, 2) else 0.05), t0)
            if sec_i >= 1:
                for s in range(16):
                    if sec_i == 3 and s % 2:
                        continue
                    note = ch[s % 3] + (12 if s % 8 >= 4 else 0)
                    add(out, pluck(hz(root + note, 4), 0.3, 2200 if sec_i == 1 else 3500) * 0.07, t0 + s * beat / 4)
            if sec_i == 2:
                for q in range(4):
                    add(out, kick() * 0.45, t0 + q * beat)
                    add(out, hat() * 0.6, t0 + q * beat + beat / 2)
    elif mood == "calm":
        prog = [(0, 4, 7), (7, 11, 14), (9, 12, 16), (5, 9, 12)]  # I V vi IV
        for b in range(bars):
            t0 = b * 4 * beat
            ch = prog[b % 4]
            sec_i = section(t0, sec)
            add(out, pad([hz(root + c, 3) for c in ch], 4 * beat + 0.6, "tri", 1600) * 0.12, t0)
            if sec_i in (1, 2):
                for s, note in enumerate((ch[0] + 12, ch[1] + 12, ch[2] + 12, ch[1] + 12)):
                    add(out, pluck(hz(root + note, 4), 1.2, 1800) * (0.07 if sec_i == 2 else 0.05), t0 + s * beat)
    elif mood == "tense":
        add(out, pad([hz(root, 2), hz(root + 1, 2), hz(root + 7, 2)], sec + 1, "saw", 400) * 0.16, 0)
        for b in range(bars):
            t0 = b * 4 * beat
            sec_i = section(t0, sec)
            if sec_i >= 1:
                for q in range(4):
                    add(out, kick() * (0.35 if sec_i == 1 else 0.5), t0 + q * beat)
                    if sec_i == 2:
                        add(out, kick() * 0.25, t0 + q * beat + 0.22)
            if sec_i == 2:
                add(out, pluck(hz(root + 13, 4), 0.6, 1500) * 0.06, t0 + 3 * beat)
    else:
        raise SystemExit(f"Unknown mood {mood}: warm, tech, calm, tense")

    out = out[: int(SR * sec)]
    out = reverb(out, 2.2 if mood in ("warm", "calm") else 1.4, 0.3)
    fade = int(SR * min(2.5, sec * 0.1))
    out[-fade:] *= np.linspace(1, 0, fade) ** 1.5
    out[: int(SR * 0.05)] *= np.linspace(0, 1, int(SR * 0.05))
    # Loudness: aim near -16 LUFS-ish by RMS, keep peaks under -1 dBFS.
    rms = np.sqrt(np.mean(out ** 2)) + 1e-9
    out *= 0.11 / rms
    out /= max(1.0, np.abs(out).max() / 0.89)
    return out


def stereo(x):
    """A touch of width: delay the right channel by 11 ms and blend."""
    d = int(SR * 0.011)
    r = np.concatenate([np.zeros(d), x[:-d]])
    return np.stack([x, 0.8 * x + 0.2 * r], 1)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--mood", default="calm", choices=["warm", "tech", "calm", "tense"])
    ap.add_argument("--key", default=None, choices=list(NOTES))
    ap.add_argument("--bpm", type=float, default=None)
    ap.add_argument("--seconds", type=float, default=30)
    ap.add_argument("--seed", type=int, default=11)
    ap.add_argument("--out", required=True)
    a = ap.parse_args()
    global rng
    rng = np.random.default_rng(a.seed)
    defaults = {"warm": ("D", 84), "tech": ("A", 112), "calm": ("F", 76), "tense": ("C", 96)}
    key = a.key or defaults[a.mood][0]
    bpm = a.bpm or defaults[a.mood][1]
    x = stereo(arrange(a.mood, key, bpm, a.seconds + 0.5))
    target = a.out
    if a.out.lower().endswith(".mp3"):
        a.out = a.out[:-4] + ".tmp.wav"
    with wave.open(a.out, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((np.clip(x, -1, 1) * 32767).astype("<i2").tobytes())
    if target != a.out:
        import os
        import subprocess

        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", a.out, "-b:a", "192k", target], check=True)
        os.remove(a.out)
        a.out = target
    # Sidecar: tells `npm run check` this track was synthesized here (no third-party licence).
    import json
    with open(a.out + ".generated.json", "w") as f:
        json.dump({"generator": "tools/music_bed.py", "mood": a.mood, "key": key, "bpm": bpm, "seed": a.seed}, f)
    print(f"✔ {a.mood} · {key} · {bpm:g} bpm · {a.seconds:g}s → {a.out}")


if __name__ == "__main__":
    main()
