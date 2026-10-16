import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
from common import *
from band import band_rows
import json
# Track: band rows, text bbox (white low-sat pixels inside band), and hue at text-relative positions
rows=[]
for i in range(int(13.4*24), int(19.0*24)):
    t=i/24; f=frames()[i]; f=np.array(f)
    br=band_rows(f)
    if br is None: rows.append((t,None)); continue
    h=hsv(f)
    r0,r1=br
    sub=h[r0:r1+1]
    text=(sub[...,1]<0.16)&(sub[...,2]>0.82)
    ys,xs=np.nonzero(text)
    if len(xs)<20: rows.append((t,(r0,r1,None))); continue
    rows.append((t,(int(r0),int(r1),int(xs.min()),int(xs.max()),int(ys.min()+r0),int(ys.max()+r0))))
for t,r in rows[::4]: print(round(t,3), r)
json.dump(rows, open(FX+'/out/band_track.json','w'))
