---
name: claim-film
description: Turn any product script into a premium 20–40 second claim film in the method of the CRED v6 build. Each claim gets one visual metaphor in its own engraved duotone world; the shots are joined by shape-match transitions; a phone or product mockup outro and a logo lockup end it; the score and SFX are composed to the cut list. Workflow is script → claims → metaphor table → storyboard with a frame budget → cue sheet → stills gate → render → motion QA → deliver → notes loop. Use when someone gives a script, a feature list or a launch brief and wants a polished motion film like a CRED, Apple or fintech launch, or says "make a video like the CRED one" for another product.
---

# Claim film: script in, premium claim film out

Worked example: the CRED IndusInd Bank RuPay card film, v6.4 (`motion-kit/src/custom/cred/CredCardV6.tsx`).
Read `reference/lessons.md` before starting. Every rule in it was paid for with a rejected version.

This skill gives the method, the transition library and the QA and audio scripts. It does not give a
one-click template. Each film gets its own composition, because each set of claims needs its own metaphors.

## 0. Inputs and the one question

You need:
- the script, or the claims;
- the brand name;
- the official logo file;
- a reference film, if there is one.

Ask at most one question, and only if the answer changes the film. The usual one: "Which claims must
appear word for word?" Otherwise proceed.

Hard rules (non-negotiable):
- **Real claims only.** Every on-screen claim must come from the script or the brand's own pages. Write
  the allowed claims into the storyboard and nothing else.
- **Official logo file, untouched.** Never redraw, retype or recolour a wordmark. Draw no third-party marks
  (banks, card networks, partners) unless the user supplies the official file and the right to use it.
- **No sensitive numbers.** No full card numbers, account numbers or real personal data on screen.
- **Label spec work.** If the brand did not commission the film, label every shared copy "unofficial spec work".
- **Licences.** Use licensed assets only (CC0 / CC-BY 3D models, OFL fonts), and credit CC-BY when publishing.
  Check Remotion's licence if a company of more than three people will use the output.

## 1. Claims → metaphors (the table that makes or breaks the film)

Write a table with one row per claim:

| Claim (exact words) | Metaphor (one concrete subject) | World duotone | Hero material | Headline |
|---|---|---|---|---|

How to fill it:
- **One claim, one metaphor, one world.** A fox in a growing garden for "rewards"; a globe with flight arcs
  for "travel"; a colonnade of plinths for "2,000+ products"; ₹0 rising from a shell like a pearl for "zero fee".
- **The metaphor must be a real, nameable subject.** Never an abstract shape. Viewers remember objects.
- **One hero material per world.** Foil, iridescence or glass goes on one thing at a time.
- **Headlines:** serif, top centre, gradient ink. A short sans sub-line holds the exact claim wording.

## 2. Storyboard with a frame budget

- Work at 24 fps and keep the film 20–40 s; 30 s = 720 frames.
- Budget the frames: about 5% opening, about 15% per claim, 10–12% for the mockup outro, 10% for the lockup.
- **Open fast.** The frame is full of motion within 0.5 s and the first headline lands before 3 s. A
  3-second slow build reads as "slow".
- **Each world gets a real camera move** (push, crane, orbit), plus one scale-step cut on a beat.
- **Pick a transition for every hand-over** from `reference/transitions.md`. Never use two of the same in a
  row, and never use a full-frame cross-dissolve.
- **Plan a readable close-up** wherever text lives on an object (a card strip or a label): the whole
  phrase on screen, centred, with nothing covering it.
- **Outro:** the product in a mockup (phone, card, device) on a clean set. The claims tick on in the UI,
  then the camera pushes into the screen, which becomes the lockup.

Write the storyboard as `docs/research/<slug>-brief.md`, using
`motion-kit/docs/research/cred-v6-claude-design-brief.md` as the template: palettes, type, copy, a
shot-by-shot frame table, transition rules and a QA list.

