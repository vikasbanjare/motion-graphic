---
name: motion-ai-studio
description: Make a motion-graphics video in one of two ways. Route 1, Claude Code only, is free with a Claude subscription: type, UI, charts, orbs and logo moves rendered by motion-kit. Route 2, AI plates, connects an AI image/video tool over MCP (Higgsfield, which also serves Seedance, Kling, Veo and more) or any tool the user has, generates the 3D, product, character, texture and cinematic shots code cannot draw, and composites them with exact code-rendered text. Also covers realistic and story video: performance-marketing / UGC ads, short films, and short series with consistent characters, products and voices. It picks a model per shot (npm run route), keeps credits low (stills first, cheap drafts, keyframes) and switches models mid-shot when one does a step better. Use whenever someone wants a video "with AI images/video", "using Higgsfield / Seedance / Kling / Veo / Freepik / Magnific", "with 3D or realistic shots", an ad, a story, a series or a character that must stay the same, or asks which model or route is cheapest.
---

# Motion AI Studio

One brief, two ways to make it. Pick the route with the user in one question, then run it
end to end. The look comes from the 13 styles in `docs/research/style-playbook.md`; this skill
decides **where each shot comes from**.

| | Route 1: Claude Code only | Route 2: AI plates |
|---|---|---|
| Makes | Type, UI cards, cursor demos, charts, counters, orbs, gradients, logo moves, transitions | Everything in Route 1 **plus** 3D products, clay/glass objects, characters, worlds, textures, cinematic B-roll |
| Needs | Claude subscription + this repo (Node 22, ffmpeg) | Route 1 + an AI tool connected over MCP (Higgsfield) **or** any AI image/video tool the user can use by hand |
| Costs | Nothing beyond Claude | The tool's credits; free-trial generations where the tool offers them |
| Engine | `motion-director` skill → motion-kit | This skill → plates → motion-kit |

**The rule for both:** anything that must be exact is rendered by code: text, numbers, logos,
UI, the cursor, charts. AI generates only what code cannot draw: objects, people, places,
light, texture. Never ask a generator for readable words or a real logo; they come out wrong.

## Step 0: Read first (once per session)

- `docs/research/style-playbook.md`: the 13 styles, measured shot lengths, what the kit does.
- `docs/research/production-routes.md`: every style × route, with plate prompts.
- `skills/motion-director/SKILL.md` and its `references/scenes.md`: the spec format. Never invent fields.
- `references/plates.md` (this skill): prompt shape, model choice, consistency, cost.
- `docs/research/ai-video-production.md`: model choice by shot type, cost-saving habits, model switching, keyframes / frame-by-frame, the series bible (characters, products, worlds, voices), genres, Freepik / Magnific.
- `docs/research/RESEARCH-REPORT.md`: the one-page summary of all research. Read it first if context was lost.

## Step 1: Pick the route (ask once, with a recommendation)

Ask which tools they have, unless they already said. Then recommend:

- **Route 1** when the story is type, UI, numbers or a logo (styles 2 Whitespace UI, 3 Kinetic,
  4 Editorial, 5 Orb, 6 Neon, 11 Logo sting, 12 Data) **or** they have no AI-tool subscription.
- **Route 2** when the story needs things code cannot draw: style 7 3D product, 8 Collage
  objects, 9 Cinematic or archival look, 1 Dark launch with volumetric light, or "realistic" shots.
- **Both**: build Route 1 first (free, fast), then upgrade 2-4 shots with plates. The spec stays
  the same; only `image` / `clip` scenes are added or swapped. This is the best default when unsure.

Say the cost plainly: Route 1 is free; Route 2 spends their credits. Never spend credits
without a yes.

## Route 1: Claude Code only

Hand over to the `motion-director` skill and follow it fully. Start from the closest recipe,
including the `style-*` recipes (`npm run new` lists them). Free extras that stay in Route 1:
- Voice-over: `npm run voice -- specs/x.json --engine kokoro` (offline, free) or `--engine edge`.
- Story ads with several speakers (IVR, customer, agent, narrator) and phone sounds:
  `python3 -I tools/cast_voices.py specs/casts/x.json` (offline Kokoro voices per beat, telephone
  filter, synthesized ringback / DTMF / pickup / chime / night ambience). It writes the same
  voiceover and timing files as `npm run voice`. Example: `specs/casts/sarvam-samvaad.json`.
- Music: a licensed track the user owns, via `npm run music`.
- Logo colours: `npm run brand -- public/brand/logo.png --spec specs/x.json`.
- Their own screenshots, photos and screen recordings, as `image` / `clip` scenes.

## Route 2: AI plates

### 2.1 Plan the plates

1. Write the spec first, exactly as Route 1 would (the story must work with text alone).
2. Decide which beats get a plate: usually 2-5, never the text-heavy ones. Typical plate
   beats are the opener's background, the product hero, one or two B-roll moments, and a
   texture behind the CTA.
3. Write `motion-kit/specs/<name>.plates.json`, one entry per plate:
   `{ "id", "kind": "image"|"video", "prompt", "aspect": "16:9"|"9:16"|"1:1", "seconds"?, "from"? }`.
   `from` names the image plate a video plate animates (image-to-video).
   Use the prompt shape and per-style starters in `references/plates.md`. Every prompt ends
   with "no text, no logos, no watermark".
