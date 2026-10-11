# showreel.design: SaaS, product and UI motion catalogue

Researched 2026-10-07. Source: https://showreel.design/ ("A curated archive of the best motion design reels... updated every week". Their About page says every reel is handpicked by the site, with no submissions queue.)

## How this was gathered, and what could and could not be read

- **Method.** I used 15 of the 20 allowed TinyFish `fetch_content` calls, with no browser automation. WebFetch is blocked by the egress proxy for `showreel.design`. Direct curl to the video CDN `video.showreel.design` returns a proxy 403 from this sandbox.
- **Pages read.** I read the homepage and the category, industry, style and sound listing pages: `uiux-motion`, `uiux-motion/2`, `tech-saas` pages 1-4, `launch`, `logo-animation`, `futuristic-tech`, `minimal-clean`, `motion-graphics`, `3d-cgi` and `voiceover-heavy`. I also read `/about`, `/resources`, six `/tag/*` pages, **all 21 `/launch/*` project pages** and **50 `/videos/*` project pages** (71 project pages in total).
- **What each project page exposes.** Each page gives a title, the brand or "by" credit, an optional Studio field (launch pages only), year, category, industry, style tags, sound or music tag, a free-text description, an outbound link and sometimes tags. The real `<video><source src=...>` URL is in the HTML. I extracted it for every page I read. It is the literal `src`, URL-encoded here.
  - The pattern is `https://video.showreel.design/launch/<File>.mp4` or `https://video.showreel.design/videos/<File>.mp4`. Posters are at `https://video.showreel.design/Posters/poster_videos_<File>.jpg`.
  - Each page also lists a mirror source, `https://showreel.design/videos/<File>.mp4`.
  - **I could not test whether these files download** from this sandbox, because the CDN is blocked here.
- **Not readable or not present:**
  - **Durations.** No page states one. The player shows `00:00 / 00:00` until JavaScript loads the video, so no duration is recorded below.
  - **The videos themselves.** I could not watch them. Everything below comes from the site's text and tags, not from the footage.
  - **Studio pages.** There are none. A studio credit is plain text or an outbound link, so I could not browse by studio.
  - **The Studio field.** It is empty on 9 of the 21 launch films. Video pages credit only the "by" author.
  - **Tags.** The tag system is sparse: `/tag/ui` and `/tag/interface` hold 1 item each, and so do `/tag/typography` and `/tag/ai`. Fetching `/tag/product`, `/tag/saas`, `/tag/explainer` and `/tag/kinetic-typography` returned `bot_blocked`, which probably means those pages don't exist.
  - **Logo animations.** I read the 139 titles and their mp4 URLs on the listing page but did not open individual pages.
- **The descriptions are mostly brand or studio bios.** They read like SEO copy ("Renowned for...", "seamlessly...") and rarely describe the film's shots. The few that do describe technique are flagged with **[technique]** below.

## Site taxonomy and counts (as listed on 2026-10-07)

| Facet | Values (count where shown) |
|---|---|
| Total | 243 showreels |
| Category | Motion Graphics (91), 3D / CGI (40), UI/UX Motion (30), Studio / Agency, Branding & Identity, plus separate sections Launch (21) and Logo Animation (139) |
| Industry | Tech & SaaS (93), Advertising & Commercial, Entertainment & Media, Food & Beverage, Education, Fashion & Luxury, Finance & Banking, Sports & Fitness, Automotive, Healthcare, Other |
| Style | Minimal/Clean (53), Futuristic/Tech (36), Bold/Vibrant, Hand-drawn, 3D/CGI, Retro/Vintage, Organic/Natural, Geometric/Abstract, Playful/Quirky, Cinematic/Dramatic, Dark/Moody |
| Sound | Electronic/Synth (dominant), Hip-hop/Urban, Rock/Energetic, Epic/Cinematic, Orchestral/Classical, Jazz/Acoustic, Chill/Ambient, Sound Design Focused, Voiceover Heavy (only 7 reels) |
| URL patterns | `/category/<slug>`, `/industry/<slug>`, `/style/<slug>`, `/sound/<slug>`, `/year/<yyyy>`, `/tag/<slug>`, `/launch/<slug>`, `/videos/<slug>`, pagination `/<facet>/<slug>/<n>` |

---

## Catalogue

### A. Launch films: all 21 on `/launch` (product and brand launch videos)

**1. Figma Motion**
- Brand: Figma. Studio: not credited.
- Launch · 2023 · Tech & SaaS · Bold/Vibrant.
- Page: https://showreel.design/launch/figma-motion
- MP4: https://video.showreel.design/launch/Figma%20Motion.mp4
- **[technique]** "Figma's native animation feature... intuitive timelines, autokeyframes, bezier curves, and AI-driven animation prompts. From micro-interactions and 3D transforms to seamless developer handoffs via CSS, React, or MP4 exports." It is a launch film for a motion tool, so it is likely to show timeline and UI close-ups.

**2. Canva Code 2**
- Brand: Canva. Studio: Canva (in-house).
- Launch · 2026 · Tech & SaaS · Bold/Vibrant.
- Page: https://showreel.design/launch/canva-code-2
- MP4: https://video.showreel.design/launch/Canva%20Code%202.mp4
- Text: a generic product blurb (drag-and-drop editor, AI-powered Canva Code "bridges the gap between creative design and functional development").

**3. Codex Micro**
- Brand: Worklouder (Work Louder). Studio: not credited.
- Launch · 2026 · no industry or style tag.
- Page: https://showreel.design/launch/codex-micro
- MP4: https://video.showreel.design/launch/Codex%20Micro.mp4
- Text: a hardware product launch (AI controller and keyboard): "sleek industrial design, tactile custom keycaps, and seamless software integration".

