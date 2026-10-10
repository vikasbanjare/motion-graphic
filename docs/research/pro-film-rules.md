# Pro-level film rules: motion and sound (2026-10-10)

**Why this exists.** The first Sarvam ads (v1–v3) looked "basic", and the user said so. Measured against Sarvam's own product films (Saaras V4, Voice agents, Content Studio), v3 was not empty, it was **frozen**:

| | Sarvam refs | v3 |
|---|---|---|
| Still frames | 27–56% | 84.5% |
| Median motion | 0.0014–0.0065 | 0.0003 |
| Sound hits above the music bed | +2…+6 dB | (v1) +8 dB: SFX stuck out |

These rules close that gap. **`tools/film_qa.py` checks the measurable ones on every finished film.**

**Sources:**
- Sarvam's films, measured with `film_qa.py` and read frame by frame.
- A motion-design playbook: Material motion, Apple WWDC23 springs, Remotion docs, practitioner write-ups.
- A sound rulebook: EBU R128 s1, Spotify/YouTube loudness, ITU-R BT.1359 sync, ducking and edge-fade practice.

Tags: [C] Certain, [L] Likely, [G] Guessing. Full source lists are in the two research reports summarised here.

## A. Motion: what makes it pro

### 1. One continuous flow (no slides)

- **No empty frames and no frozen holds.** Something always drifts, breathes or morphs.
  - Holds get micro-motion: scale 1.00→1.02 over the hold, 4–10 px drift, glow opacity ±3% on a 3–5 s sine [L].
  - Sarvam refs keep their longest fully-still run at 2.5–7 s, with ~40% still frames.
- **Scenes overlap by 6–12 frames at 30 fps.** The next one starts entering before the last has left [C: Remotion `TransitionSeries` works this way].
- **A continuous camera.** Run a slow push (2–4% scale) or a 20–60 px pan across 2–3 scenes, so changes happen inside a move [L].
- **A morphing anchor.** One element carries the eye through every scene.
  - Sarvam's Saaras film: a small gem changes shape and colour continuously under "Down to every".
  - Ours: a gem that becomes the orb, then the end card [observed].
- **Transition recipes** (30 fps):

| Recipe | How to build it | Frames |
|---|---|---|
| Container transform / shared element | Interpolate the element's rect from A to B with expo-out. Cross-fade the contents between 30% and 60% of progress. Scene B's other items stagger in once the container is ~70% there | 18–24 |
| Zoom-through | Scale the focal element 1→~40 with expo-in. The new scene appears inside it, scaling 0.6→1 with expo-out | 14–20 |
| Shape mask wipe | `clip-path: circle(r at x y)` with radius on a spring (damping ~200). The outgoing scene keeps drifting underneath | 15–20 |
| Soft feathered wipe (Sarvam) | A gradient panel slides across with a blurred edge (mask-image linear-gradient) while the old scene is still visible | 14–20 |
| Whip | Both scenes move ~1.2× the frame width. Quint in-out, cut at peak speed, with motion blur | 8–12 |
| Match cut | Scene 1's end shape equals scene 2's start shape, at the same place and size, and keeps moving | 0 |
| Text-to-UI | A headline word shrinks into its slot in the UI, and the UI builds around it | 18–24 |

- **Vary the transitions.** All fades, or all slides, reads as amateur [L].

### 2. Easing, springs, timing

- **Entrance / settle:** `cubic-bezier(0.16,1,0.3,1)` (expo-out) [C].
  - Material emphasized: enter `(0.05,0.7,0.1,1)` [C], exit `(0.3,0,0.8,0.15)` [L].
- **Springs:**
  - Calm premium settle: stiffness 158, damping 25 (Apple 0.5 s, bounce 0).
  - Slight life: damping 21.
  - **Never Remotion's default `{stiffness 100, damping 10}` on a premium film**; it reads as bouncy [C/L].
- **Durations at 30 fps** [L]:
  - micro UI change: 6–9 frames;
  - element entrance: 15–24;
  - large card move: 20–30;
  - camera move: 30–90.
