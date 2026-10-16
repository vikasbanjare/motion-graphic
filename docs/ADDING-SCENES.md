# Adding a scene template

A scene template is the only place animation code lives. Specs (and the AI) never
write animation; they fill a template's fields. So a new template has to be as safe as
the 17 existing ones: it must fit any text it is given, follow the voice-over, render
the same in every renderer, and be checked before anything renders.

This guide walks through every file a new scene touches, using a hypothetical
`timeline` scene (2-5 dated milestones) as the example. Work in this order; TypeScript
tells you when a step is missing.

| Step | File | Why |
|---|---|---|
| 1 | `motion-kit/src/engine/schema.ts` | The fields a spec may use, with limits |
| 2 | `motion-kit/src/engine/plan.ts` | When each element enters, how long the scene holds, sounds |
| 3 | `motion-kit/src/scenes/Timeline.tsx` | The component: layout and motion |
| 4 | `motion-kit/src/scenes/index.ts` | Registers the component |
| 5 | `motion-kit/scripts/check.mjs` (+ `lib.mjs`) | Copy-length rules before rendering |
| 6 | QA tags in the component | What `npm run qa` measures on the real frames |
| 7 | `skills/motion-director/references/scenes.md` | The catalog the AI writes specs from |
| 8 | `motion-kit/specs/all-scenes.json` | The example every check and CI run covers |

## 1. Schema

Add a zod object with a literal `type`, spread `...common` last (narration, duration,
background, sfx), and add it to `sceneSchema`'s discriminated union.

```ts
const timelineScene = z.object({
  type: z.literal("timeline"),
  title: rich.optional(),
  /** 2-5 milestones, oldest first. `when` is short: "2019", "Q3", "Day 1". */
  items: z
    .array(z.object({ when: z.string().min(1).max(10), label: rich }))
    .min(2)
    .max(5),
  ...common,
});
```

Rules:
- **Bound everything.** Array `.min()/.max()` and string `.max()` are what make a layout
  possible at all; pick limits the component can always fit.
- Use `rich` for text that may carry `*accent*` / `==highlight==` / `~~strike~~` marks,
  plain `z.string()` for labels that must not.
- Every field gets a one-line `/** comment */`: it is the documentation people and the
  AI read in editors.
- Don't add fields that only change styling per scene; themes and motion tokens own that.

## 2. Planner

Add an entry to `PLANNERS` in `plan.ts`. The `satisfies` clause at the end of the object
makes TypeScript fail until every scene type has one. A planner returns frame numbers
only; the component never decides timing.

```ts
timeline: (s: SceneOf<"timeline">, { m, lead, at }: Ctx) => {
  const title = at(s.title, lead);
  const items = chain(s.items.map((i) => i.label), title + (s.title ? 10 : 0), m.itemStagger, at);
  return {
    beats: { title, items },
    entryEnd: items[items.length - 1] + m.enter,
    read: [s.title, ...s.items.map((i) => i.label)],
    readFrom: lead,
    cues: items.map((f) => ({ at: f, sfx: "click" as SfxName, volume: 0.35 })),
  };
},
```

- **`at(text, fallback)`** for every element that shows words: with a voice-over it
  returns the frame the words are spoken (minus a small lead), otherwise the fallback.
  This is what keeps the scene in sync with narration. Use `chain()` for lists and
  `words()` for per-word headline reveals.
- **`entryEnd`**: the frame the last element has landed. **`read` / `readFrom`**: the text
  a viewer still has to read after `readFrom`; the planner turns this into the hold time.
- **`lead`** is negative for scene 1, so something is on screen at frame 0 (the thumbnail).
  Don't add delays before the first element.
- **`cues`**: sound effects from `SfxName` only, scene-relative frames, modest volumes
  (0.3-0.6). The engine ducks them under a voice-over.

## 3. Component

One file in `src/scenes/`, one exported component typed by its spec:

```tsx
export const Timeline: React.FC<{ scene: SceneOf<"timeline"> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { box, u, m, c, scene: plan, landscape } = useEnv();
  const b = plan.beats as BeatsFor<"timeline">;
  return (
    <Stage gap={40}>
      {scene.title ? (
        <FitText label="title" text={scene.title} start={b.title} maxWidth={box.width} maxHeight={box.height * 0.22} maxSize={120 * u} />
      ) : null}
      {/* ...rows that read b.items[i] and animate with rise/pop/prog... */}
    </Stage>
  );
};
```

