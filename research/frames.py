"""Per-frame features for the research dataset: one CSV row per frame at 10 fps, numbers only.

For each video, ffmpeg decodes 10 frames per second at 160x90 and this script writes
<out>/<video-name>.csv.gz with these columns:

  t           seconds from the start
  luma        mean brightness 0-1
  contrast    brightness standard deviation 0-1
  dark, light share of pixels below 0.15 / above 0.85 brightness
  sat         mean saturation 0-1
  hue         dominant hue in degrees (saturated pixels only), -1 when the frame is grey
  hue_share   share of saturated pixels inside the dominant 30-degree hue bin
  colorful    Hasler-Suesstrunk colourfulness
  edges       share of pixels on an edge (text, UI and line art score high)
  motion      mean absolute change from the previous frame 0-1
  cut         1 when the frame starts a new shot (motion spike well above its neighbours)

Frames themselves are never stored; the CSVs are plain numbers.

    python3 research/frames.py <videos-dir> <out-dir>
"""
import csv
import gzip
import os
import subprocess
import sys

import numpy as np

W, H, FPS = 160, 90, 10


def frames(path):
    p = subprocess.Popen(
        ["ffmpeg", "-v", "error", "-nostdin", "-i", path, "-an", "-vf", f"fps={FPS},scale={W}:{H}", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
        stdout=subprocess.PIPE,
    )
    size = W * H * 3
    while True:
        buf = p.stdout.read(size)
        if len(buf) < size:
            break
        yield np.frombuffer(buf, np.uint8).reshape(H, W, 3).astype(np.float32) / 255.0
    p.wait()


def features(rgb, prev_luma):
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
    mx, mn = rgb.max(-1), rgb.min(-1)
    sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    # Hue in degrees for saturated, not-too-dark pixels.
    d = np.maximum(mx - mn, 1e-6)
    hue = np.where(mx == r, ((g - b) / d) % 6, np.where(mx == g, (b - r) / d + 2, (r - g) / d + 4)) * 60
    mask = (sat > 0.25) & (mx > 0.2)
    if mask.sum() > 0.02 * mask.size:
        hist = np.bincount((hue[mask] // 30).astype(int) % 12, minlength=12)
        top = int(hist.argmax())
        dom, share = top * 30 + 15, hist[top] / hist.sum()
    else:
        dom, share = -1, 0.0
    rg, yb = r - g, 0.5 * (r + g) - b
    colorful = np.sqrt(rg.std() ** 2 + yb.std() ** 2) + 0.3 * np.sqrt(rg.mean() ** 2 + yb.mean() ** 2)
    gx, gy = np.abs(np.diff(luma, axis=1))[:-1, :], np.abs(np.diff(luma, axis=0))[:, :-1]
    edges = ((gx + gy) > 0.12).mean()
    motion = float(np.abs(luma - prev_luma).mean()) if prev_luma is not None else 0.0
    return luma, [
        round(float(luma.mean()), 4), round(float(luma.std()), 4),
        round(float((luma < 0.15).mean()), 4), round(float((luma > 0.85).mean()), 4),
        round(float(sat.mean()), 4), int(dom), round(float(share), 4),
        round(float(colorful), 4), round(float(edges), 4), round(motion, 4),
    ]


def run(path, out):
    rows, prev = [], None
    for i, f in enumerate(frames(path)):
        prev, vals = features(f, prev)
        rows.append([round(i / FPS, 2), *vals])
    if not rows:
        return 0
    # A cut is a motion spike: above 0.12 and 3x the median of the surrounding second.
    m = np.array([row[10] for row in rows])
    for i, row in enumerate(rows):
        lo, hi = max(0, i - 5), min(len(m), i + 6)
        local = np.median(np.delete(m[lo:hi], i - lo)) if hi - lo > 1 else 0
        row.append(1 if m[i] > 0.12 and m[i] > 3 * local else 0)
    with gzip.open(out, "wt", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["t", "luma", "contrast", "dark", "light", "sat", "hue", "hue_share", "colorful", "edges", "motion", "cut"])
        w.writerows(rows)
    return len(rows)


def main():
    src, dst = sys.argv[1], sys.argv[2]
    os.makedirs(dst, exist_ok=True)
    for name in sorted(os.listdir(src)):
        if not name.endswith(".mp4"):
            continue
        n = run(os.path.join(src, name), os.path.join(dst, name[:-4] + ".csv.gz"))
        print(f"{name}: {n} frames")


if __name__ == "__main__":
    main()
