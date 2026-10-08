# Raivcoo (raivcoo.com): motion-design inspiration catalogue

Researched 2026-10-07 using 20 TinyFish `fetch_content` calls. Direct curl and WebFetch are both blocked for raivcoo.com (egress proxy), and WebSearch finds no indexed raivcoo.com/media pages.
I could not watch any video. Everything below comes from page text, link targets and a few readable source pages.

## 1. What the site is and what could be read

| Area | Status | Detail |
|---|---|---|
| Homepage `/` | Partly readable | Hero copy only: "Browse thousands of motion graphics and video edits Inspiration…". The grid is client-rendered and infinite-scrolling, so it is not in the static extraction. The only items it exposed were three featured source links: vimeo.com/759144818, vimeo.com/800250687 and youtube.com/watch?v=JPvLbNDABnA (aflow, "[motion graphics] define."). |
| `/sitemap.xml` | Fully readable | 2,780 URLs, of which **2,773 are `/media/<uuid>` project pages**. The rest are `/`, `/about`, `/support`, `/plugins`, `/terms`, `/policy` and `/community-guidelines`. The sitemap lists no category, tag, style or studio URLs. |
| Category / tag / filter pages | **None exist as URLs** | `/about` describes "Pro Search… filter by color, category, style, software, and aspect ratio", but these are client-side filters. `/?category=SaaS` and `/?q=saas` return the plain homepage. `/search?q=saas` exists (title `"saas" – Motion Design Search`), but its results load client-side and came back empty. |
| `/media/<uuid>` project pages | Readable: **143 of 2,773 fetched** | Each page gives the title, the creator line ("By X"), the uploader ("Shared by @raivcoo", or a community user), the **source link** (usually an x.com status, sometimes YouTube, Vimeo, Behance, Instagram, TikTok, scenery.io or a studio site) and sometimes a description. The "Tools and Details" panel, which holds software, tags, colours and aspect ratio, is collapsed and client-side, so **it was never readable**. The player always shows a "0:00 / 0:01" placeholder, so **durations are not exposed**. The `<video src>` is not in the cleaned HTML, so **no direct raivcoo mp4 URL is exposed**. Every page said "No related content found" (related items are also client-side). |
| `/profile/@raivcoo` | Readable, but empty | "The official account of Raivcoo.com to share editors' and motion designers' inspirations". The upload grid is client-side and shows "0 inspirations" statically. |
| `/tools` | Readable | Raivcoo's own **After Effects** plugins: Simple Duplicate, Re-Align, Re-Tweek (in-between layers), Ditto (copy/paste beziers, expressions, layer styles), Bezzy (bezier visualiser), Shape Manager and Label Color Picker. The audience is AE-centric. |
| Source pages | 5 of 10 readable | YouTube gave titles and one duration. oddfellows.tv gave full credits. **Vimeo returned bot_blocked (4/4)** and Behance returned HTTP 403. |

**Sampling method.** The sitemap is roughly newest-first: x.com status IDs fall steadily down the list, although community uploads are interleaved. I read positions 1–58 in full, then 10-page windows around positions 145–155, 246–250, 346–356, 453–457, 696–700, 996–1006, 1296–1300 and 1946–1950, plus one page every ~50–150 positions across the archive (61, 106 … 2773). The SaaS and AI launch content is densest in the first ~1,000 positions (2025–2026 uploads). The oldest positions are mostly short technique loops and social edits.

**Important quirk.** Raivcoo often cuts **one source video into several technique-level pages**, each with its own title and the same source URL. For example, one Lovable post (x.com/Lovable/status/2074491618824978652) became "documentary university Story Intro", "Photos Slide animation", "Text typography animation", "Text Slide animation", "Vintage Map slide" and "Text and image slide documentary". The page titles therefore work as **technique labels** for the source video.

Abbreviations: **Dur.** = duration; "n/s" = not stated anywhere readable. **Tags** are *my own inference from the title words*, because Raivcoo's own tags were not readable. **Pos** = position in the sitemap (1–2773).

---

## 2. Catalogue

### A. SaaS / AI product launch films and promos

