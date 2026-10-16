import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
from common import *
import matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt, json
def band_rows(f):
    h=hsv(f); H=np.deg2rad(h[:,150:490,0])
    spread=1-np.abs(np.mean(np.exp(1j*H),axis=1))
    rows=np.where(spread>0.35)[0]
    if len(rows)==0: return None
    # largest contiguous
    segs=[];start=prev=rows[0]
    for r in rows[1:]:
        if r!=prev+1: segs.append((start,prev)); start=r
        prev=r
    segs.append((start,prev))
    return max(segs,key=lambda s:s[1]-s[0])
def profile(f, r0, r1, x0=60, x1=580):
    h=hsv(f)[r0:r1, x0:x1]
    text=(h[...,1]<0.15)&(h[...,2]>0.8)
    w=h[...,1]*(~text)
    z=np.sum(w*np.exp(1j*np.deg2rad(h[...,0])),axis=0)/np.maximum(np.sum(w,axis=0),1e-6)
    hue=(np.rad2deg(np.angle(z))+360)%360
    S=np.sum(h[...,1]*(~text),0)/np.maximum(np.sum(~text,0),1)
    V=np.sum(h[...,2]*(~text),0)/np.maximum(np.sum(~text,0),1)
    textcol=text.mean(0)
    return hue,S,V,textcol,np.abs(z)
out={}
ts=np.arange(16.5,19.0,1/24)
res=[]
for t in ts:
    f=at(t); br=band_rows(f)
    if br is None or br[1]-br[0]<60: continue
    r0,r1=br[0]+10,br[1]-10
    hue,S,V,tc,R=profile(f,r0,r1)
    res.append(dict(t=float(t),r0=int(br[0]),r1=int(br[1]),hue=hue,S=S,V=V,tc=tc,R=R))
print('frames',len(res), 'band rows', res[0]['r0'],res[0]['r1'], res[-1]['r0'],res[-1]['r1'])
# plot
fig,ax=plt.subplots(3,1,figsize=(12,9))
x=np.arange(60,580)
for r in res[::12]:
    ax[0].plot(x,np.unwrap(np.deg2rad(r['hue']))*180/np.pi,label='t=%.2f'%r['t'])
    ax[1].plot(x,r['S']); ax[2].plot(x,r['V'])
ax[0].set_ylabel('hue (deg, unwrapped)'); ax[1].set_ylabel('sat'); ax[2].set_ylabel('val'); ax[0].legend()
plt.savefig(FX+'/out/band_profile.png',dpi=80)
# summary stats on t=18.0
r=[q for q in res if abs(q['t']-18.0)<0.03][0]
mask=r['tc']<0.05
print('hue (circular) per 40px at t=18:',[int(round(v)) for v in r['hue'][::40]])
print('sat per 40px:',[round(float(v),2) for v in r['S'][::40]])
print('val per 40px:',[round(float(v),2) for v in r['V'][::40]])
# hue shift over time: track hue profile via cross-corr of exp(i hue) between frames
def xshift(a,b,maxs=40):
    A=np.exp(1j*np.deg2rad(a)); B=np.exp(1j*np.deg2rad(b))
    best=None
    for s in range(-maxs,maxs+1):
        if s>=0: c=np.real(np.mean(A[s:]*np.conj(B[:len(B)-s])))
        else: c=np.real(np.mean(A[:s]*np.conj(B[-s:])))
        if best is None or c>best[1]: best=(s,c)
    return best
def textpos(tc):
    xs=np.arange(len(tc)); w=tc*(tc>0.05)
    return float(np.sum(xs*w)/max(np.sum(w),1e-6)) if np.sum(w)>0 else None
print('t, hue-profile shift vs first (px), text centroid')
for r in res[::6]:
    s=xshift(r['hue'],res[0]['hue'])
    print(round(r['t'],2), s[0], round(s[1],3), textpos(r['tc']), 'band rows',r['r0'],r['r1'])
