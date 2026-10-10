# Production routes: three ways to build each style

The reference videos mix three kinds of material:
1. Motion design made in code or After Effects: type, UI, charts and shapes.
2. Generated or rendered imagery: 3D renders, AI images and AI video clips.
3. Real material: filmed footage, photos and screen recordings.

This file turns each of the 13 styles in [`style-playbook.md`](style-playbook.md) into three production routes, so a style can be made with whatever tools are available.

| Route | Tools | What it can make | Cost |
|---|---|---|---|
| **A. Claude Code only** | Claude Code + motion-kit (JSON specs) + custom Remotion code | Type, UI cards, cursors, charts, orbs, gradients, logo moves, transitions. Everything drawn in code. | Free (render time only) |
| **B. Claude + AI generation** | Route A plus AI image and video tools (Higgsfield, Veo/Flow, Kling, Runway) for *plates*, composited in motion-kit `image` / `clip` scenes | Everything in A, plus 3D products, characters, cinematic shots, textures and cut-out objects | Generation credits |
| **C. Claude Design → Claude Code** | Claude Design (or any HTML design surface) for style frames and screens, then Claude Code to animate them | Exact layouts, brand screens and UI states as still frames to animate. Best for UI films and editorial layouts. | Free to low |

**The rule all three share:** code renders anything that must be exact, and generators render only what code can't draw.
- **Exact (code):** text, numbers, logos, UI, the cursor, charts.
- **Generated (AI):** objects, worlds, people, light.
- AI tools still garble text and logos. So never put readable copy inside a generated plate; overlay it in motion-kit. This is also how the strongest references are built: real UI and real type on top of rendered or filmed backgrounds (Artlist 182, Willow 227, Microsoft 240).

## How route B fits together

1. **Plan the shots.** Use the `motion-creative-director` skill. It writes a shot list, a continuity bible (palette, lighting, lens, materials) and one plate prompt per shot (`references/prompt-templates.md`).
2. **Generate stills first, then animate.** Lock the look on 3–5 key frames (image model), then turn the approved stills into short clips (image-to-video). This is far cheaper and more consistent than prompting video from text.
3. **Keep plates consistent.**
   - Reuse the same reference image or element for the product or character, and the same palette words and lighting phrase in every prompt.
   - Fix the seed when the tool allows it.
   - One lens and one lighting setup per film.
4. **Prepare the plates.**
   - Remove backgrounds for cut-outs (collage, stickers, products floating over UI).
   - Upscale to 2× the output size.
   - Trim clips to the useful 2–4 s.
5. **Composite in motion-kit.**
   - Put plates in `motion-kit/public/images/` and `public/clips/`.
   - Use `image` scenes (`fit: cover|contain`, `move: in|out|left|right`) and `clip` scenes (`trim`, `caption`, `area`, `scrim`, and `generated: true` for AI footage).
   - Titles, stats, prompts and the CTA stay as native scenes between and over them.
6. **Check:** `npm run check` and `npm run qa`, as for any video.

### Plate prompt shape (works across image and video tools)

```
[SUBJECT, specific], [ACTION or POSE, one verb], [SETTING / BACKGROUND, plain],
[LIGHTING: one setup], [CAMERA: lens + move], [MATERIAL / TEXTURE words],
[PALETTE: 2-3 named colours or hex], [MOOD], no text, no logos, no watermark
```

Video plates add: duration (3–5 s), one camera move, and "subject stays centred, slow and smooth". Write the camera move in plain words, like "slow dolly in" or "orbit left 20 degrees". Never ask for more than one move per clip.

### Route C in practice

Claude Design is used here as a **style-frame and screen tool**, not as the animator.
1. Design 3–6 key frames at the target size (1920×1080 or 1080×1920): the hero title, UI states, the end card.
2. Export each frame or screen as PNG. Or keep the HTML and ask Claude Code to port its layout into a Remotion component, so the same layout can then animate.
3. Animate in motion-kit. Use stills as `image` scenes with a slow `move`, or rebuild the frame's text natively so it can animate word by word (always better for type).
4. Use the frames as the style reference for route A or B, so every shot matches.

Route C gives the most control over composition and brand. Its limit: anything that moves *inside* the frame (cursor clicks, counters, morphs) still has to be built in code (route A).

## The 13 styles × 3 routes

Abbreviations: **K** = motion-kit native scene or field; **R** = custom Remotion code (move numbers M01–M39 in [`motion-techniques.md`](motion-techniques.md)); **G** = generated plate.

### 1. Dark gradient AI launch

**A. Code only**
- Recipe `style-dark-gradient-launch` (K).
- Add the tilted UI glide (R M26) on a real screenshot, chrome numerals with a light sweep (R M18), and a conic orb (R M21b).

