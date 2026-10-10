"""Write a cue sheet: python3 cue.py <name> <seconds> 'sfx@t[:lu[:align[:k=v,...]]]' ...  (from this folder)."""
import json, sys
name, secs, items = sys.argv[1], float(sys.argv[2]), sys.argv[3:]
cues = []
for i, it in enumerate(items):
    sfx, rest = it.split("@")
    parts = rest.split(":")
    t = float(parts[0]); lu = float(parts[1]) if len(parts) > 1 and parts[1] else -6
    align = parts[2] if len(parts) > 2 and parts[2] else "start"
    params = {}
    if len(parts) > 3 and parts[3]:
        for kv in parts[3].split(","):
            k, v = kv.split("=")
            params[k] = float(v)
    cues.append({"id": f"N{i+1:02d}", "sfx": sfx, "params": params, "anchor": sfx, "anchor_t": t, "align": align, "over_bed_lu": lu, "floor_lufs": -40.0, "pan": 0.0})
json.dump({"seconds": secs, "lufs": -14.0, "music": {"file": "score.wav", "gain_db": -2}, "cues": cues}, open(f"{name}.json", "w"), indent=1)
