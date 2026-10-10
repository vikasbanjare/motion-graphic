# Research: Master SaaS Motion Design System

Index of every file in this research set. Start with the master document; open the genre guideline for the film type you are making; use the prompt system to turn a brief into a production package.

**Start with [`RESEARCH-REPORT.md`](RESEARCH-REPORT.md)**: one page with every finding, where it came from, what was built from it, and what is still open.

| File | What it is |
|---|---|
| [`free-open-models.md`](free-open-models.md) | The best free / open-weight models for video, voice (Hindi focus), music and SFX, ranked by blind arenas and listening tests (not stars), with licence traps and VRAM, plus the verdict on the t3-video-4k Space. Drives the local tier of `npm run produce`. |
| [`ai-video-production.md`](ai-video-production.md) | How to make AI shots: model choice per shot type, cost-saving habits, switching models mid-shot, keyframes, character / product / voice consistency across a series, genres (ads, story, series), Freepik / Magnific. Backed by `research/models.json` and `npm run route`. |

## Reference-video study (frame by frame)

| File | What it is |
|---|---|
| [`style-playbook.md`](style-playbook.md) | 13 motion styles taken from 251 reference videos. Covers measured shot lengths and brightness per style, ten rules, the look, motion, edit and evidence for each style, how to build it with motion-kit (including the `style-*` recipes), variations, pitfalls, and the kit's gaps. |
| [`motion-techniques.md`](motion-techniques.md) | 39 signature moves with kit support and Remotion code, plus palettes, gradient CSS, type pairings and sizes, timing and easing, transitions, camera, sound defaults, a glossary, and how to brief Claude. |
| [`production-routes.md`](production-routes.md) | Every style built three ways: Claude Code only, Claude + AI generation (Higgsfield / Veo / Kling plates composited in motion-kit), and Claude Design frames animated in code. Includes plate prompts per style and the variation dials. |
| [`dataset.md`](dataset.md) | The per-frame dataset (10 fps, numbers only) for 499 videos: columns, how to load it, and what it shows about the shape of a film over time. |
| [`award-notes.md`](award-notes.md) | All 173 videos crawled from motiondesignawards.com, frame-by-frame notes and an index; summary in the playbook §6. |
| [`reference-notes.md`](reference-notes.md) | Index of every reviewed video (length, shots, average shot, brightness, link) and the frame-by-frame notes. |

Measurements come from `.github/workflows/research.yml`; results live on the `research-results` branch (contact sheets encrypted).

## Start here

| File | Size | What it is |
|---|---|---|
| [`MASTER-SAAS-MOTION-DESIGN-SYSTEM.md`](../../skills/motion-creative-director/references/MASTER-SAAS-MOTION-DESIGN-SYSTEM.md) | 1617 KB | The full system in one file: how to use, a 24-section table of contents with anchors (`#s01`..`#s24`), Parts 01-11, Evidence Index, Methodology & Limits. |
| [`critic-report.md`](critic-report.md) | 26 KB | Adversarial review of the master draft. |

## master/: the eleven source parts (in `skills/motion-creative-director/references/master/`)

| File | Size | Master sections |
|---|---|---|
| [`master/01-creative-direction-and-storytelling.md`](../../skills/motion-creative-director/references/master/01-creative-direction-and-storytelling.md) | 95 KB | Part 01: Creative Direction Principles (Master §1) and Storytelling Framework (Master §2) |
| [`master/02-art-direction-composition-color.md`](../../skills/motion-creative-director/references/master/02-art-direction-composition-color.md) | 99 KB | Master §3 Art Direction Rules · §4 Composition Rules · §11 Color & Lighting Principles |
| [`master/03-motion-principles-ease-speed.md`](../../skills/motion-creative-director/references/master/03-motion-principles-ease-speed.md) | 155 KB | Master §5 Motion Principles · §18 Recommended Animation Speeds · §19 Ease & Acceleration Principles · Phase-3 Motion-Language Library |
| [`master/04-camera-depth-hero.md`](../../skills/motion-creative-director/references/master/04-camera-depth-hero.md) | 139 KB | Master §6 Camera Movement Library · §20 Cinematic Depth Rules · §10 Product Hero-Shot Rules |
| [`master/05-transition-library.md`](../../skills/motion-creative-director/references/master/05-transition-library.md) | 130 KB | Master §7 Transition Library |
| [`master/06-ui-animation-system.md`](../../skills/motion-creative-director/references/master/06-ui-animation-system.md) | 144 KB | Master §8 UI Animation Rules (Phase 6: the UI Animation System) |
| [`master/07-typography-system.md`](../../skills/motion-creative-director/references/master/07-typography-system.md) | 140 KB | Master §9 Typography Animation Rules |
| [`master/08-editing-rhythm-durations.md`](../../skills/motion-creative-director/references/master/08-editing-rhythm-durations.md) | 162 KB | Master §15 Editing Rhythm and Master §17 Recommended Shot Durations |
| [`master/09-sound-design.md`](../../skills/motion-creative-director/references/master/09-sound-design.md) | 144 KB | Master §16 Sound-Design Principles |
| [`master/10-2d-3d-and-style-categories.md`](../../skills/motion-creative-director/references/master/10-2d-3d-and-style-categories.md) | 201 KB | Master §12 2D Motion Guidelines · §13 3D Motion Guidelines · §14 2D+3D Combination Rules · Phase 11 Style Categories |
| [`master/11-quality-anti-ai-qc-export.md`](../../skills/motion-creative-director/references/master/11-quality-anti-ai-qc-export.md) | 188 KB | Master §21 Anti-AI-Look Guidelines · §22 Quality-Control Checklist (with the Phase-18 QC gate) · §23 Common Mistakes · §24 Final Export Recommendations |

