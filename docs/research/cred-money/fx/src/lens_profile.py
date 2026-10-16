import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
from common import *
import json, matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt
fits={round(r['t']*24):r for r in json.load(open(FX+'/out/lens_fit2.json')) if 'r' in r}
W,H=640,360
yy,xx=np.mgrid[0:H,0:W]
groups={'green_14.75-16':(14.75,16.0),'green_18':(17.75,18.5),'peach_20':(19.5,20.25),'rock_47':(47.0,47.75),'seal_50':(49.75,51.75)}
out={}
fig,ax=plt.subplots(1,2,figsize=(13,5))
for gname,(t0,t1) in groups.items():
    profs={'R':[],'G':[],'B':[]}
    for i in range(int(t0*24),int(t1*24)+1):
        if i not in fits: continue
        fr=fits[i]; f=np.array(frames()[i]).astype(np.float32)
        rr=(np.hypot(xx-fr['cx'],yy-fr['cy'])-fr['r'])  # signed px from edge
        bins=np.arange(-80,41,1.0); idx=np.digitize(rr.ravel(),bins)-1
        for ch,nm in ((2,'R'),(1,'G'),(0,'B')):
            v=f[...,ch].ravel()
            # use mean of only angles that are inside the frame (all are, by construction)
            p=np.array([np.median(v[idx==k]) if np.sum(idx==k)>20 else np.nan for k in range(len(bins)-1)])
            profs[nm].append(p)
    x=(bins[:-1]+bins[1:])/2
    res={}
    for nm in 'RGB':
        P=np.nanmedian(np.array(profs[nm]),0)
        inside=np.nanmedian(P[(x>-80)&(x<-60)]); dark=np.nanmedian(P[(x>15)&(x<40)])
        n=(P-dark)/(inside-dark)
        def cross(level):
            # outermost crossing going outward from inside
            k=np.nonzero((n[:-1]>=level)&(n[1:]<level))[0]
            if len(k)==0: return None
            k=k[-1]; return float(x[k]+(n[k]-level)/(n[k]-n[k+1])*(x[k+1]-x[k]))
        peak=float(np.nanmax(n[(x>-40)&(x<0)])); peakx=float(x[(x>-40)&(x<0)][np.nanargmax(n[(x>-40)&(x<0)])])
        res[nm]=dict(inside=float(inside),dark=float(dark),r90=cross(0.9),r50=cross(0.5),r10=cross(0.1),rim_peak=peak,rim_peak_px=peakx,profile=[None if np.isnan(v) else round(float(v),3) for v in n])
        if nm=='G': ax[0].plot(x,n,label=gname)
        if gname=='green_14.75-16': ax[1].plot(x,n,color=nm.lower(),label=nm)
    out[gname]=res
    print(gname, ' '.join(f"{nm}: in={res[nm]['inside']:.0f} dark={res[nm]['dark']:.0f} r90={res[nm]['r90']} r50={res[nm]['r50']} r10={res[nm]['r10']} rim={res[nm]['rim_peak']:.2f}@{res[nm]['rim_peak_px']}" for nm in 'RGB'))
ax[0].axvline(0,color='k',lw=0.5); ax[0].legend(); ax[0].set_xlabel('px from fitted edge'); ax[0].set_ylabel('normalised (G)')
ax[1].legend(); ax[1].set_title('green 14.75-16 per channel')
plt.savefig(FX+'/out/lens_profiles.png',dpi=80)
json.dump(dict(x=list(map(float,x)),groups=out),open(FX+'/out/lens_profiles.json','w'))
