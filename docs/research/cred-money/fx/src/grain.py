import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
from common import *
import json
def gray(i): return cv2.cvtColor(np.array(frames()[i]),cv2.COLOR_BGR2GRAY).astype(np.float32)
def shift(a,b):
    (dx,dy),resp=cv2.phaseCorrelate(a,b); return dx,dy,resp
# 1) global motion + temporal noise on intro paper 0-3.0s; region = empty paper (right half, rows 0-80 / 280-360 to avoid lines)
res={}
for name,(t0,t1,box) in {
    'intro_paper':(0.0,0.5,(20,340,40,600)),
    'intro_paper_b':(2.0,2.9,(20,100,400,620)),
    'band_hold_green':(17.95,18.6,(20,110,200,450)),
    'peach_hold':(19.6,20.3,(60,140,120,240)),
    'seal_hold':(50.3,51.2,(60,120,240,400)),
    'phone_bg':(57.0,58.0,(250,350,40,300)),
    'logo_black':(62.0,63.0,(20,340,20,620)),
    }.items():
    y0,y1,x0,x1=box
    shifts=[];tn=[];sp=[]
    idx=list(range(int(t0*24),int(t1*24)))
    for i,j in zip(idx[:-1],idx[1:]):
        a=gray(i);b=gray(j)
        dx,dy,r=shift(a[y0:y1,x0:x1],b[y0:y1,x0:x1]); shifts.append((dx,dy))
        d=(b-a)[y0:y1,x0:x1]
        tn.append(np.std(d)/np.sqrt(2))
    # spatial: band-pass std per octave on first frame region (DoG)
    a=gray(idx[0])[y0:y1,x0:x1]
    bands={}
    prev=a
    for s in (0.7,1.4,2.8,5.6,11.2,22.4):
        g=cv2.GaussianBlur(a,(0,0),s); bands[s]=float(np.std(prev-g)); prev=g
    sh=np.array(shifts)
    res[name]=dict(mean_luma=float(a.mean()), temporal_noise_std=float(np.median(tn)), shift_med_px=[float(np.median(np.abs(sh[:,0]))),float(np.median(np.abs(sh[:,1])))], shift_max_px=float(np.max(np.hypot(sh[:,0],sh[:,1]))), dog_std_by_sigma=bands)
    print(name, json.dumps(res[name]))
json.dump(res,open(FX+'/out/grain.json','w'),indent=1)