## guidelines/: one production guideline per film type

| File | Size | Title |
|---|---|---|
| [`guidelines/01-saas-product-launch-film.md`](../../skills/motion-creative-director/references/guidelines/01-saas-product-launch-film.md) | 63 KB | Specialised Guideline 01: SaaS Product Launch Film |
| [`guidelines/02-ui-product-demo.md`](../../skills/motion-creative-director/references/guidelines/02-ui-product-demo.md) | 58 KB | Specialised Guideline 02: UI Product Demo |
| [`guidelines/03-ai-technology-launch-video.md`](../../skills/motion-creative-director/references/guidelines/03-ai-technology-launch-video.md) | 81 KB | Specialised Guideline 03: AI / Technology Launch Video |
| [`guidelines/04-premium-brand-motion-film.md`](../../skills/motion-creative-director/references/guidelines/04-premium-brand-motion-film.md) | 74 KB | Specialised Guideline 04: Premium Brand Motion Film |
| [`guidelines/05-feature-announcement-video.md`](../../skills/motion-creative-director/references/guidelines/05-feature-announcement-video.md) | 71 KB | Specialised Guideline 05: Feature Announcement Video |
| [`guidelines/06-social-media-product-video.md`](../../skills/motion-creative-director/references/guidelines/06-social-media-product-video.md) | 72 KB | Specialised Guideline 06: Social Media Product Video |
| [`guidelines/07-short-5-15-second-motion-ad.md`](../../skills/motion-creative-director/references/guidelines/07-short-5-15-second-motion-ad.md) | 76 KB | Specialised Guideline 07: Short 5-15 Second Motion Ad |
| [`guidelines/08-30-60-second-product-explainer.md`](../../skills/motion-creative-director/references/guidelines/08-30-60-second-product-explainer.md) | 94 KB | Specialised Guideline 08: 30-60 Second Product Explainer |
| [`guidelines/09-cinematic-3d-technology-video.md`](../../skills/motion-creative-director/references/guidelines/09-cinematic-3d-technology-video.md) | 83 KB | Specialised Guideline 09: Cinematic 3D Technology Video |
| [`guidelines/10-minimal-2d-motion-graphics-video.md`](../../skills/motion-creative-director/references/guidelines/10-minimal-2d-motion-graphics-video.md) | 78 KB | Specialised Guideline 10: Minimal 2D Motion Graphics Video |
| [`guidelines/11-developer-tool-api-launch.md`](../../skills/motion-creative-director/references/guidelines/11-developer-tool-api-launch.md) | 91 KB | Specialised Guideline 11: Developer Tool / API Launch |
| [`guidelines/12-creator-led-explainer-reel-india-hinglish.md`](../../skills/motion-creative-director/references/guidelines/12-creator-led-explainer-reel-india-hinglish.md) | 74 KB | Specialised Guideline 12: Creator-Led Explainer Reel (India / Hinglish) |

## prompt-system/: brief-to-package prompt system

| File | Size | What it is |
|---|---|---|
| [`prompt-system/prompt-templates.md`](../../skills/motion-creative-director/references/prompt-templates.md) | 86 KB | Fill-in templates: shot spec, camera, transition, UI shot, per-tool plate prompts, continuity bible, cue sheet, generation log, teardown template. |
| [`prompt-system/worked-example.md`](../../skills/motion-creative-director/references/worked-example.md) | 136 KB | A complete package from brief to QC record. |
| [`prompt-system/motion-creative-director/SKILL.md`](../../skills/motion-creative-director/SKILL.md) | 24 KB | The motion-creative-director skill (entry point). |
| `prompt-system/motion-creative-director/references/` | | Skill references: `master-system.md` (condensed always-read digest), `MASTER-SAAS-MOTION-DESIGN-SYSTEM.md` (full assembled master), `master/` (Parts 01-11), `guidelines/` (12 guidelines), `prompt-templates.md`, `worked-example.md`. Copies of the files above; refresh them after any edit. |

## videos/: frame-level teardowns of the 8 reference films `[V:<id6>]`

