import numpy as np, librosa, soundfile as sf, matplotlib
matplotlib.use('Agg'); import matplotlib.pyplot as plt
x,sr=sf.read('ref_stereo.wav'); y=x.mean(1).astype(np.float32); side=((x[:,0]-x[:,1])/2).astype(np.float32)
hop=256
S=librosa.feature.melspectrogram(y=y,sr=sr,n_fft=2048,hop_length=hop,n_mels=160,fmax=16000)
SdB=librosa.power_to_db(S,ref=S.max())
ts=np.arange(S.shape[1])*hop/sr
C=librosa.feature.chroma_cqt(y=librosa.effects.harmonic(y),sr=sr,hop_length=512); tc=np.arange(C.shape[1])*512/sr
bt=np.load('beats.npy')
tv,d,hd=np.load('vis.npy')
st=np.load('st.npy'); mo=np.load('mom.npy')
cuts=[2.92,4.29,7.96,9.79,13.46,16.42,18.79,20.42,21.88,27.21,32.54,33.33,35.75,39.08,40.58,45.17,46.96,48.29,49.63,53.25,54.67,56.29,60.12]
# side energy
fr=2048
def rms(a): 
    n=len(a)//hop; return np.sqrt(np.mean(a[:n*hop].reshape(n,hop)**2,1)+1e-12)
mr=rms(y); sr_=rms(side); tr=np.arange(len(mr))*hop/sr
for a in range(0,69,12):
    b=min(a+12,69.06)
    fig,ax=plt.subplots(4,1,figsize=(22,13),sharex=True,gridspec_kw={'height_ratios':[3,1.2,1,1]})
    m=(ts>=a)&(ts<b)
    ax[0].imshow(SdB[:,m],origin='lower',aspect='auto',extent=[a,b,0,160],cmap='magma',vmin=-80,vmax=0)
    mel_hz=librosa.mel_frequencies(n_mels=160,fmax=16000)
    yt=[50,100,200,400,800,1600,3200,6400,12800]; ax[0].set_yticks([np.argmin(abs(mel_hz-f)) for f in yt]); ax[0].set_yticklabels(yt)
    mc=(tc>=a)&(tc<b)
    ax[1].imshow(C[:,mc],origin='lower',aspect='auto',extent=[a,b,-0.5,11.5],cmap='Greys')
    ax[1].set_yticks(range(12)); ax[1].set_yticklabels(['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'],fontsize=7)
    mm=(st[0]>=a)&(st[0]<b); ax[2].plot(st[0][mm],st[1][mm],label='short-term LUFS'); 
    mm=(mo[0]>=a)&(mo[0]<b); ax[2].plot(mo[0][mm],mo[1][mm],label='momentary LUFS',alpha=.6); ax[2].set_ylim(-45,-8); ax[2].legend(loc='lower right'); ax[2].grid(alpha=.3)
    mm=(tr>=a)&(tr<b); ax[3].plot(tr[mm],20*np.log10(mr[mm]),label='mid dB'); ax[3].plot(tr[mm],20*np.log10(sr_[mm]),label='side dB',alpha=.7)
    mv=(tv>=a)&(tv<b); ax3b=ax[3].twinx(); ax3b.plot(tv[mv],d[mv],color='g',alpha=.6,label='frame diff'); ax3b.set_ylim(0,0.5)
    ax[3].set_ylim(-70,-5); ax[3].legend(loc='lower left')
    for axx in ax:
        for c in cuts:
            if a<=c<b: axx.axvline(c,color='cyan',lw=1.4,ls='--')
        for q in bt:
            if a<=q<b: axx.axvline(q,color='white' if axx is ax[0] else 'orange',lw=0.5,alpha=.5)
    ax[3].set_xticks(np.arange(a,b,0.5)); ax[3].tick_params(axis='x',labelsize=8)
    plt.tight_layout(); plt.savefig(f'plots/spec_{a:02d}.png',dpi=70); plt.close()
print('ok')
