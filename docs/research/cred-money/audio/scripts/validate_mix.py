import numpy as np, soundfile as sf, pyloudnorm as pyln, librosa, subprocess, re, sys
A='ref_stereo.wav'; B=sys.argv[1]
def st_curve(p):
    out=subprocess.run(['ffmpeg','-nostats','-i',p,'-af','ebur128=metadata=1,ametadata=print:key=lavfi.r128.S','-f','null','-'],capture_output=True,text=True).stdout
    t=[];v=[];cur=None
    for line in subprocess.run(['ffmpeg','-nostats','-i',p,'-af','ebur128=metadata=1,ametadata=print:key=lavfi.r128.S:file=-','-f','null','-'],capture_output=True,text=True).stdout.splitlines():
        m=re.search(r'pts_time:([\d.]+)',line)
        if m: cur=float(m.group(1))
        m=re.search(r'lavfi.r128.S=(-?[\d.]+)',line)
        if m and cur is not None: t.append(cur); v.append(float(m.group(1)))
    return np.array(t),np.array(v)
def summary(p):
    s=subprocess.run(['ffmpeg','-nostats','-i',p,'-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True).stderr
    I=re.findall(r'I:\s+(-?[\d.]+) LUFS',s)[-1]; LRA=re.findall(r'LRA:\s+([\d.]+) LU',s)[-1]; TP=re.findall(r'Peak:\s+(-?[\d.]+) dBFS',s)[-1]
    return I,LRA,TP
for p in (A,B): print(p.split('/')[-1],'integrated/LRA/truepeak:',summary(p))
ta,sa=st_curve(A); tb,sb=st_curve(B)
print('\nshort-term LUFS every 3 s   (ref | demo | diff)')
diffs=[]
for T in np.arange(3,69,3.0):
    a=sa[np.argmin(abs(ta-T))]; b=sb[np.argmin(abs(tb-T))]
    if a<-70: continue
    diffs.append(b-a); print(f'{T:4.0f}s  {a:6.1f} | {b:6.1f} | {b-a:+5.1f}')
d=np.array(diffs); print(f'curve match: median |diff| {np.median(abs(d)):.1f} LU, p90 {np.percentile(abs(d),90):.1f} LU; correlation {np.corrcoef([sa[np.argmin(abs(ta-T))] for T in np.arange(3,69,0.5)],[sb[np.argmin(abs(tb-T))] for T in np.arange(3,69,0.5)])[0,1]:.3f}')
secs=[('intro',6.0,12.9),('grooveA',13.7,29.0),('drop',29.05,44.4),('break',44.4,52.0),('drop2',52.1,63.3),('outro',63.6,67.2)]
X,sr=sf.read(A); Y,_=sf.read(B)
print('\nsection   | LUFS ref/demo | side-mid dB ref/demo | sub<60 60-250 250-2k 2-6k >6k (ref)  ||  (demo) | onsets/s ref/demo')
for n,a,b in secs:
    out=[]
    for Z in (X,Y):
        s=Z[int(a*sr):int(b*sr)]; L=pyln.Meter(sr).integrated_loudness(s)
        mid=(s[:,0]+s[:,1])/2; side=(s[:,0]-s[:,1])/2; w=10*np.log10(np.mean(side**2)/np.mean(mid**2)+1e-12)
        F=np.abs(np.fft.rfft(mid))**2; fr=np.fft.rfftfreq(len(mid),1/sr); tot=F.sum()
        bd=[10*np.log10(F[(fr>=lo)&(fr<hi)].sum()/tot+1e-12) for lo,hi in [(0,60),(60,250),(250,2000),(2000,6000),(6000,22050)]]
        on=len(librosa.onset.onset_detect(y=mid.astype(np.float32),sr=sr))/(b-a)
        out.append((L,w,bd,on))
    r,dm=out
    print(f"{n:8s}  | {r[0]:6.1f}/{dm[0]:6.1f} | {r[1]:6.1f}/{dm[1]:6.1f} | "+' '.join(f'{v:5.1f}' for v in r[2])+'  ||  '+' '.join(f'{v:5.1f}' for v in dm[2])+f' | {r[3]:4.1f}/{dm[3]:4.1f}')
y=Y.mean(1).astype(np.float32)
oenv=librosa.onset.onset_strength(y=y[int(13*sr):int(63*sr)],sr=sr,hop_length=512); tg=librosa.feature.tempogram(onset_envelope=oenv,sr=sr,hop_length=512).mean(1); bp=librosa.tempo_frequencies(len(tg),sr=sr,hop_length=512)
ok=(bp>60)&(bp<200); print('\ndemo tempogram top peaks (bpm):',[round(bp[i],1) for i in np.argsort(tg*ok)[::-1][:4]])
maj=np.array([6.35,2.23,3.48,2.33,4.38,4.09,2.52,5.19,2.39,3.66,2.29,2.88]); mnr=np.array([6.33,2.68,3.52,5.38,2.60,3.53,2.54,4.75,3.98,2.69,3.34,3.17]); names=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B']
C=librosa.feature.chroma_cqt(y=y,sr=sr).mean(1)
print('demo key:',max([(round(np.corrcoef(np.roll(maj,k),C)[0,1],2),names[k]+' maj') for k in range(12)]+[(round(np.corrcoef(np.roll(mnr,k),C)[0,1],2),names[k]+' min') for k in range(12)]))
