import cv2, numpy as np, sys
F=sys.argv[1]
shots={'A':range(103,113),'B':range(115,123),'C1':range(125,129),'C2':range(129,136),'C3':range(136,152),'C4':range(155,163),'D':range(166,196),'E':range(197,206)}
def hexc(rgb): return '#%02x%02x%02x'%tuple(int(v) for v in rgb)
for name,rng in shots.items():
    P=[]
    for n in rng:
        im=cv2.imread(f"{F}/{n:04d}.jpg"); im=cv2.resize(im,(320,180),interpolation=cv2.INTER_AREA)
        P.append(im.reshape(-1,3)[:,::-1])
    X=np.concatenate(P).astype(float)
    lab=cv2.cvtColor(X.reshape(-1,1,3).astype(np.uint8),cv2.COLOR_RGB2LAB).reshape(-1,3).astype(float)
    m=lab[:,0]>30  # drop lens black
    L=lab[m]; Xm=X[m]
    q=np.argsort(L[:,0])
    dark=Xm[q[:len(q)//20]].mean(0); light=Xm[q[-len(q)//20:]].mean(0); mid=Xm[q[len(q)//2-len(q)//40:len(q)//2+len(q)//40]].mean(0)
    C=np.cov((L-L.mean(0)).T); ev=np.sort(np.linalg.eigvalsh(C))[::-1]
    blackshare=(~m).mean()
    print(f"{name:3s} ink(darkest5%)={hexc(dark)} mid={hexc(mid)} paper(lightest5%)={hexc(light)}  PCA1 var share={ev[0]/ev.sum()*100:4.1f}%  lens-black share={blackshare*100:4.1f}%")
