import numpy as np, cv2, sys, json
sys.path.insert(0,'src')
from metrics import compare, luma
from fit_breakup import allstats
from palette import rgb as ref_rgb
from cg_score import to360, REF_COL, OUR_BOX
def lab(img,txt,s=0.5):
    img=np.ascontiguousarray(img.copy()); cv2.rectangle(img,(0,0),(img.shape[1],22),(255,255,255),-1); cv2.putText(img,txt,(5,16),cv2.FONT_HERSHEY_SIMPLEX,s,(0,0,0),1,cv2.LINE_AA); return img
def hcat(*ims,gap=8):
    h=max(i.shape[0] for i in ims); out=[]
    for k,i in enumerate(ims):
        i=np.pad(i,((0,h-i.shape[0]),(0,0),(0,0)),constant_values=255); out.append(i)
        if k<len(ims)-1: out.append(np.full((h,gap,3),255,np.uint8))
    return np.hstack(out)
def vcat(*ims,gap=8):
    w=max(i.shape[1] for i in ims); out=[]
    for k,i in enumerate(ims):
        out.append(np.pad(i,((0,0),(0,w-i.shape[1]),(0,0)),constant_values=255))
        if k<len(ims)-1: out.append(np.full((gap,w,3),255,np.uint8))
    return np.vstack(out)
def save(name,img): cv2.imwrite(f'compare/{name}.png',cv2.cvtColor(img,cv2.COLOR_RGB2BGR))
def keym(m): return {k:m[k] for k in ['period_ref','period_ours','period_ratio','angle_ref','angle_ours','hist_intersection','luma_emd','mean_ref','mean_ours','edge_density_ref','edge_density_ours','edge_ratio','hp_std_ref','hp_std_ours','line_energy_ref','line_energy_ours','mod_shape_corr','mod_amp_ratio','dE_quantile_colours']}
M={}
PAIRS=[('final_stilllife_crimson4',24.5,'columns scene (crimson/peach)',(70,70,250,250),(0,60,180,240)),
       ('final_stilllife_mint4',33.5,'lighthouse scene (mint)',(70,70,250,250),(150,100,330,280)),
       ('final_coin_forest',47.5,'lens close-up (forest green)',(230,110,410,290),(170,40,350,220)),
       ('final_sphere_lavender4',29.5,'turtle/seabed scene (lavender)',(240,90,420,270),(0,180,180,360)),
       ('final_card_violet',6.0,'flower collage (violet)',(230,150,410,330),(0,40,180,220))]
for name,t,desc,ob,rb in PAIRS:
    o=to360(f'out/web/{name}.png'); r=ref_rgb(t).astype(np.uint8)
    mf=compare(r,o); x0,y0,x1,y1=ob; a0,b0,a1,b1=rb
    oc=o[y0:y1,x0:x1]; rc=r[b0:b1,a0:a1]; mr=compare(rc,oc,P=None)
    M[name]=dict(reference_t=t,reference=desc,full_frame=keym(mf),region=keym(mr),region_boxes=dict(ours=ob,ref=rb))
    Z=3
    top=hcat(lab(r,f'REFERENCE t={t}s 640x360 ({desc})',0.42),lab(o,f'OURS {name} (1080p render -> 640x360)',0.42))
    bot=hcat(lab(cv2.resize(rc,(180*Z,180*Z),interpolation=cv2.INTER_NEAREST),'reference detail x3'),lab(cv2.resize(oc,(180*Z,180*Z),interpolation=cv2.INTER_NEAREST),'ours detail x3'))
    save(f'{name}_vs_ref',vcat(top,bot))
    print(name,'FULL',{k:mf[k] for k in ['period_ratio','hist_intersection','luma_emd','edge_ratio','hp_std_ref','hp_std_ours','dE_quantile_colours']},'\n   REGION',{k:mr[k] for k in ['period_ref','period_ours','hist_intersection','luma_emd','edge_ratio','hp_std_ref','hp_std_ours','line_energy_ref','line_energy_ours','mod_shape_corr','dE_quantile_colours']})
# column: the calibrated CG comparison (shaft vs shaft)
o=to360('out/web/final_column_crimson4.png'); x0,y0,x1,y1=OUR_BOX; oc=o[y0:y1,x0:x1]
m=compare(REF_COL,oc,P=2.49,ang=45.0); so=allstats(luma(oc),2.49,45.0); sr=allstats(luma(REF_COL),2.49,45.0)
m2=keym(m); m2.update(phase_rms_ref=round(float(sr['prms']),3),phase_rms_ours=round(float(so['prms']),3),coherence_ref=round(float(sr['coh']),3),coherence_ours=round(float(so['coh']),3),
                      orient_coh_ref=round(float(sr['ocoh']),3),orient_coh_ours=round(float(so['ocoh']),3),angle_std_ref=round(float(sr['astd']),1),angle_std_ours=round(float(so['astd']),1))
M['final_column_crimson4']=dict(reference_t=23.0,reference='left column shaft, columns scene',region=m2)
print('column',m2)
full=cv2.imread('out/web/final_column_crimson4.png')[:,:,::-1][120:870,860:1060]
Z=4; save('column_shaft_vs_ref',hcat(lab(cv2.resize(REF_COL,(66*Z,250*Z),interpolation=cv2.INTER_NEAREST),'REF column 360p x4',0.45),
                                     lab(cv2.resize(oc,(66*Z,250*Z),interpolation=cv2.INTER_NEAREST),'OURS 360p x4',0.45),
                                     lab(cv2.resize(full,(200*5//4*1,1000)[::-1] if False else (267,1000),interpolation=cv2.INTER_AREA),'OURS native 1080p',0.45)))
# plain vs engraved, and UV-material vs screen-space post
pl=to360('out/web/final_plain_stilllife.png'); en=to360('out/web/final_stilllife_crimson4.png')
save('stilllife_plain_vs_engraved',hcat(lab(pl,'input: plain three.js render'),lab(en,'engraving post-process (CG preset, crimson4)')))
a=to360('out/web/final_sphere_screenpost.png'); b=to360('out/web/final_sphere_uvmaterial.png'); c=to360('out/web/final_column_uvmaterial.png')
save('screen_post_vs_uv_material',hcat(lab(a,'post-process: screen-fixed 45deg (reference behaviour)',0.42),lab(b,'material mode 1: lines follow UV (latitude)',0.42),lab(c,'material mode 1: column rings',0.42)))
json.dump(M,open('compare/final_metrics.json','w'),indent=1,default=float)
