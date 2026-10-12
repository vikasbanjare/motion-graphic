"""Original score + SFX for the CRED v6 film, composed to picture (numpy only; every note is generated here).

    python3 -I tools/cred_score.py --out public/custom/cred-v6/score

Writes <out>.music.wav, <out>.sfx.wav and <out>.wav (the mix), 44.1 kHz stereo, exactly 30.0 s.

The tempo map follows the film's sections (frames at 24 fps): each section has a whole number of beats, so every
scale-step cut and hand-over in the edit lands on a beat. Keep CUES in sync with src/custom/cred/v6 (frame numbers).
Sound: glassy FM bells and a warm pad in D major (Dmaj9 / Bm11 / Gmaj9 / Asus), sub bass, a soft kick/snap/shaker
groove that drops out for the push and the deep-sea shell, and SFX on the visual events (whooshes, hits, risers,
pops, laser scans, a card click, UI ticks, a ₹0 sparkle, bubbles).
"""

import argparse
import wave

import numpy as np

SR = 44100
FPS = 24
DUR = 30.0
N = int(SR * DUR)
rng = np.random.default_rng(23)


def fr(f):
    return f / FPS


# ---- tempo map: (start frame, end frame, beats) ------------------------------------------------------------------
SECTIONS = [
    ("intro", 0, 150, 12),
    ("card", 150, 276, 10),
    ("travel", 276, 384, 9),
    ("products", 384, 484, 8),
    ("shell", 484, 561, 6),
    ("outro", 561, 645, 7),
    ("lockup", 645, 720, 6),
]


def beats(name):
    for n, a, b, k in SECTIONS:
        if n == name:
            return [fr(a + (b - a) * i / k) for i in range(k)], fr((b - a) / k)
    raise KeyError(name)


# ---- dsp helpers --------------------------------------------------------------------------------------------------
def t_(sec):
    return np.arange(int(SR * sec)) / SR


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def lowpass(x, cutoff, order=4):
    spec = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    spec *= 1 / (1 + (f / max(cutoff, 1)) ** order)
    return np.fft.irfft(spec, len(x))


def highpass(x, cutoff):
    return x - lowpass(x, cutoff, 2)


def bandpass(x, lo, hi):
    return highpass(lowpass(x, hi), lo)


def adsr(n, a=0.005, d=0.1, s=0.6, r=0.2):
    e = np.ones(n) * s
    a, d, r = int(SR * a), int(SR * d), int(SR * r)
    a = min(a, n)
    e[:a] = np.linspace(0, 1, a)
    if a + d < n:
        e[a:a + d] = np.linspace(1, s, d)
    if r and r < n:
        e[-r:] *= np.linspace(1, 0, r)
    return e


def place(buf, x, at, gain=1.0, pan=0.0):
    """Add mono or stereo x into stereo buf at time `at` (s), constant-power pan -1..1."""
    i = int(round(at * SR))
    if i >= len(buf) or i + len(x) <= 0:
        return
    if x.ndim == 1:
        lg, rg = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
        x = np.stack([x * lg, x * rg], 1)
    j0 = max(0, -i)
    i = max(0, i)
    n = min(len(x) - j0, len(buf) - i)
    buf[i:i + n] += x[j0:j0 + n] * gain


def reverb(x, sec=2.4, mix=0.3, bright=6000, seed=1):
    """Stereo convolution reverb with decorrelated noise tails."""
    r = np.random.default_rng(seed)
    n = int(SR * sec)
    out = np.zeros_like(x)
    for c in range(2):
        ir = r.standard_normal(n) * np.exp(-np.linspace(0, 6.5, n))
        ir = lowpass(ir, bright)
        ir[: int(SR * 0.012)] = 0  # pre-delay
        m = len(x) + n
        wet = np.fft.irfft(np.fft.rfft(x[:, c], m) * np.fft.rfft(ir, m), m)[: len(x)]
        out[:, c] = wet
    out *= (np.abs(x).max() + 1e-9) / (np.abs(out).max() + 1e-9)
    return x * (1 - mix) + out * mix


