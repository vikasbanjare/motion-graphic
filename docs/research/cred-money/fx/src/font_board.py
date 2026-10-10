import sys, base64, json
sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
import numpy as np, cv2
from playwright.sync_api import sync_playwright
FX='/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx'
T=FX+'/fonts/ttf/'; V=FX+'/fonts/x/'
from font_match import prep_ref, score
SERIF=[
 ('Source Serif 4 opsz60 w650', V+'fontsource-variable-source-serif-4-5.3.0/package/files/source-serif-4-latin-opsz-normal.woff2', 650, "'opsz' 60"),
 ('Source Serif 4 opsz60 w600', V+'fontsource-variable-source-serif-4-5.3.0/package/files/source-serif-4-latin-opsz-normal.woff2', 600, "'opsz' 60"),
 ('Source Serif 4 opsz60 w700', V+'fontsource-variable-source-serif-4-5.3.0/package/files/source-serif-4-latin-opsz-normal.woff2', 700, "'opsz' 60"),
 ('Source Serif 4 static 700', T+'source-serif-4-latin-700-normal.ttf', 700, 'normal'),
 ('Newsreader opsz72 w600', V+'fontsource-variable-newsreader-5.3.0/package/files/newsreader-latin-opsz-normal.woff2', 600, "'opsz' 72"),
 ('Newsreader opsz72 w700', V+'fontsource-variable-newsreader-5.3.0/package/files/newsreader-latin-opsz-normal.woff2', 700, "'opsz' 72"),
 ('Fraunces opsz72 w600 soft0', V+'fontsource-variable-fraunces-5.3.0/package/files/fraunces-latin-full-normal.woff2', 600, "'opsz' 72, 'SOFT' 0, 'WONK' 0"),
 ('Literata opsz72 w650', V+'fontsource-variable-literata-5.3.0/package/files/literata-latin-opsz-normal.woff2', 650, "'opsz' 72"),
 ('Merriweather 700', T+'merriweather-latin-700-normal.ttf', 700, 'normal'),
 ('Frank Ruhl Libre 700', T+'frank-ruhl-libre-latin-700-normal.ttf', 700, 'normal'),
 ('IBM Plex Serif 700', T+'ibm-plex-serif-latin-700-normal.ttf', 700, 'normal'),
 ('DM Serif Display 400', T+'dm-serif-display-latin-400-normal.ttf', 400, 'normal'),
 ('Playfair Display 700', T+'playfair-display-latin-700-normal.ttf', 700, 'normal'),
 ('Libre Caslon Text 700', T+'libre-caslon-text-latin-700-normal.ttf', 700, 'normal'),
 ('Instrument Serif 400 (in kit)', '/home/user/motion-graphic/motion-kit/public/fonts/InstrumentSerif.woff2', 400, 'normal'),
]
SANS=[(f'{n} {w}', T+f'{f}-latin-{w}-normal.ttf', w, 'normal') for f,n,w in [('lexend','Lexend',400),('lexend','Lexend',500),('poppins','Poppins',500),('urbanist','Urbanist',600),('outfit','Outfit',500),('jost','Jost',500),('rethink-sans','Rethink Sans',600),('afacad','Afacad',500),('plus-jakarta-sans','Plus Jakarta Sans',600),('manrope','Manrope',600),('montserrat','Montserrat',500),('inter','Inter',500)]]
def render(pg, path, w, var, text, ls):
    fmt='woff2' if path.endswith('woff2') else 'truetype'
    b=base64.b64encode(open(path,'rb').read()).decode()
    html=f"""<html><head><style>@font-face{{font-family:F;src:url(data:font/{fmt};base64,{b}) format('{fmt}');font-weight:100 900;}}
    body{{margin:0;background:#000}} span{{font-family:F;font-weight:{w};font-variation-settings:{var};font-size:200px;color:#fff;letter-spacing:{ls}em;line-height:1.3;white-space:nowrap;padding:40px;display:inline-block}}</style></head><body><span id=s>{text}</span></body></html>"""
    pg.set_content(html); pg.evaluate("async()=>{await document.fonts.load('700 200px F');}")
    png=pg.locator('#s').screenshot(); img=cv2.imdecode(np.frombuffer(png,np.uint8),cv2.IMREAD_GRAYSCALE)
    ys,xs=np.nonzero(img>40); return img[ys.min():ys.max()+1, xs.min():xs.max()+1]
def board(kind, cands, refname, text, out):
    ref=prep_ref(refname)
    rows=[]; res=[]
    with sync_playwright() as p:
        br=p.chromium.launch(executable_path='/opt/pw-browsers/chromium-1194/chrome-linux/chrome'); pg=br.new_page(viewport={'width':4400,'height':400})
        for lab,path,w,var in cands:
            best=None
            for ls in (-0.03,-0.02,-0.01,0.0,0.01,0.02):
                g=render(pg,path,w,var,text,ls); s=score(ref,g)
                sc=s[0]-0.5*abs(s[1])
                if best is None or sc>best[0]: best=(sc,ls,s,g)
            sc,ls,s,g=best; res.append((lab,ls,s)); 
            h=90; im=cv2.resize(g,(int(g.shape[1]*h/g.shape[0]),h),interpolation=cv2.INTER_AREA)
            rows.append((lab,ls,s,im))
        br.close()
    rr=cv2.resize(ref,(int(ref.shape[1]*90/ref.shape[0]),90),interpolation=cv2.INTER_AREA)
    Wd=max([r[3].shape[1] for r in rows]+[rr.shape[1]])+420
    def line(im,label):
        canvas=np.zeros((100,Wd),np.uint8); canvas[5:95,410:410+im.shape[1]]=im[:, :Wd-410]
        cv2.putText(canvas,label,(5,55),cv2.FONT_HERSHEY_SIMPLEX,0.55,200,1); return canvas
    rows.sort(key=lambda r: -(r[2][0]-0.5*abs(r[2][1])))
    img=np.vstack([line(rr,'REFERENCE (t=%s)'%refname)]+[line(r[3],f'{r[0]} ls={r[1]:+.2f} IoU={r[2][0]:.3f} asp={r[2][1]:+.3f}') for r in rows])
    cv2.imwrite(out,img)
    for r in rows: print(f'{kind}: {r[0]:32s} ls={r[1]:+.2f}em IoU={r[2][0]:.3f} aspect={r[2][1]:+.3f} ink={r[2][2]:.2f}')
if __name__=='__main__':
  board('serif',SERIF,'serif_ignorance','ignorance to bliss',FX+'/compare/font_board_serif.png')
  board('sans',SANS,'sans_track','track, analyze and reflect',FX+'/compare/font_board_sans.png')
