/**
 * Gradient-map ("duotone/tritone") grading as an SVG filter: luminance -> 16-stop LUT measured per scene.
 * Usage: <DuotoneDefs id="mint" stops={SCENE_LUTS.lighthouse_mint.stops}/> once, then style={{filter:"url(#mint)"}}.
 * color-interpolation-filters=sRGB so the table indexes gamma-encoded luma (matches how the LUTs were measured).
 */
import React from "react";
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
export const DuotoneDefs: React.FC<{ id: string; stops: readonly string[]; contrast?: number }> = ({ id, stops, contrast = 1 }) => {
  const rgb = stops.map(hex);
  const ch = (k: number) => rgb.map((c) => c[k].toFixed(4)).join(" ");
  const k = contrast, o = 0.5 - 0.5 * contrast;
  return (
    <svg width={0} height={0} style={{ position: "absolute" }} aria-hidden>
      <filter id={id} colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%">
        <feColorMatrix type="matrix" values={`0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0`} />
        <feComponentTransfer>
          <feFuncR type="linear" slope={k} intercept={o} /><feFuncG type="linear" slope={k} intercept={o} /><feFuncB type="linear" slope={k} intercept={o} />
        </feComponentTransfer>
        <feComponentTransfer>
          <feFuncR type="table" tableValues={ch(0)} /><feFuncG type="table" tableValues={ch(1)} /><feFuncB type="table" tableValues={ch(2)} />
        </feComponentTransfer>
      </filter>
    </svg>
  );
};
/** 3-stop helper for per-object inks (shadow ink -> mid -> paper), e.g. from SCENE_INKS. */
export const tritone = (shadow: string, mid: string, paper: string, n = 16) => {
  const a = hex(shadow), b = hex(mid), c = hex(paper); const out: string[] = [];
  for (let i = 0; i < n; i++) { const t = i / (n - 1); const [p, q, u] = t < 0.5 ? [a, b, t * 2] : [b, c, (t - 0.5) * 2];
    out.push("#" + p.map((v, j) => Math.round((v + (q[j] - v) * u) * 255).toString(16).padStart(2, "0")).join("")); }
  return out;
};
