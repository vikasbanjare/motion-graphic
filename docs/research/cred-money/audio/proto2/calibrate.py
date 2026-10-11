"""Level calibration: render the cue sheet, measure each cue's in-band rise over the 1 s before it
(the same metric measured on the reference), shift its over_bed_lu by (ref - ours), repeat.
    python3 -I calibrate.py cues.json ref.wav --iters 3 --out cues_calibrated.json
"""
import json, subprocess, sys, os
import numpy as np, soundfile as sf
from scipy.ndimage import uniform_filter1d
ABSOLUTE_ALL = "--rise" not in sys.argv
HERE = os.path.dirname(os.path.abspath(__file__))
# cue id -> (band lo, hi, event window on, off in s; absolute?)   windows = measured on the reference
W = {"C01": (1000, 15000, 0.54, 3.99, True), "C02b": (4300, 6300, 5.31, 10.29, True), "C02": (40, 2000, 4.23, 5.90, True), "C03": (7000, 15000, 7.24, 7.64, False),
     "C04": (3000, 4600, 8.23, 9.51, False), "C05": (40, 1200, 9.69, 10.43, False), "C06": (2300, 3400, 14.12, 16.62, False),
     "C07": (3000, 15000, 18.70, 18.93, False), "C08": (3000, 15000, 19.08, 19.30, False), "C09": (3000, 15000, 20.32, 20.45, False),
     "C09b": (3000, 15000, 20.49, 20.80, False), "C10": (5000, 15000, 21.53, 22.29, False), "C11": (300, 3000, 27.05, 28.60, False),
     "C12": (100, 250, 32.75, 36.40, False), "C13": (1800, 6500, 34.50, 35.80, False), "C14": (250, 600, 35.13, 36.40, False),
     "C15": (150, 8000, 39.04, 39.59, False), "C16": (3000, 9500, 42.58, 44.00, False), "C17": (3000, 15000, 46.67, 46.91, False),
     "C18": (3000, 15000, 47.04, 47.30, False), "C19": (3000, 15000, 48.02, 48.27, False), "C20": (3000, 15000, 49.30, 49.55, False),
     "C21": (4000, 15000, 50.24, 50.95, False), "C23": (3000, 15000, 56.12, 56.72, False), "C24": (1000, 15000, 61.88, 62.50, False),
     "C25": (4000, 11000, 66.21, 67.16, False), "C26": (1000, 1700, 66.92, 67.60, False)}


def bandcurve(x, sr, lo, hi, hop=128, nfft=2048):
    m = x.mean(1) if x.ndim == 2 else x
    n = 1 + (len(m) - nfft) // hop
    idx = np.arange(nfft)[None, :] + hop * np.arange(n)[:, None]
    F = np.abs(np.fft.rfft(m[idx] * np.hanning(nfft), axis=1)) ** 2
    f = np.fft.rfftfreq(nfft, 1 / sr)
    e = F[:, (f >= lo) & (f < hi)].sum(1)
    e = uniform_filter1d(e, max(1, int(0.02 * sr / hop)))
    return (np.arange(n) * hop + nfft / 2) / sr, 10 * np.log10(e + 1e-12)


def metric(x, sr, lo, hi, on, off, absolute):
    seg = x[int(max(0, on - 1.2) * sr): int((off + 0.1) * sr)]
    t, d = bandcurve(seg, sr, lo, hi)
    t += max(0, on - 1.2)
    pk = d[(t >= on) & (t <= off)].max()
    if absolute or ABSOLUTE_ALL:
        return pk
    return pk - np.median(d[(t >= on - 1.0) & (t < on)])


def rise_metric(x, sr, lo, hi, on, off):
    seg = x[int(max(0, on - 1.2) * sr): int((off + 0.1) * sr)]
    t, d = bandcurve(seg, sr, lo, hi)
    t += max(0, on - 1.2)
    return d[(t >= on) & (t <= off)].max() - np.median(d[(t >= on - 1.0) & (t < on)])


HYBRID = "--hybrid" in sys.argv


def main(a):
    sheet_p, ref_p = a[0], a[1]
    iters = int(a[a.index("--iters") + 1]) if "--iters" in a else 3
    out = a[a.index("--out") + 1]
    R, sr = sf.read(ref_p)
    ref = {k: metric(R, sr, *v) for k, v in W.items()}
    ref_rise = {k: rise_metric(R, sr, *v[:4]) for k, v in W.items()}
    sheet = json.load(open(sheet_p))
    base = os.path.dirname(os.path.abspath(sheet_p))
    for it in range(iters + 1):
        json.dump(sheet, open(out, "w"), indent=1)
        mixp = os.path.join(base, "calib_mix.wav")
        subprocess.run([sys.executable, "-I", os.path.join(HERE, "render_cues.py"), out, "--out", mixp, "--stems", os.path.join(base, "stems")], check=True, capture_output=True)
        Y, _ = sf.read(mixp)
        errs = []
        print(f"--- iteration {it}")
        for c in sheet["cues"]:
            if c["id"] not in W:
                continue
            ours = metric(Y, sr, *W[c["id"]])
            d = ref[c["id"]] - ours
            if HYBRID and not W[c["id"]][4]:
                # target = ref absolute in-band peak, but never pop less above OUR bed than the ref pops above its bed
                lo, hi, on, off, _ = W[c["id"]]
                ours_rise = rise_metric(Y, sr, lo, hi, on, off)
                ours_bed = ours - ours_rise
                d = max(ref[c["id"]], ours_bed + ref_rise[c["id"]]) - ours
            errs.append(abs(d))
            print(f"  {c['id']:5s} {c['sfx']:14s} ref {ref[c['id']]:+6.1f}  ours {ours:+6.1f}  diff {d:+5.1f}  (over_bed_lu {c.get('over_bed_lu', 0):+.1f}, floor {c.get('floor_lufs')})")
            if it < iters:
                step = float(np.clip(d, -12, 12))
                if W[c["id"]][4] or ABSOLUTE_ALL:
                    c["floor_lufs"] = round(c.get("floor_lufs", -40) + step, 1)
                else:
                    c["over_bed_lu"] = round(c.get("over_bed_lu", 0) + step, 1)
                    c["floor_lufs"] = round(c.get("floor_lufs", -40) + step, 1)
        print(f"  median |diff| {np.median(errs):.1f} dB, p90 {np.percentile(errs, 90):.1f} dB")


if __name__ == "__main__":
    main(sys.argv[1:])