- **Exits** are ~60–70% of the entrance length, eased in [L].
- **Stagger** [L]:
  - words: 2–4 frames;
  - characters: 1–2;
  - list items: 3–6.
- **Overshoot** only on objects (icons, gems, buttons), ≤ 2–5% [L].
  - Never on text baselines.
  - Scale entrances start at 0.85–0.95, never 0 [L].
- **Settle:** the last 30–40% of a move covers less than 5% of the distance (that's the expo-out tail) [L].

### 3. Depth and polish

- **Parallax:** 3 layers at 1.0 / 0.6 / 0.3× the camera move, with background blur 0 / 4 / 12 px [L].
- **Depth-of-field rack:** blur non-focal elements 6–16 px when the focal element lands [L].
- **Soft stacked shadows on white:** `0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.06), 0 24px 64px rgba(0,0,0,.06)`. Never hard shadows [L].
- **Glow (Sarvam):** a large radial gradient in the brand hue at 8–20% opacity, drifting 20–40 px [G, from their films].
- **Grain:** 0.05–0.15 opacity, which also kills gradient banding [L].
- **Light sweep:** once per hero moment, across a card or gem, over 20–30 frames [L].
- **3D tilt on card entrances:** perspective 1200–2000 px, rotateX 8–20°→0, then idle rotateY ±2–4° [L].
- **Motion blur** on any move over ~40 px per frame [L].

### 4. Type in motion

- **Sarvam / Apple word reveal:** opacity 0→1, y 12–24 px→0, blur 8–12→0, expo-out over 15–20 frames, 3-frame stagger [L; matches Sarvam's films].
- **Soft-mask reveal** for titles: letters uncover left to right behind a feathered edge [observed in Saaras V4].
- **Sarvam's two-tone and graded lines:** "Every word / Captured" and "Built for / every version / of Speech", with lines stepping from ink to lavender-grey [observed].
- **Hold text** ≥ 0.4–0.5 s per word after the reveal completes. Only **one moving text block at a time** [L].
- **Type scale:** headline cap height 6–10% of frame height, with roughly 3 type sizes at ≥ 1:2:4. Sarvam's product films sit at the small end: very light weight, lots of white [observed].

### 5. Composition

- One focal point per frame; everything else dimmed (40–60%) or blurred [L].
- **3–5 elements** on screen, and at most **2 animating** at once [L].
- **40–60% negative space** and ~8% safe margins [L].
- Centred for hero type, logos and gems; an off-centre thirds layout for UI next to copy [L].
- A shared grid, so consecutive scenes have shared coordinates (which is what match cuts need) [L].

### 6. Product UI

- **Show it simplified:** real layout, fake data, 60–70% of the real elements, enlarged type [L].
- **Frame the whole UI, then push in** 1.5–2.5× on the active region over 20–30 frames, dimming the rest to ~50% [L].
- **Cursor:**
  - curved paths over 15–25 frames;
  - decelerate and hover 4–6 frames before clicking;
  - press to scale 0.9 over 3 frames, with a ring;
  - the UI reacts 2 frames later [L].
- **Typing:** 1–2 characters per frame, with jitter and a caret [L].
- **Sequence:** goal → UI with one focal area → action → output → benefit → CTA.

### 7. Basic-vs-pro tells (lint list)

- **Easing:**
  - linear easing;
  - default CSS ease everywhere;
  - the default bouncy spring.
- **Entrances:**
  - opacity-only entrances;
  - identical durations everywhere;
  - more than 2 things starting on the same frame;
  - scale animations from 0;
  - blur or opacity not clamped to an exact 0 or 1.
- **Holds and scene changes:**
  - static holds over 12 frames;
  - empty frames between scenes;
  - scenes that don't overlap;
  - every transition the same type;
  - no camera or ambient drift layer.
- **Exits:** as slow as entrances, or eased out.
- **Text:**
  - overshoot on text;
  - text held under 0.4 s per word;
  - more than one text block moving at once.
- **Layout:**
  - more than ~5 elements on screen;
  - everything centred, every scene;
  - no shared coordinates between scenes.
- **Finish:**
  - a flat look with no shadow, glow or grain, or banded gradients;
  - hard shadows;
  - fast moves with no motion blur;
  - decoration competing with the focal point.
- **Product UI:**
  - a straight, constant-speed cursor;
  - a click with no feedback;
  - full-screen UI with no zoom or dimming.

## B. Sound: what makes it pro

### 1. Levels

| Item | Target |
|---|---|
| Final mix | **−14 LUFS integrated, ≤ −1 dBTP**. YouTube's reference is −14 [L]; Meta, TikTok and LinkedIn publish no spec, so use −14 [G]; −1 dBTP for lossy re-encodes [C] |
| VO in the mix | ≈ −16…−18 LUFS short-term (AES TD1008 speech: −18) [L] |
| Music under VO | Ducked **8–12 dB**, attack 30–80 ms, release 250–700 ms [L] |
| Music with no VO | −16…−14 LUFS; it carries the film [G] |
| Transition SFX (whoosh, riser, impact) | Peaks 0 to −3 dB under VO peaks, placed in VO gaps [G] |
| UI micro-sounds (tick, click, pop) | Peaks **10–15 dB under VO**, under 150 ms long [G] |
| Ambience / room tone | 15–20 LU under VO [L/G] |
| Speech clarity | Cut 2–4 dB at 2.5–5 kHz on music/SFX while VO plays; cut the music rather than boost the VO [L] |
| **Sarvam measured** | Sound hits rise only **+2…+6 dB** above the bed (p90 +4…+10). Silence under 1%. A continuous bed |

### 2. Timing

- **Whoosh:** the loudness **peak lands on the transition frame**. It starts when the motion starts accelerating, and its length matches the move [L].
- **Riser:** ends on the cut, followed by an impact or 1–4 frames of silence [L].
- **Impact / pop:** transient on the hit frame, −1/+2 frames. **Never more than 1 frame early** [G].
  - Detectability window: sound >45 ms early or >125 ms late [C, ITU-R BT.1359].
  - Sarvam's measured audio-to-visual lag: median −4.5 to +1 frame.
- **Music head:** a downbeat at frame 0, or a 0.3–1 s fade-in. No VO in the first 0.3–0.5 s after a hard music entry [G].
- **Music tail:** end on the track's own button, or a hit aligned to the logo, then ring out for 1–2 s. Otherwise fade over 1.5–3 s. Never stop dead [G].
- **Every clip edge gets a fade:** ≥ 5 ms, or ≥ 20 ms under 200 Hz [L]. SFX tails ring across cuts and fade over 100–500 ms [G].
- **Cuts on phrase boundaries** (2, 4 or 8 beats); the biggest visual lands on the drop [L].

### 3. Density and space

- **Density:**
  - ≤ 2 foreground SFX per second;
  - ≤ 1 per 500 ms in the same frequency band;
  - ≤ 1 transition SFX per VO phrase, placed in the gaps [G].
- **Layering:** sub (30–60 Hz) + body + air (>1 kHz) [L].
- **High-pass filters** [G]:
  - UI ticks at 300–500 Hz;
  - whooshes at 80–150 Hz under VO.
- **Panning:** follows on-screen motion, within ±60%. VO, sub and impacts stay centred [G/L].
- **A continuous bed of music or room tone.** No digital silence except a deliberate 1–4 frame gap before a hit [L/G].

### 4. Script-checkable mistakes

- **`film_qa.py` checks:**
  - loudness ±1 LU and true peak;
  - silence over 300 ms;
  - hit prominence over +7 dB;
  - a frame-0 slam;
  - a hard stop at the end;
  - edge clicks;
  - frozen frames, the longest still run, and median motion against the references;
  - empty frames.
- **Still to add** (needs separate stems):
  - SFX louder than VO;
  - music not ducked by 8 LU under VO;
  - duck pumping (faster than 6 dB per 20 ms);
  - masking at 2.5–5 kHz;
  - density over 2 SFX in any 1 s;
  - sync outside −45/+125 ms of the tagged visual event.
