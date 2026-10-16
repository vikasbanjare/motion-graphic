# SaaS video playbook

This playbook comes from Superside's "16+ Best B2B SaaS Video Examples From 2026" (Dec 15, 2025) and from 20 breakdowns, one per video. That is the 16 numbered examples plus the 4 illustrative ones in the article's "types" section, numbered 0.1-0.4. Nobody watched the videos frame by frame. The facts come from captions, YouTube chapters, Wistia metadata, transcripts, case studies and press. Anything marked **[inferred]** is a reconstruction, not something observed.

**Evidence key**
- **Measured timing:** taken from captions, chapters or a teardown.
  - Superspace (#7): full timed transcript.
  - Snowflake Luminate and Nissan (#12): caption tracks.
  - Thomson Reuters (#13): caption track.
  - Airtable (#5): YouTube chapters.
  - Figma (#6): cut rate from a snippet of a third-party teardown.
- **Duration only:** the runtime is sourced, but every beat timing is [inferred]. This covers Clever Devices, TradeLens, Imperfect Foods, PointCard, Slack "What is Slack?", Newsela, Slack 2014, Zendesk and GitHub. Two of these are weaker:
  - Bolt: the 177 s is the embedded portfolio comp. The delivered film's length is unpublished; the brief asked for 60 s.
  - Airbnb 2.0: 22 s comes only from a channel-listing search snippet.
- **Runtime unknown:** Duolingo, Stripe keynote, Snowflake Summit, and Asana (a series, not one video).
- **Caveats to carry:**
  - Airbnb 2.0 is probably an unofficial fan video [inferred].
  - The PointCard embed is the pricing ad. The CTR figures in the article belong to its sibling unboxing and travel ads.
  - TradeLens is a feature explainer, even though the article files it as "launch/keynote".
  - Imperfect Foods is a B2C grocery service, not SaaS.
  - The article says the Slack 2014 film uses metaphors in which inboxes "morph into organized threads". No source backs this, and it conflicts with the producer's account that the film avoided interface shots.
  - Wistia stats count plays of that embed, not campaign performance. For Superside-hosted assets, the viewers are blog and portfolio visitors.

---

## 1. What great SaaS videos have in common

1. **Choose the length by the job.** Observed runtimes fall into four groups:
   - Short ads, concept shorts and cutdowns: **18-39 s**. PointCard 18 s, Airbnb 2.0 about 22 s, Imperfect Foods 30 s, Thomson Reuters cutdown 39 s.
   - Explainers, how-tos and launch sizzles: **57-83 s**. Newsela 57, Airtable 58, Clever Devices 72, TradeLens 82, Figma about 82, Asana "Post status updates" 83.
   - Platform tours and story films: **115-169 s**. Superspace 115 s of narration, Slack mockumentary 141, "What is Slack?" 169.
   - Long form: **about 5 to 11 min and longer**. Zendesk 296 s, GitHub 659 s, Stripe keynote about 70-80 min [inferred].

   The article frames the explainer as a 30-90 s "elevator pitch".
   *Engine:* reels are 15-35 s. The checker warns past 60 s for vertical and 180 s for landscape. For long form, make chapter teasers.

2. **Name the product and its promise by about 10 s.**
   - Superspace says "That's why we built Superspace" at **9.3 s**, after a 9 s pain opener.
   - Airtable's "Introducing Omni" chapter starts at **0:10**.
   - Thomson Reuters' first spoken words (**2.9 s**) state the outcome and name the product.
   - Luminate's first line (**5.2 s**) says who they are.
   - Superside's Wistia embeds use short animated previews. PointCard's loops 0-5 s and Imperfect Foods' shows the first 5 s, so there the opening frames double as the thumbnail. Superspace's preview loops the reveal instead (7.8-19.5 s).

   *Engine:* the checker wants scene 1's payoff on screen within 3 s. That is the kit's rule; none of these examples measured it. In explainers, make the 3 s payoff the pain or the question, and let the product name land in beat 2.

3. **In feeds, open on a pain, a question or the outcome, not the logo.**
   - Pain or question openers:
     - Superspace: three pain lines (measured).
     - Slack: "Tired of constant context-switching?" is description copy; on-screen use is [inferred].
     - TradeLens: an information-overload grid. This comes from a secondary source, and its position is [inferred].
     - Duolingo probably opens on its "describe Duolingo in three words" question [inferred]. Its "learning feels like a chore" beat is sourced, but not where it sits.
   - Outcome openers: Thomson Reuters (measured). Bolt (speed as a feeling) and Airbnb (destination first) are [inferred].
   - Logo opens:
     - Newsela's how-to starts and ends with an animated logo and title (sourced). The presenter states the teacher's problem after that.
     - Luminate opens with 5.2 s without speech; the content is unknown.

     Neither is a feed ad.

4. **Group things in threes.**
   - Superspace: three pains (0-9.3 s), then a three-benefit triad (20.7-30.2 s, about 3 s each).
   - Duolingo: "Free, Fun & Effective".
   - Thomson Reuters: three soundbites of about 10, 13 and 8 s.
   - Stripe: a closing recap of three themes.
   - TradeLens: a benefit triplet [inferred].

   *Engine:* `list` with 3 items, `kinetic` with 3 lines, `compare` with 3 rows or fewer.

5. **Real UI is the proof. Frame it and highlight one area at a time.**
   - Figma: 71% of the runtime is screen capture.
   - Slack: "real app footage". Airtable: "tight UI demos". Superspace: "step-by-step screen walkthroughs".
   - Newsela: "certain parts of the screen recording are highlighted".
   - Asana shows status counts in the UI, and Stripe runs live Dashboard and CLI demos.
   - PointCard's case study: across the campaign, app UI outperformed shots of the physical card.
   - No breakdown observed a zoom-in directly. It is a reasonable technique, but an inference.

   *Engine:* today, use `image` (`fit: "contain"`, `move: "in"`) with a user screenshot, or `prompt`/`chat` as a stylised stand-in for UI. Zoom-to-callout is gap #1.

6. **Change the on-screen text about every 2.5-3.5 s and the idea every 7-14 s.**
   - Superspace caption lines mostly run 2.4-3.5 s (full range 1.3-5.6 s), and its feature blocks 7-16 s.
   - Luminate caption lines average 3.2 s.
   - Airtable's five chapters run 9-14 s each.
   - Caption cadence is not the cut rate. Shot lengths were not measured, except in Figma's launch sizzle, which cuts at **57.7 scenes per minute**, about 1 shot per second.

   *Engine:* scenes last between 1.3 s and about 7 s, so one 9-14 s chapter is 2-3 scenes.

7. **Narrate at about 150-170 wpm, so 60 s of narration holds about 150-170 words.**
   - Superspace: about 154 wpm (295 words in 115 s).
   - Luminate: about 160 wpm.
   - Thomson Reuters: about 170 wpm, slowing on its closing vision line.

   *Engine:* the `normal` reading pace is 3 words per second (180 wpm). Write narrated SaaS `say` lines at about 2.6 words per second, and use `pace: "relaxed"` for how-tos.

8. **Order features the way a customer meets them.**
   - Superspace runs teams → brief → review → assets → integrations → trust. That order is why its overview doubles as onboarding.
   - Asana Academy's chapters run navigate (0:54) → capture work (3:33) → prioritise (7:31) → inbox (10:05). These timestamps came through a search summary.
   - Clever Devices follows one journey from dispatch to stop to on board (order [inferred]).
   - Newsela explains "Lexile level" and shows how to assign by reading level. That the concept comes before the UI step is [inferred].

9. **Prove with named numbers, ideally before and after, and only verified ones.**
   - Stripe: "from 59% to 97% overnight"; tax coverage from 57 to 102 countries.
   - University of Auckland: cloning "within seconds" vs "several days"; pipeline fixes from "a whole day" to "within an hour".
   - Imperfect Foods: 6-8 lbs of food saved per box. This is from iSpot's description of the TV spot; that it is the same creative as the Wistia cut is [inferred].

   *Engine:* `stat`, `compare`, `bars`. Numbers come only from the user.

10. **Let customers carry testimonials, with no brand narrator.**
    - In Thomson Reuters, Luminate, Nissan and Auckland, every spoken line is the customer's.
    - Imperfect Foods ran a UGC ad with motion graphics on TikTok, Instagram and Facebook after repurposed brand creative "wasn't working, especially on TikTok". It did well enough there to be adapted for TV.
    - Wistia engagement on these embeds: TR 40.5%, Nissan 38.7%, Luminate 34.7%. This does not show that testimonials engage better. Other embeds in the set score higher (Zendesk 58%, Imperfect Foods 53%, Superspace 46.9%), and all of these numbers measure embed viewers, not campaigns.

    *Engine:* use `quote` only for real, approved quotes. Never put a customer's words through TTS (see Recipe 4).

11. **Design for sound-off.**
    - Figma has no voice-over (sourced). Airbnb 2.0 is probably music only [inferred].
    - PointCard was a feed ad in the Facebook family, probably designed for sound-off [inferred].
    - Thomson Reuters has a full closed-caption track: 11 cues of 2-4 s.

    *Engine:* `say` is narration and the on-screen text is separate. Write each scene so its on-screen text carries the point without sound. Keep `progressBar` on for reels.

12. **Make the motion feel like the product.**
    - Bolt: Superside says its "surreal motion language and fluid camera movements" mirror the speed of one-click checkout.
    - Duolingo shows hearts, streaks and push notifications as game objects (Superside, Nexus Studios).
    - Clever Devices syncs audio cues and motion graphics with the system's own stop-screen and onboard updates (Superside).
    - PointCard's top performers across the campaign "almost always feature an arrow" (case study).
    - Zendesk's rebrand shapes "move and bounce". That is a critic's comment on the brand system and is not confirmed in the documentary.
    - Figma's Config 2025 opening keynote film was dropped to 15 fps for a handmade feel. That film is by Relay and is not the recap reel.

    *Engine:* choose `motion` by the promise: `snappy` for speed, `bouncy` for playful, `calm` for AI and voice products, `smooth` for B2B.

13. **Match the CTA to the funnel stage.**
    - **Awareness:** a soft URL or tagline.
      - Slack's YouTube descriptions say "LEARN MORE: slack.com" and "Check it out for yourself at slack.com". The in-video wording is unknown.
      - Superspace, Thomson Reuters and Luminate end without a spoken CTA.
    - **Consideration:** a link to the feature.
      - TradeLens' description: "Find out more: tradelens.com/…".
      - Airtable's description: "See how Airtable AI app building can turn your ideas into apps in seconds".
    - **Performance:** an action, an offer and an arrow.
      - PointCard's campaign arrows.
      - Imperfect Foods' TV-spot title "Get $100 in Free Groceries".
      - Duolingo's "Download for free" promo (iSpot).
    - **Event:** the next step, such as Stripe's "full list ... on our blog".
    - **Testimonial tails:** brand-hosted testimonials end on 4-7 s with no speech (Luminate 5.4 s, Nissan 6.8 s, TR 4.2 s). What is on screen is unknown; a logo card is the likely guess [inferred].

    *Engine:* `cta` with `style: "link"` for B2B awareness and consideration, `"button"` for performance, then a `logo` with no `say`.

14. **Build a system, not a one-off.**
    - TradeLens: a series of 6 feature videos of 78-87 s, plus a 4:51 overview. A shared template is likely but unverified.
    - Asana: Class Central lists 38 "How to Asana" titles, and Asana says each runs about 1-2 min.
    - Imperfect Foods A/B-tested the value proposition in the first half and localized the motion text overlays per state.
    - PointCard shipped new ads and concepts every 3-4 days.

    *Engine:* one spec per series, with the copy swapped. For A/B tests, vary scene 1 only. Use `--all-formats`.

15. **Long form needs a map and recaps.**
    - Stripe announces its chapter map: "Payments, Revenue, and Connect. And then we've got something very big to introduce at the end". It closes the Payments, Revenue and Connect chapters with spoken recaps.
    - GitHub is built on 4 one-word keys. These come from the companion article and the host's post; how the video splits into chapters is unconfirmed.
    - Airtable runs on 5 chapters.
    - Slack's description lists 6 pillars. Whether the video is chaptered by them is [inferred].

    *Engine:* for a chapter divider, use `title` with the kicker "01 / 04". For a recap, use `list` with `style: "lines"`. A persistent chapter rail is a gap.

---

## 2. Video types

The lengths per platform below are suggestions. Only the main 16:9 ranges come from observed examples, and none of them are platform rules.

### A. Explainer / positioning
- **Purpose:** answer "what is it and why should I care". The article frames it as a 30-90 s elevator pitch.
- **Length:** 45-90 s at 16:9; a 30-45 s cut for LinkedIn; a 20-30 s reel cut (hook, reveal, triad, CTA).
- **Beats (60 s, 16:9; a template based on Superspace):**

| s | Beat | Scenes |
|---|---|---|
| 0-3 | pain or question | `kinetic` (3 pains) or `hook` (strike the old way) |
| 3-10 | reveal: "That's why we built X" | `title` (kicker "Meet X") or `orb` |
| 10-20 | benefit triad | `list` checks |
| 20-42 | 2-3 features, about 7 s each | `prompt`, `chat`, `image` (contain screenshot), `grid` |
| 42-50 | differentiator or proof | `compare`, `stat` |
| 50-56 | CTA | `cta` link |
| 56-60 | logo, no narration | `logo` |

- **Look:** `corporate` for B2B, `clean` for calm products, `studio`/`studio-dark` for AI. Motion `smooth`, pace `normal`.
- **Examples:** Superspace (measured), "What is Slack?", Clever Devices. Use **Recipe 1**.

### B. Product launch / launch sizzle
- **Purpose:** announce something. A film released alongside the announcement can double as a PR or keynote-highlight clip; Airtable's went up the same day as its CEO's letter.
- **Length:** 45-60 s at 16:9 for web, YouTube and X; a 15-25 s vertical teaser. The engine's launch-film norm is 35-50 s with 10-14 beats.
- **Beats (the Airtable chapter timings are measured; the scene mapping is a suggestion):**

| s | Beat | Scenes |
|---|---|---|
| 0-10 | era hook ("As AI reshapes…") | `kinetic` or `hook` (strike "another chatbot") |
| 10-22 | reveal | `orb` ("Meet X.") |
| 22-31 | demo 1: build | `prompt` |
| 31-45 | demo 2: agents and insights | `chat` + `stat` (or `wave` for voice products) |
| 45-58 | "The future of work": a vision line, then logo and CTA (where the split falls is [inferred]) | `kinetic` / `title`, then `cta` link + `logo` |

- **Look:** `studio`/`studio-dark` (motion `calm`) or `neon` for developer and AI products.
- **Examples:** Airtable; Airbnb 2.0 as a 22 s concept (probably unofficial [inferred]). Start from `specs/studio-launch.json` or Recipe 6.

### C. Feature demo / deep-dive
- **Purpose:** consideration. One feature per video, made as a series, so each film can sit on its own feature page.
- **Length:** 60-90 s at 16:9 (TradeLens 82 s, siblings 78-87 s), plus a 20-30 s vertical cut of the single "aha" moment.
- **Beats (about 80 s; order from secondary TradeLens write-ups, timings [inferred]):**

| s | Beat | Scenes |
|---|---|---|
| 0-8 | scale of the noise | `stat` |
| 8-15 | pain detail | `list` crosses / `compare` |
| 15-22 | feature reveal | `title` |
| 22-45 | set up, then result | `list` checks, then `prompt`, then `image` |
| 45-55 | delivery channels | `grid` |
| 55-65 | trust (data source, security) | `kinetic` with `bg: "accent"` / `stat` |
| 65-75 | benefit triplet | `list` lines |
| 75-82 | CTA | `cta` link + `logo` |

- **Look:** `clean`/`corporate`, motion `smooth`. Use **Recipe 2**.

### D. Onboarding / how-to
- **Purpose:** self-serve answers to "How do I do X?" questions. Asana embeds its tutorials in the help center.
- **Length:**
  - One task per video, 45-90 s (Newsela 57, Asana 83).
  - Platform tours run about 2 min (Superspace: 115 s of narration in a 139 s file).
  - The Academy course format, under 15 minutes, is out of kit scope.
- **Beats (about 57 s, Newsela-style; timings [inferred]):**

| s | Beat | Scenes |
|---|---|---|
| 0-3 | "How to [Brand]: [Task]" | `title` |
| 3-12 | why it matters | `kinetic` |
| 12-22 | the one concept or piece of jargon | `grid` / `bars` / `stat` |
| 22-45 | steps 1-3 in the UI | `list` numbers, then one `image`/`prompt` per step |
| 45-52 | tips or recap | `list` checks |
| 52-57 | CTA | `cta` link + `logo` |

- **Look:** `clean`, motion `calm`, pace `relaxed`, landscape. The presenter (Asana's host, or Newsela's presenter or AI narrator) becomes voice-over only in the kit.
- Use **Recipe 3**.

### E. Customer story / testimonial
- **Purpose:** borrowed credibility for buyers who must justify the spend.
- **Length:**
  - A 30-40 s cutdown (TR 39, Imperfect 30).
  - A 90-120 s web story (Luminate 96).
  - A 2-4 min hero story (Slack 2014 141, Nissan 221).
- **Beats (TR, measured):**

| s | Beat | Scenes |
|---|---|---|
| 0-2.9 | establishing shot, no speech | in feeds, skip this and start on the quote |
| 2.9-13.2 | outcome claim | `quote` + `kinetic` |
| 13.2-26.7 | before / after | `compare` |
| 26.7-34.8 | vision line (slowest delivery) | `quote` |
| 34.8-39 | sign-off, no speech | `logo` |

- **96 s variant (Luminate, measured):**
  - 0-5.2: open with no speech.
  - 5.2-21.9: who they are and their credentials.
  - 22.5-33.6: solution.
  - 33.6-48: requirements.
  - 48-61.7: why this vendor.
  - 61.7-80.4: product proof, a likely spot for UI [inferred].
  - 80.4-90.7: payoff line.
  - 90.7-96: outro.
- **Look:** `studio-dark`/`editorial`/`corporate`, motion `calm`, pace `relaxed`. Use **Recipe 4**. Today, real footage can only play as a muted `clip` (gap #2).

### F. Brand / manifesto / brand story
- **Length:** a 30-60 s brand film. Bolt's brief was 60 s (listicle only); Duolingo is probably :30 [inferred]. Behind-the-scenes documentaries (Zendesk, 296 s) are out of scope except as teasers.
- **Beats (30 s, three-word spine; a template, timings [inferred]):**

| s | Beat | Scenes |
|---|---|---|
| 0-3 | "How would you describe [Brand] in three words?" | `kinetic` |
| 3-7 | the dull "before" | `hook` (strike the old feeling) or `kinetic` with `bg: "inverse"` |
| 7-22 | three words with proof, about 5 s each | `title` per word, alternating with `stat`/`grid` (never 3 of the same type in a row) |
| 22-27 | manifesto line | `kinetic` with `bg: "accent"` |
| 27-30 | CTA | `cta` |

- **Look:** `pop` (playful), `neon` (electric, Bolt-like), `editorial` (premium) or `mono`. Motion `snappy`/`bouncy`, pace `fast`.

### G. Performance ad / social cut
- **Length:** 15-20 s reel (PointCard 18 s); up to 30 s (Imperfect).
- **Beats (18 s, PointCard; reconstructed from the asset name and case study, beats and timings [inferred]):**

| s | Beat | Scenes |
|---|---|---|
| 0-3 | objection | `hook` |
| 3-8 | three perks | `list` checks / `stat` |
| 8-12 | product UI | `image` (contain app screenshot) |
| 12-15 | mirrored payoff | `kinetic` |
| 15-18 | offer + action | `cta` button |

- **Look:** `pop`/`midnight`/`neon` with the brand accent, motion `snappy`, pace `fast`, `progressBar: true`.
- **Variants:**
  - A/B: change scene 1 only.
  - Colour tests: change `brand.accent`. PointCard tested orange against yellow, and orange showed the better CTR.
  - Use **Recipe 5**.

### H. Event: keynote highlights, recap, webinar promo
- **Length:** a 60-90 s recap sizzle (Figma 82); 60-120 s highlights [inferred target]; a 15-30 s promo. The keynote itself (Stripe) is long form and out of scope, so the kit makes chapter clips.
- **Beats (35-40 s recap; a template, not measured):**

| s | Beat | Scenes |
|---|---|---|
| 0-2 | "Did you catch them all?" or a slam of date and place | `kinetic` |
| 2-30 | per launch: name card (about 3 s) plus one proof (about 4 s) | `title` + `prompt`/`image`/`stat` |
| 30-34 | recap list (Figma's YouTube description uses an arrow list; on-screen use unknown) | `list` lines |
| 34-40 | next step | `cta` + `logo` |

- **Webinar promo variant:** `kinetic` (topic question), `title` (date and speaker), `list` (3 takeaways), `cta` button "Save your seat".
- **Look:** `studio-dark`/`neon`/`midnight`, motion `snappy`, `transition: "whip"`, licensed music with cuts on the beat. Crowd and stage footage only through a user-supplied `clip`.
- Use **Recipe 6**.

### I. Thought leadership / enablement episode (GitHub)
The kit makes a 30-45 s promo or a teaser per chapter:
- `kinetic`: a who-it's-for question.
- `title`: the series and the guest.
- `list` numbers: the framework.
- `quote`: a verified line.
- `cta` link: "Watch the episode".

---

## 3. Example-by-example takeaways

| # | Brand | Type | Length | Technique worth stealing | Engine mapping |
|---|---|---|---|---|---|
| 0.1 | Clever Devices | Explainer (live action + data overlays) | 72 s | One journey as the spine; overlays and audio cues synced with the system's own updates (content per Superside, order [inferred]) | `kinetic` → `list` crosses → `grid` → `stat` → `cta`; journey rail = gap #4 |
| 0.2 | TradeLens | Single-feature explainer, isometric | 82 s | Noise first, then isolate one signal (secondary source); one of 6 feature videos of similar length (shared template unverified) | Recipe 2; noise grid = gap #11 |
| 0.3 | Imperfect Foods (B2C) | UGC testimonial ad | 30 s | Swappable first-half value prop for A/B; customer footage with overlays (captions [inferred]) | `clip` (muted) + `stat` + `cta` button; clip audio = gap #2 |
| 0.4 | Asana | How-to series | 1-2 min per episode (83 s documented) | One feature per episode; "How to Asana: X" naming; chapters on the long version | Recipe 3 |
| 1 | Bolt | Brand explainer, 2D/3D | 60 s brief (the 177 s embed is probably a portfolio comp [inferred]) | Make the speed felt through motion (techniques [inferred]) | `kinetic` + `stat`, theme `neon`, motion `snappy`, `transition: "zoom"` |
| 2 | PointCard | Performance social ad | 18 s | Objection flip "Free? Nope. Worth it? Yes."; arrow to the CTA (campaign pattern; in this ad [inferred]) | Recipe 5; arrow = gap #5 |
| 3 | Duolingo | Character-led TV explainer | Unknown (:30 [inferred]) | Three-word spine; product mechanics as game objects | `kinetic` per word, `stat` (streak), `cta` with kicker "Download for free" and a short button (the full phrase is 17 characters, over the 16-character button limit); characters not reproducible |
| 4 | Slack, "What is Slack?" | Demo / explainer | 169 s | Yes/no pain question (description copy; on-screen [inferred]); six pillars (in the description; as chapters [inferred]) | `kinetic` → `list` → `chat`/`image` per pillar; chapter rail = gap #4 |
| 5 | Airtable | AI launch sizzle | 58 s | 5 chapters of 9-14 s; UI building "right before your eyes" (description promise) | `orb` → `prompt` → `chat` → `stat` → `cta` link (`studio`) |
| 6 | Figma Config | Launch recap, no VO | about 82 s | About 1 shot per second, 71% UI; arrow-list recap (in the description; on-screen unknown) | Recipe 6; montage = gap #10 |
| 7 | Superspace | Product overview / onboarding | 139 s file, 115 s VO | 9 s pain triad → reveal at 9.3 s → benefit triad → features in lifecycle order; "and boom" step payoff | Recipe 1; stepper = gap #4, logo hub = gap #7 |
| 8 | Airbnb 2.0 (probably unofficial) | Concept launch / demo | about 22 s | Show the reward (destination) before the tool; probably music only (both [inferred]) | `image` cover → `image` contain → `cta`; device frame = gap #6 |
| 9 | Newsela | How-to, single task | 57 s | Explain the jargon (Lexile), then the UI step (order [inferred]); logo bookends; highlighted UI regions | Recipe 3; callouts = gap #1 |
| 10 | Stripe Sessions | Live keynote | Unknown (about 70-80 min [inferred]) | Announced chapter map + open loop + spoken recaps after the main chapters; before/after stats | `title` "01 / 04", `stat`, `list` lines; delta stat = gap #8 |
| 11 | Snowflake Summit | Event highlights | Unknown (1-3 min [inferred]) | Sell FOMO with packed keynotes, high-profile speakers and audience reactions | `kinetic` date slam → `stat` → `clip` (user footage) → `cta` button |
| 12 | Snowflake customers | Documentary-style testimonials | 96 s (Luminate), 221 s (Nissan) | Short bookends with no speech (content unknown) around continuous customer speech; chapters by speaker (Nissan, Auckland) | Recipe 4; clip audio = gap #2 |
| 13 | Thomson Reuters CoCounsel | Testimonial cutdown | 39 s | Outcome-first soundbite; scope widens from case to work to nation | Recipe 4 |
| 14 | Slack, "So yeah, we tried Slack" | Mockumentary customer story | 141 s | Skeptic-to-convert arc; time-jump beats (from the description's cadence; on-screen [inferred]) | `kinetic` ("Six months later.") + `chat` + `quote`; live action not reproducible |
| 15 | Zendesk rebrand | Behind-the-scenes brand story | 296 s | Self-deprecating stakes ("Z or clown shoes?"); a question as the CTA (blog CTA; in the film [inferred]) | `compare` Then/Now + `logo`; teaser only |
| 16 | GitHub "Beyond the Commit" | Enablement episode | 659 s | A 4-key framework (goals, champions, reminders, training) promised in the title ("A 4-step strategy"); chapters per key unconfirmed | `list` numbers + `title` "01 / 04"; teaser only |

---

## 4. Copy patterns

### Hooks and openers (verbatim where sourced)

| Pattern | Real example (source, status) | Engine |
|---|---|---|
| Pain question | "Tired of constant context-switching?" (Slack, YouTube description; use in the video [inferred]) | `kinetic` / `hook` setup |
| Pain triad, then "what if" | "Creative requests from every direction." / "Scattered feedback, lost files, clunky tools." / "Imagine how much you could get done if everything just worked." (Superspace, captions) | `kinetic`, 3 lines |
| Reveal | "That's why we built Superspace, the creative collaboration platform powering every project at Superside." (captions) | `title`, kicker "Meet X" |
| Era shift + contrast | "As AI reshapes every industry, you don't need another chatbot in…" (Airtable, caption fragment, truncated) | `hook`, strike "another chatbot" |
| Scale of the noise | "With millions of shipping events happening every day, finding the one you care about is a challenge." (TradeLens product page; spoken [inferred]) | `stat` |
| Objection flip | "Free? Nope. Worth it? Yes." (PointCard, case study + asset name) | `hook` + `kinetic` |
| Three words | "How would you describe Duolingo in three words?" (YouTube description) → "Free, Fun, and Effective Language Lessons" (iSpot tagline) | `kinetic` |
| Collect them all | "Did you catch them all? Here's everything we announced at #Config2025" (Figma, description) | `kinetic` |
| Outcome-first soundbite | "We can certainly build a stronger case with co counsel…" (TR, captions) | `quote` |
| Sensory before/after | "Before I had co counsel, you're kind of going through just boxes and boxes of legal file." (TR, captions) | `compare` |
| Credentials first | "Luminate is the most comprehensive analytical platform for the entertainment industry." (captions) | `quote` / `title` |
| Data framing | "If you know how to use data and if data tells you a story, then universities are a good place to be…" (Auckland transcript) | `quote` |
| Historical callback | "Eighteen years ago, right here at Moscone, the world met the iPhone." (Stripe transcript) | `kinetic` |
| Open loop | "And then we've got something very big to introduce at the end. So for real, stay tuned." (Stripe transcript) | `title` |
| Manifesto | "Money should move at the speed of bits." / "money is just data." (Stripe transcript) | `kinetic` with `bg: "accent"` |
| Who-it's-for question | "Planning to introduce GitHub Copilot to your team or organization?" (GitHub description) | `kinetic` |
| Skeptic confession | Title "So Yeah, We Tried Slack …"; description: "products like that never work" … "Six months later, they were using it. Seven months later they were in love." (Slack 2014) | `kinetic` time-jump lines |
| Series title | "How to Asana: Post status updates" | `title` kicker |
| Promise title | "Streamline Communications and Operations One Journey at a Time" (Clever, video title) | `title` |
| Introducing | "Introducing a new generation of Airtable" (title); "Introducing Airbnb 2.0" (title; probably unofficial) | `orb` |
| Brand line | "Shockingly Simple" (Bolt positioning; in the film [inferred]); "Asana is the modern way to work together." (2011 script) | `logo` tagline |

### CTAs and closers

| Wording | Source | Stage |
|---|---|---|
| "LEARN MORE: https://www.slack.com" | Slack 2024, YouTube description | Awareness |
| "Check it out for yourself at http://slack.com" | Slack 2014, YouTube description | Awareness |
| "Find out more: https://tradelens.com/…" | TradeLens, YouTube description | Consideration |
| "See how Airtable AI app building can turn your ideas into apps in seconds" | Airtable, YouTube description | Consideration |
| "Download for free" | Duolingo (iSpot promo) | Performance |
| "Get $100 in Free Groceries" | Imperfect Foods TV spot title (iSpot); not confirmed on the Wistia cut | Performance |
| Arrow to the sign-up button (wording unknown) | PointCard case study (campaign-level) | Performance |
| "Superside, your creative team's creative team." (tagline only, no spoken CTA) | Superspace, captions | Onboarding / brand |
| "One element is to bring this data together, but the other way is to make sense of it." (no CTA) | Luminate, captions | Testimonial |
| "Our experience with Snowflake has been transformational." | Auckland transcript | Testimonial |
| "…let us know if you see the Z, or if it just looks like clown shoes." | Zendesk blog (in the film [inferred]) | Brand / engagement |
| "…full list of everything that's new posted on our blog later today" / "Thank you so much, and enjoy Sessions." | Stripe transcript | Event |
| "To learn more and continue your journey, explore the resources below" | GitHub companion article (video CTA unknown) | Enablement |

**Writing rules:**
- Keep button text to 1-3 words and 16 characters or fewer. The checker warns above 16.
- For B2B awareness, use `style: "link"`: "Try X →", "Learn more", "See how it works".
- For performance, use a verb, an object and a verified offer.
- Never invent offers, prices or customer quotes.

---

## 5. Engine gaps

**Scoring:** score = F × I ÷ E.
- **F (frequency):** an example where the technique or content is sourced counts 1. One that is only inferred, or comes from a secondary source, counts 0.5.
- **I (impact):** 1-3, lowered when a workaround already exists.
- **E (effort):** 1-3.

These scores are judgment calls. The kit never generates images, so features marked **Yes** under assets need user-supplied files.

| Rank | Feature | F | I | E | Score | Assets? |
|---|---|---|---|---|---|---|
| 1 | `screen`: UI screenshot with zoom-to-callout, rings, cursor | 9.5 | 3 | 2 | 14.3 | **Yes**: screenshots |
| 2 | Speaker clip with source audio, lower third and captions | 8 | 3 | 2 | 12.0 | **Yes**: footage + release |
| 3 | `notify`: notification / toast stack | 4 | 2 | 1 | 8.0 | No |
| 4 | `steps` + chapter rail | 7 | 1.5 | 1.5 | 7.0 | No |
| 5 | CTA arrow + offer pill (+ store badges) | 3 | 2 | 1 | 6.0 | Badges only |
| 6 | Device frames (option on `screen`/`image`/`clip`) | 2.5 | 2 | 1 | 5.0 | No (frame is drawn) |
| 7 | `logos`: integrations hub / logo wall / co-brand | 3.5 | 2 | 1.5 | 4.7 | **Yes**: logos (text fallback) |
| 8 | Delta stat (from → to) | 3 | 1.5 | 1 | 4.5 | No |
| 9 | `stats`: KPI dashboard of 2-4 tiles | 2.5 | 1.5 | 1 | 3.8 | No |
| 10 | `montage`: beat-cut image/clip sequence | 2.5 | 2 | 2 | 2.5 | **Yes** |
| 11 | `chaos`: chaos-to-order / signal-from-noise | 2 | 2 | 2 | 2.0 | No |
| 12 | Line-icon set for `grid` | 2 | 1 | 1 | 2.0 | No (bundled) |
| 13 | `flow`: node / workflow diagram | 2.5 | 2 | 3 | 1.7 | No |
| 14 | Terminal look for `prompt` | 1 | 1.5 | 1 | 1.5 | No |
| 15 | `price`: pricing card | 0.5 | 2 | 1 | 1.0 | No |
| 16 | Split screen (two parties) | 2 | 1 | 2 | 1.0 | Depends |
| 17 | Map / reach | 0.5 | 1 | 3 | 0.2 | No |

**Evidence behind the top ranks**
- **#1 screen.** Sourced: Figma, Slack WiS, Airtable, Superspace, Newsela, Asana, Stripe, PointCard (campaign-level). Inferred: TradeLens, Airbnb, Clever.
- **#2 speaker clip.** Sourced: TR, Snowflake customers, Imperfect, Stripe, Slack 2014, Newsela presenter (ContentBeta; Superside calls it an AI narrator). Inferred: Asana host (hosting sourced, on-camera inferred), GitHub, Zendesk, Snowflake Summit.
- **#3 notify.** Sourced: Duolingo push notifications, Slack "notifications that matter", GitHub reminders (as content). Secondary or inferred: TradeLens alert pop-ups, Superspace "sent for review".
- **#4 steps.** Structure is sourced in Superspace (4-step brief), GitHub (4 keys), Asana and Airtable chapters, Stripe agenda and Newsela. Slack's pillars (description only) and Clever's journey are inferred. The on-screen form is [inferred] everywhere.
- **#17 map.** Stripe's "101 more countries" is spoken; a map on screen is inferred.

**Status of the JSON below:** these blocks propose new scene types and fields (`screen`, `notify`, `steps`, `logos`, and new `clip`, `cta` and `stat` fields). None of them validate against today's schema, so do not put them in a spec yet.

### 1. `screen`: UI screenshot showcase **[assets: screenshots]** (proposal)
```json
{ "type": "screen", "say": "Set a usage alert, then activate it.",
  "src": "screens/billing.png", "frame": "browser",
  "kicker": "Billing", "caption": "Usage alerts in one click",
  "focus": [
    { "x": 0.08, "y": 0.22, "w": 0.22, "h": 0.06, "label": "Usage alert", "at": "alert", "action": "ring" },
    { "x": 0.71, "y": 0.84, "w": 0.16, "h": 0.07, "label": "Activate", "at": "activate", "action": "click" } ],
  "zoom": 1.8, "dim": 0.4 }
```
- **Fields:**
  - `src`: a PNG or JPG in `public/`, at least 1.5× the output width.
  - `frame`: `none` | `browser` | `phone` | `laptop`.
  - `focus`: 0-3 rectangles in 0-1 coordinates, each with:
    - `label`: 3 words at most.
    - `at`: the word in `say` that triggers the focus.
    - `action`: `ring` | `click` | `type` + `text` | `spotlight`.
  - `zoom`: 1.0-2.5. `dim`: 0-1.
- **Animation:**
  - The card rises (y +60 → 0, fade, 0.5 s), with an optional tilt from rotateX 8° to 0.
  - Between focuses, the card holds on a slow 1.00 → 1.04 push-in.
  - For each focus, the camera eases over 0.6 s until the rectangle fills about 45% of the width.
  - A spotlight mask dims everything outside the rectangle to `dim` (0.3 s).
  - The ring draws its stroke in 0.35 s with an accent glow, and the label chip slides in from the open side (0.25 s).
  - A click moves the cursor on a 0.5 s bezier, presses 0.92 → 1.0, and plays a 0.3 s ripple with the click SFX.
- **Timing:** 1.2 s to establish, plus 1.8-2.5 s per focus, within the 7 s cap. Each focus starts 0.1 s before its `at` word.
- **Checker:**
  - `src` exists.
  - 3 focuses or fewer.
  - Rectangles stay inside 0-1.
  - Warn when zoomed screenshot text would render below 24 px.

### 2. Speaker clips with sound **[assets: footage + speaker's release]** (proposal)
- **New `clip` fields:**
  - `sound: true`: plays the clip's own audio, ducks music to 0.08 and turns SFX off.
  - `in` / `out`: the soundbite range in seconds.
  - `speaker: { "name", "role" }`.
  - `captions: true`: 2-line cues from the aligned transcript, 2-4 s each, with one accent word.
  - `tail`: seconds of L-cut audio carried under the next scene.
- **`say`:** the verbatim soundbite, used for alignment and by the checker.
- **Animation:**
  - The lower third masks up in 0.3 s, holds 3.5 s and exits in 0.25 s, only on each speaker's first appearance.
  - Caption cues rise in 6-8 frames.
  - An optional 1.00 → 1.05 push-in runs over the bite.
- **Timing:** the scene lasts `out` − `in`. Allow up to 15 s per bite, exempt from the 7 s rule; TR's bites ran 8-13 s.
- **Rule:** never synthesize or TTS a real person's testimonial.
- **Workaround today [untested]:**
  1. Join the soundbites into one MP3.
  2. Set it as `audio.voiceover` and align it.
  3. Use muted `clip` scenes whose `trim` matches each bite.

  Sync will be approximate.

### 3. `notify`: notification / toast stack **[no assets]** (proposal)
```json
{ "type": "notify", "say": "Your team hears the moment a container is discharged.", "device": "phone", "mode": "stack",
  "items": [ { "app": "[BRAND]", "title": "[EVENT NAME]", "body": "[PLACE] · [TIME]", "icon": "[1]" } ], "keep": 1 }
```
- **Fields:** 1-4 items; `device`: `phone` | `desktop` | `none`; `mode`: `stack` | `triage`.
- **Stack mode:**
  - Each toast drops from the top: y −40 → 0 on a spring with 4% overshoot or less, 0.35 s.
  - Older toasts move down 12 px, scale to 0.96 and fade to 85% opacity.
  - A ping SFX plays for each toast.
- **Triage mode:** 6-10 ghost badges appear in 0.4 s. Then all but `keep` shrink away (0.4 s), and the kept one pulses an accent ring ("only the notifications that matter").
- **Timing:** 1.0 s plus 0.7 s per item, or each item lands on its spoken title.

### 4. `steps` + chapter rail **[no assets]** (proposal)
```json
{ "type": "steps", "say": "Pick a type, fill the form, get an AI overview, and it's sent for review.",
  "title": "Brief in four steps", "items": ["Pick type", "Fill form", "AI overview", "Sent for review"],
  "layout": "row", "done": 4 }
```
- **Fields:**
  - `items`: 2-6 items of 3 words or fewer.
  - `layout`: `row` | `column` | `path`. `path` draws a route line with a travelling dot (Clever-style, [inferred]).
  - `done`: how many steps get checks.
- **Animation:** the connector draws in 0.25 s per segment. Each node pops 0.8 → 1 on its spoken word, then its check draws in 0.2 s.
- **Chapter rail:** add video-level `chapters: ["Payments","Revenue","Connect","?"]` and per-scene `chapter: n`. This draws a thin labelled rail: top-left on landscape, below the top safe zone on reels. The active segment fills with the accent over its chapter.
- **Today:** use `title` with the kicker "02 / 04" as the chapter divider.

### 5. CTA arrow + offer **[no assets; store badges need the official files]** (proposal)
- **New `cta` fields:**
  - `arrow`: `left` | `right` | `up` | `down`.
  - `offer`: a pill above the button, e.g. "[VERIFIED OFFER]".
  - `badges`: official store-badge files supplied by the user.
- **Animation:**
  - The arrow draws its stroke toward the button (0.5 s), then nudges 8 px every 0.8 s, for two loops at most.
  - The offer pill pops (0.3 s), then pulses 1.0 → 1.04 once per second.
- **Checker:** `offer` is a price claim, so it must come from the user.

### 6. Device frames **[no extra assets]** (proposal)
- **Field:** `frame`: `phone` | `browser` | `laptop` | `tablet`, available on `screen`, `image` and `clip`.
- **Drawing:** generic vector frames, with no trademarked device silhouettes. The browser bar shows three dots and a URL pill filled from `brand.handle`.
- **Animation:** the phone enters with rotateY 15° → 0 (0.6 s) and one specular sweep (0.8 s), after PointCard's card float [inferred].

### 7. `logos`: integrations hub / logo wall / co-brand **[assets: logos, with a text fallback]** (proposal)
```json
{ "type": "logos", "say": "It works with Slack, Jira, Asana and more.", "title": "Works with your *tools*", "layout": "hub",
  "center": "logos/brand.svg", "items": [ { "src": "logos/slack.svg", "name": "Slack" }, { "name": "Jira" }, { "name": "Asana" } ], "more": "+ more" }
```
- **Fields:**
  - `layout`: `hub` | `wall` | `pair`. `pair` is the "A × B" co-brand end card.
  - 3-12 items. An item without `src` renders as a text chip, so the scene works with no files.
- **Hub:**
  - The centre scales in (0.4 s).
  - Satellites pop onto a ring, either one per spoken name or with a 120 ms stagger. Superspace's VO named about one tool per 1.1 s.
  - Connectors draw in 0.3 s each, then one pulse dot travels each line.
- **Wall:** a grid with a 60 ms stagger.
- **Pair:** logo A, then "×", then logo B, 0.3 s apart.
- **Timing:** 3-6 s. The kit never fetches logos; the user supplies files they have the rights to.

### 8. Delta stat (extends `stat`) **[no assets]** (proposal)
- **New fields:** `from` (e.g. "59%"), `fromLabel` ("Before"), `toLabel` ("Overnight").
- **Animation:**
  1. The from-value holds for 0.8 s.
  2. A strike draws in 0.3 s, reusing `hook`'s strike.
  3. The number counts up to `value` in 0.8 s, and the meter grows between the two fractions.
- **Non-numeric pairs** ("several days" → "seconds") cross-fade under the strike.
- **Evidence:** Stripe 59% → 97%; Auckland days → seconds.

### 9. `stats`: KPI dashboard **[no assets]** (proposal)
- **Fields:** 2-4 items `{ value, label, trend? }` plus `highlight`.
- **Layout:** 2×2 on reels, one row on landscape.
- **Animation:** the tiles rise with a 0.25 s stagger and the numbers count up in 0.8 s. The highlighted tile pulses its accent once, and the trend arrow draws in.
- **Evidence:** Asana's Completed / Incomplete / Overdue / Total counters; Stripe's run of stats.
- **Today:** `bars`, or at most 2 consecutive `stat` scenes.

### 10-17: shorter specs (proposals)
- **10. `montage` [assets].**
  - 3-12 items `{ src, caption? }` with `per: "beat"` (or seconds). Cuts snap to the music beats.
  - Shots without captions may run 0.5-1 s; captioned shots keep the 1.3 s minimum.
  - Evidence: Figma's roughly 1 shot per second; Snowflake Summit's "fast-paced" description.
- **11. `chaos`.**
  - 4-12 word chips scatter with ±12° rotation and jitter for 1.5-2 s. On its spoken word they spring into a single card labelled `into` (0.6 s).
  - In `mode: "signal"`, 100+ dots pulse, then all dim to 20% except one that turns accent with a ring. This is the TradeLens pattern, from a secondary source.
- **12. Icon set.** Let `grid` accept `"icon": "i:bell"` from a bundled open-licence line-icon set (for example Lucide, ISC licence), so B2B grids are not limited to emoji.
- **13. `flow`.**
  - 2-6 nodes `{ label, icon }`; `layout`: `chain` | `hub` | `branch`.
  - Nodes pop in sequence, dashed edges draw in 0.3 s, a pulse dot travels the path, and the last node gets a check.
  - Evidence: Stripe Workflows; TradeLens' data path (secondary).
- **14. Terminal look.**
  - `prompt` with `look: "terminal"`: monospace, a `$` prompt, the command typed out, up to 4 streamed output lines, and a green success line.
  - Evidence: Stripe's CLI demo.
- **15. `price`.**
  - Plan, price, period, an optional `was` (struck through), up to 4 features with checks, and a badge.
  - Weak evidence: only PointCard's pricing message.
- **16. Split screen.**
  - Two `screen`/`chat` panes with a shared timer chip.
  - Evidence: Stripe's two-party Cursor → Vercel invoice demo. The split-screen framing is [inferred].
- **17. Map reach.**
  - Pins plus a counter.
  - Evidence: only the spoken "101 more countries" in Stripe; any map is [inferred]. Use the Remotion maps skill outside the kit if this is ever needed.

**Out of scope for the kit:** live-action cinematography, crowd and stage footage, character animation (Duolingo, Bolt), true 3D and isometric illustration (TradeLens), and real people's likeness or voice.

---

## 6. Recipe skeletons

These use only existing scene types and fields:
- Fill every `[BRACKET]` from the user's verified facts.
- `say` must spell numbers as words, because the checker warns on digits in `say`.
- `brand.accent` is left out because a placeholder is not a valid hex code.
- Each `grid` `"icon": "[1]"` stands for one emoji (4 characters at most).

**Checker results.** All six specs pass `npm run check` with HTTPS placeholder images, with these exceptions:
- Recipes 1, 2, 3 and 5 give no warnings.
- Recipe 4 warns until its recording is aligned. A local `voiceover` path also needs the real file in `motion-kit/public/`.
- Recipe 6 always shows the checker's music-licence reminder and needs the real music file.

**Runtimes** are the checker's estimates with placeholder copy: 50.7, 47.6, 42.9, 27.6, 18.5 and 36.2 s. Real soundbites set Recipe 4's length.

### Recipe 1: Explainer / positioning (16:9, about 51 s; Superspace / Slack pattern)
```json
{
  "format": "landscape", "theme": "corporate", "motion": "smooth", "pace": "normal",
  "brand": { "name": "[BRAND]" },
  "scenes": [
    { "type": "kinetic", "say": "[PAIN ONE]. [PAIN TWO]. [PAIN THREE].",
      "lines": ["[PAIN ONE].", "[PAIN TWO].", "[*PAIN THREE*]."] },
    { "type": "title", "say": "That's why we built [PRODUCT], the [CATEGORY] for [AUDIENCE], so you can [ONE-LINE PROMISE].",
      "kicker": "Meet [PRODUCT]", "headline": "The *[CATEGORY]* for [AUDIENCE]", "sub": "[ONE-LINE PROMISE]" },
    { "type": "list", "say": "All in one place, you can [BENEFIT ONE], [BENEFIT TWO], and [BENEFIT THREE].",
      "title": "All in *one place*", "items": ["[BENEFIT ONE]", "[BENEFIT TWO]", "[BENEFIT THREE]"], "style": "checks" },
    { "type": "prompt", "say": "[FEATURE ONE]: [WHAT THE USER DOES, FOUR WORDS], and [RESULT, FOUR WORDS] comes back in seconds.",
      "label": "[FEATURE ONE]", "prompt": "[WHAT THE USER TYPES OR PICKS]", "button": "[BUTTON]", "result": "[RESULT LINE]", "resultKind": "text" },
    { "type": "image", "say": "[FEATURE TWO] keeps [THING THE USER CARES ABOUT] [OUTCOME, FOUR TO SIX WORDS], always where you need it.",
      "src": "images/feature-two.png", "fit": "contain", "move": "in", "kicker": "[FEATURE TWO]", "caption": "[WHAT IT DOES, MAX 8 WORDS]" },
    { "type": "grid", "say": "It works with your tools, like [TOOL ONE], [TOOL TWO], [TOOL THREE] and more.",
      "title": "Works with your *tools*",
      "items": [ { "icon": "[1]", "label": "[TOOL ONE]" }, { "icon": "[2]", "label": "[TOOL TWO]" },
                 { "icon": "[3]", "label": "[TOOL THREE]" }, { "icon": "[4]", "label": "And more" } ] },
    { "type": "compare", "say": "Unlike generic [OLD CATEGORY], [PRODUCT] is built specifically for [JOB TO BE DONE, TWO TO FOUR WORDS].",
      "title": "Built for *[JOB]*",
      "left": { "label": "Generic [OLD CATEGORY]", "items": ["[OLD LIMIT ONE]", "[OLD LIMIT TWO]"] },
      "right": { "label": "[PRODUCT]", "items": ["[NEW STRENGTH ONE]", "[NEW STRENGTH TWO]"] } },
    { "type": "stat", "say": "[VERIFIED NUMBER, SPELLED OUT] [UNIT] [PROOF LABEL, FIVE TO EIGHT WORDS, FROM THE USER'S OWN DATA].",
      "kicker": "[PROOF KICKER]", "value": "[NUMBER]", "label": "[PROOF *LABEL*]" },
    { "type": "cta", "say": "See it for yourself at [URL, AS SPOKEN].", "action": "Try [PRODUCT]", "style": "link", "handle": "[URL]" },
    { "type": "logo", "name": "[BRAND]", "tagline": "[TAGLINE]" }
  ]
}
```
For a reel cut, keep scenes 1, 2, 3, 8 and 9 and set `"format": "reel"`. If there are no screenshots, replace scene 5 with `chat`.

### Recipe 2: Single-feature demo, series template (16:9, about 48 s; TradeLens / Airtable pattern)
```json
{
  "format": "landscape", "theme": "clean", "motion": "smooth", "pace": "normal",
  "brand": { "name": "[BRAND]" },
  "scenes": [
    { "type": "stat", "say": "[BIG NUMBER, SPELLED OUT] [EVENTS] happen every day.",
      "kicker": "[NOISE LABEL]", "value": "[BIG NUM]", "label": "[EVENTS] every *day*" },
    { "type": "list", "say": "Finding the one that matters? [PAIN ONE]. [PAIN TWO]. [PAIN THREE].",
      "title": "Finding the *one* that matters?", "items": ["[PAIN ONE]", "[PAIN TWO]", "[PAIN THREE]"], "style": "crosses" },
    { "type": "title", "say": "Meet [FEATURE NAME] in [PRODUCT]. [ONE-LINE PROMISE, SIX TO NINE WORDS].",
      "kicker": "New in [PRODUCT]", "headline": "Meet *[FEATURE NAME]*", "sub": "[ONE-LINE PROMISE]" },
    { "type": "list", "say": "Pick what matters to you: [ITEM ONE], [ITEM TWO] or [ITEM THREE].",
      "title": "Pick what *matters*", "items": ["[ITEM ONE]", "[ITEM TWO]", "[ITEM THREE]"], "style": "checks" },
    { "type": "prompt", "say": "Set a rule once, and [PRODUCT] tells your team the moment [THE EVENT, FOUR TO SIX WORDS] happens.",
      "label": "[FEATURE NAME]", "prompt": "[THE RULE THE USER SETS]", "button": "Save rule", "result": "[THE ALERT THAT ARRIVES]", "resultKind": "text" },
    { "type": "grid", "say": "Get it wherever you work: [CHANNEL ONE], [CHANNEL TWO], [CHANNEL THREE] or [CHANNEL FOUR].",
      "title": "Wherever you *work*",
      "items": [ { "icon": "[1]", "label": "[CHANNEL ONE]" }, { "icon": "[2]", "label": "[CHANNEL TWO]" },
                 { "icon": "[3]", "label": "[CHANNEL THREE]" }, { "icon": "[4]", "label": "[CHANNEL FOUR]" } ] },
    { "type": "kinetic", "bg": "accent", "say": "[VERIFIED TRUST CLAIM, SIX TO NINE WORDS, E.G. WHERE THE DATA COMES FROM].",
      "lines": ["[TRUST CLAIM PART ONE]", "[*PART TWO*]."] },
    { "type": "list", "say": "[BENEFIT ONE, THREE WORDS]. [BENEFIT TWO, THREE WORDS]. [BENEFIT THREE, THREE WORDS].",
      "style": "lines", "items": ["[BENEFIT ONE].", "[BENEFIT TWO].", "[BENEFIT THREE]."] },
    { "type": "cta", "say": "Turn on [FEATURE NAME] in [WHERE TO FIND IT] today.",
      "action": "Turn it on", "style": "link", "sub": "[WHERE TO FIND IT]", "handle": "[URL]" },
    { "type": "logo", "name": "[PRODUCT]", "tagline": "[TAGLINE]" }
  ]
}
```
For a series, keep the skeleton and swap scenes 3-6 for each feature. TradeLens ran six feature videos of similar length; whether they shared a template is unverified.

### Recipe 3: How-to / onboarding, one task (16:9, about 43 s; Newsela / Asana pattern)
```json
{
  "format": "landscape", "theme": "clean", "motion": "calm", "pace": "relaxed",
  "brand": { "name": "[BRAND]" },
  "scenes": [
    { "type": "title", "say": "How to [TASK] in [PRODUCT].", "kicker": "How to [PRODUCT]", "headline": "[*TASK*]" },
    { "type": "kinetic", "say": "[WHO] keep running into [PROBLEM, FOUR TO SIX WORDS]. Here's the fix.",
      "lines": ["[PROBLEM]?", "Here's the *fix*."] },
    { "type": "grid", "say": "First, what is [TERM]? It's [PLAIN DEFINITION, EIGHT TO TWELVE WORDS].",
      "title": "What is *[TERM]*?",
      "items": [ { "icon": "[1]", "label": "[ASPECT ONE]" }, { "icon": "[2]", "label": "[ASPECT TWO]" }, { "icon": "[3]", "label": "[ASPECT THREE]" } ] },
    { "type": "list", "say": "It takes three steps: [STEP ONE], [STEP TWO], and [STEP THREE].",
      "title": "Three *steps*", "items": ["[STEP ONE]", "[STEP TWO]", "[STEP THREE]"], "style": "numbers" },
    { "type": "image", "say": "Step one. [STEP ONE INSTRUCTION, EIGHT TO TWELVE WORDS, NAMING THE EXACT UI LABEL].",
      "src": "images/step-one.png", "fit": "contain", "move": "in", "kicker": "Step 1", "caption": "[STEP ONE, MAX 8 WORDS]" },
    { "type": "prompt", "say": "Step two. In [FIELD NAME], choose [VALUE THE USER ENTERS], then click [BUTTON] to confirm.",
      "label": "[FIELD NAME]", "prompt": "[VALUE THE USER ENTERS]", "button": "[BUTTON]", "result": "[CONFIRMATION TEXT]", "resultKind": "text" },
    { "type": "image", "say": "Step three. [STEP THREE INSTRUCTION, EIGHT TO TWELVE WORDS, NAMING THE EXACT UI LABEL].",
      "src": "images/step-three.png", "fit": "contain", "move": "in", "kicker": "Step 3", "caption": "[STEP THREE, MAX 8 WORDS]" },
    { "type": "list", "say": "Two tips: [TIP ONE, FOUR WORDS], and [TIP TWO, FOUR WORDS].",
      "title": "*Tips*", "items": ["[TIP ONE]", "[TIP TWO]"], "style": "checks" },
    { "type": "cta", "say": "Find more how-tos in the [HELP CENTER NAME].", "action": "More how-tos", "style": "link", "handle": "[HELP CENTER URL]" },
    { "type": "logo", "name": "[PRODUCT]" }
  ]
}
```
Leave out the concept scene (scene 3) when the task has no jargon. Name UI labels exactly as they appear in the product.

### Recipe 4: Customer story cutdown (16:9, about 30-40 s with real soundbites; Thomson Reuters / Luminate pattern)
```json
{
  "format": "landscape", "theme": "studio-dark", "motion": "calm", "pace": "relaxed",
  "brand": { "name": "[BRAND]" },
  "audio": { "voiceover": "voice/[customer-soundbites].mp3" },
  "scenes": [
    { "type": "quote", "say": "[SOUNDBITE ONE, VERBATIM, UNDER TEN WORDS]",
      "quote": "[SOUNDBITE ONE, *VERBATIM*]", "author": "[CUSTOMER NAME]", "role": "[TITLE], [COMPANY]" },
    { "type": "kinetic", "say": "[SOUNDBITE ONE CONTINUED, VERBATIM, EIGHT TO TWELVE WORDS]",
      "lines": ["[KEY PHRASE FROM IT]", "[*PAYOFF WORDS*]."] },
    { "type": "compare", "say": "[SOUNDBITE TWO, VERBATIM: HOW IT WAS BEFORE AND HOW IT IS NOW, FIFTEEN TO TWENTY FIVE WORDS]",
      "title": "*Before and after*",
      "left": { "label": "Before", "items": ["[OLD PAIN, THEIR WORDS]"] },
      "right": { "label": "With [PRODUCT]", "items": ["[NEW STATE, THEIR WORDS]"] } },
    { "type": "stat", "say": "[SOUNDBITE WITH THE RESULT NUMBER, VERBATIM, EIGHT TO TWELVE WORDS]",
      "kicker": "[RESULT LABEL]", "value": "[NUMBER]", "label": "[WHAT IT *MEASURES*]" },
    { "type": "quote", "say": "[SOUNDBITE THREE, VERBATIM: THE VISION LINE, TWELVE TO TWENTY WORDS]",
      "quote": "[SOUNDBITE THREE, *VERBATIM*]", "author": "[CUSTOMER NAME]", "role": "[TITLE], [COMPANY]" },
    { "type": "logo", "name": "[BRAND]", "tagline": "[COMPANY] × [PRODUCT]" }
  ]
}
```
- **Voice:** the voice-over is the customer's own recording, with the soundbites joined in this order.
  - Run `npm run voice -- specs/x.json --align voice/x.mp3` before `check`.
  - `say` must match the recording word for word.
- **Never TTS** a customer's words. If there is no recording, delete every `say` and the `audio` block. The video then becomes caption-first and runs at reading pace.
- **Stat:** remove the `stat` scene unless the customer says the number in the recording.

### Recipe 5: Performance social ad (9:16, about 18 s; PointCard pattern)
```json
{
  "format": "reel", "theme": "pop", "motion": "snappy", "pace": "fast",
  "brand": { "name": "[BRAND]", "handle": "[@HANDLE]" }, "progressBar": true,
  "scenes": [
    { "type": "hook", "say": "[OBJECTION]? Nope. [FLIP].", "setup": "[OBJECTION]?", "strike": "[ASSUMPTION]", "punch": "Nope. *[FLIP]*." },
    { "type": "list", "say": "[PERK ONE, THREE WORDS]. [PERK TWO, THREE WORDS]. [PERK THREE, THREE WORDS].",
      "items": ["[PERK ONE]", "[PERK TWO]", "[PERK THREE]"], "style": "checks" },
    { "type": "image", "say": "And you see every [UNIT OF VALUE] add up, right in the app.",
      "src": "images/app-screen.png", "fit": "contain", "move": "in", "caption": "[KEY NUMBER ON SCREEN]" },
    { "type": "kinetic", "say": "[PAYOFF QUESTION]? Yes.", "lines": ["[PAYOFF QUESTION]?", "*Yes.*"] },
    { "type": "cta", "say": "[VERIFIED OFFER, AS SPOKEN]. Get the app.",
      "kicker": "[VERIFIED OFFER]", "action": "Get the app", "style": "button", "handle": "[URL]" }
  ]
}
```
- **A/B:** duplicate the spec and change only scene 1.
- **Colour test:** change `brand.accent` and keep everything else.
- **Sound-off:** scenes 1, 2, 4 and 5 show their spoken words. Scene 3's narration is not on screen, so make its caption carry the point.

### Recipe 6: Launch / event recap (16:9, about 36 s; Figma / Airtable / Stripe pattern)
```json
{
  "format": "landscape", "theme": "studio-dark", "motion": "snappy", "pace": "fast", "transition": "whip",
  "brand": { "name": "[BRAND]" },
  "audio": { "music": "music/[licensed-track].mp3" },
  "scenes": [
    { "type": "kinetic", "say": "Did you catch them all?", "lines": ["Did you catch", "*them all?*"] },
    { "type": "title", "say": "[LAUNCH ONE]. [WHAT IT DOES, SIX TO EIGHT WORDS].",
      "kicker": "[EVENT] · 01", "headline": "[*LAUNCH ONE*]", "sub": "[ONE-LINE WHAT IT DOES]" },
    { "type": "prompt", "say": "[THE DEMO MOMENT IN ONE SENTENCE, TEN TO FOURTEEN WORDS].",
      "label": "[LAUNCH ONE]", "prompt": "[WHAT THE USER TYPES]", "button": "[BUTTON]", "result": "[WHAT APPEARS]" },
    { "type": "title", "say": "[LAUNCH TWO]. [WHAT IT DOES, SIX TO EIGHT WORDS].",
      "kicker": "[EVENT] · 02", "headline": "[*LAUNCH TWO*]", "sub": "[ONE-LINE WHAT IT DOES]" },
    { "type": "image", "say": "[WHAT THE SCREENSHOT PROVES, EIGHT TO TWELVE WORDS].",
      "src": "images/launch-two.png", "fit": "contain", "move": "in", "caption": "[LAUNCH TWO IN ACTION]" },
    { "type": "title", "bg": "accent", "say": "[LAUNCH THREE]. [WHAT IT DOES, SIX TO EIGHT WORDS].",
      "kicker": "[EVENT] · 03", "headline": "[*LAUNCH THREE*]", "sub": "[ONE-LINE WHAT IT DOES]" },
    { "type": "stat", "say": "[METRIC] went from [VERIFIED BEFORE, SPELLED OUT] to [VERIFIED AFTER, SPELLED OUT].",
      "kicker": "[METRIC]", "value": "[AFTER]", "label": "up from *[BEFORE]*" },
    { "type": "list", "say": "Everything new: [LAUNCH ONE]. [LAUNCH TWO]. [LAUNCH THREE]. [LAUNCH FOUR].",
      "title": "Everything *new*", "items": ["→ [LAUNCH ONE]", "→ [LAUNCH TWO]", "→ [LAUNCH THREE]", "→ [LAUNCH FOUR]"], "style": "lines" },
    { "type": "cta", "say": "The full list is on our blog.", "action": "See what's new", "style": "link", "handle": "[BLOG URL]" },
    { "type": "logo", "name": "[BRAND]", "tagline": "[EVENT NAME]" }
  ]
}
```
- **Music:** it must be licensed. The checker always shows a reminder when `audio.music` is set.
- **No-VO version (Figma style):** delete every `say`. The video then runs at the `fast` reading pace and is cut to the music.
- **Event promo:** change scene 1 to a `kinetic` with the date and place, and scene 9 to a `cta` button "Register now".

---

**Corrections made**

Videos and sources:
1. **Wistia caveat:** the stats measure embed plays. Only Superside-hosted embeds count blog viewers, and the Snowflake embeds use Snowflake's player colour.
2. **Duration-only list:** added that Bolt's 177 s is a probable portfolio comp, and that Airbnb's 22 s comes only from a search snippet.
3. **Length groups:**
   - Relabeled them: Figma and Airtable are not single-feature explainers, and the Slack mockumentary is not a platform tour.
   - Zendesk's 296 s is about 5 min, not "5-11 min".
   - Removed the unsourced quote "a concise 90-second SaaS product demo".
4. **Rule 2:** the "payoff by 3 s" is the engine's rule, not an observation. The PointCard preview is a Wistia embed setting. Added that Superspace's preview loops the reveal.
5. **Rule 3:**
   - Newsela opens on a logo, not a problem, and was listed as both.
   - Duolingo's "chore" beat has no sourced position; its opener is probably the three-word question [inferred].
   - Bolt and Airbnb are both [inferred]; only TR is measured.
   - The Luminate "co-brand open" is unknown content.
   - Dropped the unsupported "only where the viewer chose to watch".
6. **Rule 5:** no breakdown observed a zoom-in, so the heading now says "highlight".
7. **Rule 6:** the caption cadence was presented as cut rate. Airtable's chapters are 9-14 s, not 10-14 s. Superspace's captions run "mostly" 2.4-3.5 s.
8. **Rule 7:** 150-170 wpm gives 150-170 words in 60 s, not 150-160.
9. **Rule 8:** Newsela's concept-before-UI order is [inferred].
10. **Rule 9:** the Imperfect 6-8 lbs figure is the iSpot TV spot; that it is the same creative is inferred.
11. **Rule 10:**
    - Engagement is not "on the blog" for Snowflake.
    - Added that non-testimonial embeds score higher (Zendesk 58%, Imperfect 53%, Superspace 46.9%), so these numbers don't support the rule.
    - Changed "100% customer voice" to "every spoken line".
12. **Rule 11:** Airbnb "music only" is [inferred]. TR has a closed-caption track; "fully captioned" overstated it.
13. **Rule 12:**
    - Clever's "chimes" changed to sourced "audio cues".
    - Zendesk's "move and bounce" describes the brand system, not the film.
    - The 15 fps film is Config's opening keynote film, not the recap.
14. **Rule 13:**
    - The Slack and TradeLens CTAs are YouTube description copy.
    - TradeLens moved to Consideration, matching the CTA table.
    - The "silent logo tail" means no speech; the logo is inferred.
15. **Rule 14:**
    - Removed the unsourced "article recommends a quarterly refresh".
    - TradeLens' shared template is unverified.
    - Removed "first half only" for Imperfect.
    - Asana's 38 is the Class Central title count.
16. **Rule 15:** Stripe recaps Payments, Revenue and Connect, not every chapter. Slack's 6 pillars as structure is [inferred].
17. **Video types:**
    - Removed the unsourced "homepage hero", the "launch videos that also serve as PR tools" quote and "Show, don't tell".
    - Softened "fewer tickets" and "lives on product pages".
    - Airtable's last chapter is 45-58 s, so the vision/CTA split is inferred.
    - Superspace is about 2 min, not 2-3.
    - Airbnb is "probably" unofficial.
    - PointCard's beats and the event recap are templates or inferred.
    - Figma's arrow list is description copy.
    - The platform-length disclaimer is narrowed.
18. **Table in section 3:**
    - Fixed Clever, TradeLens, Imperfect, Bolt, PointCard, Slack WiS, Airtable, Figma, Airbnb, Newsela, Stripe, Snowflake Summit, Snowflake customers, Slack 2014, Zendesk and GitHub as above.
    - Changed GitHub's "title, thumbnail and chapters" to "the title promises the 4 keys".
    - "Download for free" (17 characters) breaks the 16-character button rule, so it moved to the kicker.
19. **CTA table:** removed the invented "See you at Summit 26" row.

Engine gaps:

20. **Scores:**
    - #2 F 8.5 → 8 (Asana on-camera hosting is inferred), score 12.0.
    - #4 F 7.5 → 7 (Slack pillars as structure is inferred), score 7.0.
    - #17 F 1 → 0.5 (the map is inferred), score 0.2.
    - The ranks are unchanged.
21. **Proposal JSON:** labeled `screen`, `notify`, `steps`, `logos` and the new fields as proposals that fail today's schema. Replaced the invented notify data ("Rotterdam · 09:42") and the "$100 off" example with placeholders.

Engine and recipes:

22. **Rule 11 engine note:** `say` and on-screen text are separate fields, not "the same words".
23. **Recipe 5's sound-off claim** was false for scene 3.
24. **Recipe JSON:** all six use only the allowed types and fields. I ran them through the motion-kit checker (`npm run check`) with HTTPS placeholder images. Recipe 6 always gets the music-licence warning, so "all pass with no warnings" was false. Recipe 4 needs its alignment. The other runtimes were confirmed. Test specs: `scratch/recipes/r1.json` through `r6.json`.
25. **Recipe 2 note:** removed "as TradeLens did with one template".
26. **Engine claims** checked against the repo and confirmed: the 60/180 s limits, the 3 s payoff check, normal pace at 3 wps, the 16-character button warning, the 1.3-7 s scene range, the 35-50 s launch norm, and the `bg`, `transition`, `pace`, `motion` and `style` values.