| # | Title (as on Raivcoo) | Brand / product | Studio / creator ("By") | Inferred tags | Raivcoo page | Source / video URL | Dur. | Notes |
|---|---|---|---|---|---|---|---|---|
| A1 | Contra Launch Video | Contra (freelance platform) | Skale Solutions | SaaS, launch film | https://raivcoo.com/media/66fd35ee-06cd-4045-ac71-0fdfee63c294 | https://x.com/SkaleSolutions/status/2100209834113315035 | n/s | Pos 6. Skale Solutions has 3 SaaS launches in the sample. |
| A2 | Browserbase Launch video | Browserbase (headless-browser infra) | Skale Solutions | SaaS, dev-tool, launch | https://raivcoo.com/media/c00410a6-04ef-402f-8391-9fab973afd09 | https://x.com/SkaleSolutions/status/2103797470572724311 | n/s | Pos 23 |
| A3 | AgentArcade Promo video | AgentArcade | Skale Solutions | AI, promo | https://raivcoo.com/media/7b484197-225b-4a50-b538-c9cf31905286 | https://x.com/AgentArcade (profile only, no status link) | n/s | Pos 1 (newest) |
| A4 | Sanctum Launch Video | Sanctum (crypto/Solana) | Klipz Studio | launch, fintech | https://raivcoo.com/media/685198a6-39fc-4400-9a87-c35f6c50317e | https://x.com/KlipzStudio/status/2105609022821081410 | n/s | Pos 9 |
| A5 | Introducing Claude Opus 5.5 | Anthropic Claude | Claude AI | AI model launch | https://raivcoo.com/media/e62b7552-1e34-4a4a-ac07-0b5c0af7491f | https://x.com/claudeai/status/2102435511222890900 | n/s | Pos 10 |
| A6 | Apple Pay in India launch video | Apple Pay | OWLED Media | product launch, fintech | https://raivcoo.com/media/12a0549d-1895-4107-899b-4542f51ab4c7 | https://x.com/AyushkWadhwa/status/2105230114900598885 | n/s | Pos 8. Probably a studio/spec piece, since the poster is not Apple. |
| A7 | Introducing Exa Snapshot | Exa (AI search) | ExaAILabs | AI, SaaS launch | https://raivcoo.com/media/6c0fd3c6-ce9e-406f-958d-9fc9623864e8 | https://x.com/ExaAILabs/status/2100634095395225898 | n/s | Pos 43 |
| A8 | WSO2 Agent Manager Promo | WSO2 | Astra Motion | B2B SaaS, AI agents | https://raivcoo.com/media/d200034b-4ed9-4242-95b9-cd17d38fc708 | https://x.com/hlibtrazanov/status/2100894563107844239 | n/s | Pos 41 |
| A9 | Introducing Max - Launch video | Hebbia (AI for finance) | Hebbia | AI SaaS launch | https://raivcoo.com/media/b5da0262-97b2-48fd-801f-62d05384ae0d | https://x.com/hebbia/status/2082876358397477109 | n/s | Pos 249 |
| A10 | Meet the Widget - Promo video | Mintlify (docs SaaS) | Mintlify | SaaS feature promo, UI | https://raivcoo.com/media/96b0acc3-36aa-4f3b-957b-c370ebedd836 | https://x.com/mintlify/status/2083287787135185192 | n/s | Pos 248 |
| A11 | Linear mobile app demo | Linear | Linear | SaaS, mobile UI demo | https://raivcoo.com/media/6aeb1923-3f67-47df-95f5-5cafa96e318a | https://x.com/linear/status/2082856036977803595 | n/s | Pos 250 |
| A12 | Notion Promo Ad | Notion | 1600Agency | SaaS ad | https://raivcoo.com/media/8befa3b5-2766-4926-8921-978aafa193ba | https://x.com/1600Agency/status/2072151540131840274 | n/s | Pos 350. Agency piece, possibly spec. |
| A13 | Announcing FIGMA MOTION | Figma | Figma | SaaS launch, motion tool | https://raivcoo.com/media/a483684c-dc70-47f0-a6d2-e603cea54181 | https://x.com/figma/status/2069827742800253230 | n/s | Pos 356. Part of a Figma Config cluster (A14–A16, C9). |
| A14 | Figma Weave tools - Promo animation | Figma Weave | Figma | SaaS feature promo | https://raivcoo.com/media/0d120013-a6d8-4de0-9fe1-02d138b40b57 | https://x.com/figma/status/2069822938484986249 | n/s | Pos 353 |
| A15 | Figma agent - Promo Animation | Figma | Figma | AI feature promo | https://raivcoo.com/media/89580685-fa39-4c34-82cc-54797d0dfea8 | https://x.com/figma/status/2069824816279154840 | n/s | Pos 354 |
| A16 | Figma shader effects - Promo | Figma | Figma | feature promo, shaders | https://raivcoo.com/media/7ab0033f-166e-4c9a-95bc-86872e245fce | https://x.com/figma/status/2069825997478961314 | n/s | Pos 352 |
| A17 | Google AI Studio Promo | Google AI Studio | Google | AI dev-tool promo | https://raivcoo.com/media/a3cf9a1f-0054-481a-aef8-5588203fd256 | https://x.com/GoogleAIStudio/status/2070608601652044045 | n/s | Pos 348 |
| A18 | Atrium product launch | Atrium | Bohdan Motion | SaaS launch | https://raivcoo.com/media/7b65a06f-2e90-41f7-b8f1-d1ce5841e133 | https://x.com/bohdanmotion/status/2070486614158033283 | n/s | Pos 349 |
| A19 | Firecrawl Promo animation | Firecrawl (web-scraping API) | Studio Three | dev-tool promo | https://raivcoo.com/media/3c4d096d-5dc5-496b-bbf5-399ebc013b8e | https://x.com/firecrawl/status/2057495269785358384 | n/s | Pos 453. See also "introducing firecrawl free keyless" (pos 147). |
| A20 | Introducing Speech Engine - ElevenLabs | ElevenLabs | ElevenLabs | AI audio launch | https://raivcoo.com/media/9bf5470d-bd27-406d-a8df-b96f84f2e46a | https://x.com/ElevenLabs/status/2057155693623361667 | n/s | Pos 457. See also "colorful motion" by ElevenLabs (pos 456): https://x.com/ElevenLabs/status/2057840637504885216 |
| A21 | Voice Agent Builder - Promo video | xAI ("SpaceXAI") | SpaceXAI | AI feature promo | https://raivcoo.com/media/53e08de6-c52a-449e-ba55-825e683e1806 | https://x.com/xai/status/2072342803787702422 | n/s | Pos 351 |
| A22 | Introducing X Numbers / Introducing Cashtag Patterns | X | SpaceXAI | product feature launch | https://raivcoo.com/media/31303f52-56b8-4db7-af3b-1f00f7899837 ; https://raivcoo.com/media/48ff3338-6808-485f-8a0b-e8acf93e432e | https://x.com/benjitaylor/status/2102443951898992825 ; https://x.com/X/status/2102147636702634195 | n/s | Pos 50–51. The poster benjitaylor also made "space sphere animation" (pos 346). |
| A23 | ClickUp Ai agent ad | ClickUp | Addxstudio | SaaS ad, AI agent | https://raivcoo.com/media/68a26837-9e16-4944-b7b7-f4cc2f972391 | https://x.com/Kendel4204k/status/2093623294029451525 | n/s | Pos 151 |
| A24 | Introducing Vibe Funnels | Commas | Commas | SaaS launch | https://raivcoo.com/media/f7cefcf7-af3d-4233-b612-500161e845fd | https://x.com/commas/status/2090829148147069311 | n/s | Pos 201 |
| A25 | Base44 design update - motion | Base44 (AI app builder) | Base 44 | SaaS brand/UI update | https://raivcoo.com/media/b357af7d-0889-41c3-8344-f2dc8839a62b | https://x.com/Base44/status/2057113621910475065 | n/s | Pos 451 |
| A26 | Introducing the new pen.dev… agentic canvas | pen.dev | pen.dev | AI design-tool launch | https://raivcoo.com/media/10a50b2e-e88b-479f-a7c9-78488e2bd41b | https://x.com/tomkrcha/status/2100570466692071493 | n/s | Pos 56 |
| A27 | we're launching Mercury Books | Mercury (fintech) | Mercury | SaaS/fintech launch | https://raivcoo.com/media/9f9d9a7c-b445-4b2a-8ca0-7a3251726c69 | https://x.com/immad/status/2100256806413140181 | n/s | Pos 55 |
| A28 | Medium Repost feature - Promo | Medium | Adrian (adrianinmotion) | feature promo, UI | https://raivcoo.com/media/90fbb612-140b-4a8f-bbde-45057fdbc5d0 | https://x.com/adrianinmotion/status/2081777469690875946 | n/s | Pos 246. Same creator: "articles cover intro animation" (pos 454). |
| A29 | Revolut Promo video | Revolut | Rajz | fintech app promo | https://raivcoo.com/media/0c0671a2-7bdf-4dc8-844b-a86da9fe2441 | https://x.com/rajzmtnz/status/2082513904283082935 | n/s | Pos 247. Probably a spec piece. |
| A30 | Ai UI Builder Promo animation | "VYBE" (AI UI builder) | aflow | AI SaaS promo, UI | https://raivcoo.com/media/29b8b327-29ec-4e76-b8d3-884e39d88f91 | https://www.youtube.com/watch?v=lvVsp2EkzfA | **0:15** (from YouTube player) | Pos 1298. YouTube title "[motion graphics] VYBE". aflow has 6 entries (see A31 and E-section). |
| A31 | Ai Online store Builder Promo animation | "AURA" | aflow | AI SaaS promo | https://raivcoo.com/media/fe016b60-fc6c-4d88-86c1-bd091fc52726 | https://www.youtube.com/watch?v=0pcPy8riGnI | n/s | Pos 1301. YouTube title "AURA". Also "ai schedule promo animation", https://www.youtube.com/watch?v=qsbDaLMWcFk (pos 1299). |
| A32 | ai video editing app Promo | AI video editor | Austin Bauwens | AI app promo | https://raivcoo.com/media/1f8882b5-98a2-4323-aafc-8f5f77b3e7dd | https://x.com/AustinBauwens/status/2036899438497571253 | n/s | Pos 701. Austin Bauwens is also behind the Ravie & Co. explainer (E1). |
| A33 | Smaller launches (one-line each) | hellosol.app, Incredible, Route, Midcentury, Memorable, Bondin, Frontier Traders, aixio.app, Nova Score, Swivr, Grok Bots, fomo Trader Rewards, Polsia, Cashtags app, Introducing Googlebook | anish karan · Incredible · Route · Midcentury · Advaiyt Sane · Bondin · Relate Studio · Afroz · LaunchAnything (shapelayer) · Valth · Grok Bot · fomo · Polsia · Nikita Bier · Google | launch / promo | see Appendix (pos 26, 27, 28, 29, 42, 45, 46, 47, 52, 57, 149, 152, 455, 997, 48) | x.com status links in Appendix | n/s | Useful as a volume reference for the "Introducing X" format. |

### B. UI / interface animation (product showcase, web, app)

| # | Title | Brand / product | Creator | Inferred tags | Raivcoo page | Source | Dur. | Notes |
|---|---|---|---|---|---|---|---|---|
| B1 | product dashboard showcase ui animation | n/s (dashboard) | Michael Nowak | UI animation, dashboard, SaaS | https://raivcoo.com/media/8a31f11a-76da-4a8a-bccb-53bde82fe580 | https://x.com/mnowakdesign/status/2037151928640262225 | n/s | Pos 1001. Michael Nowak has 5 UI-showcase pieces (B2). |
| B2 | product showcase ui animation (×3) / product showcase animation | n/s | Michael Nowak | UI showcase | https://raivcoo.com/media/4e158d3e-86f1-4abd-829a-a85da6a20d69 ; https://raivcoo.com/media/eef7e0eb-e63d-4843-a331-aa803122c09b ; https://raivcoo.com/media/ce6ec2b4-7479-46af-9712-1405ea8e72c1 ; https://raivcoo.com/media/ed99e9ef-b179-4605-bad0-b647afb0c401 | https://x.com/mnowakdesign/status/2038995559927927177 ; …/2040443851673133116 ; …/2043706001531318722 ; …/2034299213954289794 | n/s | Pos 1002–1005 |
| B3 | smooth app product demo animation | n/s (app) | DesignMe | app demo, UI | https://raivcoo.com/media/dfc63b7b-7da6-442c-afb9-af03f611cfaf | https://x.com/designme/status/2043736136284287284 | n/s | Pos 998 |
| B4 | Apple Music Ai Playlist Playground Showcase | Apple Music | Apple | UI feature showcase | https://raivcoo.com/media/bc2294e0-c5ee-456a-a465-caa418049bd0 | https://x.com/aaronp613/status/2044023362347741466 | n/s | Pos 1000 |
| B5 | join waitlist 3d input gradient animation | n/s | LeonMotions | UI, 3D, gradient, CTA | https://raivcoo.com/media/094f18ae-73f7-4e6b-9fe8-0b04ecc65b29 | https://x.com/LeonMotions (profile only) | n/s | Pos 1949 |
| B6 | sanctumso crypto currency trading website animation / crypto currency trading website intro animation | Sanctum (sanctum.so) | LeonMotions | website UI animation, fintech | https://raivcoo.com/media/74156708-8ac1-461a-9f35-d52924e213d2 ; https://raivcoo.com/media/25c07b90-08d5-4c94-a8ef-eeaad2ab8848 | https://x.com/LeonMotions (profile only) | n/s | Pos 1950, 1951 |
| B7 | Chat Bubble animation by MotionByGolden | n/s | MotionByGolden | UI micro-animation | https://raivcoo.com/media/282866be-0731-4599-84cb-731c085d0685 | https://x.com/MotionByGolden | n/s | Pos 2701. Description: "Chat Bubble animation by MotionByGolden x.com". |
| B8 | Shopping viral produced via an e-commerce Website animation | n/s | kanhamehers | web UI, e-commerce | https://raivcoo.com/media/1f5806bd-477e-4a7f-89d2-79982885846d | https://x.com/kanhamehers | n/s | Pos 2601 |
| B9 | Figma Collaboration Files | Figma | Figma | UI/product explainer | https://raivcoo.com/media/7c54dd63-4397-4a22-8c61-8a8e3666dec9 | https://www.figma.com/ (no specific video) | n/s | Pos 1651 |
| B10 | Uber new icon system | Uber | Uber | icon animation, design system | https://raivcoo.com/media/ff7e83fe-0393-4ef5-b26c-2bf6ab356839 | https://x.com/avstorm/status/2090174763213664496 | n/s | Pos 148 |

