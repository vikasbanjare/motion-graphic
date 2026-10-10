import cv2, numpy as np, sys
W=sys.argv[1]; i=int(sys.argv[2]); x0,y0,x1,y1=[int(v) for v in sys.argv[3].split(',')]
def g(i): return cv2.cvtColor(cv2.imread(f"{W}/f24/{i:04d}.png"),cv2.COLOR_BGR2GRAY).astype(np.float32)
a=g(i); b=g(i+1)
# high-pass to isolate grain
def hp(x): return x-cv2.GaussianBlur(x,(0,0),3)
a=hp(a); b=hp(b)
best=[]
for dx in range(-30,6):
  for dy in range(-3,4):
    pa=a[y0:y1,x0:x1]; pb=b[y0+dy:y1+dy,x0+dx:x1+dx]
    c=np.corrcoef(pa.ravel(),pb.ravel())[0,1]
    best.append((c,dx,dy))
best.sort(reverse=True)
print(i, i/24, 'top:', [(round(c,3),dx,dy) for c,dx,dy in best[:3]], 'zero-shift corr:', [round(c,3) for c,dx,dy in best if dx==0 and dy==0])
