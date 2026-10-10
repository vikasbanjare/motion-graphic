import numpy as np, librosa, soundfile as sf, matplotlib
matplotlib.use('Agg'); import matplotlib.pyplot as plt
y,sr=sf.read('sep_nonrepeating.wav')
hop=256
S=librosa.feature.melspectrogram(y=y.astype(np.float32),sr=sr,n_fft=2048,hop_length=hop,n_mels=160,fmax=16000)
ref=np.load('st.npy')
x,_=sf.read('ref_stereo.wav'); Sfull=librosa.feature.melspectrogram(y=x.mean(1).astype(np.float32),sr=sr,n_fft=2048,hop_length=hop,n_mels=160,fmax=16000)
SdB=librosa.power_to_db(S,ref=Sfull.max())
ts=np.arange(S.shape[1])*hop/sr
cuts=[2.92,4.29,7.96,9.79,13.46,16.42,18.79,20.42,21.88,27.21,32.54,33.33,35.75,39.08,40.58,45.17,46.96,48.29,49.63,53.25,54.67,56.29,60.12]
mel_hz=librosa.mel_frequencies(n_mels=160,fmax=16000); yt=[50,100,200,400,800,1600,3200,6400,12800]
fig,axs=plt.subplots(6,1,figsize=(24,26))
for ax,a in zip(axs,range(0,69,12)):
    b=min(a+12,69.06); m=(ts>=a)&(ts<b)
    ax.imshow(SdB[:,m],origin='lower',aspect='auto',extent=[a,b,0,160],cmap='magma',vmin=-80,vmax=-10)
    ax.set_yticks([np.argmin(abs(mel_hz-f)) for f in yt]); ax.set_yticklabels(yt)
    for c in cuts:
        if a<=c<b: ax.axvline(c,color='cyan',lw=1.2,ls='--')
    ax.set_xticks(np.arange(a,b,0.5)); ax.tick_params(axis='x',labelsize=8)
plt.tight_layout(); plt.savefig('plots/nonrepeating.png',dpi=60)
