# Award-winning & acclaimed 2D / 2.5D motion work, 13 Apr – 13 Oct 2026

Research date: 2026-10-13. The window is **2026-04-13 → 2026-10-13**. An item qualifies if it was **published** in the window, or **awarded** in the window, or both. Each "Date" line names which applies.

Target brief: MAPS Global Markets, "Now invest in US Stocks". A 30 s fintech launch spot in a painted-paper/collage style, using an orange/navy/cream palette and a 150 BPM track, rendered in code (React/Remotion, SVG/WebGL).

## Method and how far to trust it

- **Sources swept:**
  - Award sites: Cannes Lions (lovethework, shots, LBB), D&AD archive, One Show, ADC (oneclub, plus the unblock.coffee aggregator), Clio winners gallery, Webby gallery, and Annecy (Zippy Frames).
  - Craft press: Motionographer Quickies/News, STASH (Advertising, Illustration, Motion Design feeds), It's Nice That, Skwigly, Creative Salon.
  - Studio sites: Giant Ant, Blinkink (via LinkedIn), and others.
- **How dates were checked:** every date comes from the source page's own metadata (`article:published_time` or the byline date) or from the award announcement date. I did not use dates from search snippets.
- **Craft descriptions:** I could not play the videos (the sandbox has no video playback). The breakdowns are built from the source write-ups, credits and still frames.
  - Statements marked **(src)** are the source's own description.
  - Statements marked **(inf)** are my reading of stills and credits. Confirm these by watching before you copy anything frame-for-frame.
- **Rejected for date:**
  - Giant Ant × Koho "Metal" (product launch, 2024).
  - Giant Ant × TVFCU (Super Bowl, Feb 2026).
  - Giant Ant × OpenTable 2026 campaign: no in-window date found. Its Vimeo IDs suggest early 2026.
  - Isabel Garrett's GBBO "aBakening" trailer (Sept 2025). Its D&AD Wood Pencil came in May 2026, but I left it out in favour of her Loewe film, which was published in the window.
  - Revolut "Your Way In" (no date found).
- **Not yet awarded in the window:**
  - Motion Awards X: entries are open and it combines 2025 and 2026 work.
  - UKMVAs 2026 and Ciclope Berlin 2026: both are usually held in Oct/Nov.
  - Nothing from these three could be verified as awarded before 13 Oct.

---

## A. Fintech, banking and investing (priority 1)

### 1. Coinbase — "Your Way Out"
- **Studio / agency:** Isle of Any (agency); director Oscar Hudson; MJZ and Selected Works (production).
- **Client:** Coinbase.
- **Date:** premiered at the Oscars in March 2026, which is outside the window. **Awarded in the window:**
  - D&AD **2 Black Pencils** (production design and VFX; winners announced May 2026, archive page dated 22 May 2026).
  - **Cannes Lions 2026 Film Craft Grand Prix**, plus Gold for Production Design and Silver for Achievement in Production (announced 23–24 June 2026).
- **URLs:**
  - https://www.dandad.org/work/d-ad-awards-archive/your-way-out
  - https://www.lovethework.com/en/awards/winners-shortlists/cannes-lions/film-craft?tag=publication+dates%40%40year%40%402026
  - https://www.stashmedia.tv/ive-gotta-be-me-heres-how-oscar-hudson-made-npcs-into-real-characters-for-coinbase/
- **Craft:**
  - (src) The world is built like a low-poly early-console video game, shot almost entirely in camera. Faces were reprinted onto masks, sets were pixelated and seen from an isometric camera, and suit details were 2D-printed. The world is deliberately shadowless, and extras were choreographed to walk like NPCs.
  - (src) The "game" look gradually gives way to reality as the hero breaks out. The transition is the story: a style shift equals financial freedom.
- **What to steal:**
  - Treat **the style change itself as the product benefit.** Open on a flat, looping, "locked" world (repetitive, mechanical motion with tight, robotic easing). When "Now invest in US Stocks" lands, break into organic, hand-made paper texture with springy motion.
  - In Remotion, run two easing regimes: linear/stepped (`steps()` style, on 2s) in act one, then `spring()` with overshoot in act two.
  - Shadowless flat fills in act one, then drop shadows and paper grain switch on at the turn.

