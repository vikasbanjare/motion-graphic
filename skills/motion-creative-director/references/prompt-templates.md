# Prompt Templates and Tool Guidance for AI Video and Keyframe Tools

Knowledge file for the `motion-creative-director` skill (Phase 16, per-shot production prompts).
Researched 2026-10-08. The visual vocabulary (CM-, TR-, E-, T-, F-, SD- tokens, depth stack,
materials, anti-AI-look rules) comes from the Master SaaS Motion Design System, Parts 01-11
(`research/master/*.md`). Tool facts come from the vendors' own documentation where it could be
fetched; everything else is tagged.

## 0. How to read this file

**Evidence tags**

| Tag | Meaning |
|---|---|
| **[D]** | Read on the vendor's own documentation page on 2026-10-08. The URL is listed in §12 under the same key, e.g. [D:veo-api]. |
| **[3P]** | Third-party page (a reseller, an aggregator or a blog). Plausible but not confirmed by the vendor. |
| **[UNVERIFIED]** | Common practice or my inference. No source confirmed it. Test it before you rely on it. |
| **[M §x]** | A rule from the Master SaaS Motion Design System (Part and section). |

**Order of work for every shot**

1. Fill the universal shot spec (§9). Every field gets a value, or "n/a" plus a reason.
2. Split the shot into layers. Generate only what is allowed to vary; composite everything that must not (AA-U1, [M §21.1]).
3. Pick the tool from the decision table (§1.2), then write the tool prompt from that tool's adapter (§3-§8).
4. Make the keyframes (start/end frames, ingredients) first, with an image model (§8). Then generate the video.
5. Log every kept take (§11.5) and run the per-shot QC (field 31 of §9; examples in §10).

**Things that changed in 2026 and break older guides**

- **Sora is gone.** OpenAI published a deprecation notice on 2026-03-24. The Sora app and site closed on 2026-04-26, and the Sora 2 API (`/v1/videos`, `sora-2`, `sora-2-pro`) was switched off on 2026-09-24 [3P: higgsfield-sora, futurum, pillitteri]. §4 keeps the Sora 2 prompt method because it carries over to other models, but no new Sora job can run. The skill's tool list still names Sora; route those requests to Veo 3.1, Kling 3.0 or Runway Gen-4.5.
- **Google Flow now defaults to Gemini Omni Flash** for video (4-10 s, 720p, or a 360p draft), with Veo 3.1 Lite / Fast / Quality as alternatives [D:flow-models]. The Gemini API docs call Omni Flash the default and keep Veo 3.1 for extension, last-frame control and existing pipelines [D:gemini-video].
- **Runway's current models are Gen-4.5** (text- and image-to-video) **and Aleph 2.0** (video editing, in Edit Studio). Gen-3 Alpha was retired in July 2026, and Gen-4 is now documented as "an older generation" [D:runway-gen4-create] [D:runway-gen3].
- **Kling 3.0 replaced 2.6** (and 3.0 Omni replaced O1). It adds Multi-Shot, durations of 3-15 s and element binding [D:kling-3].
- **Midjourney V8.x** replaces Omni Reference (`--oref`, V7 only) with the Edit Model (`--edit`, up to 4 reference images) [D:mj-oref] [D:mj-params].

---

## 1. Tool landscape at a glance (as of 2026-10-08)

### 1.1 Spec table

| Tool / model | Inputs | Durations | Aspect ratios | Resolution | FPS | Continuity controls | Negative prompt | Audio |
|---|---|---|---|---|---|---|---|---|
| **Veo 3.1** (Quality / Fast; API `veo-3.1-generate-001`, `-fast-`) | text, first image, last frame, ≤3 reference images, video (extend) | 4, 6, 8 s. **8 s is required** for 1080p, 4K, reference images and extension [D:veo-api] | 16:9 (default), 9:16 [D:veo-api] | 720p (default), 1080p, 4K (8 s only); extension is 720p only on the Gemini API [D:veo-api] | 24 [D:veo-api] | `referenceImages` ≤3 (asset type); `image` + `lastFrame`; extend +7 s up to 20×, ≤148 s output [D:veo-api]; `seed` "slightly improves" determinism [D:veo-api] | Vertex: describe unwanted things as nouns, not "no X" [D:vertex-prompt]. The Gemini API parameter table lists no `negativePrompt` field [D:veo-api] | Always generated; mute it |
| **Veo 3.1 Lite** (preview) | text, first/last frame, references in Flow; no `referenceImages` on the API [D:veo-api] | 4, 6, 8 s | 16:9, 9:16 | 720p, 1080p (8 s); no 4K | 24 | In Flow, the only Veo tier that extends (8 s clips) [D:flow-models] | as above | yes |
| **Gemini Omni Flash 1.1** (Flow default) | text, frames, ingredients, video-to-video edit, voices | 4, 6, 8, 10 s [D:flow-models] | both (16:9, 9:16) [D:flow-models] | 720p, or a 360p draft at half the credits [D:flow-models] | 24 [UNVERIFIED] | Ingredients, start and end frames, multi-turn edits; extend up to 40 s on Vertex [D:vertex-extend]; extend "coming soon" in Flow [D:flow-models] | — | yes |
| **Sora 2 / Sora 2 Pro** | **Shut down 2026-09-24** [3P] | was 4/8/12/16/20 s [D:sora-cookbook] | was 16:9, 9:16 | was 720p; Pro up to 1080p [D:sora-cookbook] | — | was `input_reference`, ≤2 characters, extensions ≤6× (120 s total) [D:sora-cookbook] | — | was yes |
| **Runway Gen-4.5** | text, or image + text | 2-10 s [D:runway-gen45] | Text-to-video: 16:9 only. Image-to-video: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9 [D:runway-gen45] | 720p (1280×720 etc.); 4K upscale available [D:runway-gen4-create] | 24 or 25 [D:runway-gen45] | Start image; last frame of clip A → start of clip B [D:runway-i2v]; ProRes/PNG export on top plans [D:runway-gen45] | **Do not use.** "Negative phrasing is not supported and may produce unpredictable or even opposite results" [D:runway-gen4-guide] | — |
| **Runway Gen-4 / Gen-4 Turbo** (older) | image (required) + text, ≤1000 chars [D:runway-gen4-create] | 5, 10 s | 16:9, 9:16, 1:1, 4:3, 3:4, 21:9 | 720p class (1280×720, 1584×672 …) | 24 | Fixed seed (similar motion) [D:runway-gen4-create] | Not supported (as above) | — |
| **Runway Aleph 2.0** (Edit Studio) | existing video + keyframe edit (+ optional reference image, "Extra motion" prompt) | input 2-30 s [D:runway-edit] | conventional ratios only | input 480p-1080p [D:runway-edit] | input 24-30 [D:runway-edit] | Changes only what you ask for; ≤10 cuts per input; ranged edits [D:runway-edit] | — | — |
| **Kling 3.0 / 3.0 Omni** | text, start frame, end frame, elements (2-4 images or a video), multi-shot | 3-15 s, flexible [D:kling-3] | 16:9, 9:16, 1:1 [3P: fal-kling3, higgsfield-kling3] | 720p, 1080p [D:kling-3]; 4K on some endpoints [3P: higgsfield-kling3] | [UNVERIFIED] | Element binding ("Bind Subject"), `@Element` tags, Custom Multi-Shot (5-6 shots depending on host) [D:kling-3] [3P] | API `negative_prompt` (default "blur, distort, and low quality") with `cfg_scale` 0-1, default 0.5 [3P: fal-kling3] | Native audio is optional (pricing differs) [D:kling-3] |
| **Kling 2.5 Turbo / 2.6** (legacy) | text, image, start and end frame | 5, 10 s [3P: hedra, veed] | 16:9, 9:16, 1:1 [3P] | up to 1080p [3P] | — | start/end frame | 3-5 short items [3P: veed] | 2.6 only |
| **Higgsfield DoP** (own I2V model) | keyframe image + preset + prompt | 3, 5 s [D:hf-dop] | from the image | — | — | Preset = camera logic; `seed`; `steps`; "Mix" combines presets [D:hf-dop] | — | — |
| **Higgsfield Cinema Studio 3.5** | text / image + locked settings | 4-15 s [3P: hf-camera, vendor blog] | 1:1, 3:4, 4:3, 9:16, 16:9, 21:9 | 480p-4K | — | Genre, Camera MoveSet Style, Lighting preset, Lens, Focal length (8-75 mm), Aperture (f/1.4, f/4, f/11), palette as **parameters** [3P: hf-camera] | — | on/off |
| **Higgsfield (aggregator)** | per hosted model (Kling 3.0, Seedance 2.5, Wan 3.0, MiniMax, etc.) | per model (Seedance 2.5 / Wan 3.0: 30 s) [3P: higgsfield-sora] | per model | per model | — | per model | per model | per model |
| **Midjourney video** | start image (+ `--end` frame or `--loop`) + optional text | 5 s; Extend +4 s, up to 4×, 21 s max [D:mj-video] | follows the start image (1:1, ≈4:3, 2:3, ≈16:9, 1:2) [D:mj-video] | SD 480p; HD 720p (16:9 = 1280×720) [D:mj-video] | — | `--motion low/high`, `--raw`, `--loop`, `--end`, `--bs` [D:mj-video] | Image prompts use `--no`; video takes video parameters only [D:mj-params] | — |
| **Nano Banana Pro / 2 / 2.1** (keyframes) | text + up to 14 reference images [D:nb-guide] | still image | 1:1, 3:2, 2:3, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9 (2 / Flash adds 1:4, 4:1, 1:8, 8:1) [D:nb-guide] | 1K, 2K, 4K (Flash adds 512 px) [D:nb-guide] | — | Multi-image composition, conversational edits that keep the rest unchanged | Positive framing only ("empty street", not "no cars") [D:nb-guide] | — |

### 1.2 Which tool for which shot

| Shot need | First choice | Why | Second choice |
|---|---|---|---|
| Defocused atmosphere / environment plate behind composited UI | Veo 3.1 Fast (Flow or API), 8 s, 1080p | One named camera move, 24 fps, clean plates; SynthID watermark only [D:veo-api] | Kling 3.0, single shot, no audio |
| Seamless move that must **end** on a designed frame (hand-off to a composited element) | Veo 3.1 `image` + `lastFrame`, or Flow "Frames: First and last" | Documented interpolation between two frames [D:veo-api] | Kling 3.0 start + end frame (keep the frames similar) [D:kling-start-end] |
| Product hero from a real render / photo (no redesign allowed) | Image-to-video from the **real render** as the start frame, prompted for the camera move only: Runway Gen-4.5 I2V or Veo 3.1 frames | Image-to-video prompts should describe motion only; the image fixes the product [D:runway-i2v] [D:vertex-best] | Render the move in a 3D app (deterministic); use AI only for the environment |
| Same object or character across many shots | Veo 3.1 ingredients (≤3, 8 s) or Kling 3.0 elements | Reference-locked identity [D:veo-api] [D:kling-3] | Flow Omni Flash ingredients (4-10 s) |
| Camera move that must repeat exactly across takes | Higgsfield Cinema Studio (move style, lens, aperture locked as parameters) or DoP preset | Settings replace prose, so variance drops [3P: hf-camera] | Veo with a fixed seed (only "slightly" more deterministic) |
| Fixing a generated or filmed clip (relight, remove an object, swap a background) without regenerating | Runway Aleph 2.0 Edit Studio | Edits only what you ask for [D:runway-aleph] | Flow Omni Flash video-to-video |
| Multi-shot sequence in one generation | Kling 3.0 Custom Multi-Shot | Per-shot prompt and duration [D:kling-3] | Generate separate clips (better for an editor) |
| Keyframes, style frames, start/end frames | Nano Banana Pro (precision, refs, any ratio) | Up to 14 references; "keep everything else the same" edits [D:nb-guide] | Midjourney V8 for mood and style frames (`--sref`) |
| **Readable UI, text, numbers, logos, cursor, real people** | **None. Composite these** (Remotion / After Effects / motion-kit) | Generators cannot hold exact strings or layouts [M §9.20, §21] | — |