def soft_clip(x, drive=1.2):
    return np.tanh(x * drive) / np.tanh(drive)


# ---- instruments --------------------------------------------------------------------------------------------------
def bell(f, sec=1.6, bright=1.0):
    """FM glass bell / electric piano: carrier f, modulator 3.5f, decaying index."""
    t = t_(sec)
    idx = (2.2 * bright) * np.exp(-t * 5)
    x = np.sin(2 * np.pi * f * t + idx * np.sin(2 * np.pi * 3.5 * f * t))
    x += 0.35 * np.sin(2 * np.pi * 2 * f * t + 0.6 * idx * np.sin(2 * np.pi * 7 * f * t))
    return x * np.exp(-t * 2.6) * adsr(len(t), 0.002, 0.05, 1, 0.05) * 0.28


def pad(notes, sec, cutoff=1400):
    t = t_(sec)
    out = np.zeros((len(t), 2))
    for k, m in enumerate(notes):
        f = hz(m)
        for c, det in enumerate((0.996, 1.004)):
            ph = 2 * np.pi * f * det * t + 0.4 * np.sin(2 * np.pi * (0.13 + 0.05 * k) * t)
            saw = 2 * ((ph / (2 * np.pi)) % 1) - 1
            out[:, c] += saw
    for c in range(2):
        out[:, c] = lowpass(out[:, c], cutoff, 2)
    return out / (2 * len(notes)) * adsr(len(t), 0.4, 0.2, 1, 0.5)[:, None] * 0.5


def sub(m, sec):
    t = t_(sec)
    x = np.sin(2 * np.pi * hz(m) * t) + 0.15 * np.sin(2 * np.pi * 2 * hz(m) * t)
    return soft_clip(x * adsr(len(t), 0.01, 0.1, 0.8, 0.12), 1.4) * 0.42


def kick():
    t = t_(0.42)
    x = np.sin(2 * np.pi * (46 + 110 * np.exp(-t * 32)) * t) * np.exp(-t * 7.5)
    click = lowpass(rng.standard_normal(len(t)), 4000) * np.exp(-t * 300) * 0.25
    return soft_clip((x + click) * 0.95, 1.6)


def snap():
    t = t_(0.3)
    x = np.zeros(len(t))
    for dly in (0, 0.009, 0.017):  # clap: three quick taps then a tail
        i = int(SR * dly)
        x[i:] += rng.standard_normal(len(t) - i) * np.exp(-t[: len(t) - i] * 60)
    x += rng.standard_normal(len(t)) * np.exp(-t * 18) * 0.35
    return bandpass(x, 900, 7000) * 0.28


def shaker(open_=False):
    t = t_(0.12 if open_ else 0.06)
    x = bandpass(rng.standard_normal(len(t)), 5000, 14000)
    return x * adsr(len(t), 0.004, 0.02, 0.5, 0.03) * 0.12


# ---- sfx ----------------------------------------------------------------------------------------------------------
def whoosh(sec=0.7, lo=300, hi=4000, up=True):
    """Air past the lens: band-passed noise layers whose centre glides lo->hi (or back), crossfaded smoothly."""
    t = t_(sec)
    u = t / sec if up else 1 - t / sec
    out = np.zeros(len(t))
    bands = 7
    for i in range(bands):
        c = lo * (hi / lo) ** (i / (bands - 1))
        layer = bandpass(rng.standard_normal(len(t)), c * 0.7, c * 1.4)
        out += layer * np.exp(-((u - i / (bands - 1)) ** 2) / 0.03)
    env = np.sin(np.pi * np.clip(t / sec, 0, 1)) ** 1.6
    return out * env * 0.35


def riser(sec=1.6):
    t = t_(sec)
    f = 200 * (8 ** (t / sec))
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.25
    nz = highpass(rng.standard_normal(len(t)), 2000) * 0.12
    return (tone + nz) * (t / sec) ** 2.2


