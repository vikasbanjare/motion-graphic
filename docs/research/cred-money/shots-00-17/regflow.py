import cv2, numpy as np, sys
W=sys.argv[1]; a,b=int(sys.argv[2]),int(sys.argv[3]); x0,y0,x1,y1=[int(v) for v in sys.argv[4].split(',')]
def g(i): return cv2.cvtColor(cv2.imread(f"{W}/f24/{i:04d}.png"),cv2.COLOR_BGR2GRAY).astype(np.float32)
win=cv2.createHanningWindow((x1-x0,y1-y0),cv2.CV_32F)
for i in range(a,b):
    p=g(i)[y0:y1,x0:x1]; q=g(i+1)[y0:y1,x0:x1]
    (dx,dy),r=cv2.phaseCorrelate(p,q,win)
    print(f"{i}->{i+1} t={i/24:.3f} dx={dx:+.2f} dy={dy:+.2f} resp={r:.2f}")
