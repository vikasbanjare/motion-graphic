import numpy as np, librosa, soundfile as sf
from scipy.ndimage import uniform_filter1d
X,sr=sf.read('ref_stereo.wav'); M=X.mean(1).astype(np.float32)
ys,_=sf.read('sep_nonrepeating.wav'); ys=ys.astype(np.float32)
hop=128; nfft=2048; f=librosa.fft_frequencies(sr=sr,n_fft=nfft)
Ss=np.abs(librosa.stft(ys,n_fft=nfft,hop_length=hop)); T=np.arange(Ss.shape[1])*hop/sr
hb=10*np.log10((Ss[(f>=3000)&(f<15000)]**2).sum(0)+1e-9); hb=uniform_filter1d(hb,int(0.015*sr/hop))
whips=[('whip1',18.792),('whip2',20.417),('whip3',46.958),('whip4',48.292),('whip5',49.625)]
print('WHOOSH vs whip-pan cut (cut = frame of max picture difference). 3-15 kHz band of SFX layer; run = above local median+10 dB')
for n,c in whips:
    m=(T>=c-0.8)&(T<=c+0.8); t=T[m]; e=hb[m]; base=np.median(e); on=e>base+10
    runs=[];i=0
    while i<len(on):
        if on[i]:
            j=i
            while j<len(on) and on[j]: j+=1
            if t[j-1]-t[i]>=0.05: runs.append((t[i],t[j-1],t[i+np.argmax(e[i:j])],e[i:j].max()-base))
            i=j
        else: i+=1
    print(f'  {n} cut {c:.3f}: '+'; '.join(f'run {a-c:+.3f}..{b-c:+.3f}s, peak {p-c:+.3f}s (+{h:.0f} dB)' for a,b,p,h in runs))
# picture cuts vs musical onsets
oenv=librosa.onset.onset_strength(y=M,sr=sr,hop_length=hop)
on=librosa.onset.onset_detect(onset_envelope=oenv,sr=sr,hop_length=hop,units='frames')
strong=on[oenv[on]>np.percentile(oenv[on],60)]; ts=strong*hop/sr
cuts=[13.458,18.792,20.417,32.542,35.750,40.583,46.958,48.292,49.625,54.542]
d=[ts[np.argmin(abs(ts-c))]-c for c in cuts]
print('\nhard cuts -> nearest strong musical onset (s):',' '.join(f'{c:.2f}:{x:+.3f}' for c,x in zip(cuts,d)))
print(f'  median |dist| {np.median(np.abs(d))*1000:.0f} ms; within 1 frame (42ms): {np.mean(np.abs(d)<=0.042)*100:.0f}%')
rng=np.random.default_rng(0); rand=rng.uniform(13,63,20000); dr=np.array([np.min(abs(ts-r)) for r in rand])
print(f'  chance (random times 13-63 s): median |dist| {np.median(dr)*1000:.0f} ms; within 42ms: {np.mean(dr<=0.042)*100:.0f}%  (strong onsets/s = {len(ts)/69:.2f})')
# sub-kick onsets (the loudest hits)
sub=np.load('sub_onsets.npy')[:,0]
d2=[sub[np.argmin(abs(sub-c))]-c for c in cuts]
print('hard cuts -> nearest sub-kick/808 onset:',' '.join(f'{c:.2f}:{x:+.2f}' for c,x in zip(cuts,d2)))
