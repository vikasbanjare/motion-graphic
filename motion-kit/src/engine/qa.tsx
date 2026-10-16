import { useLayoutEffect, useRef, useState } from "react";
import { useCurrentFrame, useDelayRender } from "remotion";
import type { VideoPlan } from "./plan.ts";

/**
 * In-page visual QA. With `_qa` on, every rendered frame measures what is
 * actually on screen (after fonts, transforms and transitions) and logs one
 * "[mk-qa] {json}" line that `npm run qa` collects and judges. Nothing is
 * drawn and no image is ever written: the browser's own layout is the truth.
 *
 * Elements opt in with data attributes:
 *   data-mk="text"   a block of readable text (data-mk-label names it,
 *                    data-mk-text is its plain text when words are laid out
 *                    without spaces, data-mk-overflow="1" = it could not fit)
 *   data-mk="card"   a card / button / media frame
 *   data-mk-bg       the solid colour behind this element's text (#RRGGBB[AA])
 *   data-mk-scene    a scene's root (its index)
 * Coordinates are canvas px, relative to the composition root.
 */
export const QA_PREFIX = "[mk-qa] ";

/** x, y, width, height in canvas px, then effective opacity. */
export type QaBox = [number, number, number, number, number];

export type QaText = {
  scene: number | null;
  label: string;
  text: string;
  overflow: boolean;
  /** Rendered font size in canvas px (computed size x accumulated scale). */
  px: number;
  /** One box per word/run of text that is at least faintly visible (opacity > 0.05). */
  boxes: QaBox[];
  /** Most px of a clearly visible word hidden by an overflow:hidden ancestor. */
  clipped: number;
  /** The card / button / bubble this text sits in, and how far (px) visible text pokes out of it. */
  card: string | null;
  spill: number;
  /** Worst text/background contrast among clearly visible letters, null if none. */
  contrast: number | null;
  color: string | null;
  bg: string | null;
};

export type QaCard = { scene: number | null; label: string; box: QaBox };

export type QaFrame = {
  frame: number;
  width: number;
  height: number;
  /** Effective opacity of every mounted scene root. */
  scenes: { index: number; opacity: number }[];
  texts: QaText[];
  cards: QaCard[];
};

type Rgba = [number, number, number, number];

const parseColor = (s: string | null | undefined): Rgba | null => {
  if (!s) return null;
  const hex = s.trim().match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, hex[2] ? parseInt(hex[2], 16) / 255 : 1];
  }
  const fn = s.match(/rgba?\(([^)]+)\)/);
  if (fn) {
    const p = fn[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    return [p[0], p[1], p[2], p[3] ?? 1];
  }
  return null;
};

const over = (top: Rgba, under: Rgba, alpha = top[3]): Rgba => [
  top[0] * alpha + under[0] * (1 - alpha),
  top[1] * alpha + under[1] * (1 - alpha),
  top[2] * alpha + under[2] * (1 - alpha),
  1,
];

const lum = ([r, g, b]: Rgba) => {
  const ch = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
};

