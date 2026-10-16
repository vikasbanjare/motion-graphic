/**
 * Tiny inline-markup parser for spec text.
 *   *accent*   ==highlight==   ~~strike~~
 * Unclosed marks are treated as literal text, so a stray "*" never breaks a video.
 */
export type Mark = "accent" | "mark" | "strike";
export type Segment = { text: string; mark?: Mark };
/**
 * A word as laid out on screen. `mark` drives word-level effects (highlight
 * box, strike line). `parts` is set when marks change inside one word, e.g.
 * "*better*." -> accent "better" + plain "." with no space between.
 */
export type RichWord = { text: string; mark?: Mark; parts?: Segment[] };

const TOKENS: { open: string; close: string; mark: Mark }[] = [
  { open: "==", close: "==", mark: "mark" },
  { open: "~~", close: "~~", mark: "strike" },
  { open: "*", close: "*", mark: "accent" },
];

export const parseRich = (input: string): Segment[] => {
  const out: Segment[] = [];
  let buf = "";
  let i = 0;
  while (i < input.length) {
    const tok = TOKENS.find((t) => input.startsWith(t.open, i));
    if (tok) {
      const end = input.indexOf(tok.close, i + tok.open.length);
      if (end > i + tok.open.length) {
        if (buf) out.push({ text: buf });
        buf = "";
        out.push({ text: input.slice(i + tok.open.length, end), mark: tok.mark });
        i = end + tok.close.length;
        continue;
      }
    }
    buf += input[i];
    i++;
  }
  if (buf) out.push({ text: buf });
  return out;
};

/** Split rich text into words, each carrying its mark. Newlines force line breaks. */
export const richWords = (input: string): (RichWord | "\n")[] => {
  const words: (RichWord | "\n")[] = [];
  // True when the last thing emitted was a word with no whitespace after it yet.
  let open = false;
  for (const seg of parseRich(input)) {
    // Split into tokens, keeping whitespace runs so we know where words touch.
    const tokens = seg.text.split(/(\s+)/).filter((t) => t.length > 0);
    for (const tok of tokens) {
      if (/^\s+$/.test(tok)) {
        const breaks = (tok.match(/\n/g) ?? []).length;
        for (let k = 0; k < breaks; k++) words.push("\n");
        open = false;
        continue;
      }
      const prev = words[words.length - 1];
      if (open && prev && prev !== "\n") {
        const parts: Segment[] = prev.parts ?? [prev.mark ? { text: prev.text, mark: prev.mark } : { text: prev.text }];
        parts.push(seg.mark ? { text: tok, mark: seg.mark } : { text: tok });
        const core = parts.reduce((a, b) => (b.text.length > a.text.length ? b : a));
        words[words.length - 1] = { text: prev.text + tok, mark: core.mark, parts };
      } else {
        words.push(seg.mark ? { text: tok, mark: seg.mark } : { text: tok });
      }
      open = true;
    }
  }
  return words;
};

export const plainText = (input: string) => parseRich(input).map((s) => s.text).join("");

/** Words a viewer has to read. Emoji-only tokens and punctuation are free. */
export const countWords = (...inputs: (string | undefined)[]) =>
  inputs
    .filter((s): s is string => Boolean(s))
    .flatMap((s) => plainText(s).split(/\s+/))
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
