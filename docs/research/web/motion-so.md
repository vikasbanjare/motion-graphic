# motion.so / "Made with Motion": catalogue and pattern notes

Researched 2026-10-08. Source page: https://motion.so/made-with-motion

## 0. What this site actually is (read this first)

- **It is not a studio-credit inspiration gallery** like Motionographer, Behance or Dribbble. motion.so is the marketing site of **Motion, an AI "video agent for tasteful motion design" built by Mosaic (Mosaic AI Labs, YC W25)**. Page meta says `creator: Mosaic`, `category: video editing`.
- "Made with Motion" is a **vendor-curated showcase of 8 videos generated with Motion's own AI tool**. Each project page has the **prompt**, a **4-step workflow**, and a **"Why it works"** note. There are **no studio or animator credits** (the "creator" of every item is Motion/Mosaic, the client, or the Motion Studio team), **no tag taxonomy** beyond one category label per card, and **no mention of After Effects, Cinema 4D, Rive, Blender or Spline** as production tools. Everything is said to be rendered inside Motion. The only After Effects mention is in a comparison guide.
- Related surfaces I also mined: `/studio` (a done-for-you launch-film service run by Motion's team, with a client logo wall and "Launches that moved" case cards), `/community` (user videos with remixable prompts), the homepage prompt carousel, a `/share/...` session page, `/templates`, `/learn/*` guides, and the API docs (which list 21 brand "design system" presets).
- So for SaaS launch-film reference the examples are useful (they are literally SaaS and startup launch films), but **the descriptive text is marketing copy about prompts and structure, not craft breakdowns.**

### What was and was not readable

| Surface | Status |
|---|---|
| `motion.so/made-with-motion` index | **Read in full** via TinyFish fetch (1 call). It gave 8 cards, categories, one-line descriptions and slugs. No video URLs were in the extracted text or links. |
| 8 project pages | **Not fetched directly.** The 2nd TinyFish call failed with "MCP server needs re-auth". WebFetch fails DNS for motion.so, motion.mosaic.so and r.jina.ai, web.archive.org is refused, and curl gets a proxy 403. Prompt, workflow and why-it-works text was recovered **for 3 pages (Motion Launch, Motion GA, Naval interview) from search-engine snippets**. For the other 5, only the index one-liner plus off-site context (YC posts, studio page) is available. |
| Direct video files (mp4, vimeo, youtube) | **None exposed** in anything readable. Videos are presumably embedded players on the project pages. The best downloadable sources are the **X/Twitter posts** listed below, which can be pulled with `yt-dlp`, plus the project pages themselves. |
| Durations | **Not stated** on any example. The only figures are the homepage sample brief ("30s", 16:9) and its storyboard timings (product reveal 0:14 to 0:24, logo lockup 0:24 to 0:30). |
| `/studio`, `/community`, homepage, `/share`, `/learn`, docs | **Snippets only**, through WebSearch. |

TinyFish budget used: 2 of 20 calls (1 succeeded, then auth expired). WebSearch was used for everything else.

---

## 1. Catalogue

Legend: **[G]** = official Made-with-Motion gallery item · **[S]** = Motion Studio case or logo wall · **[H]** = homepage prompt example · **[C]** = community or share page · **[X]** = social-post launch film

### A. Made-with-Motion gallery (all 8 items on the page)

#### 1. Motion General Availability Launch Video [G]
- **Brand/product:** Motion (Mosaic). SaaS AI video agent.
- **Creator:** Mosaic / Motion team, "made entirely with Motion". The studio page also lists it as a studio portfolio piece.
- **Category:** Launch video
- **Page:** https://motion.so/made-with-motion/motion-ga-launch-video
- **Video:** no direct file exposed. Likely the same film as the GA X post by founder Adish Jain: https://x.com/_adishj/status/2062203755718930550 ("we're launching Motion, the frontier agent for tasteful motion design. this launch video is made entirely with Motion… now generally available"). LinkedIn GA post: https://www.linkedin.com/posts/mosaic-so_motion-is-now-generally-available-repost-activity-7467975858566311936-d19P
- **Duration:** not stated
- **Prompt (verbatim from snippet):** "Create a premium launch video for Motion's general availability. Make the agent feel fast, tasteful, and credible for founders, marketers, and creative teams."
- **Why it works (page):** the video is the primary asset, with a clear title and supporting context. The story **introduces the product category before showing the output**. One film serves search, social and founder-led distribution.
- **Workflow (page):** 1) Define the GA launch message and audience. 2) Use Motion to plan the story, visual language and pacing. 3) Render the launch cut and **refine the opening hook**. 4) Publish it as the primary asset for launch-day channels.

