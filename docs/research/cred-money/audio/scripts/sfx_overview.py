import numpy as np, librosa, soundfile as sf, matplotlib, json
matplotlib.use('Agg'); import matplotlib.pyplot as plt
ys,sr=sf.read('sep_nonrepeating.wav'); ys=ys.astype(np.float32)
hop=256
S=librosa.feature.melspectrogram(y=ys,sr=sr,n_fft=2048,hop_length=hop,n_mels=128,fmax=16000)
D=librosa.power_to_db(S,ref=S.max()); ts=np.arange(S.shape[1])*hop/sr
mel=librosa.mel_frequencies(n_mels=128,fmax=16000)
vis=json.load(open('visual_events.json'))
fig,axs=plt.subplots(4,1,figsize=(26,16))
for k,ax in enumerate(axs):
    a=k*17.3; b=min(a+17.3,69.06); m=(ts>=a)&(ts<b)
    ax.imshow(D[:,m],origin='lower',aspect='auto',extent=[a,b,0,128],cmap='magma',vmin=-75,vmax=0)
    yt=[60,125,250,500,1000,2000,4000,8000,14000]; ax.set_yticks([np.argmin(abs(mel-f)) for f in yt]); ax.set_yticklabels(yt)
    for n,t in vis.items():
        if a<=t<b: ax.axvline(t,color='cyan',lw=1,ls='--'); ax.text(t,122,n[:22],color='cyan',fontsize=7,rotation=0)
    ax.set_xticks(np.arange(np.ceil(a*2)/2,b,0.5)); ax.tick_params(axis='x',labelsize=7)
plt.tight_layout(); plt.savefig('plots/sfx_layer_overview.png',dpi=55)
