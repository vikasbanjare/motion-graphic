import numpy as np, librosa, soundfile as sf, os
P='proto2/sfx/'
ys,sr=sf.read('sep_nonrepeating.wav'); X,_=sf.read('ref_stereo.wav')
def feats(x,lo=150,hi=16000):
    if x.ndim==1: x=np.stack([x,x],1)
    m=x.mean(1).astype(np.float32); s=((x[:,0]-x[:,1])/2)
    S=np.abs(librosa.stft(m,n_fft=1024,hop_length=128)); fr=librosa.fft_frequencies(sr=sr,n_fft=1024)
    sp=(S**2).mean(1); band=(fr>=lo)&(fr<hi)
    cum=np.cumsum(sp[band])/sp[band].sum(); f5=fr[band][np.searchsorted(cum,0.05)]; f95=fr[band][min(np.searchsorted(cum,0.95),band.sum()-1)]
    fm=(fr>max(lo,200))&(fr<min(hi,12000)); a=np.sqrt(sp[fm]); flat=np.exp(np.mean(np.log(a+1e-12)))/a.mean()
    e=(S[band]**2).sum(0); ed=10*np.log10(e+1e-12); pk=np.argmax(e)
    above=np.where(ed>ed[pk]-20)[0]; dur=(above[-1]-above[0])*128/sr
    i10=np.argmax(e>0.1*e[pk]); att=(pk-i10)*128/sr
    w=10*np.log10(np.mean(s**2)/np.mean(m**2)+1e-12)
    return dur,f5,f95,flat,att,w
pairs=[('pen_scribble',X,0.62,4.10,500,16000),('whip',ys,46.62,46.93,2500,16000),('reverse_swell',X,4.25,5.9,30,4000),('lens_swell',X,9.80,10.25,40,1200),
('glass_shimmer',ys,14.2,16.1,2000,7000),('sparkle',ys,50.25,51.0,2000,16000),('bird_chirps',ys,8.2,9.55,2800,4800),('wing_flutter',ys,7.2,7.7,7000,16000),
('foghorn',ys,33.3,36.3,60,600),('rising_tone',ys,35.1,36.4,200,700),('air_riser',ys,21.6,22.5,5000,16000),('low_wash',ys,27.0,28.15,250,3000),('splash',ys,38.95,39.65,300,5000),('submerge',ys,38.95,39.65,300,5000),
('drop_impact',X,51.38,52.2,30,150),('end_bell',X,67.0,69.06,1400,6000),('end_riser',ys,66.2,67.2,4000,11000)]
print(f"{'recipe':14s} | {'REF dur  band(5-95%)    flat  attack width':45s} | OURS dur  band(5-95%)    flat  attack width")
for name,src,a,b,lo,hi in pairs:
    r=feats(src[int(a*sr):int(b*sr)],lo,hi)
    y,_=sf.read(P+name+'.wav'); o=feats(y,lo,hi)
    fmt=lambda q: f"{q[0]:4.2f}s {q[1]:5.0f}-{q[2]:5.0f}Hz  {q[3]:.2f}  {q[4]:4.2f}s {q[5]:+6.1f}"
    print(f"{name:14s} | {fmt(r):45s} | {fmt(o)}")
