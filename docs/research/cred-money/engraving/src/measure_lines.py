# Measure line-screen period/angle in reference frames via windowed 2D FFT.
# Angle convention: direction of the LINES, degrees counter-clockwise from +x with y UP (so "/" ~ +45, "\" ~ +135).
import numpy as np, cv2, sys, json
F='/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/ref1/f6/%04d.jpg'
def fr(t): return int(round(t*6))+1
def gray(t):
    return cv2.cvtColor(cv2.imread(F%fr(t)),cv2.COLOR_BGR2GRAY).astype(np.float64)
def spec(p, pad=256, pmin=1.9, pmax=12):
    s=p.shape[0]; p=p-p.mean()
    win=np.outer(np.hanning(p.shape[0]),np.hanning(p.shape[1]))
    P=np.abs(np.fft.fftshift(np.fft.fft2(p*win,(pad,pad))))**2
    c=pad//2; yy,xx=np.mgrid[-c:c,-c:c]; r=np.hypot(xx,yy)/pad
    band=(r>=1/pmax)&(r<=1/pmin)
    Q=np.where(band,P,0); iy,ix=np.unravel_index(np.argmax(Q),Q.shape)
    fy,fx=(iy-c)/pad,(ix-c)/pad
    per=1/np.hypot(fx,fy)
    # frequency vector (fx, -fy) in y-up; lines are perpendicular to it
    fang=np.degrees(np.arctan2(-fy,fx)); lang=(fang+90)%180
    q=Q[iy,ix]/np.median(P[band])
    # energy fraction in +-2 bins around the peak (and mirror) vs whole band = how "line-like" the patch is
    m=(np.hypot(xx-(ix-c),yy-(iy-c))<=3)|(np.hypot(xx+(ix-c),yy+(iy-c))<=3)
    frac=P[m&band].sum()/P[band].sum()
    return per,lang,q,frac
pts=json.load(open(sys.argv[1])) if len(sys.argv)>1 else None
if __name__=='__main__':
    S=48
    rows=[]
    for name,t,x,y in pts:
        g=gray(t); x=min(x,640-S); y=min(y,360-S)
        per,ang,q,frac=spec(g[y:y+S,x:x+S])
        rows.append(dict(name=name,t=t,x=x,y=y,period_px=round(per,2),period_pctH=round(per/360*100,3),line_angle=round(ang,1),peak_over_median=round(q,1),peak_energy_frac=round(frac,3),patch_mean=round(g[y:y+S,x:x+S].mean(),1)))
        r=rows[-1]; print(f"{name:22s} t={t:5.2f} ({x:3d},{y:3d}) P={r['period_px']:5.2f}px ({r['period_pctH']:.2f}%H) ang={r['line_angle']:6.1f} q={r['peak_over_median']:7.1f} frac={r['peak_energy_frac']:.3f} mean={r['patch_mean']}")
    json.dump(rows,open('out/line_measure.json','w'),indent=1)
