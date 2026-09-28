# Claude Opus 5.5 — launch motion graphic

An original, launch-style motion piece (unofficial motion study) built in Remotion.
1920×1080 · 60 fps · ~34.5 s · original synthesized score.

All copy paraphrases the figures in Anthropic's 22 Sep 2026 Opus 5.5 announcement;
no footage, logos or frames from the official video are used.

## Structure

| # | Scene | Beat |
|---|-------|------|
| 1 | Tease | "Smarter. Faster. Cheaper." |
| 2 | Title | Introducing Claude Opus 5.5 over the orbit motif |
| 3 | Intelligence | Fable 5.1-level on most work (Opus 5 → Fable 5.1 scale) |
| 4 | Coding | Terminal-Bench 4.0: 52.3% → 66.4% |
| 5 | Efficiency | 40% lower cost · 30% faster output |
| 6 | Safety | Behavioral audit + 85% fewer boundary-circumvention attempts (100 → 15 dots) |
| 7 | Availability | Claude Platform · AWS · Google Cloud · Microsoft Azure |
| 8 | End card | Title lock-up, Sonnet/Haiku 5.5 coming |

Design system lives in `src/theme.ts`: warm ink background, ivory type, one coral accent;
Instrument Serif (display), Inter Tight (UI), JetBrains Mono (labels). Fonts are vendored in
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
