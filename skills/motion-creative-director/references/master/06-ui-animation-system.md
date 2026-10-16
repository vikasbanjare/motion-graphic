# Master SaaS Motion Design System, Part 06
## Master §8 UI Animation Rules (Phase 6: the UI Animation System)

Draft v1, 2026-10-08. Built from the frame-level teardowns of the eight reference films in the user's folder, plus text-only research. It covers every UI element and behaviour listed in the Phase 6 brief: browser and device frames, cards, dashboards, charts, buttons, menus, tooltips, notifications, search, forms, navigation, cursor, scroll, zoom into elements, hierarchy, depth, glass, shadows and highlight states. It also sets the principles that make UI motion read as a working product instead of random floating screens. A senior motion designer, an editor or an AI-video system should be able to build, prompt and QC any UI shot from this part without guessing.

Scope and cross-references:
- **Timings.** Part 03 §18.2-18.4 (SP-UI, SP-C, SP-D) is the single source of truth for UI, cursor and data speeds. This part repeats the numbers UI work needs most and adds the rules, states and choreography around them. If the two parts ever disagree, re-measure and fix both; do not pick one silently.
- **Camera through UI.** Part 04 CM-16 (screen-to-world), CM-17 (travelling through UI) and CM-20 (cut-in and pull-out cuts).
- **Glass, shadow and light recipes.** Part 02 §11 (CL-U9, CL-U11, CL-U19, CL-U20) and Part 04 DP-13.
- **Ease tokens.** Part 03 §19.3: E-OUT, E-SNAP, E-SNAP-L, E-GLIDE, E-INOUT, E-HOP, E-SETTLE, E-EXIT, E-WHIP, E-LERP, E-LINEAR, E-CRIT, E-SPRING-P. This part uses only those names.

---

## 0. How to read this part

### 0.1 Units

- **f** = one frame at 30 fps = 33.3 ms. 30 f = 1 s.
- **% W / % H** = percent of frame width / height. Teardowns write frame height as "FH"; it is the same as % H.
- **px @1080p** = a 16:9 frame of 1920×1080. **px @1920p** = a 9:16 frame of 1080×1920.
  - 1% H = 10.8 px @1080p = 19.2 px @1920p.
  - 1% W = 19.2 px @1080p = 10.8 px @1920p.
- **Speed** in % W per frame (**% W/f**). 1% W/f = 19.2 px/f @1080p = 576 px/s.
- Values measured at source resolution (640, 720 or 567 px tall) and converted are marked **(computed)**.

### 0.2 Evidence tags (same as Parts 01-04)

| Tag | Source | What it may support |
|---|---|---|
| `[V:<id6> t=..s]` | Frame-level teardowns of the user's 8 reference films | Everything, including frame timing. Strongest evidence. |
| `[S:<brand>]`, `[S:playbook]` | Superside text research on 20 SaaS videos | Intent, structure and vocabulary only. No frame timing. Several of its UI specs are **proposals** that nobody observed; they are labelled "(proposal)". |
| `[E]` | ElevenLabs style brief | Brand rules and the open-source orb, waveform and shimmer code are sourced. Its UI motion timings are its author's inference. |
| `[N]` | Motion-numbers brief: Material 3, Carbon, Apple, WCAG, Netflix/BBC, platform safe zones | Generic numeric norms |
| `[P]` | Voice and footage pipeline brief (ElevenLabs, Veo/Flow) | AI-video generation facts |
| `[W:raivcoo]`, `[W:showreel-design]`, `[W:motion-so]` | Inspiration-site catalogues, text only | Naming, intent, style labels. Never timing. |
| `[inferred]` | My synthesis | Not directly observed or sourced |

Text-only sources never support a frame-level claim. Where the references disagree with generic advice, **the references win**, and a "References win" note says so (all collected in §8.15).

### 0.3 Rule IDs and classes

| Prefix | Covers |
|---|---|
| **UI-B** | Believability laws (§8.1) |
| **UI-R** | Real vs mock UI (§8.2) |
| **UI-E** | Element cards (§8.3) |
| **UI-C** | Cursor physics (§8.4) |
| **UI-K** | Typing and caret (§8.5) |
| **UI-SC** | Scroll (§8.6) |
| **UI-Z** | Zoom-to-element and focus (§8.7) |
| **UI-D** | Depth, glass, shadow, light (§8.8) |
| **UI-H** | Highlight and state language (§8.9) |
| **UI-L** | Legibility and hierarchy (§8.10) |
| **UI-P** | Choreography patterns (§8.11) |

Class letters: **U** = universal (≥3 of 8 references, measured, none contradicting); **S** = style-specific; **X** = experimental (one reference or untested); **A** = avoid; **SaaS** = especially good for SaaS. "n/8" counts references that show the pattern.

### 0.4 Reference roster

| Tag | Reference | Frame / length | UI role in the film |
|---|---|---|---|
| [V:1-6l8S] | kivi, voice-AI dictation launch | 16:9, 77.8 s | Glass voice cards and result cards over defocused life plates; real app icons |
| [V:126cpH] | Chowdeck delivery-app ad (measured through a crop of an After Effects preview) | 9:16, ~18 s | Light UI cards in a flat illustrated world; card → notification morph; map tracking |
| [V:15VhHR] | Wix AI site builder | 16:9, 53.9 s | Real product UI (chat, editor, modals) inside an editorial brand frame |
| [V:19NRDv] | Bumper PRO payments launch | 16:9, 67.2 s | Flat product art rendered as tilted 3D planes; brand 3D cursor |
| [V:1CSXtQ] | OpenAI × HubSpot connector spot | 16:9, 30 s | Real ChatGPT composer and HubSpot page; one 3D data-transfer beat |
| [V:1Hcg3X] | "How do solar panels work?" | 16:9, 35.8 s | No software UI; UI grammar only (highlight flare, gauge states, comparison panel) |
| [V:1ccYWJ] | Lottieicon icon-library promo | 16:9, 44.3 s | Product icons animating inside believable UI components; glow = active |
| [V:1i2L14] | NOSTRA studio promo | 16:9 inset, 35 s | Design-tool chrome, typing dots, cursor, CTA button; no product UI |

---

### 0.5 UI census: what the eight references actually show

| Ref | UI source | Frame / chrome | Cursor | Signature UI behaviour | Depth and material | UI flaw its own teardown flags |
|---|---|---|---|---|---|---|
| kivi [V:1-6l8S] | Recreated, stylised (voice cards, email, code, sheet) plus real Gmail / WhatsApp / Excel icons | None. Cards float on defocused painterly plates | Glossy purple-gradient 3D arrow, used once: hover lift, click → light bloom | "Say → see": words stream at the speaker's pace, then an empty result card holds 8-9 f and cascades | Frosted glass, 1 px light rim, soft inner glow, soft shadow; heavy plate blur | Micro-text 1.2-2% H unreadable; icon row with zero stagger and one unknown app |
| Chowdeck [V:126cpH] | Recreated light UI cards in a flat world | None. Cards sit on flat colour | Orange brand hand: 8 f approach, 10 f dwell, press with a pixel-break | Order card collapses into a notification; status cycles inside one container; route draws leg by leg | Offset solid backing card instead of a blur shadow; rack focus | Line items ≈1% H illegible; "Order delivered" status on screen for 2 f; the whole ad, UI included, is animated on twos (≈12 poses/s), so its frame timings carry ±1 pose (≈2-3 f) of error |
| Wix [V:15VhHR] | **Real product UI**: chat module, editor tool rail, contextual toolbar, AI Image Creator, Object Eraser, tone dropdown, section picker, order summary, booking calendar | None. Pages full-bleed, or rounded cards on black or on matching photography | Native macOS arrow ≈2% H, ballistic 15-20 f moves, 0.3-1.0 s hover | Prompt bar locked across 6 shots while worlds swap behind it; cyan = "AI is acting"; selection box persists across cuts | 3D used three times only (heart, ice object, card deck); page window over its own world photo | Micro-copy 1-1.5% H; "make" vs "create" copy change across a cut-in |
| Bumper [V:19NRDv] | Recreated flat product art with realistic data (merchant IDs, GBP amounts, July 2025 dates) | None | Glossy orange 3D paper-plane arrow: flies in with blur, parks, clicks | Context → extraction → focus; toggle → chart reacts; counter 84 → 100%; failover told in colour states | Glassy translucent planes, DOF, contact shadows, motion blur | Micro-text ≈1% H; low-contrast violet glass bars on navy (its teardown asks for ≥3:1; the ratio itself was not measured) |
| HubSpot [V:1CSXtQ] | **Real UI**: ChatGPT composer, dropdown, HubSpot "Target accounts" page, generated answer table | None. Flat white with soft shadows; one 3D studio beat | OS arrow that turns into a pointer hand on hover; appears already on the first target | Headline typed first, UI built around it; dropdown 6 f; toggle 3 f; send → match cut; data leaves as particles in the UI's own colours | Soft drop shadows; glass edge on the chat pane in the 3D beat | Greeked low-res HubSpot texture; one plane intersection; low bitrate |
| Solar [V:1Hcg3X] | No software UI. UI grammar: switch highlight flare, battery gauge, split-screen comparison, recap strips | n/a | None | Gauge fill eases; discrete states snap in 0 f; ⚠ rides the level line | Hard long shadows; bloom only on emitters | Recap labels 2.2-2.5% H; state snaps off-beat and unexplained |
| Lottieicon [V:1ccYWJ] | The product (animated icons) placed in believable UI: toolbar pill, app tab bar, search pill, highlight tiles | App panel with a grey bezel #CACACA; toolbar pill cropped by the frame edge | None. The camera acts as the pointer (hop-and-hold) | One animated element at a time inside a still component; glow = active; circle → search pill → URL → spinner | Emissive under-glow; extruded card edges; DOF only on CTA bubbles | Chips 1.5% H, URL 2% H; pans of 22-27% W/f with no blur; accidental-looking crop |
| NOSTRA [V:1i2L14] | No product UI. Design-tool selection boxes, typing dots, cursor, CTA pill, form sheet, glass tiles; the film sits inside a fake player with a chapter bar | Player wrapper uses 21% of canvas height | Thick stroke-drawn arrow: rotates to cue the next move, taps text to trigger a transition, 25 f approach to the CTA | Click-caused transitions; CTA press −20% in 3 f, release in 6 f with no overshoot | Frosted glass tiles with a lighter rim; grain-gradient 3D | Wrapper caps resolution; unlabelled feature metaphors |

**What the census says**
1. **0 of 8 show browser chrome.** Only one shows a device-like bezel (Lottieicon's app panel). Frameless UI is the default.
2. **7 of 8 change UI state only when an actor causes it** (a cursor, a voice, typing, an AI action or a system event). Solar's gauge changes with the narration [inferred: its VO is likely but unconfirmed].
3. **6 of 8 use no overshoot on any UI element.** The two exceptions are both playful: Chowdeck's tossed card (≈4° past upright) [V:126cpH t=9.43-9.60s] and Solar's device-in-context phone, whose snap-tilt wobble overshoots to +5° and loops every 1.0 s [V:1Hcg3X t=14.50-15.17s].
4. **8 of 8 contain UI or label text too small to read, and all 8 teardowns flag it.** It is the most common UI failure in the set (UI-L1).
5. **6 of 8 show a cursor** (kivi, Chowdeck, Wix, Bumper, HubSpot, NOSTRA). Before the click that triggers each film's key result, every one gives the viewer 18-44 f of anticipation (travel plus dwell), and every one shows a state change within about 1 f of the press (UI-C4, UI-C6). The only short approach (NOSTRA's 3-4 f tap on "NO") hits a word the viewer has already read.
6. **6 of 8 morph UI out of (or into) another element instead of cutting to it**: sparkle → prompt [V:15VhHR t=3.97-4.23s], headline → composer [V:1CSXtQ t=7.80-9.03s], pill → card [V:1-6l8S t=9.50-9.93s], card → notification [V:126cpH t=11.03-11.27s], circle → search pill [V:1ccYWJ t=39.07-39.70s], clicked word → logo [V:1i2L14 t=32.0-32.17s].
7. **None of the 8 is a raw screen recording.** Even the two films that show real product UI rebuild it as clean layers.

### 0.6 Defaults card: the UI numbers to encode first

| # | Parameter | Default | Range seen | Evidence |
|---|---|---|---|---|
| 1 | Frame / chrome | **Frameless rounded card**; device frame only for mobile-app or device-as-product shots | 7/8 frameless | §0.5 |
| 2 | Hero UI card width | **65-80% W** (16:9); **≈75% W = 810 px** (9:16) | 55-85% W | [V:1-6l8S] 65-85%; [V:15VhHR] 57%; [V:1CSXtQ] 77%; [V:1ccYWJ] 55%; [V:126cpH] 75% |
| 3 | Card corner radius | **24-32 px @1080p** (1.2-1.7% W); glass voice cards up to 2-3% W | 16-58 px | [E] 32 px in video, 16-24 px on web; [V:1-6l8S] ≈2-3% W; [V:19NRDv] 16-24 px [inferred] |
| 4 | Card entrance | **12 f E-OUT**, rise 5-8% H, opacity in over 6-8 f | 6-25 f | Part 03 SP-UI; [V:1ccYWJ t=18.83s]; [V:1CSXtQ t=13.03s] |
| 5 | Microinteractions | **Real UI speed**: label swap 1 f, toggle 3 f, dropdown 6 f (rows 2 f apart), popover 1-2 f | 1-6 f | [V:1CSXtQ t=8.867-10.333s]; [V:15VhHR t=16.8s, 24.23s] |
| 6 | Overshoot on UI | **0%** (E-CRIT if a spring API is required) | 0% in 6/8 | §0.5 |
| 7 | Result cascade | **Empty hold 8-9 f**, then elements every **3-4 f**, each fading 4-6 f; **13-22 f** total, in reading order | 12-22 f | [V:1-6l8S t=22.87-23.87s, 67.73-68.50s]; [V:15VhHR t=12.47-12.83s] |
| 8 | Stagger ladder | Rows / chips **2 f**; words and cells **2-4 f**; cards **4 f**; large objects **5-7 f** | 1-10 f | [V:1CSXtQ] 2 f rows; [V:15VhHR] 4 f cards, 5-7 f objects; [V:1i2L14] 1-2 f |
| 9 | Cursor size | **Native arrow ≈2% H (≈22 px @1080p)** in real-UI demos; brand cursor 3-4% H [inferred] | — | [V:15VhHR §UI]; [E] 44 px [inferred] |
| 10 | Cursor travel | **15-20 f across the UI** (≈17 f measured; E-GLIDE, peak ≈4.3% W/f on f3-4); 8-12 f short hops; 25-27 f deliberate (E-INOUT) | 6-27 f | [V:15VhHR t=2.5-3.07s]; [V:126cpH t=9.93-10.20s]; [V:1CSXtQ t=9.2-10.1s] |
| 11 | Anticipation before a press (travel + dwell) | **18-30 f** (0.6-1.0 s); up to 44 f when the target is new | 18-44 f | §8.4 table (computed) |
| 12 | Feedback after a press | **State change on the press frame (≤1 f); consequence 3-8 f later** (max 15 f) | 0-15 f | [V:1CSXtQ t=10.200-10.367s]; [V:19NRDv t=12.03s]; [V:1i2L14 t=32.0-32.17s] |
| 13 | Hold on a meaningful UI state | **≥1.0 s**, and ≥ the text's read time | 2 f-1.1 s (short ones are flaws) | [V:126cpH rule 9]; [N] read time |
| 14 | Must-read UI text | **Cap ≥3% H (≥32 px cap, ≈46 px font @1080p)**; ≥4% H after a cut-in. 9:16: font ≥52 px | — | §8.10 verdicts; the "~3% H mobile floor" is Solar's teardown rule [V:1Hcg3X §8]; 9:16 from [N]. For 16:9 watched on phones [N] asks ≈84 px body (reach it by cut-in) |
| 15 | Texture text | Anything under **2.5% H** may never carry meaning | 8/8 flagged | §0.5 |
| 16 | Zoom into an element | **Cut-in 2-3.5×** by default; animate only when the move carries meaning | 1.65-3.4× | [V:1-6l8S t=35.47s]; [V:19NRDv t=13.13s]; [V:15VhHR t=6.57s] |
| 17 | Dim the context | **To 15% (texture) or 50% (secondary)** in 3-6 f | 15-50% | [V:1ccYWJ t=9.833s]; [V:1-6l8S t=13.77s] |
| 18 | UI motion while it is read | **≤0.2% W/f drift**, or locked | 0-0.2% W/f | Part 04 defaults #3; [V:15VhHR] locked dialogs |
| 19 | Tilt of a UI plane while read | **0-15°**; flatten to 0° in 7-8 f before reading | In transit: ≈35° Y / 20° X on fly-ins [V:19NRDv, angles inferred]; 90° only for an edge-on flip [V:1ccYWJ t=16.10s] | [V:15VhHR t=33.33s]; [V:1ccYWJ t=16.10s] |
| 20 | Default card shadow @1080p (960-1280 px card) | **y-offset ≈24 px, blur ≈48 px, black 6-8%, plus a 1 px hairline at ≈6%** | — | Part 02 CL-U20 ([E] values; refs qualitative) |
| 21 | Effect ("AI is acting") colour | Transitional only: **8-15 f, settles to final colours in 6-8 f** | 8-20 f | [V:15VhHR t=18.73-19.13s, 36.6-37.0s] |
| 22 | Simultaneous primary UI motions | **1** (plus ambient drift). A cascade counts as one gesture | — | [V:1ccYWJ §9]; [V:1CSXtQ §13] |
| 23 | Floating cards around a subject | **≤3**, each with one fact, 4 f stagger, anchored to what it describes | 2-3 | [V:15VhHR t=41.67-44.60s]; [V:19NRDv t=29.97-35.93s] |
| 24 | Unblurred UI or camera speed | **≤5% W/f**; 180° blur above that | — | [V:1ccYWJ] flaw; [N] 180° shutter; Part 04 |
| 25 | UI raster resolution | **Vector, or ≥ (max zoom × delivery) pixels** | — | [V:1CSXtQ] greeked-texture flaw; [S:playbook] ≥1.5× output (proposal) |

---

# Master §8. UI Animation Rules

## 8.0 Why UI motion decides credibility

A SaaS film makes one implicit promise: *this is what the product does*. UI motion is the evidence. When the evidence behaves like software (a cause, a state change, a result, at the speed real software responds), the viewer believes the claim without a voice-over. When it behaves like decoration (screens drifting in 3D, glowing, tilting and stacking with nobody using them), the viewer reads it as a stock template, and the claim loses weight.

The eight references agree on this with unusual consistency. kivi's teardown states its rule outright: "UI moves only when an action causes it… Each card has one job… No random floating screens" [V:1-6l8S §9]. Chowdeck's: "Every UI state is a real app state, never random floating screens" [V:126cpH §UI]. Lottieicon's: "every UI shot shows the product doing its job" and "the component is still while its content moves" [V:1ccYWJ §9]. HubSpot's: "Every motion is motivated by typing, sending, connecting or data flowing. Nothing floats without reason" [V:1CSXtQ §13]. Text sources point the same way: motion that "mirrors actual Slack workflows" [S:Slack], "tight UI demos [that] make you feel like you're clicking through the interface yourself" [S:Airtable], and the house rule "no fake UI, no generic neon technology visuals" [W:motion-so].

**The working definition used in this part.** Believable UI motion has five properties, and random floating screens lack all five:

| Property | Believable UI | Random floating screens |
|---|---|---|
| **Cause** | An actor (cursor, voice, keystroke, AI, system event) triggers every state change | Things move because the shot "needs motion" |
| **Order** | States follow the real product flow | States are shown in any order, or not at all |
| **Speed** | Microinteractions at real UI speed (1-6 f) inside a slow camera | Everything at one cinematic, slowed-down pace |
| **Focus** | One thing changes at a time; the rest is still or dimmed | Several screens drift, rotate and glow at once |
| **Payoff** | Every action ends on a readable result that is held | Motion with no readable outcome |

### The five-question test (run it on every UI shot)
1. **Who acted?** Name the actor and the frame of the action.
2. **What changed?** Name the state before and after.
3. **Would the real product do this, in this order, at roughly this speed?**
4. **Where was the eye one frame before the change, and where does it go next?**
5. **What is the one thing the viewer must read, and is it big enough and still long enough?**

