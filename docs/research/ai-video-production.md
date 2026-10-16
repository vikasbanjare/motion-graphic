# AI video production: choosing models, saving credits, keeping characters consistent

This is the working method for every AI-generated shot this repo makes: motion graphics plates, product films, performance ads, story videos, short series and films. It covers four things:
- choosing the model for each shot;
- spending as little as possible;
- switching models mid-shot when one does a step better;
- keeping characters, products and voices identical across shots and episodes.

The machine-readable part is `research/models.json` (model catalog plus shot types). `npm run route` in `motion-kit/` turns a shot list into a model plan with relative costs.

> [!IMPORTANT]
> **How sure this is.**
> - **Higgsfield model ids and capabilities** come from Higgsfield's own MCP tool descriptions, read in this repo's sessions. These are the image, video, audio, reference-element, upscale and cut-out tools.
> - **Freepik and Magnific are unverified.** That MCP was not connected in any session here. Treat those entries as placeholders until the connected tool's own list confirms them.
> - **Prices are never written down.** Every cost below is a relative tier. Real cost comes from the tool's preflight: on Higgsfield, `get_cost: true`.

## 1. The core rule: code for exact things, AI for everything else

| Must be exact → **code** (motion-kit, Route 1) | Can be generated → **AI** (Route 2) |
|---|---|
| Text, prices, numbers, dates | People, characters, faces |
| Logos, brand marks | Products in a scene, materials, textures |
| UI screens, cursor, charts | Places, worlds, weather, light |
| Captions, subtitles, end cards | Camera moves through all of the above |

Generators still misspell words and redraw logos. So every film is built as **generated plates plus code-rendered text**, and the reference films do the same. In the Motion Design Awards set, 57% of entries are 3D product films with the type composited on top (`style-playbook.md` §6).

## 2. Choosing a model: shot type first, then budget

Never start from "which model is best". Start from **what the shot needs**, and let `research/models.json → shots` map it to a pipeline:

| Shot type | Pipeline | First-choice image → video (Higgsfield) | Why |
|---|---|---|---|
| Product hero | stills-first | `marketing_studio_image` → `seedance_2_5` | The commercial image model gets materials and packaging right; Seedance gives smooth, simple camera moves |
| Product transformation (material → product) | first-last-frame | `marketing_studio_image` + `nano_banana_pro` (edit for the end frame) → `minimax_h3` | The keyframe model interpolates between two fixed frames, so start and end stay exact |
| Abstract material / texture | stills-first | `gpt_image_2_5` / `seedream_v4_5` → `seedance_2_5` | Cheap, and no consistency is needed |
| Character introduction | element-then-stills | `cinematic_studio_2_5` → `cinematic_studio_video_v2` | Both honour reference Elements, with a film look |
| Dialogue / acting | element-then-stills | `cinematic_studio_2_5` → `kling3_0` or `cinematic_studio_3_0` | Kling for people, gestures and audio. **It needs a start image to use an Element** |
| Action | element-then-stills | `cinematic_studio_2_5` → `kling3_0` | Better body motion |
| UGC / creator talking head | `ugc-video` workflow | `soul_2` → `marketing_studio_video` / `kling3_0` | Use Higgsfield's bundled workflow; don't hand-roll it |
| Ad variants (swap product, cast or market) | `ad-multiplier` workflow | `hf_mult_replace_object` | Edits a proven ad instead of regenerating it |
| Dance / gesture copy | motion-transfer | `hf_mult_motion_control` | Copies motion from a driving video |
| Cut-out object for collage or inline media | still-then-cutout | `gpt_image_2_5` → `remove_background` | Then animate it in code |
| UI, text, numbers, logo | **code** | none | Route 1 |

**Budget changes the plan, not the shot type:**
- **low:** the cheapest usable model in the list, one still, no re-roll.
- **balanced:** draft stills on the cheapest model, the final still on the first choice, and one video re-roll.
- **best:** three stills, the first-choice model and two re-rolls.

`npm run route -- specs/examples/series-ep1.shots.json --budget low` gives about 30 units for a 6-shot, 30 s story ad. The same list at `--budget best` gives about 84 units. That's a ~2.8× spread for the same storyboard.

## 3. Spending less: the habits that save the most

