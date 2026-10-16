# Demodulate the line-screen carrier and relate its local amplitude to local tone.
# Binary line screen (thickness modulated):  A(t) ~ sin(pi*t)   (zero at paper and at solid ink)
# Constant-width lines multiplied over tone: A(t) ~ t           (largest in highlights)
# Constant-width lines with darkness modulated: A(t) ~ (1-t)    (largest in shadows)
import numpy as np, cv2, sys, json
sys.path.insert(0,'src'); from measure_lines2 import gray, peaks
def lp(a,s): return cv2.GaussianBlur(a,(0,0),s)
def analyse(name,t,x0,y0,x1,y1,mask_thr=None):
    g=gray(t)[y0:y1,x0:x1]
    S=min(g.shape); P,ang,_=peaks(g[:S,:S],pad=512,pmin=1.95,pmax=6.5,k=1)[0]
    yy,xx=np.mgrid[0:g.shape[0],0:g.shape[1]].astype(float)
    th=np.radians(ang); d=np.array([np.cos(th),-np.sin(th)]); n=np.array([-d[1],d[0]])
    u=xx*n[0]+yy*n[1]
    M=lp(g,P*1.2); H=g-M
    c=np.cos(2*np.pi*u/P); s=np.sin(2*np.pi*u/P)
    A=2*np.hypot(lp(H*c,P*1.2),lp(H*s,P*1.2))
    lo,hi=np.percentile(M,1),np.percentile(M,99.5)
    T=np.clip((M-lo)/(hi-lo),0,1)
    bins=np.linspace(0,1,11); out=[]
    for i in range(10):
        m=(T>=bins[i])&(T<bins[i+1])
        m[:6,:]=m[-6:,:]=m[:,:6]=m[:,-6:]=False
        if m.sum()>40: out.append((round((bins[i]+bins[i+1])/2,2),round(float(np.median(A[m])),2),int(m.sum())))
    tt=np.array([o[0] for o in out]); aa=np.array([o[1] for o in out]); w=np.array([o[2] for o in out],float)
    def fit(model):
        k=(aa*model*w).sum()/((model*model*w).sum()); r=aa-k*model
        return 1-(w*r*r).sum()/(w*(aa-np.average(aa,weights=w))**2).sum()
    r2={'sin(pi t) thickness-mod':fit(np.sin(np.pi*tt)),'t (const-width multiply)':fit(tt),'1-t (darkness-mod)':fit(1-tt),'const':fit(np.ones_like(tt))}
    print(f"\n{name} t={t} P={P:.2f}px ang={ang:.1f}  ink-level={lo:.0f} paper-level={hi:.0f}")
    for o in out: print(f"   tone {o[0]:.2f}: carrier amp {o[1]:6.2f}  (n={o[2]})")
    print('   R^2:',{k:round(v,3) for k,v in r2.items()})
    peak_t=tt[np.argmax(aa)]
    return dict(name=name,t=t,period=round(P,2),angle=round(ang,1),ink=round(lo,1),paper=round(hi,1),bins=out,r2={k:round(v,3) for k,v in r2.items()},peak_tone=float(peak_t))
R=[analyse('green_rock',47.5,170,40,430,250),
   analyse('green_rock_b',47.0,170,40,430,250),
   analyse('columns_L',23.0,0,40,110,360),
   analyse('columns_R',24.0,520,40,640,360),
   analyse('flowers',6.0,0,40,200,300),
   analyse('lighthouse',33.5,0,150,330,360)]
json.dump(R,open('out/modulation.json','w'),indent=1)
