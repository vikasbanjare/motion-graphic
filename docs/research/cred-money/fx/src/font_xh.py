import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
import numpy as np, cv2
from playwright.sync_api import sync_playwright
from font_board import SERIF, render
from font_match import prep_ref
def metrics(m):
    m=(m>127).astype(np.int32)
    prof=m.mean(1); H=len(prof)
    core=np.nonzero(prof>0.45*prof.max())[0]          # x-height band
    top=0; xh_top=core.min(); base=core.max()
    asc=base-top; xh=base-xh_top
    # stroke weight: median horizontal run length inside x band / x-height
    runs=[]
    for r in range(xh_top+int(0.3*xh), xh_top+int(0.7*xh)):
        row=m[r]; d=np.diff(np.r_[0,row,0]); s=np.nonzero(d==1)[0]; e=np.nonzero(d==-1)[0]; runs+=list(e-s)
    return dict(xh_over_asc=xh/max(asc,1), stem_over_xh=float(np.median(runs))/max(xh,1))
ref=prep_ref('serif_ignorance'); print('REFERENCE', {k:round(v,3) for k,v in metrics(ref).items()})
with sync_playwright() as p:
    br=p.chromium.launch(executable_path='/opt/pw-browsers/chromium-1194/chrome-linux/chrome'); pg=br.new_page(viewport={'width':4400,'height':400})
    for lab,path,w,var in SERIF:
        g=render(pg,path,w,var,'ignorance to bliss',-0.02)
        # degrade to the reference's resolution before measuring (same pipeline as score())
        nat_h=ref.shape[0]/4; s=nat_h/g.shape[0]
        nat=cv2.resize(g,(int(g.shape[1]*s),int(g.shape[0]*s)),interpolation=cv2.INTER_AREA)
        up=cv2.GaussianBlur(cv2.resize(nat,None,fx=4,fy=4,interpolation=cv2.INTER_CUBIC),(0,0),1.0)
        _,m=cv2.threshold(up,0,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)
        print(f'{lab:32s}', {k:round(v,3) for k,v in metrics(m).items()})
    br.close()