1. **Stills first, always.** A still costs a fraction of a clip. Lock composition, light and character on stills, then animate only the approved ones. This is the biggest single saving.
2. **Draft cheap, finish expensive.** Explore on `nano_banana_2` or `seedream_v5_lite` (cost tier 1). Regenerate only the winner on the first-choice model.
3. **One camera move per clip, 3–5 s.** Longer clips and compound moves fail more often, and every failure is a paid re-roll. Cut between short clips instead. The reference films hold a median 3.9–4.8 s per shot anyway (`dataset.md`).
4. **Ask for the duration you'll use.** A 4 s beat needs one 5 s clip, not a 10 s one.
5. **Preflight every call** (`get_cost: true`). Show the user the total before spending. Batch tools cannot preflight, so preflight one item and multiply.
6. **Free allowances belong to the user.** When Higgsfield returns `unlim_choice`, put the question to the user. Never set `use_unlim` yourself.
7. **Reuse, don't regenerate.**
   - Pass a prior `job_id` as a reference.
   - Reuse Elements across episodes.
   - Edit a frame (`nano_banana_pro`) instead of re-prompting from scratch.
8. **Fix in the cheap layer.** Wrong text or a logo glitch? Cover it in code. Wrong colour grade? Grade in the compositor. Don't re-roll a clip for things code can fix.
9. **Upscale last, and only what's kept.** Upscale the final stills before animating. Upscale video only on the final cut.

## 4. Switching models mid-shot (when and how)

One shot can pass through several models. Each step uses the model that is best at that step:

```
draft still (cheap) ─► final still (quality) ─► edit pass (fix hands / props) ─► animate (video model) ─► upscale / cut-out
   nano_banana_2         cinematic_studio_2_5      nano_banana_pro                   seedance / kling           upscale_image / remove_background
```

When to switch:

| Symptom | Switch to |
|---|---|
| Face drifts between shots | An Element-aware model (`cinematic_studio_*`, `seedance_2_0`, `nano_banana_*`, `seedream_*`, `gpt_image_2`) with the same `<<<element>>>` |
| Hands, props or small parts wrong in an otherwise good still | Edit pass on `nano_banana_pro` with the still as reference; don't re-roll |
| Motion is stiff or bodies warp | `kling3_0` (people and action) with the still as start image |
| Start and end must be exact (transformations, logo reveals) | `minimax_h3`, keyframes / first and last frame |
| Camera move is wrong but the content is right | Same still, same model, rewrite only the camera sentence |
| Text or logo garbled | Don't regenerate; composite it in code |
| Needs more detail at the end | `upscale_image` / `upscale_video`, or Magnific-style creative upscale (Freepik, when connected) |

## 5. Frame by frame: keyframes, then interpolate

For shots that must hit exact poses or compositions (title cards, transformations, product turns, matched cuts), don't prompt video from text:

1. **Write the keyframes:** one still per pose or composition, about every 2–4 s of screen time.
2. **Generate keyframe 1.** Make every later keyframe as an **edit of the previous one** (`nano_banana_pro`, reference = the previous `job_id`). Light, lens and character carry over.
3. **Animate pairs.** Use a first-last-frame / keyframe video model (`minimax_h3`) between keyframes *n* and *n+1*, or image-to-video from each keyframe with a short move (`seedance_2_5`).
4. **Join** the clips in motion-kit as consecutive `clip` scenes with `transition: "cut"`. Or let the end frame of one clip be the start frame of the next (seamless).
5. **Stylised "on twos" look** (paper, stop-motion, collage): skip video models. Generate 8–12 stills and play them as a stepped sequence in code. It's cheaper and exactly controllable.

## 6. Consistency: characters, products, voices, worlds

What breaks a series is drift: a face, outfit, product colour or voice changing between shots. Prevent it with a **series bible**, a file kept next to the specs (`specs/<series>.bible.json`):

```json
{
  "characters": {
    "mira": { "element_id": "<from manage_reference_elements>", "look": "late 20s, short black bob, round glasses, mustard knit sweater", "voice": { "model": "seed_audio", "voice_type": "element", "voice_id": "<voice element>" } }
  },
  "products": { "bottle": { "element_id": "<id>", "notes": "matte white glass, blue embossed logo; logo is composited in code" } },
  "worlds":   { "studio": { "element_id": "<id>", "light": "soft key upper left, warm rim", "lens": "50mm, f/2.8" } },
  "look":     { "palette": "deep navy, mustard, cream", "grain": "fine film grain", "grade": "warm highlights, teal shadows" }
}
```

