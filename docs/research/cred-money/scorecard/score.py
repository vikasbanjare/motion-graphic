"""Similarity scorecard: measure a film with the same methods used on the CRED reference.

    python3 -I score.py film.mp4 [--shots shots.json] [--json out.json] [--film-qa path/to/film_qa.py]

Measures (all on a 640x360 / 320x180 / 160x90 downscale so 1080p renders compare with the 360p ref):
  flow      still %, longest still, motion median (film_qa.py-compatible: 10 fps, 160x90, still < 0.002)
  cuts      single-frame spikes in luma MAD (native fps, 160x90) + histogram distance; ASL, median shot
  palette   per shot: Lab PCA axis-1 share, ink (darkest 5%) / paper (lightest 5%), saturated share,
            CIEDE2000 vs a target ink/paper if --shots gives one
  screen    per shot: line-screen period (px at 640x360) and angle (deg, 45 = '/') from 64x64 FFT tiles
  lens      per shot: share of frames with a dark circular vignette, circle centre, R50/W, 10-90 feather/H
  camera    per shot: Farneback + RANSAC similarity at 12 fps: peak zoom %/s, peak pan %W/s, roll deg/s
  sound     LUFS-I, LRA, true peak (ffmpeg ebur128) + film_qa onsets/s and hit prominence

shots.json: [{"name": "S1", "start": 0, "end": 1.75, "ink": "#29282c", "paper": "#d8d8d8"}, ...]
Nothing is written except the optional --json file.
"""
import argparse, importlib.util, json, math, subprocess, sys
import numpy as np
import cv2
from skimage.color import rgb2lab, deltaE_ciede2000


def probe(path):
    r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                        "stream=r_frame_rate,width,height:format=duration", "-of", "json", path],
                       capture_output=True, text=True)
    j = json.loads(r.stdout)
    num, den = j["streams"][0]["r_frame_rate"].split("/")
    return float(num) / float(den), float(j["format"]["duration"])


def decode(path, w, h, fps=None, grey=False):
    vf = (f"fps={fps}," if fps else "") + f"scale={w}:{h}:flags=area"
    pix = "gray" if grey else "rgb24"
    r = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-vf", vf, "-f", "rawvideo", "-pix_fmt", pix, "-"],
                       capture_output=True)
    a = np.frombuffer(r.stdout, np.uint8)
    return a.reshape(-1, h, w) if grey else a.reshape(-1, h, w, 3)


def hexs(rgb):
    rgb = np.clip(np.round(np.asarray(rgb) * 255), 0, 255).astype(int)
    return "#%02x%02x%02x" % tuple(rgb)


def hex2rgb(h):
    h = h.lstrip("#")
    return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], float) / 255


# ---------------- cuts ----------------
def cuts(path, fps):
    g = decode(path, 160, 90, grey=True).astype(np.float32) / 255
    n = len(g)
    d = np.r_[0, np.abs(np.diff(g, axis=0)).reshape(n - 1, -1).mean(1)]
    hist = np.stack([np.histogram(f, 32, (0, 1))[0] for f in g]).astype(np.float32)
    hist /= hist.sum(1, keepdims=True)
    hd = np.r_[0, [1 - np.sum(np.sqrt(hist[i] * hist[i - 1])) for i in range(1, n)]]
    mean = g.reshape(n, -1).mean(1)
    out = []
    for t in range(2, n - 2):
        # baseline excludes +-3 frames so 2-4 frame bursts (lens swaps, whips) still stand out
        nb = np.r_[d[max(1, t - 12):max(1, t - 3)], d[t + 4:t + 13]]
        hb = np.r_[hd[max(1, t - 12):max(1, t - 3)], hd[t + 4:t + 13]]
        base = max(np.median(nb) if len(nb) else 0, 0.004)
        hbase = max(np.median(hb) if len(hb) else 0, 0.01)
        local_max = d[t] >= d[t - 1] and d[t] >= d[t + 1]
        spike = d[t] > 0.015 and d[t] > 4.0 * base and local_max
        hspike = hd[t] > 0.12 and hd[t] > 5.0 * hbase and hd[t] >= hd[t - 1] and hd[t] >= hd[t + 1]
        if spike or hspike:
            out.append(t)
    # merge spikes closer than 0.25 s (lens swaps produce 2-3)
    merged = []
    for t in out:
        if merged and (t - merged[-1][-1]) / fps < 0.25:
            merged[-1].append(t)
        else:
            merged.append([t])
    times = [round(m[int(np.argmax([d[i] for i in m]))] / fps, 3) for m in merged]
    return times, d, n / fps


