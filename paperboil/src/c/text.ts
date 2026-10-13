import { color } from "../palette";
import { getShot, storyboard, type TextEvent } from "../storyboard";
import { sec } from "../timing";

/**
 * Style C type is designed into each composition, but the copy, timing and
 * colours still come from storyboard.json (so check-timing validates them).
 * Returns the event plus its start/end in the shot's local frames.
 */
export const textOf = (id: string) => {
  const ev = storyboard.text.find((t) => t.id === id) as TextEvent | undefined;
  if (!ev) throw new Error(`No text event "${id}" in storyboard.json`);
  const shot = getShot(ev.shot);
  return {
    ev,
    text: ev.text,
    at: sec(ev.start) - sec(shot.start),
    until: sec(ev.end) - sec(shot.start),
    color: color(ev.color),
  };
};
