import { Html5Audio, Sequence, getStaticFiles, staticFile } from "remotion";
import cues from "../audio/cues.json";
import { storyboard } from "../storyboard";
import { sec } from "../timing";

const db = (d: number) => Math.pow(10, d / 20);
const exists = (name: string) => getStaticFiles().some((f) => f.name === name);

/**
 * Music bed + SFX cues + optional VO. Music and SFX are hard-gated to silence
 * for the vacuum (15.5–16.0) — a gate, not a fade — and the music is ducked
 * under the VO when a VO file is configured.
 */
export const Soundtrack: React.FC = () => {
  const { music, musicGainDb, vo, voDuckDb } = storyboard.audio;
  const gateFrom = sec(storyboard.meta.vacuum.start);
  const gateTo = sec(storyboard.meta.vacuum.end);
  const voWindows = vo ? storyboard.captions.map((c) => [sec(c.start), sec(c.end)] as const) : [];

  const musicVolume = (f: number) => {
    if (f >= gateFrom && f < gateTo) return 0;
    const ducked = voWindows.some(([a, b]) => f >= a && f < b);
    return db(musicGainDb + (ducked ? voDuckDb : 0));
  };

  return (
    <>
      {exists(music) ? <Html5Audio src={staticFile(music)} volume={musicVolume} /> : null}
      {vo && exists(vo) ? <Html5Audio src={staticFile(vo)} /> : null}
      {cues.cues.map((c) =>
        exists(c.file) ? (
          <Sequence key={c.id} from={c.frame} name={`sfx:${c.id}`} layout="none">
            {/* SFX tails are gated too, so nothing rings into the vacuum. */}
            <Html5Audio src={staticFile(c.file)} volume={(f) => (c.frame + f >= gateFrom && c.frame + f < gateTo ? 0 : db(c.gainDb))} />
          </Sequence>
        ) : null,
      )}
    </>
  );
};
