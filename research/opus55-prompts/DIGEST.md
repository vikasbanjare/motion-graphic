# What 513 prompts for code-made motion videos teach us

Source: `yihui-dev/awesome-opus5-5-videos` (MIT, copied here with its LICENSE; commit in `SOURCE_COMMIT`). 513 videos people
made by asking Claude Opus 5.5 to write the animation as code, each with the prompt the creator shared. Every entry
credits and links its creator; keep those credits when quoting a prompt.

## The corpus, measured

| | count |
| --- | --- |
| motion graphics | 317 |
| interactive | 70 |
| explainers | 67 |
| 3D scenes | 59 |
| full prompts published | 279 |
| prompt length, median / p90 | 28 / 349 words |

Tech used (one video can have several): Canvas 351, SVG 219, Three.js 147, shaders 104, GSAP 100, CSS 68, audio 36,
particles 26. Words that recur in the full prompts: showreel 95, frame 42, sound 38, music 34, product 32, camera 27,
ink 26, transition 25, line 24, loop 23, blur 21, beat 21.

Most prompts are one line ("make a 15 second showreel, go all out"). The few long, structured ones are where the craft
is, and they agree with each other.

## Rules the strong prompts share

1. **Every scene is made out of the previous one.** "One shape, never cut." Shapes morph, masks wipe, a black shape
   floods the frame and contracts into the next scene. Several prompts *ban* crossfades, blur-ins and 3D flips.
2. **Something happens on every beat.** A tempo (usually 120 BPM) and a bar-by-bar list of named actions. No hold
   longer than about a second. The ending returns to the opening for a loop.
3. **A banned list up front**: excessive bounce, particle bursts, glows, gradients on UI chrome, generic dashboards,
   dead time, unrelated floating elements, AI-generated text inside images.
4. **Springs tightly damped**, a tiny overshoot at most; content swaps get a short, separated enter/exit.
5. **One subject driven by an agent**: a cursor with real clicks and drags, or a single object the camera follows.
   The camera reframes so each state fills the frame.
6. **Exact format in the brief**: size, fps, duration, safe area, deliverables (MP4 plus editable source), real
   typography, sound design synced to transitions.
7. **Paper feel for illustration**: "beautifully rendered animations with a papery feel"; warm off-white grounds,
   one ink family, restrained accents.
8. **A location map and scale rules** for anything narrative (how big the window is relative to the person), so the
   model cannot drift.

## How we use it

- The motion-creative-director and art-director skills now carry rules 1 to 8 as checks on every brief.
- For the CRED film: replace dissolves with match-morphs where an object can carry the cut (rule 1), and keep the
  beat grid (rule 2) that the film already has.
- When a user asks for "a video like X", search `data/videos.json` by `tech_tags` and `category` and read the full
  prompts nearest to the ask before writing our own brief.
