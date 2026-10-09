# motion-kit

Motion graphics from a storyboard, not from code. You (or Claude) write a short
JSON spec: what each beat says and shows. Pre-built, pre-tested scene templates
animate it with consistent typography, timing, transitions and sound.

Why this removes retakes: when an AI writes fresh animation code for every video,
every video is a new chance for overflowing text, unreadable timing, flicker and
inconsistent motion. Here the AI only writes data. Text is auto-fitted to its
box, timing comes from reading speed or the voice-over, and a checker rejects
problems before anything renders.

This is the technical reference. For a non-technical introduction (and the
Claude Code plugin), see the [repository README](../README.md).

## Quick start

Needs Node.js 22.18+ and (for voice, music and loudness) ffmpeg.

```bash
cd motion-kit
npm install
npm run check   -- specs/claude-reel.json    # validate + lint, prints the timeline
npm run qa      -- specs/claude-reel.json    # visual QA of the real frames (in memory, writes nothing)
npm run preview -- specs/claude-reel.json    # one-image contact sheet of every scene
npm run make    -- specs/claude-reel.json    # QA, then out/claude-reel.mp4 + cover image
npm run brand   -- public/brand/logo.png --spec specs/claude-reel.json   # brand colours from a logo
npm run dev                                  # Remotion Studio, live preview
```

With Claude Code, just describe the video; the `motion-director` skill
(`../skills/motion-director`) runs brief → storyboard → spec → check → QA → voice → render.

## Commands

