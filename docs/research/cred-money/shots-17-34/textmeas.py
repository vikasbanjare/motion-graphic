import cv2, numpy as np, sys
F=sys.argv[1]
def meas(n,x0,y0,x1,y1,cond,name):
    im=cv2.imread(f"{F}/{n:04d}.jpg"); rgb=im[...,::-1].astype(int)
    hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV).astype(int)
    R=rgb[y0:y1,x0:x1]; Hs=hsv[y0:y1,x0:x1]
    m=cond(R,Hs)
    rows=m.sum(1); cols=m.sum(0)
    # find row runs where rows>2
    on=rows>2; runs=[];s=None
    for i,v in enumerate(on):
        if v and s is None: s=i
        if (not v or i==len(on)-1) and s is not None: runs.append((s+y0,i+y0-1 if not v else i+y0)); s=None
    xs=np.where(cols>1)[0]
    print(f"{name}: f{n} rows-with-ink runs (abs y px of 360):",runs," x-extent:",(xs.min()+x0,xs.max()+x0) if len(xs) else None)
    for a,b in runs:
        sub=m[a-y0:b-y0+1]; c=np.where(sub.sum(0)>0)[0]
        if len(c): print(f"    run y{a}-{b} h={b-a+1}px ({(b-a+1)/360*100:.1f}%H) x {c.min()+x0}-{c.max()+x0} w={(c.max()-c.min())/640*100:.1f}%W centre x={(c.min()+c.max())/2+x0:.0f} ({((c.min()+c.max())/2+x0)/640*100:.1f}%W)")
crim=lambda R,H: (H[...,1]>110)&(H[...,2]<200)&(R[...,0]>R[...,1]+50)
meas(139,150,5,490,110,crim,'banks headline+sub')
purp=lambda R,H: (R[...,2]>R[...,1]+50)&(R[...,1]<120)|((R[...,1]>R[...,0]+20)&(R[...,2]>R[...,0]+20)&(R[...,0]<110))
meas(181,100,5,540,90,purp,'monitor headline+sub')
grn=lambda R,H: (R[...,1]>R[...,0]+60)&(R[...,0]<130)
meas(202,280,220,620,310,grn,'dues headline+sub')
meas(202,320,140,600,215,lambda R,H:(R[...,0]<120)&(R[...,1]<160),'dues UI rows')
