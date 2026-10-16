import numpy as np, cv2, sys, json
W=sys.argv[1]
A=np.load(W+'/small.npy'); ns=np.load(W+'/ns.npy')
G=[cv2.cvtColor(a,cv2.COLOR_BGR2GRAY) for a in A]
h,w=G[0].shape
ys,xs=np.mgrid[4:h-4:6,4:w-4:6]
out=[]
for i in range(len(G)-1):
    a,b=G[i],G[i+1]
    f=cv2.calcOpticalFlowFarneback(a,b,None,0.5,4,21,4,7,1.5,0)
    gx=cv2.Sobel(a,cv2.CV_32F,1,0);gy=cv2.Sobel(a,cv2.CV_32F,0,1)
    gm=np.hypot(gx,gy)
    m=(gm[ys,xs]>20)&(a[ys,xs]>45)
    p=np.stack([xs[m],ys[m]],1).astype(np.float32)
    q=p+f[ys[m],xs[m]]
    mag=np.hypot(f[...,0],f[...,1])
    rec={'n':int(ns[i+1]),'t':round(float(ns[i+1])/24,3),'medmag':float(np.median(mag)),'p90':float(np.percentile(mag,90))}
    if len(p)>30:
        M,inl=cv2.estimateAffinePartial2D(p,q,method=cv2.RANSAC,ransacReprojThreshold=0.7,maxIters=3000,confidence=0.995)
        if M is not None:
            s=float(np.hypot(M[0,0],M[1,0])); r=float(np.degrees(np.arctan2(M[1,0],M[0,0])))
            c=np.array([w/2,h/2]); cc=M[:,:2]@c+M[:,2]
            d=cc-c
            rec.update(scale=s,rot=r,dx=float(d[0]),dy=float(d[1]),inl=float(inl.mean()),npts=int(len(p)))
    out.append(rec)
json.dump(out,open(W+'/flow.json','w'))
for r in out:
    if 'scale' in r:
        print(f"n{r['n']} {r['t']:.3f} med={r['medmag']:.2f} p90={r['p90']:.2f} zoom/s={(r['scale']**24):.3f} panx={r['dx']*24/w*100:+6.1f}%W/s pany={r['dy']*24/w*100:+6.1f}%W/s rot={r['rot']*24:+5.2f}deg/s inl={r['inl']:.2f}")
    else: print(r)
