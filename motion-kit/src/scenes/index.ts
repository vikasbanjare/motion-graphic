import type React from "react";
import type { SceneOf, SceneType } from "../engine/schema.ts";
import { Bars } from "./Bars.tsx";
import { Chat } from "./Chat.tsx";
import { Clip } from "./Clip.tsx";
import { Compare } from "./Compare.tsx";
import { Cta } from "./Cta.tsx";
import { Grid } from "./Grid.tsx";
import { Hook } from "./Hook.tsx";
import { ImageScene } from "./Image.tsx";
import { Kinetic } from "./Kinetic.tsx";
import { List } from "./List.tsx";
import { Logo } from "./Logo.tsx";
import { OrbScene } from "./OrbScene.tsx";
import { Prompt } from "./Prompt.tsx";
import { Wave } from "./Wave.tsx";
import { Quote } from "./Quote.tsx";
import { Stat } from "./Stat.tsx";
import { Title } from "./Title.tsx";

export const SCENES: { [K in SceneType]: React.FC<{ scene: SceneOf<K> }> } = {
  title: Title,
  hook: Hook,
  kinetic: Kinetic,
  stat: Stat,
  list: List,
  compare: Compare,
  quote: Quote,
  chat: Chat,
  bars: Bars,
  grid: Grid,
  image: ImageScene,
  clip: Clip,
  orb: OrbScene,
  wave: Wave,
  prompt: Prompt,
  cta: Cta,
  logo: Logo,
};
