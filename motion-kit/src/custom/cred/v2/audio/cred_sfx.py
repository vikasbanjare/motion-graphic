"""Engraved-world SFX palette, synthesized from scratch (numpy only), modelled on measured shapes.

Every recipe reproduces a *measured envelope/spectrum class* from the CRED Money reference
(research-cred/audio), not a sample of it. Numbers in each docstring are what was measured there.

    python3 -I cred_sfx.py --list
    python3 -I cred_sfx.py --all --out sfx/            # one 44.1 kHz stereo WAV per recipe
    python3 -I cred_sfx.py whip whip_pair:0.14 bird_chirps:4 --out sfx/

Library use:  from cred_sfx import make;  x = make("whip", dur=0.25)  ->  float32 (n, 2) at SR
All outputs peak-normalised to -6 dBFS (0.5); set the level in the cue sheet (dB over the bed).
"""

import os
import sys
import wave

import numpy as np

SR = 44100
_rng = np.random.default_rng(23)


# ---------------------------------------------------------------- helpers
def _t(sec):
    return np.arange(int(SR * sec)) / SR


def _noise(n):
    return _rng.standard_normal(n)


def _fft_filter(x, gain_fn):
    """Zero-phase filter by an arbitrary magnitude response gain_fn(freqs)."""
    n = len(x)
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(n, 1 / SR)
    return np.fft.irfft(X * gain_fn(f), n)


def bandpass(x, lo, hi, order=4):
    return _fft_filter(x, lambda f: 1 / np.sqrt(1 + (lo / np.maximum(f, 1)) ** (2 * order)) / np.sqrt(1 + (f / hi) ** (2 * order)))


def highpass(x, lo, order=4):
    return _fft_filter(x, lambda f: 1 / np.sqrt(1 + (lo / np.maximum(f, 1)) ** (2 * order)))


def lowpass(x, hi, order=4):
    return _fft_filter(x, lambda f: 1 / np.sqrt(1 + (f / hi) ** (2 * order)))


