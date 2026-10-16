import cv2, numpy as np, sys
W=sys.argv[1]; frames=range(*[int(v) for v in sys.argv[2].split(',')])
res=[]
for i in frames:
    im=cv2.imread(f"{W}/f24/{i:04d}.png"); hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV).astype(int)
    H,S,V=hsv[...,0],hsv[...,1],hsv[...,2]
    grey=(S<30)&(V>150); green=(H>=22)&(H<=50)&(S>=35)
    pts=[]
    for y in range(0,360,3):
        row_g=grey[y]; row_n=green[y]
        for x in range(8,632):
            if row_g[x-8:x].all() and row_n[x:x+8].all():
                pts.append((x,y)); break
    if len(pts)<8: res.append((i,None)); print(f"f{i} t={i/24:.3f} npts={len(pts)}"); continue
    P=np.array(pts,float); x,y=P[:,0],P[:,1]
    A=np.c_[2*x,2*y,np.ones(len(x))]; b=x**2+y**2
    sol,*_=np.linalg.lstsq(A,b,rcond=None); cx,cy=sol[0],sol[1]; r=np.sqrt(sol[2]+cx**2+cy**2)
    err=np.abs(np.hypot(x-cx,y-cy)-r).mean()
    print(f"f{i} t={i/24:.3f} npts={len(pts)} cx={cx:.1f} cy={cy:.1f} r={r:.1f}px ({r/360*100:.1f}%H) fitErr={err:.2f}")
