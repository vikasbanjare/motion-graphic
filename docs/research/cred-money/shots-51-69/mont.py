import cv2, numpy as np, sys
W=sys.argv[1]; out=sys.argv[2]; idx=[int(x) for x in sys.argv[3].split(',')]
cols=int(sys.argv[4]) if len(sys.argv)>4 else 3
sc=float(sys.argv[5]) if len(sys.argv)>5 else 1.0
tiles=[]
for i in idx:
    im=cv2.imread(f"{W}/f24/{i:04d}.png")
    if sc!=1: im=cv2.resize(im,None,fx=sc,fy=sc,interpolation=cv2.INTER_AREA)
    cv2.putText(im,f"{i} t={i/24:.3f}",(6,18),cv2.FONT_HERSHEY_SIMPLEX,0.5,(0,0,255),1,cv2.LINE_AA)
    tiles.append(im)
while len(tiles)%cols: tiles.append(np.zeros_like(tiles[0]))
rows=[np.hstack(tiles[r*cols:(r+1)*cols]) for r in range(len(tiles)//cols)]
cv2.imwrite(out,np.vstack(rows))
