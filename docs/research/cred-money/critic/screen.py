import cv2,numpy as np
S='/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/ref1/f6/'
def fr(t): return cv2.imread(S+'%04d.jpg'%(int(round(t*6))+1))
def peak(p):
  p=p-p.mean(); w=np.outer(np.hanning(p.shape[0]),np.hanning(p.shape[1])); F=np.abs(np.fft.fftshift(np.fft.fft2(p*w)))
  n=p.shape[0]; c=n//2; yy,xx=np.mgrid[:n,:n]-c; r=np.hypot(xx,yy)
  F[(r<n/6)|(r>n/1.6)]=0  # periods between ~1.6 and 6 px
  F[:, :c]=0  # half plane
  iy,ix=np.unravel_index(F.argmax(),F.shape); fx,fy=(ix-c)/n,(iy-c)/n
  per=1/np.hypot(fx,fy)
  # line direction is perpendicular to (fx,fy); convert to screen angle with y up
  dx,dy=-fy,fx; ang=np.degrees(np.arctan2(-dy,dx))%180
  return per,ang
# synthetic check: lines rising to the right ("/") at 45 deg, period 3px
yy,xx=np.mgrid[:64,:64]; syn=np.sin(2*np.pi*(xx+yy)/(3*np.sqrt(2)))  # const along x+y=c: slope dy/dx=-1 in image => rising on screen
print('synthetic "/" 3px ->',peak(syn))
for t,x,y,lab in [(6.5,40,40,'flora petals'),(6.5,180,180,'flora branch'),(8.0,280,140,'bird'),(22.0,60,60,'column L'),(24.0,520,240,'column R'),(34.0,90,200,'lighthouse rock'),(42.0,200,200,'reef grey')]:
  g=cv2.cvtColor(fr(t),cv2.COLOR_BGR2GRAY).astype(float)[y:y+64,x:x+64]
  print(t,lab,'period %.2f px@640, line angle %.1f deg (screen, CCW from +x)'%peak(g))
