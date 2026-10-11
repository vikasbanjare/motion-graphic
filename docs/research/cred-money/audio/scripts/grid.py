import numpy as np, librosa, soundfile as sf
from scipy.signal import find_peaks
from scipy.ndimage import uniform_filter1d
X,sr=sf.read('ref_stereo.wav'); y=X.mean(1).astype(np.float32)
yp,_=sf.read('perc.wav'); yp=yp.astype(np.float32)
hop=128; nfft=2048; f=librosa.fft_frequencies(sr=sr,n_fft=nfft)
S=np.abs(librosa.stft(yp,n_fft=nfft,hop_length=hop)); T=np.arange(S.shape[1])*hop/sr
def flux(lo,hi):
    m=(f>=lo)&(f<hi); e=np.log1p(100*S[m]); d=np.maximum(0,np.diff(e,axis=1)).sum(0); return np.concatenate([[0],d])
kick=flux(30,120); mid=flux(800,5000); hat=flux(7000,16000)
bt=np.load('beats.npy')
period=60/126.0
# fit grid phase by maximising kick flux at beat positions over 12-63 s
best=None
for ph in np.arange(0,period,0.002):
    g=np.arange(ph,69,period); g=g[(g>12)&(g<63)]
    idx=(g/ (hop/sr)).astype(int); sc=kick[idx].sum()
    if best is None or sc>best[0]: best=(sc,ph)
ph=best[1]
# refine tempo
bestT=None
for bpm in np.arange(125.0,127.01,0.01):
    p=60/bpm
    for ph2 in np.arange(ph-0.02,ph+0.02,0.001):
        g=np.arange(ph2,69,p); g=g[(g>6)&(g<68)]
        sc=kick[(g/(hop/sr)).astype(int)].sum()+hat[(g/(hop/sr)).astype(int)].sum()
        if bestT is None or sc>bestT[0]: bestT=(sc,bpm,ph2)
_,bpm,ph=bestT; p=60/bpm
print(f'grid fit: bpm={bpm:.2f} phase={ph:.3f}s  beat={p:.4f}s bar={4*p:.4f}s')
np.save('grid.npy',np.array([bpm,ph]))
# drum transcription in 16th steps, for sections
def pattern(a,b,curve,name,thr_pct=85):
    st=p/4; g=np.arange(ph,69,st); g=g[(g>=a)&(g<b)]
    vals=np.array([curve[max(0,int(x/(hop/sr))-3):int(x/(hop/sr))+4].max() for x in g])
    thr=np.percentile(curve[(T>=a)&(T<b)],thr_pct)
    hits=vals>thr
    # fold into 16-step bars, count frequency per step
    steps=np.round((g-ph)/st).astype(int)%16
    freq=[hits[steps==k].mean() if (steps==k).any() else 0 for k in range(16)]
    print(f'  {name:5s} '+' '.join(('X' if q>0.6 else 'x' if q>0.3 else '.') for q in freq)+'   '+' '.join(f'{q:.1f}' for q in freq))
for a,b,lab in [(6,12.9,'intro'),(13,29,'A groove'),(29,44.3,'B drop'),(44.5,51.3,'breakdown'),(51.5,63.2,'B2 drop'),(63.4,67.5,'outro')]:
    print(f'{lab} {a}-{b}s  (16 steps per bar; step 0 = grid downbeat candidate)')
    pattern(a,b,kick,'kick'); pattern(a,b,mid,'mid'); pattern(a,b,hat,'hat')
# where do big section events fall on the grid (bar.beat)
for ev in [0.70,4.05,4.30,6.0,12.99,29.0,32.54,44.4,51.45,63.3,67.12]:
    q=(ev-ph)/p; bar=int(np.floor(q/4)); beat=q-4*bar
    print(f'event {ev:6.2f}s -> beat index {q:6.2f}  bar {bar} beat {beat+1:.2f}')
