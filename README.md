# motion-graphic

Describe a video in a few lines of plain English, Hindi or Hinglish. Get back a finished,
professional motion graphic: an MP4 with a storyboard behind it, colours that match your
brand, sound effects on every cut, text that is always readable, and an optional voice-over
that the animation follows word by word.

You don't need to know animation, video editing or code. Claude (in Claude Code) asks a few
questions, shows you a storyboard to approve, checks everything, then renders the video.

## What it makes

- **Vertical reels** (9:16) for Instagram Reels, YouTube Shorts and TikTok, plus square (1:1),
  portrait (4:5) and widescreen (16:9) versions of the same video. Text is kept clear of the
  likes, captions and buttons each app draws on top.
- **Short promos and launch films** in the calm "product launch" style or a punchy creator style:
  bold kinetic type, a price that gets struck out, numbers that count up, before/after
  comparisons, bar charts, icon grids, customer quotes, a typing prompt or chat that answers,
  a sound wave whose words light up as they are spoken, your photos and clips, and a closing
  call-to-action and logo.
- **10 ready-made looks** (bold navy and saffron, clean Apple-like white, neon tech, editorial
  serif, playful pop, festive desi, corporate, Swiss minimal and two calm "studio" looks), or
  your own brand colours taken from your logo.
- **English, Hindi (Devanagari) and Hinglish** on screen, with fonts that render Hindi properly.

Every video is built from tested scene templates. The AI writes the words and the plan, never
animation code, so text doesn't overflow, timing doesn't drift and nothing flickers. An
automatic check and a visual QA pass catch problems before anything is rendered.

## Three ways to start

### A. In your browser: Claude Code on the web (nothing to install)

You need a GitHub account and a Claude plan that includes Claude Code on the web (Pro, Max,
Team, or Enterprise with a Claude Code seat).

1. Sign in to GitHub, open **github.com/vikasbanjare/motion-graphic** and click **Fork**, then
   **Create fork**. This makes your own copy, where Claude can save your videos.
2. Go to **claude.ai/code** and sign in. If it asks, connect GitHub and allow access to your
   fork.
3. In the repository picker choose **your-name/motion-graphic**. Keep the **Default** cloud
   environment (its network access, "Trusted", lets the setup download what it needs).