**4. Tavus Magic Canvas**
- Brand: Tavus. Studio: not credited.
- Launch · 2026 · Tech & SaaS · Minimal/Clean.
- Page: https://showreel.design/launch/tavus-magic-canvas
- MP4: https://video.showreel.design/launch/Tavus%20Magic%20Canvas.mp4
- Text: AI conversational video agents ("PALs") with realistic human video rendering.

**5. Instagram (brand identity launch)**
- Brand: Meta. Studio: Meta.
- Launch · year N/A · Tech & SaaS · Bold/Vibrant + Minimal/Clean.
- Page: https://showreel.design/launch/instagram
- MP4: https://video.showreel.design/launch/Instagram.mp4
- **[technique]** "modernized wordmark, Instagram Sans & Pen typography, refined gradient, and refreshed UI built for creators". This is a typography and identity reveal.

**6. Quiver Ai**
- Brand: Quiver Ai. Studio: **Harshit**.
- Launch · 2026 · Tech & SaaS · Minimal/Clean · tag AI.
- Page: https://showreel.design/launch/quiver-ai
- MP4: https://video.showreel.design/launch/Quiver%20Ai%20by%20Harshit.mp4
- Text: AI models for vector graphics: "generation, editing, and animation of production-ready SVGs—including logos, custom typography, and scalable illustrations".

**7. The Hypernova Terminal**
- Brand: Hypernova. Studio: not credited.
- Launch · 2025 · Tech & SaaS · Minimal/Clean.
- Page: https://showreel.design/launch/the-hypernova-terminal
- MP4: https://video.showreel.design/launch/The%20Hypernova%20Terminal.mp4
- Text: an on-chain crypto prop-trading terminal (a fintech UI product).

**8. Agent28 Launch**
- Brand: Agent28. Studio: **Motionfly**.
- Launch · 2023 · Tech & SaaS · Minimal/Clean · tag AI.
- Page: https://showreel.design/launch/agent28-launch
- MP4: https://video.showreel.design/launch/Agent28.mp4
- Text: "Cursor for video editing". It generates motion graphics, inserts B-roll and removes dead space from natural-language prompts.

**9. Antitype**
- Brand: Antitype. Studio: **Sébastien Deconinck**.
- Launch · 2026 · Tech & SaaS · Bold/Vibrant.
- Page: https://showreel.design/launch/antitype
- MP4: https://video.showreel.design/launch/Antitype.mp4
- Text: a Paris studio's own launch or reel ("high-impact brand reveals", "UX/UI product design" for tech startups such as Bitstack, Nao and Lemrock).

**10. Jurni AI**
- Brand: Jurni AI. Studio: **Alex Socoloff**.
- Launch · 2026 · Tech & SaaS · Minimal/Clean.
- Page: https://showreel.design/launch/jurni-ai
- MP4: https://video.showreel.design/launch/Jurni%20AI%20by%20Alex%20Socoloff%20.mp4
- Text: an agentic e-commerce landing-page product ("persona-matched journeys").

**11. Iconly Pro**
- Brand and studio: **piqostudio**.
- Launch · 2024 · Tech & SaaS · Minimal/Clean + 3D/CGI.
- Page: https://showreel.design/launch/iconly-pro
- MP4: https://video.showreel.design/launch/Iconly%20Pro.mp4
- **[technique]** "40,000 customizable flat, 3D, and animated icons... designed on a standard grid for visual consistency... smooth animations, and high-quality 3D assets".

**12. JTX**
- Brand: JTX (by Jito). Studio: not credited.
- Launch · 2026 · Finance & Banking · Bold/Vibrant.
- Page: https://showreel.design/launch/jtx
- MP4: https://video.showreel.design/launch/JTX.mp4
- Text: a Solana trading engine. Note that the Intently agency lists Jito as a client, but the site does not say Intently made this film.

**13. QuickTables**
- Brand: QuickTables. Studio: not credited.
- Launch · 2026 · no tags.
- Page: https://showreel.design/launch/quicktables
- MP4: https://video.showreel.design/launch/QuickTables.mp4
- Text: a restaurant marketing and retention tool (acquired 10 months after launch).

**14. Spotify for Artists**
- Brand: Spotify. Studio: not credited.
- Launch · 2025 · Entertainment & Media · Bold/Vibrant.
- Page: https://showreel.design/launch/spotify-for-artists
- MP4: https://video.showreel.design/launch/Spotify%20for%20Artists.mp4
- Text: a product dashboard ("real-time audience analytics, custom profile branding tools, editorial playlist pitching").

