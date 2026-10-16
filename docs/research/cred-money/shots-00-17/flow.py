import cv2, numpy as np, glob, sys, json
W=sys.argv[1]
fs=sorted(glob.glob(W+'/f24/*.png'))
w,h=320,180
ys,xs=np.mgrid[4:h-4:6,4:w-4:6]
pts=np.stack([xs.ravel(),ys.ravel()],1).astype(np.float32)
prev=None; out=[]
for i,f in enumerate(fs):
    g=cv2.cvtColor(cv2.resize(cv2.imread(f),(w,h),interpolation=cv2.INTER_AREA),cv2.COLOR_BGR2GRAY)
    if prev is not None:
        fl=cv2.calcOpticalFlowFarneback(prev,g,None,0.5,4,21,5,7,1.5,0)
        v=fl[pts[:,1].astype(int),pts[:,0].astype(int)]
        mag=np.linalg.norm(fl,axis=2)
        dst=pts+v
        M,inl=cv2.estimateAffinePartial2D(pts,dst,method=cv2.RANSAC,ransacReprojThreshold=1.0,maxIters=3000)
        if M is None: s=1;r=0;tx=ty=0;ir=0
        else:
            s=float(np.hypot(M[0,0],M[1,0])); r=float(np.degrees(np.arctan2(M[1,0],M[0,0])))
            # translation of frame centre
            c=np.array([w/2,h/2]); cc=M[:,:2]@c+M[:,2]; tx,ty=(cc-c)
            ir=float(inl.mean())
        out.append(dict(i=i,t=i/24,s=s,rot=r,tx=float(tx)*2,ty=float(ty)*2,inl=ir,magmed=float(np.median(mag))*2,mag90=float(np.percentile(mag,90))*2))
    prev=g
json.dump(out,open(W+'/flow.json','w'))
for o in out:
    print(f"{o['i']:4d} {o['t']:6.3f} s={o['s']:.4f} rot={o['rot']:+.3f} tx={o['tx']:+6.2f} ty={o['ty']:+6.2f} inl={o['inl']:.2f} med={o['magmed']:.2f} p90={o['mag90']:.2f}")
