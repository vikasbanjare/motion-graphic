import numpy as np, cv2, sys
F=sys.argv[1]
for n in [103,109,112,115,118,121,124,127,129,130,131]:
    im=cv2.imread(f"{F}/{n:04d}.jpg"); g=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY).astype(float)
    H,Wd=g.shape
    sm=cv2.GaussianBlur(g,(0,0),3)
    # interior level: median of central 40% region
    inner=np.median(sm[int(H*.3):int(H*.7),int(Wd*.3):int(Wd*.7)])
    thr=inner*0.5
    pts=[]
    cx,cy=Wd/2,H/2
    for ang in np.linspace(0,2*np.pi,180,endpoint=False):
        dx,dy=np.cos(ang),np.sin(ang)
        prev=None
        for r in np.arange(50,500,1.0):
            x,y=cx+dx*r,cy+dy*r
            if x<0 or y<0 or x>=Wd-1 or y>=H-1: break
            v=sm[int(y),int(x)]
            if v<thr:
                pts.append((x,y)); break
    pts=np.array(pts)
    if len(pts)>10:
        # algebraic circle fit
        A=np.c_[2*pts[:,0],2*pts[:,1],np.ones(len(pts))]; b=(pts**2).sum(1)
        c=np.linalg.lstsq(A,b,rcond=None)[0]; R=np.sqrt(c[2]+c[0]**2+c[1]**2)
        res=np.abs(np.hypot(pts[:,0]-c[0],pts[:,1]-c[1])-R).mean()
    else: c=[0,0];R=0;res=0
    # edge darkness: corners mean
    corners=np.mean([sm[5:30,5:30].mean(),sm[5:30,-30:-5].mean(),sm[-30:-5,5:30].mean(),sm[-30:-5,-30:-5].mean()])
    # radial falloff profile along horizontal centre line (left side)
    row=sm[int(H/2)]
    prof=[int(row[int(Wd/2-f*Wd/2)]) for f in [0,0.5,0.7,0.8,0.85,0.9,0.95,0.99]]
    print(f"f{n} t={(n-1)/6:.2f} interior={inner:.0f} edgepts={len(pts)} centre=({c[0]/Wd*100:.1f}%W,{c[1]/H*100:.1f}%H) R={R:.0f}px={R/Wd*100:.1f}%W ({R/H*100:.0f}%H) fitres={res:.1f}px corners={corners:.0f} rowprof(0..99% to left edge)={prof}")
