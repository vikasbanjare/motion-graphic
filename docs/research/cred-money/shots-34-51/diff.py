import numpy as np, cv2, sys, glob, os
W=sys.argv[1]
fs=sorted(glob.glob(W+'/f24/*.png'))
ns=[int(os.path.basename(f)[:4]) for f in fs]
A=np.array([cv2.resize(cv2.imread(f),(320,180),interpolation=cv2.INTER_AREA) for f in fs]).astype(np.float32)
np.save(W+'/small.npy',A.astype(np.uint8)); np.save(W+'/ns.npy',np.array(ns))
d=np.abs(np.diff(A,axis=0)).mean(axis=(1,2,3))
def hist(f):
    hsv=cv2.cvtColor(f.astype(np.uint8),cv2.COLOR_BGR2HSV)
    h=cv2.calcHist([hsv],[0,1],None,[30,16],[0,180,0,256]).ravel()
    return h/h.sum()
H=np.array([hist(f) for f in A])
hd=np.abs(np.diff(H,axis=0)).sum(1)
for i in range(len(d)):
    n=ns[i+1]
    flag='***' if d[i]>12 or hd[i]>0.4 else ('*' if d[i]>6 else '')
    print(f"n={n} t={n/24:6.3f} mad={d[i]:5.2f} hist={hd[i]:.3f} {flag}")
