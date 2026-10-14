---
name: cred-film
description: Make a CRED-style launch film from any product script. The film is the CRED v6.5 build (34 s) used as a template (engraved 3D worlds, the world turning into the card, foil strip close-up and split, the globe-to-floor match, the shell dive, the white-set outro with lasers and the card dropping into a phone, the lockup, the original score). Claude maps the script's real claims onto the film's slots, tools/cred_film.py checks every slot fits, then stills to the user, render, motion QA, delivery. Use whenever someone gives a script, ad brief or feature list and wants "a video like the CRED one", a CRED-style card or product film, or this film for another brand.
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
| 0–10 s | Blank paper; pen strokes drawn one by one; the field closes into a white disc; an engraved bough sweeps in and flowers; the fox runs along it and stops to look around | `claim1` head / sub | the lead benefit: rewards, cashback, growth | head ≤ 26 chars |
| 10–12 s | The garden becomes the card's print; the logo is on the card | `card` head / sub | the product's full name | head ≤ 30 |
| 12–15 s | The push into the foil strip; one phrase lands whole | `strip[0]` (+ `strip[1]` scrolling past) | the sharpest short claim, in CAPITALS | `strip[0]` ≤ 18 |
| 15–20 s | The strip splits open onto the travel world (hotel, lantern, flights over a globe) | `claim2` | travel, redeem, worldwide, reach | head ≤ 30 |
| 20–24 s | The globe becomes the floor of a colonnade; products drop onto plinths | `claim3` head / sub | choice, catalogue, store, partners | head ≤ 26 |
| 24–27 s | Fish and an iridescent shell; a big number rises like a pearl | `hero` label / value | the one number: a fee, a rate, a limit ("₹0", "0%", "5X") | value ≤ 5 chars |
| 27–31 s | White set, lasers, the card drops into a phone, the claims tick on | `card_print`, `outro.title`, `outro.rows` (2–4), `outro.left` / `outro.right` | the full claim list and the product name either side of the phone | rows ≤ 64, left/right ≤ 26 |
| 31–34 s | Logo lockup on black | `logo` file, `lockup` line | the product line | ≤ 40 |

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
- Does the strip close-up (frame 272) show `strip[0]` whole?

**Send the sheet to the user** and wait for "go".

### 5. Render and check the export

Render in six 120-frame chunks (`--frames=0-119` … `600-719`, with `--muted`), join them with ffmpeg concat,
and mux `public/custom/cred-v6/score.wav` (or `public/cred-film/<slug>/score.wav` if you set a `key`). Then:

```sh
python3 -I tools/motion_qa.py out/<slug>.mp4 --frames 100,272,528,626 --sheet out/<slug>.qa.jpg
```

**Expect:** `freezes: none` and `identical frames: none`. The film's own holds are tuned, so anything flagged
is new. Look at the saved frames for text, in the export, not the preview.

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
