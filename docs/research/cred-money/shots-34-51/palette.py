import numpy as np, cv2, sys
from sklearn.cluster import KMeans
W=sys.argv[1]
shots=[('A lighthouse wide',[820,834,848]),('B lighthouse close',[870,895,920]),('C reef wide',[950,960,970]),('D reef shell close',[985,1010,1060]),('D push lens',[1100,1110]),('F bill island',[1135,1145]),('G 3D MONEY letters',[1165,1180]),('H CRED MONEY seal',[1200,1230])]
for name,ns in shots:
    px=np.concatenate([cv2.cvtColor(cv2.imread(f'{W}/f24/{n:04d}.png'),cv2.COLOR_BGR2RGB)[::2,::2].reshape(-1,3) for n in ns]).astype(np.float32)
    km=KMeans(7,n_init=4,random_state=0).fit(px)
    cnt=np.bincount(km.labels_,minlength=7)/len(px)
    o=np.argsort(-cnt)
    s=' '.join(f"#{int(c[0]):02x}{int(c[1]):02x}{int(c[2]):02x}:{cnt[i]*100:.0f}%" for i,c in zip(o,km.cluster_centers_[o]))
    # saturated accents
    hsv=cv2.cvtColor(px.reshape(-1,1,3).astype(np.uint8),cv2.COLOR_RGB2HSV).reshape(-1,3)
    sat=px[(hsv[:,1]>90)&(hsv[:,2]>60)]
    acc=''
    if len(sat)>200:
        k2=KMeans(4,n_init=3,random_state=0).fit(sat); c2=np.bincount(k2.labels_)/len(px)
        acc=' | accents(sat>90): '+' '.join(f"#{int(c[0]):02x}{int(c[1]):02x}{int(c[2]):02x}:{c2[i]*100:.1f}%" for i,c in enumerate(k2.cluster_centers_))
    print(f"{name}: {s}{acc}  [sat-px share {len(sat)/len(px)*100:.1f}%]")
