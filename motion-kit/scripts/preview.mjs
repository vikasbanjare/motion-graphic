// npm run preview -- specs/my-video.json [--theme neon] [--format square]
// Renders a contact sheet (one settled frame per scene, safe zones tinted) in seconds.
import path from "node:path";
import { check } from "./check.mjs";
import { ROOT, applyOverrides, c, parseArgs, readSpec, remotion, writeTemp } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const { spec: raw, name } = readSpec(args._[0]);
const spec = applyOverrides(raw, args);
const { errors, warnings } = await check(spec);
for (const w of warnings) console.log(c.yellow("  ⚠ ") + w);
for (const e of errors) console.log(c.red("  ✖ ") + e);
if (errors.length) process.exit(1);

const suffix = [args.theme, args.format].filter(Boolean).join("-");
const out = args.out ?? path.join("out", `${name}${suffix ? "-" + suffix : ""}.sheet.jpg`);
const props = writeTemp(`${name}.sheet.json`, { spec, qa: !args["no-qa"] });
remotion(["still", "ContactSheet", out, `--props=${props}`, "--image-format=jpeg", "--jpeg-quality=90"]);
console.log(c.green(`\n✔ Contact sheet: ${path.relative(process.cwd(), path.resolve(ROOT, out))}`));
console.log(c.dim("  Red tint = covered by platform UI. Dashed red outline on text = too long for its slot."));
