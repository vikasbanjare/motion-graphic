import cv2, numpy as np, sys
F=sys.argv[1]
def prof(n,x0,y0,x1,y1,cond,name):
    im=cv2.imread(f"{F}/{n:04d}.jpg"); rgb=im[...,::-1].astype(int); hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV).astype(int)
    m=cond(rgb[y0:y1,x0:x1],hsv[y0:y1,x0:x1]); rows=m.sum(1)
    on=rows>1; runs=[];s=None
    for i,v in enumerate(list(on)+[False]):
        if v and s is None: s=i
        if not v and s is not None: runs.append((s,i-1)); s=None
    print(name, f"f{n}")
    for a,b in runs:
        if b-a<2: continue
        r=rows[a:b+1]; core=np.where(r>0.45*r.max())[0]
        c=np.where(m[a:b+1].sum(0)>0)[0]
        print(f"   line y{a+y0}-{b+y0}: full h={b-a+1}px ({(b-a+1)/3.6:.1f}%H); dense core (x-height) y{core.min()+a+y0}-{core.max()+a+y0} h={core.max()-core.min()+1}px ({(core.max()-core.min()+1)/3.6:.1f}%H); x {c.min()+x0}-{c.max()+x0} (w {(c.max()-c.min()+1)/6.4:.1f}%W, centre {(c.min()+c.max())/2/6.4+x0/6.4:.1f}%W)")
crim=lambda R,H: (H[...,1]>110)&(R[...,0]>R[...,1]+50)&(R[...,0]<215)
prof(139,205,10,435,105,crim,'multiple banks')
purp=lambda R,H: ((R[...,2]>R[...,1]+45)&(R[...,1]<130))|((R[...,1]>R[...,0]+25)&(R[...,0]<120))
prof(181,140,20,500,85,purp,'monitor')
grn=lambda R,H: (R[...,1]>R[...,0]+55)&(R[...,0]<140)
prof(202,290,235,600,300,grn,'dues')