def stft_shape(n, shape_fn, nfft=1024, hop=256):
    """Noise whose spectrum over time follows shape_fn(t_sec, freqs) -> gain (time-varying filter)."""
    win = np.hanning(nfft)
    frames = 1 + (n + nfft) // hop
    out = np.zeros(n + 2 * nfft)
    norm = np.zeros(n + 2 * nfft)
    f = np.fft.rfftfreq(nfft, 1 / SR)
    for k in range(frames):
        t = (k * hop - nfft / 2) / SR
        spec = np.fft.rfft(_noise(nfft) * win) * shape_fn(max(t, 0), f)
        seg = np.fft.irfft(spec, nfft) * win
        out[k * hop: k * hop + nfft] += seg
        norm[k * hop: k * hop + nfft] += win ** 2
    out = out / np.maximum(norm, 1e-3)
    return out[nfft // 2: nfft // 2 + n]


def env_ad(n, attack, release, curve=1.0):
    e = np.ones(n)
    a, r = min(n, int(SR * attack)), min(n, int(SR * release))
    if a:
        e[:a] = np.linspace(0, 1, a) ** curve
    if r:
        e[-r:] *= np.linspace(1, 0, r) ** curve
    return e


def fade_edges(x, ms=5):
    n = int(SR * ms / 1000)
    if len(x) > 2 * n:
        r = np.linspace(0, 1, n)
        x[:n] *= r[:, None] if x.ndim == 2 else r
        x[-n:] *= r[::-1, None] if x.ndim == 2 else r[::-1]
    return x


def to_stereo(m, pan=0.0, width=0.0):
    """pan -1..1 (equal power); width 0..1 mixes in a decorrelated copy (11-23 ms all-pass-ish delay)."""
    th = (pan + 1) * np.pi / 4
    L, R = np.cos(th) * m, np.sin(th) * m
    if width > 0:
        d1, d2 = int(SR * 0.011), int(SR * 0.017)
        dl = np.concatenate([np.zeros(d1), m[:-d1]])
        dr = np.concatenate([np.zeros(d2), m[:-d2]])
        L = L * (1 - width * 0.5) + width * 0.5 * dl
        R = R * (1 - width * 0.5) - width * 0.5 * dr
    return np.stack([L, R], 1)


def norm(x, peak=0.5):
    return (x * peak / (np.abs(x).max() + 1e-9)).astype(np.float32)


def delay_tail(x, step, fb=0.45, n=6, pingpong=True):
    """Tempo-synced feedback echoes (the reference ends on 8th-note echoes, 0.24 s at 125 BPM)."""
    d = int(SR * step)
    out = np.zeros((len(x) + d * n, 2))
    out[: len(x)] += x
    g = 1.0
    for k in range(1, n + 1):
        g *= fb
        y = x * g
        if pingpong:
            y = y[:, ::-1] if k % 2 else y
        y = np.stack([lowpass(y[:, 0], 7000 - 600 * k), lowpass(y[:, 1], 7000 - 600 * k)], 1)  # each echo darker
        out[k * d: k * d + len(x)] += y
    return out


# ---------------------------------------------------------------- recipes
def pen_scribble(dur=3.4, strokes_per_sec=3.2):
    """Pen / burin on paper. Measured: 3.35 s, MONO, broadband 0.5-15 kHz, flatness 0.8, onset
    0.56 s attack then plateau, streaky formant-like bands gliding 2-10 kHz; ends with a hard stop."""
    n = int(SR * dur)
    starts = np.cumsum(_rng.uniform(0.18, 0.5, int(dur * strokes_per_sec) + 4)) - 0.15
    strokes = [(s, _rng.uniform(0.18, 0.55), _rng.uniform(1400, 5000), _rng.uniform(-1.0, 1.0)) for s in starts if s < dur]

    def shape(t, f):
        g = 0.18 * np.ones_like(f) + 0.35 * np.exp(-0.5 * (np.log2(np.maximum(f, 1) / 1500) / 1.2) ** 2)  # paper tooth + body
        for s, L, fc, glide in strokes:
            if s <= t < s + L:
                p = (t - s) / L
                speed = np.sin(np.pi * p) ** 0.6
                c = fc * (2 ** (glide * (p - 0.5)))
                g += speed * (np.exp(-0.5 * (np.log2(np.maximum(f, 1) / c) / 0.35) ** 2) + 0.6 * np.exp(-0.5 * (np.log2(np.maximum(f, 1) / (c * 1.9)) / 0.3) ** 2))
        g *= 1 / np.sqrt(1 + (500 / np.maximum(f, 1)) ** 4) / np.sqrt(1 + (f / 15000) ** 8)
        return g
    x = stft_shape(n, shape)
    x *= env_ad(n, 0.26, 0.02, 1.5)  # ~0.26 s rise, then a HARD stop (ref ends dead at 4.05 s)
    return norm(to_stereo(x, 0, 0))   # mono on purpose: measured side/mid = -inf


def whip(dur=0.25, lo=2400, tilt=-0.35, click=False):
    """Rectangular high-passed noise swipe. Measured (7 instances): 0.22-0.27 s, 3-15 kHz,
    flatness 0.88-0.92, ~15-20 ms attack, flat plateau, ~30 ms release, centred (no pan sweep)."""
    n = int(SR * dur)
    x = highpass(_noise(n), lo, 6)
    x = lowpass(x, 15000, 6)
    if tilt:
        x = _fft_filter(x, lambda f: (np.maximum(f, 1) / 6000) ** tilt)
    e = env_ad(n, 0.018, 0.03)
    e *= 1 + 0.08 * np.sin(2 * np.pi * 9 * _t(dur))   # slight flutter so it is not a test tone
    y = fade_edges(to_stereo(x * e, 0, 0.1))
    if click:
        # v2, measured on whips 3-5 (10 ms envelopes): a 20-30 ms broadband tick, 30-50 ms gap,
        # then the 0.24-0.26 s plateau, which stops dead 25-75 ms BEFORE the picture cut.
        m = int(SR * 0.025)
        tick = highpass(_noise(m), 1500, 2) * np.exp(-np.linspace(0, 5, m)) * 0.8
        y = np.concatenate([to_stereo(tick, 0, 0), np.zeros((int(SR * 0.045), 2)), y])
    return norm(y)


def whip_pair(gap=0.14, dur=0.25):
    """Whoosh - (visual whip frames) - whoosh. Measured at 46.64-46.90 / 47.05-47.31 around a
    3-frame visual whip at 46.92-47.00: the picture move sits in the 0.14 s gap."""
    a, b = whip(dur), whip(dur * 1.05, 3200)
    g = np.zeros((int(SR * gap), 2), np.float32)
    return norm(np.concatenate([a, g, b]))


def reverse_swell(dur=1.4):
    """Reverse-reverb bloom into the music downbeat. Measured: starts after a 0.25 s digital
    silence, energy rises 4.3 -> 5.4 s from <1 kHz upward, WIDE (side/mid +1.2 dB)."""
    n = int(SR * dur)
    t = _t(dur)

    def shape(tt, f):
        p = min(tt / dur, 1)
        cut = 120 * (9 ** p)
        return (1 / np.sqrt(1 + (f / cut) ** 4)) * (1 / np.sqrt(1 + (30 / np.maximum(f, 1)) ** 4))
    L = stft_shape(n, shape)
    R = stft_shape(n, shape)
    subL = np.sin(2 * np.pi * 39 * t) * 0.35
    subR = np.sin(2 * np.pi * 41.5 * t + 1.3) * 0.35
    e = (t / dur) ** 2.4
    e[-int(SR * 0.03):] *= np.linspace(1, 0, int(SR * 0.03))
    return norm(np.stack([(L + subL) * e, (R + subR) * e], 1))


def lens_swell(dur=0.45):
    """Dark lens / magnifier arriving. v2 re-measured (sfx_validate): 0.45 s, 86-904 Hz (5-95% energy),
    flatness 0.83 (noise, no sub sine), onset with the lens edge entering, peak ~0.4 s later, centred."""
    n = int(SR * dur)
    x = bandpass(_noise(n), 90, 900, 3) + 0.12 * np.sin(2 * np.pi * 70 * _t(dur))
    return norm(fade_edges(to_stereo(x * env_ad(n, 0.32, 0.12, 2), 0, 0.2)))


def submerge(dur=0.6):
    """v2. Diving under water (ref 'underwater whoosh' 39.04-39.59 s): 345-2370 Hz, SLOW 0.45 s rise,
    fairly tonal (flatness 0.5: bubbles, not a splash), quick 0.12 s fall, nearly centred."""
    n = int(SR * dur)
    t = _t(dur)

    def shape(tt, f):
        p = min(tt / dur, 1)
        c = 500 * 2.6 ** p
        return np.exp(-0.5 * (np.log2(np.maximum(f, 1) / c) / 0.9) ** 2)
    x = stft_shape(n, shape) * 0.6
    for _ in range(14):
        d = _rng.uniform(0.02, 0.06)
        tb = _t(d)
        f = _rng.uniform(350, 900) * (1 + 1.8 * tb / d)
        b = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tb * 30)
        i = int(SR * _rng.uniform(0.05, dur - 0.08) ** 1.0)
        x[i: i + len(b)] += b * 0.5
    e = np.minimum((t / (dur * 0.75)) ** 2, 1) * np.where(t > dur - 0.12, (dur - t) / 0.12, 1)
    return norm(to_stereo(x * e, 0, 0.35))


