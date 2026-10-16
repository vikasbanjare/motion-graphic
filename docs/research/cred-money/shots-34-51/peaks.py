import numpy as np, wave, sys
w=wave.open(sys.argv[1]); sr=w.getframerate(); n=w.getnframes(); ch=w.getnchannels()
x=np.frombuffer(w.readframes(n),np.int16).astype(float)/32768
if ch>1: x=x.reshape(-1,ch).mean(1)
hop=int(sr*0.005); win=int(sr*0.02)
t0,t1=33.5,52
seg=x[int(t0*sr):int(t1*sr)]
rms=np.array([np.sqrt((seg[i:i+win]**2).mean()) for i in range(0,len(seg)-win,hop)]); db=20*np.log10(rms+1e-9)
# low-passed (<150Hz) energy via simple moving average filter
from numpy.fft import rfft, irfft
X=rfft(seg); f=np.fft.rfftfreq(len(seg),1/sr); lo=irfft(X*(f<150),len(seg)); hi=irfft(X*(f>3000),len(seg))
lrms=np.array([np.sqrt((lo[i:i+win]**2).mean()) for i in range(0,len(seg)-win,hop)]); ldb=20*np.log10(lrms+1e-9)
hrms=np.array([np.sqrt((hi[i:i+win]**2).mean()) for i in range(0,len(seg)-win,hop)]); hdb=20*np.log10(hrms+1e-9)
ts=t0+np.arange(len(db))*hop/sr
for a,b,lab in [(35.5,36.0,'cut A->B 35.750'),(38.8,39.5,'wipe B->C 38.88-39.29'),(40.4,40.8,'cut C->D 40.583'),(42.6,43.1,'shell slam/text2 42.79'),(44.5,45.0,'crane start 44.67'),(46.3,47.2,'lens whip1 46.92'),(47.7,48.5,'lens whip2 48.29'),(49.0,49.8,'lens whip3 49.62')]:
    m=(ts>=a)&(ts<=b)
    i=np.argmax(db[m]); j=np.argmax(ldb[m]); k=np.argmax(hdb[m])
    print(f"{lab}: loudest {ts[m][i]:.3f}s {db[m][i]:.1f}dB | sub-150Hz peak {ts[m][j]:.3f}s {ldb[m][j]:.1f}dB | >3kHz peak {ts[m][k]:.3f}s {hdb[m][k]:.1f}dB")
# sub-bass envelope per 0.25s
print('sub150 dB per 0.5s:',' '.join(f"{t:.1f}:{ldb[(ts>=t)&(ts<t+0.5)].mean():.0f}" for t in np.arange(33.5,52,0.5)))
print('>3k dB per 0.5s:',' '.join(f"{t:.1f}:{hdb[(ts>=t)&(ts<t+0.5)].mean():.0f}" for t in np.arange(33.5,52,0.5)))
