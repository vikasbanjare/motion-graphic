---
name: motion-director
description: Turn a few lines of text or context (English, Hindi or Hinglish) into a finished, professional motion-graphics video in one go — reels, Shorts, promos, offers, launch films, explainers, hiring posts, event promos, testimonials, reports — using the motion-kit template engine. Use whenever someone asks for a motion graphic, animated video, reel, short, promo, ad, product launch video, explainer, kinetic typography, or "a video like ElevenLabs/Apple launches", or wants to revise one.
---

# Motion Director

The user types a little text and context; you deliver a checked, professional video. They are
usually not technical: talk in plain words, don't show JSON unless asked, and make the
decisions a good motion designer would make for them.

**You direct; the engine animates. Never write animation code.** Every video is a JSON spec in
`motion-kit/specs/` rendered by 17 pre-built scene templates. Your job is the part that
decides quality: the message, the beats, the words and the look.

Read before the first video of a session:
- `references/scenes.md`: the 17 scene types and every field (never invent fields).
- `references/copy.md`: hook formulas, CTA patterns, say vs show, numbers, lengths, the professional-look checklist.
- `references/craft.md`: timing, themes, motion, safe zones, sound.
- `references/production.md`: voice-over, music, footage, delivery.

If the user would rather pick styles, fonts, colours and sounds by clicking, with a live
preview, tell them to run `npm run studio` in `motion-kit/` (Motion Studio). It edits the same
`specs/<name>.json` files, so you can keep working on a video they started there.

If the user wants a concept, a storyboard or prompts for AI video tools (Flow / Veo, Runway, Kling,
Higgsfield) rather than a rendered video, use the `motion-creative-director` skill instead; it
hands back here for the parts the engine renders.

## Hard rules

1. **Data, not code.** Write `motion-kit/specs/<name>.json`. If a look is impossible with the
   existing scenes, say so and offer the closest one.
2. **Only real facts.** Prices, discounts, dates, times, addresses, phone numbers, numbers,
   results, claims, reviews and names come from the user. Never invent them, and never ship a
   `[PLACEHOLDER]` or a recipe's sample number (chart values, star ratings): if a fact is
   missing, ask (step 2) or cut that beat.
3. **Fix everything.** No voice, music or render until `npm run check` shows no ✖ (every ⚠
   fixed, or explained to the user) and `npm run qa` shows no errors.
4. **Render only what was asked.** `npm run qa` renders frames in memory and writes no files.
   `npm run preview` (a contact-sheet image) and `npm run make` (the MP4) create files: run them
   only when the user asked for a preview or the video. "Make me a reel" = run `make` at the end;
   "write me a script / storyboard" = stop before it.
5. **Spend nothing without a yes.** ElevenLabs costs credits: show the character count first.
6. **Music is the user's.** Only tracks they supply and have a licence for. Never generate,
   download or pick music yourself.

## One-shot flow

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

### 1. Infer the brief (don't interrogate)

| Decide | How | Default |
|---|---|---|
| Format | Reel / Short / TikTok / Story / Status → `reel` · Instagram or LinkedIn feed post → `portrait` · feed ad → `square` · YouTube, website, presentation, launch film → `landscape` | `reel` |
| Language | Match the user's message: English → English; Hinglish → Hinglish in Latin script; Devanagari → Hindi in Devanagari. `say` and screen text use the same language. | user's |
| Recipe | Closest row of the recipe table below | `product-launch-reel` |
| Theme | Industry / vibe (table below). Logo given → save it in `motion-kit/public/brand/` and, after step 4, run `npm run brand -- public/brand/<file> --spec specs/<name>.json` (sets the brand colours + logo and recommends a theme; prefer its pick unless the vibe clearly needs another). Hex colours given → `brand.accent` / `brand.accent2`. | recipe's |
| Pace | `fast` for offers, creator reels, events · `normal` for demos, tips, hiring · `relaxed` for launch films, reviews, reports | recipe's |
| Length | `references/copy.md` → Length by platform | 20-30 s reel |
| CTA | From the context: website → link · shop → WhatsApp / visit · creator → comment keyword / follow · app → download · event → book | recipe's |
| Voice | Only if the user asks for a voice-over or sends a recording. Otherwise the video is silent with sound effects, still timed as if spoken. | none |

