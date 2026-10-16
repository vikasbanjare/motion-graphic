import cv2, numpy as np, glob, sys
W=sys.argv[1]
fs=sorted(glob.glob(W+'/f24/*.png'))
prev=None; prevh=None
rows=[]
for i,f in enumerate(fs):
    im=cv2.imread(f); g=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY).astype(np.float32)/255
    hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV)
    h=cv2.calcHist([hsv],[0,1],None,[30,32],[0,180,0,256]); h=cv2.normalize(h,h).flatten()
    if prev is not None:
        mad=np.mean(np.abs(g-prev))
        hd=cv2.compareHist(prevh,h,cv2.HISTCMP_BHATTACHARYYA)
        rows.append((i,i/24,mad,hd))
    prev=g; prevh=h
np.save(W+'/diff.npy',np.array(rows))
for r in rows:
    flag = '***' if r[2]>0.08 or r[3]>0.25 else ''
    print(f"{r[0]:4d} {r[1]:6.3f} mad={r[2]:.4f} hist={r[3]:.3f} {flag}")
