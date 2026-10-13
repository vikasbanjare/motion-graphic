# Style decision: editorial cut-paper collage

## Why this style

I researched recent fintech and investing launch films. Top-tier work falls into two groups:
- **Big-budget production:** 3D, live action or stop-motion. Examples: Cash App (ManvsMachine), Wealthsimple (Nexus), Coinbase × Aardman, INDmoney "American Paglu".
- **A deliberately limited 2D illustration system.** Examples: BUCK (Wealthsimple Trade, Coinbase "System Update"), Giant Ant (TVFCU "Opening Day", Mailchimp) and COLLINS (Robinhood).

For a film rendered from code, without AI imagery or stock footage, the second group is the one we can match. Within it, **editorial cut-paper collage** fits best:
- It is the closest buildable match to the client's CRED × Kuvera painterly-collage reference.
- It suits the story's paper motifs: the receipt, the share certificates, the stamp.
- It avoids both the 3D budget and the look of AI painting.

## Reference films

| Film | Studio | What we take from it |
|---|---|---|
| Wealthsimple Trade "Zero fee" | BUCK, https://www.buck.co/work/wealth-simple-trade-app | One compositional device ("0") carried through every scene |
| Coinbase "System Update" | BUCK, https://buck.co/work/coinbase-system-update | A strict, constrained system; type as image |
| TVFCU "Opening Day" | Giant Ant, https://www.giantant.ca/tvfcu-opening-day | "Low tech, high craft": flat illustration, 2D cel timing |
| Mailchimp rebrand | Giant Ant, https://www.giantant.ca/mailchimp-rebrand | "Clean it up, but keep it messy": raster texture, imperfect edges |
| Robinhood illustration | COLLINS, https://dandad.org/awards/professional/2021/234086/robinhood-illustration | Editorial grain in an investing context |

## The system, and the craft markers we hit

1. **One device.** The orange disc appears in every scene: the sun, the play button field, the inside of the search, the map pin, the payment tick, **the 0**, the lock, the door, the tunnel, the drop's sun, the certificate seals, and the end card's sun returning for the loop.
2. **A restrained palette.** MAPS orange, navy, off-white paper, plus one accent (sky). Only tints of those colours appear (ink, orange-deep, orange-pale).
3. **Paper made in code:**
   - Each cut shape gets a torn edge that boils slightly with every drawing, plus paper-fibre speckle.
   - Shadows are short and soft, like real paper.
   - Halftone shading sits on the shadow side.
   - Small stickers get a white die-cut border.
   - The type gets a light letterpress edge.
4. **Motion on twos, locked to the beat.** The picture changes 12 times a second (each drawing held 2–3 frames), and the step clock resets on every beat so hits land on the beat frame. The camera always drifts.
5. **Restrained easing.** At most about 3% overshoot, and only impacts get a kick: the 0, the stamp, the drop, the logo. Type rises through mask lines with a staggered start for each letter.
6. **Motivated transitions.** Push into an object with a hard flood, area-eased iris wipes, elastic paper band wipes, a card landing, and a slide-off. No cross-fades into dark colours.
7. **One type family.** Open Sans in two weights, set big and left-aligned, bleeding off the frame.
8. **Print misregistration**, used on impact frames only.
9. **Sound.** The client's track is cut beat-exact, and the layered SFX are tuned to B major. The library slots are ready for real foley.

## What would raise it further

- Real foley and SFX from a library: drop the files into `assets/audio/sfx-library/`, named after the slots.
- Scanned paper textures (CC0, e.g. ambientCG) in place of the procedural fibre.
- A licensed master logo SVG.