## 3. Build (Route C: Claude Code + Remotion)

Reusable pieces in `motion-kit/src/custom/cred/`:
- `v2/engrave.ts`: the engraving shader (wavy intaglio lines, duotone ramp, foil, skinning support).
- `v6/rig.tsx`: loads a glTF model, engraves it and plays its animation clip.
- `v6/kit.tsx`: palettes, `Headline`, `Lens` vignette, `Holo` foil.
- `v6/scenes.tsx`: worked worlds, plus the strip-split (`band`, `FoilEdges`) and globe-to-floor
  (`MATCH`, `GLOBE_TO_FLOOR`) transitions.
- `v6/outro.tsx`: the card face (canvas), the phone mockup with app screen, and words that blur in.

Build steps:
1. Copy `CredCardV6.tsx` and `v6/` into `src/custom/<slug>/`. Replace the worlds and keep the structure:
   overlapping `<Sequence>`s with no gaps; each take receives `from` and works in global frame numbers.
2. Find 3D subjects in the Khronos glTF sample assets (CC0 / CC-BY). Downsize textures to 1024 px JPEG and
   write `models/CREDITS.md`.
3. Register the composition in `src/Root.tsx` at 24 fps, 1920 × 1080.

## 4. Stills gate before any render

Render 6–12 key stills with `npx remotion still <bundle> <Comp> out.png --frame=N --gl=swangle`:
- one per world;
- every transition midpoint;
- the readable close-up;
- the outro.

Tile them and **send them to the user before rendering motion**. Fix what they flag. A full render
costs about 30 minutes; a stills pass costs about 3.

## 5. Score and SFX to picture

1. Write `public/custom/<slug>/cues.json` (the schema is in the script's docstring; the example is
   `motion-kit/public/custom/cred-v6/cues.json`):
   - **sections:** the edit's sections, each with a whole number of beats, so every cut lands on a beat.
     Use style `intro` for the opener, `groove` or `drive` for the claims, `ambient` for a calm world and
     `end` for the lockup. Add `quiet` ranges where the drums should drop out before a reveal.
   - **events:** one SFX per visual event, such as a whoosh on a camera move, an impact on a reveal, a riser
     into a transition, a pop per object landing, ticks for UI checks, a click for a card landing, a
     sparkle for a price.
2. Generate the music and SFX: `python3 -I tools/score_to_picture.py public/custom/<slug>/cues.json --out public/custom/<slug>/score`
3. Check the result by measurement, because you cannot hear it:
   - integrated loudness with ffmpeg `ebur128`;
   - peak below −1 dBFS;
   - a spectrogram (`showspectrumpic`) to confirm no constant sub drone and events on the cut frames.

Tell the user plainly that synthesized music sounds clean but basic. Offer an AI music tool only with a
stated price and their yes.

## 6. Render, then motion QA on the export

- Render in chunks of 120 frames (fresh browser each time), join them, mux the score, and master to −14 LUFS.
- Then run:

  ```sh
  python3 -I tools/motion_qa.py out/<slug>.mp4 --frames <close-up>,<match>,<price>,<outro> --sheet out/<slug>.qa.jpg
  ```

  - **freezes:** the millisecond stops. Fix every one by overlapping the moves or keeping a drift through
    the hand-over. Re-render only the affected chunks.
  - **identical:** dead or duplicate frames, usually at a sequence boundary. Overlap the sequences.
  - **stalls:** frozen holds. Add a slow push (2–8%) or a light sweep.
  - **saved frames:** look at the text with your own eyes, in the exported file, not the preview.
- Deliver a share copy under the user's size limit (H.264, CRF 26–28) and say what you checked.

## 7. Notes loop

The user's notes come as timestamps. Convert them to frames (seconds × fps; check the composition's
fps, which is often not 30), extract those exact frames from the export and diagnose before editing.
Reply with what you found first, then fix. Re-run motion QA after every change that touches timing.
