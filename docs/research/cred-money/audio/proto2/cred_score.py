"""'Engraved' score: an ORIGINAL 125 BPM track in the arrangement language measured on the
CRED Money reference (research-cred/audio). numpy only, CPU, ~2 s per minute of music.

What is copied: the *language* (tempo, groove grammar, instrument roles, section order and
proportions, loudness arc, stereo/spectral balance). What is NOT copied: notes, ostinato order,
chord sequence; those are written fresh here.

    python3 -I cred_score.py --seconds 45 --out score.wav            # sections scaled from the reference
    python3 -I cred_score.py --seconds 45 --sections "intro=3.9,grooveA=8.5,drop=19,break=29,drop2=33.6,outro=41.4,tail=43.8" --out s.wav
    python3 -I cred_score.py --seconds 69.06 --lufs -16.9 --out ref_shape.wav

Writes <out>.beats.json: bpm, downbeats, every section start (snapped to the bar grid) -> cut
your picture on these (pro-film rules B.2: cuts on 2/4/8-beat boundaries; biggest visual on the drop).
"""

import argparse
import json
import wave

import numpy as np

SR = 44100
NOTE = {"C": 0, "C#": 1, "Db": 1, "D": 2, "D#": 3, "Eb": 3, "E": 4, "F": 5, "F#": 6, "Gb": 6, "G": 7,
        "G#": 8, "Ab": 8, "A": 9, "A#": 10, "Bb": 10, "B": 11}
# Section starts as a fraction of the film, measured on the reference (69.06 s):
# music enters 6.0 s, groove 12.9, drop 29.0, breakdown 44.4, drop 2 51.4, outro 63.3, tail 67.2.
REF_SHAPE = {"intro": 0.087, "grooveA": 0.187, "drop": 0.420, "break": 0.643, "drop2": 0.744, "outro": 0.917, "tail": 0.973}
# Short-term loudness targets (LUFS) per section, measured on the reference (ffmpeg ebur128):
# v2: section targets re-fitted after SFX calibration so the FINAL mix tracks the measured short-term curve
REF_LUFS = {"intro": (-33.0, -23.0), "grooveA": -16.9, "drop": -15.2, "break": -22.3, "drop2": -14.6, "outro": -17.4}
rng = np.random.default_rng(5)


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def ff(x, g):
    """Zero-phase FFT filter with magnitude response g(f)."""
    X = np.fft.rfft(x, axis=0)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    gg = g(f)
    return np.fft.irfft(X * (gg[:, None] if X.ndim == 2 else gg), len(x), axis=0)


def lp(x, fc, o=2):
    return ff(x, lambda f: 1 / np.sqrt(1 + (f / fc) ** (2 * o)))


def hp(x, fc, o=2):
    return ff(x, lambda f: 1 / np.sqrt(1 + (fc / np.maximum(f, 1)) ** (2 * o)))


def put(buf, x, at, pan=0.0, gain=1.0):
    i = int(round(at * SR))
    if i >= len(buf) or i + len(x) <= 0:
        return
    th = (pan + 1) * np.pi / 4
    x = x if x.ndim == 2 else np.stack([np.cos(th) * x, np.sin(th) * x], 1)
    j0 = max(0, -i)
    n = min(len(x) - j0, len(buf) - max(i, 0))
    buf[max(i, 0): max(i, 0) + n] += gain * x[j0: j0 + n]


# ------------------------------------------------------------------ instruments
def pluck(f, dur=0.32, bright=1.0):
    """Soft mallet/pluck: measured ref notes decay in ~0.2-0.3 s with harmonics to ~3 kHz."""
    t = np.arange(int(SR * dur)) / SR
    amps = [1.0, 0.5 * bright, 0.38 * bright, 0.26 * bright, 0.18 * bright, 0.12 * bright, 0.08 * bright]
    x = sum(a * np.sin(2 * np.pi * f * h * t) * np.exp(-t * (8 + 5 * h)) for h, a in enumerate(amps, 1))
    x[: int(SR * 0.002)] *= np.linspace(0, 1, int(SR * 0.002))
    x[-int(SR * 0.01):] *= np.linspace(1, 0, int(SR * 0.01))
    return x


