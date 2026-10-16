import numpy as np, wave, sys
w=wave.open(sys.argv[1]); sr=w.getframerate(); n=w.getnframes(); ch=w.getnchannels()
x=np.frombuffer(w.readframes(n),np.int16).astype(float)/32768
if ch>1: x=x.reshape(-1,ch).mean(1)
def flux(t0,t1):
    seg=x[int(t0*sr):int(t1*sr)]; hop=int(sr*0.005); win=1024
    fr=np.array([seg[i:i+win]*np.hanning(win) for i in range(0,len(seg)-win,hop)])
    S=np.log1p(np.abs(np.fft.rfft(fr,axis=1))*100)
    f=np.r_[0,np.maximum(np.diff(S,axis=0),0).sum(1)]
    return f-f.mean(),hop/sr
f,dt=flux(33.5,44.5)
ac=np.correlate(f,f,'full')[len(f)-1:]
lags=np.arange(len(ac))*dt
m=(lags>0.3)&(lags<1.2)
best=lags[m][np.argmax(ac[m])]
print('best beat lag (0.3-1.2s): %.3f s -> %.1f BPM'%(best,60/best))
m2=(lags>0.08)&(lags<0.3); b2=lags[m2][np.argmax(ac[m2])]; print('sub-beat lag: %.3f s'%b2)
# beat phase: fold flux onto beat grid
per=best; ph=np.arange(len(f))*dt % per
bins=np.linspace(0,per,25); hist=[f[(ph>=bins[i])&(ph<bins[i+1])].mean() for i in range(24)]
k=int(np.argmax(hist)); print('downbeat phase offset from 33.5s: %.3f s'%((bins[k]+bins[k+1])/2))
beat0=33.5+(bins[k]+bins[k+1])/2
print('beat grid times 33.5-52:', ' '.join('%.2f'%t for t in np.arange(beat0,52,per)))
