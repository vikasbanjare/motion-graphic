#!/usr/bin/env python3
"""
Build storyboard pages from a rendered film: one panel per key frame, with
shot number, timecode and the action/copy/SFX notes from STORYBOARD_C.json.

  python3 scripts/storyboard-boards.py out/Master16x9.mp4 docs/storyboard
Writes docs/storyboard/board-01.png … (3×2 panels per page) and a contact sheet.
"""
import json, os, subprocess, sys, textwrap

video, outdir = sys.argv[1], sys.argv[2]
os.makedirs(outdir, exist_ok=True)
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
panels = json.load(open(os.path.join(root, "docs", "STORYBOARD_C.json")))["panels"]
font = subprocess.run(["fc-match", "-f", "%{file}", "Open Sans:bold"], capture_output=True, text=True).stdout or "DejaVuSans-Bold.ttf"
font_r = subprocess.run(["fc-match", "-f", "%{file}", "Open Sans"], capture_output=True, text=True).stdout or "DejaVuSans.ttf"

def esc(s):
    return s.replace("\\", "\\\\").replace(":", "\\:").replace("'", "’").replace("%", "\\%").replace(",", "\\,")

tmp = os.path.join(outdir, ".panels")
os.makedirs(tmp, exist_ok=True)
files = []
for i, p in enumerate(panels):
    t = p["frame"] / 30
    out = os.path.join(tmp, f"p{i:02d}.png")
    lines = []
    for label, key in (("ACTION", "action"), ("ON SCREEN", "copy"), ("SOUND", "sound")):
        for j, l in enumerate(textwrap.wrap(p.get(key, "—"), 70)[:3]):
            lines.append(((label + "  ") if j == 0 else "", l))
    draws = [
        f"drawbox=x=0:y=540:w=960:h=230:color=0xF8F3E7:t=fill",
        f"drawbox=x=0:y=0:w=960:h=770:color=0x0A3B70:t=3",
        f"drawtext=fontfile='{font}':text='{esc(p['shot'])}':x=18:y=556:fontsize=30:fontcolor=0xFF5400",
        f"drawtext=fontfile='{font}':text='{esc(p['title'])}':x=110:y=560:fontsize=24:fontcolor=0x0A3B70",
        f"drawtext=fontfile='{font_r}':text='{t:05.2f} s · f{p['frame']}':x=960-tw-18:y=562:fontsize=20:fontcolor=0x4C6476",
    ]
    y = 604
    for label, l in lines:
        if label:
            draws.append(f"drawtext=fontfile='{font}':text='{esc(label.strip())}':x=18:y={y}:fontsize=15:fontcolor=0xFF5400")
        draws.append(f"drawtext=fontfile='{font_r}':text='{esc(l)}':x=120:y={y}:fontsize=17:fontcolor=0x0A3B70")
        y += 22
    vf = f"scale=960:540,pad=960:770:0:0:color=0xF8F3E7," + ",".join(draws)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{t:.4f}", "-i", video, "-frames:v", "1", "-vf", vf, out], check=True)
    files.append(out)

per = 6
pages = [files[i : i + per] for i in range(0, len(files), per)]
for n, page in enumerate(pages, 1):
    while len(page) < per:
        page.append(page[-1] if False else None)
    inputs = []
    for f in page:
        inputs += ["-i", f] if f else ["-f", "lavfi", "-i", "color=c=0xF8F3E7:s=960x770"]
    layout = "0_0|960_0|1920_0|0_770|960_770|1920_770"
    subprocess.run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", f"xstack=inputs={per}:layout={layout}:fill=0xF8F3E7,pad=iw+60:ih+130:30:100:color=0xF8F3E7,drawtext=fontfile='{font}':text='MAPS GLOBAL MARKETS · US STOCKS · 30s — STORYBOARD  {n}/{len(pages)}':x=30:y=36:fontsize=34:fontcolor=0x0A3B70", "-frames:v", "1", os.path.join(outdir, f"board-{n:02d}.png")], check=True)
print(f"{len(files)} panels → {len(pages)} pages in {outdir}")
