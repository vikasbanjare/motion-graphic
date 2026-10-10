import cv2, numpy as np, sys
W=sys.argv[1]; a,b,step=[int(v) for v in sys.argv[2].split(',')]; x0,y0,x1,y1=[int(v) for v in sys.argv[3].split(',')]
hpf=len(sys.argv)>4 and sys.argv[4]=='hp'
def g(i):
    x=cv2.cvtColor(cv2.imread(f"{W}/f24/{i:04d}.png"),cv2.COLOR_BGR2GRAY).astype(np.float32)/255
    if hpf: x=x-cv2.GaussianBlur(x,(0,0),4)
    return cv2.GaussianBlur(x,(0,0),0.8)
mask=np.zeros((360,640),np.uint8); mask[y0:y1,x0:x1]=255
for i in range(a,b,step):
    A=g(i); B=g(i+step)
    M=np.eye(2,3,dtype=np.float32)
    try:
        cc,M=cv2.findTransformECC(A,B,M,cv2.MOTION_AFFINE,(cv2.TERM_CRITERIA_EPS|cv2.TERM_CRITERIA_COUNT,200,1e-6),mask,5)
    except cv2.error as e:
        print(i,'fail'); continue
    s=np.sqrt(abs(np.linalg.det(M[:,:2]))); rot=np.degrees(np.arctan2(M[1,0]-M[0,1],M[0,0]+M[1,1]))
    c=np.array([320,180]); d=M[:,:2]@c+M[:,2]-c
    per=1/step*24
    print(f"t={i/24:.3f}->{(i+step)/24:.3f} cc={cc:.3f} scale/s={s**per:.3f} rot/s={rot*per:+.2f}deg pan_x={d[0]*per:+.1f}px/s ({d[0]*per/6.4:+.1f}%W/s) pan_y={d[1]*per:+.1f}px/s")