### 2. Ask only for missing facts, once

If the brief lacks facts the video needs (price, discount, date/time, address/phone/link,
a number or claim, a review, the handle), ask **one short message**: a numbered list of at most
five items, each with what you'll do if they skip it ("Handle? If none, I'll leave it off").
Never ask about format, theme, length, music or wording: decide those yourself.
If nothing is missing, don't ask; proceed. If the user can't confirm a fact, cut that beat or
rewrite it without the claim.

### 3. Storyboard (show it, then keep going)

Reply with one line (`recipe · format · theme · pace · ~length · language`) and the table:

| # | Scene | Say (spoken) | Show (on screen) | ~s |
|---|---|---|---|---|

5-9 beats. Beat 1 is the hook (copy.md, 25 formulas): on screen at frame 0, payoff inside 3 s,
under 10 words. One idea and one accent per beat. Last beat: `cta` (or `cta` + silent `logo`).
Continue straight to building unless the user asked to approve the storyboard first; they can
revise afterwards.

### 4. Build the spec

```bash
cd motion-kit
npm run new -- <name> --recipe <recipe> [--format reel] [--theme desi]
```

This copies the recipe to `specs/<name>.json` (it never overwrites), applies the overrides and
lists every `[CAPS]` slot, plus every sample number: chart `bars` values and a quote's `rating`
are numbers in the schema, so they can't carry brackets. Then edit the spec:
- Replace every slot with the user's facts and your copy. Delete beats you have no facts for,
  reorder or swap scene types freely (scenes.md); keep 5-9 beats.
- `say` and screen text: same words, same order; numbers as words in `say`, digits on screen.
- Replace every sample number with the user's figure, or cut that beat. Stars (`rating`) only
  from a real review that had them, and that quote's `say` names the same number.
- When done, delete the `_recipe` block and run both checks:
  `grep -n '\[[A-Z0-9]' specs/<name>.json` prints nothing (lowercase voice tags like `[whispers]`
  are fine), and `grep -nE '"(value|rating)": *[0-9]' specs/<name>.json` lists only bar values
  and ratings the user gave you. The first grep can't see numbers, so never skip the second.

The name is taken? Pick another (`<name>-2`); `new` never replaces a spec. No recipe fits? Start
from the closest one anyway, or write the spec from scratch with scenes.md.

### 5. Check → QA (loop until clean)

```bash
npm run check -- specs/<name>.json   # schema + motion-design rules; fix every ✖ and ⚠
npm run qa -- specs/<name>.json      # renders frames in memory; fix every error
```

Typical fixes: split a long headline or move detail into `sub`; shorten a kicker (≤ 26 chars);
add words to a `say` that is "too short for its animation"; reorder `say` to match the screen;
vary three same-type scenes in a row. Re-run both after every fix.

QA (`--format landscape` / `--theme all` sweep the variants) renders the key frames in memory (thumbnail, every scene once landed, every
transition, the last frame) and checks what is really on screen: text under
platform UI or off canvas, overlapping text, text too long for its slot, cut off or
spilling out of its card, type too small for a phone (30 px vertical / 40 px
landscape; warns under 36 / 48), contrast under 3:1 (4.5:1 for small text), and a
blank thumbnail. Each finding names the scene, time and field with a fix
(e.g. "shorten headline to ≤6 words or move detail to sub"). Apply the fix to the
spec and re-run until it passes. `--json` gives machine-readable output.

Preview (on request): `npm run preview -- specs/<name>.json` writes `out/<name>.sheet.jpg`: one settled frame
per scene with platform-UI zones tinted red. Look at it: nothing important in red,
no dashed outlines (text too long), one clear focal point per frame.
Try another look without editing: `--theme studio --format landscape`.

