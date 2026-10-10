import numpy as np, cv2, sys, json
F='/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/ref1/f6/%04d.jpg'
def fr(t): return int(round(t*6))+1
def gray(t): return cv2.cvtColor(cv2.imread(F%fr(t)),cv2.COLOR_BGR2GRAY).astype(np.float64)
def peaks(p, pad=256, pmin=1.95, pmax=7.0, k=2):
    p=p-cv2.GaussianBlur(p,(0,0),3.0)
    win=np.outer(np.hanning(p.shape[0]),np.hanning(p.shape[1]))
    P=np.abs(np.fft.fftshift(np.fft.fft2(p*win,(pad,pad))))**2
    c=pad//2; yy,xx=np.mgrid[-c:c,-c:c]; r=np.hypot(xx,yy)/pad
    band=(r>=1/pmax)&(r<=1/pmin)
    Q=np.where(band,P,0).copy(); out=[]; tot=P[band].sum()
    for _ in range(k):
        iy,ix=np.unravel_index(np.argmax(Q),Q.shape)
        fy,fx=(iy-c)/pad,(ix-c)/pad
        per=1/np.hypot(fx,fy); lang=(np.degrees(np.arctan2(-fy,fx))+90)%180
        m=(np.hypot(xx-(ix-c),yy-(iy-c))<=4)|(np.hypot(xx+(ix-c),yy+(iy-c))<=4)
        frac=P[m&band].sum()/tot
        out.append((per,lang,frac)); Q[m]=0
    return out
if __name__=='__main__':
    pts=json.load(open(sys.argv[1])); S=int(sys.argv[2]) if len(sys.argv)>2 else 48
    res=[]
    for name,t,x,y in pts:
        g=gray(t); x=min(x,640-S); y=min(y,360-S)
        pk=peaks(g[y:y+S,x:x+S])
        res.append(dict(name=name,t=t,x=x,y=y,peaks=[dict(period_px=round(a,2),angle=round(b,1),energy_frac=round(c,3)) for a,b,c in pk]))
        print(f"{name:20s} t={t:5.2f} ({x:3d},{y:3d}) "+'  |  '.join(f"P={a:4.2f}px ({a/3.6:.2f}%H) ang={b:5.1f} frac={c:.3f}" for a,b,c in pk))
    json.dump(res,open('out/line_measure_hp.json','w'),indent=1)
