# Claude Opus 5.5 — launch motion graphic

An original, launch-style motion piece (unofficial motion study) built in Remotion.
1920×1080 · 60 fps · ~43.7 s · original synthesized score.

All copy paraphrases the figures in Anthropic's 22 Sep 2026 Opus 5.5 announcement.
Product UI is illustrative mock-up, not screenshots; no footage or logos are used.

## Structure

| # | Scene | Beat |
|---|-------|------|
| 1 | Prompt | "What would you hand off?" + a real ask typed and sent |
| 2 | Title | Introducing Claude Opus 5.5 over the orbit motif |
| 3 | Agent | Coding agent mock: task log, live diff, test runner; Terminal-Bench 66.4% vs 52.3% |
| 4 | ComputerUse | Browser mock: pointer fills a purchase order and submits it |
| 5 | Knowledge | Doc mock: brief, chart and callout build; GDPval-AA 1846 Elo |
| 6 | Efficiency | 40% lower cost · 30% faster output cards |
| 7 | Safety | Behavioral audit + 85% fewer boundary-circumvention attempts (100 → 15 dots) |
| 8 | Availability | Platform chips + `model: "claude-opus-5-5"` snippet |
| 9 | End card | Title lock-up, Sonnet/Haiku 5.5 coming |

Design system lives in `src/theme.ts`, using Anthropic's public palette: cream `#FAF9F5`,
ink `#141413`, clay `#D97757`, with blue `#6A9BCC` and green `#788C5D` as support.
Instrument Serif (display), Inter Tight (UI), JetBrains Mono (code). Fonts are vendored in
`public/fonts` so renders work offline.

## Commands

```console
npm i
npm run dev        # Remotion Studio preview
npm run render     # -> out/opus-launch.mp4
python3 scripts/make_score.py   # regenerate public/audio/score.wav (needs numpy)
```

Scene timings are defined in `src/Main.tsx`; `scripts/make_score.py` mirrors them so the
music cues land on the cuts. Retime one, retime both.

In a sandbox without Remotion's browser download, pass a local Chromium:
`--browser-executable=/path/to/headless_shell`.