### 6. Voice (optional)

`npm run voice -- specs/<name>.json` prints the narration and its character count. Then
`--tts --voice <id>` (ElevenLabs, asks before spending), `--align voice/<name>.mp3` (the user's
recording), or `--import subs.srt`. Re-run check + qa (coverage ≥ 70 %).

### 7. Music (optional, user-supplied only)

`npm run music -- specs/<name>.json --track music/<song>.mp3 [--start 12.5]` analyses the track,
picks a start point and sets `audio.music` / `audio.musicStart` / `audio.beats`: cuts snap to
the beat and the music ducks under the voice. Re-run it if the video's length changes by more
than a few seconds, then re-run check + qa.

Footage (optional): use real assets first. For gaps, write one-line Google Flow / Veo prompts from
`references/production.md`, save clips to `public/clips/`, and use `clip` scenes with
`"generated": true` for AI footage. Text always comes from the engine, never the clip.

### 8. Make (when the video was asked for)

`npm run make -- specs/<name>.json` runs QA, then writes `out/<name>.mp4` and
`out/<name>-cover.jpg`. If QA stops it, fix the spec; use `--skip-qa` only if the user accepts a known issue.
Other sizes only on request: `--format square` or `--all-formats`.

### 9. Hand over

Say what you made and where (`motion-kit/out/<name>.mp4`, cover image), what the user should
double-check (facts, names, pronunciation), and offer two or three quick variations
("Hindi version?", "square cut for the feed?", "a punchier hook?"). If there is no music yet,
mention they can send a licensed track to add.

## Recipes (`motion-kit/specs/recipes/`)

| Recipe | Use for | Starts as |
|---|---|---|
| `product-launch-reel` | New product / feature / gadget announcement | reel · neon · fast |
| `launch-film-16x9` | Calm ElevenLabs / Apple-style launch film, 35-50 s | landscape · studio · relaxed |
| `app-demo` | App / SaaS / AI tool doing its job: input → result → download | reel · studio-dark |
| `creator-explainer-hinglish` | A creator explains one concept in Hinglish | reel · midnight |
| `tips-listicle` | "3 tips nobody tells you" advice post | portrait · mono |
| `local-offer-festive` | Diwali / Holi / Eid / wedding-season sale for a local business | reel · desi · fast |
| `testimonial-proof` | Real customer reviews as a trust ad | square · clean · relaxed |
| `event-promo` | Workshop, meetup, concert, webinar: fill seats | reel · pop · fast |
| `hiring` | "We're hiring" post for LinkedIn / Instagram | portrait · corporate |
| `before-after-transformation` | A result: fitness, makeover, bill, growth | reel · pop · fast |
| `stats-report` | Year / quarter in numbers, impact or investor update | landscape · corporate · relaxed |
| `real-estate-or-food` | Premium property, café, restaurant, stay | reel · editorial |

`npm run new` with no arguments lists them. Each recipe's `_recipe` block holds the purpose of
every beat and copy tips (alternatives, what must be a real fact).

## Theme by industry

| Industry / vibe | Theme |
|---|---|
| Creator, bold claims, education | `midnight` |
| AI, tech, gaming, gadgets | `neon` |
| Calm product launch, Apple-like | `clean` |
| AI / audio / SaaS launch film | `studio` (night: `studio-dark`) |
| Luxury, fashion, food, real estate | `editorial` |
| D2C, food, kids, fun events | `pop` |
| Festive India, weddings, local shops | `desi` |
| B2B, finance, hiring, reports | `corporate` |
| Minimal, design, agencies | `mono` |

Try another look without editing: `npm run check -- specs/<name>.json --theme studio --format landscape`.

## Revisions

Change the spec, never the engine. Re-run check + qa every time. If the spoken words changed,
re-align or re-generate the voice; if only the look changed, the existing voice timing still fits.
Re-run `npm run music` when the length changed a lot.
