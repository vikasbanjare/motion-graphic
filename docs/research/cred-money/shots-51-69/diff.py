import cv2, numpy as np, glob, sys
W=sys.argv[1]
fs=sorted(glob.glob(W+'/f24/*.png'))
prev=None; prevh=None
for f in fs:
    i=int(f[-8:-4])
    im=cv2.imread(f); g=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY).astype(np.float32)/255
    hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV)
    h=cv2.calcHist([hsv],[0,1],None,[30,32],[0,180,0,256]); h=cv2.normalize(h,h).flatten()
    lum=g.mean()
    if prev is not None:
        mad=np.mean(np.abs(g-prev)); hd=cv2.compareHist(prevh,h,cv2.HISTCMP_BHATTACHARYYA)
        flag='***' if mad>0.06 or hd>0.25 else ''
        print(f"{i:4d} {i/24:6.3f} lum={lum:.3f} mad={mad:.4f} hist={hd:.3f} {flag}")
    prev=g; prevh=h
