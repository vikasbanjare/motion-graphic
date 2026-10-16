import cv2, numpy as np, sys
W=sys.argv[1]; out=sys.argv[2]; x0,y0,x1,y1=map(int,sys.argv[3].split(',')); ns=[int(v) for v in sys.argv[4].split(',')]; s=float(sys.argv[5]) if len(sys.argv)>5 else 1.5
rows=[]
for n in ns:
    a=cv2.imread(f'{W}/f24/{n:04d}.png')[y0:y1,x0:x1]; a=cv2.resize(a,None,fx=s,fy=s,interpolation=cv2.INTER_CUBIC)
    cv2.rectangle(a,(0,0),(118,16),(0,0,0),-1); cv2.putText(a,f'n{n} {n/24:.3f}',(2,12),cv2.FONT_HERSHEY_SIMPLEX,0.4,(255,255,255),1)
    rows.append(a)
cv2.imwrite(out,np.vstack(rows))