### C. Typography, 2D and brand-mark motion

| # | Title | Brand | Creator | Inferred tags | Raivcoo page | Source | Dur. | Notes |
|---|---|---|---|---|---|---|---|---|
| C1 | Text typography animation / Text Slide animation / Text and image slide documentary | Lovable | Lovable | kinetic type, slides | https://raivcoo.com/media/336f71dd-9cd5-46f5-a653-261a2e3a1529 ; https://raivcoo.com/media/7cd0b547-248d-4d39-955d-f35788e84f4d ; https://raivcoo.com/media/13cbafb4-dea1-4fb5-bb9f-6431b9152fd7 | https://x.com/Lovable/status/2074491618824978652 | n/s | Pos 15, 16, 18. One source cut into technique clips. |
| C2 | Blurred Zoom transition / gradient map animation / Vintage map animation / local restaurants Page turn image | Lovable | Lovable | transitions, maps, page-turn | https://raivcoo.com/media/638d69a7-34aa-40f4-a27e-f65180dfbc73 ; https://raivcoo.com/media/bf8dba7b-fb3f-484f-b59f-281e031627a0 ; https://raivcoo.com/media/ce1678f0-d0a5-47f2-8b31-9b9f2339e3ac ; https://raivcoo.com/media/e3e6adc6-776a-4d39-99e6-de9f57755642 | https://x.com/Lovable/status/2089707916270141638 ; …/2097672631504023779 ; …/2079600915175399687 | n/s | Lovable makes up 22 of the 143 pages read. These are "documentary-style" founder-story brand films. |
| C3 | Smooth Adaptive Typewriter Text Animation | n/s | Antonin Waterkeyn | typography, typewriter | https://raivcoo.com/media/13ab0033-d8bf-4e37-be78-37afaa1c47c3 | https://www.instagram.com/antonin.work/ | n/s | Pos 2251 |
| C4 | bouncy text animatiom | n/s | Shubhiworks | typography, bounce/overshoot | https://raivcoo.com/media/39c4e50d-5098-49ed-9d25-03a2335bfca3 | https://x.com/Shubhiworks | n/s | Pos 2501 |
| C5 | text to flowers morphing animation | n/s | daniel petho | type morph | https://raivcoo.com/media/8df1bac6-edf3-432a-be4f-9fd7dca03b32 | https://x.com/nonzeroexitcode/status/2105042956583670154 | n/s | Pos 22 |
| C6 | cute 2d shapes animation / Your dot is ready to meet you | OpenAI | OpenAI | 2D shapes, character, brand | https://raivcoo.com/media/caa89440-337e-46fa-9cd9-db89d04aa262 ; https://raivcoo.com/media/9bd64286-048c-47ec-b541-1a8d96635fc1 | https://x.com/OpenAI/status/2104651136699609518 ; https://x.com/OpenAI/status/2104980481876070819 | n/s | Pos 24–25 |
| C7 | pixelated character animation | Claude | Claude AI | 2D pixel character | https://raivcoo.com/media/9c0d2ee6-0edf-449f-b544-150d4428421a | https://x.com/claudeai/status/2050252933866930339 | n/s | Pos 696 |
| C8 | Midjourney logo animation / pomo logo | Midjourney / pomo | litch / Gleb Kuznetsov | logo animation | https://raivcoo.com/media/cb9fd633-1c20-4bf1-b80c-28890431fe13 ; https://raivcoo.com/media/db91f86e-c9a9-44f2-92cd-399108dbb5c4 | https://x.com/litch_motion/status/2034984340849856875 ; https://x.com/glebich/status/2044262688625438726 | n/s | Pos 1401, 996 |
| C9 | shapes animation | Figma (Config) | Figma | 2D shapes, event identity | https://raivcoo.com/media/63c31434-920f-4311-947b-5538c3c49655 | https://config.figma.com/san-francisco/virtual/ | n/s | Pos 355 |
| C10 | Mixed Liens [lines] and shapes animation | n/s | aflow | 2D lines and shapes | https://raivcoo.com/media/8b700ef8-e1ed-4fd6-9bb7-c4885580c11d | https://www.youtube.com/watch?v=_e3AhpAHB1w | n/s | Pos 1300. Featured aflow piece on the homepage: "[motion graphics] define.", https://www.youtube.com/watch?v=JPvLbNDABnA |

### D. 3D and product renders

| # | Title | Brand | Creator | Inferred tags | Raivcoo page | Source | Dur. | Notes |
|---|---|---|---|---|---|---|---|---|
| D1 | Nintendo switch 2 3d product showcase | Nintendo | ZAIDARTS1 | 3D product showcase | https://raivcoo.com/media/1e8f9cb3-6584-4314-91cc-15de4f5ed42b | https://x.com/ZAIDARTS1/status/2103019525767573725 | n/s | Pos 21 |
| D2 | Galaxy S24 Series Promo 3d animation | Samsung | Samsung | 3D product promo | https://raivcoo.com/media/f5514c0c-1366-49ca-86c9-107d033ba1a4 | https://www.youtube.com/watch?v=ePdbj2bZ-Ro | n/s | Pos 1501 |
| D3 | Lenovo Wireless Keyboard & Mouse ad | Lenovo | Lenovo | 3D/product ad | https://raivcoo.com/media/0b1a2f77-9a83-49d0-a11a-6529f1b86afb | https://www.youtube.com/watch?v=lSSVZvr3AZI | n/s | Pos 106 |
| D4 | glassy gradient sphere / space sphere animation / 3d shapes motion / 2d-3d motion | n/s | wabi / Benji Taylor / PeterTarka / Austin Bauwens | 3D abstract, glass, gradient | https://raivcoo.com/media/4b6a69d9-4180-4713-9e91-dc6b16220a97 ; https://raivcoo.com/media/680b4f60-5c16-414a-b4a8-92aa446d8026 ; https://raivcoo.com/media/a8db17cf-b7f1-489f-a1c6-dacdc7350c9b ; https://raivcoo.com/media/0eb1bae5-9e59-40f0-a457-b8b78611708d | https://x.com/wabi/status/2050308987686641689 ; https://x.com/benjitaylor/status/2072392028474994745 ; https://x.com/PeterTarka/status/2044019852755497381 ; https://x.com/AustinBauwens/status/2021569914696524193 | n/s | Brand-hero "object" loops used in AI launches |
| D5 | 3d car showcase / 3d car portal to another world | n/s | Hieu Vu Duc | 3D product, portal transition | https://raivcoo.com/media/d689f04f-5f60-426c-9137-febcd7cc44a2 ; https://raivcoo.com/media/4fd4d476-d436-475b-8d1d-a8617338ba08 | https://x.com/hieuvudesign/status/2023939812030640605 | n/s | Pos 698–699 |

### E. Explainers, broadcast, identity and studio credits

