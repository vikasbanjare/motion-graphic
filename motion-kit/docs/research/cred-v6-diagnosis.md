# Why CRED v5 did not look like the reference, and what v6 changes

Measured on the reference film and our renders with the same script (frames at 2 fps, 480x270; cuts at 24 fps).

| | Reference | v5 | v2D |
| --- | --- | --- | --- |
| empty background (share of frame) | 30% | 70% | 35% |
| vivid colour (saturation > 0.45) | 11% | 0.6% | 14% |
| fine detail (edge density) | 0.115 | 0.064 | 0.076 |
| contrast (luma std) | 42 | 28 | 45 |
| motion per frame (median) | 2.4 | 0.9 | 1.9 |
| hard cuts per 10 s | 2.8 | 0.7 | 1.0 |

## Root causes

1. Wrong medium. The reference is intaglio line engraving (wavy line screen, width carries tone) in duotones; v3/v5
   moved to watercolour washes.
2. No detailed subject under the engraving. The richness comes from the source (feathers, petals, coral); code-built
   boxes and cylinders give the screen nothing to describe.
3. Literal objects instead of metaphors (parcels for shopping, a suitcase for travel).
4. Missing finish: holographic foil on one hero per scene, loupe vignette, three depth layers, perspective tilt.
5. Type: the reference sets a big serif headline top-centre with gradient ink and a small sans subline.
6. Pacing: about a third of the reference's motion and a quarter of its cuts.
7. Process: stills were reviewed alone, never side by side with the reference against these numbers.

## v6

- Subjects are licensed 3D models (Khronos glTF samples, CC0 / CC-BY, see public/custom/cred-v6/models/CREDITS.md)
  through the engraving shader, which now supports skinned (animated) meshes and models without normals.
- One metaphor per claim: a fox walking through a flowering hedge (rewards), the world printed on the card under a loupe,
  a lantern and globe at dusk (travel), a colonnade still life (store), an abalone opening in the deep (zero fee).
- Foil on one hero per world, loupe vignette, foreground/subject/background layers, serif headlines, scale-step cuts on
  the mix's onsets.
- Gate: each world's still is measured against the table above before any motion render.
