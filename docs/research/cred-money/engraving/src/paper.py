import numpy as np, cv2, json, sys
sys.path.insert(0,'src'); from palette import rgb, hexc
def paper_stats(name,t,x0,y0,x1,y1):
    im=rgb(t)[y0:y1,x0:x1]; g=im.mean(2)
    base=cv2.GaussianBlur(g,(0,0),25)
    hp=g-base
    fine=g-cv2.GaussianBlur(g,(0,0),1.5)            # grain < ~3px
    mott=cv2.GaussianBlur(g,(0,0),1.5)-base          # mottling 3..~50px
    # radial power spectrum slope
    h=hp-hp.mean(); S=min(h.shape); h=h[:S,:S]
    P=np.abs(np.fft.fftshift(np.fft.fft2(h*np.outer(np.hanning(S),np.hanning(S)))))**2
    c=S//2; yy,xx=np.mgrid[-c:S-c,-c:S-c]; r=np.hypot(xx,yy)
    rb=np.arange(3,c-1); pw=np.array([P[(r>=a)&(r<a+1)].mean() for a in rb])
    slope=np.polyfit(np.log(rb/S),np.log(pw),1)[0]
    # autocorrelation half-width
    A=np.real(np.fft.ifft2(np.abs(np.fft.fft2(h))**2)); A=np.fft.fftshift(A)/A.max(); row=A[c,c:]
    hw=int(np.argmax(row<0.5))
    r=dict(name=name,t=t,mean_hex=hexc(im.reshape(-1,3).mean(0)),luma_mean=round(g.mean(),1),hp_std=round(hp.std(),2),grain_std=round(fine.std(),2),mottle_std=round(mott.std(),2),spectral_slope=round(slope,2),acf_halfwidth_px=hw)
    print(r); return r
R=[paper_stats('intro_grey',0.0,40,40,600,320),paper_stats('note_cream_51',51.0,60,230,170,330),paper_stats('note_cream_52',52.0,480,60,580,160),paper_stats('coin_green_51',51.0,250,240,400,300)]
# vignette of intro paper: mean luma in center vs edges
g=rgb(0.0).mean(2); cy,cx=180,320
for rr in [(0,60),(60,120),(120,180),(180,240),(240,300),(300,370)]:
    yy,xx=np.mgrid[0:360,0:640]; d=np.hypot(yy-cy,(xx-cx)); m=(d>=rr[0])&(d<rr[1]); print('intro radial',rr,round(g[m].mean(),1))
json.dump(R,open('out/paper.json','w'),indent=1)
