# CRED IndusInd Bank RuPay credit card: an engraved launch film

**Unofficial spec work.** Not made for or approved by CRED or IndusInd Bank. The CRED logo is the official file,
unmodified. Every claim on screen is CRED's own published wording.

- `film.mp4`: the final cut, 32.4 s, 1920×1080, 24 fps, stereo AAC at −14 LUFS.
- `preview.gif`: a small looping preview.
- `soundtrack.m4a`: the final cut's music and sound effects, as one mix.
- `board/01–17.jpg`: frames from the final cut at 0.4, 1.5, 3, 5, 7.5, 9.5, 11.5 … 31.5 s (every 2 s after 7.5 s).

![preview](preview.gif)

## How this cut was made

1. **The build.** Claude Code built the film in Remotion (React) with Three.js: real 3D models run through a
   custom engraving shader so they print like banknote line work. The code is the `CredCardV6` composition in
   `motion-kit/src/custom/cred/` (816 frames, 34 s). How to make another film like it:
   `skills/cred-film/SKILL.md`.
2. **The loop.** It was compared against CRED's own film "The more you know" frame by frame, fixed and
   re-rendered for 11 rounds (`motion-kit/docs/research/cred-v65-reference-compare.md`). Every round was
   checked on every frame, not samples, for pops, hitches and camera lurches (`motion-kit/tools/jerk_qa.py`).
3. **The final edit.** The rendered film was then cut and scored by hand in an editor:
   - the pen-stroke opening is trimmed from about 2.9 s to about 0.8 s (it gets to the field faster);
   - the products shot is the earlier three-quarter colonnade take, not the later frontal temple;
   - the coded score is replaced with a picked music track and hand-placed sound effects, mastered to −14 LUFS
     (the coded score was −16).

   Everything else is the rendered film, cut for cut.

## Storyboard (the final cut)

Times are in the final cut. "Render frame" is the frame in the `CredCardV6` composition, so a note on the cut
can be fixed in the code.

| # | Time | Picture | Words | Into the next shot | Render frame |
|---|---|---|---|---|---|
| 01 | 0.0–0.8 s | Grey paper; the first pen strokes draw in from the left | – | Jump cut (edit) to the full field | 14–32 |
| 02 | 0.8–2.5 s | A bundle of fine S-wave lines fills the page; the camera pulls back | – | The field closes into a white disc | 69–150 |
| 03 | 2.5–4.0 s | Olive wash floods in around the disc; an engraved bough sweeps up from the bottom right; lavender clusters burst | – | Continuous | 150–196 |
| 04 | 4.0–5.0 s | The fox runs in along the bough | – | Continuous | 196–220 |
| 05 | 5.0–8.2 s | The fox stops and looks around; the headline settles under a flowering twig | **5% rewards** / on online shopping | The garden becomes the card's print | 220–246 |
| 06 | 8.2–10.5 s | The card turns into frame; the garden keeps moving inside its print, a loupe darkens the edges | **the CRED IndusInd Bank** / RuPay credit card | Hard cut on the beat inside the loupe | 246–303 |
| 07 | 10.5–13.4 s | Macro on the print: blossom, stem and the foil strip | **ZERO JOINING FEE** | Iris opens from the loupe | 303–372 |
| 08 | 13.4–15.5 s | Lavender sky: an engraved hot-air balloon with the fox in the basket, clouds, a globe | – | Continuous | 372–420 |
| 09 | 15.5–17.9 s | Push into the globe; flight paths arc between cities | – | Crane down; the globe becomes the floor | 420–480 |
| 10 | 17.9–20.0 s | Terracotta colonnade, three-quarter view, plinths | – | Continuous | earlier round |
| 11 | 20.0–22.7 s | Products drop onto the plinths | **2,000+ products** / on CRED store | Iris into the sea | earlier round |
| 12 | 22.7–25.0 s | Seabed: rocks, kelp, an iridescent abalone shell; a fish crosses close | **₹0** | Iris closes on the shell's shimmer | 581–630 |
| 13 | 25.0–26.0 s | The shell's colour fills the closing iris | – | Iris opens on the white set | 630–657 |
| 14 | 26.0–29.5 s | White set with a guilloche rosette; the card drops into a dark phone; the claims tick on | your card + claim list | The camera pushes into the screen | 657–741 |
| 15 | 29.5–32.4 s | Black; the CRED logo lockup | IndusInd Bank RuPay credit card | End | 741–816 |

## Sound (the final cut)

The music and effects were chosen and placed by hand in the edit. What the mix measures (`soundtrack.m4a`):

- **0–4 s, near silence** (about −45 dB) under the pen strokes, so the opening reads as quiet paper.
- **About 4 s, the score comes in** with the bough and flowers, and builds to full level by 6 s.
- **Hits on the cuts:** sharp onsets at 10.45 s (the loupe cut, 10.5 s), 13.7–14.1 s (the balloon world
  opening), and 22.7 s (into the sea).
- **Loudest at 22–26 s** (the sea and the white set), then it falls away at about 28 s.
- **The lockup, 29.5 s on, is silent.**
- **Mix:** −14 LUFS integrated, loudness range about 13 LU.

**The coded alternative:** `motion-kit/public/custom/cred-v6/score.wav` is the film's own generated score (92
BPM, D, one event per cut, −16 LUFS), built from `sound.json` by `tools/sound.py`. `tools/cred_film.py` puts it
under a new film by default.

## Credits

- 3D models under CC-BY: see `motion-kit/public/custom/cred-v6/models/CREDITS.md`.
- Built with Claude Code, Remotion and Three.js. Remotion's licence is free for teams of up to three people.
