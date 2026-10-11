import numpy as np, librosa, soundfile as sf
X,sr=sf.read('ref_stereo.wav'); y=X.mean(1).astype(np.float32)
yh,_=sf.read('harm.wav'); yh=yh.astype(np.float32)
# bass: pyin on 22.05k resample, 30-160 Hz
y22=librosa.resample(yh,orig_sr=sr,target_sr=11025)
f0,vf,vp=librosa.pyin(y22,fmin=30,fmax=200,sr=11025,frame_length=2048,hop_length=256)
t=np.arange(len(f0))*256/11025
names=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B']
def nn(h): 
    if not np.isfinite(h): return '-'
    m=int(round(librosa.hz_to_midi(h))); return f'{names[m%12]}{m//12-1}'
print('BASS (pyin 30-200 Hz, harmonic layer), modal note per half-second:')
line=[]
for s in np.arange(0,69,0.5):
    m=(t>=s)&(t<s+0.5)&vf
    if m.sum()<3: line.append(f'{s:.1f}:-'); continue
    mid=librosa.hz_to_midi(f0[m]); mo=np.bincount(np.round(mid).astype(int)).argmax()
    line.append(f'{s:.1f}:{names[mo%12]}{mo//12-1}')
print(' '.join(line))
# arpeggio/melody: CQT piano roll 300-2000 Hz, peak pitch-class per 16th in intro and outro
beat=60/125; st=beat/4; anchor=14.461
C=np.abs(librosa.cqt(yh,sr=sr,hop_length=256,fmin=librosa.note_to_hz('C3'),n_bins=60,bins_per_octave=12))
tc=np.arange(C.shape[1])*256/sr
def roll(a,b,lab,ph=0.008):
    print(f'\n{lab}: top note per 16th (CQT C3-B7), | = beat')
    g=np.arange(anchor+ph-np.ceil((anchor-a)/st)*st,b,st)
    out=[]
    for k,x in enumerate(g):
        m=(tc>=x)&(tc<x+st)
        if not m.any(): continue
        v=C[:,m].mean(1); i=np.argmax(v)
        out.append((x,librosa.midi_to_note(48+i,unicode=False),v[i]))
    s=''
    for k,(x,n,v) in enumerate(out):
        pos=round((x-anchor)/st)%4
        s+=('| ' if pos==0 else '')+n+' '
    print(s)
roll(6.0,12.9,'intro 6.0-12.9')
roll(63.3,67.6,'outro 63.3-67.6',0.052)
roll(49.9,51.4,'pre-drop2 49.9-51.4',0.052)
# chord/pitch-class content per bar (top-4 PCs) in grooves
Ch=librosa.feature.chroma_cqt(y=yh,sr=sr,hop_length=512); tch=np.arange(Ch.shape[1])*512/sr
print('\nTop pitch classes per bar (chroma, harmonic layer):')
bar=1.92
for b0 in np.arange(anchor-5*bar,69,bar):
    m=(tch>=b0)&(tch<b0+bar)
    if not m.any() or b0<0: continue
    v=Ch[:,m].mean(1); top=np.argsort(v)[::-1][:4]
    print(f'{b0:6.2f}: '+' '.join(names[i] for i in top))
