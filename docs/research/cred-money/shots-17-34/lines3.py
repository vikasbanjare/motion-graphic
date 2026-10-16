import cv2, numpy as np, sys
F=sys.argv[1]
def spec(p):
    s=p.shape[0]; p=p-p.mean()
    win=np.outer(np.hanning(s),np.hanning(s)); P=np.abs(np.fft.fftshift(np.fft.fft2(p*win)))**2
    c=s//2; yy,xx=np.mgrid[-c:c,-c:c]; r=np.hypot(xx,yy)
    band=(r>=s/4.2)&(r<=s/2.05)  # periods 2.1..9 px
    Q=np.where(band,P,0); peaks=[]
    for k in range(3):
        iy,ix=np.unravel_index(np.argmax(Q),Q.shape)
        if Q[iy,ix]<=0: break
        fy,fx=(iy-c)/s,(ix-c)/s
        period=1/np.hypot(fx,fy); ang=(np.degrees(np.arctan2(-fy,fx))+90)%180
        peaks.append((period,ang,Q[iy,ix]/P[band].mean()))
        # suppress this and mirror
        for (a,b) in [(iy,ix),(2*c-iy,2*c-ix)]:
            Q[max(0,a-2):a+3,max(0,b-2):b+3]=0
    return peaks
# synthetic check: lines rising to the right at 40deg (y up), period 3px
s=64; yy,xx=np.mgrid[0:s,0:s]; th=np.radians(40)
# line direction (cos th, sin th) in y-up; normal n=(-sin th, cos th); in image coords y_img=-y
val=np.sin(2*np.pi*((-np.sin(th))*xx + np.cos(th)*(-yy))/3.0)
print('synthetic 40deg/3px ->',[(round(a,2),round(b,1),round(c,1)) for a,b,c in spec(val)])
def an(n,x,y,name):
    g=cv2.cvtColor(cv2.imread(f"{F}/{n:04d}.jpg"),cv2.COLOR_BGR2GRAY).astype(float)
    y=min(y,g.shape[0]-64); x=min(x,g.shape[1]-64)
    pk=spec(g[y:y+64,x:x+64])
    print(f"{name:20s} f{n} ({x},{y}) ",'  '.join(f"P={a:4.2f}px({a/360*100:.2f}%H) ang={b:5.1f} q={c:5.1f}" for a,b,c in pk))
pts=[(109,330,15,'A bill leaf'),(109,400,30,'A bill leaf2'),(109,90,250,'A bill flower'),(109,300,150,'A band'),
 (127,250,120,'C1 lens paper'),(127,60,40,'C1 col-top'),
 (139,8,150,'C3 column L'),(139,20,280,'C3 column base'),(139,560,200,'C3 column R'),(139,230,290,'C3 plinth'),(139,250,100,'C3 paper behind'),
 (157,270,55,'C4 stele roof'),(157,0,150,'C4 column L'),(157,520,60,'C4 column R'),(157,150,200,'C4 paper bg'),
 (181,0,260,'D seabed L'),(181,250,240,'D turtle shell'),(181,330,190,'D turtle head'),(181,450,296,'D seabed R'),(181,20,180,'D coral'),
 (202,30,240,'E rock'),(202,180,120,'E tower'),(202,100,280,'E rock2'),(202,500,296,'E hills'),(202,350,40,'E sky bg')]
for p in pts: an(*p)
