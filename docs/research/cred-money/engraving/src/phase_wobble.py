# Local carrier phase of the line screen -> wobble amplitude (periods) and correlation length (px).
import numpy as np, cv2, sys
sys.path.insert(0,'src')
from metrics import luma
from resynth import SCENES, ref_crop
def local_phase(g,P,ang,sig=None):
    g=g.astype(np.float64); yy,xx=np.mgrid[0:g.shape[0],0:g.shape[1]].astype(float)
    th=np.radians(ang); d=np.array([np.cos(th),-np.sin(th)]); n=np.array([-d[1],d[0]]); u=xx*n[0]+yy*n[1]
    sig=sig or P*1.2
    H=g-cv2.GaussianBlur(g,(0,0),P*1.2)
    z=cv2.GaussianBlur(H*np.cos(2*np.pi*u/P),(0,0),sig)-1j*cv2.GaussianBlur(H*np.sin(2*np.pi*u/P),(0,0),sig)
    return z
def analyse(name,g,P,ang,label):
    # refine P and angle by maximizing coherent energy
    best=None
    for dP in np.linspace(-0.06,0.06,13):
        for da in np.linspace(-3,3,13):
            z=local_phase(g,P*(1+dP),ang+da); s=abs(z.sum())
            if best is None or s>best[0]: best=(s,P*(1+dP),ang+da)
    _,P2,a2=best; z=local_phase(g,P2,a2)
    A=np.abs(z); m=A>np.percentile(A,50)              # only where lines are strong
    m[:8,:]=m[-8:,:]=m[:,:8]=m[:,-8:]=False
    ph=np.angle(z*np.conj(z[m].mean()))                # phase relative to the mean carrier
    sd=np.sqrt(np.mean(ph[m]**2))
    coh=abs(np.exp(1j*ph[m]).mean())                  # 1 = perfectly regular screen
    # correlation length of exp(i*phase)
    e=np.where(m,np.exp(1j*ph),0); E=np.fft.fft2(e); ac=np.fft.ifft2(np.abs(E)**2); ac=np.abs(np.fft.fftshift(ac)); ac/=ac.max()
    cy,cx=np.array(ac.shape)//2; prof=ac[cy,cx:]; prof2=ac[cy:,cx]
    L=(np.argmax(prof<0.75)+np.argmax(prof2<0.75))/2
    print(f"{label:26s} P={P2:.2f} ang={a2:.1f}  phase rms={sd:.2f} rad = {sd/(2*np.pi):.3f} periods   coherence={coh:.3f}   acf(0.75) len={L:.0f}px")
    return sd/(2*np.pi),coh,L
if __name__=='__main__':
    for name in ['green_rock','lighthouse','columns','flowers']:
        s=SCENES[name]; R=ref_crop(name); analyse(name,luma(R),s['P'],s['ang'],'REF '+name)
    # synthetic: our renderer with a few wobble settings on the green rock tone, downscaled the same way
    from resynth import setup
    from engrave import engrave, prepare_fields
    for wob,ws in [(0.06,0.02),(0.15,0.02),(0.25,0.01),(0.25,0.03),(0.4,0.02)]:
        name='green_rock'; s=SCENES[name]; R,T3,F,base=setup(name,wobble=wob,wobble_scale=ws,grain=0,mottle=0)
        rgb,_=engrave(T3,fields=F,**base); h,w=R.shape[:2]
        small=cv2.resize((rgb*255).astype(np.float32),(w,h),interpolation=cv2.INTER_AREA)
        analyse(name,luma(np.clip(small,0,255)),s['P'],s['ang'],f'OURS wob={wob} scale={ws}')