const ratio = (a: Rgba, b: Rgba) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const toHex = (c: Rgba) => "#" + c.slice(0, 3).map((v) => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase();

const READABLE = /[\p{L}\p{N}]/u;

export const measureFrame = (root: HTMLElement, frame: number, plan: VideoPlan): QaFrame => {
  const W = plan.format.width;
  const H = plan.format.height;
  const rr = root.getBoundingClientRect();
  const k = rr.width / W || 1;
  const styles = new Map<Element, CSSStyleDeclaration>();
  const cs = (el: Element) => {
    let s = styles.get(el);
    if (!s) {
      s = getComputedStyle(el);
      styles.set(el, s);
    }
    return s;
  };

  const opacityMemo = new Map<Element, number>();
  const opacity = (el: Element | null): number => {
    if (!el || el === root.parentElement) return 1;
    const hit = opacityMemo.get(el);
    if (hit !== undefined) return hit;
    const s = cs(el);
    const own = s.visibility === "hidden" || s.display === "none" ? 0 : parseFloat(s.opacity || "1");
    const v = own * opacity(el.parentElement);
    opacityMemo.set(el, v);
    return v;
  };

  type Edges = { left: number; top: number; right: number; bottom: number };

  /**
   * Where a run of text sits. An inline element's box is the font's full
   * ascent-to-descent area, taller than the line for display faces (Anton,
   * Teko) although the glyphs stay inside the line, so it is trimmed to the
   * line height. `scale` converts layout px to screen px.
   */
  const textEdges = (el: Element, scale: number): Edges => {
    const r = el.getBoundingClientRect();
    const s = cs(el);
    const lh = parseFloat(s.lineHeight) * scale;
    if (s.display !== "inline" || !Number.isFinite(lh) || lh >= r.height) return r;
    const mid = (r.top + r.bottom) / 2;
    return { left: r.left, right: r.right, top: mid - lh / 2, bottom: mid + lh / 2 };
  };

  /** Visible part of an element: its transformed box clipped by overflow:hidden ancestors. */
  const visibleRect = (el: Element, r: Edges = el.getBoundingClientRect()): [number, number, number, number] | null => {
    let x1 = r.left;
    let y1 = r.top;
    let x2 = r.right;
    let y2 = r.bottom;
    for (let a = el.parentElement; a && a !== root; a = a.parentElement) {
      const s = cs(a);
      if (s.overflowX === "visible" && s.overflowY === "visible") continue;
      const c = a.getBoundingClientRect();
      if (s.overflowX !== "visible") {
        x1 = Math.max(x1, c.left);
        x2 = Math.min(x2, c.right);
      }
      if (s.overflowY !== "visible") {
        y1 = Math.max(y1, c.top);
        y2 = Math.min(y2, c.bottom);
      }
    }
    if (x2 - x1 < 0.5 || y2 - y1 < 0.5) return null;
    return [(x1 - rr.left) / k, (y1 - rr.top) / k, (x2 - x1) / k, (y2 - y1) / k];
  };

  const sceneOf = (el: Element) => {
    const s = el.closest("[data-mk-scene]");
    return s ? Number(s.getAttribute("data-mk-scene")) : null;
  };

  const themeBg = parseColor(plan.theme.colors.bg) as Rgba;
  /** Solid colour behind `el`: every data-mk-bg from the outside in, composited over the theme background. */
  const backgroundOf = (el: Element): { color: Rgba; owner: Element | null } => {
    const chain: Element[] = [];
    for (let a: Element | null = el; a && a !== root.parentElement; a = a.parentElement) {
      if (a.hasAttribute("data-mk-bg")) chain.push(a);
    }
    let color = themeBg;
    for (const a of chain.reverse()) {
      const c = parseColor(a.getAttribute("data-mk-bg"));
      if (c) color = over(c, color);
    }
    return { color, owner: chain.length ? chain[chain.length - 1] : null };
  };

  /** Elements that directly hold text (words, runs, plain labels). */
  const leavesOf = (el: Element) => {
    const out: Element[] = [];
    const walk = (e: Element) => {
      let direct = false;
      for (const n of Array.from(e.childNodes)) {
        if (n.nodeType === Node.TEXT_NODE && (n.textContent ?? "").trim()) direct = true;
        else if (n.nodeType === Node.ELEMENT_NODE) walk(n as Element);
      }
      if (direct) out.push(e);
    };
    walk(el);
    return out;
  };

  /** Text belongs inside its card: measure how far the clearly visible part pokes out. */
  const spillOf = (el: Element, boxes: QaBox[]) => {
    const card = el.parentElement?.closest('[data-mk="card"]');
    if (!card) return { card: null, spill: 0 };
    const c = card.getBoundingClientRect();
    const [l, t, r, b] = [(c.left - rr.left) / k, (c.top - rr.top) / k, (c.right - rr.left) / k, (c.bottom - rr.top) / k];
    let spill = 0;
    for (const [x, y, w, h, o] of boxes) if (o > 0.5) spill = Math.max(spill, l - x, t - y, x + w - r, y + h - b);
    return { card: card.getAttribute("data-mk-label") || "card", spill: Math.round(spill) };
  };

  const texts: QaText[] = [];
  for (const el of Array.from(root.querySelectorAll('[data-mk="text"]'))) {
    const s = cs(el);
    const box = el.getBoundingClientRect();
    const layoutW = (el as HTMLElement).offsetWidth;
    const scale = layoutW > 0 ? box.width / k / layoutW : 1;
    const boxes: QaBox[] = [];
    let worst: { contrast: number; color: string; bg: string } | null = null;
    let px = Infinity;
    let clipped = 0;
    for (const leaf of leavesOf(el)) {
      const o = opacity(leaf);
      if (o <= 0.05) continue;
      const full = textEdges(leaf, scale * k);
      const r = visibleRect(leaf, full);
      if (!r) continue;
      boxes.push([...r, o]);
      if (o > 0.5) clipped = Math.max(clipped, (full.right - full.left) / k - r[2], (full.bottom - full.top) / k - r[3]);
      px = Math.min(px, parseFloat(cs(leaf).fontSize) * scale);
      if (!READABLE.test(leaf.textContent ?? "")) continue;
      const { color: bg, owner } = backgroundOf(leaf);
      // Opacity relative to whatever paints the background (a fading scene fades both).
      const rel = Math.min(1, o / (owner ? opacity(owner) || 1 : 1));
      if (rel <= 0.5) continue;
      const fg = parseColor(cs(leaf).color);
      if (!fg) continue;
      const shown = over(fg, bg, fg[3] * rel);
      const kc = ratio(shown, bg);
      if (!worst || kc < worst.contrast) worst = { contrast: kc, color: toHex(shown), bg: toHex(bg) };
    }
    texts.push({
      scene: sceneOf(el),
      label: el.getAttribute("data-mk-label") || "text",
      text: (el.getAttribute("data-mk-text") ?? el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 80),
      overflow: el.getAttribute("data-mk-overflow") === "1",
      px: Number.isFinite(px) ? Math.round(px * 10) / 10 : Math.round(parseFloat(s.fontSize) * scale * 10) / 10,
      boxes,
      clipped: Math.round(clipped),
      ...spillOf(el, boxes),
      contrast: worst ? Math.round(worst.contrast * 100) / 100 : null,
      color: worst?.color ?? null,
      bg: worst?.bg ?? null,
    });
  }

  const cards: QaCard[] = [];
  for (const el of Array.from(root.querySelectorAll('[data-mk="card"]'))) {
    const r = visibleRect(el);
    const o = opacity(el);
    if (!r || o <= 0.05) continue;
    cards.push({ scene: sceneOf(el), label: el.getAttribute("data-mk-label") || "card", box: [...r, o] });
  }

  const scenes = Array.from(root.querySelectorAll("[data-mk-scene]")).map((el) => ({
    index: Number(el.getAttribute("data-mk-scene")),
    opacity: Math.round(opacity(el) * 1000) / 1000,
  }));

  const round = (b: QaBox): QaBox => b.map((v, i) => (i === 4 ? Math.round(v * 1000) / 1000 : Math.round(v * 10) / 10)) as QaBox;
  for (const t of texts) t.boxes = t.boxes.map(round);
  for (const c of cards) c.box = round(c.box);
  return { frame, width: W, height: H, scenes, texts, cards };
};

/**
 * Measures each frame once fonts are in and layout has settled, logs the
 * result, and holds the render (delayRender) until it has.
 */
export const QaProbe: React.FC<{ plan: VideoPlan; ready: boolean; root: React.RefObject<HTMLDivElement | null> }> = ({
  plan,
  ready,
  root,
}) => {
  const frame = useCurrentFrame();
  const { delayRender, continueRender } = useDelayRender();
  const [first] = useState(() => delayRender("motion-kit QA: waiting for the first measurement"));
  const firstDone = useRef(false);

  // Layout effect: the hold is registered in the same commit as the new frame,
  // before Remotion releases its own "setting the frame" hold.
  useLayoutEffect(() => {
    if (!ready) return;
    const handle = delayRender(`motion-kit QA: measuring frame ${frame}`);
    let alive = true;
    const finish = () => {
      continueRender(handle);
      if (!firstDone.current) {
        firstDone.current = true;
        continueRender(first);
      }
    };
    document.fonts.ready.then(() =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (!alive) return;
          alive = false;
          let line: string;
          try {
            line = root.current ? QA_PREFIX + JSON.stringify(measureFrame(root.current, frame, plan)) : "";
          } catch (e) {
            line = `${QA_PREFIX}{"frame":${frame},"error":${JSON.stringify(String(e))}}`;
          }
          // Logged with no bundle code on the stack: the renderer still hands it to
          // onBrowserLog, but does not echo it into the terminal.
          if (line) queueMicrotask(console.log.bind(console, line));
          finish();
        }),
      ),
    );
    return () => {
      if (alive) {
        alive = false;
        finish();
      }
    };
  }, [frame, ready, plan, root, delayRender, continueRender, first]);

  return null;
};
