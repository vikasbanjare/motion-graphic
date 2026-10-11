# Duotone extraction: PCA of sRGB pixels inside an object region; endpoints at 1st/99th pct of projection.
import numpy as np, cv2, json
F='/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/ref1/f6/%04d.jpg'
def fr(t): return int(round(t*6))+1
def rgb(t): return cv2.cvtColor(cv2.imread(F%fr(t)),cv2.COLOR_BGR2RGB).astype(np.float64)
def hexc(c): c=np.clip(np.round(c),0,255).astype(int); return '#%02x%02x%02x'%tuple(c)
def duo(name,t,x0,y0,x1,y1,filt=None):
    im=rgb(t)[y0:y1,x0:x1].reshape(-1,3)
    if filt: im=im[filt(im)]
    mu=im.mean(0); X=im-mu; U,S,Vt=np.linalg.svd(X,full_matrices=False); v=Vt[0]
    if v.sum()<0: v=-v
    p=X@v; lo,mid,hi=np.percentile(p,[1,50,99])
    # robust endpoint colours = mean colour of pixels near those projections (keeps any curvature)
    def near(q): m=np.abs(p-q)<(hi-lo)*0.04; return im[m].mean(0)
    cl,cm,ch=near(lo),near(mid),near(hi)
    lin_mid=cl+(ch-cl)*((mid-lo)/(hi-lo))
    resid=np.linalg.norm(X-np.outer(p,v),axis=1)
    ev=S**2/np.sum(S**2)
    r=dict(name=name,t=t,ink=hexc(cl),mid=hexc(cm),paper=hexc(ch),var_explained_pc1=round(float(ev[0]),3),
           rms_off_axis=round(float(np.sqrt((resid**2).mean())),2),mid_bend=round(float(np.linalg.norm(cm-lin_mid)),1),n=int(len(im)))
    print(f"{name:16s} t={t:5.2f} ink {r['ink']}  mid {r['mid']}  paper {r['paper']}  PC1 {r['var_explained_pc1']:.3f}  rms-off-axis {r['rms_off_axis']:.1f}  mid-bend {r['mid_bend']}  n={r['n']}")
    return r
if __name__=='__main__':
  purple=lambda im: (im[:,2]>im[:,1]+12)
  green=lambda im: (im[:,1]>im[:,2]+10)&(im[:,1]>=im[:,0]-5)
  lowsat=lambda im: (im.max(1)-im.min(1))<45
  R=[duo('flowers_purple',6.0,0,40,200,300,purple),
     duo('leaves_green',6.0,300,80,640,300,green),
     duo('bird_purple',8.0,250,60,420,330,purple),
     duo('scene_bg_paper',6.0,560,20,640,80),
     duo('bill_lens_green',15.0,100,40,560,330,green),
     duo('columns',23.0,0,40,110,360),
     duo('columns_wide',24.5,0,0,640,360,lambda im:(im[:,0]>im[:,2]+20)),
     duo('turtle_seabed',29.5,0,250,640,360,lowsat),
     duo('turtle_scene_all',30.5,0,180,640,360,lowsat),
     duo('lighthouse',33.5,0,150,330,360),
     duo('lh_close',36.5,180,120,460,360,green),
     duo('seabed_grey',41.0,0,200,640,360,lowsat),
     duo('green_rock',47.5,170,40,430,250),
     duo('money_paper',52.0,200,60,440,300)]
  json.dump(R,open('out/palettes.json','w'),indent=1)
