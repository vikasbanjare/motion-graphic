/** SVG path builders (art-box px) for silhouette morphs. */
export const rectPath = (x: number, y: number, w: number, h: number, r = 0): string => {
  const rr = Math.min(r, w / 2, h / 2);
  return `M${x + rr},${y} H${x + w - rr} Q${x + w},${y} ${x + w},${y + rr} V${y + h - rr} Q${x + w},${y + h} ${x + w - rr},${y + h} H${x + rr} Q${x},${y + h} ${x},${y + h - rr} V${y + rr} Q${x},${y} ${x + rr},${y} Z`;
};
export const ellipsePath = (cx: number, cy: number, rx: number, ry: number): string =>
  `M${cx - rx},${cy} A${rx},${ry} 0 1,0 ${cx + rx},${cy} A${rx},${ry} 0 1,0 ${cx - rx},${cy} Z`;
export const archPath = (x: number, y: number, w: number, h: number): string => {
  const r = w / 2;
  return `M${x},${y + h} V${y + r} A${r},${r} 0 0,1 ${x + w},${y + r} V${y + h} Z`;
};
export const pinPath = (cx: number, cy: number, r: number): string =>
  `M${cx},${cy + r * 2.1} C${cx - r * 0.4},${cy + r * 1.4} ${cx - r},${cy + r * 0.9} ${cx - r},${cy} A${r},${r} 0 1,1 ${cx + r},${cy} C${cx + r},${cy + r * 0.9} ${cx + r * 0.4},${cy + r * 1.4} ${cx},${cy + r * 2.1} Z`;