A shot that cannot answer all five is decoration. Fix it or cut it [inferred, synthesised from the eight teardowns' stated rules].

---

## 8.1 Believability laws (UI-B)

**UI-B1. Causality: every state change has a visible or audible cause. [U, 7/8]**
- Rule: before any UI state changes, show the cause in the same shot or the shot before: a cursor press, a keystroke, a voice phrase, an AI "acting" state, or a system event (a notification, a failed provider).
- Evidence: kivi's cards change only while dictation audio plays or the AI writes [V:1-6l8S §9]. Chowdeck's click at 10.53 s precedes the morph at 11.03 s [V:126cpH]. Bumper's toggle is clicked at 12.03 s and the bar rises on the same frame [V:19NRDv t=12.03-12.27s]. HubSpot's toggle fills 2 f after the click [V:1CSXtQ t=10.200-10.267s]. Wix's send click triggers the page build [V:15VhHR t=12.20-12.83s]. NOSTRA's cursor taps "NO" and the logo appears 5 f later [V:1i2L14 t=32.0-32.17s]. Lottieicon's search glyph turns into a spinner only after the URL is typed [V:1ccYWJ t=40.40s].
- Why it works: viewers read cause → effect as "the product responded". Without a cause, the same animation reads as "someone animated this".
- Entrances are exempt. A card arriving on screen is presentation, not a state change. It still needs a reason to arrive (a cut, a hand-off, a cue), see UI-B6.

**UI-B2. Real product order: show states in the order the product produces them. [U, 6/8]**
- Rule: script the UI as a state machine first (state list, trigger per transition), then animate it. Never skip a state the viewer needs to understand the next one; never show a state the product cannot reach.
- Evidence: Chowdeck runs order → confirm → preparing → ready → rider on the way → delivered [V:126cpH t=9.27-13.60s]. HubSpot runs add source → toggle on → type query → send → answer [V:1CSXtQ t=8.87-21.47s]. kivi runs speak → raw transcript → correction → polished text → output artefact [V:1-6l8S §9]. Wix runs prompt → generate → result → edit [V:15VhHR]. Bumper's failover runs provider 1 fails → provider 2 fails → provider 3 succeeds [V:19NRDv t=40.8-45.0s]. Lottieicon's search runs magnifier → typing → spinner [V:1ccYWJ t=39.07-40.40s].
- Text: the strongest product overviews order features "the way a customer meets them" [S:playbook rule 8].
- Why it works: a correct sequence doubles as onboarding. A wrong order makes knowledgeable viewers (buyers who have seen the product) distrust everything else.

**UI-B3. The container is still while its content changes. [U, 4/8]**
- Rule: when content changes inside a component (status text, a typed query, an animating icon, generated output), hold the component's frame, position and size still, or let it drift at ≤0.2% W/f. Move the container only between content changes.
- Evidence: Chowdeck cycles three statuses inside one fixed notification pill [V:126cpH t=11.20-13.57s]. Wix locks the prompt bar at identical x/y/size across 6 shots (3.8 s) while three worlds swap behind it [V:15VhHR t=8.63-12.47s]. Lottieicon: "one animated element at a time inside a still component" [V:1ccYWJ §9]. kivi grows the card for new content rather than popping a new card in [V:1-6l8S t=13.77s].
- Why it works: the eye can only track one change. A moving container plus changing content splits attention, and the viewer misses the content.

**UI-B4. Two speeds: slow camera, real-speed UI. [U, 4/8]**
- Rule: microinteractions run at the speed of the real product (1-6 f). Camera moves, reveals and card entrances run at film speed (12-31 f). Never slow a toggle or dropdown to "cinematic" speed; give it anticipation (a cursor dwell) and a hold afterwards instead.
- Evidence: HubSpot: "real UI timings (100-200 ms) sit inside a slow camera, so the product feels responsive and the film feels unhurried" [V:1CSXtQ Study C]. Wix: "Brand frame: slow and precise… Product world: fast but physical (12 f scrolls, 6 f morphs, 1-2 f pops)" [V:15VhHR §Motion]. kivi's hover lift (≈3 f) and click bloom (≈6 f) follow a slow 0.85 s truck and a held, slowly pushing desktop [V:1-6l8S t=35.47-37.15s]. Bumper's toggle (≈4 f) sits inside a slow pull-back drift [V:19NRDv t=11.00-13.13s].
- **References win** over the generic conversion "video beats should sit in 400-600 ms" [N]. That conversion is right for cards and camera, wrong for microinteractions: no reference slows a toggle, label swap or dropdown to film speed.
- Why it works: speed is a product claim. A 3 f toggle says "instant". A 15 f toggle says "laggy", however beautiful it looks.

**UI-B5. One primary change at a time. [U, 5/8]**
- Rule: at any frame, one UI element is the primary motion. Everything else is still, drifting below 0.2% W/f, or dimmed. A staggered cascade counts as one gesture.
- Evidence: Lottieicon's toolbar and tab bar play their icons one after another, left to right, each loop 10-15 f [V:1ccYWJ t=12.17-14.73s, 18.83-21.00s]. Wix's theme-change shot runs popup → typing → cursor → click → shimmer strictly in sequence, about one event every 0.5 s [V:15VhHR t=16.63-19.20s, §Rhythm]. HubSpot's dropdown, cursor travel, click and toggle run strictly in sequence [V:1CSXtQ t=8.867-10.333s]. kivi dims the raw transcript to ≈50% while the polished line streams [V:1-6l8S t=13.77-17.03s]. Bumper's orbit brings one badge forward per step [V:19NRDv t=30.9-33.4s]. Newsela-style highlights steer attention to one region at a time [S:Newsela].
- Why it works: sequence is how a viewer reads a process. Simultaneity reads as noise.

**UI-B6. Anchor something across every change of context. [U, 5/8]**
- Rule: when the background, the screen or the scene changes, keep one UI element fixed in screen position (within ±5% W), or carry it through the change as a shared element.
- Evidence: Wix's prompt bar across 6 shots [V:15VhHR t=8.63-12.47s] and its ice-bottle asset across 4 layouts with the editor selection box visible [V:15VhHR t=30.83-32.83s]. Chowdeck's order card becomes the notification and "stays on screen through the scene change" [V:126cpH t=11.03-11.43s]. HubSpot's send bubble continues the prompt's upward motion across a cut [V:1CSXtQ t=17.80s]. kivi reframes the same plate across the prompt → result cut [V:1-6l8S t=22.87s, 67.70s]. NOSTRA keeps "VIDEO" fixed while the rest of the line is wiped and retyped [V:1i2L14 t=6.13-7.00s].
- Why it works: the anchor tells the viewer "same product, new context", so fast cutting (ASL below 0.8 s in Wix's montage) never disorients.

**UI-B7. Data and copy look real, and stay identical across cuts. [U, 5/8]**
- Rule: fill UI with plausible, consistent, approved content: real-looking names, dates, amounts with believable decimals, real feature labels. Lock every string once written; a word must not change between a wide shot and its cut-in.
- Evidence: Bumper's merchant IDs, July 2025 dates, GBP amounts (108.50, 92.40): "it never reads as lorem ipsum" [V:19NRDv §9]. Wix's generated sites are art-directed sub-brands (Baseline, Soleu, Bowy) that recur across demos [V:15VhHR §Creative]. kivi's named contacts and Kannada output [V:1-6l8S]. Failures: Wix's "make" becomes "create" across the 6.57 s cut-in [V:15VhHR t=6.57s]; Lottieicon shows the "Random Misc" card twice in a row [V:1ccYWJ t=17.9-18.1s]; HubSpot's window texture is greeked [V:1CSXtQ §13].
- Why it works: buyers read UI fluently. One placeholder row or one changed word breaks the "this is real" contract.
- Never invent metrics, prices, customers or offers. Numbers come only from the client [S:playbook rule 9].

**UI-B8. Build the UI around text the viewer has already read. [SaaS, X → strong]**
- Rule: when a UI element carries a message, let the viewer read the message first (as type), then build the component around it: border and shadow (1-3 f), brand icon pop (≈3 f), secondary controls (4-5 f), then pull back ×0.75.
- Evidence: HubSpot types the headline into an empty canvas, then the prompt bar materialises around it [V:1CSXtQ t=2.13-9.03s]. Wix animates the brand sentence's sparkle icon into the prompt bar [V:15VhHR t=3.97-4.23s]. kivi's "Just speak" pill unfolds into the transcript card [V:1-6l8S t=9.50-9.93s].
- Why it works: "the viewer has already read the content, so the UI arrives as context, not clutter" [V:1CSXtQ Study B].

**UI-B9. Show the feature, then name it. [S]**
- Rule: show a micro-proof of a feature in the UI before a title card names it.
- Evidence: kivi auto-corrects "Shitij" → "Kshitij" inside the voice card (peach selection box, 4-5 f) at 20.43 s; the "Custom Dictionary" card appears at 25.47 s [V:1-6l8S].
- Why it works: the label confirms something the viewer has just seen, so it lands as recognition rather than a claim.

**UI-B10. No bounce, no elastic, no wobble on UI. [U, 6/8]**
- Rule: UI settles critically damped (E-OUT or E-CRIT). Overshoot is allowed only on props in playful styles (E-SPRING-P), never on UI chrome, type or data.
- Evidence: kivi, Wix, Bumper, HubSpot, Lottieicon and NOSTRA show no UI overshoot; NOSTRA's CTA releases "with no overshoot" [V:1i2L14 t=33.9-34.0s]. Wix: "This film's credibility comes from damped, single-direction ease-outs" [V:15VhHR §Avoid]. The one exception, Chowdeck's tossed card (+15° → −4° → 0°), belongs to a playful collage style [V:126cpH t=9.27-10.00s].
- Why it works: real interfaces do not wobble (modern OS springs settle with 0-15% bounce, and premium UI defaults to 0) [N: Apple default bounce 0, M3 standard ζ 0.9]. Bounce reads as "toy".

**UI-B11. The product shows itself doing its job. [U, 6/8]**
- Rule: every UI shot must show an outcome of the product (a generated page, a matched column, a delivered order, a typed email), not just a screen existing.
- Evidence: kivi's email, translation, code and sheet outputs [V:1-6l8S]; Wix's built sites [V:15VhHR]; Bumper's 100% reconciliation [V:19NRDv t=24.93s]; HubSpot's answer table [V:1CSXtQ t=20.0-21.47s]; Chowdeck's route reaching the pin [V:126cpH t=13.23s]; Lottieicon's icons animating in toolbars [V:1ccYWJ]. Text: "the interface does the talking" [S:Figma]; value "shown as outcomes appearing on screen, not as a feature list" [S:Airtable].
- Why it works: an outcome is proof; a screen is only a claim.

**UI-B12. Floating UI is allowed only when it is anchored. [S, 3/8]**
- Rule: free-floating cards are legitimate when (1) each is attached to the subject it describes, (2) each carries one fact, (3) they enter in reading order with a 3-4 f stagger, (4) they drift at ≤0.2% W/f, and (5) there are at most 3.
- Evidence: Wix's commerce cards pop near the portrait at a 4 f stagger, each whole in 1 f, "always anchored near the thing they affect" [V:15VhHR t=41.67-41.93s, §UI]. Bumper's three hex badges sit on an orbit ring around one hero photo [V:19NRDv t=29.97-35.93s]. kivi's WhatsApp badge overlaps the voice card's corner to tie the card to an app [V:1-6l8S t=39.75s].
- Why it works: an anchor turns "floating" into "annotation". Without one, floating cards are the random-screens cliché.

---

## 8.2 Real vs mock UI (UI-R)

### 8.2.1 The four tiers

| Tier | What it is | When to use | Reference evidence | Risks |
|---|---|---|---|---|
| **T1 Real capture** | A screen recording of the live product | How-tos and onboarding; designer and developer audiences who read UI fluently | None of the 8. Text: Figma's launch recap is 71% screen capture [S:Figma]; Newsela highlights regions of a recording [S:Newsela]; Stripe demos live [S:Stripe] | Chrome clutter, tiny text, scroll judder, inconsistent data, no control of timing |
| **T2 Real UI rebuilt as layers** | The real screens, rebuilt pixel-faithfully as vector layers (or high-res screenshots split into layers) with real labels and real states | **Default for SaaS launch and feature films** | Wix (real modules, toolbars, dropdowns) [V:15VhHR]; HubSpot (real composer, dropdown, CRM page, answer) [V:1CSXtQ] | Rebuild fidelity; legal approval of third-party UI |
| **T3 Simplified real UI** | The real structure and states, with fewer rows, larger type, brand art direction and only the controls that matter | Launch films, ads, anything watched on phones | kivi (voice and result cards) [V:1-6l8S]; Bumper (flat product art as 3D planes) [V:19NRDv]; Chowdeck (order card) [V:126cpH]; Lottieicon (toolbar, tab bar, search) [V:1ccYWJ]; TradeLens "simplified UI dashboards" [S:TradeLens]; "animated UI recreations of real product screens" [W:raivcoo] | Drifting so far from the product that users don't recognise it |
| **T4 Abstracted UI grammar** | Gauges, icons, game objects, metaphors that behave like UI | Explaining an invisible mechanism; brand films; products with no UI | Solar (gauge states, highlight flare) [V:1Hcg3X]; NOSTRA (glass ✓ / ↓ tiles) [V:1i2L14]; Duolingo's mechanics as game objects [S:Duolingo] | Unlabelled metaphors become guesswork [V:1i2L14 §Flaws] |

Text sources disagree on tiers, and the references resolve it:
- [S:Figma] praises 71% raw capture; [W:motion-so] says "UI as designed moments, not screen recordings" and "no fake UI".
- **References win:** 0/8 use raw capture; 2/8 rebuild real UI (T2); 4/8 simplify it (T3). For premium launch films, rebuild. Keep raw capture (T1) for how-tos and designer audiences, cropped tight to the action area [S:Figma].
- "Fake UI" in [W:motion-so] means invented features or generic sci-fi panels, not a simplified rebuild of real states. T3 is not fake; a screen the product cannot produce is.

### 8.2.2 Rules

**UI-R1. Default to T2/T3; choose by audience and screen size. [U]**
- Designers and developers, 16:9, YouTube: T2 or T1 cropped tight.
- Buyers, social feeds, phones: T3.
- No UI, or an invisible mechanism: T4, with a 1-2 word label on every metaphor [V:1i2L14 §Avoid].

**UI-R2. Simplify by deletion, never by invention. [U]**
- Remove chrome, side panels, secondary rows and decorative states. Enlarge the one value that matters (Bumper scales "100%" to a 6% H cap while the table stays texture) [V:19NRDv t=23.90-24.93s].
- Keep the product's real labels, icons, colours and state names. "Name UI labels exactly as they appear in the product" [S:playbook Recipe 3].

**UI-R3. Third-party UI and marks must be real and licensed. [U]**
- Use recognisable, licensed app icons; never an unidentifiable stand-in. kivi's icon row includes "an unidentifiable black cube" and the teardown's fix is "use recognisable, licensed marks" [V:1-6l8S §16].
- Generic vector device frames only, no trademarked device silhouettes [S:playbook device frames (proposal)].

**UI-R4. Greeked or low-resolution UI is allowed only where it is out of focus. [A otherwise]**
- HubSpot shows a "low-resolution and partly greeked" CRM page in its hero 3D beat, exactly where viewers scrutinise [V:1CSXtQ §13]. Kivi's and Bumper's micro-text is real but illegible, which is acceptable only because it is texture.
- Rule: any UI plane in focus and larger than 30% W must be real, sharp content.

**UI-R5. In AI-generated video, never let the model draw readable UI. [U for AI pipelines]**
- Generative video models "cannot set exact typography" [N], and Veo "adds gibberish subtitles when the prompt implies dialogue" [P].
- Rule: generate only the plate, the environment, the light and blank geometry (a clean, text-free panel or device). Build the UI deterministically (Remotion, After Effects, Figma export) and composite it as a locked layer. This matches how UI-motion studios describe their pipeline: design in Figma, animate in Figma Motion, Jitter or After Effects, with Rive for "interactive UI states" [W:showreel-design]. Negative prompt nouns: "text, subtitles, captions, letters, watermark, logo" [P], plus "user interface, screen" for UI plates [inferred].
- This is the only reliable defence against warped UI, changing text and identity drift (see §8.14).

---
## 8.3 Element cards (UI-E)

Each card gives: default spec, motion with numbers, evidence, why it works, the mistakes seen, and (for the most-used elements) a prompt or compositing line. Sizes are at 16:9 1080p unless a 9:16 value is given. Speeds not repeated here are in Part 03 SP-UI / SP-C / SP-D.

### 8.3.0 Quick matrix: when, why, how fast, premium vs amateur

One line per element, so a shot can be checked without reading every card. Numbers come from the cards below and carry their evidence there; "n/obs" means no reference shows it and the line is [inferred] or a [S:playbook] proposal.

| Element | Use it when | Why | How fast | Premium | Amateur |
|---|---|---|---|---|---|
| E01 Browser / device frame | Mobile app in 9:16, or device-as-product; otherwise frameless | Chrome says nothing about the product | Frame entrance n/obs (rotateY 15° → 0° in ≈18 f, proposal) | Frameless rounded card; window over its own world photo | Every shot in a laptop or browser mock-up; a player wrapper around the ad |
| E02 Card / panel | Any UI content block | One object, one job | Enter 12 f E-OUT (6-12 f seen); exit 3-8 f | One radius and shadow family; grows for new content | New card per state; cards entering together with no stagger |
| E03 Prompt bar | AI and search products | It is the product's front door | Build 1-3 f / 3 f / 4-5 f; send 1 f fill | Text read first, bar built around it; anchored across cuts | Bar first, empty, then text pasted in one frame |
| E04 Chat / streaming | Voice, chat, AI output | Makes "real time" visible | Human 4-7 words/s; AI ≈2 f per word | Speed contrast between human and AI | One speed for everything; long answers meant to be read |
| E05 Button | Any click that matters | Proves the product responded | Press 1 f colour or −15-20% in 3 f; release 6 f | Feedback on the button, no bounce | Ripple on the cursor, button unchanged |
| E06 Toggle / chip | Binary choices, before/after | Most legible way to show a difference | Toggle 3-4 f; label swap 1 f | Ghost "before" value stays visible | 15 f "smooth" toggle; 1.5% H chips that must be read |
| E07 Menu / dropdown | A choice the story depends on | Shows the option exists | Open 6 f, rows 2 f apart; close ≤2 f; hold ≥1.0 s | Hover fill on the chosen row | Long lists; menu closes before it can be read |
| E08 Tooltip / callout | Naming the why behind a value | Spends attention on one thing | Punch-in cut, words ≈4 f apart; pop 1-2 f | One callout, anchored to its value | Several callouts at once; rings everywhere (n/obs) |
| E09 Notification / status | Something happened elsewhere; time passing | One familiar object compresses events | Morph ≈7 f; swap 5-7 f; hold ≥1.0 s | One container cycles states | New toast per state; 2 f statuses; pill in the caption zone |
| E10 Search | CTA as an action; prompt products | Demonstrates the viewer's next step | Circle 6 f E-SNAP → pill ≈7 f; URL ≈23 chars/s | Spinner swap when typing ends | Static URL card; ending in silence with no logo |
| E11 Form / modal | A focused input moment | Real modals feel instant | Modal 1 f pop; form unfold 6 f | Flatten before reading; fill in reading order | Whole long form; animated labels |
| E12 Navigation / toolbar | Context for where the user is | Fixed chrome = location | Slide in once (≈6 f), then still; items 10-15 f each, in turn | Only the used item moves | Staggered build of every nav item |
| E13 Dashboard / KPI | One proof number | Detail first earns attention | Counter 24-31 f E-SNAP-L; pull-back snap 2-3 f | Value first, then the whole dashboard; parked pointer | Full dashboard at 1% H labels; all widgets animating |
| E14 Chart | A trend or comparison claim | Direction reads in a second | Line ≈26 f per series; bar ≈7 f; states snap 0 f | One hero series; marks ≥3:1 | Chart moving under a headline that must be read |
| E15 Table | Structured output, matching | Column order = "AI writing data" | Fill wave ≈13 f; rows every 4-6 f | Extract the column that matters | Uniform cell timing (reads as a wipe) |
| E16 Icons | Integrations, asset libraries | Recognition is instant | Stagger 2-3 f; hover ≈3 f | Licensed marks; one plays at a time | Zero stagger; unknown icons |
| E17 AI states | Any AI action | Learned colour explains itself | 8-15 f, settle 6-8 f | One AI colour family, transitional | Fake progress bar; AI colour left on resting UI |
| E18 Selection box | Design tools, "a user is in control" | Agency signal | Pops 1-2 f; may persist across cuts | Tracks its object rigidly | Jittering box; boxes on unselected objects |
| E19 Map / route | Delivery, logistics, tracking | Steady progress = live | Route ≈1.7 s leg by leg; map upright over ≈1 s | Route reaches the pin just before the cut | Route still drawing at the cut |
| E20 Voice UI | Voice products | Audio has no visible output | Bars every frame; orb levels smoothed 0.2/f | Driven by the real audio | Looping fake waveform |
| E21 Integrations | Connector stories | "Works with your tools" | Chips 4-6 f apart; implode ≈8 f | Real licensed logos, ≤8 on screen | Unlicensed or unknown logos; logo soup |
| E22 Loading / empty | Before a result | The hold reads as "thinking" | Empty hold 8-9 f; loading ≤1 s | One-step spinner swap | Long loaders; fake progress |

### UI-E01 Browser and device frames [U: frameless default · S: device frames]

- **Default: no chrome.** Show the UI as a rounded, frameless card (UI-E02), full-bleed, or as a window floating over a matching world photo. 0/8 references draw browser chrome; Wix: "no browser chrome or device mockups… This keeps focus on the design, not the device" [V:15VhHR §UI]. kivi, Bumper, HubSpot, Chowdeck and NOSTRA show frameless cards too.
- **When a frame is right** [S]:
  - The product is a mobile app and the shot is 9:16 or the device is part of the story (PointCard's phone mock-up with a semi-transparent highlight square [S:PointCard]; a probable phone walkthrough in the Airbnb concept [S:Airbnb, inferred]).
  - A "product in context" beat: Lottieicon's app panel with a #CACACA grey bezel at 55% W [V:1ccYWJ t=18.83-21.00s].
  - The device is the product (hardware launch).
- **Frame spec when used** [S:playbook device frames (proposal); inferred numbers]:
  - Generic vector frame, never a trademarked silhouette. Browser bar: three dots plus a URL pill filled with the brand's real URL.
  - Bezel ≤2% of the device width; screen-to-bezel corner radii concentric (outer radius = inner radius + bezel width) [inferred].
  - Entrance: rotateY 15° → 0° over ≈18 f E-OUT, with at most one specular sweep of ≈24 f [S:playbook (proposal), inferred from PointCard].
- **UI in the world.** A page shrinks to a ≈85% rounded window floating over its own photograph, extended full-bleed, with a soft drop shadow and foreground grass in focus [V:15VhHR t=19.73s]. Match the horizon and light of the window photo and the world photo (Wix shows a slight mismatch) [V:15VhHR §Flaws].
- **Why frameless works.** Chrome is 10-15% of the frame spent on pixels that say nothing about the product [inferred], and at 1080p its micro-type is always illegible. A frame also locks the UI to one aspect ratio, which makes 16:9 → 9:16 cutdowns harder.
- **Mistakes.** Wrapping the deliverable in a fake player: NOSTRA's player and chapter bar take 21% of the canvas height and cap the content at 1011×567 [V:1i2L14 §Flaws]. A component cropped by the frame edge by accident: Lottieicon's toolbar pill "looks accidental"; the fix is to frame it fully or crop decisively (≥30% off-frame) [V:1ccYWJ §Avoid].
- **Prompt line.** "Product UI shown frameless as a white rounded card (radius 28 px, soft shadow), no browser bar, no device bezel, card centred at 70% frame width."

### UI-E02 Cards and panels [U]

- **Spec.**
  - Width 65-80% W for a hero card (1248-1536 px); 55-85% seen. 9:16: ≈75% W (810 px), text rows inside x 120-840 (Part 02 T4; [N] safe zone).
  - Corner radius 24-32 px; up to 2-3% W on large glass cards [V:1-6l8S §9]; [E] 32 px "in video".
  - Surface: white #FFFFFF / #F4F5F4 on light; #1C1917 on #0C0A09, or glass, on dark ([E]; Part 02).
  - Shadow per UI-D2. Depth plate per UI-D1.
  - Radius is a brand token, not a default: one radius family per film, applied to cards, buttons and chips alike. Text sources describe premium UI films treating "custom typography, color choices, and even corner radiuses as intentional parts of the story" [W:showreel-design].
- **Motion.**

| Event | Spec | Ease | Evidence |
|---|---|---|---|
| Enter | 12 f, rise 5-8% H (54-86 px), opacity 0 → 1 over 6-8 f; or cut into an ease-out already in progress (25 f, half the travel in 4 f) | E-OUT | [V:1ccYWJ t=18.83s] (6 f, 7.5% H); [V:1CSXtQ t=13.03s] (6 f, 54 px @720 = 7.5% H); [V:1ccYWJ t=12.17s] (cut into motion, 10.7% W) |
| Materialise (glass) | Frosted ghost → opaque in 6-8 f, or opaque white → frosted in ≈8 f | E-OUT | [V:1-6l8S t=67.73-67.93s, 39.75-40.2s] |
| Unfold from a line or pill | Height 3 → 40 units (zoom-sheet tile px, i.e. ≈13× growth) over 7-8 f, S-curve; content fades in 2 f after it lands | E-INOUT | [V:1-6l8S t=9.63-9.93s] |
| Grow for new content (relayout) | 6 f; earlier content dims to ≈50% | E-OUT | [V:1-6l8S t=13.77-13.93s] |
| Tossed entrance (playful only) | +15° → +1.6° in 3 f → −4° → 0° by 16-22 f; offset backing card 6% → 3% | E-SPRING-P | [V:126cpH t=9.27-10.00s] |
| Edge-on flip (3D card) | Y 90° → 0° in 8 f, growing to ≈45% W | E-OUT | [V:1ccYWJ t=16.10-16.37s] |
| Flatten before reading | Tilt ≈15° → 0° in 7 f | E-OUT | [V:15VhHR t=33.33s] |
| Exit anticipation | Drift up ≈5 px over 5 f before the cut | E-LINEAR | [V:1-6l8S t=59.6s, 67.50-67.67s] |
| Exit | 3-8 f E-EXIT (shrink −24 to −50% and dim, whip up, or rise-and-fade); or carried off by a morph | E-EXIT / E-WHIP | [V:19NRDv t=6.9-7.17s] (−50% + dim, 8 f); [V:1ccYWJ t=25.33-25.47s] (whip up 3-4 f) |

- **Why it works.** The 12 f ease-out entrance is long enough to register as an arrival and short enough to keep the UI feeling responsive. Growing a card for new content (instead of popping a second card) keeps one object in the viewer's attention (UI-B3).
- **Mistakes.** More than one card entering at once without stagger; cards floating with no anchor (UI-B12); a new card style per section (Part 02 §3: "one material, one meaning").

### UI-E03 Prompt bar / composer / input field [U, SaaS]

- **Spec.**
  - Pill or rounded bar, 57-77% W (Wix chat pill 57% [V:15VhHR t=4.23s]; HubSpot bar 77% after its pull-back [V:1CSXtQ t=9.03s]).
  - Input text: wide shot cap ≈3.3% H (≈36 px cap, ≈51 px font) [V:1CSXtQ]; macro close-up cap 4.2-7.5% H (45-81 px) [V:1CSXtQ t=13.03s] [V:15VhHR t=6.57s].
  - Real controls only: attach (+), tools, source chips, mic, send [V:1CSXtQ §9].
- **Build sequence (text → UI)** [V:1CSXtQ t=7.80-9.03s]:
  1. Typed text already on screen and read.
  2. Bar border and shadow appear: 1-3 f.
  3. Brand or source icon pops: ≈3 f.
  4. Secondary toolbar slides up from below: 4-5 f.
  5. Pull back ×1.00 → ×0.75 over 21-31 f, E-INOUT, peak speed at 50-55%.
- **Alternative build (icon → UI)** [V:15VhHR t=3.97-4.23s]: the click target (a sparkle) stretches into the pill over 6 f while every other element fades out over the same 6 f; cut on the next beat to the prompt world.
- **Typing, caret, autocomplete:** see §8.5.
- **Send.** The content accelerates upward (3, 3, 5, 7 px/f @720, E-EXIT), the cut lands, and the sent bubble continues up at 34, 34, 31, 7, 4 px/f (E-OUT): a velocity hand-off across the cut [V:1CSXtQ t=17.60-17.90s]. Or the send button fills with the accent colour in 1 f, widens over 2 f and the film cuts [V:15VhHR t=8.53-8.63s].
- **Locked-anchor variant.** Keep the bar at identical x/y/size while backgrounds swap behind it (UI-P4) [V:15VhHR t=8.63-12.47s].
- **Why it works.** The prompt is the product's front door. Typing it on screen makes the viewer read the user's intent at reading pace, and the send gesture motivates the next cut.
- **Mistakes.** The string changing between shots [V:15VhHR t=6.57s]; typing faster than it can be read (§8.5).
- **Prompt line (compositing).** "Rounded prompt bar, 72% frame width, centred; the query types left to right at 18 characters per second with a blinking caret; the bar's shadow and border appear 2 frames after the last character; at 1.2 s the send icon fills orange in 1 frame."

### UI-E04 Chat messages and streaming text [U, SaaS]

- **Human-pace stream.** One word every 4-7 f (4-7 words/s), each word entering at 30-40% opacity and reaching 100% in 3-4 f ("ghost words"), synchronised with the voice [V:1-6l8S t=18.70-20.45s].
- **Machine-pace stream.** ≈2 f per word (≈15 words/s) for AI output, so the speed difference itself signals "AI" [V:1-6l8S t=14.3-14.6s]. Code tokens: one every 3-4 f, identifiers in outlined chips [V:1-6l8S t=59.73-62.9s].
- **Raw vs polished hierarchy.** The raw transcript dims to ≈50% when the polished line arrives; the polished line is darker and gets a ≈0.8 s left-to-right shimmer [V:1-6l8S t=13.77-15.8s].
- **Typing indicator.** Three dots, 2 f stagger, each entering at ≈2× and settling to final size in 3-4 f, then a bounce wave [V:1i2L14 t=3.567-3.83s].
- **Answer appearance.** The answer paragraph fades in over ≈2 f; a generated table appends a row every 4-6 f with cells typing left to right [V:1CSXtQ t=20.00-21.47s].
- **Why it works.** Streaming makes "real time" visible. Matching the stream speed to the voice proves the dictation; a much faster AI stream proves the AI.
- **Mistakes.** Streaming a long answer the viewer is expected to read (HubSpot's ≈60-word answer is scrolled past in ≈1.5 s and works only as texture [V:1CSXtQ §8]); a typing indicator that runs longer than ≈1 s with nothing else happening [inferred].

### UI-E05 Buttons [U]

| State | Spec | Evidence |
|---|---|---|
| Rest | Pill or rounded rect; CTA pill ≈37% W × 11% H with label cap ≈5.3% H (57 px) | [V:1i2L14 t=32.73s] |
| Hover | Brighten or lift; cursor arrow → pointer hand | [V:1CSXtQ t=9.2-10.1s]; [V:1-6l8S t=36.45s] |
| Press | Either a 1 f pressed colour (accent fill, track darkens) or a scale of −15 to −20% in 3 f E-OUT | [V:15VhHR t=8.53s, 12.20s]; [V:1CSXtQ t=10.233s]; [V:1i2L14 t=33.8-33.9s] |
| Release | Back to 100% in 6 f E-OUT, **no overshoot** | [V:1i2L14 t=33.9-34.0s] |
| Pressed colour hold | Accent for ≈6 f, then back to rest colour | [V:15VhHR t=12.20-12.40s] |
| Playful press | Pixel-break of the button for 5 f plus a ≈2° card jolt | [V:126cpH t=10.53-10.70s] |

- **CTA button entrance.** Enters blurred from below, rises ≈12.7% H in 3 f, pushes the logo up ≈8.5% H in 4 f; both settle back ≈4.4% H over ≈10 f; the label rises in through the pill's mask in 3 f [V:1i2L14 t=32.73-33.27s] (72 / 48 / 25 px of a 567 px frame, computed).
- **Why it works.** A 3 f press and 6 f release is a believable button physic [V:1i2L14 Study L]. The press must be visible on the button itself; a ripple on the cursor alone does not prove the button responded.
- **References win** over [E] (cursor scales to 0.85 for 4 f plus a 64 px ripple over 12 f) and [S:playbook] (press 0.92 → 1.0 plus a 0.3 s ripple, proposal): no reference shows a cursor ripple. Put the feedback on the target. A ripple stays optional [X].
- **Prompt line.** "Cursor rests on the 'Book now' pill for 0.3 s; the pill shrinks to 82% in 3 frames, returns to 100% in 6 frames with no bounce; the next scene starts 4 frames later."

### UI-E06 Toggles, chips and switches [U]

- **Toggle.** The track fills with the accent in one frame and the knob jumps to the end; a ≈3 px settle follows; 3 f total including the pressed frame [V:1CSXtQ t=10.233-10.333s]. Bumper's knob slides in ≈4 f and the chart reacts within 6-8 f [V:19NRDv t=12.03-12.27s].
- **Chip / label swap.** 1 f hard swap ("Add sources" → "Sources" with the brand icon), one frame before the toggle reacts [V:1CSXtQ t=10.200s].
- **Chip row entrance.** Left to right, 2-3 f stagger, each rising ≈10 px with a fade over ≈6 f [V:1ccYWJ t=23.7-24.1s]; chips under a prompt 2-3 f apart [V:15VhHR t=4.47-5.13s].
- **Comparison toggle (before / after).** Label it in plain words ("Without Pro / With Pro"); keep the "before" value visible as a ghost while the "after" value animates [V:19NRDv t=11.00-13.13s].
- **Why it works.** A binary control is the most legible way to show a difference; the ghost "before" makes the comparison instant [V:19NRDv WHY #8-9].
- **Mistakes.** Chips at 1.5% H (16 px) that are supposed to name the variations [V:1ccYWJ t=23.7s]: either make them ≥2.5% H or treat them as texture.

### UI-E07 Menus and dropdowns [SaaS · 2/8 measured]

- **Open.** 6 f E-OUT; rows appear 2 f apart (67 ms) top to bottom [V:1CSXtQ t=8.867-9.067s].
- **Hover.** Light-grey row fill under the pointer; arrow → hand [V:1CSXtQ t=9.2-10.1s].
- **Hold open long enough to read the options.** Wix's tone dropdown is open ≈0.9 s before the selection [V:15VhHR t=36.5s]. Default: max(1.0 s, 0.33 s × visible option words + 0.4 s) [N read-time formula].
- **Select → close.** Selection takes 1 f; the menu closes in ≤2 f (popups "disappear in 2 f") [V:15VhHR §UI].
- **Cursor already on the trigger.** When the menu is the first beat, the cursor can appear already resting on its trigger, with the pressed state on the same frame [V:1CSXtQ t=8.867s].
- **Why it works.** Real menus open in 100-250 ms [N Carbon moderate-02 240 ms]; the 2 f row stagger reads as a list being populated, not as a block.
- **Mistakes.** A menu with more than 4-5 rows on screen at 16:9 (rows become texture) [inferred; HubSpot shows 3]; options that never get a hover state; a menu that eases open over 15-20 f "for elegance" (reads as lag, UI-B4).

### UI-E08 Tooltips, callouts and labels [S]

- **Speech-bubble tooltip** [V:19NRDv t=13.13-14.33s]: a punch-in cut (≈2.5×) to an outlined bubble with a sparkle icon; its two-part text types in word by word at ≈4 f per word, the second phrase in the accent colour; the chart sits defocused behind it (parallax between bubble and chart plane); it exits with a 3D swing-out to the left with blur (≈8 f).
- **Contextual toolbar** [V:15VhHR t=23.47s]: pops in 1-2 f next to the selected element with real labels ("Change Image / Edit Image").
- **Label chip** above a title, inside a bracket frame (kivi "Hi Kshitij,"): ≈2% H [V:1-6l8S t=25.47s].
- **World-space labels** [V:1Hcg3X]: labels flank the hero in negative space (word centres at x ≈15% and ≈81% W, on the hero's mid-line), blur-fade in over 2-5 f, and move with the scene rather than sitting on a static overlay.
- **Callout ring and label chip** [S:playbook `screen` (proposal)]: ring stroke draws in ≈0.35 s with an accent glow, the label chip slides in from the open side in ≈0.25 s, label ≤3 words. Not observed in any reference [X].
- **Why it works.** A callout spends attention on the one thing the voice or caption is naming; world-space labels feel like part of the product, not subtitles.
- **Mistakes.** A tooltip appearing while the cursor is still moving [inferred]; callout text below 3% H (UI-L1); more than one callout at a time [inferred, from UI-B5].

### UI-E09 Notifications, toasts and status [S, SaaS]

- **In-app status pill (shared element)** [V:126cpH t=11.03-13.60s]:
  - The order card drops its offset backing, collapses vertically with its bottom edge anchored (height 211 → 183 → 137 → 78 px) and narrows by 18% into the pill in ≈7 f.
  - The background racks focus to the next context (a map) over 11-12 f.
  - The pill sits in the lower third (≈70% H); text ≈2.7% H (≈52 px @1920p), regular, sentence case.
  - **Status swap:** fade-out 2 f → blank 1-3 f → fade-in 2 f (5-7 f total), never a crossfade.
  - **Hold each status ≥1.0 s.** Chowdeck holds 0.33 / 0.5 / 1.1 s and then 2 f for "Order delivered", which its teardown calls too short [V:126cpH rule 9].
- **System push notification.** No reference measures one. Lottieicon opens with a notification bell icon as a zero-copy hook [V:1ccYWJ t=0.00-1.20s]; Duolingo shows push notifications as game objects [S:Duolingo]. Spec from [S:playbook `notify` (proposal)]: drop from the top y −40 → 0 px in ≈10-11 f; earlier toasts move down 12 px, scale to 0.96 and fade to 85%; a ping sound per toast.
  - **References win** on the playbook's "spring with ≤4% overshoot": use E-OUT with 0% overshoot in premium styles (UI-B10); ≤3% only in playful styles [N text spring 2.8%].
- **9:16 placement.** Keep any notification or status pill inside the strict text band y 270-1210 px @1920p [N]. Chowdeck's pill at ≈70% H (≈1344 px, computed) sits inside the platform caption overlay zone [N TikTok/Reels bottom insets]; move it to ≤63% H.
- **Why it works.** A notification compresses "something happened elsewhere" into one familiar object. Cycling statuses inside one container shows time passing without new shots [V:126cpH WHY #8].

### UI-E10 Search [S, SaaS]

- **Search as a CTA action** [V:1ccYWJ t=39.07-40.53s]:
  - Hard cut to a white circle (32.5% H) holding a magnifier; it shrinks to 16.6% H in 6 f (E-SNAP: deltas 22, 9, 7, 5, 4, 4).
  - It morphs into a pill in ≈7 f (E-OUT); the pill's width then follows the typed URL.
  - URL types at ≈23 chars/s; the magnifier becomes a loading spinner when typing ends.
  - Brand "result" bubbles enter large and defocused from the bottom corners (39.2-39.7 s), then shrink and sharpen as they drift into a loose ring (rack focus; total duration not measured).
- **Search as the prompt.** Treat an AI prompt bar as search (UI-E03) [V:15VhHR] [V:1CSXtQ].
- **Search results.** Not observed. Use the result cascade (UI-P1): empty hold 8-9 f, then rows every 3-4 f [inferred from [V:1-6l8S]].
- **Why it works.** The CTA becomes a demonstration of the action the viewer should take, not a static URL card [V:1ccYWJ Study K].
- **Mistakes.** Ending on the search with no logo lockup and with the music already gone (Lottieicon's bed ends 3.7 s before the picture) [V:1ccYWJ §12].

### UI-E11 Forms and modals [S, 2/8]

- **Modal.** Pops in 1 f [V:15VhHR t=24.23s]; prompt inside types at ≈25 chars/s; the "Create" click is followed by a ≈2 f gaussian blur of the whole frame and a hard cut to the result [V:15VhHR t=25.6-25.77s].
- **Form sheet.** Unfolds into 3D from edge-on in 6 f (Y-rotation) [V:1i2L14 t=24.53-24.73s]. Field bars with accent marks; then a split screen slides in from the right (centroid deltas 76, 61, 30, 13 px/f, E-SNAP) [V:1i2L14 t=25.07-25.23s].
- **Form fill.** Not measured. Fill fields in reading order with the cascade ladder: a field every 3-4 f, each value typing at 15-20 chars/s if it must be read, or appearing whole in 1 f if it is texture [inferred from SP-UI cascade and SP-C typing].
- **Why it works.** A modal is a focused moment; a 1 f pop matches how real modals feel and keeps the shot's energy on the content, not the container.
- **Mistakes.** Showing an entire long form; animating every field label; using a 3D unfold for a form the viewer must read (flatten it first, UI-D6).

### UI-E12 Navigation: tab bars, sidebars, toolbars, editor chrome [U]

- **Navigation is context, not content.** Hold navigation still; animate only the item the story uses.
- **Tab bar / toolbar** [V:1ccYWJ t=12.17-14.73s, 18.83-21.00s]: the component slides in once (panel up 7.5% H in ≈6 f E-OUT; or a toolbar cut into an ease-out of 25 f, 10.7% W); then the component is still and its items animate **one after another, left to right**, each micro-animation 10-15 f, looping.
- **Editor chrome** [V:15VhHR t=21.63-23.97s, 38.20s]: tool rail and canvas stay static; only the selection outline and contextual toolbar respond. An "editor zoom-out cut" (page column at ≈44% W inside the editor) gives context [V:15VhHR t=38.20s].
- **Dashboard sidebar** [V:19NRDv t=28.8s]: appears only in the pull-back to the full dashboard; never animated on its own.
- **Why it works.** Fixed chrome tells the viewer where they are; one moving item tells them what is happening.
- **Mistakes.** Animating every nav item into place in a staggered "build" that the viewer then ignores [inferred]; cropping chrome halfway (UI-E01).

### UI-E13 Dashboards and KPI tiles [S, SaaS] (weak evidence: 1/8 references, Bumper; same tier as P03 ML-20)

- **Detail first, then the whole dashboard** [V:19NRDv t=27.57-29.97s]:
  1. Hard cut into a tilted macro view of one chart card, shallow DOF at the edges.
  2. Series draw left to right (≈26 f, near-linear), 4-8 f apart.
  3. The cursor flies in (≈7 f).
  4. A 2-3 f pull-back snap with blur reveals the whole dashboard (navy sidebar, bar charts).
  5. ≈1 s slow yaw recede, then cut.
- **KPI value** [V:19NRDv t=22.70-25.60s]: one big number (cap ≈6% H, 65 px) on a card above the table; counter 84 → 100% over 31 f E-SNAP-L (84 → 95 in 0.27 s, 95 → 100 in 0.77 s); the cursor rises in (12 f E-OUT) and **parks beside the final value**; a row highlight sweeps the table below.
- **KPI tiles** [S:playbook `stats` (proposal)]: 2-4 tiles rise at a ≈8 f stagger, numbers count in ≈24 f, the highlighted tile pulses its accent once. Not observed in a reference [X].
- **Why it works.** Detail before context makes the viewer care about one number before showing everything; a counter that decelerates into 100% "feels earned and final" [V:19NRDv WHY #16].
- **Mistakes.** Showing the full dashboard first with ≈1% H labels and asking the viewer to find the point; animating every widget at once.

### UI-E14 Charts and data visualisation [S, SaaS] (weak evidence: chart animation in 2/8 references per P03 ML-22, plus counters and a gauge in Lottieicon and Solar; same tier as ML-22)

| Chart behaviour | Spec | Evidence |
|---|---|---|
| Bar responding to a control | Rises in ≈7 f E-OUT starting on the toggle frame; the "before" bar stays as a ghost | [V:19NRDv t=12.03-12.27s] |
| Line draw | ≈26 f per series, near-linear, series 4-8 f apart | [V:19NRDv t=27.63-28.50s] |
| Counter to a final value | 24-31 f E-SNAP-L, ≈70% of the range in the first 25% of the time; hold ≥0.6 s with a pointer on it | [V:19NRDv t=23.90-24.93s] |
| Tally counter (volume) | Linear with a hard stop: ≈1 s for 2 digits, ≈1.9 s for 4 digits; the source objects dim to 15% behind it | [V:1ccYWJ t=9.83-11.80s, 14.73-15.70s] |
| Gauge | Continuous fill ≈6 f E-OUT; discrete states (empty / full / alert) snap in 0 f, ideally on a beat; alert icon rides the level line | [V:1Hcg3X t=20.53-22.97s] |
| State colour narrative | Red (fail) → red → teal (success), 1.7-2.5 s between states; nodes that fail shrink and recede | [V:19NRDv t=39.87-46.13s] |
| Bars on dark backgrounds | Data marks ≥3:1 against the ground | [V:19NRDv t=11-14s] flaw; [N] WCAG 1.4.11 |

- **Rules.**
  - One series or one value is the hero; axes and gridlines are texture (they can sit at 1-1.5% H).
  - Draw continuous data with E-LINEAR or E-OUT; snap discrete states.
  - Never let a chart animate while a headline over it must be read.
- **Why it works.** Data motion carries the claim ("saves fees", "100% reconciled"). One value plus a clear direction reads in a second; a fully animated chart does not.

### UI-E15 Tables and spreadsheets [U, SaaS]

- **Fill by column (structured AI output)** [V:1-6l8S t=67.73-68.50s]: the header bar resolves first; column headers appear left to right 2-3 f apart; data fills column by column with a 2-3 f lag, a diagonal wave across a 5×5 grid in ≈13 f (≈430 ms). "Fast because the point is effortlessness, not reading the cells."
- **Append by row (generated answer)** [V:1CSXtQ t=20.40-21.47s]: a row every 4-6 f (130-200 ms), cells typing left to right, while the camera scrolls down with acceleration into the transition.
- **Extract the column that matters** [V:19NRDv t=16.77-20.50s]: tables fly in tilted (12 f E-OUT) → the relevant columns extrude forward (≈0.6 s) → the camera pushes through (9 f) while the tables blur and fall back → labels drop on (5 f) → a mint fill wipes left to right across both columns with a feathered edge (4 f) = "matched".
- **Status per row**: green dot "Reconciled", orange dot "Conflicts" [V:19NRDv t=22.70-23.85s].
- **Why it works.** Column order reads as "the AI is writing structured data"; extraction isolates "exactly the data that matters" and tells the story by camera [V:19NRDv WHY #12-13].
- **Mistakes.** Filling every cell with the same timing (reads as a wipe, not as data); a table at full width with 1% H text and no extraction or cut-in.

### UI-E16 Icons, app icons and icon grids [U]

- **App-icon row** [V:1-6l8S t=34.15-35.47s]: real app icons on glass squircles (≈8% W each). Stagger them 2-3 f; kivi's zero-stagger row is flagged as "the least crafted moment" [V:1-6l8S §13].
- **Hover on an icon**: lift ≈5 px and brighten in ≈3 f E-OUT [V:1-6l8S t=36.45s].
- **Icons that perform** [V:1ccYWJ]: each icon plays its own micro-animation (10-15 f loop) only when it is the focus; neighbours loop quietly or hold.
- **Highlight tile**: the selected icon sits on an accent rounded tile with an outer glow ≈20% of the tile size; unselected icons are bare strokes [V:1ccYWJ t=27.13-33.20s] (UI-H table).
- **Icon grid reveal**: lens-distortion zoom-out (≈2× → 1× over ≈20 f) in Fast Startup styles only (Part 04 CM-19); a hop-and-hold tour for "find the one" (UI-P7).
- **Line icon consistency**: one stroke weight and one colour per scene [V:1Hcg3X §9].
- **Mistakes.** Unknown or unlicensed icons; zero stagger; every icon animating at once.

### UI-E17 AI-generation states ("AI is acting") [S, SaaS]

| State | Visual | Duration | Evidence |
|---|---|---|---|
| Thinking / input | Iridescent pastel gradient field behind the UI | Present from the cut (4.23 s); fades to near-white over 15 f once the UI is up | [V:15VhHR t=4.93-5.4s] |
| Generating copy | Text written in a cyan → indigo gradient, then settles to the final colour | 12 f write + 6 f settle | [V:15VhHR t=36.6-37.0s] |
| Autocomplete | The completed words turn cyan → blue | 4 f | [V:15VhHR t=7.87s] |
| Generating imagery (montage pace) | False-colour "thermal" duotone, then a 1 f switch to the real image and a 6-12 f clean-up | Duotone 7-11 f | [V:15VhHR t=8.63-12.47s] |
| Generating imagery (hero image) | Duotone develops into the real image | ≈80% in 15 f, settled by 20 f | [V:15VhHR t=25.77-26.43s] |
| Generating images in a layout | Pixel mosaic de-pixelates | ≈8 f | [V:15VhHR t=40.33-40.6s] |
| AI tool invoked | Violet halo blooms behind the selected element | 3 f | [V:15VhHR t=23.83-23.93s] |
| AI rewrite of a whole block | Gradient sweep across the headline | 12 f | [V:15VhHR t=18.73-19.13s] |
| AI-enhanced text | Light-sweep shimmer left to right | ≈0.8 s | [V:1-6l8S t=15.0-15.8s] |
| "Generating…" status line | Shimmer sweep, muted base to foreground colour, 2 s linear + 0.5 s pause, 2 px spread per character | Loop | [E] (open-source ShimmeringText, sourced) |
| Data moving between systems | The source window disintegrates into 200-300 discs in its own UI colours, sweeping left to right in ≈0.95 s | ≈28 f | [V:1CSXtQ t=19.00-19.95s] |

- **Rules.**
  - Reserve one colour family for "AI is acting" and use it nowhere else [V:15VhHR rule 4].
  - Effect states are transitional: 8-15 f, then the final colours within 6-8 f. Never leave the AI colour on resting UI; held longer than ≈15 f, duotone "reads as a glitch" [V:15VhHR §Avoid].
  - Show generation as a develop, not a fake progress bar [V:15VhHR rule 5].
  - Particles must be made of the UI's own colours, never generic sci-fi sparkles [V:1CSXtQ WHY shot 5].
- **Why it works.** Once the viewer has learned the colour, every AI action explains itself without a caption [V:15VhHR WHY #24].

### UI-E18 Selection boxes and design-tool chrome [S]

- **Spec.** 1 px line in white, the accent or system blue, with small square corner handles; it tracks the object it selects [V:15VhHR §UI] [V:1i2L14 §9].
- **Behaviour.**
  - Appears with the contextual toolbar in 1-2 f on click [V:15VhHR t=23.47s].
  - Persists across cuts to show that a user is placing an asset ("not VFX") [V:15VhHR t=29.47-32.83s].
  - Can collapse with its content in 1 f into a dot inside a mini box (a design-tool "snap") [V:1i2L14 t=1.067s].
- **Why it works.** It is shorthand for "a person is in control"; it also gives designers a legible craft signal [V:1i2L14 §2].
- **Mistakes.** Jitter in a tracked selection box [V:1i2L14 §6, inferred]; selection boxes on objects nobody selected.

### UI-E19 Maps, routes and tracking [S, 1/8]

- Map arrives tilted 10-15°, eases upright over ≈1 s (E-OUT), then pans ≈8% H per second (E-LINEAR) with no zoom [V:126cpH t=11.4-13.5s].
- Pin pops in 3 f with a soft radial glow [V:126cpH t=11.60-11.70s].
- Route: a grey path is pre-drawn, then a coloured trim path fills it leg by leg (≈28 f, a 5 f pause at the corner, ≈16 f), reaching the destination ≈0.35 s before the cut [V:126cpH t=11.6-13.23s].
- Why it works: a steady progress motion plus a settling map reads as live tracking.

### UI-E20 Voice and audio UI (waveforms, orbs) [S, SaaS for voice products]

- **Waveform card.** A separate pill card under the voice card (≈70% H); bars re-randomise every frame so it is always alive while the voice plays [V:1-6l8S §9].
- **Waveform geometry** [E] (open-source component, ×2 for video): bars 8 px wide, 4 px gap, 4 px radius, 256 px tall, 48 px edge fade, opacity 0.3 + 0.7 × level. Feed it from the real audio track.
- **Listening halo.** A blurred, bar-like halo around the key word or logo marks the "listening" state [V:1-6l8S t=1.55s, 31.85s].
- **Orb** [E] (open-source shader): drift period ≈251 s; listening input 0.55 + 0.35·sin(3.2t), talking 0.65 + 0.22·sin(4.8t); levels smoothed by 0.2 per frame.
- **Why it works.** Audio products have no visible output; a waveform or orb that reacts to the real sound is the proof.
- **Mistakes.** A waveform that is not driven by the actual audio (it will visibly disagree with the voice) [inferred].

### UI-E21 Integrations and logo hubs [S, SaaS]

- **Desktop of real app icons**, then a cut-in, a truck and a cursor click on one app [V:1-6l8S t=34.15-37.15s].
- **Orbit ring of chips around the brand mark**: chips fly in along arcs with blur (≈22 f, or one every 4-6 f), settle on a guide ring with DOF (near chips soft), rotate slowly; at the climax they implode into the logo in ≈8 f [V:19NRDv t=4.97-7.17s, 52.75-55.6s].
- **Hub with connectors** [S:playbook `logos` (proposal)]: centre scales in ≈12 f, satellites pop one per spoken name (≈1 per 1.1 s in Superspace's VO), connectors draw in ≈9 f each, then one pulse dot travels each line. Not observed [X].
- **Co-brand pair**: the two wordmarks converge 20-40 px toward the "×" over 8 f while fading in; the colour half finishes ≈5 f later [V:1CSXtQ t=10.367-10.634s].
- **Mistakes.** Unlicensed logos; more than ≈8 logos on screen at 16:9 (they become a texture of brand colours) [inferred].

### UI-E22 Progress, loading and empty states [U]

- **Empty-state hold before a result**: 8-9 f (≈280 ms) on the empty card reads as "the AI is thinking" and builds anticipation [V:1-6l8S t=22.87-23.10s].
- **Loading**: swap the glyph to a spinner in one step [V:1ccYWJ t=40.40s]; typing dots (UI-E04); shimmer status line (UI-E17).
- **Progress path**: a route or bar that reaches its end just before the cut [V:126cpH t=13.23s].
- **QR / scan**: QR scales from a dot to full size in 8 f E-OUT; an accent scan line sweeps it [V:19NRDv t=62.27-62.60s].
- **Rule.** Never show loading longer than ≈1 s of screen time; real software can be slow, films cannot [inferred]. Never fake a progress bar to imply AI work (UI-E17).

---
## 8.4 Cursor physics (UI-C)

### 8.4.1 What the six cursor references measure

| Ref | Cursor | Entry | Travel | Dwell before press | Press → feedback → consequence | Anticipation (travel + dwell, computed) |
|---|---|---|---|---|---|---|
| kivi [V:1-6l8S t=36.20-37.15s] | Glossy purple-gradient 3D arrow | Rises from the bottom edge, ≈6 f | To the WhatsApp tile by ≈36.45 | Tile lifts ≈5 px and brightens (hover), click ≈12-15 f later | White light bloom grows from the tile over ≈6 f into a white frame | ≈20-22 f |
| Chowdeck [V:126cpH t=9.93-11.03s] | Orange hand pointer, motion smear on entry | Bottom-right | 8 f, E-OUT | 10 f | Press 10.53: 5 f pixel-break + ≈2° card jolt; audio onset on the press frame after a 0.5 s audio dip; morph 15 f later | 18 f |
| Wix [V:15VhHR t=2.5-4.23s] | Native macOS arrow, ≈2% H | Bottom edge | ≈17 f; per-frame deltas 3, 10, 13, 11, 8, 5, 4, 3, 3, 3, 2, 2, 2 (300 px-wide sheet units, duplicate frame removed): peak on f3-4 (≈83 px/f @1080p, ≈4.3% W/f, computed), long tail; slight lateral drift | ≈1.0 s hover; the sparkle twinkles through ≈4 phases | Click 3.97: sparkle stretches to a pill in 6 f; cut 8 f after the click | ≈44 f |
| Bumper [V:19NRDv t=11.10-12.27s] | Glossy orange 3D paper-plane arrow with a soft shadow | From the right with motion blur | ≈6 f | ≈22 f | Toggle clicked 12.03; the bar rises over the next 7 f | ≈28 f |
| HubSpot [V:1CSXtQ t=8.867-10.367s] | OS arrow that becomes a pointer hand on hover | Already resting on the first target (pressed state on the same frame) | 27 f (900 ms) slow E-GLIDE to the second target | ≈3 f | Chip label swaps on the press frame; toggle fills 2 f later; cut 5 f after the press | ≈30 f |
| NOSTRA [V:1i2L14 t=32.9-34.2s] | Thick stroke-drawn arrow | From below | ≈25 f: slow start, faster middle, decelerating finish | ≈2 f | Button −20% in 3 f, release in 6 f, no overshoot; static end hold | ≈27 f |

**Pattern.** Two ways to build the same ≈0.6-1.0 s of anticipation: a **fast travel plus a long dwell** (Chowdeck, Bumper, Wix) or a **slow travel plus a short dwell** (HubSpot, NOSTRA). Both let the viewer find the target before the press. Feedback always appears on the target within about one frame of the press.

### 8.4.2 Rules

**UI-C1. One cursor, one style, for the whole film. [U, 3/8 show it across scenes]**
- Bumper uses the same orange cursor in three UI scenes [V:19NRDv §9]; Wix uses "a single UI kit and a single cursor" [V:15VhHR §Creative]; NOSTRA's stroke-drawn arrow returns for the whip cue, the "NO" tap and the CTA press [V:1i2L14 t=4.73s, 31.9s, 32.9s]. kivi's single appearance matches its glossy 3D accents [V:1-6l8S t=36.20s].
- Why: the cursor stands in for the user. Changing it changes the person.

**UI-C2. Cursor type follows the UI tier. [S]**
- Real UI (T1/T2): the native OS arrow at native scale, turning into the pointer hand over clickable targets [V:15VhHR] [V:1CSXtQ].
- Stylised UI (T3/T4): a brand cursor (3D glossy arrow, coloured hand, stroke-drawn arrow) in the accent colour with a soft shadow [V:19NRDv] [V:1-6l8S] [V:126cpH] [V:1i2L14].
- Why: a native cursor on real UI is a fidelity cue; a brand cursor on stylised UI keeps the world consistent.

**UI-C3. Size lives in UI space. [U for native; inferred for brand]**
- Native: ≈2% H (≈22 px @1080p) at 1:1 UI scale [V:15VhHR §UI]. Scale it with the UI: when the camera pulls back, the cursor shrinks with the card [V:1i2L14 t=5.30-5.50s].
- Brand cursor: 3-4% H (32-43 px @1080p) [inferred]; [E] suggests 44 px [inferred].
- 9:16: 36-44 px @1920p for a native-scale phone UI [inferred from [E] and [N] minimum sizes].
- Never a cartoon-sized cursor in premium styles: Wix's teardown notes "no oversized cursor" as a credibility point [V:15VhHR §UI].

**UI-C4. Anticipation budget: 18-30 f between the start of the approach and the press. [U, 6/8]**
- Fast travel (6-8 f) + long dwell (10-22 f), or slow travel (25-27 f) + short dwell (2-3 f).
- Extend to ≈44 f only when the target is new and must be read first [V:15VhHR t=2.5-3.97s].
- Why: the dwell is "the anticipation that makes the click land" [V:126cpH WHY #7]. A press with no approach is a jump cut; a long wander is dead time.

**UI-C5. Travel profile: ballistic, not robotic. [U]**
- Duration by distance:

| Distance | Duration | Ease | Evidence |
|---|---|---|---|
| Short hop (<20% W) | 8-12 f | E-OUT | [V:126cpH t=9.93-10.20s] |
| Across the UI (20-50% W) | 15-20 f, peak ≈4% W/f on f3-4 | E-GLIDE (fast attack, long tail) | [V:15VhHR t=2.5-3.07s] |
| Deliberate (the viewer pre-reads the target) | 25-27 f | E-INOUT (slow start, faster middle, decelerating finish) | [V:1CSXtQ t=9.2-10.1s]; [V:1i2L14 t=32.9-33.73s] |
| Fly-in from off-frame | 6-12 f with motion blur | E-OUT | [V:19NRDv t=11.10-11.30s, 24.20-24.60s] |

- Path: a gentle arc or a slight lateral drift, never a ruler-straight line at constant speed [V:15VhHR Study 3 "slight leftward drift"; inferred: real hand movements curve slightly and have a bell-shaped speed profile].
- No overshoot past the target and no corrective wiggle in premium styles [inferred: none observed].
- Why: a fast start and a long settle is how a hand moves a mouse; a linear glide reads as a screen-recording macro.

**UI-C6. Feedback on the target within 1 f; consequence within 3-8 f. [U, 6/8]**
- Press frame: the target changes state (pressed colour, label swap, fill, scale −15-20% over 3 f) [V:1CSXtQ t=10.200s] [V:15VhHR t=12.20s] [V:1i2L14 t=33.8s].
- Then the consequence: toggle filled (+2 f), chart reacting (+0-7 f), page build or cut (+5-8 f), bloom transition (+6 f), logo swap (+5 f). The longest observed gap, Chowdeck's 15 f before the morph, has a 10 f hold built in [V:126cpH t=10.53-11.03s].
- Why: the 1 f response proves the product is fast; the short gap before the consequence lets the viewer register the press.

**UI-C7. Hover before press. [U, 3/8]**
- Arrow → pointer hand, plus a hover state on the target 3-15 f before the press: grey row fill with the hand pointer, ≈3 f before the click [V:1CSXtQ t=10.1-10.2s]; tile lift ≈5 px and brighten, ≈12-15 f before [V:1-6l8S t=36.45s]; icon twinkle through ≈4 phases, starting ≈16 f before [V:15VhHR t=3.43-3.97s].
- Why: hover tells the viewer which target is about to be pressed, so the press reads as intentional.

**UI-C8. Entry and exit. [U]**
- Enter from the bottom, bottom-right or right edge (5/6 references): kivi, Wix and NOSTRA from below, Chowdeck from the bottom-right, Bumper from the right and from below [V:1-6l8S t=36.20s] [V:126cpH t=9.93s] [V:15VhHR t=2.5s] [V:19NRDv t=11.10s, 24.20s] [V:1i2L14 t=4.73s]. NOSTRA's cursor drops in from the top once, for a 4 f tap on a word [V:1i2L14 t=31.9s]. Or appear already resting on the first target when that target is the first beat of the shot [V:1CSXtQ t=8.867s].
- After the consequence, park the cursor beside the result, pointing at it but not covering it (Bumper parks to the right of "%") [V:19NRDv t=24.60s]; or let it leave with the cut. Do not let it wander through a reading hold [inferred].
- Why: the bottom edge is where a hand "comes from" [inferred]; a parked cursor acts as an emphasis arrow.

**UI-C9. Cursor as a cue. [X]**
- Rotate or aim the cursor toward the direction of the next move about 10 f before it starts, so that it points that way by the move's first frame [V:1i2L14 t=5.50-5.87s].
- Why: anticipation by pointing makes a fast whip read as intended.

**UI-C10. Sound on the press frame. [U, 3/8 measured]**
- One soft click on the press frame (0 f), ideally after a short dip in the music: Chowdeck's −35 dB dip precedes the click by 0.5 s and the onset lands on the press [V:126cpH t=10.0-10.54s]; HubSpot's click is at 10.24 for a 10.233 press [V:1CSXtQ]; four Wix clicks have onsets within ±0.1 s [V:15VhHR §Rhythm].
- Why: the sound confirms the click for sound-on viewers; the dip gives it space.

**UI-C11. Cursor motion blur only on fly-ins. [S]**
- Blur or smear only on fast entries (Bumper, Chowdeck). Normal glides stay crisp (Wix, HubSpot, NOSTRA).

**UI-C12. Cursor failures to avoid. [A]**

| Failure | Why it reads as fake | Fix |
|---|---|---|
| Ruler-straight, constant-speed path | Reads as a macro or a keyframed dot | E-GLIDE, slight arc (UI-C5) |
| Hand-tremor jitter or random wobble | Reads as a capture artefact | Smooth path, no noise |
| Teleporting between targets | Breaks the "one user" illusion | Always travel, or cut |
| Press with no target response | The product looks dead | UI-C6 |
| Cursor moving during a reading hold | Steals attention from the text | Park it (UI-C8) |
| Oversized cartoon cursor in a premium film | Tone mismatch | UI-C3 |
| Two cursors at once | Confuses who is acting | One cursor, unless multiplayer is the feature [inferred] |

---

## 8.5 Typing and caret (UI-K)

**UI-K1. Typing speed follows what the viewer must do with the text. [U]** (Part 03 SP-C)

| What is typed | chars/s | Evidence |
|---|---|---|
| A prompt or question the viewer must read (wide shot) | **15-20** | [V:15VhHR t=4.2-6.57s] ≈19; [V:126cpH t=1.73-2.07s] ≈15 |
| The key noun phrase, or any extreme close-up | **7-9** (first letters ≈4) | [V:15VhHR t=6.57-8.6s] 7-8; [V:1CSXtQ t=3.97-5.3s] ≈9; [V:1CSXtQ t=13.28-14.03s] ≈4 |
| Filler, or text already read | 25-35 (bursts to 50) | [V:1CSXtQ t=2.53-2.87s] ≈35; [V:1CSXtQ t=6.3-7.2s] ≈28; mid-query filler burst 30-50 [V:1CSXtQ t=15.0-16.0s] |
| A UI headline that then holds (type-on with a gradient leading edge) | 40-55 | [V:15VhHR t=4.47-5.13s] ≈53 |
| URL in a CTA | ≈23 | [V:1ccYWJ t=39.73-40.53s] |

- **References win** over [E]'s "2 characters per frame" (60 chars/s) for prompt typing: no reference types a whole readable prompt at that rate. The fastest spans are short bursts on filler words inside a query that slows again for its key words (HubSpot's 30-50 chars/s burst [V:1CSXtQ t=15.0-16.0s]) and UI headlines that then hold (Wix ≈53 [V:15VhHR t=4.47-5.13s]).

**UI-K2. Human rhythm, not a metronome. [U, 3/8]**
- 170-200 ms between words; 0.9-1.1 s pauses at phrase breaks; fast on filler, slow on the key phrase [V:1CSXtQ t=0.60-7.2s].
- Why: "variable typing speed… feels human, not machine-perfect" [V:1CSXtQ WHY shot 2].

**UI-K3. Caret.**
- Visible while typing and through pauses; blink 0.3 s on / 0.3 s off (≈18 f period) [V:1CSXtQ, approx]; [E] 16 f [inferred].
- Hide it when the text is complete and the UI builds around it [V:1CSXtQ t=7.67s].

**UI-K4. Keep the newest character in frame. [U, 3/8]**
- Caret-lock: once the line passes the centre, scroll the line so the caret stays at ≈65% W; let the start of a long line overflow the left edge [V:1CSXtQ t=4.5-7.2s].
- Caret-follow camera: an ease-in truck (≈6 → 18 px/f @1138, computed ≈10 → 30 px/f @1080p) keeps the caret in the right third [V:15VhHR t=6.57-8.6s]; or a slow E-INOUT truck that lets the caret drift from ≈19% to ≈75% W [V:1CSXtQ t=13.6-17.3s].
- Re-centre a growing line with exponential smoothing (E-LERP, k ≈0.2-0.25 per frame, settles in 13-14 f) [V:1-6l8S rule 1].

**UI-K5. Autocomplete and AI suggestions.** Recolour the completed words with the AI colour in ≈4 f, then settle (UI-E17) [V:15VhHR t=7.87s].

**UI-K6. Typing sound.** Soft keystrokes 20-25 dB under the music (HubSpot's teardown rule 14; it hears "quiet keystrokes" but did not measure their level [V:1CSXtQ §12, Verification]). Lottieicon's silent type-ons are flagged as "a missed opportunity" [V:1ccYWJ §12].

**UI-K7. Lock the string.** The same characters in every shot of the scene [V:15VhHR t=6.57s flaw].

---

## 8.6 Scroll (UI-SC)

| ID | Scroll type | Spec | Ease | Evidence |
|---|---|---|---|---|
| UI-SC1 [U] | Page scroll as navigation | ≈1 FH in **12 f**, motion blur on frames 2-4, then land and hold for the read time | E-OUT | [V:15VhHR t=34.47s] |
| UI-SC2 | Section reveal | Next section scrolls up in ≈5 f, then cut | E-OUT | [V:15VhHR t=21.35-21.52s] |
| UI-SC3 | List scroll, then hold | 12 f, then hold ≈1.4 s | E-OUT | [V:15VhHR t=46.37-48.2s] |
| UI-SC4 [SaaS] | Scroll as an exit | Accelerate ≈12 → 36 px/f @1080p (computed from 8 → 24 px/f @720) into the transition | E-EXIT | [V:1CSXtQ t=20.40-21.47s] |
| UI-SC5 [S] | Endless list / marquee | Constant slow speed (≤0.5% H/f); "a list that never ends" | E-LINEAR | [V:1ccYWJ t=16.10-18.83s] (card column); [V:1ccYWJ t=23.6-25.3s] (ribbon marquee); [V:1Hcg3X] 0.3-0.5% H/f |
| UI-SC6 [S] | In-card scroll | Content scrolls inside a tilted card while the card flattens (≈15° → 0° in 7 f) | E-OUT | [V:15VhHR t=33.33-34.47s] |

**Rules**
- **UI-SC7. Never scroll text the viewer must read.** Scroll, land, then read. Moving text above ≈0.2% W/f is not read [Part 04 defaults #3].
- **UI-SC8. Scroll direction is progress direction.** Upward reveals mean "forward" [V:126cpH Study 3]; keep vertical = progression and horizontal = context for the whole film [V:1Hcg3X §16].
- **UI-SC9. Inertial landing.** Real scrolls decelerate exponentially; a linear scroll that stops dead reads as a keyframe [inferred]. Use E-OUT with the bulk of the travel in the first 3-4 f, and blur those frames.
- **UI-SC10. Render natively at the delivery frame rate.** Scrolls are where 25 → 30 fps duplicate-frame judder shows most [V:15VhHR] [V:1CSXtQ].
- **Why scroll works.** Scrolling is a verb every viewer knows, so a scroll lets the camera "use" the product instead of looking at it (Part 04 CM-17).

---

## 8.7 Zoom to an element and focus (UI-Z)

### 8.7.1 Method by need

| Need | Method | Numbers | Evidence |
|---|---|---|---|
| Make a typed line or a value readable | **Cut-in** (instant scale change) | 2-3.5×; the target text reaches cap 4-7.5% H | [V:1-6l8S t=35.47s] 2×; [V:19NRDv t=13.13s] 2.5×; [V:15VhHR t=6.57s] 3.4× (2.2% → 7.5% H) |
| Show the detail, then where it lives | **Macro first, then pull back** | ×0.75 over 21-31 f E-INOUT; or a 2-3 f snap; or 3× → 1× in 24 f E-SNAP | [V:1CSXtQ t=8.0-9.03s]; [V:19NRDv t=28.77-28.83s]; [V:1Hcg3X t=14.30-15.30s] |
| Isolate one panel or column from a busy screen | **Extraction + push-through** | Extrude ≈0.6 s; push 9 f; the context blurs and falls back | [V:19NRDv t=17.6-18.55s] |
| Follow what is being typed | **Caret-follow truck** | Caret held at ≈65% W, or in the right third | [V:1CSXtQ] [V:15VhHR] |
| Travel between several targets | **Hop-and-hold** | Hops 17-32 f E-HOP, holds 7-20 f. Measured peaks 8 → 10 → 27 → 22% W/f with no blur (flagged as strobing); cap at 8-10% W/f or add 180° blur above 5% W/f (its teardown's fix) | [V:1ccYWJ t=27.13-33.20s, rule 11]; Part 04 CM-17(c) |
| Draw the eye into an action | **Short animated push** | ≈130% in ≈15 f into the action; or a 3 f ×1.5 accelerating push into a cut-in; at most 2 per film | [V:15VhHR t=28.0-28.5s, 16.53-16.60s] |
| Point at something without moving the frame | **Dim, defocus or highlight the rest** | Context to 15% (texture) or 50% (secondary) in 3-6 f; plus a highlight (UI-H) | [V:1ccYWJ t=9.833s]; [V:1-6l8S t=13.77s] |
| Proposal: spotlight zoom per spoken focus | Camera eases ≈18 f until the target fills ≈45% W; the rest dims to 30-40%; ring + label | 1.2 s to establish + 1.8-2.5 s per focus, ≤3 focuses | [S:playbook `screen` (proposal)]; not observed |

### 8.7.2 Rules

**UI-Z1. Default to the cut-in. [U, 4/8]**
- "Use ≈3-3.5× scale cut-ins for detail… and pull-out cuts for context. Reserve animated pushes for 1-2 moments" [V:15VhHR rule 13].
- **References win** over [S:playbook]'s proposal of an animated ≈0.6 s camera ease per focus: an animated zoom on UI spends half a second on motion the viewer does not need and softens the text while it moves (Part 04 CM-20). Animate only when the move itself carries meaning (a reveal, a follow, a hand-off, an extraction).

**UI-Z2. Detail before context, or context before extraction. Pick one per beat. [U, 4/8]**
- Detail → context: a single chart or icon, then the whole dashboard or device [V:19NRDv t=27.57-29.97s] [V:1Hcg3X t=14.30s] [V:1CSXtQ t=8.0-9.03s].
- Context → extraction → focus: the whole table, then the column that matters [V:19NRDv t=16.77-20.50s].
- Bumper uses both and its teardown names the inversion explicitly [V:19NRDv §9]. Use detail-first when the value is the message; use extraction when the relationship (two columns matching) is the message.

**UI-Z3. Target framing after the zoom. [U, computed]**
- The focused element occupies 15-45% W (Lottieicon's highlighted tile ≈15% W after a 2.27× zoom [V:1ccYWJ t=28.47s]; [S:playbook] proposes ≈45% W).
- Its key text reaches cap ≥4% H (≥43 px @1080p): HubSpot's macro prompt 4.2% H, Bumper's KPI 6% H, Wix's ECU input 7.5% H.

**UI-Z4. Resolution for zooms. [U]**
- Rebuild UI as vector, or supply rasters at ≥ (max zoom × delivery width). A 3.4× cut-in on a 1920 px delivery needs a ≥6528 px-wide source (computed). [S:playbook] proposes ≥1.5× output width as a floor and a warning when zoomed text would render below 24 px (proposal).
- Why: soft or greeked UI at the moment of scrutiny is HubSpot's hero-beat flaw [V:1CSXtQ §13].

**UI-Z5. Land, then read. [U]**
- No zoom, push or pan while the viewer reads the target. Land the move (E-OUT or E-SETTLE), then hold for max(1.0 s, 0.33 s × words + 0.4 s) [N].

**UI-Z6. Eases and speed limits. [U]**
- Arrivals out of a cut: E-OUT / E-SNAP. Travel between two on-screen targets: E-GLIDE or E-HOP. Into a cut-in: E-EXIT or E-PUNCH (3 f). Never linear; never overshoot.
- Unblurred peak ≤5% W/f; 180° blur up to ≈10% W/f; above that only as a whip into a cut [Part 04 defaults #7]. Lottieicon's tour hits 22-27% W/f with no blur and "strobes" [V:1ccYWJ §13].

**UI-Z7. Focus by subtraction. [U, 5/8]**
- Dim (Lottieicon wall to ≈15% in 3 f; kivi raw text to ≈50%), defocus (Bumper tables fall away; Wix blurred copy of the image behind a modal [V:15VhHR t=23.97s]; Chowdeck rack focus), or extract. The focused element itself never changes brightness to "pop" [inferred].
- Why: removing competition is quieter and more legible than adding effects to the target.

---
## 8.8 Depth, glass, shadows and light on UI (UI-D)

### 8.8.1 Depth recipes for UI, by style

| Recipe | Planes | How depth is made | Reference | Use for |
|---|---|---|---|---|
| **Flat white + soft shadow** | 2 (canvas, UI) | Soft y-offset shadows only; 92-95% of the frame white | [V:1CSXtQ] | Prompt-native, AI connectors, minimal premium |
| **Glass over a defocused plate** | 3 (plate, glass card, accent card / badge) | Heavy plate blur; frosted glass with a 1 px light rim | [V:1-6l8S] | Voice and AI assistants, consumer-friendly SaaS |
| **Lit 3D planes on dark** | 3-4 | Tilted translucent planes, DOF, contact shadows, motion blur, glow on dark | [V:19NRDv] | Fintech, payments, "unify / automate" stories |
| **Emissive on black** | 2-3 | The UI surface is the light source; accent under-glow; extruded accent edges | [V:1ccYWJ] | Developer tools, asset libraries, dark-mode products |
| **Flat collage** | 2 | Offset solid backing card; drop shadows on cut-outs; no lighting model | [V:126cpH] | Consumer apps, playful brands |
| **Window in the world** | 3 | Page window over its own photo extended full-bleed; soft shadow; foreground element in focus | [V:15VhHR t=19.73s, 43.07s] | Website builders, content products |

### 8.8.2 Rules

**UI-D1. Three planes, four at most in a hero beat. [U, 4/8]**
- Plate (flat colour, gradient or defocused image) → UI (sharp) → accent (waveform, badge, cursor, particles). HubSpot reaches four planes only in its hero shot [V:1CSXtQ t=17.8-21.47s] (Part 02 CO-U19).
- Glass-over-plate shots: plate blur radius ≥2-4% W (≈40-75 px @1080p) [Part 04 DP default, inferred].
- Why: three planes give foreground, subject and context; a fourth only pays off when the camera moves through it.

**UI-D2. One soft-shadow recipe for UI, scaled with the card. [U]**
- Default @1080p for a 960-1280 px card: y-offset ≈24 px (2.2% H), blur ≈48 px (4.4% H), black at 6-8%, plus a 1 px hairline at ≈6% (Part 02 CL-U20; values from [E]: `0 0 0 1px rgba(0,0,0,.06)` and `0 24px 48px rgba(0,0,0,.08)`; the references show the look qualitatively, e.g. HubSpot's falloff to ≈#F0F0F0 on white).
- Scale: offset ≈2-2.5% of the card width, blur ≈2× the offset [computed from the default].
- A layer above another (a dropdown above the bar, a modal above the page) gets one step more shadow [V:1CSXtQ t=8.867s, inferred step size].
- Shadows are y-offset only (soft top light) unless the film has an explicit key light (UI-D9).
- Why: a consistent shadow is how the eye reads stacking order; a mixed set of shadows reads as collage.

**UI-D3. Glass recipe, and when glass is allowed. [S, 4/8 use glass]**
- Spec from kivi [V:1-6l8S §9]: frosted backdrop blur that picks up a tint from the plate, a 1 px light rim, a soft inner glow, UI text white at ≈4% H with leading ≈1.6.
- Inferred numbers for a build: backdrop blur 40-60 px @1080p; light fill white at 12-20%; rim white at 30-50% on the key-light side (upper-right by default), 10-20% elsewhere [inferred; NOSTRA's glass tiles show "a lighter rim", side not recorded [V:1i2L14 t=28.7-30.6s]].
- Materialise: opaque white → frosted in ≈8 f, or a frosted ghost → opaque in ≈6 f [V:1-6l8S t=39.75-40.2s, 67.73-67.93s].
- **Glass only over something.** Over flat colour it reads as a grey box (Part 04 DP-13).
- Check text contrast against the brightest plate pixel behind the glass (Part 02 CL-U11).
- Why: glass proves depth by showing a blurred version of what is behind it, and it lets the product sit on top of a human scene without hiding it.

**UI-D4. Depth without lighting in flat styles. [S]**
- Offset solid backing card in a darker tint of the card colour, offset 4-6% of the card size, shrinking to ≈3% as the card lands [V:126cpH t=9.27-10.00s].
- Extruded accent edge 6-8% thick (a recommendation in Lottieicon's teardown rule 9, not a measurement), seen from below at a 10-15° perspective tilt [V:1ccYWJ t=16.10-18.83s].
- Hard long cast shadow in one direction only [V:1Hcg3X].

**UI-D5. Light means "active". [S, 3/8]**
- Emissive under-glow in the accent colour on a UI component that is "powered", building over ≈1 s [V:1ccYWJ t=12.17-13.0s]; falloff ≈10% H (its teardown's rule 8, not measured).
- Selected item on an accent tile with an outer glow ≈20% of the tile size [V:1ccYWJ t=27.13-33.20s].
- A glow flare (1-2 f up, ≈0.6 s decay) to point at a cause [V:1Hcg3X t=4.00-4.63s].
- Glow on type over dark: ≤2-3% of cap height, so letter edges never smear [V:19NRDv §16].
- Glow only on emitters and active states; never on inert UI (Part 02 §11.7).

**UI-D6. Tilt budget. [U, 3/8]**
- While read: 0-15°. In transit: up to ≈35° Y / 20° X [V:19NRDv t=16.77s, inferred angles].
- Flatten to face-on in 7-8 f before the viewer has to read [V:15VhHR t=33.33s] [V:1ccYWJ t=16.10-16.37s].
- A slow yaw away (≈1 s) works as a soft exit [V:19NRDv t=28.9-29.95s].
- Why: perspective foreshortens text; tilted text is texture.

**UI-D7. Depth of field only on what is not being read. [U]**
- Near chips soft, ring-plane chips sharp [V:19NRDv t=4.97-5.70s]; CTA bubbles sharpen as they settle [V:1ccYWJ t=39.2-40.5s]; foreground particles go to bokeh only in a hero dolly [V:1CSXtQ t=19.95-20.47s].
- The focused UI is always sharp. Rack focus 8-12 f (Part 04 CM-18).

**UI-D8. Motion-blur policy is set once per film. [U]**
- Styles with no UI motion blur (kivi, HubSpot) and styles with blur on every move (Bumper) both work; mixing them does not [Part 04 CM-U9].
- Hard limit either way: unblurred UI ≤5% W/f (UI-Z6). Wix's page scrolls get blur on frames 2-4 only [V:15VhHR t=34.47s].

**UI-D9. One key light for all UI planes. [U]**
- Shadows, glass rims and speculars agree. Default: soft top light (y-only shadows) plus ambient from the upper right (Part 02 CL-U19). The solar film mixes rightward and down-left shadows and its teardown calls it out [V:1Hcg3X §Rule 11].

**UI-D10. Planes never intersect. [A]**
- Every plane is wholly in front of or wholly behind its neighbour. HubSpot's CRM window pokes through the chat pane's glass edge and the seam slides from x ≈230 to ≈485 px @720 [V:1CSXtQ t=18.4-19.0s].

**UI-D11. UI in the world is a composite with matched light. [S]**
- A page window at ≈85% floating over its own photograph extended full-bleed, with a soft shadow and an in-focus foreground element (grass, a palm leaf) [V:15VhHR t=19.73s, 43.07s].
- Match horizon, light direction and colour temperature between the window's image and the world image (Wix shows a slight mismatch) [V:15VhHR §Flaws].

**UI-D12. 3D is a budget. [U, 5/8]**
- Minimal styles: one 3D UI beat, ≈10-15% of runtime [V:1CSXtQ] 3.67 s of 30 s; Wix: three 3D moments (heart, ice object, deck) "so the 3D moments read as special" [V:15VhHR §Motion]; kivi: none.
- Exception: in the "lit 3D planes" style, 3D UI *is* the language [V:19NRDv].

---

## 8.9 Highlight and state language (UI-H)

### 8.9.1 State table

| State | Visual treatment | Timing | Evidence |
|---|---|---|---|
| **Hover** | Arrow → hand; light row fill; tile lift ≈5 px + brighten; icon micro-animation | ≈3 f E-OUT, 3-15 f before a press | [V:1CSXtQ t=9.2-10.1s]; [V:1-6l8S t=36.45s]; [V:15VhHR t=3.43-3.87s] |
| **Pressed** | 1 f pressed colour (track darkens, chip greys, button fills accent); or scale −15-20% | 1 f, or 3 f E-OUT; release 6 f | [V:1CSXtQ t=10.233s]; [V:15VhHR t=8.53s]; [V:1i2L14 t=33.8-34.0s] |
| **Selected** | 1 px accent bounding box with square corner handles + contextual toolbar; or an accent glow tile | Pops in 1-2 f; may persist across cuts | [V:15VhHR t=23.47s, 29.47-32.83s]; [V:1ccYWJ t=27.13s] |
| **Active / on** | Track fills accent (#3585E4 in HubSpot); accent under-glow | 1 f fill; glow builds ≈1 s | [V:1CSXtQ t=10.267s]; [V:1ccYWJ t=12.17-13.0s] |
| **Attention / focus flare** | Glow flares on the cause; or a halo blooms behind the target | 1-3 f up; ≈0.6 s decay | [V:1Hcg3X t=4.00-4.63s]; [V:15VhHR t=23.83-23.93s] |
| **Corrected / changed** | Peach selection rectangle, then the replacement word | 4-5 f | [V:1-6l8S t=20.43-20.60s] |
| **AI working** | AI colour sweep, duotone, mosaic, shimmer, typing dots, spinner | 8-20 f, then settle in 6-8 f | UI-E17 |
| **Success / matched** | Mint fill wiping left to right with a feathered edge (#D4F4EC / #B4ECDC); teal (#34ACB4) node; green status dot; glass ✓ tile | Fill 4 f; colour flip 1-2 f | [V:19NRDv t=20.37-20.50s, 45.0s, 22.7s]; [V:1i2L14 t=28.7-29.2s] |
| **Warning / conflict** | Orange status dot; ⚠ riding the level line | 1-2 f | [V:19NRDv t=22.7s]; [V:1Hcg3X t=21.53s] |
| **Error / failed** | Red (#EC243C) node that then shrinks and recedes | Flip 1-2 f; recede ≈24 f [V:19NRDv t=40.8-41.6s] | [V:19NRDv t=40.8s, 42.5s] |
| **Secondary / past** | Dim to ≈50% (earlier content) or ≈15% (texture behind a stat); or bare strokes vs the accent tile | 3-6 f | [V:1-6l8S t=13.77s]; [V:1ccYWJ t=9.833s] |
| **Value reached** | Counter stops; a pointer parks beside it; a row highlight sweeps below | Hold ≥0.6 s | [V:19NRDv t=24.93-25.60s] |

### 8.9.2 Rules

**UI-H1. One colour, one meaning, for the whole film. [U, 4/8]**
- Wix: cyan/iridescent appears "only when AI acts" [V:15VhHR §Creative]. Lottieicon: green = "alive or selected" [V:1ccYWJ §2]. Bumper: mint = matched, red = failure, teal = success [V:19NRDv §9]. kivi: light/colour = kivi is listening [V:1-6l8S §2].
- Why: once learned, the colour explains every later state without a label.

**UI-H2. State changes snap; their decoration eases. [U]**
- The state itself changes in 0-2 f (a fill, a swap, a colour flip). Glows, halos and highlights rise in 1-3 f and decay over 6-18 f [V:1Hcg3X t=4.00-4.63s] [V:15VhHR t=23.83s].
- Discrete states snap (0 f), continuous values ease [V:1Hcg3X rule 15].

**UI-H3. Effect colours are temporary. [U]**
- Any "acting" colour settles to the final palette within 6-8 f and never sits on resting UI longer than ≈15 f [V:15VhHR rule 4].

**UI-H4. Highlight the cause before the action. [S, 3/8]**
- The switch flares before "But how?" [V:1Hcg3X t=4.00s]; the violet halo blooms before the cut-in to the image tool [V:15VhHR t=23.83s]; the hover state precedes every click (UI-C7).

**UI-H5. Selection can persist across cuts to show agency. [S]**
- Wix keeps the editor selection box on the ice bottle across four layouts: "this is a user placing an asset, not VFX" [V:15VhHR WHY #18-22].

**UI-H6. State colours must pass contrast. [U]**
- Non-text marks (dots, bars, toggles, icons) ≥3:1 against their ground; text ≥4.5:1 [N WCAG 1.4.11, 1.4.3]. Bumper's violet bars on navy fail [V:19NRDv t=11-14s]; HubSpot's orange icon (3.34:1) and blue toggle (3.73:1) pass (Part 02 CL-U9).

**UI-H7. Status needs a readable hold. [U]**
- Every state the viewer is meant to notice stays ≥1.0 s. Chowdeck's final "Order delivered" lasts 2 f and is "effectively subliminal" [V:126cpH Study 9].

---

## 8.10 Legibility and hierarchy (UI-L)

### 8.10.1 Measured UI text sizes and their verdicts

| Ref | Text | Size | @1080p / @1920p (computed) | Verdict |
|---|---|---|---|---|
| kivi | Voice and message card body | ≈3.5-4% H | 38-43 px font | Readable |
| kivi | Micro-labels ("You said", email headers, cells) | 1.2-2% H | 13-22 px | Texture (flagged) |
| Wix | Chat headline | cap 4.7% H | 51 px cap | Readable |
| Wix | Input, wide / extreme close-up | cap 2.2% / 7.5% H | 24 / 81 px cap | Borderline → readable after a 3.4× cut-in |
| Wix | UI micro-copy | 1-1.5% H | 11-16 px | Texture (flagged) |
| HubSpot | Typed headline / macro prompt | cap 3.3% / 4.2% H | 36 / 45 px cap (≈51 / 64 px font) | Readable |
| Bumper | KPI number | cap ≈6% H | ≈65 px cap | Readable |
| Bumper | UI micro-text, axis labels | ≈1-1.3% H | 11-14 px | Texture (flagged) |
| Chowdeck (9:16) | Notification | 2.7% H | ≈52 px @1920p | Readable |
| Chowdeck (9:16) | Card title / line items | 2% / 1% H | 38 / 19 px @1920p | Illegible (flagged) |
| Lottieicon | "Get both" / card labels | 3.5% / ≈3% H | 38 / 32 px | Readable |
| Lottieicon | URL / chips | 2% / 1.5% H | 22 / 16 px | Too small (flagged) |
| Solar | Labels / recap labels | cap 3.6% / 2.2-2.5% H | 39 / 24-27 px cap | Readable / too small (flagged) |
| NOSTRA | "BOOK NOW" in the CTA pill | cap 5.3% H | 57 px cap | Readable |

### 8.10.2 Rules

**UI-L1. The legibility contract: three tiers. [U, 8/8 flag the failure]**

| Tier | Contents | 16:9 minimum | 9:16 minimum | If it is smaller |
|---|---|---|---|---|
| **Must-read** | The one value, the typed query, the status, the CTA | Cap ≥3% H (≥32 px cap, ≈46 px font); ≥4% H when the shot exists to show it | Font ≥52 px (2.7% H) [N; Chowdeck notification] | Cut in (UI-Z1) |
| **Should-read** | Labels that help (column headers, tab names) | Cap 2.5-3% H (27-32 px) | Font ≥36 px floor [N] | Accept as texture, never carry meaning |
| **Texture** | Everything else | <2.5% H | <36 px | Must still be real content (UI-B7) |

- If the 16:9 film will be watched inline on phones, must-read body text needs ≈84 px [N]; reach it with a cut-in (Wix's ECU input is 81 px cap), not by enlarging the whole UI.
- Why: every teardown flags micro-text, and every teardown also shows the fix (Bumper scales up "the one value that matters"; Wix cuts in 3.4×; kivi keeps card body at 4% H).

**UI-L2. Read time is a hold, not a moving window. [U]**
- After the text lands and stops: max(1.0 s, 0.33 s × words + 0.4 s, characters ÷ 17) [N]. Statuses ≥1.0 s (UI-H7). Numbers ≥0.6 s with a pointer on them [V:19NRDv t=24.93-25.60s].

**UI-L3. One text level per frame. [U, 3/8]**
- HubSpot: "Each frame has one text level" [V:1CSXtQ §8]. kivi keeps a bright line over a dim one, never two bright ones [V:1-6l8S t=13.77s]. Bumper lowers function words to a lighter tint [V:19NRDv §8].

**UI-L4. Order of attention when a screen appears. [U, 4/8]**
- Container → headline or primary value → badge or key control → navigation → body → decoration. Wix's generated page: clean plate 2 f → header wipe 2 f → wordmark colour-settle 8 f → badge +4 f → nav and copy +2 f → marquee +2 f, 12 f total [V:15VhHR t=12.47-12.83s]. kivi's email: To → subject → greeting → body → sign-off [V:1-6l8S t=23.13-23.87s].

**UI-L5. One readable item per UI beat; at most three. [inferred, consistent with 8/8]**
- kivi: "Each card has one job" [V:1-6l8S §9]. Wix and Bumper show three annotation cards at most around a hero. More than three readable items on one UI frame turn into a screenshot to be paused, not a film [inferred].

**UI-L6. Micro-text is legitimate texture when shape and colour carry the meaning. [S]**
- Bumper's tables: "Legibility relies on shape and colour, not reading" [V:19NRDv §9]. NOSTRA's carousel of copy is unreadable on purpose to show "too much text" [V:1i2L14 t=10.63-13.97s].
- Condition: the message must be readable from the state (a mint column, a red node, a filled bar) without the micro-text.

---

## 8.11 Choreography patterns (UI-P)

Patterns are complete, frame-timed UI sequences that can be dropped into a storyboard. Times are the reference's own timecodes; shift them to your edit.

### UI-P1. Say → see (voice or prompt → result) [SaaS · kivi, 4 demos]

| Time (s) | Beat | Spec |
|---|---|---|
| 17.03-18.37 | App icon | Fades in 8 f; slow push +21%; expo punch +33% in the last 3 f |
| 18.367 | Cut | Hard cut on a music onset to a desaturated life plate |
| 18.40-18.63 | Voice card | Glass prompt card and waveform card fade in (≈8 f) |
| 18.57-19.33 | Colour | The plate blooms from B&W to colour (22 f) as the voice starts |
| 18.70-20.45 | Stream | Words at ≈6.9/s, each 30% → 100% in 3-4 f |
| 20.43-20.60 | Micro-proof | Mis-heard name gets a peach selection box, then is corrected |
| 22.867 | Cut | Continuity cut: same plate, reframed; the result window replaces the prompt |
| 22.87-23.10 | Empty hold | 8 f |
| 23.13-23.87 | Cascade | To → subject → greeting → body → sign-off, 3-4 f stagger, 4-6 f fades |
| 23.87-25.47 | Hold | Slow push; then cut to the feature's name card |

Source: [V:1-6l8S t=17.03-25.47s]. Why: the same grammar four times teaches the viewer once, then lets them enjoy variations [V:1-6l8S §13].

### UI-P2. Text → UI build [SaaS · HubSpot]

| Time (s) | Beat |
|---|---|
| 2.13-7.20 | Headline typed on an empty canvas: 35 cps filler, ≈9 cps key phrase, 0.9-1.1 s phrase pauses; caret locked at ≈65% W |
| 7.20-7.80 | 0.6 s hold on the finished line |
| 7.80 / 7.83 / 7.93-8.07 | Bar border and shadow (1-3 f) / brand icon pop (≈3 f) / toolbar slides up (4-5 f) |
| 8.0-9.03 | Pull back ×1.00 → ×0.75, E-INOUT |
| 8.867-9.067 | Cursor already on "Add sources"; dropdown 6 f, rows 2 f apart |
| 9.2-10.1 | Cursor travels 27 f to the HubSpot toggle; hover fill; hand pointer |
| 10.200 / 10.233 / 10.267 / 10.333 | Chip label swap / knob pressed / track filled / knob settles |
| 10.367 | Cut to the co-brand lockup on the riser crest |

Source: [V:1CSXtQ t=2.13-10.367s].

### UI-P3. Brand icon becomes the UI [SaaS · Wix]
- Cursor enters from below (≈17 f), hovers 1.0 s on the sparkle in the brand sentence, clicks at 3.97 s; the sparkle stretches into the prompt pill over 6 f while everything else fades over 6 f; cut at 4.23 s to the AI world; the music drop lands 8 f after the cut [V:15VhHR t=2.5-4.5s].
- Why: "the CTA icon becomes the UI", so the viewer never leaves the brand world for a cold screen recording [V:15VhHR rule 3].

### UI-P4. Locked anchor, swapping worlds ("slot machine") [SaaS, X · Wix]

| Time (s) | Background | Hold |
|---|---|---|
| 8.63-8.93 | Use case 1 as a thermal duotone | 9 f |
| 8.93 | 1 f switch to the colour photo; residual overlay clears over ≈12 f | colour 21 f |
| 9.63-9.87 | Use case 2, duotone | 7 f |
| 9.87 | 1 f switch; overlay fades ≈6 f | colour 29 f |
| 10.83-11.20 | Use case 3, duotone | 11 f |
| 11.20 | 1 f switch; grade clears ≈10 f | colour 38 f |
| 12.20 | Send click; music sucks out to −35 dB | — |
| 12.467 | Cut (8 f after the click) to the generated result, built in 12 f | — |

- The prompt bar keeps identical position and size throughout. Holds lengthen (21 → 29 → 38 f) to land on the hero use case [V:15VhHR t=8.63-12.83s].

### UI-P5. Context → extraction → focus [SaaS · Bumper]

| Time (s) | Beat |
|---|---|
| 16.73 | Outgoing text defocuses for 1 f |
| 16.767 | Cut on an onset |
| 16.77-17.17 | Two tilted tables fly in from the bottom-right with blur, 12 f E-OUT; perspective then flattens slowly |
| 17.6-18.2 | The relevant "Amount" columns extrude forward |
| 18.25-18.55 | Push-through, 9 f: tables blur and drop back, columns rotate face-on |
| 18.58-18.75 | Source labels drop on, 5 f |
| 20.37-20.50 | Mint fill wipes left to right across both columns, feathered edge, 4 f = "matched" |
| 21.43-21.55 | Opacity and blur dissolve to white, 4 f |

Source: [V:19NRDv t=16.73-21.55s]. Why: "the core story of reconciliation… told by camera"; the fill shows "matched" with zero words [V:19NRDv WHY #12-13].

### UI-P6. Shared-element morph into a notification [SaaS · Chowdeck]

| Time (s) | Beat |
|---|---|
| 9.27-10.00 | Order card enters (playful toss), line items at +5 f |
| 9.93-10.20 | Cursor approach, 8 f |
| 10.20-10.53 | Dwell, 10 f (audio dips) |
| 10.53-10.70 | Press: button pixel-break 5 f, card jolt, audio onset on the press frame |
| 10.70-11.03 | Hold, 10 f |
| 11.03-11.27 | Backing card drops; card collapses bottom-anchored and narrows into the pill (≈7 f) |
| 11.07-11.43 | Background racks focus to the map (11 f) |
| 11.53-13.57 | Status cycles inside the pill (fade-out / blank / fade-in); route draws leg by leg; pin pops with glow |

Source: [V:126cpH t=9.27-13.60s]. Fix the flaws when reusing it: hold each status ≥1.0 s, and keep the pill inside the 9:16 safe band (UI-E09).

### UI-P7. Hop-and-hold tour [S, X · Lottieicon]
- Four moves: move 1 is a ≈2.27× zoom-in that re-targets onto the first tile (32 f), then hops of 32 → 22 → 17 f (E-HOP); the holds after each move run ≈8 → 20 → 20 → 7 f on an accent-highlighted item that plays its micro-animation; an 11 f ease-in pull-back hands off to a scale-matched title [V:1ccYWJ t=27.13-33.20s]; full table in Part 04 CM-17(c).
- Sound: a sub boom at the peak velocity of each hop, within ≈2-3 f [V:1ccYWJ §11].
- Fix the flaw: cap peak speed at 8-10% W/f, or add 180° blur above 5% W/f.

### UI-P8. Click-caused transition [U, 4/8]
- A UI action becomes the cut: the click blooms white light from the clicked tile over ≈6 f into the next scene [V:1-6l8S t=36.85-37.15s]; a tap on a word swaps it to the logo in 5 f [V:1i2L14 t=32.0-32.17s]; the toggle fill cuts to the lockup 3 f later [V:1CSXtQ t=10.267-10.367s]; the send click cuts to the result 8 f later with an audio suck-out [V:15VhHR t=12.20-12.467s].
- At least two transitions per film should be visibly triggered by an interaction [V:1i2L14 rule 15].

### UI-P9. Before / after toggle [SaaS · Bumper]
- Cursor flies in (≈6 f) and parks; clicks a labelled "Without / With" toggle; knob ≈4 f; the "after" bar rises in ≈7 f beside the "before" ghost; a 2.5× punch-in cut delivers the *why* as a tooltip [V:19NRDv t=11.00-14.33s].

### UI-P10. Product carried across a restyle [SaaS · Wix]
- A 12 f AI shimmer across the old design, a hard cut, the new design with the same hero product moved and enlarged; the button colour settles in 6 f [V:15VhHR t=18.73-19.73s].
- Recommendation from its own teardown: pixel-lock the hero object across the cut for a cleaner before/after [V:15VhHR rule 14].

### UI-P11. Collection climax [S · Wix, Bumper]
- All outputs gathered into one object, then folded into the brand: a 3D deck of every generated site (fan ≈11 f, cruise ≈7 f, accelerate ≈21 f into the cut) collapses into the heart in the tagline in 6 f [V:15VhHR t=48.27-49.83s]; payment chips implode into the logo in ≈8 f, followed by a burst of ≤12 sparks over 10 f [V:19NRDv t=55.0-55.6s].

---
## 8.12 UI in 9:16 (vertical cutdowns)

Only one reference is native 9:16 (Chowdeck, measured through a crop of an After Effects comp viewer filmed by a phone; the ad itself is animated on twos, ≈12 poses/s, by design), so most of this is derived from [N] safe zones and Part 02 composition rules.

| Item | Rule | Evidence |
|---|---|---|
| Card width | ≈75% W (810 px); text-bearing rows inside x 120-840 | [V:126cpH t=9.27s] 75% W; [N] strict union text area |
| Vertical band | All UI that carries meaning inside y 270-1210 px | [N] strict union (top 270, bottom 710) |
| Notifications and status pills | ≤63% H (≤1210 px). Chowdeck's pill at ≈70% H sits in the caption overlay zone (computed) | [V:126cpH t=11.20s]; [N] |
| Must-read UI text | Font ≥52 px; absolute floor 36 px | [N]; Chowdeck notification ≈52 px |
| Device frame | Optional; justified for mobile apps (it explains "this is the app") | [S:PointCard]; [S:playbook] (proposal) |
| Cursor | Replace with a tap (finger-sized ripple or press state) for mobile UI; a desktop arrow on a phone UI is a fidelity error [inferred] | [inferred] |
| 16:9 → 9:16 conversion | Re-lay out, do not crop: stack side-by-side panels vertically, cut in on the one value, keep the anchor element in the same relative position across shots | Part 02 §4.7; [V:1Hcg3X] recap strips "re-laid out rather than cropped" |
| Frame rate | UI on ones (every frame). Animate on twos only for illustration layers | [V:126cpH rule 13, inferred: Chowdeck itself runs its UI card on twos too] |

---

## 8.13 Universal, style-specific, experimental, avoid, and especially good for SaaS

### 8.13.1 Universal UI principles (UI-U)

| ID | Principle | n/8 | Rules |
|---|---|---|---|
| UI-U1 | Every state change has a cause, and the state order follows the real product | 7 | UI-B1, UI-B2 |
| UI-U2 | Frameless UI by default; no browser chrome | 7 | UI-E01 |
| UI-U3 | No overshoot, elastic or wobble on UI | 6 | UI-B10 |
| UI-U4 | Two speeds: microinteractions at real UI speed inside a slow camera | 4 | UI-B4 |
| UI-U5 | One primary change at a time; the container is still while content changes | 5 | UI-B3, UI-B5 |
| UI-U6 | Reading-order cascades with a 2-4 f stagger after a short empty hold | 6 | UI-E02, UI-L4, UI-P1 |
| UI-U7 | Anchor one element across every context change | 5 | UI-B6 |
| UI-U8 | Cursor: 18-30 f anticipation, feedback on the target in ≤1 f, consequence in 3-8 f | 6 | UI-C4, UI-C6 |
| UI-U9 | Focus by subtraction (dim, defocus, extract), not by decorating the target | 5 | UI-Z7 |
| UI-U10 | UI morphs out of (or into) another element: a brand mark, a line of type, another UI state | 6 | UI-B8, UI-P3, UI-P6 |
| UI-U11 | Effect colours are transitional states with one meaning each | 4 | UI-H1, UI-H3 |
| UI-U12 | The legibility contract: must-read text is big and held; micro-text is only texture | 8 (all flag it) | UI-L1, UI-L2 |
| UI-U13 | UI is never dead but moves ≤0.2% W/f while it is read | 5 | UI-Z5; Part 04 defaults #3 |
| UI-U14 | Real-looking, consistent data and copy | 5 | UI-B7 |
| UI-U15 | Depth from 2-3 planes plus soft shadow or glass; 3D as a budget | 5 | UI-D1, UI-D12 |
| UI-U16 | Cut-ins over animated zooms for detail | 4 | UI-Z1 |

### 8.13.2 Style-specific UI rules (UI-S)

| Style (Part 02 code) | UI material | Cursor | Motion character | State language | Reference |
|---|---|---|---|---|---|
| **Airy Aurora / Calm-Tech** (AD-S1) | Frosted glass cards (80-85% W) over defocused life plates; real app icons | One glossy 3D cursor, used rarely | Streams at speech pace; empty hold + cascade; slow pushes; no blur, no bounce | Light and colour = "listening"; white bloom transitions | [V:1-6l8S] |
| **Prompt-native minimal** (AD-S2) | Real composer UI, flat white, soft shadows; one 3D studio beat | Native arrow → hand; slow 27 f travel | Text first, UI built around it; real-speed microinteractions; every card drifts | System blue for "on"; one brand icon colour | [V:1CSXtQ] |
| **UI demo in an editorial brand frame** | Real product UI full-bleed or as rounded cards on black / on matching photos | Native arrow ≈2% H, ballistic | Locked anchors, cut-ins, 12 f scrolls, 1-2 f pops | Cyan / iridescent = AI acting; 1 px blue selection | [V:15VhHR] |
| **Night claim / Day proof** (AD-S3) | Flat product art as tilted 3D glass planes with realistic data | Brand 3D cursor, blurred fly-ins, parks beside values | Fly-ins, push-throughs, stepped orbits; motion blur on every move | Mint matched, red fail, teal success, orange accent | [V:19NRDv] |
| **Dark neon asset reel** | Light UI components on black; product animating inside them | None; the camera hops between highlighted targets | Cut into motion; one icon at a time; glow ramps into cuts | Green accent tile + glow = selected / alive | [V:1ccYWJ] |
| **Playful collage + UI** (AD-S8) | Light UI cards with offset backing cards in a flat world | Coloured hand pointer | Tossed entrances with overshoot; pixel-break press; the whole ad (UI included) on twos; its teardown recommends moving UI to ones for SaaS [inferred] | Status text in a fixed pill; map and route | [V:126cpH] |
| **Retro-editorial explainer** (AD-S7) | UI grammar as illustration: gauges, highlight flares, comparison panels | None | Expo-out arrivals, expo-in whips; state snaps | Glow on the cause; ⚠ on the level line | [V:1Hcg3X] |
| **Monochrome brand system** (AD-S6) | Design-tool chrome, typing dots, CTA pill, glass tiles | Stroke-drawn arrow that cues moves and triggers transitions | Oversize-and-settle pops; click-caused swaps | One hue for every accent; polarity flips | [V:1i2L14] |
| **Calm editorial AI (ElevenLabs-like)** (AD-S9) | Floating rounded cards cropped tight, no device frame; orb; waveform | Arrow, moves 18-24 f [E, inferred] | Blur-in reveals, slow pushes, no overshoot [E, inferred] | Shimmer status line; orb states from audio | [E] |

### 8.13.3 Experimental (UI-X): validate before using as a default

| ID | Technique | Source | Risk |
|---|---|---|---|
| UI-X1 | Data transfer as particles made of the source UI's own colours, then a dolly through them | [V:1CSXtQ t=19.00-20.47s] | Reads as generic VFX if the colours are not the UI's |
| UI-X2 | Desaturated "before" plate that blooms to colour when the voice or product starts (22-42 f) | [V:1-6l8S t=18.57-19.33s, 54.0-55.4s] | Must be applied to every matching scene or not at all [V:1-6l8S §13] |
| UI-X3 | Thermal duotone "develop" for AI image generation | [V:15VhHR t=8.63-12.47s] | Can read as a glitch on first viewing [V:15VhHR §Flaws] |
| UI-X4 | White light bloom from the clicked element as the transition | [V:1-6l8S t=36.85-37.15s] | Overuse turns the film into a white-flash slideshow |
| UI-X5 | Locked-anchor "slot machine" montage | [V:15VhHR t=8.63-12.47s] | Needs art-directed backgrounds for every use case |
| UI-X6 | Hop-and-hold tour with an accent glow tile | [V:1ccYWJ t=27.13-33.20s] | Strobing above 5% W/f without blur |
| UI-X7 | Under-glow ramp (area ×8-10 over ≈2 s) released by a hard cut | [V:1ccYWJ t=18.83-21.00s] | Banding in dark gradients at low bitrate |
| UI-X8 | Cursor that rotates to cue the next move | [V:1i2L14 t=5.50-5.87s] | Cute in a design-studio voice; odd on a real OS cursor |
| UI-X9 | 3D extruded UI cards flipping in edge-on | [V:1ccYWJ t=16.10-18.83s] | Tilted labels are unreadable until they flatten |
| UI-X10 | Chapter progress bar as meta UI | [V:1i2L14] | Fine for case-study posts; never as an ad wrapper |
| UI-X11 | Callout rings, spotlight dim, label chips per spoken focus | [S:playbook] (proposal) | Not observed in any reference; rings can look like tutorial software |
| UI-X12 | Toast stacks and "triage" (many badges, all but one shrink away) | [S:playbook] (proposal); TradeLens "noise then one alert" [S:TradeLens] | Not observed; keep overshoot at 0% in premium |
| UI-X13 | Pixel-break button press and tossed cards with overshoot | [V:126cpH t=9.27-10.70s] | Playful styles only |

### 8.13.4 Avoid (UI-A)

| ID | Failure | Seen in | Why it hurts | Fix |
|---|---|---|---|---|
| UI-A1 | Random floating screens: several tilted screens drifting and glowing with no actor | None of the 8 (that is the point); [W:motion-so] "no generic neon technology visuals" | Reads as a stock template; proves nothing | UI-B1, UI-B5, UI-B12 |
| UI-A2 | Micro-text that is supposed to carry meaning | 8/8 | The message is lost on phones | UI-L1; cut in |
| UI-A3 | A meaningful state on screen for less than 1 s | [V:126cpH t=13.53s] (2 f) | Subliminal; the payoff is missed | UI-H7 |
| UI-A4 | Copy changing between a wide shot and its cut-in | [V:15VhHR t=6.57s] | Breaks the "real product" contract | UI-K7 |
| UI-A5 | Greeked or low-res UI in focus | [V:1CSXtQ t=18.4-19.0s] | Exposed exactly where viewers look | UI-R4, UI-Z4 |
| UI-A6 | Planes intersecting | [V:1CSXtQ t=18.4-19.0s] | Layering becomes unreadable | UI-D10 |
| UI-A7 | Fast unblurred pans over UI grids | [V:1ccYWJ t=30.57-32.57s] (22-27% W/f) | Strobing | UI-Z6 |
| UI-A8 | Icon rows with zero stagger; unknown or unlicensed app icons | [V:1-6l8S t=34.50s] | Looks unfinished; legal risk | UI-E16; UI-R3 |
| UI-A9 | Duplicate items in a list | [V:1ccYWJ t=17.9-18.1s] | Signals a template | Data QC |
| UI-A10 | Components cropped by the frame edge by accident | [V:1ccYWJ t=12.17s] | Looks like a framing error | Frame fully or crop ≥30% off-frame |
| UI-A11 | A player or device wrapper around the deliverable | [V:1i2L14] (21% of height) | Wastes resolution | UI-E01 |
| UI-A12 | Overshoot, elastic or bounce on UI chrome in premium styles | Proposals in [S:playbook]; Remotion default spring 16.3% [N] | Toy-like; undermines "precise software" | UI-B10; E-CRIT |
| UI-A13 | UI animated on twos | [V:126cpH] (the whole ad, UI card included, is on twos) | Stepped UI reads as lag [V:126cpH rule 13, inferred] | UI on ones |
| UI-A14 | Readable UI drawn by a video model | [P] [N] | Warped glyphs, changing text, identity drift | UI-R5 |
| UI-A15 | Data marks below 3:1 contrast | [V:19NRDv t=11-14s] | Invisible data | UI-H6 |
| UI-A16 | "AI" effect colours left on resting UI (>15 f) | [V:15VhHR §Avoid] | Reads as a glitch | UI-H3 |
| UI-A17 | Glass over flat colour | Part 04 DP-13 | Grey box, no depth | UI-D3 |
| UI-A18 | Fake progress bars for AI work | [V:15VhHR rule 5] | Dishonest and dull | UI-E17 develop states |
| UI-A19 | Unlabelled abstract feature metaphors | [V:1i2L14 §Flaws] | Meanings become guesswork | 1-2 word label per metaphor |
| UI-A20 | Scrolling, zooming or panning while text must be read | Part 04 defaults #3 | Text unreadable in motion | UI-SC7, UI-Z5 |
| UI-A21 | Mismatched light between a UI window and its world photo | [V:15VhHR t=19.73s] | Composite reads as pasted | UI-D11 |
| UI-A22 | Frame-rate conversion by duplication; bitrate below 8-12 Mb/s for UI at 1080p | [V:15VhHR] [V:1CSXtQ] [V:1Hcg3X] | Judder on scrolls; blocky small text | Render natively; deliver ≥8-12 Mb/s [V:1CSXtQ §16] |

### 8.13.5 Especially good for SaaS (UI-SaaS)

1. **Text → UI build** for AI and prompt products (UI-P2): the viewer reads the promise, then sees it become the product.
2. **Say → see** for voice, AI writing and automation (UI-P1): input at human speed, output at machine speed.
3. **Context → extraction → focus** for data, finance and ops products (UI-P5).
4. **Before / after toggle** for savings and performance claims (UI-P9).
5. **Shared-element morph into a notification** for workflows, delivery and alerts (UI-P6).
6. **Locked-anchor slot machine** for "works for every use case" (UI-P4).
7. **One AI colour** that marks every AI action (UI-E17, UI-H1).
8. **Counter with a parked pointer** for a single proof number (UI-E13).
9. **CTA as a real action** (button press, search pill) instead of a static URL card (UI-E05, UI-E10).
10. **Colour-state narratives** for reliability, security and failover (UI-E14).
11. **Integration particles or chip ring** for connectors (UI-X1, UI-E21).
12. **Real data** in every visible row (UI-B7).

---

## 8.14 Anti-AI-look checklist for UI shots

These are the failures that make UI look machine-made or generated, with the prevention for each.

| Failure | What it looks like | Prevention |
|---|---|---|
| **Morphing UI** | Buttons, cards or icons melting into new shapes between frames | Morphs only between two defined shapes (pill → card, circle → pill) with an explicit start, end and duration (UI-E02, UI-E10). In generated video: composite UI as locked layers (UI-R5) |
| **Warped UI geometry** | Non-parallel edges, wobbling corners, uneven radii | Vector UI; one radius token; any perspective applied as a single plane transform |
| **Changing text** | Letters or numbers mutating; strings differing between shots | Text only from deterministic layers; a string lock per scene (UI-K7); never let a video model render readable text [P] |
| **Identity drift** | Brand colour, icon set, font or cursor shifting across shots | A UI bible: hex values, radius, shadow, font, icon set and cursor defined once and referenced in every shot spec (§8.17) |
| **Random camera motion over UI** | Floating, drifting, rotating views with no target | Every camera move travels *to* something (Part 04); ≤0.2% W/f while reading |
| **Purposeless floating objects** | Cards and panels hovering with no anchor | UI-B12 (anchored, ≤3, one fact each) |
| **Over-animation** | Every element moving at once | UI-B5 (one primary change); stagger ladder |
| **Wrong reflections and light** | Glass rims and shadows that disagree; speculars on a lit side that changes | One key light (UI-D9); rims on the key side only |
| **Broken perspective** | Text on steep planes; planes intersecting | Read at ≤15° tilt (UI-D6); UI-D10 |
| **Fake depth** | Gaussian blur on flat layers with no plane logic | DOF only on planes that are not read, with a defined focal plane (UI-D7) |
| **Excess glow and particles** | Neon on inert UI; sparkles with no source | Glow = active only (UI-D5); particles made of the UI itself (UI-X1) |
| **Unnatural cursor** | Straight constant-speed paths, teleports, jitter | UI-C5, UI-C12 |
| **Impossible states** | UI showing states the product cannot produce, or in the wrong order | UI-B2 state machine first |
| **Placeholder content** | Lorem ipsum, duplicated rows, greeked tables in focus | UI-B7, UI-R4 |

---

## 8.15 Where the references overrule generic advice (UI)

1. **Cursor size.** [E] suggests a 44 px arrow [inferred]. Wix uses the native arrow at ≈2% H (≈22 px @1080p) and its teardown counts "no oversized cursor" as a credibility point [V:15VhHR §UI]. **References win** for real-UI demos; a larger brand cursor stays a style choice (UI-C3).
2. **Click feedback.** [E] (cursor scales to 0.85, 64 px ripple) and [S:playbook] (press 0.92 → 1.0, 0.3 s ripple, proposal) put feedback on the cursor. No reference shows a cursor ripple; all put the response on the target within ≈1 f. **References win** (UI-C6, UI-E05).
3. **Notification spring.** [S:playbook] proposes a spring with ≤4% overshoot. 6/8 references use no UI overshoot. **References win**: 0% in premium styles, ≤3% only in playful ones (UI-E09).
4. **Device frames.** [S:playbook] lists device frames as a top engine gap and PointCard/Airbnb use phone mock-ups [S]. 0/8 references show browser chrome and 7/8 are frameless. **References win**: frameless by default; frames only for mobile apps or device-as-product (UI-E01).
5. **Animated zoom-to-callout.** [S:playbook] proposes an ≈0.6 s camera ease per spoken focus. The references default to cut-ins and reserve animated pushes for 1-2 meaningful moments [V:15VhHR rule 13]. **References win** (UI-Z1).
6. **Spotlight and rings.** [S:playbook] proposes a 30-40% spotlight dim with ring strokes. The references focus by dimming to 15-50%, defocusing, extracting, selection boxes and glow tiles; no rings appear. **References win** on the mechanism; rings stay experimental (UI-X11).
7. **Microinteraction speed.** [N] converts UI tokens to "video speed" (400-600 ms for entrances). The references agree for cards and camera (12 f), but keep toggles, swaps and menus at real UI speed (33-200 ms). **References win** for microinteractions (UI-B4).
8. **Typing speed.** [E] infers 2 characters per frame (60 chars/s). No reference types a whole readable prompt that fast; they run 15-20 chars/s, slow to 4-9 on key words, and burst to 30-50 only on filler [V:1CSXtQ t=15.0-16.0s]. **References win** (UI-K1).
9. **Screen recordings.** [S:Figma] praises a recap that is 71% screen capture. 0/8 references use raw capture; they rebuild real UI as layers. **References win** for launch films; raw capture stays acceptable for how-tos and designer audiences (UI-R1).
10. **"No fake UI."** [W:motion-so] bans fake UI, while [W:raivcoo] shows the genre is built on "animated UI recreations". The references reconcile them: simplified rebuilds of real states are fine (T3); invented screens and features are not (UI-R2).
11. **Card entrance length.** [E] infers a 20 f entrance with scale 0.96 → 1. The references cluster at 6-12 f (rise 5-8% H). **References win**: 12 f default (UI-E02).

---

## 8.16 Do / Don't pairs

| Do | Don't | Why |
|---|---|---|
| Type the query on screen at 15-20 chars/s, slowing to 7-9 on the key phrase | Paste the full query in one frame, or type it at 60 chars/s | The viewer must read the user's intent [V:15VhHR] [V:1CSXtQ] |
| Let the cursor glide 15-20 f, hover, dwell, then press | Teleport the cursor onto the button and click instantly | Anticipation makes the click land [V:126cpH] |
| Show the state change on the button the same frame it is pressed | Put a ripple on the cursor and leave the button unchanged | Feedback proves the product responded |
| Hold the empty result card 8-9 f, then cascade in reading order | Pop the finished result in one frame | The hold reads as "the AI is thinking" [V:1-6l8S] |
| Cut in 2-3.5× to make a value readable | Slowly zoom a full screenshot for 2 s | Cuts are crisp and free [V:15VhHR rule 13] |
| Dim the context to 15-50% to point at one element | Make the target glow, pulse and shake | Subtraction reads as premium; decoration as noise |
| Keep the notification pill fixed while its status text cycles | Slide a new notification in for every status | One container, many states [V:126cpH] |
| Settle every UI move critically damped | Spring cards and toggles with bounce | Real software does not wobble |
| Keep one AI colour and settle it within 6-8 f | Leave gradient "AI" colour on the finished UI | Effect colours are transitional [V:15VhHR] |
| Rebuild the real product screens as layers | Generate UI with a video model | Generated UI warps and its text mutates [P] |
| Fill tables with plausible, approved data | Use lorem ipsum or repeat the same row | Buyers read UI fluently |
| Show the UI frameless, as a rounded card | Put every shot inside a browser or laptop frame | Chrome spends pixels on nothing [V:15VhHR] |
| Keep must-read UI text at cap ≥3% H | Rely on 1-2% H labels to tell the story | 8/8 references fail here |
| Anchor the prompt bar while worlds swap behind it | Cut between unrelated screens every 0.5 s with no anchor | The anchor keeps fast cutting readable [V:15VhHR] |
| Park the cursor beside the final number | Leave the cursor wandering over the number | A parked pointer is an emphasis arrow [V:19NRDv] |

---

## 8.17 Writing UI shots for compositors, Remotion and AI-video systems

**Principle.** A UI shot is two deliverables: a **deterministic UI layer spec** (built in Remotion, After Effects or exported from Figma) and, if needed, a **plate prompt** for a video model that contains no readable UI. Never write "make the UI look cinematic / sleek / premium". Write the numbers that create the effect: plane count, blur radius, shadow values, ease token, frame timings, cursor path and the state timeline.

### 8.17.1 UI shot spec template

```
SHOT <n> · <name> · <aspect> <W×H> · <fps> · <duration f>
UI SOURCE   : <tier T1-T4>; <file / component names, version>; vector or ≥ <zoom × width> px
UI BIBLE    : bg <hex>; surface <hex>; text <hex>; accent <hex>; AI colour <hex>; radius <px>;
              shadow <y/blur/opacity>; font <family, weights>; icon set <name>; cursor <type, px>
LAYOUT      : <element: x, y, w, h in px>  (text rows inside safe area <box>)
DEPTH STACK : plate <desc, blur px> / UI <desc> / accent <desc>; key light <direction>
STATE TIMELINE (frames):
  f<a>-f<b>  <element> <state A → state B>  ease <token>  cause <actor>
CURSOR PATH : f<a> enter <edge> → f<b> <target> (ease E-GLIDE) · dwell f<b>-f<c> · press f<c>
              · feedback f<c> · consequence f<d>
CAMERA      : <locked | breathe +x% linear | cut-in ×n at f | pull-back ×n f<a>-f<b> E-INOUT>
MUST-READ   : "<string>" cap <px>, landed by f<x>, held to f<y> (≥ read time)
MUST STAY UNCHANGED : <strings, values, positions, colours, radius, icon set, cursor>
SOUND       : click f<c>; whoosh peak f<…>; keystrokes −20 dB under music
NEGATIVES   : no overshoot on UI; no motion blur below 5% W/f; no text from the video model;
              no plane intersections; no glow on inert UI
```

### 8.17.2 Example A: prompt typing and send (prompt-native minimal, 16:9)

```
SHOT 4 · Query + send · 16:9 1920×1080 · 30 fps · 143 f (4.77 s)
UI SOURCE   : T2 rebuild of the product composer; vector
UI BIBLE    : bg #FFFFFF; surface #FFFFFF; text #1A1A1A; accent #F65542 (source icon only);
              system blue #3585E4; radius 28 px; shadow y24 / blur48 / black 7% + 1 px hairline 6%;
              Inter 400; native arrow cursor 22 px
LAYOUT      : composer x 160 → beyond the right edge, y 470-610; type cap 45 px (4.2% H)
DEPTH STACK : flat canvas / composer card; no plate
STATE TIMELINE:
  f0-f6     composer slides in from y+81 px, opacity 0→1           E-OUT    cause: cut
  f8-f30    "Segm…" types at ≈4 chars/s, accelerating               E-LINEAR cause: user typing
  f30-f104  rest of the query; a 30-50 chars/s burst around f59-f89, slowing on the last word;
            caret blink 9 f on / 9 f off
  f17-f128  camera trucks left ≈820 px so the newest characters stay in frame;
            E-INOUT, peak ≈22-34 px/f around f68-f80
  f137-f142 content rises 4.5, 4.5, 7.5, 10.5 px/f                  E-EXIT   cause: send
  f143      cut; next shot opens with the sent bubble rising 51, 51, 47, 11, 6 px/f (E-OUT)
MUST-READ   : "annual revenue, industry, and tech stack": read along while typing, complete by f104,
              held ≥1.0 s after the last character
MUST STAY UNCHANGED : query string; chip labels "Research", "Sources"; source icon colour
SOUND       : keystrokes ≈−22 dB under the music; soft send whoosh peaking on f143
NEGATIVES   : no ripple; no bounce; no blur on the truck; no text generated by a video model
```
Built from [V:1CSXtQ t=13.03-17.90s]; pixel values scaled from 720p (computed).

### 8.17.3 Example B: glass voice card over a generated plate (Calm-Tech, 16:9)

Plate prompt for the video model (Veo-style, one camera move, no readable text) [P]:
> "Locked-off medium-wide shot of a sunlit wooden desk by a window, plants and a mug, warm morning light from the upper right, very shallow depth of field so the whole scene is softly out of focus, gentle natural movement of leaves only, no people, large clean empty area across the top two thirds of the frame. 8 seconds."
> Negative: "text, letters, captions, subtitles, user interface, screen, watermark, logo".

Compositing spec:
```
SHOT 7 · Voice dictation · 16:9 1920×1080 · 30 fps (conform the 24 fps plate by optical flow,
         never by frame duplication) · 150 f
PLATE       : generated desk plate, extra gaussian blur 60 px; grade starts at 0% saturation
DEPTH STACK : plate / glass prompt card 1600×330 px at y 150 / waveform pill 900×110 px at y 700
GLASS       : backdrop blur 50 px; white fill 15%; 1 px rim white 40% (top-right) → 15%; inner glow 8%;
              radius 40 px; text #FFFFFF 43 px, leading 1.6
STATE TIMELINE:
  f0-f8     card + waveform fade in                           E-OUT
  f6-f28    plate saturation 0 → 100% (colour blooms as the voice starts)   E-LINEAR
  f10-f62   words stream with the VO: each word 35% → 100% opacity in 3-4 f
  f50-f55   mis-heard name: peach selection box in 4 f, replaced by the correct spelling
  waveform  bars re-randomise every frame, height driven by VO loudness
CAMERA      : breathe +6% linear across the shot
MUST STAY UNCHANGED : contact name, card radius, rim side, waveform colour
```
Built from [V:1-6l8S t=18.37-22.87s] (card ≈83% W, waveform pill at ≈70% H, 8 f fade, 22 f colour bloom, 3-4 f word ghosting and the 4-5 f correction are measured). Glass values, plate blur, card heights and the +6% breathe are [inferred] (UI-D3).

### 8.17.4 Example C: KPI value, then the dashboard (lit 3D planes, 16:9)

```
SHOT 12 · Reconciled 100% · 16:9 1920×1080 · 30 fps · 84 f
STATE TIMELINE:
  f0        rate card above the transactions table; table micro-text is texture
  f2-f33    counter 84 → 100%: 84→95 by f10, 95→100 by f33     E-SNAP-L
  f11-f23   brand cursor rises from the bottom edge, parks ≈40 px right of "%"   E-OUT [blur on f11-f13 and the 40 px gap inferred]
  f24-f40   pale accent row highlight sweeps the table left to right   E-LINEAR [timing inferred]
  f33-f53   hold on "100%" (cap 65 px)
  f53       clean hard cut to the next claim card (no dip to black)
CAMERA      : slow push ≈+4% linear [inferred amount]; DOF on the table edges only
```
Built from [V:19NRDv t=23.85-25.60s], with its 1-frame dip-to-black flaw removed.

### 8.17.5 Example D: order card → notification (9:16)

```
SHOT 5 · Order → tracking · 9:16 1080×1920 · 30 fps · 120 f
LAYOUT      : order card 810×845 px centred at y 900; text rows inside x 120-840
STATE TIMELINE:
  f0-f8     cursor (or finger tap) approaches "Order now"      E-OUT
  f8-f18    dwell
  f18       press: button fill + card jolt 2° (playful) or 1 f pressed colour (premium)
  f28-f35   card collapses bottom-anchored into a status pill 680×110 px at y 1150; width −18%
  f30-f41   background racks from 40 px blur to sharp map       E-OUT
  f45-f75   status 1 "Preparing your order" held 1.0 s
  f75-f82   swap: fade-out 2 f, blank 2 f, fade-in 2 f → "Rider on the way"
  f50-f110  route trim-path draws leg by leg, reaching the pin at f110
MUST-READ   : status text 52 px; every status held ≥30 f
SAFE AREA   : pill inside y 270-1210
```
Built from [V:126cpH t=9.93-13.60s], with its two flaws fixed (status holds and the pill position). Measured: 8 f approach, 10 f dwell, ≈7 f collapse with −18% width, 11 f rack focus, 5-7 f status swap, ≈1.7 s route. The pill size, the 40 px start blur and the move from on-twos to on-ones are [inferred].

---

## 8.18 UI QC gate (step through every UI shot frame by frame)

| # | Check | Pass criterion |
|---|---|---|
| 1 | Cause | Every state change has an actor visible within the previous 30 f (UI-B1) |
| 2 | Order | The state sequence matches the product's real flow (UI-B2) |
| 3 | Strings | Every string identical in every shot of the scene; no lorem, no duplicates (UI-B7, UI-K7) |
| 4 | Must-read size | Cap ≥3% H (16:9) / font ≥52 px (9:16) for every must-read string (UI-L1) |
| 5 | Must-read hold | Landed and still for ≥ the read time; statuses ≥1.0 s (UI-L2, UI-H7) |
| 6 | One primary motion | No frame has two primary UI motions (UI-B5) |
| 7 | Overshoot | 0% on UI chrome, type and data in premium styles (UI-B10) |
| 8 | Cursor | Anticipation 18-30 f; target state change ≤1 f after the press; consequence 3-8 f; no teleports (UI-C4-C6) |
| 9 | Speeds | Microinteractions 1-6 f; cards ≈12 f; nothing faster than 5% W/f unblurred (UI-B4, UI-Z6) |
| 10 | Effect colours | AI colours settle within 6-8 f; nothing held >15 f (UI-H3) |
| 11 | Depth | ≤3 planes (4 in a hero beat); no intersections; one key light; glass only over a textured plate (UI-D) |
| 12 | Sharpness | Text sharp at the maximum zoom; source resolution ≥ zoom × delivery (UI-Z4) |
| 13 | Contrast | Text ≥4.5:1; data marks and state colours ≥3:1 (UI-H6) |
| 14 | Safe area | 16:9: 96 px left/right, 54 px top/bottom. 9:16: meaning inside x 120-840, y 270-1210 [N] |
| 15 | Crops | No accidental crops; deliberate crops ≥30% off-frame (UI-A10) |
| 16 | Generated pixels | No readable UI or text produced by a video model (UI-R5) |
| 17 | Sound | Click on the press frame; keystrokes under the music; whoosh peaks on the cut or at peak velocity |
| 18 | Delivery | Native frame rate (no duplicated frames); ≥8-12 Mb/s at 1080p for UI-heavy films |

---

## Appendix A. Evidence strength and gaps (read before relying on a number)

**Strong (several references, frame-measured)**
- Frameless UI, no UI overshoot, causality, reading-order cascades, stagger ladder, cursor anticipation and feedback timing, cut-ins over animated zooms, micro-text as the universal failure.

**Medium (one or two references, frame-measured)**
- Dropdown (6 f, rows 2 f) and toggle (3 f) timings: HubSpot only, plus Bumper's ≈4 f toggle.
- Page-scroll physics (≈1 FH in 12 f with blur): Wix only.
- Status cycling and the notification morph: Chowdeck only, measured through a crop of an After Effects comp viewer filmed by a phone. The ad is animated on twos (≈12 poses/s, authored), so each of its timings carries ±1 pose (≈2-3 f).
- Counter and dashboard sequences: Bumper only.
- Glass card spec: kivi only, qualitatively (no blur radius or opacity was measured).
- Hop-and-hold tour and glow-tile highlights: Lottieicon only.

**Weak (text-only, proposals or inferred)**
- **Device and browser frames:** observed in 0/8; every frame spec here comes from [S:playbook] proposals or inference.
- **Tooltips:** one example (Bumper). **Forms and modals:** two brief examples (Wix modal, NOSTRA sheet); form-fill timing is inferred.
- **System push notifications and toast stacks:** not observed; specs are [S:playbook] proposals.
- **Search results, filters, settings screens, onboarding flows, empty-state illustrations:** not observed.
- **Cursor size for brand cursors, cursor path curvature, hover-to-press gaps:** not measured beyond a few frames; values are partly inferred.
- **Shadow and glass numbers:** taken from [E] and Part 02 defaults; the references show the look but were not measured for blur radius or opacity.
- **UI sound:** clicks are inferred from onset alignment in three films; no reference's SFX layer could be isolated.
- **9:16 UI:** one reference, low frame-rate capture; most vertical rules are derived from [N] safe zones.
- **Dark-mode UI:** two references (Bumper, Lottieicon); light-mode rules are better supported.
- **Raw screen recordings:** none of the 8 references uses one, so tier T1 guidance rests on [S] text sources only.

**What to measure next** (to upgrade weak rules): two or three real-UI launch films with visible device frames, notifications and settings flows; one native 9:16 SaaS ad at full frame rate; one film with an isolated SFX stem for UI sounds.

---

## Audit (adversarial pass, 2026-10-08)

Every numeric claim in §0.5-§8.18 was spot-checked against the eight per-video teardowns (shot tables, frame studies, UI sections, rules and verification passes) and the text sources ([E], [N], [P], [S:playbook], [S], [W]). Most timings match their cited source. The changes below correct, re-tag or add.

**Corrections (contradicted or misread evidence)**
1. §0.5 census point 3: the "one UI overshoot" was Chowdeck's only. Solar's device-in-context phone also overshoots (+5°, looped) [V:1Hcg3X t=14.50-15.17s]. Reworded.
2. §0.5 census, Chowdeck row: added that the whole ad, UI card included, is animated on twos (≈12 poses/s), so its timings carry ±1 pose.
3. §8.13.2 (Playful collage row) said "illustration on twos, UI on ones". The teardown shows the UI is on twos too; "UI on ones" is only its [inferred] recommendation. Fixed. UI-A13 "Seen in" and the §8.12 frame-rate row now say this.
4. §8.12 and Appendix A described Chowdeck as "an ≈12 fps After Effects preview". The teardown says the on-twos cadence is authored, not a preview drop. Fixed.
5. UI-K1 and §8.15 #8 said no reference types a readable prompt faster than 35 chars/s. HubSpot's macro prompt has a 30-50 chars/s filler burst [V:1CSXtQ t=15.0-16.0s] (and the part's own Example A uses it). Filler row widened to "25-35 (bursts to 50)" and both statements reworded.
6. UI-C5 "Deliberate" travel was tagged E-GLIDE (fast attack, long tail). Both sources measure a slow-start, faster-middle, decelerating ease-in-out. Changed to E-INOUT. Defaults card #10 updated to match.
7. UI-C8 said the cursor enters from the bottom or bottom-right in 5/6. Bumper's first entry is from the right, and NOSTRA's tap cursor drops from the top once [V:1i2L14 t=31.9s]. Reworded, with timestamps per film.
8. UI-P7 listed a ≈2.3× zoom plus four hops (32 → 32 → 22 → 17 f). The teardown has four moves in total, and the zoom is move 1. Fixed to zoom (32 f) + hops 32 → 22 → 17 f, holds ≈8 → 20 → 20 → 7 f.
9. UI-B4: kivi's hover and click bloom were said to sit "inside a 0.85 s truck". They come after the truck. Fixed.
10. Census (NOSTRA) and UI-D3: "lighter top-right rim" became "lighter rim". The source does not record a side.
11. Census (Bumper): "below 3:1 contrast" was stated as measured. The teardown only flags low contrast and asks for ≥3:1. Reworded.
12. UI-E17 Thinking state: the timestamp moved to the measured fade window [V:15VhHR t=4.93-5.4s].
13. UI-SC2: "rises 5-8 f, t=21.35-21.63s" became the measured ≈5 f, t=21.35-21.52s.
14. UI-E10: "rack focus over ≈1.3 s" was not in the source. Replaced with the measured entry window, and the duration is marked as not measured.
15. Defaults #19: the unsourced "0-45° in transit" range was replaced with the sourced ≈35° Y / 20° X fly-in (angles inferred in the source) and the 90° edge-on flip.
16. UI-E02 unfold: "3 → 40 px" was in zoom-sheet tile units, not px. Relabelled.

**Re-tagged (teardown recommendations or unmeasured values that were presented as measurements)**
17. UI-D5 under-glow falloff ≈10% H and UI-D4 extrusion 6-8%: these are Lottieicon's rules 8 and 9, not measurements.
18. UI-K6 keystroke level 20-25 dB under the music: HubSpot's rule 14; its verification lists keystroke levels as not measured.
19. UI-R5 negative-prompt list: [P] gives "text, subtitles, captions, letters, watermark, logo". "user interface, screen" is now marked [inferred].
20. Example B (glass card), Example C (cursor blur and 40 px gap) and Example D (pill size, start blur): measured and inferred values are now separated.
21. Defaults #14: the source of the 3% H floor is now named (Solar's teardown floor), with [N]'s 84 px phone-inline figure.
22. UI-E07 and UI-E08 "Mistakes" bullets: the uncited limits are now tagged [inferred].

**Added coverage**
23. §8.3.0 quick matrix: one row for each of the 22 elements, covering when to use it, why, how fast, and what premium vs amateur looks like. This closes the "when/why/how-fast/premium-vs-amateur" gap for cards that had no Mistakes line (notifications, AI states, maps, loading).

**Checked and left unchanged** (matched the source): the HubSpot dropdown, toggle, typing, send hand-off and pull-back numbers; the Wix cursor deltas, slot-machine holds, BASELINE build, cut-in 3.4×, scroll, modal and AI-colour timings; the kivi streaming, empty hold, cascade, table wave and hover/bloom; the Bumper toggle, counter, tooltip, tables, failover and QR; the Chowdeck cursor grammar, morph, status swaps, route and audio dip; the Lottieicon counters, toolbar, panel, flips, search CTA and dim; the NOSTRA CTA press and release, typing dots, cursor cue and form; the Solar gauge and flare; every [N], [E], [S:playbook] and [W] value and quotation cited.

**Known gaps that remain** (evidence does not exist in the corpus; a re-audit cannot fix them)
- Device and browser frames, system push notifications, toast stacks, search results, settings and onboarding flows, form fill, callout rings and KPI tile grids: observed in 0/8. Their specs are [S:playbook] proposals or [inferred].
- Glass and shadow numbers (blur radius, fill and rim opacity, shadow offset) were never measured in any reference. They come from [E] and inference.
- Brand-cursor size, path curvature and the mobile tap replacement for the cursor are [inferred].
- UI sound levels: no SFX stem could be isolated. Click timing comes from onset alignment only, and Chowdeck's audio is phone-mic room capture.
- 9:16 rests on one reference whose UI is on twos and measured through a ≈256×470 px crop.
- Some single-reference patterns (dropdown, page scroll, notification morph, hop-and-hold) are frame-measured but have n = 1. Treat them as defaults to validate, not as universals.
