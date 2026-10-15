# Transition library (CRED v6.4 and v6.5)

Each entry says when to use it, how it is built, and how it failed before it worked.

| Transition | Use when | How it is built | Watch for |
|---|---|---|---|
| **World becomes the object** | A world must turn into the product (garden → card print) | Render the world inside the product's face, then animate the face's transform: scale 1 → 0.45, `rotateX` back about 38°, so the world keeps moving inside the print | The world must keep animating inside the print (the fox never stops) |
| **Continuous push to a detail** | Going from the whole object to text on it | One eased transform: scale to about 3×, rotate the detail level, translate its centre to frame centre (`cardPose` in `v6/scenes.tsx`) | Land on a whole phrase. Slow any sliding text to a drift so it reads; never let an edge or prop cut a letter |
| **Strip split-open** | Leaving a close-up of a band or strip for the next world | The next world is clipped to a horizontal band (`inset()` clip) that opens from the strip's centre line to full frame over about 24 frames. Two foil edges ride the band edges. The next world arrives already composed, with a gentle settle (scale 1.16 → 1.04) | Don't use a magnifying glass or another prop: a prop entering a close-up breaks it |
| **Shape match** | Two worlds share a shape (globe ↔ round floor, coin ↔ plate) | Glide the shape to frame centre and scale it to the exact screen size of the matching shape in the next shot. Reveal the next shot inside that circle over about 8 frames, then open the circle out while the next camera is already moving | No full-frame dissolve: it reads as muddy double exposure. Keep both shots moving across the match |
| **Iris from a point** | Entering a quiet world (underwater, night) | `clipPath: circle()` grows from a point near the subject | Start the world's motion before the iris opens |
| **Dive into the material** | Leaving a world through its hero material (shell iridescence → card foil) | Scale toward the material, accelerating (`1 + 9 t^2.4`), while a foil flood fades up. The next shot fades the same flood out on top of itself | The flood must keep shimmering. A gradient pushed past its stops turns into one flat colour and freezes; oscillate the phase instead |
| **Drop into a device** | Product → app mockup | The object tilts back (up to 55° at mid-drop), shrinks to the UI slot's width and lands in it; the device rises from below at the same time | Start the drop while the object is still turning, so the hand-over never stops |
| **Push into the screen** | Mockup → logo lockup | The screen dims, then the camera scale accelerates into it (`1 + 9 t^2`). The lockup sequence starts about 6 frames early on top | Without the overlap you get 3–4 identical black frames |
| **Scale-step cut** | Inside a world, on a beat | A hard cut to a tighter or looser framing of the same scene; the camera keeps drifting on both sides | Put it exactly on a beat of the cue sheet |

## Added in v6.5: the reference's own grammar

The reference film never dissolves. Every change is a hard cut on the beat, or something optical (the lens) or
physical (a creature) passing across the frame. v6.5 dropped its mosaic, foil flood and strip split for these.

| Transition | Use when | How it is built | Watch for |
|---|---|---|---|
| **Persistent loupe + hard cut** | Several close-ups in a row (card → print macro) | A soft dark radial mask fades in once and stays; inside it, hard cut on the beat to the next framing (`z = F >= T.macro ? 1 : 0`) | Never fade the lens out before the cut: users saw it as a blink |
| **Iris open** | Into a new world from the lens | `Iris` in `v6/kit.tsx`; radius from `irisOpen(f, a, b)` = r0 + (2300 − r0)(0.5 − 0.5 cos πt), starting the frame after the cut | Start it on the cut, sine-eased. A hold then a snap read as a lurch in `jerk_qa` |
| **Iris close** | Leaving a world on its hero (the shell's shimmer) | The same mask, radius 2300 → 520 over the last 16 frames, then hard cut; the next shot opens its own iris | Keep the subject moving inside the closing circle |
| **Lens-edge sweep** | A cut inside one world (temple wide → frontal) | `LensSweep`: a soft black disc passes left to right; the cut happens behind its darkest point | It must cover the whole frame at the cut frame |
| **Creature wipe** | Hiding a cut or crossing the words | A fish (or bird) very close to camera, fast (`{x0: -3.4, v: 14, z: 4.2, s: 2.4}`), crosses the frame | Close and fast, or it reads as a prop, not a wipe |
| **Crane on the cut** | Globe → floor | The crane starts on the cut frame, `1 − (1 − t)^2` over 44 frames, while the iris opens | No hold before it starts |
| **Pull-back from a field** | The opening | Pen strokes drawn one by one, then the camera scale eases out (1.4 → 1.04) as the field closes into a disc | Thin, parallel S-waves; thick crossing strokes read as scribble |

Removed in v6.5, and why: the pixel mosaic and the foil flood (the reference has neither; they read as a
template effect), the strip split-open (it needed a cut the beat didn't give), cross-dissolves anywhere.
