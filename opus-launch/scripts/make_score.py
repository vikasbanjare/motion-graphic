"""Synthesise an original ambient score + transition whooshes for the launch video.

Writes public/audio/score.wav. Scene timing mirrors src/Main.tsx (SCENES + OVERLAP);
keep the two in sync if you retime scenes.

    pip install numpy && python3 scripts/make_score.py
"""

import os
import wave

import numpy as np

SR = 48000
FPS = 60
SCENE_SECS = [4.2, 3.8, 7.0, 5.6, 5.6, 4.8, 4.8, 4.2, 4.6]
OVERLAP = round(0.12 * FPS)

frames = [round(s * FPS) for s in SCENE_SECS]
starts = [0]
for d in frames[:-1]:
    starts.append(starts[-1] + d - OVERLAP)
TOTAL = (starts[-1] + frames[-1]) / FPS
cuts = [s / FPS for s in starts]  # scene start times in seconds

N = int(TOTAL * SR)
t_all = np.arange(N) / SR
rng = np.random.default_rng(7)


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def smoothstep(x):
    x = np.clip(x, 0, 1)
    return x * x * (3 - 2 * x)


def place(buf, start_s, sig):
    i = int(start_s * SR)
    j = min(N, i + sig.shape[1])
    if j > i:
        buf[:, i:j] += sig[:, : j - i]


def warm_voice(f, t, detune_cents=(-5, 0, 5), harmonics=9):
    out = np.zeros_like(t)
    for c in detune_cents:
        fc = f * 2 ** (c / 1200)
        phase = rng.uniform(0, 2 * np.pi)
        for k in range(1, harmonics + 1):
            if fc * k > 9000:
                break
            out += np.sin(2 * np.pi * fc * k * t + phase * k) / k * np.exp(-k / 3.2)
    return out / len(detune_cents)


def pad(chord, dur, attack=1.3, release=1.9, gain=0.05):
    L = int((dur + release) * SR)
    t = np.arange(L) / SR
    env = smoothstep(t / attack) * np.where(t < dur, 1.0, smoothstep(1 - (t - dur) / release))
    breathe = 1 + 0.12 * np.sin(2 * np.pi * 0.18 * t)
    left = np.zeros(L)
    right = np.zeros(L)
    for i, m in enumerate(chord):
        v = warm_voice(hz(m), t) * (0.8 if m < 45 else 1.0)
        pan = 0.5 + 0.35 * np.sin(i * 1.7)
        left += v * (1 - pan)
        right += v * pan
    return np.stack([left, right]) * env * breathe * gain


def shimmer(chord, dur, gain=0.012):
    L = int((dur + 1.5) * SR)
    t = np.arange(L) / SR
    env = smoothstep(t / 1.8) * np.where(t < dur, 1.0, smoothstep(1 - (t - dur) / 1.5))
    sig = np.zeros((2, L))
    for i, m in enumerate(chord[-3:]):
        trem = 0.6 + 0.4 * np.sin(2 * np.pi * (0.9 + 0.3 * i) * t + i)
        s = np.sin(2 * np.pi * hz(m + 12) * t) * trem
        sig[i % 2] += s
        sig[(i + 1) % 2] += 0.5 * s
    return sig * env * gain


def pluck(m, gain=0.16):
    L = int(2.0 * SR)
    t = np.arange(L) / SR
    f = hz(m)
    env = (1 - np.exp(-t / 0.004)) * np.exp(-t / 0.45)
    s = (np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t / 0.12)
         + 0.12 * np.sin(2 * np.pi * 3.01 * f * t) * np.exp(-t / 0.06))
    return np.stack([s, s]) * env * gain


def boom(m, gain=0.5, decay=1.4):
    L = int(3.0 * SR)
    t = np.arange(L) / SR
    f = hz(m) * (1 + 0.6 * np.exp(-t / 0.08))
    ph = 2 * np.pi * np.cumsum(f) / SR
    env = (1 - np.exp(-t / 0.006)) * np.exp(-t / decay)
    s = np.tanh(1.6 * np.sin(ph)) * env
    return np.stack([s, s]) * gain


def band_noise(L, lo, hi):
    n = rng.standard_normal(L)
    spec = np.fft.rfft(n)
    f = np.fft.rfftfreq(L, 1 / SR)
    mask = smoothstep((f - lo) / (lo * 0.6 + 1)) * smoothstep((hi - f) / (hi * 0.4))
    return np.fft.irfft(spec * mask, L)


