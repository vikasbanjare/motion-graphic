import numpy as np, librosa, soundfile as sf, matplotlib
matplotlib.use('Agg'); import matplotlib.pyplot as plt
x,sr=sf.read('ref_stereo.wav'); y=x.mean(1).astype(np.float32)
hop=512; nfft=2048
D=librosa.stft(y,n_fft=nfft,hop_length=hop); S,ph=np.abs(D),np.angle(D)
# REPET-SIM: for each frame, median of the most similar frames at least 2 s away
Sf=librosa.decompose.nn_filter(S,aggregate=np.median,metric='cosine',width=int(librosa.time_to_frames(2,sr=sr,hop_length=hop)))
Sf=np.minimum(S,Sf)
margin=2
mask_sfx=librosa.util.softmask(S-Sf,margin*Sf,power=2)
mask_mus=librosa.util.softmask(Sf,margin*(S-Sf),power=2)
yS=librosa.istft(mask_sfx*D,hop_length=hop,length=len(y)); yM=librosa.istft(mask_mus*D,hop_length=hop,length=len(y))
sf.write('sep_nonrepeating.wav',yS,sr); sf.write('sep_repeating.wav',yM,sr)
# per-frame energy of non-repeating part by band
f=librosa.fft_frequencies(sr=sr,n_fft=nfft); t=librosa.frames_to_time(np.arange(S.shape[1]),sr=sr,hop_length=hop)
R=(mask_sfx*S)**2; Tot=S**2
bands={'sub<120':(0,120),'low120-500':(120,500),'mid500-2k':(500,2000),'hmid2-6k':(2000,6000),'air>6k':(6000,22050)}
out={}
for k,(a,b) in bands.items():
    m=(f>=a)&(f<b); out[k]=10*np.log10(R[m].sum(0)+1e-10); out['tot_'+k]=10*np.log10(Tot[m].sum(0)+1e-10)
out['ratio']=10*np.log10(R.sum(0)+1e-10)-10*np.log10(Tot.sum(0)+1e-10)
np.savez('repet_bands.npz',t=t,**out)
# flatness of non-repeating part
fl=librosa.feature.spectral_flatness(S=mask_sfx*S)[0]; cen=librosa.feature.spectral_centroid(S=mask_sfx*S,sr=sr)[0]
np.savez('repet_feat.npz',t=t,flat=fl,cen=cen)
print('done', S.shape)
