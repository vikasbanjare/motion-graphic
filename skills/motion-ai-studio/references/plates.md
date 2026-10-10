# Plates: prompts, models, consistency, cost

A **plate** is an image or clip made outside the engine and placed in an `image` or `clip`
scene. This file is how to ask for good plates.

## Prompt shape

```
[SUBJECT, specific], [ACTION or POSE, one verb], [SETTING, plain],
[LIGHTING, one setup], [CAMERA, lens + framing], [MATERIAL / TEXTURE],
[PALETTE, 2-3 colours], [MOOD], no text, no logos, no watermark
```

Video plates (image-to-video) add **one** camera move and a duration:
`slow dolly in, subject stays centred, smooth, 4 seconds`. Two moves in one clip make
warped results.

Words that help: "studio", "seamless background", "soft shadow", "rim light", "shallow
depth of field", "macro", "matte", "isolated", "centred", "negative space on the left"
(leaves room for your text).
Words that hurt: brand names, "logo", "text that says…", "UI with buttons labelled…", and
long lists of objects.

## Leave room for the text

The engine puts the words on top. Ask for empty space where they will go:
- Title over plate: "large empty area in the upper half".
- Side caption: "subject on the right third, plain background on the left".
- Vertical reels: "subject in the lower half, empty sky above".

## Per-style starters

These follow the styles in `docs/research/style-playbook.md`. More are in `docs/research/production-routes.md`.

| Style | Image plate | Video move |
|---|---|---|
| 1 Dark gradient launch | abstract volumetric light ribbon in deep black space, violet and electric blue glow, soft bloom, macro, large empty centre | slow dolly in through the light, 4 s |
| 5 Orb / blob | iridescent glass sphere, thin-film rainbow rim, black background, centred, macro | slow rotation in place, 5 s, seamless loop |
| 6 Neon glow | dark studio, thin electric blue light bar on a black glossy surface, reflections, wide | light bar sweeps left to right, 3 s |
| 7 3D product (clay) | pastel clay 3D icons floating, calendar, chat bubble, chart, soft shadows, lavender seamless background, empty top half | gentle float up and down, 4 s |
| 7 3D product (hardware) | matte black device on black, single rim light tracing its edge, low key, macro, no logo | slow orbit right 15 degrees, rim light glides, 4 s |
| 8 Collage objects | single red paper heart torn in two pieces, isolated on white, soft shadow (then remove background) | none (animate in code) |
| 8 Collage texture | teal construction paper texture, flat, top-down, subtle fibres, even light | none |
| 9 Cinematic / archival look | black and white 1960s style film footage of an assembly line, grain, gate weave | slow push in, 4 s (label `generated: true`) |
| 12 Data mascot | cute glossy blue jelly blob mascot, smiling, isolated, soft studio light | small happy bounce, 3 s |
| Any CTA background | soft holographic gradient fabric folds, lavender peach and sky blue, matte, empty centre | very slow drift, 6 s |

## Choosing models (Higgsfield)

Always check with `models_explore` because model lists change. Defaults in the tool's own guidance:

| Need | Model |
|---|---|
| General still, typography-free | `gpt_image_2_5` |
| Product / commercial still | `marketing_studio_image` |
| Still → video, general | `seedance_2_5` (Seedance) |
| Multi-shot, motion transfer, audio | `kling3_0` |
| 2K keyframes or mixed references | `minimax_h3` |
| Cut-out | `remove_background` (image or video) |

## Consistency: the plate bible

Put this at the top of `<name>.plates.json` and paste it into every prompt:

```json
"bible": {
  "light": "single soft key light from upper left, gentle rim light",
  "lens": "85mm, shallow depth of field",
  "palette": "deep navy, electric violet, soft white",
  "material": "matte, fine grain",
  "mood": "calm, premium"
}
```

- One hero still per product or character. Later plates pass its job id as a reference image.
- Same aspect ratio as the video (`format`): 16:9 landscape, 9:16 reel, 1:1 square, 4:5 portrait.
- Generate 2 variants of the hero only. Everything else gets one, plus a re-roll if needed.

## Cost discipline

- Preflight every call with `get_cost: true` and show the total before generating.
- Stills cost far less than video. Lock the look on stills, then animate only the approved ones.
- 2-5 plates per video is the sweet spot. Beyond that the film usually needs a different
  route, not more plates.
- Free-trial or unlimited generations are the user's decision. Ask when the tool returns
  `unlim_choice`, and never set `use_unlim` yourself.

## Checking a plate before using it

- No text or fake logos anywhere (zoom in on signs, screens and packaging).
- Hands, faces and edges are clean, with no melted geometry.
- The light direction matches the other plates.
- There is room for the caption where the scene will put it (`clip.area`).
- At least 1080 px on the long side (`npm run plates` warns).
