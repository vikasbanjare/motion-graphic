// npm run check -- specs/my-video.json
// Validates a spec and lints it against motion-design rules before anything renders.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT, applyOverrides, c, engine, parseArgs, readSpec, shownText, withTimingFile } from "./lib.mjs";

export const check = async (inputSpec, { quiet = false } = {}) => {
  const E = await engine();
  const rawSpec = withTimingFile(inputSpec);
  const errors = [];
  const warnings = [];
  /** Information, not problems (e.g. how brand colours were adjusted). */
  const notes = [];
  const parsed = E.videoSchema.safeParse(rawSpec);
  if (!parsed.success) {
    for (const i of parsed.error.issues) {
      const where = i.path.length ? i.path.join(".") : "(top level)";
      let hint = i.message;
      if (i.code === "invalid_union" || /discriminator/i.test(i.message)) {
        hint = `unknown scene "type". Use one of: ${Object.keys(E.sceneSchema.def?.options ?? {}).join(", ") || "title, hook, kinetic, stat, list, compare, quote, chat, bars, grid, image, cta, logo"}`;
      }
      errors.push(`${where}: ${hint}`);
    }
    return { errors, warnings, notes, plan: null };
  }

  const spec = parsed.data;
  const plan = E.planVideo(spec);
  const { theme, format } = plan;
  const fps = 30;
  const sec = (f) => (f / fps).toFixed(1) + "s";
  const words = (t) => E.countWords(t);
  const chars = (t) => (t ? E.plainText(t).length : 0);

  // --- whole-video rules ---------------------------------------------------
  const total = plan.durationInFrames / fps;
  const maxLen = format.name === "landscape" ? 180 : 60;
  if (total > maxLen) warnings.push(`Video is ${total.toFixed(0)}s. Short-form retention drops sharply past ${maxLen}s — cut scenes or use pace "fast".`);
  if (total < 5) warnings.push(`Video is only ${total.toFixed(1)}s. Most platforms reward 15-35s.`);

  const first = spec.scenes[0];
  const firstText = shownText(first);
  if (words(firstText) > 12) warnings.push(`Scene 1 (the hook) has ${words(firstText)} words. People decide in ~1.7s — keep the hook under 10 words.`);
  {
    const s0 = plan.scenes[0];
    const tail = plan.scenes.length > 1 ? plan.transitionFrames : 24;
    const payoff = s0.scene.type === "hook" ? s0.beats.punch[0] : s0.duration - tail - s0.readable - plan.motion.enter;
    if (payoff > 90) warnings.push(`Scene 1's payoff starts at ${(payoff / 30).toFixed(1)}s. The key message should be on screen within 3s — shorten the opening line.`);
  }
  const last = spec.scenes[spec.scenes.length - 1];
  if (!["cta", "logo"].includes(last.type)) warnings.push(`Video ends on a "${last.type}" scene. End with "cta" (what should viewers do?) or "logo".`);

  // --- voice / narration ------------------------------------------------------
  if (plan.voice) {
    const silent = spec.scenes.map((s, i) => (!s.say && i < spec.scenes.length - 1 ? i + 1 : 0)).filter(Boolean);
    if (silent.length) warnings.push(`Scenes ${silent.join(", ")} have no "say" line. In a narrated video every beat (except an outro) should be spoken.`);
    if (plan.voice.estimated) {
      const chars = spec.scenes.map((s) => s.say ?? "").join(" ").length;
      console.log(c.dim(`  Narration: ${chars} characters, ~${(plan.voice.endMs / 1000).toFixed(1)}s spoken. Timing is estimated until you add a voice-over (npm run voice).`));
    }
    if (!plan.voice.estimated && plan.voice.coverage < 0.7)
      warnings.push(`Only ${Math.round(plan.voice.coverage * 100)}% of the "say" words were found in the voice timing. The recording doesn't match the script (partial file, or lines were changed) — re-record or update "say", then align again.`);
    if (spec.audio?.voiceover && !spec.audio?.words?.length) warnings.push(`audio.voiceover is set but there are no word timings. Run: npm run voice -- <spec> --align ${spec.audio.voiceover}`);
    spec.scenes.forEach((s, i) => {
      if (s.say && /\d/.test(s.say)) warnings.push(`Scene ${i + 1} "say" contains digits. Write numbers as spoken words in "say" ("fifty thousand") and keep digits on screen.`);
    });
  }

  let run = 1;
  for (let i = 1; i < spec.scenes.length; i++) {
    run = spec.scenes[i].type === spec.scenes[i - 1].type ? run + 1 : 1;
    if (run === 3) warnings.push(`Scenes ${i - 1}-${i + 1} are all "${spec.scenes[i].type}". Vary scene types to keep attention.`);
  }

  // --- brand colours --------------------------------------------------------
  // withBrand() already moved any brand colour that would not read (lightness
  // only, hue kept); say what changed. Only an impossible fix is an error.
  if (spec.brand?.accent || spec.brand?.accent2) {
    const report = E.resolveBrand(E.THEMES[theme.name], spec.brand);
    for (const ch of report.changes) {
      let note = ch.message;
      if (ch.field === "accent" && ch.kind === "adjusted" && E.deltaE(ch.from, ch.to) > 0.08) {
        const keep = E.THEME_NAMES.filter((n) => E.resolveBrand(E.THEMES[n], { accent: ch.from }).theme.colors.accent === ch.from);
        if (keep.length) note += ` To keep it exactly, use theme ${keep.join(" / ")}.`;
      }
      notes.push(note);
    }
    errors.push(...report.errors);
  }

  // --- media files ---------------------------------------------------------
  const media = [];
  spec.scenes.forEach((s, i) => {
    if (s.type === "image") media.push([`scenes.${i}.src`, s.src]);
    if (s.type === "logo" && s.src) media.push([`scenes.${i}.src`, s.src]);
  });
  if (spec.audio?.music) media.push(["audio.music", spec.audio.music]);
  if (spec.audio?.beats) media.push(["audio.beats", spec.audio.beats]);
  if (spec.audio?.voiceover) media.push(["audio.voiceover", spec.audio.voiceover]);
  if (spec.brand?.logo) media.push(["brand.logo", spec.brand.logo]);
  for (const [where, src] of media) {
    if (/^(https?:|data:)/.test(src)) continue;
    if (!fs.existsSync(path.join(ROOT, "public", src))) errors.push(`${where}: file "public/${src}" does not exist. Put the file in motion-kit/public/ and use a path relative to it.`);
  }
  if (spec.audio?.music) warnings.push("Music: only use tracks you have a licence for (YouTube Audio Library, Pixabay Music, Mixkit, or bought). Business accounts can't use trending sounds.");
  if (spec.audio?.music && spec.audio.musicStart !== undefined && spec.audio.musicDuration !== undefined && spec.audio.musicStart > spec.audio.musicDuration - 1)
    errors.push(`audio.musicStart is ${spec.audio.musicStart}s but the track is only ${spec.audio.musicDuration.toFixed(1)}s long. Pick an earlier start, or re-run: npm run music -- <spec> --track ${spec.audio.music}`);

  // --- per-scene rules -----------------------------------------------------
  const display = (s, i, field, text, maxWords = 7, maxChars = 36) => {
    if (!text) return;
    if (words(text) > maxWords || chars(text) > maxChars)
      warnings.push(`Scene ${i + 1} ${field} has ${words(text)} words / ${chars(text)} chars. Big type works up to ~${maxWords} words — split it or move detail into a sub line.`);
  };
  const body = (s, i, field, text, maxWords = 20) => {
    if (text && words(text) > maxWords) warnings.push(`Scene ${i + 1} ${field} has ${words(text)} words. Nobody reads paragraphs in a reel — keep it under ${maxWords}.`);
  };
  const kicker = (i, text) => {
    if (text && chars(text) > 26) warnings.push(`Scene ${i + 1} kicker is ${chars(text)} chars — it will shrink. Kickers are labels (≤ 26 chars); put sentences in the main text.`);
  };

  spec.scenes.forEach((s, i) => {
    const p = plan.scenes[i];
    const contentSec = (p.duration - (i === plan.scenes.length - 1 ? 24 : plan.transitionFrames)) / fps;
    if (contentSec > 7 && s.type !== "image") warnings.push(`Scene ${i + 1} (${s.type}) is on screen ${contentSec.toFixed(1)}s. Past ~7s viewers swipe — split it.`);
    if (s.duration && Math.round(s.duration * fps) < p.minReadable)
      warnings.push(`Scene ${i + 1} duration ${s.duration}s is too short to read; it needs ${(p.minReadable / fps).toFixed(1)}s. Remove "duration" to let the engine time it.`);
    const marks = shownText(s).match(/\*[^*]+\*|==[^=]+==/g) ?? [];
    if (p.squeezed) warnings.push(`Scene ${i + 1} narration is too short for its animation — the cut comes before the text can be read. Add a few words to "say" or trim on-screen text.`);
    if (plan.voice && s.duration) warnings.push(`Scene ${i + 1} has "duration", which is ignored when narration drives timing.`);
    if (marks.length > 2) warnings.push(`Scene ${i + 1} has ${marks.length} highlighted phrases. One accent per scene is what makes it pop.`);

    switch (s.type) {
      case "title":
        kicker(i, s.kicker);
        display(s, i, "headline", s.headline, 8, 44);
        body(s, i, "sub", s.sub, 16);
        break;
      case "hook":
        display(s, i, "punch", s.punch, 6, 32);
        if (s.strike && chars(s.strike) > 14) warnings.push(`Scene ${i + 1} strike "${s.strike}" is long. The struck item should be one number or word.`);
        break;
      case "kinetic":
        s.lines.forEach((l, k) => display(s, i, `line ${k + 1}`, l, 5, 28));
        break;
      case "stat":
        kicker(i, s.kicker);
        body(s, i, "label", s.label, 10);
        break;
      case "list":
        display(s, i, "title", s.title, 7, 40);
        s.items.forEach((t, k) => {
          if (words(t) > 8) warnings.push(`Scene ${i + 1} item ${k + 1} has ${words(t)} words. List rows read best at 2-6 words.`);
        });
        break;
      case "compare":
        [...s.left.items, ...s.right.items].forEach((t) => {
          if (words(t) > 6) warnings.push(`Scene ${i + 1} compare item "${t}" is long. Use 1-5 words per row.`);
        });
        break;
      case "quote":
        body(s, i, "quote", s.quote, 24);
        break;
      case "chat":
        if (s.prompt.length > 120) warnings.push(`Scene ${i + 1} prompt is ${s.prompt.length} chars. Typing animations drag past ~100.`);
        body(s, i, "reply", s.reply, 14);
        break;
      case "bars":
        display(s, i, "title", s.title, 7, 40);
        break;
      case "grid":
        display(s, i, "title", s.title, 7, 40);
        s.items.forEach((t, k) => {
          if (words(t.label) > 4) warnings.push(`Scene ${i + 1} tile ${k + 1} label is long. Tiles fit 1-3 words; use "sub" for detail.`);
        });
        break;
      case "image":
        kicker(i, s.kicker);
        display(s, i, "caption", s.caption, 8, 44);
        break;
      case "cta":
        if (chars(s.action) > 16) warnings.push(`Scene ${i + 1} action "${s.action}" is long. Buttons work with 1-3 words.`);
        body(s, i, "sub", s.sub, 12);
        break;
      case "orb":
        kicker(i, s.kicker);
        display(s, i, "headline", s.headline, 6, 36);
        body(s, i, "sub", s.sub, 12);
        break;
      case "wave":
        if (!s.text && !s.say) warnings.push(`Scene ${i + 1} (wave) has no "say" or "text" — the waveform needs words to light up.`);
        body(s, i, "text", s.text ?? s.say, 16);
        break;
      case "prompt":
        if (s.prompt.length > 100) warnings.push(`Scene ${i + 1} prompt is ${s.prompt.length} chars. Typing drags past ~100; shorten it.`);
        break;
      case "logo":
        break;
    }
  });

  if (!quiet) {
    console.log(c.bold(`\n${format.label} · theme ${theme.name} · motion ${plan.spec.motion} · pace ${plan.spec.pace} · ${sec(plan.durationInFrames)}`));
    for (const s of plan.scenes) {
      const text = shownText(s.scene);
      console.log(
        c.dim(`  ${String(s.index + 1).padStart(2)}. `) +
          s.scene.type.padEnd(8) +
          c.dim(` ${sec(s.from).padStart(6)} → ${sec(s.from + s.duration).padStart(6)}  `) +
          E.plainText(text).slice(0, 56),
      );
    }
    for (const n of notes) console.log(c.dim("  ℹ ") + n);
    const music = plan.music;
    if (music?.beats.length > 1) {
      const gaps = music.beats.slice(1).map((b, i) => b - music.beats[i]).sort((x, y) => x - y);
      const onBeat = plan.scenes.filter((s) => s.onBeat !== undefined).length;
      console.log(c.dim(`  Music: ~${Math.round((60 * fps) / gaps[gaps.length >> 1])} BPM from ${sec(music.startFrame)} · ${onBeat}/${plan.scenes.length - 1} cuts on the beat`));
    } else if (music && spec.audio.beatGrid) console.log(c.dim(`  Music: from ${sec(music.startFrame)}, no steady beat in this track — cuts are timed without it.`));
    else if (music) console.log(c.dim(`  Music: no beat grid yet — npm run music -- <spec> --track ${spec.audio.music} lands cuts on the beat.`));
  }
  return { errors, warnings, notes, plan };
};

const isMain = import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const args = parseArgs(process.argv.slice(2));
  const { spec } = readSpec(args._[0]);
  const { errors, warnings } = await check(applyOverrides(spec, args));
  for (const w of warnings) console.log(c.yellow("  ⚠ ") + w);
  for (const e of errors) console.log(c.red("  ✖ ") + e);
  if (errors.length) {
    console.log(c.red(`\n${errors.length} error(s). Fix them and run again.`));
    process.exit(1);
  }
  console.log(c.green(`\n✔ Spec is valid`) + (warnings.length ? c.yellow(` with ${warnings.length} suggestion(s).`) : "."));
}
