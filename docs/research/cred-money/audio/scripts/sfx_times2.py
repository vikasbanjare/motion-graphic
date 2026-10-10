import numpy as np, librosa, soundfile as sf, json, matplotlib
matplotlib.use('Agg'); import matplotlib.pyplot as plt
from scipy.ndimage import median_filter, uniform_filter1d
ys,sr=sf.read('sep_nonrepeating.wav'); ys=ys.astype(np.float32)
X,_=sf.read('ref_stereo.wav'); L=X[:,0].astype(np.float32); R=X[:,1].astype(np.float32); M=(L+R)/2; Sd=(L-R)/2
hop=128; nfft=2048; f=librosa.fft_frequencies(sr=sr,n_fft=nfft)
def bandE(sig,lo,hi):
    S=np.abs(librosa.stft(sig,n_fft=nfft,hop_length=hop)); m=(f>=lo)&(f<hi); return (S[m]**2).sum(0)
cache={}
def B(sig_name,lo,hi):
    k=(sig_name,lo,hi)
    if k not in cache: cache[k]=bandE({'ys':ys,'L':L,'R':R,'M':M,'S':Sd}[sig_name],lo,hi)
    return cache[k]
items=json.load(open('scripts/items.json'))
T=np.arange(len(B('ys',100,200)))*hop/sr
rows=[]
fig,axs=plt.subplots((len(items)+3)//4,4,figsize=(28,4.2*((len(items)+3)//4)))
axs=axs.ravel()
for ax,(name,a,b,lo,hi,kind) in zip(axs,items):
    e=B('ys',lo,hi); e=median_filter(e,size=int(0.06*sr/hop)) ; e=uniform_filter1d(e,int(0.02*sr/hop))
    ed=10*np.log10(e+1e-12)
    sel=(T>=a)&(T<=b); t=T[sel]; d=ed[sel]
    base=np.percentile(d[:max(5,int(0.25*len(d)))],30)
    pk=np.argmax(d); peak=d[pk]
    thr=base+0.25*(peak-base)  # 25% of the rise in dB
    s=pk
    while s>0 and d[s]>thr: s-=1
    en=pk
    while en<len(d)-1 and d[en]>thr: en+=1
    ts,tp,te=t[s],t[pk],t[en]
    i0,i1=np.searchsorted(T,ts),np.searchsorted(T,te)
    pan=10*np.log10(B('L',lo,hi)[i0:i1].sum()/B('R',lo,hi)[i0:i1].sum())
    width=10*np.log10((B('S',lo,hi)[i0:i1].sum()+1e-12)/B('M',lo,hi)[i0:i1].sum())
    # rise vs decay time
    rows.append(dict(name=name,kind=kind,start=round(float(ts),3),peak=round(float(tp),3),end=round(float(te),3),dur=round(float(te-ts),3),attack=round(float(tp-ts),3),release=round(float(te-tp),3),rise_db=round(float(peak-base),1),pan_LR_db=round(float(pan),1),side_minus_mid_db=round(float(width),1),band=[lo,hi]))
    ax.plot(t,d); ax.axvline(ts,color='g'); ax.axvline(tp,color='r'); ax.axvline(te,color='k'); ax.axhline(thr,ls=':')
    ax.set_title(f'{name} {lo}-{hi}Hz'); ax.set_xticks(np.arange(np.ceil(a*10)/10,b,0.1)); ax.tick_params(axis='x',labelsize=6,rotation=90); ax.grid(alpha=.3)
plt.tight_layout(); plt.savefig('plots/sfx_env.png',dpi=45)
json.dump(rows,open('sfx_times.json','w'),indent=1)
for r in rows: print(f"{r['name']:28s} {r['start']:6.2f} {r['peak']:6.2f} {r['end']:6.2f} dur {r['dur']:4.2f} att {r['attack']:4.2f} rel {r['release']:4.2f} rise {r['rise_db']:5.1f}dB pan {r['pan_LR_db']:+4.1f} side-mid {r['side_minus_mid_db']:+5.1f}")
