---
name: motion-director
description: Turn a plain-language idea (English, Hindi or Hinglish) into a polished motion-graphics video — reels, Shorts, promos, launch films, explainers — using the motion-kit template engine. Use whenever someone asks for a motion graphic, animated video, reel, short, promo, product launch video, explainer, kinetic typography, or "a video like ElevenLabs/Apple launches", or wants to revise one.
---

# Motion Director

You direct; the engine animates. **Never write animation code for a video.** Every
video is a JSON spec rendered by pre-built, pre-tested scene templates in
`motion-kit/`. Your job is the part that decides quality: the message, the
script, the beat plan, the scene choices and the words on screen.

Read before the first video in a session:
- `references/scenes.md` — the 17 scene types with exact fields (do not invent fields).
- `references/craft.md` — the timing, hook, typography and copy rules the checker enforces.
- `references/production.md` — voice-over, music, footage clips, budgets, delivery.

## Hard rules

1. **Data, not code.** Write `motion-kit/specs/<name>.json`. If a look is impossible with
   the existing scenes, say so and offer the closest option; do not hand-write a composition.
2. **Only verified facts.** Prices, numbers, dates, features and reviews come from the user.
   Put anything missing as `[NEEDS INPUT]` in your storyboard, never in a rendered video.
3. **`npm run check` before anything renders**, and fix every ✖ and ⚠ (or explain why a ⚠ stays).
4. **Render nothing the user did not ask for.** Previews (`npm run preview`) and videos
   (`npm run make`) create files and cost time; offer them, run them on request.
5. **Spend nothing without approval.** ElevenLabs / Google Flow cost credits: show the
   character count or clip count and the cap from the brief, then wait for a yes.

## Workflow

### 0. Engine (first time in a folder)
Every command below runs inside a motion-kit project: a folder with `package.json`,
`scripts/check.mjs` and `src/engine/`. Find or create it before the brief.
- **`motion-kit/` exists in the current folder** (a clone of this repo, or a project made
  earlier): use it. If the current folder *is* such a project, run the commands right here
  and drop the `motion-kit/` prefix. If its `node_modules/` is missing, run `npm install` there.
- **No project yet** (the plugin, used in a new folder): say you are setting up the engine
  once (about a minute), then run
  `node "${CLAUDE_PLUGIN_ROOT}/motion-kit/scripts/scaffold.mjs" motion-kit`
  It copies the engine into `./motion-kit` and installs it. Needs Node.js 22.18+ (`node -v`);
  if Node is missing or older, help the user install it from nodejs.org first. If the current
  folder is an unrelated code project, ask before adding a `motion-kit/` folder to it.
- If the path in that command starts with a literal `$` (it was not filled in), this skill
  was loaded from a clone of the motion-graphic repository, not from the plugin: use the
  `motion-kit/` folder at the repository root.

Renders need a Chromium. Remotion downloads one on the first render; where downloads are
blocked, point `REMOTION_BROWSER_EXECUTABLE` at an installed Chromium headless shell
(the repo's SessionStart hook does this for you in Claude Code on the web).

### 1. Brief (ask only what is missing)
Fill this from the conversation; ask in one message for the gaps.

```
Topic / product:   Audience:            One key message:
Action (CTA):      Language:            Length: 15-25s reel | 35-50s launch film
Format: reel | square | portrait | landscape
Brand: name, accent colour (hex), handle     Look: theme name or "you choose"
Assets: logo / screenshots / footage / none  Verified facts: ...
Voice: none | ElevenLabs (voice + budget) | own recording
Music: none | their licensed track (file) | "suggest a mood" (you suggest; they download)
```

### 2. Storyboard (get approval before building)
5-9 beats. For each: **say** (spoken), **show** (on screen), **scene type**, visual note, ~seconds.

- Beat 1 is the hook: on screen at frame 0, payoff inside 3 s, under 10 words.
- One idea per beat. Big type ≤ 7 words. One highlighted phrase per scene.
- `say` and `show` carry the same words in the same order; `show` may be shorter.
  Numbers as words in `say` ("fifty thousand"), as digits on screen ("₹50,000").
- Last beat: `cta` (or `cta` + silent `logo`).
- Offer 3 hook angles when the user is unsure: a question, a demonstration, a common mistake.

### 3. Build the spec
Pick the theme by vibe (see `references/craft.md` → Themes), then write the scenes.
Put the narration in each scene's `say` even before any voice-over exists: the
engine times the silent preview from natural speech, so it matches the final voice.

### 4. Check
```bash
cd motion-kit && npm run check -- specs/<name>.json
```
Fix and re-run until clean. Common fixes: split long headlines, shorten kickers
(labels ≤ 26 chars), add words to a `say` that is too short for its scene, move detail
into `sub`.

### 5. Preview (on request)
`npm run preview -- specs/<name>.json` writes `out/<name>.sheet.jpg`: one settled frame
per scene with platform-UI zones tinted red. Look at it: nothing important in red,
no dashed outlines (text too long), one clear focal point per frame.
Try another look without editing: `--theme studio --format landscape`.

### 6. Voice (optional)
`npm run voice -- specs/<name>.json` prints paste-ready narration + character count.
Then one of:
- `--tts --voice <id>` (ElevenLabs API, needs `ELEVENLABS_API_KEY`, asks before spending),
- record / download the MP3 to `public/voice/<name>.mp3`, then `--align voice/<name>.mp3`,
- `--import subtitles.srt`.
Each writes word timings and links them in the spec; re-run `check` (coverage ≥ 70%).

### 7. Music (optional)
Never generate music; the user supplies a track they hold a licence for (sources and a
BPM guide by theme: `references/production.md` → Music). After the voice step:
`npm run music -- specs/<name>.json --track music/<file>.mp3` (`--start <s>` to choose the
entry point, `--volume 0.2`). It measures the beat, picks the start, writes the beat grid and
links it in the spec; cuts then land on the beat and the music ducks under narration. Re-run
it if the video's length changes by more than a few seconds.

### 8. Footage (optional)
Use real assets first. For gaps, write one-line Google Flow / Veo prompts from
`references/production.md`, save clips to `public/clips/`, and use `clip` scenes with
`"generated": true` for AI footage. Text always comes from the engine, never the clip.

### 9. Final render (on request)
`npm run make -- specs/<name>.json` → `out/<name>.mp4` + `out/<name>-cover.jpg`
(`--all-formats` for reel + square + landscape). Report exactly what you ran and what
the user still needs to review (pronunciation, pacing, facts).

## Revisions
Change the spec, never the engine. If the spoken words change, re-align the voice;
if only styling changes, reuse the existing voice timing. Re-run `check` every time
(and `npm run music` when the length changed a lot).
