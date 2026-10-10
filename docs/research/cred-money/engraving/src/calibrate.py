import numpy as np, cv2, json, sys, itertools, time
sys.path.insert(0,'src')
from engrave import engrave, prepare_fields, hex2rgb, fbm
from metrics import luma, mod_curve, emd, edge_density, hp_std, fft_period
from resynth import SCENES, setup
def stats(g,P,ang):
    c,_=mod_curve(g,P,ang); p,a,f=fft_period(g)
    return dict(curve=c,emd_src=g,hp=hp_std(g),edge=edge_density(g),le=f,mean=g.mean())
def objective(sr,so):
    mx=np.nanmax(sr['curve']); ok=~np.isnan(sr['curve'])&~np.isnan(so['curve'])
    cur=np.sqrt(np.mean(((so['curve'][ok]-sr['curve'][ok])/mx)**2))
    e=emd(sr['emd_src'],so['emd_src'])/30
    lg=lambda a,b: abs(np.log(max(a,1e-6)/max(b,1e-6)))
    return cur+e+0.5*lg(so['hp'],sr['hp'])+0.5*lg(so['edge'],sr['edge'])+0.5*lg(so['le'],sr['le']), dict(curve=round(cur,3),emd=round(e*30,2),hp=round(so['hp']/sr['hp'],2),edge=round(so['edge']/max(sr['edge'],1e-6),2),le=round(so['le']/sr['le'],2))
def run(name,grid):
    s=SCENES[name]; R,T3,F,base=setup(name,wobble=0.06,width_jitter=0.10,grain=0.0,mottle=0.0)
    gR=luma(R); sr=stats(gR,s['P'],s['ang'])
    H3,W3=T3.shape; yy,xx=np.mgrid[0:H3,0:W3].astype(float); Pp=s['P']*3
    det=fbm(xx/(Pp*1.5),yy/(Pp*1.5),3,21.0)
    ink=hex2rgb(s['ink']); pap=hex2rgb(s['paper'])
    h,w=R.shape[:2]; res=[]
    keys=list(grid.keys())
    for vals in itertools.product(*[grid[k] for k in keys]):
        q=dict(zip(keys,vals)); k=q.pop('k'); d=q.pop('detail')
        Tin=np.clip(T3+d*det,0,1)
        p=dict(base); p.update(q); p['stops']=((0.0,np.clip(pap+k*(ink-pap),0,1)),(1.0,pap))
        rgb,_=engrave(Tin,fields=F,**p)
        small=np.clip(cv2.resize((rgb*255).astype(np.float32),(w,h),interpolation=cv2.INTER_AREA),0,255)
        so=stats(luma(small),s['P'],s['ang'])
        J,parts=objective(sr,so); res.append((J,dict(q,k=k,detail=d),parts))
    res.sort(key=lambda r:r[0])
    return res,sr
if __name__=='__main__':
    grid=dict(dmax=[0.6,0.8,1.0],t_hi=[0.6,0.8,1.0],cov_gamma=[0.6,1.0,1.6],fill=[0.0,0.3,0.6],tone_gamma=[0.75,1.0,1.33],k=[1.0,1.4],aa=[1.0,3.0],detail=[0.0,0.15,0.3])
    out={}
    for name in sys.argv[1:] or SCENES:
        t0=time.time(); res,sr=run(name,grid)
        print(f"\n== {name}  ({len(res)} combos, {time.time()-t0:.0f}s)  ref hp={sr['hp']:.1f} edge={sr['edge']:.4f} lineEnergy={sr['le']:.3f}",flush=True)
        for J,q,parts in res[:8]: print(f"  J={J:.3f} {q} {parts}",flush=True)
        out[name]=[dict(J=round(J,4),params=q,parts=parts) for J,q,parts in res[:40]]
        json.dump(out,open('out/calib_grid.json','w'),indent=1)