def whoosh(peak_at, rise=0.6, fall=0.35, gain=0.08):
    L = int((rise + fall) * SR)
    t = np.arange(L) / SR
    low = band_noise(L, 150, 1800)
    high = band_noise(L, 1200, 9000)
    x = t / rise
    sweep = smoothstep(x)
    env = np.where(t < rise, x ** 2.2, np.exp(-(t - rise) / (fall / 3)))
    s = (low * (1 - sweep) + high * sweep) * env
    s /= np.max(np.abs(s)) + 1e-9
    wide = np.roll(s, int(0.011 * SR))
    return np.stack([s, 0.8 * s + 0.2 * wide]) * gain, peak_at - rise


def riser(end_at, dur=2.2, gain=0.07):
    L = int(dur * SR)
    t = np.arange(L) / SR
    n = band_noise(L, 500, 7000)
    n /= np.max(np.abs(n)) + 1e-9
    env = (t / dur) ** 3
    tone = np.sin(2 * np.pi * np.cumsum(hz(62) * (1 + t / dur)) / SR) * 0.35
    s = (n + tone) * env
    return np.stack([s, np.roll(s, 300)]) * gain, end_at - dur


def reverb(x, secs=3.2, wet=0.32):
    L = int(secs * SR)
    t = np.arange(L) / SR
    ir = np.stack([rng.standard_normal(L), rng.standard_normal(L)]) * np.exp(-t / (secs / 5.5))
    # darken the tail
    k = np.ones(24) / 24
    ir = np.stack([np.convolve(ch, k, mode="same") for ch in ir])
    ir /= np.sqrt(np.sum(ir ** 2, axis=1, keepdims=True))
    size = 1 << int(np.ceil(np.log2(x.shape[1] + L)))
    out = np.stack([np.fft.irfft(np.fft.rfft(x[c], size) * np.fft.rfft(ir[c], size), size)[: x.shape[1]]
                    for c in range(2)])
    return x * (1 - wet) + out * wet * 1.6


# --- Harmony: one chord per scene (D major, ambient voicings) ---
Dmaj9 = [38, 45, 54, 61, 64, 69]
Bm9 = [35, 42, 50, 57, 61, 66]
Gmaj9 = [43, 50, 59, 66, 69]
Asus = [45, 52, 59, 62, 66, 71]
chords = [None, Dmaj9, Bm9, Gmaj9, Asus, Bm9, Gmaj9, Asus, Dmaj9]

mix = np.zeros((2, N))

# Cold open: low drone that swells toward the title.
drone_dur = cuts[1] + 0.3
drone = pad([38, 45, 50], drone_dur, attack=1.6, release=1.0, gain=0.07)
place(mix, 0.0, drone)

# Pads per scene (EndCard holds to the end).
for i in range(1, len(cuts)):
    end = cuts[i + 1] if i + 1 < len(cuts) else TOTAL - 1.2
    dur = end - cuts[i] + 0.25
    place(mix, cuts[i] - 0.15, pad(chords[i], dur, gain=0.075))
    place(mix, cuts[i] + 0.4, shimmer(chords[i], dur))

# Cold open: a soft pluck as the headline lands, key ticks while the ask types, a chime on send.
place(mix, 0.2, pluck(69, gain=0.12))
for k in range(26):
    tick = pluck(96 + (k % 3), gain=0.025)
    tick[:, int(0.08 * SR):] = 0
    place(mix, 0.8 + k * (2.0 / 26), tick)
place(mix, 3.05, pluck(78, gain=0.1))

# Riser into the title, then a low hit when "Claude Opus 5.5" lands.
r, at = riser(cuts[1] + 0.45)
place(mix, at, r)
place(mix, cuts[1] + 0.45, boom(26, gain=0.26))
place(mix, cuts[1] + 0.45, pluck(81, gain=0.1))

# Soft whooshes into every later scene.
for i in range(2, len(cuts)):
    w, at = whoosh(cuts[i] + 0.05, gain=0.06)
    place(mix, at, w)

# End card: lighter hit + title chime.
place(mix, cuts[-1] + 0.3, boom(26, gain=0.18, decay=1.8))
place(mix, cuts[-1] + 0.35, pluck(74, gain=0.09))
place(mix, cuts[-1] + 0.55, pluck(81, gain=0.07))

mix = reverb(mix)

# Master: fades, gentle saturation, peak normalise to -1 dBFS.
fade_in = smoothstep(t_all / 0.25)
fade_out = smoothstep((TOTAL - t_all) / 1.6)
mix *= fade_in * fade_out
mix = np.tanh(mix * 1.3)
mix *= 10 ** (-1 / 20) / np.max(np.abs(mix))

os.makedirs("public/audio", exist_ok=True)
pcm = (np.clip(mix.T, -1, 1) * 32767).astype("<i2")
with wave.open("public/audio/score.wav", "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print(f"score.wav: {TOTAL:.2f}s, cuts at {[round(c, 2) for c in cuts]}")
