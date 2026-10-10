# Count tone levels (posterization) inside object regions: histogram of luminance, report peaks.
import numpy as np
from PIL import Image
F='/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/ref1/f6/%04d.jpg'
def hist_peaks(n,box,label):
    im=np.asarray(Image.open(F%n).convert('RGB'),dtype=np.float64)
    x0,y0,x1,y1=box; p=im[y0:y1,x0:x1].reshape(-1,3)
    L=p@np.array([0.2126,0.7152,0.0722])
    h,_=np.histogram(L,bins=64,range=(0,255)); hs=np.convolve(h,np.ones(3)/3,'same')
    peaks=[i for i in range(1,63) if hs[i]>hs[i-1] and hs[i]>=hs[i+1] and hs[i]>0.03*hs.max()]
    print(f"{label:22s} f{n} t={(n-1)/6:.2f}s  L p5/p50/p95={np.percentile(L,5):.0f}/{np.percentile(L,50):.0f}/{np.percentile(L,95):.0f}  peaks(L)={[int(i*4+2) for i in peaks]}")
    # mean colour of dark/light thirds
    o=np.argsort(L); k=len(o)//5
    dark=p[o[:k]].mean(0); light=p[o[-k:]].mean(0); mid=p[o[2*k:3*k]].mean(0)
    print(f"{'':22s} dark20%={dark.round().astype(int)} mid={mid.round().astype(int)} light20%={light.round().astype(int)}")
hist_peaks(49,(330,170,410,330),'hummingbird body')
hist_peaks(43,(330,170,410,330),'hummingbird body')
hist_peaks(31,(380,100,600,300),'flowers')
hist_peaks(142,(0,60,70,330),'column (peach/red)')
hist_peaks(205,(150,150,250,340),'lighthouse (green)')
hist_peaks(244,(300,250,500,350),'seabed (grey)')
hist_peaks(172,(40,250,200,350),'turtle (foil)')
