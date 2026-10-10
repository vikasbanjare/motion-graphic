# Average luminance over a run of lens frames (content moves, lens is fixed) and fit the vignette edge per angle.
import numpy as np
from PIL import Image
F='/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/ref1/f6/%04d.jpg'
def run(frames,label):
    acc=None
    for n in frames:
        im=np.asarray(Image.open(F%n).convert('RGB'),dtype=np.float64)/255.
        acc=im if acc is None else acc+im
    im=acc/len(frames); L=im@np.array([0.2126,0.7152,0.0722]); H,W=L.shape
    Image.fromarray((np.clip(L,0,1)*255).astype(np.uint8)).save(f'../lens_mean_{label}.png')
    cx,cy=W/2,H/2
    yy,xx=np.mgrid[0:H,0:W]; r=np.hypot(xx-cx,yy-cy); th=(np.degrees(np.arctan2(yy-cy,xx-cx))+360)%360
    print(label, 'frames',frames[0],'-',frames[-1])
    for a0 in range(0,360,30):
        sel=(th>=a0-10)&(th<a0+10)
        rb=np.arange(0,380,4); prof=[]
        for r0 in rb:
            s=sel&(r>=r0)&(r<r0+4)
            prof.append(L[s].mean() if s.sum()>3 else np.nan)
        prof=np.array(prof); valid=~np.isnan(prof)
        inner=np.nanmedian(prof[:20])
        below=np.nonzero(valid&(prof<0.5*inner))[0]
        below90=np.nonzero(valid&(prof<0.9*inner))[0]
        print(f"  angle {a0:3d}: inner L={inner:.2f}  r90={rb[below90[0]] if len(below90) else '>edge'}  r50={rb[below[0]] if len(below) else '>edge'}  minL={np.nanmin(prof):.3f}")
    # colour of the ring at r ~ 0.85-0.95 of r50 horizontally
    return L
run(list(range(81,101)),'A_t13-16')
run(list(range(301,315)),'B_t50-52')
