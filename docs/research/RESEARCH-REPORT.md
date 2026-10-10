# Research report: everything learned so far (start here)

This is the single entry point to the research in this repo. It exists so no detail is lost between Claude sessions. Every finding below points to the file that holds the evidence. Update this file whenever research changes.

_Last updated: 2026-10-10 (three-tier production pipeline added)._

## 1. What was studied

| Source | Links | Downloaded and measured | Reviewed frame by frame | Notes file |
|---|---|---|---|---|
| Original reference list (`research/links.txt`: raivcoo, X/Twitter, showreel.design, YouTube) | 391 | 347 (96 were mirrors, leaving 251 unique) | 251 (first 16 s at 2 fps, plus some full pilots) | `reference-notes.md` |
| Motion Design Awards (`research/sites.txt`, crawled) | 305 found | ~267 | 221 (first sheet plus a mid-video sheet) | `award-notes.md` |
| Per-frame numeric dataset | n/a | 577 videos at 10 fps | n/a | `dataset.md` |
| Earlier study: 8 SaaS launch films, frame-level teardowns | 8 | 8 | 8 | `videos/*.md`, master system in `skills/motion-creative-director/references/` |

**What is still missing, and why:**
- **44 YouTube links.** YouTube's bot check blocks GitHub's servers. They need a `YT_COOKIES` repository secret.
- **74 Motion Design Awards Vimeo embeds.** Playing each video inside its own award page (headless browser) recovered 78 of about 150. The rest show Vimeo's bot wall ("We couldn't verify the security of your connection") or "This video does not exist" to GitHub's servers. Retrying is stopped; they would need a residential network or a logged-in session.
- **3 dead or refused links** on X and showreel.design.

**Where the raw data lives:** the `research-results` branch.
- `summary.csv`: per-video measurements.
- `data/*.json`: full measurements per video.
- `frames/*.csv.gz`: per-frame features.
- `urls.tsv`, `discovered.tsv`, `failures/`.
- `sheets/run-*`: contact sheets. These are encrypted, because other people's frames are never published in readable form.

**The pipeline:** `.github/workflows/research.yml`, which runs the scripts in `research/` (crawl → fetch → measure → frames → sheets → publish). Each run fetches only links that don't have results yet.

## 2. The most important findings

**Measured** (numbers, not opinions):

1. **Shot length depends on genre.**
   - Median shot is 4.8 s in the SaaS/launch set and 3.9 s in award work.
   - Agency reels cut every 1.5 s.
   - Dark AI launch films hold 16.7 s, and half of them are one continuous shot.
   (`style-playbook.md` §1, §6)
2. **The shape of a film over time** (562 videos, `dataset.md`):
   - The first cut comes at 4.0 s.
   - Cutting peaks about a third of the way in, at 16.7 cuts per minute.
   - The last tenth moves at 0.32× the film's average.
   - The final still hold is 1.6 s, and 33% end on near-black.
   - A quarter of all frames are still.
3. **Colour is restrained.**
   - Median saturation is 0.25.
   - 20% of films are mostly greyscale.
   - The dominant hue is most often warm red/orange (this includes skin and wood), then blue/azure.
   - Green, yellow, violet and magenta appear as accents, rarely as the dominant colour.
4. **Brightness depends on genre.**
   - Editorial work is never dark (0 of 8).
   - Dark premium UI is dark 20 of 26 times.
   - Whitespace UI is light 25 of 39 times.
   - Award work leans dark or mixed (141 of 173).
5. **Award work is material-led.** 57% of entries are 3D product CGI, against 11% in the SaaS set. Kinetic type appears in 31% and illustration or 2D characters in 29%.

**Reviewed** (patterns seen across many videos):

6. **One idea per beat.** Small type on a big empty frame, and 2–3 colours per scene with one accent per film. (`style-playbook.md` §2)
7. **Award films sharpen that rule.**
   - One material per film: wood, gold, thread, slime, soil.
   - One hue per idea: the Emotions trilogy uses blue, red and green.
   - Typography sits inside the world (panels, screens, ribbons, masks) instead of on top of it.
   (`style-playbook.md` §6)
8. **The most-copied devices:**
   - inline media inside a sentence;
   - serif-italic emphasis inside a sans sentence;
   - count-up and count-down numbers;
   - a cursor that drives the edit;
   - a logo built from primitives;
   - transformations from material to product;
   - split words around a subject.
   (`motion-techniques.md`, `style-playbook.md` §5–6)

