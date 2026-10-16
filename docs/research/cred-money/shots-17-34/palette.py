import cv2, numpy as np, sys
F=sys.argv[1]
shots={'A 17.0-18.75 green lens bill':range(103,113),'B 18.9-20.35 peach lens pattern':range(115,123),
'C1 20.55-21.3 peach lens close':range(125,129),'C2 21.3-22.4 tilt-up reveal':range(129,136),
'C3 22.4-25.25 colonnade + cards':range(136,152),'C4 25.5-27.0 stele':range(155,163),
'D 27.5-32.5 turtle':range(166,196),'E 32.6-34.0 lighthouse':range(197,206)}
for name,rng in shots.items():
    px=[]
    for n in rng:
        im=cv2.imread(f"{F}/{n:04d}.jpg")
        im=cv2.resize(im,(160,90),interpolation=cv2.INTER_AREA)
        px.append(cv2.cvtColor(im,cv2.COLOR_BGR2LAB).reshape(-1,3))
    X=np.concatenate(px).astype(np.float32)
    K=7
    crit=(cv2.TERM_CRITERIA_EPS+cv2.TERM_CRITERIA_MAX_ITER,50,0.2)
    _,lab,cen=cv2.kmeans(X,K,None,crit,5,cv2.KMEANS_PP_CENTERS)
    share=np.bincount(lab.ravel(),minlength=K)/len(lab)
    order=np.argsort(-share)
    cols=[]
    for i in order:
        bgr=cv2.cvtColor(cen[i].reshape(1,1,3).astype(np.uint8),cv2.COLOR_LAB2BGR)[0,0]
        cols.append(f"#{bgr[2]:02x}{bgr[1]:02x}{bgr[0]:02x} {share[i]*100:4.1f}%")
    # mean luminance and saturation
    hsv=[cv2.cvtColor(cv2.imread(f"{F}/{n:04d}.jpg"),cv2.COLOR_BGR2HSV) for n in rng]
    S=np.mean([h[...,1].mean() for h in hsv]); V=np.mean([h[...,2].mean() for h in hsv])
    print(f"{name:34s} meanSat={S/2.55:4.1f}% meanVal={V/2.55:4.1f}% | "+' | '.join(cols))
