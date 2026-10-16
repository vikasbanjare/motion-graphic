import numpy as np, cv2, json, sys, itertools
sys.path.insert(0,'src')
from engrave import engrave, hex2rgb
from metrics import luma
from calibrate import stats, objective
from resynth import SCENES, setup
from engrave import fbm
names=['lighthouse','columns','green_rock','flowers']
S={}
for name in names:
    s=SCENES[name]; R,T3,F,base=setup(name,wobble=0.9,wobble_scale=0.018*s['P']/2.34,width_jitter=0.10,grain=0.0,mottle=0.0)
    H3,W3=T3.shape; yy,xx=np.mgrid[0:H3,0:W3].astype(float); Pp=s['P']*3
    S[name]=dict(R=R,T3=T3,F=F,base=base,sr=stats(luma(R),s['P'],s['ang']),det=fbm(xx/(Pp*1.5),yy/(Pp*1.5),3,21.0))
grid=dict(fill=[0.45,0.55,0.65],detail=[0.4,0.55],cov_gamma=[1.0,1.3,1.6],dmax=[0.8,0.9,1.0],tone_gamma=[1.0,1.15,1.33])
fixed=dict(t_hi=0.75,aa=1.0,skew=0.0)
res=[]
for vals in itertools.product(*grid.values()):
    q=dict(zip(grid.keys(),vals)); d=q.pop('detail'); Js={}; parts={}
    for name in names:
        s=SCENES[name]; D=S[name]; ink=hex2rgb(s['ink']); pap=hex2rgb(s['paper'])
        p=dict(D['base']); p.update(fixed); p.update(q); p['stops']=((0.0,ink),(1.0,pap))
        rgb,_=engrave(np.clip(D['T3']+d*D['det'],0,1),fields=D['F'],**p)
        h,w=D['R'].shape[:2]; small=np.clip(cv2.resize((rgb*255).astype(np.float32),(w,h),interpolation=cv2.INTER_AREA),0,255)
        J,pt=objective(D['sr'],stats(luma(small),s['P'],s['ang'])); Js[name]=round(J,3); parts[name]=pt
    res.append((sum(Js.values()),max(Js.values()),dict(q,detail=d,**fixed),Js,parts))
res.sort(key=lambda r:r[0])
for r in res[:6]: print(f"sumJ={r[0]:.3f} maxJ={r[1]:.3f} {r[2]}\n     {r[3]}")
json.dump([dict(sumJ=r[0],maxJ=r[1],params=r[2],J=r[3],parts={k:{kk:float(vv) for kk,vv in v.items()} for k,v in r[4].items()}) for r in res[:10]],open('out/consensus.json','w'),indent=1)
