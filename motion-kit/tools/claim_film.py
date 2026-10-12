"""Claim film planner: a short spec (brand, claims, outro rows) -> timeline, cue sheet and score for <ClaimFilm>.

    python3 -I tools/claim_film.py specs/claim-film/lumen-demo.json

Writes public/claim-film/<slug>/plan.json, props.json (pass to Remotion), cues.json and score.wav, then prints the
still and render commands. Spec fields (only brand, claims and outro.rows are required):

  {
    "slug": "lumen-demo",                         # folder name; defaults to the file name
    "brand": {"name": "Lumen", "line": "the Lumen everyday card", "logo": "custom/lumen/logo.png"},
    "seconds": 24,                                # target length; the planner rounds to whole beats
    "key": "D",                                   # score key
    "unofficial": true,                           # prints a spec-work tag on the lockup
    "claims": [
      {"headline": "2% cashback", "sub": "on every bill",
       "subjects": ["plant", "flowers"],          # optional: keys from src/custom/claimfilm/models.json
       "palette": "green",                        # optional: green violet indigo lilac terra cream slate sea
       "camera": "push",                          # optional: push | orbit | crane
       "transition": "split"}                     # optional, how this claim enters: split | iris | wipe | dive
    ],
    "outro": {"title": "Lumen everyday card", "rows": ["2% cashback on every bill", "no annual fee"], "screen": "dark"}
  }

Claims must be real, approved wording: the planner copies them verbatim and never invents copy.
"""

import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
FPS = 24
BEAT = 12  # frames per beat: 120 BPM at 24 fps
OPEN, OUTRO, LOCKUP = 60, 96, 72

WORLDS = {
    "green": {"paper": "#e3ead0", "field": "#b9bdae", "grad": ["#2b4512", "#4f7a24", "#2f7a4a"]},
    "violet": {"paper": "#e9e4f6", "field": "#c9c0e6", "grad": ["#3b23a0", "#6a4fd0", "#2f4aa0"]},
    "indigo": {"paper": "#d6d0ea", "field": "#b7b0d6", "grad": ["#26238a", "#5a4fc0", "#2a6aa0"]},
    "lilac": {"paper": "#ece6f6", "field": "#cfc6ec", "grad": ["#3d2f7a", "#7a63c4", "#4a3fa0"]},
    "terra": {"paper": "#f1d9c6", "field": "#e2b9a2", "grad": ["#8a2a1e", "#c2553c", "#7a3a8a"]},
    "cream": {"paper": "#f3e7cf", "field": "#e3cfa3", "grad": ["#6a4413", "#a8742c", "#7a4a1a"]},
    "slate": {"paper": "#dfe4e0", "field": "#c3cbc8", "grad": ["#1b2126", "#3e4a52", "#2a3a44"]},
    "sea": {"paper": "#dceeea", "field": "#b6d6d0", "grad": ["#0f3b44", "#2f7f86", "#1f5a70"]},
}
PALETTE_ORDER = ["green", "indigo", "terra", "slate", "violet", "sea", "cream", "lilac"]
CAMERAS = ["push", "orbit", "crane"]
TRANSITIONS = ["split", "wipe", "dive", "iris"]
STYLES = ["groove", "drive"]


def pick_subjects(claim, models, used):
    if claim.get("subjects"):
        bad = [s for s in claim["subjects"] if s not in models]
        if bad:
            raise SystemExit(f"unknown subject(s) {bad}; choose from: {', '.join(k for k in models if not k.startswith('_'))}")
        return claim["subjects"][:3]
    words = set(re.findall(r"[a-z0-9]+", (claim["headline"] + " " + claim.get("sub", "")).lower()))
    scored = []
    for k, m in models.items():
        if k.startswith("_"):
            continue
        hits = sum(1 for g in m["good_for"] for w in g.split() if w in words)
        scored.append((hits, k not in used, k))
    scored.sort(reverse=True)
    best = [k for _, _, k in scored[:2]]
    return best


