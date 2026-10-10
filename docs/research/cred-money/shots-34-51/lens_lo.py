import numpy as np, cv2, sys
W=sys.argv[1]; a=int(sys.argv[2]); b=int(sys.argv[3]); st=int(sys.argv[4])
for n in range(a,b+1,st):
    im=cv2.imread(f'{W}/f24/{n:04d}.png',0).astype(np.float32)
    bl=cv2.GaussianBlur(im,(0,0),3)
    H,Wd=im.shape
    corners=np.concatenate([bl[:20,:20].ravel(),bl[:20,-20:].ravel(),bl[-20:,:20].ravel(),bl[-20:,-20:].ravel()])
    cl=np.median(corners); cen=np.median(bl[130:230,270:370])
    # brightness profile: use darkness map
    thr=cl+0.18*(cen-cl)
    m=(bl>thr).astype(np.uint8)
    cs,_=cv2.findContours(m,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)
    c=max(cs,key=cv2.contourArea)
    # use only contour points not on frame border to fit circle
    pts=c[:,0,:]; inner=pts[(pts[:,0]>2)&(pts[:,0]<Wd-3)&(pts[:,1]>2)&(pts[:,1]<H-3)]
    if len(inner)<20: print(n,'lens edge not visible', f'corner={cl:.0f} center={cen:.0f}'); continue
    # algebraic circle fit
    x=inner[:,0].astype(float); y=inner[:,1].astype(float)
    A=np.c_[2*x,2*y,np.ones_like(x)]; bb=x**2+y**2
    cx,cy,k=np.linalg.lstsq(A,bb,rcond=None)[0]; r=np.sqrt(k+cx**2+cy**2)
    res=np.sqrt((x-cx)**2+(y-cy)**2)-r
    # radial softness: sample along rays
    angs=np.linspace(0,2*np.pi,72,endpoint=False); prof=[]
    for rr in np.arange(0,r*1.4,2):
        xs=(cx+rr*np.cos(angs)).astype(int); ys=(cy+rr*np.sin(angs)).astype(int)
        ok=(xs>=0)&(xs<Wd)&(ys>=0)&(ys<H)
        prof.append(np.median(bl[ys[ok],xs[ok]]) if ok.sum()>10 else np.nan)
    prof=np.array(prof); rs=np.arange(0,r*1.4,2)
    p=(prof-cl)/(cen-cl+1e-6)
    try:
        r90=rs[np.where(p<0.9)[0][np.where(p<0.9)[0]>len(rs)*0.3][0]]; r10=rs[np.where(p<0.1)[0][0]]
    except Exception: r90=r10=np.nan
    print(f"n{n} t={n/24:.3f} center=({cx/Wd*100:.1f}%W,{cy/H*100:.1f}%H) r={r:.0f}px={r/Wd*100:.1f}%W={2*r/H*100:.0f}%H(diam) fitres={np.abs(res).mean():.1f}px corner={cl:.0f} center={cen:.0f} r90={r90/Wd*100:.1f}%W r10={r10/Wd*100:.1f}%W feather={((r10-r90)/Wd*100):.1f}%W")