#### 2. Motion Launch Video [G]
- **Brand/product:** Motion (Mosaic)
- **Creator:** Mosaic / Motion. The page is dated about 2026-06-19.
- **Category:** Launch video
- **Page:** https://motion.so/made-with-motion/motion-launch-video
- **Video:** no direct file. Probably the original April 2026 launch film posted at https://x.com/mosaic_so/status/2041927342201958616 and https://x.com/_adishj/status/2041918607454826735 (the latter is a thread with "how it works + examples"). LinkedIn: https://www.linkedin.com/posts/mosaic-so_introducing-motion-a-video-agent-built-by-activity-7447700362804772864-mcWJ
- **Duration:** not stated
- **Description:** "a hero launch video with product positioning, **kinetic typography**, and a direct reveal of what Motion makes possible."
- **Prompt (verbatim):** "Create a cinematic launch video for Motion, the Frontier AI for Motion Design. Make it feel premium, product-led, and fast enough for a launch page and Product Hunt."
- **Why it works (page):** the opening **establishes the category before asking the viewer to care**. The narrative is **visual, not a presenter on camera or generic filler footage**. The closing beat **commits to one specific promise** that other launch channels can reuse.
- **Workflow (page):** start with the category and a one-line promise. Add product positioning, the desired emotional tone and the launch CTA. Generate the hero cut for the site. Create shorter social cutdowns.

#### 3. Article to Video Demo [G]
- **Brand/product:** Motion (an article-to-video feature demo)
- **Category:** Article to video
- **Page:** https://motion.so/made-with-motion/article-to-video-demo
- **Video / duration:** not exposed / not stated
- **Description:** "turns a written article into a concise, designed video for social and launch distribution." The solution page frames it as repurposing blogs, newsletters and announcements "without losing the core idea." No page-specific prompt was recovered.

#### 4. Interview Motion Graphics Example (Naval) [G]
- **Brand/product:** Motion. The source footage is a Naval Ravikant talking-head interview.
- **Category:** Motion graphics (documentary overlay)
- **Page:** https://motion.so/made-with-motion/naval-interview-motion-graphics
- **Video / duration:** not exposed / not stated
- **Prompt (verbatim):** "Add documentary-style motion graphics to this interview" with instructions to **pull out the core idea, keep the framing editorial, and keep the motion crisp**.
- **Why it works:** "the prompt explains the transformation from raw source material to designed video."
- **Workflow:** 1) Start with source footage or a public clip. 2) Name the editorial style and the takeaway the viewer should remember. 3) Ask Motion to add motion graphics, pacing and framing. 4) Refine the highlight beats for the target channel.

#### 5. Documentary Explainer Demo [G]
- **Brand/product:** Motion
- **Category:** Explainer (Vox-style)
- **Page:** https://motion.so/made-with-motion/documentary-explainer-demo
- **Video / duration:** not exposed / not stated
- **Description:** "A Vox-style documentary explainer made with Motion to show how a dense business idea can become a short, structured video." The related homepage prompt is "Vox-style documentary explainer: why builders need a qualifying questionnaire." (It is not confirmed that this is the same video.)

#### 6. Ornadyne O1 Launch Video [G][S]
- **Brand/product:** Ornadyne (YC P26). O1 is a flapping-wing "robot bird" reconnaissance drone. This is deep tech, not SaaS.
- **Creator:** Motion Studio (done-for-you service). The studio card reads "Ornadyne · YC P26", and the video was posted on LinkedIn and X.
- **Category:** Startup launch
- **Page:** https://motion.so/made-with-motion/ornadyne-o1-launch
- **Video:** not exposed on readable text. Launch posts that likely carry the film: YC on X https://x.com/ycombinator/status/2051700953112584550 (2026-05-05), the YC launch page https://www.ycombinator.com/launches/QAr-ornadyne-robot-birds-for-reconnaissance, and https://x.com/AtomsNotBits/status/2051701771454894228 (unverified whether the embedded clip is the Motion cut).
- **Description:** "frames a product announcement as a clear story instead of a static launch post."

