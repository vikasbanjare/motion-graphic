# Lessons from CRED v2 → v6.5 (read before building)

1. **Measure the reference before designing.** Frame-by-frame metrics (detail, saturation, empty space, cuts
   per 10 s, motion) showed v5 was the wrong medium before taste could. Reference averages for the CRED film:
   detail 0.115, vivid 11%, contrast 42, empty space 30%, cuts 2.8 / 10 s.
2. **Real subjects beat abstract shapes.** Licensed 3D models run through an engraving shader read as
   "premium print", where drawn primitives read as "template".
3. **Gradient text in Chrome headless:** `background-clip: text` combined with a `transform` or `filter`
   renders as a solid gradient box in the export, while the preview can look fine. Use SVG `<text>` with a
   gradient `fill`.
4. **Check the export, not the preview.** The ₹0 box only showed up in the rendered MP4.
5. **Micro-stops come from easing.** An ease-in-out move that ends where the next one starts from rest
   reads as a stutter. Overlap moves, keep a drift, or start the next move early. `tools/motion_qa.py`
   finds these.
6. **Don't put a prop into a close-up.** The magnifying glass covered the strip text, so the 0 read as a 5.
   Transition out of a close-up by changing the object itself, as the strip split does.
7. **Pace the opening to the reference, not to a rule.** v6.4 landed the first claim at 2.6 s and read as a
   template. The reference holds blank paper for 0.5 s and builds for 7 s, so v6.5 does too. The user's final
   cut then trimmed the pen strokes to 0.8 s: build the long version, let the edit shorten it.
8. **Keep subjects inside the frame.** A low camera horizon cut the fox at the bottom of the frame. Raise
   the camera, move the subject to mid-ground and give it contrast.
9. **Mockups need the real product mood.** CRED's app is dark, so a white UI read as generic.
10. **Gradient phases must stay in range.** Pushing a foil gradient's phase past its colour stops froze it
    into one flat colour for 2 frames.
11. **Timestamps → frames at the composition's own fps.** This film is 24 fps, so 0:22 is frame 528, not 660.
12. **Stills to the user first, every time**, then motion. It saves whole render cycles.
13. **Be honest about tools and limits.** Built with Remotion, Three.js and Claude Code. Synthesized music is
    basic. Claude Design cannot do the 3D engraving.
14. **Frame-match before you fix.** The v6.5 intro stayed wrong for four rounds because each round fixed what
    a metric said. Side by side at the same timestamps it was obvious: thick crossing strokes instead of thin
    parallel waves, a faint field, cream paper instead of grey, a cluttered wide branch instead of a close one.
15. **A look score is not design sense.** `ref_compare` said 83% while the transitions were wrong. Use it as a
    guard only.
16. **Check every frame, not samples.** `jerk_qa.py` found lurches the contact sheets never showed: an expo-out
    on the bough, the lens fading before a cut, a hold-then-snap crane, a black flash before the lockup, a phone
    push too fast. Ease in and out, start moves on the cut, overlap the next shot.
17. **Flat plates beat lit 3D.** Users still said "it looks 3D" with lighting on. A flat tone plus an inked
    contour (`ENGRAVE_FLAT`, `ink`) reads as print.
18. **Faceted models need smooth normals.** The skinned fox showed its polygons; average normals by position
    (`smooth` in `rig.tsx`). A low-poly model still limits the look: the real fix is a better model.
19. **Replace a shot the user dislikes; don't polish it.** The hotel-and-lantern travel shot was rebuilt as a
    balloon over a globe after one note.
20. **Send outputs often.** Hours of silent rendering read as "stuck". Send a board or clip each round.
21. **Hand over stems.** The user scored the final cut themselves. A muted master plus music and effects stems
    make that easy.
22. **Memory limits renders.** Four render workers on Three.js ran the container out of memory; use two.
