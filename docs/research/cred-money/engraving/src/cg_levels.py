import numpy as np, cv2, sys, json
sys.path.insert(0,'src')
from resynth import SCENES, ref_crop, tone_from_ref
def levels_for(plain_png, box, ref_name, bg=(0xe9,0xe4,0xda)):
    im=cv2.imread(plain_png)[:,:,::-1].astype(float); x0,y0,x1,y1=box
    reg=im[y0:y1,x0:x1]; L=(0.299*reg[...,0]+0.587*reg[...,1]+0.114*reg[...,2])/255
    m=np.abs(reg-np.array(bg)).sum(-1)>12
    q05,q50,q95=np.percentile(L[m],[5,50,95])
    s=SCENES[ref_name]; T=tone_from_ref(ref_crop(ref_name),s['P']); T05,T50,T95=np.percentile(T,[5,50,95])
    # linear stretch so q05->T05, q95->T95 (gamma 1), then gamma to hit the median
    white=q05+(q95-q05)*(1-T05)/(T95-T05); black=q05-(q95-q05)*T05/(T95-T05)
    if q95-q05<0.15:      # flat / clipped render: don't stretch noise into tone, fall back to identity levels
        return dict(black=0.0,white=1.0,toneGamma=1.0),dict(render_q=[q05,q50,q95],ref_T=[T05,T50,T95])
    mid=np.clip((q50-black)/(white-black),1e-3,0.999); gamma=float(np.clip(np.log(max(T50,1e-3))/np.log(mid),0.6,2.5))
    return dict(black=round(float(black),3),white=round(float(white),3),toneGamma=round(gamma,3)),dict(render_q=[q05,q50,q95],ref_T=[T05,T50,T95])
if __name__=='__main__':
    lv,info=levels_for('out/web/col_plain.png',(810,60,1170,1000),'columns'); print(lv,info)
