import numpy as np, librosa, soundfile as sf
X,sr=sf.read('ref_stereo.wav'); y=X.mean(1).astype(np.float32)
oenv=librosa.onset.onset_strength(y=y,sr=sr,hop_length=128)
on=librosa.onset.onset_detect(onset_envelope=oenv,sr=sr,hop_length=128,units='time',backtrack=False)
# refine anchor: onset nearest to each big hit
big=[14.43,16.35,18.27,20.19,22.11,24.03,25.95,29.79,31.71,33.63]
ref=[on[np.argmin(abs(on-b))] for b in big]
print('big-hit onsets',np.round(ref,3))
k=np.round((np.array(ref)-ref[0])/1.92)
A=np.vstack([k,np.ones_like(k)]).T; bar,anchor=np.linalg.lstsq(A,np.array(ref),rcond=None)[0]
print(f'fitted bar={bar:.4f}s  -> BPM={240/bar:.2f}; anchor={anchor:.3f}s; residual ms',np.round(1000*(np.array(ref)-(anchor+k*bar)),1))
np.save('grid.npy',np.array([240/bar,anchor]))
hop=128; nfft=2048; f=librosa.fft_frequencies(sr=sr,n_fft=nfft)
S=np.abs(librosa.stft(y,n_fft=nfft,hop_length=hop))
bands={'sub30-90':(30,90),'lo150-400':(150,400),'sn1-5k':(1000,5000),'hat8-16k':(8000,16000)}
E={k:10*np.log10((S[(f>=a)&(f<b)]**2).sum(0)+1e-9) for k,(a,b) in bands.items()}
def onsetE(curve,t):
    i=int(t*sr/hop); pre=curve[max(0,i-6):i-1].mean(); post=curve[i:i+8].max(); return post-pre
st=bar/16
def show(a,nbars,lab):
    print(f'\n{lab}: bars from {a:.2f}s (rise in dB at each 16th; columns 1 e + a 2 e + a 3 e + a 4 e + a)')
    for bnd in bands:
        rows=[]
        for b in range(nbars):
            rows.append([onsetE(E[bnd],a+b*bar+s*st) for s in range(16)])
        r=np.mean(rows,0)
        print(f'  {bnd:10s}'+' '.join(f'{v:4.0f}' for v in r))
n0=lambda t: anchor+np.ceil((t-anchor)/bar)*bar
show(n0(6.0),3,'intro 6-12.9')
show(n0(13.0),8,'A groove')
show(n0(29.0)-0*bar,7,'B drop')
show(n0(44.5),3,'breakdown')
show(n0(51.6),6,'B2 drop')
show(n0(63.3),2,'outro')
for ev in [0.70,2.92,4.05,4.30,5.33,6.0,9.87,12.99,13.46,21.97,27.21,29.0,32.54,35.75,39.08,42.83,44.4,46.96,48.29,49.63,51.45,56.29,60.65,63.3,63.48,67.12]:
    q=(ev-anchor)/bar*4; b=np.floor(q/4); beat=q-4*b
    print(f'event {ev:6.2f}s -> bar {int(b):3d} beat {beat+1:4.2f}  (off nearest beat by {1000*(round(q)-q)*bar/4:+5.0f} ms)')
