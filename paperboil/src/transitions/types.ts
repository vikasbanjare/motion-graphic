import type { Layout } from "../layout";
import type { Shot } from "../storyboard";

export type TransitionCtx = {
  params: Record<string, unknown>;
  layout: Layout;
  from: Shot;
  to: Shot;
};

/**
 * A transition runs over the last N frames of the outgoing shot (exit, p 0→1)
 * and the first N frames of the incoming shot (enter, p 0→1). Shots never
 * overlap, so every shot keeps exact storyboard timing.
 */
export type TransitionImpl = {
  exitStyle?: (p: number, ctx: TransitionCtx) => React.CSSProperties;
  enterStyle?: (p: number, ctx: TransitionCtx) => React.CSSProperties;
  ExitOverlay?: React.FC<{ p: number; ctx: TransitionCtx }>;
  EnterOverlay?: React.FC<{ p: number; ctx: TransitionCtx }>;
  /** Paint the next shot's ground behind the exiting shot (for shrink-to-point). */
  revealNextGround?: boolean;
};

/** Anchor params are fractions of the shot's 1000×1000 art box; convert to frame px. */
export const anchorPx = (ctx: TransitionCtx, key = "anchor", shot: Shot = ctx.from): [number, number] => {
  const a = (ctx.params[key] as [number, number] | undefined) ?? [0.5, 0.5];
  const box = ctx.layout.artBox(shot.layout);
  return [box.x + a[0] * box.size, box.y + a[1] * box.size];
};
