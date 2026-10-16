import numpy as np, wave, sys
w=wave.open(sys.argv[1]); sr=w.getframerate(); n=w.getnframes(); ch=w.getnchannels()
x=np.frombuffer(w.readframes(n),np.int16).astype(float)/32768
if ch>1: x=x.reshape(-1,ch).mean(1)
hop=int(sr*0.005); win=2048
def feats(t0,t1):
    seg=x[int(t0*sr):int(t1*sr)]
    fr=np.array([seg[i:i+win]*np.hanning(win) for i in range(0,len(seg)-win,hop)])
    S=np.abs(np.fft.rfft(fr,axis=1)); f=np.fft.rfftfreq(win,1/sr)
    return fr,S,f
fr,S,f=feats(50.5,63.6)
lo=S[:,(f>30)&(f<150)].sum(1); flux=np.r_[0,np.maximum(np.diff(np.log1p(S*50),axis=0),0).sum(1)]
lof=np.r_[0,np.maximum(np.diff(np.log1p(lo*50)),0)]
env=flux-np.convolve(flux,np.ones(40)/40,'same'); env[env<0]=0
ac=np.correlate(env,env,'full')[len(env)-1:]
lags=np.arange(len(ac))*0.005
k=(lags>0.25)&(lags<1.2)
best=lags[k][np.argmax(ac[k])]
print("onset-env autocorr best lag in 0.25-1.2s: %.3f s -> %.1f BPM"%(best,60/best))
top=np.argsort(-ac[k])[:8]; print("top lags:",[round(float(lags[k][i]),3) for i in top])
# low band (kick) onsets
med=np.median(lof); mad=np.median(np.abs(lof-med))+1e-9
pk=[i for i in range(3,len(lof)-3) if lof[i]>med+8*mad and lof[i]==lof[max(0,i-20):i+20].max()]
print("kick-band (30-150Hz) onsets:",[round(50.5+i*0.005,3) for i in pk])
# full band strong onsets
med=np.median(flux); mad=np.median(np.abs(flux-med))+1e-9
pk2=[i for i in range(3,len(flux)-3) if flux[i]>med+6*mad and flux[i]==flux[max(0,i-16):i+16].max()]
print("broadband onsets:",[round(50.5+i*0.005,3) for i in pk2])
# 63-69 fine RMS
seg=x[int(63*sr):int(69.05*sr)]
h=int(sr*0.1)
for i in range(0,len(seg)-h,h):
    s=seg[i:i+h]; sp=np.abs(np.fft.rfft(s*np.hanning(len(s)))); ff=np.fft.rfftfreq(len(s),1/sr)
    print("%.1f rms=%.1fdB cent=%.0fHz lo<150=%.0f%%"%(63+i/sr,20*np.log10(np.sqrt((s**2).mean())+1e-9),(sp*ff).sum()/sp.sum(),sp[ff<150].sum()/sp.sum()*100))
