"""Storyboard (visual beats in frames) -> SFX cue sheet, using the rules measured on the reference.

    python3 -I make_cues.py storyboard.json --rules cue_rules.json --beats score.wav.beats.json --out cues.json
    python3 -I render_cues.py cues.json --out mix.wav --stems stems/

storyboard.json:
{
  "fps": 30, "seconds": 46, "lufs": -14, "music": "score.wav",
  "beats": [
    {"type": "draw_open", "frame": 10, "end_frame": 92, "label": "first engraved line"},
    {"type": "reveal", "frame": 138, "label": "world reveal completes"},
    {"type": "whip_cut", "frame": 435, "answer": true},
    {"type": "hotels", "frame": 735},
    {"type": "text_entrance", "frame": 300}            # allowed: produces NO cue, on purpose
  ]
}
Beat types = keys of rules["beats"] plus rules["ours_object_signatures"].
"""

import json
import sys

SILENT = {"text_entrance", "ui_card", "pre_reveal_gap", "groove_in_cut", "wordmark"}
BAND = {"whip": "air", "air_riser": "air", "sparkle": "air", "end_riser": "air", "wing_flutter": "air", "air_bed": "air",
        "glass_shimmer": "hi", "bird_chirps": "hi", "desk_bell": "hi", "card_clink": "hi", "gull_cries": "hi", "end_bell": "hi",
        "paper_flick": "mid", "low_wash": "mid", "submerge": "mid", "jet_pass": "mid", "rising_tone": "mid", "pen_scribble": "mid",
        "lens_swell": "low", "reverse_swell": "low", "foghorn": "low", "drop_impact": "low", "chord_bloom": "low"}


def section_at(t, beats):
    if not beats:
        return "drop"
    cur = "intro"
    for k, v in sorted(beats["sections"].items(), key=lambda kv: kv[1]):
        if t >= v:
            cur = k
    return cur


def level(rule, sec, film):
    lv = rule.get("level", {})
    breakdown = sec in ("break",)
    if breakdown and "rel_bed_lu_breakdown" in lv:
        rb = lv["rel_bed_lu_breakdown"]
    elif "rel_bed_lu_groove" in lv and not breakdown:
        rb = lv["rel_bed_lu_groove"]
    elif "rel_bed_lu_drop" in lv and not breakdown:
        rb = lv["rel_bed_lu_drop"]
    else:
        rb = lv.get("rel_bed_lu")
    rf = lv.get("rel_film_lu")
    if rb is None:  # open / no bed: absolute vs the film target
        return -60.0, round(film + (rf if rf is not None else -20.0), 1)
    return float(rb), round(film + (rf if rf is not None else -32.0), 1)


def main(a):
    sb = json.load(open(a[0]))
    rules = json.load(open(a[a.index("--rules") + 1]))
    beats = json.load(open(a[a.index("--beats") + 1])) if "--beats" in a else None
    out = a[a.index("--out") + 1]
    fps, film = sb.get("fps", 30), sb.get("lufs", -14.0)
    R = dict(rules["beats"])
    for k, v in rules["ours_object_signatures"].items():
        if k.startswith("_"):
            continue
        base = dict(R[v["like"]])
        base.update({"sfx": v["sfx"], "params": v.get("params", {})})
        if "rel_bed_lu" in v:
            base["level"] = {"rel_bed_lu": v["rel_bed_lu"]}
        base.pop("with", None)
        base.pop("answer", None)
        R[k] = base
    cues, n = [], 0
    for b in sb["beats"]:
        typ = b["type"]
        if typ in SILENT or (typ in R and R[typ].get("sfx") is None):
            continue
        if typ not in R:
            raise SystemExit(f"unknown beat type {typ}")
        r = R[typ]
        t = b["frame"] / fps
        sec = section_at(t, beats)
        params = dict(r.get("params", {}))
        params.update(b.get("params", {}))
        if typ == "draw_open" and "end_frame" in b:
            params["dur"] = round(b["end_frame"] / fps - t - r["offset_s"], 3)
        if typ == "nature_bed" and "end_frame" in b:
            params["dur"] = round(b["end_frame"] / fps - t - r["offset_s"], 3)
        over, floor = level(r, sec, film)
        n += 1
        cues.append({"id": f"Q{n:02d}", "sfx": r["sfx"], "params": params, "anchor": f"{typ} @ frame {b['frame']} ({b.get('label', '')})",
                     "anchor_t": round(t + r.get("offset_s", 0.0), 3), "align": r.get("align", "start"), "offset": 0.0,
                     "over_bed_lu": over, "floor_lufs": floor, "pan": b.get("pan", 0.0)})
        extra = []
        if "with" in r:
            extra.append(r["with"])
        if "answer" in r and b.get("answer"):
            extra.append(r["answer"])
        for w in extra:
            n += 1
            ob = w.get("rel_bed_lu", over)
            cues.append({"id": f"Q{n:02d}", "sfx": w["sfx"], "params": dict(w.get("params", {})), "anchor": f"{typ} (paired) @ frame {b['frame']}",
                         "anchor_t": round(t + w.get("offset_s", r.get("offset_s", 0.0)), 3), "align": w.get("align", "start"), "offset": 0.0,
                         "over_bed_lu": float(ob), "floor_lufs": round(film - 32, 1), "pan": 0.0})
    # density guard (measured on the reference: <= 2 SFX starts in any 1 s; same band >= 0.5 s apart)
    starts = sorted((c["anchor_t"], c["sfx"], c["id"]) for c in cues)
    warn = []
    for i, (t, s, cid) in enumerate(starts):
        win = [x for x in starts if t <= x[0] < t + 1.0]
        if len(win) > 2:
            warn.append(f"{len(win)} SFX within 1 s from {t:.2f}s: {[x[2] for x in win]}")
        same = [x for x in starts if 0 < x[0] - t < 0.5 and BAND.get(x[1]) == BAND.get(s) and x[1] != s]
        if same:
            warn.append(f"{cid} {s} and {same[0][2]} {same[0][1]} share a band within 0.5 s")
    sheet = {"seconds": sb["seconds"], "lufs": film, "music": {"file": sb["music"], "gain_db": 0}, "cues": cues}
    json.dump(sheet, open(out, "w"), indent=1)
    print(f"{len(cues)} cues -> {out}  ({len(cues) / sb['seconds']:.2f} SFX/s; reference 0.41/s)")
    for w in dict.fromkeys(warn):
        print("  warn:", w)


if __name__ == "__main__":
    main(sys.argv[1:])