**B. With generation**
- **G (image):** "abstract volumetric light ribbon in deep black space, violet and electric blue glow, soft bloom, macro lens, no text". Use it as the background behind `orb`, `kinetic` and `stat`.
- **G (video, image-to-video):** "slow dolly in through glowing violet light ribbons, smooth, 4 s".
- **Variations:**
  - Fire palette: "molten orange lava light, black background".
  - Aurora: "green and blue aurora light behind glass".

**C. Design first**
- Design the black hero card (version name, one gradient word) and 2 UI states in Claude Design.
- Export the UI states as PNGs for `image` scenes, and rebuild the title natively.

### 2. Whitespace UI film

**A. Code only**
- Recipe `style-whitespace-ui` (K) with real product screenshots as `image` (`fit: contain`).
- Add a dropdown, toggle or model picker and multiplayer cursors (R M24, M25).

**B. With generation**
- Usually no generation is needed. This style's power is real UI.
- Optional **G (image):** a soft background photo behind the glass prompt pill (Codex 224): "soft focus pink cosmos flowers against pale sky, shallow depth of field, airy, pastel, no text".

**C. Design first (best route for this style)**
- Design the screens and every UI state (empty, typing, result) in Claude Design at 2× size.
- Animate the states with `prompt` and `chat` (K), or port the HTML to a Remotion component so the cursor can click the real layout (R M23).

### 3. Kinetic typography

**A. Code only (best route)**
- Recipe `style-kinetic-manifesto` (K).
- Add serif-italic emphasis (R M05), caret typing with deletions (R M06) and scattered layouts.

**B. With generation**
- **G (image, background removed):** small objects or photos to sit *inside* the sentence (R M07). For example: "single glossy 3D emoji-like coffee cup, isolated on white, soft studio light, centred". Remove the background.
- **G (video):** abstract texture loops behind the type, like "slow ink in water, black and white, macro, seamless loop".

**C. Design first**
- Set the key type layouts (word positions, sizes, line breaks) as frames in Claude Design.
- Rebuild them as `kinetic` and `title` scenes so the words animate.

### 4. Editorial / Swiss

**A. Code only**
- Recipe `style-editorial-serif` (K).
- Add dashed rings, a number constellation and dot-grid particles (R M15, M16), and outline-to-fill marks (R M20).

**B. With generation**
- **G (image):** monochrome photo plates with grain, like "aerial view of people walking in a plaza, overcast, muted warm tones, film grain, documentary".
- **G (image):** engraving or stipple illustrations, like "19th-century engraving style illustration of a brain, black ink on cream paper, no text".

**C. Design first (strong route)**
- Design the grid, the serif and sans hierarchy and one accent in Claude Design.
- Export the layouts and animate them with fades and word builds.

### 5. Gradient mesh / orb / blob

**A. Code only (best route)**
- The `orb` scene with `look.background: aurora` (K).
- Add a moving mesh gradient (R M33), a metaball merge (R M22) and a conic disc (R M21b).

**B. With generation**
- **G (video):** "iridescent glass sphere slowly rotating, thin-film rainbow rim, black background, macro, 5 s loop". Use it as an alternative hero to the code orb.
- **G (image):** "soft holographic gradient fabric folds, lavender peach and sky blue, matte, no text" as a backdrop.

**C. Design first**
- Pick the exact gradient stops and blob shapes as frames, then reproduce them in CSS (R M33). Gradients are cheap in code; a still exported from a design tool won't animate.

### 6. Neon / rim light / glow UI

**A. Code only**
- `theme: neon` (K).
- Add the rim-light sweep, the rotating conic border and light-streak transitions (R M17, M28, M32).

**B. With generation**
- **G (video):** "dark studio, thin electric blue light bar sweeping across a black glossy surface, reflections, 4 s".
- **G (image):** "dark trading desk with monitors, teal and lime glow, shallow depth of field, no readable text" as a background behind UI.

**C. Design first**
- Design the dark UI panels with glow borders.
- Export the panels, then let code add the glow animation over them.

### 7. 3D product CGI (clay, glass, chrome, hardware)

**A. Code only**
- Limited. Fake depth with tilted cards (R M26), CSS shadows and clay-like rounded cards. Fine for UI; it cannot make rendered objects.

**B. With generation (required route)**
- **G (image) clay:** "pastel clay 3D icons floating, calendar, chat bubble, chart, soft shadows, lavender background, studio light, no text".
- **G (image) hardware:** "matte black wireless mouse on black, single rim light tracing its edge, low key, macro, no logo".
- **G (video):** image-to-video on the approved still: "slow orbit right 15 degrees, rim light glides across the surface, 4 s".
- Composite your real logo and type over it in the kit. Never let the generator draw the logo.
- **Variations:**
  - Low key to high key (317).
  - Exploded view, generated as separate part stills and animated apart in code.
  - Pastel clay world (240).

