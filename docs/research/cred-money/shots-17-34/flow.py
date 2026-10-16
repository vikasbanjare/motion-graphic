import numpy as np, cv2, sys, json
W=sys.argv[1]
a=np.fromfile(W+'/f24_16_35.raw',np.uint8).reshape(-1,180,320,3)
t0=16.0
g=[cv2.cvtColor(f,cv2.COLOR_RGB2GRAY) for f in a]
ys,xs=np.mgrid[8:172:6,8:312:6]
rows=[]
for i in range(len(g)-1):
    fl=cv2.calcOpticalFlowFarneback(g[i],g[i+1],None,0.5,4,21,3,5,1.1,0)
    mag=np.linalg.norm(fl,axis=2)
    p0=np.stack([xs.ravel(),ys.ravel()],1).astype(np.float32)
    d=fl[ys.ravel(),xs.ravel()]
    p1=p0+d
    # ignore near-black lens pixels
    lum=g[i][ys.ravel(),xs.ravel()]
    ok=lum>40
    M,inl=cv2.estimateAffinePartial2D(p0[ok],p1[ok],method=cv2.RANSAC,ransacReprojThreshold=1.0) if ok.sum()>20 else (None,None)
    if M is None:
        s=1;r=0;tx=ty=0;inr=0
    else:
        s=np.sqrt(M[0,0]**2+M[1,0]**2); r=np.degrees(np.arctan2(M[1,0],M[0,0]))
        # translation of frame centre
        c=np.array([160,90]); cn=M[:,:2]@c+M[:,2]; tx,ty=cn-c
        inr=inl.mean()
    t=t0+(i+0.5)/24
    rows.append(dict(t=round(t,4),mag=float(np.median(mag[lum.reshape(ys.shape) if False else slice(None)])) ,mean=float(mag.mean()),p90=float(np.percentile(mag,90)),s=float(s),r=float(r),tx=float(tx),ty=float(ty),inl=float(inr)))
json.dump(rows,open(W+'/flow.json','w'))
for r in rows:
    print(f"{r['t']:7.3f} mean={r['mean']:5.2f} p90={r['p90']:5.2f} scale={r['s']:.4f} rot={r['r']:+.3f} tx={r['tx']:+6.2f} ty={r['ty']:+6.2f} inl={r['inl']:.2f}")
