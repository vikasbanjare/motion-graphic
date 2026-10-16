"""Speak each narration beat to its own file with a free voice engine.

Called by `npm run voice -- specs/x.json --engine kokoro|edge`. Reads JSON on stdin:
  {"engine": "kokoro", "beats": ["line one", ...], "voice": "af_heart", "lang": "en-us",
   "speed": 1.0, "dir": ".../out/.tmp/x-beats", "model": "...onnx", "voices": "...bin"}
Prints {"beats": [{"file": ..., "words": [{"text", "startMs", "endMs"}] | null}]}.

  kokoro  offline, Apache-2.0 weights, CPU.   pip install kokoro-onnx soundfile
  edge    online, Microsoft Edge read-aloud voices, real word timings.   pip install edge-tts
"""

import asyncio
import json
import os
import sys


def kokoro(job):
    import numpy as np
    import soundfile as sf
    from kokoro_onnx import Kokoro

    k = Kokoro(job["model"], job["voices"])
    if job["voice"] not in k.get_voices():
        sys.exit(f"Unknown Kokoro voice {job['voice']}. Choose one of: {', '.join(sorted(k.get_voices()))}")
    out = []
    for n, text in enumerate(job["beats"]):
        audio, sr = k.create(text, voice=job["voice"], speed=float(job.get("speed", 1.0)), lang=job["lang"])
        # Trim near-silence so the beat boundary is where speech starts and ends.
        loud = np.flatnonzero(np.abs(audio) > 0.01)
        if len(loud):
            pad = int(sr * 0.04)
            audio = audio[max(0, loud[0] - pad) : loud[-1] + pad]
        path = os.path.join(job["dir"], f"{n:03d}.wav")
        sf.write(path, audio, sr)
        out.append({"file": path, "words": None})
        print(f"  beat {n + 1}/{len(job['beats'])}", file=sys.stderr, flush=True)
    return out


async def edge(job):
    import edge_tts

    speed = float(job.get("speed", 1.0))
    rate = f"{round((speed - 1) * 100):+d}%"
    out = []
    for n, text in enumerate(job["beats"]):
        com = edge_tts.Communicate(text, job["voice"], rate=rate, boundary="WordBoundary")
        path = os.path.join(job["dir"], f"{n:03d}.mp3")
        words = []
        with open(path, "wb") as f:
            async for chunk in com.stream():
                if chunk["type"] == "audio":
                    f.write(chunk["data"])
                elif chunk["type"] == "WordBoundary":
                    # Offsets and durations are in 100-nanosecond ticks.
                    start = chunk["offset"] / 1e4
                    words.append({"text": chunk["text"], "startMs": start, "endMs": start + chunk["duration"] / 1e4})
        out.append({"file": path, "words": words or None})
        print(f"  beat {n + 1}/{len(job['beats'])}", file=sys.stderr, flush=True)
    return out


def main():
    job = json.load(sys.stdin)
    os.makedirs(job["dir"], exist_ok=True)
    if job["engine"] == "kokoro":
        beats = kokoro(job)
    elif job["engine"] == "edge":
        beats = asyncio.run(edge(job))
    else:
        sys.exit(f"Unknown engine {job['engine']}")
    print(json.dumps({"beats": beats}))


if __name__ == "__main__":
    main()
