"""Pro-level check for a finished film: flow (motion) and sound (mix), measured from the MP4.

    python3 -I tools/film_qa.py out/video.mp4 [--ref refs/sarvam.mp4 ...] [--json]

Catches what made earlier films look "basic" and sound abrupt. Thresholds come from
docs/research/pro-film-rules.md: measured on Sarvam's own product films (Saaras V4, Voice
agents, Content Studio) and the sound-design rulebook (EBU R128 s1, Spotify/YouTube loudness,
ITU-R BT.1359 sync window, ducking/edge-fade practice).

FLOW
  still frames      share of frames with almost no change (refs 27-56%; v3 was 84%: "frozen")
  longest still     longest run of near-still frames (refs <= 7 s, usually 2.5-5.5 s)
  motion            median frame-to-frame change (refs 0.0014-0.0065)
  empty frames      frames with (almost) nothing on screen outside the very start / end
SOUND
  loudness          integrated -14 LUFS +/- 1, true peak <= -1 dBTP
  silence gaps      bed under -50 dB for > 300 ms before the outro (refs: < 1% silence)
  hit prominence    how far sound onsets jump above the bed (refs +2..+6 dB median; > 7 dB = SFX
                    stick out, the "abrupt" feel)
  frame-0 slam      very loud first 100 ms
  hard stop         audio cut off at the end (no tail)
  edge clicks       sudden sample jumps (unfaded clip edges)
"""

import argparse
import json
import subprocess
import sys

import numpy as np


def frames(path, fps=10, w=160, h=90):
    r = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-vf", f"fps={fps},scale={w}:{h}", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True)
    return np.frombuffer(r.stdout, np.uint8).reshape(-1, h, w, 3).astype(np.float32) / 255


def audio(path, sr=44100):
    r = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(sr), "-f", "f32le", "-"], capture_output=True)
    return np.frombuffer(r.stdout, np.float32), sr


def loudness(path):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", path, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True)
    out = r.stderr
    I = tp = None
    for line in out.splitlines()[::-1]:
        line = line.strip()
        if line.startswith("I:") and I is None:
            I = float(line.split()[1])
        if line.startswith("Peak:") and tp is None:
            tp = float(line.split()[1])
    return I, tp


def measure(path):
    a = frames(path)
    n = len(a)
    lum = a.mean(3)
    bg = np.median(lum.reshape(n, -1), axis=1)[:, None, None]
    sat = a.max(3) - a.min(3)
    ink = ((np.abs(lum - bg) > 0.06) | (sat > 0.18)).reshape(n, -1).mean(1)
    mot = np.r_[0, np.abs(np.diff(lum, axis=0)).reshape(n - 1, -1).mean(1)]
    still = mot < 0.002
    run = best = 0
    for st in still:
        run = run + 1 if st else 0
        best = max(best, run)
    inner = slice(int(n * 0.05), int(n * 0.95))
    x, sr = audio(path)
    hop = sr // 100
    m = len(x) // hop
    rms = np.sqrt(np.mean(x[: m * hop].reshape(m, hop) ** 2, axis=1) + 1e-12)
    db = 20 * np.log10(rms + 1e-9)
    # silence gaps (before the last 1.5 s outro)
    body = db[: max(1, m - 150)]
    gap = longest = 0
    for v in body:
        gap = gap + 1 if v < -50 else 0
        longest = max(longest, gap)
    # onset prominence over a running bed (1 s median)
    k = 100
    bed = np.array([np.median(db[max(0, i - k): i + 1]) for i in range(m)])
    flux = np.r_[0, np.diff(db)]
    thr = np.percentile(flux, 97)
    on = [i for i in range(1, m - 1) if flux[i] > thr and flux[i] >= flux[i - 1] and flux[i] >= flux[i + 1] and db[i] > -40]
    prom = [db[min(m - 1, i + 3)] - bed[max(0, i - 2)] for i in on]
    # sample-jump clicks
    d = np.abs(np.diff(x))
    local = np.sqrt(np.convolve(x ** 2, np.ones(441) / 441, "same"))[1:] + 1e-4
    clicks = int(np.sum((d > 0.25) & (d > 8 * local)))
    I, tp = loudness(path)
    return {
        "duration": round(n / 10, 1),
        "still_pct": round(float(still.mean() * 100), 1),
        "longest_still_s": round(best / 10, 1),
        "motion_median": round(float(np.median(mot)), 4),
        "empty_pct": round(float((ink[inner] < 0.004).mean() * 100), 1),
        "lufs": I,
        "true_peak": tp,
        "longest_silence_ms": int(longest * 10),
        "onsets_per_s": round(len(on) / (m / 100), 2),
        "hit_prominence_db": round(float(np.median(prom)), 1) if prom else None,
        "first_100ms_db": round(float(db[:10].max()), 1),
        "tail_drop_db": round(float(db[-30:-20].mean() - db[-3:].mean()), 1) if m > 40 else 0.0,
        "clicks": clicks,
    }


RULES = [
    ("still_pct", lambda v: v <= 60, "too many frozen frames (refs 27-56%): keep something drifting, breathing or morphing on every hold"),
    ("longest_still_s", lambda v: v <= 6, "a hold longer than 6 s with nothing moving"),
    ("motion_median", lambda v: v >= 0.0012, "overall motion far below the references (0.0014-0.0065): add camera drift, parallax, morphs"),
    ("empty_pct", lambda v: v <= 3, "empty frames mid-film: scenes fade to nothing instead of handing over"),
    ("lufs", lambda v: v is not None and -15 <= v <= -13, "integrated loudness off -14 LUFS +/- 1"),
    ("true_peak", lambda v: v is not None and v <= -1.0, "true peak above -1 dBTP"),
    ("longest_silence_ms", lambda v: v <= 300, "a silence gap > 300 ms: keep a continuous bed"),
    ("hit_prominence_db", lambda v: v is None or v <= 7, "sound hits jump > 7 dB above the bed (refs +2..+6): SFX stick out, the mix feels abrupt"),
    ("first_100ms_db", lambda v: v <= -14, "frame-0 slam: very loud first 100 ms"),
    ("tail_drop_db", lambda v: v <= 30, "audio stops dead at the end: let it ring out / fade"),
    ("clicks", lambda v: v == 0, "sample clicks: unfaded clip edges"),
]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("--ref", nargs="*", default=[])
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()
    res = measure(a.video)
    refs = {r: measure(r) for r in a.ref}
    if a.json:
        print(json.dumps({"video": res, "refs": refs}, indent=1))
        return
    fails = 0
    print(f"Film QA · {a.video} · {res['duration']} s")
    for key, ok, msg in RULES:
        v = res[key]
        good = ok(v)
        fails += not good
        refv = "  refs: " + ", ".join(str(r[key]) for r in refs.values()) if refs else ""
        print(f"  {'✔' if good else '✖'} {key:20s} {str(v):>8s}{refv}{'' if good else '   → ' + msg}")
    print("✔ pro-level checks passed" if not fails else f"✖ {fails} check(s) failed")
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
