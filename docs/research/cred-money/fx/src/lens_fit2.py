import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
from common import *
from lens_fit import kasa, ransac, radial_profile
import json
W,H=640,360
def fit_frame(f, c0=(320,185), r_start=150, dark_run=24):
    L=cv2.cvtColor(f,cv2.COLOR_BGR2GRAY).astype(np.float32)
    Lb=cv2.GaussianBlur(L,(0,0),2)
    dark=np.percentile(Lb,2); inside=np.percentile(Lb[100:260,180:460],50)
    if inside-dark<40: return None
    thr=dark+0.35*(inside-dark)
    pts=[]
    for a in np.deg2rad(np.arange(0,360,1.5)):
        rs=np.arange(r_start,800,0.5); xs=c0[0]+rs*np.cos(a); ys=c0[1]+rs*np.sin(a)
        ok=(xs>=1)&(xs<W-2)&(ys>=1)&(ys<H-2)
        if ok.sum()<10: continue
        xs,ys,rs=xs[ok],ys[ok],rs[ok]
        v=cv2.remap(Lb,xs.astype(np.float32)[None],ys.astype(np.float32)[None],cv2.INTER_LINEAR)[0]
        dk=v<thr
        # first index j where the next dark_run samples are all dark
        run=np.convolve(dk.astype(int),np.ones(dark_run,int),'valid')
        js=np.nonzero(run==dark_run)[0]
        if len(js)==0 or js[0]==0: continue
        j=js[0]
        t=(v[j-1]-thr)/max(v[j-1]-v[j],1e-6); r=rs[j-1]+t*(rs[j]-rs[j-1])
        pts.append((c0[0]+r*np.cos(a),c0[1]+r*np.sin(a)))
    if len(pts)<20: return None
    p=np.array(pts); cx,cy,r,inl=ransac(p[:,0],p[:,1],tol=1.5)
    return dict(cx=float(cx),cy=float(cy),r=float(r),inlier=float(inl),n=len(pts),dark=float(dark),inside=float(inside))
if __name__=='__main__':
    res=[]
    for i in list(range(int(10.0*24),int(21.5*24)))+list(range(int(45.0*24),int(54.0*24))):
        f=np.array(frames()[i]); fit=fit_frame(f)
        if fit and 150<fit['r']<600 and fit['inlier']>0.5:
            fit['t']=i/24; res.append(fit)
        else: res.append(dict(t=i/24))
    json.dump(res,open(FX+'/out/lens_fit2.json','w'))
    ok=[r for r in res if 'r' in r]
    print('valid',len(ok),'of',len(res))
    for r in res[::6]:
        if 'r' in r: print('t=%.2f c=(%.1f,%.1f) R=%.1f R/H=%.3f inl=%.2f n=%d dark=%.0f in=%.0f'%(r['t'],r['cx'],r['cy'],r['r'],r['r']/H,r['inlier'],r['n'],r['dark'],r['inside']))
        else: print('t=%.2f --'%r['t'])