def plan(spec_path):
    spec = json.load(open(spec_path))
    slug = spec.get("slug") or os.path.splitext(os.path.basename(spec_path))[0]
    models = json.load(open(os.path.join(ROOT, "src/custom/claimfilm/models.json")))
    claims = spec["claims"]
    if not 1 <= len(claims) <= 6:
        raise SystemExit("a claim film takes 1-6 claims")
    n = len(claims)
    target = int(spec.get("seconds", 24) * FPS)
    per = round((target - OPEN - OUTRO - LOCKUP) / n / BEAT) * BEAT
    per = max(72, min(144, per))
    t = OPEN
    out_claims, used = [], set()
    for i, c in enumerate(claims):
        subj = pick_subjects(c, models, used)
        used.update(subj)
        pal = c.get("palette") or PALETTE_ORDER[i % len(PALETTE_ORDER)]
        if pal not in WORLDS:
            raise SystemExit(f"unknown palette '{pal}'; choose from {', '.join(WORLDS)}")
        slots = [[0.3, 0, 0.6], [-2.3, 0, -0.5], [2.4, 0, -0.8]]
        subjects = []
        for j, k in enumerate(subj):
            m = models[k]
            subjects.append({
                "model": k, "file": m["file"], "size": m["size"], "clip": m.get("clip"), "keep": m.get("keep"),
                "drop": m.get("drop"), "foil": m.get("foil", 0.35 if j == 0 else 0), "pos": slots[j],
                "enter": t + 4 + j * BEAT,
            })
        out_claims.append({
            "from": t, "to": t + per, "headline": c["headline"], "sub": c.get("sub", ""), "palette": pal, **WORLDS[pal],
            "camera": c.get("camera") or CAMERAS[i % len(CAMERAS)],
            "transition": c.get("transition") or ("iris" if i == 0 else TRANSITIONS[(i - 1) % len(TRANSITIONS)]),
            "subjects": subjects,
        })
        t += per
    outro = {"from": t, "to": t + OUTRO, "title": spec["outro"].get("title", spec["brand"]["name"]),
             "rows": spec["outro"]["rows"][:4], "screen": spec["outro"].get("screen", "dark")}
    t += OUTRO
    lock = {"from": t, "to": t + LOCKUP}
    t += LOCKUP
    brand = spec["brand"]
    p = {
        "slug": slug, "fps": FPS, "frames": t, "brand": {"name": brand["name"], "line": brand.get("line", ""), "logo": brand.get("logo")},
        "unofficial": bool(spec.get("unofficial", True)), "open": {"from": 0, "to": OPEN}, "claims": out_claims,
        "outro": outro, "lockup": lock, "score": f"claim-film/{slug}/score.wav",
    }
    return p, spec