4. Show the user the plate list with an estimated cost (Step 2.2) before generating anything.

### 2.1b Pick models and estimate cost

Write the plate list as a shot list (`specs/<name>.shots.json`, shot types from `research/models.json`) and run:

```bash
cd motion-kit && npm run route -- specs/<name>.shots.json --budget balanced   # low | balanced | best
```

It prints per shot: the pipeline (stills-first, first-last-frame, element-then-stills, still-then-cutout, motion-transfer or a Higgsfield workflow), the image, video, voice and finish models, the expected generations, and relative cost units. Show the user the low and best totals, then preflight the real cost of the chosen plan.

For anything with a recurring character, product or place, write `specs/<series>.bible.json` first (`ai-video-production.md` §6) and create the Elements before any shot.

### 2.2 Generate: with an AI tool connected over MCP (Higgsfield)

Check what is connected: tools named `mcp__higgsfield__*`. Higgsfield gives access to many
models, including Seedance (`seedance_2_5`), Kling (`kling3_0`) and its own image models, so
one connection covers image, image-to-video, cut-outs and upscaling.

1. **Balance and models.** Call `balance`. Use `models_explore` (`action: "recommend"`, with the
   goal and input type) to pick models. Defaults: image `gpt_image_2_5`; product or ads
   `marketing_studio_image`; video from a still `seedance_2_5`; multi-shot or motion
   `kling3_0`. Use `models_explore` `get` for each model's aspect ratios and durations.
2. **Cost first.** Call `generate_image` / `generate_video` with `get_cost: true` for each
   plate. Total it and ask the user. If the server answers with `unlim_choice` (free-trial
   generations available), put that question to the user as asked. Never set `use_unlim`
   on your own.
3. **Stills first.** Generate the image plates. Use `generate_image_batch` for 2-12 different
   prompts, then wait with `jobs_wait`. Show them with `show_generation_by_ids` and let the
   user pick or ask for a re-roll. Keep each plate's `job_id`.
4. **Then motion.** For each `kind: "video"` plate, call `generate_video` with the approved
   still as `medias: [{ value: <job_id>, role: <the model's image role> }]`. Write one camera move
   in plain words and set `duration` to 3-5 s. Wait with `jobs_wait`.
5. **Cut-outs.** For collage or floating objects, call `remove_background` on the job id.
6. Copy each result URL into its plate's `url` in `<name>.plates.json`.

On a transport timeout, never resubmit blindly. Check the returned job ids first.

**Switching models mid-shot** is normal: a cheap draft still, then the final still on the first-choice model, then an edit pass for hands and props (`nano_banana_pro`), then animation, then upscale. Use the symptom → model table in `ai-video-production.md` §4. For exact poses or transformations, use keyframes: each keyframe is an edit of the previous one, and a first-last-frame model fills the gaps (§5).

**Freepik / Magnific over MCP:** if connected, list its tools first and update `research/models.json` (its entries are `unverified` until then). Use Magnific mainly as the finish step (creative upscale, relight, style match) on approved stills.

### 2.3 Generate: without MCP (any tool, by hand)

Print the plate list as a numbered checklist: prompt, aspect, duration, and which still
each video starts from. The user generates them in their tool and saves the files. They then
set each plate's `file` to the saved path (or `url` to a direct link). Everything from 2.4 on
is the same.

### 2.4 Bring plates into the video

```bash
cd motion-kit
npm run plates -- specs/<name>.plates.json      # downloads/copies into public/plates/<name>/, checks each file
```

Put each plate's printed `src` into its scene:
- Still → `{ "type": "image", "src": "plates/<name>/hero.png", "fit": "cover", "move": "in", "caption": "…" }`
- Clip → `{ "type": "clip", "src": "plates/<name>/orbit.mp4", "generated": true, "caption": "…", "area": "bottom", "scrim": 0.4 }`

`generated: true` is required on AI footage (it adds the small "AI-generated" tag). Keep the
text in the caption or in the next native scene, never inside the plate. Then run
`npm run check` and `npm run qa` until clean, and render as `motion-director` describes.

### 2.5 Consistency

- One look per film: the same lighting phrase, lens, palette words and material words in
  every prompt. Store them once at the top of `<name>.plates.json` as `"bible"` and paste them
  into each prompt.
- The same product or character across shots comes from the same reference image: generate
  the hero still once, then pass its job id as a reference in later prompts.
- Upscale plates under 1080 px before rendering (`npm run plates` warns).

## Being honest about free

- Route 1 needs nothing but a Claude subscription and a computer. motion-kit, Remotion
  rendering, the Kokoro and Edge voices and the QA tools are free.
- Route 2 always runs on the AI tool's own plan. Free trials, daily free generations and
  "unlimited" allowances vary by tool and change often. Read them from the tool (`balance`, the
  `unlim` fields), never promise them.
- If the user has neither credits nor a trial, deliver Route 1 and the plate prompts so they
  can add plates later. The spec is ready for them.

## Hard rules

1. No credits are spent without the user's yes on a stated cost.
2. No readable text, numbers or real logos inside generated plates.
3. No generated people presented as real customers, founders or testimonials, and no
   generated "archival" footage presented as history. Use `generated: true`.
4. Real facts only, as in `motion-director`. Plates illustrate; they never prove a claim.
5. `npm run check` and `npm run qa` must be clean before render, as in Route 1.
