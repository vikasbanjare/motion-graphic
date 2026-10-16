# Same test as the reference (src/phase_test.py): object displacement vs carrier phase change at a fixed screen box.
import numpy as np, cv2, glob
def load(p): return cv2.cvtColor(cv2.resize(cv2.imread(p),(640,360),interpolation=cv2.INTER_AREA),cv2.COLOR_BGR2GRAY).astype(np.float64)
def carrier_phase(g,P,th):
    yy,xx=np.mgrid[0:g.shape[0],0:g.shape[1]].astype(float); d=np.array([np.cos(th),-np.sin(th)]); n=np.array([-d[1],d[0]]); u=xx*n[0]+yy*n[1]
    h=g-cv2.GaussianBlur(g,(0,0),3); return np.angle((h*np.exp(-2j*np.pi*u/P)).sum()),n
fs=sorted(glob.glob('out/web/seq_*.png')); x0,y0,x1,y1=(120,20,220,250); P=2.34; th=np.radians(45); rows=[]
for a,b in zip(fs[:-1],fs[1:]):
    A=load(a); B=load(b); la=cv2.GaussianBlur(A,(0,0),3)[y0:y1,x0:x1]; lb=cv2.GaussianBlur(B,(0,0),3)[y0:y1,x0:x1]
    (dx,dy),resp=cv2.phaseCorrelate(la,lb,cv2.createHanningWindow((x1-x0,y1-y0),cv2.CV_64F))
    pa,n=carrier_phase(A[y0:y1,x0:x1],P,th); pb,_=carrier_phase(B[y0:y1,x0:x1],P,th)
    dphi=np.angle(np.exp(1j*(pb-pa))); pred=np.angle(np.exp(1j*2*np.pi*(dx*n[0]+dy*n[1])/P)); rows.append((dx,dy,dphi,pred))
r=np.array(rows); mv=np.hypot(r[:,0],r[:,1])
print(f"object shift per 4-frame step: mean {mv.mean():.2f}px  carrier |dphi| mean {np.abs(r[:,2]).mean():.3f} rad  (object-space would give |pred| mean {np.abs(r[:,3]).mean():.2f} rad)")
