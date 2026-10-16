import numpy as np, librosa, soundfile as sf
from scipy.signal import find_peaks
from scipy.ndimage import uniform_filter1d
X,sr=sf.read('ref_stereo.wav'); M=X.mean(1).astype(np.float32)
ys,_=sf.read('sep_nonrepeating.wav'); ys=ys.astype(np.float32)
hop=128; nfft=2048; f=librosa.fft_frequencies(sr=sr,n_fft=nfft)
S=np.abs(librosa.stft(M,n_fft=nfft,hop_length=hop)); T=np.arange(S.shape[1])*hop/sr
sub=10*np.log10((S[(f>=30)&(f<110)]**2).sum(0)+1e-9)
fl=np.maximum(0,np.diff(uniform_filter1d(sub,3),prepend=sub[0]))
pk,_=find_peaks(fl,height=4.0,distance=int(0.2*sr/hop))
# keep only strong sub onsets (post level high)
ons=[]
for p in pk:
    post=sub[p:p+int(0.05*sr/hop)].max(); pre=sub[max(0,p-int(0.06*sr/hop)):p].mean()
    if post-pre>8 and post>np.percentile(sub,70): ons.append((T[p],post-pre,post))
ons=np.array(ons)
print('strong sub onsets (t, rise dB):'); print(' '.join(f'{t:.3f}({r:.0f})' for t,r,_ in ons))
bar=1.92; beat=0.48; anchor=14.461
print('\nphase of sub onsets relative to 125 BPM grid anchored 14.461 (in beats, mod 4):')
for a,b,lab in [(5,13.4,'intro'),(13.4,29,'grooveA'),(29,44.4,'dropB'),(44.4,51.4,'break'),(51.4,63.3,'drop2'),(63.3,69,'outro')]:
    m=(ons[:,0]>=a)&(ons[:,0]<b); q=((ons[m,0]-anchor)/beat)%4
    print(f'  {lab:8s} n={m.sum():2d}  positions(beats)=',' '.join(f'{x:.2f}' for x in q))
# per-section best phase at 125 BPM using onset-strength envelope
oenv=librosa.onset.onset_strength(y=M,sr=sr,hop_length=hop); To=np.arange(len(oenv))*hop/sr
print('\nbest grid phase per section (s, mod 0.48) vs anchor phase', round(anchor%beat,3))
for a,b,lab in [(6,13.4,'intro'),(13.4,29,'grooveA'),(29,44.4,'dropB'),(51.4,63.3,'drop2'),(63.3,67.5,'outro')]:
    best=max(((oenv[((g:=np.arange(a+ph,b,beat))/ (hop/sr)).astype(int)].mean(),ph) for ph in np.arange(0,beat,0.004)))
    print(f'  {lab:8s} phase {(a+best[1])%beat:.3f}s  (strength {best[0]:.2f}; mean env {oenv[(To>=a)&(To<b)].mean():.2f})')
# whoosh runs: sustained 4-15 kHz energy in sep layer
Ss=np.abs(librosa.stft(ys,n_fft=nfft,hop_length=hop))
hb=10*np.log10((Ss[(f>=4000)&(f<15000)]**2).sum(0)+1e-9); hb=uniform_filter1d(hb,int(0.02*sr/hop))
thr=np.percentile(hb,97)
on=hb>thr; runs=[];i=0
while i<len(on):
    if on[i]:
        j=i
        while j<len(on) and on[j]: j+=1
        runs.append((T[i],T[j-1],hb[i:j].max())); i=j
    else: i+=1
merged=[]
for r in runs:
    if merged and r[0]-merged[-1][1]<0.03: merged[-1]=(merged[-1][0],r[1],max(merged[-1][2],r[2]))
    else: merged.append(r)
print(f'\nsustained 4-15k runs in SFX layer (>{thr:.1f} dB = 97th pct, len>=60ms):')
for a,b,p in merged:
    if b-a>=0.06: print(f'  {a:6.3f}-{b:6.3f} ({b-a:.2f}s) peak {p:.1f}')
np.save('sub_onsets.npy',ons)
