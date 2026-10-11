import cv2, numpy as np, sys, json
W=sys.argv[1]; a=int(sys.argv[2]); b=int(sys.argv[3])
roi=[float(x) for x in sys.argv[4].split(',')] if len(sys.argv)>4 else [0,0,1,1]  # x0,y0,x1,y1 fractions
w,h=320,180
ys,xs=np.mgrid[3:h-3:4,3:w-3:4]
pts=np.stack([xs.ravel(),ys.ravel()],1).astype(np.float32)
inroi=(pts[:,0]>=roi[0]*w)&(pts[:,0]<=roi[2]*w)&(pts[:,1]>=roi[1]*h)&(pts[:,1]<=roi[3]*h)
prev=None; out=[]
for i in range(a,b+1):
    g=cv2.cvtColor(cv2.resize(cv2.imread(f"{W}/f24/{i:04d}.png"),(w,h),interpolation=cv2.INTER_AREA),cv2.COLOR_BGR2GRAY)
    if prev is not None:
        fl=cv2.calcOpticalFlowFarneback(prev,g,None,0.5,4,21,5,7,1.5,0)
        gx=cv2.Sobel(prev,cv2.CV_32F,1,0); gy=cv2.Sobel(prev,cv2.CV_32F,0,1); gm=np.hypot(gx,gy)
        gm=cv2.GaussianBlur(gm,(9,9),0)
        sel=inroi&(gm[pts[:,1].astype(int),pts[:,0].astype(int)]>8)&(prev[pts[:,1].astype(int),pts[:,0].astype(int)]>12)
        p=pts[sel]; v=fl[p[:,1].astype(int),p[:,0].astype(int)]
        mag=np.linalg.norm(v,axis=1) if len(v) else np.array([0.])
        if len(p)>20:
            M,inl=cv2.estimateAffinePartial2D(p,p+v,method=cv2.RANSAC,ransacReprojThreshold=0.7,maxIters=3000)
        else: M=None
        if M is None: s=1;r=0;tx=ty=0;ir=0
        else:
            s=float(np.hypot(M[0,0],M[1,0])); r=float(np.degrees(np.arctan2(M[1,0],M[0,0])))
            c=np.array([w/2,h/2]); cc=M[:,:2]@c+M[:,2]; tx,ty=(cc-c); ir=float(inl.mean())
        out.append(dict(i=i,t=i/24,s=s,rot=r,tx=float(tx)*2,ty=float(ty)*2,inl=ir,n=int(sel.sum()),med=float(np.median(mag))*2,p90=float(np.percentile(mag,90))*2))
    prev=g
json.dump(out,open(f"{W}/flow_{a}_{b}.json",'w'))
for o in out:
    print(f"{o['i']:4d} {o['t']:6.3f} s={o['s']:.4f} rot={o['rot']:+.3f} tx={o['tx']:+6.2f} ty={o['ty']:+6.2f} inl={o['inl']:.2f} n={o['n']} med={o['med']:.2f} p90={o['p90']:.2f}")
