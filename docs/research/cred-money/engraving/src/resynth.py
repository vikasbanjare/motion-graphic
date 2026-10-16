import numpy as np, cv2, json, sys
sys.path.insert(0,'src')
from engrave import engrave, prepare_fields, to_ref_scale, hex2rgb
from metrics import compare, luma, mod_curve, emd, edge_density, hp_std
from palette import rgb as ref_rgb
SCENES={
 'lighthouse':dict(t=33.5,box=(0,150,330,360),P=2.00,ang=45.0,ink='#3b5a2e',paper='#caf1b8'),
 'columns':   dict(t=23.0,box=(0,40,110,360),P=2.49,ang=45.0,ink='#782b31',paper='#e2d0bc'),
 'green_rock':dict(t=47.5,box=(170,40,430,250),P=3.78,ang=45.0,ink='#112812',paper='#def3d0'),
 'flowers':   dict(t=6.0,box=(0,40,200,300),P=2.78,ang=45.0,ink='#69458f',paper='#f6e1fb'),
}
def ref_crop(name):
    s=SCENES[name]; x0,y0,x1,y1=s['box']; return ref_rgb(s['t'])[y0:y1,x0:x1].astype(np.uint8)
def tone_from_ref(R,P):
    g=luma(R); M=cv2.GaussianBlur(g,(0,0),P*0.9); lo,hi=np.percentile(M,[0.5,99.5])
    return np.clip((M-lo)/(hi-lo),0,1)
def setup(name,scale=3,**kw):
    s=SCENES[name]; R=ref_crop(name); t=tone_from_ref(R,s['P'])
    h,w=t.shape; T3=cv2.resize(t,(w*scale,h*scale),interpolation=cv2.INTER_CUBIC)
    base=dict(period_frac=s['P']/360,angle_deg=s['ang'],vignette=0.0); base.update(kw)
    F=prepare_fields(*T3.shape,frame_h=360*scale,**base)
    return R,T3,F,base
def render(name,T3,F,base,k=1.0,codec=False,blur=0.0,**params):
    s=SCENES[name]; ink=hex2rgb(s['ink']); pap=hex2rgb(s['paper']); ink2=np.clip(pap+k*(ink-pap),0,1)
    p=dict(base); p.update(params); p['stops']=((0.0,ink2),(1.0,pap))
    rgb,v=engrave(T3,fields=F,frame_h=T3.shape[0]//(T3.shape[0]//360) if False else None,**p)
    h,w=T3.shape[0]//3,T3.shape[1]//3
    small=cv2.resize((rgb*255).astype(np.float32),(w,h),interpolation=cv2.INTER_AREA)
    if blur>0: small=cv2.GaussianBlur(small,(0,0),blur)
    small=np.clip(small,0,255).astype(np.uint8)
    if codec:
        small=to_ref_scale(cv2.resize(small,(w,h)).astype(np.float64)/255,out_h=h,codec=True,tmpdir='out')
        small=cv2.resize(small,(w,h))
    return small
if __name__=='__main__':
    name=sys.argv[1] if len(sys.argv)>1 else 'lighthouse'
    R,T3,F,base=setup(name)
    for mode in [dict(),dict(codec=True),dict(blur=0.4),dict(blur=0.6)]:
        o=render(name,T3,F,base,**mode); r=compare(R,o,P=SCENES[name]['P'],ang=SCENES[name]['ang'])
        print(mode,{k:r[k] for k in ['period_ours','mod_amp_ratio','mod_shape_corr','luma_emd','edge_ratio','hp_std_ref','hp_std_ours','line_energy_ref','line_energy_ours']})
