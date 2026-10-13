// 15 s cutdown (14.4 s = 9 bars at 150 BPM) assembled from the master film.
// Every segment starts and ends on a beat (12 frames), so the music edit
// stays on the grid. Built from the same shots — no separate animation.
export type Segment = { from: number; to: number; note: string };

export const CUT15: Segment[] = [
  { from: 168, to: 252, note: "HOW MANY DO YOU OWN? → the 0 (hook on frame 1)" },
  { from: 252, to: 288, note: "Locked: somebody else's game?" },
  { from: 288, to: 336, note: "NOT ANYMORE." },
  { from: 456, to: 528, note: "Vacuum tail → the rip → US STOCKS" },
  { from: 552, to: 600, note: "Pick & BUY" },
  { from: 756, to: 852, note: "Customer by habit → Shareholder by choice (habits → slices)" },
  { from: 852, to: 900, note: "End card + CTA" },
];

export const cutLength = (segs: Segment[]) => segs.reduce((n, s) => n + (s.to - s.from), 0);
