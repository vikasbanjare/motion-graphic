# paperboil

A config-driven renderer for a **30-second painted-paper ad**: *MAPS Global Markets · US Stocks launch*.
Remotion + [p5.brush](https://github.com/acamposuribe/p5.brush) (standalone build, MIT) + Remotion `paper()`.

One file drives everything: [`src/storyboard.json`](src/storyboard.json). It holds the shots, text, captions, logo and audio settings. Edit the data, not the components.

| Composition | Size | Frames |
|---|---|---|
| `Master16x9` | 1920×1080 | 900 @ 30 fps |
| `Cut9x16` | 1080×1920 | 900 @ 30 fps |

## Quick start

```bash
npm install
npm run stub-audio        # writes placeholder music + SFX to assets/audio/
npm run dev               # Remotion Studio
npm run check             # acceptance tests (timing, contrast, font, loudness)
npm run render            # out/Master16x9.mp4 + out/Cut9x16.mp4
npm run loudnorm          # out/*.norm.mp4 at −14 LUFS / ≤ −1 dBTP
npm run check -- --require-loudness
```

`paper()` and p5.brush both need WebGL2, so renders use `--gl=angle` (set in `remotion.config.ts`). If Remotion can't download its own browser (offline CI, locked-down proxy), point it at a local one:

```bash
export REMOTION_BROWSER_EXECUTABLE=/path/to/chrome-headless-shell
```

## How the look is made

| Layer | Where | What it does |
|---|---|---|
| Painted objects | `src/paint/` | Every object is painted with p5.brush: watercolour fills, ink lines and dotted hatching. p5.brush paints onto white paper, so `engine.ts` turns white into alpha. Shapes flagged `opaque` keep light pigments solid. |
| Boil | `src/paint/Sprite.tsx`, `src/components/Boil.tsx` | Each sprite is painted 4 times with different seeds and cycled at 10 fps, so it is genuinely re-painted rather than warped. `Boil.tsx` (SVG `feTurbulence` + `feDisplacementMap`, 10 fps, 4 variants) wobbles dropped-in stills the same way. |
| Backdrops | `src/components/Backdrop.tsx` | Per-shot painted ground (`backdrop` in the storyboard): glow, flat field or desk, plus painted sunburst rays, the jagged drop burst, falling specks, checker bands and a vignette. |
| Paper + grain | `PaperTexture.tsx`, `Grain.tsx` | Remotion `paper()` multiplied over the frame; film grain; right-edge tick marks and dust on light shots. |
| Text | `src/components/KineticWord.tsx` | Every word is typeset in Open Sans (400/600/800, bundled in `assets/fonts/`), never baked into art. Painted orange underlines draw on. |
| Transitions | `src/transitions/` | `morph-match`, `carry-through`, `ribbon-wipe`, `ring-wipe`, `paint-burst`, `speed-whip`, `shrink-to-point`, `card-flick-stack`, `hard-cut-on-beat`. They run in the last/first N frames of adjacent shots, so shot timing never shifts. Motion inside them is stepped at 15 fps. |
| Audio | `src/components/Soundtrack.tsx`, `src/audio/cues.json` | Music bed, SFX cues (from the storyboard cue sheet) and optional VO. The music is hard-gated to silence for the 15.5–16.0 s vacuum, and ducked 7 dB under the VO once a VO file is set. |

## Swapping in real assets

| What | Drop it here | Effect |
|---|---|---|
| Finished painted still for a shot | `assets/painted/A1.png` … `A14.png` (or `.webp` / `.jpg`) | Replaces that shot's code-painted placeholder (asset ids are in `storyboard.json`). It gets the push-in and SVG boil. Text stays typeset. |
| Logo master | `assets/maps-logo.svg` (or `.png` / `.webp` / `.jpg`) | Replaces the coded MAPS lock-up on the end card. |
| Logo variant (coded) | `logo.variant` in `storyboard.json` | `bar-navy` (default), `bar-orange`, `text-navy` or `text-black`: the four lock-ups from the logo sheet. |
| Music | `assets/audio/music.wav` | 120 BPM, 15 bars; see the music brief in the storyboard. The 15.5–16.0 gate is applied in the mix anyway. |
| SFX | `assets/audio/sfx/<name>.wav` | Same file names as the stubs; levels are in `src/audio/cues.json`. |
| VO | set `audio.vo` (e.g. `"audio/vo.wav"`) | Plays from frame 0. Music ducks under the caption windows. |

## Editing the film

- **Timing:** change `start`/`end` (seconds) on shots, text and captions, or `marks` for beats inside a shot. Components never hard-code frames.
- **Copy:** the `text` array. Bracketed `[PROOF LINE …]` and `[COMPLIANCE FOOTER …]` are placeholders for MAPS compliance.
- **Colour:** tokens in `src/palette.ts` (MAPS orange `#FF5400`). Orange text is allowed only on navy/ink grounds, and `npm run check` enforces this.
- **Transitions:** `transitionOut` on each shot. Anchors are fractions of the shot's 1000×1000 art box, so they work in both formats.

## Acceptance tests (`scripts/check-timing.ts`)

1. Shots are contiguous and total exactly 900 frames.
2. The drop is at frame 480 (S10 starts there; the vacuum gate is 465–480; every cue frame = time × 30).
3. Every text event holds ≥ 45 frames, except the kinetic verbs.
4. Orange text appears only over navy/ink; on light grounds text must be navy.
5. Open Sans is the only font referenced.
6. Loudness after `loudnorm.sh`: about −14 LUFS integrated, ≤ −1 dBTP. This is skipped until a normalised render exists.

## Open items

- `[PROOF LINE]` and `[COMPLIANCE FOOTER]` wording: MAPS compliance to supply.
- Logo: the coded lock-up is a stand-in rebuilt from the logo sheet. Drop the master SVG at `assets/maps-logo.svg`.
- Claims to clear: "Your whole day runs on American companies", "Pick a name you know", "Buy it from India", "Now on MAPS".
- Remotion needs a company licence for some organisations: check <https://remotion.dev/license>.
- Audio in `assets/audio/` is synthesised placeholder, for sync checks only.