### 2. Alliance Witan (UK investment trust) — "Cyclist"
- **Studio / agency:** Studio AKA; director Kristian Andrews; illustrator Charlie Davis; agency Libertine London.
- **Date:** **published 27 May 2026** (STASH).
- **URL:** https://www.stashmedia.tv/spinning-wheels-kristian-andrews-and-studio-aka-keep-alliance-witan-moving/
- **Craft:**
  - (src) Evokes 20th-century modernist travel posters. Built as an After Effects 3D previs combined with Moho's 2D IK rigging.
  - (inf, from stills) Flat colour planes, a limited palette (greens, sky blue, cream) and a long winding-road composition. The camera travels along the path, so the parallax is 2.5D.
  - The metaphor is "keep moving": long-term investing as a journey.
- **What to steal:** this is the closest acclaimed reference to an *investing* launch in flat poster style.
  - Copy the **poster-plate parallax**: 4–6 flat SVG layers at different `translateX` rates under one camera move.
  - Copy the **path-as-chart idea**: the road curve doubles as a rising stock line.
  - The modernist poster typography (geometric sans, generous tracking) suits a cream background with a navy headline.

### 3. Pay.UK Current Account Switch Service — "Call the Shots: Level Up"
- **Studio / agency:** Wonderhood Studios (agency); PRETTYBIRD (director Femi Oladigbolu); animation by Eddy Production & Eddy Studio (2D and 3D); motion graphics by Joshua Westwell.
- **Date:** **launched 11 Sept 2026; article dated 17 Sept 2026.**
- **URL:** https://creative.salon/articles/work/pay-uk-call-the-shots-wonderhood-studios
- **Craft:**
  - (src) A music-video ad aimed at 18–24s: live action blended with 2D and 3D animation, plus game-inspired "level up" worlds.
  - (src) The brief deliberately avoids financial-services advertising conventions; the line is "behave like a music release". The track carries the product mechanics in its lyrics.
- **What to steal:**
  - **Let the track carry the message.** Cut every scene change on the 150 BPM downbeat (one bar = 1.6 s = 48 f at 30 fps).
  - Use "level-up" UI motifs: XP bars and progress fills as visual grammar for portfolio growth. These are simple `scaleX` fills in SVG.

### 4. McAlvany Wealth Management — webinar promo ("erasing" the US dollar)
- **Studio / agency:** Emberscope Studios; director/animator Roman White; agency Fire Kite; music by Singing Serpent.
- **Date:** **published 24 July 2026** (STASH).
- **URL:** https://www.stashmedia.tv/roman-white-emberscope-tastefully-erase-the-us-dollar/
- **Craft:**
  - (src) The engraving of a US one-dollar bill is carefully "defaced" and erased to lure viewers to a wealth-management webinar.
  - (inf, from still) Macro framing on the banknote guilloche and engraving linework, in monochrome.
- **What to steal:** this is directly on-topic for "US stocks".
  - Use **US-currency engraving texture** (guilloche, fine-line hatching) as a mask or reveal layer.
  - In SVG, animate `stroke-dashoffset` on engraved linework to "draw" or "erase" the dollar.
  - Put a navy engraving over cream paper, then wipe in orange cut-paper shapes as the "new" layer.

### 5. Admiral Insurance — "Ready for Anything"
- **Studio / agency:** Studio AKA; director Steve Small; agency McCann Bristol.
- **Date:** **released ~1 May 2026** (LBB listing); Motionographer post dated 8 June 2026.
- **URL:** https://motionographer.com/news/studio-aka-and-mccann-bristol-announce-admiral-insurances-latest-spot-ready-for-anything/
- **Craft:**
  - (src) A character-led CG world (Admouth) that is cosy and episodic. It is the first instalment of a series with returning characters, Annie and Alfie.
  - (inf) Stylised soft CG with a storybook palette. It is the least relevant to 2D, but it is a current financial-services animation benchmark.
- **What to steal:**
  - **Episodic structure for financial brands**: one product truth per spot, with a recurring helper character.
  - For MAPS, a recurring cut-paper "guide" shape (for example an orange arrow or folded-paper bull) could carry future spots.

