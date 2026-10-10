import numpy as np, librosa, soundfile as sf, pyloudnorm as pyln, glob, os
maj=np.array([6.35,2.23,3.48,2.33,4.38,4.09,2.52,5.19,2.39,3.66,2.29,2.88]); mnr=np.array([6.33,2.68,3.52,5.38,2.60,3.53,2.54,4.75,3.98,2.69,3.34,3.17])
names=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B']
def prof(path,a=None,b=None):
    x,sr=sf.read(path)
    if x.ndim==1: x=np.stack([x,x],1)
    if a is not None: x=x[int(a*sr):int(b*sr)]
    y=x.mean(1).astype(np.float32)
    L=pyln.Meter(sr).integrated_loudness(x)
    tempo,_=librosa.beat.beat_track(y=y,sr=sr)
    C=librosa.feature.chroma_cqt(y=y,sr=sr).mean(1)
    r=max([(np.corrcoef(np.roll(maj,k),C)[0,1],names[k]+' maj') for k in range(12)]+[(np.corrcoef(np.roll(mnr,k),C)[0,1],names[k]+' min') for k in range(12)])
    F=np.abs(np.fft.rfft(y))**2; fr=np.fft.rfftfreq(len(y),1/sr); tot=F.sum()
    bd=[10*np.log10(F[(fr>=lo)&(fr<hi)].sum()/tot+1e-12) for lo,hi in [(0,60),(60,250),(250,2000),(2000,6000),(6000,22050)]]
    mid=(x[:,0]+x[:,1])/2; side=(x[:,0]-x[:,1])/2; w=10*np.log10(np.mean(side**2)/np.mean(mid**2)+1e-12)
    on=librosa.onset.onset_detect(y=y,sr=sr,units='time'); dens=len(on)/(len(y)/sr)
    cen=librosa.feature.spectral_centroid(y=y,sr=sr).mean()
    return L,float(np.atleast_1d(tempo)[0]),r,bd,w,dens,cen
print('track                         LUFS   bpm   key(r)            sub/60-250/250-2k/2-6k/>6k dB    side-mid  onsets/s  centroid')
R='ref_stereo.wav'
rows=[('REF pluck intro 6-12.9',R,6,12.9),('REF A groove 13-29',R,13,29),('REF B drop 29-44.4',R,29,44.4),('REF B2 51.4-63.3',R,51.4,63.3),('REF whole film',R,0,69.06)]
rows+=[(f'ours music_bed {m}',f'ours/bed_{m}.wav',None,None) for m in ['warm','tech','calm','tense']]
rows+=[('ours cred-test bed (calm D 92)','/home/user/motion-graphic/motion-kit/public/custom/cred-test/music.wav',None,None),('ours cred-test film mix','ours/credtest.wav',None,None)]
for n,p,a,b in rows:
    L,t,r,bd,w,d,c=prof(p,a,b)
    print(f'{n:30s} {L:6.1f} {t:6.1f}  {r[1]:7s}({r[0]:.2f})   '+'/'.join(f'{v:5.1f}' for v in bd)+f'   {w:6.1f}   {d:5.2f}   {c:6.0f}')
print('\nSFX files: dur, centroid, flatness(200-12k), 10-90% attack, -20dB release, band(5-95% energy), mono?')
files=sorted(glob.glob('/home/user/motion-graphic/motion-kit/public/custom/sarvam-v4/sfx-*.wav'))+sorted(glob.glob('/home/user/motion-graphic/motion-kit/public/sfx/soft/*.wav'))
for p in files:
    y,sr=sf.read(p); y=y if y.ndim==1 else y.mean(1)
    S=np.abs(librosa.stft(y.astype(np.float32),n_fft=1024,hop_length=128)); fr=librosa.fft_frequencies(sr=sr,n_fft=1024)
    sp=(S**2).mean(1); cum=np.cumsum(sp)/sp.sum(); f5,f95=fr[np.searchsorted(cum,0.05)],fr[np.searchsorted(cum,0.95)]
    cen=(fr*sp).sum()/sp.sum(); m=(fr>200)&(fr<min(12000,sr/2-1)); fl=np.exp(np.mean(np.log(np.sqrt(sp[m])+1e-12)))/np.mean(np.sqrt(sp[m]))
    e=(S**2).sum(0); ed=10*np.log10(e+1e-12); pk=np.argmax(e); 
    i10=np.argmax(e>0.1*e[pk]); i90=np.argmax(e>0.9*e[pk]); j=pk
    while j<len(e)-1 and ed[j]>ed[pk]-20: j+=1
    print(f'{os.path.relpath(p,"/home/user/motion-graphic/motion-kit/public"):34s} {len(y)/sr:5.2f}s  cen {cen:6.0f}  flat {fl:.2f}  att {(i90-i10)*128/sr:5.3f}s  rel {(j-pk)*128/sr:5.2f}s  band {f5:5.0f}-{f95:5.0f} Hz')
