import numpy as np, librosa, soundfile as sf
from scipy.ndimage import uniform_filter1d
ys,sr=sf.read('sep_nonrepeating.wav'); ys=ys.astype(np.float32)
X,_=sf.read('ref_stereo.wav'); mix=X.mean(1).astype(np.float32); L=X[:,0].astype(np.float32); R=X[:,1].astype(np.float32)
hop=128; nfft=2048
f=librosa.fft_frequencies(sr=sr,n_fft=nfft)
def spec(sig,a,b):
    i0=max(0,int((a-0.05)*sr)); i1=int(b*sr)
    return np.abs(librosa.stft(sig[i0:i1],n_fft=nfft,hop_length=hop,center=True)), i0/sr
items=[('pen scribble foley',0.3,4.4,1000,15000),('low swell -> music',4.1,6.2,40,2000),('hi air band (scene bed)',5.0,10.4,4300,6300),
('wing flutter ticks',6.9,7.8,6000,15000),('bird chirp x5',8.1,9.7,3000,4600),('lens swell',9.5,10.8,40,1200),
('glass shimmer partials',13.4,16.8,2500,6600),('whip A1',18.3,18.85,3000,15000),('whip A2',18.85,19.6,3000,15000),('whip B',20.2,21.0,3000,15000),
('air riser',21.0,22.5,5000,15000),('column wipe texture',26.5,28.7,200,4000),('lighthouse low hum',32.3,36.2,60,300),('gull/sonar chirps',33.2,36.0,1800,6500),
('rising tone',35.0,36.3,250,600),('underwater swell',38.7,40.0,150,2500),('pearl shimmer',40.8,43.4,5000,9500),('pre-breakdown swell',43.2,44.3,150,2500),
('whip C1',46.4,46.98,3000,15000),('whip C2',46.98,47.6,3000,15000),('whip D',47.8,48.5,3000,15000),('whip E',49.1,49.65,3000,15000),('seal sparkle',49.5,51.0,4000,15000),
('drop-2 impact',51.0,52.3,30,150),('whip F (bill to phone)',55.9,57.0,3000,15000),('logo shimmer swell',61.3,62.8,2000,15000),('end riser',66.5,67.4,4000,11000),('end bell ring',66.8,69.06,3500,4200)]
print(f"{'event':28s} start  peak   end(-20dB)  dur   peak-dBFS(band,mix)  pan L/R dB  side/mid dB")
res=[]
for name,a,b,lo,hi in items:
    S,t0=spec(ys,a,b); m=(f>=lo)&(f<hi)
    e=uniform_filter1d((S[m]**2).sum(0),int(0.02*sr/hop)+1)
    t=t0+np.arange(len(e))*hop/sr
    sel=(t>=a)&(t<=b); e=e[sel]; t=t[sel]
    ed=10*np.log10(e+1e-12); pk=np.argmax(ed)
    thr=ed[pk]-20
    s=pk
    while s>0 and ed[s]>thr: s-=1
    en=pk
    while en<len(ed)-1 and ed[en]>thr: en+=1
    # absolute band level of the mix at peak
    SL,_=spec(L,a,b); SR_,_=spec(R,a,b)
    el=(SL[m]**2).sum(0)[sel[:SL.shape[1]] if len(sel)==SL.shape[1] else slice(None)]
    er=(SR_[m]**2).sum(0)[sel[:SR_.shape[1]] if len(sel)==SR_.shape[1] else slice(None)]
    ss,se=s,en+1
    pan=10*np.log10(el[ss:se].sum()/er[ss:se].sum())
    Sm,_=spec((L+R)/2,a,b); Ss,_=spec((L-R)/2,a,b)
    em=(Sm[m]**2).sum(0)[sel]; es=(Ss[m]**2).sum(0)[sel]
    width=10*np.log10(es[ss:se].sum()/em[ss:se].sum())
    # peak dBFS of band-limited mix (rough): energy -> rms in band
    pk_db=10*np.log10(e[pk]/( (nfft/2)**2 ) *2 +1e-12)
    res.append((name,t[s],t[pk],t[en],t[en]-t[s],pan,width))
    print(f"{name:28s} {t[s]:6.2f} {t[pk]:6.2f} {t[en]:6.2f}   {t[en]-t[s]:5.2f}   {ed[pk]-10*np.log10(np.median(e)+1e-12):+5.1f}dB over own-median   {pan:+5.1f}   {width:+6.1f}")
import json; json.dump([dict(name=r[0],start=round(r[1],3),peak=round(r[2],3),end=round(r[3],3),dur=round(r[4],3),pan_LR_db=round(r[5],1),side_minus_mid_db=round(r[6],1)) for r in res],open('sfx_times.json','w'),indent=1)