### 6. Crumb — "Lucky Break" (fintech spec, 15 s)
- **Studio:** Crumb (Stanko Stupar, Dunja Krasic); music and sound by Giovanni Dubini.
- **Date:** **published 23 Aug 2026** (STASH).
- **URL:** https://www.stashmedia.tv/crumb-surfs-the-fintech-wave-with-new-spec-spot/
- **Craft:**
  - (src) 15 s of CG: a tiny plastic surfer rides a wave of coins. Macro shots, highly detailed Substance textures, simulated falling coins and careful edit choices.
  - Warm sunset palette and gold.
- **What to steal:**
  - This is a **15 s structure template**: a single visual metaphor (riding the market wave), macro scale and one gag.
  - In 2D: a cut-paper surfer on a paper wave made of stacked chart lines. Use 3–4 sine layers with offset phase in SVG `path` animation. Coins can be a cheap particle system of paper circles.

### 7. Equip Super — "Super Equipped" (superannuation TVC)
- **Studio / agency:** Lumberfly (Hen Beeman & Josh Thomas); agency Cummins & Partners; production by Pixel; sound by Echo Darling.
- **Date:** **published 6 Aug 2026** (Motionographer).
- **URL:** https://motionographer.com/quickie/equip-super-super-equipped-lumberfly/
- **Craft:**
  - (src) A character-driven, semi-realistic stylised 3D TVC: a hapless chicken helped by a detail-oriented octopus.
  - (src) 2D concepting first, hand sculpting, and a grapefruit-skin texture for the octopus. It is deliberately not "kids' show".
- **What to steal:**
  - **Tone calibration for finance**: playful but not childish.
  - The "detail-oriented helper" idea maps to a MAPS feature (research, fractional shares). In 2D, give the helper character precise, snappy motion and give the "user" loose, floppy motion.

---

## B. Award winners in the window (craft benchmarks)

### 8. Intermarché — "Unloved" (Le mal-aimé)
- **Studio / agency:** Illogic Studios (directors Victor Caire, Lucas Navarro, Théophile Dufresne); Romance (agency); WIZZ (producer).
- **Date:** released Dec 2025, outside the window. **Awarded in the window:**
  - **ADC 2026 Motion & Film Craft Grand Prix** (ADC, May 2026).
  - **Annecy 2026 Cristal for a Commissioned Film**, plus the Jury Award for a TV Series (Zippy Frames, 28 June 2026).
  - Webby 2026 Animation (Branded) listing.
- **URLs:**
  - https://www.zippyframes.com/festivals/annecy-winners-2026
  - https://www.unblock.coffee/awards/adc/2026/motion-and-film-craft/
- **Craft:**
  - (inf) Feature-quality stylised 3D character animation with a painterly storybook finish. Long emotional beats and a fable structure.
- **What to steal:**
  - **Hold time.** Award juries in 2026 rewarded films that let a frame breathe.
  - In a 30 s spot, give the hero line ("Now invest in US Stocks") at least 2 full bars (3.2 s at 150 BPM) on screen with only secondary motion.

### 9. Fuck Cancer × VML Health — "Beat Cancer Off"
- **Studio:** Dirty Work (São Paulo); directors Gustavo Leal & Faga Melo; music by Jamute.
- **Date:** **awarded in the window**:
  - **Cannes Lions 2026 Film Craft Silver (Animation)**, plus two Entertainment Golds, further Silvers and Bronzes (June 2026).
  - NYF Grand Prix (June 2026).
  - Skwigly article dated 9 July 2026.
- **URL:** https://www.skwigly.co.uk/dirty-work-blends-mixed-media-craft-in-award-winning-beat-cancer-off/
- **Craft:**
  - (src) Mixed media: traditional 2D, **cut-out animation**, 3D, puppetry and live action.
  - (src) There are 21 vignettes, each with a technique chosen to match a culture's idiom. The look is retro, handmade and modern, cut to a retro-inspired original track.
- **What to steal:**
  - **A vignette rapid-fire built on the beat**: e.g. 8 one-bar vignettes (1.6 s each), each in a slightly different paper treatment (torn edge, halftone print, painted card, newsprint).
  - This is the best 2026 proof that cut-out collage plus a punchy track wins juries.