**15. X Android app**
- Brand: X. Studio field: "Nikita Bier" (X's head of product).
- Launch · 2026 · Tech & SaaS · Minimal/Clean.
- Page: https://showreel.design/launch/x-android-app
- MP4: https://video.showreel.design/launch/X%20Android%20app.mp4
- Text: an app launch: "smoother scrolling, faster loading... Demos highlight fluid navigation and features like pinned topics". This is likely a phone-UI demo.

**16. Zaro Ai**
- Brand: Zaro Ai. Studio: not credited.
- Launch · 2026 · no tags.
- Page: https://showreel.design/launch/zaro-ai
- MP4: https://video.showreel.design/launch/Zaro%20Ai.mp4
- Text: an AI workspace that unifies Slack, Gmail, Google Docs and Notion context, with autonomous agents.

**17. Artlist Studio**
- Brand: Artlist. Studio: Artlist (in-house).
- Launch · 2026 · no tags.
- Page: https://showreel.design/launch/artlist-studio
- MP4: https://video.showreel.design/launch/Artlist%20Studio.mp4
- Text: an AI film production platform ("casting consistent AI characters... directing cinematic shots and framing composition").

**18. Assemble**
- Brand: Assemble. Studio: **Bitmap Studio**.
- Launch · 2026 · no tags.
- Page: https://showreel.design/launch/assemble
- MP4: https://video.showreel.design/launch/Assemble.mp4
- Text: enterprise IT AI that connects Salesforce, NetSuite, ServiceNow and MuleSoft. This is the B2B "integration diagram" type of product.

**19. Brew**
- Brand: Brew. Studio: **Anyway**.
- Launch · 2026 · Tech & SaaS · Minimal/Clean · tag AI.
- Page: https://showreel.design/launch/brew
- MP4: https://video.showreel.design/launch/Brew%20by%20Anyway.mp4
- Text: AI email marketing that learns "a brand's palette, typography, and tone" and "generates on-brand campaigns, designs responsive emails".

**20. Cordex (OpenAI Codex)**
- Brand: OpenAi. Studio: not credited.
- Launch · 2026 · Tech & SaaS · Minimal/Clean.
- Page: https://showreel.design/launch/cordex
- MP4: https://video.showreel.design/launch/Cordex.mp4
- Text: "parallel AI coding agents, automated PR reviews, and seamless terminal and IDE integration". This is a developer-tool launch.

**21. Conveo**
- Brand: Conveo. Studio: **Agio**.
- Launch · 2026 · Tech & SaaS · **Hand-drawn**.
- Page: https://showreel.design/launch/conveo
- MP4: https://video.showreel.design/launch/Conveo.mp4
- Text: an AI consumer-research platform (AI-moderated interviews). It is the only hand-drawn SaaS launch film.

### B. UI/UX motion, SaaS product and technology reels

**22. Jitter Ai**
- By: Jitter.
- UI/UX Motion · 2026 · Tech & SaaS · Minimal/Clean + Futuristic/Tech · **Voiceover Heavy**.
- Page: https://showreel.design/videos/jitter-ai
- MP4: https://video.showreel.design/videos/Jitter%20Ai.mp4
- **[technique]** A web motion tool with "seamless Figma import... export high-quality animations for social media, marketing, ads, and product experiences in just minutes".

**23. X AI: Voice Agent Builder**
- By: X AI (xAI).
- UI/UX Motion · 2026 · Tech & SaaS · Minimal/Clean · **Voiceover Heavy**.
- Page: https://showreel.design/videos/x-ai-voice-agent-builder
- MP4: https://video.showreel.design/videos/X%20Ai%202026.mp4
- Text: a no-code voice-agent builder ("deploy... voice agents in under two minutes", low latency, telephony).

**24. Willow Voice**
- By: Willow Voice.
- UI/UX Motion · 2026 · Tech & SaaS · Minimal/Clean · Electronic/Synth.
- Page: https://showreel.design/videos/willow-voice
- MP4: https://video.showreel.design/videos/Willow%20Voice.mp4
- Text: AI dictation on Mac, Windows and iOS, inside Slack, Gmail and Notion. This is a cross-app UI demo subject.

**25. Loveable design partner, 2026**
- By: Loveable (Lovable).
- UI/UX Motion · 2026 · Tech & SaaS · Bold/Vibrant + Futuristic/Tech · Electronic/Synth.
- Page: https://showreel.design/videos/loveable-design-partner-2026
- MP4: https://video.showreel.design/videos/Loveable%20design%20partner%20-%202026.mp4
- Text: an AI app builder: "describe the app... watch as Lovable generates a working prototype in real time".

**26. DoorDash: Design Connects**
- By: **ILLO**.
- Branding & Identity · 2025 · Tech & SaaS · tags branding, identity, animation, logo.
- Page: https://showreel.design/videos/doordash-design-connects
- MP4: https://video.showreel.design/videos/DoorDash-%20Design%20Connects%20%E2%80%94%20Motion%20design.mp4
- **[technique] This is the richest description on the site:**
  - "abstract, conceptual visual narrative... 'connecting dots'... using flowing lines and expressive typography to guide the story and link people, places, and ideas"
  - "Leveraging DoorDash's vibrant color palette and brand photography"
  - "custom typography, color choices, and even corner radiuses as intentional parts of the story"
  - "a collective voiceover structure"

**27. Brymstudio Showreel**
- By: Brymstudio (the site's "by" field reads "Brymstudio Showreel.mp4", a data quirk).
- UI/UX Motion · 2022 · Tech & SaaS · Minimal/Clean · Electronic/Synth.
- Page: https://showreel.design/videos/brymstudio-showreel
- MP4: https://video.showreel.design/videos/Brymstudio%20Showreel.mp4
- Text: "clean, high-impact product ads and explainer videos for SaaS, AI platforms... translating complex software features into engaging visual stories... slick motion concepts".

**28. LaunchAnything Showreel**
- By: LaunchAnything.
- UI/UX Motion · 2026 · Tech & SaaS · Minimal/Clean · Electronic/Synth.
- Page: https://showreel.design/videos/launchanything-showreel
- MP4: https://video.showreel.design/videos/Launch%20any%20thing%20showreel.mp4
- Text: "premium animated product and launch videos... built around a single outcome: helping audiences instantly grasp a product's value". Clients include Replit and Magic Eden. A sister entry is listed in section C.

**29. Intently 2.0**
- By: Intently Agency.
- UI/UX Motion · 2026 · Tech & SaaS · Minimal/Clean · Electronic/Synth.
- Page: https://showreel.design/videos/intently-2-0
- MP4: https://video.showreel.design/videos/Intently%20Showreel.mp4
- Text: "2D and 3D launch, explainer, and promo videos tailored for FinTech startups (Jito, Umbra, Liquid)... motion graphics that simplify complex financial products".

**30. Wednesday Studio Showreel**
- By: Wednesday Studio.
- Studio/Agency · 2026 · Tech & SaaS · Minimal/Clean + Futuristic/Tech · Electronic/Synth.
- Page: https://showreel.design/videos/wednesday-studio-showreel
- MP4: https://video.showreel.design/videos/Wednesday%20Studio%20Showreel.mp4
- Text: brands for "AI agents, developer tools, and open-source ecosystems". The reel is also pinned in the site's top banner.

**31. Cosmos Studio Showreel**
- By: Cosmos Studio (Kyiv).
- UI/UX Motion · 2026 · Tech & SaaS · Bold/Vibrant · Hip-hop/Urban.
- Page: https://showreel.design/videos/cosmos-studio-showreel
- MP4: https://video.showreel.design/videos/Cosmos%20Studio%20Showreel.mp4
- Text: "emotional, animated interfaces and wow websites that transform complex SaaS products into human, engaging digital experiences".

**32. Riotters Showreel: Web, UI/UX, 3D Motion**
- By: Riotters.
- UI/UX Motion · 2025 · Tech & SaaS · Bold/Vibrant + Futuristic/Tech · Rock/Energetic.
- Page: https://showreel.design/videos/riotters-showreel-web-ui-ux-3d-motion
- MP4: https://video.showreel.design/videos/Riotters-Showreel-Web-UI-UX-3D-Motion.mp4
- Text: "transform complex products into intuitive... experiences that... clearly communicate product value in a heartbeat".

**33. Motion Showreel 2024**
- By: Adrian Van Cooten.
- UI/UX Motion · 2024 · Tech & SaaS · Minimal/Clean · No Sound.
- Page: https://showreel.design/videos/motion-showreel-2024
- MP4: https://video.showreel.design/videos/Adrian%20Van%20Cooten%20Showreel.mp4
- **[technique]** "human-centered AI interfaces, advanced UI/UX motion graphics, and rapid prototyping". Clients include Apple, Google and YouTube.

**34. Bartek Portfolio**
- By: Bartek (shapeshyft).
- UI/UX Motion · 2026 · Tech & SaaS · Minimal/Clean.
- Page: https://showreel.design/videos/bartek-portfolio
- MP4: https://video.showreel.design/videos/Bartek%20Portfolio%20reel.mp4
- **[technique]** "refined interaction details—such as dynamic wallet animations—with strong visual storytelling".

**35. Dogstudio showreel**
- By: Dogstudio.
- UI/UX Motion · year N/A · tags ui, ux, interface, interaction, prototype.
- Page: https://showreel.design/videos/ui-ux-animation-showcase
- MP4: https://video.showreel.design/videos/Dogstudio%20showreel.mp4
- **[technique]** "micro-interactions, transitions, and user experience enhancements for mobile and web applications".

**36. Microsoft 2021-2025**
- By: **NotReal**.
- Motion Graphics · 2025 · Tech & SaaS · Bold/Vibrant + Futuristic/Tech · Electronic/Synth.
- Page: https://showreel.design/videos/microsoft-2021-2025-notreal
- MP4: https://video.showreel.design/videos/Microsoft%20by%20NotReal.mp4
- Text: "3D/CG animation, and motion design... brand stories for... Nike, Microsoft, Google, and Spotify". Creative directors: Milton Gonzalez and Valeria Moreiro.

**37. Lukas Mascher Showreel 2025**
- By: Lukas Mascher (ShortCut, Berlin).
- UI/UX Motion · 2025 · Tech & SaaS · Futuristic/Tech · Electronic/Synth.
- Page: https://showreel.design/videos/lukas-mascher-showreel-2025
- MP4: https://video.showreel.design/videos/Lukas%20Mascher%20Showreel%202025.mp4
- **[technique]** "CGI-based motion design, and digital brand relaunches for... BMW M and Lovable... minimalist aesthetics, precise typography".

**38. Murilo Showreel (typography)**
- By: Murilo Almeida.
- Branding & Identity · 2025 · Bold/Vibrant · Electronic/Synth · tags 2d, 3d, after effects, type, typography, shapes, vector, mograph.
- Page: https://showreel.design/videos/murilo-almeida-murilo-reel
- MP4: https://video.showreel.design/videos/murilo-almeida-murilo-reel.mp4
- **[technique]** "blend 2D vector shapes with 3D elements... Working primarily within After Effects, he leverages keyframes and expressions to drive complex typography and mograph animations... manipulate geometric forms and type". It is the only reel tagged #typography on the site.

**39. Microsoft Surface (3D product)**
- By: Microsoft.
- 3D / CGI · 2026 · Advertising & Commercial · 3D/CGI · Epic/Cinematic.
- Page: https://showreel.design/videos/microsoft-surface
- MP4: https://video.showreel.design/videos/Microsoft%20Surface.mp4
- Text: a hardware hero film for the Surface Laptop Ultra ("15-inch mini-LED PixelSense Ultra touchscreen... NVIDIA silicon").

**40. Figure Product Showcase (3D product)**
- By: Figure.
- 3D / CGI · 2025 · Automotive · 3D/CGI + Futuristic/Tech · Hip-hop/Urban · tags branding, identity, animation, logo.
- Page: https://showreel.design/videos/figure
- MP4: https://video.showreel.design/videos/Figure.mp4
- Text: a one-line generic description ("Creative brand identity animations for modern businesses").

### C. Other project pages read (lower relevance, recorded for completeness)

| Title | By | Cat · Year · Style · Sound | Page | MP4 | Note |
|---|---|---|---|---|---|
| LaunchAnything Branding | LaunchAnything | Branding · 2026 · Minimal/Clean · Electronic | https://showreel.design/videos/launchanything-branding | https://video.showreel.design/videos/Launch%20any%20thing%20branding.mp4 | sister reel to #28 |
| Intently showreel 2026 | Intently | Motion Graphics · 2026 · Minimal/Clean+Futuristic | https://showreel.design/videos/intently-showreel-2026 | https://video.showreel.design/videos/Intently%20showreel%202026.mp4 | "2D/3D Launch, Explainer & Promo videos" for fintech |
| Clay Showreel 2023 | Clay | UI/UX · 2023 · Minimal/Clean · Rock | https://showreel.design/videos/clay-showreel-2023 | https://video.showreel.design/videos/Clay-Showreel-2023.mp4 | UX/branding agency, SF |
| Tubik Studio Showreel 2025 | Tubik Studio | UI/UX · 2025 · Minimal/Clean · Electronic | https://showreel.design/videos/tubik-studio-showreel-2025 | https://video.showreel.design/videos/Tubik%20Studio%20Showreel%202025.mp4 | "interface design, custom illustration, and motion graphics" |
| Tonik Showreel 2026 | Tonik | UI/UX · 2026 · Minimal/Clean · Hip-hop | https://showreel.design/videos/tonik-showreel-2026 | https://video.showreel.design/videos/Tonik%20Showreel.mp4 | YC/Speedrun startups; "retro-futuristic" UX |
| Lime Studio Showreel | Lime Studio | UI/UX · N/A · Minimal/Clean · Hip-hop | https://showreel.design/videos/lime-studio-showreel | https://video.showreel.design/videos/LimeStudio%20Showreel.mp4 | Web3/AI, "complex SaaS dashboards" |
| UI/UX Project Showreel | Orbix | UI/UX · 2026 · Minimal/Clean · Electronic | https://showreel.design/videos/ui-ux-project-showreel-orbix-studio | https://video.showreel.design/videos/UI-UX-Project-Showreel-Orbix-Studio.mp4 | product design agency |
| Orbix showreel 2026 | Orbix | Studio · 2026 · Minimal/Clean | https://showreel.design/videos/orbix-showreel-2026 | https://video.showreel.design/videos/Orbix%20showreel%202026.mp4 | — |
| New Opacity Branding | Opacity | Branding · 2026 · Minimal/Clean · **Voiceover Heavy** | https://showreel.design/videos/new-opacity-branding | https://video.showreel.design/videos/New%20Opacity%20Branding.mp4 | software studio rebrand |
| Ravie's 2025 Showreel | Ravie | UI/UX · 2025 · Bold/Vibrant · Electronic | https://showreel.design/videos/ravie-ravies-2025-showreel | https://video.showreel.design/videos/ravie-ravies-2025-showreel.mp4 | "visual precision and purposeful storytelling" |
| Motionflash Back 2025 | Cheng Ping Li | UI/UX · 2025 · Bold/Vibrant · Electronic | https://showreel.design/videos/motionflash-back-2025-cheng-ping-li | https://video.showreel.design/videos/Motionflash%20Back%202025%20-%20Cheng%20Ping%20Li.mp4 | **[technique]** 2D character animation, "typography, visual storytelling, and 3D Cinema 4D techniques" |
| Vedant Vaishnav 2025 Reel | Vedant Vaishnav | UI/UX · 2025 · Bold/Vibrant · Electronic | https://showreel.design/videos/vedant-vaishnav2025-motion-design-reel | https://video.showreel.design/videos/2026%20Motion%20Design%20Reel%20-%20vedant%20vaishnav%20.mp4 | 2D/3D, character anim; 400+ projects |
| Vivid Motion Showreel | Vivid Motion | UI/UX · 2026 · Futuristic/Tech · Orchestral | https://showreel.design/videos/vivid-motion-showreel | https://video.showreel.design/videos/Vivid%20Motion%20Showreel.mp4 | design + engineering studio |
| Holographik showreel | Holographik | UI/UX · 2026 · Bold/Vibrant+3D/CGI | https://showreel.design/videos/holographik-showreel | https://video.showreel.design/videos/Holographic%20showreel.mp4 | Zagreb; "visual systems" |
| Addition | Addition | UI/UX · 2025 · Minimal/Clean | https://showreel.design/videos/addition | https://video.showreel.design/videos/Addition.mp4 | generative-AI agency |
| .raw showreel | .raw lab | UI/UX · 2025 · Minimal/Clean+Futuristic · Electronic | https://showreel.design/videos/raw-showreel | https://video.showreel.design/videos/raw%20showreel.mp4 | Paris/Ljubljana, no-code |
| Made by Many | Made by Many | Studio · 2025 · Minimal/Clean · Electronic | https://showreel.design/videos/made-by-many | https://video.showreel.design/videos/Made%20by%20Many.mp4 | digital product partner |
| MTV.OS Reel | Charlx | Motion Graphics · 2020 · Bold/Vibrant+Retro · Electronic | https://showreel.design/videos/mtv-os-reel | https://video.showreel.design/videos/MTV.OS%20Reel.mp4 | "OS" interface concept for MTV |
| Alright Studio, Showreel 2026 | Alright Studio | UI/UX · 2026 · Futuristic/Tech · Hip-hop | https://showreel.design/videos/alright-studio-showreel-2026 | https://video.showreel.design/videos/Alright%20Studio%20%E2%80%94%20Showreel%202026.mp4 | "brand, interface, and narrative are inseparable" |
| Outthought Showreel | Outthought | Studio · 2026 · Minimal/Clean | https://showreel.design/videos/outthought-showreel | https://video.showreel.design/videos/Outthought%20Showreel.mp4 | UK brand + UX/UI agency |
| Francesco Prisco Showreel | Francesco Prisco | UI/UX · 2025 · Minimal/Clean | https://showreel.design/videos/francesco-prisco-showreel | https://video.showreel.design/videos/Francesco%20Prisco%20Showreel.mp4 | Awwwards jury; "refined motion and purposeful interaction" |
| Playlist studio Showreel 2025 | Playlist Studio | UI/UX · 2026 · Bold/Vibrant+Futuristic · Epic | https://showreel.design/videos/playlist-studio-showreel-2025 | https://video.showreel.design/videos/Playlist%20studio%20Showreel%202025.mp4 | product design + motion, Brooklyn |
| Athletics, A brand studio | Athletics | UI/UX · 2025 · Bold/Vibrant+Futuristic | https://showreel.design/videos/athletics-a-brand-studio | https://video.showreel.design/videos/Ahleticsnyc.mp4 | brand studio |
| Koto Agency | Koto | Studio · 2026 · Hand-drawn+Retro+Bold · Hip-hop | https://showreel.design/videos/koto-agency | https://video.showreel.design/videos/Koto.mp4 | global brand agency |
| Makemepulse 2021-2022 | Makemepulse | Studio · 2022 · Minimal/Clean+Hand-drawn · Electronic | https://showreel.design/videos/makemepulse-2021-2022-showreel | https://video.showreel.design/videos/Makemepulse%202021-2022%20showreel.mp4 | — |
| FLOW STUDIO SHOWREEL 2025 | Flow Studio | Studio · N/A · tags UX/UI, 3D, AI | https://showreel.design/videos/flow-studio-showreel-2025 | https://video.showreel.design/videos/FLOW%20STUDIO%20SHOWREEL%202025.mp4 | — |
| James Boorman Reel | James Boorman | Motion Graphics · 2026 · Tech & SaaS · Bold/Vibrant+Hand-drawn | https://showreel.design/videos/james-boorman-james-boorman-reel | https://video.showreel.design/videos/james-boorman-james-boorman-reel.mp4 | 2D: "playful character with functional clarity" |
| Animade Reel 2026 | Animade | Motion Graphics · 2026 · Hand-drawn+Bold · Rock | https://showreel.design/videos/animade-animade-reel-2026 | https://video.showreel.design/videos/animade-animade-reel-2026.mp4 | 2D character; part of Duolingo Design Studio |
| Reel Sander van Dijk | Sander van Dijk | 3D/CGI · 2026 · Minimal/Clean · Electronic | https://showreel.design/videos/sander-van-dijk-reel-sander-van-dijk | https://video.showreel.design/videos/sander-van-dijk-reel-sander-van-dijk.mp4 | **[technique]** "precise timing... 2D and 3D... rhythmic impact" |
| Cinema-4D-2026 Showreel | Maxon / Cinema 4D | 3D/CGI · 2023 · 3D/CGI · Electronic | https://showreel.design/videos/cinema-4d-2026-showreel | https://video.showreel.design/videos/Cinema-4D-2026%20Showreel.mp4 | vendor reel (tool showcase) |
| Firm, Studio Product Showreel | Firm (Paris) | 3D/CGI · N/A · 3D/CGI · Jazz | https://showreel.design/videos/firm-studio-product-showreel | https://video.showreel.design/videos/Firm%20-%20Studio%20-%20Produc%20Showreel.mp4 | CG product post-production |

### D. Tech-brand logo animations (titles and mp4 from `/logo-animation`; individual pages not opened)

The pattern is `https://video.showreel.design/Logo%20Animation/<Brand>--<Studio>.mp4`. These are useful for logo-resolve end cards.

- Stackoverflow by Koto: https://video.showreel.design/Logo%20Animation/Stackoverflow--Koto.mp4
- TwelveLabs by Pentagram: https://video.showreel.design/Logo%20Animation/TwelveLabs--Pentagram.mp4
- Framer by galshirart: https://video.showreel.design/Logo%20Animation/Framer%20Logo%20animation--galshirart.mp4
- Tripadvisor by Koto: https://video.showreel.design/Logo%20Animation/Tripadvisor--Koto.mp4
- Microsoft 50th by Koto: https://video.showreel.design/Logo%20Animation/MICROSOFT%2050th--Koto.mp4
- Mozilla by JKR: https://video.showreel.design/Logo%20Animation/Mozilla--JKR.mp4
- Uber by JKR: https://video.showreel.design/Logo%20Animation/Uber--JKR.mp4
- Yahoo by JKR: https://video.showreel.design/Logo%20Animation/Yahoo--JKR.mp4
- Bynder by Verve: https://video.showreel.design/Logo%20Animation/Bynder--Verve.mp4
- The Org by Verve: https://video.showreel.design/Logo%20Animation/The%20Org--Verve.mp4
- Inbox Monster by Verve: https://video.showreel.design/Logo%20Animation/Inbox%20Monster--Verve.mp4
- Zenchef by Verve: https://video.showreel.design/Logo%20Animation/Zenchef--Verve.mp4
- 0x by Tubik Studio: https://video.showreel.design/Logo%20Animation/0x--Tubik%20Studio.mp4
- Otter by Firmalt: https://video.showreel.design/Logo%20Animation/Otter--Firmalt.mp4
- Equals by SomeOne: https://video.showreel.design/Logo%20Animation/Equals--SomeOne.mp4
- Base by bruno: https://video.showreel.design/Logo%20Animation/Base%20logo%20animation--bruno.mp4
- HPE by Siegel+Gale: https://video.showreel.design/Logo%20Animation/HPE--Siegel%2BGale.mp4
- UKG by Lippincott: https://video.showreel.design/Logo%20Animation/UKG--Lippincott.mp4
- Capacity by Pentagram: https://video.showreel.design/Logo%20Animation/Capacity--Pentagram.mp4
- dataland by Pentagram: https://video.showreel.design/Logo%20Animation/dataland--Pentagram.mp4
- Heidi by DixonBaxi: https://video.showreel.design/Logo%20Animation/Heidi--DixonBaxi.mp4
- Tubi by DixonBaxi: https://video.showreel.design/Logo%20Animation/Tubi--DixonBaxi.mp4

**Site sponsor banners.** These are product ads pinned at the top of every page. "Reception by ElevenLabs": https://video.showreel.design/Banner/Elevenlab.mp4. "Framer: Build professional websites with AI": https://video.showreel.design/Banner/Framer3.mp4.

---

## Patterns from text

These come from tags and descriptions only, since I watched no footage.

1. **SaaS launch films are mostly Minimal/Clean.**
   - Of the 21 launch films, 10 carry Minimal/Clean, 6 carry Bold/Vibrant, 1 is Hand-drawn (Conveo, by Agio) and 1 is 3D/CGI (Iconly Pro). Five have no style tag.
   - 14 of 21 are tagged Tech & SaaS.
   - Across the whole UI/UX Motion category (30 reels), the dominant combination is Tech & SaaS + Minimal/Clean + Electronic/Synth.
2. **AI products dominate the launch section.** About 12 of the 21 launch films are AI products: Quiver, Agent28, Brew, Jurni, Zaro, Tavus, Assemble, Conveo, Artlist, Codex, Canva Code, and Figma Motion's "AI-driven animation prompts". Most are dated 2026 (15 of 21).
3. **Who makes them.**
   - Big brands produce in-house: Canva, Meta and Artlist are credited as their own studio.
   - Startups use small specialists or solo motion designers: Motionfly, Bitmap Studio, Anyway, Agio, Harshit, Alex Socoloff and Sébastien Deconinck. Nine films carry no credit.
   - Specialist SaaS and launch studios that show up repeatedly: **Brymstudio**, **LaunchAnything**, **Intently** (fintech), **Wednesday Studio** (AI and dev tools), **Cosmos** (animated SaaS interfaces), **Tonik** (YC startups), **Lime** (Web3 dashboards) and **Riotters**.
4. **The stated goal is clarity of value.** The recurring phrases are "translating complex software features into engaging visual stories" (Brymstudio), "helping audiences instantly grasp a product's value" (LaunchAnything), "clearly communicate product value in a heartbeat" (Riotters), "simplify complex financial products" (Intently) and "transform complex SaaS products into human, engaging" experiences (Cosmos). The implied approach is one idea per beat, with the value proposition stated first.
5. **The UI itself is the subject.** Descriptions mention "micro-interactions, transitions" (Dogstudio), "dynamic wallet animations" and "refined interaction details" (Bartek), "fluid navigation... pinned topics" demos (X Android), "animated interfaces" (Cosmos), "complex SaaS dashboards" (Lime), "intuitive timelines, autokeyframes, bezier curves" (Figma Motion) and "seamless Figma import" (Jitter). The pipeline they imply is design in Figma, then animate in Figma Motion, Jitter or After Effects.
6. **Typography and brand-system details are treated as story elements.**
   - ILLO's DoorDash film uses "flowing lines and expressive typography" to "connect dots", and treats "custom typography, color choices, and even corner radiuses as intentional parts of the story".
   - Instagram's launch centres on the wordmark, the Instagram Sans and Pen typefaces, and a refined gradient.
   - Lukas Mascher's reel is described with "minimalist aesthetics, precise typography".
   - Murilo Almeida drives "complex typography and mograph" with After Effects keyframes and expressions.
7. **Hybrid 2D and 3D.** Phrases include "2D vector shapes with 3D elements" (Murilo), "3D Cinema 4D techniques" mixed with typography (Cheng Ping Li), "CGI-based motion design" (Lukas Mascher), "2D/3D Launch, Explainer & Promo" (Intently) and "3D/CG animation" (NotReal for Microsoft). Hardware products (Surface, Figure, Codex Micro) get full 3D/CGI hero treatment.
8. **Timing and rhythm.** Sander van Dijk is described with "precise timing", "rhythmic impact" and "narrative clarity". Ravie is described with "visual precision and purposeful storytelling".
9. **Sound.**
   - Electronic/Synth is the default for tech and SaaS.
   - Hip-hop/Urban shows up on agency reels (Tonik, Lime, Cosmos, Alright).
   - **Voiceover Heavy is rare (7 reels site-wide)** and goes to product explainers: Jitter, X AI Voice Agent Builder and New Opacity. ILLO used a "collective voiceover structure".
   - Adrian Van Cooten's UI reel is "No Sound".
10. **Tools named on the site.**
    - **After Effects:** Murilo's reel, and in `/resources` the School of Motion course, AEJuice, Envato Elements and Motion Array.
    - **Cinema 4D:** Cheng Ping Li's reel and the Maxon vendor reel. `/resources` mentions "MoGraph" and "Cineware".
    - **Blender:** a Blender 5.2 Showcase reel is listed. `/resources` mentions "geometry nodes, Grease Pencil".
    - **Figma Motion and Jitter:** UI animation with "export to web, Lottie, or video".
    - **Rive:** "interactive UI states".
    - **Spline:** 3D in the browser.
    - **LottieFiles and Bodymovin:** described as the After Effects-to-JSON path.
    - **AI video:** Runway Gen-3 and Motion Brush, Pika 2.0.
    - **ElevenLabs:** voiceovers ("narration for demo reels... without booking studio time").

## Top picks to analyse frame-by-frame (10 SaaS and product examples)

I chose these from metadata only: Tech & SaaS, a real product launch or UI demo, and a named brand or studio where possible. They are worth downloading and checking.

| # | Example | Why | Page | Direct MP4 |
|---|---|---|---|---|
| 1 | Figma Motion (Figma) | Launch film for a UI animation tool. Likely to show timelines, keyframes and UI-to-motion handoff. Bold/Vibrant. | https://showreel.design/launch/figma-motion | https://video.showreel.design/launch/Figma%20Motion.mp4 |
| 2 | Canva Code 2 (Canva, in-house) | Major-brand AI feature launch, 2026, Bold/Vibrant. | https://showreel.design/launch/canva-code-2 | https://video.showreel.design/launch/Canva%20Code%202.mp4 |
| 3 | Brew (studio: Anyway) | AI SaaS, Minimal/Clean, product generates on-brand emails, so expect UI-generation beats. | https://showreel.design/launch/brew | https://video.showreel.design/launch/Brew%20by%20Anyway.mp4 |
| 4 | Assemble (studio: Bitmap Studio) | Enterprise B2B integrations (Salesforce, NetSuite and others), the integration-diagram type of storytelling. | https://showreel.design/launch/assemble | https://video.showreel.design/launch/Assemble.mp4 |
| 5 | Cordex / OpenAI Codex | Developer tool: agents, PR reviews, terminal and IDE. Minimal/Clean. | https://showreel.design/launch/cordex | https://video.showreel.design/launch/Cordex.mp4 |
| 6 | Agent28 Launch (studio: Motionfly) | AI video-editor launch by a credited motion studio. Minimal/Clean. | https://showreel.design/launch/agent28-launch | https://video.showreel.design/launch/Agent28.mp4 |
| 7 | Quiver AI (studio: Harshit) | AI SVG and typography generation, so expect vector and type motion. Minimal/Clean. | https://showreel.design/launch/quiver-ai | https://video.showreel.design/launch/Quiver%20Ai%20by%20Harshit.mp4 |
| 8 | Jurni AI (studio: Alex Socoloff) | AI landing-page product by a credited solo motion designer. Minimal/Clean. | https://showreel.design/launch/jurni-ai | https://video.showreel.design/launch/Jurni%20AI%20by%20Alex%20Socoloff%20.mp4 |
| 9 | Jitter AI (Jitter) | UI/UX motion with heavy voiceover, a good reference for VO-led product explainers. | https://showreel.design/videos/jitter-ai | https://video.showreel.design/videos/Jitter%20Ai.mp4 |
| 10 | X AI: Voice Agent Builder | UI/UX motion with heavy voiceover. A no-code builder demo in the style of ElevenLabs and xAI. | https://showreel.design/videos/x-ai-voice-agent-builder | https://video.showreel.design/videos/X%20Ai%202026.mp4 |

**Alternates:**
- Tavus Magic Canvas: https://video.showreel.design/launch/Tavus%20Magic%20Canvas.mp4
- Conveo by Agio (hand-drawn SaaS): https://video.showreel.design/launch/Conveo.mp4
- Zaro Ai: https://video.showreel.design/launch/Zaro%20Ai.mp4
- Willow Voice: https://video.showreel.design/videos/Willow%20Voice.mp4
- Loveable: https://video.showreel.design/videos/Loveable%20design%20partner%20-%202026.mp4
- DoorDash Design Connects by ILLO, the best technique write-up: https://video.showreel.design/videos/DoorDash-%20Design%20Connects%20%E2%80%94%20Motion%20design.mp4
- X Android app: https://video.showreel.design/launch/X%20Android%20app.mp4
- ElevenLabs "Reception" banner: https://video.showreel.design/Banner/Elevenlab.mp4

**Download note.** Run this from a machine that can reach the CDN; this sandbox cannot. If `video.showreel.design` fails, try the mirror `https://showreel.design/videos/<same encoded file name>`.

```bash
mkdir -p showreel-picks && cd showreel-picks
curl -L -o 01-figma-motion.mp4   "https://video.showreel.design/launch/Figma%20Motion.mp4"
curl -L -o 02-canva-code-2.mp4   "https://video.showreel.design/launch/Canva%20Code%202.mp4"
curl -L -o 03-brew-anyway.mp4    "https://video.showreel.design/launch/Brew%20by%20Anyway.mp4"
curl -L -o 04-assemble.mp4       "https://video.showreel.design/launch/Assemble.mp4"
curl -L -o 05-openai-codex.mp4   "https://video.showreel.design/launch/Cordex.mp4"
curl -L -o 06-agent28.mp4        "https://video.showreel.design/launch/Agent28.mp4"
curl -L -o 07-quiver-ai.mp4      "https://video.showreel.design/launch/Quiver%20Ai%20by%20Harshit.mp4"
curl -L -o 08-jurni-ai.mp4       "https://video.showreel.design/launch/Jurni%20AI%20by%20Alex%20Socoloff%20.mp4"
curl -L -o 09-jitter-ai.mp4      "https://video.showreel.design/videos/Jitter%20Ai.mp4"
curl -L -o 10-xai-voice-agent.mp4 "https://video.showreel.design/videos/X%20Ai%202026.mp4"
```

**Copyright.** The site's About page states that all videos remain the property of their creators and studios. Keep downloads for private study and reference.
