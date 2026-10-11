The on-disk research file has 17 breakdowns, not 20. Most of them have no measured timings: 10 of the 17 have beat timings that are entirely guessed.

**Examples missing or thin**

1. **Missing from the file: #14 Slack "So Yeah, We Tried Slack", #15 Zendesk Rebrand Film and #16 GitHub Copilot rollout.** The `breakdowns` array stops at 17 entries. If these three were analysed, the results were never saved.
   - Can text fill it? Yes, easily. Zendesk is on Wistia, whose media JSON and caption track worked for the other Wistia videos. For GitHub, the YouTube Data API mirror used for the Slack Work OS video (`ytapi.apps.mattw.io/v3/videos?part=snippet,contentDetails`) gives duration and a description that probably lists chapters. For the Slack mockumentary, the same mirror plus Sandwich Video's credits page.
2. **No duration: Duolingo, Snowflake Summit Highlights, Stripe keynote, Asana.** All have `durationSec=0`.
   - Can text fill it? Yes. The mirror that gave Slack PT2M49S was never tried on these three YouTube videos. Asana points to a playlist, not one video, and the stand-in episode ("Post status updates", 1:23) is now private, so pick another public "How to Asana" episode and look it up the same way.
3. **Airbnb 2.0: duration and authenticity unclear.** The 22s comes from an ambiguous search snippet, while Superside says about 30s. The uploader looks like a fan channel (Ginyboi Studios), so this may be an unofficial concept piece rather than a real Airbnb video.
   - Can text fill it? The duration and channel, yes, through the mirror. Whether the video is official only partly.
4. **Bolt: the 177s embed doesn't match the 60s brief.** The beats cover only 0–60s. The other 117s are a guess ("mockups / landing page comp").
   - Can text fill it? Partly. The Behance credits page returned 403, so try a Wayback snapshot of it or the Superside "Our Work" page.
5. **Every beat timing is a guess for 10 examples:** Clever Devices, TradeLens, Imperfect Foods, Asana, Bolt, PointCard, Duolingo (no sourced beats at all), Slack Work OS, Airbnb and Snowflake Summit. Newsela, Stripe and Figma have a sourced beat order but guessed timings.
   - Can text fill it? Partly. Clever Devices and Slack Work OS have YouTube captions that were blocked; try the mirror's captions endpoint again. Duolingo and Imperfect Foods: try for an iSpot transcript or spot length, but the iSpot airing may be a different cut. Stripe: the mirror's full description may list chapters. Without captions, real timings need the video frames, not text.
6. **Figma: the recap-post link was never found,** and the pacing figures come only from a snippet of a teardown.
   - Can text fill it? Yes. Search the Figma blog for the Config 2025 recap, and try for the full videngineer teardown.

**Dimensions weak across the whole set**

- **Pacing numbers (shot count, average shot length, cuts per minute):** only Figma has them (57.7 scenes/min, about 1s per shot). Everything else is an adjective like "explainer-tempo". Text could fill this only where videngineer-style teardowns exist; otherwise it needs the video frames.
- **Sound:**
  - No BPM anywhere.
  - Music is identified for only TradeLens (Tomas Skyldeberg) and Figma (Sounds Like These studio).
  - Voice-over gender and identity are mostly unknown.
  - Full scripts exist only for Superspace, Thomson Reuters, Luminate and Stripe, plus a fragment for Airtable.
  - Can text fill it? Partly. YouTube's "Music in this video" credit is quick to check for Duolingo, Slack, Airtable, Figma and Snowflake Summit. BPM comes from the track page once the track is named; Skyldeberg is an Epidemic Sound artist, and their track pages list BPM.
- **Aspect ratios:** all 17 are 16:9. There are no vertical (9:16) or square (1:1) references, which is a problem for reels and Shorts. The Thomson Reuters file name says "16x9 Cutdown", which suggests other ratios exist.
  - Can text fill it? Partly. Superside case studies sometimes list deliverable formats, but real vertical examples need a different source list.
- **Frame rate and true resolution:** known only for the 5 Wistia videos. YouTube shows only 1280x720 embed sizes. Text can't fix this, and it matters little.
- **Typography:**
  - Fonts are named only for Bolt (Agrandir), Figma (Figma Sans) and Snowflake (Lato). Stripe's is a guess.
  - Text can fill the brand-level font for most others: Duolingo, Slack, Airtable, GitHub (Mona Sans), TradeLens (likely IBM Plex), Zendesk. Use Fonts In Use or the brand's own guidelines. Confirming the font in the actual video can't be done from text.
- **Brand colour values (hex):** none for TradeLens, Airtable, Figma, Newsela or Stripe. Brand pages and guidelines can fill these, and it's quick.
- **Motion details (easing, transition types and lengths, kinetic-type timing):** all guessed. Text can't really fill this beyond case-study adjectives.
- **On-screen text, burned-in captions and exact CTA wording:** confirmed only for Thomson Reuters and Newsela. Mostly needs the frames; captions help only where they're readable.

**Quickest fixes from text:**
1. Run the YouTube API mirror on every YouTube example for duration, chapters and the captions flag.
2. Write up the 3 missing breakdowns (Slack mockumentary, Zendesk, GitHub) and save them.
3. Look up music credits and BPM.
4. Add brand fonts and hex colours.

Pacing numbers, motion details and vertical formats are the gaps text sources can't realistically close.

File reviewed: web/superside.json