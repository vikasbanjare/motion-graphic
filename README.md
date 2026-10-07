# motion-graphic

Make agency-quality motion graphics by describing them.

- **`motion-kit/`** — the engine: write a storyboard spec (JSON), get a polished video.
  17 tested scene templates, 10 themes, 4 formats, voice-synced timing, a checker that
  catches problems before rendering. Start with [`motion-kit/README.md`](motion-kit/README.md).
- **`.claude/skills/motion-director/`** — the Claude Code skill. Describe the video in plain
  English, Hindi or Hinglish; Claude runs brief → storyboard → spec → check → voice → render.
- **`ai-motion-reel/`** — the original hand-coded reel, kept for reference
  (`motion-kit/specs/claude-reel.json` is the same reel as a spec).
- **`.claude/skills/remotion-*`** — Remotion's official agent skills.
