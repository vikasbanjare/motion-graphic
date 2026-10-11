import cv2, numpy as np, sys
from sklearn.cluster import KMeans
W=sys.argv[1]
shots=[("S1",0,41),("S2",42,71),("S3",72,113),("S4",114,167),("S5",168,227),("S6",228,266),("S7",267,322),("S8",323,370),("S9",371,419)]
for name,a,b in shots:
    px=[]
    for i in np.linspace(a,b,6).astype(int):
        im=cv2.imread(f"{W}/f24/{i:04d}.png")
        im=cv2.resize(im,(160,90),interpolation=cv2.INTER_AREA)
        px.append(cv2.cvtColor(im,cv2.COLOR_BGR2RGB).reshape(-1,3))
    px=np.concatenate(px).astype(float)
    km=KMeans(n_clusters=6,n_init=4,random_state=0).fit(px)
    cnt=np.bincount(km.labels_,minlength=6)/len(px)
    order=np.argsort(-cnt)
    s=", ".join(f"#{int(km.cluster_centers_[k][0]):02x}{int(km.cluster_centers_[k][1]):02x}{int(km.cluster_centers_[k][2]):02x} {cnt[k]*100:.0f}%" for k in order)
    print(name,a/24,(b+1)/24,s)
