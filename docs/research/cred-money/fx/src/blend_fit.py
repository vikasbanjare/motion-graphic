"""Fit blend modes: simulate base engraving luma (grey) + rainbow foil layer, compare chroma|luma curve and luma shift."""
import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
from common import *
import colorsys, json
rng=np.random.default_rng(1)
def luma(c): return 0.2126*c[...,0]+0.7152*c[...,1]+0.0722*c[...,2]
def lum(c): return 0.3*c[...,0]+0.59*c[...,1]+0.11*c[...,2]   # W3C compositing
def clipcolor(c):
    l=lum(c)[...,None]; n=c.min(-1,keepdims=True); x=c.max(-1,keepdims=True)
    c=np.where(n<0, l+(c-l)*l/np.maximum(l-n,1e-6), c)
    c=np.where(x>1, l+(c-l)*(1-l)/np.maximum(x-l,1e-6), c)
    return c
def setlum(c,l): return clipcolor(c+(l-lum(c))[...,None])
def sat(c): return c.max(-1)-c.min(-1)
def setsat(c,s):
    mx=c.max(-1,keepdims=True); mn=c.min(-1,keepdims=True); r=np.maximum(mx-mn,1e-6)
    return np.where(mx>mn,(c-mn)/r*s[...,None],0)
modes={
 'normal_a': lambda b,f,a: b*(1-a)+f*a,
 'multiply': lambda b,f,a: b*(1-a)+(b*f)*a,
 'screen':   lambda b,f,a: b*(1-a)+(1-(1-b)*(1-f))*a,
 'overlay':  lambda b,f,a: b*(1-a)+np.where(b<=0.5,2*b*f,1-2*(1-b)*(1-f))*a,
 'softlight':lambda b,f,a: b*(1-a)+np.where(f<=0.5,b-(1-2*f)*b*(1-b),b+(2*f-1)*(np.where(b<=0.25,((16*b-12)*b+4)*b,np.sqrt(b))-b))*a,
 'color':    lambda b,f,a: b*(1-a)+setlum(f,lum(b))*a,
 'hue':      lambda b,f,a: b*(1-a)+setlum(setsat(f,sat(b)),lum(b))*a,
 'colordodge':lambda b,f,a: b*(1-a)+np.clip(b/np.maximum(1-f,1e-3),0,1)*a,
 'add':      lambda b,f,a: b*(1-a)+np.clip(b+f,0,1)*a,
}
def measured(t,box):
    y0,y1,x0,x1=box; f=at(t)[y0:y1,x0:x1][:,:,::-1].reshape(-1,3).astype(np.float32)/255
    return f
def curve(rgb):
    Y=luma(rgb); C=sat(rgb)
    bins=np.linspace(0,1,11); idx=np.clip(np.digitize(Y,bins)-1,0,9)
    cv=np.array([np.median(C[idx==i]) if np.sum(idx==i)>30 else np.nan for i in range(10)])
    hist=np.array([np.mean(idx==i) for i in range(10)])
    return cv,hist
def fit(name, meas, base_lumas, hues):
    cm,hm=curve(meas)
    res=[]
    n=20000
    b=rng.choice(base_lumas,n)[:,None]*np.ones((1,3))
    h=rng.choice(hues,n)
    for mode,fn in modes.items():
        best=None
        for fs in (0.4,0.6,0.8,1.0):
            for fv in (0.5,0.7,0.85,1.0):
                f=np.array([colorsys.hsv_to_rgb(hh/360,fs,fv) for hh in h[:3000]])
                f=np.concatenate([f]*(n//3000+1))[:n]
                for a in (0.5,0.75,1.0):
                    out=np.clip(fn(b,f,a),0,1)
                    cs,hs=curve(out)
                    m=~np.isnan(cm)&~np.isnan(cs)
                    e=np.sqrt(np.nanmean((cs[m]-cm[m])**2))+0.5*np.abs(hs-hm).sum()  # curve + luma hist (L1)
                    if best is None or e<best[0]: best=(e,fs,fv,a)
        res.append((mode,)+best)
    res.sort(key=lambda r:r[1])
    print('==',name)
    for r in res: print('  %-10s err=%.3f foilS=%.1f foilV=%.2f alpha=%.2f'%r)
    return res
out={}
# SHELL: base luma from grey rock/sand in same frame; hues from measured foil
sh=measured(42.0,(130,210,260,390))
base=measured(42.0,(250,340,20,160)); bl=luma(base)
H=cv2.cvtColor((sh[None][:,:,::-1]*255).astype(np.uint8),cv2.COLOR_BGR2HSV_FULL)[0].astype(float)
hues=H[H[:,1]>64][:,0]*360/256
out['shell']=fit('shell',sh,bl,hues)
# TURTLE: base from non-foil lavender turtle head? use luma of seabed rocks (same engraving) in grey
tu=measured(30.0,(225,290,80,220))
base=measured(30.0,(300,360,300,560)); bl=luma(base)
H=cv2.cvtColor((tu[None][:,:,::-1]*255).astype(np.uint8),cv2.COLOR_BGR2HSV_FULL)[0].astype(float)
hues=H[H[:,1]>64][:,0]*360/256
out['turtle']=fit('turtle',tu,bl,hues)
# CARD (axis): base = the same card box before glint (t=24.1)
ca=measured(24.5,(140,183,515,572)); base=measured(24.08,(140,183,515,572)); bl=luma(base)
H=cv2.cvtColor((ca[None][:,:,::-1]*255).astype(np.uint8),cv2.COLOR_BGR2HSV_FULL)[0].astype(float)
hues=H[H[:,1]>100][:,0]*360/256
out['card_axis']=fit('card_axis',ca,bl,hues)
json.dump({k:[list(map(lambda x: x if isinstance(x,str) else float(x),r)) for r in v] for k,v in out.items()},open(FX+'/out/blend_fit.json','w'),indent=1)
