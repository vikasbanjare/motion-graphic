---
name: claim-film
description: A to Z from a raw video script to a finished 20–40 second claim film in the CRED v6 style. Claude reads the script, extracts the real claims, decides one metaphor per claim, orders the film, picks colours, cameras and transitions, writes the spec; tools/claim_film.py turns it into a storyboard, timeline, cue sheet and original score; then stills to the user, render, motion QA, delivery, and a notes loop up to a bespoke finish. Use whenever someone gives a video script, ad brief, feature list or launch copy and wants an animated product, fintech or launch film, or says "make a video like the CRED one" for another product.
---

# Claim film: script in, film out (A to Z)

You are the director. The user gives you a script. You do every step below yourself and stop for the user
**only** at the two approval gates: the storyboard and the stills.

Worked examples:
- `specs/claim-film/lumen-demo.json` → `out/lumen-demo.mp4`: the fast path, end to end;
- `src/custom/cred/CredCardV6.tsx`: the bespoke finish.

Before your first film, read:
- `reference/lessons.md`: what went wrong on the CRED film, and why;
- `reference/storyboard-method.md`: how to think through a script.

## Hard rules

- **Copy:**
  - Claims on screen are **verbatim** from the script. Never invent a number, benefit or tagline. If a claim
    looks unverified, ask before using it.
  - No card or account numbers and no personal data on screen.
- **Brand assets:**
  - Use the **official logo file**, unchanged, or set the brand name as type. Never redraw a logo.
  - Draw no third-party marks (banks, card networks, partners).
- **Labelling:** if the brand didn't commission the film, keep `"unofficial": true` (it prints UNOFFICIAL
  SPEC WORK on the lockup).
- **Licences:** credit the CC-BY 3D models when publishing (`public/custom/cred-v6/models/CREDITS.md`).
  Remotion needs a company licence for teams larger than three.
- **Honesty:** say what you checked, and say that the synthesized music is basic.

## A. Read the script and direct it

Follow `reference/storyboard-method.md` passes 1–3:

1. **Claims:** pull out 2–5 real claims. Split each into a headline (1–4 words) and a sub-line (the rest of
   the exact wording). If the script has more than 5, or a claim looks unverified, ask your **one** question
   now.
2. **Metaphors:** pick one metaphor per claim. Choose a hero subject and 1–2 supporting subjects from
   `src/custom/claimfilm/models.json`, and never repeat a hero.
3. **Shape:**
   - order the claims;
   - pick a palette per world (never the same twice in a row);
   - vary the cameras (push, orbit, crane) and transitions (split, wipe, dive, iris);
   - set the length (3 claims → 24 s, 4 → 30 s, 5 → 35 s);
   - write the outro (product title + 3–4 short rows) and the lockup line.

Show the director's table from the method file in your reply (one line each on why the metaphor fits).

## B. Write the spec

Save `motion-kit/specs/claim-film/<slug>.json` (all fields are documented at the top of
`tools/claim_film.py`):

```json
{
  "slug": "<slug>",
  "brand": { "name": "<Brand>", "line": "<product line>", "logo": "custom/<brand>/logo.png" },
  "seconds": 24, "key": "D", "unofficial": true,
  "claims": [
    { "headline": "...", "sub": "...", "subjects": ["hero", "support"], "palette": "green", "camera": "push", "transition": "iris" }
  ],
  "outro": { "title": "<full product name>", "rows": ["...", "..."], "screen": "dark" }
}
```

If the user supplied an official logo file, put it in `motion-kit/public/custom/<brand>/`. Otherwise leave
`logo` out.

## C. Plan: storyboard, timeline, score

```sh
cd motion-kit && python3 -I tools/claim_film.py specs/claim-film/<slug>.json
```

It writes `public/claim-film/<slug>/`:
- `storyboard.md`: the shot list with times, actions, transitions and sound;
- `plan.json` and `props.json`: the timeline;
- `cues.json` and `score.wav`: the original music and SFX on a 120 BPM grid, so every cut lands on a beat.

It also prints the still and render commands.

**Gate 1: send `storyboard.md` (or its table) to the user.** Wait for "go", or change the spec and re-plan.

## D. Stills

Run the printed still command (one still per claim, plus the outro and the lockup). Tile the stills into
one sheet with ffmpeg `xstack`, then **look at them yourself** for:
- subjects too small or cut off by the frame;
- a model that reads wrong (check its material names; use `keep`/`drop` in `models.json`);
- text that collides with a subject.

Fix, re-plan, re-still.

**Gate 2: send the sheet to the user.** Wait for "go".

## E. Render and check the export

Render in 120-frame chunks with `--muted`. Remotion frame ranges are inclusive, so the last chunk ends at
frames − 1. Then join the chunks, mux the score and run the QA:

```sh
npx remotion render ClaimFilm c0.mp4 --props=public/claim-film/<slug>/props.json --frames=0-119 --gl=swangle --concurrency=3 --muted
# ...more chunks, then:
ffmpeg -f concat -safe 0 -i list.txt -c copy video.mp4
ffmpeg -i video.mp4 -i public/claim-film/<slug>/score.wav -map 0:v -map 1:a -c:v copy -c:a aac -shortest out/<slug>.mp4
python3 -I tools/motion_qa.py out/<slug>.mp4 --frames <still frames> --sheet out/<slug>.qa.jpg
```

Fix whatever `motion_qa` reports:
- **freezes:** overlap the hand-over in `ClaimFilm.tsx`;
- **identical:** sequences need more overlap;
- **stalls:** add drift.

Re-render only the affected chunks. Check the saved frames for readable text **in the export**.

## F. Deliver

Make a share copy:

```sh
ffmpeg -i out/<slug>.mp4 -c:v libx264 -crf 27 -preset slow -c:a aac -b:a 192k out/<slug>-share.mp4
```

Send it with:
- what you checked, and what QA found;
- that the music is synthesized (clean, basic); offer an AI music tool only with a stated price and their yes;
- that this is draft one, with what step G would add.

## G. Notes loop and bespoke finish

- **Read the notes:** convert the user's timestamps to frames (seconds × 24), then extract and look at those
  frames before changing anything. Say what you found first, then fix it.
- **Upgrade a world:**
  - give it a signature transition from `reference/transitions.md` (world becomes the object, strip split,
    shape match, dive into the material, drop into the device);
  - or give it a custom world: copy the `Worldlet` pattern, add 2D layers (globe, arcs, a printed card face;
    see `src/custom/cred/v6/`) or new licensed models (Khronos glTF samples, textures at 1024 px, credited);
  - edit `cues.json` events for new moments, then re-run `tools/score_to_picture.py`.
- **After each change:** re-run motion QA, and send new stills before any re-render.
