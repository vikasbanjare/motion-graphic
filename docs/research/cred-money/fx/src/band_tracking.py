import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
import numpy as np, cv2
from playwright.sync_api import sync_playwright
from font_board import render
T='/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/fonts/ttf/'
TEXT='TAKE A GOOD LOOK AT YOUR MONEY'
# measured at t=15.0 (640x360): cap height 11.38 px, ink span 509.8 px; t=14.25: capH 10.75, span 484.2; t=14.75: 9.75 / 508.0
MEAS=[(11.38,509.8),(10.75,484.2)]
with sync_playwright() as p:
    br=p.chromium.launch(executable_path='/opt/pw-browsers/chromium-1194/chrome-linux/chrome'); pg=br.new_page(viewport={'width':8000,'height':400})
    for lab,f,w in [('Lexend',T+'lexend-latin-500-normal.ttf',500),('Lexend',T+'lexend-latin-600-normal.ttf',600),('Poppins',T+'poppins-latin-600-normal.ttf',600),('Poppins',T+'poppins-latin-500-normal.ttf',500),('Montserrat',T+'montserrat-latin-600-normal.ttf',600),('Outfit',T+'outfit-latin-600-normal.ttf',600)]:
        g0=render(pg,f,w,'normal',TEXT,0.0); g1=render(pg,f,w,'normal','H',0.0)
        capH=g1.shape[0]; span0=g0.shape[1]          # at font-size 200px, ls=0
        out=[]
        for ch,sp in MEAS:
            k=ch/capH; span_scaled=span0*k; fs=200*k
            ls=(sp-span_scaled)/(fs*(len(TEXT)-1))
            out.append(ls)
        print(f'{lab} {w}: cap/em={capH/200:.3f}  letter-spacing needed = {np.mean(out):.3f} em (per measurement {[round(v,3) for v in out]})  font-size = capH/{capH/200:.3f}')
    br.close()