| # | Title | Brand | Creator | Inferred tags | Raivcoo page | Source | Dur. | Notes / text found |
|---|---|---|---|---|---|---|---|---|
| E1 | Why does AI confidently say the wrong thing sometimes? | AI explainer | Ravie & Co. | tech explainer | https://raivcoo.com/media/c3c3c723-d3de-4b76-83d2-55a5bdd530fc | https://x.com/AustinBauwens/status/2105266407806013803 | n/s | Pos 7 |
| E2 | Claude Ai Explainer (spec) | Claude | Bruwxdvisuals (community upload, Sep 18 2026) | explainer, spec | https://raivcoo.com/media/ac464b86-15d1-4db9-8910-59fccf40fbdf | none; creator site https://bruwxd.framer.website/ | n/s | **Only explicit tool text found:** "Claude Fake Explainer made in **After Effects**. Sfx added in **Premiere** and Voice Over with **Elevenlabs**." |
| E3 | Obsidian Short Ad (spec) | Obsidian | Bruwxdvisuals (Sep 19 2026) | SaaS spec ad | https://raivcoo.com/media/64e654df-edcd-403f-af3a-f923bd52c888 | none | n/s | "Fake Short Ad of Obsidian." |
| E4 | Google I-O 2021 Show Graphics | Google I/O | Nicolo Bianchino | event/show graphics, tech | https://raivcoo.com/media/4340b36a-82ca-4a93-a40c-177b57d93412 | https://vimeo.com/554707767 | n/s | Pos 1201. Vimeo page was bot-blocked, so credits were not read. |
| E5 | REDnote Buildathon 2026 | REDnote | Flatwhite Motion | event identity, tech | https://raivcoo.com/media/8d41e767-fe48-4677-9e7c-bb4eadb36167 | https://vimeo.com/1227930234 | n/s | Pos 49 |
| E6 | Kultureshock - Motion identity for Latvian Television | LTV | Eduards Balodis | broadcast identity | https://raivcoo.com/media/6d93df5e-2706-4426-9d06-102702ef32b1 | https://vimeo.com/1159230861 | n/s | "Visual, motion, and sound identity for investigative journalism program 'Kultureshock' on Latvian Television." |
| E7 | Concrete Genie - Game Cinematic | Sony / PlayStation | Oddfellows | 2D/3D cinematic | https://raivcoo.com/media/40d61105-2f25-448c-a39f-506198516be5 | https://oddfellows.tv/work/sony | ~1 min (studio text: "one-minute cinematic") | **Credits read from oddfellows.tv:** ECD Colin Trenter; EP Erica Kelly; Producer Kaitlyn Mahoney; Art Direction Yuki Yamada; Design Yuki Yamada, Tom Goyon, Sarah Beth Morgan; Animation Khylin Woodrow, Ben Ommundson, Harry Teitelman et al. (17 animators); Music & Sound Ambrose Yu / Sono Sanctus. Brief: a cinematic introducing the protagonist Ash, plus three backstory vignettes. |
| E8 | The Mind, Explained / What's in a name? | Vox / Netflix; Qatar Foundation × Vox | Yuval Haker | editorial explainer | https://raivcoo.com/media/f7923f7a-1338-4445-96e6-1d50b20d4333 ; https://raivcoo.com/media/8ee6433f-1c35-490a-99f5-28b87acfde13 | https://www.behance.net/gallery/94528081/Vox-The-Mind-Explained-on-Netflix ; https://www.behance.net/gallery/150613919/Qatar-Foundation-X-Vox-Media-Explainer | n/s | Behance returned HTTP 403 |
| E9 | 2.5D Parallax Transition / Layered Object Drop with Lateral Camera Move | n/s / Business Insider | tepkaii (Raivcoo staff, Aug 13 2025) / Business Insider | 2.5D, camera move | https://raivcoo.com/media/f41323b1-97b5-4f1f-b5fa-977c05dd9423 ; https://raivcoo.com/media/4ddebcc5-561c-484d-90dc-ebded8b119c3 | none / https://www.youtube.com/@BusinessInsider | n/s | Technique clips, positions 2773 and 2401 |
| E10 | Gradient along path / 1-Bit Flag | n/s | TJJMotion / Hadi Abbas | technique, made in Scenery (inferred) | https://raivcoo.com/media/5cadda5c-f7ab-4cb7-92ee-427f338c9ee7 ; https://raivcoo.com/media/7f3162f4-fc9d-4911-a480-46cf76f174ab | https://scenery.io/scenes/gradient-along-path-workaround-zvmutFke623 ; https://scenery.io/scenes/1-bit-flag-hkYW8BzBwDn | n/s | The source is a scenery.io scene page, which suggests the piece was built in the Scenery motion tool. That is my inference; the page does not say so. |

---

## 3. Patterns from text

What the titles, credits and descriptions show. This is not visual analysis.

