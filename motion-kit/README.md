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
npm run new     -- my-video                  # specs/my-video.json from a recipe
npm run check   -- specs/claude-reel.json    # validate + lint, prints the timeline
npm run qa      -- specs/claude-reel.json    # visual QA of the real frames (in memory, writes nothing)
npm run preview -- specs/claude-reel.json    # one-image contact sheet of every scene
npm run make    -- specs/claude-reel.json    # QA, then out/claude-reel.mp4 + cover image
npm run dev                                  # Remotion Studio, live preview
```

With Claude Code, just describe the video; the `motion-director` skill
(`../skills/motion-director`) runs brief → storyboard → spec → check → QA → voice → render.

## Commands

| Command | What it does |
|---|---|
| `npm run new -- <name> [--recipe <recipe>]` | Creates `specs/<name>.json` from a recipe in `specs/recipes/`. |
| `npm run check -- specs/x.json [--theme t] [--format f]` | Validates the spec and lints it against the timing, copy and contrast rules; prints the timeline. Exit 1 on errors. |
| `npm run qa -- specs/x.json [--theme t] [--format f] [--json]` | Renders the key frames in memory and checks what is really on screen. Writes no files. Exit 1 on errors. |
| `npm run preview -- specs/x.json [--theme t] [--format f]` | `out/x.sheet.jpg`: one settled frame per scene, platform-UI zones tinted red. |
| `npm run voice -- specs/x.json [...]` | Narration script, ElevenLabs TTS, or alignment of your own recording ([Voice sync](#voice-sync-say--show)). |
| `npm run music -- specs/x.json --track music/song.mp3 [--start 12.5]` | Fits your licensed track to the video ([Music](#music-your-licensed-track)). |
| `npm run brand -- <logo file> [--spec specs/x.json]` | Brand palette from a logo ([Brand colours](#brand-colours)). |
| `npm run make -- specs/x.json [--format f] [--all-formats] [--crf 22] [--skip-qa]` | Runs QA, stops on errors, then renders `out/x.mp4` + `out/x-cover.jpg`. |
| `npm run scaffold -- <folder> [--no-install]` | Copies this engine (everything except `node_modules/` and `out/`) into a new folder and runs `npm install` there. |
| `npm run dev` | Remotion Studio with every example spec. |
| `npm run lint` | ESLint + TypeScript. |

`--theme` and `--format` try another look without editing the spec.

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

## Checks before rendering

`npm run check` is instant and needs no browser: schema errors with the field path,
hook length and payoff time, scene length, words per line, kicker length, narration
coverage, media files that don't exist, and brand-colour contrast.

`npm run qa` renders the frames that matter in memory (the thumbnail, every scene once
it has landed, the transitions, the last frame) and measures what the browser actually
laid out: text under platform UI or off the canvas, overlapping text, text too long for
its slot, type too small for a phone, low contrast and a blank thumbnail. Each finding
names the scene, time and field with a fix. `--json` is machine-readable; exit code 1 on
errors. `npm run make` runs it first and stops on errors (`--skip-qa` to override).

QA and renders need a Chromium. Remotion downloads its own on the first render; where
that is blocked, set `REMOTION_BROWSER_EXECUTABLE` to an installed Chromium headless
shell (the repository's SessionStart hook does this in Claude Code on the web).

## Voice sync (say / show)

Each scene's `say` is the narration; the on-screen fields are the "show". Without a
voice-over, timing is estimated from natural speech, so the silent preview already
matches. Then:

```bash
npm run voice -- specs/x.json                         # paste-ready narration + character count
npm run voice -- specs/x.json --tts --voice <id>      # ElevenLabs (ELEVENLABS_API_KEY), asks before spending
npm run voice -- specs/x.json --align voice/x.mp3     # your recording / downloaded MP3
npm run voice -- specs/x.json --import subs.srt       # existing subtitles
```

Scenes then cut on the spoken beat and words reveal as they are said.

## Music (your licensed track)

The kit never generates music. Bring a track you hold a licence for (YouTube Audio
Library, Pixabay Music, Mixkit, or bought), put it in `public/music/`, then:

```bash
npm run music -- specs/x.json --track music/song.mp3                # analyse + pick the start
npm run music -- specs/x.json --track music/song.mp3 --start 12.5   # or choose the start
```

It analyses tempo, beats and loudness, picks a start offset, writes
`public/music/song.beats.json` and sets `audio.music`, `audio.musicStart` and
`audio.beats` in the spec. With `audio.beats` present the planner snaps cuts to the
beat, and music is ducked under narration automatically.

## Brand colours

```bash
npm run brand -- public/brand/logo.png                         # palette + recommended theme
npm run brand -- public/brand/logo.png --spec specs/x.json      # also writes it into the spec
```

Extracts the logo's palette and recommends a theme; with `--spec` it writes
`brand.accent`, `brand.accent2` (and `brand.logo`). A brand accent that would fail
contrast on the chosen theme is adjusted automatically instead of rejected.

## Footage

Put clips in `public/clips/` and use `clip` scenes (`trim`, `area`, `generated: true`
for AI footage). Prompts for Google Flow / Veo: `../skills/motion-director/references/production.md`.

## A new project anywhere

```bash
npm run scaffold -- ~/videos/brand-x            # copy + npm install
npm run scaffold -- ../brand-y --no-install     # copy only
```

The new folder is a complete motion-kit: same scenes, fonts, sounds and example specs,
same commands. The target must be a new or empty folder outside this one. The Claude
Code plugin runs this script from its own copy the first time it is used in a folder.

## What's inside

```
src/engine/   schema, planner (timing), voice alignment, auto-fit text, motion tokens,
              themes, backgrounds, transitions, orb/waveform visuals, contact sheet
src/scenes/   one file per scene template (how to add one: ../docs/ADDING-SCENES.md)
specs/        example specs; specs/recipes/ holds the starting points for `npm run new`
scripts/      check · qa · preview · voice · music · brand · make · new · scaffold
public/       fonts (SIL OFL, Latin + Devanagari), synthesised SFX, grain texture
tools/        gen-assets.py — regenerates the SFX and grain (no third-party licences)
```

CI (`.github/workflows/ci.yml`) runs `tsc`, ESLint, `check` on every spec and the unit
tests on each pull request. Nothing is rendered in CI.

## Licences

Fonts: SIL Open Font License (`public/fonts/OFL-LICENSES.txt`). Sound effects and
grain are generated by `tools/gen-assets.py`. Remotion is free for individuals and
companies of up to 3 people; larger companies need a Remotion company licence.
Music is always user-supplied and must be licensed by the user.
