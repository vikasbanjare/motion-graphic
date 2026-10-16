import numpy as np, cv2, sys
sys.path.insert(0,'src'); from measure_lines2 import gray, peaks
def big(t,x,y,S=96):
    g=gray(t); return peaks(g[y:y+S,x:x+S],pad=512,pmin=1.95,pmax=6.5,k=1)[0]
spec=[('flowers',[5.0,5.5,6.0,6.5,7.0,7.5,8.0,8.5,9.0],(0,60)),
      ('columnL',[21.5,22.0,22.5,23.0,23.5,24.0,24.5,25.0,25.5,26.0,26.5],(0,130)),
      ('lighthouse',[32.5,33.0,33.5,34.0,34.5,35.0,35.5,36.0,36.5,37.0,37.5,38.0],(150,150)),
      ('greenrock',[46.5,47.0,47.5,48.0,48.5],(200,80))]
for name,ts,(x,y) in spec:
    for t in ts:
        p,a,f=big(t,x,y)
        print(f"{name:10s} t={t:5.2f} P={p:5.2f}px ang={a:5.1f} frac={f:.3f}")