def glass_shimmer(dur=1.6, notes_hz=(2093.0, 2637.0, 3136.0, 4186.0)):
    """Holographic-foil shimmer. Measured 14.32-15.95 s: partials 2095/2641/3118/4182 Hz
    (= C7-E7-G7-C8 major triad), 0.84 s swell in, 0.79 s out, partially wide.
    Pass notes in your key, e.g. Eb: (2489, 3136, 3729, 4978)."""
    n = int(SR * dur)
    t = _t(dur)
    L = np.zeros(n)
    R = np.zeros(n)
    for k, f in enumerate(notes_hz):
        trem = 1 + 0.35 * np.sin(2 * np.pi * (6.5 + 1.3 * k) * t + k)
        amp = [0.5, 1.0, 0.6, 0.25][k % 4]
        L += amp * trem * np.sin(2 * np.pi * f * 0.9985 * t + k)
        R += amp * trem * np.sin(2 * np.pi * f * 1.0015 * t + 2 * k)
    grains = bandpass(_noise(n), 2000, 9000, 2) * (0.25 + np.abs(np.sin(2 * np.pi * 11 * t)) ** 6) * 0.35
    e = env_ad(n, 0.84, 0.75, 1.6)
    return norm(np.stack([(L + grains) * e, (R + grains) * e], 1))


