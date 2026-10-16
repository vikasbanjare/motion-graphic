import cv2,numpy as np,sys
S='/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/ref1/f6/'
def fr(t): return cv2.imread(S+'%04d.jpg'%(int(round(t*6))+1))
# Method: luma threshold at half of inside median; fit circle (Kasa) to boundary points of the bright region, ignoring frame-edge points
for t in [15.0,16.0,19.5,48.0,50.5]:
  g=cv2.cvtColor(fr(t),cv2.COLOR_BGR2GRAY).astype(float); g=cv2.GaussianBlur(g,(0,0),2)
  H,W=g.shape; inside=np.median(g[H//2-40:H//2+40,W//2-60:W//2+60]); outside=np.percentile(g[:, :15],5)
  thr=outside+0.5*(inside-outside)
  m=(g>thr).astype(np.uint8)
  n,l,st,_=cv2.connectedComponentsWithStats(m); k=1+np.argmax(st[1:,4]); m=(l==k).astype(np.uint8)
  cs,_=cv2.findContours(m,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE); p=max(cs,key=len)[:,0,:].astype(float)
  p=p[(p[:,0]>2)&(p[:,0]<W-3)&(p[:,1]>2)&(p[:,1]<H-3)]
  A=np.c_[2*p[:,0],2*p[:,1],np.ones(len(p))]; b=(p**2).sum(1); cx,cy,c=np.linalg.lstsq(A,b,rcond=None)[0]; R=np.sqrt(c+cx**2+cy**2)
  res=np.sqrt(((p-[cx,cy])**2).sum(1))-R
  print(f"t={t}: inside={inside:.0f} outside={outside:.0f} R50/W={R/W:.3f} R/H={R/H:.3f} centre=({cx/W*100:.1f}%W,{cy/H*100:.1f}%H) fit rms={res.std():.2f}px n={len(p)}")
