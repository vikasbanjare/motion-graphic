import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
from common import *
def kymo(t0,t1,y0,y1,x0=0,x1=640, sat_boost=True):
    rows=[]
    for i in range(int(t0*24),int(t1*24)):
        f=np.array(frames()[i])[y0:y1,x0:x1]
        # per column: pick the colour of the most saturated half of pixels (foil dominates)
        h=hsv(f); s=h[...,1]
        thr=np.percentile(s,60,axis=0)
        m=(s>=thr[None,:]).astype(np.float32)
        col=(f.astype(np.float32)*m[...,None]).sum(0)/m.sum(0)[:,None]
        rows.append(col)
    return np.array(rows).astype(np.uint8)
if __name__=='__main__':
    k=kymo(22.5,26.0,138,185)
    save('out/kymo_cards.png', cv2.resize(k,(640*2,k.shape[0]*4),interpolation=cv2.INTER_NEAREST))
    k2=kymo(26.5,33.0,150,330,0,640)
    save('out/kymo_turtle.png', cv2.resize(k2,(640*2,k2.shape[0]*2),interpolation=cv2.INTER_NEAREST))
    k3=kymo(39.0,46.0,120,260,150,500)
    save('out/kymo_shell.png', cv2.resize(k3,(350*3,k3.shape[0]*2),interpolation=cv2.INTER_NEAREST))
