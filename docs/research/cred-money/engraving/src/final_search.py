import numpy as np, cv2, sys, json, itertools
sys.path.insert(0,'src')
from engrave import engrave, prepare_fields, fbm, DEFAULTS, LENS_PRESET
from metrics import luma, compare
from resynth import SCENES, ref_crop, tone_from_ref
from fit_breakup import allstats
STOPS={'columns':((0.0,'#782b31'),(0.5,'#c1876e'),(1.0,'#e2d0bc')),'flowers':((0.0,'#69458f'),(0.5,'#b280d4'),(1.0,'#f6e1fb'))}
lg=lambda a,b: abs(np.log(max(abs(a),1e-4)/max(abs(b),1e-4)))
S={}
for name in ['lighthouse','columns','green_rock','flowers']:
    s=SCENES[name]; R=ref_crop(name); h,w=R.shape[:2]
    pre=dict(LENS_PRESET) if name=='green_rock' else {}; pre.pop('period_frac',None)
    t=tone_from_ref(R,s['P']); T3=cv2.resize(t,(w*3,h*3),interpolation=cv2.INTER_CUBIC)
    base=dict(DEFAULTS); base.update(pre); base.update(period_frac=s['P']/360,angle_deg=s['ang'],vignette=0.0,wobble=0.0,wobble_scale=DEFAULTS['wobble_scale']*s['P']/2.34)
    F0=prepare_fields(*T3.shape,frame_h=1080,**base); H3,W3=T3.shape; yy,xx=np.mgrid[0:H3,0:W3].astype(float); sc=base['wobble_scale']*1080
    S[name]=dict(R=R,T3=T3,base=base,F0=F0,wf=fbm(xx/sc,(H3-1-yy)/sc,3,base['seed']),r=allstats(luma(R),s['P'],s['ang']),h=h,w=w)
grid=dict(wobble=[0.6,0.75,0.9],seg_jitter=[0.0,0.3,0.5],seg_len=[4.0,6.0],detail=[0.4,0.55])
res=[]
for vals in itertools.product(*grid.values()):
    q=dict(zip(grid.keys(),vals)); tot=0; per={}
    for name,D in S.items():
        s=SCENES[name]; Fd=dict(D['F0']); Fd['u']=D['F0']['u']+q['wobble']*D['wf']
        p=dict(D['base']); p.update(q); p.update(seg_width=0.3 if q['seg_jitter']>0 else 0.0,seg_gap=0.2 if q['seg_jitter']>0 else 0.0)
        if q['seg_jitter']==0: p['seg_len']=0
        p['stops']=STOPS.get(name,((0.0,s['ink']),(1.0,s['paper'])))
        rgb,_=engrave(D['T3'],fields=Fd,**p)
        small=np.clip(cv2.resize((rgb*255).astype(np.float32),(D['w'],D['h']),interpolation=cv2.INTER_AREA),0,255).astype(np.uint8)
        m=compare(D['R'],small,P=s['P'],ang=s['ang']); o=allstats(luma(small),s['P'],s['ang']); r=D['r']
        parts=dict(amp=lg(m['mod_amp_ratio'],1),shape=1-m['mod_shape_corr'],emd=m['luma_emd']/30,edge=lg(m['edge_ratio'],1),hp=lg(m['hp_std_ours'],m['hp_std_ref']),
                   le=lg(m['line_energy_ours'],m['line_energy_ref']),prms=lg(o['prms'],r['prms']),coh=lg(o['coh'],r['coh']),ocoh=lg(o['ocoh'],r['ocoh']),astd=lg(o['astd'],r['astd']))
        J=sum(parts.values()); tot+=J; per[name]=dict(J=round(J,3),**{k:round(float(v),3) for k,v in parts.items()})
    res.append((tot,q,per)); print(round(tot,3),q,flush=True)
res.sort(key=lambda x:x[0])
print('\nBEST'); 
for tot,q,per in res[:4]: print(round(tot,3),q); [print('   ',k,v) for k,v in per.items()]
json.dump([dict(total=t,params=q,per=p) for t,q,p in res],open('out/final_search.json','w'),indent=1)
