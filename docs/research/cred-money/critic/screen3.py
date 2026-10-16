import cv2,numpy as np,sys
sys.path.insert(0,'.')
from screen2 import peak, fr
for t in [6.0,6.5,8.0,23.0,24.0,24.5,33.5,34.0,48.5]:
  g=cv2.cvtColor(fr(t),cv2.COLOR_BGR2GRAY).astype(float); res=[]
  for y in range(0,360-64,48):
    for x in range(0,640-64,48):
      p=g[y:y+64,x:x+64]
      if p.std()<8: continue
      per,ang=peak(p); 
      if 1.8<per<3.2: res.append((per,ang))
  r=np.array(res)
  if len(r): print(t,'n=%d median period %.2f px, median angle %.1f, IQR angle %.1f-%.1f'%(len(r),np.median(r[:,0]),np.median(r[:,1]),*np.percentile(r[:,1],[25,75])))
