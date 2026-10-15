---
name: cred-film
description: Make a CRED-style launch film from any product script. The film is the CRED v6.5 build (34 s) used as a template (a pen-drawn line field that closes into a disc, an engraved bough with the fox, the world turning into the card, a loupe with hard cuts on the beat, iris opens into a balloon-and-globe travel world, a crane down into a temple of products, the shell under the sea, the white-set outro with the card dropping into a phone, the lockup, the original score). Claude maps the script's real claims onto the film's slots, tools/cred_film.py checks every slot fits, then stills to the user, render, motion QA, delivery. Use whenever someone gives a script, ad brief or feature list and wants "a video like the CRED one", a CRED-style card or product film, or this film for another brand.
---

# CRED film: a new script in the CRED v6.5 film

The look, worlds, camera moves, transitions, timing and score are the CRED v6.5 film and do not
change. Your job is to direct the new script into the film's slots so every shot says something true and fits.

- Worked example: `specs/cred-film/lumen.json` (a fictional brand), rendered to `out/lumen-cred.mp4`.
- Original: the `CredCardV6` composition (`src/custom/cred/CredCardV6.tsx`).

## Hard rules

- **Copy:**
  - Every claim on screen is the script's own approved wording. Never invent a number, benefit or tagline.
    If a number looks unverified, ask.
  - No card or account numbers and no personal data on screen.
- **Logo:** use only the brand's **official logo file** (white on transparent PNG), unchanged. With no file, the
  tool sets the brand name in plain type. Never redraw or imitate a logo, and never put another company's logo
  on screen.
- **Labelling:** label every shared copy "unofficial spec work" unless the brand commissioned it.
- **Credits:** credit the CC-BY 3D models when publishing (`public/custom/cred-v6/models/CREDITS.md`).

## The film's slots (what each shot can say)

| Time | Shot | Slot | Best for | Fits |
|---|---|---|---|---|
| 0–10 s | Grey paper; pen strokes drawn one by one; the field closes into a white disc; an olive wash floods in; an engraved bough sweeps up and flowers; the fox runs along it and stops to look around | `claim1` head / sub | the lead benefit: rewards, cashback, growth | head ≤ 26 chars |
| 10–12.6 s | The garden becomes the card's print and keeps moving inside it; a loupe darkens the edges | `card` head / sub | the product's full name | head ≤ 30 |
| 12.6–15.5 s | Hard cut on the beat to a macro of the print inside the loupe; one phrase lands whole on the foil strip | `strip[0]` (+ `strip[1]` scrolling past) | the sharpest short claim, in CAPITALS | `strip[0]` ≤ 18 |
| 15.5–20 s | The iris opens on a lavender sky: a hot-air balloon with the fox in the basket, clouds, flights over a globe | `claim2` | travel, redeem, worldwide, reach | head ≤ 30 |
| 20–24 s | Crane down: the globe becomes the floor; a frontal temple of columns, plinths and glass panels; a lens-edge sweep | `claim3` head / sub | choice, catalogue, store, partners | head ≤ 26 |
| 24–27 s | Seabed, kelp, fish crossing close, an iridescent shell; a big number rises like a pearl; the iris closes on the shimmer | `hero` label / value | the one number: a fee, a rate, a limit ("₹0", "0%", "5X") | value ≤ 5 chars |
| 27–31 s | The iris opens on the white set; the card drops into a phone; the claims tick on | `card_print`, `outro.title`, `outro.rows` (2–4), `outro.left` / `outro.right` | the full claim list and the product name either side of the phone | rows ≤ 64, left/right ≤ 26 |
| 31–34 s | Logo lockup on black | `logo` file, `lockup` line | the product line | ≤ 40 |

The finished example and its storyboard, board frames and soundtrack: `showcase/cred-v65/`.

If the script has fewer than four strong claims, reuse the strongest one in two slots: as `strip[0]` and as
`hero`, for example. Never pad with invented claims.

## Steps

### 1. Direct the script (Claude, no code)

Read the script and list its real claims verbatim. Fill the slot table above:
- Put each claim where its shot already means something (travel claims to the globe, a fee or rate to the
  shell, choice to the colonnade).
- Write the headline as the 1–4 words a viewer remembers, and the sub-line as the rest of the exact wording.

