import numpy as np, librosa, soundfile as sf
x,sr=sf.read('ref_stereo.wav'); y=x.mean(1).astype(np.float32)
hop=512
oenv=librosa.onset.onset_strength(y=y,sr=sr,hop_length=hop)
tempo,beats=librosa.beat.beat_track(onset_envelope=oenv,sr=sr,hop_length=hop)
bt=librosa.frames_to_time(beats,sr=sr,hop_length=hop)
print('librosa tempo',tempo, 'n beats',len(bt))
ibi=np.diff(bt); print('IBI median',np.median(ibi).round(4),'-> bpm',(60/np.median(ibi)).round(2),'IBI p10/p90',np.percentile(ibi,[10,90]).round(3))
np.save('beats.npy',bt)
# tempo per section
for a,b in [(0,14),(14,46),(46,52),(52,60),(60,69),(14,30),(30,46)]:
    m=(np.arange(len(oenv))*hop/sr>=a)&(np.arange(len(oenv))*hop/sr<b)
    tg=librosa.feature.tempogram(onset_envelope=oenv[m],sr=sr,hop_length=hop)
    ac=tg.mean(1); bpms=librosa.tempo_frequencies(len(ac),sr=sr,hop_length=hop)
    ok=(bpms>50)&(bpms<200)
    top=np.argsort(ac*ok)[::-1][:4]
    print(f'section {a}-{b}s tempogram peaks bpm:',[f"{bpms[i]:.1f}({ac[i]:.2f})" for i in top])
    t2,_=librosa.beat.beat_track(onset_envelope=oenv[m],sr=sr,hop_length=hop); print('   beat_track',np.round(t2,1))
# Key: chroma CQT on harmonic part
yh,yp=librosa.effects.hpss(y)
sf.write('harm.wav',yh,sr); sf.write('perc.wav',yp,sr)
C=librosa.feature.chroma_cqt(y=yh,sr=sr,hop_length=hop)
tC=librosa.frames_to_time(np.arange(C.shape[1]),sr=sr,hop_length=hop)
maj=np.array([6.35,2.23,3.48,2.33,4.38,4.09,2.52,5.19,2.39,3.66,2.29,2.88]); mnr=np.array([6.33,2.68,3.52,5.38,2.60,3.53,2.54,4.75,3.98,2.69,3.34,3.17])
names=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
def key(c):
    r=[]
    for k in range(12):
        r.append((np.corrcoef(np.roll(maj,k),c)[0,1],names[k]+' major'))
        r.append((np.corrcoef(np.roll(mnr,k),c)[0,1],names[k]+' minor'))
    r.sort(reverse=True); return r[:3]
print('global chroma',dict(zip(names,C.mean(1).round(2))))
print('global key',[(round(a,3),b) for a,b in key(C.mean(1))])
for a,b in [(0,7),(7,14),(14,22),(22,30),(30,38),(38,46),(46,52),(52,60),(60,69)]:
    m=(tC>=a)&(tC<b); c=C[:,m].mean(1)
    top=np.argsort(c)[::-1][:5]
    print(f'{a:2d}-{b:2d}s key',[(round(q,2),n) for q,n in key(c)][:2],' top pcs',[names[i] for i in top])
np.save('chroma.npy',C)