### 10. The Ring Magazine — "The Legacy Continues"
- **Studio / agency:** COLOSSAL (director YUCA), with The Youth (production) and BigTime Creative Shop (agency, Riyadh).
- **Date:** launched 28 Jan 2026, outside the window. **Awarded in the window:** **Cannes Lions 2026 Film Craft Silver, Animation** (June 2026).
- **URL:** https://musebyclios.com/sports/boxing-mag-opens-its-archive-with-animated-campaign/
- **Craft:**
  - (src) A two-minute film mixing about ten techniques: charcoal sketch, claymation, hand-drawn 2D, 3D, **mixed-media collage**, archival footage and "experimental transitions". The camera moves through a museum of recreated memorabilia, with handmade miniature sets plus digital compositing.
- **What to steal:**
  - **Archive-to-collage transitions**: a still image (ticker tape, an NYSE facade, a stock certificate) gets "cut out" and becomes the next scene's set piece.
  - In Remotion, animate a `clip-path` polygon with jittered vertices for a hand-scissored edge, then let the cut piece fly forward.

### 11. Kodansha — "LIGHT HOLE"
- **Studio:** Geek Pictures, Tokyo; director Toru Katori.
- **Date:** released 6 Mar 2026, outside the window. **Awarded in the window:** **Cannes Lions 2026 Film Craft Bronze, Animation** (Geek Pictures press release, 29 June 2026).
- **URL:** https://kodansha.us/2026/03/06/experience-kodanshas-new-branded-animated-film/
- **Craft:**
  - (src) Live action plus **papercraft stop-motion**. A "light hole" portal opens from a book into paper story-worlds referencing more than 100 Kodansha titles.
- **What to steal:**
  - **A portal or aperture transition in paper**: a circular hole torn in the cream paper reveals the next layer (a US-market skyline in navy and orange).
  - Build it as an SVG mask whose radius scales on a downbeat, with an inner shadow (feGaussianBlur on an offset copy) to sell paper thickness.

### 12. Second Nurture × Klick Health — "18 Months"
- **Studio:** Zombie Studio (directors Paulo Garcia, Natalia Gouvea); music by Christina Perri / Jamute.
- **Date:** released 2025, outside the window. **Awarded in the window:**
  - **Webby 2026 Animation (Branded) winner** (announced 21 Apr 2026).
  - **Clio 2026 Gold, Film Craft** (12 May 2026).
  - ADC 2026 Gold and Silver.
- **URL:** https://www.stashmedia.tv/zombie-studio-helps-second-nurture-celebrate-adoptive-families
- **Craft:**
  - (src) Stop-motion combined with 2D, 3D and **real-time projection** onto sets.
- **What to steal:**
  - **Projected 2D on physical texture**: in code, multiply-blend crisp vector animation over a scanned paper or board texture so the line work looks printed onto the material.
  - Use `mix-blend-mode: multiply` with a high-resolution cream paper scan.

### 13. BBC Sport — "Trails Will Blaze" (Milano Cortina 2026 titles)
- **Studio / agency:** NOMINT (director Yannis Konstantinidis) with BBC Creative.
- **Date:** released late Jan 2026, outside the window. **Awarded in the window:**
  - **One Show 2026 Gold Pencil, Craft/Animation** (May 2026).
  - ADC 2026 Gold, Silver and Bronze.
  - Clio 2026 Grand.
- **URLs:**
  - https://www.oneclub.org/awards/theoneshow/
  - https://www.newscaststudio.com/2026/02/13/bbc-2026-winter-olympics-main-titles/
- **Craft:**
  - (src) About 700 3D-printed athletes on scale models of the Dolomites. All fire is practical and frame-by-frame, using 14 combustion techniques. Set to Verdi's Requiem.
- **What to steal:** **A single-element trail as the through-line**. One orange line (a stock chart) "burns" across every scene and links the cuts. In SVG this is an animated `stroke-dashoffset` with a glowing head (a radial gradient dot) and ember particles.

### 14. Clash Royale (Supercell) × Uncommon — "Die Balloons!" (Die Ballons!)
- **Studio:** Blinkink; director Sam Gainsborough. Some credits name Mateus de Paula Santos; verify.
- **Date:** **awarded in the window**: D&AD 2026 **Yellow Pencil, Animation / Mixed Media**. Winners were announced in May 2026; the LinkedIn post is dated 27 May 2026.
- **URLs:**
  - https://www.linkedin.com/posts/bart-yates-95ab396a_our-studio-bagged-four-dad-pencils-across-activity-7465363196300804097-Nktf
  - https://www.adobomagazine.com/events/why-they-won-dad-yellow-pencils-showcase-takes-the-jury-outside-the-room/
