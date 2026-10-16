import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
from common import *
import json, matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt
def lin(c): return np.where(c<=0.04045,c/12.92,((c+0.055)/1.055)**2.4)
def luma(rgb): return 0.2126*rgb[...,0]+0.7152*rgb[...,1]+0.0722*rgb[...,2]  # on gamma-encoded (Y')
regions={
 # name: list of (t, y0,y1,x0,x1, excl) ; region boxes inside the foil object (geometric, not sat-thresholded)
 'band_wide':[(18.0,140,218,150,560)],
 'band_thin':[(14.75,170,190,150,540),(15.0,170,190,150,540)],
 'thread_diag':[(11.5,0,0,0,0)],
 'turtle':[(29.5,225,290,60,210),(30.0,225,290,80,220),(30.5,225,290,100,240)],
 'shell':[(41.75,130,210,260,390),(42.0,130,210,260,390),(42.25,130,210,260,390)],
 'shell_lens':[(46.5,150,300,200,420)],
 'card_axis':[(24.5,140,183,515,572)],
 'card_hdfc':[(23.6,140,183,330,405)],
 'card_icici':[(23.9,140,183,72,120)],
}
out={}
def thread_mask(f):
    h=hsv(f)
    # diagonal thread: pastel non-green; scene hue ~ 150 (green) 
    dh=np.abs(((h[...,0]-150)+180)%360-180)
    return (dh>45)&(h[...,1]>0.12)&(h[...,2]>0.55)
allstats={}
fig,axs=plt.subplots(3,3,figsize=(13,10)); axs=axs.ravel()
for k,(name,regs) in enumerate(regions.items()):
    px=[]
    for (t,y0,y1,x0,x1) in regs:
        f=at(t)
        if name=='thread_diag':
            m=thread_mask(f); sub=f[m]
        else:
            sub=f[y0:y1,x0:x1].reshape(-1,3)
        px.append(sub)
    P=np.concatenate(px).astype(np.float32)/255  # BGR
    rgb=P[:,::-1]
    hs=cv2.cvtColor((P[None]*255).astype(np.uint8),cv2.COLOR_BGR2HSV_FULL)[0].astype(np.float32)
    H=hs[:,0]*360/256; S=hs[:,1]/255; V=hs[:,2]/255
    C=rgb.max(1)-rgb.min(1); Y=luma(rgb)
    foil=S>0.25
    w=S*foil
    hist,edges=np.histogram(H[foil],bins=12,range=(0,360),weights=w[foil])
    hist=hist/hist.sum() if hist.sum()>0 else hist
    # chroma vs luma curve
    bins=np.linspace(0,1,11); idx=np.digitize(Y,bins)-1
    curve=[float(np.median(C[idx==i])) if np.sum(idx==i)>20 else None for i in range(10)]
    cnt=[int(np.sum(idx==i)) for i in range(10)]
    st=dict(n=int(len(P)), foil_frac=float(foil.mean()),
        hue_hist_30deg=[round(float(v),3) for v in hist],
        sat_p50=float(np.median(S[foil])) if foil.any() else None, sat_p90=float(np.percentile(S[foil],90)) if foil.any() else None,
        val_p10=float(np.percentile(V,10)), val_p50=float(np.median(V)), val_p90=float(np.percentile(V,90)),
        luma_p2=float(np.percentile(Y,2)), luma_p50=float(np.median(Y)), luma_p98=float(np.percentile(Y,98)),
        chroma_vs_luma=curve, luma_hist=cnt)
    allstats[name]=st
    print(name, 'n',st['n'],'foil%',round(st['foil_frac']*100), 'hue30',st['hue_hist_30deg'])
    print('   sat p50/p90', st['sat_p50'] and round(st['sat_p50'],2), st['sat_p90'] and round(st['sat_p90'],2),'V p10/50/90',round(st['val_p10'],2),round(st['val_p50'],2),round(st['val_p90'],2),'Y p2/50/98',round(st['luma_p2'],2),round(st['luma_p50'],2),round(st['luma_p98'],2))
    print('   chroma|luma', [None if c is None else round(c,2) for c in curve])
    ax=axs[k]
    sc=ax.scatter(Y[::3],C[::3],c=rgb[::3],s=2)
    ax.set_title(name); ax.set_xlim(0,1); ax.set_ylim(0,0.8); ax.set_xlabel('luma'); ax.set_ylabel('chroma')
plt.tight_layout(); plt.savefig(FX+'/out/foil_chroma_luma.png',dpi=70)
json.dump(allstats,open(FX+'/out/foil_stats.json','w'),indent=1)