def impact(big=1.0):
    t = t_(1.6)
    boom = np.sin(2 * np.pi * (38 + 60 * np.exp(-t * 12)) * t) * np.exp(-t * 2.8)
    crack = lowpass(rng.standard_normal(len(t)), 3500) * np.exp(-t * 22) * 0.5
    return soft_clip((boom + crack) * big, 1.5) * 0.7


def reverse_swell(sec=0.9):
    t = t_(sec)
    x = bandpass(rng.standard_normal(len(t)), 3000, 12000) * (t / sec) ** 3
    return x * 0.25


def pop(f=520):
    t = t_(0.25)
    x = np.sin(2 * np.pi * f * (1 + 0.6 * np.exp(-t * 40)) * t) * np.exp(-t * 22)
    return x * 0.45 + lowpass(rng.standard_normal(len(t)), 2000) * np.exp(-t * 80) * 0.2


def tick(f=2400):
    t = t_(0.06)
    return np.sin(2 * np.pi * f * t) * np.exp(-t * 90) * 0.35


def laser(sec=0.9):
    t = t_(sec)
    f = 1800 - 900 * (t / sec)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * (0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 70 * t)))
    return highpass(x, 600) * np.sin(np.pi * t / sec) * 0.08


def card_click():
    a = lowpass(rng.standard_normal(int(SR * 0.05)), 5000) * np.exp(-np.linspace(0, 12, int(SR * 0.05)))
    b = pop(180)[: int(SR * 0.12)]
    x = np.zeros(int(SR * 0.2))
    x[: len(a)] += a * 0.6
    x[int(SR * 0.035): int(SR * 0.035) + len(b)] += b * 0.8
    return x


def sparkle(sec=1.2, base=88):
    out = np.zeros(int(SR * sec))
    for i, m in enumerate([0, 4, 7, 11, 14, 16, 19, 23]):
        b = bell(hz(base + m), 0.8, 0.6)
        j = int(SR * i * 0.07)
        out[j:j + len(b)] += b[: len(out) - j] * 0.55
    return out


def bubbles(sec=4.0, count=22):
    out = np.zeros(int(SR * sec))
    for _ in range(count):
        at = rng.uniform(0, sec - 0.2)
        f0 = rng.uniform(500, 1400)
        t = t_(0.09)
        b = np.sin(2 * np.pi * f0 * (1 + 2.5 * t) * t) * np.exp(-t * 45) * rng.uniform(0.04, 0.1)
        i = int(at * SR)
        out[i:i + len(b)] += b[: len(out) - i]
    return out


def pen(sec=0.4):
    t = t_(sec)
    x = bandpass(rng.standard_normal(len(t)), 2500, 9000) * np.sin(np.pi * t / sec) ** 2
    return x * 0.06


# ---- composition --------------------------------------------------------------------------------------------------
# chords as MIDI notes (D major colour)
DMAJ9 = [50, 57, 61, 64, 66]   # D A C# E F#
BM11 = [47, 54, 57, 62, 64]    # B F# A D E
GMAJ9 = [43, 50, 54, 57, 62]   # G D F# A D(9 voiced as A/D)
ASUS = [45, 52, 57, 59, 62]    # A E A B D
PROG = [DMAJ9, BM11, GMAJ9, ASUS]
ROOTS = [38, 35, 31, 33]       # bass roots
ARP = [0, 2, 4, 3, 1, 4, 2, 3]  # index pattern into the chord (upper octave)