def sparkle(bursts=3, notes_hz=(2102, 2498, 4805, 5282)):
    """Glint on a held hero object. Measured 50.30-50.92 s: 3 bursts of 0.14-0.17 s, HP noise +
    glint tones 2.1/2.5/4.8/5.3 kHz, flatness 0.85-0.89."""
    parts = []
    for k in range(bursts):
        d = _rng.uniform(0.14, 0.17)
        n = int(SR * d)
        t = _t(d)
        x = highpass(_noise(n), 3500, 4) * 0.6
        for j, f in enumerate(notes_hz):
            x += 0.25 * np.sin(2 * np.pi * f * t + j) * np.exp(-t * 12)
        x *= env_ad(n, 0.01, 0.1)
        parts.append(to_stereo(x, _rng.uniform(-0.4, 0.4), 0.3))
        parts.append(np.zeros((int(SR * _rng.uniform(0.07, 0.11)), 2)))
    return norm(np.concatenate(parts))


def bird_chirps(count=4, spacing=0.33, f0=3600.0, step=-150.0):
    """Stylised bird tweets for a nature object. Measured 8.24/8.57/8.89/9.25 s: each 0.23 s,
    hook glide (start ~+300 Hz, falls in 50 ms, holds, lifts at the end), successive chirps step
    DOWN 3.6 -> 3.4 -> 3.27 -> 3.15 kHz, spacing 0.32-0.36 s (quarter-note triplets at 125 BPM),
    panned across the field (-5 .. +6 dB L/R)."""
    total = np.zeros((int(SR * (spacing * count + 0.3)), 2))
    for k in range(count):
        d = 0.23
        t = _t(d)
        base = f0 + step * k
        f = base + 320 * np.exp(-t / 0.018) + 120 * np.clip((t - 0.17) / 0.06, 0, 1)
        ph = 2 * np.pi * np.cumsum(f) / SR
        x = (np.sin(ph) + 0.18 * np.sin(2 * ph)) * env_ad(len(t), 0.008, 0.05)
        x *= 1 + 0.25 * np.sin(2 * np.pi * 38 * t)   # syrinx flutter
        x += bandpass(_noise(len(t)), base - 400, base + 600, 2) * 0.35 * env_ad(len(t), 0.008, 0.05)
        i = int(SR * k * spacing)
        total[i: i + len(t)] += to_stereo(x, [-0.5, 0.15, 0.1, 0.55][k % 4], 0.1)
    return norm(total)


def air_bed(dur=5.0, lo=4300, hi=6300):
    """v2. High 'air' bed under a nature / outdoor scene (ref 5.31-10.29 s): a sustained band of
    noise at 4.3-6.3 kHz, 2.1 s swell in, 2.9 s out, WIDE (side-mid +4.6 dB: decorrelated L/R)."""
    n = int(SR * dur)
    L = bandpass(_noise(n), lo, hi, 4)
    R = bandpass(_noise(n), lo, hi, 4)
    a, r = min(2.1, dur * 0.42), min(2.9, dur * 0.55)
    e = env_ad(n, a, r, 1.5) * (1 + 0.15 * np.sin(2 * np.pi * 0.23 * _t(dur)))
    return norm(np.stack([L * e, R * e], 1))


def wing_flutter(dur=0.4, rate=38):
    """Small-wing flutter ticks. Measured 7.24-7.64 s: 7-15 kHz clicks, flatness 0.9."""
    n = int(SR * dur)
    x = np.zeros(n)
    for s in np.arange(0, dur - 0.01, 1 / rate):
        i = int(s * SR)
        m = int(SR * 0.006)
        x[i: i + m] += _noise(m) * np.exp(-np.linspace(0, 6, m))
    x = highpass(x, 7000, 4) * env_ad(n, 0.18, 0.2)
    return norm(to_stereo(x, 0.2, 0.3))


def gull_cries(count=3, spacing=0.55):
    """Distant gull 'keow' calls for a coast object. Measured 33.5-35.8 s: hook-shaped harmonic
    chirps 1.8-6.5 kHz. Harmonic stack whose f0 rises then falls."""
    total = np.zeros((int(SR * (spacing * count + 0.6)), 2))
    for k in range(count):
        d = 0.42
        t = _t(d)
        f = 1900 + 500 * np.sin(np.pi * np.clip(t / d, 0, 1)) ** 0.7 - 300 * (t / d)
        ph = 2 * np.pi * np.cumsum(f) / SR
        x = sum(np.sin(h * ph) / h ** 1.3 for h in range(1, 4))
        x = bandpass(x * env_ad(len(t), 0.03, 0.2), 1500, 7000, 2)
        i = int(SR * k * spacing)
        total[i: i + len(t)] += to_stereo(x, -0.3 + 0.3 * k, 0.4) * (0.8 ** k)
    return norm(total)


