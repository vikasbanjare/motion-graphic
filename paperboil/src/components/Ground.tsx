import { AbsoluteFill } from "remotion";
import { color, type PaletteToken } from "../palette";

/** Flat or two-stop vertical gradient ground behind a shot. */
export const Ground: React.FC<{ tokens: PaletteToken[] }> = ({ tokens }) => {
  const bg =
    tokens.length === 1
      ? color(tokens[0])
      : `linear-gradient(180deg, ${tokens.map((t) => color(t)).join(", ")})`;
  return <AbsoluteFill style={{ background: bg }} />;
};
