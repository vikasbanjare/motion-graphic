"""Render an SFX cue sheet over a music bed: each cue is placed by its alignment point and levelled
as 'LU over the bed' (momentary loudness, 400 ms), which is how the reference was measured.

    python3 -I render_cues.py cues.json --out mix.wav [--stems dir/]

cues.json:
{
  "seconds": 69.06, "lufs": -16.9,                       # integrated target for the final mix (null = keep)
  "music": {"file": "score.wav", "gain_db": 0},
  "cues": [
    {"id": "C07", "sfx": "whip", "params": {"dur": 0.25},
     "anchor": "whip 3 first frame", "anchor_t": 46.92,  # the visual event (measured or planned frame / fps)
     "align": "end", "offset": -0.02,                     # which point of the sound sits at anchor_t+offset
     "over_bed_lu": 1.0,                                  # target: SFX momentary max = bed (2 s before) + this
     "floor_lufs": -30,                                   # if the bed is near-silent, use this absolute level
     "pan": 0.0}
  ]
}
align: "start" | "peak" (loudest 50 ms) | "end".  Measured reference practice is in cue_rules.json.
"""

import json
import os
import sys
import wave

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from cred_sfx import SR, make  # noqa: E402
from cred_score import k_weight, limiter, lufs  # noqa: E402


def read_wav(p):
    with wave.open(p) as w:
        assert w.getframerate() == SR, f"{p}: need {SR} Hz"
        x = np.frombuffer(w.readframes(w.getnframes()), "<i2").astype(np.float32) / 32768
        return x.reshape(-1, w.getnchannels()) if w.getnchannels() == 2 else np.stack([x, x], 1)


def momentary(x):
    """Max momentary loudness (400 ms windows, 100 ms hop) of a stereo buffer."""
    y = k_weight(x)
    p = np.sum(y ** 2, axis=1)
    w, h = int(SR * 0.4), int(SR * 0.1)
    if len(p) < w:
        return -0.691 + 10 * np.log10(p.mean() + 1e-12)
    c = np.concatenate([[0], np.cumsum(p)])
    ms = (c[w::h] - c[:-w:h][: len(c[w::h])]) / w
    return -0.691 + 10 * np.log10(ms + 1e-12)


def main(argv):
    sheet = json.load(open(argv[0]))
    out = argv[argv.index("--out") + 1]
    stems = argv[argv.index("--stems") + 1] if "--stems" in argv else None
    base = os.path.dirname(os.path.abspath(argv[0]))
    n = int(SR * sheet["seconds"])
    bed = np.zeros((n, 2), np.float32)
    if sheet.get("music"):
        m = read_wav(os.path.join(base, sheet["music"]["file"]))[:n]
        bed[: len(m)] = m * 10 ** (sheet["music"].get("gain_db", 0) / 20)
    sfx_bus = np.zeros_like(bed)
    log = []
    for c in sheet["cues"]:
        x = make(c["sfx"], **c.get("params", {}))
        if c.get("pan"):
            th = (c["pan"] + 1) * np.pi / 4
            x = np.stack([x[:, 0] * np.cos(th) * 1.414, x[:, 1] * np.sin(th) * 1.414], 1)
        e = np.convolve(np.sum(x ** 2, 1), np.ones(int(SR * 0.05)), "same")
        pt = {"start": 0, "peak": int(np.argmax(e)), "end": len(x)}[c.get("align", "start")]
        t_at = c["anchor_t"] + c.get("offset", 0.0)
        i0 = int(round(t_at * SR)) - pt
        # level: bed loudness in the 2 s before the cue (median momentary), SFX max momentary
        a, b = max(0, i0 - 2 * SR), max(1, i0)
        bed_m = np.median(momentary(bed[a:b])) if b - a > SR // 2 else -70
        target = max(bed_m + c.get("over_bed_lu", 2.0), c.get("floor_lufs", -40))
        g = 10 ** ((target - momentary(x).max()) / 20)
        j0, k0 = max(0, i0), max(0, -i0)
        k1 = min(len(x), n - i0)
        if k1 > k0:
            sfx_bus[j0: j0 + (k1 - k0)] += g * x[k0:k1]
        log.append((c.get("id", c["sfx"]), c["sfx"], round(i0 / SR, 3), round((i0 + len(x)) / SR, 3), round(bed_m, 1), round(target, 1)))
    mix = bed + sfx_bus
    if sheet.get("lufs") is not None:
        mix *= 10 ** ((sheet["lufs"] - lufs(mix)) / 20)
    mix = limiter(mix)
    # v2: end like the reference: the film ends ~2.1 s after the end bell while its echo tail is ~-40 dBFS;
    # only a 10 ms edge fade (a long fade to zero reads as a dead stop in film_qa tail-drop)
    nf = int(SR * 0.01)
    mix[-nf:] *= np.linspace(1, 0, nf)[:, None]
    for p, y in [(out, mix)] + ([(os.path.join(stems, "sfx.wav"), sfx_bus), (os.path.join(stems, "music.wav"), bed)] if stems else []):
        os.makedirs(os.path.dirname(os.path.abspath(p)), exist_ok=True)
        with wave.open(p, "wb") as w:
            w.setnchannels(2)
            w.setsampwidth(2)
            w.setframerate(SR)
            w.writeframes((np.clip(y, -1, 1) * 32767).astype("<i2").tobytes())
    for r in log:
        print(f"{r[0]:5s} {r[1]:14s} {r[2]:7.3f}-{r[3]:7.3f}s  bed {r[4]:6.1f}  -> sfx {r[5]:6.1f} LUFS(M)")
    print("wrote", out)


if __name__ == "__main__":
    main(sys.argv[1:])