def foghorn(dur=3.0, f0=126.0):
    """Low horn under a lighthouse-type scene. Measured 33.3-36.3 s: 126 Hz + harmonics 252/378,
    1.2 s rise, 1.8 s fall, centred."""
    n = int(SR * dur)
    t = _t(dur)
    x = sum(np.sin(2 * np.pi * f0 * h * t * (1 + 0.002 * np.sin(2 * np.pi * 0.7 * t))) / h ** 1.1 for h in range(1, 9))
    x = lowpass(x, 1100, 2) * env_ad(n, 1.2, 1.8, 1.4)
    return norm(to_stereo(x, 0, 0.15))


def rising_tone(dur=1.25, f_start=217.0, f_end=433.0):
    """Octave sweep into a cut. Measured 35.15-36.40 s: 217 -> 433 Hz, peak AT the cut."""
    t = _t(dur)
    f = f_start * (f_end / f_start) ** np.clip(t / (dur * 0.55), 0, 1)
    ph = 2 * np.pi * np.cumsum(f) / SR
    x = (np.sin(ph) + 0.3 * np.sin(2 * ph)) * env_ad(len(t), dur * 0.46, dur * 0.54, 1.5)
    return norm(to_stereo(x, 0, 0.25))


def air_riser(dur=0.8):
    """High air riser into a reveal. Measured 21.67-22.46 s: 5-15 kHz, peak 0.3 s in, centred."""
    n = int(SR * dur)

    def shape(tt, f):
        p = min(tt / dur, 1)
        c = 4000 * 3 ** p
        return np.exp(-0.5 * (np.log2(np.maximum(f, 1) / c) / 0.8) ** 2)
    x = stft_shape(n, shape) * env_ad(n, 0.3, 0.5, 1.4)
    return norm(to_stereo(x, 0, 0.3))


def low_wash(dur=1.1):
    """Muffled broadband wash for a foreground wipe (a column/pillar passing the lens).
    Measured 27.06-28.09 s: 300-3000 Hz, 0.8 s rise, quick fall."""
    n = int(SR * dur)
    x = bandpass(_noise(n), 220, 1900, 2) * env_ad(n, 0.8, 0.2, 1.3)
    return norm(to_stereo(x, 0, 0.5))


def splash(dur=0.6):
    """Underwater entry: two 0.5-4 kHz bursts ~0.1 s apart + a few bubbles. Measured 39.0-39.6 s."""
    n = int(SR * dur)
    x = np.zeros(n)
    for s in (0.0, 0.1):
        m = int(SR * 0.18)
        i = int(SR * s)
        x[i: i + m] += bandpass(_noise(m), 500, 4000, 2) * np.exp(-np.linspace(0, 5, m))
    for _ in range(7):
        d = _rng.uniform(0.02, 0.05)
        t = _t(d)
        f = _rng.uniform(300, 700) * (1 + 2.5 * t / d)
        b = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 40) * 0.3
        i = int(SR * _rng.uniform(0.15, dur - 0.06))
        x[i: i + len(b)] += b
    return norm(to_stereo(x, 0, 0.4))


def drop_impact(f0=38.9):
    """Music-drop boom (808 sub + click). Measured 51.42 s: 30-150 Hz, 0.06 s attack, 0.27 s
    release, +9 LU over the breakdown bed, centred."""
    d = 0.9
    t = _t(d)
    f = f0 + 110 * np.exp(-t * 28)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3.2)
    x += highpass(_noise(len(t)), 2000, 2) * np.exp(-t * 90) * 0.25
    return norm(fade_edges(to_stereo(np.tanh(1.6 * x), 0, 0)))


def door_knock(knocks=2, gap=0.22, dur=0.9):
    """Knuckles on a wooden door (original). Each knock: a 90-180 Hz thump plus a short knuckle click."""
    n = int(SR * dur)
    x = np.zeros(n)
    for k in range(knocks):
        s = int(SR * (0.02 + k * gap))
        t = _t(0.25)
        f = 95.0 + 85.0 * np.exp(-t * 40)
        thump = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 22)
        click = bandpass(_noise(len(t)), 900, 4000, 2) * np.exp(-t * 160) * 0.35
        seg = (thump + click)[: max(0, n - s)]
        x[s : s + len(seg)] += seg
    return norm(fade_edges(to_stereo(np.tanh(1.4 * x), 0, 0.1)))


