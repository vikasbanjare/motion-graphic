// node run.mjs jobs.json   — renders each job {name, subject, palette, plain, frame, params, w, h} to ../out/web/<name>.png
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.glsl': 'text/plain', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res);
}).listen(0);
const port = server.address().port;
const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const outDir = path.join(root, 'out', 'web'); fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox'],
});
for (const j of jobs) {
  const w = j.w || 1920, h = j.h || 1080;
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  const logs = []; page.on('console', m => logs.push(m.text())); page.on('pageerror', e => logs.push('ERR ' + e.message));
  const qs = new URLSearchParams({ subject: j.subject || 'stilllife', palette: j.palette || 'mint', plain: j.plain ? '1' : '0', frame: String(j.frame || 0), w: String(w), h: String(h), params: JSON.stringify(j.params || {}), ...(j.query || {}) });
  const t0 = Date.now();
  await page.goto(`http://127.0.0.1:${port}/web/scene.html?${qs}`);
  await page.waitForFunction(() => window.__done === true, null, { timeout: 180000 }).catch(e => logs.push('TIMEOUT'));
  const data = await page.evaluate(() => document.querySelector('canvas').toDataURL('image/png'));
  fs.writeFileSync(path.join(outDir, `${j.name}.png`), Buffer.from(data.split(',')[1], 'base64'));
  const info = await page.evaluate(() => window.__info);
  console.log(j.name, `${Date.now() - t0}ms`, JSON.stringify(info), logs.filter(l => !/GPU stall|swiftshader/i.test(l)).slice(0, 5).join(' | '));
  await page.close();
}
await browser.close(); server.close();
