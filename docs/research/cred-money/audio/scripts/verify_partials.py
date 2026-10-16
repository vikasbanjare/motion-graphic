import numpy as np, librosa, soundfile as sf
from scipy.signal import find_peaks
from scipy.ndimage import uniform_filter1d
X,sr=sf.read('ref_stereo.wav'); M=X.mean(1)
ys,_=sf.read('sep_nonrepeating.wav')
def peaks(sig,a,b,lo,hi,n=8,ref=None):
    seg=sig[int(a*sr):int(b*sr)]; N=len(seg)
    F=np.abs(np.fft.rfft(seg*np.hanning(N))); f=np.fft.rfftfreq(N,1/sr)
    m=(f>=lo)&(f<hi); Fd=20*np.log10(F[m]+1e-9); fm=f[m]
    base=uniform_filter1d(Fd,max(3,int(len(Fd)/40)))
    if ref is not None:  # compare with same band 1 s before (music-only) to keep event-specific peaks
        s2=sig[int((ref)*sr):int((ref)*sr)+N]; F2=20*np.log10(np.abs(np.fft.rfft(s2*np.hanning(N)))[m]+1e-9); Fd=Fd-np.maximum(F2,Fd-40)
        pk,pr=find_peaks(Fd,prominence=3,distance=max(1,int(20/(f[1]-f[0]))))
        order=np.argsort(Fd[pk])[::-1][:n]
    else:
        pk,pr=find_peaks(Fd-base,prominence=6,distance=max(1,int(20/(f[1]-f[0]))))
        order=np.argsort(Fd[pk])[::-1][:n]
    return sorted([(round(fm[pk[i]],0),round(Fd[pk[i]],1)) for i in order])
def nn(h): return librosa.hz_to_note(h)
for lab,sig,a,b,lo,hi in [('glass shimmer 14.4-15.9 (sep)',ys,14.4,15.9,1500,6000),('pearl shimmer 42.6-43.6 (sep)',ys,42.6,43.6,3000,10000),
                          ('lighthouse hum 33.4-36.2 (sep)',ys,33.4,36.2,60,600),('seal sparkle 50.25-50.95 (sep)',ys,50.25,50.95,1500,10000),
                          ('end tail 67.3-69.0 (mix)',M,67.3,69.0,300,8000),('logo swell 61.9-62.5 (sep)',ys,61.9,62.5,100,6000),
                          ('rising tone 35.1-35.75 (sep)',ys,35.1,35.75,150,800)]:
    p=peaks(sig,a,b,lo,hi)
    print(f'{lab}: '+', '.join(f'{f:.0f}Hz({nn(f)},{d:.0f}dB)' for f,d in p))
# bird chirp pitch tracks (sep), 3-4.6 kHz peak per 10 ms
S=np.abs(librosa.stft(ys[int(8.1*sr):int(9.6*sr)].astype(np.float32),n_fft=4096,hop_length=441)); f=librosa.fft_frequencies(sr=sr,n_fft=4096)
m=(f>=2800)&(f<4800); E=(S[m]**2).sum(0); fpk=f[m][np.argmax(S[m],0)]
t=8.1+np.arange(S.shape[1])*0.01; on=E>np.percentile(E,70)
print('\nbird chirp pitch (10 ms frames where band energy > p70):')
cur=[];out=[]
for i in range(len(t)):
    if on[i]: cur.append((t[i],fpk[i]))
    elif cur: out.append(cur); cur=[]
if cur: out.append(cur)
for c in out:
    if len(c)>=5: print(f'  {c[0][0]:.2f}-{c[-1][0]:.2f}s: start {c[0][1]:.0f} Hz, median {np.median([x[1] for x in c]):.0f}, end {c[-1][1]:.0f} Hz ({len(c)*10} ms)')
# whip envelopes (sep 3-15 kHz, 10 ms)
S=np.abs(librosa.stft(ys.astype(np.float32),n_fft=1024,hop_length=441)); f=librosa.fft_frequencies(sr=sr,n_fft=1024)
E=10*np.log10((S[(f>=3000)&(f<15000)]**2).sum(0)+1e-9); tt=np.arange(len(E))*0.01
for c,lab in [(18.792,'whip1'),(20.417,'whip2'),(46.958,'whip3'),(48.292,'whip4'),(49.625,'whip5'),(56.2,'whooshF')]:
    m=(tt>=c-0.5)&(tt<=c+0.5); e=E[m]; e=e-e.max()
    print(f'\n{lab} envelope dB rel max, 10 ms steps from {c-0.5:.2f}s (cut at {c:.3f}):')
    print(' '.join(f'{v:.0f}' for v in e))
