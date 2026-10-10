import cv2, numpy as np, sys
W=sys.argv[1]
for i in [int(v) for v in sys.argv[2].split(',')]:
    im=cv2.imread(f"{W}/f24/{i:04d}.png"); L=cv2.cvtColor(im,cv2.COLOR_BGR2LAB)[...,0].astype(float)*100/255
    L=cv2.GaussianBlur(L,(0,0),2)
    cx,cy=320,180
    pts=[]
    for it in range(3):
        pts=[]
        for a in np.linspace(0,2*np.pi,72,endpoint=False):
            rs=np.arange(20,420)
            xs=(cx+rs*np.cos(a)).astype(int); ys=(cy+rs*np.sin(a)).astype(int)
            ok=(xs>=0)&(xs<640)&(ys>=0)&(ys<360)
            if ok.sum()<50: continue
            prof=L[ys[ok],xs[ok]]; r=rs[ok]
            inner=np.median(prof[:40]); thr=inner*0.5
            idx=np.where(prof<thr)[0]
            if len(idx)==0: continue
            # require staying dark
            k=idx[0]
            if k< len(prof)-1 and ok.sum()>k: pts.append((xs[ok][k],ys[ok][k]))
        P=np.array(pts,float)
        A=np.c_[2*P[:,0],2*P[:,1],np.ones(len(P))]; b=(P**2).sum(1)
        s,*_=np.linalg.lstsq(A,b,rcond=None); cx,cy=s[0],s[1]; R=np.sqrt(s[2]+cx**2+cy**2)
    err=np.abs(np.hypot(P[:,0]-cx,P[:,1]-cy)-R)
    # radial profile
    yy,xx=np.mgrid[0:360,0:640]; rr=np.hypot(xx-cx,yy-cy)/R
    prof=[(f"{q:.2f}",round(L[(rr>=q)&(rr<q+0.05)].mean(),1)) for q in np.arange(0,1.5,0.1) if ((rr>=q)&(rr<q+0.05)).any()]
    corner=L[rr>1.15].mean() if (rr>1.15).any() else None
    print(f"f{i} t={i/24:.3f} lens centre=({cx:.0f},{cy:.0f}) R={R:.0f}px = {R/640*100:.1f}%W ({2*R/640*100:.0f}%W diameter, {R/360*100:.0f}%H) npts={len(P)} edgeFitErr med={np.median(err):.1f}px")
    print('   L* radial profile (r/R:L*)',prof, 'outside(r>1.15R) L*=',None if corner is None else round(corner,1))