Hard rules (reviewers will reject anything else):
- **Text goes through `FitText`** (or `Kicker` for labels). It solves the font size so the
  text always fits its box; never set a fixed `fontSize` for spec text. Give every text
  slot an explicit `maxWidth`, `maxHeight` and `maxSize` (times `u`).
- **Lay out inside `useEnv().box`**, the format's safe area, via `<Stage>`. Size everything
  with `u` (1 at 1080 px on the short side) and handle `landscape`.
- **Colours from `c`** (the scene's colours after its `bg` override) and fonts from
  `theme.fonts`. No hard-coded colours, so all 10 themes and brand colours work.
- **Animation only from the frame**: `useCurrentFrame()` with the helpers in
  `engine/motion.ts` (`prog`, `enterP`, `rise`, `pop`, `slideIn`, `focus`, `drift`, `ease`),
  `interpolate` or `spring`, using the motion tokens in `m`. Never CSS `animation` or
  `transition`.
- **Transforms as one `transform` string** (`translate3d(...) scale(...)`), not the CSS
  `translate` / `scale` properties.
- **Plain CSS only**, so the CLI renderer and `@remotion/web-renderer` produce the same
  pixels: gradients, transforms, opacity, `filter: blur()`, border-radius, box-shadow.
  No CSS `background-image: url()`; use Remotion's `<Img>` (and `resolveMedia()` for
  files in `public/`).
- **Deterministic**: no `Math.random()`, dates or network calls; use `random(seed)` from
  `remotion` if you need noise.

## 4. Register it

Add the component to `SCENES` in `src/scenes/index.ts`. The map is typed by scene type,
so a missing or mistyped entry fails `tsc`.

## 5. Check rules

`npm run check` judges copy length before anything renders. Add a `case "timeline":` to
the per-scene `switch` in `scripts/check.mjs`, using the helpers there with limits that
match your slots:

```js
case "timeline":
  display(s, i, "title", s.title, 7, 40);
  s.items.forEach((t, k) => {
    if (words(t.label) > 6) warnings.push(`Scene ${i + 1} milestone ${k + 1} has ${words(t.label)} words. Milestones read best at 2-5 words.`);
  });
  break;
```

Warnings name the scene and field and say how to fix it, in plain words.
Also:
- A field that points at a file (`src`, ...) goes into the `media` list so a missing file
  is an error, not a broken render.
- A string field that is not on-screen text (a setting such as `style` or `area`) goes in
  the exclusion list of `shownText()` in `scripts/lib.mjs`, so it isn't counted as copy.

## 6. QA tags

`npm run qa` renders key frames in memory and measures the real layout. It finds text
and cards through data attributes (see the header of `src/engine/qa.tsx`):

- `FitText` and `Kicker` tag themselves; give each a `label` naming the spec field
  (`"title"`, `"item 2"`) so findings point at the right place.
- Any other element that shows spec text: `data-mk="text"` and `data-mk-label="..."`
  (plus `data-mk-text` with the plain text if the words are laid out without spaces).
- Cards, buttons, bubbles and media frames that text must stay inside:
  `data-mk="card"` with a `data-mk-label`.
- A solid colour painted behind text (a pill, a highlighted row): `data-mk-bg="#RRGGBB"`
  on that element, so contrast is measured against it.

Then run QA on every format: `npm run qa -- specs/all-scenes.json --format reel`, and
again with `square`, `portrait` and `landscape`, plus a light and a dark theme.

## 7. Catalog

Add the scene to `skills/motion-director/references/scenes.md` with its fields and a
short example. The skill only uses fields documented there, so an undocumented field
never gets used. Update the scene count where it appears (the skill's `SKILL.md`, both
READMEs).

## 8. Example and verification

Add one instance to `motion-kit/specs/all-scenes.json` (with a `say` line), then from
`motion-kit/`:

```bash
npx tsc -p .
npx eslint src
for s in specs/*.json; do node scripts/check.mjs "$s" || break; done
npm run qa -- specs/all-scenes.json
node --test   # every unit test, as CI runs them
```

Look at it in Remotion Studio (`npm run dev`, Examples > all-scenes) with long and short
copy, Hindi copy, every format and at least one light and one dark theme. CI runs the
type check, lint, spec checks, unit tests and the plugin validator on every pull request;
it does not render.

People who use the Claude Code plugin get the new scene only once the plugin's `version`
in `.claude-plugin/plugin.json` goes up (Claude Code caches each version), so raise it
when the change is released. Projects they set up earlier keep their own copy of the
engine and are not affected.
