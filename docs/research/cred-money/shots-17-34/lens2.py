import numpy as np, cv2, subprocess, sys
V=sys.argv[1]
def frames(t0,dur):
    raw=subprocess.run(['ffmpeg','-v','error','-ss',str(t0),'-t',str(dur),'-i',V,'-f','rawvideo','-pix_fmt','gray','-'],capture_output=True).stdout
    return np.frombuffer(raw,np.uint8).reshape(-1,360,640).astype(float)
def fit(g):
    sm=cv2.GaussianBlur(g,(0,0),2); H,Wd=g.shape
    dark=(sm<70).astype(np.uint8)
    # edge points: boundary between dark ring and bright interior -> use gradient magnitude on thresholded
    cnts,_=cv2.findContours(1-dark,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)
    if not cnts: return None
    c=max(cnts,key=cv2.contourArea); pts=c[:,0,:].astype(float)
    # exclude frame-border points
    ok=(pts[:,0]>2)&(pts[:,0]<Wd-3)&(pts[:,1]>2)&(pts[:,1]<H-3)
    pts=pts[ok]
    if len(pts)<30: return None
    A=np.c_[2*pts[:,0],2*pts[:,1],np.ones(len(pts))]; b=(pts**2).sum(1)
    s=np.linalg.lstsq(A,b,rcond=None)[0]; R=np.sqrt(s[2]+s[0]**2+s[1]**2)
    return s[0],s[1],R,len(pts),(1-dark).mean()
for t0,d in [(18.70,0.75),(20.30,0.6),(21.20,0.5)]:
    fr=frames(t0,d)
    for i,g in enumerate(fr):
        r=fit(g)
        if r: print(f"{t0+i/24:.3f} centre=({r[0]/6.4:5.1f}%W,{r[1]/3.6:5.1f}%H) R={r[2]/6.4:5.1f}%W  bright-area={r[4]*100:4.1f}% edgepts={r[3]}")
    print()
