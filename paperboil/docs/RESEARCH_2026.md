# Research: motion craft, Apr–Oct 2026, and the direction we picked

This covers the six months before 2026-10-13. Every source was checked against its own publish or award date, and anything older was rejected. There are four full reports in `docs/research/`:

| Report | What it covers |
|---|---|
| [awards.md](research/awards.md) | 30 award-winning and acclaimed pieces: Cannes Lions, D&AD, ADC, Annecy, One Show and studio releases |
| [trends.md](research/trends.md) | Motion and ad-performance trends from mid-2026, and what reads as "made by AI" |
| [fintech.md](research/fintech.md) | 22 fintech ads from the window, plus SEBI's new advertising code (notified 8 Oct 2026) |
| [tools.md](research/tools.md) | New code-driven tools: `@remotion/effects` (new this window), Paper Shaders, `@remotion/gsap` |

Limitation: the agents couldn't play the videos. Breakdowns of each piece come from the published write-ups, credits and still frames.

## What the research says

1. **The best piece in the window makes the change of style the message.** Coinbase "Your Way Out" (Cannes Film Craft Grand Prix, two D&AD Black Pencils) moves from a flat world into a rich one, and that shift *is* the product benefit.
2. **Cut-paper and collage are winning animation awards:**
   - Dirty Work "Beat Cancer Off": Cannes Animation Silver.
   - COLOSSAL "The Ring": Silver.
   - Kodansha "Light Hole": papercraft, Bronze.
   - HBO "U.S. Against the World": scratched film and collage.
   - Loewe 180th: about 2,000 hand-painted frames.
3. **Looking hand-made counts against the AI look.** In late 2026 viewers assume a film is AI-made unless the craft is visible:
   - imperfect cut edges;
   - one consistent light direction;
   - misregistration on accents only;
   - stepped timing used as texture.
4. **What converts:**
   - The headline is readable in frame 1.
   - It works with the sound off.
   - There is one clear call to action, and the end card loops.
   - Meta treats ads with the same look or opening hook as one ad, so build genuinely different opening variants.
5. **No one owns the Indian US-stocks space creatively.** Dhan, Vested, Upstox and Groww all launched in the window with explainer or creator-style ads. A crafted motion film stands out.
6. **SEBI Common Advertisement Code (8 Oct 2026):**
   - no official logos of the brands;
   - no return figures or "number goes up" charts;
   - an "example, not a recommendation" line next to any named stock;
   - no inducements or fake urgency;
   - lifelike virtual presenters count as celebrities.

## The direction: Customer world → Owner world

We kept the cut-paper system the client approved and added Coinbase's idea: the change of style *is* the benefit.

| | Customer world (0–16 s) | Owner world (16–30 s) |
|---|---|---|
| Print | Photocopy: toner black on newsprint | Full painted-paper collage |
| Colour | MAPS orange is the **only** spot colour left: the thing you're locked out of | Orange, navy, sky, cream |
| Timing | Stiff, on threes (10 drawings/s), scanner wobble | On twos (12/s), springs, camera drift |
| Type | Static heavy weights | Variable Open Sans whose weight and width pulse on the kicks |

**The switch (16.0 s, the drop):** the photocopied sheet rips down the middle, on ones, and both halves are flung off to reveal US STOCKS in full colour. A new `paper_rip` SFX slot sits under the drop.

Other changes the research led to:

- **Hook:** SCROLL is readable from frame 1.
- **Compliance:**
  - Stock tiles show a "slice" (fractional ownership) instead of a rising chart.
  - The picked stock is labelled "Illustrative · not a recommendation".
  - No brand logos.
- **BUY tap:** gets an impact frame, a one-drawing flash ring plus speed lines.
- **End card:** one plain call to action ("GET THE MAPS APP", no inducement) that presses on every beat so the loop keeps asking.

## Not done yet (worth doing next)

- **3–4 different opening variants for Meta testing:** a ticker card, a question, the real app screen, a ₹-to-$ claim.
- **More cutdowns:** the 15 s 16:9 is done (`npm run cutdown`). Still to do: a 6 s bumper, and 9:16 and 4:5 crops once the 16:9 is signed off.
- **Real app screens** in place of the abstract phone UI. Needs MAPS assets.
- **Compliance wording:** MAPS compliance to confirm the CTA, the proof line, and the SEBI registration number plus the exact risk-disclaimer wording now required.
- **A `@remotion/effects` pass:**
  - `roughenEdges`, `tear` and `lightLeak` are new this window.
  - In the research smoke test they rendered only with `--gl=swangle` (software WebGL); `--gl=angle` failed in that sandbox. Test on our render setup first.
