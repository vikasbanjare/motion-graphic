import numpy as np, cv2, sys, json
sys.path.insert(0,'src')
from engrave import engrave, prepare_fields, fbm, DEFAULTS, LENS_PRESET
from metrics import luma, compare
from resynth import SCENES, ref_crop, tone_from_ref
from fit_breakup import allstats
E=dict(wobble=0.5,seg_len=3.5,seg_jitter=0.75,seg_width=0.3,seg_gap=0.3,detail=0.7)
STOPS={'columns':((0.0,'#782b31'),(0.5,'#c1876e'),(1.0,'#e2d0bc')),'flowers':((0.0,'#69458f'),(0.5,'#b280d4'),(1.0,'#f6e1fb'))}
def lab(img,txt):
    img=img.copy(); cv2.rectangle(img,(0,0),(img.shape[1],20),(255,255,255),-1); cv2.putText(img,txt,(4,14),cv2.FONT_HERSHEY_SIMPLEX,0.45,(0,0,0),1,cv2.LINE_AA); return img
res={}
for name in ['lighthouse','columns','green_rock','flowers']:
    s=SCENES[name]; R=ref_crop(name); h,w=R.shape[:2]
    pre=dict(LENS_PRESET) if name=='green_rock' else {}; pre.pop('period_frac',None)
    t=tone_from_ref(R,s['P']); T3=cv2.resize(t,(w*3,h*3),interpolation=cv2.INTER_CUBIC)
    base=dict(DEFAULTS); base.update(pre); base.update(period_frac=s['P']/360,angle_deg=s['ang'],vignette=0.0,wobble_scale=DEFAULTS['wobble_scale']*s['P']/2.34)
    out={}
    tiles=[lab(cv2.resize(R,(w*3,h*3),interpolation=cv2.INTER_NEAREST),f'REFERENCE {name}')]
    for cn,cp in [('A (smooth wobble)',dict(wobble=0.9,seg_len=0,detail=0.4)),('E (final)',E)]:
        p=dict(base); p.update(cp); p['stops']=STOPS.get(name,((0.0,s['ink']),(1.0,s['paper'])))
        rgb,_=engrave(T3,**p,frame_h=1080)
        small=np.clip(cv2.resize((rgb*255).astype(np.float32),(w,h),interpolation=cv2.INTER_AREA),0,255).astype(np.uint8)
        m=compare(R,small,P=s['P'],ang=s['ang']); o=allstats(luma(small),s['P'],s['ang'])
        m.update({k:round(float(o[k]),3) for k in ('prms','coh','ocoh','astd')})
        out[cn]=m; tiles.append(lab(cv2.resize(small,(w*3,h*3),interpolation=cv2.INTER_NEAREST),f'OURS {cn}'))
    r=allstats(luma(R),s['P'],s['ang']); out['REF']={k:round(float(r[k]),3) for k in ('prms','coh','ocoh','astd','le','hp','edge')}
    res[name]=out
    gap=np.full((h*3,6,3),255,np.uint8); row=tiles[0]
    for tl in tiles[1:]: row=np.hstack([row,gap,tl])
    cv2.imwrite(f'compare/resynth_{name}.png',cv2.cvtColor(row,cv2.COLOR_RGB2BGR))
    keys=['period_ratio','mod_shape_corr','mod_amp_ratio','hist_intersection','luma_emd','edge_ratio','hp_std_ref','hp_std_ours','line_energy_ref','line_energy_ours','dE_quantile_colours','prms','coh','ocoh','astd']
    print(f"\n{name}  REF phase rms {out['REF']['prms']} coh {out['REF']['coh']} ocoh {out['REF']['ocoh']} astd {out['REF']['astd']}")
    for cn in ['A (smooth wobble)','E (final)']: print('  ',cn,{k:out[cn][k] for k in keys})
json.dump(res,open('compare/resynth_metrics.json','w'),indent=1,default=float)
