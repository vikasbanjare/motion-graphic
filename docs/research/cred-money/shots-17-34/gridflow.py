import numpy as np, cv2, sys
W=sys.argv[1]; a0=float(sys.argv[2]); b0=float(sys.argv[3]); step=float(sys.argv[4])
a=np.fromfile(W+'/f24_16_35.raw',np.uint8).reshape(-1,180,320,3)
g=[cv2.cvtColor(f,cv2.COLOR_RGB2GRAY) for f in a]
t0=16.0
t=a0
while t<b0-1e-6:
    i0=int(round((t-t0)*24)); i1=int(round((min(t+step,b0)-t0)*24))
    acc=np.zeros((180,320,2))
    for i in range(i0,i1):
        acc+=cv2.calcOpticalFlowFarneback(g[i],g[i+1],None,0.5,4,21,3,5,1.1,0)
    n=i1-i0
    # 4x4 grid medians in % of width / s (x) and % of height /s (y)
    out=[]
    for gy in range(3):
        row=[]
        for gx in range(4):
            blk=acc[gy*60:(gy+1)*60, gx*80:(gx+1)*80]
            vx=np.median(blk[...,0])/n*24/320*100; vy=np.median(blk[...,1])/n*24/180*100
            row.append(f"({vx:+5.1f},{vy:+5.1f})")
        out.append(' '.join(row))
    print(f"{t:6.2f}-{min(t+step,b0):6.2f}  [%W/s,%H/s] rows top->bottom")
    for o in out: print('    ',o)
    t+=step