def kick808(f_end, dur=0.55):
    """808-style kick: pitch drop ~150 Hz -> root over ~0.2 s (the 'J' tails in the ref spectrogram)."""
    t = np.arange(int(SR * dur)) / SR
    f = f_end + (150 - f_end) * np.exp(-t / 0.045)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 4.5)
    x[: int(SR * 0.003)] *= np.linspace(0, 1, int(SR * 0.003))
    return np.tanh(1.8 * x) * 0.9


def clap_knock():
    """Bar-downbeat accent: dry clap/snap (1-5 kHz bursts) layered with a woody knock ~900 Hz."""
    n = int(SR * 0.3)
    t = np.arange(n) / SR
    noise = rng.standard_normal(n)
    clap = np.zeros(n)
    for k, off in enumerate((0.0, 0.009, 0.019)):
        i = int(off * SR)
        clap[i:] += noise[: n - i] * np.exp(-(t[: n - i]) * (120 if k < 2 else 28))
    clap = hp(lp(clap, 4000), 900)
    knock = (np.sin(2 * np.pi * 900 * t) + 0.4 * np.sin(2 * np.pi * 2330 * t)) * np.exp(-t * 38)
    return 0.55 * clap / (np.abs(clap).max() + 1e-9) + 0.6 * knock


def tom(f=140):
    t = np.arange(int(SR * 0.22)) / SR
    return np.sin(2 * np.pi * (f * (1 + 0.3 * np.exp(-t * 40))) * t) * np.exp(-t * 16) * 0.7


def hat(open_=False):
    n = int(SR * (0.12 if open_ else 0.045))
    x = lp(hp(rng.standard_normal(n), 7000, 3), 11000, 2)
    return x * np.exp(-np.linspace(0, 7, n)) * 0.05


def sub_note(f, dur):
    t = np.arange(int(SR * dur)) / SR
    x = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * 2 * f * t)
    e = np.ones_like(t)
    a, r = int(SR * 0.03), int(SR * 0.08)
    e[:a] = np.linspace(0, 1, a)
    e[-r:] = np.linspace(1, 0, r)
    return np.tanh(1.3 * x * e) * 0.8


def pad(freqs, dur, fc=1500):
    t = np.arange(int(SR * dur)) / SR
    L = sum(2 * np.abs(2 * ((f * 0.997 * t) % 1) - 1) - 1 for f in freqs)
    R = sum(2 * np.abs(2 * ((f * 1.003 * t) % 1) - 1) - 1 for f in freqs)
    x = lp(np.stack([L, R], 1) / len(freqs), fc)
    e = np.minimum(1, np.minimum(t / 0.5, (dur - t) / 0.6))[:, None]
    return x * np.clip(e, 0, 1)


# ------------------------------------------------------------------ loudness helpers
def k_weight(x):
    """BS.1770 K-weighting magnitude (high-shelf +4 dB above ~1.5 kHz, RLB high-pass ~38 Hz)."""
    def g(f):
        shelf = 10 ** (4 / 20 * (1 / (1 + (1500 / np.maximum(f, 1)) ** 2)))
        rlb = 1 / np.sqrt(1 + (38 / np.maximum(f, 1)) ** 4)
        return shelf * rlb
    return ff(x, g)


def lufs(x):
    y = k_weight(x)
    return -0.691 + 10 * np.log10(np.mean(np.sum(y ** 2, axis=1)) + 1e-12)


def limiter(x, ceil=0.84, look=0.003, rel=0.08):  # v2: 0.84 (-1.5 dBFS sample) keeps true peak <= -1 dBTP after AAC
    """Look-ahead peak limiter (vectorised): ceiling 0.89 ~= -1 dBFS sample peak."""
    a = np.abs(x).max(axis=1)
    w = int(SR * look)
    pk = np.lib.stride_tricks.sliding_window_view(np.pad(a, (0, w)), w + 1).max(axis=1)[: len(a)]
    g = np.minimum(1, ceil / np.maximum(pk, 1e-9))
    # release smoothing: one-pole on the gain via cumulative minimum over a sliding window
    k = int(SR * rel)
    g = np.lib.stride_tricks.sliding_window_view(np.pad(g, (k, 0), constant_values=1), k + 1).min(axis=1)
    sm = np.convolve(g, np.ones(w * 2 + 1) / (w * 2 + 1), mode="same")
    return x * np.minimum(g, sm)[:, None]


