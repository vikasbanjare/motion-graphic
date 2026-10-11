import numpy as np, librosa, soundfile as sf, matplotlib
matplotlib.use('Agg'); import matplotlib.pyplot as plt
X,sr=sf.read('ref_stereo.wav'); y=X.mean(1).astype(np.float32); side=((X[:,0]-X[:,1])/2).astype(np.float32)
ys,_=sf.read('sep_nonrepeating.wav'); ys=ys.astype(np.float32)
wins=[(0,4.6,'intro scribble + gap'),(4,7,'swell into music'),(6.8,10.6,'bird + lens'),(13.3,16.6,'shimmer band'),(18.2,22.4,'whips + riser'),(26.5,28.6,'column wipe'),
      (32.2,36.4,'lighthouse'),(38.6,40,'underwater'),(40.8,44.6,'pearl shimmer + breakdown'),(46.3,50.3,'whips to MONEY seal'),(50.2,52.4,'drop 2'),(53,57,'phone'),(60,63.5,'logo'),(63.3,69.06,'outro')]
fig,axs=plt.subplots(len(wins),3,figsize=(30,5*len(wins)))
for r,(a,b,name) in enumerate(wins):
    i0,i1=int(a*sr),int(b*sr)
    for c,(sig,lab) in enumerate([(y,'mix'),(ys,'non-repeating'),(side,'side (L-R)')]):
        S=np.abs(librosa.stft(sig[i0:i1],n_fft=2048,hop_length=128))
        SdB=20*np.log10(S/np.abs(librosa.stft(y,n_fft=2048,hop_length=2048)).max()+1e-9)
        axs[r,c].imshow(SdB,origin='lower',aspect='auto',extent=[a,b,0,sr/2/1000],cmap='magma',vmin=-85,vmax=-5)
        axs[r,c].set_ylim(0,16); axs[r,c].set_title(f'{name} [{lab}]',fontsize=11); axs[r,c].set_xticks(np.arange(np.ceil(a*4)/4,b,0.25)); axs[r,c].tick_params(axis='x',labelsize=7,rotation=90)
        axs[r,c].set_ylabel('kHz')
plt.tight_layout(); plt.savefig('plots/zooms.png',dpi=42)