1. **Characters.** Make one clean reference image (front, neutral light), then `manage_reference_elements` `create` (category `character`). From then on, every prompt that shows them includes `<<<element_id>>>`.
   - Use only Element-aware models (`models.json → elements: true`).
   - `kling3_0` also needs a start image.
   - For a person who appears in many images (a brand ambassador), a trained Soul (`soul_2` + `soul_id`, from 5–20 photos) is the stronger option. Only do that with explicit permission.
2. **Wardrobe and props.** Write them into the bible's `look` and paste them verbatim into every prompt. Elements hold the face; text holds the outfit.
3. **Products.** Create a product Element from a clean packshot. The logo and label text are always composited in code.
4. **Worlds.** Create an environment Element for recurring locations. Fix one lighting sentence and one lens per world.
5. **Voices.** Pick one voice per character and keep it in the bible:
   - a `seed_audio` preset voice;
   - a cloned voice element (only with the owner's consent);
   - a free kit voice: Kokoro or Edge via `npm run voice`.
   Generate lines per beat so timing can be re-cut.
6. **Continuity check before each episode.** Line up the last frame of episode *n* and the first of *n+1*. Compare face, outfit, palette and light; fix drift with an edit pass before animating.

## 7. Genres

| Genre | Structure (from the reference study) | Route mix | Notes |
|---|---|---|---|
| **Motion graphics / SaaS launch** | Hold the opening about 4 s, busiest beats about a third in, still end card about 1.6 s (`dataset.md`) | Mostly Route 1 plus 1–3 plates (orb, material, light) | `style-*` recipes |
| **Premium product film** | One material, one hue, transformation shots, type inside the world (`style-playbook.md` §6) | Route 2 plates (stills-first, first-last-frame) + code type | Award set: 57% of entries |
| **Performance marketing / UGC ad** | Hook in 0–2 s, problem, product in use, proof (real number), offer, CTA; 15–30 s; several variants | Higgsfield `ugc-video` / `ads-studio` / `ad-multiplier` workflows; motion-kit for captions, price, CTA | Test 3–5 hooks on the same body; swap products with `hf_mult_replace_object` |
| **Story video / short film** | Establishing shot, character intro, want, obstacle, turn, resolution, title | element-then-stills for every character shot; Kling / Cinema Studio for acting | Write the bible before shot 1 |
| **Short series** | Same as story, plus a cold open and a recurring title card | Bible + Elements + fixed voices; motion-kit title card and episode number | Continuity check between episodes |
| **Explainer / documentary** | Archival-style plates + captions + data | Route 2 plates labelled `generated: true`; Route 1 charts | Never present generated "archival" as real history |

## 8. Freepik and Magnific (when connected)

Freepik's AI suite includes image and video generation and the Magnific tools: creative upscaling, relighting and style transfer. Until its MCP is connected and listed, treat this section as a plan:

1. **First call:** list the tools. Record each tool's model choices, inputs, reference/character options and cost or preview fields. Then update the `freepik` entries in `research/models.json` and remove `unverified`.
2. **Likely best use:** the **finish** step. Run Magnific creative upscale / relight / style transfer on the approved stills (from any generator) before they go to a video model. This adds detail and matches light across shots generated by different models.
3. Treat any Freepik video models like Higgsfield's: stills-first, one move per clip, and preflight the cost.

## 9. Quality gate before a plate goes into the video

- No text or fake logos anywhere in the frame.
- Hands, faces and edges are clean.
- The same character, outfit and product as the bible.
- Light direction and palette match the neighbouring shots.
- There is room left for the caption where the scene puts it.
- At least 1080 px on the long side.
- AI footage carries `generated: true` in its `clip` scene.
- `npm run plates`, `npm run check` and `npm run qa` are all clean.

## 10. How the pieces fit

```
brief ─► style (style-playbook.md) ─► shot list (specs/<name>.shots.json)
      ─► npm run route  (model + pipeline per shot, relative cost)
      ─► preflight real cost ─► user says yes
      ─► generate stills → edit → animate → finish   (Higgsfield / Freepik MCP, or by hand)
      ─► npm run plates  (into public/plates/<name>/)
      ─► motion-kit spec: plates in image / clip scenes + code text, captions, logo, CTA
      ─► npm run check · npm run qa · voice · music · render
```
