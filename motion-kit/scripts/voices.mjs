// Voice engines and a short list of good narration voices for each. Used by
// `npm run voice` and the Studio's Sound step. Any engine voice id also works with --voice.

export const VOICE_ENGINES = {
  kokoro: {
    label: "Kokoro (free, offline)",
    cost: "Free. Runs on your computer, no account, no internet after a one-time ~115 MB download.",
    setup: "pip install kokoro-onnx soundfile",
    licence: "Apache-2.0 model: fine for commercial videos.",
    timing: "Scene cuts exact; word timing estimated inside each line.",
    voices: [
      { id: "af_heart", label: "Heart · US female, warm (best overall)", lang: "en" },
      { id: "af_bella", label: "Bella · US female, bright", lang: "en" },
      { id: "am_michael", label: "Michael · US male, steady", lang: "en" },
      { id: "am_fenrir", label: "Fenrir · US male, energetic", lang: "en" },
      { id: "bf_emma", label: "Emma · UK female", lang: "en" },
      { id: "bm_george", label: "George · UK male", lang: "en" },
      { id: "hf_alpha", label: "Alpha · Hindi female", lang: "hi" },
      { id: "hm_omega", label: "Omega · Hindi male", lang: "hi" },
    ],
  },
  edge: {
    label: "Microsoft Edge voices (free, online)",
    cost: "Free, no account. Uses the Edge browser's read-aloud service over the internet.",
    setup: "pip install edge-tts",
    licence: "Unofficial use of a consumer service: fine for drafts and personal videos; for paid client work prefer Kokoro, Gemini or ElevenLabs.",
    timing: "Real word timings from the service.",
    voices: [
      { id: "en-IN-NeerjaExpressiveNeural", label: "Neerja · Indian English female, expressive (good for Hinglish)", lang: "en" },
      { id: "en-IN-PrabhatNeural", label: "Prabhat · Indian English male (good for Hinglish)", lang: "en" },
      { id: "hi-IN-SwaraNeural", label: "Swara · Hindi female", lang: "hi" },
      { id: "hi-IN-MadhurNeural", label: "Madhur · Hindi male", lang: "hi" },
      { id: "en-US-AvaMultilingualNeural", label: "Ava · US female, natural", lang: "en" },
      { id: "en-US-AndrewMultilingualNeural", label: "Andrew · US male, natural", lang: "en" },
      { id: "en-US-EmmaMultilingualNeural", label: "Emma · US female, friendly", lang: "en" },
      { id: "en-GB-RyanNeural", label: "Ryan · UK male", lang: "en" },
    ],
  },
  gemini: {
    label: "Google Gemini TTS (free tier, online)",
    cost: "Free tier with daily limits on a Google AI Studio key (GEMINI_API_KEY). Very natural; takes a style instruction.",
    setup: "Get a key at aistudio.google.com → Get API key, then export GEMINI_API_KEY=…",
    licence: "Google's API terms; generated audio is yours to use.",
    timing: "Scene cuts exact; word timing estimated inside each line.",
    voices: [
      { id: "Kore", label: "Kore · firm, clear", lang: "any" },
      { id: "Puck", label: "Puck · upbeat", lang: "any" },
      { id: "Charon", label: "Charon · informative, calm", lang: "any" },
      { id: "Zephyr", label: "Zephyr · bright", lang: "any" },
      { id: "Fenrir", label: "Fenrir · excitable", lang: "any" },
      { id: "Aoede", label: "Aoede · breezy", lang: "any" },
      { id: "Sulafat", label: "Sulafat · warm", lang: "any" },
      { id: "Achird", label: "Achird · friendly", lang: "any" },
    ],
  },
  elevenlabs: {
    label: "ElevenLabs (paid, most realistic)",
    cost: "About 1 credit per character on multilingual v2; free plan has a small monthly allowance. Needs ELEVENLABS_API_KEY.",
    setup: "ElevenLabs → Profile → API keys, then export ELEVENLABS_API_KEY=…",
    licence: "Commercial use needs a paid plan.",
    timing: "Real character timings from the service.",
    voices: [],
  },
};

export const defaultVoice = (engine, hindi) =>
  ({
    kokoro: hindi ? "hf_alpha" : "af_heart",
    edge: hindi ? "hi-IN-SwaraNeural" : "en-US-AvaMultilingualNeural",
    gemini: "Kore",
  })[engine];
