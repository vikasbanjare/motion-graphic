import cv2,numpy as np
S='/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/ref1/f6/'
def fr(t): return cv2.imread(S+'%04d.jpg'%(int(round(t*6))+1))
def peak(p,pad=512):
  p=p-p.mean(); w=np.outer(np.hanning(p.shape[0]),np.hanning(p.shape[1]))
  F=np.abs(np.fft.fftshift(np.fft.fft2(p*w,(pad,pad)))); c=pad//2
  yy,xx=np.mgrid[:pad,:pad]-c; r=np.hypot(xx,yy)/pad
  F[(r<1/6.0)|(r>1/1.7)]=0; F[:, :c]=0
  iy,ix=np.unravel_index(F.argmax(),F.shape); fx,fy=(ix-c)/pad,(iy-c)/pad
  dx,dy=-fy,fx; return 1/np.hypot(fx,fy), np.degrees(np.arctan2(-dy,dx))%180
yy,xx=np.mgrid[:96,:96]
for a in [40,45,50]:
  th=np.radians(a); syn=np.sin(2*np.pi*(-xx*np.sin(th)-yy*np.cos(th))/2.6)
  print('synthetic',a,'deg 2.6px ->','%.2f px %.1f deg'%peak(syn))
for t,x,y,lab in [(6.5,30,30,'flora petals'),(6.5,170,170,'flora branch'),(7.0,120,200,'flora branch2'),(22.0,40,40,'column L'),(24.0,500,220,'column R'),(34.0,60,190,'lighthouse rock'),(15.0,240,60,'loupe (mint)')]:
  g=cv2.cvtColor(fr(t),cv2.COLOR_BGR2GRAY).astype(float)[y:y+96,x:x+96]
  print(t,lab,'%.2f px@640, %.1f deg'%peak(g))