1. **The "Introducing X" / "X Launch video" / "X Promo" naming dominates recent uploads.** Most of positions 1–500 are AI/SaaS launch films reposted from X (Twitter). The brands are almost all AI and dev-tool companies: Claude, OpenAI, xAI, Google AI Studio, ElevenLabs, Figma, Linear, Notion, Mintlify, Hebbia, Exa, Firecrawl, Browserbase, Base44, pen.dev, Lovable, Mercury, Revolut, Medium and Contra. The source is usually the brand's own X post or the studio's X post, so **X is the main distribution channel** for this genre.
2. **There is a recognisable set of indie "SaaS launch studios" and solo motion designers.** They recur: Skale Solutions (3 launches), aflow (6 AI-tool promos plus a showreel), Michael Nowak (5 "product showcase UI animation"), LeonMotions (website/crypto UI, 3D input fields), Adrian/adrianinmotion, Austin Bauwens / Ravie & Co., Klipz Studio, OWLED Media, Astra Motion, Relate Studio, Studio Three, Bohdan Motion, 1600Agency, Addxstudio, Valth, LaunchAnything/shapelayer, Flatwhite Motion and Bruwxdvisuals. Several pieces appear to be **spec/"fake" ads** for famous brands (Obsidian, Claude explainer; probably Notion, Revolut and Apple Pay India), which is how these studios build their portfolios.
3. **The technique vocabulary in titles is UI-centric.** It includes "product showcase ui animation", "dashboard showcase", "smooth app product demo", "mobile app demo", "join waitlist 3d input", "chat bubble", "icon system", "website intro animation" and "feature promo" (Repost, Widget, Weave, shader effects). In other words: **animated UI recreations of real product screens**, not screen recordings.
4. **The typography and transition vocabulary** includes "text typography animation", "text slide", "typewriter", "bouncy text", "text→flowers morph", "blurred zoom transition", "photos slide", "page turn", "vintage / gradient map", "2.5D parallax transition" and "layered object drop with lateral camera move". These are kinetic-type and editorial-collage devices, heavily used in founder-story or documentary-style brand films (the Lovable cluster).
5. **Abstract 3D "hero objects" sit alongside the UI.** Titles include glassy gradient sphere, space sphere, 3D shapes, 2D-3D motion and a 3D input gradient. Hard-product 3D showcases include Switch 2, Galaxy S24, Lenovo and a 3D car. AI brands also use **soft 2D characters and shapes** (OpenAI "dot", Claude pixel character, Figma Config shapes).
6. **Tools are almost never stated.** Only one description names software: **After Effects** for animation, **Premiere** for SFX and **ElevenLabs** for voice-over (Bruwxdvisuals' Claude explainer). Raivcoo's own plugin suite is After Effects-only, and its Pro Search offers a "software" filter, which points to an AE-first community. Two technique clips link to **scenery.io** scenes. **No page I read mentions Cinema 4D, Blender, Rive or Spline.** Those would sit in the unreadable "Tools and Details" panel, if anywhere.
7. **Granularity.** Raivcoo slices one source film into several per-shot pages, each titled with the technique. This works as a free shot-list: the six Lovable page titles for status 2074491618824978652 read as the edit's structure (intro → photo slide → type → text slide → vintage map → text+image slide).
8. **Older archive content** (positions >1,500) leans toward short social edits and technique loops (TikTok/Instagram/X creators, YouTube explainers like Vox and Business Insider) rather than brand launch films.

---

## 4. Top picks to analyse frame-by-frame (10 SaaS / product examples)

I chose these for clear SaaS/product focus, credible makers (brand in-house or a known launch studio) and variety: launch film, feature promo, mobile demo, dashboard UI and AI voice.
**Download from the source URL** (the raivcoo page does not expose an mp4). `yt-dlp "<url>"` handles x.com status links, YouTube and Vimeo. I have not checked that each X post still hosts the video, or which clip is the right one in multi-video posts.

| Rank | Title | Brand / maker | Why | Download from | Raivcoo page |
|---|---|---|---|---|---|
| 1 | Contra Launch Video | Contra / Skale Solutions | A specialist SaaS-launch studio's full launch film | https://x.com/SkaleSolutions/status/2100209834113315035 | https://raivcoo.com/media/66fd35ee-06cd-4045-ac71-0fdfee63c294 |
| 2 | Browserbase Launch video | Browserbase / Skale Solutions | A dev-tool launch from the same studio; compare it with #1 to see the studio's system | https://x.com/SkaleSolutions/status/2103797470572724311 | https://raivcoo.com/media/c00410a6-04ef-402f-8391-9fab973afd09 |
| 3 | Announcing FIGMA MOTION | Figma (in-house) | A top-tier product launch about a motion tool | https://x.com/figma/status/2069827742800253230 | https://raivcoo.com/media/a483684c-dc70-47f0-a6d2-e603cea54181 |
| 4 | Linear mobile app demo | Linear (in-house) | Benchmark for restrained, premium UI demo motion | https://x.com/linear/status/2082856036977803595 | https://raivcoo.com/media/6aeb1923-3f67-47df-95f5-5cafa96e318a |
| 5 | Introducing Speech Engine | ElevenLabs (in-house) | Matches the "ElevenLabs-style" AI launch look | https://x.com/ElevenLabs/status/2057155693623361667 | https://raivcoo.com/media/9bf5470d-bd27-406d-a8df-b96f84f2e46a |
| 6 | Meet the Widget - Promo video | Mintlify (in-house) | A single-feature SaaS promo, good for UI-callout pacing | https://x.com/mintlify/status/2083287787135185192 | https://raivcoo.com/media/96b0acc3-36aa-4f3b-957b-c370ebedd836 |
| 7 | Introducing Max - Launch video | Hebbia (in-house) | An enterprise AI SaaS launch | https://x.com/hebbia/status/2082876358397477109 | https://raivcoo.com/media/b5da0262-97b2-48fd-801f-62d05384ae0d |
| 8 | product dashboard showcase ui animation | Michael Nowak | A pure dashboard UI-animation craft piece | https://x.com/mnowakdesign/status/2037151928640262225 | https://raivcoo.com/media/8a31f11a-76da-4a8a-bccb-53bde82fe580 |
| 9 | Notion Promo Ad | Notion / 1600Agency | An agency SaaS ad for a well-known product | https://x.com/1600Agency/status/2072151540131840274 | https://raivcoo.com/media/8befa3b5-2766-4926-8921-978aafa193ba |
| 10 | Ai UI Builder Promo animation ("VYBE") | aflow | A 15-second AI SaaS promo on YouTube, so it is easy to download; aflow is featured on the Raivcoo homepage | https://www.youtube.com/watch?v=lvVsp2EkzfA | https://raivcoo.com/media/29b8b327-29ec-4e76-b8d3-884e39d88f91 |

Alternates: WSO2 Agent Manager Promo (Astra Motion), https://x.com/hlibtrazanov/status/2100894563107844239 · Firecrawl Promo animation (Studio Three), https://x.com/firecrawl/status/2057495269785358384 · Introducing Exa Snapshot, https://x.com/ExaAILabs/status/2100634095395225898 · Atrium product launch (Bohdan Motion), https://x.com/bohdanmotion/status/2070486614158033283 · Introducing Claude Opus 5.5, https://x.com/claudeai/status/2102435511222890900 · Google AI Studio Promo, https://x.com/GoogleAIStudio/status/2070608601652044045 · Medium Repost feature (Adrian), https://x.com/adrianinmotion/status/2081777469690875946 · Sanctum Launch Video (Klipz Studio), https://x.com/KlipzStudio/status/2105609022821081410.

---

## 5. Honesty notes / limits

- **Read:** 143 of 2,773 media pages (~5%), plus the sitemap, robots.txt, /about, /tools, /profile/@raivcoo, /search?q=saas, and 5 source pages (3 YouTube, 1 oddfellows.tv; one YouTube page gave no usable title or duration).
- **Not readable:** Raivcoo tags, categories, software, colours and aspect ratio (the client-side "Tools and Details" panel); durations (placeholder player); raivcoo-hosted video files; related items; search results; homepage grid; Vimeo pages (bot-blocked); Behance (403). WebFetch is blocked for raivcoo.com, and WebSearch has no indexed raivcoo media pages.
- The "Inferred tags" column is my own classification from the title words. Brand attributions follow Raivcoo's "By" line. Raivcoo writes "SpaceXAI" for xAI/X posts and sometimes credits the brand when the poster is a studio.
- No video was watched. Every style statement in section 3 comes from text only.

---

## Appendix: every media page read (143), in sitemap-position order

Columns: pos | title | "By" | source link | raivcoo page | description (if any).

| pos | title | by | source | raivcoo page | description |
|---|---|---|---|---|---|
| 1 | AgentArcade Promo video | Skale Solutions | https://x.com/AgentArcade | https://raivcoo.com/media/7b484197-225b-4a50-b538-c9cf31905286 |  |
| 2 | Make the process lovable. | Lovable | https://x.com/Lovable/status/2059290171254976530 | https://raivcoo.com/media/1e94976a-ce8f-461f-b985-a6a38474a008 |  |
| 3 | Nico travel platform idea documentary intro | Lovable | https://x.com/Lovable/status/2077032856514162709 | https://raivcoo.com/media/cdfb2394-a9a7-4dff-a458-dd8271bead36 |  |
| 4 | travel issues documentary | Lovable | https://x.com/Lovable/status/2077032856514162709 | https://raivcoo.com/media/bdae780b-861a-4f28-a20a-c3dd14c15ed6 |  |
| 5 | travel platform idea documentary | Lovable | https://x.com/Lovable/status/2077032856514162709 | https://raivcoo.com/media/d9175e41-2ef7-4588-bedf-9259cbc4136d |  |
| 6 | Contra Launch Video | Skale Solutions | https://x.com/SkaleSolutions/status/2100209834113315035 | https://raivcoo.com/media/66fd35ee-06cd-4045-ac71-0fdfee63c294 |  |
| 7 | Why does AI confidently say the wrong thing sometimes? | Ravie & Co. | https://x.com/AustinBauwens/status/2105266407806013803 | https://raivcoo.com/media/c3c3c723-d3de-4b76-83d2-55a5bdd530fc |  |
| 8 | Apple Pay in India launch video | OWLED Media | https://x.com/AyushkWadhwa/status/2105230114900598885 | https://raivcoo.com/media/12a0549d-1895-4107-899b-4542f51ab4c7 |  |
| 9 | Sanctum Launch Video | Klipz Studio | https://x.com/KlipzStudio/status/2105609022821081410 | https://raivcoo.com/media/685198a6-39fc-4400-9a87-c35f6c50317e |  |
| 10 | Introducing Claude Opus 5.5 | Claude AI | https://x.com/claudeai/status/2102435511222890900 | https://raivcoo.com/media/e62b7552-1e34-4a4a-ac07-0b5c0af7491f |  |
| 11 | That's Firefox? See the browser's surprising new changes | Firefox | https://www.youtube.com/watch?v=l7tQ1v4TCeY | https://raivcoo.com/media/b1db9fdb-9e6e-4bfc-93ab-bf5b1231b815 |  |
| 12 | documentary university Story Intro video | Lovable | https://x.com/Lovable/status/2074491618824978652 | https://raivcoo.com/media/c6d1f1a8-d048-47b7-ac6f-17637ec9994c |  |
| 13 | Photos Slide animation | Lovable | https://x.com/Lovable/status/2074491618824978652 | https://raivcoo.com/media/ce23daaf-7931-484b-bfe1-204b2d6c032b |  |
| 14 | university Dropout issue documentary | Lovable | https://x.com/Lovable/status/2074491618824978652 | https://raivcoo.com/media/7b4e7a97-cd1d-4afa-922e-18c00e65a1cb |  |
| 15 | Text typography animation | Lovable | https://x.com/Lovable/status/2074491618824978652 | https://raivcoo.com/media/336f71dd-9cd5-46f5-a653-261a2e3a1529 |  |
| 16 | Text Slide animation | Lovable | https://x.com/Lovable/status/2074491618824978652 | https://raivcoo.com/media/7cd0b547-248d-4d39-955d-f35788e84f4d |  |
| 17 | Vintage Map slide | Lovable | https://x.com/Lovable/status/2074491618824978652 | https://raivcoo.com/media/3e917fea-98c8-4d9a-89ba-bfbea11a7e1b |  |
| 18 | Text and image slide documentary | Lovable | https://x.com/Lovable/status/2074491618824978652 | https://raivcoo.com/media/13cbafb4-dea1-4fb5-bb9f-6431b9152fd7 |  |
| 19 | taiwan percentage numbers | Vox | https://www.youtube.com/watch?v=ZOJ1lX8ykhg | https://raivcoo.com/media/54e659f1-b144-4ccf-aa8f-d17fe4a3128e |  |
| 20 | taiwan history | Vox | https://www.youtube.com/watch?v=ZOJ1lX8ykhg | https://raivcoo.com/media/3a30c9bf-f863-4536-b77d-8bc2e7e212aa |  |
| 21 | Nintendo switch 2 3d product showcase | ZAIDARTS1 | https://x.com/ZAIDARTS1/status/2103019525767573725 | https://raivcoo.com/media/1e8f9cb3-6584-4314-91cc-15de4f5ed42b |  |
| 22 | text to flowers morphing animation | daniel petho | https://x.com/nonzeroexitcode/status/2105042956583670154 | https://raivcoo.com/media/8df1bac6-edf3-432a-be4f-9fd7dca03b32 |  |
| 23 | Browserbase Launch video | Skale Solutions | https://x.com/SkaleSolutions/status/2103797470572724311 | https://raivcoo.com/media/c00410a6-04ef-402f-8391-9fab973afd09 |  |
| 24 | cute 2d shapes animation | OpenAI | https://x.com/OpenAI/status/2104651136699609518 | https://raivcoo.com/media/caa89440-337e-46fa-9cd9-db89d04aa262 |  |
| 25 | Your dot is ready to meet you | OpenAI | https://x.com/OpenAI/status/2104980481876070819 | https://raivcoo.com/media/9bd64286-048c-47ec-b541-1a8d96635fc1 |  |
| 26 | hellosol.app launch video | anish karan | https://x.com/_anishkaran/status/2102412763687789055 | https://raivcoo.com/media/cd4860d6-2445-416a-8a65-13e55067fbef |  |
| 27 | Incredible Promo | Incredible | https://x.com/useincredible/status/2102382407471263760 | https://raivcoo.com/media/d2930e55-4775-4bd5-8bcb-8afb07fe0a7b |  |
| 28 | Route Promo | Route | https://x.com/routedotfun/status/2102432346762887200 | https://raivcoo.com/media/51af1e81-3a8e-435b-adba-fc9231fdc9ee |  |
| 29 | Introducing Midcentury | Midcentury | https://x.com/MidcenturyAI/status/2102412610071339414 | https://raivcoo.com/media/5e25bc4b-56f0-4ca6-9415-9da14b4f5c02 |  |
| 30 | Vintage map animation | Lovable | https://x.com/Lovable/status/2079600915175399687 | https://raivcoo.com/media/6d57f0a8-654c-4f08-b4a6-c3f8be222be4 |  |
| 31 | Text animation | Lovable | https://x.com/Lovable/status/2079600915175399687 | https://raivcoo.com/media/8332819b-9f22-42aa-bff4-d0ff201a85cc |  |
| 32 | local restaurants Page turn image | Lovable | https://x.com/Lovable/status/2079600915175399687 | https://raivcoo.com/media/e3e6adc6-776a-4d39-99e6-de9f57755642 |  |
| 33 | local restaurants Documentary video intro | Lovable | https://x.com/Lovable/status/2079600915175399687 | https://raivcoo.com/media/2e69d624-10d8-4272-905d-196c79b9bf5b |  |
| 34 | local restaurants Business Documentary video | Lovable | https://x.com/Lovable/status/2079600915175399687 | https://raivcoo.com/media/29a04ffa-df93-4cd3-a9b3-7866bd35dea2 |  |
| 35 | Documentary Video Intro | Lovable | https://x.com/Lovable/status/2079600915175399687 | https://raivcoo.com/media/ea8609a6-f24c-433f-905c-8709100a74e7 |  |
| 36 | 2d light candle animation | Lovable | https://x.com/Lovable/status/2089707916270141638 | https://raivcoo.com/media/97f23d3f-a7a4-4b5d-ac58-392b72d81dd8 |  |
| 37 | Blurred Zoom transition | Lovable | https://x.com/Lovable/status/2089707916270141638 | https://raivcoo.com/media/638d69a7-34aa-40f4-a27e-f65180dfbc73 |  |
| 38 | Vintage map animation | Lovable | https://x.com/Lovable/status/2089707916270141638 | https://raivcoo.com/media/ce1678f0-d0a5-47f2-8b31-9b9f2339e3ac |  |
| 39 | gradient map animation | Lovable | https://x.com/Lovable/status/2097672631504023779 | https://raivcoo.com/media/bf8dba7b-fb3f-484f-b59f-281e031627a0 |  |
| 40 | Creators are founders. | Lovable | https://x.com/Lovable/status/2099860744061722981 | https://raivcoo.com/media/a2d7d950-d748-48d5-9922-21ca2adfbd50 |  |
| 41 | WSO2 Agent Manager Promo | Astra Motion | https://x.com/hlibtrazanov/status/2100894563107844239 | https://raivcoo.com/media/d200034b-4ed9-4242-95b9-cd17d38fc708 |  |
| 42 | Introducing Memorable | Advaiyt Sane | https://x.com/advaiytsane/status/2100668011673731441 | https://raivcoo.com/media/607f0fb8-90a3-4a04-9efa-59eb66175106 |  |
| 43 | Introducing Exa Snapshot | ExaAILabs | https://x.com/ExaAILabs/status/2100634095395225898 | https://raivcoo.com/media/6c0fd3c6-ce9e-406f-958d-9fc9623864e8 |  |
| 44 | Sonos brand campaign | Sonos | https://x.com/brennenschlu/status/2100676516741026124 | https://raivcoo.com/media/ef65c3a9-2a3b-4cf4-8e57-8e6a271ba6f0 |  |
| 45 | Bondin launch video | Bondin | https://x.com/vanjek/status/2100544809207210298 | https://raivcoo.com/media/887105bd-edc2-407b-9873-3e2af555aca4 |  |
| 46 | Frontier Traders Promo | Relate Studio | https://x.com/relate_studio/status/2100582826798170139 | https://raivcoo.com/media/7c53e241-5741-4b60-aadf-3848592e0f5e |  |
| 47 | aixio.app promo | Afroz | https://x.com/afrozshei/status/2097547283311243440 | https://raivcoo.com/media/35a14977-7107-458a-8922-21531c623aeb |  |
| 48 | Introducing Googlebook | Google | https://x.com/Google/status/2102051060558750141 | https://raivcoo.com/media/11e779bc-0410-45a0-bce3-ce9af59672e6 |  |
| 49 | REDnote Buildathon 2026 | Flatwhite Motion | https://vimeo.com/1227930234 | https://raivcoo.com/media/8d41e767-fe48-4677-9e7c-bb4eadb36167 |  |
| 50 | Introducing X Numbers | SpaceXAI | https://x.com/benjitaylor/status/2102443951898992825 | https://raivcoo.com/media/31303f52-56b8-4db7-af3b-1f00f7899837 |  |
| 51 | Introducing Cashtag Patterns | SpaceXAI | https://x.com/X/status/2102147636702634195 | https://raivcoo.com/media/48ff3338-6808-485f-8a0b-e8acf93e432e |  |
| 52 | Introducing Nova Score. | LaunchAnything | https://x.com/shapelayer/status/2102453754121642129 | https://raivcoo.com/media/f2611825-7433-49b4-b06f-6cfe0f5aaba3 |  |
| 53 | Obsidian Short Ad | Bruwxdvisuals (@bruwxd, community upload Sep 19 2026) | (none; https://bruwxd.framer.website/) | https://raivcoo.com/media/64e654df-edcd-403f-af3a-f923bd52c888 | Fake Short Ad of Obsidian (spec ad). |
| 54 | Claude Ai Explainer | Bruwxdvisuals (@bruwxd, community upload Sep 18 2026) | (none; https://bruwxd.framer.website/) | https://raivcoo.com/media/ac464b86-15d1-4db9-8910-59fccf40fbdf | Claude Fake Explainer made in After Effects. Sfx added in Premiere and Voice Over with Elevenlabs. |
| 55 | we're launching Mercury Books | Mercury | https://x.com/immad/status/2100256806413140181 | https://raivcoo.com/media/9f9d9a7c-b445-4b2a-8ca0-7a3251726c69 |  |
| 56 | Introducing the new pen.dev an agentic canvas for building bold ideas. | pen.dev | https://x.com/tomkrcha/status/2100570466692071493 | https://raivcoo.com/media/10a50b2e-e88b-479f-a7c9-78488e2bd41b |  |
| 57 | Swivr Launch Video | Valth | https://x.com/valthvisuals/status/2100189262285287559 | https://raivcoo.com/media/4f9d015b-0e8f-4ab9-8001-3d25ad21fb76 |  |
| 58 | 1-Bit Flag | Hadi Abbas | https://scenery.io/scenes/1-bit-flag-hkYW8BzBwDn | https://raivcoo.com/media/7f3162f4-fc9d-4911-a480-46cf76f174ab |  |
| 61 | Concrete Genie - Game Cinematic | oddfellows | https://oddfellows.tv/work/sony | https://raivcoo.com/media/40d61105-2f25-448c-a39f-506198516be5 |  |
| 106 | Lenovo Wireless Keyboard & Mouse ad | Lenovo | https://www.youtube.com/watch?v=lSSVZvr3AZI | https://raivcoo.com/media/0b1a2f77-9a83-49d0-a11a-6529f1b86afb |  |
| 145 | Documentary crime video | otsan | https://www.instagram.com/p/Dax50CaBA7y/ | https://raivcoo.com/media/73775e05-990c-4f55-9aaf-f04cb0a88d03 |  |
| 146 | singapore documentary | otsan | https://www.instagram.com/p/DZVdrV5Bhqh/ | https://raivcoo.com/media/5ddcb648-0513-4582-a896-923f68fbf318 |  |
| 147 | introducing firecrawl free keyless | Firecrawl | https://x.com/ericciarla/status/2093375835679977570 | https://raivcoo.com/media/e0d5a275-21b7-43be-a9b3-2be2ccf02000 |  |
| 148 | Uber new icon system | Uber | https://x.com/avstorm/status/2090174763213664496 | https://raivcoo.com/media/ff7e83fe-0393-4ef5-b26c-2bf6ab356839 |  |
| 149 | Grok Bots templates - promo | Grok Bot | https://x.com/bot/status/2093376523919323618 | https://raivcoo.com/media/2d59048c-5d7f-45ce-b96c-30c2eb3fa03c |  |
| 150 | $1.1B for the Machine Age. | a16z | https://x.com/a16z/status/2093330303242965464 | https://raivcoo.com/media/a9eaf893-f100-4ebd-ab45-f2268a4ee928 |  |
| 151 | ClickUp Ai agent ad | Addxstudio | https://x.com/Kendel4204k/status/2093623294029451525 | https://raivcoo.com/media/68a26837-9e16-4944-b7b7-f4cc2f972391 |  |
| 152 | Introducing Trader Rewards on fomo | fomo | https://x.com/fomo/status/2093380902751465572 | https://raivcoo.com/media/e0e3da17-b8d0-43fb-92c9-94c23cdb68c7 |  |
| 153 | The Mind, Explained | Yuval Haker | https://www.behance.net/gallery/94528081/Vox-The-Mind-Explained-on-Netflix | https://raivcoo.com/media/f7923f7a-1338-4445-96e6-1d50b20d4333 |  |
| 154 | What's in a name? A lot, actually | Yuval Haker | https://www.behance.net/gallery/150613919/Qatar-Foundation-X-Vox-Media-Explainer | https://raivcoo.com/media/8ee6433f-1c35-490a-99f5-28b87acfde13 |  |
| 155 | The Story of 4/20 | SarahGreenberg | https://www.behance.net/gallery/103937261/The-Story-of-420 | https://raivcoo.com/media/c270641b-c5a1-44c5-88b9-221f26b0289d |  |
| 201 | Introducing Vibe Funnels | Commas | https://x.com/commas/status/2090829148147069311 | https://raivcoo.com/media/f7cefcf7-af3d-4233-b612-500161e845fd |  |
| 246 | Medium Repost feature - Promo | Adrian (adrianinmotion) | https://x.com/adrianinmotion/status/2081777469690875946 | https://raivcoo.com/media/90fbb612-140b-4a8f-bbde-45057fdbc5d0 |  |
| 247 | Revolut Promo video | Rajz | https://x.com/rajzmtnz/status/2082513904283082935 | https://raivcoo.com/media/0c0671a2-7bdf-4dc8-844b-a86da9fe2441 |  |
| 248 | Meet the Widget - Promo video | Mintlify | https://x.com/mintlify/status/2083287787135185192 | https://raivcoo.com/media/96b0acc3-36aa-4f3b-957b-c370ebedd836 |  |
| 249 | Introducing Max - Launch video | Hebbia | https://x.com/hebbia/status/2082876358397477109 | https://raivcoo.com/media/b5da0262-97b2-48fd-801f-62d05384ae0d |  |
| 250 | Linear mobile app demo | Linear | https://x.com/linear/status/2082856036977803595 | https://raivcoo.com/media/6aeb1923-3f67-47df-95f5-5cafa96e318a |  |
| 251 | launch video | MIDΞ | https://x.com/theProcessXCII/status/2082055433326411886 | https://raivcoo.com/media/547ada9f-cf25-4b05-8d54-128bba5fecbf |  |
| 301 | Kultureshock - Motion identity for Latvian Television | Eduards Balodis | https://vimeo.com/1159230861 | https://raivcoo.com/media/6d93df5e-2706-4426-9d06-102702ef32b1 | Visual, motion, and sound identity for investigative journalism program "Kultureshock" on Latvian Television. |
| 346 | space sphere animation | Benji Taylor | https://x.com/benjitaylor/status/2072392028474994745 | https://raivcoo.com/media/680b4f60-5c16-414a-b4a8-92aa446d8026 |  |
| 347 | motion graphics video | ishan | https://x.com/404ishan/status/2070136732884799869 | https://raivcoo.com/media/d0910407-0999-4bc0-93cc-8a8ab9e0783b |  |
| 348 | Google AI Studio Promo | Google | https://x.com/GoogleAIStudio/status/2070608601652044045 | https://raivcoo.com/media/a3cf9a1f-0054-481a-aef8-5588203fd256 |  |
| 349 | Atrium product launch | Bohdan Motion | https://x.com/bohdanmotion/status/2070486614158033283 | https://raivcoo.com/media/7b65a06f-2e90-41f7-b8f1-d1ce5841e133 |  |
| 350 | Notion Promo Ad | 1600Agency | https://x.com/1600Agency/status/2072151540131840274 | https://raivcoo.com/media/8befa3b5-2766-4926-8921-978aafa193ba |  |
| 351 | Voice Agent Builder - Promo video | SpaceXAI (xAI) | https://x.com/xai/status/2072342803787702422 | https://raivcoo.com/media/53e08de6-c52a-449e-ba55-825e683e1806 |  |
| 352 | Figma shader effects - Promo | Figma | https://x.com/figma/status/2069825997478961314 | https://raivcoo.com/media/7ab0033f-166e-4c9a-95bc-86872e245fce |  |
| 353 | Figma Weave tools - Promo animation | Figma | https://x.com/figma/status/2069822938484986249 | https://raivcoo.com/media/0d120013-a6d8-4de0-9fe1-02d138b40b57 |  |
| 354 | Figma agent - Promo Animation | Figma | https://x.com/figma/status/2069824816279154840 | https://raivcoo.com/media/89580685-fa39-4c34-82cc-54797d0dfea8 |  |
| 355 | shapes animation | Figma | https://config.figma.com/san-francisco/virtual/ | https://raivcoo.com/media/63c31434-920f-4311-947b-5538c3c49655 |  |
| 356 | Announcing FIGMA MOTION | Figma | https://x.com/figma/status/2069827742800253230 | https://raivcoo.com/media/a483684c-dc70-47f0-a6d2-e603cea54181 |  |
| 401 | Vibrance motion graphics | Seven | https://www.youtube.com/watch?v=cnjSVom_vEE | https://raivcoo.com/media/93cb54b3-a5f7-4d0b-8a56-aebe8b342b65 |  |
| 451 | Base44 design update - motion | Base 44 | https://x.com/Base44/status/2057113621910475065 | https://raivcoo.com/media/b357af7d-0889-41c3-8344-f2dc8839a62b |  |
| 453 | Firecrawl Promo animation | Studio Three | https://x.com/firecrawl/status/2057495269785358384 | https://raivcoo.com/media/3c4d096d-5dc5-496b-bbf5-399ebc013b8e |  |
| 454 | articles cover intro animation | Adrian (adrianinmotion) | https://x.com/adrianinmotion/status/2057461992575910082 | https://raivcoo.com/media/3f296a74-fab9-48be-9504-c96f7d8c0bb3 |  |
| 455 | Polsia ad | Polsia | https://x.com/Bencera/status/2057847644966547920 | https://raivcoo.com/media/775986f7-869e-4978-93a6-d33c024d9223 |  |
| 456 | colorful motion | ElevenLabs | https://x.com/ElevenLabs/status/2057840637504885216 | https://raivcoo.com/media/d6b91553-caf6-4dbe-b5cc-73b3793c961e |  |
| 457 | Introducing Speech Engine - ElevenLabs | ElevenLabs | https://x.com/ElevenLabs/status/2057155693623361667 | https://raivcoo.com/media/9bf5470d-bd27-406d-a8df-b96f84f2e46a |  |
| 501 | Feed the brain - Cosmos | Cosmos | https://x.com/thecosmos/status/2054637014771785995 | https://raivcoo.com/media/09dd7fec-4e8c-488e-87d2-690a84250c1a |  |
| 601 | Documentary Broadcast Intro | Sky Motion | https://www.youtube.com/watch?v=7vuy0slk_WY | https://raivcoo.com/media/3e80e3a4-ba08-4911-a4fd-23174ab53035 |  |
| 696 | pixelated character animation | Claude AI | https://x.com/claudeai/status/2050252933866930339 | https://raivcoo.com/media/9c0d2ee6-0edf-449f-b544-150d4428421a |  |
| 697 | glassy gradient sphere | wabi | https://x.com/wabi/status/2050308987686641689 | https://raivcoo.com/media/4b6a69d9-4180-4713-9e91-dc6b16220a97 |  |
| 698 | 3d car portal to another world animation | Hieu Vu Duc | https://x.com/hieuvudesign/status/2023939812030640605 | https://raivcoo.com/media/4fd4d476-d436-475b-8d1d-a8617338ba08 |  |
| 699 | 3d car showcase | Hieu Vu Duc | https://x.com/hieuvudesign | https://raivcoo.com/media/d689f04f-5f60-426c-9137-febcd7cc44a2 |  |
| 700 | 2d-3d motion | Austin Bauwens | https://x.com/AustinBauwens/status/2021569914696524193 | https://raivcoo.com/media/0eb1bae5-9e59-40f0-a457-b8b78611708d |  |
| 701 | ai video editing app Promo | Austin Bauwens | https://x.com/AustinBauwens/status/2036899438497571253 | https://raivcoo.com/media/1f8882b5-98a2-4323-aafc-8f5f77b3e7dd |  |
| 801 | Spring event "HILLS SAKURA DAYS" | Takayuki Yoshida | https://x.com/__Stew__/status/1911694511874736444/video/1 | https://raivcoo.com/media/63d9b5c0-132e-4dbd-a222-f5f786c5042e |  |
| 901 | Gradient along path | TJJMotion | https://scenery.io/scenes/gradient-along-path-workaround-zvmutFke623 | https://raivcoo.com/media/5cadda5c-f7ab-4cb7-92ee-427f338c9ee7 |  |
| 996 | pomo logo | Gleb Kuznetsov | https://x.com/glebich/status/2044262688625438726 | https://raivcoo.com/media/db91f86e-c9a9-44f2-92cd-399108dbb5c4 |  |
| 997 | Cashtags app Promo | Nikita Bier | https://x.com/nikitabier/status/2044187672969879654 | https://raivcoo.com/media/0a775a7b-cbaf-475a-a659-d32ccd667603 |  |
| 998 | smooth app product demo animation | DesignMe | https://x.com/designme/status/2043736136284287284 | https://raivcoo.com/media/dfc63b7b-7da6-442c-afb9-af03f611cfaf |  |
| 999 | Football world cup 2026 intro edit | Trovart | https://x.com/timileyindada_/status/2044017132879360361 | https://raivcoo.com/media/1bf53b1a-3733-49a0-9c8f-fe836d006064 |  |
| 1000 | Apple Music Ai Playlist Playground Showcase | Apple | https://x.com/aaronp613/status/2044023362347741466 | https://raivcoo.com/media/bc2294e0-c5ee-456a-a465-caa418049bd0 |  |
| 1001 | product dashboard showcase ui animation | Michael Nowak | https://x.com/mnowakdesign/status/2037151928640262225 | https://raivcoo.com/media/8a31f11a-76da-4a8a-bccb-53bde82fe580 |  |
| 1002 | product showcase ui animation | Michael Nowak | https://x.com/mnowakdesign/status/2038995559927927177 | https://raivcoo.com/media/4e158d3e-86f1-4abd-829a-a85da6a20d69 |  |
| 1003 | product showcase ui animation | Michael Nowak | https://x.com/mnowakdesign/status/2040443851673133116 | https://raivcoo.com/media/eef7e0eb-e63d-4843-a331-aa803122c09b |  |
| 1004 | product showcase animation | Michael Nowak | https://x.com/mnowakdesign/status/2034299213954289794 | https://raivcoo.com/media/ed99e9ef-b179-4605-bad0-b647afb0c401 |  |
| 1005 | product showcase ui animation | Michael Nowak | https://x.com/mnowakdesign/status/2043706001531318722 | https://raivcoo.com/media/ce6ec2b4-7479-46af-9712-1405ea8e72c1 |  |
| 1006 | 3d shapes motion | PeterTarka | https://x.com/PeterTarka/status/2044019852755497381 | https://raivcoo.com/media/a8db17cf-b7f1-489f-a1c6-dacdc7350c9b |  |
| 1101 | Jaedoo Lee — Hermès | Agent Pekka | https://vimeo.com/1098782778 | https://raivcoo.com/media/f3625a0a-c21b-4249-87a6-53265f6ca974 |  |
| 1201 | Google I-O 2021 Show Graphics | Nicolo Bianchino | https://vimeo.com/554707767 | https://raivcoo.com/media/4340b36a-82ca-4a93-a40c-177b57d93412 |  |
| 1296 | motion graphics 2024 Showreel | aflow | https://www.youtube.com/watch?v=ZksgjJs3Kts | https://raivcoo.com/media/2e9b28a8-aef1-4172-8fa0-c78249e9af0d |  |
| 1297 | motion graphics animation | aflow | https://www.youtube.com/watch?v=dp-c10JwrNo | https://raivcoo.com/media/695a2343-344d-484b-a0ce-f9873901f7ea |  |
| 1298 | Ai UI Builder Promo animation | aflow | https://www.youtube.com/watch?v=lvVsp2EkzfA | https://raivcoo.com/media/29b8b327-29ec-4e76-b8d3-884e39d88f91 |  |
| 1299 | ai schedule promo animation | aflow | https://www.youtube.com/watch?v=qsbDaLMWcFk | https://raivcoo.com/media/96dc4e8f-2ae4-4798-808c-43bc5dd511d3 |  |
| 1300 | Mixed Liens and shapes animation | aflow | https://www.youtube.com/watch?v=_e3AhpAHB1w | https://raivcoo.com/media/8b700ef8-e1ed-4fd6-9bb7-c4885580c11d |  |
| 1301 | Ai Online store Builder Promo animation | aflow | https://www.youtube.com/watch?v=0pcPy8riGnI | https://raivcoo.com/media/fe016b60-fc6c-4d88-86c1-bd091fc52726 |  |
| 1401 | Midjourney logo animation | litch | https://x.com/litch_motion/status/2034984340849856875 | https://raivcoo.com/media/cb9fd633-1c20-4bf1-b80c-28890431fe13 |  |
| 1501 | Galaxy S24 Series Promo 3d animation | Samsung | https://www.youtube.com/watch?v=ePdbj2bZ-Ro | https://raivcoo.com/media/f5514c0c-1366-49ca-86c9-107d033ba1a4 |  |
| 1651 | Figma Collaboration Files | Figma | https://www.figma.com/ | https://raivcoo.com/media/7c54dd63-4397-4a22-8c61-8a8e3666dec9 |  |
| 1801 | car driving animation | Iman Gadzhi | https://www.youtube.com/watch?v=1-izXBhkiHw | https://raivcoo.com/media/6b63e2ea-470c-453d-a7f3-0d114521665d |  |
| 1946 | pirate character smooth head pop-in loop 2d animation | Defacedstudio | https://x.com/Defacedstudio | https://raivcoo.com/media/61745463-16b0-4c52-9e17-bc887e8f9d1a |  |
| 1947 | characters walking loop 2d animation | Defacedstudio | https://x.com/Defacedstudio | https://raivcoo.com/media/ad2e1277-148f-4001-84a9-23a1e33bb008 |  |
| 1948 | energy drink ad animation | LeonMotions | https://x.com/LeonMotions | https://raivcoo.com/media/81dd7c3b-7b16-4644-abbd-7c3f647bb89f |  |
| 1949 | join waitlist 3d input gradient animation | LeonMotions | https://x.com/LeonMotions | https://raivcoo.com/media/094f18ae-73f7-4e6b-9fe8-0b04ecc65b29 |  |
| 1950 | sanctumso crypto currency trading website animation | LeonMotions | https://x.com/LeonMotions | https://raivcoo.com/media/74156708-8ac1-461a-9f35-d52924e213d2 |  |
| 1951 | crypto currency trading website intro animation | LeonMotions | https://x.com/LeonMotions | https://raivcoo.com/media/25c07b90-08d5-4c94-a8ef-eeaad2ab8848 |  |
| 2101 | Low fps wiggly vintage motion edit | azreeelll (shared by @aestheticedits) | https://www.tiktok.com/@azreeelll | https://raivcoo.com/media/2e470857-3bcb-41e6-8e7a-dd468840c6ed |  |
| 2251 | Smooth Adaptive Typewriter Text Animation | Antonin Waterkeyn | https://www.instagram.com/antonin.work/ | https://raivcoo.com/media/13ab0033-d8bf-4e37-be78-37afaa1c47c3 |  |
| 2401 | Layered Object Drop with Lateral Camera Move | Business Insider | https://www.youtube.com/@BusinessInsider | https://raivcoo.com/media/4ddebcc5-561c-484d-90dc-ebded8b119c3 |  |
| 2501 | bouncy text animatiom | Shubhiworks | https://x.com/Shubhiworks | https://raivcoo.com/media/39c4e50d-5098-49ed-9d25-03a2335bfca3 |  |
| 2601 | Shopping viral produced via an e-commerce Website animation | kanhamehers | https://x.com/kanhamehers | https://raivcoo.com/media/1f5806bd-477e-4a7f-89d2-79982885846d |  |
| 2701 | Chat Bubble animation by MotionByGolden | MotionByGolden | https://x.com/MotionByGolden | https://raivcoo.com/media/282866be-0731-4599-84cb-731c085d0685 |  |
| 2773 | 2.5D Parallax Transition | tepkaii (Raivcoo staff, Aug 13 2025) | (none) | https://raivcoo.com/media/f41323b1-97b5-4f1f-b5fa-977c05dd9423 |  |
