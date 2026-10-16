import numpy as np, librosa, soundfile as sf
from scipy.ndimage import uniform_filter1d, median_filter
y,sr=sf.read('sep_nonrepeating.wav'); y=y.astype(np.float32)
X,_=sf.read('ref_stereo.wav'); L,R=X[:,0],X[:,1]; full=X.mean(1)
hop=256; nfft=2048
S=np.abs(librosa.stft(y,n_fft=nfft,hop_length=hop)); f=librosa.fft_frequencies(sr=sr,n_fft=nfft)
SL=np.abs(librosa.stft(L.astype(np.float32),n_fft=nfft,hop_length=hop)); SR_=np.abs(librosa.stft(R.astype(np.float32),n_fft=nfft,hop_length=hop))
Sfull=np.abs(librosa.stft(full.astype(np.float32),n_fft=nfft,hop_length=hop))
t=np.arange(S.shape[1])*hop/sr
def band(Sx,a,b): m=(f>=a)&(f<b); return (Sx[m]**2).sum(0)
# a broadband 'event' energy from the non-repeating layer, excluding sub (<150) where kicks leak
E=band(S,150,16000); Ed=10*np.log10(uniform_filter1d(E,9)+1e-10)
# exclude transient kick/hat leaks: use 80ms smoothing and require duration
base=median_filter(Ed,size=int(4*sr/hop))  # 4 s running median
z=Ed-base
on=z>6
# merge gaps < 60ms, drop events < 70 ms
ev=[];i=0;n=len(on)
while i<n:
    if on[i]:
        j=i
        while j<n and (on[j] or (j+1<n and on[min(j+1,n-1)] and False)): j+=1
        ev.append([i,j]); i=j
    else: i+=1
merged=[]
for a,b in ev:
    if merged and a-merged[-1][1] < int(0.06*sr/hop): merged[-1][1]=b
    else: merged.append([a,b])
rows=[]
for a,b in merged:
    dur=(b-a)*hop/sr
    if dur<0.07: continue
    seg=S[:,a:b]; spec=seg.mean(1)
    cen=(f*spec).sum()/spec.sum()
    flat=np.exp(np.mean(np.log(spec[(f>200)&(f<12000)]+1e-9)))/np.mean(spec[(f>200)&(f<12000)])
    e=E[a:b]; pk=np.argmax(e); att=pk*hop/sr; dec=(b-a-pk)*hop/sr
    # centroid slope over time (rising/falling sweep)
    cens=[(f*S[:,k]).sum()/(S[:,k].sum()+1e-9) for k in range(a,b)]
    slope=np.polyfit(np.arange(len(cens))*hop/sr,cens,1)[0] if len(cens)>3 else 0
    # level of event vs full mix (dB)
    lev=10*np.log10(E[a:b].max()/ (band(Sfull,150,16000)[max(0,a-200):a].mean()+1e-10))
    # pan: L/R energy balance during event in 150-16k, start vs end
    el=band(SL,150,16000)[a:b]; er=band(SR_,150,16000)[a:b]
    pan=10*np.log10((el.sum()+1e-9)/(er.sum()+1e-9))
    h=len(el)//2 or 1
    pan_s=10*np.log10((el[:h].sum()+1e-9)/(er[:h].sum()+1e-9)); pan_e=10*np.log10((el[h:].sum()+1e-9)/(er[h:].sum()+1e-9))
    rows.append((t[a],t[min(b,len(t)-1)],dur,cen,flat,att,dec,slope,lev,pan,pan_s,pan_e,z[a:b].max()))
print(" start   end    dur  centroid flat  attack decay  cen-slope  peak-vs-prior-mix  pan(L/R dB) start->end  z")
for r in rows:
    print(f"{r[0]:6.2f} {r[1]:6.2f} {r[2]:5.2f}  {r[3]:7.0f}  {r[4]:.2f}  {r[5]:5.2f} {r[6]:5.2f}  {r[7]:+8.0f}   {r[8]:+6.1f}   {r[9]:+5.1f}  {r[10]:+5.1f}->{r[11]:+5.1f}  {r[12]:4.1f}")
np.save('events.npy',np.array(rows))
