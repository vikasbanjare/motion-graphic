import numpy as np, cv2, json, sys, io, contextlib
sys.path.insert(0,'src')
from engrave import engrave, hex2rgb, DEFAULTS, LENS_PRESET
from metrics import compare, luma
from resynth import SCENES, setup
from phase_wobble import analyse
def label(img,txt):
    img=img.copy(); cv2.rectangle(img,(0,0),(img.shape[1],22),(255,255,255),-1)
    cv2.putText(img,txt,(6,16),cv2.FONT_HERSHEY_SIMPLEX,0.5,(0,0,0),1,cv2.LINE_AA); return img
allm={}
for name in ['lighthouse','columns','green_rock','flowers']:
    s=SCENES[name]; pre=dict(LENS_PRESET) if name=='green_rock' else {}
    pre.pop('period_frac',None)
    R,T3,F,base=setup(name,wobble=DEFAULTS['wobble'],wobble_scale=DEFAULTS['wobble_scale']*s['P']/2.34,width_jitter=DEFAULTS['width_jitter'],grain=0.0,mottle=0.0)
    p=dict(DEFAULTS); p.update(base); p.update(pre); p['vignette']=0; p['grain']=DEFAULTS['grain']; p['mottle']=DEFAULTS['mottle']
    p['stops']=((0.0,s['ink']),(1.0,s['paper']))
    rgb,_=engrave(T3,fields=F,**p)
    h,w=R.shape[:2]; ours=np.clip(cv2.resize((rgb*255).astype(np.float32),(w,h),interpolation=cv2.INTER_AREA),0,255).astype(np.uint8)
    m=compare(R,ours,P=s['P'],ang=s['ang'])
    f=io.StringIO()
    with contextlib.redirect_stdout(f):
        pr=analyse(name,luma(R),s['P'],s['ang'],'r'); po=analyse(name,luma(ours),s['P'],s['ang'],'o')
    m.update(phase_rms_periods_ref=round(pr[0],3),phase_rms_periods_ours=round(po[0],3),coherence_ref=round(pr[1],3),coherence_ours=round(po[1],3))
    m['preset']='lens' if pre else 'default'
    allm[name]=m
    Z=3; a=cv2.resize(R,(w*Z,h*Z),interpolation=cv2.INTER_NEAREST); b=cv2.resize(ours,(w*Z,h*Z),interpolation=cv2.INTER_NEAREST)
    gap=np.full((h*Z,8,3),255,np.uint8)
    sbs=np.hstack([label(a,f'REFERENCE {name} t={s["t"]}s (360p crop, x{Z})'),gap,label(b,f'OURS re-engraved, same tone, {m["preset"]} params (x{Z})')])
    cv2.imwrite(f'compare/resynth_{name}.png',cv2.cvtColor(sbs,cv2.COLOR_RGB2BGR))
    print(name,{k:m[k] for k in ['period_ratio','angle_ref','angle_ours','mod_shape_corr','mod_amp_ratio','hist_intersection','luma_emd','edge_ratio','hp_std_ref','hp_std_ours','line_energy_ref','line_energy_ours','coherence_ref','coherence_ours','dE_quantile_colours']})
json.dump(allm,open('compare/resynth_metrics.json','w'),indent=1)
