# Offline path test: numpy-shaded procedural subjects (sphere, fluted lathe column, embossed coin) -> engrave.py
import numpy as np, cv2, sys, json
sys.path.insert(0,'src')
from engrave import engrave, DEFAULTS, fbm, match_levels, REF_TONE_Q
from metrics import compare, luma
from palette import rgb as ref_rgb
from cg_score import REF_COL
from fit_breakup import allstats
H,W=1080,1920
yy,xx=np.mgrid[0:H,0:W].astype(np.float64)
L=np.array([-0.55,0.62,0.56]); L/=np.linalg.norm(L)
def shade(N,alb=1.0):
    d=np.clip((N@L+0.15)/1.15,0,1); r=np.clip(N[...,2],0,1)
    return np.clip(0.08+0.92*d*alb+0.12*(1-r)**3,0,1)
albn=lambda s: 1-0.35*(0.5+0.5*fbm(xx/s,yy/s,4,9.0))*1.0       # albedo micro-texture (CG preset: ~0.35)
out={}
# sphere
cx,cy,R=960,540,420; dx=(xx-cx)/R; dy=-(yy-cy)/R; r2=dx*dx+dy*dy; m=(r2<1).astype(float)
N=np.dstack([dx,dy,np.sqrt(np.clip(1-r2,0,1))]); out['sphere']=(shade(N,albn(30))*m,m)
# fluted column (lathe): cylinder seen from front, 20 flutes
cx,R=960,230; dx=(xx-cx)/R; m=((np.abs(dx)<1)&(yy>60)&(yy<1020)).astype(float)
th=np.arcsin(np.clip(dx,-1,1)); fl=0.045*np.maximum(0,np.cos(th*20))**0.6
nx=np.sin(th)-0.35*np.sin(th*20)*np.maximum(0,np.cos(th*20))**0.2;  # visible flutes
N=np.dstack([nx,0*nx,np.cos(th)]); N/=np.linalg.norm(N,axis=-1,keepdims=True)
out['column']=(shade(N,albn(26))*m,m)
# coin relief: rings + raised '5%' via height field
cx,cy,R=960,540,430; dx=(xx-cx); dy=(yy-cy); rr=np.hypot(dx,dy); m=(rr<R).astype(float)
h=np.zeros((H,W)); h+=8*np.exp(-((rr-R*0.93)/10)**2)+3*(np.cos(rr/6.0)>0.6)*((rr>R*0.78)&(rr<R*0.86))
txt=np.zeros((H,W),np.uint8); cv2.putText(txt,'5%',(700,690),cv2.FONT_HERSHEY_TRIPLEX,9,255,40,cv2.LINE_AA)
h+=cv2.GaussianBlur(txt.astype(float)/255*10,(0,0),4)
gy,gx=np.gradient(h); N=np.dstack([-gx,gy,np.ones_like(h)]); N/=np.linalg.norm(N,axis=-1,keepdims=True)
out['coin']=(shade(N,0.8*albn(20))*m,m)
PAL={'sphere':((0.0,'#3b316c'),(0.45,'#615788'),(0.83,'#bcafcb'),(1.0,'#fdf4fd')),
     'column':((0.0,'#7c2537'),(0.45,'#ae5669'),(0.83,'#dea688'),(1.0,'#fbc4a7')),
     'coin':((0.0,'#112812'),(1.0,'#def3d0'))}
tiles=[]; M={}
for k,(t,m) in out.items():
    extra=dict(period_frac=0.0105,fill=0.65,aa=2.0,cov_gamma=1.0) if k=='coin' else (dict(period_frac=0.0069,tone_gamma=1.05) if k=='column' else dict(tone_gamma=1.05))
    refname={'sphere':'columns','column':'columns','coin':'green_rock'}[k]
    lv=match_levels(t,m,REF_TONE_Q[refname],extra_gamma=1.0 if k=='coin' else 1.05); extra.update(lv)
    rgb,_=engrave(t,mask=m,stops=PAL[k],**extra)
    small=np.clip(cv2.resize((rgb*255).astype(np.float32),(640,360),interpolation=cv2.INTER_AREA),0,255).astype(np.uint8)
    cv2.imwrite(f'out/proc_{k}_1080.png',cv2.cvtColor((rgb*255).astype(np.uint8),cv2.COLOR_RGB2BGR)); cv2.imwrite(f'out/proc_{k}_360.png',cv2.cvtColor(small,cv2.COLOR_RGB2BGR))
    shaded=np.clip(cv2.resize((t*255).astype(np.float32),(640,360),interpolation=cv2.INTER_AREA),0,255).astype(np.uint8)
    tiles.append(np.hstack([np.dstack([shaded]*3),np.full((360,6,3),255,np.uint8),small]))
    if k=='column':
        oc=small[40:290,297:343]; mm=compare(REF_COL,cv2.resize(oc,(66,250),interpolation=cv2.INTER_NEAREST) if False else oc,P=2.49,ang=45.0)
        so=allstats(luma(oc),2.49,45.0); M[k]={kk:mm[kk] for kk in ['period_ref','period_ours','hist_intersection','luma_emd','edge_ratio','hp_std_ref','hp_std_ours','line_energy_ref','line_energy_ours','mod_shape_corr','dE_quantile_colours']}
        M[k].update(coherence_ours=round(float(so['coh']),3),phase_rms_ours=round(float(so['prms']),3))
        print('numpy column vs ref column:',M[k])
    if k=='coin':
        r=ref_rgb(47.5).astype(np.uint8)[40:220,170:350]; oc=small[90:270,230:410]; mm=compare(r,oc)
        M[k]={kk:mm[kk] for kk in ['period_ref','period_ours','hist_intersection','luma_emd','edge_ratio','hp_std_ref','hp_std_ours','line_energy_ref','line_energy_ours','mod_shape_corr','dE_quantile_colours']}
        print('numpy coin vs ref lens close-up:',M[k])
sheet=np.vstack([np.vstack([t,np.full((6,t.shape[1],3),255,np.uint8)]) for t in tiles])
cv2.imwrite('compare/numpy_procedural_shaded_vs_engraved.png',cv2.cvtColor(sheet,cv2.COLOR_RGB2BGR))
json.dump(M,open('compare/numpy_procedural_metrics.json','w'),indent=1,default=float)
