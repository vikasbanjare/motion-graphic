---
name: brand-film
description: Make an on-brand product film for any company from just its name. Finds the official site, latest launch, brand guidelines and channels on the web; runs the brand scout (GitHub runner or the user's Mac) to collect logos, colours, fonts, launch posts and the company's own short motion-graphics product films; studies those films frame by frame and measures them; writes a fact-checked script; builds a bespoke Remotion composition in the brand's own motion language to the pro-film rules; passes film QA against the brand's films; delivers v1 and iterates on the user's corrections. Use when the user says "make a video for <company>", "a launch film for <brand>'s new <product>", or gives only a company name.
---

# Brand film: company name in, on-brand film out

The user types a company name (optionally a product). Everything else is automatic until v1 is
delivered; after that the user corrects by message. Never ask for brand assets first: find them.
Ask at most one question, and only when it changes the film (e.g. two equally new launches).

## 0. What runs where

- **This session (Claude):**
  - web search;
  - triggering the scout (commit a request file and push);
  - reading results;
  - writing the script and the composition;
  - rendering;
  - QA.
- **The scout** (`research/scout/scout.py`) needs open internet:
  - **GitHub runner:** push `brands/requests/<slug>.json`, and `.github/workflows/brand-scout.yml` runs it.
  - **The user's Mac:** `cd motion-kit && npm run scout -- --company "X" --site https://x.com`. Add `YT_COOKIES_FILE` from `yt-dlp --cookies-from-browser chrome` for YouTube.
- **Known blocks:**
  - YouTube's bot check on GitHub (needs the `YT_COOKIES` secret);
  - Vimeo's bot wall for some embeds;
  - X and LinkedIn videos behind login.
  - **The fallback when no films come through:** say so, then ask the user for 2–4 video links or files.

## 1. Find (web search, in this session)

1. **The official site.** Confirm the domain from two sources.
2. **The latest launch:** product name, date, and 3–6 facts with their sources (the company's own blog, X post, press release, reputable press). These are the only facts the script may use.
3. **Brand pages:** search `"<company>" brand guidelines | press kit | media kit`.
4. **Channels:** the YouTube handle (`site:youtube.com "<company>"`), Vimeo, and the X handle.
5. **Write the request and push it:**

   `brands/requests/<slug>.json`:

   ```json
   { "company": "...", "site": "https://...", "channels": ["https://www.youtube.com/@..."], "videos": ["direct links to launch films found by search"] }
   ```

   Commit, push, and tell the user the scout is running.

## 2. Scout (automatic)

The run publishes `brands/<slug>/dossier.md|json` to the `brand-scout` branch. Logos and contact sheets go into the encrypted `private-<run>.*` bundle.

**What the dossier holds:**
- **Brand colours:** from the site's CSS, including named tokens like `--color-primary`.
- **Neutrals.**
- **Font families:** names only; licensed fonts are never downloaded.
- **Logo files.**
- **Brand-page text.**
- **Dated launch posts.**
- **Every candidate video:** each is scored for motion graphics (flat colour, crisp type and UI, versus photographic texture and skin) and measured with `tools/film_qa.py`.
- **House style:** the median of the kept films.

Read it with:

```bash
git fetch origin brand-scout && git show origin/brand-scout:brands/<slug>/dossier.md
```

The private bundle opens with the research key, if this session has it (the same scheme as `research-results`).

## 3. Study the brand (before writing anything)

- **Read the contact sheets of the top 3–5 kept films** (sub-agents in parallel). For each, note:
  - canvas and background;
  - type (weight, case, size, two-tone lines);
  - colour use;
  - signature shapes and icons;
  - UI treatment;
  - transitions, frame by frame (wipes, morphs, anchors);
  - pacing;
  - ending.
- **Measure exact colours** from the frames (named swatch frames if any) and reconcile them with the CSS colours. Video colours drift a few points; prefer CSS or brand-book hex values.
- **Write `brands/<slug>/language.md`:** the brand's motion language as rules, on top of `docs/research/pro-film-rules.md`.

## 4. Script

- **Length and pace:** 20–30 s by default. The voice runs ~2.3 words per second; leave the first 0.4 s and the last 2.5 s free.
- **Structure:** the brand's own pattern (e.g. Sarvam: "Introducing / product / built for … / proof / live now").
- **Every claim from step 1's sources.** Write a fact table with sources in the composition's header comment.
- **Social copy:**
  - on-screen text carries the story muted (Meta and LinkedIn autoplay silently);
  - mark spec work as unofficial in notes, never in the logo lock-up.

## 5. Build

Write `motion-kit/src/custom/<slug>/<Film>.tsx`. Start from `src/custom/sarvam/SarvamVisionV4.tsx`: copy its structure, replace the language.

- **Stage:** one continuous stage, with a camera that eases back to rest before each cut.
- **Anchor:** a morphing anchor element whose path never crosses text.
- **Transitions:** varied (wipe, card swing, container transform, mask).
- **Entrances and exits:** expo-out entrances, ease-in exits.
- **Holds:** drift on every hold.
- **Product moment:** one hero transformation for the product.
- **Logos:** official files only; the wordmark alone, with no retyped name next to it.
- **Fonts:** the brand's font if it's free (`@fontsource`), else the closest free match, named as a stand-in.

**Sound:**
- Voice: Kokoro or a better engine; spell out version numbers ("two point one").
- A bed made by `tools/music_bed.py`, or a licensed or open-model track.
- SFX from `tools/sfx_synth.py`, timed to frames.
- The music gain envelope ducks ~10 dB under the voice.
- Master with `bash tools/master.sh`.

## 6. Verify, then deliver

1. **Render.**
2. **Run `python3 -I tools/film_qa.py out/<film>.mp4 --ref <their films>`.** Every check must pass.
3. **Check frames at every transition and every anchor rest:**
   - no text overlap;
   - pill and button text centred;
   - no jerks (scan frame-to-frame change for single-frame spikes).
4. **Commit, push and send v1,** with the fact sources and what's a stand-in (fonts, voice, music, illustrated UI).
5. **Corrections:** apply exactly what the user asks, re-run steps 5–6, and add any general lesson to `docs/research/pro-film-rules.md`.