Show the user the filled slot table. Ask your one question only if a claim is missing or doubtful.

### 2. Write the copy sheet

Save `motion-kit/specs/cred-film/<slug>.json`. Copy `specs/cred-film/lumen.json` and replace every value; the
schema and limits are at the top of `tools/cred_film.py`.

If the brand gave an official logo, put it in `motion-kit/public/custom/<brand>/` and set `logo`.

### 3. Check it fits

```sh
cd motion-kit && python3 -I tools/cred_film.py specs/cred-film/<slug>.json
```

**You should see:** `ok: <slug> fits the film`, then the still, render and QA commands. If a slot is too long,
the tool says which slot and by how much. Shorten the words (keep the meaning and the numbers) and run it again.

### 4. Stills to the user (gate)

Run the printed still command (9 key frames). Tile the stills into one sheet with ffmpeg `xstack` and look first
yourself:
- Is every word readable?
- Does the logo sit inside the card's red block and on the card print?
- Does the strip close-up (frame 368) show `strip[0]` whole?

**Send the sheet to the user** and wait for "go".

### 5. Render and check the export

Render in seven 120-frame chunks (`--frames=0-119` … `720-815`, with `--muted`, `--concurrency=2`, `--timeout=120000`; higher concurrency ran the container out of memory), join them with ffmpeg concat,
and mux `public/custom/cred-v6/score.wav` (or `public/cred-film/<slug>/score.wav` if you set a `key`). Then:

```sh
python3 -I tools/motion_qa.py out/<slug>.mp4 --frames 200,368,624,722 --sheet out/<slug>.qa.jpg
python3 -I tools/jerk_qa.py out/<slug>.mp4 --cuts 246,303,372,480,580,657,741
```

**Expect:** `freezes: none` and `identical frames: none` from `motion_qa`. `jerk_qa` checks every frame (not
samples) for pops, hitches and camera lurches; the film's own cuts are listed so they don't count. The CRED film
itself still reports a near-still frame at 373–374 and the intended phone push at 728–732, so anything else is
new. Look at the saved frames for text, in the export, not the preview.

### 6. Deliver

Make a share copy:

```sh
ffmpeg -i out/<slug>.mp4 -c:v libx264 -crf 26 -preset slow -c:a aac -b:a 192k out/<slug>-share.mp4
```

Send it with the slot table, what QA found, and the honest limits:
- the worlds are CRED's (garden, travel, colonnade, shell) and do not change with the script;
- the music is the film's synthesized score.

### 7. Notes

Turn the user's timestamps into frames (seconds × 24) and look at those frames first.
- **Copy notes:** edit the sheet, re-run step 3, re-render only the affected chunks.
- **Look notes** (new worlds, colours, models): that is bespoke work in `src/custom/cred/v6/`. See
  `reference/transitions.md` and `reference/lessons.md`. Keep the CRED composition itself unchanged.

### 8. Making a new film to match a reference (the loop that built v6.5)

Use this when the ask is "make it look like this other film", not "new words in this film".

1. **Frame-match the opening first.** Pull the reference and ours at the same timestamps (every 0.25 s for the
   first 10 s) and put them side by side. Name each difference in one line: stroke weight, line count, paper
   colour, what is in frame. The v6.5 intro was wrong for four rounds until this was done.
2. **Measure the look**, not the content: `python3 -I tools/ref_compare.py REF.mp4 out/<slug>.mp4`. Use it as
   a guard (empty space, colour weight, detail, darkness, motion), never as the score. It said 83% while the
   transitions were still wrong.
3. **Copy the reference's transition grammar**, not its pictures: list how each of its cuts is made (hard cut,
   iris, wipe, a creature crossing the lens) and use only those (`reference/transitions.md`).
4. **Check every frame** with `tools/jerk_qa.py` after each render. Sampled stills hide the lurches users see.
5. **Send a board or a short clip every round.** Long silent rounds lose the user's trust.
6. **Stop when the user cuts it.** The final film was the user's own edit of round 11: they trimmed the opening
   and scored it by hand. Make that easy: render a clean, muted master and hand over the score stems
   (`score.music.wav`, `score.fx.wav`).

Never keep reference frames, reference audio or website screenshots in the repo.
