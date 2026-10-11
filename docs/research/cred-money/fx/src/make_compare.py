import sys, json; sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
from common import *
from compare_foil import h264_roundtrip
from skimage.color import rgb2lab, lab2rgb
R=FX+'/renders/'; C=FX+'/compare/'
def lab(im,txt,col=(0,0,255)):
    im=im.copy(); cv2.rectangle(im,(0,0),(min(im.shape[1],8+9*len(txt)),20),(255,255,255),-1); cv2.putText(im,txt,(4,15),cv2.FONT_HERSHEY_SIMPLEX,0.45,col,1); return im
def ours(name): return h264_roundtrip(R+name+'.png', R+'_rt_'+name+'.png')
# 1 lens
a=lab(at(15.0),'REF t=15.0 lens'); b=lab(ours('FxLens_f40'),'OURS Lens (R50=0.814H, edge table, dark #0b0d0c)')
c=lab(at(10.25),'REF t=10.25 iris closing'); d=lab(ours('FxLens_f4'),'OURS irisIn t=0.17s')
cv2.imwrite(C+'cmp_lens.jpg',np.vstack([np.hstack([a,b]),np.hstack([c,d])]))
# 2 band
a=lab(at(15.0)[140:220],'REF t=15 band'); b=lab(ours('FxBand_f24')[140:220],'OURS HoloBand Lexend500 ls0.43em')
c=lab(at(18.0)[110:250],'REF t=18 band close'); d=lab(ours('FxBandZoom_f0')[110:250],'OURS band close')
cv2.imwrite(C+'cmp_band.jpg',np.vstack([np.hstack([a,b]),np.hstack([c,d])]))
# 3 foil
fj={k:json.load(open(FX+f'/out/compare_foil_{k}.json')) for k in ('gl3',)}
gl=ours('FxFoil_f24')
r1=cv2.resize(at(30.0)[170:360,0:300],(300,190)); r2=cv2.resize(at(42.0)[110:300,170:470],(300,190))
o1=cv2.resize(gl[60:330,120:390],(300,190)); o2=cv2.resize(gl[60:330,330:600],(300,190))
s=fj['gl3']
cv2.imwrite(C+'cmp_foil.jpg',np.vstack([np.hstack([lab(r1,'REF turtle t=30'),lab(r2,'REF shell t=42')]),
    np.hstack([lab(o1,'OURS shell preset: hueI %.2f chromaRMSE %.3f'%(s['sphere']['vs']['shell']['hue_hist_intersection'],s['sphere']['vs']['shell']['chroma_curve_rmse'])),
               lab(o2,'OURS pearl preset vs turtle: hueI %.2f rmse %.3f'%(s['card']['vs']['turtle']['hue_hist_intersection'],s['card']['vs']['turtle']['chroma_curve_rmse']))])]))
# 4 duotone round trip: ref -> luma -> LUT -> compare dE
d=json.load(open(FX+'/out/duotone_luts.json'))
rows=[]; report={}
for k,t in (('lens_peach',20.0),('columns_terracotta',24.0),('turtle_lavender',30.0),('lighthouse_mint',35.0),('seabed_grey',42.0),('money_seal_lens',50.5)):
    f=rgb(t).astype(np.float32)/255
    L=rgb2lab(f)[...,0]; lo,hi=d[k]['L_range']
    stops=np.array([[int(h[i:i+2],16) for i in (1,3,5)] for h in d[k]['lut16']])/255
    u=np.clip((L-lo)/(hi-lo),0,1)*15; i0=np.floor(u).astype(int); i1=np.minimum(i0+1,15); w=(u-i0)[...,None]
    rec=stops[i0]*(1-w)+stops[i1]*w
    dE=np.linalg.norm(rgb2lab(rec)-rgb2lab(f),axis=2)
    report[k]=dict(median_dE=round(float(np.median(dE)),1),p90_dE=round(float(np.percentile(dE,90)),1))
    gray=(np.clip(L/100,0,1)*255).astype(np.uint8)
    rows.append(np.hstack([lab(at(t),f'REF {k} t={t}'),lab(cv2.cvtColor(gray,cv2.COLOR_GRAY2BGR),'luma only'),lab((rec[...,::-1]*255).astype(np.uint8),f'luma->LUT16  dE med {report[k]["median_dE"]} p90 {report[k]["p90_dE"]}')]))
cv2.imwrite(C+'cmp_duotone_roundtrip.jpg',cv2.resize(np.vstack(rows),None,fx=0.75,fy=0.75,interpolation=cv2.INTER_AREA))
json.dump(report,open(FX+'/out/duotone_roundtrip.json','w'),indent=1); print('duotone round trip',report)
# 5 paper
p=ours('FxPaper_f0'); a=at(0.25)[100:220,250:450]; b=p[100:220,250:450]
def boost(x): g=cv2.cvtColor(x,cv2.COLOR_BGR2GRAY).astype(np.float32); g=(g-g.mean())*8+128; return cv2.cvtColor(np.clip(g,0,255).astype(np.uint8),cv2.COLOR_GRAY2BGR)
cv2.imwrite(C+'cmp_paper.jpg',np.vstack([np.hstack([lab(cv2.resize(a,None,fx=2,fy=2),'REF intro paper t=0.25 (2x)'),lab(cv2.resize(b,None,fx=2,fy=2),'OURS Paper defaults (2x)')]),
                                        np.hstack([lab(cv2.resize(boost(a),None,fx=2,fy=2),'REF contrast x8'),lab(cv2.resize(boost(b),None,fx=2,fy=2),'OURS contrast x8')])]))
# 6 sheen
s1=ours('FxSheen_f24')[0:120]; s2=ours('FxSheen_f72')[0:120]
cv2.imwrite(C+'cmp_sheen.jpg',np.vstack([np.hstack([lab(at(28.0)[0:120],'REF t=28.0'),lab(at(31.0)[0:120],'REF t=31.0')]),np.hstack([lab(s1,'OURS t=1.0s Newsreader opsz72 600'),lab(s2,'OURS t=3.0s (sheen +0.05W)')])]))
print('ok')
