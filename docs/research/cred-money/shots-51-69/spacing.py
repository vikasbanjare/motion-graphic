import cv2, numpy as np, sys
W=sys.argv[1]; i=int(sys.argv[2]); x0,y0,x1,y1=[int(v) for v in sys.argv[3].split(',')]
g=cv2.cvtColor(cv2.imread(f"{W}/f24/{i:04d}.png"),cv2.COLOR_BGR2GRAY).astype(np.float32)[y0:y1,x0:x1]
g=g-cv2.GaussianBlur(g,(0,0),8)   # high-pass to remove shading
win=np.outer(np.hanning(g.shape[0]),np.hanning(g.shape[1]))
F=np.abs(np.fft.fftshift(np.fft.fft2(g*win)))
cy,cx=np.array(F.shape)//2; F[cy-1:cy+2,cx-1:cx+2]=0
out=[]
Fc=F.copy()
for k in range(3):
    py,px=np.unravel_index(np.argmax(Fc),Fc.shape)
    fy=(py-cy)/g.shape[0]; fx=(px-cx)/g.shape[1]; f=np.hypot(fx,fy)
    per=1/f if f>0 else 0; ang=np.degrees(np.arctan2(fy,fx))%180
    out.append(f"period={per:.2f}px ({per/360*100:.2f}%H) wave-normal={ang:.0f}deg peak={Fc[py,px]/F.mean():.1f}xmean")
    Fc[max(0,py-2):py+3,max(0,px-2):px+3]=0; Fc[max(0,2*cy-py-2):2*cy-py+3,max(0,2*cx-px-2):2*cx-px+3]=0
print(f"f{i} t={i/24:.3f} roi={x0},{y0},{x1},{y1}: "+" | ".join(out))