def door_swing(dur=0.7):
    """A door leaf swinging open: a soft low air sweep that rises and settles (original)."""
    t = _t(dur)
    x = lowpass(_noise(len(t)), 900, 2) * env_ad(len(t), 0.25, 0.45, 1.4)
    x += np.sin(2 * np.pi * (60 + 25 * t / dur) * t) * np.exp(-t * 4) * 0.25
    return norm(fade_edges(to_stereo(x, 0, 0.3)))


def card_clink(dur=0.6):
    """Metal card set down (original, for our card film). Inharmonic partials, short ring."""
    t = _t(dur)
    ratios = [1.0, 2.76, 5.40, 8.93]
    x = sum(np.sin(2 * np.pi * 1850 * r * t) * np.exp(-t * (6 + 5 * k)) / (k + 1) for k, r in enumerate(ratios))
    x += highpass(_noise(len(t)), 3000, 2) * np.exp(-t * 120) * 0.4
    return norm(to_stereo(x, 0, 0.2))


def jet_pass(dur=2.4):
    """Distant aircraft pass for a flights beat (original). Filtered noise, doppler-falling band."""
    n = int(SR * dur)

    def shape(tt, f):
        p = tt / dur
        c = 1800 * 2 ** (-1.2 * (p - 0.5))
        return np.exp(-0.5 * (np.log2(np.maximum(f, 1) / c) / 1.1) ** 2)
    x = stft_shape(n, shape) * env_ad(n, 1.1, 1.2, 1.3)
    pan = np.linspace(-0.6, 0.6, n)
    th = (pan + 1) * np.pi / 4
    return norm(np.stack([np.cos(th) * x, np.sin(th) * x], 1))


def paper_flick(dur=0.3):
    """Banknote / paper flick (for a bill or ticket moving). Broadband 1-12 kHz, crinkle grains."""
    n = int(SR * dur)
    grains = np.convolve((_rng.random(n) < 0.02).astype(np.float64), np.hanning(96), "same")  # crinkle grains, no single-sample steps
    x = bandpass(_noise(n), 1000, 12000, 2) * (0.4 + np.minimum(grains, 1.0) * 1.6)
    return norm(fade_edges(to_stereo(x * env_ad(n, 0.02, 0.2, 1.2), 0, 0.2)))


def chord_bloom(dur=0.62, root_hz=155.56, rise=0.36):
    """v2. Logo-moment bloom (ref 'logo ring swell' 61.88-62.47 s, under the expanding ring): a
    pitched chord IN KEY, partials 155/232/310/620/700/937/1255/1387 Hz = Eb3 Bb3 Eb4 Eb5 F5 Bb5 Eb6 F6
    (root, 5th, 9th: an Eb5add9 voicing), swelling 0.36 s like reversed reverb then falling 0.24 s.
    root_hz = key root in octave 3 (Eb3 = 155.56)."""
    t = _t(dur)
    ratios = [1, 1.4983, 2, 4, 4.4898, 5.9932, 8, 8.9797]
    amps = [1.0, 0.5, 1.1, 0.7, 0.7, 0.6, 0.6, 0.55]
    L = sum(a * np.sin(2 * np.pi * root_hz * r * 0.999 * t + k) for k, (r, a) in enumerate(zip(ratios, amps)))
    R = sum(a * np.sin(2 * np.pi * root_hz * r * 1.001 * t + 2 * k) for k, (r, a) in enumerate(zip(ratios, amps)))
    air = bandpass(_noise(len(t)), 1500, 9000, 2) * 0.25
    e = np.where(t < rise, (t / rise) ** 2.5, np.exp(-(t - rise) / ((dur - rise) / 2.5)))
    e[-int(SR * 0.02):] *= np.linspace(1, 0, int(SR * 0.02))
    return norm(np.stack([(L + air) * e, (R + air) * e], 1))


