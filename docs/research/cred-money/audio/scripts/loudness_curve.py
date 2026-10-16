import numpy as np, soundfile as sf, subprocess, re, json, sys
P=sys.argv[1] if len(sys.argv)>1 else 'ref_stereo.wav'
def curve(key):
    out=subprocess.run(['ffmpeg','-nostats','-i',P,'-af',f'ebur128=metadata=1,ametadata=print:key=lavfi.r128.{key}:file=-','-f','null','-'],capture_output=True,text=True).stdout
    t=[];v=[];cur=None
    for line in out.splitlines():
        m=re.search(r'pts_time:([\d.]+)',line)
        if m: cur=float(m.group(1))
        m=re.search(rf'lavfi.r128.{key}=(-?[\d.]+)',line)
        if m and cur is not None: t.append(cur); v.append(float(m.group(1)))
    return np.array(t),np.array(v)
tS,S=curve('S'); tM,M=curve('M')
X,sr=sf.read(P)
if X.ndim==1: X=np.stack([X,X],1)
mid=(X[:,0]+X[:,1])/2; side=(X[:,0]-X[:,1])/2
nfft=4096; hop=sr//10
rows=[]
print(' t(s) | ST-LUFS(3s) | M-LUFS(0.4s) | side-mid dB | band dBFS: sub<60 60-250 250-2k 2-6k >6k | peak dBFS')
for T in np.arange(0.5,int(len(mid)/sr)+0.5,1.0):
    i0=int((T-0.5)*sr); i1=int((T+0.5)*sr); seg=mid[i0:i1]
    st=S[np.argmin(abs(tS-(T+0.5)))] ; mo=M[np.argmin(abs(tM-T))]
    w=10*np.log10(np.mean(side[i0:i1]**2)/(np.mean(seg**2)+1e-12)+1e-12)
    F=np.abs(np.fft.rfft(seg*np.hanning(len(seg))))**2; fr=np.fft.rfftfreq(len(seg),1/sr)
    norm=(np.hanning(len(seg))**2).sum()*len(seg)/2
    bd=[10*np.log10(F[(fr>=lo)&(fr<hi)].sum()/norm+1e-12) for lo,hi in [(20,60),(60,250),(250,2000),(2000,6000),(6000,20000)]]
    pk=20*np.log10(np.abs(X[i0:i1]).max()+1e-9)
    rows.append(dict(t=float(T),st=float(st),m=float(mo),w=float(w),bands=[round(b,1) for b in bd],pk=float(pk)))
    print(f'{T:5.1f} | {st:6.1f} | {mo:6.1f} | {w:6.1f} | '+' '.join(f'{b:6.1f}' for b in bd)+f' | {pk:5.1f}')
json.dump(dict(st_t=tS[::5].round(2).tolist(),st=S[::5].round(2).tolist(),m_t=tM[::5].round(2).tolist(),m=M[::5].round(2).tolist(),per_sec=rows),open(sys.argv[2] if len(sys.argv)>2 else 'loudness.json','w'))