**C. Design first**
- Design the end frame (product plus headline) and use it to direct the plate prompts.

### 8. Paper collage / founder story

**A. Code only**
- Captions, highlighter and underline (K: `kinetic`, `title` with `==mark==`, `background: paper`, Anton).
- Add stickers, torn edges and on-twos motion (R M36, M37, M39). Real photos are still needed.

**B. With generation**
- **G (image):** "teal construction paper texture, flat, top-down, subtle fibres".
- **G (image, background removed):** cut-out objects such as "red paper heart torn in two pieces, isolated" or "cardboard box with small plant, isolated".
- **G (image):** "isometric 3D small restaurant building, clay style, isolated on white".
- People and founders should be **real photos** with permission, not generated faces.

**C. Design first**
- Lay out each collage beat as a frame (positions, rotations, scale) in Claude Design.
- Export each element as a separate PNG and animate them in from those positions.

### 9. Archival / documentary montage

**A. Code only**
- Only with footage you already own, in `clip` scenes plus grain.
- Add headline boxes and HUD tracking boxes (R M12, M38).

**B. With generation**
- **G (video):** "black and white 1960s style film footage of a factory assembly line, film grain, gate weave, 4 s".
- **G (video):** "slow push in on a vintage computer terminal, monochrome, dust".
- Label AI footage with `generated: true`. Never present generated "archival" footage as real history.

**C. Design first**
- Design the title cards and subtitle style.
- Use real headline screenshots (with the source visible) as `image` plates.

### 10. Agency showreel

**A. Code only**
- `pace: fast`, `transition: cut`, a beat grid from `npm run music`, and `kinetic` type cards.
- Your real work goes in as `image` and `clip` scenes. There is no shortcut here.

**B. With generation**
- Only for fill-in transitions and abstract interludes, like "chrome liquid metal blobs morphing, black background, 3 s". Never for case work you didn't make.

**C. Design first**
- Design the type-card system (corner metadata, the "SHOW REEL" display treatment) once, then repeat it between cases.

### 11. Logo sting

**A. Code only (best route)**
- The `logo` scene (K).
- Add assemble, outline-to-fill, zoom-out-of-mark and dot re-form (R M19, M20, M31, M16) from the real SVG logo.

**B. With generation**
- A material background only: "magenta liquid glass swirl with a lime light streak, slow drift, 6 s" (Equals 210).
- The mark itself stays vector.

**C. Design first**
- Design the construction grid and final lock-up, export the SVG, then animate the paths in code.

### 12. Data storytelling

**A. Code only (best route)**
- `stat`, `bars` and recipe `style-year-recap` (K).
- Add a line chart that draws, odometer digits and countdowns (R M14b, M09b).

**B. With generation**
- A mascot or brand character between number beats: "cute blue jelly blob mascot, glossy, smiling, isolated, soft studio light" (Sanctum 265).
- Numbers always stay in code.

**C. Design first**
- Design the dashboard or chart frame, then rebuild the numbers natively so they count.

### 13. Talking head with spatial captions

**A. Code only**
- A real interview in a `clip` scene, `npm run voice` timings and `caption`.
- Add captions beside the speaker and a sticker cut-out (R M01b, M39).

**B. With generation**
- Only for cut-away B-roll that illustrates a sentence ("hands typing on a laptop, top-down, warm desk light"), labelled as generated. The speaker must be real.

**C. Design first**
- Design the caption style frames (position beside the head, key-number size), then build them in code.

## Variations without changing the style

The same style changes feel by moving one dial at a time. Keep the rest fixed.

| Dial | Options | How |
|---|---|---|
| Light / dark | paper ↔ black | `theme` (`studio` ↔ `studio-dark`, `clean` ↔ `mono`) or `look.bg` |
| Energy | calm ↔ punchy | `motion` (`calm`, `smooth`, `snappy`, `bouncy`) + `pace` + `transition` |
| Accent | one colour, swapped | `brand.accent` / `accent2` |
| Type voice | sans ↔ serif ↔ condensed | `look.displayFont` (Inter, Instrument Serif, Anton, Space Grotesk…) |
| Texture | flat ↔ grain ↔ paper | `look.grain`, `look.background` |
| Format | 16:9 ↔ 9:16 ↔ 1:1 | `format` (the kit reflows; re-check safe zones) |
| Imagery | none ↔ generated ↔ real | route A, B or C for the image scenes |

A brief that names a style and two dials ("whitespace UI, dark, serif") gives Claude enough to build a distinct variation without inventing a new look.

## What this file does not cover

- **Generation is not run automatically.** Route B needs the user's account and credits on the generation tool. Claude writes the prompts; the user, or a connected tool the user approves, generates the plates.
- **Rights.** Generated plates follow the tool's licence. Real footage, photos and music need the owner's permission. The kit's `generated: true` tag marks AI footage on screen.
