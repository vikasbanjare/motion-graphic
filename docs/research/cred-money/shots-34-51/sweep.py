import cv2, numpy as np, sys
W=sys.argv[1]; mode=sys.argv[2]; x0,y0,x1,y1=map(int,sys.argv[3].split(',')); a,b,st=map(int,sys.argv[4].split(','))
for n in range(a,b+1,st):
    roi=cv2.imread(f'{W}/f24/{n:04d}.png')[y0:y1,x0:x1]
    hsv=cv2.cvtColor(roi,cv2.COLOR_BGR2HSV).astype(float)
    lab=cv2.cvtColor(roi,cv2.COLOR_BGR2LAB).astype(float)
    if mode=='green':
        m=(hsv[...,1]>100)&(hsv[...,0]>50)&(hsv[...,0]<100)
        val=lab[...,0]  # luminance of text px; band = darker
    else:
        m=(hsv[...,0]>105)&(hsv[...,0]<175)&(hsv[...,1]>50)
        val=lab[...,1]  # a* : magenta high, navy lower
    cols=[]
    for cx in range(0,x1-x0,16):
        mm=m[:,cx:cx+16]
        cols.append(val[:,cx:cx+16][mm].mean() if mm.sum()>8 else np.nan)
    cols=np.array(cols)
    s=' '.join('  .' if np.isnan(v) else f'{v:3.0f}' for v in cols)
    ext=np.nanargmin(cols) if mode=='green' else np.nanargmax(cols)
    print(f"n{n} {n/24:.3f} cover={m.mean()*100:4.1f}% ext@x={x0+ext*16+8:3d} | {s}")