| Command | What it does |
|---|---|
| `npm run new -- <name> [--recipe <recipe>]` | Creates `specs/<name>.json` from a recipe in `specs/recipes/` ([Recipes](#recipes)). |
| `npm run check -- specs/x.json [--theme t] [--format f]` | Validates the spec and lints it against the timing, copy and contrast rules; prints the timeline. Instant, no browser. Exit 1 on errors. |
| `npm run qa -- specs/x.json [--theme t] [--format f] [--json]` | Renders the key frames in memory and checks what is really on screen; writes no files. Exit 1 on errors ([Visual QA](#visual-qa)). |
| `npm run preview -- specs/x.json [--theme t] [--format f]` | `out/x.sheet.jpg`: one settled frame per scene, platform-UI zones tinted red. |
| `npm run voice -- specs/x.json [...]` | Narration script, free voices (Kokoro, Edge, Gemini), ElevenLabs TTS, or alignment of your own recording ([Voice sync](#voice-sync-say--show)). |
| `npm run music -- specs/x.json --track music/song.mp3 [--start 12.5]` | Fits a licensed track you supply: beats, start point, ducking ([Music](#music-your-licensed-track)). |
| `npm run brand -- <logo file> [--spec specs/x.json]` | Palette from a logo, recommended theme; `--spec` writes the brand colours ([Brand colours](#brand-colours)). |
| `npm run make -- specs/x.json [--format f] [--all-formats] [--crf 22] [--skip-qa]` | Runs QA and stops on errors, then renders `out/x.mp4` + `out/x-cover.jpg`. |
| `npm run scaffold -- <folder> [--no-install]` | A new project with this engine in another folder ([A new project anywhere](#a-new-project-anywhere)). |
| `npm run dev` | Remotion Studio with every example spec. |
| `npm run lint` | ESLint + TypeScript. |

`--theme` and `--format` try another look without editing the spec.

`qa`, `preview` and `make` drive a Chromium. Remotion downloads its own on the first
render; where that is blocked, set `REMOTION_BROWSER_EXECUTABLE` to an installed
Chromium headless shell (plus `REMOTION_CHROME_MODE=chrome-for-testing` for a full
Chromium). The repository's SessionStart hook (`../scripts/session-start.sh`) does this
in Claude Code on the web, and `remotion.config.ts` passes it on to Studio.

## Motion Studio

`npm run studio` opens a step-by-step maker in the browser (Brief → References → Style →
Look → Storyboard → Sound → Make) with the real engine playing live beside every step. It is
a thin layer over the same scripts: `check`, `qa`, `new`, `brand`, `music`, `voice`, `make`
and `reference`. It saves to `specs/`, uploads to `public/` (`brand/`, `refs/`, `music/`,
`voice/`, `images/`, `clips/`) and renders to `out/`. Code: `studio/` (React + Remotion
Player, served by Vite) and `scripts/studio.mjs`.

`npm run reference -- refs/ad.mp4` measures a reference video on its own: cuts, motion,
palette, brightness and music tempo, plus the theme, motion, pace and transition that match.

## A spec

```json
{
  "format": "reel",
  "theme": "studio",
  "scenes": [
    { "type": "orb", "say": "Meet Lumen. A voice that sounds like you.", "headline": "Meet *Lumen*." },
    { "type": "kinetic", "say": "Type a line. Pick a mood. Hear it instantly.",
      "lines": ["Type a line.", "Pick a mood.", "Hear it *instantly*."] },
    { "type": "cta", "say": "Try Lumen today.", "kicker": "Your voice, everywhere.", "action": "Try Lumen" }
  ]
}
```

- **17 scenes**: hook, kinetic, orb, title, stat, list, compare, bars, grid, quote, prompt, chat, wave, image, clip, cta, logo.
  Catalog with every field: `../skills/motion-director/references/scenes.md`.
- **10 themes**: midnight, clean, neon, editorial, pop, desi, corporate, mono, studio, studio-dark.
- **4 formats**: reel 9:16, portrait 4:5, square 1:1, landscape 16:9, all with platform safe zones.
- **4 motion personalities**: snappy, smooth, bouncy, calm.
- Inline marks: `*accent*`, `==highlight==`, `~~strike~~`.

## Recipes

`specs/recipes/` holds 12 production-ready storyboards: product launch reel, launch film
16:9, app demo, Hinglish creator explainer, tips listicle, festive local offer, testimonials,
event promo, hiring, before/after, stats report, real estate / food. Each one has a hook,
5-9 beats, a CTA, a deliberate theme / motion / pace, and a `_recipe` block with the purpose
of every beat and copy tips. Facts are `[CAPS]` slots to fill in; chart values have to be
numbers, so the stats recipe's bars are samples to replace.

```bash
npm run new                                                   # list the recipes
npm run new -- diwali-sale --recipe local-offer-festive       # → specs/diwali-sale.json
npm run new -- launch --recipe launch-film-16x9 --format reel --theme studio-dark
```

`npm run new` never overwrites a spec; it prints the beats and every slot and sample number to
fill.

## Visual QA

`npm run qa -- specs/x.json` renders the key frames in memory (frame 0, every scene
once it has landed, every transition midpoint, the last frame) and measures what the
browser actually laid out. It fails on text under platform UI or off the canvas,
overlapping text, text too long for its slot / cut off / spilling out of its card,
type below 30 px (vertical) or 40 px (landscape), contrast under 3:1, and a blank
thumbnail; it warns on type under 36 / 48 px and small text under 4.5:1. Every finding
names the scene, time and field, with a concrete fix. `--theme all --format reel,landscape`
sweeps variants, `--json` is machine-readable, exit code 1 on errors. `npm run make`
runs it first (`--skip-qa` to bypass). The Remotion browser is found automatically
(`REMOTION_BROWSER_EXECUTABLE`, else a Playwright Chromium under `PLAYWRIGHT_BROWSERS_PATH`).

## Voice sync (say / show)

Each scene's `say` is the narration; the on-screen fields are the "show". Without a
voice-over, timing is estimated from natural speech, so the silent preview already
matches. Then:

```bash
npm run voice -- specs/x.json                         # paste-ready narration + character count
npm run voice -- specs/x.json --engine kokoro         # free + offline (pip install kokoro-onnx soundfile)
npm run voice -- specs/x.json --engine edge           # free + online, Indian English / Hindi voices (pip install edge-tts)
npm run voice -- specs/x.json --engine gemini         # Google Gemini TTS free tier (GEMINI_API_KEY), --style "…"
npm run voice -- specs/x.json --tts --voice <id>      # ElevenLabs (ELEVENLABS_API_KEY), asks before spending
npm run voice -- --voices                             # every engine with its cost, licence and best voices
npm run voice -- specs/x.json --align voice/x.mp3     # your recording / downloaded MP3
npm run voice -- specs/x.json --import subs.srt       # existing subtitles
```

Scenes then cut on the spoken beat and words reveal as they are said. Free engines speak
each beat separately, so scene cuts are exact. Edge reports real word timings; Kokoro and
Gemini spread the words across each beat. For Hinglish written in Latin letters, the Edge
Indian English voices (`en-IN-NeerjaExpressiveNeural`, `en-IN-PrabhatNeural`) sound the most natural.
Edge is an unofficial use of a consumer service, so use Kokoro, Gemini or ElevenLabs for paid client work.

## Brand colours

`npm run brand -- public/brand/logo.png` reads a logo in memory, finds its colours (k-means),
prints them with contrast numbers and ranks the 10 themes for them (themes the logo file would
not read on — dark, charcoal or navy lettering on a dark theme, white on a light one, an opaque
white / cream / black backdrop or tile showing as a box — are ruled out, and `npm run check` warns
about them; a coloured app tile is the mark, not a box, and a tile, badge or outline whose glyph
or body still reads only gets a note where its edge blends in); `--spec specs/x.json`
writes `brand.accent`, `brand.accent2` and `brand.logo`. A brand colour is never rejected: if
it would not read on the chosen theme, only its lightness moves until it does (hue kept), and
`npm run check` says what changed. Missing accent2, highlighter and orb colours are derived
from the brand. Rules: `.claude/skills/motion-director/references/craft.md` → Brand colours.

## Music (your licensed track)

The kit never generates music. Bring an instrumental track (MP3 or WAV) you hold a licence for
(YouTube Audio Library, Pixabay Music, Mixkit, or Artlist / Epidemic Sound if bought):

```bash
npm run music -- specs/x.json --track music/song.mp3                # analyse + pick the start
npm run music -- specs/x.json --track music/song.mp3 --start 12.5   # or choose it
```

It measures tempo, beats, bars and loudness (ffmpeg + a built-in beat tracker), starts
the music on the bar that opens its most energetic stretch, and writes
`public/music/song.beats.json` + `audio.music`, `audio.musicStart`, `audio.beats` into
the spec. Cuts then land on the beat (whoosh on the beat), the music fades in/out,
loops if it is short, is level-matched, and ducks under narration.
Sources and a BPM guide per theme: `references/production.md`.

## Footage

Put clips in `public/clips/` and use `clip` scenes (`trim`, `area`, `generated: true`
for AI footage). Prompts for Google Flow / Veo: `../skills/motion-director/references/production.md`.

## A new project anywhere

```bash
npm run scaffold -- ~/videos/brand-x            # copy + npm install
npm run scaffold -- ../brand-y --no-install     # copy only
```

Copies this engine (everything except `node_modules/` and `out/`) into a new or empty
folder outside this one and runs `npm install` there: same scenes, fonts, sounds,
recipes and example specs, same commands. The Claude Code plugin runs this script from
its own copy the first time it is used in a folder.

## What's inside

```
src/engine/   schema, planner (timing), voice alignment, auto-fit text, motion tokens,
              themes, backgrounds, transitions, orb/waveform visuals, contact sheet
src/scenes/   one file per scene template
scripts/      check · qa · preview · voice · music · make · brand · new
tests/        node --test (npm test): beat tracking, beat-snapping, ducking; scripts/test-*.mjs: brand colours
public/       fonts (SIL OFL, Latin + Devanagari), synthesised SFX, grain texture
tools/        gen-assets.py — regenerates the SFX and grain (no third-party licences)
```

How to add a scene template safely: [`../docs/ADDING-SCENES.md`](../docs/ADDING-SCENES.md).
CI (`../.github/workflows/ci.yml`) runs `tsc`, ESLint, `check` on every spec, the unit
tests (`node --test`) and the plugin validator on each pull request. Nothing is rendered
in CI.

## Licences

Fonts: SIL Open Font License (`public/fonts/OFL-LICENSES.txt`). Sound effects and
grain are generated by `tools/gen-assets.py`. Remotion is free for individuals and
companies of up to 3 people; larger companies need a Remotion company licence.
Music is always user-supplied and must be licensed by the user.
