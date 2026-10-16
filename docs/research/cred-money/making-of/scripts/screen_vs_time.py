# Track line-screen period over time in one region: constant period during a camera zoom => screen-space; scaling period => texture/object-space.
import numpy as np
from PIL import Image
F='/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/ref1/f6/%04d.jpg'
def peak(n,box,pmin=1.6,pmax=8):
    im=np.asarray(Image.open(F%n).convert('L'),dtype=np.float64)/255.
    x0,y0,x1,y1=box; p=im[y0:y1,x0:x1]; p=p-p.mean()
    h,w=p.shape; S=np.abs(np.fft.fftshift(np.fft.fft2(p*np.outer(np.hanning(h),np.hanning(w)))))**2
    yy,xx=np.mgrid[0:h,0:w]; fy=(yy-h//2)/h; fx=(xx-w//2)/w; fr=np.hypot(fx,fy)
    S[(fr<1/pmax)|(fr>1/pmin)]=0
    i=np.argmax(S); y,x=divmod(i,w)
    return 1/fr[y,x], (np.degrees(np.arctan2(-fy[y,x],fx[y,x]))+90)%180, S[y,x]/max(S.sum(),1e-9)
import sys
for name,frames,box in [('columns scene (t=19..27s) left column',range(115,165,5),(0,60,70,330)),
                        ('lighthouse scene (t=34..38s) tower',range(205,235,4),(150,150,250,340)),
                        ('flower bill zoom (t=4..9s)',range(25,57,4),(320,60,620,340))]:
    print(name)
    for n in frames:
        per,ang,share=peak(n,box)
        print(f"  f{n:4d} t={(n-1)/6:5.2f}s period={per:5.2f}px angle={ang:5.1f} share={share:.3f}")