# ---------------- per-shot measures ----------------
def palette(frames):
    px = frames.reshape(-1, 3).astype(np.float32) / 255
    lab = rgb2lab(px.reshape(1, -1, 3)).reshape(-1, 3)
    keep = lab[:, 0] > 10  # drop lens black / letterbox
    if keep.mean() < 0.05:
        return None
    lab_k, px_k = lab[keep], px[keep]
    c = lab_k - lab_k.mean(0)
    ev = np.linalg.eigvalsh(np.cov(c.T))[::-1]
    L = lab_k[:, 0]
    lo, hi = np.percentile(L, 5), np.percentile(L, 95)
    ink = px_k[L <= lo].mean(0)
    paper = px_k[L >= hi].mean(0)
    hsv = cv2.cvtColor((px.reshape(1, -1, 3) * 255).astype(np.uint8), cv2.COLOR_RGB2HSV).reshape(-1, 3)
    sat = ((hsv[:, 1] > 90) & (hsv[:, 2] > 64)).mean()
    return {"axis1_share": round(float(ev[0] / ev.sum()), 3), "ink": hexs(ink), "paper": hexs(paper),
            "sat_share": round(float(sat), 3), "_ink": ink, "_paper": paper}


def screen(frames640):
    per, ang = [], []
    win = np.outer(np.hanning(64), np.hanning(64))
    fy = np.fft.fftfreq(64)[:, None]
    fx = np.fft.fftfreq(64)[None, :]
    fr = np.sqrt(fx ** 2 + fy ** 2)
    band = (fr >= 1 / 6.5) & (fr <= 1 / 1.95)
    for f in frames640:
        gry = cv2.cvtColor(f, cv2.COLOR_RGB2GRAY).astype(np.float32)
        hp = gry - cv2.GaussianBlur(gry, (0, 0), 3)
        for y in range(0, gry.shape[0] - 64, 32):
            for x in range(0, gry.shape[1] - 64, 32):
                t = hp[y:y + 64, x:x + 64]
                if t.std() < 3:
                    continue
                m = np.abs(np.fft.fft2(t * win)) * fr  # whiten the 1/f spectrum so the band edge does not win
                mb = np.where(band, m, 0)
                i = np.argmax(mb)
                pk = mb.flat[i]
                if pk < 6 * np.median(m[band]):
                    continue
                if fr.flat[i] <= 1 / 6.5 + 1e-3:  # peak sitting on the band edge = no real screen
                    continue
                ky, kx = fy.flat[i // 64 * 64] if False else fy[i // 64, 0], fx[0, i % 64]
                per.append(1 / math.hypot(kx, ky))
                # line direction is perpendicular to k; convert image y-down to y-up
                dx, dy = -ky, kx
                ang.append(math.degrees(math.atan2(-dy, dx)) % 180)
    if len(per) < 5:
        return {"tiles": len(per)}
    per, ang = np.array(per), np.array(ang)
    # dominant mode: 10-degree angle bins x 0.25 px period bins
    ab = np.round(ang / 10).astype(int) % 18
    pb = np.round(per / 0.25).astype(int)
    keys, counts = np.unique(np.c_[ab, pb], axis=0, return_counts=True)
    k = keys[np.argmax(counts)]
    sel = (np.abs(((ab - k[0] + 9) % 18) - 9) <= 1) & (np.abs(pb - k[1]) <= 1)
    a2 = np.radians(ang[sel] * 2)
    mode_ang = (math.degrees(math.atan2(np.sin(a2).mean(), np.cos(a2).mean())) / 2) % 180
    return {"tiles": int(len(per)), "mode_share": round(float(sel.mean()), 2),
            "period_px640": round(float(np.median(per[sel])), 2), "period_pctH": round(float(np.median(per[sel])) / 360 * 100, 3),
            "angle_deg": round(mode_ang, 1), "all_tiles_median_period": round(float(np.median(per)), 2)}


def lens(frames320):
    hits = []
    h, w = frames320.shape[1:3]
    for f in frames320:
        L = f.mean(2).astype(np.float32) / 255
        cb = int(0.08 * h)
        corners = np.mean([L[:cb, :cb].mean(), L[:cb, -cb:].mean(), L[-cb:, :cb].mean(), L[-cb:, -cb:].mean()])
        centre = L[h // 2 - cb:h // 2 + cb, w // 2 - cb:w // 2 + cb].mean()
        if not (corners < 0.08 and centre > 0.25):
            continue
        Ls = cv2.GaussianBlur(L, (0, 0), 1.5)
        inside = np.median(L[h // 2 - 2 * cb:h // 2 + 2 * cb, w // 2 - 2 * cb:w // 2 + 2 * cb])
        thr = 0.5 * (inside + corners)
        pts = []
        cx0, cy0 = w / 2, h / 2
        for k in range(72):
            th = 2 * math.pi * k / 72
            for r in np.arange(10, 1.2 * w, 0.5):
                x, y = cx0 + r * math.cos(th), cy0 + r * math.sin(th)
                if not (0 <= x < w - 1 and 0 <= y < h - 1):
                    break
                if Ls[int(y), int(x)] < thr:
                    pts.append((x, y))
                    break
        if len(pts) < 12:
            continue
        P = np.array(pts)
        A = np.c_[2 * P, np.ones(len(P))]
        b = (P ** 2).sum(1)
        sol, *_ = np.linalg.lstsq(A, b, rcond=None)
        cx, cy = sol[0], sol[1]
        R = math.sqrt(sol[2] + cx ** 2 + cy ** 2)
        res = np.abs(np.hypot(P[:, 0] - cx, P[:, 1] - cy) - R).mean()
        # radial profile around the fitted centre -> 10-90 feather
        yy, xx = np.mgrid[0:h, 0:w]
        rr = np.hypot(xx - cx, yy - cy)
        prof = [L[(rr >= r) & (rr < r + 1)].mean() if np.any((rr >= r) & (rr < r + 1)) else np.nan for r in range(int(R * 0.6), int(R * 1.3))]
        prof = (np.array(prof) - corners) / max(inside - corners, 1e-3)
        rs = np.arange(int(R * 0.6), int(R * 1.3))
        try:
            r90 = rs[np.where(prof < 0.9)[0][0]]
            r10 = rs[np.where(prof < 0.1)[0][0]]
            feather = (r10 - r90) / h
        except IndexError:
            feather = float("nan")
        hits.append((cx / w, cy / h, R / w, feather, res, corners * 255))
    if not hits:
        return {"lens_frames": 0}
    H = np.array(hits)
    with np.errstate(all='ignore'):
        med = np.nanmedian(H, 0)
    return {"lens_frames": int(len(H)), "lens_share": round(len(H) / len(frames320), 2),
            "centre_pctW": round(med[0] * 100, 1), "centre_pctH": round(med[1] * 100, 1),
            "R50_over_W": round(med[2], 3), "feather_10_90_over_H": round(med[3], 3),
            "fit_residual_px320": round(med[4], 1), "outside_luma": round(med[5], 1)}


def camera(frames320, fps):
    rows = []
    prev = None
    for f in frames320:
        g = cv2.cvtColor(f, cv2.COLOR_RGB2GRAY)
        if prev is not None:
            flow = cv2.calcOpticalFlowFarneback(prev, g, None, 0.5, 4, 21, 3, 5, 1.1, 0)
            ys, xs = np.mgrid[4:g.shape[0] - 4:6, 4:g.shape[1] - 4:6]
            src = np.c_[xs.ravel(), ys.ravel()].astype(np.float32)
            dst = src + flow[ys.ravel(), xs.ravel()]
            M, inl = cv2.estimateAffinePartial2D(src, dst, method=cv2.RANSAC, ransacReprojThreshold=1.0)
            if M is not None:
                s = math.hypot(M[0, 0], M[1, 0])
                rot = math.degrees(math.atan2(M[1, 0], M[0, 0]))
                tx, ty = M[0, 2], M[1, 2]
                # translation of the frame centre
                cx, cy = g.shape[1] / 2, g.shape[0] / 2
                ccx = M[0, 0] * cx + M[0, 1] * cy + tx - cx
                ccy = M[1, 0] * cx + M[1, 1] * cy + ty - cy
                rows.append((math.log(s) * fps * 100, ccx / g.shape[1] * fps * 100, ccy / g.shape[0] * fps * 100, rot * fps, float(inl.mean())))
        prev = g
    if not rows:
        return {}
    R = np.array(rows)
    good = R[R[:, 4] > 0.5]
    if len(good) == 0:
        good = R
    pan = np.hypot(good[:, 1], good[:, 2])
    moving = (np.abs(good[:, 0]) > 0.5) | (pan > 1.0) | (np.abs(good[:, 3]) > 0.3)
    return {"zoom_p90_abs_pct_s": round(float(np.percentile(np.abs(good[:, 0]), 90)), 1),
            "zoom_median_abs_pct_s": round(float(np.median(np.abs(good[:, 0]))), 2),
            "zoom_net_pct": round(float((math.exp(good[:, 0].sum() / 100 / fps) - 1) * 100), 1),
            "pan_p90_pctW_s": round(float(np.percentile(pan, 90)), 1), "pan_median_pctW_s": round(float(np.median(pan)), 2),
            "roll_p90_abs_deg_s": round(float(np.percentile(np.abs(good[:, 3]), 90)), 2),
            "camera_moving_share": round(float(moving.mean()), 2), "inlier_median": round(float(np.median(R[:, 4])), 2)}


def ebur(path):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", path, "-af", "ebur128=peak=true", "-f", "null", "-"],
                       capture_output=True, text=True)
    I = LRA = TP = None
    for line in r.stderr.splitlines()[::-1]:
        s = line.strip()
        if s.startswith("I:") and I is None:
            I = float(s.split()[1])
        if s.startswith("LRA:") and LRA is None:
            LRA = float(s.split()[1])
        if s.startswith("Peak:") and TP is None:
            TP = float(s.split()[1])
    return {"lufs_i": I, "lra_lu": LRA, "true_peak_dbtp": TP}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("--shots")
    ap.add_argument("--json")
    ap.add_argument("--film-qa", default="/home/user/motion-graphic/motion-kit/tools/film_qa.py")
    ap.add_argument("--sample-fps", type=float, default=2.0)
    a = ap.parse_args()
    fps, dur = probe(a.video)
    out = {"video": a.video, "fps": round(fps, 3), "duration": round(dur, 2)}
    try:
        spec = importlib.util.spec_from_file_location("film_qa", a.film_qa)
        fq = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(fq)
        m = fq.measure(a.video)
        out["flow_sound_film_qa"] = {k: m[k] for k in ("still_pct", "longest_still_s", "motion_median", "onsets_per_s", "hit_prominence_db", "longest_silence_ms") if k in m}
    except Exception as e:  # noqa: BLE001
        out["flow_sound_film_qa"] = {"error": str(e)}
    out["loudness"] = ebur(a.video)
    ct, d, total = cuts(a.video, fps)
    bounds = [0.0] + ct + [total]
    lens_ = np.diff(bounds)
    out["cuts"] = {"times_s": ct, "count": len(ct), "asl_s": round(total / (len(ct) + 1), 2),
                   "median_shot_s": round(float(np.median(lens_)), 2), "longest_shot_s": round(float(lens_.max()), 2),
                   "cuts_per_10s": round(len(ct) / total * 10, 2)}
    if a.shots:
        shots = json.load(open(a.shots))
    else:
        shots = [{"name": f"shot{i + 1}", "start": bounds[i], "end": bounds[i + 1]} for i in range(len(bounds) - 1)]
    f640 = decode(a.video, 640, 360, fps=a.sample_fps)
    f320 = decode(a.video, 320, 180, fps=a.sample_fps)
    c320 = decode(a.video, 320, 180, fps=12)
    res = []
    for s in shots:
        i0, i1 = int(math.ceil(s["start"] * a.sample_fps + 0.25)), int(math.floor(s["end"] * a.sample_fps - 0.25)) + 1
        i0, i1 = max(0, i0), min(len(f640), i1)
        j0, j1 = int(s["start"] * 12) + 1, min(len(c320), int(s["end"] * 12))
        r = {"name": s["name"], "start": s["start"], "end": s["end"]}
        if i1 > i0:
            p = palette(f320[i0:i1])
            if p:
                if "ink" in s and "paper" in s:
                    lab = lambda c: rgb2lab(np.asarray(c, float).reshape(1, 1, 3)).reshape(3)
                    r["dE00_ink"] = round(float(deltaE_ciede2000(lab(p["_ink"]), lab(hex2rgb(s["ink"])))), 1)
                    r["dE00_paper"] = round(float(deltaE_ciede2000(lab(p["_paper"]), lab(hex2rgb(s["paper"])))), 1)
                r.update({k: v for k, v in p.items() if not k.startswith("_")})
            r["screen"] = screen(f640[i0:i1])
            r["lens"] = lens(f320[i0:i1])
        if j1 - j0 > 2:
            r["camera"] = camera(c320[j0:j1], 12)
        res.append(r)
    out["shots"] = res
    txt = json.dumps(out, indent=1)
    print(txt)
    if a.json:
        open(a.json, "w").write(txt + "\n")


if __name__ == "__main__":
    main()