4. Type what you want (see [What to type](#what-to-type)) and press Enter.
   The first time, you'll see "Setting up motion-kit" for up to a minute while the engine
   installs itself. Later sessions start instantly.
5. Answer Claude's short questions, approve the storyboard, then ask for the final video.
6. To download it, ask: *"Save the MP4 and the cover image to my GitHub."* Claude commits them
   to a branch of your fork. On GitHub, open that branch, click the `.mp4` file and use the
   download button.

### B. On your computer: the Claude Code plugin (terminal or desktop app)

1. Install **Node.js 22.18 or newer** from [nodejs.org](https://nodejs.org) (choose the LTS
   download). Optional: install **ffmpeg** for voice-overs and music (see
   [Troubleshooting](#troubleshooting)).
2. Start Claude Code (in a terminal, type `claude`; if it isn't installed yet, follow the
   [quickstart](https://code.claude.com/docs/en/quickstart)) and type these two lines, one at
   a time:
   ```
   /plugin marketplace add vikasbanjare/motion-graphic
   /plugin install motion-kit@motion-graphic
   ```
   Choose **Install for you**. The plugin works in every folder from now on.
   Desktop app: if `/plugin` doesn't open the plugin manager there, run the same two steps
   once in a terminal: `claude plugin marketplace add vikasbanjare/motion-graphic`, then
   `claude plugin install motion-kit@motion-graphic`.
3. Open an empty folder for your videos in Claude Code and type what you want. The first
   time, Claude sets up a `motion-kit/` folder there (about a minute).

Videos land in `motion-kit/out/` inside that folder. To get a newer version later, type
`/plugin`, open **Installed > motion-kit** and choose **Update now** (or run
`claude plugin update motion-kit@motion-graphic` in a terminal), then restart Claude Code.
Folders you set up earlier keep the engine they were made with, so their videos render exactly
as before; new folders get the new one.

No terminal at all? Install Node.js (step 1), download this repository (**Code > Download ZIP**
on GitHub), unzip it and open the folder in the desktop app's **Code** tab as a local session.
It sets itself up the same way as option A, and the videos land in `motion-kit/out/`.

### C. By hand, without Claude (npm)

For people comfortable with a terminal. Needs Node.js 22.18+ and git.

```bash
git clone https://github.com/vikasbanjare/motion-graphic
cd motion-graphic/motion-kit
npm install
npm run new   -- my-video                # starts specs/my-video.json from a recipe
# edit specs/my-video.json: the words for each scene
npm run check -- specs/my-video.json     # rules for timing, length and readability
npm run qa    -- specs/my-video.json     # looks at the real frames (writes no files)
npm run make  -- specs/my-video.json     # out/my-video.mp4 + out/my-video-cover.jpg
```

`npm run scaffold -- ../my-videos` copies the engine into a new folder of its own.
Every command is explained in [`motion-kit/README.md`](motion-kit/README.md).

## What to type

Say what it's for, who it's for and what people should do at the end. Facts you mention
(prices, numbers, offers) are used exactly; anything missing is asked for, never invented.

> Make a 20-second Instagram reel for my bakery Crumb & Co in Pune. Fresh sourdough every
> morning, order on WhatsApp. Warm and friendly. End with "Order today".

> A 40-second widescreen launch film for our app Lumen, which turns text into natural
> voices. Calm, Apple-style. Our brand colour is #5B5BF7. End with "Try Lumen".

> Meri coaching class ke liye 15 second ka reel banao: "Class 10 Maths ab easy". Hinglish
> mein, energetic, end mein "DM karo" likhna.

Then reply in plain words: "make the hook shorter", "try the neon look", "square version too",
"use my logo" (attach it), "add this voice-over" (attach the MP3).

Planning a bigger film, or making it with AI video tools (Google Flow / Veo, Runway, Kling,
Higgsfield)? Ask for the plan first:

> Plan a 45-second launch film for our AI voice app: concept, storyboard and the prompts for
> each shot in Google Flow.

The `motion-creative-director` skill asks only the questions that change the result, then
gives a full production package: concept, direction, a timed storyboard, a prompt for every
shot, a continuity bible so shots match, and a quality check. Parts the engine can render
are handed to `motion-director`.

## What you get

- **The video**: `motion-kit/out/<name>.mp4`, 1080p, 30 fps, ready to upload. Ask for
  "all formats" to also get square and widescreen versions.
- **A cover image**: `motion-kit/out/<name>-cover.jpg`, the moment the hook lands, for the
  Reel/Short thumbnail.
- **The storyboard spec**: `motion-kit/specs/<name>.json`, every scene's words, look and
  timing. Keep it: any change ("swap the price", "new colour") re-renders from it in minutes.
- Before rendering, Claude shows you the storyboard and reports anything you still need to
  check (pronunciation, facts, pacing).

## Costs

- **The kit is free.** Rendering happens on your computer, or in your cloud session, with free
  open-source tools. There is no per-video fee.
- **Claude Code** is needed for options A and B (it's part of the Claude Pro, Max, Team and
  Enterprise plans). Option C doesn't use Claude at all.
- **Optional AI voice-over** with ElevenLabs uses your ElevenLabs credits (about one credit per
  character). Claude always shows the character count and asks before spending. Recording your
  own voice, or no voice at all, is free.
- **Optional AI footage** (Google Flow / Veo) uses that service's credits; again, only after you
  approve the shot list.

## Licences, in plain words

- **Fonts** are under the SIL Open Font License: free to use in your videos, including
  commercial ones (`motion-kit/public/fonts/OFL-LICENSES.txt`).
- **Sound effects and textures** are generated by the kit itself, so there is nothing to license.
- **Remotion**, the video engine underneath, is free for individuals, non-profits and companies
  of up to 3 people. Larger companies need a Remotion company licence
  ([remotion.dev/license](https://www.remotion.dev/license)).
- **Music**: the kit never makes or supplies music. Only add tracks you have a licence for
  (YouTube Audio Library, Pixabay Music, Mixkit, or a track you bought). Business accounts on
  Instagram and TikTok can't use "trending" sounds in ads.
- **AI voices and footage** follow the terms of the service that made them; AI-generated clips
  get a small "AI-generated" tag in the video.
- **This repository**: a licence for the project's own code is still being decided (there is no
  LICENSE file yet). Until there is one, please ask before reusing the code elsewhere.

## Troubleshooting

| What you see | What to do |
|---|---|
| Claude answers but doesn't use the kit | Say "use the motion-director skill", or type `/motion-director` (`/motion-kit:motion-director` with the plugin). With the plugin, check it's listed under `/plugin` > Installed. |
| "Node.js not found" or "too old" | Install Node.js 22.18 or newer from nodejs.org, then restart Claude Code. |
| "npm install failed" on the web | The cloud environment needs network access (the Default "Trusted" setting). Ask Claude to run `bash scripts/session-start.sh` again. |
| The first render stops while getting a browser | Remotion downloads a browser on the first render. Where that's blocked, set `REMOTION_BROWSER_EXECUTABLE` to an installed Chromium; on the web the setup does this for you. |
| "ffmpeg missing" | Only needed for voice-overs, music and loudness. macOS: `brew install ffmpeg`. Windows: `winget install ffmpeg`. Ubuntu: `sudo apt install ffmpeg`. |
| The check or QA reports text too long, or text under the app's buttons | That's the kit protecting the video. Ask Claude to fix it; it shortens or splits the line. |
| Hindi letters look broken | Keep Hindi on screen in Devanagari script; Hinglish in English letters is fine too. |
| Words appear before or after they're spoken | The recording must say exactly the storyboard's words. Ask Claude to re-align the voice-over. |
| Windows: the skill isn't found when you open this repo | Git on Windows may not create the skill's shortcut (a symlink). Use option B, or enable symlinks (`git config --global core.symlinks true` with Windows Developer Mode) and clone again. |
| The plugin didn't pick up a new version | `/plugin` > **Marketplaces** > motion-graphic > **Update marketplace**, then **Installed** > motion-kit > **Update now**, and restart Claude Code. |

## What's in this repository

- **`motion-kit/`**: the engine (scene templates, themes, timing, checks, render scripts).
  Technical reference: [`motion-kit/README.md`](motion-kit/README.md).
- **`skills/motion-director/`**: the Claude Code skill that runs brief, storyboard, spec, check,
  QA, voice and render. `.claude/skills/motion-director` links to it for people who open this
  repo directly.
- **`skills/motion-creative-director/`**: the planning skill: concepts, storyboards and
  per-shot prompts for AI video tools. Its `references/` hold the Master SaaS Motion Design
  System (11 parts plus a condensed digest), 12 format guidelines, prompt templates and a
  worked example. `.claude/skills/motion-creative-director` links to it.
- **`docs/research/`**: the evidence behind it: frame-by-frame teardowns of 8 reference
  films, and catalogues from Superside, Raivcoo, Showreel.design and motion.so.
- **`.claude-plugin/`**: makes the repository installable as a Claude Code plugin
  (`motion-kit@motion-graphic`). Plugin users receive a change only after `version` in
  `.claude-plugin/plugin.json` goes up, so raise it with every release.
- **`scripts/session-start.sh`**: the setup that runs when a Claude Code session starts here.
- **`docs/ADDING-SCENES.md`**: how to add a new scene template safely.
- **`ai-motion-reel/`**: the original hand-coded reel, kept for reference.
- **`.claude/skills/remotion-*`**: Remotion's official agent skills.
