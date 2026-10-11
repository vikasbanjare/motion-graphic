"""Similarity metrics between an engraved render (downscaled to 360p) and a reference crop."""
import numpy as np, cv2
def luma(rgb):  # rgb uint8/float 0..255, Rec.601 like ffmpeg gray
    rgb=rgb.astype(np.float64); return 0.299*rgb[...,0]+0.587*rgb[...,1]+0.114*rgb[...,2]
def fft_period(g, pmin=1.95, pmax=6.5, pad=512, angs=None):
    S=min(g.shape); g=g[:S,:S].astype(np.float64)
    p=g-cv2.GaussianBlur(g,(0,0),3.0); win=np.outer(np.hanning(S),np.hanning(S))
    P=np.abs(np.fft.fftshift(np.fft.fft2(p*win,(pad,pad))))**2
    c=pad//2; yy,xx=np.mgrid[-c:c,-c:c]; r=np.hypot(xx,yy)/pad
    band=(r>=1/pmax)&(r<=1/pmin)
    if angs is not None:
        la=(np.degrees(np.arctan2(-yy,xx))+90)%180; band&=(la>=angs[0])&(la<=angs[1])
    Q=np.where(band,P,0)
    iy,ix=np.unravel_index(np.argmax(Q),Q.shape); fy,fx=(iy-c)/pad,(ix-c)/pad
    m=(np.hypot(xx-(ix-c),yy-(iy-c))<=4)|(np.hypot(xx+(ix-c),yy+(iy-c))<=4)
    return 1/np.hypot(fx,fy),(np.degrees(np.arctan2(-fy,fx))+90)%180, P[m&band].sum()/P[band].sum()
def mod_curve(g, P, ang, lo=None, hi=None, nb=10):
    g=g.astype(np.float64); yy,xx=np.mgrid[0:g.shape[0],0:g.shape[1]].astype(float)
    th=np.radians(ang); d=np.array([np.cos(th),-np.sin(th)]); n=np.array([-d[1],d[0]]); u=xx*n[0]+yy*n[1]
    lp=lambda a,s: cv2.GaussianBlur(a,(0,0),s)
    M=lp(g,P*1.2); Hh=g-M
    A=2*np.hypot(lp(Hh*np.cos(2*np.pi*u/P),P*1.2),lp(Hh*np.sin(2*np.pi*u/P),P*1.2))
    lo=np.percentile(M,1) if lo is None else lo; hi=np.percentile(M,99.5) if hi is None else hi
    T=np.clip((M-lo)/(hi-lo),0,1); out=np.full(nb,np.nan); cnt=np.zeros(nb)
    e=np.linspace(0,1,nb+1)
    for i in range(nb):
        m=(T>=e[i])&(T<e[i+1]); m[:6,:]=m[-6:,:]=m[:,:6]=m[:,-6:]=False
        cnt[i]=m.sum()
        if m.sum()>30: out[i]=np.median(A[m])
    return out,cnt
def hist(g,bins=32): h,_=np.histogram(g,bins=bins,range=(0,256)); return h/h.sum()
def hist_intersection(a,b): return float(np.minimum(hist(a),hist(b)).sum())
def emd(a,b):  # 1-D Wasserstein distance in luma units
    qa=np.sort(a.ravel()); qb=np.sort(b.ravel()); q=np.linspace(0,1,512)
    return float(np.abs(np.quantile(qa,q)-np.quantile(qb,q)).mean())
def edge_density(g,lo=60,hi=140):
    e=cv2.Canny(np.clip(g,0,255).astype(np.uint8),lo,hi); return float((e>0).mean())
def hp_std(g): g=g.astype(np.float64); return float((g-cv2.GaussianBlur(g,(0,0),3)).std())
def compare(ref_rgb, ours_rgb, P=None, ang=None, angs=(20,70)):
    """both uint8 RGB at the same (360p) scale and size"""
    gr, go = luma(ref_rgb), luma(ours_rgb)
    pr, ar, fr = fft_period(gr, angs=angs); po, ao, fo = fft_period(go, angs=angs)
    P = P or pr; ang = ang if ang is not None else ar
    cr,_=mod_curve(gr,P,ang); co,_=mod_curve(go,P,ang)
    ok=~np.isnan(cr)&~np.isnan(co)
    shape_corr=float(np.corrcoef(cr[ok],co[ok])[0,1]) if ok.sum()>2 else float('nan')
    amp_ratio=float(np.nanmax(co)/np.nanmax(cr))
    labr=cv2.cvtColor(ref_rgb.astype(np.uint8),cv2.COLOR_RGB2LAB).reshape(-1,3).astype(float)
    labo=cv2.cvtColor(ours_rgb.astype(np.uint8),cv2.COLOR_RGB2LAB).reshape(-1,3).astype(float)
    # colour: dE76 between matching luminance quantiles (5,25,50,75,95) of each image
    def qcols(lab):
        o=np.argsort(lab[:,0]); n=len(o); return np.array([lab[o[int(q*(n-1))-n//50:int(q*(n-1))+n//50+1]].mean(0) for q in (0.05,0.25,0.5,0.75,0.95)])
    dE=float(np.linalg.norm((qcols(labr)-qcols(labo))*np.array([100/255,1,1]),axis=1).mean())
    return dict(period_ref=round(pr,2),period_ours=round(po,2),period_ratio=round(po/pr,3),angle_ref=round(ar,1),angle_ours=round(ao,1),
                line_energy_ref=round(fr,3),line_energy_ours=round(fo,3),
                mod_curve_ref=[None if np.isnan(x) else round(x,1) for x in cr],mod_curve_ours=[None if np.isnan(x) else round(x,1) for x in co],
                mod_shape_corr=round(shape_corr,3),mod_amp_ratio=round(amp_ratio,3),
                hist_intersection=round(hist_intersection(gr,go),3),luma_emd=round(emd(gr,go),2),
                mean_ref=round(gr.mean(),1),mean_ours=round(go.mean(),1),
                edge_density_ref=round(edge_density(gr),4),edge_density_ours=round(edge_density(go),4),
                edge_ratio=round(edge_density(go)/max(edge_density(gr),1e-6),3),
                hp_std_ref=round(hp_std(gr),2),hp_std_ours=round(hp_std(go),2),dE_quantile_colours=round(dE,2))
