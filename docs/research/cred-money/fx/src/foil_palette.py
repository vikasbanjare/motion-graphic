import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
from common import *
import json
regs={'shell':[(41.75,130,210,260,390),(42.0,130,210,260,390),(42.25,130,210,260,390),(46.5,150,300,200,420)],
      'turtle':[(29.5,225,290,60,210),(30.0,225,290,80,220),(30.5,225,290,100,240),(31.5,200,280,150,330)],
      'cards':[(23.6,140,183,330,405),(23.9,140,183,72,120),(24.5,140,183,515,572),(23.4,140,183,448,500),(24.9,140,183,150,190)]}
out={}
for k,rs in regs.items():
    P=[];Hs=[]
    for (t,y0,y1,x0,x1) in rs:
        f=at(t)[y0:y1,x0:x1]; h=hsv(f).reshape(-1,3); P.append(f.reshape(-1,3)[:,::-1]); Hs.append(h)
    P=np.concatenate(P).astype(float); H=np.concatenate(Hs)
    m=H[:,1]>0.3
    bins=[]
    for b in range(12):
        sel=m&(H[:,0]>=b*30)&(H[:,0]<b*30+30)
        share=sel.sum()/m.sum()
        if share<0.02: continue
        med=np.median(P[sel],0)
        # most saturated quartile colour (the 'peak' foil colour)
        q=sel&(H[:,1]>=np.percentile(H[sel,1],75))
        pk=np.median(P[q],0)
        bins.append(dict(hue_bin=f'{b*30}-{b*30+30}',share=round(float(share),3),median='#%02x%02x%02x'%tuple(int(v) for v in med),peak='#%02x%02x%02x'%tuple(int(v) for v in pk),sat_med=round(float(np.median(H[sel,1])),2),val_med=round(float(np.median(H[sel,2])),2)))
    out[k]=dict(foil_pixel_share=round(float(m.mean()),3),bins=bins)
    print(k, out[k]['foil_pixel_share'], [(b['hue_bin'],b['share'],b['peak']) for b in bins])
json.dump(out,open(FX+'/out/foil_palette.json','w'),indent=1)
