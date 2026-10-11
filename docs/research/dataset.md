# Per-frame dataset: what 562 videos look like, frame by frame

**What it is.** `research/frames.py` reads every downloaded reference video at 10 frames per second. It writes one CSV row per frame to `frames/<id>-*.csv.gz` on the `research-results` branch. The data is numbers only; no images are stored.

| Column | Meaning |
|---|---|
| `t` | seconds from the start |
| `luma`, `contrast` | mean brightness and its spread (0–1) |
| `dark`, `light` | share of pixels below 0.15 / above 0.85 brightness |
| `sat` | mean saturation (0–1) |
| `hue`, `hue_share` | dominant hue in degrees (−1 = grey frame) and how much of the coloured area it covers |
| `colorful` | Hasler–Süsstrunk colourfulness |
| `edges` | share of edge pixels (type, UI and line art score high) |
| `motion` | mean brightness change from the previous frame |
| `cut` | 1 where a new shot starts |

**Coverage.** 577 videos have frame files (updated 2026-10-10 with 78 Motion Design Awards videos recovered through the in-page Vimeo fallback): the SaaS and launch references plus the Motion Design Awards entries. 562 of them are 5 s or longer and are used below. The ids join to `data/<id>-*.json` (measurements) and `urls.tsv` (source link).

**How to read the numbers.** Every number below is a median across videos unless it says otherwise. Hue is measured on the whole frame, so skin, wood and warm light all count as "red/orange".

## 1. The shape of a film over time

Each film's length is split into ten equal parts. Motion is relative to that film's own average (1.00 = average).

| Part of the film | Relative motion | Cuts per minute | Brightness |
|---|---|---|---|
| 0–10% | 0.80 | 0 | 0.43 |
| 10–20% | 0.99 | 12.5 | 0.45 |
| 20–30% | 1.04 | 15.6 | 0.47 |
| 30–40% | 1.04 | **16.7** | 0.48 |
| 40–50% | 1.05 | 14.1 | 0.47 |
| 50–60% | 1.03 | 12.6 | 0.47 |
| 60–70% | 0.99 | 14.4 | 0.47 |
| 70–80% | 0.93 | 13.0 | 0.48 |
| 80–90% | 0.80 | 8.2 | 0.46 |
| 90–100% | **0.32** | 0 | **0.33** |

The table barely moved when 66 more videos were added (it was built on 496 before): the shape is stable, not noise.

What this means:

1. **Hold the first shot.** The median video makes its first cut at **4.0 s** (p25 1.8 s, p75 9.5 s), and the opening tenth moves less than the rest of the film. Premium films open on one held image, not a flurry of cuts.
2. **Cut fastest about a third of the way in.** Cut density peaks around 30–40% of the running time. That is where the demo or feature montage sits.
3. **Land and hold the ending.** Motion drops to a third of the average in the last tenth, and brightness falls from 0.47 to 0.33. **33%** of videos end on near-black and **22%** start on near-black. The final still hold lasts a median **1.6 s** (p75 3.1 s): the logo or end card sits still, then fades.

## 2. Stillness is part of the style

- In the median video, **25% of all frames are effectively still** (frame-to-frame change below 0.5%). In the top quarter it is 42% or more. These are the holds that make text readable and give a film its "premium" calm.
- Median motion is 0.035 (p25 0.019, p75 0.053). Only the top quarter moves at agency-reel speed.

## 3. Colour

- **Median saturation is 0.25**. Most references are fairly muted. Only the top quarter goes above 0.39.
- **20% of videos (115) are mostly greyscale**: more than 60% of their frames have no dominant hue. Black-and-white with one accent is a whole category, not an exception.
- When one hue covers more than 40% of the coloured area, it is most often warm red/orange (181 videos; this includes skin tones, wood and warm light). Next come azure/blue UI tones (109), then cyan (42). Green, yellow, violet and magenta are rarely the dominant hue (4–13 videos each). They work as accents.
- Median brightness is 0.46 (p25 0.30, p75 0.64). The set is balanced between light and dark.

## 4. Text and detail

- Median edge density is 0.10 (p25 0.06, p75 0.14). Frames with lots of type, UI or line art sit at 0.14 and above. Photographic or CGI frames sit around 0.06.

## Rules added to the kit's guidance

These go into the playbook (§1) and motion-director's `references/craft.md` (Timing):

| Rule | Number behind it |
|---|---|
| Hold the opening shot 2–4 s before the first cut | first cut median 4.0 s |
| Put the busiest beats in the first half, peaking about a third of the way in | cuts/min peak at 30–40% |
| Slow down for the last tenth; end on a still logo or card held at least 1.5 s | final hold median 1.6 s; motion 0.32× in the last 10% |
| Leave about a quarter of the frames still | 25% still frames (median) |
| Keep saturation moderate; use one saturated accent | median saturation 0.25 |

## Reproduce

```bash
git fetch origin research-results
git worktree add /tmp/rr research-results
python3 - <<'PY'
import csv, gzip, glob
for f in glob.glob('/tmp/rr/frames/*.csv.gz')[:3]:
    rows = list(csv.DictReader(gzip.open(f, 'rt')))
    print(f, len(rows), 'frames,', sum(int(r['cut']) for r in rows), 'cuts')
PY
```
