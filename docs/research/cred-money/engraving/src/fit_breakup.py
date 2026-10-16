import numpy as np, cv2, sys, json, itertools, time
sys.path.insert(0,'src')
from engrave import engrave, prepare_fields, fbm, DEFAULTS, LENS_PRESET
from metrics import luma, mod_curve, emd, edge_density, hp_std, fft_period
from resynth import SCENES, ref_crop, tone_from_ref
from phase_wobble import local_phase
from straightness import orient_stats
def phase_stats(g,P,ang):
    z=local_phase(g,P,ang); A=np.abs(z); m=A>np.percentile(A,50); m[:8,:]=m[-8:,:]=m[:,:8]=m[:,-8:]=False
    ph=np.angle(z*np.conj(z[m].mean())); return np.sqrt(np.mean(ph[m]**2))/(2*np.pi), abs(np.exp(1j*ph[m]).mean())
def allstats(g,P,ang):
    pr,co=phase_stats(g,P,ang); o=orient_stats(g,P,ang); c,_=mod_curve(g,P,ang); _,_,le=fft_period(g)
    return dict(prms=pr,coh=co,ocoh=o['orient_coherence'],astd=o['angle_circ_std_deg'],le=le,hp=hp_std(g),edge=edge_density(g),curve=c,g=g)
def obj(r,o):
    lg=lambda a,b: abs(np.log(max(a,1e-6)/max(b,1e-6)))
    mx=np.nanmax(r['curve']); ok=~np.isnan(r['curve'])&~np.isnan(o['curve'])
    parts=dict(prms=lg(o['prms'],r['prms']),coh=lg(o['coh'],r['coh']),ocoh=lg(o['ocoh'],r['ocoh']),astd=lg(o['astd'],r['astd']),
               le=0.5*lg(o['le'],r['le']),hp=lg(o['hp'],r['hp']),edge=lg(o['edge'],r['edge']),
               curve=float(np.sqrt(np.mean(((o['curve'][ok]-r['curve'][ok])/mx)**2))),emd=emd(r['g'],o['g'])/30)
    return sum(parts.values()),{k:round(float(v),3) for k,v in parts.items()}
if __name__=='__main__':
    name=sys.argv[1]; s=SCENES[name]; R=ref_crop(name); h,w=R.shape[:2]
    pre=dict(LENS_PRESET) if name=='green_rock' else {}; pre.pop('period_frac',None)
    t=tone_from_ref(R,s['P']); T3=cv2.resize(t,(w*3,h*3),interpolation=cv2.INTER_CUBIC)
    base=dict(DEFAULTS); base.update(pre); base.update(period_frac=s['P']/360,angle_deg=s['ang'],vignette=0.0,wobble=0.0,wobble_scale=DEFAULTS['wobble_scale']*s['P']/2.34)
    F0=prepare_fields(*T3.shape,frame_h=1080,**base)
    H3,W3=T3.shape; yy,xx=np.mgrid[0:H3,0:W3].astype(float); yu=H3-1-yy; sc=base['wobble_scale']*1080
    wf=fbm(xx/sc,yu/sc,3,base['seed'])
    r=allstats(luma(R),s['P'],s['ang'])
    grid=dict(wobble=[0.2,0.4,0.6],seg_len=[2.0,4.0,8.0],seg_jitter=[0.2,0.4,0.6],seg_gap=[0.0,0.3],detail=[0.4,0.6])
    res=[]; t0=time.time()
    for vals in itertools.product(*grid.values()):
        q=dict(zip(grid.keys(),vals)); Fd=dict(F0); Fd['u']=F0['u']+q['wobble']*wf
        p=dict(base); p.update(q); p['seg_width']=0.3; p['stops']=((0.0,s['ink']),(1.0,s['paper']))
        rgb,_=engrave(T3,fields=Fd,**p)
        small=np.clip(cv2.resize((rgb*255).astype(np.float32),(w,h),interpolation=cv2.INTER_AREA),0,255)
        J,parts=obj(r,allstats(luma(small),s['P'],s['ang'])); res.append((J,q,parts))
    res.sort(key=lambda x:x[0])
    print(f"== {name} ({len(res)} combos {time.time()-t0:.0f}s) ref prms={r['prms']:.3f} coh={r['coh']:.3f} ocoh={r['ocoh']:.3f} astd={r['astd']:.1f} le={r['le']:.3f} hp={r['hp']:.1f} edge={r['edge']:.3f}")
    for J,q,pt in res[:5]: print(f"  J={J:.3f} {q} {pt}")
    json.dump([dict(J=J,params=q,parts=pt) for J,q,pt in res],open(f'out/breakup_{name}.json','w'),indent=1)
