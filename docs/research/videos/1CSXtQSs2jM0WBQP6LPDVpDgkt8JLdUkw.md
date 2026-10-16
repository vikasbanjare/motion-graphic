# Teardown: OpenAI × HubSpot "ChatGPT connector" launch spot (1CSXtQSs2jM0WBQP6LPDVpDgkt8JLdUkw)

File: `refs/1CSXtQSs2jM0WBQP6LPDVpDgkt8JLdUkw.mp4`, 30.03 s, 1280x720, 30 fps container, AAC stereo 44.1 kHz.
Measurement note: the picture is a 25 fps master converted to 30 fps. Every 6th frame is a duplicate (the repeat falls on frames 3, 9, 15… mod 6). 277 of 901 frames have a diff below 0.05, but only about 126 of them are cadence repeats. The other ~150 are static holds. So the smallest real motion step is 40 ms. Timings below are given in 30 fps frames (f) and ms. Pixel values are at 720p unless "@1080" is stated.
Tools used: the pre-computed analysis, plus 15 frame-by-frame sheets in `analysis/<id>/zoom/`, per-frame ink and bbox tracking (`scripts/measure.py`), a whole-film frame-difference scan (`scripts/diffs.py`), 50 ms audio RMS and a log spectrogram.

---

## 1. Summary