- **Craft:**
  - (src) Shot in camera with about 10,000 balloons. Mixed-media animation and the Animation Jury's pick.
- **What to steal:** **Physical-feeling squash and stretch on simple primitives.** Apply volume-preserving `scaleX`/`scaleY` (sx·sy ≈ 1) to paper circles and coins on each kick drum.

### 15. Cerveza Victoria (AB InBev) — "Who's Waiting for You?"
- **Studio / agency:** COLOSSAL / YUCA; Wieden+Kennedy Mexico.
- **Date:** **awarded in the window**: D&AD 2026, Animation category. The archive page is dated 20 May 2026. The Pencil level was not shown on the public page.
- **URL:** https://www.dandad.org/work/d-ad-awards-archive/whos-waiting-for-you
- **Craft:**
  - (src) A Day of the Dead fable about the Xoloitzcuintli dog guiding souls. It is "crafted 100% by hand" and is the first animated film made by a beer brand.
- **What to steal:**
  - **"100% by hand" as a selling point.** In 2026, judges and the craft press keep rewarding visible handmade marks over AI-smooth gloss.
  - Bake in hand-made imperfection: boil the line (re-randomise vertex jitter every 2–3 frames), use uneven paper edges and slight registration offsets between colour layers.

### 16. FCB Chicago — "Caption With Intention"
- **Studio / agency:** FCB Chicago with Chicago Hearing Society and Rakish; animation partner Pes Motion Studio.
- **Date:** campaign from 2024–25, outside the window. **Awarded in the window:**
  - **Clio 2026 Gold (Design)** (12 May 2026).
  - **ADC 2026 Gold** (Motion & Film Craft).
  - **One Show 2026**: multiple Golds, including Moving Image Craft (May 2026).
- **URLs:**
  - https://clios.com/winners-gallery/details/209050
  - https://www.unblock.coffee/awards/adc/2026/motion-and-film-craft/
- **Craft:**
  - (src) A captioning system that uses **animation, colour and variable typography** to convey emotion, tone and pacing, not just dialogue.
- **What to steal:** this is the 2026 benchmark for kinetic type.
  - Drive **variable-font axes (weight and width) from the audio envelope**. In Remotion, use `@remotion/media-utils` `visualizeAudio()` to map amplitude to `font-variation-settings: 'wght'`.
  - "US Stocks" can pulse heavier on kicks. Colour-code emphasis: orange for the key words, navy for the rest.

### 17. Apple TV — "ATV Rebrand" (animated logo)
- **Studio / agency:** Optical Arts with TBWA\Media Arts Lab and OYOY.
- **Date:** brand launched Oct 2025, outside the window. **Awarded in the window:** ADC 2026, Motion/Film Craft (Animated Logo and Cinematography entries). It is listed as Gold on unblock.coffee, but the medal level is unconfirmed on oneclub. It's Nice That studio profile dated 2 Sept 2026.
- **URL:** https://www.itsnicethat.com/articles/optical-arts-advertisements-and-idents-film-animation-project-020926
- **Craft:**
  - (src) The logo is captured fully in camera with real glass and lights, then refined in post.
  - (src) The studio's philosophy: "a camera move is used to enhance and not to hide; three lights can be reduced to one", and an edit that "lingers on a shot a little longer".
- **What to steal:** **Logo end card restraint.** One light sweep across the MAPS mark (a moving linear-gradient mask), one slow push-in, and nothing else. Hold it for the final 2 bars.

---

## C. Fresh 2D, collage and editorial work (priority 3–4)

### 18. HBO Originals — "U.S. Against the World" (titles and graphics package)
- **Studio / agency:** Good Secrets; CD Lucas Harger (Outpost); Park Stories.
- **Date:** **published 21 Sept 2026** (Motionographer).
- **URL:** https://motionographer.com/quickie/u-s-against-the-world-good-secrets/
- **Craft:**
  - (src) A handcrafted language of **scratched film, collage and graffiti**: "seventy percent hip hop, thirty percent punk rock".
  - (src) It runs through the full package: callouts, custom maps, game clocks, scorecards and archival treatments, with spray-paint splatter used as punctuation.
