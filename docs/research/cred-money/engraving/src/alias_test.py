# Does the flower-layer line period move OPPOSITE to the layer's zoom? (aliasing signature)
import numpy as np, cv2, sys
sys.path.insert(0,'src')
from measure_lines2 import gray, peaks
def scale_between(t0,t1,box):
    a=cv2.GaussianBlur(gray(t0),(0,0),2).astype(np.uint8); b=cv2.GaussianBlur(gray(t1),(0,0),2).astype(np.uint8)
    x0,y0,x1,y1=box; m=np.zeros_like(a); m[y0:y1,x0:x1]=255
    orb=cv2.ORB_create(3000); ka,da=orb.detectAndCompute(a,m); kb,db=orb.detectAndCompute(b,None)
    mt=cv2.BFMatcher(cv2.NORM_HAMMING,crossCheck=True).match(da,db)
    pa=np.float32([ka[x.queryIdx].pt for x in mt]); pb=np.float32([kb[x.trainIdx].pt for x in mt])
    M,inl=cv2.estimateAffinePartial2D(pa,pb,method=cv2.RANSAC,ransacReprojThreshold=2.0)
    return float(np.hypot(M[0,0],M[1,0])), int(inl.sum()), len(mt)
box=(0,40,200,300)   # flower cluster (left)
ts=[6.5,7.0,7.5,8.0,8.5,9.0]
prevP=None
for i,t in enumerate(ts):
    g=gray(t); P,a,f=peaks(g[60:252,0:192],pad=512,pmin=1.95,pmax=6.5,k=1)[0]
    line=f"t={t:4.1f}  flower line period {P:.3f}px ang {a:.1f}"
    if i>0:
        s,ninl,nm=scale_between(ts[0],t,box)
        line+=f"   layer scale vs t=6.5: {s:.4f} ({ninl}/{nm} inliers)   period ratio vs t=6.5: {P/P0:.4f}"
    else: P0=P
    print(line)