def desk_bell(root_hz=1244.5, dur=1.4):
    """v2, ORIGINAL (not in the reference) object signature for a hotels beat: reception desk bell
    'ding', tuned to the key root (Eb6) with bell partials 2.0/2.76/5.4 and a 6 ms strike click."""
    t = _t(dur)
    parts = [(1.0, 1.0, 2.2), (2.0, 0.35, 3.5), (2.76, 0.3, 4.5), (5.4, 0.12, 7.0)]
    x = sum(a * np.sin(2 * np.pi * root_hz * r * t + k) * np.exp(-t * d) for k, (r, a, d) in enumerate(parts))
    m = int(SR * 0.006)
    x[:m] += highpass(_noise(m), 3000, 2) * 0.6
    x *= 1 + 0.04 * np.sin(2 * np.pi * 5.5 * t)
    return norm(fade_edges(to_stereo(x, 0, 0.25)))


def end_bell(dur=2.2, root_hz=1244.5, echoes=True):
    """v2. Closing bell chord + 8th-note echoes. Re-measured on the mix 66.95-69 s: partials
    1040/1246/1402/1562 Hz (= C6 Eb6 F6 G6: 6th, root, 9th, 3rd of Eb, i.e. an Eb6/9 colour IN KEY)
    plus a 3.9 kHz partial; tail decays -11.6 dB/s with echo bumps every 0.24-0.5 s.
    root_hz = the key root in octave 6 (Eb6 = 1244.5)."""
    t = _t(dur)
    ratios = [0.8409, 1.0, 1.1225, 1.2599, 3.143]
    amps = [0.9, 1.0, 0.6, 0.55, 0.25]
    x = sum(a * np.sin(2 * np.pi * root_hz * r * t + k) * np.exp(-t * (1.34 + 0.5 * k)) for k, (r, a) in enumerate(zip(ratios, amps)))
    x *= env_ad(len(t), 0.004, 0.3)
    y = to_stereo(x, 0, 0.3)
    if echoes:
        y = delay_tail(y, 0.24, 0.42, 6)
    return norm(y)


def end_riser(dur=0.95):
    """Riser that lands on the closing bell. v2 re-measured 66.22-67.16 s: 4.0-6.8 kHz (5-95%),
    half tonal (flatness 0.48), so noise band + a rising sine pair; ends abruptly on the bell."""
    n = int(SR * dur)
    t = _t(dur)

    def shape(tt, f):
        p = min(tt / dur, 1)
        return np.exp(-0.5 * (np.log2(np.maximum(f, 1) / (4200 * 1.45 ** p)) / 0.3) ** 2)
    x = stft_shape(n, shape)
    fr = 4300 * 1.4 ** (t / dur)
    x = x * 0.7 + 0.35 * (np.sin(2 * np.pi * np.cumsum(fr) / SR) + np.sin(2 * np.pi * np.cumsum(fr * 1.26) / SR)) * np.std(x)
    x *= (np.linspace(0, 1, n) ** 2.2)
    x[-int(SR * 0.02):] *= np.linspace(1, 0, int(SR * 0.02))
    return norm(to_stereo(x, 0, 0.3))


SFX = {k: v for k, v in globals().items() if callable(v) and v.__module__ == __name__ and not k.startswith("_")
       and k not in ("bandpass", "highpass", "lowpass", "stft_shape", "env_ad", "fade_edges", "to_stereo", "norm", "delay_tail", "make", "parse", "write_wav", "main")}


def make(name, **kw):
    if name not in SFX:
        raise SystemExit(f"Unknown sfx {name}: {', '.join(SFX)}")
    return SFX[name](**kw).astype(np.float32)


def parse(token):
    name, _, arg = token.partition(":")
    if not arg:
        return make(name)
    first = SFX[name].__code__.co_varnames[0]
    return make(name, **{first: float(arg)})


def write_wav(path, x, rate=SR):
    x = np.clip(np.asarray(x), -1, 1)
    if x.ndim == 1:
        x = np.stack([x, x], 1)
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(rate)
        w.writeframes((x * 32767).astype("<i2").tobytes())


def main(argv):
    if not argv or "--list" in argv:
        for k, v in SFX.items():
            print(f"{k:14s} {(v.__doc__ or '').strip().splitlines()[0]}")
        return
    out = argv[argv.index("--out") + 1] if "--out" in argv else "."
    os.makedirs(out, exist_ok=True)
    names = list(SFX) if "--all" in argv else [a for a in argv if not a.startswith("--") and a != out]
    for tok in names:
        p = os.path.join(out, tok.replace(":", "-") + ".wav")
        write_wav(p, parse(tok))
        print(p)


if __name__ == "__main__":
    main(sys.argv[1:])
