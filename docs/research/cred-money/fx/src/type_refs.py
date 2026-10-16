import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
from common import *
import json
# (name, t, box y0,y1,x0,x1, text, ink_is_light)
REFS=[
 ('serif_ignorance',57.5,(148,182,118,340),'ignorance to bliss',True),
 ('serif_multiple',24.0,(28,62,218,456),'multiple banks.',False),
 ('serif_single',24.0,(58,88,240,400),'single view.',False),
 ('serif_findings',43.5,(48,82,175,515),'keep the findings to yourself',False),
 ('sans_track',57.5,(188,206,118,300),'track, analyze and reflect',True),
 ('sans_onyour',57.5,(203,222,118,220),'on your money',True),
 ('sans_alltrans',24.0,(88,106,235,425),'all transactions in one place',False),
 ('caps_band',15.0,(172,192,60,585),'TAKE A GOOD LOOK AT YOUR MONEY',True),
]
def ref_mask(t,box,light):
    y0,y1,x0,x1=box; f=at(t)[y0:y1,x0:x1]
    up=cv2.resize(f,None,fx=4,fy=4,interpolation=cv2.INTER_CUBIC)
    if light:
        h=hsv(up); g=(h[...,2]*(1-h[...,1])*255).astype(np.uint8)  # white = high V low S
    else:
        lab=cv2.cvtColor(up,cv2.COLOR_BGR2LAB); g=255-lab[...,0]
    g=cv2.GaussianBlur(g,(0,0),1.0)
    thr,m=cv2.threshold(g,0,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)
    return g,m
if __name__=='__main__':
    ims=[]
    for name,t,box,text,light in REFS:
        g,m=ref_mask(t,box,light)
        ys,xs=np.nonzero(m)
        print(name,'ink bbox (native px) w=%.1f h=%.1f'%((xs.max()-xs.min())/4,(ys.max()-ys.min())/4))
        cv2.imwrite(f'{FX}/fonts/ref_{name}.png',m)
        ims.append(cv2.resize(np.hstack([g,m]),(1200,int(1200*g.shape[0]/(2*g.shape[1])))))
    save('out/type_ref_masks.png',np.vstack(ims))
