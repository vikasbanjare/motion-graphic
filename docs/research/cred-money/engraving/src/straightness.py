# Structure-tensor orientation statistics at ~1 period scale, in pixels where the line carrier is strong.
import numpy as np, cv2
def orient_stats(g,P,ang):
    g=g.astype(np.float64); g=g-cv2.GaussianBlur(g,(0,0),P*1.5)
    gx=cv2.Sobel(g,cv2.CV_64F,1,0,ksize=3); gy=cv2.Sobel(g,cv2.CV_64F,0,1,ksize=3)
    s=P*0.8
    Jxx=cv2.GaussianBlur(gx*gx,(0,0),s); Jyy=cv2.GaussianBlur(gy*gy,(0,0),s); Jxy=cv2.GaussianBlur(gx*gy,(0,0),s)
    tr=Jxx+Jyy; det=np.sqrt((Jxx-Jyy)**2+4*Jxy**2); coh=det/(tr+1e-9)
    theta=0.5*np.arctan2(2*Jxy,Jxx-Jyy)               # gradient orientation (image coords)
    lineang=(np.degrees(-theta)+90)%180               # line orientation, y-up CCW
    m=tr>np.percentile(tr,50); m[:6,:]=m[-6:,:]=m[:,:6]=m[:,-6:]=False
    d=np.radians(2*(lineang[m]-ang)); R=np.abs(np.mean(np.exp(1j*d)))
    circ_std=np.degrees(np.sqrt(-2*np.log(max(R,1e-9)))/2)
    return dict(orient_coherence=round(float(coh[m].mean()),3),angle_circ_std_deg=round(float(circ_std),1))
if __name__=='__main__':
    import sys; sys.path.insert(0,'src')
    from resynth import SCENES, ref_crop
    from metrics import luma
    for n in SCENES:
        s=SCENES[n]; print('REF',n,orient_stats(luma(ref_crop(n)),s['P'],s['ang']))
    for n in SCENES:
        im=cv2.imread(f'compare/resynth_{n}.png')[:, :, ::-1]; w=im.shape[1]; h=im.shape[0]
        ours=im[24:, (w+8)//2:]; ours=cv2.resize(ours,(ours.shape[1]//3,ours.shape[0]//3),interpolation=cv2.INTER_AREA)
        s=SCENES[n]; print('OURS(wobble 0.9)',n,orient_stats(luma(ours),s['P'],s['ang']))