def cues(p, spec):
    secs = [{"name": "open", "from": 0, "to": OPEN, "beats": OPEN // BEAT, "style": "intro", "drums_from": 36}]
    ev = [{"at": round(i * 1.4, 1), "fx": "pen", "sec": 0.35, "gain": 0.8, "pan": -0.5 if i % 2 else 0.5} for i in range(10)]
    ev += [{"at": 25, "fx": "tick", "freq": 1800, "gain": 0.7}]
    for i, c in enumerate(p["claims"]):
        secs.append({"name": c["headline"], "from": c["from"], "to": c["to"], "beats": (c["to"] - c["from"]) // BEAT, "style": STYLES[i % 2]})
        ev += [
            {"at": c["from"], "fx": "swell", "sec": 0.5, "gain": 0.7},
            {"at": c["from"], "fx": "impact", "big": 0.6, "gain": 0.6},
            {"at": c["from"] - 12, "fx": "whoosh", "sec": 1.0, "lo": 400, "hi": 4000, "gain": 0.6, "pan": 0.3 if i % 2 else -0.3},
            {"at": c["from"] + 18, "fx": "sparkle", "sec": 0.9, "base": 86, "gain": 0.3},
        ]
        ev += [{"at": s["enter"], "fx": "pop", "freq": 330 + 60 * j, "gain": 0.7, "pan": 0.2} for j, s in enumerate(c["subjects"])]
    o, lk = p["outro"], p["lockup"]
    secs.append({"name": "outro", "from": o["from"], "to": o["to"], "beats": OUTRO // BEAT, "style": "groove", "quiet": [[o["to"] - 18, o["to"]]]})
    secs.append({"name": "lockup", "from": lk["from"], "to": lk["to"], "beats": LOCKUP // BEAT, "style": "end"})
    ev += [{"at": o["from"], "fx": "impact", "big": 0.6, "gain": 0.7}, {"at": o["from"] + 4, "fx": "whoosh", "sec": 0.9, "lo": 300, "hi": 2200, "gain": 0.6},
           {"at": o["from"] + 28, "fx": "click", "gain": 0.8}]
    ev += [{"at": o["from"] + 40 + i * 8, "fx": "tick", "freq": 2600, "gain": 0.5, "pan": 0.15} for i in range(len(o["rows"]))]
    ev += [{"at": o["to"] - 18, "fx": "riser", "until": o["to"], "gain": 0.6}, {"at": lk["from"], "fx": "swell", "sec": 0.5, "gain": 0.8},
           {"at": lk["from"], "fx": "impact", "big": 1.0, "gain": 0.9}]
    return {"title": p["brand"]["name"], "fps": FPS, "frames": p["frames"], "key": spec.get("key", "D"), "sections": secs, "events": ev}


TRANS_TEXT = {
    "iris": "opens in a circle from the previous shot",
    "split": "the previous shot splits open along a foil line, the new world is already in place",
    "wipe": "a diagonal wipe carries the camera's motion into the new world",
    "dive": "the camera dives into a foil flood and comes out in the new world",
}
CAM_TEXT = {"push": "slow push in", "orbit": "orbits the subjects", "crane": "cranes down from above"}


def secs(f):
    return f"{f / FPS:.1f}s"


def storyboard(p, spec):
    """A readable storyboard (markdown) from the plan: what the user approves before any render."""
    L = [f"# {p['brand']['name']}: claim film storyboard", "",
         f"{p['frames']} frames at {FPS} fps = {p['frames'] / FPS:.1f} s. 1920 x 1080. Music: original score in {spec.get('key', 'D')}, 120 BPM, every cut on a beat.",
         "UNOFFICIAL SPEC WORK" if p["unofficial"] else "", "",
         "| # | Time | Shot | What happens | Into the next | Sound |", "|---|---|---|---|---|---|"]
    L.append(f"| 0 | 0.0-{secs(p['open']['to'])} | Opening | 13 pen lines race in from both edges while the camera pulls back; at 1.0 s they cut to a fine field of engraving lines; a disc in the first world's colour sweeps in from the right | {TRANS_TEXT[p['claims'][0]['transition']]} | bell arpeggio from frame one, pen swishes |")
    for i, c in enumerate(p["claims"], 1):
        subj = ", ".join(s["model"] for s in c["subjects"])
        hero = c["subjects"][0]["model"] if c["subjects"] else "-"
        nxt = TRANS_TEXT[p["claims"][i]["transition"]] if i < len(p["claims"]) else "the phone outro opens in a circle"
        L.append(f"| {i} | {secs(c['from'])}-{secs(c['to'])} | **{c['headline']}** / {c['sub']} | {c['palette']} world, engraved {subj} ({hero} is the hero, in foil), subjects pop in on the beat; camera {CAM_TEXT[c['camera']]}; headline lands at {secs(c['from'] + 14)} | {nxt} | impact + swell on entry, a pop per subject, sparkle on the headline |")
    o, lk = p["outro"], p["lockup"]
    rows = "; ".join(o["rows"])
    L.append(f"| {len(p['claims']) + 1} | {secs(o['from'])}-{secs(o['to'])} | Outro | white grid set; a phone rises and floats in 3D; {o['screen']} app screen with the product tile, \"{o['title']}\" and the claims ticking on ({rows}); brand name and line arrive word by word either side | the screen dims and the camera pushes into it | click, a tick per row, riser |")
    L.append(f"| {len(p['claims']) + 2} | {secs(lk['from'])}-{secs(lk['to'])} | Lockup | {'official logo file' if p['brand'].get('logo') else 'brand name set in type'} + \"{p['brand']['line']}\" on black, slow push and a light sweep | end | final chord, sub boom, tail to silence |")
    L += ["", "Approve or change: the subject for each claim, the wording, the order. Then stills, then the render."]
    return "\n".join(L) + "\n"


def main():
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    p, spec = plan(sys.argv[1])
    out = os.path.join(ROOT, "public/claim-film", p["slug"])
    os.makedirs(out, exist_ok=True)
    json.dump(p, open(os.path.join(out, "plan.json"), "w"), indent=1)
    json.dump({"plan": p}, open(os.path.join(out, "props.json"), "w"))
    c = cues(p, spec)
    json.dump(c, open(os.path.join(out, "cues.json"), "w"), indent=1)
    open(os.path.join(out, "storyboard.md"), "w").write(storyboard(p, spec))
    subprocess.run([sys.executable, "-I", os.path.join(HERE, "score_to_picture.py"), os.path.join(out, "cues.json"), "--out", os.path.join(out, "score")], check=True)
    rel = os.path.relpath(out, ROOT)
    print(f"\nstoryboard: {os.path.relpath(out, ROOT)}/storyboard.md")
    print(f"planned {p['slug']}: {p['frames']} frames ({p['frames'] / FPS:.1f}s), {len(p['claims'])} claims")
    for c_ in p["claims"]:
        print(f"  {c_['from']:>4}-{c_['to']:<4} {c_['headline']!r:34} {c_['palette']:7} {c_['camera']:6} enters by {c_['transition']:6} subjects: {', '.join(s['model'] for s in c_['subjects'])}")
    mids = [c_["from"] + 30 for c_ in p["claims"]] + [p["outro"]["from"] + 60, p["lockup"]["from"] + 30]
    print("\nstills (send these to the user first):")
    print(f"  npx remotion bundle --out-dir=/tmp/cf-bundle && for f in {' '.join(map(str, mids))}; do npx remotion still /tmp/cf-bundle ClaimFilm out/{p['slug']}-$f.png --frame=$f --props={rel}/props.json --gl=swangle; done")
    print("render:")
    print(f"  npx remotion render ClaimFilm out/{p['slug']}.mp4 --props={rel}/props.json --gl=swangle --concurrency=3")
    print(f"  python3 -I tools/motion_qa.py out/{p['slug']}.mp4 --frames {','.join(map(str, mids))}")


if __name__ == "__main__":
    main()