- **What it is:** a 30 s co-branded launch film for the HubSpot connector inside ChatGPT ("Get the power of ChatGPT, fueled by your CRM data"). It is a UI-first product launch spot with no voice-over. All copy is typed or set as on-screen text.
- **Concept:** the product is a text prompt, so the film is a prompt. The headline is typed into an empty canvas like a ChatGPT message. A real prompt bar then builds around that headline. The user switches HubSpot on as a source, a real query is typed and sent, and HubSpot's data visibly breaks into particles that "flow" into the ChatGPT answer. The film closes on benefit cards and the co-brand lockup.
- **Structure:** a 2 s black kinetic-type teaser, 8 s of headline typing and UI build, a co-brand title card on the riser crest, then a 4.8 s macro typing shot on the beat drop. After that comes the one 3D "hero" move (send, pull back into space, particle data transfer, fly-through to the answer), four fast text cards, and the end lockup.
- **Why it feels premium:** an almost entirely white set. One brand accent colour (HubSpot orange #F65542) carries meaning (the sprocket = "your CRM data"). The camera never sits still: every card drifts in scale by 13–24 %. Moves ease out of each cut and ease in toward the next one. Two seamless continuous takes hide most transitions. Audio transients land within ±2 frames of 6–7 of 8 hard cuts (see §11).
- **Detector correction:** the auto-analysis found 3 shots (one hard cut at 2.13 and one "seamless" change at 18.6). There are actually **10 shots, 8 hard cuts and 1 blur-dissolve**. Most cuts are white-to-white, so luma-based detection missed them. The real cut list from the frame-difference scan: 2.133, 10.367, 13.033, 17.800, (21.47 blur dissolve), 22.600, 24.767, 26.067, 27.367.

## 2. Creative Direction

| Aspect | Observation |
|---|---|
| Concept | "The ad is a prompt." The headline, the product UI and the demo all live in one text-entry metaphor. The caret is the protagonist: dot → caret → prompt → sent bubble → answer. |
| Visual language | Pure white (#FFFFFF) canvas, near-black type, one orange brand accent, a blue system accent (toggle #3585E4) and one blue-grey 3D "studio" (#C8D4DF → #F4F5F8) for the hero move. The 2 s intro is on pure black (#000000) as a "lights off → lights on" flip. |
| Style | Minimal Premium SaaS with a single Cinematic 3D beat (a hybrid). Flat 2D UI throughout, with one 3.7 s 3D camera move with particles and depth of field. |
| Personality / tone | Calm, confident, quietly technical. No exclamation marks, no hype words except "For the first time ever". Sentence case everywhere. |
| Positioning | About 50 % premium, 25 % technical, 20 % cinematic, 5 % playful (the bouncing dot). |
| Consistency devices | (a) the camera follows the typing in both typing shots: in shot 2 the caret is locked at 65–66 % of frame width, while in shot 4 a slow truck-left keeps the line in frame but the caret still drifts right (≈19 % → 75 % FW); (b) staircase → baseline word collapse is used twice (hook, "No complex setup."); (c) word-spacing converge/diverge is used on the hook end, the card 7→8 cut and both logo lockups; (d) the identical logo lockup is used twice (x = 328 vs 327 px), as mid-film title and end card. |
| Brand handling | HubSpot's sprocket is used as a semantic icon. It is appended to the typed headline (7.83 s), moves into the "Sources" chip on toggle (10.20 s) and pops after "All powered by your data." (23.33 s). The OpenAI side is carried by the ChatGPT UI itself, not by a logo animation. |

## 3. Story Structure

| Stage | Start–end (s) | Duration | Purpose |
|---|---|---|---|
| Hook / teaser | 0.00–2.13 | 2.13 s (64 f) | "For the first time ever" on black. An event announcement with a bouncing dot. Sound: sub impact at 0.00. |
| Setup / promise | 2.13–7.80 | 5.67 s | Caret on white types the value proposition "Get the power of ChatGPT, fueled by your CRM data." The headline is the prompt. |
| Product reveal (feature 1: connect) | 7.80–10.37 | 2.57 s | Prompt bar builds around the text, pull back, "Add sources" dropdown, HubSpot toggle on. Over a riser. |
| Title / brand lockup | 10.37–13.03 | 2.67 s | OpenAI × HubSpot lockup on the riser crest, 300 ms silence, plucks, slow push-in. |
| Feature demo (use case) | 13.03–21.47 | 8.44 s | Beat drops. A real query is typed, sent and shown as a 3D data transfer (particles), and the AI answer is a generated "Target Account List" table. |
| Benefits | 21.47–24.77 | 3.30 s | "No complex setup." / "All powered by your data." + sprocket. |
| CTA | 24.77–27.37 | 2.60 s | "Connect ChatGPT + HubSpot" / "and start growing better." (the HubSpot tagline). |
| End lockup | 27.37–30.03 | 2.66 s | Same lockup as 10.37, then a 2.2 s static hold under the final sustained sting. |

Proportions: hook 7 %, setup + reveal 28 %, title 9 %, demo 28 %, benefits 11 %, CTA 9 %, lockup 9 %. The beat drop (13.03 s) sits at 43 % of the runtime. Everything before it is "intimate typing", everything after it is "momentum".

## 4. Shot-by-Shot

All shots are 16:9, flat-lit, with no film grain. Blur appears only in shot 5 and at the 21.47 transition.

| # | Time (s) | Dur | Composition / framing | Camera | Object / UI / text movement | Depth & layering | Lighting / bg | Palette | Typography | Transition out | Ease | FX notes (blur/glow/shadow/grain/DOF/parallax/2D-3D) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0.000–2.133 | 2.13 s / 64 f | Centered. Dot Ø28 px (3.9 % FH) at exact frame centre. Words on a descending diagonal staircase around centre (step ≈36 px down per word). | Locked-off (2D) | Dot rises 212 px in 17 f (f0–f17), then hangs 4 f, then falls 172 px in 42 f. "first" pops at f2 with tracking-in. Other words typed letter by letter. Staircase collapses to baseline (9 f), words converge horizontally (6 f). | Single layer | Pure black #000 | White dot, "first" #FFF bold, other words light grey | Cap/ascender height 26–28 px @720 (3.6–3.9 % FH); font ≈37 px @720 (≈56 px @1080) [font size inferred from cap ≈0.70 em]. "first" bold, rest regular, sentence case | **Hard cut on motion** to white (mid-converge), synced to a hit at 2.10–2.15 | Rise: expo ease-out. Fall: gravity ease-in. Collapse: ease-in-out. Converge: hard ease-in. | None. Pure flat vector. |
| 2 | 2.133–10.367 | 8.23 s | Continuous take. Caret at centre → headline line → caret locked at x≈830–850 (65–66 % FW) → bar card overflows the left edge (≈−65 to 1235 px) → pulled back to ≈990 px wide (≈145–1135 px, 77 % FW). | 2D virtual camera: re-centre pan (3.37–3.93), caret-follow truck (≈4.5–7.2), pull-back zoom 1.00→0.75 (8.0–9.03, main move 8.2–8.9) | Typing at 9–35 cps with phrase pauses. Bar border, shadow and sprocket pop in (7.80–7.87). Toolbar rises in 7.93–8.07. Cursor on "Add sources" → dropdown with 2 f row stagger. Cursor travels to the HubSpot toggle, then click, chip swap and toggle on. | 2 layers: bar card with soft drop shadow over white. Dropdown card with shadow above the bar. | White #FFF, soft grey shadow (~#F0F0F0 falloff) | #1A1A1A text, #F65542 sprocket, #3585E4 toggle, light-grey chips | Cap height 24 px @720 (3.3 % FH); font ≈34 px @720 (≈51 px @1080) [inferred], regular, sentence case. Caret 32 px tall. | **Hard cut** 3 f after the track fills (10.267) and 1 f after the final knob settle (10.333), on the riser crest (10.30–10.35 peak) | Pan: fast-attack ease-in-out (peak at ~25 %, long tail). Pull-back: cubic ease-in-out, peak velocity at ~50–55 %. Dropdown: ease-out. | Only soft UI drop shadows. No blur or grain. Text grows into UI (text → component transition). |
| 3 | 10.367–13.033 | 2.67 s | Centered co-brand lockup "OpenAI × HubSpot". Lockup width ≈50 % FW (328–966 px), wordmark height 9.6 % FH. | Static, then accelerating push-in +10.6 % (≈11.3–13.0) | Wordmarks converge on the "×" (OpenAI +20 px, HubSpot −39 px) in 8 f while fading in (OpenAI from ≈80 %, HubSpot from ≈50 % opacity) | Single layer | White | Black / #F65542 | Logo wordmarks | **Hard cut on beat drop** (13.033, audio peak 13.05) | In: ease-out. Push-in: ease-in. | None |
| 4 | 13.033–17.800 | 4.77 s | Macro close-up of the prompt bar (type ≈1.65× the pulled-back shot-2 scale, 1.25× the pre-pull-back typing scale). Bar extends off the right edge. Caret is not locked: it drifts right from x≈249 (19 % FW) to ≈960 (75 % FW) at 16.37 and ends at ≈915 (71 %). | One long ease-in-out truck left (≈13.6–17.3, ≈545 px; peak ≈15–23 px/f at 15.3–15.7, ≤1 px/f by 17.0). Bar end (mic and send) enters from the right (16.07–16.3). No zoom: glyph sizes are identical at 16.4 and 17.3. | Bar slides in 54 px (6 f). Caret blinks, then typing "Segment targets by annual revenue, industry, and tech stack." at ≈4 cps on the first letters (13.28–14.03), accelerating to a 30–50 cps burst (≈15.0–16.0), then slowing on "stack." (done ≈16.5). Content moves up 3→7 px/f before the cut (send). | 1 card layer, cropped. Gives a macro feel. | White, faint shadow | #1A1A1A, blue "Research" chip, orange sprocket on "Sources" | Cap height 30 px @720 (4.2 % FH); font ≈43 px @720 (≈64 px @1080) [inferred], regular | **Match cut on upward motion** to the sent bubble, on a small hit at 17.80 (≈3 dB bump over loud music) | Entry: ease-out. Exit: ease-in (accelerating up). | Edge-cropped macro framing gives a "lens" feel without blur |
| 5 | 17.800–21.467 | 3.67 s | Continuous take. Bubble → wide 3D stage (chat pane right, HubSpot window left, bubble top-right) → push-in to the answer text → tilt down the table. | 3D: bubble rise (5 f), fast pull-back ×0.57 (10 f, ease-in), then a decelerating further ×0.56 (≈18–20 f; total ×0.32 by 19.0), near-static (≤3 px/f drift) during the dissolve, dolly-in ×2.3 through the particle field (19.95–20.47), lateral settle (20.27–20.80), accelerating tilt/scroll down (20.40–21.47) | Bubble rises 34→4 px/f. 3D environment fades in. HubSpot window disintegrates into ~200–300 two-tone discs [count estimated], sweeping left→right in 0.95 s. Answer text fades in at 20.00 (≈2 f). Table rows append every ~130–200 ms, with cells typing in left→right. | 3–4 planes: blue-grey back wall, white chat pane (semi-transparent glass edge), HubSpot window in front-left, particle cloud in the foreground | Soft diffuse light. Blue-grey radial gradient #C8D4DF–#D3DCE6 (left, darker) to #F4F5F8 (right). Gentle vignette. | Navy particles #192530–#45515C, white particles, blue diamond #739FCC, bubble #EEEEEE | Bubble ~22 px @720. Answer body ~22 px → 33 px after push-in [approx, glyph-box estimates, not re-measured]. Table header bold. | **Blur-dissolve** (21.47–21.73: table defocus + fade, new text crisp). Hit at 21.43–21.47. | Pull-back: ease-in-out. Dolly-in: ease-out. Scroll: ease-in (8→24 px/f). | Real DOF. Foreground particles grow 12→30–40 px and go bokeh at 20.2–20.4. Parallax between the particle cloud and the pane. Slight yaw/roll on the pane (~1° baseline tilt at 20.25). The only 3D section. |
| 6 | 21.467–22.600 | 1.13 s | Centered single line "No complex setup." | 2D scale-down from 21.93: ×0.80 by 22.53, ×0.76 on the last frame (ease-in) | Words appear crisp (21.60) on a staircase (≈98 px vertical spread) and collapse to the baseline: within 10 px after 7 f (21.83), settled by ≈21.93 (10 f) | Single layer (table ghost fading behind until 21.73) | White | #1A1A1A | Cap height 42 px @720 (5.8 % FH); font ≈60 px @720 (≈90 px @1080) [inferred], Medium, sentence case | **Hard cut** (22.600; kick lands 5 f later) | Collapse: ease-out. Scale: ease-in. | Blur only on the outgoing table |
| 7 | 22.600–24.767 | 2.17 s | Centered "All powered by your data." + sprocket. Enters at 70 % FW. | 2D scale-down 1.00→0.85 (ease-out, ~20 f), then slow drift | Sprocket pops at 23.333 (~2 f). Line re-centres 72 px left (≈10 f, small tail to 23.93). Exit: word gaps widen ≈1.5× while the line drifts ≈85 px left; width +16 % (823 → ≈958 px, 24.13–24.73) with fade to ~60 %. | Single layer | White | #1A1A1A + #F65542 | Cap height 41–43 px @720 (≈5.8 % FH); font ≈60 px @720 (≈90 px @1080) [inferred], Medium | **Hard cut / word-spacing match**: spread words → next card starts spread | In: ease-out. Exit: ease-in. | None |
| 8 | 24.767–26.067 | 1.30 s | Centered "Connect ChatGPT + HubSpot" | 2D: tighten/settle, then shrink ×0.81 (25.53–26.03) | Word spacing tightens (gaps ≈30 → 24 px, centre shifts 689→654 px in ≈8–10 f), then shrink + fade to ~60 % | Single layer | White | #1A1A1A | Cap height 43 px @720; font ≈60 px @720 [inferred], Medium | **Hard cut** (soft note at 26.07) | In: ease-out. Exit: ease-in. | None |
| 9 | 26.067–27.367 | 1.30 s | Centered "and start growing better." | 2D scale ×0.87 over the shot (ease-out, then ~linear) | Continuous shrink, fade on the last frame (27.33) | Single layer | White | #1A1A1A | x-height 32 px @720 at 26.4 s, shrinking with the ×0.87 scale (font ≈60 → 53 px @720) [inferred], Medium | **Hard cut** on the audio peak at 27.40 | ease-out → linear | None |
| 10 | 27.367–30.033 | 2.67 s | Same lockup and position as shot 3 | Converge 8 px per side (≈9 f, settled 27.67), then locked off | Wordmarks converge slightly. Then fully static for ≈2.2 s (last 1 px move at 27.87). | Single layer | White | Black / #F65542 | Logo | End | ease-out | None. Sting at 27.85 after a 100 ms gap. |

Coverage: the 10 rows run 0.000–30.033 s (901 frames) end to end with no gaps or overlaps.

Phase-2 attributes that have no column of their own:
- **Angle / perspective:** shots 1–4 and 6–10 are flat, front-on and orthographic (0°). Shot 5 is the only perspective shot: eye-level, with the HubSpot window at a slight yaw (≈10° [inferred]) and ~1° roll drift during the dolly.
- **Scale:** given in the composition and camera columns (pull-back ×0.75, 3D pull-back ×0.57 then ×0.56 (×0.32 total), dolly ×2.3, card drift ×0.76–0.87, logo +10.6 %).
- **Reflections:** n/a. There are no glossy floors or mirrored UI.
- **Grain / texture:** n/a. There is no film grain or paper texture. The only texture is compression macro-blocking (see §13).
- **Motion trails / motion blur:** n/a on 2D moves, even at 75 px/f. Blur appears only as DOF bokeh in shot 5 and in the 21.47 defocus dissolve.
- **Glow:** n/a. There are no glows or light leaks. Depth comes only from soft drop shadows.
- **Match cuts / morphing:** T1 (dot → caret concept match), T3 (text → UI morph), T6 (prompt → sent-bubble motion match) and T12 (word-spacing match). See §10.
- **Mask transitions, camera wipes, object wipes:** n/a as shapes or whips. The particle disintegration (T8) is the only object-wipe-like reveal.
- **Zoom / perspective transitions and UI-to-3D:** T3 (2D pull-back), T7 (screen-to-world 3D pull-back) and T9 (dolly through particles).
- **Scene continuity:** two continuous takes (shots 2 and 5), plus a reprised lockup (shots 3 and 10).

### WHY notes (important shots)

- **Shot 1 (hook):** the dot is a pun on ChatGPT's "thinking" dot. Its gravity curve (rise fast, hang, fall with acceleration) is the most physical motion in the film, and it ends by "landing" on the hard cut to white. The cut happens mid-acceleration (words still converging 75 px/f), so the black→white flip lands like an impact. Making only "first" bold puts the emphasis on the announcement without changing size.
- **Shot 2:** typing the headline turns a claim into an action the viewer reads at reading speed. Variable typing speed (fast filler, slow "of ChatGPT", ≈1.1 s pause after "power") feels human, not machine-perfect. Building the UI *around* already-read text means the viewer understands the prompt bar before it appears. The pull-back from 1.00 to 0.75 is the "reveal" gesture that turns copy into product.
- **Shot 3:** placing the brand lockup on the riser crest, with 300 ms of silence after it, gives the co-brand its own moment. The accelerating push-in (+10.6 %) builds pressure into the beat drop.
- **Shot 4:** a macro crop (bar runs off-frame) makes a flat UI feel like a camera close-up. The camera trucks left with the typing, so the newest characters always stay in frame (the caret drifts right only gradually), and the eye never has to search. The upward "send" motion is accelerated into the cut so the bubble can continue it.
- **Shot 5 (hero):** the only depth in the film is spent on the one idea that needs explaining: data moving from HubSpot into ChatGPT. Breaking the window into particles in its own UI colours (navy sidebar → navy dots, white canvas → white dots) makes "your data" literal. The dolly through the particle cloud with defocus gives real foreground parallax, so the shot reads as cinematic and not as a slideshow.
- **Shots 6–9:** each card is a 2–5-word benefit or CTA. Every card is always shrinking (13–20 %), so even pure text has life. The word-spacing exit of card 7 and spaced entrance of card 8 make the cut feel like one continuous breath.
- **Shot 10:** reprising the exact mid-film lockup closes the loop. The 2.2 s dead-still hold under a sustained sting is the "full stop".

## 5. Frame-by-Frame Studies

### Study A: Hook, first 2.13 s (`zoom/hook_a.jpg`, `zoom/hook_b.jpg`, 30 fps)
- f0 (0 ms): dot Ø28 px at (640, 361), the exact frame centre. Audio: −5.8 dB impact at 0.00.
- f0–f17 (0–567 ms): dot top y 348 → 136 (212 px = 29 % FH). Displacement per source frame (40 ms): 31, 56, 37, 24, 16, 13, 9, 7, 6, 4, 4, 2, 2, 1 px. That is an **expo/quint ease-out** with 50 % of travel done in about 100 ms.
- f2 (67 ms): "first" appears at centre where the dot was (the dot "launches" the word), 85 px wide. It tightens to 71 px by f6 (200 ms) as a **tracking-in of −17 %**, ease-out (8, 4, 2 px steps per source frame).
- f17–f21 (567–700 ms): dot hangs (the apex hold, ~130 ms).
- f18–f44 (600–1467 ms): words type in on the staircase: "For" 600–733 ms, "the" 767–833 ms, "time" 1033–1233 ms, "ever" 1267–1467 ms. That is about 22 chars/s within a word, with 170–200 ms gaps between words.
- f21–f63 (700–2100 ms): dot falls 172 px (top y 136 → 308, ending just above "first"). Speed rises from 1 px/f to 24 px/f, a **pure ease-in (gravity)**.
- f45–f54 (1500–1800 ms): staircase → baseline. The lowest word rises 72 px with steps 11, 20, 20, 10, 5, 3, 2, 1 px, i.e. **ease-in-out over 9 f (300 ms)**.
- f58–f63 (1933–2100 ms): line width 505 → 364 px (−28 %) with steps 4, 9, 17, 37, 74 px, a **hard ease-in**. The film cuts at f64 (2.133 s) before the settle. Audio hit at 2.08–2.15 (a 7 dB rise to about −24 dB in mono 50 ms RMS).
- **Why it works:** three different eases in 2 s (snap up, gravity down, accelerate into the cut) give the opening real physicality. The cut on peak velocity transfers energy into the quiet white world.

### Study B: Text-to-UI build and pull-back (`zoom/bar_emerge.jpg`, `zoom/typing1.jpg`)
- Typing: "Get the power" grows rightward from x = 636 px (left-anchored at centre) at about 35 cps (13 chars, 2.53–2.87). Typing then pauses ≈1.1 s (2.87–3.97), with the re-centre inside the pause.
- Re-centre: line slides 175 px left (left edge 636 → 461) over ≈17 f (3.37–3.93). Steps per source frame 2, 10, 21, 31, 29, 23, 17, 12, 9, 7, 5, 4, 3, 1, 1 px: a **fast-attack ease-in-out** (3 f ramp, peak at ≈25 % of the move, long ease-out tail; 154 px of it is done by 3.70).
- " of ChatGPT," types at about 9 cps (3.97–5.3), hold ≈0.95 s (5.3–6.27), then " fueled by your CRM data." at about 28 cps (6.3–7.2). From about 4.5 s, when the caret reaches x ≈ 837, the line scrolls left as characters are added, so the **caret stays at x ≈ 830–850 (65–66 % FW)**. The scroll is slow during " of ChatGPT," (left edge 456 → 409 px) and fast during the 6.3–7.2 burst (409 → ≈16 px, the first glyph then clipped). The first glyph is cropped off the left edge by 7.2 s, a deliberate overflow that implies "this is a bigger UI".
- Caret blink ≈ 0.3 s on / 0.3 s off [approx]. Final caret disappears at 7.67.
- UI build: 7.80 bar edge and shadow appear (1–3 f). 7.83 sprocket pops in after "data." (≈3 f). 7.93–8.07 toolbar row fades and slides in from below (4–5 f).
- Pull-back 8.0–9.03 (≈31 f incl. a 1–2 px/f ramp and tail; main move 8.2–8.9, ≈21 f). Measured on the headline itself, the span from "ChatGPT," to "CRM" goes 472 px at rest (7.5–8.0) → 354 px (**scale 1.00 → 0.75**). Word widths agree ("ChatGPT," 146 → 110 px, "power" 97 → 72 px, ×0.75). The bar card goes from overflowing the left edge (≈−65 to 1235 px) to ≈145–1135 px (≈990 px, 77 % FW). Its right edge moves 1230 → 1133. The text line rises from y ≈ 361 to ≈ 322. Left edge of "power" (110 → 285 px) per source frame: 1, 1, 2, 2, 3, 3, 5, 5, 7, 9, 11, 14, **18, 18, 18** (8.50–8.60), 14, 11, 9, 7, 5, 4, 3, 2, 1, 1, 1 px. That is a smooth **cubic ease-in-out** with peak velocity at about 50–55 % of the move, plus a ≤1 px/f tail to 9.03.
- **Why it works:** the viewer has already read the content, so the UI arrives as context, not clutter. The zoom-out doubles as the reveal and as the "breath" before the interaction.

### Study C: Dropdown and toggle micro-interaction (`zoom/dropdown_crop.jpg`, `zoom/toggle_crop.jpg`)
- 8.867: the cursor appears already on "Add sources" (no travel in). The chip shows its pressed grey state on the same frame.
- Dropdown open, 6 f (200 ms) ease-out. Row 1 "Web search" at 8.867. Row 2 "HubSpot" at 8.933–8.967. Row 3 "Connect more" at 9.033. **Row stagger 2 f (67 ms).**
- Cursor travel from the chip to the HubSpot toggle: 9.2 → 10.1, about 27 f (900 ms), slow ease-in-out. The arrow becomes a hand on hover. The row gets a light-grey hover fill.
- Click: 10.200 chip label swaps "Add sources" → [sprocket] "Sources" (1 f hard swap, one frame before the toggle reacts). 10.233 knob pressed (track darkens). 10.267 the track is filled blue #3585E4 and the knob has jumped to the right end in a single source frame; 10.300 is a cadence repeat; 10.333 the knob settles the last ≈3 px (**toggle = 1 source frame, 3 f / 100 ms including the settle**). The headline sprocket fades out at 10.23–10.27. Audio click onset at 10.24.
- Payoff: hard cut to the logo at 10.367, **3 f (100 ms) after the track fills**, 1 f after the final knob settle.
- **Why it works:** real UI timings (100–200 ms) sit inside a slow camera, so the product feels responsive and the film feels unhurried. The slow cursor travel lets the eye pre-read the target.

### Study D: Logo lockup in, push-in, beat-drop cut (`zoom/logo_in.jpg`, `zoom/logo_out.jpg`)
- 10.367: both wordmarks appear part-transparent: OpenAI at ≈80 % opacity (ink luma ≈57 → ≈10, full by 10.47), HubSpot at ≈50 % (ink luma ≈200 → ≈141, full by 10.63).
- Converge: OpenAI +20 px (308 → 328), HubSpot −39 px (735 → 696) over 8 f (267 ms), ease-out. Both reach their final position at 10.63. The stagger is in the fade: the orange side reaches full opacity about 5 f after the black side.
- ≈11.3–13.0: push-in. OpenAI width 254 → 281 px (+10.6 %), with increments growing from about +1 to +7 px per 200 ms (254 at 11.17, 256 at 11.57, 258 at 11.97, 263 at 12.37, 267 at 12.57, 271 at 12.77, 278 at 12.97, 281 at 13.00). That is a clear **ease-in**.
- 12.85–12.95: audio dips to −41 dB (100 ms pre-drop gap). 13.033 hard cut to the macro shot. Beat drop peak at 13.05 (−14 dB).

### Study E: Send → sent-bubble match cut → 3D pull-back (`zoom/send_pullback.jpg`)
- 17.60–17.77: prompt content moves up 3, 3, 5, 7 px/f (ease-in).
- 17.80 cut (a small transient on loud music: about −12 → −9 dB in mono 50 ms RMS). The bubble continues upward at 34, 34, 31, 7, 4 px/f (ease-out). This is a **velocity hand-off across a cut**: same direction, accelerate before and decelerate after.
- 18.00–18.33: bubble text width 604 → 346 px (**×0.57 in 10 f**) while moving up-right (centre 611,385 → 905,284), ease-in. Blue-grey environment and HubSpot window fade in at 18.17–18.37 (frame luma 250 → 241).
- 18.33–19.00: the pull-back keeps going while decelerating: text width 346 → 305 (18.37) → 255 (18.50) → 225 (18.63) → 203 (18.83) → 197 (18.97) → 194 (19.03), i.e. a further **×0.56** over ≈20 f. Total pull-back ≈1.0 s and **×0.32** (604 → 194 px), ease-in-out with peak speed at ≈18.2–18.37 (first third to middle).
- **Why it works:** the cut is hidden inside motion. The pull-back answers "where did my message go?" by revealing the world (chat pane + HubSpot) in one gesture.

### Study F: Particle data transfer and fly-through (`zoom/particles.jpg`, `zoom/full_18_8.jpg`, `zoom/full_19_6.jpg`, `zoom/full_20_25.jpg`)
- 18.95–19.02: audio near-silence (−44/−47 dB). 19.05: hit (−9 → −5 dB). The dissolve starts at 19.00.
- 19.00–19.95: the HubSpot "Target accounts" window (≈330 px wide) disintegrates left→right in about 0.95 s (≈350 px/s). There are about 200–300 discs [estimated by eye], Ø ≈ 8–15 px, two tones: navy #192530–#45515C (from the dark sidebar and header) and white (from the canvas). Released particles drift left and hang as a cloud. The rest of the window washes out behind the glass edge of the chat pane.
- 20.00: the answer paragraph fades in on the chat pane (≈2 f, 20.00–20.07), as the dolly-in begins. It is not visible at 19.6–19.97.
- 19.95–20.47: dolly-in. The blue diamond icon grows from 6 to 14 px (**≈×2.3 scale in ~15 f**). Foreground particles grow to 30–40 px and defocus into bokeh as they leave frame left (true DOF + parallax).
- 20.27–20.80: lateral settle. Icon x 404 → 172 px, steps 34, 38, 32, 30, 26, 22, 16, 11, 10, 4, 2 px (**ease-out**).
- 20.40–21.47: tilt/scroll down the table. Vertical speed 8 px/f → 12–16 → 24 px/f (**ease-in into the transition**). Rows append about every 130–200 ms, and inside each row the cells type in left→right.
- 21.47–21.73: the table defocuses (blur radius grows over ~4 f) and fades. Hit at 21.43–21.47 (−5 dB).
- **Why it works:** it is the only shot with depth, motion blur and DOF, so it is unmistakably the hero moment. The particles are made of the UI itself, which keeps the abstraction honest (no random sci-fi particles).

### Study G: Kinetic end cards (`zoom/nocomplex.jpg`, `zoom/endtext1.jpg`, `zoom/endtext2.jpg`)
- "No complex setup.": appears crisp at 21.60 on a staircase (No / complex / setup., ≈98 px vertical spread above the single-line height). It collapses to the baseline with a strong **ease-out** (expo-like). Residual spreads per 30 fps frame are 98, 48, 33, (dup), 24, 18, 13, 9, 7, (dup), 4 px. That is within 10 px after 7 f (21.83) and settled by ≈21.93 (10 f). The width holds at 539 px until 21.90. Scale then goes 539 → 432 px (×0.80) over 21.93–22.53 and reaches 412 px (×0.76) on the last frame (22.567), with **ease-in**. Steps per frame: 2, 0, 4, 2, 4, 0, 4, 4, 6, 6, 6, 0, 8, 9, 10, 12, 13, 0, 17, 20 px.
- "All powered by your data.": enters at 900 px (70 % FW, scale ≈1.18 of its settle size). Ease-out settle to 763 px over ~20 f. Sprocket pop at 23.333 (≈2 f), then the line re-centres 72 px over ~10 f (ease-out). Exit 24.13–24.73: **word gaps widen ≈1.5× (the sprocket separates most) while the whole line drifts ≈85 px left; width +16 % (823 → ≈958 px on the last frame), fading to ~60 %**, ease-in.
- "Connect ChatGPT + HubSpot": enters with the extra word spacing still present (gaps ≈30 px → 24 px at rest) and tightens over ~8–10 f (ease-out, centre 689 → 654, tail to 637 by 25.43). Holds and drifts. Exit 25.53–26.03 as shrink ×0.81 + fade (ease-in).
- "and start growing better.": 734 → 700 px in 0.33 s (ease-out), then ~linear to 644 px by 27.27. Fade on the last frame.
- **Why it works:** cards never sit dead. Entrances decelerate and exits accelerate, so each cut lands at peak velocity and the next card absorbs it. The word-spacing match (24.73 → 24.77) makes two cards read as one sentence.

## 6. Motion Language observed

- **"Ease out of the cut, ease in toward the next cut."** This is the film's core grammar. Seen at 2.13 (converge 4→75 px/f), 13.03 (push-in), 17.80 (send), 21.47 (scroll 8→24 px/f), 22.60 (shrink), 24.77 (spacing exit) and 26.07 (shrink + fade). Every incoming shot then decelerates (ease-out over 6–20 f).
- **Perpetual drift:** no text or logo card is ever static except the final 2.2 s. Scale drift is 13–24 % per card (×0.76–0.80, ×0.85, ×0.81, ×0.87). The logo push-in is +10.6 % over 1.6 s.
- **Physical, motivated motion:** gravity on the dot, a typing cadence with human pauses, and a cursor with slow, deliberate travel (~900 ms) followed by snappy UI response (100–200 ms).
- **Two speeds:** slow camera (≈0.6–1.7 s moves; the macro truck runs ≈3.7 s) versus fast UI micro-interactions (1–6 f). The contrast reads as "premium calm + responsive product".
- **Stagger:** dropdown rows 2 f. Table rows ~4–6 f. Logo halves ~5 f (the orange half finishes its fade later). Words type about one character per source frame (1–2 f) in fast bursts.
- **Kinetic typography motifs:** staircase → baseline collapse (9 f ease-in-out in the hook; 7–10 f ease-out on "No complex setup."); tracking-in on a hero word (−17 % width in 4 f); word-spacing converge/diverge as entry and exit.
- **No overshoot, no elastic, no bounce.** Even the toggle and sprocket pops have no visible overshoot at 25 fps. The calm comes from strict critically damped curves.
- **No motion blur on 2D moves.** The fastest 2D move (75 px/f converge) is unblurred. Blur is reserved for the 3D section (DOF bokeh) and the defocus transition.

## 7. Camera Language observed

| Move | Where | Speed / size | Ease | Purpose |
|---|---|---|---|---|
| Locked-off | Shot 1, final hold 27.8–30.0 | 0 | — | Announcement / full stop |
| Re-centring pan | 3.37–3.93 | 175 px in ≈17 f (154 px of it in the first 10 f) | fast-attack ease-in-out, long tail | Keeps the growing headline balanced |
| Caret-follow truck ("typewriter lock") | ≈4.5–7.2 | Caret held at 65–66 % FW | linear-ish, follows typing | The eye stays on the newest character |
| Typing-follow truck (macro) | ≈13.6–17.3 | ≈545 px left, peak ≈15–23 px/f at 15.3–15.7; caret still drifts 19 % → 75 % FW | ease-in-out | Keeps the typed query in frame without a hard lock |
| Pull-back (2D zoom-out) | 8.0–9.03 (main 8.2–8.9) | ×1.00 → ×0.75 | cubic ease-in-out | Reveal that the text lives in a UI |
| Push-in (accelerating) | Logo ≈11.3–13.0 | +10.6 % in ≈1.7 s | ease-in | Builds tension into the beat drop |
| Macro close-up | 13.03–17.8 | type ≈1.65× the pulled-back bar scale, bar off-frame | entry slide 54 px / 6 f ease-out | Intimacy, legibility of typed query |
| 3D pull-back reveal | 18.00–19.00 | ×0.57 in 10 f, then a decelerating further ×0.56 (×0.32 total) | ease-in-out (front-loaded) | Screen-to-world: message → environment |
| Dolly-in through particles | 19.95–20.47 | ×2.3 in ~15 f, foreground bokeh | ease-out | Hero fly-through, depth, parallax |
| Tilt/scroll down | 20.40–21.47 | 8 → 24 px/f | ease-in | Shows the depth of results, accelerates into the transition |
| Scale-drift on cards | 21.9–27.3 | −13 to −24 % per card | ease-out in / ease-in out | Keeps text alive |

Implied focal feel: 2D shots are orthographic (no perspective). The 3D section has a moderate-telephoto feel: little perspective convergence on the window (left edge 272 px vs right edge 260 px tall, ≈10° yaw [inferred]) and shallow DOF on near particles. There is no handheld, no roll except ~1° drift during the dolly, and no orbit.

## 8. Typography

Sizes below are measured cap heights (ink bbox of a capital letter). Font sizes are derived as cap ÷ 0.70 [inferred: typical geometric-sans cap ratio, actual face unconfirmed].

| Role | Cap height @720 (% FH) | Est. font size @720 (≈ @1080, % FH) | Weight | Case | Tracking | Alignment / placement | Reveal |
|---|---|---|---|---|---|---|---|
| Hook words | 26 px ("F"), "first" ascender 28 px (3.6–3.9 %) | ≈37 px (≈56 px, 5.2 %) | "first" Bold (700) white. Others Regular, slightly dimmer. | sentence case | "first" starts 20 % wide (85 px) and tracks in −17 % to 71 px, settles to 0 | Diagonal staircase → centred single line (ink y 345–373) | Pop + tracking-in, letter-by-letter typing, staircase collapse, horizontal converge |
| Typed headline | 24–25 px ("CRM") (3.3–3.4 %), x-height 18–19 px, caret 32 px | ≈34 px (≈51 px, 4.8 %) | Regular (400) | Sentence case | 0 | Left-anchored at frame centre → caret locked at 65–66 % FW | Typewriter at 9–35 cps, phrase pauses ≈0.95–1.1 s |
| Prompt close-up | 30–31 px ("S") (4.2 %), x-height 24 px, caret 40 px | ≈43 px (≈64 px, 6.0 %) | Regular | Sentence | 0 | Left-aligned in bar; caret drifts 19 % → 75 % FW under a slow truck-left | Typewriter accelerating from ≈4 cps to a 30–50 cps burst |
| Chat bubble / answer | not re-measured | ~22 px → ~33 px after push-in [approx glyph-box estimate] | Regular, bold keywords ("Annual Revenue", "Industry", "Tech Stack") | Sentence | 0 | Left-aligned in chat pane | Fade-in; table cells type left→right |
| End cards | 41–43 px (≈5.8 %) at rest | ≈60 px (≈90 px, 8.3 %) | Medium (≈500) | Sentence case, terminal period | 0 at rest. Word spacing animated (exit gaps ≈1.5×, line +16 %; entry gaps ≈1.25× tightening to rest). | Optical centre (ink y ≈ 330–390), single line | Staircase collapse / spaced → tight / crisp cut-in. Exit by shrink + fade or spacing-expand + fade. |
| Logo lockup | Wordmark box 69 px tall (9.6 %), lockup ≈50 % FW | — (≈104 px box @1080) | Brand wordmarks | — | — | Centred, "×" separator | Converge 20–39 px + fade-in (from ≈80 % black side, ≈50 % orange side) in 8 f |

- Typeface: a geometric/humanist sans that matches HubSpot's brand face (Lexend Deca / HubSpot Sans family) [inferred]. One family throughout, plus the native wordmarks.
- Leading: every card is a single line. In-UI paragraphs use about 1.4× leading [inferred from the 20.25 frame].
- Max words on screen: 9 for typed lines (headline, query). End cards have 2–5 words. The answer paragraph and table carry about 60 words, but they are texture and are scrolled past in about 1.5 s.
- Readability in motion: drift speeds on cards are ≤2 px/f while text must be read. Fast motion happens only in the first or last 6–10 frames.
- Hierarchy is created by weight (Bold "first"), colour (orange sprocket) and size jumps between scenes, not inside a frame. Each frame has one text level.

## 9. UI Animation observed

- **Believable fidelity:** a real ChatGPT composer (+, tools icon, "Research ×" chip in blue, "Add sources ⌄" chip, mic, round black voice button), a real dropdown (Web search with toggle on, HubSpot with toggle off, "Connect more"), a real HubSpot "Target accounts" index page and a real chat answer with a table. No invented floating cards.
- **Text-to-UI build:** the component materialises around content the viewer has already read. Order: shadow and border (1–3 f), brand icon pop (≈3 f), secondary toolbar row (4–5 f).
- **Cursor:** an OS arrow that becomes a pointer hand on hover. It appears already on the first target and then travels slowly (~900 ms) to the second. Click states: pressed chip and pressed knob, each for one frame.
- **State changes:** chip label swap (1 f), toggle fill + knob jump (1 source frame, then a 3 px settle; 3 f / 100 ms total), row hover fill. The dropdown opens with a 2 f row stagger, 6 f total.
- **Data visualisation:** a generated table builds row by row (≈130–200 ms per row) with cells typing left→right, while the camera scrolls with acceleration.
- **UI to 3D:** the 2D chat UI turns out to be a plane in a 3D studio (pull-back), and the HubSpot window turns into particles. This is the only UI-to-3D moment, and it explains the integration.
- **Depth cues:** soft drop shadows on bar and dropdown (large blur, low opacity). The glass-like chat-pane edge partially veils the HubSpot window behind it. No glows.

## 10. Transitions observed

| # | Time | Type | Duration | Mechanics | Sound |
|---|---|---|---|---|---|
| T1 | 2.133 | Hard cut on motion + polarity flip (black → white), concept match (dot → caret) | 0 f (the converge before it is 6 f of ease-in) | Outgoing words converge at 75 px/f. Incoming caret sits static at frame centre where the dot was. | Hit at 2.10–2.15 |
| T2 | 3.37–3.93 | Seamless camera re-centre | ≈17 f (most of it in 10 f) | 2D pan, fast-attack ease-in-out | — |
| T3 | 7.80–9.03 | Text → UI morph + pull-back | ≈37 f | Elements build around the text, then zoom out ×0.75 | Riser begins ~6.4 s |
| T4 | 10.367 | Hard cut on a click (action → payoff) | 0 f, 3 f after the track fills (1 f after the final knob settle) | UI → brand lockup | Riser crest 10.30–10.35, then 300 ms silence |
| T5 | 13.033 | Hard cut on the beat drop after an accelerating push-in | 0 f | Logo push-in (ease-in) → macro shot sliding in (ease-out) | Drop at 13.05 after a 100 ms gap |
| T6 | 17.800 | Match cut on upward motion (prompt → sent bubble) | 0 f | Velocity hand-off: 7 px/f ease-in before, 34 px/f ease-out after | Small whoosh/hit at 17.80 (≈3 dB over the music bed) |
| T7 | 18.00–19.00 | Screen-to-world 3D pull-back reveal | ~30 f | ×0.57 in 10 f, then a further ×0.56 while decelerating (×0.32 total); environment fades in over 6 f | Under music |
| T8 | 19.00–19.95 | Particle disintegration (object dissolve as wipe) | ~28 f | Left→right sweep, ≈350 px/s | 70 ms silence + hit at 19.05 |
| T9 | 19.95–20.47 | Dolly through a foreground layer (depth transition) | ~15 f | ×2.3 push, bokeh particles exit frame left | — |
| T10 | 21.47–21.73 | Blur (defocus) dissolve into kinetic type | 8 f | Table blur grows over 4 f and fades. Text cuts in crisp at 21.60 and collapses its staircase in 7–10 f. | Hit at 21.43–21.47 |
| T11 | 22.600 | Hard cut after ease-in shrink | 0 f | Card shrinks ×0.76 (ease-in, 20 px/f on the last frame); the next card enters oversized (×1.18) | Kick at 22.77 (+5 f, not synced) |
| T12 | 24.767 | Word-spacing match cut | 0 f | Gaps widen ≈1.5× (line +16 %, drifting left) and fade out → next card enters spaced and tightens | Onset 24.78 |
| T13 | 26.067 | Hard cut after shrink + fade | 0 f | ×0.81 + fade (ease-in) → next card enters larger | Soft note at 26.07 |
| T14 | 27.367 | Hard cut to the reprised lockup | 0 f | Last-frame fade → lockup with an 8 px-per-side converge (≈9 f) | Peak 27.40, gap 27.65–27.75, sting 27.85 |

There are no crossfades between scenes. The only dissolve is a blur-dissolve. There are no wipes with shapes and no whip pans.

## 11. Editing Rhythm

- **Shots:** 10 (8 hard cuts + 1 blur dissolve; 2 long continuous takes with seamless internal moves). **ASL 3.00 s**, median 2.42 s, shortest 1.13 s (shot 6), longest 8.23 s (shot 2). Counted as 15 "beats" (seamless internal moves split), the average is about 2.0 s.
- **Acceleration:** 0–17.8 s has 4 shots (ASL 4.45 s), which is slow, intimate and typing-driven. 17.8–30 s has 6 shots (ASL 2.04 s), with the hero move and then 1.13–2.17 s text cards. The cutting gets faster toward the CTA, then a 2.66 s lockup with a 2.2 s dead hold ends it.
- **Pauses / breathing room:** typing holds of ≈1.1 s at 2.87–3.97 (with the re-centre pan inside it) and ≈0.95 s at 5.3–6.27. A 0.6 s hold on the finished headline (7.2–7.8). A 0.77 s static logo hold (10.63–11.4). The final 2.2 s still.
- **Hero moments:** 13.03 beat drop (macro prompt) and 19.0–20.5 (particle transfer + fly-through).
- **Beat sync:** music is ~86 BPM (0.697 s beat). Against the pre-computed onset list, **3 of 8 hard cuts land within ±2 frames** (13.033, 24.767, 27.367). Against 50 ms RMS transients, **6 of 8 have a clear transient within ±2 f**: 2.133 (+7 dB rise at 2.08–2.12), 10.367 (riser crest 10.30–10.35), 13.033 (drop 13.04–13.07 after the −45 dB gap), 17.800 (only a ≈3 dB bump on loud music, weak), 26.067 (+8 dB soft note at 26.06) and 27.367 (+16 dB hit at 27.39). 24.767 shows no RMS change (flat −13 dB). It counts only through the spectral onset at 24.78, which makes **7 of 8** if spectral onsets are included. The exception is 22.600, where the RMS is flat and the kick lands 5 f later (rise at 22.77). Absolute dB values in this doc are meter-dependent: mono 50 ms RMS reads about 2–4 dB lower than the figures quoted elsewhere, but the relative shapes match. Seamless events are synced too: toggle on (10.267 vs click onset 10.24), dissolve start (19.00 vs hit 19.05), blur transition (21.47 vs hit 21.43). The sprocket pop (23.333) is about 3–4 f ahead of a hit at 23.47.
- Editing is **feature-driven in the first half** (typing and UI timings decide cuts) and **music-driven in the second half** (cards sit on transients).

## 12. Sound Design

- **Loudness:** integrated −14.2 LUFS (streaming norm). Speech-likelihood values (0.2–0.81) are false positives from tonal music. The spectrogram shows no formant structure, so there is **no voice-over** [high confidence].
- **0.00–3.0 s:** a sub-heavy impact (−5.8 dB RMS in 50 ms, energy 20–100 Hz) with a descending tonal glide (~600 → 330 Hz over 0.5–2.5 s) that mirrors the falling dot. The tail decays to −42 dB by 3.5 s.
- **2.5–7.2 s:** near-silence (−41 to −45 dB) with soft keyboard ticks visible as broadband transients in the spectrogram during the typing bursts (≈20–25 dB under the later music). Intimate, focused, ASMR-like.
- **6.4–10.35 s:** a tonal riser (ascending harmonics ~1–1.8 kHz and ~3–5.4 kHz, swelling low-mids at 190–330 Hz). It crests at 10.30–10.35 (−12 dB) on the cut to the logo, then drops to −46…−64 dB for ~350 ms (10.60–10.95) until the first pluck at 10.97.
- **10.95–13.0 s:** a sparse pluck/arpeggio motif (descending figures ~1.8 kHz → 580 Hz), with a 100 ms gap at 12.85–12.95 before the drop.
- **13.05–25.5 s:** full track at ~−15 dB, about 86 BPM: kick/bass blocks (20–190 Hz) and repeating plucks. There are short bass dropouts at ~16.6–17.0 and ~20.6–21.0, and a whoosh/hit at 17.80 (the send).
- **Silence before hits:** a repeated device. 10.6–10.9 (after the crest), 12.85–12.95 (before the drop), 18.95–19.02 (before the dissolve hit), 27.65–27.75 (before the final sting).
- **25.5–27.3 s:** breakdown (sustained 100–330 Hz pad, −22 to −32 dB) under the CTA. This is quieter so the call to action reads calmly.
- **27.40 / 27.85–30.0 s:** a hit on the lockup cut, then a full-band sting (−7 dB RMS, the loudest sustained moment) under the static logo. It holds flat from 27.85 to about 29.05 (≈1.2 s), then decays to about −65 dB by 30.0. So the last ~1 s of the static hold sits on a fading tail, not a held chord.
- **UI sounds:** a click at 10.24 on the toggle, quiet keystrokes and a send whoosh. The UI sounds are sparse, which keeps the product feeling clean.

## 13. Visual Quality

What makes it premium:
- Restraint: about 92–95 % of every 2D frame is white. One accent colour carries meaning. One typeface.
- Every motion is motivated by typing, sending, connecting or data flowing. Nothing floats without reason.
- Easing discipline: ease-out on entry, ease-in into cuts, no overshoot. Micro-interactions run at real UI speeds (100–200 ms).
- Depth is saved for one hero beat. There it uses real DOF bokeh, foreground parallax and a cohesive blue-grey environment.
- The film opens and closes with a clear brand frame (logo reprised in an identical position), and the CTA uses the brand's own tagline ("grow better").

Flaws:
- Delivery: a 25 → 30 fps conversion by frame duplication (judder on slow scrolls and pans, every 6th frame repeats). Low video bitrate (~176 kb/s at 720p) causes macro-blocking on small UI text and soft particles.
- HubSpot window texture is low-resolution and partly greeked (blurred placeholder rows) and is visible at 18.4–19.0.
- In 18.4–19.0 the HubSpot window intersects the glass edge of the chat pane (a hard vertical seam that slides from x ≈ 230 to ≈ 485 px as the camera settles), so the layering is ambiguous for a few frames.
- Hook type is small (cap height 3.6 % FH, font ≈5 % FH) on black, and will be weak on phones.
- Four consecutive centred, same-size text cards (21.5–27.4) differ only in micro-animation. The section is slightly repetitive and lacks hierarchy. The cut at 22.60 misses the kick by 5 f.

## 14. Style Category

**Minimal Premium SaaS × UI-Focused Demo, with one Cinematic 3D "data-transfer" beat.** Suggested library name: **"Prompt-Native Launch"**. In this style the film is staged as a conversation with the product: typed headline, real composer UI, sent message, AI answer. It is best for AI/LLM features, integrations and connectors, with a 20–45 s duration, a ~85–95 BPM minimal electronic or pluck track, and no VO.

## 15. Transferable Rules (concrete, numeric)

1. **Typed headline as hook-to-product bridge.** Type filler words at 28–35 cps and the key noun phrase at about 9 cps. Pause 0.9–1.1 s at phrase breaks. Keep the caret blinking 0.3 s on / 0.3 s off. Lock the caret at 65 % of frame width once the line passes centre, and let the start of long lines overflow the left edge.
2. **Build UI around read text.** Order: shadow/border (1–3 f), brand icon pop (3 f), secondary controls slide in (4–5 f). Then pull back ×0.75 over ≈21–31 f (main move plus a 1–2 px/f ramp and tail) with cubic ease-in-out (peak speed at ~50 %).
3. **Accelerate into every cut, decelerate out of it.** The last 6–10 f before a hard cut use ease-in (shrink −10–20 %, push +10 %, scroll 8 → 24 px/f). The first 6–20 f after it use ease-out.
4. **Match cut on direction of motion.** Exit at about 7 px/f ease-in and enter at about 30–35 px/f ease-out in the same direction (prompt → sent bubble).
5. **Screen-to-world reveal.** Pull back ×0.55–0.6 in about 10 f (ease-in), fade the 3D environment in over about 6 f, then keep pulling back another ×0.55 while decelerating over about 18–20 f (≈×0.3 total in ≈1 s). Use a cool blue-grey radial set (#C8D4DF → #F4F5F8) under white UI planes.
6. **Explain integrations with particles made from the UI's own colours.** Use 200–300 discs, a 0.9–1.0 s left→right sweep (~350 px/s at 720p), drifting toward the destination. Follow it with a ×2–2.5 dolly through the particles so near ones go bokeh (DOF).
7. **Micro-interaction timings:** dropdown 6 f, row stagger 2 f, toggle 1–3 f, label swap 1 f, cursor travel 800–900 ms, payoff cut 3 f after the state change.
8. **Kinetic emphasis motif:** stagger words on a diagonal (step ≈5 % FH) and collapse to the baseline in 7–10 f (ease-out or ease-in-out). Use tracking-in (−15–20 % width in 4 f) on the single hero word. Use weight, not size, for emphasis.
9. **Every card drifts.** Scale −13 to −24 % per card (ease-out entry, ease-in exit). The only static frame is the final logo hold of ≥2 s.
10. **Word-spacing match between cards:** exit by widening the word gaps ≈1.5× (line ≈+15 %) and fading to ~60 % over about 18 f, then enter the next card with gaps ≈25 % open and tighten over about 8–10 f.
11. **End-card sizing:** cap height ≈5.8 % FH (≈63 px @1080), font ≈8 % FH (≈90 px @1080) [inferred from cap], Medium weight, sentence case, 2–5 words, a single centred line, one card per 1.1–2.2 s.
12. **Logo lockup:** converge halves 20–40 px toward the separator over 8 f while fading in from ≈50–80 %. Let the colour half finish its fade about 5 f later. Use it mid-film on a riser crest and reprise it at the end in the identical position. Final hold ≥2.2 s.
13. **Audio sync:** put 70–300 ms of near-silence before key hits (drop, reveal, sting). Land hard cuts within ±2 f of a transient (target ≥80 %). Put the beat drop at about 40–45 % of the runtime, at the switch from setup to demo.
14. **Sound mirrors motion:** a pitch glide that follows a falling object, quiet keystrokes (20–25 dB under music), one click per UI state change, one whoosh per send.
15. **Polarity flip as a cold open:** use about 2 s on black for the "announcement", then a hard cut to the white product world on the first audio hit.

## 16. What to Avoid

- Frame-rate conversion by duplication (25 → 30). Render natively at the delivery frame rate.
- Delivery bitrates that blur small UI text. Use ≥8–12 Mb/s at 1080p for UI-heavy films.
- Placeholder or greeked or low-res UI textures in 3D hero shots, which are the moments viewers scrutinise most.
- Ambiguous plane intersections (a window poking through the glass edge of another plane).
- 4+ consecutive centred text cards with the same size and treatment. Vary scale, add an icon or UI tie-in, or merge into one kinetic sequence.
- Hook text with a cap height under ~5 % FH (this film uses 3.6 %) if the film will be watched on phones.
- Cutting a few frames ahead of a kick (22.60 vs 22.77). If a cut cannot sit on the transient, move it to a silence gap instead.
- Overshoot or elastic easing in this calm premium style. This film never uses either, and it would break the tone.

## Verification

Adversarial re-check (second pass; an earlier checker had already edited this file and left the zoom sheets `zoom/v_*.jpg`, but had not added this section). The whole file was re-read for consistency. Each claim below was re-measured from the video with a frame-difference scan of all 901 frames, per-frame ink and bbox tracking at 30 fps, glyph-level ink boxes, blue and orange colour tracking, 50 ms mono RMS, and frame sheets `zoom/c_*.jpg`.

| # | Claim | Re-measurement | Result |
|---|---|---|---|
| 1 | Cut list: 10 shots, hard cuts at 2.133, 10.367, 13.033, 17.800, 22.600, 24.767, 26.067, 27.367, plus a blur dissolve at 21.47. 25→30 fps cadence with the repeat on frame ≡ 3 (mod 6). | Diff scan: spikes at exactly those 8 frames. Rising diffs plus defocus at 21.467–21.73 (sheet `c_nocx.jpg`). 277 of 900 diffs are < 0.05, and 126 of those fall on frame ≡ 3 (mod 6). 901 frames, 30.033 s, 175.5 kb/s. | **Confirmed.** The shot table covers 0.000–30.033 with no gaps or overlaps, and the §3 and §11 arithmetic (proportions, ASL 3.00, median 2.42, 4.45 / 2.04 split) checks out. |
| 2 | Hook: dot rises 212 px in 17 f with steps 31, 56, 37, 24…; falls 172 px; converge 505 → 364 px; "first" tracks 85 → 71 px. | Dot top y 348 → 136 by f17 with steps 31, 56, 37, 24, 16, 13, 9, 7, 6, 4, 4, 2, 2, 1. It falls to 308 at f62 (last step 24 px/f). Line width 505 → 501 → 492 → 475 → 438 → 364. "first" 85 → 78 → 74 → 71 px. | **Confirmed.** One step corrected (16 → 17, 75 → 74). In the typography table "starts +17 %" became "starts 20 % wide, tracks in −17 %". |
| 3 | Shot-2 pull-back 1.00 → 0.755 over 8.13–9.00 (the summary JSON says ×0.795), peak velocity at ~50 %. | "ChatGPT,"…"CRM" span is 472 px at rest (7.5–8.0) and 354 px after, so ×0.750. "ChatGPT," 146 → 110 px and "power" 97 → 72 px agree. The left edge of "power" moves 8.0–9.03 with a smooth peak of 18 px per source frame at 8.50–8.60. The old per-frame list had a spurious 26 px spike. | **Corrected** to ×0.75, with timing 8.0–9.03 (main move 8.2–8.9) and a new step list. The ×0.795 in master-args.json is wrong. |
| 4 | Re-centre pan of 154 px in 10 f (3.37–3.70); "Get the power" typed at 28 cps; 0.9 s hold. | Left edge 636 → 461 (175 px) over 3.37–3.93 with steps 2, 10, 21, 31, 29, 23, 17, 12, 9, 7, 5, 4, 3, 1, 1: fast attack, long tail. "Get the power" is complete at 2.87 (≈35 cps). Typing pauses 2.87–3.97 (≈1.1 s) and 5.3–6.27 (≈0.95 s). "of ChatGPT," ≈9 cps and the final burst ≈27 cps are confirmed. The caret is locked at 826–851 px from 4.6 to 7.2. | **Corrected** in shot 2, Study B, §7, T2, §8, §11 and rule 1. |
| 5 | Toggle: track fills at 10.267, knob at its end by 10.300 (3 f); cut 2 f after the knob lands. Chip swap 10.200. | Chip swap at 10.200 is confirmed (`c_chip.jpg`). Blue-pixel and knob tracking (`c_toggle2.jpg`): pressed at 10.233; at 10.267 the track is filled and the knob is already at the end; 10.300 is a cadence duplicate (diff 0.35); 10.333 is a final ≈3 px settle. Dropdown opens 8.867–9.067 with a 2 f row stagger (`c_dd.jpg`), confirmed. | **Corrected:** the toggle completes in 1 source frame (3 f including the settle), and the cut is 3 f after the fill and 1 f after the settle. Updated shot 2, Study C, §9, T4 and rule 7. |
| 6 | Logo: converge OpenAI +20 / HubSpot −38 px in 8 f with a fade from ~70 %; orange settles ~5 f later; push-in +10.6 % ease-in; lockup 51 % FW; end reprise converges 9 px in ~12 f. | OpenAI 308 → 328 and HubSpot 735 → 696, both final at 10.634 (8 f). The fade starts at ≈80 % (black) and ≈50 % (orange), and the orange reaches full opacity ≈5 f later, so the stagger is in opacity, not position. Width 254 → 281 (×1.106) with accelerating increments from 11.3. Lockup 328–966 px is ≈50 % FW. End: 319 → 327 and 708 → 700 (8 px per side), settled 27.667, and static from ≈27.87 to the end. | **Partly corrected:** opacity values, stagger wording, lockup ≈50 %, end converge 8 px / ≈9 f, push-in sample list. The +10.6 % ease-in is confirmed. |
| 7 | Shot 4: caret locked at x ≈ 850 (66 % FW); truck 13.6–15.5; settle zoom-out −2.5 % (16.4–17.1); typing ~8 → 30 cps. | The caret's right edge moves 249 (13.3) → 515 (15.5) → 850 (16.0) → 960 (16.37) → 915 (17.4), so it is **not locked**. Sprocket x 634 → 90 shows one long ease-in-out truck left, ≈13.6–17.3, peaking at 15.3–15.7. Word widths are identical at 16.4 and 17.3 ("industry," 103/104 px, "stack." 113/114 px), so **there is no zoom-out**. Typing runs from ≈4 cps (S…Segm, 13.28–14.03) to a 30–50 cps burst (15.0–16.0). The 54 px / 6 f bar slide-in is confirmed. | **Corrected** in §2(a), shot 4, the WHY note, §7 (new "typing-follow truck" row) and §8. |
| 8 | Send match cut: 3, 3, 5, 7 px/f before, then 34, 34, 31, 7, 4 px/f after; 3D pull-back ×0.57 in 10 f "then settle". | Before/after velocities are confirmed exactly (`c_send.jpg`). Bubble text width 604 → 346 by 18.33 (×0.57), but it keeps shrinking: 305 (18.37), 255 (18.5), 225 (18.63), 197 (18.97), 194 (19.03). The "settle" is a further ×0.56, so the total is ×0.32 (`c_settle.jpg`). The glass seam moves x 229 → 484 over 18.4–19.0, not a fixed 527. | **Corrected** in shot 5, Study E, §7, T7, the Phase-2 scale note, rule 5 and the §13 flaw. |
| 9 | End cards: cap height 41–43 px (5.8 % FH; the summary JSON says 48–50 px / 6.7–7 %); "No complex setup." staircase ≈98 px; collapse 7–10 f; ×0.80 / ×0.76; "All powered…" 900 → 763 px, exit +12 % (823 → 919). | Glyph boxes: "N" 42 px, "A" 43 px, "C"/"H" 43 px, "and start…" x-height 31–32 px. Baselines at 21.60 are 446 / 476 / 546 (≈100 px spread), and the residual spreads match. Width 539 → 433 → 413 (×0.80 / ×0.77). "All powered" 900 → 763 and the 72 px re-centre are confirmed, but the exit width is 823 → ≈958 (+16 %) on the last frame: gaps ≈1.5× plus an ≈85 px drift left. "Connect…" centre 689 → 654 with gaps ≈30 → 24 px; shrink 843 → 684 (×0.81) confirmed. "and start…" 734 → 700 → 642 confirmed. | **Typography confirmed** (the JSON's 48–50 px is wrong). The spacing exit was **corrected** to +16 % in shot 7, Study G, §8, T12 and rule 10. |
| 10 | Audio sync: 3 of 8 cuts within ±2 f of pre-computed onsets; 6 of 8 have a clear RMS transient (7 of 8 counting the 24.78 spectral onset); 22.60 misses (kick +5 f). Silence gaps before hits. | 50 ms RMS: rises at 2.083 (+9 dB), 10.29 (+6.5), 13.058 (+11), 26.04 (+8) and 27.39 (+15). 17.80 shows only a ≈3 dB bump. 24.767 and 22.60 are flat, with the kick at 22.75. Onsets list: 13.0, 24.78 and 27.31 fall within ±2 f. Gaps: 10.6–10.95 (to −61 dB, pluck at 10.975), 12.88–12.93, 18.95–19.03 (hit 19.05), 27.65–27.80 (sting 27.83, flat to ≈28.9, −60 dB by 30.0). | **Confirmed.** Absolute dB differs by a few dB with the downmix, as already noted in §11. |

Not re-measured (left as stated, most already flagged as approximate or inferred): particle count, disc sizes and colours; the dolly ×2.3 and lateral-settle steps; answer and table text sizes; the HubSpot window width; cursor travel time; keystroke levels and spectral details.

Summary JSON (`workflows/master-args.json`) is out of date relative to this file: ×0.795 (should be ×0.75), end cards 48–50 px / 6.7–7 % FH (should be 41–43 px / 5.8 %), hook ≈29 px / 4 % FH (cap 26–28 px / 3.6–3.9 %), "caret-lock 65–66 % FW … 13.6–16.3 s" (not locked in shot 4), "settle zoom-out −2.5 %" (none), "−5.4 dB whoosh" at 17.80 (only a ≈3 dB bump over the music), "word spacing +12 %" (+16 %), "3D pull-back ×0.57 … about 1.0 s" (×0.32 total).