#### 7. Memoir Product Demo [G]
- **Brand/product:** Memoir (@trymemoir_ai, YC). An "autonomous marketing system for software companies" that turns code into demo videos and social posts. This is SaaS.
- **Category:** Product demo
- **Page:** https://motion.so/made-with-motion/memoir-product-demo
- **Video:** not exposed. A possible match is the YC launch post https://x.com/ycombinator/status/2061526376763777441 (2026-06-01, unverified that it contains the Motion video).
- **Description:** "explains an AI growth workflow through **designed UI moments** and **clear benefit beats**."

#### 8. Paces Agent Product Video [G][S]
- **Brand/product:** Paces (YC S22). Paces Agent is an agentic AI for clean-energy and power-infrastructure development (siting, due diligence, interconnection, permits). This is B2B SaaS.
- **Creator:** Paces appears on the Motion Studio logo wall, so the film is probably a studio job.
- **Category:** Agent product video
- **Page:** https://motion.so/made-with-motion/paces-agent-product-video
- **Video / duration:** not exposed / not stated. No official Paces X or LinkedIn video was found. Product context is at https://www.paces.com/products/ai
- **Description:** "A polished product video for an agentic workflow, designed to make a **technical product feel concrete and watchable**." The studio copy says the film promotes an agent that helps developers "find sites, de-risk projects, and reach construction-ready 3x faster" (a single-stat proof point).

### B. Motion Studio cases (motion.so/studio)

Studio pitch: "Launch videos for ambitious teams." It offers premium launch films for startups, "directed end-to-end by our team, inside Motion." The process runs launch date, story and references, then creative direction, a first cut, as many revision rounds as needed, and final delivery for launch day. The client owns everything. Case cards sit under "Launches that moved", with a "Views" label (no figures were readable). There is also an "Our own launch in numbers" section.

#### 9. Mosaic launch film (Mosaic, YC W25) [S]
- Page: https://motion.so/studio (card "Mosaic · our own launch · YC W25"). Video not exposed. This is the parent company's launch, so it is SaaS.

#### 10. Klaimee launch film [S]
- Brand: Klaimee (YC P26), "the insurance for your AI agents". This is SaaS/insurtech. The film was posted on LinkedIn and X.
- Page: https://motion.so/studio. Possible video post: YC on X https://x.com/ycombinator/status/2051663215139193155 (unverified that it is the Motion cut).

#### 11. Foremark Legal launch film [S]
- Brand: Foremark Legal, "an AI-native consumer law firm that screens claims for eligibility and deadlines in real time" ($6M seed). This is legal-tech SaaS.
- Page: https://motion.so/studio. Video not located. Site: https://foremarklegal.com/

#### 12-19. Studio logo wall (names only, no films readable) [S]
Midcentury, Memorable, Zomma Labs, Billow AI, GitHits, Nyx, Holtium, plus Paces and Ornadyne (above). All are on https://motion.so/studio. It is not stated whether each one has a Motion film.

### C. Homepage, share and community examples

#### 20. "Motion, the agent for motion design" 30-second sample brief [H]
- Page: https://motion.so/ (prompt carousel: "Scroll to see the prompt behind each video")
- **Prompt (verbatim):** "Make a 30-second launch video for Motion, the agent for motion design. **Bold type, dark, kinetic, with a confident voiceover.** 16:9 30s Cinematic."
- **Storyboard shown:** timed segments, including **product reveal 0:14 to 0:24** and **logo lockup 0:24 to 0:30**. Duration: **30 s** (the only stated duration on the site).

#### 21. MacBook Neo launch video prompt [H]
- Page: https://motion.so/ ("launch video for the new MacBook Neo"). This is a consumer hardware, Apple-style product launch. The rendered clip was not described in snippets. The related guide is https://motion.so/learn/apple-style-product-launch-video

#### 22. Teenage Engineering TP-7 launch video [X]
- A sample prompt in the founder's April thread asks for a launch video for a Teenage Engineering TP-7 (a hardware product film). It is in the thread at https://x.com/_adishj/status/2041918607454826735

#### 23. Motion Remix feature launch [C]
- Page: https://motion.so/share/b3de33d1-60fd-4be1-a382-291a010deb0e ("Introducing Motion Remix. Tag your previous sessions to remix & reuse the same style, pacing, and creative direction."). This is a SaaS feature launch.
- **Description (share page):** "a **high-energy female voiceover**, visuals **perfectly timed to your four scenes**, **sharp impact transitions**, and an **electronic music bed**." The share page has an Export button above the preview, so it may be downloadable when logged in.

#### 24. Motion MCP launch video [X]
- https://x.com/mosaic_so/status/2062937294093660596 says "Launch video made by prompting Motion in Claude." This is a SaaS/dev-tool feature launch.

