import numpy as np, cv2, sys
W=sys.argv[1]; a0=int(sys.argv[2]); b0=int(sys.argv[3]); step=int(sys.argv[4])
excl=[tuple(map(int,e.split(':'))) for e in sys.argv[5].split(',')] if len(sys.argv)>5 and sys.argv[5] else []
sift=cv2.SIFT_create(3000)
def load(n):
    im=cv2.imread(f'{W}/f24/{n:04d}.png',0)
    m=np.full(im.shape,255,np.uint8)
    for x0,y0,x1,y1 in excl: m[y0:y1,x0:x1]=0
    m[im<50]=0
    return im,m
ref=None; cum=np.eye(3)
print("n t scale_vs_prev zoom_per_s pan_x%W/s pan_y%W/s rot_deg/s inliers | cum_scale cum_dx%W cum_dy%W")
for n in range(a0,b0,step):
    m2=min(n+step,b0)
    A,ma=load(n); B,mb=load(m2)
    ka,da=sift.detectAndCompute(A,ma); kb,db=sift.detectAndCompute(B,mb)
    if da is None or db is None: print(n,'nofeat'); continue
    mt=cv2.BFMatcher().knnMatch(da,db,k=2)
    good=[x[0] for x in mt if len(x)==2 and x[0].distance<0.75*x[1].distance]
    if len(good)<8: print(n,'few',len(good)); continue
    p=np.float32([ka[g.queryIdx].pt for g in good]); q=np.float32([kb[g.trainIdx].pt for g in good])
    M,inl=cv2.estimateAffinePartial2D(p,q,method=cv2.RANSAC,ransacReprojThreshold=1.5)
    k=m2-n
    s=np.hypot(M[0,0],M[1,0]); r=np.degrees(np.arctan2(M[1,0],M[0,0]))
    c=np.array([320,180]); d=M[:,:2]@c+M[:,2]-c
    cum=np.vstack([M,[0,0,1]])@cum
    cs=np.hypot(cum[0,0],cum[1,0]); cd=cum[:2,:2]@c+cum[:2,2]-c
    print(f"{n}->{m2} {n/24:.3f} s={s:.4f} zoom/s={s**(24/k):.3f} px={d[0]/k*24/640*100:+6.2f} py={d[1]/k*24/640*100:+6.2f} rot={r/k*24:+6.2f} inl={int(inl.sum())}/{len(good)} | {cs:.3f} {cd[0]/640*100:+.1f} {cd[1]/640*100:+.1f}")