- **What to steal:**
  - This is the strongest 2026 reference for **collage applied to data graphics**: the scorecards and clocks are directly analogous to tickers and price cards.
  - Build price cards as torn-paper rectangles with a stamped or stencilled number.
  - Add a scratch overlay: a vertical line texture at 8–12 % opacity, re-seeded every frame.
  - Use splatter decals on downbeats.

### 19. Arsenal FC — "Welcome to the Arsenal State of Mind" (26/27 third kit)
- **Studio:** Nexus Studios; director Fx Goby; art director Callum Strachan; sound by Brain Audio.
- **Date:** **published 4 Aug 2026** (STASH).
- **URL:** https://www.stashmedia.tv/fx-goby-nexus-welcome-you-to-the-arsenal-state-of-mind/
- **Craft:**
  - (src) Live-action talent (Adwoa Aboah) and her 2D avatar wander North London as it turns into a playful **mixed-media world**.
  - (src) "Looking to avoid an overly-polished look, inspiration was drawn from **editorial illustration and the imperfect marks of a sketchbook**."
  - (inf, from still) Radiating yellow rays and blue streak marks, with flat peach/white shapes.
- **What to steal:**
  - **Radiating "glow" ray bursts behind the hero** (rotating SVG wedges, 6–12 rays).
  - **Sketchbook marks**: hand-drawn underline swashes that draw on under the key words.

### 20. Loewe — 180th anniversary film
- **Studio:** Blinkink; director Isabel Garrett; lead illustrator Joanna Blémont; animation by Bonsoir; VO Antonio Banderas; composer Frédéric Sanchez.
- **Date:** **published 1 June 2026** (STASH).
- **URL:** https://www.stashmedia.tv/isabel-garrett-blinkink-paint-the-town-for-loewes-180th/
- **Craft:**
  - (src) About **2,000 hand-painted frames in acrylics and oil sticks**, painted in layers "with as little digital intervention as possible". The film runs as a continuous loop.
  - (inf) Visible brush texture changes every frame (paint boil), with a bold, flat-ish palette.
- **What to steal:** this is the closest acclaimed match to "painted paper".
  - **Fake paint boil cheaply**: keep 3 pre-rendered paint-texture variants per shape and cycle them on 2s (`Math.floor(frame/2)%3`) as an SVG `<pattern>` or `<image>` fill.
  - **Loop the ending** so it hands back to the opening frame for social autoplay.

### 21. Telstra — "Wish You Happy Internetting" (10 spots)
- **Studio / agency:** Mathematic (Paris), director Mathieu Betard; illustrator Dave Arcade; agency Bear Meets Eagle On Fire / +61; sound by Rumble Studios.
- **Date:** **published 18 Sept 2026** (STASH).
- **URL:** https://www.stashmedia.tv/mathematic-dave-arcade-wish-you-happy-internetting/
- **Craft:**
  - (src) Ten "slices of tasty **isometric maximalism**": dense illustrated rooms full of objects.
  - (inf) Each spot is a single isometric diorama that fills up with detail.
- **What to steal:**
  - **An isometric "portfolio room"** that fills with US-company icons as the voiceover lists stocks. Each item pops in with a 3-frame overshoot, one item per beat (150 BPM gives 0.4 s per beat, 12 f at 30 fps).

### 22. Spotify — "Mix" tools product film
- **Studio:** BUCK.
- **Date:** **published 20 May 2026** (STASH).
- **URL:** https://www.stashmedia.tv/buck-follows-the-flow-in-new-film-for-spotify-mix-tools/
- **Craft:**
  - (src) A **retro 2D airbrush** look with neon. A spaceship travels through three worlds, each tied to a track. It is a product feature launch (DJ-style mixing).
  - (inf, from still) An orange-pink gradient sky, geometric buildings and floating cubes.
- **What to steal:**
  - **A product-feature launch as a three-world journey**: Discover → Buy → Hold in 10 s each.
  - **Airbrush gradients**: soft radial-gradient glows. This is also a good contrast layer to cut paper; use a grainy airbrush sky behind crisp paper cut-outs.