# ------------------------------------------------------------------ arrangement
def build(seconds, bpm, key, sections, lufs_target, seed):
    global rng
    rng = np.random.default_rng(seed)
    beat = 60 / bpm
    bar = 4 * beat
    st = beat / 4
    root = NOTE[key]
    # snap every section start to the bar grid that starts at the music entry ("intro")
    t0 = sections["intro"]
    snap = {k: (t0 + round((v - t0) / bar) * bar if k != "intro" else v) for k, v in sections.items()}
    order = ["intro", "grooveA", "drop", "break", "drop2", "outro", "tail"]
    bounds = [(k, snap[k], snap[order[i + 1]] if i + 1 < len(order) else seconds) for i, k in enumerate(order)]
    stems = {k: np.zeros((int(SR * (seconds + 3)), 2)) for k in ("pluck", "drums", "bass", "pad", "hats")}

    # ORIGINAL ostinato cell (semitones from chord root); accents in a 3-3-4-3-3 grouping
    cell = [-5, 0, 2, 7, -5, 4, 0, 2, 7, 9, 7, 4, 2, 0, -5, 2]
    acc = {0, 3, 6, 10, 13}
    prog_drop = [0, 5, 0, -2]           # I IV I bVII   (Eb Ab Eb Db) - major-leaning, like the ref's pitch-class profile
    prog_drop2 = [0, 5, -2, 0]          # I IV bVII I
    base = 48 + root if root <= 5 else 36 + root   # chord-root register Eb3 (midi 51) .. A2

    def section_of(t):
        for k, a, b in bounds:
            if a <= t < b:
                return k, (t - a) / max(b - a, 1e-6), a, b
        return "tail", 1.0, seconds, seconds

    nbars = int((seconds - t0) / bar) + 2
    for b in range(nbars):
        tb = t0 + b * bar
        sec, p, sa, sb = section_of(tb + 1e-3)
        if tb >= seconds:
            break
        bars_in = int(round((tb - sa) / bar))
        prog = prog_drop2 if sec == "drop2" else prog_drop
        ch = prog[bars_in % 4] if sec in ("drop", "drop2") else 0
        r = base + ch
        third = 4
        # ---- pluck ostinato
        if sec in ("intro", "grooveA", "drop", "drop2", "outro", "break"):
            for s in range(16):
                deg = cell[s] if cell[s] != 4 else third
                f = hz(r + 12 + deg)
                vel = 1.0 if s in acc else 0.8
                # measured: intro pluck centroid ~1.1 kHz (bright), outro ~0.9 kHz (dark), break filtered
                bright = {"break": 0.45, "intro": 1.6, "outro": 0.6}.get(sec, 1.0)
                width = {"intro": 0.75, "break": 0.55, "outro": 0.25}.get(sec, 0.45)
                pan = width * (1 if s % 2 else -1)
                put(stems["pluck"], pluck(f, 0.3, bright), tb + s * st, pan, 0.16 * vel * (0.55 if sec == "break" and p < 0.55 else 1))
        # ---- low pluck body in the intro (roots/fifths around 78-117 Hz)
        if sec == "intro":
            for s, deg in ((0, 0), (6, 7), (10, 0), (14, 7)):
                put(stems["pad"], pluck(hz(r - 12 + deg), 0.7, 0.5), tb + s * st, 0.5 if s in (6, 14) else -0.5, 0.3)  # v2: 0.5->0.3, ref intro sub is -21 dB rel.
        # ---- pad (in drops and breakdown)
        if sec in ("drop", "drop2", "break", "grooveA", "outro"):
            # v2: the reference sustains chords (200-1600 Hz harmonic stacks) through groove A and the outro too;
            # mids were 4 dB low without them. grooveA alternates I / IV(add9) per bar like the measured chroma.
            gch = (0 if bars_in % 2 == 0 else 5) if sec in ("grooveA", "outro") else 0
            rr = r + gch
            pv = pad([hz(rr - 12), hz(rr), hz(rr + 4), hz(rr + 7), hz(rr + 14)], bar + 0.4, 1800 if sec != "outro" else 1100)
            if sec in ("grooveA", "outro"):
                # mono and dry-ish: the measured groove/outro are narrow (side-mid -11 / -15 dB) but mid-heavy
                put(stems["drums"], pv.mean(1), tb, 0, 0.26 if sec == "grooveA" else 0.2)
            else:
                put(stems["pad"], pv, tb, 0, {"break": 0.14}.get(sec, 0.12))
        # ---- drums
        if sec in ("grooveA", "drop", "drop2", "outro"):
            put(stems["drums"], clap_knock(), tb, 0, 0.8)
            kick_steps = [[7, 9, 13], [5, 7, 13], [7, 10, 13], [7, 9, 14]][b % 4]
            if sec == "outro":
                kick_steps = kick_steps[:2]
            for s in kick_steps:
                put(stems["drums"], kick808(hz(r - 24)), tb + s * st, 0, 0.75)
            for s in ([4] if b % 2 else [12]):
                put(stems["drums"], tom(130 if s == 4 else 175), tb + s * st, 0.15, 0.5)
        # ---- 8th hats + sustained sub in the drops
        if sec in ("drop", "drop2"):
            for s in range(0, 16, 2):
                put(stems["hats"], hat(open_=(s % 4 == 2 and b % 2 == 1)), tb + s * st, 0.2 * (1 if s % 4 else -1), 1.0 if s % 4 else 0.6)
            put(stems["bass"], sub_note(hz(r - 24), bar), tb, 0, 0.5)
        if sec == "break":
            put(stems["bass"], sub_note(hz(base - 24), bar) * 0.6, tb, 0, 0.45)
            put(stems["bass"], sub_note(hz(base - 12), bar) * 0.5, tb, 0, 0.3)

    # ---- outro echoes: last 2 bars of pluck go through an 8th-note ping-pong delay
    out_a = snap["outro"]
    x = stems["pluck"].copy()
    d = int(SR * beat / 2)
    seg = x[int(out_a * SR):]
    echo = np.zeros_like(seg)
    g = 1.0
    for k in range(1, 7):
        g *= 0.45
        sh = np.roll(seg, d * k, axis=0)
        sh[: d * k] = 0
        echo += g * (sh[:, ::-1] if k % 2 else sh)
    stems["pluck"][int(out_a * SR):] += lp(echo, 1800)
    # v2: the reference outro is dark (repeating-layer centroid ~0.9 kHz; 2-6 kHz 32 dB under the sub)
    oa = int(out_a * SR)
    stems["pluck"][oa:] = lp(stems["pluck"][oa:], 1600)
    # intro: dotted-8th wide delay for the measured width (side/mid ~ 0 dB in the ref intro)
    ia, ib = int(snap["intro"] * SR), int(snap["grooveA"] * SR)
    d2 = int(SR * beat * 0.75)
    sl = stems["pluck"][ia:ib].copy()
    stems["pluck"][ia + d2: ib + d2, 0] += 0.5 * sl[:, 1]
    stems["pluck"][ia + d2 * 2: ib + d2 * 2, 1] += 0.3 * sl[:, 0]

    # ---- stereo room on pluck + pad: decorrelated L/R noise IRs (adds the side energy measured on the ref)
    def room(x, sec=1.3, mix=0.32):
        n = int(SR * sec)
        out = np.zeros_like(x)
        for ch in range(2):
            ir = rng.standard_normal(n) * np.exp(-np.linspace(0, 6.5, n))
            ir = lp(ir, 4500)
            m = len(x) + n
            wet = np.fft.irfft(np.fft.rfft(x[:, ch], m) * np.fft.rfft(ir, m), m)[: len(x)]
            out[:, ch] = wet / (np.abs(wet).max() + 1e-9) * np.abs(x[:, ch]).max()
        return x * (1 - mix) + out * mix
    stems["pluck"] = room(stems["pluck"])
    stems["pad"] = room(stems["pad"], 2.0, 0.4)
    # ---- mix with per-section loudness automation (targets measured on the reference)
    mix = sum(stems.values())
    mix = hp(mix, 28, 3)
    # ---- M/S width: the ref keeps side ~= mid from 150 Hz to 5 kHz (-1..-4 dB; ~0 dB in the intro),
    # bass mono-ish below 150 Hz. Boost side above 150 Hz per section.
    mid_, side_ = (mix[:, 0] + mix[:, 1]) / 2, (mix[:, 0] - mix[:, 1]) / 2
    side_hi = hp(side_, 150, 2)
    # v2 widths re-fitted to measured side-mid: grooves -11 dB, intro +0.6 dB (L/R corr ~0), outro -15 dB
    wgain = np.full(len(mix), 2.8)
    wgain[int(snap["intro"] * SR): int(snap["grooveA"] * SR)] = 2.6
    wgain[int(snap["outro"] * SR):] = 1.7
    k = int(SR * 0.2)
    wgain = np.convolve(np.pad(wgain, (k, k), mode="edge"), np.ones(k) / k, mode="same")[k:-k]
    side_ = (side_ - side_hi) * 0.7 + side_hi * wgain
    mix = np.stack([mid_ + side_, mid_ - side_], 1)
    gain = np.ones(len(mix))
    for k, a, b in bounds:
        if k == "tail":
            continue
        i0, i1 = int(a * SR), int(min(b, seconds) * SR)
        if i1 - i0 < SR // 4:
            continue
        cur = lufs(mix[i0:i1])
        tgt = REF_LUFS[k]
        if isinstance(tgt, tuple):   # ramp (crescendo through the intro)
            ramp = np.linspace(tgt[0], tgt[1], i1 - i0)
            gain[i0:i1] = 10 ** ((ramp - cur) / 20)
        else:
            gain[i0:i1] = 10 ** ((tgt - cur) / 20)
    # tail: from the last section (outro end) decay ~ -12 dB/s to near silence (ref: -17 -> -45 LUFS in 1.9 s)
    ta = int(snap["tail"] * SR)
    gain[ta:] = gain[ta - 1] * np.exp(-np.arange(len(gain) - ta) / SR * 1.6)
    gain[: int(snap["intro"] * SR)] = 0
    # smooth gain changes over 0.12 s so section edges are not steps
    k = int(SR * 0.12)
    gain = np.convolve(np.pad(gain, (k, k), mode="edge"), np.ones(k) / k, mode="same")[k:-k]
    mix = mix * gain[:, None]
    mix = mix[: int(SR * seconds)]
    # global trim to the integrated target, then peak-limit
    mix *= 10 ** ((lufs_target - lufs(mix[int(snap["intro"] * SR):])) / 20) if lufs_target else 1
    mix = limiter(mix)
    n = int(SR * 0.004)
    mix[:n] *= np.linspace(0, 1, n)[:, None]
    mix[-int(SR * 0.05):] *= np.linspace(1, 0, int(SR * 0.05))[:, None]
    beats = {"bpm": bpm, "key": key, "bar_sec": bar, "music_entry": snap["intro"],
             "sections": {k: round(v, 3) for k, v in snap.items()},
             "downbeats": [round(t0 + i * bar, 3) for i in range(int((seconds - t0) / bar) + 1)]}
    return mix.astype(np.float32), beats


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--seconds", type=float, default=45)
    ap.add_argument("--bpm", type=float, default=125.0)
    ap.add_argument("--key", default="Eb", choices=list(NOTE))
    ap.add_argument("--sections", default=None, help="name=sec,... (intro,grooveA,drop,break,drop2,outro,tail)")
    ap.add_argument("--lufs", type=float, default=-14.0, help="integrated target from music entry (ref measured -16.9)")
    ap.add_argument("--seed", type=int, default=5)
    ap.add_argument("--out", required=True)
    a = ap.parse_args()
    sec = {k: v * a.seconds for k, v in REF_SHAPE.items()}
    if a.sections:
        for kv in a.sections.split(","):
            k, v = kv.split("=")
            sec[k.strip()] = float(v)
    mix, beats = build(a.seconds, a.bpm, a.key, sec, a.lufs, a.seed)
    with wave.open(a.out, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((np.clip(mix, -1, 1) * 32767).astype("<i2").tobytes())
    json.dump(beats, open(a.out + ".beats.json", "w"), indent=1)
    json.dump({"generator": "cred_score.py (prototype)", "bpm": a.bpm, "key": a.key, "seed": a.seed}, open(a.out + ".generated.json", "w"))
    print(f"{a.out}: {a.seconds:g}s {a.bpm:g} bpm {a.key}; sections {beats['sections']}")


if __name__ == "__main__":
    main()
