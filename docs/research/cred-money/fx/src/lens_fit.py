import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
from common import *
import json
W,H=640,360
def kasa(x,y):
    A=np.c_[2*x,2*y,np.ones_like(x)]; b=x**2+y**2
    c,_,_,_=np.linalg.lstsq(A,b,rcond=None); cx,cy=c[0],c[1]; r=np.sqrt(c[2]+cx**2+cy**2); return cx,cy,r
def ransac(x,y,it=300,tol=2.0):
    rng=np.random.default_rng(0); best=None
    for _ in range(it):
        i=rng.choice(len(x),3,replace=False)
        try: cx,cy,r=kasa(x[i],y[i])
        except: continue
        if not np.isfinite(r) or r>2000: continue
        d=np.abs(np.hypot(x-cx,y-cy)-r); inl=d<tol
        if best is None or inl.sum()>best[0]: best=(inl.sum(),inl)
    inl=best[1]; return kasa(x[inl],y[inl])+(inl.mean(),)
def fit_frame(f, c0=(320,180)):
    L=cv2.cvtColor(f,cv2.COLOR_BGR2GRAY).astype(np.float32)
    Lb=cv2.GaussianBlur(L,(0,0),3)
    dark=np.percentile(Lb,3); inside=np.percentile(Lb[120:240,220:420],50)
    if inside-dark<40: return None
    thr=dark+0.5*(inside-dark)
    pts=[]
    cx0,cy0=c0
    for a in np.deg2rad(np.arange(0,360,2)):
        rs=np.arange(20,800,0.5); xs=cx0+rs*np.cos(a); ys=cy0+rs*np.sin(a)
        ok=(xs>=1)&(xs<W-2)&(ys>=1)&(ys<H-2)
        if ok.sum()<10: continue
        xs,ys,rs=xs[ok],ys[ok],rs[ok]
        v=cv2.remap(Lb,xs.astype(np.float32)[None],ys.astype(np.float32)[None],cv2.INTER_LINEAR)[0]
        below=np.nonzero(v<thr)[0]
        if len(below)==0: continue
        # first crossing after being inside; require it stays dark for 6px
        j=below[0]
        if j==0: continue
        if j+12<len(v) and np.mean(v[j:j+12]<thr)<0.8: continue
        # subpixel
        t=(v[j-1]-thr)/max(v[j-1]-v[j],1e-6); r=rs[j-1]+t*(rs[j]-rs[j-1])
        pts.append((cx0+r*np.cos(a),cy0+r*np.sin(a)))
    if len(pts)<15: return None
    p=np.array(pts); cx,cy,r,inl=ransac(p[:,0],p[:,1])
    return dict(cx=float(cx),cy=float(cy),r=float(r),inlier=float(inl),n=len(pts),dark=float(dark),inside=float(inside))
def radial_profile(f, cx,cy,R, nb=160, rmax=1.6):
    yy,xx=np.mgrid[0:H,0:W]; rr=np.hypot(xx-cx,yy-cy)/R
    out={}
    for ch,name in ((2,'R'),(1,'G'),(0,'B')):
        v=f[...,ch].astype(np.float32)
        bins=np.linspace(0,rmax,nb+1); idx=np.digitize(rr.ravel(),bins)-1
        prof=np.array([np.median(v.ravel()[idx==i]) if np.sum(idx==i)>30 else np.nan for i in range(nb)])
        out[name]=prof
    out['r']=(bins[:-1]+bins[1:])/2
    return out
if __name__=='__main__':
    res=[]
    c=(320,180)
    for i in list(range(int(10.0*24),int(21.5*24),2))+list(range(int(45.0*24),int(54.0*24),2)):
        f=np.array(frames()[i]); fit=fit_frame(f,c)
        if fit is None: res.append(dict(t=i/24,fit=None)); continue
        fit2=fit_frame(f,(fit['cx'],fit['cy'])) if 0<fit['cx']<W and 0<fit['cy']<H else fit
        if fit2: fit=fit2
        fit['t']=i/24; res.append(fit)
    json.dump(res,open(FX+'/out/lens_fit.json','w'),indent=0)
    for r in res[::3]:
        if 'r' in r: print('t=%.2f c=(%.1f,%.1f) R=%.1f (R/H=%.3f, R/W=%.3f) inl=%.2f n=%d dark=%.0f inside=%.0f'%(r['t'],r['cx'],r['cy'],r['r'],r['r']/H,r['r']/W,r['inlier'],r['n'],r['dark'],r['inside']))
        else: print('t=%.2f none'%r['t'])
