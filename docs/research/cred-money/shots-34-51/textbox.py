import cv2, numpy as np, sys
W=sys.argv[1]
def box(n,x0,y0,x1,y1,mode,lab):
    im=cv2.imread(f'{W}/f24/{n:04d}.png'); roi=im[y0:y1,x0:x1]
    hsv=cv2.cvtColor(roi,cv2.COLOR_BGR2HSV).astype(int)
    if mode=='green': m=(hsv[...,1]>110)&(hsv[...,0]>55)&(hsv[...,0]<95)&(hsv[...,2]>90)
    elif mode=='navy': m=(hsv[...,0]>110)&(hsv[...,0]<160)&(hsv[...,1]>70)
    elif mode=='dark': m=hsv[...,2]<90
    m=m.astype(np.uint8)
    rows=np.where(m.sum(1)>=2)[0]; cols=np.where(m.sum(0)>=1)[0]
    if len(rows)==0: print(lab,'none'); return
    # row profile to find x-height band (dense core)
    prof=m.sum(1)
    core=np.where(prof>prof.max()*0.45)[0]
    r=roi.reshape(-1,3)[m.ravel()>0]; med=np.median(r,0).astype(int)
    print(f"{lab} n{n}: bbox x={x0+cols[0]}-{x0+cols[-1]} ({(cols[-1]-cols[0])/640*100:.1f}%W, centre x={(x0+(cols[0]+cols[-1])/2)/640*100:.1f}%W) y={y0+rows[0]}-{y0+rows[-1]} (total {(rows[-1]-rows[0]+1)/360*100:.1f}%H) dense core y={y0+core[0]}-{y0+core[-1]} ({(core[-1]-core[0]+1)/360*100:.1f}%H ~ x-height) median colour #{med[2]:02x}{med[1]:02x}{med[0]:02x}")
box(840,300,240,600,280,'green','A headline')
box(840,330,280,560,300,'green','A subline')
box(910,20,260,380,305,'green','B headline')
box(910,20,305,300,325,'green','B subline')
box(1000,120,65,560,110,'navy','D headline1')
box(1060,100,65,560,112,'navy','D headline2')
box(1060,200,112,450,135,'navy','D subline2')
box(1210,90,100,560,240,'dark','H MONEY+CRED dark parts')