| File | Size | Film |
|---|---|---|
| [`videos/1-6l8SV5NXZQotrYoV8KqKV7SJPvtssso.md`](videos/1-6l8SV5NXZQotrYoV8KqKV7SJPvtssso.md) | 61 KB | kivi (heykivi.ai): "Everything. Powered by Your Voice." voice-AI launch film |
| [`videos/126cpH-FXL4FxTwRwoJvt9M4FNwBB7peq.md`](videos/126cpH-FXL4FxTwRwoJvt9M4FNwBB7peq.md) | 61 KB | 126cpH-FXL4FxTwRwoJvt9M4FNwBB7peq ("POV you made an ad for chowdeck") |
| [`videos/15VhHRcisoHSPWY0VA06PzA3u_y-4qJY_.md`](videos/15VhHRcisoHSPWY0VA06PzA3u_y-4qJY_.md) | 64 KB | 15VhHRcisoHSPWY0VA06PzA3u_y-4qJY_ ("Build a website you ♥ love — with Wix") |
| [`videos/19NRDvazRJFCFcAfehavceGsUMV64qBRv.md`](videos/19NRDvazRJFCFcAfehavceGsUMV64qBRv.md) | 63 KB | Bumper "BUMPER PRO" ("Take payments like a PRO"), a payment-unification launch film |
| [`videos/1CSXtQSs2jM0WBQP6LPDVpDgkt8JLdUkw.md`](videos/1CSXtQSs2jM0WBQP6LPDVpDgkt8JLdUkw.md) | 57 KB | OpenAI × HubSpot "ChatGPT connector" launch spot (1CSXtQSs2jM0WBQP6LPDVpDgkt8JLdUkw) |
| [`videos/1Hcg3X8G_q34iS-RqcAQ2pMHpGkIhxu3j.md`](videos/1Hcg3X8G_q34iS-RqcAQ2pMHpGkIhxu3j.md) | 69 KB | "How Do Solar Panels Work?" (flat 2.5D editorial explainer) |
| [`videos/1ccYWJ6nQXdqt1UQrpz2mE0ODScG_hU0K.md`](videos/1ccYWJ6nQXdqt1UQrpz2mE0ODScG_hU0K.md) | 70 KB | Lottieicon ("Animated icons library"): dark neon-green launch promo for an animated Lottie/AEP icon library |
| [`videos/1i2L14p-cvnLcIl6XY7mUQEiTYZy_OWUA.md`](videos/1i2L14p-cvnLcIl6XY7mUQEiTYZy_OWUA.md) | 68 KB | NOSTRA motion-design studio promo ("Imagine a way… No stress, no bad surprise. Book now"), presented in a chapter-bar player frame |

## web/: text research briefs and catalogues

| File | Size | Tag | What it is |
|---|---|---|---|
| [`web/superside-playbook.md`](web/superside-playbook.md) | 61 KB | `[S:playbook]` | Playbook distilled from 20 Superside B2B SaaS videos |
| [`web/superside.json`](web/superside.json) | 317 KB | `[S:<brand>]` | Raw Superside article data and 20 per-video breakdowns |
| [`web/superside-critic.md`](web/superside-critic.md) | 5 KB |  | Audit of the Superside research |
| [`web/elevenlabs-style-brief.md`](web/elevenlabs-style-brief.md) | 19 KB | `[E]` | ElevenLabs short launch films: durations, formats, brand system, CTA wording |
| [`web/motion-numbers-brief.md`](web/motion-numbers-brief.md) | 24 KB | `[N]` | Design-system motion tokens, reading speed, attention and platform numbers |
| [`web/voice-footage-pipeline-brief.md`](web/voice-footage-pipeline-brief.md) | 27 KB | `[P]` | ElevenLabs TTS timestamps, Veo / Flow, Remotion pipeline constraints |
| [`web/motion-so.md`](web/motion-so.md) | 23 KB | `[W:motion.so]` | motion.so "Made with Motion" catalogue and patterns |
| [`web/showreel-design.md`](web/showreel-design.md) | 39 KB | `[W:showreel.design]` | showreel.design SaaS / product / UI motion catalogue |
| [`web/raivcoo.md`](web/raivcoo.md) | 56 KB | `[W:raivcoo]` | Raivcoo motion inspiration catalogue |
| `web/raw/community.txt` (raw scrape, not committed) | 95 KB |  | Raw Raivcoo / community page text |
| `web/raw/bucket.xml` (raw scrape, not committed) | 6 KB |  | Raw sitemap / bucket listing |
| `web/raw/motion-so/00-index.txt` (raw scrape, not committed) | 5 KB |  | Raw motion.so index notes |

## Limits

Six ElevenLabs reference videos in the user's Drive folder were larger than the ~5.5 MB download limit of the Drive connector and could not be analysed; ElevenLabs rules rest on the text brief. See *Methodology & Limits* at the end of the master.
