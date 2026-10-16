# Remove the line screen (carrier + harmonics) with Fourier notches, keeping the photographic detail.
import numpy as np, cv2
def descreen(g,P,ang,radius=0.022,harm=3):
    g=g.astype(np.float64); H,W=g.shape
    mu=g.mean(); G=np.fft.fft2(g-mu)
    fy=np.fft.fftfreq(H)[:,None]; fx=np.fft.fftfreq(W)[None,:]
    th=np.radians(ang); d=np.array([np.cos(th),-np.sin(th)]); n=np.array([-d[1],d[0]])  # image coords (y down)
    mask=np.ones((H,W))
    for k in range(1,harm+1):
        cx,cy=k*n[0]/P,k*n[1]/P
        for sx,sy in [(cx,cy),(-cx,-cy)]:
            # wrap into [-0.5,0.5)
            wx=(sx+0.5)%1-0.5; wy=(sy+0.5)%1-0.5
            dd=np.hypot(fx-wx,fy-wy); mask*=1-np.exp(-(dd/radius)**2)
    return np.real(np.fft.ifft2(G*mask))+mu, mask
if __name__=='__main__':
    import sys; sys.path.insert(0,'src')
    from resynth import SCENES, ref_crop
    from metrics import luma, fft_period, hp_std
    from phase_wobble import analyse
    import io, contextlib
    for n in SCENES:
        s=SCENES[n]; g=luma(ref_crop(n)); ds,_=descreen(g,s['P'],s['ang'])
        f=io.StringIO()
        with contextlib.redirect_stdout(f): a=analyse(n,ds,s['P'],s['ang'],'d')
        print(n,'carrier coherence after descreen',round(a[1],3),' hp_std ref',round(hp_std(g),2),'-> descreened',round(hp_std(ds),2))
        Z=3; h,w=g.shape
        im=np.hstack([g,np.full((h,4),255),ds]); im=np.clip(cv2.resize(im,(im.shape[1]*Z,h*Z),interpolation=cv2.INTER_NEAREST),0,255).astype(np.uint8)
        cv2.imwrite(f'out/descreen_{n}.png',im)
