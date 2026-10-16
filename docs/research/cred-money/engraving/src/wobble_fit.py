import numpy as np, cv2, sys, itertools
sys.path.insert(0,'src')
from metrics import luma
from resynth import SCENES, ref_crop, setup
from engrave import engrave, to_ref_scale
from phase_wobble import analyse
import io, contextlib
def run(name,codec=False,**kw):
    s=SCENES[name]; R,T3,F,base=setup(name,grain=0,mottle=0,**{k:v for k,v in kw.items() if k in('wobble','wobble_scale','width_jitter')})
    p=dict(base); p.update({k:v for k,v in kw.items() if k not in('wobble','wobble_scale','width_jitter')})
    rgb,_=engrave(T3,fields=F,**p); h,w=R.shape[:2]
    if codec:
        hh,ww=(h//2)*2,(w//2)*2; small=to_ref_scale(cv2.resize(rgb.astype(np.float32),(ww*3,hh*3)).astype(np.float64),out_h=hh,codec=True,crf=30,tmpdir='out').astype(np.float32)
    else:
        small=cv2.resize((rgb*255).astype(np.float32),(w,h),interpolation=cv2.INTER_AREA)
    f=io.StringIO()
    with contextlib.redirect_stdout(f): r=analyse(name,luma(np.clip(small,0,255)),s['P'],s['ang'],'x')
    return r
print('codec effect on clean screen (green_rock):', 'no codec',np.round(run('green_rock'),3),' codec crf30',np.round(run('green_rock',codec=True),3))
print('detail effect:', [ (d,np.round(run('green_rock',detail=d),3)) for d in (0.15,0.3,0.5)])
res=[]
for wob,ws,wj in itertools.product([0.3,0.6,0.9,1.2],[0.006,0.009,0.012,0.018],[0.1,0.3]):
    out=[]
    for name in ['green_rock','lighthouse']:
        out.append(run(name,wobble=wob,wobble_scale=ws*(SCENES[name]['P']/2.34),width_jitter=wj))
    out=np.array(out)  # rows: (rms_periods, coherence, L)
    tgt=np.array([[0.203,0.447,6],[0.189,0.527,4]])
    err=np.abs(out[:,1]-tgt[:,1]).sum()+np.abs(out[:,0]-tgt[:,0]).sum()+0.03*np.abs(out[:,2]-tgt[:,2]).sum()
    res.append((err,wob,ws,wj,out.round(3).tolist()))
res.sort()
for r in res[:8]: print('err=%.3f wobble=%.2f wobble_scale(H, at P=0.0065H)=%.4f width_jitter=%.1f  [rms_periods,coherence,acfLen] green_rock,lighthouse=%s'%r)
