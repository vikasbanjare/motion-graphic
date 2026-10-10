import numpy as np, wave, sys
w=wave.open(sys.argv[1]); sr=w.getframerate(); n=w.getnframes(); ch=w.getnchannels()
x=np.frombuffer(w.readframes(n),np.int16).astype(float)/32768
if ch>1: x=x.reshape(-1,ch).mean(1)
t0,t1=33.5,52.0
seg=x[int(t0*sr):int(t1*sr)]
hop=int(sr*0.01); win=int(sr*0.04)
frames=[seg[i:i+win]*np.hanning(win) for i in range(0,len(seg)-win,hop)]
S=np.abs(np.fft.rfft(frames,axis=1))
freqs=np.fft.rfftfreq(win,1/sr)
rms=np.sqrt((np.array(frames)**2).mean(1)); db=20*np.log10(rms+1e-9)
flux=np.r_[0,np.maximum(np.diff(np.log1p(S*100),axis=0),0).sum(1)]
lo=S[:,freqs<200].sum(1); hi=S[:,freqs>4000].sum(1); cen=(S*freqs).sum(1)/(S.sum(1)+1e-9)
# onsets: peaks in flux above median+3*MAD
med=np.median(flux); mad=np.median(np.abs(flux-med))
thr=med+4*mad
peaks=[i for i in range(2,len(flux)-2) if flux[i]>thr and flux[i]==max(flux[i-5:i+6])]
print('onsets (t, flux/thr, rms dB, centroid Hz, low-band share):')
for i in peaks:
    t=t0+i*0.01
    print(f"  {t:6.2f}s  {flux[i]/thr:4.1f}x  {db[i]:6.1f}dB  cent={cen[i]:6.0f}  low={lo[i]/(S[i].sum()+1e-9)*100:4.1f}%")
print('RMS dB per 0.5 s:')
for k in range(0,len(db),50):
    t=t0+k*0.01
    print(f"  {t:5.1f}-{t+0.5:5.1f}: rms={db[k:k+50].mean():6.1f}dB peak={db[k:k+50].max():6.1f} centroid={cen[k:k+50].mean():6.0f}Hz hi>4k={hi[k:k+50].sum()/S[k:k+50].sum()*100:4.1f}%")