### 23. NCAA — "Draw the Line"
- **Studio / agency:** Fern (animation); The Basement (agency); music and sound by The Chicken.
- **Date:** **published 28 May 2026** (Motionographer).
- **URL:** https://motionographer.com/quickie/ncaas-draw-the-line-the-basement/
- **Craft:**
  - (src) Fully animated, with no game footage. It visualises DMs, digital pile-ons and sports-betting money pressure, which are things that live "behind screens". It uses six illustrators.
- **What to steal:**
  - **UI-as-illustration**: phone notifications and DMs drawn in the same illustrated hand as the world, not as screenshots.
  - For MAPS, draw the app's buy confirmation ("Order filled: AAPL") as a cut-paper card rather than a UI capture.

### 24. Kikkoman — "Unleash Legendary"
- **Studio / agency:** Hornet; director Clubcamping; artist Agustín Graham Nakamura; live action by Jenna Gang; agency BSSP.
- **Date:** **published 1 July 2026** (Motionographer).
- **URL:** https://motionographer.com/quickie/kikkoman-unleash-legendary-hornet/
- **Craft:**
  - (src) Shonen-anime 2D action combined with live-action food photography, using "artful, hand-made sensibilities".
- **What to steal:**
  - **Anime impact frames** on the key moment: speed lines, a white flash frame and a 2-frame hold. Use them on the "Buy" tap.
  - Radial speed lines are trivial in SVG (rotated thin triangles).

### 25. Bremont × Felix the Cat — "Watch your 6!"
- **Studio:** Cub Studio; director Fraser Davidson.
- **Date:** **published 5 Oct 2026** (Motionographer).
- **URL:** https://motionographer.com/quickie/watch-your-6-cub-studio/
- **Craft:**
  - (src) A product launch suite: teasers, stills, taxi liveries, looping GIFs, social cut-downs and a **30-second hero animation**. A heist story keeps classic Felix movement while he interacts with a rendered watch.
- **What to steal:**
  - **The launch deliverable system**: one 30 s hero spot plus 6 s/15 s loops cut from the same timeline.
  - In Remotion, define one `<Composition>` per cut, sharing scene components with different `from`/`durationInFrames`.
  - **Classic 2D character plus a hero product rendered crisp**: the MAPS app UI stays crisp vector while everything around it is paper.

### 26. Birdie (air-quality monitor) — launch film
- **Studio:** Ribbit (Scandinavia).
- **Date:** **published 9 Sept 2026** (Motionographer).
- **URL:** https://motionographer.com/quickie/birdie-ribbit/
- **Craft:**
  - (src) Metaphor rather than a product demo. Dynamic, imaginative scenes visualise sensing and communicating, keeping the product "mysterious and desirable". Scandinavian aesthetic.
- **What to steal:** **Metaphor over demo**. Show "access to US markets" as a paper door or bridge opening from home to Wall Street, and keep the literal app UI to one or two beats only.

### 27. Margo's Got Money Troubles — title sequence (Apple TV / A24)
- **Studio:** Peter Anderson Studio; music: Robyn, "Blow My Mind".
- **Date:** **published 29 June 2026** (Motionographer).
- **URL:** https://motionographer.com/quickie/margos-got-money-troubles-title-sequence-peter-anderson-studio/
- **Craft:**
  - (src) An "Assault Course of Life": **overdue bills become skyscrapers**, sunglasses become a tunnel of eyes and swinging gavels threaten progress.
  - (src) A DIY, fully physical set of hundreds of modular tiles with practical lights and mechanical rigs, plus a CG Margo.
- **What to steal:**
  - **Money paperwork as architecture**: stacks of stock certificates or receipts rise into a paper NYC skyline.
  - In code, animate rects with `scaleY` from the bottom with staggered spring delays to make a skyline that grows bar by bar, like a bar chart.

### 28. Calm Health — employer platform film
- **Studio:** Coat of Arms; composer and sound designer Matt Stanfield (Wave & Field).
- **Date:** **published 11 June 2026** (Motionographer).
- **URL:** https://motionographer.com/quickie/calm-health-app-coat-of-arms/
- **Craft:**
  - (src) Two illustrated 2D explainer films for a B2B health product, with a team of three art directors and designers.
- **What to steal:** **A clear, calm explainer structure** for regulated categories (health and finance): one claim per scene, plus VO-led pacing. Useful for a compliance-safe MAPS cut-down.

