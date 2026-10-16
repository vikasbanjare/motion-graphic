import numpy as np, cv2, sys, json, glob, os
sys.path.insert(0,'src')
from metrics import luma, compare
from fit_breakup import allstats
from palette import rgb as ref_rgb
lg=lambda a,b: abs(np.log(max(abs(a),1e-4)/max(abs(b),1e-4)))
def to360(png):
    im=cv2.imread(png)[:,:,::-1].astype(np.float32); return np.clip(cv2.resize(im,(640,360),interpolation=cv2.INTER_AREA),0,255).astype(np.uint8)
def score(ours_crop, ref_crop_, P=2.49, ang=45.0):
    m=compare(ref_crop_,ours_crop,P=P,ang=ang); o=allstats(luma(ours_crop),P,ang); r=allstats(luma(ref_crop_),P,ang)
    parts=dict(period=lg(m['period_ratio'],1),amp=lg(m['mod_amp_ratio'],1),shape=1-m['mod_shape_corr'],emd=m['luma_emd']/30,edge=lg(m['edge_ratio'],1),hp=lg(m['hp_std_ours'],m['hp_std_ref']),
               le=lg(m['line_energy_ours'],m['line_energy_ref']),prms=lg(o['prms'],r['prms']),coh=lg(o['coh'],r['coh']),ocoh=lg(o['ocoh'],r['ocoh']),astd=lg(o['astd'],r['astd']))
    stats=dict(m,prms_ours=round(float(o['prms']),3),prms_ref=round(float(r['prms']),3),coh_ours=round(float(o['coh']),3),coh_ref=round(float(r['coh']),3),
               ocoh_ours=round(float(o['ocoh']),3),ocoh_ref=round(float(r['ocoh']),3),astd_ours=round(float(o['astd']),1),astd_ref=round(float(r['astd']),1))
    return sum(parts.values()),{k:round(float(v),3) for k,v in parts.items()},stats
REF_COL=ref_rgb(23.0)[40:290,0:66].astype(np.uint8)       # reference: left column shaft, columns scene
OUR_BOX=(290,40,356,290)                                  # our column shaft at 640x360
if __name__=='__main__':
    res=[]
    for f in sorted(glob.glob(sys.argv[1])):
        o=to360(f); x0,y0,x1,y1=OUR_BOX; J,parts,st=score(o[y0:y1,x0:x1],REF_COL); res.append((J,os.path.basename(f),parts,st))
    res.sort(key=lambda r:r[0])
    for J,n,p,st in res[:8]: print(f"{J:.3f} {n} {p}")
    json.dump([dict(J=J,name=n,parts=p,stats=st) for J,n,p,st in res],open('out/cg_score.json','w'),indent=1,default=float)