#### 25. Motion V2 launch video [X]
- Reported through a Digg aggregator (https://digg.com/tech/ryzzji3z), which says the founder's V2 launch video was made with V2. The original post URL was not recovered.

#### 26-27. Community Naval remixes [C]
- https://motion.so/community. Prompts: "Here's a talking head video of Naval. Can you add really good documentary style motion graphics in the middle" and "Vox-style documentary animations added and edited to match the speech."
- Community creator handles (Apr to Jun 2026): adish-jain, klimt-crafts-38, gaudi-tiles-24 / gaudi-assembles-24 (https://motion.so/community/gaudi-assembles-24), john, aniket-jain, broca-builds-hao1uu, marzi-brightens-54, klimt-frames-9i0lns, marzi-composes-u12r3o. The snippets did not pair these handles with video titles.

#### 28. "We Launched 15 Times in 30 Days" (blog, 2026-07-05) [X]
- https://motion.so/blog. In June, Mosaic "turned shipped work into launches over and over again with Motion", which works out to roughly 15 feature-launch videos. The individual titles were not readable. This is a strong SaaS feature-launch reference set if the post can be opened in a browser.

---

## 2. Patterns from text

These are drawn only from the site's own descriptions, prompts and guides. They are not observations of the footage.

1. **Category first, then output.** Both Motion launch films say the opening "introduces the product category before showing output" or "establishes the category before asking the viewer to care." The structure runs category, then promise, then proof, then CTA.
2. **One-line promise as the spine.** Every workflow starts with "the category and the one-line promise" and ends with "one specific promise" as the closing beat.
3. **Hook and CTA get a dedicated second pass.** The GA workflow says to "refine the opening hook." The guides say to "ask for a followup pass that strengthens the first five seconds and final CTA."
4. **Visual narrative, no presenter, no stock filler.** The site calls the launch film "visual, not presenter or generic filler footage." The Apple-style guide says "no stock footage, no fake UI, no generic neon technology visuals."
5. **Kinetic typography plus a dark, bold, cinematic look** is the house style: "Bold type, dark, kinetic, with a confident voiceover", "kinetic typography", "crisp typography", "restrained typography".
6. **Apple-style mood vocabulary:** "restrained, premium, quiet confidence, crisp typography, product-led reveals", "premium product framing and a coherent reveal." No camera-move vocabulary appears (no dolly or macro). Reveals and framing stand in for camera.
7. **UI as designed moments, not screen recordings.** Product demos are built from "screenshots + a sentence". Motion "frames the UI, sequences the benefits, lands the CTA", and the site describes them as "designed UI moments and clear benefit beats." It explicitly says this is not for click-by-click walkthroughs.
8. **Three proof points and single-stat claims.** Prompts call for "audience, launch moment, three proof points, CTA". Paces uses "construction-ready 3x faster".
9. **A rigid storyboard before render,** with timed scene blocks (hook, problem, product reveal at about 0:14 to 0:24, logo lockup in the last 6 s of a 30 s cut), a colour palette and style guide, and pacing set per scene.
10. **Audio stack:** a confident or high-energy VO, an electronic music bed, and "sharp impact transitions" synced to scene cuts (the Remix launch has 4 scenes).
11. **Hero cut plus social cutdowns.** One hero film (16:9 for site, Product Hunt and X) is followed by shorter 9:16, 1:1 or 4:5 social cuts. Supported aspects are 16:9, 9:16, 1:1, 4:5 and 21:9. Duration buckets are under 10 s, 10 to 30 s, 30 s to 1 min, and 1 to 5 min. The site's teaser and explainer split is 30 s for feeds and 60 s for the website.
12. **Editorial documentary overlays** (Vox-style): pull out the core idea, keep framing editorial, keep motion crisp, and sync animations to speech. This is the "talking-head plus graphics" format.
13. **Brand-system-driven look.** The API ships 21 design-system presets (mosaic, apple, claude, cursor, linear, vercel, stripe, figma, notion, spotify, supabase, raycast, framer, resend, mintlify, sentry, tesla, nike, shopify, airbnb, posthog) or a custom DESIGN.md. The agent "reads your site, pulls real colors, type and references." A YouTube URL can serve as a pacing and structure reference ("taste and rhythm, not copying").
14. **Tools:** none of the classic tools (AE, C4D, Rive, Blender, Spline) are credited. Everything is "rendered inside Motion", which is code-generated, layer-editable motion graphics plus VO and music. The comparison guides position After Effects as manual compositing, Runway, Pika and Luma as generative clips needing assembly, HeyGen as avatar video, and developer rendering frameworks as "code every frame".

---

## 3. Top picks to analyse frame-by-frame (SaaS and product)

Ranked by relevance to SaaS launch and product motion. For each one, open the page in a browser and save the embedded video, or run `yt-dlp <X-url>` on the social post, then drop the file into the Drive folder. **Confidence notes:** links marked "page" are confirmed Motion pages. X links marked "likely" are posts that carry a launch video, but I could not confirm the embedded clip is identical to the gallery item.

| # | Example | Why analyse it | Page | Video source to download |
|---|---|---|---|---|
| 1 | Motion GA Launch Video | SaaS GA launch: category-first hook, refined opening, the hero asset | https://motion.so/made-with-motion/motion-ga-launch-video | https://x.com/_adishj/status/2062203755718930550 (likely) |
| 2 | Motion Launch Video | Kinetic typography and a product reveal, Product Hunt pacing | https://motion.so/made-with-motion/motion-launch-video | https://x.com/mosaic_so/status/2041927342201958616 (likely) |
| 3 | Memoir Product Demo | SaaS demo built from "designed UI moments plus benefit beats" | https://motion.so/made-with-motion/memoir-product-demo | page embed. Also check https://x.com/ycombinator/status/2061526376763777441 |
| 4 | Paces Agent Product Video | Agentic B2B SaaS made "concrete and watchable", single-stat proof | https://motion.so/made-with-motion/paces-agent-product-video | page embed only |
| 5 | Motion MCP launch video | Dev-tool feature launch made by prompting Motion inside Claude | https://x.com/mosaic_so/status/2062937294093660596 | same X post |
| 6 | Motion Remix launch | 4-scene feature launch: high-energy VO, impact transitions, electronic bed | https://motion.so/share/b3de33d1-60fd-4be1-a382-291a010deb0e | share-page Export button |
| 7 | Klaimee launch film | AI-agent insurtech SaaS launch by Motion Studio | https://motion.so/studio | https://x.com/ycombinator/status/2051663215139193155 (likely) |
| 8 | Ornadyne O1 launch | Startup announcement told as a story (hardware, but a strong launch-film structure) | https://motion.so/made-with-motion/ornadyne-o1-launch | https://x.com/ycombinator/status/2051700953112584550 (likely), https://www.ycombinator.com/launches/QAr-ornadyne-robot-birds-for-reconnaissance |
| 9 | Article to Video Demo | Text-to-designed-video: typography-led content repurposing | https://motion.so/made-with-motion/article-to-video-demo | page embed only |
| 10 | Homepage 30 s "Bold type, dark, kinetic" brief | The only example with explicit timings (reveal 0:14 to 0:24, lockup 0:24 to 0:30), good for a beat-map benchmark | https://motion.so/ | homepage carousel embed |

Runners-up: Documentary Explainer Demo (https://motion.so/made-with-motion/documentary-explainer-demo) and the Naval interview overlay (https://motion.so/made-with-motion/naval-interview-motion-graphics), both for editorial and Vox-style graphics. Foremark Legal (studio, no video located). The "We Launched 15 Times in 30 Days" blog post (https://motion.so/blog) is worth opening for about 15 more SaaS feature-launch clips.

## 4. Sources
- https://motion.so/made-with-motion (fetched in full)
- Project pages under https://motion.so/made-with-motion/* (snippets only)
- https://motion.so/studio · https://motion.so/community · https://motion.so/ · https://motion.so/templates · https://motion.so/blog · https://motion.so/blog/introducing-motion
- https://motion.so/learn/apple-style-product-launch-video · https://motion.so/learn/ai-product-demo-video · https://motion.so/learn/best-ai-motion-graphics-generators · https://motion.so/learn/ai-after-effects-alternatives
- https://docs.motion.so/reference/sessions · https://docs.motion.so/guides/mcp
- X posts: https://x.com/mosaic_so/status/2041927342201958616 · https://x.com/_adishj/status/2041918607454826735 · https://x.com/_adishj/status/2062203755718930550 · https://x.com/mosaic_so/status/2062937294093660596 · https://x.com/ycombinator/status/2051700953112584550 · https://x.com/ycombinator/status/2051663215139193155 · https://x.com/ycombinator/status/2061526376763777441
- Raw notes: research/web/raw/motion-so/00-index.txt
