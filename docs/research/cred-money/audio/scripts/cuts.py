import subprocess, numpy as np, sys
V='/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/ref1/in/ref.mp4'
W,H=160,90
raw=subprocess.run(['ffmpeg','-v','error','-i',V,'-vf',f'scale={W}:{H}','-f','rawvideo','-pix_fmt','rgb24','-'],capture_output=True).stdout
F=np.frombuffer(raw,np.uint8).reshape(-1,H,W,3).astype(np.float32)/255
n=len(F); t=np.arange(n)/24
# mean abs diff between consecutive frames
d=np.abs(F[1:]-F[:-1]).mean(axis=(1,2,3))
# histogram (chi) diff on gray to separate cuts from motion
g=F.mean(3)
hist=np.stack([np.histogram(x,bins=32,range=(0,1))[0] for x in g]).astype(np.float32)/(W*H)
hd=0.5*np.abs(hist[1:]-hist[:-1]).sum(1)
lum=g.mean((1,2))
np.save('vis.npy',np.stack([t[1:],d,hd]))
np.save('lum.npy',np.stack([t,lum]))
# cut = diff spike: d > 3x local median and > 0.06
from scipy.ndimage import median_filter
med=median_filter(d,size=13)
cand=np.where((d>np.maximum(3*med,0.05)))[0]
print('n frames',n)
print('median frame diff (motion)',np.median(d).round(4))
for i in cand:
    print(f"cut? t={t[i+1]:6.3f}s frame {i+1}  diff={d[i]:.3f} med={med[i]:.3f} histdiff={hd[i]:.3f}")
