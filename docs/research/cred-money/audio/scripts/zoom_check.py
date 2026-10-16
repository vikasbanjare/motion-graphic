import numpy as np, librosa, soundfile as sf, matplotlib
matplotlib.use('Agg'); import matplotlib.pyplot as plt
X,sr=sf.read('ref_stereo.wav'); M=X.mean(1).astype(np.float32)
ys,_=sf.read('sep_nonrepeating.wav'); ys=ys.astype(np.float32)
wins=[(12.6,14.3,'cut 13.458'),(18.2,19.8,'whip1 18.79'),(19.9,21.0,'whip2 20.42'),(46.2,50.2,'whips 46.96/48.29/49.63'),(50.8,52.5,'drop2'),(33.8,36.3,'gulls/rising tone/cut 35.75'),(65.8,69.06,'end')]
fig,axs=plt.subplots(len(wins),2,figsize=(24,3.3*len(wins)))
hop=128
for (a,b,lab),(ax1,ax2) in zip(wins,axs):
    for ax,sig,nm in ((ax1,M,'mix'),(ax2,ys,'sep')):
        seg=sig[int(a*sr):int(b*sr)]
        S=librosa.amplitude_to_db(np.abs(librosa.stft(seg,n_fft=2048,hop_length=hop)),ref=np.max)
        ax.imshow(S[:700],origin='lower',aspect='auto',extent=[a,b,0,700*sr/2048],cmap='magma',vmin=-70,vmax=0)
        ax.set_yscale('symlog',linthresh=200); ax.set_ylim(30,15000)
        ax.set_title(f'{lab} [{nm}]',fontsize=9); ax.set_xticks(np.arange(np.ceil(a*20)/20,b,0.05 if b-a<2 else 0.1)); ax.tick_params(axis='x',labelsize=6,rotation=90)
        anchor=14.461; bt=anchor+0.48*np.arange(-40,120)
        for q in bt:
            if a<=q<=b: ax.axvline(q,color='white',lw=0.6,alpha=.6)
plt.tight_layout(); plt.savefig('plots/zoom_check.png',dpi=50)