def music():
    m = np.zeros((N, 2))
    pads = np.zeros((N, 2))
    drums = np.zeros((N, 2))
    duck = np.ones(N)

    def chord_at(sec_idx, bar):
        return (sec_idx + bar) % 4

    for si, (name, a, b, k) in enumerate(SECTIONS):
        bt, bl = beats(name)
        start, end = fr(a), fr(b)
        # pad: one chord per two beats (one per beat-pair), filter opens through the intro
        for j in range(0, k, 2):
            ci = chord_at(si, j // 2)
            sec = min(bl * 2 + 0.6, DUR - bt[j])
            cut = 900 + 2600 * min(1, bt[j] / 5.5) if name == "intro" else (700 if name == "shell" else 2400)
            place(pads, pad(PROG[ci], sec, cut), bt[j], 0.9 if name != "lockup" else 0)
            if name not in ("shell", "lockup"):
                place(m, sub(ROOTS[ci], bl * 2 * 0.95), bt[j], 0.32 if bt[j] > 2.6 else 0.0)
        # bells: 8th-note arpeggio (16ths in travel/products for lift), panned left/right
        div = 4 if name in ("travel", "products") else 2
        if name == "shell":
            div = 1
        if name == "lockup":
            continue
        for j in range(k * div):
            at = start + j * bl / div
            if at >= end:
                break
            ci = chord_at(si, int(j // div) // 2)
            note = PROG[ci][ARP[j % len(ARP)]] + 12
            if name == "shell":
                note += 12
            g = 0.75 if div == 4 and j % 2 else 1.0
            if name == "card" and fr(250) <= at < fr(276):
                g *= 0.4  # the push thins out before the strip opens
            place(m, bell(hz(note), 1.4 if name != "shell" else 2.6, 0.8 if name == "shell" else 1.0), at, 0.55 * g, pan=-0.35 if j % 2 else 0.35)
        # groove
        if name in ("intro", "card", "travel", "products", "outro"):
            for j, at in enumerate(bt):
                in_groove = True
                if name == "intro" and at < fr(62):
                    in_groove = False  # lines + disc: shaker only
                if name == "card" and fr(250) <= at < fr(276):
                    in_groove = False  # tension before the strip opens
                if name == "outro" and at >= fr(630):
                    in_groove = False
                # shaker on 8ths everywhere in these sections
                for h in range(2):
                    place(drums, shaker(h == 1), at + h * bl / 2, 0.9, pan=0.25)
                if not in_groove:
                    continue
                if j % 2 == 0:
                    place(drums, kick(), at, 0.9)
                    i0 = int(at * SR)
                    w = int(SR * 0.22)
                    duck[i0:i0 + w] = np.minimum(duck[i0:i0 + w], 0.55 + 0.45 * np.linspace(0, 1, len(duck[i0:i0 + w])))
                else:
                    place(drums, snap(), at, 0.8, pan=-0.1)
    # final chord: the lockup
    lock = fr(645)
    for i, note in enumerate(DMAJ9 + [69, 73, 78]):
        place(m, bell(hz(note + 12), 4.5, 0.7), lock + i * 0.035, 0.5, pan=(i % 3 - 1) * 0.4)
    place(pads, pad(DMAJ9, DUR - lock, 1800), lock, 1.0)
    place(m, sub(38, 2.2), lock, 0.5)
    pads *= duck[:, None]
    for c in range(2):
        pads[:, c] = highpass(pads[:, c], 160)  # leave the low end to the sub and kick
    mix = m + pads * 0.85
    mix = reverb(mix, 2.6, 0.32, 7000, seed=3) + drums
    # fade the tail to silence by 30.0 s, and a short fade-in so the first sample is clean
    tail = int(SR * 2.2)
    mix[-tail:] *= np.linspace(1, 0, tail)[:, None] ** 1.5
    mix[: int(SR * 0.01)] *= np.linspace(0, 1, int(SR * 0.01))[:, None]
    return mix


def sfx():
    s = np.zeros((N, 2))
    # intro: pen swishes as the lines race in (alternating sides), field cut tick, disc swell
    for i in range(13):
        k = abs(i - 6)
        place(s, pen(0.35), fr(k * 1.6), 0.9, pan=-0.6 if i % 2 else 0.6)
    place(s, tick(1800), fr(25), 0.8)
    place(s, whoosh(0.9, 200, 1800), fr(18), 0.7, pan=0.5)
    place(s, reverse_swell(0.5), fr(62) - 0.5, 0.7)
    place(s, tick(2200), fr(112), 0.6)
    # card reveal
    place(s, reverse_swell(1.0), fr(150) - 1.0, 1.0)
    place(s, impact(0.8), fr(150), 0.9)
    place(s, whoosh(0.8, 400, 3000, up=False), fr(150), 0.6)
    # the push into the strip, then the strip tears open
    place(s, riser(fr(276 - 200)), fr(200), 0.8)
    place(s, impact(0.6), fr(276), 0.6)
    place(s, whoosh(1.0, 600, 6000), fr(276), 0.8)
    place(s, sparkle(1.0, 86), fr(280), 0.35)
    # travel: plane fly-bys, hotel rise rumble, cut tick, globe grows into the match
    for at, p in ((292, -0.6), (312, 0.6), (326, -0.3)):
        place(s, whoosh(0.9, 500, 2500), fr(at), 0.35, pan=p)
    hot = lowpass(rng.standard_normal(int(SR * 1.1)), 160) * np.sin(np.pi * t_(1.1) / 1.1) * 0.5
    place(s, hot, fr(296), 0.6, pan=-0.5)
    place(s, tick(2000), fr(336), 0.6)
    place(s, riser(fr(30)), fr(354), 0.6)
    place(s, impact(0.5), fr(384), 0.55)
    # products: crane whoosh, four drops on the beat, cut tick
    place(s, whoosh(1.6, 250, 1500, up=False), fr(386), 0.6)
    for at, f in ((409, 330), (421, 392), (434, 440), (459, 494)):
        place(s, pop(f), fr(at), 0.8, pan=0.2)
    place(s, tick(2400), fr(446), 0.5)
    # zero fee: iris swell, bubbles, the ₹0 sparkle, the dive
    place(s, whoosh(0.9, 150, 900), fr(484), 0.7)
    place(s, bubbles(fr(561 - 486), 26), fr(486), 1.0, pan=-0.2)
    place(s, sparkle(1.3, 84), fr(506), 0.7)
    place(s, riser(fr(25)), fr(536), 0.7)
    # outro: hit into the card, lasers, phone up, card click, UI ticks, push, lockup
    place(s, impact(0.7), fr(561), 0.8)
    place(s, whoosh(0.8, 500, 3500, up=False), fr(561), 0.5)
    place(s, laser(fr(20)), fr(571), 1.0, pan=-0.3)
    place(s, laser(fr(16)), fr(573), 0.9, pan=0.3)
    place(s, whoosh(0.9, 300, 2200), fr(586), 0.6)
    place(s, card_click(), fr(606), 0.9)
    for at in (609, 615, 621):
        place(s, tick(2600), fr(at), 0.55, pan=0.15)
    place(s, riser(fr(645 - 630)), fr(630), 0.6)
    place(s, reverse_swell(0.5), fr(645) - 0.5, 0.8)
    place(s, impact(1.0), fr(645), 0.9)
    return reverb(s, 1.4, 0.18, 8000, seed=5)


def write(path, x):
    x = np.clip(x, -1, 1)
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((x * 32767).astype("<i2").tobytes())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", required=True, help="output path prefix, e.g. public/custom/cred-v6/score")
    a = ap.parse_args()
    mu, fx = music(), sfx()
    mu *= 0.5 / (np.abs(mu).max() + 1e-9)
    fx *= 0.55 / (np.abs(fx).max() + 1e-9)
    mix = mu * 0.95 + fx * 0.85
    mix *= 0.89 / (np.abs(mix).max() + 1e-9)
    write(a.out + ".music.wav", mu)
    write(a.out + ".sfx.wav", fx)
    write(a.out + ".wav", mix)
    print("wrote", a.out + ".wav", f"{len(mix) / SR:.2f}s")


if __name__ == "__main__":
    main()
