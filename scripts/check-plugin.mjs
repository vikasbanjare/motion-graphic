// node scripts/check-plugin.mjs
// Structural check of the Claude Code plugin packaging (run in CI). The authoritative
// validator is `claude plugin validate . --strict`; this covers what that cannot see:
// the files the skill and the SessionStart hook rely on.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const at = (...p) => path.join(ROOT, ...p);
const json = (rel) => {
  try {
    return JSON.parse(fs.readFileSync(at(rel), "utf8"));
  } catch (e) {
    errors.push(`${rel}: ${e.message}`);
    return null;
  }
};
const need = (rel, why) => fs.existsSync(at(rel)) || errors.push(`${rel} is missing (${why})`);
const NAME = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

const market = json(".claude-plugin/marketplace.json");
if (market) {
  if (!NAME.test(market.name ?? "")) errors.push(`marketplace.json: invalid name "${market.name}"`);
  if (!market.owner?.name) errors.push("marketplace.json: owner.name is required");
  if (!Array.isArray(market.plugins) || !market.plugins.length) errors.push("marketplace.json: plugins[] is empty");
  for (const [i, entry] of (market.plugins ?? []).entries()) {
    const where = `marketplace.json plugins[${i}]`;
    if (!NAME.test(entry.name ?? "")) errors.push(`${where}: invalid name "${entry.name}"`);
    if (typeof entry.source !== "string") continue;
    if (!entry.source.startsWith("./") || entry.source.split("/").includes("..")) {
      errors.push(`${where}: relative source must start with ./ and stay inside the repo`);
      continue;
    }
    const manifest = json(path.join(entry.source, ".claude-plugin/plugin.json"));
    if (manifest && manifest.name !== entry.name)
      errors.push(`${where}: entry name "${entry.name}" differs from plugin.json name "${manifest.name}"`);
    for (const skill of fs.existsSync(at(entry.source, "skills")) ? fs.readdirSync(at(entry.source, "skills")) : []) {
      const file = path.join(entry.source, "skills", skill, "SKILL.md");
      if (!fs.existsSync(at(file))) errors.push(`${file} is missing`);
      else if (!/^---\n[\s\S]*?\bname: \S[\s\S]*?\bdescription: \S[\s\S]*?\n---\n/.test(fs.readFileSync(at(file), "utf8")))
        errors.push(`${file}: frontmatter needs name and description`);
    }
    // The skill scaffolds new projects from the plugin's own copy of the engine.
    need(path.join(entry.source, "motion-kit/scripts/scaffold.mjs"), "the skill runs it from ${CLAUDE_PLUGIN_ROOT}");
  }
}

// People who open the repo directly get the same skill through a relative symlink.
const link = ".claude/skills/motion-director";
if (!fs.existsSync(at(link, "SKILL.md"))) errors.push(`${link} does not resolve to a skill (it should link to ../../skills/motion-director)`);
else if (fs.realpathSync(at(link)) !== fs.realpathSync(at("skills/motion-director")))
  errors.push(`${link} should be a symlink to ../../skills/motion-director, not a copy`);

const settings = json(".claude/settings.json");
for (const group of settings?.hooks?.SessionStart ?? []) {
  for (const hook of group.hooks ?? []) {
    const script = hook.command?.match(/\/(scripts\/[\w.-]+\.sh)/)?.[1];
    if (script) need(script, "SessionStart hook");
  }
}

if (errors.length) {
  for (const e of errors) console.error(`✖ ${e}`);
  process.exit(1);
}
console.log(`✔ Plugin packaging is consistent (${market.plugins.map((p) => `${p.name}@${market.name}`).join(", ")})`);
