import numpy as np, cv2, sys
W=sys.argv[1]; a=int(sys.argv[2]); b=int(sys.argv[3]); st=int(sys.argv[4])
for n in range(a,b+1,st):
    im=cv2.imread(f'{W}/f24/{n:04d}.png'); hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV)
    m=((hsv[...,1]>70)&(hsv[...,2]>40)).astype(np.uint8)
    m[50:140,90:570]=0  # text zone (approx) excluded
    m=cv2.morphologyEx(m,cv2.MORPH_OPEN,np.ones((3,3),np.uint8))
    nl,lab,stt,cen=cv2.connectedComponentsWithStats(m)
    if nl<2: print(n,'none'); continue
    i=1+np.argmax(stt[1:,4]); x,y,w,h,ar=stt[i]
    print(f"n{n} t={n/24:.3f} foil bbox x={x} y={y} w={w} h={h} area={ar} cx={cen[i][0]:.0f} cy={cen[i][1]:.0f} frac={m.mean()*100:.1f}%")
