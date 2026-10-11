# For each 32px window: energy at primary carrier angle vs. strongest energy at an angle >=25deg away.
import numpy as np, cv2, sys
sys.path.insert(0,'src'); from measure_lines2 import gray
def orient_energy(p,pad=128,pmin=1.95,pmax=6.5):
    p=p-cv2.GaussianBlur(p,(0,0),3.0); win=np.outer(np.hanning(p.shape[0]),np.hanning(p.shape[1]))
    P=np.abs(np.fft.fftshift(np.fft.fft2(p*win,(pad,pad))))**2
    c=pad//2; yy,xx=np.mgrid[-c:c,-c:c]; r=np.hypot(xx,yy)/pad
    band=(r>=1/pmax)&(r<=1/pmin)
    lang=(np.degrees(np.arctan2(-yy,xx))+90)%180
    hist=np.array([P[band&(np.abs(((lang-a+90)%180)-90)<7.5)].sum() for a in range(0,180,5)])
    return hist/P[band].sum()
def run(name,t,x0,y0,x1,y1,prim):
    g=gray(t); rows=[]
    for y in range(y0,y1-32,16):
        for x in range(x0,x1-32,16):
            p=g[y:y+32,x:x+32]; h=orient_energy(p); angs=np.arange(0,180,5)
            dist=np.abs(((angs-prim+90)%180)-90)
            e1=h[dist<=10].max(); e2=h[dist>=25].max(); a2=angs[dist>=25][np.argmax(h[dist>=25])]
            rows.append((p.mean(),e1,e2,a2))
    rows=np.array(rows); q=np.percentile(rows[:,0],[0,25,50,75,100])
    print(f"\n{name} t={t} primary={prim}")
    for i in range(4):
        m=(rows[:,0]>=q[i])&(rows[:,0]<=q[i+1])
        a2=rows[m,3]; vals,cnt=np.unique(a2,return_counts=True)
        print(f"  luma {q[i]:5.0f}-{q[i+1]:5.0f}: primary-angle energy {rows[m,1].mean():.3f}  best-other-angle energy {rows[m,2].mean():.3f}  ratio {rows[m,2].mean()/rows[m,1].mean():.2f}  modal other angle {vals[np.argmax(cnt)]}")
run('green_rock',47.5,170,40,430,250,45)
run('columns_L',23.0,0,40,110,360,45)
run('lighthouse',33.5,0,150,330,360,45)
run('flowers',6.0,0,40,200,300,45)
