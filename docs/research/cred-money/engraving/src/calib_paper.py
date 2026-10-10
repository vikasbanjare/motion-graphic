import numpy as np, cv2, sys, itertools, json
sys.path.insert(0,'src'); from engrave import value_noise, fbm
def stats(g):
    base=cv2.GaussianBlur(g,(0,0),25); hp=g-base
    fine=g-cv2.GaussianBlur(g,(0,0),1.5); mott=cv2.GaussianBlur(g,(0,0),1.5)-base
    h=hp-hp.mean(); S=min(h.shape); h=h[:S,:S]
    P=np.abs(np.fft.fftshift(np.fft.fft2(h*np.outer(np.hanning(S),np.hanning(S)))))**2
    c=S//2; yy,xx=np.mgrid[-c:S-c,-c:S-c]; r=np.hypot(xx,yy); rb=np.arange(3,c-1)
    pw=np.array([P[(r>=a)&(r<a+1)].mean() for a in rb]); slope=np.polyfit(np.log(rb/S),np.log(pw),1)[0]
    return np.array([hp.std(),fine.std(),mott.std(),slope])
REF=np.array([3.34,1.83,2.28,-2.18])
H,W=840,1680   # 1080p-scale patch (280x560 at 360p, same as the measured intro region)
yy,xx=np.mgrid[0:H,0:W].astype(float); yu=H-1-yy
gn=value_noise(xx*0.9,yu*0.9,8.0)*2-1
res=[]
for ms in [0.012,0.016,0.02,0.025]:
    msp=ms*1080; mf=fbm(xx/msp,yu/msp,4,10.0)
    for g_,m_ in itertools.product([0.015,0.02,0.025,0.03],[0.03,0.035,0.04,0.05]):
        pap=210*(1+g_*gn*1.7+m_*mf*1.6)
        small=cv2.resize(pap.astype(np.float32),(W//3,H//3),interpolation=cv2.INTER_AREA).astype(np.float64)
        s=stats(small); err=np.abs(s[:3]-REF[:3]).sum()/REF[:3].sum()+abs(s[3]-REF[3])/4
        res.append((err,dict(grain=g_,mottle=m_,mottle_scale=ms),np.round(s,2).tolist()))
res.sort(key=lambda r:r[0])
for r in res[:6]: print(round(r[0],3),r[1],'stats [hp,grain,mottle,slope]=',r[2],'ref',REF.tolist())
json.dump([dict(err=r[0],params=r[1],stats=r[2]) for r in res[:10]],open('out/calib_paper.json','w'),indent=1)
