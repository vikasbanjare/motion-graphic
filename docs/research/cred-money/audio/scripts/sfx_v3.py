# Per-SFX measurement with explicit definitions.
# energy = band energy (STFT 2048, hop 128 = 2.9 ms) of SOURCE (sep = REPET-SIM non-repeating layer, mix = full stereo mix mid)
# smoothing: 'fast' = 20 ms moving average; 'slow' = 120 ms median then 40 ms average (suppresses kick transients for swells/beds)
# baseline = 20th percentile of energy in [win_start, win_start+0.25*(win)] ; onset = first frame >= baseline+6 dB before the peak
# end = first frame after peak where energy <= peak-20 dB or <= baseline+3 dB
# over_bed_db = peak band level of the MIX during event minus median band level of the MIX in the 1.0 s before onset
import numpy as np, librosa, soundfile as sf, json
from scipy.ndimage import uniform_filter1d, median_filter
ys,sr=sf.read('sep_nonrepeating.wav'); ys=ys.astype(np.float32)
X,_=sf.read('ref_stereo.wav'); L=X[:,0].astype(np.float32); R=X[:,1].astype(np.float32); M=(L+R)/2; Sd=(L-R)/2
hop=128; nfft=2048; f=librosa.fft_frequencies(sr=sr,n_fft=nfft)
SPEC={k:np.abs(librosa.stft(v,n_fft=nfft,hop_length=hop)) for k,v in dict(sep=ys,mix=M,L=L,R=R,side=Sd).items()}
T=np.arange(SPEC['sep'].shape[1])*hop/sr
def band(k,lo,hi): m=(f>=lo)&(f<hi); return (SPEC[k][m]**2).sum(0)
items=[
# name, kind, win_a, win_b, lo, hi, src, smooth, visual_anchor_name, visual_t
('pen scribble (line drawing)','foley',0.2,4.3,1000,15000,'mix','fast','first line appears',0.33),
('reverse swell into reveal','swell',3.9,5.9,40,2000,'mix','slow','flowers pop in (circle reveal completes)',5.17),
('high air bed 4.3-6.3k','bed',5.0,10.6,4300,6300,'sep','slow','flower scene / music entry',6.0),
('wing flutter','foley',6.9,7.8,7000,15000,'sep','fast','hummingbird motion onset',7.17),
('bird chirps (x4)','nature',8.0,9.8,3000,4600,'sep','fast','hummingbird hovering',8.2),
('lens swell','swell',9.4,10.6,40,1200,'sep','slow','lens ring sweeps in',9.67),
('cut hit + first sub (groove A)','impact',13.0,14.2,30,120,'mix','fast','hard cut to holo band',13.458),
('glass shimmer partials','shimmer',13.3,16.8,2300,3400,'sep','slow','hard cut to holo band',13.458),
('whip A1','whoosh',18.4,18.92,3000,15000,'sep','fast','whip-pan cut 1',18.792),
('whip A2','whoosh',18.92,19.6,3000,15000,'sep','fast','whip-pan cut 1',18.792),
('whip B','whoosh',20.0,21.0,3000,15000,'sep','fast','whip-pan cut 2',20.417),
('air riser','riser',21.2,22.7,5000,15000,'sep','slow','camera pulls back through columns',21.67),
('column wipe texture','texture',26.5,28.6,300,3000,'sep','slow','column wipe to purple scene',27.10),
('lighthouse low hum','drone',32.2,36.6,100,250,'sep','slow','hard cut to lighthouse',32.542),
('gull cries','nature',34.0,36.0,1800,6500,'sep','fast','light beam sweep',33.08),
('rising tone into cut','riser',34.6,36.4,250,600,'sep','slow','hard cut to reminders',35.75),
('underwater whoosh','whoosh',38.5,40.1,150,8000,'sep','slow','dissolve to underwater',38.96),
('pearl shimmer','shimmer',40.6,44.0,5000,9500,'sep','slow','hard cut to shell/pearl',40.583),
('shell-close swell','swell',43.0,44.4,150,2500,'sep','slow','shell closes + text',42.75),
('whip C1','whoosh',46.3,46.98,3000,15000,'sep','fast','whip-pan cut 3',46.958),
('whip C2','whoosh',46.98,47.6,3000,15000,'sep','fast','whip-pan cut 3',46.958),
('whip D','whoosh',47.7,48.7,3000,15000,'sep','fast','whip-pan cut 4',48.292),
('whip E','whoosh',48.9,49.8,3000,15000,'sep','fast','whip-pan cut 5 (to seal)',49.625),
('seal sparkle','shimmer',49.8,51.2,4000,15000,'sep','fast','seal settles',49.75),
('drop-2 sub impact','impact',51.0,52.3,30,150,'mix','fast','(no cut: seal holding)',51.45),
('whoosh F (bill wraps phone)','whoosh',55.6,57.2,3000,15000,'sep','fast','text ignorance to bliss',56.11),
('logo ring swell','swell',61.0,63.2,100,15000,'sep','slow','logo ring ripple',61.83),
('end high shimmer','shimmer',66.0,67.6,4000,11000,'sep','fast','logo fades to black',66.0),
('end ring-out (tail)','bell',66.6,69.06,700,4200,'mix','slow','black',67.0),
]
rows=[]
for name,kind,a,b,lo,hi,src,sm,vn,vt in items:
    e=band(src,lo,hi)
    if sm=='slow': e=uniform_filter1d(median_filter(e,size=int(0.12*sr/hop)),int(0.04*sr/hop))
    else: e=uniform_filter1d(e,int(0.02*sr/hop))
    ed=10*np.log10(e+1e-12)
    sel=(T>=a)&(T<=b); t=T[sel]; d=ed[sel]
    base=np.percentile(d[:max(8,int(0.25*len(d)))],20)
    pk=int(np.argmax(d)); peak=d[pk]
    above=np.where(d[:pk+1]>=base+6)[0]
    # onset = start of the contiguous run above threshold that contains the peak
    s=pk
    while s>0 and d[s-1]>=base+6: s-=1
    en=pk
    while en<len(d)-1 and d[en]>max(peak-20,base+3): en+=1
    ts,tp,te=t[s],t[pk],t[en]
    i0,i1=np.searchsorted(T,ts),np.searchsorted(T,te)+1
    el=band('L',lo,hi)[i0:i1].sum(); er=band('R',lo,hi)[i0:i1].sum()
    em=band('mix',lo,hi)[i0:i1].sum(); es=band('side',lo,hi)[i0:i1].sum()
    mixb=10*np.log10(uniform_filter1d(band('mix',lo,hi),int(0.02*sr/hop))+1e-12)
    pre=(T>=ts-1.0)&(T<ts); over=mixb[i0:i1].max()-(np.median(mixb[pre]) if pre.any() else np.nan)
    Sx=SPEC[src][(f>=lo)&(f<hi)][:,i0:i1]; fb=f[(f>=lo)&(f<hi)]
    cen=(fb[:,None]*Sx).sum(0)/(Sx.sum(0)+1e-9)
    slope=np.polyfit(np.arange(len(cen))*hop/sr,cen,1)[0] if len(cen)>4 else 0
    rows.append(dict(name=name,kind=kind,onset=round(float(ts),3),peak=round(float(tp),3),end=round(float(te),3),
        attack_s=round(float(tp-ts),3),release_s=round(float(te-tp),3),rise_db=round(float(peak-base),1),
        over_bed_db=round(float(over),1),pan_LR_db=round(float(10*np.log10(el/er)),1),side_minus_mid_db=round(float(10*np.log10((es+1e-12)/em)),1),
        centroid_hz=int(np.median(cen)),centroid_slope_hz_per_s=int(slope),band=[lo,hi],source=src,
        visual=vn,visual_t=vt,onset_minus_visual=round(float(ts-vt),3),peak_minus_visual=round(float(tp-vt),3)))
json.dump(rows,open('sfx_v3.json','w'),indent=1)
print(f"{'sfx':32s} {'onset':>6s} {'peak':>6s} {'end':>6s} {'att':>5s} {'rel':>5s} {'rise':>5s} {'overbed':>7s} {'pan':>5s} {'S-M':>6s} {'cen':>6s} {'slope':>7s} | visual anchor (t) : onset-vis / peak-vis")
for r in rows:
    print(f"{r['name']:32s} {r['onset']:6.2f} {r['peak']:6.2f} {r['end']:6.2f} {r['attack_s']:5.2f} {r['release_s']:5.2f} {r['rise_db']:5.1f} {r['over_bed_db']:+7.1f} {r['pan_LR_db']:+5.1f} {r['side_minus_mid_db']:+6.1f} {r['centroid_hz']:6d} {r['centroid_slope_hz_per_s']:+7d} | {r['visual']} ({r['visual_t']}) : {r['onset_minus_visual']:+.2f} / {r['peak_minus_visual']:+.2f}")
