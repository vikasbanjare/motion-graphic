// npm run studio [-- --port 5173] [--host]
// Opens Motion Studio: a step-by-step video maker in the browser (brief, references,
// style, look, storyboard, sound, make) with a live preview. Runs locally; specs are
// saved to motion-kit/specs/, uploads to public/, renders to out/.
import path from "node:path";
import { createServer } from "vite";
import { ROOT, c, parseArgs } from "./lib.mjs";
import { studioApi } from "../studio/server/api.mjs";

const args = parseArgs(process.argv.slice(2));
const port = Number(args.port ?? 5173);

const server = await createServer({
  configFile: false,
  root: path.join(ROOT, "studio"),
  publicDir: path.join(ROOT, "public"),
  plugins: [studioApi()],
  server: { port, host: args.host ? true : "localhost", strictPort: false, fs: { allow: [ROOT] } },
  oxc: { jsx: { runtime: "automatic" } },
  optimizeDeps: { include: ["react", "react-dom", "react-dom/client", "remotion", "@remotion/player", "zod"] },
  logLevel: "warn",
});
await server.listen();
const url = server.resolvedUrls?.local?.[0] ?? `http://localhost:${port}/`;
console.log(c.bold("\nMotion Studio is running: ") + c.green(url));
console.log(c.dim("Open it in your browser. Ctrl+C stops it.\n"));
