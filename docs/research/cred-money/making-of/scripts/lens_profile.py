# Measure the magnifier/loupe vignette: luminance along horizontal, vertical and diagonal rays from the lens centre.
import numpy as np
from PIL import Image
F='/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/ref1/f6/%04d.jpg'
for n in [310, 84, 88]:
    im=np.asarray(Image.open(F%n).convert('RGB'),dtype=np.float64)/255.
    L=im@np.array([0.2126,0.7152,0.0722])
    H,W=L.shape
    # estimate lens centre as centroid of bright pixels (L>0.25) with darkness mask
    m=L>0.25; ys,xs=np.nonzero(m); cx,cy=xs.mean(),ys.mean()
    print(f"frame {n} t={(n-1)/6:.2f}s centre~({cx:.0f},{cy:.0f}) of {W}x{H}")
    for name,(dx,dy) in {'right':(1,0),'left':(-1,0),'down':(0,1),'up':(0,-1),'diag-dr':(0.7071,0.7071)}.items():
        prof=[]
        for r in range(0,int(np.hypot(W,H)/2)+40,1):
            x=int(round(cx+dx*r)); y=int(round(cy+dy*r))
            if 0<=x<W and 0<=y<H: prof.append(L[max(0,y-1):y+2,max(0,x-1):x+2].mean())
            else: break
        prof=np.array(prof)
        # radius where luminance falls to 50% / 10% of the inner median
        inner=np.median(prof[:max(5,len(prof)//3)])
        def first_below(fr):
            idx=np.nonzero(prof<inner*fr)[0]; return idx[0] if len(idx) else None
        r50=first_below(0.5); r10=first_below(0.1); r90=first_below(0.9)
        print(f"   {name:8s} inner={inner:.2f} r90={r90} r50={r50} r10={r10} end={len(prof)} minL={prof.min():.3f}")
