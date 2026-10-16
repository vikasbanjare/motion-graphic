import cv2, numpy as np, sys
from sklearn.cluster import KMeans
W=sys.argv[1]
shots=[("A lens 51.0-52.8",1224,1265),("B bill-on-black 52.8-54.3",1268,1302),("C whip 54.3-54.7",1303,1312),("D 3D phone+bill 54.75-55.9",1314,1342),("E screen-on reveal 55.96-56.75",1343,1362),("F hold 56.75-59.63",1362,1431),("G lights-out 59.67-60.42",1432,1449),("H logo swing 60.46-61.1",1451,1466),("I plate sweep 61.1-63.0",1467,1512),("J lockup 63.04-65.2",1513,1564),("K fade 65.2-66.7",1565,1600)]
def hexc(c): return "#%02x%02x%02x"%tuple(int(round(v)) for v in c)
for name,a,b in shots:
    px=[]
    for i in np.linspace(a,b,8).astype(int):
        im=cv2.imread(f"{W}/f24/{i:04d}.png"); im=cv2.resize(im,(160,90),interpolation=cv2.INTER_AREA)
        px.append(cv2.cvtColor(im,cv2.COLOR_BGR2RGB).reshape(-1,3))
    px=np.concatenate(px).astype(float)
    km=KMeans(n_clusters=6,n_init=4,random_state=0).fit(px)
    cnt=np.bincount(km.labels_,minlength=6)/len(px); o=np.argsort(-cnt)
    s1=", ".join(f"{hexc(km.cluster_centers_[k])} {cnt[k]*100:.0f}%" for k in o)
    lum=px.mean(1); sub=px[lum>28]
    s2=''
    if len(sub)>200:
        k2=KMeans(n_clusters=5,n_init=4,random_state=0).fit(sub); c2=np.bincount(k2.labels_,minlength=5)/len(sub); o2=np.argsort(-c2)
        s2=", ".join(f"{hexc(k2.cluster_centers_[k])} {c2[k]*100:.0f}%" for k in o2)
    print(f"{name}\n  all: {s1}\n  non-black (lum>28, {len(sub)/len(px)*100:.0f}% of px): {s2}\n  mean lum={lum.mean():.1f}")