---

## 2. Rules that apply to every tool

### 2.1 The layer split (AA-U1)

Every shot is split into layers before any prompt is written.

| Layer | Made by | Examples |
|---|---|---|
| L0 plate | AI video (allowed to vary) | Studio radial, fog, light field, defocused desk, abstract particles, sky |
| L1 hero object | Real 3D render or photo; AI only for the camera move or environment around it | Device, packaging, 3D icon |
| L2 UI | Deterministic: Figma export / Remotion components / screen recording | Cards, tables, composer, charts |
| L3 cursor and interaction | Deterministic | Cursor path, press, ripple-free state change |
| L4 typography | Deterministic vectors at the delivery fps | Headlines, labels, CTA, URL |
| L5 light accents and grade | Compositor | Bloom on the active element, grain, vignette, one grade pass for all plates |

A generated layer never carries anything the viewer must read.

### 2.2 Keeping text and UI from warping

Generators garble glyphs, invent extra characters, and let layouts drift between frames.
Kling 3.0 advertises "native-level text" [D:kling-3], and Nano Banana renders text well in stills
[D:nb-guide]. Even so, the master rule holds: **every visible word is composited** [M §9.20 TY-U21].

**Protocol**

1. **Ask for an empty plate.** Leave readable things out of the positive prompt: dialogue, signage, screens with content, labels, numbers. Describe the empty space the overlay needs instead, e.g. "large clean empty area across the upper half, soft out-of-focus background" [M §21.5 AA-G4].
2. **Never use quotation marks in a Veo prompt.** Google's best-practice page: "To prevent the model from rendering text in the video, use a colon … and avoid using quotation marks" [D:vertex-best]. Quoted strings invite rendered text in every tool [UNVERIFIED for non-Google tools].
3. **Screens that appear in a generated shot are blank, emissive panels.** Write "matte blank screen glowing a flat soft blue-grey". Never write "dashboard UI", "a code editor" or "charts". Composite the real UI onto the panel afterwards (corner-pin plus planar track in AE or Mocha, or a Remotion `<Img>`/`<OffthreadVideo>` with a 3D transform) [M §9.20 step 4].
4. **When the model must hold a real screen** (a start frame containing the real UI): use it only as a start frame, keep the move small (≤0.2 % W/f), keep the clip short, and replace the screen region with the clean UI layer in compositing anyway. Treat the generated screen as a lighting and reflection reference only [UNVERIFIED].
5. **Negative list** (§2.4) on every plate.
6. **QC** (field 31, §9): step through at 1 f. Any glyph, pseudo-glyph or "texture that looks like text" in the plate is a fail. Regenerate, mask it, or blur it to ≥2-4 % W [M §13.9 3D-AI6].

### 2.3 Prompt order (cross-tool)

| Tool | Order that the docs recommend | Note |
|---|---|---|
| Veo 3.1 / Flow | **Cinematography → Subject → Action → Context → Style & ambiance** [D:veo31-guide] | Audio cues go in separate sentences [D:vertex-prompt]. We mute audio, so leave them out. |
| Runway Gen-4.5 image-to-video | "The camera [motion] as the subject [action]. [Additional descriptions]" [D:runway-i2v]; prompt for motion only [D:runway-gen4-guide] | Text-to-video describes both the visuals and the motion [D:runway-gen45] |
| Kling 3.0 | Subject → Action → Scene → Camera → Lighting & mood [D:kling-guide] | Multi-shot: "Shot 1, …. Shot 2, …" [D:kling-3] |
| Sora 2 (legacy method) | Prose scene, then a Cinematography block (shot, lens, lighting, mood), then Actions as beats [D:sora-cookbook] | The "ultra-detailed" form reads like a DP brief [D:sora-cookbook] |
| Higgsfield DoP / Cinema Studio | The image plus a preset or settings fix the camera; the prompt carries the scene and the move [D:hf-dop] [3P: hf-camera] | — |
| Nano Banana | [Subject] + [Action] + [Location/context] + [Composition] + [Style]; with references: [References] + [Relationship] + [New scenario] [D:nb-guide] | Start with a strong verb [D:nb-guide] |
| Midjourney | Subject and scene text first, parameters last (`--ar 16:9 --sref … --no …`) [D:mj-params] | No punctuation inside parameters |

**House rule:** the **continuity block** (§9.3) goes last in every prompt, pasted verbatim [M §21.5 AA-G3].

### 2.4 Standard negative lists (nouns only)

