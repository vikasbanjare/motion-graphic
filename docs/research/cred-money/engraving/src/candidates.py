import numpy as np, cv2, sys, json
sys.path.insert(0,'src')
from engrave import engrave, prepare_fields, fbm, DEFAULTS, LENS_PRESET
from metrics import luma, compare
from resynth import SCENES, ref_crop, tone_from_ref
from fit_breakup import allstats
C={'A smooth wobble .9':dict(wobble=0.9,seg_len=0,detail=0.4),
   'B wob.6 seg4 j.6 gap.3 det.6':dict(wobble=0.6,seg_len=4,seg_jitter=0.6,seg_width=0.3,seg_gap=0.3,detail=0.6),
   'C wob.4 seg3 j.9 gap.3 det.8':dict(wobble=0.4,seg_len=3,seg_jitter=0.9,seg_width=0.3,seg_gap=0.3,detail=0.8),
   'D wob.3 seg2 j1 gap.4 det.8':dict(wobble=0.3,seg_len=2,seg_jitter=1.0,seg_width=0.4,seg_gap=0.4,detail=0.8)}
def lab(img,txt):
    img=img.copy(); cv2.rectangle(img,(0,0),(img.shape[1],20),(255,255,255),-1); cv2.putText(img,txt,(4,14),cv2.FONT_HERSHEY_SIMPLEX,0.42,(0,0,0),1,cv2.LINE_AA); return img
out={}
for name in sys.argv[1:]:
    s=SCENES[name]; R=ref_crop(name); h,w=R.shape[:2]
    pre=dict(LENS_PRESET) if name=='green_rock' else {}; pre.pop('period_frac',None)
    t=tone_from_ref(R,s['P']); T3=cv2.resize(t,(w*3,h*3),interpolation=cv2.INTER_CUBIC)
    base=dict(DEFAULTS); base.update(pre); base.update(period_frac=s['P']/360,angle_deg=s['ang'],vignette=0.0,wobble=0.0,wobble_scale=DEFAULTS['wobble_scale']*s['P']/2.34)
    F0=prepare_fields(*T3.shape,frame_h=1080,**base); H3,W3=T3.shape; yy,xx=np.mgrid[0:H3,0:W3].astype(float); sc=base['wobble_scale']*1080
    wf=fbm(xx/sc,(H3-1-yy)/sc,3,base['seed'])
    r=allstats(luma(R),s['P'],s['ang']); tiles=[lab(cv2.resize(R,(w*3,h*3),interpolation=cv2.INTER_NEAREST),'REFERENCE')]; out[name]={}
    out[name]['REF']={k:round(float(v),3) for k,v in r.items() if k in('prms','coh','ocoh','astd','le','hp','edge')}
    for cn,cp in C.items():
        Fd=dict(F0); Fd['u']=F0['u']+cp['wobble']*wf; p=dict(base); p.update(cp); p['stops']=((0.0,s['ink']),(1.0,s['paper']))
        rgb,_=engrave(T3,fields=Fd,**p)
        small=np.clip(cv2.resize((rgb*255).astype(np.float32),(w,h),interpolation=cv2.INTER_AREA),0,255).astype(np.uint8)
        o=allstats(luma(small),s['P'],s['ang']); out[name][cn]={k:round(float(v),3) for k,v in o.items() if k in('prms','coh','ocoh','astd','le','hp','edge')}
        tiles.append(lab(cv2.resize(small,(w*3,h*3),interpolation=cv2.INTER_NEAREST),cn))
    gap=np.full((h*3,6,3),255,np.uint8); row=tiles[0]
    for tl in tiles[1:]: row=np.hstack([row,gap,tl])
    cv2.imwrite(f'out/cand_{name}.png',cv2.cvtColor(row,cv2.COLOR_RGB2BGR))
    for k,v in out[name].items(): print(name,k,v)
