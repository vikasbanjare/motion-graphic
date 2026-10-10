import numpy as np, sys
W=sys.argv[1]
a=np.fromfile(W+'/f24_16_35.raw',np.uint8).reshape(-1,180,320,3).astype(np.float32)
t0=16.0
d=np.abs(np.diff(a,axis=0)).mean(axis=(1,2,3))
# histogram diff
def hist(f):
    h=[np.histogram(f[...,c],bins=16,range=(0,256))[0] for c in range(3)]
    return np.concatenate(h)/f[...,0].size
H=np.array([hist(f) for f in a])
hd=np.abs(np.diff(H,axis=0)).sum(1)
for i in range(len(d)):
    t=t0+(i+1)/24
    flag='***' if d[i]>12 or hd[i]>0.5 else ''
    print(f"{t:6.3f} f{int(round(t*24))} mad={d[i]:5.2f} hist={hd[i]:.3f} {flag}")
