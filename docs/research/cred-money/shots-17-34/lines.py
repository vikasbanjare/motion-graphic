import cv2, numpy as np, sys
F=sys.argv[1]
def analyze(n,x,y,name,s=64):
    im=cv2.imread(f"{F}/{n:04d}.jpg"); g=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY).astype(float)
    y=min(y,g.shape[0]-s); x=min(x,g.shape[1]-s); p=g[y:y+s,x:x+s]; p=p-p.mean()
    win=np.outer(np.hanning(s),np.hanning(s)); P=np.abs(np.fft.fftshift(np.fft.fft2(p*win)))**2
    c=s//2
    yy,xx=np.mgrid[-c:c,-c:c]; r=np.hypot(xx,yy)
    P[r<s/14]=0  # keep periods <=14px
    P[r>c-1]=0
    iy,ix=np.unravel_index(np.argmax(P),P.shape)
    fy,fx=(iy-c)/s,(ix-c)/s
    f=np.hypot(fx,fy); period=1/f
    # line orientation: lines are perpendicular to frequency vector
    ang=(np.degrees(np.arctan2(-fy,fx))+90)%180   # angle of lines, 0=horizontal, measured counter-clockwise (image y up)
    # peak sharpness: ratio of peak to mean of annulus
    ann=(r>=s/14)&(r<c-1); sharp=P[iy,ix]/P[ann].mean()
    print(f"{name:22s} f{n} t={(n-1)/6:5.2f} patch@({x},{y}) period={period:4.2f}px = {period/360*100:.2f}%H  line-angle={ang:5.1f}deg  peak/mean={sharp:5.1f}")
pts=[
 (109,330,15,'A bill leaf'),(109,400,30,'A bill leaf2'),(109,90,250,'A bill flower'),
 (139,8,150,'C column L-left'),(139,40,40,'C column L-top'),(139,560,200,'C column R'),
 (157,270,55,'C4 stele roof'),(157,0,150,'C4 column L'),(157,480,100,'C4 column R'),(157,150,200,'C4 paper bg'),
 (181,0,260,'D seabed L'),(181,250,240,'D turtle shell'),(181,330,190,'D turtle head'),(181,450,300,'D seabed R'),
 (202,30,240,'E rock'),(202,180,120,'E tower'),(202,100,280,'E rock2'),(202,500,300,'E hills'),(202,350,40,'E sky bg'),
]
for n,x,y,nm in pts: analyze(n,x,y,nm)
