import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
from common import *
from skimage.color import rgb2lab, lab2rgb
from sklearn.cluster import KMeans
import json
SCENES=[
 ('intro_grey_paper',[0.5,1.5,2.5,3.5],None),
 ('hummingbird_green_purple',[5.5,6.5,7.5,8.5],None),
 ('banknote_tilted_lens',[11.0,12.0,13.0],'lens'),
 ('lens_green_closeup',[14.0,15.0,16.0,18.0],'lens'),
 ('lens_peach',[19.5,20.0,20.5,21.0],'lens'),
 ('columns_terracotta',[23.0,24.0,25.0,26.5],None),
 ('turtle_lavender',[28.0,29.5,31.0,32.0],None),
 ('lighthouse_mint',[33.0,35.0,36.5,38.0],None),
 ('seabed_grey',[39.5,41.0,42.5,44.0],None),
 ('lens_grey_shell',[45.8,46.3,46.8],'lens'),
 ('lens_green_rock',[47.2,47.6,48.0],'lens'),
 ('money_seal_lens',[50.0,51.0,52.0],'lens'),
 ('bill_on_black',[53.5,54.0],None),
 ('phone_grey',[56.5,57.5,58.5],None),
]
yy,xx=np.mgrid[0:360,0:640]
LENSMASK=np.hypot(xx-325,yy-188)<255
def hexs(rgb): rgb=np.clip(np.round(np.array(rgb)*255),0,255).astype(int); return '#%02x%02x%02x'%tuple(rgb)
out={}
try:
    import sklearn
except: pass
for name,ts,mode in SCENES:
    px=[]
    for t in ts:
        f=rgb(t).astype(np.float32)/255
        m=LENSMASK if mode=='lens' else np.ones((360,640),bool)
        px.append(f[m][::3])
    P=np.concatenate(px)
    lab=rgb2lab(P[None])[0]
    L=lab[:,0]; a=lab[:,1]; b=lab[:,2]; C=np.hypot(a,b)
    # global gradient map: 16 bins over L* p1..p99
    lo,hi=np.percentile(L,1),np.percentile(L,99)
    edges=np.linspace(lo,hi,17); idx=np.clip(np.digitize(L,edges)-1,0,15)
    stops=[]
    for k in range(16):
        m=idx==k
        if m.sum()<30: stops.append(None); continue
        med=np.median(lab[m],0); stops.append(med)
    # fill missing by interpolation
    st=np.array([s if s is not None else [np.nan]*3 for s in stops])
    for c in range(3):
        v=st[:,c]; ok=~np.isnan(v); st[:,c]=np.interp(np.arange(16),np.nonzero(ok)[0],v[ok])
    st_rgb=np.clip(lab2rgb(st[None])[0],0,1)
    # linearity: distance of each stop from straight line (in Lab) between first and last stop
    A,B=st[0],st[-1]
    tt=(st-A)@(B-A)/np.dot(B-A,B-A)
    dev=np.linalg.norm(st-(A+np.outer(tt,B-A)),axis=1)
    # residual spread: per-pixel deltaE from its bin median (how much a single 1D map explains)
    resid=np.linalg.norm(lab-st[idx],axis=1)
    # ink clusters on chromatic pixels
    chrom=C>10
    clusters=[]
    if chrom.mean()>0.05:
        X=np.c_[a[chrom],b[chrom]]
        best=None
        for k in (1,2,3):
            km=KMeans(n_clusters=k,n_init=4,random_state=0).fit(X[::4])
            inertia=km.inertia_
            if best is None or inertia<best[1]*0.55: best=(km,inertia,k)
        km=best[0]
        lab_c=km.predict(X)
        for c in range(km.n_clusters):
            sel=np.nonzero(chrom)[0][lab_c==c]
            share=len(sel)/len(L)
            if share<0.05: continue
            Lc=L[sel]
            q=np.percentile(Lc,[3,50,97])
            def col_at(qv,w=4):
                mm=np.abs(Lc-qv)<w
                return np.median(lab[sel][mm],0) if mm.sum()>10 else None
            cs=[col_at(v) for v in q]
            hue=np.degrees(np.arctan2(np.median(b[sel]),np.median(a[sel])))%360
            clusters.append(dict(share=round(float(share),3), hue_ab_deg=round(float(hue),1), shadow=hexs(lab2rgb(cs[0][None,None])[0,0]) if cs[0] is not None else None,
                                 mid=hexs(lab2rgb(cs[1][None,None])[0,0]) if cs[1] is not None else None, highlight=hexs(lab2rgb(cs[2][None,None])[0,0]) if cs[2] is not None else None,
                                 L_range=[round(float(v),1) for v in q]))
    out[name]=dict(times=ts, lut16=[hexs(c) for c in st_rgb], L_range=[round(float(lo),1),round(float(hi),1)],
                   max_dev_from_2stop_dE=round(float(dev.max()),1), dev_at_mid=round(float(dev[7]),1),
                   median_resid_dE=round(float(np.median(resid)),1), p90_resid_dE=round(float(np.percentile(resid,90)),1),
                   chromatic_share=round(float(chrom.mean()),3), inks=clusters)
    o=out[name]
    print(f"{name}: shadow {o['lut16'][0]} mid {o['lut16'][7]} hi {o['lut16'][-1]} | 2-stop max dev dE {o['max_dev_from_2stop_dE']} | resid med/p90 {o['median_resid_dE']}/{o['p90_resid_dE']} | inks {[ (c['share'],c['hue_ab_deg'],c['shadow'],c['mid'],c['highlight']) for c in clusters]}")
json.dump(out,open(FX+'/out/duotone_luts.json','w'),indent=1)