### 29. Coachella 2026 visual identity
- **Studio:** Hornet; director Andrea Love.
- **Date:** **published 6 July 2026** (Motionographer).
- **URL:** https://motionographer.com/quickie/coachella-2026-visual-identity-hornet/
- **Craft:**
  - (src) Andrea Love's signature **wool/felt stop-motion** for a festival identity.
- **What to steal:** **Material texture as the brand.** Choose one material (painted paper) and commit to it everywhere: type, UI, logo and transitions. Fibre or grain displacement via SVG `feTurbulence` + `feDisplacementMap` at low scale (1–2 px) gives the edges a "material" wobble.

### 30. Apple — Mac mini launch spot (40 s)
- **Studio / agency:** Blinkink; director Nicos Livesey; TBWA\Media Arts Lab; service by Stoopid Buddy Stoodios; music and sound by Racket Club.
- **Date:** **published 26 Aug 2026** (STASH).
- **URL:** https://www.stashmedia.tv/nicos-livesey-blinkink-muscle-up-for-mighty-mac-mini/
- **Craft:**
  - (src) A 40-second "blast of frenetic fun": claymation and stop motion.
  - (inf, from still) The product sprouts a brain and robot arms juggling a pie chart, joystick, synth and chalkboard, i.e. a multitasking montage.
- **What to steal:**
  - **"Product sprouts abilities" montage**: the MAPS phone grows paper arms that grab US-company logos, a chart and a dollar.
  - **Frenetic pacing on 2s with snappy holds**: this is the right energy for 150 BPM.

---

## D. Studio and community signals (context, not ranked)

- **It's Nice That (Sept 2026)** has an active "Collage" tag, plus pieces on handmade studios (Optical Arts, Alistair Nicholls). The editorial theme across 2026 coverage is **"handmade versus AI-smooth"**.
- **The Cannes 2026 jury narrative** (shots, 24 June 2026) was "a return to slow processes, traditional craft and human connection".
- **D&AD's 2026 AI & Creativity Report** (Aug 2026): 44.7 % of AI-declaring Pencil winners used generative AI, against 56.2 % of AI-declaring entries overall. Juries skew towards visible human craft.
- **Ordinary Folk "Rio 40°"** (STASH, 21 Sept 2026): an in-house 2D short. No craft details on the page; worth watching for colour and timing.
- **Giant Ant "Optimizely: Tales of Mark Eting"** (2026; no exact date on the page, so the window is unverified): pushed perspectives and "multiplication glitches", with near-static character performance ("the world's best marketer barely moves"). This is a good gag technique if verified.

---

## Top techniques ranked for the MAPS 30 s "Now invest in US Stocks" spot
(Painted-paper/collage look, orange/navy/cream palette, 150 BPM = 0.4 s per beat = 12 f at 30 fps; 1 bar = 48 f; 30 s ≈ 18.75 bars.)

1. **Style break as the benefit** (Coinbase "Your Way Out"). Act one is a flat, stepped, "locked" world; at the line "Now invest in US Stocks" it breaks into springy, textured painted paper.
2. **Hand-scissored collage transitions** (Beat Cancer Off, The Ring, U.S. Against the World). Use jittered `clip-path` cut-outs, torn edges and one-bar vignettes cut on downbeats.
3. **Paint and paper boil** (Loewe/Blinkink, Who's Waiting for You). Cycle texture variants on 2s, keep 1–2 px registration offsets between colour layers, and use `feTurbulence` edge wobble.
4. **Variable-font kinetic type driven by audio** (Caption With Intention). Map kick amplitude to `wght`/`wdth`, with orange emphasis words over a navy body on cream.
5. **One continuous orange "trail" line** (Trails Will Blaze, plus Alliance Witan's road). A stock-chart stroke draws across every scene to tie the cuts together and ends as the MAPS logo underline.
6. **Poster-plate 2.5D parallax** (Alliance Witan, Telstra isometric). 4–6 flat layers under one camera move; a paper NYC skyline that grows like a bar chart (Margo).
7. **Impact-frame accent on the "Buy" tap** (Kikkoman anime, Mac mini frenetic). Speed lines, a 1-frame cream flash and squash and stretch on coins (Die Balloons).
8. **Restrained logo end card held for 2 bars** (Apple TV/Optical Arts, Unloved). One light sweep and one slow push, ending on a loop-ready last frame (Loewe).
