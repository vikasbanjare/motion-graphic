# Measure dominant line-screen period/orientation in patches of reference frames via 2D FFT.
import sys, numpy as np
from PIL import Image
F='/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/ref1/f6/%04d.jpg'
def analyze(n, box, label):
    im=np.asarray(Image.open(F%n).convert('L'),dtype=np.float64)/255.
    x0,y0,x1,y1=box; p=im[y0:y1,x0:x1]
    p=p-p.mean()
    h,w=p.shape
    win=np.outer(np.hanning(h),np.hanning(w))
    S=np.abs(np.fft.fftshift(np.fft.fft2(p*win)))**2
    cy,cx=h//2,w//2
    yy,xx=np.mgrid[0:h,0:w]
    fy=(yy-cy)/h; fx=(xx-cx)/w
    fr=np.hypot(fx,fy)
    S[fr<1/10.]=0   # keep only periods <= 10 px (screen band)
    S[fr>0.5]=0
    # take top peaks
    idx=np.argsort(S.ravel())[::-1]
    out=[]; used=[]
    for i in idx[:400]:
        y,x=divmod(i,w)
        f=(fx[y,x],fy[y,x])
        if any(np.hypot(f[0]-u[0],f[1]-u[1])<0.02 or np.hypot(f[0]+u[0],f[1]+u[1])<0.02 for u in used): continue
        used.append(f)
        per=1/np.hypot(*f)
        # orientation of the LINES (perpendicular to wave vector), degrees, image coords (y down) -> convert to math (y up)
        ang_k=np.degrees(np.arctan2(-f[1],f[0]))
        ang_lines=(ang_k+90)%180
        out.append((S[y,x],per,ang_lines))
        if len(out)>=3: break
    tot=S.sum()
    print(f"{label:28s} frame {n:4d} t={(n-1)/6:5.2f}s box={box} ->", "; ".join(f"period={o[1]:.2f}px lines@{o[2]:.0f}deg share={o[0]/tot:.3f}" for o in out))
jobs=[(205,(160,180,240,330),'lighthouse lower tower'),(142,(0,60,60,330),'left column far'),(205,(150,40,260,170),'lighthouse tower'),(205,(0,180,180,330),'rock'),(142,(20,120,90,300),'left column'),(142,(530,120,600,300),'right column'),(172,(40,250,200,350),'turtle'),(49,(300,160,420,320),'hummingbird body'),(31,(320,80,560,300),'flowers/branch'),(244,(300,250,500,350),'seabed'),(37,(0,0,120,200),'intro wavy lines')]
for n,b,l in jobs:
    try: analyze(n,b,l)
    except Exception as e: print(l,e)