Write negatives as nouns. "Wall, frame" works; "no walls" does not [D:vertex-prompt]. In Runway and
Nano Banana, rephrase each negative as a positive ("locked camera" for "no camera movement"; "empty
street" for "no cars") [D:runway-gen4-guide] [D:nb-guide].

| Set | Nouns | Use on |
|---|---|---|
| N-TEXT | text, letters, words, captions, subtitles, signage, numbers, watermark, logo, user interface, screen content | Every plate [M §21.5 AA-G4] |
| N-CAM | camera shake, handheld wobble, roll, dutch angle, sudden zoom, orbit, whip pan | Locked or breathe plates |
| N-WARP | morphing, warping, melting, bending straight lines, distorted geometry, flicker, texture boiling | Products, hero objects, transitions [M §7.14.1] |
| N-PEOPLE | people, faces, hands, crowd | SaaS plates unless people are briefed |
| N-FX | lens flare, glitter, sparkles, floating particles, bokeh balls, rainbow light leaks | Premium/minimal styles (the AI-look tells, [M §21]) |
| N-SURF | glossy floor, mirror reflections, HDRI sky, chrome | Palette-lit environments [M §13.7 3D-U19] |

Kling: keep it to 3-5 problems, not a wall of tags [3P: veed]. Veo: one short noun list.

**Positive-only rewrites** (Runway, Nano Banana, Omni Flash)

| Negative intent | Positive phrasing |
|---|---|
| no camera movement | The camera is entirely motionless for the duration of the shot; only the light moves [D:runway-camera] |
| no text | Clean, unmarked surfaces; blank matte panels; empty upper half of the frame |
| no people | An empty studio |
| no shake | Camera on a locked tripod, horizon level |
| no warping | The object keeps its exact shape and proportions in every frame (still check in QC) |

### 2.5 Clip planning

- Plan inside the tool's clip units. A storyboard block longer than one clip is two clips [M §21.5 AA-G1].
- Generate 1.5-2 s longer than the edit length and use the middle; the first and last ~0.5 s are where the most drift and settling happen [M §15.11 ER-24].
- One camera move per clip, named precisely [D:vertex-best: "focus short videos on a single scene"] [M §6.12].
- Frame rate: Veo and Runway output 24 fps (Runway also 25). Either finish the film at 24 fps, or keep plate moves at ≤0.2 % W/f and do fast moves in the 30 fps composite. Conform by optical-flow retime, never by duplicating frames [M §21.5 AA-G11].
- Generate 2-4 takes and pick by QC, not by first impression [M §21.5 AA-G7].

---

## 3. Google Flow and Veo 3.1 (plus Gemini Omni Flash)

### 3.1 Current specs

- **Models.** API: `veo-3.1-generate-001` and `veo-3.1-fast-generate-001` (GA 2025-11-17, retirement "November 17, 2026 or later"), plus `veo-3.1-lite-generate-001` (Preview since 2026-04-02) [D:vertex-veo31]. Flow offers Veo 3.1 Lite, Fast and Quality, and **Gemini Omni Flash 1.1 as the default** [D:flow-models].
- **Durations.** 4, 6 or 8 s. 8 s is mandatory with 1080p, 4K, reference images or extension [D:veo-api].
- **Aspect ratios.** 16:9 (default) or 9:16 [D:veo-api].
- **Resolution.** 720p (default), 1080p, 4K. 4K is not available on Lite. Extension is 720p-only on the Gemini API [D:veo-api]. On Vertex, extension inputs and outputs may be 720p, 1080p or 4K [D:vertex-extend].
- **FPS.** 24 [D:veo-api].
- **Prompt limit.** 1,024 text tokens; one output video per request on the Gemini API [D:veo-api].
- **Reference images.** Up to 3 asset images "of a single person, character, or product" [D:veo-api]. In Flow these are **Ingredients**. Use subject or product references on a plain or segmented background [D:flow-create].
- **First and last frame.** `image` + `lastFrame` (interpolation). In Flow: Video → Frames → "+ Add start frame" / "+ Add end frame" [D:veo-api] [D:flow-create].
- **Extend.** +7 s per step, up to 20 times, combined output ≤148 s on the Gemini API. Extend "finalizes the final second or 24 frames of your video and continues the action" [D:veo-api]. Vertex: input 1-30 s at 24 fps, output 7 s, total ≤37 s for Veo (≤40 s for Omni Flash) [D:vertex-extend]. In Flow, only 8 s Veo 3.1 clips can be extended, and only with Lite [D:flow-models].
- **Flow feature matrix** [D:flow-models]:

| Feature | Lite | Fast | Quality | Omni Flash 1.1 |
|---|---|---|---|---|
| Text to Video (4/6/8 s; Omni also 10 s) | yes | yes | yes | yes |
| Frames: first / first + last | yes | yes | yes | yes (web only for start + end) |
| Ingredients / references | 8 s only | 8 s only | **no** | 4-10 s |
| Extend | 8 s only | no | no | coming soon |
| Video-to-video edit | no | no | no | ≤10 s |

- **Other.** Seed exists but "doesn't guarantee determinism, but slightly improves it" [D:veo-api]. Videos are stored on the server for 2 days, so download them [D:veo-api]. SynthID watermark [D:veo-api]. Generated audio is always on [D:veo-api]; mute it [M §21.5 AA-G10].

### 3.2 Prompt structure that works

```
[CINEMATOGRAPHY: shot size + angle + ONE named camera move with start/end framing, speed words,
 lens feel, focus plane] [SUBJECT: what is in frame, materials] [ACTION: one beat of motion, in
 physical terms] [CONTEXT: environment, empty space reserved for overlays] [STYLE & AMBIANCE:
 lighting with direction and colour, palette words, grade, grain]. [CONTINUITY BLOCK verbatim]
```
- Use one beat per clip. "A then B then C" in one short prompt "often leads to muddled or incomplete videos" [D:vertex-best].
- For image-to-video, prompt the **motion only**. Re-describing what the image shows "confuse[s] the model" [D:vertex-best]. Three motion types: camera motion (the most reliable), subject animation, environmental animation [D:vertex-best].
- Clarity over chatter: "Low-angle close-up shot of …", not conversational descriptions [D:vertex-best].
- Ingredients: say in the prompt how each ingredient is used ("the device from the reference sits on the plinth") [D:flow-create]. Keep the prompt consistent with the inputs; contradictions degrade results [D:flow-create].

### 3.3 Camera vocabulary Veo understands

Documented terms [D:vertex-prompt]:
- **Angles and sizes.** Eye-level, low-angle, high-angle, bird's-eye/top-down, worm's-eye, dutch, close-up, extreme close-up, medium, full, wide/establishing, over-the-shoulder, POV.
- **Moves.** Static (fixed), pan left/right, tilt up/down, dolly in/out, truck left/right, pedestal up/down, zoom in/out, crane, aerial/drone, handheld, whip pan, arc.
- **Lens and optics.** Wide-angle, telephoto, shallow DOF, deep DOF, lens flare, rack focus, fisheye, vertigo (dolly zoom).
- **Editing terms.** Match cut, jump cut, montage, split diopter.

Google notes that "some advanced camera angles/lenses are not officially supported" [D:vertex-prompt].

**Master move → Veo phrase** (from [M §6.12]; speeds are targets, not guarantees)

| ID | Veo phrase |
|---|---|
| CM-01 | static locked-off shot, zero camera movement, horizon level |
| CM-02 | very slow constant push-in from 100% to 110% framing over the whole clip, no acceleration |
| CM-04 | single dolly-in, decelerating to a stop, foreground elements pass close to the lens into soft bokeh, focus locked on [subject], telephoto look |
| CM-05 | slow pull back from a tight close-up to a medium-wide shot, revealing the surroundings, slow-fast-slow |
| CM-08 | slow pedestal down through a layer of soft haze, slow-fast-slow |
| CM-10 | slow arc shot of about 30 degrees around [subject] at constant radius (one step per clip) |
| CM-14 | straight top-down shot, slow drift upward |
| CM-18 | rack focus from the foreground [A] to the background [B] |

### 3.4 Text and UI handling in Veo

- Leave dialogue out entirely; Veo adds gibberish subtitles when dialogue is implied [M §21.5 AA-G4]. No quotation marks [D:vertex-best].
- Screens become "blank matte panels emitting soft light"; UI comes later (§2.2).
- Describe the empty space: "subject in the lower third, clean empty area across the upper half" [M §13.9 3D-AI5].

### 3.5 Negatives

- Vertex / Agent Platform: negative prompt as nouns ("urban background, man-made structures") [D:vertex-prompt].
- Gemini API: no `negativePrompt` is listed in the Veo parameter table [D:veo-api]. Put exclusions positively in the prompt: "a desolate landscape with no buildings or roads" rather than "no man-made structures" [D:veo31-guide].
- Flow UI: I found no dedicated negative-prompt field documented [UNVERIFIED]. Phrase exclusions positively.

### 3.6 Continuity tactics

1. One reference set per look: product, environment, style frame (≤3), always on clean backgrounds [D:flow-create].
2. Paste the character or object description verbatim into every prompt and change only the action. Use the same seed [D:vertex-best].
3. Frames to Video. Make clip N **end** on a designed frame (Nano Banana keyframe) so the composited element takes over, or **start** clip N+1 from the matched frame [M §21.5 AA-G6]. Never ask Veo to invent a morph between two different designs (TR-A12).
4. Extend for longer continuous moves. It continues from the last 24 frames, so the last second must already be moving the right way [D:veo-api].
5. Keep one model tier and one resolution per film; switching tiers is identity drift [M §21.5 AA-G5].

### 3.7 Common failure modes

| Failure | Cause | Fix |
|---|---|---|
| Static or barely moving clip | No move named; Veo defaults to static or subtle movement [M §6.12] | Name exactly one move with start and end framing |
| "Swooping mess" | Two competing camera instructions [3P: wan27] | One move per clip; cut two clips together |
| Gibberish captions or signage | Dialogue, quotes or text-bearing nouns in the prompt | Remove them; N-TEXT negative; empty-space description |
| Product geometry drifts | Generated product | Real render as start frame + reference images; or render the move in 3D |
| Clip blocked | Safety filter or an audio-processing issue [D:veo-api] | Rephrase; not charged [D:veo-api] |
| Judder after conform to 30 fps | Frame duplication | Deliver 24 fps, or optical-flow retime and keep the plate slow [M §21.5 AA-G11] |
| Brand-name prompts filtered | Filtering [3P: wan27] | Describe the object; never name brands |

### 3.8 Veo / Flow adapter (copy and fill)

```
TOOL: Veo 3.1 [Fast|Quality|Lite] via [Flow|Gemini API|Vertex]   MODE: [Text|Frames first|Frames first+last|Ingredients|Extend]
aspectRatio: [16:9|9:16]   resolution: [720p|1080p|4k]   durationSeconds: [4|6|8]   seed: [n]   outputs: [2-4 takes]
image (start): [file]   lastFrame: [file]   referenceImages (≤3, asset): [product.png, env.png, style.png]

PROMPT:
[Shot size + angle]. [CM- phrase with start → end framing and speed words], [lens feel], focus on [plane],
[foreground] softly out of focus. [Subject with fixed material words]. [One action beat in physical terms].
[Environment]; [empty-space instruction for overlays]. Lit by [key direction, colour temp words], [fill/rim];
[palette words]; [grade, grain]. Silent ambience only.
CONTINUITY: [continuity block verbatim]

NEGATIVE (Vertex field, or omitted on the Gemini API): [N-TEXT], [N-CAM or N-WARP], [N-FX as needed]
```

---

## 4. Sora 2 (deprecated: method only)

**Status.** The app closed on 2026-04-26 and the API on 2026-09-24 [3P: higgsfield-sora, futurum, pillitteri]. Do not plan new work on Sora. Its prompting method transfers to other models, so it is summarised here.

**Last documented specs** [D:sora-cookbook]: `sora-2` 720×1280 / 1280×720; `sora-2-pro` adds 1024×1792 / 1792×1024 / 1080×1920 / 1920×1080; `seconds` "4","8","12","16","20"; ≤2 character references; `input_reference` image must match the target size; extensions ≤20 s each, up to 6 times, ≤120 s total.

**Ideas worth keeping** [D:sora-cookbook]:
- Brief the model "like a cinematographer who has never seen your storyboard".
- Swap weak words for visible results: "Cinematic look" becomes "Anamorphic 2.0x lens, shallow DOF, volumetric light".
- "Each shot should have one clear camera move and one clear subject action." Describe actions in beats or counts.
- Name 3-5 palette anchors to keep colour stable across shots.
- Shorter clips follow instructions more reliably; two 4 s clips can beat one 8 s clip.
- Edit by nudging, one change at a time ("same shot, switch to 85 mm").
- The "ultra-detailed" shot-sheet format (Format & Look / Lenses & Filtration / Grade / Lighting & Atmosphere / Location & Framing / Sound / Shot list with timestamps / Camera notes / Finishing) is the most reusable structure. It maps onto §9.

**Migration.** Use the same shot-sheet prompt on Kling 3.0 (multi-shot timing) or Veo 3.1 (split into one clip per shot). Seedance 2.5 and Wan 3.0 (30 s, via Higgsfield) are listed as alternatives for long takes [3P: higgsfield-sora].

---

## 5. Runway (Gen-4.5, Gen-4, Aleph 2.0)

### 5.1 Specs

- **Gen-4.5.** Text-to-video and image-to-video; 2-10 s; 720p; 24 or 25 fps (Advanced settings). Text-to-video is 16:9 only; image-to-video supports 16:9, 9:16, 1:1, 4:3, 3:4, 21:9. ProRes or PNG-sequence export on Max, Unlimited (Legacy) and Enterprise plans (+5 credits/s). 12 credits/s [D:runway-gen45].
- **Gen-4 / Turbo.** An input image is required; 5 or 10 s; 24 fps; 1000-character prompt; fixed-seed option; Upscale to 4K; Retime, Expand video [D:runway-gen4-create].
- **Aleph 2.0 (Edit Studio).** Input video 2-30 s, 480p-1080p (720p/1080p recommended), 24-30 fps, ≤10 cuts. Single-edit mode: pick a keyframe, write the change (optionally with a reference image), preview the edited keyframe, then generate the video. Optional "Extra motion" prompt; ranged edits [D:runway-edit].

### 5.2 Prompt structure that works

- Start simple, then add **one element at a time**: subject motion → camera motion → scene motion → style descriptors [D:runway-gen4-guide].
- Image-to-video: "The camera [motion description] as the subject [action]. [Additional descriptions]" [D:runway-i2v]. Refer to subjects generally ("the subject", "the device") [D:runway-gen4-guide].
- Sequential control: "X occurs, then Y occurs" or timestamps `[00:01] X. [00:03] Y.` [D:runway-i2v].
- Describe visual elements only when they are new, change dramatically, transform, or interact [D:runway-i2v].
- Gen-4.5 text-to-video describes both the visuals and the motion [D:runway-gen45].
- No conversational or command phrasing ("can you add…"). Describe how the element appears ("A dog runs into the scene from off-camera") [D:runway-gen4-guide].
- Aleph 2.0: an action verb plus the transformation ("Change the background to a soft blue-grey studio radial", "Relight with a soft key from the upper right", "Remove the cable") [D:runway-aleph].

### 5.3 Camera vocabulary (Runway's own reference, Gen-4.5) [D:runway-camera]

- **Sizes.** Macro, extreme close-up, close-up, medium, full, wide, extreme wide, establishing.
- **Angles.** Aerial, high, low, bird's-eye, worm's-eye, OTS, POV.
- **Composition.** Leading lines, frame within frame, symmetrical, negative space.
- **Moves.** Pan, tilt, dolly, push in, pull back, truck, tracking, pedestal, crane/jib, orbit, arc, zoom, crash zoom, whip pan, handheld, steadicam, gimbal, static.
- **Focus.** Deep, soft, rack, shallow.

Runway's FAQ: "When prompting for dramatic motion that moves through the frame, describe what's in view or what gets revealed at each phase of the movement." For a true static shot, add "The camera is entirely motionless for the duration of the scene, with movement only occurring from the subject" and stabilise in the editor if needed [D:runway-camera].

### 5.4 Negatives

None. "Negative phrasing is not supported and may produce unpredictable or even opposite results." Write "Locked camera. The camera remains still." [D:runway-gen4-guide]. Use the positive rewrites in §2.4.

### 5.5 Continuity tactics

- The start image is the first frame and fixes composition, colour, light and style [D:runway-gen4-create]. Use a clean, artefact-free keyframe; artefacts "may be intensified" [D:runway-i2v].
- Longer takes: Use → "Use current frame" on the last frame, generate the next clip, then trim the shared frame in the edit [D:runway-i2v].
- Fixed seed gives "similar style and movement" on Gen-4 [D:runway-gen4-create].
- Input images with implied motion (blur, dust, mid-action poses) fight the prompted move. Clean them first [D:runway-i2v].
- Use Aleph 2.0 to fix one thing in an otherwise good take (relight, swap the background, remove an object) instead of regenerating it [D:runway-aleph].

### 5.6 Failure modes

| Failure | Fix |
|---|---|
| Opposite of what was asked | Negative phrasing; rewrite positively [D:runway-gen4-guide] |
| Reduced motion | Prompt re-describes the image; describe only the motion [D:runway-gen4-guide] |
| Random movement | Conceptual language ("embodies the essence of…"); write physical actions [D:runway-gen4-guide] |
| Wide or establishing shots drift although "static" was asked | Add the motionless sentence; stabilise in post [D:runway-camera] |
| Too many events in 5 s | Use a 10 s clip, or split the shot [D:runway-gen4-create] |

### 5.7 Runway adapter

```
TOOL: Runway Gen-4.5 [I2V|T2V]   ratio: [16:9|9:16|1:1|4:3|3:4|21:9 (I2V)]   duration: [2-10 s]   fps: [24|25]
start image: [keyframe file, artefact-free]   seed: [fixed n]   export: [ProRes|PNG seq|MP4]
PROMPT (I2V, motion only, positive phrasing):
The camera [CM- phrase with start → end and speed] as [the subject / the device] [one action].
[What is revealed at each phase of the move]. [Light change, if any]. [Style descriptor, one line].
CONTINUITY: [lens feel, key direction, palette anchors: same words as every other prompt]
(no negative prompt)
```

---

## 6. Kling (3.0 current; 2.x notes)

### 6.1 Specs

- **Kling VIDEO 3.0 / 3.0 Omni.** Text-to-video, image-to-video, start and end frames, native audio (optional), Multi-Shot / Custom Multi-Shot, start frame plus element reference, multilingual speech, "native-level text", 3-15 s flexible duration, 720p/1080p [D:kling-3].
- **API parameters** (as exposed by a hosting provider): `duration` 3-15, `aspect_ratio` 16:9 / 9:16 / 1:1, `negative_prompt` (default "blur, distort, and low quality"), `cfg_scale` (default 0.5), `multi_prompt` with per-shot prompt and duration, `shot_type` customize / intelligent, `elements` referenced as `@Element1`… [3P: fal-kling3]. Shot cap: 5 per video [3P: higgsfield-kling3]; 6 [3P: magnific].
- **Elements.** 2-4 reference images, or a video from which appearance (and voice) is extracted. "Describe only the element's action in the shot prompt" [D:kling-3] [3P: higgsfield-kling3].
- **Kling 2.5 Turbo / 2.6 (legacy).** 5 or 10 s; 16:9, 9:16, 1:1; up to 1080p; 2.5 Turbo has no audio [3P: hedra, veed].

### 6.2 Prompt structure that works

- Subject → Action → Scene → Camera → Lighting and mood, in plain readable language [D:kling-guide].
- Name visible motion ("smoke drifting upward"), not abstractions ("magic") [D:kling-guide].
- Pacing words: slow / steady / quick, tied to a visible move [D:kling-guide].
- Multi-shot: `Shot 1, [size, angle, move] …. Shot 2, …`, or timestamped beats ("1.5-3s: side profile tracking shot …") [D:kling-3] [3P: higgsfield-kling3].
- Length: 40-80 words for 2.5 Turbo. Under 20 words lets it improvise; over 100, it drops details from the middle [3P: veed].

### 6.3 Camera vocabulary

Close-up, wide, low angle, push-in, pan, tilt, tracking shot, dolly-in, orbit, extreme close-up, medium close-up, full body, establishing; composition words "centered", "rule of thirds", "off center" [D:kling-guide].

### 6.4 Text and UI

Kling 3.0 claims it preserves signs, captions and logos from the start image and renders new text clearly [D:kling-3]. Treat that as a bonus for **background** text only. Product UI and copy are still composited (§2.2); the claim is not tested against brand strings [UNVERIFIED].

### 6.5 Negatives and CFG

Keep `negative_prompt` to 3-5 concrete problems, e.g. "distorted geometry, warped text, camera shake, extra objects" [3P: veed]. Raise `cfg_scale` for stricter adherence (0-1) [3P: fal-kling3].

### 6.6 Continuity tactics

- Start and end frames "should be as similar as possible, as significant differences may cause a lens switch" [D:kling-start-end]. For a big change, use two clips and a designed cut.
- Bind elements and tag them in every shot where they appear [D:kling-3] [3P: higgsfield-kling3].
- Chain clips: the last frame of A becomes the start frame of B [3P: hedra].
- For a single continuous shot, switch Multi-Shot **off** (Multi-Shot plans its own cuts) [D:kling-3].

### 6.7 Failure modes

| Failure | Fix |
|---|---|
| Unwanted cut mid-clip | Multi-Shot is on, or the start and end frames are too different [D:kling-3] [D:kling-start-end] |
| Hands and faces deform in close-ups (2.5 Turbo) | Medium-wide framing; add "distorted hands, warped face" to the negative [3P: veed] |
| Detail dropped from the middle of a long prompt | 40-80 words; move the camera line earlier [3P: veed] |
| Fine texture softened | Turbo trades detail for speed; use 3.0 at 1080p [3P: veed] |

### 6.8 Kling adapter

```
TOOL: Kling 3.0 [Std|Pro]   aspect_ratio: [16:9|9:16|1:1]   duration: [3-15]   resolution: [720p|1080p]
native audio: off   multi-shot: [off | custom: N shots × durations]   cfg_scale: [0.5-0.8]
start frame: [file]   end frame: [file, similar to start]   elements: [@Element1 = product (2-4 refs)]
PROMPT:
[Subject (@Element1)] [one action]. [Scene + empty space for overlays]. [Size, angle, CM- phrase with speed].
[Lighting with direction and palette]. [Mood in visible terms]. CONTINUITY: [block]
NEGATIVE: [3-5 nouns, e.g. warped geometry, text, camera shake, flicker]
```

---

## 7. Higgsfield

### 7.1 What it is

Higgsfield is both a set of its **own models** (DoP image-to-video, Soul image models, Popcorn storyboards, Cinema Studio) and an **aggregator** running third-party models (Kling 3.0, Seedance 2.5, Wan 3.0, MiniMax, etc.) behind one API [D:hf-dop] [3P: higgsfield-sora]. In this environment, the Higgsfield MCP server (`mcp__higgsfield__*`: `generate_video`, `generate_image`, `motion_control`, `get_presets`, `reframe`, `upscale_video`) can browse presets and generate directly [D:hf-dop mentions the MCP preset catalogue].

### 7.2 DoP (image-to-video by preset)

- Input: a keyframe image (PNG/JPG). A preset from Effects, Basic Camera Control, Epic Camera Control, Catch the Pulse, New or Trending (or "Mix" to combine presets). A prompt with scene details (Enhance toggle). Advanced: duration 3 or 5 s, seed, steps [D:hf-dop].
- "The preset defines the camera logic of the clip": change the preset, not the prose, to change the move [D:hf-dop].
- Fixes: soft output → sharper keyframe; wrong motion → a different preset; ignored details → more specific prompt or Enhance [D:hf-dop].

### 7.3 Cinema Studio 3.5 (settings over prose)

Higgsfield's camera-control article [3P: hf-camera] argues, from its own tests, that text-only camera prompts vary between runs because speed, path, end position and DOF are left unspecified. It advises locking these as settings:

| Setting | Options [3P: hf-camera] | Map from the shot spec |
|---|---|---|
| Camera MoveSet Style | Classic Static, Silent Machine, One Take, Epic Scale, Intimate Observer, Impossible Camera, Documentary Snap, Raw Chaos, Dreamy Flow | CM-01 → Classic Static; CM-02/CM-05 → Silent Machine; CM-17 → One Take |
| Lens | Clinical Sharp, Extreme Macro, Anamorphic, Warm Halation, Vintage Haze | SaaS default: Clinical Sharp; CM-13 macro: Extreme Macro |
| Focal length | 8, 14, 35, 50, 75 mm | Orthographic feel → 75 mm; normal → 35-50 mm |
| Aperture | f/1.4, f/4, f/11 | Depth stack: hero DOF → f/1.4-f/4; flat/UI → f/11 |
| Lighting | Soft Cross, Overhead Fall, Contre-jour, Window, Practicals, Silhouette | Key from the upper right, soft → Window [UNVERIFIED mapping] |
| Color palette | Naturalistic Clean, Bleached Warm, Hyper Neon, Teal & Orange Epic, Sodium Decay, Cold Steel, Bleach Bypass, Classic B&W | Brand palettes → Naturalistic Clean, then grade |
| Aspect / resolution / duration | 1:1-21:9; 480p-4K; 4-15 s | From the shot spec |

**Move prompts.** Higgsfield's tested move prompts are "over-specified" on purpose: one move, the competing moves ruled out by name, constant speed, the end framing, and a level horizon. Example: "pure forward travel at constant speed … decelerating smoothly into a static hold … The field of view never changes, no zoom … No pan, no tilt, no crane, no handheld drift" [3P: hf-camera]. Use the same pattern in any tool that tolerates long prompts (Veo, Kling). In Runway, rewrite the "no X" parts positively.

### 7.4 Higgsfield adapter

```
TOOL: Higgsfield [DoP preset <name> | Cinema Studio 3.5 | hosted model <Kling 3.0|Seedance 2.5|Wan 3.0>]
keyframe: [file]   duration: [DoP 3|5 s ; CS 4-15 s]   aspect: [..]   resolution: [..]   seed: [n]
CS settings: MoveSet [..] · Lens [..] · Focal [..] mm · Aperture [..] · Lighting [..] · Palette [..] · Audio off
PROMPT: One continuous [move] … [start framing] → [end framing], constant speed, settles into a static hold
in the final [0.5] s; horizon level; [subject] keeps its exact shape. [Scene + empty area]. CONTINUITY: [block]
```

### 7.5 Failure modes

Preset energy is too high for premium SaaS: "Epic" presets read as an ad-template look. Stay in Basic Camera Control or Silent Machine [UNVERIFIED]. Presets marked "Trending" are recognisable to an audience, which is an AI-look risk [M §21] [UNVERIFIED].

---

## 8. Keyframe images: Nano Banana and Midjourney (start/end frames, ingredients, style frames)

### 8.1 What keyframes are for

- **Start frame.** Fixes the composition, palette, light and the empty space for overlays. Every I2V tool treats it as frame 1 [D:runway-gen4-create] [D:vertex-best].
- **End frame.** Fixes where a move lands, so the composited element can take over exactly (TR-03/05/23).
- **Ingredients / elements.** Lock the identity of the product, the environment and the style across shots.
- **Style frame.** One approved still per look. Every plate is graded to match it [M §21.5 AA-G13].

### 8.2 Nano Banana (Pro / 2 / 2.1)

- **Specs.** Aspect ratios 1:1, 3:2, 2:3, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9 (Flash variant also 1:4, 4:1, 1:8, 8:1). 1K/2K/4K. Up to 14 reference images. C2PA and SynthID [D:nb-guide]. Flow offers Nano Banana Pro, 2 Lite and 2.1 for frames and ingredients [D:flow-models].
- **Prompting** [D:nb-guide]:
  - Be specific, use positive framing, and use camera terms ("low-angle shot with a shallow depth of field (f/1.8)").
  - Start with a strong verb.
  - Without references: [Subject] + [Action] + [Location/context] + [Composition] + [Style].
  - With references: [References] + [Relationship instruction] + [New scenario].
  - For edits, "be explicit about what to keep exactly the same".
  - Name the lighting setup ("three-point softbox"), the materials ("brushed aluminium", not "metal") and the grade.
- **Designing an end frame from a start frame (same world).** Upload the approved start frame and write: "Using the attached image as the exact scene, keep the camera position, lighting, materials and colours exactly the same; move the camera closer so the [subject] fills [x]% of the frame width, centred at [x, y]." This keeps start and end similar, which Kling and Veo need [D:kling-start-end] [UNVERIFIED wording].
- **Text in keyframes.** Nano Banana renders text well ("use quotes", "choose a font") [D:nb-guide]. For start and end frames that go into video, **leave the text out**: the video model would have to hold it and will warp it. Put type in the compositor [M §9.20].

**Keyframe template (Nano Banana)**
```
Generate a [16:9|9:16] [2K] image. [Shot size + angle + lens feel, e.g. 85 mm telephoto look, f/2.8].
[Subject + exact materials]. [Placement: centred at x%, y%; occupies w% of frame width].
[Environment: palette-lit, e.g. radial gradient #C8D4DF at left to #F4F5F8 at right, gentle vignette].
[Key light from upper right, soft, warm-neutral; soft contact shadow lower left]. Clean empty area
across [region] for later overlays. Clean unmarked surfaces, blank matte panels. [Grade, fine grain].
(References: [product render] as the exact object, keep its shape, proportions and colour unchanged.)
```

### 8.3 Midjourney (V7 / V8.x; video V1)

- **Image parameters** [D:mj-params]: `--ar`, `--no`, `--sref` + `--sw` + `--sv`, `--oref` (V7; V8 uses `--edit` with up to 4 reference images), `--seed`, `--raw`, `--stylize`, `--chaos`, `--hd` (V8.1, 2048 px), `--draft`. Parameters go last, with no punctuation [D:mj-params].
- **Video** [D:mj-video]: the start image is the first frame; `--end <url>` sets an end frame, `--loop` reuses the start; `--motion low|high`; 5 s, extend +4 s up to 21 s; SD 480p / HD 720p; the aspect ratio follows the start image (16:9 → 1280×720 HD).
- **Best use here.** Mood boards, style frames, abstract plates and textures (`--sref` locks a look across frames). Avoid it for products (Omni Reference warns that "intricate details like … logos … may not perfectly match") [D:mj-oref] and for anything with text.
- **Midjourney negatives.** `--no text, letters, logo, watermark, people` [D:mj-params].

**Keyframe template (Midjourney)**
```
[shot size + angle], [abstract subject / environment], [materials], [light direction + colour],
[palette words], clean empty upper half, soft focus background, fine film grain
--ar 16:9 --raw --stylize 100 --sref <style-frame-url> --sw 200 --seed <n> --no text, letters, logo, watermark, people
```

---

## 9. The universal per-shot template (Phase 16)

Fill every field. "n/a" is allowed only with a reason. Field order follows Phase 16 of the brief and
gate G-20 [M §22.1 G-20].

### 9.1 Field reference (what each field must contain)

| # | Field | Required content (format) | Master source |
|---|---|---|---|
| 1 | Shot ID / stage | S## · story stage · one-line purpose | [M §2.2] |
| 2 | Aspect ratio | 16:9 / 9:16 / 1:1 / 4:5, plus the cut-down rule (re-layout, not crop) | [M §4.7 CO-U18] |
| 3 | Resolution | Delivery W×H; generation resolution per layer | — |
| 4 | FPS | Delivery fps; generator fps; conform method | [M §21.5 AA-G11] |
| 5 | Duration | Seconds and frames (at delivery fps); SD- token; generated clip length (+1.5-2 s handles) | [M §17.1] |
| 6 | Layer split | L0-L5: which layer is generated, which is composited, by what tool | [M §21.1] |
| 7 | Composition | Focal point in % coordinates; empty space reserved (box in %); safe area; grid anchor | [M §4.1, §4.7] |
| 8 | Product placement | Position (% x, y), size (% W), orientation/yaw, contact shadow | [M §10] |
| 9 | Camera angle | Eye-level / high / low / top-down; tilt in degrees | — |
| 10 | Lens feeling | Orthographic flat / normal 35-50 mm / telephoto 85-135 mm / wide 18-24 mm (mm values are inferred equivalents) | [M §6.12] |
| 11 | Camera path | One CM- ID; start framing → end framing; roll 0°; exit behaviour | [M §6.1] |
| 12 | Speed | Duration of the move; ease token; peak % W/f (or % scale/f) | [M §19.3, §18] |
| 13 | Foreground | Content, blur (px @1080p), speed ratio vs focal plane | [M §20.1] |
| 14 | Midground (focal) | Content, always sharp | [M §20.1] |
| 15 | Background | Content, blur, contrast/dim %, speed ratio | [M §20.1] |
| 16 | Lighting | Key direction (clock or "upper right"), colour temperature (K, inferred), fill/rim, practicals; the same words in every shot | [M §11.9, §13.7] |
| 17 | Materials | Named materials with fixed descriptors (≤3 per film) | [M §13.6] |
| 18 | UI appearance | UI source tier, state IDs, bible values (radius, shadow, glass), what is readable vs texture | [M §8] |
| 19 | Typography | String IDs (verbatim), family/weight, size token (T-), position, reveal/exit IDs, hold | [M §9.2, §9.20] |
| 20 | Animation timing | Event list in frames: f# event, property from → to, ease, cause | [M §8.17] |
| 21 | Object movement | Each moving object: property, from → to, frames, ease token, cause | [M §5] |
| 22 | Transition behaviour | In and out: TR- IDs, cut frame, both halves, matched element ±5 % W | [M §7.14.2] |
| 23 | Motion blur | Off below ≈5 % W/f; 180° above; per layer | [M §19, MP-24] |
| 24 | Depth of field | Focal plane; blur per plane; rack timing if any | [M §20] |
| 25 | Continuity | Continuity-block ID (pasted), references, seed, model tier, start/end frames, previous/next shot links | [M §21.5 AA-G5] |
| 26 | Palette | Palette tokens with hex; accent meaning; per-plane colour | [M §11] |
| 27 | Sound cue | SFX family (F01-F18), frame, anchor event, level; music event; generated audio muted | [M §16.7] |
| 28 | Must remain unchanged | Strings, product geometry, UI states, logo, colours, positions across the cut | [M §8.17] |
| 29 | Negatives | Noun lists (N-TEXT …) plus shot-specific nouns; positive rewrites for Runway / Nano Banana | §2.4 |
| 30 | Tool prompt(s) | The adapter block (§3.8, §5.7, §6.8, §7.4, §8) filled; generation settings; takes | — |
| 31 | QC | The checks specific to this shot (frame range to step) | [M §22.2] |

### 9.2 Blank template (copy)

```
═══ SHOT S{##} · {stage} · "{purpose in one line}" ═══
FORMAT        aspect {16:9} · delivery {1920×1080} · {30} fps · {d.dd} s = {N} f · token SD-{..}
              generation: {tool/model/tier} {res} {fps} · clip {x} s (use {a}-{b} s) · conform {optical flow | native}
LAYERS        L0 plate: {generated: tool} · L1 hero: {real render | n/a} · L2 UI: {source tier, file} ·
              L3 cursor: {..} · L4 type: {..} · L5 accents/grade: {..}
COMPOSITION   focal {element} at ({x}%W, {y}%H) · empty zone {x1-x2 %W, y1-y2 %H} reserved for {..} ·
              text-safe {box} · grid anchor {..}
PRODUCT       {object} at ({x}%,{y}%), {w}% W, yaw {°}, contact shadow {direction, softness} | n/a ({reason})
ANGLE / LENS  {eye-level | high {°} | low {°} | top-down} · {orthographic | 35-50 mm | 85-135 mm | 18-24 mm feel}
CAMERA PATH   {CM-..} {name}: {start framing} → {end framing} · roll 0° · horizon level · exit {..}
SPEED         {frames} f · ease {E-..} · peak {x}% W/f (or {x}% scale/f) · band {Breathe|Read|Glide|Attack}
PLANES        FG {content, blur px, speed ×} · MID {content, sharp} · BG {content, blur px, dim %, speed ×}
LIGHTING      key {key direction from the bible, e.g. upper left}, ~{K} K [inferred] · fill {..} · rim {..} · practicals {..}
MATERIALS     {material 1: descriptors} · {material 2} (≤3 per film)
UI            source {T1-T4} · states {UI-..} · bible {radius, shadow, glass} · readable: {..} · texture: {..}
TYPE          {STR-ID} "{verbatim}" · {family weight} · {T-token, px} · pos {..} · reveal {RV-..} f{a}-f{b} ·
              hold to f{c} · exit {EX-..}
TIMING        f{a}-f{b} {element} {property from → to} {E-..} cause {..}
              f{..} …
OBJECTS       {object}: {property from → to}, f{a}-f{b}, {E-..}, cause {..}
TRANSITIONS   IN  {TR-..} from S{..} at f0: {incoming half; matched element at (x,y) ±5% W}
              OUT {TR-..} to S{..} at f{N}: {outgoing half: last frames, direction, speed, ease}
MOTION BLUR   {off (all moves < 5% W/f) | 180° on {layer} f{a}-f{b}}
DOF           focal plane {..} · FG blur {px} · BG blur {px} · rack {f{a}-f{b}, E-SETTLE} | none
CONTINUITY    block {CB-..} (pasted in prompt) · refs {files} · seed {n} · tier {..} · start {file} · end {file}
              prev S{..}: {what carries in} · next S{..}: {what carries out}
PALETTE       {token}: #{hex} ({meaning}) · … · accent {hex} = {one meaning}
SOUND         {F-..} at f{..} on {anchor} {level dB rel. bed} · music {event} · generated audio: muted
UNCHANGED     {strings, geometry, UI state, logo, colours, positions}
NEGATIVES     {N-TEXT} · {N-CAM|N-WARP|N-FX…} · {shot-specific nouns}
TOOL PROMPT   ```{adapter block filled}```
QC            step f{..}-f{..} at 1 f; {shot-specific checks}
```

### 9.3 Continuity block (written once per look, pasted at the end of every prompt)

```
CB-{id} {look name}: {lens feel} look, horizon level, no roll; key light {softness} from the {key
direction}, {warm-neutral | cool} ({K} K), {fill ratio words}, no hard shadows; environment lit by the
palette: {palette words with hex}; materials: {material descriptors}; {grade words}, {grain words};
camera {camera physics: max speed, e.g. ≤0.2 % W/f; ease family, e.g. constant speed}; clean unmarked surfaces.
```
Every `{…}` comes from the continuity bible (SKILL Phase 17: lighting direction, colour temperature,
camera physics). Nothing is fixed by the template: the Northwind example in §10 uses "upper right" and
~5600 K, the worked example uses upper left, and copying either verbatim into another film breaks that
film's continuity.
Keep it to ≤60 words so it fits Veo's 1,024-token limit together with the shot text [D:veo-api]
and stays under Runway's limits [D:runway-gen4-create].

---

## 10. Filled examples

All three examples use the same fictional product, "Northwind Ledger" (an accounting SaaS). Its
strings, values and palette are **illustrative only**; a real package takes them from the client
(skill hard rule 1). Delivery: 16:9, 1920×1080, 30 fps. AI plates are generated at 24 fps and conformed
by optical flow, with plate camera speed ≤0.2 % W/f [M §21.5 AA-G11].

**Shared continuity block**
```
CB-01 Cool studio: moderate telephoto look, horizon level, no roll; key light soft from the upper right,
neutral-cool (~5600 K), gentle fill, no hard shadows; environment is a smooth radial gradient from
blue-grey #C8D4DF at left to near-white #F4F5F8 at right with a gentle vignette; materials: matte white
panels, frosted glass with a thin bright rim at top right; clean neutral grade, fine film grain; calm,
slow camera, constant speed; clean unmarked surfaces.
```
Palette tokens: `bg-a #C8D4DF` (studio left), `bg-b #F4F5F8` (studio right), `ink #0B0B0B`,
`surface #FFFFFF`, `accent #2F6BFF` (= "the product is acting"; only on active states), `ok #1F9D63`.
This is the cool 3D studio setting from [M §10.4]; the accent hex is illustrative.

### 10.1 Example A: SaaS UI shot (proof block, invoice auto-match)

```
═══ SHOT S05 · Proof 1 · "Viewer sees an unmatched invoice get matched with one click" ═══
FORMAT        aspect 16:9 · delivery 1920×1080 · 30 fps · 3.60 s = 108 f · token SD (proof shot, single action)
              generation: L0 plate = Veo 3.1 Fast, 1080p, 24 fps, 8 s clip (use 2.0-5.6 s) · conform optical flow
LAYERS        L0 plate: generated defocused studio (Veo) · L1 hero: n/a (UI-only shot) ·
              L2 UI: T1 real Figma export of "Reconcile" screen v3.2, vector · L3 cursor: native arrow 22 px ·
              L4 type: STR-05A kicker · L5: accent bloom on the matched row, grain 2%, one grade pass
COMPOSITION   focal = matched row inside the table card at (50%W, 58%H) · UI card 62% W (1190×744 px),
              centred x 50%, top at y 22% · empty zone x 10-90% W, y 6-18% H for the kicker ·
              text-safe x 96-1824, y 54-1026 (5% insets)
PRODUCT       n/a: the product is the UI (no physical object)
ANGLE / LENS  eye-level, face-on (0° yaw) · orthographic flat feel on the UI; the plate reads as telephoto bokeh
CAMERA PATH   CM-02 breathing push: UI group scale 1.000 → 1.060, centred on the focal row; roll 0°;
              exit = continues linear into the cut (no ease-out)
SPEED         108 f · E-LINEAR · 0.056% scale/f (below the default +10%/1.5-2 s because the table must be read) ·
              plate: CM-01 locked (Veo "static"), drift ≤0.05% W/f
PLANES        FG: none · MID: UI card, sharp, soft drop shadow y24 / blur 48 / 7% black ·
              BG: generated studio plate + extra gaussian 40 px, dimmed to 70% contrast, speed 0× (locked)
LIGHTING      plate key soft from the upper right ~5600 K [inferred]; UI shadow falls lower left (same key)
MATERIALS     matte white UI panel; plate is pure gradient light (no objects)
UI            source T1 · states UI-R1 "3 unmatched" → UI-R2 "Matched" · bible: radius 16 px, hairline 1 px 6%,
              Inter 400/600 · readable: row 2 (vendor, amount, "Match" button); texture: rows 4-9 (≤2% H)
TYPE          STR-05A "Match in one click." (illustrative copy) · Inter 600 · T-STATEMENT cap 63 px (5.8% H) ·
              centred, centre-line y 12% H · reveal RV-04 (rise 4% H, blur 8 → 0 px, 0 → 1 opacity) f0-f10 E-OUT ·
              hold to f108 · exit: cut (carried by TR-23 into S06)
TIMING        f0-f8     UI card arrives: y +4% H → 0, opacity 0 → 1                 E-OUT    cause: cut in
              f0-f10    STR-05A reveal                                               E-OUT    cause: cut in
              f12-f40   cursor enters from the right edge (x 104% → 71% W, y 61% H)  E-GLIDE  cause: user
              f40-f52   dwell on the "Match" button (hover state 1 f at f41)                   —
              f52       press: button darkens 1 f; F01 click                                   cause: press
              f53-f58   row 2 state UI-R1 → UI-R2: status chip "Unmatched" → "Matched",
                        chip colour grey → ok #1F9D63, crossfade 4 f + width change          E-OUT    cause: press
              f55-f67   accent bloom on row 2 (#2F6BFF, 12% opacity → 0)                    E-OUT
              f60-f74   header counter "3 unmatched" → "2 unmatched" (digit swap 4 f)      E-SNAP   cause: state change
              f74-f108  hold (reading time ≥1.0 s after the payoff)
OBJECTS       cursor: position as above; no trail, no ripple
TRANSITIONS   IN  TR-20 interaction-triggered from S04 at f0 (S04 ended on the click into "Reconcile");
                  card enters with E-OUT, 8 f
              OUT TR-23 anchored-element cut to S06 at f108: STR-05A stays locked at the same position (±1 px),
                  the UI underneath hard-cuts to the next proof screen
MOTION BLUR   off (cursor peak ≈2.2% W/f < 5% W/f; all other moves slower)
DOF           focal plane = UI card (sharp); plate blur 40 px @1080p on top of the generated softness; no rack
CONTINUITY    CB-01 pasted · refs: style-frame SF-01.png · seed 41207 · tier Veo 3.1 Fast 1080p (all plates) ·
              start/end frame: n/a (plate is static) · prev S04: same plate take, same grade ·
              next S06: STR-05A anchored, plate continues (same take, later in/out points)
PALETTE       bg-a #C8D4DF · bg-b #F4F5F8 · surface #FFFFFF · ink #0B0B0B · accent #2F6BFF (active row only) ·
              ok #1F9D63 (matched chip only)
SOUND         F01 click at f52 (press frame), clear in a −3 dB bed dip f48-f60 · F04 soft success tone at f56
              (first full-opacity frame of "Matched"), −8 dB rel. bed · music: bar line on f0 · Veo audio muted
UNCHANGED     STR-05A string and position; vendor name and amount on row 2; table column order; card radius;
              accent used only on row 2; plate grade identical to S04/S06
NEGATIVES     N-TEXT · N-CAM · N-PEOPLE · N-FX (plate) · UI layer: overshoot, bounce, motion blur, glow on inert UI
QC            step f48-f62 at 1 f: press → state change ≤3-8 f (TR-20); counter digits never overlap;
              STR-05A identical pixels f10-f108; plate has no glyph-like texture at 200% zoom
```

**Tool prompt: L0 plate (Veo 3.1 Fast, Text-to-Video, 16:9, 1080p, 8 s, seed 41207)**
```
Static locked-off wide shot, zero camera movement, horizon level, telephoto look with the whole frame
softly out of focus. An empty seamless studio with no objects: a smooth radial gradient of light from
blue-grey at the left to near-white at the right, a gentle vignette in the corners. The only motion is a
very slow, barely perceptible drift of soft light across the backdrop from right to left. Large clean
empty space across the entire frame. Soft key light from the upper right, neutral-cool daylight, gentle
fill, no hard shadows; calm, minimal, clean neutral grade with fine film grain. Silent room tone only.
CONTINUITY: CB-01 (pasted verbatim)
```
`negativePrompt` (Vertex only): `text, letters, captions, subtitles, signage, numbers, watermark, logo, user interface, screen, people, hands, camera shake, lens flare, particles, glossy floor`

**Same plate in Runway Gen-4.5 (Text-to-Video, 16:9, 10 s, 24 fps), positive phrasing**
```
Locked camera; the camera is entirely motionless for the duration of the scene. An empty seamless
studio of soft radial light, blue-grey at the left fading to near-white at the right, with a gentle vignette.
A faint band of soft light drifts slowly from right to left across the backdrop. Clean unmarked surfaces,
softly out of focus. Neutral-cool daylight from the upper right. Minimal, clean, fine film grain.
```

**Remotion note.** The UI and type are React components; the plate is an `<OffthreadVideo>` with CSS
`filter: blur(40px)`. All eases use `Easing.bezier` with clamping [M §19.3]. A motion-kit build maps
this shot onto its UI-demo scene via the `motion-director` skill.

### 10.2 Example B: 3D product hero shot (hardware card reader reveal)

Premise (illustrative): Northwind ships a small physical card reader. The client supplies a CAD
render. The product **must not be redrawn by AI** [M §21.5 AA-G9]. Two production paths are given:
(B1) render the move in 3D and use AI only for the environment plate; (B2) image-to-video from the real
render, used only if the QC overlay passes.

```
═══ SHOT S09 · Hero / reveal · "The reader is revealed as a precise, premium object" ═══
FORMAT        aspect 16:9 · delivery 1920×1080 · 30 fps · 2.50 s = 75 f · token SD (hero beat, once per film)
              B1: 3D render 30 fps native + Veo 3.1 Quality plate 1080p 24 fps 8 s (use 1.5-5.0 s) ·
              B2: Runway Gen-4.5 I2V 720p 24 fps 5 s → upscale 4K → downscale 1080p, conform optical flow
LAYERS        L0 plate: generated studio with soft haze band (Veo) · L1 hero: CAD render of the reader
              (B1 rendered; B2 start frame) · L2 UI: n/a (no screen content in this shot) ·
              L4 type: n/a in shot; STR-09A lands in S10 · L5: one specular sweep (compositor), grain 2%
COMPOSITION   start: reader at (50%W, 56%H), 22% W, slightly below centre · end: reader at (50%, 54%), 38% W ·
              empty zone y 6-24% H across the full width (S10 headline lands there) · horizon/plinth top at y 72% H
PRODUCT       card reader, matte white body + brushed aluminium edge band; yaw 25° → 10° (camera arc, the object
              is still); soft contact shadow lower left, 6% opacity, blur 30 px
ANGLE / LENS  slightly high, 8° down-tilt · telephoto 85-100 mm feel [mm inferred]
CAMERA PATH   CM-04 hero dolly-in through a foreground haze band, combined with a 15° arc (one move: a curved
              dolly on one path) · start medium-wide → end medium close-up · roll 0° · exit = land and hold
              20 f with CM-02 breathe (+1.5%)
SPEED         f0-f55: magnification ×1.73 (22% → 38% W), E-SETTLE (long tail), peak ≈1.1% scale/f at f12 ·
              f55-f75 hold with breathe 0.07% scale/f E-LINEAR
PLANES        FG: haze band from the plate's own palette, passes the lens f8-f30, blur 24 → 60 px, speed 1.8× ·
              MID: product, always sharp · BG: radial studio, blur 50 px, contrast 60%, speed 0.6×
LIGHTING      key soft from the upper right ~5600 K [inferred]; thin rim on the aluminium edge from the upper right;
              specular sweep crosses the edge band left → right f40-f60 (compositor, 10% opacity)
MATERIALS     matte white polymer (roughness high, no specular hot spot) · brushed aluminium (anisotropic,
              streaks horizontal) · plinth: matte #F4F5F8 (no reflections)
UI            n/a (device screen is off: a blank black glass panel; no UI in the hero beat)
TYPE          n/a in S09 (STR-09A "Tap. Paid. Reconciled." lands in S10, T-DISPLAY) · keep the empty zone clear
TIMING        f0        cut in on the downbeat; camera already moving (momentum from S08)
              f0-f55    dolly-arc per CAMERA PATH                                    E-SETTLE
              f8-f30    haze band passes the lens, bokeh grows 24 → 60 px              (follows the camera)
              f40-f60   specular sweep across the aluminium band                     E-INOUT
              f55-f75   hold, breathe +1.5%                                          E-LINEAR
OBJECTS       product: static (all motion is the camera) · haze: drift 0.1% W/f leftward
TRANSITIONS   IN  TR-04 motion-match cut from S08 at f0: S08's forward push (E-EXIT, last 6 f) continues as this
                  dolly; screen direction forward/into frame
              OUT TR-19 empty-plate cut to S10 at f75: S10 opens on the same plate take with the product
                  removed, then STR-09A reveals in the empty zone (1 f gap, no flash)
MOTION BLUR   180° shutter on L1 and FG f0-f20 (the dolly peaks above 5% W/f at the frame edges); off after f20
DOF           focal plane = the front face of the reader; FG bokeh 24-60 px; BG 50 px; no rack
CONTINUITY    CB-01 pasted · refs: product_front.png, product_34.png (CAD, plain bg), SF-01.png · seed 8812 ·
              B1 plate tier Veo 3.1 Quality 1080p · B2 start frame = CAD render frame 0 at exact framing ·
              prev S08: forward motion, same key direction · next S10: same plate take, product removed
PALETTE       bg-a #C8D4DF · bg-b #F4F5F8 · product white #FAFAFA · aluminium neutral greys · accent: none in this
              shot (the accent appears only when the product acts, S11)
SOUND         F10 reverse swell ending at f0 (from S08) · F12 sub hit at f12 (peak velocity ±2 f), −4 dB ·
              F16 air bed −42 dB · F13 soft tonal ting at f50 on the specular sweep, −10 dB · generated audio muted
UNCHANGED     product geometry, proportions, colourway, port and button positions; no text or logo on the device
              unless supplied as a texture from CAD; key direction; plate grade
NEGATIVES     N-TEXT · N-WARP · N-FX · N-SURF · shot-specific: second device, cables, hands, extra buttons,
              changed proportions, screen content
QC            B2 only: overlay the CAD silhouette on f0, f37, f75 (difference mode): edge deviation ≤0.5% W,
              else reject the take and use B1 · step f0-f30 for haze crossing the product (it must not
              occlude the front face) · plinth reflection absent
```

**B1 tool prompt: environment plate only (Veo 3.1 Quality, Frames: first + last, 16:9, 1080p, 8 s)**
Start and end frames are Nano Banana renders of the **empty** set (no product), framed to match the
3D camera's first and last frames. The product is composited from the 3D render.
```
Single slow curved dolly-in that arcs about 15 degrees to the right around the centre of an empty
matte plinth, decelerating smoothly to a stop, moderate telephoto look, focus on the plinth's front edge.
A soft horizontal band of pale haze in the foreground passes close to the lens and dissolves into soft bokeh.
Seamless studio backdrop with a radial gradient from blue-grey at the left to near-white at the right.
Soft key light from the upper right, neutral-cool daylight, gentle fill, no hard shadows. Clean empty space
across the top quarter of the frame. Calm, precise, clean neutral grade, fine film grain.
CONTINUITY: CB-01 (pasted verbatim)
```
Negative (Vertex): `text, logo, watermark, objects on the plinth, people, hands, glossy floor, reflections, lens flare, camera shake, roll`

**Keyframes for B1 (Nano Banana Pro, 16:9, 2K)**
```
Generate a 16:9 2K image. Slightly high angle, 8-degree down tilt, moderate telephoto look (about 90 mm, f/4).
An empty matte off-white plinth, its top edge at 72% of frame height, centred. Seamless studio backdrop lit as
a smooth radial gradient from blue-grey #C8D4DF at left to near-white #F4F5F8 at right with a gentle vignette.
Soft key light from the upper right, neutral-cool daylight, faint soft shadow falling to the lower left.
A pale band of haze floats in the foreground, softly out of focus. Clean empty area across the top quarter.
Clean unmarked surfaces. Clean neutral grade, fine grain.
```
End frame: same prompt via an edit of the start frame: "keep the camera position, lighting, materials
and colours exactly the same; move the camera closer and 15 degrees to the right so the plinth front edge
fills 60% of the frame width; the haze band is now behind the camera" (§8.2).

**B2 tool prompt: image-to-video from the real render (Runway Gen-4.5 I2V, 16:9, 5 s, 24 fps, fixed seed)**
```
The camera performs a single slow curved dolly-in, arcing slightly to the right around the device while
moving closer, then decelerates smoothly and holds still for the final second. The device stays perfectly
still and keeps its exact shape. A soft band of pale haze drifts past close to the lens and becomes soft
bokeh. Clean, precise studio product shot.
```
(No negative field. Re-describing the device is avoided on purpose [D:runway-gen4-guide].)

**B2 alternative: Kling 3.0 (start + end frame, 5 s, 16:9, 1080p, audio off, cfg 0.7)**
```
@Element1 (the card reader) rests on a matte plinth and does not move. The camera makes one slow curved
dolly-in, arcing slightly right, decelerating to a still hold. Soft haze in the foreground passes the lens
into bokeh. Studio of soft blue-grey to near-white radial light, soft key from the upper right.
Precise, calm, premium product film. CONTINUITY: CB-01
NEGATIVE: warped geometry, extra buttons, text, camera shake
```

### 10.3 Example C: abstract tech transition (data stream → product world)

Purpose: the bridge between Problem (S03, a dense dark grid of scattered data points) and Product
(S04, the clean light studio with the first UI card). It uses TR-14 (light build) into TR-05 (shape
match): a point of light gathers, grows and becomes the exact rounded rectangle of the S04 UI card.
The generator makes only the **light**. The rectangle that lands is the real composited card.

```
═══ SHOT S03b · Transition, problem → product · "Chaos condenses into one clear surface" ═══
FORMAT        aspect 16:9 · delivery 1920×1080 · 30 fps · 1.20 s = 36 f · token SD (bridge)
              generation: Veo 3.1 Fast, Frames first + last, 1080p, 24 fps, 8 s clip (1080p requires 8 s);
              retime the clip so the convergence lands on f24-f30 · conform optical flow; light layer screened
              over the composite
LAYERS        L0: generated light-field plate (dark → light) · L2 UI: S04 card (composited, appears f30) ·
              L4 type: none · L5: 1 white-ish bloom frame (#F4F5F8 at 85%) at f29
COMPOSITION   convergence point at (50%W, 52%H) = the centre of the S04 card; card final box 62% W × 39% H;
              no text in this shot
PRODUCT       n/a (the "product" is the card shape arriving; it is UI, composited)
ANGLE / LENS  face-on · wide 24 mm feel during the pull-in (slight barrel on the particles), orthographic at the landing
CAMERA PATH   CM-15 zoom-through toward the convergence point: scale 1.0 → 1.6 (E-ZOOM, log space) f0-f24,
              then the scale holds; roll 0°
SPEED         f0-f24: per-frame ratio ≈×1.020 (≈1.6× over 24 f); points travel inward at 1 → 6% W/f
              (accelerating, E-EXIT) · f24-f30: light gathers, no camera motion · f30-f36: card settles (E-OUT)
PLANES        FG: a few near points, 3-4× size, blur 20 px, speed 2× · MID: point cloud converging (sharp
              points 2-4 px) · BG: dark navy #0B1020 → studio #C8D4DF/#F4F5F8 (colour ramp f18-f30, E-LINEAR)
LIGHTING      self-lit points (emissive), no key until f24; from f24 the studio key from the upper right fades in
MATERIALS     emissive points only (one material); the card is matte white (CB-01)
UI            S04 card, state UI-C0 (empty frame of the card: border, shadow, header bar; no readable text until S04 f6)
TYPE          none (no text event under 25 f [M §9.12])
TIMING        f0-f24    points converge on (50%,52%), speed rising; zoom 1.0 → 1.6         E-EXIT / E-ZOOM
              f18-f30   background colour ramp navy → studio                              E-LINEAR
              f24-f29   converged light forms a rounded rectangle glow matching the card box ±5% W
              f29       bloom frame (85% #F4F5F8)
              f30-f36   real card layer appears at 100% under a fading glow, border sharp by f32  E-OUT
OBJECTS       point cloud: inward radial motion; no swirl (one direction)
TRANSITIONS   IN  TR-04 from S03 at f0: S03's points were already drifting inward at 0.5% W/f
              OUT TR-05 shape match + TR-14 light build to S04 at f36: card box identical (x, y, w, h, radius 16 px)
                  across the cut; S04 begins its UI build at f0 (border already present)
MOTION BLUR   180° on points above 5% W/f (f14-f24); off on the card
DOF           FG points blurred 20 px; everything else sharp; no rack
CONTINUITY    CB-02 "Night grid" for f0-f18 and CB-01 for f24+ (the transition is the world-rule switch:
              dark = problem, light = product [M §1.4]) · start frame: S03 last-frame still · end frame:
              Nano Banana render of a soft white rounded-rectangle glow on the studio backdrop at the exact
              card box · seed 5531 · tier Veo 3.1 Fast 1080p
PALETTE       night #0B1020 · points #8FB4FF (cool data) · bloom #F4F5F8 · studio bg-a/bg-b · accent #2F6BFF
              is NOT used here (it means "the product is acting", which starts in S05)
SOUND         F10 reverse swell f6-f28 rising −30 → −15 dB · gap 3 f (f27-f29) · F13 bright tonal ting at f30 on
              the card landing, −6 dB · music: arrangement turns at f30 (the product chord) · Veo audio muted
UNCHANGED     card box geometry and position from f30 into S04; world-rule colours; no text anywhere
NEGATIVES     N-TEXT · N-WARP · shot-specific: swirl, vortex, lightning, rainbow colours, lens flare streaks,
              digital rain, code, numbers, grid lines in the final frame
QC            overlay the S04 card box on f29 and f30: glow centroid within ±1% W, glow bounds within ±5% W;
              step f24-f36: no pseudo-glyphs in the point cloud; colour ramp has no banding (10-bit or dither)
```

**Tool prompt: light plate (Veo 3.1 Fast, Frames to Video: first + last, 16:9, 1080p, 8 s)**
```
Slow push-in toward the centre of the frame that gradually speeds up, wide-angle look. Hundreds of tiny
cool-blue points of light on a deep navy background drift inward from every edge toward one point at the
centre, accelerating as they travel and leaving short soft streaks; a few large out-of-focus points pass
close to the lens. As they converge, the background brightens smoothly from deep navy to a soft blue-grey
studio light, and the gathered light settles into one soft, glowing white rounded rectangle at the centre
of the frame, matching the final frame. Clean, minimal, no clutter, fine film grain.
CONTINUITY: points cool blue #8FB4FF on navy #0B1020 at start; end world = CB-01 (pasted verbatim)
```
Negative (Vertex): `text, letters, numbers, code, digital rain, grid lines, logo, watermark, swirl, vortex, lightning, lens flare, rainbow colours`

**Same bridge in Kling 3.0 (start + end frame, 5 s, 16:9, 1080p, Multi-Shot off, cfg 0.7)**
```
Countless tiny blue points of light on a deep navy background stream inward toward the centre of the frame,
speeding up; the camera pushes slowly forward. The background brightens into soft blue-grey studio light
and the light gathers into one soft white glowing rounded rectangle at the centre. One continuous shot.
Minimal, clean, calm. NEGATIVE: text, swirl, lens flare, flicker
```
The start and end frames are very different here (dark vs light). Kling may insert a cut [D:kling-start-end].
If it does, generate f0-f24 as one clip from the start frame only, and build the colour ramp and the
glow-to-card landing in the compositor.

**Composite-only fallback** (no generation): Remotion particle field (≈600 points, seeded), radial
velocity with E-EXIT, log-space zoom, `<CameraMotionBlur>` 180° on f14-f24, then the S04 card. This is
deterministic and on the beat, and it is usually the better choice for a 1.2 s bridge [M §7.14.1 principle 1].

---

## 11. Supporting templates

### 11.1 Camera block (from [M §6.12])
```
CAMERA: {CM-..} from {start framing, % of frame} to {end framing} over {s / f}, ease {BREATHE|SETTLE|GLIDE|
  ATTACK|READ|INTO-CUT}, peak ≤ {x}% W/f, roll 0°, horizon level, no handheld shake.
LENS FEEL: {orthographic flat | telephoto 85-135 mm | normal 35-50 mm | wide 18-24 mm} [mm values inferred]
FOCUS: on {plane}; background blur {none|soft|heavy}; foreground {none|soft bokeh}.
EXIT: {hold still | accelerate into cut | whip right with blur | land and hold N frames}.
NEGATIVE: camera shake, roll, dutch angle, sudden zoom, orbit, warped straight lines, text, subtitles, logo.
```

### 11.2 Transition block
Use the full template in [M §7.14.2]: type, cut frame and driver, the outgoing half, gap, the incoming half,
the matched element ±5 % W, camera, sound, must-stay-same, negatives, QC frame range.

### 11.3 Continuity bible
Use the token table in the skill (Phase 17): product design, UI, colours, typography, lighting direction,
materials, camera physics, geography, objects, characters, scale, animation language, transition logic.
Each **look** gets one CB- block (§9.3). Each shot cites its CB- ID plus the N → N+1 note.

### 11.4 Sound cue sheet (per film)
```
CUE  frame   time    family  anchor (visual event)          level (rel. bed)  notes
C01  f0      0.00    F16     film start                      −42 dB floor      air bed throughout
C02  f52     …       F01     S05 press frame                 clear in −3 dB dip  dry, ≤60 ms
…
Generated audio from every AI clip: muted (AA-G10).
```

### 11.5 Generation log (one row per kept take) [M §21.5 AA-G14]
```
shot  take  tool/model/tier         mode            prompt hash  negative   seed   refs / start / end     res    dur  ar    date        QC
S05   t3    Veo 3.1 Fast (API)      T2V             a91f…        N-TEXT+…   41207  SF-01                  1080p  8s   16:9  2026-10-08  pass
S09   t2    Runway Gen-4.5 I2V      I2V             3c0e…        (none)     8812   cad_f0.png             720p   5s   16:9  …           fail: edge dev 0.9%
```
Download within 2 days for Veo; the server deletes clips after 2 days [D:veo-api].

### 11.6 Reference-video teardown (Phase 2 analysis of the user's reference)

Use this whenever the user supplies a reference video (SKILL Q12). The **full** version is for a flagship
brief; the **light** version (columns marked ●) is the minimum the SKILL fills before Part A. Its numbers
feed the Phase-18 comparison ("package vs. reference: pace, density, palette, type scale, camera energy").
The eight teardowns in `research/videos/` use a 13-column shot table; the fields it lacks (angle, scale,
perspective, motion rhythm, speed changes, reflections, motion trails, why it works) sit in their prose
studies and WHY notes. New teardowns use this table so every field has a column [inferred: template design].

**A. Film header (●).** Title, source, runtime (s and frames), delivery fps vs. animation fps (look for
on-twos or pulled-down cadence), aspect, resolution, bit rate, integrated LUFS / true peak, BPM, shot count
from the timeline, ASL and median, longest shot, hero moments (time and % of runtime), style category
(Part 10 card), story template (P01 §2.4 T1-T12) with its stage bars in % of runtime.

**B. Per-shot table (one row per shot; ● = light version).**

| Column | What to record (units) |
|---|---|
| ● # / time / duration | Shot number; in-out in s and frames; duration in s (f) and the SD- token it matches |
| ● Composition / framing | Focal point in % coordinates; empty space; grid anchor; safe-area use |
| Angle | Eye-level / high / low / top-down; tilt in degrees |
| Scale | Subject size in % W or cap % H; scale change across the shot |
| Perspective | Orthographic / 3D with vanishing point; lens feel (mm-equivalent, [inferred]) |
| ● Camera move | CM- ID; start → end framing; peak % W/f or % scale/f; ease |
| ● Object / UI / text motion | Each moving element: property from → to, frames, ease token (E-), cause |
| Depth / layering | Planes (FG / MID / BG), blur per plane in px @1080p, speed ratio per plane (parallax) |
| Lighting / background | Key direction, colour temperature (K, inferred), background type |
| ● Palette | Hex samples (from a 1:1 crop), accent and its meaning |
| ● Typography | Family class, weight, cap % H, reveal / exit IDs (RV-, EX-), frames per SP-T0 |
| Motion rhythm | Events per second in the shot; where the shot accelerates or rests |
| Speed changes | Ramps, freezes, speed-ups (from → to, frames) |
| ● Transition out | TR- ID; cut frame; cause (action, beat, VO word); both halves |
| ● Ease | E- tokens observed (curve read from frame-stepped positions) |
| Blur / glow / shadows | Motion blur (shutter), glow radius and source, shadow direction and softness |
| Reflections / grain / texture | Reflections or specular sweeps; grain σ; surface texture |
| Motion trails | Echo, smear or trail effects; length in frames |
| DOF / parallax | Focal plane; rack timing; parallax ratio |
| 2D / 3D | D0-D4 dimension (Part 10) |
| ● Why it works | One sentence: the mechanism (attention, causality, rhythm, readability) that makes the shot land |

**C. Measurement recipe (per P11 §22.6).**
1. Index frames exactly (`select=eq(n\,N)`), never by seek time; step every move frame by frame.
2. Speeds: displacement per frame ÷ frame width = % W/f; scale change per frame = % scale/f.
3. Cuts: count from a contact sheet (`tile`) and frame stepping, not from a scene detector, which misses
   30-70 % of text and white cuts (P08 ER-01).
4. Rhythm: shots ÷ runtime → ASL; median; long holds ≥ 2 × ASL; hero times as % of runtime.
5. Sound: `ebur128=peak=true` for LUFS / dBTP / LRA; tempo from onset spacing; sync rate of cuts within
   ±2 f of transients against chance (P08 §15.1).
6. Cadence: per-frame difference scan for duplicate-frame periods (on twos, 25 → 30 pulldown).

**D. Transferable rules.** 5-15 numbered rules, each with a number and a timestamp ([V:id t=..s] style),
then a short "what to avoid" list with the flaw, its timestamp and the fix.

---

## 12. Sources

Fetched 2026-10-08 unless noted.

**Vendor documentation [D]**
- [D:veo-api] Google AI for Developers, "Generate videos with Veo 3.1 in Gemini API": https://ai.google.dev/gemini-api/docs/veo
- [D:gemini-video] "Video generation in the Gemini API" (Omni Flash default, Veo 3.1 for extension and last frame): https://ai.google.dev/gemini-api/docs/video
- [D:vertex-prompt] Google Cloud, "Video generation prompt guide" (updated 2026-07-23): https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/video-gen-prompt-guide
- [D:vertex-best] Google Cloud, "Best practices for generating videos": https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/best-practice
- [D:vertex-veo31] Google Cloud, Veo 3.1 model page (IDs, GA and preview dates): https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate
- [D:vertex-extend] Google Cloud, "Extend videos": https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/extend-videos
- [D:veo31-guide] Google Cloud Blog, "The ultimate prompting guide for Veo 3.1" (2025-10-15): https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1
- [D:flow-create] Google Flow Help, "Create videos in Google Flow": https://support.google.com/flow/answer/16353334?hl=en
- [D:flow-models] Google Flow Help, "Learn about Google Flow models & supported features": https://support.google.com/flow/answer/16352836?hl=en
- [D:nb-guide] Google Cloud Blog, "The ultimate Nano Banana prompting guide" (2026-03-05): https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-nano-banana
- [D:sora-cookbook] OpenAI Cookbook, "Sora 2 Prompting Guide" (updated March 2026): https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide
- [D:runway-gen45] Runway, "Creating with Gen-4.5": https://help.runwayml.com/hc/en-us/articles/46974685288467-Creating-with-Gen-4-5
- [D:runway-gen4-create] Runway, "Creating with Gen-4 Video": https://help.runwayml.com/hc/en-us/articles/37327109429011-Creating-with-Gen-4-Video
- [D:runway-gen4-guide] Runway, "Gen-4 Video Prompting Guide": https://help.runwayml.com/hc/en-us/articles/39789879462419-Gen-4-Video-Prompting-Guide
- [D:runway-i2v] Runway, "Image to Video Prompting Guide": https://help.runwayml.com/hc/en-us/articles/48324313115155-Image-to-Video-Prompting-Guide
- [D:runway-camera] Runway, "Camera Terms, Prompts, & Examples": https://help.runwayml.com/hc/en-us/articles/47313504791059-Camera-Terms-Prompts-Examples
- [D:runway-aleph] Runway, "Aleph 2.0 Prompting Guide": https://help.runwayml.com/hc/en-us/articles/52150503729171-Aleph-2-0-Prompting-Guide
- [D:runway-edit] Runway, "Creating with Edit Studio": https://help.runwayml.com/hc/en-us/articles/51683104370451-Creating-with-Edit-Studio
- [D:runway-gen3] Runway, "Gen-3 Alpha Prompting Guide" (retirement notice; seen in search snippet only): https://help.runwayml.com/hc/en-us/articles/30586818553107-Gen-3-Alpha-Prompting-Guide
- [D:kling-3] Kling AI, "Kling VIDEO 3.0 Model User Guide" (2026-02-06): https://kling.ai/quickstart/klingai-video-3-model-user-guide
- [D:kling-start-end] Kling AI, "Start and End Frames": https://kling.ai/quickstart/ai-video-start-end-frames
- [D:kling-guide] Kling AI blog, "Kling AI Prompt Guide" (2026-08-07): https://kling.ai/blog/kling-ai-prompt-guide
- [D:hf-dop] Higgsfield Help Center, "How to use Higgsfield DoP for image-to-video": https://higgsfield.ai/creator-hub/help-center/ai-models/how-do-i-use-dop
- [D:mj-video] Midjourney Docs, "Video": https://docs.midjourney.com/hc/en-us/articles/37460773864589-Video
- [D:mj-oref] Midjourney Docs, "Omni Reference": https://docs.midjourney.com/hc/en-us/articles/36285124473997-Omni-Reference
- [D:mj-params] Midjourney Docs, "Parameter List": https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List

**Third-party [3P]**
- [3P: hf-camera] Higgsfield blog, "How to Control Camera Movement, Angles, and Lens in AI Video" (vendor marketing; Cinema Studio 3.5 settings): https://higgsfield.ai/blog/ai-video-camera-control
- [3P: higgsfield-kling3] Higgsfield blog, "Kling 3.0 on Higgsfield" (2026-02-12): https://higgsfield.ai/blog/Kling-3.0-is-on-Higgsfield-User-Guide-AI-Video-Generation
- [3P: higgsfield-sora] Higgsfield blog, "Sora 2 API Shutdown: Best Alternatives and How to Migrate": https://higgsfield.ai/blog/sora-api-migration-guide
- [3P: futurum] The Futurum Group, "OpenAI Sora Discontinuation" (2026-04-12; search snippet only): https://futurumgroup.com/insights/openai-sora-discontinuation-what-the-end-of-a-platform-means-for-enterprise-ai-strategy/
- [3P: pillitteri] "OpenAI shuts down the Sora 2 API" (search snippet only): https://pasqualepillitteri.it/en/news/18764/openai-sora2-api-dismessa-en
- [3P: fal-kling3] fal.ai, "Kling Video V3 Standard API" (parameters): https://fal.ai/docs/model-api-reference/video-generation-api/kling-video-v3-standard
- [3P: magnific] Magnific API docs, Kling 3 (max 6 shots; search snippet only): https://docs.magnific.com/api-reference/video/kling-v3/generate-std
- [3P: veed] VEED, "Kling 2.5 Turbo Prompting Guide" (search summary only): https://www.veed.io/learn/kling-2-5-turbo-prompts
- [3P: hedra] Hedra, "Kling 2.5 Turbo" (search summary only): https://www.hedra.com/models/video/kling/25-turbo
- [3P: wan27] "Veo 3.1 Prompt Guide" (search summary only): https://wan27.org/blog/veo-3-1-prompt-guide

**Gaps / not verified**
- Gemini Omni Flash frame rate, and whether Flow exposes a negative-prompt field.
- Kling 3.0 native frame rate; the multi-shot cap (5 vs 6 depends on the host); 4K on Kling's own platform.
- Runway's "Animate Frames" keyframe app (start/end frames for Gen-4.5): named in [D:runway-gen4-create], not read.
- Higgsfield DoP output resolution and fps; whether Cinema Studio settings fully pin the camera path (vendor claim).
- That quotation marks trigger rendered text outside Google's models (inferred from [D:vertex-best]).
- All Kelvin values and mm lens equivalents in the templates are inferred [M §10.4].
