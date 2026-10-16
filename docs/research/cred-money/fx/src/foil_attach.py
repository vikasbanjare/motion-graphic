"""Is the foil hue attached to the object, or does it sweep relative to it?
Align frame B to frame A with ECC (affine) on luminance, then compare hue inside a foil mask.
"""
import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
from common import *
def align(a,b,mask=None):
    ga=cv2.cvtColor(a,cv2.COLOR_BGR2GRAY).astype(np.float32)/255
    gb=cv2.cvtColor(b,cv2.COLOR_BGR2GRAY).astype(np.float32)/255
    ga=cv2.GaussianBlur(ga,(0,0),1.0); gb=cv2.GaussianBlur(gb,(0,0),1.0)
    W=np.eye(2,3,dtype=np.float32)
    try:
        cc,W=cv2.findTransformECC(ga,gb,W,cv2.MOTION_AFFINE,(cv2.TERM_CRITERIA_EPS|cv2.TERM_CRITERIA_COUNT,200,1e-6),mask,5)
    except cv2.error as e:
        return None,None
    bw=cv2.warpAffine(b,W,(a.shape[1],a.shape[0]),flags=cv2.INTER_LINEAR+cv2.WARP_INVERSE_MAP)
    return bw,(cc,W)
def huediff(a,b,m):
    ha=hsv(a); hb=hsv(b)
    d=np.abs(((ha[...,0]-hb[...,0])+180)%360-180)
    return float(np.median(d[m])), float(np.mean(d[m]))
def foilmask(f, region, satmin=0.2, scenehue=None, huetol=35):
    h=hsv(f); y0,y1,x0,x1=region
    m=np.zeros(h.shape[:2],bool); m[y0:y1,x0:x1]=True
    m&=h[...,1]>satmin
    if scenehue is not None:
        dh=np.abs(((h[...,0]-scenehue)+180)%360-180); m&=dh>huetol
    return m
cases={
 # name: (tA, tB list, region y0,y1,x0,x1, scenehue)
 'band_hold':(18.0,[18.25,18.5],(140,218,60,590),None),
 'band_push':(16.5,[16.75,17.0],(150,205,60,590),None),
 'band_thin':(14.0,[14.5,15.0,15.5],(168,192,60,590),150),
 'turtle':(29.0,[29.25,29.5,30.0],(150,360,0,450),255),
 'shell':(41.0,[41.25,41.5,42.0],(120,300,150,480),None),
 'shell_lens':(46.0,[46.25,46.5],(100,300,100,500),None),
 'cards':(23.0,[23.25,23.5],(100,260,0,640),None),
}
for name,(ta,tbs,reg,sh) in cases.items():
    a=at(ta)
    m=foilmask(a,reg,0.25 if sh is None else 0.2,sh)
    print(f'== {name}: tA={ta} foil px={m.sum()}')
    for tb in tbs:
        b=at(tb)
        bw,info=align(a,b)
        if bw is None: print('  ECC failed',tb); continue
        cc,W=info
        scale=np.sqrt(abs(np.linalg.det(W[:,:2])))
        valid=cv2.warpAffine(np.ones(a.shape[:2],np.uint8),W,(a.shape[1],a.shape[0]),flags=cv2.INTER_NEAREST+cv2.WARP_INVERSE_MAP)>0
        mm=m&valid
        # residual luminance after alignment
        la=cv2.cvtColor(a,cv2.COLOR_BGR2GRAY).astype(float); lb=cv2.cvtColor(bw,cv2.COLOR_BGR2GRAY).astype(float)
        lres=np.median(np.abs(la-lb)[mm])
        hd=huediff(a,bw,mm); hd0=huediff(a,b,mm)
        print(f'  tB={tb}: ECC cc={cc:.3f} scale={scale:.3f} shift=({W[0,2]:.1f},{W[1,2]:.1f}) | hue diff aligned med={hd[0]:.1f} mean={hd[1]:.1f} | unaligned med={hd0[0]:.1f} | luma resid med={lres:.1f}')