## 3. What was built from it

| Asset | Where | What it does |
|---|---|---|
| 13 styles with numbers, palettes, type, moves, variations and pitfalls | `docs/research/style-playbook.md` | Choose and direct a look |
| 39 moves with Remotion code, colour, type, timing, a glossary and Claude briefs | `docs/research/motion-techniques.md` | Build a look |
| Every style built 3 ways (code only / AI plates / design-first) | `docs/research/production-routes.md` | Pick a route |
| AI video method: model choice, cost, switching, keyframes, consistency, genres, Freepik/Magnific | `docs/research/ai-video-production.md` | Make AI shots cheaply and consistently |
| Model catalog + shot types | `research/models.json` | Data behind the router |
| Router | `motion-kit/scripts/route.mjs` (`npm run route --provider higgsfield\|magnific\|local\|free`) | Shot list → models, pipeline steps, relative cost |
| Open-model picks | `docs/research/free-open-models.md` | Best free video / voice / music / SFX models by blind arenas and listening tests, licences, VRAM |
| One-command pipeline | `motion-kit/scripts/produce.mjs` (`npm run produce -- specs/productions/x.json --tier free\|local\|mcp`) | Production file → voices, plates, music → job sheet for what is missing → rendered MP4 with free stand-ins |
| Free audio | `motion-kit/tools/cast_voices.py`, `sfx_synth.py`, `music_bed.py` | Multi-voice cast with phone filter, 17 synthesized story SFX, 4 synthesized music moods (CPU only) |
| Plates importer | `motion-kit/scripts/plates.mjs` (`npm run plates`) | Generated files → `public/plates/`, checked |
| 5 `style-*` recipes | `motion-kit/specs/recipes/` | Ready storyboards (pass check and QA) |
| Skills | `skills/motion-director`, `skills/motion-creative-director`, `skills/motion-ai-studio` | Render with code; plan concepts and prompts; run both routes |

## 4. Rules to apply on every video (short form)

1. **Pick the style first.** It sets shot length and brightness (`style-playbook.md` §1, §4).
2. **Structure:**
   - Hold the opening (hook on screen, but no flurry of cuts).
   - Put the busiest beats about a third of the way in.
   - Slow the last tenth and hold the end card at least 1.5 s.
3. **Colour and type:**
   - One accent colour.
   - Saturation moderate.
   - Small type, with one idea per beat.
4. **Exact things come from code; everything else can be generated.** Text, numbers, logos and UI are always code.
5. **Generated shots:**
   - Stills first.
   - Draft cheap, finish on the first-choice model.
   - One camera move per 3–5 s clip.
   - Preflight cost, and get the user's yes.
6. **Consistency:**
   - Keep a series bible.
   - Use Elements for characters, products and worlds.
   - Keep one fixed voice per character.
   - Run a continuity check between shots and episodes.
7. **Honesty:**
   - Real facts only.
   - `generated: true` on AI footage.
   - No generated people presented as real customers.
   - No generated "archival" footage presented as history.

## 5. Open questions and next steps

- **Free tier upgrades that need Hugging Face access** (blocked in the cloud container): goonj-1-82M (Hindi Kokoro fine-tune, CPU) as a drop-in Hindi voice, Supertonic-3 (CPU, ONNX) and Stable Audio 3 Small (CPU music and SFX). Wire them in once a machine can download them, and judge them by ear first.
- **Local tier not yet run on a GPU:** the picks in `free-open-models.md` are researched, not tested here.
- **YouTube:** needs the `YT_COOKIES` secret from the repo owner.
- **Freepik / Magnific MCP:** connect it, list its tools, and replace the `unverified` entries in `research/models.json`.
- **Higgsfield:** run a real model list (`models_explore`) and cost preflights, and record actual relative costs in `models.json`. The user stopped these calls on 2026-10-10, so they haven't been run.
- **Kit gaps** (`style-playbook.md` §5): inline media in sentences, logo reveal moves, cursor UI interactions, tilted UI glide, a line chart that draws, a mesh gradient background.

## 6. How to resume in a new session

1. Read this file, then the file named in the task.
2. Look at the newest commit on `research-results` (`summary.csv`, `failures-latest.txt`) for the current data.
3. The private key for the encrypted contact sheets is **not** in the repo. Without it, work from the notes files and the numbers.
