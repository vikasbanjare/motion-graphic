# Render stills of the engraving prototype with headless Chromium (WebGL via SwiftShader/ANGLE).
# usage: python3 render_proto.py out_dir "scene=bird&pal=purple&t=0.3" [more query strings...]
import sys, os, subprocess, time, socket
from playwright.sync_api import sync_playwright

PROTO = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'proto')
out = sys.argv[1]; os.makedirs(out, exist_ok=True)
queries = sys.argv[2:]

def free_port():
    s = socket.socket(); s.bind(('127.0.0.1', 0)); p = s.getsockname()[1]; s.close(); return p

port = free_port()
srv = subprocess.Popen([sys.executable, '-m', 'http.server', str(port), '--bind', '127.0.0.1', '--directory', PROTO],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(0.8)
try:
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path='/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args=['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'])
        for qs in queries:
            w = int(dict(kv.split('=') for kv in qs.split('&')).get('w', 1280))
            h = int(dict(kv.split('=') for kv in qs.split('&')).get('h', 720))
            pg = b.new_page(viewport={'width': w, 'height': h})
            logs = []
            pg.on('console', lambda m: logs.append(m.text))
            pg.on('pageerror', lambda e: logs.append('ERR ' + str(e)))
            pg.goto(f'http://127.0.0.1:{port}/index.html?{qs}')
            try:
                pg.wait_for_function('window.__ready === true', timeout=120000)
            except Exception as e:
                print('timeout', qs, logs[-10:]); pg.close(); continue
            name = qs.replace('&', '_').replace('=', '-')
            path = os.path.join(out, name + '.png')
            pg.locator('canvas').screenshot(path=path)
            print('wrote', path, ('; logs: ' + ' | '.join(logs[-3:])) if logs else '')
            pg.close()
        b.close()
finally:
    srv.terminate()
